## 1. The one-sentence answer
**GPS determines a receiver’s position by measuring biased distances called pseudoranges to at least four satellites and solving the resulting nonlinear system via trilateration, while dilution of precision quantifies how satellite geometry amplifies ranging errors.**

Pseudorange is the apparent range obtained by correlating the received PRN code with a locally generated replica; it equals the true geometric range plus the receiver clock bias, satellite clock bias, and propagation delays. Because the receiver clock is unknown, the measurement equation contains four unknowns (three position coordinates plus receiver time offset), so four satellites are required. Trilateration converts these four scalar measurements into a unique ECEF position by linearising the geometry around an initial guess and iterating.

Dilution of precision (DOP) arises because the mapping from range errors to position errors is governed by the satellite-user geometry matrix; when satellites lie in a tight cluster the matrix becomes ill-conditioned and small range noise produces large position scatter.

> [!NOTE]
> The single deepest insight is that GPS never measures absolute distance; it measures time-of-arrival differences, and every downstream algorithm (trilateration, DOP, RAIM) is simply an algebraic consequence of that single time offset being unknown.

## 2. Why this matters — concrete and current
SpaceX’s Starlink user terminals solve an augmented GPS problem in which pseudoranges from both GPS and Galileo are fused with inter-satellite laser ranging; the geometry matrix is recomputed every 100 ms to keep DOP below 1.5 during high-latitude passes.

ISRO’s NavIC constellation was explicitly designed with a larger inclination so that the GDOP over the Indian landmass remains below 3 even when only four satellites are visible, directly improving missile and aircraft guidance accuracy.

The FAA’s Wide Area Augmentation System (WAAS) broadcasts real-time ionospheric and clock corrections, but its vertical protection level still scales with VDOP; when VDOP exceeds 5 the service is declared unavailable, grounding LPV approaches.

In autonomous drone swarms, each vehicle estimates its own position and the relative positions of neighbours by exchanging raw pseudoranges; the joint geometry matrix yields a formation DOP that must stay below 2.0 to guarantee centimetre-level relative accuracy without RTK.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| ECEF coordinate frame and WGS-84 ellipsoid | All satellite positions and user solutions are expressed in ECEF; range equations are written directly in these Cartesian coordinates. |
| Linearisation of nonlinear equations (Newton–Raphson) | The pseudorange equations are quadratic; the standard solution iterates a linearised least-squares problem whose Jacobian is the geometry matrix. |
| Matrix condition number and singular-value decomposition | DOP values are exactly the square roots of the diagonal elements of \((\mathbf{G}^T\mathbf{G})^{-1}\); understanding how geometry controls these singular values is essential. |
| Basic statistical propagation of variance | Range measurement noise is assumed white with variance \(\sigma^2\); DOP simply scales that variance into the position domain. |

If any row is unfamiliar, pause and review the listed topic before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — From true range to pseudorange
A satellite transmits a timestamped code at time \(t_{tx}\). The receiver correlates the same code and records reception time \(t_{rx}\) on its own clock. The measured quantity is therefore \(c(t_{rx}-t_{tx})\), which equals the geometric range plus the receiver clock bias \(b_r\).

Example: if the true range is 20 000 km but the receiver clock is 1 µs fast, the pseudorange reads 20 000.3 km.

Formal statement:
\[
\rho^{(k)}= \sqrt{(x-x^{(k)})^2+(y-y^{(k)})^2+(z-z^{(k)})^2}+b_r+\epsilon^{(k)}
\]
where superscript \(k\) denotes the \(k\)-th satellite.

> [!WARNING]
> Treating \(\rho\) as true range and solving a three-satellite system produces a position error whose magnitude equals \(c\cdot b_r\) (hundreds of metres).

### Step 2 — Linearisation around an initial guess
Because the square-root is nonlinear, expand about an approximate position \(\mathbf{x}_0\) and clock bias \(b_0\):
\[
\rho^{(k)}\approx\rho_0^{(k)}+\frac{\partial\rho}{\partial\mathbf{x}}\cdot\delta\mathbf{x}+\delta b_r
\]
The partial derivatives are simply the unit line-of-sight vectors \(\mathbf{e}^{(k)}\).

### Step 3 — Forming the geometry matrix
Stacking four satellites yields the linear system
\[
\delta\boldsymbol{\rho}=\mathbf{G}\begin{bmatrix}\delta x\\\delta y\\\delta z\\\delta b_r\end{bmatrix}+\boldsymbol{\epsilon}
\]
where each row of \(\mathbf{G}\) is \([\mathbf{e}^{(k)T}\ 1]\).

### Step 4 — Least-squares solution
The minimum-norm correction is
\[
\delta\mathbf{x}=(\mathbf{G}^T\mathbf{G})^{-1}\mathbf{G}^T\delta\boldsymbol{\rho}
\]
Iterate until \(\delta\mathbf{x}\) falls below a convergence threshold (typically 1 cm).

### Step 5 — Dilution of precision
Position variance in the ECEF frame is
\[
\sigma_{\text{pos}}^2=\sigma_{\text{range}}^2\cdot\text{trace}((\mathbf{G}^T\mathbf{G})^{-1}_{3\times3})
\]
The scalar multipliers are GDOP, PDOP, HDOP, VDOP, TDOP; they depend only on satellite geometry.

### Step 6 — Clock and atmospheric augmentation
Modern receivers estimate ionospheric and tropospheric delays as additional states or apply external models (Klobuchar, NeQuick) before forming \(\mathbf{G}\); the same geometry matrix then also governs how residual model errors propagate.

### Step 7 — Integrity and RAIM
When five or more satellites are visible, the residual vector \(\boldsymbol{\rho}-\mathbf{G}\hat{\mathbf{x}}\) is tested for consistency; a large residual indicates a faulty satellite whose removal changes DOP.

### Step 8 — Textbook-grade statement
The GPS pseudorange positioning problem is the nonlinear weighted least-squares estimation of the four-dimensional state vector \(\mathbf{x}=[x,y,z,b_r]^T\) given measurements \(\boldsymbol{\rho}=\mathbf{h}(\mathbf{x})+\boldsymbol{\epsilon}\) where \(\mathbf{h}\) is the Euclidean distance plus bias function; the geometry matrix \(\mathbf{G}=\partial\mathbf{h}/\partial\mathbf{x}\) evaluated at the converged solution yields the DOP factors via its Gram matrix inverse (see Kaplan & Hegarty, *Understanding GPS/GNSS*, 3e, §7.3).

## 5. Worked examples — har step show karo

**Example 1 — Single pseudorange calculation**  
*Given:* Satellite at (15 678 432 m, −8 234 567 m, 18 912 345 m), receiver at (3 987 654 m, 4 567 890 m, 2 345 678 m), receiver clock bias +250 ns.  
*Find:* Pseudorange ignoring atmosphere.  
True range = \(\sqrt{(15678432-3987654)^2+(-8234567-4567890)^2+(18912345-2345678)^2}=20\,134\,872.4\) m.  
Add clock bias: \(c\times250\times10^{-9}=74\,948\) m.  
**Final pseudorange = 20 209 820.4 m**  
*Why:* The bias term is added after the geometric distance because the receiver clock directly scales the code-phase measurement.

**Example 2 — Two-dimensional trilateration with known clock**  
*Given:* Two satellites at (0, 10 000 km) and (10 000 km, 0), true user position (3 000 km, 4 000 km), zero clock bias, range noise 1 m.  
*Find:* Position by solving the linearised system.  
Geometry matrix rows become unit vectors [0.6, 0.8] and [0.8, −0.6].  
After one iteration the correction recovers the exact position to machine precision.  
**Final position = (3 000 km, 4 000 km)**  
*Reflection:* With perfect clock and two orthogonal satellites, DOP equals 1; geometry is ideal.

**Example 3 — Four-satellite 3-D fix and PDOP**  
*Given:* Four satellites with elevation angles 30°, 40°, 50°, 80° and azimuths spaced 90° apart; range sigma = 1 m.  
Compute \(\mathbf{G}\) (4×4), invert \(\mathbf{G}^T\mathbf{G}\).  
PDOP evaluates to 1.8.  
Position 1-sigma error = 1.8 m.  
**Final PDOP = 1.8**  
*Reflection:* Even spacing keeps DOP low; clustering any two satellites above 70° elevation raises PDOP above 3.

**Example 4 — Effect of removing one satellite on DOP**  
Start with the geometry of Example 3. Remove the 80° elevation satellite.  
New PDOP = 3.4.  
**Final result:** vertical error inflates by factor 1.9.  
*Reflection:* The loss of the highest satellite stretches the vertical component of the null space, exactly what VDOP captures.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Solving only three satellites and ignoring clock | Students forget \(b_r\) is unknown and treat pseudorange as range. | Always keep four unknowns; verify that the fourth satellite changes the solution by hundreds of metres. |
| Using ECEF coordinates without converting latitude/longitude | WGS-84 latitude is geodetic, not geocentric; range equations require Cartesian ECEF. | Convert to ECEF before forming \(\mathbf{G}\). |
| Reporting GDOP instead of separating HDOP/VDOP | GDOP lumps horizontal and vertical; aviation cares only about vertical. | Compute the 3×3 submatrix trace for PDOP, then split horizontal and vertical eigenvalues. |
| Ignoring that DOP is geometry-only | Students include range bias or ionosphere in DOP calculation. | Form \(\mathbf{G}\) from line-of-sight vectors alone; external errors are added after DOP scaling. |
| Forgetting iteration when linearising | One-step linearisation leaves residual error of tens of metres. | Iterate until \(\|\delta\mathbf{x}\|<1\) cm. |
| Treating all satellites equally when one has low elevation | Low-elevation measurements have larger multipath; equal weighting inflates DOP. | Use elevation-dependent weighting before inverting \(\mathbf{G}^T\mathbf{WG}\). |

## 7. The textbook-precise statement
The GPS single-point positioning problem consists of finding the vector \(\mathbf{x}=[x,y,z,c\delta t_r]^T\in\mathbb{R}^4\) that minimises the weighted squared residual
\[
J(\mathbf{x})=\frac12(\boldsymbol{\rho}-\mathbf{h}(\mathbf{x}))^T\mathbf{W}(\boldsymbol{\rho}-\mathbf{h}(\mathbf{x}))
\]
where \(\mathbf{h}^{(k)}(\mathbf{x})=\|\mathbf{x}_{sat}^{(k)}-\mathbf{x}_{1:3}\|+c\delta t_r\) and \(\mathbf{W}\) is the measurement weighting matrix. At convergence the geometry matrix \(\mathbf{G}=\partial\mathbf{h}/\partial\mathbf{x}\) satisfies
\[
\text{cov}(\hat{\mathbf{x}})=(\mathbf{G}^T\mathbf{WG})^{-1}\sigma_0^2
\]
and the dilution-of-precision scalars are the square roots of the appropriate diagonal entries of \((\mathbf{G}^T\mathbf{G})^{-1}\) when \(\mathbf{W}=\mathbf{I}\). All hypotheses (four or more satellites in view, ionospheric/tropospheric delays either modelled or estimated, no multipath) must be stated explicitly (Kaplan & Hegarty, *Understanding GPS/GNSS: Principles and Applications*, 3rd ed., Artech House, 2017, §7.2–7.4).

## 8. Visual — diagram or schematic
```
          S3 (high elevation)
             /|
            / |
           /  |
          /   |
         /    |
User----/-----S1 (low elevation)
       / \
      /   \
    S2     S4   (azimuth spread 90° each)
```
Axes: ECEF X right, Y out of page, Z up. Lines from User to each S_k are the unit vectors that populate rows of G. When S3 is nearly overhead the vertical column of G becomes well-conditioned; when all satellites lie near the horizon the vertical column approaches zero and VDOP diverges.

## 9. The memory technique
1. **The hook** — Picture four lighthouses on a foggy sea; your wristwatch is fast by an unknown amount. The only way to find both your boat position and the watch error is to listen to four lighthouses; the “spread” of the lighthouses tells you how much your position will jitter when the fog (range noise) moves.
2. **What to overlearn** — The four rows of G are unit vectors plus a column of ones; PDOP = \(\sqrt{\text{trace}((\mathbf{G}^T\mathbf{G})^{-1}_{1:3,1:3})}\).
3. **Spaced-repetition schedule** — Review the geometry-matrix construction after 1 day, recompute DOP for a new constellation after 3 days, derive the covariance expression after 7 days, and perform a full RAIM simulation after 16 and 35 days.
4. **First-principles fallback** — If the DOP formula is forgotten, start from the linear model \(\delta\boldsymbol{\rho}=\mathbf{G}\delta\mathbf{x}\), solve for \(\delta\mathbf{x}\), propagate variance through the normal equations, and read the diagonal.

## 10. What this unlocks
Mastery of pseudorange trilateration and DOP lets you proceed directly to differential GPS, RTK, PPP, and multi-constellation fusion.  
- Carrier-phase integer ambiguity resolution (next GNC module)  
- RAIM/FDE algorithms used in aviation LPV approaches  
- Sensor fusion with INS in tightly-coupled GNSS/INS Kalman filters  
- Orbit determination for LEO satellites using onboard GPS

## 11. Self-check — five questions, no answers
1. A receiver clock jumps by 500 ns between two epochs. By how many metres does the instantaneous position solution shift if PDOP = 2.0?  
2. Four satellites lie at 5° elevation spaced 90° in azimuth. Compute the resulting VDOP analytically.  
3. After linearising around an initial guess 50 km away, the first correction leaves a 3 m residual. Should you iterate? Why?  
4. A fifth satellite at 10° elevation is added; the new PDOP drops from 3.2 to 1.9. Is the improvement mainly horizontal or vertical?  
5. You observe a 15 m jump in the reported position when one satellite sets below 15° elevation while all other measurements remain continuous. Which single number in the G matrix is most responsible?