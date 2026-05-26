## 1. The one-sentence answer
**System calls let a user-mode program ask the kernel for privileged operations by deliberately triggering a trap that forces a controlled switch to kernel mode.**

User programs run with restricted hardware access so they cannot corrupt memory, devices or other processes. When a program needs something only the kernel can do, such as reading a file or creating a thread, it executes a special instruction that raises a trap. The hardware immediately changes the CPU privilege level, saves the current state, and hands control to a kernel handler that performs the requested work before returning to user mode.

This mechanism keeps the boundary between untrusted code and trusted kernel code both strict and efficient. Without it, every application would need full hardware rights, making the system fragile.

> [!NOTE]
> The single most important insight is that the mode switch is not a normal function call; it is a hardware-enforced privilege change that the user program cannot fake or bypass.

## 2. Why this matters — concrete and current
Linux uses the `SYSCALL` instruction on x86-64 to implement every file, network and process operation; the entire container runtime (Docker, Kubernetes) rests on these controlled crossings.

Android’s ART and Apple’s XNU both rely on the same trap-based system-call path to enforce app sandboxing; a single missed check here has produced several high-impact privilege-escalation CVEs.

Modern serverless platforms (AWS Lambda, Cloudflare Workers) decide how many system calls to allow per function precisely because each trap costs measurable CPU cycles and opens an attack surface.

In safety-critical avionics running on VxWorks or seL4, the kernel minimises the number of allowed traps so that formal verification can prove that user-mode tasks never reach kernel mode except through a tiny, audited interface.

NVIDIA’s GPU drivers issue system calls to map device memory into user space; the trap path must correctly program IOMMU page tables or else DMA attacks become possible.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| CPU privilege rings  | Explains why user code cannot directly execute privileged instructions |
| Interrupt vector table | Provides the hardware mechanism that dispatches traps     |
| Process address space | Shows why kernel must validate every pointer passed from user mode |

If any row is unfamiliar, pause and read the corresponding section on CPU architecture before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Two privilege levels on the CPU
Modern CPUs run in at least two modes: user mode (ring 3) and kernel mode (ring 0). In user mode certain instructions that touch hardware or page tables are illegal; any attempt raises an exception.

A concrete example is the x86 `cli` instruction that disables interrupts. Executing it from user mode immediately faults. Formally, the current privilege level (CPL) is stored in the lower two bits of the code-segment selector; CPL = 3 means user mode.

> [!WARNING]
> If you forget that the mode bit lives in hardware state, you will think a simple function call can raise privilege; it cannot.

### Step 2 — User code cannot touch kernel memory
Each process has its own page tables that map only user pages as accessible from CPL = 3. Kernel pages are marked with the supervisor bit, so any load or store from user mode causes a page-fault trap.

### Step 3 — System call as a deliberate trap
To cross into the kernel, user code executes a trap instruction (`INT 0x80`, `SYSCALL`, or `SVC`). This instruction simultaneously changes CPL to 0 and jumps to an address taken from the interrupt descriptor table.

### Step 4 — Hardware saves minimal context
On a trap the CPU pushes the instruction pointer, stack pointer and flags onto the kernel stack, then loads the new privilege level. No registers are saved by hardware; the kernel handler must do that itself if it intends to resume the caller.

### Step 5 — Kernel validates arguments
The handler receives arguments through registers or the user stack. Because the user pointer could be invalid or malicious, the kernel must copy data into its own address space using special safe-copy routines (`copy_from_user` in Linux).

### Step 6 — Return path restores user context
After the service completes, the kernel executes `SYSRET` (or `IRET`). This instruction atomically restores CPL = 3, the saved instruction pointer and stack pointer, and continues execution exactly after the original trap site.

## 5. Worked examples — har step show karo

**Example 1 — Opening a file**
- *Given:* user calls `open("/etc/passwd", O_RDONLY)` in C.
- *Find:* sequence of mode transitions.
1. `open` is a libc wrapper that places the syscall number in `%rax` and arguments in `%rdi`, `%rsi`.
2. Wrapper executes `SYSCALL`; hardware switches to ring 0 and enters `entry_SYSCALL_64`.
3. Kernel looks up `sys_open`, validates the path string with `copy_from_user`.
4. VFS layer opens the inode and returns a file descriptor.
5. `SYSRET` restores ring 3; libc returns the fd to the caller.
*Why* each move: the path string lives in user pages, so the kernel cannot trust it without an explicit safe copy.

**Example 2 — Invalid pointer passed to `read`**
- *Given:* `read(fd, (char *)0xFFFF0000, 10)` where the address is unmapped.
- *Find:* outcome.
Kernel’s `copy_to_user` detects the fault, returns `-EFAULT`, and never touches the illegal address. The user process receives the error instead of crashing the kernel.

**Example 3 — Nested traps during page fault**
- *Given:* user accesses a page that is not present.
- *Find:* how the page-fault trap itself is handled.
The page-fault handler runs in kernel mode; if it needs to read a file, it issues another system call (nested trap) that is still executed at CPL = 0.

**Example 4 — Timing a single system call**
- *Given:* measure latency of `getpid`.
- *Find:* typical cost.
On a 3 GHz Intel CPU the round-trip trap costs roughly 100–150 cycles; the dominant expense is the pipeline flush and TLB shootdown, not the handler body.

*Reflection:* these examples show that every system call is both a privilege change and a trust boundary that must be explicitly validated.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating `syscall` like a normal call | Students imagine it is just a jump          | Remember CPL changes only on specific instructions |
| Forgetting to validate user pointers | Kernel code looks identical to user code    | Always use `copy_from_user` / `copy_to_user` |
| Assuming registers survive the call | Handler may clobber them                    | Read the ABI; save what you need             |
| Ignoring the cost of mode switches | Modern CPUs pay pipeline and cache penalties | Batch work inside fewer system calls         |
| Confusing signals with traps      | Both use the IDT                            | Signals are delivered on return to user mode, traps are synchronous |

## 7. The textbook-precise statement
A system call is a controlled transfer of control from user mode to kernel mode initiated by a trap or software interrupt instruction. The processor changes its current privilege level, switches to the kernel stack, and vectors through an entry in the interrupt descriptor table. All arguments passed from user space must be treated as untrusted; the kernel must validate or copy them before use. On completion the kernel executes a return-from-interrupt instruction that restores the prior privilege level and resumes the calling instruction. (Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §2.4.)

## 8. Visual — diagram or schematic
```text
User process (CPL=3)          Kernel (CPL=0)
+------------------+          +------------------+
|  ...             |          |  syscall handler |
|  mov $1,%rax     |          |  ...             |
|  syscall --------+--------->|  sys_read()      |
|  <---------------+--------- |  SYSRET          |
|  ret             |          +------------------+
+------------------+
   ^ trap raises CPL
   | hardware saves RIP/RSP/flags on kernel stack
```

## 9. The memory technique
1. **The hook** — picture a velvet rope at a club: user mode is the queue, the trap instruction is showing your ID at the door; only then do you enter the VIP kernel area.
2. **What to overlearn** — the four actions that happen atomically on `SYSCALL`: CPL ← 0, stack switch, vector through MSR_LSTAR, and the fact that arguments live in registers, not on the user stack.
3. **Spaced-repetition schedule** — review the diagram after 1 day, again after 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — if you forget the instruction names, start from “user code must never be allowed to execute privileged opcodes; therefore any request must be mediated by hardware that inspects the current privilege level.”

## 10. What this unlocks
Once you internalise the user/kernel boundary you can reason about scheduling, virtual memory, device drivers and security without hand-waving.

- Next topics: interrupt handling versus traps, signal delivery, and virtual memory page-fault paths all reuse the same mode-switch machinery.
- Techniques you can now study: fast system-call alternatives (vDSO, vsyscall), seccomp filtering, and eBPF.

## 11. Self-check — five questions, no answers
1. Why can a user program not simply execute the privileged instructions inside the kernel’s `sys_read` routine?
2. What would happen if the kernel trusted a pointer supplied by the user without copying it first?
3. On x86-64, which register holds the system-call number immediately before the `SYSCALL` instruction?
4. Draw the stack frames that exist after a trap but before the handler has saved any registers.
5. A student claims “a system call is just a function call into the kernel.” Identify the two hardware facts that make this statement false.