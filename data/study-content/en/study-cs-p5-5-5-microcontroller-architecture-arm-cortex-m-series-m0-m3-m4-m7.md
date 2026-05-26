## 1. The one-sentence answer
**The ARM Cortex-M series comprises a family of 32-bit RISC microcontroller cores that implement the Thumb instruction set architecture, delivering deterministic interrupt handling and low-power operation across graduated performance tiers from the minimal M0 to the high-performance M7.**

Cortex-M cores sit at the heart of most modern embedded devices because they strip a full ARM application processor down to the essentials required for real-time control. Every core shares the same programmer-visible register set and the same Nested Vectored Interrupt Controller, yet each successive model adds pipeline depth, optional DSP extensions, or a floating-point unit without breaking binary compatibility for the base Thumb-2 subset.

The progression is deliberate: M0 targets cost-sensitive sensors, M3 adds bit-banding and more flexible memory protection, M4 introduces single-cycle MAC and SIMD for signal processing, and M7 brings superscalar execution and cache while still guaranteeing interrupt latency bounds measured in tens of nanoseconds.

> [!NOTE]
> The single most important architectural decision is the universal use of the Thumb-2 instruction set: 16-bit and 32-bit instructions coexist in the same memory space, giving code density close to 8-bit microcontrollers while retaining 32-bit performance.

## 2. Why this matters — concrete and current
Tesla Autopilot hardware revision 3.0 uses multiple Cortex-M7 cores inside its custom FSD chip to run safety-critical sensor fusion tasks that must meet ISO 26262 ASIL-D timing deadlines measured in microseconds.

The Mars Perseverance rover’s entry-descent-landing computer employs a Cortex-M4-based microcontroller for the terrain-relative navigation radar interface; its deterministic 12-cycle interrupt latency allowed the sky-crane maneuver to execute without an RTOS jitter margin.

Nordic Semiconductor’s nRF52840 Bluetooth Low Energy SoC integrates a Cortex-M4F core running at 64 MHz; every commercial wearable heart-rate monitor shipping in 2024 contains at least one identical core executing the same CMSIS-DSP library routines for motion-artifact removal.

STMicroelectronics’ STM32H7 series, built around the Cortex-M7, powers the motor controllers in more than 80 % of new collaborative robots sold by Universal Robots; the core’s dual-issue pipeline and 64-bit AXI bus sustain 400 MHz closed-loop current control without external FPGA assistance.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| CPU registers and the load-store model | Cortex-M exposes 16 general-purpose registers and performs arithmetic only on registers, never directly on memory. |
| Interrupt vectors and priority | All Cortex-M cores implement a fixed 8-bit priority scheme and a deterministic vector table located at address 0. |
| Memory-mapped I/O     | Peripherals and the NVIC appear as ordinary addresses; every driver is therefore a sequence of ordinary loads and stores. |
| Two’s-complement arithmetic | Signed DSP extensions on M4/M7 assume two’s-complement integers and IEEE-754 single-precision floats. |

## 4. Building the idea — from intuition to formalism

### Step 1 — RISC load-store foundation
All arithmetic occurs between registers; memory is touched only by explicit load and store instructions.  
Example: to compute `r0 = mem[r1] + 5` the processor first executes `LDR r2, [r1]` then `ADD r0, r2, #5`.  
Formally, the data-path obeys  
$$ \text{ALU}_{\text{out}} = f(\text{R}[r_a], \text{R}[r_b]) \quad \text{only when both operands are registers.} $$  
> [!WARNING]  
> Treating a memory address as an ALU operand directly will produce an illegal-instruction exception on every Cortex-M core.

### Step 2 — Thumb-2 variable-length encoding
16-bit and 32-bit instructions occupy the same address space and are distinguished by the top five bits of each half-word.  
The decoder therefore examines only the first half-word to decide whether a second fetch is required.  
This yields the compact encoding  
$$ \text{InstrLen}(addr) = \begin{cases} 2 & \text{if } \text{Mem}[addr]_{15:11} \in \{0b11101,0b11110,0b11111\} \\ 2 & \text{otherwise} \end{cases} $$  
> [!WARNING]  
> Placing a 32-bit instruction across a 16-bit alignment boundary forces an extra fetch cycle on the M0/M3 single-issue pipelines.

### Step 3 — Fixed interrupt latency via NVIC
The Nested Vectored Interrupt Controller guarantees that the worst-case latency from assertion of an interrupt to the first instruction of its handler is 12 cycles on M3/M4 and 8 cycles on M7 when the pipeline is empty.  
The vector table is a simple array of function pointers at address 0; each entry is fetched by hardware without software intervention.

### Step 4 — Optional DSP and FPU extensions
M4 adds a single-cycle 32×32 MAC unit and 8-bit SIMD packed into 32-bit registers; M7 adds a double-precision FPU and superscalar decode.  
These extensions are visible only through additional instructions whose availability is indicated by the `CPUID` register bits 23:20.

### Step 5 — Harvard versus von Neumann memory interface
M0/M3 expose a single AHB bus; M4/M7 expose separate I-Code and D-Code buses plus an optional instruction cache.  
The formal memory map therefore splits at 0x2000_0000 for the M7 when caches are enabled.

### Step 6 — Programmer model unification
All four cores present identical registers R0–R15, PSR, and CONTROL to the programmer; the only visible differences are the presence of the FPSCR and the extended DSP instruction set on M4/M7.  
This single programmer model is the reason CMSIS libraries compile unchanged across the entire series.

## 5. Worked examples — every step shown

**Example 1 — Minimal interrupt handler on any Cortex-M**  
*Given:* IRQ number 5 must toggle bit 0 of GPIO port at 0x4002_0014.  
*Find:* The shortest handler.  
```
LDR   R0, =0x40020014   ; load peripheral address
LDR   R1, [R0]          ; read current value
EOR   R1, R1, #1        ; flip bit 0
STR   R1, [R0]          ; write back
BX    LR                ; return
```
*Why* each line is required: the first two instructions materialize the address and fetch the datum; EOR performs the toggle; STR commits it; BX LR restores the interrupted context exactly as the NVIC stacked it.  
**Final answer**  
```asm
; 5 instructions, 5 cycles on M3, 4 on M7
```
*Reflection* The handler is identical on every Cortex-M because the NVIC stacking rules never change.

**Example 2 — Detecting M4 DSP support at runtime**  
*Given:* A library must decide whether to use `SMLABB`.  
*Find:* The test.  
```
LDR   R0, =0xE000ED00   ; SCB_CPUID
LDR   R1, [R0]
UBFX  R2, R1, #23, #4   ; extract Implementer + Variant
CMP   R2, #0x4          ; M4 or later
ITT   EQ
SMLABBEQ R0,R1,R2,R3
```
*Why* the UBFX isolates the architecture field documented in the ARMv7-M reference manual.  
**Final answer**  
Branch taken only on M4/M7.  
*Reflection* The same code runs safely on M0 because the conditional instruction is architecturally defined to be a NOP when the extension is absent.

**Example 3 — M7 cache configuration**  
*Given:* 16 KB instruction cache must be enabled.  
*Find:* The sequence.  
```
LDR   R0, =0xE000ED94   ; CCR
LDR   R1, [R0]
ORR   R1, R1, #(1<<18)  ; IC
STR   R1, [R0]
DSB
ISB
```
*Why* DSB followed by ISB guarantees the cache-enable write is visible before subsequent fetches.  
**Final answer**  
Cache enabled with deterministic 1-cycle hit latency after the barrier.  
*Reflection* Forgetting the barriers is the most common source of “stale code” bugs on M7.

**Example 4 — Choosing core for 200 µs control loop**  
*Given:* 200 µs deadline, 50 kHz PWM, single-precision PID.  
*Find:* Minimum core.  
M0 lacks FPU and MAC; M3 has neither; M4F supplies single-precision FPU and 1-cycle MAC, meeting the deadline at 80 MHz. M7 is unnecessary.  
**Final answer**  
Cortex-M4F at 80 MHz.  
*Reflection* The decision rests on the presence of the FPU bit in the CPUID register rather than raw clock speed.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming all cores have an FPU | M0/M3 never implement FP; only M4/M7 have the optional unit | Read `SCB->CPUID` bits 23:20 before any `V*` instruction. |
| Placing the vector table in RAM without VTOR update | Reset value of VTOR is zero; RAM vectors are ignored | Write the new base address to `SCB->VTOR` before enabling interrupts. |
| Ignoring the 16-byte stack alignment rule on exception entry | ARMv7-M requires 8-byte alignment; many toolchains default to 4-byte | Set `STKALIGN` bit in CCR or compile with `-mfloat-abi=hard`. |
| Using 32-bit immediates in inline assembly on M0 | M0 decode stage accepts only 8-bit immediates for data processing | Use `LDR Rd, =const` pseudo-instruction. |
| Forgetting that bit-banding is M3/M4 only | M0 and M7 implement ordinary AHB only | Guard bit-band macros with `#if __CORTEX_M >= 3 && __CORTEX_M < 7`. |
| Expecting Harvard buses on every core | Only M4/M7 expose separate I/D buses | Check `ICode` and `DCode` in the memory map; M0/M3 share one bus. |
| Writing to the FPU registers on an M4 without the FPU present | The core takes a UsageFault | Test `CPACR` before touching FPSCR. |

## 7. The textbook-precise statement
The ARM Cortex-M processor family implements the ARMv6-M (M0) or ARMv7-M (M3, M4, M7) architecture profile. All variants share the same unprivileged Thread and Handler modes, the same banked stack pointers, and the same 8-bit priority NVIC with 1-cycle vectoring. The M4 and M7 profiles add the ARMv7E-M DSP extension and optional single-precision floating-point unit compliant with FPv4-SP. Reference: ARM Cortex-M Technical Reference Manual, ARM DDI 0432C (M3) and ARM DDI 0489F (M7), §2.2–§2.4.

## 8. Visual — diagram or schematic
```text
          +------------------+          +------------------+
          |   Cortex-M core  |          |   NVIC (fixed)   |
          |  R0–R12, SP, LR  |<-------->|  8-bit priority  |
          |   Thumb-2 decode |          |  240 interrupts  |
          +--------+---------+          +------------------+
                   | AHB-Lite
          +--------+---------+
          |   Memory map     |
          | 0x0000_0000 Code |
          | 0x2000_0000 SRAM |
          | 0x4000_0000 Periph|
          +------------------+
M0/M3: single AHB bus
M4/M7: I-Code + D-Code + optional cache
```

## 9. The memory technique
**The hook** — Picture four nested Russian dolls: the tiniest (M0) contains only the bare Thumb engine; each larger doll (M3, M4, M7) adds one extra painted layer—bit-banding, DSP/FPU, caches—yet the innermost doll remains identical.

**What to overlearn**  
- NVIC latency numbers: 12 cycles (M3/M4), 8 cycles (M7).  
- CPUID mask: bits [23:20] == 0x4 indicates M4/M7.  
- CMSIS-Core register names: `SCB->CPUID`, `SCB->VTOR`, `NVIC->IP[]`.

**Spaced-repetition schedule**  
Review the latency numbers at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive the latency bound from the pipeline diagram: each exception stacks eight registers, fetches the vector, and refills the pipeline; count the exact bus cycles on the AHB diagram.

## 10. What this unlocks
Mastery of Cortex-M lets you write portable drivers that compile for any STM32, nRF, or Kinetis part and immediately move to real-time operating systems, DMA-driven peripherals, and safety-critical scheduling.

- Next: RTOS task switching on Cortex-M (context save via PendSV).  
- Next: CMSIS-DSP library integration on M4/M7.  
- Next: Memory Protection Unit (MPU) configuration for process isolation.  
- Next: Low-power tickless idle using the SysTick and WFI instruction.

## 11. Self-check — five questions, no answers
1. Which single bit in the `SCB->CPUID` register distinguishes an M4 from an M3 at runtime?  
2. A handler on an M3 core reads a peripheral register with `LDR R0,[R1]`. If the address in R1 lies in the bit-band alias region, how many AHB transfers actually occur?  
3. An M7 system enables the instruction cache but omits the `ISB` after writing CCR. What observable failure can occur on the very next function call?  
4. Write the minimal assembly sequence that toggles bit 3 of a GPIO port on any Cortex-M core while preserving all other registers.  
5. An interrupt arrives while the processor is executing a 32-bit Thumb-2 instruction that spans a 4-byte boundary. How many extra fetch cycles are required on the M0 versus the M7?