## What it is

A complex number is a two-dimensional number written in the standard form $z = a + bi$, where $a$ and $b$ are standard real numbers, and $i$ is the imaginary unit defined by $i^2 = -1$. The real number $a$ is called the "real part," and the real number $b$ is called the "imaginary part." Together, they allow us to represent quantities that have both a standard magnitude and an orthogonal, independent component.

## Why it matters

Complex numbers are the fundamental language of oscillations, rotations, and waves, making them non-negotiable for physics and engineering. In aerospace, they are used in control theory to analyze the stability of aircraft and rockets (e.g., plotting the roots of a system's transfer function on the complex plane). In quantum mechanics, the Schrödinger equation requires complex numbers to describe probability amplitudes, meaning the universe at its lowest level operates on $a+bi$ math, not just real numbers.

## When to study it

You must have a solid grasp of basic algebra, specifically polynomial expansion and the quadratic formula. You also need to understand the Cartesian coordinate system (the $x$-$y$ plane) and basic 2D vectors. If you do not yet understand why $x^2 + 1 = 0$ has no real solutions, review quadratic equations first.

## How to study it (step by step)

1. **Define the unit:** Write down the definition $i^2 = -1$. Calculate the first 8 powers of $i$ ($i^1$ through $i^8$) by multiplying by $i$ repeatedly. Observe the four-step cyclic pattern: $i, -1, -i, 1$.
2. **Master the anatomy:** Write down 5 random complex numbers (e.g., $3 - 4i$, $7i$, $-2$, $\pi + e i$). Explicitly write out $\text{Re}(z)$ and $\text{Im}(z)$ for each. 
3. **Visualize them:** Draw a 2D grid where the horizontal axis is real and the vertical axis is imaginary. Plot the numbers from the previous step as points.
4. **Add and Subtract:** Treat $i$ exactly like a variable $x$. Add and subtract two complex numbers by grouping the real parts together and the imaginary parts together. 
5. **Multiply:** Multiply two complex numbers using standard algebraic expansion (FOIL: First, Outer, Inner, Last). Then, substitute $i^2 = -1$ to collapse the expression back into the strict $a+bi$ form.

## Key ideas, with intuition

**1. The necessity of $i$**
The equation $x^2 + 1 = 0$ has no solution on the standard real number line because any real number squared is positive (or zero). Instead of stopping, we invent a new number, $i$, such that $i^2 = -1$. The term "imaginary" is a terrible historical accident; it is simply a lateral dimension orthogonal to the real number line.

**2. The anatomy of $z = a + bi$**
For a complex number $z = a + bi$:
$$ \text{Re}(z) = a $$
$$ \text{Im}(z) = b $$
Crucially, $\text{Im}(z)$ is just $b$, *not* $bi$. Both the real and imaginary parts are, ironically, real numbers. The $i$ is merely a basis vector acting as a tag to keep the $b$ component separate from the $a$ component.

**3. Closure**
When you add, subtract, multiply, or divide complex numbers, the result is *always* another complex number in the form $a+bi$. You never need to invent a "super-complex" number to solve higher-order algebra.

## Worked example

**Problem:** Simplify the expression $z = (3 + 2i)(1 - 4i)$ and identify its real and imaginary parts.

**Step 1: Expand using standard algebra (FOIL).**
$$ z = (3)(1) + (3)(-4i) + (2i)(1) + (2i)(-4i) $$
$$ z = 3 - 12i + 2i - 8i^2 $$

**Step 2: Combine the $i$ terms.**
$$ z = 3 - 10i - 8i^2 $$

**Step 3: Apply the fundamental definition $i^2 = -1$.**
$$ z = 3 - 10i - 8(-1) $$
$$ z = 3 - 10i + 8 $$

**Step 4: Combine the real numbers to achieve $a+bi$ form.**
$$ z = 11 - 10i $$

**Step 5: Identify the parts.**
$$ \text{Re}(z) = 11 $$
$$ \text{Im}(z) = -10 $$

*Reflection:* The algebra works exactly like standard polynomials, with the single extra rule that $i^2$ collapses back into a real number. This guarantees the product of two complex numbers always flattens back into the 2D plane.

## Diagrams

The Complex Plane (Argand Diagram). Notice how the real part maps to the horizontal axis and the imaginary part maps to the vertical axis.

```text
      Im (Imaginary Axis)
      ^
    3 |       * z1 = 2 + 3i
    2 |
    1 |
------+-------+-------+---> Re (Real Axis)
   -1 |       1       2
   -2 |
   -3 | * z2 = -1 - 3i
      |
```

## Memory technique — remember this forever

**1. The Visual Hook**
Think of the real number line as the flat ground you walk on (horizontal). The imaginary axis is a ladder pointing straight up into the sky (vertical). To get to a location $a+bi$, you walk $a$ steps along the ground, and climb $b$ rungs up the ladder. The $i$ just means "ladder".

**2. Formulas to overlearn**
*   $z = a + bi$
*   $\text{Re}(z) = a$
*   $\text{Im}(z) = b$ (NO $i$ HERE)
*   $i^2 = -1$

**3. Spaced-repetition schedule**
Review these definitions and complete one multiplication problem at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

**4. First principles pathway**
If you forget how to multiply them, remember that $i$ is just the root of $x^2 + 1 = 0$. Treat $i$ as a normal algebraic variable, and whenever you see $i^2$, replace it with $-1$. The rest is elementary algebra.

## Common mistakes

1. **Including $i$ in the imaginary part:** Stating that $\text{Im}(3+4i) = 4i$. This is strictly incorrect. The imaginary part is just the real coefficient $4$.
2. **Forgetting that real numbers are complex numbers:** A number like $5$ is a complex number where $b=0$ (i.e., $5 = 5 + 0i$). A number like $7i$ is a complex number where $a=0$ (i.e., $0 + 7i$, called a "purely imaginary" number).
3. **Leaving powers of $i$ in the final answer:** An answer like $4 + 3i - 2i^2$ is unfinished. You must always reduce powers of $i$ until your answer is strictly in the form $a+bi$.

## Self-check

1. What are the real and imaginary parts of the complex number $z = -7 + i$?
2. If $z_1 = 2 - 3i$ and $z_2 = a + bi$, what must the values of $a$ and $b$ be so that $z_1 + z_2$ is a purely imaginary number equal to $5i$?
3. Expand $(1+i)^3$ into standard $a+bi$ form, and identify its real and imaginary parts.