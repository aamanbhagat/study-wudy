## 1. The one-sentence answer
**Torque equals the time derivative of angular momentum.**

Angular momentum **L** of a particle is the quantity **r** × **p** that encodes both the linear momentum and its perpendicular distance from a chosen origin. When an external force acts, the momentum vector **p** changes; because the position vector **r** may also be moving, the product **r** × **p** acquires an extra term. That extra term is precisely the torque **τ** = **r** × **F**. The equality **τ** = d**L**/dt therefore follows directly once the definitions are differentiated.

The relation holds in any inertial frame and remains valid for a rigid body once **L** and **τ** are replaced by their totals about the same fixed point (or about the center of mass). It is the exact rotational counterpart of Newton’s second law **F** = d**p**/dt.

> [!NOTE]
> The “aha” is that torque does not merely produce angular acceleration; it is the sole agent that can alter the direction or magnitude of the angular-momentum vector itself.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage recovery relies on gimbaled Merlin engines that generate controlled torques about the vehicle’s center of mass; these torques change the booster’s angular momentum vector so that the stage can rotate from horizontal boost-back to vertical landing attitude in under thirty seconds.

Reaction-wheel assemblies on the Hubble Space Telescope store and exchange angular momentum with the spacecraft bus; when the wheels reach saturation, magnetic torquers apply external torques to desaturate them, exactly implementing **τ** = d**L**/dt on orbit.

The 2014 Philae comet lander carried a flywheel whose sudden spin-up produced a reaction torque that flipped the probe 180° after its initial touchdown failed; mission logs show the torque impulse was calculated directly from the measured change in wheel angular momentum.

Neutron-star glitches observed by NICER on the International Space Station are interpreted as sudden transfers of angular momentum between the superfluid core and the crust; the external electromagnetic torque on the star is orders of magnitude too small to explain the rapid spin-up, confirming that internal **τ** = d**L**/dt processes dominate.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Linear momentum **p** = *m**v* | Angular momentum is built from **r** × **p**              |
| Cross product            | Both **L** and **τ** are defined via the cross product    |
| Time derivative of a product | Differentiation of **r** × **p** produces the torque term |
| Newton’s second law      | The linear law **F** = d**p**/dt is the direct template   |

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the linear law you already know
A force changes linear momentum according to **F** = d**p**/dt. Angular momentum is simply the “lever-arm-weighted” version of the same momentum; any change in **p** must therefore produce a corresponding change in **L**, scaled by position.  
Concrete example: a particle at **r** = (1 m, 0, 0) receives an impulse that increases **p** by (0, 0.1 kg m s⁻¹, 0). The resulting **L** changes by **r** × Δ**p**.  
Formal statement:  
$$ \mathbf{L} = \mathbf{r} \times \mathbf{p} $$

> [!WARNING]
> Treating **r** as constant when differentiating will omit the **v** × **p** term that later cancels, leading to an incorrect extra contribution.

### Step 2 — Write the definition of torque from the same lever arm
Torque is the rotational effect of force, defined identically as **τ** = **r** × **F**.  
Example: the same particle feels **F** = (0, 0.2 N, 0); torque about the origin is (0, 0, 0.2) N m.  
Formal statement:  
$$ \boldsymbol{\tau} = \mathbf{r} \times \mathbf{F} $$

### Step 3 — Differentiate **L** with respect to time
Apply the product rule to **L** = **r** × **p**:  
$$ \frac{d\mathbf{L}}{dt} = \frac{d\mathbf{r}}{dt} \times \mathbf{p} + \mathbf{r} \times \frac{d\mathbf{p}}{dt} $$  
The first term is **v** × **p** = **v** × (*m**v*) = 0. The second term is **r** × **F** = **τ**.  
Formal statement:  
$$ \frac{d\mathbf{L}}{dt} = \boldsymbol{\tau} $$

> [!WARNING]
> Forgetting that **v** × **p** vanishes produces a spurious torque term that has no physical counterpart.

### Step 4 — Extend to a rigid body or system of particles
Sum the individual equations **τ**_i = d**L**_i/dt over all particles. Internal torques cancel by Newton’s third law (equal and opposite forces along the line joining particles), leaving only the external torque equal to the time derivative of the total angular momentum.  
Formal statement (fixed point or center of mass):  
$$ \boldsymbol{\tau}_{\rm ext} = \frac{d\mathbf{L}_{\rm total}}{dt} $$

### Step 5 — State the textbook result
The relation **τ**_ext = d**L**/dt is therefore both the definition of torque and the dynamical law governing rotational motion.

## 5. Worked examples — every step shown

**Example 1 — Single particle, constant force**  
*Given:* A particle of mass 0.5 kg moves with **r**(t) = (2t, 0, 0) m and receives a constant force **F** = (0, 3, 0) N.  
*Find:* **τ** and d**L**/dt at t = 1 s.  

**r** = (2, 0, 0) m, **v** = (2, 0, 0) m s⁻¹, **p** = *m**v* = (1, 0, 0) kg m s⁻¹.  
*Why:* definition of momentum.  
**L** = **r** × **p** = (0, 0, 0) kg m² s⁻¹.  
*Why:* cross product of parallel vectors vanishes.  
d**L**/dt = **r** × **F** = (0, 0, 6) N m.  
*Why:* only surviving term after product rule.  

**τ** = **r** × **F** = (0, 0, 6) N m.  
**Final answer**  
$$ \boldsymbol{\tau} = \frac{d\mathbf{L}}{dt} = (0,0,6)\,\text{N·m} $$

*Reflection:* Parallel vectors make **L** zero, so any torque instantly creates angular momentum; the example isolates the cross-product geometry.

**Example 2 — Particle in circular motion**  
*Given:* A 1 kg mass on a string moves at radius 0.5 m with speed 4 m s⁻¹; tension is radial.  
*Find:* torque about center.  

**r** ⊥ **v**, **L** = *m r v* = 2 kg m² s⁻¹ (magnitude).  
Tension **F** is parallel to **r**, so **τ** = **r** × **F** = 0.  
Hence d**L**/dt = 0; angular momentum is constant.  

**Final answer**  
$$ \boldsymbol{\tau} = 0 = \frac{d\mathbf{L}}{dt} $$

*Reflection:* Central forces produce zero torque and therefore conserve **L**.

**Example 3 — Rod pivoted at end**  
*Given:* Uniform rod length *L* = 1 m, mass *M* = 2 kg, pivoted at one end, angular acceleration α = 3 rad s⁻².  
*Find:* external torque required.  

Moment of inertia about end *I* = *M L*²/3 = 2/3 kg m².  
**L** = *I* ω (vector along axis).  
d**L**/dt = *I* α = (2/3)·3 = 2 N m.  

**Final answer**  
$$ \tau = 2\,\text{N·m} $$

*Reflection:* For rigid bodies the scalar *I* α form is recovered once **τ** = d**L**/dt is projected along the rotation axis.

**Example 4 — Rocket attitude thruster**  
*Given:* 5000 kg spacecraft, thruster at 2 m lever arm fires 20 N perpendicular to radius vector for 5 s.  
*Find:* change in angular momentum.  

Impulse *J* = 20 N × 5 s = 100 N s.  
Δ**L** = *r* × *J* = 200 kg m² s⁻¹.  

**Final answer**  
$$ \Delta\mathbf{L} = 200\,\text{kg·m²·s⁻¹} $$

*Reflection:* Finite torque integrated over time equals net angular-momentum change, the rotational impulse-momentum theorem.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Treating **r** as constant in d**L**/dt | Forgetting the product rule                 | Always expand d(**r** × **p**)/dt explicitly         |
| Choosing a moving origin          | Origin acceleration adds fictitious torques | Use inertial point or center of mass                 |
| Ignoring internal torques         | Assuming they cancel without proof          | Verify forces are central or along line of action    |
| Confusing **L** = *I*ω with vector **L** | Scalar habit from 2-D problems              | Keep vector notation until axis is chosen            |
| Applying τ = *I*α when *I* changes | Variable moment of inertia (ice skater)     | Use τ = d**L**/dt; *I*α only when *I* constant       |
| Sign errors in 3-D cross products | Right-hand-rule slips                       | Compute components with determinant form             |
| Applying relation in non-inertial frame | Coriolis terms appear                       | Transform to inertial frame first                    |

## 7. The textbook-precise statement
In an inertial reference frame, for a system of particles or a rigid body, the net external torque about a fixed point *O* (or about the center of mass) equals the time rate of change of the total angular momentum about that same point:  
$$ \boldsymbol{\tau}_{\rm ext} = \frac{d\mathbf{L}}{dt} \qquad (O \text{ fixed or CM}). $$  
(Goldstein, *Classical Mechanics*, 3rd ed., §4.1, eq. 4.12.)

## 8. Visual — diagram or schematic
```text
          y
          ^
          |     F (force)
          |      ^
r (position) --> o------> particle
          |     \
          |      \   L = r × p  (out of page)
          |       \
          +---------> x
```
Origin at bottom-left; **r** from origin to particle; **F** applied at particle; **L** vector points out of page (right-hand rule). The diagram shows the three vectors needed to compute both **L** and **τ**.

## 9. The memory technique
1. **The hook** — Picture a bicycle wheel: torque is the twist you apply with your hand; angular momentum is the wheel’s stubborn spin axis that only torque can twist.
2. **What to overlearn** — **L** = **r** × **p**; **τ** = **r** × **F**; **τ**_ext = d**L**/dt (vector equality).
3. **Spaced-repetition schedule** — Review definitions after 1 day, recompute one worked example after 3 days, derive the product-rule step from memory after 7 days, solve a new rigid-body problem after 16 days, and explain the relation to a colleague after 35 days.
4. **First-principles fallback** — Begin with **p** = *m**v*, form **L** = **r** × **p**, differentiate with the product rule, discard **v** × **p**, and recover **τ**.

## 10. What this unlocks
Mastery of **τ** = d**L**/dt lets you analyze precession, nutation, and stability of spinning bodies, the foundation for every subsequent topic in rotational dynamics.

- Euler’s rigid-body equations
- Conservation of angular momentum in isolated systems
- Gyroscopic motion and torque-free precession
- Rocket attitude-control laws and reaction-wheel sizing
- Lagrangian mechanics with rotational degrees of freedom

## 11. Self-check — five questions, no answers
1. A particle moves under a force always parallel to its position vector; prove that its angular momentum about the origin is constant.
2. A uniform disk of mass *M* and radius *R* spins about its axis with angular speed ω. An external torque of magnitude τ is applied perpendicular to the axis for time Δt. Compute the resulting change in the angular-momentum vector.
3. Why does the relation **τ** = d**L**/dt remain valid when evaluated at the center of mass even though the center of mass itself is accelerating?
4. A student computes d**L**/dt for a particle and obtains **r** × **F** + **v** × **p**. Identify the error and correct it.
5. Two identical satellites in circular orbit fire identical thrusters for the same duration, one at the center of mass and one offset by 1 m. Which satellite acquires a larger angular-momentum change, and why?