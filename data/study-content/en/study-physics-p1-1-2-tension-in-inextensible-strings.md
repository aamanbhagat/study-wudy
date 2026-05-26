## 1. The one-sentence answer
**Tension in an inextensible string is the internal force that transmits equal and opposite pulls along its length while enforcing identical acceleration magnitudes at every connected point because the string length cannot change.**

A string that cannot stretch acts like a rigid constraint. When you pull one end, every segment instantly transmits that pull to the other end; the force magnitude is the same throughout provided the string itself has negligible mass. The inextensibility adds a kinematic rule: if one mass moves toward the string by a distance \(dx\) in time \(dt\), the connected mass must move away by exactly the same \(dx\) to keep the total length fixed.

This combination of equal tension and matched accelerations lets us write a single unknown tension \(T\) and relate the accelerations of all attached objects, closing the system of Newton’s second-law equations.

> [!NOTE]
> The decisive insight is that inextensibility is a *constraint on motion*, not merely on force; once you accept that accelerations are locked together in magnitude, the tension becomes the single adjustable “glue” that makes Newton’s laws consistent for the whole assembly.

## 2. Why this matters — concrete and current
SpaceX uses Kevlar and Dyneema tethers to secure Falcon 9 first-stage boosters during recovery; the tension must remain below the material limit while the booster decelerates at up to 6 g, exactly the situation solved by treating the tether as an inextensible string linking booster and parachute.

In semiconductor manufacturing, robotic wafer handlers employ vacuum-compatible cable drives; any stretch would misalign nanometer-scale features, so engineers model the cables as inextensible and solve the resulting tension-constrained accelerations to keep positioning errors below 10 nm.

ESA’s Solar Orbiter mission employs a hinged boom whose deployment cables are modeled as massless inextensible strings; the tension analysis guarantees that the two solar-array wings reach their final angle with synchronized angular accelerations, preventing destructive torque on the spacecraft bus.

Crane operations at Cape Canaveral lift integrated upper stages weighing 20 t; the hoist cables are treated as inextensible so that the load and hook share a common vertical acceleration, allowing the control software to predict peak tension during emergency stops.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Newton’s second law      | \(\sum \mathbf{F}=m\mathbf{a}\) supplies the dynamical equations once tension is introduced as an unknown force. |
| Free-body diagrams       | Isolate each mass so that tension appears with correct direction and sign. |
| Kinematic constraint     | Inextensibility forces \(a_1=a_2\) (magnitudes) along the string; without this the system is under-determined. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Strings transmit force without storing energy in stretch
A real string stretches slightly under load, but an ideal inextensible string does not. The force it carries is therefore purely a contact force between adjacent segments.

Consider two people pulling a rope in a tug-of-war; each feels the same pull even though the rope does not lengthen.  
The mathematical statement is that tension \(T\) is uniform and acts tangentially at every cross-section:  
$$T=\text{constant along the string}.$$

> [!WARNING]
> Treating tension as varying along a massless string immediately violates Newton’s third law between adjacent segments.

### Step 2 — Action-reaction pairs at every interior point
Because the string has zero mass, the net force on any interior element must be zero. Therefore the tension pulling left equals the tension pulling right.

For a small element of length \(dl\),  
$$\sum F_x=T(x+dx)-T(x)=0\implies T=\text{constant}.$$

> [!WARNING]
> Omitting the zero-mass condition leads students to write spurious net-force equations on the string itself.

### Step 3 — Kinematic consequence of fixed length
If the string length \(L\) is constant, its time derivative is zero:  
$$\frac{dL}{dt}=0\implies v_1+v_2=0$$  
for two masses connected over a pulley (one up, one down). Differentiating again yields  
$$a_1=-a_2.$$

> [!WARNING]
> Confusing velocity signs with acceleration signs produces inconsistent equations of motion.

### Step 4 — Inserting tension into Newton’s second law
For each attached mass the tension is simply another force. Write \(\sum F=ma\) for every object, using the acceleration relation from Step 3 to reduce unknowns.

Example: two masses \(m_1>m_2\) hanging vertically,  
$$m_1g-T=m_1a,\qquad T-m_2g=m_2a.$$

> [!WARNING]
> Using the same sign for both accelerations violates the constraint and yields \(a=0\).

### Step 5 — Solving the linear system
Add the two equations to eliminate \(T\):  
$$(m_1-m_2)g=(m_1+m_2)a\implies a=\frac{m_1-m_2}{m_1+m_2}g.$$  
Substitute back to obtain  
$$T=\frac{2m_1m_2}{m_1+m_2}g.$$

### Step 6 — Textbook statement of the ideal-string model
An ideal string is massless, inextensible, and perfectly flexible. Under these hypotheses the tension is uniform, the string transmits force instantaneously, and connected particles satisfy the length constraint at every instant.

## 5. Worked examples — every step shown

**Example 1 — Two masses over a pulley**  
*Given:* \(m_1=3\) kg, \(m_2=2\) kg, \(g=9.8\) m s\(^{-2}\).  
*Find:* acceleration of each mass and tension.  

Apply Newton’s second law to \(m_1\) (down positive):  
$$m_1g-T=m_1a \qquad \text{(Why: net force equals mass times acceleration)}.$$  
Apply Newton’s second law to \(m_2\) (up positive for consistency with constraint):  
$$T-m_2g=m_2a \qquad \text{(Why: tension exceeds weight)}.$$  
Add the equations:  
$$(m_1-m_2)g=(m_1+m_2)a \implies a=\frac{1}{5}\times9.8=1.96\,\text{m s}^{-2}.$$  
Substitute into the second equation:  
$$T=2g+2\times1.96=23.52\,\text{N}.$$  
**\(a=1.96\) m s\(^{-2}\), \(T=23.52\) N**  

*Reflection:* The sign choice for \(a\) is dictated by the length constraint; reversing either sign produces an immediate contradiction with \(a>0\).

**Example 2 — Mass on table, hanging mass**  
*Given:* \(m_1=4\) kg on frictionless table, \(m_2=2\) kg hanging.  
*Find:* acceleration and tension.  

For \(m_2\):  
$$m_2g-T=m_2a.$$  
For \(m_1\):  
$$T=m_1a.$$  
Substitute:  
$$m_2g=m_2a+m_1a\implies a=\frac{m_2}{m_1+m_2}g=3.27\,\text{m s}^{-2}.$$  
**\(a=3.27\) m s\(^{-2}\), \(T=13.07\) N**

*Reflection:* Only one mass feels gravity; the constraint still forces identical magnitudes of acceleration.

**Example 3 — Three masses, two strings**  
*Given:* \(m_1=5\) kg, \(m_2=3\) kg, \(m_3=2\) kg in series vertically.  
*Find:* tensions \(T_1\) (upper) and \(T_2\) (lower).  

Whole system accelerates at \(a=g\).  
Upper string:  
$$T_1-(m_2+m_3)g=(m_2+m_3)a \implies T_1=5g.$$  
Lower string:  
$$T_2-m_3g=m_3a \implies T_2=2g.$$  
**\(T_1=49\) N, \(T_2=19.6\) N**

*Reflection:* Each tension supports only the mass below it; the constraint propagates the same \(a\) throughout.

**Example 4 — Movable pulley**  
*Given:* fixed ceiling, movable pulley of negligible mass with mass \(m\) attached; string ends pulled with forces \(F\).  
*Find:* acceleration of \(m\).  

Two segments support the movable pulley, so net upward force is \(2T-mg=ma\).  
Kinematic constraint: string shortening rate gives \(a_m=2a_{\text{hand}}\).  
If hands are fixed, \(a=0\) and \(T=mg/2\).  
If hands accelerate upward at \(a_h\), then \(a_m=2a_h\).  
**Acceleration of mass is twice the acceleration of each free end.**

*Reflection:* The factor of two arises directly from the length constraint on a doubled string segment.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Assuming tension varies in massless string | Students picture real ropes with weight             | Write \(\sum F=0\) on any interior segment           |
| Using same acceleration direction for both masses | Forgetting the string reverses relative motion      | Draw arrows consistent with length constraint        |
| Treating pulley mass as irrelevant without checking | Over-generalizing “ideal string” label              | Verify pulley inertia separately                     |
| Forgetting that tension does no work when string length fixed | Confusing force with energy transfer                | Note displacement along string is zero at contact point |
| Solving for \(T\) before applying constraint | Extra unknown remains                               | Always substitute \(a_1=-a_2\) first                 |
| Sign errors when one mass is on table | Mixing horizontal and vertical axes                 | Align positive directions with string orientation    |
| Neglecting that real strings have slight elasticity | Idealization taken literally                        | Check extension \(\Delta L=TL/EA\) is negligible     |

## 7. The textbook-precise statement
An ideal string is defined to be massless, perfectly flexible, and inextensible. Under these conditions the tension \(T\) is uniform throughout the string, acts tangentially, and the kinematic constraint \(\frac{dL}{dt}=0\) implies that the velocity components of all attached particles along the local string direction sum to zero. Consequently their accelerations satisfy the same linear relation. (See Kleppner & Kolenkow, *An Introduction to Mechanics*, 2nd ed., §3.3.)

## 8. Visual — diagram or schematic
```text
          Ceiling
            |
            |  T
            v
   m1 --->  o------T------o  <--- m2
            ^             ^
            |             |
           down          down
   (a1 = +a)          (a2 = -a)
```
Horizontal bar is fixed pulley (frictionless). String length \(L = x_1 + x_2 + \text{const}\). Differentiating twice enforces \(a_1 = -a_2\).

## 9. The memory technique
1. **The hook** — Picture the string as an invisible rigid rod that can only push or pull along its length; any stretch would instantly break the “rod” picture.
2. **What to overlearn** — \(T=\text{constant}\), \(a_1=-a_2\) (magnitudes equal), and the two-mass result \(T=2m_1m_2g/(m_1+m_2)\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from \(L=\text{const}\), differentiate twice to obtain the acceleration constraint, then insert uniform \(T\) into each \(\sum F=ma\).

## 10. What this unlocks
Mastery of tension constraints immediately enables Atwood machines, variable-mass rocket equations with tether release, and multi-body pulley systems used in crane and satellite deployment analyses.

- Next: friction and inclined planes with tension
- Next: Atwood machine with pulley inertia
- Next: variable-mass systems (rocket equation with staging)
- Next: Lagrangian mechanics with holonomic constraints

## 11. Self-check — five questions, no answers
1. Two masses \(m\) and \(2m\) hang from a single inextensible string over a pulley; which mass reaches the pulley first if released from rest?
2. A 5 kg block on a frictionless table is connected by an inextensible string to a 3 kg hanging block. Compute the tension when the system is released.
3. Three blocks of masses 1 kg, 2 kg, 3 kg are connected in series by two inextensible strings and hang vertically. Find the two tensions.
4. A movable pulley doubles the string segments supporting a load \(m\). If each free end is reeled in at speed \(v\), what is the upward speed of \(m\)?
5. An inextensible string connects two blocks on a double inclined plane (angles \(\theta_1\), \(\theta_2\)). Under what condition does the system remain at rest?