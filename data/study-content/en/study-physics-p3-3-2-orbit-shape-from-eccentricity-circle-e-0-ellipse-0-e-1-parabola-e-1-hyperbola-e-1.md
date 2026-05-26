## 1. The one-sentence answer
**Eccentricity \(e\) fixes the geometric family of every two-body orbit because the polar equation of motion under an inverse-square force is the standard conic-section formula \(r = \frac{p}{1 + e \cos\theta}\).**

The constant \(p = h^2/\mu\) is the semi-latus rectum. When \(e = 0\) the denominator never changes, so \(r\) is constant and the path is a circle. When \(0 < e < 1\) the denominator stays between \(1-e\) and \(1+e\), both positive, so \(r\) remains finite and periodic and the path closes into an ellipse. When \(e = 1\) the denominator reaches zero at \(\theta = 180^\circ\), sending \(r\) to infinity after a single closest approach and producing a parabola. When \(e > 1\) the denominator reaches zero twice, allowing the trajectory to arrive from and depart to infinity and producing a hyperbola.

The single parameter \(e\) therefore partitions all possible orbits into four exhaustive classes without any additional assumptions beyond Newtonian gravity and a single central body.

> [!NOTE]
> The value of \(e\) is not chosen arbitrarily; it is fixed by the specific energy and angular momentum of the spacecraft at any instant, so measuring those two scalars instantly tells you which of the four curves you are on.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 second-stage disposal burns are designed to produce a slightly hyperbolic trajectory (\(e \approx 1.02\)) so the stage coasts to infinity after payload separation and does not remain in Earth orbit as debris.  

JWST was inserted into a halo orbit about the Sun–Earth L2 point by a transfer trajectory whose eccentricity relative to Earth was tuned to 0.9996 at separation; the same number appears in every daily station-keeping calculation because the underlying three-body motion is continuously approximated by patched conics.  

ESA’s Solar Orbiter uses a sequence of Venus gravity assists that switch the heliocentric orbit from elliptical (\(e \approx 0.7\)) to higher-eccentricity ellipses (\(e \approx 0.8\)) to raise inclination; each assist is a hyperbolic fly-by segment whose excess velocity fixes the new \(e\).  

Planetary-defense simulations at NASA’s Planetary Defense Coordination Office classify incoming asteroids by the eccentricity of their heliocentric hyperbolas; an object with \(e > 1\) relative to the Sun will make only one Earth encounter unless deflected, directly informing deflection mission design.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Specific angular momentum \(h = \|\mathbf{r} \times \mathbf{v}\|\) | Sets the size scale \(p = h^2/\mu\) of every conic |
| Specific mechanical energy \(\mathcal{E} = v^2/2 - \mu/r\) | Determines the sign of \(1 - e^2\) and hence the type |
| Polar angle \(\theta\) measured from periapsis | Aligns the denominator zero with the correct asymptote or apsis |
| Gravitational parameter \(\mu = GM\) | Normalizes the force law that produces the \(1/r^2\) term |

## 4. Building the idea — from intuition to formalism

### Step 1 — The force law forces a conic
A central inverse-square acceleration produces planar motion whose radial distance satisfies a linear second-order differential equation whose general solution is exactly the polar equation of a conic.  
Example: at \(r = 7000\) km, \(\mu = 398600\) km³ s⁻², a circular speed of 7.546 km s⁻¹ yields \(e = 0\).  
Formal statement:  
\[
\frac{d^2 u}{d\theta^2} + u = \frac{\mu}{h^2}, \quad u = 1/r.
\]
> [!WARNING]
> If the force were not exactly inverse-square the right-hand side would contain higher powers of \(u\) and the solution would cease to be a pure conic.

### Step 2 — Definition of eccentricity
The dimensionless constant of integration that multiplies the cosine term is defined as eccentricity:  
\[
e = \sqrt{1 + \frac{2\mathcal{E}h^2}{\mu^2}}.
\]
A circular orbit has \(\mathcal{E} = -\mu/(2a)\) and \(h = \sqrt{\mu a}\), forcing \(e = 0\).

### Step 3 — Range of the denominator
The term \(1 + e\cos\theta\) reaches its minimum \(1-e\) at \(\theta = 180^\circ\). When \(e < 1\) this minimum is positive, so \(r\) never diverges. When \(e = 1\) the minimum is zero. When \(e > 1\) the minimum is negative, producing two real roots where the denominator vanishes.

### Step 4 — Closed versus open paths
Because \(\theta\) advances without bound, a positive denominator for all \(\theta\) produces a closed curve only if the orbit is periodic in Cartesian coordinates, which occurs precisely when \(e < 1\). At \(e = 1\) and \(e > 1\) the trajectory reaches infinity after finite \(\Delta\theta\).

### Step 5 — The four exhaustive cases
Collecting the sign of \(1-e\) and the sign of \(\mathcal{E}\) yields the textbook partition:  
- \(e = 0\): circle  
- \(0 < e < 1\): ellipse  
- \(e = 1\): parabola  
- \(e > 1\): hyperbola.

## 5. Worked examples — every step shown

**Example 1 — Circular low-Earth orbit**  
*Given:* \(r = 6778\) km, \(v \perp r\), \(\mu = 398600\) km³ s⁻².  
*Find:* \(e\).  
Compute \(h = r v\). First obtain \(v = \sqrt{\mu/r} = 7.672\) km s⁻¹.  
\[
h = 6778 \times 7.672 = 52000 \text{ km}^2\text{s}^{-1}.
\]  
*Why:* magnitude of angular momentum.  
Energy:  
\[
\mathcal{E} = \frac{v^2}{2} - \frac{\mu}{r} = -\frac{\mu}{2r}.
\]  
*Why:* circular-orbit identity.  
\[
e = \sqrt{1 + \frac{2\mathcal{E}h^2}{\mu^2}} = 0.
\]  
**0**  

*Reflection:* The velocity being exactly perpendicular and of circular magnitude forces the eccentricity integral to vanish.

**Example 2 — Molniya-class ellipse**  
*Given:* \(r_p = 7378\) km, \(r_a = 42000\) km.  
*Find:* \(e\).  
Semi-major axis:  
\[
a = \frac{r_p + r_a}{2} = 24689 \text{ km}.
\]  
*Why:* definition of ellipse.  
\[
e = \frac{r_a - r_p}{r_a + r_p} = 0.700.
\]  
**0.700**  

*Reflection:* Apogee and perigee distances alone fix \(e\) without velocity data.

**Example 3 — Escape parabola**  
*Given:* \(r = 6778\) km, \(v = \sqrt{2\mu/r}\).  
*Find:* \(e\).  
\[
\mathcal{E} = 0 \implies e = 1.
\]  
**1**  

*Reflection:* Zero specific energy is the exact boundary between bound and unbound motion.

**Example 4 — Interplanetary hyperbola**  
*Given:* Earth escape with \(v_\infty = 3\) km s⁻¹ at \(r = 6778\) km.  
*Find:* \(e\).  
\[
\mathcal{E} = \frac{v_\infty^2}{2} = 4.5 \text{ km}^2\text{s}^{-2}.
\]  
\[
h = r\sqrt{v^2 - v_\text{esc}^2/2} \text{ (numerical evaluation yields } h = 53200\text{)}.
\]  
\[
e = \sqrt{1 + \frac{2\mathcal{E}h^2}{\mu^2}} = 1.32.
\]  
**1.32**  

*Reflection:* Positive energy maps directly to \(e > 1\) once \(h\) is known.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating \(e\) as an angle | Notation overlap with orbital elements | Always read \(e\) as dimensionless ratio |
| Forgetting \(e\) can exceed 1 | Intuition from closed terrestrial orbits | Compute \(\mathcal{E}\) first; sign tells bound/unbound |
| Using \(r_a\) for hyperbolas | Formula \(r_a = a(e+1)\) is ellipse-only | Use turning angle or \(v_\infty\) instead |
| Confusing true anomaly at infinity | Asymptote lies at \(\cos\theta_\infty = -1/e\) | Solve the denominator = 0 explicitly |
| Assuming focus is geometric centre | Only true for circles | Remember focus offset \(ae\) for ellipse/hyperbola |
| Mixing specific and total energy | Units differ by mass | Work exclusively with \(\mathcal{E}\) per unit mass |
| Ignoring that \(p\) is shared | All four conics use same \(p\) | Calculate \(p = h^2/\mu\) before classifying |

## 7. The textbook-precise statement
In the two-body problem the orbit equation is  
\[
r = \frac{h^2/\mu}{1 + e\cos\theta}, \quad e = \sqrt{1 + \frac{2\mathcal{E}h^2}{\mu^2}}.
\]
The trajectory is a circle if \(e = 0\), an ellipse if \(0 < e < 1\), a parabola if \(e = 1\), and a hyperbola if \(e > 1\) (Bate, Mueller & White, *Fundamentals of Astrodynamics*, 1971, §2.4, Theorem 2.1).

## 8. Visual — diagram or schematic
```text
Focus (central body) at origin
          ^
          |   hyperbola (e>1)
   asymptote \     /
            \   /
  parabola   \ /   ellipse (0<e<1)
   (e=1)     / \ 
            /   \
   circle   /     \
  (e=0)   o------->
          r_min
```
Horizontal axis is major axis; vertical lines mark asymptotes for \(e \ge 1\); circle is centred on focus.

## 9. The memory technique
**The hook** — Picture a single spotlight (the focus) throwing a beam; zero eccentricity keeps the beam length constant (circle), slight tilt stretches it into an oval (ellipse), exactly 45° sends the beam to infinity once (parabola), and steeper lets the beam cross itself at two infinities (hyperbola).  

**What to overlearn** — \(e = \sqrt{1 + 2\mathcal{E}h^2/\mu^2}\), the four intervals of \(e\), and \(p = h^2/\mu\).  

**Spaced-repetition schedule** — 1 day, 3 days, 7 days, 16 days, 35 days.  

**First-principles fallback** — Start from the differential equation \(d^2u/d\theta^2 + u = \mu/h^2\), integrate twice, identify the coefficient of \(\cos\theta\) as \(e\).

## 10. What this unlocks
Mastery of eccentricity classification lets you read any state vector and immediately know whether the object is bound, escaping, or on a fly-by, which is required for the next topics.  

- Vis-viva equation and orbital period formulae (ellipse only)  
- Hyperbolic excess velocity and gravity-assist \(\delta v\) calculations  
- patched-conic interplanetary trajectories  
- Lambert’s problem initial orbit determination  
- Stability limits of Lagrange-point halo orbits

## 11. Self-check — five questions, no answers
1. A spacecraft at 10 000 km altitude has \(v = 8\) km s⁻¹ perpendicular to radius vector; is the orbit circular, elliptical, parabolic or hyperbolic?  
2. Derive the expression for true anomaly at infinity on a hyperbola.  
3. Two orbits share the same \(h\) but have energies of opposite sign; what single number distinguishes their shapes?  
4. An orbit reaches \(r \to \infty\) at \(\theta = \pm 120^\circ\); what is its eccentricity?  
5. Why does the same numerical value of \(e = 0.9\) describe both a highly eccentric Earth orbit and a nearly parabolic escape trajectory around the Sun?