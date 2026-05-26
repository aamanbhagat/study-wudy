## 1. The one-sentence answer
**The vis-viva equation is the direct algebraic consequence of mechanical-energy conservation applied to an inverse-square gravitational field, expressed in terms of the instantaneous radius and the constant semi-major axis of the orbit.**

Energy is neither created nor destroyed along a Keplerian trajectory. At every point the sum of kinetic energy per unit mass and gravitational potential energy per unit mass remains exactly the same. That constant total energy can be written in two equivalent ways: once using local speed and local radius, once using only the fixed size of the ellipse. Equating the two expressions and clearing terms produces the compact relation \(v^2 = GM(2/r - 1/a)\).

The equation therefore lets an engineer or pilot read speed directly from position without integrating the equations of motion again. It works for any conic section whose focus is the central body, provided the two-body assumption holds.

> [!NOTE]
> The single most useful insight is that the quantity \(2/r - 1/a\) is itself an energy-like invariant; once the semi-major axis is known, speed at any radius is fixed regardless of how the vehicle arrived there.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 and Starship guidance software evaluates the vis-viva equation at every guidance cycle to compute the instantaneous \(\Delta v\) still required to reach the target orbit after engine cutoff.  

NASA’s Artemis I trajectory designers used the same relation to verify that the Orion spacecraft’s outbound and return hyperbolic excess speeds matched the patched-conic model before lunar gravity assist.  

Planet Labs constellation operators rely on it to predict drag-induced decay rates of their Dove satellites; a measured change in semi-major axis immediately translates into an expected change in orbital speed without re-running full numerical propagations.  

ESA’s Juice mission trajectory team applied the equation to size the gravity-assist maneuvers at Earth, Venus, and Mars by converting each fly-by radius into the precise velocity vector needed for the subsequent interplanetary leg.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Specific mechanical energy | The vis-viva equation is simply the statement that this scalar is constant. |
| Specific angular momentum | Defines the size and orientation of the orbit; appears implicitly when proving energy is constant. |
| Conic-section orbit equation | Supplies the geometric meaning of semi-major axis \(a\). |
| Two-body problem assumptions | Guarantees that the only force is central and inverse-square. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Total mechanical energy is conserved
In the absence of non-conservative forces the sum of kinetic and potential energy per unit mass never changes.  
Consider a 1 kg test particle at two different points on the same ellipse; its speed and distance from the focus differ, yet the numerical value of \(v^2/2 - GM/r\) is identical at both.  
\[
\varepsilon = \frac{v^2}{2} - \frac{GM}{r} = \text{constant}
\]
> [!WARNING]
> If you forget that \(\varepsilon\) is defined per unit mass you will carry an extra factor of \(m\) through every later equation and obtain an inconsistent final form.

### Step 2 — Gravitational potential for an inverse-square field
Newton’s law integrated once yields the specific potential \(-GM/r\). The zero of potential is placed at infinity so that bound orbits have negative total energy.  
At distance \(r\) the potential energy per unit mass is therefore exactly \(-GM/r\).

### Step 3 — Expression for total energy on an elliptical orbit
For any closed Keplerian ellipse the constant specific energy depends only on semi-major axis:
\[
\varepsilon = -\frac{GM}{2a}
\]
This result follows from integrating the orbit equation or from evaluating energy at periapsis and apoapsis and averaging; the algebra is omitted here because it is standard in any astrodynamics text.

### Step 4 — Equate the two expressions for \(\varepsilon\)
Because both statements describe the same scalar,
\[
\frac{v^2}{2} - \frac{GM}{r} = -\frac{GM}{2a}
\]

### Step 5 — Algebraic rearrangement to vis-viva form
Multiply through by 2, move the potential term, and factor:
\[
v^2 = GM\left(\frac{2}{r} - \frac{1}{a}\right)
\]
This is the textbook statement of the vis-viva equation.

## 5. Worked examples — every step shown

**Example 1 — Circular low-Earth orbit**  
*Given:* \(r = 6778\) km, \(GM = 3.986 \times 10^5\) km³ s⁻², \(a = 6778\) km (circular).  
*Find:* orbital speed \(v\).  

\[
v^2 = 3.986 \times 10^5 \left( \frac{2}{6778} - \frac{1}{6778} \right)
\]  
*Why:* substitute known values directly into the derived equation.  

\[
v^2 = 3.986 \times 10^5 \times \frac{1}{6778} \approx 58.81 \times 10^3
\]  
*Why:* arithmetic simplification.  

\[
v = \sqrt{58810} \approx 7.725 \text{ km s}^{-1}
\]  
**Final answer**  
**\(v = 7.725\) km s⁻¹**  

*Reflection:* The example is trivial yet verifies that the equation reduces to the familiar circular-orbit speed \(v = \sqrt{GM/r}\).

**Example 2 — Speed at perigee of a Molniya orbit**  
*Given:* \(a = 26\,554\) km, \(r_p = 7\,078\) km.  
*Find:* \(v_p\).  

\[
v_p^2 = 3.986 \times 10^5 \left( \frac{2}{7078} - \frac{1}{26554} \right)
\]  
*Why:* insert perigee radius while keeping the fixed semi-major axis.  

\[
v_p^2 \approx 3.986 \times 10^5 \times (0.0002825 - 0.0000377) \approx 97.79 \times 10^3
\]  
*Why:* arithmetic.  

\[
v_p \approx 9.89 \text{ km s}^{-1}
\]  
**Final answer**  
**\(v_p = 9.89\) km s⁻¹**  

*Reflection:* Demonstrates that speed depends on both local radius and the global size \(a\).

**Example 3 — Escape speed at a given altitude**  
*Given:* \(r = 10\,000\) km.  
*Find:* escape speed (\(a \to \infty\)).  

\[
v_{\text{esc}}^2 = GM\left(\frac{2}{r} - 0\right) = \frac{2GM}{r}
\]  
*Why:* the term \(1/a\) vanishes for parabolic escape.  

\[
v_{\text{esc}} = \sqrt{2 \times 3.986 \times 10^5 / 10\,000} \approx 8.92 \text{ km s}^{-1}
\]  
**Final answer**  
**\(v_{\text{esc}} = 8.92\) km s⁻¹**  

*Reflection:* The same formula covers the parabolic limiting case without separate derivation.

**Example 4 — Hyperbolic excess speed after planetary fly-by**  
*Given:* hyperbolic excess speed at infinity \(v_\infty = 3\) km s⁻¹, closest approach \(r = 4\,000\) km around Earth.  
*Find:* speed at closest approach.  

For hyperbola \(a\) is negative: \(a = -GM/v_\infty^2 = -44\,289\) km.  

\[
v^2 = 3.986 \times 10^5 \left( \frac{2}{4000} - \frac{1}{-44289} \right)
\]  
*Why:* the algebraic form remains valid; only the sign of \(a\) changes.  

\[
v^2 \approx 3.986 \times 10^5 \times (0.0005 + 0.0000226) \approx 208.9 \times 10^3
\]  
\[
v \approx 14.45 \text{ km s}^{-1}
\]  
**Final answer**  
**\(v = 14.45\) km s⁻¹**  

*Reflection:* Shows the equation’s generality across all conic sections.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using radial distance instead of semi-major axis for total energy | Students remember “energy depends on height” from ballistics and forget the orbit-average property. | Always compute \(\varepsilon = -GM/(2a)\) first; never substitute \(r\) for \(a\). |
| Sign error on \(a\) for hyperbolas | Negative \(a\) feels counter-intuitive. | Memorize that \(a < 0\) for \(v_\infty > 0\) and keep the algebraic form unchanged. |
| Forgetting specific (per-unit-mass) quantities | Mixing \(GMm\) and \(GM\) produces dimensionally inconsistent results. | Work exclusively with specific energy and specific angular momentum until the final numerical answer. |
| Applying the equation inside an atmosphere without drag correction | The derivation assumes vacuum two-body motion. | Check Knudsen number or scale height before use; add drag loss separately. |
| Confusing geocentric versus barycentric \(GM\) | Earth–Moon or Sun–planet systems have offset foci. | Verify the central body mass parameter matches the focus actually used. |
| Assuming the equation gives vector velocity | Only speed magnitude appears. | Recombine with flight-path angle from angular-momentum conservation when a vector is required. |
| Using osculating \(a\) after a maneuver without re-computing | Thrust changes energy instantly. | Update \(a\) from the new \(\varepsilon\) after every impulsive burn. |

## 7. The textbook-precise statement
In the two-body problem with gravitational parameter \(\mu = GM\), the specific mechanical energy \(\varepsilon\) of a particle on a conic trajectory is constant and related to the local speed \(v\) and radial distance \(r\) by
\[
\varepsilon = \frac{v^2}{2} - \frac{\mu}{r}.
\]
For an elliptical orbit (\(\varepsilon < 0\)) this constant equals \(-\mu/(2a)\), where \(a\) is the semi-major axis. Equating the two expressions and rearranging yields the vis-viva equation
\[
v^2 = \mu\left(\frac{2}{r} - \frac{1}{a}\right).
\]
The identical algebraic form holds for parabolic (\(a = \infty\)) and hyperbolic (\(a < 0\)) trajectories. (See Curtis, *Orbital Mechanics for Engineering Students*, 4e, §2.8.)

## 8. Visual — diagram or schematic
```text
Focus (central body)
        •
       / \          a
      /   \     +---------+
     /     \   /           \
    r_p     r_a             semi-major axis a
     \     /   \           /
      \   /     +---------+
       \ /          periapsis to apoapsis
        •  <--- r ---> satellite position
```
The diagram shows an ellipse with focus at the central body, radial vector \(r\) from focus to spacecraft, and the constant semi-major axis \(a\) measured from center of ellipse to either apoapsis or periapsis.

## 9. The memory technique

1. **The hook** — Picture a rubber band stretched between two pins (the foci); the vis-viva equation tells you how fast the bead slides when you know only its distance from one pin and the fixed length of the major axis.  
2. **What to overlearn** — \(\varepsilon = v^2/2 - GM/r = -GM/(2a)\) and the final compact form \(v^2 = GM(2/r - 1/a)\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from conservation of specific mechanical energy and the known value of \(\varepsilon\) on an ellipse; the algebra is five lines.

## 10. What this unlocks
Mastery of the vis-viva equation lets you move immediately to orbit determination, Lambert’s problem, and rendezvous planning without re-integrating the differential equations at every step.  

- Patch-conic interplanetary trajectories  
- impulsive \(\Delta v\) budgeting  
- orbit maintenance and station-keeping calculations  
- preliminary mission-design trade studies  

## 11. Self-check — five questions, no answers
1. A satellite is at \(r = 10\,000\) km with speed 7 km s⁻¹ around Earth. Is its orbit circular, elliptical, parabolic, or hyperbolic?  
2. Derive the circular-orbit speed formula from the vis-viva equation in one algebraic line.  
3. An elliptical orbit has perigee radius 7 000 km and apogee radius 45 000 km. Compute speed at both apsides.  
4. Why does the same equation give the correct speed on a hyperbolic escape trajectory even though the spacecraft is no longer bound?  
5. A spacecraft performs a burn that raises its semi-major axis while radius stays constant. Does its speed increase or decrease, and by how much in terms of the change in \(a\)?