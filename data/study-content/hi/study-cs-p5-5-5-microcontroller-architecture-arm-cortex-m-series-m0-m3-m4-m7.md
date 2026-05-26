## 1. The one-sentence answer
**ARM Cortex-M series microcontrollers are a family of 32-bit RISC processors optimised for embedded, real-time applications with deterministic interrupt behaviour and low power.**

Cortex-M0 is the smallest member, using a 2-stage pipeline and Thumb instruction set only, delivering roughly 0.9 DMIPS/MHz while keeping gate count under 12 k. Cortex-M3 adds a 3-stage pipeline, hardware divide, and better interrupt controller (NVIC), reaching 1.25 DMIPS/MHz. Cortex-M4 introduces DSP extensions and an optional single-precision FPU, while Cortex-M7 brings a 6-stage superscalar pipeline, L1 cache, and dual-issue execution for up to 2.3 DMIPS/MHz. All variants share the same programmer’s model and NVIC, so code written for M0 compiles and runs on M7 with only recompilation.

The key architectural choice is the use of a fixed-priority, vectored interrupt controller combined with a memory-mapped peripheral bus (AHB-Lite/APB). This guarantees that the latency from interrupt assertion to first instruction of the ISR is both low and bounded, which is essential for hard real-time loops.

> [!NOTE]
> The single most important insight is that Cortex-M processors treat the interrupt controller as a first-class part of the core pipeline rather than an external bolt-on; this integration removes the usual software overhead of context saving and priority handling.

## 2. Why this matters — concrete and current
STM32F103 (Cortex-M3) still powers the majority of low-cost drone flight controllers because its deterministic 1 µs interrupt latency lets the PID loop run at 8 kHz without jitter. Nordic nRF52840 (Cortex-M4) is used inside every Apple Watch Series 4 and later for Bluetooth LE and sensor fusion; the on-chip FPU removes the need for a separate DSP chip and saves 30 % board area. NXP i.MX RT1170 (Cortex-M7) runs the real-time safety controller inside Tesla Model 3 and Y vehicles, handling 100 µs motor-current loops while the main SoC runs Linux. Infineon AURIX TC3xx safety MCUs contain a Cortex-M7 lockstep core certified to ASIL-D; automotive suppliers cite the documented 6-stage pipeline and cache behaviour as the reason they can prove worst-case execution time analytically. Finally, the Raspberry Pi Pico (RP2040 dual Cortex-M0+) is used in the Perseverance rover’s entry-descent-landing camera trigger board because the M0+ core needs only 0.5 mW/MHz, meeting the 2 W total power budget.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Binary and two’s complement | All Cortex-M registers and memory are 32-bit two’s complement; signed DSP instructions rely on it. |
| Memory-mapped I/O    | Peripherals appear as ordinary addresses; understanding load/store semantics is required to configure NVIC and timers. |
| Pipeline hazards     | Cortex-M3/M4/M7 have 3- or 6-stage pipelines; load-use and branch penalties directly affect real-time jitter calculations. |
| Interrupt vectors    | The NVIC uses a vector table; you must know how the processor fetches the initial PC and PSR on exception entry. |

If any row is unfamiliar, pause and review the corresponding digital-logic or computer-organisation material first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Core instruction-set baseline
All Cortex-M cores implement the Thumb-2 subset of the ARMv7-M architecture. The processor therefore fetches 16-bit or 32-bit instructions from a unified code space and executes them in a single pipeline.  
Example: the 16-bit instruction `ADDS r0, r0, #1` increments a loop counter.  
Formal statement: every instruction is encoded as either T1 (16-bit) or T2/T3/T4 (32-bit) format; the decoder asserts a 32-bit wide internal bus to the execution unit.  
> [!WARNING]  
> Treating every instruction as 32-bit will cause the fetch unit to read the second half of a 16-bit instruction as garbage, producing an INVSTATE UsageFault.

### Step 2 — Pipeline depth and branch penalty
Cortex-M0 uses a 2-stage pipeline (fetch, decode+execute). Cortex-M3/M4 use 3 stages (fetch, decode, execute). Cortex-M7 uses a 6-stage, dual-issue pipeline with branch prediction.  
Formal statement: branch penalty \( P = D - 1 \) where \( D \) is pipeline depth when the branch is taken and prediction misses.  
> [!WARNING]  
> Ignoring the extra cycle on every taken branch in a control loop will make the calculated worst-case execution time optimistic by 10–15 % on M3/M4.

### Step 3 — Nested Vectored Interrupt Controller (NVIC)
The NVIC is integrated inside the core. On exception entry the processor automatically pushes R0–R3, R12, LR, PC, PSR onto the stack pointed by SP, then loads the ISR address from the vector table.  
Formal statement: exception latency \( L = 12 \) cycles (M3/M4) or 9 cycles (M7 with cache hit) when no higher-priority exception is pending.  
> [!WARNING]  
> Placing the vector table in non-executable memory or forgetting to set VTOR will cause a HardFault before the first ISR instruction executes.

### Step 4 — DSP and FPU extensions (M4/M7 only)
Cortex-M4 adds 32-bit SIMD, saturating arithmetic, and an optional IEEE-754 single-precision FPU. Cortex-M7 adds double-precision and a 64-bit AXI bus.  
Formal statement: the FPU register file is distinct; context-switch code must save the 32 single-precision registers when `FPU->CPACR` bit 20–23 is set.  
> [!WARNING]  
> Forgetting to enable the FPU in CPACR before the first `VMOV` or `VADD` produces a No-Coprocessor fault.

### Step 5 — Memory hierarchy on M7
Cortex-M7 optionally contains 4–64 KiB I-cache and D-cache with write-back policy. Cache lines are 32 bytes.  
Formal statement: cache hit latency = 1 cycle; miss latency = 6–12 cycles depending on external memory speed.  
> [!WARNING]  
> Running DMA into cached memory without cache maintenance (DCIMVAC) produces stale data visible to the core.

## 5. Worked examples

**Example 1 — Simple interrupt latency calculation**  
*Given:* Cortex-M3 at 72 MHz, no cache, ISR entry.  
*Find:* Time from IRQ assertion to first ISR instruction.  
Step 1: pipeline flush and register stacking take 12 cycles.  
*Why:* NVIC performs the stacking in hardware without software intervention.  
Step 2: vector fetch is 1 cycle because the table is in zero-wait-state SRAM.  
Final answer  
**167 ns**

*Reflection:* The 12-cycle figure is the textbook minimum; any pending higher-priority exception adds further cycles.

**Example 2 — Enabling the FPU on M4**  
*Given:* STM32F407, need single-precision MAC in ISR.  
*Find:* Required CPACR write.  
Step 1: set bits 20–23 to 0b1111.  
```c
SCB->CPACR |= (0xF << 20);
```
*Why:* These bits gate the FPU clock and decode logic.  
Final answer  
**FPU enabled after the write completes**

*Reflection:* The write must be followed by an ISB to guarantee the next instruction sees the FPU.

**Example 3 — Cache maintenance on M7**  
*Given:* 32-byte cache line, DMA writes to address 0x20001000.  
*Find:* Sequence to make data visible.  
Step 1: `DCIMVAC 0x20001000`.  
Step 2: `DSB`.  
*Why:* DCIMVAC invalidates the line; DSB ensures completion before subsequent loads.  
Final answer  
**Core now reads fresh DMA data**

*Reflection:* Omitting DSB can leave the pipeline seeing stale cache state for several instructions.

**Example 4 — Worst-case execution time for control loop**  
*Given:* M4 at 168 MHz, 3-stage pipeline, 5 % branch mispredictions.  
*Find:* WCET for 200-instruction PID loop.  
Step 1: base cycles = 200.  
Step 2: misprediction penalty = 2 cycles × 10 branches = 20.  
Step 3: interrupt entry overhead = 12.  
Final answer  
**232 cycles ≈ 1.38 µs**

*Reflection:* The 2-cycle penalty is architecture-specific; M7 would use 5 cycles instead.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Forgetting to set VTOR            | Bootloader leaves vector table at 0x00000000 | Always write SCB->VTOR before enabling interrupts    |
| Using floating-point in ISR without FPU context | Compiler emits VFP instructions but no FPSCR save | Enable lazy stacking (FPCCR.LSPEN) or save manually  |
| Assuming M0 has hardware divide   | M0 implements divide in software only       | Check Cortex-M0 Technical Reference Manual §3.3      |
| Placing code in cached memory without MPU | Cache is write-back, DMA sees stale data    | Configure MPU region as non-cacheable for DMA buffers |
| Ignoring tail-chaining            | NVIC performs tail-chaining automatically   | Subtract 6 cycles when two same-priority ISRs follow |
| Reading FPSCR without DSB after FPU disable | Pipeline may still hold FPU state           | Insert DSB before clearing CPACR bits                |
| Calculating DMIPS without cache   | M7 numbers assume cache enabled             | Re-measure on target silicon with cache on           |

## 7. The textbook-precise statement
From Yiu, *The Definitive Guide to ARM Cortex-M3 and Cortex-M4 Processors*, 3e, §2.3:  
“The ARMv7-M architecture defines a programmer’s model in which the processor implements a banked stack pointer, a non-banked program counter, and a 32-bit status register (xPSR). Exception entry is performed by hardware that pushes exactly eight 32-bit words onto the stack pointed to by the active stack pointer, then loads the new PC and xPSR from the vector table located at address VTOR.”

## 8. Visual — diagram or schematic
```
Reset Vector (0x00000004)
          |
          v
+---------+---------+---------+
| NVIC    |  Core   |  Bus    |
|  (prio) |  (regs) |  matrix |
+---------+---------+---------+
          |         |
      IRQ[0..n]   AHB/APB
          |         |
       ISR entry   Peripherals
```

The diagram shows the NVIC sitting inside the core boundary; the bus matrix is the only path to memory and peripherals.

## 9. The memory technique

1. **The hook**  
   Picture the Cortex-M as a courier on a one-way street: the NVIC is the traffic light that instantly diverts the courier into the correct side-road (ISR) without the courier having to look at a map.

2. **What to overlearn**  
   - M3/M4 interrupt latency = 12 cycles  
   - M7 superscalar peak = 2 instructions per cycle when dual-issue conditions are met  
   - FPU enable mask = 0xF << 20 in CPACR

3. **Spaced-repetition schedule**  
   Review the 12-cycle latency fact after 1 day, 3 days, 7 days, 16 days, and 35 days.

4. **First-principles fallback**  
   If you forget the latency number, count the mandatory operations: 6 registers pushed (6 cycles), PC/PSR update (2 cycles), vector fetch (1 cycle), pipeline refill (3 cycles) → 12.

## 10. What this unlocks
Mastering Cortex-M pipeline and NVIC behaviour lets you move on to real-time operating systems (FreeRTOS, Zephyr) and to safety-critical scheduling analysis. You can next study DMA cache coherency, TrustZone-M, and the ARMv8-M architecture used in Cortex-M23/M33/M55.

- Deterministic RTOS task switching  
- Mixed-criticality scheduling proofs  
- Power-mode analysis using WFI/WFE and sleep modes  
- Secure partitioning with TrustZone-M

## 11. Self-check — five questions, no answers
1. Calculate the worst-case interrupt latency on an M4 running at 100 MHz with a single wait-state Flash.  
2. A developer forgets to execute an ISB after changing VTOR; which exception will be taken first and why?  
3. On Cortex-M7, a DMA writes 32 bytes to a cached buffer. Which two instructions must appear in the ISR before the data can be read safely?  
4. Which Cortex-M variant cannot execute the instruction `SDIV r0, r1, r2` in hardware?  
5. An ISR on M3 uses 8 floating-point registers. How many extra stack words are pushed automatically when lazy FPU stacking is enabled versus disabled?