## What it is
Probability is the mathematical measure of how likely an event is to occur. Classical probability calculates this by counting equally likely outcomes, empirical probability calculates it by analyzing frequencies from real-world experiments, and axiomatic probability (Kolmogorov axioms) strips the concept down to three absolute, fundamental rules of set theory that govern all probability spaces.

## Why it matters
In physics (especially quantum mechanics and statistical mechanics), empirical probability bridges theoretical models to experimental data. In aerospace and machine learning, axiomatic probability forms the rigorous backbone of reliability engineering, Markov decision processes, and Kalman filters. By relying on axioms, we ensure that when an autonomous rocket calculates the risk of a sensor failure, the underlying math is perfectly consistent and cannot yield impossible results (like a negative probability).

## When to study it
You must already understand:
1. Basic set theory (unions $\cup$, intersections $\cap$, complements $A^c$, subsets $\subseteq$).
2. Basic combinatorics (how to count permutations and combinations).
3. The conceptual idea of a limit ($\lim_{n \to \infty}$).
If you do not know how to read $A \cap B = \emptyset$ ("the intersection of A and B is the empty set"), return to introductory set theory before proceeding.

## How to study it (step by step)
1. Define the sample space ($\Omega$) and events ($E$) for simple scenarios (e.g., rolling two dice).
2. Calculate classical probabilities by counting elements: $P(E) = \frac{|E|}{|\Omega|}$.
3. Run a mental or physical simulation (e.g., 100 coin flips) to understand how empirical probability converges to classical probability as trials increase.
4. Memorize the three Kolmogorov axioms exactly as written.
5. Derive the complement rule strictly from the axioms without relying on intuition.
6. Derive the general addition rule for non-mutually exclusive events ($P(A \cup B) = P(A) + P(B) - P(A \cap B)$) using a Venn diagram and the axioms.

## Key ideas, with intuition

**1. Classical Probability (The Intuition of Symmetry)**
If a system is perfectly symmetrical (like a fair die), no single outcome has a physical reason to occur more often than any other. We assume equally likely outcomes. 
$$P(A) = \frac{\text{Number of outcomes in } A}{\text{Total number of outcomes in } \Omega} = \frac{|A|}{|\Omega|}$$

**2. Empirical Probability (The Law of Large Numbers)**
We cannot always assume symmetry (e.g., a loaded die or a rocket engine failure). Empirical probability is derived from observation. The universe reveals its true probabilities over time.
$$P(A) = \lim_{n \to \infty} \frac{n_A}{n}$$
*(where $n$ is total trials and $n_A$ is the number of times event $A$ occurred).*

**3. Axiomatic Probability (The Intuition of Mass)**
Andrey Kolmogorov formalized probability in 1933. Think of probability as a 1kg block of clay representing the sample space $\Omega$. You can chop it into events, but it must obey three rules:
*   **Axiom 1 (Non-negativity):** No piece of clay can have negative mass. For any event $E$, $$P(E) \ge 0$$
*   **Axiom 2 (Normalization):** The total mass of the universe of outcomes is exactly 1. $$P(\Omega) = 1$$
*   **Axiom 3 (Additivity):** If you combine two separate, non-overlapping pieces of clay (mutually exclusive events where $A \cap B = \emptyset$), their combined mass is just the sum of their individual masses. $$P(A \cup B) = P(A) + P(B)$$ *(Note: Rigorously, this applies to any countable sequence of disjoint events).*

## Worked example
**Problem:** Prove that the probability of an impossible event is zero ($P(\emptyset) = 0$) and derive the complement rule ($P(A^c) = 1 - P(A)$) using *only* Kolmogorov's axioms.

**Step 1:** Consider the sample space $\Omega$ and the empty set $\emptyset$. They are mutually exclusive ($\Omega \cap \emptyset = \emptyset$), and their union is the sample space ($\Omega \cup \emptyset = \Omega$).
**Step 2:** Apply Axiom 3 (Additivity): 
$$P(\Omega \cup \emptyset) = P(\Omega) + P(\emptyset)$$
**Step 3:** Substitute $\Omega \cup \emptyset$ with $\Omega$:
$$P(\Omega) = P(\Omega) + P(\emptyset)$$
**Step 4:** Apply Axiom 2 ($P(\Omega) = 1$):
$$1 = 1 + P(\emptyset) \implies P(\emptyset) = 0$$
**Step 5:** Now consider an event $A$ and its complement $A^c$ (everything not in $A$). By definition, $A \cup A^c = \Omega$ and $A \cap A^c = \emptyset$.
**Step 6:** Apply Axiom 3:
$$P(A \cup A^c) = P(A) + P(A^c)$$
**Step 7:** Substitute $\Omega$ and apply Axiom 2:
$$P(\Omega) = P(A) + P(A^c) \implies 1 = P(A) + P(A^c)$$
$$P(A^c) = 1 - P(A)$$

*Reflection:* We did not assume anything about coins, dice, or counting. By treating probability purely as a mathematical function mapping sets to numbers via three axioms, we derived universal laws that apply to all statistical models.

## Diagrams

```text
CONVERGENCE OF EMPIRICAL TO CLASSICAL PROBABILITY
(Flipping a fair coin: Probability of Heads)

P(Heads)
 1.0 |  x
     |      x
     |          x
 0.5 |-------------x--x-x-xxx-xxxxx-------- (Classical P = 0.5)
     |    x      x
     |
 0.0 +-------------------------------------
      1   5   10   50  100  500  1000  Number of Flips (n)

The empirical ratio (x) fluctuates wildly at low 'n' 
but converges to the classical probability (0.5) as n -> infinity.
```

## Memory technique — remember this forever
1. **The Visual Hook:** Think of the **"Probability Pizza"**. 
   * Axiom 1: You cannot have a slice with negative weight.
   * Axiom 2: The whole pizza weighs exactly 1.0.
   * Axiom 3: If you weigh two separate slices, their combined weight is just their weights added together.
2. **Must Overlearn:** 
   * $P(E) \ge 0$
   * $P(\Omega) = 1$
   * $P(\cup E_i) = \sum P(E_i)$ (for disjoint $E_i$)
3. **Spaced-repetition schedule:** Review these axioms and the worked example derivation at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you ever forget an advanced probability rule, draw a Venn diagram. Assign "mass" (variables like $x, y, z$) to the non-overlapping regions. Use the three axioms to sum the masses algebraically.

## Common mistakes
* **Applying classical probability to non-symmetrical events:** Saying "I either win the lottery or I don't, so the probability is $\frac{1}{2}$." This falsely assumes outcomes are equally likely.
* **The Gambler's Fallacy (Empirical misunderstanding):** Believing that if a coin lands heads 5 times in a row, tails is "due" to balance the empirical probability. The coin has no memory; convergence happens over infinite trials, not finite sets.
* **Adding overlapping probabilities:** Using $P(A \cup B) = P(A) + P(B)$ when $A$ and $B$ can happen at the same time. You must subtract the intersection: $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.

## Self-check
1. **(Classical)** What is the probability of rolling a sum of exactly 8 with two fair six-sided dice? 
2. **(Empirical)** A biased sensor is tested 10,000 times. It reads "nominal" 9,850 times and "fault" 150 times. What is the empirical probability of a fault, and why is classical probability useless here?
3. **(Axiomatic)** Using *only* the three Kolmogorov axioms, prove that if event $A$ is a subset of event $B$ ($A \subseteq B$), then $P(A) \le P(B)$. *(Hint: Express set $B$ as the union of set $A$ and another disjoint set).*