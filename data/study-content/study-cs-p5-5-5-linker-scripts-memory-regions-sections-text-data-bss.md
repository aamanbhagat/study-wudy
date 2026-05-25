## 1. What it is — in plain English

Imagine you're building a house, and you have a big pile of construction materials: bricks, wood, pipes, wires, and so on. Now, you also have a blueprint that tells you *what* to build (the design of the rooms, where the windows go). But you also need a separate plan that tells the construction crew *where* to put all these materials in the actual house. Where does the kitchen go? Where does the bedroom go? How big is each room?

In the world of computer programs, especially for small, specialized computers like those in your car or a smart doorbell (what we call "embedded systems"), a "linker script" is exactly that second plan. Your program's code and data are like the construction materials. The compiler and assembler turn your human-readable code into machine instructions and organized data, but they don't decide *exactly* where everything will live in the computer's memory.

That's where the linker script comes in. It's a set of instructions for a special program called the "linker." The linker's job is to take all the pieces of your compiled program (called "object files") and arrange them into a single, executable file. The linker script tells the linker *how* to arrange these pieces: "Put all the program's instructions (the code) here, put all the program's initial values for variables there, and reserve this much space for variables that start empty."

So, a linker script is essentially a blueprint for your program's memory layout. It defines the available memory "rooms" (memory regions) and then decides which "stuff" (program sections like code, initialized data, uninitialized data) goes into which room, and at what specific address.

## 2. Why it matters — real-world applications

Linker scripts are absolutely critical in embedded systems and real-time software because these systems often have very strict memory constraints, specific hardware layouts, and critical performance or safety requirements. Unlike a desktop computer with a sophisticated operating system that handles memory for you, embedded systems often operate "bare metal" (without an OS) or with a very minimal OS, giving you direct control over memory.

Here are 3-5 concrete real-world applications:

1.  **Automotive Engine Control Units (ECUs):** Modern cars have dozens of ECUs managing everything from the engine to the brakes to the infotainment system. An engine ECU, for instance, needs its critical control algorithms (code) to reside in fast, reliable Flash memory. Calibration data (like fuel injection maps) might be stored in a separate, non-volatile memory region, while dynamic sensor readings and temporary variables (data) need to be in RAM. Linker scripts precisely map these components to ensure the engine runs safely and efficiently, often meeting stringent ISO 26262 functional safety standards. A misplacement could lead to engine malfunction or even catastrophic failure.

2.  **Medical Devices (e.g., Pacemakers, Infusion Pumps):** These devices demand extreme reliability and predictable real-time behavior. A pacemaker's firmware, for instance, must execute its heart-pacing logic from a specific, protected memory region to prevent corruption. Patient data logs might be stored in another non-volatile area. Linker scripts ensure that critical code and data are placed in memory regions that are robust, possibly write-protected, and meet strict timing deadlines, preventing life-threatening errors.

3.  **Spacecraft and Satellite Control Systems:** When a satellite is millions of miles away, there's no reboot button. Its firmware must be incredibly robust. Linker scripts are used to organize the bootloader, main application, and critical configuration data into distinct, often redundant, memory regions. This allows for safe firmware updates, rollback mechanisms, and ensures the core control logic is always available, even if parts of the memory become corrupted due to radiation or hardware faults. For example, the Mars rovers' software would have used linker scripts to manage their limited, radiation-hardened memory.

4.  **Industrial Control Systems (PLCs, Robotics):** Factories rely on Programmable Logic Controllers (PLCs) and robotic arms for automated manufacturing. These systems require high reliability and deterministic operation. Linker scripts help in separating critical real-time control logic from less time-sensitive diagnostic or communication code. They also ensure that shared memory regions for inter-process communication (if a small RTOS is used) are correctly sized and aligned, preventing race conditions or memory access violations that could lead to production line halts or safety hazards.

5.  **Secure Boot and Firmware Updates:** Many modern devices, from smartphones to smart home gadgets, implement secure boot processes. This often involves a small, immutable bootloader (ROM or protected Flash) that verifies the integrity of the main application firmware before launching it. Linker scripts are essential for defining the exact size and location of this bootloader, the main application, and the digital signature data, ensuring that the verification process can correctly locate and validate each component, thereby protecting against malicious firmware injection.

## 3. Prerequisites — what you must know first

Before diving deep into linker scripts, you should have a solid grasp of these fundamental computer science concepts:

*   **Compilation and Linking Process:** Understand that your source code (e.g., C/C++) is first translated into object files by a compiler and assembler, and then these object files are combined into an executable program by a linker.
*   **Memory Types (RAM, ROM/Flash):** Differentiate between Volatile Memory (RAM - Random Access Memory, fast, temporary storage, loses data on power-off) and Non-Volatile Memory (ROM - Read-Only Memory, or Flash - electrically erasable programmable read-only memory, slower, permanent storage, retains data on power-off).
*   **Pointers and Memory Addresses:** Understand what a memory address is, how pointers store these addresses, and how they are used to access data in memory.
*   **Basic C/C++ Program Structure:** Be familiar with how variables are declared (global, static, local) and functions are defined, as these directly map to program sections.
*   **Operating System (OS) Basics (or lack thereof):** Understand that on a typical desktop, the OS manages virtual memory and program loading. In many embedded systems, there's no OS (bare-metal) or a simple Real-Time OS (RTOS), meaning the program directly interacts with physical memory, making precise memory layout crucial.
*   **Hexadecimal Notation:** Be comfortable reading and writing memory addresses in hexadecimal (e.g., `0x08000000`).

## 4. The core idea — step by step

The core idea behind linker scripts is to provide the linker with a detailed map of your target hardware's memory and then instruct it on how to fit your compiled program's various components into that map.

### Step 1: The Problem — Why Linker Scripts?

**Plain-English Statement:** When you write a program and compile it, the compiler turns your code into machine instructions and organizes your variables. But it doesn't know *where* these instructions and variables should physically go in the computer's memory. Imagine you've baked a cake (your compiled code), but you don't know if it's going into a small lunchbox or a big serving platter, or which shelf in the fridge it should occupy. The linker needs this information to correctly package your program.

**Small Concrete Example:**
You write a C program:
```c
int global_initialized_var = 10;
int global_uninitialized_var;
const char* message = "Hello, Embedded!";

void my_function() {
    // Some code here
}

int main() {
    my_function();
    global_uninitialized_var = global_initialized_var;
    return 0;
}
```
The compiler knows `my_function` is code, `global_initialized_var` is an initialized variable, `global_uninitialized_var` is an uninitialized variable, and `message` is constant data. But it doesn't know *at what memory address* `my_function` should start, or where `global_initialized_var` should live. The linker needs to assign these addresses.

**Formal/Mathematical Version:**
The compiler produces object files (e.g., `.o` files) which contain *relocatable* code and data. These object files have sections (like `.text`, `.data`, `.bss`) but their addresses are relative to the start of the section, not absolute physical addresses. The linker's job is to resolve these relative addresses into absolute physical addresses based on the linker script.

**What Could Go Wrong:** Without a linker script, the linker would either fail, or make assumptions that are incorrect for your specific hardware, leading to a program that doesn't run or crashes immediately due to trying to access non-existent memory.

### Step 2: Defining Memory Regions

**Plain-English Statement:** First, we tell the linker about the physical memory available on our target device. This is like telling our construction manager: "We have a 1MB Flash memory chip starting at address X, and a 64KB RAM chip starting at address Y." We define these distinct "rooms" where our program's components can be placed.

**Small Concrete Example:**
A common embedded microcontroller might have 1MB of Flash memory (for storing the program permanently) starting at address `0x08000000` and 128KB of RAM (for temporary data) starting at `0x20000000`. In a linker script, you'd define these as:
```linker
MEMORY
{
  FLASH (rx) : ORIGIN = 0x08000000, LENGTH = 1M
  RAM (rwx)  : ORIGIN = 0x20000000, LENGTH = 128K
}
```
Here, `(rx)` means Flash is Read-only and eXecutable, while `(rwx)` means RAM is Read, Write, and eXecutable (though code usually doesn't execute from RAM in simple embedded systems, it's a common default).

**Formal/Mathematical Version:**
The `MEMORY` command defines named memory regions. Each region has:
*   `name`: A symbolic identifier (e.g., `FLASH`, `RAM`).
*   `attr`: Attributes indicating access permissions (e.g., `r` for read, `w` for write, `x` for execute, `a` for allocatable, `i` for initialized).
*   `ORIGIN`: The starting physical address of the region.
*   `LENGTH`: The total size of the region.

Syntax:
$$
\text{MEMORY} \\
\{ \\
\quad \text{name}_1 \ (\text{attr}_1) : \text{ORIGIN} = \text{address}_1, \text{LENGTH} = \text{size}_1 \\
\quad \text{name}_2 \ (\text{attr}_2) : \text{ORIGIN} = \text{address}_2, \text{LENGTH} = \text{size}_2 \\
\quad \dots \\
\}
$$
Where `address` and `size` are typically in hexadecimal or with suffixes like `K` (kilobytes), `M` (megabytes).

**What Could Go Wrong:**
*   **Incorrect `ORIGIN` or `LENGTH`:** If these don't match your actual hardware, your program will try to access non-existent memory or overwrite critical hardware registers, leading to crashes.
*   **Overlapping Regions:** Defining two memory regions that occupy the same physical addresses will cause conflicts and unpredictable behavior.

### Step 3: Understanding Program Sections (`.text`, `.data`, `.bss`)

**Plain-English Statement:** Your compiled program isn't just one big blob; it's naturally divided into different categories based on what kind of information they hold. These categories are called "sections." Think of them as pre-sorted piles of materials: one pile for all the instruction manuals (code), one pile for pre-assembled furniture (initialized variables), and one pile for empty boxes where furniture will eventually go (uninitialized variables).

**Small Concrete Example:**
When you compile the C code from Step 1:
*   `void my_function()` and `int main()`: These functions' machine instructions go into the **`.text`** section (code).
*   `int global_initialized_var = 10;`: This variable, which has an initial value, goes into the **`.data`** section (initialized data).
*   `int global_uninitialized_var;`: This variable, which doesn't have an initial value specified by the programmer (it defaults to zero at runtime), goes into the **`.bss`** section (block started by symbol, uninitialized data).
*   `const char* message = "Hello, Embedded!";`: This constant string literal typically goes into the **`.rodata`** section (read-only data).

**Formal/Mathematical Version:**
Compilers (like GCC) and assemblers automatically organize the output into standard sections:
*   **`.text`**: Contains executable machine code.
*   **`.rodata`**: Contains read-only data, such as string literals, `const` variables.
*   **`.data`**: Contains initialized global and static variables. For example, `int x = 5;`. The initial values for these variables are stored in the executable image (usually Flash) and copied to RAM at program startup.
*   **`.bss`**: Contains uninitialized global and static variables. For example, `int y;`. These variables are guaranteed to be zero-initialized by the C standard, but their initial values are *not* stored in the executable image. Instead, the linker just reserves space for them in RAM, and the startup code fills this space with zeros.
*   **`.stack` / `.heap`**: While not always explicit sections in the same way, linker scripts are often used to define the size and location of the program stack (for local variables and function call frames) and heap (for dynamic memory allocation).

**What Could Go Wrong:**
*   Misunderstanding which type of data goes into which section can lead to incorrect memory usage or unexpected behavior (e.g., expecting a variable to be zero-initialized when it's not, or modifying a `const` variable).

### Step 4: Section Placement — The Heart of the Linker Script

**Plain-English Statement:** Now we combine the "rooms" (memory regions) with the "stuff" (program sections). This is where we tell the linker: "Put all the code (`.text`) in the Flash memory. Put all the initialized variables (`.data`) into RAM, but make sure their initial values are copied from Flash when the program starts. And put all the uninitialized variables (`.bss`) directly into RAM, and make sure they are cleared to zero."

**Small Concrete Example:**
Continuing with our Flash and RAM example:
```linker
SECTIONS
{
  .text :
  {
    KEEP(*(.isr_vector)) /* Keep interrupt vector table at start */
    *(.text)             /* All code from all object files */
    *(.text.*)           /* All code from all object files (C++ templates, etc.) */
  } > FLASH              /* Place .text section into FLASH memory */

  .rodata :
  {
    *(.rodata)           /* All read-only data */
    *(.rodata.*)
  } > FLASH              /* Place .rodata section into FLASH memory */

  .data : AT > FLASH     /* .data section is loaded from FLASH... */
  {
    . = ALIGN(4);        /* Align to 4-byte boundary */
    _sdata = .;          /* Symbol for start of .data in RAM */
    *(.data)             /* All initialized data */
    *(.data.*)
    . = ALIGN(4);
    _edata = .;          /* Symbol for end of .data in RAM */
  } > RAM                /* ...and runs in RAM */

  .bss :
  {
    . = ALIGN(4);
    _sbss = .;           /* Symbol for start of .bss in RAM */
    *(.bss)              /* All uninitialized data */
    *(.bss.*)
    . = ALIGN(4);
    _ebss = .;           /* Symbol for end of .bss in RAM */
  } > RAM                /* Place .bss section into RAM memory */

  /* Define stack and heap later */
  _estack = ORIGIN(RAM) + LENGTH(RAM); /* Top of RAM for stack */
}
```
Notice the crucial `AT > FLASH > RAM` for `.data`. This means the initial values for `.data` are *stored* in Flash (the `LOAD` address) but the variables themselves *reside and are used* in RAM (the `RUN` address). A small piece of startup code (often generated or provided by the microcontroller vendor) is responsible for copying the `.data` section from its load address in Flash to its run address in RAM, and for zeroing out the `.bss` section.

**Formal/Mathematical Version:**
The `SECTIONS` command defines how input sections (from object files) are mapped to output sections (in the executable).
$$
\text{SECTIONS} \\
\{ \\
\quad \text{output\_section\_name} \ : \ \text{AT} > \text{load\_region} \\
\quad \{ \\
\quad \quad \text{input\_section\_specifications} \\
\quad \quad \dots \\
\quad \} \ > \text{run\_region} \\
\quad \dots \\
\}
$$
*   `output_section_name`: The name of the section in the final executable (e.g., `.text`, `.data`).
*   `input_section_specifications`: Wildcards like `*(.text)` mean "take all `.text` sections from all input object files." `KEEP()` prevents the linker from discarding a section even if it appears unused (important for interrupt vectors).
*   `>` `run_region`: Specifies the *run-time* memory region where the section will reside during execution. This is the Virtual Memory Address (VMA).
*   `AT >` `load_region`: Specifies the *load-time* memory region where the section's initial content is stored in the executable file. This is the Load Memory Address (LMA). If `AT > load_region` is omitted, the LMA defaults to the VMA.

The special symbol `.` (dot) represents the current location counter. It's like a pointer to the current address the linker is assigning. You can assign to it (e.g., `. = ALIGN(4);` to align to a 4-byte boundary) or read from it to define new symbols (e.g., `_sdata = .;`).

**What Could Go Wrong:**
*   **Forgetting `AT > LOAD_REGION` for `.data`:** If you just use `> RAM`, the linker will assume `.data` should be loaded directly into RAM. If your Flash contains the initial values, they won't be copied, and your variables will start with garbage.
*   **Not aligning sections:** Some architectures require sections (especially `.data` and `.bss`) to be aligned to specific boundaries (e.g., 4 or 8 bytes). Forgetting `ALIGN()` can lead to performance penalties or even hard faults.
*   **Overrunning memory regions:** If the combined size of sections placed in a region exceeds the `LENGTH` defined for that region, the linker will issue an error.

### Step 5: Special Sections — Stack and Heap

**Plain-English Statement:** Besides code and data, a running program needs temporary memory for function calls (the "stack") and for dynamically allocating memory during execution (the "heap"). We need to tell the linker where these should be and how big they are. Think of them as dedicated storage areas for temporary items and items bought on demand.

**Small Concrete Example:**
Often, the stack starts at the top of RAM and grows downwards, while the heap starts after `.bss` and grows upwards.
```linker
SECTIONS
{
  /* ... previous sections (.text, .data, .bss) ... */

  .stack_and_heap :
  {
    . = ALIGN(8);
    _end = .;             /* Symbol for end of .bss, start of heap */
    _Min_Heap_Size = 0x200; /* Minimum 512 bytes for heap */
    _Min_Stack_Size = 0x400; /* Minimum 1024 bytes for stack */

    /* Ensure enough space for heap and stack */
    __HeapLimit = _end + _Min_Heap_Size;
    __StackLimit = _estack - _Min_Stack_Size; /* _estack defined in Step 4 */

    ASSERT(__HeapLimit <= __StackLimit, "Error: Not enough RAM for heap and stack!");
  } > RAM
}
```
Here, `_end` marks the end of all static data, and thus the beginning of the heap. `_estack` (defined earlier as the very top of RAM) marks the end of the stack. The `ASSERT` statement is a linker script feature to check conditions at link time.

**Formal/Mathematical Version:**
While not always explicit `.stack` or `.heap` sections, these memory areas are typically defined by symbols or calculated offsets within the RAM region.
*   **Stack:** Often defined by a symbol pointing to its top (e.g., `_estack`) or bottom, with the stack growing in a specific direction (usually downwards towards lower addresses).
*   **Heap:** Typically starts immediately after the `.bss` section and grows upwards towards higher addresses.
The actual management of stack and heap (allocating/deallocating) is handled by the C runtime library (for heap, e.g., `malloc`/`free`) and the CPU's architecture (for stack, via stack pointer register).

**What Could Go Wrong:**
*   **Insufficient Stack/Heap Size:** If you don't allocate enough, your program will crash due to stack overflow (recursive calls, large local arrays) or heap exhaustion (too many `malloc` calls).
*   **Stack and Heap Collision:** If the stack grows into the heap, or vice-versa, data corruption will occur. Linker scripts can help prevent this by checking for sufficient separation.

### Step 6: Entry Point

**Plain-English Statement:** Every program needs a starting line – the very first instruction the CPU executes when the program begins. For embedded systems, this is often a special "reset handler" function, which sets up the system before calling your `main()` function. The linker script tells the linker where this starting point is.

**Small Concrete Example:**
```linker
ENTRY(Reset_Handler)

SECTIONS
{
  /* ... */
}
```
Here, `Reset_Handler` is a function (often written in assembly or C with specific attributes) that is the first code executed when the microcontroller powers on or resets. It typically initializes the C runtime environment (copying `.data`, clearing `.bss`), sets up the stack, and then calls `main()`.

**Formal/Mathematical Version:**
The `ENTRY(symbol)` command specifies the initial entry point for the executable. `symbol` must be a defined function or label within your code. The linker ensures this symbol's address is placed in the appropriate location in the executable header (or directly at the reset vector address, depending on the architecture and boot process).

**What Could Go Wrong:**
*   **Incorrect `ENTRY` symbol:** If the symbol doesn't exist or isn't the actual reset handler, the program will never start correctly.
*   **Entry point not at the correct hardware reset vector:** For many microcontrollers, the CPU fetches its first instruction from a fixed address (the "reset vector") after a reset. The linker script must ensure that the `ENTRY` point's code is correctly placed at this address, often via the `.isr_vector` section.

## 5. Worked examples — multiple, with every step shown

We will use a simplified linker script syntax, focusing on the core concepts. Assume a generic ARM Cortex-M microcontroller.

---

### Example 1: Basic Flash and RAM Placement

**Problem:** A microcontroller has 128KB of Flash memory starting at `0x08000000` and 32KB of RAM starting at `0x20000000`. Create a linker script to place the standard `.text`, `.rodata`, `.data`, and `.bss` sections, along with a basic stack. The entry point is `Reset_Handler`.

**Given:**
*   Flash: `ORIGIN = 0x08000000`, `LENGTH = 128K`
*   RAM: `ORIGIN = 0x20000000`, `LENGTH = 32K`
*   Entry Point: `Reset_Handler`
*   Standard sections: `.text`, `.rodata`, `.data`, `.bss`
*   Stack at the top of RAM, growing downwards.

**What we want:** A complete linker script (`.ld` file).

**Solution:**

```linker
/* Define the entry point of the program */
ENTRY(Reset_Handler)

/* Define the memory regions of the target device */
MEMORY
{
  FLASH (rx) : ORIGIN = 0x08000000, LENGTH = 128K  /* Flash memory: Read, Execute */
  RAM (rwx)  : ORIGIN = 0x20000000, LENGTH = 32K   /* RAM memory: Read, Write, Execute (though usually not for code) */
}

/* Define how the program sections are mapped to memory regions */
SECTIONS
{
  /* .text section: Contains executable code */
  .text :
  {
    KEEP(*(.isr_vector)) /* Keep the Interrupt Vector Table at the very beginning of Flash */
    *(.text)             /* All executable code from all object files */
    *(.text.*)           /* Include C++ template instantiations, etc. */
    . = ALIGN(4);        /* Align the end of this section to a 4-byte boundary */
  } > FLASH              /* Place the .text section into the FLASH memory region */

  /* .rodata section: Contains read-only data (e.g., const variables, string literals) */
  .rodata :
  {
    *(.rodata)           /* All read-only data from all object files */
    *(.rodata.*)
    . = ALIGN(4);
  } > FLASH              /* Place the .rodata section into the FLASH memory region */

  /* .data section: Contains initialized global and static variables */
  /* This section is loaded into FLASH but runs from RAM */
  .data : AT > FLASH     /* Specify that initial values are stored in FLASH... */
  {
    . = ALIGN(4);        /* Align to a 4-byte boundary */
    _sdata = .;          /* Define a symbol '_sdata' pointing to the start of .data in RAM */
    *(.data)             /* All initialized data from all object files */
    *(.data.*)
    . = ALIGN(4);
    _edata = .;          /* Define a symbol '_edata' pointing to the end of .data in RAM */
  } > RAM                /* ...but the variables themselves reside and are used in RAM */

  /* .bss section: Contains uninitialized global and static variables */
  /* This section only reserves space in RAM and is zero-initialized at startup */
  .bss :
  {
    . = ALIGN(4);
    _sbss = .;           /* Define a symbol '_sbss' pointing to the start of .bss in RAM */
    *(.bss)              /* All uninitialized data from all object files */
    *(.bss.*)
    . = ALIGN(4);
    _ebss = .;           /* Define a symbol '_ebss' pointing to the end of .bss in RAM */
  } > RAM                /* Place the .bss section into the RAM memory region */

  /* Define the stack pointer. For Cortex-M, the stack grows downwards from the top of RAM. */
  /* _estack is usually the address of the top of RAM. */
  _estack = ORIGIN(RAM) + LENGTH(RAM); /* Symbol for the initial Stack Pointer (top of RAM) */

  /* _end symbol marks the end of all allocated static data, useful for heap start */
  _end = .; /* Current location counter, which is after .bss */

  /* Ensure no sections exceed their memory regions */
  ASSERT(LENGTH(FLASH) >= ADDR(.rodata) + SIZEOF(.rodata) - ORIGIN(FLASH), "FLASH memory overflow");
  ASSERT(LENGTH(RAM) >= ADDR(.bss) + SIZEOF(.bss) - ORIGIN(RAM), "RAM memory overflow");
}
```

**Explanation of each step:**
1.  `ENTRY(Reset_Handler)`: This line explicitly tells the linker that the program execution should begin at the `Reset_Handler` function. This is crucial for the microcontroller to know where to jump to after a reset.
2.  `MEMORY{...}`: We define two memory blocks. `FLASH` is read-only and executable (`rx`), starting at `0x08000000` with 128KB. `RAM` is read-write-executable (`rwx`), starting at `0x20000000` with 32KB. These are the physical memory capabilities of our hypothetical microcontroller.
3.  `SECTIONS{...}`: This block describes how the program's logical sections are mapped to the physical memory regions.
4.  `.text : { ... } > FLASH`: All compiled code (`.text` and `.text.*`) is placed into the `FLASH` memory region. `KEEP(*(.isr_vector))` ensures that the interrupt vector table, which is critical for system startup and interrupt handling, is included even if the linker thinks it's unused.
5.  `.rodata : { ... } > FLASH`: All read-only data (`.rodata` and `.rodata.*`) is also placed into `FLASH`, as it doesn't change during runtime.
6.  `.data : AT > FLASH { ... } > RAM`: This is a key part. The *initial values* of the `.data` section (e.g., `int x = 10;`) are stored in `FLASH` (the `AT > FLASH` part specifies the load address). However, the *actual variables* will reside and be manipulated in `RAM` during execution (the `> RAM` part specifies the run address). The `_sdata` and `_edata` symbols are created to mark the start and end of this section in RAM, which a C startup routine will use to copy data from Flash to RAM.
7.  `.bss : { ... } > RAM`: The `.bss` section (uninitialized global/static variables) is placed directly into `RAM`. Its content is not stored in the Flash image; instead, the C startup routine will zero out this memory region using the `_sbss` and `_ebss` symbols.
8.  `_estack = ORIGIN(RAM) + LENGTH(RAM);`: This defines a symbol `_estack` which points to the very top of the `RAM` region. On ARM Cortex-M, the stack pointer is typically initialized to this address, and the stack grows downwards.
9.  `_end = .;`: This symbol marks the end of all statically allocated data (`.bss`). It's a common convention to use this as the starting point for the heap.
10. `ASSERT(...)`: These are linker script assertions. They check if the allocated sections fit within their respective memory regions. If an assertion fails, the linker will report an error, preventing an overflow.

**Final Answer:**
The complete linker script above.

**Reflection:** This example highlights the fundamental distinction between load address (where data is stored in the program image, usually Flash) and run address (where data resides during execution, usually RAM). The `AT > FLASH > RAM` syntax for `.data` is crucial for understanding how initialized variables are handled in embedded systems. The use of symbols like `_sdata`, `_edata`, `_sbss`, `_ebss`, and `_estack` is also vital, as these are used by the C startup code to prepare the runtime environment.

---

### Example 2: Adding a Custom Configuration Section

**Problem:** Using the same microcontroller from Example 1, we now need to add a custom read-only configuration section called `.config_params`. This section should be placed at the very end of the Flash memory, ensuring it doesn't overlap with the main code and data. It should contain constant configuration parameters.

**Given:**
*   Same hardware and standard sections as Example 1.
*   New section: `.config_params`
*   Requirement: `.config_params` must be at the end of Flash.

**What we want:** An updated linker script.

**Solution:**

```linker
ENTRY(Reset_Handler)

MEMORY
{
  FLASH (rx) : ORIGIN = 0x08000000, LENGTH = 128K
  RAM (rwx)  : ORIGIN = 0x20000000, LENGTH = 32K
}

SECTIONS
{
  /* Standard sections, placed at the beginning of FLASH */
  .text :
  {
    KEEP(*(.isr_vector))
    *(.text)
    *(.text.*)
    . = ALIGN(4);
  } > FLASH

  .rodata :
  {
    *(.rodata)
    *(.rodata.*)
    . = ALIGN(4);
  } > FLASH

  .data : AT > FLASH
  {
    . = ALIGN(4);
    _sdata = .;
    *(.data)
    *(.data.*)
    . = ALIGN(4);
    _edata = .;
  } > RAM

  .bss :
  {
    . = ALIGN(4);
    _sbss = .;
    *(.bss)
    *(.bss.*)
    . = ALIGN(4);
    _ebss = .;
  } > RAM

  /* Custom .config_params section */
  .config_params (NOLOAD) : /* NOLOAD means it's not loaded by default startup, but its contents are in the image */
  {
    . = ALIGN(4);
    _sconfig = .;          /* Symbol for start of config data */
    *(.config_params)      /* Include all input sections named .config_params */
    *(.config_params.*)
    . = ALIGN(4);
    _econfig = .;          /* Symbol for end of config data */
  } > ORIGIN(FLASH) + LENGTH(FLASH) - SIZEOF(.config_params) /* Place at end of FLASH */

  _estack = ORIGIN(RAM) + LENGTH(RAM);
  _end = .;

  ASSERT(LENGTH(FLASH) >= ADDR(.rodata) + SIZEOF(.rodata) - ORIGIN(FLASH), "FLASH memory overflow (main sections)");
  ASSERT(LENGTH(RAM) >= ADDR(.bss) + SIZEOF(.bss) - ORIGIN(RAM), "RAM memory overflow");
  /* New assertion for config_params */
  ASSERT(ADDR(.config_params) >= ADDR(.rodata) + SIZEOF(.rodata), "Error: .config_params overlaps with other Flash sections!");
}
```

**Explanation of each step:**
1.  **Placement Strategy:** To place `.config_params` at the *end* of Flash, we need to calculate its `ORIGIN` address based on the total Flash length and its own size. The linker's `.` (location counter) is used for this.
2.  `.config_params (NOLOAD) :`: We define the new section. `(NOLOAD)` is a linker script attribute that tells the linker not to allocate space for this section in RAM if it were a data section. For read-only data in Flash, it mostly means it won't be copied or zeroed by the standard startup code.
3.  `*(.config_params)` / `*(.config_params.*)`: This collects all input sections from object files that were explicitly named `.config_params` (e.g., using `__attribute__((section(".config_params")))` in C).
4.  `> ORIGIN(FLASH) + LENGTH(FLASH) - SIZEOF(.config_params)`: This is the crucial line for placement.
    *   `ORIGIN(FLASH) + LENGTH(FLASH)` gives us the address *just past* the end of the `FLASH` region.
    *   `SIZEOF(.config_params)` is a linker script function that calculates the size of the *output* `.config_params` section.
    *   Subtracting the section's size from the end of Flash places it perfectly at the end.
5.  `ASSERT(ADDR(.config_params) >= ADDR(.rodata) + SIZEOF(.rodata), "Error: .config_params overlaps with other Flash sections!");`: A new assertion is added to ensure that our custom section, placed at the end of Flash, doesn't accidentally overlap with the main code and read-only data sections that were placed from the beginning of Flash. `ADDR()` gets the run address of a section.

**Final Answer:**
The updated linker script above.

**Reflection:** This example demonstrates how to place custom sections at specific, non-contiguous locations in memory. It introduces the `SIZEOF()` and `ADDR()` functions, as well as the `NOLOAD` attribute, which are powerful tools for fine-grained memory control. Calculating the exact placement dynamically using `ORIGIN(REGION) + LENGTH(REGION) - SIZEOF(SECTION)` is a common pattern for placing things at the end of a memory block.

---

### Example 3: Bootloader and Application Separation

**Problem:** A system has a small bootloader residing in the first 8KB of Flash and the main application in the remaining Flash. We need a linker script that compiles *both* the bootloader and the application (potentially from different source files) into a single executable, but places their respective `.text`, `.rodata`, `.data`, and `.bss` sections into their designated Flash/RAM regions. The bootloader's RAM usage is minimal, while the application uses most of the available RAM.

**Given:**
*   Total Flash: `0x08000000` to `0x08000000 + 128K`.
*   Bootloader Flash: First 8KB (from `0x08000000`).
*   Application Flash: Remaining 120KB (from `0x08002000`).
*   Total RAM: `0x20000000` to `0x20000000 + 32K`.
*   Bootloader object files: `bootloader.o`, `boot_utils.o`
*   Application object files: `main_app.o`, `app_module.o`
*   Bootloader entry: `Bootloader_Start`
*   Application entry: `Application_Start` (This will be called by the bootloader, so the main `ENTRY` for the whole image will be `Bootloader_Start`).

**What we want:** A linker script that separates bootloader and application sections.

**Solution:**

```linker
/* The overall entry point for the device (the bootloader) */
ENTRY(Bootloader_Start)

MEMORY
{
  /* Define distinct regions for bootloader and application in Flash */
  BOOTLOADER_FLASH (rx) : ORIGIN = 0x08000000, LENGTH = 8K
  APP_FLASH (rx)        : ORIGIN = 0x08002000, LENGTH = 120K /* 128K - 8K = 120K */

  /* Define distinct regions for bootloader and application in RAM */
  BOOTLOADER_RAM (rwx)  : ORIGIN = 0x20000000, LENGTH = 2K  /* Small RAM for bootloader */
  APP_RAM (rwx)         : ORIGIN = 0x20000800, LENGTH = 30K /* Remaining RAM for application (32K - 2K = 30K) */
}

SECTIONS
{
  /* --- BOOTLOADER SECTIONS --- */
  .bootloader_text :
  {
    KEEP(*(.boot_isr_vector)) /* Specific vector table for bootloader */
    *(bootloader.o .text)     /* Code from bootloader.o */
    *(boot_utils.o .text)     /* Code from boot_utils.o */
    *(.bootloader_text*)      /* Any other specific bootloader text sections */
    . = ALIGN(4);
  } > BOOTLOADER_FLASH

  .bootloader_rodata :
  {
    *(bootloader.o .rodata)
    *(boot_utils.o .rodata)
    *(.bootloader_rodata*)
    . = ALIGN(4);
  } > BOOTLOADER_FLASH

  .bootloader_data : AT > BOOTLOADER_FLASH
  {
    . = ALIGN(4);
    _sboot_data = .;
    *(bootloader.o .data)
    *(boot_utils.o .data)
    *(.bootloader_data*)
    . = ALIGN(4);
    _eboot_data = .;
  } > BOOTLOADER_RAM

  .bootloader_bss :
  {
    . = ALIGN(4);
    _sboot_bss = .;
    *(bootloader.o .bss)
    *(boot_utils.o .bss)
    *(.bootloader_bss*)
    . = ALIGN(4);
    _eboot_bss = .;
  } > BOOTLOADER_RAM

  /* Define bootloader stack at the top of BOOTLOADER_RAM */
  _estack_boot = ORIGIN(BOOTLOADER_RAM) + LENGTH(BOOTLOADER_RAM);

  /* --- APPLICATION SECTIONS --- */
  /* Application entry point (symbol, not the initial ENTRY) */
  _Application_Start = ADDR(.app_text); /* Symbol for where application starts */

  .app_text :
  {
    KEEP(*(.app_isr_vector)) /* Specific vector table for application */
    *(main_app.o .text)
    *(app_module.o .text)
    *(.text)                 /* Catch-all for any other .text not explicitly bootloader */
    *(.text.*)
    . = ALIGN(4);
  } > APP_FLASH

  .app_rodata :
  {
    *(main_app.o .rodata)
    *(app_module.o .rodata)
    *(.rodata)
    *(.rodata.*)
    . = ALIGN(4);
  } > APP_FLASH

  .app_data : AT > APP_FLASH
  {
    . = ALIGN(4);
    _sapp_data = .;
    *(main_app.o .data)
    *(app_module.o .data)
    *(.data)
    *(.data.*)
    . = ALIGN(4);
    _eapp_data = .;
  } > APP_RAM

  .app_bss :
  {
    . = ALIGN(4);
    _sapp_bss = .;
    *(main_app.o .bss)
    *(app_module.o .bss)
    *(.bss)
    *(.bss.*)
    . = ALIGN(4);
    _eapp_bss = .;
  } > APP_RAM

  /* Define application stack at the top of APP_RAM */
  _estack_app = ORIGIN(APP_RAM) + LENGTH(APP_RAM);

  /* Global end symbol for the entire memory map */
  _end = .;

  /* Assertions to prevent overflows */
  ASSERT(LENGTH(BOOTLOADER_FLASH) >= ADDR(.bootloader_rodata) + SIZEOF(.bootloader_rodata) - ORIGIN(BOOTLOADER_FLASH), "BOOTLOADER_FLASH overflow");
  ASSERT(LENGTH(BOOTLOADER_RAM) >= ADDR(.bootloader_bss) + SIZEOF(.bootloader_bss) - ORIGIN(BOOTLOADER_RAM), "BOOTLOADER_RAM overflow");
  ASSERT(LENGTH(APP_FLASH) >= ADDR(.app_rodata) + SIZEOF(.app_rodata) - ORIGIN(APP_FLASH), "APP_FLASH overflow");
  ASSERT(LENGTH(APP_RAM) >= ADDR(.app_bss) + SIZEOF(.app_bss) - ORIGIN(APP_RAM), "APP_RAM overflow");
}
```

**Explanation of each step:**
1.  **Multiple Memory Regions:** We define separate `FLASH` and `RAM` regions for the bootloader and the application. This gives us precise control over where each component resides. `BOOTLOADER_FLASH` is the first 8KB, `APP_FLASH` is the rest. Similarly for `BOOTLOADER_RAM` and `APP_RAM`.
2.  **Selective Section Placement:** Instead of `*(.text)` which grabs all `.text` sections, we use more specific patterns like `*(bootloader.o .text)` or `*(.bootloader_text*)`.
    *   `bootloader.o .text`: This explicitly takes the `.text` section *only* from the `bootloader.o` object file. This is crucial for separating code.
    *   `(.bootloader_text*)`: This is a wildcard for any section explicitly named `bootloader_text` (e.g., defined in C source using `__attribute__((section(".bootloader_text")))`).
    *   The general `*(.text)` and `*(.data)` are left for the application sections to catch any sections not explicitly assigned to the bootloader. This assumes that most of the code is application code.
3.  **Separate Symbols for Startup:** We define separate `_sdata`, `_edata`, `_sbss`, `_ebss` for both the bootloader and the application. This is because each will have its own C runtime startup (or a simplified version) that initializes its specific data regions.
4.  **Application Entry Symbol:** `_Application_Start = ADDR(.app_text);` creates a symbol that points to the start of the application's code. The bootloader can then use this symbol to jump to the application (e.g., `((void (*)(void))_Application_Start)();`).
5.  **Separate Stack Pointers:** `_estack_boot` and `_estack_app` are defined for the separate RAM regions, allowing the bootloader and application to have their own stack spaces.

**Final Answer:**
The updated linker script above.

**Reflection:** This example demonstrates advanced linker script usage for complex firmware architectures. The ability to selectively place sections from specific object files (`filename.o .section_name`) or using custom section names is powerful. It's essential for creating modular, multi-stage firmware like bootloaders and applications, ensuring they don't interfere with each other's memory space. This also highlights the need for careful coordination between the linker script and the C startup code for each component.

---

### Example 4: Fixed-Address Data Structure and Overlays

**Problem:** We need to place a critical `SensorCalibration_t` data structure at a fixed, absolute RAM address `0x20007800`. This structure contains initial calibration values that must be loaded from Flash at startup. Additionally, we want to create an "overlay" section, `.debug_overlay`, which is also placed in RAM at a specific address `0x20007E00`. This overlay section is only used during debugging and might temporarily overwrite some other non-critical RAM data.

**Given:**
*   Same hardware as Example 1 (128KB Flash, 32KB RAM).
*   Structure: `SensorCalibration_t cal_data = { ... };` (defined in `calibration.c`)
*   Fixed RAM address for `cal_data`: `0x20007800`.
*   Overlay section: `.debug_overlay` (from `debug_module.o`)
*   Fixed RAM address for `.debug_overlay`: `0x20007E00`.

**What we want:** A linker script that places `cal_data` and `.debug_overlay` at their specified addresses, handling initialization for `cal_data`.

**Solution:**

```linker
ENTRY(Reset_Handler)

MEMORY
{
  FLASH (rx) : ORIGIN = 0x08000000, LENGTH = 128K
  RAM (rwx)  : ORIGIN = 0x20000000, LENGTH = 32K
}

SECTIONS
{
  /* Standard sections (simplified for brevity, assume they fit at start of Flash/RAM) */
  .text :
  {
    KEEP(*(.isr_vector))
    *(.text)
    *(.text.*)
    . = ALIGN(4);
  } > FLASH

  .rodata :
  {
    *(.rodata)
    *(.rodata.*)
    . = ALIGN(4);
  } > FLASH

  .data : AT > FLASH
  {
    . = ALIGN(4);
    _sdata = .;
    *(.data)
    *(.data.*)
    . = ALIGN(4);
    _edata = .;
  } > RAM

  .bss :
  {
    . = ALIGN(4);
    _sbss = .;
    *(.bss)
    *(.bss.*)
    . = ALIGN(4);
    _ebss = .;
  } > RAM

  /* Fixed-address SensorCalibration_t structure */
  .calibration_data 0x20007800 : AT > FLASH /* Place at 0x20007800 in RAM, load from Flash */
  {
    . = ALIGN(4);
    _scal_data = .;
    *(.calibration_data) /* Contains the SensorCalibration_t instance */
    . = ALIGN(4);
    _ecal_data = .;
  } > RAM

  /* Debug Overlay section */
  .debug_overlay 0x20007E00 (NOLOAD) : /* Place at 0x20007E00 in RAM, NOLOAD as it's for debug */
  {
    . = ALIGN(4);
    _sdebug_overlay = .;
    *(debug_module.o .debug_overlay) /* Specific input section from debug_module.o */
    . = ALIGN(4);
    _edebug_overlay = .;
  } > RAM

  _estack = ORIGIN(RAM) + LENGTH(RAM);
  _end = .;

  /* Assertions */
  ASSERT(LENGTH(FLASH) >= ADDR(.rodata) + SIZEOF(.rodata) - ORIGIN(FLASH), "FLASH memory overflow");
  ASSERT(LENGTH(RAM) >= ADDR(.bss) + SIZEOF(.bss) - ORIGIN(RAM), "RAM memory overflow");

  /* New assertions for fixed-address sections */
  ASSERT(ADDR(.calibration_data) >= ADDR(.bss) + SIZEOF(.bss), "Error: .calibration_data overlaps with .bss!");
  ASSERT(ADDR(.calibration_data) + SIZEOF(.calibration_data) <= ADDR(.debug_overlay), "Error: .calibration_data overlaps with .debug_overlay!");
  ASSERT(ADDR(.debug_overlay) + SIZEOF(.debug_overlay) <= ORIGIN(RAM) + LENGTH(RAM), "Error: .debug_overlay exceeds RAM boundary!");
}
```

**Explanation of each step:**
1.  **`SensorCalibration_t` in C:** In `calibration.c`, `SensorCalibration_t cal_data __attribute__((section(".calibration_data"))) = { ... };` would be used to place the structure into the custom section.
2.  **`.calibration_data 0x20007800 : AT > FLASH { ... } > RAM`:**
    *   `0x20007800`: This directly specifies the *run-time* address (VMA) for the `.calibration_data` section.
    *   `AT > FLASH`: This ensures its initial values are *loaded* from Flash. The startup code will need to copy this specific section from its load address in Flash to `0x20007800` in RAM.
    *   `*(.calibration_data)`: Collects the structure from its input section.
3.  **`.debug_overlay 0x20007E00 (NOLOAD) : { ... } > RAM`:**
    *   `0x20007E00`: This directly specifies the *run-time* address (VMA) for the `.debug_overlay` section.
    *   `(NOLOAD)`: Since this is a debug-only overlay and might overwrite other data, we don't want the standard startup code to initialize it. Its contents might be loaded by a debugger or a special debug routine. If it had initial values, they would still be stored in the executable image, but not automatically copied to RAM.
    *   `*(debug_module.o .debug_overlay)`: This ensures only the specific overlay data from `debug_module.o` is placed here.
4.  **Assertions:** New `ASSERT` statements are added to verify that `cal_data` doesn't overlap with `.bss` and that `cal_data` and `.debug_overlay` don't overlap with each other, and that `.debug_overlay` doesn't exceed the total RAM. This is critical when manually placing sections.

**Final Answer:**
The updated linker script above.

**Reflection:** This example demonstrates the power and danger of direct address placement. While it offers ultimate control for specific hardware requirements (like memory-mapped peripherals or shared memory regions), it also requires meticulous attention to avoid overlaps and ensure proper initialization. The `(NOLOAD)` attribute is useful for sections that are not part of the standard C runtime initialization, such as debug data or memory regions controlled by specific hardware.

---

## 6. Common mistakes and traps

1.  **Confusing Load Address (LMA) and Run Address (VMA):** This is the most common and critical mistake. For `.data` sections, forgetting `AT > FLASH` (or similar for your non-volatile memory) means the linker assumes the data is loaded directly into RAM, leading to uninitialized or garbage values at runtime because the initial values from Flash are never copied.
2.  **Overlapping Memory Regions or Sections:** Defining memory regions that overlap, or placing sections such that they extend beyond their allocated region or into another section's space. The linker will usually catch this if you use `ASSERT` or if the overlap is severe, but subtle overlaps can lead to hard-to-debug data corruption or crashes.
3.  **Insufficient Stack or Heap Size:** Not allocating enough RAM for the stack leads to stack overflow (corrupting adjacent memory, often heap or global variables) during deep function calls or large local variable declarations. Insufficient heap leads to `malloc()` failures.
4.  **Incorrect Entry Point:** Specifying the wrong `ENTRY` symbol or not placing the interrupt vector table (`.isr_vector`) at the correct hardware-defined address will prevent the program from starting or handling interrupts correctly.
5.  **Forgetting `ALIGN()`:** Many architectures require data sections to be aligned to specific byte boundaries (e.g., 4 or 8 bytes) for performance or correctness. Forgetting `ALIGN()` can lead to bus faults or slower memory access.
6.  **Misunderstanding `.` (Location Counter):** Incorrectly using the `.` symbol (which represents the current output address) can lead to sections being placed at unexpected offsets or overlapping. Forgetting to advance it, or advancing it too much, can cause issues.

## 7. Textbook-precise explanation

A **linker script** is a configuration file, primarily used by the GNU BFD (Binary File Descriptor) linker (`ld`), that precisely describes the memory layout of a target system and dictates how input sections from object files are mapped to output sections within the final executable image. It is indispensable in embedded systems development where direct control over memory placement is paramount due to the absence or minimalism of an operating system's memory management unit (MMU).

The script is structured around two primary commands: `MEMORY` and `SECTIONS`.

1.  **`MEMORY` Command:** This command defines the physical memory architecture of the target device. Each entry specifies a distinct **memory region**, characterized by:
    *   **Name:** A symbolic identifier (e.g., `FLASH`, `RAM`).
    *   **Attributes (attr):** A string indicating access permissions (e.g., `r` for readable, `w` for writable, `x` for executable, `a` for allocatable, `i` for initialized). For instance, `FLASH (rx)` denotes a read-only, executable Flash memory.
    *   **Origin (ORIGIN):** The absolute starting physical address of the memory region.
    *   **Length (LENGTH):** The total contiguous size of the memory region.

    The syntax is:
    $$
    \text{MEMORY} \\
    \{ \\
    \quad \text{name}_1 \ (\text{attr}_1) : \text{ORIGIN} = \text{address}_1, \text{LENGTH} = \text{size}_1 \\
    \quad \text{name}_2 \ (\text{attr}_2) : \text{ORIGIN} = \text{address}_2, \text{LENGTH} = \text{size}_2 \\
    \quad \dots \\
    \}
    $$

2.  **`SECTIONS` Command:** This command defines the structure of the output file by specifying how input sections (from object files) are combined and placed into output sections, and subsequently into the defined memory regions. Each output section is defined with:
    *   **Name:** A symbolic identifier (e.g., `.text`, `.data`, `.bss`, `.rodata`).
    *   **Load Memory Address (LMA):** The address where the section's contents are stored in the executable image (e.g., typically in Flash). This is specified using `AT > load_region`.
    *   **Virtual Memory Address (VMA) / Run Address:** The address where the section will reside and be accessed during program execution (e.g., typically in RAM for mutable data). This is specified using `> run_region`. If `AT > load_region` is omitted, LMA defaults to VMA.
    *   **Contents:** A list of input section specifications (e.g., `*(.text)`, `*(filename.o .data)`), which instruct the linker to collect specific sections from input object files.
    *   **Location Counter (`.`):** A special symbol representing the current output address within the section. It can be manipulated (e.g., `. = ALIGN(N);` to align to an N-byte boundary) and its value can be assigned to user-defined symbols (e.g., `_sdata = .;`).

    Standard sections include:
    *   **`.text`**: Contains executable machine code.
    *   **`.rodata`**: Contains read-only data, such as string literals and `const` variables.
    *   **`.data`**: Contains initialized global and static variables. Its LMA is typically in non-volatile memory (Flash), and its VMA is in volatile memory (RAM). A C runtime startup routine copies the data from LMA to VMA.
    *   **`.bss`**: Contains uninitialized global and static variables. Its LMA is typically absent (no initial values stored in the executable), and its VMA is in RAM. A C runtime startup routine zeros out this memory region.

    The syntax for a section definition is:
    $$
    \text{SECTIONS} \\
    \{ \\
    \quad \text{output\_section\_name} \ [\text{address}] \ [\text{(type)}] : \text{AT} > \text{load\_region} \\
    \quad \{ \\
    \quad \quad \text{input\_section\_specification}_1 \\
    \quad \quad \text{input\_section\_specification}_2 \\
    \quad \quad \dots \\
    \quad \} \ > \text{run\_region} \\
    \quad \dots \\
    \}
    $$
    Where `[address]` can explicitly set the VMA, and `[(type)]` can specify attributes like `NOLOAD` (do not load this section into memory).

The `ENTRY(symbol)` command specifies the initial execution point of the program, which must correspond to a defined symbol (function or label) in the code.

**References:**
*   **GNU Linker and Loader Manual:** The authoritative source for `ld` linker script syntax and semantics. (e.g., `https://sourceware.org/binutils/docs/ld/` )
*   **Levine, John R. *Linkers and Loaders*. Morgan Kaufmann, 2000.** Provides a foundational understanding of the linking process, including the role of linker scripts.
*   **Bryant, Randal E., and David R. O'Hallaron. *Computer Systems: A Programmer's Perspective*. 3rd ed. Pearson, 2016.** Offers context on program memory organization and the linking process in general.

## 8. ASCII