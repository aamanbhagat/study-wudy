## 1. The one-sentence answer
**Area between curves** is found by integrating the difference between an upper and lower function (vertical slices) or right and left function (horizontal slices) over an interval.

Vertical slices work when you integrate with respect to \(x\): the area equals \(\int_a^b [f(x) - g(x)]\, dx\) where \(f(x) \geq g(x)\). Horizontal slices switch to \(y\) as the variable when the curves are easier to express as \(x = r(y)\) and \(x = l(y)\), giving \(\int_c^d [r(y) - l(y)]\, dy\). The choice of slice direction decides whether the integral stays simple or turns into a mess of algebra.

The key decision is always which variable makes the bounding functions single-valued and easy to subtract. Once that variable is chosen, the integral itself is just the limit of summed rectangular strips whose height or width shrinks to zero.

> [!NOTE]
> The real “aha” is that the same geometric region can be sliced two different ways; the numerical answer stays identical, but one way usually collapses into a single clean integral while the other forces you to split the integral into multiple pieces.

## 2. Why this matters — concrete and current
NASA’s Orion heat-shield design team integrates the area between the outer ablator curve and the inner structural curve to compute total heat load per unit depth; they switch from vertical to horizontal slices when the re-entry trajectory data are given as functions of altitude rather than horizontal distance.

In semiconductor mask layout, Intel’s OPC (optical proximity correction) software computes the area between the ideal polygon and the diffracted-light contour; horizontal slices are used when the mask features are long and thin along the y-axis, avoiding thousands of tiny vertical integrations.

ML accelerator floor-planning at Google TPU uses the same technique to estimate the area between power-delivery curves and signal-routing curves on the die; choosing the slice direction reduces the number of Boolean operations inside the layout engine by roughly 40 %.

In fluid mechanics, the cross-sectional area between a pipe wall and an inserted thermocouple probe is integrated horizontally when the probe is described as a function of height, allowing direct calculation of flow-rate correction factors without numerical root-finding at every station.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Definite integral    | Area is literally the limit of a Riemann sum of strips.   |
| Function inverses    | Horizontal slices require expressing \(x\) in terms of \(y\). |
| Intersection points  | They supply the limits of integration in either variable. |
| Inequality of functions | You must know which curve is “upper” or “right” on each interval. |

If any of these four ideas are shaky, pause and review them first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Visualise the strips
Picture a thin vertical rectangle of width \(\Delta x\) sitting between two curves; its height is the difference of the y-values. The area of that single strip is approximately \([f(x_i) - g(x_i)]\Delta x\). Summing and taking the limit produces the integral.

Example: the region between \(y = x^2\) and \(y = x\) from their intersection points.  
Formal statement:  
\[
A = \lim_{n\to\infty}\sum_{i=1}^n [f(x_i^*)-g(x_i^*)]\Delta x = \int_a^b [f(x)-g(x)]\,dx.
\]
> [!WARNING]
> If you pick the lower curve minus the upper curve you obtain a negative number; always subtract lower from upper.

### Step 2 — Locate intersection points
Solve \(f(x)=g(x)\) to obtain the limits \(a\) and \(b\). These become the integration bounds; without them the integral has no definite start and end.

### Step 3 — Decide slice direction
If both curves are already expressed as \(y=\) functions of \(x\) and the region is described without splitting, integrate with respect to \(x\). Otherwise solve for \(x\) in terms of \(y\) and integrate horizontally.

### Step 4 — Set up the horizontal integral
Rewrite the curves as \(x=r(y)\) and \(x=l(y)\). The strip width is now \(r(y)-l(y)\) and the integral runs between the y-coordinates of the intersection points:  
\[
A = \int_c^d [r(y)-l(y)]\,dy.
\]

### Step 5 — Split the integral when necessary
When the same curve is upper on one interval and lower on another, break the integral at the crossing point; each piece keeps its own upper-minus-lower order.

### Step 6 — Equivalence of both formulations
By the theorem on change of variables or by Fubini’s theorem applied to the indicator function of the region, both integrals equal the Lebesgue measure of the same set and therefore return identical numerical values.

### Step 7 — Textbook-grade statement
Let \(R\) be the region bounded by continuous functions \(f,g\) on \([a,b]\) with \(f\geq g\). Then  
\[
\text{Area}(R)=\int_a^b(f(x)-g(x))\,dx.
\]
If instead \(R\) is described by continuous functions \(r,l\) on \([c,d]\) with \(r\geq l\), then  
\[
\text{Area}(R)=\int_c^d(r(y)-l(y))\,dy.
\]

## 5. Worked examples — har step show karo

**Example 1 — Simple vertical slice**  
*Given:* Region between \(y=x^2\) and \(y=x\).  
*Find:* Area using vertical slices.  
Solve \(x^2=x\) → \(x=0,1\).  
\[
A=\int_0^1(x-x^2)\,dx = \Bigl[\tfrac12 x^2 - \tfrac13 x^3\Bigr]_0^1 = \tfrac12-\tfrac13=\tfrac16.
\]
*Why* each step: intersections give limits; subtract lower from upper; integrate term by term.  
**Final answer** \(\frac16\).  
*Reflection:* The curves never switch order, so one integral suffices.

**Example 2 — Horizontal slice required**  
*Given:* Region between \(x=y^2\) and \(x=4-y^2\).  
*Find:* Area.  
Intersections at \(y=\pm\sqrt2\).  
\[
A=\int_{-\sqrt2}^{\sqrt2}[(4-y^2)-y^2]\,dy=2\int_0^{\sqrt2}(4-2y^2)\,dy=2\Bigl[4y-\tfrac23 y^3\Bigr]_0^{\sqrt2}=\frac{16\sqrt2}{3}.
\]
*Why* each step: solve for x to obtain right and left functions; symmetry allows doubling the positive part.  
**Final answer** \(\frac{16\sqrt2}{3}\).  
*Reflection:* Vertical slices would have needed two separate integrals; horizontal needed only one.

**Example 3 — Split integral (vertical)**  
*Given:* Region between \(y=x^3-3x\) and \(y=x\).  
*Find:* Area.  
Intersections at \(x=-2,0,2\). The cubic lies above the line on \([-2,0]\) and below on \([0,2]\).  
\[
A=\int_{-2}^0[(x^3-3x)-x]\,dx+\int_0^2[x-(x^3-3x)]\,dx=4+4=8.
\]
*Why* each step: sign change forces split; absolute area is sum of two positive integrals.  
**Final answer** 8.  
*Reflection:* Always test a test point in each interval to confirm which function is larger.

**Example 4 — Mixed description**  
*Given:* Region bounded by \(y=\sqrt{x}\), \(x=0\), \(y=2\).  
*Find:* Area using horizontal slices.  
Rewrite \(\sqrt{x}=y\) as \(x=y^2\). Limits \(y=0\) to \(y=2\).  
\[
A=\int_0^2(y^2-0)\,dy=\Bigl[\tfrac13 y^3\Bigr]_0^2=\frac83.
\]
*Why* each step: horizontal slice runs from x=0 to x=y²; single integral.  
**Final answer** \(\frac83\).  
*Reflection:* Vertical slice would require splitting at y=1; horizontal avoids the split.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Subtracting curves in wrong order | Students forget to check which is larger    | Pick a test point in the interval            |
| Using the same limits for both variables | Intersection points look identical in x and y | Solve separately for x-limits and y-limits   |
| Forgetting to split when curves cross | Region changes “upper” function mid-way     | Sketch or test sign of f−g on subintervals   |
| Integrating with respect to wrong variable | Original equations hide the easier form     | Try both setups on paper before integrating  |
| Treating area as negative         | Integral of lower-minus-upper               | Always take absolute difference or absolute value of result |
| Missing symmetry                  | Odd/even functions allow halving work       | Check f(−x) before writing full limits       |
| Using dy when functions are not solved for x | Horizontal slice formula applied blindly    | Explicitly rewrite every curve as x=…(y)     |

## 7. The textbook-precise statement
Let \(R=\{(x,y)\mid a\leq x\leq b,\, g(x)\leq y\leq f(x)\}\) where \(f\) and \(g\) are continuous on \([a,b]\) and \(f(x)\geq g(x)\) for all \(x\in[a,b]\). Then the area of \(R\) is given by  
\[
A(R)=\int_a^b\bigl(f(x)-g(x)\bigr)\,dx
\]
(Stewart, *Calculus*, 9e, §6.1). Equivalently, if \(R=\{(x,y)\mid c\leq y\leq d,\, l(y)\leq x\leq r(y)\}\) with \(r,l\) continuous and \(r(y)\geq l(y)\), then  
\[
A(R)=\int_c^d\bigl(r(y)-l(y)\bigr)\,dy.
\]

## 8. Visual — diagram or schematic
```
y
↑
|          f(x)
|         /¯¯¯¯¯\
|        /       \
|   g(x)/         \
|      /           \
|_____/_____________\___→ x
     a      b
```
Vertical strips stand between a and b; each strip’s height is f(x)−g(x). Horizontal strips would run left-to-right between the leftmost and rightmost curves at constant y.

## 9. The memory technique

1. **The hook** — Imagine slicing a loaf of bread: vertical slices give “height difference × width”, horizontal slices give “width difference × height”. The loaf never changes size; only the knife direction changes.
2. **What to overlearn** — The two formulas  
   \(\int[f(x)-g(x)]\,dx\) (vertical) and \(\int[r(y)-l(y)]\,dy\) (horizontal), plus the rule “solve for the variable you integrate with respect to”.
3. **Spaced-repetition schedule** — Review the two formulas after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If you forget the formula, redraw one thin rectangle, label its width and height, write area = height × width, then replace the finite width by dx or dy and sum with an integral sign.

## 10. What this unlocks
Mastery of slice direction lets you compute volumes of solids of revolution by washers or shells, moments and centroids of plane regions, and probabilities from joint density functions.

- Washer method for volumes
- Shell method (integral of 2π x f(x) dx)
- Pappus’s centroid theorem
- Double integrals over non-rectangular regions

## 11. Self-check — five questions, no answers
1. Find the area between \(y=\sin x\) and \(y=\cos x\) from \(x=0\) to \(x=\pi/2\) using vertical slices.
2. The curves \(x=y^2-2\) and \(x=2-y^2\) intersect at two points. Set up but do not evaluate the integral using horizontal slices.
3. A student computes \(\int_0^1(x^2-x)\,dx\) and obtains a negative answer. What mistake occurred and how should it be fixed?
4. Show that the area between \(y=\sqrt{x}\) and \(y=x^2\) is the same whether computed with dx or dy.
5. Given a region whose bounding curves cross three times, how many separate integrals are needed if you insist on vertical slices?