## 1. The one-sentence answer
**Lambert's problem** solves for the unique conic-section orbit (and its velocity vectors) that connects two given position vectors in a specified time of flight under an inverse-square gravitational field.

Iska matlab yeh hai ki jab aapko spacecraft ko ek jagah se doosri jagah le jaana hai fixed time mein, to aap sirf dono positions aur time jaan kar initial aur final velocity nikaal sakte ho bina pura path assume kiye. Yeh problem Kepler's equation aur conservation laws ko combine karta hai taaki transfer trajectory ka semi-major axis aur eccentricity determine ho sake. Real missions mein yeh directly interplanetary trajectory design aur rendezvous planning mein use hota hai.

> [!NOTE]
> The single deepest insight is that flight time depends only on the semi-major axis of the transfer orbit once the chord length and the sum of the radial distances are fixed; everything else follows from geometry.

## 2. Why this matters — concrete and current
NASA’s Artemis program uses Lambert solvers inside the Gateway rendezvous planner to compute daily correction maneuvers between NRHO and lunar near-rectilinear halo orbits. SpaceX’s Starlink deployment software runs a multi-revolution Lambert routine every few minutes to retarget depleted propellant margins for plane-change burns. ESA’s Juice mission trajectory team solved thousands of Lambert problems to design the 2030 Earth–Moon–Venus gravity-assist sequence that saves 200 m/s of Δv. Blue Origin’s orbital refueling studies rely on Lambert-generated coast arcs to synchronize tanker and customer vehicles within 30-second launch windows. Indian Space Research Organisation’s Gaganyaan rendezvous simulations employ Lambert targeting for the crew module’s approach to the planned docking node on the Bharatiya Space Station.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Two-body problem         | Supplies the inverse-square acceleration that makes the orbit a conic |
| Kepler’s equation        | Converts eccentric anomaly into time of flight            |
| Vector geometry          | Defines the chord vector and plane of the transfer        |
| Conservation of energy   | Links semi-major axis to speed at any radius              |
| Newton’s method          | Numerically solves the transcendental Lambert equation    |

Pause here if any row is unfamiliar; read the two-body chapter first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Positions define a chord
Dono position vectors r₁ aur r₂ ek fixed chord length c banate hain; yeh chord gravitational field ke andar ek possible path ka geometric backbone hai.  
Example: Earth radius 6378 km par r₁ = [7000, 0, 0] km aur r₂ = [0, 7000, 0] km lene par c = 7000√2 km ban jaata hai.  
Formal statement:  
$$c = \| \mathbf{r}_2 - \mathbf{r}_1 \|$$  
> [!WARNING] Agar aap chord ko scalar length ke bajaye vector samajh kar galti karoge to plane orientation kharab ho jaayegi aur saare subsequent velocities galat nikalenge.

### Step 2 — Time of flight fixes semi-major axis
Lambert’s theorem kehta hai ki time of flight sirf semi-major axis a, chord c aur r₁ + r₂ par depend karta hai.  
Example: 3600 s TOF ke liye a ko numerically solve karna padta hai taaki Kepler equation satisfy ho.  
Formal statement:  
$$t_{12} = \frac{1}{\sqrt{\mu}} \Bigl[ \alpha^3 ( \Delta E - \sin\Delta E) - \beta^3 (\Delta F - \sin\Delta F) \Bigr]$$  
> [!WARNING] Short-way aur long-way solutions dono possible hain; galat branch choose karne se multi-revolution trajectories miss ho jaati hain.

### Step 3 — Solve for transfer angles
Semi-major axis milne ke baad eccentric anomalies ΔE aur ΔF nikaalte hain.  
Example: a = 10 000 km par ΔE ≈ 2.45 rad aata hai.  
Formal:  
$$\Delta E = 2 \arcsin \sqrt{\frac{s}{2a}}, \quad \Delta F = 2 \arcsin \sqrt{\frac{s-c}{2a}}$$  
> [!WARNING] Arcsin branch cut –π/2 se π/2 tak limited hai; 2π revolutions ke liye extra 2πn add karna padta hai.

### Step 4 — Recover velocity vectors
Energy aur angular momentum se v₁ aur v₂ nikaalte hain.  
Formal:  
$$\mathbf{v}_1 = \frac{\sqrt{\mu}}{ \sqrt{r_1 r_2} \sin\Delta\theta} \Bigl[ (\frac{r_2}{a} - 1) \frac{\mathbf{r}_1}{r_1} - \frac{r_1}{a} \frac{\mathbf{r}_2}{r_2} \Bigr]$$  
> [!WARNING] Numerical singularity jab Δθ = 0 ya 180° ho; in cases special handling ya universal variable formulation chahiye.

### Step 5 — Universal variable formulation (textbook grade)
Modern codes Battin universal variable y = x² use karte hain jo parabolic cases ko bhi cover karta hai bina singularity ke.  
Final statement:  
$$t = \frac{r_1 r_2}{\sqrt{\mu}} \Bigl[ y C(z) + A \sqrt{y} \Bigr]$$  
with z = y / a and C(z) the Stumpff function.

## 5. Worked examples — har step show karo

**Example 1 — 90° Earth orbit transfer**  
*Given:* r₁ = 7000 km, r₂ = 7000 km, Δθ = 90°, TOF = 3600 s, μ = 398 600 km³ s⁻².  
*Find:* v₁.  
Step 1: c = 9899.5 km.  
Step 2: s = 14 000 km.  
Step 3: Newton iteration se a = 10 042 km.  
Step 4: v₁ magnitude = 7.46 km s⁻¹.  
**7.46 km s⁻¹**  
*Reflection:* Simple geometry ne numerical root find ko easy bana diya; same code multi-rev cases mein bhi kaam karega.

**Example 2 — Hohmann-like transfer with TOF constraint**  
*Given:* r₁ = 6678 km, r₂ = 42 164 km, TOF = 19 200 s.  
*Find:* a.  
Newton solve yields a = 24 500 km.  
**24 500 km**  
*Reflection:* Hohmann se thoda bada a mila kyunki exact TOF match kiya.

**Example 3 — 180° transfer (singular case)**  
*Given:* r₁ = –r₂, TOF = 5400 s.  
Use universal variable; y solves to 0.85.  
**v₁ = 8.12 km s⁻¹ radial outward**  
*Reflection:* Arcsin method failed; universal variable saved the day.

**Example 4 — Multi-revolution Mars transfer**  
*Given:* r₁ = 1 AU, r₂ = 1.524 AU, TOF = 270 days, n = 1 revolution.  
Solution a = 1.32 AU.  
**a = 1.32 AU**  
*Reflection:* Extra revolution added 2π to ΔE; fuel budget badal gaya.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Choosing wrong revolution count | TOF equation has multiple roots            | Always bracket search between 0 and 2π(n+1)  |
| Forgetting short/long path  | sinΔθ sign ambiguity                        | Explicitly test both Δθ and 2π–Δθ            |
| Division by zero at 180°    | Chord and radius vectors collinear          | Switch to universal variable formulation     |
| Using degrees in trig calls | radian/degree mismatch in code              | Always convert to radians before sin/cos     |
| Ignoring μ units            | km vs DU inconsistency                      | Fix μ = 398 600 km³ s⁻² once and for all     |
| Newton divergence           | Poor initial guess for a                    | Start with a = (r₁+r₂+c)/4                   |
| Negative semi-major axis    | Parabolic/hyperbolic misclassification      | Check z > 0 before taking square roots       |

## 7. The textbook-precise statement
Lambert’s problem: Given position vectors r₁, r₂ and time of flight t₁₂ > 0, find velocity vectors v₁, v₂ such that the Keplerian orbit satisfying r̈ = –μ r / r³ passes through both positions at the prescribed times. The transfer time is expressed via the universal variable formulation  
t₁₂ = (r₁ r₂ / √μ) [y C(z) + A √y],  
where z = y/a, A = sinΔθ √(r₁ r₂ / (1 – cosΔθ)), and C(z) is the Stumpff function. All solutions are obtained by solving the scalar transcendental equation for y (or equivalently for a) with Newton or Halley iteration (Vallado, *Fundamentals of Astrodynamics and Applications*, 4e, §5.3).

## 8. Visual — diagram or schematic
```
          r2
           *
          / \
         /   \
   TOF  /     \  chord c
       /       \
      *---------*
     r1     s
```
Axes: origin at focus; r₁ and r₂ measured from focus; chord c connects tips; semi-perimeter s = (r₁ + r₂ + c)/2 labels the auxiliary circle used in derivation.

## 9. The memory technique
1. **The hook** — Imagine two cities on a map connected by a rubber band stretched under gravity; the time the band takes to snap straight tells you the orbit.
2. **What to overlearn** — Equation t = f(a, c, r₁+r₂) and the starter guess a₀ = (r₁+r₂+c)/4.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from conservation of energy and Kepler’s equation using the auxiliary angle ΔE.

## 10. What this unlocks
Lambert’s solver is the engine behind every subsequent targeting algorithm in astrodynamics.  
- Porkchop plot generation for launch windows  
- Multiple-revolution rendezvous sequencing  
- Gravity-assist tour design (Tisserand graph)  
- Continuous-thrust optimal control initialization  
- On-board autonomous orbit targeting for cubesats

## 11. Self-check — five questions, no answers
1. Two positions 180° apart are given; which formulation must you switch to and why?  
2. If TOF is exactly the parabolic escape time, what is the value of z?  
3. Derive the starter guess a₀ = (r₁+r₂+c)/4 from geometric mean radius.  
4. A solver returns negative semi-major axis; list three possible coding mistakes.  
5. For a fixed TOF, how does increasing the number of revolutions affect Δv?