## 1. The one-sentence answer
**Startup code populates the processor’s vector table with initial stack pointer and handler addresses, then executes the reset handler to initialize the stack and transfer control to application code.**

When power is applied or reset asserted, a microcontroller has no running C or C++ environment. Its program counter must be loaded from a fixed memory location, and a stack pointer must exist before any subroutine call or local variable can be used. The vector table supplies those two values plus every subsequent interrupt vector; the reset handler consumes the stack-pointer value, copies initialized data from flash to RAM, zeros the BSS segment, and finally branches to main.

This sequence is not optional. Without it the processor either fetches an invalid address or immediately faults on the first push or function call. The entire mechanism is therefore the bridge between raw silicon and a language-level program.

> [!NOTE]
> The vector table’s first two entries are not ordinary interrupt vectors; they alone determine whether the processor can even begin executing C code.

## 2. Why this matters — concrete and current
STMicroelectronics STM32H7 flight-control boards used on DJI Avata drones rely on a correctly placed vector table at 0x08000000 so that a brown-out reset restores motor PWM outputs within 12 µs.

NASA’s Mars 2020 Perseverance rover runs its descent-stage flight software on a RAD750 processor whose startup code initializes the stack in on-chip SRAM before any radiation-induced exception can be handled.

NVIDIA’s Jetson Orin safety island (R5 cores) uses a dedicated reset handler that clears ECC-protected RAM before the main AUTOSAR stack starts; a single missed zero-initialization would violate ISO 26262 ASIL-D.

The Zephyr RTOS for the NXP i.MX RT1170 Cortex-M7 places its vector table in ITCM so that the first 1 024 bytes of flash contain only the two mandatory words, shaving three cycles off every cold boot in 5G base-station firmware.

Infineon Aurix TC3xx automotive MCUs used by Bosch engine controllers map the vector table to a different address after the first reset; the startup code reprograms the Booting Mode Header so that later software-over-the-air updates never execute with stale interrupt vectors.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Memory map of the target MCU | Vector table and RAM regions must be placed at addresses the hardware actually fetches on reset |
| Distinction between flash and SRAM | Initialized data must be copied from non-volatile storage; stack must live in SRAM |
| Interrupt/exception model | Vector table layout is defined by the architecture’s exception numbering |
| Linker-script syntax | Symbols such as _sidata, _sdata, _edata, _sbss, _ebss are resolved only at link time |

## 4. Building the idea — from intuition to formalism

### Step 1 — Power-on address fetch
The processor’s reset logic hard-wires two word reads from the lowest addresses in its memory map.  
Concrete example: Cortex-M0+ reads address 0x00000000 for the initial SP and 0x00000004 for the initial PC.  
Formal statement:  
$$
(\text{SP}_0, \text{PC}_0) \leftarrow \text{Mem}[0x00000000..0x00000007]
$$  
> [!WARNING]  
> Placing the table at the wrong offset (e.g., 0x08000000 instead of 0x00000000 on some parts) produces an immediate HardFault before any instruction executes.

### Step 2 — Vector table layout
The table is an array of function pointers whose index equals the exception number.  
Concrete example: entry 0 holds the initial SP, entry 1 the reset handler address, entry 15 the SysTick handler.  
Formal statement:  
$$
\text{VT}[n] = \text{address of handler for exception } n, \quad n \in \{0,1,\dots,N-1\}
$$  
> [!WARNING]  
> Forgetting that the first entry is the stack pointer (not a handler) leads to the classic “vector table contains code instead of a stack address” crash.

### Step 3 — Reset handler responsibilities
The reset handler must establish a valid stack before any C function can be called.  
Concrete example: LDR SP, =_estack followed by BL main.  
Formal statement:  
$$
\text{SP} \leftarrow \text{VT}[0]; \quad \text{execute data-initialization}; \quad \text{PC} \leftarrow \text{main}
$$  
> [!WARNING]  
> Branching to main before zeroing BSS leaves global variables containing random flash contents.

### Step 4 — Data and BSS initialization
Initialized globals live in flash; they must be copied, while uninitialized globals must be zeroed.  
Formal statement:  
$$
\text{for } i \in [\text{_sidata},\text{_edata}) : \text{Mem}[i-\text{_sidata}+\text{_sdata}] \leftarrow \text{Mem}[i]
$$  
$$
\text{for } i \in [\text{_sbss},\text{_ebss}) : \text{Mem}[i] \leftarrow 0
$$  
> [!WARNING]  
> Overlapping the source and destination ranges during the copy produces corrupted constants.

### Step 5 — Final jump to application code
After environment setup the handler performs a tail call to main; no return is expected.  
Formal statement:  
$$
\text{PC} \leftarrow \text{main}; \quad \text{never return}
$$  
> [!WARNING]  
> Returning from main on a bare-metal system usually re-enters the reset handler or causes an undefined-instruction fault.

## 5. Worked examples — every step shown

**Example 1 — Minimal vector table**  
*Given:* Cortex-M0+ at address 0x00000000.  
*Find:* Correct four-byte entries for a 256-byte stack ending at 0x20000100.  
Step 1: Write 0x20000100 at offset 0. *Why*: hardware loads this value directly into SP.  
Step 2: Write address of Reset_Handler at offset 4. *Why*: hardware loads this value into PC.  
**0x20000100**  
**0x00000009** (Reset_Handler + 1 for Thumb)

*Reflection*: The example forces recognition that entry 0 is a data value, not a pointer.

**Example 2 — Reset handler with stack setup**  
*Given:* Symbol _estack = 0x20008000.  
*Find:* Two-instruction sequence that satisfies the ABI before calling main.  
LDR SP, =_estack *Why*: guarantees a valid stack pointer.  
BL main *Why*: transfers control after environment is ready.  
**Final answer**  
```arm
LDR SP, =_estack
BL  main
```

*Reflection*: Demonstrates that the stack pointer must be set before any BL.

**Example 3 — Data-section copy**  
*Given:* _sidata = 0x08001234, _sdata = 0x20000000, _edata = 0x20000040.  
*Find:* Loop that copies 16 words.  
Loop performs 16 loads and stores; termination test uses _edata. *Why*: linker guarantees _edata – _sdata is a multiple of 4.  
**Final answer**  
```arm
LDR R0, =_sidata
LDR R1, =_sdata
LDR R2, =_edata
copy:
LDR R3, [R0], #4
STR R3, [R1], #4
CMP R1, R2
BNE copy
```

*Reflection*: Shows why the source and destination pointers must be tracked separately.

**Example 4 — Complete startup with BSS clear**  
*Given:* Full set of linker symbols plus a call to SystemInit.  
*Find:* Sequence that also enables the FPU before main.  
After data copy and BSS clear, write CPACR, then BL main. *Why*: FPU instructions will otherwise fault.  
**Final answer**  
```arm
LDR SP, =_estack
BL  data_copy
BL  bss_clear
LDR R0, =0xE000ED88
LDR R1, [R0]
ORR R1, R1, #0x00F00000
STR R1, [R0]
BL  main
```

*Reflection*: Integrates all prior steps plus an architecture-specific enable.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Vector table placed at wrong address | Linker script default does not match hardware boot address | Force the section with __attribute__((section(".isr_vector"))) and verify map file |
| Initial SP value not aligned to 8 bytes | Cortex-M ABI requires double-word alignment for AAPCS | Set _estack to a multiple of 8 in the linker script |
| Reset handler marked as C function without “naked” | Compiler may push registers before SP is valid | Use __attribute__((naked)) or pure assembly for the first instructions |
| Data copy uses wrong source address | Confusion between LMA and VMA | Use the _sidata symbol supplied by the linker, not _sdata |
| BSS not zeroed when using C++ global objects | Constructors rely on zero-initialized memory | Always run bss_clear before any static constructor loop |
| Missing +1 for Thumb mode addresses | Cortex-M requires LSB set in function pointers | Add 1 when storing handler addresses in the vector table |
| Stack overflow into static data | No guard region allocated between stack and heap | Place a guard page or pattern and check it periodically |

## 7. The textbook-precise statement
The startup sequence of an ARMv7-M processor is defined by the following mandatory actions performed by the hardware before any instruction executes (ARMv7-M Architecture Reference Manual, DDI 0403E, §B1.5.3):

1. SP is loaded from VT[0].
2. The value VT[1] with bit [0] forced to 1 is loaded into PC.
3. Execution begins at that PC with Thumb state selected.

All subsequent software responsibilities (data initialization, BSS zeroing, peripheral setup) are outside the architectural guarantee and must be supplied by the system’s reset handler.

## 8. Visual — diagram or schematic

```text
Address 0x00000000  +-------------------+
                    | Initial SP        |  <-- VT[0]
0x00000004          +-------------------+
                    | Reset_Handler+1   |  <-- VT[1]
0x00000008          +-------------------+
                    | NMI_Handler+1     |
...                 +-------------------+
                    | HardFault+1       |
                    +-------------------+
Flash ends          | ...               |
                    +-------------------+
RAM   0x20000000    +-------------------+
                    | .data             |
                    +-------------------+
                    | .bss              |
                    +-------------------+
_estack             | Stack (grows down)|
0x20008000          +-------------------+
```

## 9. The memory technique

**The hook**  
Picture the vector table as the first two rungs of an infinite ladder; the processor’s foot must land exactly on those rungs or it falls into the void.

**What to overlearn**  
- VT[0] = initial SP, VT[1] = reset handler address.  
- _sidata, _sdata, _edata, _sbss, _ebss symbols and their meanings.  
- Cortex-M requires the handler address with LSB = 1.

**Spaced-repetition schedule**  
Review the five-word vector table layout after 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback**  
Re-derive from the architecture reference: on reset the processor performs two word reads at 0x00000000 and 0x00000004; everything else follows from the requirement that C code needs a stack and zero-initialized globals.

## 10. What this unlocks
Mastery of startup code lets you control every byte that executes before main, which is prerequisite for writing bootloaders, implementing low-latency exception handlers, and satisfying functional-safety requirements.

- Next: linker-script customization for multiple RAM regions  
- Next: position-independent startup for firmware updates  
- Next: exception-priority grouping and NVIC initialization  
- Next: watchdog and brown-out reset coordination

## 11. Self-check — five questions, no answers
1. On a Cortex-M4 whose vector table begins at 0x08000000, what two 32-bit values must occupy the first eight bytes of flash?

2. If the symbol _estack is defined as 0x2000FFFC, is the stack pointer value legal for AAPCS? Explain the alignment requirement.

3. A developer omits the BSS-clear loop; a global C++ object with a non-trivial constructor is placed in .bss. What concrete failure occurs on the first run after power-on?

4. The same firmware image is linked once for boot address 0x00000000 and once for 0x08000000. Which single change in the vector-table section is required?

5. After adding a large global array the program begins to corrupt the stack on entry to main. Which startup-code assumption has been violated and how would you detect it with a minimal test?