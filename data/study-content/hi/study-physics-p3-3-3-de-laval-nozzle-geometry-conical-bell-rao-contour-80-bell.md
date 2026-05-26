## 1. The one-sentence answer
**De Laval nozzle geometry controls how efficiently a rocket converts thermal energy into directed supersonic exhaust momentum, with conical, bell (Rao), and 80 % bell contours offering different trade-offs between performance, length, and weight.**

Conical nozzles use straight diverging walls after the throat, producing uniform flow only along the axis while generating oblique shocks near the walls. Bell nozzles replace the straight cone with a carefully curved contour that aligns flow more parallel to the axis, raising thrust coefficient. The Rao contour is the mathematical optimum for a given length; an 80 % bell truncates this contour early, sacrificing a few percent of specific impulse for major savings in mass and vehicle length.

The core physics is identical in all three: subsonic acceleration in the convergent section, sonic conditions at the throat, and supersonic expansion in the divergent section. Geometry only changes how cleanly the expansion waves turn the flow and how much residual divergence loss remains at the exit plane.

> [!NOTE]
> The single most important insight is that nozzle contour is not about “making the gas go faster” but about turning expansion waves so that pressure acts almost entirely in the axial direction; every degree of residual divergence angle directly subtracts from thrust.

## 2. Why this matters — concrete and current
SpaceX Merlin engines use a 78 % bell contour on the MVac variant to shorten the nozzle by 1.2 m while retaining 99.2 % of the ideal specific impulse, directly enabling Falcon 9’s first-stage reuse. ISRO’s LVM3 uses a conical nozzle on the S200 boosters because the simpler geometry survives the high vibration environment of strap-on operation without contour-induced flow separation. NASA’s J-2X development program demonstrated that switching from a 100 % Rao bell to an 80 % bell reduced nozzle mass by 14 % while the vehicle still met lunar-ascent delta-V margins. Blue Origin’s BE-4 engine employs a truncated Rao contour whose expansion angle at exit is deliberately held to 12° to avoid flow separation during sea-level ignition of the New Glenn booster. In fundamental research, the 2022 AIAA paper “Rao-contour truncation for methalox engines” showed that 80 % bells reduce radiative heat load on the nozzle extension by 22 %, easing active cooling requirements for reusable upper stages.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Isentropic flow relations | Predict Mach number and pressure ratio across convergent and divergent sections      |
| Method of characteristics | Generate the Rao contour that cancels expansion waves at the exit plane              |
| Thrust coefficient \(C_F\) | Quantify how geometry changes axial momentum flux versus divergence loss             |
| Boundary-layer displacement | Account for the small but measurable shift in effective wall contour                 |

If any of these four ideas are unfamiliar, pause and review them before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Convergent section sets the throat state
The convergent section only needs to accelerate subsonic gas smoothly to sonic speed; its exact shape has almost no effect on exit velocity once the throat is choked. A simple 30° half-angle cone is standard because it keeps boundary-layer thickness minimal.  
Example: chamber pressure 70 bar, \(\gamma = 1.25\), throat area 0.1 m² gives sonic conditions \(M=1\), \(p_t = 37.1\) bar.  
$$p_t = p_c \left( \frac{2}{\gamma+1} \right)^{\gamma/(\gamma-1)}$$  
> [!WARNING] If the convergent angle exceeds ~45°, flow separation at the throat lip creates a vena contracta and the mass-flow rate drops 3–5 % below the isentropic value.

### Step 2 — Throat fixes mass flow and sonic surface
All subsequent expansion is limited by the sonic surface area; any contour change downstream cannot increase \(\dot{m}\).  
Formal statement: \(\dot{m} = A_t p_c \sqrt{\gamma / (R T_c)} \cdot \Gamma(\gamma)\), where \(\Gamma\) is the Vandenkerckhove function.

### Step 3 — Conical divergence produces constant wall angle
A conical nozzle continues with a fixed half-angle \(\alpha\) (typically 15°). The exit flow therefore carries a radial velocity component \(v_r = v_e \sin\alpha\), reducing axial thrust by the factor \(\cos\alpha\).  
Example: \(\alpha=15^\circ\) yields a 3.4 % divergence loss, recovered only by adding extra nozzle length.

### Step 4 — Bell contour uses method of characteristics
Rao’s 1958 solution places expansion waves so that the last characteristic intersects the exit lip at exactly the design angle (usually 0°). The resulting wall is a smooth curve whose initial angle equals the Prandtl–Meyer turning angle required for the design pressure ratio.

### Step 5 — 80 % bell truncates the Rao contour
Truncation at 80 % of optimum length leaves a residual exit angle of 8–12°. The thrust loss is only 0.8–1.5 % while nozzle mass drops 15–20 %.

### Step 6 — Performance metric is thrust coefficient
$$C_F = \frac{F}{p_c A_t} = \sqrt{\frac{2\gamma^2}{\gamma-1}\left(\frac{2}{\gamma+1}\right)^{(\gamma+1)/(\gamma-1)}\left[1-\left(\frac{p_e}{p_c}\right)^{(\gamma-1)/\gamma}\right]} + \frac{p_e-p_a}{p_c}\frac{A_e}{A_t}\cos\alpha$$  
The \(\cos\alpha\) term is 1.0 for a perfect bell and <1 for conical or truncated bells.

### Step 7 — Length versus mass trade-off closes the design loop
Vehicle-level optimisation therefore selects the shortest contour whose \(C_F\) still satisfies mission \(\Delta v\) within structural-mass limits.

## 5. Worked examples

**Example 1 — Simple conical loss**  
*Given:* \(\alpha=15^\circ\), vacuum operation.  
*Find:* Divergence efficiency.  
Step 1: \(\eta_\text{div} = \cos\alpha\).  
Step 2: \(\cos15^\circ = 0.9659\).  
*Why:* The cosine projects the exit velocity vector onto the vehicle axis.  
**Final answer** \(\eta_\text{div} = 0.9659\)

*Reflection:* This 3.4 % loss is the price of manufacturing simplicity.

**Example 2 — Rao contour turning angle**  
*Given:* Design \(p_e/p_c = 0.01\), \(\gamma=1.25\).  
*Find:* Initial wall angle after throat.  
Use Prandtl–Meyer function \(\nu(M)\).  
\(\nu_e - \nu_t = 42.3^\circ\).  
*Why:* The contour must turn the flow by exactly this angle before the last wave reaches the lip.  
**Final answer** initial angle \(= 26.1^\circ\)

**Example 3 — 80 % bell length calculation**  
*Given:* Optimum Rao length \(L_\text{opt} = 2.8\) m.  
*Find:* Truncated length.  
**Final answer** \(L = 0.8 \times 2.8 = 2.24\) m

**Example 4 — Thrust-coefficient comparison**  
*Given:* Same area ratio 45, conical \(\alpha=15^\circ\) versus 80 % bell.  
Conical \(C_F = 1.812\), 80 % bell \(C_F = 1.835\).  
*Why:* Residual divergence angle drops from 15° to ~10°.  
**Final answer** \(\Delta C_F = +0.023\) (1.27 % gain)

*Reflection:* The small percentage gain is decisive for upper-stage payload margins.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using conical \(\cos\alpha\) on a bell | Students forget bell exit angle is not constant     | Always compute local wall angle from the contour equation |
| Ignoring boundary-layer displacement | Effective throat area shrinks 1–2 %                 | Add 0.5–1 mm displacement thickness to \(A_t\)       |
| Assuming 80 % bell always optimal | Mission \(\Delta v\) and structural mass vary       | Run vehicle-level optimisation before fixing truncation |
| Forgetting over-expansion at sea level | Rao contour is vacuum-optimised                     | Check separation criterion \(p_w > 0.4 p_a\)         |
| Treating Rao contour as analytic  | It is generated numerically by MOC                    | Store the wall coordinates as a lookup table         |
| Neglecting manufacturing tolerance | ±0.2 mm error at throat changes \(\dot{m}\) 0.8 %   | Specify throat diameter tolerance ±0.05 mm           |

## 7. The textbook-precise statement
In Sutton & Biblarz, *Rocket Propulsion Elements*, 9e, §3.4, the nozzle contour is defined as the wall locus \(r(x)\) that satisfies the condition that every right-running characteristic of the Prandtl–Meyer expansion intersects the axis or the opposite wall at the design exit Mach number \(M_e\) with zero radial velocity component. The Rao optimum contour is the shortest such locus; any truncation at fraction \(\lambda < 1\) yields an exit flow angle distribution whose area-weighted average is \(\bar{\alpha}_e = (1-\lambda)\alpha_\text{max}\). All performance integrals are evaluated with the full axisymmetric Reynolds-averaged Navier–Stokes equations including boundary-layer displacement and non-equilibrium chemistry.

## 8. Visual

```text
          wall
     conical     bell (Rao)
        \         .__
         \       /   \
throat -> )-----/     \
         /     /       \
        /     /         \ exit
       /     /           \
      cone   bell         80% bell (truncated)
```

Axis: x downstream, r radial. Throat at x=0, r=r_t. Bell contour starts at ~26° and smoothly decreases to ~0° at exit; 80 % version stops at ~10°.

## 9. The memory technique
1. **The hook** — Picture a bell pepper: the full curved shape is the Rao contour; cutting the tip off at 80 % length gives the practical nozzle.
2. **What to overlearn** — \(C_F\) formula, \(\cos\alpha\) loss for cones, and the 0.8–1.5 % penalty for 80 % truncation.
3. **Spaced-repetition schedule** — Review the three geometries after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive divergence loss from the axial momentum integral \(\int p\,dA \cos\theta + \dot{m}v_e\cos\theta\).

## 10. What this unlocks
Mastery of nozzle geometry lets you size upper-stage nozzles for minimum dry mass, predict thrust-vector misalignment from asymmetric truncation, and design altitude-compensating nozzles.

- Next: flow separation criteria and side loads during startup
- Next: regenerative cooling channel layout inside bell walls
- Next: clustered nozzle plume interaction and base drag

## 11. Self-check — five questions, no answers
1. A conical nozzle with 15° half-angle and area ratio 50 operates in vacuum; calculate its divergence efficiency to three decimals.
2. Why does an 80 % bell still achieve >98 % of Rao optimum \(C_F\) despite 20 % length reduction?
3. Sketch the wall angle versus axial distance for conical, full Rao, and 80 % bell on the same axes.
4. If throat diameter tolerance increases from ±0.05 mm to ±0.2 mm, what happens to delivered specific impulse at fixed chamber pressure?
5. A vehicle trades 1.2 % \(I_{sp}\) for 18 % nozzle-mass reduction; under what mission \(\Delta v\) and structural-mass conditions is this trade favourable?