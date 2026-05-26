## 1. The one-sentence answer
**Timers in microcontrollers are autonomous hardware counters that compare their running value against programmable thresholds to generate or capture precisely timed digital events without CPU intervention.**

A timer peripheral contains a counter register that increments (or decrements) at a clock-derived rate set by a prescaler. When the counter matches a compare register, the hardware can toggle an output pin, set a flag, or trigger an interrupt; this mechanism directly produces PWM waveforms by repeatedly matching two thresholds per cycle. The same hardware reversed—latching the counter value into a capture register on an external edge—measures intervals between input events with sub-microsecond resolution.

These two modes, output compare and input capture, share the same counter yet serve opposite directions of time-to-signal translation. Output compare turns numbers into edges; input capture turns edges into numbers. Both operate while the CPU executes unrelated code, which is why real-time systems rely on them for motor commutation, protocol bit timing, and sensor period measurement.

> [!NOTE]
> The single deepest insight is that PWM, output compare, and input capture are not separate peripherals; they are three different ways of wiring the same counter-plus-comparator block to I/O pins and interrupt logic.

## 2. Why this matters — concrete and current
Tesla’s traction inverters use STM32 or Aurix timers in center-aligned PWM mode to generate three-phase sine-triangle modulation at 10–20 kHz carrier frequency while simultaneously capturing rotor-position encoder pulses on the same timer channels, achieving <100 ns synchronization between voltage synthesis and position feedback.

SpaceX Falcon 9 uses output-compare channels on flight computers to produce precisely spaced pulses for valve solenoids and igniters; the same timer’s input-capture channels timestamp chamber-pressure transducer edges, allowing the flight software to close the propellant-mixture loop at 1 kHz without jitter from task scheduling.

In semiconductor test equipment, Teradyne’s UltraFLEX systems employ FPGA-embedded timers configured as input-capture arrays to measure picosecond-scale setup/hold windows on DDR5 interfaces; the deterministic latency of hardware capture removes software timestamp uncertainty that would otherwise exceed the required 5 ps accuracy.

Bosch’s latest EPS (electric power steering) MCUs run field-oriented control loops whose PWM generation and current-shunt sampling instants are both derived from a single timer’s compare and capture registers, guaranteeing that ADC conversions always occur at the PWM valley and thereby eliminating the need for blanking intervals.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Binary counter & overflow | The timer’s core is a counter; overflow or compare events are defined relative to its modulus. |
| Prescaler arithmetic     | Frequency division determines the timer tick period; errors here scale every derived timing. |
| Edge polarity & interrupt flags | Input capture and PWM both rely on detecting rising/falling edges and clearing associated flags. |
| Register atomicity       | Writing period and duty registers must be coordinated so partial updates do not produce glitches. |

## 4. Building the idea — from intuition to formalism

### Step 1 — The free-running counter
A timer is simply an n-bit counter clocked by a prescaled system clock. Its value, CNT, increases by one each tick until it reaches the auto-reload value ARR and then resets (or reverses).  
Example: 16-bit counter, 16 MHz clock, prescaler = 15 → effective tick = 1 µs.  
Formal statement:  
$$f_{\text{tick}} = \frac{f_{\text{clk}}}{(\text{PSC}+1)}$$  
> [!WARNING]  
> Forgetting that PSC and ARR are both “plus-one” quantities produces a 1-count systematic error that grows with every cycle.

### Step 2 — Output compare basics
When CNT equals a compare register CCRx, hardware sets a flag and can optionally drive an output pin to a programmed state (set, clear, toggle).  
Example: CCR1 = 500, ARR = 999 → pin goes high at tick 500 every period.  
Formal statement: match event occurs at  
$$t_{\text{match}} = \text{CCRx} \times T_{\text{tick}}$$

### Step 3 — PWM as dual-threshold compare
PWM mode uses two compare values per cycle: one to assert the pin, one to de-assert it. In edge-aligned PWM, the pin is set at overflow and cleared at CCRx (or vice versa).  
Formal duty-cycle relation:  
$$D = \frac{\text{CCRx}}{\text{ARR}+1}$$

### Step 4 — Input capture
An external edge on the timer input triggers a latch of the current CNT value into the capture register. The time delta between successive captures yields period or pulse width.  
Formal interval:  
$$\Delta t = (\text{CCRx}_2 - \text{CCRx}_1) \times T_{\text{tick}}$$  
accounting for possible overflow.

### Step 5 — Mode selection and channel mapping
Each timer channel can be independently configured as output compare/PWM or input capture by writing the mode bits in CCMRx. The same physical pin is multiplexed; direction is chosen at configuration time.

### Step 6 — Update events and shadow registers
ARR and CCR values are buffered in shadow registers and transferred to the active registers only on an update event (UEV), preventing mid-cycle glitches.  
Formal guarantee: new period or duty takes effect only after the current cycle completes.

### Step 7 — Interrupt and DMA linkage
A match or capture event can assert an interrupt or trigger a DMA transaction, moving the CPU out of the timing path entirely.

## 5. Worked examples — every step shown

**Example 1 — Simple 1 kHz 50 % PWM**  
*Given:* 16 MHz clock, want 1 kHz carrier, 50 % duty.  
*Find:* PSC, ARR, CCR1 values.  
Step 1: Choose tick = 1 µs → PSC = 15.  
*Why:* 16 MHz / 16 = 1 MHz.  
Step 2: Period = 1000 ticks → ARR = 999.  
*Why:* 1000 ticks × 1 µs = 1 ms.  
Step 3: 50 % → CCR1 = 500.  
*Why:* half of 1000.  
**Final answer**  
PSC = 15, ARR = 999, CCR1 = 500.  

*Reflection:* The “+1” arithmetic is the only non-obvious detail; once internalized, every frequency calculation follows identically.

**Example 2 — Measure 2.5 kHz square wave period**  
*Given:* Input capture on rising edges, same 1 µs tick. Two successive captures read 0x0123 and 0x029B.  
*Find:* Period in microseconds.  
Step 1: Subtract → 0x029B – 0x0123 = 0x0178 = 376 decimal.  
*Why:* Delta counts equal elapsed ticks.  
Step 2: 376 × 1 µs = 376 µs.  
*Why:* Tick already calibrated.  
**Final answer**  
376 µs (≈ 2.66 kHz).  

*Reflection:* Overflow handling is omitted here; real code must test for wrap-around.

**Example 3 — 25 % duty asymmetric PWM with dead time**  
*Given:* Need rising edge at 250 ticks, falling at 750 ticks, ARR = 999.  
*Find:* CCR1 and CCR2 values.  
Step 1: CCR1 = 250 (set), CCR2 = 750 (clear).  
*Why:* Two compare channels on same output.  
**Final answer**  
CCR1 = 250, CCR2 = 750.

*Reflection:* Using two channels instead of PWM mode gives independent control of both edges, useful for phase-shift modulation.

**Example 4 — Input capture with overflow correction**  
*Given:* 16-bit timer, captures 0xFF80 then 0x0040 after overflow.  
*Find:* True delta.  
Step 1: Detect wrap (second value < first).  
*Why:* Unsigned subtraction would underflow.  
Step 2: Delta = (0x0040 + 0x10000) – 0xFF80 = 0x00C0 = 192.  
*Why:* Add modulus once.  
**Final answer**  
192 ticks.

*Reflection:* Production capture drivers always maintain a software-extended 32- or 64-bit timestamp.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Duty cycle appears 1 LSB off | Using CCR = ARR instead of ARR+1 in the formula | Always compute duty as CCR/(ARR+1) and verify with scope on first bring-up |
| PWM glitch on ARR update | Writing ARR while counter is running without shadow buffering | Enable auto-reload preload; write during update interrupt only |
| Input capture reads zero period | Capturing both edges on a noisy line without filtering | Enable digital filter bits (ICxF) or use input polarity hysteresis |
| Timer stops in debug halt | Default DBGMCU freeze bits asserted | Clear DBG_TIMx_STOP bits in debug configuration |
| Missed capture on high-frequency input | DMA or interrupt latency exceeds capture rate | Use DMA burst mode or a second timer as prescaler |
| Phase shift between channels | Channels clocked from different timer instances | Route all related signals through one timer or synchronize multiple timers via ITR |
| Prescaler change mid-run | PSC written without waiting for current tick | Stop timer, update PSC, restart, or use PSC preload if available |

## 7. The textbook-precise statement
A general-purpose timer implements an autonomous n-bit counter whose compare channels generate an output event when CNT = CCRx and whose capture channels latch CNT on selected input edges. Formally, for a clock frequency \(f_{\text{clk}}\) and prescaler PSC, the time base is \(T_{\text{tick}} = (\text{PSC}+1)/f_{\text{clk}}\). In PWM mode the output waveform period equals \((\text{ARR}+1)\times T_{\text{tick}}\) and the pulse width equals \(\text{CCRx}\times T_{\text{tick}}\) (STM32 RM0090 Reference Manual, §18.3.9–18.3.11; Atmel SAM4S datasheet §37.6).

## 8. Visual — diagram or schematic

```text
          ┌────────────────────────────────────────────────────┐
          │                    Timer Block                     │
Clock ───►│  Prescaler (PSC)  →  Counter (CNT)  ↔  ARR        │
          │                         │                          │
          │          ┌──────────────┼──────────────┐           │
          │          ▼              ▼              ▼           │
          │      CCR1 (OC)      CCR2 (OC)      CCR3 (IC)       │
          │          │              │              │           │
Pin A ───►│       Toggle/Set     PWM out       Capture latch   │◄── Pin B
          │          │              │              │           │
          │       IRQ/DMA        IRQ/DMA        IRQ/DMA        │
          └────────────────────────────────────────────────────┘
```
Label key: OC = output compare, IC = input capture, ARR = auto-reload register.

## 9. The memory technique

1. **The hook** — Picture a metronome (the counter) striking a bell (compare) on the way up and a sensor (capture) recording the instant a passing train crosses a light beam; both events are timed by the same swinging pendulum.
2. **What to overlearn** — \(T_{\text{tick}} = (\text{PSC}+1)/f_{\text{clk}}\), duty = CCR/(ARR+1), capture delta must test for 16-bit wrap.
3. **Spaced-repetition schedule** — Review register formulas at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive every timing value from the single equation “ticks = time / T_tick” and remember that PSC and ARR are inclusive counts.

## 10. What this unlocks
Mastery of timer compare/capture primitives is the foundation for motor-control FOC, software-defined radio bit timing, high-resolution capacitance sensing, and any protocol that must generate or measure edges with sub-microsecond determinism.

- Next: Timer synchronization across multiple instances (master-slave ITR linking)  
- ADC triggering from timer update/compare events  
- Quadrature encoder interface mode (TIMx_SMCR)  
- DMA-driven burst PWM updates for audio or LED matrices  
- Low-power timer variants for tickless RTOS scheduling

## 11. Self-check — five questions, no answers
1. A 32-bit timer runs at 80 MHz with PSC = 7. What is the longest interval that can be measured without overflow in input-capture mode?  
2. You need 100 ns resolution PWM but the clock is 48 MHz. Which prescaler value yields the finest granularity while still allowing a 20 kHz carrier?  
3. Two captures read 0xFFFE and 0x0002 on a 16-bit timer. Compute the true elapsed ticks.  
4. Why does enabling preload on CCR1 eliminate glitches when duty cycle is changed asynchronously from the main loop?  
5. A PWM channel and an input-capture channel share the same timer instance. Which configuration bit guarantees that a capture event cannot occur on the exact tick a compare match drives the output pin?