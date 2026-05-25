## What it is
Field Emission Electric Propulsion (FEEP) is a type of ion thruster that uses intense electric fields to extract and accelerate ions directly from a liquid metal propellant. Microelectromechanical Systems (MEMS) technology enables the fabrication of vast arrays of these microscopic thrusters on a single chip, creating a scalable micro-propulsion system.

## Why it matters
FEEP and MEMS thrusters are critical for the control of small spacecraft, such as CubeSats and nanosatellites. Their high specific impulse and fine thrust control are essential for precision pointing, station-keeping in constellations, formation flying, and eventual de-orbiting to mitigate space debris. This technology is a key enabler for the current boom in commercial and scientific small satellite missions.

## When to study it
Before tackling this, you must have a firm grasp of the following prerequisites:
1.  **Classical Mechanics:** Newton's Second and Third Laws ($F=ma$, action-reaction), and the principle of conservation of momentum.
2.  **Electromagnetism:** Coulomb's Law, the concepts of electric field ($E$), electric potential ($V$), and the work-energy theorem for charged particles ($W = \Delta K.E. = qV$).
3.  **Basic Propulsion Concepts:** The Tsiolkovsky Rocket Equation, and the definitions of thrust ($T$) and specific impulse ($I_{sp}$).

If these are not solid, review them first. This topic builds directly on the physics of accelerating charged masses.

## How to study it (step by step)
1.  **Understand the Source:** Research the "Taylor Cone." This is the core physical mechanism. Understand how an equilibrium is formed between the liquid metal's surface tension and the electrostatic pressure from an applied electric field. This cone is the source of the ions.
2.  **Derive Single-Ion Velocity:** Start from first principles. An ion of mass $m_i$ and charge $q$ is accelerated across a potential difference $V$. Use the work-energy theorem ($qV = \frac{1}{2}m_i v_e^2$) to derive the exhaust velocity, $v_e$.
3.  **Connect Current to Mass Flow:** An electric current is a flow of charge, not mass. Derive the relationship between the ion beam current $I_b$ and the mass flow rate $\dot{m}$. Hint: $I_b$ is ions per second times charge per ion. $\dot{m}$ is ions per second times mass per ion.
4.  **Derive Thrust and $I_{sp}$:** Combine the results from steps 2 and 3 with the fundamental definitions of thrust ($T = \dot{m} v_e$) and specific impulse ($I_{sp} = v_e / g_0$) to find expressions for $T$ and $I_{sp}$ in terms of electrical parameters ($V, I_b$) and physical constants ($m_i, q$).
5.  **Analyze the Trade-off:** Use your derived equations to analyze the relationship between thrust and specific impulse. Notice how increasing accelerating voltage $V$ affects each. This reveals the fundamental trade-off of all electric propulsion systems.

## Key ideas, with intuition
1.  **The Taylor Cone: A Liquid Needle:** Imagine placing a droplet of liquid metal on a sharp metal tip. If you apply a strong positive voltage to the tip relative to a nearby plate, the electric field will pull on the surface of the liquid. The liquid is conductive, so the surface itself becomes charged. This electrostatic force counteracts the liquid's surface tension, which tries to keep it spherical. At a critical voltage, the liquid is pulled into a sharp, stable cone—the Taylor cone.
2.  **Field Evaporation: Ripping Atoms Off:** At the apex of this microscopic cone, the electric field becomes extraordinarily intense, on the order of $10^9$ V/m. This field is strong enough to overcome the atomic binding forces within the liquid metal, literally tearing individual atoms from the surface and simultaneously stripping an electron from them. This process is called field evaporation or field ionization.
3.  **Electrostatic Acceleration:** The particle that was just ripped off the tip is now a positive ion (e.g., $Cs^+$). It finds itself in the same extremely strong electric field that created it. This field immediately and violently accelerates it away from the emitter, creating a high-velocity exhaust beam. By Newton's third law, this produces a reaction force—thrust—on the emitter.
    $$ T = \dot{m} v_e $$
    The thrust is the product of how much mass you throw per second ($\dot{m}$) and how fast you throw it ($v_e$).
4.  **High $I_{sp}$, Low Thrust:** FEEP thrusters accelerate a very small amount of mass ($\dot{m}$ is tiny) to extremely high velocities ($v_e$ is huge, often >100 km/s). This results in an exceptionally high specific impulse ($I_{sp} \propto v_e$), meaning it's highly efficient with propellant. However, the thrust is minuscule (micronewtons per emitter) because the mass flow is so low.
5.  **MEMS for Scalability:** A single FEEP emitter is too weak to be useful. The breakthrough is using MEMS fabrication—the same techniques used to make computer chips—to etch thousands or millions of identical emitters onto a small silicon wafer. By operating them in parallel, their individual thrusts add up to a meaningful level for controlling a small satellite.

## Worked example
**Problem:** A single FEEP emitter uses singly-ionized Cesium-133 ($m_i \approx 133$ amu, $q=e$) as propellant. It operates with an accelerating potential of $V = 10 \text{ kV}$ and produces a steady ion beam current of $I_b = 1.5 \mu\text{A}$. Calculate the exhaust velocity, thrust, and specific impulse of this single emitter.

**Constants:**
-   Atomic mass unit: $1 \text{ amu} = 1.6605 \times 10^{-27} \text{ kg}$
-   Elementary charge: $e = 1.602 \times 10^{-19} \text{ C}$
-   Standard gravity: $g_0 = 9.81 \text{ m/s}^2$

**Solution:**

1.  **Calculate ion mass:**
    $m_i = 133 \text{ amu} \times (1.6605 \times 10^{-27} \text{ kg/amu}) = 2.208 \times 10^{-25} \text{ kg}$.

2.  **Calculate exhaust velocity ($v_e$):**
    The kinetic energy gained by the ion equals the potential energy lost.
    $$ \frac{1}{2}m_i v_e^2 = qV $$
    $$ v_e = \sqrt{\frac{2qV}{m_i}} = \sqrt{\frac{2(1.602 \times 10^{-19} \text{ C})(10 \times 10^3 \text{ V})}{2.208 \times 10^{-25} \text{ kg}}} $$
    $$ v_e = \sqrt{1.451 \times 10^{10} \text{ m}^2/\text{s}^2} \approx 120,460 \text{ m/s} \quad \text{or} \quad 120.5 \text{ km/s} $$
    *This step works by applying the work-energy theorem to a single ion.*

3.  **Calculate mass flow rate ($\dot{m}$):**
    Beam current $I_b$ is the rate of charge flow. Mass flow rate $\dot{m}$ is the rate of mass flow. We convert between them using the mass-to-charge ratio of the propellant ions.
    $$ \dot{m} = \frac{I_b}{q} m_i = \frac{1.5 \times 10^{-6} \text{ C/s}}{1.602 \times 10^{-19} \text{ C}} \times (2.208 \times 10^{-25} \text{ kg}) $$
    $$ \dot{m} \approx 2.068 \times 10^{-12} \text{ kg/s} $$
    *This step links the electrical measurement (current) to the mechanical quantity (mass flow).*

4.  **Calculate thrust ($T$):**
    Thrust is the rate of change of momentum. For a constant exhaust velocity, $T = \dot{m}v_e$.
    $$ T = (2.068 \times 10^{-12} \text{ kg/s})(120,460 \text{ m/s}) $$
    $$ T \approx 2.49 \times 10^{-7} \text{ N} \quad \text{or} \quad 0.249 \mu\text{N} $$
    *This step applies the fundamental definition of thrust.*

5.  **Calculate specific impulse ($I_{sp}$):**
    $I_{sp}$ measures the propellant efficiency.
    $$ I_{sp} = \frac{v_e}{g_0} = \frac{120,460 \text{ m/s}}{9.81 \text{ m/s}^2} \approx 12,280 \text{ s} $$
    *This step normalizes the exhaust velocity to provide a standard measure of efficiency.*

**Reflection:** The results are characteristic of FEEP: extremely high specific impulse (a chemical rocket is ~450 s) but almost imperceptible thrust from a single emitter. To get meaningful force, you need an array of thousands of these.

## Diagrams
A single FEEP emitter tip (Taylor Cone):
```text
      Liquid Metal Propellant Reservoir
                |
                |
              Anode
             (Emitter)
          +  / \  +
          + / | \ +      <-- High Positive Voltage (+V)
           /  |  \
          /   |   \
         |    |    |
         |    |    |
         |  Taylor |
         |   Cone  |
          \   |   /
           \  *  /       <-- Tip of cone, E-field ~10^9 V/m
            \ | /
             \|/
              +          <-- Field evaporation creates ion (Cs+)
              |
              | Ion Beam (accelerated away)
              v
              v
---------------------------
      Extractor Grid
       (Cathode, 0V)
---------------------------
              v
              v (Exhaust)
```

## Memory technique — remember this forever
1.  **Visual Hook:** Think of "FEEP" as a **F**ield **E**vaporating **E**lectric **P**incushion. Imagine a tiny metal pincushion (the MEMS array) wet with liquid metal. A huge static charge makes the liquid form microscopic needles (Taylor Cones), and from the tip of each needle, it "zaps" away a tiny particle (ion) at incredible speed.
2.  **Must Overlearn Formulas:**
    *   Exhaust Velocity: $$ v_e = \sqrt{\frac{2qV}{m_i}} $$
    *   Thrust: $$ T = \dot{m} v_e = I_b \sqrt{\frac{2m_i V}{q}} $$
3.  **Spaced Repetition Schedule:** Review these derivations and formulas in your notes or on a flashcard at intervals of **1 day, 3 days, 7 days, 16 days, and 35 days**.
4.  **First Principles Pathway:** If you forget everything, rebuild it.
    *   Start with one ion: Energy conservation gives its velocity. $K.E._{final} = P.E._{initial} \implies \frac{1}{2}m_i v_e^2 = qV$.
    *   Define thrust: $T = \dot{m} v_e$.
    *   Relate mass flow to current: Current $I_b$ is charge/sec. Mass flow $\dot{m}$ is mass/sec. The conversion factor is mass/charge, so $\dot{m} = I_b \cdot (m_i/q)$.
    *   Substitute everything together. You can re-derive the main thrust equation from these three simple steps.

## Common mistakes
1.  **Confusing Propellant Types:** FEEP specifically uses liquid metals (Cesium, Indium). Confusing it with Hall thrusters (which use noble gases like Xenon) or electrospray thrusters (which use ionic liquids) is a common error. The ion *source* is the key differentiator.
2.  **Ignoring Surface Tension:** The Taylor cone is a static equilibrium. Students often focus only on the electric field, but without the cohesive force of surface tension pulling the liquid together, the cone could not form; the liquid would simply be pulled apart.
3.  **Mass Flow Rate Conversion Error:** A frequent mistake is to incorrectly relate current $I_b$ to mass flow $\dot{m}$. Remember that $I_b = \dot{N}q$ (number of ions/sec $\times$ charge/ion) and $\dot{m} = \dot{N}m_i$ (number of ions/sec $\times$ mass/ion). Do not mix them up.
4.  **Misunderstanding the Scale:** Attributing the capabilities of a full MEMS *array* to a single FEEP *emitter*. The innovation is the massive parallelism enabled by microfabrication, not the performance of one microscopic tip.

## Self-check
1.  If the accelerating voltage of a FEEP thruster is quadrupled, while the ion beam current remains constant, what happens to its thrust and its specific impulse?
2.  A CubeSat requires $20 \mu\text{N}$ of thrust for a particular maneuver. Its micro-thruster is a MEMS array of FEEP emitters identical to the one in the worked example ($T_{single} = 0.249 \mu\text{N}$). How many emitters must be active to provide the required thrust? What is the total power consumed by the beam, defined as $P = I_{total}V$?
3.  Derive an expression for the specific impulse of a FEEP thruster in terms of its thrust $T$, beam current $I_b$, and the ion mass-to-charge ratio $m_i/q$. Does a thruster with a higher thrust for a given current necessarily have a higher specific impulse? Justify your answer.