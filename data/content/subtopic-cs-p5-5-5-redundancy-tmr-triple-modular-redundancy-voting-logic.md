## What it is
Triple Modular Redundancy (TMR) is a fault-tolerance technique where three identical modules perform the same operation in parallel. Their results are fed into a "voter" circuit, which outputs the majority result. This allows the system to continue operating correctly even if one of the three modules fails, as the two correct modules will outvote the faulty one.

## Why it matters
TMR is the bedrock of safety-critical systems where failure is not an option. The flight control computers on the SpaceX Falcon 9 and the Space Shuttle used TMR to ensure that a single-event upset from cosmic radiation or a hardware failure wouldn't cause a catastrophic loss of control. In high-availability computing and nuclear reactor control systems, TMR provides the reliability needed to prevent disaster or massive financial loss.

## When to study it
Before tackling TMR, you must have a firm grasp of two areas:
1.  **Digital Logic:** You should be comfortable with basic logic gates (AND, OR, NOT) and how to express their function using Boolean algebra.
2.  **Probability Theory:** You need to understand the probability of independent events, binomial distributions, and how to calculate the probability of "at least k successes in n trials."

If these concepts are not solid, review them first. TMR is an application of these fundamentals.

## How to study it (step by step)
1.  **Draw the System:** On paper, draw the block diagram for a TMR system. Label the three identical modules (A, B, C), the single input, the voter, and the final system output. This grounds the abstract concept.
2.  **Design the Voter:** Write down the Boolean expression for a 3-input majority voter. Let the inputs be $A$, $B$, and $C$. The output $Y$ should be true if at least two of the inputs are true. Derive the expression and simplify it.
3.  **Derive the Reliability Formula:** Assume each module has a probability of success (reliability) of $R$. From first principles, calculate the probability that the TMR system as a whole succeeds. The system succeeds if all three modules work, or if any two modules work.
4.  **Analyze the Crossover Point:** The TMR system is not always more reliable than a single module. Plot the reliability of the TMR system, $R_{TMR}$, against the reliability of a single module, $R$. Find the value of $R$ for which $R_{TMR} = R$. This is the crossover point below which adding redundancy makes the system *worse*.
5.  **Incorporate the Voter:** Now, assume the voter itself has a reliability $R_v$. Re-derive the total system reliability, $R_{system}$. Notice how the voter acts as a single point of failure that limits the maximum achievable reliability.

## Key ideas, with intuition
1.  **Fault Masking, Not Correction:** TMR's primary function is to *mask* a fault. The system's output remains correct despite an internal failure. It does not detect or report which module failed, nor does it repair it. Think of it as a team where two people can cover for a third person's mistake without the boss ever knowing it happened.

2.  **The Voter is a Critical Point of Failure:** The entire TMR architecture relies on the voter being correct. If the voter fails, the outputs of the modules are irrelevant. The reliability of the voter itself places an upper bound on the reliability of the entire system.
    $$ R_{system} = R_{TMR} \times R_{voter} $$
    No matter how reliable the redundant modules are, the system can never be more reliable than its voter.

3.  **Redundancy is Not a Panacea (The Crossover Point):** TMR only improves system reliability if the individual modules are already quite reliable. If the modules are unreliable, adding more of them just adds more potential points of failure. The system succeeds if 2 or 3 modules work. Let $R$ be the reliability of one module.
    *   Probability of all 3 working: $P(3) = R^3$
    *   Probability of exactly 2 working: There are $\binom{3}{2}=3$ ways this can happen (AB work, C fails; AC work, B fails; BC work, A fails). Each has a probability of $R^2(1-R)$. So, $P(2) = 3R^2(1-R)$.
    *   The total TMR reliability is the sum:
        $$ R_{TMR} = P(3) + P(2) = R^3 + 3R^2(1-R) = R^3 + 3R^2 - 3R^3 = 3R^2 - 2R^3 $$
    If $R=0.6$, then $R_{TMR} = 3(0.6)^2 - 2(0.6)^3 = 1.08 - 0.432 = 0.648$. This is only a marginal improvement. But if $R=0.95$, $R_{TMR} = 3(0.95)^2 - 2(0.95)^3 \approx 0.9928$, a significant improvement. The crossover point where TMR offers no benefit is $R=0.5$. For $R < 0.5$, TMR is worse than a single module.

## Worked example
**Problem:** A critical processing module for a satellite has a reliability of $R = 0.9$ over its mission lifetime. To improve this, engineers implement a TMR system using three such modules. The voter circuit they use has a reliability of $R_v = 0.999$. What is the reliability of the final TMR system? Is it an improvement over a non-redundant system?

**Step 1: Calculate the reliability of the redundant module block ($R_{TMR}$).**
We use the derived formula: $R_{TMR} = 3R^2 - 2R^3$.
Given $R = 0.9$:
$$ R_{TMR} = 3(0.9)^2 - 2(0.9)^3 $$
$$ R_{TMR} = 3(0.81) - 2(0.729) $$
$$ R_{TMR} = 2.43 - 1.458 $$
$$ R_{TMR} = 0.972 $$
*Reflection: This step calculates the probability that at least two of the three modules will work correctly. The result, 0.972, is already a significant improvement over the single module's 0.9 reliability.*

**Step 2: Incorporate the reliability of the voter.**
The voter is in series with the block of three modules. For a series system, the total reliability is the product of the component reliabilities.
$$ R_{system} = R_{TMR} \times R_v $$
Given $R_{TMR} = 0.972$ and $R_v = 0.999$:
$$ R_{system} = 0.972 \times 0.999 $$
$$ R_{system} \approx 0.971028 $$
*Reflection: This step accounts for the fact that the voter itself can fail. As expected, it slightly reduces the overall system reliability from the ideal case where the voter was perfect.*

**Step 3: Compare with the non-redundant system.**
The original, non-redundant system had a reliability of $R = 0.9$.
The new TMR system has a reliability of $R_{system} \approx 0.971$.
The improvement is significant. The probability of failure has been reduced from $1 - 0.9 = 0.1$ (or 10%) to $1 - 0.971 = 0.029$ (or 2.9%).

**Conclusion:** The TMR implementation provides a substantial improvement in mission reliability.

## Diagrams
A block diagram of a Triple Modular Redundancy system.

```text
               +----------------+
               |    Module A    |----+
               | (Reliability R)|    |
               +----------------+    |
                                     v
+-------+      +----------------+  +-------+      +--------+
| Input |----->|    Module B    |->|       |      | System |
|       |      | (Reliability R)|  | Voter |----->| Output |
+-------+      +----------------+  |       |      +--------+
                                   +-------+
                                     ^
               +----------------+    |
               |    Module C    |----+
               | (Reliability R)|
               +----------------+
```

## Memory technique — remember this forever
1.  **The Story:** Think of "Three Test Pilots." A spacecraft needs to make a critical burn. Three identical, independent flight computers (the modules) calculate the burn duration. They report their results to the Mission Commander (the voter). If one computer glitches and gives a wild result, the Commander ignores it and goes with the two that agree. The mission succeeds unless two or more pilots make the *same* mistake, or the Commander mishears them all.

2.  **Must-Know Formula:** The reliability of the redundant module block is:
    $$ R_{TMR} = 3R^2 - 2R^3 $$
    Overlearn this. Write it out. Say it out loud. It is the core of TMR analysis.

3.  **Spaced Repetition Schedule:**
    *   Review this material in: 1 day.
    *   Then again in: 3 days.
    *   Then again in: 7 days.
    *   Then again in: 16 days.
    *   Final review in: 35 days.

4.  **First Principles Pathway:** If you forget the formula, rebuild it from probability. A TMR system works if "at least 2 modules work."
    *   P(at least 2 work) = P(exactly 2 work) + P(all 3 work)
    *   P(all 3 work) = $R \times R \times R = R^3$
    *   P(exactly 2 work) = [P(A&B work, C fails) OR P(A&C work, B fails) OR P(B&C work, A fails)]
    *   P(exactly 2 work) = $3 \times [R \times R \times (1-R)] = 3R^2(1-R)$
    *   Add them: $R_{TMR} = 3R^2(1-R) + R^3 = 3R^2 - 3R^3 + R^3 = 3R^2 - 2R^3$. You can always re-derive it.

## Common mistakes
1.  **Forgetting the Voter:** Students often calculate $R_{TMR}$ and stop, forgetting that the voter is a component that can fail and must be included in the final system reliability calculation, usually as a series component.
2.  **Assuming TMR is Always Better:** TMR only provides a benefit when the module reliability $R > 0.5$. For unreliable components, adding more of them increases the likelihood that a majority will fail, making the system worse.
3.  **Ignoring Common-Mode Failures:** The standard TMR analysis assumes failures are independent. It does not protect against a design flaw in the module software or a systemic environmental factor (like extreme temperature) that causes *all three* modules to fail in the same way.

## Self-check
1.  A processing unit has a reliability of $R = 0.99$. What is the reliability of a TMR system built from these units, assuming a perfect voter?
2.  At what exact value of module reliability $R$ does a TMR system provide no improvement over a single module? Derive this value algebraically.
3.  A TMR system is built with modules of reliability $R=0.95$. The system must have an overall reliability of at least $0.99$. What is the minimum required reliability for the voter, $R_v$?