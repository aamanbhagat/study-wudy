## 1. The one-sentence answer
**The patched conic method approximates an interplanetary trajectory as a sequence of two-body conic sections joined at sphere-of-influence boundaries.**

Iska matlab yeh hai ki aap spacecraft ke path ko alag-alag gravitational regimes mein todte ho. Har regime mein sirf ek body (Sun ya planet) dominate karti hai, isliye local solution ek perfect conic (ellipse, hyperbola) hota hai. Boundaries par aap velocity aur position ko continuously match karte ho taaki overall path ek single smooth curve ban jaaye.

Yeh approximation isliye kaam karti hai kyunki sphere of influence ke bahar planetary gravity negligible ho jaati hai aur spacecraft essentially heliocentric motion karta hai. Andar enter karte hi planetary two-body problem local frame mein solve ho jaata hai.

> [!NOTE]
> The single most powerful insight is that you never solve the full n-body problem; you only solve a chain of analytically tractable two-body problems and “stitch” them at carefully chosen spheres.

## 2. Why this matters — concrete and current
NASA’s Parker Solar Probe mission designers used patched-conic segments to design the seven Venus gravity assists that lowered perihelion from 35 R⊙ to 9.86 R⊙; each leg was first computed as a heliocentric hyperbola patched to a Venus-centered hyperbola at the 3.7 × 10⁶ km sphere of influence.

SpaceX’s Starship lunar and Mars free-return trajectories are generated with the same technique inside their in-house Copernicus tool before high-fidelity n-body refinement; the initial guess for the trans-lunar injection Δv is taken directly from the patched-conic departure hyperbola.

ISRO’s Aditya-L1 halo orbit insertion was planned by patching an Earth-escape hyperbola to an SEL1-centered Lissajous transfer; the first guess for the 1.0 km s⁻¹ cruise Δv came from the patched-conic model.

Rosetta’s 2004–2014 comet trajectory contained four Earth and one Mars gravity assist; ESA’s mission analysis reports explicitly list the patched-conic leg energies (C₃) that were later optimized with full ephemeris.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Two-body conic orbits    | Every segment of the patched trajectory is a Keplerian conic |
| Sphere of influence (SOI) radius | Defines the exact patching surface where you switch central bodies |
| Hyperbolic excess velocity v∞ | Quantifies the spacecraft’s energy relative to the departure/arrival planet |
| Vis-viva equation        | Gives speed on any conic once you know semi-major axis and radius |
| Heliocentric vs planetocentric frames | You must transform velocity vectors at each patch point |

Agar aap inme se koi bhi weak ho to pehle us section ko padh lo; warna patching errors samajh nahi aayenge.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the dominant central body in each region
Aap dekhte ho ki spacecraft kis planet ke SOI ke andar hai. Bahar sirf Sun gravity count hoti hai.

Example: Earth se Mars jaate waqt, 9.25 × 10⁵ km ke andar Earth dominate karti hai; uske bahar Sun.

Formal statement:  
The sphere-of-influence radius of body P about primary S is  
$$ r_{\text{SOI}} = a_P \left( \frac{m_P}{m_S} \right)^{2/5} $$

> [!WARNING]
> Agar aap SOI radius galat lete ho to velocity vector discontinuity badi ho jaati hai aur Δv estimate 5–10 % galat ho sakta hai.

### Step 2 — Solve the heliocentric transfer conic
Departure planet ki position se arrival planet ki position tak ek Sun-centered ellipse (ya hyperbola) dhundho jo Lambert’s problem solve karta hai.

Formal statement: Given r₁, r₂ and transfer time t, find v₁ and v₂ such that  
$$ \mathbf{r}_2 = f(\mathbf{r}_1,\mathbf{v}_1,t) $$  
where f is the Keplerian propagation function.

### Step 3 — Compute planetocentric departure hyperbola
Heliocentric departure velocity se planet ki orbital velocity subtract karke hyperbolic excess velocity v∞ निकालो.

$$ \mathbf{v}_\infty^+ = \mathbf{v}_{\text{helio}} - \mathbf{v}_P $$

### Step 4 — Patch at the SOI surface
Position aur velocity dono ko match karo. Velocity transformation sirf vector subtraction hai; position continuity already guaranteed by construction.

### Step 5 — Repeat for arrival planet
Arrival par bhi v∞⁻ calculate karo aur local capture ya flyby hyperbola solve karo.

### Step 6 — Iterate if necessary
Agar total mission Δv ya time constraint violate hota hai to Lambert solver ko new guess ke saath dobara chalao.

## 5. Worked examples — har step show karo

**Example 1 — Earth to Mars Hohmann departure v∞**  
*Given:* Earth at 1 AU, Mars at 1.524 AU, circular orbits.  
*Find:* v∞ at Earth SOI for minimum-energy transfer.  

Step 1: Hohmann semi-major axis  
$$ a = \frac{1 + 1.524}{2} = 1.262\,\text{AU} $$  
Step 2: Vis-viva at Earth departure  
$$ v_{\text{dep}} = \sqrt{\mu_\odot\left(\frac{2}{1}- \frac{1}{1.262}\right)} = 32.73\,\text{km s}^{-1} $$  
*Why:* Vis-viva directly gives heliocentric speed on the transfer ellipse.  
Earth’s orbital speed = 29.78 km s⁻¹.  
$$ v_\infty = 32.73 - 29.78 = 2.95\,\text{km s}^{-1} $$  
**Final answer** 2.95 km s⁻¹  
*Reflection:* Simple subtraction works only because both velocities are tangential at Hohmann perihelion.

**Example 2 — Hyperbolic escape from Earth parking orbit**  
*Given:* 300 km LEO, v∞ = 2.95 km s⁻¹.  
*Find:* Required Δv at perigee.  

Escape hyperbola:  
$$ v_p = \sqrt{v_\infty^2 + \frac{2\mu_E}{r_p}} $$  
r_p = 6678 km, μ_E = 398600 km³ s⁻² → v_p = 11.32 km s⁻¹.  
Circular LEO speed = 7.73 km s⁻¹.  
Δv = 3.59 km s⁻¹.  
**Final answer** 3.59 km s⁻¹  
*Reflection:* The v∞ term shows that even a small heliocentric excess demands large Δv because you are deep in Earth’s gravity well.

(Examples 3 and 4 follow the same pattern for Mars arrival and Venus gravity-assist patch; they escalate by adding plane change and non-tangential v∞ vectors.)

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using planet radius instead of SOI radius | Students forget SOI is ~100× larger         | Always compute r_SOI from the 2/5 power law  |
| Forgetting to subtract planet velocity when computing v∞ | Vector reference frames mixed up            | Explicitly write v_helio − v_planet each time |
| Assuming v∞ direction is along the heliocentric velocity | Tangency assumption only true for Hohmann   | Solve full Lambert problem for arbitrary phase |
| Ignoring that SOI patch is not perfectly inertial | Frame rotation over finite time             | Use instantaneous vector match at epoch      |
| Treating arrival and departure v∞ as scalars only | Energy is scalar but direction matters for plane | Keep v∞ as a 3-vector throughout             |

## 7. The textbook-precise statement
“The patched-conic method consists of constructing a trajectory by joining successive Keplerian conic arcs at the boundaries of the spheres of influence of the attracting bodies. At each boundary the position vector is taken as continuous and the velocity vector is transformed from one two-body frame to the next by subtracting the velocity of the secondary body. The method yields a first-order analytic approximation whose accuracy is limited by the assumption that third-body perturbations are negligible inside each sphere of influence.” (Vallado, Fundamentals of Astrodynamics and Applications, 4e, §8.6)

## 8. Visual — diagram or schematic
```
Sun
  •
   \  heliocentric ellipse
    \ 
     \         SOI_Earth
      \       (circle ~9.25e5 km)
       \     /
        \   /   departure hyperbola
         \ / 
Earth •---x---> v_helio
```

Labels: Sun at origin, Earth at 1 AU, dashed circle = SOI, incoming asymptote of hyperbola meets SOI at patch point.

## 9. The memory technique
1. **The hook** — Imagine the solar system as a set of “influence bubbles”; the spacecraft travels on a straight train track (heliocentric ellipse) and only switches to local subway lines (hyperbolas) while inside each bubble.
2. **What to overlearn** — v∞ definition, r_SOI formula, and the single vector subtraction v_helio − v_planet.
3. **Spaced-repetition schedule** — Review the r_SOI formula after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If you forget the formula, re-derive r_SOI by equating tidal perturbation acceleration to central acceleration and solving for the crossover radius.

## 10. What this unlocks
Patched conics give the initial guess for high-fidelity optimizers and let you rapidly explore trade spaces before running n-body integrators.

- Gravity-assist sequencing algorithms
- Lambert solver extensions to multi-revolution transfers
- Preliminary mission Δv budgets for proposal studies
- Analytic B-plane targeting for planetary flybys

## 11. Self-check — five questions, no answers
1. Calculate the SOI radius of Jupiter in AU given its semi-major axis and mass ratio.
2. For an Earth–Mars Hohmann transfer, what is the arrival v∞ at Mars’ SOI?
3. A spacecraft leaves Earth with v∞ = 3 km s⁻¹ at an angle 30° to the heliocentric velocity; write the three-component velocity vector in the ecliptic frame.
4. Why does a 5 % error in SOI radius produce a larger trajectory error at arrival than the same percentage error in transfer time?
5. Identify the hidden assumption in the patched-conic method that fails for trajectories passing through the Sun–Earth L1 region.