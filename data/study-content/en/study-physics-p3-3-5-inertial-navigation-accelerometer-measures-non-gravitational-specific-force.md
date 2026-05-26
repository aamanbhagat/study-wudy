## 1. The one-sentence answer
**An accelerometer measures non-gravitational specific force**, the net contact force per unit mass exerted on its proof mass by the instrument housing.

In free fall under gravity alone, the proof mass and housing accelerate identically, so the sensor registers zero output. Any measured reading therefore arises solely from forces that are not gravitational, such as thrust, aerodynamic lift, or structural reaction. This distinction follows directly from the equivalence principle: locally, gravitational and inertial effects are indistinguishable, so an accelerometer cannot sense gravity.

The implication for inertial navigation is immediate. Position and velocity are obtained by integrating the accelerometer output twice, yet the integration yields motion relative to a freely falling frame; an independent gravity model must later be added to recover inertial acceleration.

> [!NOTE]
> The single most important insight is that an accelerometer is a *specific-force* meter, never an acceleration meter; gravity is invisible to it because the entire sensor falls together.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage return-to-launch-site guidance relies on a navigation-grade inertial measurement unit whose accelerometers integrate non-gravitational specific force to maintain an accurate velocity estimate while the vehicle is under thrust and aerodynamic load; gravity is removed afterward by an onboard Earth-gravity model.

NASA’s Orion spacecraft uses the same principle during atmospheric entry: the guidance algorithm integrates accelerometer data to compute sensed drag and lift, then modulates bank angle, all while treating gravity as a separately modelled vector that the accelerometers never observe.

Modern commercial airliners such as the Boeing 787 employ ring-laser-gyro strapdown inertial reference systems whose accelerometers supply the specific-force vector; the flight-management computer subtracts a computed plumb-bob gravity to obtain the inertial acceleration used for attitude and position propagation during GPS outages.

Autonomous underwater vehicles such as those developed for seabed mapping integrate accelerometer outputs over long submerged transits; because buoyancy and hydrodynamic forces are non-gravitational, the accumulated specific force yields dead-reckoned position once an Earth-gravity model is restored.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Inertial reference frame | Defines the frame in which Newton’s second law is written without fictitious forces |
| Specific force           | The physical quantity actually reported by any accelerometer |
| Equivalence principle    | Explains why gravitational acceleration produces no sensor output |
| Vector differentiation in rotating frames | Required when the instrument axes themselves rotate relative to inertial space |

## 4. Building the idea — from intuition to formalism

### Step 1 — Specific force is contact force per unit mass
An accelerometer contains a proof mass restrained by springs or electrostatic fields. Only forces transmitted through those restraints are registered.  
Concrete example: a bathroom scale reads your weight because the floor pushes upward; in free fall the scale reads zero because no contact force exists.  
Formally,  
$$
\mathbf{f} \equiv \frac{\mathbf{F}_\text{contact}}{m}.
$$
> [!WARNING]
> Treating the output as “acceleration” instead of specific force will later produce a position error that grows as \( \frac12 g t^2 \) when the vehicle is in free fall.

### Step 2 — Newton’s second law separates gravitational and non-gravitational terms
In an inertial frame,  
$$
m \frac{d^2\mathbf{r}}{dt^2} = \mathbf{F}_\text{grav} + \mathbf{F}_\text{contact}.
$$
Dividing by mass isolates the measurable contact term:  
$$
\frac{d^2\mathbf{r}}{dt^2} = \mathbf{g} + \mathbf{f}.
$$
> [!WARNING]
> Omitting the separation leads to the incorrect claim that accelerometers measure \( d^2\mathbf{r}/dt^2 \).

### Step 3 — The instrument cannot observe \(\mathbf{g}\)
Because every atom of the proof mass and housing accelerates identically under gravity, the relative displacement inside the sensor remains zero when \(\mathbf{f}=0\).  
Thus the accelerometer output equals \(\mathbf{f}\) exactly.

### Step 4 — Inertial acceleration is recovered by adding a gravity model
Rearrangement yields the inertial acceleration required for navigation:  
$$
\mathbf{a}_\text{inertial} = \mathbf{f}_\text{measured} + \mathbf{g}(\mathbf{r}).
$$
Numerical double integration of \(\mathbf{a}_\text{inertial}\) produces velocity and position.

### Step 5 — Textbook statement of the measurement equation
In a strapdown inertial navigation system the accelerometer triad measures the specific-force vector expressed in body axes; after transformation to the navigation frame and addition of the local gravity vector, the result is integrated to maintain the navigation state.

## 5. Worked examples — every step shown

**Example 1 — Stationary accelerometer on Earth**  
*Given:* An accelerometer aligned with the local vertical reads \( +9.81\,\text{m s}^{-2} \).  
*Find:* The inertial acceleration of the instrument.  
The measurement equation is  
$$
\mathbf{a}_\text{inertial} = \mathbf{f}_\text{meas} + \mathbf{g}.
$$  
Here \(\mathbf{f}_\text{meas} = +9.81\,\hat{\mathbf{z}}\) (upward contact force) and \(\mathbf{g} = -9.81\,\hat{\mathbf{z}}\).  
Adding gives  
$$
\mathbf{a}_\text{inertial} = 0.
$$  
**0**  
*Reflection:* The example shows that a non-zero reading corresponds to zero inertial acceleration once gravity is restored.

**Example 2 — Free-falling elevator**  
*Given:* An accelerometer inside an elevator in free fall.  
*Find:* Its output.  
No contact force acts on the proof mass, so \(\mathbf{f}_\text{meas} = \mathbf{0}\).  
The inertial acceleration is exactly \(\mathbf{g}\), confirming the sensor reports zero.

**Example 3 — Rocket under constant thrust**  
*Given:* A sounding rocket accelerates vertically at \( 20\,\text{m s}^{-2} \) while gravity is \( -9.81\,\text{m s}^{-2} \).  
*Find:* Accelerometer reading.  
\[
\mathbf{f}_\text{meas} = \mathbf{a}_\text{inertial} - \mathbf{g} = 20 - (-9.81) = 29.81\,\text{m s}^{-2}.
\]  
**29.81 m s^{-2} upward**  
*Reflection:* The sensor reports the sum of thrust-induced acceleration and the “negative gravity” term.

**Example 4 — Orbiting spacecraft**  
*Given:* A satellite in circular low-Earth orbit where gravitational acceleration has magnitude \( 8.7\,\text{m s}^{-2} \) toward Earth centre.  
*Find:* Accelerometer output when no thrusters fire.  
Contact force is zero, therefore  
$$
\mathbf{f}_\text{meas} = \mathbf{0}.
$$  
Inertial acceleration equals gravitational acceleration, yet the instrument reads zero.  
*Reflection:* This case demonstrates why orbital navigation must rely on an external gravity model rather than raw accelerometer data.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Calling accelerometer output “acceleration” | Everyday language equates the two | Always prefix the word “specific-force” when describing the raw measurement |
| Forgetting to add \(\mathbf{g}\) after integration | Intuition that “the sensor already measures everything” | Write the measurement equation explicitly before coding the integrator |
| Assuming output is zero only in deep space | Confusion between gravitational and contact forces | Remember the equivalence principle: output is zero in any free-fall trajectory |
| Ignoring centripetal acceleration in rotating frames | Treating body axes as inertial | Rotate the specific-force vector into the navigation frame before adding gravity |
| Sign error between \(\mathbf{f}\) and \(\mathbf{g}\) | Ambiguous “up” direction conventions | Adopt a consistent local-level frame definition once and reuse it |
| Treating gravity as constant during long integrations | Earth oblateness and altitude change | Use at least a J2 gravity model when propagation time exceeds a few minutes |
| Neglecting sensor bias as fictitious specific force | Bias looks exactly like a small constant contact force | Estimate bias states inside the navigation Kalman filter |

## 7. The textbook-precise statement
An accelerometer triad rigidly attached to a vehicle measures the specific-force vector  
$$
\mathbf{f}^b = \mathbf{C}_i^b(\mathbf{a}^i - \mathbf{g}^i),
$$  
where superscript \( b \) denotes the body frame, \( \mathbf{C}_i^b \) is the direction-cosine matrix from inertial to body coordinates, \(\mathbf{a}^i\) is the inertial acceleration of the origin, and \(\mathbf{g}^i\) is the gravitational acceleration (Titterton & Weston, *Strapdown Inertial Navigation Technology*, 2nd ed., §3.2).

## 8. Visual — diagram or schematic
```
          Housing (accelerometer case)
   +---------------------------+
   |                           |
   |   spring/electrostatic    |
   |        restraint          |
   |            |              |
   |            v              |
   |        [Proof mass] ------> sensed displacement → output f
   |                           |
   +---------------------------+
            ↑ vehicle body
Gravity g acts equally on housing and proof mass
Contact force F_contact acts only through the restraint
```

## 9. The memory technique
1. **The hook** — Picture an elevator cable snapping: inside, you float; the accelerometer needle stays at zero even though Earth is pulling. The needle only moves when the floor pushes back.  
2. **What to overlearn** — \(\mathbf{a}_\text{inertial}=\mathbf{f}_\text{meas}+\mathbf{g}\); accelerometers measure specific force; output is identically zero in free fall.  
3. **Spaced-repetition schedule** — Review the measurement equation at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start from Newton’s second law, isolate the contact term, and note that gravity never appears in the restraint force.

## 10. What this unlocks
Mastery of the specific-force measurement allows correct mechanization of the inertial navigation equations and proper fusion with external sensors.  

- Strapdown attitude propagation using gyro data  
- Error-state Kalman filtering for INS/GNSS integration  
- Gravity-compensated velocity aiding for hypersonic re-entry guidance  
- Transfer alignment between master and slave inertial platforms  

## 11. Self-check — five questions, no answers
1. An accelerometer mounted on a parked aircraft reads 1 g upward. What is the aircraft’s inertial acceleration?  
2. Derive the accelerometer output for a particle sliding down a frictionless inclined plane of angle \(\theta\).  
3. A spacecraft fires its thrusters to produce an inertial acceleration of \( 5\,\text{m s}^{-2} \) while in circular orbit. What does the onboard accelerometer read?  
4. Why does a high-quality inertial navigation system still require an Earth-gravity model even after double-integrating accelerometer data for one hour?  
5. Identify the hidden assumption in the claim “my phone’s accelerometer tells me how fast I am accelerating down the highway.”