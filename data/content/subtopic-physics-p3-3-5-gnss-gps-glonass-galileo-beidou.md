## What it is
A Global Navigation Satellite System (GNSS) is a constellation of satellites orbiting Earth that provides signals from space, transmitting positioning and timing data to receivers. The receiver then uses this data to determine its precise location (Position), velocity (Velocity), and time (Time), collectively known as a PVT solution. GPS (American), GLONASS (Russian), Galileo (European), and BeiDou (Chinese) are the primary global GNSS constellations.

## Why it matters
GNSS is the backbone of modern navigation for nearly every vehicle, from cars to commercial aircraft to interplanetary probes during their near-Earth phases. In aerospace, GNSS data is a primary input to an Inertial Navigation System's (INS) Kalman filter, allowing for continuous correction of drift from gyros and accelerometers to produce a high-fidelity state estimate. Without robust GNSS, long-duration autonomous flight and precise orbital maneuvering would be impossible.

## When to study it
Before tackling GNSS, you must have a solid grasp of:
1.  **Classical Mechanics & Orbital Mechanics:** Specifically, Kepler's laws and the properties of satellite orbits (e.g., inclination, period, semi-major axis).
2.  **Electromagnetism:** Understand that electromagnetic waves travel at a finite speed, $c$, and how to model their propagation time.
3.  **Special & General Relativity:** You need to understand the concepts of time dilation (both due to velocity and gravity) as they are critical for satellite clock correction. Without these corrections, the entire system fails within minutes.
4.  **Linear Algebra:** Solving systems of linear equations is fundamental to calculating a position fix.

If you are not confident in these areas, pause and review them. The mathematics of GNSS will be opaque otherwise.

## How to study it (step by step)
1.  **Master the 2D case on paper.** Draw two circles centered at known points $(x_1, y_1)$ and $(x_2, y_2)$. See that they intersect at two points. Add a third circle centered at $(x_3, y_3)$ and see how it resolves the ambiguity to a single point. This is the core geometric principle of trilateration.
2.  **Introduce the time variable.** The "radius" of each circle is not a known distance but is calculated from a time-of-flight measurement: $d = c \cdot \Delta t$. Write down the equation for a sphere centered on a satellite: $(x_s - x_u)^2 + (y_s - y_u)^2 + (z_s - z_u)^2 = (c \cdot \Delta t)^2$.
3.  **Introduce the clock bias.** The receiver's clock is cheap and inaccurate. The measured time difference is not the true $\Delta t$, but a "pseudo" version. Let the true time be $t_{true}$ and the receiver's measured time be $t_{rec} = t_{true} + b_u$, where $b_u$ is the receiver's clock bias. The satellite's clock is considered perfect (it's an atomic clock, corrected from the ground). The measured time of flight is $\Delta t_{measured} = (t_{rec, rx}) - (t_{sat, tx}) = (t_{true, rx} + b_u) - t_{true, tx} = \Delta t_{true} + b_u$. This introduces a fourth unknown, $b_u$.
4.  **Write the full system of equations.** With four unknowns $(x_u, y_u, z_u, b_u)$, you need at least four satellite measurements. Write out the four pseudorange equations. This is a system of four non-linear equations.
5.  **Linearize the system.** Acknowledge that solving the non-linear system directly is hard. The standard approach is to use an iterative method like Newton-Raphson, which requires linearizing the system around an initial guess. Study the derivation of this linearization.
6.  **Compare the constellations.** Create a small table comparing GPS, GLONASS, Galileo, and BeiDou on key parameters: number of satellites, orbital inclination, altitude, and signal structure (e.g., CDMA vs. FDMA for older GLONASS). This provides context.

## Key ideas, with intuition
1.  **Trilateration, not Triangulation.** We are measuring *distances* to satellites, not *angles*. Imagine you are lost. If you know you are 10 km from City A, you could be anywhere on a circle of 10 km radius. If you also know you are 8 km from City B, you narrow your position down to one of two intersection points. A third distance measurement from City C resolves the ambiguity. This is trilateration.
2.  **Time is the Fundamental Measurement.** A GNSS satellite broadcasts a precisely timed signal. The receiver notes the time of arrival. The time difference, multiplied by the speed of light, gives the distance.
    $$d = c \cdot (t_{received} - t_{sent})$$
    The entire system is a distributed, high-precision clock.
3.  **The Fourth Satellite is for Time, not Space.** You live in a 3D world, so geometry suggests 3 measurements should be enough for a 3D fix $(x, y, z)$. However, your receiver's quartz clock is not perfectly synchronized with the satellites' atomic clocks. This clock offset or bias, $b_u$, is an additional unknown. To solve for four unknowns $(x_u, y_u, z_u, b_u)$, you need a minimum of four independent measurements from four different satellites.
4.  **Pseudorange is the Real Measurement.** The "range" we calculate is contaminated by the receiver's clock bias. We call it a *pseudorange*, $\rho$. The true geometric range is $r$.
    $$ \rho = r + c \cdot b_u $$
    For the $i$-th satellite, the full equation is:
    $$ \rho_i = \sqrt{(x_{s,i} - x_u)^2 + (y_{s,i} - y_u)^2 + (z_{s,i} - z_u)^2} + c \cdot b_u $$
    Here, $(x_{s,i}, y_{s,i}, z_{s,i})$ is the known position of satellite $i$, and $(x_u, y_u, z_u, b_u)$ are the four unknowns we must solve for.

## Worked example
Let's solve a simplified 2D problem with three "satellites" to find a user's position $(x_u, y_u)$ and their clock bias $b_u$.

**Given:**
-   Satellite 1 position: $S_1 = (15, 20)$ [Mm]
-   Satellite 2 position: $S_2 = (5, 10)$ [Mm]
-   Satellite 3 position: $S_3 = (20, 5)$ [Mm]
-   Measured pseudoranges: $\rho_1 = 13.000060$ Mm, $\rho_2 = 5.000060$ Mm, $\rho_3 = 10.000060$ Mm.
-   Speed of light: $c \approx 3 \times 10^8$ m/s = $0.3$ Mm/$\mu$s.
-   Let's define a new unknown for convenience: the clock bias in units of distance, $d_b = c \cdot b_u$. Our unknowns are $(x_u, y_u, d_b)$.

**Setup:**
The system of equations is:
1.  $\rho_1 = \sqrt{(15 - x_u)^2 + (20 - y_u)^2} + d_b$
2.  $\rho_2 = \sqrt{(5 - x_u)^2 + (10 - y_u)^2} + d_b$
3.  $\rho_3 = \sqrt{(20 - x_u)^2 + (5 - y_u)^2} + d_b$

**Solution:**
This system is non-linear. However, notice the structure. Let's isolate the square root terms and square both sides.
Let $r_i$ be the true range to satellite $i$. Then $r_i = \rho_i - d_b$.
1.  $(\rho_1 - d_b)^2 = (15 - x_u)^2 + (20 - y_u)^2$
2.  $(\rho_2 - d_b)^2 = (5 - x_u)^2 + (10 - y_u)^2$
3.  $(\rho_3 - d_b)^2 = (20 - x_u)^2 + (5 - y_u)^2$

Expand the equations:
1.  $\rho_1^2 - 2\rho_1 d_b + d_b^2 = 15^2 - 30x_u + x_u^2 + 20^2 - 40y_u + y_u^2$
2.  $\rho_2^2 - 2\rho_2 d_b + d_b^2 = 5^2 - 10x_u + x_u^2 + 10^2 - 20y_u + y_u^2$
3.  $\rho_3^2 - 2\rho_3 d_b + d_b^2 = 20^2 - 40x_u + x_u^2 + 5^2 - 10y_u + y_u^2$

The non-linear terms $x_u^2, y_u^2, d_b^2$ are annoying. We can eliminate them by subtracting equations. Let's compute (1) - (2) and (1) - (3).
(1) - (2):
$\rho_1^2 - \rho_2^2 - 2(\rho_1 - \rho_2)d_b = (15^2+20^2) - (5^2+10^2) - (30-10)x_u - (40-20)y_u$
$169.00156 - 25.0006 = (625 - 125) - 20x_u - 20y_u - 2(13.000060 - 5.000060)d_b$
$144.00096 = 500 - 20x_u - 20y_u - 16d_b$
$20x_u + 20y_u + 16d_b = 355.99904$ (Eq. A)

(1) - (3):
$\rho_1^2 - \rho_3^2 - 2(\rho_1 - \rho_3)d_b = (15^2+20^2) - (20^2+5^2) - (30-40)x_u - (40-10)y_u$
$169.00156 - 100.0012 = (625 - 425) - (-10x_u) - 30y_u - 2(13.000060 - 10.000060)d_b$
$68.99036 = 200 + 10x_u - 30y_u - 6d_b$
$-10x_u + 30y_u + 6d_b = -131.00964$ (Eq. B)

Now we have a problem. We have two linear equations (A and B) but three unknowns. The differencing trick only works if the clock bias is known. The problem is fundamentally non-linear. The standard approach is linearization and iteration, but for this simple case, let's use inspection.

The true ranges must be $r_1=13$, $r_2=5$, $r_3=10$. This would mean the user is at $(10, 8)$. Let's check:
$r_1 = \sqrt{(15-10)^2 + (20-8)^2} = \sqrt{5^2 + 12^2} = \sqrt{25+144} = \sqrt{169} = 13$. Correct.
$r_2 = \sqrt{(5-10)^2 + (10-8)^2} = \sqrt{(-5)^2 + 2^2} = \sqrt{25+4} = \sqrt{29} \neq 5$. My inspection was wrong.

Let's re-examine the pseudoranges. They all have a `...000060` Mm part. This suggests a common bias.
Let's hypothesize that the clock bias term $d_b = 0.000060$ Mm.
Then the true ranges would be:
$r_1 = 13.000060 - 0.000060 = 13$ Mm
$r_2 = 5.000060 - 0.000060 = 5$ Mm
$r_3 = 10.000060 - 0.000060 = 10$ Mm

Let's solve the system with these true ranges:
1.  $13^2 = 169 = (15 - x_u)^2 + (20 - y_u)^2$
2.  $5^2 = 25 = (5 - x_u)^2 + (10 - y_u)^2$
3.  $10^2 = 100 = (20 - x_u)^2 + (5 - y_u)^2$

Now we can use the subtraction trick on these simplified (but still non-linear) equations.
(1) - (2): $169 - 25 = 144 = (15^2 - 30x_u + x_u^2 + 20^2 - 40y_u + y_u^2) - (5^2 - 10x_u + x_u^2 + 10^2 - 20y_u + y_u^2)$
$144 = (625 - 30x_u - 40y_u) - (125 - 10x_u - 20y_u)$
$144 = 500 - 20x_u - 20y_u \implies 20x_u + 20y_u = 356 \implies x_u + y_u = 17.8$ (Eq. C)

(2) - (3): $25 - 100 = -75 = (125 - 10x_u - 20y_u) - (425 - 40x_u - 10y_u)$
$-75 = -300 + 30x_u - 10y_u \implies 30x_u - 10y_u = 225 \implies 3x_u - y_u = 22.5$ (Eq. D)

Now we have a simple linear system in $x_u, y_u$:
C: $x_u + y_u = 17.8$
D: $3x_u - y_u = 22.5$

Add (C) and (D): $4x_u = 40.3 \implies x_u = 10.075$
Substitute into (C): $10.075 + y_u = 17.8 \implies y_u = 7.725$

**Result:**
The user's position is $(10.075, 7.725)$ Mm.
The clock bias term is $d_b = 0.000060$ Mm. To find the time bias $b_u$:
$b_u = d_b / c = 0.000060 \text{ Mm} / 0.3 \text{ Mm}/\mu\text{s} = 0.2 \ \mu\text{s}$.

**Reflection:**
-   Step 1: We set up the fundamental pseudorange equations based on geometry and the definition of clock bias.
-   Step 2: We recognized the system was non-linear. The key trick was to subtract the squared equations to cancel the quadratic user position terms, yielding a linear system.
-   Step 3: This only worked because we correctly inferred the clock bias first. In a real scenario, you would linearize the full system and solve iteratively for all unknowns simultaneously. This example shows the mechanics of the geometry and why the clock bias term can be solved for with an additional measurement.

## Diagrams
```text
           S1 (*)
             \
              \  r1
               \
                \
       S2 (*)----.----U(x,y)
          |     /
        r2|    / r3
          |   /
         S3 (*)


A 2D Trilateration Scenario.
S1, S2, S3 are satellites with known positions.
U is the user at an unknown position.
r1, r2, r3 are the true ranges (distances) from the user to each satellite.
The receiver measures pseudoranges (rho), which equal the true range plus a clock bias term.
```

## Memory technique — remember this forever
1.  **The Story:** You're a spy who needs to find a hidden treasure at $(x_u, y_u, z_u)$. Your watch is cheap and off by an unknown amount, $b_u$. You have four informants (satellites) in the sky at known locations. Each informant simultaneously yells out their location and the exact time. You hear each yell at a slightly different time because of the distance the sound travels. By comparing the time you *thought* it was when you heard them to the time they *said* it was when they yelled, you can calculate four "pseudo-distances". With these four pieces of information, you can solve for the four unknowns: the treasure's location $(x_u, y_u, z_u)$ and exactly how wrong your watch is $(b_u)$. **Four unknowns require four informants.**

2.  **Overlearn this Formula:** The Pseudorange Equation.
    $$ \rho_i = \sqrt{(x_{s,i} - x_u)^2 + (y_{s,i} - y_u)^2 + (z_{s,i} - z_u)^2} + c \cdot b_u $$
    This is the entire concept in one line: Measured Pseudorange = True Geometric Range + Clock Bias Error (as distance).

3.  **Spaced Repetition:** Review this concept and re-derive the pseudorange equation from geometry at these intervals:
    -   24 hours
    -   3 days
    -   7 days
    -   16 days
    -   35 days

4.  **First Principles Pathway:** If you forget everything, rebuild it.
    -   Start with the 3D distance formula: $d = \sqrt{\Delta x^2 + \Delta y^2 + \Delta z^2}$. This is the true range, $r_i$.
    -   Remember the measurement is based on time: $d = c \cdot \Delta t$.
    -   The receiver's clock is wrong. The measured time interval isn't the true time of flight $\Delta t_{true}$, but is contaminated: $\Delta t_{measured} = \Delta t_{true} + b_u$.
    -   The measured distance (pseudorange $\rho_i$) is therefore $\rho_i = c \cdot \Delta t_{measured} = c \cdot (\Delta t_{true} + b_u) = (c \cdot \Delta t_{true}) + (c \cdot b_u)$.
    -   Substitute the first two points into the third: $\rho_i = r_i + c \cdot b_u$.
    -   Expand $r_i$ with the distance formula. You have re-derived the key equation.

## Common mistakes
1.  **Forgetting the Clock Bias:** The most common error is thinking 3 satellites are sufficient for a 3D fix. This is only true if you have a perfectly synchronized atomic clock in your receiver, which you don't.
2.  **Confusing Pseudorange with Geometric Range:** Never assume the measured pseudorange $\rho_i$ is the true distance to the satellite. It is always contaminated by at least the receiver clock bias, and in reality, by atmospheric delays and other errors.
3.  **Ignoring Relativistic Effects:** When discussing how GNSS *works*, you must account for relativity. Satellite clocks run faster than ground clocks (due to weaker gravity - General Relativity) but also slower (due to high velocity - Special Relativity). The GR effect dominates. These effects are precisely calculated and corrected for; without the corrections, the system would accumulate kilometers of error per day.
4.  **Linearization Errors:** Assuming the equations are linear from the start. They are fundamentally non-linear (due to the square root/squared terms). The standard solution is iterative and requires linearizing the system around a best guess for the user's state.

## Self-check
1.  A GNSS receiver is tracking 5 visible satellites. It computes a valid PVT solution. One satellite then sets below the horizon. What is the immediate impact on the receiver's ability to calculate its position and clock bias?
2.  Explain the difference between Dilution of Precision (DOP) and the number of visible satellites. Is it always better to have 10 satellites clustered in one small patch of the sky than 4 satellites spread widely across the entire sky? Why or why not?
3.  A stationary receiver on the Earth's surface calculates its position. One hour later, it calculates its position again and gets a slightly different answer, even though it hasn't moved. List three distinct physical phenomena that could contribute to this change.