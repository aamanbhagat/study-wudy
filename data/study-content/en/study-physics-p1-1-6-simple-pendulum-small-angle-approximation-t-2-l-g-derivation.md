## 1. The one-sentence answer
**A simple pendulum executes simple harmonic motion for small angular displacements because the restoring torque is linearly proportional to angle, yielding the exact period \(T = 2\pi\sqrt{L/g}\).**

The pendulum bob moves under gravity along a circular arc. The component of gravitational force tangent to the path always points toward the lowest point. For tiny swings this tangential force grows exactly in proportion to the angular displacement itself, just as a linear spring force grows in proportion to stretch.

Because the force law is linear, the resulting differential equation is identical to that of any other simple harmonic oscillator. Its solutions are pure sine and cosine functions whose single frequency depends only on length and local gravity.

> [!NOTE]
> The period is independent of both mass and amplitude precisely because the small-angle force law is linear; any deviation from linearity immediately couples amplitude into the period.

## 2. Why this matters — concrete and current
Seismometers deployed by NASA’s InSight lander on Mars use a pendulum whose period is tuned near 1 s to detect marsquakes; the same small-angle derivation converts raw voltage traces into ground acceleration.

Atomic interferometers aboard sounding rockets launched by the German DLR employ laser-cooled atoms as ultra-precise pendulums to measure the gravitational constant \(G\) during 6 minutes of free fall, reaching uncertainties below \(10^{-5}\).

Smart-phone MEMS accelerometers contain silicon proof-mass cantilevers whose dynamics reduce to an equivalent simple pendulum at low frequencies; Apple’s Core Motion framework applies the \(2\pi\sqrt{L/g}\) relation to convert raw capacitance data into tilt angles for ARKit.

Kibble balances at NIST and NPL now realize the kilogram from Planck’s constant; their oscillating modes are calibrated against the same small-angle pendulum period to correct for local gravity variations at the 10 nGal level.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Newton’s second law for rotation | Supplies \(\tau = I\alpha\) that becomes the equation of motion |
| Definition of torque     | Expresses the gravitational restoring force as \(-mgL\sin\theta\) |
| Small-angle limit        | Converts \(\sin\theta\) into \(\theta\) (in radians) to obtain linearity |
| Linear differential equations | Recognizes \(\ddot\theta + (g/L)\theta = 0\) as SHM       |

## 4. Building the idea — from intuition to formalism

### Step 1 — Draw the geometry and identify the lever arm
Gravity pulls straight down on the bob; only the component perpendicular to the string produces torque. The perpendicular distance from the pivot line to the force vector is \(L\sin\theta\).

For a 30 cm string displaced by 5°, the lever arm is approximately 2.6 cm; doubling the angle roughly doubles the lever arm while the force magnitude stays constant.

The exact torque is therefore
\[
\tau = -mgL\sin\theta.
\]

> [!WARNING]
> Measuring the lever arm from the vertical rather than from the string itself inverts the sign and produces an unstable instead of restoring torque.

### Step 2 — Write the rotational equation of motion
Newton’s second law for rotation states \(\tau = I\alpha\). The moment of inertia of a point mass at distance \(L\) is \(I = mL^2\), and \(\alpha = \ddot\theta\).

Substituting the torque expression yields the exact nonlinear equation
\[
mL^2\ddot\theta = -mgL\sin\theta.
\]

### Step 3 — Apply the small-angle approximation
For \(\theta\) measured in radians and \(|\theta|\lesssim0.2\) rad, \(\sin\theta\approx\theta\). The approximation error is less than 0.7 % at 10°.

The equation collapses to the linear form
\[
\ddot\theta + \frac{g}{L}\theta = 0.
\]

> [!WARNING]
> Using degrees inside the differential equation produces a numerically wrong coefficient; the derivative of \(\sin\theta\) is taken with respect to radians.

### Step 4 — Recognize simple harmonic motion
The standard SHM equation is \(\ddot x + \omega^2 x = 0\). Comparing coefficients immediately identifies the angular frequency
\[
\omega = \sqrt{\frac{g}{L}}.
\]

### Step 5 — Extract the period
The period of oscillation is \(T = 2\pi/\omega\), giving the textbook result
\[
T = 2\pi\sqrt{\frac{L}{g}}.
\]

## 5. Worked examples — every step shown

**Example 1 — 50 cm pendulum on Earth**  
*Given:* \(L = 0.50\) m, \(g = 9.81\) m s\(^{-2}\).  
*Find:* \(T\).  
Divide \(L\) by \(g\):
\[
\frac{L}{g} = 0.05097\,\text{s}^2.
\]
Take the square root:
\[
\sqrt{\frac{L}{g}} = 0.2258\,\text{s}.
\]
Multiply by \(2\pi\):
\[
T = 2\pi\times0.2258 = 1.418\,\text{s}.
\]
**1.418 s**

*Reflection:* The arithmetic is direct once units are consistent; the same steps scale to any planet by swapping \(g\).

**Example 2 — Effect of length change**  
*Given:* Original \(T = 2.00\) s on Earth. New length is 10 % longer.  
*Find:* New period.  
Because \(T\propto\sqrt{L}\),
\[
T' = T\sqrt{1.10} = 2.00\times1.0488 = 2.098\,\text{s}.
\]
**2.098 s**

*Reflection:* A 10 % length error produces only a 5 % period error, illustrating the square-root dependence.

**Example 3 — Small-angle validity check**  
*Given:* \(\theta_0 = 15^\circ = 0.262\) rad. Compare \(\sin\theta\) and \(\theta\).  
\(\sin(0.262) = 0.259\); relative error = 1.1 %.  
Period shift remains below 0.3 % for most laboratory work.

*Reflection:* The 1 % threshold is crossed near 12°, a useful practical limit.

**Example 4 — Derive period from energy**  
Start with conservation of mechanical energy and differentiate twice to recover the same differential equation, confirming the result is independent of the Newtonian or Lagrangian route.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using \(\sin\theta\approx\theta\) in degrees | Calculator or code left in degree mode      | Always convert to radians before the approximation |
| Forgetting the negative sign in torque | Intuitive picture omits direction           | Explicitly label restoring torque as negative |
| Treating period as amplitude-dependent | Confusion with large-amplitude pendulums    | Verify \(\theta_0<10^\circ\) before quoting \(T=2\pi\sqrt{L/g}\) |
| Confusing \(L\) with string length only | Support has finite size                     | Measure distance from pivot point to center of mass |
| Applying formula on accelerating frames | Elevator or rocket changes effective \(g\)  | Replace \(g\) by \(g_\text{eff}\) measured locally |
| Numerical differentiation of noisy data | Sensor output differentiated twice          | Integrate the SHM equation instead           |
| Mixing \(T\) and \(\tau\) symbols | Torque and period share conventional letter | Use \(\tau\) exclusively for torque          |

## 7. The textbook-precise statement
For a point mass \(m\) suspended by a massless inextensible string of length \(L\) from a fixed pivot, executing planar motion under constant gravitational acceleration \(g\), the angular displacement \(\theta(t)\) from the vertical satisfies
\[
\ddot\theta + \frac{g}{L}\theta = 0
\]
provided \(|\theta|\) remains sufficiently small that \(\sin\theta = \theta + O(\theta^3)\). The general solution is \(\theta(t) = A\cos(\omega t + \phi)\) with \(\omega = \sqrt{g/L}\), hence the period of small oscillations is exactly
\[
T = 2\pi\sqrt{\frac{L}{g}}.
\]
(See Taylor, *Classical Mechanics*, 2005, §5.3.)

## 8. Visual — diagram or schematic
```text
Pivot (fixed)
   |
   | L
   |
   ● bob (mass m)
    \
     \ θ
      \
       g (downward)
```
Horizontal line through pivot is reference; \(\theta\) measured from downward vertical; arc shows small angular displacement.

## 9. The memory technique

**The hook**  
Picture a grandfather clock whose 2 s “tick-tock” is produced by a 1 m pendulum; every time you see a long-case clock you instantly recall \(T=2\pi\sqrt{L/g}\).

**What to overlearn**  
- \(\sin\theta\approx\theta\) (rad) for \(\theta\lesssim0.2\)  
- \(\omega=\sqrt{g/L}\)  
- \(T=2\pi\sqrt{L/g}\)

**Spaced-repetition schedule**  
Review the derivation at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive from \(\tau=-mgL\sin\theta\) and \(I=mL^2\), insert small-angle step, read off \(\omega\).

## 10. What this unlocks
The identical linearization procedure appears in every subsequent oscillatory system.  
- Physical pendulum and compound pendulum periods  
- Torsional oscillations and moment-of-inertia measurements  
- Normal modes of coupled pendulums and introductory wave equations  
- Linearized orbital mechanics (small radial oscillations about circular orbits)  
- Control-theory transfer functions for inverted-pendulum stabilizers used in rocket attitude control

## 11. Self-check — five questions, no answers
1. A 40 cm pendulum on the Moon (\(g=1.62\) m s\(^{-2}\)) is displaced by 4°. Compute its period to three significant figures.  
2. If the measured period is 1 % longer than predicted by \(2\pi\sqrt{L/g}\), what is the most likely systematic error in the length measurement?  
3. Show that the fractional error in period caused by using \(\sin\theta\approx\theta\) is of order \(\theta_0^2/6\).  
4. A simple pendulum clock calibrated at sea level is taken to the top of a mountain where \(g\) is 0.3 % smaller. Does it run fast or slow, and by how many seconds per day?  
5. Derive the exact first-order correction to the period for finite amplitude using the next term in the Taylor series of \(\sin\theta\).