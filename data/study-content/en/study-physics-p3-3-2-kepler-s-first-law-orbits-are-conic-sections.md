## 1. The one-sentence answer
**Kepler’s first law states that every orbit under an inverse-square central force is a conic section with the force center at one focus.**

An orbit is the path a body follows under gravity. Newton showed that the inverse-square law produces trajectories whose polar equation is exactly the polar equation of an ellipse, parabola, or hyperbola. The type of curve is fixed by total mechanical energy: negative energy yields a closed ellipse, zero energy a parabola, and positive energy a hyperbola. The focus is not arbitrary; it is the location of the central mass.

This single geometric fact replaces the need to integrate the differential equations of motion for every new initial condition. Once the energy and angular momentum are known, the entire future path is known by inspection of the conic parameters.

> [!NOTE]
> The Sun (or central body) sits at a focus, never at the geometric center, because the force is directed toward that point; this offset is what produces Kepler’s equal-area law as a direct consequence.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 second-stage disposal burns are designed on hyperbolic escape trajectories whose asymptotes are calculated from the same conic parameters that describe an elliptical parking orbit; a single vis-viva equation switches between both regimes without re-deriving the trajectory.

ESA’s Gaia mission maintains a Lissajous orbit about the Sun–Earth L2 point that is itself a small perturbation of a conic; mission designers use the Keplerian conic as the reference orbit before adding station-keeping corrections.

The Parker Solar Probe’s seven Venus gravity assists are patched conics: each encounter is a hyperbola relative to Venus whose excess velocity is chosen so the new heliocentric ellipse reaches successively lower perihelia.

Asteroid mining companies such as AstroForge model rendezvous with near-Earth objects as transitions between two heliocentric ellipses connected by a hyperbolic escape from Earth; the conic-type classification immediately tells them whether a given launch C3 yields capture or a flyby.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Polar coordinates        | The standard derivation places the focus at the origin    |
| Specific angular momentum h | Defines the constant areal velocity and the parameter p   |
| Specific mechanical energy ε | Determines which conic (sign of ε) is realized            |
| Inverse-square force law | Produces the 1/r potential whose orbits close into conics |

## 4. Building the idea — from intuition to formalism

### Step 1 — Central force implies planar motion
Any force directed exactly toward a fixed point exerts no torque about that point, so angular momentum about the point is conserved. The velocity vector must therefore remain in a fixed plane containing the force center.

A satellite launched with velocity in the xy-plane stays in that plane forever. The problem collapses from three dimensions to two.

The angular-momentum vector \(\mathbf{h}=\mathbf{r}\times\mathbf{v}\) is constant, hence \(\mathbf{r}\) and \(\mathbf{v}\) are always perpendicular to the same fixed direction.

> [!WARNING]
> Forgetting that h is a vector and treating it as a scalar loses the proof that motion is confined to a plane.

### Step 2 — Angular momentum defines the parameter p
Conservation of h yields the areal speed \(\frac12 r^2\dot\theta = \frac h2\). Substituting the polar angle as the independent variable converts the radial equation into an orbit equation whose only length scale is \(p=h^2/\mu\).

For Earth orbits \(\mu=3.986\times10^5\) km³ s⁻²; once h is measured, p is known immediately.

The differential equation becomes
\[
\frac{d^2u}{d\theta^2}+u=\frac\mu{h^2},\qquad u=1/r.
\]

> [!WARNING]
> Using total energy instead of specific energy mixes spacecraft mass into every symbol and hides the fact that p depends only on h.

### Step 3 — The orbit equation integrates to a conic
The linear non-homogeneous equation above has the general solution
\[
u=\frac\mu{h^2}+A\cos(\theta-\theta_0).
\]
Inverting gives
\[
r=\frac{p}{1+e\cos\theta},
\]
where \(p=h^2/\mu\) and eccentricity \(e=Ah^2/\mu\).

This is the polar equation of a conic with focus at the origin.

> [!WARNING]
> Choosing the integration constant phase \(\theta_0\) incorrectly shifts the periapsis and produces an orbit rotated by an arbitrary angle.

### Step 4 — Energy fixes the eccentricity and conic type
Specific mechanical energy is constant:
\[
\varepsilon=\frac{v^2}2-\frac\mu r.
\]
Evaluating at periapsis where \(v=h/r_p\) and \(r_p=p/(1+e)\) produces the algebraic identity
\[
e=\sqrt{1+\frac{2\varepsilon h^2}{\mu^2}.
\]
Thus \(\varepsilon<0\) forces \(e<1\) (ellipse), \(\varepsilon=0\) forces \(e=1\) (parabola), and \(\varepsilon>0\) forces \(e>1\) (hyperbola).

> [!WARNING]
> Sign errors in the vis-viva equation flip the interpretation of escape versus capture trajectories.

### Step 5 — The force center is a focus
Because the derivation placed the origin at the central mass, the focus of the resulting conic coincides with that origin. No further assumption is required.

The textbook statement follows at once.

## 5. Worked examples — every step shown

**Example 1 — Circular low-Earth orbit**
*Given:* Altitude 300 km, \(\mu=398600\) km³ s⁻², Earth radius 6378 km.  
*Find:* eccentricity and semi-major axis.  
\(r=6678\) km.  
For a circle, \(e=0\).  
Thus \(p=r=6678\) km.  
\(a=p/(1-e^2)=6678\) km.  
**Answer:** \(e=0\), \(a=6678\) km.  
*Reflection:* The zero-eccentricity case is the boundary between all elliptical orbits; any velocity error immediately produces a non-zero e.

**Example 2 — Escape trajectory**
*Given:* Circular orbit at 300 km, burn that raises speed to 11.0 km s⁻¹.  
*Find:* eccentricity.  
\(v_\text{esc}=\sqrt{2\mu/r}\approx10.93\) km s⁻¹.  
\(\varepsilon=v^2/2-\mu/r>0\).  
\(e=\sqrt{1+2\varepsilon h^2/\mu^2}>1\).  
**Answer:** hyperbolic escape, \(e\approx1.07\).  
*Reflection:* The sign of \(\varepsilon\) alone classifies the conic; numerical value of e is secondary.

**Example 3 — Geostationary transfer orbit**
*Given:* Perigee 300 km, apogee 35786 km.  
*Find:* eccentricity.  
\(r_p=6678\) km, \(r_a=42164\) km.  
\(a=(r_p+r_a)/2=24421\) km.  
\(e=(r_a-r_p)/(r_a+r_p)=0.726\).  
**Answer:** \(e=0.726\), elliptical GTO.  
*Reflection:* The extreme ratio of apogee to perigee produces high eccentricity; students often forget that a is the arithmetic mean, not the geometric mean.

**Example 4 — Interstellar hyperbolic excess**
*Given:* ‘Oumuamua, \(v_\infty=26.5\) km s⁻¹, solar \(\mu\).  
*Find:* eccentricity at 1 AU.  
\(\varepsilon=v_\infty^2/2>0\).  
At r=1 AU, \(e=\sqrt{1+2\varepsilon r/\mu}\approx1.2\).  
**Answer:** hyperbolic, \(e>1\).  
*Reflection:* Asymptotic speed directly sets the excess energy and therefore the opening angle of the hyperbola.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Placing the central body at the ellipse center | Everyday intuition says “center of the circle” | Always write the polar equation with focus at origin before plotting |
| Confusing specific energy with total energy | Spacecraft mass appears in both numerator and denominator and cancels | Work exclusively with specific quantities \(\varepsilon\), h |
| Using true anomaly measured from ascending node instead of periapsis | Argument of periapsis is omitted in introductory problems | Define \(\theta=0\) at periapsis for the orbit equation |
| Assuming all orbits are ellipses | Most homework examples are bound orbits | Check sign of \(\varepsilon\) before labeling the conic |
| Forgetting that p = h²/μ is independent of energy | p and e are treated as coupled | Compute p first from h, then e from energy |
| Sign error in the eccentricity formula | The term 2εh²/μ² is written with a minus | Memorize e = √(1 + 2εh²/μ²) exactly |
| Treating parabolic escape as “infinite ellipse” | Limit e→1 is taken carelessly | Treat ε = 0 as a distinct mathematical case with its own asymptotes |

## 7. The textbook-precise statement
Under an inverse-square central gravitational force \(\mathbf{F}=-(\mu m/r^2)\hat{\mathbf{r}}\), every trajectory lies in a plane and satisfies the polar equation
\[
r=\frac{h^2/\mu}{1+e\cos\theta},
\]
where \(e=\sqrt{1+2\varepsilon h^2/\mu^2}\). The sign of the constant specific energy \(\varepsilon\) selects the conic type: ellipse (\(\varepsilon<0\)), parabola (\(\varepsilon=0\)), hyperbola (\(\varepsilon>0\)). The force center occupies one focus. (Bate, Mueller & White, *Fundamentals of Astrodynamics*, Dover 1971, §1.3, Eq. 1.3-7.)

## 8. Visual — diagram or schematic
```text
          Periapsis
             ▲
             │ r_p
             │
   Focus ────┼──────────────► θ = 0
  (central   │
   mass)     │
             │
             ▼
          Apoapsis (ellipse) or asymptote (hyperbola)
r = p / (1 + e cos θ)
p = h²/μ
e < 1 closed ellipse
e = 1 parabola
e > 1 hyperbola opening to the right
```

## 9. The memory technique
**The hook** — Picture the Sun as a glowing thumbtack pinning one focus of a paper ellipse; the string loop that traces the orbit always has one end fixed at that tack, never at the geometric center.

**What to overlearn** — The orbit equation \(r=p/(1+e\cos\theta)\), the energy–eccentricity link \(e=\sqrt{1+2\varepsilon h^2/\mu^2}\), and the three energy regimes.

**Spaced-repetition schedule** — Re-derive the orbit equation after 1 day, classify five random orbits after 3 days, solve an escape-trajectory problem after 7 days, design a GTO after 16 days, and compute an interstellar hyperbola after 35 days.

**First-principles fallback** — Start from \(\ddot{\mathbf{r}}=-\mu\mathbf{r}/r^3\), cross with \(\mathbf{h}\), change variable to \(u(\theta)\), integrate the resulting linear ODE.

## 10. What this unlocks
Mastery of conic-section orbits supplies the reference trajectories required for all subsequent patched-conic mission design, Lambert targeting, and perturbation theory.

- Two-body to n-body transition via osculating elements  
- Lambert’s problem for rendezvous  
- Sphere-of-influence patching for planetary flybys  
- Orbital-element sets and Keplerian propagation  
- Introduction to the restricted three-body problem

## 11. Self-check — five questions, no answers
1. A spacecraft at 7000 km radius has speed 8 km s⁻¹ and flight-path angle 0°. Is the trajectory elliptical, parabolic, or hyperbolic?  
2. Derive the semi-latus rectum p directly from angular momentum without using energy.  
3. Show that the radial distance at true anomaly 90° equals p for any eccentricity.  
4. A hyperbolic excess speed of 3 km s⁻¹ is measured at infinity relative to Earth. Compute the eccentricity when the probe crosses Earth’s sphere of influence at 925 000 km.  
5. Explain why two orbits with identical semi-major axes but different eccentricities have different specific angular momenta.