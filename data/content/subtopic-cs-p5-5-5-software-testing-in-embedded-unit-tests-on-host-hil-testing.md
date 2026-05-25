## What it is
Software testing in embedded systems is a multi-stage process to verify correctness on hardware that is difficult to debug directly. Unit tests are run on a host computer (e.g., your laptop) by creating software "fakes" of the hardware, allowing rapid testing of pure logic. Hardware-in-the-Loop (HIL) testing involves connecting your actual embedded processor (the "hardware") to a simulator that mimics the physical world it will operate in, testing the integrated system in real-time.

## Why it matters
In aerospace, you cannot debug a rocket's guidance software mid-flight. HIL testing is standard practice at NASA and SpaceX to validate flight software by connecting the flight computer to a high-fidelity simulation of the launch vehicle's dynamics. In autonomous vehicles, the ECU (Electronic Control Unit) running the perception and control algorithms is tested in a HIL setup that simulates sensor inputs (camera, LiDAR, radar) and vehicle dynamics, preventing catastrophic failures on the road.

## When to study it
Before tackling this, you must be proficient in C or C++. You need a solid understanding of pointers, function pointers, and build systems (like Make or CMake). You should also have a conceptual grasp of a Hardware Abstraction Layer (HAL), which is the software layer that isolates application code from specific hardware details. Without these, the concepts of mocking and separating code for host vs. target execution will be difficult to implement.

## How to study it (step by step)
1.  **Set up a simple C project.** Use a standard structure with `src`, `include`, and `test` directories. Write a single function in a `.c` file that performs a simple calculation, e.g., converting a temperature sensor reading.
2.  **Write a host-based unit test.** Using a simple framework like `Unity` (part of Ceedling) or even just the standard `<assert.h>`, write a test file in your `test` directory. Compile and run this test on your host machine (your laptop), verifying the calculation logic of your function with known inputs and outputs.
3.  **Introduce a hardware dependency.** Modify your function to take its input from another function that would, on the real hardware, read a register (e.g., `uint16_t read_adc_channel(int channel)`). Notice that you can no longer compile and run your test on the host because the host has no ADC.
4.  **Implement a mock.** Create a fake version of the hardware-dependent function. Use build flags (`#ifdef TEST`) to link against this fake "mock" function during testing on the host, and against the real hardware function when building for the embedded target. Your mock will simply return pre-defined values for the test cases.
5.  **Re-run the tests.** Compile and run the tests on the host again. They should now pass, because you have isolated your calculation logic from the hardware it depends on. This is the core of host-based unit testing.
6.  **Conceptualize a HIL setup.** Draw a block diagram for testing your temperature controller. The blocks should be: your embedded board (Device Under Test), a temperature sensor, a heater (actuator), and a "Plant/Environment Simulator" (the HIL part). The simulator would take the heater command from your board and mathematically model the resulting temperature, feeding it back to the sensor input on your board.

## Key ideas, with intuition
1.  **Host vs. Target Separation:** The fundamental idea is to separate your code into two parts: pure, portable logic (the algorithm) and hardware-specific drivers (the part that touches registers). Unit tests run on the host (your fast, convenient development machine) and focus exclusively on the pure logic. The target is the final, resource-constrained embedded processor. Testing on the host is orders of magnitude faster and easier than flashing and debugging on the target.

2.  **The Test Pyramid:** Imagine a pyramid. The wide base is **Unit Tests**. There are many of them, they are fast, and they test small, isolated pieces of logic. The middle layer is **Integration Tests**, where you combine modules. The small peak is **HIL and System Tests**. There are few of these, they are slow and expensive, but they verify the entire system working together. You start at the bottom and work your way up.

3.  **Mocking and Stubbing:** These are the tools for faking hardware on the host. A **stub** provides a fixed, canned answer to a function call (e.g., `read_temperature()` always returns `25.0`). A **mock** is smarter; it's an object that you can configure with expectations. For example, you can tell a mock, "I expect you to be called exactly 3 times with the argument `5`, and when you are, return `100`." This lets you test not only the output of your logic but also its interaction with other parts of the system.

    $$ \text{Logic}(\text{HardwareInterface()}) \xrightarrow{\text{Unit Test}} \text{Logic}(\text{MockInterface()}) $$

4.  **Closing the Loop:** HIL testing is about creating a feedback loop between your hardware and a realistic simulation. Your embedded controller reads simulated sensor data, computes an output, and drives a real or simulated actuator. The HIL simulator then calculates how the environment would react to that actuation and updates the simulated sensor data. This tests the real-time performance and dynamic behavior of your code on the actual target hardware.

## Worked example
Let's test a function that converts a 12-bit ADC reading into a voltage. The reference voltage is 3.3V.

**The Code (in `src/converter.c`)**

```c
#include <stdint.h>
#include "adc_driver.h" // This would contain the real hardware driver

// Converts a raw 12-bit ADC value to a voltage.
// The logic we want to test.
float convert_adc_to_voltage(uint16_t raw_adc) {
    // A 12-bit ADC has 2^12 = 4096 steps.
    const float V_REF = 3.3f;
    const float MAX_ADC_VAL = 4095.0f;

    if (raw_adc > MAX_ADC_VAL) {
        raw_adc = MAX_ADC_VAL;
    }

    return (raw_adc / MAX_ADC_VAL) * V_REF;
}

// A function that uses the logic and the hardware.
float get_sensor_voltage(uint8_t channel) {
    uint16_t raw_value = adc_read_raw(channel); // Hardware dependency!
    return convert_adc_to_voltage(raw_value);
}
```

We cannot test `get_sensor_voltage` directly on the host. But we can and should test `convert_adc_to_voltage`.

**The Test (in `test/test_converter.c`)**

First, we need to mock the hardware dependency. In this case, there isn't one for `convert_adc_to_voltage`, which is good design. We can test it directly.

```c
#include <assert.h>
#include <math.h> // For fabs
#include "../src/converter.c" // Simple way to include the C file for testing

void test_conversion_at_zero() {
    float voltage = convert_adc_to_voltage(0);
    assert(fabs(voltage - 0.0f) < 1e-6);
}

void test_conversion_at_max() {
    float voltage = convert_adc_to_voltage(4095);
    assert(fabs(voltage - 3.3f) < 1e-6);
}

void test_conversion_at_midpoint() {
    float voltage = convert_adc_to_voltage(2048);
    // Expected: (2048 / 4095.0) * 3.3 = 1.6508
    assert(fabs(voltage - 1.6508f) < 1e-4);
}

void test_conversion_overflow() {
    // Test the saturation logic
    float voltage = convert_adc_to_voltage(5000);
    assert(fabs(voltage - 3.3f) < 1e-6);
}


int main(void) {
    test_conversion_at_zero();
    test_conversion_at_max();
    test_conversion_at_midpoint();
    test_conversion_overflow();
    // If asserts don't fire, tests pass.
    return 0;
}
```

**To compile and run on host:**
`gcc -o test_runner test/test_converter.c -lm`
`./test_runner`

**Reflection:**
*   **Step 1 (test_conversion_at_zero):** We tested the boundary condition of a zero input. This is a critical first step.
*   **Step 2 (test_conversion_at_max):** We tested the other boundary, the maximum valid input.
*   **Step 3 (test_conversion_at_midpoint):** We tested a nominal case in the middle of the range to ensure the linear conversion is correct.
*   **Step 4 (test_conversion_overflow):** We tested the defensive `if` statement that handles invalid input, ensuring the code is robust.

By separating the pure logic (`convert_adc_to_voltage`) from the hardware interaction (`get_sensor_voltage`), we made the logic easily testable on our host machine without any special hardware.

## Diagrams
Here is a diagram showing host-based unit testing with mocks.

```text
      +-----------------------------+
      |       HOST COMPUTER         |
      | (e.g., Laptop running Linux)|
      |                             |
      |   +---------------------+   |
      |   | Test Runner         |   |
      |   | (e.g., Unity, GTest)|   |
      |   +----------+----------+   |
      |              |              |
      |   +----------v----------+   |
      |   | Your Code Under Test|   |
      |   | (Pure Logic Module) |   |
      |   +----------+----------+   |
      |              |              |
      |              | Calls        |
      |   +----------v----------+   |
      |   | Mock Hardware Layer |<--+ (Instead of real hardware)
      |   | (Returns test data) |   |
      |   +---------------------+   |
      +-----------------------------+
```

Here is a diagram showing a Hardware-in-the-Loop (HIL) setup.

```text
      +---------------------------+         +---------------------------+
      |      HIL SIMULATOR        |         |    DEVICE UNDER TEST (DUT)  |
      | (e.g., PC running Simulink)|         | (e.g., Flight Computer)     |
      |                           |         |                           |
      | +-----------------------+ | Simulates | +-----------------------+ |
      | | Physics/Environment   | | Sensor    | | Sensor Input Interface| |
      | | Model (e.g., Rocket   | +-----------> | (e.g., ADC, SPI, CAN) | |
      | | Dynamics)             | | Data      | +-----------+-----------+ |
      | +----------+------------+ |           |             |             |
      |            ^              |           |   +---------v---------+   |
      |            | Updates      |           |   | Your Embedded App |   |
      |            | State        |           |   | (Control Logic)   |   |
      | +----------+------------+ |           |   +---------+---------+   |
      | | Actuator Model        | | Receives  |             |             |
      | | (e.g., Engine Gimbal) | <-----------+ | +-----------v-----------+ |
      | +-----------------------+ | Command   | | Actuator Output Drv   | |
      |                           |           | | (e.g., PWM, DAC)    | |
      +---------------------------+           | +-----------------------+ |
                                              +---------------------------+
```

## Memory technique — remember this forever
1.  **Mnemonic:** "**U**nits on the **H**ost, **H**ardware **I**n the **L**oop." Think "**U**ncle **H**ank's **HIL**l." First, you visit Uncle Hank (easy, on the host). Then you climb the big hill (hard, with the real hardware). The progression is from easy/isolated to hard/integrated.

2.  **Facts to overlearn:**
    *   **Unit Test on Host:** Tests *algorithmic logic* in isolation by *mocking hardware dependencies*. It is fast, cheap, and finds logic bugs early.
    *   **HIL Test:** Tests *timing, hardware interaction, and dynamic response* by connecting the *real target hardware* to a *simulated environment*. It is slow, expensive, and finds integration and real-time bugs.

3.  **Spaced-repetition schedule:** Review these two definitions and the diagrams.
    *   In 24 hours (1 day)
    *   In 3 days
    *   In 7 days
    *   In 16 days
    *   In 35 days

4.  **First principles pathway:** If you forget, start from this question: "How can I prove my algorithm is correct without needing the final, physical hardware?" The answer is you must *isolate* the algorithm from the hardware. To do that, you must replace the hardware calls with fakes (mocks). That is host-based unit testing. Then ask, "Now that the logic is proven, how do I prove it works *with* the real hardware's timing and electrical properties?" The answer is you must connect the real hardware to something that *pretends* to be the world. That is HIL.

## Common mistakes
1.  **Testing implementation details, not behavior.** A test should verify that `convert_adc_to_voltage(2048)` returns `1.65V`. It should not check if the code uses a `const float` for `V_REF`. If you refactor the code and the test breaks, but the behavior is still correct, your test is too brittle.
2.  **Ignoring compiler and architecture differences.** Code can behave differently when compiled with GCC on an x86 host versus ARM-GCC for a Cortex-M4 target. Integer sizes, endianness, and floating-point precision can vary. A test that passes on the host is not a guarantee it will pass on the target, it's just a test of the pure logic.
3.  **Writing non-deterministic tests.** A test that relies on `time()` or random numbers without a fixed seed will sometimes pass and sometimes fail. Tests must be 100% repeatable.
4.  **Inaccurate HIL models.** Your HIL test is only as good as your simulation. If your model of a rocket's aerodynamics is wrong, your flight software might pass all HIL tests and still fail in the real world. This is the "garbage in, garbage out" principle applied to testing.

## Self-check
1.  You are writing the software for a satellite's battery management system. Which testing method (unit test on host or HIL) would you use to verify the correctness of the algorithm that calculates the battery's state-of-charge (SoC) from a voltage and current reading? Which method would you use to verify that the system correctly shuts down a payload when the battery voltage drops below a threshold in real-time? Justify your answers.
2.  Consider a function `int32_t run_pid_controller(int32_t setpoint, int32_t process_variable)`. This function internally calls three other functions: `int32_t read_encoder(void)`, `void set_motor_pwm(int32_t value)`, and `uint64_t get_system_time_us(void)`. Describe the mocks you would need to write to unit test the PID logic on your host computer. What state would your mocks need to maintain?
3.  Your team is running a HIL test for a rover's autonomous navigation software. The test involves the rover navigating a simulated Martian terrain. The test fails: the rover software commands the wheels to turn left, but the HIL simulation shows the rover turning right and hitting an obstacle. List at least three distinct possible root causes for this failure, separating them by where the fault might lie (DUT software, HIL simulator, or the interface between them).