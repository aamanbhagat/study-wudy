## 1. The one-sentence answer
**Kepler’s first law states that planets move in elliptical orbits with the central body at one focus, which is why the ellipse is the most important conic section for orbital mechanics.**

Isaac Newton later showed that this ellipse arises directly from an inverse-square gravitational force. The orbit equation in polar coordinates turns out to be the same polar equation that defines an ellipse with one focus at the origin. This single fact explains why every closed orbit under gravity is an ellipse (or a circle, which is a special ellipse) rather than any other curve.

The deeper reason is conservation of angular momentum combined with the 1/r potential. Angular momentum keeps motion in a plane; the inverse-square force then forces the radial distance to satisfy the ellipse equation. Once you accept these two conservation laws, the ellipse appears automatically.

> [!NOTE]
> The single “aha” moment is that the mathematical definition of an ellipse (sum of distances to two foci is constant) is exactly the geometric condition produced by balancing gravitational attraction with centrifugal repulsion in the rotating frame of the orbiting body.

## 2. Why this matters — concrete and current
SpaceX re-uses Falcon 9 first stages by targeting precise elliptical transfer orbits whose apogee and perigee are calculated from the vis-viva equation derived from Kepler’s ellipse law.  

NASA’s Parker Solar Probe repeatedly uses Venus gravity assists to shrink its elliptical orbit around the Sun, reaching a perihelion of 6.9 million km; every trajectory correction is an application of the same focus property.  

The European Space Agency’s Gaia spacecraft sits at the Sun–Earth L2 point on a small-amplitude elliptical halo orbit; station-keeping burns are planned using the same conic-section parameters that Kepler discovered empirically.  

Global navigation satellites (GPS, Galileo, BeiDou) broadcast ephemerides that assume each satellite follows a Keplerian ellipse; receivers solve for position by intersecting these elliptical paths with the user’s sphere.  

Exoplanet detection pipelines (e.g., those used by TESS and CHEOPS) fit observed radial-velocity curves to Keplerian elliptical orbits; the fitted eccentricity and semi-major axis directly give planetary mass and orbital distance.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Polar coordinates        | Orbit equation is simplest in (r, θ) with focus at pole   |
| Definition of ellipse    | Sum of distances to two foci is constant                  |
| Angular momentum         | L = m r² dθ/dt is conserved, forcing planar motion        |
| Inverse-square force     | Leads to the differential equation whose solution is 1/r  |

If any row above is unfamiliar, pause and master it before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Gravity supplies a central force
A central force produces no torque, so angular momentum L is conserved. The planet therefore stays in a fixed plane and its areal velocity is constant (Kepler’s second law).  

Concrete example: a comet at 5 AU feels the Sun’s pull directed exactly toward the Sun; no sideways component exists, hence L remains fixed.  

Formal statement: torque τ = r × F = 0 when F is parallel to r, therefore dL/dt = 0.

> [!WARNING]
> If you forget that the force must be exactly radial, you will incorrectly allow out-of-plane motion and lose the planar orbit.

### Step 2 — Reduce the two-body problem to one body
Replace the Sun–planet system by a single body of reduced mass μ orbiting a fixed mass M at the origin. The relative vector r satisfies the same equation as a planet around a fixed Sun.

### Step 3 — Write the radial equation using effective potential
Conservation of energy and angular momentum gives  
$$
\frac{1}{2}\mu\dot{r}^2 + \frac{L^2}{2\mu r^2} - \frac{GM\mu}{r} = E.
$$

### Step 4 — Change variable to u = 1/r and differentiate
Differentiating with respect to θ yields the linear ODE  
$$
\frac{d^2u}{d\theta^2} + u = \frac{GM\mu^2}{L^2}.
$$

### Step 5 — Solve the ODE
The general solution is  
$$
u = \frac{GM\mu^2}{L^2} + A\cos(\theta - \theta_0).
$$
Choosing the coordinate so that θ₀ = 0 gives  
$$
r = \frac{p}{1 + e\cos\theta},
$$
where p = L²/(GMμ²) is the semi-latus rectum and e = (AL²)/(GMμ²) is the eccentricity.

### Step 6 — Identify the polar equation with the ellipse
When e < 1 the denominator never vanishes and r remains bounded; the curve is an ellipse with one focus at the origin. This is Kepler’s first law recovered from Newton’s law of gravitation.

### Step 7 — Link eccentricity to total energy
E = −GMμ/(2a) where a is the semi-major axis. Negative energy implies a closed ellipse; zero energy gives a parabola; positive energy gives a hyperbola.

## 5. Worked examples — har step show karo

**Example 1 — Circular orbit**  
*Given:* A satellite at r = 7000 km with speed chosen so the orbit is circular.  
*Find:* eccentricity e.  
From the polar equation, for a circle the focus must lie at the centre, so e = 0.  
**Final answer**  
**e = 0**  
*Reflection:* This is the boundary case of an ellipse; any small perturbation raises e but keeps the orbit elliptical.

**Example 2 — Halley’s comet**  
*Given:* Perihelion 0.586 AU, aphelion 35.1 AU.  
*Find:* eccentricity.  
Semi-major axis a = (0.586 + 35.1)/2 = 17.843 AU.  
e = (aphelion − perihelion)/(aphelion + perihelion) = 34.514/35.686 ≈ 0.967.  
**Final answer**  
**e ≈ 0.967**  
*Reflection:* High eccentricity still yields a perfect ellipse; only the Sun’s position moves close to the edge.

**Example 3 — Escape trajectory**  
*Given:* Total energy E = 0.  
*Find:* type of conic.  
From E = −GMμ/(2a) we obtain a → ∞, hence e = 1.  
**Final answer**  
**parabolic escape orbit**  
*Reflection:* The same algebra that produced the ellipse now produces the parabola when energy is exactly zero.

**Example 4 — Hyperbolic fly-by**  
*Given:* Voyager 2’s solar hyperbolic excess speed 5 km/s.  
*Find:* eccentricity.  
Using the relation e = √(1 + 2EL²/(G²M²μ³)) > 1.  
**Final answer**  
**e > 1 (hyperbola)**  
*Reflection:* The same focus property continues to hold; the trajectory is the other branch of the conic family.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Placing the Sun at the ellipse centre | Students confuse geometric centre with focus | Always draw the empty focus and label the Sun at one focus |
| Forgetting e < 1 for bound orbits | Mixing energy sign with eccentricity        | Check E < 0 before claiming an ellipse       |
| Using Cartesian equation too early | Polar form hides the focus immediately      | Derive polar form first, convert to Cartesian only if asked |
| Ignoring reduced mass             | Treating planet mass as negligible without justification | Write μ explicitly until you verify M ≫ m    |
| Confusing semi-latus rectum p with semi-major axis a | Both appear in the polar equation           | Remember p = a(1 − e²)                       |
| Assuming every orbit is elliptical | Forgetting positive-energy scattering       | Always compute total energy before naming the conic |

## 7. The textbook-precise statement
Kepler’s first law, derived from Newton’s law of universal gravitation, asserts that every planet moves in an elliptical orbit with the Sun at one focus. In polar coordinates with origin at the focus the trajectory satisfies  
$$
r(\theta)=\frac{\frac{l^{2}}{GMm^{2}}}{1+e\cos\theta},\qquad e=\sqrt{1+\frac{2El^{2}}{G^{2}M^{2}m^{3}}},
$$
where l is the constant angular momentum, E < 0 is the total mechanical energy, and the condition 0 ≤ e < 1 selects the closed elliptical orbit. (See Goldstein, Poole & Safko, *Classical Mechanics*, 3rd ed., §3.3.)

## 8. Visual — diagram or schematic
```
          empty focus          Sun (true focus)
               •                     •
                \                   / 
                 \                 /  
                  \               /   
                   \             /    
                    \           /     
                     \         /      
                      \       /       
                       \     /        
                        \   /         
                         \ /          
                          • planet    
                    ellipse curve
```
The two foci are separated by distance 2ae. The Sun sits at one focus; the empty focus has no physical object. The planet’s path is the closed curve where the sum of distances to both foci remains exactly 2a.

## 9. The memory technique
1. **The hook** — Picture the Sun “tugging” at one focus while an invisible twin focus keeps the string length constant; the planet is the pencil tracing the ellipse.  
2. **What to overlearn** — r = p/(1 + e cos θ) and E = −GMμ/(2a).  
3. **Spaced-repetition schedule** — Review the polar equation after 1 day, 3 days, 7 days, 16 days and 35 days.  
4. **First-principles fallback** — Start from angular-momentum conservation, form the effective potential, change variable to u = 1/r, solve the resulting harmonic-oscillator ODE.

## 10. What this unlocks
- Orbital elements and the six Keplerian parameters used in every mission-design software.  
- Derivation of Kepler’s third law (T² ∝ a³) from the ellipse area and period.  
- Transition to hyperbolic escape trajectories and gravitational slingshots.  
- Foundation for perturbation theory when additional bodies or oblateness are added.

## 11. Self-check — five questions, no answers
1. A satellite orbit has perigee 300 km and apogee 1000 km above Earth; compute its eccentricity.  
2. Show that the polar orbit equation reduces to a circle when e = 0.  
3. If total energy E is doubled but still negative, does the orbit remain elliptical? What changes?  
4. Why must the empty focus of a comet’s orbit lie outside the solar system when e > 0.9?  
5. A spacecraft performs a burn that raises E from negative to zero; which conic replaces the original ellipse and why?