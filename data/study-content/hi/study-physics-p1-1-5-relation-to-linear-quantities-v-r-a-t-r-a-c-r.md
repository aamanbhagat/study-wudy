## 1. The one-sentence answer
**These three equations convert every linear kinematic quantity into its rotational counterpart by multiplying the angular quantity by the perpendicular distance r from the axis of rotation.**

Linear motion and rotation describe the same physical displacement, only viewed from different reference frames. When a point on a rigid body moves, its path length s equals rθ. Differentiating once with respect to time immediately gives velocity v = rω. Differentiating again yields the two accelerations: the tangential part a_t = rα that changes speed, and the centripetal part a_c = rω² that only changes direction.

The key insight is that r is fixed for a rigid body, so it factors out cleanly; every linear vector at that instant is simply scaled by r and rotated 90° relative to the angular vector.

> [!NOTE]
> Once you see that v, a_t and a_c are all obtained by the same “multiply by r” operation applied to ω or α, every later rotational equation (kinetic energy, torque, angular momentum) becomes a direct copy of its linear twin.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage landing burns rely on precise mapping of nozzle angular velocity ω to the linear exhaust velocity v = rω at the nozzle lip; any error in r produces a thrust-vector misalign­ment that the guidance loop must correct in milliseconds.

In hard-disk drives, the read/write head sits at radius r on a spinning platter; the linear bit speed v = rω determines the maximum data rate, which is why enterprise drives spin at 15 000 rpm while laptop drives stay near 5400 rpm.

The LHC’s dipole magnets keep protons on a 27 km circular path where the centripetal acceleration a_c = rω² reaches 10¹³ m s⁻²; the relation lets engineers convert the required 7 TeV momentum into the exact dipole field strength.

In semiconductor lithography, the reticle stage rotates a 300 mm wafer at angular acceleration α; the tangential acceleration a_t = rα at the wafer edge must stay below 20 m s⁻² to avoid overlay errors smaller than 1 nm.

Natural phenomena such as neutron-star glitches also use the same mapping: a sudden change in ω produces an immediate linear-speed jump at the crust, releasing elastic energy observed as X-ray bursts.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Position vector r    | Defines the fixed perpendicular distance from axis        |
| Time derivative      | Converts arc length s = rθ into v = rω and a = rα         |
| Vector cross product | Explains why a_c points inward (ω × (ω × r))              |
| Rigid-body constraint| Guarantees r is constant so dr/dt = 0                     |

If any row is unfamiliar, pause and review the corresponding linear-kinematics section first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Arc length to angle
A point on a rigid body travels an arc s whose length is exactly the angle θ (in radians) times the radius r.  
Example: a wheel of radius 0.3 m rolling through θ = π/2 rad covers s = 0.47 m.  
Formal statement:  
$$s = r\theta.$$  
> [!WARNING]  
> Treating θ in degrees instead of radians breaks every subsequent derivative.

### Step 2 — First time derivative: linear velocity
Differentiate both sides with respect to t, noting r constant:  
$$v = \frac{ds}{dt} = r\frac{d\theta}{dt} = r\omega.$$  
Example: same wheel now spinning at ω = 10 rad s⁻¹ gives rim speed v = 3 m s⁻¹.  
> [!WARNING]  
> Forgetting that r is measured from the instantaneous axis produces the wrong linear speed.

### Step 3 — Direction of v
Velocity v is always perpendicular to the position vector r; its magnitude is rω while its direction follows the right-hand rule.  
Formal: \(\vec{v} = \vec{\omega} \times \vec{r}\).

### Step 4 — Second derivative: tangential acceleration
Differentiate v = rω once more:  
$$a_t = r\alpha, \quad \alpha = \frac{d\omega}{dt}.$$  
This component changes the speed but not the direction of motion.

### Step 5 — Centripetal acceleration appears automatically
The full acceleration vector also contains the term that turns the velocity vector:  
$$\vec{a}_c = \vec{\omega} \times (\vec{\omega} \times \vec{r}) = -r\omega^2\hat{r}.$$  
Magnitude a_c = rω² points toward the centre.

### Step 6 — Textbook-grade synthesis
For any rigid body the complete linear acceleration at distance r is therefore  
$$\vec{a} = r\alpha\,\hat{\theta} - r\omega^2\,\hat{r}.$$

## 5. Worked examples — har step show karo

**Example 1 — Simple wheel**  
*Given:* A bicycle wheel of radius 0.35 m rotates at constant ω = 12 rad s⁻¹.  
*Find:* Linear speed of a point on the rim.  
v = rω = 0.35 × 12 = 4.2 m s⁻¹.  
*Why:* r is constant and ω is given directly, so one multiplication suffices.  
**4.2 m s⁻¹**

*Reflection:* The example isolates the v = rω relation without acceleration.

**Example 2 — Accelerating pulley**  
*Given:* Pulley radius 0.2 m reaches α = 5 rad s⁻² from rest in 3 s.  
*Find:* Tangential acceleration and final linear speed of a belt on the rim.  
a_t = rα = 0.2 × 5 = 1 m s⁻².  
ω = αt = 15 rad s⁻¹ → v = rω = 3 m s⁻¹.  
*Why:* a_t governs speed change; v follows from integrating α.  
**a_t = 1 m s⁻², v = 3 m s⁻¹**

*Reflection:* Shows how α maps to a_t exactly as ω maps to v.

**Example 3 — Car on curve**  
*Given:* Car travels at 20 m s⁻¹ on a 50 m radius bend.  
*Find:* Centripetal acceleration felt by passengers.  
a_c = v²/r = 400/50 = 8 m s⁻² (or equivalently rω² with ω = v/r).  
*Why:* Direction change requires inward acceleration even at constant speed.  
**8 m s⁻² toward centre**

*Reflection:* Demonstrates that a_c depends on ω², hence grows rapidly with speed.

**Example 4 — Combined accelerations**  
*Given:* A disk of radius 0.4 m has ω = 8 rad s⁻¹ and α = 3 rad s⁻² at a certain instant.  
*Find:* Magnitude of total linear acceleration at the rim.  
a_t = 0.4 × 3 = 1.2 m s⁻², a_c = 0.4 × 64 = 25.6 m s⁻².  
|a| = √(1.2² + 25.6²) = 25.63 m s⁻².  
*Why:* Vector addition of orthogonal components is mandatory.  
**25.63 m s⁻²**

*Reflection:* Real mechanisms almost always superpose both accelerations.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using degrees for ω or α          | Calculator default or habit                 | Always convert to rad before differentiating |
| Treating a_c as “another force”   | Confusing kinematics with dynamics          | Remember a_c is purely kinematic             |
| Forgetting a_c grows with ω²      | Linear intuition fails at high speed        | Compute ω first, then square                 |
| Applying v = rω at the wrong r    | Choosing diameter or chord length           | Measure perpendicular distance to axis       |
| Sign errors in a_t direction      | Ambiguous clockwise/counter-clockwise       | Fix a consistent positive sense first        |
| Mixing instantaneous axis with CM | Rigid-body translation + rotation           | Choose one axis and stay with it             |
| Assuming α = 0 when ω constant    | Missing that direction can still change     | Check both α and ω separately                |

## 7. The textbook-precise statement
Kleppner & Kolenkow, *An Introduction to Mechanics*, 2nd ed., §6.3:  
“For a rigid body rotating about a fixed axis, the velocity and acceleration of any point at position \(\vec{r}\) relative to the axis are given by  
\(\vec{v} = \vec{\omega} \times \vec{r}\),  
\(\vec{a} = \vec{\alpha} \times \vec{r} + \vec{\omega} \times (\vec{\omega} \times \vec{r})\),  
where \(\vec{\omega}\) is the angular-velocity vector along the axis and \(\vec{\alpha} = d\vec{\omega}/dt\). The first term on the right of the acceleration equation is the tangential component of magnitude rα; the second is the centripetal component of magnitude rω² directed toward the axis.”

## 8. Visual — diagram or schematic
```
          ω (out of page)
            ↑
            │
   r        │
●───────────┼───────────●  rim point
     a_c ←──┼──→ a_t
   (inward) │   (tangent)
            │
         axis
```
The diagram shows a point at distance r from the rotation axis; ω is perpendicular to the plane, v and a_t lie in the plane, a_c points radially inward.

## 9. The memory technique

1. **The hook**  
   Picture a spinning vinyl record: the needle’s linear speed is literally “radius times how fast the record turns.”

2. **What to overlearn**  
   v = rω, a_t = rα, a_c = rω² (all three must be instantaneous recall).

3. **Spaced-repetition schedule**  
   Review after 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback**  
   Start from arc length s = rθ, differentiate twice with respect to time while holding r fixed.

## 10. What this unlocks
These three relations are the bridge that lets every linear equation become a rotational equation by simple substitution of v → rω, a → rα, etc.

- Kinetic energy ½mv² becomes ½Iω² once I = Σmr² is introduced.  
- Newton’s second law F = ma becomes τ = Iα.  
- Momentum p = mv becomes L = Iω.  
- Work-energy theorems and conservation laws carry over unchanged in form.

## 11. Self-check — five questions, no answers
1. A 0.25 m radius gear rotates at 40 rad s⁻¹. What is the linear speed of a tooth tip?  
2. If α drops to zero while ω remains 40 rad s⁻¹, does the centripetal acceleration change?  
3. A particle moves in a circle of radius 2 m with speed increasing by 0.5 m s⁻². Express α.  
4. Why does doubling ω quadruple a_c but only double v?  
5. At which point on a rigid body is v = rω invalid if the body is also translating?