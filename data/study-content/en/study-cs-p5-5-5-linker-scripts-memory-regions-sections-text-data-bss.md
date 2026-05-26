## 1. The one-sentence answer
**A linker script is a declarative configuration file that partitions a microcontroller’s address space into named memory regions and then assigns every input section produced by the compiler to those regions so that the final executable image matches the physical hardware layout.**

The compiler emits three canonical categories of content: executable instructions, initialized variables, and zero-initialized variables. Without explicit guidance the linker would place them arbitrarily; the script supplies that guidance by first declaring the start address and length of every physical block (Flash, SRAM, external RAM) and then mapping each category to the correct block while also emitting symbols the startup code can use to copy or clear memory at reset.

Because the mapping is performed once, at link time, the resulting binary contains absolute addresses that are valid on the target silicon and nothing else. The same source files can therefore produce different images for different boards simply by swapping the script.

> [!NOTE]
> The decisive insight is that **.text lives in non-volatile memory while .data and .bss live in volatile memory**; the script must therefore emit both the load addresses (where the bytes physically reside after programming) and the virtual addresses (where the processor expects to find them at runtime).

## 2. Why this matters — concrete and current
STMicroelectronics STM32CubeIDE and NXP MCUXpresso both emit a linker script for every new project; altering the script is the only way to place the vector table at a non-default offset when a bootloader occupies the first 32 kB of Flash.

NASA’s flight software for the Perseverance rover runs on a RAD750 processor whose 3 MiB of rad-hard SRAM must be partitioned between code, stack, and a telemetry ring buffer; the linker script enforces that partition so that a single erroneous write cannot overwrite the exception vectors.

Tesla’s Autopilot hardware uses an Infineon Aurix TC397 whose lock-step cores require identical .text placement and separate .bss regions; the script guarantees both constraints so that the safety monitor can compare RAM signatures at every cycle.

The Zephyr RTOS build system generates a linker script on the fly from Devicetree memory nodes; this single mechanism lets the same kernel binary run on an nRF52840 (256 kB Flash) and on an STM32H7 (2 MiB Flash) without source changes.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Compilation pipeline (preprocess → compile → assemble → link) | The linker receives only the .o files; the script decides their final placement. |
| Distinction between load address (LMA) and virtual address (VMA) | .data must be stored in Flash yet executed from RAM; the script records both addresses. |
| Reset vector and startup code | The script must emit symbols (__data_start, __bss_end, etc.) that the first few instructions after reset will read. |
| Address-space layout of the chosen MCU | You must know the exact base and size of every Flash and RAM block listed in the datasheet. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Declare the raw silicon blocks
A microcontroller exposes disjoint blocks of memory at fixed addresses. The script first names each block and states its origin and length.

```
MEMORY
{
    FLASH (rx) : ORIGIN = 0x08000000, LENGTH = 512K
    SRAM  (rwx): ORIGIN = 0x20000000, LENGTH = 128K
}
```

If the LENGTH is stated too large, the linker silently produces an image that will not fit the actual silicon and the device will hard-fault on first access.

### Step 2 — Identify the three canonical input sections
Every relocatable object file contains at minimum three sections: .text (code), .data (initialized data), and .bss (zeroed data). The script must map each to a memory region.

### Step 3 — Separate load and run addresses for .data
Initialized data must occupy permanent storage in Flash yet be visible at a RAM address at runtime. The script therefore records both the LMA (inside FLASH) and the VMA (inside SRAM).

### Step 4 — Reserve space and emit boundary symbols
For every section the script can emit symbols that mark the start and end addresses. Startup code uses these symbols to copy .data and to zero .bss before main is called.

### Step 5 — Enforce ordering and alignment constraints
The vector table must sit at the very beginning of Flash; the stack must grow downward from the top of SRAM. The script uses explicit placement and alignment directives to guarantee both requirements.

### Step 6 — Produce the final memory map
The linker walks the SECTIONS command, assigns absolute addresses, and writes an ELF (or binary) image whose program headers reflect the declared regions. This map is the only artifact the flash programmer and the debugger ever see.

## 5. Worked examples — every step shown

**Example 1 — Minimal script for an STM32F103**
*Given:* 64 kB Flash at 0x08000000, 20 kB SRAM at 0x20000000.  
*Find:* Place .text in Flash and both .data/.bss in SRAM.  
Step 1: Declare regions (see Step 1 above).  
Step 2:  
```
SECTIONS
{
    .text : { *(.text*) } > FLASH
    .data : { _sdata = .; *(.data*) _edata = .; } > SRAM AT > FLASH
    .bss  : { _sbss  = .; *(.bss*)  _ebss  = .; } > SRAM
}
```  
*Why* — The AT > FLASH clause records the LMA for .data while the > SRAM clause records the VMA.  
**Final answer**  
The resulting image contains .text at 0x08000000 and a .data image block that the startup routine will copy to 0x20000000.

**Example 2 — Provide symbols for startup**
*Given:* Same memory map.  
*Find:* Emit symbols the C startup file can reference.  
The same SECTIONS block already emits _sdata, _edata, _sbss, _ebss.  
*Why* — These symbols become absolute addresses in the symbol table; startup code reads them with LDR instructions.  
**Final answer**  
_startup copies (_edata – _sdata) bytes from LMA to VMA, then zeros (_ebss – _sbss) bytes.

**Example 3 — Place vector table first**
*Given:* Cortex-M vector table in section .isr_vector.  
*Find:* Guarantee it occupies the first 0x1C0 bytes of Flash.  
```
SECTIONS
{
    .isr_vector : { KEEP(*(.isr_vector)) } > FLASH
    .text       : { *(.text*) } > FLASH
}
```  
*Why* — KEEP prevents the linker from discarding the table when garbage collection is enabled.  
**Final answer**  
Vector table always starts at 0x08000000.

**Example 4 — Reserve 4 kB stack at top of SRAM**
*Given:* 128 kB SRAM.  
*Find:* Allocate stack from 0x2001F000 to 0x20020000.  
```
_stack_top = ORIGIN(SRAM) + LENGTH(SRAM);
```  
Then reference _stack_top in the startup assembly that loads SP.  
*Why* — The expression is evaluated at link time and yields a constant.  
**Final answer**  
Stack pointer is initialized to 0x20020000 on reset.

*Reflection* — The trickiest step is remembering that every address the script produces is fixed before the binary ever runs; runtime relocation is impossible on bare-metal targets.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting AT > FLASH on .data | The linker defaults LMA = VMA, so initialized values are never programmed into Flash. | Always write > RAM AT > FLASH for any initialized section. |
| Overlapping regions | LENGTH clauses are written by hand and can exceed datasheet values. | Cross-check every ORIGIN/LENGTH pair against the reference manual before the first build. |
| Placing .bss in Flash | .bss has no content; the script writer assumes it can share Flash space. | Map .bss only to RAM regions. |
| Missing KEEP around vector table | --gc-sections removes unused sections; the table has no references until runtime. | Wrap the vector table with KEEP(*(.isr_vector)). |
| Symbol defined but never exported | Startup code in a separate file cannot see the symbol. | Use PROVIDE or EXTERN in the script, or declare the symbol extern in C. |
| Mis-aligned sections | ARM Cortex-M requires 4-byte alignment for .text; unaligned code faults. | Insert . = ALIGN(4); after each section or rely on the compiler’s section alignment flags. |
| Hard-coded numeric addresses instead of ORIGIN() | When memory map changes, every address must be edited. | Always write ORIGIN(FLASH) rather than 0x08000000. |

## 7. The textbook-precise statement
A linker script for GNU ld is a sequence of MEMORY and SECTIONS commands. The MEMORY command defines a set of disjoint, non-overlapping memory regions each characterized by a name, attributes, origin address and length. The SECTIONS command specifies, for each output section, an ordered list of input sections, an optional load address (LMA) distinct from the run address (VMA), and optional symbol definitions at the section boundaries. The resulting image satisfies:

$$ \forall s \in \{\text{.text}, \text{.data}, \text{.bss}\} : \text{LMA}(s) \in \text{FLASH} \land \text{VMA}(s) \in \text{SRAM} $$

when the script is written for a typical microcontroller. See “GNU ld Documentation”, chapter “Scripts”, version 2.40.

## 8. Visual — diagram or schematic
```text
0x08000000  ┌──────────────────────────────┐
            │ .isr_vector (0x1C0)          │  LMA = VMA
            ├──────────────────────────────┤
            │ .text                        │  LMA = VMA
            │ (code & read-only data)      │
0x08080000  └──────────────────────────────┘  FLASH (512 K)

0x20000000  ┌──────────────────────────────┐
            │ .data   (initialized)        │  VMA here, LMA in Flash
            ├──────────────────────────────┤
            │ .bss    (zeroed)             │
            ├──────────────────────────────┤
            │ heap                         │
            │ ...                          │
0x2001F000  ├──────────────────────────────┤
            │ stack (grows down)           │
0x20020000  └──────────────────────────────┘  SRAM (128 K)
```

## 9. The memory technique

**The hook**  
Picture a moving company: the truck (Flash) carries the furniture (.data) to the house (RAM) at move-in time; the empty rooms (.bss) are swept clean on arrival. The linker script is the floor plan that tells the movers exactly which room each piece belongs in.

**What to overlearn**  
1. .text → Flash (rx)  
2. .data → RAM (rw) with AT > Flash  
3. .bss → RAM (rw) and must be zeroed

**Spaced-repetition schedule**  
Review the three mappings at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive from the reset sequence: the processor fetches the first instruction from the vector table in non-volatile memory; therefore all code must reside there. Variables that survive power-off must also live there until copied; variables that are zero at start need only space in RAM.

## 10. What this unlocks
Mastery of linker scripts lets you control every byte of the final image, which is a prerequisite for bootloaders, position-independent code, multi-core affinity, and memory-protection-unit (MPU) region setup.

- Bootloader design and OTA update schemes  
- MPU region configuration for safety-critical isolation  
- Custom memory allocators that respect the .heap symbol emitted by the script  
- Link-time optimization and dead-code elimination without breaking hardware requirements  

## 11. Self-check — five questions, no answers
1. A script maps .data with “> SRAM” but omits the AT clause. What value will the first variable contain immediately after reset?  
2. The vector table is placed at 0x08000000 yet the processor starts execution at 0x08000004. Which symbol in the script guarantees the initial PC value?  
3. You increase SRAM length from 128 K to 256 K in the MEMORY block but the binary still crashes at the same stack address. Why?  
4. Two object files each define a .bss variable named “counter”. After linking, how many distinct zeroed locations exist and where are they placed?  
5. The startup code reads the symbol _sidata to copy .data. If the script places .data at VMA 0x20000000 but the copy loop uses the wrong base address, which single clause in the SECTIONS command is most likely missing or incorrect?