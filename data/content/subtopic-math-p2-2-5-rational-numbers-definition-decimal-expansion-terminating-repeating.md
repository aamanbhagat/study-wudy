## What it is
A rational number is any number that can be expressed as a ratio of two integers, $\frac{p}{q}$, where the denominator $q$ is not zero. When expressed as a decimal, a rational number will always do exactly one of two things: it will either terminate (end completely, like $0.25$) or it will fall into an infinitely repeating pattern of digits (like $0.333\dots$ or $0.142857142857\dots$).

## Why it matters
In computer science, true real numbers do not exist; memory is finite. Floating-point arithmetic relies entirely on a specific subset of rational numbers (dyadic rationals, where the denominator is a power of 2) to approximate continuous mathematics. In aerospace and physics, while the universe's state (like position or velocity) might be continuous, every sensor reading, digital controller, and telemetry packet operates strictly in the domain of rational numbers. Furthermore, understanding the boundary between numbers that can be written as fractions (rationals) and those that cannot (irrationals) is the foundational step into real analysis and calculus.

## When to study it
You must already be fluent in:
* Integer arithmetic and the concept of integers ($\mathbb{Z}$).
* Prime factorization.
* Long division algorithm.
* Basic algebraic manipulation (solving linear equations for $x$).

If you cannot confidently execute long division or quickly break a number down into its prime factors, stop and master those first. You cannot understand decimal expansions without them.

## How to study it (step by step)
1. **Formalize the definition:** Write down and memorize the set-builder notation for rational numbers: $\mathbb{Q} = \{ \frac{p}{q} \mid p, q \in \mathbb{Z}, q \neq 0 \}$.
2. **Execute long division:** Pick fractions like $\frac{1}{4}$, $\frac{1}{3}$, $\frac{1}{7}$, and $\frac{5}{6}$. Perform long division by hand. Pay strict attention to the *remainders* at each step.
3. **Prove the behavior:** Use the Pigeonhole Principle to prove to yourself why the decimal *must* eventually repeat or terminate. (There are only $q$ possible remainders when dividing by $q$).
4. **Analyze denominators:** Factor the denominators of fractions that terminate. Notice the pattern (they only contain prime factors 2 and 5).
5. **Reverse engineer:** Practice the algebraic trick of converting a repeating decimal back into a fraction by multiplying by powers of $10$ to annihilate the infinite tail.

## Key ideas, with intuition

**1. The Pigeonhole Principle guarantees the loop**
When you divide $p$ by $q$ using long division, the remainder at any step must be an integer between $0$ and $q-1$. 
* If the remainder is $0$, the division stops. The decimal **terminates**.
* If the remainder is never $0$, you only have $q-1$ possible non-zero remainders. By the time you do $q$ steps of division, you *must* hit a remainder you have seen before (Pigeonhole Principle). Once a remainder repeats, the exact same sequence of division steps repeats. The decimal **repeats**.

**2. The "2 and 5" Rule**
Our number system is Base-10. $10 = 2 \times 5$. 
A fraction $\frac{p}{q}$ (in simplest form) will terminate *if and only if* the prime factorization of $q$ consists entirely of $2$s and $5$s. 
Why? Because a terminating decimal is just a fraction whose denominator is a power of 10. You can only scale a denominator up to a power of 10 if its only prime building blocks are $2$s and $5$s. 
Example: $\frac{3}{40}$. Since $40 = 2^3 \times 5$, it will terminate. We can multiply top and bottom by $5^2$ to get $\frac{3 \times 25}{2^3 \times 5^3} = \frac{75}{1000} = 0.075$.

**3. Annihilating the infinite tail**
To convert a repeating decimal back to a fraction, we use algebra to shift the decimal point and subtract the infinite repeating part from itself, completely destroying it.

## Worked example
**Problem:** Convert $0.1\overline{36}$ to a fraction in simplest form.

**Step 1: Set up the equation.**
Let $x = 0.1363636\dots$

**Step 2: Isolate the repeating block immediately after the decimal.**
Multiply by $10$ to move the non-repeating "$1$" to the left of the decimal.
$$10x = 1.363636\dots$$

**Step 3: Shift one full repeating block to the left.**
The repeating block "$36$" is two digits long. Multiply the previous equation by $10^2 = 100$.
$$1000x = 136.363636\dots$$

**Step 4: Subtract to annihilate the infinite tail.**
$$ \begin{aligned} 1000x &= 136.363636\dots \\ -(10x &= 1.363636\dots) \\ \hline 990x &= 135 \end{aligned} $$

**Step 5: Solve and simplify.**
$$x = \frac{135}{990}$$
Both end in 0 or 5, so divide by 5: $\frac{27}{198}$.
Sum of digits for both are multiples of 9, so divide by 9: $\frac{3}{22}$.

*Reflection:* The core trick is aligning the infinite tails perfectly. By ensuring the decimal point is exactly in front of the repeating sequence in both equations, subtraction eliminates infinity, leaving us with simple integer algebra.

## Diagrams

This state machine shows the remainders when calculating $\frac{1}{7}$ via long division. Because $q=7$, there are only 6 possible non-zero remainders. Once we hit a remainder we've seen, the digits repeat.

```text
       [Remainder 1]  (Start: 10 / 7 = 1, rem 3)
            |
            v
       [Remainder 3]  (30 / 7 = 4, rem 2)
            |
            v
       [Remainder 2]  (20 / 7 = 2, rem 6)
            |
            v
       [Remainder 6]  (60 / 7 = 8, rem 4)
            |
            v
       [Remainder 4]  (40 / 7 = 5, rem 5)
            |
            v
       [Remainder 5]  (50 / 7 = 7, rem 1)
            |
            +--------------------------------+
            | (Loops back to Remainder 1)    |
```
Decimal expansion: $0.\overline{142857}$

## Memory technique — remember this forever
**1. The Hook:** "Base-10 Bouncers." 
Imagine a VIP club called "Terminating Decimals". The bouncers at the door are the numbers $2$ and $5$. If a fraction's denominator (once simplified) contains *any* other prime number (like $3, 7, 11$), the bouncers reject it, and it falls into the infinite repeating loop of the general public.

**2. Must overlearn:**
* $\mathbb{Q} = \{ \frac{p}{q} \mid p, q \in \mathbb{Z}, q \neq 0 \}$
* Terminating decimal $\iff q = 2^a 5^b$ (in simplest form).
* To convert repeating to fraction: Multiply by $10^k$ (where $k$ is the period length) to align and subtract.

**3. Spaced-repetition schedule:**
Review this concept, re-deriving the $0.1\overline{36}$ example, at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.

**4. First principles pathway:**
If you forget the $2$ and $5$ rule, ask yourself: "What makes a decimal terminate?" It terminates if it can be written over $10$, $100$, $1000$, etc. Therefore, $\frac{p}{q} = \frac{x}{10^n}$. The only prime factors of $10^n$ are $2$ and $5$. Therefore, $q$ can only be made of $2$s and $5$s.

## Common mistakes
* **Forgetting to simplify first:** A student sees $\frac{6}{15}$ and thinks, "15 is $3 \times 5$, it has a 3, so it repeats!" But $\frac{6}{15}$ simplifies to $\frac{2}{5}$, which terminates ($0.4$). Always simplify $\frac{p}{q}$ before checking the denominator.
* **Misaligning the subtraction:** When converting repeating decimals to fractions, students often subtract $x$ from $100x$ without ensuring the decimal points are immediately in front of the repeating blocks. This leaves a messy decimal in the integer subtraction step.
* **Rejecting $0.\overline{9} = 1$:** Students often intuitively feel $0.999\dots$ is "infinitesimally less" than 1. It is not. In standard real analysis, they are exactly the same number.

## Self-check
1. Without performing long division, determine if $\frac{7}{80}$ terminates or repeats. Justify your answer using prime factorization.
2. Convert $2.0\overline{14}$ into a fraction in simplest form.
3. Use the algebraic subtraction method (multiplying by 10 and subtracting) to rigorously prove that $0.\overline{9} = 1$.