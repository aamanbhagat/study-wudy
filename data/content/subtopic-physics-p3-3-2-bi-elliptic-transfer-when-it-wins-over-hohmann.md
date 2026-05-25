## What it is
A bi-elliptic transfer is a three-impulse orbital maneuver used to move a spacecraft between two coplanar orbits. It involves an initial burn to enter a large elliptical transfer orbit, a second burn at that orbit's apoapsis to raise the periapsis, and a final burn at the new periapsis to circularize into the target orbit. This contrasts with the Hohmann transfer, which uses only two burns.

## Why it matters
This maneuver is crucial for missions where minimizing propellant mass is more important than minimizing transfer time, such as interplanetary travel or placing satellites in very high orbits. Understanding its efficiency reveals a core principle in astrodynamics: the Oberth effect, which states that a rocket engine burn yields more change in kinetic energy when performed at high speed. The bi-elliptic transfer cleverly leverages this effect, even though it seems counter-intuitive.

## When to study it
You must have a solid grasp of the following before proceeding. If not, review them first.
1.  **Newtonian Gravity:** The inverse-square law, $F = G M m / r^2$.
2.  **Orbital Energy and the Vis-viva Equation:** The derivation and application of $v^2 = \mu (\frac{2}{r} - \frac{1}{a})$.
3.  **Elliptical Orbits:** Definitions of apoapsis, periapsis, and semi-major axis ($a$).
4.  **Hohmann Transfer:** The derivation of its total velocity change, $\Delta v_{\text{Hohmann}}$.

## How to study it (step by step)
1.  **Review the Vis-viva equation.** Write it down and label each term: $v$ (speed), $\mu$ (standard gravitational parameter, $GM$), $r$ (current orbital radius), and $a$ (semi-major axis). This is the fundamental tool for this entire topic.
2.  **Derive the total $\Delta v$ for a bi-elliptic transfer.** Break it into three distinct burns. For each burn, use the Vis-viva equation to find the velocity *before* and *after* the impulse. The difference is the $\Delta v$ for that burn.
    *   $\Delta v_1$: At radius $r_1$, from the initial circular orbit to the first transfer ellipse.
    *   $\Delta v_2$: At radius $r_b$, from the first transfer ellipse to the second transfer ellipse.
    *   $\Delta v_3$: At radius $r_2$, from the second transfer ellipse to the final circular orbit.
3.  **Set up the comparison.** Write the inequality $\Delta v_{\text{bi-elliptic}} < \Delta v_{\text{Hohmann}}$. Substitute the full expressions for both sides.
4.  **Analyze the inequality.** Instead of solving it algebraically, which is messy, analyze it conceptually. Notice how the intermediate apoapsis radius, $r_b$, influences the terms. Ask yourself: what happens as $r_b \to \infty$?
5.  **Solve a numerical problem.** Choose a large radius ratio, like $r_2/r_1 = 20$. Pick an intermediate radius, say $r_b = 2 r_2$. Calculate and compare the $\Delta v$ for both transfer types to see the savings in action.

## Key ideas, with intuition
1.  **The Grand Detour.** The core idea is to go very far away from the central body to slow down "for cheap". The burn at the distant apoapsis ($r_b$) requires very little $\Delta v$ because the spacecraft is moving so slowly there. This small burn dramatically lowers the periapsis of the orbit, making the final circularization burn much less costly than it would be with a direct Hohmann transfer.

2.  **Leveraging the Oberth Effect.** The Oberth effect states that burns are most efficient at high speeds. The bi-elliptic transfer saves fuel by minimizing the magnitude of the *least efficient* burn. The Hohmann's second burn occurs at its apoapsis ($r_2$), where the spacecraft is relatively slow. The bi-elliptic's final burn also occurs at $r_2$, but the spacecraft arrives at a much lower velocity, requiring a smaller burn to circularize. The cost is paid in time and a tiny burn at the very distant point $r_b$.

3.  **The Crossover Point.** The bi-elliptic transfer is not always better. It only provides a $\Delta v$ advantage when the ratio of the final to initial orbital radius ($R = r_2/r_1$) is large. The crossover point where it starts becoming more efficient than the Hohmann transfer is for $R \approx 11.94$. For missions within this range (e.g., LEO to GEO, where $R \approx 6.5$), the Hohmann transfer is superior in both time and fuel.

4.  **The Asymptotic Limit.** As the intermediate apoapsis $r_b \to \infty$, the efficiency of the bi-elliptic transfer increases. The two transfer ellipses become nearly parabolic. This represents the theoretical maximum savings, though it would require an infinite transfer time.

## Worked example
A spacecraft needs to move from an initial circular orbit of radius $r_1 = 7,000$ km to a final circular orbit of $r_2 = 140,000$ km around Earth ($\mu = 398,600 \text{ km}^3/\text{s}^2$). Compare the $\Delta v$ required for a Hohmann transfer versus a bi-elliptic transfer using an intermediate apoapsis of $r_b = 280,000$ km.

**1. Hohmann Transfer Calculation**
*   Semi-major axis of Hohmann ellipse: $a_H = \frac{r_1 + r_2}{2} = \frac{7000 + 140000}{2} = 73,500$ km.
*   Velocity in initial orbit: $v_{c1} = \sqrt{\frac{\mu}{r_1}} = \sqrt{\frac{398600}{7000}} \approx 7.546$ km/s.
*   Velocity at periapsis of transfer orbit: $v_{H1} = \sqrt{\mu(\frac{2}{r_1} - \frac{1}{a_H})} = \sqrt{398600(\frac{2}{7000} - \frac{1}{73500})} \approx 10.403$ km/s.
*   Velocity at apoapsis of transfer orbit: $v_{H2} = \sqrt{\mu(\frac{2}{r_2} - \frac{1}{a_H})} = \sqrt{398600(\frac{2}{140000} - \frac{1}{73500})} \approx 0.520$ km/s.
*   Velocity in final orbit: $v_{c2} = \sqrt{\frac{\mu}{r_2}} = \sqrt{\frac{398600}{140000}} \approx 1.688$ km/s.
*   Total $\Delta v_H$:
    $$ \Delta v_H = |v_{H1} - v_{c1}| + |v_{c2} - v_{H2}| = |10.403 - 7.546| + |1.688 - 0.520| $$
    $$ \Delta v_H = 2.857 + 1.168 = 4.025 \text{ km/s} $$

**2. Bi-elliptic Transfer Calculation**
*   Semi-major axis of first transfer ellipse: $a_1 = \frac{r_1 + r_b}{2} = \frac{7000 + 280000}{2} = 143,500$ km.
*   Semi-major axis of second transfer ellipse: $a_2 = \frac{r_2 + r_b}{2} = \frac{140000 + 280000}{2} = 210,000$ km.
*   **Burn 1 (at $r_1$):**
    *   $v_{p1} = \sqrt{\mu(\frac{2}{r_1} - \frac{1}{a_1})} = \sqrt{398600(\frac{2}{7000} - \frac{1}{143500})} \approx 10.539$ km/s.
    *   $\Delta v_1 = |v_{p1} - v_{c1}| = |10.539 - 7.546| = 2.993$ km/s.
*   **Burn 2 (at $r_b$):**
    *   $v_{a1} = \sqrt{\mu(\frac{2}{r_b} - \frac{1}{a_1})} = \sqrt{398600(\frac{2}{280000} - \frac{1}{143500})} \approx 0.262$ km/s.
    *   $v_{a2} = \sqrt{\mu(\frac{2}{r_b} - \frac{1}{a_2})} = \sqrt{398600(\frac{2}{280000} - \frac{1}{210000})} \approx 0.974$ km/s.
    *   $\Delta v_2 = |v_{a2} - v_{a1}| = |0.974 - 0.262| = 0.712$ km/s.
*   **Burn 3 (at $r_2$):**
    *   $v_{p2} = \sqrt{\mu(\frac{2}{r_2} - \frac{1}{a_2})} = \sqrt{398600(\frac{2}{140000} - \frac{1}{210000})} \approx 1.948$ km/s.
    *   $\Delta v_3 = |v_{c2} - v_{p2}| = |1.688 - 1.948| = 0.260$ km/s.
*   Total $\Delta v_{BE}$:
    $$ \Delta v_{BE} = \Delta v_1 + \Delta v_2 + \Delta v_3 = 2.993 + 0.712 + 0.260 = 3.965 \text{ km/s} $$

**Reflection:**
The radius ratio is $R = 140000/7000 = 20$, which is greater than $11.94$. As predicted, the bi-elliptic transfer is more efficient, saving $4.025 - 3.965 = 0.06$ km/s. Each step was a direct application of the Vis-viva equation to find the speed at a specific point in a specific ellipse, followed by calculating the difference required to change to the next orbital path.

## Diagrams
A bi-elliptic transfer from an inner circular orbit (radius $r_1$) to an outer circular orbit (radius $r_2$).

```text
                  * dV2 (at r_b)
                 / \
                /   \
               /     \
              /       \
             /         \
            /           \
           /             \
          /               \
         |                 |  <-- Second Transfer Ellipse (a2)
         |                 |
 dV3 <---O.................|...........  Final Orbit (r2)
         |        .        |
         |       / \       |
         |      /   \      |
         |     /     \     |
         |    |   .   |    |
         O<---|---+---|--->O dV1  <-- Initial Orbit (r1)
         |    |   C   |    |
         |     \     /     |
         |      \   /      |
         |       \ /       |
         |        '        |
         |                 |
          \               /
           \             /  <-- First Transfer Ellipse (a1)
            \           /
             \         /
              \       /
               \     /
                \   /
                 \ /
                  '

C = Central Body
dV1 = First burn (prograde)
dV2 = Second burn (prograde)
dV3 = Third burn (retrograde)
```

## Memory technique — remember this forever
1.  **Visual Hook:** Picture throwing a ball to a friend who is far away. Instead of a simple arc (Hohmann), you throw the ball almost straight up into the sky so it barely moves at its peak (the high apoapsis, $r_b$). A tiny nudge from a gust of wind at the top (burn $\Delta v_2$) is all it takes to make it fall down towards your friend. The final "catch" (burn $\Delta v_3$) is easier because the ball is arriving more slowly from above. This is "The Grand Detour" — it takes much longer, but the total effort is less.

2.  **Must-Memorize Formulas:** Do not memorize the final $\Delta v$ formulas. They are too complex and brittle. Instead, overlearn the tool and the process.
    *   **The Tool:** The Vis-viva Equation.
        $$ v^2 = \mu \left( \frac{2}{r} - \frac{1}{a} \right) $$
    *   **The Process:** For any transfer between orbits 1 and 2 at a point $r$:
        $$ \Delta v = |v_{\text{orbit 2}}(r) - v_{\text{orbit 1}}(r)| $$

3.  **Spaced Repetition Schedule:** Rederive the full $\Delta v$ comparison from the Vis-viva equation at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Do not just read your notes; do it on a blank sheet of paper.

4.  **First Principles Pathway:** If you forget everything, rebuild from here:
    *   Total Energy of an orbit: $E = \frac{1}{2}mv^2 - \frac{G M m}{r}$.
    *   For an ellipse, total energy is constant: $E = -\frac{G M m}{2a}$.
    *   Set these two expressions for $E$ equal to each other and solve for $v^2$. This gives you the Vis-viva equation.
    *   With the Vis-viva equation, you can calculate the speed at any point in any known orbit, which is all you need to calculate the three burns.

## Common mistakes
1.  **Sign Errors in $\Delta v_3$.** The final burn is a *deceleration* (retrograde burn) to slow from the transfer ellipse's periapsis speed down to the final circular orbit speed. Students often forget that $\Delta v$ is a magnitude and must be positive, using $|v_{\text{final}} - v_{\text{initial}}|$. The cost is always positive, regardless of direction.
2.  **Using the Wrong Semi-major Axis ($a$).** There are four orbits involved: initial circular, final circular, and two different transfer ellipses. When using Vis-viva, you must use the correct semi-major axis for the specific ellipse you are calculating the velocity for. $a_1 = (r_1+r_b)/2$ and $a_2 = (r_2+r_b)/2$.
3.  **Assuming it's always better for $r_2 > r_1$.** The bi-elliptic transfer is only more fuel-efficient than Hohmann for radius ratios $r_2/r_1 > 11.94$. For smaller ratios, Hohmann wins on both fuel and time.
4.  **Applying it to non-coplanar orbits.** This entire analysis assumes the initial and final orbits are in the same plane. An plane change maneuver would add significant complexity and $\Delta v$ cost.

## Self-check
1.  In the worked example, the first burn ($\Delta v_1$) for the bi-elliptic transfer was *larger* than the first burn for the Hohmann transfer. Explain, in one sentence, why this is necessary for the maneuver to ultimately save fuel.
2.  A probe is in a 300 km altitude circular orbit around Mars and needs to move to a 45,000 km altitude circular orbit. A bi-elliptic transfer is planned with an intermediate apoapsis at 90,000 km. Calculate the total $\Delta v$ for this maneuver. (Mars radius: 3390 km, Mars $\mu$: 42,828 km³/s²).
3.  Derive the expression for the ratio of $\Delta v_{\text{bi-elliptic}} / \Delta v_{\text{Hohmann}}$ as the intermediate apoapsis $r_b \to \infty$. Using this result, determine the crossover point $R = r_2/r_1$ where a bi-parabolic transfer (the limiting case of a bi-elliptic) becomes more efficient than a Hohmann transfer.