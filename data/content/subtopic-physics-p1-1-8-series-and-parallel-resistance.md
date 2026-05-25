## What it is
Series and parallel describe two fundamental ways to connect components in an electrical circuit. When components are connected in **series**, they form a single path for the current to flow, one after another. When components are in **parallel**, they are connected across the same two points, providing multiple paths for the current to split and flow through.

## Why it matters
This is the bedrock of all circuit analysis, from simple electronics to complex avionics. In aerospace, understanding series/parallel configurations is critical for designing redundant systems (parallel connections ensure a system doesn't fail if one component does) and for interpreting sensor data from Wheatstone bridges. In computer hardware, it's essential for understanding power distribution networks on a microchip.

## When to study it
Before tackling this, you must have a firm grasp of these prerequisites:
1.  **Ohm's Law:** The relationship between voltage ($V$), current ($I$), and resistance ($R$), expressed as $V=IR$.
2.  **Kirchhoff's Laws:**
    *   Kirchhoff's Current Law (KCL): The sum of currents entering a junction equals the sum of currents leaving it.
    *   Kirchhoff's Voltage Law (KVL): The sum of voltage drops around any closed loop in a circuit is zero.

If these are not solid, pause and review them. The derivations that follow depend entirely on them.

## How to study it (step by step)
1.  **Review First Principles:** Spend 15 minutes reviewing Ohm's Law and Kirchhoff's Laws. Write them down and state in your own words what they mean.
2.  **Derive the Series Formula:** Take a piece of paper and draw a circuit with a voltage source $V$ and two resistors, $R_1$ and $R_2$, in series. Apply KVL and Ohm's law to derive the formula for the equivalent resistance $R_{eq}$.
3.  **Derive the Parallel Formula:** Draw a new circuit with $V$, $R_1$, and $R_2$ in parallel. Apply KCL and Ohm's law to derive the formula for $R_{eq}$.
4.  **Solve a Pure Series Problem:** Find a textbook problem with 3-4 resistors in series. Calculate the total equivalent resistance, the total current, and the voltage drop across each resistor.
5.  **Solve a Pure Parallel Problem:** Find a problem with 3-4 resistors in parallel. Calculate the equivalent resistance, the total current, and the current flowing through each branch.
6.  **Solve a Mixed Problem:** Find a problem that combines series and parallel elements. Practice the strategy of identifying blocks of parallel or series resistors and simplifying them into a single equivalent resistor, repeating until the circuit is fully simplified.

## Key ideas, with intuition
1.  **Series is about a single path.** Imagine a narrow pipe with several constrictions (resistors) one after another. The water flow (current) must be the same through each constriction. The total effort to push water through (voltage) is the sum of the effort needed for each constriction. Therefore, resistances in series *add up* to make it harder for current to flow.
    $$ R_{eq, series} = R_1 + R_2 + ... + R_n = \sum_{i=1}^{n} R_i $$

2.  **Parallel is about multiple paths.** Imagine a large pipe that splits into several smaller pipes, which then rejoin. The water (current) splits, with more flowing through the wider pipes (lower resistance). The pressure difference (voltage) between the split and the rejoin point is the same for all paths. By adding more paths, you make it *easier* for the total current to flow.
    $$ \frac{1}{R_{eq, parallel}} = \frac{1}{R_1} + \frac{1}{R_2} + ... + \frac{1}{R_n} = \sum_{i=1}^{n} \frac{1}{R_i} $$
    Notice we are adding *conductances* ($G = 1/R$), which represent how easily current flows.

3.  **Equivalent Resistance ($R_{eq}$) is a simplification.** The goal is to replace a complex network of resistors with a single, mathematically equivalent resistor. From the perspective of the voltage source, a circuit with $R_{eq}$ draws the exact same total current as the original, more complex circuit. This is a tool for abstraction.

## Worked example
**Problem:** Find the equivalent resistance of the circuit below between points A and B. Then, if a 12V source is connected across A and B, find the total current drawn from the source.
$R_1 = 100\,\Omega$, $R_2 = 50\,\Omega$, $R_3 = 50\,\Omega$, $R_4 = 75\,\Omega$.

```text
      R1
A----/\/\/\----+----/\/\/\----B
               |      R4
               |
            +--+--+
            | R2  | R3
            +--+--+
               |
               +-------------+
                             | (Connected to B)
```
*Note: The ASCII diagram shows R1 in series with a parallel combination of R2 and R3, and that entire block is then in series with R4. Let's redraw for clarity.*

**Corrected Diagram Interpretation:**
$R_2$ and $R_3$ are in parallel. This combination is in series with $R_1$. The entire result is then in parallel with $R_4$.

```text
      +----/\/\/\----+----/\/\/\----+
      |      R1      |      R4      |
A ----+              +              +---- B
      |   +--/\/\/\--+              |
      |   |    R2    |              |
      +---+--/\/\/\--+              |
          |    R3    |              |
          +----------+              |
```
*My apologies, the ASCII is ambiguous. Let's assume the most common topology for such problems: $R_2$ and $R_3$ are in parallel, and their combination is in series with $R_1$. The entire circuit is driven by a source between A and B.*

**Corrected Diagram for Worked Example:**
```text
      R1            R2
A----/\/\/\----+----/\/\/\----+----B
               |              |
               +----/\/\/\----+
                      R3
```
*This is also ambiguous. Let's define the topology unambiguously in prose and solve.*

**Problem Statement (Unambiguous):**
A resistor $R_1 = 100\,\Omega$ is connected in series with a parallel combination of $R_2 = 50\,\Omega$ and $R_3 = 50\,\Omega$. Find the total equivalent resistance between points A (before $R_1$) and B (after the parallel combination).

**Step 1: Identify the innermost parallel/series group.**
Resistors $R_2$ and $R_3$ are in parallel. We must simplify this block first. Let's call its equivalent resistance $R_{23}$.

**Step 2: Calculate the equivalent resistance of the parallel group.**
The formula for parallel resistance is $\frac{1}{R_{eq}} = \sum \frac{1}{R_i}$.
$$ \frac{1}{R_{23}} = \frac{1}{R_2} + \frac{1}{R_3} = \frac{1}{50\,\Omega} + \frac{1}{50\,\Omega} = \frac{2}{50\,\Omega} = \frac{1}{25\,\Omega} $$
Now, invert the result to find $R_{23}$.
$$ R_{23} = 25\,\Omega $$

**Step 3: Redraw the simplified circuit.**
The circuit is now just $R_1$ in series with our new equivalent resistor $R_{23}$.
```text
      R1           R23
A----/\/\/\----+----/\/\/\----B
```

**Step 4: Calculate the equivalent resistance of the final series circuit.**
The formula for series resistance is $R_{eq} = \sum R_i$.
$$ R_{eq, total} = R_1 + R_{23} = 100\,\Omega + 25\,\Omega = 125\,\Omega $$

**Reflection:**
This step-by-step reduction is the key. We identified the most deeply nested component group ($R_2$ and $R_3$ in parallel), replaced it with its simpler equivalent ($R_{23}$), and then solved the remaining, simpler problem. This "collapse and conquer" strategy works for any complex resistor network.

## Diagrams
**Series Circuit**
A single path for the current $I$. The voltage drops $V_1$ and $V_2$ sum to the total source voltage $V_s$.
```text
        R1          R2
   +---/\/\/\---+---/\/\/\---+
   |                         |
  +|                         |
  V_s                        |
  -|                         |
   |           I -->         |
   +-------------------------+
```

**Parallel Circuit**
The current $I_s$ splits into $I_1$ and $I_2$. The voltage across both $R_1$ and $R_2$ is the same, $V_s$.
```text
        +----/\/\/\----+
        |      R1      |
        |   I1 -->     |
   +----+--------------+----+
   |    |              |    |
  +|    |   I2 -->     |    | I_s
  V_s   +----/\/\/\----+    |
  -|           R2           |
   |                        |
   +------------------------+
```

## Memory technique — remember this forever
1.  **The Story:**
    *   **Series:** Think of a **single-file line** of people going through several sequential security checks (resistors). The *flow of people* (current) is the same at every point. The total *delay* (voltage drop) is the sum of the delays at each checkpoint. Adding more checkpoints makes the total delay longer (resistance adds up).
    *   **Parallel:** Think of a crowded lobby with several **parallel exit doors** (resistors). The *urgency to leave* (voltage) is the same for everyone. The total *flow of people* (current) is the sum of the people going through each door. Opening more doors makes it easier for people to exit (total resistance goes down).

2.  **Formulas to Overlearn:**
    *   Series: $$R_{eq} = R_1 + R_2 + \dots$$
    *   Parallel: $$\frac{1}{R_{eq}} = \frac{1}{R_1} + \frac{1}{R_2} + \dots$$

3.  **Spaced Repetition Schedule:**
    *   Review these derivations and solve one mixed problem: tomorrow (day 1), in 3 days, in 7 days, in 16 days, in 35 days.

4.  **First Principles Pathway:**
    *   If you forget the series formula, draw a series circuit. Write Kirchhoff's Voltage Law (KVL): $V_s - V_1 - V_2 = 0$. Substitute Ohm's Law for each voltage drop: $V_s - I R_1 - I R_2 = 0$. The total equivalent resistance is defined by $V_s = I R_{eq}$. So, $I R_{eq} = I R_1 + I R_2$. Cancel the current $I$ (which is the same everywhere) to get $R_{eq} = R_1 + R_2$.
    *   If you forget the parallel formula, draw a parallel circuit. Write Kirchhoff's Current Law (KCL) at the junction where the current splits: $I_s = I_1 + I_2$. Substitute Ohm's Law for each current: $I = V/R$. The voltage $V_s$ is the same across each branch. So, $\frac{V_s}{R_{eq}} = \frac{V_s}{R_1} + \frac{V_s}{R_2}$. Cancel the voltage $V_s$ to get the formula.

## Common mistakes
1.  **Forgetting the Final Inversion:** For parallel circuits, students correctly calculate $\frac{1}{R_{eq}}$ but forget to take the reciprocal at the end to find $R_{eq}$. If you have two $10\,\Omega$ resistors in parallel, the answer is $5\,\Omega$, not $0.2\,\Omega^{-1}$.
2.  **Misidentifying Series/Parallel:** Two resistors are only in series if the *exact same current* flows through them with no other path branching off in between. Two resistors are only in parallel if they are connected across the *exact same two points* (nodes).
3.  **Incorrectly Applying the "Two Resistor" Shortcut:** For only two resistors in parallel, the formula $R_{eq} = \frac{R_1 R_2}{R_1 + R_2}$ ("product over sum") is a useful shortcut. Students often try to apply this incorrectly to three or more resistors. It only works for two at a time.

## Self-check
1.  A $10\,\Omega$, a $20\,\Omega$, and a $30\,\Omega$ resistor are connected in series to a 6V battery. What is the current flowing through the $20\,\Omega$ resistor?
2.  The same three resistors are now connected in parallel to the same 6V battery. What is the total current drawn from the battery?
3.  Consider a "cube" where each of the 12 edges is a $1\,\Omega$ resistor. What is the equivalent resistance between two opposite corners of the cube?