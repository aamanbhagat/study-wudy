## 1. The one-sentence answer
**Equilibrium of a rigid body occurs when the net external force is zero and the net external torque about any chosen point is zero, so the body experiences neither translation nor rotation.**

A rigid body maintains fixed distances between all its particles. Any external influence can therefore produce two independent effects: a change in the motion of its center of mass and a change in its orientation about that center. The first effect is governed by the vector sum of forces; the second is governed by the vector sum of torques. Setting both sums identically to zero removes both possibilities of motion.

This pair of conditions is stricter than the single force-balance rule that suffices for a particle. Because a rigid body has spatial extent, a force couple can produce rotation even while the net force remains zero. Conversely, an unbalanced force applied away from the center of mass produces both translation and rotation. Both must be eliminated simultaneously.

> [!NOTE]
> The torque condition must hold about every point; verifying it about one convenient point is sufficient only because the force condition has already been satisfied.

## 2. Why this matters — concrete and current
SpaceX uses static-fire tests on Falcon 9 boosters to confirm that the thrust vector of each Merlin engine passes through the vehicle’s center of mass within millimeters; any residual torque would require continuous gimbal corrections that reduce payload margin.  

The James Webb Space Telescope maintains attitude with reaction wheels and thrusters whose combined force and torque budgets are kept at zero to within micronewton and micronewton-meter levels; otherwise image drift would exceed the 0.1-arcsecond stability requirement stated in NASA’s JWST pointing budget.  

Semiconductor step-and-scan lithography stages from ASML are massive granite tables whose six-degree-of-freedom equilibrium must be maintained while the stage accelerates at several g; force and torque cancellation is achieved by voice-coil actuators whose real-time commands are derived from the same two vector equations.  

Large deployable solar arrays on geostationary satellites experience thermal snap torques at eclipse exit; on-orbit telemetry from Boeing 702 platforms shows that equilibrium analysis performed before launch correctly predicts the peak angular acceleration that the attitude-control system must counteract.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector addition          | Net force and net torque are vector sums.                 |
| Torque \(\boldsymbol{\tau}=\mathbf{r}\times\mathbf{F}\) | Converts force into rotational effect.                    |
| Center of mass           | Simplifies torque calculations for gravity and inertia.   |
| Newton’s second law for translation and rotation | Supplies the dynamical statements that become zero in equilibrium. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Separate translation from rotation
A rigid body can slide without turning or turn without sliding. These motions are independent when described relative to the center of mass.  
Example: push the center of a floating rod; it translates. Push one end; it both translates and rotates.  
Formal statement: the motion of the center of mass obeys  
\[
M\mathbf{a}_\text{cm}=\sum\mathbf{F}_\text{ext}.
\]

> [!WARNING]
> Treating every force as if it acts at the center of mass erases all torque information.

### Step 2 — Introduce torque as the rotational counterpart of force
Torque measures the effectiveness of a force in changing angular velocity. Its magnitude is \(rF\sin\theta\) and its direction follows the right-hand rule.  
Example: a 10 N force applied 0.5 m from a pivot at 90° produces 5 N·m.  
Formal statement:  
\[
\boldsymbol{\tau}=\mathbf{r}\times\mathbf{F}.
\]

> [!WARNING]
> Using the wrong sign convention for clockwise versus counterclockwise will invert the torque balance.

### Step 3 — Write the two independent equilibrium conditions
Because both linear and angular accelerations must vanish,  
\[
\sum\mathbf{F}_\text{ext}=\mathbf{0},\qquad\sum\boldsymbol{\tau}_\text{ext}=\mathbf{0}.
\]
The torque sum may be taken about any single point once the force sum is zero.

### Step 4 — Choose a convenient reference point for torques
Any point works mathematically; the center of mass or a support point often eliminates unknown reaction forces from the torque equation.  
Example: for a ladder leaning on a wall, torques about the floor contact remove the unknown floor friction from the torque sum.

### Step 5 — Count unknowns and equations
A planar rigid body has three degrees of freedom, hence three independent scalar equations (two force, one torque). Three-dimensional cases supply six equations.  
If the number of unknowns exceeds the number of equations, the body is statically indeterminate.

### Step 6 — Verify consistency across points
After solving, recompute the torque sum about a second point. Any nonzero result indicates an algebraic error.

## 5. Worked examples — every step shown

**Example 1 — Uniform beam supported at both ends**  
*Given:* A 4 m beam of mass 20 kg lies horizontal; supports at each end.  
*Find:* Reactions \(N_A\) and \(N_B\).  

Weight acts at center: \(W=196\) N downward.  
Force balance (vertical):  
\[
N_A+N_B-196=0 \qquad\text{(Why: net force must be zero).}
\]  
Torque about A:  
\[
N_B\cdot4-196\cdot2=0 \qquad\text{(Why: eliminates \(N_A\)).}
\]  
Solve: \(N_B=98\) N, then \(N_A=98\) N.  
**Final answer**  
\(N_A=N_B=98\) N.  

*Reflection:* Symmetry made the reactions equal; choosing the end support simplified algebra.

**Example 2 — Ladder against frictionless wall**  
*Given:* 5 m ladder, mass 15 kg, leans at 60°; wall frictionless, floor rough.  
*Find:* Minimum coefficient of friction.  

Force equations:  
\[
f=N_w,\qquad N_f=mg.
\]  
Torque about floor contact:  
\[
N_w\cdot(5\sin60^\circ)-mg\cdot(2.5\cos60^\circ)=0.
\]  
Substitute: \(\mu=1/(2\sqrt{3})\approx0.289\).  
**Final answer**  
\(\mu_\text{min}=0.289\).  

*Reflection:* The frictionless wall supplied only a horizontal force, reducing unknowns.

**Example 3 — Spacecraft with two thrusters**  
*Given:* 800 kg satellite; thrusters 1.2 m left and right of center line produce 120 N and 95 N.  
*Find:* Net force and torque about center of mass.  

Net force:  
\[
F_\text{net}=120+95=215\text{ N (forward)}.
\]  
Net torque:  
\[
\tau=(120-95)\times1.2=30\text{ N·m (clockwise)}.
\]  
**Final answer**  
\(F=215\) N, \(\tau=30\) N·m.  

*Reflection:* Unequal parallel forces produce both translation and rotation.

**Example 4 — Suspended sign with hinge and cable**  
*Given:* 30 kg sign 1.5 m wide hinged at left, cable at right making 40° with horizontal.  
*Find:* Hinge force components and cable tension.  

Torque about hinge:  
\[
T\sin40^\circ\cdot1.5-mg\cdot0.75=0 \implies T=173\text{ N}.
\]  
Force balance yields hinge components \(H_x=-132\) N, \(H_y=61\) N.  
**Final answer**  
\(T=173\) N, \(\mathbf{H}=(-132,61)\) N.  

*Reflection:* Hinge reactions appear in force equations only after torque has removed them.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Applying torque sum about a point while net force is nonzero | Student forgets that torque condition is point-independent only after force balance | Always verify \(\sum\mathbf{F}=0\) first |
| Treating friction as acting at center of mass | Visual habit from particle mechanics | Draw extended free-body diagram with forces at actual contact points |
| Using \(\sin\theta\) with the wrong angle | Confusing angle between \(\mathbf{r}\) and \(\mathbf{F}\) | Sketch the two vectors and mark the included angle explicitly |
| Forgetting that gravity acts at the center of mass | Intuition that “weight is everywhere” | Replace distributed weight by single force \(Mg\) at CM |
| Solving in 2-D with only two equations | Missing the rotational degree of freedom | Count equations: two force components plus one torque |
| Assuming all supports supply only normal forces | Overlooking possible friction or moments at hinges | Label every unknown reaction with both components until proven otherwise |
| Sign errors in torque direction | Inconsistent clockwise/counterclockwise convention | Adopt one convention and annotate every torque arrow |

## 7. The textbook-precise statement
For a rigid body in three dimensions, the necessary and sufficient conditions for static equilibrium are  
\[
\sum_{i=1}^N\mathbf{F}_i=\mathbf{0},\qquad\sum_{i=1}^N(\mathbf{r}_i-\mathbf{r}_0)\times\mathbf{F}_i=\mathbf{0},
\]  
where \(\mathbf{r}_0\) is any fixed reference point. These six scalar equations determine at most six unknown reaction components. (See Goldstein, *Classical Mechanics*, 3e, §4.2, “Conditions for Equilibrium.”)

## 8. Visual — diagram or schematic
```text
          F3 ↑
          │
   ┌──────┼──────┐  rigid body
   │      │      │
F1 ←──────┼──────→ F2
   │      │      │
   └──────┼──────┘
          ↓ F4
          r from CM
```
Label axes: x horizontal, y vertical. CM marked at geometric center. Each force vector shown with tail at point of application; lever arm drawn dashed from CM to line of action.

## 9. The memory technique
1. **The hook** — Picture a perfectly balanced mobile: every string vertical (net force zero) and every crossbar level (net torque zero).  
2. **What to overlearn** — \(\sum\mathbf{F}=\mathbf{0}\) and \(\sum\boldsymbol{\tau}=\mathbf{0}\) about any point; three equations in 2-D, six in 3-D.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start from Newton’s second law for translation and rotation; set both accelerations to zero.

## 10. What this unlocks
Mastery here supplies the statics foundation required for rigid-body dynamics, Lagrangian mechanics with constraints, and spacecraft attitude control. Subsequent topics include: instantaneous center of rotation, parallel-axis theorem for moments of inertia, Euler’s equations for rigid-body rotation, and stability analysis of spinning satellites.

## 11. Self-check — five questions, no answers
1. A uniform door 0.9 m wide weighs 120 N. What minimum horizontal force applied at the outer edge keeps it from rotating when a 30 N wind pushes perpendicularly at the center?  
2. A 2 m seesaw supports a 400 N child at 0.6 m left of the fulcrum. Where must a 250 N child sit to produce equilibrium?  
3. Two thrusters on a 1200 kg probe fire parallel but 0.8 m apart; one produces 180 N, the other 210 N. Compute net force and torque about the center of mass.  
4. A ladder problem is solved using torques about the floor contact; the wall is frictionless. After finding all forces, recompute torques about the wall contact. Must the result be zero?  
5. A rigid body has four unknown reaction forces but only three independent equilibrium equations. Is the system solvable? If not, what physical information is missing?