## 1. The one-sentence answer
**Projectile motion is two-dimensional motion under constant gravitational acceleration where the horizontal and vertical velocity components evolve completely independently.**

Horizontal motion has zero acceleration, so velocity stays constant; vertical motion has acceleration \(-g\), so it follows the usual kinematic equations for free fall. Because acceleration due to gravity acts only along the vertical axis and no horizontal force exists (neglecting air drag), the two directions never mix inside the equations of motion. This separation lets you solve each component with one-dimensional kinematics and then recombine the results at any time \(t\).

The trajectory that emerges is a parabola because the horizontal position grows linearly with time while the vertical position grows quadratically.

> [!NOTE]
> The single most important insight is that **time is the common variable** linking the two axes; once you express both \(x\) and \(y\) in terms of the same \(t\), eliminating \(t\) automatically yields the parabolic path equation without any cross terms.

## 2. Why this matters — concrete and current
SpaceX recovers Falcon 9 first-stage boosters by steering them through a controlled projectile-like descent; the guidance algorithms treat horizontal velocity as constant (until grid-fin corrections) while vertical velocity is continuously adjusted by engine burns, exactly exploiting the independence you will derive.

Artillery and guided-munition systems such as the U.S. Army’s Excalibur round solve the same two-component equations in real time to hit targets 40 km away; any error in separating horizontal and vertical drag models immediately produces range misses of hundreds of metres.

In cricket, the Hawk-Eye ball-tracking system reconstructs the post-bounce trajectory of a delivery by fitting independent horizontal (constant) and vertical (decelerating) components to high-speed camera data; the same separation is used by VAR systems in football for free-kick trajectory predictions.

ESA’s JUICE mission performed a lunar gravity-assist flyby in 2024 whose incoming and outgoing asymptotes were calculated by treating the spacecraft’s hyperbolic path as a projectile segment under lunar gravity, again separating radial and tangential velocity components.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector components        | Resolve initial velocity into \(v_{0x}\) and \(v_{0y}\)   |
| One-dimensional kinematic equations | Apply them separately to each axis                        |
| Acceleration due to gravity \(g\) | Know it acts only vertically and is constant              |
| Independence of perpendicular accelerations | Justifies writing two separate sets of equations          |

If any row above is unfamiliar, pause and review the parent topic “Vectors & One-Dimensional Kinematics” first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Separate the coordinate axes
Aap already know that gravity pulls only downward. Therefore the net force (and hence acceleration) has a zero horizontal component.  
Concrete example: a ball thrown sideways from a cliff has the same horizontal speed at launch and just before splashdown.  
Formal statement: \(\vec{a} = (0, -g)\).  
> [!WARNING]  
> If you accidentally insert a horizontal acceleration term, the entire trajectory equation collapses and range predictions become wrong by tens of percent.

### Step 2 — Write independent velocity equations
Because \(a_x = 0\), \(v_x\) is constant.  
Because \(a_y = -g\), \(v_y\) changes linearly with time.  
\[
v_x(t) = v_{0x}, \qquad v_y(t) = v_{0y} - gt
\]

### Step 3 — Integrate to obtain position equations
Integrate each velocity once with respect to time, applying initial conditions \(x(0)=0\), \(y(0)=0\):
\[
x(t) = v_{0x}\, t, \qquad y(t) = v_{0y}\, t - \frac12 g t^2
\]

### Step 4 — Eliminate time to obtain trajectory equation
Solve the first equation for \(t = x/v_{0x}\) and substitute into the second:
\[
y = x\tan\theta_0 - \frac{g x^2}{2 v_0^2 \cos^2\theta_0}
\]
This is the classic parabolic trajectory; the \(\theta_0\) form follows from \(v_{0x}=v_0\cos\theta_0\), \(v_{0y}=v_0\sin\theta_0\).

### Step 5 — Derive time of flight, range and maximum height
Set \(y=0\) again to find total flight time \(T = 2v_{0y}/g\).  
Horizontal range \(R = v_{0x}T = v_0^2\sin 2\theta_0/g\).  
Maximum height occurs when \(v_y=0\), giving \(H = v_{0y}^2/(2g)\).

## 5. Worked examples — har step show karo

**Example 1 — Basic horizontal launch**  
*Given:* Ball rolled off a 20 m table with \(v_{0x}=5\) m/s, \(v_{0y}=0\).  
*Find:* Time to hit ground and horizontal distance.  
\(y(t) = 0 - \frac12 g t^2 = -20\)  
\(t = \sqrt{40/g} \approx 2.02\) s  
\(x = 5 \times 2.02 = 10.1\) m  
*Why:* We used only the vertical equation because horizontal velocity never changes.  
**Final answer:** 2.02 s, 10.1 m

*Reflection:* The numbers are small enough that rounding errors stay visible; always keep an extra digit until the last step.

**Example 2 — Angled launch, find range**  
*Given:* \(v_0 = 20\) m/s at \(\theta_0 = 30^\circ\).  
*Find:* Range on level ground.  
\(R = \frac{v_0^2 \sin 60^\circ}{g} = \frac{400 \times \sqrt{3}/2}{9.8} \approx 35.3\) m  
*Why:* We used the double-angle identity directly from the derived formula.  
**Final answer:** 35.3 m

*Reflection:* The 30°–60° pair always yields the same range; memorise the identity once.

**Example 3 — Maximum height and time to apex**  
*Given:* Same launch as Example 2.  
*Find:* Peak height.  
\(v_{0y} = 10\) m/s, \(H = 10^2/(2g) = 5.10\) m  
*Why:* At apex \(v_y = 0\), so only the vertical kinematic equation is required.  
**Final answer:** 5.10 m at \(t = 1.02\) s

*Reflection:* Height depends only on the vertical component; horizontal speed is irrelevant here.

**Example 4 — Landing on a slope**  
*Given:* Same launch, landing surface \(y = -x\tan 20^\circ\).  
*Find:* Range along slope.  
Substitute trajectory equation into slope line and solve quadratic in \(x\); positive root gives \(x \approx 28.7\) m.  
*Why:* We still used the same two independent position equations; only the boundary condition changed.  
**Final answer:** 28.7 m along slope

*Reflection:* Changing the landing surface only alters the final algebraic condition, never the underlying independence.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using \(g\) for both axes         | Forgetting gravity has direction            | Write \(\vec{a}=(0,-g)\) explicitly each time|
| Taking \(t\) from horizontal only | Treating time as axis-dependent             | Always solve vertical for flight time first  |
| Forgetting \(\cos^2\theta\) term  | Memorising range formula without derivation | Re-derive trajectory equation before each test|
| Mixing \(v_0\) and \(v_{0x}\)     | Notation confusion                          | Label every velocity with its subscript      |
| Ignoring quadratic nature         | Solving linear equations only               | Keep the \(t^2\) term visible until substitution|
| Sign error in \(g\)               | Treating downward as positive               | Fix coordinate system once and stay consistent|

## 7. The textbook-precise statement
In the absence of air resistance, the position of a projectile launched at \(t=0\) from the origin with initial velocity \(\vec{v}_0 = v_0\cos\theta_0\,\hat{i} + v_0\sin\theta_0\,\hat{j}\) under constant gravitational acceleration \(\vec{g} = -g\,\hat{j}\) is given by
\[
\vec{r}(t) = (v_0\cos\theta_0)\,t\,\hat{i} + \Bigl[(v_0\sin\theta_0)\,t - \tfrac12 g t^2\Bigr]\hat{j}.
\]
The trajectory equation obtained by eliminating \(t\) is
\[
y = x\tan\theta_0 - \frac{g x^2}{2 v_0^2\cos^2\theta_0},
\]
valid for \(0\le\theta_0\le\pi/2\) and \(g>0\). (Halliday, Resnick & Walker, *Fundamentals of Physics*, 12e, §4-3.)

## 8. Visual — diagram or schematic
```
          y ↑
            |   peak
            |  /\
            | /  \   trajectory
            |/    \
------------+-------> x
   launch   |        landing
   v0 at θ  |        point
```
Horizontal axis labelled \(x\), vertical axis labelled \(y\). Launch velocity vector drawn at angle \(\theta_0\) to \(x\)-axis; velocity arrows shown horizontal at every point and vertical arrows decreasing linearly with height.

## 9. The memory technique
1. **The hook** — Picture a marble rolling across a frictionless table while another marble drops straight down from the same height at the same instant; both hit the floor at the same moment because their vertical clocks are identical.
2. **What to overlearn** — \(x = v_{0x}t\), \(y = v_{0y}t - \frac12 g t^2\), and \(R = v_0^2\sin 2\theta_0/g\).
3. **Spaced-repetition schedule** — Review the three equations after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from \(\vec{a}=(0,-g)\), integrate twice, then eliminate \(t\).

## 10. What this unlocks
You can now analyse satellite deployment trajectories, analyse the motion of charged particles in uniform electric fields (replace \(g\) by \(qE/m\)), and move directly into orbital mechanics where the same separation appears in the two-body problem under inverse-square gravity.

- Two-dimensional elastic collisions  
- Relative motion in non-inertial frames  
- Rocket equation with gravity turn  
- Numerical integration of trajectories in variable gravity

## 11. Self-check — five questions, no answers
1. A ball is thrown horizontally at 8 m/s from 45 m height. How far from the base does it land?  
2. At what angle should a projectile be launched so that its range equals its maximum height?  
3. Derive the time of flight on an inclined plane of angle \(\beta\) when launched up the plane.  
4. A projectile’s speed at maximum height is half its launch speed. Find the launch angle.  
5. If air resistance proportional to velocity is added, which of the two components remains exactly solvable by elementary functions?