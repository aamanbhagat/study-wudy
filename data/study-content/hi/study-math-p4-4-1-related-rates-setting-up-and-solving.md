## 1. The one-sentence answer

**Related rates problems require you to differentiate an implicit equation relating two or more changing quantities with respect to time, thereby converting a static geometric or physical relation into an equation that connects their instantaneous rates of change.**

Aap already know how to differentiate a function with respect to its own variable. Here the twist is that every quantity changes with an external parameter—almost always time—so you must apply the chain rule systematically while treating every variable as a function of \(t\).

The setup always begins with an equation that does not contain derivatives; after implicit differentiation you obtain a new equation whose unknowns are precisely the rates you are asked to find. Once that differentiated equation is solved for the desired rate, you substitute the known values at the instant of interest.

> [!NOTE]
> The single “aha” moment is this: the original equation is an identity that holds for every \(t\) in some interval; therefore its derivative with respect to \(t\) is also identically zero, and that identity is the only tool you need to relate the rates.

## 2. Why this matters — concrete and current

In aerospace guidance, SpaceX’s Falcon 9 first-stage return-to-launch-site trajectory is continuously recomputed by solving related-rates equations that link thrust, mass loss, altitude and down-range distance; any lag in updating the rate of change of altitude immediately alters the commanded gimbal angles.

Semiconductor lithography machines at ASML maintain sub-nanometre overlay by treating lens-to-wafer distance and stage velocity as related rates; a 0.1 nm/s drift in focal-plane velocity is detected within milliseconds through the differentiated form of the thin-lens equation.

In autonomous-vehicle radar, the Doppler return gives radial velocity while the camera supplies angular rate; the related-rates relation between these two measurements yields the tangential velocity component that feeds the Kalman filter’s prediction step at Mobileye and Waymo.

Planetary scientists at NASA’s Jet Propulsion Laboratory use related rates on the radar-ranging equation to convert line-of-sight velocity of the Perseverance rover into its true three-dimensional speed over the Martian surface.

High-frequency trading desks differentiate the Black–Scholes PDE with respect to calendar time to obtain instantaneous vega and theta surfaces; the resulting related-rates identity lets them hedge an entire option book in microseconds when implied-volatility surfaces move.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Implicit differentiation | The defining relation is rarely solved for one variable   |
| Chain rule               | Every quantity is a function of \(t\), so every derivative carries a \(\frac{d}{dt}\) factor |
| Geometric or physical constraint equations | These supply the starting relation that must be differentiated |
| Evaluation at a specific instant | Rates are almost always required only at one moment       |

If any row is unfamiliar, pause and review that single concept before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the unchanging geometric or physical relation
Aap notice that two quantities—say radius and volume—are linked by a formula that does not mention time.  
Concrete example: air is pumped into a spherical balloon; the relation \(V = \frac{4}{3}\pi r^3\) holds at every instant.  
Formal statement: there exists a differentiable function \(F(x,y)=0\) that is identically zero for all \(t\) in an interval.  
> [!WARNING]  
> If you start differentiating before writing the static relation, you will invent spurious terms that have no physical meaning.

### Step 2 — Declare every variable a function of time
Write \(V(t)\) and \(r(t)\) explicitly. This single notational step forces you to remember the chain rule on the next differentiation.  
Formal statement: replace each symbol \(x\) by \(x(t)\).

### Step 3 — Differentiate both sides with respect to \(t\)
Apply \(\frac{d}{dt}\) to the entire equation, using the chain rule on each term.  
For the balloon:  
\[
\frac{dV}{dt} = 4\pi r^2 \frac{dr}{dt}.
\]
> [!WARNING]  
> Forgetting the chain-rule factor \(\frac{dr}{dt}\) is the most common algebraic error; the resulting equation will be dimensionally inconsistent.

### Step 4 — Solve the differentiated equation for the unknown rate
Isolate the rate you were asked to find. All other quantities may remain symbolic until the final substitution.

### Step 5 — Substitute the known values at the given instant
Only after the algebraic solution do you insert the numerical values of the variables and known rates at that specific moment. This order prevents rounding errors from propagating through unsolved symbols.

### Step 6 — State units and interpret the sign
Attach units to the final numerical answer and verify that a positive rate corresponds to the physical direction implied by the problem (inflation versus deflation).

### Step 7 — Textbook-grade statement
Let \(F(x_1(t),\dots,x_n(t))=0\) be an identity on an interval \(I\). If each \(x_i\) is differentiable on \(I\) and \(F\) is continuously differentiable in a neighbourhood of the image curve, then
\[
\sum_{i=1}^n \frac{\partial F}{\partial x_i}\frac{dx_i}{dt}\equiv 0 \quad\text{on }I.
\]
This identity is the precise engine that converts the static constraint into a relation among rates.

## 5. Worked examples — har step show karo

**Example 1 — Spherical balloon inflation**  
*Given:* Air is pumped in at \(\frac{dV}{dt}=100\,\text{cm}^3/\text{s}\); at the instant \(r=10\,\text{cm}\).  
*Find:* \(\frac{dr}{dt}\).  

Start with \(V=\frac{4}{3}\pi r^3\).  
Differentiate: \(\frac{dV}{dt}=4\pi r^2\frac{dr}{dt}\).  
Solve: \(\frac{dr}{dt}=\frac{1}{4\pi r^2}\frac{dV}{dt}\).  
Substitute: \(\frac{dr}{dt}=\frac{100}{4\pi(10)^2}=\frac{1}{4\pi}\approx0.0796\,\text{cm/s}\).  
**Final answer: \(\dfrac{1}{4\pi}\) cm/s**  
*Reflection:* The example is simple yet already shows that you must never substitute numbers before isolating the target rate.

**Example 2 — Ladder sliding down a wall**  
*Given:* A 5 m ladder leans against a wall; bottom slides away at 0.8 m/s; at the instant bottom is 1.5 m from wall.  
*Find:* How fast the top descends.  

Constraint: \(x^2+y^2=25\).  
Differentiate: \(2x\frac{dx}{dt}+2y\frac{dy}{dt}=0\).  
Solve: \(\frac{dy}{dt}=-\frac{x}{y}\frac{dx}{dt}\).  
At instant: \(y=\sqrt{25-2.25}=4.77\) m, so \(\frac{dy}{dt}=-\frac{1.5}{4.77}(0.8)\approx-0.251\) m/s.  
**Final answer: \(-0.251\) m/s (negative sign shows descent)**  
*Reflection:* The negative sign is not optional; it encodes direction and must be interpreted.

**Example 3 — Conical tank draining**  
*Given:* Water drains from an inverted cone (height 4 m, base radius 1.5 m) at 0.2 m³/min; depth is currently 2 m.  
*Find:* Rate at which surface level drops.  

Volume: \(V=\frac{1}{3}\pi r^2 h\). Similar triangles give \(r=\frac{3}{8}h\).  
Substitute: \(V=\frac{3}{64}\pi h^3\).  
Differentiate: \(\frac{dV}{dt}=\frac{9}{64}\pi h^2\frac{dh}{dt}\).  
Solve and substitute: \(\frac{dh}{dt}=\frac{0.2}{\frac{9}{64}\pi(2)^2}\approx-0.377\) m/min.  
**Final answer: \(-0.377\) m/min**  
*Reflection:* The similar-triangles step is the hidden constraint that must be written before differentiation.

**Example 4 — Two ships leaving port**  
*Given:* Ship A sails east at 15 km/h; Ship B sails north at 20 km/h; at \(t=0\) both leave the same port.  
*Find:* Rate at which distance between them increases after 2 h.  

Distance: \(s^2=(15t)^2+(20t)^2\).  
Differentiate: \(2s\frac{ds}{dt}=2(15t)(15)+2(20t)(20)\).  
At \(t=2\): \(s=50\), \(\frac{ds}{dt}=\frac{1250}{50}=25\) km/h.  
**Final answer: 25 km/h**  
*Reflection:* The Pythagorean relation is time-dependent yet still yields an algebraic identity after differentiation.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Substituting numbers before isolating the target rate | Anxiety to “plug in” early                  | Keep every symbol symbolic until the last line |
| Forgetting the chain-rule factor \(\frac{dx}{dt}\) | Treating variables as constants             | Write every variable as \(x(t)\) before differentiating |
| Losing the sign of a rate         | Interpreting “how fast” as absolute value   | Always carry the algebraic sign and state its physical meaning |
| Using an incorrect geometric constraint | Misreading similar triangles or Pythagoras  | Draw a labelled diagram before writing any equation |
| Differentiating with respect to the wrong variable | Habit of differentiating only w.r.t. \(x\)  | Explicitly replace \(\frac{d}{dx}\) by \(\frac{d}{dt}\) |
| Ignoring units until the end      | Focus on algebra alone                      | Attach units to every intermediate quantity  |
| Solving for the wrong rate        | Misreading the question                     | Circle the symbol you must find before starting |

## 7. The textbook-precise statement

Let \(F:\mathbb{R}^n\to\mathbb{R}\) be continuously differentiable in an open set containing the image of a differentiable curve \(\mathbf{x}:I\to\mathbb{R}^n\). Suppose \(F(\mathbf{x}(t))=0\) for all \(t\in I\). Then
\[
\nabla F(\mathbf{x}(t))\cdot\mathbf{x}'(t)=0\quad\text{for all }t\in I.
\]
(See Stewart, *Calculus*, 9e, §3.4, Theorem 3.)

## 8. Visual — diagram or schematic

```
Wall
 |
 |   y(t) (top of ladder)
 |   ↑
 |   |
 |   | 5 m ladder
 |   |
 |   ↓
 |_______________ x(t) (bottom slides away)
     ground
```
At any instant the point (x(t),y(t)) lies on the quarter-circle \(x^2+y^2=25\). Differentiating that equation supplies the relation between \(\dot x\) and \(\dot y\).

## 9. The memory technique

**The hook** — Picture two trains leaving a junction; the distance between them is the hypotenuse of a right triangle whose legs lengthen at constant speeds. The instant you imagine the right angle “breathing,” you remember that the differentiated Pythagorean theorem is the only equation you need.

**What to overlearn**  
- The differentiated chain-rule identity \(\frac{d}{dt}F(\mathbf{x}(t))=\nabla F\cdot\mathbf{x}'\).  
- The instruction “never substitute numbers until the target rate is isolated.”

**Spaced-repetition schedule** — Review the balloon example after 1 day, the ladder after 3 days, the conical tank after 7 days, the two-ship problem after 16 days, and the full theorem statement after 35 days.

**First-principles fallback** — If you forget the formula, redraw the static constraint, label every length or volume as a function of \(t\), differentiate term by term with the chain rule, and solve.

## 10. What this unlocks

Related rates is the gateway to all later implicit-differentiation techniques in multivariable calculus and to the linearisation step in differential-equation modelling.

- Linear approximation and differentials  
- Parametric equations and arc-length derivatives  
- Lagrange multipliers (via the same gradient identity)  
- First-order autonomous ODEs written in rate form  

## 11. Self-check — five questions, no answers

1. A cube’s edge increases at 2 cm/s. At what rate does its volume change when the edge is 5 cm?  
2. A particle moves along the curve \(y=x^3\). Both \(x\) and \(y\) are functions of time. Write the relation between \(\frac{dy}{dt}\) and \(\frac{dx}{dt}\) when \(x=2\).  
3. Two cars leave an intersection at the same instant; one travels north at 60 km/h, the other east at 80 km/h. After how many hours is the distance between them increasing at 100 km/h?  
4. In the ladder problem, explain why a negative answer for \(\frac{dy}{dt}\) is physically required even though “how fast” sounds positive.  
5. A student differentiates \(V=\frac{4}{3}\pi r^3\) and obtains \(\frac{dV}{dt}=4\pi r^2\). Identify the missing factor and the conceptual error that produced it.