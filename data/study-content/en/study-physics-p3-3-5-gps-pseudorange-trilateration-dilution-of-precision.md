## 1. The one-sentence answer
**GPS determines a receiver’s position by measuring biased time-of-flight distances (pseudoranges) to at least four satellites and solving the resulting nonlinear system whose geometry is quantified by dilution of precision.**

A satellite transmits a timestamped code; the receiver correlates the received waveform with a local replica and records the apparent travel time. Multiplication by the speed of light yields a pseudorange that contains the true geometric range plus the receiver-clock bias. Four such measurements produce four equations in four unknowns (three coordinates plus clock offset). The intersection of four spheres is reduced algebraically to a linear correction step after an initial guess.

Trilateration therefore rests on sphere geometry, not on angles. When the satellites lie close together in the sky the spheres intersect at a shallow angle; small range errors are magnified into large position errors. Dilution of precision (DOP) is the scalar factor that converts range-error standard deviation into position-error standard deviation for a given satellite geometry.

> [!NOTE]
> The single deepest insight is that every GPS fix is a joint estimation of where you are and what time it is; the fourth satellite is required not for redundancy but because time is itself an unknown.

## 2. Why this matters — concrete and current
SpaceX recovers Falcon 9 first stages with GPS-aided inertial navigation that must maintain meter-level accuracy during hypersonic entry; the pseudorange solution supplies the absolute position update that keeps the vehicle inside its narrow recovery corridor.

The U.S. Space Force’s GPS III satellites broadcast the L1C and L5 civil signals whose improved pseudorange precision directly reduces the geometric DOP contribution to the 30 cm real-time positioning now used by John Deere’s AutoTrac autonomous tractors.

ESA’s Galileo constellation publishes its own Open Service pseudorange observables; the combined GPS–Galileo solution lowers vertical DOP from 2.8 to 1.4, enabling the 1 m vertical accuracy required for LPV-200 approaches at more than 200 European airports.

The James Webb Space Telescope uses a GPS-like pseudorange technique (the “Fine Guidance Sensor” star-tracker triangulation) during its L2 halo-orbit insertion; the same geometric DOP mathematics governs how many guide stars must be visible to keep line-of-sight jitter below 7 mas.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Special-relativity time dilation | Satellite clocks run fast by ~38 µs/day; the bias must be absorbed into the pseudorange model |
| Linearisation of nonlinear equations | The range equations are quadratic; Newton–Raphson or Bancroft’s closed-form solution requires a first-order Taylor expansion |
| Covariance propagation   | DOP is obtained by mapping the diagonal range covariance through the geometry matrix inverse |
| Reference frames (ECEF, ECI) | Satellite ephemerides are given in ECEF; receiver position must be expressed in the same frame |

## 4. Building the idea — from intuition to formalism

### Step 1 — Time-of-flight measurement
A receiver records the moment a satellite’s PRN code arrives. The difference between arrival time and transmit time, scaled by c, is the raw observable.

Example: a 0.067 ms code delay corresponds to a 20 000 km apparent range.

Formally the measurement is  
$$\rho = c(t_r - t^s) + \varepsilon.$$  
> [!WARNING]
> Treating the receiver clock as perfect collapses the fourth unknown and yields an inconsistent system; the bias must remain explicit.

### Step 2 — Pseudorange definition
The quantity \(\rho\) equals geometric range plus receiver-clock bias plus smaller terms (ionosphere, troposphere, multipath).  
$$\rho^{(i)} = \sqrt{(x-x^{(i)})^2+(y-y^{(i)})^2+(z-z^{(i)})^2} + c\,b + \varepsilon^{(i)}.$$

### Step 3 — Four-satellite system
Four satellites give four equations. Subtracting pairs eliminates the quadratic terms and produces a linear system in the unknowns.

### Step 4 — Linearised observation matrix
Let \(\mathbf{G}\) be the geometry matrix whose rows are the unit vectors from receiver to satellite plus a column of ones for the clock. The normal equations become  
$$\mathbf{H}^T\mathbf{H}\,\delta\mathbf{x} = \mathbf{H}^T\delta\boldsymbol{\rho},$$  
where \(\mathbf{H}\) augments \(\mathbf{G}\) with the clock column.

### Step 5 — Dilution of precision
The position-error covariance is \(\sigma_\rho^2(\mathbf{H}^T\mathbf{H})^{-1}\). The geometric DOP is  
$$\text{GDOP} = \sqrt{\operatorname{tr}\bigl((\mathbf{H}^T\mathbf{H})^{-1}\bigr)}.$$  
When GDOP exceeds 6, geometry alone multiplies a 1 m range error into a >6 m position error.

## 5. Worked examples — every step shown

**Example 1 — Single pseudorange**  
*Given:* Transmit time 13:45:12.000000 UTC, receive time 13:45:12.067123 UTC.  
*Find:* Pseudorange.  
Step: \(\Delta t = 0.067123\) s.  
*Why:* Direct subtraction of tagged times.  
Step: \(\rho = c \Delta t = 20\,136\,900\) m.  
*Why:* Multiplication by vacuum speed of light converts time to distance.  
**20 136 900 m**

*Reflection:* This number still contains the receiver-clock bias; it is not yet a true range.

**Example 2 — Two-dimensional trilateration**  
*Given:* Two satellites at (0,0) and (10,0), pseudoranges 5 and 5.  
*Find:* Receiver (x,y).  
Step: Write circles \(x^2+y^2=25\), \((x-10)^2+y^2=25\).  
*Why:* Geometric definition of range.  
Step: Subtract: \(20x-100=0 \implies x=5\).  
*Why:* Linear term appears after subtraction.  
Step: \(y=0\).  
**Position (5,0)**

*Reflection:* Two circles intersect at two points; the clock bias or a third satellite is needed to resolve the ambiguity.

**Example 3 — Linearised GPS fix**  
*Given:* Approximate position (0,0,0), four satellites with unit vectors forming rows of \(\mathbf{G}\).  
*Find:* Position correction.  
Step: Form \(\mathbf{H}\) (4×4).  
*Why:* Adds clock column of ones.  
Step: Solve \(\delta\mathbf{x}=(\mathbf{H}^T\mathbf{H})^{-1}\mathbf{H}^T\delta\boldsymbol{\rho}\).  
*Why:* Least-squares solution of linearised system.  
**\(\delta\mathbf{x}\) updates ECEF coordinates by tens of metres**

*Reflection:* Convergence in two iterations is typical once the initial guess is within 100 km.

**Example 4 — GDOP calculation**  
*Given:* \(\mathbf{H}^T\mathbf{H}\) diagonal elements sum to 5.2 after inversion.  
*Find:* GDOP.  
Step: \(\text{GDOP}=\sqrt{5.2}=2.28\).  
*Why:* Trace extracts total variance inflation.  
**GDOP = 2.28**

*Reflection:* A GDOP of 2.28 means geometry is good; values >6 require waiting for better satellite distribution.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating pseudorange as true range | Forgetting receiver clock bias | Always retain the fourth unknown |
| Using only three satellites | Assuming perfect time | Verify GDOP after solution; reject if >6 |
| Ignoring ionospheric delay | Single-frequency users see 5–15 m bias | Apply Klobuchar or dual-frequency combination |
| Singular \(\mathbf{H}^T\mathbf{H}\) | All satellites in one plane | Check condition number before inversion |
| ECEF–ECI frame mismatch | Earth rotation during signal travel | Apply Sagnac correction (~30 m at equator) |
| Multipath on low-elevation satellites | Reflections add positive delay | Apply elevation mask ≥10° |
| Integer ambiguity in carrier phase | Not part of pseudorange but often confused | Keep pseudorange and carrier observables separate |

## 7. The textbook-precise statement
A pseudorange measurement from satellite \(i\) satisfies  
$$\rho_i = \|\mathbf{r}_u - \mathbf{r}^i\| + c\,b_u + I_i + T_i + \varepsilon_i,$$  
where \(\mathbf{r}_u\) is the unknown receiver position in ECEF, \(b_u\) the receiver clock offset, and \(I_i,T_i\) ionospheric and tropospheric delays. The least-squares solution minimises the weighted sum of squared residuals after linearisation about an a-priori state; GDOP is the square root of the trace of the upper-left 3×3 block of \((\mathbf{H}^T\mathbf{W}\mathbf{H})^{-1}\). (See Kaplan & Hegarty, *Understanding GPS/GNSS*, 3rd ed., §7.3–7.5.)

## 8. Visual — diagram or schematic
```text
          S3 (z)
           *
          /|\
         / | \
        /  |  \   ρ3
       /   |   \
S1 *---+---+---* S2   (equatorial plane)
       \   |   /
        \  |  /   ρ1,ρ2
         \ | /
          \|/
           R (receiver)
```
Three satellites define spheres whose common intersection is reduced to a point once the fourth satellite supplies the clock reference. Axes are ECEF; origin at Earth centre.

## 9. The memory technique
1. **The hook** — Picture four expanding spheres whose surfaces must touch the receiver at the same instant; the fourth sphere’s radius is set by the receiver’s watch error.
2. **What to overlearn** — The four-column geometry matrix \(\mathbf{H}\) and the definition \(\text{GDOP}=\sqrt{\operatorname{tr}((\mathbf{H}^T\mathbf{H})^{-1})}\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the linearised observation equation from the Euclidean distance formula and the first-order Taylor expansion of the square-root term.

## 10. What this unlocks
Pseudorange trilateration supplies the absolute position and time seed required by every subsequent GNC filter.  
- Carrier-smoothed pseudorange and RTK integer ambiguity resolution  
- Extended Kalman filter propagation of INS/GPS errors  
- GNSS/INS deeply-coupled vector tracking loops  
- Orbit determination for LEO satellites using onboard GPS

## 11. Self-check — five questions, no answers
1. A receiver clock drifts 1 µs during a 70 ms satellite visibility window. By how many metres does each pseudorange shift?  
2. Two satellites lie at elevation 5° and azimuth 0°/180°; a third at 89° elevation. Compute the approximate vertical DOP component before any matrix inversion.  
3. Why does subtracting two pseudorange equations eliminate the receiver clock bias yet leave a hyperbolic surface?  
4. A geometry matrix \(\mathbf{H}\) has condition number 120. Is the resulting position solution usable for a Category I approach?  
5. Derive the expression for the Sagnac correction term that appears when converting light-travel time into an ECEF range.