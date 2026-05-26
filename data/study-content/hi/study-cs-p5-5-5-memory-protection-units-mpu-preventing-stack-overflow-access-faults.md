## 1. The one-sentence answer
**An MPU is a hardware block inside a microcontroller that divides the address space into configurable regions and enforces read/write/execute permissions on each region at runtime.**

Iska matlab yeh hai ki jab koi task ya ISR galti se apne stack boundary ke bahar write kare ya kisi peripheral register ko bina permission ke access kare, toh MPU turant ek exception generate kar deta hai. Isse system crash hone se pehle hi galti pakdi jaati hai aur recovery code chal sakta hai. Embedded real-time software mein yeh technique deterministic fault containment deta hai bina full MMU ke overhead ke.

> [!NOTE]
> The single most important insight is that an MPU does not translate addresses; it only checks permissions. Translation is the job of an MMU; the MPU’s sole purpose is to turn an illegal access into a precise, recoverable exception before data corruption spreads.

## 2. Why this matters — concrete and current
In the PX4 autopilot stack running on STM32H7, the MPU is used to mark the 128 kB DTCM as read-write for the flight-control task only while the logging task is restricted to read-only access; any accidental write from the logging thread immediately raises a MemManage fault that the safety monitor can log and trigger a controlled reboot.

NASA’s Core Flight System on the Mars 2020 Perseverance rover configures the Cortex-R5 MPU to isolate each of the five software partitions so that a single radiation-induced bit flip in one partition’s stack cannot overwrite another partition’s control blocks.

NXP’s S32K3 automotive MCUs use the MPU to enforce ASIL-D isolation between the ASIL-D safety core and the QM infotainment core; the configuration is validated by ISO 26262 toolchains that inject deliberate stack overflows during hardware-in-the-loop testing.

In the Zephyr RTOS on Cortex-M33, the MPU is combined with stack watermarking so that each thread’s stack is given its own region with a one-word guard at the bottom; when the watermark is crossed the kernel aborts only that thread instead of the entire device.

Infineon’s AURIX TC3xx safety MCUs expose a programmable MPU that the AUTOSAR OS uses to lock the shared RAM used by the watch-dog task, guaranteeing that even a corrupted application task cannot disable the hardware watchdog.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| ARM Cortex-M exception model | MPU raises MemManage, BusFault and UsageFault; you must know how these vectors are installed and how to read the fault status registers. |
| Memory map of the target MCU | You must know which physical addresses belong to Flash, SRAM, peripherals and external memory so you can create non-overlapping MPU regions. |
| C struct and volatile qualifiers | MPU registers are memory-mapped; you will write to them using volatile pointers and packed structs. |
| RTOS task stack layout   | You need to know where each task’s stack begins and ends so you can place guard regions exactly at those addresses. |

If any of the above four items are unfamiliar, pause and review them before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Regions are the only unit of protection
An MPU never protects individual bytes; it only protects power-of-two sized regions whose start address is aligned to the region size.  
Concrete example: on an STM32H743 you cannot protect a 17 kB stack; you must round up to the next power of two (32 kB) and place that region at a 32 kB-aligned address.  
Formal statement: a region \(R\) is defined by base address \(B\) and size \(S = 2^k\) where \(B \mod S = 0\).  
> [!WARNING]
> If the chosen base is not aligned, the hardware silently ignores the lower bits, producing a region that starts at an unexpected address and leaves part of the intended stack unprotected.

### Step 2 — Permission attributes are attached to each region
Each region carries an access permission field (AP[2:0] in ARMv7-M) that encodes combinations of privileged/user read/write/execute.  
Example: AP = 0b011 allows privileged read/write and user read-only.  
Formal: \(\text{Perm}(R) \in \{\text{NA}, \text{RO}, \text{RW}, \text{RX}, \text{RWX}\}\) for each privilege level.  
> [!WARNING]
> Forgetting to set the XN (execute-never) bit on a data-only region allows an attacker or a stray pointer to execute code from that RAM area.

### Step 3 — Overlapping regions are resolved by region number priority
When two regions overlap, the region with the higher region number wins.  
Example: region 0 covers the entire 512 kB SRAM as RW; region 3 carves out a 4 kB stack guard as NA; accesses inside the guard hit region 3 and fault.  
Formal: for address \(A\), the effective permission is taken from the highest-numbered region \(i\) such that \(A \in R_i\).  
> [!WARNING]
> Placing the guard region at a lower number than the background region silently disables the guard.

### Step 4 — Background region and the default map
Most MPUs allow a background region (region 0) that covers the entire address space; any address not covered by a higher region inherits the background permission.  
Formal: if no enabled region contains \(A\), permission = background permission (often “no access”).  
> [!WARNING]
> Leaving the background region enabled with full access defeats the entire purpose of the MPU.

### Step 5 — Fault status registers capture the exact address and cause
On Cortex-M the MemManage Fault Status Register (MMFSR) and the MemManage Fault Address Register (MMFAR) together tell you exactly which instruction and which address caused the violation.  
Formal: \(\text{MMFAR} \leftarrow A\) and the appropriate bit in MMFSR is set atomically with the fault.  
> [!WARNING]
> Reading MMFAR without first checking the VALID bit can return a stale address from a previous fault.

### Step 6 — MPU configuration must be atomic and privilege-elevated
Configuration registers are only writable in privileged mode; therefore the RTOS performs all MPU setup inside a supervisor call or while interrupts are disabled.  
Formal: any write to MPU_CTRL, MPU_RNR, MPU_RBAR or MPU_RASR performed in unprivileged mode is ignored or raises a fault.  
> [!WARNING]
> Changing region size or base while the MPU is enabled can create a transient window in which an illegal access is not detected.

### Step 7 — Textbook-grade statement
A memory-protection unit on an ARMv7-M processor implements a set of at most eight (or sixteen on ARMv8-M) variable-size regions. Each region is defined by a base address aligned to its size \(S=2^k\) (\(5\le k\le 32\)) and carries an access-permission attribute and an optional execute-never bit. The hardware evaluates, for every load, store and instruction fetch, the highest-numbered region that contains the accessed address and grants or denies the access according to that region’s attributes. A denied access raises a MemManage fault whose address is recorded in MMFAR and whose cause is recorded in MMFSR (ARMv7-M Architecture Reference Manual, DDI 0403E, §B3.3).

## 5. Worked examples — har step show karo

**Example 1 — Minimal single-region guard**  
*Given:* 8 kB stack at 0x2000_0000.  
*Find:* MPU region that prevents writes below the stack.  
Step 1: choose size \(S=8\) kB = \(2^{13}\).  
Step 2: set base = 0x2000_0000 (already aligned).  
Step 3: set AP = 0b011 (privileged RW, user RO) and XN = 1.  
Step 4: enable region 0 and MPU.  
*Why* each step: alignment guarantees the hardware accepts the region; AP bits implement the intended policy; XN prevents code execution from stack.  
**Final answer**  
Region 0: BASE=0x20000000, SIZE=13, AP=0b011, XN=1, ENABLE=1.

**Example 2 — Guard plus background**  
*Given:* same 8 kB stack plus need to keep the rest of SRAM inaccessible.  
*Find:* two-region configuration.  
Region 7 (higher priority): BASE=0x20000000, SIZE=13, AP=0b011, XN=1.  
Region 0 (background): BASE=0x00000000, SIZE=32, AP=0b000 (no access).  
*Why*: higher region number wins inside the stack; outside the stack the background denies everything.  
**Final answer**  
Two regions with region 7 overriding region 0 inside the stack window.

**Example 3 — Detecting stack overflow at runtime**  
*Given:* thread stack 0x20001000–0x200017FF.  
*Find:* configuration that faults on write to 0x20000FFC.  
Create 32-byte guard region at 0x20000FE0, SIZE=5, AP=0b000.  
When SP drops to 0x20000FF8 and a push occurs, address 0x20000FFC matches the guard region → MemManage fault.  
*Why*: 32-byte granularity is the smallest power-of-two that still fits the alignment rule.  
**Final answer**  
Guard region at 0x20000FE0 catches any access below the declared stack bottom.

**Example 4 — Overlapping regions priority**  
*Given:* region 1 covers 0x20000000–0x2000FFFF RW; region 3 covers 0x20001000–0x200010FF NA.  
*Find:* effective permission at 0x20001040.  
Because region 3 has higher number and contains the address, permission = NA.  
*Why*: the architecture always selects the highest-numbered matching region.  
**Final answer**  
Address 0x20001040 is denied even though it lies inside region 1.

*Reflection*: the last two examples are tricky because they require exact knowledge of alignment and region-number priority; generalising, always place guard regions at higher numbers than background regions.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to set XN on data regions | Default value after reset is often XN=0 | Always write the full RASR register including XN bit in the same store instruction. |
| Using non-power-of-two sizes | Programmer thinks any size is legal | Round every region size up to the next \(2^k\) and adjust the base address accordingly. |
| Placing guard region at lower number than background | Intuitive but wrong priority rule | Always assign guard regions numbers 4–7 and background region 0. |
| Reading MMFAR without checking VALID bit | Previous fault value remains in the register | Read MMFSR first; only trust MMFAR when VALID=1. |
| Reconfiguring MPU while interrupts are enabled | Another task may execute during the window | Perform all MPU writes inside a critical section or via SVC. |
| Assuming the MPU is enabled after reset | Most MCUs leave it disabled | Explicitly write 1 to MPU_CTRL.ENABLE in the startup code. |
| Overlapping regions with execute permission | Code can be executed from a data region via the higher-priority mapping | Audit every region that has XN=0 and ensure it never overlaps a writable data region. |

## 7. The textbook-precise statement
On an ARMv7-M processor the MPU is a programmable array of at most eight region descriptors. Each descriptor \(i\) consists of RBAR\(_i\) (31:5 base address, 4:0 reserved) and RASR\(_i\) (31:29 reserved, 28 XN, 27:26 reserved, 24:22 AP, 21:19 reserved, 18:16 TEX, 15:13 S, 12:10 C, B, 5 SRD, 4:1 SIZE, 0 ENABLE). For any memory access to address \(A\), the MPU evaluates every enabled region in descending order of \(i\). The first (highest \(i\)) region that satisfies \(A \& \sim(S_i-1) = B_i\) supplies the access permission. If no region matches, the access is denied unless a background region is enabled. A denied access sets MMFSR.MMARVALID and loads MMFAR with \(A\), then raises the MemManage exception (ARM Architecture Reference Manual, ARMv7-M, DDI 0403E, section B3.3 “Protected Memory System Architecture”).

## 8. Visual — diagram or schematic
```text
Address space (32-bit)
0x2000_0000  +------------------+  <-- Region 7 (stack, 8 kB, RW, XN=1)
             |  Thread stack    |
0x2000_1FFF  +------------------+  
0x2000_2000  |                  |
             |  Background      |  <-- Region 0 (entire SRAM, NA)
             |  (no access)     |
0x2000_FFFF  +------------------+
```

## 9. The memory technique

1. **The hook** — Imagine the MPU as eight concentric castle walls; each wall has a single gate with a guard who only lets certain people (read/write/execute) pass. The highest-numbered wall always checks first.

2. **What to overlearn** — Region size must be \(2^k\) and base must be aligned to that size; region priority is strictly descending numeric order; MMFAR is valid only when MMFSR.VALID=1.

3. **Spaced-repetition schedule** — Review the alignment rule after 1 day, the priority rule after 3 days, a full worked configuration after 7 days, and design a two-region system from scratch after 16 days, then again after 35 days.

4. **First-principles fallback** — If you forget the register layout, remember that every access is checked against “does any enabled region contain this exact address and does its permission bitmask allow the operation?”; rebuild the configuration by enumerating the needed regions from highest to lowest priority.

## 10. What this unlocks
Once you can configure an MPU reliably you can move to higher-level safety mechanisms such as memory-partitioned RTOS tasks, spatial isolation for mixed-criticality systems, and hardware-assisted stack-smashing protection without software canaries.

- Next topic: Memory Management Units (MMU) and virtual address translation on Cortex-A.
- Next topic: ARM TrustZone and secure/non-secure region partitioning.
- Next topic: Static analysis tools that verify MPU region overlap and permission correctness.

## 11. Self-check — five questions, no answers
1. On an STM32H7, can you create a 12 kB protected region? Explain why or why not using the alignment rule.

2. Two regions overlap at address 0x20001234. Region 2 permits RW; region 5 permits NA. Which permission is applied and why?

3. After a MemManage fault you read MMFAR and obtain 0x20000000, yet MMFSR.VALID is 0. What does this mean?

4. You must protect a 4 kB stack that starts at 0x2000_0F00. What is the smallest legal MPU region you can use, and what base address must you choose?

5. In a mixed-criticality system the safety task must remain able to write a hardware watchdog register even when all application tasks are denied access to that peripheral. Which MPU feature lets you achieve this without disabling the MPU entirely?