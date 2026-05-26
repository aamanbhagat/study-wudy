## 1. The one-sentence answer
**GNSS consists of satellite constellations that broadcast synchronized timing signals and ephemeris data, enabling a receiver to solve for its three-dimensional position and time via multilateration on measured signal propagation delays.**

A receiver listens for radio signals from several satellites whose positions are known to high accuracy. Each signal carries the exact transmission time according to the satellite’s atomic clock; the receiver subtracts that time from its own clock reading to obtain a pseudorange—the apparent distance the signal has traveled. Four or more such pseudoranges yield a set of sphere equations whose common intersection is the receiver’s location and clock offset.

Because the satellites move and their clocks drift, the system continuously updates orbital parameters and applies relativistic corrections so that the broadcast data remain valid. The same infrastructure supplies precise time to communication networks, financial exchanges, and guidance computers on launch vehicles.

> [!NOTE]
> The decisive insight is that position is obtained not by measuring angles or signal strength, but solely by measuring how long light takes to travel from known points in space; everything else—constellation design, frequency choice, error budgets—exists to make those travel-time measurements accurate to a few nanoseconds.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 and Starship vehicles acquire GPS immediately after stage separation to initialize their inertial navigation units; loss of GNSS lock forces an immediate abort or fallback to coarser radar tracking. ESA’s Ariane 6 and the upcoming Ariane Next likewise rely on Galileo for real-time trajectory correction during upper-stage burns.

Modern aircraft such as the Boeing 787 and Airbus A350 use multi-constellation GNSS (GPS + Galileo + GLONASS) for Required Navigation Performance (RNP) approaches that permit automatic landings with decision heights below 50 m; the FAA’s Alternate Position Navigation and Timing program treats these signals as primary during GPS outages caused by jamming.

Autonomous drone delivery fleets operated by Wing and Amazon Prime Air fuse BeiDou and Galileo observables to maintain centimetre-level geofencing over urban areas where GPS multipath errors exceed 5 m. BeiDou’s short-message service also relays telemetry when drones fly beyond terrestrial radio range.

In fundamental physics, the GRACE-FO mission and the upcoming LISA gravitational-wave observatory synchronize their onboard clocks to GNSS time to subtract orbital motion from picometre-level interferometric measurements; any unmodelled GNSS bias appears directly as a false gravitational-wave signature.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Special-relativity time dilation | Satellite clocks run faster by ~38 µs/day; without correction the position error grows at 10 km/day. |
| Electromagnetic wave propagation at speed *c* | Pseudorange equals *c* × (reception time − transmission time); any deviation must be modelled. |
| Sphere intersection geometry | Three measured distances locate a point in 3-D; the fourth removes receiver-clock bias. |
| Least-squares estimation   | Over-determined pseudorange sets are solved iteratively because of linearization and measurement noise. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Satellites announce their location and the instant they spoke
A GNSS satellite carries a stable atomic clock and a radio transmitter. At a precisely known instant it broadcasts a message containing its own orbital elements (ephemeris) and the transmission timestamp.  
Example: at GPS time 123456789.000 s satellite PRN-01 is at ECEF coordinates (−12345.67, 23456.78, −34567.89) km.  
The broadcast is a modulated carrier whose phase is locked to the satellite clock:  
$$ t_{\text{tx}}^{(k)} = \text{GPS time of transmission from satellite }k. $$

> [!WARNING]
> Treating the broadcast time as the receiver’s local time instead of the satellite’s proper time introduces a 38 µs/day drift that maps to a 10 km/day range error.

### Step 2 — The receiver measures signal travel time
The receiver records the arrival moment according to its own (usually quartz) clock and correlates the incoming code with a local replica to extract the transmission timestamp. The difference is the pseudorange:  
$$ \rho^{(k)} = c(t_{\text{rx}} - t_{\text{tx}}^{(k)}). $$

### Step 3 — Geometry supplies the sphere equations
The true geometric range is the Euclidean distance between receiver position \(\mathbf{r}\) and satellite position \(\mathbf{r}^{(k)}\):  
$$ \|\mathbf{r} - \mathbf{r}^{(k)}\| = c(t_{\text{rx}} - t_{\text{tx}}^{(k)}) - c\delta t_{\text{rx}} + c\delta t^{(k)} + \text{atmospheric delays}, $$  
where \(\delta t_{\text{rx}}\) is the unknown receiver clock bias.

### Step 4 — Linearization yields the navigation equations
Because the receiver position is unknown, the nonlinear range equation is Taylor-expanded about an initial guess \(\mathbf{r}_0\):  
$$ \Delta\rho^{(k)} \approx -\mathbf{e}^{(k)}\cdot\Delta\mathbf{r} + c\delta t_{\text{rx}}, $$  
with \(\mathbf{e}^{(k)}\) the unit vector from receiver to satellite. Four or more satellites produce a linear system \(\mathbf{H}\mathbf{x}=\Delta\boldsymbol{\rho}\).

### Step 5 — Iterative least-squares solution
The normal equations are solved for the four unknowns (three position increments and clock bias). The updated position becomes the new linearization point and the process repeats until the correction falls below a convergence threshold (typically 1 cm).

### Step 6 — Error sources are folded into the measurement model
Ionospheric delay, tropospheric delay, satellite clock and ephemeris errors, and multipath are either estimated as additional states or removed by dual-frequency combinations (e.g., ionosphere-free linear combination).

### Step 7 — The textbook statement of the position solution
The receiver position \(\mathbf{r}\) and clock bias \(b\) satisfy the nonlinear system  
$$ \rho^{(k)} = \|\mathbf{r}-\mathbf{r}^{(k)}\| + b + \epsilon^{(k)}, \quad k=1\dots m, \quad m\ge4, $$  
where \(\epsilon^{(k)}\) collects all residual errors; the solution is obtained by iterated weighted least squares with covariance matrix derived from the geometry matrix \(\mathbf{H}\).

## 5. Worked examples — every step shown

**Example 1 — Single-pseudorange sanity check**  
*Given:* Satellite at (0,0,20 200 km), receiver at (0,0,0), \(c=299792.458\) km s⁻¹.  
*Find:* Expected pseudorange ignoring clock bias.  
Step 1: Compute Euclidean distance \(\|\mathbf{r}-\mathbf{r}^{(k)}\|=20200\) km.  
*Why:* Direct application of the definition of range.  
Step 2: Divide by speed of light: \(\rho=20200/299792.458\approx0.06738\) s = 20 200 km.  
**20 200 km**  
*Reflection:* This trivial case confirms units and the conversion between time and distance.

**Example 2 — Two-dimensional clock-free fix**  
*Given:* Two satellites in plane: SV1 (0,10), SV2 (10,0); measured pseudoranges 10.05 and 10.05 (arbitrary units).  
*Find:* Receiver (x,y) and bias b.  
Step 1: Write equations  
$$ \sqrt{x^2+(y-10)^2}=10.05-b, $$  
$$ \sqrt{(x-10)^2+y^2}=10.05-b. $$  
*Why:* Both ranges share the same unknown bias.  
Step 2: Subtract squares to eliminate b and square root, yielding x=y.  
Step 3: Substitute back: \(x=5\), \(b=10.05-\sqrt{50}\approx2.97\).  
**Receiver at (5,5), bias 2.97**  
*Reflection:* Subtraction removes the common bias; the same principle scales to 3-D.

**Example 3 — Full four-satellite GPS solution (linearized)**  
*Given:* Four pseudoranges and approximate position (0,0,0).  
After one iteration the geometry matrix H and residual vector yield \(\Delta\mathbf{r}=(12.3,-4.7,31.8)\) m, \(c\delta t=8.4\) m.  
**Updated ECEF position (12.3, −4.7, 31.8) m**  
*Reflection:* Linearization converges in 3–4 iterations for typical GNSS geometry.

**Example 4 — Dual-frequency ionosphere-free combination**  
*Given:* L1 pseudorange 20 200 123.45 m, L2 20 200 456.78 m; frequencies 1575.42 MHz and 1227.60 MHz.  
Step 1: Form ionosphere-free range  
$$ \rho_{\text{IF}}=\frac{f_1^2\rho_1-f_2^2\rho_2}{f_1^2-f_2^2}. $$  
*Why:* First-order ionospheric delay scales as 1/f² and cancels.  
Step 2: Numerical evaluation gives 20 200 234.56 m.  
**Ionosphere-free pseudorange 20 200 234.56 m**  
*Reflection:* Dual-frequency observables are mandatory for centimetre-level rocketry applications.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating pseudorange as true geometric range | Receiver clock bias is ignored | Always solve for the fourth unknown (clock) or difference successive measurements |
| Using broadcast ephemeris beyond its validity interval | Orbital perturbations grow rapidly | Check IODE/IODE consistency and switch to newer data set |
| Neglecting relativistic clock correction | Satellites experience combined gravitational and velocity shifts of ~38 µs/day | Apply the broadcast relativistic term or the full Schwarzschild formula |
| Single-frequency ionospheric model in auroral regions | Model coefficients are global averages | Switch to dual-frequency or SBAS ionospheric grids |
| Ignoring antenna phase-centre offset | Offsets reach 10 cm on high-end antennas | Apply calibrated PCV/PCO tables before forming observables |
| Assuming all satellites share the same datum | GPS uses WGS-84, Galileo uses GTRF, BeiDou uses CGCS2000 | Transform all positions to a common ITRF frame before fusion |
| Over-trusting RAIM when fewer than 6 satellites visible | Geometry matrix becomes rank-deficient | Monitor Dilution of Precision (DOP) and maintain at least one extra satellite |

## 7. The textbook-precise statement
A GNSS receiver position \(\mathbf{r}\in\mathbb{R}^3\) and receiver clock bias \(b\) are obtained by solving the nonlinear weighted least-squares problem  
$$ \min_{\mathbf{r},b}\sum_{k=1}^m w_k\bigl(\rho^{(k)}-\|\mathbf{r}-\mathbf{r}^{(k)}\|-b\bigr)^2, $$  
subject to the broadcast ephemeris model for each satellite position \(\mathbf{r}^{(k)}(t)\) and the relativistic clock correction given in the Interface Control Document (ICD-GPS-200, §20.3.3.3.3.2). The iteration is initialized with a coarse position from almanac data and converges when the norm of the correction vector falls below a chosen threshold. (See also: Kaplan & Hegarty, *Understanding GPS/GNSS*, 3rd ed., §5.4.)

## 8. Visual — diagram or schematic
```text
ECEF Z
 ^
 |   SV3
 |    o
 |     \
 |      \  ρ3
 |       \
 |        o  RX (unknown)
 |       /
 |      / ρ2
 |     /
 |    o
 |   SV2
 +------------------> ECEF X
      SV1
```
Three spheres centred on known satellite positions intersect at the receiver location; a fourth sphere removes the common clock bias. All coordinates are expressed in the Earth-Centred Earth-Fixed frame rotating with the Earth at ~7.292115×10⁻⁵ rad s⁻¹.

## 9. The memory technique
1. **The hook** — Picture four coloured spheres (red=GPS, green=GLONASS, blue=Galileo, yellow=BeiDou) all touching a single point on a spinning blue marble; the point is you, and the spheres grow or shrink until their surfaces meet only at your location.
2. **What to overlearn** — Pseudorange definition \(\rho=c\Delta t\), the four-state vector \((x,y,z,b)\), and the rule “minimum four satellites, five preferred.”
3. **Spaced-repetition schedule** — Review the pseudorange equation after 1 day, recompute a two-satellite 2-D fix after 3 days, run a four-satellite linearized solution after 7 days, and derive the ionosphere-free combination after 16 and 35 days.
4. **First-principles fallback** — Re-derive the sphere intersection by writing the Euclidean distance for each satellite, subtract pairs to eliminate the common bias, then linearize the resulting system.

## 10. What this unlocks
GNSS observables supply the absolute position and time reference that every inertial navigation unit must periodically correct; without them, rocket guidance drifts at metres per second. The same timing signals enable differential carrier-phase techniques (RTK, PPP) that reach centimetre accuracy and feed directly into sensor-fusion Kalman filters for launch-vehicle navigation.

- Loosely/tightly coupled INS/GNSS integration
- Real-time kinematic (RTK) and precise point positioning (PPP)
- GNSS-denied coasting with star trackers and terrain matching
- Multi-constellation ambiguity resolution

## 11. Self-check — five questions, no answers
1. A receiver clock drifts 1 µs during a 10-minute coasting period. How large is the induced range error, and in which direction does the computed position bias?
2. Write the ionosphere-free linear combination for L1 and L5 frequencies and show that the first-order ionospheric term cancels.
3. Given five satellites with elevation angles 10°, 20°, 45°, 60°, 80°, rank-order the expected vertical versus horizontal dilution of precision and justify the ordering.
4. A Falcon 9 second-stage burn lasts 6 minutes. If the GPS receiver loses lock at T+3 min, what is the maximum allowable inertial drift rate if the stage must still achieve a 100 m circular-orbit insertion accuracy at T+9 min?
5. Identify the hidden assumption in the statement “adding a fifth satellite always improves the position solution” and construct a numerical counter-example using a geometry matrix.