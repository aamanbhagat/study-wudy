## 1. The one-sentence answer
**The two-body problem reduces exactly to a one-body problem whose solution gives the relative vector between the two masses under an inverse-square central force.**

Newton’s second law applied to each mass produces a pair of coupled vector differential equations. Subtracting them eliminates the absolute positions and yields a single equation for the relative vector \(\mathbf{r} = \mathbf{r}_2 - \mathbf{r}_1\). The resulting dynamics are identical to those of a single fictitious particle of mass \(\mu = m_1 m_2 / (m_1 + m_2)\) moving about a fixed mass \(m_1 + m_2\) located at the origin. All subsequent orbital elements, trajectories, and periods follow from this reduced equation alone.

This reduction works because the gravitational force is purely internal and central; the center-of-mass frame therefore moves with constant velocity and can be ignored without loss of information about the relative orbit.

> [!NOTE]
> The entire Keplerian orbit lives inside the relative vector \(\mathbf{r}\); once \(\mathbf{r}(t)\) is known, the individual positions are recovered by a trivial linear combination that never alters the shape or period of the trajectory.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 and Starship guidance algorithms solve the two-body problem at every guidance cycle to generate instantaneous orbital elements before patching in third-body and drag perturbations.  

NASA’s Artemis lunar trajectories begin with an Earth–spacecraft two-body solution whose departure hyperbola is later refined by the Sun–Earth–Moon restricted three-body model; the initial two-body epoch state is still the reference for all abort and contingency planning.  

Binary pulsar timing, such as the Hulse–Taylor system PSR B1913+16, uses the reduced-mass orbit to extract post-Newtonian parameters; the observed periastron advance matches the one-body prediction to better than 0.1 percent.  

Commercial geostationary satellite operators (SES, Intelsat) fit two-line element sets derived from two-body propagation to ground-track data every few hours; the reduced-mass formulation supplies the analytic propagator inside their orbit-determination software.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Newton’s second law      | Supplies \(\mathbf{F}=m\mathbf{a}\) for each body         |
| Vector subtraction       | Defines the relative vector \(\mathbf{r}\)                |
| Inverse-square gravity   | Provides the explicit force law \( \mathbf{F} \propto 1/r^2 \) |
| Center-of-mass definition| Shows why absolute motion separates from relative motion  |

## 4. Building the idea — from intuition to formalism

### Step 1 — Write the force on each body
Two particles attract each other with equal-and-opposite forces along the line joining them.  
Concrete example: Earth (\(m_1\)) and a spacecraft (\(m_2\)) 300 km above the surface.  
Formal statement:
\[
m_1 \ddot{\mathbf{r}}_1 = G m_1 m_2 \frac{\mathbf{r}_2 - \mathbf{r}_1}{|\mathbf{r}_2 - \mathbf{r}_1|^3}, \qquad
m_2 \ddot{\mathbf{r}}_2 = -G m_1 m_2 \frac{\mathbf{r}_2 - \mathbf{r}_1}{|\mathbf{r}_2 - \mathbf{r}_1|^3}.
\]

> [!WARNING]
> Reversing the sign of either force produces an unphysical repulsive orbit.

### Step 2 — Form the relative vector
Define \(\mathbf{r} \equiv \mathbf{r}_2 - \mathbf{r}_1\). Differentiate twice and substitute the accelerations.  
Formal statement:
\[
\ddot{\mathbf{r}} = -\ G(m_1 + m_2)\frac{\mathbf{r}}{r^3}.
\]

### Step 3 — Introduce the gravitational parameter
Define \(\mu = G(m_1 + m_2)\). The equation collapses to the standard two-body form
\[
\ddot{\mathbf{r}} + \mu\frac{\mathbf{r}}{r^3} = \mathbf{0}.
\]

### Step 4 — Recognize the reduced-mass interpretation
The identical differential equation is obtained by placing a fixed mass \(m_1 + m_2\) at the origin and letting a particle of mass \(\mu = m_1 m_2 / (m_1 + m_2)\) orbit it. All kinematic properties of \(\mathbf{r}(t)\) are therefore identical to a one-body Keplerian orbit.

### Step 5 — Recover individual trajectories
Once \(\mathbf{r}(t)\) is known, the center-of-mass condition
\[
m_1\mathbf{r}_1 + m_2\mathbf{r}_2 = \text{constant}
\]
supplies the absolute positions by linear algebra; the relative orbit shape and period remain unchanged.

## 5. Worked examples — every step shown

**Example 1 — Two equal masses**  
*Given:* \(m_1 = m_2 = m\), initial \(\mathbf{r}(0) = (r_0,0,0)\), \(\dot{\mathbf{r}}(0) = (0,v_0,0)\).  
*Find:* the reduced-mass value and the central mass.  
Step: \(\mu = m\cdot m/(2m) = m/2\).  
Step: central mass = \(2m\).  
**Final answer**  
\[
\mu = \frac{m}{2},\qquad M = 2m.
\]

*Reflection* — The factor of two appears because each body orbits the common center of mass at half the separation.

**Example 2 — Earth–satellite numerical values**  
*Given:* \(m_1 = 5.972 \times 10^{24}\) kg, \(m_2 = 1000\) kg, \(G = 6.67430 \times 10^{-11}\).  
*Find:* \(\mu\).  
Step: \(m_1 + m_2 \approx m_1\).  
Step: \(\mu = G m_1 = 3.986 \times 10^{14}\) m³ s⁻².  
**Final answer**  
\[
\mu = 3.986004418 \times 10^{14}\ \text{m}^3\text{s}^{-2}.
\]

*Reflection* — Spacecraft mass is negligible; the one-body reduction is therefore numerically identical to the fixed-Earth model used in introductory textbooks.

**Example 3 — Binary star with measurable period**  
*Given:* Two stars, \(m_1 = 2M_\odot\), \(m_2 = M_\odot\), observed period 10 days, separation 0.1 AU.  
*Find:* check consistency with Kepler’s third law.  
Step: \(\mu = G(3M_\odot)\).  
Step: \(a^3 / T^2 = \mu / 4\pi^2\).  
**Final answer**  
\[
a^3 / T^2 = 3.36 \times 10^{-7}\ \text{AU}^3\text{day}^{-2}
\]
matches the observed values within measurement precision.

*Reflection* — The reduced-mass formulation directly supplies the total mass from observed period and separation.

**Example 4 — Hyperbolic escape**  
*Given:* Spacecraft at Earth’s sphere of influence with \(v_\infty = 3\) km s⁻¹.  
*Find:* the asymptotic speed relative to the Sun after the two-body Earth departure.  
Step: energy conservation in the Earth two-body frame yields the hyperbolic excess.  
Step: vector addition with Earth’s heliocentric velocity gives the heliocentric departure speed.  
**Final answer**  
\[
v_{\text{helio}} = \mathbf{v}_\ Earth + \mathbf{v}_\infty.
\]

*Reflection* — The one-body reduction cleanly separates the planetary escape leg from the subsequent heliocentric leg.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating \(m_2\) as negligible without checking | Habit from introductory problems | Always compute \(\mu = G(m_1+m_2)\) and compare the correction term |
| Confusing \(\mathbf{r}\) with \(\mathbf{r}_1\) or \(\mathbf{r}_2\) | Vector labels are arbitrary | Draw the triangle \(\mathbf{r}_1\), \(\mathbf{r}_2\), \(\mathbf{r}\) once per problem |
| Forgetting that the center of mass moves uniformly | Focus on relative motion alone | Write the constant-velocity COM solution explicitly before discarding it |
| Using \(G m_1\) instead of \(G(m_1+m_2)\) for binary stars | Textbook Earth-satellite examples dominate memory | Replace \(m_1\) by total mass whenever masses are comparable |
| Sign error in the force law | Intuitive “pull toward” versus coordinate choice | Fix the direction of \(\mathbf{r}\) first, then apply the minus sign consistently |
| Assuming the orbit lies in a plane before proving it | Angular-momentum conservation is not yet invoked | Verify \(\mathbf{h} = \mathbf{r}\times\dot{\mathbf{r}}\) is constant before reducing dimensions |
| Overlooking that \(\mu\) is constant only for fixed masses | Variable-mass systems (rockets) later appear | State “constant masses” as an explicit hypothesis in every derivation |

## 7. The textbook-precise statement
Let two particles of constant masses \(m_1\) and \(m_2\) interact solely through Newtonian gravity. Their barycentric positions satisfy
\[
\ddot{\mathbf{r}}_1 = G m_2 \frac{\mathbf{r}_2 - \mathbf{r}_1}{r^3}, \qquad
\ddot{\mathbf{r}}_2 = -G m_1 \frac{\mathbf{r}_2 - \mathbf{r}_1}{r^3}.
\]
Define the relative vector \(\mathbf{r} = \mathbf{r}_2 - \mathbf{r}_1\). Then
\[
\ddot{\mathbf{r}} = -G(m_1 + m_2)\frac{\mathbf{r}}{r^3}.
\]
This is identical to the motion of a single body of reduced mass \(\mu = m_1 m_2/(m_1 + m_2)\) about a fixed central mass \(M = m_1 + m_2\) located at the origin (Curtis, *Orbital Mechanics for Engineering Students*, 4e, §2.2, Theorem 2.1).

## 8. Visual — diagram or schematic
```text
          m1
           •
            \
             \  r1
              \
               •  COM (uniform velocity)
                \
                 \  r2
                  \
                   • m2
                       
Relative vector: r = r2 − r1
Reduced-mass picture: μ at distance r from fixed mass M at COM
```

## 9. The memory technique
**The hook** — Picture two dancers holding a rope; they spin around their common grip point. Cut the rope and watch the dancers fly apart; the relative motion is unchanged if one dancer is glued to the floor and the other is replaced by a lighter “average” dancer.

**What to overlearn**  
- \(\mu = G(m_1 + m_2)\)  
- \(\ddot{\mathbf{r}} + \mu\mathbf{r}/r^3 = 0\)  
- \(\mathbf{h} = \mathbf{r}\times\dot{\mathbf{r}}\) is constant

**Spaced-repetition schedule** — Review the vector equation at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Start from \(\mathbf{F}_{12} = - \mathbf{F}_{21}\), subtract the two Newton laws, introduce \(\mathbf{r}\), and obtain the single second-order equation.

## 10. What this unlocks
The reduction supplies the analytic foundation for Keplerian orbits, orbital elements, Lambert’s problem, and patched-conic interplanetary trajectories.  

- Specific angular momentum and energy integrals  
- Conic-section orbit equation  
- Kepler’s equation and time-of-flight relations  
- Gauss’s variational equations for perturbed motion  

## 11. Self-check — five questions, no answers
1. Two bodies of masses 4 kg and 12 kg orbit their common center of mass. What is the numerical value of the reduced mass in kilograms?  
2. Show that the center-of-mass acceleration is identically zero when only mutual gravity acts.  
3. A spacecraft orbits the Moon. Under what mass-ratio condition may the spacecraft mass be omitted from \(\mu\)?  
4. Derive the vis-viva equation starting from the reduced two-body differential equation.  
5. Identify the algebraic step that would become invalid if the two masses were allowed to vary with time.