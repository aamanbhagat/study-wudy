## 1. The one-sentence answer
**The patched conic method designs interplanetary trajectories by dividing the flight path into successive Keplerian conic sections, each governed by a single dominant central body inside its sphere of influence, and matching position and velocity at the boundaries.**

In the solar system the Sun dominates most of the journey, while a planet dominates only inside a limited region around itself. The method therefore replaces the full n-body problem with a sequence of two-body problems whose solutions are joined at the sphere-of-influence surfaces. The resulting trajectory is a heliocentric ellipse (or hyperbola) patched to a planetocentric hyperbola at departure and another at arrival.

This approximation is accurate enough for preliminary mission design because the sphere of influence of a planet is small compared with the distance between planets; outside those small spheres the Sun’s gravity overwhelms the planet’s. The errors that remain are corrected later by high-fidelity numerical integration.

> [!NOTE]
> The single most important insight is that velocity is continuous across each patch point; only the central body changes, so the same velocity vector is simply re-expressed in a new two-body frame.

## 2. Why this matters — concrete and current
NASA’s Jet Propulsion Laboratory used the patched-conic technique to design the Voyager 1 and 2 gravity-assist tours; the 1977 launch windows and subsequent Jupiter–Saturn–Uranus–Neptune sequence were first computed with patched conics before any n-body refinement.  
SpaceX’s 2020s Earth–Mars cargo trajectories for Starship are sized with patched-conic departure C3 values and arrival V∞ targets; these numbers set the propellant budget for the Raptor engines and the timing of trans-Mars injection burns.  
ESA’s Juice mission to Jupiter employed patched-conic lunar-gravity-assist chains to reduce launch mass; the 2023 trajectory was first validated with conic patches before full ephemeris optimization.  
Commercial asteroid-mining studies (AstroForge, TransAstra) rely on patched-conic pork-chop plots to screen thousands of near-Earth-object encounter opportunities within a single Earth-return cycle.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Two-body conic orbits    | Every segment of the patched trajectory is a conic        |
| Sphere of influence (SOI)| Defines the exact radius at which the central body switches |
| Hyperbolic excess velocity V∞ | Quantifies the energy of arrival and departure hyperbolas |
| Heliocentric transfer orbits | Supplies the cruise velocity that must be matched at each patch |

## 4. Building the idea — from intuition to formalism

### Step 1 — Define the sphere of influence
The sphere of influence marks the distance at which a planet’s gravitational acceleration equals the Sun’s tidal acceleration on the spacecraft.  
For a planet of mass m orbiting the Sun of mass M at distance r, the SOI radius is  
$$ r_{\text{SOI}} \approx r \left( \frac{m}{M} \right)^{2/5}. $$  
If this radius is miscalculated by even 10 %, the patch point velocity mismatch grows linearly with distance and produces unacceptable arrival errors.

### Step 2 — Choose the heliocentric transfer conic
Select an ellipse (or hyperbola) whose perihelion and aphelion connect the departure and arrival planets’ orbits at the desired epochs.  
The vis-viva equation supplies the heliocentric speed at any true anomaly:  
$$ v = \sqrt{GM_{\odot}\left( \frac{2}{r} - \frac{1}{a} \right)}. $$  
Omitting the correct semimajor axis a produces the wrong heliocentric velocity and therefore the wrong V∞ at both ends.

### Step 3 — Transform to planetocentric departure hyperbola
At the departure planet’s SOI, subtract the planet’s heliocentric velocity vector from the spacecraft’s heliocentric velocity to obtain the hyperbolic excess velocity V∞.  
The planetocentric speed at any radius r inside the SOI is then  
$$ v = \sqrt{V_{\infty}^2 + \frac{2\mu}{r}}. $$  
Reversing the subtraction order yields a velocity error whose magnitude equals twice the planet’s orbital speed.

### Step 4 — Size the departure hyperbola and parking-orbit Δv
The impact parameter b and turning angle δ of the hyperbola are fixed by V∞ and the desired periapsis altitude.  
The Δv required to escape a circular parking orbit of radius r_p is  
$$ \Delta v = \sqrt{V_{\infty}^2 + \frac{2\mu}{r_p}} - \sqrt{\frac{\mu}{r_p}}. $$  
Using the wrong periapsis radius changes the propellant load by hundreds of metres per second.

### Step 5 — Repeat the procedure at arrival
At the target planet’s SOI the incoming V∞ is again the difference between heliocentric velocities.  
A second hyperbola is constructed; its periapsis radius determines capture Δv or fly-by altitude.  
The final textbook statement of the method is therefore: “A patched-conic interplanetary trajectory is the C1-continuous union of three (or more) Keplerian conics joined at successive SOI boundaries.”

## 5. Worked examples — every step shown

**Example 1 — Minimum-energy Earth–Mars Hohmann departure V∞**  
*Given:* Earth at 1 AU, Mars at 1.524 AU, circular orbits, μ⊙ = 1.327 × 10²⁰ m³ s⁻².  
*Find:* V∞ relative to Earth.  
Heliocentric transfer semimajor axis:  
$$ a = \frac{1 + 1.524}{2} = 1.262\,\text{AU}. $$  
*Why:* Average of perihelion and aphelion radii.  
Speed at Earth distance:  
$$ v_{\text{sc}} = \sqrt{\mu_{\odot}\left( \frac{2}{1} - \frac{1}{1.262} \right)} = 32.73\,\text{km s}^{-1}. $$  
*Why:* Vis-viva evaluated at r = 1 AU.  
Earth’s orbital speed: 29.78 km s⁻¹.  
Thus  
$$ V_{\infty} = 32.73 - 29.78 = 2.95\,\text{km s}^{-1}. $$  
**2.95 km s⁻¹**  
*Reflection:* The subtraction is a pure vector difference along the tangential direction for a Hohmann transfer; any phase-angle error appears only in later examples.

**Example 2 — Earth departure Δv from 300 km LEO**  
*Given:* V∞ = 2.95 km s⁻¹, μ⊕ = 3.986 × 10¹⁴ m³ s⁻², r_p = 6678 km.  
*Find:* Δv.  
Escape speed at r_p:  
$$ v_{\text{esc}} = \sqrt{V_{\infty}^2 + \frac{2\mu}{r_p}} = 11.27\,\text{km s}^{-1}. $$  
*Why:* Hyperbolic speed formula.  
Circular speed:  
$$ v_{\text{circ}} = \sqrt{\frac{\mu}{r_p}} = 7.73\,\text{km s}^{-1}. $$  
*Why:* Two-body circular-orbit relation.  
Δv = 11.27 − 7.73 = 3.54 km s⁻¹.  
**3.54 km s⁻¹**  
*Reflection:* Parking-orbit altitude enters only through the circular-speed term; a 100 km change alters Δv by ~30 m s⁻¹.

**Example 3 — Mars arrival V∞ and capture Δv**  
*Given:* Same Hohmann orbit, Mars orbital speed 24.13 km s⁻¹.  
*Find:* Arrival V∞ and Δv to 300 km orbit.  
Heliocentric speed at 1.524 AU: 21.48 km s⁻¹.  
V∞ = |21.48 − 24.13| = 2.65 km s⁻¹.  
Capture Δv calculation identical in form to Example 2 yields 2.10 km s⁻¹.  
**2.65 km s⁻¹, 2.10 km s⁻¹**  
*Reflection:* Arrival V∞ is smaller than departure V∞ because the spacecraft is climbing out of the Sun’s gravity well.

**Example 4 — Non-tangential patch with plane change**  
*Given:* Out-of-plane V∞ component 0.8 km s⁻¹, in-plane 2.8 km s⁻¹.  
*Find:* Total V∞ magnitude.  
$$ V_{\infty} = \sqrt{2.8^2 + 0.8^2} = 2.91\,\text{km s}^{-1}. $$  
**2.91 km s⁻¹**  
*Reflection:* Vector addition at the SOI boundary is mandatory once the transfer plane differs from the planet’s orbital plane.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Treating V∞ as scalar             | Velocity subtraction is vectorial                   | Always subtract vector heliocentric velocities       |
| Using planet radius instead of SOI| SOI is ~100 times larger than planetary radius      | Compute r_SOI explicitly before patching             |
| Ignoring planetary rotation       | Launch site velocity adds to V∞                     | Add launch-site vector in topocentric frame          |
| Assuming instantaneous burn       | Finite burn time moves the patch point              | Iterate burn arc or use gravity-loss corrections     |
| Forgetting solar gravity inside SOI | Planetocentric hyperbola is only an approximation | Verify that solar perturbation < 5 % of planet’s μ   |
| Wrong epoch for planetary positions | Planets move during cruise                        | Use ephemeris at both departure and arrival epochs   |
| Sign error in arrival V∞          | Subtraction order reversed                          | Adopt consistent “spacecraft minus planet” convention|

## 7. The textbook-precise statement
A patched-conic trajectory is a piecewise-C¹ curve x(t) such that on each interval [t_i, t_{i+1}] the motion satisfies the two-body equation  
$$ \ddot{\mathbf{r}} = -\frac{\mu_i}{r^3}\mathbf{r} $$  
with μ_i belonging to a single central body whose sphere of influence contains the arc. At each boundary t_i the position and velocity are required to be continuous while the central body index changes. (See Bate, Mueller & White, *Fundamentals of Astrodynamics*, 1971, §8.4.)

## 8. Visual — diagram or schematic
```text
Sun
  •
   \ 
    \  heliocentric ellipse (a = 1.262 AU)
     \ 
      Earth SOI (r≈9.25e5 km)   Mars SOI (r≈5.76e5 km)
       ( )                       ( )
        \ departure hyperbola     / arrival hyperbola
         \                       /
          \                     /
           \                   /
            Earth   -------------->   Mars
```
Axes: radial distance in AU, tangential angle in degrees. The two small circles are drawn to scale relative to the 1–1.524 AU separation; the hyperbolae asymptotes meet the heliocentric ellipse tangentially at the SOI boundaries.

## 9. The memory technique
1. **The hook** — Picture a railway map where each planet is a tiny station whose platform radius equals its SOI; the train follows perfect circular arcs inside each station and perfect ellipses between stations, switching tracks without a jerk.  
2. **What to overlearn** — r_SOI scaling, V∞ vector subtraction, vis-viva at patch points.  
3. **Spaced-repetition schedule** — 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the SOI radius from equating gravitational accelerations, then subtract heliocentric velocities to obtain V∞, then apply the hyperbolic speed formula at any desired periapsis.

## 10. What this unlocks
Patched-conic results supply the initial guess for high-fidelity optimizers and the Δv budgets used in preliminary design reviews.  
- Gravity-assist sequencing (V∞ leveraging)  
- Pork-chop contour plots for launch windows  
- Sphere-of-influence patched n-body integrators  
- Low-thrust trajectory blending with impulsive patches  
- Fly-by corridor and impact-parameter targeting

## 11. Self-check — five questions, no answers
1. Compute the SOI radius of Venus in kilometres given its orbital radius 0.723 AU and mass ratio 2.45 × 10^{-6}.  
2. A spacecraft departs Earth with V∞ = 3.2 km s⁻¹ tangential; what is its heliocentric speed at 1 AU?  
3. Why does reversing the order of vector subtraction at arrival produce a physically impossible negative capture Δv?  
4. For a fixed transfer semimajor axis, how does raising the departure parking-orbit altitude affect total Δv?  
5. Sketch the geometry that would cause a patched-conic trajectory to violate the C¹ continuity condition at an SOI boundary.