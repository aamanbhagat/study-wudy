## 1. The one-sentence answer
**Related rates problems require differentiating an equation that links several time-dependent quantities in order to obtain an algebraic relation among their instantaneous rates of change.**

Two or more measurable quantities change together according to a fixed geometric or physical constraint. Because the constraint is an equation rather than an explicit function, the chain rule applied to each variable produces a new equation whose unknowns are the desired rates. Solving that equation at a single instant yields the numerical relationship among the rates.

The method therefore consists of three mechanical stages: write the constraint, differentiate every term with respect to the independent variable (usually time), then substitute the known values at the instant of interest. No limit process appears explicitly once the differentiation is performed; the limit is already encoded inside the derivative symbols.

> [!NOTE]
> The single most important insight is that you never solve for one variable in terms of another before differentiating; the implicit relation itself is differentiated, automatically supplying every chain-rule factor that converts one rate into another.

## 2. Why this matters — concrete and current
Aircraft collision-avoidance systems at major airports continuously solve related-rates triangles formed by two planes and a ground radar; the Federal Aviation Administration’s Terminal Maneuvering Area software updates range-rate predictions every 0.5 s.

Semiconductor wafer steppers maintain sub-nanometer overlay by treating lens-to-wafer distance and lateral stage velocity as related rates; ASML’s latest High-NA EUV machines issue corrective acceleration commands derived from exactly these differentiated constraint equations.

In vivo ultrasound elastography tracks the radial expansion rate of an arterial wall while blood pressure changes; the resulting circumferential strain rate is obtained by differentiating the cylindrical volume constraint with respect to time inside the scanner’s real-time DSP pipeline.

Large-scale computational fluid dynamics codes for rocket tank slosh model the free-surface height and wetted-wall angle as related variables; automatic differentiation of the volume-of-fluid equation supplies the pressure-rate boundary condition that NASA’s SLS liquid-hydrogen tank simulations require at every time step.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Chain rule               | Converts each dV/dt term into a product involving dx/dt   |
| Implicit differentiation | Allows differentiation of a relation without solving for one variable first |
| Basic geometric formulas | Supply the algebraic constraint (Pythagoras, similar triangles, volume of cone, etc.) |
| Units and signs          | Ensure the final rate carries the correct physical direction and dimension |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the linked quantities
All related-rates problems begin with a physical situation in which two or more quantities change together.  
Concrete example: water pours into a conical tank; both the water height and the surface radius increase.  
Formal statement: label the quantities with functions of time, \(h(t)\) and \(r(t)\).

> [!WARNING]
> Treating the radius as a fixed number rather than a function of time erases the chain-rule factor that later connects dr/dt to dh/dt.

### Step 2 — Write the unchanging constraint
The geometry or physics supplies an equation true for every instant.  
For the cone, similar triangles give the linear relation \(r = \frac{R}{H}h\), or, equivalently, the volume formula \(V = \frac13\pi r^2 h\).  
Display the equation before any differentiation occurs:
\[
V(t)=\frac13\pi[r(t)]^2 h(t).
\]

### Step 3 — Differentiate every term with respect to time
Apply the chain rule to each factor that depends on \(t\):
\[
\frac{dV}{dt}=\frac13\pi\Bigl(2r\frac{dr}{dt}h+r^2\frac{dh}{dt}\Bigr).
\]
The left side is the known inflow rate; the right side now contains the unknown rates.

### Step 4 — Substitute the instantaneous snapshot
At the moment of interest, insert the current numerical values of the variables and the known rates. Solve the resulting linear equation for the desired rate.

### Step 5 — Textbook statement of the general procedure
Let \(F(x_1(t),\dots,x_n(t))=C\) be a differentiable constraint. Then
\[
\sum_{i=1}^n\frac{\partial F}{\partial x_i}\frac{dx_i}{dt}=0
\]
holds identically. Solving for any one rate at a given instant is an algebraic exercise once the partial derivatives and the remaining rates are known. (Stewart, *Calculus*, 9e, §3.4)

## 5. Worked examples — every step shown

**Example 1 — Sliding ladder**  
*Given:* A 5 m ladder leans against a wall; its base is pulled away at 2 m/s. At the instant the base is 3 m from the wall, find the speed of the top.  
*Find:* dh/dt.  

The constraint is \(x^2+h^2=25\).  
Differentiate:
\[
2x\frac{dx}{dt}+2h\frac{dh}{dt}=0.
\]
*Why:* chain rule on each squared term.  
Substitute \(x=3\), dx/dt=2:
\[
2(3)(2)+2h\frac{dh}{dt}=0 \implies h\frac{dh}{dt}=-6.
\]
At that instant \(h=4\), so
\[
\frac{dh}{dt}=-1.5\text{ m/s}.
\]
**Final answer**  
**-1.5 m/s (top sliding down).**  

*Reflection:* The negative sign appears automatically once the geometry is respected; omitting it is the most common algebraic slip.

**Example 2 — Inflating balloon**  
*Given:* Air is pumped into a spherical balloon at 100 cm³/s. Find dr/dt when r=10 cm.  
Constraint: \(V=\frac43\pi r^3\).  
Differentiate:
\[
\frac{dV}{dt}=4\pi r^2\frac{dr}{dt}.
\]
Substitute:
\[
100=4\pi(100)\frac{dr}{dt}\implies\frac{dr}{dt}=\frac{1}{4\pi}\text{ cm/s}.
\]
**Final answer**  
**1/(4π) cm/s.**  

*Reflection:* Volume rate is given directly; radius rate follows from the surface-area factor that the chain rule produces.

**Example 3 — Conical tank**  
*Given:* Water drains from a cone (height 20 cm, base radius 5 cm) at 2 cm³/s. Find dh/dt when h=4 cm.  
Constraint uses similar triangles: \(r=\frac14 h\). Volume becomes
\[
V=\frac1{48}\pi h^3.
\]
Differentiate and substitute h=4, dV/dt=−2:
\[
\frac{dV}{dt}=\frac1{16}\pi h^2\frac{dh}{dt}\implies\frac{dh}{dt}=-\frac{8}{\pi}\text{ cm/s}.
\]
**Final answer**  
**-8/π cm/s.**  

*Reflection:* Expressing r in terms of h before differentiating reduces the number of unknown rates to one.

**Example 4 — Two ships**  
*Given:* Ship A sails east at 15 km/h; ship B sails north at 20 km/h; at t=0 they are both 10 km from port. Find the distance rate between them after 1 h.  
Constraint: \(s^2=x^2+y^2\). After differentiation and substitution the algebra yields ds/dt=25 km/h.  
**Final answer**  
**25 km/h.**  

*Reflection:* The Pythagorean constraint remains valid even though the angle between paths is 90°, illustrating that the method never requires explicit angles.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Solving for one variable before differentiating | Habit from explicit-function problems       | Keep the original relation implicit until after differentiation |
| Inserting numerical values too early | Desire to “plug in and finish”              | Differentiate symbolically first, then substitute |
| Forgetting the chain-rule factor on every variable | Treating some letters as constants          | Write d( )/dt above every term before expanding |
| Losing the sign of a rate   | Confusing “increasing” with positive        | Let the algebra produce the sign; interpret afterward |
| Using inconsistent units    | Mixing cm and m inside one equation         | Convert all quantities to a single unit system before substitution |
| Treating related rates as optimization | Confusion with later sections               | Verify that no quantity is being maximized; only rates appear |
| Omitting the time variable on every quantity | Notation laziness                           | Label every changing quantity with (t) at the outset |

## 7. The textbook-precise statement
Let \(x_1(t),\dots,x_n(t)\) be differentiable functions satisfying the identity
\[
F(x_1(t),\dots,x_n(t))=C
\]
on an interval, where \(F\) is continuously differentiable. Differentiating both sides with respect to \(t\) yields the linear relation
\[
\sum_{i=1}^n F_{x_i}(x_1(t),\dots,x_n(t))\,x_i'(t)=0.
\]
Any one of the derivatives \(x_k'(t)\) may be isolated and evaluated at a chosen instant once the remaining values are known. (Stewart, *Calculus*, 9e, §3.4)

## 8. Visual — diagram or schematic
```text
Wall
 |
 |   h(t) (top of ladder sliding down)
 |   ↑ dh/dt < 0
 |___________
 |          /
 |         /  hypotenuse = 5 m (fixed)
 |        /
x(t)→   /   base pulled right at dx/dt = +2 m/s
```
The right triangle has legs x(t) and h(t); the hypotenuse is constant. Differentiating x² + h
² = 25 produces the rate relation used in Example 1.

## 9. The memory technique
1. **The hook** — Picture two dancers whose movements are linked by an invisible rigid rod; when one speeds up, the rod forces the other to change speed instantly—the rod is the algebraic constraint.
2. **What to overlearn** — The differentiated constraint equation and the fact that every variable must receive its own d(·)/dt factor.
3. **Spaced-repetition schedule** — Review the four worked examples at 1 day, 3 days, 7 days, 16 days, and 35 days; each time solve one new variant without looking at the solution.
4. **First-principles fallback** — Return to the definition of the derivative as a limit on each side of the original constraint; the difference quotients become the chain-rule terms after the limit is taken.

## 10. What this unlocks
Related rates supply the instantaneous velocity relations needed for any subsequent study of motion constrained to curves or surfaces.  
- Parametric equations and arc-length differentiation  
- Linearization and Newton’s method in several variables  
- First-order differential equations (separable and exact)  
- Lagrangian mechanics, where time derivatives of constraints generate the equations of motion  
- Automatic-differentiation pipelines in machine-learning frameworks that treat layer activations as related rates

## 11. Self-check — five questions, no answers
1. A spherical snowball melts so that its surface area decreases at 2 cm²/min. At what rate is the radius changing when the radius is 5 cm?  
2. A trough 3 m long has isosceles-triangular ends 30 cm wide and 20 cm deep. Water is pumped in at 0.2 m³/min. How fast is the water level rising when the depth is 10 cm?  
3. Two cars leave an intersection at the same instant; one travels north at 60 km/h, the other east at 80 km/h. How fast is the distance between them changing 30 min later?  
4. A particle moves along the curve y = x³ − 3x + 2. When x = 2 the x-coordinate increases at 0.3 units per second. Find dy/dt at that instant.  
5. Explain why substituting the numerical values of the variables before differentiating produces an incorrect or zero result in a typical related-rates problem.