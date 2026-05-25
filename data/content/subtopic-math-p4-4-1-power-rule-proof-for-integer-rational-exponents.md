## What it is
The power rule states that the derivative of $x^n$ with respect to $x$ is $n x^{n-1}$. Proving this for integer and rational exponents means rigorously demonstrating *why* this mechanical rule holds true using the fundamental limit definition of the derivative, rather than accepting it as magic. It establishes that this pattern works not just for whole numbers, but for fractions and negative numbers as well.

## Why it matters
Polynomials and rational powers govern almost everything in introductory physics and engineering. You will use this rule to find the kinetic energy of a spacecraft ($v^2$), the variation in gravitational force ($r^{-2}$), and orbital periods ($a^{3/2}$). You must be able to differentiate these instantly. Furthermore, the proof techniques required here—specifically binomial expansion and implicit differentiation—are foundational algebraic tools you will use repeatedly to solve complex differential equations in fluid dynamics and quantum mechanics.

## When to study it
You must already understand:
1. The limit definition of the derivative: $f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$.
2. The Binomial Theorem for expanding $(x+h)^n$.
3. Implicit differentiation (or the Chain Rule).
If you cannot confidently expand $(a+b)^3$ or find the derivative of $y^2 = x$ with respect to $x$, review those concepts before proceeding.

## How to study it (step by step)
1. **Prove for positive integers:** Write down the limit definition of the derivative for $f(x) = x^n$. Expand $(x+h)^n$ using the Binomial Theorem. 
2. **Execute the limit:** Cancel the $x^n$ terms. Factor out $h$ from the remaining terms, cancel it with the denominator, and evaluate the limit as $h \to 0$. Watch everything except $n x^{n-1}$ vanish.
3. **Prove for negative integers:** Let $f(x) = x^{-m}$ where $m$ is a positive integer. Rewrite as $\frac{1}{x^m}$ and apply the Quotient Rule (using your positive integer proof) to show the pattern still holds.
4. **Bypass fractional limits:** Attempting to evaluate $\lim_{h \to 0} \frac{(x+h)^{p/q} - x^{p/q}}{h}$ algebraically is a nightmare. Recognize that you need a workaround.
5. **Prove for rational exponents:** Let $y = x^{p/q}$. Raise both sides to the $q$-th power to get $y^q = x^p$. Use implicit differentiation (which relies only on the integer proof) to solve for $y'$. Substitute $y$ back in and simplify the exponents.

## Key ideas, with intuition

**1. The Binomial Collapse (Positive Integers)**
When you expand $(x+h)^n$, the terms follow a strict hierarchy of $h$:
$$ (x+h)^n = x^n + n x^{n-1}h + \frac{n(n-1)}{2} x^{n-2}h^2 + \dots + h^n $$
When you subtract $f(x) = x^n$ in the numerator of the limit definition, the first term vanishes. You are left entirely with terms containing $h$. Dividing by $h$ reduces the power of $h$ in every term by one. As $h \to 0$, every term with a remaining $h$ collapses to zero. Only the linear $h$ term survives: $n x^{n-1}$.

**2. The Implicit Workaround (Rational Exponents)**
If $y = x^{p/q}$, you are dealing with fractional roots. By raising both sides to the power of $q$, you transform a difficult rational problem into two easy integer problems:
$$ y^q = x^p $$
Because $p$ and $q$ are integers, we can differentiate both sides using the integer power rule and the chain rule, completely sidestepping the need to evaluate limits with fractional roots.

## Worked example
**Goal:** Prove $\frac{d}{dx} x^{p/q} = \frac{p}{q} x^{\frac{p}{q}-1}$ where $p$ and $q$ are integers, and $q \neq 0$.

**Step 1: Set up the equation and clear the fraction.**
Let $y = x^{p/q}$.
Raise both sides to the power of $q$:
$$ y^q = x^p $$
*Why:* This converts rational exponents into integer exponents, allowing us to use the integer power rule we already proved.

**Step 2: Differentiate implicitly with respect to $x$.**
$$ \frac{d}{dx}(y^q) = \frac{d}{dx}(x^p) $$
$$ q y^{q-1} \frac{dy}{dx} = p x^{p-1} $$
*Why:* We apply the integer power rule to $x^p$. For $y^q$, we apply the integer power rule *and* the chain rule, because $y$ is a function of $x$.

**Step 3: Solve for the derivative $\frac{dy}{dx}$.**
$$ \frac{dy}{dx} = \frac{p x^{p-1}}{q y^{q-1}} $$
*Why:* Standard algebraic isolation.

**Step 4: Substitute $y$ back in terms of $x$.**
Replace $y$ with $x^{p/q}$:
$$ \frac{dy}{dx} = \frac{p x^{p-1}}{q (x^{p/q})^{q-1}} $$
*Why:* We want our derivative entirely in terms of the independent variable $x$.

**Step 5: Simplify the exponents.**
Expand the denominator's exponent: $(x^{p/q})^{q-1} = x^{p - p/q}$.
Now divide the terms by subtracting the denominator's exponent from the numerator's exponent:
$$ \frac{dy}{dx} = \frac{p}{q} x^{(p-1) - (p - p/q)} $$
$$ \frac{dy}{dx} = \frac{p}{q} x^{p - 1 - p + p/q} $$
$$ \frac{dy}{dx} = \frac{p}{q} x^{p/q - 1} $$
*Why:* Basic exponent arithmetic proves that the mechanical rule "bring the power down, subtract one" holds perfectly for fractions.

## Diagrams

Geometric intuition for the derivative of $x^2$. 
Let $f(x) = x^2$ be the area of a square with side length $x$. If we increase $x$ by a tiny amount $h$, the new area is $(x+h)^2$.

```text
       x             h
   +---------------+---+
   |               |   |
 x |     x^2       |x*h|
   |               |   |
   +---------------+---+
 h |     x*h       |h^2|
   +---------------+---+
```

The change in area (the numerator of the limit definition) is the new area minus the old area:
$\Delta \text{Area} = (x+h)^2 - x^2 = 2(xh) + h^2$.
To find the rate of change, divide by $h$: $\frac{2xh + h^2}{h} = 2x + h$. 
As $h \to 0$, the tiny $h^2$ corner vanishes much faster than the $x \cdot h$ strips. The rate of change is exactly the two strips: $2x$.

## Memory technique — remember this forever
1. **The Hook:** "Bring the power down, knock the power down." 
2. **The Formulas to Overlearn:**
   * $\frac{d}{dx} x^n = n x^{n-1}$
   * $(x+h)^n \approx x^n + n x^{n-1}h$ (for small $h$)
3. **Spaced-repetition schedule:** Review this proof at 1 day, 3 days, 7 days, 16 days, and 35 days. Do not just read it; write the derivation from a blank page.
4. **First principles pathway:** If you forget the rule, rebuild it:
   * Integer: Write $\lim_{h \to 0} \frac{(x+h)^n - x^n}{h}$. Expand $(x+h)^n$. Cancel $x^n$. Divide by $h$.
   * Rational: Write $y = x^{p/q}$. Turn to $y^q = x^p$. Differentiate implicitly.

## Common mistakes
1. **Confusing power rule with exponential functions:** Students try to apply this to $2^x$. The power rule is for a *variable base* and a *constant exponent* ($x^n$). Exponential functions have a constant base and variable exponent ($a^x$). $\frac{d}{dx} 2^x \neq x 2^{x-1}$.
2. **Mishandling negative subtraction:** When applying the rule to $x^{-3}$, students often write $-3x^{-2}$. Remember to subtract one: $-3 - 1 = -4$, so the derivative is $-3x^{-4}$.
3. **Forgetting the chain rule on the $y$ term:** When doing the rational proof, students write $\frac{d}{dx}(y^q) = q y^{q-1}$. It must be $q y^{q-1} \frac{dy}{dx}$.

## Self-check
1. Use the limit definition and the expansion of $(x+h)^3$ to prove $\frac{d}{dx} x^3 = 3x^2$. Show every algebraic step.
2. Prove the power rule for $f(x) = x^{-2}$ using *only* the limit definition and algebraic fraction simplification (do not use the quotient rule).
3. The proofs above cover integers and rationals. How would you derive the derivative of $y = x^{\pi}$? (Hint: You cannot use $y^q = x^p$ because $\pi$ is irrational. Try rewriting $x^\pi$ using the natural exponential and logarithm: $x^\pi = e^{\pi \ln x}$).