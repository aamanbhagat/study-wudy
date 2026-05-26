## 1. The one-sentence answer
**Kepler’s third law states that the square of an orbiting body’s period equals a constant times the cube of its semi-major axis.**

Newton derived the constant from the inverse-square law of gravity. For any two bodies the gravitational attraction supplies the exact centripetal acceleration needed to close an orbit; balancing those accelerations immediately produces \(T^2 \propto a^3\). The same relation survives when the orbit is elliptical because the period depends only on total energy, which is fixed by the semi-major axis alone.

The proportionality is therefore not an empirical coincidence but a direct consequence of \(1/r^2\) gravity. Once the force law is fixed, the period–size relation is fixed for every closed orbit.

> [!NOTE]
> The constant of proportionality contains the central mass; changing the central body (Sun versus Earth versus Jupiter) changes the numerical factor but never the \(T^2 \propto a^3\) scaling itself.

## 2. Why this matters — concrete and current
SpaceX’s Starlink constellation places satellites at 550 km altitude; engineers use Kepler’s third law to convert the required 90-minute repeat cycle into the exact semi-major axis that keeps every satellite in the same ground-track grid.

NASA’s Lucy mission to the Trojan asteroids schedules flybys years in advance by solving Kepler’s equation for each target’s semi-major axis; a 0.1 % error in \(a\) produces a 0.15 % error in arrival time, enough to miss the 20 km science window.

Transit photometry pipelines at NASA’s TESS mission convert measured intervals between dips directly into orbital periods, then apply the third law to obtain semi-major axes and therefore equilibrium temperatures for candidate planets.

GPS satellites occupy 20 200 km orbits whose 12-hour sidereal periods are fixed by the same law; any future constellation at different altitude must recompute the constant from Earth’s GM before the first launch.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Newton’s law of gravitation | Supplies the central force whose strength sets the constant in \(T^2 \propto a^3\) |
| Centripetal acceleration for circular motion | Converts the force balance into an algebraic relation between period and radius |
| Conservation of angular momentum | Shows why the same scaling survives for elliptical orbits |
| Definition of semi-major axis | Replaces radius when the orbit is no longer circular      |

## 4. Building the idea — from intuition to formalism

### Step 1 — Gravitational force supplies the only acceleration
A satellite feels an attractive force \(GMm/r^2\) directed toward the central body. No other forces act in the ideal two-body problem.  
Example: at Earth’s surface a 1 kg test mass experiences \(9.8\) N; at 42 164 km altitude the same mass experiences only \(0.22\) N.  
Formal statement:  
\[
F = -\frac{GMm}{r^2}\hat{r}.
\]
> [!WARNING]  
> Treating the force as constant (as in flat-Earth gravity) destroys the inverse-square dependence and therefore erases the \(T^2 \propto a^3\) result.

### Step 2 — Force equals mass times centripetal acceleration
For a circular orbit the acceleration that keeps the path curved is \(v^2/r\). Newton’s second law therefore equates gravitational force per unit mass to this acceleration:  
\[
\frac{GM}{r^2} = \frac{v^2}{r}.
\]
Example: low-Earth orbit at \(r = 6378 + 400\) km yields \(v \approx 7.67\) km s\(^{-1}\).

### Step 3 — Replace speed with period
Speed is distance per unit time around the circumference, so \(v = 2\pi r / T\). Substitute:  
\[
\frac{GM}{r^2} = \frac{(2\pi r / T)^2}{r} = \frac{4\pi^2 r}{T^2 r^2}.
\]
Clear terms:  
\[
\frac{GM}{r^3} = \frac{4\pi^2}{T^2}.
\]

### Step 4 — Rearrange to isolate the period–size relation
Cross-multiply to obtain the exact circular-orbit form:  
\[
T^2 = \frac{4\pi^2}{GM} r^3.
\]
The factor \(4\pi^2/GM\) is constant for a given central body.

### Step 5 — Extend to elliptical orbits via energy
Total orbital energy \(E = -GMm/(2a)\) depends only on semi-major axis \(a\). The period is the time to traverse one full radial oscillation; that time is fixed once \(E\) (hence \(a\)) is fixed. The same algebraic factor therefore appears with \(a\) replacing \(r\):  
\[
T^2 = \frac{4\pi^2}{GM} a^3.
\]
This is Kepler’s third law.

## 5. Worked examples — every step shown

**Example 1 — Low-Earth orbit radius from a 90-minute period**  
*Given:* \(T = 5400\) s, Earth \(GM = 3.986 \times 10^{14}\) m³ s\(^{-2}\).  
*Find:* orbital radius \(r\).  
Start from the circular form:  
\[
T^2 = \frac{4\pi^2}{GM} r^3 \quad \Rightarrow \quad r^3 = \frac{GM\,T^2}{4\pi^2}.
\]
Substitute numbers:  
\[
r^3 = \frac{3.986\times10^{14}\times(5400)^2}{4\times9.8696} = 2.629\times10^{20}\ \text{m}^3.
\]
Take cube root:  
\[
r = 6.408\times10^6\ \text{m} = 6378 + 30\ \text{km (rounded)}.
\]
**Reflection** The example is easy because the orbit is forced circular; the only arithmetic risk is unit consistency.

**Example 2 — Geostationary altitude**  
*Given:* \(T = 86\,164\) s (one sidereal day).  
*Find:* altitude above Earth’s surface.  
\[
r^3 = \frac{GM\,T^2}{4\pi^2} = 7.547\times10^{22}\ \text{m}^3 \quad \Rightarrow \quad r = 42\,164\ \text{km}.
\]
Altitude \(= 42\,164 - 6378 = 35\,786\) km.  
**Reflection** The large exponent on \(T\) magnifies any timing error; a 1 s error shifts altitude by ~30 m.

**Example 3 — Orbital period of a hypothetical Mars satellite at 2 Mars radii**  
*Given:* Mars \(GM = 4.2828\times10^{13}\) m³ s\(^{-2}\), \(a = 2\times3390 = 6780\) km.  
\[
T^2 = \frac{4\pi^2}{GM}a^3 \quad \Rightarrow \quad T = 2\pi\sqrt{\frac{a^3}{GM}} = 2\pi\sqrt{\frac{(6.78\times10^6)^3}{4.2828\times10^{13}}} \approx 6874\ \text{s} \approx 1.91\ \text{h}.
\]
**Reflection** The same formula works for any central body once \(GM\) is known.

**Example 4 — Exoplanet semi-major axis from transit period**  
*Given:* star mass \(1.0\,M_\odot\), observed period 365 days.  
Convert to SI, apply the solar form \(T^2 = (4\pi^2/GM_\odot)a^3\):  
\[
a = \left(\frac{GM_\odot T^2}{4\pi^2}\right)^{1/3} = 1.496\times10^{11}\ \text{m} = 1\ \text{AU}.
\]
**Reflection** The result is exact only if the star mass is known independently; transit surveys therefore combine this law with stellar spectroscopy.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using Earth radius instead of orbital radius | Students forget the altitude offset | Always write \(r = R_\text{body} + h\) before substituting |
| Confusing sidereal and synodic periods | Everyday clocks are synodic | Use 86 164 s for Earth-day calculations |
| Treating the constant as universal | The constant contains \(GM\) of the central body | Recalculate \(4\pi^2/GM\) for each new primary |
| Applying the law to hyperbolic escape trajectories | Energy is positive, no closed period | Verify \(E < 0\) before invoking \(T^2 \propto a^3\) |
| Forgetting reduced-mass correction in comparable-mass binaries | Two-body problem reduces to one-body with \(\mu\) | Replace \(M\) by \(M+m\) when masses are similar |
| Mixing units inside the same calculation | km versus m, days versus seconds | Convert everything to SI at the first step |
| Assuming zero eccentricity changes the period | Period depends only on \(a\), not \(e\) | Use semi-major axis even for eccentric orbits |

## 7. The textbook-precise statement
For a two-body system with gravitational parameter \(\mu = G(m_1+m_2)\), any closed orbit satisfies
\[
T = 2\pi\sqrt{\frac{a^3}{\mu}},
\]
where \(a\) is the semi-major axis of the relative orbit and \(T\) is the sidereal period. The result follows from the solution of the Kepler problem under an inverse-square central force (see Murray & Dermott, *Solar System Dynamics*, §2.1).

## 8. Visual — diagram or schematic
```text
          +z
           |
           |   a (semi-major axis)
   apoapsis*-------------------*periapsis
           |         \         |
           |          \        |
           |           * focus (central body)
           |          /        |
           |         /         |
   --------+---------+---------+--------- x
           |                   |
           |<------ 2a ------->|
```
The diagram shows an elliptical orbit with the central body at one focus. The semi-major axis \(a\) is half the longest diameter; the period depends only on this length.

## 9. The memory technique

1. **The hook** — Picture a clock whose hands sweep a cube: every time the hand goes around twice, the orbit size has grown by the cube of that factor.
2. **What to overlearn** — The exact circular-orbit equation \(T^2 = 4\pi^2 a^3/GM\) and the statement that \(a\) replaces \(r\) for ellipses.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from force balance: equate \(GM/r^2 = \omega^2 r\), replace \(\omega = 2\pi/T\), solve.

## 10. What this unlocks
Kepler’s third law supplies the period for every subsequent astrodynamic calculation that begins from orbit size.  
- Hohmann transfer timing  
- Sphere-of-influence patching  
- Mean-motion resonance design  
- Lambert-problem initial guesses  
- Formation-flying relative periods  

## 11. Self-check — five questions, no answers
1. Derive the numerical value of \(4\pi^2/GM_\ Earth\) in SI units and state its units.  
2. A satellite at \(a = 10\,000\) km around Earth has what sidereal period?  
3. Why does doubling semi-major axis multiply the period by \(2^{3/2}\) rather than by 2?  
4. An observed exoplanet has period 10 days around a star whose mass is 0.8 solar masses; what is its semi-major axis in AU?  
5. Identify the hidden assumption that fails when two satellites have identical periods but different eccentricities.