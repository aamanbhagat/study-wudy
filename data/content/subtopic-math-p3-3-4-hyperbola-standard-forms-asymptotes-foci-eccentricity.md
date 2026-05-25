## What it is
A hyperbola is the set of all points in a plane such that the absolute difference of their distances to two fixed points (the foci) is constant. Visually, it consists of two disconnected, mirrored curves (branches) that extend to infinity, bounded by intersecting linear guides called asymptotes.

## Why it matters
In orbital mechanics, any object moving faster than the escape velocity of a massive body—such as an interstellar comet or a spacecraft executing a gravity assist—follows a hyperbolic trajectory. In signal processing and physics, the interference patterns of waves from two point sources form hyperbolas, which forms the geometric foundation for multilateration in satellite navigation systems like GPS.

## When to study it
You must already be fluent in the Cartesian coordinate system, the distance formula, and completing the square. Crucially, you should already understand the ellipse—specifically its distance definition and standard form. If you cannot derive the equation of an ellipse from its geometric definition, go back and master that first; the hyperbola is its mathematical sibling.

## How to study it (step by step)
1. **Derive the standard equation:** Start with the definition $|d_1 - d_2| = 2a$. Place the foci at $(-c, 0)$ and $(c, 0)$. Use the distance formula, isolate one radical, square both sides, simplify, and square again to eliminate the remaining radical. 
2. **Define the focal parameter:** During your derivation, substitute $b^2 = c^2 - a^2$ (rearranged as $c^2 = a^2 + b^2$). This simplifies your messy algebraic equation into the standard form.
3. **Determine the asymptotes:** Take the standard equation, set the constant $1$ to $0$, and solve for $y$. This proves why the hyperbola approaches straight lines as $x \to \infty$.
4. **Draw the central rectangle:** For an equation centered at the origin, plot points $\pm a$ on the primary axis and $\pm b$ on the conjugate axis. Draw a rectangle through these points. The diagonals of this rectangle are the asymptotes.
5. **Translate the center:** Shift the center to $(h, k)$ by replacing $x$ with $(x-h)$ and $y$ with $(y-k)$. Practice completing the square to convert expanded polynomial forms into this standard translated form.

## Key ideas, with intuition

**The Standard Form and the Transverse Axis**
The standard form of a hyperbola centered at the origin is:
$$ \frac{x^2}{a^2} - \frac{y^2}{b^2} = 1 \quad \text{(Horizontal)}$$
$$ \frac{y^2}{a^2} - \frac{x^2}{b^2} = 1 \quad \text{(Vertical)}$$
The positive term dictates the axis along which the hyperbola opens (the transverse axis). The distance from the center to a vertex is $a$. Unlike an ellipse, $a$ does *not* have to be larger than $b$.

**The Pythagorean Relationship**
In an ellipse, the foci are trapped inside the curve ($c < a$). In a hyperbola, the foci are pushed *outside* the vertices ($c > a$). Therefore, the focal distance $c$ acts as the hypotenuse of a right triangle with legs $a$ and $b$:
$$ c^2 = a^2 + b^2 $$

**Asymptotes as Limits at Infinity**
To understand asymptotes, look at the horizontal hyperbola equation for very large values of $x$ and $y$. The constant $1$ becomes mathematically insignificant:
$$ \frac{x^2}{a^2} - \frac{y^2}{b^2} \approx 0 \implies \frac{y^2}{b^2} \approx \frac{x^2}{a^2} \implies y = \pm \frac{b}{a}x $$
These lines perfectly guide the hyperbola's behavior at infinity.

**Eccentricity**
Eccentricity $e$ measures how "open" the branches are:
$$ e = \frac{c}{a} $$
Because $c > a$, the eccentricity of a hyperbola is always $e > 1$. As $e \to 1$, the branches become narrow and sharp. As $e \to \infty$, the branches flatten out toward straight lines.

## Worked example
Find the center, vertices, foci, and asymptotes of $9x^2 - 16y^2 - 36x - 96y - 252 = 0$.

**Step 1: Group terms and factor out leading coefficients.**
$$ 9(x^2 - 4x) - 16(y^2 + 6y) = 252 $$
*(Watch the sign on the $y$ terms: $-16 \times 6y = -96y$.)*

**Step 2: Complete the square.**
Take half the inner coefficient, square it, and add to both sides. Multiply by the outer coefficient for the right side!
$$ 9(x^2 - 4x + 4) - 16(y^2 + 6y + 9) = 252 + 9(4) - 16(9) $$
$$ 9(x-2)^2 - 16(y+3)^2 = 252 + 36 - 144 $$
$$ 9(x-2)^2 - 16(y+3)^2 = 144 $$

**Step 3: Divide by 144 to force the right side to 1.**
$$ \frac{(x-2)^2}{16} - \frac{(y+3)^2}{9} = 1 $$

**Step 4: Extract components.**
*   Center $(h,k) = (2, -3)$
*   $x$ is positive, so it opens horizontally.
*   $a^2 = 16 \implies a = 4$.
*   $b^2 = 9 \implies b = 3$.
*   $c^2 = a^2 + b^2 = 16 + 9 = 25 \implies c = 5$.

**Step 5: Identify features.**
*   **Vertices:** $(h \pm a, k) \implies (2 \pm 4, -3) \implies (6, -3)$ and $(-2, -3)$.
*   **Foci:** $(h \pm c, k) \implies (2 \pm 5, -3) \implies (7, -3)$ and $(-3, -3)$.
*   **Asymptotes:** $y - k = \pm \frac{\Delta y}{\Delta x}(x - h)$. Here, $\Delta y$ relates to $b$ (under the $y$ term) and $\Delta x$ relates to $a$ (under the $x$ term).
    $$ y + 3 = \pm \frac{3}{4}(x - 2) $$

*Reflection:* Completing the square translates the conic to the origin, revealing its core geometry. The negative sign on the $y$-term confirms it is a horizontal hyperbola, dictating that we add $a$ and $c$ to the $x$-coordinate of the center.

## Diagrams

```text
                  y
                  ^
         \        |        /
          \       |       /  Asymptote: y = (b/a)x
           \      |      /
            \   __|__   /
             \ |     | /
      <-------+|--+--|+-------> x
             / |__|__| \
            /     |     \
           /      |      \
          /       |       \
         /        |        \

Legend:
+ : Vertices at (a, 0) and (-a, 0)
The central box has width 2a and height 2b.
The diagonals of the box form the asymptotes.
The hyperbola branches touch the box at the vertices.
```

## Memory technique — remember this forever
1. **The Mnemonic:** "A hyperbola has a **HYPHEN** (minus sign in the equation), and its foci are **HYPER** (further out, so $c^2 = a^2 + b^2$)." Contrast this with the ellipse: it has a PLUS sign, and its foci are LESS ($c^2 = a^2 - b^2$).
2. **Must-know formulas:**
   * Standard form: $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$
   * Focal distance: $c^2 = a^2 + b^2$
   * Eccentricity: $e = \frac{c}{a} > 1$
3. **Spaced-repetition schedule:** Review these facts and re-derive the asymptotes at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget the asymptote formula ($\frac{b}{a}$ vs $\frac{a}{b}$), do not guess. Set the $1$ in the standard equation to $0$ and solve for $y$. The algebra will hand you the correct slope every time.

## Common mistakes
* **Assuming $a > b$:** In an ellipse, $a^2$ is always the larger denominator. In a hyperbola, $a^2$ is simply the denominator of the *positive* term. $b$ can be larger than $a$.
* **Sign errors when completing the square:** When factoring out a negative coefficient for the $y^2$ term (e.g., $-16y^2 + 96y$), students frequently forget to flip the sign inside the parenthesis: $-16(y^2 - 6y)$.
* **Swapping asymptote slopes:** Memorizing $y = \pm \frac{b}{a}x$ blindly leads to errors for vertical hyperbolas (where the slope is $\frac{a}{b}$). Always think $\frac{\text{rise}}{\text{run}}$, which is $\frac{\text{square root of } y \text{ denominator}}{\text{square root of } x \text{ denominator}}$.

## Self-check
1. Find the eccentricity of the hyperbola $\frac{y^2}{25} - \frac{x^2}{144} = 1$.
2. A hyperbola centered at the origin has vertices at $(\pm 3, 0)$ and asymptotes $y = \pm 2x$. Write its standard equation.
3. Derive the standard equation of a hyperbola where the absolute difference in distances from any point $(x,y)$ on the curve to the foci $(5,0)$ and $(-5,0)$ is exactly $6$.