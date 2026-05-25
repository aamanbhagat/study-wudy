## What it is
A watchdog timer (WDT) is a hardware-based safety mechanism, essentially a counter, that automatically resets a computer system if the main software stops operating correctly. The software is responsible for periodically resetting this counter—an action known as "feeding the dog." If the software hangs, freezes, or crashes, it fails to feed the dog, the timer expires, and the hardware forces a system reset to recover from the fault.

## Why it matters
Watchdog timers are critical for creating reliable, autonomous systems that cannot be manually reset. In aerospace, a flight computer on a deep space probe like Voyager must recover from radiation-induced software errors on its own; a watchdog ensures this. In high-stakes physics experiments, such as the control systems for the Large Hadron Collider, a frozen control node could damage priceless equipment, so watchdogs provide a fundamental layer of safety and automated recovery.

## When to study it
Before tackling this, you must have a solid grasp of basic microcontroller architecture (CPU, memory, peripherals), digital logic (specifically, how counters and timers work), and foundational embedded C programming (loops, functions, and especially interrupt handling). Without understanding how a system's program flow can be derailed, the need for a WDT won't be clear.

## How to study it (step by step)
1.  **Revisit Hardware Timers:** In your microcontroller's datasheet or a simulator, review a standard hardware timer. Clock source, prescaler, counter register, and overflow interrupt. Understand that a WDT is just a specialized version of this.
2.  **Model the Logic:** On paper, draw a block diagram. Show a counter register, a clock input, and an output line connected to the CPU's RESET pin. Draw a separate input line to the counter's own reset, labeled "FEED." Trace the signal flow for both a normal case (feed happens) and a fault case (feed is missed).
3.  **Code a Normal Loop:** Write pseudocode for a simple `main()` loop that does some work, sleeps for a short period, and then calls `feed_watchdog()`. The total loop time must be less than the WDT timeout period.
4.  **Code a Faulty Loop:** Modify the pseudocode from step 3. Introduce an infinite loop (`while(1);`) or a function that could deadlock, placing it *before* the `feed_watchdog()` call. Trace the execution flow and predict exactly when the system will reset.
5.  **Compare WDT Types:** Research and create a two-column table comparing a "standard" (or "simple") WDT with a "windowed" WDT. Focus on the conditions for a valid feed. The key difference is that a windowed WDT detects not only a system that is too slow (hangs) but also one that is too fast (runaway loop).

## Key ideas, with intuition
1.  **The Dead Man's Switch:** This is the core intuition. In many industrial machines, an operator must hold down a switch for the machine to run. If they let go (e.g., they have a medical emergency), the machine stops. The WDT is the software equivalent. The main program loop must constantly signal "I am alive and executing correctly" by feeding the dog. Silence is interpreted as failure.

2.  **Time-out Period ($T_{timeout}$):** This is the leash length. The WDT is configured with a specific duration. If this much time passes without a feed, the reset is triggered. It's derived from the WDT's clock source and the number of counts until its counter overflows.
    $$ T_{timeout} = N_{counts} \times T_{clk} = \frac{N_{counts}}{f_{clk}} $$
    where $N_{counts}$ is the value the counter must reach to trigger a reset (e.g., $2^{16}$ for a 16-bit counter), and $T_{clk}$ is the period (or $f_{clk}$ is the frequency) of the clock feeding the WDT, often after a prescaler. Your job is to ensure your main loop's execution time is safely less than $T_{timeout}$.

3.  **Feeding is Proof of Health:** The `feed_watchdog()` instruction should be placed strategically. It should only be called after a full, successful cycle of the main program's critical tasks. Placing it at the start of the loop is a common mistake; the program could crash immediately after, but the WDT wouldn't know for almost a full timeout period.

4.  **Windowed Watchdogs Prevent Runaway Loops:** A simple WDT can be defeated by a tight, fast loop that does nothing but call `feed_watchdog()`. The main tasks are being starved, but the system appears healthy. A windowed WDT solves this by defining a time *window* during which a feed is valid. Feeding too early is just as bad as feeding too late. This forces the software to run at the correct pace.

## Worked example
Let's consider a simple microcontroller task to blink an LED every 500 ms. The WDT is configured with a timeout of 1000 ms.

**System Setup:**
- Microcontroller Clock: 16 MHz
- WDT Clock: A separate 32 kHz internal oscillator
- WDT Timeout: Set to 1000 ms.
- Goal: Blink an LED, feed the WDT to prevent a reset.

**C Code with a Latent Bug:**
```c
#include <mcu_peripherals.h>

void setup() {
    // Configure GPIO pin for LED as output
    setup_led_pin(); 
    
    // Configure WDT: use 32kHz clock, set timeout to ~1000ms
    // This involves writing specific values to WDT control registers
    configure_watchdog(TIMEOUT_1000_MS); 
    
    // Initial feed to start the process
    feed_watchdog();
}

// A function that sometimes works, but can get stuck
void perform_critical_task() {
    // ... does some complex calculation ...
    if (some_rare_condition) {
        while(1) {
            // Bug: Infinite loop under a rare condition
        }
    }
}

void main() {
    setup();
    while(1) {
        // 1. Turn LED on
        led_on();
        
        // 2. Perform a critical task
        perform_critical_task();
        
        // 3. Delay for 500 ms
        delay_ms(500);
        
        // 4. Turn LED off
        led_off();
        
        // 5. Delay for 500 ms
        delay_ms(500);
        
        // 6. Feed the watchdog to signal a successful loop completion
        feed_watchdog(); 
    }
}
```

**Step-by-step Trace & Reflection:**
1.  **Normal Operation:** For thousands of cycles, `some_rare_condition` is false. The `main` loop takes slightly more than 1000 ms to execute due to the two `delay_ms(500)` calls plus overhead. Wait, the loop takes *more* than 1000 ms, but the timeout is 1000 ms. The `feed_watchdog()` call at the end of the loop will come too late. The WDT will reset the system even during normal operation.
    *   **Reflection:** This highlights the first critical step: ensuring your loop time is *less than* the timeout. Let's assume we fix the delays to `delay_ms(450)`. Now the loop time is ~900 ms, which is less than 1000 ms. The `feed_watchdog()` call happens on time, and the system runs correctly.
2.  **Fault Condition:** Eventually, `some_rare_condition` becomes true. The program enters the `while(1)` infinite loop inside `perform_critical_task()`.
3.  **WDT Takes Over:** The main `while(1)` loop is now stuck. The code never reaches step 3, 4, 5, or, most importantly, step 6 (`feed_watchdog()`).
4.  **Reset:** The WDT hardware counter, which was reset ~900 ms ago, continues to count. After 1000 ms pass from the last feed, its counter overflows.
5.  **Recovery:** The WDT hardware asserts the CPU's RESET line. The microcontroller resets completely. The program execution jumps back to the very beginning, re-running `setup()` and then `main()`. The system is now recovered from the software freeze.
    *   **Reflection:** The WDT worked perfectly as a fail-safe. It didn't fix the bug, but it prevented the system from remaining in a useless, frozen state. The placement of the feed at the *end* of the loop was crucial; it ensured all tasks had to complete successfully for the WDT to be satisfied.

## Diagrams
A timeline showing a fault condition leading to a WDT reset.

```text
WDT Counter Value
 ^
 |
 | TIMEOUT_LEVEL --+------------------+------------------+-----> Reset Triggered
 |                 |                  |                  |
 |                 |\                 |\                 | \
 |                 | \                | \                |  \
 |                 |  \               |  \               |   \ Software Hangs
 |                 |   \              |   \              |    \
 |                 |    \             |    \             |     \
 +-----------------|-----`------------|-----`------------|------`-----------> Time
                   ^                  ^                  ^
                   |                  |                  |
               Feed Pulse 1       Feed Pulse 2      Missed Feed Pulse 3
            (Software OK)      (Software OK)         (Software Fault)
```

A timeline showing a windowed WDT.

```text
WDT Counter Value
 ^
 |
 | TIMEOUT_LEVEL --+--------------------------------------------------> Reset (Fed too late)
 |                 |
 |  Window End ----+------------------+------------------+
 |                 |   VALID FEED     |   VALID FEED     |
 | Window Start -- |    WINDOW        |    WINDOW        |
 |                 |                  |                  |
 +-----------------|------------------|------------------|-------> Time
                   ^                  ^
                   |                  |
               Invalid Feed       Valid Feed
               (Too Early)        (Just Right)
```

## Memory technique — remember this forever
1.  **The Story:** You are a lone arctic explorer (the CPU) with a sled dog (the WDT). The dog is trained to run back to base camp (reset the system) if you stop moving for more than 10 minutes (the timeout period). To show you're okay, you must periodically toss it a piece of fish ("feeding the dog"). If you fall into a crevasse (an infinite loop), you can't throw the fish. After 10 minutes, the dog runs for help. A *windowed* WDT is a fussy dog: it only eats fish thrown between minute 8 and minute 9. Throw it too early, and it ignores you; too late, and it's already gone.

2.  **Overlearn these facts:**
    *   **Purpose:** To recover from a software fault by triggering a hardware reset.
    *   **Mechanism:** A hardware counter that software must periodically reset ("feed") before it overflows.
    *   **Key Equation:** $T_{timeout} = N_{counts} / f_{clk}$.

3.  **Spaced Repetition Schedule:** Review this mini-lesson in 1 day, 3 days, 7 days, 16 days, and 35 days. Each time, try to re-derive the diagrams and the arctic explorer story from memory.

4.  **First Principles Pathway:** If you forget everything, rebuild it.
    *   Start with a simple digital counter. It increments on a clock edge.
    *   What happens when it reaches its maximum value? It overflows.
    *   Connect the overflow signal to the CPU's master reset pin. Now you have a device that resets the system after a fixed time.
    *   How do you prevent this reset during normal operation? You need a way to reset the *counter itself*.
    *   Where should the signal to reset the counter come from? From the software you are trying to monitor. This is "feeding."

## Common mistakes
1.  **Feeding the dog in an ISR:** A common error is to set up a periodic timer interrupt and feed the watchdog from inside that Interrupt Service Routine (ISR). The main application loop could be completely dead, but because interrupts are still firing, the WDT is fed, and the system is never reset. The WDT feed must be in the main context of the program whose health you are monitoring.
2.  **Timeout too short:** Choosing a $T_{timeout}$ that is too close to your loop's best-case execution time. Normal processing variations, unexpected delays, or compiler optimizations can cause your loop to occasionally run a few milliseconds longer, triggering spurious resets. Always add a safety margin (e.g., 2x your worst-case execution time).
3.  **Feeding at the wrong place:** Placing `feed_watchdog()` at the very top of your `while(1)` loop. The program could feed the dog and then immediately crash. The system will stay dead for the entire timeout period. Place the feed at the very *end* of the loop, as a final "all clear" signal.

## Self-check
1.  What physical component on a microcontroller is responsible for triggering the reset when a watchdog timer expires, and what is the name of the action software must take to prevent this?
2.  A system has a main loop that reliably executes in 40 ms. A standard WDT is enabled with a 50 ms timeout. A bug causes a secondary task to occasionally enter a tight, infinite loop that executes in microseconds, but this loop also contains a `feed_watchdog()` call. Will the system reset? Why or why not? How would a windowed WDT change the outcome?
3.  You are designing a control system for a rocket's thrust vectoring. The main control loop *must* execute at exactly 100 Hz (every 10 ms). You have a windowed WDT. Describe the ideal lower and upper bounds (in milliseconds) you would configure for the feed window and justify your choices.