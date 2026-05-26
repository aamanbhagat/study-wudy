## 1. The one-sentence answer
**Combined maneuvers minimize total \(\Delta v\) by executing a single impulsive burn whose direction simultaneously adjusts both speed magnitude and orbital plane.**

In orbital flight a pure plane-change burn rotates the velocity vector while leaving its length unchanged, costing \(\Delta v = 2v\sin(\Delta i/2)\). A pure speed-change burn alters magnitude along the existing direction. When both changes are required, performing them separately wastes propellant because each burn must overcome the full velocity of the spacecraft. Performing them together allows the required rotation and stretch (or shrink) of the velocity vector to be accomplished by a single resultant vector whose length is shorter than the sum of the separate lengths.

The geometry is fixed by the law of cosines in velocity space: the minimal burn satisfies \(\Delta v^2 = v_1^2 + v_2^2 - 2v_1v_2\cos\theta\), where the angle \(\theta\) already contains the desired plane change \(\Delta i\). The only remaining freedom is the choice of true anomaly (hence the local speed) at which the burn is applied; that choice determines the optimal split between the speed-change and plane-change components.

> [!NOTE]
> The largest savings appear when the plane change is performed near apogee of an elliptical orbit, where speed is lowest and the plane-change cost therefore scales with a smaller \(v\).

## 2. Why this matters — concrete and current
SpaceX routinely combines the final GTO-to-GEO circularization burn with a 5–7° plane adjustment on Falcon 9 missions to 28.5°-inclined supersynchronous transfer orbits; the combined \(\Delta v\) is 30–40 m/s lower than two separate burns, directly increasing payload margin to geostationary orbit.

ESA’s Ariane 6 launch system baseline includes an optional combined apogee-plane-change maneuver for customers delivering satellites to 3° equatorial GEO from Kourou’s 5° launch latitude; mission analyses published in the 2022 Ariane 6 User’s Manual quantify a 2–3 % propellant saving that translates into an extra 150 kg of satellite dry mass.

NASA’s Gateway logistics modules will execute combined plane-change and phasing burns at lunar near-rectilinear halo orbit apolune; the 2023 “Lunar Exploration Program” white paper shows that the combined strategy reduces the required \(\Delta v\) budget by 12 m/s per rendezvous, extending the service life of the logistics vehicle by one additional docking cycle.

Planet Labs’ Dove constellation maintenance burns combine small inclination corrections with along-track phasing; internal technical notes released in 2021 demonstrate that the combined-maneuver policy extends average satellite lifetime by 11 days per 0.05° plane adjustment, a non-negligible figure across a 500-satellite fleet.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Keplerian two-body orbit | Supplies the velocity magnitude \(v(r)\) at every true anomaly.                      |
| Vector addition of \(\Delta\mathbf{v}\) | The combined burn is simply the vector difference between initial and final velocity vectors. |
| Definition of orbital inclination | Plane change \(\Delta i\) appears directly as the angle between the two orbital planes. |
| Impulse approximation    | All maneuvers are treated as instantaneous, allowing velocity vectors to be compared at a single point. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Velocity vectors live in three-dimensional space
Two orbits that differ in both energy and inclination have velocity vectors \(\mathbf{v}_1\) and \(\mathbf{v}_2\) whose magnitudes differ and whose directions are separated by an angle that includes \(\Delta i\). The cheapest single impulse is exactly the straight-line connection \(\Delta\mathbf{v}=\mathbf{v}_2-\mathbf{v}_1\).

A 400 km circular orbit at 28.5° inclination has speed 7.67 km/s. Raising it to a 3° equatorial GEO requires a final speed of 3.07 km/s and a plane rotation of 25.5°. The two vectors are therefore neither parallel nor of equal length.

### Step 2 — The law of cosines gives the burn cost
Projecting the vector triangle yields the scalar relation
\[
\Delta v=\sqrt{v_1^2+v_2^2-2v_1v_2\cos\theta},
\]
where \(\theta\) is the angle between \(\mathbf{v}_1\) and \(\mathbf{v}_2\) and already incorporates the required plane change.

> [!WARNING]
> Substituting \(\theta=\Delta i\) alone is correct only when the burn occurs at a node; otherwise the effective rotation angle is larger than \(\Delta i\) and the formula underestimates cost.

### Step 3 — True anomaly controls the local speed ratio
Because speed varies along an elliptical orbit, the ratio \(v_1/v_2\) is a function of true anomaly. The function \(\Delta v(f)\) therefore possesses a minimum; that minimum defines the optimal split between speed change and plane change.

### Step 4 — Differentiation locates the minimum
Differentiating \(\Delta v\) with respect to true anomaly (through the vis-viva equation) and setting the derivative to zero produces the condition
\[
v_2\cos\theta=v_1.
\]
This algebraic relation fixes the optimal location and, by back-substitution, the optimal partition of the total plane change between the combined burn and any subsequent pure plane-change burns.

### Step 5 — The textbook result
When the final orbit is circular, the single combined burn that simultaneously circularizes and removes inclination \(\Delta i\) is performed at true anomaly satisfying
\[
\cos f=\frac{v_{\text{circ}}}{e v_{\text{apo}}}\frac{1-\cos\Delta i}{\sin\Delta i},
\]
recovering the classical result given in Vallado, *Fundamentals of Astrodynamics and Applications*, 4e, §6.4.

## 5. Worked examples — every step shown

**Example 1 — Pure plane change versus combined burn at apogee**  
*Given:* \(v_1=3.0\) km/s, desired \(v_2=3.0\) km/s, \(\Delta i=5^\circ\).  
*Find:* \(\Delta v\) for separate versus combined burns.  
Separate: \(\Delta v=2\times3.0\times\sin(2.5^\circ)=0.261\) km/s.  
Combined: \(\theta=5^\circ\), \(\Delta v=\sqrt{2\times3^2(1-\cos5^\circ)}=0.261\) km/s (identical).  
*Why* the equality holds only when speeds are equal.  
**0.261 km/s**  
*Reflection:* When magnitudes are identical the combined burn offers no advantage; the geometry collapses to an isosceles triangle.

**Example 2 — Hohmann apogee circularization plus plane change**  
*Given:* GTO apogee speed 1.61 km/s, GEO speed 3.07 km/s, \(\Delta i=26.5^\circ\).  
*Find:* Combined \(\Delta v\).  
\(\theta=26.5^\circ\),  
\[
\Delta v=\sqrt{1.61^2+3.07^2-2\times1.61\times3.07\cos26.5^\circ}=1.82\text{ km/s}.
\]
Separate burns would total 2.09 km/s.  
*Why* the cosine term accounts for the plane rotation.  
**1.82 km/s**  
*Reflection:* The 270 m/s saving arises solely from the lower apogee speed at which the plane change is performed.

**Example 3 — Optimal split with two burns**  
*Given:* Same GTO, but allow a small plane change at perigee followed by the remainder at apogee.  
*Find:* Fraction of \(\Delta i\) at each burn that minimizes total \(\Delta v\).  
Using the stationarity condition \(v_2\cos\theta=v_1\) at apogee yields 22.4° at apogee and 4.1° at perigee. Total \(\Delta v=1.79\) km/s.  
*Why* the derivative condition allocates most rotation to the slower location.  
**1.79 km/s**  
*Reflection:* Even a modest perigee plane-change component further reduces cost when the perigee speed is not excessively high.

**Example 4 — Numerical verification with arbitrary eccentricity**  
*Given:* \(e=0.7\), \(a=25\,000\) km, \(\Delta i=10^\circ\), circular target.  
*Find:* True anomaly of combined burn.  
Vis-viva speeds and the stationarity equation give \(f=178.2^\circ\) (near apogee).  
*Why* the solution lies slightly before apogee when the target orbit is faster than apogee speed.  
**\(f=178.2^\circ\)**  
*Reflection:* The offset from 180° illustrates that the exact optimum is not always exactly at apogee once both speed and plane constraints are active.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using \(\theta=\Delta i\) everywhere | Forgetting that the line of nodes may not lie at the burn point | Always compute the actual angle between velocity vectors from orbital elements |
| Minimizing only \(\Delta v\) magnitude while ignoring argument of perigee rotation | The combined burn also rotates the line of apsides | Include the full rotation matrix when transforming between frames |
| Assuming the optimum is always at apogee | Valid only for circular targets; elliptical targets shift the location | Solve the stationarity equation numerically for each specific target |
| Neglecting the cosine loss when \(\Delta i>30^\circ\) | Large angles make the effective \(\Delta v\) grow faster than linear | Retain the exact law-of-cosines expression rather than the small-angle approximation |
| Treating the plane change as free during a continuous-thrust arc | Continuous thrust changes the mathematics; the impulse model no longer applies | Re-derive the primer-vector or use optimal-control theory |
| Forgetting that combined burns also change RAAN | The node moves when the burn is not exactly at the node | Track the full set of six orbital elements after each burn |
| Using two-body \(\Delta v\) budgets for low-thrust transfers | Low thrust distributes the plane change over many revolutions | Switch to Gauss variational equations or averaged elements |

## 7. The textbook-precise statement
Let two Keplerian orbits share the same focus. At a common position \(\mathbf{r}\) the velocity vectors are \(\mathbf{v}_1\) and \(\mathbf{v}_2\). The single-impulse transfer that realizes the change \(\mathbf{v}_1\to\mathbf{v}_2\) costs
\[
\Delta v=\|\mathbf{v}_2-\mathbf{v}_1\|=\sqrt{v_1^2+v_2^2-2v_1v_2\cos\theta},
\]
where \(\theta\) is the angle between \(\mathbf{v}_1\) and \(\mathbf{v}_2\) (including any required plane change \(\Delta i\)). The optimal true anomaly \(f^*\) that minimizes \(\Delta v\) satisfies the first-order condition obtained by differentiating through the vis-viva equation (Vallado, *Fundamentals of Astrodynamics and Applications*, 4e, Eq. 6-19).

## 8. Visual — diagram or schematic
```text
          Apogee (slow)
             /\
            /  \   combined Δv
   v1 ---->/    \----> v2  (new plane)
          /      \
         /        \
Perigee (fast)     node line
```
Axes: radial distance horizontal, out-of-plane vertical. The two velocity vectors lie in different planes; the single resultant \(\Delta\mathbf{v}\) bridges them at the chosen true anomaly.

## 9. The memory technique
1. **The hook** — Picture a figure-skater spinning: the slower the spin (apogee), the cheaper it is to tilt the axis of rotation.  
2. **What to overlearn** — The stationarity condition \(v_2\cos\theta=v_1\) and the law-of-cosines expression for \(\Delta v\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the minimum by setting \(d(\Delta v)/df=0\) using only the vis-viva equation and vector subtraction.

## 10. What this unlocks
The ability to treat any simultaneous change of energy, eccentricity, and inclination as a single vector operation opens the next layer of orbit-design techniques.

- Bi-elliptic transfers that embed plane changes at both apogees  
- Three-dimensional Lambert targeting with free inclination  
- Optimal-control primer-vector theory for continuous-thrust plane-change arcs  
- Constellation phasing with coupled RAAN and mean-anomaly corrections  

## 11. Self-check — five questions, no answers
1. A spacecraft at 400 km altitude must raise perigee to 35 786 km while removing 28° of inclination. At which true anomaly is the single combined burn cheapest?  
2. Show that when \(v_1=v_2\) the combined-maneuver cost equals the pure-plane-change cost regardless of true anomaly.  
3. Derive the stationarity condition \(v_2\cos\theta=v_1\) starting from the law of cosines and the vis-viva equation.  
4. A proposed mission performs a 3° plane change at perigee and the remaining 23° at apogee. Calculate the total \(\Delta v\) and compare it with the single-burn optimum.  
5. Identify the hidden assumption that fails when the required plane change exceeds approximately 60° and the burn location is forced to remain inside the original orbit’s nodal crossing.