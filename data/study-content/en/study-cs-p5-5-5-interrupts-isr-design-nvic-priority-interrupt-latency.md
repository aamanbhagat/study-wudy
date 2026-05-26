## 1. The one-sentence answer
**Interrupts let hardware force the processor to suspend its current task and execute a short, high-priority routine called an ISR, with NVIC priority levels controlling nesting order and latency measuring the unavoidable delay before that routine begins.**

An interrupt arrives as an electrical signal. The processor finishes its current instruction, saves a minimal context, looks up the corresponding ISR address in the vector table, and jumps there. Everything else—register preservation, peripheral acknowledgment, and return—must be written deliberately into the ISR itself.

Priority is not an afterthought. The NVIC compares the incoming interrupt’s priority against the priority of any ISR already running; only a higher-priority request preempts it. Latency is the sum of hardware pipeline drain, vector fetch, and any software prologue the programmer inserts.

> [!NOTE]
> The shortest possible ISR is almost always the correct ISR; every cycle spent inside an interrupt steals time from the main thread and from every lower-priority interrupt that may be waiting.

## 2. Why this matters — concrete and current
In automotive engine-control units from Bosch and Continental, crankshaft-position interrupts must be serviced within a few microseconds; missing the window corrupts fuel-injection timing and violates ISO 26262 safety goals.  

NASA’s Perseverance rover uses an ARM Cortex-R5 NVIC to guarantee that the 200 Hz attitude-control interrupt preempts all telemetry tasks; any added latency would exceed the 2 ms control-loop budget documented in JPL’s flight-software requirements.  

Modern smartphone SoCs from Qualcomm and Apple schedule GPU and modem interrupts at distinct NVIC priority bands so that a touch-screen event never starves the radio stack, preserving both responsiveness and cellular certification margins.  

In implantable cardiac pacemakers from Medtronic, the ventricular-sense interrupt has the highest NVIC priority; its latency must remain below 100 µs even when the device is executing lengthy diagnostic logging, because a missed QRS complex can trigger inappropriate pacing.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Processor pipeline       | Explains why several cycles elapse before an ISR starts   |
| Stack frame and registers| Determines what must be saved on entry and restored on exit |
| Memory-mapped peripherals| Shows how an ISR clears the interrupt source flag         |
| Binary priority encoding | Underpins how NVIC compares and preempts requests         |

## 4. Building the idea — from intuition to formalism

### Step 1 — An external event must reach the processor
A peripheral asserts a dedicated request line. The processor samples the line at the end of the current instruction.  
Example: a UART receive buffer full flag raises its line.  
Formal statement:  
$$t_{\text{detect}} = t_{\text{inst complete}} + t_{\text{sample}}$$  
> [!WARNING]  
> Treating the request as instantaneous hides the one-instruction sampling delay that already contributes to latency.

### Step 2 — Context is frozen, not invented
Only the program counter and processor status are pushed automatically; general-purpose registers remain the programmer’s responsibility.  
Example: Cortex-M automatically pushes eight registers plus the return address.  
Formal statement:  
$$\text{Context saved} = \{\text{PC}, \text{PSR}, \text{R0–R3}, \text{R12}, \text{LR}\}$$  
> [!WARNING]  
> Forgetting to save a register that the ISR modifies silently corrupts the foreground thread.

### Step 3 — Vector table supplies the entry point
The NVIC uses the interrupt number as an index into a table of function pointers.  
Example: IRQ 23 → address 0x0000_005C.  
Formal statement:  
$$\text{ISR address} = \text{VectorTableBase} + 4 \times \text{IRQn}$$  
> [!WARNING]  
> An off-by-one index sends the processor to the wrong routine and usually to a hard fault.

### Step 4 — Priority comparison decides preemption
NVIC compares the new request’s priority against the running priority; only a strictly higher priority wins.  
Example: priority 3 request arrives while priority 5 ISR runs → preemption occurs.  
Formal statement:  
$$\text{Preempt if } P_{\text{new}} < P_{\text{running}}$$  
> [!WARNING]  
> Equal priorities never nest; the second request remains pending until the first ISR exits.

### Step 5 — Latency is the measurable interval from assertion to first ISR instruction
It comprises pipeline drain, vector fetch, and any prologue cycles.  
Formal statement:  
$$L = t_{\text{pipeline}} + t_{\text{vector fetch}} + t_{\text{prologue}}$$  
> [!WARNING]  
> Adding floating-point context save or long critical sections inside the ISR inflates measured latency far beyond the architectural minimum.

## 5. Worked examples — every step shown

**Example 1 — Minimal GPIO ISR**  
*Given:* Cortex-M4, IRQ 6, priority 4, no other interrupts active.  
*Find:* Minimum latency in cycles.  
Pipeline drain = 4 cycles. Vector fetch = 6 cycles. Prologue = 0 cycles.  
*Why* 4 + 6 + 0 = 10 cycles.  
**10 cycles**

*Reflection:* The example isolates hardware latency; any added instruction immediately increases the number.

**Example 2 — Nested UART and timer**  
*Given:* Timer ISR (priority 2) running; UART (priority 1) asserts.  
*Find:* Does nesting occur?  
1 < 2 is true, therefore preemption occurs.  
**Yes**

*Reflection:* Priority numbers are lower-is-higher; reversing the comparison is a common algebraic slip.

**Example 3 — Latency with register save**  
*Given:* Same hardware as Example 1 plus eight register pushes required by ABI.  
*Find:* New latency.  
10 + 8 = 18 cycles.  
**18 cycles**

*Reflection:* Every explicit push widens the window during which a still-higher interrupt could have been missed.

**Example 4 — Tail-chaining optimisation**  
*Given:* Two pending interrupts of equal priority after current ISR finishes.  
*Find:* Extra cycles between first and second ISR.  
NVIC tail-chains; only the second vector fetch occurs (6 cycles).  
**6 cycles**

*Reflection:* Tail-chaining removes the full context restore/save sequence; recognising the optimisation prevents over-estimating latency.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| ISR performs floating-point work  | Compiler silently inserts save/restore      | Mark ISR with naked attribute or move math out |
| Priority inversion via shared data| Low-priority ISR holds lock                 | Use interrupt-safe queues or disable only the conflicting IRQ |
| Vector table in RAM without MPU guard | Accidental overwrite jumps to invalid code | Place table in write-protected region        |
| Clearing flag after enabling IRQ  | Race re-enters same ISR                     | Clear flag before re-enabling                |
| Measuring latency with debugger   | Breakpoints add many cycles                 | Use hardware trace or GPIO toggle            |
| Assuming all IRQs are maskable    | NMI and HardFault ignore NVIC priority      | Reserve NMI for catastrophic events only     |
| Forgetting to set BASEPRI         | Entire priority scheme collapses            | Initialise BASEPRI in startup before enabling interrupts |

## 7. The textbook-precise statement
An interrupt request *i* with priority *pᵢ* is serviced if and only if *pᵢ* is strictly less than the current execution priority and no higher-priority request is pending. The interrupt latency *L* is bounded by  
$$L \le t_{\text{pipeline drain}} + t_{\text{vector fetch}} + t_{\text{prologue}} + \sum_{j : p_j < p_i} t_{\text{ISR}_j}.$$  
Reference: ARM Cortex-M Technical Reference Manual, §7.2–7.4 (NVIC and interrupt latency).

## 8. Visual — diagram or schematic
```text
          Main Thread
               |
               v
   +-----------------------+
   | Instruction n         |  <-- pipeline drain (4 cycles)
   +-----------------------+
               |
               v
   NVIC compares p_new < p_running
               |
       +-------+-------+
       |               |
   No  |               | Yes
       v               v
  Pending        Vector fetch (6)
       |               |
       v               v
   Resume main      ISR prologue
                       |
                       v
                 ISR body executes
```

## 9. The memory technique
1. **The hook** — Picture the NVIC as a strict maître d’ who only seats a higher-ranking guest while a lower-ranking one is already dining; the waiting guest’s “latency” is the time from doorbell to first bite.  
2. **What to overlearn** — (a) lower numeric priority = higher urgency, (b) *L* ≥ 10 cycles on Cortex-M4, (c) tail-chaining costs exactly one vector fetch.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive latency by adding pipeline, fetch, and prologue cycles from the ARM TRM pipeline diagram.

## 10. What this unlocks
Mastery of ISR design and NVIC priority lets you reason about schedulability in real-time operating systems and about worst-case execution time analysis required for certification.  

- Rate-monotonic and deadline scheduling  
- RTOS task synchronisation primitives (semaphores from ISRs)  
- DMA completion and error interrupt hierarchies  
- Power-mode entry/exit latency budgeting  

## 11. Self-check — five questions, no answers
1. A Cortex-M device receives two interrupts of identical priority 3 while the processor is in thread mode. Which ISR runs first, and why?  
2. Calculate the additional latency introduced when an ISR must save eight floating-point registers before it may safely use the FPU.  
3. An ISR clears its peripheral flag after the return instruction. What sequence of events can cause immediate re-entry?  
4. Why does raising BASEPRI to 0x10 disable all interrupts with priority 0x20 but leave NMI unaffected?  
5. In a system with three priority levels, a 50 µs ISR at priority 1 and a 10 µs ISR at priority 2 both become pending while a priority 3 ISR is running. What is the longest possible latency for the priority-2 ISR?