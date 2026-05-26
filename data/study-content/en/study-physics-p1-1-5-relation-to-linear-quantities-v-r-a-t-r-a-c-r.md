## 1. The one-sentence answer
**These three relations convert every linear kinematic quantity of a point on a rigid body into its angular counterpart measured from the axis of rotation.**

A point at distance \(r\) from the rotation axis traces an arc whose length is \(s = r\theta\). Differentiating once with respect to time yields speed along the path; differentiating again isolates the two orthogonal components of acceleration that appear in circular motion. The conversion is purely geometric once the rigid-body constraint (constant \(r\)) is imposed.

The same geometry appears in any system whose parts are forced to maintain fixed separations while turning about a common line: a wheel rim, a satellite in orbit, a turbine blade, or a molecule in a rotating frame. Because the factors of \(r\) are identical in every derivative, the mapping is exact and instantaneous.

> [!NOTE]
> The three formulas are not separate laws; they are three successive time derivatives of the single arc-length identity \(s = r\theta\).

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage landing burns require precise knowledge of the vehicle’s angular velocity about its long axis; the relation \(v = r\omega\) converts the measured gimbal angles and nozzle speeds into the linear velocity of propellant flowing through turbopumps located 1.8 m off centerline.

The Event Horizon Telescope reconstructs images of M87* by correcting for the differential light-travel time across the 6,000 km baseline of the array; each station’s linear speed due to Earth’s rotation is obtained from \(v = r\omega\) with \(r\) equal to the perpendicular distance from the station to the Earth’s axis.

Reaction wheels on the James Webb Space Telescope maintain pointing stability to 7 mas; the centripetal acceleration term \(a_c = r\omega^2\) inside each wheel’s bearings sets the thermal load that must be rejected by the cryocooler loop.

Semiconductor lithography scanners from ASML rotate 300 mm wafers at 200 rpm while the reticle stage moves linearly; the tangential acceleration relation \(a_t = r\alpha\) determines the servo torque budget needed to keep overlay error below 1 nm.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Arc length \(s = r\theta\) | Supplies the single geometric identity whose derivatives produce all three kinematic relations |
| Definition of radian     | Ensures \(\theta\) is dimensionless so that \(v = r\omega\) carries consistent SI units |
| Vector cross product     | Expresses the direction of \(\mathbf{v}\) and the decomposition of \(\mathbf{a}\) into tangential and radial parts |

## 4. Building the idea — from intuition to formalism

### Step 1 — Arc length is proportional to angle
A rigid body keeps every point at fixed distance \(r\) from the axis. When the body rotates through angle \(\theta\), the point travels an arc \(s = r\theta\).  
Example: a wheel of radius 0.3 m turns through 2 rad; the rim point moves 0.6 m.  
Formal statement:  
$$s = r\theta.$$  
> [!WARNING]
> Treating \(\theta\) as degrees instead of radians inserts a hidden factor of \(\pi/180\) that ruins every subsequent derivative.

### Step 2 — Linear speed follows by one differentiation
Differentiate \(s = r\theta\) with respect to time; \(r\) is constant, so  
$$v = \frac{ds}{dt} = r\frac{d\theta}{dt} = r\omega.$$  
Example: same wheel at \(\omega = 10\) rad s\(^{-1}\) gives rim speed 3 m s\(^{-1}\).  
> [!WARNING]
> Omitting the chain-rule recognition that \(\omega = d\theta/dt\) produces the common error of writing \(v = \omega\) without the lever arm \(r\).

### Step 3 — Tangential acceleration appears on the second derivative
Differentiate \(v = r\omega\):  
$$a_t = \frac{dv}{dt} = r\frac{d\omega}{dt} = r\alpha.$$  
This component is parallel to the velocity and changes only the speed.  
> [!WARNING]
> Confusing \(a_t\) with the total acceleration vector leads to missing the separate centripetal term required for curved paths.

### Step 4 — Centripetal acceleration arises from the change in direction
Even when \(\omega\) is constant, the direction of \(\mathbf{v}\) rotates. The magnitude of this inward acceleration is obtained from the limit of \(\Delta\mathbf{v}/\Delta t\) for small angular increments:  
$$a_c = r\omega^2.$$  
> [!WARNING]
> Sign errors appear if the radial unit vector is not recognized as inward; the vector form \(\mathbf{a}_c = -\omega^2\mathbf{r}\) prevents this.

### Step 5 — Vector statement unifies all three relations
The single rigid-body velocity field is  
$$\mathbf{v} = \boldsymbol{\omega}\times\mathbf{r},$$  
whose time derivative yields both acceleration components simultaneously. This is the textbook endpoint.

## 5. Worked examples — every step shown

**Example 1 — Rim speed of a drone propeller**  
*Given:* propeller radius \(r = 0.12\) m, rotation rate 8000 rpm.  
*Find:* tip speed \(v\).  
Convert rpm to rad s\(^{-1}\):  
$$\omega = 8000\times\frac{2\pi}{60} = 837.8\,\text{rad s}^{-1}.$$  
*Why:* 2\(\pi\) converts revolutions to radians; 60 converts minutes to seconds.  
Apply \(v = r\omega\):  
$$v = 0.12\times837.8 = 100.5\,\text{m s}^{-1}.$$  
**100.5 m s\(^{-1}\)**  
*Reflection:* The conversion of rpm is the only non-obvious arithmetic step; once \(\omega\) is in rad s\(^{-1}\), the formula is immediate.

**Example 2 — Tangential acceleration during spin-up**  
*Given:* a reaction wheel reaches \(\omega = 300\) rad s\(^{-1}\) from rest in 4 s with constant \(\alpha\).  
*Find:* \(a_t\) at the rim (\(r = 0.05\) m).  
First obtain \(\alpha\):  
$$\alpha = \frac{300-0}{4} = 75\,\text{rad s}^{-2}.$$  
*Why:* definition of average angular acceleration under constant \(\alpha\).  
Then  
$$a_t = r\alpha = 0.05\times75 = 3.75\,\text{m s}^{-2}.$$  
**3.75 m s\(^{-2}\)**  
*Reflection:* The time interval supplies \(\alpha\) directly; the same \(r\) multiplies both \(\omega\) and \(\alpha\).

**Example 3 — Centripetal acceleration in low-Earth orbit**  
*Given:* orbital radius 6771 km, period 92 min.  
*Find:* \(a_c\).  
Convert period to angular speed:  
$$\omega = \frac{2\pi}{92\times60} = 1.141\times10^{-3}\,\text{rad s}^{-1}.$$  
*Why:* one revolution = \(2\pi\) rad.  
Then  
$$a_c = r\omega^2 = 6.771\times10^6\times(1.141\times10^{-3})^2 = 8.82\,\text{m s}^{-2}.$$  
**8.82 m s\(^{-2}\)**  
*Reflection:* Note that \(a_c \approx g\); the orbital condition \(g = r\omega^2\) is recovered exactly.

**Example 4 — Combined acceleration at a turbine blade tip**  
*Given:* blade length 0.25 m, \(\omega = 1200\) rad s\(^{-1}\), \(\alpha = 40\) rad s\(^{-2}\).  
*Find:* magnitude of total acceleration.  
Compute components:  
$$a_t = 0.25\times40 = 10\,\text{m s}^{-2},$$  
$$a_c = 0.25\times(1200)^2 = 360000\,\text{m s}^{-2}.$$  
*Why:* \(a_t\) and \(a_c\) are orthogonal, so Pythagorean magnitude applies.  
Total:  
$$a = \sqrt{10^2 + 360000^2} \approx 360000\,\text{m s}^{-2}.$$  
**360000 m s\(^{-2}\)**  
*Reflection:* \(a_c\) dominates by four orders of magnitude; direction is essentially radial.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using degrees for \(\omega\)      | Default calculator mode and everyday language       | Always convert to rad s\(^{-1}\) before any formula  |
| Adding \(a_t\) and \(a_c\) as scalars | Both called “acceleration”                          | Remember they are perpendicular; use vector sum      |
| Forgetting \(r\) in \(a_c = r\omega^2\) | Confusing with \(a = v^2/r\) after substituting \(v = r\omega\) | Keep the lever arm explicit until substitution       |
| Treating \(\alpha\) as linear acceleration | Notation similarity                                 | Always label angular quantities with Greek letters   |
| Sign error on centripetal direction | Inward versus outward intuition                     | Use \(\mathbf{a}_c = -\omega^2\mathbf{r}\)           |
| Mixing instantaneous and average values | \(\omega\) changes during spin-up                   | Specify whether \(\omega\) is evaluated at one instant |
| Unit mismatch after chain-rule differentiation | \(r\) in metres, \(\theta\) in radians (dimensionless) | Track units at each derivative step                  |

## 7. The textbook-precise statement
For a rigid body rotating about a fixed axis with instantaneous angular velocity \(\boldsymbol{\omega}\) and angular acceleration \(\boldsymbol{\alpha}\), the velocity and acceleration of any point whose position relative to a point on the axis is \(\mathbf{r}\) are given by  
$$\mathbf{v} = \boldsymbol{\omega}\times\mathbf{r},$$  
$$\mathbf{a} = \boldsymbol{\alpha}\times\mathbf{r} + \boldsymbol{\omega}\times(\boldsymbol{\omega}\times\mathbf{r}).$$  
The first term on the right of the acceleration equation is the tangential component of magnitude \(r\alpha\); the second is the centripetal component of magnitude \(r\omega^2\) directed toward the axis. (Goldstein, *Classical Mechanics*, 3e, §4.2.)

## 8. Visual — diagram or schematic
```text
          a_c (inward)
            ↑
            |
   v →  ●─────── r ─────── axis
            |
            ↓
          a_t (tangent)
```
A circle of radius \(r\) centered on the rotation axis. The velocity vector \(\mathbf{v}\) is tangent; \(\mathbf{a}_t\) lies along the same tangent line; \(\mathbf{a}_c\) points radially inward. All three vectors are mutually perpendicular in the instantaneous frame.

## 9. The memory technique
1. **The hook** — Picture a gear tooth painted on the rim of a wheel: its linear speed is literally the product of how far it sits from the axle and how fast the axle spins.  
2. **What to overlearn** — \(v = r\omega\), \(a_t = r\alpha\), \(a_c = r\omega^2\) with the understanding that each follows from one more time derivative of \(s = r\theta\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start from \(s = r\theta\), differentiate once for \(v\), again for \(a_t\), and invoke the centripetal limit for \(a_c\).

## 10. What this unlocks
These three kinematic bridges let every linear statement about force, momentum, or energy be rewritten in angular language, opening the door to torque, moment of inertia, and the rotational work–energy theorem.  
- Angular momentum \(\mathbf{L} = I\boldsymbol{\omega}\)  
- Torque equation \(\boldsymbol{\tau} = I\boldsymbol{\alpha}\)  
- Rotational kinetic energy \(\frac12 I\omega^2\)  
- Euler’s rigid-body equations for three-dimensional rotation

## 11. Self-check — five questions, no answers
1. A 0.4 m radius disk spins at 25 rad s\(^{-1}\). What is the linear speed of a point 0.1 m from the center?  
2. The same disk accelerates uniformly from rest to 25 rad s\(^{-1}\) in 5 s. Compute the tangential acceleration at the rim.  
3. A car’s tire (radius 0.33 m) rotates at 120 rad s\(^{-1}\). What is the centripetal acceleration of a point on the tread?  
4. Why does the centripetal acceleration term remain even when angular speed is constant?  
5. A particle moves in a circle of radius \(r\) with angular speed that increases linearly with time. Which of the three relations changes if the radius is doubled while the angular quantities are held fixed?