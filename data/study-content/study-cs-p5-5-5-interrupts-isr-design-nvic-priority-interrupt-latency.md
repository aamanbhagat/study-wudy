## 1. What it is — in plain English

Imagine you're diligently working on a complex math problem (that's your computer's main program running). Suddenly, your doorbell rings! You can't just ignore it, or keep checking the door every five seconds, because that would be inefficient and you might miss a visitor. Instead, the doorbell is a signal that *interrupts* your math work.

When the doorbell rings, you *pause* your math problem exactly where you are, maybe by putting your pencil down and remembering which step you were on. You then go and open the door, handle the visitor (this is like a special, quick task called an "Interrupt Service Routine" or ISR), and once that's done, you return to your math problem, picking up precisely where you left off.

In computing, an "interrupt" is a signal from hardware (like a sensor, a timer, or a keyboard) or software that tells the CPU to immediately stop what it's doing, save its current state, and jump to a special piece of code designed to handle that specific event. After handling the event, the CPU restores its saved state and resumes its original task as if nothing happened, except for the brief pause. It's how computers react to urgent events without constantly checking for them.

## 2. Why it matters — real-world applications

Interrupts are fundamental to almost every modern computing system, especially in embedded and real-time contexts where timely responses to external events are critical.

1.  **Aerospace & Flight Control Systems (e.g., SpaceX Starship):** In a spacecraft, numerous sensors (accelerometers, gyroscopes, pressure sensors) provide continuous data. Instead of the flight computer constantly polling each sensor, a "data ready" signal from a sensor generates an interrupt. This ensures that critical sensor data is processed immediately for navigation, attitude control, and engine thrust adjustments. Missing a data point or introducing too much latency could lead to catastrophic failure.
2.  **Autonomous Vehicles & Robotics (e.g., Waymo, Boston Dynamics Spot):** Lidar, radar, and camera systems generate vast amounts of data. When an obstacle is detected or a critical path deviation occurs, these events trigger interrupts. High-priority interrupts might trigger emergency braking or evasive maneuvers, while lower-priority interrupts might update navigation maps. Machine learning models running on edge processors rely on these real-time data streams, often initiated by interrupts, to make instantaneous decisions.
3.  **Medical Devices (e.g., Pacemakers, Insulin Pumps):** These life-critical devices depend on precise timing and immediate responses. A pacemaker uses a timer interrupt to generate electrical pulses at a regular interval to regulate heart rhythm. If a sensor detects an abnormal heart rate, a higher-priority interrupt might trigger an immediate adjustment to pacing. Interrupt latency and reliable ISR design are paramount here, as errors could be fatal.
4.  **High-Energy Physics Data Acquisition (e.g., CERN Large Hadron Collider):** Particle accelerators generate petabytes of data from collisions. Trigger systems are designed to identify "interesting" collision events (e.g., those indicating new particle formations) and generate interrupts. These interrupts signal data acquisition systems to save the relevant data slices for further analysis, filtering out the vast majority of uninteresting background noise. This allows physicists to capture rare phenomena that would otherwise be lost.
5.  **Industrial Automation & Control Systems (e.g., Siemens PLCs):** In factories, machines operate under strict timing constraints. Emergency stop buttons, conveyor belt sensors, and motor feedback systems all generate interrupts. For instance, an emergency stop button triggers a high-priority interrupt to immediately halt all machinery, preventing accidents. Timers generate interrupts for precise motor control and synchronized operations across multiple robotic arms.

## 3. Prerequisites — what you must know first

Before diving deep into interrupts, ensure you have a solid grasp of these foundational concepts:

*   **CPU Architecture Basics:** Understanding registers (Program Counter, Stack Pointer, General Purpose Registers), the fetch-decode-execute cycle, and memory organization.
*   **Assembly Language (Basic):** Familiarity with how instructions are executed sequentially, how jumps/branches work, and basic register manipulation.
*   **Memory Management (Basic):** Concepts of RAM, ROM, memory addresses, and the distinction between the stack and the heap.
*   **Operating Systems (Basic):** A high-level understanding of processes, threads, and the idea of context switching (even if simplified).
*   **Digital Logic (Basic):** Knowledge of gates, flip-flops, and how hardware signals (high/low voltages) represent information and trigger events.
*   **C Programming:** Proficiency with functions, pointers, global variables, and the `volatile` keyword (crucial for shared data with ISRs).
*   **Microcontroller Basics:** An understanding of General Purpose Input/Output (GPIO) pins, timers, and how these peripherals can generate events or signals.

## 4. The core idea — step by step

Let's break down the concept of interrupts step by step, building intuition from basic necessity to complex management.

### Step 1: The Need for Interrupts — Polling vs. Event-Driven

**Plain English:** Imagine you're waiting for a friend to call. You could either pick up your phone every 10 seconds to check if they're on the line (polling), or you could just wait for the phone to ring (event-driven). Polling wastes your time if the call doesn't come for a while, but you might miss it if you don't check often enough. Waiting for the ring is much more efficient.

**Small Concrete Example:**
Consider a microcontroller controlling an LED that should toggle when a button is pressed.

*   **Polling Approach:**
    ```c
    while (true) {
        if (read_button_state() == PRESSED) {
            toggle_led();
            // Add a small delay/debounce to prevent multiple toggles
        }
        // Do other work here
    }
    ```
    This loop constantly checks the button. If `read_button_state()` takes 100 CPU cycles and `toggle_led()` takes 50 cycles, and the button is rarely pressed, the CPU spends most of its time uselessly checking the button. If `read_button_state()` is not called frequently enough, a quick button press might be missed.

*   **Interrupt Approach:**
    The button press directly signals the CPU. The CPU continues its main work until the signal arrives.

**Formal/Mathematical Version:**
*   **Polling:** The CPU executes a loop, repeatedly checking the status of a peripheral register or I/O pin.
    $$
    \text{while (true)} \{ \\
    \quad \text{if (peripheral\_status\_register \& EVENT\_FLAG)} \{ \\
    \quad \quad \text{handle\_event();} \\
    \quad \quad \text{clear\_event\_flag();} \\
    \quad \} \\
    \quad \text{do\_other\_work();} \\
    \}
    $$
    The CPU utilization for polling is $U_{poll} = \frac{T_{check}}{T_{loop}}$, where $T_{check}$ is the time to check the status and $T_{loop}$ is the total loop time. This is inefficient if the event is rare.

*   **Interrupts:** The peripheral hardware asserts an Interrupt Request (IRQ) signal line to the CPU. The CPU's main execution is suspended only when an event occurs.

**What could go wrong:** With polling, you might waste CPU cycles by checking too often, or miss fast events by checking too slowly.

### Step 2: How an Interrupt Works (Hardware Level)

**Plain English:** When the "doorbell rings" (an external event occurs), the hardware generates an electrical signal that goes directly to the CPU. The CPU has a special input pin (or set of pins) for these signals. If the CPU is configured to listen for that signal (i.e., interrupts are "enabled"), it will acknowledge the signal and prepare to handle it.

**Small Concrete Example:**
A timer peripheral counts down from a set value. When it reaches zero, it asserts a specific electrical line (e.g., `TIM2_IRQ`) connected to the CPU's interrupt controller.

**Formal/Mathematical Version:**
1.  **Event:** A hardware peripheral (e.g., Timer, GPIO, UART) reaches a predefined state (e.g., counter overflow, button press, data received).
2.  **Interrupt Request (IRQ):** The peripheral asserts a specific signal line, typically connected to an **Interrupt Controller** (e.g., the Nested Vectored Interrupt Controller or NVIC in ARM Cortex-M processors).
3.  **Interrupt Pending Register:** The interrupt controller records this request by setting a bit in a "pending" register.
4.  **Interrupt Enable Register:** The CPU or interrupt controller checks if this specific interrupt source is "enabled" (i.e., allowed to interrupt). If not, the request remains pending but won't trigger CPU action.
5.  **Global Interrupt Enable:** The CPU also has a master "interrupt enable" flag (e.g., the `I` bit in the ARM Program Status Register, `PRIMASK` register). If this is disabled, *no* interrupts will be processed, regardless of individual peripheral enables.

**What could go wrong:** If the interrupt source is not enabled, or if global interrupts are disabled, the event will occur, but the CPU will never react to it (or react much later if it's edge-triggered and the flag is cleared before enabling).

### Step 3: Interrupt Vector Table (IVT)

**Plain English:** Once the CPU acknowledges an interrupt, it needs to know *what* to do. It's like having a directory that says "If the doorbell rings, go to room 1; if the oven alarm rings, go to room 2." The Interrupt Vector Table is this directory. It's a special table in memory, usually at a fixed, known address, that contains the starting memory addresses of all the specific functions (ISRs) for each possible interrupt.

**Small Concrete Example:**
If interrupt number 16 (e.g., `TIM2_IRQ`) occurs, the CPU looks up entry 16 in the IVT. This entry contains the memory address `0x08001234`. The CPU then jumps to `0x08001234` to start executing the `TIM2_IRQHandler` function.

**Formal/Mathematical Version:**
The IVT is an array of function pointers (or simply memory addresses). For ARM Cortex-M processors, the IVT is typically located at address `0x00000000` or `0x08000000` (for flash memory) and contains the initial stack pointer value at index 0, followed by the reset handler address at index 1, and then the addresses of the various ISRs.
$$
\text{IVT}[\text{Interrupt Number}] = \text{Address of corresponding ISR}
$$
When an interrupt $I_n$ occurs, the CPU performs an indexed lookup to find the handler:
$$
\text{Jump to } \text{IVT}[n]
$$

**What could go wrong:** If the IVT is corrupted, or if the wrong address is placed in an IVT entry, the CPU will jump to an incorrect memory location, leading to a crash or undefined behavior.

### Step 4: Interrupt Service Routine (ISR) Design

**Plain English:** The ISR is the special function that gets executed when a specific interrupt occurs. It's the "handle the visitor" part of our doorbell analogy. ISRs must be designed to be extremely fast and efficient. They should do the minimum necessary work to acknowledge the interrupt and handle the immediate event, then return. Long or complex operations should be deferred to the main program loop.

**Small Concrete Example:**
For a button press interrupt, the ISR might:
1.  Clear the interrupt flag (telling the hardware "I've handled this").
2.  Increment a `volatile` counter variable.
3.  Set a `volatile` boolean flag `button_pressed_flag = true;`.
4.  Return.
The main loop can then check `button_pressed_flag` and perform more complex actions (like sending data over a network) without delaying the interrupt system.

```c
volatile uint32_t button_press_count = 0;
volatile bool button_pressed_flag = false;

void EXTI0_IRQHandler(void) { // Example for External Interrupt Line 0
    if (EXTI_GetITStatus(EXTI_Line0) != RESET) { // Check if interrupt is from EXTI_Line0
        button_press_count++;
        button_pressed_flag = true;
        EXTI_ClearITPendingBit(EXTI_Line0); // Clear the pending interrupt bit
    }
}

int main(void) {
    // ... initialization ...
    enable_interrupts();
    while (true) {
        if (button_pressed_flag) {
            // Perform non-time-critical actions based on button press
            printf("Button pressed %lu times!\n", button_press_count);
            button_pressed_flag = false; // Clear flag after handling
        }
        // ... other main loop tasks ...
    }
}
```

**Formal/Mathematical Version:**
An ISR is a function with specific attributes (often compiler-specific, like `__attribute__((interrupt))` for GCC) that prevents the compiler from optimizing it in ways that would break interrupt context.
Key design principles for ISRs:
1.  **Atomicity:** Operations on shared data (between ISR and main code) must be atomic or protected.
2.  **Speed:** Minimize execution time. Avoid blocking calls (e.g., delays, complex I/O).
3.  **Non-reentrancy:** Avoid calling functions that are not reentrant (i.e., cannot be safely called again if already executing).
4.  **No Floating Point (often):** Some architectures require manual saving of FPU context, or it's simply too slow.
5.  **Clear Interrupt Flag:** The hardware interrupt pending flag *must* be cleared within the ISR to prevent immediate re-entry (unless hardware auto-clears).

**What could go wrong:**
*   **Long ISRs:** If an ISR takes too long, it can delay higher-priority interrupts, cause missed deadlines, or make the system unresponsive.
*   **Shared Data Issues:** Accessing global variables from both the ISR and the main loop without proper protection (e.g., `volatile` keyword, disabling interrupts temporarily) can lead to race conditions and incorrect data.
*   **Re-entrancy:** Calling standard library functions (like `malloc`, `printf` without reentrant versions) from an ISR can lead to crashes if those functions are already in use by the main program.

### Step 5: Context Saving and Restoring

**Plain English:** When an interrupt occurs, the CPU must stop its current task. To be able to resume that task exactly where it left off, it needs to remember everything about its current state: what instruction it was executing, the values in all its internal temporary storage areas (registers), and its status flags. This information is called the "context." The CPU saves this context onto a special area of memory called the "stack" before jumping to the ISR. Once the ISR finishes, the CPU restores the context from the stack, effectively rewinding its state, and continues the interrupted task seamlessly.

**Small Concrete Example:**
When an interrupt hits, the CPU (e.g., ARM Cortex-M) automatically pushes the `Program Counter (PC)`, `Link Register (LR)`, `Program Status Register (PSR)`, and some general-purpose registers (`R0-R3`, `R12`) onto the stack. The ISR then executes. When the ISR executes a `return from interrupt` instruction, the CPU pops these saved values back into their respective registers, and the `PC` value causes execution to resume at the instruction that was interrupted.

**Formal/Mathematical Version:**
Upon interrupt entry, the CPU hardware typically performs the following sequence:
1.  **Push Context to Stack:**
    $$
    \text{Stack} \leftarrow \text{Current Program Counter (PC)} \\
    \text{Stack} \leftarrow \text{Current Program Status Register (PSR)} \\
    \text{Stack} \leftarrow \text{Other CPU Registers (e.g., R0-R3, R12, LR)}
    $$
    The exact set of registers pushed is architecture-dependent. For ARM Cortex-M, this is hardware-managed.
2.  **Load ISR Address:** `PC` is loaded with the address from the IVT.
3.  **Execute ISR:** The ISR code runs.
4.  **Pop Context from Stack (upon `RETI` or `BX LR` with special LR value):**
    $$
    \text{PC} \leftarrow \text{Stack} \\
    \text{PSR} \leftarrow \text{Stack} \\
    \text{Other CPU Registers} \leftarrow \text{Stack}
    $$
    Execution then resumes from the original `PC`.

**What could go wrong:**
*   **Stack Overflow:** If too many nested interrupts occur, or if an ISR uses a lot of local stack memory, the stack could overflow, overwriting other memory and leading to a crash.
*   **Incomplete Context Save:** If the CPU or software doesn't save all necessary registers, the original program might resume with corrupted data in those registers.

### Step 6: Nested Vectored Interrupt Controller (NVIC) & Priority

**Plain English:** What happens if two doorbells ring at the same time? Or if the fire alarm goes off while you're answering the regular doorbell? Some events are more urgent than others. The Nested Vectored Interrupt Controller (NVIC) is a specialized hardware component (part of the CPU or closely integrated) that manages multiple interrupt sources. It assigns a priority level to each interrupt. A high-priority interrupt can *preempt* (interrupt) a lower-priority one, ensuring that critical events are always handled first.

**Small Concrete Example:**
An embedded system has two interrupts:
*   **Emergency Stop Button:** Priority 0 (highest)
*   **Timer for LED Blink:** Priority 5 (lower)

If the LED blink ISR is running, and the Emergency Stop button is pressed, the NVIC will immediately pause the LED blink ISR, save its context, and jump to the Emergency Stop ISR. Once the Emergency Stop ISR finishes, it returns, and the LED blink ISR resumes. If the Emergency Stop button is pressed while *another* Priority 0 interrupt is running, it won't preempt, as they have the same priority (though some architectures allow tail-chaining or specific handling for same-priority interrupts).

**Formal/Mathematical Version:**
The NVIC provides:
1.  **Priority Levels:** Each interrupt source is assigned a numerical priority. Lower numbers typically indicate higher priority (e.g., 0 is highest).
2.  **Preemption:** A higher-priority interrupt can interrupt a currently executing lower-priority ISR.
3.  **Nesting:** Multiple levels of preemption are supported.
4.  **Vectoring:** Directly provides the ISR address, avoiding software polling of interrupt flags.

The ARM Cortex-M NVIC allows for configurable priority bits, dividing them into "preempt priority" and "subpriority."
$$
\text{Priority} = \text{Preempt Priority} + \text{Subpriority}
$$
A higher preempt priority value means a lower actual priority (can be preempted more easily). Only interrupts with a higher *preempt* priority can interrupt a currently executing ISR. Interrupts with the same preempt priority but different subpriorities will not preempt each other, but the subpriority might be used for tie-breaking if multiple pending interrupts have the same preempt priority.

**What could go wrong:**
*   **Priority Inversion:** A low-priority task holds a resource that a high-priority task needs. If the low-priority task is preempted by a medium-priority task, the high-priority task ends up waiting for both the low-priority and medium-priority tasks, effectively losing its priority. This is a common problem in RTOS and can be mitigated with priority inheritance or ceilings.
*   **Incorrect Priority Assignment:** Assigning too high a priority to a non-critical interrupt can starve critical tasks. Assigning too low a priority to a critical interrupt can lead to missed deadlines.

### Step 7: Interrupt Latency

**Plain English:** Interrupt latency is the time delay between an event occurring (e.g., a button being pressed, a sensor generating data) and the first instruction of the corresponding Interrupt Service Routine (ISR) actually starting to execute. It's the "how long until I actually start dealing with the visitor after the doorbell rings" time. Minimizing latency is crucial in real-time systems where timely responses are critical.

**Small Concrete Example:**
If a motor must be stopped within 10 milliseconds of an overcurrent condition being detected, the total interrupt latency (from overcurrent detection to the first line of the motor-stop ISR) must be significantly less than 10ms to allow time for the actual stopping procedure.

**Formal/Mathematical Version:**
Interrupt latency is composed of several factors:
$$
\text{Latency} = \text{Hardware Event Detection Time} \\
\quad + \text{Interrupt Controller Processing Time} \\
\quad + \text{Current Instruction Completion Time} \\
\quad + \text{Context Saving Time (Hardware/Software)} \\
\quad + \text{Interrupt Vector Table Lookup Time} \\
\quad + \text{ISR Entry Overhead (e.g., stack alignment, cache invalidation)}
$$
The "Current Instruction Completion Time" is often the largest variable component, as the CPU must finish its current instruction before responding to the interrupt. This is why long, multi-cycle instructions (e.g., some memory operations) can increase worst-case latency. On ARM Cortex-M, this is typically very short as most instructions are single-cycle.

**What could go wrong:**
*   **Missed Deadlines:** If latency is too high, the system might fail to respond to critical events within their required timeframes.
*   **Data Loss:** In data acquisition systems, high latency can cause data buffers to overflow before the ISR can process them.
*   **Jitter:** Variability in latency (the difference between best-case and worst-case latency) can make real-time systems unpredictable, even if the average latency is acceptable. This is often caused by variable instruction execution times or by interrupts being temporarily disabled.

## 5. Worked examples — multiple, with every step shown

### Example 1: Basic GPIO Interrupt (Button Press)

**Problem:** Configure an ARM Cortex-M microcontroller (e.g., STM32F4) to toggle an onboard LED (connected to GPIO pin PA5) when an external button (connected to GPIO pin PC13) is pressed. Use an external interrupt for the button.

**Given:**
*   LED on PA5.
*   Button on PC13, configured as input with pull-up resistor.
*   Button press generates a falling edge.
*   Microcontroller: STM32F4xx.

**What we want:**
*   LED toggles state on each button press.
*   The system should be responsive to the button without polling.

**Steps:**

1.  **Enable Clock for GPIO Ports:**
    *   **Plain English:** Before we can use any GPIO pin, we need to "power up" its corresponding port. This is done by enabling its clock in the Reset and Clock Control (RCC) peripheral.
    *   **Logical Step:** `RCC_AHB1PeriphClockCmd(RCC_AHB1Periph_GPIOA | RCC_AHB1Periph_GPIOC, ENABLE);`
    *   **Why it works:** Microcontrollers use clock gating to save power. Peripherals only receive a clock signal when needed.

2.  **Configure LED GPIO Pin (PA5):**
    *   **Plain English:** Set up PA5 as an output pin so we can control the LED.
    *   **Logical Step:**
        ```c
        GPIO_InitTypeDef GPIO_InitStruct;
        GPIO_InitStruct.GPIO_Pin = GPIO_Pin_5;
        GPIO_InitStruct.GPIO_Mode = GPIO_Mode_OUT;
        GPIO_InitStruct.GPIO_OType = GPIO_OType_PP; // Push-pull output
        GPIO_InitStruct.GPIO_PuPd = GPIO_PuPd_NOPULL; // No pull-up/pull-down
        GPIO_InitStruct.GPIO_Speed = GPIO_Speed_50MHz;
        GPIO_Init(GPIOA, &GPIO_InitStruct);
        ```
    *   **Why it works:** This structure configures the pin's electrical characteristics (output, push-pull, speed) according to the hardware requirements of the LED.

3.  **Configure Button GPIO Pin (PC13) as External Interrupt Source:**
    *   **Plain English:** Set up PC13 as an input pin and tell the External Interrupt/Event Controller (EXTI) that this pin should generate an interrupt on a falling edge. Also, enable the clock for the SYSCFG peripheral, which maps GPIO pins to EXTI lines.
    *   **Logical Step:**
        ```c
        // Enable clock for SYSCFG
        RCC_APB2PeriphClockCmd(RCC_APB2Periph_SYSCFG, ENABLE);

        // Configure PC13 as input with pull-up
        GPIO_InitStruct.GPIO_Pin = GPIO_Pin_13;
        GPIO_InitStruct.GPIO_Mode = GPIO_Mode_IN;
        GPIO_InitStruct.GPIO_PuPd = GPIO_PuPd_UP; // Pull-up for button
        GPIO_Init(GPIOC, &GPIO_InitStruct);

        // Connect EXTI Line 13 to PC13
        SYSCFG_EXTILineConfig(EXTI_PortSourceGPIOC, EXTI_PinSource13);

        // Configure EXTI Line 13
        EXTI_InitTypeDef EXTI_InitStruct;
        EXTI_InitStruct.EXTI_Line = EXTI_Line13;
        EXTI_InitStruct.EXTI_Mode = EXTI_Mode_Interrupt; // Interrupt mode
        EXTI_InitStruct.EXTI_Trigger = EXTI_Trigger_Falling; // Falling edge for button press
        EXTI_InitStruct.EXTI_LineCmd = ENABLE;
        EXTI_Init(&EXTI_InitStruct);
        ```
    *   **Why it works:** The `SYSCFG_EXTILineConfig` function maps the physical pin (PC13) to a logical EXTI line (EXTI13). The `EXTI_Init` function then configures that EXTI line to generate an interrupt on a falling edge.

4.  **Configure NVIC for EXTI Line 13 Interrupt:**
    *   **Plain English:** Now that the hardware can *generate* an interrupt, we need to tell the CPU's interrupt controller (NVIC) to *listen* for it and how important it is.
    *   **Logical Step:**
        ```c
        NVIC_InitTypeDef NVIC_InitStruct;
        NVIC_InitStruct.NVIC_IRQChannel = EXTI15_10_IRQn; // Interrupt channel for EXTI lines 10-15
        NVIC_InitStruct.NVIC_IRQChannelPreemptionPriority = 0; // Highest priority
        NVIC_InitStruct.NVIC_IRQChannelSubPriority = 0;
        NVIC_InitStruct.NVIC_IRQChannelCmd = ENABLE;
        NVIC_Init(&NVIC_InitStruct);
        ```
    *   **Why it works:** `EXTI15_10_IRQn` is the specific interrupt vector for EXTI lines 10 through 15. We enable this channel and set its priority.

5.  **Write the Interrupt Service Routine (ISR):**
    *   **Plain English:** This is the function that will be executed when the button is pressed. It needs to toggle the LED and, crucially, clear the interrupt pending flag so the same button press doesn't trigger the interrupt again.
    *   **Logical Step:**
        ```c
        void EXTI15_10_IRQHandler(void) {
            // Check if the interrupt was indeed from EXTI Line 13
            if (EXTI_GetITStatus(EXTI_Line13) != RESET) {
                // Toggle the LED
                GPIO_ToggleBits(GPIOA, GPIO_Pin_5);

                // Clear the EXTI line 13 pending bit
                EXTI_ClearITPendingBit(EXTI_Line13);
            }
        }
        ```
    *   **Why it works:** `EXTI_GetITStatus` verifies the source. `GPIO_ToggleBits` changes the LED state. `EXTI_ClearITPendingBit` is essential; without it, the interrupt would immediately re-trigger after returning from the ISR, creating an infinite loop.

6.  **Main Loop:**
    *   **Plain English:** The main program can now do other things. The button handling is completely asynchronous.
    *   **Logical Step:**
        ```c
        int main(void) {
            // Call all initialization functions defined above
            // ... GPIO, EXTI, NVIC setup ...

            while (true) {
                // The main loop can be empty or do other tasks
                // The LED toggling is handled by the interrupt
            }
        }
        ```
    *   **Why it works:** The CPU spends its time in the `while(true)` loop, only interrupting when the button is pressed.

**Final Answer:**
The LED on PA5 will toggle its state each time the button on PC13 is pressed, handled entirely by the `EXTI15_10_IRQHandler` without the main loop needing to poll the button.

**Reflection:** This example highlights the fundamental setup for an external interrupt: configuring the GPIO, configuring the EXTI line, configuring the NVIC, and writing a concise ISR that clears the pending flag. The main trick is remembering to clear the interrupt pending bit.

### Example 2: Timer Interrupt for Periodic Task

**Problem:** Configure an ARM Cortex-M microcontroller (e.g., STM32F4) to blink an onboard LED (PA5) every 500 milliseconds using a timer interrupt.

**Given:**
*   LED on PA5.
*   System clock frequency: 168 MHz (common for STM32F4).
*   Timer peripheral: TIM2 (a 32-bit timer).

**What we want:**
*   LED blinks with a period of 500ms (250ms ON, 250ms OFF).

**Steps:**

1.  **Enable Clock for GPIOA and TIM2:**
    *   **Plain English:** Power up the GPIOA port for the LED and the TIM2 peripheral.
    *   **Logical Step:**
        ```c
        RCC_AHB1PeriphClockCmd(RCC_AHB1Periph_GPIOA, ENABLE);
        RCC_APB1PeriphClockCmd(RCC_APB1Periph_TIM2, ENABLE); // TIM2 is on APB1 bus
        ```
    *   **Why it works:** Provides necessary clock signals to the peripherals.

2.  **Configure LED GPIO Pin (PA5):**
    *   **Plain English:** Same as Example 1, set PA5 as an output.
    *   **Logical Step:**
        ```c
        GPIO_InitTypeDef GPIO_InitStruct;
        GPIO_InitStruct.GPIO_Pin = GPIO_Pin_5;
        GPIO_InitStruct.GPIO_Mode = GPIO_Mode_OUT;
        GPIO_InitStruct.GPIO_OType = GPIO_OType_PP;
        GPIO_InitStruct.GPIO_PuPd = GPIO_PuPd_NOPULL;
        GPIO_InitStruct.GPIO_Speed = GPIO_Speed_50MHz;
        GPIO_Init(GPIOA, &GPIO_InitStruct);
        ```
    *   **Why it works:** Prepares the pin to drive the LED.

3.  **Configure TIM2 for 500ms Interval:**
    *   **Plain English:** We need to set up TIM2 to generate an interrupt every 500ms. This involves choosing a prescaler and an auto-reload value. The timer counts up to the auto-reload value, then resets and generates an update interrupt.
    *   **Calculations:**
        *   APB1 bus clock for TIM2 is 84 MHz (if system clock is 168 MHz and APB1 prescaler is 2).
        *   Timer frequency (`f_timer`) = `f_APB1 / (Prescaler + 1)`.
        *   Desired period (`T_desired`) = 500 ms = 0.5 s.
        *   Desired frequency (`f_desired`) = 1 / `T_desired` = 2 Hz.
        *   Timer counts from 0 to `(AutoReloadValue)`. So, `(AutoReloadValue + 1)` counts occur per period.
        *   `T_desired = (AutoReloadValue + 1) * (Prescaler + 1) / f_APB1`.
        *   Let's choose a `Prescaler` to get a reasonable count. If `Prescaler = 8399`, then `f_timer = 84 MHz / (8399 + 1) = 84 MHz / 8400 = 10 kHz`.
        *   Now, `AutoReloadValue = (f_timer * T_desired) - 1`.
        *   `AutoReloadValue = (10000 Hz * 0.5 s) - 1 = 5000 - 1 = 4999`.
    *   **Logical Step:**
        ```c
        TIM_TimeBaseInitTypeDef TIM_TimeBaseStruct;
        TIM_TimeBaseStruct.TIM_Prescaler = 8399; // Prescaler value
        TIM_TimeBaseStruct.TIM_Period = 4999;    // Auto-reload value
        TIM_TimeBaseStruct.TIM_ClockDivision = TIM_CKD_DIV1;
        TIM_TimeBaseStruct.TIM_CounterMode = TIM_CounterMode_Up;
        TIM_TimeBaseInit(TIM2, &TIM_TimeBaseStruct);

        TIM_ITConfig(TIM2, TIM_IT_Update, ENABLE); // Enable update interrupt
        TIM_Cmd(TIM2, ENABLE); // Start the timer
        ```
    *   **Why it works:** The timer counts up. When it reaches `TIM_Period` (4999), it generates an update event, resets to 0, and starts counting again. This occurs every 500ms.

4.  **Configure NVIC for TIM2 Interrupt:**
    *   **Plain English:** Tell the NVIC to listen for the TIM2 global interrupt and set its priority.
    *   **Logical Step:**
        ```c
        NVIC_InitTypeDef NVIC_InitStruct;
        NVIC_InitStruct.NVIC_IRQChannel = TIM2_IRQn; // TIM2 global interrupt
        NVIC_InitStruct.NVIC_IRQChannelPreemptionPriority = 0;
        NVIC_InitStruct.NVIC_IRQChannelSubPriority = 0;
        NVIC_InitStruct.NVIC_IRQChannelCmd = ENABLE;
        NVIC_Init(&NVIC_InitStruct);
        ```
    *   **Why it works:** This enables the TIM2 interrupt in the NVIC.

5.  **Write the Interrupt Service Routine (ISR):**
    *   **Plain English:** The ISR will toggle the LED and clear the timer's update interrupt flag.
    *   **Logical Step:**
        ```c
        void TIM2_IRQHandler(void) {
            // Check if the update interrupt flag is set
            if (TIM_GetITStatus(TIM2, TIM_IT_Update) != RESET) {
                // Toggle the LED
                GPIO_ToggleBits(GPIOA, GPIO_Pin_5);

                // Clear the TIM2 update interrupt flag
                TIM_ClearITPendingBit(TIM2, TIM_IT_Update);
            }
        }
        ```
    *   **Why it works:** `TIM_GetITStatus` confirms the interrupt source. `TIM_ClearITPendingBit` is crucial to prevent the interrupt from re-triggering immediately.

6.  **Main Loop:**
    *   **Plain English:** The main loop can now run other code, or simply idle.
    *   **Logical Step:**
        ```c
        int main(void) {
            // Call all initialization functions
            // ... GPIO, TIM2, NVIC setup ...

            while (true) {
                // The main loop can be empty or do other tasks
                // The LED blinking is handled by the interrupt
            }
        }
        ```
    *   **Why it works:** The timer interrupt handles the periodic task asynchronously.

**Final Answer:**
The LED on PA5 will toggle its state every 500 milliseconds, resulting in a 1Hz blink rate (250ms ON, 250ms OFF), entirely managed by the `TIM2_IRQHandler`.

**Reflection:** This example demonstrates how timers, combined with interrupts, enable precise periodic execution of tasks without CPU polling. The main challenge is correctly calculating the prescaler and auto-reload values to achieve the desired time interval.

### Example 3: Nested Interrupts & Priority

**Problem:** Design a system with two interrupts: a high-priority "Emergency Stop" (external button on PC13) and a low-priority "Data Logger" (timer TIM3, generating an interrupt every 100ms). Demonstrate that the Emergency Stop can preempt the Data Logger.

**Given:**
*   Emergency Stop button on PC13 (falling edge).
*   Data Logger uses TIM3 (generates interrupt every 100ms).
*   System clock: 168 MHz.
*   Two LEDs: PA5 for Data Logger activity, PA6 for Emergency Stop activity.

**What we want:**
*   Data Logger LED (PA5) blinks every 100ms.
*   Emergency Stop LED (PA6) lights up when pressed.
*   If the Emergency Stop button is pressed while the Data Logger ISR is running, the Data Logger ISR should be paused, the Emergency Stop ISR should execute, and then the Data Logger ISR should resume.

**Steps:**

1.  **Enable Clocks for GPIO, EXTI, SYSCFG, TIM3:**
    *   **Plain English:** Power up all necessary peripherals.
    *   **Logical Step:**
        ```c
        RCC_AHB1PeriphClockCmd(RCC_AHB1Periph_GPIOA | RCC_AHB1Periph_GPIOC, ENABLE);
        RCC_APB2PeriphClockCmd(RCC_APB2Periph_SYSCFG, ENABLE);
        RCC_APB1PeriphClockCmd(RCC_APB1Periph_TIM3, ENABLE);
        ```

2.  **Configure LED GPIO Pins (PA5, PA6):**
    *   **Plain English:** Set PA5 and PA6 as outputs.
    *   **Logical Step:**
        ```c
        GPIO_InitTypeDef GPIO_InitStruct;
        GPIO_InitStruct.GPIO_Pin = GPIO_Pin_5 | GPIO_Pin_6;
        GPIO_InitStruct.GPIO_Mode = GPIO_Mode_OUT;
        GPIO_InitStruct.GPIO_OType = GPIO_OType_PP;
        GPIO_InitStruct.GPIO_PuPd = GPIO_PuPd_NOPULL;
        GPIO_InitStruct.GPIO_Speed = GPIO_Speed_50MHz;
        GPIO_Init(GPIOA, &GPIO_InitStruct);
        ```

3.  **Configure Emergency Stop Button (PC13) as EXTI Source:**
    *   **Plain English:** Similar to Example 1, set up PC13 for falling edge interrupt.
    *   **Logical Step:**
        ```c
        GPIO_InitStruct.GPIO_Pin = GPIO_Pin_13;
        GPIO_InitStruct.GPIO_Mode = GPIO_Mode_IN;
        GPIO_InitStruct.GPIO_PuPd = GPIO_PuPd_UP;
        GPIO_Init(GPIOC, &GPIO_InitStruct);

        SYSCFG_EXTILineConfig(EXTI_PortSourceGPIOC, EXTI_PinSource13);

        EXTI_InitTypeDef EXTI_InitStruct;
        EXTI_InitStruct.EXTI_Line = EXTI_Line13;
        EXTI_InitStruct.EXTI_Mode = EXTI_Mode_Interrupt;
        EXTI_InitStruct.EXTI_Trigger = EXTI_Trigger_Falling;
        EXTI_InitStruct.EXTI_LineCmd = ENABLE;
        EXTI_Init(&EXTI_InitStruct);
        ```

4.  **Configure TIM3 for 100ms Interval:**
    *   **Plain English:** Set up TIM3 to generate an interrupt every 100ms.
    *   **Calculations:**
        *   APB1 clock for TIM3 is 84 MHz.
        *   `Prescaler = 8399` gives `f_timer = 10 kHz`.
        *   `AutoReloadValue = (f_timer * T_desired) - 1 = (10000 Hz * 0.1 s) - 1 = 1000 - 1 = 999`.
    *   **Logical Step:**
        ```c
        TIM_TimeBaseInitTypeDef TIM_TimeBaseStruct;
        TIM_TimeBaseStruct.TIM_Prescaler = 8399;
        TIM_TimeBaseStruct.TIM_Period = 999;
        TIM_TimeBaseStruct.TIM_ClockDivision = TIM_CKD_DIV1;
        TIM_TimeBaseStruct.TIM_CounterMode = TIM_CounterMode_Up;
        TIM_TimeBaseInit(TIM3, &TIM_TimeBaseStruct);

        TIM_ITConfig(TIM3, TIM_IT_Update, ENABLE);
        TIM_Cmd(TIM3, ENABLE);
        ```

5.  **Configure NVIC for Both Interrupts with Priorities:**
    *   **Plain English:** This is the critical step. We assign a higher priority (lower number) to the Emergency Stop and a lower priority (higher number) to the Data Logger.
    *   **Logical Step:**
        ```c
        NVIC_InitTypeDef NVIC_InitStruct;

        // Configure NVIC for Emergency Stop (EXTI15_10) - Highest Priority
        NVIC_InitStruct.NVIC_IRQChannel = EXTI15_10_IRQn;
        NVIC_InitStruct.NVIC_IRQChannelPreemptionPriority = 0; // Highest
        NVIC_InitStruct.NVIC_IRQChannelSubPriority = 0;
        NVIC_InitStruct.NVIC_IRQChannelCmd = ENABLE;
        NVIC_Init(&NVIC_InitStruct);

        // Configure NVIC for Data Logger (TIM3) - Lower Priority
        NVIC_InitStruct.NVIC_IRQChannel = TIM3_IRQn;
        NVIC_InitStruct.NVIC_IRQChannelPreemptionPriority = 1; // Lower than 0
        NVIC_InitStruct.NVIC_IRQChannelSubPriority = 0;
        NVIC_InitStruct.NVIC_IRQChannelCmd = ENABLE;
        NVIC_Init(&NVIC_InitStruct);
        ```
    *   **Why it works:** By setting `NVIC_IRQChannelPreemptionPriority` for `EXTI15_10_IRQn` to 0 and for `TIM3_IRQn` to 1, we ensure that `EXTI15_10_IRQn` can interrupt `TIM3_IRQn` if `TIM3_IRQn` is currently executing.

6.  **Write ISRs:**
    *   **Plain English:** The Emergency Stop ISR will light its LED. The Data Logger ISR will toggle its LED and simulate some "logging" work with a short delay to make preemption visible.
    *   **Logical Step:**
        ```c
        // Data Logger ISR (TIM3)
        void TIM3_IRQHandler(void) {
            if (TIM_GetITStatus(TIM3, TIM_IT_Update) != RESET) {
                GPIO_ToggleBits(GPIOA, GPIO_Pin_5); // Toggle Data Logger LED

                // Simulate some "long" data logging work (e.g., 50ms)
                // In a real system, this would be deferred to main loop
                for (volatile int i = 0; i < 500000; i++); // Busy-wait delay

                TIM_ClearITPendingBit(TIM3, TIM_IT_Update);
            }
        }

        // Emergency Stop ISR (EXTI15_10)
        void EXTI15_10_IRQHandler(void) {
            if (EXTI_GetITStatus(EXTI_Line13) != RESET) {
                GPIO_SetBits(GPIOA, GPIO_Pin_6); // Turn ON Emergency Stop LED

                // In a real system, this would immediately trigger a safety shutdown
                // For demonstration, just light the LED.

                EXTI_ClearITPendingBit(EXTI_Line13);
            }
        }
        ```
    *   **Why it works:** The busy-wait in `TIM3_IRQHandler` makes it long enough to be preempted. The `EXTI15_10_IRQHandler` simply turns on its LED, demonstrating immediate response.

7.  **Main Loop:**
    *   **Plain English:** The main loop can be empty.
    *   **Logical Step:**
        ```c
        int main(void) {
            // ... call all initialization functions ...
            while (true) {
                // Main loop doing other work
            }
        }
        ```

**Final Answer:**
The Data Logger LED (PA5) will blink every 100ms. If the Emergency Stop button (PC13) is pressed *during* the 50ms simulated "logging" delay within the `TIM3_IRQHandler`, the `TIM3_IRQHandler` will pause, the `EXTI15_10_IRQHandler` will execute (turning on PA6), and then the `TIM3_IRQHandler` will resume and complete its 50ms delay. This demonstrates preemption.

**Reflection:** This example clearly illustrates the power of NVIC priority. The key is understanding that a higher-priority interrupt can interrupt a lower-priority one, ensuring critical tasks are handled first, even if another interrupt is currently being serviced. The simulated delay helps visualize this behavior.

### Example 4: Latency Calculation

**Problem:** Calculate the *worst-case* interrupt latency for an external GPIO interrupt on an ARM Cortex-M4 microcontroller.

**Given:**
*   CPU Clock Frequency (`f_CPU`): 168 MHz.
*   Worst-case instruction execution time: 10 cycles (for a complex memory access instruction that might be interrupted).
*   Hardware interrupt synchronization/detection delay: 2 CPU cycles.
*   Hardware context save (push registers to stack): 12 CPU cycles.
*   Interrupt Vector Table (IVT) lookup: 1 CPU cycle.
*   ISR entry overhead (jump to ISR, stack alignment, etc.): 3 CPU cycles.
*   Interrupts are globally enabled.

**What we want:**
*   The total worst-case interrupt latency in microseconds ($\mu s$).

**Steps:**

1.  **Understand the Components of Latency:**
    *   **Plain English:** Latency is the sum of all delays from the physical event to the first instruction of the ISR.
    *   **Components:**
        *   `T_event_detect`: Time for hardware to detect the event and signal the CPU.
        *   `T_current_instruction_complete`: Time for the CPU to finish its *current* instruction. This is the "worst-case" part.
        *   `T_context_save`: Time for the CPU to save its state (registers) onto the stack.
        *   `T_ivt_lookup`: Time to find the ISR's address in the IVT.
        *   `T_isr_entry_overhead`: Any final setup before the ISR code starts.

2.  **Calculate Time per CPU Cycle:**
    *   **Plain English:** Convert the CPU frequency into the duration of a single clock cycle.
    *   **Logical Step:**
        $$
        T_{cycle} = \frac{1}{f_{CPU}}
        $$
        $$
        T_{cycle} = \frac{1}{168 \times 10^6 \text{ Hz}} \approx 5.952 \times 10^{-9} \text{ s} = 5.952 \text{ ns}
        $$
    *   **Why it works:** Frequency is cycles per second; its reciprocal is seconds per cycle.

3.  **Calculate Time for Each Latency Component (in ns):**
    *   **Plain English:** Multiply the number of cycles for each component by the time per cycle.
    *   **Logical Step:**
        *   `T_event_detect = 2 \text{ cycles} \times 5.952 \text{ ns/cycle} = 11.904 \text{ ns}`
        *   `T_current_instruction_complete = 10 \text{ cycles} \times 5.952 \text{ ns/cycle} = 59.52 \text{ ns}`
        *   `T_context_save = 12 \text{ cycles} \times 5.952 \text{ ns/cycle} = 71.424 \text{ ns}`
        *   `T_ivt_lookup = 1 \text{ cycle} \times 5.952 \text{ ns/cycle} = 5.952 \text{ ns}`
        *   `T_isr_entry_overhead = 3 \text{ cycles} \times 5.952 \text{ ns/cycle} = 17.856 \text{ ns}`
    *   **Why it works:** This converts the cycle counts into actual time durations.

4.  **Sum All Components for Total Worst-Case Latency:**
    *   **Plain English:** Add up all the individual time delays.
    *   **Logical Step:**
        $$
        \text{Total Latency} = T_{event\_detect} + T_{current\_instruction\_complete} + T_{context\_save} + T_{ivt\_lookup} + T_{isr\_entry\_overhead}
        $$
        $$
        \text{Total Latency} = 11.904 \text{ ns} + 59.52 \text{ ns} + 71.424 \text{ ns} + 5.952 \text{ ns} + 17.856 \text{ ns}
        $$
        $$
        \text{Total Latency} = 166.656 \text{ ns}
        $$
    *   **Convert to microseconds:**
        $$
        166.656 \text{ ns} = 0.166656 \text{ } \mu \text{s}
        $$

**Final Answer:**
The worst-case interrupt latency for this system is approximately $\boxed{0.167 \text{ } \mu \text{s}}$.

**Reflection:** This example demonstrates that interrupt latency is a sum of many small, sequential delays. The "worst-case" aspect primarily comes from the time it takes for the CPU to complete its currently executing instruction before it can acknowledge the interrupt. In high-speed real-time systems, every nanosecond counts, and understanding these components is crucial for meeting strict deadlines. Modern microcontrollers often have very low, deterministic latencies due to specialized hardware interrupt controllers.

## 6. Common mistakes and traps

1.  **Long and Complex ISRs:** Students often put too much logic, blocking calls (like `delay()`), or complex computations directly inside an ISR.
    *   **Why it happens:** It feels natural to put all event-handling logic in the function that responds to the event.
    *   **Consequence:** This increases interrupt latency for other, potentially higher-priority interrupts, causes jitter, and can lead to missed deadlines or system unresponsiveness. ISRs should be minimal, deferring heavy lifting to the main loop or a real-time operating system (RTOS) task.

2.  **Shared Data Without Protection (Race Conditions):** Accessing global variables from both an ISR and the main loop (or another ISR) without proper synchronization.
    *   **Why it happens:** Forgetting that an ISR can execute *at any time*, potentially interrupting a multi-instruction read/modify/write operation on a shared variable in the main loop.
    *   **Consequence:** Data corruption, incorrect program behavior. The `volatile` keyword is a start (prevents compiler optimization), but disabling interrupts temporarily or using atomic operations is often needed for multi-byte variables.

3.  **Forgetting to Clear Interrupt Flags:** Many hardware peripherals require the software (within the ISR) to explicitly clear a "pending" flag after handling the interrupt.
    *   **Why it happens:** Overlooking this crucial step in the peripheral's datasheet or API documentation.
    *   **Consequence:** The interrupt immediately re-triggers upon exiting the ISR, leading to an infinite loop of the ISR executing, effectively locking up the CPU or causing a stack overflow.

4.  **Incorrect NVIC Priority Assignment:** Assigning priorities inappropriately (e.g., a non-critical interrupt having higher priority than a critical one, or two critical interrupts having the same priority when one needs to preempt the other).
    *   **Why it happens:** Not fully understanding the impact of priority levels or the specific priority scheme (preempt vs. subpriority) of the NVIC.
    *   **Consequence:** Priority inversion, missed deadlines for critical tasks, or unpredictable system behavior in complex multi-interrupt scenarios.

5.  **Re-entrancy Issues:** Calling non-reentrant functions (e.g., standard library functions like `printf`, `malloc`, or custom functions that use global state without protection) from an ISR.
    *   **Why it happens:** Assuming all functions are safe to call from anywhere, or not knowing which functions are reentrant.
    *   **Consequence:** Corrupted data structures, memory leaks, or crashes if the function is interrupted while modifying shared internal state.

6.  **Stack Overflow:** ISRs using too much local stack memory, or excessive interrupt nesting, leading to the stack pointer going beyond its allocated region.
    *   **Why it happens:** Deep function calls within an ISR, large local arrays, or simply too many interrupts nesting before the stack can unwind.
    *   **Consequence:** Overwriting other memory regions (e.g., global variables or heap), leading to unpredictable crashes. This can be hard to debug as the crash might occur long after the overflow.

## 7. Textbook-precise explanation

An **Interrupt** is an asynchronous event that diverts the processor from its current execution flow to handle a specific, time-critical event. This mechanism enables event-driven programming, allowing the CPU to perform useful work while awaiting external stimuli, rather than continuously polling peripheral status registers.

Upon an interrupt request (IRQ) being asserted by a peripheral, and if the corresponding interrupt source is enabled within the **Interrupt Controller** (e.g., **Nested Vectored Interrupt Controller (NVIC)** in ARM Cortex-M microcontrollers) and global interrupts are active, the CPU undergoes a hardware-managed context save. This involves pushing critical CPU state (e.g., Program Counter (PC), Program Status Register (PSR), and a subset of general-purpose registers) onto the current stack. Subsequently, the CPU determines the address of the appropriate **Interrupt Service Routine (ISR)** by performing a lookup in the **Interrupt Vector Table (IVT)**, which is typically an array of function pointers or memory addresses located at a fixed, predefined memory location. The PC is then loaded with the ISR's address, transferring control to the ISR.

An **ISR** is a special function designed to respond to a specific interrupt. Key design principles for ISRs in real-time embedded systems include:
*   **Minimality:** ISRs should execute as quickly as possible, performing only the essential tasks required to acknowledge the interrupt and prepare for further processing. Complex or lengthy operations should be deferred to lower-priority tasks or the main application loop.
*   **Atomicity and Data Integrity:** Access to shared global variables between an ISR and other parts of the program (main loop, other ISRs) must be protected to prevent race conditions. This often involves using the `volatile` keyword, temporarily disabling interrupts, or employing atomic operations.
*   **Reentrancy:** ISRs should ideally be reentrant or call only reentrant functions to avoid corrupting shared resources if the ISR is interrupted and called again (e.g., by a higher-priority interrupt).
*   **Interrupt Flag Management:** For most peripherals, the ISR is responsible for clearing the interrupt pending flag in the peripheral's status register. Failure to do so will result in the interrupt immediately re-triggering upon return, leading to system malfunction.

The **NVIC** manages multiple interrupt sources, providing mechanisms for:
*   **Priority Assignment:** Each interrupt source can be assigned a unique priority level. On ARM Cortex-M, this often involves configurable "preempt priority" and "subpriority" fields, determining which interrupts can interrupt others and how pending interrupts of the same preempt priority are resolved.
*   **Preemption:** A higher-priority interrupt can interrupt (preempt) a currently executing lower-priority ISR, ensuring that critical events are handled with minimal delay.
*   **Nesting:** Multiple levels of preemption are supported, allowing a hierarchy of interrupt responses.
*   **Vectoring:** The NVIC directly provides the address of the ISR, eliminating the need for software to determine the interrupt source.

**Interrupt Latency** is defined as the time interval from the assertion of an interrupt request by a peripheral to the execution of the first instruction of the corresponding ISR. It is a critical metric for real-time systems and comprises several sequential delays:
$$
L = T_{\text{event\_detection}} + T_{\text{current\_instruction\_completion}} + T_{\text{context\_save}} + T_{\text{IVT\_lookup}} + T_{\text{ISR\_entry\_overhead}}
$$
Where $T_{\text{current\_instruction\_completion}}$ represents the time taken for the CPU to complete its currently executing instruction before acknowledging the interrupt, which contributes significantly to worst-case latency. Deterministic and low interrupt latency is crucial for meeting real-time deadlines and ensuring system responsiveness.

*References*:
*   Barr, M. (2006). *Programming Embedded Systems in C and C++*. O'Reilly Media.
*   Yiu, J. (2013). *The Definitive Guide to ARM Cortex-M3 and Cortex-M4 Processors*. Newnes.

## 8. ASCII diagrams

### Interrupt Request (IRQ) Flow Diagram

This diagram illustrates the typical sequence of events from a hardware event triggering an interrupt to the execution of the Interrupt Service Routine and subsequent return.

```text
+---------------------+
| 1. Hardware Event   |
| (e.g., Button press,|
|  Timer overflow,    |
|  Data ready)        |
+----------+----------+
           |
           V
+----------+----------+
| 2. Interrupt Request|
|    (IRQ) Signal     |
| (Peripheral asserts |
|  IRQ line to NVIC)  |
+----------+----------+
           |
           V
+----------+----------+
| 3. NVIC Processing  |
| (Checks enable/mask,|
|  pending status,    |
|  priority)          |
+----------+----------+
           | (If enabled and highest priority)
           V
+---------------------+
| 4. CPU Acknowledges |
|    Interrupt        |
| (Finishes current   |
|  instruction)       |
+----------+----------+
           |
           V
+----------+----------+
| 5. Context Save     |
| (CPU pushes PC, PSR,|
|  registers onto Stack)|
+----------+----------+
           |
           V
+----------+----------+
| 6. IVT Lookup       |
| (CPU reads ISR addr |
|  from Interrupt     |
|  Vector Table)      |
+----------+----------+
           |
           V
+----------+----------+
| 7. Jump to ISR      |
| (PC loaded with ISR |
|  address)           |
+----------+----------+
           |
           V
+----------+----------+
| 8. Execute ISR Code |
| (Handle event,      |
|  clear flag)        |
+----------+----------+
           |
           V
+----------+----------+
| 9. Context Restore  |
| (CPU pops PC, PSR,  |
|  registers from Stack)|
+----------+----------+
           |
           V
+---------------------+
| 10. Resume Original |
|     Program         |
| (Execution continues|
|  from where it was  |
|  interrupted)       |
+---------------------+
```

### NVIC Priority Preemption

This diagram illustrates how a higher-priority interrupt can preempt a lower-priority one.

```text
Time -------->

Main Program
|
|   +------------------------------------+
|   | 1. Low-Priority ISR (Priority 1) |
|   |    (e.g., Data Logger)           |
|   |    - Context Save                |
|   |    - ISR Execution (Part 1)      |
|   |                                  |
|   |   +----------------------------+ <--- 2. High-Priority IRQ (Priority 0)
|   |   | 3. High-Priority ISR       |      (e.g., Emergency Stop)
|   |   |    (Priority 0)            |      - Preempts Low-Priority ISR
|   |   |    - Context Save (of Low-P ISR) |
|   |   |    - ISR Execution         |
|   |   |    - Context Restore (of Low-P ISR) |
|   |   +----------------------------+
|   |                                  |
|   |    - ISR Execution (Part 2)      |
|   |    -