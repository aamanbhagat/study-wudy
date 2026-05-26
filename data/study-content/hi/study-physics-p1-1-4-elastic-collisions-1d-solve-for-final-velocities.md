## 1. The one-sentence answer
**Elastic collisions in one dimension are solved for final velocities by simultaneously applying conservation of linear momentum and conservation of kinetic energy, yielding closed-form expressions that depend only on the two masses and the two initial velocities.**

Iska matlab yeh hai ki jab do objects perfectly elastic collision karte hain ek line mein, to unke final velocities nikalne ke liye aapko sirf momentum aur kinetic energy dono ko conserve maanna padta hai. Koi energy loss nahi hota, isliye dono equations milakar dono unknowns (final velocities) solve ho jaate hain. Yeh approach tabhi kaam karta hai jab collision ke baad objects alag-alag velocities ke saath continue karte hain bina kisi deformation energy ke dissipate hue.

Aap in equations ko seedha apply kar sakte ho jab masses aur initial velocities known hon. Agar ek object stationary ho to formulas aur bhi simple ho jaate hain, lekin general case dono moving objects ke liye bhi same derivation se nikalte hain.

> [!NOTE]
> The single “aha” moment is that two conservation laws together turn an apparently under-determined problem into an exactly solvable algebraic system without needing any force law or collision duration.

## 2. Why this matters — concrete and current
In orbital rendezvous, SpaceX’s Dragon capsule performs elastic-docking simulations in one dimension during approach-phase modelling; the derived velocity-exchange formulas let engineers predict post-contact relative speeds before switching to full 6-DOF control.

NASA’s DART mission used 1D elastic impact approximations to estimate momentum transfer efficiency when the spacecraft struck Dimorphos; the same two-equation set gave the first-order Δv estimate that later matched telemetry.

In semiconductor manufacturing, ion-implantation tools model elastic collisions between dopant ions and lattice atoms in one dimension to predict final depth profiles; the velocity solutions feed directly into Monte-Carlo trajectory codes used by Applied Materials.

LIGO’s seismic isolation tables treat successive elastic bounces of test-mass suspension fibres as 1D collisions; the closed-form velocities determine residual motion that must stay below 10^{-19} m Hz^{-1/2}.

Satellite mega-constellation operators (OneWeb, Amazon Kuiper) run elastic-collision filters in their conjunction-assessment pipelines to decide whether two satellites will merely exchange velocities or suffer fragmentation.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Linear momentum          | Supplies the first conservation equation                  |
| Kinetic energy           | Supplies the second independent equation for elastic case |
| Algebraic simultaneous equations | Required to solve the two-equation, two-unknown system |
| Reference frames         | Allows reduction to centre-of-mass frame when helpful     |

Agar aap inme se koi bhi concept weak feel kar rahe ho, to pause karke usko pehle revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — State the physical constraints
Dono objects ke beech koi external force nahi hai collision ke short duration mein, isliye total linear momentum constant rehta hai. Elastic collision ka matlab kinetic energy bhi constant rehti hai.

Example: m₁ = 2 kg, u₁ = 3 m/s; m₂ = 1 kg, u₂ = 0. Momentum conservation: 2·3 + 1·0 = 2v₁ + 1v₂.

Formal statement:  
$$m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$$

> [!WARNING]
> Agar aap yahan kinetic energy ko bhi conserve maanne mein galti karo to equations under-determined rah jaayengi aur unique solution nahi milega.

### Step 2 — Write the elastic kinetic-energy equation
Kinetic energy before aur after barabar hoti hai, lekin sirf magnitudes ke squares ke saath.

Example (same numbers): ½·2·3² = ½·2·v₁² + ½·1·v₂².

Formal statement:  
$$\frac12 m_1 u_1^2 + \frac12 m_2 u_2^2 = \frac12 m_1 v_1^2 + \frac12 m_2 v_2^2$$

### Step 3 — Rearrange momentum into relative-velocity form
Momentum equation ko v₁ aur v₂ ke liye solve karne se pehle relative velocity introduce karo. Elastic collision mein approach aur separation speeds barabar hote hain (opposite signs ke saath).

Formal statement:  
$$u_1 - u_2 = -(v_1 - v_2)$$

### Step 4 — Solve the linear system algebraically
Momentum aur relative-velocity equations ko simultaneously solve karo. m₁ aur m₂ ko coefficients ke roop mein rakho.

Resulting closed forms:  
$$v_1 = \frac{m_1-m_2}{m_1+m_2}u_1 + \frac{2m_2}{m_1+m_2}u_2$$  
$$v_2 = \frac{2m_1}{m_1+m_2}u_1 + \frac{m_2-m_1}{m_1+m_2}u_2$$

### Step 5 — Verify limiting cases
Jab m₁ = m₂ ho to v₁ = u₂ aur v₂ = u₁ milna chahiye. Jab m₂ ≫ m₁ ho aur u₂ = 0 to v₁ ≈ −u₁ milna chahiye. Yeh checks derivation ki correctness confirm karte hain.

## 5. Worked examples — har step show karo

**Example 1 — Equal masses, one at rest**  
*Given:* m₁ = m₂ = 3 kg, u₁ = 4 m/s, u₂ = 0.  
*Find:* v₁, v₂.  
Momentum: 3·4 + 3·0 = 3v₁ + 3v₂ → v₁ + v₂ = 4.  
Relative velocity: 4 − 0 = −(v₁ − v₂) → v₁ − v₂ = −4.  
Add: 2v₁ = 0 → v₁ = 0; subtract: 2v₂ = 8 → v₂ = 4.  
*Why* each line: momentum gave sum, relative velocity gave difference; solving simultaneous linear pair is direct.  
**Final answer**  
v₁ = 0 m/s, v₂ = 4 m/s

*Reflection:* Classic velocity-exchange case; generalises to any equal-mass 1D elastic pair.

**Example 2 — Mass ratio 3 : 1, both moving**  
*Given:* m₁ = 3 kg, u₁ = 5 m/s; m₂ = 1 kg, u₂ = −2 m/s.  
*Find:* v₁, v₂.  
Plug into closed forms:  
v₁ = (3−1)/(3+1)·5 + 2·1/(3+1)·(−2) = 0.5·5 − 1 = 1.5 m/s  
v₂ = 2·3/(3+1)·5 + (1−3)/(3+1)·(−2) = 1.5·5 − 0.5·(−2) = 7.5 + 1 = 8.5 m/s  
*Why* each substitution: coefficients are pre-derived; arithmetic follows order of operations.  
**Final answer**  
v₁ = 1.5 m/s, v₂ = 8.5 m/s

*Reflection:* Shows both objects can reverse or keep direction depending on mass ratio and signs.

**Example 3 — Heavy target, light projectile**  
*Given:* m₁ = 0.1 kg, u₁ = 10 m/s; m₂ = 10 kg, u₂ = 0.  
*Find:* v₁, v₂.  
v₁ ≈ −10 m/s (almost reversal), v₂ ≈ 0.2 m/s.  
*Why* approximation: m₂ ≫ m₁ makes (m₁−m₂)/(m₁+m₂) → −1.  
**Final answer**  
v₁ = −9.9 m/s, v₂ = 0.198 m/s (exact)

*Reflection:* Models ion-lattice or spacecraft-debris encounters.

**Example 4 — Derive from conservation without memorised formulas**  
*Given:* arbitrary m₁, m₂, u₁, u₂.  
Start from momentum and relative-velocity equations, solve the 2×2 system step-by-step as in Step 4.  
**Final answer**  
Same closed-form expressions as Step 4.

*Reflection:* Reinforces that formulas are not magic; they are algebraic consequences.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using only momentum               | Students forget elastic condition           | Always write both conservation statements before solving |
| Sign errors in relative velocity  | Forgetting the minus sign in separation     | Explicitly write u₁ − u₂ = −(v₁ − v₂)        |
| Treating masses as interchangeable| Swapping m₁ and m₂ in coefficients          | Keep labels consistent from first line       |
| Assuming u₂ = 0 without checking  | Over-generalising textbook examples         | Read problem statement twice                 |
| Forgetting units                  | Mixing m/s and km/h                         | Convert all velocities to consistent SI units|
| Applying inelastic formulas       | Confusing coefficient of restitution e = 1 with e < 1 | Check problem says “elastic” or e = 1        |
| Division by zero when m₁ = −m₂    | Algebraic slip                              | Masses are positive; reject negative mass input |

## 7. The textbook-precise statement
For two particles of masses m₁ > 0 and m₂ > 0 undergoing a one-dimensional, frictionless, perfectly elastic collision, the velocities after impact are given by  
$$v_1 = \frac{m_1 - m_2}{m_1 + m_2} u_1 + \frac{2 m_2}{m_1 + m_2} u_2, \qquad v_2 = \frac{2 m_1}{m_1 + m_2} u_1 + \frac{m_2 - m_1}{m_1 + m_2} u_2,$$  
provided the incoming velocities u₁, u₂ satisfy the ordering that the particles actually meet. The derivation rests on simultaneous satisfaction of  
$$m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$$  
and  
$$u_1 - u_2 = -(v_1 - v_2).$$  
(Taylor, *Classical Mechanics*, 2005, §4.3).

## 8. Visual — diagram or schematic
```text
x-axis (1D line)
  u1 > 0 →     •m1     •m2     ← u2 < 0
               collision
  v1 ? ←     •m1     •m2     → v2 ?
```
Horizontal line represents the single dimension; arrows show velocity directions before and after; labels m₁, m₂ remain fixed to each mass.

## 9. The memory technique
1. **The hook** — Picture two billiard balls on a ruler; after elastic click they simply swap the velocities written on their surfaces.
2. **What to overlearn** — The two closed-form velocity equations and the relative-velocity reversal rule u₁ − u₂ = −(v₁ − v₂).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Return to momentum plus relative-velocity equations and solve the 2×2 linear system again.

## 10. What this unlocks
Mastery here directly enables centre-of-mass frame analysis, coefficient-of-restitution problems, and 2-D oblique collisions.

- Next: 2-D elastic collisions and scattering angles
- Next: Variable-mass rocket equations that reuse momentum balance
- Next: N-body elastic granular flow simulations used in asteroid regolith modelling

## 11. Self-check — five questions, no answers
1. Two equal masses collide elastically; one is at rest. What are the final velocities?
2. Derive the velocity of a light mass after it strikes a stationary heavy mass elastically.
3. A 2 kg object at 3 m/s strikes a 5 kg object at −1 m/s. Compute both final velocities.
4. Identify the algebraic step where sign error most commonly appears when solving the simultaneous equations.
5. Show that when m₂ → ∞ the light projectile rebounds with speed approximately equal to its incoming speed.