## 1. The one-sentence answer
**Streamlines, pathlines, and streaklines are three geometrically distinct families of curves that visualize fluid motion, each obtained by fixing a different combination of time and particle identity in the velocity field.**

A fluid particle traces one continuous trajectory through space as time advances; that trajectory is its pathline. At any frozen instant the velocity vector field admits curves that are everywhere tangent to the local velocity; those curves are streamlines. Particles that have all passed through one fixed location at different moments form a streakline when connected at a later instant. In unsteady flow the three curves generally differ; only when the flow is steady do they coincide everywhere.

The distinction arises because the velocity field \(\mathbf{v}(\mathbf{x},t)\) can change with time while particles continue to move according to their own histories. Visualizing the flow therefore requires choosing whether to hold time fixed, to follow one particle, or to collect particles that share a common origin point.

> [!NOTE]
> The single most important insight is that a streamline is an instantaneous snapshot of the direction field and therefore cannot be observed by tracking any individual particle over a finite interval; only pathlines and streaklines can be photographed with real tracers.

## 2. Why this matters — concrete and current
In computational fluid dynamics for reusable launch vehicles, NASA’s FUN3D solver extracts instantaneous streamlines from the surface pressure and shear fields of the Space Launch System at transonic buffet conditions; these streamlines reveal shock-induced separation bubbles whose motion must be suppressed to keep aerodynamic loads within structural margins.

Particle-image velocimetry experiments at the von Kármán Institute trace streaklines of helium-filled soap bubbles released from a rake upstream of a transonic airfoil; the resulting images are compared directly with large-eddy simulations to validate the prediction of dynamic stall on helicopter rotor blades.

In semiconductor chemical-vapor deposition reactors, streakline visualization of the precursor gas flow inside a rotating-disk reactor identifies recirculation zones that cause non-uniform film thickness; Applied Materials uses these diagnostics to redesign showerhead injectors and raise wafer yield by several percentage points.

Meteorologists release constant-level balloons whose successive positions define pathlines of the jet stream; the accumulated paths are assimilated into global forecast models to improve prediction of Rossby-wave breaking that triggers extreme weather.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Velocity vector field \(\mathbf{v}(\mathbf{x},t)\) | Supplies the direction used to construct every curve |
| Ordinary differential equation \(\frac{d\mathbf{x}}{dt}=\mathbf{v}(\mathbf{x},t)\) | Governs both pathline integration and streamline tangent condition |
| Distinction between partial and total derivatives | Explains why streamlines ignore \(\partial\mathbf{v}/\partial t\) while pathlines do not |
| Steady versus unsteady flow | Determines whether the three families coincide |

## 4. Building the idea — from intuition to formalism

### Step 1 — A single particle’s history
A fluid particle occupies successive positions as time marches forward. Its motion is recorded by integrating the velocity it experiences at each location and instant.  
Example: a particle released at \((0,0)\) in the field \(u=1\), \(v=0.1t\) travels farther in \(y\) the longer it remains in the flow.  
The mathematical statement is the initial-value problem
\[
\frac{d\mathbf{x}_p}{dt}=\mathbf{v}(\mathbf{x}_p,t),\qquad\mathbf{x}_p(t_0)=\mathbf{x}_0.
\]
> [!WARNING]
> Treating the integration limits as fixed in space rather than following the particle produces a streamline instead of a pathline.

### Step 2 — Instantaneous direction field
At one fixed clock time \(t^*\) the velocity vectors \(\mathbf{v}(\mathbf{x},t^*)\) point in specific directions everywhere. A curve whose tangent matches these directions at every point cannot be crossed by the flow at that instant.  
The defining equation is
\[
\frac{d\mathbf{x}_s}{ds}\parallel\mathbf{v}(\mathbf{x}_s,t^*).
\]
> [!WARNING]
> Allowing \(t\) to vary while tracing the curve mixes temporal evolution into an object that must remain strictly instantaneous.

### Step 3 — Collecting particles through a common point
Fix a spatial point \(\mathbf{x}_e\) and release (or mark) particles at successive times \(\tau\). At a later observation time \(t\) the locus of all particles that once occupied \(\mathbf{x}_e\) is the streakline.  
Parametrically,
\[
\mathbf{x}_{st}(t;\tau)\quad\text{where}\quad\mathbf{x}_{st}(\tau;\tau)=\mathbf{x}_e.
\]
> [!WARNING]
> Confusing the release time \(\tau\) with the observation time \(t\) collapses the streakline onto a pathline.

### Step 4 — Steady flow collapses the three families
When \(\partial\mathbf{v}/\partial t=0\), the velocity at any point never changes. Consequently the tangent condition for streamlines becomes identical to the differential equation for pathlines, and every particle passing through \(\mathbf{x}_e\) follows the same curve. All three visualizations therefore coincide.

### Step 5 — Differential versus integral statements
Streamlines satisfy the Pfaffian equation obtained by eliminating the parameter \(s\):
\[
v\,dx-u\,dy=0
\]
in two dimensions. Pathlines and streaklines require integration of the full time-dependent ODE and cannot be reduced to a time-independent first-order PDE.

### Step 6 — Textbook statement of the result
In an arbitrary unsteady flow the three curves are distinct; they become identical if and only if the velocity field is steady. This is the precise content of the definitions given in Kundu, Cohen & Dowling, *Fluid Mechanics*, 6e, §3.2.

## 5. Worked examples — every step shown

**Example 1 — Uniform steady flow**  
*Given:* \(\mathbf{v}=(U,0)\), \(U\) constant.  
*Find:* the three curves through \((0,0)\) at \(t=0\).  
The streamline equation is \(dy/dx=0\), hence \(y=0\).  
The pathline ODE \(\dot x=U\), \(\dot y=0\) integrates to \(x=Ut\), \(y=0\).  
Streakline particles released at \(\tau\leq t\) satisfy the same line.  
**All three curves are the x-axis.**  
*Reflection:* The flow never changes direction, so time of release is irrelevant.

**Example 2 — Steady shear flow**  
*Given:* \(u=y\), \(v=0\).  
*Find:* streamline and pathline from \((0,1)\).  
Streamline: \(dy/dx=v/u=0\), so \(y=1\).  
Pathline: \(\dot x=y=1\), \(\dot y=0\) yields \(x=t\), \(y=1\).  
**Both curves are the horizontal line \(y=1\).**

**Example 3 — Unsteady uniform flow**  
*Given:* \(u=1+t\), \(v=0\).  
*Find:* pathline and streamline starting at \((0,0)\) observed at \(t=1\).  
Streamline at \(t=1\): \(dy/dx=0\), hence \(y=0\).  
Pathline: \(\dot x=1+t\), \(\dot y=0\) integrates to \(x=t+t^2/2\), \(y=0\). At \(t=1\), \(x=1.5\).  
**Streamline is the x-axis segment; pathline is the same line but the particle has traveled farther.**

**Example 4 — Streakline in unsteady flow**  
*Given:* \(u=1\), \(v=t\). Release point \((0,0)\). Observe at \(t=2\).  
Particles released at time \(\tau\) satisfy \(\dot x=1\), \(\dot y=t\) with initial condition at \(\tau\).  
Position at observation time \(t=2\): \(x=2-\tau\), \(y=2^2/2-\tau^2/2=(4-\tau^2)/2\).  
Eliminating \(\tau=2-x\) yields the parabola \(y=2x-x^2/2\).  
**Streakline is the parabola \(y=2x-x^2/2\) for \(0\leq x\leq2\).**  
*Reflection:* Different release times produce different vertical displacements even though the horizontal speed is constant.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Drawing a pathline when asked for a streamline | Students integrate the ODE in time instead of holding \(t\) fixed | Freeze the velocity field snapshot before drawing any tangent curve |
| Assuming streaklines are always pathlines | In lab photos particles look as if they follow one trajectory | Remember that each visible dot left the injection point at a different instant |
| Using \(\partial\mathbf{v}/\partial t=0\) locally instead of globally | Local steadiness does not guarantee the entire field is steady | Check the Eulerian time derivative everywhere in the domain |
| Treating the parameter \(s\) along a streamline as physical time | The parameter is only arc-length scaling | Keep \(s\) dimensionless or label it explicitly as a dummy variable |
| Forgetting that pathlines can cross themselves in unsteady flow | The same particle can return to a point after the field has changed | Integrate the ODE over the full time interval of interest |
| Confusing material derivative with streamline operator | The material derivative follows particles; the streamline operator does not | Write the operator \(\mathbf{v}\cdot\nabla\) only when time is frozen |
| Plotting instantaneous vectors on a pathline image | The photograph records history, not the current field | Overlay vectors only on a simultaneously captured streamline plot |

## 7. The textbook-precise statement
A **pathline** is the curve \(\mathbf{x}_p(t)\) satisfying
\[
\frac{d\mathbf{x}_p}{dt}=\mathbf{v}(\mathbf{x}_p,t),\qquad\mathbf{x}_p(t_0)=\mathbf{x}_0.
\]
A **streamline** at instant \(t^*\) is any curve \(\mathbf{x}_s(s)\) whose tangent satisfies
\[
\frac{d\mathbf{x}_s}{ds}=\mathbf{v}(\mathbf{x}_s,t^*).
\]
A **streakline** through fixed point \(\mathbf{x}_e\) observed at time \(t\) is the locus
\[
\{\mathbf{x}_{st}(t;\tau)\mid\tau\leq t\}
\]
where each particle satisfies the pathline equation with initial condition \(\mathbf{x}_{st}(\tau;\tau)=\mathbf{x}_e\).  
These three families coincide throughout the domain if and only if \(\partial\mathbf{v}/\partial t\equiv0\). (Kundu, Cohen & Dowling, *Fluid Mechanics*, 6e, §3.2.)

## 8. Visual — diagram or schematic
```text
t = t1 (unsteady)          t = t2 > t1
       v ↑                     v ↑
   →   →   →               →   →   →
   →   →   →               →   →   →
   →   →   →               →   →   →

Streamline (t1): horizontal dashes
Pathline of particle A: curved arc from release to current position
Streakline: chain of dots released earlier, now forming a wavy line
```
Axes: x horizontal, y vertical. Velocity arrows are drawn at fixed t1; the pathline starts at the injection point and ends at the particle’s later location; the streakline connects all prior particles still visible at t2.

## 9. The memory technique

1. **The hook** — Picture three photographers at a busy intersection: one freezes every car at a single shutter click (streamline), one follows a single taxi for its entire trip (pathline), and one photographs every taxi that ever passed the same lamppost (streakline).

2. **What to overlearn** — The three ODE/PDE statements in Step 6; the single sentence “steady flow ⇒ all three coincide.”

3. **Spaced-repetition schedule** — Review the definitions after 1 day, again after 3 days, 7 days, 16 days, and 35 days.

4. **First-principles fallback** — Start from the velocity field, integrate the particle ODE for pathlines, set \(\partial/\partial t=0\) and compare with the tangent condition for streamlines, then vary release time for streaklines.

## 10. What this unlocks
Mastery of these three curves supplies the language needed to interpret flow-visualization experiments and to post-process CFD velocity fields. It is the immediate prerequisite for understanding vorticity transport, the derivation of the stream function in two-dimensional flow, and the proper interpretation of Lagrangian versus Eulerian statistics in turbulence.

- Vorticity and circulation (Kelvin’s theorem)
- Stream function and velocity potential
- Lagrangian coherent structures
- Dye visualization in water tunnels

## 11. Self-check — five questions, no answers
1. In a flow whose velocity is \(\mathbf{v}=(y,1+t)\), compute the streamline passing through the origin at \(t=0\) and the pathline of a particle released there at the same instant; state whether they coincide at any later time.

2. A streakline photograph taken at \(t=5\) shows a curve that is not tangent to the instantaneous velocity arrows at several points. Explain the apparent paradox in one sentence.

3. Under what precise mathematical condition on \(\mathbf{v}\) does the streakline through \(\mathbf{x}_e\) become identical to the streamline through the same point at every observation time?

4. A numerical integrator produces a curve that satisfies both \(d\mathbf{x}/ds=\mathbf{v}(\mathbf{x},t^*)\) and the pathline ODE integrated from \(t_0\) to \(t^*\). What property must the velocity field possess?

5. Design a simple unsteady two-dimensional analytic flow in which the pathline and streakline through a given point differ by a 90° rotation at the observation time; give the velocity components explicitly.