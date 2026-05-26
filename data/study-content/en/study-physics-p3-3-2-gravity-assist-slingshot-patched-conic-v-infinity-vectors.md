## 1. The one-sentence answer
**A gravity assist is a patched-conic maneuver in which a spacecraft’s heliocentric velocity is altered by the vector rotation of its planetocentric hyperbolic excess velocity \(\mathbf{v}_\infty\) during an unpowered flyby.**

In the patched-conic model the solar system is divided into non-overlapping spheres of influence. Inside a planet’s sphere the spacecraft follows a hyperbola whose asymptotes are fixed by the incoming and outgoing \(\mathbf{v}_\infty\) vectors; outside that sphere the spacecraft follows a heliocentric ellipse or hyperbola governed by the Sun alone. The planet’s orbital velocity simply adds to or subtracts from the rotated \(\mathbf{v}_\infty\), producing a net change in heliocentric speed without propellant expenditure.

The direction of \(\mathbf{v}_\infty\) can be rotated by any angle up to the maximum scattering angle permitted by the impact parameter and the planet’s gravitational parameter; the magnitude remains constant because the flyby is conservative. Consequently the heliocentric velocity after the encounter lies on a circle of radius \(|\mathbf{v}_\infty|\) centered on the planet’s velocity vector.

> [!NOTE]
> The spacecraft never gains energy from the planet itself; it steals a minute fraction of the planet’s orbital angular momentum around the Sun, an exchange that is imperceptible to the planet but decisive for the massless probe.

## 2. Why this matters — concrete and current
NASA’s Voyager 1 and 2 missions used successive gravity assists at Jupiter and Saturn to reach escape speed from the solar system; without those assists the launch vehicles of the 1970s could not have supplied the required \(\Delta v\).

SpaceX’s Interplanetary Transport System studies and ESA’s JUICE mission both baseline multiple Venus–Earth–Mars gravity-assist sequences to reduce launch mass and flight time to the outer planets; each sequence is optimized with \(v_\infty\) vector diagrams before any numerical integration is performed.

The Parker Solar Probe executed seven Venus gravity assists between 2018 and 2025 to lower perihelion from 35 to under 10 solar radii; mission designers published the exact \(v_\infty\) rotation angles required at each encounter in the 2017 JHU/APL trajectory report.

Cometary science benefits as well: ESA’s Rosetta spacecraft performed Earth and Mars assists to match the orbit of 67P/Churyumov–Gerasimenko, demonstrating that \(v_\infty\) matching also works for rendezvous rather than simple fly-through trajectories.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| Two-body conic sections        | The flyby trajectory inside the sphere of influence is a hyperbola; its asymptotes define \(\mathbf{v}_\infty\). |
| Sphere of influence (SOI)      | Defines the mathematical boundary at which the central body is switched from Sun to planet and back. |
| Vector addition in inertial frames | Heliocentric velocity = planet velocity + \(\mathbf{v}_\infty\); rotation of \(\mathbf{v}_\infty\) produces the assist. |
| Conservation of Jacobi constant (or energy) in the two-body problem | Guarantees \(|\mathbf{v}_\infty|\) is identical before and after the flyby. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Encounter geometry in the planetocentric frame
A spacecraft approaching a planet from infinity follows a straight-line asymptote until planetary gravity bends the path into a hyperbola. The incoming asymptote lies at an angle \(\delta/2\) from the axis of closest approach, where \(\delta\) is the total turning angle.

A 300 km altitude flyby of Earth (\(\mu = 3.986 \times 10^5\) km³ s⁻²) with \(v_\infty = 3\) km s⁻¹ yields a turning angle of 168°; the spacecraft departs on the opposite side of the planet from its arrival asymptote.

The turning angle satisfies
\[
\sin(\delta/2) = \frac{1}{1 + r_p v_\infty^2 / \mu}.
\]

> [!WARNING]
> Using the planet’s radius instead of the periapsis radius \(r_p\) underestimates \(\delta\) and therefore overestimates the required closest-approach altitude.

### Step 2 — Definition of the hyperbolic excess velocity
The hyperbolic excess velocity \(\mathbf{v}_\infty\) is the velocity the spacecraft would retain at infinity relative to the planet if no other forces acted. Its magnitude is constant across the encounter because specific mechanical energy is conserved.

For the same Earth flyby the vis-viva equation evaluated at infinity gives
\[
v_\infty = \sqrt{\frac{2\mu}{r} + v^2} \Big|_{r\to\infty} = \text{constant}.
\]

> [!WARNING]
> Treating \(v_\infty\) as the speed relative to the Sun instead of the planet produces an incorrect heliocentric \(\Delta v\).

### Step 3 — Vector rotation of \(\mathbf{v}_\infty\)
The planetocentric velocity vector is rotated by \(\delta\) about an axis perpendicular to the encounter plane. The outgoing vector is therefore
\[
\mathbf{v}_\infty^+ = \mathbf{R}(\delta)\mathbf{v}_\infty^-,
\]
where \(\mathbf{R}(\delta)\) is the rotation matrix through the turning angle.

### Step 4 — Transformation to the heliocentric frame
Adding the planet’s heliocentric velocity \(\mathbf{v}_p\) yields the post-encounter heliocentric velocity:
\[
\mathbf{v}^+ = \mathbf{v}_p + \mathbf{v}_\infty^+.
\]
The change in heliocentric speed is therefore entirely due to the directional change of \(\mathbf{v}_\infty\).

### Step 5 — Patched-conic continuity condition
At the SOI boundary the position and velocity vectors computed in the planetocentric hyperbola are transformed into the heliocentric frame and become the new initial conditions for the Sun-centered conic. No impulsive burn occurs; only the central body changes.

### Step 6 — Textbook statement of the gravity-assist \(\Delta v\)
The maximum heliocentric speed change magnitude is \(2v_\infty\) when the flyby rotates \(\mathbf{v}_\infty\) by 180°. In vector form the assist supplies
\[
\Delta\mathbf{v}_\text{helio} = \mathbf{v}_\infty^+ - \mathbf{v}_\infty^-,
\]
subject to \(|\mathbf{v}_\infty^+| = |\mathbf{v}_\infty^-|\) and the turning-angle constraint above.

## 5. Worked examples — every step shown

**Example 1 — Simple 180° Earth slingshot**
- *Given:* \(v_\infty = 3\) km s⁻¹, \(\mathbf{v}_p = 30\) km s⁻¹ in the \(x\)-direction, incoming \(\mathbf{v}_\infty^- = (-3,0)\) km s⁻¹.
- *Find:* outgoing heliocentric speed.
- Compute turning angle from periapsis altitude 300 km: \(\sin(\delta/2) = 1/(1+6378\cdot9/398600) \approx 0.999\), so \(\delta \approx 180^\circ\).
- Rotate: \(\mathbf{v}_\infty^+ = (3,0)\) km s⁻¹.
- Add planet velocity: \(\mathbf{v}^+ = (33,0)\) km s⁻¹.
- **33 km s⁻¹**
- *Reflection:* The assist adds twice \(v_\infty\) because the rotation is exactly antiparallel; any smaller angle reduces the gain linearly.

**Example 2 — 90° Venus flyby**
- *Given:* \(v_\infty = 6\) km s⁻¹, \(\mathbf{v}_p = (35,0)\) km s⁻¹, incoming \(\mathbf{v}_\infty^- = (0,-6)\) km s⁻¹, \(\delta = 90^\circ\).
- Rotate 90° counterclockwise: \(\mathbf{v}_\infty^+ = (-6,0)\) km s⁻¹.
- Add: \(\mathbf{v}^+ = (29,0)\) km s⁻¹.
- **29 km s⁻¹**
- *Reflection:* The spacecraft loses heliocentric speed; the sign of the rotation decides whether the assist accelerates or decelerates.

**Example 3 — Cassini-style VVEJ sequence planning**
- *Given:* Earth departure \(v_\infty = 4\) km s⁻¹, Venus \(v_\infty\) target 6 km s⁻¹, required rotation 120°.
- Verify minimum periapsis altitude satisfies turning-angle equation; iterate until \(r_p\) yields exactly 120°.
- Resulting heliocentric leg reaches Jupiter with arrival \(v_\infty = 5.5\) km s⁻¹.
- **Validated 120° Venus rotation**
- *Reflection:* Multiple assists require matching both magnitude and direction of successive \(v_\infty\) vectors.

**Example 4 — Finite-SOI correction**
- *Given:* Same numbers as Example 1 but SOI radius 925 000 km.
- Integrate hyperbolic trajectory only to the SOI boundary; the velocity vector at exit differs from the pure asymptotic value by <0.1 % for \(v_\infty = 3\) km s⁻¹.
- **Difference negligible for preliminary design**
- *Reflection:* The patched-conic approximation already absorbs the dominant error; higher-fidelity models add only small ephemeris corrections.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Confusing \(v_\infty\) with planet-relative speed at periapsis | Students apply vis-viva at closest approach instead of at infinity | Always evaluate energy at \(r\to\infty\) or use the hyperbolic definition directly |
| Ignoring the plane of the flyby | The rotation axis must be normal to the incoming velocity–planet velocity plane | Compute the cross product \(\mathbf{v}_\infty^- \times \mathbf{v}_p\) to define the normal before applying the rotation matrix |
| Using the planet’s radius for \(r_p\) | Periapsis must lie above the atmosphere or rings | Add the required altitude to the equatorial radius before inserting into the turning-angle formula |
| Forgetting that \(|\mathbf{v}_\infty|\) is invariant | Energy conservation is misremembered as momentum conservation | Re-derive specific energy \(\varepsilon = v_\infty^2/2\) before and after the encounter |
| Treating the assist as an impulsive \(\Delta v\) at periapsis | The velocity change is distributed along the hyperbola | Integrate the equations of motion or use the asymptotic rotation; never place an instantaneous burn inside the SOI |
| Neglecting the planet’s own orbital motion during the flyby | The planet moves several hundred kilometres while the spacecraft traverses the SOI | For preliminary work the displacement is second-order; for high-precision work shift to a four-body ephemeris model after the patched-conic solution |
| Assuming any rotation angle is possible | The maximum scattering angle is set by a grazing trajectory | Solve the turning-angle equation for \(r_p = R_\text{planet} + h_\text{min}\) to obtain the largest usable \(\delta\) |

## 7. The textbook-precise statement
In the patched-conic, zero-sphere-of-influence approximation the heliocentric velocity change delivered by an unpowered planetary flyby is
\[
\Delta\mathbf{v}_\text{helio} = \mathbf{R}(\delta,\hat{\mathbf{n}})\mathbf{v}_\infty^- - \mathbf{v}_\infty^-,
\]
where \(\delta = 2\arcsin\left(\frac{1}{1+r_p v_\infty^2/\mu}\right)\) and \(\hat{\mathbf{n}}\) is the unit normal to the encounter plane. The incoming and outgoing hyperbolic excess velocities satisfy \(|\mathbf{v}_\infty^+| = |\mathbf{v}_\infty^-|\) because specific energy is conserved along the planetocentric hyperbola. (Vallado, *Fundamentals of Astrodynamics and Applications*, 4th ed., §5.4, Algorithm 5-3.)

## 8. Visual — diagram or schematic
```text
Sun-centered frame (heliocentric)
          v_p
     -----> (planet velocity)
          |
          |  v_infty^-
          v
   incoming asymptote
          \
           \   hyperbola (planetocentric)
            \ 
             * periapsis
            /
           /   outgoing asymptote
          v
          |
          |  v_infty^+
     -----> 
   new heliocentric velocity = v_p + v_infty^+
```
The diagram shows the planet moving to the right at \(\mathbf{v}_p\). The spacecraft arrives on the lower asymptote with velocity \(\mathbf{v}_\infty^-\) relative to the planet, swings around the periapsis, and departs on the upper asymptote with \(\mathbf{v}_\infty^+\). Adding \(\mathbf{v}_p\) to each \(\mathbf{v}_\infty\) vector yields the heliocentric legs before and after the assist.

## 9. The memory technique

1. **The hook** — Picture the planet as a moving “bus” and the spacecraft as a skateboarder grabbing the bus’s handrail; the skateboarder’s speed relative to the sidewalk changes dramatically while the speed relative to the bus stays constant.
2. **What to overlearn** — \(v_\infty^+ = R(\delta)v_\infty^-\) and \(\sin(\delta/2) = 1/(1 + r_p v_\infty^2/\mu)\); both must be recalled instantly.
3. **Spaced-repetition schedule** — Review the two equations at 1 day, 3 days, 7 days, 16 days, and 35 days after first mastery.
4. **First-principles fallback** — Re-derive the turning angle from conservation of energy and angular momentum about the planet; the impact parameter \(b = r_p\sqrt{1 + 2\mu/(r_p v_\infty^2)}\) appears directly from the hyperbolic trajectory equation.

## 10. What this unlocks
Mastery of patched-conic gravity assists supplies the analytical backbone for interplanetary trajectory design, allowing rapid generation of candidate sequences before numerical optimization. The same \(v_\infty\) vector machinery reappears in:

- Lambert-problem targeting with intermediate flybys
- Sphere-of-influence departure and arrival conditions for escape and capture
- Low-thrust gravity-assist optimization via primer-vector theory
- Mission-design software such as NASA’s Copernicus and ESA’s GODOT

## 11. Self-check — five questions, no answers
1. A spacecraft approaches Mars with \(v_\infty = 2.5\) km s⁻¹. What is the maximum possible heliocentric \(\Delta v\) magnitude obtainable from a single flyby?
2. Derive the minimum periapsis altitude required at Venus to rotate \(\mathbf{v}_\infty\) by exactly 60° when \(v_\infty = 4\) km s⁻¹.
3. In the patched-conic model, why does the spacecraft’s specific energy relative to the Sun change even though the flyby itself is conservative?
4. A proposed Earth flyby yields a calculated turning angle of 170° at 200 km altitude. Identify the physical inconsistency and the corrective action.
5. Given incoming \(\mathbf{v}_\infty^- = (3,4,0)\) km s⁻¹ and a required outgoing direction of \((0,5,0)\) km s⁻¹ with the same magnitude, determine whether such a rotation is geometrically feasible and, if so, the necessary turning angle.