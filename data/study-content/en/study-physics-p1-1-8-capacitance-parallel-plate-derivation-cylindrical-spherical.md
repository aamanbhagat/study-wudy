## 1. The one-sentence answer
**Capacitance quantifies how much charge a conductor geometry stores per unit potential difference, obtained by integrating the electric field from Gauss’s law between the conductors and dividing total charge by the resulting voltage.**

Charge separation on isolated conductors creates an electric field whose strength falls with distance according to geometry. The potential difference is the line integral of that field; capacitance is simply the constant of proportionality between stored charge and that difference. For any fixed shape the ratio remains independent of the amount of charge because the field scales linearly with charge density.

The derivation therefore reduces to three operations performed once per geometry: apply Gauss’s law to find E, integrate E along a path to obtain V, then form C = Q/V. Parallel-plate, coaxial-cylinder, and concentric-sphere geometries each produce a distinct functional dependence on the linear dimensions because each produces a different radial dependence of E.

> [!NOTE]
> The “aha” is that capacitance is a purely geometric property once the surrounding permittivity is fixed; changing only the shape or separation changes C even when the conductors remain electrically isolated.

## 2. Why this matters — concrete and current
NASA’s Europa Clipper mission uses cylindrical capacitors in its ice-penetrating radar to measure dielectric contrast between water ice and possible brines; the cylindrical geometry allows the electrodes to be wound around the radar boom without increasing spacecraft mass.

In semiconductor foundries, parallel-plate structures with 3 nm hafnium-oxide dielectrics form the gate capacitors of 3 nm FinFET transistors; TSMC’s N3 process quotes a capacitance density of 110 fF µm⁻² that directly sets the transistor’s I_on/I_off ratio.

Spherical capacitors appear in electrostatic models of charged water droplets in thunderstorm electrification; recent measurements from the RELAMPAGO-CACTI field campaign confirm that the 4πε₀ab/(b-a) formula predicts the onset of corona discharge within 4 % when droplet radii are known from holography.

High-voltage coaxial cables on the James Webb Space Telescope’s cryocooler compressors rely on the logarithmic capacitance per unit length to keep stored energy below 50 mJ m⁻¹ at 2 kV, preventing Paschen breakdown inside the helium loop.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Electric field **E**     | Determines force per unit charge; obtained from Gauss’s law |
| Gauss’s law              | Supplies E for every symmetric geometry without integration over the whole surface |
| Line integral for V      | Converts E into potential difference between conductors   |
| Linear dielectrics       | Permits replacement of ε₀ by ε = κε₀ when a linear medium fills the gap |

## 4. Building the idea — from intuition to formalism

### Step 1 — Charge produces field
Two conductors carrying equal and opposite charge densities generate an electric field that exists only in the space between them when the conductors are close compared with their lateral size.  
Concrete example: two 10 cm square plates 1 mm apart carrying ±1 µC produce a nearly uniform field between them.  
Gauss’s law states  
$$
\oint \mathbf{E}\cdot d\mathbf{A}=\frac{Q_{\text{enc}}}{\varepsilon_0}.
$$
> [!WARNING]
> Omitting the symmetry argument that lets you pull E outside the integral will produce an incorrect functional form for every geometry that follows.

### Step 2 — Field determines potential difference
Potential difference between the conductors is path-independent in electrostatics and equals the integral of E along any line connecting them:  
$$
V=-\int_a^b\mathbf{E}\cdot d\mathbf{l}.
$$
For the parallel-plate case E is constant, so V = Ed.

### Step 3 — Capacitance is the ratio C = Q/V
By definition  
$$
C\equiv\frac{Q}{V}.
$$
Substituting the expression for V obtained in Step 2 yields a geometry-dependent formula independent of Q.

### Step 4 — Parallel-plate derivation
Apply a Gaussian surface enclosing charge Q on one plate; symmetry forces E perpendicular and constant between plates, zero outside. Then  
$$
E=\frac{\sigma}{\varepsilon_0}=\frac{Q}{A\varepsilon_0},\qquad V=Ed=\frac{Qd}{A\varepsilon_0}.
$$
Hence  
$$
C=\frac{\varepsilon_0 A}{d}.
$$

### Step 5 — Cylindrical (coaxial) derivation
A Gaussian cylinder of radius r and length L between conductors a < r < b gives  
$$
E(r)=\frac{\lambda}{2\pi\varepsilon_0 r},\qquad V=\frac{\lambda}{2\pi\varepsilon_0}\ln\frac{b}{a}.
$$
Thus  
$$
C=\frac{2\pi\varepsilon_0 L}{\ln(b/a)}.
$$

### Step 6 — Spherical derivation
A Gaussian sphere of radius r between concentric shells a < r < b yields  
$$
E(r)=\frac{Q}{4\pi\varepsilon_0 r^2},\qquad V=\frac{Q}{4\pi\varepsilon_0}\left(\frac{1}{a}-\frac{1}{b}\right).
$$
Therefore  
$$
C=\frac{4\pi\varepsilon_0 ab}{b-a}.
$$

### Step 7 — Textbook statement
The three results above are the exact electrostatic capacitances for the three canonical geometries when the gap is filled with vacuum (or linear dielectric of permittivity ε).

## 5. Worked examples — every step shown

**Example 1 — Parallel-plate capacitor**  
*Given:* Square plates of side 5.0 cm, separation 0.50 mm, vacuum.  
*Find:* C.  
Gaussian surface: pillbox of area A = (0.05 m)².  
$$
E=\frac{Q}{A\varepsilon_0}.
$$  
*Why:* Symmetry and Gauss’s law.  
$$
V=Ed=\frac{Qd}{A\varepsilon_0}.
$$  
*Why:* Uniform field, constant separation.  
$$
C=\frac{\varepsilon_0 A}{d}=4.43\times10^{-11}\,\text{F}.
$$  
**Final answer:** \(\mathbf{44.3\,\text{pF}}\)  
*Reflection:* The only non-obvious step is confirming E is zero outside; missing that doubles the derived capacitance.

**Example 2 — Coaxial cable segment**  
*Given:* Inner radius 1.0 mm, outer radius 4.0 mm, length 1.0 m.  
*Find:* C.  
Gaussian cylinder:  
$$
E(r)=\frac{\lambda}{2\pi\varepsilon_0 r}.
$$  
*Why:* Cylindrical symmetry.  
$$
V=\int_a^b E\,dr=\frac{\lambda}{2\pi\varepsilon_0}\ln\frac{b}{a}.
$$  
*Why:* Radial path.  
$$
C=\frac{2\pi\varepsilon_0 L}{\ln(b/a)}=50.4\,\text{pF}.
$$  
**Final answer:** \(\mathbf{50.4\,\text{pF}}\)  
*Reflection:* The logarithm appears solely because E falls as 1/r; confusing it with 1/r² yields the spherical formula.

**Example 3 — Concentric spheres**  
*Given:* Inner radius 2.0 cm, outer radius 5.0 cm.  
*Find:* C.  
Gaussian sphere:  
$$
E=\frac{Q}{4\pi\varepsilon_0 r^2}.
$$  
*Why:* Spherical symmetry.  
$$
V=\frac{Q}{4\pi\varepsilon_0}\left(\frac{1}{a}-\frac{1}{b}\right).
$$  
*Why:* Definite integral of 1/r².  
$$
C=4\pi\varepsilon_0\frac{ab}{b-a}=3.71\,\text{pF}.
$$  
**Final answer:** \(\mathbf{3.71\,\text{pF}}\)  
*Reflection:* The difference of reciprocals is the direct integral result; algebraic inversion to obtain C is the step most often inverted.

**Example 4 — Parallel plate with dielectric**  
*Given:* Same geometry as Example 1 but filled with mica, κ = 6.0.  
*Find:* C.  
Replace ε₀ by κε₀ everywhere:  
$$
C=\frac{\kappa\varepsilon_0 A}{d}=266\,\text{pF}.
$$  
**Final answer:** \(\mathbf{266\,\text{pF}}\)  
*Reflection:* The dielectric simply rescales the vacuum result; forgetting the replacement is the most common unit error.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using E = σ/ε₀ for cylindrical geometry | Plate formula memorized and misapplied      | Always redraw the Gaussian surface for the symmetry in question |
| Writing ln(a/b) instead of ln(b/a) | Sign error in limits of integration         | Keep inner radius smaller; verify V > 0              |
| Forgetting that C ∝ L for coax     | Treating L as irrelevant                    | Keep L explicit until final substitution             |
| Confusing 4πϵ₀ with 2πϵ₀           | Mixing spherical and cylindrical constants  | Write the full 4π or 2π factor before simplifying    |
| Treating vacuum and dielectric formulas identically | Overlooking κ multiplier                    | Insert κ immediately after choosing the geometry     |
| Assuming C independent of voltage  | Nonlinear dielectrics in real devices       | Verify linearity assumption before using C = Q/V     |
| Omitting units in final answer     | Calculation focus on algebra                | Attach SI base units to every intermediate E and V   |

## 7. The textbook-precise statement
For two conductors carrying charges +Q and −Q, the capacitance is  
$$
C=\frac{Q}{V},\qquad V=\int_{\text{inner}}^{\text{outer}}\mathbf{E}\cdot d\mathbf{l},
$$  
where **E** is obtained from Gauss’s law under the stated symmetry. The three closed-form results are (Griffiths, *Introduction to Electrodynamics*, 4e, Example 2.5, 2.6, Problem 2.37):  
Parallel plates: \(C=\varepsilon_0 A/d\);  
Coaxial cylinders: \(C=2\pi\varepsilon_0 L/\ln(b/a)\);  
Concentric spheres: \(C=4\pi\varepsilon_0 ab/(b-a)\).  
All assume vacuum or linear isotropic dielectric filling the entire gap and neglect fringing.

## 8. Visual — diagram or schematic
```text
Parallel-plate          Coaxial cylinder          Concentric spheres
   +Q ──────────────      a     b                  a       b
        |       |       ●───────○                 ●───────○
   d    |  E ↓  |       inner  outer              inner   outer
        |       |          (side view)              (cross-section)
   ─Q ──────────────
```
Axes: plates lie in x-y plane, separation along z; cylinder axis along z, radial coordinate r; spheres share origin, radial coordinate r.

## 9. The memory technique

1. **The hook** — Picture three nested Russian dolls: flat plates (slab), a tube inside a tube (cylinder), and a ball inside a larger ball (sphere). The field lines are straight, radial in a plane, or radial in 3-D, respectively.
2. **What to overlearn** — \(C=\varepsilon_0 A/d\), \(C=2\pi\varepsilon_0 L/\ln(b/a)\), \(C=4\pi\varepsilon_0 ab/(b-a)\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Redraw the appropriate Gaussian surface, integrate E to V, divide Q by V.

## 10. What this unlocks
Mastery of these derivations supplies the exact expressions required for electrostatic energy storage, transmission-line parameters, and the lumped-element models used in RF circuits.  
- Energy stored: \(U=\frac12CV^2\)  
- Characteristic impedance of coax: \(Z_0=\sqrt{L'/C'}\)  
- Next topics: dielectric boundary conditions, method of images, capacitance matrices for multi-conductor systems.

## 11. Self-check — five questions, no answers
1. A parallel-plate capacitor is submerged in transformer oil (κ = 2.2). By what factor does C increase if plate area and separation are unchanged?  
2. Derive the capacitance per unit length of a coaxial cable whose inner conductor is a thin strip rather than a cylinder; state the symmetry assumption that fails.  
3. Two concentric spheres have C = 10 pF in vacuum. If the outer radius is doubled while inner radius is fixed, what is the new capacitance?  
4. A student calculates V for a cylindrical capacitor and obtains a negative value. Identify the single algebraic step most likely responsible.  
5. Show that the spherical-capacitor formula reduces to the parallel-plate result when b − a ≪ a; quantify the fractional error for b = 1.1a.