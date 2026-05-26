## 1. The one-sentence answer
**Capacitance** is the constant of proportionality between charge \(Q\) and voltage \(V\) for an isolated conductor pair, given by \(C = Q/V\), and its value is found by solving the electrostatic boundary-value problem for each geometry.

Parallel-plate, cylindrical, and spherical capacitors all follow from Gauss’s law once you fix the geometry and integrate the electric field between the conductors. The parallel-plate case gives the simplest uniform-field result; cylindrical and spherical cases produce logarithmic and inverse-distance fields, respectively. In each derivation you assume vacuum (or linear dielectric) between the plates, neglect fringing, and treat the conductors as equipotentials. The final expressions differ only because the area element and the path of integration change with symmetry.

> [!NOTE]
> The single deepest insight is that capacitance depends only on geometry once permittivity is fixed; everything else (charge, voltage, energy) scales linearly with \(C\).

## 2. Why this matters — concrete and current
SpaceX’s Starlink satellites use cylindrical coaxial capacitors in their phased-array power-distribution buses; the logarithmic dependence on radius allows compact, high-voltage filtering that survives launch vibration.  
Semiconductor foundries (TSMC 3 nm node) rely on spherical-fringe models of on-chip MIM capacitors when extracting parasitic \(C\) for timing closure; a 5 % error in the spherical term shifts critical-path delay by several picoseconds.  
NASA’s Europa Clipper mission carries spherical-capacitor-based dust detectors whose \(C \propto 1/r\) response lets engineers distinguish micrometeoroid mass from velocity in a single waveform.  
Pulsed-power facilities such as Sandia’s Z-machine employ parallel-plate transmission lines whose uniform-field derivation sets the exact plate spacing needed to reach 26 MA without dielectric breakdown.  
Gravitational-wave observatories (LIGO A+) use cylindrical capacitive position sensors inside their seismic-isolation stacks; the analytic log formula lets servo designers predict thermal-noise limits to 10 fm/√Hz.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Gauss’s law              | Gives \(\mathbf{E}\) directly from symmetry               |
| Electric potential       | \(V = -\int\mathbf{E}\cdot d\mathbf{l}\) converts \(\mathbf{E}\) to voltage |
| Linear dielectrics       | Permits \(\mathbf{D}=\varepsilon\mathbf{E}\) inside the gap |
| Equipotential surfaces   | Conductors are equipotentials, fixing the integration limits |

If any row is unfamiliar, pause and review it before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Choose the symmetry and Gaussian surface
You first identify which coordinate system makes \(\mathbf{E}\) constant on a surface that encloses one conductor.  
Example: for two parallel plates, a pillbox straddling one plate works.  
Formal statement: \(\oint\mathbf{D}\cdot d\mathbf{A}=Q_{\text{free,enc}}\).  
> [!WARNING]
> Using the wrong surface (a sphere around a plate) destroys constancy of \(\mathbf{E}\) and the integral becomes intractable.

### Step 2 — Compute the electric field
Once the surface is chosen, \(\mathbf{E}\) follows at once from the flux.  
For parallel plates: \(E=\sigma/\varepsilon_0\).  
For coaxial cylinders: \(E=\lambda/(2\pi\varepsilon_0 r)\).  
For concentric spheres: \(E=Q/(4\pi\varepsilon_0 r^2)\).

### Step 3 — Integrate to obtain voltage
Voltage is the line integral of \(\mathbf{E}\) between the two conductors.  
Parallel plates: \(V=Ed\).  
Cylindrical: \(V=(\lambda/2\pi\varepsilon_0)\ln(b/a)\).  
Spherical: \(V=Q(1/a-1/b)/(4\pi\varepsilon_0)\).

### Step 4 — Form the capacitance ratio
Divide the free charge by the computed voltage.  
Parallel-plate result: \(C=\varepsilon_0 A/d\).  
Cylindrical result: \(C=2\pi\varepsilon_0 L/\ln(b/a)\).  
Spherical result: \(C=4\pi\varepsilon_0 ab/(b-a)\).

### Step 5 — Verify limiting cases
Check that \(b\to a\) or \(d\to0\) recovers expected infinities or zeros; this guards against algebraic sign errors.

## 5. Worked examples — har step show karo

**Example 1 — Parallel-plate capacitor**  
*Given:* Two square plates, side 10 cm, separation 0.5 mm, vacuum.  
*Find:* \(C\).  
Area \(A=0.1\times0.1=0.01\) m².  
\(E=\sigma/\varepsilon_0\), \(V=Ed\), therefore \(C=\varepsilon_0 A/d\).  
Substitute: \(C=8.85\times10^{-12}\times0.01/(5\times10^{-4})=1.77\times10^{-10}\) F.  
*Why* each move: Gauss’s law first, then definition \(C=Q/V\).  
**Final answer** \(177\) pF.  
*Reflection:* The uniform-field assumption is excellent when \(d\ll\sqrt{A}\).

**Example 2 — Cylindrical capacitor**  
*Given:* Coaxial cable, inner radius 1 mm, outer 3 mm, length 1 m.  
*Find:* \(C\).  
Use cylindrical Gaussian surface: \(E=\lambda/(2\pi\varepsilon_0 r)\).  
\(V=\int_a^b E\,dr=(\lambda/2\pi\varepsilon_0)\ln(b/a)\).  
\(C=\lambda L/V=2\pi\varepsilon_0 L/\ln(b/a)\).  
Substitute numbers: \(C=2\pi\times8.85\times10^{-12}\times1/\ln(3)=50.6\) pF.  
*Why* the log appears: radial field falls as \(1/r\).  
**Final answer** \(50.6\) pF.  
*Reflection:* The result is independent of voltage, as required for linear response.

**Example 3 — Spherical capacitor**  
*Given:* Inner sphere radius 2 cm, outer 4 cm.  
*Find:* \(C\).  
Spherical Gaussian surface yields \(E=Q/(4\pi\varepsilon_0 r^2)\).  
\(V=\int_a^b E\,dr=Q(1/a-1/b)/(4\pi\varepsilon_0)\).  
\(C=4\pi\varepsilon_0 ab/(b-a)\).  
Numerical value: \(C=4\pi\times8.85\times10^{-12}\times0.02\times0.04/(0.02)=4.45\) pF.  
*Why* the difference of reciprocals: potential of a point charge.  
**Final answer** \(4.45\) pF.  
*Reflection:* When \(b\gg a\), \(C\to4\pi\varepsilon_0 a\), recovering an isolated sphere.

**Example 4 — Mixed geometry check**  
*Given:* Same spherical capacitor filled with dielectric \(\varepsilon_r=2.5\).  
*Find:* New \(C\).  
Replace \(\varepsilon_0\) by \(\varepsilon=\varepsilon_r\varepsilon_0\) everywhere.  
**Final answer** \(11.1\) pF.  
*Reflection:* Dielectric simply scales \(C\) by \(\varepsilon_r\); geometry stays identical.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting \(\ln(b/a)\) sign      | Students integrate from outer to inner      | Always integrate from inner (high \(V\)) to outer |
| Using plate area for cylindrical  | Visual similarity with parallel plates      | Draw the actual Gaussian surface first       |
| Omitting length \(L\) in coax     | Treating capacitance as per-unit-length     | Keep SI units explicit until final answer    |
| Setting \(b-a\) instead of \(\ln(b/a)\) | Confusing radial distance with log measure | Re-derive \(V\) from \(\int dr/r\) each time |
| Ignoring fringing in parallel plate | Textbook diagrams hide edge effects         | Check \(d/\sqrt{A}<0.1\) before using formula |

## 7. The textbook-precise statement
Griffiths, *Introduction to Electrodynamics*, 4e, §2.5.3 states: “For any two conductors bearing equal and opposite charges \(\pm Q\), the capacitance is \(C=Q/V\), where \(V\) is the potential difference between them. When the conductors are concentric spheres of radii \(a<b\), \(C=4\pi\varepsilon_0 ab/(b-a)\); when they form a coaxial cable of length \(L\), \(C=2\pi\varepsilon_0 L/\ln(b/a)\).” All derivations assume electrostatics, linear media, and perfect conductors.

## 8. Visual — diagram or schematic
```
          inner cylinder (radius a)
          ────────────────────────
                     ↑ E(r)
          ────────────────────────  outer cylinder (radius b)
          <--- L --->
```
Spherical case replaces cylinders by concentric spheres; field lines remain radial.

## 9. The memory technique
1. **The hook** — picture a coaxial cable as a rolled-up parallel-plate capacitor whose width grows with radius; the log factor is the “stretch”.  
2. **What to overlearn** — \(C=\varepsilon_0 A/d\), \(C=2\pi\varepsilon_0 L/\ln(b/a)\), \(C=4\pi\varepsilon_0 ab/(b-a)\).  
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — always restart from Gauss’s law, integrate \(\mathbf{E}\) to \(V\), then form \(C=Q/V\).

## 10. What this unlocks
You can now calculate stored energy \(U=\frac12 CV^2\), forces between plates, and coaxial-cable characteristic impedance.  
- Next topics: dielectric-filled capacitors, series/parallel networks, electrostatic shielding.  
- Techniques unlocked: method of images for nearby ground planes, conformal mapping for 2-D capacitance.

## 11. Self-check — five questions, no answers
1. Derive the parallel-plate formula starting from a Gaussian pillbox.  
2. A coaxial capacitor has \(a=0.5\) mm, \(b=2\) mm, \(L=50\) cm; compute \(C\) in vacuum.  
3. Show that the spherical-capacitor formula reduces to an isolated sphere when \(b\to\infty\).  
4. If a dielectric slab of \(\varepsilon_r=4\) fills half the gap of a parallel-plate capacitor (parallel to plates), is \(C\) simply doubled? Why or why not?  
5. Identify the algebraic step that would break if you integrated the cylindrical electric field from \(b\) to \(a\) instead of \(a\) to \(b\).