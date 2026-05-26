## 1. The one-sentence answer
**Potential flow is the exact description of steady or unsteady incompressible flow that is both inviscid and irrotational, obtained by introducing a scalar velocity potential whose Laplacian vanishes, so that any linear combination of known solutions is again a solution.**

An inviscid fluid experiences no shear stress; its momentum balance therefore reduces to Euler’s equation. When the flow is also irrotational, the velocity vector is the gradient of a scalar. Substituting this representation into the continuity equation for an incompressible fluid immediately produces Laplace’s equation. Because Laplace’s equation is linear and homogeneous, any sum of solutions is itself a solution; this algebraic fact is the mathematical basis for building complicated geometries from a handful of elementary singularities.

The same linearity supplies the practical power of the theory: once the elementary solutions (uniform stream, source, vortex, doublet) are known, they may be superposed without solving a new boundary-value problem from scratch.

> [!NOTE]
> The entire theory collapses the moment vorticity appears or density varies; the velocity potential then ceases to exist and superposition is lost.

## 2. Why this matters — concrete and current
NASA’s X-59 low-boom demonstrator uses potential-flow panel codes in the preliminary design loop to shape the fuselage so that the near-field pressure signature remains weak; only after the potential-flow shape is frozen are viscous CFD and wind-tunnel tests performed.  

SpaceX employs linearized potential-flow models of the Falcon 9 interstage flow during re-entry to estimate aerodynamic torque on the grid fins at Mach numbers where the boundary layer is still thin; these rapid calculations set the fin actuator sizing before full Navier–Stokes runs are budgeted.  

Semiconductor manufacturers rely on potential-flow solutions inside vacuum chambers to predict the trajectories of molecular beams used for atomic-layer deposition; because the mean free path is large, the flow is effectively inviscid and irrotational.  

Ocean-wave energy converters such as the CorPower buoy apply potential-flow theory to compute hydrodynamic coefficients that enter the real-time control algorithm; the same coefficients are later corrected by viscous damping terms obtained from experiments.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Gradient and curl        | Defines irrotationality and the existence of φ            |
| Divergence theorem       | Converts integral mass conservation into Laplace’s equation |
| Linearity of differential operators | Justifies superposition of solutions                   |
| Elementary vector calculus identities | Needed to manipulate ∇×(∇φ) = 0 and ∇·(∇φ) = ∇²φ     |

## 4. Building the idea — from intuition to formalism

### Step 1 — Remove viscosity
An inviscid fluid cannot sustain tangential stress, so the Cauchy stress tensor reduces to an isotropic pressure. Newton’s second law applied to a fluid particle then yields Euler’s equation  
$$
\frac{D\mathbf{v}}{Dt}=-\frac{1}{\rho}\nabla p+\mathbf{g}.
$$

### Step 2 — Impose irrotationality
If the vorticity \(\boldsymbol{\omega}=\nabla\times\mathbf{v}\) is identically zero everywhere, a scalar function \(\phi\) exists such that  
$$
\mathbf{v}=\nabla\phi.
$$
Existence follows at once from the vector identity \(\nabla\times(\nabla\phi)=0\).

### Step 3 — Enforce incompressibility
Mass conservation for constant density requires \(\nabla\cdot\mathbf{v}=0\). Substituting the potential representation produces Laplace’s equation  
$$
\nabla^2\phi=0.
$$

### Step 4 — Write the dynamic boundary condition
Bernoulli’s integral along a streamline (or everywhere, because the flow is irrotational) supplies the unsteady pressure–velocity relation  
$$
\frac{\partial\phi}{\partial t}+\frac{1}{2}|\nabla\phi|^2+\frac{p}{\rho}=F(t).
$$

### Step 5 — State the kinematic boundary condition
On a solid surface the normal velocity of the fluid must equal the normal velocity of the surface,  
$$
\frac{\partial\phi}{\partial n}=\mathbf{V}_b\cdot\mathbf{n}.
$$

### Step 6 — Invoke linearity
Laplace’s equation is linear and homogeneous; therefore if \(\phi_1\) and \(\phi_2\) are solutions, so is \(c_1\phi_1+c_2\phi_2\). This algebraic closure permits the systematic construction of flows by superposition.

### Step 7 — Catalogue elementary solutions
The fundamental solutions in two dimensions are the uniform stream \(\phi=Ux\), the source \(\phi=(m/2\pi)\ln r\), the vortex \(\phi=(\Gamma/2\pi)\theta\), and the doublet obtained as the limit of a source–sink pair.

## 5. Worked examples — every step shown

**Example 1 — Uniform stream**  
*Given:* Far-field velocity \(U\) in the \(x\)-direction.  
*Find:* \(\phi\).  
Step: \(\mathbf{v}=U\mathbf{i}\) implies \(\partial\phi/\partial x=U\).  
*Why:* Direct integration of the definition \(\mathbf{v}=\nabla\phi\).  
Step: Integrate to obtain \(\phi=Ux+f(y)\).  
*Why:* The arbitrary function of \(y\) must vanish to keep \(v_y=0\).  
**Final answer**  
$$\phi=Ux$$

**Example 2 — Two-dimensional source**  
*Given:* Volume flux \(m\) emitted at the origin.  
*Find:* \(\phi(r)\).  
Step: By symmetry \(\phi=\phi(r)\).  
*Why:* Rotational invariance.  
Step: Radial velocity \(v_r=m/(2\pi r)=\partial\phi/\partial r\).  
*Why:* Integral mass balance over a circle.  
Step: Integrate to obtain \(\phi=(m/2\pi)\ln r+C\).  
*Why:* Elementary antiderivative.  
**Final answer**  
$$\phi=\frac{m}{2\pi}\ln r$$

**Example 3 — Superposition: source in uniform stream**  
*Given:* Uniform stream \(U\) plus source of strength \(m\) at the origin.  
*Find:* Stagnation points.  
Step: Form \(\phi=Ux+(m/2\pi)\ln r\).  
*Why:* Linearity.  
Step: Set \(\nabla\phi=0\) and solve \(U+m/(2\pi r)=0\).  
*Why:* Both velocity components must vanish simultaneously.  
**Final answer**  
Stagnation point at \(x=-m/(2\pi U)\), \(y=0\).

**Example 4 — Flow past a circular cylinder**  
*Given:* Uniform stream \(U\) plus doublet of strength \(\mu=UR^2\).  
*Find:* Surface pressure coefficient.  
Step: Write \(\phi=U(r+R^2/r)\cos\theta\).  
*Why:* Superposition of uniform flow and doublet.  
Step: Evaluate \(v_\theta=-2U\sin\theta\) on \(r=R\).  
*Why:* Tangency condition already satisfied.  
Step: Insert into unsteady Bernoulli equation (steady case) and nondimensionalize.  
*Why:* Recover \(C_p=1-4\sin^2\theta\).  
**Final answer**  
$$C_p=1-4\sin^2\theta$$  
*Reflection:* The same doublet strength that cancels the normal velocity on the cylinder also produces the famous fore-aft symmetry of d’Alembert’s paradox.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating \(\phi\) as defined up to an arbitrary constant everywhere | Forgetting that only gradients appear in the physics | Fix \(\phi\) at one point or accept that only differences matter |
| Applying superposition when weak shocks are present | Linearity fails once entropy jumps | Verify that Mach number remains subsonic throughout |
| Confusing stream function \(\psi\) with velocity potential \(\phi\) | Both satisfy Laplace’s equation in 2-D | Remember \(\mathbf{v}=\nabla\phi\) versus \(\mathbf{v}=\nabla\times(\psi\mathbf{k})\) |
| Neglecting the unsteady term in Bernoulli’s integral | Assuming steady flow by default | Retain \(\partial\phi/\partial t\) whenever bodies move or boundaries change with time |
| Placing a vortex on a solid surface without image | Image system required to keep surface a streamline | Always construct the appropriate image vortex or doublet |
| Using 2-D source strength \(m\) in 3-D axisymmetric problems | Dimensional mismatch | Switch to Stokes stream function or 3-D source \(m/4\pi r\) |
| Assuming irrotationality persists after separation | Real flows generate vorticity at walls | Limit potential-flow predictions to attached-flow regimes |

## 7. The textbook-precise statement
Let \(\Omega\subset\mathbb{R}^n\) (\(n=2\) or \(3\)) be a bounded domain occupied by an incompressible fluid of constant density. Suppose the velocity field satisfies \(\nabla\cdot\mathbf{v}=0\) and \(\nabla\times\mathbf{v}=\mathbf{0}\) throughout \(\Omega\). Then there exists a scalar \(\phi\in C^2(\Omega)\) such that \(\mathbf{v}=\nabla\phi\) and  
$$
\nabla^2\phi=0\quad\text{in }\Omega,
$$  
subject to the Neumann boundary condition \(\partial\phi/\partial n=g\) on \(\partial\Omega\) (compatibility \(\int_{\partial\Omega}g\,dS=0\) required). Any linear combination of solutions is again a solution (Batchelor, *An Introduction to Fluid Dynamics*, Cambridge University Press, 1967, §2.7).

## 8. Visual — diagram or schematic
```text
          y
          ^
          |
     v    |      source m
     ^    |       •
     |    |      / \
----------+----/---\--------> x
     U    |   /     \
          |  /       \
          | /  streamlines around cylinder
          |/_____________>
```
Uniform flow from left, source at origin, and the resulting dividing streamline that can be replaced by a solid cylinder when a doublet is used instead.

## 9. The memory technique

1. **The hook** — Laplace’s equation is the same equation that governs electrostatic potential in charge-free regions; every source or doublet in flow has an exact electrostatic analogue.  
2. **What to overlearn** — \(\mathbf{v}=\nabla\phi\), \(\nabla^2\phi=0\), and the four elementary 2-D solutions with their exact coefficients.  
3. **Spaced-repetition schedule** — Review the definition of \(\phi\) at 1 day, the four elementary solutions at 3 days, the cylinder pressure distribution at 7 days, and the full set of image systems at 16 and 35 days.  
4. **First-principles fallback** — Start from Euler’s equation, take the curl to obtain the vorticity transport equation, set vorticity to zero, introduce \(\phi\), and recover Laplace’s equation.

## 10. What this unlocks
Potential flow supplies the outer inviscid solution that is matched to thin boundary layers in high-Reynolds-number aerodynamics and provides the reference state for linearized compressible corrections (Prandtl–Glauert, Göthert rules).  

- Kutta–Joukowski lift theorem  
- Thin-airfoil theory  
- Panel methods (Hess–Smith, vortex-lattice)  
- Unsteady added-mass coefficients  
- Free-surface gravity-wave problems (linearized)

## 11. Self-check — five questions, no answers
1. Show that the radial velocity of a 2-D source satisfies both Laplace’s equation and global mass conservation.  
2. Two equal sources are placed at \((±a,0)\). Locate the stagnation point on the x-axis and compute the pressure there relative to the pressure at infinity.  
3. A vortex of strength \(\Gamma\) is placed a distance \(h\) above an infinite flat wall. Write the complex potential that satisfies the wall boundary condition.  
4. Explain why d’Alembert’s paradox appears mathematically inevitable once the flow is assumed irrotational and the body is closed.  
5. A circular cylinder of radius \(R\) moves at constant speed \(U\) through still fluid. Construct the velocity potential in the cylinder-fixed frame and transform it back to the lab frame; verify that the added mass per unit length equals \(\pi\rho R^2\).