## 1. The one-sentence answer
**Projectile motion separates into two independent one-dimensional motions because gravity acts only vertically and produces no horizontal acceleration.**

Horizontal velocity therefore remains constant while vertical motion follows the same constant-acceleration rules as free fall; the two share only the parameter of time. This independence follows directly from the vector character of Newton’s second law: the net force has a single nonzero component, so the acceleration vector has only a vertical entry. Consequently, the position vector at any instant is assembled by solving the horizontal and vertical kinematic equations separately and then recombining them at the same value of t.

The trajectory that results is a parabola in the absence of air resistance. Range, maximum height, and time of flight are obtained by imposing the boundary conditions that vertical displacement is zero at launch and landing.

> [!NOTE]
> The single most important insight is that time is the only bridge between the axes; once t is known from the vertical equation, it is substituted unchanged into the horizontal equation.

## 2. Why this matters — concrete and current
SpaceX recovers Falcon 9 first stages by steering them through a precisely timed entry burn whose horizontal velocity must be bled off while the vehicle still obeys the same decoupled equations; any miscalculation of flight time from the vertical dynamics immediately produces a range error that the grid fins cannot correct.  

Artillery and guided munitions used by modern forces rely on the same independence to compute impact points from radar-measured muzzle velocity and elevation; the U.S. Army’s Excalibur round applies GPS corrections only to the vertical plane because the horizontal velocity decays negligibly over the short flight.  

In semiconductor manufacturing, ion implanters accelerate dopant ions in a vacuum and then deflect them electrostatically; the vertical gravitational deflection over the 1–2 m drift space is calculated with the identical kinematic separation to maintain sub-nanometer placement accuracy on the wafer.  

ESA’s Juice mission to Jupiter uses gravity-assist flybys whose incoming and outgoing hyperbolic trajectories are stitched together by treating the spacecraft’s velocity vector as constant in the planetocentric horizontal frame while the vertical component is altered by the planet’s gravity; mission designers therefore solve the decoupled equations to set the precise aim point for each encounter.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector decomposition     | Acceleration and velocity must be resolved into orthogonal components whose cross terms vanish. |
| Kinematic equations for constant acceleration | Horizontal acceleration is zero; vertical acceleration is constant, so the standard suite of equations applies separately. |
| Newton’s second law in vector form | Establishes that \(\mathbf{a} = \mathbf{F}/m\) has only a vertical entry when drag is neglected. |
| Definition of time as a scalar parameter | Time is shared between the two axes and is the sole coupling variable. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Separate the force into components
Gravity pulls straight down; no horizontal force exists when air resistance is ignored.  
A cannonball fired at 50 m/s and 30° therefore experiences only the weight mg downward.  
The acceleration vector is therefore  
\[
\mathbf{a} = (0, -g).
\]

> [!WARNING]
> Treating any small horizontal force (e.g., wind) as negligible without checking its magnitude relative to the flight time will produce cumulative range error.

### Step 2 — Write the horizontal kinematic equation
With \(a_x = 0\), velocity \(v_x\) is constant and equal to its initial value.  
Position is therefore linear in time:  
\[
x(t) = x_0 + v_{x0}\, t.
\]

### Step 3 — Write the vertical kinematic equation
Acceleration \(a_y = -g\) yields the familiar free-fall set:  
\[
v_y(t) = v_{y0} - g t, \qquad
y(t) = y_0 + v_{y0}\, t - \frac12 g t^2.
\]

### Step 4 — Enforce simultaneity through shared time
Both coordinate equations must be evaluated at the identical instant t.  
This single shared parameter is what permits later elimination of t to obtain the trajectory equation.

### Step 5 — Eliminate t to obtain the trajectory
Solve the horizontal equation for t and substitute into the vertical equation:  
\[
t = \frac{x - x_0}{v_{x0}}, \qquad
y = y_0 + \left(\frac{v_{y0}}{v_{x0}}\right)(x - x_0) - \frac{g}{2 v_{x0}^2}(x - x_0)^2.
\]
The result is quadratic in x, hence parabolic.

### Step 6 — Apply landing boundary condition for range
Set y = 0 at launch and landing (level ground) and solve the resulting quadratic for the nonzero root of x; the range formula follows:  
\[
R = \frac{v_0^2 \sin 2\theta}{g}.
\]

### Step 7 — State the independence theorem
The horizontal and vertical motions are dynamically independent; their only interaction is the common clock t. All subsequent projectile results are algebraic consequences of this separation.

## 5. Worked examples — every step shown

**Example 1 — Level-ground range**  
*Given:* \(v_0 = 20\) m/s, \(\theta = 45^\circ\), \(g = 9.8\) m/s².  
*Find:* horizontal range R.  

Horizontal component:  
\[
v_{x0} = 20 \cos 45^\circ = 10\sqrt{2}\ \text{m/s}.
\]  
*Why:* cosine projects the initial speed onto the x-axis.  

Vertical component:  
\[
v_{y0} = 20 \sin 45^\circ = 10\sqrt{2}\ \text{m/s}.
\]  
*Why:* sine projects onto the y-axis.  

Time of flight from y = 0:  
\[
0 = (10\sqrt{2})t - \frac12(9.8)t^2 \implies t(10\sqrt{2} - 4.9 t) = 0.
\]  
*Why:* quadratic formula applied to vertical displacement equation; discard t = 0.  

Substitute t into x:  
\[
R = (10\sqrt{2})\times\frac{2\times10\sqrt{2}}{9.8} = 40.8\ \text{m}.
\]  
**40.8 m**

*Reflection:* The 45° angle maximizes range because \(\sin 2\theta\) peaks at unity; the algebra is identical for any angle.

**Example 2 — Time to reach maximum height**  
*Given:* same launch conditions.  
*Find:* time at which \(v_y = 0\).  

Set \(v_y = 0\):  
\[
0 = 10\sqrt{2} - 9.8 t \implies t = \frac{10\sqrt{2}}{9.8} \approx 1.44\ \text{s}.
\]  
*Why:* vertical velocity changes only under constant g.  

**1.44 s**

*Reflection:* Horizontal velocity is irrelevant for this instant; independence lets us ignore x entirely.

**Example 3 — Impact velocity on a cliff**  
*Given:* launched horizontally from 30 m cliff with \(v_{x0} = 15\) m/s.  
*Find:* speed upon hitting ground.  

Vertical displacement:  
\[
-30 = 0 - \frac12(9.8)t^2 \implies t = \sqrt{\frac{60}{9.8}} \approx 2.47\ \text{s}.
\]  
*Why:* initial vertical velocity is zero; solve for t first.  

Vertical impact speed:  
\[
v_y = -9.8\times2.47 \approx -24.2\ \text{m/s}.
\]  
Horizontal speed unchanged: 15 m/s.  

Magnitude:  
\[
v = \sqrt{15^2 + (-24.2)^2} \approx 28.5\ \text{m/s}.
\]  
**28.5 m/s**

*Reflection:* The Pythagorean combination is valid only because the velocity components remain orthogonal.

**Example 4 — Angled launch from elevation**  
*Given:* \(v_0 = 30\) m/s at 30° from a 10 m platform.  
*Find:* horizontal distance to landing.  

Write y(t) = 0:  
\[
0 = 10 + (30\sin 30^\circ)t - \frac12(9.8)t^2.
\]  
Solve quadratic:  
\[
t = \frac{-15 + \sqrt{225 + 196}}{-9.8} \quad (\text{positive root})\approx 3.92\ \text{s}.
\]  
*Why:* full quadratic formula required because launch height is nonzero.  

Horizontal distance:  
\[
x = (30\cos 30^\circ)\times3.92 \approx 101.5\ \text{m}.
\]  
**101.5 m**

*Reflection:* The extra height term forces the quadratic; independence still supplies the shared t.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using the same angle for both components | Students treat \(\theta\) as applying to velocity magnitude rather than resolving via sine and cosine | Always write \(v_{x0}=v_0\cos\theta\), \(v_{y0}=v_0\sin\theta\) explicitly. |
| Forgetting that time of flight is determined solely by vertical motion | Horizontal constancy feels “simpler,” so attention drifts to x | Solve vertical equation for t first, then substitute. |
| Applying range formula on sloped ground | Formula \(R=v_0^2\sin2\theta/g\) assumes y=0 at both ends | Derive the quadratic landing condition for each geometry. |
| Treating g as acting on the trajectory path rather than vertically | Visualization of the parabola suggests a curved force | Remember \(\mathbf{a}=(0,-g)\) at every instant. |
| Neglecting the sign of \(v_{y0}\) when launch is downward | Sign error appears only after substitution | Adopt a consistent coordinate system before writing equations. |
| Assuming horizontal velocity changes because speed changes | Speed is scalar; only vertical component changes | Track vector components separately. |
| Using average velocity for vertical motion when acceleration is present | Intuition from constant-velocity cases carries over | Use the full kinematic equation containing \(\frac12 at^2\). |

## 7. The textbook-precise statement
In the absence of aerodynamic drag the acceleration of a projectile is \(\mathbf{a} = -g\,\hat{\jmath}\). Consequently the velocity and position vectors are  
\[
\mathbf{v}(t) = v_{x0}\,\hat{\imath} + (v_{y0}-gt)\,\hat{\jmath},
\]  
\[
\mathbf{r}(t) = (x_0+v_{x0}t)\,\hat{\imath} + \Bigl(y_0+v_{y0}t-\frac12gt^2\Bigr)\,\hat{\jmath}.
\]  
The trajectory \(y(x)\) obtained by eliminating t is a parabola. (Taylor, *Classical Mechanics*, 1e, §2.3.)

## 8. Visual — diagram or schematic
```text
y ↑
  |          •  (apex)
  |         / \
  |        /   \
  | launch/     \  landing
  |     •--------•--------→ x
  |    /          \
  |   /            \
  +--+------------------------→
     0          R
v_x constant →, v_y decreases linearly
```

Axes origin at launch point; x horizontal, y vertical upward; parabolic arc labelled with constant horizontal arrows and successively shorter vertical arrows.

## 9. The memory technique
1. **The hook** — Picture two trains leaving the same station at the same second: one travels horizontally at constant speed, the other rises and falls under gravity; they meet again only because their departure clocks were synchronized.  
2. **What to overlearn** — \(v_x = v_0\cos\theta\) (constant), \(y(t)=v_{y0}t-\frac12gt^2\), range \(R=v_0^2\sin2\theta/g\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Restart from \(\mathbf{a}=(0,-g)\), integrate twice with respect to t, and re-apply boundary conditions.

## 10. What this unlocks
Projectile-motion independence is the gateway to orbital mechanics, where the same separation appears in the two-body problem under an inverse-square central force.  

- Parabolic, elliptic, and hyperbolic trajectories  
- Kepler’s laws derived from Newton’s gravity  
- Rocket staging and gravity-turn trajectories  
- Perturbation methods for atmospheric entry  

## 11. Self-check — five questions, no answers
1. A ball is thrown horizontally from a height h with speed v. Derive the horizontal distance travelled before it strikes the ground.  
2. At what launch angle is the range on level ground equal to the maximum height reached?  
3. A projectile is launched with velocity \(\mathbf{v}_0\) from a point on an inclined plane of angle β. Write the condition that determines the time of flight.  
4. Why does a headwind (constant horizontal force opposite to v_x) destroy the clean parabolic shape while a steady crosswind does not?  
5. Two projectiles are fired with identical speeds but angles θ and 90°−θ. Show that their ranges are equal and that the times of flight differ by a factor involving tan θ.