## What it is
Conditional probability is the measure of the likelihood of an event occurring, given that another event has *already* occurred or is assumed to be true. It fundamentally works by shrinking your sample space—the "universe" of possible outcomes—from everything that could possibly happen down to only the scenarios where the condition is true.

## Why it matters
This is the engine of Bayesian inference, which powers modern machine learning, spam filters, and predictive algorithms. In aerospace and physics, systems do not fail in a vacuum; they fail under specific conditions. You do not care about the general probability of an O-ring failing; you care about the probability of an O-ring failing *given* that the launch temperature is below 40°F. 

## When to study it
You must already possess a rock-solid understanding of:
1. **Basic Probability:** $P(A)$, sample spaces ($\Omega$), and discrete counting.
2. **Set Theory:** Intersections ($A \cap B$), unions ($A \cup B$), and complements ($A^c$).
If you cannot confidently shade $A \cap B^c$ on a Venn diagram, stop and review set theory.

## How to study it (step by step)
1. **Define the reduced sample space:** Write down a simple discrete scenario (e.g., rolling a 6-sided die). Calculate $P(\text{even})$. Then calculate $P(\text{even} \mid \text{greater than 3})$. Notice how the denominator changes from 6 to 3.
2. **Derive the formula from counting:** Write out $\frac{\text{Count}(A \cap B)}{\text{Count}(B)}$ and divide the numerator and denominator by the total sample size $N$ to prove the formula to yourself.
3. **Correct the common typo:** Note that the title of this lesson contains a classic error. $P(A|B) = \frac{P(A \cap B)}{P(B)}$, *not* $P(A)$. You always divide by the probability of the *given* event.
4. **Master contingency tables:** Find a 2x2 table of frequencies. Calculate marginal probabilities (the totals) and conditional probabilities (a specific cell divided by a row/column total).
5. **Rearrange to the Multiplication Rule:** Multiply both sides by $P(B)$ to get $P(A \cap B) = P(A|B)P(B)$. This is how you calculate the probability of a sequence of dependent events.

## Key ideas, with intuition

**1. The Shrinking Universe**
Normally, the probability of $A$ is the area of $A$ divided by the area of the entire sample space $\Omega$ (which is 1). When we say "given $B$" (written $|B$), we are stating that $B$ has absolutely happened. The rest of the universe $\Omega$ is dead to us. $B$ is our new universe. To find the probability of $A$ in this new universe, we look at the part of $A$ that lives inside $B$ (which is $A \cap B$) and divide it by our new total area ($B$).

**2. The Formal Definition**
For any two events $A$ and $B$ where $P(B) > 0$:
$$P(A|B) = \frac{P(A \cap B)}{P(B)}$$

**3. Mathematical Independence**
In plain English, two events are independent if knowing one tells you absolutely nothing about the other. Mathematically, $A$ and $B$ are independent if and only if:
$$P(A|B) = P(A)$$
If the shrinking of the universe to $B$ didn't change the density of $A$, the events do not affect each other.

## Worked example
**Problem:** An aerospace manufacturer produces 200 titanium valves. 40 of these valves were forged at high temperature ($H$). 10 of the valves have micro-fractures ($M$). 8 of the valves were both forged at high temperature *and* have micro-fractures. If a randomly selected valve was forged at high temperature, what is the probability it has micro-fractures?

**Step 1: Identify the knowns.**
*   Total valves $N = 200$
*   $P(H) = \frac{40}{200} = 0.20$
*   $P(M \cap H) = \frac{8}{200} = 0.04$

**Step 2: State what you are looking for.**
We want the probability of micro-fractures *given* high temperature: $P(M|H)$.

**Step 3: Apply the formula.**
$$P(M|H) = \frac{P(M \cap H)}{P(H)}$$
$$P(M|H) = \frac{0.04}{0.20} = 0.20$$

**Reflection:** Why did this work? We could have bypassed probabilities and just used counts. There are 40 high-temp valves. 8 of them have fractures. $\frac{8}{40} = 0.20$. The formula simply scales these counts by the total $N$, preserving the ratio. 

## Diagrams

```text
THE SHRINKING UNIVERSE

1. Original Sample Space (Omega)
+-----------------------------------------+
|                  Omega                  |
|       .......            .......        |
|     ..       ..        ..       ..      |
|    .           .      .           .     |
|   .      A      .    .      B      .    |
|   .             .    .             .    |
|    .             .  .             .     |
|     ..            ..            ..      |
|       .......   A ∩ B  .......          |
+-----------------------------------------+

2. Given B: The Universe Shrinks
+-----------------------------------------+
|                                         |
|                                         |
|                                         |
|                       .......           |
|                     ..       ..         |
|      (Dead         .           .        |
|      Space)       .      B      .       |
|                   .   (New      .       |
|                    .  Omega)    .       |
|                     ..        ..        |
|       .......   A ∩ B  .......          |
+-----------------------------------------+
To find P(A|B), you only care about the fraction 
of B's area that is occupied by A ∩ B.
```

## Memory technique — remember this forever

1. **The Mnemonic:** *"Divide by the Given."* 
   Whatever is to the right of the vertical bar $|$ is the "given." It goes in the denominator. $P(X|Y) \implies$ divide by $P(Y)$.
2. **Overlearn these formulas:**
   *   $$P(A|B) = \frac{P(A \cap B)}{P(B)}$$
   *   $$P(A \cap B) = P(A|B)P(B)$$
3. **Spaced Repetition Schedule:** Review this derivation and the formula on days 1, 3, 7, 16, and 35. 
4. **First Principles Pathway:** If you forget the formula, imagine a room of 100 people. 50 wear glasses ($G$). 10 wear glasses and hats ($G \cap H$). If you only look at the people with glasses, what fraction wears hats? It's $10 / 50$. You just divided the intersection by the given condition. Divide both by 100, and you have the probability formula.

## Common mistakes

1. **Confusing $P(A|B)$ with $P(B|A)$.** The probability of having a cough given you have lung cancer is very high. The probability of having lung cancer given you have a cough is very low. The direction matters.
2. **Confusing $P(A \cap B)$ with $P(A|B)$.** $P(A \cap B)$ is the probability that *both* happen out of the *entire* universe. $P(A|B)$ assumes $B$ has already happened.
3. **Assuming independence by default.** Students often write $P(A \cap B) = P(A)P(B)$. This is *only* true if $A$ and $B$ are independent. The universally true statement is $P(A \cap B) = P(A|B)P(B)$.

## Self-check

1. In a deck of 52 cards, what is the probability of drawing a King, given that the card you drew is a face card (Jack, Queen, or King)?
2. If $P(X) = 0.6$, $P(Y) = 0.5$, and $P(X \cup Y) = 0.9$, find $P(X|Y)$. *(Hint: You will need the addition rule first).*
3. Let $A$ be the event that a rocket engine passes a static fire test, and $B$ be the event that it rains on test day. If $P(A|B) = 0.95$ and $P(A) = 0.95$, what does this tell you about the relationship between the engine design and the weather?