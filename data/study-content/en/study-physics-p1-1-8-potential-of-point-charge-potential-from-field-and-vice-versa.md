## 1. The one-sentence answer
**Electric potential due to a point charge is the scalar function \(V(\mathbf{r}) = \frac{1}{4\pi\epsilon_0}\frac{q}{r}\) whose negative gradient recovers the electric field and equals the work per unit charge required to assemble the configuration from infinity.**

The electric field \(\mathbf{E}\) is a vector that pushes charges; potential \(V\) is the scalar bookkeeping device that records how much work that push can do. Because work is path-independent in electrostatics, the line integral of \(\mathbf{E}\) collapses to a difference of two scalar values. For a single point charge the integral evaluates immediately to the inverse-distance form above once the zero of potential is fixed at infinity.

This scalar reduction is powerful: instead of adding vector contributions from every charge, one adds ordinary numbers and then takes a derivative only when the field itself is required.

> [!NOTE]
> The reference point at infinity is a convention, not a law; any constant shift in \(V\) leaves \(\mathbf{E}\) unchanged, yet the absolute value of \(V\) matters when energies or voltages between conductors are compared.

## 2. Why this matters — concrete and current
In spacecraft electrostatic-discharge analysis, NASA and ESA model the potential of a satellite relative to the surrounding plasma using the point-charge formula summed over surface elements; a 10 kV differential can trigger arcing that destroys solar arrays, as occurred on the SAMPEX mission in 1995.

Ion-thruster design at companies such as Aerojet Rocketdyne relies on solving Laplace’s equation for the potential between grids; the gradient then supplies the electric field that accelerates xenon ions to 30–50 km s⁻¹ exhaust velocities.

Semiconductor process tools use the same relation to predict the voltage on an isolated gate oxide when a nearby plasma deposits charge; Intel’s 18 Å node papers explicitly cite the conversion \(E = -\nabla V\) to set safe over-etch limits.

Particle-physics beam lines at CERN compute the potential of residual-gas ions around the LHC beam; the resulting field map determines beam-loss rates that limit instantaneous luminosity.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Work as line integral \(\int\mathbf{F}\cdot d\mathbf{l}\) | Potential is work per unit charge; the integral supplies the definition. |
| Conservative vector field (\(\nabla\times\mathbf{E}=0\)) | Guarantees path independence so a scalar potential exists. |
| Gradient operator in Cartesian and spherical coordinates | Converts between \(V\) and \(\mathbf{E}\) in both directions. |
| Coulomb’s law for a point charge | Supplies the explicit field that must be integrated. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Work against a conservative force
Work done by an external agent to move a test charge slowly equals the change in potential energy.  
Example: moving \(+q_0\) from 1 m to 2 m away from a fixed \(+q\) requires positive work because like charges repel.  
Formally,  
\[
W_{\text{ext}} = \int_{\mathbf{r}_i}^{\mathbf{r}_f} q_0\mathbf{E}\cdot d\mathbf{l}.
\]
> [!WARNING]
> Reversing the limits without flipping the sign produces an energy of the wrong sign and breaks conservation.

### Step 2 — Define potential as work per unit charge
Divide by \(q_0\) to obtain a quantity independent of the test charge:  
\[
V(\mathbf{r}_f) - V(\mathbf{r}_i) = -\int_{\mathbf{r}_i}^{\mathbf{r}_f}\mathbf{E}\cdot d\mathbf{l}.
\]
The zero is conventionally placed at infinity so \(V(\infty)=0\).

### Step 3 — Specialize to the point-charge field
Coulomb’s field is radial, \(\mathbf{E}= \frac{1}{4\pi\epsilon_0}\frac{q}{r^2}\hat{r}\). The dot product collapses to a simple radial integral:  
\[
V(r) = -\int_{\infty}^{r}\frac{1}{4\pi\epsilon_0}\frac{q}{r'^2}dr' = \frac{1}{4\pi\epsilon_0}\frac{q}{r}.
\]

### Step 4 — Recover the field from the potential
Differentiate the scalar:  
\[
\mathbf{E} = -\nabla V.
\]
In spherical coordinates the radial component alone survives, reproducing Coulomb’s law exactly.

### Step 5 — General electrostatics
Any charge distribution yields a potential by linear superposition; the field is recovered by the same gradient operation. This is the textbook statement of the scalar-potential formulation of electrostatics.

## 5. Worked examples — every step shown

**Example 1 — Potential at a finite distance**  
*Given:* \(q=2\,\mu\text{C}\) at the origin.  
*Find:* \(V\) at \(r=0.5\) m.  

\[
V(r)=\frac{1}{4\pi\epsilon_0}\frac{q}{r}.
\]
*Why:* Direct substitution of the derived point-charge potential.  
Substitute values:  
\[
V(0.5)=\bigl(9\times10^9\bigr)\frac{2\times10^{-6}}{0.5}=3.6\times10^4\text{ V}.
\]
**Final answer**  
**\(3.6\times10^4\) V**

*Reflection:* The calculation is a one-line evaluation once the reference at infinity is accepted; the same number appears as voltage on an isolated sphere of radius 0.5 m carrying that charge.

**Example 2 — Uniform-field potential difference**  
*Given:* \(\mathbf{E}=300\hat{z}\) V m⁻¹ between parallel plates.  
*Find:* \(V\) at \(z=2\) cm if \(V(0)=0\).  

\[
V(z)=-\int_0^z E_z\,dz'=-300z.
\]
*Why:* The line integral reduces to an ordinary integral because \(\mathbf{E}\) is constant.  
At \(z=0.02\) m:  
\[
V=-6\text{ V}.
\]
**Final answer**  
**-6 V**

*Reflection:* The negative sign shows that potential drops in the direction of the field, a universal feature that appears again in batteries and thruster grids.

**Example 3 — Field from a known potential**  
*Given:* \(V(x,y,z)=5x+3y\) V.  
*Find:* \(\mathbf{E}\).  

\[
E_x=-\frac{\partial V}{\partial x}=-5,\quad E_y=-3,\quad E_z=0.
\]
*Why:* The gradient theorem supplies each component independently.  
**Final answer**  
**\(\mathbf{E}=-5\hat{x}-3\hat{y}\) V m⁻¹**

*Reflection:* No integration is required; differentiation is mechanically simpler than evaluating line integrals for every point.

**Example 4 — Potential on the axis of a dipole**  
*Given:* \(+q\) at \(z=+d/2\), \(-q\) at \(z=-d/2\).  
*Find:* \(V\) at large \(z\).  

Superpose the two point-charge potentials:  
\[
V(z)=\frac{1}{4\pi\epsilon_0}\left(\frac{q}{z-d/2}-\frac{q}{z+d/2}\right).
\]
Factor and expand for \(z\gg d\):  
\[
V(z)\approx\frac{1}{4\pi\epsilon_0}\frac{qd}{z^2}.
\]
**Final answer**  
**\(\frac{1}{4\pi\epsilon_0}\frac{p}{z^2}\) where \(p=qd\)**

*Reflection:* The inverse-square decay (instead of inverse-linear) is the first signature of charge neutrality and foreshadows multipole expansions used in spacecraft-plasma interactions.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting the minus sign when \(\mathbf{E}=-\nabla V\) | Intuition that “higher potential means stronger field” without direction | Always write the vector operator explicitly before evaluating components. |
| Setting \(V=0\) at a conductor surface instead of infinity | Habit from circuit theory where voltages are relative | Re-derive the constant from the boundary condition at infinity when the domain is unbounded. |
| Treating potential as a vector | Confusion with the vector character of \(\mathbf{E}\) | Remember potential is defined through a scalar line integral; scalars add, vectors do not. |
| Integrating \(\mathbf{E}\) along a non-radial path for a point charge | Belief that every path must be checked | Exploit \(\nabla\times\mathbf{E}=0\) once and for all; any path between the same endpoints yields the identical \(V\). |
| Omitting \(4\pi\epsilon_0\) in SI calculations | Mixing cgs and SI units under time pressure | Keep the constant visible in every formula until numerical substitution. |
| Confusing \(V\) with potential energy \(U=qV\) | Same symbol in some older texts | Write \(U=qV\) explicitly when energy is required; keep \(V\) for the field property. |
| Using \(r\) instead of \(|\mathbf{r}-\mathbf{r}'|\) for off-origin charges | Over-generalizing the centered-charge formula | Replace \(r\) by the actual distance to the source point before integrating. |

## 7. The textbook-precise statement
In any electrostatic field the electric potential is the scalar function satisfying  
\[
\mathbf{E}=-\nabla V,\qquad V(\mathbf{r})=-\int_{\infty}^{\mathbf{r}}\mathbf{E}\cdot d\mathbf{l},
\]  
where the path may be any curve from infinity to \(\mathbf{r}\). For a point charge \(q\) located at the origin this yields the explicit Coulomb potential  
\[
V(r)=\frac{1}{4\pi\epsilon_0}\frac{q}{r}\quad(r>0).
\]  
(Griffiths, *Introduction to Electrodynamics*, 4e, §2.3.2 and Eq. 2.22.)

## 8. Visual — diagram or schematic
```text
          z
          |
          |   Equipotential spheres
          |     V=const
   E ---->|     .------.
          |    /        \
          |   |   +q      |
          |    \        /
          |     '------'
          |
         infinity (V=0)
```
Field lines radiate outward; concentric spheres are surfaces of constant \(V\). Spacing between spheres increases as \(1/r^2\) so that \(|\nabla V|\) recovers the correct \(1/r^2\) field strength.

## 9. The memory technique

1. **The hook** — Picture a single point charge as a “potential well” whose depth is marked on a ruler stretching to infinity; the electric field is the local slope of that ruler.
2. **What to overlearn** — \(V=\frac{kq}{r}\), \(\mathbf{E}=-\nabla V\), and the fact that the zero is at infinity.
3. **Spaced-repetition schedule** — Review the three relations at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-integrate \(\mathbf{E}\) from infinity along any radial line; the algebra again produces \(\frac{kq}{r}\).

## 10. What this unlocks
Mastery of the point-charge potential and its gradient relation is the gateway to Laplace’s and Poisson’s equations, multipole expansions, method of images, and the electrostatic modeling of plasma sheaths around rockets.  

- Next: boundary-value problems in conductors  
- Next: energy stored in an electrostatic field  
- Next: motion of charged particles in slowly varying potentials (ion optics)

## 11. Self-check — five questions, no answers
1. A point charge \(q\) sits at the origin. Compute \(V\) at \((3,4,0)\) m and verify that \(-\nabla V\) returns the correct vector \(\mathbf{E}\).  
2. The potential in a region is given by \(V=Ax^2+By^2\). Is the field conservative? What is \(\mathbf{E}\)?  
3. Two equal charges of opposite sign are placed 2 cm apart. At what distance along the axis does the potential fall to 1 % of its value at 1 cm from the midpoint?  
4. An electron moves from \(V=0\) to \(V=-10\) V. By how much does its kinetic energy change?  
5. A student calculates the line integral of \(\mathbf{E}\) along two different paths between the same endpoints and obtains different values of \(V\). Which single property of \(\mathbf{E}\) has been violated?