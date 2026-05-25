## What it is
Mathematical induction is a rigorous method of proof used to establish that a given statement is true for all natural numbers. It works by verifying a starting condition (the base case), and then proving a rule that if the statement holds for an arbitrary case, it logically guarantees the truth of the very next case. Think of it as mathematically proving you can knock down an infinitely long line of dominoes by showing the first one falls, and that every falling domino will strike the one immediately behind it.

## Why it matters
Induction is the foundational tool for proving the correctness of recursive algorithms and loops in Computer Science. In physics and aerospace engineering, it is used to derive closed-form solutions for discrete dynamical systems. If you want to calculate the $n$-th stage mass ratio of a multi-stage rocket, or prove the stability bounds of a numerical integrator over $n$ time-steps, you will rely on inductive proofs to guarantee your formulas hold to infinity.

## When to study it
You must be completely fluent in basic algebraic manipulation, factoring polynomials, and working with inequalities. Crucially, you must understand sequences and series, specifically summation notation ($\sum$). If you cannot confidently expand $(k+1)^3$ or write out the terms of $\sum_{i=1}^{k+1} x_i$, you must review that algebra before attempting induction.

## How to study it (step by step)
1. **Memorize the logical architecture:** Base Case, Inductive Hypothesis, Inductive Step. Never begin a problem without writing these headers.
2. **Master summation proofs:** Start by proving the sum of the first $n$ integers: $\sum_{i=1}^n i = \frac{n(n+1)}{2}$. Write out every algebraic step. Focus on splitting the $(k+1)$ sum into the $k$-th sum plus the $(k+1)$-th term.
3. **Master divisibility proofs:** Prove statements like "$3^n - 1$ is even for all $n \ge 1$." The algebra here requires factoring out the assumed case rather than just substituting a sum.
4. **Master inequality proofs:** Prove that $2^n > n^2$ for $n \ge 5$. Note that the base case here is $n=5$, not $n=1$. 
5. **Study Strong Induction:** Learn the variant where the inductive step relies on *all* previous cases being true ($P(1)$ through $P(k)$), not just the immediately preceding one. This is essential for proving properties of the Fibonacci sequence or prime factorizations.

## Key ideas, with intuition

**The Proposition $P(n)$**
Induction applies to statements parameterized by an integer $n$. $P(n)$ is a true/false proposition, not a numerical value. For example, $P(n)$ is the entire equation $\sum_{i=1}^n i = \frac{n(n+1)}{2}$, not just the algebraic expression.

**The Base Case**
You must anchor the proof. We usually prove $P(1)$ is true by direct substitution. Without this, you could "prove" a chain of false statements (like proving $n = n+1$ implies $n+1 = n+2$).

**The Inductive Hypothesis (IH)**
We explicitly *assume* $P(k)$ is true for some arbitrary integer $k$. This feels like cheating to beginners, but it is just setting up the "if" part of an "if-then" statement.

**The Inductive Step**
We must prove the implication $P(k) \implies P(k+1)$. We take the expression for the $k+1$ case, and we *must* use the Inductive Hypothesis algebraically to manipulate it into the required form. If you do not use the IH, you are not doing induction.

Formally, the principle is stated as:
$$ [P(1) \land (P(k) \implies P(k+1))] \implies \forall n \in \mathbb{N}, P(n) $$

## Worked example
**Problem:** Prove that the sum of the first $n$ odd numbers is $n^2$.

Let $P(n)$ be the proposition: $\sum_{i=1}^n (2i - 1) = n^2$.

**1. Base Case ($n=1$):**
Evaluate the left side: $\sum_{i=1}^1 (2i - 1) = 2(1) - 1 = 1$.
Evaluate the right side: $1^2 = 1$.
Both sides equal 1. Therefore, $P(1)$ is true.

**2. Inductive Hypothesis:**
Assume $P(k)$ is true for some arbitrary integer $k \ge 1$.
That is, assume: $\sum_{i=1}^k (2i - 1) = k^2$.

**3. Inductive Step:**
We must show that $P(k+1)$ is true. That is, we want to show $\sum_{i=1}^{k+1} (2i - 1) = (k+1)^2$.
Start with the left side of $P(k+1)$:
$$ \sum_{i=1}^{k+1} (2i - 1) = \left( \sum_{i=1}^k (2i - 1) \right) + (2(k+1) - 1) $$
Substitute the Inductive Hypothesis into the first part:
$$ = k^2 + (2(k+1) - 1) $$
Simplify the algebraic expression:
$$ = k^2 + 2k + 2 - 1 $$
$$ = k^2 + 2k + 1 $$
Factor the polynomial:
$$ = (k+1)^2 $$
This exactly matches the right side of $P(k+1)$. Therefore, by the principle of mathematical induction, $P(n)$ is true for all integers $n \ge 1$.

*Reflection:* The crucial move was peeling off the $(k+1)$-th term from the summation. This exposed the $k$-th partial sum, allowing us to inject the Inductive Hypothesis and reduce the proof to standard algebra.

## Diagrams

```text
THE DOMINO EFFECT OF INDUCTION

Domino Index:   [1]      [2]      [3]      ...      [k]      [k+1]
                 |        |        |                 |         |
Base Case:     (PUSH) ---> 
               P(1) is true.

Inductive Step:                            If [k] falls...
                                           (Assume P(k))
                                                             ...it knocks over [k+1]
                                                             (Proves P(k+1))
                                                             
Conclusion:    Because [1] falls, and any [k] knocks over [k+1], ALL dominoes fall.
```

## Memory technique — remember this forever
1. **The Visual Hook:** Think of an **Infinite Ladder**. The Base Case proves you can step onto the first rung. The Inductive Step proves that *if* you are on rung $k$, your legs are long enough to reach rung $k+1$. Together, you can climb forever.
2. **Must Overlearn:** The logical structure: $P(1) \land (P(k) \implies P(k+1)) \implies \forall n, P(n)$.
3. **Spaced Repetition Schedule:** Review this structure and do one proof at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** Induction is logically equivalent to the *Well-Ordering Principle* (every non-empty set of positive integers has a least element). If an inductively proven statement were false, there would be a *smallest* integer $x$ where it fails. But since it failed at $x$, it must have been true at $x-1$. The inductive step guarantees that if it is true at $x-1$, it is true at $x$, creating a contradiction. Therefore, it cannot fail.

## Common mistakes
1. **Failing to explicitly state the Inductive Hypothesis.** Writing "$n=k$" is meaningless. You must write "Assume $P(k)$ is true."
2. **Not using the Inductive Hypothesis.** If you complete your algebraic manipulation without substituting your assumption for $P(k)$, your proof is fundamentally flawed. You likely just proved a tautology.
3. **Assuming the base case is always $n=1$.** Many propositions (especially inequalities like $n! > 2^n$) are only true starting at $n=4$ or $n=5$. Always check where the domain begins.

## Self-check
1. Prove by induction that $\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}$ for all $n \ge 1$.
2. Prove by induction that $5^n - 1$ is divisible by 4 for all integers $n \ge 1$.
3. Find the logical flaw in the famous false proof: "All horses are the same color." (Hint: The proof claims any set of $n$ horses shares a color. The base case $n=1$ works. Look extremely closely at the geometry of the inductive step when transitioning specifically from $n=1$ to $n=2$).