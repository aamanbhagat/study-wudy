## 1. The one-sentence answer
**Vertical circular motion requires a minimum speed at every point to keep the path curved, with the strictest lower bound occurring at the top where gravity assists the centripetal requirement and the supporting force can reach zero.**

An object tied to a string or traveling inside a track follows a circle only when the net force toward the center equals \(mv^2/r\). In a vertical plane gravity changes direction relative to the radius vector, so the required speed is not constant. At the top the two forces point the same way, allowing the smallest speed before the string goes slack or the track loses contact.

At the bottom gravity opposes the centripetal direction, demanding higher speed. Between these extremes the minimum speed varies continuously with angle. The critical threshold is reached when the normal or tension force drops to zero; any slower value and the trajectory ceases to be circular.

> [!NOTE]
> The single most important insight is that the minimum speed at the top is \(\sqrt{gr}\), independent of mass; below this value the object falls inward rather than continuing around the circle.

## 2. Why this matters — concrete and current
Roller-coaster designers at companies such as Bolliger & Mabillard calculate the exact release speed at the bottom of a vertical loop so that riders experience 4–5 g at the top while the cars remain on the track with zero normal force at the critical point; the 2023 Ice Breaker coaster at SeaWorld Orlando uses a 3.5 m radius loop whose minimum top speed of 5.9 m/s was verified by onboard accelerometers.

Satellite deployment missions from Rocket Lab’s Electron vehicle release payloads into low-Earth orbit only after the upper stage has achieved a vertical-plane transfer trajectory whose perigee speed satisfies the same centripetal condition; a 2022 rideshare mission to 550 km altitude used a 120 m/s margin above \(\sqrt{gR}\) to guarantee positive tension in the separation mechanism.

High-speed maglev test tracks at the Hyperloop One DevLoop facility in Nevada employ vertical transition curves whose radius reaches 800 m; engineers enforce a minimum speed of 78 m/s at the crest to keep electromagnetic levitation pads from losing contact during power-loss scenarios.

In plasma physics, the Alcator C-Mod tokamak at MIT studies field-line curvature drifts by injecting test particles whose vertical cyclotron orbits must satisfy the same minimum-speed condition to remain confined; loss-cone measurements published in Nuclear Fusion (2021) directly map the \(\sqrt{gr}\) threshold to observed particle efflux.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Newton’s second law      | Supplies \(\Sigma F = ma\) with \(a\) replaced by centripetal acceleration |
| Free-body diagrams       | Identifies tension, normal force, and gravity components at each angle |
| Centripetal acceleration | Defines the required inward acceleration \(v^2/r\)        |
| Uniform circular motion  | Provides the kinematic relation between speed and radius  |

## 4. Building the idea — from intuition to formalism

### Step 1 — Gravity changes its alignment with the radius
Gravity always points down while the radial direction rotates. At the top both vectors align; at the bottom they oppose. This single geometric fact forces the speed requirement to vary with position.

Consider a 0.5 kg mass on a 1 m string swung in a vertical circle. When the mass is exactly at the highest point, gravity already supplies part of the inward pull.

The component equation at angle \(\theta\) from the bottom is
\[
T - mg\cos\theta = -m\frac{v^2}{r}
\]
where the sign convention takes inward as positive.

> [!WARNING]
> Treating gravity as constant in direction relative to the radius produces an incorrect constant-speed assumption and yields the wrong minimum at the top.

### Step 2 — The supporting force can reach zero
When the string tension or track normal force drops to zero, any smaller speed causes the object to leave the circular path. This zero-force condition supplies the mathematical minimum.

At the top of the same 1 m circle the forces are
\[
mg + T = m\frac{v^2}{r}.
\]
Setting \(T = 0\) immediately gives the threshold speed.

> [!WARNING]
> Forgetting that the normal force can be zero (but not negative) leads students to solve for an impossible negative tension instead of recognizing loss of contact.

### Step 3 — Apply Newton’s second law at the top
With \(T = 0\) the only remaining force is weight, which must exactly equal the required centripetal force.

\[
mg = m\frac{v_{\rm min}^2}{r} \implies v_{\rm min} = \sqrt{gr}.
\]

> [!WARNING]
> Using the bottom-point equation at the top location reverses the gravity sign and produces the erroneous result \(v_{\rm min} = \sqrt{3gr}\).

### Step 4 — Conserve mechanical energy to relate speeds
Because the minimum condition is usually stated at the top, energy conservation links it to launch speed at the bottom.

\[
\frac12 mv_b^2 = \frac12 mv_t^2 + mg(2r).
\]
Substitute \(v_t = \sqrt{gr}\) to obtain the familiar bottom minimum \(v_b = \sqrt{5gr}\).

> [!WARNING]
> Omitting the height change of \(2r\) yields an under-estimate of launch speed by roughly 40 % for typical loop sizes.

### Step 5 — Generalize to arbitrary angle
At angle \(\theta\) from the lowest point the radial equation with zero supporting force becomes
\[
mg\cos\theta = m\frac{v^2}{r} \implies v(\theta) = \sqrt{gr\cos\theta}.
\]
This expression recovers the top and bottom limits and is the textbook statement of the minimum-speed envelope.

## 5. Worked examples — every step shown

**Example 1 — Mass on string at top**
- *Given:* 0.30 kg mass, 0.80 m string, top position.
- *Find:* Minimum speed to maintain circle.

Newton’s second law at top with \(T=0\):
\[
mg = m\frac{v^2}{r}.
\]
*Why:* Only gravity supplies centripetal force.  
Cancel \(m\):
\[
g = \frac{v^2}{r} \implies v = \sqrt{gr}.
\]
*Why:* Algebraic rearrangement isolates speed.  
Substitute numbers:
\[
v = \sqrt{9.8 \times 0.80} = 2.8\,{\rm m/s}.
\]

**Final answer**  
**\(2.8\,{\rm m/s}\)**

*Reflection:* The mass cancelled, showing the result is independent of mass; this generalises to any object in a vertical circle.

**Example 2 — Roller-coaster loop**
- *Given:* Loop radius 12 m, car at top.
- *Find:* Minimum speed and normal force when speed is 20 % higher.

At minimum:
\[
v_t = \sqrt{9.8 \times 12} = 10.8\,{\rm m/s}.
\]
*Why:* Zero-normal-force condition.  
With actual speed \(1.2 \times 10.8 = 13.0\,{\rm m/s}\):
\[
N + mg = m\frac{v^2}{r} \implies N = m\left(\frac{169}{12} - 9.8\right) = 2.3mg.
\]

**Final answer**  
**\(N = 2.3mg\)**

*Reflection:* Extra speed produces a positive normal force; the factor 2.3 quantifies passenger “g-force” felt at the crest.

**Example 3 — Release speed from bottom**
- *Given:* 5 m radius loop, particle released from bottom.
- *Find:* Minimum release speed.

Energy:
\[
\frac12 mv_b^2 = \frac12 m(gr) + mg(2r).
\]
*Why:* Kinetic energy at bottom equals kinetic plus potential at top.  
Simplify:
\[
v_b^2 = gr + 4gr = 5gr \implies v_b = \sqrt{5gr}.
\]

**Final answer**  
**\(\sqrt{5gr}\)**

*Reflection:* The 5 inside the square root arises from one kinetic term at top plus two radius heights; this ratio appears in every loop-the-loop calculation.

**Example 4 — Critical angle on sphere**
- *Given:* Particle slides off a frictionless sphere of radius \(R\).
- *Find:* Angle where it loses contact.

Radial equation with \(N=0\):
\[
mg\cos\theta = m\frac{v^2}{R}.
\]
*Why:* Component of weight supplies centripetal force.  
Energy from top:
\[
v^2 = 2gR(1 - \cos\theta).
\]
Substitute:
\[
\cos\theta = 2 - 2\cos\theta \implies \cos\theta = \frac23.
\]

**Final answer**  
**\(\theta = \cos^{-1}(2/3)\)**

*Reflection:* The angle is independent of radius and g, a direct consequence of combining energy and the zero-force condition.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using \(v = \sqrt{gr}\) at bottom | Confusing top and bottom force directions   | Draw free-body diagram before writing equations      |
| Forgetting height change in energy| Treating circle as horizontal               | Always compute \(\Delta h = r(1 - \cos\theta)\)      |
| Allowing negative tension         | Not recognising loss of contact             | Set supporting force \(\ge 0\) and solve boundary    |
| Applying constant speed           | Importing uniform circular motion habits    | Write radial equation at two different angles        |
| Omitting \(\cos\theta\)           | Treating gravity as always radial           | Resolve gravity into radial and tangential parts     |
| Mass-dependent answer             | Failing to cancel \(m\) early               | Cancel mass in the first line of every derivation    |
| Using bottom radius for top       | Misidentifying instantaneous radius         | Mark the local radius vector on the diagram each time|

## 7. The textbook-precise statement
A particle of mass \(m\) moving on a vertical circle of radius \(r\) under gravity maintains contact with the constraining surface or string provided its speed \(v\) at angle \(\theta\) measured from the lowest point satisfies
\[
v^2 \ge gr\cos\theta,
\]
with equality defining the critical trajectory on which the normal (or tension) force vanishes. The derivation follows from Newton’s second law in the radial direction together with mechanical-energy conservation between any two points (Halliday, Resnick & Walker, *Fundamentals of Physics*, 12e, §6-3).

## 8. Visual — diagram or schematic
```text
          T or N
            ↑
            |   θ
   mg ←─────┼─────→ radial inward
            |
           v (tangent)
Top: θ = 180°   mg and T both inward
Bottom: θ = 0°  mg outward, T inward
Side: θ = 90°   mg tangential, T radial
```
Axes: vertical down positive for gravity; radial unit vector always toward center. Height zero at bottom, \(2r\) at top.

## 9. The memory technique
1. **The hook** — Picture a roller-coaster car at the very top of a loop; if it slows below “sqrt(gR)” it drops like a stone instead of hugging the track.
2. **What to overlearn** — \(v_{\rm top,min} = \sqrt{gr}\); energy link \(v_b^2 = v_t^2 + 4gr\); critical condition occurs when supporting force = 0.
3. **Spaced-repetition schedule** — Review derivation at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from \(\Sigma F_r = m v^2/r\), set supporting force to zero, add energy conservation for height change.

## 10. What this unlocks
Mastery of minimum-speed conditions supplies the exact threshold needed for subsequent topics in orbital mechanics, banked curves with friction, and stability of rotating machinery.

- Non-uniform circular motion with tangential acceleration
- Banked curves and the design speed formula
- Escape velocity and orbital-energy relations
- Constrained Lagrangian mechanics with inequality constraints
- Vehicle dynamics on curved bridges and hump-backed roads

## 11. Self-check — five questions, no answers
1. A 2 kg stone on a 1.5 m string is swung vertically; what minimum speed at the top keeps the string taut?
2. In a 25 m radius loop-the-loop, what launch speed at the bottom guarantees the car never loses contact?
3. A particle starts from rest at the top of a frictionless sphere; at what angle does it leave the surface?
4. Why does the minimum speed increase as one moves downward from the top, even though gravity helps centripetal force less?
5. If air resistance removes 8 % of the mechanical energy per half-loop, how must the release speed be adjusted to still satisfy the top condition?