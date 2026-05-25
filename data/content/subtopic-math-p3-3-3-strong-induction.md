## What it is
Strong induction is a proof technique used to establish that a statement $P(n)$ is true for all natural numbers. Unlike standard induction, which assumes only the immediately preceding case $P(k)$ is true to prove $P(k+1)$, strong induction assumes that *all* preceding cases $P(1), P(2), \dots, P(k)$ are true to prove $P(k+1)$. 

## Why it matters
In computer science, strong induction is the mathematical engine behind analyzing divide-and-conquer algorithms (like MergeSort) and dynamic programming, where a problem is broken down into subproblems of varying, unpredictable sizes. In mathematics and physics, it is essential for proving properties of recursively defined sequences (like the Fibonacci sequence) or fractal structures where the $n$-th state depends on multiple historical states, not just the single state that came right before it.

## When to study it
Do not attempt strong induction until you have mastered:
1. **Standard Mathematical Induction**: You must be completely fluent in base cases, inductive hypotheses, and inductive steps.
2. **Sequences and Series**: Specifically, recursive definitions (e.g., $a_n = a_{n-1} + a_{n-2}$).
3. **Basic Propositional Logic**: Understanding implication ($A \implies B$) and conjunction ($A \land B$).

If you still struggle to prove $\sum_{i=1}^n i = \frac{n(n+1)}{2}$ using standard induction, go back. You are not ready for this.

## How to study it (step by step)
1. **Identify the limit of standard induction**: Write down the Fibonacci sequence definition ($F_n = F_{n-1} + F_{n-2}$). Attempt to prove a property about $F_n$ using only $F_{n-1}$. Realize why you are stuck (you are missing $F_{n-2}$).
2. **Formalize the new hypothesis**: Write out the strong inductive hypothesis: "Assume $P(i)$ is true for all integers $i$ such that $1 \le i \le k$." Say it out loud. 
3. **Master multiple base cases**: If a sequence definition looks back $m$ steps, you must manually prove $m$ base cases. Practice identifying how many base cases a recurrence relation requires.
4. **Prove the Fundamental Theorem of Arithmetic**: Use strong induction to prove that every integer $n \ge 2$ can be written as a product of primes. (Hint: If $n$ is composite, $n = a \cdot b$. Both $a$ and $b$ are strictly less than $n$, so the strong hypothesis applies to them).
5. **Solve a "postage stamp" problem**: Prove that any postage of 12 cents or more can be formed using only 4-cent and 5-cent stamps. 

## Key ideas, with intuition
**The Team Lift Analogy**
Standard induction is a line of dominoes: domino $k$ knocks over domino $k+1$. Strong induction is a "team lift": pushing over a massive domino $k+1$ requires the combined weight of *all* previous dominoes $1$ through $k$ falling on it together.

**The Logical Equivalence**
Standard and strong induction are mathematically equivalent. Strong induction is simply standard induction applied to a new proposition $Q(n)$, where $Q(n) = P(1) \land P(2) \land \dots \land P(n)$. 

**The Look-Back Depth**
If your inductive step for $k+1$ requires knowing the truth of the statement for $k-1$ and $k-2$, your strong inductive hypothesis provides them. But you must ensure your base cases cover the "run-up" to the recurrence. If the formula needs the two previous terms, you must manually verify $P(1)$ and $P(2)$.

## Worked example
**Claim:** Let a sequence be defined by $a_1 = 3$, $a_2 = 3$, and $a_n = a_{n-1} + 2a_{n-2}$ for $n \ge 3$. Prove that $a_n = 2^n - (-1)^n$ for all $n \ge 1$.

**Proof:**
1. **Base Cases:** Because the recurrence relation $a_n$ looks back *two* steps, we must verify the formula for $n=1$ and $n=2$.
   For $n=1$: $2^1 - (-1)^1 = 2 - (-1) = 3$. This matches $a_1 = 3$.
   For $n=2$: $2^2 - (-1)^2 = 4 - 1 = 3$. This matches $a_2 = 3$.
   *Why this worked: We established the initial conditions required to feed the recursive engine.*

2. **Strong Inductive Hypothesis:** Assume that for some integer $k \ge 2$, the statement is true for all integers $i$ such that $1 \le i \le k$. That is, assume $a_i = 2^i - (-1)^i$ for all $i \in \{1, 2, \dots, k\}$.
   *Why this worked: We assumed the formula holds for all steps up to $k$, giving us a full arsenal of previous terms to use.*

3. **Inductive Step:** We must show the formula holds for $n = k+1$. That is, we must prove $a_{k+1} = 2^{k+1} - (-1)^{k+1}$.
   Using the recursive definition (since $k+1 \ge 3$):
   $$a_{k+1} = a_k + 2a_{k-1}$$
   By our strong inductive hypothesis, we know the exact formulas for both $a_k$ and $a_{k-1}$. Substitute them in:
   $$a_{k+1} = \left[ 2^k - (-1)^k \right] + 2\left[ 2^{k-1} - (-1)^{k-1} \right]$$
   Distribute the 2:
   $$a_{k+1} = 2^k - (-1)^k + 2^k - 2(-1)^{k-1}$$
   Combine the $2^k$ terms ($2^k + 2^k = 2 \cdot 2^k = 2^{k+1}$):
   $$a_{k+1} = 2^{k+1} - (-1)^k - 2(-1)^{k-1}$$
   Rewrite $-2(-1)^{k-1}$ by factoring out $-1$: $-2(-1)^{k-1} = +2(-1)^k$.
   $$a_{k+1} = 2^{k+1} - (-1)^k + 2(-1)^k$$
   $$a_{k+1} = 2^{k+1} + (-1)^k$$
   Since $(-1)^k = -(-1)^{k+1}$, we substitute this to match our target form:
   $$a_{k+1} = 2^{k+1} - (-1)^{k+1}$$
   *Why this worked: By relying on both $P(k)$ and $P(k-1)$, we bridged the recursive definition to the closed-form formula.*

By the principle of strong mathematical induction, $a_n = 2^n - (-1)^n$ for all $n \ge 1$. $\blacksquare$

## Diagrams

```text
STANDARD INDUCTION (The Domino Chain)
P(1) ---> P(2) ---> P(3) ---> P(4) -?-> P(5)
(Only P(4) is used to prove P(5))

STRONG INDUCTION (The Team Lift)
P(1) --+
       |
P(2) --+
       |
P(3) --+
       |
P(4) --+---> P(5)
(P(1) through P(4) act together to prove P(5))
```

## Memory technique — remember this forever
1. **The Mnemonic:** "Deep Roots, Tall Trees." A tree that grows based on a deep recursive history needs deep roots (multiple base cases) and the entire root system (strong hypothesis) to support the next branch.
2. **The Fact to Overlearn:** The Strong Inductive Hypothesis structure: 
   $$\text{Assume } P(i) \text{ is true for all } 1 \le i \le k.$$
3. **Spaced-repetition schedule:** Review this concept and do one proof at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget strong induction, rely on the **Well-Ordering Principle** (every non-empty set of positive integers has a least element). If a proposition $P(n)$ is false for some numbers, there must be a *smallest* integer $m$ where it fails. If you proved the base cases, $m$ is larger than them. Since $m$ is the *smallest* failure, $P(1)$ through $P(m-1)$ must be true. If those being true forces $P(m)$ to be true, a contradiction occurs, meaning $P(n)$ never fails.

## Common mistakes
1. **Insufficient Base Cases:** If your recurrence uses $a_{n-3}$, you MUST manually prove $n=1, 2,$ and $3$. If you only prove $n=1$, your inductive step for $n=2$ will try to call $a_{-1}$, which doesn't exist, breaking the proof.
2. **Weak Hypothesis in a Strong Proof:** Writing "Assume $P(k)$ is true" when you actually need $P(k-1)$ in your algebra. You must explicitly write that you are assuming it for *all* $i \le k$.
3. **Circular Logic:** Using the closed-form formula you are trying to prove as if it were the recursive definition. Always start with the recursive definition and substitute the closed-form formula into it via the hypothesis.

## Self-check
1. Let $b_0 = 1, b_1 = 2, b_2 = 3$, and $b_n = b_{n-1} + b_{n-2} + b_{n-3}$ for $n \ge 3$. Prove using strong induction that $b_n \le 2^n$ for all $n \ge 0$. How many base cases do you need?
2. Prove that every amount of postage of 12 cents or more can be formed using just 4-cent and 5-cent stamps. (Hint: Base cases are 12, 13, 14, 15. For $k+1 \ge 16$, look back at $k-3$).
3. A sequence is defined by $c_1 = 1$ and $c_n = \sum_{i=1}^{n-1} c_i$ for $n \ge 2$. Find a closed-form formula for $c_n$ (for $n \ge 2$) and prove it using strong induction.