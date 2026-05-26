## 1. The one-sentence answer
**A converging-diverging nozzle converts pressure energy into directed kinetic energy by first accelerating subsonic flow to sonic speed at the throat and then further accelerating that flow to supersonic speeds in the diverging section.**

The geometry forces the flow to obey the area-Mach number relation derived from mass conservation and isentropic relations. When the pressure ratio across the nozzle is high enough, the throat becomes sonic; any additional expansion then occurs only in the diverging part, where increasing area produces increasing velocity for supersonic Mach numbers. Subsonic flow alone cannot exploit the diverging section for acceleration; it would instead decelerate there.

The nozzle therefore acts as a passive “Mach-number switch”: the same hardware produces entirely different flow regimes depending on the imposed back pressure.

> [!NOTE]
> The throat is the only place where sonic conditions can be maintained steadily; everywhere else the sign of (M² − 1) dictates whether the flow speeds up or slows down with area change.

## 2. Why this matters — concrete and current
SpaceX Merlin and Raptor engines use de Laval nozzles whose diverging sections are contoured to expand combustion gases from roughly Mach 1 at the throat to Mach 3–4 at the exit, converting chamber pressure into exhaust velocity above 3 km s⁻¹.  
NASA’s Parker Solar Probe heat shield tests relied on arc-jet facilities whose converging-diverging nozzles produce Mach 5–10 flows to simulate atmospheric entry heating.  
In semiconductor plasma etch tools, supersonic nozzle arrays deliver directed radicals at Mach 2–3 to improve anisotropy; Applied Materials patents describe precisely this geometry to reduce ion scattering.  
Ramjet and scramjet inlets on hypersonic vehicles (e.g., Boeing X-51) employ internal converging-diverging passages to decelerate captured air from supersonic flight speeds to subsonic combustor conditions, the inverse of the rocket nozzle process.  
High-power CO₂ laser cutting heads incorporate miniature de Laval nozzles to produce supersonic assist-gas jets that remove molten material faster than sonic nozzles of the same throat diameter.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Steady mass conservation \(\dot{m}=\rho A V=\) constant | Links area change directly to density and velocity change. |
| Isentropic relations \(p/\rho^\gamma=\) constant, \(T_0/T=1+(\gamma-1)M^2/2\) | Supply the thermodynamic closure that turns mass conservation into an area-Mach relation. |
| Definition of Mach number \(M=V/a\) | Determines whether the flow is subsonic or supersonic and therefore how area change affects speed. |
| Choked flow at \(M=1\) | Identifies the throat as the unique sonic station when the pressure ratio is sufficient. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Mass must be conserved in a variable-area duct
In steady flow the same mass crosses every station. If density were fixed, velocity would simply rise where area falls. Gases, however, change density when pressure and temperature change, so velocity change is no longer the reciprocal of area change.

Consider a duct whose area decreases by 10 %. If density stayed constant, velocity would rise 11 %. In reality density also rises, so velocity rises less than 11 %.

Formally,
\[
\rho A V=\text{constant}\implies\frac{d\rho}{\rho}+\frac{dA}{A}+\frac{dV}{V}=0.
\]

> [!WARNING]
> Treating density as constant (incompressible assumption) predicts the wrong sign of velocity change once \(M>0.3\).

### Step 2 — Speed of sound links pressure and density changes
Any pressure perturbation travels at the local speed of sound \(a=\sqrt{\gamma R T}\). The fractional density change produced by a pressure change is therefore
\[
\frac{d\rho}{\rho}=\frac{dp}{\gamma p}=M^2\frac{dp}{\rho V^2}.
\]

### Step 3 — Euler’s equation supplies the pressure-velocity link
Along a streamline, \(V\,dV=-dp/\rho\). Substituting the isentropic relation between \(dp\) and \(d\rho\) yields
\[
\frac{dV}{V}=\frac{-dp}{\rho V^2}.
\]

### Step 4 — Combine the three relations to obtain the area-velocity equation
Inserting the expressions from Steps 1–3 eliminates \(dp\) and produces
\[
\frac{dA}{A}=(M^2-1)\frac{dV}{V}.
\]

### Step 5 — Interpret the sign of \((M^2-1)\)
When \(M<1\), \((M^2-1)<0\); a converging duct (\(dA<0\)) forces \(dV>0\). When \(M>1\), \((M^2-1)>0\); a diverging duct (\(dA>0\)) forces \(dV>0\). At \(M=1\) the only way to keep the product finite is \(dA=0\), i.e., a throat.

### Step 6 — Locate the sonic throat and the supersonic acceleration region
For isentropic flow with a sufficient overall pressure ratio, the throat is the unique sonic station. The diverging section then accelerates the now-supersonic flow to the design exit Mach number fixed by the area ratio \(A_e/A^*\) via the isentropic area-Mach relation
\[
\frac{A}{A^*}=\frac{1}{M}\left[\frac{2+\,(\gamma-1)M^2}{\gamma+1}\right]^{\frac{\gamma+1}{2(\gamma-1)}}.
\]

## 5. Worked examples — every step shown

**Example 1 — Verify the area-velocity sign at low Mach**
*Given:* Air, \(\gamma=1.4\), \(M=0.3\), \(dA/A=-0.05\).
*Find:* Sign and approximate magnitude of \(dV/V\).

From the area-velocity equation
\[
\frac{dV}{V}=\frac{1}{M^2-1}\frac{dA}{A}.
\]
Substitute values:
\[
\frac{dV}{V}=\frac{1}{0.09-1}(-0.05)\approx0.055.
\]
*Why* — the negative denominator flips the sign of the area change, confirming acceleration in a contraction.

**Final answer:** \(dV/V\approx+0.055\) (velocity rises).

*Reflection* — the calculation recovers the familiar venturi effect; the same algebra later yields the opposite behaviour above Mach 1.

**Example 2 — Locate the throat Mach number for a given pressure ratio**
*Given:* Reservoir pressure 10 bar, back pressure 5 bar, \(\gamma=1.4\).
*Find:* Mach number at the minimum-area throat.

The critical pressure ratio for choking is
\[
\frac{p^*}{p_0}=\left(\frac{2}{\gamma+1}\right)^{\gamma/(\gamma-1)}\approx0.528.
\]
Here \(5/10=0.5<0.528\), so the throat is sonic, \(M_t=1\).

*Why* — any pressure ratio below the critical value forces the throat to remain at \(M=1\) while a normal shock stands in the diverging section.

**Final answer:** \(M_t=1\).

*Reflection* — choking is fixed solely by the stagnation-to-back pressure ratio; nozzle geometry only sets the location of sonic conditions.

**Example 3 — Calculate exit Mach number from area ratio**
*Given:* \(A_e/A^*=4.0\), \(\gamma=1.4\), isentropic flow.
*Find:* Exit Mach number \(M_e\).

Solve the area-Mach equation numerically or by table lookup. For \(\gamma=1.4\) the supersonic root is \(M_e\approx2.94\).

*Why* — the equation is transcendental; one root lies below unity (subsonic solution) and one above (supersonic solution). The supersonic root is selected when the nozzle is correctly expanded.

**Final answer:** \(M_e\approx2.94\).

*Reflection* — the same area ratio admits two mathematical solutions; only the boundary conditions decide which is realised.

**Example 4 — Determine exit pressure for perfect expansion**
*Given:* \(p_0=20\) bar, \(M_e=2.5\), \(\gamma=1.4\).
*Find:* Exit static pressure \(p_e\).

Use the isentropic pressure-Mach relation
\[
\frac{p_e}{p_0}=\left(1+\frac{\gamma-1}{2}M_e^2\right)^{-\gamma/(\gamma-1)}.
\]
Substitute:
\[
\frac{p_e}{p_0}=\left(1+0.2\times6.25\right)^{-3.5}\approx0.058.
\]
Thus \(p_e\approx1.16\) bar.

*Why* — perfect expansion occurs when \(p_e\) equals ambient pressure; any mismatch produces shock waves or expansion fans outside the nozzle.

**Final answer:** \(p_e\approx1.16\) bar.

*Reflection* — exit pressure is fixed once stagnation conditions and exit Mach number are known; geometry enters only through the area ratio that sets Mach.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming velocity always rises in a converging duct | Incompressible intuition carries over | Check \(M\) first; if \(M>1\) the sign reverses |
| Forgetting there are two isentropic solutions for a given area ratio | Algebraic equation is quadratic in \(M^2\) | Always solve both roots and select by back-pressure boundary condition |
| Treating throat pressure as fixed at \(p^*\) even when unchoked | Over-generalising the choking criterion | Compare actual \(p_b/p_0\) with critical ratio before setting \(M_t=1\) |
| Neglecting that normal shocks can stand inside the diverging section | Visualising only fully isentropic flow | Draw the full pressure-ratio operating curve; locate shock position from jump conditions |
| Using \(\gamma=1.4\) for hot combustion products | Defaulting to cold-air tables | Insert the local \(\gamma(T)\) or use \(\gamma=1.25\)–1.30 for typical rocket exhaust |
| Confusing mass-flow choking with “no flow can go faster” | Misreading the \(M=1\) singularity | Remember \(M>1\) is allowed only after the throat; mass flow is fixed once throat is sonic |
| Ignoring boundary-layer displacement in small nozzles | Viscous effects alter effective area | Add a displacement-thickness correction to the geometric contour |

## 7. The textbook-precise statement
For steady, one-dimensional, isentropic flow of a perfect gas with constant \(\gamma\) in a duct of slowly varying cross-section, the area-Mach number relation is
\[
\frac{A}{A^*}=\frac{1}{M}\left[\frac{1+\frac{\gamma-1}{2}M^2}{\frac{\gamma+1}{2}}\right]^{\frac{\gamma+1}{2(\gamma-1)}},
\]
where \(A^*\) is the sonic throat area. The flow is choked when the stagnation-to-back pressure ratio satisfies
\[
\frac{p_0}{p_b}\ge\left(\frac{\gamma+1}{2}\right)^{\gamma/(\gamma-1)}.
\]
Under these conditions the throat Mach number is unity and the diverging section may contain either isentropic supersonic flow or a normal shock, depending on the exact pressure ratio. (John D. Anderson, *Modern Compressible Flow*, 4e, §5.4–5.6.)

## 8. Visual — diagram or schematic
```text
          Reservoir          Throat          Exit
p0,T0 ───►───────────────►───────►───────────────►
          \             /       \               /
           \           /         \             /
            \         /           \           /
             \_______/             \_________/
                 Converging          Diverging
                    section            section
M ≈ 0          M increases → 1      M > 1 increases
A decreases               A min            A increases
```

## 9. The memory technique
**The hook** — picture a single traffic lane that narrows to a single point (throat) and then widens again; cars (fluid particles) crawl slowly before the bottleneck, reach maximum speed exactly at the pinch, and then accelerate further once they are past it and the road opens out—only possible if they are already moving faster than sound.

**What to overlearn** — (i) the area-velocity equation \(\frac{dA}{A}=(M^2-1)\frac{dV}{V}\); (ii) the critical pressure ratio 0.528 for \(\gamma=1.4\); (iii) the supersonic branch of the area-Mach relation for \(A/A^*=4\) yields \(M\approx2.94\).

**Spaced-repetition schedule** — review the area-velocity equation at 1 day, the choking criterion at 3 days, the full area-Mach formula at 7 days, a worked supersonic example at 16 days, and the operating-curve regimes at 35 days.

**First-principles fallback** — start from \(\rho A V=\) constant, insert \(dp=-\rho V\,dV\) and the isentropic speed of sound, and algebraically recover the area-velocity relation in under two minutes.

## 10. What this unlocks
Mastery of the de Laval nozzle supplies the physical mechanism that converts stagnation enthalpy into directed kinetic energy and therefore underpins every subsequent compressible-flow device that must cross sonic speed.  
- Normal-shock relations inside over-expanded nozzles  
- Method-of-characteristics contouring for shock-free expansion  
- Real-gas nozzle design codes used in liquid-rocket performance prediction  
- Inlet design for ramjets and the inverse problem of supersonic diffusers  
- Linearised theory of nozzle acoustic resonance and screech

## 11. Self-check — five questions, no answers
1. A converging-diverging nozzle with \(A_e/A^*=6\) is supplied with cold air at \(p_0=8\) bar. For what range of back pressures will the exit flow be supersonic and shock-free?  
2. Derive the throat-to-exit area ratio required to reach \(M_e=3.0\) with a gas of \(\gamma=1.3\).  
3. An engineer measures a mass-flow rate 8 % lower than the isentropic choked value. What single physical mechanism most likely explains the deficit?  
4. Sketch the static-pressure distribution along the nozzle axis for the four canonical regimes: (a) fully subsonic, (b) choked with shock in divergent section, (c) over-expanded, (d) under-expanded.  
5. A miniature nozzle in a vacuum chamber has a measured exit Mach number 15 % below the design value. Name two distinct, non-isentropic mechanisms that could produce this result and state which one would also reduce mass flow.