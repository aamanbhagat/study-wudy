## What it is
A linker script is a configuration file that tells the linker tool how to map the output of your compiled code—specifically, its different logical sections—into the physical memory regions of a target device. It acts as the blueprint for your program's final memory layout, dictating precisely where code and data will reside in memory addresses.

## Why it matters
In aerospace and high-performance computing, precise memory placement is non-negotiable. A flight controller might place its core control loop in tightly-coupled memory (TCM) for zero-wait-state execution, while storing non-critical logging data in slower external RAM. For scientific instruments on a rover, you might place calibration constants in non-volatile flash memory protected from radiation-induced bit flips, ensuring the integrity of your measurements.

## When to study it
Before tackling this, you must have a firm grasp of:
1.  **C/C++ Programming:** Specifically, the difference between initialized global/static variables (`int x = 5;`), uninitialized global/static variables (`int y;`), and code (functions).
2.  **Computer Architecture:** The distinction between volatile memory (RAM) and non-volatile memory (Flash, EEPROM). Understand the memory hierarchy and that the CPU executes instructions from memory addresses.
3.  **The Compilation Toolchain:** Know that a compiler turns source code into object files (`.o`), and a linker combines these object files into a single executable file. This topic details the "linker" step.

## How to study it (step by step)
1.  **Compile, Don't Link:** Take a simple C program with one initialized global, one uninitialized global, and one function. Compile it to an object file using `gcc -c main.c -o main.o`.
2.  **Inspect the Sections:** Use the `objdump -h main.o` command. Identify the `.text`, `.data`, and `.bss` sections. Note their names and sizes. This shows you what the compiler produces *before* the linker script is involved.
3.  **Write a Minimal Linker Script:** Create a text file (`linker.ld`). Define a `MEMORY` block for a hypothetical chip with 128KB of FLASH and 32KB of RAM. Define a `SECTIONS` block that places only the `.text` section into FLASH.
4.  **Link and Verify:** Use the linker directly (`ld -T linker.ld main.o -o firmware.elf`) to create an executable. Use `objdump -h firmware.elf` again. Verify that the `.text` section is now assigned a memory address inside your defined FLASH region.
5.  **Expand the Script:** Modify your `linker.ld` to also place the `.data` and `.bss` sections into the RAM region. Re-link and re-inspect the output.
6.  **Handle `.data` Initialization:** Research and implement the logic for Load Memory Address (LMA) vs. Virtual Memory Address (VMA). Modify the script to place the *runtime location* of `.data` in RAM, but its *initialization values* at the end of the `.text` section in FLASH. This is a critical concept in embedded systems.

## Key ideas, with intuition
1.  **MEMORY: The Physical Hardware.** The linker knows nothing about your specific microcontroller. You must first describe the physical memory map to it. This is done with the `MEMORY` command, which defines named regions with an origin address and a length.
    $$
    \text{MEMORY \{ FLASH (rx) : ORIGIN = 0x08000000, LENGTH = 128K \\ RAM (rwx) : ORIGIN = 0x20000000, LENGTH = 32K \} }
    $$
    *Intuition:* You are giving the linker a map of the real estate it can build on. "Here is a plot of land called FLASH, it starts here and is this big. Here is another called RAM."

2.  **SECTIONS: The Logical Contents.** Your code isn't a single monolithic blob. The compiler sorts it into logical containers called sections. The three most important are:
    *   `.text`: The executable machine code (your functions). Read-only.
    *   `.data`: Initialized global and static variables (e.g., `int global_var = 42;`). Read-write.
    *   `.bss`: Uninitialized global and static variables (e.g., `static int uninit_array[10];`). The standard says these must be zero-initialized before `main()` runs. Read-write.
    *Intuition:* The compiler is like a moving company packing your house. It puts all the books in "book boxes" (`.text`), fragile dishes in "dish boxes" (`.data`), and miscellaneous items in "misc boxes" (`.bss`). The linker's job is to decide which room each box goes into.

3.  **The Mapping: Placing Sections into Regions.** The core of the linker script is the `SECTIONS` block. This is where you tell the linker, "Take this section (e.g., `.text`) and place it inside this memory region (e.g., `FLASH`)."
    $$
    \text{SECTIONS \{ .text : \{ *(.text) \} > FLASH \\ .data : \{ *(.data) \} > RAM \\ .bss : \{ *(.bss) \} > RAM \} }
    $$
    *Intuition:* This is the instruction sheet for the movers. "Put all 'book boxes' (`*(.text)`) in the Library (`FLASH`). Put all 'dish boxes' (`*(.data)`) and 'misc boxes' (`*(.bss)`) in the Kitchen (`RAM`)."

4.  **LMA vs. VMA: The Startup Problem.** Your variables in `.data` need to be in RAM to be modified. But RAM is volatile and loses its contents on power-off. The initial values (like `42`) must be stored in non-volatile FLASH.
    *   **LMA (Load Memory Address):** Where the section is *stored* in the final binary file (in FLASH).
    *   **VMA (Virtual Memory Address):** Where the section *runs* from at runtime (in RAM).
    For `.data`, the LMA is in FLASH and the VMA is in RAM. Startup code must copy the data from LMA to VMA before `main()` is called.
    $$
    \text{.data : \{ ... \} > RAM AT> FLASH}
    $$
    *Intuition:* Imagine you buy a bookshelf flat-packed from IKEA (the LMA in FLASH). You store the box in your garage. To use it, you must first carry it into your living room (the VMA in RAM) and assemble it. The "startup code" is you doing the assembly.

## Worked example
**1. C Source Code (`main.c`)**
```c
#include <stdint.h>

uint32_t initialized_var = 0xDEADBEEF; // Goes into .data
uint32_t uninitialized_var;              // Goes into .bss

int main(void) {
    uint32_t local_var = 0; // On the stack, not handled by this script
    local_var = initialized_var;
    uninitialized_var = local_var;
    while(1) {
        // Loop forever
    }
    return 0;
}
```

**2. Linker Script (`linker.ld`)**
```ld
/* Define the memory map of our hypothetical MCU */
MEMORY
{
  FLASH (rx) : ORIGIN = 0x08000000, LENGTH = 128K
  RAM (rwx)  : ORIGIN = 0x20000000, LENGTH = 32K
}

/* Define a symbol for the top of the stack */
_estack = ORIGIN(RAM) + LENGTH(RAM);

/* Define the sections layout */
SECTIONS
{
  /* The .text section goes into FLASH */
  .text :
  {
    KEEP(*(.isr_vector)) /* Keep the interrupt vector table at the start */
    *(.text*)          /* All .text sections from all input files */
    *(.rodata*)        /* All read-only data */
    _etext = .;         /* Define a symbol at the end of .text */
  } > FLASH

  /* Store the initial values for .data in FLASH, right after .text */
  _sidata = LOADADDR(.data);

  /* The .data section's runtime location is in RAM */
  .data :
  {
    _sdata = .;         /* Define a symbol for the start of .data in RAM */
    *(.data*)          /* All .data sections */
    _edata = .;         /* Define a symbol for the end of .data in RAM */
  } > RAM AT> FLASH

  /* The .bss section is also in RAM, right after .data */
  .bss :
  {
    _sbss = .;          /* Define a symbol for the start of .bss */
    *(.bss*)           /* All .bss sections */
    *(COMMON)          /* All COMMON sections */
    _ebss = .;          /* Define a symbol for the end of .bss */
  } > RAM
}
```

**3. Reflection**
*   **Step 1 (MEMORY):** We defined the physical hardware constraints. The linker now knows the valid address ranges for `FLASH` and `RAM`.
*   **Step 2 (SECTIONS - .text):** We instructed the linker to take all code (`.text*`) and read-only data (`.rodata*`) from all input object files (`*`) and place them sequentially into the `FLASH` region starting at `0x08000000`.
*   **Step 3 (SECTIONS - .data):** This is the crucial part. We told the linker to allocate space for `.data` in the `RAM` region (its VMA). The `AT> FLASH` command tells the linker to place the *initial contents* of `.data` (the value `0xDEADBEEF`) in the `FLASH` region, immediately following the `.text` section. We created symbols `_sidata`, `_sdata`, and `_edata` that startup code will use to perform the copy: `memcpy` from `_sidata` to `_sdata` for `_edata - _sdata` bytes.
*   **Step 4 (SECTIONS - .bss):** We instructed the linker to allocate space for `.bss` in `RAM` immediately after `.data`. No `AT>` command is needed because `.bss` has no initial values to load; it just needs to be zeroed out by startup code, using the `_sbss` and `_ebss` symbols to know where to start and stop.

## Diagrams
This diagram shows the final memory layout after linking and at program startup.

```text
       MCU Memory Map
+---------------------+ 0x08000000 (FLASH Start)
| Interrupt Vectors   | }
| .text (code)        | } .text section (VMA and LMA are here)
| .rodata (constants) | }
+---------------------+ <-- _etext / _sidata (LMA of .data)
| .data init values   | } Stored in FLASH but copied to RAM
+---------------------+
| (unused FLASH)      |
|                     |
+---------------------+ 0x08020000 (FLASH End)


+---------------------+ 0x20000000 (RAM Start) <-- _sdata (VMA of .data)
| .data (initialized  | } Copied from FLASH at boot
|       variables)    | }
+---------------------+ <-- _edata / _sbss
| .bss (zeroed        | } Zeroed out at boot
|      variables)     | }
+---------------------+ <-- _ebss
|                     |
|       Heap          |
|      (grows ^)      |
+---------------------+
|      (unused RAM)   |
+---------------------+
|      (grows v)      |
|        Stack        |
+---------------------+ 0x20008000 (RAM End) <-- _estack
```

## Memory technique — remember this forever
1.  **Mnemonic:** "**T**eachers **D**rink **B**eer".
    *   **T**ext: Your code, the "teacher". Read-only, lives in FLASH.
    *   **D**ata: Your initialized variables, the "drink". Needs to be copied from the "bottle" (FLASH) to a "glass" (RAM) to be used.
    *   **B**ss: Your uninitialized variables, the empty "beer" glass. Just needs space reserved in RAM and to be wiped clean (zeroed).

2.  **Formulas/Facts to Overlearn:**
    *   `MEMORY { NAME (attr) : ORIGIN = addr, LENGTH = size }`
    *   `SECTIONS { section_name : { ... } > REGION_VMA AT> REGION_LMA }`
    *   The three key sections: `.text` (code), `.data` (init vars), `.bss` (uninit vars).

3.  **Spaced Repetition Schedule:**
    *   Review Today: Re-read this lesson.
    *   Review in 1 Day: Write a linker script for a chip with different memory sizes from scratch.
    *   Review in 3 Days: Explain the difference between VMA and LMA to a rubber duck.
    *   Review in 7 Days: Use `objdump` to find the LMA and VMA of the `.data` section in a real ELF file.
    *   Review in 16 Days & 35 Days: Quick review of the mnemonic and core syntax.

4.  **First Principles Pathway:** If you forget everything, rebuild from this:
    *   A program has two parts: things that don't change (code, constants) and things that do (variables).
    *   Non-changing things can live in non-volatile memory (FLASH).
    *   Changing things must live in volatile, writable memory (RAM).
    *   Problem: How do variables in RAM get their initial values when the power is turned on?
    *   Solution: The initial values must be stored in FLASH and copied to RAM by special code that runs before `main()`. This fundamental requirement dictates the entire structure of a linker script.

## Common mistakes
1.  **Forgetting `AT>` for `.data`:** This results in the linker trying to place the read-write `.data` section into read-only FLASH, causing a linker error or a runtime hard fault when you try to write to a variable.
2.  **Incorrect Stack Pointer Initialization:** The stack pointer is usually initialized at the very end of RAM. A common error is to place it at the start, leading to the stack immediately colliding with `.data` or `.bss`, corrupting variables.
3.  **Overlapping Memory Regions:** Defining `MEMORY` regions that overlap (e.g., `RAM: ORIGIN = 0x20000000, LENGTH = 64K` and `SPECIAL_RAM: ORIGIN = 0x20001000, LENGTH = 8K`). The linker might not warn you, leading to bizarre runtime bugs.
4.  **Not Accounting for Startup Code:** Writing a linker script without providing the corresponding startup assembly file (`startup.s`). The script defines *what* needs to be copied/zeroed, but the startup code *does* the copying and zeroing. Without it, your `.data` variables will contain garbage and `.bss` will not be zero.

## Self-check
1.  A microcontroller has 256KB of FLASH starting at `0x00000000` and 64KB of RAM starting at `0x20000000`. Write the `MEMORY` block for this device.
2.  You declare `const int lookup_table[256] = { ... };` at global scope. Which section (`.text`, `.data`, or a special read-only one) will this likely be placed in, and in which memory region (FLASH or RAM) should it ultimately reside? Why?
3.  Your program runs, but all your global initialized variables have random, garbage values. Your uninitialized globals are also non-zero. The program does not crash immediately. Name two separate, plausible causes for this behavior related to the linker script and its supporting files.