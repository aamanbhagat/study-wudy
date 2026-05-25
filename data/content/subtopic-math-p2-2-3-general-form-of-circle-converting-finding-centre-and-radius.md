## What it is
The general form of a circle is an expanded, flattened algebraic equation written as $x^2 + y^2 + Dx + Ey + F = 0$. Unlike the standard form, which explicitly displays the circle's geometry, the general form obscures the center and radius, requiring algebraic manipulation—specifically, completing the square—to extract them.

## Why it matters
In physics, aerospace, and robotics, geometric shapes rarely present themselves in neat, pre-factored forms. When you calculate the intersection of a radar's spherical detection range with a 2D plane, or when you derive equipotential lines for an electric field, the resulting equations emerge as raw polynomials. You cannot plot a satellite's trajectory or determine a collision boundary until you can fluidly convert these flattened equations back into their geometric parameters.

## When to study it
You must already possess absolute fluency in:
1. The standard equation of a circle: $(x-h)^2 + (y-k)^2 = r^2$.
2. The distance formula (Pythagorean theorem).
3. **Completing the square** for quadratic equations. 
If you cannot instantly factor $x^2 - 6x + 9$ into $(x-3)^2$, or if you do not know how to force $x^2 + 5x$ into a perfect square, stop here. Go review completing the square.

## How to study it (step by step)
1. **Expand to understand:** Start with a standard form equation, like $(x-2)^2 + (y+3)^2 = 16$. Expand it out completely and move all terms to the left to create the general form. This proves to you that the general form is just the standard form in disguise.
2. **Group the variables:** Take a general form equation and group the $x$ terms together and the $y$ terms together. Move the constant $F$ to the right side of the equals sign.
3. **Normalize coefficients:** If the $x^2$ and $y^2$ terms have a coefficient other than $1$ (e.g., $3x^2 + 3y^2$), divide the *entire equation* by that number immediately.
4. **Complete the squares:** Take half the coefficient of the linear $x$ term, square it, and add it to the $x$ group. Do the same for $y$. 
5. **Balance the equation:** Whatever you just added to the left side to complete the squares, you *must* add to the right side.
6. **Factor and extract:** Collapse your perfect squares into $(x-h)^2 + (y-k)^2$. Read the center $(h,k)$ and calculate the radius by taking the square root of the right side.

## Key ideas, with intuition
**The Standard Form is Geometric**
$$ (x-h)^2 + (y-k)^2 = r^2 $$
This equation is literally the Pythagorean theorem. It states: "The squared distance between any point $(x,y)$ and the center $(h,k)$ is always exactly $r^2$."

**The General Form is Algebraic**
$$ x^2 + y^2 + Dx + Ey + F = 0 $$
Notice that the coefficients of $x^2$ and $y^2$ are identical (here, exactly $1$). If they are different, the shape is an ellipse, not a circle. If there is an $xy$ term, the conic section is rotated. 

**Completing the Square is the Bridge**
To reveal the geometry, you are forcing the raw polynomial back into a distance formula. By taking $x^2 + Dx$ and adding $(D/2)^2$, you create a perfect square trinomial $(x + D/2)^2$. The center coordinates are always exactly half of the linear coefficients, with the sign flipped: $(-D/2, -E/2)$.

**The Reality Check**
When you balance the equation, the right side becomes your $r^2$. 
* If $r^2 > 0$, you have a real circle.
* If $r^2 = 0$, the circle has shrunk to a single point $(h,k)$.
* If $r^2 < 0$, the radius is imaginary. The equation represents an empty set (no real points satisfy it).

## Worked example
**Problem:** Find the center and radius of the circle given by $2x^2 + 2y^2 - 12x + 16y - 10 = 0$.

**Step 1: Normalize.** Divide the entire equation by 2 so the leading coefficients are 1.
$$ x^2 + y^2 - 6x + 8y - 5 = 0 $$
*(Why: Completing the square is vastly easier and less error-prone when the leading coefficient is 1.)*

**Step 2: Group and move the constant.**
$$ (x^2 - 6x) + (y^2 + 8y) = 5 $$
*(Why: We isolate the variables we need to manipulate from the constant.)*

**Step 3: Complete the squares and balance.**
For $x$: Half of $-6$ is $-3$. Squared is $9$.
For $y$: Half of $8$ is $4$. Squared is $16$.
Add both to the left, and crucially, to the right.
$$ (x^2 - 6x + 9) + (y^2 + 8y + 16) = 5 + 9 + 16 $$
*(Why: Adding the same values to both sides maintains equality while creating perfect square trinomials.)*

**Step 4: Factor and simplify.**
$$ (x - 3)^2 + (y + 4)^2 = 30 $$
*(Why: This is the standard form. The geometry is now visible.)*

**Step 5: Extract center and radius.**
Center: $(3, -4)$
Radius: $\sqrt{30}$
*(Why: We map the equation to $(x-h)^2 + (y-k)^2 = r^2$. Note the sign flip for the center coordinates.)*

## Diagrams

```text
               y
               |
               |       ***
               |     *     *
               |    *       *
               |    *   r   *
---------------|----*---/---*------- x
               |     * /   *
               |      C   *
               |       ***
               |
               
C = Center (h, k) extracted via completing the square.
r = Radius, derived from the balanced constant on the right.
```
*Note: In the standard Cartesian plane, a circle is simply the locus of all points $(x,y)$ swept out by a tether of length $r$ anchored at $C$. The general form hides this tether; completing the square reveals it.*

## Memory technique — remember this forever
**1. The Hook:** "Half, Square, Add, Balance." 
Say it out loud when looking at the linear terms ($Dx$ and $Ey$). Take *half*, *square* it, *add* it to the group, *balance* the right side.

**2. Must Overlearn:**
* Standard Form: $(x-h)^2 + (y-k)^2 = r^2$
* General Form: $x^2 + y^2 + Dx + Ey + F = 0$
* Center Shortcut: The center is always $(-D/2, -E/2)$.

**3. Spaced-Repetition:**
Review this process on: Day 1, Day 3, Day 7, Day 16, Day 35. Do one conversion problem per session. 

**4. First Principles Pathway:**
Never memorize the explicit formula for the radius from the general form (e.g., $r = \sqrt{g^2 + f^2 - c}$). It is a waste of mental RAM. If you forget how to find the radius, simply complete the square from scratch. The algebra will naturally hand you $r^2$ on the right side of the equals sign.

## Common mistakes
1. **Forgetting to balance:** Students will add $9$ and $16$ to the left side to complete the squares, but forget to add them to the constant on the right side. This completely alters the radius.
2. **Sign errors on extraction:** Looking at $(x-3)^2 + (y+4)^2 = 30$ and stating the center is $(-3, 4)$. Remember the standard form is $(x-h)$ and $(y-k)$. A minus sign in the equation means a positive coordinate; a plus sign means a negative coordinate.
3. **Ignoring the leading coefficient:** Trying to complete the square on $3x^2 - 12x$ by halving $-12$ to get $-6$. You must divide the entire equation by $3$ first, or factor the $3$ out: $3(x^2 - 4x)$.

## Self-check
1. Convert $x^2 + y^2 + 10x - 4y + 13 = 0$ to standard form. What are the center and radius?
2. Find the center and radius of $4x^2 + 4y^2 - 16x + 24y - 12 = 0$.
3. Given the equation $x^2 + y^2 - 2x + 6y + F = 0$, for what values of $F$ does this equation represent a real circle?