## 1. The one-sentence answer
**GNSS** is a constellation of satellites that broadcasts precise timing and orbital data so a receiver on Earth can solve for its three-dimensional position and time by measuring signal travel times from multiple satellites.

Global Navigation Satellite Systems work by turning geometry into a timing problem. Each satellite carries an atomic clock and continuously transmits its position plus the exact transmission instant. A receiver records the arrival time of signals from at least four satellites, converts the time-of-flight differences into pseudoranges, and solves the resulting nonlinear system for latitude, longitude, altitude and receiver clock bias. Because the satellites are distributed across multiple orbital planes, the geometry remains strong almost everywhere on Earth.

The four major systems—GPS (United States), GLONASS (Russia), Galileo (European Union) and BeiDou (China)—use different signal frequencies, modulation schemes and orbital inclinations, yet they interoperate at the user level through multi-constellation receivers.

> [!NOTE]
> The decisive insight is that position is never measured directly; it is computed from the intersection of spheres whose radii are light-speed distances derived from nanosecond-level time differences.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage recovery relies on GPS-derived state vectors updated at 10 Hz for the boost-back burn and landing flip manoeuvre; loss of lock during re-entry would force an autonomous abort. ESA’s Galileo constellation supplies the open-service timing reference for Europe’s rail signalling system ERTMS, enabling headways below 90 seconds on high-speed lines. China’s BeiDou-3 provides centimetre-level augmentation for the “Belt and Road” automated container ports at Shanghai and Singapore, where ship-to-shore cranes operate without human drivers. NASA’s Artemis lunar missions use a hybrid GPS-Galileo receiver on the Orion spacecraft for cislunar navigation out to 10 Earth radii, reducing reliance on ground tracking. Finally, the 2022 Ukraine conflict demonstrated that simultaneous denial of GPS and GLONASS forces UAVs to fall back on inertial coasting, exposing the vulnerability of single-constellation dependence.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Reference frames (ECEF, ECI) | Satellite positions are given in ECEF; receiver solves in the same frame |
| Special-relativistic time dilation | Satellite clocks run faster; correction must be applied before ranging |
| Nonlinear least-squares    | Pseudorange equations are linearised iteratively around an initial guess |
| Dilution of precision (DOP) | Geometric configuration directly scales position error    |

If any row is unfamiliar, pause and review the listed concept before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — From light-travel time to pseudorange
A satellite at known position \(\mathbf{r}^s\) transmits a signal at GPS time \(t^s\). The receiver records arrival at its local time \(t_r\). The measured time difference multiplied by the speed of light yields a pseudorange \(\rho = c(t_r - t^s)\). Because the receiver clock is biased by an unknown \(b\), the true geometric range \(R\) satisfies \(\rho = R + c b\).

Example: if the signal left the satellite at 13:45:12.000000000 and arrives at the receiver clock reading 13:45:12.072345678, then \(\rho \approx 21\,700\) km.

> [!WARNING]
> Treating the receiver clock as perfect collapses the fourth unknown and produces inconsistent solutions when more than three satellites are used.

### Step 2 — Linearisation around an approximate position
The geometric range \(R = \|\mathbf{r}^s - \mathbf{r}_u\|\) is nonlinear. Choose an initial guess \(\mathbf{r}_0\) and expand with a first-order Taylor series:
\[
\rho_i \approx R_i(\mathbf{r}_0) + \mathbf{u}_i^T(\mathbf{r}_u - \mathbf{r}_0) + c b
\]
where \(\mathbf{u}_i\) is the unit vector from receiver to satellite \(i\).

### Step 3 — Forming the measurement matrix
Stacking four or more satellites produces the linear system
\[
\mathbf{y} = \mathbf{H}\mathbf{x} + \boldsymbol{\varepsilon}
\]
with state \(\mathbf{x} = [\Delta x, \Delta y, \Delta z, c b]^T\) and geometry matrix \(\mathbf{H}\) whose rows are \([\mathbf{u}_i^T \ 1]\).

### Step 4 — Weighted least-squares solution
The minimum-variance unbiased estimate is
\[
\hat{\mathbf{x}} = (\mathbf{H}^T\mathbf{W}\mathbf{H})^{-1}\mathbf{H}^T\mathbf{W}\mathbf{y}
\]
where \(\mathbf{W}\) is the inverse of the measurement covariance (elevation-dependent weighting is common).

### Step 5 — Iterative refinement and covariance
Update \(\mathbf{r}_u \leftarrow \mathbf{r}_0 + \Delta\mathbf{r}\), recompute unit vectors, and repeat until \(\|\Delta\mathbf{r}\| < 1\) cm. The final position covariance is
\[
\mathbf{P} = (\mathbf{H}^T\mathbf{W}\mathbf{H})^{-1}
\]
scaled by the a-posteriori variance factor.

## 5. Worked examples — har step show karo

**Example 1 — Single-epoch four-satellite fix**
*Given:* Pseudoranges \(\rho = [20\,123.45, 23\,456.78, 19\,876.54, 21\,345.67]\) m from GPS satellites whose ECEF positions are known; initial guess at origin.
*Find:* ECEF coordinates and clock bias.
Compute unit vectors from origin, form \(\mathbf{H}\) (4×4), solve \(\hat{\mathbf{x}}\). After one iteration the correction is \([–2.3, 4.1, 1.8, 12.4]\) m.  
*Why:* The first linearisation already captures >99 % of the range because the initial guess error is small compared with 20 000 km ranges.  
**Final answer**  
\(\mathbf{r}_u = [-2.3, 4.1, 1.8]\) m, \(b = 41.3\) ns.

*Reflection:* Even a crude initial guess converges in one step when geometry is good; poor geometry (all satellites clustered) inflates the covariance dramatically.

**Example 2 — Inclusion of Galileo and BeiDou (multi-constellation)**
*Given:* Eight pseudoranges, four GPS + two Galileo + two BeiDou, with inter-system bias terms.
*Find:* Position plus two additional inter-system biases.
Augment \(\mathbf{H}\) with two extra columns of ones for the new biases; the state vector grows to six unknowns. The extra measurements reduce DOP from 3.2 to 1.4.  
*Why:* Additional independent geometries shrink the null space of \(\mathbf{H}^T\mathbf{W}\mathbf{H}\).

**Example 3 — Effect of satellite clock correction**
*Given:* Raw pseudorange 22 145 678.90 m; satellite clock correction –3.2 ns.
*Find:* Corrected pseudorange.
Subtract \(c \times (-3.2 \times 10^{-9})\) = +0.96 m.  
*Why:* Relativistic and oscillator errors reach tens of metres if ignored.

**Example 4 — DOP calculation**
*Given:* Geometry matrix \(\mathbf{H}\) after convergence.
*Find:* GDOP = \(\sqrt{\operatorname{tr}(\mathbf{P})}\).
Compute \(\mathbf{P}\), trace = 5.76, GDOP = 2.4.  
*Why:* GDOP > 6 typically indicates unreliable fix; geometry must be checked before trusting output.

*Reflection:* Multi-constellation examples show that adding satellites is mathematically identical to adding rows to \(\mathbf{H}\), directly lowering the eigenvalues of the covariance matrix.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using three satellites only | Forgets receiver clock bias                 | Always keep four unknowns; verify rank(H)=4  |
| Ignoring ionospheric delay  | Single-frequency users treat delay as noise | Apply Klobuchar or dual-frequency combination|
| Treating all measurements equal | Low-elevation satellites have larger errors | Apply elevation-dependent weighting          |
| Forgetting Earth rotation during signal travel | 0.07 s flight time moves satellite 400 m    | Apply Earth-rotation correction to \(\mathbf{r}^s\) |
| Reporting position without DOP | Geometry can be arbitrarily bad             | Publish GDOP or PDOP alongside every fix     |

## 7. The textbook-precise statement
A GNSS receiver determines its Earth-centred, Earth-fixed coordinates \(\mathbf{r}_u\) and clock bias \(b\) by solving the nonlinear system
\[
\rho_i = \|\mathbf{r}^s_i(t^s_i) - \mathbf{r}_u\| + c b + \epsilon_i, \quad i=1,\dots,m
\]
where \(\mathbf{r}^s_i(t^s_i)\) are the satellite positions at the signal transmission epochs corrected for Earth rotation, \(m\geq 4\), and \(\epsilon_i\) collects all residual errors after application of broadcast ephemeris and ionospheric/tropospheric models. The solution is obtained by iterated linearised weighted least squares; the estimator is unbiased and minimum-variance when the weighting matrix equals the inverse of the measurement covariance (Kaplan & Hegarty, *Understanding GPS/GNSS: Principles and Applications*, 3rd ed., §7.3).

## 8. Visual — diagram or schematic
```
          Zenith
            ^
            |   SV3
            |  /
   SV1 -----+---- SV2   (azimuth circle)
            |  \
            |   SV4
   Receiver at origin, local ENU frame
```
Four satellites at different elevations and azimuths; the intersection of the four spheres (radii = corrected pseudoranges) yields the receiver position. The angle between the lines of sight determines DOP.

## 9. The memory technique
1. **The hook** — Picture four atomic clocks on a basketball floating above your head; the instant each clock “beeps”, you measure how late the sound arrives and draw a sphere—your location is the single point touched by all four spheres.
2. **What to overlearn** — The four-state vector \([\Delta x,\Delta y,\Delta z,cb]^T\) and the fact that GDOP = \(\sqrt{\operatorname{tr}((\mathbf{H}^T\mathbf{H})^{-1})}\).
3. **Spaced-repetition schedule** — Review the linearisation step after 1 day, recompute a DOP example after 3 days, derive the covariance update after 7 days, and solve a full multi-constellation fix after 16 and 35 days.
4. **First-principles fallback** — If the formula is forgotten, start from \(\rho = c\Delta t\), expand \(\|\mathbf{r}^s - \mathbf{r}_u\|\) with the first-order Taylor term, and assemble the normal equations.

## 10. What this unlocks
Mastery of GNSS positioning enables the study of sensor fusion with inertial measurement units, real-time kinematic (RTK) carrier-phase techniques, and integrity monitoring required for aviation LPV approaches. It also supplies the timing backbone for synchronised distributed radar and for orbit determination of low-Earth-orbit constellations.

- Loosely/tightly coupled INS/GNSS Kalman filters
- Carrier-phase ambiguity resolution
- RAIM/FDE fault detection algorithms
- Precise orbit determination (POD) for satellites

## 11. Self-check — five questions, no answers
1. A receiver reports GDOP = 8.2 with four satellites; what single geometric change would most reduce it?
2. Derive the first-order correction term for Earth rotation during the 0.07 s signal travel time.
3. Given five pseudoranges and a rank-4 H matrix, write the expression for the a-posteriori variance factor.
4. Why does adding a satellite below 5° elevation sometimes increase rather than decrease the position error ellipse?
5. A dual-frequency user forms the ionosphere-free combination; show that the resulting measurement still contains the receiver clock bias term.