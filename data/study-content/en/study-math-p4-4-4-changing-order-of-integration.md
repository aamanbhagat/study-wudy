## 1. The one-sentence answer
**Changing the order of integration rewrites an iterated integral over a region by swapping the sequence of variables while adjusting the limits so that the value remains identical.**

An iterated integral such as \(\int_a^b \int_{g(x)}^{h(x)} f(x,y)\, dy\, dx\) evaluates the inner integral first with respect to one variable while treating the other as constant. The region of integration is a fixed set in the plane; the same set can be traversed by slicing first in the orthogonal direction. When the limits are rewritten to match the new slicing direction, the numerical result is unchanged because both expressions compute the same signed volume under the surface \(z = f(x,y)\).

The procedure therefore consists of two tasks: describe the geometric region with the opposite order of variables, then insert the new boundary functions as limits. The equality of the two expressions is guaranteed once the region is bounded and the integrand is continuous.

> [!NOTE]
> The decisive insight is that the region itself never changes; only the description of its boundaries changes, exactly as rewriting the same set of points with a different pair of inequalities.

## 2. Why this matters — concrete and current
In computational fluid dynamics, NASA’s OVERFLOW solver evaluates surface integrals over aircraft wings by switching integration order to align with body-fitted curvilinear grids, reducing memory traffic on GPU clusters during transonic flow simulations.

In semiconductor process modeling, Synopsys TCAD tools integrate dopant concentration profiles over irregular implant regions; reversing the order converts a slowly convergent triple integral into a rapidly evaluated double integral that fits inside real-time process-window optimization loops.

In probabilistic machine learning, variational auto-encoders compute the evidence lower bound by integrating joint densities over latent-variable rectangles; swapping the order converts an intractable nested Monte-Carlo sum into an analytic marginal that accelerates training of models at DeepMind and OpenAI.

In gravitational lensing surveys, the Vera C. Rubin Observatory pipeline integrates surface-mass density along lines of sight through galaxy clusters; reversing the order separates the line-of-sight integral from the transverse plane, enabling GPU-parallel evaluation of thousands of strong-lens image systems per night.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Single-variable definite integral | Supplies the definition of each iterated slice            |
| Graph of a function of one variable | Describes the boundary curves that become new limits      |
| Inequality description of planar regions | Encodes the domain so limits can be read off in either order |

## 4. Building the idea — from intuition to formalism

### Step 1 — An iterated integral slices the region in one fixed sequence
A double integral written as an iterated integral first sweeps vertical strips (dy) whose height depends on x, then moves those strips horizontally (dx).  
Concrete example: the unit square gives \(\int_0^1 \int_0^1 1\, dy\, dx = 1\).  
Formal statement:
\[
\int_a^b \int_{g(x)}^{h(x)} f(x,y)\, dy\, dx.
\]
> [!WARNING]
> Treating the inner limits as constant when they actually depend on the outer variable produces an incorrect volume.

### Step 2 — The same region admits an orthogonal slicing description
Any bounded region can be partitioned into horizontal strips whose width depends on y; the outer integral then runs over y.  
Concrete example: the same square becomes \(\int_0^1 \int_0^1 1\, dx\, dy = 1\).  
Formal statement: the set
\[
D = \{(x,y) \mid a \le x \le b,\, g(x) \le y \le h(x)\}
\]
is rewritten by solving the boundary inequalities for x in terms of y.

### Step 3 — Boundary curves become the new limits
Solve each left and right boundary equation for the outer variable.  
Concrete example: the triangle \(0 \le x \le 1\), \(0 \le y \le x\) becomes \(0 \le y \le 1\), \(y \le x \le 1\).  
Formal statement: the projection onto the y-axis supplies the outer interval; the inverse functions of the boundary curves supply the inner limits.

### Step 4 — Fubini’s theorem equates the two expressions
If \(f\) is continuous on a closed bounded rectangle (or, more generally, on a compact set whose boundary has measure zero), the iterated integrals in either order are equal.  
Formal statement:
\[
\iint_D f(x,y)\, dA = \int_a^b \int_{g(x)}^{h(x)} f(x,y)\, dy\, dx = \int_c^d \int_{p(y)}^{q(y)} f(x,y)\, dx\, dy.
\]

### Step 5 — The general procedure for non-rectangular regions
Sketch the region, project onto both axes, read off the four functions that bound the two projections, then write both iterated integrals.  
Formal statement: the equality holds for any Jordan-measurable \(D\) and any \(f \in C(D)\).

## 5. Worked examples — every step shown

**Example 1 — Unit square, constant limits**  
*Given:* \(\int_0^1 \int_0^1 xy\, dy\, dx\).  
*Find:* the same integral with order reversed.  
Step 1: The region is \(0\le x\le1\), \(0\le y\le1\).  
*Why*: Both pairs of inequalities are independent.  
Step 2: Projection onto y-axis is identical.  
*Why*: Limits remain constant.  
Step 3: Interchange yields \(\int_0^1 \int_0^1 xy\, dx\, dy\).  
**\(\int_0^1 \int_0^1 xy\, dx\, dy = \frac14\)**  

*Reflection*: Constant limits make the swap immediate; the only skill required is recognizing that the region is a product set.

**Example 2 — Right triangle**  
*Given:* \(\int_0^1 \int_0^x (x+y)\, dy\, dx\).  
*Find:* reversed order.  
Step 1: Region: \(0\le x\le1\), \(0\le y\le x\).  
*Why*: Inner limit is the line y = x.  
Step 2: For fixed y the leftmost x is the line x = y and the rightmost x is x = 1.  
*Why*: Solve y = x for x and note the vertical line x = 1.  
Step 3: Outer interval for y runs from 0 to 1.  
*Why*: Lowest and highest y-values in the triangle.  
Step 4: New integral \(\int_0^1 \int_y^1 (x+y)\, dx\, dy\).  
**\(\int_0^1 \int_y^1 (x+y)\, dx\, dy = \frac13\)**  

*Reflection*: The slanted boundary becomes the variable inner limit; the vertical boundary becomes the constant outer limit.

**Example 3 — Parabolic region**  
*Given:* \(\int_0^2 \int_{x^2/2}^x 2xy\, dy\, dx\).  
*Find:* reversed order.  
Step 1: Region bounded below by y = x²/2, above by y = x, from x = 0 to 2.  
*Why*: Intersection points give the x-range.  
Step 2: Solve for x in terms of y: left branch x = √(2y), right branch x = 2y.  
*Why*: Invert each parabola.  
Step 3: y ranges from 0 to 2.  
*Why*: Highest point of the upper curve.  
Step 4: New integral \(\int_0^2 \int_{\sqrt{2y}}^{2y} 2xy\, dx\, dy\).  
**Final value = 4**  

*Reflection*: Two curved boundaries require two inverse functions; both become inner limits.

**Example 4 — Region requiring split**  
*Given:* integral of 1 over the area between y = x and y = x³ for 0 ≤ x ≤ 1.  
*Find:* reversed order, noting the curves cross at (0,0) and (1,1).  
Step 1: For y from 0 to 1 the left curve is x = y^{1/3} and the right curve is x = y only when y ≥ some value? No split needed because x³ ≤ x on [0,1].  
*Why*: Direct comparison shows x³ ≤ x.  
Step 2: Reversed integral \(\int_0^1 \int_{y^{1/3}}^y 1\, dx\, dy\).  
**Value = 1/4**  

*Reflection*: Even when curves intersect only at endpoints, the order swap still yields a single integral; splitting appears only when the relative position of curves changes inside the projection.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Leaving inner limits unchanged    | Habit from constant-limit rectangles                | Always redraw the region and re-derive each limit    |
| Forgetting to adjust outer interval | Projecting only the original outer variable         | Find min/max of the new outer variable over the whole region |
| Using the same variable names after swap | Copy-paste error                                    | Rename dummy variables consistently                  |
| Assuming the integrand is independent of order | Over-generalizing Fubini without checking continuity | Verify continuity on the closed region first         |
| Integrating over unbounded regions without absolute convergence | Applying Fubini to conditionally convergent integrals | Check absolute integrability or split into positive/negative parts |
| Misidentifying which curve is left versus right | Sketch drawn too quickly                            | Label every intersection and test a test point       |
| Treating a type-II region as type-I without split | Region changes topology relative to axes            | Test whether a horizontal line intersects the boundary more than twice |

## 7. The textbook-precise statement
Let \(D \subset \mathbb{R}^2\) be a bounded Jordan-measurable set and let \(f:D\to\mathbb{R}\) be continuous. Then the double integral exists and equals either iterated integral:
\[
\iint_D f(x,y)\,dA = \int_{a}^{b}\int_{g(x)}^{h(x)}f(x,y)\,dy\,dx = \int_{c}^{d}\int_{p(y)}^{q(y)}f(x,y)\,dx\,dy,
\]
where the functions \(g,h,p,q\) are continuous on their respective intervals and describe the boundary of \(D\) (Stewart, *Calculus*, 9e, §15.2, Theorem 2).

## 8. Visual — diagram or schematic
```text
y
↑
|       (1,1)●───────────────●(2,2)
|          /                 |
|         /  D               |
|        /                   |
|   (0,0)●───────────────────●(2,0)  x
```
Horizontal slices (dy outer) run left-to-right between the lower parabola and the upper line; vertical slices (dx outer) run bottom-to-top between the left line and the right parabola after inversion.

## 9. The memory technique
1. **The hook** — Picture the region as a stack of pancakes; flipping the stack reverses the order of slicing while the total volume stays the same.  
2. **What to overlearn** — The two-line statement of Fubini for continuous functions on compact regions; the mechanical rule “solve each boundary equation for the new outer variable.”  
3. **Spaced-repetition schedule** — Review the statement and one triangle example after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the limits by writing the set of points as two different systems of inequalities and reading the resulting functions directly.

## 10. What this unlocks
Mastery of order reversal supplies the technical foundation for every subsequent technique that must choose a convenient slicing direction.  

- Change of variables in multiple integrals (Jacobian)  
- Triple integrals and the divergence theorem  
- Surface integrals expressed as projections onto coordinate planes  
- Convolution integrals in Fourier analysis  
- Marginal and conditional densities in probability

## 11. Self-check — five questions, no answers
1. Reverse the order of \(\int_0^1 \int_{x^2}^x f(x,y)\, dy\, dx\) and evaluate when \(f=1\).  
2. For which continuous functions on the unit disk does reversing order fail to be valid?  
3. Sketch the region whose description \(0\le y\le 2\), \(y/2\le x\le\sqrt{y}\) produces a different numerical value when the order is reversed without adjusting limits.  
4. A double integral over a region bounded by y = sin x and y = cos x between their intersection points yields 2 when integrated dy dx; what must the reversed integral equal?  
5. Construct a bounded region whose description requires splitting into two type-I subregions but only one type-II subregion; write both iterated integrals of the constant function 1.