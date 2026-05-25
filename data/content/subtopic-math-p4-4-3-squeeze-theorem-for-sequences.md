## What it is
The Squeeze Theorem for sequences states that if a sequence is "trapped" or "squeezed" between two other sequences that both converge to the same limit, then the trapped sequence must also converge to that same limit. It is a powerful tool for finding the limit of a sequence that cannot be determined by direct computation or algebraic manipulation.

## Why it matters
This theorem is a workhorse for proving convergence, especially for sequences involving oscillating functions (like sine or cosine) or factorial expressions. In physics and engineering, it's used to analyze systems that approach a stable equilibrium, where you can bound the system's state between two simpler, known behaviors. In computer science, its continuous analogue is used in the analysis of algorithms to find tight bounds on the complexity of a function.

## When to study it
You must be comfortable with the following prerequisites. If you are not, master them first.
1.  **Definition of a Sequence:** Understand the notation $\{a_n\}_{n=1}^{\infty}$ and what it represents.
2.  **Limit of a Sequence:** Have a firm grasp of the intuitive concept of a limit and the formal $\epsilon-N$ definition of convergence.
3.  **Basic Limit Laws for Sequences:** Know how to find limits of sums, differences, products, and quotients of convergent sequences.

## How to study it (step by step)
1.  **State the Theorem Formally:** Write down the formal statement. Let $\{a_n\}$, $\{b_n\}$, and $\{c_n\}$ be sequences of real numbers. If there exists an integer $N_0$ such that for all $n \ge N_0$, we have $b_n \le a_n \le c_n$, AND if $\lim_{n \to \infty} b_n = \lim_{n \to \infty} c_n = L$, then $\lim_{n \to \infty} a_n = L$.
2.  **Prove it from First Principles:** Use the $\epsilon-N$ definition of a limit to prove the theorem. This solidifies why it must be true and is not just an intuitive trick. (See "Memory technique" for the derivation path).
3.  **Solve the Classic Example:** The canonical first problem is finding $\lim_{n \to \infty} \frac{\sin(n)}{n}$. The key is to recognize that $-1 \le \sin(n) \le 1$ for all $n$. Use this to construct your bounding sequences.
4.  **Identify Squeeze Candidates:** Go through a list of problems and, without solving them, identify which ones are good candidates for the Squeeze Theorem. Look for bounded oscillating terms (e.g., $\sin(n)$, $\cos(n)$, $(-1)^n$) or expressions where you can establish a clear inequality (e.g., factorials, roots).
5.  **Practice Bounding:** The hardest part is finding the right bounding sequences, $\{b_n\}$ and $\{c_n\}$. For a given sequence $\{a_n\}$, practice creating valid inequalities. For example, for $a_n = \frac{n!}{n^n}$, can you find a simple upper and lower bound?
6.  **Solve a Harder Problem:** Find the limit of $a_n = (2^n + 3^n)^{1/n}$. The trick here is to bound the expression inside the root.

## Key ideas, with intuition
1.  **Bounding is Everything:** The core of the method is finding two other sequences, one that is always smaller (the "floor") and one that is always larger (the "ceiling") than your target sequence. The bounds don't need to be "tight"; they just need to work.
    $$ \underbrace{b_n}_{\text{floor}} \le a_n \le \underbrace{c_n}_{\text{ceiling}} $$
2.  **Converging Walls:** The magic happens when the floor and the ceiling sequences both converge to the exact same value. Imagine two walls ($b_n$ and $c_n$) moving towards each other. If they are going to meet at a specific location $L$, anything trapped between them ($a_n$) has no choice but to be crushed at that same location.
    $$ \lim_{n \to \infty} b_n = L \quad \text{and} \quad \lim_{n \to \infty} c_n = L $$
3.  **The "Eventually" Clause:** The inequality $b_n \le a_n \le c_n$ does not need to be true for *all* $n$. It only needs to be true for all $n$ greater than some integer $N_0$. The limit only cares about the long-term behavior of the sequence, so the first few (or first few billion) terms are irrelevant.

## Worked example
Find the limit $\lim_{n \to \infty} \frac{n!}{n^n}$.

**Step 1: Identify the target sequence.**
Our sequence is $a_n = \frac{n!}{n^n}$. Direct evaluation is difficult. The numerator and denominator both go to infinity, suggesting an indeterminate form, but L'Hôpital's rule doesn't apply to sequences directly. This is a candidate for the Squeeze Theorem.

**Step 2: Establish a lower bound, $b_n$.**
The term $n!$ is a product of positive integers, and $n^n$ is also positive for $n \ge 1$. Therefore, the sequence $a_n$ is always positive. A simple lower bound is $0$.
So, we set $b_n = 0$. We have $0 \le \frac{n!}{n^n}$ for all $n \ge 1$.
Clearly, $\lim_{n \to \infty} b_n = \lim_{n \to \infty} 0 = 0$.

**Step 3: Establish an upper bound, $c_n$.**
This is the creative step. Let's write out the terms of $a_n$:
$$ a_n = \frac{n!}{n^n} = \frac{1 \cdot 2 \cdot 3 \cdot \dots \cdot n}{n \cdot n \cdot n \cdot \dots \cdot n} = \left(\frac{1}{n}\right) \left(\frac{2}{n}\right) \left(\frac{3}{n}\right) \dots \left(\frac{n}{n}\right) $$
Notice that every term in the product except the last one, $\frac{n}{n}=1$, is less than or equal to 1. Specifically, $\frac{2}{n} \le 1$, $\frac{3}{n} \le 1$, and so on. Let's replace all the intermediate terms $(\frac{2}{n}, \frac{3}{n}, \dots, \frac{n-1}{n})$ with the value 1, which is larger. This will create a larger overall expression.
$$ a_n = \left(\frac{1}{n}\right) \underbrace{\left(\frac{2}{n}\right) \left(\frac{3}{n}\right) \dots \left(\frac{n}{n}\right)}_{\text{each term is } \le 1} \le \left(\frac{1}{n}\right) \cdot 1 \cdot 1 \cdot \dots \cdot 1 = \frac{1}{n} $$
So, we can set our upper bound $c_n = \frac{1}{n}$. We have established that $\frac{n!}{n^n} \le \frac{1}{n}$ for all $n \ge 1$.
The limit of our upper bound is $\lim_{n \to \infty} c_n = \lim_{n \to \infty} \frac{1}{n} = 0$.

**Step 4: Apply the Squeeze Theorem.**
We have shown:
1.  $0 \le \frac{n!}{n^n} \le \frac{1}{n}$ for all $n \ge 1$.
2.  $\lim_{n \to \infty} 0 = 0$.
3.  $\lim_{n \to \infty} \frac{1}{n} = 0$.

Since our sequence $a_n$ is squeezed between two sequences that both converge to $0$, by the Squeeze Theorem, $a_n$ must also converge to $0$.
$$ \lim_{n \to \infty} \frac{n!}{n^n} = 0 $$

**Reflection:** The lower bound was trivial (positivity). The upper bound required expanding the definition of $n!$ and $n^n$ and then making a strategic simplification (replacing terms with a larger value, 1) to create a simple, convergent sequence. This is a common pattern: one bound is often simple, the other requires insight.

## Diagrams
Here is a conceptual diagram of the Squeeze Theorem. The sequence $a_n$ is always between $b_n$ and $c_n$. As $n$ gets large, both $b_n$ and $c_n$ converge to the limit $L$, forcing $a_n$ to converge to $L$ as well.

```text
  y-axis
    ^
    |
    | c_n --> * * * *
    |          * * * *
 L -|- - - - - * * * * - - - - - -> L
    |          * * * *
    | b_n --> * * * *
    |
    |
    +--------------------------------------> n-axis

    In the diagram:
    c_n is the upper sequence, approaching L from above.
    b_n is the lower sequence, approaching L from below.
    The sequence a_n (not drawn) must live in the space
    between b_n and c_n, so it is forced to approach L.
```

## Memory technique — remember this forever
1.  **Mnemonic: The Two Cops Theorem.**
    Imagine two police officers ($b_n$ and $c_n$) escorting a suspect ($a_n$). The suspect must always stay between the two officers. If both officers drive their cars into the police station garage ($L$), the suspect has no choice but to end up in the garage too.

2.  **Must-know formula:**
    If for $n \ge N_0$:
    $$ b_n \le a_n \le c_n $$
    And:
    $$ \lim_{n \to \infty} b_n = \lim_{n \to \infty} c_n = L $$
    Then:
    $$ \lim_{n \to \infty} a_n = L $$

3.  **Spaced Repetition Schedule:**
    Review this entire mini-lesson and re-solve the worked example from a blank sheet of paper at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.**

4.  **First Principles Pathway:**
    If you forget the theorem, re-derive it.
    **Goal:** Show that for any $\epsilon > 0$, there exists an $N$ such that for all $n > N$, $|a_n - L| < \epsilon$.
    **Proof:**
    *   Since $\lim_{n \to \infty} b_n = L$, there exists $N_b$ such that for $n > N_b$, $|b_n - L| < \epsilon$, which means $L - \epsilon < b_n < L + \epsilon$.
    *   Since $\lim_{n \to \infty} c_n = L$, there exists $N_c$ such that for $n > N_c$, $|c_n - L| < \epsilon$, which means $L - \epsilon < c_n < L + \epsilon$.
    *   We are given that $b_n \le a_n \le c_n$ for $n \ge N_0$.
    *   Choose $N = \max(N_0, N_b, N_c)$. For any $n > N$, all three conditions hold.
    *   Therefore, for $n > N$, we have $L - \epsilon < b_n \le a_n \le c_n < L + \epsilon$.
    *   This implies $L - \epsilon < a_n < L + \epsilon$, which is the definition of $|a_n - L| < \epsilon$. The proof is complete.

## Common mistakes
1.  **Choosing divergent bounds:** Selecting $b_n$ or $c_n$ that do not converge. The entire theorem is useless if the "walls" don't close in. For example, bounding $\frac{\sin(n)}{n}$ with $-1 \le \frac{\sin(n)}{n} \le 1$ is true but useless, as the bounds don't converge.
2.  **Choosing bounds that converge to different limits:** If $\lim b_n = 0$ and $\lim c_n = 1$, you can conclude nothing about $\lim a_n$. The limits *must* be identical.
3.  **Incorrectly establishing the inequality:** Making an algebraic mistake when arguing that $b_n \le a_n \le c_n$. For example, when bounding $\frac{1}{n^2 - 10}$, claiming $0 \le \frac{1}{n^2 - 10} \le \frac{1}{n^2}$ is false for small $n$ (e.g., $n=2$), where the denominator is negative. You must state that the inequality holds for $n \ge 4$.

## Self-check
Do not look up the answers. The process of solving is the lesson.
1.  Find $\lim_{n \to \infty} \frac{5 + (-1)^n}{\sqrt{n}}$.
2.  Find $\lim_{n \to \infty} \left( \frac{1}{n^2+1} + \frac{2}{n^2+1} + \dots + \frac{n}{n^2+1} \right)$. Hint: The numerator is an arithmetic series. First find a closed form for the sum, then find bounds. Or, bound the sum itself.
3.  Let $\{a_n\}$ be a sequence of positive numbers with $\lim_{n \to \infty} a_n = L > 0$. Find $\lim_{n \to \infty} \sqrt[n]{a_n}$. Hint: For large $n$, $a_n$ is close to $L$. Use this to bound $\sqrt[n]{a_n}$.