## What it is
The unitary method is a foundational problem-solving technique where you determine the value of a single unit of a quantity (the "unit rate") to find the value of a multiple or fraction of that quantity. It governs two types of relationships: direct proportion, where two quantities scale up or down together at a constant ratio, and inverse proportion, where one quantity scales up exactly as the other scales down, keeping their product constant. 

## Why it matters
This is the bedrock of dimensional analysis and scaling. In aerospace, you use direct proportion to calculate fuel mass based on burn rates, and inverse proportion to relate velocity and travel time for orbital transfers. In computer science, it is the intuition behind linear time complexity $O(N)$. If you cannot reliably scale units and recognize inverse relationships, you will miscalculate system requirements and fail at basic physics derivations.

## When to study it
You must understand basic arithmetic (multiplication, division, and fractions) before starting. You should also be comfortable with the concept of algebraic variables ($x, y, k$). If you struggle to manipulate fractions or solve a basic equation like $3x = 12$, stop and master those operations first.

## How to study it (step by step)
1. **Identify the relationship type:** Read the problem and ask, "If I increase quantity A, does quantity B increase (direct) or decrease (inverse)?"
2. **Write the baseline state:** Write down the known relationship clearly with units (e.g., "5 engines produce $100 \text{ kN}$").
3. **Reduce to the unit bridge:** Calculate the value for exactly *one* unit of the independent variable. 
   * For direct proportion, *divide* (1 engine produces $\frac{100}{5} = 20 \text{ kN}$).
   * For inverse proportion, *multiply* (If 5 workers take 10 hours, 1 worker takes $5 \times 10 = 50$ hours).
4. **Scale to the target:** Multiply or divide your unit value by the new target quantity.
5. **Drill direct proportion:** Solve 5 problems involving cost, mass, or distance at a constant speed.
6. **Drill inverse proportion:** Solve 5 problems involving speed vs. time, or workforce vs. time. Time your steps to build fluency.

## Key ideas, with intuition
**The Unit as a Bridge**
You cannot easily scale from 7 units to 11 units in your head. The number $1$ is the bridge. You go $7 \to 1 \to 11$. The unitary method is simply finding the toll to cross that bridge.

**Direct Proportion ($y = kx$)**
Two variables $x$ and $y$ are directly proportional if their *ratio* is constant. 
$$ \frac{y}{x} = k $$
*Intuition:* Buying rocket fuel. If you double the volume of fuel ($x$), you double the mass ($y$). The constant $k$ is the density of the fuel. The rate ($\text{kg per liter}$) never changes.

**Inverse Proportion ($x y = k$)**
Two variables $x$ and $y$ are inversely proportional if their *product* is constant.
$$ x \cdot y = k $$
*Intuition:* Draining a tank. If you double the number of pumps ($x$), you halve the time it takes ($y$). The constant $k$ is the *total effort* or *total volume* required to drain the tank (e.g., "pump-hours"). The total workload never changes.

## Worked example
**Problem:** 4 identical pumps can drain a rocket's liquid oxygen tank in 12 hours. If a launch window requires the tank drained in 3 hours, how many pumps are needed?

**Step 1: Identify the relationship.** 
More pumps mean less time. This is an *inverse proportion*.

**Step 2: Find the unit value (The Bridge).**
If 4 pumps take 12 hours, how long does 1 pump take?
Since it's inverse, 1 pump has to do all the work alone. We multiply:
$$ 1 \text{ pump} = 4 \text{ pumps} \times 12 \text{ hours} = 48 \text{ pump-hours} $$
*Reflection:* The constant $k = 48$ is the conserved quantity—the total mechanical effort required to drain the tank.

**Step 3: Scale to target.**
We have 48 pump-hours of work to do, and we only have 3 hours to do it. 
$$ \text{Pumps needed} = \frac{48 \text{ pump-hours}}{3 \text{ hours}} = 16 \text{ pumps} $$
*Reflection:* Dividing the total effort by the target time yields the required rate of effort (pumps). The units elegantly cancel: $\frac{\text{pump} \cdot \text{hours}}{\text{hours}} = \text{pumps}$.

## Diagrams

```text
DIRECT PROPORTION (y = kx)          INVERSE PROPORTION (xy = k)
y (Mass)                            y (Time)
^                                   ^
|       /                           |  |
|      /                            |  |
|     /                             |   \
|    /                              |    \
|   /                               |     ---__
|  /                                |          ---___
| /                                 |                ---___
|/                                  |                      ---
+-----------------> x (Volume)      +-------------------------> x (Pumps)

Characteristics:                    Characteristics:
- Straight line                     - Hyperbola curve
- Passes through origin (0,0)       - Never touches the axes (asymptotes)
- Gradient is constant (k)          - Area of any rectangle drawn to 
                                      the curve is constant (k)
```

## Memory technique — remember this forever
1. **The Mnemonic:** "Direct Divides, Inverse Multiplies." 
   * To find the constant $k$ in Direct proportion, you *divide* ($y/x$). 
   * To find the constant $k$ in Inverse proportion, you *multiply* ($x \cdot y$).
2. **Formulas to overlearn:**
   * Direct: $\frac{y_1}{x_1} = \frac{y_2}{x_2}$
   * Inverse: $x_1 \cdot y_1 = x_2 \cdot y_2$
3. **Spaced-repetition schedule:** Review these two formulas and the "bridge" concept at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the formulas, ask yourself: *"What is conserved?"* If the *rate* is conserved (cost per kg), it's direct. Set the rates equal. If the *total amount* is conserved (total man-hours to build a wall), it's inverse. Set the totals equal.

## Common mistakes
* **Applying direct proportion to an inverse problem:** A student sees "4 pumps take 12 hours, find 6 pumps" and calculates $\frac{12}{4} \times 6 = 18$ hours. They failed Step 1. More pumps cannot take *more* time. Always do a sanity check on the direction of your answer.
* **Ignoring non-linear scaling:** The unitary method only works for linear relationships. If 1 pipe with a $2\text{ cm}$ radius fills a tank in 10 hours, a pipe with a $4\text{ cm}$ radius does *not* fill it in 5 hours. (Flow rate depends on area, which scales with $r^2$). 
* **Mixing units:** Calculating time in minutes for the first half of the problem and hours for the second half. Always write the units explicitly in your equations.

## Self-check
1. **(Direct)** If $15 \text{ kg}$ of aerospace-grade titanium costs $\$1,200$, exactly how much will $8 \text{ kg}$ cost?
2. **(Inverse)** A satellite traveling at $8 \text{ km/s}$ completes an orbital maneuver in $45 \text{ minutes}$. If it instead traveled at $6 \text{ km/s}$, how many minutes would the maneuver take?
3. **(Trap)** 3 automated rovers can survey a $10 \text{ km} \times 10 \text{ km}$ grid in 5 days. Assuming the same speed, how many days will it take 1 rover to survey a $20 \text{ km} \times 20 \text{ km}$ grid? *(Hint: Be very careful about what the "work" actually is).*