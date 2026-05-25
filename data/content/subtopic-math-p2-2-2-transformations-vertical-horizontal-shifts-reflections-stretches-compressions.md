## What it is
Function transformations are operations that alter the graph of a base function by moving it, flipping it, or changing its scale. Instead of graphing a complex equation from scratch, you treat it as a simple "parent" function (like $y = x^2$) that has been shifted left/right, up/down, stretched, or reflected. It is a geometric way to understand algebraic changes.

## Why it matters
In physics and aerospace, transformations model real-world coordinate shifts, such as translating a satellite's trajectory from an Earth-centered reference frame to a lunar frame. In machine learning, data normalization (shifting a dataset's mean to zero and scaling its variance to one) is literally just applying horizontal shifts and horizontal compressions to a dataset. Mastering this builds the geometric intuition required for linear algebra and calculus.

## When to study it
You must already understand the concept of a function $f(x)$, how to evaluate functions algebraically, and the Cartesian coordinate system. You should also be fluent with the graphs of basic "parent" functions: $y=x$, $y=x^2$, $y=|x|$, and $y=\sqrt{x}$. If you cannot instantly sketch $y=x^2$, go back and master parent functions first.

## How to study it (step by step)
1. Evaluate $f(x) = x^2$ and $g(x) = x^2 + 2$ for $x \in \{-2, -1, 0, 1, 2\}$. Plot them to prove to yourself that adding a constant to the outside shifts every point up.
2. Evaluate $f(x) = x^2$ and $h(x) = (x-2)^2$ for the same domain. Notice how the inputs for $h(x)$ must be *larger* to get the same output as $f(x)$, proving the horizontal shift is to the *right*.
3. Graph $y = \sqrt{x}$ and $y = -\sqrt{x}$, then $y = \sqrt{-x}$. Trace how the negative sign outside flips the $y$-values (across the $x$-axis) and the negative sign inside flips the $x$-values (across the $y$-axis).
4. Compare $y = \sin(x)$ with $y = 2\sin(x)$ and $y = \sin(2x)$. Observe the difference between multiplying the output (vertical stretch) versus multiplying the input (horizontal compression).
5. Combine them: take a parent function and apply a shift, stretch, and reflection in sequence. Track a single point, like the vertex of a parabola, through all three changes.

## Key ideas, with intuition
The fundamental rule of transformations is the difference between inside and outside operations:
*   **Outside operations** affect the output ($y$-axis) exactly as you would expect. 
*   **Inside operations** affect the input ($x$-axis) in the *opposite* way you would expect.

**Vertical Shifts (Outside Addition):** 
$$y = f(x) + k$$ 
Moves the graph up by $k$. You calculate the normal output, then add $k$ to it.

**Horizontal Shifts (Inside Subtraction):** 
$$y = f(x - h)$$ 
Moves the graph *right* by $h$. Why? To get the same output from $f$, the new $x$ must be $h$ units larger to compensate for the subtraction. 

**Reflections (Multiplication by -1):** 
$$y = -f(x)$$ flips the graph vertically over the $x$-axis. 
$$y = f(-x)$$ flips the graph horizontally over the $y$-axis.

**Stretches/Compressions (Multiplication by a constant):** 
$$y = a f(x)$$ stretches vertically by a factor of $a$. 
$$y = f(bx)$$ compresses horizontally by a factor of $b$. Again, the inside is counterintuitive: multiplying $x$ by 2 means the function reaches its values twice as fast, *squishing* the graph horizontally.

## Worked example
**Problem:** Sketch $y = -2(x + 3)^2 + 4$ by transforming the parent function $f(x) = x^2$. Track the vertex $(0,0)$.

**Step 1: Parent Function.** 
Identify the base function as $y = x^2$. The vertex is at $(0,0)$.

**Step 2: Horizontal Shift.** 
The inside operation is $(x+3)$, which is $f(x - (-3))$. Shift left by 3. 
Vertex moves to $(-3, 0)$.

**Step 3: Vertical Stretch & Reflection.** 
Multiply the outside by $-2$. This stretches the parabola vertically by a factor of 2 and flips it upside down. The $y$-coordinate of the vertex is $0$, and $-2(0) = 0$, so the vertex stays at $(-3, 0)$. A reference point like $(-2, 1)$ on the shifted graph moves to $(-2, -2)$.

**Step 4: Vertical Shift.** 
Add 4 to the outside. Shift the entire graph up by 4. 
Vertex moves to $(-3, 4)$. The reference point $(-2, -2)$ moves to $(-2, 2)$.

**Reflection:** Order matters. We applied the horizontal shift first (inside the parentheses), then the stretch/reflection (multiplication outside), then the vertical shift (addition outside). This perfectly mirrors the algebraic order of operations (PEMDAS).

## Diagrams

```text
      y
      |
    4 |                 *       *  f(x) = |x|
      |                   *   *
    2 | *       *           *
      |   *   *             |
      |     *               |
------+-----|-------|-------|------- x
     -2     0       2       4
            f(x+2) = |x+2|
```
*Notice how adding 2 INSIDE the absolute value function shifts the "zero point" (the vertex) to the LEFT by 2. The input $x$ must be $-2$ to make the inside evaluate to $0$.*

## Memory technique — remember this forever
1. **The Mnemonic:** "Inside is Inverse, Outside is Obvious." 
   * Outside changes ($+k$, $\times a$) do exactly what they look like to the $y$-axis. 
   * Inside changes ($-h$, $\times b$) do the *inverse* (shift right, compress) to the $x$-axis.
2. **The Master Equation:** Overlearn this formula:
   $$y = a \cdot f(b(x - h)) + k$$
   Where $a$ = vertical stretch/flip, $b$ = horizontal compression/flip, $h$ = horizontal shift right, $k$ = vertical shift up.
3. **Spaced-repetition schedule:** Review this concept at 1 day, 3 days, 7 days, 16 days, and 35 days. On each review, take a random function and apply 3 transformations to it.
4. **First principles pathway:** If you forget why $f(x-h)$ shifts right, set the inside of the function to zero. $x - h = 0 \implies x = h$. The "origin" of the function has literally moved from $x=0$ to $x=h$.

## Common mistakes
* **Wrong horizontal shift direction:** Seeing $(x+2)^2$ and shifting the graph right instead of left. Remember: Inside is Inverse.
* **The Factoring Trap:** Transforming $f(2x - 4)$. Students often shift right by 4, then compress. This is wrong. You must factor out the $b$ coefficient to match the master equation: $f(2(x - 2))$. It is a shift right by 2, then a horizontal compression by 2.
* **Order of operations failure:** Applying a vertical shift *before* a vertical stretch. The transformation $2(x^2 + 3)$ is fundamentally different from $2x^2 + 3$. Multiply before you add.

## Self-check
1. Given $f(x) = |x|$, write the algebraic equation for the graph shifted left by 4 units and down by 1 unit.
2. Describe the exact sequence of transformations required to turn $y = \sqrt{x}$ into $y = -\sqrt{3x} + 2$.
3. If the domain of $f(x)$ is $[-4, 6]$ and its range is $[0, 10]$, what are the domain and range of $g(x) = -2f(x - 1) + 3$?