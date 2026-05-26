## 1. The one-sentence answer
**A linker script tells the linker exactly where to place each program section (.text, .data, .bss) inside the microcontroller’s physical memory regions.**

Linker scripts act as a map that the linker follows after compilation. Without them the default layout often collides with hardware constraints such as flash starting at 0x08000000 or SRAM beginning at 0x20000000. You write rules that assign each section to a named memory region and also decide whether that region is readable, writable or executable.

The script therefore controls both the final binary layout and the symbols the startup code uses to initialise RAM. Once you understand this mapping, you can place interrupt vectors at the reset address, keep constant data in flash, and guarantee that .bss is zeroed before main runs.

> [!NOTE]
> The single most important insight is that the linker does not invent addresses; it only obeys the regions and sections you explicitly declare, so every memory-related bug ultimately traces back to a missing or incorrect MEMORY or SECTIONS command.

## 2. Why this matters — concrete and current
STM32CubeIDE and the GNU linker script shipped with STM32H7 parts place the vector table at the start of flash so that the processor can fetch the initial stack pointer and reset handler within the first 4 cycles after power-on; any misalignment instantly prevents the chip from booting.

SpaceX’s flight computers on Falcon 9 run a custom linker script that forces the .text section of the guidance algorithm into radiation-hardened MRAM while keeping large lookup tables in SDRAM; the script also reserves a 64 KiB region for the watchdog task that must survive a full RAM scrub.

NVIDIA’s Jetson Orin safety MCU uses a linker script that overlays a CRC-checked .data copy in SRAM over the same physical addresses used by the main A78 cores during boot, guaranteeing deterministic startup timing required by ISO 26262 ASIL-D.

The Zephyr RTOS build system generates per-board linker scripts that place the kernel’s .bss section inside a memory region marked NOLOAD so that the size of the final ELF stays small while the loader still allocates the correct zero-initialised block at runtime.

The TinyML framework CMSIS-NN supplies an example linker script for Cortex-M55 that locates the int8 weight tensors inside the .data section of DTCM, cutting inference latency by 3× compared with placing them in slower flash.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| ELF sections (.text, .data, .bss) | The linker script operates on these named sections; you must know what each contains |
| Memory map of the MCU    | You must know the exact start and end addresses of flash, SRAM and peripheral regions |
| Startup code (reset handler) | It copies .data from flash to RAM and zeros .bss using symbols defined by the script |
| Symbol resolution        | The script can create absolute symbols (e.g., _sidata) that C code later references   |

If any row above is unfamiliar, pause and read the corresponding prerequisite first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Memory is just address ranges
A microcontroller exposes several disjoint address ranges; you must tell the linker which ranges exist and what they are called.  
Example: on an STM32F103 the ranges are 0x08000000–0x0801FFFF (flash) and 0x20000000–0x20004FFF (SRAM).  
Formal statement:  
$$ \text{MEMORY} \{ \texttt{FLASH (rx)} : ORIGIN = 0x08000000, LENGTH = 128K \} $$  
> [!WARNING]  
> If you declare a region that does not exist in silicon, the binary will link but will hard-fault the moment code tries to execute or write there.

### Step 2 — Sections are containers of bytes
After compilation the object files already contain .text (code), .data (initialised variables) and .bss (uninitialised variables). The script only decides their final addresses.  
Example: three input sections named .text are merged into one output .text.  
Formal statement:  
$$ \texttt{.text : { *(.text*) }} > \texttt{FLASH} $$

### Step 3 — Regions have attributes that constrain placement
The attributes (r, w, x) act as a simple permission check performed by the linker.  
Example: attempting to place .data inside a region declared (rx) produces an error.  
Formal statement:  
$$ \text{region attr} \subseteq \{r,w,x\} $$

### Step 4 — .data must be initialised from flash
Because flash keeps its contents across resets, the initial values of .data live in flash and are copied to RAM at startup. The script therefore creates two symbols marking the load and run addresses.  
Example: _sidata points to the flash copy, _sdata and _edata mark the RAM destination.  
Formal statement:  
$$ \texttt{.data} : AT(\_sidata) \{ \ldots \} $$

### Step 5 — .bss occupies RAM but occupies no space in the binary
.bss contains only a size; the startup code must zero it. The script places it in a writable region and marks it NOLOAD so the ELF does not grow.  
Formal statement:  
$$ \texttt{.bss (NOLOAD) : { *(.bss) } } > \texttt{RAM} $$

### Step 6 — The final memory layout is a total order
All output sections are concatenated in the order they appear inside the SECTIONS block; the resulting addresses must lie inside the declared regions.  
Formal statement: address of section \(n+1\) = address of section \(n\) + size of section \(n\).

### Step 7 — The script exports symbols for C startup code
Symbols such as _estack, _sdata, _edata become extern symbols visible to startup.c, closing the loop between the script and the first C instructions that run.  
Formal statement:  
$$ \texttt{\_estack = ORIGIN(RAM) + LENGTH(RAM);} $$

## 5. Worked examples — har step show karo

**Example 1 — Minimal flash-only script**  
*Given:* 64 KiB flash at 0x08000000, no RAM used yet.  
*Find:* Place only .text.  
```
MEMORY { FLASH (rx) : ORIGIN = 0x08000000, LENGTH = 64K }
SECTIONS {
  .text : { *(.text*) } > FLASH
}
```  
*Why:* The single rule merges every input .text section into one output section and locates it at the origin of FLASH.  
**Final answer**  
The vector table ends up at 0x08000000.  

*Reflection:* This example is simple because we ignored data; any global variable would cause a linker error because no RAM region exists.

**Example 2 — Adding .data with load address**  
*Given:* 128 KiB flash, 32 KiB SRAM.  
*Find:* Correct placement of both .text and .data.  
```
MEMORY {
  FLASH (rx) : ORIGIN = 0x08000000, LENGTH = 128K
  RAM  (rwx) : ORIGIN = 0x20000000, LENGTH = 32K
}
SECTIONS {
  .text : { *(.text*) } > FLASH
  .data : AT(_sidata) {
    _sdata = .;
    *(.data*)
    _edata = .;
  } > RAM
  _sidata = LOADADDR(.data);
}
```  
*Why:* AT(_sidata) tells the linker that the initialiser image lives in flash while the run-time copy lives in RAM.  
**Final answer**  
_sdata = 0x20000000, _sidata = end-of-.text.  

*Reflection:* The two addresses differ; startup code must copy between them.

**Example 3 — Placing .bss and computing stack**  
*Given:* Same memory map.  
*Find:* Add .bss and set the stack pointer at the top of RAM.  
Add after .data:  
```
  .bss (NOLOAD) : {
    _sbss = .;
    *(.bss*)
    _ebss = .;
  } > RAM
  _estack = ORIGIN(RAM) + LENGTH(RAM);
```  
*Why:* NOLOAD prevents the zero bytes from appearing in the ELF.  
**Final answer**  
_estack = 0x20008000.  

*Reflection:* The stack grows downward from this address; any .bss overflow will silently corrupt the stack.

**Example 4 — Vector table at fixed offset**  
*Given:* Bootloader occupies first 16 KiB of flash.  
*Find:* Force the application vector table to start at 0x08004000.  
```
  .isr_vector : { KEEP(*(.isr_vector)) } > FLASH AT > FLASH
```  
Insert before .text and set ORIGIN of a sub-region or simply place the section first with an explicit address.  
**Final answer**  
Vector table base address = 0x08004000.  

*Reflection:* KEEP() prevents the garbage collector from discarding the table when --gc-sections is used.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Placing .data in flash-only region | Forgot to declare a writable RAM region             | Always declare at least one (rwx) RAM region         |
| Missing AT() for .data            | Assumed default load address equals run address     | Explicitly write AT(_sidata) and define _sidata      |
| .bss grows into stack             | No gap left between _ebss and _estack               | Place .bss first, then set _estack = ORIGIN+SIZE     |
| Vector table not at reset address | .isr_vector placed after other sections             | Put .isr_vector as the very first SECTIONS entry     |
| Symbols undefined in C            | Forgot to export _sidata, _sdata etc.               | Add symbol assignments at the end of the script      |
| Overlapping regions               | Two MEMORY blocks share the same address range      | Verify ORIGIN+LENGTH pairs do not intersect          |
| NOLOAD omitted on .bss            | ELF file becomes megabytes in size                  | Always mark .bss (NOLOAD)                            |

## 7. The textbook-precise statement
A linker script is a sequence of MEMORY and SECTIONS commands that partitions the target address space into named regions and assigns each input section to exactly one output section inside a chosen region. Formally, let \( R \) be the set of declared regions, each region \( r \in R \) defined by a tuple \( (origin_r, length_r, attrs_r) \). Let \( S \) be the ordered list of output sections. For every input section \( s \), the script defines a mapping \( m(s) = (r, vaddr) \) such that \( vaddr \in [origin_r, origin_r + length_r) \) and \( attrs_r \) contains the required permissions. The resulting executable image satisfies the constraint that the virtual address of section \( s_{i+1} \) equals the virtual address of section \( s_i \) plus its size. (See: GNU LD manual, “Scripts”, version 2.40, §3.6–3.7.)

## 8. Visual — diagram or schematic
```
Flash (0x08000000)
+------------------+ 0x08000000
| .isr_vector      |
+------------------+
| .text            |
+------------------+ _sidata
| .data initial    |
+------------------+

RAM   (0x20000000)
+------------------+ 0x20000000 = _sdata
| .data            |
+------------------+ _edata
| .bss             |
+------------------+ _ebss
| (stack grows down) |
+------------------+ 0x20008000 = _estack
```

## 9. The memory technique

**The hook**  
Picture the linker script as a railway timetable: MEMORY declares the stations (flash and RAM), SECTIONS decides which train (.text, .data, .bss) stops at which station, and the startup code is the platform staff that moves luggage (.data initialisers) and sweeps the platform (.bss zeroing).

**What to overlearn**  
1. .text lives in flash and is read-only executable.  
2. .data lives in RAM at runtime but its initial image sits in flash.  
3. .bss occupies RAM, is zeroed at startup, and adds zero bytes to the ELF.

**Spaced-repetition schedule**  
Review the three facts above after 1 day, 3 days, 7 days, 16 days and 35 days.

**First-principles fallback**  
If you forget the exact syntax, start from the silicon memory map, list every address range you must use, then write one SECTIONS rule per range that contains the sections that must physically reside there.

## 10. What this unlocks
Once you can write and debug linker scripts you can control boot time, memory protection and power-down behaviour in any bare-metal or RTOS project.  

- You can now implement custom bootloaders that relocate an application.  
- You can add memory-protection-unit (MPU) regions that exactly match section boundaries.  
- You can profile RAM usage by examining the addresses of _ebss and _estack.  
- You become ready for the next topic: writing portable startup code that works across multiple MCUs.

## 11. Self-check — five questions, no answers
1. What happens if you place .data inside a MEMORY region declared (rx) only?  
2. Why must _sidata be defined with LOADADDR rather than with the dot symbol?  
3. A 10 KiB .bss section is placed before the stack; what is the highest safe stack depth if RAM is 32 KiB?  
4. Which single line prevents the vector table from being garbage-collected when --gc-sections is active?  
5. If two MEMORY regions overlap by 4 bytes, at which stage does the linker report the error and what is the exact message you expect?