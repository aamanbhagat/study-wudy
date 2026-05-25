## What it is
An Arithmetic-Geometric Progression (AGP) is a sequence where each term is the product of corresponding terms from an arithmetic sequence and a geometric sequence. To find its sum, you use a specific algebraic shifting trick that strips away the arithmetic growth, leaving a standard geometric series that you can sum easily.

## Why it matters
AGPs appear frequently in probability theory (e.g., calculating the expected number of trials in a geometric distribution) and algorithm analysis (e.g., expected time complexity of randomized algorithms). In physics and engineering, they arise when modeling systems with linear growth coupled with exponential decay, such as calculating discrete time steps of damped harmonic oscillators or evaluating specific orbital perturbation series.

## When to study it
You must have absolute mastery of both Arithmetic Progressions (AP) and Geometric Progressions (GP). Specifically, you need to know the $n$-th term formulas for both, how to sum a finite GP, and the condition ($|r| < 1$) and formula for summing an infinite GP. If you cannot derive the standard GP sum formula from scratch, go back and do that first.

## How to study it (step by step)
1. Write out the general form of a finite AGP: $S_n = a + (a+d)r + (a+2d)r^2 + \dots + [a+(n-1)d]r^{n-1}$.
2. Perform the "multiply and shift" operation: multiply $S_n$ by the common ratio $r$, align terms with the same power of $r$, and subtract this new equation from the original.
3. Observe the result: the difference between consecutive arithmetic coefficients is constant ($d$), leaving a single boundary term $a$, a standard geometric series of $(n-1)$ terms, and a subtracted final boundary term.
4. Derive the formula for the infinite sum $S_\infty$ by applying the limit $n \to \infty$, assuming $|r| < 1$.
5. Solve 3 finite sum problems by executing the derivation method manually (do not plug into a formula).
6. Solve 3 infinite sum problems using the derivation method.

## Key ideas, with intuition
**The Anatomy of an AGP:** 
Every term looks like $t_k = (a + (k-1)d)r^{k-1}$. It is a linear function racing against an exponential function.

**The Annihilation Trick:** 
The defining feature of an AP is that the difference between consecutive terms is a constant ($d$). By multiplying the series by $r$ and subtracting it from itself, you force adjacent terms to subtract: $(a+d)r - ar = dr$. This flattens the linear arithmetic growth into a constant, turning the messy AGP into a clean GP.

**The Subtraction Structure:**
$$S_n - rS_n = a + \underbrace{dr + dr^2 + \dots + dr^{n-1}}_{\text{Standard GP}} - [a+(n-1)d]r^n$$
The middle terms collapse into a simple GP. The first and last terms are the "spillovers" from the shift.

**Infinite Convergence:** 
If $|r| < 1$, the exponential decay outpaces the linear arithmetic growth. As $n \to \infty$, the trailing term $[a+(n-1)d]r^n$ gets crushed to $0$.

## Worked example
Find the infinite sum of the series: $S = 1 + 2\left(\frac{1}{2}\right) + 3\left(\frac{1}{4}\right) + 4\left(\frac{1}{8}\right) + \dots$

**Step 1: Identify the components.**
AP part: $1, 2, 3, 4, \dots$ (first term $a=1$, common difference $d=1$).
GP part: $1, \frac{1}{2}, \frac{1}{4}, \frac{1}{8}, \dots$ (common ratio $r = \frac{1}{2}$).

**Step 2: Write the sum and the shifted sum.**
$$S = 1 + 2\left(\frac{1}{2}\right) + 3\left(\frac{1}{2}\right)^2 + 4\left(\frac{1}{2}\right)^3 + \dots$$
Multiply the entire equation by $r = \frac{1}{2}$:
$$\frac{1}{2}S = 1\left(\frac{1}{2}\right) + 2\left(\frac{1}{2}\right)^2 + 3\left(\frac{1}{2}\right)^3 + \dots$$

**Step 3: Subtract the shifted sum from the original.**
$$S - \frac{1}{2}S = 1 + (2-1)\left(\frac{1}{2}\right) + (3-2)\left(\frac{1}{2}\right)^2 + (4-3)\left(\frac{1}{2}\right)^3 + \dots$$
$$\frac{1}{2}S = 1 + \frac{1}{2} + \left(\frac{1}{2}\right)^2 + \left(\frac{1}{2}\right)^3 + \dots$$

**Step 4: Sum the resulting infinite GP.**
The right side is an infinite GP with first term $1$ and ratio $1/2$.
$$\text{Sum} = \frac{1}{1 - 1/2} = 2$$
Substitute this back into the left side:
$$\frac{1}{2}S = 2 \implies S = 4$$

*Reflection:* The trick worked because subtracting shifted terms reduced the linearly growing coefficients ($1, 2, 3...$) to constant coefficients ($1, 1, 1...$), leaving a pure geometric series.

## Diagrams
Here is the visual alignment of the "Shift and Annihilate" method. Notice how shifting $rS_n$ one column to the right groups identical powers of $r$.

```text
  S_n   =  a  + (a+d)r + (a+2d)r^2 + ... + [a+(n-1)d]r^{n-1}
 r*S_n  =         a*r  + (a+d)r^2  + ... + [a+(n-2)d]r^{n-1} + [a+(n-1)d]r^n
----------------------------------------------------------------------------- (Subtract)
(1-r)S_n = a  +   d*r  +   d*r^2   + ... +       d*r^{n-1}   - [a+(n-1)d]r^n
              \____________________________________________/
                          Pure Geometric Series
```

## Memory technique — remember this forever
1. **The Hook:** "Shift and Annihilate." You aren't memorizing a formula for the finite sum; you are memorizing an *algorithm*. Multiply by the ratio, shift right, and subtract.
2. **The Fact to Overlearn:** For an *infinite* AGP (where $|r| < 1$), memorize the collapsed result:
   $$S_\infty = \frac{a}{1-r} + \frac{dr}{(1-r)^2}$$
3. **Spaced-repetition schedule:** Review this derivation at 1 day, 3 days, 7 days, 16 days, and 35 days. Do not just read it; write out the $S_n - rS_n$ subtraction on a blank sheet of paper.
4. **First principles pathway:** Never rely on a formula for the finite sum. The formula is a typographical nightmare and prone to sign errors. Always write $S_n$, write $rS_n$ shifted by one term, and subtract. The derivation is foolproof.

## Common mistakes
* **Forgetting the dangling tail in finite sums:** When subtracting $rS_n$ from $S_n$, students often forget the final subtracted term: $-[a+(n-1)d]r^n$. It sits alone at the end of the second row.
* **Misidentifying the GP bounds:** In the subtracted equation $(1-r)S_n = a + dr + dr^2 + \dots$, the pure geometric progression usually starts at $dr$, not $a$. There are $(n-1)$ terms in that geometric part.
* **Applying the infinite sum when $|r| \ge 1$:** The limit only converges if the geometric decay crushes the arithmetic growth. If $r \ge 1$, the series diverges.

## Self-check
1. Find the sum of the first $n$ terms of: $1 + 3x + 5x^2 + 7x^3 + \dots$ 
2. Calculate the infinite sum of: $\frac{1}{3} + \frac{2}{9} + \frac{3}{27} + \frac{4}{81} + \dots$
3. For what values of $x$ does the infinite series $1 + 4x + 7x^2 + 10x^3 + \dots$ converge, and what is its sum in terms of $x$?