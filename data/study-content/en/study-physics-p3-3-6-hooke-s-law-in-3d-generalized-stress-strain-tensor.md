## 1. The one-sentence answer
**Hooke's law in three dimensions states that each component of the stress tensor is a linear combination of all six independent strain-tensor components through a fourth-rank stiffness tensor.**

In one dimension a spring stretches in proportion to the force applied. In three dimensions every face of a material element experiences normal and shear stresses that simultaneously stretch, compress, and distort the element along all three axes and all three planes. The single scalar stiffness E therefore expands into a 3-by-3-by-3-by-3 array of 81 elastic constants (reduced by symmetry to at most 21 independent values) that map the six independent strain components onto the six independent stress components.

The mapping is expressed in tensor notation as  
\[
\sigma_{ij}=C_{ijkl}\varepsilon_{kl}
\]  
where repeated indices imply summation and both \(\sigma_{ij}\) and \(\varepsilon_{kl}\) are symmetric second-rank tensors. For the special but common case of isotropic linear elasticity the 81 constants collapse to two independent scalars, Young's modulus and Poisson's ratio, or equivalently the Lamé constants \(\lambda\) and \(\mu\).

> [!NOTE]
> The fourth-rank tensor \(C_{ijkl}\) is not an arbitrary 81-entry table; crystal symmetry, angular-momentum conservation, and thermodynamic considerations reduce it to at most 21 numbers, and isotropy reduces it to exactly two.

## 2. Why this matters — concrete and current
NASA’s Artemis Orion spacecraft uses isotropic Hooke’s-law relations inside finite-element models of its heat-shield attachment ring to predict thermal-stress concentrations during re-entry; the same models feed directly into fracture-mechanics margins required for crew-certification.

SpaceX’s Starship stainless-steel tanks are sized with the generalized plane-stress form of the isotropic compliance matrix so that weld-induced residual strains remain below the material’s yield surface at cryogenic temperatures; the same matrix appears in every structural-margin review delivered to the FAA.

The James Webb Space Telescope’s beryllium mirror segments were figured and mounted using anisotropic stiffness tensors measured on actual flight coupons; the 21-constant compliance matrix for each hexagonal segment determined the actuator authority needed to maintain 10 nm rms figure under 1-g release and on-orbit thermal gradients.

Semiconductor foundries now embed the same 3-D Hooke’s law inside multi-physics simulations of through-silicon vias; copper-pillar stress fields calculated from the anisotropic stiffness tensor of silicon determine electromigration lifetime and are part of every TSMC N3 process-design-kit release.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| Cauchy stress tensor \(\sigma_{ij}\) | Defines the nine (six independent) traction components acting on any infinitesimal cube. |
| Infinitesimal strain tensor \(\varepsilon_{ij}\) | Supplies the six independent deformation measures that enter the linear constitutive map. |
| Tensor transformation rules    | Required to rotate \(C_{ijkl}\) between material and global coordinate frames.       |
| Symmetry of stress and strain  | Reduces the number of independent components from 9 to 6 before any material symmetry is invoked. |

## 4. Building the idea — from intuition to formalism

### Step 1 — From scalar spring to vector force and displacement
A uniaxial spring obeys \(F=k\Delta L\). When the same material is cut into a cube, force becomes traction on each face and displacement becomes a vector field; the single constant \(k\) must therefore become a matrix that couples all three force components to all three displacement components.

Consider a 1 mm cube of aluminum pulled by 1 N along \(x\). The observed extension is 0.0007 mm; the same cube sheared by 1 N on the \(xy\) faces produces a 0.002 mm lateral offset. These two numbers already show that normal and shear responses differ, so at least two independent constants are required.

The formal statement begins with the most general linear map between two symmetric second-rank tensors:
\[
\sigma_{ij}=C_{ijkl}\varepsilon_{kl}.
\]

> [!WARNING]
> Treating stress and strain as vectors instead of tensors hides the fact that shear stress on one plane contributes to normal strain on perpendicular planes; the resulting matrix will be dimensionally inconsistent.

### Step 2 — Symmetry of stress and strain reduces indices
Both \(\sigma_{ij}\) and \(\varepsilon_{kl}\) are symmetric, so only six independent values exist on each side. The fourth-rank tensor therefore contracts to a 6-by-6 matrix relating the Voigt vectors \(\{\sigma_{11},\sigma_{22},\sigma_{33},\sigma_{23},\sigma_{13},\sigma_{12}\}\) and \(\{\varepsilon_{11},\varepsilon_{22},\varepsilon_{33},2\varepsilon_{23},2\varepsilon_{13},2\varepsilon_{12}\}\).

### Step 3 — Thermodynamic symmetry of the stiffness tensor
The existence of an elastic strain-energy density \(U=\frac12\sigma_{ij}\varepsilon_{ij}\) that is a state function forces \(C_{ijkl}=C_{klij}\). This major symmetry halves the number of independent entries from 36 to 21.

### Step 4 — Coordinate-frame invariance for isotropic solids
If the material response is identical in every direction, \(C_{ijkl}\) must be an isotropic fourth-rank tensor. The only two linearly independent isotropic fourth-rank tensors are \(\delta_{ij}\delta_{kl}\) and \(\delta_{ik}\delta_{jl}+\delta_{il}\delta_{jk}\). Hence
\[
C_{ijkl}=\lambda\delta_{ij}\delta_{kl}+\mu(\delta_{ik}\delta_{jl}+\delta_{il}\delta_{jk}).
\]

### Step 5 — Recovery of the familiar engineering constants
Substituting the isotropic form into the tensor equation and solving for the normal-stress/strain ratio under uniaxial tension recovers
\[
E=\frac{\mu(3\lambda+2\mu)}{\lambda+\mu},\qquad\nu=\frac{\lambda}{2(\lambda+\mu)}.
\]
The textbook statement of 3-D Hooke’s law for isotropic linear elasticity is therefore
\[
\varepsilon_{ij}=\frac{1+\nu}{E}\sigma_{ij}-\frac{\nu}{E}\delta_{ij}\sigma_{kk}.
\]

## 5. Worked examples — every step shown

**Example 1 — Uniaxial tension**
*Given:* A slender bar of isotropic aluminum (\(E=70\) GPa, \(\nu=0.33\)) carries axial stress \(\sigma_{11}=100\) MPa; all other stress components zero.  
*Find:* All six strain components.  

Why: Only \(\sigma_{11}\) is nonzero, so the trace \(\sigma_{kk}=100\) MPa.  
\[
\varepsilon_{11}=\frac{1+\nu}{E}(100)-\frac{\nu}{E}(100)=\frac{100}{E}.
\]
Why: Lateral directions experience only the Poisson term.  
\[
\varepsilon_{22}=\varepsilon_{33}=-\frac{\nu}{E}(100).
\]
Why: All shear stresses vanish, therefore all shear strains vanish.  
\[
\varepsilon_{23}=\varepsilon_{13}=\varepsilon_{12}=0.
\]
**Final answer**  
\[
\varepsilon_{11}=1.429\times10^{-3},\quad\varepsilon_{22}=\varepsilon_{33}=-4.714\times10^{-4},\quad\text{shear strains}=0.
\]

*Reflection:* The example isolates the Poisson effect; any sign error in the trace term immediately produces the wrong lateral contraction.

**Example 2 — Pure shear**
*Given:* \(\sigma_{12}=50\) MPa, all other stresses zero; same material.  
*Find:* Strains.  

Why: Trace is zero, normal strains therefore zero.  
\[
\varepsilon_{11}=\varepsilon_{22}=\varepsilon_{33}=0.
\]
Why: Engineering shear strain \(\gamma_{12}=2\varepsilon_{12}=(1+\nu)E^{-1}\sigma_{12}\).  
\[
\varepsilon_{12}=\frac{1+\nu}{E}\times50=9.524\times10^{-4}.
\]
**Final answer**  
Normal strains zero; \(\varepsilon_{12}=\varepsilon_{21}=9.524\times10^{-4}\).

*Reflection:* The factor of 2 between tensor shear strain and engineering shear strain is the most common source of numerical error.

**Example 3 — Plane strain in a pressure vessel wall**
*Given:* \(\sigma_{11}=\sigma_{22}=200\) MPa, \(\sigma_{33}=0\) (thin-wall approximation), same material.  
*Find:* \(\varepsilon_{33}\).  

Why: Use the isotropic compliance directly.  
\[
\varepsilon_{33}=-\frac{\nu}{E}(\sigma_{11}+\sigma_{22})=-\frac{2\nu}{E}200.
\]
**Final answer**  
\(\varepsilon_{33}=-1.886\times10^{-3}\).

*Reflection:* Plane-stress versus plane-strain boundary conditions change only which stress or strain component is set to zero; the same two-constant matrix applies.

**Example 4 — Hydrostatic pressure on an anisotropic crystal**
*Given:* Cubic crystal with three independent constants \(C_{11}\), \(C_{12}\), \(C_{44}\); hydrostatic pressure \(p=100\) MPa so \(\sigma_{ij}=-p\delta_{ij}\).  
*Find:* Volumetric strain.  

Why: Cubic symmetry still allows an isotropic volumetric response.  
\[
\varepsilon_{kk}=-\frac{3p}{C_{11}+2C_{12}}.
\]
**Final answer**  
Volumetric strain \(\Delta V/V=-3p/(C_{11}+2C_{12})\).

*Reflection:* Even anisotropic crystals can exhibit isotropic bulk modulus; the full 6-by-6 matrix is needed only when deviatoric strains appear.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using the 3-by-3 stiffness matrix for a 3-D stress state | Students remember only the 2-D plane-stress reduction. | Always count independent components: 6 stresses require the full 6-by-6 matrix. |
| Forgetting the factor of 2 on tensor shear strains | Engineering literature writes \(\gamma_{xy}\) while tensors use \(\varepsilon_{xy}\). | Convert every shear term explicitly before substituting into \(C_{ijkl}\). |
| Rotating the stiffness tensor with a stress transformation matrix | \(C_{ijkl}\) transforms as a fourth-rank tensor, not a second-rank tensor. | Use the explicit 6-by-6 Bond transformation or the fourth-rank rotation formula. |
| Assuming isotropy for composites or single-crystal superalloys | Turbine blades and carbon-fiber layups are strongly anisotropic. | Measure or look up the correct symmetry class before choosing the number of independent constants. |
| Neglecting temperature dependence of \(C_{ijkl}\) | Elastic moduli drop 10–20 % between 20 °C and 800 °C in aerospace alloys. | Insert temperature-dependent tables or polynomial fits when thermal gradients exceed 100 °C. |
| Sign error on Poisson’s ratio term under multiaxial load | The trace term \(\sigma_{kk}\) is easy to mis-sign. | Write the compliance form with an explicit minus sign and verify against a known hydrostatic case. |
| Treating the stiffness matrix as invertible without checking positive-definiteness | Thermodynamic stability requires all eigenvalues of \(C\) positive. | Compute the six eigenvalues after any coordinate rotation; discard data that produce negative eigenvalues. |

## 7. The textbook-precise statement
For a linearly elastic solid the most general relationship between the Cauchy stress tensor and the infinitesimal strain tensor is
\[
\sigma_{ij}=C_{ijkl}\varepsilon_{kl},
\]
where \(C_{ijkl}\) is a fourth-rank tensor possessing the symmetries
\[
C_{ijkl}=C_{jikl}=C_{ijlk}=C_{klij}
\]
and, for hyperelastic materials, the major symmetry above guarantees the existence of a quadratic strain-energy density. When the material is isotropic the tensor reduces to the two Lamé constants given in Step 4. (See Malvern, *Introduction to the Mechanics of a Continuous Medium*, 1969, §6.4.)

## 8. Visual — diagram or schematic
```text
          σ22
           ↑
           │
   σ12 →───┼───→ σ11
           │
          σ33 (out of page)
```
A unit cube with three pairs of face tractions. Normal stresses act perpendicular to each face; shear stresses act tangentially. The six independent stress components label the three normal arrows and three independent shear couples. Strain components are defined analogously on the deformed cube edges and angles.

## 9. The memory technique

**The hook**  
Picture a tiny cube of spacecraft skin squeezed between thumb and forefinger while being twisted like a Rubik’s face; each pair of opposing forces corresponds to one row of the 6-by-6 stiffness matrix.

**What to overlearn**  
1. \(\sigma_{ij}=C_{ijkl}\varepsilon_{kl}\) (tensor form).  
2. Isotropic reduction to \(\lambda,\mu\) or \(E,\nu\).  
3. The 6-by-6 Voigt ordering and the factor-of-2 convention on shear strains.

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days; each session recompute the uniaxial and hydrostatic special cases from the general tensor equation.

**First-principles fallback**  
Start from the quadratic strain-energy density \(U=\frac12 C_{ijkl}\varepsilon_{ij}\varepsilon_{kl}\), differentiate with respect to strain, and recover the stiffness tensor; the major symmetry appears automatically.

## 10. What this unlocks
The 3-D Hooke’s law supplies the constitutive core of every linear finite-element structural solver used in spacecraft design. It is the direct prerequisite for the following topics:

- Yield criteria (von Mises, Tresca) that decide when linearity ends.  
- Thermoelastic coupling that adds an isotropic expansion term \(\alpha\Delta T\delta_{ij}\).  
- Modal analysis of launch-vehicle tanks and fairings.  
- Buckling of cylindrical shells under combined pressure and axial load.  
- Fatigue-life prediction under multiaxial residual-stress fields.

## 11. Self-check — five questions, no answers
1. Write the 6-by-6 stiffness matrix for an isotropic solid in terms of \(E\) and \(\nu\); verify that it is symmetric.  
2. A hydrostatic pressure \(p\) is applied to a cube of cubic crystal. Show that the resulting strain state is purely volumetric even though the material is anisotropic.  
3. Rotate the stiffness tensor of a unidirectional composite 30° about the fiber axis; compute the new \(C_{16}\) term.  
4. Identify the single entry in the compliance matrix that would be miscalculated if the tensor shear strain convention were ignored.  
5. Derive the effective Young’s modulus measured along an arbitrary direction in a transversely isotropic solid; state the two angles that leave the modulus unchanged.