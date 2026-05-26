## 1. The one-sentence answer
**Kepler's first law states that the trajectory of a body under an inverse-square central force is always a conic section with the force centre at one focus.**

Yeh law gravity ke inverse-square nature se aata hai. Jab aap two-body problem solve karte ho, radial equation ek conic section deta hai jiska eccentricity energy aur angular momentum par depend karta hai. Ellipse closed orbits ke liye, parabola escape velocity ke liye, aur hyperbola hyperbolic flybys ke liye.

Aap isko sirf “ellipse” keh kar mat chhodo — law actually kehta hai ki saari bound aur unbound trajectories ek hi family ki curves hain. Sirf eccentricity decide karti hai kaunsi curve milegi.

> [!NOTE]
> The single deepest insight is that the same differential equation produces every orbit shape; changing only the total energy switches the conic type without changing the underlying force law.

## 2. Why this matters — concrete and current
SpaceX uses hyperbolic escape trajectories for every interplanetary mission; the Falcon 9 second stage coasts on a hyperbola whose asymptote angle is fixed by Kepler’s first law once the hyperbolic excess velocity is known.

ESA’s Juice mission to Jupiter relies on multiple gravity-assist hyperbolas at Earth, Venus and Mars; each leg is a different conic sharing the same focus at the planet’s centre.

Starlink satellites fly in near-circular ellipses; small eccentricity errors grow into secular drifts that are corrected by matching the semi-major axis predicted by the vis-viva equation derived from the same conic law.

Cometary science uses parabolic and hyperbolic fits to Oort-cloud objects; the Minor Planet Center routinely classifies new discoveries by solving for eccentricity directly from Keplerian elements.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Polar coordinates        | Central-force motion is simplest in r, θ                  |
| Specific angular momentum h | Constant vector that sets the size and plane of the conic |
| Specific mechanical energy ε | Sign of ε decides ellipse (ε<0), parabola (ε=0), hyperbola (ε>0) |
| Inverse-square force law | Produces the 1/r potential whose orbits are conics        |

Agar aap inme se koi bhi weak ho to pehle two-body problem aur conservation laws padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the two-body equation of motion
Newton’s law for reduced mass gives \(\ddot{\mathbf{r}} = -\frac{\mu}{r^3}\mathbf{r}\). Cross product with specific angular momentum h yields the orbit equation after one integration. The result is a first-order differential equation in r(θ).

### Step 2 — Introduce the substitution u = 1/r
Differentiating with respect to θ converts the radial equation into a linear harmonic-oscillator equation whose general solution is u = A cos(θ − θ₀) + μ/h². Back-substituting r gives the polar equation of a conic.

### Step 3 — Identify the eccentricity vector
The integration constant A is rewritten as (μ/h²)e, where e is the eccentricity vector pointing to periapsis. Magnitude e = |e| directly classifies the curve.

### Step 4 — Write the trajectory equation
The standard form becomes
$$r = \frac{h^2/\mu}{1 + e\cos\theta}.$$
When e < 1 the denominator never zero → ellipse; e = 1 → parabola; e > 1 → hyperbola.

### Step 5 — Link energy to eccentricity
Specific energy satisfies ε = (μ²/h²)(e² − 1)/2. Sign of ε therefore fixes e, completing the proof that every inverse-square orbit is a conic.

> [!WARNING]
> Agar aap energy sign aur eccentricity ko alag-alag treat karoge to aap galat conic type predict karoge jab velocity escape velocity ke kareeb ho.

## 5. Worked examples — har step show karo

**Example 1 — Circular low-Earth orbit**
*Given:* Altitude 400 km, μ = 3.986×10¹⁴ m³ s⁻², Rₑ = 6371 km.  
*Find:* eccentricity and semi-major axis.  
r = Rₑ + 400 km = 6771 km. For circular motion e must be zero, so
$$r = \frac{h^2/\mu}{1+0} \implies h = \sqrt{\mu r}.$$
ε = −μ/(2r) < 0 confirms ellipse (circle is special ellipse).  
**Final answer:** e = 0, a = 6771 km.  
*Reflection:* Zero eccentricity is the boundary case that still satisfies the same polar equation.

**Example 2 — ISS eccentricity**
*Given:* Perigee 410 km, apogee 420 km.  
*Find:* e.  
a = (rₚ + rₐ)/2 = 6786 km.  
e = (rₐ − rₚ)/(rₐ + rₚ) = 0.00074.  
*Why:* Direct use of ellipse definition from the same conic equation.  
**Final answer:** e ≈ 7.4×10⁻⁴.  
*Reflection:* Even “circular” orbits have tiny e that must be modelled.

**Example 3 — Escape trajectory**
*Given:* Burnout velocity = 11.0 km s⁻¹ at 300 km altitude.  
*Find:* conic type.  
ε = v²/2 − μ/r = +1.05×10⁶ J kg⁻¹ > 0 → hyperbola.  
e = √(1 + 2ε h²/μ²) = 1.41.  
**Final answer:** hyperbolic escape orbit, e = 1.41.  
*Reflection:* Positive energy instantly tells us the trajectory will not close.

**Example 4 — Interstellar object**
*Given:* 1I/ʻOumuamua, inbound v∞ = 26.3 km s⁻¹, perihelion 0.255 au.  
*Find:* eccentricity.  
ε = v∞²/2 > 0. Using the relation e = √(1 + 2ε h²/μ²) yields e ≈ 1.20.  
**Final answer:** hyperbolic orbit, e = 1.20.  
*Reflection:* The same formula classifies both rocket stages and interstellar visitors.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Assuming every orbit is an ellipse | Textbooks often draw only closed orbits     | Always compute ε first; sign decides type    |
| Forgetting focus is at the centre | Confusing geometric centre with focus       | Remember r = p/(1+e cos θ) has focus at origin |
| Using rₐ + rₚ = 2a for hyperbolas | Formula only valid for ellipses             | Use a = h²/μ(e²−1) for hyperbolas            |
| Treating θ as true anomaly without checking | Periapsis reference forgotten               | Always set θ = 0 at periapsis by definition  |
| Mixing specific and total energy  | μ vs GM distinction                         | Use specific quantities consistently         |
| Ignoring that parabola is measure-zero | Rare in practice but appears in limits      | Treat e = 1 as exact escape case only        |

## 7. The textbook-precise statement
In the two-body problem with Newtonian inverse-square gravitation, every solution of the vector differential equation \(\ddot{\mathbf{r}} = −(\mu/r^3)\mathbf{r}\) lies on a conic section whose polar equation with respect to the focus is
$$r(\theta)=\frac{h^2/\mu}{1+e\cos(\theta-\varpi)},$$
where the eccentricity \(e=\sqrt{1+2\varepsilon h^2/\mu^2}\) is constant. The orbit is an ellipse when \(\varepsilon<0\) (e<1), a parabola when \(\varepsilon=0\) (e=1), and a hyperbola when \(\varepsilon>0\) (e>1). (See Bate, Mueller & White, *Fundamentals of Astrodynamics*, Dover 1971, §2.3.)

## 8. Visual — diagram or schematic
```
          Focus (central body)
               *
              / \
             /   \   <-- r(θ)
            /     \
   θ=0 --> *-------*  periapsis
          /         \
         /           \   hyperbola branch
        /             \
```
Horizontal axis is major axis; focus at origin; θ measured from periapsis. For ellipse the far vertex closes; for hyperbola the curve continues to infinity.

## 9. The memory technique
1. **The hook** — Picture a single ice-cream cone sliced at different angles: shallow cut gives ellipse, parallel to side gives parabola, steep cut gives hyperbola; the focus is always the point where the cone’s tip would be.
2. **What to overlearn** — r = p/(1 + e cos θ) and ε = (μ²/h²)(e² − 1)/2.
3. **Spaced-repetition schedule** — Review the polar equation after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from \(\ddot{\mathbf{r}} = −\mu\mathbf{r}/r^3\), cross with h, integrate once, obtain the eccentricity vector; the magnitude of that vector is e.

## 10. What this unlocks
Once you accept that every orbit is a conic you can immediately use the vis-viva equation, Lambert’s problem solvers, and patched-conic interplanetary trajectories.

- Two-body to n-body transition via patched conics
- Orbit determination from angles-only measurements
- Escape and capture manoeuvres in mission design
- Stability analysis of Lagrange points via effective potential

## 11. Self-check — five questions, no answers
1. A spacecraft at 300 km altitude has v = 10.5 km s⁻¹; is its orbit elliptic, parabolic or hyperbolic?
2. Derive the relation e = √(1 + 2ε h²/μ²) in three lines starting from the orbit equation.
3. Why does the same focus serve for both the elliptical ISS orbit and a hyperbolic lunar flyby?
4. If you measure r and v at one instant, which single scalar tells you the conic type without solving for θ?
5. A comet has e = 0.999999; what is the practical difference between treating it as a very flat ellipse versus a parabola for one perihelion passage?