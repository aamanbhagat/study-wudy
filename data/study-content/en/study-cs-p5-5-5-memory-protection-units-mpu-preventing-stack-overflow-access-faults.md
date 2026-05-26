## 1. The one-sentence answer
**An MPU is a hardware block that partitions physical memory into regions and enforces access permissions on each region, generating a fault on any violation.**

In bare-metal or real-time embedded code the processor executes instructions and performs loads and stores against a flat address space. Without protection, a single out-of-bounds write—most often caused by stack growth beyond its allocated frame—can silently corrupt another task’s data, the heap, or even the vector table. The MPU inserts itself between the CPU and the memory system: before every access the hardware checks the address against a small set of programmable regions; each region carries independent read, write and execute attributes plus a privilege level. A mismatch immediately raises a MemManage fault that the real-time operating system or safety handler can treat as a deterministic error rather than an undefined crash.

The same mechanism also blocks execution from data regions and writes to read-only flash, closing entire classes of exploits and timing faults that are unacceptable in safety-critical controllers.

> [!NOTE]
> The decisive insight is that the MPU does not translate addresses; it only inspects them. Consequently it adds zero cycles on a hit and a deterministic fault on a miss—exactly what hard real-time systems require.

## 2. Why this matters — concrete and current
NASA’s Mars 2020 Perseverance rover runs the F’ flight software on a RAD750 processor whose MPU regions isolate the real-time OS, the file-system cache, and the instrument data buffers; a single stack overflow in the mobility task would otherwise have corrupted the command uplink.

Automotive ECUs built on Infineon Aurix TC3xx microcontrollers use the MPU to separate ASIL-D safety tasks from QM (non-safety) code; ISO 26262 explicitly credits the hardware memory-protection unit for achieving freedom-from-interference between partitions.

ARM Cortex-M33 microcontrollers in STMicroelectronics STM32H5 devices expose eight MPU regions that FreeRTOS v10.6 can assign per-task stack guards; the resulting configuration is used in millions of industrial motor drives where an undetected overflow would violate IEC 61508 SIL-2 timing guarantees.

In the nRF5340 Bluetooth LE stack, Nordic Semiconductor configures the MPU to make the radio DMA buffers read-only for the application CPU, eliminating a documented attack vector that previously allowed malicious over-the-air packets to overwrite control flow.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Flat physical memory map   | MPU regions are defined directly on physical addresses    |
| Exception model (faults)   | Violations are reported via MemManage or HardFault        |
| Task stack layout          | Stack-overflow detection relies on a guard region below each stack |
| Privilege levels (privileged/unprivileged) | MPU attributes can be conditioned on current privilege    |

## 4. Building the idea — from intuition to formalism

### Step 1 — Memory is divided into regions
A region is a contiguous, power-of-two sized block of addresses aligned to its own size.  
Example: addresses 0x2000_0000–0x2000_0FFF form a 4 KiB region.  
Formally, a region \(R_i\) is the half-open interval \([B_i, B_i + 2^{S_i})\) where \(B_i\) is a multiple of \(2^{S_i}\).  
> [!WARNING]  
> If alignment is ignored, the hardware silently ignores the lowest bits of the base address, producing an unexpected region boundary.

### Step 2 — Each region carries an access-attribute triple
The triple is \(\{r, w, x\}\) plus a privilege qualifier.  
A load succeeds only if the current privilege satisfies the read bit; analogous rules hold for stores and instruction fetches.  
Formally, an access \(A = (\text{addr}, \text{op}, \text{priv})\) is permitted by \(R_i\) when \(\text{addr} \in R_i\) and the corresponding bit in the attribute word is set for \(\text{priv}\).

### Step 3 — Overlapping regions are resolved by priority
Regions are numbered; higher numbers take precedence.  
This ordering lets a programmer place a small “guard” sub-region inside a larger readable region.

### Step 4 — Violations generate a synchronous fault
On the first disallowed access the MPU asserts a MemManage exception before the memory transaction is issued.  
The fault status register records the violating address and the faulting instruction address.

### Step 5 — Stack-overflow prevention follows directly
Allocate each task stack so that the word immediately below the stack limit belongs to a zero-size or no-access region. Growth past the limit therefore triggers the fault synchronously with the offending store.

### Step 6 — Configuration is performed through memory-mapped registers
The MPU_TYPE, MPU_CTRL, MPU_RNR, MPU_RBAR and MPU_RASR registers (ARMv7-M) or their ARMv8-M equivalents define the active set. All registers are only writable from privileged mode.

### Step 7 — The formal safety property
Let \(T\) be the set of all memory transactions issued by a task. After MPU configuration the subset of transactions that reach memory is exactly those permitted by the region table for that task’s privilege level.

## 5. Worked examples — every step shown

**Example 1 — Minimal read-only region**  
*Given:* Base = 0x0800_0000, size = 64 KiB, attributes = read-only privileged.  
*Find:* The RASR value for ARMv7-M.  
Step 1: size field \(S = \log_2(64\text{KiB}) - 1 = 15\).  
*Why* — the SIZE field encodes \(2^{S+1}\) bytes.  
Step 2: TEX = 0, S = 0, C = 1, B = 0, AP = 0b110 (privileged read-only).  
Step 3: RASR = (1 << 28) | (AP << 24) | (S << 16) | (15 << 1).  
**0x1300_801E**  
*Reflection* — the enable bit and the size encoding are the two most common sources of misconfiguration.

**Example 2 — Detecting stack overflow**  
*Given:* Task stack at 0x2000_1000–0x2000_1FFF, guard region immediately below.  
*Find:* MPU region that catches writes below 0x2000_1000.  
Step 1: Create region base = 0x2000_0FF0, size = 16 bytes, AP = no access.  
*Why* — any store that would cross the boundary lands inside the guard.  
Step 2: Enable the region and set the MemManage handler to log the fault.  
**Guard region configured; overflow produces synchronous MemManage fault.**  
*Reflection* — the guard need not be large; 4–32 bytes suffice because the MPU checks every access.

**Example 3 — Unprivileged task isolation**  
*Given:* Two tasks, one privileged, one unprivileged, sharing SRAM.  
*Find:* Region set that prevents the unprivileged task writing the privileged stack.  
Step 1: Region 0: full SRAM, privileged read/write.  
Step 2: Region 1: privileged stack, privileged only.  
Step 3: On context switch to unprivileged task, leave both regions active; the higher-priority region blocks the write.  
**Unprivileged writes to privileged stack now fault.**  
*Reflection* — region priority replaces the need to reprogram the entire table on every switch.

**Example 4 — Execute-never data region**  
*Given:* A 1 KiB data buffer that must never be executed.  
*Find:* Configuration that raises a fault on any instruction fetch from the buffer.  
Step 1: Set XN = 1 in the region attribute.  
Step 2: Any branch target inside the region produces an instruction-fetch fault.  
**XN bit blocks code injection from data.**  
*Reflection* — XN is orthogonal to read/write bits and is required for W^X policy.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting region alignment       | Base address bits below size are ignored by hardware| Always mask base to the chosen size before writing   |
| Overlapping regions with wrong priority | Higher number wins; order of programming misleads   | Draw the final memory map on paper before coding     |
| Leaving MPU disabled during fault handler | Recursive faults become HardFault                   | Keep at least region 0 enabled with privileged access|
| Size field off-by-one             | SIZE encodes \(2^{S+1}\), not \(2^S\)               | Use a macro that subtracts one from log2             |
| Not invalidating stale region descriptors on task delete | Old stack guard remains mapped                      | Clear or reconfigure region on every context switch  |
| Assuming 8 regions are sufficient | Cortex-M has only 8; complex systems run out        | Use sub-region disables or overlap tricks            |
| Ignoring bus-fault vs. MemManage  | Some accesses bypass MPU and raise BusFault         | Read the fault-status registers in the handler       |

## 7. The textbook-precise statement
In ARMv7-M (ARM DDI 0403E.b, §B3.5) the MPU is defined as “a programmable memory-protection unit that allows regions of memory to be defined with independent access permissions.” A memory transaction is permitted if and only if it matches at least one enabled region whose attributes authorise the operation at the current privilege level; otherwise a MemManage fault (vector 4) is raised synchronously. The same definition, with extended region counts and limited sub-region support, appears in ARMv8-M (ARM DDI 0553B).

## 8. Visual — diagram or schematic
```text
0x2000_2000  ┌─────────────────────────────┐
             │ Region 2: unpriv. heap      │  RW, XN
0x2000_1800  ├─────────────────────────────┤
             │ Region 1: priv. stack guard │  no access
0x2000_17F0  ├─────────────────────────────┤
             │ Region 0: priv. stack       │  RW, priv only
0x2000_1000  └─────────────────────────────┘
             ▲
             │  MPU checks every address against the highest-priority
             │  matching region before the bus transaction is issued.
```

## 9. The memory technique

**The hook**  
Picture the MPU as eight sliding glass doors across a corridor; each door has its own lock (read/write/execute) and only the highest-numbered closed door matters. A single misaligned door leaves the corridor open.

**What to overlearn**  
- Region base must be aligned to region size.  
- SIZE field = \(\log_2(\text{size})-1\).  
- MemManage fault is synchronous and supplies the faulting address in MMFAR.

**Spaced-repetition schedule**  
Review the three facts above at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive the permitted set by enumerating every possible address against the active region list and checking the attribute bits.

## 10. What this unlocks
MPU mastery is the prerequisite for safe multi-tasking on microcontrollers that lack an MMU. It directly enables the next topics of task isolation in real-time operating systems, spatial separation for functional-safety certification, and the later introduction of a full Memory Management Unit on application processors.

- Per-task stack guards in FreeRTOS, Zephyr, ThreadX  
- Processor-mode aware region programming  
- Integration with the ARMv8-M Security Extension (TrustZone-M)  
- Memory-partitioning proofs required by ISO 26262 and IEC 61508

## 11. Self-check — five questions, no answers
1. A 32 KiB region base address is given as 0x2000_1234. Will the hardware accept it, and if not, what address will actually be used?  
2. Two overlapping regions grant contradictory permissions to the same address; which permission wins and why?  
3. After an MPU fault the handler reads MMFAR = 0x2000_0FF8. Which instruction most likely caused the fault?  
4. Explain why an MPU cannot protect against a DMA engine that writes directly to a protected buffer.  
5. A developer enables the MPU but forgets to set the PRIVDEFENA bit. What happens on the first unprivileged load after reset?