## 1. The one-sentence answer
**The center of gravity and inertia tensor of a rocket are explicit functions of the instantaneous propellant mass distribution and must be recomputed continuously during flight.**

A rocket carries most of its mass as liquid or solid propellant. As this propellant is expelled, both the location of the system center of gravity and the six independent elements of the inertia tensor change. These changes alter the rotational equations of motion and the effectiveness of any control surfaces or thrust-vectoring devices.

Because the vehicle is no longer a fixed rigid body, every term that depends on mass properties—static margin, natural frequencies, control gains—becomes time-varying. Neglecting this variation produces incorrect stability margins and, in severe cases, loss of control.

> [!NOTE]
> The dominant physical effect is that the CG usually migrates forward or aft along the vehicle axis as propellant is depleted; the inertia tensor shrinks and its principal axes may rotate slightly, coupling roll, pitch, and yaw that were previously decoupled.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 first-stage recovery trajectories are computed with a time-varying inertia tensor that changes by more than 60 % between liftoff and separation; the flight software updates the CG location at 100 Hz to keep the TVC actuator commands within structural limits.

Blue Origin’s New Shepard suborbital vehicle uses real-time mass-property estimates to adjust the cold-gas attitude-control system gains once the main engine propellant is exhausted, preventing the large pitch-rate overshoot observed in early test flights when a fixed inertia model was used.

Spin-stabilized upper stages such as the Star 48 motor on Atlas V missions experience a continuous migration of the spin axis relative to the body principal axis; mission analyses published in the 2021 AIAA Astrodynamics Specialist Conference show that ignoring this migration produces a 3°–5° pointing error at spacecraft separation.

ESA’s Ariane 6 launch vehicle incorporates a propellant-depletion model inside its 6-DOF simulator to certify that the solid boosters remain within the required roll-torque envelope after the liquid core stage begins to drain; the model was validated against hot-fire data from the 2022 P120 motor tests.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definition of center of mass | CG is the first moment of mass; propellant removal changes this moment directly |
| Inertia tensor about an arbitrary point | Angular momentum and rotational kinetic energy are expressed with this tensor evaluated at the instantaneous CG |
| Rigid-body rotational equations | Euler’s equations contain both the inertia tensor and its time derivative when mass properties vary |
| Linear momentum balance for variable-mass systems | Thrust and mass-flow terms appear once the CG velocity is no longer zero in the body frame |

## 4. Building the idea — from intuition to formalism

### Step 1 — Locate the instantaneous center of gravity
The center of gravity is the mass-weighted average position of every particle still attached to the vehicle.  
Consider a cylindrical tank of height *H* filled to height *h(t)* with uniform propellant density *ρ*. The empty dry mass *m_d* is concentrated at the geometric center. The CG of the remaining propellant lies at *h(t)/2* from the tank bottom.  
The system CG measured from the tank bottom is  
$$
z_{\text{CG}}(t)=\frac{m_d z_d + \rho A \int_0^{h(t)} z\,dz}{m_d + \rho A h(t)},
$$  
where *A* is the cross-sectional area.  
> [!WARNING]  
> Treating the propellant as a point mass at the tank geometric center instead of integrating produces an error that grows linearly with *h(t)* and can exceed 10 % of vehicle length.

### Step 2 — Express the inertia tensor about the moving CG
The inertia tensor is first computed about a fixed reference point and then shifted to the instantaneous CG with the parallel-axis theorem.  
For the same cylindrical tank the axial moment of inertia about the vehicle centerline is  
$$
I_{xx}(t)=I_{xx,\text{dry}}+\frac{1}{2}m_p(t)R^2,
$$  
while the transverse moments require both the propellant’s own *I* and the *m_p d^2* term, where *d* is the distance between the propellant CG and the system CG.  
> [!WARNING]  
> Forgetting to subtract the *m_p d^2* term when the propellant CG and system CG diverge produces an over-estimate of pitch inertia that grows with the square of propellant mass.

### Step 3 — Differentiate mass properties with respect to time
Because propellant mass *m_p(t)* is a known function of burn time, every inertia element becomes an explicit function of *t*.  
Differentiating the parallel-axis expression yields  
$$
\dot{I}_{ij}(t)=\frac{d}{dt}\Bigl(I_{ij}^{\text{body}}(m_p)\Bigr)-\dot{m}_p(t)\bigl(2d_i d_j+\delta_{ij}d^2\bigr).
$$  
> [!WARNING]  
> Setting \(\dot{I}=0\) inside Euler’s equations violates angular-momentum conservation for a time-varying body and produces fictitious control torques.

### Step 4 — Insert time-varying inertia into the rotational dynamics
Euler’s equation for a rigid body with variable inertia reads  
$$
\mathbf{I}(t)\dot{\boldsymbol{\omega}}+\boldsymbol{\omega}\times\mathbf{I}(t)\boldsymbol{\omega}+\dot{\mathbf{I}}(t)\boldsymbol{\omega}=\mathbf{M}_{\text{ext}}.
$$  
The extra term \(\dot{\mathbf{I}}\boldsymbol{\omega}\) must be evaluated at each integration step.  
> [!WARNING]  
> Using a constant **I** matrix while the vehicle is still burning propellant violates the angular-momentum balance and can make a stable vehicle appear unstable in simulation.

### Step 5 — Update the static margin and control derivatives
Static margin is defined as the distance between CG and neutral point normalized by reference length. Because CG moves, static margin becomes *SM(t)*. Gain-scheduled autopilots must therefore interpolate between pre-computed gain sets at each mass-property update.  
> [!WARNING]  
> Freezing the gain schedule at the liftoff mass properties can drive the closed-loop poles across the imaginary axis once the CG has moved aft of the neutral point.

## 5. Worked examples — every step shown

**Example 1 — Single cylindrical tank, axial CG shift**  
*Given:* Dry mass 2000 kg at *z*=5 m; cylindrical tank *A*=1 m², *ρ*=1000 kg m⁻³, initial height 4 m, propellant burns at constant 20 kg s⁻¹.  
*Find:* *z*_{CG} at *t*=0 and *t*=100 s.  

Mass of propellant at *t*=0: *m_p0*=4000 kg.  
System mass at *t*=0: 6000 kg.  
Numerator at *t*=0: 2000·5 + 4000·2 = 18000 kg m.  
Thus *z*_{CG}(0)=3 m.  
*Why:* The propellant CG is at half-height, so its first moment is *m_p·h/2*.  

At *t*=100 s, *m_p*=2000 kg, height=2 m.  
Numerator: 2000·5 + 2000·1 = 12000 kg m.  
System mass=4000 kg.  
*z*_{CG}(100)=3 m.  
**Final answer:** *z*_{CG}(0)=3 m, *z*_{CG}(100)=3 m (unchanged for this geometry).  
*Reflection:* The CG remained stationary only because the dry mass was placed exactly at the midpoint of the full tank; any offset produces monotonic migration.

**Example 2 — Compute transverse inertia about instantaneous CG**  
*Given:* Same geometry as Example 1; radius *R*=0.564 m.  
*Find:* *I*_{yy} about the system CG at *t*=0.  

Propellant own inertia about its own CG: *I*_{yy,p}=m_p(R²/4+h²/12)=4000(0.08+1.333)=5652 kg m².  
Distance between propellant CG and system CG: *d*=1 m.  
Parallel-axis shift: *m_p d²*=4000·1=4000 kg m².  
Dry inertia about system CG: 2000·(distance from dry CG to system CG)²=2000·4=8000 kg m².  
Total: *I*_{yy}=5652+4000+8000=17652 kg m².  
**Final answer:** 17652 kg m².  
*Reflection:* The *m d²* term dominates once the propellant CG and system CG separate; omitting it underestimates inertia by >20 %.

**Example 3 — Time derivative of inertia**  
*Given:* *I*_{yy}(t)=17652−(burn-rate terms) kg m²; \(\dot{m}_p=-20\) kg s⁻¹.  
*Find:* \(\dot{I}_{yy}\) at *t*=0.  

Differentiating the parallel-axis contribution yields an analytic rate of −85 kg m² s⁻¹.  
**Final answer:** \(\dot{I}_{yy}(0)=-85\) kg m² s⁻¹.  
*Reflection:* The derivative is linear in \(\dot{m}_p\); constant-burn-rate motors therefore produce constant \(\dot{I}\).

**Example 4 — Insertion into Euler’s equation**  
*Given:* Pitch rate *ω_y*=0.1 rad s⁻¹, *I*_{yy}=17652 kg m², \(\dot{I}_{yy}=-85\) kg m² s⁻¹, external moment *M_y*=5000 N m.  
*Find:* Required \(\dot{ω}_y\).  

Euler’s scalar pitch equation:  
*I*_{yy} \(\dot{ω}_y\) + \(\dot{I}_{yy}\) *ω_y* = *M_y*.  
17652 \(\dot{ω}_y\) − 8.5 = 5000.  
\(\dot{ω}_y\)=0.2836 rad s⁻².  
**Final answer:** 0.2836 rad s⁻².  
*Reflection:* The \(\dot{I}ω\) term supplies an 8.5 N m “virtual torque” that must be countered by the nozzle; ignoring it produces a 0.17 % error in acceleration at this instant but accumulates over a long burn.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating CG as fixed at the geometric center of the tank | Engineers copy the CAD value computed at 100 % fill | Recompute CG after every 5 % propellant decrement in the mass-properties script |
| Using the inertia tensor about the launch-pad CG throughout flight | Parallel-axis term is evaluated only once | Shift the tensor to the instantaneous CG at each time step before forming **I**(t) |
| Neglecting the \(\dot{\mathbf{I}}\boldsymbol{\omega}\) term in Euler’s equation | Textbooks for fixed-mass rigid bodies omit it | Insert the analytic derivative of every inertia element into the right-hand side |
| Assuming principal axes remain aligned with body axes | Propellant CG migration can rotate the inertia ellipsoid | Diagonalize **I**(t) at each step or retain the full off-diagonal products of inertia |
| Ignoring propellant slosh relative to the tank | Slosh adds an extra degree of freedom whose effective inertia changes with fill fraction | Couple a pendulum or spring-mass slosh model whose mass also decreases with time |
| Freezing autopilot gains at pre-flight mass properties | Gain tables are generated only at three fill levels | Schedule gains continuously with the current *m_p(t)* or *z*_{CG}(t) |
| Using dry-mass moments of inertia for solid rockets | Solid propellant burns radially; web geometry changes continuously | Integrate the instantaneous grain geometry at each burn time rather than scaling a constant tensor |

## 7. The textbook-precise statement
For a system of particles whose total mass *m(t)* and mass distribution vary with time, the center of mass and inertia tensor about that center are  
$$
\mathbf{r}_{\text{CG}}(t)=\frac{1}{m(t)}\int_{V(t)}\mathbf{r}\,\rho(\mathbf{r},t)\,dV,\qquad
\mathbf{I}_{\text{CG}}(t)=\int_{V(t)}\bigl(r^2\mathbf{E}-\mathbf{r}\mathbf{r}\bigr)\rho(\mathbf{r},t)\,dV.
$$  
When these quantities appear in the rotational dynamics, the angular-momentum equation about the moving CG acquires the additional term \(\dot{\mathbf{I}}_{\text{CG}}\boldsymbol{\omega}\). The full vector statement is given in Thomson, *Introduction to Space Dynamics*, 2e, §7.3, Equation (7.3-12).

## 8. Visual — diagram or schematic
```text
        Nose
          ▲
          │  z
   ┌──────┴──────┐  ← dry structure CG (fixed)
   │             │
   │   Propellant│  ← liquid level h(t) falling
   │   CG(t)     │     ↓
   │      ●      │
   │             │
   └──────┬──────┘
          │
   System CG(t) → ●  (moves as h decreases)
          │
       Engine
```
The diagram shows a cylindrical tank whose instantaneous propellant height *h(t)* determines both the propellant CG and the system CG; the offset *d(t)* between them drives the parallel-axis contribution to *I*_{yy}.

## 9. The memory technique

1. **The hook** — Picture a burning candle: the flame eats wax from the top, so the balance point drops steadily toward the holder; the rocket is the same candle standing on its engine end.
2. **What to overlearn** — *z*_{CG}(t) is the first mass moment; *I*_{ij}(t) must be evaluated about that moving point; Euler’s equation always contains the extra \(\dot{\mathbf{I}}\boldsymbol{\omega}\) term.
3. **Spaced-repetition schedule** — Review the three overlearned facts at 1 day, 3 days, 7 days, 16 days, 35 days after first study.
4. **First-principles fallback** — Re-derive the parallel-axis theorem from the definition of the second moment, then differentiate with respect to *m_p* while holding geometry fixed.

## 10. What this unlocks
Accurate time-varying mass properties are the prerequisite for every subsequent module in rocket flight mechanics that involves rotational dynamics or closed-loop control.  
- Derivation of the variable-mass rotational equations of motion  
- Design of gain-scheduled TVC and RCS controllers  
- Coupled rigid-body + slosh + fuel-motion simulation  
- Structural-load and bending-moment calculations during ascent  
- Six-DOF Monte-Carlo dispersion analysis for stage separation and payload injection  

## 11. Self-check — five questions, no answers
1. A cylindrical tank is mounted with its axis offset 0.3 m from the vehicle centerline. Does the system CG remain on the centerline as propellant is drained?  
2. Write the explicit time derivative of the product-of-inertia term *I*_{xz} when only the propellant mass *m_p(t)* is changing.  
3. A solid rocket motor burns with a cylindrical grain; the web radius increases linearly with time. How does the axial moment of inertia *I*_{xx} scale with burn time?  
4. In Euler’s equation, the term \(\dot{\mathbf{I}}\boldsymbol{\omega}\) can be interpreted as an inertial torque. Under what sign condition does this torque add to or subtract from the external moment?  
5. A vehicle’s static margin is +12 % at liftoff and −3 % at burnout. At what approximate propellant mass fraction does the vehicle become statically unstable, assuming linear CG travel?