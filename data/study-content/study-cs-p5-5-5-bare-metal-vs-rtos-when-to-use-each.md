## 1. What it is — in plain English

Imagine you have a tiny computer, much smaller than your phone or laptop, designed to do one or a few very specific jobs, like controlling a microwave oven or a car's anti-lock brakes. This tiny computer is called a microcontroller.

Now, imagine you want to program this microcontroller. "Bare-metal" programming is like building a house from scratch with just raw materials: wood, nails, bricks, and your own hands. You write every single line of code that interacts directly with the microcontroller's hardware – turning pins on and off, reading sensors, managing memory, and deciding when to do what. There's no "operating system" helping you; you are the operating system. It gives you ultimate control and efficiency, but you have to manage everything yourself.

An "RTOS" (pronounced "ARE-toss") stands for Real-Time Operating System. Think of it as a very specialized, tiny construction manager for your microcontroller. Instead of building everything from raw materials, you tell the RTOS what tasks need to be done (e.g., "read this sensor," "blink that light," "send data over the network"). The RTOS then takes care of scheduling these tasks, making sure they run in the right order, at the right time, and don't step on each other's toes. The "Real-Time" part means it's designed to respond to events within very strict, predictable time limits, which is crucial for things like controlling robots or medical devices where delays can be dangerous.

So, bare-metal is direct, hands-on control with no middleman, while an RTOS is a helpful, predictable manager that organizes your code into independent "tasks" and handles the tricky timing and resource sharing for you.

## 2. Why it matters — real-world applications

The choice between bare-metal and an RTOS is fundamental in embedded systems design, impacting performance, development time, cost, and reliability. Here are some real-world applications:

1.  **Medical Devices (Pacemakers vs. MRI Machines):**
    *   **Pacemakers (Bare-metal):** These devices need extreme reliability, minimal power consumption, and predictable, simple operation. A bare-metal approach allows for a very small, highly optimized codebase with no overhead from an operating system. The core function – monitoring heart rhythm and delivering electrical pulses – is simple enough to be managed by a carefully crafted super-loop and interrupt service routines, ensuring absolute determinism and long battery life.
    *   **MRI Machines (RTOS):** Magnetic Resonance Imaging machines involve complex sequences of magnetic field pulses, radio frequency transmission, signal acquisition, and massive data processing for image reconstruction. This requires managing many concurrent operations, network communication, user interfaces, and potentially multiple processors. An RTOS (like VxWorks or QNX) is essential to coordinate these complex, time-critical tasks, ensuring that data acquisition happens precisely when needed while other tasks handle user input and data storage.

2.  **Automotive Systems (Engine Control Units vs. Infotainment Systems):**
    *   **Anti-lock Braking Systems (ABS) / Electronic Stability Control (ESC) (Bare-metal or highly specialized RTOS kernel with minimal features):** These systems demand immediate, deterministic responses to sensor inputs (wheel speed, steering angle) to prevent skidding. The core control loops are often implemented bare-metal or on a very lean, safety-certified RTOS kernel (like OSEK/VDX) to guarantee response times in microseconds. The focus is on minimal latency and absolute predictability, often achieved by directly handling interrupts and tightly controlling execution flow.
    *   **Infotainment Systems (RTOS/Embedded Linux):** Modern car infotainment systems run navigation, media playback, Bluetooth, Wi-Fi, and integrate with smartphones. These are complex, multi-functional systems that require a robust operating system (often an RTOS like QNX, or even embedded Linux) to manage multiple applications, a graphical user interface, network stacks, and various peripherals. The strict real-time requirements are less about microsecond responses and more about a smooth user experience and reliable multi-tasking.

3.  **Aerospace & Defense (Flight Control Systems):**
    *   **SpaceX Falcon 9 Flight Computers (RTOS - specifically, a custom Linux-based RTOS for higher-level control, bare-metal for low-level safety-critical tasks):** While SpaceX uses a custom version of Linux for many of its flight computers, the underlying hardware interaction, especially for critical sensor readings and actuator control loops, often involves highly optimized, deterministic code that behaves very much like bare-metal, or is managed by a very thin RTOS layer. The need for precise timing in engine thrust vectoring, attitude control, and stage separation mandates real-time predictability. High-level mission planning and telemetry might run on a more feature-rich RTOS, showcasing a hybrid approach where different parts of the system use what's most appropriate.

4.  **Industrial Automation (PLCs vs. Robotics Controllers):**
    *   **Simple Programmable Logic Controllers (PLCs) (Bare-metal or extremely lightweight RTOS):** For basic industrial control tasks like turning on/off motors, reading switches, and operating within a fixed cycle time, many PLCs use bare-metal programming. Their primary loop polls inputs, executes logic, and updates outputs, providing highly predictable and robust operation in harsh industrial environments.
    *   **Advanced Robotics Controllers (RTOS):** Industrial robots require precise, synchronized control of multiple motors, real-time sensor feedback (vision, force), path planning, and communication with other machines. An RTOS (e.g., VxWorks, RT-Linux) is crucial for managing the complex interplay of these tasks, ensuring that joint movements are coordinated and executed within strict timeframes to achieve accurate and repeatable motion.

## 3. Prerequisites — what you must know first

Before diving deep into bare-metal vs. RTOS, you should have a solid grasp of these foundational concepts:

*   **Microcontrollers (MCUs) / Microprocessors (MPUs) Basics:** Understand what these chips are, their core components (CPU, RAM, ROM, peripherals), and how they execute instructions.
*   **Memory Architecture (RAM, ROM, Flash):** Differentiate between volatile (RAM) and non-volatile (ROM/Flash) memory, and understand their roles in storing code and data.
*   **Registers:** Knowledge of how hardware features are controlled by writing to and reading from special memory addresses called registers.
*   **Input/Output (I/O) Peripherals:** Familiarity with common peripherals like General Purpose Input/Output (GPIO), UART, SPI, I2C, ADC, DAC, and how to interact with them.
*   **Interrupts:** Understand what an interrupt is, how it pauses normal program execution to handle an urgent event, Interrupt Service Routines (ISRs), and interrupt priority levels.
*   **Timers:** How hardware timers can generate periodic events, measure time intervals, or create delays.
*   **Basic C Programming:** Proficiency in C, including pointers, memory management (stack, heap), function calls, data structures, and bitwise operations, as most embedded code is written in C (or C++).
*   **Concurrency & Parallelism (Conceptual):** The idea of multiple operations seemingly happening "at the same time," even if a single CPU is rapidly switching between them (concurrency), or truly simultaneously on multiple cores (parallelism).
*   **Operating System Fundamentals (Conceptual):** A general understanding of what an operating system does (resource management, process/thread scheduling, memory management, file systems, device drivers), even if not in the context of real-time.

## 4. The core idea — step by step

Let's break down the fundamental differences between bare-metal and RTOS programming, building intuition step by step.

### Step 1: The Hardware Foundation & Direct Control

**Plain-English Statement:** Both bare-metal and RTOS code ultimately run on the same physical microcontroller hardware. The key difference is how your code *talks* to that hardware. In bare-metal, your code speaks directly to the hardware components. With an RTOS, there's a middleman.

**Small Concrete Example:** Imagine you want to turn on an LED connected to a specific pin (e.g., GPIO Port A, Pin 5) of your microcontroller.
*   **Bare-metal:** You would write C code that directly accesses the microcontroller's memory-mapped registers to configure that pin as an output and then set its voltage high.
    ```c
    // Example for a hypothetical microcontroller
    #define GPIOA_BASE_ADDR 0x40020000 // Base address of GPIO Port A
    #define GPIOA_MODER     *(volatile unsigned int *)(GPIOA_BASE_ADDR + 0x00) // Mode Register
    #define GPIOA_ODR       *(volatile unsigned int *)(GPIOA_BASE_ADDR + 0x14) // Output Data Register

    // Configure Pin 5 as output (e.g., set bits 11:10 to 01b for output mode)
    GPIOA_MODER |= (1 << 10);
    GPIOA_MODER &= ~(1 << 11);

    // Set Pin 5 high (turn LED on)
    GPIOA_ODR |= (1 << 5);
    ```
*   **RTOS:** While an RTOS doesn't *directly* stop you from doing the above, typically you'd use a hardware abstraction layer (HAL) or device driver provided by the microcontroller vendor or the RTOS ecosystem. This driver itself might be written bare-metal, but your RTOS *task* would call a higher-level function.
    ```c
    // Example using a HAL function within an RTOS task
    #include "stm32f4xx_hal.h" // Example for an STM32 microcontroller

    void LedBlinkTask(void *pvParameters) {
        // ... (initialization)
        HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_SET); // Turn LED on
        // ...
    }
    ```

**Formal/Mathematical Version:**
Let $R_x$ be a hardware register at memory address $A_x$.
*   **Bare-metal:** Direct memory access: $*((volatile\ unsigned\ int*)A_x) = \text{value}$.
*   **RTOS:** Access via an API: $f_{HAL}(P, V)$, where $P$ is a peripheral identifier and $V$ is a desired state. The function $f_{HAL}$ internally performs bare-metal register access.

**What Could Go Wrong:**
In bare-metal, directly manipulating registers requires deep knowledge of the microcontroller's datasheet. A single incorrect bit set or cleared can brick the device, cause unexpected behavior, or lead to hard-to-debug issues. The code is highly non-portable between different microcontrollers.

### Step 2: Task Execution — The Super-Loop vs. The Scheduler

**Plain-English Statement:** How do you make your microcontroller do multiple things? In bare-metal, you put everything in one big, endless loop and hope each action finishes quickly. With an RTOS, you break your program into independent "tasks," and the RTOS decides which task runs when.

**Small Concrete Example:** You need to blink an LED and also read a sensor periodically.
*   **Bare-metal (Super-loop):**
    ```c
    void main() {
        // Initialize hardware
        setup_led();
        setup_sensor();

        while (1) { // The infinite super-loop
            blink_led_logic(); // Check if it's time to toggle LED
            read_sensor_logic(); // Check if it's time to read sensor
            process_data_logic(); // Process sensor data if available
            // ... more logic ...
        }
    }
    ```
    Here, `blink_led_logic()` and `read_sensor_logic()` must be non-blocking. If `read_sensor_logic()` takes too long, the LED blinking will be delayed.
*   **RTOS (Tasks & Scheduler):**
    ```c
    // Task 1: Blinks an LED
    void LedBlinkTask(void *pvParameters) {
        setup_led();
        for (;;) { // Infinite loop for the task
            toggle_led();
            vTaskDelay(pdMS_TO_TICKS(500)); // Wait for 500ms, allowing other tasks to run
        }
    }

    // Task 2: Reads a sensor
    void SensorReadTask(void *pvParameters) {
        setup_sensor();
        for (;;) {
            read_sensor();
            process_sensor_data();
            vTaskDelay(pdMS_TO_TICKS(100)); // Wait for 100ms
        }
    }

    void main() {
        // Initialize RTOS and create tasks
        xTaskCreate(LedBlinkTask, "LED Blinker", 128, NULL, 1, NULL);
        xTaskCreate(SensorReadTask, "Sensor Reader", 256, NULL, 2, NULL);
        vTaskStartScheduler(); // Start the RTOS scheduler
        for (;;) {} // Should never reach here
    }
    ```
    The RTOS scheduler will switch between `LedBlinkTask` and `SensorReadTask` based on their priorities and when they are ready to run, ensuring both progress without one blocking the other indefinitely.

**Formal/Mathematical Version:**
*   **Bare-metal:** A single control flow path:
    $$ \mathcal{C} = \text{Init} \rightarrow \text{Loop}(\text{Task}_1, \text{Task}_2, \ldots, \text{Task}_n) $$
    where $\text{Task}_i$ must complete within a specific slice of the loop iteration time $T_{loop}$. If any $\text{Task}_i$ blocks, the entire loop blocks.
*   **RTOS:** Multiple concurrent control flow paths (tasks) managed by a scheduler $S$:
    $$ \mathcal{T} = \{T_1, T_2, \ldots, T_n\} $$
    The scheduler $S$ selects a task $T_j \in \mathcal{T}$ to execute at any given time, based on scheduling policy (e.g., priority-based preemption). Each task $T_j$ has its own stack and execution context.

**What Could Go Wrong:**
In a bare-metal super-loop, if one function takes too long (e.g., waiting for an I/O operation), it delays all other functions. This makes timing unpredictable and can lead to missed deadlines for critical operations. In an RTOS, tasks can still block if not designed carefully, but the RTOS provides mechanisms to manage this. The RTOS itself introduces overhead (CPU cycles, memory) that bare-metal avoids.

### Step 3: Time Management — Polling vs. Timers/Events

**Plain-English Statement:** How do you make things happen at specific times? Bare-metal often involves constantly checking ("polling") if it's time, or using simple delays that stop everything. An RTOS provides sophisticated ways to wait for specific durations or events without stopping other tasks.

**Small Concrete Example:** You want to perform an action precisely every 10 milliseconds.
*   **Bare-metal (Polling/Busy-waiting):**
    ```c
    unsigned long last_time = 0;
    void main() {
        // ...
        while (1) {
            if (get_current_time_ms() - last_time >= 10) {
                perform_action();
                last_time = get_current_time_ms();
            }
            // Other tasks in the loop
        }
    }
    // A blocking delay function
    void delay_ms(unsigned int ms) {
        for (unsigned int i = 0; i < ms * 10000; i++); // Approximate delay
    }
    ```
    The `get_current_time_ms()` relies on a hardware timer interrupt to update a global counter. The `delay_ms` function literally wastes CPU cycles.
*   **RTOS (Task Delays/Timers):**
    ```c
    void PeriodicTask(void *pvParameters) {
        for (;;) {
            perform_action();
            vTaskDelay(pdMS_TO_TICKS(10)); // Suspend task for 10ms, allow other tasks to run
        }
    }

    // Or using an RTOS software timer for more complex periodic events
    void MyTimerCallback(TimerHandle_t xTimer) {
        // This function executes when the software timer expires
        perform_action_on_timer();
    }
    // In main or another task:
    // TimerHandle_t xTimer = xTimerCreate("MyTimer", pdMS_TO_TICKS(10), pdTRUE, NULL, MyTimerCallback);
    // xTimerStart(xTimer, 0);
    ```
    `vTaskDelay` puts the current task to sleep, allowing the scheduler to run other tasks. When the delay expires, the task becomes ready again. RTOS software timers are managed by the RTOS and can trigger functions (callbacks) periodically.

**Formal/Mathematical Version:**
*   **Bare-metal:** Time management is often based on:
    1.  Busy-waiting: $\text{CPU\_cycles} \approx f(\text{delay\_ms})$. This consumes 100% CPU.
    2.  Polling a global time variable updated by an interrupt: $T_{current} - T_{last} \geq \Delta t$.
*   **RTOS:** Time management is based on the scheduler's internal tick:
    1.  Task suspension: $T_{task\_resume} = T_{current\_tick} + \text{ticks\_to\_wait}$. The CPU is free to run other tasks during the wait.
    2.  Software timers: A timer queue is maintained, and callbacks are triggered by the scheduler upon expiration.

**What Could Go Wrong:**
Bare-metal busy-waiting wastes CPU cycles that could be used for other useful work, and its accuracy depends on CPU clock speed and compiler optimizations. Polling can introduce jitter if the loop takes varying amounts of time. RTOS delays are generally more accurate and non-blocking, but the "real-time" accuracy depends on the RTOS's tick rate and scheduling overhead.

### Step 4: Resource Sharing — None vs. OS Primitives

**Plain-English Statement:** What if two parts of your code need to use the same thing, like a shared piece of memory or a communication port? In bare-metal, you have to manually make sure they don't interfere. An RTOS provides special tools to safely share resources.

**Small Concrete Example:** Two different parts of your code (or tasks) need to update a global counter.
*   **Bare-metal (Manual protection with interrupts):**
    ```c
    volatile int shared_counter = 0;

    void update_counter_function_1() {
        // Disable interrupts to prevent another function/ISR from corrupting shared_counter
        disable_interrupts();
        shared_counter++;
        enable_interrupts();
    }

    void update_counter_function_2() {
        disable_interrupts();
        shared_counter++;
        enable_interrupts();
    }
    ```
    Disabling interrupts works, but it can miss critical events if interrupts are disabled for too long.
*   **RTOS (Mutexes/Semaphores):**
    ```c
    #include "FreeRTOS.h"
    #include "semphr.h" // For mutexes

    volatile int shared_counter = 0;
    SemaphoreHandle_t xMutex; // Declare a mutex

    void Task1(void *pvParameters) {
        xMutex = xSemaphoreCreateMutex(); // Create mutex (usually once during init)
        for (;;) {
            // ...
            if (xSemaphoreTake(xMutex, portMAX_DELAY) == pdTRUE) { // Acquire mutex
                shared_counter++; // Safely update shared resource
                xSemaphoreGive(xMutex); // Release mutex
            }
            vTaskDelay(pdMS_TO_TICKS(100));
        }
    }

    void Task2(void *pvParameters) {
        for (;;) {
            // ...
            if (xSemaphoreTake(xMutex, portMAX_DELAY) == pdTRUE) { // Acquire mutex
                shared_counter++; // Safely update shared resource
                xSemaphoreGive(xMutex); // Release mutex
            }
            vTaskDelay(pdMS_TO_TICKS(200));
        }
    }
    ```
    The mutex ensures that only one task can access `shared_counter` at a time. If Task2 tries to take the mutex while Task1 holds it, Task2 will block until Task1 releases it.

**Formal/Mathematical Version:**
Let $R$ be a shared resource.
*   **Bare-metal:** Critical sections are protected by disabling interrupts:
    $$ \text{DisableInterrupts()} \rightarrow \text{Access}(R) \rightarrow \text{EnableInterrupts()} $$
    This assumes a single CPU. On multi-core, more complex atomic operations are needed.
*   **RTOS:** Critical sections are protected by synchronization primitives (mutexes, semaphores):
    $$ \text{AcquireMutex}(M) \rightarrow \text{Access}(R) \rightarrow \text{ReleaseMutex}(M) $$
    The scheduler ensures that only the task holding the mutex can execute the critical section.

**What Could Go Wrong:**
In bare-metal, forgetting to disable/enable interrupts, or disabling them for too long, leads to race conditions (data corruption) or missed critical events. In an RTOS, incorrect use of mutexes can lead to deadlocks (tasks waiting indefinitely for each other) or priority inversion (a high-priority task being blocked by a low-priority task holding a resource).

### Step 5: Determinism and Real-Time

**Plain-English Statement:** "Real-time" means things happen predictably within a guaranteed time. Bare-metal can be very predictable for simple systems, but it's hard to maintain as complexity grows. An RTOS is *designed* for predictability, even with many tasks, but it adds a small, consistent overhead.

**Small Concrete Example:** An urgent sensor reading must be processed within 100 microseconds of an event.
*   **Bare-metal:** You would use a high-priority interrupt. The Interrupt Service Routine (ISR) would directly read the sensor and perform the processing. The latency would be the interrupt latency (hardware + minimal software overhead) plus the ISR execution time.
    ```c
    void EXTI_IRQHandler() { // External Interrupt Handler
        // Clear interrupt flag
        read_sensor_value_fast();
        process_sensor_value_fast(); // Must be very short!
    }
    ```
*   **RTOS:** An interrupt would still occur, but the ISR might be very short, just signaling an RTOS task to do the heavy processing. The RTOS scheduler would then immediately switch to the high-priority task.
    ```c
    void EXTI_IRQHandler() {
        // Clear interrupt flag
        BaseType_t xHigherPriorityTaskWoken = pdFALSE;
        xSemaphoreGiveFromISR(xSensorEventSemaphore, &xHigherPriorityTaskWoken); // Signal task
        portYIELD_FROM_ISR(xHigherPriorityTaskWoken); // Request context switch if higher prio task woken
    }

    void SensorProcessTask(void *pvParameters) {
        for (;;) {
            xSemaphoreTake(xSensorEventSemaphore, portMAX_DELAY); // Wait for event from ISR
            read_sensor_value();
            process_sensor_value();
        }
    }
    ```
    The latency here includes interrupt latency, ISR execution, RTOS context switch time, and task execution time. The RTOS guarantees that `SensorProcessTask` will run as soon as possible, but the total time is slightly higher than a pure bare-metal ISR.

**Formal/Mathematical Version:**
Let $L$ be the latency (time from event to start of processing).
*   **Bare-metal:** $L_{BM} = T_{int\_hw} + T_{isr\_setup} + T_{isr\_exec}$. This is typically minimal.
*   **RTOS:** $L_{RTOS} = T_{int\_hw} + T_{isr\_setup} + T_{isr\_signal} + T_{context\_switch} + T_{task\_exec\_start}$.
    Crucially, an RTOS aims for *bounded* latency, meaning $L_{RTOS} \le L_{max}$ is guaranteed, even if $L_{RTOS} > L_{BM}$. This is the definition of a **Hard Real-Time** system.

**What Could Go Wrong:**
In bare-metal, if the main loop or another interrupt disables interrupts for too long, the critical event's processing might be delayed beyond its deadline. In an RTOS, the added overhead of context switching and scheduling can increase the *minimum* latency, but the RTOS guarantees the *maximum* latency (determinism), provided the system is properly designed and analyzed (e.g., using Rate Monotonic Analysis). Incorrect priority assignments or blocking calls within high-priority tasks can lead to missed deadlines.

### Step 6: Development Complexity & Debugging

**Plain-English Statement:** Building a simple system is easier bare-metal. Building a complex system with many moving parts is easier with an RTOS. Debugging bare-metal complex timing issues is a nightmare; an RTOS gives you tools to see what's happening.

**Small Concrete Example:** You have 10 different features (sensors, communication, UI, motor control) that need to run concurrently.
*   **Bare-metal:** You'd have one giant `while(1)` loop with many `if (time_to_do_X()) { do_X(); }` checks. Managing the timing, state, and interactions between these 10 features becomes incredibly difficult and error-prone. Debugging a timing issue often involves adding print statements or toggling GPIOs to manually trace execution flow.
*   **RTOS:** You'd create 10 separate tasks, each responsible for one feature. The RTOS handles the scheduling, context switching, and resource protection. Debugging tools (like a task viewer in an IDE or a trace recorder) allow you to see which task is running when, its state, stack usage, and inter-task communication, making complex issues much easier to diagnose.

**Formal/Mathematical Version:**
Let $N$ be the number of concurrent functionalities.
*   **Bare-metal:** Development complexity $C_{BM} \propto N^2$ (due to interdependencies and manual scheduling). Debugging complexity $D_{BM} \propto N^3$ (due to non-deterministic interactions and lack of visibility).
*   **RTOS:** Development complexity $C_{RTOS} \propto N \log N$ (due to modularity and OS services). Debugging complexity $D_{RTOS} \propto N$ (due to OS-provided visibility and structured concurrency). These are heuristic estimations, not rigorous proofs.

**What Could Go Wrong:**
For bare-metal, the "spaghetti code" problem quickly emerges. Adding a new feature might break existing timing or introduce subtle bugs. For an RTOS, there's a steeper initial learning curve (understanding tasks, mutexes, semaphores, message queues). Incorrect RTOS configuration or misuse of its primitives can introduce its own set of complex bugs (deadlocks, priority inversion, stack overflows).

## 5. Worked examples — multiple, with every step shown

We will use a simplified C-like syntax for microcontroller interaction, assuming basic GPIO and timer registers. For RTOS examples, we'll use FreeRTOS, a popular choice.

---

### Example 1 (Easy - Bare-metal): Blink an LED every 500ms

**Problem:** Write a bare-metal program to continuously toggle an LED connected to `GPIO_PIN_0` of `PORTA` every 500 milliseconds.

**Given:**
*   A microcontroller with `PORTA` and `GPIO_PIN_0`.
*   A system clock running at a known frequency (e.g., 1MHz for simplicity in delay calculation).
*   LED connected to `PORTA_PIN_0`.

**What we want:** An infinite loop that toggles the LED with a 500ms period.

**Solution:**

1.  **Define hardware registers:** We need to define the base address for `PORTA`, a register to configure the pin as output (e.g., `GPIOA_DIR` for direction), and a register to control its state (e.g., `GPIOA_DATA` for output data).
    ```c
    #define GPIOA_BASE      0x40000000 // Hypothetical base address for PORTA
    #define GPIOA_DIR       *((volatile unsigned int *)(GPIOA_BASE + 0x00)) // Direction register
    #define GPIOA_DATA      *((volatile unsigned int *)(GPIOA_BASE + 0x04)) // Data register
    #define LED_PIN         (1 << 0) // Pin 0
    ```
    *   **Explanation:** These lines define memory-mapped addresses for controlling the GPIO port. `volatile` tells the compiler not to optimize away accesses to these addresses, as their contents can change externally. `(1 << 0)` creates a bitmask for Pin 0.

2.  **Initialize the LED pin:** Configure `GPIO_PIN_0` as an output.
    ```c
    void setup_led() {
        GPIOA_DIR |= LED_PIN; // Set Pin 0 as output (assuming 1 means output)
    }
    ```
    *   **Explanation:** We set the corresponding bit in the `GPIOA_DIR` register. This prepares the pin to drive the LED.

3.  **Create a simple blocking delay function:** This function will consume CPU cycles to wait for a specified number of milliseconds.
    ```c
    void delay_ms(unsigned int ms) {
        // This is a very rough, CPU-dependent busy-wait delay.
        // For a 1MHz CPU, approximately 1000 cycles per ms.
        // Adjust constant for actual CPU frequency.
        unsigned long i;
        for (i = 0; i < ms * 1000; i++) {
            // Do nothing, just consume cycles
            asm("nop"); // No operation instruction
        }
    }
    ```
    *   **Explanation:** This loop runs `ms * 1000` times. Each iteration takes a few CPU cycles. `asm("nop")` ensures the loop body isn't optimized away entirely. This is a blocking call, meaning the CPU does nothing else during this delay.

4.  **Implement the main program loop:**
    ```c
    int main() {
        setup_led(); // Initialize the LED pin

        while (1) { // Infinite loop
            GPIOA_DATA |= LED_PIN;  // Turn LED ON (set pin high)
            delay_ms(500);          // Wait for 500ms
            GPIOA_DATA &= ~LED_PIN; // Turn LED OFF (set pin low)
            delay_ms(500);          // Wait for 500ms
        }
        return 0; // Should never be reached
    }
    ```
    *   **Explanation:** The `while(1)` creates an infinite loop. Inside, we first set the `LED_PIN` bit in the `GPIOA_DATA` register to turn the LED on, then call our blocking delay. After the delay, we clear the `LED_PIN` bit to turn the LED off, and delay again. This creates the 500ms on, 500ms off blinking pattern.

**Final Answer:**
```c
// Hypothetical hardware register definitions
#define GPIOA_BASE      0x40000000
#define GPIOA_DIR       *((volatile unsigned int *)(GPIOA_BASE + 0x00))
#define GPIOA_DATA      *((volatile unsigned int *)(GPIOA_BASE + 0x04))
#define LED_PIN         (1 << 0)

// Function to configure the LED pin as output
void setup_led() {
    GPIOA_DIR |= LED_PIN;
}

// Blocking delay function (CPU-dependent)
void delay_ms(unsigned int ms) {
    unsigned long i;
    for (i = 0; i < ms * 1000; i++) {
        asm("nop");
    }
}

int main() {
    setup_led(); // Initialize the LED pin

    while (1) { // Infinite loop
        GPIOA_DATA |= LED_PIN;  // Turn LED ON
        delay_ms(500);          // Wait 500ms
        GPIOA_DATA &= ~LED_PIN; // Turn LED OFF
        delay_ms(500);          // Wait 500ms
    }
    return 0;
}
```

**Reflection:** This example demonstrates the simplicity of bare-metal for single, sequential tasks. The `delay_ms` function is its biggest weakness; it's inaccurate and prevents the CPU from doing *anything* else during the delay. If we added another task, say reading a button, it would be delayed by this `delay_ms` call.

---

### Example 2 (Medium - Bare-metal with Interrupt): Blink LED on Timer, Toggle another on Button

**Problem:** Continuously blink an LED (LED1 on `PORTA_PIN_0`) every 250ms using a hardware timer interrupt. Additionally, toggle another LED (LED2 on `PORTA_PIN_1`) whenever a button connected to `PORTB_PIN_0` is pressed (detected by an external interrupt).

**Given:**
*   Microcontroller with `PORTA_PIN_0` (LED1), `PORTA_PIN_1` (LED2), `PORTB_PIN_0` (Button).
*   A hardware Timer peripheral (e.g., `TIMER0`) capable of generating periodic interrupts.
*   An External Interrupt Controller (e.g., `EXTI`) for button press.
*   System clock at 1MHz.

**What we want:**
1.  LED1 blinks every 250ms, driven by `TIMER0` interrupt.
2.  LED2 toggles on each press of the button, driven by `EXTI` interrupt.

**Solution:**

1.  **Define hardware registers and pins:**
    ```c
    // Hypothetical GPIO registers
    #define GPIOA_BASE      0x40000000
    #define GPIOA_DIR       *((volatile unsigned int *)(GPIOA_BASE + 0x00))
    #define GPIOA_DATA      *((volatile unsigned int *)(GPIOA_BASE + 0x04))
    #define GPIOB_BASE      0x40000100
    #define GPIOB_DIR       *((volatile unsigned int *)(GPIOB_BASE + 0x00))
    // No GPIOB_DATA needed for input, we'll use an EXTI register for button state

    #define LED1_PIN        (1 << 0) // PORTA_PIN_0
    #define LED2_PIN        (1 << 1) // PORTA_PIN_1
    #define BUTTON_PIN      (1 << 0) // PORTB_PIN_0

    // Hypothetical Timer0 registers
    #define TIMER0_BASE     0x40010000
    #define TIMER0_CTRL     *((volatile unsigned int *)(TIMER0_BASE + 0x00)) // Control register
    #define TIMER0_PRESCALER *((volatile unsigned int *)(TIMER0_BASE + 0x04)) // Prescaler register
    #define TIMER0_COMPARE  *((volatile unsigned int *)(TIMER0_BASE + 0x08)) // Compare value register
    #define TIMER0_COUNT    *((volatile unsigned int *)(TIMER0_BASE + 0x0C)) // Current count register
    #define TIMER0_INT_FLAG *((volatile unsigned int *)(TIMER0_BASE + 0x10)) // Interrupt flag register

    // Hypothetical External Interrupt (EXTI) registers
    #define EXTI_BASE       0x40020000
    #define EXTI_ENABLE     *((volatile unsigned int *)(EXTI_BASE + 0x00)) // Enable register
    #define EXTI_TRIGGER    *((volatile unsigned int *)(EXTI_BASE + 0x04)) // Trigger register (e.g., rising edge)
    #define EXTI_FLAG       *((volatile unsigned int *)(EXTI_BASE + 0x08)) // Interrupt flag register
    #define EXTI_LINE_0     (1 << 0) // EXTI Line for PORTB_PIN_0

    // Hypothetical Global Interrupt Enable/Disable
    #define enable_interrupts()  __asm("cpsie i") // ARM Cortex-M instruction
    #define disable_interrupts() __asm("cpsid i") // ARM Cortex-M instruction
    ```
    *   **Explanation:** We define all necessary GPIO, Timer, and EXTI registers. `cpsie i` and `cpsid i` are common assembly instructions for ARM Cortex-M to enable/disable global interrupts.

2.  **Global state variables:**
    ```c
    volatile unsigned int timer_tick_count = 0;
    ```
    *   **Explanation:** `volatile` is crucial here. The `timer_tick_count` is modified by an interrupt service routine and read by the main loop (or other parts of the code). `volatile` prevents the compiler from optimizing away reads/writes, ensuring the most up-to-date value is always used.

3.  **Setup functions:**
    ```c
    void setup_gpios() {
        GPIOA_DIR |= (LED1_PIN | LED2_PIN); // Set LED pins as outputs
        GPIOB_DIR &= ~BUTTON_PIN;          // Set Button pin as input (assuming 0 means input)
        // Initial state: LEDs off
        GPIOA_DATA &= ~(LED1_PIN | LED2_PIN);
    }

    void setup_timer0() {
        // Configure TIMER0 for 1ms tick (assuming 1MHz clock)
        // Prescaler: 1MHz / 1000 = 1kHz (1ms period)
        TIMER0_PRESCALER = 999; // (1MHz / (999+1)) = 1kHz
        TIMER0_COMPARE = 1;     // Interrupt every 1 tick of the prescaled clock (i.e., every 1ms)
        TIMER0_CTRL |= (1 << 0); // Enable timer (hypothetical bit)
        // Enable Timer0 interrupt in NVIC (Nested Vectored Interrupt Controller) - not shown explicitly
    }

    void setup_exti() {
        // Configure EXTI Line 0 for PORTB_PIN_0, rising edge trigger
        EXTI_ENABLE |= EXTI_LINE_0;     // Enable EXTI Line 0
        EXTI_TRIGGER |= EXTI_LINE_0;    // Set to rising edge trigger
        // Enable EXTI Line 0 interrupt in NVIC - not shown explicitly
    }
    ```
    *   **Explanation:** These functions configure the respective hardware peripherals. For the timer, we set a prescaler and compare value to generate an interrupt every 1ms. For the EXTI, we enable the specific line and configure it to trigger on a rising edge (button press).

4.  **Interrupt Service Routines (ISRs):**
    ```c
    // Timer0 Interrupt Service Routine (called every 1ms)
    void TIMER0_IRQHandler() {
        TIMER0_INT_FLAG = (1 << 0); // Clear timer interrupt flag (hypothetical bit)
        timer_tick_count++;         // Increment global tick count

        // LED1 blink logic (every 250ms = 250 ticks)
        if (timer_tick_count % 250 == 0) {
            GPIOA_DATA ^= LED1_PIN; // Toggle LED1
        }
    }

    // EXTI Line 0 Interrupt Service Routine (called on button press)
    void EXTI0_IRQHandler() {
        EXTI_FLAG = EXTI_LINE_0; // Clear EXTI Line 0 interrupt flag

        // Toggle LED2
        GPIOA_DATA ^= LED2_PIN;
    }
    ```
    *   **Explanation:** These are the functions that the CPU jumps to when an interrupt occurs. They *must* be very fast and non-blocking. `TIMER0_IRQHandler` increments a global counter and toggles LED1 every 250 ticks (250ms). `EXTI0_IRQHandler` simply toggles LED2. Clearing the interrupt flag is critical to allow future interrupts.

5.  **Main program:**
    ```c
    int main() {
        disable_interrupts(); // Disable interrupts during setup

        setup_gpios();
        setup_timer0();
        setup_exti();

        enable_interrupts(); // Enable global interrupts

        while (1) {
            // Main loop can do other non-time-critical tasks
            // For this example, it's empty, but could poll other sensors, etc.
        }
        return 0;
    }
    ```
    *   **Explanation:** After disabling interrupts for safe initialization, we call all setup functions. Then, we enable global interrupts, allowing the ISRs to respond to hardware events. The `while(1)` loop is empty because all our tasks are handled by interrupts.

**Final Answer:**
```c
// Hypothetical GPIO registers
#define GPIOA_BASE      0x40000000
#define GPIOA_DIR       *((volatile unsigned int *)(GPIOA_BASE + 0x00))
#define GPIOA_DATA      *((volatile unsigned int *)(GPIOA_BASE + 0x04))
#define GPIOB_BASE      0x40000100
#define GPIOB_DIR       *((volatile unsigned int *)(GPIOB_BASE + 0x00))

#define LED1_PIN        (1 << 0) // PORTA_PIN_0
#define LED2_PIN        (1 << 1) // PORTA_PIN_1
#define BUTTON_PIN      (1 << 0) // PORTB_PIN_0

// Hypothetical Timer0 registers
#define TIMER0_BASE     0x40010000
#define TIMER0_CTRL     *((volatile unsigned int *)(TIMER0_BASE + 0x00))
#define TIMER0_PRESCALER *((volatile unsigned int *)(TIMER0_BASE + 0x04))
#define TIMER0_COMPARE  *((volatile unsigned int *)(TIMER0_BASE + 0x08))
#define TIMER0_COUNT    *((volatile unsigned int *)(TIMER0_BASE + 0x0C))
#define TIMER0_INT_FLAG *((volatile unsigned int *)(TIMER0_BASE + 0x10))

// Hypothetical External Interrupt (EXTI) registers
#define EXTI_BASE       0x40020000
#define EXTI_ENABLE     *((volatile unsigned int *)(EXTI_BASE + 0x00))
#define EXTI_TRIGGER    *((volatile unsigned int *)(EXTI_BASE + 0x04))
#define EXTI_FLAG       *((volatile unsigned int *)(EXTI_BASE + 0x08))
#define EXTI_LINE_0     (1 << 0)

// Hypothetical Global Interrupt Enable/Disable
#define enable_interrupts()  __asm("cpsie i")
#define disable_interrupts() __asm("cpsid i")

// Global volatile variable for timer ticks
volatile unsigned int timer_tick_count = 0;

void setup_gpios() {
    GPIOA_DIR |= (LED1_PIN | LED2_PIN); // Set LED pins as outputs
    GPIOB_DIR &= ~BUTTON_PIN;          // Set Button pin as input
    GPIOA_DATA &= ~(LED1_PIN | LED2_PIN); // Initial state: LEDs off
}

void setup_timer0() {
    TIMER0_PRESCALER = 999; // 1MHz / (999+1) = 1kHz -> 1ms tick
    TIMER0_COMPARE = 1;     // Interrupt every 1ms
    TIMER0_CTRL |= (1 << 0); // Enable timer
    // Assume NVIC setup for TIMER0 is handled elsewhere or by default
}

void setup_exti() {
    EXTI_ENABLE |= EXTI_LINE_0;     // Enable EXTI Line 0
    EXTI_TRIGGER |= EXTI_LINE_0;    // Set to rising edge trigger
    // Assume NVIC setup for EXTI0 is handled elsewhere or by default
}

// Timer0 Interrupt Service Routine (called every 1ms)
void TIMER0_IRQHandler() {
    TIMER0_INT_FLAG = (1 << 0); // Clear timer interrupt flag
    timer_tick_count++;

    if (timer_tick_count % 250 == 0) { // Every 250ms
        GPIOA_DATA ^= LED1_PIN; // Toggle LED1
    }
}

// EXTI Line 0 Interrupt Service Routine (called on button press)
void EXTI0_IRQHandler() {
    EXTI_FLAG = EXTI_LINE_0; // Clear EXTI Line 0 interrupt flag
    GPIOA_DATA ^= LED2_PIN;  // Toggle LED2
}

int main() {
    disable_interrupts(); // Disable interrupts during setup

    setup_gpios();
    setup_timer0();
    setup_exti();

    enable_interrupts(); // Enable global interrupts

    while (1) {
        // Main loop is now free for other non-time-critical tasks
        // Interrupts handle all the blinking and button pressing
    }
    return 0;
}
```

**Reflection:** This example shows how bare-metal systems can achieve concurrency using interrupts. The timer interrupt provides a periodic "heartbeat" for scheduled tasks, and external interrupts handle asynchronous events. The tricky part is ensuring ISRs are short and efficient, and that shared data (like `timer_tick_count` if it were accessed by `main`) is properly protected (e.g., by temporarily disabling interrupts around its access in `main`). The `main` loop is now truly "free" to do other things without affecting the timing of the LED blinks or button response, as long as it doesn't disable interrupts for too long.

---

### Example 3 (Harder - RTOS): Two Blinking LEDs with FreeRTOS

**Problem:** Implement two independent tasks using FreeRTOS. Task 1 (`Led1Task`) should blink `LED1` (`PORTA_PIN_0`) every 500ms. Task 2 (`Led2Task`) should blink `LED2` (`PORTA_PIN_1`) every 100ms.

**Given:**
*   A microcontroller capable of running FreeRTOS.
*   `LED1` on `PORTA_PIN_0` and `LED2` on `PORTA_PIN_1`.
*   FreeRTOS kernel configured and running.
*   A HAL (Hardware Abstraction Layer) or simple GPIO driver for the microcontroller (e.g., `HAL_GPIO_TogglePin`).

**What we want:** Two tasks running concurrently, each blinking its own LED at a specified rate.

**Solution:**

1.  **Include FreeRTOS headers and define pins:**
    ```c
    #include "FreeRTOS.h"
    #include "task.h" // For task creation and delays
    // Assume a HAL header like "stm32f4xx_hal.h" is included for GPIO functions
    // For simplicity, we'll use a generic HAL_GPIO_TogglePin function.

    // Define symbolic names for LEDs (assuming a HAL_GPIO_TypeDef and Pin number)
    #define LED1_GPIO_PORT  GPIOA
    #define LED1_GPIO_PIN   GPIO_PIN_0
    #define LED2_GPIO_PORT  GPIOA
    #define LED2_GPIO_PIN   GPIO_PIN_1
    ```
    *   **Explanation:** `FreeRTOS.h` and `task.h` provide the core FreeRTOS APIs. We define the LED pins using common HAL conventions.

2.  **Implement `Led1Task`:**
    ```c
    void Led1Task(void *pvParameters) {
        // Task initialization (e.g., configure LED1 pin as output)
        // This would typically be done in main or a board_init function before scheduler starts
        // For demonstration, assume HAL_GPIO_Init(LED1_GPIO_PORT, LED1_GPIO_PIN, GPIO_MODE_OUTPUT_PP, ...) already happened.

        for (;;) { // Infinite loop for the task
            HAL_GPIO_TogglePin(LED1_GPIO_PORT, LED1_GPIO_PIN); // Toggle LED1
            vTaskDelay(pdMS_TO_TICKS(500)); // Delay for 500ms
        }
    }
    ```
    *   **Explanation:** This function defines the behavior of `Led1Task`. `HAL_GPIO_TogglePin` is a placeholder for a function that toggles a GPIO pin. `vTaskDelay(pdMS_TO_TICKS(500))` tells the FreeRTOS scheduler to suspend this task for 500 milliseconds, allowing other tasks to run. `pdMS_TO_TICKS` converts milliseconds to RTOS ticks.

3.  **Implement `Led2Task`:**
    ```c
    void Led2Task(void *pvParameters) {
        // Task initialization (e.g., configure LED2 pin as output)
        // Assume HAL_GPIO_Init(LED2_GPIO_PORT, LED2_GPIO_PIN, GPIO_MODE_OUTPUT_PP, ...) already happened.

        for (;;) { // Infinite loop for the task
            HAL_GPIO_TogglePin(LED2_GPIO_PORT, LED2_GPIO_PIN); // Toggle LED2
            vTaskDelay(pdMS_TO_TICKS(100)); // Delay for 100ms
        }
    }
    ```
    *   **Explanation:** Similar to `Led1Task`, this task toggles `LED2` but delays for 100ms. Because `vTaskDelay` is non-blocking, both tasks will appear to run simultaneously.

4.  **Main function to create tasks and start scheduler:**
    ```c
    int main() {
        // System initialization (e.g., clock setup, HAL init, GPIO init for both LEDs)
        // This is where you would call setup_gpios() from previous examples.
        // For instance:
        // __HAL_RCC_GPIOA_CLK_ENABLE();
        // GPIO_InitTypeDef GPIO_InitStruct = {0};
        // GPIO_InitStruct.Pin = LED1_GPIO_PIN | LED2_GPIO_PIN;
        // GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
        // HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);

        // Create tasks
        xTaskCreate(
            Led1Task,       // Function that implements the task
            "LED1 Blinker", // Text name for the task (for debugging)
            128,            // Stack size for the task (in words, typically)
            NULL,           // Parameter passed to the task (none in this case)
            1,              // Priority of the task (0 is lowest)
            NULL            // Handle to the task (not used here)
        );

        xTaskCreate(
            Led2Task,       // Function that implements the task
            "LED2 Blinker", // Text name for the task
            128,            // Stack size
            NULL,           // Parameter
            2,              // Priority (higher than Led1Task)
            NULL            // Handle
        );

        vTaskStartScheduler(); // Start the FreeRTOS scheduler

        // Should never reach here, unless there's an error
        for (;;) {}
        return 0;
    }
    ```
    *   **Explanation:** The `main` function first performs necessary system-level initialization. Then, `xTaskCreate` is called for each task, registering them with the RTOS scheduler. `Led2Task` is given a higher priority (2) than `Led1Task` (1). Finally, `vTaskStartScheduler()` hands control over to FreeRTOS, which then begins executing the tasks according to their priorities and scheduling policy.

**Final Answer:**
```c
#include "FreeRTOS.h"
#include "task.h"
// Assume a HAL header for GPIO functions, e.g., "stm32f4xx_hal.h"
// For demonstration, we'll use a generic HAL_GPIO_TogglePin.
// You would replace these with your specific microcontroller's GPIO functions.

// --- Generic HAL-like GPIO functions for demonstration ---
// In a real project, these would be provided by your MCU vendor's HAL
typedef enum { GPIO_PIN_RESET = 0, GPIO_PIN_SET } GPIO_PinState;
void HAL_GPIO_TogglePin(void* GPIOx, unsigned int GPIO_Pin) {
    // Simulate toggling a pin by printing to console or actual hardware access
    static int pin_states[2] = {0, 0}; // For PIN_0 and PIN_1
    int pin_idx = (GPIO_Pin == (1<<0)) ? 0 : 1;
    pin_states[pin_idx] = !pin_states[pin_idx];
    // In a real system: GPIOx->ODR ^= GPIO_Pin;
    // printf("GPIO %p Pin %d toggled to %s\n", GPIOx, pin_idx, pin_states[pin_idx] ? "SET" : "RESET");
}
void HAL_GPIO_Init(void* GPIOx, unsigned int GPIO_Pin) {
    // Simulate GPIO initialization
    // In a real system: configure mode, speed, pull-up/down resistors
    // printf("GPIO %p Pin %d initialized as output\n", GPIOx, (GPIO_Pin == (1<<0)) ? 0 : 1);
}
// --- End Generic HAL-like GPIO functions ---


// Define symbolic names for LEDs
#define LED1_GPIO_PORT  ((void*)0x40020000) // Dummy address for GPIOA
#define LED1_GPIO_PIN   (1 << 0)
#define LED2_GPIO_PORT  ((void*)0x40020000) // Dummy address for GPIOA
#define LED2_GPIO_PIN   (1 << 1)

// Task 1: Blinks LED1 every 500ms
void Led1Task(void *pvParameters) {
    // Task-specific initialization if any (e.g., turn LED off initially)
    // HAL_GPIO_WritePin(LED1_GPIO_PORT, LED1_GPIO_PIN, GPIO_PIN_RESET);

    for (;;) {
        HAL_GPIO_TogglePin(LED1_GPIO_PORT, LED1_GPIO_PIN);
        vTaskDelay(pdMS_TO_TICKS(500)); // Delay for 500ms
    }
}

// Task 2: Blinks LED2 every 100ms
void Led2Task(void *pvParameters) {
    // Task-specific initialization
    // HAL_GPIO_WritePin(LED2_GPIO_PORT, LED2_GPIO_PIN, GPIO_PIN_RESET);

    for (;;) {
        HAL_GPIO_TogglePin(LED2_GPIO_PORT, LED2_GPIO_PIN);
        vTaskDelay(pdMS_TO_TICKS(100)); // Delay for 100ms
    }
}

int main() {
    // --- System Initialization ---
    // In a real project, this would involve clock configuration,
    // enabling GPIO clocks, and configuring pins as outputs.
    // Example (conceptual):
    // SystemClock_Config();
    // __HAL_RCC_GPIOA_CLK_ENABLE();
    // HAL_GPIO_Init(LED1_GPIO_PORT, LED1_GPIO_PIN);
    // HAL_GPIO_Init(LED2_GPIO_PORT, LED2_GPIO_PIN);
    // --- End System Initialization ---

    // Create the tasks
    xTaskCreate(
        Led1Task,       // Function that implements the task
        "LED1 Blinker", // Text name for the task
        configMINIMAL_STACK_SIZE, // Stack size (e.g., 128 words)
        NULL,           // Parameter passed to the task
        1,              // Priority (0 is lowest, configMAX_PRIORITIES-1 is highest)
        NULL            // Handle to the created task (optional)
    );

    xTaskCreate(
        Led2Task,       // Function that implements the task
        "LED2 Blinker", // Text name for the task
        configMINIMAL_STACK_SIZE, // Stack size
        NULL,           // Parameter
        2,              // Priority (higher than Led1Task)
        NULL            // Handle
    );

    // Start the FreeRTOS scheduler
    vTaskStartScheduler();

    // The scheduler should never return, so this loop should not be reached
    for (;;) {}
    return 0;
}

// FreeRTOS hook functions (required for compilation, even if empty)
void vApplicationTickHook(void) {}
void vApplicationMallocFailedHook(void) { for(;;) {} }
void vApplicationStackOverflowHook(TaskHandle_t xTask, char *pcTaskName) { for(;;) {} }
void vApplicationIdleHook(void) {}
```

**Reflection:** This example highlights the power of an RTOS for managing concurrent operations. Each task is simple and self-contained, focusing on its specific job. The `vTaskDelay` function is crucial; it *yields* CPU control to the scheduler, allowing other tasks to run. The RTOS handles all the complex timing and context switching, making the code much cleaner and easier to reason about than a bare-metal super-loop for multiple concurrent activities. The higher priority of `Led2Task` means it will always get CPU time before `Led1Task` if both are ready to run.

---

### Example 4 (Hardest - RTOS with Resource Sharing): Shared Counter with Mutex

**Problem:** Two FreeRTOS tasks need to access and modify a shared global integer counter. `IncrementTask` should increment the counter every 100ms. `ReadPrintTask` should read the counter and "print" its value every 500ms. Ensure that access to the shared counter is protected to prevent data corruption.

**Given:**
*   FreeRTOS kernel running.
*   A shared global integer variable `shared_counter`.
*   A mechanism to "print" (e.g., a serial port or console output).

**What we want:**
1.  `IncrementTask` increments `shared_counter` every 100ms.
2.  `ReadPrintTask` reads and "prints" `shared_counter` every 500ms.
3.  A mutex (or semaphore) to protect `shared_counter` from race conditions.

**Solution:**

1.  **Include FreeRTOS headers and define shared resources:**
    ```c
    #include "FreeRTOS.h"
    #include "task.h"
    #include "semphr.h" // For mutex (binary semaphore)

    volatile int shared_counter = 0; // The shared resource
    SemaphoreHandle_t xCounterMutex; // Mutex to protect the counter

    // Dummy print function for demonstration
    void print_value(const char* task_name, int value) {
        // In a real system, this would be printf over UART/USB
        // printf("[%s] Counter: %d\n", task_name, value);
    }
    ```
    *   **Explanation:** We include `semphr.h` for mutex functionality. `shared_counter` is `volatile` because it's accessed by multiple tasks and its value can change asynchronously. `xCounterMutex` will be the handle to our mutex.

2.  **Implement `IncrementTask`:**
    ```c
    void IncrementTask(void *pvParameters) {
        for (;;) {
            // Attempt to take the mutex. Wait indefinitely if not available.
            if (xSemaphoreTake(xCounterMutex, portMAX_DELAY) == pdTRUE) {
                // Mutex acquired, safe to access shared_counter
                shared_counter++;
                // print_value("IncrementTask", shared_counter); // Optional: print after increment

                xSemaphoreGive(xCounterMutex); // Release the mutex
            }
            vTaskDelay(pdMS_TO_TICKS(100)); // Delay for 100ms
        }
    }
    ```
    *   **Explanation:** Before modifying `shared_counter`, the task calls `xSemaphoreTake(xCounterMutex, portMAX_DELAY)`. This attempts to acquire the mutex. If another task holds the mutex, `IncrementTask` will block (go to sleep) until the mutex is available. `portMAX_DELAY` means it will wait indefinitely. Once the mutex is acquired,