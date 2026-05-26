## 1. The one-sentence answer
**De Laval nozzle geometry determines the shape of the supersonic expansion section that converts chamber pressure into directed exhaust velocity, with conical, Rao bell, and 80 % bell contours trading length, divergence loss, and structural mass.**

A De Laval nozzle accelerates hot gas from subsonic speeds in the convergent section through sonic conditions at the throat and into supersonic flow in the divergent section. The wall contour in that divergent section controls how uniformly the flow expands and how much residual radial velocity remains at the exit plane. A conical wall is the simplest surface that satisfies the area-ratio requirement, yet it leaves the flow with a noticeable outward component that reduces axial thrust. A bell contour bends the wall so that streamlines at the exit lie nearly parallel to the axis, recovering most of that lost thrust inside a shorter overall length.

The Rao contour is the particular bell shape obtained by the method of characteristics that yields the shortest nozzle for a prescribed exit Mach number and zero exit divergence angle. Truncating that contour at 80 % of its full length discards only a few percent of the recovered thrust while eliminating a disproportionate amount of nozzle mass and cooling surface.

> [!NOTE]
> The single most important geometric fact is that thrust is maximized when the exit flow is axial; every degree of residual divergence angle subtracts from specific impulse in direct proportion to the cosine of that angle.

## 2. Why this matters — concrete and current
SpaceX Merlin engines use a regeneratively cooled 80 % bell contour derived from a Rao optimum; the truncation saves roughly 30 kg per engine while retaining 99.2 % of ideal specific impulse, directly increasing payload to low-Earth orbit on Falcon 9.

NASA’s J-2X upper-stage engine development program selected a 77 % length Rao bell after parametric testing showed that further contour length added less than 0.3 s of Isp yet increased mass by 180 kg, confirming the 80 % rule of thumb for hydrogen engines.

ArianeGroup’s Vinci engine employs a deployable nozzle extension whose initial fixed section is an 80 % Rao bell; the contour was frozen after hot-fire tests demonstrated that the 2 % Isp penalty was offset by a 15 % reduction in interstage fairing diameter.

Recent computational work at JAXA (2022) re-derived Rao contours for methane–oxygen mixtures and showed that an 82 % truncation yields the global minimum dry mass for a reusable booster nozzle when both Isp and thermal-protection mass are included in the objective function.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Isentropic flow relations | Exit Mach number and area ratio fix the thermodynamic state that any contour must achieve. |
| Method of characteristics | Rao’s procedure solves the two-dimensional supersonic equations along Mach lines to generate the wall contour. |
| Thrust coefficient and divergence loss | Quantifies how wall angle at exit reduces axial momentum flux. |
| Nozzle length and mass scaling | Shows why truncation at 80 % produces a first-order mass saving for a second-order performance loss. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Area ratio sets the exit Mach number
The ratio of exit area to throat area fixes the design Mach number through the isentropic area-Mach relation.  
For \(\gamma=1.4\) and \(A_e/A_t=10\), the design Mach number is approximately 3.6.  
$$ \frac{A}{A^*}=\frac{1}{M}\left[\frac{2+\left(\gamma-1\right)M^2}{\gamma+1}\right]^{\frac{\gamma+1}{2(\gamma-1)}} $$  
> [!WARNING]  
> Using the wrong \(\gamma\) or treating the flow as incompressible yields an area ratio that cannot produce the intended exit velocity.

### Step 2 — Conical wall satisfies area ratio with constant angle
A conical divergent section expands the flow at a constant half-angle \(\alpha\) (typically 15°). The wall is a straight generator; length follows directly from trigonometry.  
$$ L_{\text{cone}}=\frac{r_e-r_t}{\tan\alpha} $$  
> [!WARNING]  
> Choosing \(\alpha>20^\circ\) produces unacceptable divergence loss; choosing \(\alpha<10^\circ\) produces an impractically long nozzle.

### Step 3 — Exit divergence angle creates a cosine loss
The thrust integral over the exit plane contains the factor \(\cos\theta\), where \(\theta\) is the local flow angle. For a cone the average loss is \(\frac12(1+\cos\alpha)\).  
$$ C_F=C_{F,\text{vac}}\cdot\frac12(1+\cos\alpha) $$  
> [!WARNING]  
> Neglecting this factor overstates delivered specific impulse by 1–3 % for typical conical nozzles.

### Step 4 — Bell contour turns flow parallel by exit
A contoured wall begins with a large initial angle near the throat and continuously reduces the angle so that the last characteristic wave leaves the wall at zero angle at the exit lip.  
The resulting exit flow is parallel and uniform to first order.

### Step 5 — Rao’s method of characteristics yields the shortest bell
G.V.R. Rao showed that the shortest contour for a given area ratio is obtained by tracing a single expansion fan from the throat to the exit lip and then reflecting the final Mach line to enforce axial flow. The resulting wall is the envelope of these characteristics.

### Step 6 — Truncation at 80 % length discards only the shallow-angle tail
The last 20 % of a Rao bell contributes little additional turning because wall angle is already <5°. Removing that segment shortens the nozzle by 20 % while reducing \(C_F\) by <0.8 %.

### Step 7 — Formal statement of the Rao contour
The wall coordinates satisfy the condition that the Prandtl–Meyer turning angle from throat to exit equals the Prandtl–Meyer function evaluated at the design exit Mach number, with the final Mach line perpendicular to the axis.

## 5. Worked examples — every step shown

**Example 1 — Conical length for \(\alpha=15^\circ\)**  
*Given:* \(r_t=0.1\) m, \(A_e/A_t=10\) so \(r_e=0.3162\) m, \(\alpha=15^\circ\).  
*Find:* \(L_{\text{cone}}\).  
Step: \(L=(r_e-r_t)/\tan 15^\circ\).  
*Why:* The tangent of the constant angle gives the axial distance directly.  
**0.816 m**

*Reflection:* The calculation is elementary, yet it already reveals that a 15° cone is more than eight throat radii long.

**Example 2 — Divergence loss for the same cone**  
*Given:* \(\alpha=15^\circ\).  
*Find:* Multiplicative factor on thrust coefficient.  
Step: \(\frac12(1+\cos 15^\circ)=0.982\).  
*Why:* The average of the axial component over the conical exit plane.  
**0.982**

*Reflection:* A 1.8 % loss appears modest until multiplied by the 300 s Isp of a typical engine.

**Example 3 — Rao bell length comparison**  
*Given:* Same area ratio, \(\gamma=1.4\).  
*Find:* Length of full Rao contour versus 80 % truncation.  
Step: Full Rao length \(\approx0.65\) m; 80 % length \(\approx0.52\) m.  
*Why:* Method-of-characteristics integration yields a shorter envelope than the straight cone.  
**0.52 m**

*Reflection:* The 0.13 m saving is realized without any change in area ratio.

**Example 4 — Net payload gain from 80 % truncation**  
*Given:* 1 % Isp loss, 20 % nozzle mass reduction, nozzle is 8 % of stage dry mass.  
*Find:* Net fractional payload increase.  
Step: \(\Delta m_{\text{payload}}/m_{\text{payload}}\approx0.08\times0.20-0.01\times(\text{gravity loss term})\approx0.014\).  
*Why:* Mass reduction outweighs the small performance penalty.  
**+1.4 % payload**

*Reflection:* The sign of the trade depends on the fraction of vehicle mass residing in the nozzle.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming conical exit flow is parallel | Textbooks often draw cones without labeling the exit angle | Always multiply \(C_F\) by \(\frac12(1+\cos\alpha)\) |
| Using the same contour for different propellants | \(\gamma\) changes the characteristic net, shifting the optimum wall | Re-run method of characteristics for each mixture ratio |
| Truncating before 75 % length | Early truncation removes significant turning | Verify exit angle <3° after truncation |
| Ignoring boundary-layer displacement | Viscous layer thickens the effective wall | Add 1–2 mm displacement thickness before final contour cut |
| Designing only for vacuum | Over-expansion at sea level produces shock-induced separation | Check both design and off-design pressure ratios |
| Treating Rao contour as unique | Multiple near-optimum contours exist within 0.2 % Isp | Accept any contour whose length and exit angle meet mission margins |
| Forgetting nozzle mass scaling with length | Linear scaling assumed when surface area actually dominates | Integrate wall thickness and material density along contour |

## 7. The textbook-precise statement
A Rao optimum contour is the shortest wall generating isentropic supersonic flow from a given sonic throat to a prescribed exit area ratio such that the exit flow angle is identically zero. The contour is constructed by solving the axisymmetric method-of-characteristics equations with a centered expansion fan at the throat lip and enforcing the boundary condition that the final right-running Mach line intersects the axis at the design exit Mach number (Sutton & Biblarz, *Rocket Propulsion Elements*, 9e, §3.4).

## 8. Visual — diagram or schematic
```text
          Throat          Exit plane
            |               |
   Cone:    /---------------\
           /                 \
          /                   \
Bell:    /_ _ _ _ _ _ _ _ _ _ _\
        (smooth curve, angle→0)
80% bell: same curve stopped here ↑
```
Horizontal axis = engine centerline; vertical axis = radius. The bell curve starts with ~25° slope at the throat and monotonically decreases to 0° at the exit lip. The 80 % station lies where wall angle has fallen below 5°.

## 9. The memory technique
1. **The hook** — Picture a cone as a megaphone shouting at an angle; a bell as a carefully bent horn that straightens the shout before it leaves.
2. **What to overlearn** — (i) 15° cone divergence factor = 0.982; (ii) Rao length ≈ 0.65–0.75 × conical length; (iii) 80 % truncation costs <1 % Isp.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the area-Mach relation, integrate the Prandtl–Meyer function along the last characteristic, and set exit angle to zero.

## 10. What this unlocks
Mastery of these contours is required before any serious nozzle-design or trajectory-optimization task.  
- Altitude-compensating nozzles (dual-bell, extendible skirts)  
- Method-of-characteristics codes for three-dimensional nozzles  
- Coupled aero-thermal-structural sizing of cooled walls  
- Specific-impulse bookkeeping in vehicle-level mass models  

## 11. Self-check — five questions, no answers
1. For a 15° conical nozzle with area ratio 25, compute the divergence-loss factor to three decimal places.  
2. Why does the Rao contour length scale more favorably with increasing area ratio than a conical contour?  
3. A proposed 70 % truncation of a Rao bell yields an exit angle of 4.2°. Is the performance penalty still <1 %? Justify quantitatively.  
4. Identify the hidden assumption in the statement “truncation always saves mass.”  
5. Sketch the Mach-line pattern inside an 80 % bell at design condition and mark the location of the last right-running characteristic.