## 1. The one-sentence answer
**In a frame rotating at angular velocity \(\vec{\omega}\) relative to an inertial frame, Newton's second law must be modified by two fictitious forces: the centrifugal force \(-m\vec{\omega}\times(\vec{\omega}\times\vec{r})\) acting outward from the axis and the Coriolis force \(-2m\vec{\omega}\times\vec{v}\) acting perpendicular to the velocity observed in the rotating frame.**

These terms arise because the time derivative of any vector differs between frames. An observer fixed in the rotating frame measures velocities and accelerations that omit the frame's own rotation, so the missing pieces appear as extra forces when the observer applies \(F=ma\).

The centrifugal term depends only on position and pushes objects away from the rotation axis; it explains why a mass on a string feels an outward pull when you spin it. The Coriolis term depends on velocity and deflects moving objects sideways; it is the reason a ball rolled across a spinning turntable curves instead of traveling straight.

> [!NOTE]
> The two forces are not real interactions between bodies; they are bookkeeping corrections that let you keep using \(F=ma\) while pretending the rotating frame is inertial.

## 2. Why this matters — concrete and current
SpaceX and NASA trajectory planners include Coriolis corrections when modeling the motion of propellant sloshing inside a spinning upper stage; a 0.1 rad s^{-1} roll rate on a Falcon 9 second stage produces a sideways force large enough to shift payload release coordinates by tens of meters if ignored.

Global weather models at the European Centre for Medium-Range Weather Forecasts solve the Navier–Stokes equations in the rotating Earth frame; the Coriolis parameter \(f=2\Omega\sin\phi\) sets the scale of geostrophic balance that produces mid-latitude jet streams and the direction of cyclone rotation.

Semiconductor manufacturers such as ASML use air-bearing stages that rotate at several hertz during wafer inspection; centrifugal loading on sub-micron alignment sensors must be subtracted in real time or overlay errors exceed the 1 nm tolerance.

The Gravity Probe B mission measured the geodetic and frame-dragging precessions of superconducting gyroscopes in Earth orbit; the data-reduction pipeline explicitly subtracted the centrifugal and Coriolis contributions arising from the satellite’s 0.8 rpm roll rate before the relativistic signals could be extracted.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector cross product     | Both fictitious forces are expressed with \(\vec{\omega}\times\vec{v}\) and \(\vec{\omega}\times(\vec{\omega}\times\vec{r})\) |
| Inertial vs. non-inertial frames | The derivation begins by transforming the second time derivative between two frames whose relative angular velocity is nonzero |
| Chain rule for time derivatives of vectors | The key identity \(\bigl(\frac{d\vec{A}}{dt}\bigr)_{\rm in}=\bigl(\frac{d\vec{A}}{dt}\bigr)_{\rm rot}+\vec{\omega}\times\vec{A}\) must be applied twice |
| Newton's second law in inertial frames | All fictitious forces are defined so that \(m\vec{a}_{\rm rot}=\vec{F}_{\rm real}+\vec{F}_{\rm fict}\) recovers the inertial-frame equation |

## 4. Building the idea — from intuition to formalism

### Step 1 — Position is the same in both frames
A point has one location vector \(\vec{r}\); only its time derivatives differ.  
Example: a bead at rest on a rotating turntable has the same \(\vec{r}\) whether you watch from the lab or from the turntable.  
Formal statement: \(\vec{r}_{\rm in}=\vec{r}_{\rm rot}\).  
> [!WARNING] Treating \(\vec{r}\) itself as frame-dependent leads to inconsistent velocity transformations later.

### Step 2 — First time derivative introduces one cross product
Differentiate \(\vec{r}\) while accounting for the rotating basis vectors.  
Example: velocity of a fixed point on the turntable is \(\vec{\omega}\times\vec{r}\).  
Formal statement:
\[
\Bigl(\frac{d\vec{r}}{dt}\Bigr)_{\rm in}=\Bigl(\frac{d\vec{r}}{dt}\Bigr)_{\rm rot}+\vec{\omega}\times\vec{r}.
\]
> [!WARNING] Omitting the cross-product term makes every velocity measured on the turntable appear wrong by \(\vec{\omega}\times\vec{r}\).

### Step 3 — Differentiate again to obtain acceleration
Apply the same operator to the velocity vector.  
Example: a particle moving radially outward on the turntable acquires an extra sideways acceleration \(2\vec{\omega}\times\vec{v}_{\rm rot}\).  
Formal statement:
\[
\vec{a}_{\rm in}=\vec{a}_{\rm rot}+\dot{\vec{\omega}}\times\vec{r}+\vec{\omega}\times(\vec{\omega}\times\vec{r})+2\vec{\omega}\times\vec{v}_{\rm rot}.
\]
> [!WARNING] Forgetting the factor of 2 in the Coriolis term produces an incorrect deflection magnitude.

### Step 4 — Move fictitious terms to the force side
Write \(m\vec{a}_{\rm in}=\vec{F}_{\rm real}\) and rearrange.  
Formal statement:
\[
m\vec{a}_{\rm rot}=\vec{F}_{\rm real}-m\dot{\vec{\omega}}\times\vec{r}-m\vec{\omega}\times(\vec{\omega}\times\vec{r})-2m\vec{\omega}\times\vec{v}_{\rm rot}.
\]
The last three terms are the Euler, centrifugal, and Coriolis forces.

### Step 5 — Specialize to constant \(\vec{\omega}\)
When the rotation rate is steady, \(\dot{\vec{\omega}}=0\), leaving only centrifugal and Coriolis.  
Textbook statement (constant \(\vec{\omega}\)):
\[
m\vec{a}_{\rm rot}=\vec{F}_{\rm real}-m\vec{\omega}\times(\vec{\omega}\times\vec{r})-2m\vec{\omega}\times\vec{v}_{\rm rot}.
\]

## 5. Worked examples — every step shown

**Example 1 — Stationary puck on a turntable**  
*Given:* Turntable rotates at constant \(\vec{\omega}=\omega\hat{z}\); puck at rest in rotating frame so \(\vec{v}_{\rm rot}=0\), \(\vec{a}_{\rm rot}=0\).  
*Find:* Force needed to keep it at rest.  
Step 1: Insert into the rotating-frame equation.  
*Why:* All velocity-dependent terms vanish.  
Step 2: Obtain \(0=\vec{F}_{\rm real}-m\vec{\omega}\times(\vec{\omega}\times\vec{r})\).  
*Why:* Centrifugal term must be canceled.  
Step 3: \(\vec{F}_{\rm real}=m\omega^2\vec{r}_\perp\) (radially inward).  
**\(\vec{F}_{\rm real}=m\omega^2 r\,\hat{r}\)** (inward)  
*Reflection:* The “force” you feel pulling outward is exactly the centrifugal term; the real tension supplies the centripetal force seen from the inertial frame.

**Example 2 — Radial motion on frictionless turntable**  
*Given:* Puck given initial radial velocity \(v_0\) at \(r=R\).  
*Find:* Initial Coriolis acceleration.  
Step 1: \(\vec{v}_{\rm rot}=v_0\hat{r}\).  
*Why:* Only radial component exists at \(t=0\).  
Step 2: \(-2m\vec{\omega}\times\vec{v}_{\rm rot}=-2m\omega v_0\hat{\theta}\).  
*Why:* Cross product of \(\hat{z}\) and \(\hat{r}\) yields \(\hat{\theta}\).  
**Initial sideways acceleration magnitude \(2\omega v_0\)**  
*Reflection:* The deflection is perpendicular to velocity and grows with both spin rate and speed.

**Example 3 — Foucault pendulum (small angle)**  
*Given:* Pendulum bob velocity \(\vec{v}\) in horizontal plane, latitude \(\phi\).  
*Find:* Horizontal Coriolis acceleration.  
Step 1: Vertical component of \(\vec{\omega}\) is \(\Omega\sin\phi\).  
*Why:* Only the local vertical component produces horizontal deflection.  
Step 2: Magnitude of acceleration \(2\Omega\sin\phi\,v\).  
**Horizontal deflection rate \(2\Omega\sin\phi\)** (to the right in Northern Hemisphere)  
*Reflection:* Explains why the plane of swing rotates once per day at the pole.

**Example 4 — Free fall from height \(h\) at equator**  
*Given:* Drop from rest at height \(h\), Earth radius \(R\), \(\omega\).  
*Find:* Eastward deflection at impact.  
Step 1: Fall time from \(s=\frac12gt^2\) gives \(t=\sqrt{2h/g}\).  
*Why:* Vertical motion is unaffected by horizontal fictitious forces to first order.  
Step 2: Coriolis acceleration eastward \(2\omega v_y\) where \(v_y=gt\).  
Step 3: Integrate twice: deflection \(\delta x=\frac13\omega\sqrt{8h^3/g}\).  
**\(\delta x=\frac{2}{3}\omega h\sqrt{2h/g}\)**  
*Reflection:* The cubic dependence on height shows why tall drops amplify the effect.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Sign error on centrifugal force | Students remember “outward” but write \(+m\omega^2r\) | Always start from the inertial acceleration and move terms; the sign is fixed by \(\vec{\omega}\times(\vec{\omega}\times\vec{r})\) pointing inward |
| Using lab-frame velocity in Coriolis term | Confusing \(\vec{v}_{\rm in}\) with \(\vec{v}_{\rm rot}\) | Compute \(\vec{v}_{\rm rot}\) first; only the velocity measured by the rotating observer enters the \(-2m\vec{\omega}\times\vec{v}_{\rm rot}\) term |
| Treating \(\vec{\omega}\) as a free vector | Forgetting it is tied to the frame’s instantaneous axis | Keep \(\vec{\omega}\) expressed in the rotating basis when evaluating cross products |
| Ignoring Euler force when spin rate changes | Assuming \(\dot{\vec{\omega}}=0\) by default | Check whether angular speed is constant before dropping the \(\dot{\vec{\omega}}\times\vec{r}\) term |
| Applying fictitious forces in inertial calculations | Misidentifying the observer’s frame | Ask “in which frame is \(a\) measured?” before adding any fictitious term |
| Forgetting that Coriolis does no work | Noticing the force is perpendicular to velocity | Verify \(\vec{F}_{\rm Cor}\cdot\vec{v}_{\rm rot}=0\) algebraically each time |
| Using scalar \(\omega\) in 3-D problems | Losing directional information | Always keep vector form until the geometry is reduced to a single plane |

## 7. The textbook-precise statement
Let \(\mathcal{R}\) be a frame rotating at constant angular velocity \(\vec{\omega}\) relative to an inertial frame \(\mathcal{I}\). For a particle of mass \(m\) whose position is \(\vec{r}\) and whose velocity and acceleration measured in \(\mathcal{R}\) are \(\vec{v}_{\mathcal{R}}\) and \(\vec{a}_{\mathcal{R}}\), the equation of motion in \(\mathcal{R}\) is
\[
m\vec{a}_{\mathcal{R}}=\vec{F}-m\vec{\omega}\times(\vec{\omega}\times\vec{r})-2m\vec{\omega}\times\vec{v}_{\mathcal{R}},
\]
where \(\vec{F}\) is the net real force (Goldstein, *Classical Mechanics*, 3e, §4.9, Eq. 4.22 with \(\dot{\vec{\omega}}=0\)).

## 8. Visual — diagram or schematic
```text
          z (ω)
           ↑
           │
           │
   y'      │     x'
    └───┬──┼──┬───
        │  │  │
        │  O──┼──────► r
        │     │
   rotating frame origin O
   (ω along fixed z; x',y' rotate with frame)
```
The diagram shows the rotation axis \(\hat{z}\) fixed in inertial space while the primed axes rotate with angular velocity \(\vec{\omega}\). A position vector \(\vec{r}\) lies in the rotating \(x'y'\) plane; velocity \(\vec{v}_{\rm rot}\) is measured along those axes.

## 9. The memory technique

**The hook**  
Picture yourself standing on a spinning merry-go-round: a ball you throw straight appears to curve because the ground is turning underneath it (Coriolis) while every loose object slides outward as if repelled by the center (centrifugal).

**What to overlearn**  
1. \(\vec{a}_{\rm in}=\vec{a}_{\rm rot}+\vec{\omega}\times(\vec{\omega}\times\vec{r})+2\vec{\omega}\times\vec{v}_{\rm rot}\)  
2. Centrifugal points outward, magnitude \(\omega^2r_\perp\); Coriolis deflects to the right of \(\vec{v}_{\rm rot}\) in the Northern Hemisphere convention.

**Spaced-repetition schedule**  
Review the vector identity at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive by applying the rotating-frame derivative operator twice to \(\vec{r}\).

## 10. What this unlocks
Mastery of rotating-frame forces lets you analyze rigid-body attitude dynamics, geophysical fluid motion, and the stability of rotating space habitats without repeatedly transforming back to inertial coordinates.

- Next: Euler’s equations for rigid-body rotation  
- Next: Rossby number and geostrophic balance in oceanography  
- Next: Effective potential in the restricted three-body problem (Lagrange points)  
- Next: Sagnac effect and ring-laser gyros in precision metrology

## 11. Self-check — five questions, no answers
1. A puck slides at constant speed \(v\) across a turntable of radius \(R\) spinning at \(\omega\). At the instant it crosses the center, what is the magnitude of its Coriolis acceleration?

2. Derive the centrifugal potential \(\Phi_{\rm cent}=-\frac12|\vec{\omega}\times\vec{r}|^2\) and show that surfaces of constant effective gravity are not exactly spherical.

3. A particle is dropped from rest at height \(h\) above the equator. Show that its eastward deflection is independent of the direction of Earth’s rotation to first order in \(\omega\).

4. In a frame rotating at \(\vec{\omega}(t)\), an object sits at rest at \(\vec{r}\). What additional fictitious force appears, and under what condition does it vanish?

5. Two observers disagree on whether a given force is real or fictitious. Design a one-sentence operational test, using only local measurements, that settles the question.