## 1. The one-sentence answer
**The centre of mass of a system of particles is the single point whose position vector equals the mass-weighted average of the position vectors of every particle in the system.**

Imagine several point masses scattered in space. Each mass pulls the balance point toward itself in direct proportion to how heavy it is. The resulting balance point is the centre of mass; it moves exactly as though the entire mass of the system were concentrated there and all external forces acted on it alone.  

If the particles have masses \(m_i\) at positions \(\vec{r}_i\), the location of this balance point is obtained by adding the products \(m_i\vec{r}_i\) and dividing by the total mass. The construction works in any number of dimensions and for any number of particles, provided only that the masses are positive scalars.

> [!NOTE]
> The centre of mass can lie outside every particle and even outside the physical body; its motion nevertheless obeys Newton’s second law exactly when only external forces are considered.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage return-to-launch-site burns are planned by treating the stage as a variable-mass system whose centre of mass must remain inside a narrow aerodynamic envelope; small shifts caused by propellant slosh are modelled with the same weighted-average definition.  

In the collision of the DART spacecraft with Dimorphos, the centre-of-mass velocity of the binary asteroid system after impact was used to infer the momentum transfer efficiency \(\beta\), directly constraining models of planetary-defence deflection.  

Semiconductor ion-implantation tools at ASML and Applied Materials steer dopant beams by steering their centre-of-mass trajectory through electromagnetic fields; any misalignment between beam centre of mass and wafer normal produces lattice defects that reduce yield.  

High-performance electric-vehicle stability algorithms (Tesla Model S Plaid torque-vectoring) continuously compute the vertical projection of the vehicle’s centre of mass to predict rollover margins during combined cornering and regenerative braking.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Scalar mass          | Supplies the weighting factor in the average              |
| Position vector \(\vec{r}\) | Locates each particle relative to a chosen origin        |
| Finite summation \(\sum\) | Aggregates the individual contributions                   |
| Newton’s second law for a single particle | Guarantees that the centre-of-mass acceleration equals net external force divided by total mass |

## 4. Building the idea — from intuition to formalism

### Step 1 — A lone particle defines its own centre
A single particle of mass \(m\) at position \(\vec{r}\) has no other mass to average against.  
Concrete example: a 2 kg point mass at \((3,0)\) m is already its own centre of mass.  
Formal statement: \(\vec{R}_\text{cm} = \vec{r}\).  
> [!WARNING]
> Treating an extended body as a single particle before locating its centre of mass will later produce incorrect torque calculations.

### Step 2 — Two particles locate a balance point along the line joining them
Place masses \(m_1\) at \(\vec{r}_1\) and \(m_2\) at \(\vec{r}_2\). The balance point divides the segment in the inverse ratio of the masses.  
Example: 3 kg at \(x=0\), 1 kg at \(x=4\) m yields a balance point at \(x=1\) m.  
Formal statement: \(\vec{R}_\text{cm} = \frac{m_1\vec{r}_1 + m_2\vec{r}_2}{m_1+m_2}\).

### Step 3 — Add a third particle by treating the first two as a combined mass at their own centre
The subsystem of the first two particles has total mass \(M_{12}=m_1+m_2\) located at \(\vec{R}_{12}\). The new three-particle centre is then the two-body centre between \(M_{12}\) and \(m_3\).  
This recursive construction shows that order of addition never matters.

### Step 4 — Generalise to \(N\) particles
Repeating the process for any finite collection yields the explicit weighted average.  
Formal statement:  
\[
\vec{R}_\text{cm} = \frac{1}{M}\sum_{i=1}^N m_i\vec{r}_i, \qquad M=\sum_{i=1}^N m_i.
\]

### Step 5 — Vector form in three dimensions
Each Cartesian component is averaged independently:  
\[
X_\text{cm} = \frac{1}{M}\sum m_i x_i, \quad
Y_\text{cm} = \frac{1}{M}\sum m_i y_i, \quad
Z_\text{cm} = \frac{1}{M}\sum m_i z_i.
\]
The vector equation is therefore component-wise and coordinate-system independent.

### Step 6 — Textbook definition reached
The centre of mass is the unique point whose position vector satisfies the weighted-average formula above for any choice of inertial origin.

## 5. Worked examples — every step shown

**Example 1 — Two collinear masses**  
*Given:* \(m_1=2\) kg at \(x=0\), \(m_2=6\) kg at \(x=3\) m.  
*Find:* \(X_\text{cm}\).  
Step 1: Compute total mass \(M=8\) kg. *Why:* definition requires division by total mass.  
Step 2: Form numerator \(2\cdot0 + 6\cdot3 = 18\) kg·m. *Why:* each mass multiplies its own coordinate.  
Step 3: Divide: \(X_\text{cm}=18/8=2.25\) m.  
**2.25 m**  

*Reflection:* The heavier mass dominates; the result lies closer to 6 kg than to 2 kg.

**Example 2 — Three particles in a plane**  
*Given:* 1 kg at \((0,0)\), 2 kg at \((4,0)\), 3 kg at \((1,3)\) m.  
*Find:* \(\vec{R}_\text{cm}\).  
Step 1: \(M=6\) kg.  
Step 2: \(X_\text{cm}=(1\cdot0+2\cdot4+3\cdot1)/6=11/6\) m.  
Step 3: \(Y_\text{cm}=(1\cdot0+2\cdot0+3\cdot3)/6=9/6=1.5\) m.  
**\(\vec{R}_\text{cm}=(1.833,1.5)\) m**  

*Reflection:* The calculation separates cleanly into independent coordinates.

**Example 3 — Centre of mass coincides with geometric centre for equal masses**  
*Given:* Four 1 kg masses at the corners of a square with side 2 m centred on the origin.  
*Find:* \(\vec{R}_\text{cm}\).  
Step 1: \(M=4\) kg.  
Step 2: Sum of \(x\)-coordinates = 0 by symmetry.  
Step 3: Same for \(y\).  
**\(\vec{R}_\text{cm}=(0,0)\)**  

*Reflection:* Symmetry forces the weighted average to the symmetry centre.

**Example 4 — One particle at the origin, another far away**  
*Given:* 5 kg at \((0,0)\), 0.01 kg at \((1000,0)\) m.  
*Find:* \(X_\text{cm}\).  
Step 1: \(M=5.01\) kg.  
Step 2: Numerator \(5\cdot0 + 0.01\cdot1000=10\).  
Step 3: \(X_\text{cm}=10/5.01\approx1.996\) m.  
**1.996 m**  

*Reflection:* Even a tiny mass shifts the centre measurably when placed far away; the formula captures this without special cases.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using arithmetic mean instead of weighted | Habit from school geometry                  | Always multiply each coordinate by its mass first    |
| Forgetting that CM can lie outside the body | Visual intuition limited to convex shapes   | Compute numerically before visualising               |
| Choosing a moving origin without correction | Confusion between inertial and non-inertial frames | Fix origin in an inertial frame before summing       |
| Treating negative masses as valid | Algebraic sign error                        | Verify all \(m_i>0\) before inserting into formula   |
| Omitting one particle from the sum | Simple oversight in large systems           | Count particles explicitly and match to mass list    |
| Confusing CM with geometric centre for unequal masses | Over-generalising symmetry arguments        | Perform the weighted sum even when symmetry seems obvious |
| Applying the 1-D formula in 2-D problems | Dimensional oversight                       | Write separate equations for each coordinate         |

## 7. The textbook-precise statement
For a system of \(N\) particles with masses \(m_i\) and position vectors \(\vec{r}_i\) relative to an inertial origin, the centre-of-mass position is defined by
\[
\vec{R}_\text{cm}\equiv\frac{1}{M}\sum_{i=1}^N m_i\vec{r}_i,\qquad M=\sum_{i=1}^N m_i>0.
\]
This definition appears in Goldstein, Poole & Safko, *Classical Mechanics*, 3rd ed., §1.2, and is the starting point for the subsequent proof that \(M\ddot{\vec{R}}_\text{cm}=\vec{F}^\text{ext}\).

## 8. Visual — diagram or schematic
```text
y
^
|       • m3 (3 kg)
|      /
|     /     R_cm
|    /      × (1.833, 1.5)
|   /
|  • m2 (2 kg)          • m1 (1 kg)
+---------------------------→ x
(0,0)                (4,0)
```
Three particles and their centre of mass; axes labelled, masses stated, CM marked with ×.

## 9. The memory technique
**The hook** — Picture a seesaw whose fulcrum is slid until it balances; the fulcrum sits at the mass-weighted average of the riders.  
**What to overlearn** — The vector formula \(\vec{R}_\text{cm}=\frac1M\sum m_i\vec{r}_i\) and the fact that total mass \(M\) is always the denominator.  
**Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
**First-principles fallback** — Re-derive by starting with two particles, adding a third, and observing that the pattern is the explicit sum.

## 10. What this unlocks
The definition supplies the kinematic foundation for every subsequent statement about system momentum.  

- Linear momentum of a system equals total mass times centre-of-mass velocity.  
- External force equals rate of change of system momentum evaluated at the centre of mass.  
- Two-body collision problems reduce to an equivalent one-body problem about the centre of mass.  
- Variable-mass rocket equations track centre-of-mass motion while mass is ejected.

## 11. Self-check — five questions, no answers
1. Three equal masses form an equilateral triangle. Where is the centre of mass relative to any vertex?  
2. A 1 kg mass sits at the origin and a 2 kg mass sits at (3,4) m. Compute the exact coordinates of the centre of mass.  
3. If every mass in a system is doubled while positions remain fixed, does the centre of mass move?  
4. A system consists of two particles whose centre of mass lies exactly midway between them. What must be true about their masses?  
5. In a head-on elastic collision between two isolated particles, the centre-of-mass velocity remains constant. Demonstrate this using only the definition of centre of mass.