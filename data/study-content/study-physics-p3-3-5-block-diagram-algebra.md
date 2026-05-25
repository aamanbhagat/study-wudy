## 1. What it is — in plain English

Imagine you're trying to describe how a complex machine works, like a coffee maker or a rocket engine. You could write pages and pages of text, but wouldn't it be easier to draw a picture? That's exactly what a block diagram is for in engineering!

A block diagram is like a flowchart for a system. It uses simple shapes to represent different parts of the system and arrows to show how signals (like electricity, pressure, or data) flow between them. Each "block" is a component that does something specific, like amplifying a signal or measuring a temperature.

Think of it as a specialized language for engineers to visualize, understand, and simplify complex systems. Instead of getting bogged down in the intricate details of each component's internal workings, we focus on what each component *does* to its input to produce an output, and how these components are connected.

The "algebra" part comes in because we can manipulate these diagrams using a set of rules, much like you manipulate equations in algebra. This allows us to simplify a very complicated diagram with many blocks and connections into a single, equivalent block, making the entire system much easier to analyze.

Ultimately, block diagram algebra is a powerful tool to take a sprawling, multi-component system and boil it down to its essence: a single mathematical relationship between its overall input and its overall output.

## 2. Why it matters — real-world applications

Block diagram algebra is not just a theoretical exercise; it's a foundational skill for anyone working with dynamic systems, especially in aerospace and control engineering.

1.  **Aerospace Guidance, Navigation, and Control (GNC):** This is perhaps its most critical application. When designing an autopilot for a commercial airliner, a guidance system for a missile, or the ascent control for a SpaceX Falcon 9 rocket, engineers use block diagrams to represent the complex interplay of sensors (measuring attitude, position, velocity), controllers (calculating corrective actions), and actuators (like thrust vectoring nozzles or control surfaces). Block diagram algebra allows them to simplify these intricate control loops to analyze stability, performance, and robustness, ensuring the vehicle flies safely and accurately.

2.  **Robotics and Autonomous Systems:** Consider a self-driving car or a robotic arm in a factory. These systems involve numerous feedback loops: cameras and lidar sensors provide input, a navigation system processes data to determine desired actions, and motors execute those actions. Block diagrams help engineers model the entire perception-decision-action cycle, allowing them to optimize the robot's responsiveness, precision, and ability to handle disturbances. For instance, Boston Dynamics uses block diagrams in the control architecture for its agile robots like Atlas and Spot.

3.  **Chemical Process Control:** In large industrial plants, precise control over temperature, pressure, flow rates, and chemical concentrations is vital for safety, efficiency, and product quality. Systems like those used by companies such as Honeywell or Siemens in their industrial control solutions often rely on block diagram representations. Engineers use this algebra to design and tune controllers that maintain process variables within desired limits, even when external factors (like changes in raw material input or ambient temperature) try to push them off course.

4.  **Electrical Engineering and Signal Processing:** From designing audio amplifiers to complex communication systems, block diagrams are ubiquitous. For example, when designing a noise-canceling headphone, engineers use block diagrams to represent the microphone picking up ambient noise, the processing unit generating an anti-noise signal, and the speaker delivering the combined audio. Block diagram algebra helps analyze how different filter stages and feedback mechanisms interact to achieve effective noise cancellation.

## 3. Prerequisites — what you must know first

Before diving deep into block diagram algebra, ensure you have a solid grasp of the following concepts. If any of these feel unfamiliar, pause and review them first.

*   **Functions:** Understanding what a function is – a rule that assigns each input exactly one output. In block diagrams, each block represents a function.
*   **Basic Algebra:** Proficiency in manipulating equations, solving for variables, and simplifying expressions. Block diagram algebra is, at its heart, algebraic manipulation.
*   **System Theory Basics:** Concepts like "input," "output," "system," "open-loop," and "closed-loop" control. You need to understand what a system does and how its parts interact.
*   **Laplace Transforms:** This is crucial. Block diagrams are almost exclusively used with transfer functions, which are derived using Laplace transforms. You must know how to convert time-domain differential equations into the s-domain and understand the properties of Laplace transforms (linearity, differentiation, integration).
*   **Transfer Functions:** The mathematical representation of a linear, time-invariant (LTI) system in the Laplace domain. It's the ratio of the Laplace transform of the output to the Laplace transform of the input, assuming zero initial conditions.
*   **Feedback Control:** A fundamental concept where the output of a system is measured and fed back to the input to influence its behavior. This is the cornerstone of many block diagrams.

## 4. The core idea — step by step

Block diagram algebra provides a systematic way to simplify complex interconnections of system components into a single, equivalent transfer function. Each step involves applying a specific rule to reduce a part of the diagram.

### Step 1: The Basic Block

*   **Plain-English Statement:** At its simplest, a block diagram shows a single component that takes an input signal, processes it in some way, and produces an output signal. The "processing" is described by its transfer function.
*   **Small Concrete Example:** Imagine a simple amplifier. If you put a small voltage in, it gives you a larger voltage out. The amplifier's job is to multiply the input by a certain gain factor.
*   **Formal/Mathematical Version:**
    If $X(s)$ is the Laplace transform of the input signal and $Y(s)$ is the Laplace transform of the output signal, and $G(s)$ is the transfer function of the block, then:
    $$Y(s) = G(s)X(s)$$
    This is the fundamental relationship for any single block.
*   **What Could Go Wrong:** Assuming the input and output signals are always the same type (e.g., voltage in, voltage out). They could be different (e.g., voltage in, motor speed out), but $G(s)$ still describes the relationship. Also, remember $G(s)$ is a *ratio* of output to input.

### Step 2: Summing Points

*   **Plain-English Statement:** A summing point (or summer) is where multiple signals converge and are either added together or subtracted from each other to form a single new signal. Think of it like a mixer.
*   **Small Concrete Example:** In a thermostat, the desired room temperature (setpoint) is fed into a summing point. The actual room temperature (measured by a sensor) is also fed in, but with a negative sign. The output of the summing point is the "error" signal: how far off the actual temperature is from the desired temperature.
*   **Formal/Mathematical Version:**
    If $X_1(s)$, $X_2(s)$, and $X_3(s)$ are input signals to a summing point, and $Y(s)$ is the output signal:
    $$Y(s) = X_1(s) + X_2(s) - X_3(s)$$
    The signs (+ or -) are explicitly marked at the summing point.
*   **What Could Go Wrong:** Incorrectly assigning the signs at the summing point. Always pay close attention to the + and - symbols. A common mistake is assuming all inputs are added.

### Step 3: Pick-off Points (Branch Points)

*   **Plain-English Statement:** A pick-off point is where a single signal splits and goes to multiple different parts of the system without being altered. It's like a splitter in a cable.
*   **Small Concrete Example:** A single temperature sensor measures the temperature of a rocket engine. This single temperature reading might then be sent to two different places: one to a display for the pilot, and another to the engine's control computer. The signal itself doesn't change; it's just duplicated.
*   **Formal/Mathematical Version:**
    If $X(s)$ is a signal that splits into $Y_1(s)$ and $Y_2(s)$:
    $$Y_1(s) = X(s)$$
    $$Y_2(s) = X(s)$$
    The value of the signal remains identical along all branches originating from a pick-off point.
*   **What Could Go Wrong:** Thinking that the signal is somehow divided or weakened when it splits. It's a perfect duplication, not a sharing of resources.

### Step 4: Blocks in Series (Cascaded Blocks)

*   **Plain-English Statement:** When two or more blocks are connected one after another, such that the output of the first block becomes the input of the second, and so on, they are in series.
*   **Small Concrete Example:** Imagine a signal going through a filter (Block 1) to remove noise, and then the filtered signal goes into an amplifier (Block 2) to boost its strength. The combined effect is the product of their individual effects.
*   **Formal/Mathematical Version:**
    If $G_1(s)$ and $G_2(s)$ are two blocks in series, with input $X(s)$ and output $Y(s)$:
    $$Y(s) = G_2(s) \cdot (G_1(s)X(s))$$
    So, the equivalent transfer function $G_{eq}(s)$ for the series combination is:
    $$G_{eq}(s) = G_1(s)G_2(s)$$
*   **What Could Go Wrong:** Adding the transfer functions instead of multiplying them. Remember, the output of the first is *multiplied* by the second block's function.

### Step 5: Blocks in Parallel

*   **Plain-English Statement:** When two or more blocks receive the *same* input signal, and their individual outputs are then combined (usually summed) to produce a single final output, they are in parallel.
*   **Small Concrete Example:** A control system might have two different ways to influence a motor's speed: one path provides a coarse adjustment, and another provides a fine-tuning adjustment. Both take the same error signal as input, and their outputs are added together to produce the final control command to the motor.
*   **Formal/Mathematical Version:**
    If $G_1(s)$ and $G_2(s)$ are two blocks in parallel, with common input $X(s)$ and their outputs summed to produce $Y(s)$:
    $$Y(s) = G_1(s)X(s) + G_2(s)X(s)$$
    Factoring out $X(s)$:
    $$Y(s) = (G_1(s) + G_2(s))X(s)$$
    So, the equivalent transfer function $G_{eq}(s)$ for the parallel combination is:
    $$G_{eq}(s) = G_1(s) + G_2(s)$$
*   **What Could Go Wrong:** Multiplying the transfer functions instead of adding them. Parallel paths sum their effects.

### Step 6: The Standard Feedback Loop

*   **Plain-English Statement:** This is the most important configuration. It's where a system's output is measured, compared to a desired input, and the difference (error) is used to adjust the system.
*   **Small Concrete Example:** A cruise control system in a car. You set a desired speed (input). The car's actual speed (output) is measured. If the actual speed is less than the desired speed, the engine gets more throttle (error signal). This feedback loop continuously adjusts the engine to maintain the desired speed.
*   **Formal/Mathematical Version:**
    Consider a feedback loop with a forward path transfer function $G(s)$, a feedback path transfer function $H(s)$, input $R(s)$, and output $Y(s)$. The summing point typically subtracts the feedback signal.
    The error signal $E(s)$ is: $E(s) = R(s) - H(s)Y(s)$
    The output $Y(s)$ is: $Y(s) = G(s)E(s)$
    Substitute $E(s)$ into the second equation:
    $$Y(s) = G(s)(R(s) - H(s)Y(s))$$
    $$Y(s) = G(s)R(s) - G(s)H(s)Y(s)$$
    Move terms with $Y(s)$ to one side:
    $$Y(s) + G(s)H(s)Y(s) = G(s)R(s)$$
    $$Y(s)(1 + G(s)H(s)) = G(s)R(s)$$
    The equivalent transfer function $T(s) = \frac{Y(s)}{R(s)}$ is:
    $$T(s) = \frac{G(s)}{1 + G(s)H(s)}$$
    If the feedback is positive (i.e., the summing point adds the feedback signal), the denominator becomes $1 - G(s)H(s)$.
*   **What Could Go Wrong:** Forgetting the sign convention in the denominator. A negative feedback (most common) results in $1 + G(s)H(s)$, while positive feedback results in $1 - G(s)H(s)$. Also, confusing $G(s)$ and $H(s)$ or their positions.

### Step 7: Moving Summing Points and Pick-off Points

*   **Plain-English Statement:** Sometimes, to simplify a complex diagram, you need to rearrange the order of blocks, summing points, or pick-off points. There are specific rules for doing this without changing the overall system behavior.
*   **Small Concrete Example:** Imagine you have a signal that first goes through a block and *then* splits. Sometimes it's easier to analyze if the signal splits *before* going through the block. You can do this, but you might need to add an extra block to one of the new branches to maintain equivalence.
*   **Formal/Mathematical Version:**
    *   **Moving a summing point past a block (in the direction of the signal flow):** If a summing point is after a block $G(s)$, and you want to move it before $G(s)$, then any signal entering the summing point *before* $G(s)$ must now be multiplied by $1/G(s)$ before entering the summing point.
        *   Original: $X(s) \rightarrow G(s) \rightarrow (+ \pm Z(s)) \rightarrow Y(s)$ becomes $X(s) \rightarrow (+ \pm Z(s)/G(s)) \rightarrow G(s) \rightarrow Y(s)$
    *   **Moving a summing point past a block (opposite to the direction of the signal flow):** If a summing point is before a block $G(s)$, and you want to move it after $G(s)$, then any signal entering the summing point *after* $G(s)$ must now be multiplied by $G(s)$ before entering the summing point.
        *   Original: $X(s) \rightarrow (+ \pm Z(s)) \rightarrow G(s) \rightarrow Y(s)$ becomes $X(s) \rightarrow G(s) \rightarrow (+ \pm Z(s)G(s)) \rightarrow Y(s)$
    *   **Moving a pick-off point past a block (in the direction of the signal flow):** If a pick-off point is before a block $G(s)$, and you want to move it after $G(s)$, then the new branch created at the pick-off point must include a $1/G(s)$ block.
        *   Original: $X(s) \rightarrow (\text{pick-off}) \rightarrow G(s) \rightarrow Y(s)$ and $X(s)$ also goes to $Z(s)$ becomes $X(s) \rightarrow G(s) \rightarrow (\text{pick-off}) \rightarrow Y(s)$ and $Y(s)$ goes to $Z(s) \cdot (1/G(s))$
    *   **Moving a pick-off point past a block (opposite to the direction of the signal flow):** If a pick-off point is after a block $G(s)$, and you want to move it before $G(s)$, then the new branch created at the pick-off point must include a $G(s)$ block.
        *   Original: $X(s) \rightarrow G(s) \rightarrow (\text{pick-off}) \rightarrow Y(s)$ and $Y(s)$ also goes to $Z(s)$ becomes $X(s) \rightarrow (\text{pick-off}) \rightarrow G(s) \rightarrow Y(s)$ and $X(s)$ goes to $Z(s) \cdot G(s)$
*   **What Could Go Wrong:** Not applying the correct compensatory block ($G(s)$ or $1/G(s)$) when moving points. This is a common source of error and requires careful attention to maintain equivalence.

## 5. Worked examples — multiple, with every step shown

Let's apply these rules to simplify some block diagrams. Our goal is always to reduce the entire system to a single transfer function $T(s) = \frac{Y(s)}{R(s)}$.

### Example 1: Simple Series and Parallel Combination

**Problem Statement:** Find the equivalent transfer function $\frac{Y(s)}{R(s)}$ for the following block diagram:

```
      R(s) ---> G1(s) ---> G2(s) ---+---> Y(s)
                                      ^
                                      |
                                      +--- G3(s) ---+
                                                    |
                                                    |
                                                    +----
```

**Given:**
*   Input: $R(s)$
*   Output: $Y(s)$
*   Blocks: $G_1(s)$, $G_2(s)$, $G_3(s)$
*   Connections: $G_1(s)$ and $G_2(s)$ are in series. The output of $G_2(s)$ and the output of $G_3(s)$ are summed to produce $Y(s)$.

**What we want:** A single transfer function $T(s) = \frac{Y(s)}{R(s)}$.

**Solution:**

**Step 1: Identify and simplify series blocks.**
*   **Explanation:** Blocks $G_1(s)$ and $G_2(s)$ are connected in series. The output of $G_1(s)$ directly feeds into $G_2(s)$. We can replace them with a single equivalent block.
*   **Mathematical Step:**
    Let $G_{12}(s)$ be the equivalent transfer function for $G_1(s)$ and $G_2(s)$ in series.
    $$G_{12}(s) = G_1(s)G_2(s)$$
*   **Resulting Diagram:**
    ```
          R(s) ---> G12(s) ---+---> Y(s)
                                ^
                                |
                                +--- G3(s) ---+
                                              |
                                              |
                                              +----
    ```

**Step 2: Identify and simplify parallel blocks.**
*   **Explanation:** Now, the output of $G_{12}(s)$ and the output of $G_3(s)$ are both fed into a summing point (implied by the diagram where the lines converge and sum to $Y(s)$). This means $G_{12}(s)$ and $G_3(s)$ are in parallel, with $R(s)$ as their common input (after $G_{12}(s)$ has processed it). More precisely, the signal *after* $G_{12}(s)$ is $G_{12}(s)R(s)$. The signal *after* $G_3(s)$ is $G_3(s)R(s)$. These two outputs are then summed.
*   **Mathematical Step:**
    The input to the parallel combination is $R(s)$.
    The output from the upper path is $G_{12}(s)R(s)$.
    The output from the lower path is $G_3(s)R(s)$.
    The final output $Y(s)$ is the sum of these two:
    $$Y(s) = G_{12}(s)R(s) + G_3(s)R(s)$$
    Factor out $R(s)$:
    $$Y(s) = (G_{12}(s) + G_3(s))R(s)$$
    Substitute $G_{12}(s) = G_1(s)G_2(s)$:
    $$Y(s) = (G_1(s)G_2(s) + G_3(s))R(s)$$
*   **Final Answer:** The equivalent transfer function is:
    $$\boxed{T(s) = \frac{Y(s)}{R(s)} = G_1(s)G_2(s) + G_3(s)}$$

**Reflection:** This example was straightforward, combining the two most basic reduction rules: series multiplication and parallel addition. The key is to correctly identify which blocks are in series and which are in parallel *relative to their inputs and outputs*.

---

### Example 2: Basic Negative Feedback Loop

**Problem Statement:** Reduce the following block diagram to a single transfer function $\frac{Y(s)}{R(s)}$.

```
       R(s) ----> (+) ----> G1(s) ----> G2(s) ----> Y(s)
                  ^   |
                  |   |
                  |   (-)
                  |   |
                  H(s) <---
```

**Given:**
*   Input: $R(s)$
*   Output: $Y(s)$
*   Blocks: $G_1(s)$, $G_2(s)$, $H(s)$
*   Connections: $G_1(s)$ and $G_2(s)$ are in the forward path. $H(s)$ is in the feedback path. The feedback is negative.

**What we want:** A single transfer function $T(s) = \frac{Y(s)}{R(s)}$.

**Solution:**

**Step 1: Simplify the forward path blocks.**
*   **Explanation:** Blocks $G_1(s)$ and $G_2(s)$ are in series in the forward path. We can combine them into a single equivalent block.
*   **Mathematical Step:**
    Let $G_{fwd}(s)$ be the equivalent transfer function for $G_1(s)$ and $G_2(s)$ in series.
    $$G_{fwd}(s) = G_1(s)G_2(s)$$
*   **Resulting Diagram:**
    ```
          R(s) ----> (+) ----> Gfwd(s) ----> Y(s)
                     ^   |
                     |   |
                     |   (-)
                     |   |
                     H(s) <---
    ```

**Step 2: Apply the feedback formula.**
*   **Explanation:** Now we have a standard negative feedback loop. The forward path is $G_{fwd}(s)$ and the feedback path is $H(s)$. We can use the standard feedback formula.
*   **Mathematical Step:**
    The general formula for a negative feedback loop is $T(s) = \frac{G(s)}{1 + G(s)H(s)}$.
    Here, $G(s) = G_{fwd}(s)$ and the feedback is $H(s)$.
    $$T(s) = \frac{G_{fwd}(s)}{1 + G_{fwd}(s)H(s)}$$
    Substitute $G_{fwd}(s) = G_1(s)G_2(s)$:
    $$T(s) = \frac{G_1(s)G_2(s)}{1 + G_1(s)G_2(s)H(s)}$$
*   **Final Answer:** The equivalent transfer function is:
    $$\boxed{T(s) = \frac{Y(s)}{R(s)} = \frac{G_1(s)G_2(s)}{1 + G_1(s)G_2(s)H(s)}}$$

**Reflection:** This example highlights the importance of recognizing the standard feedback loop pattern. Once the forward path is simplified, applying the feedback formula is direct. Pay close attention to the sign of the feedback.

---

### Example 3: Nested Feedback Loops

**Problem Statement:** Determine the equivalent transfer function $\frac{Y(s)}{R(s)}$ for the following system.

```
       R(s) ----> (+) ----> G1(s) ----> (+) ----> G2(s) ----> Y(s)
                  ^               ^   |
                  |               |   |
                  |               |   (-)
                  |               |   |
                  |               H2(s) <---
                  |               |
                  |               |
                  +---------------(-)
                  |
                  H1(s) <---------
```

**Given:**
*   Input: $R(s)$
*   Output: $Y(s)$
*   Blocks: $G_1(s)$, $G_2(s)$, $H_1(s)$, $H_2(s)$
*   Connections: Two nested negative feedback loops.

**What we want:** A single transfer function $T(s) = \frac{Y(s)}{R(s)}$.

**Solution:**

**Step 1: Simplify the inner feedback loop.**
*   **Explanation:** We can see an inner feedback loop involving $G_2(s)$ in the forward path and $H_2(s)$ in the feedback path. We'll reduce this first.
*   **Mathematical Step:**
    Let $G_{inner}(s)$ be the equivalent transfer function for this inner loop.
    The forward path is $G_2(s)$, and the feedback path is $H_2(s)$. It's a negative feedback loop.
    $$G_{inner}(s) = \frac{G_2(s)}{1 + G_2(s)H_2(s)}$$
*   **Resulting Diagram:**
    ```
          R(s) ----> (+) ----> G1(s) ----> G_inner(s) ----> Y(s)
                     ^                           |
                     |                           |
                     +---------------------------(-)
                     |
                     H1(s) <---------------------
    ```
    (Note: The diagram above is a simplification, but the pick-off point for $H_1(s)$ is still at the output $Y(s)$, and the summing point is at the very beginning).

**Step 2: Simplify the outer feedback loop.**
*   **Explanation:** Now we have a larger, simpler feedback loop. The forward path consists of $G_1(s)$ in series with $G_{inner}(s)$. The feedback path is $H_1(s)$.
*   **Mathematical Step:**
    First, combine $G_1(s)$ and $G_{inner}(s)$ in series to get the overall forward path $G_{outer\_fwd}(s)$:
    $$G_{outer\_fwd}(s) = G_1(s)G_{inner}(s)$$
    Substitute the expression for $G_{inner}(s)$:
    $$G_{outer\_fwd}(s) = G_1(s)\left(\frac{G_2(s)}{1 + G_2(s)H_2(s)}\right) = \frac{G_1(s)G_2(s)}{1 + G_2(s)H_2(s)}$$
    Now, apply the feedback formula for the outer loop. The forward path is $G_{outer\_fwd}(s)$ and the feedback path is $H_1(s)$. It's a negative feedback loop.
    $$T(s) = \frac{G_{outer\_fwd}(s)}{1 + G_{outer\_fwd}(s)H_1(s)}$$
    Substitute $G_{outer\_fwd}(s)$:
    $$T(s) = \frac{\frac{G_1(s)G_2(s)}{1 + G_2(s)H_2(s)}}{1 + \left(\frac{G_1(s)G_2(s)}{1 + G_2(s)H_2(s)}\right)H_1(s)}$$
    To simplify this complex fraction, multiply the numerator and denominator by $(1 + G_2(s)H_2(s))$:
    $$T(s) = \frac{G_1(s)G_2(s)}{(1 + G_2(s)H_2(s)) + G_1(s)G_2(s)H_1(s)}$$
*   **Final Answer:** The equivalent transfer function is:
    $$\boxed{T(s) = \frac{Y(s)}{R(s)} = \frac{G_1(s)G_2(s)}{1 + G_1(s)G_2(s)H_1(s) + G_2(s)H_2(s)}}$$

**Reflection:** Nested loops are common. The strategy is to always work from the innermost loop outwards. Careful algebraic simplification of complex fractions is essential to avoid errors.

---

### Example 4: Complex Diagram with Moving Points

**Problem Statement:** Reduce the following block diagram to a single transfer function $\frac{Y(s)}{R(s)}$.

```
       R(s) ----> (+) ----> G1(s) ----> G2(s) ----> Y(s)
                  ^   |               ^   |
                  |   |               |   |
                  |   (-)             |   (-)
                  |   |               |   |
                  |   +---------------|---+
                  |                   |
                  |                   H1(s)
                  |                   |
                  +-------------------+
```
*Correction to ASCII diagram: The diagram intends to show $H_1(s)$ feeding back from the output of $G_2(s)$ to the summing point *before* $G_1(s)$, and there's another feedback loop from the output of $G_2(s)$ to the summing point *between* $G_1(s)$ and $G_2(s)$. Let's redraw the intended diagram more clearly for this example.*

**Revised Problem Statement (with clearer diagram):** Reduce the following block diagram to a single transfer function $\frac{Y(s)}{R(s)}$.

```
       R(s) ----> (+) ----> G1(s) ----> (+) ----> G2(s) ----> Y(s)
                  ^               ^   |
                  |               |   |
                  |               |   (-)
                  |               |   |
                  |               H2(s) <---
                  |
                  |
                  +--------------------(-)
                  |
                  H1(s) <--------------
```
*This is the same as Example 3. Let's make a truly new one involving moving points.*

**New Example 4: Complex Diagram with Moving a Pick-off Point**

**Problem Statement:** Reduce the following block diagram to a single transfer function $\frac{Y(s)}{R(s)}$.

```
       R(s) ----> (+) ----> G1(s) ----> (+) ----> G2(s) ----> Y(s)
                  ^   |               ^   |
                  |   |               |   |
                  |   (-)             |   (-)
                  |   |               |   |
                  |   +---------------|---+
                  |                   |
                  |                   H1(s)
                  |                   |
                  +-------------------<---
```
*Let's assume the feedback from $H_1(s)$ comes from the output of $G_2(s)$ to the summing point *before* $G_1(s)$, and there's another feedback from the output of $G_2(s)$ to the summing point *between* $G_1(s)$ and $G_2(s)$ via $H_2(s)$ (this is the same as Example 3, but the ASCII was ambiguous). For a new example, let's make it truly different.*

**Let's try this diagram for Example 4 (requires moving a pick-off point):**

```
       R(s) ----> (+) ----> G1(s) ----> G2(s) ----> Y(s)
                  ^   |                  |
                  |   |                  |
                  |   (-)                |
                  |   |                  |
                  |   +------------------+
                  |                      |
                  |                      H1(s)
                  |                      |
                  +----------------------<---- G3(s) <----
```
*Wait, this diagram is not well-formed for a single input/output overall transfer function. The $G_3(s)$ block is feeding back into *itself* and into the main loop. This is an invalid diagram for a standard reduction. I need to be careful with diagram generation for these examples.*

**Let's simplify the structure for Example 4 to clearly demonstrate moving a point.**

**Revised Example 4: Moving a Pick-off Point**

**Problem Statement:** Reduce the following block diagram to a single transfer function $\frac{Y(s)}{R(s)}$.

```
       R(s) ----> (+) ----> G1(s) ----> G2(s) ----> Y(s)
                  ^   |                   |
                  |   |                   |
                  |   (-)                 |
                  |   |                   |
                  +---<-------------------+
                  |
                  H(s)
```
*This diagram shows feedback from the output of $G_2(s)$ to the summing point before $G_1(s)$ via $H(s)$. Also, there's a pick-off point *between* $G_1(s)$ and $G_2(s)$, and this signal is fed back to the summing point before $G_1(s)$ directly.* This is a good candidate for moving a pick-off point.

**Given:**
*   Input: $R(s)$
*   Output: $Y(s)$
*   Blocks: $G_1(s)$, $G_2(s)$, $H(s)$
*   Connections: A main feedback loop. A pick-off point between $G_1(s)$ and $G_2(s)$ feeds back to the initial summing point.

**What we want:** A single transfer function $T(s) = \frac{Y(s)}{R(s)}$.

**Solution:**

**Step 1: Identify the problematic pick-off point and decide to move it.**
*   **Explanation:** We have a pick-off point *between* $G_1(s)$ and $G_2(s)$. This makes it difficult to immediately apply the feedback formula because the feedback paths $H(s)$ and the direct path from the pick-off point are both connected to the initial summing point, but they originate from different points in the forward path. To simplify, we will move the pick-off point from *after* $G_1(s)$ to *after* $G_2(s)$ (i.e., at the system output $Y(s)$).
*   **Mathematical Rule for Moving Pick-off Point:** When moving a pick-off point from *before* a block $G(s)$ to *after* it, any signal picked off at the original point (before $G(s)$) that goes to another part of the diagram must now pass through $1/G(s)$ after the new pick-off point. In our case, the signal is picked off after $G_1(s)$ and fed back. We want to move this pick-off point to after $G_2(s)$. This means the feedback path that currently picks off after $G_1(s)$ will now pick off after $G_2(s)$ and pass through $1/G_2(s)$.
*   **Let's re-examine the diagram:**
    ```
           R(s) ----> (+) ----> G1(s) ----> G2(s) ----> Y(s)
                      ^   |                   |
                      |   |                   |
                      |   (-)                 |
                      |   |                   | (This is the feedback via H(s))
                      +---<-------------------+
                      |
                      H(s)
    ```
    And there's another feedback path directly from the output of $G_1(s)$ to the initial summing point. Let's assume this feedback is $F(s) = 1$ (direct connection) and it's also negative.

    **Let's use a clearer diagram for Example 4, where moving a point is genuinely helpful:**

    ```
           R(s) ----> (+) ----> G1(s) ----> G2(s) ----> Y(s)
                      ^   |                   |
                      |   |                   |
                      |   (-)                 |
                      |   |                   |
                      +---<----(Pick-off P1)--+
                      |
                      H1(s)
                      |
                      |
                      P1 ---------------------> (-)
                                              ^
                                              |
                                              H2(s)
    ```
    *This is still not right. Let's use a standard textbook example for moving points.*

    **Final attempt for Example 4 with moving a summing point:**

    **Problem Statement:** Reduce the following block diagram to a single transfer function $\frac{Y(s)}{R(s)}$.

    ```
           R(s) ----> (+) ----> G1(s) ----> G2(s) ----> Y(s)
                      ^   |               ^   |
                      |   |               |   |
                      |   (-)             |   (-)
                      |   |               |   |
                      |   +---------------|---+
                      |                   |
                      |                   H1(s)
                      |                   |
                      +-------------------<---
    ```
    *This diagram shows two feedback loops. The first feedback from $Y(s)$ to the summing point before $G_1(s)$ (via $H_1(s)$). The second feedback from the output of $G_1(s)$ to the summing point between $G_1(s)$ and $G_2(s)$ (direct connection). This is a good candidate for moving a summing point.*

    **Given:**
    *   Input: $R(s)$
    *   Output: $Y(s)$
    *   Blocks: $G_1(s)$, $G_2(s)$, $H_1(s)$
    *   Connections: A main feedback loop from $Y(s)$ via $H_1(s)$ to the initial summing point. A second feedback from the output of $G_1(s)$ directly to the summing point between $G_1(s)$ and $G_2(s)$.

    **What we want:** A single transfer function $T(s) = \frac{Y(s)}{R(s)}$.

**Solution for Revised Example 4:**

**Step 1: Move the summing point after $G_1(s)$ to before $G_1(s)$.**
*   **Explanation:** The summing point between $G_1(s)$ and $G_2(s)$ has a direct feedback from the output of $G_1(s)$. This makes it hard to simplify. We want to move this summing point *before* $G_1(s)$. When moving a summing point *backward* (against the signal flow) past a block, any signal entering that summing point must be multiplied by the transfer function of the block it's moving past. In this case, the direct feedback signal (which is $G_1(s)E_1(s)$ where $E_1(s)$ is the input to $G_1(s)$) is fed back. If we move the summing point before $G_1(s)$, this direct feedback path must be divided by $G_1(s)$.
*   **Let's label the signals for clarity:**
    Let $E_1(s)$ be the output of the first summing point.
    Let $X_1(s)$ be the output of $G_1(s)$. So $X_1(s) = G_1(s)E_1(s)$.
    Let $E_2(s)$ be the output of the second summing point.
    The diagram shows $E_2(s) = X_1(s) - X_1(s) = 0$ if the feedback is direct. This is a common point of confusion in diagrams.
    Let's assume the feedback is from $X_1(s)$ *to* the second summing point, and the *other* input to that summing point is $X_1(s)$ from $G_1(s)$. This is a standard *positive* feedback with $G_1(s)$ as $H(s)$ in the inner loop.
    Let's assume the diagram means:
    ```
           R(s) ----> (+) ----> G1(s) ----> (+) ----> G2(s) ----> Y(s)
                      ^   |               ^   |
                      |   |               |   |
                      |   (-)             |   (-)
                      |   |               |   |
                      |   +---------------|---+  (Feedback from Y(s) via H1(s))
                      |                   |
                      |                   (Direct feedback from output of G1(s) to second summing point)
                      +-------------------<---
    ```
    This is still ambiguous. The best way to handle this is to write down the equations for each summing point and block.

    Let's re-draw the diagram with clear labels and intent.
    **Example 4 (Actual complex diagram, requires moving points):**
    **Problem Statement:** Reduce the following block diagram to a single transfer function $\frac{Y(s)}{R(s)}$.
    ```
           R(s) ----> (+) ----> G1(s) ----> (+) ----> G2(s) ----> Y(s)
                      ^   |               ^   |
                      |   |               |   |
                      |   (-)             |   (-)
                      |   |               |   |
                      |   +---------------|---+
                      |                   |
                      |                   H1(s)
                      |                   |
                      +-------------------<---
    ```
    *Here, $H_1(s)$ feeds back from the output of $G_1(s)$ to the summing point between $G_1(s)$ and $G_2(s)$. And there's another feedback path from $Y(s)$ to the first summing point.* This is a good example.

    **Given:**
    *   Input: $R(s)$
    *   Output: $Y(s)$
    *   Blocks: $G_1(s)$, $G_2(s)$, $H_1(s)$
    *   Connections: A feedback loop from $Y(s)$ to the initial summing point (let's assume it's a direct feedback of $Y(s)$ with a gain of 1, and negative). An inner feedback loop from the output of $G_1(s)$ via $H_1(s)$ to the summing point *after* $G_1(s)$.

    **What we want:** A single transfer function $T(s) = \frac{Y(s)}{R(s)}$.

**Solution for Example 4 (using the last diagram interpretation):**

**Step 1: Simplify the inner feedback loop.**
*   **Explanation:** There's an inner feedback loop where $G_1(s)$ is the forward path, and $H_1(s)$ is the feedback path. The output of $G_1(s)$ is fed back through $H_1(s)$ to the summing point that *receives* the output of $G_1(s)$ as its primary input. This is a bit unusual. Let's trace the signals carefully.
    Let $E_1(s)$ be the output of the first summing point.
    Let $X_1(s)$ be the output of $G_1(s)$, so $X_1(s) = G_1(s)E_1(s)$.
    The second summing point receives $X_1(s)$ as a positive input.
    It receives $H_1(s)X_1(s)$ as a negative input.
    So, the output of the second summing point, $E_2(s)$, is $E_2(s) = X_1(s) - H_1(s)X_1(s) = X_1(s)(1 - H_1(s))$.
    This means the block *before* $G_2(s)$ effectively becomes $G_1(s)(1 - H_1(s))$.
*   **Mathematical Step:**
    Let $G_{eff1}(s)$ be the effective transfer function from $E_1(s)$ to $E_2(s)$.
    $$E_2(s) = G_1(s)E_1(s) - H_1(s)G_1(s)E_1(s)$$
    $$E_2(s) = G_1(s)(1 - H_1(s))E_1(s)$$
    So, the block equivalent to $G_1(s)$ and the summing point with $H_1(s)$ feedback is $G_1(s)(1 - H_1(s))$.
    Let $G_{A}(s) = G_1(s)(1 - H_1(s))$.
*   **Resulting Diagram:**
    ```
           R(s) ----> (+) ----> GA(s) ----> G2(s) ----> Y(s)
                      ^   |
                      |   |
                      |   (-)
                      |   |
                      +---<-------------------+  (Direct feedback from Y(s))
    ```
    *Note: The feedback from $Y(s)$ to the first summing point is assumed to be a direct feedback with gain 1 for simplicity, as no block is specified.*

**Step 2: Simplify the series blocks.**
*   **Explanation:** Now $G_A(s)$ and $G_2(s)$ are in series in the forward path.
*   **Mathematical Step:**
    Let $G_{fwd}(s)$ be the equivalent forward path transfer function.
    $$G_{fwd}(s) = G_A(s)G_2(s)$$
    Substitute $G_A(s)$:
    $$G_{fwd}(s) = G_1(s)(1 - H_1(s))G_2(s)$$
*   **Resulting Diagram:**
    ```
           R(s) ----> (+) ----> Gfwd(s) ----> Y(s)
                      ^   |
                      |   |
                      |   (-)
                      |   |
                      +---<-------------------+  (Direct feedback from Y(s))
    ```

**Step 3: Apply the main feedback formula.**
*   **Explanation:** We now have a standard negative feedback loop. The forward path is $G_{fwd}(s)$. The feedback path is a direct connection from $Y(s)$ to the summing point with a negative sign, meaning $H(s) = 1$.
*   **Mathematical Step:**
    Using the feedback formula $T(s) = \frac{G(s)}{1 + G(s)H(s)}$:
    $$T(s) = \frac{G_{fwd}(s)}{1 + G_{fwd}(s) \cdot 1}$$
    Substitute $G_{fwd}(s)$:
    $$T(s) = \frac{G_1(s)(1 - H_1(s))G_2(s)}{1 + G_1(s)(1 - H_1(s))G_2(s)}$$
*   **Final Answer:** The equivalent transfer function is:
    $$\boxed{T(s) = \frac{Y(s)}{R(s)} = \frac{G_1(s)G_2(s)(1 - H_1(s))}{1 + G_1(s)G_2(s)(1 - H_1(s))}}$$

**Reflection:** This example was tricky due to the unusual inner feedback structure and the implicit direct feedback. It emphasizes the importance of meticulously tracing signals and writing down intermediate equations to correctly interpret the diagram and apply the rules. When a feedback loop doesn't fit the standard form, writing out the algebraic equations for each summing point and block is the most reliable approach.

## 6. Common mistakes and traps

Students often stumble on block diagram algebra due to a few recurring errors:

1.  **Incorrectly Handling Summing Point Signs:** Forgetting to pay attention to the '+' and '-' signs at summing points, especially in feedback loops. A negative feedback loop has a $1 + GH$ denominator, while a positive feedback has $1 - GH$.
2.  **Confusing Series and Parallel:** Adding transfer functions for series blocks or multiplying for parallel blocks. Remember: Series = multiply ($G_1 G_2$), Parallel = add ($G_1 + G_2$).
3.  **Algebraic Errors in Simplification:** Complex fractions and polynomial multiplication/addition can lead to arithmetic errors. Take your time, show all steps, and double-check calculations.
4.  **Incorrectly Moving Summing/Pick-off Points:** Forgetting to add the compensatory block ($G(s)$ or $1/G(s)$) when moving a summing or pick-off point across another block. This is a subtle but critical rule.
5.  **Ignoring Implicit Unity Feedback:** If a feedback path is shown as a direct line back to a summing point without a block, it implies a unity feedback block ($H(s)=1$). Forgetting this leads to incorrect denominators in feedback formulas.
6.  **Not Working Systematically:** Trying to simplify too much at once, or not reducing the innermost loops/simplest combinations first. A step-by-step approach, redrawing the diagram after each simplification, is key.

## 7. Textbook-precise explanation

Block diagram algebra is a graphical technique for the representation and reduction of linear, time-invariant (LTI) systems. It provides a visual framework to understand the interconnections and signal flow within a system, particularly useful for control systems. The fundamental components of a block diagram are:

1.  **Block:** Represents an LTI system component, characterized by its transfer function $G(s)$, which is the Laplace transform of its impulse response. If $X(s)$ is the Laplace transform of the input and $Y(s)$ is the Laplace transform of the output, then $Y(s) = G(s)X(s)$.
2.  **Summing Point:** A node where two or more signals are algebraically combined. Each input signal is associated with a plus (+) or minus (-) sign. For inputs $X_1(s), X_2(s), \dots, X_n(s)$ and output $Y(s)$, $Y(s) = \sum_{i=1}^n \pm X_i(s)$.
3.  **Pick-off Point (Branch Point):** A node where a signal branches, allowing the same signal to be transmitted to multiple points in the diagram without alteration. If $X(s)$ is the input to a pick-off point, all output branches carry the signal $X(s)$.

The rules for block diagram reduction are derived from the fundamental algebraic relationships of these components and are used to transform a complex diagram into a simpler, equivalent form, ultimately yielding a single overall transfer function $T(s) = \frac{Y(s)}{R(s)}$ from the system's input $R(s)$ to its output $Y(s)$. Key reduction rules include:

*   **Blocks in Series:** For two blocks $G_1(s)$ and $G_2(s)$ connected such that the output of $G_1(s)$ is the input to $G_2(s)$, the equivalent transfer function is $G_{eq}(s) = G_1(s)G_2(s)$.
*   **Blocks in Parallel:** For two blocks $G_1(s)$ and $G_2(s)$ receiving the same input $X(s)$ and whose outputs are summed, the equivalent transfer function is $G_{eq}(s) = G_1(s) + G_2(s)$.
*   **Standard Negative Feedback Loop:** For a forward path $G(s)$ and a feedback path $H(s)$ with negative feedback, the closed-loop transfer function is $T(s) = \frac{G(s)}{1 + G(s)H(s)}$. For positive feedback, it is $T(s) = \frac{G(s)}{1 - G(s)H(s)}$.
*   **Moving a Summing Point:**
    *   Past a block (forward): If a summing point is moved from after $G(s)$ to before $G(s)$, any signal entering the summing point (other than the main signal) must be multiplied by $1/G(s)$.
    *   Past a block (backward): If a summing point is moved from before $G(s)$ to after $G(s)$, any signal entering the summing point (other than the main signal) must be multiplied by $G(s)$.
*   **Moving a Pick-off Point:**
    *   Past a block (forward): If a pick-off point is moved from before $G(s)$ to after $G(s)$, the new branch created must include a $1/G(s)$ block.
    *   Past a block (backward): If a pick-off point is moved from after $G(s)$ to before $G(s)$, the new branch created must include a $G(s)$ block.

These rules, along with the ability to interchange the order of adjacent summing points or pick-off points, form the basis of block diagram algebra. The process typically involves iteratively applying these rules to simplify the diagram until a single equivalent block is obtained.

For further reading, refer to:
*   Ogata, K. (2010). *Modern Control Engineering* (5th ed.). Prentice Hall. (Chapter 2: Mathematical Models of Physical Systems, specifically sections on Block Diagram Representation).
*   Dorf, R. C., & Bishop, R. H. (2017). *Modern Control Systems* (13th ed.). Pearson. (Chapter 2: Mathematical Models of Systems, specifically sections on Block Diagram Models).

## 8. ASCII diagrams

Here are a few basic block diagram elements and a common feedback loop structure:

```text
1. Basic Block:
   X(s) ----> G(s) ----> Y(s)
   (Input)             (Output)

   Equation: Y(s) = G(s)X(s)

2. Summing Point:
       X1(s) ---+
                |
                v
       X2(s) ---+---> E(s)
                ^
                |
       X3(s) ---+

   Equation: E(s) = X1(s) + X2(s) - X3(s) (assuming signs are + for X1, X2, - for X3)

3. Pick-off Point:
   X(s) ----+----> Y1(s)
            |
            +----> Y2(s)

   Equation: Y1(s) = X(s), Y2(s) = X(s)

4. Blocks in Series:
   R(s) ----> G1(s) ----> G2(s) ----> Y(s)

   Equivalent: R(s) ----> G1(s)G2(s) ----> Y(s)

5. Blocks in Parallel:
         +----> G1(s) ---+
         |               |
   R(s) -+               +---> Y(s)
         |               |
         +----> G2(s) ---+

   Equivalent: R(s) ----> (G1(s) + G2(s)) ----> Y(s)

6. Standard Negative Feedback Loop:
       R(s) ----> (+) ----> G(s) ----> Y(s)
                  ^   |
                  |   |
                  |   (-)
                  |   |
                  H(s) <---

   Equivalent: R(s) ----> G(s) / (1 + G(s)H(s)) ----> Y(s)
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Think of "**S**implify **P**rogressively **A**ll **R**eductions, **K**eeping **F**eedback **L**oops **L**ast."
    *   **S**eries: Blocks in a line, multiply their effects. (Think of a chain reaction).
    *   **P**arallel: Blocks side-by-side, add their effects. (Think of two separate paths leading to the same destination).
    *   **A**dd/Subtract (Summing Points): Pay attention to the signs! (Like mixing ingredients).
    *   **R**eplicate (Pick-off Points): Signal duplicates, value unchanged. (Like a "T" junction in a pipe).
    *   **K**ey **F**eedback **L**oop: $\frac{G}{1 \pm GH}$. This is the most crucial pattern. (Visualize a snake eating its own tail, but with a controller in between).
    *   **L**ast: Moving summing/pick-off points are usually the last resort for complex diagrams.

2.  **Formulas/Facts to Overlearn:**
    *   **Series:** $G_{eq}(s) = G_1(s)G_2(s)$
    *   **Parallel:** $G_{eq}(s) = G_1(s) + G_2(s)$
    *   **Negative Feedback:** $T(s) = \frac{G(s)}{1 + G(s)H(s)}$ (This is the absolute most important one).

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review all rules and mentally walk through one easy example.
    *   **Day 3:** Rework the easy example and attempt one medium example from memory.
    *   **Day 7:** Rework the medium example and attempt one hard example. Focus on the moving-point rules.
    *   **Day 16:** Review all rules, derive the feedback formula from scratch, and attempt a new hard example.
    *   **Day 35:** Go through all rules and derivations, ensuring you can explain them clearly without notes. Solve the hardest example you can find.

4.  **First-Principles Re-derivation Pathway (for the feedback formula):**
    If you ever forget the feedback formula $T(s) = \frac{G(s)}{1 \pm G(s)H(s)}$, you can always derive it from the basic definitions:
    1.  **Define signals:** Let $R(s)$ be input, $Y(s)$ be output, $E(s)$ be the error signal, and $B(s)$ be the feedback signal.
    2.  **Summing Point Equation:** $E(s) = R(s) - B(s)$ (for negative feedback).
    3.  **Forward Path Equation:** $Y(s) = G(s)E(s)$.
    4.  **Feedback Path Equation:** $B(s) = H(s)Y(s)$.
    5.  **Substitute:** Substitute (4) into (2): $E(s) = R(s) - H(s)Y(s)$.
    6.  **Substitute again:** Substitute this new $E(s)$ into (3): $Y(s) = G(s)[R(s) - H(s)Y(s)]$.
    7.  **Expand:** $Y(s) = G(s)R(s) - G(s)H(s)Y(s)$.
    8.  **Rearrange for Y(s):** $Y(s) + G(s)H(s)Y(s) = G(s)R(s)$.
    9.  **Factor Y(s):** $Y(s)[1 + G(s)H(s)] = G(s)R(s)$.
    10. **Solve for T(s) = Y(s)/R(s):** $T(s) = \frac{Y(s)}{R(s)} = \frac{G(s)}{1 + G(s)H(s)}$.
    This derivation path should be second nature.

## 10. Connections — what this leads to

Mastering block diagram algebra is not an end in itself, but a crucial stepping stone to understanding and designing complex dynamic systems. It directly unlocks:

*   **Stability Analysis:** Once you have a single transfer function for a system, you can analyze its stability using techniques like Routh-Hurwitz criterion, Bode plots, Nyquist plots, and root locus. These methods tell you whether a system will settle to a steady state or oscillate uncontrollably. This is paramount in rocket science for ensuring stable flight.
*   **Performance Analysis:** The equivalent transfer function allows you to predict how a system will respond to different inputs (e.g., step input, ramp input). You can determine metrics like rise time, settling time, overshoot, and steady-state error, which are critical for system design.
*   **Controller Design:** Block diagrams are the primary tool for designing and implementing controllers (like PID controllers, lead-lag compensators). You can insert a controller block into a feedback loop and then use block diagram algebra to analyze its effect on the overall system performance and stability.
*   **State-Space Representation:** While transfer functions (and thus block diagrams) are excellent for single-input, single-output (SISO) systems, multi-input, multi-output (MIMO) systems are often better represented by state-space models. However, the conceptual understanding of system interconnection gained from block diagrams greatly aids in understanding state-space formulations and converting between the two.
*   **Digital Control Systems:** When control systems are implemented using microprocessors, the continuous-time transfer functions are converted into discrete-time equivalents using Z-transforms. Block diagrams are still used to represent these discrete-time systems, and the algebra principles remain largely the same.
*   **Optimal Control and Adaptive Control:** These advanced topics build on the foundation of control system modeling. Block diagrams help visualize the complex algorithms and feedback paths involved in systems that optimize their performance or adapt to changing conditions.

## 11. Self-check questions

1.  Explain in your own words the difference between a summing point and a pick-off point in terms of signal flow.
2.  A system has three blocks: $G_A(s) = \frac{1}{s+1}$, $G_B(s) = s+2$, and $G_C(s) = \frac{1}{s}$. If $G_A(s)$ and $G_B(s)$ are in series, and this combination is in parallel with $G_C(s)$, what is the equivalent transfer function?
3.  Derive the transfer function for a positive feedback loop, starting from the basic signal equations (similar to the negative feedback derivation in section 9).
4.  Consider a control system where a proportional controller $K_p$ is in the forward path, followed by a plant $P(s) = \frac{1}{s(s+1)}$. The output of the plant is fed back through a sensor $H(s) = 5$ to a summing point, where it is subtracted from the reference input. Draw the block diagram and find the overall closed-loop transfer function $\frac{Y(s)}{R(s)}$.
5.  Reduce the following complex block diagram to a single transfer function $\frac{Y(s)}{R(s)}$. Assume all feedback paths shown are negative.
    ```
           R(s) ----> (+) ----> G1(s) ----> (+) ----> G2(s) ----> Y(s)
                      ^   |               ^   |
                      |   |               |   |
                      |   (-)             |   (-)
                      |   |               |   |
                      |   +---------------|---+
                      |                   |
                      |                   H2(s)
                      |                   |
                      