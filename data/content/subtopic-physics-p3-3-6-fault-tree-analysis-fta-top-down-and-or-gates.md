## What it is
Fault Tree Analysis (FTA) is a systematic, top-down analytical method used to determine the root causes of a catastrophic system failure. It begins with a specific undesired event (like a booster explosion) and works backward using boolean logic gates (AND/OR) to map out all possible combinations of lower-level component failures that could trigger it.

## Why it matters
In aerospace engineering, FTA is legally and practically required to prove a spacecraft meets strict reliability thresholds (e.g., a $10^{-6}$ probability of loss of crew). It bridges hardware physics and systems engineering. Furthermore, its boolean logic structure directly maps to probabilistic risk assessment algorithms used in autonomous flight software, machine learning-driven fault detection, and nuclear reactor safety.

## When to study it
You should already understand:
1. Basic Boolean algebra (AND, OR, NOT operations).
2. Basic probability theory (independent vs. mutually exclusive events, calculating $P(A \cup B)$ and $P(A \cap B)$).
3. The functional architecture of basic mechanical/electrical systems (e.g., knowing a thruster requires both propellant and an ignition source). 
If you cannot confidently calculate the joint probability of two independent events, review foundational probability first.

## How to study it (step by step)
1. Define a simple "Top Event" for a familiar system (e.g., "Car fails to start").
2. Map the immediate preconditions using an OR gate (e.g., "Battery dead" OR "Starter motor broken" OR "No fuel").
3. Drill down into one of those preconditions using an AND gate (e.g., "Battery dead" requires "Alternator failed" AND "Battery drained").
4. Assign arbitrary probabilities to the lowest-level "basic events" and calculate the probability of the Top Event using Boolean probability rules.
5. Re-calculate the Top Event probability assuming one of the AND gates is changed to an OR gate. Observe the drastic, non-linear impact on system reliability.

## Key ideas, with intuition

**Top-Down Deduction**
You do not ask "What happens if this valve breaks?" (that is Bottom-Up analysis, or FMEA). You ask "The engine exploded; what combination of broken valves could cause this?" FTA is a diagnostic tool, not an exploratory one.

**The OR Gate (Series Failure)**
If *any* input fails, the output fails. This represents a lack of redundancy. For independent events $A$ and $B$, the probability of failure is:
$$P(A \text{ OR } B) = P(A \cup B) = P(A) + P(B) - P(A \cap B)$$
*Intuition:* If probabilities are very small (as in aerospace), $P(A \text{ OR } B) \approx P(A) + P(B)$. Probabilities accumulate, making failure highly likely. A system built entirely of OR gates is a fragile chain.

**The AND Gate (Parallel Failure / Redundancy)**
*All* inputs must fail for the output to fail. This models redundant systems. For independent events $A$ and $B$:
$$P(A \text{ AND } B) = P(A \cap B) = P(A) \times P(B)$$
*Intuition:* Multiplying two small fractions yields a microscopic fraction. If a valve has a 1% ($10^{-2}$) chance of failing, two in redundant parallel have a $10^{-4}$ chance of failing. This is how aerospace engineers achieve extreme reliability using imperfect parts.

**Minimal Cut Sets**
A "cut set" is a specific combination of basic events that triggers the top event. The "minimal cut sets" are the shortest paths to failure. If you have a minimal cut set of length 1 (a single basic event that leads directly to the top event via OR gates), your spacecraft has a single point of failure and is highly vulnerable.

## Worked example
**Scenario:** A spacecraft's main engine fails to ignite (Top Event). 
**Step 1:** Identify immediate causes. The engine needs fuel AND a spark to ignite. Therefore, ignition fails if there is (No Fuel) OR (No Spark).
**Step 2:** Break down "No Fuel". We have two redundant fuel valves, Valve 1 and Valve 2, in physical parallel. Fuel is blocked only if Valve 1 fails closed AND Valve 2 fails closed.
**Step 3:** Assign probabilities. Let $P(\text{No Spark}) = 0.01$. Let $P(\text{V1 fails}) = 0.1$ and $P(\text{V2 fails}) = 0.1$.
**Step 4:** Calculate the AND gate (No Fuel).
$$P(\text{No Fuel}) = P(\text{V1 fails}) \times P(\text{V2 fails}) = 0.1 \times 0.1 = 0.01$$
**Step 5:** Calculate the OR gate (Top Event).
$$P(\text{Top Event}) = P(\text{No Spark}) + P(\text{No Fuel}) - (P(\text{No Spark}) \times P(\text{No Fuel}))$$
$$P(\text{Top Event}) = 0.01 + 0.01 - (0.01 \times 0.01) = 0.02 - 0.0001 = 0.0199$$

*Reflection:* Notice how the redundant valves (the AND gate) reduced a 10% component failure rate into a 1% subsystem failure rate. However, the single point of failure (the spark) dominated the final probability via the OR gate. To improve this system, we must add redundancy to the spark mechanism.

## Diagrams

```text
            [ Engine Fails to Ignite ]
                    (Top Event)
                         |
                      ___|___
                     \  OR  /
                      \____/
                      /    \
                     /      \
       [ No Fuel ]               [ No Spark ]
      (Intermediate)             (Basic Event)
            |                      P = 0.01
         ___|___
        |  AND  |
         \_____/
         /     \
        /       \
[V1 Fails]     [V2 Fails]
(Basic Event)  (Basic Event)
 P = 0.1        P = 0.1
```

## Memory technique — remember this forever

1. **Visual hook:** Think of an **OR** gate as a **funnel** (any single drop of failure falls straight through to the bottom). Think of an **AND** gate as a series of **vault doors** (failure must pick *every single lock* to get through).
2. **Overlearn these formulas:**
   $$P_{\text{AND}} = \prod_{i=1}^{n} P_i$$
   $$P_{\text{OR}} \approx \sum_{i=1}^{n} P_i \quad \text{(for small independent probabilities)}$$
3. **Spaced-repetition schedule:** Review this logic and the worked example at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the exact OR formula, draw a Venn diagram of two overlapping circles $A$ and $B$. The total area (probability of A OR B) is $\text{Area}(A) + \text{Area}(B)$ minus the overlapping football shape in the middle ($A \cap B$). Hence, $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.

## Common mistakes

* **Confusing physical layout with logical layout:** This is the most common aerospace trap. Two valves in *physical parallel* (fluid redundancy) form an *AND gate* in a fault tree (both must fail closed to stop flow). Two valves in *physical series* form an *OR gate* in a fault tree (if either fails closed, flow stops).
* **Ignoring the intersection term in OR gates:** Simply adding probabilities for OR gates ($P(A) + P(B)$) works as an approximation for tiny numbers. But if $P(A)=0.6$ and $P(B)=0.6$, adding them gives 1.2, which violates probability axioms. Always subtract $P(A \cap B)$.
* **Assuming independence blindly:** Multiplying probabilities in an AND gate assumes the failures are independent. If a single radiation strike destroys both flight computers simultaneously, they are not independent. This is called a Common Cause Failure (CCF) and requires advanced FTA modeling.

## Self-check

1. A satellite's attitude control fails if the star tracker fails OR the reaction wheels fail. If $P(\text{star tracker}) = 0.05$ and $P(\text{wheels}) = 0.02$, what is the exact probability of attitude control failure assuming independence?
2. You have three redundant flight computers. The system fails only if all three fail. If each has an independent failure probability of $p$, write the expression for the system failure probability. What logical gate does this represent?
3. A thruster system has two parallel strings of valves. String A has two valves in series. String B has two valves in series. The system fails to provide thrust if String A is blocked AND String B is blocked. Map the Fault Tree (Top event down to the 4 basic valve failures) using AND/OR gates. What is the minimal cut set length?