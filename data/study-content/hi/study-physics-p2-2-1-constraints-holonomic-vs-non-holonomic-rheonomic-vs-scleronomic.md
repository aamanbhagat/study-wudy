## 1. The one-sentence answer
**Constraints classify the allowed motions of a mechanical system by whether their equations can be integrated to position level and whether they depend explicitly on time.**

A constraint limits the coordinates or velocities of particles or rigid bodies. When the constraint equation can be written purely in terms of the generalized coordinates \(q_i\) and possibly time \(t\) without involving velocities, and when it is integrable, the system is said to be holonomic. If the equation involves velocities in a way that cannot be integrated back to a position-only form, it is non-holonomic. Separately, if the constraint equation contains time explicitly it is called rheonomic; if time appears only through the coordinates themselves it is scleronomic.

These two independent classifications (integrability and time dependence) produce four combinations that appear repeatedly in rocket trajectories, robotic arms, and orbital mechanics.

> [!NOTE]
> The deepest insight is that holonomic constraints reduce the number of independent coordinates, while non-holonomic constraints do not; they only restrict the allowed velocities at each instant.

## 2. Why this matters — concrete and current
SpaceX Starship uses non-holonomic constraints during belly-flop re-entry because the vehicle’s angular velocity must remain perpendicular to its long axis; this velocity constraint cannot be integrated into a fixed attitude angle and must be handled with differential-drive style control laws.

ISRO’s Reusable Launch Vehicle (RLV-LEX) landing experiments treat the runway alignment as a rheonomic non-holonomic constraint: the desired heading changes with time as the vehicle descends, so the constraint equation explicitly contains \(t\).

In semiconductor lithography stages, the wafer stage is subject to scleronomic holonomic constraints from the air-bearing pads that fix the vertical coordinate; these reduce the configuration space dimension permanently.

ESA’s JUICE mission models the spacecraft’s reaction-wheel momentum unloading as a rheonomic scleronomic problem because the wheel-speed limits are time-dependent during flybys yet the underlying angular-momentum sphere remains integrable.

Natural phenomena such as a skate on ice provide the classic non-holonomic scleronomic example used in every textbook derivation of the Euler–Lagrange equations with multipliers.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Generalized coordinates \(q_i\) | Constraints are expressed in the same variables used to write \(T\) and \(V\). |
| Virtual displacement \(\delta q_i\) | Distinguishes holonomic from non-holonomic when forming d’Alembert’s principle. |
| Total differential of a function | Tells whether a velocity constraint is the exact differential of a position constraint. |
| Time-dependent transformation | Distinguishes rheonomic from scleronomic when the constraint function \(f(q,t)\) is written. |

If any row is unfamiliar, pause and review Goldstein, Classical Mechanics, 3e, §§1.3–1.4 before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Position versus velocity restriction
A constraint that can be written as an algebraic relation among the coordinates alone removes degrees of freedom at the configuration-space level. A skate that must move only along its blade gives the velocity relation \(\dot x\sin\theta-\dot y\cos\theta=0\); this cannot be integrated to a position-only equation, so the configuration space remains two-dimensional while the velocity space is restricted.

Formal statement: a constraint is holonomic when there exists a function \(f(q_1,\dots,q_n,t)=0\) whose total time derivative reproduces the given velocity constraint.

> [!WARNING]
> Treating every velocity constraint as non-holonomic without checking integrability will produce unnecessary multipliers and hide conserved quantities.

### Step 2 — Exact differential test for holonomy
Write the velocity constraint in Pfaffian form \(\sum a_i(q,t)\,dq_i + a_t\,dt=0\). It is integrable (hence holonomic) if and only if the one-form is proportional to an exact differential, i.e., the exterior derivative vanishes after multiplication by an integrating factor.

Example: \(\dot x - y\dot z=0\) is non-holonomic because \(dx-y\,dz\) has non-zero curl.

### Step 3 — Explicit time dependence
Even a holonomic constraint may contain \(t\) explicitly. A bead on a wire whose shape is changing with time gives \(f(x,y,z,t)=0\); the constraint is holonomic yet rheonomic.

### Step 4 — Four-way classification table
The two binary properties generate:

- Holonomic + scleronomic: \(f(q)=0\)
- Holonomic + rheonomic: \(f(q,t)=0\)
- Non-holonomic + scleronomic: \(\sum a_i(q)\,dq_i=0\) (non-integrable)
- Non-holonomic + rheonomic: \(\sum a_i(q,t)\,dq_i + a_t dt=0\)

### Step 5 — Consequence for Lagrange multipliers
Holonomic constraints (rheonomic or scleronomic) can be used to eliminate variables before writing \(L\). Non-holonomic constraints must be retained via multipliers \(\lambda_k\) because they cannot reduce the coordinate count.

### Step 6 — Textbook-grade statement
A mechanical system is holonomic if every constraint is expressible as \(f_k(q,t)=0\), \(k=1,\dots,m\). It is scleronomic if none of the \(f_k\) contain \(t\) explicitly. Otherwise the adjectives non-holonomic or rheonomic apply.

## 5. Worked examples — har step show karo

**Example 1 — Particle on a fixed sphere**
*Given:* A particle is constrained to \(x^2+y^2+z^2=R^2\).
*Find:* Classification.
Differentiate: \(2x\dot x+2y\dot y+2z\dot z=0\). The one-form \(x\,dx+y\,dy+z\,dz\) is exactly \(d(\frac12 r^2)\), hence integrable. No explicit \(t\) appears.  
**Holonomic scleronomic.**  
*Why:* The differential was recognized as exact, confirming holonomy; time independence gives scleronomic.

**Example 2 — Skate on ice**
*Given:* Velocity constraint \(\dot x\sin\theta-\dot y\cos\theta=0\).
*Find:* Classification.
Suppose an integrating factor \(\mu(x,y,\theta)\) exists such that \(\mu(\sin\theta\,dx-\cos\theta\,dy)\) is exact. Its exterior derivative yields a non-zero 2-form, so no such \(\mu\) exists. No explicit \(t\).  
**Non-holonomic scleronomic.**  
*Why:* Failure of the exactness test forces retention of the multiplier.

**Example 3 — Bead on a rotating hoop**
*Given:* Hoop rotates with \(\omega(t)\); constraint \(x^2+y^2=(R\sin\theta(t))^2\), \(z=R\cos\theta(t)\).
*Find:* Classification.
The equation \(f(x,y,z,t)=x^2+y^2-(R\sin\omega t)^2=0\) is given directly in position variables and contains \(t\).  
**Holonomic rheonomic.**  
*Why:* Position-level equation already supplied, time appears explicitly.

**Example 4 — Rolling disk with time-varying inclination**
*Given:* Vertical coin rolls without slip while its plane tilts as \(\alpha(t)=\omega t\).
*Find:* Classification.
No-slip gives two velocity relations involving \(\dot x,\dot y,\dot\phi,\dot\theta\) and \(\alpha(t)\). The one-forms are non-integrable (similar to Example 2) and coefficients depend on \(t\).  
**Non-holonomic rheonomic.**  
*Why:* Both tests fail: non-integrable and explicit time dependence.

*Reflection:* Each example isolates one binary test, showing how the four categories arise systematically.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming every velocity constraint is non-holonomic | Students forget the exact-differential test | Always compute the exterior derivative before deciding |
| Treating rheonomic as automatically non-holonomic | Confusion between time dependence and integrability | Check the two classifications independently |
| Eliminating coordinates when a rheonomic constraint is present | Time-dependent constraints cannot be used for permanent reduction | Keep the coordinate and use a time-dependent multiplier |
| Forgetting that scleronomic constraints still allow time-dependent solutions | “Scleronomic” only means the equation itself lacks \(t\) | Remember the classification refers to the constraint equation, not the motion |
| Using \(\delta W=0\) without virtual displacements for non-holonomic cases | Virtual displacements must satisfy the velocity constraint at fixed \(t\) | Write \(\sum a_i\delta q_i=0\) explicitly |
| Missing an integrating factor in borderline cases | Rare but appears in control theory | Search for \(\mu(q)\) systematically via Frobenius theorem |

## 7. The textbook-precise statement
A constraint on a mechanical system with generalized coordinates \(q^1,\dots,q^n\) is holonomic if it can be expressed in the form \(f_k(q,t)=0\) for \(k=1,\dots,m\) with \(m<n\), where each \(f_k\) is at least \(C^2\). The same constraint is scleronomic when \(\partial f_k/\partial t\equiv0\) for all \(k\) and rheonomic otherwise. A constraint that cannot be written in the above position form but appears as a linear velocity relation \(\sum a_{ki}(q,t)\dot q^i+a_{kt}(q,t)=0\) that is not the total time derivative of any \(f_k\) is non-holonomic. (Goldstein, Classical Mechanics, 3e, §2.4, equations 2.19–2.22.)

## 8. Visual — diagram or schematic
```
q1
 ^
 |   f(q,t)=0   (surface in configuration space)
 |  /
 | /   <-- allowed manifold (holonomic)
 |/
 +---------> q2
```
For non-holonomic the surface does not exist; only a distribution of allowed tangent vectors is defined at each point.

## 9. The memory technique
1. **The hook** — Picture a train on fixed tracks (holonomic scleronomic) versus a car that can only steer forward (non-holonomic scleronomic) versus a folding bridge that opens with time (rheonomic).
2. **What to overlearn** — The Pfaffian test: if \(\sum a_i dq_i\) is not exact, the constraint is non-holonomic; presence of naked \(t\) makes it rheonomic.
3. **Spaced-repetition schedule** — Review the four-category table after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from the total differential of any candidate \(f(q,t)\); if the given velocity relation matches \(df=0\), it is holonomic; otherwise non-holonomic.

## 10. What this unlocks
Mastery here lets you write the correct equations of motion with Lagrange multipliers or quasi-coordinates for rockets, robots, and satellites.

- Next: Routhian reduction for cyclic holonomic systems
- Next: Chaplygin’s equations for non-holonomic mechanics
- Next: vakonomic versus non-holonomic variational principles
- Next: Control of underactuated vehicles with non-holonomic constraints

## 11. Self-check — five questions, no answers
1. Classify the constraint \(\dot x - v(t)\cos\theta=0\) for a car whose speed is prescribed by a ground controller.
2. A particle is forced to stay on the moving plane \(z=vt\). Is the constraint holonomic? Rheonomic?
3. Show that \(x\,dy-y\,dx=0\) is non-holonomic by computing its exterior derivative.
4. Why can a holonomic rheonomic constraint still be substituted into the Lagrangian before deriving Euler–Lagrange equations, while a non-holonomic rheonomic constraint cannot?
5. A rigid body rolls without slipping inside a fixed sphere. List all four adjectives that apply to its constraints and justify each.