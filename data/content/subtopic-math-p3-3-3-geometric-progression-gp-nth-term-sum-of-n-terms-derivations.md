## What it is
A geometric progression (GP) is a sequence of numbers where each term after the first is found by multiplying the previous term by a fixed, non-zero constant called the common ratio. The $n$-th term formula gives the value of the sequence at any specific index, while the sum of $n$ terms formula calculates the total accumulated value of the sequence up to that index.

## Why it matters
GPs are the mathematical engine of exponential growth and decay. In aerospace, the Tsiolkovsky rocket equation relies on logarithmic mass ratios, but staging a rocket often involves optimizing geometric progressions of payload-to-structural mass. In computer science, analyzing the time complexity of divide-and-conquer algorithms (like the Master Theorem) requires summing geometric series. In physics, radioactive half-lives and the attenuation of radiation through shielding follow strict geometric progressions.

## When to study it
You must be completely fluent in:
1. Exponent laws (e.g., $x^a \cdot x^b = x^{a+b}$, $(x^a)^b = x^{ab}$).
2. Algebraic factorization.
3. The basic concept of sequences and series (you should have already mastered Arithmetic Progressions).
If you cannot confidently manipulate indices or factor out common terms from a polynomial, review those first.

## How to study it (step by step)
1. **Define the sequence:** Write out the first few terms algebraically: $a, ar, ar^2, ar^3 \dots$
2. **Derive the $n$-th term:** Observe the relationship between the position number $n$ and the exponent of $r$. 
3. **Set up the sum:** Write out the full equation for the sum of the first $n$ terms, $S_n = a + ar + \dots + ar^{n-1}$.
4. **Execute the "Shift-and-Subtract" trick:** Multiply the entire $S_n$ equation by $r$, write it directly below the original, and subtract the two equations to collapse the series.
5. **Solve for $S_n$:** Isolate $S_n$ algebraically to establish the general formula.
6. **Edge cases:** Consider what happens to the sum formula if $r=1$ (it breaks) and formulate the trivial solution for that case.

## Key ideas, with intuition

**1. The $n$-th term ($u_n$)**
The sequence is $a, ar, ar^2, ar^3 \dots$
Notice that the 1st term has $r^0$. The 2nd term has $r^1$. The 3rd term has $r^2$. 
To get to the $n$-th term, you take $n-1$ "steps" of multiplication by $r$. Therefore:
$$u_n = a r^{n-1}$$

**2. The Shift-and-Subtract Derivation (Telescoping)**
To find the sum $S_n$, we write out the series:
$$S_n = a + ar + ar^2 + \dots + ar^{n-2} + ar^{n-1}$$
This is tedious to compute. But if we multiply the entire series by $r$, every term shifts up by one power:
$$rS_n = ar + ar^2 + ar^3 + \dots + ar^{n-1} + ar^n$$
Subtract the second equation from the first. Every term in the middle cancels out perfectly. You are left with only the very first term, and the "ghost" term $ar^n$ that got pushed off the end:
$$S_n - rS_n = a - ar^n$$
Factor out $S_n$ on the left and $a$ on the right:
$$S_n(1 - r) = a(1 - r^n)$$
Divide by $(1-r)$ to get the master formula:
$$S_n = \frac{a(1 - r^n)}{1 - r} \quad \text{for } r \neq 1$$

*Intuition:* The sum is simply the first term minus the term that *would* come next ($ar^n$), all scaled by a factor of $\frac{1}{1-r}$.

## Worked example
**Problem:** Find the sum of the first 8 terms of the sequence $3, 6, 12, 24, \dots$

**Step 1: Identify the parameters.**
The first term $a = 3$. 
The common ratio $r = \frac{6}{3} = 2$. 
The number of terms $n = 8$.

**Step 2: Apply the sum formula.**
$$S_n = \frac{a(1 - r^n)}{1 - r}$$
$$S_8 = \frac{3(1 - 2^8)}{1 - 2}$$

**Step 3: Compute.**
$$2^8 = 256$$
$$S_8 = \frac{3(1 - 256)}{-1}$$
$$S_8 = \frac{3(-255)}{-1}$$
$$S_8 = 3 \times 255 = 765$$

*Reflection:* The formula allowed us to bypass adding 8 exponentially growing numbers by exploiting the symmetry of the sequence. Notice that because $r > 1$, using the equivalent form $S_n = \frac{a(r^n - 1)}{r - 1}$ would have avoided the negative signs in the intermediate steps.

## Diagrams

```text
Geometric Progression Growth (a=1, r=2)
Value (u_n)
 16 |                               [*] u_5 = 16
    |
    |
    |
    |
  8 |               [*] u_4 = 8
    |
    |
  4 |       [*] u_3 = 4
  2 |   [*] u_2 = 2
  1 |[*] u_1 = 1
____|___________________________________ Index (n)
      1   2   3   4   5
```
*Notice the curve is exponential, not linear. The gap between terms grows by a factor of $r$ at each step.*

## Memory technique — remember this forever
1. **The Hook:** "Shift and Destroy." To sum a GP, you shift it (multiply by $r$) and destroy the middle (subtract).
2. **Formulas to Overlearn:**
   * $n$-th term: $$u_n = ar^{n-1}$$
   * Sum of $n$ terms: $$S_n = \frac{a(1-r^n)}{1-r}$$ (best for $r < 1$) OR $$S_n = \frac{a(r^n-1)}{r-1}$$ (best for $r > 1$). They are mathematically identical.
3. **Spaced Repetition Schedule:** Review this derivation and these formulas at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you ever blank on the sum formula, write out $S_n = a + ar + \dots$, write $rS_n$ directly below it, and subtract. The formula will immediately appear.

## Common mistakes
* **Off-by-one errors in the exponent:** Students frequently write $u_n = ar^n$ instead of $ar^{n-1}$. Remember, the first term has zero $r$'s.
* **Mismatched signs in the sum formula:** Writing $S_n = \frac{a(1-r^n)}{r-1}$. If you use $1-r^n$ in the numerator, you MUST use $1-r$ in the denominator. 
* **Applying the formula when $r=1$:** The formula requires division by $1-r$. If $r=1$, this causes division by zero. If $r=1$, the sequence is $a, a, a, a \dots$ and the sum is simply $S_n = na$.

## Self-check
1. Find the 10th term of the sequence $5, -10, 20, -40 \dots$
2. Without looking at the notes above, derive the formula for $S_n$ using the "Shift and Destroy" method.
3. A bouncing ball returns to $80\%$ of its previous height after each bounce. If dropped from $10$ meters, what is the total vertical distance it has traveled at the exact moment it hits the ground for the 5th time? *(Hint: Draw a diagram. The first drop is not doubled, but subsequent bounces go both up and down).*