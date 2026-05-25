## 1. What it is — in plain English

Imagine you have a toy car on a small circular track, and you want to move it to a much, much bigger circular track. You want to use the least amount of fuel possible to do this.

The most common way, called a "Hohmann transfer," is like making one big jump. You speed up once to launch the car onto a huge oval path that touches both the small track and the big track. When it reaches the big track, you speed up again to make it circle there. This is usually the most fuel-efficient way if the tracks aren't too different in size.

Now, a "bi-elliptic transfer" is like taking a detour. Instead of one big jump, you make three smaller adjustments. First, you speed up to launch the car onto an *even bigger* oval path than the Hohmann, one that goes really, really far out into space, much farther than your target big track. When the car reaches the farthest point of this super-stretched oval, you give it another little push. This second push changes its path so it now aims *back inwards* towards your target big track. Finally, when it reaches the target big track, you give it a third push to make it circle there.

It sounds like more work (three pushes instead of two!), and it definitely takes longer, but sometimes, for very specific situations where the target track is *much, much larger* than the starting track, this "detour" method actually saves you fuel compared to the single big jump.

## 2. Why it matters — real-world applications

Bi-elliptic transfers are not just theoretical curiosities; they have practical applications where fuel efficiency is paramount, even if it means longer travel times.

1.  **Deep Space Missions and Interplanetary Transfers:** When a spacecraft needs to move from a relatively low orbit around a planet (like Earth) to a very high, distant orbit, or even escape the planet's sphere of influence to travel to another planet, bi-elliptic transfers can offer significant fuel savings. For instance, moving a probe from a Low Earth Orbit (LEO) to a very high Earth orbit before sending it to Jupiter or Saturn might benefit from a bi-elliptic strategy if the final escape velocity requirement is very high relative to the initial orbit.
2.  **Satellite Repositioning in Distant Orbits:** While a Hohmann transfer is typically used for LEO to Geostationary Earth Orbit (GEO) transfers (due to the specific radius ratio), if a satellite needs to be moved from a LEO to a much, much higher "graveyard orbit" (far beyond GEO) for disposal, or to a very high-altitude science orbit, a bi-elliptic transfer might be more efficient. Companies like SpaceX or Blue Origin, which launch many satellites, constantly optimize these maneuvers for cost and fuel.
3.  **Orbital Debris Mitigation:** As space becomes more crowded, managing orbital debris is crucial. One strategy is to move defunct satellites or large pieces of debris into "graveyard orbits" or deorbit them. If a piece of debris is in a relatively stable, high orbit, moving it to an even higher, more stable graveyard orbit (that doesn't intersect operational orbits) could potentially use a bi-elliptic transfer for fuel savings, especially if the target graveyard orbit is extremely distant.
4.  **Hypothetical Future Infrastructure:** Imagine building large space stations or industrial complexes in very high Earth orbits or at Earth-Moon Lagrange points. Moving massive components from LEO to these extremely distant locations would necessitate minimizing fuel expenditure, making bi-elliptic transfers a candidate for certain stages of transport.

## 3. Prerequisites — what you must know first

Before diving deep into bi-elliptic transfers, ensure you have a solid grasp of the following foundational concepts:

*   **Kepler's Laws of Planetary Motion:** Understanding that orbits are ellipses, how orbital speed changes with distance from the central body, and the relationship between orbital period and semi-major axis.
*   **Specific Mechanical Energy (Orbital Energy):** The concept that the total energy of an orbiting object (kinetic + potential) is constant in a two-body system and is solely determined by its semi-major axis.
*   **Vis-viva Equation:** The fundamental equation relating orbital velocity ($v$) to the gravitational parameter ($\mu$), the distance from the central body ($r$), and the semi-major axis ($a$) of the orbit: $v = \sqrt{\mu \left( \frac{2}{r} - \frac{1}{a} \right)}$. This is critical for calculating velocities at various points in an elliptical orbit.
*   **Orbital Maneuvers (Impulsive Burns):** The idealization that changes in velocity ($\Delta V$) occur instantaneously, requiring a specific amount of fuel. This allows us to calculate the change in velocity needed to transition between orbits.
*   **Circular Orbits:** The specific case of an ellipse with zero eccentricity, where velocity is constant and given by $v_c = \sqrt{\frac{\mu}{r}}$.
*   **Elliptical Orbits:** Key parameters like semi-major axis ($a$), eccentricity ($e$), perigee ($r_p$), and apogee ($r_a$) distances. Understanding that velocity is highest at perigee and lowest at apogee.
*   **Hohmann Transfer:** The standard two-burn elliptical transfer used to move between two coplanar circular orbits. You should be able to calculate the $\Delta V$ for a Hohmann transfer.

## 4. The core idea — step by step

The bi-elliptic transfer involves three impulsive burns to move a spacecraft from an initial circular orbit ($r_1$) to a final, larger circular orbit ($r_2$) via an intermediate, very high apogee radius ($r_b$). Let's break it down.

We assume a central body with gravitational parameter $\mu = GM$.

### Step 1: The Setup — Define Initial and Final Orbits

**Plain-English Statement:** We start in a stable circular orbit at a distance $r_1$ from the central body and want to end up in a stable circular orbit at a larger distance $r_2$.

**Small Concrete Example:** A satellite is in a circular orbit $r_1 = 7000 \text{ km}$ from the center of Earth. We want to move it to a circular orbit $r_2 = 100,000 \text{ km}$.

**Formal/Mathematical Version:**
The initial orbit is circular with radius $r_1$. Its velocity is:
$$v_1 = \sqrt{\frac{\mu}{r_1}}$$
The final orbit is circular with radius $r_2$. Its velocity will be:
$$v_2 = \sqrt{\frac{\mu}{r_2}}$$

**What Could Go Wrong:** Miscalculating these initial and final circular velocities can throw off all subsequent calculations. Ensure you use the correct $\mu$ for the central body.

### Step 2: First Burn — Entering the First Transfer Ellipse

**Plain-English Statement:** We give the spacecraft a forward push (Burn 1) to make it speed up and enter a highly eccentric elliptical orbit. This ellipse starts at our initial radius $r_1$ (its perigee) and stretches out to a very distant point, $r_b$ (its apogee). This $r_b$ is the "detour" point, chosen to be much larger than $r_2$.

**Small Concrete Example:** From $r_1 = 7000 \text{ km}$, we burn to reach an apogee of $r_b = 200,000 \text{ km}$. The first transfer ellipse will have $r_p = 7000 \text{ km}$ and $r_a = 200,000 \text{ km}$.

**Formal/Mathematical Version:**
The semi-major axis of the first transfer ellipse (Ellipse A) is $a_A = \frac{r_1 + r_b}{2}$.
The velocity at perigee ($r_1$) of Ellipse A is calculated using the Vis-viva equation:
$$v_{pA} = \sqrt{\mu \left( \frac{2}{r_1} - \frac{1}{a_A} \right)}$$
The $\Delta V$ for the first burn is the difference between this perigee velocity and the initial circular velocity:
$$\Delta V_1 = v_{pA} - v_1$$
This burn is prograde (in the direction of motion) to increase orbital energy.

**What Could Go Wrong:** Incorrectly calculating $a_A$ or $v_{pA}$. Forgetting to subtract $v_1$ to get the *change* in velocity.

### Step 3: Second Burn — Entering the Second Transfer Ellipse

**Plain-English Statement:** When the spacecraft reaches the farthest point of its first elliptical path ($r_b$), we give it another forward push (Burn 2). This burn doesn't make it go even further out. Instead, it raises the *perigee* of its orbit. The spacecraft now enters a *second* elliptical orbit (Ellipse B) that also has its apogee at $r_b$, but its perigee is now at the target radius $r_2$.

**Small Concrete Example:** At $r_b = 200,000 \text{ km}$, the spacecraft has slowed down significantly. We give it a boost to enter an ellipse that will bring it back down, with its closest approach being $r_2 = 100,000 \text{ km}$. So Ellipse B has $r_a = 200,000 \text{ km}$ and $r_p = 100,000 \text{ km}$.

**Formal/Mathematical Version:**
First, we need the velocity of the spacecraft at the apogee ($r_b$) of Ellipse A:
$$v_{aA} = \sqrt{\mu \left( \frac{2}{r_b} - \frac{1}{a_A} \right)}$$
Now, we define the second transfer ellipse (Ellipse B). Its apogee is $r_b$ and its perigee is $r_2$.
The semi-major axis of Ellipse B is $a_B = \frac{r_b + r_2}{2}$.
The velocity at apogee ($r_b$) of Ellipse B is:
$$v_{aB} = \sqrt{\mu \left( \frac{2}{r_b} - \frac{1}{a_B} \right)}$$
The $\Delta V$ for the second burn is the difference between the required velocity at $r_b$ for Ellipse B and the actual velocity at $r_b$ from Ellipse A:
$$\Delta V_2 = v_{aB} - v_{aA}$$
This burn is also prograde.

**What Could Go Wrong:** Confusing apogee/perigee velocities for the two ellipses. Ensuring $v_{aB}$ is greater than $v_{aA}$ (which it should be for a prograde burn).

### Step 4: Third Burn — Circularizing at the Final Orbit

**Plain-English Statement:** The spacecraft travels along the second elliptical path, falling back towards the central body. When it reaches its closest point, which is our target radius $r_2$, we give it a final push (Burn 3) to adjust its speed so it can settle into a stable circular orbit at $r_2$.

**Small Concrete Example:** When the spacecraft reaches $r_2 = 100,000 \text{ km}$, it's moving very fast. We slow it down just enough to match the circular velocity for that orbit.

**Formal/Mathematical Version:**
We need the velocity of the spacecraft at the perigee ($r_2$) of Ellipse B:
$$v_{pB} = \sqrt{\mu \left( \frac{2}{r_2} - \frac{1}{a_B} \right)}$$
The $\Delta V$ for the third burn is the difference between the final circular velocity $v_2$ and this perigee velocity:
$$\Delta V_3 = v_2 - v_{pB}$$
This burn is retrograde (opposite the direction of motion) because $v_{pB}$ will be greater than $v_2$.

**What Could Go Wrong:** Forgetting to subtract $v_{pB}$ from $v_2$ (or vice-versa, but usually $v_{pB} > v_2$ for this type of transfer). Miscalculating $v_{pB}$ or $v_2$.

### Total $\Delta V$

The total $\Delta V$ for the bi-elliptic transfer is the sum of the absolute values of the three burns:
$$\Delta V_{total} = |\Delta V_1| + |\Delta V_2| + |\Delta V_3|$$
We compare this to the Hohmann transfer $\Delta V$ to determine which is more efficient. The bi-elliptic transfer is always longer in duration than a Hohmann transfer.

## 5. Worked examples — multiple, with every step shown

Let's use the Earth's gravitational parameter for all examples: $\mu = 3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2$.
Radii will be given in km, but calculations must be done in meters. $1 \text{ km} = 1000 \text{ m}$.

### Example 1: Transfer from LEO to a moderately higher orbit ($r_2/r_1 \approx 5$)

**Problem Statement:** A spacecraft is in a circular Low Earth Orbit (LEO) at an altitude of $400 \text{ km}$ above Earth's surface. It needs to be moved to a circular orbit at an altitude of $30,000 \text{ km}$. Compare the $\Delta V$ required for a Hohmann transfer versus a bi-elliptic transfer using an intermediate apogee radius $r_b = 100,000 \text{ km}$ (from Earth's center). Earth's radius $R_E = 6378 \text{ km}$.

**Given:**
*   Initial altitude $h_1 = 400 \text{ km}$
*   Final altitude $h_2 = 30,000 \text{ km}$
*   Intermediate apogee radius $r_b = 100,000 \text{ km}$
*   Earth's radius $R_E = 6378 \text{ km}$
*   $\mu = 3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2$

**What we want:**
*   Total $\Delta V_{Hohmann}$
*   Total $\Delta V_{Bi-elliptic}$
*   Comparison

---

**Step 1: Calculate radii from Earth's center (convert to meters).**
*   $r_1 = R_E + h_1 = 6378 \text{ km} + 400 \text{ km} = 6778 \text{ km} = 6.778 \times 10^6 \text{ m}$
*   $r_2 = R_E + h_2 = 6378 \text{ km} + 30000 \text{ km} = 36378 \text{ km} = 3.6378 \times 10^7 \text{ m}$
*   $r_b = 100,000 \text{ km} = 1.0 \times 10^8 \text{ m}$

**Step 2: Calculate Hohmann Transfer $\Delta V$.**

*   **Initial circular velocity ($v_1$):**
    $$v_1 = \sqrt{\frac{\mu}{r_1}}$$
    $$v_1 = \sqrt{\frac{3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2}{6.778 \times 10^6 \text{ m}}}$$
    $$v_1 = \sqrt{5.88147 \times 10^7 \text{ m}^2/\text{s}^2} = 7669.0 \text{ m/s}$$
    *This is the speed of the spacecraft in its initial circular orbit.*

*   **Semi-major axis of Hohmann transfer ellipse ($a_H$):**
    $$a_H = \frac{r_1 + r_2}{2}$$
    $$a_H = \frac{6.778 \times 10^6 \text{ m} + 3.6378 \times 10^7 \text{ m}}{2} = \frac{4.3156 \times 10^7 \text{ m}}{2} = 2.1578 \times 10^7 \text{ m}$$
    *This defines the size of the elliptical path for the Hohmann transfer.*

*   **Velocity at perigee of Hohmann ellipse ($v_{pH}$):**
    $$v_{pH} = \sqrt{\mu \left( \frac{2}{r_1} - \frac{1}{a_H} \right)}$$
    $$v_{pH} = \sqrt{3.986004418 \times 10^{14} \left( \frac{2}{6.778 \times 10^6} - \frac{1}{2.1578 \times 10^7} \right)}$$
    $$v_{pH} = \sqrt{3.986004418 \times 10^{14} (2.95099 \times 10^{-7} - 4.63444 \times 10^{-8})}$$
    $$v_{pH} = \sqrt{3.986004418 \times 10^{14} (2.487546 \times 10^{-7})} = \sqrt{9.9168 \times 10^7} = 9958.3 \text{ m/s}$$
    *This is the speed needed at $r_1$ to enter the Hohmann transfer ellipse.*

*   **$\Delta V_1$ for Hohmann:**
    $$\Delta V_{1,H} = v_{pH} - v_1 = 9958.3 \text{ m/s} - 7669.0 \text{ m/s} = 2289.3 \text{ m/s}$$
    *This is the first burn, increasing speed to enter the transfer ellipse.*

*   **Velocity at apogee of Hohmann ellipse ($v_{aH}$):**
    $$v_{aH} = \sqrt{\mu \left( \frac{2}{r_2} - \frac{1}{a_H} \right)}$$
    $$v_{aH} = \sqrt{3.986004418 \times 10^{14} \left( \frac{2}{3.6378 \times 10^7} - \frac{1}{2.1578 \times 10^7} \right)}$$
    $$v_{aH} = \sqrt{3.986004418 \times 10^{14} (5.49898 \times 10^{-8} - 4.63444 \times 10^{-8})}$$
    $$v_{aH} = \sqrt{3.986004418 \times 10^{14} (8.6454 \times 10^{-9})} = \sqrt{3.4468 \times 10^6} = 1856.6 \text{ m/s}$$
    *This is the speed of the spacecraft when it reaches the target radius $r_2$ on the transfer ellipse.*

*   **Final circular velocity ($v_2$):**
    $$v_2 = \sqrt{\frac{\mu}{r_2}}$$
    $$v_2 = \sqrt{\frac{3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2}{3.6378 \times 10^7 \text{ m}}} = \sqrt{1.09575 \times 10^7} = 3309.9 \text{ m/s}$$
    *This is the speed needed for a circular orbit at $r_2$.*

*   **$\Delta V_2$ for Hohmann:**
    $$\Delta V_{2,H} = v_2 - v_{aH} = 3309.9 \text{ m/s} - 1856.6 \text{ m/s} = 1453.3 \text{ m/s}$$
    *This is the second burn, increasing speed to circularize the orbit.*

*   **Total $\Delta V_{Hohmann}$:**
    $$\Delta V_{Hohmann} = \Delta V_{1,H} + \Delta V_{2,H} = 2289.3 \text{ m/s} + 1453.3 \text{ m/s} = \mathbf{3742.6 \text{ m/s}}$$
    *This is the total fuel cost for the Hohmann transfer.*

---

**Step 3: Calculate Bi-elliptic Transfer $\Delta V$.**

*   **First Burn ($\Delta V_1$) to Ellipse A ($r_1 \to r_b$):**
    *   Semi-major axis of Ellipse A ($a_A$):
        $$a_A = \frac{r_1 + r_b}{2} = \frac{6.778 \times 10^6 \text{ m} + 1.0 \times 10^8 \text{ m}}{2} = 5.3389 \times 10^7 \text{ m}$$
        *This is the semi-major axis of the first, very stretched-out ellipse.*
    *   Velocity at perigee of Ellipse A ($v_{pA}$):
        $$v_{pA} = \sqrt{\mu \left( \frac{2}{r_1} - \frac{1}{a_A} \right)}$$
        $$v_{pA} = \sqrt{3.986004418 \times 10^{14} \left( \frac{2}{6.778 \times 10^6} - \frac{1}{5.3389 \times 10^7} \right)}$$
        $$v_{pA} = \sqrt{3.986004418 \times 10^{14} (2.95099 \times 10^{-7} - 1.8729 \times 10^{-8})}$$
        $$v_{pA} = \sqrt{3.986004418 \times 10^{14} (2.7637 \times 10^{-7})} = \sqrt{1.1017 \times 10^8} = 10496.2 \text{ m/s}$$
        *This is the speed needed at $r_1$ to enter the first transfer ellipse.*
    *   $\Delta V_{1,BE}$:
        $$\Delta V_{1,BE} = v_{pA} - v_1 = 10496.2 \text{ m/s} - 7669.0 \text{ m/s} = 2827.2 \text{ m/s}$$
        *This is the first burn, pushing the spacecraft out to $r_b$.*

*   **Second Burn ($\Delta V_2$) at $r_b$ (from Ellipse A to Ellipse B ($r_b \to r_2$)):**
    *   Velocity at apogee of Ellipse A ($v_{aA}$):
        $$v_{aA} = \sqrt{\mu \left( \frac{2}{r_b} - \frac{1}{a_A} \right)}$$
        $$v_{aA} = \sqrt{3.986004418 \times 10^{14} \left( \frac{2}{1.0 \times 10^8} - \frac{1}{5.3389 \times 10^7} \right)}$$
        $$v_{aA} = \sqrt{3.986004418 \times 10^{14} (2.0 \times 10^{-8} - 1.8729 \times 10^{-8})}$$
        $$v_{aA} = \sqrt{3.986004418 \times 10^{14} (1.271 \times 10^{-9})} = \sqrt{5.0664 \times 10^5} = 711.8 \text{ m/s}$$
        *This is the speed of the spacecraft when it reaches the intermediate radius $r_b$.*
    *   Semi-major axis of Ellipse B ($a_B$):
        $$a_B = \frac{r_b + r_2}{2} = \frac{1.0 \times 10^8 \text{ m} + 3.6378 \times 10^7 \text{ m}}{2} = 6.8189 \times 10^7 \text{ m}$$
        *This is the semi-major axis of the second ellipse, which brings the spacecraft back to $r_2$.*
    *   Velocity at apogee of Ellipse B ($v_{aB}$):
        $$v_{aB} = \sqrt{\mu \left( \frac{2}{r_b} - \frac{1}{a_B} \right)}$$
        $$v_{aB} = \sqrt{3.986004418 \times 10^{14} \left( \frac{2}{1.0 \times 10^8} - \frac{1}{6.8189 \times 10^7} \right)}$$
        $$v_{aB} = \sqrt{3.986004418 \times 10^{14} (2.0 \times 10^{-8} - 1.4665 \times 10^{-8})}$$
        $$v_{aB} = \sqrt{3.986004418 \times 10^{14} (5.335 \times 10^{-9})} = \sqrt{2.1264 \times 10^6} = 1458.2 \text{ m/s}$$
        *This is the speed needed at $r_b$ to enter the second transfer ellipse.*
    *   $\Delta V_{2,BE}$:
        $$\Delta V_{2,BE} = v_{aB} - v_{aA} = 1458.2 \text{ m/s} - 711.8 \text{ m/s} = 746.4 \text{ m/s}$$
        *This is the second burn, adjusting the orbit at $r_b$ to target $r_2$.*

*   **Third Burn ($\Delta V_3$) at $r_2$ (circularize):**
    *   Velocity at perigee of Ellipse B ($v_{pB}$):
        $$v_{pB} = \sqrt{\mu \left( \frac{2}{r_2} - \frac{1}{a_B} \right)}$$
        $$v_{pB} = \sqrt{3.986004418 \times 10^{14} \left( \frac{2}{3.6378 \times 10^7} - \frac{1}{6.8189 \times 10^7} \right)}$$
        $$v_{pB} = \sqrt{3.986004418 \times 10^{14} (5.49898 \times 10^{-8} - 1.4665 \times 10^{-8})}$$
        $$v_{pB} = \sqrt{3.986004418 \times 10^{14} (4.03248 \times 10^{-8})} = \sqrt{1.6074 \times 10^7} = 4009.2 \text{ m/s}$$
        *This is the speed of the spacecraft when it reaches the target radius $r_2$ on the second transfer ellipse.*
    *   $\Delta V_{3,BE}$:
        $$\Delta V_{3,BE} = v_2 - v_{pB} = 3309.9 \text{ m/s} - 4009.2 \text{ m/s} = -699.3 \text{ m/s}$$
        *This is the third burn, slowing down to circularize. The negative sign indicates a retrograde burn.*

*   **Total $\Delta V_{Bi-elliptic}$:**
    $$\Delta V_{Bi-elliptic} = |\Delta V_{1,BE}| + |\Delta V_{2,BE}| + |\Delta V_{3,BE}|$$
    $$\Delta V_{Bi-elliptic} = 2827.2 \text{ m/s} + 746.4 \text{ m/s} + 699.3 \text{ m/s} = \mathbf{4272.9 \text{ m/s}}$$
    *This is the total fuel cost for the bi-elliptic transfer.*

---

**Comparison:**
*   $\Delta V_{Hohmann} = \mathbf{3742.6 \text{ m/s}}$
*   $\Delta V_{Bi-elliptic} = \mathbf{4272.9 \text{ m/s}}$

**Reflection:** In this case, the Hohmann transfer is more efficient. The ratio $r_2/r_1 = 36378 / 6778 \approx 5.37$. This ratio is well below the threshold where bi-elliptic transfers become advantageous (which is around $11.94$ to $15.58$ depending on $r_b$). This example demonstrates that simply having an intermediate radius $r_b > r_2$ isn't enough; the ratio of the target orbits must be sufficiently large.

### Example 2: Transfer to a very high orbit ($r_2/r_1 \approx 20$)

**Problem Statement:** A spacecraft is in a circular orbit at $r_1 = 6778 \text{ km}$ (LEO). It needs to be moved to a circular orbit at $r_2 = 135,560 \text{ km}$. Compare the $\Delta V$ required for a Hohmann transfer versus a bi-elliptic transfer using an intermediate apogee radius $r_b = 600,000 \text{ km}$.

**Given:**
*   $r_1 = 6778 \text{ km} = 6.778 \times 10^6 \text{ m}$
*   $r_2 = 135,560 \text{ km} = 1.3556 \times 10^8 \text{ m}$
*   $r_b = 600,000 \text{ km} = 6.0 \times 10^8 \text{ m}$
*   $\mu = 3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2$

**What we want:**
*   Total $\Delta V_{Hohmann}$
*   Total $\Delta V_{Bi-elliptic}$
*   Comparison

---

**Step 1: Initial and Final Circular Velocities.**
*   $v_1 = \sqrt{\frac{\mu}{r_1}} = \sqrt{\frac{3.986004418 \times 10^{14}}{6.778 \times 10^6}} = 7669.0 \text{ m/s}$ (Same as Example 1)
*   $v_2 = \sqrt{\frac{\mu}{r_2}} = \sqrt{\frac{3.986004418 \times 10^{14}}{1.3556 \times 10^8}} = \sqrt{2.9404 \times 10^6} = 1714.7 \text{ m/s}$

**Step 2: Calculate Hohmann Transfer $\Delta V$.**

*   $a_H = \frac{r_1 + r_2}{2} = \frac{6.778 \times 10^6 + 1.3556 \times 10^8}{2} = 7.1169 \times 10^7 \text{ m}$
*   $v_{pH} = \sqrt{\mu \left( \frac{2}{r_1} - \frac{1}{a_H} \right)} = \sqrt{3.986004418 \times 10^{14} \left( \frac{2}{6.778 \times 10^6} - \frac{1}{7.1169 \times 10^7} \right)}$
    $= \sqrt{3.986004418 \times 10^{14} (2.95099 \times 10^{-7} - 1.4050 \times 10^{-8})} = \sqrt{1.1207 \times 10^8} = 10586.3 \text{ m/s}$
*   $\Delta V_{1,H} = v_{pH} - v_1 = 10586.3 - 7669.0 = 2917.3 \text{ m/s}$
*   $v_{aH} = \sqrt{\mu \left( \frac{2}{r_2} - \frac{1}{a_H} \right)} = \sqrt{3.986004418 \times 10^{14} \left( \frac{2}{1.3556 \times 10^8} - \frac{1}{7.1169 \times 10^7} \right)}$
    $= \sqrt{3.986004418 \times 10^{14} (1.4753 \times 10^{-8} - 1.4050 \times 10^{-8})} = \sqrt{2.799 \times 10^5} = 529.1 \text{ m/s}$
*   $\Delta V_{2,H} = v_2 - v_{aH} = 1714.7 - 529.1 = 1185.6 \text{ m/s}$
*   $\Delta V_{Hohmann} = 2917.3 + 1185.6 = \mathbf{4102.9 \text{ m/s}}$

---

**Step 3: Calculate Bi-elliptic Transfer $\Delta V$.**

*   **First Burn ($\Delta V_1$) to Ellipse A ($r_1 \to r_b$):**
    *   $a_A = \frac{r_1 + r_b}{2} = \frac{6.778 \times 10^6 + 6.0 \times 10^8}{2} = 3.03389 \times 10^8 \text{ m}$
    *   $v_{pA} = \sqrt{\mu \left( \frac{2}{r_1} - \frac{1}{a_A} \right)} = \sqrt{3.986004418 \times 10^{14} \left( \frac{2}{6.778 \times 10^6} - \frac{1}{3.03389 \times 10^8} \right)}$
        $= \sqrt{3.986004418 \times 10^{14} (2.95099 \times 10^{-7} - 3.2957 \times 10^{-9})} = \sqrt{1.1633 \times 10^8} = 10785.6 \text{ m/s}$
    *   $\Delta V_{1,BE} = v_{pA} - v_1 = 10785.6 - 7669.0 = 3116.6 \text{ m/s}$

*   **Second Burn ($\Delta V_2$) at $r_b$ (from Ellipse A to Ellipse B ($r_b \to r_2$)):**
    *   $v_{aA} = \sqrt{\mu \left( \frac{2}{r_b} - \frac{1}{a_A} \right)} = \sqrt{3.986004418 \times 10^{14} \left( \frac{2}{6.0 \times 10^8} - \frac{1}{3.03389 \times 10^8} \right)}$
        $= \sqrt{3.986004418 \times 10^{14} (3.3333 \times 10^{-9} - 3.2957 \times 10^{-9})} = \sqrt{1.499 \times 10^4} = 122.4 \text{ m/s}$
    *   $a_B = \frac{r_b + r_2}{2} = \frac{6.0 \times 10^8 + 1.3556 \times 10^8}{2} = 3.6778 \times 10^8 \text{ m}$
    *   $v_{aB} = \sqrt{\mu \left( \frac{2}{r_b} - \frac{1}{a_B} \right)} = \sqrt{3.986004418 \times 10^{14} \left( \frac{2}{6.0 \times 10^8} - \frac{1}{3.6778 \times 10^8} \right)}$
        $= \sqrt{3.986004418 \times 10^{14} (3.3333 \times 10^{-9} - 2.7190 \times 10^{-9})} = \sqrt{2.449 \times 10^5} = 494.8 \text{ m/s}$
    *   $\Delta V_{2,BE} = v_{aB} - v_{aA} = 494.8 - 122.4 = 372.4 \text{ m/s}$

*   **Third Burn ($\Delta V_3$) at $r_2$ (circularize):**
    *   $v_{pB} = \sqrt{\mu \left( \frac{2}{r_2} - \frac{1}{a_B} \right)} = \sqrt{3.986004418 \times 10^{14} \left( \frac{2}{1.3556 \times 10^8} - \frac{1}{3.6778 \times 10^8} \right)}$
        $= \sqrt{3.986004418 \times 10^{14} (1.4753 \times 10^{-8} - 2.7190 \times 10^{-9})} = \sqrt{4.798 \times 10^6} = 2190.4 \text{ m/s}$
    *   $\Delta V_{3,BE} = v_2 - v_{pB} = 1714.7 - 2190.4 = -475.7 \text{ m/s}$

*   **Total $\Delta V_{Bi-elliptic}$:**
    $$\Delta V_{Bi-elliptic} = 3116.6 + 372.4 + 475.7 = \mathbf{3964.7 \text{ m/s}}$$

---

**Comparison:**
*   $\Delta V_{Hohmann} = \mathbf{4102.9 \text{ m/s}}$
*   $\Delta V_{Bi-elliptic} = \mathbf{3964.7 \text{ m/s}}$

**Reflection:** In this case, the bi-elliptic transfer is more efficient. The ratio $r_2/r_1 = 135560 / 6778 \approx 20.0$. This ratio is greater than $15.58$, which is the general threshold where bi-elliptic transfers become more efficient for any $r_b > r_2$. The savings are about $138.2 \text{ m/s}$, which is significant for a space mission. This example highlights the condition for bi-elliptic advantage.

### Example 3: Bi-elliptic transfer with a different $r_b$ for $r_2/r_1 \approx 20$

**Problem Statement:** Using the same initial and final orbits as Example 2 ($r_1 = 6778 \text{ km}$, $r_2 = 135,560 \text{ km}$), calculate the $\Delta V$ for a bi-elliptic transfer if the intermediate apogee radius is $r_b = 200,000 \text{ km}$ instead of $600,000 \text{ km}$. Compare this to the Hohmann $\Delta V$ from Example 2.

**Given:**
*   $r_1 = 6.778 \times 10^6 \text{ m}$
*   $r_2 = 1.3556 \times 10^8 \text{ m}$
*   $r_b = 200,000 \text{ km} = 2.0 \times 10^8 \text{ m}$
*   $\mu = 3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2$

**What we want:**
*   Total $\Delta V_{Bi-elliptic}$ with new $r_b$
*   Comparison to $\Delta V_{Hohmann} = 4102.9 \text{ m/s}$ (from Example 2)

---

**Step 1: Initial and Final Circular Velocities.**
*   $v_1 = 7669.0 \text{ m/s}$ (Same as Example 2)
*   $v_2 = 1714.7 \text{ m/s}$ (Same as Example 2)

**Step 2: Calculate Bi-elliptic Transfer $\Delta V$ with $r_b = 2.0 \times 10^8 \text{ m}$.**

*   **First Burn ($\Delta V_1$) to Ellipse A ($r_1 \to r_b$):**
    *   $a_A = \frac{r_1 + r_b}{2} = \frac{6.778 \times 10^6 + 2.0 \times 10^8}{2} = 1.03389 \times 10^8 \text{ m}$
    *   $v_{pA} = \sqrt{\mu \left( \frac{2}{r_1} - \frac{1}{a_A} \right)} = \sqrt{3.986004418 \times 10^{14} \left( \frac{2}{6.778 \times 10^6} - \frac{1}{1.03389 \times 10^8} \right)}$
        $= \sqrt{3.986004418 \times 10^{14} (2.95099 \times 10^{-7} - 9.6722 \times 10^{-9})} = \sqrt{1.1378 \times 10^8} = 10666.0 \text{ m/s}$
    *   $\Delta V_{1,BE} = v_{pA} - v_1 = 10666.0 - 7669.0 = 2997.0 \text{ m/s}$

*   **Second Burn ($\Delta V_2$) at $r_b$ (from Ellipse A to Ellipse B ($r_b \to r_2$)):**
    *   $v_{aA} = \sqrt{\mu \left( \frac{2}{r_b} - \frac{1}{a_A} \right)} = \sqrt{3.986004418 \times 10^{14} \left( \frac{2}{2.0 \times 10^8} - \frac{1}{1.03389 \times 10^8} \right)}$
        $= \sqrt{3.986004418 \times 10^{14} (1.0 \times 10^{-8} - 9.6722 \times 10^{-9})} = \sqrt{1.306 \times 10^5} = 361.4 \text{ m/s}$
    *   $a_B = \frac{r_b + r_2}{2} = \frac{2.0 \times 10^8 + 1.3556 \times 10^8}{2} = 1.6778 \times 10^8 \text{ m}$
    *   $v_{aB} = \sqrt{\mu \left( \frac{2}{r_b} - \frac{1}{a_B} \right)} = \sqrt{3.986004418 \times 10^{14} \left( \frac{2}{2.0 \times 10^8} - \frac{1}{1.6778 \times 10^8} \right)}$
        $= \sqrt{3.986004418 \times 10^{14} (1.0 \times 10^{-8} - 5.9602 \times 10^{-9})} = \sqrt{1.609 \times 10^6} = 1268.4 \text{ m/s}$
    *   $\Delta V_{2,BE} = v_{aB} - v_{aA} = 1268.4 - 361.4 = 907.0 \text{ m/s}$

*   **Third Burn ($\Delta V_3$) at $r_2$ (circularize):**
    *   $v_{pB} = \sqrt{\mu \left( \frac{2}{r_2} - \frac{1}{a_B} \right)} = \sqrt{3.986004418 \times 10^{14} \left( \frac{2}{1.3556 \times 10^8} - \frac{1}{1.6778 \times 10^8} \right)}$
        $= \sqrt{3.986004418 \times 10^{14} (1.4753 \times 10^{-8} - 5.9602 \times 10^{-9})} = \sqrt{3.498 \times 10^6} = 1870.2 \text{ m/s}$
    *   $\Delta V_{3,BE} = v_2 - v_{pB} = 1714.7 - 1870.2 = -155.5 \text{ m/s}$

*   **Total $\Delta V_{Bi-elliptic}$:**
    $$\Delta V_{Bi-elliptic} = 2997.0 + 907.0 + 155.5 = \mathbf{4059.5 \text{ m/s}}$$

---

**Comparison:**
*   $\Delta V_{Hohmann} = \mathbf{4102.9 \text{ m/s}}$ (from Example 2)
*   $\Delta V_{Bi-elliptic} \text{ (with } r_b = 200,000 \text{ km)} = \mathbf{4059.5 \text{ m/s}}$
*   $\Delta V_{Bi-elliptic} \text{ (with } r_b = 600,000 \text{ km)} = \mathbf{3964.7 \text{ m/s}}$ (from Example 2)

**Reflection:** Even with a smaller $r_b$ ($200,000 \text{ km}$ vs $600,000 \text{ km}$), the bi-elliptic transfer is still more efficient than Hohmann for this $r_2/r_1 \approx 20$ ratio. However, the savings are less ($43.4 \text{ m/s}$ vs $138.2 \text{ m/s}$). This demonstrates that while a large $r_2/r_1$ ratio makes bi-elliptic competitive, the *choice* of $r_b$ significantly impacts the $\Delta V$ savings. A larger $r_b$ generally leads to greater savings (up to a point), but also to a much longer transfer time.

### Example 4: Transfer from LEO to a very high Earth orbit ($r_2/r_1 \approx 100$)

**Problem Statement:** A spacecraft is in a circular LEO at $r_1 = 6778 \text{ km}$. It needs to be moved to a circular orbit at $r_2 = 677,800 \text{ km}$. Compare the $\Delta V$ required for a Hohmann transfer versus a bi-elliptic transfer using an intermediate apogee radius $r_b = 1,000,000 \text{ km}$.

**Given:**
*   $r_1 = 6778 \text{ km} = 6.778 \times 10^6 \text{ m}$
*   $r_2 = 677,800 \text{ km} = 6.778 \times 10^8 \text{ m}$
*   $r_b = 1,000,000 \text{ km} = 1.0 \times 10^9 \text{ m}$
*   $\mu = 3.986004418 \times 10^{14} \text{ m}^3/\text{s}^2$

**What we want:**
*   Total $\Delta V_{Hohmann