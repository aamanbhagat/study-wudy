## 1. The one-sentence answer
**The Clohessy-Wiltshire equations are the linearized, time-invariant differential equations that govern the relative motion of one spacecraft with respect to another in a nearby circular orbit.**

They arise when the distance between the two vehicles remains small compared with the orbital radius and the reference orbit is treated as perfectly circular. The linearization removes the nonlinear gravitational terms and the Coriolis and centrifugal accelerations that appear in the rotating Hill frame, leaving a set of three constant-coefficient ordinary differential equations whose solutions are combinations of secular drifts and bounded oscillations at the orbital frequency.

A sharp 14-year-old can picture two satellites a few hundred metres apart circling Earth. Gravity pulls both toward the same center, yet the slightly different distances produce tiny differences in orbital speed. Those differences make the chaser appear to drift, oscillate, or spiral relative to the target. The Clohessy-Wiltshire model turns that relative dance into simple harmonic motion plus a constant along-track drift that can be cancelled by a single impulsive burn.

> [!NOTE]
> The single most important insight is that a purely radial separation produces a 2:1 along-track oscillation; a pure along-track separation produces a secular drift that grows without bound unless corrected.

## 2. Why this matters — concrete and current
SpaceX uses a Clohessy-Wiltshire-based guidance loop during final approach of Dragon 2 to the International Space Station; the same linear model supplies the reference trajectory that the GNC team uploads before every docking.

NASA’s Restore-L mission and Northrop Grumman’s MEV-1 both rely on CW propagators to plan safe approach corridors inside the 2 km keep-out sphere around a client satellite; the equations give the closed-form coast arcs between thruster firings.

The European Space Agency’s PROBA-3 formation-flying mission maintains a 150 m along-track separation with centimetre-level control; its onboard controller is tuned directly to the eigenvalues of the CW state matrix.

Orbital rendezvous algorithms in the open-source GMAT and Orekit toolkits implement the CW solution as the default linear propagator for proximity operations; every new commercial rendezvous planner begins validation against these equations before adding higher-fidelity perturbations.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Two-body problem & Keplerian orbits | Supplies the circular reference orbit and mean motion \(n\) |
| Rotating reference frames | Introduces fictitious accelerations (Coriolis, centrifugal) that must be cancelled by the linearization |
| Linear systems of ODEs   | The CW equations are a 6×6 linear system whose fundamental matrix yields the state transition matrix used for targeting |
| Impulse burns & \(\Delta v\) | Rendezvous trajectories are assembled from coast arcs connected by instantaneous velocity changes |

## 4. Building the idea — from intuition to formalism

### Step 1 — Choose the rotating Hill frame
Place the origin at the target spacecraft. Align the x-axis radially outward, the y-axis along the orbital velocity vector, and the z-axis normal to the orbital plane. In this frame the chaser’s position appears nearly stationary when the two vehicles fly in formation.

A chaser 100 m ahead in the along-track direction drifts slowly backward relative to the target because its slightly higher altitude produces a longer orbital period.

The position vector of the chaser is \(\mathbf{r} = (x,y,z)\) measured from the target; the target itself follows a circular orbit of radius \(R\) with angular rate \(n = \sqrt{\mu/R^3}\).

> [!WARNING]
> If the frame origin is allowed to accelerate (non-circular target), the fictitious accelerations become time-varying and the elegant constant-coefficient form disappears.

### Step 2 — Write the exact nonlinear relative acceleration
Newton’s second law in the inertial frame for both vehicles, subtract, then transform all vectors into the rotating Hill frame. The exact relative equation contains the inverse-cube gravity term and the full Coriolis and centrifugal contributions.

For a chaser at \((R+x, y, z)\) the gravitational acceleration difference is \(\mu[(R+x)\hat{r} - R^{-2}\hat{R}]\) where \(\hat{r}\) is the unit vector from Earth to the chaser.

### Step 3 — Linearize the gravitational field
Assume \(x,y,z \ll R\). Taylor-expand the inverse-cube gravity term to first order in \(x/R\). All quadratic and higher terms are discarded. The radial component yields an extra \(+3n^2 x\) term; the along-track and cross-track components remain \(-n^2 y\) and \(-n^2 z\).

The linearized gravity acceleration vector in Hill components is therefore \((3n^2 x, 0, -n^2 z)\).

> [!WARNING]
> Retaining the quadratic term \(3n^2 x^2/R\) immediately destroys time-invariance and prevents closed-form integration.

### Step 4 — Add the fictitious accelerations of the rotating frame
In the Hill frame rotating at constant rate \(n\), every particle experiences \(-2\boldsymbol{\omega}\times\mathbf{v}\) (Coriolis) and \(-\boldsymbol{\omega}\times(\boldsymbol{\omega}\times\mathbf{r})\) (centrifugal). With \(\boldsymbol{\omega}=n\hat{z}\), these become \((-2n\dot{y}, 2n\dot{x}, 0)\) and \((n^2 x, n^2 y, 0)\).

### Step 5 — Assemble the six scalar equations and drop higher-order terms
Collecting all terms and discarding products of small quantities produces the three coupled linear ODEs known as the Clohessy-Wiltshire equations.

### Step 6 — Write the final matrix form
The state vector \(\mathbf{X}=[x,y,z,\dot{x},\dot{y},\dot{z}]^T\) obeys the constant-coefficient system \(\dot{\mathbf{X}}=A\mathbf{X}\) where the 6×6 plant matrix \(A\) contains only the orbital frequency \(n\).

## 5. Worked examples — every step shown

**Example 1 — Station-keeping at a fixed offset**
*Given:* Target in circular LEO, \(n=0.001\) rad s\(^{-1}\). Chaser at rest at \((x,y,z)=(0,100,0)\) m relative to target.
*Find:* Required continuous thrust to remain fixed.
- The CW equations reduce to algebraic balance: radial force must cancel \(3n^2 x\) (zero here) and along-track force must cancel the Coriolis term arising from any velocity (zero here).  
  *Why* — All time derivatives are identically zero, so the acceleration terms vanish and only the position-dependent fictitious forces remain.  
- Therefore \(\Delta v\) budget is zero; the point is an equilibrium.  
**Final answer**  
No thrust required; \((0,100,0)\) is a natural equilibrium of the CW dynamics.  
*Reflection* — Equilibrium points exist only on the along-track axis; any radial offset immediately requires thrust or produces oscillation.

**Example 2 — Radial pulse produces 2:1 ellipse**
*Given:* Chaser at origin, given an impulsive \(\Delta v_x=0.1\) m s\(^{-1}\), \(n=0.001\) rad s\(^{-1}\).
*Find:* Trajectory for the next 1000 s.
- Integrate the decoupled z-equation (remains zero). Solve the x-y system analytically:  
  \[
  x(t)=\frac{2\dot{y}_0}{n}-\frac{2\dot{y}_0}{n}\cos(nt)+\frac{\dot{x}_0}{n}\sin(nt)
  \]
  (initial \(\dot{y}_0=0\)).  
  *Why* — The homogeneous solution of the coupled oscillator yields bounded sinusoids at frequency \(n\).  
- The resulting path is an ellipse of semi-minor axis 100 m (radial) and semi-major axis 200 m (along-track).  
**Final answer**  
Ellipse centered 100 m behind the target, period \(2\pi/n\).  
*Reflection* — A single radial burn always produces a closed ellipse whose along-track amplitude is exactly twice the radial amplitude.

**Example 3 — Along-track drift cancellation**
*Given:* Chaser 500 m ahead, zero relative velocity.  
*Find:* Single impulsive burn that returns the chaser to the origin after one orbital period.
- The secular term in y is \(y(t)=-3nx_0 t + \dots\). Apply \(\Delta v_y=3n x_0\) at t=0.  
  *Why* — The coefficient −3n exactly cancels the linear drift term generated by the initial radial separation.  
**Final answer**  
\(\Delta v_y = 0.0015\) m s\(^{-1}\) (prograde) produces a closed 1-orbit return.  
*Reflection* — Drift cancellation is the most common single-burn rendezvous targeting law.

**Example 4 — Full state-transition matrix propagation**
*Given:* Initial state \(\mathbf{X}_0=[100,0,0,0,0,0]^T\) m, m s\(^{-1}\), propagate ¼ orbit.
*Find:* State at \(t=\pi/(2n)\).
- Form the 6×6 CW state-transition matrix \(\Phi(t)\) whose blocks contain \(\sin(nt)\), \(\cos(nt)\), and the secular 3nt term. Multiply \(\Phi(t)\mathbf{X}_0\).  
  *Why* — Because the system is linear time-invariant, the solution is exactly the matrix exponential, which admits the closed-form \(\Phi\) shown in textbooks.  
**Final answer**  
\(\mathbf{X}(t)=[0,-300,0,0.1,0,0]^T\) (rounded).  
*Reflection* — The secular term produces a 300 m along-track displacement even though initial along-track velocity was zero.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating the target orbit as inertial | Students forget the rotating-frame fictitious forces | Always derive from the Hill-frame acceleration before linearizing |
| Using CW for eccentric targets | The linearization assumes constant n and zero eccentricity | Switch to Tschauner-Hempel or full nonlinear propagation when e>0.05 |
| Ignoring the 2:1 amplitude ratio | The radial and along-track modes are coupled | Verify every closed trajectory satisfies y-amplitude = 2×x-amplitude |
| Applying CW at kilometre-scale separations | Higher-order gravity terms become comparable to linear terms | Check x/R < 0.01 before trusting the solution |
| Forgetting cross-track decoupling | z-equation is independent yet still oscillates at n | Solve z separately; it never couples into x-y targeting |
| Using continuous thrust without re-deriving A | The plant matrix A changes when acceleration is added | Augment the state or re-linearize about the forced trajectory |
| Neglecting the secular drift when planning V-bar approaches | A pure along-track offset produces unbounded linear growth | Always null the −3n x0 term with an explicit along-track burn |

## 7. The textbook-precise statement
Let the target occupy a circular orbit of radius \(R\) with mean motion \(n=\sqrt{\mu/R^3}\). Let the chaser state be expressed in the Hill frame whose origin coincides with the target. Under the assumptions  
1. \(|\mathbf{r}|\ll R\),  
2. target eccentricity identically zero,  
3. no differential perturbations,  
the relative motion satisfies the linear system
\[
\dot{\mathbf{X}}=A\mathbf{X},\qquad
A=\begin{bmatrix}
0&0&0&1&0&0\\
0&0&0&0&1&0\\
0&0&0&0&0&1\\
3n^2&0&0&0&2n&0\\
0&0&0&-2n&0&0\\
0&0&-n^2&0&0&0
\end{bmatrix}.
\]
The unique solution is \(\mathbf{X}(t)=\Phi(t)\mathbf{X}(0)\) where \(\Phi(t)=e^{At}\) admits the well-known closed-form expression containing only trigonometric functions of \(nt\) and the secular term \(3nt\) (Curtis, *Orbital Mechanics for Engineering Students*, 2014, §7.5).

## 8. Visual — diagram or schematic
```text
          z (out of plane)
           ^
           |
   x (radial) -->   y (along-track)
           |
  Target at origin
  Chaser initial position: (x0, y0, 0)
  Resulting CW ellipse: 2:1 ratio, center shifted -2x0 in y
```
The diagram shows the Hill frame axes, a 2:1 ellipse traced by the chaser when given a pure radial velocity, and the secular drift arrow that appears when the initial radial offset is left uncorrected.

## 9. The memory technique
1. **The hook** — Picture a figure-eight racetrack whose long axis is always twice the short axis; any radial “nudge” simply sends the chaser around that fixed racetrack.
2. **What to overlearn** — The three scalar CW equations, the 2:1 amplitude rule, and the fact that along-track drift is exactly −3n times any radial offset.
3. **Spaced-repetition schedule** — Review the equations and the 2:1 rule at 1 day, 3 days, 7 days, 16 days, 35 days after first study.
4. **First-principles fallback** — Re-derive from the Hill-frame acceleration by linearizing gravity and adding Coriolis/centrifugal terms; the algebra is only six lines once the rotating-frame kinematics are recalled.

## 10. What this unlocks
Mastery of the Clohessy-Wiltshire equations supplies the reference trajectories used by every subsequent rendezvous guidance law.  

- Lambert’s problem targeting is seeded with CW coast arcs for initial guess generation.  
- Model-predictive control formulations for proximity operations linearize about the CW plant matrix A.  
- Collision-avoidance keep-out zones are expressed as ellipsoids whose semi-axes are taken directly from the CW modal amplitudes.  
- Formation-keeping controllers for fractionated spacecraft treat the CW state-transition matrix as the discrete-time plant.

## 11. Self-check — five questions, no answers
1. A chaser receives a 0.2 m s^{-1} radial impulse at the origin. What is the maximum radial excursion it will reach before returning?
2. Show algebraically that any initial condition lying on the line y = −2x with zero velocity produces a stationary point in the CW frame.
3. A target orbit has n = 0.001 rad s^{-1}. The chaser is 300 m ahead with zero relative velocity. Compute the single impulsive \(\Delta v\) that produces a return to the origin after exactly one orbital period.
4. Explain why the cross-track motion decouples from the in-plane motion yet still oscillates at the same frequency n.
5. Identify the single term in the CW state-transition matrix responsible for unbounded along-track growth and state the physical condition that sets its coefficient to zero.