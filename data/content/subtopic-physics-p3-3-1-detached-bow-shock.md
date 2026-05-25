## What it is
A detached bow shock is a curved shock wave that forms in front of a blunt-nosed body traveling at supersonic speeds ($M > 1$). Unlike an oblique shock that can attach to a sharp point, this shock stands off from the body, creating a region of subsonic flow directly in front of it. The portion of the shock directly upstream of the body's stagnation point behaves as a normal shock.

## Why it matters
This phenomenon is fundamental to the design of high-speed vehicles. The standoff distance and properties of the subsonic region determine the intense heating and pressure loads on spacecraft reentry capsules (e.g., Orion, Soyuz) and ballistic missile nose cones. Understanding it is also critical for designing supersonic engine inlets, which must slow the incoming air to subsonic speeds before it reaches the compressor.

## When to study it
You must have a solid grasp of the following before tackling this subtopic. If not, review them first.
1.  **Normal Shock Relations:** The Rankine-Hugoniot equations for conservation of mass, momentum, and energy across a stationary normal shock.
2.  **Oblique Shock Theory:** Specifically, the relationship between the freestream Mach number ($M_1$), the shock wave angle ($\beta$), and the flow deflection angle ($\theta$), known as the $\theta-\beta-M$ relation.
3.  **Stagnation Conditions:** The concept of bringing a flow to rest isentropically ($P_0, T_0$) versus non-isentropically across a shock.

## How to study it (step by step)
1.  **Revisit the $\theta-\beta-M$ diagram.** For a fixed $M_1 > 1$, plot $\theta$ vs. $\beta$. Identify the maximum deflection angle, $\theta_{max}$. Understand physically what this limit means: for a given speed, there is a maximum angle the flow can be turned through a single oblique shock.
2.  **Derive the detachment condition.** The condition for a shock to detach from a sharp wedge is when the wedge half-angle $\theta$ exceeds $\theta_{max}$ for the given freestream Mach number $M_1$. For a blunt body, consider the stagnation streamline. The flow must turn 90° to move parallel to the body surface, but $\theta_{max}$ is always less than 90°. Conclude that a blunt body *must* produce a detached shock.
3.  **Sketch the flow field.** Draw a blunt body (like a sphere or cylinder). Draw the curved bow shock in front of it. Label the freestream region ($M_1 > 1$), the shock itself, the standoff distance ($\Delta$), the subsonic region behind the shock ($M_2 < 1$), and the sonic line where the flow re-accelerates to $M=1$ around the body's shoulders.
4.  **Analyze the stagnation streamline.** Treat the portion of the bow shock on the stagnation streamline as a perfect normal shock. Use the normal shock tables or equations to calculate the Mach number, pressure, temperature, and density immediately behind it ($M_2, P_2, T_2, \rho_2$).
5.  **Calculate stagnation properties.** The flow from just behind the normal shock (station 2) to the body's stagnation point (station s) is a subsonic, isentropic deceleration. Use isentropic relations to find the stagnation pressure and temperature at the body's surface ($P_{0,2}, T_{0,2}$). Note that $T_{0,2} = T_{0,1}$ but $P_{0,2} < P_{0,1}$ due to the entropy increase across the shock.

## Key ideas, with intuition
1.  **Flows Have a Turning Limit.** Think of a supersonic flow as a fast-moving, rigid stream. You can't force it to make an arbitrarily sharp turn through a single shock. For any given Mach number $M_1$, there is a maximum angle $\theta_{max}$ it can be deflected. If a body's geometry demands a turn greater than this, the flow "gives up" on attaching and forms a strong, detached shock further upstream.
    $$ \theta_{max} = f(M_1) $$
    This is the core reason for detachment. For a blunt body, the streamline hitting the very front must turn $90^\circ$, which is always impossible via an attached oblique shock.

2.  **The "Subsonic Bubble".** The detached shock creates a cushion or bubble of high-pressure, high-temperature subsonic gas between the shock and the body. This region is critical because it's where the most extreme aerodynamic heating occurs. The flow in this bubble is complex, but on the centerline, it simply decelerates from $M_2 < 1$ just behind the shock to $M=0$ at the body's stagnation point.

3.  **A Normal Shock in Disguise.** The most important part of the curved bow shock is the segment directly in front of the body on the stagnation streamline. This segment is perpendicular to the flow, making it a normal shock. This is a powerful simplification: to find the most extreme conditions behind the shock, you don't need complex curved shock theory, you just use the standard normal shock relations.
    $$ P_2/P_1 = \frac{2\gamma}{\gamma+1}M_1^2 - \frac{\gamma-1}{\gamma+1} $$
    $$ T_2/T_1 = \frac{(1 + \frac{\gamma-1}{2}M_1^2)(\frac{2\gamma}{\gamma-1}M_1^2 - 1)}{\frac{(\gamma+1)^2}{2(\gamma-1)}M_1^2} $$

4.  **Standoff Distance ($\Delta$).** The distance from the shock to the body is not arbitrary. It depends on the Mach number, the gas properties ($\gamma$), and the body's shape and size. A higher Mach number generally pushes the shock closer to the body. Calculating $\Delta$ precisely requires computational fluid dynamics (CFD) or empirical correlations; it cannot be derived simply.

## Worked example
A sphere flies at Mach 3.0 in air at standard sea-level conditions ($P_1 = 101.3$ kPa, $T_1 = 288$ K). Calculate the pressure and temperature at the stagnation point on the sphere's surface. Assume air is a perfect gas with $\gamma = 1.4$.

**Step 1: Analyze the stagnation streamline.**
The streamline that terminates at the stagnation point passes through the bow shock where it is a normal shock. We can use normal shock relations to find conditions at state 2, just behind the shock.
Given: $M_1 = 3.0$, $P_1 = 101.3$ kPa, $T_1 = 288$ K, $\gamma = 1.4$.

**Step 2: Calculate pressure and temperature just behind the normal shock (state 2).**
Using the normal shock relations:
$$ \frac{P_2}{P_1} = \frac{2\gamma}{\gamma+1}M_1^2 - \frac{\gamma-1}{\gamma+1} = \frac{2(1.4)}{2.4}(3.0)^2 - \frac{0.4}{2.4} = 10.333 $$
$$ P_2 = 10.333 \times P_1 = 10.333 \times 101.3 \text{ kPa} = 1046.7 \text{ kPa} $$
$$ \frac{T_2}{T_1} = \frac{P_2}{P_1} \frac{\rho_1}{\rho_2} = \frac{P_2}{P_1} \frac{(\gamma+1)M_1^2}{2 + (\gamma-1)M_1^2} = 10.333 \frac{(2.4)(3.0)^2}{2 + (0.4)(3.0)^2} = 10.333 \frac{21.6}{5.6} = 2.679 $$
$$ T_2 = 2.679 \times T_1 = 2.679 \times 288 \text{ K} = 771.6 \text{ K} $$

**Step 3: Calculate the Mach number behind the shock ($M_2$).**
$$ M_2^2 = \frac{1 + \frac{\gamma-1}{2}M_1^2}{\gamma M_1^2 - \frac{\gamma-1}{2}} = \frac{1 + \frac{0.4}{2}(3.0)^2}{1.4(3.0)^2 - \frac{0.4}{2}} = \frac{1+1.8}{12.6 - 0.2} = \frac{2.8}{12.4} = 0.2258 $$
$$ M_2 = \sqrt{0.2258} = 0.475 \quad (\text{as expected, } M_2 < 1) $$

**Step 4: Treat the flow from state 2 to the stagnation point (state s) as isentropic.**
The flow from just behind the shock to the body is subsonic and considered isentropic. We use isentropic stagnation relations with the conditions at state 2 as our reference. At the stagnation point, $M_s = 0$.
$$ \frac{P_{s}}{P_2} = \left(1 + \frac{\gamma-1}{2}M_2^2\right)^{\frac{\gamma}{\gamma-1}} = \left(1 + \frac{0.4}{2}(0.475)^2\right)^{\frac{1.4}{0.4}} = (1.045)^{3.5} = 1.165 $$
$$ P_s = 1.165 \times P_2 = 1.165 \times 1046.7 \text{ kPa} = 1219.4 \text{ kPa} $$
$$ \frac{T_{s}}{T_2} = 1 + \frac{\gamma-1}{2}M_2^2 = 1.045 $$
$$ T_s = 1.045 \times T_2 = 1.045 \times 771.6 \text{ K} = 806.3 \text{ K} $$

**Reflection:**
- Step 1 worked because we correctly identified that the stagnation streamline crosses a normal shock.
- Step 2 and 3 were direct applications of the normal shock equations, our primary tool for this part of the problem.
- Step 4 correctly modeled the subsonic region behind the shock as isentropic, allowing us to find the final conditions at the body itself. This two-part process (shock, then isentropic compression) is the key to solving these problems.

## Diagrams
```text
          Freestream Flow (M_1 > 1)
          ------------------>
          ------------------>
          ------------------>
          ------------------>
          ------------------>
          ------------------>


                                    .
                                 .  |
                              .     | Sonic Line (M=1)
                           .        |
                        .           |
Shock Front (Bow Shock) |           |
           .------------|-----------|-----------> Stagnation Streamline
           |            |           |           (Flow is normal to shock here)
           .            |           |
                        .           |
                           .        |
                              .     |
                                 .  |
                                    .

                        |<-- Δ -->|
                        |         |
                        | Subsonic|
                        | Region  |    Blunt
                        | (M < 1) |    Body
                        |         |  /-------\
                        |         | |         |
                        |---------X-|         |
                        | Stagnation| \-------/
                        |   Point |
                        |  (M=0)  |
```

## Memory technique — remember this forever
1.  **Visual Hook:** Picture a supersonic car driving towards a very wide, round pillar. The car is the "flow," the pillar is the "blunt body." The car can't make the impossibly sharp 90° turn around the pillar's front, so it has to slam on the brakes *before* it gets there. The screeching sound and smoke cloud that forms in front of the pillar is the **detached bow shock**. The car (flow) is now moving slowly (subsonic) in that smoky region before it finally touches the pillar.

2.  **Must Overlearn:**
    *   **Detachment Condition:** A shock detaches when the required turning angle $\theta$ is greater than the maximum possible turning angle for that Mach number: $\theta > \theta_{max}(M_1)$. For a blunt body, this is *always* true at the nose.
    *   **Stagnation Streamline Analysis:** The flow along the stagnation streamline first crosses a **normal shock**, then undergoes **isentropic subsonic compression** to the body.

3.  **Spaced Repetition Schedule:** Review this material and re-work the example problem at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, rebuild it.
    *   Start with the integral forms of conservation of mass, momentum, and energy for a control volume.
    *   Apply them to an infinitesimally thin control volume across a shock wave to derive the Rankine-Hugoniot (normal shock) relations.
    *   Apply them to an oblique shock to derive the $\theta-\beta-M$ relation.
    *   Find the maximum of the $\theta-\beta-M$ function by taking the derivative $d\theta/d\beta$ and setting it to zero. This gives you $\theta_{max}$.
    *   The entire concept of detachment rests on this maximum existing.

## Common mistakes
1.  **Applying oblique shock relations everywhere.** The bow shock is curved. The shock angle $\beta$ changes continuously from $90^\circ$ at the centerline to a smaller value further away. You cannot use a single value of $\beta$ to analyze the whole shock.
2.  **Forgetting the isentropic compression.** Students often calculate the properties just behind the normal shock ($P_2, T_2$) and incorrectly state these are the conditions *at the body's surface*. You must account for the subsonic, isentropic compression from state 2 to the stagnation point.
3.  **Incorrectly calculating stagnation pressure.** A common error is to use the freestream Mach number $M_1$ in the isentropic relations to find the stagnation pressure on the body. This is wrong. The flow has passed through a shock, losing total pressure. You must use the Mach number *behind* the shock, $M_2$, as the starting point for the isentropic calculation ($P_{0,2}$).

## Self-check
1.  A sharp cone with a 10° half-angle is flying at Mach 2. A sphere is also flying at Mach 2. Explain, without equations, why one might have an attached shock while the other *must* have a detached shock.
2.  A probe enters the Martian atmosphere ($\gamma \approx 1.29$) at Mach 25. The ambient temperature is 180 K. What is the temperature at the probe's stagnation point?
3.  Consider a sphere in a Mach 2 flow and a Mach 5 flow. How would you expect the shock standoff distance $\Delta$ and the radius of curvature of the shock at the centerline to change between these two cases? Justify your reasoning.