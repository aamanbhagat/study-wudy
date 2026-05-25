## What it is
A pork chop plot is a contour graph used in mission design that shows the required energy (often expressed as total velocity change, $\Delta v$) to travel between two celestial bodies. The plot's x-axis represents the launch date, the y-axis represents the arrival date, and the "pork chop" shaped contour lines connect all launch/arrival date pairs that require the same amount of $\Delta v$.

## Why it matters
This is not an academic exercise; it is the single most important chart for planning any interplanetary mission. Mission designers at NASA, SpaceX, and other agencies use these plots to identify launch windows—periods where a mission is feasible with the available fuel. Understanding these plots allows you to determine the optimal time to launch, the trade-off between flight duration and fuel cost, and the penalty for missing a launch date.

## When to study it
You must have a solid grasp of the following before tackling this. If not, pause and review them.
1.  **The Two-Body Problem:** The dynamics of an object moving under the gravity of a single, larger body.
2.  **Orbital Elements:** You should be able to describe an orbit using its six Keplerian elements ($a, e, i, \Omega, \omega, \nu$).
3.  **Hohmann Transfer:** You need to understand this baseline "minimum energy" transfer as a point of comparison.
4.  **Lambert's Problem:** This is the critical prerequisite. You must understand the problem statement: given two position vectors $\vec{r}_1$ and $\vec{r}_2$ and a time of flight $\Delta t$, find the orbit that connects them. Pork chop plots are essentially a graphical representation of thousands of solutions to Lambert's problem.

## How to study it (step by step)
1.  **Revisit Lambert's Problem:** Write down the inputs ($\vec{r}_1, \vec{r}_2, \Delta t$) and outputs ($\vec{v}_1, \vec{v}_2$ on the transfer orbit). Convince yourself that for a given solar system body and a date, its position vector is fixed. This is the link between dates and geometry.
2.  **Define the Grid:** Imagine a grid. The x-axis is Launch Date (e.g., Jan 1, 2030 to Dec 31, 2030). The y-axis is Arrival Date (e.g., Jan 1, 2031 to Dec 31, 2031). Each point $(x, y)$ on this grid represents one potential mission.
3.  **Calculate a Single Point:** Pick one point on the grid, say (Launch: March 15, 2030; Arrival: Nov 30, 2030).
    *   Look up the position and velocity of the departure planet (e.g., Earth) on the launch date: $\vec{r}_{p1}, \vec{v}_{p1}$.
    *   Look up the position and velocity of the arrival planet (e.g., Mars) on the arrival date: $\vec{r}_{p2}, \vec{v}_{p2}$.
    *   Calculate the time of flight: $\Delta t = t_{arrival} - t_{launch}$.
4.  **Solve for $\Delta v$:**
    *   Use the positions and time of flight $(\vec{r}_{p1}, \vec{r}_{p2}, \Delta t)$ as inputs to a Lambert solver. The solver gives you the required initial and final velocities *of the transfer orbit*, let's call them $\vec{v}_{t1}$ and $\vec{v}_{t2}$.
    *   The departure maneuver is the vector difference between the transfer orbit's velocity and the planet's velocity: $\Delta \vec{v}_1 = \vec{v}_{t1} - \vec{v}_{p1}$.
    *   The arrival maneuver is the vector difference between the planet's velocity and the transfer orbit's velocity: $\Delta \vec{v}_2 = \vec{v}_{p2} - \vec{v}_{t2}$.
    *   The total scalar cost is the sum of the magnitudes of these two maneuvers: $\Delta v_{total} = ||\Delta \vec{v}_1|| + ||\Delta \vec{v}_2||$.
5.  **Automate and Plot:** Conceptually, repeat steps 3 and 4 for every single point on your date grid. You now have a 2D array of $\Delta v_{total}$ values. Use a plotting tool to create a contour plot from this data. The regions of low $\Delta v$ will form the characteristic "pork chop" shapes.

## Key ideas, with intuition
1.  **It's a Map of Cost:** Think of the plot not as a trajectory, but as a cost map. You are a traveler planning a trip. The map shows you that leaving on certain dates and arriving on others is "cheaper" (in fuel) than other combinations. The contours are like elevation lines on a topographic map, with the valleys being the low-energy opportunities.
2.  **Lambert's Problem is the Engine:** The heart of the calculation is Lambert's problem. For every launch/arrival pair, the universe presents you with a unique Keplerian orbit that connects those two points in space and time. Your only job is to calculate the two "kicks" ($\Delta v$ burns) needed to jump from your departure planet onto that path, and then jump off it to join your arrival planet.
3.  **Timing is Everything:** The planets are moving. The reason low-$\Delta v$ opportunities are rare is that they require specific geometric alignments between the planets that don't happen often. The plot shows that if you launch a bit earlier or later, the geometry is less optimal, and the required $\Delta v$ to "force" the trajectory increases rapidly.
4.  **The Shape Reveals the Trade-off:** The contours are typically elongated along a diagonal line. This shows the trade-off between launch date and flight time. Moving along a contour line, you can often find a solution with a later launch date but a shorter flight time for the same $\Delta v$ budget. The center of the "pork chop" is the sweet spot—the mission with the absolute lowest energy requirement.

## Worked example
Let's calculate the $\Delta v$ for a single point on an Earth-Mars pork chop plot. We'll use simplified, co-planar circular orbits.

**Given:**
*   Earth's orbit: radius $r_E = 1$ AU, speed $v_E = 29.78$ km/s.
*   Mars' orbit: radius $r_M = 1.524$ AU, speed $v_M = 24.13$ km/s.
*   Sun's gravitational parameter: $\mu_S = 1.327 \times 10^{11}$ km³/s².

**Mission Point:**
*   Launch Date: $t_1 = 0$. At this time, Earth is at position $\vec{r}_1 = [1 \text{ AU}, 0, 0]$. Its velocity is $\vec{v}_{p1} = [0, 29.78 \text{ km/s}, 0]$.
*   Time of Flight: $\Delta t = 258$ days (approx. 8.5 months).
*   Arrival Date: $t_2 = t_1 + \Delta t$. We look up Mars' position at $t_2$ and find it to be $\vec{r}_2 = [-1.381 \text{ AU}, -0.665 \text{ AU}, 0]$. Its velocity is $\vec{v}_{p2} = [7.56 \text{ km/s}, -22.88 \text{ km/s}, 0]$.

**Step 1: Solve Lambert's Problem**
We feed $\vec{r}_1$, $\vec{r}_2$, and $\Delta t$ into a Lambert solver. (The internal workings of the solver are complex, so we treat it as a black box for this lesson).
The solver returns the required velocities for the transfer orbit:
*   Initial transfer velocity at Earth's orbit: $\vec{v}_{t1} = [-2.95 \text{ km/s}, 32.73 \text{ km/s}, 0]$.
*   Final transfer velocity at Mars' orbit: $\vec{v}_{t2} = [5.55 \text{ km/s}, -21.41 \text{ km/s}, 0]$.

**Step 2: Calculate Departure $\Delta v$**
This is the burn to leave Earth's orbit and enter the transfer orbit.
$$ \Delta \vec{v}_1 = \vec{v}_{t1} - \vec{v}_{p1} = [-2.95, 32.73, 0] - [0, 29.78, 0] = [-2.95, 2.95, 0] \text{ km/s} $$
$$ ||\Delta \vec{v}_1|| = \sqrt{(-2.95)^2 + (2.95)^2} = 4.17 \text{ km/s} $$

**Step 3: Calculate Arrival $\Delta v$**
This is the burn to leave the transfer orbit and match Mars' orbit.
$$ \Delta \vec{v}_2 = \vec{v}_{p2} - \vec{v}_{t2} = [7.56, -22.88, 0] - [5.55, -21.41, 0] = [2.01, -1.47, 0] \text{ km/s} $$
$$ ||\Delta \vec{v}_2|| = \sqrt{(2.01)^2 + (-1.47)^2} = 2.49 \text{ km/s} $$

**Step 4: Calculate Total $\Delta v$**
$$ \Delta v_{total} = ||\Delta \vec{v}_1|| + ||\Delta \vec{v}_2|| = 4.17 + 2.49 = 6.66 \text{ km/s} $$

**Reflection:** This value, 6.66 km/s, is the "height" of the contour map at the coordinate (Launch Date $t_1$, Arrival Date $t_2$). A computer would do this for thousands of coordinate pairs to generate the full plot. This specific trajectory is clearly not the optimal one, which for Earth-Mars is closer to 5.6 km/s.

## Diagrams
Here is a conceptual ASCII representation of a pork chop plot.

```text
      ^ Arrival Date
      |
      |
Nov-25| . . . . . . . . . . . . . . . . . . . . . . . . . . .
      | . . . . . . . . . . . . . . . . . . . . . . . . . . .
      | . . . . . . . . . . . . . . . . . . . . . . . . . . .
Oct-25| . . . . . . . . . . . . . . . . . . . . . . . . . . .
      | . . . . . . . . . . . . . . . . . . . . . . . . . . .
      | . . . . . . . . . . . . . . . . . . . . . . . . . . .
Sep-25| . . . . . . . . . . +-----------------+ . . . . . . .
      | . . . . . . . . . /   Contour (e.g.,  \  . . . . . .
      | . . . . . . . .  /    Δv = 7 km/s)    \ . . . . . .
Aug-25| . . . . . . . . |  +-----------------+ | . . . . . .
      | . . . . . . . . | /   Contour (e.g.,   \ . . . . . .
      | . . . . . . . . |/    Δv = 6 km/s)     | . . . . . .
Jul-25| . . . . . . . . |      * Optimal       | . . . . . .
      | . . . . . . . . |\       Point       /| . . . . . .
      | . . . . . . . . | \   (min Δv)      / | . . . . . .
Jun-25| . . . . . . . . |  +-----------------+ | . . . . . .
      | . . . . . . . .  \                     / . . . . . .
      | . . . . . . . . . \                   /  . . . . . .
May-25| . . . . . . . . . . +-----------------+  . . . . . .
      | . . . . . . . . . . . . . . . . . . . . . . . . . . .
      +-------------------------------------------------------->
        Jan-25    Feb-25    Mar-25    Apr-25    May-25 Launch Date
```

## Memory technique — remember this forever
1.  **Visual Hook:** "The Mission Planner's Butcher Shop." You need to plan a mission (buy meat). The plot is the butcher's display case. The x-axis is when you leave home (Launch Date), the y-axis is when you arrive at the store (Arrival Date). The contours are different cuts of meat, and the label on each is the price per pound ($\Delta v$). You want the leanest, cheapest cut you can find—the center of the "pork chop."
2.  **Must-Know Formulas:**
    $$ (\vec{v}_{t1}, \vec{v}_{t2}) = \text{Lambert}(\vec{r}_{p1}, \vec{r}_{p2}, t_{arrival} - t_{launch}) $$
    $$ \Delta v_{total} = ||\vec{v}_{t1} - \vec{v}_{p1}|| + ||\vec{v}_{p2} - \vec{v}_{t2}|| $$
3.  **Spaced Repetition Schedule:** Review these key ideas and the worked example at: 1 day, 3 days, 7 days, 16 days, 35 days. On each review, try to re-derive the process from a blank slate.
4.  **First Principles Pathway:** If you forget everything, rebuild it.
    *   Goal: Get from Planet 1 to Planet 2 cheaply.
    *   What defines a mission? When you leave and when you arrive.
    *   What is the cost? The fuel, which is measured by $\Delta v$.
    *   What are the maneuvers? Burn 1: Get off Planet 1's path and onto the transfer path. Burn 2: Get off the transfer path and onto Planet 2's path.
    *   How do you find the transfer path? Given two points ($\vec{r}_1, \vec{r}_2$) and a time ($\Delta t$), only one orbit connects them. This is Lambert's Problem.
    *   How do you find the best mission? Solve this for every possible combination of launch/arrival dates and plot the costs. The lowest cost is the winner.

## Common mistakes
1.  **Confusing Time of Flight with Arrival Date:** The y-axis is the absolute arrival date, not the trip duration. Lines of constant trip duration are diagonals running from bottom-left to top-right.
2.  **Ignoring Planetary Velocities:** A common error is to think the $\Delta v$ is just the magnitude of the transfer orbit's velocity. It is the magnitude of the *vector difference* between the planet's velocity and the transfer orbit's velocity.
3.  **Heliocentric vs. Planetocentric $\Delta v$:** These plots typically show the $\Delta v$ required for the *heliocentric* (sun-centered) portion of the journey. They do *not* include the extra $\Delta v$ needed to escape the departure planet's gravity from a low parking orbit, or to be captured into an orbit at the arrival planet. Those are separate calculations using the hyperbolic excess velocity ($v_{\infty}$), which is directly related to the $\Delta v$ values calculated here.

## Self-check
1.  On a standard pork chop plot, what does a horizontal line represent? What does a diagonal line with a slope of 1 (where arrival date = launch date + constant) represent?
2.  You are presented with a pork chop plot for a Jupiter mission. The lowest $\Delta v$ contour is labeled "15 km/s". Your launch vehicle can only provide enough energy for a total heliocentric $\Delta v$ of 17 km/s. Describe how you would use the plot to define your mission's launch window.
3.  Why are the optimal launch opportunities for Mars missions periodic, occurring roughly every 26 months? How would this periodicity manifest itself if you extended the x-axis (Launch Date) of a pork chop plot out for several years?