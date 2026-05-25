## What it is
Startup code is the very first piece of software a microcontroller's CPU executes after a power-on or reset event. Its primary job is to initialize the essential hardware and software environment, such as setting up the stack and initializing memory, before control is transferred to the main application function (e.g., `main()`). It is the critical bridge from a raw, unconfigured hardware state to a state where high-level code can run.

## Why it matters
In aerospace and safety-critical systems, startup code is the foundation of reliability. A flaw here means the entire system—a satellite's flight computer, a rocket's guidance system, or a rover's motor controller—is non-functional from the moment it's powered on. Understanding this process is non-negotiable for building robust systems that must recover predictably from power cycles or in-flight resets.

## When to study it
Before tackling this, you must have a firm grasp of:
1.  **Computer Architecture:** Specifically, the roles of the Program Counter (PC), Stack Pointer (SP), and general-purpose registers. You should understand the fetch-decode-execute cycle.
2.  **Assembly Language:** You need to be able to read, not necessarily write, basic assembly for your target architecture (e.g., ARM Cortex-M). Instructions like `LDR` (load), `STR` (store), `MOV` (move), and `B` (branch) are essential.
3.  **C Memory Model:** Understand the difference between the stack, heap, and static memory sections like `.data` (initialized global/static variables) and `.bss` (uninitialized global/static variables). You must understand what a pointer is.

If these concepts are not solid, pause and review them.

## How to study it (step by step)
1.  **Get a Datasheet:** Download the reference manual for a common microcontroller, like an STM32F4 series (based on the ARM Cortex-M4 core). Find the section on the "Reset sequence." Read it carefully to see what the hardware *guarantees* it will do on power-up.
2.  **Find the Vector Table:** In the manual, locate the memory map. Find the starting address of Flash memory (usually `0x08000000`). The manual will state that the vector table is located at this address. Note the first two entries: initial Main Stack Pointer (MSP) value and the Reset handler address.
3.  **Dissect a Real Startup File:** Open an IDE for embedded development (like STM32CubeIDE or Keil) and create a blank project. Locate the startup file, which will have a `.s` extension (e.g., `startup_stm32f407xx.s`). Read through it.
4.  **Trace the Reset Handler:** In the startup file, find the `Reset_Handler` label. Follow its logic. You will see it loads addresses related to `.data` and `.bss` sections from Flash into registers.
5.  **Understand Data Initialization:** Identify the loop that copies the initial values for your global variables (the `.data` section) from non-volatile Flash memory to their runtime location in RAM.
6.  **Understand BSS Initialization:** Identify the subsequent loop that writes zeros to the `.bss` section in RAM. This ensures all uninitialized global variables start with a value of 0, as required by the C standard.
7.  **The Final Jump:** Find the final instruction in the `Reset_Handler`. It will be a branch (`BL` or `B`) to the `main` function. This is the moment the C world begins.

## Key ideas, with intuition
1.  **The CPU is Hardwired for a Specific Address.** Upon reset, a CPU isn't smart. It's a machine that is physically wired to begin execution at a fixed memory address. For an ARM Cortex-M, the processor core fetches the address of the reset handler from memory location `0x00000004` (or its aliased location in Flash) and loads it into the Program Counter (PC). It's not magic; it's digital logic.

2.  **The Vector Table is a Signpost.** The vector table is simply an array of 32-bit memory addresses located at the very beginning of the program memory. Each entry is a pointer to a function (a "handler") for a specific event. The CPU knows that entry 0 is the initial stack pointer, entry 1 is the reset handler, entry 2 is the NMI handler, and so on.
    $$
    \text{Vector Table} = [\text{Initial SP}, \text{Reset Handler Addr}, \text{NMI Handler Addr}, \dots]
    $$

3.  **C Cannot Live Without a Stack.** Every function call in C needs a stack to store local variables, function arguments, and the return address. The `main()` function is still a C function. Therefore, the Stack Pointer (SP) register *must* be initialized with a valid RAM address *before* `main()` is ever called. The hardware itself helps by loading the initial SP value from the first entry of the vector table (`0x00000000`) automatically on reset.

4.  **Variables Must Be Moved to RAM.** Your program code and constants live in non-volatile Flash memory. However, variables must live in volatile RAM to be modified. The startup code acts as a mover, copying the initial values for your global variables (like `int g_value = 10;`) from Flash to RAM. This is the `.data` section initialization. It then clears a block of RAM for uninitialized globals (`int g_zero;`), which is the `.bss` section initialization.

## Worked example
Let's trace the boot sequence for a simplified ARM Cortex-M microcontroller.

**Assumptions:**
*   Flash memory starts at address `0x08000000`.
*   RAM starts at address `0x20000000`.
*   The top of RAM is `0x20001000`, which we'll use for the initial stack pointer.
*   The `Reset_Handler` function is located at `0x08000100`.
*   The `main` function is located at `0x08000200`.

**Step 1: The Vector Table in Flash**
The first bytes in the microcontroller's Flash memory at `0x08000000` must be the vector table. The first two 32-bit words are crucial:

| Memory Address | Value        | Description                 |
| :------------- | :----------- | :-------------------------- |
| `0x08000000`   | `0x20001000` | Initial Stack Pointer (SP) value |
| `0x08000004`   | `0x08000101` | Reset Handler Address (thumb bit set) |

*Note: The address stored for the Reset Handler is `0x08000101`, not `0x08000100`. The least significant bit (LSB) is set to 1 to indicate to the processor that the handler function uses the Thumb instruction set. The CPU automatically corrects for this and jumps to `0x08000100`.*

**Step 2: Hardware Reset Sequence**
When you power on the device:
1.  The CPU's internal logic reads the value at `0x08000000`.
2.  It loads this value, `0x20001000`, into the Stack Pointer (SP) register. The stack is now initialized.
3.  The CPU reads the value at `0x08000004`.
4.  It loads this value, `0x08000101`, into the Program Counter (PC) register.

**Step 3: Executing the Reset Handler**
The CPU is now executing code at address `0x08000100`. This is the `Reset_Handler`. A minimal handler might look like this in assembly:

```armasm
Reset_Handler:
    ; (Code to copy .data from Flash to RAM would be here)
    ; (Code to zero out .bss in RAM would be here)

    ; Now, call main.
    BL main         ; Branch with Link to the 'main' label
Loop_Forever:
    B Loop_Forever  ; If main ever returns, trap here.
```

The `BL main` instruction does two things:
1.  It stores the return address (the address of `Loop_Forever`) in the Link Register (LR).
2.  It loads the address of `main` (`0x08000200`) into the Program Counter (PC).

**Step 4: `main()` Executes**
The CPU is now executing the first instruction of your `main()` function. The stack is ready, and initialized global variables have their correct values. The embedded system is alive.

*Reflection:* Each step is a deterministic hardware or software action. The hardware is hardwired to look at specific memory addresses. The software at those addresses (the vector table and reset handler) must be correctly formatted to set up the environment that a C program expects. The process is a handover from fixed hardware logic to flexible software logic.

## Diagrams
```text
          Memory Map

+---------------------+ 0x20001000  <-- Initial Stack Pointer (SP) points here
|                     |
|   Stack (grows      |
|      down)          |
|         |           |
|         V           |
|---------------------|
|                     |
| .bss (zeroed by     |
|      startup code)  |
|---------------------|
| .data (copied from  |
|      Flash by startup) |
+---------------------+ 0x20000000  (RAM Start)


+---------------------+
|                     |
|   User Code (main)  |
|---------------------| 0x08000100
|   Reset_Handler     |
|---------------------|
|   Vector Table      |
+---------------------+ 0x08000000  (Flash Start)
```

## Memory technique — remember this forever
1.  **Mnemonic:** "**V**ery **S**trong **R**ockets **C**all **M**ain."
    -   **V**ector Table: The CPU finds this first.
    -   **S**tack Pointer: The hardware loads the SP from the table.
    -   **R**eset Handler: The hardware loads the PC with this address.
    -   **C**opy/Clear: The handler code copies `.data` and clears `.bss`.
    -   **M**ain: The handler's last act is to call `main`.

2.  **Must-know facts:**
    -   On ARM Cortex-M, Vector Table Entry 0 = Initial SP value.
    -   On ARM Cortex-M, Vector Table Entry 1 = Reset Handler Address.
    -   The startup code's job is to create the C runtime environment.

3.  **Spaced Repetition Schedule:** Review this topic in **1 day, 3 days, 7 days, 16 days, and 35 days**. Each time, try to draw the memory map diagram and recite the "VSRCM" mnemonic from memory.

4.  **First Principles Pathway:** If you forget everything, start here: A CPU needs two things to run: an instruction to execute (PC) and a place for temporary data (SP). On power-up, the hardware must be in a known state. The simplest design is for the hardware to be hardwired to look at a fixed memory location to find the initial PC and SP. This location is the start of the vector table. The rest follows logically: that code (the reset handler) must prepare memory for C (copy `.data`, zero `.bss`) before finally calling `main`.

## Common mistakes
1.  **Thinking `main()` is the first code to run.** It is never the first. A significant amount of assembly code runs before `main` is ever called.
2.  **Incorrect Linker Script:** The linker script tells the compiler where to place the vector table, `.data`, `.bss`, etc., in memory. If this script is wrong (e.g., places the vector table at the wrong address), the CPU will not find the startup code, and the device will not boot.
3.  **Forgetting `volatile`:** When interacting with hardware registers before the C environment is fully stable, or in interrupt handlers pointed to by the vector table, forgetting to declare pointers to hardware as `volatile` can cause the compiler to optimize away critical reads or writes.
4.  **Stack Overflow during Initialization:** If the startup code itself calls functions that use too much stack space before the main application's stack is fully configured, it can cause a crash during boot.

## Self-check
1.  What are the first two 32-bit words in a typical ARM Cortex-M vector table, and what is their precise purpose in the hardware reset sequence?
2.  Your C code contains the global variable `static const int lookup_table[10] = {0, 1, 2, ...};`. Does the startup code need to copy this table from Flash to RAM? Justify your answer by referencing memory sections.
3.  You are debugging a new custom board. After power-on, the device is unresponsive. You attach a debugger and halt the CPU. The Program Counter (PC) contains `0xFFFFFFFF` (a common fault address) and the Stack Pointer (SP) is `0x00000000`. What is the most likely root cause of this failure, related to the startup process?