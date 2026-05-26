## 1. The one-sentence answer
**Equilibrium of a rigid body requires both net force and net torque to be zero so that neither the centre of mass accelerates nor the body rotates about any axis.**

A rigid body stays at rest or moves with constant velocity only when every external force and every external torque cancel out. Translational equilibrium means the vector sum of all forces is zero; rotational equilibrium means the sum of all torques about any chosen point is also zero. These two vector conditions together give six scalar equations in three dimensions, enough to solve for unknown reactions or internal forces.

When you push a door at its handle, the hinge supplies a reaction force and the torque balance decides whether the door swings. If either balance is missing, the body either translates, rotates, or both.

> [!NOTE]
> The single deepest insight is that torque must be calculated about the same point for which you already know the linear acceleration of the centre of mass; choosing the centre of mass itself often removes unknown reaction forces from the torque equation.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 first-stage landing legs must satisfy simultaneous force and torque balance while the stage is vertical on the drone ship; any residual torque from uneven leg deployment would topple the rocket.  

ISRO’s Chandrayaan-3 lander used active torque-nulling thrusters during the final 10 m descent so that the four legs touched the lunar regolith with zero net moment about the centre of mass.  

The James Webb Space Telescope’s sunshield deployment relied on sequential torque balance about each hinge line; a single unbalanced torque would have crumpled the membrane.  

In semiconductor lithography, ASML’s EUV scanners maintain sub-nanometre overlay by keeping the reticle and wafer stages in six-degree-of-freedom equilibrium; any residual torque excites vibrational modes that destroy pattern fidelity.  

Natural phenomena such as the stable spin of asteroid Bennu (OSIRIS-REx mission) are explained by the same torque-free equilibrium conditions once solar radiation pressure torques are included.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Newton’s second law      | Gives \(\sum \mathbf{F}=m\mathbf{a}_\text{cm}\) for translational equilibrium        |
| Torque and moment arm    | Converts force into rotational tendency; \(\boldsymbol{\tau}=\mathbf{r}\times\mathbf{F}\) |
| Centre of mass           | Simplifies torque summation; unknown reactions often produce zero torque about CM    |
| Vector cross product     | Required to compute torque direction and magnitude in 3-D                            |
| Rigid-body kinematics    | Guarantees that angular acceleration \(\alpha\) is the same for every point          |

If any of these five ideas are shaky, pause and revise them first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Force balance alone is not enough
A single force through the centre of mass produces pure translation. Two equal and opposite forces not along the same line produce pure rotation even though net force is zero.  
Example: two hands pushing a floating rod in opposite directions at its ends.  
Formal statement: \(\sum\mathbf{F}=0\) is necessary but insufficient for full equilibrium.  
> [!WARNING]  
> Students often forget that a zero net force still permits constant angular velocity; the body is not “at rest”.

### Step 2 — Torque must vanish about every point
Because torque changes with the reference point, the safest check is to verify \(\sum\boldsymbol{\tau}=0\) about at least two distinct points; if both are zero and net force is zero, equilibrium holds everywhere.  
Example: a ladder leaning on a wall—torque about floor contact and about wall contact both zero.  
Formal: \(\sum\boldsymbol{\tau}_A=0\) and \(\sum\boldsymbol{\tau}_B=0\) with \(A\neq B\).

### Step 3 — Choose the centre of mass strategically
About the centre of mass, reaction forces at supports often contribute zero torque, decoupling the rotational equation from unknown reactions.  
Example: a beam on two supports—write torque equation about the geometric centre to eliminate both support reactions.  
Formal: \(\sum\boldsymbol{\tau}_\text{cm}=I_\text{cm}\boldsymbol{\alpha}\).

### Step 4 — Write the six scalar equations
In 3-D: three force components and three torque components must each sum to zero.  
\[
\sum F_x=0,\quad\sum F_y=0,\quad\sum F_z=0,\quad\sum\tau_x=0,\quad\sum\tau_y=0,\quad\sum\tau_z=0.
\]

### Step 5 — Count unknowns and degrees of freedom
Each support or cable adds reaction force components and possibly moments; the six equations must equal or exceed the number of unknowns for a determinate problem.

### Step 6 — Verify consistency with rigid-body constraint
Once forces and torques balance, the acceleration of every point is identical (pure translation) or the angular velocity is constant (pure rotation or rest).

### Step 7 — Textbook-grade statement
A rigid body is in equilibrium if and only if the resultant force and the resultant couple about any point are both zero (Goldstein, *Classical Mechanics*, 3e, §4.2).

## 5. Worked examples — har step show karo

**Example 1 — Uniform rod on two supports**  
*Given:* 2 m steel rod, mass 4 kg, supports at 0.3 m and 1.7 m from left end.  
*Find:* reactions \(R_1\) and \(R_2\).  
Step 1: \(\sum F_y=R_1+R_2-4\times9.81=0\).  
*Why:* vertical force balance.  
Step 2: torque about centre of mass (1 m mark): \(R_1\times0.7-R_2\times0.7=0\).  
*Why:* eliminates weight torque.  
**Final answer** \(R_1=R_2=19.62\,\text{N}\).  
*Reflection:* symmetry made torques cancel; same method works for asymmetric loading.

**Example 2 — Ladder against smooth wall**  
*Given:* 5 m ladder, 20 kg, floor friction \(\mu=0.4\), wall frictionless.  
*Find:* minimum angle for equilibrium.  
Force balance: \(N_w=f\), \(N_f=mg\).  
Torque about floor contact: \(N_w\times5\sin\theta-mg\times(2.5\cos\theta)=0\).  
*Why:* removes friction and normal at floor.  
**Final answer** \(\theta=\tan^{-1}(2\mu)=38.7^\circ\).  
*Reflection:* choosing the floor point removed two unknowns at once.

**Example 3 — Rocket nozzle gimbal torque**  
*Given:* 100 kN thrust, gimbal offset 0.8 m from vehicle axis.  
*Find:* compensating torque needed from attitude thrusters.  
\(\sum\tau=100000\times0.8=80000\,\text{N·m}\).  
**Final answer** 80 kN·m counter-torque required.  
*Reflection:* real-time torque balance keeps the rocket upright during throttling.

**Example 4 — Three-dimensional satellite panel**  
*Given:* 50 kg solar panel extended 3 m, two hold-down bolts 1.5 m apart.  
*Find:* bolt forces when gravity gradient torque is 12 N·m.  
Equations: \(\sum F=0\), \(\sum\tau_x=0\), \(\sum\tau_y=0\).  
Solving yields 4 N tension difference between bolts.  
**Final answer** Bolts experience 4 N differential load.  
*Reflection:* 3-D torque balance is mandatory for deployable structures.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Taking torque about an accelerating point | Forgets that \(\tau=I\alpha\) only holds about CM or inertial point | Always choose CM or a fixed point            |
| Ignoring couple produced by offset forces | Thinks “forces cancel so torque is zero”    | Draw the line of action and check moment arm |
| Using \(\sum F=0\) only           | Forgets rotational condition                | Write both force and torque equations every time |
| Sign error in 3-D torque components | Cross-product direction confusion           | Use right-hand rule consistently             |
| Treating distributed weight as single force at wrong location | Places weight at geometric centre instead of CM | Locate CM first from integration or tables   |
| Assuming all supports are pin joints | Over-constrains the system                  | Count unknowns versus six equations          |
| Forgetting that constant \(\omega\) still satisfies equilibrium | Confuses static and dynamic equilibrium     | Remember \(\alpha=0\) is sufficient          |

## 7. The textbook-precise statement
A rigid body is said to be in equilibrium when the total force and the total torque vanish:  
\[
\sum_i\mathbf{F}_i=\mathbf{0},\qquad\sum_i\mathbf{r}_i\times\mathbf{F}_i=\mathbf{0}
\]  
for any origin. Equivalently, both the linear acceleration of the centre of mass and the angular acceleration about the centre of mass are zero. (Goldstein, *Classical Mechanics*, 3e, §4.2; also Marion & Thornton, *Classical Dynamics*, 5e, §7.3.)

## 8. Visual — diagram or schematic
```
          F2 ↑
          |
Wall -----O------ beam ------O----- Floor
          |               |
          |               mg ↓ (at CM)
          N_wall        N_floor
```
Labelled axes: x horizontal, y vertical. Torque calculated about CM marked by ×. All forces shown with lines of action.

## 9. The memory technique
1. **The hook** — Picture a floating wrench: if the net push is zero but the pushes are offset, the wrench spins; both push and twist must disappear.  
2. **What to overlearn** — \(\sum\mathbf{F}=0\) and \(\sum\boldsymbol{\tau}_\text{cm}=0\) are the two vector equations that never change.  
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start from \(\mathbf{F}=m\mathbf{a}_\text{cm}\) and \(\boldsymbol{\tau}=I\boldsymbol{\alpha}\); set both accelerations to zero.

## 10. What this unlocks
You can now analyse statics of rockets on launch pads, satellite attitude control, robotic arms, and bridge trusses.  

- Next: moment of inertia tensors and Euler’s equations  
- Stability analysis via potential energy  
- Multi-body dynamics with constraints  

## 11. Self-check — five questions, no answers
1. A uniform metre stick rests on two fingers. Where must the fingers be placed so that both reactions are equal?  
2. A cube of side 0.2 m weighs 50 N. A horizontal force is applied at the top edge. What is the minimum force that tips the cube before it slides (\(\mu=0.3\))?  
3. In the ladder problem, if the wall also has friction \(\mu_w=0.2\), does the minimum angle increase or decrease?  
4. A rigid body has five unknown reaction components but only six equilibrium equations. Is the system statically determinate?  
5. Why does choosing the centre of mass as the torque origin often simplify satellite thruster calculations?