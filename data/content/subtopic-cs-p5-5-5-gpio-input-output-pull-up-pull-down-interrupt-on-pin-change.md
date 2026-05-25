## What it is
General-Purpose Input/Output (GPIO) is the primary interface for a microcontroller to interact with the physical world. They are physical pins on the chip that can be programmatically configured to either send out digital signals (output, e.g., turning on an LED) or read incoming digital signals (input, e.g., detecting a button press). This software-defined directionality is what makes them "general-purpose."

## Why it matters
GPIO is the bedrock of embedded systems. In aerospace, flight computers use GPIO to read data from inertial measurement units (IMUs), GPS modules, and air pressure sensors, and to control motors, servos, and pyrotechnic deployment charges. In physics experiments, GPIO pins are used for high-speed triggering of data acquisition systems based on events from particle detectors or other sensors, ensuring data is captured at the precise moment of interest.

## When to study it
Before tackling GPIO, you must have a firm grasp of the following. If you don't, master them first.
1.  **Digital Logic:** The concepts of HIGH (1) and LOW (0) logic levels, Boolean algebra.
2.  **Basic Electronics:** Voltage ($V$), current ($I$), resistance ($R$), and Ohm's Law ($V=IR$). You must be able to analyze a simple resistive voltage divider.
3.  **C/C++ Programming:** Specifically, you must be fluent in bitwise operations (`&`, `|`, `~`, `^`, `<<`, `>>`) as they are the language used to manipulate hardware registers.
4.  **Microcontroller Architecture:** You should know what a memory-mapped register is and why it's used to control hardware peripherals.

## How to study it (step by step)
1.  **Read the Datasheet.** Select a common microcontroller (e.g., ATmega328P or STM32F4). Find the GPIO section in its datasheet. Identify the three key registers for a given port (e.g., Port B): the Data Direction Register (`DDRB`), the Port Output Register (`PORTB`), and the Pin Input Register (`PINB`). Internalize what each one does.
2.  **Blink an LED (Output).** Write code to configure a single pin as an output. Use direct register manipulation, not a library function like `digitalWrite()`. Set the corresponding bit in the DDR. Then, in a loop, toggle the corresponding bit in the PORT register. This forces you to understand the cause-and-effect at the hardware level.
3.  **Read a Button (Input).** Configure a pin as an input by clearing its bit in the DDR. Connect a push button to it. Read the corresponding bit in the PIN register and print the result to a serial console. Notice the erratic behavior when the button is not pressed. This is a "floating" input.
4.  **Fix Floating with a Pull-up.** Add a $10k\Omega$ resistor between your input pin and the voltage source ($V_{CC}$). This is an external pull-up. Observe that the input is now reliably HIGH when the button is open. Then, remove the external resistor and enable the microcontroller's *internal* pull-up resistor by setting the pin's bit in the PORT register (while it's configured as an input). Verify it has the same effect.
5.  **Analyze the Circuit.** Using Ohm's Law, mathematically prove why the pull-up resistor works. Calculate the voltage at the input pin when the switch to ground is open (no current, no voltage drop across R, so pin voltage equals $V_{CC}$) and when it is closed (pin is connected directly to ground, so pin voltage is $0V$).
6.  **Implement an Interrupt.** Convert your button-reading code from polling (checking the pin in a loop) to being interrupt-driven. Configure the Pin Change Interrupt registers for that specific pin. Write an Interrupt Service Routine (ISR) that executes a simple action (like toggling an LED) when the pin changes state. Observe that the main loop can now be empty or perform other tasks, demonstrating the efficiency gain.

## Key ideas, with intuition
1.  **Hardware controlled by memory (Registers):** A microcontroller's peripherals (like GPIO) are controlled by special memory locations called registers. Writing a specific bit pattern to a Data Direction Register, for example, physically reconfigures the transistors connected to a pin to make it an output. It's not an abstraction; you are directly manipulating the hardware by writing to memory addresses.
2.  **Inputs must not float:** An input pin is a high-impedance gate of a transistor. If left unconnected, it acts like an antenna, picking up stray electromagnetic fields. Its voltage will drift, causing the logic level to flip randomly between HIGH and LOW. This is unacceptable in a deterministic system. An input pin must *always* be connected to a defined voltage level, either HIGH or LOW.
3.  **Pull-up/Pull-down resistors provide a default state:** To prevent floating, we use a resistor to "pull" the pin to a default state. A pull-up resistor connects the pin to $V_{CC}$ (e.g., 5V or 3.3V), making its default state HIGH. A pull-down resistor connects it to Ground (GND), making its default state LOW. The resistor has a high value (e.g., $10k\Omega$) so it's a "weak" pull. A "strong" connection, like a closed switch to ground, can easily overpower it and change the pin's state.
    $$ V_{pin} = V_{source} \cdot \frac{R_{pin}}{R_{pull} + R_{pin}} $$
    When a switch to ground is closed, $R_{pin}$ becomes nearly zero, so $V_{pin}$ becomes nearly zero (LOW). When the switch is open, $R_{pin}$ is effectively infinite, so no current flows through $R_{pull}$, there is no voltage drop across it, and $V_{pin} = V_{source}$ (HIGH).
4.  **Interrupts: "Don't call us, we'll call you."** Polling is inefficient. It's like repeatedly asking "Is it done yet?". An interrupt lets the CPU perform other tasks and is automatically paused—"interrupted"—by the hardware when an event occurs (like a pin changing from LOW to HIGH). This is crucial for real-time systems that must react to external events with minimal latency.

## Worked example
We will configure pin PB5 (on an ATmega328P) as an input with an internal pull-up to detect a button press. When the button is pressed, a pin change interrupt will fire, and its ISR will toggle an LED on pin PB0.

**Goal:** On button press (PB5 -> GND), toggle LED (PB0).

**Setup:**
- LED and current-limiting resistor connected to pin PB0.
- Push button connected between pin PB5 and GND.

**Code (C for AVR microcontrollers):**
```c
#include <avr/io.h>
#include <avr/interrupt.h>

void setup() {
    // 1. Configure LED pin (PB0) as an output.
    // Set the 0th bit of Data Direction Register B.
    DDRB |= (1 << DDB0);

    // 2. Configure button pin (PB5) as an input.
    // Clear the 5th bit of Data Direction Register B.
    DDRB &= ~(1 << DDB5);

    // 3. Enable the internal pull-up resistor on PB5.
    // Set the 5th bit of Port B's output register.
    PORTB |= (1 << PORTB5);

    // 4. Configure Pin Change Interrupt.
    // Enable Pin Change Interrupt for the group containing PB5 (PCINT0..7 is PCIE0).
    PCICR |= (1 << PCIE0);
    // Unmask the specific pin PCINT5 (which corresponds to PB5).
    PCMSK0 |= (1 << PCINT5);

    // 5. Enable global interrupts.
    sei();
}

// 6. The Interrupt Service Routine for the PCINT0 vector.
// This code executes automatically when any unmasked pin in the PCINT0..7 group changes state.
ISR(PCINT0_vect) {
    // Check if the button pin (PB5) is now LOW (pressed).
    // This is a simple form of debouncing.
    if (!(PINB & (1 << PINB5))) {
        // Toggle the LED pin (PB0).
        PORTB ^= (1 << PORTB0);
    }
}

int main(void) {
    setup();
    // 7. The main loop is now free to do other things, or nothing.
    while (1) {
        // The CPU can sleep here to save power.
    }
    return 0; // Unreachable
}
```

**Reflection:**
- **Step 1 & 2:** We explicitly told the hardware the *direction* of data flow for each pin using `DDRB`.
- **Step 3:** We re-used the `PORTB` register. Its meaning changes based on the pin's direction: for an output it drives voltage, but for an input it enables the pull-up. This is a common, efficient design pattern in microcontrollers.
- **Step 4:** Interrupt configuration is layered. We first enabled the entire group (`PCICR`), then specified the exact pin within that group (`PCMSK0`). This is hierarchical control.
- **Step 5 & 6:** We enabled interrupts globally (`sei()`) and provided the specific function (`ISR`) for the hardware to call. The vector name `PCINT0_vect` is predefined and linked by the compiler to the correct hardware interrupt address.
- **Step 7:** The empty `while(1)` loop demonstrates the power of interrupts. The system is fully responsive to the button, yet the CPU is 100% available for other computations.

## Diagrams
A pull-up resistor configuration for a switch connected to a GPIO pin.

```text
      Vcc (+5V)
        |
        /
        \  R_pull (10k Ohm)
        /
        |
        +------> To GPIO Input Pin
        |
      \
       \  Switch (Push Button)
        \
        |
       ---
       GND
```
- **Switch Open (Not Pressed):** No path to GND. No current flows through `R_pull`. The GPIO pin is connected to Vcc through the resistor and sees a HIGH logic level (~5V).
- **Switch Closed (Pressed):** A direct path to GND is created. The GPIO pin is now connected directly to GND and sees a LOW logic level (0V). The resistor `R_pull` limits the current flowing from Vcc to GND, preventing a short circuit.

## Memory technique — remember this forever
1.  **The Story:** Think of GPIO registers as a "Control Panel" for a pin.
    - **DDR (Direction):** A big switch labeled "IN" or "OUT".
    - **PORT (Output Latch):** If direction is OUT, this is the "ON/OFF" switch for the pin. If direction is IN, this is a small button labeled "Enable Weak Pull-up".
    - **PIN (Input Read):** A read-only light that shows the *actual current state* of the pin, regardless of your settings.
    - **Interrupt:** A red alarm bell that rings when the PIN light changes, so you don't have to stare at it.

2.  **Overlearn these facts (AVR example):**
    - `DDRx |= (1 << PIN_NUM);` // Set pin to OUTPUT
    - `DDRx &= ~(1 << PIN_NUM);` // Set pin to INPUT
    - `PORTx |= (1 << PIN_NUM);` // Set OUTPUT HIGH, or enable INPUT PULL-UP

3.  **Spaced Repetition Schedule:** Review these register functions and the pull-up circuit diagram at **1 day, 3 days, 7 days, 16 days, 35 days**. Actively rewrite the code, don't just read it.

4.  **First Principles Pathway:** If you forget how a pull-up works, derive it from Ohm's Law. It's a voltage divider. The pin's input impedance is very high (mega-ohms). The pull-up is ~10kΩ. The switch to ground is ~0Ω.
    - **Switch Open:** The divider is between the pin's impedance and the pull-up. $V_{pin} = V_{CC} \cdot \frac{Z_{pin}}{R_{pull} + Z_{pin}}$. Since $Z_{pin} \gg R_{pull}$, $V_{pin} \approx V_{CC}$.
    - **Switch Closed:** The pin is now in parallel with the switch to ground. The equivalent resistance is near zero. $V_{pin} \approx 0V$.

## Common mistakes
1.  **Floating Input:** The most common beginner error. Forgetting to use a pull-up or pull-down resistor for any mechanical switch, leading to unpredictable behavior. Your system must have no floating inputs.
2.  **Register Confusion:** Trying to set an output pin's state by writing to the `PINx` register. You write to `PORTx` to set an output. You read from `PINx` to get an input's state.
3.  **Long ISRs:** Writing `delay()` calls, serial prints, or complex calculations inside an Interrupt Service Routine. ISRs must be as fast as humanly possible. They pause your main code; a long ISR will cripple system responsiveness. Set a flag in the ISR and process it in the main loop.
4.  **Not Disabling Interrupts During Critical Sections:** When modifying a multi-byte variable (e.g., a 16-bit integer) that is also used inside an ISR, you must disable interrupts before the modification and re-enable them after. Otherwise, the ISR could fire halfway through the update, reading a corrupted value.

## Self-check
1.  A rain sensor has two states: when wet, it closes a contact, creating a connection to GND. When dry, the contact is open. How would you configure a GPIO pin to read this sensor, ensuring a stable reading in both wet and dry conditions? Name the specific register bits you would set.
2.  You need to generate a 1 kHz square wave on pin PD4. You have a timer that can trigger an interrupt precisely every 500 microseconds. Describe the required GPIO pin configuration and the single line of C code you would place inside the timer's ISR to achieve this.
3.  An emergency stop button must halt a robotic arm *immediately*. The main control loop for the arm is complex and can sometimes take 50ms to complete one cycle. Why is polling the button state inside this main loop an unacceptable design? How does an interrupt-based approach solve this problem, and what is the term for the maximum time between the button press and the arm beginning to stop?