## 1. The one-sentence answer
**System calls are the controlled mechanism by which a user-mode process requests a privileged kernel-mode service through a hardware trap that atomically switches execution mode and privilege level.**

A program running in user mode has restricted access to hardware and memory; any attempt to execute a privileged instruction immediately faults. The operating system therefore exposes a narrow, well-defined set of entry points—system calls—that allow the process to ask the kernel to perform operations on its behalf. Execution of a system-call instruction (INT, SYSCALL, SVC, etc.) generates a trap: the processor saves the current context, elevates privilege to kernel mode, and vectors to a handler that validates the request before performing the work.

The trap is not an error; it is the designed transfer of control. Once the kernel finishes, it returns through a special instruction (IRET, SYSRET) that restores the original privilege level and resumes the caller. The entire sequence guarantees that user code never executes with kernel rights and that every transition is logged and validated by hardware and software.

> [!NOTE]
> The single most important insight is that mode transition is not a function call; it is an involuntary, hardware-enforced context switch that changes the instruction set and memory protections the CPU will enforce from that instant onward.

## 2. Why this matters — concrete and current
Modern Android and iOS apps invoke the Linux or XNU kernel hundreds of times per second for file I/O, networking, and graphics; each invocation crosses the user–kernel boundary via the trap mechanism, and any latency or security flaw here directly limits battery life and responsiveness on billions of devices.

In machine-learning training clusters, NVIDIA’s CUDA driver uses system calls to pin GPU memory and submit command buffers; the trap path determines how quickly a framework such as PyTorch can overlap data movement with computation on thousands of GPUs.

Aerospace flight software on spacecraft running VxWorks or RTEMS isolates hard-real-time control loops in user mode; the trap mechanism supplies the only legal route to device registers, ensuring that a single misbehaving task cannot corrupt the attitude-control hardware.

Intel’s SGX and AMD’s SEV rely on the same mode-switch hardware to create enclaves; a system call that exits an enclave must traverse the trap path, which the CPU uses to flush sensitive state and re-establish the enclave’s protections before returning to untrusted kernel code.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| CPU privilege rings (0–3) | Defines the hardware-enforced distinction between user and kernel rights that the trap must change atomically. |
| Interrupt vector table   | Supplies the indexed jump from the trap instruction to the kernel handler; without it the processor would not know where to go after the mode switch. |
| Context (PC, SP, flags)  | Must be saved and restored so the kernel can later resume the exact instruction stream that issued the call. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Programs must not be allowed to touch hardware directly
A user process that could execute an `out` instruction to a disk controller could overwrite any other process’s data. Hardware therefore tags every instruction with the current privilege level; privileged opcodes are rejected when the level is not zero.

### Step 2 — The only legal path to privilege is a single, architecturally defined instruction
That instruction (SYSCALL on x86-64, SVC on ARM) is deliberately not privileged; any code may execute it. Its sole effect is to raise an exception that the processor treats as a controlled transfer rather than a fault.

### Step 3 — The processor performs an atomic mode switch
On encountering the trap instruction the CPU simultaneously (a) changes the privilege bit to kernel, (b) disables interrupts if required by the architecture, (c) pushes the return context onto the kernel stack, and (d) loads the new instruction pointer from the vector table. No user instruction executes between these actions.

### Step 4 — The kernel validates the request before acting
The handler first checks the system-call number and arguments against a permissions table. Only after validation does it perform the requested operation (e.g., `read`, `mmap`).

### Step 5 — Return restores the original context atomically
The `SYSRET` or `IRET` instruction reloads the saved user registers, lowers privilege, and resumes execution at the instruction immediately after the system call; the user process sees the call as an ordinary subroutine yet the hardware guarantees the privilege change occurred.

### Step 6 — The mechanism is the only allowed transition
Any other attempt to reach kernel code (jmp into kernel address space, direct write to control registers) is blocked by the MMU or privilege checks, producing a fault that the kernel treats as an error.

## 5. Worked examples — every step shown

**Example 1 — Trivial getpid on x86-64 Linux**  
*Given:* A C program executes `getpid()`.  
*Find:* The exact mode transitions.  
1. Compiler emits `mov eax, 39; syscall`.  
   *Why:* 39 is the Linux x86-64 number for `getpid`; `syscall` is the trap instruction.  
2. CPU saves `RIP`, `RFLAGS`, `CS`, `SS`, `RSP` to kernel stack, loads new `CS` with ring 0, jumps to handler.  
   *Why:* Hardware guarantees atomic privilege elevation.  
3. Handler returns 1234 in `RAX`, executes `sysret`.  
   *Why:* `sysret` restores ring 3 and resumes after the `syscall`.  
**Final answer:** The process observes only the return value 1234; the mode switch is invisible yet absolute.

*Reflection:* Even the simplest call demonstrates that the trap is not optional; omitting `syscall` would leave the process unable to obtain its PID without violating hardware rules.

**Example 2 — Invalid pointer to read**  
*Given:* `read(fd, (char*)0x0, 10)`.  
*Find:* Kernel response.  
1. Trap occurs, kernel inspects `rsi`.  
   *Why:* Address 0 is never mapped for user processes.  
2. Handler returns `-EFAULT`.  
   *Why:* Validation occurs in kernel mode where the MMU permits the check.  
**Final answer:** User receives `-EFAULT`; no data copied.

*Reflection:* The trap gives the kernel a safe execution context in which to reject malformed requests that user-mode code could never safely evaluate itself.

**Example 3 — Nested page fault during system call**  
*Given:* `write` to a page swapped out.  
*Find:* Sequence of traps.  
1. `syscall` trap → kernel mode.  
2. Kernel touches user buffer → page-fault trap, still in kernel mode.  
3. Fault handler brings page in, returns to system-call handler.  
4. `sysret` back to user.  
**Final answer:** Two distinct traps, only one of which is a system call.

*Reflection:* The processor’s trap mechanism is re-entrant; kernel code must therefore preserve its own context when another trap occurs.

**Example 4 — seccomp filter on a container**  
*Given:* Docker with a seccomp profile that blocks `clone`.  
*Find:* Enforcement point.  
1. `clone` issues `syscall`.  
2. Kernel runs seccomp BPF program before any handler.  
3. BPF returns `SECCOMP_RET_KILL`; kernel terminates process.  
**Final answer:** Process never reaches the `clone` implementation.

*Reflection:* The trap is the single choke point where policy (seccomp, SELinux, capabilities) can be applied uniformly to all user requests.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating `syscall` as a fast function call | Modern CPUs optimise the instruction, hiding latency | Always measure with `perf stat -e syscalls` and account for the mode switch cost |
| Forgetting that arguments are copied, not referenced | Pointers remain in user address space | Use `copy_from_user` / `copy_to_user` in every handler |
| Assuming all traps are system calls | Page faults, breakpoints, and device interrupts also use the same mechanism | Check the vector number first in the common handler |
| Ignoring restart semantics after signals | A signal can arrive between trap entry and return | Use the `restart_block` mechanism or `ERESTARTSYS` |
| Writing directly to the syscall table from modules | Table lives in read-only memory after boot | Use the official `syscall_register` API |
| Confusing 32-bit and 64-bit ABIs on the same kernel | Different numbers and register conventions | Dispatch on `CS` segment or `orig_ax` sign bit |
| Believing user-mode code can read kernel memory after the call | The mode bit is restored by `sysret` | Verify with `access_ok` before any dereference |

## 7. The textbook-precise statement
A system call is realised by a trap instruction that causes the processor to switch from user mode (CPL = 3) to kernel mode (CPL = 0), vector through the interrupt descriptor table, and execute the corresponding handler with the full kernel address space and instruction set. On return, the `SYSRET`/`IRET` instruction atomically restores the saved user context and privilege level. The contract is defined by the architecture’s ABI and the kernel’s system-call table. (Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §2.4 and §3.2; Tanenbaum & Bos, *Modern Operating Systems*, 4e, §3.2.)

## 8. Visual — diagram or schematic
```text
User process (CPL=3)          Kernel (CPL=0)
+------------------+          +------------------+
| mov eax,NR_read  |          |  sys_read()      |
| syscall          |─────────▶|  copy_from_user  |
|                  |  trap    |  device driver   |
|                  |◀─────────|  sysret          |
+------------------+  return  +------------------+
        ▲                             │
        │   hardware saves/restores   │
        └─────────────────────────────┘
   RIP, RFLAGS, CS, SS, RSP
```

The diagram shows the single instruction `syscall` crossing the vertical privilege boundary; the return path uses a distinct instruction that the CPU will not accept from CPL=3.

## 9. The memory technique
1. **The hook** — Picture a medieval castle: the drawbridge (trap instruction) is the only legal way in; once lowered, the guards (kernel) inspect every visitor before allowing any action inside the walls.
2. **What to overlearn** — (a) `syscall`/`SVC` raises privilege, `sysret`/`IRET` lowers it; (b) arguments are validated with `copy_from_user`; (c) every transition is atomic.
3. **Spaced-repetition schedule** — Review the castle image and the three facts at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from the CPU’s privilege bit: if the bit cannot be set by ordinary instructions, the only remaining mechanism is an exception that the hardware itself elevates.

## 10. What this unlocks
Mastery of the trap path is the prerequisite for understanding process creation, virtual memory, device drivers, and container isolation.

- Implementing new system calls or `io_uring` submission queues
- Writing seccomp-bpf or eBPF LSM programs
- Designing user-mode drivers that still require occasional kernel services
- Reasoning about Spectre/Meltdown-style transient-execution attacks that abuse the same mode-switch hardware

## 11. Self-check — five questions, no answers
1. Why can a user process not simply `jmp` to the address of `sys_read`?
2. On x86-64, which registers are preserved by the kernel across a system call and which are clobbered by the calling convention?
3. A page fault occurs inside a system-call handler; is the faulting instruction the original `syscall` or an instruction inside the handler?
4. What single CPU flag change would allow user code to execute privileged instructions without using the trap mechanism, and why is it never exposed?
5. In a microkernel, a user-mode driver receives an IPC message that originated from another user process via a system call; how many mode transitions occur before the driver runs?