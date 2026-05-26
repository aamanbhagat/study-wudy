## 1. The one-sentence answer
**A Hohmann transfer is the unique two-impulse elliptical trajectory that moves a spacecraft between two coplanar circular orbits while expending the least possible propellant.**

Two circular orbits share a common focus at the central body. The transfer ellipse is chosen so its periapsis radius equals the inner orbit radius and its apoapsis radius equals the outer orbit radius; the spacecraft therefore requires only a single tangential burn to enter the ellipse and a second tangential burn to circularize at the target. Because specific orbital energy depends solely on semi-major axis, any other connecting path either lengthens the semi-major axis (raising energy) or demands additional plane-change or curvature losses.

The same geometry also guarantees that the velocity increments are the smallest possible pair that can link the two orbits: the first burn raises apoapsis exactly to the target radius, and the second burn removes the remaining velocity deficit at apoapsis.

> [!NOTE]
> The Hohmann ellipse is tangent to both circles at the burn points; any faster or slower transfer must intersect one of the circles at a non-tangential angle and therefore requires an extra normal velocity component that wastes propellant.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 second stages routinely perform Hohmann transfers from a 200 km LEO parking orbit to the 35 786 km geostationary transfer orbit used by commercial comsats; the two-burn sequence saves roughly 1 km s⁻¹ of Δv compared with a direct ascent, extending payload mass by several hundred kilograms.

NASA’s Lucy mission used a Hohmann leg after its 2021 launch to reach the L4 Trojan asteroids; mission designers selected the transfer because its 0.8 km s⁻¹ total Δv fitted inside the Atlas V’s performance margin while keeping total flight time under 12 years.

The European Space Agency’s Juice spacecraft, launched in 2023, executes a sequence of Hohmann-type apogee-raising burns to escape Earth on a trajectory toward Jupiter; each burn is sized from the same vis-viva relation derived below, ensuring the probe arrives with the minimum hyperbolic excess velocity at Jupiter.

In the emerging cis-lunar economy, Blue Origin’s proposed cislunar tug architecture relies on repeated Hohmann transfers between low lunar orbit and a 70 000 km near-rectilinear halo orbit; propellant savings of 15 % versus bi-elliptic alternatives directly increase cargo throughput.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Two-body problem & gravitational parameter μ | Supplies the force law and the constant that appears in every velocity formula |
| Specific orbital energy ε = v²/2 − μ/r | Shows that energy—and therefore propellant—is determined only by semi-major axis |
| Vis-viva equation v = √[μ(2/r − 1/a)] | Gives instantaneous speed on any conic once radii and semi-major axis are known |
| Periapsis and apoapsis geometry | Defines the points where velocity is purely tangential and burns are most efficient |

## 4. Building the idea — from intuition to formalism

### Step 1 — Circular-orbit speed
A satellite in a circular orbit must travel at exactly the speed that makes gravitational acceleration provide the centripetal requirement.  
For radius r the speed is √(μ/r).  
$$v_\text{circ} = \sqrt{\frac{\mu}{r}}$$  
> [!WARNING]  
> Using the wrong radius (for example, altitude instead of radial distance) produces an immediate 5–10 % velocity error that propagates through every later Δv.

### Step 2 — Energy dictates semi-major axis
Specific energy ε fixes the semi-major axis a via ε = −μ/(2a).  
Any transfer orbit whose apogee reaches the outer radius r₂ must therefore possess semi-major axis a = (r₁ + r₂)/2.  
$$a_\text{H} = \frac{r_1 + r_2}{2}$$  
> [!WARNING]  
> Choosing a larger a increases total energy and therefore total Δv; choosing a smaller a never reaches r₂.

### Step 3 — Velocity on the transfer ellipse
Apply the vis-viva equation at the inner radius r₁ on the Hohmann ellipse.  
$$v_1^- = \sqrt{\mu\left(\frac{2}{r_1} - \frac{2}{r_1+r_2}\right)} = \sqrt{\frac{\mu r_2}{r_1(r_1+r_2)}}$$  
The same equation evaluated at r₂ yields the apogee speed v₂⁻.

### Step 4 — First impulse
Subtract the original circular speed from the new perigee speed.  
$$\Delta v_1 = v_1^- - v_{\text{circ},1}$$  
This tangential burn raises apogee exactly to r₂.

### Step 5 — Second impulse
At apogee the spacecraft is slower than the target circular speed; the second tangential burn supplies the deficit.  
$$\Delta v_2 = v_{\text{circ},2} - v_2^-$$  
Total propellant cost is Δv₁ + Δv₂.

### Step 6 — Proof of minimality
Any other connecting trajectory either has a larger semi-major axis (higher energy) or intersects a circular orbit at a non-zero flight-path angle, requiring an additional normal Δv component. Both increase the sum of the two impulses; hence the Hohmann pair is minimal.

## 5. Worked examples — every step shown

**Example 1 — Earth LEO to GEO**  
*Given:* r₁ = 6678 km, r₂ = 42 164 km, μ = 3.986 × 10⁵ km³ s⁻².  
*Find:* Δv₁ and Δv₂.  
Step 1: a_H = (6678 + 42 164)/2 = 24 421 km.  
*Why:* average of the two radii.  
Step 2: v₁⁻ = √[μ(2/r₁ − 1/a_H)] = 10.15 km s⁻¹.  
*Why:* vis-viva at perigee.  
Step 3: v_circ,1 = √(μ/r₁) = 7.73 km s⁻¹.  
*Why:* circular speed formula.  
Step 4: Δv₁ = 10.15 − 7.73 = 2.42 km s⁻¹.  
*Why:* difference supplies the required energy.  
Step 5: v₂⁻ = √[μ(2/r₂ − 1/a_H)] = 1.61 km s⁻¹.  
Step 6: v_circ,2 = √(μ/r₂) = 3.07 km s⁻¹.  
Step 7: Δv₂ = 3.07 − 1.61 = 1.46 km s⁻¹.  
**2.42 km s⁻¹ + 1.46 km s⁻¹**  
*Reflection:* The numbers are standard; the algebra shows that Δv₂ is always smaller than Δv₁ for outward transfers.

**Example 2 — Same orbits, reverse direction**  
*Given:* identical radii, now transferring inward.  
*Find:* new impulses.  
The same ellipse is used; impulses simply swap roles and signs.  
**Δv₁ = 1.46 km s⁻¹ (retrograde), Δv₂ = 2.42 km s⁻¹ (retrograde)**  
*Reflection:* Direction of burn reverses but magnitudes remain identical.

**Example 3 — Sun–Earth to Sun–Mars**  
*Given:* r₁ = 1 AU, r₂ = 1.524 AU, μ_⊙ = 1.327 × 10¹¹ km³ s⁻².  
*Find:* total Δv.  
a_H = 1.262 AU.  
v₁⁻ = 32.73 km s⁻¹, v_Earth = 29.78 km s⁻¹ → Δv₁ = 2.95 km s⁻¹.  
v₂⁻ = 21.48 km s⁻¹, v_Mars = 24.13 km s⁻¹ → Δv₂ = 2.65 km s⁻¹.  
**Total 5.60 km s⁻¹**  
*Reflection:* Interplanetary case uses heliocentric μ; geometry unchanged.

**Example 4 — Non-coplanar 5° plane change at apogee**  
*Given:* previous Earth numbers plus 5° plane change performed at GEO.  
*Find:* extra Δv.  
Plane-change Δv = 2 v_circ,2 sin(Δi/2) = 0.27 km s⁻¹.  
Combined Δv₂ becomes √(1.46² + 0.27²) = 1.48 km s⁻¹.  
**Total Δv now 3.90 km s⁻¹**  
*Reflection:* Combined burn is cheaper than separate burns; illustrates why plane changes are cheapest at highest altitude.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using altitude instead of radius | Habit from everyday units | Always add Earth radius 6378 km before substituting |
| Forgetting that Δv₂ occurs at apoapsis | Visualising only the launch burn | Write both radii explicitly in every vis-viva call |
| Assuming the transfer is minimum-time | Confusing with continuous-thrust spirals | Recall that minimum energy ≠ minimum time |
| Applying the same formula for hyperbolic escape | Missing that Hohmann a must be finite | Check that a = (r₁ + r₂)/2 < ∞ |
| Neglecting the 180° transfer time | Mission planners forget half-period | Compute t = π √(a³/μ) once radii are known |
| Treating non-tangential burns as equal | Overlooking flight-path angle cosine loss | Enforce tangency at both terminals |
| Using two-body μ near third body | Sphere-of-influence edge cases | Patch conics only after confirming distances |

## 7. The textbook-precise statement
A Hohmann transfer orbit between two coplanar circular orbits of radii r₁ < r₂ is the elliptical orbit whose periapsis radius equals r₁ and apoapsis radius equals r₂. Its semi-major axis is therefore a = (r₁ + r₂)/2. The two impulsive Δv values required are  
$$\Delta v_1 = \sqrt{\frac{\mu r_2}{r_1(r_1+r_2)}} - \sqrt{\frac{\mu}{r_1}}, \qquad \Delta v_2 = \sqrt{\frac{\mu}{r_2}} - \sqrt{\frac{\mu r_1}{r_2(r_1+r_2)}}.$$  
Under the assumptions of Keplerian two-body motion, impulsive thrust, and coplanar orbits, this pair yields the globally minimum total Δv. (Bate, Mueller & White, *Fundamentals of Astrodynamics*, 1971, §6.3.)

## 8. Visual — diagram or schematic
```text
          apoapsis (r₂)
               *
              / \
             /   \
            /     \
   v₂⁻     /       \     v₂⁻
          /         \
         /           \
        *             *   ← circular orbit 2
       /               \
      /   transfer      \
     /     ellipse       \
    /                     \
   *-----------------------*  ← circular orbit 1
  periapsis (r₁)     v₁⁻, Δv₁ applied here
```
Axes: focus at origin; radial lines mark r₁ and r₂; velocity vectors drawn tangential at both terminals.

## 9. The memory technique
1. **The hook** — Picture an elliptical racetrack whose inner fence is LEO and outer fence is GEO; you only open the gate at the two points where the fences touch the track.  
2. **What to overlearn** — a = (r₁ + r₂)/2 and the two Δv expressions above.  
3. **Spaced-repetition schedule** — 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from vis-viva at r₁ and r₂ once a is fixed by the arithmetic mean of the radii.

## 10. What this unlocks
Mastery of the Hohmann transfer supplies the baseline against which every subsequent orbit-transfer technique is measured.  

- Bi-elliptic and bi-parabolic transfers become intelligible as simple extensions that trade time for propellant when r₂/r₁ > 11.94.  
- Lambert’s problem generalises the same boundary-value geometry to arbitrary points and times.  
- Low-thrust spiral trajectories are compared by their propellant mass against the impulsive Hohmann benchmark.  
- patched-conic interplanetary trajectories begin with a heliocentric Hohmann leg between planetary orbits.

## 11. Self-check — five questions, no answers
1. Derive the ratio Δv₁/Δv₂ as a function of r₂/r₁ and show it is always greater than unity for outward transfers.  
2. A satellite is in a 300 km circular orbit; compute the exact semi-major axis of the Hohmann ellipse that reaches 35 786 km altitude.  
3. Two circular orbits have radii 2R and 3R. Without numbers, prove that performing the plane change at apoapsis reduces total Δv compared with performing it at periapsis.  
4. Identify the mathematical step that fails if the two orbits are retrograde relative to each other.  
5. A proposed “fast” transfer uses an ellipse with a = 1.2(r₁ + r₂)/2. Calculate the extra Δv relative to Hohmann and state whether the trajectory still reaches r₂.