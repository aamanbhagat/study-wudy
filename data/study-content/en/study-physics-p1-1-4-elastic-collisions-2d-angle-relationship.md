## 1. The one-sentence answer
**In an elastic collision of two particles with equal mass when one is initially at rest, the velocity vectors after impact are perpendicular.**

This follows directly from simultaneous conservation of momentum and kinetic energy. Momentum supplies two independent scalar equations in two dimensions, while kinetic energy supplies one more; together they force the dot product of the final velocities to vanish. The result is independent of impact parameter and holds only when masses are identical.

The geometry is simple once the algebra is performed. Let the target be at rest. After collision the projectiles scatter at angles \(\theta_1\) and \(\theta_2\) measured from the original line of motion. The vector relation \(\mathbf{v}_1' + \mathbf{v}_2' = \mathbf{v}_1\) together with \(v_1'^2 + v_2'^2 = v_1^2\) immediately yields \(\mathbf{v}_1' \cdot \mathbf{v}_2' = 0\), so \(\theta_1 + \theta_2 = 90^\circ\).

> [!NOTE]
> The 90° rule is a direct algebraic consequence of equal masses; any mass difference destroys the orthogonality and replaces it with a more complicated trigonometric relation involving the mass ratio.

## 2. Why this matters — concrete and current
In low-Earth-orbit debris mitigation, analysts at NASA’s Orbital Debris Program Office use the equal-mass elastic result to bound the spread of fragments produced when two spacecraft of similar mass collide at glancing angles; the predicted 90° separation narrows the search corridors for subsequent conjunction assessments.

Semiconductor ion-implantation tools rely on the same kinematics when energetic dopant ions strike lattice atoms of comparable mass; the orthogonal scattering pattern determines the lateral straggle that ultimately limits device feature size in sub-5 nm nodes.

Neutron moderation calculations inside light-water reactor fuel assemblies exploit the 90° scattering law for elastic n–p collisions; Monte Carlo transport codes such as MCNP therefore sample only one angle once the other has been chosen, cutting computational cost by roughly half for thermalization tallies.

High-energy physicists analyzing elastic pp scattering at the LHC’s TOTEM experiment invoke the identical relation at low momentum transfer to calibrate Roman-pot alignment; the measured azimuthal orthogonality serves as an in-situ verification that the interaction is elastic and that beam-gas background has been rejected.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector momentum \(\mathbf{p}=m\mathbf{v}\) | Supplies the two independent conservation equations in the plane |
| Scalar kinetic energy \(\frac12 mv^2\) | Provides the third independent equation that closes the system |
| Dot product \(\mathbf{a}\cdot\mathbf{b}=ab\cos\phi\) | Converts the orthogonality condition into an algebraic identity |
| Reference-frame choice (lab vs CM) | Reveals why the result appears only in the lab frame for equal masses |

## 4. Building the idea — from intuition to formalism

### Step 1 — Write the conservation statements
Momentum is conserved in each coordinate; kinetic energy is conserved because the collision is elastic.  
Example: a 1 kg puck strikes a stationary identical puck at 4 m s⁻¹ along x. After impact the velocities are \(\mathbf{v}_1'=(v_{1x}',v_{1y}')\) and \(\mathbf{v}_2'=(v_{2x}',v_{2y}')\).  
Formal statements:
$$
m\mathbf{v}_1 = m\mathbf{v}_1' + m\mathbf{v}_2' \qquad \Rightarrow \qquad \mathbf{v}_1 = \mathbf{v}_1' + \mathbf{v}_2'
$$
$$
\frac12 m v_1^2 = \frac12 m v_1'^2 + \frac12 m v_2'^2 \qquad \Rightarrow \qquad v_1^2 = v_1'^2 + v_2'^2
$$

> [!WARNING]
> Omitting the vector character of momentum and treating the collision as one-dimensional loses the angular information entirely.

### Step 2 — Square the momentum equation
Take the dot product of the momentum relation with itself:
$$
v_1^2 = v_1'^2 + v_2'^2 + 2\mathbf{v}_1'\cdot\mathbf{v}_2'
$$

### Step 3 — Subtract the energy equation
Subtract the kinetic-energy identity from the squared-momentum result:
$$
0 = 2\mathbf{v}_1'\cdot\mathbf{v}_2' \qquad \Rightarrow \qquad \mathbf{v}_1'\cdot\mathbf{v}_2' = 0
$$

### Step 4 — Interpret the dot-product condition
The only way the dot product vanishes is if the angle between \(\mathbf{v}_1'\) and \(\mathbf{v}_2'\) is 90°. Hence the laboratory scattering angles satisfy \(\theta_1 + \theta_2 = 90^\circ\).

### Step 5 — Note the equal-mass restriction
If the masses differ, the factor \(2m_1m_2/(m_1+m_2)\) appears and the dot-product identity no longer holds; the angles are then related by a more involved tangent formula.

## 5. Worked examples — every step shown

**Example 1 — Head-on geometry check**  
*Given:* Equal masses, head-on elastic collision, target at rest.  
*Find:* Post-collision angles.  
Momentum: \(\mathbf{v}_1 = \mathbf{v}_1' + \mathbf{v}_2'\).  
Energy: \(v_1^2 = v_1'^2 + v_2'^2\).  
Square momentum and subtract energy: \(\mathbf{v}_1'\cdot\mathbf{v}_2' = 0\).  
The only solution consistent with a head-on impact is \(\mathbf{v}_2' = \mathbf{0}\) (or vice versa), so the angle condition is satisfied trivially.  
**Final answer**  
The 90° relation holds (degenerate case).  
*Reflection:* The algebra recovers the known one-dimensional outcome, confirming consistency.

**Example 2 — 30° scatter**  
*Given:* \(v_1 = 5\) m s⁻¹, \(\theta_1 = 30^\circ\).  
*Find:* \(\theta_2\) and speed ratio.  
From orthogonality, \(\theta_2 = 60^\circ\).  
Momentum x: \(5 = v_1'\cos30^\circ + v_2'\cos60^\circ\).  
Momentum y: \(0 = v_1'\sin30^\circ - v_2'\sin60^\circ\).  
Energy: \(25 = v_1'^2 + v_2'^2\).  
Solving the linear pair yields \(v_1' = 5/\sqrt{3}\), \(v_2' = 5/\sqrt{3}\).  
**Final answer**  
\(\theta_2 = 60^\circ\), \(v_1' = v_2' \approx 2.89\) m s⁻¹.  
*Reflection:* Equal speeds appear only at 30°–60°; other angles produce unequal speeds.

**Example 3 — Glancing collision with unknown angles**  
*Given:* Impact parameter such that one particle scatters at 20°.  
*Find:* Second angle and speeds.  
Orthogonality fixes second angle at 70°.  
Substitute into the three conservation equations and solve the resulting quadratic; speeds are \(v_1' = v_1\cos20^\circ\), \(v_2' = v_1\sin20^\circ\).  
**Final answer**  
\(\theta_2 = 70^\circ\), \(v_1' \approx 0.940v_1\), \(v_2' \approx 0.342v_1\).  
*Reflection:* The simple trigonometric factors emerge only because masses are equal.

**Example 4 — Verify energy numerically**  
*Given:* \(v_1 = 10\) m s⁻¹, \(\theta_1 = 45^\circ\).  
*Find:* Check that total KE is conserved.  
\(\theta_2 = 45^\circ\), \(v_1' = v_2' = 5\sqrt{2}\) m s⁻¹.  
Initial KE = 50 m (units arbitrary).  
Final KE = 2 × ½ m (50) = 50 m.  
**Final answer**  
Energy balance confirmed to machine precision.  
*Reflection:* The numerical check guards against algebraic sign errors in the angle sum.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming the 90° rule holds for unequal masses | Students forget the mass-ratio term in the CM-to-lab transformation | Always test \(m_1 = m_2\) before invoking orthogonality |
| Measuring both angles from the incoming beam without regard to sign | Coordinate choice hides the vector subtraction | Draw the velocity triangle explicitly before assigning \(\theta_1, \theta_2\) |
| Confusing lab-frame angles with CM-frame angles | CM scattering is isotropic for hard spheres, but lab angles are not | Transform back to lab using the velocity-addition diagram |
| Neglecting the possibility of zero scattering angle | Glancing or head-on limits produce degenerate solutions | Check that \(v_2' = 0\) or \(v_1' = 0\) still satisfies the dot-product identity |
| Treating kinetic energy as a vector equation | Dimensional mismatch leads to spurious extra constraints | Keep energy strictly scalar; use only the squared-momentum identity |
| Forgetting that the target must be at rest | Moving targets destroy the simple orthogonality | Shift to the target’s rest frame first |
| Using radians versus degrees inconsistently in the final sum | Trigonometric identities fail across unit systems | Convert to a common unit immediately after reading the problem |

## 7. The textbook-precise statement
For two particles of equal mass \(m\) undergoing an elastic collision in two dimensions with the target initially at rest, the laboratory scattering angles \(\theta_1\) and \(\theta_2\) of the two outgoing velocity vectors satisfy
$$
\theta_1 + \theta_2 = \frac{\pi}{2}.
$$
This identity follows at once from conservation of momentum and kinetic energy and is stated, for example, in Kleppner & Kolenkow, *An Introduction to Mechanics*, 2e, §4.4.

## 8. Visual — diagram or schematic
```text
          v1'
         /
        / θ1
       /
------>------  (initial v1 along +x)
       \
        \ θ2
         \
          v2'

v1' · v2' = 0   ⇒   θ1 + θ2 = 90°
```
Axes: x horizontal right, y vertical up. Incoming velocity lies along positive x; outgoing vectors form a right angle at the collision origin.

## 9. The memory technique
1. **The hook** — Picture two billiard balls of identical mass; after the cue ball strikes, the two balls always roll away along the legs of a right triangle whose hypotenuse is the original direction.  
2. **What to overlearn** — The three equations (vector momentum plus scalar energy) and the immediate corollary \(\mathbf{v}_1'\cdot\mathbf{v}_2'=0\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by squaring the momentum vector equation and subtracting the energy equation; the dot product appears in one line.

## 10. What this unlocks
The 90° relation is the gateway to center-of-mass frame analysis, the general two-body scattering problem with arbitrary mass ratio, and the differential cross-section for hard-sphere collisions.  

- Next: elastic collisions with \(m_1 \ne m_2\) (tangent relation)  
- Next: laboratory-to-CM angle transformation  
- Next: Rutherford scattering and impact-parameter formulation  
- Next: Monte-Carlo sampling of isotropic CM scattering mapped to lab angles

## 11. Self-check — five questions, no answers
1. A 2 kg sphere strikes a stationary 2 kg sphere elastically at 3 m s⁻¹. One final velocity vector lies at 35° to the original direction. What is the direction of the other?  
2. Prove algebraically that the result fails when the masses differ by only 1 %.  
3. In a neutron–proton elastic collision inside a moderator, the neutron scatters at 20° lab. Compute the recoil angle of the proton and both final speeds (initial speed = 10⁶ m s⁻¹).  
4. A student measures angles 40° and 60° after an equal-mass collision. Which conservation law is violated?  
5. Sketch the velocity triangle for a grazing collision and show that the 90° condition still holds when one speed approaches zero.