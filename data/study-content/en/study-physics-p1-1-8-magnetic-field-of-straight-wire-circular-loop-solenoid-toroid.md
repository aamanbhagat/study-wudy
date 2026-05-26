## 1. The one-sentence answer
**Magnetic fields produced by steady currents in wires of simple geometry are obtained by integrating the Biot-Savart law or, when symmetry permits, by applying Ampère’s law in integral form.**

A steady electric current consists of charges in motion. Each moving charge creates a magnetic field that circles around its velocity vector according to the right-hand rule. When many charges flow together in a wire, their individual contributions add vectorially; the net field at any point is the integral of these contributions.

For an infinite straight wire the field falls as 1/r and circles the wire. Bending the wire into a loop concentrates the field inside the loop. Stacking many loops into a solenoid produces a nearly uniform interior field and a weak exterior field. Closing the solenoid into a toroid confines the field almost entirely inside the toroidal volume.

> [!NOTE]
> The single deepest insight is that symmetry, not the detailed shape of every charge’s path, dictates the functional form of B; once symmetry reduces the integral to an algebraic expression, the magnitude follows at once from the enclosed current.

## 2. Why this matters — concrete and current
The Large Hadron Collider at CERN uses 1232 superconducting dipole magnets, each generating a 8.3 T field from current in Nb-Ti cables wound in a geometry derived from the solenoid and toroid solutions; without the exact field map provided by these formulas the beam would not stay on orbit.

Tokamak fusion devices such as ITER rely on a toroidal-field coil system whose B-field inside the plasma is calculated from the toroid formula; the 68 kA current in each of the 18 toroidal-field coils produces the 5.3 T on-axis field that confines the 150-million-kelvin plasma.

MRI scanners manufactured by Siemens Healthineers contain solenoidal magnets 1.5–7 T strong; the uniformity requirement of a few parts per million over a 50 cm sphere is set by the same solenoid field expression that appears in every introductory derivation.

Hall-effect current sensors inside electric-vehicle motor controllers (Tesla, BYD) measure the magnetic field around a straight conductor; the 1/r dependence derived for the infinite wire converts the measured B directly into the battery current used for torque control.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector cross product     | Direction of dB is perpendicular to both dl and r-vector  |
| Line integral            | Biot-Savart and Ampère’s law are statements about ∮ or ∫  |
| Cylindrical symmetry     | Allows B to be constant on an Amperian circle or loop     |
| Right-hand rule          | Fixes the sense of circulation of B around a current      |

## 4. Building the idea — from intuition to formalism

### Step 1 — A single moving charge produces a circling field
A charge q moving at velocity v creates a magnetic field at displacement r that is perpendicular to both v and r.  
Concrete example: an electron drifting at 10^{-4} m s^{-1} past a point 1 cm away produces a field of order 10^{-18} T.  
The infinitesimal contribution is  
$$
d\mathbf{B}=\frac{\mu_0}{4\pi}\frac{q\mathbf{v}\times\hat{\mathbf{r}}}{r^2}.
$$
> [!WARNING]
> Reversing the sign of the cross product inverts the field direction; many sign errors later appear when students forget the order v × r.

### Step 2 — A steady current element replaces the single charge
Replace qv by I dl; the field contribution of a current element is therefore  
$$
d\mathbf{B}=\frac{\mu_0}{4\pi}\frac{I\,d\mathbf{l}\times\hat{\mathbf{r}}}{r^2}.
$$
This is the Biot-Savart law.  
> [!WARNING]
> dl is a vector tangent to the wire; treating it as a scalar erases the directional information required for the cross product.

### Step 3 — Straight wire: integrate along an infinite line
Place the wire on the z-axis; evaluate B at perpendicular distance ρ. Every element contributes a component that survives integration only in the azimuthal direction. After performing the integral one obtains  
$$
B=\frac{\mu_0 I}{2\pi\rho}.
$$
> [!WARNING]
> The result is valid only for an infinitely long wire; finite-wire corrections become noticeable within one wire length of the ends.

### Step 4 — Circular loop: integrate around a closed circle
For a loop of radius a carrying current I, symmetry shows B is axial. The on-axis field at distance z is obtained by integrating the cosine projection of every dl:  
$$
B_z=\frac{\mu_0 I a^2}{2(a^2+z^2)^{3/2}}.
$$
> [!WARNING]
> Off-axis points require elliptic integrals; assuming the on-axis formula everywhere produces large errors near the wire itself.

### Step 5 — Solenoid: stack many loops
An ideal infinite solenoid has n turns per unit length. Inside, the axial field is uniform and outside it is zero. Ampère’s law applied to a rectangular loop that straddles the wall yields  
$$
B=\mu_0 n I.
$$
> [!WARNING]
> The ideal result assumes the solenoid is infinitely long; real solenoids exhibit end-fringing fields that decay over a distance comparable to the radius.

### Step 6 — Toroid: bend the solenoid into a doughnut
A toroidal winding of N total turns carrying current I produces, inside the toroidal volume at radius r from the centre,  
$$
B=\frac{\mu_0 N I}{2\pi r}.
$$
Outside the toroid the net enclosed current is zero, so B = 0.  
> [!WARNING]
> The 1/r dependence means the field is stronger on the inner radius; treating it as constant leads to incorrect force calculations on plasma or particles.

### Step 7 — Ampère’s law as the symmetry shortcut
When symmetry guarantees that B is either constant or zero on a closed path, the integral form  
$$
\oint\mathbf{B}\cdot d\mathbf{l}=\mu_0 I_{\text{enc}}
$$
replaces the Biot-Savart integration entirely. All four geometries above are solved this way once symmetry is established.

## 5. Worked examples — every step shown

**Example 1 — Infinite straight wire**  
*Given:* I = 10 A, ρ = 2 cm.  
*Find:* B.  
Step 1: Choose circular Amperian loop of radius ρ.  
*Why:* Cylindrical symmetry makes |B| constant and tangent.  
Step 2: ∮ B · dl = B · 2πρ.  
*Why:* Left side collapses because of constancy.  
Step 3: B · 2πρ = μ₀ I.  
*Why:* Right side equals total enclosed current.  
Step 4: B = μ₀ I / (2πρ) = 1.0 × 10^{-4} T.  
**B = 1.00 × 10^{-4} T**  
*Reflection:* The only non-obvious move was recognising that symmetry forces B to be azimuthal and constant on the circle; once seen, the algebra is immediate.

**Example 2 — On-axis field of a single loop**  
*Given:* I = 5 A, a = 5 cm, z = 10 cm.  
*Find:* B_z.  
Step 1: Write dB contribution of each dl and retain only z-component.  
*Why:* Radial components cancel by symmetry.  
Step 2: cos θ = a / √(a² + z
²).  
*Why:* Geometric projection.  
Step 3: Integrate 2πa elements → B_z = μ₀ I a² / [2(a
² + z²)^{3/2}].  
*Why:* The integral reduces to multiplication by circumference.  
Step 4: Insert numbers → B_z = 2.79 × 10^{-5} T.  
**B_z = 2.79 × 10^{-5} T**  
*Reflection:* The ( )^{3/2} power arises directly from the r³ in the denominator after the cosine factor is included.

**Example 3 — Finite solenoid of length L**  
*Given:* n = 200 turns m^{-1}, I = 3 A, L = 0.5 m.  
*Find:* Interior B (centre).  
Use the ideal formula first: B = μ₀ n I = 7.54 × 10^{-4} T.  
*Reflection:* For L ≫ radius the end effects are < 1 % at the centre; otherwise numerical integration of many loops is required.

**Example 4 — Toroid with rectangular cross-section**  
*Given:* N = 500 turns, I = 2 A, inner radius 8 cm, outer radius 12 cm.  
*Find:* B at r = 10 cm.  
B = μ₀ N I / (2π r) = 2.00 × 10^{-3} T.  
**B = 2.00 × 10^{-3} T**  
*Reflection:* Because the 1/r dependence is retained, B varies by 20 % between inner and outer radii; the mean-radius approximation is therefore only 10 % accurate.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using B = μ₀ I / 2πr for finite wire | Textbook examples always draw infinite wires        | Check whether distance to ends ≪ length              |
| Forgetting 1/r inside toroid      | Students treat toroid as “big solenoid”             | Always keep the 2πr denominator                      |
| Sign error in right-hand rule     | Ambiguous thumb/finger imagery                      | Draw current arrow and curl fingers explicitly       |
| Applying solenoid formula to short coil | End effects ignored                               | Compare L with radius before using μ₀ n I            |
| Treating loop field as uniform everywhere | On-axis formula misapplied off-axis               | Restrict on-axis formula to z-axis points            |
| Missing μ₀ / 4π factor in Biot-Savart | SI-unit confusion                                   | Write the constant every time until automatic        |
| Confusing I_enc in Ampère’s law   | Return currents outside path omitted                | Draw the Amperian loop and shade the enclosed area   |

## 7. The textbook-precise statement
Griffiths, *Introduction to Electrodynamics*, 4e, §5.4–5.5:  
For steady currents the magnetic field satisfies the Biot-Savart law  
$$
\mathbf{B}(\mathbf{r})=\frac{\mu_0}{4\pi}I\int\frac{d\mathbf{l}'\times(\mathbf{r}-\mathbf{r}')}{|\mathbf{r}-\mathbf{r}'|^3}.
$$
When the geometry possesses sufficient symmetry that B is constant in magnitude and parallel (or anti-parallel) to dl on a closed Amperian loop C, the integral form of Ampère’s law reduces to  
$$
B\oint_C dl=\mu_0 I_{\text{enc}}\quad\Rightarrow\quad B=\frac{\mu_0 I_{\text{enc}}}{\oint_C dl}.
$$
The four geometries—straight wire, circular loop, solenoid, toroid—are the canonical illustrations of this reduction.

## 8. Visual — diagram or schematic
```text
Toroid (top view)          Solenoid (side view)
   .---.                     ┌──────────────────────┐
  /     \                    │  n turns per metre   │
 |   r   |  B inside →       │  I →→→→→→→→→→→→→→→→→  │
  \     /                    └──────────────────────┘
   '---'   B=0 outside          B=μ₀ n I (inside)
Straight wire (cross-section)   Circular loop (edge view)
     • I (out)                  z ↑
     |                          │   B
     v B circles                │  ↗
   clockwise (right-hand)       └───•─── loop radius a
```

## 9. The memory technique
1. **The hook** — Picture an archer’s arrow (current) shot along a wire; the magnetic field lines are the concentric ripples that spread outward like waves in a pond when the arrow hits the surface.  
2. **What to overlearn** — B_wire = μ₀ I / (2πρ); B_solenoid = μ₀ n I; B_toroid = μ₀ N I / (2π r); right-hand curl rule.  
3. **Spaced-repetition schedule** — Review the four formulas at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Begin from Biot-Savart, impose cylindrical or axial symmetry, reduce the integral to an algebraic expression via Ampère’s law.

## 10. What this unlocks
These field expressions become the source terms for the Lorentz force on moving charges and currents, enabling the design of motors, magnetic lenses, and plasma confinement devices. They also serve as the benchmark solutions against which numerical magnetostatic codes are validated.

- Next: vector potential A and its relation to B  
- Force between two parallel wires (definition of ampere)  
- Magnetic moment of a current loop and its torque in an external field  
- Faraday’s law when these steady fields are made time-varying

## 11. Self-check — five questions, no answers
1. A 3 A current flows in a wire of length 40 cm; at what perpendicular distance does the field equal the Earth’s surface field (≈ 50 μT)?  
2. Derive the axial field of a loop at z = a starting from Biot-Savart; show every trigonometric substitution.  
3. A solenoid of 300 turns over 25 cm carries 4 A; estimate the fractional drop in B at a point one radius inside from the open end.  
4. In a toroid the inner radius is half the outer radius. By what factor does B differ between the two radii?  
5. A student draws an Amperian circle around a coaxial cable that encloses only the inner conductor; another circle encloses both conductors. What is B on each path and why?