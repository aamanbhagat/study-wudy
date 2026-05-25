## What it is
Word problems using linear equations are real-world scenarios described in plain English that can be modeled using equations of the first degree (where the highest exponent of any variable is 1). Solving them requires a two-way translation: converting linguistic statements into mathematical symbols, solving the resulting equation, and interpreting the mathematical answer back into physical meaning.

## Why it matters
Mathematics is useless if it cannot describe reality. In physics and aerospace, every constant-rate process—such as fuel depletion during a coasting phase, calculating rendezvous times for spacecraft, or determining center of mass—boils down to linear equations. In computer science, they form the baseline for linear regression models and algorithmic time-complexity estimates. If you cannot translate reality into math, you cannot engineer reality.

## When to study it
You must already know how to solve basic linear equations (e.g., isolating $x$ in $3x + 4 = 19$). You should also be comfortable with basic algebraic properties (distributive, commutative) and the concept of a variable as a rigid placeholder for an unknown quantity. If you cannot solve $ax + b = cx + d$ fluently, go back and drill equation solving first. Do not attempt word problems if the algebra itself is still a bottleneck.

## How to study it (step by step)
1. **Read the problem twice.** Do not write anything on the first pass. On the second pass, identify exactly what quantity you are trying to find.
2. **Define your variables explicitly.** Write down "Let $x = \text{time in seconds}$". Do not skip this; undefined variables lead to logical chaos.
3. **Build a translation dictionary.** Map English words to math operators ("is" $\to =$, "sum" $\to +$, "per" $\to \times$). 
4. **Write the equation.** Assemble the translated parts. Ensure the units on the left side of the equals sign match the units on the right side.
5. **Solve the equation.** Use standard algebraic rules to isolate the variable.
6. **Verify the answer.** Plug the number back into the *original English text*, not just your equation, to see if it makes logical sense in the physical world.

## Key ideas, with intuition

**The Translation Dictionary**
English is ambiguous; math is not. You must memorize the standard mappings:
*   "More than" or "sum" $\to +$
*   "Less than" or "difference" $\to -$
*   "Of" $\to \times$ (e.g., "half of the fuel" is $\frac{1}{2}f$)
*   "Per" or "each" $\to \times$ (indicates a rate, e.g., "$5$ per hour" is $5h$)
*   "Is", "yields", or "results in" $\to =$

**The Anatomy of a Linear Model**
Most linear word problems follow a rigid structure:
$$ \text{Total} = (\text{Rate} \times \text{Input}) + \text{Starting Amount} $$
Think of this as $y = mx + b$. The rate ($m$) always has compound units (e.g., kg/s), which multiply by the input ($x$, e.g., s) to yield a flat unit (kg) that can be added to the starting amount ($b$, kg).

**Dimensional Consistency**
You cannot add kilograms to seconds. If your equation is $5x + 10 = 50$, and $10$ is in meters, then $5x$ must evaluate to meters, and $50$ must be in meters. If the units fail, your equation is wrong. Use this as an absolute truth serum for your setups.

## Worked example
**Problem:** A test rocket contains 1,200 kg of propellant. It burns propellant at a constant rate of 15 kg per second. How many seconds will it take for the rocket to have exactly 300 kg of propellant remaining?

**Step 1: Define variables.** 
Let $t = \text{time in seconds}$.

**Step 2: Identify components.** 
Starting amount = $1,200$ kg. 
Rate = $-15$ kg/s (negative because it is being consumed). 
Target total = $300$ kg.

**Step 3: Translate to equation.**
$$ \text{Starting Amount} + (\text{Rate} \times \text{Time}) = \text{Remaining Amount} $$
$$ 1200 - 15t = 300 $$

**Step 4: Solve.**
Subtract 1200 from both sides:
$$ -15t = 300 - 1200 $$
$$ -15t = -900 $$
Divide by -15:
$$ t = \frac{-900}{-15} = 60 $$

**Reflection:** The answer is 60 seconds. Checking the logic: 60 seconds at 15 kg/s is 900 kg burned. $1200 - 900 = 300$ kg remaining. The units match (kg - kg = kg), and the logic holds.

## Diagrams

```text
Mass (kg)
 1200 |*  (Start: 1200 kg at t=0)
      |  *
      |    *
      |      *  Slope = -15 kg/s
      |        *
  300 |----------* (Target: 300 kg at t=60)
      |            *
    0 +------------------ Time (s)
      0          60
```

## Memory technique — remember this forever

1. **The Mnemonic:** **DTSC** — **D**on't **T**rust **S**loppy **C**alculations. 
   * **D**efine variables.
   * **T**ranslate to math.
   * **S**olve the equation.
   * **C**heck the units.
2. **Overlearn this formula:** $\text{Total} = (\text{Rate} \times \text{Time}) + \text{Start}$. Do not paraphrase it. Know it exactly as $y = mx + b$ applied to reality.
3. **Spaced-repetition schedule:** Review this concept and solve one new word problem at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget how to set up the equation, fall back on dimensional analysis. Write down the units of every number in the problem. Multiply or divide them until they match the unit of the answer you are looking for. The math operations will naturally reveal the equation.

## Common mistakes
* **Reversing subtraction order:** Translating "10 less than $x$" as $10 - x$. It is $x - 10$. If I have 10 less than your age, I take your age ($x$) and subtract 10.
* **Answering the wrong question:** Finding $x = 5$ and stopping, when the question actually asked for "the age of the older brother", which was defined as $2x + 1$. Always re-read the final sentence of the prompt before boxing your answer.
* **Mixing units:** A problem gives a rate in meters per *second* but asks for the distance after 2 *minutes*. You must convert the 2 minutes into 120 seconds before plugging it into $x$.

## Self-check
1. A software script processes 45 logs per minute. If it has already processed 150 logs, write the equation to find out how many minutes ($m$) it will take to process a total of 1,050 logs.
2. The sum of three consecutive integers is 126. What is the value of the largest integer? (Hint: Define the first integer as $x$).
3. Two drones are 500 km apart, flying directly toward each other. Drone A flies at 60 km/h. Drone B flies at 90 km/h. How long will it take for them to meet, and how far will Drone A have traveled?