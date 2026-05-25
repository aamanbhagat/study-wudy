## 1. What it is — in plain English

Imagine a speed boat moving through water. As it picks up speed, it starts to push water out of the way, creating waves that spread outwards. These waves carry energy away from the boat, and the boat has to constantly expend energy to create them. That "lost" energy translates into a force pushing back on the boat, which we call drag.

Now, picture an airplane moving through the air. Air is a fluid, just like water, but it's compressible, meaning its density can change. When an airplane moves slowly, the air flows smoothly around it. But as the plane speeds up, especially as it approaches and exceeds the speed of sound, it starts to create "waves" in the air, similar to the boat. These aren't water waves, but rather pressure waves, or more dramatically, **shock waves**.

These shock waves are like sudden, invisible "walls" of compressed air. They form because the air can't get out of the way fast enough, or smoothly enough, for the plane. Just like the boat's waves, these shock waves carry energy away from the aircraft. The energy required to create and sustain these shock waves is extracted from the aircraft's motion, resulting in a significant increase in drag. This specific type of drag, caused by the formation of these powerful pressure waves, is called **wave drag**.

## 2. Why it matters — real-world applications

Wave drag is a critical phenomenon that dictates the design and performance limits of high-speed aircraft and spacecraft. Ignoring it would lead to inefficient, underperforming, or even unsafe designs.

1.  **Supersonic Aircraft Design (e.g., F-22 Raptor, Dassault Rafale):** Military fighter jets are designed to operate efficiently at supersonic speeds. Minimizing wave drag is paramount for achieving high speeds, long range, and maneuverability. Designers use techniques like highly swept wings, slender fuselages, and careful shaping (Area Rule) to reduce the strength and number of shock waves generated, thereby cutting down on wave drag.
2.  **Commercial Supersonic Transport (e.g., Concorde, Boom Supersonic Overture):** The Concorde famously faced immense wave drag challenges, especially in the transonic regime (around Mach 1). This "drag rise" required significant engine thrust to overcome, making it fuel-inefficient for sustained supersonic flight. New designs like the Boom Overture are attempting to mitigate wave drag through advanced aerodynamic shaping and materials to make supersonic commercial travel economically viable again.
3.  **Rocket Launch and Re-entry Vehicles (e.g., SpaceX Starship, Apollo Capsules):** During launch, rockets quickly pass through the transonic and supersonic regimes. Their aerodynamic profiles are designed to minimize wave drag during this phase to conserve fuel and maximize payload. During atmospheric re-entry, spacecraft experience extreme speeds (hypersonic) where wave drag is a dominant force, contributing to both deceleration and aerodynamic heating. The blunt shapes of re-entry capsules, while increasing drag, help to push the shock wave further away, protecting the vehicle from the most intense heat.
4.  **Sonic Boom Mitigation:** Wave drag is intrinsically linked to the generation of sonic booms. The energy dissipated in shock waves is what creates the loud "boom" heard on the ground. Understanding and minimizing wave drag helps engineers design "low-boom" aircraft, which is crucial for future supersonic flight over land, as current regulations often prohibit it due to noise pollution. This involves shaping aircraft to spread the shock waves over a larger area or weaken them.

## 3. Prerequisites — what you must know first

To fully grasp wave drag, you need a solid understanding of fundamental fluid dynamics and compressible flow concepts. If any of these are unfamiliar, pause and review them.

*   **Fluid Dynamics Basics:** Understanding concepts like pressure, density, velocity, and how they relate in a moving fluid.
*   **Compressible Flow:** The study of fluid flow where density changes are significant, typically when fluid velocity approaches or exceeds the speed of sound.
*   **Speed of Sound ($a$):** The speed at which small disturbances (like sound waves) propagate through a medium. $a = \sqrt{\gamma RT}$ for an ideal gas.
*   **Mach Number ($M$):** The ratio of the flow speed ($V$) to the local speed of sound ($a$). $M = V/a$. It's the most critical parameter in compressible flow.
*   **Subsonic Flow ($M < 1$):** Flow where the fluid speed is less than the speed of sound. Disturbances can propagate upstream.
*   **Transonic Flow ($M \approx 1$):** Flow where parts of the flow field are subsonic and parts are supersonic. This regime is particularly complex and challenging.
*   **Supersonic Flow ($M > 1$):** Flow where the fluid speed is greater than the speed of sound. Disturbances cannot propagate upstream.
*   **Shock Waves:** Extremely thin regions (on the order of micrometers) of abrupt, nearly discontinuous change in fluid properties (pressure, temperature, density, velocity) that occur in compressible flow when the flow decelerates from supersonic to subsonic speeds. They are inherently irreversible.
*   **Expansion Waves (Prandtl-Meyer Expansion):** The opposite of shock waves; gradual (or sometimes abrupt at a sharp corner) regions where supersonic flow accelerates and turns around a convex corner, leading to a decrease in pressure, temperature, and density.
*   **Isentropic Flow:** An idealized flow that is both adiabatic (no heat exchange) and reversible (no friction or other dissipative effects). Total pressure and entropy remain constant in isentropic flow.
*   **Normal Shock Relations:** A set of equations derived from conservation laws (mass, momentum, energy) that describe the changes in fluid properties (Mach number, pressure, temperature, density, total pressure) across a shock wave that is perpendicular to the flow direction.
*   **Oblique Shock Relations:** Similar to normal shock relations but for shock waves that are inclined at an angle to the flow direction. These are more general and common in supersonic flight.
*   **Total Pressure ($P_0$):** The pressure a flow would have if it were brought to rest isentropically. It's a measure of the total mechanical energy of the flow. Loss of total pressure across a shock is a key indicator of energy dissipation.
*   **Entropy ($s$):** A thermodynamic property that measures the disorder or unavailability of energy in a system. Shock waves always increase entropy.
*   **Lift and Drag:** The fundamental aerodynamic forces. Drag is the component parallel to the freestream velocity, opposing motion.

## 4. The core idea — step by step

Wave drag arises from the irreversible processes associated with shock waves. Let's break down how this happens.

### Step 1: The Sound Barrier & Local Supersonic Flow

*   **Plain English:** Even when an aircraft is flying slower than the speed of sound (subsonic), the air accelerating over curved surfaces, like the top of a wing or the nose of a fuselage, can locally reach supersonic speeds. Think of water speeding up as it goes over a hump.
*   **Concrete Example:** An airplane flying at $M_{\infty} = 0.8$ (80% of the speed of sound). As air flows over the curved upper surface of the wing, it accelerates. Due to Bernoulli's principle for incompressible flow (or more accurately, the compressible flow equivalent), this acceleration leads to a decrease in local pressure. This acceleration can push the local flow speed past the local speed of sound, creating a pocket of supersonic flow ($M_{local} > 1$) on the wing's surface, even though the aircraft itself is still subsonic.
*   **Formal/Mathematical Version:** For an airfoil, the local Mach number $M_{local}$ at a point on the surface can be significantly higher than the freestream Mach number $M_{\infty}$. This local acceleration is governed by the conservation of mass and energy. When $M_{\infty}$ approaches a critical value (the critical Mach number, $M_{crit}$), $M_{local}$ at some point on the airfoil will reach 1. As $M_{\infty}$ increases beyond $M_{crit}$, regions of $M_{local} > 1$ develop.
*   **What could go wrong:** Students might mistakenly believe that shock waves only form when the entire aircraft is flying supersonically. Local supersonic regions are the key to understanding transonic wave drag.

### Step 2: Formation of Shock Waves

*   **Plain English:** Once a pocket of air is flowing supersonically, it needs to slow down to match the subsonic flow behind it. Supersonic flow cannot smoothly decelerate back to subsonic speeds without a sudden, violent "jump" – this jump is a shock wave.
*   **Concrete Example:** On an airfoil with a local supersonic region, this region typically terminates with a normal shock wave (perpendicular to the surface). The flow enters the shock supersonically and exits subsonically, experiencing a sudden increase in pressure and temperature, and a decrease in velocity.
*   **Formal/Mathematical Version:** When a supersonic flow encounters an adverse pressure gradient (an increase in pressure) that is too strong for it to turn smoothly, a shock wave forms. For a normal shock, the upstream Mach number $M_1 > 1$ and the downstream Mach number $M_2 < 1$. The Rankine-Hugoniot relations (derived from conservation of mass, momentum, and energy across the shock) define the property changes. A key result is that total pressure $P_0$ decreases across a shock.
    $$ \frac{P_{02}}{P_{01}} = \left[ \frac{(\frac{\gamma+1}{2})M_1^2}{1 + \frac{\gamma-1}{2}M_1^2} \right]^{\frac{\gamma}{\gamma-1}} \left[ \frac{2\gamma}{\gamma+1}M_1^2 - \frac{\gamma-1}{\gamma+1} \right]^{-\frac{1}{\gamma-1}} $$
    where $\gamma$ is the ratio of specific heats. Since $P_{02} < P_{01}$, there is an irreversible loss.
*   **What could go wrong:** Assuming shocks are always normal. While normal shocks are a good starting point, oblique shocks are more common in supersonic flow over complex geometries.

### Step 3: Energy Loss and Drag

*   **Plain English:** Shock waves are inherently "messy" and irreversible. They convert some of the organized kinetic energy of the flow into disorganized thermal energy (heat). This loss of usable energy from the flow means that the aircraft has to continuously put in more energy (thrust) to maintain its speed, which we perceive as drag.
*   **Concrete Example:** Imagine pushing a cart up a hill. If the cart suddenly hits a patch of very rough terrain that slows it down and heats up its wheels, you have to push harder to maintain the same average speed. The "rough terrain" is analogous to the shock wave, dissipating energy. For an aircraft, this energy dissipation means increased fuel consumption to overcome the wave drag.
*   **Formal/Mathematical Version:** The irreversibility of a shock wave is quantified by an increase in entropy ($s_2 > s_1$) and a decrease in total pressure ($P_{02} < P_{01}$). The total pressure loss directly translates to a loss of available energy to do work, thus requiring more thrust. The drag force $D$ is related to the pressure distribution over the body. When a shock forms, the pressure distribution changes dramatically, leading to a significant increase in the pressure drag component.
    $$ D_{wave} = \oint_S (P_2 - P_1) \cdot \vec{n} \cdot d\vec{A} $$
    where $P_2$ is the higher pressure downstream of the shock, $P_1$ is the lower pressure upstream, and $\vec{n}$ is the surface normal.
*   **What could go wrong:** Confusing wave drag with other forms of drag like skin friction drag (due to viscosity) or induced drag (due to lift). While all contribute to total drag, wave drag has a distinct physical origin related to shock formation.

### Step 4: Transonic Wave Drag (The "Drag Rise")

*   **Plain English:** As an aircraft accelerates from high subsonic speeds ($M \approx 0.7-0.8$) towards the speed of sound ($M=1$), the local supersonic regions on its surfaces grow larger and stronger. The shock waves associated with them also become stronger and move rearward. This leads to a dramatic and rapid increase in drag, often called the "drag rise" or "sonic barrier."
*   **Concrete Example:** The graph of an aircraft's drag coefficient ($C_D$) versus Mach number shows a sharp increase starting around $M=0.8$ and peaking around $M=1.0-1.2$. This is the "drag rise." The Concorde famously needed its afterburners (thrust augmentation) to push through this high-drag region.
*   **Formal/Mathematical Version:** The drag coefficient $C_D$ experiences a rapid increase in the transonic regime. This is due to the increasing strength and extent of the shock waves, which cause larger total pressure losses and can also lead to boundary layer separation downstream of the shock, further increasing drag.
    $$ C_D = C_{D,0} + C_{D,i} + C_{D,wave} $$
    where $C_{D,0}$ is parasite drag (skin friction + form drag), $C_{D,i}$ is induced drag, and $C_{D,wave}$ is wave drag. $C_{D,wave}$ becomes very significant in the transonic regime.
*   **What could go wrong:** Underestimating the magnitude of the drag rise. It's not a gradual increase; it's a very steep penalty that must be overcome.

### Step 5: Supersonic Wave Drag (Attached Shocks)

*   **Plain English:** Once the aircraft is fully supersonic ($M > 1.2$), the flow pattern changes. Instead of local shocks on surfaces, a large, stable shock wave (or system of waves) forms at the nose of the aircraft and at any sharp corners. These shocks are typically oblique (angled) rather than normal. They are still irreversible and cause drag, but the flow behind them remains supersonic, and the drag increase is usually less abrupt than the transonic drag rise.
*   **Concrete Example:** A supersonic fighter jet has a pointed nose and sharp leading edges. An oblique shock wave forms at the nose, and other oblique shocks or expansion waves form at changes in geometry (e.g., wing leading edge, engine inlets). The pressure difference across these shocks still contributes to wave drag.
*   **Formal/Mathematical Version:** For a slender body in supersonic flow, the wave drag can be estimated using linearized supersonic flow theory (for small perturbations) or by integrating the pressure distribution across the body, which is determined by the system of oblique shocks and Prandtl-Meyer expansion waves. The drag is primarily due to the pressure difference across these waves acting on the body's surface. For a simple wedge, the pressure rise across the oblique shock creates a net force in the drag direction.
*   **What could go wrong:** Believing that once past the "sound barrier," wave drag disappears. It merely changes its character and is still a significant factor in supersonic flight.

### Step 6: Minimizing Wave Drag

*   **Plain English:** Engineers use clever shapes to reduce wave drag. This involves making aircraft "slippery" to shock waves, either by making them weaker or by arranging them in a way that causes less energy loss.
*   **Concrete Example:**
    *   **Swept Wings:** Wings are angled backward (swept) so that the component of the freestream velocity perpendicular to the wing's leading edge is reduced, effectively making the wing "see" a lower Mach number. This delays the onset of the drag rise.
    *   **Slender Bodies:** Making aircraft bodies long and thin, like a needle, reduces the strength of the shock waves they generate.
    *   **Area Rule:** This principle states that for minimum wave drag at transonic speeds, the cross-sectional area distribution of the aircraft (including the fuselage, wings, and other components) should change smoothly along its length, like a Sears-Haack body. This often results in a "waisted" fuselage where the wings attach.
    *   **Thin Airfoils:** Using very thin wings helps reduce the local acceleration and thus the strength of the shocks.
*   **Formal/Mathematical Version:** The Area Rule, proposed by Richard Whitcomb, suggests that the wave drag of a body at transonic speeds is primarily dependent on the longitudinal distribution of its cross-sectional area perpendicular to the flow, rather than its specific shape. By smoothing this area distribution, the formation of strong, localized normal shocks can be avoided or weakened, leading to a reduction in total pressure losses.
*   **What could go wrong:** Thinking that minimizing wave drag is a single design fix. It's a complex interplay of many aerodynamic principles and compromises.

## 5. Worked examples — multiple, with every step shown

We will use $\gamma = 1.4$ for air in these examples.

### Example 1 (Easy): Normal Shock Pressure Loss

**Problem:** An aircraft encounters a normal shock wave where the upstream Mach number is $M_1 = 1.5$. Calculate the ratio of the total pressure downstream of the shock to the total pressure upstream, $P_{02}/P_{01}$.

**Given:**
*   Upstream Mach number, $M_1 = 1.5$
*   Ratio of specific heats, $\gamma = 1.4$

**Want:**
*   Ratio of total pressures, $P_{02}/P_{01}$

**Solution:**

We use the formula for the total pressure ratio across a normal shock:
$$ \frac{P_{02}}{P_{01}} = \left[ \frac{(\frac{\gamma+1}{2})M_1^2}{1 + \frac{\gamma-1}{2}M_1^2} \right]^{\frac{\gamma}{\gamma-1}} \left[ \frac{2\gamma}{\gamma+1}M_1^2 - \frac{\gamma-1}{\gamma+1} \right]^{-\frac{1}{\gamma-1}} $$

**Step 1: Substitute the given values into the formula.**
$$ \frac{P_{02}}{P_{01}} = \left[ \frac{(\frac{1.4+1}{2})(1.5)^2}{1 + \frac{1.4-1}{2}(1.5)^2} \right]^{\frac{1.4}{1.4-1}} \left[ \frac{2(1.4)}{1.4+1}(1.5)^2 - \frac{1.4-1}{1.4+1} \right]^{-\frac{1}{1.4-1}} $$
*This is the initial setup, plugging in all the numbers.*

**Step 2: Simplify the terms inside the brackets.**
First bracket, numerator:
$$ (\frac{1.4+1}{2})(1.5)^2 = (\frac{2.4}{2})(2.25) = 1.2 \times 2.25 = 2.7 $$
*Calculating the numerator of the first large bracket.*

First bracket, denominator:
$$ 1 + \frac{1.4-1}{2}(1.5)^2 = 1 + \frac{0.4}{2}(2.25) = 1 + 0.2 \times 2.25 = 1 + 0.45 = 1.45 $$
*Calculating the denominator of the first large bracket.*

So the first bracket becomes:
$$ \left[ \frac{2.7}{1.45} \right]^{\frac{1.4}{0.4}} = \left[ 1.86206896... \right]^{3.5} $$
*Simplifying the first large bracket and its exponent.*

Second bracket, first term:
$$ \frac{2(1.4)}{1.4+1}(1.5)^2 = \frac{2.8}{2.4}(2.25) = 1.1666... \times 2.25 = 2.625 $$
*Calculating the first term inside the second large bracket.*

Second bracket, second term:
$$ \frac{1.4-1}{1.4+1} = \frac{0.4}{2.4} = 0.1666... $$
*Calculating the second term inside the second large bracket.*

So the second bracket becomes:
$$ \left[ 2.625 - 0.1666... \right]^{-\frac{1}{0.4}} = \left[ 2.458333... \right]^{-2.5} $$
*Simplifying the second large bracket and its exponent.*

**Step 3: Calculate the powers and multiply.**
$$ \frac{P_{02}}{P_{01}} = (1.86206896...)^{3.5} \times (2.458333...)^{-2.5} $$
$$ (1.86206896...)^{3.5} \approx 6.0022 $$
$$ (2.458333...)^{-2.5} = \frac{1}{(2.458333...)^{2.5}} \approx \frac{1}{9.5937} \approx 0.10423 $$
*Performing the exponentiation for both terms.*

$$ \frac{P_{02}}{P_{01}} = 6.0022 \times 0.10423 \approx 0.6256 $$
*Multiplying the results to get the final ratio.*

**Final Answer:**
$$ \boxed{\frac{P_{02}}{P_{01}} \approx 0.626} $$

**Reflection:** This example demonstrates that even for a relatively low supersonic Mach number of 1.5, a normal shock wave causes a significant loss of total pressure (about 37.4%). This lost total pressure translates directly to energy dissipation, which must be overcome by the aircraft's propulsion system, contributing to wave drag. The complexity of the formula highlights the non-linear nature of compressible flow phenomena.

### Example 2 (Medium): Wave Drag on a Supersonic Wedge

**Problem:** A thin wedge airfoil with a half-angle of $\delta = 10^\circ$ is placed in a supersonic freestream of $M_{\infty} = 2.0$ at zero angle of attack. The freestream static pressure is $P_{\infty} = 50 \text{ kPa}$. Assume the flow creates attached oblique shock waves at the leading edge. Calculate the wave drag coefficient $C_D$ for the wedge. Assume the chord length is $c$ and the span is $b$.

**Given:**
*   Freestream Mach number, $M_{\infty} = M_1 = 2.0$
*   Wedge half-angle, $\delta = 10^\circ$
*   Freestream static pressure, $P_{\infty} = P_1 = 50 \text{ kPa}$
*   Ratio of specific heats, $\gamma = 1.4$
*   Zero angle of attack (symmetric flow)

**Want:**
*   Wave drag coefficient, $C_D$

**Solution:**

For a symmetric wedge at zero angle of attack in supersonic flow, oblique shocks form at the leading edge. The pressure on the upper and lower surfaces behind these shocks will be the same, say $P_2$. The drag arises from the pressure difference between the front and back of the wedge, projected onto the direction of motion. However, for a simple wedge, the pressure on the inclined surfaces is what creates the drag component.

The drag force $D$ per unit span is given by the pressure acting on the inclined surfaces.
$D = 2 \times (P_2 \cdot (\text{surface area}) \cdot \sin(\delta))$
For a unit span, surface area of one side is $c/(\cos \delta)$.
So, $D = 2 \times P_2 \times \frac{c}{\cos \delta} \times \sin \delta = 2 P_2 c \tan \delta$.
However, the wave drag is specifically the *additional* drag due to the pressure rise over the wedge. The drag force is the sum of the horizontal components of the pressure forces acting on the wedge surfaces.
For a thin wedge, the pressure $P_2$ acts perpendicular to the surface. The component of this force in the freestream direction (drag direction) is $P_2 A_s \sin \delta$, where $A_s$ is the surface area of one side.
Total drag $D = 2 \times (P_2 \times (c/\cos\delta) \times \sin\delta)$ for a unit span wedge.
This is $2 P_2 c \tan \delta$.
The drag coefficient is $C_D = D / (0.5 \rho_{\infty} V_{\infty}^2 c)$.
Since $0.5 \rho_{\infty} V_{\infty}^2 = 0.5 \rho_{\infty} M_{\infty}^2 a_{\infty}^2 = 0.5 \rho_{\infty} M_{\infty}^2 (\gamma R T_{\infty}) = 0.5 \gamma P_{\infty} M_{\infty}^2$.
So, $C_D = (2 P_2 c \tan \delta) / (0.5 \gamma P_{\infty} M_{\infty}^2 c) = (4 P_2 \tan \delta) / (\gamma P_{\infty} M_{\infty}^2)$.
Wait, this is the total pressure drag. Wave drag is usually defined as the drag from the pressure acting on the *front* surfaces that are angled into the flow.

Let's refine the drag calculation for a wedge. The pressure $P_2$ acts normal to the surface. The drag contribution from one side is $P_2 \cdot (\text{length of slanted surface}) \cdot \sin(\delta)$.
For a chord $c$ and half-angle $\delta$, the length of the slanted surface is $c_s = c / \cos(\delta)$.
So the drag force per unit span from the upper and lower surfaces *combined* is:
$D = 2 \times P_2 \times (c/\cos\delta) \times \sin\delta = 2 P_2 c \tan\delta$.
This is the total pressure drag. To find the wave drag, we need to find $P_2$.

**Step 1: Determine the oblique shock wave angle ($\beta$) for the given conditions.**
We use the $\theta-\beta-M$ relation for oblique shocks. For $\theta = \delta = 10^\circ$ and $M_1 = 2.0$, we need to solve for $\beta$. The implicit equation is:
$$ \tan \theta = \frac{2 \cot \beta (M_1^2 \sin^2 \beta - 1)}{M_1^2 (\gamma + \cos 2\beta) + 2} $$
*This is the fundamental relation linking the turning angle ($\theta$), shock angle ($\beta$), and upstream Mach number ($M_1$). Solving this directly for $\beta$ is complex, often requiring iterative methods or lookup tables/charts (like the oblique shock chart).*

Using an oblique shock calculator or table for $M_1 = 2.0$ and $\theta = 10^\circ$ (which is $\delta$ in this case), we find two possible solutions for $\beta$: a weak shock and a strong shock. For external flow over a wedge, the weak shock solution is physically observed.
For $M_1 = 2.0$ and $\delta = 10^\circ$:
$\beta \approx 39.3^\circ$ (weak shock)
*This step requires external tools or pre-computed tables, as solving the cubic equation for $\cot \beta$ is non-trivial.*

**Step 2: Calculate the Mach number downstream of the oblique shock ($M_2$).**
First, find the normal component of the upstream Mach number:
$$ M_{1n} = M_1 \sin \beta = 2.0 \sin(39.3^\circ) = 2.0 \times 0.6333 \approx 1.2666 $$
*The component of Mach number perpendicular to the shock determines the shock strength.*

Now, use the normal shock relation for $M_2$:
$$ M_2^2 = \frac{M_{1n}^2 + \frac{2}{\gamma-1}}{\frac{2\gamma}{\gamma-1}M_{1n}^2 - 1} $$
$$ M_2^2 = \frac{(1.2666)^2 + \frac{2}{1.4-1}}{\frac{2(1.4)}{1.4-1}(1.2666)^2 - 1} = \frac{1.6042 + 5}{7(1.6042) - 1} = \frac{6.6042}{11.2294 - 1} = \frac{6.6042}{10.2294} \approx 0.6456 $$
$$ M_2 = \sqrt{0.6456} \approx 0.8035 $$
*This $M_2$ is the Mach number *normal* to the shock. We need the Mach number *parallel* to the surface.*

The Mach number downstream of the oblique shock, parallel to the surface, is:
$$ M_2 = \frac{M_{1n}}{\sin(\beta - \delta)} \text{ or } M_2 = \frac{M_1 \cos \beta}{\cos(\beta - \delta)} $$
Let's use the relation for $M_2$ directly from oblique shock relations:
$$ M_{2t} = M_1 \cos \beta = 2.0 \cos(39.3^\circ) = 2.0 \times 0.7737 \approx 1.5474 $$
$$ M_2 = \sqrt{M_{2n}^2 + M_{2t}^2} $$
The Mach number normal to the shock after the shock is $M_{2n} = \sqrt{\frac{M_{1n}^2 + (\frac{2}{\gamma-1})}{(\frac{2\gamma}{\gamma-1})M_{1n}^2 - 1}} = \sqrt{\frac{1.2666^2 + 5}{7(1.2666^2)-1}} = \sqrt{\frac{1.6042+5}{7(1.6042)-1}} = \sqrt{\frac{6.6042}{11.2294-1}} = \sqrt{\frac{6.6042}{10.2294}} \approx \sqrt{0.6456} \approx 0.8035$.
So, $M_2$ (the Mach number in the flow direction after the shock) is:
$$ M_2 = \sqrt{M_{2n}^2 + M_{1t}^2} = \sqrt{(0.8035)^2 + (1.5474)^2} = \sqrt{0.6456 + 2.3944} = \sqrt{3.04} \approx 1.743 $$
*This is the actual Mach number of the flow parallel to the wedge surface after the shock.*

**Step 3: Calculate the static pressure downstream of the oblique shock ($P_2$).**
Use the normal shock pressure ratio:
$$ \frac{P_2}{P_1} = 1 + \frac{2\gamma}{\gamma+1}(M_{1n}^2 - 1) $$
$$ \frac{P_2}{P_1} = 1 + \frac{2(1.4)}{1.4+1}((1.2666)^2 - 1) = 1 + \frac{2.8}{2.4}(1.6042 - 1) = 1 + 1.1666 \times 0.6042 = 1 + 0.7049 = 1.7049 $$
*This calculates the pressure jump across the shock, which is crucial for drag.*

$$ P_2 = P_1 \times 1.7049 = 50 \text{ kPa} \times 1.7049 = 85.245 \text{ kPa} $$
*The pressure on the wedge surface is significantly higher than the freestream pressure.*

**Step 4: Calculate the wave drag force per unit span ($D/b$).**
The pressure $P_2$ acts perpendicular to the wedge surface. The component of this pressure force in the freestream direction (drag direction) is $P_2 \sin \delta$ per unit area.
The total drag force per unit span ($b$) is the sum of these components from the upper and lower surfaces.
For a wedge of chord $c$, the length of the inclined surface is $c_s = c / \cos \delta$.
So, $D/b = 2 \times (P_2 \times c_s \times \sin \delta)$
$$ D/b = 2 \times P_2 \times \frac{c}{\cos \delta} \times \sin \delta = 2 P_2 c \tan \delta $$
$$ D/b = 2 \times (85.245 \text{ kPa}) \times c \times \tan(10^\circ) $$
$$ D/b = 2 \times 85.245 \times c \times 0.1763 = 30.07 \times c \text{ kPa} $$
*This is the drag force in terms of $c$. Note that the trailing edge of the wedge would have expansion waves, but for a simple "wave drag" calculation, we often consider only the leading edge contribution or the pressure difference across the body.*

**Step 5: Calculate the freestream dynamic pressure ($q_{\infty}$).**
$$ q_{\infty} = \frac{1}{2} \rho_{\infty} V_{\infty}^2 = \frac{1}{2} \rho_{\infty} (M_{\infty} a_{\infty})^2 = \frac{1}{2} \rho_{\infty} M_{\infty}^2 \gamma R T_{\infty} = \frac{1}{2} \gamma P_{\infty} M_{\infty}^2 $$
$$ q_{\infty} = \frac{1}{2} (1.4) (50 \text{ kPa}) (2.0)^2 = \frac{1}{2} (1.4) (50) (4) = 1.4 \times 50 \times 2 = 140 \text{ kPa} $$
*The dynamic pressure is used to non-dimensionalize the drag force into a drag coefficient.*

**Step 6: Calculate the wave drag coefficient ($C_D$).**
The drag coefficient is defined as $C_D = D / (q_{\infty} A_{ref})$, where $A_{ref}$ is the reference area. For a wedge, the reference area is typically the frontal area, which is $2c \sin \delta \times b$. Or, often it's $c \times b$. Let's use $c \times b$ as the planform area for $C_D$.
So, for a unit span, $A_{ref} = c$.
$$ C_D = \frac{D/b}{q_{\infty} c} = \frac{2 P_2 c \tan \delta}{q_{\infty} c} = \frac{2 P_2 \tan \delta}{q_{\infty}} $$
$$ C_D = \frac{2 \times 85.245 \text{ kPa} \times \tan(10^\circ)}{140 \text{ kPa}} $$
$$ C_D = \frac{2 \times 85.245 \times 0.1763}{140} = \frac{30.07}{140} \approx 0.2148 $$

**Final Answer:**
$$ \boxed{C_D \approx 0.215} $$

**Reflection:** This example shows how wave drag is calculated by first determining the properties across an oblique shock (which itself is complex, requiring iterative solutions or tables), then using the increased pressure on the wedge surfaces to find the drag force. The wave drag coefficient for a simple wedge can be quite high, demonstrating the penalty of non-aerodynamic shapes at supersonic speeds. The calculation relies heavily on the $\theta-\beta-M$ relation and normal shock property ratios applied to the normal component of Mach number.

### Example 3 (Harder): Transonic Drag Rise Estimation

**Problem:** An airfoil in a wind tunnel experiences a freestream Mach number of $M_{\infty} = 0.82$. Due to local acceleration, a region of supersonic flow develops on the upper surface, reaching a maximum Mach number of $M_{local} = 1.25$. This supersonic region terminates in a normal shock wave. If the freestream static pressure is $P_{\infty} = 70 \text{ kPa}$ and the freestream static temperature is $T_{\infty} = 280 \text{ K}$, estimate the pressure difference across this local shock. Assume this pressure difference acts over a characteristic length of $0.05c$ (where $c$ is chord) and a unit span, to estimate the additional drag force per unit span due to this shock.

**Given:**
*   Freestream Mach number, $M_{\infty} = 0.82$
*   Local Mach number upstream of shock, $M_1 = M_{local} = 1.25$
*   Freestream static pressure, $P_{\infty} = 70 \text{ kPa}$
*   Freestream static temperature, $T_{\infty} = 280 \text{ K}$
*   Characteristic length over which pressure acts, $\Delta x = 0.05c$
*   Ratio of specific heats, $\gamma = 1.4$
*   Gas constant for air, $R = 287 \text{ J/(kg K)}$

**Want:**
*   Pressure difference across the local shock, $\Delta P = P_2 - P_1$
*   Additional drag force per unit span, $D_{shock}/b$

**Solution:**

The local shock forms in a region of flow that is *not* the freestream. We need to find the local static pressure ($P_1$) and temperature ($T_1$) *just upstream* of the shock, which are different from the freestream conditions.

**Step 1: Calculate the local static pressure ($P_1$) and temperature ($T_1$) upstream of the shock.**
Since the flow from the freestream to the point just upstream of the local shock is assumed to be isentropic (before the shock forms), we can use isentropic relations.
$$ \frac{T_0}{T_1} = 1 + \frac{\gamma-1}{2} M_1^2 $$
$$ \frac{P_0}{P_1} = \left( 1 + \frac{\gamma-1}{2} M_1^2 \right)^{\frac{\gamma}{\gamma-1}} $$
First, find the freestream total temperature ($T_{0\infty}$) and total pressure ($P_{0\infty}$):
$$ T_{0\infty} = T_{\infty} \left( 1 + \frac{\gamma-1}{2} M_{\infty}^2 \right) = 280 \text{ K} \left( 1 + \frac{1.4-1}{2} (0.82)^2 \right) $$
$$ T_{0\infty} = 280 \left( 1 + 0.2 \times 0.6724 \right) = 280 (1 + 0.13448) = 280 \times 1.13448 \approx 317.65 \text{ K} $$
*This is the total temperature, which remains constant in isentropic flow.*

$$ P_{0\infty} = P_{\infty} \left( 1 + \frac{\gamma-1}{2} M_{\infty}^2 \right)^{\frac{\gamma}{\gamma-1}} = 70 \text{ kPa} \left( 1 + 0.2 \times (0.82)^2 \right)^{\frac{1.4}{0.4}} $$
$$ P_{0\infty} = 70 (1.13448)^{3.5} = 70 \times 1.5422 \approx 107.95 \text{ kPa} $$
*This is the total pressure, which also remains constant in isentropic flow *before* any shocks.*

Now, use these total conditions to find $P_1$ and $T_1$ at $M_1 = 1.25$:
$$ T_1 = \frac{T_{0\infty}}{1 + \frac{\gamma-1}{2} M_1^2} = \frac{317.65 \text{ K}}{1 + \frac{1.4-1}{2} (1.25)^2} = \frac{317.65}{1 + 0.2 \times 1.5625} = \frac{317.65}{1 + 0.3125} = \frac{317.65}{1.3125} \approx 242.02 \text{ K} $$
*The local static temperature upstream of the shock is lower than the freestream due to acceleration.*

$$ P_1 = \frac{P_{0\infty}}{\left( 1 + \frac{\gamma-1}{2} M_1^2 \right)^{\frac{\gamma}{\gamma-1}}} = \frac{107.95 \text{ kPa}}{\left( 1 + 0.2 \times (1.25)^2 \right)^{3.5}} = \frac{107.95}{(1.3125)^{3.5}} = \frac{107.95}{2.3168} \approx 46.59 \text{ kPa} $$
*The local static pressure upstream of the shock is also lower than the freestream.*

**Step 2: Calculate the static pressure downstream of the normal shock ($P_2$).**
We use the normal shock pressure ratio with $M_1 = 1.25$:
$$ \frac{P_2}{P_1} = 1 + \frac{2\gamma}{\gamma+1}(M_1^2 - 1) $$
$$ \frac{P_2}{P_1} = 1 + \frac{2(1.4)}{1.4+1}((1.25)^2 - 1) = 1 + \frac{2.8}{2.4}(1.5625 - 1) = 1 + 1.1666 \times 0.5625 = 1 + 0.65625 = 1.65625 $$
*This is the ratio of pressure across the shock.*

$$ P_2 = P_1 \times 1.65625 = 46.59 \text{ kPa} \times 1.65625 \approx 77.16 \text{ kPa} $$
*The pressure behind the shock is higher than upstream, but still close to the freestream pressure.*

**Step 3: Calculate the pressure difference across the shock ($\Delta P$).**
$$ \Delta P = P_2 - P_1 = 77.16 \text{ kPa} - 46.59 \text{ kPa} = 30.57 \text{ kPa} $$
*This is the magnitude of the pressure jump across the shock.*

**Step 4: Estimate the additional drag force per unit span ($D_{shock}/b$).**
The drag force from this shock is approximately the pressure difference multiplied by the projected area over which it acts. For a unit span and a characteristic length $\Delta x = 0.05c$:
$$ D_{shock}/b \approx \Delta P \times \Delta x $$
$$ D_{shock}/b \approx 30.57 \text{ kPa} \times 0.05c = 1.5285c \text{ kPa} $$
*This is an estimation, as the exact pressure distribution and effective area are more complex.*

**Final Answers:**
$$ \boxed{\Delta P \approx 30.57 \text{ kPa}} $$
$$ \boxed{D_{shock}/b \approx 1.53c \text{ kPa}} $$

**Reflection:** This example demonstrates the calculation of drag in the transonic regime, where local supersonic flow and normal shocks are prevalent. It emphasizes the importance of using *local* flow conditions (pressure, temperature) upstream of the shock, which are derived from isentropic relations from the freestream. The resulting pressure jump, even for a relatively weak local shock ($M=1.25$), creates a substantial drag force, contributing to the "drag rise" phenomenon. This simplified model helps to intuitively understand how these local shocks lead to significant wave drag.

### Example 4 (Hardest): Wave Drag on a Diamond Airfoil

**Problem:** A symmetric diamond airfoil has a half-angle of $\delta = 5^\circ$ and a chord length $c = 1 \text{ m}$. It is flying at $M_{\infty} = 2.5$ in air with $P_{\infty} = 20 \text{ kPa}$ and $T_{\infty} = 220 \text{ K}$ at zero angle of attack. Calculate the total wave drag force per unit span.

**Given:**
*   Freestream Mach number, $M_{\infty} = M_1 = 2.5$
*   Half-angle of diamond airfoil, $\delta = 5^\circ$
*   Chord length, $c = 1 \text{ m}$
*   Freestream static pressure, $P_{\infty} = P_1 = 20 \text{ kPa}$
*   Freestream static temperature, $T_{\infty} = 220 \text{ K}$
*   Ratio of specific heats, $\gamma = 1.4$
*   Zero angle of attack (symmetric flow)

**Want:**
*   Total wave drag force per unit span, $D_{wave}/b$

**Solution:**

A diamond airfoil in supersonic flow at zero angle of attack will generate oblique shocks at its leading edge and expansion waves at its shoulder (where the profile changes slope). Since it's symmetric, the flow over the top and bottom will be identical.

**Step 1: Determine the oblique shock wave angle ($\beta$) at the leading edge.**
For $M_1 = 2.5$ and turning angle $\theta = \delta = 5^\circ$. Using the $\theta-\beta-M$ relation or tables:
For $M_1 = 2.5$ and $\theta = 5^\circ$, the weak shock solution gives:
$\beta \approx 26.5^\circ$
*This is the angle of the shock wave relative to the freestream direction.*

**Step 2: Calculate the static pressure ($P_2$) and Mach number ($M_2$) after the leading edge shock.**
First, find the normal component of the upstream Mach number:
$$ M_{1n} = M_1 \sin \beta = 2.5 \sin(26.5^\circ) = 2.5 \times 0.4462 \approx 1.1155 $$
*The normal component of Mach number determines the strength of the shock.*

Now, calculate the pressure ratio across the normal component:
$$ \frac{P_2}{P_1} = 1 + \frac{2\gamma}{\gamma+1}(M_{1n}^2 - 1) = 1 + \frac{2(1.4)}{2.4}((1.1155)^2 - 1) $$
$$ \frac{P_2}{P_1} = 1 + \frac{2.8}{2.4}(1.2443 - 1) = 1 + 1.1666 \times 0.2443 = 1 + 0.2850 = 1.2850 $$
*This gives the pressure on the front surfaces of the diamond airfoil.*

$$ P_2 = P_1 \times 1.2850 = 20 \text{ kPa} \times 1.2850 = 25.70 \text{ kPa} $$
*This is the pressure on the front wedge sections (upper and lower).*

Next, calculate $M_{2n}$ (normal Mach number after shock):
$$ M_{2n}^2 = \frac{M_{1n}^2 + \frac{2}{\gamma-1}}{\frac{2\gamma}{\gamma-1}M_{1n}^2 - 1} = \frac{(1.1155)^2 + 5}{7(1.1155)^2 - 1} = \frac{1.2443 + 5}{7(1.2443) - 1} = \frac{6.2443}{8.7101 - 1} = \frac{6.2443}{7.7101} \approx 0.8099 $$
$$ M_{2n} = \sqrt{0.8099} \approx 0.8999 $$
*This is the normal component of Mach number after the shock.*

Now, find the Mach number $M_2$ parallel to the surface after the shock:
$$ M_2 = \frac{M_{1n}}{\sin(\beta - \delta)} \text{ or } M_2 = \frac{M_{2n}}{\sin(\beta - \delta)} \text{ is incorrect. } M_2 = \frac{M_1 \cos \beta}{\cos(\beta - \delta)} $$
The correct way to find $M_2$ (the Mach number in the flow direction after the shock, which is parallel to the wedge surface) is:
$$ M_2 = \sqrt{M_{2n}^2 + (M_1 \cos \beta)^2} = \sqrt{(0.8999)^2 + (2.5 \cos 26.5^\circ)^2} $$
$$ M_2 = \sqrt{0.8098 + (2.5 \times 0.8949)^2} = \sqrt{0.8098 + (2.23725)^2} = \sqrt{0.8098 + 4.9820} = \sqrt{5.7918} \approx 2.4066 $$
*This is the Mach number of the flow along the first segment of the diamond airfoil.*

**Step 3: Calculate the static pressure ($P_3$) and Mach number ($M_3$) after the expansion wave at the shoulder.**
At the shoulder, the flow turns back by an angle of $\delta = 5^\circ$. This creates an expansion wave. We use Prandtl-Meyer functions.
First, calculate the Prandtl-Meyer function for $M_2$:
$$ \nu(M) = \sqrt{\frac{\gamma+1}{\gamma-1}} \arctan \sqrt{\frac{\gamma-1}{\gamma+1}(M^2-1)} - \arctan \sqrt{M^2-1} $$
$$ \nu(M_2) = \sqrt{\frac{2.4}{0.4}} \arctan \sqrt{\frac{0.4}{2.4}((2.4066)^2-1)} - \arctan \sqrt{(2.4066)^2-1} $$
$$ \nu(M_2) = \sqrt{6} \arctan \sqrt{\frac{1}{6}(5.7917)} - \arctan \sqrt{5.7917} $$
$$ \nu(M_2) = 2.4495 \arctan \sqrt{0.9653} - \arctan \sqrt{5.7917} $$
$$ \nu(M_2) = 2.4495 \arctan(0.9825) - \arctan(2.4066) $$
$$ \nu(M_2) = 2.4495 \times (44.5^\circ \text{ in radians}) - (67.4^\circ \text{ in radians}) $$
$$ \nu(M_2) = 2.4495 \times 0.7766 \text{ rad} - 1.1763 \text{ rad} = 1.9023 \text{ rad} - 1.1763 \text{ rad} = 0.726 \text{ rad} \approx 41.6^\circ $$
*This is the Prandtl-Meyer function value corresponding to $M_2$.*

The flow turns by $\delta = 5^\circ$ (which is $0.0873 \text{ rad}$). So, the Prandtl-Meyer function for $M_3$ is:
$$ \nu(M_3) = \nu(M_2) + \delta = 41.6^\circ + 5^\circ = 46.6^\circ \text{ or } 0.726 \text{ rad} + 0.0873 \text{ rad} = 0.8133 \text{ rad} $$
*For an expansion, the Prandtl-Meyer function increases.*

Now, we need to find $M_3$ such that $\nu(M_3) = 46.6^\circ$. This requires inverse Prandtl-Meyer lookup or iteration.
Using a Prandtl-Meyer table or calculator for $\nu(M_3) = 46.6^\circ$:
$M_3 \approx 2.65$
*This is the Mach number of the flow along the second segment of the diamond airfoil.*

Now, calculate the static pressure $P_3$ after the expansion wave. We use the isentropic relation between $P_2$ and $P_3$ (since expansion waves are isentropic):
$$ \frac{P_3}{P_2} = \left( \frac{1 + \frac{\gamma-1}{2} M_2^2}{1 + \frac{\gamma-1}{2} M_3^2} \right)^{\frac{\gamma}{\gamma-1}} $$
$$ \frac{P_3}{P_2} = \left( \frac{1 + 0.2 (2.4066)^2}{1 + 0.2 (2.65)^2} \right)^{3.5} = \left( \frac{1 + 0.2 \times 5.7917}{1 + 0.2 \times 7.0225} \right)^{3.5} = \left( \frac{1 + 1.1583}{1 + 1.4045} \right)^{3.5} $$
$$ \frac{P_3}{P_2} = \left( \frac{2.1583}{2.4045} \right)^{3.5} = (0.8976)^{3.5} \approx 0.6974 $$
*This is the pressure ratio across the expansion wave.*

$$ P_3 = P_2 \times 0.6974 = 25.70 \text{ kPa} \times 0.6974 \approx 17.92 \text{ kPa} $$
*This is the pressure on the rear wedge sections (upper and lower).*

**Step 4: Calculate the wave drag force per unit span ($D_{wave}/b$).**
The drag force comes from the pressure difference acting on the front and rear surfaces.
The front surfaces (length $c/2 / \cos \delta$) experience pressure $P_2$. The rear surfaces (length $c/2 / \cos \delta$) experience pressure $P_3$.
The drag contribution from the upper surface:
$D_{upper} = (P_2 \times \frac{c/2}{\cos\delta} \times \sin\delta) - (P_3 \times \frac{c/2}{\cos\delta} \times \sin\delta)$
This simplifies to:
$D_{upper} = (P_2 - P_3) \times \frac{c}{2} \tan\delta$
Since the airfoil is symmetric at zero angle of attack, the total drag is twice this value:
$$ D_{wave}/b = 2 \times (P_2 - P_3) \times \frac{c}{2} \tan\delta = (P_2 - P_3) c \tan\delta $$
$$ D_{wave}/b = (25.70 \text{ kPa} - 17.92 \text{ kPa}) \times 1 \text{ m} \times \tan(5^\circ) $$
$$ D_{wave}/b = (7.78 \text{ kPa}) \times 1 \text{ m} \times 0.08749 $$
$$ D_{wave}/b = 7.78 \times 0.08749 \text{ kN/m} \approx 0.6806 \text{ kN/m} $$
*The drag is the net force from the pressure distribution, projected onto the direction of motion.*

**Final Answer:**
$$ \boxed{D_{wave}/b \approx 0.681 \text{ kN/m}} $$

**Reflection:** This example is significantly more involved as it requires understanding both oblique shock waves and Prandtl-Meyer expansion waves. The wave drag is calculated by integrating the pressure distribution over the airfoil surface. The key steps are:
1.  Calculate conditions after the leading edge oblique shock (pressure increases, Mach number decreases slightly).
2.  Calculate conditions after the trailing edge expansion wave (pressure decreases, Mach number increases).
3.  Sum the pressure forces projected onto the freestream direction.
The Mach number actually drops slightly after the shock and then increases again after the expansion, but the pressure changes are what drive the drag. The complexity of these calculations highlights why CFD is essential for real-world supersonic designs.

## 6. Common mistakes and traps

1.  **Confusing wave drag with other drag components:** Students often lump all drag together. Wave drag is specifically due to shock waves and energy dissipation, distinct from skin friction (viscous effects) or induced drag (due to lift).
2.  **Believing wave drag only occurs at $M > 1$:** Transonic wave drag (the "drag rise") occurs when the freestream Mach number is still subsonic ($M_{\infty} < 1$), but local regions of supersonic flow develop, leading to local shocks.
3.  **Ignoring the irreversibility of shocks:** A key concept is that shocks are non-isentropic. This means total pressure ($P_0$) decreases and entropy ($s$) increases across a shock. This loss of total pressure is the fundamental cause of wave drag, representing energy that cannot be recovered.
4.  **Misunderstanding the Area Rule:** The Area Rule doesn't make an aircraft "invisible" to shock waves. It aims to smooth out the *total cross-sectional area distribution* of the aircraft, which minimizes the strength and number of shock waves generated, thereby reducing wave drag, particularly in the transonic regime. It's not about individual component shapes alone.
5.  **Assuming all shocks are normal shocks:** While normal shocks are easier to analyze and illustrate the concept, most shocks in supersonic flow over aerodynamic bodies are oblique. Oblique shocks are weaker (cause less total pressure loss) than normal shocks for the same upstream Mach number.
6.  **Neglecting local conditions:** When calculating pressure changes across a local shock on an airfoil, it's a mistake to use freestream conditions directly. The flow upstream of the local shock has already undergone isentropic acceleration, so its static pressure and temperature will be different from the freestream.

## 7. Textbook-precise explanation

Wave drag, denoted $D_w$, is a component of aerodynamic drag that arises in compressible flow regimes, specifically when portions of the flow field reach or exceed the speed of sound, leading to the formation of shock waves and expansion waves. It is fundamentally a form of pressure drag resulting from the irreversible thermodynamic processes associated with these waves.

In the **transonic regime** ($0.8 \lesssim M_{\infty} \lesssim 1.2$), as an aircraft approaches Mach 1, local regions of supersonic flow develop over curved surfaces (e.g., wing upper surface, fuselage shoulders) even when the freestream Mach number $M_{\infty}$ is subsonic. These supersonic pockets terminate in normal shock waves, which abruptly decelerate the flow to subsonic speeds. Across these normal shocks, there is a significant increase in entropy ($s_2 > s_1$) and a corresponding decrease in total pressure ($P_{02} < P_{01}$). This total pressure loss represents a dissipation of mechanical energy into thermal energy, which must be continuously supplied by the aircraft's propulsion system, manifesting as a sharp increase in drag known as the "drag rise." This phenomenon is often characterized by the drag divergence Mach number ($M_{DD}$), where the drag coefficient begins to increase rapidly. The Area Rule, as formulated by Whitcomb, provides a design principle to mitigate transonic wave drag by ensuring a smooth longitudinal distribution of cross-sectional area.

In the **supersonic regime** ($M_{\infty} \gtrsim 1.2$), the flow field is predominantly supersonic. A system of shock waves and expansion waves forms around the body. At the nose and leading edges of aerodynamic surfaces, oblique shock waves are generated. At convex corners, Prandtl-Meyer expansion waves occur. While oblique shocks are generally weaker than normal shocks (i.e., they cause less total pressure loss for a given upstream Mach number), they are still irreversible processes. The net effect of the pressure distribution created by these shock and expansion waves, integrated over the body's surface and projected onto the freestream direction, constitutes supersonic wave drag. For slender bodies in supersonic flow, linearized theory can provide analytical solutions for wave drag, which is often proportional to the square of the body's thickness ratio and the square of the Mach number.

Mathematically, wave drag can be expressed as:
$$ D_w = \int_S (P_2 - P_1) \cdot \vec{n} \cdot d\vec{A} $$
where $P_1$ and $P_2$ are the pressures on either side of the shock or expansion wave, $\vec{n}$ is the outward normal vector to the surface element $d\vec{A}$, and the integral is taken over the entire surface $S$ of the body. More fundamentally, wave drag is a consequence of the non-isentropic nature of shock waves, leading to an increase in entropy and a reduction in the useful work that can be extracted from the flow.

References:
*   Anderson, John D. Jr. *Modern Compressible Flow: With Historical Perspective*. 4th ed., McGraw-Hill Education, 2004, Chapter 10 & 11.
*   Shapiro, Ascher H. *The Dynamics and Thermodynamics of Compressible Fluid Flow*. Vol. 1, Ronald Press Co., 1953, Chapter 4 & 5.

## 8.