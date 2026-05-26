## 1. The one-sentence answer
**Thermal control in spacecraft uses multi-layer insulation (MLI), heaters, heat pipes and radiators to keep every component inside its allowed temperature window despite the vacuum of space.**

Spacecraft face direct solar flux on one side and deep-space cold (near 3 K) on the other; without atmosphere there is no convection, so heat moves only by conduction and radiation. MLI blankets cut radiative exchange by a factor of 20–50, heat pipes move heat passively over metres with almost no temperature drop, radiators reject waste heat as infrared, and heaters supply make-up power when the spacecraft is in eclipse. Together they create a stable thermal environment for electronics, propellants and optics.

> [!NOTE]
> The single most important insight is that every watt you cannot reject through a radiator must be balanced by heater power or insulation; on long-duration missions this energy budget often decides whether the spacecraft can survive eclipse seasons.

## 2. Why this matters — concrete and current
NASA’s James Webb Space Telescope uses a five-layer sunshield (a giant MLI system) to keep its instruments below 50 K while the sun-facing side reaches 380 K; without it the mid-infrared detectors would be swamped by their own thermal emission.  
SpaceX’s Starlink satellites employ ammonia heat pipes and deployable radiator panels to keep phased-array antennas within 0–60 °C while dissipating >1 kW of RF power in sunlight; the same design allows the constellation to operate through long eclipse periods without battery drain from heaters.  
ISRO’s Chandrayaan-2 orbiter carried variable-emittance radiators and MLI blankets around its propulsion bay; telemetry showed the system maintained hydrazine tanks between 10 °C and 50 °C even when the spacecraft passed through the Moon’s 14-day night.  
ESA’s Solar Orbiter uses high-temperature MLI and heat-pipe-linked radiators to survive 13 solar constants at perihelion; the same hardware later cools the spacecraft during the long cruise phase.  
Modern CubeSat constellations (Planet Labs) rely on simple black-anodised radiator faces plus polyimide MLI and survival heaters; thermal-vacuum test data show these low-cost choices keep commercial off-the-shelf electronics alive for five-plus years in LEO.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Stefan-Boltzmann law     | Radiative heat flux between surfaces scales with \(T^4\); MLI and radiator sizing rest on this. |
| Fourier’s conduction law | Heat pipes and structural mounts conduct heat; you must quantify conduction paths. |
| View factor (radiation)  | Effective emittance of MLI blankets and radiator view to space depend on geometry. |
| Phase-change heat transfer | Heat pipes rely on latent heat of vaporisation; you need the basic two-phase cycle. |
| Energy balance           | Steady-state temperature solves when absorbed solar + internal power = radiated power. |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Heat has nowhere to hide in vacuum
In vacuum the only steady-state way to lose heat is radiation. A surface at temperature \(T\) radiates \(\varepsilon\sigma T^4\) per unit area; it also absorbs a fraction of whatever incident flux reaches it.  
Example: a 1 m² black plate facing the Sun absorbs ~1366 W and must reach ~394 K to radiate the same power back.  
Formal statement: net radiative heat transfer from surface 1 to surface 2 is  
\[Q_{1\to2}=A_1F_{12}\sigma(T_1^4-T_2^4).\]  
> [!WARNING]
> Treating the spacecraft as if it were in air (adding convection) produces temperature predictions that are 50–100 K too low.

### Step 2 — MLI slashes the radiation term
Multi-layer insulation stacks 10–30 reflective foils separated by low-conductivity spacers. Effective emittance drops to \(\varepsilon_{\text{eff}}\approx\varepsilon/(N+1)\), where \(N\) is the number of layers.  
Example: ten-layer MLI with \(\varepsilon=0.03\) gives \(\varepsilon_{\text{eff}}\approx0.003\), cutting heat leak by an order of magnitude.  
Formal: heat flux through MLI between two boundaries is  
\[q=\frac{\sigma(T_h^4-T_c^4)}{\frac{1}{\varepsilon_h}+\frac{1}{\varepsilon_c}-1+(N-1)\frac{1}{\varepsilon_f}}.\]

### Step 3 — Heat pipes move heat without moving parts
A sealed tube contains a working fluid that evaporates at the hot end, travels as vapour, condenses at the cold end, and returns by capillary action. Effective conductivity can exceed 10 000 W m⁻¹ K⁻¹.  
Example: an ammonia heat pipe 1 m long carrying 50 W shows <2 K temperature drop.  
Formal: heat transport limit is set by capillary pressure balance  
\[\Delta P_{\text{cap}}\ge\Delta P_{\text{liquid}}+\Delta P_{\text{vapour}}.\]

### Step 4 — Radiators close the energy budget
Radiators are high-emittance surfaces whose only job is to emit \(Q=\varepsilon A\sigma T^4\). Their size is fixed by the maximum waste heat and the highest allowable temperature.  
Formal: required radiator area follows directly from  
\[A_{\text{rad}}=\frac{Q_{\text{waste}}}{\varepsilon\sigma T_{\text{max}}^4}.\]

### Step 5 — Heaters supply the deficit
When the spacecraft is in eclipse or points away from the Sun, internal dissipation may be insufficient. Electrical heaters (usually polyimide film) add controlled power.  
Formal: heater power \(P_h\) satisfies  
\[P_h+Q_{\text{internal}}=Q_{\text{MLI leak}}+Q_{\text{rad out}}.\]

### Step 6 — System-level thermal balance
All four elements are coupled through a single energy-balance equation for each node. Solving the resulting network gives the temperature map used for design verification.

## 5. Worked examples — har step show karo

**Example 1 — Simple black-body equilibrium**  
*Given:* 0.5 m² spacecraft face, \(\varepsilon=0.8\), solar constant 1366 W m⁻², albedo 0.3.  
*Find:* Equilibrium temperature.  
Absorbed power = \(1366\times0.5\times0.8\times(1+0.3)=707\) W.  
Radiated power = \(0.8\times0.5\times5.67\times10^{-8}T^4=707\).  
Solve \(T^4=3.12\times10^{10}\) → \(T=236\) K.  
*Why:* We equate absorbed solar to emitted radiation because steady state demands net heat zero.  
**Final answer** 236 K.  
*Reflection:* The calculation ignores internal power and view factors; real designs add both.

**Example 2 — MLI heat leak**  
*Given:* Two 1 m² surfaces, 20-layer MLI, \(\varepsilon=0.05\), \(T_h=300\) K, \(T_c=200\) K.  
*Find:* Heat flow through blanket.  
Use formula from Step 2: denominator = \(2/0.05-1+19\times(1/0.05)=798\).  
\(q=5.67\times10^{-8}(300^4-200^4)/798=3.9\) W m⁻².  
Total leak = 3.9 W.  
*Why:* Each extra foil adds one radiative resistance, reducing flux linearly with layer count.  
**Final answer** 3.9 W.  
*Reflection:* Real blankets also conduct through seams; this ideal result is a lower bound.

**Example 3 — Heat-pipe transport limit**  
*Given:* Ammonia heat pipe, 8 mm diameter, 1 m length, operating at 300 K.  
*Find:* Maximum power before dry-out.  
Capillary limit for ammonia at 300 K is ~0.25 W mm⁻² of wick cross-section.  
Wick area ≈ 12 mm² → \(Q_{\max}\approx3\) W.  
*Why:* Capillary pressure must overcome both liquid and vapour pressure drops; beyond this the wick dries.  
**Final answer** 3 W.  
*Reflection:* Real pipes often run at 30–50 % of this limit for margin.

**Example 4 — Radiator sizing with heater make-up**  
*Given:* 200 W internal dissipation, max allowable 320 K, \(\varepsilon=0.85\), eclipse factor 0.4.  
*Find:* Minimum radiator area and heater power in eclipse.  
Sunlit: \(A=200/(0.85\times5.67\times10^{-8}\times320^4)=0.48\) m².  
Eclipse: radiator still emits 200 W, so heater must supply 200 W.  
*Why:* The radiator area sized for sunlight becomes a heat sink in eclipse; heaters close the gap.  
**Final answer** 0.48 m² and 200 W heater.  
*Reflection:* Adding a variable-emittance coating or louvers can reduce heater demand.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using room-temperature emittance values for cryogenic MLI | Foil emittance drops at low T; students copy 300 K data | Measure or look up temperature-dependent \(\varepsilon(T)\) |
| Ignoring contact resistance in heat-pipe saddles | Mechanical joints dominate conduction path | Always include measured interface conductance (typically 500–2000 W m⁻² K⁻¹) |
| Sizing radiator only for BOL solar constant | EOL degradation and solar flares raise heat load | Apply 1.2–1.4 degradation factor on solar absorptance |
| Treating MLI as perfect insulator | Seams, penetrations and fasteners create shortcuts | Model each penetration as a separate conduction path |
| Forgetting heater duty-cycle limit | Continuous heater operation drains battery in long eclipse | Size heater power so duty cycle ≤30 % at end-of-life voltage |
| Using view factor = 1 for radiator to space | Earth or Moon can subtend large solid angle | Calculate actual view factor \(F_{\text{rad-space}}\) from geometry |

## 7. The textbook-precise statement
In steady state the energy balance for each isothermal node \(i\) of a spacecraft thermal network is  
\[\sum_j K_{ij}(T_i-T_j)+\sum_j R_{ij}\sigma(T_i^4-T_j^4)+Q_{\text{int},i}+Q_{\text{solar},i}+Q_{\text{heater},i}=0,\]  
where \(K_{ij}\) is the linear conduction coefficient, \(R_{ij}\) is the radiation exchange factor (including effective emittance of MLI), and all external fluxes are time-averaged over an orbit. The system is solved subject to the constraint that every component temperature lies inside its acceptance limits. (Fortescue, Stark & Swinerd, *Spacecraft Systems Engineering*, 4th ed., §12.4, Wiley, 2011.)

## 8. Visual — diagram or schematic
```
Spacecraft body (node T_b)
          │
   ┌──────┴──────┐
   │   MLI blanket (ε_eff=0.003)   │
   └──────┬──────┘
          │
   Heat pipe (ammonia) ───► Radiator panel (ε=0.85, A=0.5 m²)
          │
   Survival heater (film, 50 W)
```
The diagram shows the main heat flow path: internal dissipation → heat pipe → radiator, with MLI surrounding the body and a heater attached directly to the structure.

## 9. The memory technique
1. **The hook** — Picture a thermos flask (MLI) wrapped around a heat-pipe “highway” that ends in a black car radiator glowing in infrared; when the highway is dark, tiny electric blankets (heaters) keep the engine warm.  
2. **What to overlearn** — \(\varepsilon_{\text{eff}}=\varepsilon/(N+1)\), \(Q_{\text{rad}}=\varepsilon A\sigma T^4\), capillary limit equation.  
3. **Spaced-repetition schedule** — Review the three equations at 1 day, 3 days, 7 days, 16 days and 35 days after first study.  
4. **First-principles fallback** — If you forget the MLI formula, start from two-surface radiation resistance, add one resistance per foil, and divide the temperature difference by total resistance.

## 10. What this unlocks
Once you master spacecraft thermal control you can size complete thermal subsystems, perform TVAC test predictions, and design passive thermal louvers or variable-emittance coatings. The same network methods feed directly into:

- Coupled structural-thermal finite-element models
- Propulsion line thermal management (propellant freezing)
- Optical bench stability budgets for precision instruments
- Deep-space power-balance calculations for RTG versus solar-array trade studies

## 11. Self-check — five questions, no answers
1. A 10-layer MLI blanket has \(\varepsilon=0.02\); what is its effective emittance?  
2. Calculate the equilibrium temperature of a 0.2 m² radiator emitting 120 W with \(\varepsilon=0.9\).  
3. Why does increasing heater power in sunlight sometimes raise the required radiator area?  
4. A heat pipe shows 15 K temperature drop instead of the expected 2 K; list three possible physical causes.  
5. In a 90-minute LEO orbit with 35 min eclipse, size the minimum heater power needed to keep a 30 W instrument above 0 °C if the MLI leak is 8 W.