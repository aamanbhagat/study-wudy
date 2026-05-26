## 1. The one-sentence answer
**A rectangular hyperbola xy = c² is the curve traced by points where the product of their x- and y-coordinates stays constant, forming a hyperbola rotated 45° with perpendicular asymptotes along the coordinate axes.**

Iska matlab yeh hai ki jab aap x aur y ko multiply karte ho toh woh hamesha ek fixed value c² deta hai. Yeh standard hyperbola se alag hai kyunki yeh axes ke saath 45 degree angle par tilted hai aur uske asymptotes x=0 aur y=0 ek dusre ke perpendicular hain. Aap isse inverse relationship samajh sakte ho, jaise pressure aur volume in gases at constant temperature.

Agar c badhe toh curve dono axes se door ho jaati hai, lekin shape same rehti hai. Parametric form x = ct, y = c/t use karke aap easily points generate kar sakte ho bina square roots ke.

> [!NOTE]
> The single key insight is that the coordinate axes themselves become the asymptotes because the curve never touches x=0 or y=0, yet approaches both as |x| or |y| grows without bound.

## 2. Why this matters — concrete and current
In semiconductor physics, the xy = c² form appears when modelling carrier concentration in intrinsic materials where the product of electron and hole densities remains fixed at a given temperature; companies like TSMC use such relations during doping calibration for 3 nm nodes.

In orbital mechanics for low-energy transfers, the Clohessy-Wiltshire equations linearise to rectangular hyperbolas in the relative motion plane; JAXA’s HTV supply missions to the ISS rely on these curves for approach trajectory planning.

In economics, constant-product market makers such as Uniswap v2 encode liquidity pools exactly as xy = k; every trade moves the price along this rectangular hyperbola, directly affecting slippage calculations for billions in daily volume.

In thermodynamics, Boyle’s law PV = constant plots as xy = c² on a pressure-volume diagram; modern supercritical CO₂ power cycles at Sandia National Labs still use these isotherms to design compressors.

In special relativity, the rapidity parameter maps velocity and Lorentz factor onto a rectangular hyperbola x² – y² = 1 that can be rotated into the xy = c² frame for simplified four-vector calculations.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Coordinate geometry  | To interpret x and y as distances from perpendicular axes |
| Asymptotes           | To recognise that x=0 and y=0 are the lines the curve approaches |
| Parametric equations | To generate points on xy = c² without solving for y each time |
| Differentiation      | To find slope dy/dx at any point on the curve             |
| Standard hyperbola   | To compare eccentricity = √2 and perpendicular asymptotes |

Agar aap asymptotes ya parametric equations nahi jaante, toh pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Constant product defines the curve
Aap sochiye ki har allowed (x, y) pair ka product ek hi number c² hai. Yeh ek rectangular region mein points ki family banata hai.

Example: c = 2, toh (4,1), (8,0.5), (2,2) sab allowed hain kyunki 4×1 = 8, 8×0.5 = 4, 2×2 = 4.

Formal statement: The set of points satisfying  
$$xy = c^2$$  
where c is a non-zero constant.

> [!WARNING]
> Agar aap y = c²/x likh ke x = 0 ko include karne ki koshish karo toh curve discontinuous ho jaayegi aur asymptote galat samajh aa sakta hai.

### Step 2 — Rotation from standard form
Standard rectangular hyperbola x² – y² = a² ko 45° rotate karne par xy = c² milta hai. Rotation matrix apply karne se cross term xy appear hota hai.

### Step 3 — Asymptotes are the axes
Jab |x| → ∞, y → 0 aur jab |y| → ∞, x → 0. Isliye x = 0 aur y = 0 asymptotes hain aur dono perpendicular hain.

### Step 4 — Parametric representation
Let x = ct, y = c/t. Product turant c² ban jaata hai. t > 0 first quadrant aur t < 0 third quadrant cover karta hai.

### Step 5 — Derivative and slope
Differentiate xy = c² implicitly:  
$$x\frac{dy}{dx} + y = 0 \implies \frac{dy}{dx} = -\frac{y}{x}.$$  
Slope hamesha negative rehta hai kyunki curve quadrants 1 aur 3 mein hi hota hai.

### Step 6 — Eccentricity equals √2
For xy = c², a = b = c√2 after rotation back, giving e = √(1 + b²/a
²) = √2, confirming rectangular nature.

### Step 7 — General equation in conic form
The curve is the special case of Ax² + Bxy + Cy² + … = 0 with B² – 4AC = 4 > 0 and A + C = 0, proving it is rectangular.

## 5. Worked examples — har step show karo

**Example 1 — Basic point verification**  
*Given:* xy = 9, point (3, y).  
*Find:* y.  
3y = 9 → y = 3.  
*Why:* Direct substitution because definition is the product itself.  
**Final answer**  
(3, 3)

*Reflection:* Simple check builds confidence before harder manipulations; generalises to any constant product.

**Example 2 — Finding the derivative**  
*Given:* xy = 12 at point (4, 3).  
*Find:* dy/dx.  
Implicit: x dy/dx + y = 0 → 4 dy/dx = –3 → dy/dx = –3/4.  
*Why:* Product rule on left side yields the slope directly from the defining equation.  
**Final answer**  
–3/4

*Reflection:* Shows why slope is always –y/x; useful for tangent construction.

**Example 3 — Parametric point and tangent**  
*Given:* xy = 16, t = 2.  
*Find:* coordinates and slope.  
x = 4·2 = 8, y = 4/2 = 2. Slope = –2/8 = –1/4.  
*Why:* Parametric substitution satisfies equation instantly and gives clean numbers.  
**Final answer**  
(8, 2), slope –1/4

*Reflection:* Parametric route avoids fractions until the end; scales to any c.

**Example 4 — Intersection with line**  
*Given:* xy = 36 and line y = 2x + 3.  
*Find:* intersection points.  
Substitute: x(2x + 3) = 36 → 2x² + 3x – 36 = 0.  
Discriminant 9 + 288 = 297, x = [–3 ± √297]/4.  
*Why:* Quadratic appears because line cuts hyperbola at most twice.  
**Final answer**  
x = [–3 ± 3√33]/4, corresponding y values

*Reflection:* Demonstrates algebraic degree and prepares for chord/tangent problems.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Plotting in quadrant 2 or 4 | Forgetting product sign must be positive    | Always check sign of c² before plotting      |
| Treating x = 0 as a point   | Confusing asymptote with intercept          | State explicitly “curve never meets axes”    |
| Wrong parametric sign       | Using t > 0 only for third quadrant         | Let t run through all reals except zero      |
| Forgetting dy/dx = –y/x     | Differentiating without implicit method     | Write the product rule step every time       |
| Assuming a = b without rotation | Missing 45° link to standard form        | Rotate coordinates once to verify e = √2     |
| Division by x = 0 in slope  | Taking limit carelessly                     | Use parametric form to find limiting slope   |

## 7. The textbook-precise statement
A rectangular hyperbola is the locus of points (x, y) satisfying xy = c² (c ≠ 0). In matrix form after rotation by π/4 it becomes the standard rectangular hyperbola X² – Y
² = 2c². The curve is equilateral (asymptotes perpendicular) with eccentricity √2 and parametric equations x = ct, y = c/t. (Thomas’ Calculus, 15e, §10.5, Conic Sections in Polar and Parametric Form.)

## 8. Visual — diagram or schematic
```
          y
          ^
          |     . (8,2)
          |    /
          |   /   xy=16
          |  /
          | /     asymptote y=0
----------+---------------→ x
         /|     asymptote x=0
        / |
       /  |
      /   |
 (2,8)|
```
Axes labelled, curve only in quadrants 1 and 3, approaching both axes asymptotically.

## 9. The memory technique
**The hook** — Picture a spider sitting at origin; its web threads are the hyperbola branches that never touch the two walls (axes) yet get arbitrarily close.

**What to overlearn** — xy = c² definition, dy/dx = –y/x, parametric pair (ct, c/t).

**Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Start from product definition, differentiate implicitly, substitute parametric t to rebuild any missing relation.

## 10. What this unlocks
You can now handle rotated conics, parametric calculus on inverse relations, and constant-product optimisation problems that appear in economics and physics.

- Tangents and normals to xy = c²
- Chord of contact and pole-polar theory
- Parametric integration leading to logarithmic areas
- Link to polar conics with eccentricity √2

## 11. Self-check — five questions, no answers
1. For xy = 25, find the slope at (5,5) without looking up the formula.
2. A line y = mx + 4 intersects xy = 36 at exactly one point; solve for m.
3. Convert xy = 9 into standard X² – Y² form after 45° rotation and state the new a.
4. Using t = –1, locate the point on xy = 4 and verify the product.
5. Explain why the curve cannot cross into the second quadrant while still obeying xy = c².