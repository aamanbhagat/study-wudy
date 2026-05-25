## What it is
The Mach number, $M$, is a dimensionless quantity representing the ratio of an object's speed, $V$, through a fluid to the local speed of sound, $a$, in that fluid. It quantifies the compressibility effects on the fluid flow. An object moving slower than sound has $M<1$ (subsonic), while an object moving faster than sound has $M>1$ (supersonic).

## Why it matters
The Mach number is the single most important parameter in high-speed aerodynamics, as it dictates the fundamental physics of the flow. It determines whether shock waves form, which dramatically increases drag and changes pressure distributions over an airfoil. Designing everything from jet engines and supersonic aircraft to reentry vehicles for spacecraft depends critically on understanding and controlling the effects associated with the specific Mach regime of operation.

## When to study it
Before tackling this, you must have a firm grasp of the following:
1.  **Thermodynamics:** Specifically, the ideal gas law ($P=\rho R T$), the definition of specific heats ($c_p, c_v$), and the specific heat ratio, $\gamma = c_p/c_v$.
2.  **Fluid Dynamics:** The basic principles of conservation of mass (continuity equation) and momentum (Euler's equations).
3.  **Basic Wave Physics:** The concept of a wave and its propagation speed.

If you cannot derive the relationship between pressure and density for an isentropic process ($P/\rho^\gamma = \text{constant}$), review that first.

## How to study it (step by step)
1.  **Derive the speed of sound.** Start with the 1D Euler momentum equation and the continuity equation. Introduce a small pressure perturbation and derive the wave equation, showing that the propagation speed is $a^2 = (\partial P / \partial \rho)_s$, where the subscript $s$ denotes constant entropy. For an ideal gas, show this simplifies to $a = \sqrt{\gamma R T}$.
2.  **Define the Mach number.** Write down $M = V/a$. Internalize that this is a ratio of two speeds: the bulk fluid flow speed versus the speed at which information (a pressure wave) propagates within the fluid.
3.  **Visualize the regimes.** Draw the diagrams for a point source emitting sound waves while stationary, moving subsonically ($M<1$), sonically ($M=1$), and supersonically ($M>1$). For the supersonic case, derive the Mach cone angle, $\mu$, where $\sin(\mu) = 1/M$.
4.  **Calculate $M$ in a real scenario.** Find the standard atmospheric temperature at an altitude of 11 km (the tropopause). Calculate the speed of sound there. Then, calculate the Mach number for an airliner traveling at 250 m/s at that altitude.
5.  **Categorize the regimes.** For each regime—subsonic ($M<0.8$), transonic ($0.8 < M < 1.2$), supersonic ($1.2 < M < 5$), and hypersonic ($M>5$)—write down two key physical phenomena that distinguish it. For example, for supersonic: "formation of shock waves," "wave drag." For hypersonic: "high-temperature gas effects," "thin, intense shock layer."

## Key ideas, with intuition
1.  **Sound is the fluid's information speed.** Imagine a fluid as a dense crowd of people. The speed of sound, $a$, is how fast a "shove" (a pressure disturbance) can travel through the crowd. If you walk slowly through the crowd ($V<a$), people have time to see you coming and move aside. The "information" (your presence) travels ahead of you.
2.  **Supersonic flight outruns information.** If you run through the crowd faster than the "shove" can propagate ($V>a$), people don't know you're coming until you collide with them. This collision is a shock wave. It's an abrupt, discontinuous change in the properties of the fluid (pressure, density, temperature) because the fluid had zero warning time to adjust smoothly.
3.  **The Mach number defines the geometry of the disturbance.** A stationary source emits sound in concentric circles. A subsonic source emits circles that are bunched up in the direction of motion. A supersonic source moves faster than its own sound waves, creating a V-shaped wake of overlapping wavefronts. This V-shape is the Mach cone.
    $$
    \sin(\mu) = \frac{a t}{V t} = \frac{a}{V} = \frac{1}{M}
    $$
    Here, $\mu$ is the Mach angle, the half-angle of the cone. As $M$ increases, the cone gets narrower.
4.  **Temperature, not density or pressure, dictates the local speed of sound.** The derivation for an ideal gas yields $a = \sqrt{\gamma R T}$. Notice that pressure and density are absent. This is because, in an ideal gas, pressure and density effects on wave speed cancel each other out, leaving only the effect of temperature, which is a measure of the average kinetic energy (and thus, random motion) of the gas molecules. A hotter gas has faster-moving molecules, allowing disturbances to propagate more quickly.

## Worked example
**Problem:** The SR-71 Blackbird holds the record for the fastest air-breathing, crewed aircraft, reaching Mach 3.3. Calculate its velocity in m/s and km/h if it was flying at an altitude of 25 km, where the atmospheric temperature is approximately -51°C. For air, use $\gamma = 1.4$ and the specific gas constant $R = 287 \, \text{J/(kg}\cdot\text{K)}$.

**Step 1: Convert temperature to Kelvin.**
The formula for the speed of sound requires absolute temperature.
$$
T = -51 + 273.15 = 222.15 \, \text{K}
$$
This is a critical first step. Using Celsius will produce a non-physical result.

**Step 2: Calculate the local speed of sound, $a$.**
Use the formula $a = \sqrt{\gamma R T}$.
$$
a = \sqrt{(1.4) \cdot (287 \, \text{J/(kg}\cdot\text{K)}) \cdot (222.15 \, \text{K})}
$$
$$
a = \sqrt{89204.58} \, \text{m/s} \approx 298.67 \, \text{m/s}
$$
This is the speed at which a pressure wave propagates at 25 km altitude.

**Step 3: Calculate the aircraft's velocity, $V$.**
Rearrange the Mach number definition, $M = V/a$, to solve for $V$.
$$
V = M \cdot a
$$
$$
V = (3.3) \cdot (298.67 \, \text{m/s}) \approx 985.61 \, \text{m/s}
$$

**Step 4: Convert velocity to km/h.**
$$
V = (985.61 \, \text{m/s}) \cdot \frac{3600 \, \text{s/h}}{1000 \, \text{m/km}} \approx 3548.2 \, \text{km/h}
$$

**Reflection:** Each step builds on the last. The temperature conversion (Step 1) is essential for the physics to be correct in Step 2. The core concept is that the speed of sound is not a universal constant but a local property of the medium (Step 2). Finally, the Mach number definition itself is a simple ratio, which we invert to find the true airspeed (Step 3).

## Diagrams
Here are diagrams illustrating how the nature of sound propagation changes with the speed of the source. The `*` is the source's current position, and the `o` marks the center of a wave emitted at a previous point in time.

**1. Subsonic ($M < 1$)**
The source moves, but slower than the waves it emits. The waves ahead of the source are compressed, and those behind are expanded (Doppler effect).
```text
           |
           |
      .... | ....
   .       |      .
 .         *---->  .  (Direction of V)
   .       |      .
      .... | ....
           |
```

**2. Supersonic ($M > 1$)**
The source outruns its own sound waves. The waves constructively interfere along a conical surface, forming a shock wave (the Mach cone).
```text
                  /
                 /
                /
               /
              /
             /
            *----------------> (Direction of V)
           /
          /
         /
        /
       /
      /
```
The line represents the Mach cone, which is a 3D cone in reality. The angle between the direction of motion and the cone surface is the Mach angle, $\mu$.

## Memory technique — remember this forever
1.  **Mnemonic:** Think of "Mach" as the sound a whip makes: "SMACK!" You only hear that crack when the tip of the whip breaks the sound barrier ($M>1$). Subsonic is a "whoosh," but supersonic is a "smack" — a shock wave.
2.  **Must-know formulas:**
    $$ M = \frac{V}{a} $$
    $$ a = \sqrt{\gamma R T} \quad (\text{for an ideal gas}) $$
3.  **Spaced repetition schedule:** Review these formulas and the Mach cone diagram at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Actively re-derive the Mach angle formula $\sin(\mu) = 1/M$ each time.
4.  **First principles pathway:** If you forget everything, rebuild from the concept of a pressure wave.
    *   Start with 1D conservation of mass and momentum.
    *   Introduce a small, isentropic perturbation.
    *   Combine the equations to form a wave equation: $\frac{\partial^2 \rho'}{\partial t^2} = c^2 \frac{\partial^2 \rho'}{\partial x^2}$.
    *   The wave speed squared is the constant $c^2 = a^2 = (\partial P / \partial \rho)_s$.
    *   For an ideal gas undergoing an isentropic process ($P/\rho^\gamma = C$), calculate the derivative to get $a = \sqrt{\gamma P/\rho}$.
    *   Substitute the ideal gas law $P=\rho RT$ to arrive at $a = \sqrt{\gamma R T}$.

## Common mistakes
1.  **Using Celsius/Fahrenheit for Temperature:** The speed of sound formula $a = \sqrt{\gamma R T}$ is derived from thermodynamic principles that require absolute temperature (Kelvin or Rankine). Using Celsius will give a completely wrong answer.
2.  **Treating the Speed of Sound as a Constant:** The speed of sound at sea level (~340 m/s) is often quoted, but it decreases significantly with altitude because the temperature drops. An aircraft's true airspeed at a constant Mach number will decrease as it climbs into colder air.
3.  **Ignoring the Transonic Regime:** Students often think of flow as either purely subsonic or purely supersonic. The transonic regime ($0.8 < M < 1.2$) is extremely complex, with pockets of supersonic flow appearing over the wings even when the aircraft itself is flying subsonically. This "mixed" flow leads to instability and a sharp rise in drag known as the "sound barrier."
4.  **Confusing the Mach Cone with a Bow Shock:** The Mach cone is an idealized cone originating from an infinitesimally small disturbance. A real, blunt-nosed object flying supersonically will create a *detached bow shock* that stands off in front of the body, which is curved, not a perfect cone.

## Self-check
1.  An F-15 Eagle is flying at Mach 2.5 at an altitude where the air temperature is 217 K. What is its velocity in m/s? (Use $\gamma=1.4, R=287$ J/kg·K).
2.  Explain, using the formula for the speed of sound, why a commercial airliner flying at a constant true airspeed of 240 m/s will have a higher Mach number at its cruising altitude (e.g., 11 km) than it does at sea level.
3.  An object is traveling at Mach 2.0. A tiny pressure disturbance is created on its nose. From the perspective of an observer on the ground, how far will the object have traveled by the time the disturbance has propagated 1 meter sideways (perpendicular to the flight path)?