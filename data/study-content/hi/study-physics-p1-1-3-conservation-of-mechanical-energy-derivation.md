## 1. The one-sentence answer
**Conservation of mechanical energy** states that the total mechanical energy (kinetic plus potential) of a system remains constant when only conservative forces do work.

Iska matlab yeh hai ki jab koi non-conservative force (jaise friction) kaam na kare, toh kinetic energy aur potential energy ke beech energy ka exchange hota rehta hai lekin unka sum hamesha same rehta hai. Aap isko work-energy theorem se derive kar sakte ho by showing that the work done by conservative forces equals the negative change in potential energy, jo finally ΔK + ΔU = 0 tak le jaata hai. Yeh principle rocket trajectories, planetary orbits aur simple pendulums mein directly apply hota hai.

> [!NOTE]
> The deepest "aha" yeh hai ki potential energy ko deliberately define kiya jaata hai taaki iska negative gradient exactly conservative force de — isliye energy conservation automatically follow karti hai bina naye laws add kiye.

## 2. Why this matters — concrete and current
ISRO’s PSLV and GSLV missions rely on conservation of mechanical energy to predict burnout velocity and coasting arcs once upper-stage engines cut off; any deviation signals unexpected drag or thrust misalignment.

SpaceX’s Falcon 9 first-stage boost-back burns are pre-computed using the same principle: kinetic energy at separation plus gravitational potential must equal the energy needed to return to the drone-ship landing ellipse.

In semiconductor lithography, electron-beam stages use magnetic and electrostatic lenses whose forces are conservative; energy conservation lets engineers calculate exact landing energy of electrons without tracking every intermediate collision.

The Parker Solar Probe’s gravity-assist manoeuvres at Venus are designed so that heliocentric mechanical energy stays constant between assists, allowing the probe to reach 690 km s⁻¹ at perihelion.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Work-energy theorem  | Starting point: W_net = ΔK                                |
| Conservative force   | Work path-independent → potential energy definable        |
| Potential energy definition | U chosen so F = −∇U; makes ΔK + ΔU = 0 automatic     |
| Dot product          | Work = ∫F·dr appears in every step of derivation          |

Agar upar ke koi bhi concept weak hain toh pehle unko revise karo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the work-energy theorem
Work-energy theorem already tells us that net work equals change in kinetic energy.  
Example: a ball thrown upward feels only gravity; W_gravity = ΔK.  
Formal statement:  
$$W_{\text{net}} = \int_{r_i}^{r_f} \mathbf{F}_{\text{net}} \cdot d\mathbf{r} = K_f - K_i$$  
> [!WARNING]  
> Agar aap yahan non-conservative forces ko bhi include karna bhool jaayein toh baad mein energy “loss” dikhega jo actually mechanical energy se alag heat mein convert ho rahi hoti hai.

### Step 2 — Split forces into conservative and non-conservative
F_net = F_c + F_nc.  
Agar sirf gravity aur spring jaise conservative forces hain, F_nc = 0.  
Formal:  
$$W_c + W_{nc} = \Delta K$$  
> [!WARNING]  
> Students aksar F_nc = 0 assume kar lete hain bina check kiye; friction present hone par mechanical energy conserve nahi hoti.

### Step 3 — Define potential energy for conservative forces
Conservative force ke liye potential energy aise define karte hain ki  
$$W_c = -\Delta U$$  
Gravity ke liye U = mgh, spring ke liye U = ½kx².  
Formal:  
$$U(\mathbf{r}) = -\int_{\text{ref}}^{\mathbf{r}} \mathbf{F}_c \cdot d\mathbf{r}$$  
> [!WARNING]  
> Reference point galat choose karne se sirf constant shift aata hai; ΔU same rehta hai lekin absolute values confuse kar sakte hain.

### Step 4 — Substitute back into work-energy theorem
W_c = −ΔU aur W_nc = 0 hone par  
$$-\Delta U = \Delta K \implies \Delta K + \Delta U = 0$$  
Formal:  
$$K_f + U_f = K_i + U_i$$  
> [!WARNING]  
> Equation sirf scalar hai; vector information khatam ho jaati hai, isliye direction ke liye alag se momentum conservation use karna padta hai.

### Step 5 — State the conservation law
Total mechanical energy E_mech = K + U constant rehta hai.  
Textbook-grade statement:  
$$E_{\text{mech}} = K + U = \text{constant (when } W_{nc}=0\text{)}$$

## 5. Worked examples — har step show karo

**Example 1 — Simple free-fall drop**  
*Given:* m = 2 kg, dropped from rest at h = 5 m.  
*Find:* speed just before hitting ground.  
Step 1: E_i = mgh = 2×9.8×5 = 98 J (K_i = 0).  
Step 2: E_f = ½mv² + 0.  
Step 3: 98 = ½×2×v² → v² = 98 → v = √98 ≈ 9.9 m s⁻¹.  
*Why:* Direct substitution of conservation statement.  
**Final answer**  
**v = 9.90 m s⁻¹**  
*Reflection:* Trivial case; shows energy route is faster than kinematics.

**Example 2 — Vertical spring launch**  
*Given:* k = 200 N m⁻¹, m = 0.5 kg compressed 0.1 m.  
*Find:* max height reached after release.  
Step 1: Initial U_spring = ½k x² = 1 J, U_grav = 0.  
Step 2: At max height, v = 0, U_spring = 0, U_grav = mgh.  
Step 3: 1 = mgh → h = 1/(0.5×9.8) ≈ 0.204 m.  
*Why:* All spring energy converts to gravitational PE.  
**Final answer**  
**h = 0.204 m**  
*Reflection:* Shows two different potential energies exchanging.

**Example 3 — Pendulum at angle**  
*Given:* L = 1 m, m = 0.2 kg released from 30°.  
*Find:* speed at bottom.  
Step 1: Δh = L(1 − cos30°) = 0.134 m.  
Step 2: mgΔh = ½mv².  
Step 3: v = √(2gΔh) ≈ 1.62 m s⁻¹.  
*Why:* Height change from geometry gives ΔU.  
**Final answer**  
**v = 1.62 m s⁻¹**  
*Reflection:* Trigonometry + energy together solve variable-force problem.

**Example 4 — Two-stage rocket coasting**  
*Given:* 5000 kg stage at 3000 m s⁻¹, 200 km altitude; gravity only.  
*Find:* speed at 500 km.  
Step 1: E_i = ½m v_i² − GMm/r_i.  
Step 2: E_f = ½m v_f² − GMm/r_f.  
Step 3: Solve v_f = √[v_i² − 2GM(1/r_f − 1/r_i)] ≈ 2864 m s⁻¹.  
*Why:* Both kinetic and gravitational potential must be tracked.  
**Final answer**  
**v_f ≈ 2864 m s⁻¹**  
*Reflection:* Real orbital-mechanics calculation; non-constant g.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using ΔK + ΔU = 0 with friction present | Students forget non-conservative work       | Check W_nc explicitly before applying        |
| Sign error in ΔU            | Confusing U = mgh vs −mgh                   | Always compute U_f − U_i consistently        |
| Forgetting reference point  | Absolute U changes with choice of zero      | Work only with differences ΔU                |
| Treating E_mech as vector   | Momentum habit carries over                 | Remember E is scalar; direction needs p      |
| Ignoring velocity-dependent forces | Magnetic force does no work yet appears conservative | Verify F = −∇U condition before use     |
| Numerical g = 10 vs 9.8     | Approximation inconsistency                 | Keep g symbolic until final numerical step   |

## 7. The textbook-precise statement
When the net work done by non-conservative forces is zero, the total mechanical energy of a particle or system is conserved:  
$$K_f + U_f = K_i + U_i \quad \text{or} \quad \frac12 mv_f^2 + U(\mathbf{r}_f) = \frac12 mv_i^2 + U(\mathbf{r}_i).$$  
Here U is any scalar potential satisfying \(\mathbf{F}_c = -\nabla U\). (Taylor, *Classical Mechanics*, 2005, §4.3).

## 8. Visual — diagram or schematic
```
          y ↑
            |     E = const (horizontal line)
            |   /\
            |  /  \   K+U
            | /    \
------------+--------------→ x or time
   U = mgh  |  K = ½mv²
```
Labelled axes: vertical = energy, horizontal = position/time; curve shows U rising, K falling, sum flat.

## 9. The memory technique
1. **The hook** — Imagine a sealed “energy bank account”: money (energy) can move between cash (K) and savings (U) but total balance never changes unless an external thief (non-conservative force) steals it.
2. **What to overlearn** — ΔK + ΔU = 0 and E = K + U = constant when W_nc = 0.
3. **Spaced-repetition schedule** — Review derivation at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start again from W_net = ΔK, split forces, insert W_c = −ΔU.

## 10. What this unlocks
- Orbital mechanics (vis-viva equation)  
- Lagrangian mechanics (energy as consequence of ignorable coordinates)  
- Power calculations in variable-mass rockets  
- Stability analysis of equilibria via effective potential

## 11. Self-check — five questions, no answers
1. A 3 kg mass slides down a frictionless 30° incline 4 m long; calculate speed at bottom using energy.  
2. Why does mechanical energy conservation fail when a bullet embeds in a block?  
3. Derive the escape-velocity formula from conservation of energy.  
4. A spring-launched mass reaches height h on Earth; what height would it reach on the Moon (g/6)?  
5. Identify the hidden non-conservative force in a real pendulum that slowly stops it and quantify its effect on E_mech.