## What it is
Probability is the mathematical language for quantifying uncertainty. At its foundation, it involves defining all possible outcomes of a scenario (the sample space) and identifying the specific outcomes you care about (an event). The probability of that event is simply the ratio of your desired outcomes to the total possible outcomes, assuming every outcome is equally likely.

## Why it matters
In physics and aerospace, absolute certainty is a myth; sensor readings have noise and orbital trajectories have error bounds. In machine learning, probability forms the core of algorithms that make predictions from incomplete data. Understanding basic probability is the absolute prerequisite for stochastic calculus, quantum mechanics, and the Kalman filters used in rocket navigation. 

## When to study it
You must be comfortable with basic arithmetic, simplifying fractions, and the concept of sets (collections of distinct objects). If you cannot confidently manipulate fractions or understand what a subset is, review basic arithmetic and naive set theory first.

## How to study it (step by step)
1. Define a physical system (like rolling a die or flipping two coins) and write out the sample space $S$ manually using set notation. Do not take shortcuts.
2. Define three distinct events $E$ for your system (e.g., "sum is 7", "at least one heads") and list their specific elements.
3. Count the elements in $E$ and $S$ to calculate $P(E) = \frac{|E|}{|S|}$.
4. Prove to yourself that $0 \le P(E) \le 1$ by analyzing the extreme boundary cases where $E$ is completely empty or where $E = S$.
5. Calculate the probability of an event *not* happening, and verify algebraically that $P(\text{not } E) = 1 - P(E)$.

## Key ideas, with intuition
*   **The Sample Space ($S$ or $\Omega$):** The set of *all* mutually exclusive, exhaustive outcomes of an experiment. 
    *   *Intuition:* It is the "universe" of what could possibly happen. If you roll a standard die, $S = \{1, 2, 3, 4, 5, 6\}$.
*   **An Event ($E$):** A subset of the sample space ($E \subseteq S$). 
    *   *Intuition:* It is the specific condition you are testing for. "Rolling an even number" means the event is the set $E = \{2, 4, 6\}$.
*   **The Laplace Definition of Probability:** If all outcomes in $S$ are equally likely, the probability of $E$ occurring is the size of set $E$ divided by the size of set $S$.
    $$P(E) = \frac{|E|}{|S|} = \frac{\text{Number of favourable outcomes}}{\text{Total number of possible outcomes}}$$
*   **The Bounds of Reality:** Because an event is a subset of the sample space, the number of favourable outcomes can never be less than 0, nor can it be greater than the total number of outcomes. Therefore:
    $$0 \leq P(E) \leq 1$$ 
    A probability of $0$ means the event is impossible; $1$ means it is absolutely certain.

## Worked example
*Scenario:* You flip three fair coins. What is the probability of getting exactly two Heads?

*Step 1: Construct the sample space.*
$S = \{HHH, HHT, HTH, HTT, THH, THT, TTH, TTT\}$

*Step 2: Count total outcomes.*
$|S| = 8$.

*Step 3: Construct the event set.*
$E$ is the event "exactly two Heads". Look at $S$ and extract the exact matches.
$E = \{HHT, HTH, THH\}$

*Step 4: Count favourable outcomes.*
$|E| = 3$.

*Step 5: Calculate probability.*
$$P(E) = \frac{|E|}{|S|} = \frac{3}{8} = 0.375$$

*Reflection:* This worked because we systematically listed the entire sample space rather than guessing. By treating each coin as distinct (e.g., HHT is a different physical reality than THH), we ensured that all 8 outcomes in $S$ were equally likely, which is the strict requirement for using the formula $P(E) = \frac{|E|}{|S|}$.

## Diagrams

```text
SAMPLE SPACE (S) - Rolling a single 6-sided die
+---------------------------------------------------+
|                                                   |
|   Outcome: 1        Outcome: 3        Outcome: 5  |
|                                                   |
|      +-------------------------------------+      |
|      | EVENT (E): "Rolling an Even Number" |      |
|      |                                     |      |
|      |   Outcome: 2   Outcome: 4   Outcome: 6  |      |
|      |                                     |      |
|      +-------------------------------------+      |
+---------------------------------------------------+

|S| = 6 total outcomes in the universe
|E| = 3 favourable outcomes inside the target box
P(E) = |E| / |S| = 3 / 6 = 1 / 2
```

## Memory technique — remember this forever
1. **The Hook:** "Probability is just a target inside a universe." The universe is the denominator (everything that exists), the target is the numerator (what you want to hit).
2. **Formulas to overlearn:** 
   $$P(E) = \frac{|E|}{|S|}$$
   $$P(\text{not } E) = 1 - P(E)$$
3. **Spaced-repetition schedule:** Review this concept and re-derive the worked example at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the formula, remember that probability is simply a fraction of a whole. The whole universe is $100\%$ (or $1$). If a sample space has $N$ equal parts, each part carries a "probability mass" of $\frac{1}{N}$. If your event encompasses $k$ of those parts, you simply add up their masses: $k \times \frac{1}{N} = \frac{k}{N}$.

## Common mistakes
*   **Assuming outcomes are equally likely when they aren't.** "I either win the lottery or I don't, so my sample space is $\{Win, Lose\}$ and $P(Win) = 1/2$." This is completely false. The outcomes in the sample space must have equal physical weighting to use the basic ratio formula.
*   **Failing to distinguish identical-looking items.** If you roll two dice, rolling a 2-then-3 is a different physical outcome than rolling a 3-then-2. They must be counted as two distinct outcomes in your sample space to keep the probabilities uniform. 
*   **Double-counting elements in an event.** When finding the probability of drawing a red card or a King from a deck, students often count the Red Kings twice (once as a red card, once as a King). An element either belongs to the event set or it doesn't; it cannot be counted twice.

## Self-check
1. A bag contains 4 red marbles, 5 blue marbles, and 1 green marble. What is the probability of drawing a marble that is NOT blue?
2. You roll two standard six-sided dice. What is the probability that the sum of the numbers rolled is a prime number?
3. Consider a standard 52-card deck. You draw exactly one card. What is the probability that it is either a spade or a face card (Jack, Queen, King)?