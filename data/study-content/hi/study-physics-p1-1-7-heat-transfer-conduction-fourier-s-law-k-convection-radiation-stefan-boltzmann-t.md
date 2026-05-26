## 1. The one-sentence answer
**Heat transfer moves thermal energy via conduction (Fourier’s law with conductivity k), convection, and radiation (Stefan-Boltzmann law σT⁴).**

Conduction occurs when heat flows through a solid or stationary fluid because of a temperature gradient; the flux is directly proportional to that gradient. Convection adds bulk fluid motion that carries energy away from a surface. Radiation lets every surface above absolute zero emit electromagnetic waves whose power scales with the fourth power of absolute temperature.

Aap dekh sakte ho ki yeh teen mechanisms ek saath kaam karte hain rocket nozzles mein, jahaan wall conduction, exhaust gas convection, aur surface radiation teeno heat load decide karte hain.

> [!NOTE]
> The single deepest insight is that conduction and convection both need a medium while radiation travels through vacuum; once you separate these, every heat-shield or cryo-tank design becomes a controlled trade-off between the three.

## 2. Why this matters — concrete and current
SpaceX Starship uses a tiled heat shield whose outer surface radiates at ~1400 K while the tiles themselves conduct heat inward at a rate set by their low k; engineers iterate tile thickness using Fourier’s law to keep the aluminium tank below 450 K.

ISRO’s Gaganyaan crew module relies on ablative material that loses heat by both surface radiation (σT⁴) and internal convection through pyrolysis gases; the design margin is verified against measured k(T) curves.

Semiconductor fabs control wafer temperature during rapid thermal annealing with forced-convection nitrogen jets whose heat-transfer coefficient h is tuned so that conduction into the silicon sets the ramp rate, not radiation.

JWST’s sunshield layers stay below 50 K because radiation between successive Kapton membranes dominates; each layer’s emissivity and view factor are calculated from the Stefan-Boltzmann net-exchange equation.

Cryogenic LOX/LH2 tanks on Ariane 6 lose heat primarily by conduction through the foam insulation; measured k values at 20–90 K directly set boil-off rate and therefore mission duration.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Temperature gradient | Driving force in Fourier’s law                            |
| Energy conservation  | Links flux divergence to temperature change               |
| Black-body emissivity| Modifies Stefan-Boltzmann radiation term                  |
| Vector calculus (∇)  | Expresses conduction in 3-D geometries                    |
| Newton’s law of cooling | Gives the convective boundary condition                |

Agar gradient ya energy balance clear nahi hai to pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Heat flows from hot to cold
Aap dekhte ho ki jab ek metal rod ke ek end ko garam karte ho, doosra end bhi garam ho jaata hai. Heat energy high-temperature region se low-temperature region ki taraf move karti hai.  
Example: 1 cm copper rod whose left end is at 100 °C and right end at 20 °C feels hot at the right end within seconds.  
Formal statement: heat flux vector \(\mathbf{q}\) points opposite to \(\nabla T\).  
> [!WARNING] Agar aap flux ko temperature ke direction mein lete ho to sign error ho jaayega aur predicted heat flow galat direction mein hoga.

### Step 2 — Conduction flux is linear in the gradient
Experiment shows flux magnitude proportional to temperature drop per unit length.  
Example: doubling the temperature difference doubles the heat flow through the same rod.  
Fourier’s law:  
$$ \mathbf{q} = -k \nabla T $$  
where \(k\) is thermal conductivity (W m⁻¹ K⁻¹).  
> [!WARNING] k ko constant maan lene se variable-k materials (ceramics at high T) mein 20–30 % error aa sakta hai.

### Step 3 — Convection adds fluid motion
When fluid moves past a surface, bulk transport augments conduction at the wall.  
Example: blowing air over a hot plate cools it faster than still air.  
Convective flux at surface:  
$$ q'' = h (T_s - T_\infty) $$  
h depends on velocity, fluid properties and geometry.

### Step 4 — Radiation is independent of medium
Every surface emits electromagnetic waves; net exchange between two surfaces depends on T⁴ difference.  
Example: a satellite in deep space cools only by radiating to 3 K background.  
Stefan-Boltzmann law for a black body:  
$$ q'' = \sigma T^4 $$  
where \(\sigma = 5.67 \times 10^{-8}\) W m⁻² K⁻⁴. Real surfaces multiply by emissivity \(\varepsilon\).

### Step 5 — Energy balance closes the system
At steady state, divergence of total heat flux equals zero (no accumulation).  
Formal statement:  
$$ \nabla \cdot \mathbf{q}_\text{total} = 0 $$  
where \(\mathbf{q}_\text{total}\) includes conduction, convection and radiation contributions.

### Step 6 — Boundary conditions select the mechanism
A surface may have prescribed temperature, prescribed flux, convection, radiation, or any linear combination.  
Textbook-grade statement appears in Step 7.

## 5. Worked examples — har step show karo

**Example 1 — Copper rod conduction**  
*Given:* 0.5 m long copper rod, diameter 2 cm, k = 400 W m⁻¹ K⁻¹, ends at 80 °C and 20 °C.  
*Find:* steady heat transfer rate.  
Cross-section area \(A = \pi (0.01)^2 = 3.14 \times 10^{-4}\) m².  
Temperature gradient \(\frac{dT}{dx} = \frac{20-80}{0.5} = -120\) K m⁻¹.  
Fourier’s law gives \(q = -k A \frac{dT}{dx}\).  
Plug in numbers: \(q = 400 \times 3.14 \times 10^{-4} \times 120 = 15.07\) W.  
**15.07 W**  
*Reflection:* Linear gradient assumption holds only at steady state; transient problems need the heat equation.

**Example 2 — Convective cooling of a plate**  
*Given:* 0.2 m × 0.2 m plate at 80 °C in 20 °C air, h = 25 W m⁻² K⁻¹.  
*Find:* heat loss rate.  
Newton’s law: \(Q = h A \Delta T = 25 \times 0.04 \times 60 = 60\) W.  
**60 W**  
*Reflection:* h must be obtained from Nusselt-number correlations; guessing h is the most common source of error.

**Example 3 — Net radiation between two surfaces**  
*Given:* Two parallel black plates, T₁ = 800 K, T₂ = 300 K, area 1 m².  
*Find:* net heat transfer.  
Net flux \(q'' = \sigma (T_1^4 - T_2^4)\).  
\(\sigma T_1^4 = 5.67 \times 10^{-8} \times 800^4 = 23\,244\) W m⁻².  
\(\sigma T_2^4 = 460\) W m⁻².  
Net Q = 22 784 W.  
**22 784 W**  
*Reflection:* Emissivity < 1 or view factor < 1 immediately reduces this value.

**Example 4 — Combined modes on a spacecraft panel**  
*Given:* 1 m² panel, outer surface ε = 0.8, k = 1.5 W m⁻¹ K⁻¹, thickness 5 mm, inner fluid convection h = 50 W m⁻² K⁻¹, T_fluid = 300 K, space background 0 K. Outer surface temperature measured at 400 K.  
*Find:* inner fluid temperature needed for steady state.  
Radiation out: 0.8 × 5.67e-8 × 400⁴ = 2903 W.  
Conduction through panel equals this flux: q'' = k ΔT / L.  
Convection at inner surface: q'' = h (T_inner_surface – T_fluid).  
Matching fluxes yields T_fluid = 338.7 K.  
**338.7 K**  
*Reflection:* All three modes appear; changing any one parameter shifts the balance.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using room-temperature k at 1000 K| Tables list single value                    | Always use k(T) or temperature-averaged value        |
| Forgetting view factor in radiation | Students remember only σT⁴                  | Draw enclosure, compute F₁₂ before applying law      |
| Sign error in Fourier’s law       | ∇T direction confusion                      | Remember heat flows down the gradient, hence minus sign |
| Treating h as constant            | h depends on flow regime                    | Check Reynolds number and switch correlation         |
| Ignoring radiation in “low-temperature” problems | σT⁴ grows fast above 400 K               | Compare radiation and convection fluxes at operating T |
| Unit mismatch (W vs W m⁻²)        | Mixing flux and total heat                  | Always track per-unit-area versus total quantities   |
| Assuming black-body behaviour     | Real surfaces reflect                         | Multiply by ε and (1-ρ) terms                        |

## 7. The textbook-precise statement
In the absence of internal heat generation and at steady state, the heat flux satisfies  
\[ \nabla \cdot \mathbf{q} = 0, \]  
where Fourier’s law supplies the conductive contribution  
\[ \mathbf{q}_\text{cond} = -k \nabla T. \]  
Convective transport appears through the energy equation or as a boundary condition  
\[ -k \frac{\partial T}{\partial n} = h (T - T_\infty). \]  
Radiative exchange between opaque grey surfaces is expressed by the radiosity-irradiation formulation whose net flux is  
\[ q'' = \frac{\sigma (T^4 - T_\text{surr}^4)}{1/\varepsilon + (1-\varepsilon)A/A_\text{surr}}. \]  
All symbols retain their standard definitions; k may be temperature-dependent, h is obtained from appropriate Nusselt correlations, and view factors satisfy reciprocity and summation rules. (Incropera, DeWitt, Bergman & Lavine, *Fundamentals of Heat and Mass Transfer*, 7e, §1.2–1.6 & §13.1–13.3.)

## 8. Visual — diagram or schematic
```
Wall (T_s)          Fluid          Space (0 K)
   |------------------|------------->
   |  conduction      | convection   | radiation
   |  -k dT/dx        |  h(T_s-T∞)   | εσT_s⁴
   |<---------------->|<----------->|<-----------
```
Left arrow shows conductive flux inside solid; middle arrow shows convective removal by moving fluid; right arrow shows net radiation leaving the surface.

## 9. The memory technique
1. **The hook** — Picture three arrows leaving a hot surface: a straight arrow through the material (conduction), a swirling arrow in the fluid (convection), and a wavy arrow flying into space (radiation).  
2. **What to overlearn** — Fourier’s law \(\mathbf{q}=-k\nabla T\), Stefan-Boltzmann \(q''=\varepsilon\sigma T^4\), and the statement that radiation needs no medium.  
3. **Spaced-repetition schedule** — Review the three laws at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start from energy conservation on a thin slice, equate net flux to rate of energy change, then insert each transport mechanism.

## 10. What this unlocks
You can now size thermal protection systems, cryo-insulation, and high-temperature electronics.  
- Heat equation \(\partial T/\partial t = \alpha \nabla^2 T\) (next topic)  
- Nusselt-number correlations for forced and free convection  
- View-factor algebra and radiosity method for complex enclosures  
- Coupled conduction-radiation problems in participating media  

## 11. Self-check — five questions, no answers
1. A 10 cm stainless-steel plate (k = 15 W m⁻¹ K⁻¹) has surfaces at 500 K and 300 K. Compute conductive flux.  
2. Why does increasing emissivity from 0.3 to 0.8 raise radiative cooling more than it raises absorption when the surface faces deep space?  
3. A vertical hot plate in air shows measured h = 12 W m⁻² K⁻¹. If velocity doubles, what happens to h (qualitatively)?  
4. Identify the sign error in the statement “heat flux = +k dT/dx”.  
5. Two concentric spheres exchange heat only by radiation. Which surface temperature appears in the T⁴ term for the inner sphere’s net loss?