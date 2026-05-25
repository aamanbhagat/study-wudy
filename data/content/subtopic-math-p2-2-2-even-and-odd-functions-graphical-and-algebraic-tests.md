## What it is
Even and odd functions are specific types of mathematical relationships that exhibit perfect symmetry. An even function mirrors perfectly across the vertical y-axis, meaning the left side is an exact reflection of the right. An odd function possesses rotational symmetry around the origin; if you rotate its graph 180 degrees, it looks identical to the original. 

## Why it matters
Recognizing these symmetries drastically simplifies integration in calculus and physics. Integrating an odd function over a symmetric interval (like $-5$ to $5$) instantly yields zero, saving you pages of computation. In aerospace and signal processing, Fourier series rely heavily on this: any periodic signal can be decomposed into a sum of even (cosine) and odd (sine) functions, which forms the mathematical foundation for analyzing vibrations in rocket airframes.

## When to study it
You must already understand basic function notation $f(x)$, how to evaluate functions at negative inputs by substituting $-x$, and the Cartesian coordinate system. If you cannot confidently simplify algebraic expressions like $(-x)^3$ to $-x^3$ and $(-x)^2$ to $x^2$, you must review exponent rules and algebraic substitution first.

## How to study it (step by step)
1. **Master the algebraic test:** Write down the formal definitions: $f(-x) = f(x)$ for even, and $f(-x) = -f(x)$ for odd. 
2. **Test the archetypes:** Evaluate $f(-x)$ for basic polynomials like $x^2$, $x^3$, $x^4$, and $x^5$. Observe how even exponents consume the negative sign, while odd exponents preserve it.
3. **Graph the even archetype:** Graph $y = x^2$ and $y = \cos(x)$. Mentally fold the coordinate plane along the y-axis to verify the curves map perfectly onto themselves.
4. **Graph the odd archetype:** Graph $y = x^3$ and $y = \sin(x)$. Draw a straight line from any point on the curve through the origin $(0,0)$ to the opposite quadrant to verify point symmetry.
5. **Analyze combinations:** Substitute $-x$ into a mixed function like $f(x) = x^2 + x$. Attempt to factor out a $-1$ to see if it perfectly matches $f(x)$ or $-f(x)$ to prove to yourself that most functions are *neither*.

## Key ideas, with intuition

**1. The Algebraic Test for Even Functions**
$$f(-x) = f(x)$$
*Intuition:* Walking backward along the x-axis (negative $x$) gives you the exact same elevation (y-value) as walking forward. The function "eats" the negative sign.

**2. The Algebraic Test for Odd Functions**
$$f(-x) = -f(x)$$
*Intuition:* Walking backward along the x-axis gives you the exact *opposite* elevation as walking forward. The function "spits out" the negative sign.

**3. The Graphical Symmetries**
Even functions have line symmetry across the y-axis. Odd functions have point symmetry about the origin $(0,0)$. This means for an odd function, if the point $(x, y)$ is on the graph, the point $(-x, -y)$ is guaranteed to be on the graph.

**4. The "Neither" Reality**
Unlike numbers, which must be either even or odd, functions can be even, odd, or *neither*. A function like $f(x) = x^2 + x$ has no perfect symmetry. However, a profound theorem states that *any* function can be written as the sum of an even function and an odd function.

## Worked example
**Problem:** Determine algebraically if $f(x) = \frac{x^3 - 2x}{x^2 + 1}$ is even, odd, or neither.

**Step 1: Substitute $-x$ for every $x$ in the function.**
$$f(-x) = \frac{(-x)^3 - 2(-x)}{(-x)^2 + 1}$$

**Step 2: Simplify using exponent rules.**
$$f(-x) = \frac{-x^3 + 2x}{x^2 + 1}$$

**Step 3: Factor out $-1$ from the numerator to see if the original function emerges.**
$$f(-x) = \frac{-(x^3 - 2x)}{x^2 + 1}$$
$$f(-x) = -\left(\frac{x^3 - 2x}{x^2 + 1}\right)$$

**Step 4: Compare to the original function.**
$$f(-x) = -f(x)$$

**Conclusion:** The function is **odd**. 

*Reflection:* This worked because the numerator consisted entirely of odd powers of $x$ (which spit out the negative), and the denominator consisted of even powers and constants (which absorbed the negative). An odd expression divided by an even expression yields an odd function.

## Diagrams

```text
EVEN FUNCTION: y = x^2                 ODD FUNCTION: y = x^3
Line symmetry (y-axis)                 Point symmetry (origin)
      y                                      y
      ^                                      ^
  \   |   /                              /   |
   \  |  /                              /    |
    \ | /                              /     |
----- + ----- x                  ----- + ----- x
      |                               /      |
      |                              /       |
      |                             /        |
```
*Note: In the even graph, the left side mirrors the right. In the odd graph, the top right quadrant is a 180-degree rotation of the bottom left quadrant.*

## Memory technique — remember this forever

1. **The Hook:** 
   * **Even** functions **E**at the negative: $f(-x) \rightarrow f(x)$. 
   * **Odd** functions **O**utput the negative: $f(-x) \rightarrow -f(x)$.
2. **Facts to overlearn:**
   * $f(-x) = f(x) \implies \text{Even (y-axis symmetry)}$
   * $f(-x) = -f(x) \implies \text{Odd (origin symmetry)}$
3. **Spaced-repetition schedule:** Review these two definitions and their geometric meanings at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you ever forget the formal definitions, rebuild them from the namesakes. "Even" means $x^2$. Plug in $x=2$ and $x=-2$. Both yield $4$. Therefore, $f(-x) = f(x)$. "Odd" means $x^3$. Plug in $x=2$ (yields $8$) and $x=-2$ (yields $-8$). Therefore, $f(-x) = -f(x)$.

## Common mistakes
* **The "Either/Or" Trap:** Assuming a function must be even or odd. Most functions (like $e^x$ or $x^2 + x$) are neither. Do not force a negative sign to factor out if it doesn't do so perfectly.
* **Sloppy Substitution:** Writing $-x^2$ instead of $(-x)^2$ when evaluating $f(-x)$. The former means $-(x \cdot x)$, which is negative. The latter means $(-x)(-x)$, which is positive $x^2$. Always use parentheses when substituting.
* **Vertical Shifts on Odd Functions:** Assuming $f(x) = x^3 + 1$ is odd because $x^3$ is odd. If you shift an odd function up or down, it loses its symmetry around the origin $(0,0)$. Test it algebraically: $f(-x) = -x^3 + 1$, which is not $-f(x)$ (that would be $-x^3 - 1$).

## Self-check
1. Determine algebraically if $f(x) = 4x^4 - 3x^2 + 2$ is even, odd, or neither.
2. Graphically, if a function contains the point $(3, -7)$ and is known to be an odd function, what specific other point MUST be on the graph?
3. Prove algebraically that the product of an even function and an odd function is always an odd function. (Hint: Let $h(x) = f(x)g(x)$ where $f$ is even and $g$ is odd, then evaluate $h(-x)$).