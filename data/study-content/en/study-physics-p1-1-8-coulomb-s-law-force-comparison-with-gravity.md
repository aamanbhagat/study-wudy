## 1. The one-sentence answer
**Coulomb’s law states that the electrostatic force between two point charges is proportional to the product of the charges and inversely proportional to the square of their separation, acting along the line joining them and repelling like charges while attracting unlike charges.**

Two charges placed a distance apart push or pull each other with a strength that drops exactly as one over distance squared. This mirrors the form of Newton’s gravitational force yet differs in two decisive ways: the charges themselves carry signs that determine direction, and the force is vastly stronger than gravity at laboratory scales. The law therefore supplies the quantitative foundation for every macroscopic electrostatic phenomenon, from the structure of atoms to the charging of spacecraft surfaces.

The inverse-square dependence arises because the electric field spreads uniformly over the surface of an imaginary sphere whose area grows with radius squared; the same geometric dilution governs gravity. Once the direction is fixed by the product of the signed charges, the vector character of the force follows at once.

> [!NOTE]
> The single deepest insight is that the mathematical skeleton of Coulomb’s law is identical to that of gravity; only the source (charge versus mass) and the enormous difference in coupling strength change the physics that follows.

## 2. Why this matters — concrete and current
In low-Earth-orbit satellites, differential charging between sunlit and shadowed surfaces routinely reaches kilovolts; Coulomb forces between these surfaces and the ambient plasma can torque a spacecraft by several micronewton-metres, an effect modelled with Coulomb’s law in every mission-design tool used by ESA and NASA.

Ion-propulsion engines on spacecraft such as NASA’s Psyche mission accelerate xenon ions across grids whose electric-field strength is set by the same 1/r² force law; grid-spacing tolerances of tens of micrometres are calculated directly from the point-charge form of the law.

Semiconductor foundries pattern sub-5 nm transistors with electron-beam lithography; the beam is focused by electrostatic lenses whose focal length is obtained by integrating the Coulomb force on each electron, limiting throughput and overlay error.

Atomic-force microscopes map surface charge distributions on dielectrics by measuring the deflection of a cantilever whose tip experiences a Coulomb force from individual surface charges; calibration curves are generated from the exact two-charge expression.

Inside thunderclouds, the same inverse-square repulsion between like-charged hydrometeors drives the rapid growth of electric fields to the 10 MV m⁻¹ breakdown threshold, a process now resolved in three-dimensional lightning models used for aviation safety.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector addition          | Force is a vector; net force on a charge requires vector sum |
| Inverse-square geometry  | Explains why both gravity and electrostatics fall as 1/r² |
| SI base units            | Charge in coulombs fixes the numerical value of k         |
| Scalar multiplication    | The sign of q₁q₂ determines attraction versus repulsion   |

## 4. Building the idea — from intuition to formalism

### Step 1 — Charges exert forces along the joining line
Two stationary point charges interact by pushing or pulling each other directly along the straight line that connects their centres. A concrete example is a +2 µC charge and a –3 µC charge 10 cm apart: the force on each points toward the other. Formally the direction is given by the unit vector \(\hat{r}_{12}\) from charge 1 to charge 2.  
> [!WARNING] Treating the force as a scalar at this stage erases the directional information required for superposition.

### Step 2 — Magnitude grows with the product of the charges
If either charge is doubled, the observed force doubles; if both are doubled, the force quadruples. This is verified by torsion-balance experiments that vary one charge while holding separation fixed. The product therefore appears linearly: \(F \propto q_1 q_2\).

### Step 3 — Magnitude falls as the square of separation
Doubling the distance reduces the force to one-quarter; tripling it reduces the force to one-ninth. The geometric origin is the surface area \(4\pi r^2\) of a sphere centred on one charge. Hence \(F \propto 1/r^2\).

### Step 4 — Assemble the scalar magnitude
Combining the three proportionalities supplies the scalar equation
\[
F = k \frac{|q_1 q_2|}{r^2},
\]
where \(k = 8.99 \times 10^9\,\mathrm{N\,m^2\,C^{-2}}\) is determined by experiment.

### Step 5 — Restore vector character and sign
The signed product \(q_1 q_2\) automatically encodes direction: positive for repulsion, negative for attraction. The full vector statement is therefore
\[
\vec{F}_{12} = k \frac{q_1 q_2}{r_{12}^2} \hat{r}_{12}.
\]

### Step 6 — Compare directly with gravity
Newton’s law for two masses is
\[
\vec{F}_g = -G \frac{m_1 m_2}{r^2} \hat{r}_{12}.
\]
Both forces are central and inverse-square; the differences are the source (signed charge versus positive mass) and the coupling constant (\(k \approx 9\times10^9\) versus \(G \approx 6.67\times10^{-11}\)).

## 5. Worked examples — every step shown

**Example 1 — Two protons at atomic spacing**  
*Given:* Two protons, \(q = +1.60\times10^{-19}\) C, separated by \(r = 1.0\times10^{-10}\) m.  
*Find:* Magnitude of repulsive force.  
Step 1: Write the scalar form \(F = k q^2 / r^2\).  
*Why:* Step 1 follows directly from the magnitude law derived in Step 4.  
Step 2: Substitute numbers:  
\[
F = (8.99\times10^9)(1.60\times10^{-19})^2 / (1.0\times10^{-10})^2 = 2.30\times10^{-8}\,\mathrm{N}.
\]  
*Why:* Arithmetic is exact once the formula is accepted.  
**2.30×10⁻⁸ N**  
*Reflection:* The force is already macroscopic despite atomic separation, illustrating why electromagnetic effects dominate gravity inside atoms.

**Example 2 — Compare electrostatic and gravitational forces between electron and proton**  
*Given:* Electron mass \(9.11\times10^{-31}\) kg, proton mass \(1.67\times10^{-27}\) kg, charges \(\pm1.60\times10^{-19}\) C, \(r = 5.29\times10^{-11}\) m (Bohr radius).  
*Find:* Ratio \(F_e / F_g\).  
Step 1: Compute \(F_e = k e^2 / r^2\).  
*Why:* Coulomb magnitude.  
Step 2: Compute \(F_g = G m_e m_p / r^2\).  
*Why:* Newtonian gravity.  
Step 3: Form ratio \(k e^2 / (G m_e m_p) \approx 2.27\times10^{39}\).  
**2.27×10³⁹**  
*Reflection:* The ratio is independent of distance, a direct consequence of identical 1/r² dependence.

**Example 3 — Three charges in a line**  
*Given:* \(q_1 = +2\,\mu\mathrm{C}\) at x=0, \(q_2 = +3\,\mu\mathrm{C}\) at x=0.2 m, \(q_3 = -4\,\mu\mathrm{C}\) at x=0.5 m.  
*Find:* Net force on \(q_2\).  
Step 1: Force from \(q_1\) on \(q_2\):  
\[
\vec{F}_{12} = k\frac{(+2\times10^{-6})(+3\times10^{-6})}{(0.2)^2}\hat{i} = +1.35\,\mathrm{N}\,\hat{i}.
\]  
*Why:* Like signs give positive (repulsive) direction.  
Step 2: Force from \(q_3\) on \(q_2\):  
\[
\vec{F}_{32} = k\frac{(-4\times10^{-6})(+3\times10^{-6})}{(0.3)^2}\hat{i} = -1.20\,\mathrm{N}\,\hat{i}.
\]  
*Why:* Opposite signs give attraction toward \(q_3\) (negative x).  
Step 3: Net force \(\vec{F}_\mathrm{net} = (1.35-1.20)\hat{i} = 0.15\,\mathrm{N}\,\hat{i}\).  
**0.15 N in +x direction**  
*Reflection:* Vector addition is mandatory once more than two charges are present.

**Example 4 — Force at 45° geometry**  
*Given:* Charge \(q = +5\,\mu\mathrm{C}\) at origin; two charges \(+2\,\mu\mathrm{C}\) at (0.1 m,0) and (0,0.1 m).  
*Find:* Net force on the origin charge.  
Step 1: Each pairwise force has magnitude \(k(5\times2\times10^{-12})/0.01 = 9.0\,\mathrm{N}\).  
Step 2: Each force vector is at 45° to the axes; components are \(9.0/\sqrt{2}\) in x and y.  
Step 3: Net components double by symmetry: \(F_x = F_y = 12.7\,\mathrm{N}\).  
Step 4: Magnitude \(\sqrt{2}\times12.7 = 18.0\,\mathrm{N}\) at 45°.  
**18.0 N at 45°**  
*Reflection:* Symmetry reduces a 2-D vector problem to scalar arithmetic.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting the vector hat         | Students treat F as scalar after learning magnitude | Always write \(\hat{r}\) explicitly          |
| Sign error on attraction          | Confusing “product positive = repel”        | Memorise: same sign → positive (repel)       |
| Using k without units             | k carries N m² C⁻²; omitting it yields wrong dimensions | Insert units on every substitution           |
| Treating gravity and Coulomb as identical | Both are 1/r², so direction is overlooked | Keep the minus sign of gravity visible       |
| r measured from wrong origin      | Three-body problems invite origin confusion | Draw labelled axes before calculating each r |
| Confusing test charge with source | Notation q vs Q is swapped                  | Fix source charges first, then test charge   |
| 1/r versus 1/r²                   | Inverse-square law is misremembered         | Recall sphere area argument each time        |

## 7. The textbook-precise statement
Coulomb’s law (Griffiths, *Introduction to Electrodynamics*, 4e, Eq. 2.1): Let \(q_1\) and \(q_2\) be point charges located at position vectors \(\vec{r}_1\) and \(\vec{r}_2\). The electrostatic force exerted by \(q_1\) on \(q_2\) is
\[
\vec{F}_{12} = \frac{1}{4\pi\epsilon_0}\frac{q_1 q_2}{|\vec{r}_2-\vec{r}_1|^2}\hat{r}_{12},
\]
where \(\epsilon_0 = 8.85\times10^{-12}\,\mathrm{C^2\,N^{-1}m^{-2}}\) and the force on \(q_1\) due to \(q_2\) obeys Newton’s third law. The law holds in vacuum for stationary charges whose separation is large compared with their intrinsic sizes.

## 8. Visual — diagram or schematic
```text
          q2 (+)
           ^
           |  F21 (repulsive)
           |
q1 (+) ----+----> r12 vector
           |
           |  F12 (repulsive)
           v
          q2 (+)
```
Two positive charges lie on the x-axis; arrows show equal-and-opposite repulsive forces along the line of centres. Replace one sign with minus to reverse both arrows.

## 9. The memory technique
1. **The hook** — Picture two tiny spheres covered with Velcro that either sticks or repels according to whether the patches are “same colour or opposite colour”; the strength label on each patch is the charge magnitude and the sphere surface grows with r².  
2. **What to overlearn** — \(k = 9\times10^9\), the exact vector form, and the numerical ratio \(k/Gm_em_p \approx 2.3\times10^{39}\).  
3. **Spaced-repetition schedule** — Review the vector equation at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive magnitude from sphere area, then attach the sign of \(q_1q_2\) for direction.

## 10. What this unlocks
Coulomb’s law is the microscopic origin of Gauss’s law, the electric field, and all subsequent electrostatics; it also supplies the force term in the Lorentz force law that governs charged-particle motion in rocket exhaust plumes and in semiconductor processing plasmas.  
- Electric field of point charge  
- Superposition principle for continuous charge distributions  
- Gauss’s law and flux calculations  
- Electrostatic potential energy and voltage  
- Lorentz force in electromagnetic propulsion

## 11. Self-check — five questions, no answers
1. Two protons are fixed 1 nm apart; a third proton is placed exactly midway. Compute the net force on the middle charge and state its direction.  
2. An electron orbits a proton at the Bohr radius. Calculate the centripetal force required and verify it equals the Coulomb attraction.  
3. Three charges form an equilateral triangle of side 0.2 m. Show that the net force on each charge has magnitude \(k q^2 / (0.2)^2 \times \sqrt{3}\).  
4. A spacecraft surface carries +10 µC m⁻². Estimate the repulsive force per square metre on a second identical surface 5 cm away; compare with Earth’s gravity on the same patch.  
5. If the Coulomb constant were 10 % smaller while G remained fixed, would atomic sizes increase or decrease? Give a one-sentence scaling argument.