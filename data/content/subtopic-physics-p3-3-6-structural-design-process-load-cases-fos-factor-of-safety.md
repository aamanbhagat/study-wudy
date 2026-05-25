## What it is
The structural design process is the methodical approach used to ensure a spacecraft can survive the extreme physical forces it encounters from launch to orbit. A "load case" is a specific, worst-case combination of these forces—such as maximum aerodynamic pressure combined with peak engine thrust. The Factor of Safety (FOS) is a multiplier applied to these expected forces to guarantee the structure will not fail, even if materials are slightly weaker or forces are slightly higher than predicted.

## Why it matters
In aerospace, mass is money. Overbuilding a structure to make it "safe" wastes critical payload capacity, while underbuilding results in catastrophic failure. Mastering load cases and FOS allows engineers to thread this needle, optimizing the mass fraction of a rocket. This concept is the bedrock for all subsequent work in finite element analysis (FEA), materials selection, and systems engineering optimization.

## When to study it
You must have a solid grasp of Newtonian mechanics (statics and dynamics), specifically the ability to draw rigorous free-body diagrams. You must also understand solid mechanics, specifically the concepts of stress ($\sigma$) and strain ($\epsilon$), and material properties like Yield Strength ($\sigma_y$) and Ultimate Tensile Strength ($\sigma_u$). If you cannot calculate the axial stress on a rod under tension, review solid mechanics before proceeding.

## How to study it (step by step)
1. **Map the mission profile:** Write down every major mission event (engine ignition, Max-Q, stage separation, parachute deployment, splashdown). 
2. **Define the limit loads:** For each event, identify all external forces (thrust, drag, gravity, thermal expansion). The maximum expected force in reality is your "Limit Load."
3. **Construct load cases:** Combine forces that occur simultaneously. A load case is a superposition of forces at a specific instant (e.g., axial thrust + lateral wind shear + acoustic vibration).
4. **Determine material limits:** Identify the Yield Strength (where the material permanently bends) and Ultimate Strength (where it breaks) for your chosen material.
5. **Apply the FOS:** Multiply your Limit Loads by the required FOS to get your "Design Loads," or divide your material strength by the FOS to get your "Allowable Stress."
6. **Size the structure:** Calculate the required geometry (thickness, cross-sectional area) so that the stress from the Limit Load never exceeds the Allowable Stress.

## Key ideas, with intuition

**1. Limit Loads vs. Design Loads**
The *Limit Load* ($P_{limit}$) is the absolute maximum force the spacecraft will actually experience during a nominal mission. The *Design Load* ($P_{design}$) is a fictitious, inflated load used for sizing the structure.
$$ P_{design} = P_{limit} \times FOS $$

**2. The Aerospace FOS Philosophy**
In general engineering, FOS is defined as:
$$ FOS = \frac{\text{Material Capacity}}{\text{Maximum Expected Demand}} $$
Civil engineers building bridges use an FOS of 3.0 to 5.0 because they face high uncertainty in loads (weather, traffic) and material degradation over decades. Aerospace engineers use an incredibly tight FOS (typically 1.25 to 1.5). We can do this because we characterize our materials meticulously, simulate our flight environments obsessively, and simply cannot afford the mass of a bridge.

**3. Yield vs. Ultimate Failure Modes**
Spacecraft structures have two failure modes: yielding (bending permanently, which can misalign sensors or jam mechanisms) and ultimate failure (snapping, causing loss of vehicle). You must check your load cases against *both*, using different FOS values.
$$ FOS_{yield} = \frac{\sigma_y}{\sigma_{limit}} \ge 1.1 \text{ to } 1.25 $$
$$ FOS_{ultimate} = \frac{\sigma_u}{\sigma_{limit}} \ge 1.4 \text{ to } 1.5 $$
The structure's geometry must satisfy whichever constraint is stricter.

## Worked example
**Scenario:** You are designing a satellite payload adapter (a hollow cylindrical strut) supporting a satellite of mass $m$ during launch. 

**Given:** 
*   Satellite mass $m = 2000 \text{ kg}$
*   Max axial launch acceleration $a = 5g = 49.05 \text{ m/s}^2$
*   Material: Aluminum 7075-T6 ($\sigma_y = 500 \text{ MPa}$, $\sigma_u = 570 \text{ MPa}$)
*   Required FOS: $FOS_y = 1.25$, $FOS_u = 1.5$

**Task:** Find the minimum required cross-sectional area $A$ of the adapter.

**Step 1: Calculate the Limit Load (Force)**
$$ F_{limit} = m \cdot a = 2000 \text{ kg} \cdot 49.05 \text{ m/s}^2 = 98,100 \text{ N} $$

**Step 2: Calculate the Allowable Stresses**
We divide the material capabilities by their respective FOS to find the maximum stress we are *allowed* to design for.
Yield constraint: 
$$ \sigma_{allow, y} = \frac{\sigma_y}{FOS_y} = \frac{500 \text{ MPa}}{1.25} = 400 \text{ MPa} $$
Ultimate constraint: 
$$ \sigma_{allow, u} = \frac{\sigma_u}{FOS_u} = \frac{570 \text{ MPa}}{1.5} = 380 \text{ MPa} $$

**Step 3: Determine the driving constraint**
The ultimate constraint dictates a lower allowable stress ($380 \text{ MPa} < 400 \text{ MPa}$). Therefore, ultimate failure is the limiting factor. We must size the structure so stress does not exceed $380 \text{ MPa}$.

**Step 4: Calculate the required Area**
$$ \sigma = \frac{F}{A} \implies A = \frac{F_{limit}}{\sigma_{allow, u}} $$
$$ A = \frac{98,100 \text{ N}}{380 \times 10^6 \text{ N/m}^2} = 2.58 \times 10^{-4} \text{ m}^2 = 258 \text{ mm}^2 $$

*Reflection:* Notice how the ultimate FOS drove the design, not the yield FOS. If we had only checked yield, the area would have been $245 \text{ mm}^2$, which would have failed the ultimate FOS requirement ($570 / (98100/245) = 1.42 < 1.5$). Always check both.

## Diagrams

```text
Stress (σ)
  ^
  |                        * (Ultimate Strength, σ_u)
  |                       / \
  |                      /   \
  |                     /     \
  |            *-------* (Yield Strength, σ_y)
  |           /
  |          / <- Linear elastic region
  |         /
  |        * (Allowable Stress = σ_u / FOS_u)
  |       /
  |      * (Limit Stress from actual mission loads)
  |     /
  |    /
  +----------------------------------------> Strain (ε)
```
*Note: The Allowable Stress must always sit above the Limit Stress. The gap between them is your margin of safety.*

## Memory technique — remember this forever
1. **The Hook:** "Civil engineers build for their grandchildren (FOS=5); Aerospace engineers build for the launch window (FOS=1.25)." 
2. **Formulas to overlearn:** 
   $$ FOS = \frac{\text{Capacity}}{\text{Demand}} = \frac{\text{Material Strength}}{\text{Limit Stress}} $$
3. **Spaced-repetition schedule:** Review this concept and re-derive the worked example at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget how to apply FOS, go back to Newton's Second Law ($F=ma$). That gives your limit force. Stress is force over area ($\sigma = F/A$). FOS is simply the ratio of what the material can take versus what you are forcing it to take.

## Common mistakes
* **Double-dipping the FOS:** Students often multiply the Limit Load by the FOS, and *also* divide the Material Strength by the FOS. This applies the FOS twice, resulting in a massively overweight structure. Do one or the other.
* **Ignoring thermal loads:** In space, a structure facing the sun expands; the side in shadow contracts. If the structure is bolted down, this creates massive internal stresses. A load case is incomplete if it ignores thermal strain.
* **Checking only one failure mode:** As shown in the worked example, assuming yield strength will drive the design just because it happens first is a fatal error. 

## Self-check
1. Conceptually, if a spacecraft structure has an Ultimate FOS of 1.0, what exactly does this mean for the mission?
2. A titanium strut ($\sigma_y = 880 \text{ MPa}$, $\sigma_u = 950 \text{ MPa}$) experiences a limit load of $150 \text{ kN}$. If the cross-sectional area is $200 \text{ mm}^2$, calculate the actual Yield FOS and Ultimate FOS. Does it meet standard aerospace requirements ($FOS_y \ge 1.25, FOS_u \ge 1.5$)?
3. A rocket experiences maximum aerodynamic drag at $t = 60\text{s}$ (Max-Q) and maximum engine acceleration at $t = 150\text{s}$ (just before stage shutdown). Should you combine these two forces into a single load case to find the maximum stress? Why or why not?