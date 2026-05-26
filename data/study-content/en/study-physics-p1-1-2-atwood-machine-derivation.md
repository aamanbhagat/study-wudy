## 1. The one-sentence answer
**An Atwood machine consists of two masses connected by a light, inextensible string that passes over a frictionless pulley, and its derivation yields the common acceleration of the system from Newton's second law applied to each mass.**

The device isolates the interplay between gravity and tension. One mass descends while the other ascends; the string transmits force so both objects share the same magnitude of acceleration. Because the pulley is ideal, no energy is lost to rotation or friction, allowing the net force difference to be written directly in terms of the two weights.

To find the acceleration, draw separate free-body diagrams for each mass. The heavier mass experiences a downward net force of \(m_1g - T\), while the lighter mass experiences an upward net force of \(T - m_2g\). Newton's second law then supplies two equations that are solved simultaneously for the single unknown acceleration \(a\).

> [!NOTE]
> The string constraint forces the accelerations to be equal in magnitude and opposite in direction; forgetting this link is the single most common source of algebraic error.

## 2. Why this matters — concrete and current
Elevator manufacturers such as Otis and Schindler size counterweight systems using the same two-mass tension balance; the counterweight is chosen near the average car load so motor torque remains modest across the full travel range.

In launch-vehicle ground support equipment, NASA and SpaceX employ hoist rigs whose dynamics are modeled as modified Atwood machines when raising or lowering heavy stages; the derived acceleration formula determines motor power margins during stacked-vehicle mate/demate operations.

Particle-physics beam-line experiments at CERN use precision pulley-and-mass stages to position detector modules; residual acceleration after tension balancing must stay below \(10^{-4}\,g\) to avoid microphonic noise in silicon trackers.

Cable-stayed bridge construction employs traveling derricks whose lifting lines behave as Atwood pairs when one end carries a concrete segment and the other a counterweight; civil engineers solve the identical system to limit peak cable tension during segment erection.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Newton's second law      | Supplies \(\sum F = ma\) for each mass separately         |
| Free-body diagrams       | Isolates tension and weight vectors on each object        |
| Ideal-string constraint  | Enforces \(a_1 = -a_2\) so a single scalar acceleration appears |
| Gravitational force      | Provides the driving force \(mg\) acting on each mass     |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the two interacting masses
Two point masses \(m_1 > m_2\) hang vertically; gravity pulls each downward while the string exerts equal-magnitude tension upward on both.  
Example: \(m_1 = 3\,\text{kg}\), \(m_2 = 2\,\text{kg}\).  
Formal statement: label the masses and assign a consistent positive direction (downward for \(m_1\), upward for \(m_2\)).

> [!WARNING]
> Reversing the positive direction on one mass without flipping the sign of acceleration produces an inconsistent pair of equations.

### Step 2 — Draw separate free-body diagrams
For \(m_1\): weight \(m_1g\) down, tension \(T\) up.  
For \(m_2\): weight \(m_2g\) down, tension \(T\) up.  
The diagrams must be drawn independently; the shared magnitude of \(T\) is an inference, not an assumption drawn on the diagram.

### Step 3 — Write Newton's second law for each mass
For \(m_1\) (positive downward):  
\[ m_1 g - T = m_1 a \]  
For \(m_2\) (positive upward):  
\[ T - m_2 g = m_2 a \]

### Step 4 — Enforce the kinematic constraint
Because the string length is fixed, the accelerations are equal in magnitude: \(a_1 = a_2 = a\).

### Step 5 — Solve the simultaneous system
Add the two equations to eliminate \(T\):  
\[ m_1 g - m_2 g = m_1 a + m_2 a \]  
\[ a = \frac{(m_1 - m_2)g}{m_1 + m_2} \]  
Subtract the equations if tension is required.

## 5. Worked examples — every step shown

**Example 1 — Equal masses**  
*Given:* \(m_1 = m_2 = 5.0\,\text{kg}\).  
*Find:* acceleration \(a\).  
Apply the derived formula directly:  
\[ a = \frac{(5-5)g}{5+5} = 0 \]  
*Why:* net force difference vanishes.  
**\(a = 0\)**  
*Reflection:* zero acceleration confirms the limiting case of balanced weights; any derivation must recover this result.

**Example 2 — Standard unequal pair**  
*Given:* \(m_1 = 4.0\,\text{kg}\), \(m_2 = 3.0\,\text{kg}\).  
*Find:* \(a\) and \(T\).  
Net force: \( (4-3)g = 9.8\,\text{N} \).  
Total mass: \(7.0\,\text{kg}\).  
\[ a = \frac{9.8}{7.0} = 1.4\,\text{m/s}^2 \]  
*Why:* division by total inertia follows from adding the equations.  
Tension from second equation: \( T = m_2(g+a) = 3(9.8+1.4) = 33.6\,\text{N} \).  
**\(a = 1.4\,\text{m/s}^2\), \(T = 33.6\,\text{N}\)**  
*Reflection:* checking \(T\) with the first mass recovers the same value, verifying consistency.

**Example 3 — Find tension only**  
*Given:* \(m_1 = 10\,\text{kg}\), \(m_2 = 6\,\text{kg}\).  
*Find:* \(T\).  
First obtain  
\[ a = \frac{4g}{16} = 0.25g \]  
*Why:* substitute into either force equation.  
\[ T = m_2(g + a) = 6(1.25g) = 7.5g \]  
**\(T = 7.5mg\)** (numerically \(73.5\,\text{N}\))  
*Reflection:* tension lies between the two weights, as required by equilibrium intuition.

**Example 4 — One mass on table variant**  
*Given:* \(m_1 = 5\,\text{kg}\) hanging, \(m_2 = 3\,\text{kg}\) on frictionless table, string over pulley.  
*Find:* \(a\).  
Only \(m_1\) contributes driving force: \( m_1 g = (m_1 + m_2)a \).  
\[ a = \frac{5g}{8} = 0.625g \]  
**\(a = 0.625g\)**  
*Reflection:* the table removes the opposing weight, illustrating how the same constraint technique adapts to altered geometry.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating accelerations as independent | Students forget the string length is fixed | Always write \(a_1 = -a_2\) before writing equations |
| Using weight instead of mass in inertia term | Confusing force with inertial mass          | Keep \(m_1 + m_2\) as the denominator        |
| Solving for \(T\) before \(a\)    | Tension is unknown; premature substitution | Add the two equations first to eliminate \(T\) |
| Assuming pulley has mass          | Real pulleys rotate; ideal case omits inertia | Explicitly state “frictionless, massless pulley” |
| Sign error on lighter mass        | Direction chosen inconsistently             | Define positive direction for each mass separately |
| Neglecting that \(g\) cancels     | Formula appears to depend on \(g\)          | Verify \(g\) factors out in every algebraic path |
| Forgetting to check limiting cases | \(m_1 \to m_2\) or \(m_2 \to 0\)            | Substitute extremes after derivation         |

## 7. The textbook-precise statement
Let two point masses \(m_1 > m_2\) be joined by a light, inextensible string of negligible mass that passes over a fixed, frictionless pulley. Let the gravitational field be uniform with magnitude \(g\). Under these conditions the magnitude of the acceleration of each mass is
\[ a = \frac{(m_1 - m_2)}{(m_1 + m_2)} g \]
and the tension in the string is
\[ T = \frac{2 m_1 m_2}{m_1 + m_2} g. \]
(Halliday, Resnick & Walker, *Fundamentals of Physics*, 12e, §5-7.)

## 8. Visual — diagram or schematic
```text
          Pulley (frictionless, massless)
               ________
              /        \
             /          \
            /            \
           T              T
           |              |
         m1 (down)      m2 (up)
           |              |
          g↓             g↓
```
Vertical coordinate \(y\) positive downward for \(m_1\), upward for \(m_2\); string length \(L = y_1 + y_2 =\) constant.

## 9. The memory technique
1. **The hook** — Picture two skydivers holding opposite ends of a rope over a cloud-pulley; whichever is heavier falls, but the rope tension slows the fall exactly as much as it speeds the lighter one up.
2. **What to overlearn** — The acceleration formula \(a = \frac{m_1-m_2}{m_1+m_2}g\) and the tension formula \(T = \frac{2m_1m_2}{m_1+m_2}g\).
3. **Spaced-repetition schedule** — Review derivation at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Redraw free-body diagrams, write \(\sum F = ma\) twice, impose \(a_1 = -a_2\), and add the equations.

## 10. What this unlocks
Mastery of the Atwood derivation supplies the template for every subsequent constrained two-body problem.  
- Multiple-pulley systems and movable-pulley advantage  
- Inclined-plane variants with friction  
- Variable-mass systems (rocket equation with tether)  
- Coupled oscillators when springs replace the string  
- Lagrangian mechanics with holonomic constraints  

## 11. Self-check — five questions, no answers
1. Derive the acceleration when the pulley has rotational inertia \(I\) and radius \(R\).  
2. Two masses differ by 0.1 %; what fractional accuracy is required in timing a 2 m descent to detect the acceleration?  
3. Show that tension reaches its maximum value when \(m_1 = m_2\).  
4. If the string is replaced by one of finite mass per unit length, does the acceleration increase or decrease?  
5. A third mass \(m_3\) is attached to \(m_2\) via another pulley; write the new acceleration of \(m_1\).