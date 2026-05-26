## 1. The one-sentence answer
**Non-conservative forces such as kinetic friction and air drag perform path-dependent work that dissipates mechanical energy into thermal energy, so the total mechanical energy of a system is no longer conserved.**

When you push a block across a rough table, the friction force always opposes the instantaneous velocity. The longer or more circuitous the path, the more energy disappears from the block’s kinetic and gravitational-potential accounts and reappears as heat in the surfaces. Air drag behaves similarly: its magnitude grows with speed and its direction is always antiparallel to velocity, so the work it does cannot be recovered by returning to the starting point.

Contrast this with gravity or an ideal spring. Those forces are conservative; the work they do depends only on the endpoints. You can therefore assign them a potential-energy function and obtain a conserved mechanical-energy quantity. Friction and drag refuse this treatment because their work is irretrievably lost to microscopic degrees of freedom.

> [!NOTE]
> The decisive signature of a non-conservative force is that the line integral of the force around any closed path is nonzero; the mechanical energy therefore changes by exactly that amount each time the path is traversed.

## 2. Why this matters — concrete and current
SpaceX recovers Falcon 9 first stages by steering them through a precisely timed entry burn followed by grid-fin aerodynamic braking. Engineers must subtract the integrated drag work from the vehicle’s remaining kinetic energy budget to hit the landing platform within metres; an error of only a few percent in the drag model produces a missed landing.

Parachute systems on the Mars Science Laboratory and Perseverance rovers are sized so that the work done by atmospheric drag reduces descent speed from supersonic to subsonic before the sky-crane phase. The drag coefficient is measured in Earth wind tunnels and then scaled by the thin Martian atmosphere; a miscalculation leaves the lander with excess kinetic energy that the retro-rockets cannot remove in time.

Commercial aircraft such as the Boeing 787 achieve 20 % better fuel efficiency than their predecessors largely by shaping wings and fuselage to reduce skin-friction and pressure drag. The cumulative work against drag over a 14-hour flight equals the chemical energy released by tens of tonnes of jet fuel; every drag count saved is therefore a direct reduction in operating cost and CO₂ emission.

High-speed maglev trains in Japan and China still experience aerodynamic drag that grows quadratically with speed. At 600 km h⁻¹ the power required to overcome drag exceeds the power needed to levitate the train, forcing designers to optimise nose shapes and sealed tunnels so that the non-conservative work term remains within the traction-motor budget.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Work as line integral    | Friction and drag work must be computed along the actual trajectory, not merely between endpoints. |
| Kinetic energy theorem   | The work–energy theorem still holds; the non-conservative work simply appears on the right-hand side. |
| Potential energy         | Only conservative forces admit a potential; the distinction is required before writing ΔE_mech = W_nc. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Force direction and path dependence
Friction and drag always act opposite the instantaneous velocity. Consequently the infinitesimal work dW = F · dr is negative for every segment of any real trajectory.

Example: slide a book 2 m right, then 2 m left on a table; net displacement is zero yet total work by friction is −4μmg.

Formal statement:
$$
W_{\text{nc}} = \int_C \mathbf{F}_{\text{nc}} \cdot d\mathbf{r}
$$
where C is the actual path.

> [!WARNING]
> Treating the force as constant in direction rather than always antiparallel to velocity produces the wrong sign and magnitude.

### Step 2 — Mechanical energy accounting
Any work performed by non-conservative forces changes the mechanical energy of the system.

Formal statement:
$$
\Delta K + \Delta U = W_{\text{nc}}
$$
or equivalently
$$
\Delta E_{\text{mech}} = W_{\text{nc}}.
$$

### Step 3 — Kinetic friction model
For dry sliding friction the magnitude is μ_k N and the direction opposes velocity, so
$$
W_f = -\mu_k N \int_C ds = -\mu_k N\, s_{\text{path}}.
$$

### Step 4 — Quadratic air drag model
At typical rocket and aircraft speeds, drag is
$$
F_d = -\frac12 C_d\rho A v^2\,\hat{v}.
$$
The work integral then becomes
$$
W_d = -\frac12 C_d\rho A \int v^3\,dt,
$$
which must usually be evaluated numerically.

### Step 5 — Textbook statement of energy non-conservation
When non-conservative forces act,
$$
K_f + U_f = K_i + U_i + W_{\text{nc}},
$$
where W_nc is the total work done by all non-conservative forces along the actual path. This is the precise statement found in standard references such as Halliday, Resnick & Walker, *Fundamentals of Physics*, 12e, §8-3.

## 5. Worked examples — every step shown

**Example 1 — Constant friction on a straight slide**  
*Given:* A 3 kg block slides 4 m down a 30° incline with μ_k = 0.2.  
*Find:* Final speed if released from rest.  

Work by friction:  
$$
W_f = -\mu_k mg\cos\theta \cdot s = -0.2\times3\times9.8\times\cos30^\circ\times4 = -20.4\,\text{J}.
$$  
*Why:* Normal force is mg cos θ; path length is the hypotenuse s.  

Mechanical-energy equation:  
$$
\frac12 mv_f^2 = mgh + W_f.
$$  
*Why:* Gravity is conservative and already accounted for in ΔU = −mgh.  

Substitute numbers:  
$$
\frac12\times3 v_f^2 = 3\times9.8\times2 - 20.4 \implies v_f = 4.9\,\text{m s}^{-1}.
$$  
**4.9 m s⁻¹**  

*Reflection:* The sign of W_f is decisive; omitting it yields an erroneously high speed.

**Example 2 — Round-trip with friction**  
*Given:* Same block travels 4 m right then 4 m left on a horizontal table.  
*Find:* Net change in mechanical energy.  

Path length = 8 m,  
$$
W_f = -0.2\times3\times9.8\times8 = -47\,\text{J}.
$$  
**ΔE_mech = −47 J**  

*Reflection:* Closed path yields nonzero W_nc, proving non-conservative character.

**Example 3 — Linear drag coast-down**  
*Given:* A 1000 kg car with linear drag b = 200 N s m⁻¹ coasts from 30 m s⁻¹ to rest.  
*Find:* Distance travelled.  

Energy equation with variable force requires integration:  
$$
\int_{30}^{0} m v\,dv = -b\int_0^x v\,dx \implies x = \frac{m}{b}\times30 = 150\,\text{m}.
$$  
**150 m**  

*Reflection:* Linear drag permits closed-form integration; quadratic drag does not.

**Example 4 — Rocket stage re-entry with quadratic drag**  
*Given:* Falcon 9 booster mass 25 000 kg, C_dA = 120 m², ρ = 0.018 kg m⁻³, initial v = 1200 m s⁻¹, burn time 30 s.  
*Find:* Approximate energy removed by drag.  

Average v ≈ 600 m s⁻¹ yields  
$$
W_d \approx -\frac12\times0.5\times0.018\times120\times(600)^3\times30 \approx -1.1\times10^{10}\,\text{J}.
$$  
**−1.1 × 10¹⁰ J**  

*Reflection:* Order-of-magnitude estimate suffices for preliminary sizing; full trajectory codes integrate the ODE numerically.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using displacement instead of path length for friction | Students default to net Δr from kinematics | Always compute ∫ ds or s_path explicitly |
| Forgetting that drag direction reverses with velocity | Vector habit is weak | Write F_d = −b v or −c v² v̂ at every step |
| Treating static friction as doing work | Confusion between constraint and dissipation | Static friction does no work because dr = 0 at contact point |
| Adding potential for friction | Desire to keep energy “conserved” | Never assign U_f; friction work is external |
| Ignoring speed dependence of drag coefficient | C_d varies with Reynolds number | Check regime before choosing linear or quadratic model |
| Sign error in W_nc | Mechanical-energy equation misremembered | Write ΔE_mech = W_nc and verify W_nc is negative for dissipative forces |
| Applying conservation of energy on closed path | Over-generalisation from gravity | Test any force with ∮ F·dr; if nonzero, conservation fails |

## 7. The textbook-precise statement
When a system is acted upon by both conservative and non-conservative forces, the change in its total mechanical energy equals the work done by the non-conservative forces along the actual path traversed:

$$
K_f - K_i + U_f - U_i = W_{\text{nc}},
$$

where

$$
W_{\text{nc}} = \sum_j\int_{C} \mathbf{F}_{\text{nc},j}\cdot d\mathbf{r}.
$$

All potentials U are defined only for the conservative subset of forces. (Halliday, Resnick & Walker, *Fundamentals of Physics*, 12e, §8-3.)

## 8. Visual — diagram or schematic
```text
          v
          ↑
   ───────┼───────► path C
          │
   F_f or F_d always opposite v
          │
   Work element: F · dr = −|F| ds < 0
```
The diagram shows an arbitrary curve C with velocity vector tangent to the path at every point; the non-conservative force vector lies exactly 180° from v, so each infinitesimal displacement contributes negative work.

## 9. The memory technique
1. **The hook** — Picture friction and drag as tiny “energy vampires” that bite the object at every point along its journey and never give the energy back.  
2. **What to overlearn** — ΔE_mech = W_nc; W_f = −μ_k N s_path; F_d = −½ C_d ρ A v² v̂.  
3. **Spaced-repetition schedule** — Review the three equations at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the definition W = ∫ F·dr and the work–energy theorem; the non-conservative term simply refuses to be written as −ΔU.

## 10. What this unlocks
Mastery of non-conservative work lets you write the energy equation for any real vehicle or projectile and then proceed to variable-mass rockets, orbital decay under atmospheric drag, and damped harmonic motion.

- Rocket equation with drag losses  
- Terminal-velocity derivations  
- Energy methods in orbital mechanics with atmospheric braking  
- Power budgets for electric aircraft and high-speed rail

## 11. Self-check — five questions, no answers
1. A 2 kg block is pushed 5 m across a table with μ_k = 0.15; how much thermal energy is produced?  
2. Why does the work done by air drag on a falling sphere depend on the cube of speed when integrated over time?  
3. A car coasts 200 m while drag removes 80 kJ of mechanical energy; what was the average drag force?  
4. Show that the line integral of kinetic friction around any closed path on a flat surface is strictly negative.  
5. A skydiver reaches terminal velocity. Demonstrate that the rate at which drag dissipates energy equals the rate at which gravity supplies it.