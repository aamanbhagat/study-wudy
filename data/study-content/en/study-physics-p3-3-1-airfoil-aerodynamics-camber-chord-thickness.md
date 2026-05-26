## 1. The one-sentence answer
**An airfoil is fully described by three geometric parameters: chord length, camber distribution, and thickness distribution.**

The chord is the straight reference line connecting the leading edge to the trailing edge. All other measurements are taken relative to this line. Camber measures how much the mean line of the airfoil deviates from the chord; positive camber produces lift at zero angle of attack. Thickness is the local distance between upper and lower surfaces measured perpendicular to the chord; it controls the pressure distribution and structural volume.

These three quantities together fix the shape that determines the pressure field around the airfoil. Once the shape is fixed, the flow solution (incompressible or compressible) yields lift, drag, and moment coefficients. Changing any one parameter while holding the others fixed isolates its aerodynamic effect.

> [!NOTE]
> Camber shifts the zero-lift angle; thickness and chord set the scale of the pressure peaks that later determine shock formation in compressible flow.

## 2. Why this matters — concrete and current
NASA’s X-59 QueSST low-boom demonstrator uses a carefully tailored camber line and 4–5 % thickness ratio on its upper surface to weaken the aft shock and reduce sonic-boom ground signature; the design was validated in 2023 wind-tunnel entries at Langley.

Boeing’s 787 and Airbus A350 wings employ supercritical airfoils whose camber and thickness distributions were optimized so that the upper-surface shock sits near 60 % chord at cruise Mach 0.85, delaying drag rise by 0.02–0.03 in Mach number compared with earlier 747 sections.

SpaceX Starship flaps use a symmetric, zero-camber, thick airfoil (≈15 % t/c) chosen for thermal-structural margin during re-entry; the absence of camber keeps the pitching moment predictable when the vehicle flies at hypersonic angles of attack.

Wind-turbine manufacturers such as Vestas and Siemens Gamesa publish public airfoil families (e.g., FFA-W3) whose camber and thickness are adjusted for Reynolds numbers 3–8 million; a 1 % increase in maximum thickness raises sectional bending stiffness enough to allow 3–4 m longer blades without added mass.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Cartesian coordinates | Chord and thickness are measured along and normal to a reference axis |
| Mean-line integration | Camber is defined by integrating the difference between upper and lower surfaces |
| Angle of attack      | Zero-lift angle depends directly on camber distribution   |
| Pressure coefficient | Later compressible calculations begin from the same geometry |

## 4. Building the idea — from intuition to formalism

### Step 1 — Define the reference chord
The chord is the longest straight line that can be drawn inside the airfoil, conventionally placed from the leading-edge point of minimum radius to the trailing-edge cusp or sharp point.  
A concrete 1 m chord NACA 2412 section runs from (0,0) to (1,0).  
Formally the chord length \(c\) is  
\[
c = \sqrt{(x_{TE}-x_{LE})^2 + (y_{TE}-y_{LE})^2}.
\]
> [!WARNING] Treating a curved mean line as the chord will rotate every subsequent angle measurement by several degrees and destroy lift-curve slope comparisons.

### Step 2 — Locate the mean camber line
The mean camber line is the locus of points halfway between the upper and lower surfaces measured perpendicular to the chord.  
For the same NACA 2412 at \(x/c = 0.4\), the camber ordinate is \(z_c/c = 0.02\).  
Mathematically  
\[
z_c(x) = \frac{z_u(x) + z_l(x)}{2}.
\]
> [!WARNING] Using surface mid-points measured along the surface arc instead of perpendicular to the chord produces an erroneously forward camber peak and incorrect pitching moment.

### Step 3 — Quantify maximum camber and its location
Maximum camber \(m\) is the peak value of \(z_c(x)\) and occurs at position \(p\). NACA 2412 therefore has \(m = 0.02c\) at \(p = 0.4c\).  
\[
m = \max(z_c(x)), \quad p = \arg\max(z_c(x)).
\]
> [!WARNING] Reporting only the numerical value of \(m\) without \(p\) leaves the lift-curve shift and stall angle undetermined.

### Step 4 — Define local and maximum thickness
Thickness \(t(x)\) is the distance between upper and lower surfaces normal to the chord; maximum thickness \(t_{\max}\) is its peak value.  
For NACA 2412, \(t_{\max}/c = 0.12\) at \(x/c \approx 0.3\).  
\[
t(x) = z_u(x) - z_l(x), \quad \frac{t}{c}\Big|_{\max} = \max\left(\frac{t(x)}{c}\right).
\]
> [!WARNING] Measuring thickness along the surface normal rather than chord-normal inflates the value near the leading edge and misrepresents structural depth.

### Step 5 — Non-dimensionalise the entire geometry
All aerodynamic coefficients are independent of scale when lengths are normalised by chord:  
\[
\xi = \frac{x}{c}, \quad \eta_c = \frac{z_c}{c}, \quad \tau = \frac{t}{c}.
\]
The final textbook description of any airfoil is therefore the triplet \(\{\eta_c(\xi),\tau(\xi),c\}\).

## 5. Worked examples — every step shown

**Example 1 — Chord length of a simple flat-plate airfoil**  
*Given:* Leading edge at (0,0), trailing edge at (2.5,0).  
*Find:* Chord length \(c\).  
Step: Apply distance formula.  
\[
c = \sqrt{(2.5-0)^2 + (0-0)^2} = 2.5\,\text{m}.
\]  
*Why:* The chord is defined as the straight-line reference distance.  
**Final answer:** \(c = 2.5\) m

*Reflection:* Trivial geometry isolates the definition; any later camber or thickness calculation will still reference this same 2.5 m line.

**Example 2 — Maximum camber of NACA 0012**  
*Given:* Symmetric section, \(z_u = -z_l\).  
*Find:* \(m\).  
Step: \(z_c = 0\) everywhere, therefore  
\[
m = 0.
\]  
*Why:* Symmetry forces the mean line onto the chord.  
**Final answer:** \(m = 0\)

*Reflection:* Zero camber immediately predicts zero lift at \(\alpha = 0^\circ\).

**Example 3 — Thickness ratio from tabulated coordinates**  
*Given:* At \(\xi = 0.3\), \(z_u/c = 0.066\), \(z_l/c = -0.054\).  
*Find:* Local \(\tau\).  
Step:  
\[
\tau(0.3) = 0.066 - (-0.054) = 0.12.
\]  
*Why:* Thickness is the full normal distance between surfaces.  
**Final answer:** \(\tau = 0.12\) (12 %)

*Reflection:* The example shows why thickness is reported as a percentage of chord; the same number applies to any scaled wing.

**Example 4 — Locate both camber peak and thickness peak**  
*Given:* NACA 23012 coordinates (standard tables).  
*Find:* \(m\), \(p\), \(t_{\max}/c\).  
Step 1: Compute \(z_c(\xi)\) at every station.  
Step 2: Locate \(\max(z_c) = 0.015\) at \(\xi = 0.15\).  
Step 3: Compute \(\tau(\xi)\) and locate \(\max(\tau) = 0.12\) at \(\xi = 0.30\).  
**Final answer:** \(m = 0.015c\) at \(p = 0.15c\), \(t_{\max}/c = 0.12\)

*Reflection:* Separate locations of camber and thickness maxima illustrate why two independent distributions are required.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Confusing camber with angle of attack | Both tilt the lift curve                            | Always compute zero-lift angle from camber first     |
| Measuring thickness along surface | Leading-edge curvature makes surface normal longer  | Use chord-perpendicular distance only                |
| Reporting absolute camber instead of \(m/c\) | Scale invariance is lost                            | Non-dimensionalise every length by chord             |
| Treating maximum thickness station as camber station | They rarely coincide                                | Compute two separate maxima                          |
| Ignoring trailing-edge closure    | Open trailing edge violates Kutta condition         | Enforce \(z_u(c) = z_l(c) = 0\)                      |
| Using geometric chord instead of aerodynamic chord | Control-surface deflections rotate the reference    | Redefine chord after every control deflection        |
| Quoting thickness ratio without Reynolds number | Boundary-layer transition changes effective shape   | Always state both \(t/c\) and \(\text{Re}\)          |

## 7. The textbook-precise statement
An airfoil profile is a closed curve in the plane whose geometry is completely specified by a chord length \(c\), a mean camber function \(\eta_c(\xi)\) and a thickness function \(\tau(\xi)\) for \(\xi\in[0,1]\), with the constraints \(\eta_c(0)=\eta_c(1)=0\), \(\tau(0)=0\), \(\tau(1)=0\). The upper and lower surfaces are then recovered by  
\[
\eta_{u,l}(\xi)=\eta_c(\xi)\pm\frac12\tau(\xi).
\]
All aerodynamic coefficients are functions of these three distributions and the free-stream Mach and Reynolds numbers (Anderson, *Fundamentals of Aerodynamics*, 6e, §4.4).

## 8. Visual — diagram or schematic
```text
          upper surface
              /\
             /  \      t_max
            /    \     ^
           /      \    |
LE--------/--------\---|-------> TE
   (0,0)  camber   \   | chord c
            line    \  |
                     \/
          lower surface
\xi = 0          0.3      1.0
```
Horizontal axis is chord-normalised \(\xi\); vertical distances are exaggerated. Camber peak shown ahead of thickness peak.

## 9. The memory technique
1. **The hook** — Picture a steel ruler (chord) bent into a gentle bow (camber) and then given a uniform width (thickness); the three operations are independent.
2. **What to overlearn** — \(c\), \(m/c\), \(p/c\), \(t_{\max}/c\); the four numbers that label any NACA or supercritical section.
3. **Spaced-repetition schedule** — Review definitions at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive surfaces from \(\eta_c\) and \(\tau\) using the two equations in §7; the geometry is recovered in two lines.

## 10. What this unlocks
Mastery of camber, chord and thickness supplies the geometric boundary condition required for every subsequent compressible-flow calculation.

- Thin-airfoil theory and its supersonic extension
- Shock-expansion theory on cambered surfaces
- Transonic small-disturbance equation source terms
- Panel-method and Euler-solver grid generation
- Optimisation loops that vary \(\eta_c(\xi)\) and \(\tau(\xi)\) for minimum wave drag

## 11. Self-check — five questions, no answers
1. A symmetric 10 % thick airfoil at zero angle of attack produces what lift coefficient?
2. If maximum camber is moved from 40 % to 20 % chord while keeping \(m/c\) constant, does the zero-lift angle become more or less negative?
3. Two airfoils have identical \(t_{\max}/c\) but different chord lengths; which has the larger pressure-coefficient magnitude at the same Mach number?
4. Why does an aft camber peak raise the trailing-edge pressure more than a forward peak at the same lift coefficient?
5. In a supersonic freestream, which parameter—camber or thickness—dominates wave-drag magnitude for a given lift coefficient?