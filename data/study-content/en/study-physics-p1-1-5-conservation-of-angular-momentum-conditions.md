## 1. The one-sentence answer
**Conservation of angular momentum holds precisely when the net external torque on a system is zero.**

Angular momentum of a particle or rigid body is the rotational analogue of linear momentum. It changes only when an external twisting force—torque—acts on the system. When every external torque cancels or is absent, the total angular momentum vector remains fixed in both magnitude and direction.

This condition follows directly from the rotational form of Newton’s second law. The time derivative of angular momentum equals the net external torque. Setting that torque to zero forces the derivative to vanish, so the quantity itself is constant. The result applies to isolated systems, to systems whose external forces pass through a chosen point, and to central-force problems where forces lie along the position vector.

> [!NOTE]
> The single most powerful intuition is that angular momentum is conserved under the same logical rule that conserves linear momentum—only replace “net force” with “net torque.”

## 2. Why this matters — concrete and current
SpaceX’s Starlink satellites use reaction wheels and magnetorquers to maintain attitude. With no net external torque in the orbital environment, the total angular momentum of the satellite-plus-wheel system stays constant; spinning the wheels one way rotates the bus the opposite way without expending propellant.

The Event Horizon Telescope collaboration models the spin of M87* and Sgr A*. Because the black-hole spacetime is axisymmetric, the Killing vector yields a conserved angular momentum for infalling plasma; this conservation law is used to interpret the observed ring asymmetry reported in the 2019 and 2022 papers.

Neutron-star glitches observed by NICER and radio telescopes are explained by the sudden transfer of angular momentum between the superfluid interior and the crust. With external electromagnetic torque varying slowly, the total angular momentum of the star remains essentially constant on glitch timescales, allowing observers to infer internal moments of inertia.

The Juno spacecraft’s spin-stabilized attitude at Jupiter relies on conservation of angular momentum about its center of mass. Thruster firings are planned so that any residual torque is negligible; the measured spin rate therefore drifts only by the known external solar-radiation torque, which is modelled to milliarcsecond accuracy.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definition of torque     | Torque is the time derivative of angular momentum         |
| Vector cross product     | Angular momentum and torque are both defined via \(\mathbf{r}\times\mathbf{p}\) and \(\mathbf{r}\times\mathbf{F}\) |
| Newton’s second law for rotation | The equation \(\boldsymbol{\tau}_{\rm ext}=d\mathbf{L}/dt\) is the direct parent of the conservation statement |
| Isolated versus closed systems | Only external torques matter; internal torques cancel by Newton’s third law |

## 4. Building the idea — from intuition to formalism

### Step 1 — Linear momentum changes only under net external force
A particle’s linear momentum \(\mathbf{p}\) obeys \(d\mathbf{p}/dt=\mathbf{F}_{\rm ext}\). When the vector sum of all external forces is zero, \(\mathbf{p}\) is constant.  
Concrete example: two ice skaters pushing each other on frictionless ice; their individual momenta change, but the pair’s total momentum does not.  
Formal statement:  
$$ \frac{d\mathbf{P}}{dt}=\mathbf{F}_{\rm ext}^{\rm net}=0 \implies \mathbf{P}={\rm constant}. $$  
> [!WARNING] Treating internal forces as able to change total momentum is the most common early error.

### Step 2 — Angular momentum is defined by the same cross-product structure
Replace \(\mathbf{p}\) with \(\mathbf{r}\times\mathbf{p}\). The new quantity \(\mathbf{L}\) measures rotational tendency about a chosen origin.  
Example: a mass on a string swung in a circle has \(\mathbf{L}\) perpendicular to the plane and constant in magnitude if speed is constant.  
Formal definition:  
$$ \mathbf{L}=\mathbf{r}\times\mathbf{p}. $$

### Step 3 — Torque is the rotational counterpart of force
Differentiate \(\mathbf{L}\) with respect to time and apply the product rule. After using \(\mathbf{v}=\dot{\mathbf{r}}\) and \(\mathbf{F}=m\mathbf{a}\), the result is  
$$ \boldsymbol{\tau}=\mathbf{r}\times\mathbf{F}=\frac{d\mathbf{L}}{dt}. $$  
Example: a door pushed at its handle produces torque about the hinge; pushing at the hinge produces zero torque.

### Step 4 — Only external torque survives in the system total
For a collection of particles, internal torques appear in equal-and-opposite pairs (Newton’s third law plus central forces). Their contributions cancel, leaving  
$$ \boldsymbol{\tau}_{\rm ext}^{\rm net}=\frac{d\mathbf{L}_{\rm total}}{dt}. $$  
> [!WARNING] Forgetting that internal torques cancel leads to the false belief that friction inside a system can change total \(\mathbf{L}\).

### Step 5 — The conservation statement follows at once
Whenever \(\boldsymbol{\tau}_{\rm ext}^{\rm net}=0\),  
$$ \frac{d\mathbf{L}}{dt}=0 \implies \mathbf{L}={\rm constant}. $$  
This is the textbook condition: angular momentum of a system is conserved if and only if the net external torque about the chosen point (or axis) vanishes.

## 5. Worked examples — every step shown

**Example 1 — Point mass on frictionless table**  
*Given:* A 0.2 kg mass moves at 3 m s⁻¹ in a straight line 0.5 m from the origin. No forces act in the plane.  
*Find:* Angular momentum about the origin.  
Step 1: \(\mathbf{L}=\mathbf{r}\times\mathbf{p}\).  
*Why:* Definition of angular momentum.  
Step 2: Magnitude \(L=r\,p\sin\theta=0.5\times0.6\times1=0.3\) kg m² s⁻¹ (perpendicular).  
*Why:* \(\sin\theta=1\) because velocity is perpendicular to radius vector.  
Step 3: No external torque exists, therefore \(\mathbf{L}\) remains constant.  
**Final answer**  
$$\mathbf{L}=0.3\,\hat{\mathbf{k}}\ \rm kg\,m^2\,s^{-1}$$  
*Reflection:* The absence of torque is guaranteed by the frictionless table; the result generalises to any central-force motion.

**Example 2 — Ice skater pulling arms in**  
*Given:* Skater moment of inertia changes from 2.5 kg m² to 1.0 kg m² while spinning at 2 rev s⁻¹; arms exert only internal forces.  
*Find:* New angular speed.  
Step 1: External torque about vertical axis is zero (gravity and normal force act through axis).  
*Why:* Condition for conservation.  
Step 2: \(L=I\omega={\rm constant}\).  
*Why:* Direct statement of conservation.  
Step 3: \(2.5\times(2\times2\pi)=1.0\times\omega_f\).  
*Why:* Substitute numerical values.  
**Final answer**  
$$\omega_f=5\pi\ \rm rad\,s^{-1}$$  
*Reflection:* Internal muscle forces cannot change total \(L\); they only redistribute it between body segments.

**Example 3 — Two-body central-force orbit**  
*Given:* Reduced mass \(\mu\) moves under central force \(\mathbf{F}(r)\).  
*Find:* Prove areal velocity is constant.  
Step 1: Torque \(\boldsymbol{\tau}=\mathbf{r}\times\mathbf{F}=0\) because \(\mathbf{F}\parallel\mathbf{r}\).  
*Why:* Cross product vanishes.  
Step 2: \(d\mathbf{L}/dt=0\) so \(\mathbf{L}=\mu\mathbf{r}\times\mathbf{v}={\rm constant}\).  
*Why:* Conservation statement.  
Step 3: Magnitude \(L=2\mu\,dA/dt\), hence \(dA/dt=L/(2\mu)\).  
*Why:* Geometric identity for areal speed.  
**Final answer**  
$$ \frac{dA}{dt}=\frac{L}{2\mu}={\rm constant} $$  
*Reflection:* Kepler’s second law is simply conservation of angular momentum under central gravity.

**Example 4 — Satellite with reaction wheel**  
*Given:* Satellite body inertia 500 kg m², wheel inertia 0.05 kg m². Wheel spun up to 5000 rpm while satellite is initially at rest. External torque negligible.  
*Find:* Resulting satellite angular velocity.  
Step 1: Total \(L=0\) initially and therefore always zero.  
*Why:* No external torque.  
Step 2: \(I_b\omega_b+I_w\omega_w=0\).  
*Why:* Vector sum along axis.  
Step 3: \(\omega_b=- (0.05/500)\times(5000\times2\pi/60)\).  
*Why:* Solve for body rate.  
**Final answer**  
$$\omega_b\approx-0.0524\ \rm rad\,s^{-1}$$  
*Reflection:* The wheel stores angular momentum internally; the spacecraft body must counter-rotate to keep the total fixed.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Applying conservation when friction at a pivot supplies torque | Students forget that static friction can exert torque about the pivot point | Always compute \(\boldsymbol{\tau}_{\rm ext}\) about the chosen point explicitly |
| Confusing reference point | Angular momentum and torque depend on origin; a force may produce zero torque about one point but not another | State the origin before writing \(\mathbf{L}\) or \(\boldsymbol{\tau}\) |
| Treating gravity as automatically torque-free | Gravity acts at the centre of mass, so torque about CM is zero, but torque about another point need not be | Check whether line of action passes through the chosen point |
| Assuming internal torques cancel for non-central forces | Newton’s third law alone does not guarantee torque cancellation if forces are not along \(\mathbf{r}_{ij}\) | Verify that the force law is central before cancelling internal torques |
| Ignoring time-varying moments of inertia | Changing \(I\) does not violate conservation of \(L\) provided \(\tau_{\rm ext}=0\) | Keep \(L=I\omega\) constant and solve for \(\omega(t)\) |
| Using scalar \(L\) when direction changes | Direction of \(\mathbf{L}\) is conserved only if net torque is zero in all components | Treat \(\mathbf{L}\) as a vector until the axis of symmetry is confirmed |
| Applying conservation across collisions with external impulses | An impulsive external force delivers finite torque impulse | Integrate \(\int\boldsymbol{\tau}\,dt\) across the event; if nonzero, \(L\) jumps |

## 7. The textbook-precise statement
Let \(S\) be a system of particles or a rigid body. Let \(\mathbf{L}_O\) be the total angular momentum of \(S\) about a point \(O\) fixed in an inertial frame (or about the centre of mass). Then  
$$ \boldsymbol{\tau}_O^{\rm ext}=\frac{d\mathbf{L}_O}{dt}, $$  
where \(\boldsymbol{\tau}_O^{\rm ext}\) is the sum of all torques on \(S\) due to forces external to \(S\). Consequently, if \(\boldsymbol{\tau}_O^{\rm ext}=\mathbf{0}\) for all \(t\) in an interval, \(\mathbf{L}_O\) is constant on that interval. (Kleppner & Kolenkow, *An Introduction to Mechanics*, 2nd ed., §6.3, Theorem 1.)

## 8. Visual — diagram or schematic
```text
          τ_ext = 0
             ↑
   ------------------  axis (z)
   |                |
   |   rigid body   |   L = constant vector
   |                |
   ------------------
        r × F_int cancel
```
The diagram shows an arbitrary rigid body rotating about a fixed z-axis. External torque arrow is absent; internal force pairs produce torques that cancel by the central-force assumption. The angular-momentum vector \(\mathbf{L}\) is drawn parallel to the axis and labelled “constant.”

## 9. The memory technique
1. **The hook** — Picture a locked safe labelled “Angular Momentum”; the only key that opens it is a net external torque. No torque key, safe stays shut.
2. **What to overlearn** — \(\boldsymbol{\tau}_{\rm ext}=d\mathbf{L}/dt\); \(\mathbf{L}=\mathbf{r}\times\mathbf{p}\); internal torques cancel for central forces.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from \(\mathbf{L}=\sum\mathbf{r}_i\times\mathbf{p}_i\), differentiate, apply \(\mathbf{F}=m\mathbf{a}\) and Newton’s third law to reach \(\boldsymbol{\tau}_{\rm ext}=d\mathbf{L}/dt\).

## 10. What this unlocks
Mastery of the zero-torque condition lets you analyse any isolated rotator, central-force orbit, or reaction-wheel spacecraft without integrating the full equations of motion.

- Precession of a symmetric top under gravity (torque is nonzero but perpendicular to \(\mathbf{L}\))
- Euler’s equations for rigid-body rotation
- Spin–orbit coupling and tidal locking
- Noether’s theorem link between rotational invariance and angular-momentum conservation

## 11. Self-check — five questions, no answers
1. A bullet strikes and embeds in a rod pivoted at one end. Is angular momentum about the pivot conserved during the collision? Why or why not?
2. Two particles interact via a force always directed along the line joining them. Prove that their total angular momentum about any fixed point is conserved.
3. A cat falls with zero initial angular momentum. How can it land on its feet without violating conservation of angular momentum?
4. A spacecraft in deep space fires an ion thruster whose thrust line does not pass through the centre of mass. What happens to the total angular momentum about the centre of mass?
5. Derive the condition under which angular momentum about a moving point (not the centre of mass) is conserved even when external forces act.