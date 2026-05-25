## What it is
A launch window is the specific period of time during which a spacecraft must be launched to reach its intended target or orbit. For phasing with a target orbit, this window is dictated by the precise moment when the angular separation (the "phase angle") between the launch point and the target vehicle is correct, ensuring an intercept after the transfer maneuver. It's about timing the launch to meet a moving target in space.

## Why it matters
This is the fundamental operational constraint for all rendezvous, docking, and intercept missions. Cargo missions to the International Space Station (ISS), deployment of satellite constellations, and future on-orbit servicing and debris removal all depend on precise launch window calculations. Miscalculate, and you either waste enormous amounts of fuel making corrections or miss the target entirely.

## When to study it
Before tackling this, you must have a solid understanding of:
1.  **Kepler's Laws of Planetary Motion:** Particularly the relationship between orbital period and semi-major axis.
2.  **Orbital Elements:** You should be comfortable describing an orbit with parameters like semi-major axis ($a$) and eccentricity ($e$).
3.  **The Vis-viva Equation:** $v^2 = \mu \left(\frac{2}{r} - \frac{1}{a}\right)$.
4.  **Hohmann Transfer:** You must understand how to calculate the characteristics and time-of-flight for this minimum-energy transfer orbit.

If you are not confident with these, master them first. This topic builds directly upon them.

## How to study it (step by step)
1.  **Review the Hohmann Transfer Time:** Re-derive the formula for the time of flight ($T_{trans}$) for a Hohmann transfer from an initial circular orbit of radius $r_1$ to a final circular orbit of radius $r_2$. Start with the semi-major axis of the transfer ellipse, $a_{trans} = \frac{r_1 + r_2}{2}$, and use Kepler's Third Law.
2.  **Define the Phase Angle:** Draw two concentric circles representing a chaser spacecraft's initial orbit and a target's orbit. Mark their positions. The phase angle, $\phi$, is the angle between the position vector of the target and the position vector of the chaser.
3.  **Calculate Target Motion:** During the chaser's transfer time, $T_{trans}$, the target continues to move in its own orbit. Calculate the angle, $\alpha$, swept out by the target during this time. This is your "lead angle". Use the target's angular velocity, $\omega_T$.
4.  **Derive the Rendezvous Condition:** For a successful rendezvous, the chaser must arrive at the final orbit at the exact point the target is also arriving. This means the chaser's total travel angle (180 degrees, or $\pi$ radians for the Hohmann transfer) must equal the target's travel angle ($\alpha$) plus the initial phase angle ($\phi_0$). Use this to find the required initial phase angle: $\phi_0 = \pi - \alpha$.
5.  **Calculate the Wait Time:** In general, the target and launch point will not have the correct initial phasing. Calculate the current phase angle, $\phi_{current}$, and the required angle, $\phi_0$. The difference determines how long you must wait on the ground for the orbits to align correctly. This depends on the difference in angular velocities of the target and the launch site (which is rotating with the Earth).

## Key ideas, with intuition
1.  **The Quarterback Lead Pass:** You don't throw a football to where the receiver *is*, you throw it to where they *will be* when the ball arrives. Launching a spacecraft is the same. The launch window is the moment the "receiver" (the target) is in the perfect position downfield so that our "football" (the spacecraft) arrives at the same time and place.
2.  **Lower Orbits are Faster:** A key insight for rendezvous is that the chaser is typically placed in a lower (and thus faster) orbit than the target to catch up. The difference in orbital periods is what allows the phase angle to change over time, eventually reaching the desired value for the final transfer.
3.  **The Required Phase Angle ($\phi_0$):** The core calculation is finding the correct angular separation at the moment the transfer begins. The chaser travels $\pi$ radians to its apogee. In that same time, the target travels some angle $\alpha$. For them to meet, the target must have been at an angle of $\pi - \alpha$ behind the chaser's destination point when the chaser started its burn.
    $$ \phi_0 = \pi - \alpha = \pi - \omega_T T_{trans} $$
    Where $\omega_T$ is the angular velocity of the target and $T_{trans}$ is the time of flight of the transfer orbit.
4.  **The Synodic Period:** This is the time it takes for the same relative geometry between two orbiting bodies to repeat. If you miss a launch window, the synodic period tells you how long you have to wait for the *exact* same conditions to occur. It's determined by the difference in their angular velocities.
    $$ T_{synodic} = \frac{2\pi}{|\omega_1 - \omega_2|} $$

## Worked example
**Problem:** A Cygnus cargo spacecraft is in a circular "parking" orbit at an altitude of 250 km. The ISS is in a circular orbit at 400 km. Assuming coplanar orbits, what must the phase angle be between the ISS and Cygnus for Cygnus to initiate a Hohmann transfer and rendezvous?

**Data:**
*   Earth's gravitational parameter, $\mu = 3.986 \times 10^{14} \, \text{m}^3/\text{s}^2$
*   Earth's radius, $R_E = 6378 \, \text{km}$

**Step 1: Define radii**
Convert everything to meters.
*   Cygnus radius: $r_1 = (6378 + 250) \times 10^3 = 6.628 \times 10^6 \, \text{m}$
*   ISS radius: $r_2 = (6378 + 400) \times 10^3 = 6.778 \times 10^6 \, \text{m}$

**Step 2: Calculate the Hohmann transfer time ($T_{trans}$)**
First, find the semi-major axis of the transfer ellipse.
$$ a_{trans} = \frac{r_1 + r_2}{2} = \frac{6.628 \times 10^6 + 6.778 \times 10^6}{2} = 6.703 \times 10^6 \, \text{m} $$
Now, find the period of this elliptical orbit, $P_{trans}$. The time of flight is half the period.
$$ P_{trans} = 2\pi \sqrt{\frac{a_{trans}^3}{\mu}} = 2\pi \sqrt{\frac{(6.703 \times 10^6)^3}{3.986 \times 10^{14}}} \approx 5373.4 \, \text{s} $$
$$ T_{trans} = \frac{P_{trans}}{2} \approx 2686.7 \, \text{s} \quad (\approx 44.8 \, \text{minutes}) $$

**Step 3: Calculate how far the ISS moves during the transfer**
First, find the angular velocity of the ISS ($\omega_{ISS}$).
$$ \omega_{ISS} = \sqrt{\frac{\mu}{r_2^3}} = \sqrt{\frac{3.986 \times 10^{14}}{(6.778 \times 10^6)^3}} \approx 1.130 \times 10^{-3} \, \text{rad/s} $$
Now, find the angle $\alpha$ the ISS sweeps through during the transfer time.
$$ \alpha = \omega_{ISS} \times T_{trans} = (1.130 \times 10^{-3}) \times 2686.7 \approx 3.036 \, \text{rad} $$

**Step 4: Calculate the required initial phase angle ($\phi_0$)**
The rendezvous occurs when the chaser (Cygnus) has traveled $\pi$ radians and the target (ISS) has traveled $\alpha$ radians from its initial position. For them to meet, the ISS must be *ahead* of Cygnus at the start.
$$ \phi_0 = \pi - \alpha = 3.14159 - 3.036 \approx 0.1056 \, \text{rad} $$
Converting to degrees:
$$ \phi_0 \approx 0.1056 \times \frac{180}{\pi} \approx 6.05^\circ $$

**Reflection:**
*   Step 1 was unit conversion and defining the problem geometry. Essential.
*   Step 2 calculated the time the "football is in the air." This is the core timing constraint, derived from Kepler's laws.
*   Step 3 calculated where the "receiver will be." We found how far the ISS moves in that time.
*   Step 4 put it all together. The required initial separation is the difference between where Cygnus will be ($\pi$ rad ahead) and how far the ISS will move ($\alpha$ rad). This gave us the necessary "lead." The ISS must be $6.05^\circ$ ahead of Cygnus when Cygnus begins its burn.

## Diagrams
Here is a diagram of the initial phasing condition. `T` is the Target (ISS), `C` is the Chaser (Cygnus). The burn occurs at `C`'s position, targeting the rendezvous point `R`.

```text
                  . . . . . . . . . . . . . .
            .                                 .
         .                                     .
       .                                         .
      .                  T (ISS Orbit, r2)         .
     .                                             .
    .                                               .
   .                                                 .
  .        C (Cygnus Orbit, r1)                      .
 .                                                   .
 .                     * (Earth)           R (Rendezvous)
 .                                                   .
  .                                                 .
   .       <-----> \                               .
    .      (Burn)   \                             .
     .               \ (Transfer Orbit)          .
      .               \                          .
       .               \                       .
         .              . . . . . . . . . . .
          .                                 .
            . . . . . . . . . . . . . . . .

Angle(R, Earth, T) = alpha
Angle(R, Earth, C) = pi
Required Phase Angle, phi_0 = Angle(T, Earth, C) = pi - alpha
```

## Memory technique — remember this forever
1.  **The Story:** "The Interstellar Quarterback." Your spacecraft is the football. The target is the receiver running a deep route. You can't throw to the receiver's current position. You must calculate how far the receiver will run (`alpha`) during the ball's flight time (`T_trans`) and throw it to that future spot. The phase angle (`phi_0`) is the "lead" you give the receiver.
2.  **Must-Know Formulas:**
    *   Hohmann Transfer Time: $T_{trans} = \pi \sqrt{\frac{a_{trans}^3}{\mu}}$ where $a_{trans} = \frac{r_1+r_2}{2}$
    *   Required Phase Angle: $\phi_0 = \pi - \omega_T T_{trans}$ (Target must be *ahead* of chaser by this angle).
3.  **Spaced Repetition Schedule:**
    *   Review this entire lesson in: 1 day.
    *   Attempt a new problem in: 3 days.
    *   Re-derive the phase angle formula from scratch in: 7 days.
    *   Explain the concept to a friend (or a rubber duck) in: 16 days.
    *   Solve a problem with non-zero initial phase and calculate wait time in: 35 days.
4.  **First Principles Pathway:** If you forget the formula for $\phi_0$, rebuild it:
    *   The chaser travels 180 degrees ($\pi$ radians) on a Hohmann transfer.
    *   How long does that take? $T_{trans}$ comes from Kepler's 3rd Law for the transfer ellipse.
    *   In that time, the target also moves. How far? Angle = angular velocity $\times$ time. So, $\alpha = \omega_T T_{trans}$.
    *   For them to meet, the target must start at an angle such that after it moves $\alpha$, it's at the same place the chaser is after it moves $\pi$. This means the target must start at the final point minus the distance it will travel: $\phi_0 = \pi - \alpha$.

## Common mistakes
1.  **Mixing up the lead/lag direction.** Students often calculate the magnitude of the phase angle correctly but get the sign wrong. Remember: for a chaser in a lower orbit to catch up, the target must be *ahead* of it.
2.  **Forgetting the target moves.** The most basic mistake is to assume the required phase angle is simply $\pi$ radians. This implies the target is stationary, which is never true.
3.  **Unit Hell.** Calculations will fail if you mix km and m, or degrees and radians. The formula $\alpha = \omega_T T_{trans}$ *requires* $\omega_T$ to be in rad/s. Convert all angles to radians for calculation, then convert back to degrees for intuition if needed.
4.  **Ignoring Earth's Rotation.** This simplified model assumes you can start the transfer at any point in the parking orbit. In reality, you launch from a fixed site on a rotating Earth. The true launch window is when the launch site's position, the target's position, and the required orbital plane all align. This creates very short, specific launch times each day.

## Self-check
1.  A spy satellite is in a 300 km circular orbit. You want to launch an inspection craft from a 200 km parking orbit to rendezvous with it. What is the required phase angle at the start of the Hohmann transfer?
2.  How would that required phase angle change if you used a faster, more energetic transfer (a "bi-elliptic" or simple higher-thrust transfer) that took only 30 minutes? Would the initial angle need to be larger or smaller? Why?
3.  The ISS's orbit is inclined at $51.6^\circ$. You are at a launch site at $28^\circ$ latitude (e.g., Cape Canaveral). Even if the phase angle is perfect, why can you not launch at any random time of day to begin your rendezvous sequence? What other condition must be met?