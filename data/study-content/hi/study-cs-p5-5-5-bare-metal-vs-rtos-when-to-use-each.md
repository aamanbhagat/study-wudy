## 1. The one-sentence answer
**Bare-metal programming runs your code directly on the microcontroller with no operating system layer, while an RTOS adds a deterministic scheduler and task abstraction on top of the same hardware.**

Bare-metal suits systems where a single control loop must finish within a strict deadline and the MCU has limited RAM or flash. You write an infinite `while(1)` loop that polls or reacts to interrupts, giving you complete control over every cycle. An RTOS becomes useful once you need multiple independent activities (sensor sampling, communication, logging) that must meet different deadlines without blocking each other.

The choice is not about “modern” versus “old”; it is about whether the extra context-switch overhead and RAM usage of the RTOS still leave enough margin for your worst-case timing requirements.

> [!NOTE]
> The decisive insight is that bare-metal gives you deterministic latency at the cost of manual concurrency, while an RTOS gives you structured concurrency at the cost of bounded but non-zero scheduling jitter.

## 2. Why this matters — concrete and current
NASA’s Mars Perseverance rover flight software runs bare-metal on its RAD750 processor for the entry-descent-landing phase because a single missed 10 ms deadline would destroy the vehicle; any RTOS jitter was unacceptable.

STMicroelectronics ships the STM32Cube HAL examples almost exclusively in bare-metal form so that automotive Tier-1 suppliers can certify ISO 26262 ASIL-D code without an extra OS certification package.

The PX4 autopilot project offers both a NuttX RTOS build and a bare-metal ChibiOS build for the same FMU hardware; teams choose the RTOS path when they must run simultaneous MAVLink telemetry, logging to SD card, and sensor fusion at 1 kHz.

Amazon FreeRTOS powers the ESP32-based AWS IoT reference designs precisely because the Wi-Fi stack, MQTT client, and OTA updater must coexist without the developer writing a custom cooperative scheduler.

The latest STM32H7 and NXP i.MX RT1170 application notes demonstrate that even 600 MHz Cortex-M7 parts still ship bare-metal motor-control firmware when the control loop must finish inside 50 µs while the RTOS is reserved for the GUI and networking tasks on a second core.

## 3. Mental prerequisites

| Concept              | Why you need it here                                                                 |
|----------------------|--------------------------------------------------------------------------------------|
| Interrupt handling   | Both bare-metal and RTOS rely on interrupts for deterministic reaction; you must know how to calculate worst-case latency. |
| Task state and stack | RTOS schedulers move tasks between ready, blocked and running states; you must understand stack usage per task. |
| Timing analysis      | You must compute worst-case execution time (WCET) to decide whether the scheduler overhead still meets deadlines. |
| Memory map           | Bare-metal places everything in one address space; RTOS adds per-task stacks, so you must verify RAM margins. |

If any of these four items are unclear, pause and review them before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Single control loop versus multiple independent activities
When your firmware performs only one activity, a bare-metal `while(1)` loop already gives you the lowest possible latency.  
Example: a thermostat that reads a temperature sensor every 100 ms and toggles a relay.  
Formal statement: let \(T_d\) be the deadline and \(T_e\) the execution time of the single loop body; schedulability holds when \(T_e \le T_d\).  
> [!WARNING] If you later add a second periodic activity without an RTOS, you will manually interleave code and any missed deadline will be silent and hard to debug.

### Step 2 — Cooperative versus preemptive scheduling
Bare-metal forces cooperative scheduling inside one loop; an RTOS can preempt a lower-priority task when a higher-priority one becomes ready.  
Example: motor PWM update (priority 3) must not be delayed by SD-card logging (priority 1).  
Formal statement: under rate-monotonic scheduling the utilisation bound is \(U \le n(2^{1/n}-1)\).  
> [!WARNING] Forgetting that context-switch cost adds to every task’s WCET will make the utilisation calculation optimistic.

### Step 3 — Stack and RAM accounting
Bare-metal needs one stack; an RTOS needs one stack per task plus TCB structures.  
Example: four tasks each with 1 KiB stack plus 200 B TCB consume 4.8 KiB versus 1 KiB bare-metal.  
Formal statement: total RAM requirement \(R = \sum_i S_i + n \cdot |TCB|\) where \(S_i\) is stack size of task \(i\).  
> [!WARNING] Under-estimating stack size leads to silent corruption once the RTOS is enabled.

### Step 4 — Deterministic latency bound
Bare-metal worst-case latency is the longest instruction sequence plus interrupt latency; RTOS adds scheduler and potential priority inversion.  
Formal statement: response time \(R_i = C_i + \sum_{j \in hp(i)} C_j + B_i\) where \(B_i\) is blocking time.  
> [!WARNING] Priority inversion without mutex protocol can make a high-priority task wait for a low-priority one indefinitely.

### Step 5 — Certification and tooling overhead
Bare-metal certification only covers your code; RTOS certification requires an extra OS safety case.  
Formal statement: certification cost scales with the size of the trusted computing base.  
> [!WARNING] Choosing an RTOS solely for convenience and later discovering it is not certified for your safety level wastes months of work.

## 5. Worked examples — har step show karo

**Example 1 — Simple LED blinker**  
*Given:* STM32F030, 8 MHz, only task is toggle LED every 500 ms.  
*Find:* Should you use bare-metal or RTOS?  
Step 1: measure loop body = 120 cycles.  
Step 2: 500 ms deadline gives 4 000 000 cycles margin.  
Step 3: single stack of 256 B fits in 4 KiB SRAM.  
**Bare-metal is sufficient.**  
*Why:* utilisation is < 0.003 % and no concurrency exists.

**Example 2 — Motor control plus telemetry**  
*Given:* 1 kHz current loop, 10 Hz CAN telemetry on STM32G431.  
*Find:* schedulability with FreeRTOS.  
Step 1: current loop WCET = 180 µs, telemetry = 800 µs.  
Step 2: utilisation \(U = 0.18 + 0.008 = 0.188\).  
Step 3: rate-monotonic bound for two tasks ≈ 0.828.  
**RTOS is acceptable.**  
*Why:* margin remains large even after adding 15 µs context-switch cost.

**Example 3 — Safety-critical airbag controller**  
*Given:* 2 ms hard deadline, ISO 26262 ASIL-D.  
*Find:* bare-metal or RTOS?  
Step 1: no third-party OS is certified for ASIL-D on this MCU.  
Step 2: single control loop WCET = 340 µs.  
**Bare-metal is mandatory.**  
*Why:* certification argument collapses once an uncertified scheduler is introduced.

**Example 4 — Multi-sensor fusion drone**  
*Given:* 1 kHz IMU, 100 Hz GPS, 50 Hz logging, 400 KiB RAM limit.  
*Find:* minimum number of tasks that still fit.  
Step 1: four tasks require 4 × 1.5 KiB + TCBs = 6.8 KiB.  
Step 2: remaining RAM insufficient for DMA buffers.  
Step 3: merge logging into GPS task → three tasks, 5.1 KiB.  
**RTOS with three tasks is feasible.**  
*Why:* merging reduces stack overhead while preserving deadline isolation.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Adding an RTOS “just in case”       | Fear of future complexity                           | Start bare-metal; migrate only after measuring utilisation > 70 % |
| Ignoring context-switch cost        | Treating scheduler as free                          | Add measured context-switch time to every WCET       |
| Under-sized task stacks             | Copy-paste from example projects                    | Run stack-watermark test for 24 h under load         |
| Priority inversion without protocol | Using plain mutex on shared resource                | Always enable priority inheritance or ceiling        |
| Forgetting ISR latency in bare-metal| Assuming loop runs continuously                     | Measure longest critical section inside ISRs         |
| Choosing RTOS for certification     | Believing “RTOS is more professional”               | Check whether the RTOS safety manual actually covers your MCU and compiler |

## 7. The textbook-precise statement
In “Real-Time Systems” by Jane W. S. Liu (Prentice Hall, 2000), §3.2, a system is defined as schedulable under a given scheduling policy if and only if, for every task \(\tau_i\) with worst-case execution time \(C_i\), relative deadline \(D_i\) and period \(T_i\), the response-time equation \(R_i = C_i + I_i + B_i \le D_i\) holds, where \(I_i\) is the interference from higher-priority tasks and \(B_i\) is the maximum blocking time from lower-priority tasks. When no operating system is present, \(I_i = 0\) and \(B_i = 0\) except for interrupt disable sections; the single-thread utilisation bound therefore collapses to \(C/T \le 1\).

## 8. Visual — diagram or schematic
```text
Timeline (time →)
Bare-metal: [ISR]--[Loop body]--[ISR]--[Loop body]--...
             |<--Te-->|         |<--Te-->|
RTOS:        [ISR]--[T3]--[T2]--[T1]--[idle]--[T3]...
             |<--C3-->|<--C2-->|<--C1-->|
T1 highest priority, T3 lowest; arrows show preemption points.
```

## 9. The memory technique

1. **The hook** — picture a busy kitchen: bare-metal is one chef who must finish chopping before answering the phone; RTOS is three chefs who can interrupt each other according to a head-chef schedule.
2. **What to overlearn** — bare-metal utilisation bound = 1.0; rate-monotonic bound for \(n\) tasks = \(n(2^{1/n}-1)\); always measure context-switch cost.
3. **Spaced-repetition schedule** — review the utilisation formula after 1 day, 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — if you forget the formula, rebuild it by writing the response-time equation \(R_i = C_i + \sum_{j \in hp(i)} C_j + B_i\) and requiring \(R_i \le D_i\).

## 10. What this unlocks
You can now decide the software architecture of any new embedded project in the first hour instead of after weeks of painful refactoring.

- Next topic: rate-monotonic versus earliest-deadline-first analysis
- Technique: static stack-watermark analysis with vendor HAL
- Tooling: integration of Tracealyzer or SEGGER SystemView for timing validation
- Certification path: IEC 61508-3 table for “OS not present” versus “OS present”

## 11. Self-check — five questions, no answers
1. A system has two tasks with periods 5 ms and 10 ms and WCETs 1.2 ms and 3 ms. Is it schedulable under rate-monotonic scheduling?
2. You measured a 12 µs context switch on your MCU. How does this change the utilisation calculation for a 1 kHz task?
3. Why can a bare-metal motor-control loop meet a 50 µs deadline that an RTOS version on the same core cannot?
4. List three concrete signs that your bare-metal project has outgrown cooperative scheduling.
5. In the airbag example, which single line of code would immediately invalidate the ASIL-D argument if an RTOS were introduced?