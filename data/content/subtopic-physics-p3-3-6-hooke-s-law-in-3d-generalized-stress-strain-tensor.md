## What it is
Generalized Hooke's Law expands the 1D spring equation ($F=kx$) to a 3D continuous material. It is a tensor equation that mathematically links the 3D forces acting on a point (the stress tensor, $\sigma_{ij}$) to how that point deforms in 3D space (the strain tensor, $\epsilon_{kl}$) using a 4th-order stiffness tensor ($C_{ijkl}$). 

## Why it matters
Rocket fuselages and pressure vessels do not just stretch in one direction; they bulge, twist, and compress simultaneously under internal pressure, thermal gradients, and thrust loads. Understanding 3D stress-strain is mandatory to calculate margins of safety, predict multi-axial fatigue, and optimize structural weight for aerospace vehicles without risking explosive decompression.

## When to study it
You must already understand:
1. 1D Hooke's Law ($\sigma = E\epsilon$).
2. The definition of Poisson's ratio ($\nu$).
3. Linear algebra (matrix multiplication, symmetric matrices).
4. The physical definitions of normal stress ($\sigma$) and shear stress ($\tau$).
If you do not know what a 2nd-order tensor is or cannot draw a 2D stress element, stop and review basic solid mechanics first.

## How to study it (step by step)
1. **Define the Tensors:** Review the 3D stress tensor ($\sigma_{ij}$) and strain tensor ($\epsilon_{ij}$). Acknowledge why they are symmetric ($3 \times 3$ matrices with 6 independent components each, due to rotational equilibrium).
2. **Write the General Equation:** Write $\sigma_{ij} = C_{ijkl} \epsilon_{kl}$. Recognize that $C$ has $3^4 = 81$ components. 
3. **Trace the Symmetries:** Understand how the 81 components reduce. Minor symmetries (stress/strain symmetry) reduce it to 36. Major symmetry (conservation of strain energy) reduces it to 21. Assuming an *isotropic* material (same properties in all directions) reduces it to exactly 2 independent constants: Young's modulus ($E$) and Poisson's ratio ($\nu$).
4. **Learn Voigt Notation:** Map the $3 \times 3$ symmetric tensors to $6 \times 1$ column vectors. This allows you to write the 4th-order tensor relationship as a standard $6 \times 6$ matrix equation.
5. **Derive the Compliance Matrix:** Derive the inverse of the stiffness matrix (the compliance matrix) from first principles using the linear superposition of 1D stresses and Poisson effects.

## Key ideas, with intuition

**The Tensor Relationship**
In its most formal state, generalized Hooke's law is:
$$ \sigma_{ij} = \sum_{k=1}^{3} \sum_{l=1}^{3} C_{ijkl} \epsilon_{kl} $$
Because dealing with 4th-order tensors is computationally heavy, we use the isotropic assumption and linear superposition to simplify it into a set of highly intuitive equations.

**Superposition and the Poisson Effect**
Imagine a 3D cube of material. If you pull it in the $x$-direction with stress $\sigma_{xx}$, it elongates in $x$. By 1D Hooke's law, $\epsilon_{xx} = \sigma_{xx}/E$. 
However, due to conservation of volume, the material pinches inward in the $y$ and $z$ directions. This lateral pinch is dictated by Poisson's ratio ($\nu$): $\epsilon_{yy} = \epsilon_{zz} = -\nu \frac{\sigma_{xx}}{E}$.

In a 3D stress state, the total strain in *any* direction is simply the sum of the direct stretch and the lateral contractions caused by the other two orthogonal stresses. 

**The Isotropic Equations**
By superimposing these effects, the normal strains are:
$$ \epsilon_{xx} = \frac{1}{E} \left[ \sigma_{xx} - \nu(\sigma_{yy} + \sigma_{zz}) \right] $$
$$ \epsilon_{yy} = \frac{1}{E} \left[ \sigma_{yy} - \nu(\sigma_{xx} + \sigma_{zz}) \right] $$
$$ \epsilon_{zz} = \frac{1}{E} \left[ \sigma_{zz} - \nu(\sigma_{xx} + \sigma_{yy}) \right] $$

Shear stresses operate independently of normal stresses in an isotropic material. They only cause shear strains:
$$ \gamma_{xy} = \frac{1}{G} \tau_{xy}, \quad \gamma_{yz} = \frac{1}{G} \tau_{yz}, \quad \gamma_{zx} = \frac{1}{G} \tau_{zx} $$
Where $G$ is the shear modulus, fundamentally linked to $E$ and $\nu$ by: $G = \frac{E}{2(1+\nu)}$.

## Worked example
**Problem:** A cubic satellite component made of isotropic aluminum ($E$, $\nu$) is subjected to a biaxial stress state from a pressure bulkhead: $\sigma_{xx} = P$, $\sigma_{yy} = 2P$, and $\sigma_{zz} = 0$. Find the volumetric strain (dilatation) $\epsilon_V = \epsilon_{xx} + \epsilon_{yy} + \epsilon_{zz}$.

**Step 1: Calculate individual strains using Generalized Hooke's Law.**
$$ \epsilon_{xx} = \frac{1}{E}[P - \nu(2P + 0)] = \frac{P}{E}(1 - 2\nu) $$
$$ \epsilon_{yy} = \frac{1}{E}[2P - \nu(P + 0)] = \frac{P}{E}(2 - \nu) $$
$$ \epsilon_{zz} = \frac{1}{E}[0 - \nu(P + 2P)] = -\frac{3P\nu}{E} $$
*Note: Even though $\sigma_{zz} = 0$, $\epsilon_{zz}$ is not zero. The material thins out in the z-direction because it is being stretched in x and y.*

**Step 2: Sum the strains to find volumetric strain.**
$$ \epsilon_V = \frac{P}{E} [ (1 - 2\nu) + (2 - \nu) - 3\nu ] $$
$$ \epsilon_V = \frac{P}{E} [ 3 - 6\nu ] = \frac{3P}{E}(1 - 2\nu) $$

*Reflection:* Look at the term $(1 - 2\nu)$. If $\nu = 0.5$ (an incompressible material like rubber), the volumetric strain evaluates to strictly zero. The linear superposition perfectly captures the physical reality of incompressibility.

## Diagrams

```text
       y
       ^
       |  sigma_yy
       |   ^
       |   |
       +---+---+
      /   /|   |
     +---+ |   | ---> sigma_xx
     |   | +---+
     |   |/   / 
     +---+---+  
    /   
  z/ sigma_zz

* Normal stresses (\sigma) pull perpendicular to the faces.
* Shear stresses (\tau) slide parallel to the faces (omitted for clarity).
* Pulling on the x-face (sigma_xx) causes the y and z faces to contract inward.
```

## Memory technique — remember this forever
1. **The Hook:** "Direct pull minus the Poisson squeeze." To find the strain on any axis, take the stress on *that* axis, and subtract $\nu$ times the sum of the *other two* axes.
2. **Formulas to overlearn:**
   $$ \epsilon_{xx} = \frac{1}{E} [\sigma_{xx} - \nu(\sigma_{yy} + \sigma_{zz})] $$
   $$ G = \frac{E}{2(1+\nu)} $$
3. **Spaced-repetition schedule:** Review this derivation and the equations at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the formula, imagine three separate lab experiments. Exp 1: Pull in $x$ (adds $\sigma_{xx}/E$). Exp 2: Pull in $y$ (subtracts $\nu \sigma_{yy}/E$ in the $x$ direction). Exp 3: Pull in $z$ (subtracts $\nu \sigma_{zz}/E$ in the $x$ direction). Add them up.

## Common mistakes
1. **Zero stress $\neq$ zero strain.** Students frequently assume that if a surface is stress-free (like the outside of a pressure vessel where $\sigma_{zz}=0$), the strain is also zero. The Poisson effect proves otherwise.
2. **Confusing tensor shear strain with engineering shear strain.** The tensor shear strain is $\epsilon_{xy}$. The engineering shear strain is $\gamma_{xy}$. They are related by $\gamma_{xy} = 2\epsilon_{xy}$. The standard compliance matrix equations use $\gamma$.
3. **Applying isotropic rules to composites.** Carbon fiber reinforced polymers (CFRPs) are orthotropic. They require 9 independent stiffness constants. The simple $E$ and $\nu$ equations above will cause catastrophic failure if applied to a composite layup.

## Self-check
1. Write the expression for the strain $\epsilon_{yy}$ for a submarine hull material under pure hydrostatic pressure ($\sigma_{xx}=\sigma_{yy}=\sigma_{zz}=-p$).
2. Using the isotropic equations, mathematically prove that if there are no shear stresses ($\tau_{xy}=\tau_{yz}=\tau_{zx}=0$), there can be no shear strains. What does this imply about the principal axes of stress and strain?
3. The bulk modulus $K$ relates hydrostatic pressure to volumetric strain via $p = -K \epsilon_V$. Derive $K$ entirely in terms of $E$ and $\nu$ using generalized Hooke's law.