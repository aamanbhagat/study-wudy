## 1. The one-sentence answer
**A control moment gyroscope produces high spacecraft torque by changing the direction of a constant-magnitude rotor angular momentum vector through gimbal motion, yet the mapping from gimbal rates to output torque becomes singular when the gimbal axes lose linear independence.**

A CMG contains a rotor spinning at high constant speed whose angular momentum vector **h** lies along the rotor axis. When the gimbal is driven at rate **δ̇**, the resulting torque equals **δ̇** × **h**, delivering large moments with modest motor power because the rotor speed itself never changes. Three or more CMGs are usually arranged so their combined momentum envelope covers all three spacecraft axes; torque is obtained simply by choosing the correct combination of gimbal rates.

The price appears when two or more gimbal planes become coplanar: the Jacobian that relates gimbal rates to torque loses rank and certain torque directions become instantaneously unreachable. This geometric condition is called a singularity. Near it the required gimbal rates grow without bound even though the demanded torque remains finite, forcing either torque reduction or a deliberate detour through momentum space.

> [!NOTE]
> The singularity is not a hardware failure; it is a momentary loss of directional authority caused purely by the instantaneous geometry of the gimbal axes.

## 2. Why this matters — concrete and current
The International Space Station uses four double-gimbal CMGs whose 4760 N·m·s momentum envelope supplies all fine attitude control; the Russian Segment supplements them with reaction thrusters only when CMG saturation or singularities force desaturation maneuvers.  
NASA’s Restore-L mission and the forthcoming OSAM-1 satellite both carry single-gimbal CMG clusters sized for 25 N·m peak torque to enable autonomous capture and servicing of client spacecraft without expending propellant.  
The Hubble Space Telescope’s original three-CMG set was replaced in 2002 with a four-CMG configuration whose singularity-avoidance logic (documented in NASA/CR-2002-211954) extended operational life by preventing the torque drop-outs that had previously interrupted observations.  
Commercial GEO communication satellites such as Boeing’s 702SP platform employ pyramid-mounted CMG clusters; the 2019 patent US10,266,287B2 describes an on-board gradient-search algorithm that continuously steers gimbal angles away from the internal elliptic singularities that would otherwise interrupt station-keeping during north-south station-keeping burns.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Angular momentum **h** = **I**ω | Defines the constant-magnitude vector the CMG steers      |
| Vector cross product     | Torque = **δ̇** × **h** is the sole source of control torque |
| Jacobian matrix          | Maps gimbal rates to spacecraft torque; rank loss = singularity |
| Null space               | Directions in gimbal-rate space that produce zero torque  |

## 4. Building the idea — from intuition to formalism

### Step 1 — Constant spin, variable direction
A rotor is spun at fixed high speed so |**h**| remains constant; only its direction is altered.  
Example: a 50 kg·m² rotor at 6000 rpm stores 31416 N·m·s.  
Formal statement:  
$$ \mathbf{h} = I_r \omega_r \hat{\mathbf{s}}, \quad \omega_r = \text{const}. $$  
> [!WARNING] Treating rotor speed as variable converts the device into a reaction wheel and forfeits the torque amplification that defines a CMG.

### Step 2 — Torque from gimbal motion only
Gimbal rotation **δ̇** changes the unit vector **ŝ**, producing  
$$ \boldsymbol{\tau} = \dot{\delta} \times \mathbf{h}. $$  
Example: a 1 rad/s gimbal rate orthogonal to **h** yields torque magnitude |**h**|.  
> [!WARNING] If **δ̇** is allowed to have a component parallel to **h**, that component is wasted and only increases gimbal-motor heating.

### Step 3 — Cluster kinematics
For *n* CMGs the total torque is the sum  
$$ \boldsymbol{\tau} = \sum_{i=1}^n \mathbf{h}_i \times \dot{\delta}_i = [ \mathbf{A}(\boldsymbol{\delta}) ] \dot{\boldsymbol{\delta}}, $$  
where the 3×*n* Jacobian **A** has columns **h**ᵢ × (unit gimbal axis).  
> [!WARNING] Writing **A** as constant ignores the dependence on instantaneous gimbal angles **δ** and hides the singularity condition.

### Step 4 — Singularity as rank deficiency
A singularity exists when rank(**A**) < 3, i.e., the three rows become linearly dependent. The Moore-Penrose pseudoinverse then yields infinite or undefined **δ̇** for torque commands lying outside the column space.  
> [!WARNING] Numerical solvers that do not monitor the smallest singular value of **A** will command unrealizable gimbal rates and trip hardware limits.

### Step 5 — Momentum envelope and internal vs external singularities
The reachable momentum set is a convex body whose surface contains “external” singularities (envelope boundary) and whose interior contains “internal” singularities (elliptic or hyperbolic). Internal singularities can be escaped by null-motion; external ones cannot.  
Formal statement: internal singularities satisfy det(**A** **A**ᵀ) = 0 while |**h**_total| < *h*_max.  
> [!WARNING] Confusing internal with external singularities leads to unnecessary thruster firings when a simple null-space redistribution would suffice.

## 5. Worked examples — every step shown

**Example 1 — Single-axis torque from orthogonal gimbal**  
*Given:* |**h**| = 1000 N·m·s, **δ̇** = 0.5 rad/s perpendicular to **h**.  
*Find:* torque magnitude.  
**τ** = |**δ̇** × **h**| = 0.5 × 1000 = 500 N·m.  
*Why:* magnitude of cross product is product of magnitudes times sin 90° = 1.  
**500 N·m**

*Reflection:* The example isolates the geometric origin of torque; any parallel component would reduce the effective angle and therefore the torque.

**Example 2 — Two-CMG planar singularity**  
*Given:* two CMGs with **h**₁ = (1000,0,0), **h**₂ = (0,1000,0) at the same instant.  
*Find:* can they produce torque along z?  
Jacobian columns: **h**₁ × **ĝ**₁ and **h**₂ × **ĝ**₂ both lie in xy-plane, so **A** has zero third row.  
**No z-torque possible (singular).**

*Reflection:* Coplanar momentum vectors make the cross-product directions linearly dependent.

**Example 3 — Pseudoinverse command near singularity**  
*Given:* 3-CMG pyramid, **A** with σ_min = 0.01, desired **τ** = (10,0,0) N·m.  
**δ̇** = **A**⁺ **τ** yields one component ≈ 1000 rad/s.  
**Hardware saturates; torque command must be scaled or redirected.**

*Reflection:* Small singular value amplifies rates; detection via σ_min is essential.

**Example 4 — Null-motion escape**  
*Given:* internal singularity with null vector **n** satisfying **A n** = 0.  
Apply **δ̇**_null = k **n** for small k; total momentum **h**_total changes while torque remains zero, moving the cluster off the singular surface.  
**Singularity escaped without net torque.**

*Reflection:* Internal singularities possess a usable null space; external ones do not.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Treating CMG torque as independent of angle | Jacobian **A**(**δ**) is ignored                    | Always recompute **A** at current gimbal angles      |
| Commanding torque exactly at singularity | Moore-Penrose inverse diverges                      | Monitor σ_min(**A**) and apply singularity-robust inverse |
| Confusing CMG with reaction wheel | Both use rotors, but control variables differ       | Check whether rotor speed or gimbal angle is the actuator |
| Ignoring momentum envelope limits | Internal singularities are escapable, external are not | Track |**h**_total| against the analytic envelope surface |
| Using fixed pseudoinverse near singularity | Produces infinite rates                             | Switch to singularity-avoidance or blended steering logic |
| Neglecting gimbal-rate limits     | High rates near singularity exceed motor capability | Include rate saturation in the allocation algorithm  |
| Assuming three CMGs always suffice | Three units possess unavoidable elliptic singularities | Use at least four CMGs for full sky coverage         |

## 7. The textbook-precise statement
A cluster of *n* single-gimbal control-moment gyroscopes is described by the torque equation  
$$ \boldsymbol{\tau} = \mathbf{A}(\boldsymbol{\delta})\dot{\boldsymbol{\delta}}, \quad \mathbf{A} \in \mathbb{R}^{3\times n}, $$  
where the *i*-th column of **A** is **h**ᵢ × **g**ᵢ and **g**ᵢ is the gimbal-axis unit vector expressed in the spacecraft frame. A configuration **δ** is singular if rank(**A**) < 3. For *n* = 4 in a pyramid arrangement the internal elliptic singularities lie on the surface det(**A A**ᵀ) = 0 inside the momentum envelope |**h**| < 4 *h*₀ cos β (Wie, *Space Vehicle Dynamics and Control*, 2e, §7.4).

## 8. Visual — diagram or schematic
```text
          z
          ↑
          |   h3
          |  /
   h4 ←---O---> h2     (pyramid CMG cluster, β = 54.74°)
          |  \
          |   h1
          +--------→ y
         /
        x
Each hi lies on a cone; gimbal axes gi are perpendicular to hi.
Singular when any three hi become coplanar.
```
The four momentum vectors are drawn from the origin; each can be rotated about its own gimbal axis (not shown). When any three vectors lie in one plane the torque Jacobian rank drops.

## 9. The memory technique
1. **The hook** — picture four bicycle wheels mounted on the faces of a pyramid; when their axles line up flat you suddenly cannot push the pyramid sideways no matter how fast you twist the handles.  
2. **What to overlearn** — torque equation **τ** = **A(δ) δ̇** and the test det(**A A**ᵀ) = 0.  
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — start from **τ** = **δ̇** × **h**, form the Jacobian by stacking three cross-product columns, then compute its rank via singular-value decomposition.

## 10. What this unlocks
Mastery of CMG kinematics and singularities is the prerequisite for singularity-avoidance steering laws, momentum-envelope optimization, and variable-speed CMG control. These in turn enable the next topics: gradient-based null-motion steering, blended CMG/RW actuators, and real-time model-predictive attitude control for agile satellites.

## 11. Self-check — five questions, no answers
1. A single CMG produces 800 N·m when its gimbal rate is 2 rad/s; what is the rotor angular momentum magnitude?  
2. Two CMGs have momentum vectors lying in the x-y plane; can their instantaneous torque vector have a z-component?  
3. Write the 3×4 Jacobian for a pyramid CMG set at zero gimbal angles.  
4. If the smallest singular value of **A** is 10⁻³, by what factor are gimbal rates amplified relative to a well-conditioned case?  
5. Why can an internal singularity be escaped by null motion while an external singularity cannot?