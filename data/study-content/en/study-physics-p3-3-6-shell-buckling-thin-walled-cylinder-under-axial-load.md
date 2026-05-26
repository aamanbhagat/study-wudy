## 1. The one-sentence answer
**A thin-walled cylinder under axial compression fails by sudden elastic buckling at a critical stress far below the material yield strength, governed by the interaction of membrane stiffness and bending resistance of the curved shell.**

The cylinder wall carries the compressive load as a uniform membrane stress until a critical load is reached. At that instant a small perturbation grows exponentially because the shell can shorten its generators by deflecting radially outward or inward, releasing stored membrane energy faster than the bending energy required to form the buckle increases. The result is an abrupt collapse into a pattern of diamond-shaped dimples.

This behavior is unique to shells: flat plates under the same compression buckle at stresses set only by bending stiffness, while the curvature of the cylinder couples membrane and bending actions, producing a much higher but imperfection-sensitive critical load.

> [!NOTE]
> The classical critical stress depends only on the ratio t/R and material constants; it is independent of length for long cylinders because the buckle wavelength is set locally by the balance between stretching and bending.

## 2. Why this matters — concrete and current
SpaceX’s Starship uses thin 304L stainless-steel tanks (t/R ≈ 0.002) that must survive axial compressive loads during re-entry and landing; buckling margins dictate both wall thickness and the placement of stringers. NASA’s SLS core stage incorporates similar design allowables derived from the same cylinder buckling equations, adjusted by empirical knockdown factors obtained from full-scale tests reported in NASA TP-2019-220xxx. In reusable launch vehicles the mass penalty of extra wall thickness directly reduces payload; hence every kilogram saved rests on accurate prediction of this buckling limit. Modern filament-wound composite cylinders on satellites and upper stages exhibit analogous behavior, but with orthotropic stiffness matrices replacing the isotropic E and ν.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Plane-stress Hooke’s law | Converts strains to stresses inside the shell wall before buckling. |
| Bending stiffness D = Et³/12(1-ν²) | Supplies the restoring moment that resists out-of-plane deflection. |
| Membrane strain in polar coordinates | Shows how radial displacement w produces circumferential stretching that stores energy. |
| Rayleigh–Ritz energy method | Provides the variational route to the critical load without solving the full differential equation. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Membrane compression stores energy linearly
A uniform axial compressive stress σ produces membrane strain energy that grows with the square of the applied load. For a cylinder of radius R, thickness t and length L the stored membrane energy is (π R t L σ²)/(2E).

### Step 2 — Curvature couples radial displacement to hoop strain
Any small radial deflection w immediately stretches or compresses the circumference because the new radius is R + w. The resulting hoop strain ε_θ = w/R couples membrane energy to bending.

### Step 3 — Bending energy resists short-wavelength deflections
Forming a buckle of axial half-wave length λ costs bending energy proportional to D (π/λ)⁴ times the squared amplitude. Very short waves are therefore expensive; very long waves cost little bending energy but allow large membrane stretching.

### Step 4 — Total potential energy is minimized at the critical load
The sum of membrane and bending energies minus the work done by the applied axial load must be stationary. Setting the second variation to zero yields the eigenvalue problem whose lowest root is the critical stress.

### Step 5 — Stationarity produces the classical formula
Minimizing with respect to wave numbers gives the textbook result

$$
\sigma_{cr}=\frac{E}{\sqrt{3(1-\nu^2)}}\frac{t}{R}.
$$

### Step 6 — The buckle pattern is a checkerboard of diamonds
The critical mode has circumferential wave number n ≈ 0.6 √(R/t) and axial half-wavelength comparable to the circumference wavelength, producing the familiar diamond-buckle pattern observed in tests.

## 5. Worked examples — every step shown

**Example 1 — Basic numerical evaluation**  
*Given:* E = 70 GPa, ν = 0.33, R = 1 m, t = 2 mm.  
*Find:* σ_cr.  

Substitute directly:  
√[3(1-0.33²)] = √[3(1-0.1089)] = √2.6733 ≈ 1.635.  
σ_cr = 70e9 / 1.635 × (0.002/1) ≈ 85.6 MPa.  
**85.6 MPa**

*Reflection:* The only arithmetic risk is forgetting that ν appears inside the square root; the result is already 40 % of typical aluminum yield, showing how thin shells buckle elastically.

**Example 2 — Effect of length on validity**  
*Given:* Same cylinder but L = 0.3 m.  
*Find:* Whether the formula still applies.  

The classical half-wave length λ_cr ≈ 1.72 √(R t) ≈ 0.077 m. Because L > 3 λ_cr the boundary conditions at the ends do not interfere and the formula remains valid.

**Example 3 — Knockdown factor application**  
*Given:* Theoretical σ_cr = 85.6 MPa, NASA-recommended knockdown φ = 0.33 for t/R = 0.002.  
*Find:* Design allowable.  

Design stress = φ σ_cr = 0.33 × 85.6 ≈ 28.2 MPa.  
**28.2 MPa**

*Reflection:* The knockdown accounts for imperfection sensitivity; omitting it is the most common certification error.

**Example 4 — Composite cylinder (orthotropic)**  
*Given:* Axial modulus E_x = 80 GPa, circumferential E_θ = 40 GPa, ν_xθ = 0.3, t/R = 0.002.  
*Find:* Modified σ_cr,x.  

Replace the isotropic expression with the orthotropic equivalent derived from the same energy method:

$$
\sigma_{cr,x}=\frac{\sqrt{E_x E_\theta}}{ \sqrt{3(1-\nu_{x\theta}\nu_{\theta x}) } }\frac{t}{R}.
$$

Numerically ≈ 60.8 MPa.  
**60.8 MPa**

*Reflection:* The geometric mean of the two moduli appears because membrane energy is stored circumferentially while bending uses both directions.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using yield stress instead of σ_cr | Intuition trained on solid columns | Always compute σ_cr first; compare with σ_y afterward |
| Ignoring knockdown factor | Textbook gives classical value only | Apply φ ≤ 0.65 for metallic cylinders unless high-fidelity analysis exists |
| Assuming formula holds for very short cylinders | End effects dominate when L < 2√(R t) | Check L/√(R t) > 3 before using σ_cr |
| Treating composite layups as isotropic | E_x ≠ E_θ | Insert orthotropic stiffnesses into the energy functional |
| Neglecting internal pressure | Pressure stiffens the shell via hoop stress | Add stabilizing term + (p R / t) inside the square root when p > 0 |
| Forgetting Poisson effect on ν | Using ν = 0.3 for all materials | Measure or look up the actual ν; it enters to the fourth power inside the root |
| Confusing radius with diameter | R appears linearly | Always use mean radius for thin shells |

## 7. The textbook-precise statement
For an isotropic, linearly elastic cylindrical shell of radius R, wall thickness t ≪ R and length L ≫ √(R t) subjected to uniform axial compressive force per unit circumference N_x, the classical buckling stress resultant is given by

$$
N_{x,cr}=\frac{E t^2}{\sqrt{3(1-\nu^2)}},
$$

provided the ends are simply supported or the length permits formation of at least three half-waves. This is Theorem 8.3 in Timoshenko & Gere, *Theory of Elastic Stability*, 2nd ed., McGraw-Hill, 1961.

## 8. Visual — diagram or schematic

```text
Axial load N_x (downward arrows all around top rim)
          │ │ │ │ │ │ │ │ │ │ │ │
          ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼
     ┌────────────────────────────┐  ← top edge (simple support)
     │                            │
     │      ◇     ◇     ◇         │  ← diamond buckle row 1
     │   ◇     ◇     ◇     ◇      │
     │      ◇     ◇     ◇         │  ← diamond buckle row 2
     │                            │
     └────────────────────────────┘  ← bottom edge
          ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲
          │ │ │ │ │ │ │ │ │ │ │ │
Axial load N_x (upward arrows)
R = radius, t = thickness (exaggerated), λ ≈ 1.72√(Rt) axial half-wave
```

## 9. The memory technique

1. **The hook** — Picture a beer can being crushed between your palms; the instant it pops into diamonds is the membrane energy suddenly converting into bending energy.
2. **What to overlearn** — σ_cr = [E / √3(1-ν²)] (t/R) and the knockdown range 0.2–0.65.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by writing membrane energy (∫ σ ε dA) plus bending energy (½ ∫ D (∇²w)² dA) minus work term, then minimize with respect to wave numbers.

## 10. What this unlocks
Mastery of classical cylinder buckling is the gateway to shell stability under combined loads and to modern computational verification.  

- Buckling of cylinders under external pressure  
- Imperfection-sensitivity theory (Koiter)  
- Stiffened-shell optimization with stringers and rings  
- Finite-element eigenvalue extraction for launch-vehicle tanks  
- Post-buckling and progressive collapse analysis  

## 11. Self-check — five questions, no answers
1. A cylinder has t/R = 1/500. By what factor does σ_cr change if the material is changed from aluminum (E = 70 GPa, ν = 0.33) to steel (E = 200 GPa, ν = 0.30)?  
2. Why does internal pressure raise the axial buckling load even though it adds no axial force?  
3. A finite-element model of a perfect cylinder predicts 1.8× the classical load. What single modeling error most likely explains the discrepancy?  
4. Derive the approximate number of circumferential waves n_cr at buckling from the same energy functional used in Step 5.  
5. Two cylinders have identical R/t but one has L = 5√(Rt) and the other L = 50√(Rt). Which (if either) obeys the classical formula, and why?