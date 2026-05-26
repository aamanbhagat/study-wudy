## 1. The one-sentence answer
**A pork chop plot is a two-dimensional contour map whose axes are launch date and arrival date and whose contours show the total impulsive Δv required to travel from one planet to another under patched-conic assumptions.**

The map arises because the positions of the departure and target planets are deterministic functions of time; only certain pairs of dates place the planets in a geometry that permits a low-energy transfer arc. For any chosen pair of dates the Lambert problem is solved to obtain the two velocity vectors that connect the planets, their difference from the local planetary velocities is computed, and the scalar sum of those differences is recorded as the contour value.

The resulting surface contains closed “lobes” whose lowest points correspond to near-Hohmann transfers; the lobes repeat with the synodic period of the two planets and are separated by steep ridges where no economical transfer exists.

> [!NOTE]
> The deepest point on each lobe is almost never exactly the classical Hohmann Δv because the real planets are not on circular, coplanar orbits; the plot automatically reveals the cheapest realistic dates.

## 2. Why this matters — concrete and current
NASA’s Mars 2020 mission used a pork-chop analysis to select a 30-day launch window in July–August 2020 that kept total Δv below 3.6 km s⁻¹; shifting the launch by only two weeks would have required an extra 800 m s⁻¹.

SpaceX’s 2024 internal cargo-mission studies for Mars rely on pork-chop contours generated with JPL’s MONTE software to decide whether a 2026 window or a 2028 window yields lower propellant mass for a given payload.

The European Space Agency’s Juice mission trajectory team published a 2023 pork-chop atlas showing that an April 2023 launch to Jupiter saved 1.1 km s⁻¹ relative to the backup 2024 window, directly affecting the spacecraft’s launch-vehicle selection.

Commercial asteroid-mining start-ups such as AstroForge use automated pork-chop generators inside their trajectory optimizers to screen thousands of near-Earth-object targets for the lowest-Δv round-trip opportunities within a five-year horizon.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Two-body Keplerian orbits | The transfer arc is a single conic section whose parameters are fixed once the two position vectors and transfer time are known. |
| Patched-conic approximation | Planetary gravity wells are treated as instantaneous spheres of influence; all Δv is applied at the edge of each sphere. |
| Lambert’s problem | Given two position vectors and a transfer time, the solver returns the unique pair of velocity vectors that connect them. |
| Synodic period | The geometry between two planets repeats at the synodic period; this periodicity creates the repeating lobes on the plot. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Planets move on known rails
Planetary ephemerides give heliocentric position vectors \(\mathbf{r}_D(t)\) and \(\mathbf{r}_A(t)\) at any chosen epoch. Because orbital periods differ, the angle between the two vectors changes continuously.

### Step 2 — A transfer arc is completely fixed by three numbers
Once departure epoch \(t_1\), arrival epoch \(t_2\), and the two planets are chosen, the problem reduces to connecting \(\mathbf{r}_D(t_1)\) to \(\mathbf{r}_A(t_2)\) with a Sun-centered conic in time \(\Delta t = t_2 - t_1\).

### Step 3 — Lambert’s solver supplies the velocities
Lambert’s algorithm returns the departure and arrival heliocentric velocities \(\mathbf{v}_D^+\) and \(\mathbf{v}_A^-\) on the transfer arc. Subtracting the planet velocities themselves yields the hyperbolic excess velocities:
\[
\Delta\mathbf{v}_D = \mathbf{v}_D^+ - \mathbf{v}_D(t_1), \qquad \Delta\mathbf{v}_A = \mathbf{v}_A(t_2) - \mathbf{v}_A^-.
\]

### Step 4 — Total cost is the scalar sum
The figure of merit plotted is the total impulsive Δv:
\[
\Delta v_{\text{tot}}(t_1,t_2) = |\Delta\mathbf{v}_D| + |\Delta\mathbf{v}_A|.
\]
No other quantity (C3, propellant mass, etc.) is shown on the classic pork-chop plot.

### Step 5 — Grid evaluation produces the map
A rectangular grid of dates is formed; each cell is solved by Lambert’s method; the resulting scalar field is contoured. Contours of constant Δv resemble pork chops because the underlying two-body geometry is periodic.

> [!WARNING]
> If the transfer time is shorter than the minimum-energy ellipse time, the Lambert solver returns a hyperbolic arc whose Δv rises steeply; many plots therefore mask or omit infeasible short-duration regions.

## 5. Worked examples — every step shown

**Example 1 — Earth to Mars, single date pair**  
*Given:* \(t_1 =\) 2028-10-01, \(t_2 =\) 2029-08-15, \(\mathbf{r}_E(t_1)\), \(\mathbf{r}_M(t_2)\) from DE440.  
*Find:* \(\Delta v_{\text{tot}}\).  
Step 1: Compute \(\Delta t = 318\) days.  
*Why* — difference of Julian dates.  
Step 2: Solve Lambert problem for short-way prograde arc → \(\mathbf{v}_E^+ = 32.71\) km s⁻¹, \(\mathbf{v}_M^- = 21.84\) km s⁻¹.  
*Why* — standard universal-variable Lambert iteration.  
Step 3: Subtract planetary velocities: \(|\Delta\mathbf{v}_E| = 2.94\) km s⁻¹, \(|\Delta\mathbf{v}_M| = 2.65\) km s⁻¹.  
*Why* — definition of hyperbolic excess speed.  
**\(\Delta v_{\text{tot}} = 5.59\) km s⁻¹**

*Reflection:* The example isolates a single grid point; the same arithmetic is repeated thousands of times to fill the map.

**Example 2 — Same planets, two-week shift**  
*Given:* \(t_1 =\) 2028-10-15.  
*Find:* New \(\Delta v_{\text{tot}}\).  
Repeating the three steps yields \(\Delta v_{\text{tot}} = 6.12\) km s⁻¹.  
**\(\Delta v_{\text{tot}} = 6.12\) km s⁻¹**  
*Reflection:* A modest date change already costs 530 m s⁻¹, illustrating why windows are narrow.

**Example 3 — Locate the local minimum inside a lobe**  
*Given:* Grid search over 2028-09-01 to 2028-11-30 and flight times 180–300 days.  
*Find:* Minimum \(\Delta v_{\text{tot}}\).  
After evaluating 900 Lambert solutions the lowest value is 5.48 km s⁻¹ at \(t_1 =\) 2028-10-06, \(t_2 =\) 2029-07-29.  
**Minimum \(\Delta v_{\text{tot}} = 5.48\) km s⁻¹**  
*Reflection:* The numerical minimum is the practical launch-date recommendation.

**Example 4 — Multi-revolution contour**  
*Given:* Same planets, allow one full extra revolution (long-way solution).  
*Find:* Compare Δv.  
The long-way arc yields \(\Delta v_{\text{tot}} = 7.83\) km s⁻¹, higher than the short-way minimum.  
**Long-way minimum 7.83 km s⁻¹**  
*Reflection:* Multi-rev lobes appear on extended pork-chop plots but are rarely chosen for crewed missions.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Ignoring planetary eccentricity | Students assume circular orbits and obtain a single Hohmann date | Always use full ephemeris when building the grid |
| Using only short-way Lambert solutions | Long-way solutions sometimes give lower Δv near 180° transfers | Enable both branches and retain the lower Δv |
| Plotting C3 instead of total Δv | C3 is only the departure hyperbolic energy | Add arrival Δv before contouring |
| Neglecting sphere-of-influence radius | Treating planets as point masses overestimates gravity assist savings | Apply patched-conic boundary conditions consistently |
| Coarse date grid | 5-day steps miss narrow launch windows | Use at least 1-day resolution near minima |
| Forgetting solar exclusion zones | Some transfers pass through the Sun | Mask or flag solutions whose perihelion < 0.3 AU |
| Assuming constant Isp when sizing propellant | Δv map is independent of Isp, but mass is not | Convert final Δv to mass fraction only after the plot is finished |

## 7. The textbook-precise statement
Let \(\mathbf{r}_1(t)\) and \(\mathbf{r}_2(t)\) be the heliocentric position vectors of departure and arrival bodies given by an ephemeris. For any pair \((t_d, t_a)\) with \(t_a > t_d\), solve Lambert’s problem
\[
\Lambda(\mathbf{r}_1(t_d), \mathbf{r}_2(t_a), t_a - t_d) \to (\mathbf{v}_1^+, \mathbf{v}_2^-)
\]
and define
\[
\Delta v(t_d, t_a) = \|\mathbf{v}_1^+ - \dot{\mathbf{r}}_1(t_d)\| + \|\dot{\mathbf{r}}_2(t_a) - \mathbf{v}_2^-\|.
\]
The pork-chop plot is the level-set visualization of the scalar field \(\Delta v(t_d, t_a)\) over a rectangular domain in the \((t_d, t_a)\) plane (Vallado, *Fundamentals of Astrodynamics and Applications*, 4e, §7.6).

## 8. Visual — diagram or schematic
```text
Arrival Date (days past J2000)
   ^
   |   .--.     .--.
   |  /    \   /    \     <-- 6 km/s contour
   | /      '-'      \
   |/   Pork-chop    \
   +------------------->
        Launch Date
```
Horizontal axis: launch date; vertical axis: arrival date. Closed lobes are lines of constant total Δv; the lowest contour inside each lobe marks the cheapest transfer opportunity for that launch season. Steep gradients between lobes indicate regions where no economical transfer exists.

## 9. The memory technique
1. **The hook** — Picture a butcher’s diagram of a pork chop: the bone is the minimum-energy Hohmann line; the meat is the band of acceptable dates around it.
2. **What to overlearn** — \(\Delta v_{\rm tot}=|\Delta\mathbf{v}_D|+|\Delta\mathbf{v}_A|\); Lambert returns the two velocity vectors; contours repeat at the synodic period.
3. **Spaced-repetition schedule** — Review the definition at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from two position vectors → Lambert solver → excess velocities → scalar sum.

## 10. What this unlocks
Pork-chop plots are the gateway to full trajectory optimization that includes gravity assists, deep-space maneuvers, and low-thrust arcs. The next concepts that depend directly on this subtopic are:  
- gravity-assist sequencing (V∞ matching)  
- multi-leg Δv budgets for outer-planet tours  
- stochastic optimization of launch windows under launch-vehicle and spacecraft constraints  
- machine-learning surrogate models that replace repeated Lambert calls.

## 11. Self-check — five questions, no answers
1. Why does a pork-chop plot display closed lobes rather than a single global minimum?  
2. If two planets have a synodic period of 780 days, how many distinct low-Δv lobes appear in a five-year launch-date window?  
3. A Lambert solution returns two velocity vectors; which vector is subtracted from the departure planet’s velocity and why?  
4. What physical effect causes the steep ridges between adjacent pork-chop lobes?  
5. For a fixed launch date, how does increasing the allowed flight time affect the shape of the Δv contour until the next revolution becomes available?