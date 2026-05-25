## What it is
A Memory Protection Unit (MPU) is a hardware component within a CPU that enforces access rules on memory. It divides memory into a small number of configurable regions, each with specific permissions (e.g., read-only, no-execute). If a piece of software attempts to violate these rules, such as writing to a read-only region, the MPU blocks the access and triggers a hardware fault, preventing memory corruption.

## Why it matters
In safety-critical systems like flight control software for a rocket or a satellite's attitude control system, a single stray pointer writing to the wrong memory address can be catastrophic. An MPU provides a hardware-enforced barrier that turns silent data corruption—the most insidious type of bug—into a loud, immediate, and handleable fault. This is fundamental for building reliable real-time systems and for isolating tasks in a Real-Time Operating System (RTOS).

## When to study it
Before tackling MPUs, you must have a firm grasp of the following. If not, study them first.
1.  **C Programming:** Specifically, pointers, pointer arithmetic, and the memory layout of a C program (stack, heap, .data, .text sections).
2.  **Computer Architecture:** Understand the concept of a memory map, memory-mapped peripherals, the program counter (PC), and the stack pointer (SP).
3.  **Operating Systems Concepts:** The difference between privileged (kernel) and unprivileged (user) execution modes.

## How to study it (step by step)
1.  **Draw a Memory Map:** Find the datasheet for a common microcontroller (e.g., an ARM Cortex-M4 like the STM32F4 series). Draw its memory map, labeling the addresses for Flash, SRAM, and key peripherals. This makes the abstract concept of memory concrete.
2.  **Read the Manual:** Locate the MPU chapter in that microcontroller's reference manual. Don't try to memorize it. Instead, identify the key registers: one to enable/disable the MPU, and sets of registers for defining a region's base address, size, and access attributes.
3.  **Induce a Fault (No MPU):** Write a simple C program with a recursive function that has no base case, guaranteeing a stack overflow. Run it on hardware (or a simulator) and observe how it likely corrupts data or crashes unpredictably.
4.  **Configure a Stack Guard:** Modify your program to configure the MPU. Define one region for your main stack. Then, define a small, 256-byte "guard" region immediately below the stack with all access permissions disabled.
5.  **Trigger the Fault (With MPU):** Run the same recursive function. This time, instead of silent corruption, the processor should immediately jump to a fault handler (e.g., `MemManage_Handler` on ARM Cortex-M) as soon as the stack pointer enters the guard region.
6.  **Implement a Fault Handler:** Write a basic fault handler that, for example, blinks an LED or prints an error message to a serial port. This demonstrates how you can catch and gracefully handle memory errors instead of letting them cause system failure.

## Key ideas, with intuition
1.  **MPU as a Bouncer:** An MPU is like a bouncer at a club with several VIP sections (memory regions). The bouncer doesn't move the sections around; it just checks your ID (the CPU's execution state) and your ticket (the memory address being accessed) against a list of rules for that section. If you try to enter a section you're not allowed in, you're thrown out (a fault is triggered). This is different from a Memory Management Unit (MMU), which is more like a concierge that gives you a "virtual" room number and translates it to a real one, rearranging the hotel layout as needed. MPU is simpler: protection, not virtualization.

2.  **Regions are Coarse-Grained:** Unlike an MMU's fine-grained page table, an MPU typically manages only a few regions (e.g., 8 or 16). These regions have constraints, often requiring their size to be a power of two and their base address to be aligned to their size.
    $$ \text{RegionBaseAddress} \pmod{\text{RegionSize}} = 0 $$
    This makes the hardware simple and fast. The trade-off is that you can't protect every tiny object, but you can protect large, critical areas like the stack, kernel data, or peripheral registers.

3.  **The Fault is the Feature:** The goal isn't just to block a bad memory access. The crucial feature is the **hardware exception** (fault) that is generated. This atomically stops the offending instruction and transfers control to a trusted piece of code—the fault handler. This handler can then safely inspect the system state, log the error, kill the faulty task, and potentially recover the system, turning a fatal error into a manageable event.

4.  **Privilege Levels:** The MPU rules can differ for privileged (kernel/OS) and unprivileged (user/task) code. This is the foundation of task isolation. The OS can configure the MPU so that a user task can only access its own stack and data. When the OS switches to another task, it reprograms the MPU to enforce the new task's memory boundaries.

## Worked example
Let's configure a stack guard on a hypothetical ARM Cortex-M MCU. Assume our SRAM is at address `0x20000000` and is 128KB long. Let's allocate the top 16KB for the main stack.

**Goal:** Protect against stack overflow by placing a non-accessible guard region below the stack.

**Memory Layout:**
*   SRAM ends at `0x2001FFFF`.
*   Stack (16KB) will be from `0x2001C000` to `0x2001FFFF`. The stack grows downwards from the top.
*   Stack Guard (256 bytes) will be from `0x2001BF00` to `0x2001BFFF`.

**MPU Configuration Steps (in C-like pseudocode):**

1.  **Disable MPU during configuration:**
    ```c
    // MPU_CTRL is the MPU Control Register
    MPU->CTRL = 0;
    ```
    *Reflection:* You must disable the MPU before changing its settings to avoid unpredictable behavior while regions are being redefined.

2.  **Configure the main Stack Region (Region 0):**
    ```c
    // Configure Region 0: 16KB size, base address 0x2001C000
    MPU->RNR = 0; // Select region 0
    MPU->RBAR = 0x2001C000; // Set base address
    // Set size and attributes. A typical register combines these.
    // SRD=0 (subregions enabled), SIZE=13 (2^14=16KB), AP=3 (RW for all), XN=1 (Execute Never)
    MPU->RASR = (1 << 28) | (3 << 24) | (13 << 1);
    ```
    *Reflection:* We define the valid stack area. We make it Read/Write (`AP=3`) so the program can push and pop, but we also set the Execute Never (`XN`) bit. This prevents stack-based buffer overflow attacks from injecting and running malicious code.

3.  **Configure the Stack Guard Region (Region 1):**
    ```c
    // Configure Region 1: 256B size, base address 0x2001BF00
    MPU->RNR = 1; // Select region 1
    MPU->RBAR = 0x2001BF00;
    // SIZE=7 (2^8=256B), AP=0 (No access for anyone)
    MPU->RASR = (0 << 24) | (7 << 1);
    ```
    *Reflection:* This is the crucial step. This region is configured with Access Permissions (`AP`) set to "No Access". Any read or write to this address range will now trigger a fault. Because it's placed directly below the valid stack region, the very first instruction that overflows the stack will be caught.

4.  **Enable MPU:**
    ```c
    // Enable MPU with default memory map for privileged code
    MPU->CTRL = (1 << 2) | 1; // PRIVDEFENA=1, ENABLE=1
    ```
    *Reflection:* The MPU is now active. The hardware will check every memory access against these configured rules. The `PRIVDEFENA` bit ensures that the rest of memory (like our code in Flash) remains accessible to the OS.

## Diagrams
```text
SRAM Memory Map with MPU Regions

Address
0x2001FFFF  +-------------------------+ <--- Initial Stack Pointer (SP)
            |                         |
            |      Stack Region       |
            | (16KB, RW, No-Execute)  |
            |     (MPU Region 0)      |
            |                         |
            |  Stack grows downwards  |
            |           |             |
            |           V             |
0x2001C000  +-------------------------+
0x2001BFFF  +-------------------------+ <--- Stack Guard Region
            |  (256B, No Access)      |      (MPU Region 1)
0x2001BF00  +-------------------------+
            |                         |
            |   Rest of SRAM / Heap   |
            |                         |
            .                         .
            .                         .
0x20000000  +-------------------------+
```

## Memory technique — remember this forever
1.  **Mnemonic:** MPU stands for **M**emory **P**olice **U**nit. It doesn't create new address spaces (like an MMU). It patrols the existing memory map and arrests any code that breaks the access rules by triggering a fault.

2.  **Facts to Overlearn:**
    *   An MPU defines **Regions** with a **Base Address**, **Size**, and **Access Permissions**.
    *   An access violation triggers a hardware **fault exception**.
    *   A primary use is a **stack guard**: a small, no-access region placed just outside the valid stack boundary.

3.  **Spaced Repetition Schedule:** Review this material at: 1 day, 3 days, 7 days, 16 days, 35 days. Actively redraw the diagram and re-write the worked example from memory.

4.  **First Principles Pathway:** If you forget the details, rebuild it.
    *   **Problem:** Software has bugs. A buggy pointer can write anywhere, corrupting critical data or code.
    *   **Question:** How can we enforce memory boundaries in hardware, cheaply?
    *   **Solution:** We can't check every byte. Let's define large regions. What does a region need? A start (Base Address) and a length (Size). What rules do we need? Who can read, who can write, who can execute (Access Permissions). What happens on a violation? Stop the program and jump to a trusted handler (Fault Exception). This logical chain reconstructs the entire concept of an MPU.

## Common mistakes
1.  **Confusing MPU with MMU:** An MPU does *not* perform virtual-to-physical address translation. It works entirely with physical addresses. An MMU is for virtual memory systems (like on your desktop OS); an MPU is for protection in real-time/embedded systems.
2.  **Ignoring Alignment/Size Constraints:** MPU region sizes are almost always powers of two, and the base address must be aligned to that size. Trying to create a 37KB region starting at `0x20001234` will fail. You must pick the next largest power of two (64KB) and align the base address to a 64KB boundary.
3.  **Region Overlap Priority:** MPUs have a limited number of regions, and they have a priority scheme (e.g., higher region number overrides lower). A common mistake is defining a large, permissive "background" region (e.g., all of SRAM is RW) with a low number, and then a smaller, more restrictive region inside it with a higher number. If you get the numbers wrong, the large permissive region's rules will apply, nullifying your protection.
4.  **Writing an Empty Fault Handler:** Configuring the MPU is only half the job. If your `MemManage_Handler` is just an empty infinite loop (`while(1);`), you've detected the fault but haven't made your system any more robust. The handler must perform a useful action (log, reset task, etc.).

## Self-check
1.  Your system has code in Flash from `0x08000000` to `0x0800FFFF` and data in SRAM from `0x20000000` to `0x20007FFF`. Describe the MPU regions (base, size, permissions) you would configure to enforce that code is executable but not writable, and data is writable but not executable.
2.  A system without an MPU experiences a stack overflow due to a runaway recursion. What is the likely sequence of events? Now, describe the different sequence of events if an MPU with a stack guard is enabled. Be specific about what the CPU hardware does at the moment of the overflow.
3.  An RTOS needs to isolate two tasks. Task A has its stack at `0x20001000` (4KB). Task B has its stack at `0x20002000` (4KB). How can the RTOS context switcher use a single MPU region to protect the currently running task's stack from being accessed by any other code? What MPU register(s) must it update every time it switches between Task A and Task B?