## What it is
A microcontroller timer is a hardware peripheral that counts at a fixed frequency, driven by the system clock. Its advanced modes—Output Compare, Input Capture, and Pulse Width Modulation (PWM)—allow this simple counting to precisely control or measure real-world events without constant CPU intervention. These modes trigger actions when the counter reaches a specific value or record the counter's value when an external event occurs.

## Why it matters
These timer modes are the bedrock of control systems and signal processing in embedded applications. PWM is used to control the speed of motors in drones and rovers, dim LEDs, and command servo motors in robotic arms. Input Capture is critical for measuring the speed of rotating shafts using encoders or decoding signals from remote controls, while Output Compare is used to generate precise, one-off timing signals for synchronizing physics experiments or triggering data acquisition.

## When to study it
Before tackling this, you must have a firm grasp of the following:
*   **Microcontroller Architecture:** Understand the concepts of CPU, memory-mapped peripherals, and registers.
*   **C Programming:** Be comfortable with pointers, bitwise operations (`&`, `|`, `^`, `~`, `<<`, `>>`), and direct register manipulation (e.g., `TIMER1->CCR1 = 1000;`).
*   **Digital Logic & Number Systems:** Be fluent in binary and hexadecimal, and understand logic levels (high/low) and signal edges (rising/falling).
*   **Basic Timer Operation:** You should already understand how a basic up/down counter works, including the concepts of a clock source, prescaler, and overflow.

If you are not confident with these, pause and review them. Hand-waving here will cause significant problems later.

## How to study it (step by step)
1.  **Solidify the Basics.** Write a simple program that uses a timer's overflow interrupt to blink an LED at exactly 1 Hz. Do not proceed until you can calculate the required prescaler and auto-reload values from first principles for a given system clock.
2.  **Implement Output Compare.** Modify your blinking LED program to use an Output Compare channel. Configure the timer to toggle the LED pin automatically when the counter value matches the compare register value. Notice how this offloads the work from the CPU.
3.  **Derive PWM from Output Compare.** Understand that PWM is just a repeating form of Output Compare. The timer counts from 0 to a period value (Auto-Reload Register, ARR), and the pin is high. When the counter matches the compare value (Capture/Compare Register, CCR), the pin goes low. Derive the formulas for PWM frequency and duty cycle based on system clock, prescaler, ARR, and CCR.
4.  **Control an Actuator.** Use your derived formulas to generate the specific PWM signal required to control a standard servo motor (e.g., 50 Hz frequency, with a pulse width from 1 ms to 2 ms). Observe the physical motion of the servo as you change the CCR value.
5.  **Implement Input Capture.** Find a signal source (e.g., the PWM output from another pin). Configure a second timer in Input Capture mode to measure the pulse width of that signal. Capture the timer value on the rising edge, then again on the falling edge. The difference between these two values is the pulse width in timer ticks.
6.  **Measure Frequency.** Extend the Input Capture logic. Capture the timer value on two consecutive rising edges. The difference is the period of the signal. Calculate the frequency from this period.

## Key ideas, with intuition
1.  **The Timer is a Clockwork Counter.** Imagine a simple gear that clicks forward with every tick of the system clock. A **prescaler** is a gear reduction system; setting a prescaler of 7 means the main counter gear only clicks forward for every 8 ticks of the system clock. This lets us slow the count down to measure longer time intervals.
    $$ f_{timer} = \frac{f_{sys\_clk}}{Prescaler + 1} $$
    *Intuition: You're just dividing the main clock frequency to get a slower, more manageable "tick" for your timer.*

2.  **Output Compare (OC): "When the count reaches X, do Y."** The hardware has a comparator that constantly checks: "Is the current timer count ($T_{CNT}$) equal to the value in my Compare Register ($T_{CCR}$)?". When they match, it triggers a pre-configured action—set a pin high, pull it low, toggle it, or trigger an interrupt. This is a "set-and-forget" event timer.

3.  **Pulse Width Modulation (PWM): OC on a Loop.** PWM automates the OC process to create a continuous wave. The timer counts up to a maximum value, the **Auto-Reload Value** ($T_{ARR}$), which sets the period (and thus the frequency) of the wave. The **Compare Value** ($T_{CCR}$) determines the point within that period where the output pin switches state. The ratio of the "on" time to the total period is the duty cycle.
    $$ f_{PWM} = \frac{f_{timer}}{T_{ARR} + 1} = \frac{f_{sys\_clk}}{(Prescaler + 1)(T_{ARR} + 1)} $$
    $$ DutyCycle (\%) = \frac{T_{CCR}}{T_{ARR} + 1} \times 100\% \quad (\text{for up-counting PWM mode 1}) $$
    *Intuition: You're drawing a horizontal line (the CCR value) across a sawtooth wave (the timer count). The output is high when the sawtooth is below the line and low when it's above.*

4.  **Input Capture (IC): "When Y happens, what time is it?"** This is the inverse of OC. An external event on a pin (a rising or falling edge) triggers the hardware to instantly copy the current timer count ($T_{CNT}$) into a special read-only register ($T_{ICR}$). By capturing the time of two different events, you can calculate the duration between them.
    $$ \Delta t = (T_{ICR2} - T_{ICR1}) \times T_{tick} = (T_{ICR2} - T_{ICR1}) \times \frac{1}{f_{timer}} $$
    *Intuition: It's a digital stopwatch's lap button. An external event "hits the button," and the current time is recorded without you having to poll for it.*

## Worked example
**Problem:** Configure a 16-bit timer on a microcontroller with a 16 MHz system clock ($f_{sys\_clk}$) to control a standard servo motor. The servo requires a PWM signal with a frequency of 50 Hz and a pulse width that can vary from 1 ms to 2 ms. Calculate the prescaler (PSC), auto-reload (ARR), and capture/compare (CCR) register values needed to center the servo with a 1.5 ms pulse.

**Step 1: Determine the Timer Clock Frequency.**
The timer's maximum count is $2^{16} - 1 = 65535$. The desired PWM period is $T_{PWM} = 1/f_{PWM} = 1/50 \text{ Hz} = 0.02 \text{ s} = 20 \text{ ms}$.
The number of system clock cycles in this period is $16 \times 10^6 \text{ cycles/s} \times 0.02 \text{ s} = 320,000$ cycles. This is larger than 65535, so we must use a prescaler. Let's choose a prescaler to bring the timer "tick" into a reasonable range. A good target is a timer clock of around 1 MHz.
$Prescaler = \frac{f_{sys\_clk}}{f_{timer}} - 1 = \frac{16 \times 10^6}{1 \times 10^6} - 1 = 15$.
So, we set the prescaler register `PSC` to 15. The resulting timer clock is $f_{timer} = \frac{16 \text{ MHz}}{15 + 1} = 1 \text{ MHz}$. Each timer tick corresponds to $1 \mu s$.

**Step 2: Calculate the Auto-Reload Register (ARR) value.**
The ARR value defines the period of the PWM signal. We want a 20 ms period.
$Period = (ARR + 1) \times T_{timer\_tick}$
$20,000 \mu s = (ARR + 1) \times 1 \mu s$
$ARR + 1 = 20000$
$ARR = 19999$. This value is less than 65535, so it is valid for a 16-bit timer.

**Step 3: Calculate the Capture/Compare Register (CCR) value.**
The CCR value defines the pulse width (the "on" time). We want a 1.5 ms pulse width to center the servo.
$PulseWidth = CCR \times T_{timer\_tick}$
$1500 \mu s = CCR \times 1 \mu s$
$CCR = 1500$.

**Step 4: Reflection.**
*   We set `PSC = 15`. This slows the 16 MHz system clock by a factor of 16, resulting in a 1 MHz timer clock where each tick is 1 microsecond. This step made the subsequent math intuitive and manageable.
*   We set `ARR = 19999`. With a 1 MHz clock, the timer will count from 0 to 19999 in 20000 ticks, which is 20 ms, giving us the desired 50 Hz frequency.
*   We set `CCR = 1500`. The PWM output will be high for the first 1500 ticks (1500 µs or 1.5 ms) and then go low for the remainder of the 20 ms period. This produces the exact pulse width required. To move the servo, we would programmatically change this CCR value between 1000 (1 ms) and 2000 (2 ms).

## Diagrams
Here is a diagram illustrating the PWM generation from the worked example.

```text
       ^ Timer Count (T_CNT)
20000 -|-----------------------------------------------------> Overflow & Reset
       |                                                   /|
       |                                                  / |
       |                                                 /  |
       |                                                /   |
       |                                               /    |
       |                                              /     |
       |                                             /      |
       |                                            /       |
       |                                           /        |
       |                                          /         |
       |                                         /          |
 1500 -|............(CCR Match)................./...........|--(CCR Value)
       |           /                           /            |
       |          /|                          /|            |
       |         / |                         / |            |
       |        /  |                        /  |            |
       |       /   |                       /   |            |
       |      /    |                      /    |            |
     0 +------------------------------------------------------------> Time
       |     <---- 20ms (Period) ---->   <---- 20ms ---->   |

       ^ PWM Output
  HIGH |----_                               ----_
       |    |                               |   |
   LOW |    |_______________________________|   |___________
       +------------------------------------------------------------> Time
       |    <1.5ms>                         <1.5ms>          |
       | (Pulse Width)                                      |
```
The top graph shows the timer's internal counter (`T_CNT`) ramping from 0 to `ARR` (19999). The horizontal dotted line is the `CCR` value (1500). The bottom graph shows the resulting PWM output pin. The output is high while `T_CNT < CCR` and low after the match until the timer overflows and resets.

## Memory technique — remember this forever
1.  **The Mnemonic Story: "The Dam Controller"**
    *   Think of a water reservoir behind a dam. The **System Clock** is the river flowing into it.
    *   The **Prescaler** is the intake valve; a large prescaler means you only let a trickle of water in, so the reservoir fills slowly.
    *   The reservoir's total height is the **Auto-Reload Register (ARR)**. When water reaches the top, a spillway opens, it empties instantly (`Overflow`), and starts filling again. The time it takes to fill and empty is the **Period/Frequency**.
    *   The **Capture/Compare Register (CCR)** is a sensor set at a specific height on the dam wall.
    *   **PWM Mode:** When the water level passes the CCR sensor, it sends a signal to close a floodgate (pin goes low). When the reservoir empties, the floodgate opens again (pin goes high). The **Duty Cycle** is the percentage of time the floodgate is open.
    *   **Input Capture Mode:** An external event (like a boat hitting a buoy) sends a signal to the dam controller, which instantly records the exact water level (`T_CNT`) at that moment.

2.  **Formulas to Overlearn:**
    $$ f_{PWM} = \frac{f_{sys\_clk}}{(PSC + 1)(ARR + 1)} $$
    $$ DutyCycle = \frac{CCR}{ARR + 1} $$
    $$ \Delta t_{captured} = \Delta T_{CNT} \times \frac{PSC + 1}{f_{sys\_clk}} $$

3.  **Spaced Repetition Schedule:** Review these formulas and the "Dam Controller" story at: 1 day, 3 days, 7 days, 16 days, 35 days. Actively re-derive them each time.

4.  **First Principles Pathway:** If you forget everything, rebuild from this:
    *   Time = Counts / Frequency.
    *   The timer's effective frequency is the system clock divided by the prescaler factor (`PSC + 1`).
    *   The timer's period is determined by how many timer ticks it takes to count to its max value (`ARR + 1`).
    *   PWM frequency is the inverse of the timer's period.
    *   Duty cycle is a ratio: "on" time (set by `CCR`) divided by total period time (set by `ARR + 1`).

## Common mistakes
*   **Off-by-One Errors:** Forgetting that the prescaler (`PSC`) and auto-reload (`ARR`) registers are zero-indexed. A value of `N` in the register corresponds to a division/count of `N+1`. This is the most common source of frequency errors.
*   **Forgetting Peripheral Clocks:** Each peripheral (like `TIM2`, `ADC1`) has its own clock enable bit in a register (e.g., `RCC->APB1ENR`). If you don't enable the clock for the timer you're using, its registers will be inaccessible and it will do nothing.
*   **Integer Division Pitfalls:** When calculating register values, performing division with integer types in C can truncate results. E.g., `uint32_t arr = 16000000 / 50;` might not be what you want. Perform calculations using floating-point numbers or carefully order operations to maintain precision before casting to an integer register value.
*   **Not Enabling Timer Outputs:** For PWM, you must not only configure the timer channel but also explicitly enable the channel's output. For many microcontrollers, this is a separate bit in a control register (e.g., `TIMx->CCER`).

## Self-check
1.  A 16-bit timer is driven by an 84 MHz clock. The prescaler is set to 83, and the auto-reload register is set to 999. What is the frequency of the resulting PWM signal? What is its duty cycle if the compare register is set to 250?
2.  You need to generate a 1 kHz PWM signal with a 40% duty cycle from a 64 MHz system clock. Find a valid combination of a 16-bit prescaler and 16-bit auto-reload register values to achieve this.
3.  Describe, in terms of timer configuration, how you would use one timer with two input capture channels to measure the frequency and duty cycle of an incoming PWM signal. Which events would you configure each channel to capture? How would you handle timer overflow between captures?