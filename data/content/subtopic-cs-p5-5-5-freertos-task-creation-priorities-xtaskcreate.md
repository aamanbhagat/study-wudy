## What it is
In FreeRTOS, a "task" is an independent thread of execution—essentially a C function that runs concurrently with other tasks. The function `xTaskCreate` is the primary API call used to instantiate and register a new task with the FreeRTOS scheduler, allocating its private stack and setting its execution priority.

## Why it matters
This is the fundamental building block of any real-time system. In aerospace, a flight controller runs dozens of concurrent tasks: reading IMU data (high priority), running control loops (high priority), logging telemetry (medium priority), and communicating with the ground station (low priority). The ability to create tasks and assign priorities ensures that critical operations, like stabilizing the vehicle, are never delayed by non-critical ones, like sending a status update.

## When to study it
Before tackling this, you must have a solid grasp of C programming, specifically function pointers, `void` pointers, and memory allocation (`malloc`/`free`). You should also understand the core concepts of an operating system: concurrency, the difference between a process and a thread, and the role of a scheduler. If you don't know what a stack is and why a function call uses it, review that first.

## How to study it (step by step)
1.  **Review Function Pointers in C:** Write a simple C program that declares a function pointer, assigns it the address of a function, and calls the function via the pointer. `xTaskCreate`'s first argument is a function pointer.
2.  **Dissect the `xTaskCreate` Signature:** Read the official FreeRTOS API documentation for `xTaskCreate`. For each of its six parameters, write one sentence explaining its purpose. Do not proceed until you can do this from memory.
3.  **Implement a Two-Task System:** On a target device (like an ESP32 or a simulator like QEMU), write the minimal code to create two tasks. Each task should contain an infinite loop that prints its name to the serial console and then delays for 1 second using `vTaskDelay()`.
4.  **Experiment with Priorities:** Modify the previous code. Set one task to priority 2 and the other to priority 1. Remove the `vTaskDelay()` from the higher-priority task. Observe what happens (the lower-priority task will never run, a phenomenon called "starvation").
5.  **Induce a Stack Overflow:** Deliberately set the stack size for one task to a very small value (e.g., 64 bytes). Inside that task's function, declare a large local array (e.g., `int buffer[50];`). Observe the system crash or behave erratically. This builds respect for proper stack sizing.
6.  **Pass Parameters:** Create a single task function. Create two instances of this task using `xTaskCreate`. Pass a different integer or string literal to each instance via the `pvParameters` argument and have the task print the value it received.

## Key ideas, with intuition
1.  **Task as a Self-Contained Universe:** A task is a function that thinks it has the entire CPU to itself. The RTOS scheduler creates this illusion by saving the state (registers, program counter) of one task and restoring the state of another in a "context switch." Each task has its own stack for local variables and function calls, isolating it from other tasks.

2.  **Priority is Law:** The FreeRTOS scheduler is deterministic and priority-based. The rule is simple: *Of all the tasks that are ready to run, the one with the highest numerical priority will always be the one that is running.* A task at priority 2 will *instantly* preempt a task at priority 1 the moment it becomes ready.
    $$ \text{CurrentlyRunningTask} = \max_{T \in \text{ReadyTasks}} (\text{Priority}(T)) $$

3.  **The `xTaskCreate` Function is a Contract:** This function is the way you describe your task to the kernel. You are making a contract:
    *   `pvTaskCode`: "Here is the code I want you to run." (A function pointer).
    *   `pcName`: "Here is a human-readable name for debugging."
    *   `usStackDepth`: "I promise this task will not use more than this much stack memory." (In words, not bytes).
    *   `pvParameters`: "Here is a single piece of data I want to give my task when it starts." (A `void*` for flexibility).
    *   `uxPriority`: "This is how important my task is relative to others."
    *   `pxCreatedTask`: "Optionally, please give me back a handle so I can control this task later."

4.  **Blocking is Yielding:** A task must never simply run in a tight loop without "blocking." A call like `vTaskDelay()` or waiting for a queue/semaphore is a signal to the scheduler: "I have nothing to do for now. You can run other tasks (of equal or lower priority)." A task that never blocks will starve all tasks of lower priority.

## Worked example
This example creates two tasks. A high-priority task prints a message every second. A low-priority task tries to print continuously but only gets to run when the high-priority task is blocking in `vTaskDelay()`. This code is for an environment like the ESP-IDF or Arduino-ESP32 framework.

```c
#include <Arduino.h> // Or your platform's specific headers

// Task functions must have this specific signature.
void vHighPriorityTask(void *pvParameters);
void vLowPriorityTask(void *pvParameters);

void setup() {
  Serial.begin(115200);
  delay(1000); // Wait for serial monitor to connect

  // Create the high-priority task.
  // Stack size 1024 words, parameter NULL, priority 2, no handle.
  xTaskCreate(
    vHighPriorityTask,
    "High Pri Task",
    1024,
    NULL,
    2, // Higher priority
    NULL
  );

  // Create the low-priority task.
  // Stack size 1024 words, parameter NULL, priority 1, no handle.
  xTaskCreate(
    vLowPriorityTask,
    "Low Pri Task",
    1024,
    NULL,
    1, // Lower priority
    NULL
  );
}

void vHighPriorityTask(void *pvParameters) {
  (void) pvParameters; // Suppress unused parameter warning

  for (;;) { // Tasks are typically infinite loops
    Serial.println("High priority task running - about to block.");
    // Block for 1000ms. The scheduler will run other tasks now.
    vTaskDelay(1000 / portTICK_PERIOD_MS);
  }
}

void vLowPriorityTask(void *pvParameters) {
  (void) pvParameters; // Suppress unused parameter warning
  int counter = 0;

  for (;;) {
    // This task just spins, printing as fast as it can.
    // It will only get CPU time when the High Priority task is blocked.
    Serial.print("Low priority task running, count: ");
    Serial.println(counter++);
  }
}

void loop() {
  // The main loop is empty. The RTOS scheduler is in control.
}
```

**Reflection:**
1.  `xTaskCreate` is called in `setup()` to configure and register the tasks before the scheduler takes full control.
2.  `vHighPriorityTask` has priority `2`. It runs, prints, and then calls `vTaskDelay()`. This moves it from the "Running" state to the "Blocked" state.
3.  Because the highest-priority ready task is now `vLowPriorityTask` (priority `1`), the scheduler immediately context-switches to it.
4.  `vLowPriorityTask` runs and prints its message many times until the 1000ms delay for the high-priority task expires.
5.  The moment `vHighPriorityTask`'s delay is over, it moves to the "Ready" state. Since its priority (`2`) is higher than the currently running task's priority (`1`), the scheduler *preempts* the low-priority task and switches back to the high-priority one. This cycle repeats.

## Diagrams

**Task State and Preemption Timeline**
```text
        High Prio (2) Task       Low Prio (1) Task
State   |----------------------| |--------------------|
        |                      | |                    |
Ready   |----->                | |                    |
        |     |                | |                    |
Running |     +----->          | |--> Running         |
        |           |          | |      |             |
Blocked |           +------>   | |      |             |
        |                |     | |      |             |
        | (Delay Ends)   |     | |      |             |
        |<---------------+     | |      V             |
        |                      | | (Preempted)        |
        |                      | |--> Ready           |
        |                      | |      ^             |
        |                      | |      |             |
        |                      | | (Scheduler runs it)|
        +--------------------------------------------> Time
```

**Memory Layout**
```text
High Addresses
+------------------+
| Task B Stack     |  <-- Grows Down
| (private)        |
+------------------+
| Task A Stack     |  <-- Grows Down
| (private)        |
+------------------+
| ...              |
| Heap             |  <-- Grows Up
+------------------+
| Uninitialized    |
| Data (BSS)       |
+------------------+
| Initialized      |
| Data (.data)     |
+------------------+
| Program Code     |
| (.text)          |
+------------------+
Low Addresses
```

## Memory technique — remember this forever
1.  **Mnemonic for `xTaskCreate` parameters:** "**P**rogrammers **N**ame **S**tacks, **P**assing **P**riority **H**andles"
    *   **P**vTaskCode (the **P**rogram/function pointer)
    *   **N**ame (pcName)
    *   **S**tackDepth (usStackDepth)
    *   **P**arameters (pvParameters)
    *   **P**riority (uxPriority)
    *   **H**andle (pxCreatedTask)

2.  **Overlearn this function signature:**
    ```c
    BaseType_t xTaskCreate(
        TaskFunction_t    pvTaskCode,
        const char *      pcName,
        configSTACK_DEPTH_TYPE usStackDepth,
        void *            pvParameters,
        UBaseType_t       uxPriority,
        TaskHandle_t *    pxCreatedTask
    );
    ```

3.  **Spaced Repetition Schedule:** Review the mnemonic and function signature at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Actively write it out from memory each time.

4.  **First Principles Pathway:** If you forget the details, rebuild it. An OS needs to run a function concurrently. What does it need to know?
    *   *What code to run?* -> A function pointer (`pvTaskCode`).
    *   *How much memory does it need for local variables?* -> A stack size (`usStackDepth`).
    *   *How important is it?* -> A priority (`uxPriority`).
    *   *Does it need startup data?* -> A parameter pointer (`pvParameters`).
    *   The name and handle are for debugging and control, secondary to the core function.

## Common mistakes
1.  **Stack Overflow:** Allocating too little stack space is the most common and painful bug. A task overwrites its stack boundary, corrupting memory belonging to another task or the kernel, causing a crash in a seemingly unrelated location. Always overestimate stack size initially.
2.  **Starvation:** Creating a task that never blocks (e.g., `for(;;){ a++; }`). This task will run forever, preventing any lower-priority tasks from ever getting CPU time. Every task loop must contain a blocking call (`vTaskDelay`, `xQueueReceive`, etc.).
3.  **Forgetting the Task Function Signature:** Task functions *must* have the signature `void FuncName(void *pvParameters)`. They must also never return. The `for(;;)` or `while(1)` loop is mandatory.
4.  **Passing Pointers to Local Variables:** Passing a pointer to a variable on the *creator's* stack as the `pvParameters` argument. That stack frame may not exist when the new task finally runs, leading to use-after-free bugs. Pass pointers to global/static variables or dynamically allocated memory.

## Self-check
1.  What is the unit of the `usStackDepth` parameter in `xTaskCreate`? Bytes or words? Why does this distinction matter for portability?
2.  You create three tasks: Task A (priority 3), Task B (priority 2), and Task C (priority 2). Task A runs a 5ms calculation then blocks for 95ms. Tasks B and C both run continuous calculations and never block. Describe the execution behavior of tasks B and C.
3.  A task needs to be created to handle incoming network packets. The processing of a packet must start within 1ms of its arrival. The processing itself can take up to 3ms. Other tasks in the system include data logging (takes 5ms, must run every 100ms) and a user interface update (takes 10ms, can run whenever). How would you assign priorities, and what is the name of the scheduling property you are trying to guarantee for the network task?