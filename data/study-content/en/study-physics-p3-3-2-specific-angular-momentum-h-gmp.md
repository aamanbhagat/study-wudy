## 1. The one-sentence answer
**Specific angular momentum magnitude equals the square root of the product of the gravitational parameter and the semi-latus rectum: \( h = \sqrt{GM p} \).**

This equality follows directly from conservation of angular momentum in a central-force field. The cross product \(\vec{r} \times \vec{v}\) yields a constant vector \(\vec{h}\) whose magnitude never changes along a Keplerian trajectory. When the trajectory equation is written in polar form, the denominator contains the constant \( p = h^2 / \mu \), where \(\mu = GM\). Solving for \( h \) immediately produces the square-root relation.

The result is geometry-independent within the two-body problem: it holds for ellipses, parabolas, and hyperbolas alike. It therefore supplies the single scalar that fixes the size of any conic-section orbit once the attracting mass is known.

> [!NOTE]
> The square-root form is not an approximation; it is an exact algebraic identity once the orbit equation is derived from the inverse-square law.

## 2. Why this matters — concrete and current
SpaceX’s Starlink constellation maintenance relies on precise knowledge of \( h \) to compute the semi-latus rectum that keeps each satellite at the correct altitude after a plane-change burn; any miscalculation of \( p \) produces rapid along-track drift that must be corrected with extra propellant.

NASA’s Artemis I trajectory designers used the same relation to size the trans-lunar injection orbit; the value of \( h \) determined the exact perigee radius that satisfied both the SLS upper-stage performance limit and the lunar encounter geometry.

The European Space Agency’s Sentinel-1 radar satellites employ \( h = \sqrt{\mu p} \) in their routine orbit-maintenance software to convert measured semi-latus rectum back into required delta-v, enabling sub-meter ground-track repeatability over multi-year missions.

In astrophysics, the same formula converts observed semi-latus recta of circumbinary planets (e.g., Kepler-16b) into specific angular momentum, allowing direct comparison with formation models that predict angular-momentum transport during disk migration.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector cross product     | Defines \(\vec{h}\) from position and velocity            |
| Two-body equation of motion | Guarantees that \(\vec{h}\) is constant                   |
| Polar conic-section equation | Supplies the geometric parameter \( p \)                  |
| Gravitational parameter \(\mu = GM\) | Converts the geometric size \( p \) into a dynamical quantity |

## 4. Building the idea — from intuition to formalism

### Step 1 — Angular momentum is conserved
A central gravitational force produces no torque, so the angular momentum of the orbiting body about the focus remains constant.  
Concrete example: a satellite at 300 km altitude with velocity perpendicular to the radius vector keeps the same \( r \times v \) magnitude at every point on its orbit.  
Formal statement:  
\[ \frac{d\vec{h}}{dt} = \vec{r} \times \vec{a} = 0 \quad \Rightarrow \quad \vec{h} = \text{constant}. \]  
> [!WARNING] Treating gravity as non-central (e.g., adding J2) immediately destroys constancy of \(\vec{h}\).

### Step 2 — Magnitude definition
The specific angular momentum vector is the cross product of position and velocity:  
\[ \vec{h} = \vec{r} \times \vec{v}. \]  
Its magnitude \( h = |\vec{h}| \) is the scalar we carry forward.

### Step 3 — Orbit equation derivation
Integration of the two-body equation yields the trajectory equation  
\[ r = \frac{h^2 / \mu}{1 + e \cos\theta}. \]  
The numerator is identified as the semi-latus rectum \( p \), giving the geometric relation  
\[ p = \frac{h^2}{\mu}. \]

### Step 4 — Algebraic inversion
Solving the previous equation for the scalar \( h \) produces the target expression  
\[ h = \sqrt{\mu p}. \]  
This is the textbook statement of the subtopic.

## 5. Worked examples — every step shown

**Example 1 — Low-Earth circular orbit**  
*Given:* Altitude 400 km, Earth radius 6371 km, \(\mu = 3.986 \times 10^5\) km³ s⁻².  
*Find:* \( h \).  
Step 1: Compute radius \( r = 6371 + 400 = 6771 \) km.  
*Why:* Altitude is measured from surface; add Earth radius.  
Step 2: For a circle, \( p = r \).  
*Why:* Semi-latus rectum equals radius when eccentricity is zero.  
Step 3: Substitute into formula:  
\[ h = \sqrt{3.986 \times 10^5 \times 6771} = 5.192 \times 10^4 \] km² s⁻¹.  
**\( 5.192 \times 10^4 \) km² s⁻¹**  
*Reflection:* The calculation is direct once \( p = r \) is recognized; the same arithmetic applies to any circular parking orbit.

**Example 2 — Elliptical orbit with known perigee and apogee**  
*Given:* \( r_p = 7000 \) km, \( r_a = 10000 \) km, \(\mu = 3.986 \times 10^5\) km³ s⁻².  
*Find:* \( h \).  
Step 1: Semi-latus rectum \( p = \frac{2 r_p r_a}{r_p + r_a} \).  
*Why:* Standard identity for ellipse.  
Step 2: \( p = 8235.3 \) km.  
Step 3: \( h = \sqrt{\mu p} = 5.726 \times 10^4 \) km² s⁻¹.  
**\( 5.726 \times 10^4 \) km² s⁻¹**  
*Reflection:* The formula bypasses eccentricity entirely; only the product \( r_p r_a \) matters.

**Example 3 — Parabolic escape trajectory**  
*Given:* Perigee radius 6671 km, \(\mu = 3.986 \times 10^5\) km³ s⁻².  
*Find:* \( h \).  
Step 1: For parabola \( e = 1 \), so \( p = 2 r_p \).  
*Why:* Denominator vanishes at \(\theta = 180^\circ\).  
Step 2: \( p = 13342 \) km.  
Step 3: \( h = \sqrt{\mu p} = 7.289 \times 10^4 \) km² s⁻¹.  
**\( 7.289 \times 10^4 \) km² s⁻¹**  
*Reflection:* The same square-root expression works for escape orbits; only the geometric definition of \( p \) changes.

**Example 4 — Hyperbolic excess velocity given**  
*Given:* \( r_p = 8000 \) km, \( v_\infty = 3 \) km s⁻¹, \(\mu = 3.986 \times 10^5\) km³ s⁻².  
*Find:* \( h \).  
Step 1: Energy gives \( a = -\mu / v_\infty^2 = -4.429 \times 10^4 \) km.  
*Why:* Vis-viva at infinity fixes semi-major axis.  
Step 2: \( p = a(e^2 - 1) \), and \( e = 1 + r_p / |a| = 1.181 \).  
Step 3: \( p = 1.509 \times 10^4 \) km.  
Step 4: \( h = \sqrt{\mu p} = 7.752 \times 10^4 \) km² s⁻¹.  
**\( 7.752 \times 10^4 \) km² s⁻¹**  
*Reflection:* The route via energy and eccentricity still terminates at the identical square-root formula.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using semi-major axis \( a \) instead of \( p \) | Confusing ellipse size parameters           | Always compute \( p = a(1-e^2) \) first              |
| Forgetting units of \(\mu\)       | Mixed km and m in the same calculation      | Convert everything to consistent units before substituting |
| Applying the formula inside atmosphere | Drag destroys two-body constancy of \( h \) | Verify that altitude > 150 km before use             |
| Treating \( h \) as a vector when only magnitude is required | Vector cross product yields direction too   | Compute magnitude only after confirming scalar context |
| Using Earth \(\mu\) for other planets | Defaulting to familiar constants            | Look up the correct \( GM \) for the central body    |
| Ignoring that \( p \) is measured from focus | Thinking \( p \) is a diameter              | Recall the polar equation is written from the focus  |
| Sign error in hyperbolic \( a \)  | Negative energy convention confusion        | Keep \( a < 0 \) explicit in all hyperbolic algebra  |

## 7. The textbook-precise statement
In the two-body problem with inverse-square gravitation, the magnitude of the specific angular momentum is related to the semi-latus rectum \( p \) of the osculating conic by the exact identity  
\[ h = \sqrt{\mu p}, \]  
where \(\mu = GM\) is the gravitational parameter of the central body. This follows at once from the orbit equation  
\[ r = \frac{p}{1 + e \cos\theta} \]  
after substitution of \( p = h^2 / \mu \). (See Curtis, *Orbital Mechanics for Engineering Students*, 3e, §2.4, Eq. 2.29.)

## 8. Visual — diagram or schematic
```text
Focus (central body)
        •
       / \          r(θ)
      /   \         ↑
     /     \        |
    /       \       |
   /         \      |
  /           \     |
 /             \    |
/---------------\--> θ
     p (semi-latus rectum)
     (perpendicular distance at θ = 90°)
```
The diagram shows a general conic with focus at the origin, true anomaly θ, radial distance r, and the constant semi-latus rectum p measured perpendicular to the axis at 90° from periapsis.

## 9. The memory technique
1. **The hook** — Picture a ruler held at the focus of an orbit; its length is exactly \( p \). The angular-momentum “spin” needed to keep the spacecraft on that ruler is the square root of \(\mu\) times ruler length.
2. **What to overlearn** — \( h = \sqrt{\mu p} \), \( p = h^2 / \mu \), and the fact that \( h \) is constant.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the orbit equation from \(\ddot{\vec{r}} = -\mu \vec{r}/r^3\), integrate once to obtain \(\vec{h}\), then convert the resulting differential equation into polar form.

## 10. What this unlocks
Mastery of \( h = \sqrt{\mu p} \) supplies the constant that appears in every subsequent orbital relation: specific mechanical energy, time-of-flight equations, and Lambert’s problem.

- Vis-viva equation \( v^2 = \mu(2/r - 1/a) \)
- Flight-path angle formula \(\tan\phi = (e \sin\theta)/(1 + e \cos\theta)\)
- Universal variable formulation of Lambert’s theorem
- Gauss variational equations for orbital-element rates

## 11. Self-check — five questions, no answers
1. A satellite has \( r = 8000 \) km and velocity 9 km s⁻¹ perpendicular to radius; compute \( h \) directly from the cross-product definition and again from \( p \). Do the two values match?

2. Why does the same algebraic expression \( h = \sqrt{\mu p} \) apply equally to an elliptical Molniya orbit and a hyperbolic planetary fly-by?

3. If atmospheric drag slowly reduces \( h \), what happens to the semi-latus rectum? Derive the differential relation.

4. A proposed Mars transfer orbit lists perigee radius and eccentricity but omits \( p \). Which single additional datum lets you compute \( h \) without finding \( e \) first?

5. In the presence of a small third-body perturbation, which assumption used to obtain \( h = \sqrt{\mu p} \) is violated first, and what observable signature appears in the osculating elements?