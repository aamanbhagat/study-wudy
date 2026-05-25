## What it is
An interrupt is a hardware or software signal that demands the immediate attention of the processor. When an interrupt occurs, the processor pauses its current task, saves its state, and executes a special function called an Interrupt Service Routine (ISR) to handle the event, before resuming the original task. This mechanism allows a system to react to high-priority, asynchronous events without constantly polling for them.

## Why it matters
Interrupts are the foundation of real-time and responsive systems, which are critical in your fields of interest. In rocket science, a flight control computer uses interrupts from an Inertial Measurement Unit (IMU) to make millisecond-level course corrections. In experimental physics, particle detectors generate interrupts to signal a collision, ensuring no data is missed. Without an efficient interrupt-handling mechanism, these systems would be too slow and unreliable to function.

## When to study it
Before tackling this, you must have a firm grasp of the following. If not, master them first.
1.  **Computer Architecture:** Understand the roles of the Program Counter (PC), Stack Pointer (SP), and general-purpose registers. Know what the instruction cycle (fetch-decode-execute) is.
2.  **C Programming:** You must be comfortable with function pointers and the `volatile` keyword.
3.  **Digital Logic:** Understand the concept of logic levels, rising/falling edges, and how peripherals signal the CPU.
4.  **Memory-Mapped I/O:** Know how a CPU communicates with peripherals by reading from and writing to specific memory addresses.

## How to study it (step by step)
1.  **Review the CPU State:** On paper, list the minimum set of registers a CPU must save before jumping to a new function (PC, status register, etc.). This is the "context." Understand that an interrupt is an unscheduled, hardware-forced function call.
2.  **Read the Datasheet:** Obtain the technical reference manual for a specific microcontroller (e.g., an ARM Cortex-M4 like the STM32F4 series). Read the chapter on the Nested Vectored Interrupt Controller (NVIC). Do not skim. Focus on the priority-level registers and the vector table.
3.  **Write a "Button Press" ISR:** Using a development board, configure a GPIO pin to trigger an interrupt on a rising edge. Write a minimal ISR that toggles an LED. Observe how the main loop's execution is paused when you press the button.
4.  **Introduce Preemption:** Configure a periodic timer to generate a second interrupt at a lower priority than the button press. In the timer ISR, perform a time-consuming but non-blocking task (e.g., a long loop that increments a `volatile` counter). While the timer ISR is "running," press the button and observe that the button's higher-priority ISR preempts (interrupts) the timer ISR.
5.  **Measure Latency:** Use an oscilloscope or logic analyzer. Set a GPIO pin high at the very start of your ISR and low at the very end. Trigger the interrupt externally and measure the time from the trigger event to the GPIO pin going high. This is your system's interrupt latency.

## Key ideas, with intuition
1.  **The Interrupt as a Forced Function Call:** A normal function call is planned; it's an instruction in your code. An interrupt is unplanned; an external event forces the CPU to jump to a specific address. This address is found by looking up the interrupt source in a special list called the **Interrupt Vector Table**. Think of it as an emergency contact list for the CPU.

2.  **Context is Everything (and Saving It Takes Time):** The CPU cannot just abandon its work. It must save its "context" — the values in its registers — onto the stack. After the ISR finishes, it restores this context from the stack and resumes exactly where it left off. This process of saving and restoring is pure overhead.
    $$ t_{latency} = t_{finish\_instruction} + t_{stacking} + t_{vector\_fetch} $$
    This is the **interrupt latency**: the time from the interrupt signal assertion until the first instruction of your ISR executes.

3.  **Priority Determines Who Shouts Loudest:** The Nested Vectored Interrupt Controller (NVIC) is like a bouncer at a club. It decides which interrupt gets the CPU's attention. Each interrupt source is assigned a priority number (lower numbers often mean higher priority). If a low-priority interrupt is being serviced and a high-priority one occurs, the NVIC will pause the low-priority ISR and run the high-priority one immediately. This is called **nesting** or **preemption**.

4.  **ISRs Must Be Lean and Mean:** An ISR blocks other interrupts of the same or lower priority. Therefore, it must execute as quickly as possible. An ISR should *never* wait for something (`delay()`), perform complex calculations, or call non-reentrant functions. The best practice is to do the absolute minimum work: set a flag, copy data from a peripheral into a buffer, and exit. The main `while(1)` loop can then do the heavy processing based on the flag.

## Worked example
**Scenario:** An autonomous vehicle's microcontroller has two interrupt sources:
*   A GPS module sends a data packet once per second via UART. This triggers `UART_IRQ` with **priority 5**. The ISR must read 128 bytes from the UART data register.
*   An IMU signals a critical stability event. This triggers `IMU_IRQ` with **priority 2** (higher priority).

The CPU takes 10 clock cycles to stack registers and fetch the vector for any interrupt. Reading one byte from UART takes 2 cycles. The `IMU_ISR` takes a fixed 50 cycles to execute. The CPU clock is 100 MHz ($1 \text{ cycle} = 10 \text{ ns}$).

**Question:** If the `IMU_IRQ` occurs exactly when the `UART_ISR` has read 30 of its 128 bytes, what is the total time from the start of the `UART_ISR` to the completion of the `IMU_ISR`?

**Step-by-step Solution:**

1.  **Calculate time spent in `UART_ISR` before preemption:**
    *   The `UART_ISR` had already started. It has read 30 bytes.
    *   Time to read 30 bytes = $30 \text{ bytes} \times 2 \text{ cycles/byte} = 60 \text{ cycles}$.
    *   This does not include the initial latency for the UART interrupt, but the question asks for time *from the start of the UART_ISR*. So we start our clock at $T_0$ when the `UART_ISR` begins execution.
    *   Time elapsed when `IMU_IRQ` hits = $60 \text{ cycles} \times 10 \text{ ns/cycle} = 600 \text{ ns}$.

2.  **Calculate the latency for the `IMU_IRQ`:**
    *   The `IMU_IRQ` has higher priority (2 < 5), so it will preempt the `UART_ISR`.
    *   The CPU must save the context of the `UART_ISR` to start the `IMU_ISR`.
    *   Latency = Stacking + Vector Fetch = $10 \text{ cycles}$.
    *   Latency time = $10 \text{ cycles} \times 10 \text{ ns/cycle} = 100 \text{ ns}$.

3.  **Calculate the execution time of the `IMU_ISR`:**
    *   The problem states this is a fixed 50 cycles.
    *   Execution time = $50 \text{ cycles} \times 10 \text{ ns/cycle} = 500 \text{ ns}$.

4.  **Sum the times:**
    *   The total time is the sum of the time already spent in the UART ISR, the latency of the preemption, and the execution time of the high-priority ISR.
    *   $T_{total} = T_{\text{UART_partial}} + T_{\text{IMU_latency}} + T_{\text{IMU_execution}}$
    *   $T_{total} = 600 \text{ ns} + 100 \text{ ns} + 500 \text{ ns} = 1200 \text{ ns}$ or $1.2 \text{ µs}$.

**Reflection:** This example demonstrates preemption. The lower-priority task was paused mid-execution to service a more critical event. The total time to handle the critical event is its own execution time *plus* the latency cost of the context switch. The remaining 98 bytes of UART data will be processed only after the `IMU_ISR` completes and its context is restored.

## Diagrams
A timeline showing a single, non-preempted interrupt:
```text
CPU Time --->

Main Program Execution:  [================]         [========================>
                                          |
Interrupt Signal: ________________________|_________
                                          <--L-->
ISR Execution:                                 [=====]
                                                 ^
                                                 |
                                         (Context Save/Restore)

L = Interrupt Latency
```

A timeline showing a high-priority interrupt preempting a low-priority one:
```text
CPU Time --->

Main Program:       [==============]
                               |
Low-Priority IRQ:   ___________|_________________________________
                               <--L1-->
Low-Priority ISR:                  [=======]     [===============]
                                           |
High-Priority IRQ:  _______________________|_________
                                           <--L2-->
High-Priority ISR:                               [=====]


L1 = Latency of Low-Priority IRQ
L2 = Latency of High-Priority IRQ (preemption)
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of an interrupt as a **chef in a busy kitchen (the CPU)**.
    *   The chef is chopping vegetables (main loop).
    *   A ticket comes in for a simple appetizer (Low-Priority Interrupt). The chef notes his place with the vegetables, washes his hands (saves context), and starts the appetizer (Low-Priority ISR).
    *   Suddenly, the head waiter shouts "VIP order, table 5, now!" (High-Priority Interrupt). The chef immediately stops the appetizer, leaving it as is (preemption), quickly rinses his hands again (saves new context), and cooks the VIP meal (High-Priority ISR).
    *   He sends the VIP meal out, returns to the appetizer exactly where he left it (restores context), finishes it, and finally goes back to chopping vegetables (restores original context).
    *   **Latency** is the time spent washing hands and reading the new ticket. **ISRs** must be fast, like assembling an appetizer, not cooking a 12-hour brisket.

2.  **Must-Overlearn Facts:**
    *   **Interrupt Latency:** The time delay between an interrupt signal's assertion and the execution of the first instruction of the ISR.
    *   **ISR Design Rule:** An ISR must be short, deterministic, and non-blocking. It should defer lengthy processing to the main loop.
    *   **Priority & Preemption:** Higher-priority interrupts can and will interrupt the execution of lower-priority ISRs.

3.  **Spaced Repetition Schedule:** Review these concepts at: **1 day, 3 days, 7 days, 16 days, 35 days.** Actively recall the chef analogy and redraw the preemption diagram from memory each time.

4.  **First Principles Pathway:** If you forget the components of latency, reason from the ground up. What *must* the hardware do?
    *   An interrupt can arrive mid-instruction. The CPU must finish the current instruction to maintain a sane state. (Cost 1)
    *   The CPU is about to jump to a new code location (the ISR). It must know how to get back. So, it must save the Program Counter. (Cost 2)
    *   The ISR will use registers. The main program's register values must be preserved. So, it must save the key registers. (Cost 3)
    *   How does it know *where* to jump? It must look up the ISR's address in the vector table. (Cost 4)
    *   Each of these logical steps takes physical clock cycles. Summing them gives you the latency.

## Common mistakes
1.  **Placing `delay()` or long loops in an ISR.** This is the cardinal sin. It starves the main loop and all lower-priority interrupts of CPU time, destroying the real-time nature of the system.
2.  **Forgetting to clear the interrupt flag.** Many peripherals require you to manually clear the flag that triggered the interrupt. If you don't, the ISR will finish, and the flag will still be active, causing the interrupt to trigger again immediately, locking the CPU in an infinite ISR loop.
3.  **Accessing shared data without protection.** If an ISR modifies a variable (e.g., `int counter;`) that the main loop also reads or modifies, you can get corrupt data. The ISR could occur halfway through the main loop's update of the variable. The fix is to declare the shared variable `volatile` and use atomic access methods or disable interrupts briefly during critical sections in the main loop.
4.  **Misconfiguring Priority.** Assigning a high priority to a slow, non-critical task (like updating a display) can prevent genuinely urgent tasks (like a motor fault sensor) from being serviced in time.

## Self-check
1.  Define "jitter" in the context of interrupt timing. How does the execution time of other, unrelated ISRs contribute to the jitter of a specific periodic interrupt?
2.  You are designing a data acquisition system. An ADC samples at 100 kHz, triggering an interrupt for each sample. The ISR must copy the 16-bit sample to a circular buffer. A separate, lower-priority interrupt handles USB communication to send buffers of data to a host PC. If the ADC ISR takes 500 ns to execute, what is the maximum tolerable latency for this interrupt before you start losing samples? Express your answer in nanoseconds and CPU cycles, assuming a 120 MHz clock.
3.  Consider an ISR that reads a byte from a sensor. The main loop also reads from this same sensor. Why is it insufficient to simply declare the shared data buffer as `volatile`? What specific sequence of events could lead to data corruption, and what is the term for this type of problem?