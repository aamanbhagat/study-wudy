## 1. What it is — in plain English

Imagine you have a super precise digital stopwatch inside a tiny computer chip, like the one in your smart light bulb or your drone. This stopwatch, called a **timer**, can do more than just count seconds. It can count incredibly fast, down to fractions of a microsecond!

Now, this special stopwatch has three main "modes" or "superpowers":

1.  **PWM generation (Pulse Width Modulation):** Think of it like a dimmer switch for a light. Instead of just turning the light on or off, you can make it appear brighter or dimmer by rapidly flickering it on and off. If it's on for a longer time during each flicker cycle, it looks brighter. PWM uses the timer to create these precise "on" and "off" pulses, allowing you to control things smoothly, like the speed of a motor or the brightness of an LED.

2.  **Input Capture:** Imagine you have a race car, and you want to know the *exact* moment it crosses the finish line. Input capture is like a super-fast lap timer that automatically records the precise time when something external happens, like a button being pressed, a sensor detecting an object, or a signal changing from low to high. It "captures" the timer's current count at that instant.

3.  **Output Compare:** This is like setting an alarm clock. You tell the timer, "When you reach this specific count, do something!" That "something" could be flipping an output pin (like turning an LED on or off), or it could be triggering an internal event like an interrupt to wake up the computer chip to perform a task. It's used for generating precise delays or creating specific timed signals.

In essence, these timer functions allow tiny computer chips to interact with the real world with incredible precision, controlling actions and measuring events down to very small time scales.

## 2. Why it matters — real-world applications

Timers are the backbone of real-time control in embedded systems, enabling precise interaction between software and the physical world. Their applications are ubiquitous:

1.  **Motor Speed Control (PWM):**
    *   **Application:** Electric vehicles (e.g., Tesla's motor controllers), industrial robots (e.g., KUKA, Fanuc), hobby drones (e.g., DJI).
    *   **Detail:** PWM is used to vary the effective voltage supplied to DC motors, thereby controlling their speed and torque. For brushless DC motors, complex three-phase PWM schemes are used to generate rotating magnetic fields. In aerospace, this is crucial for precision actuator control in fly-by-wire systems or thrust vectoring in rockets, where even slight deviations can have catastrophic consequences.

2.  **Distance Sensing and Measurement (Input Capture):**
    *   **Application:** Ultrasonic parking sensors in cars (e.g., Bosch, Continental), industrial proximity sensors, robotic navigation.
    *   **Detail:** An ultrasonic sensor emits a sound pulse and then listens for its echo. The microcontroller uses Input Capture to precisely measure the time duration between sending the pulse and receiving the echo. Knowing the speed of sound, it can then calculate the distance to an object. This principle extends to LiDAR and radar systems, where time-of-flight measurements are fundamental.

3.  **Precision Timing and Event Scheduling (Output Compare):**
    *   **Application:** Real-time operating systems (RTOS) task scheduling, digital audio synthesis, communication protocols.
    *   **Detail:** RTOS kernels use timer Output Compare events to trigger context switches at regular intervals (e.g., every 1 millisecond), giving the illusion of multiple tasks running simultaneously. In digital audio, precisely timed Output Compare events can toggle an output pin to generate specific waveforms, creating sounds or music. This is also critical for generating precise baud rates for serial communication (UART) or clock signals for SPI/I2C.

4.  **Power Conversion (PWM):**
    *   **Application:** Switch-Mode Power Supplies (SMPS) found in nearly all electronic devices (phone chargers, computer power supplies), LED lighting drivers (e.g., Philips Hue), solar inverters.
    *   **Detail:** PWM is used to rapidly switch a transistor on and off, controlling the average power delivered to a load. By varying the duty cycle, the output voltage or current can be regulated very efficiently, minimizing energy loss compared to linear regulators. This is a fundamental concept in power electronics, directly impacting energy efficiency and heat dissipation.

## 3. Prerequisites — what you must know first

Before diving deep into timers, ensure you have a solid grasp of these foundational concepts:

*   **Digital Logic Basics:** Understanding of binary numbers, logic gates (AND, OR, NOT, XOR), flip-flops (latches, registers), and how they form basic counting circuits.
*   **Microcontroller Architecture:** Knowledge of the basic components of a microcontroller (CPU, memory, I/O ports, buses, peripherals) and how they interact.
*   **Clocks and Frequencies:** How a system clock generates regular pulses, what a clock frequency means (Hz), and how different parts of a system might operate at different clock speeds.
*   **Registers:** Understanding that registers are small, fast storage locations within the CPU or peripherals used to hold data, configuration settings, or status information.
*   **Interrupts:** How hardware events can temporarily pause the main program execution to run a special function (Interrupt Service Routine or ISR) and then resume.
*   **Basic C Programming:** Familiarity with variables, data types, control structures (if/else, loops), functions, and especially bitwise operations (AND, OR, shifting) for configuring hardware registers.
*   **Binary and Hexadecimal:** Ability to convert between decimal, binary, and hexadecimal representations, which is crucial for understanding register values.

## 4. The core idea — step by step

Let's break down how timers work, building from the simplest concept to the more advanced functions.

### Step 1: The Basic Timer — A Digital Counter

The heart of any timer peripheral is a simple counter. Imagine it as a digital stopwatch that just counts upwards.

*   **Plain-English Statement:** At its core, a timer is a register that automatically increments its value at a regular, predictable rate, driven by a clock signal.

*   **Small Concrete Example:** If your timer is set up to count once every microsecond (1 µs), its internal counter register will go from 0 to 1, then to 2, then to 3, and so on, with each count taking exactly 1 µs.

*   **The Formal/Mathematical Version:**
    The timer's counting frequency ($f_{count}$) is derived from a system clock ($f_{clock}$) by passing it through a **prescaler**. The prescaler effectively divides the clock frequency, slowing down the rate at which the counter increments.
    $$ f_{count} = \frac{f_{clock}}{\text{Prescaler Value} + 1} $$
    The time it takes for the counter to increment by one (the **tick period**, $T_{tick}$) is:
    $$ T_{tick} = \frac{1}{f_{count}} = \frac{\text{Prescaler Value} + 1}{f_{clock}} $$
    The counter itself is usually a `16-bit` or `32-bit` register, meaning it can count up to $2^{16}-1$ or $2^{32}-1$ respectively before "overflowing" back to zero. Most timers also have an **Auto-Reload Register (ARR)**, which defines the maximum value the counter will reach before resetting to zero (or a pre-defined value) and starting over. This determines the timer's **period**.
    $$ \text{Timer Period (seconds)} = (\text{ARR} + 1) \times T_{tick} $$
    $$ \text{Timer Frequency (Hz)} = \frac{1}{\text{Timer Period}} = \frac{f_{count}}{\text{ARR} + 1} = \frac{f_{clock}}{(\text{Prescaler Value} + 1) \times (\text{ARR} + 1)} $$

*   **What Could Go Wrong:**
    *   **Counter Overflow:** If you don't set an `ARR`, the counter will count to its maximum possible value (e.g., $2^{16}-1$) and then wrap around to 0. If you're measuring long durations, this overflow needs to be handled in software, or your measurements will be incorrect.
    *   **Wrong Clock Source:** Using an incorrect or un-enabled clock source for the timer will result in it not counting at all, or counting at an unexpected rate.
    *   **Prescaler Miscalculation:** An incorrect prescaler value will lead to the timer counting at the wrong frequency, making all subsequent timing calculations inaccurate.

### Step 2: Output Compare (OC) — The Alarm Clock

Output Compare adds the ability to trigger an event when the counter reaches a specific value.

*   **Plain-English Statement:** You set a specific "target count" in a special register (the Compare Register, CCR). When the main counter reaches this target count, the timer generates an event, often an interrupt or a change on an output pin.

*   **Small Concrete Example:** You configure the timer to count from 0 to 999 (so `ARR = 999`). You set a Compare Register (`CCR`) to 500. When the main counter reaches 500, an output pin might toggle from low to high, or an interrupt might fire.

*   **The Formal/Mathematical Version:**
    An Output Compare Unit typically consists of a **Compare Register (CCR)**. The hardware continuously compares the current value of the main **Counter Register (CNT)** with the value stored in `CCR`.
    $$ \text{If } \text{CNT} == \text{CCR}, \text{ then an Output Compare event occurs.} $$
    The action taken upon a match (e.g., set pin high, set pin low, toggle pin, generate interrupt) is configured in the timer's control registers. For generating periodic waveforms (like a square wave), the `CCR` might be updated after each match, or the timer might be configured to automatically toggle the output upon match and then reset or continue counting.

*   **What Could Go Wrong:**
    *   **Missing the Compare:** If the `CCR` value is set higher than `ARR`, the counter will never reach `CCR` before resetting, and no compare event will occur.
    *   **Incorrect Action:** Configuring the timer to perform the wrong action (e.g., setting the pin low instead of high) upon a compare match.
    *   **Interrupt Latency:** If an interrupt is used, the actual response time might be delayed by other higher-priority interrupts or CPU activity, affecting the precision of the output.

### Step 3: Pulse Width Modulation (PWM) — The Dimmer Switch

PWM is a special application of the Output Compare concept, used to generate a continuous stream of pulses with varying "on" times.

*   **Plain-English Statement:** PWM generates a repeating square wave where the "on" time (pulse width) can be precisely controlled. By changing the ratio of "on" time to total period, you can effectively control the average power delivered to a device.

*   **Small Concrete Example:** To dim an LED, you might set the timer to have a total period of 1000 counts. If the LED is "on" for 200 counts and "off" for 800 counts, it's at 20% brightness. If it's "on" for 800 counts and "off" for 200 counts, it's at 80% brightness. The frequency of this on/off cycle is usually high enough (e.g., >100 Hz) that the human eye (or motor) perceives a continuous effect rather than flickering.

*   **The Formal/Mathematical Version:**
    PWM is typically generated by using two key values:
    1.  **Period (or Frequency):** Determined by the `ARR` (Auto-Reload Register). This defines the total duration of one complete ON/OFF cycle.
        $$ \text{PWM Frequency} = \frac{f_{clock}}{(\text{Prescaler Value} + 1) \times (\text{ARR} + 1)} $$
    2.  **Duty Cycle:** Determined by the `CCR` (Compare Register). This defines how long the output pin stays "on" (or "high") within one period.
        $$ \text{Duty Cycle (\%)} = \frac{(\text{CCR} + 1)}{(\text{ARR} + 1)} \times 100\% $$
    In many microcontrollers, the timer counts from 0 up to `ARR`. The output pin is typically set high at the start of the period (when `CNT` is 0) and then set low when `CNT` matches `CCR`. It remains low until the counter overflows (`CNT` reaches `ARR` and resets to 0), starting a new period. This is often called "edge-aligned" or "up-counting" PWM.

*   **What Could Go Wrong:**
    *   **Incorrect Frequency:** If the `ARR` or prescaler are miscalculated, the PWM frequency will be wrong, potentially causing audible noise (if too low) or inefficient operation (if too high for the load).
    *   **Duty Cycle Calculation Errors:** Off-by-one errors or integer division issues can lead to slightly incorrect duty cycles.
    *   **Glitches:** Improper configuration or timing can sometimes lead to very short, unwanted pulses (glitches) on the output, which can cause erratic behavior in sensitive loads.

### Step 4: Input Capture (IC) — The Lap Timer

Input Capture allows the timer to record the exact time an event occurs on an input pin.

*   **Plain-English Statement:** Instead of the timer controlling an output, it now listens to an input. When a specific change happens on that input pin (like it goes from low to high, or high to low), the timer's current count is immediately saved into a special Capture Register.

*   **Small Concrete Example:** You connect a button to an input pin. When you press the button (and the pin goes from high to low), the timer's current count (say, 12345) is saved. When you release it (pin goes low to high), another count (say, 12845) is saved. The difference (500 counts) tells you how long the button was pressed.

*   **The Formal/Mathematical Version:**
    An Input Capture Unit is configured to monitor an input pin for a specific **edge transition** (e.g., rising edge, falling edge, or both). When the configured edge is detected, the current value of the **Counter Register (CNT)** is automatically copied into a dedicated **Capture/Compare Register (CCR)** (which can also act as a capture register in IC mode). An interrupt can then be generated to notify the CPU that a capture event has occurred, allowing the software to read the captured value.
    $$ \text{Upon detected edge on input pin, } \text{CCRx} \leftarrow \text{CNT} $$
    The time duration between two consecutive captured events ($C_1$ and $C_2$) is:
    $$ \Delta T = (C_2 - C_1) \times T_{tick} $$
    Care must be taken to handle timer overflows if the duration spans across the counter's wrap-around point.

*   **What Could Go Wrong:**
    *   **Missing Edges:** If the input signal changes too fast, or if the timer's clock is too slow, an edge might be missed.
    *   **Noisy Signals:** Bouncing contacts (from a button) or electrical noise on the input can cause multiple unintended capture events. Debouncing (either hardware or software) is often necessary.
    *   **Incorrect Edge Sensitivity:** Configuring the timer to capture on the wrong edge (e.g., falling instead of rising) will lead to incorrect timing measurements.
    *   **Timer Overflow Handling:** If the time between two events is longer than the timer's maximum count, the counter will wrap around. Software must detect and compensate for these overflows to calculate the correct duration.

### Step 5: Timer Modes and Registers — The Control Panel

All these functionalities (counting, OC, PWM, IC) are configured by writing specific values to various **control registers** associated with the timer peripheral.

*   **Plain-English Statement:** Just like your car has buttons and knobs to control the radio, air conditioning, or headlights, a timer peripheral has a set of special memory locations (registers) that you write to in order to tell it *how* to operate. You set the prescaler, the auto-reload value, enable specific modes (like PWM), and choose what happens on an output compare match or input capture event.

*   **Small Concrete Example:** To enable a timer, you might write a `1` to a specific bit in its `TIMx_CR1` (Control Register 1). To set the prescaler, you write a value to `TIMx_PSC` (Prescaler Register). To enable PWM on a specific channel, you might write a `6` to a `TIMx_CCMR1` (Capture/Compare Mode Register 1) field.

*   **What Could Go Wrong:**
    *   **Register Misconfiguration:** Writing incorrect values or forgetting to set crucial bits in control registers will lead to the timer not functioning as expected. This is a very common source of bugs in embedded programming.
    *   **Forgetting Peripheral Clock Enable:** Most microcontrollers require you to explicitly enable the clock supply to a specific peripheral (like a timer) before it can be used. Forgetting this step means the timer registers won't respond, and the timer won't run.
    *   **Read-Modify-Write Errors:** When changing only a few bits in a register, it's important to read the current value, modify only the desired bits (using bitwise operations), and then write the new value back, to avoid unintentionally changing other bits.

## 5. Worked examples — multiple, with every step shown

Let's work through some practical examples. Assume a microcontroller with a system clock frequency ($f_{clock}$) of $64 \text{ MHz}$.

### Example 1: Generate a 1 kHz Square Wave using Output Compare

**Problem:** Configure a timer to generate a square wave with a frequency of $1 \text{ kHz}$ on an output pin.

**Given:**
*   System Clock Frequency ($f_{clock}$) = $64 \text{ MHz}$
*   Desired Output Frequency ($f_{out}$) = $1 \text{ kHz}$

**What we want:**
*   Prescaler Value (`PSC`)
*   Auto-Reload Register Value (`ARR`)
*   Compare Register Value (`CCR`) to toggle the pin at half the period.

**Steps:**

1.  **Determine the Timer's Internal Clock Frequency ($f_{count}$):**
    We need to choose a prescaler value. Let's aim for a `T_tick` that allows for fine-grained control and a reasonable `ARR` value. A good starting point is to make the `Timer Period` calculation simpler.
    Let's choose `PSC` such that `f_count` is still high enough.
    A common strategy is to make `f_count` a power of 2 or a round number.
    Let's try to achieve a `f_count` of $1 \text{ MHz}$ (meaning $T_{tick} = 1 \text{ µs}$).
    $$ f_{count} = \frac{f_{clock}}{\text{PSC} + 1} $$
    $$ 1 \text{ MHz} = \frac{64 \text{ MHz}}{\text{PSC} + 1} $$
    $$ \text{PSC} + 1 = \frac{64 \text{ MHz}}{1 \text{ MHz}} = 64 $$
    $$ \text{PSC} = 64 - 1 = \mathbf{63} $$
    *Explanation:* We want the timer's internal counter to increment at a frequency that is easy to work with, like 1 MHz. This means each count represents 1 microsecond. To achieve this from a 64 MHz system clock, we need to divide the clock by 64. The prescaler register value is `PSC + 1`, so `PSC` itself is 63.

2.  **Calculate the Timer Period in Ticks:**
    The desired output frequency is $1 \text{ kHz}$, which means a period of $1 / 1 \text{ kHz} = 1 \text{ ms}$.
    The timer counts in $T_{tick}$ units, which we set to $1 \text{ µs}$.
    So, the total number of ticks for one period is:
    $$ \text{Total Ticks} = \frac{\text{Desired Period}}{T_{tick}} = \frac{1 \text{ ms}}{1 \text{ µs}} = \frac{1000 \text{ µs}}{1 \text{ µs}} = 1000 $$
    *Explanation:* Since each timer tick is 1 microsecond, and we want a total period of 1 millisecond (1000 microseconds), the counter needs to count 1000 times for one full cycle.

3.  **Set the Auto-Reload Register (`ARR`):**
    The `ARR` defines the maximum count value before the timer resets.
    $$ \text{ARR} = \text{Total Ticks} - 1 = 1000 - 1 = \mathbf{999} $$
    *Explanation:* The timer typically counts from 0 up to `ARR`. So, if `ARR` is 999, it counts 0, 1, ..., 999, which is 1000 distinct counts.

4.  **Set the Compare Register (`CCR`) for a Square Wave:**
    For a perfect square wave, we want the output to toggle at half the period.
    So, the `CCR` value should be half of the `Total Ticks`.
    $$ \text{CCR} = \frac{\text{Total Ticks}}{2} - 1 = \frac{1000}{2} - 1 = 500 - 1 = \mathbf{499} $$
    *Explanation:* The pin will be in one state (e.g., high) for the first `CCR + 1` ticks (0 to 499), and then toggle to the other state (e.g., low) for the remaining `ARR - CCR` ticks (500 to 999). This gives a 50% duty cycle. The `-1` is because we are comparing `CNT` to `CCR`, and the event happens *at* `CCR`. If `ARR` is 999 (1000 counts), then 500 counts is achieved when `CNT` reaches 499.

**Final Answer:**
*   **Prescaler (`PSC`) = 63**
*   **Auto-Reload Register (`ARR`) = 999**
*   **Compare Register (`CCR`) = 499**

**Reflection:** This example highlights the fundamental relationship between clock frequency, prescaler, and the `ARR` to set the overall timer frequency. The `CCR` then determines the specific point within that period where an event occurs. The `-1` in `ARR` and `CCR` calculations is a common source of off-by-one errors; remember that a count from 0 to N is N+1 distinct values.

---

### Example 2: Control LED Brightness with 75% Duty Cycle PWM at 500 Hz

**Problem:** Generate a PWM signal with a frequency of $500 \text{ Hz}$ and a duty cycle of $75\%$ to control an LED's brightness.

**Given:**
*   System Clock Frequency ($f_{clock}$) = $64 \text{ MHz}$
*   Desired PWM Frequency ($f_{PWM}$) = $500 \text{ Hz}$
*   Desired Duty Cycle = $75\%$

**What we want:**
*   Prescaler Value (`PSC`)
*   Auto-Reload Register Value (`ARR`)
*   Compare Register Value (`CCR`)

**Steps:**

1.  **Determine the Timer's Internal Clock Frequency ($f_{count}$):**
    Let's choose a `PSC` to get a `f_count` that simplifies calculations. A `f_count` of $1 \text{ MHz}$ (as in Example 1) is often good for general purposes, or we can choose a `PSC` to get a good `ARR` resolution.
    Let's try to make `ARR + 1` a nice round number for the duty cycle calculation.
    If we want $500 \text{ Hz}$ and $f_{clock} = 64 \text{ MHz}$, we have:
    $$ f_{PWM} = \frac{f_{clock}}{(\text{PSC} + 1) \times (\text{ARR} + 1)} $$
    $$ 500 \text{ Hz} = \frac{64 \times 10^6 \text{ Hz}}{(\text{PSC} + 1) \times (\text{ARR} + 1)} $$
    $$ (\text{PSC} + 1) \times (\text{ARR} + 1) = \frac{64 \times 10^6}{500} = 128000 $$
    We need to factor 128000 into two terms. Let's pick a `PSC` that results in a good resolution for `ARR`.
    If we choose `PSC + 1 = 64`, then `PSC = 63`.
    $$ \text{ARR} + 1 = \frac{128000}{64} = 2000 $$
    $$ \text{ARR} = 2000 - 1 = \mathbf{1999} $$
    So, `PSC = 63` and `ARR = 1999`.
    This gives `f_count = 64 MHz / 64 = 1 MHz`.
    *Explanation:* We need to find `PSC` and `ARR` that multiply to 128000 to achieve the desired PWM frequency. We chose `PSC + 1 = 64` (so `PSC = 63`) because it's a common divisor and results in a convenient `f_count` of 1 MHz. This choice also gives a good resolution for `ARR` (1999), which is a 16-bit value.

2.  **Calculate the Compare Register Value (`CCR`) for 75% Duty Cycle:**
    The duty cycle is defined by the ratio of `CCR + 1` to `ARR + 1`.
    $$ \text{Duty Cycle} = \frac{\text{CCR} + 1}{\text{ARR} + 1} $$
    We want a $75\%$ duty cycle, so $0.75$.
    $$ 0.75 = \frac{\text{CCR} + 1}{1999 + 1} = \frac{\text{CCR} + 1}{2000} $$
    $$ \text{CCR} + 1 = 0.75 \times 2000 = 1500 $$
    $$ \text{CCR} = 1500 - 1 = \mathbf{1499} $$
    *Explanation:* With an `ARR` of 1999, the timer counts 2000 distinct values (0 to 1999). For a 75% duty cycle, the "on" time should last for $0.75 \times 2000 = 1500$ counts. Since the output typically toggles when `CNT` matches `CCR`, we set `CCR` to 1499, meaning the output is high for counts 0 through 1499 (1500 counts).

**Final Answer:**
*   **Prescaler (`PSC`) = 63**
*   **Auto-Reload Register (`ARR`) = 1999**
*   **Compare Register (`CCR`) = 1499**

**Reflection:** This example demonstrates how to set both the frequency and the duty cycle of a PWM signal. The choice of `PSC` and `ARR` is often a trade-off between the desired frequency resolution, duty cycle resolution, and the maximum count value the timer supports. The key is to correctly apply the formulas for frequency and duty cycle.

---

### Example 3: Measure the Period of an Incoming Signal using Input Capture

**Problem:** An external sensor generates a square wave. Use Input Capture to measure the period of this signal. Assume the signal is between $100 \text{ Hz}$ and $1 \text{ kHz}$.

**Given:**
*   System Clock Frequency ($f_{clock}$) = $64 \text{ MHz}$
*   Expected Signal Frequency Range: $100 \text{ Hz}$ to $1 \text{ kHz}$

**What we want:**
*   Prescaler Value (`PSC`)
*   Auto-Reload Register Value (`ARR`) (to ensure no overflow for the expected period)
*   The logic to calculate the period from captured values.

**Steps:**

1.  **Determine the Timer's Internal Clock Frequency ($f_{count}$):**
    We need a `f_count` that is fast enough to capture edges accurately but not so fast that the counter overflows too quickly for the longest expected period.
    The longest period is $1/100 \text{ Hz} = 10 \text{ ms}$.
    Let's choose `PSC` to get a `f_count` of $1 \text{ MHz}$ ($T_{tick} = 1 \text{ µs}$), which offers good resolution.
    $$ \text{PSC} = \frac{f_{clock}}{f_{count}} - 1 = \frac{64 \text{ MHz}}{1 \text{ MHz}} - 1 = 64 - 1 = \mathbf{63} $$
    *Explanation:* A 1 µs tick allows us to measure time with microsecond precision, which is usually sufficient for signals in the hundreds of Hz to kHz range.

2.  **Determine `ARR` to handle potential overflows:**
    A 16-bit timer can count up to $2^{16}-1 = 65535$.
    With $T_{tick} = 1 \text{ µs}$, the maximum measurable time without overflow is $65535 \text{ µs} \approx 65.5 \text{ ms}$.
    The longest expected period is $10 \text{ ms}$, which is less than $65.5 \text{ ms}$. So, a 16-bit timer with `ARR = 65535` (or its default max) is sufficient, and we don't need to worry about multiple overflows for a single period measurement. Let's set `ARR` to its maximum for a 16-bit timer: $\mathbf{65535}$.
    *Explanation:* We set `ARR` to the maximum value a 16-bit timer can hold to maximize the duration we can measure before the timer wraps around. Since our longest expected period (10 ms) is well within this maximum (65.5 ms), we won't have to handle multiple overflows between two consecutive rising edges.

3.  **Input Capture Logic (Conceptual):**
    *   Configure the Input Capture channel to trigger on a **rising edge**.
    *   When the first rising edge occurs, the timer's `CNT` value is captured into `CCR1`. Let's call this `capture_val_1`.
    *   Enable an interrupt for the capture event.
    *   In the Interrupt Service Routine (ISR):
        *   Read `CCR1` as `capture_val_2`.
        *   Calculate the difference: `period_ticks = capture_val_2 - capture_val_1`.
        *   If `capture_val_2 < capture_val_1` (meaning an overflow occurred between captures), add `ARR + 1` to `period_ticks` to compensate for the wrap-around.
        *   Update `capture_val_1 = capture_val_2` for the next measurement.
        *   Calculate the period in seconds: `Period = period_ticks * T_tick`.
        *   Calculate frequency: `Frequency = 1 / Period`.

    Let's say we capture the first rising edge at `capture_val_1 = 12345` ticks.
    The next rising edge is captured at `capture_val_2 = 22345` ticks.
    $$ \text{period\_ticks} = \text{capture\_val\_2} - \text{capture\_val\_1} = 22345 - 12345 = 10000 \text{ ticks} $$
    $$ \text{Period} = 10000 \text{ ticks} \times 1 \text{ µs/tick} = \mathbf{10000 \text{ µs} = 10 \text{ ms}} $$
    $$ \text{Frequency} = \frac{1}{10 \text{ ms}} = \frac{1}{0.01 \text{ s}} = \mathbf{100 \text{ Hz}} $$

    Now, consider an overflow scenario:
    `capture_val_1 = 60000` ticks.
    `capture_val_2 = 5000` ticks (meaning the timer wrapped around from 65535 to 0 and then counted to 5000).
    $$ \text{period\_ticks} = (\text{ARR} + 1 - \text{capture\_val\_1}) + \text{capture\_val\_2} $$
    $$ \text{period\_ticks} = (65535 + 1 - 60000) + 5000 = (65536 - 60000) + 5000 = 5536 + 5000 = 10536 \text{ ticks} $$
    Or more simply:
    $$ \text{period\_ticks} = \text{capture\_val\_2} - \text{capture\_val\_1} + (\text{ARR} + 1) \quad (\text{if } \text{capture\_val\_2} < \text{capture\_val\_1}) $$
    $$ \text{period\_ticks} = 5000 - 60000 + 65536 = -55000 + 65536 = 10536 \text{ ticks} $$
    $$ \text{Period} = 10536 \text{ µs} = \mathbf{10.536 \text{ ms}} $$
    $$ \text{Frequency} = \frac{1}{10.536 \text{ ms}} \approx \mathbf{94.91 \text{ Hz}} $$
    *Explanation:* The core idea is to record the timer's count at two consecutive events (e.g., rising edges). The difference between these counts gives the duration in timer ticks. We must account for the timer wrapping around (overflowing) if the second capture value is smaller than the first. The `ARR + 1` term correctly adds the full cycle length back in.

**Final Answer (Configuration):**
*   **Prescaler (`PSC`) = 63**
*   **Auto-Reload Register (`ARR`) = 65535** (for a 16-bit timer)
*   **Input Capture Logic:** Capture on rising edge, calculate difference between consecutive captures, handle overflows.

**Reflection:** This example highlights the importance of choosing an appropriate `f_count` for resolution and range. It also introduces the critical concept of handling timer overflows in software, which is a common necessity when measuring durations that might exceed the timer's single-cycle capacity.

---

### Example 4: Generate a PWM signal whose duty cycle is controlled by an ADC reading

**Problem:** Read an analog voltage from a potentiometer (0V to 3.3V) using an Analog-to-Digital Converter (ADC). Use this reading to dynamically adjust the duty cycle of a PWM signal, where 0V corresponds to 0% duty cycle and 3.3V corresponds to 100% duty cycle. The PWM frequency should be $20 \text{ kHz}$.

**Given:**
*   System Clock Frequency ($f_{clock}$) = $64 \text{ MHz}$
*   Desired PWM Frequency ($f_{PWM}$) = $20 \text{ kHz}$
*   ADC Resolution = 12-bit (meaning readings from 0 to $2^{12}-1 = 4095$)
*   ADC Input Voltage Range = 0V to 3.3V

**What we want:**
*   Prescaler Value (`PSC`)
*   Auto-Reload Register Value (`ARR`)
*   The logic to calculate `CCR` based on the ADC reading.

**Steps:**

1.  **Determine the Timer's Internal Clock Frequency ($f_{count}$) and `ARR`:**
    We need to choose `PSC` and `ARR` to achieve $20 \text{ kHz}$.
    $$ f_{PWM} = \frac{f_{clock}}{(\text{PSC} + 1) \times (\text{ARR} + 1)} $$
    $$ 20 \times 10^3 \text{ Hz} = \frac{64 \times 10^6 \text{ Hz}}{(\text{PSC} + 1) \times (\text{ARR} + 1)} $$
    $$ (\text{PSC} + 1) \times (\text{ARR} + 1) = \frac{64 \times 10^6}{20 \times 10^3} = \frac{64000}{20} = 3200 $$
    Let's choose `PSC + 1 = 64` (so `PSC = 63`) for consistency and a 1 MHz `f_count`.
    $$ \text{ARR} + 1 = \frac{3200}{64} = 50 $$
    $$ \text{ARR} = 50 - 1 = \mathbf{49} $$
    *Explanation:* We calculated the product `(PSC + 1) * (ARR + 1)` needed to achieve the target PWM frequency. We then chose `PSC = 63` (giving a 1 MHz timer clock) and derived `ARR = 49`. This `ARR` value (49) is small, meaning the PWM period will have 50 distinct steps, which is good enough for an ADC with 4096 steps.

2.  **ADC Reading and Duty Cycle Mapping:**
    The ADC provides a 12-bit value, ranging from 0 to 4095.
    We want to map this range to a duty cycle from 0% to 100%.
    The `CCR` value determines the duty cycle. `CCR` can range from 0 (0% duty cycle, effectively always off) to `ARR` (100% duty cycle, effectively always on).
    So, `CCR` needs to map the ADC reading (0-4095) to the `ARR + 1` range (0-50).
    $$ \text{CCR}_{\text{calculated}} = \text{ADC}_{\text{reading}} \times \frac{(\text{ARR} + 1)}{\text{ADC}_{\text{max\_value}} + 1} $$
    $$ \text{CCR}_{\text{calculated}} = \text{ADC}_{\text{reading}} \times \frac{50}{4096} $$
    Since `CCR` is typically 0-indexed, we'll use `CCR` instead of `CCR+1` in the mapping for simplicity in this case, meaning `CCR` can range from 0 to `ARR`.
    $$ \text{CCR}_{\text{value}} = \text{round}\left( \text{ADC}_{\text{reading}} \times \frac{\text{ARR}}{\text{ADC}_{\text{max\_value}}} \right) $$
    Let's use `CCR` ranging from 0 to `ARR` (49).
    $$ \text{CCR}_{\text{value}} = \text{round}\left( \text{ADC}_{\text{reading}} \times \frac{49}{4095} \right) $$
    *Explanation:* The ADC provides a digital value proportional to the input voltage. We need to scale this ADC value to the range of possible `CCR` values. The maximum ADC reading (4095) should correspond to the maximum `CCR` value (`ARR = 49`), which gives 100% duty cycle. The minimum ADC reading (0) should correspond to `CCR = 0` (0% duty cycle). The formula performs this linear mapping. Using `ARR` instead of `ARR+1` in the numerator of the ratio simplifies the mapping for `CCR` values directly corresponding to 0 to `ARR`.

3.  **Example Calculation:**
    *   If ADC reading = 0 (0V):
        $$ \text{CCR}_{\text{value}} = \text{round}\left( 0 \times \frac{49}{4095} \right) = \mathbf{0} $$
        This gives 0% duty cycle.
    *   If ADC reading = 2047 (approx 1.65V, half range):
        $$ \text{CCR}_{\text{value}} = \text{round}\left( 2047 \times \frac{49}{4095} \right) = \text{round}\left( 2047 \times 0.011966 \right) = \text{round}\left( 24.49 \right) = \mathbf{24} $$
        This gives a duty cycle of $(24+1)/(49+1) = 25/50 = 50\%$. (Slight rounding errors might occur depending on the exact implementation, but it's very close).
    *   If ADC reading = 4095 (3.3V, max range):
        $$ \text{CCR}_{\text{value}} = \text{round}\left( 4095 \times \frac{49}{4095} \right) = \mathbf{49} $$
        This gives $(49+1)/(49+1) = 100\%$ duty cycle.

**Final Answer (Configuration & Logic):**
*   **Prescaler (`PSC`) = 63**
*   **Auto-Reload Register (`ARR`) = 49**
*   **Logic:**
    In a main loop or timer interrupt:
    1.  Read the ADC value (`adc_reading`).
    2.  Calculate `CCR_value = (uint32_t)adc_reading * (ARR + 1) / (ADC_MAX_VALUE + 1);`
    3.  Update the PWM channel's compare register: `TIMx->CCRx = CCR_value;`

**Reflection:** This example shows a common real-world control loop where sensor input (ADC) directly influences an actuator output (PWM). It combines the concepts of timer configuration with dynamic control. The key challenge here is the correct scaling and mapping of the input range to the output range, ensuring both 0% and 100% duty cycles are achievable and the resolution is adequate. Integer division can introduce small errors, so careful scaling or using floating-point math (if performance allows) is sometimes necessary.

## 6. Common mistakes and traps

1.  **Forgetting to enable peripheral clocks:** Microcontroller peripherals (like timers, ADCs, GPIOs) typically have their own clock gates. If you don't explicitly enable the clock for a timer, its registers won't be accessible, and the timer won't function, leading to frustrating debugging sessions where everything *looks* correct in code.
2.  **Off-by-one errors in `PSC`, `ARR`, or `CCR`:** The formulas often involve `+1` or `-1` (e.g., `PSC + 1`, `ARR + 1`, `CCR + 1`). Forgetting these adjustments or applying them incorrectly is a very common source of slightly incorrect frequencies or duty cycles. Remember that a counter from 0 to N has N+1 distinct states.
3.  **Ignoring timer overflow in Input Capture:** When measuring periods or durations longer than the timer's maximum count, the counter will wrap around to zero. If this wrap-around isn't detected and compensated for in software (by adding `ARR + 1` to the difference), the measured duration will be wildly incorrect.
4.  **Incorrect interrupt priority or handler setup:** If using timer interrupts (for OC or IC), forgetting to enable the interrupt, setting its priority too low (leading to missed events), or having an incorrect Interrupt Service Routine (ISR) address will prevent the timer from triggering the desired software actions.
5.  **Race conditions with shared variables in ISRs:** If an ISR modifies a global variable that the main loop also accesses, and proper synchronization mechanisms (like disabling interrupts briefly or using atomic operations) are not used, data corruption can occur, leading to unpredictable behavior.
6.  **Hardware limitations and pin multiplexing:** Not all timer channels are available on all pins, and pins often have multiple possible functions (GPIO, ADC, Timer, etc.). Incorrectly configuring the pin's alternate function or choosing a pin that doesn't support the desired timer channel will result in no output or no input capture.

## 7. Textbook-precise explanation

A **Timer/Counter Peripheral** is a specialized hardware module within a microcontroller or System-on-Chip (SoC) designed for precise time-based operations. It fundamentally consists of a configurable digital counter register (`TIMx_CNT`) that increments or decrements at a rate derived from a high-frequency system clock ($f_{clock}$) via a **Prescaler Unit** (`TIMx_PSC`). The prescaler divides the input clock by a factor of $(\text{PSC} + 1)$, yielding the effective counter clock frequency ($f_{count}$). The counter typically operates in conjunction with an **Auto-Reload Register** (`TIMx_ARR`), which defines the upper limit of the count before it resets (or wraps around) and generates an update event.

The core functionalities of a versatile timer peripheral include:

1.  **Output Compare (OC) Unit:** An OC unit contains one or more **Compare Registers** (`TIMx_CCRx`). The value in `TIMx_CCRx` is continuously compared against the current value of `TIMx_CNT`. When `TIMx_CNT` matches `TIMx_CCRx`, an **Output Compare event** is triggered. This event can be configured to perform various actions, such as:
    *   Generating an interrupt request to the CPU.
    *   Toggling, setting, or clearing a dedicated output pin.
    *   Triggering other peripheral operations (e.g., DMA transfer).
    The precise timing of these events is given by the equation:
    $$ T_{event} = (\text{CCRx} + 1) \times T_{tick} $$
    where $T_{tick} = \frac{\text{PSC} + 1}{f_{clock}}$.

2.  **Pulse Width Modulation (PWM) Generator:** PWM is a specific application of the Output Compare mechanism, designed to generate a periodic square wave with a controllable **duty cycle**. In PWM mode, the timer's `TIMx_ARR` defines the period of the PWM waveform, and a specific `TIMx_CCRx` defines the pulse width (or "on" time). The output pin is typically set high at the beginning of each period (when `TIMx_CNT` resets to 0) and then set low when `TIMx_CNT` matches `TIMx_CCRx` (or vice-versa, depending on configuration). The PWM frequency ($f_{PWM}$) and duty cycle ($D$) are given by:
    $$ f_{PWM} = \frac{f_{clock}}{(\text{PSC} + 1) \times (\text{ARR} + 1)} $$
    $$ D = \frac{\text{CCRx} + 1}{\text{ARR} + 1} \times 100\% $$
    PWM generation often supports various modes, such as edge-aligned (up-counting or down-counting) and center-aligned PWM, offering flexibility for different control applications.

3.  **Input Capture (IC) Unit:** An IC unit is designed to precisely record the value of `TIMx_CNT` at the exact moment a specific event occurs on an associated input pin. This event is typically a configurable edge transition (rising, falling, or both). When the selected edge is detected, the current value of `TIMx_CNT` is latched into a dedicated **Capture Register** (`TIMx_CCRx`, which serves as a capture register in this mode). An interrupt can then be generated, signaling the CPU to read the captured timestamp. This functionality is crucial for measuring external signal characteristics such as:
    *   **Period:** The time between two consecutive identical edges.
    *   **Pulse Width:** The duration between a rising and a falling edge (or vice-versa).
    The time difference between two captured values $C_1$ and $C_2$ is:
    $$ \Delta T = (C_2 - C_1) \times T_{tick} $$
    where software must handle potential counter overflows, adding $(\text{ARR} + 1)$ for each wrap-around that occurred between $C_1$ and $C_2$.

These functionalities are typically configured via a set of dedicated control, status, and data registers accessible through the microcontroller's memory-mapped peripheral interface.

*(References: "Embedded Systems: Architecture, Programming and Design" by Raj Kamal, 3rd Ed., Chapter 10; "Microcontroller Based Embedded Systems" by Mazidi, Naimi, and Naimi, 2nd Ed., Chapter 13)*

## 8. ASCII diagrams

```text
       +-----------------------------------------------------------------+
       |                              TIMER PERIPHERAL                   |
       |                                                                 |
       |  System Clock (f_clock)                                         |
       |      |                                                          |
       |      V                                                          |
       |  +-----------+                                                  |
       |  | Prescaler | --> f_count = f_clock / (PSC + 1)                |
       |  | (TIMx_PSC)|                                                  |
       |  +-----------+                                                  |
       |      |                                                          |
       |      V                                                          |
       |  +---------------------+                                        |
       |  | Counter Register    |                                        |
       |  | (TIMx_CNT)          |                                        |
       |  | (counts 0 to ARR)   |<------------------------------------+  |
       |  +---------------------+                                    |  |
       |      |      |                                               |  |
       |      |      +------------------------------------------+    |  |
       |      |                                                 |    |  |
       |      V                                                 V    |  |
       |  +---------------------+        +---------------------+    |  |
       |  | Auto-Reload Register|<------ | Compare Logic       |<---+  |
       |  | (TIMx_ARR)          |        | (CNT == ARR)        |    |  |
       |  | (Period Control)    |        +---------------------+    |  |
       |  +---------------------+               | (Update Event)      |  |
       |                                        V                     |  |
       |  +-------------------------------------------------------------+  |
       |  |                                                              |  |
       |  |  Channel 1 (e.g., TIMx_CH1)                                  |  |
       |  |  +---------------------+                                   |  |
       |  |  | Compare Register    |<----------------------------------+  |
       |  |  | (TIMx_CCR1)         |                                      |  |
       |  |  +---------------------+                                      |  |
       |  |         |                                                      |  |
       |  |         V                                                      |  |
       |  |  +---------------------+                                      |  |
       |  |  | Compare Logic       |                                      |  |
       |  |  | (CNT == CCR1)       |                                      |  |
       |  |  +---------------------+                                      |  |
       |  |         |                                                      |  |
       |  |         V                                                      |  |
       |  |  +-------------------------------------------------------+    |  |
       |  |  | Output Control Logic (OC Mode / PWM Mode)           |    |  |
       |  |  | - Toggle / Set / Clear pin on match (OC)            |    |  |
       |  |  | - Generate PWM waveform (PWM)                       |    |  |
       |  |  +-------------------------------------------------------+    |  |
       |  |         |                                                      |  |
       |  |         V                                                      |  |
       |  |     Output Pin (e.g., PA0)                                     |  |
       |  +----------------------------------------------------------------+  |
       |                                                                     |
       |  +-----------------------------------------------------------------+  |
       |  |                                                                  |  |
       |  |  Channel 2 (e.g., TIMx_CH2)                                      |  |
       |  |  +---------------------+                                        |  |
       |  |  | Input Pin (e.g., PA1) |                                        |  |
       |  |  +---------------------+                                        |  |
       |  |         |                                                         |  |
       |  |         V                                                         |  |
       |  |  +---------------------+                                        |  |
       |  |  | Edge Detector       |                                        |  |
       |  |  | (Rising/Falling/Both)|                                        |  |
       |  |  +---------------------+                                        |  |
       |  |         | (Edge Event)                                            |  |
       |  |         V                                                         |  |
       |  |  +---------------------+                                        |  |
       |  |  | Capture Register    |<----------------------------------------+  |
       |  |  | (TIMx_CCR2)         | (CNT value copied on edge event)          |  |
       |  |  +---------------------+                                        |  |
       |  |         |                                                         |  |
       |  |         V                                                         |  |
       |  |     Interrupt Request                                             |  |
       |  +-----------------------------------------------------------------+  |
       +---------------------------------------------------------------------+
```

**PWM Waveform Illustration:**

This diagram shows a typical edge-aligned (up-counting) PWM waveform. The timer counts from 0 up to `ARR`. The output pin goes high at the start of the period (when `CNT` is 0) and goes low when `CNT` matches `CCR`.

```text
CNT (Counter Value)
    ^
ARR +--------------------------------------------------------------------
    |                                                                    |
    |                                                                    |
CCR +----------+                                          +----------+   |
    |          |                                          |          |   |
    |          |                                          |          |   |
    |          |                                          |          |   |
  0 +----------+------------------------------------------+----------+----- > Time
      ^        ^                                          ^        ^
      |        |                                          |        |
      |        |                                          |        |
      |        |                                          |        |
      |        |                                          |        |
      |        |                                          |        |
      |        |                                          |        |
      |        |                                          |        |
      |        +------------------------------------------+        |
      |          Output Low (OFF)                                  |
      +------------------------------------------------------------+
        Output High (ON)

PWM Output Signal
    ^
High +--+------------------------------------------------+--+------------------
    |  |                                                |  |
    |  |                                                |  |
    |  |                                                |  |
Low +--+------------------------------------------------+--+------------------ > Time
       ^                                                ^
       |                                                |
       +------------------------------------------------+
         One PWM Period (determined by ARR)

       <---------- Pulse Width (ON time, determined by CCR) ---------->

Duty Cycle = (Pulse Width) / (Period)
```

## 9. Memory technique — never forget this

1.  **Mnemonic:** "PIC-OC" - Imagine a **P**icture (PIC) of an **O**utput **C**ontroller.
    *   **P**WM: **P**ulse Width Modulation (dimmer switch, motor speed).
    *   **I**nput **C**apture: **I**nput **C**aptures a timestamp (lap timer, measuring events).
    *   **O**utput **C**ompare: **O**utput **C**ompares and triggers (alarm clock, generating precise events).

2.  **The 1-3 formulas/facts they MUST overlearn:**
    *   **Timer Tick Period:** $T_{tick} = \frac{\text{Prescaler Value} + 1}{f_{clock}}$
    *   **PWM Frequency:** $f_{PWM} = \frac{f_{clock}}{(\text{Prescaler Value} + 1) \times (\text{ARR} + 1)}$
    *   **PWM Duty Cycle:** $D = \frac{\text{CCR} + 1}{\text{ARR} + 1}$

3.  **Spaced-repetition schedule:**
    *   **Review 1:** After 1 day
    *   **Review 2:** After 3 days
    *   **Review 3:** After 7 days
    *   **Review 4:** After 16 days
    *   **Review 5:** After 35 days
    For each review, quickly re-derive the formulas and explain the three modes in your own words without looking at the notes.

4.  **The first-principles re-derivation pathway:**
    If you ever forget the formulas, build them up from the ground floor:
    *   **Start with the raw clock:** You have a system clock $f_{clock}$ (ticks per second).
    *   **Introduce the prescaler:** The prescaler divides the clock. If `PSC` is the register value, it divides by `(PSC + 1)`. So, the clock *into* the counter is $f_{clock} / (\text{PSC} + 1)$. This is your $f_{count}$.
    *   **Derive the tick period:** If $f_{count}$ is how many ticks per second, then $1/f_{count}$ is seconds per tick. This is $T_{tick}$.
    *   **Derive the timer period (frequency):** The counter counts from 0 up to `ARR`. That's `(ARR + 1)` total ticks. So, the total time for one cycle (the timer period) is `(ARR + 1) * T_tick`. The timer frequency is then `1 / Timer Period`. Substitute $T_{tick}$ to get the full frequency formula.
    *   **Derive PWM duty cycle:** The duty cycle is the "on" time divided by the total period. The "on" time is determined by `CCR`. If the output is high from 0 to `CCR`, that's `(CCR + 1)` ticks. The total period is `(ARR + 1)` ticks. So, the ratio is `(CCR + 1) / (ARR + 1)`.

## 10. Connections — what this leads to

A deep understanding of timers is foundational for many advanced topics in Computer Science and Embedded Systems:

*   **Real-Time Operating Systems (RTOS):** Timers are absolutely critical for RTOS kernels. They provide the periodic "tick" that drives task scheduling, context switching, and time-slice management, ensuring tasks execute deterministically.
*   **Control Systems (PID Controllers):** PWM is the primary output mechanism for many PID (Proportional-Integral-Derivative) controllers, especially in motor control, robotics, and power electronics. Input Capture can be used to measure feedback (e.g., motor RPM from an encoder) for closed-loop control.
*   **Digital Signal Processing (DSP):** Timers are used to establish precise sampling rates for ADCs and DACs, which are fundamental to digital audio, image processing, and sensor data acquisition.
*   **Communication Protocols:** While dedicated peripherals often handle complex protocols, timers are used for generating precise baud rates for UART, clock signals for SPI/I2C, and for implementing custom bit-banging protocols.
*   **Power Electronics:** PWM is the core principle behind Switch-Mode Power Supplies (SMPS), inverters, and motor drivers, enabling efficient power conversion and management.
*   **Advanced Peripherals (DMA):** Timers often act as triggers for Direct Memory Access (DMA) controllers, allowing data transfers to occur at precise intervals or upon specific events without CPU intervention, improving system efficiency.
*   **Robotics and Automation:** From controlling servo motors (using PWM) to measuring encoder feedback (using Input Capture) and synchronizing complex movements, timers are indispensable for robotic systems.
*   **Low-Power Design:** Timers can be configured to wake up the CPU from low-power sleep modes at regular intervals, allowing for power-efficient data logging or periodic checks.

## 11. Self-check questions

1.  A microcontroller has a system clock of $120 \text{ MHz}$. You want to configure a timer to generate a PWM signal with a frequency of $25 \text{ kHz}$ and a duty cycle of $60\%$. If the timer is 16-bit, what are the appropriate values for `PSC`, `ARR`, and `CCR`? Show your steps.
2.  Explain the difference between Output Compare and Input Capture in terms of data flow and purpose. Provide a real-world scenario where each would be the preferred method.
3.  You are using Input Capture to measure the pulse width of a signal (time from rising edge to falling edge). The timer has a $T_{tick}$ of $0.5 \text{ µs}$. You capture the rising edge at `CNT = 10245` and the falling edge at `CNT = 6500` (after an overflow). The `ARR` for this 16-bit timer is its maximum value, $65535$. What is the pulse width in microseconds?
4.  Describe a scenario where choosing a very high `ARR` value (e.g., maximum for a 32-bit timer) might be disadvantageous for a PWM application, even if it offers finer frequency resolution. What is the trade-off?
5.  A timer is configured for PWM with `f_clock = 80 MHz`, `PSC = 99`, and `ARR = 799`. What is the resulting PWM frequency? If you want to achieve a duty cycle of $30\%$, what `CCR` value should you set?