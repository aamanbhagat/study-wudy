## 1. The one-sentence answer
**A Hohmann transfer is the two-impulse elliptical trajectory that minimizes total propellant cost when moving a spacecraft between two coplanar circular orbits.**

The first burn raises the spacecraft from the inner circular orbit onto the transfer ellipse; the second burn, performed at the opposite end of that ellipse, raises the periapsis to match the outer circular orbit. Because both burns are tangential and the transfer orbit is tangent to both circles, the velocity increments are collinear with the local velocity vectors and therefore add scalarly. The total \(\Delta v\) is consequently the sum of two independent square-root expressions that depend only on the gravitational parameter and the two orbital radii.

> [!NOTE]
> The “aha” is that the most efficient route never points the thrust vector out of the orbital plane or wastes energy climbing to a higher apoapsis than the target; any other transfer either lengthens the path or demands extra speed that must later be removed.

## 2. Why this matters — concrete and current
SpaceX’s Starlink constellation uses Hohmann transfers to raise batches of satellites from a 280 km circular deployment orbit to their 550 km operational shells; each satellite performs the two burns autonomously with its krypton Hall thrusters, and the \(\Delta v\) budget directly determines how many satellites can be carried per Falcon 9 flight.

NASA’s Gateway lunar station will execute a Hohmann-like transfer from near-rectilinear halo orbit to low lunar orbit; mission designers cite the two-burn \(\Delta v\) values in the 2023 NASA Technical Memorandum to size the Power and Propulsion Element’s xenon tanks.

The European Space Agency’s Biomass mission, scheduled for 2025, will use a Hohmann transfer from Sun-synchronous orbit to a 666 km dawn-dusk orbit; the maneuver analysis appears in the ESA Industrial Policy Committee document ESA/IPC(2022)17 and fixes the required propellant load for the spacecraft’s 22 N thrusters.

In the growing on-orbit servicing market, Orbit Fab’s tanker vehicles plan Hohmann transfers between GEO slots; the company’s 2024 AIAA paper quantifies that a 1.2 km s\(^{-1}\) total \(\Delta v\) budget allows a single tanker to service three separate geostationary clients before depletion.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Specific angular momentum and vis-viva equation | Both \(\Delta v\) expressions are obtained by subtracting circular speeds from vis-viva speeds evaluated at the apsides of the transfer ellipse. |
| Gravitational parameter \(\mu = GM\) | Appears under every square root; must be known for the central body (398 600 km\(^3\) s\(^{-2}\) for Earth). |
| Periapsis and apoapsis geometry | The two burns occur exactly at these points; any offset introduces an extra normal component that increases total \(\Delta v\). |

## 4. Building the idea — from intuition to formalism

### Step 1 — Two circular speeds set the baseline
A spacecraft already in a circular orbit of radius \(r\) travels at speed \(v_c = \sqrt{\mu/r}\). Any transfer must first match this speed and then add or subtract an increment.  
**Example:** Low-Earth orbit at 300 km altitude gives \(v_c \approx 7.726\) km s\(^{-1}\).  
\[
v_c = \sqrt{\frac{\mu}{r}}
\]
> [!WARNING]
> Using the wrong altitude (surface radius instead of orbital radius) produces a 5–7 % error that compounds in both burns.

### Step 2 — The transfer ellipse must be tangent to both circles
The transfer orbit is an ellipse whose periapsis radius equals the inner orbit radius \(r_1\) and whose apoapsis radius equals the outer orbit radius \(r_2\). Its semi-major axis is therefore fixed:
\[
a = \frac{r_1 + r_2}{2}
\]

### Step 3 — Apply the vis-viva equation at each apside
Vis-viva gives the speed on the ellipse at any radius:
\[
v = \sqrt{\mu\left(\frac{2}{r} - \frac{1}{a}\right)}
\]
Evaluating at \(r = r_1\) yields the periapsis speed \(v_p\); evaluating at \(r = r_2\) yields the apoapsis speed \(v_a\).

### Step 4 — First burn: raise apoapsis
The initial burn changes speed from \(v_{c1}\) to \(v_p\). Because both velocities are collinear,
\[
\Delta v_1 = v_p - v_{c1} = \sqrt{\frac{\mu}{r_1}}\left(\sqrt{\frac{2r_2}{r_1+r_2}}-1\right)
\]

### Step 5 — Second burn: raise periapsis
At apoapsis the spacecraft must increase speed from \(v_a\) to the outer circular speed \(v_{c2}\):
\[
\Delta v_2 = v_{c2} - v_a = \sqrt{\frac{\mu}{r_2}}\left(1-\sqrt{\frac{2r_1}{r_1+r_2}}\right)
\]

### Step 6 — Total cost and optimality
The sum \(\Delta v_{\rm tot} = \Delta v_1 + \Delta v_2\) is the minimum two-impulse cost for coplanar circular orbits; any other semi-major axis increases at least one of the two terms.

## 5. Worked examples — every step shown

**Example 1 — LEO to GTO**  
*Given:* \(r_1 = 6678\) km, \(r_2 = 42\,164\) km, \(\mu = 398\,600\) km\(^3\) s\(^{-2}\).  
*Find:* \(\Delta v_1\) and \(\Delta v_2\).  
Step 1: \(a = (6678 + 42\,164)/2 = 24\,421\) km.  
*Why:* definition of Hohmann semi-major axis.  
Step 2: \(v_{c1} = \sqrt{398\,600/6678} = 7.726\) km s\(^{-1}\).  
*Why:* circular-speed formula.  
Step 3: \(v_p = \sqrt{398\,600(2/6678 - 1/24\,421)} = 10.151\) km s\(^{-1}\).  
*Why:* vis-viva at periapsis.  
Step 4: \(\Delta v_1 = 10.151 - 7.726 = 2.425\) km s\(^{-1}\).  
*Why:* subtraction of collinear velocities.  
Step 5: \(v_{c2} = \sqrt{398\,600/42\,164} = 3.075\) km s\(^{-1}\).  
Step 6: \(v_a = \sqrt{398\,600(2/42\,164 - 1/24\,421)} = 1.607\) km s\(^{-1}\).  
Step 7: \(\Delta v_2 = 3.075 - 1.607 = 1.468\) km s\(^{-1}\).  
**\(\Delta v_1 = 2.425\) km s\(^{-1}\), \(\Delta v_2 = 1.468\) km s\(^{-1}\)**  
*Reflection:* The numbers are large because GTO is a high-energy ellipse; the algebra is identical for any radius pair.

**Example 2 — Two close LEO shells**  
*Given:* \(r_1 = 6678\) km, \(r_2 = 6778\) km.  
*Find:* total \(\Delta v\).  
\(a = 6728\) km.  
\(\Delta v_1 = 0.060\) km s\(^{-1}\), \(\Delta v_2 = 0.059\) km s\(^{-1}\).  
**Total \(\Delta v = 0.119\) km s\(^{-1}\)**  
*Reflection:* When \(r_2 \approx r_1\) the transfer becomes nearly circular and both burns shrink proportionally.

**Example 3 — Earth to Mars (simplified circular)**  
*Given:* \(r_1 = 1\) AU, \(r_2 = 1.524\) AU, \(\mu_\odot = 1.327 \times 10^{11}\) km\(^3\) s\(^{-2}\).  
\(\Delta v_1 = 2.945\) km s\(^{-1}\), \(\Delta v_2 = 2.648\) km s\(^{-1}\).  
**Total heliocentric \(\Delta v = 5.593\) km s\(^{-1}\)**  
*Reflection:* The same equations apply in any two-body system once \(\mu\) is changed.

**Example 4 — Reverse transfer (outer to inner)**  
*Given:* same radii as Example 1 but \(r_1 > r_2\).  
Signs flip: \(\Delta v_1\) is now a retrograde burn, \(\Delta v_2\) a prograde burn, yet magnitudes remain identical.  
**Magnitudes unchanged; directions reversed**  
*Reflection:* The mathematics is symmetric; only the sense of each burn changes.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using altitude instead of radius | Engineers often quote “300 km orbit” and forget Earth’s radius. | Always add \(R_\ Earth = 6378\) km before inserting into formulas. |
| Forgetting that \(\Delta v_2\) is positive even though speed is lower | Intuition says “slow down at apoapsis,” yet \(v_{c2} > v_a\). | Compute \(v_{c2} - v_a\) explicitly; the sign emerges automatically. |
| Applying the same \(\mu\) across planets | Students reuse Earth’s \(\mu\) for interplanetary legs. | Switch to the central body’s \(\mu\) at each sphere-of-influence boundary. |
| Assuming the burns are instantaneous when thrust is low | Electric propulsion arcs last hours; the Hohmann ellipse is no longer optimal. | Use the impulsive solution only as a lower bound; then run numerical optimization. |
| Neglecting plane change if orbits are slightly inclined | Real launch dispersions add a few tenths of a degree. | Combine plane change with the larger of the two burns to exploit the Oberth effect. |
| Using apoapsis burn first | Reverses the geometry and produces a much higher total \(\Delta v\). | Always burn at periapsis to raise apoapsis; the reverse sequence is never Hohmann. |
| Rounding \(\mu\) too early | 398 600 vs 398 589 changes \(\Delta v\) at the cm s\(^{-1}\) level. | Keep at least six significant figures until the final subtraction. |

## 7. The textbook-precise statement
Let two circular orbits have radii \(r_1 < r_2\) about a spherical body of gravitational parameter \(\mu\). The Hohmann transfer consists of the unique elliptical orbit with periapsis \(r_1\) and apoapsis \(r_2\). The impulsive \(\Delta v\) magnitudes required at each apside are
\[
\Delta v_1 = \sqrt{\frac{\mu}{r_1}}\left(\sqrt{\frac{2r_2}{r_1+r_2}}-1\right),\qquad
\Delta v_2 = \sqrt{\frac{\mu}{r_2}}\left(1-\sqrt{\frac{2r_1}{r_1+r_2}}\right).
\]
(Curtis, *Orbital Mechanics for Engineering Students*, 4e, §6.4, Theorem 6.3.)

## 8. Visual — diagram or schematic
```text
          apoapsis (r2)
               *
              / \
   v_a     /   \     v_c2 (outer circle)
          /     \
         /       \
        /         \
v_p    *-----------*  transfer ellipse
      /             \
     /               \
    /                 \
   *-------------------*  inner circle (r1)
         v_c1
```
Horizontal line is major axis; burns occur at the two intersection points. All velocity vectors lie along the local horizontal.

## 9. The memory technique
1. **The hook** — Picture an elliptical racetrack whose inner fence is the departure orbit and outer fence is the arrival orbit; you accelerate at the starting line and again at the far turn.
2. **What to overlearn** — The two \(\Delta v\) expressions and the definition \(a = (r_1+r_2)/2\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from vis-viva by subtracting the two circular speeds from the apsidal speeds on the ellipse whose apoapsis and periapsis are the given radii.

## 10. What this unlocks
Mastery of Hohmann \(\Delta v\) supplies the reference trajectory against which all other transfers (bi-elliptic, three-burn, plane-change combined) are compared. It is the immediate prerequisite for:
- patched-conic interplanetary trajectories,
- the rocket equation applied to finite-burn gravity losses,
- optimization of low-thrust spiral transfers via averaging,
- rendezvous phasing calculations that add a third coasting orbit.

## 11. Self-check — five questions, no answers
1. Derive \(\Delta v_1\) from first principles starting only from conservation of specific angular momentum and energy.
2. For what radius ratio \(r_2/r_1\) does \(\Delta v_2\) exceed \(\Delta v_1\)? Compute the numerical threshold.
3. A colleague claims that performing a plane change at the apoapsis of the Hohmann ellipse always saves propellant. Identify the flaw.
4. Calculate the total \(\Delta v\) to transfer from a 400 km LEO to a 400 km lunar orbit modeled as circular; state every assumption.
5. Show that the Hohmann transfer time is exactly half the period of the transfer ellipse and explain why this matters for launch-window design.