## 1. The one-sentence answer
**Bare-metal code runs directly on the microcontroller with no operating-system layer, while an RTOS inserts a pre-emptive scheduler and kernel services between the application and the hardware.**

A bare-metal program owns every CPU cycle from reset onward; the developer writes the main loop, interrupt handlers, and peripheral drivers with no intervening abstraction. This yields deterministic timing at the cost of manual coordination of every concurrent activity. An RTOS, by contrast, supplies threads, semaphores, timers, and priority-based scheduling so that multiple real-time requirements can be expressed as separate tasks whose execution order is enforced by the kernel rather than by ad-hoc state machines.

The decisive criterion is therefore not “which is faster” but “which preserves the required timing invariants with acceptable engineering effort.” When the set of timing constraints is small and static, the overhead and complexity of a kernel are unnecessary; when the set grows or changes, the kernel’s formal scheduling analysis becomes the cheaper path to correctness.

> [!NOTE]
> The choice is ultimately an engineering trade-off between determinism, code size, power, and maintainability; neither approach is universally superior.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover flight software runs a custom bare-metal executive on its RAD750 processor; every millisecond of CPU time is accounted for by static scheduling tables, eliminating any possibility of priority inversion during entry-descent-landing.

Bosch’s latest engine-control units for gasoline direct injection use the AUTOSAR-compliant Erika Enterprise RTOS; the kernel’s OSEK-time conformance lets the supplier certify that the 1 ms fuel-calculation task will always meet its deadline even when the 100 µs knock-detection interrupt fires.

Texas Instruments ships the SimpleLink CC13x2 wireless MCU with both bare-metal SDK examples and the TI-RTOS kernel; the same silicon therefore serves a coin-cell temperature sensor that sleeps 99.9 % of the time and a multi-protocol gateway that must simultaneously handle Bluetooth, Zigbee, and proprietary sub-GHz traffic.

The Mars Helicopter Ingenuity’s navigation loop runs bare-metal on a Snapdragon 801, while its higher-level flight-control tasks run under a lightweight RTOS; the split demonstrates how a single mission can partition the same processor between the two regimes according to timing criticality.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Interrupt handling       | Both bare-metal and RTOS rely on asynchronous events; you must know vector tables and latency. |
| Worst-case execution time| Real-time correctness is proved by comparing WCET against deadlines; the metric is identical for both approaches. |
| Priority and pre-emption | RTOS scheduling theory (RMS, EDF) is meaningless without these notions; bare-metal code implicitly encodes priorities via interrupt levels. |
| Memory-mapped I/O        | Direct register access is the only mechanism available in bare metal and remains visible under an RTOS. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Direct hardware ownership
A bare-metal program begins at the reset vector and never relinquishes control of the program counter to any external entity.  
Example: toggling an LED by writing to a GPIO data register inside an infinite loop.  
Formal statement: execution is a single total order of instructions whose timing is fully determined by the instruction sequence and the hardware clocks.  
> [!WARNING]  
> Treating the main loop as “just another task” hides the fact that any blocking operation stalls every other activity.

### Step 2 — Event-driven extension via interrupts
Hardware events are serviced by interrupt handlers that may modify shared state.  
Example: a timer interrupt increments a millisecond tick counter read by the main loop.  
Formal statement: the program is a foreground thread plus a set of ISRs whose worst-case latency is bounded by the longest non-pre-emptible section (usually the longest ISR itself).

### Step 3 — Manual concurrency management
When multiple timing requirements exist, the developer encodes them as a state machine or a set of cooperating loops whose interleaving is controlled by flags or ring buffers.  
Example: a 1 ms control loop and a 10 ms telemetry task share a queue protected by a simple flag.  
Formal statement: schedulability reduces to exhaustive enumeration of all possible interleavings; the state space grows factorially with the number of distinct periods.

### Step 4 — Introduction of a kernel
An RTOS inserts a scheduler that decides which ready task runs next according to a policy (fixed-priority, earliest-deadline-first, etc.).  
Example: three tasks with periods 1 ms, 5 ms, 10 ms are assigned priorities 3, 2, 1 respectively under rate-monotonic scheduling.  
Formal statement: a task set is schedulable under RMS if  
\[
U = \sum_{i=1}^{n} \frac{C_i}{T_i} \leq n(2^{1/n}-1)
\]  
where \(C_i\) is worst-case execution time and \(T_i\) is period.

### Step 5 — Resource sharing and blocking
Semaphores and mutexes protect shared data; priority inheritance or ceiling protocols bound priority inversion.  
Example: a high-priority task blocks on a mutex held by a low-priority task; inheritance temporarily raises the low-priority task.  
Formal statement: the blocking time \(B_i\) appears in the response-time equation  
\[
R_i = C_i + B_i + \sum_{j \in hp(i)} \left\lceil\frac{R_i}{T_j}\right\rceil C_j.
\]

### Step 6 — Determinism versus utilisation trade-off
Bare metal maximises determinism at the price of utilisation; an RTOS maximises utilisation at the price of added kernel overhead and analysis complexity. The boundary occurs when the manual state-machine complexity exceeds the cost of the kernel.

## 5. Worked examples — every step shown

**Example 1 — Single periodic action**  
*Given:* 8 MHz Cortex-M0, need to toggle an LED every 500 ms.  
*Find:* minimal implementation.  
Write the vector table and reset handler; configure SysTick for 1 ms; in the handler increment a counter; when the counter reaches 500, toggle the GPIO.  
*Why* — direct register writes guarantee the exact interval.  
**Final answer:** 48 bytes of code, zero context-switch overhead.

**Example 2 — Two independent periodic tasks**  
*Given:* 1 ms control loop and 10 ms telemetry.  
*Find:* bare-metal version.  
Use a single 1 ms tick; the main loop checks two counters and dispatches the appropriate handler; both handlers are non-blocking.  
*Why* — the longest handler must finish before the next tick.  
**Final answer:** response time of telemetry task is at most 1 ms plus length of control handler.

**Example 3 — Same workload under RTOS**  
*Given:* FreeRTOS on the same MCU.  
*Find:* task creation and timing.  
Create two tasks with periods 1 ms and 10 ms, priorities 3 and 1; use `vTaskDelayUntil`.  
*Why* — the kernel measures time and performs context switches.  
**Final answer:** utilisation bound \(U=0.2\) satisfies RMS test for \(n=2\).

**Example 4 — Shared resource with inversion risk**  
*Given:* high-priority task needs a mutex held by a medium-priority task.  
*Find:* safe implementation.  
Enable priority inheritance on the mutex; the low-priority task never runs while the high-priority task waits.  
*Why* — inheritance caps blocking time to the critical-section length.  
**Final answer:** worst-case blocking time equals the longest critical section, independent of medium-priority work.

*Reflection:* the progression shows that complexity, not raw speed, drives the decision; the fourth example is impossible to analyse exhaustively without kernel primitives.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using an RTOS “because it’s modern” | Marketing pressure and tutorial availability        | Compute utilisation and state-machine size first     |
| Ignoring ISR latency under RTOS     | Assumption that kernel hides all timing             | Measure or analyse ISR pre-emption paths             |
| Over-long critical sections         | Developer protects large functions for simplicity   | Split sections; use lock-free structures where possible |
| Forgetting power implications       | RTOS tick timer keeps CPU awake                     | Use tickless idle or return to bare metal for <1 % duty cycle |
| Priority inversion without protocol | Default mutex is not inheriting                     | Always enable inheritance or ceiling protocol        |
| Static task set assumed dynamic     | New features added without re-analysis              | Re-run schedulability test after every change        |
| Toolchain overhead underestimated   | RTOS examples hide RAM/ROM cost                     | Measure minimum kernel footprint on target silicon   |

## 7. The textbook-precise statement
A system is said to be **bare-metal** when its application code executes in a single thread of control whose interleaving with hardware events is entirely determined by the interrupt controller and the programmer’s explicit sequencing. A system uses an **RTOS** when a kernel provides multiple threads of control, a scheduling policy, and synchronisation primitives whose worst-case timing behaviour is amenable to response-time analysis (Liu & Layland, “Scheduling Algorithms for Multiprogramming in a Hard-Real-Time Environment”, JACM 1973). The schedulability test for fixed-priority pre-emptive scheduling with arbitrary deadlines appears in Audsley et al., “Applying new scheduling theory to static priority pre-emptive scheduling”, Software Engineering Journal, 1993.

## 8. Visual — diagram or schematic
```text
CPU time line (horizontal axis = microseconds)

Bare-metal:
[ISR1][TaskA][ISR2][TaskA][ISR1][TaskB][idle]...

RTOS:
[ISR1][CtxSw][TaskH][CtxSw][TaskM][ISR2][CtxSw][TaskH]...
        ^kernel overhead visible as extra segments
```
Labels: CtxSw = context-switch cost (≈ 50–200 cycles); TaskH = highest-priority ready task; idle = only present when utilisation < 1.

## 9. The memory technique

1. **The hook** — picture a violinist (bare metal) playing alone versus an orchestra (RTOS) with a conductor; the conductor adds overhead but lets many musicians stay synchronised.
2. **What to overlearn** — RMS utilisation bound \(n(2^{1/n}-1)\), definition of priority inheritance, and the fact that bare-metal worst-case latency equals longest non-pre-emptible section.
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — rebuild from the response-time equation \(R_i = C_i + B_i + \sum \lceil R_i/T_j\rceil C_j\) and ask whether the manual state space needed to keep every \(R_i\) below its deadline exceeds the kernel’s own overhead.

## 10. What this unlocks
Mastery of the bare-metal/RTOS boundary lets you evaluate any new real-time platform (AUTOSAR, Zephyr, SafeRTOS, custom executives) and decide whether to adopt or bypass its kernel. It directly precedes the study of mixed-criticality scheduling, hypervisors for automotive domain controllers, and energy-aware scheduling for battery-less IoT nodes.

## 11. Self-check — five questions, no answers
1. A 10 ms task and a 1 ms task share a 200 µs critical section protected by a non-inheriting mutex. Compute the maximum priority-inversion blocking time experienced by the 1 ms task.
2. Under what utilisation does the RMS bound for three tasks drop below 0.78?
3. Name the exact hardware feature that bare-metal code relies on to achieve sub-microsecond reaction to an external pin without any kernel involvement.
4. A new requirement adds a fourth periodic task; after insertion the utilisation rises from 0.65 to 0.82. Which schedulability test must be re-run and why?
5. You are told a system “runs an RTOS” yet every task calls a 3 ms busy-wait inside its critical section. What analytical property has been lost?