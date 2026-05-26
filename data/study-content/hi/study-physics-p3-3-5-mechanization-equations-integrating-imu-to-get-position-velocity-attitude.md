## 1. The one-sentence answer
**Mechanization equations convert raw IMU measurements (specific force and angular rate) into navigation-frame position, velocity, and attitude by successive integration with gravity, Coriolis, and frame-rotation corrections.**

An IMU only senses acceleration relative to an inertial frame and rotation about its own axes. To obtain usable navigation quantities you must rotate the accelerometer readings into a chosen navigation frame (NED or ECEF), subtract gravity and fictitious accelerations, then integrate once for velocity and again for position while simultaneously integrating gyroscope data to keep the rotation matrix or quaternion updated.

The entire process is a set of coupled differential equations solved at high rate (typically 100–1000 Hz) inside the navigation computer; any small error in attitude immediately corrupts the gravity compensation and therefore velocity and position.

> [!NOTE]
> The single deepest insight is that attitude is not measured directly; it is obtained by integrating angular velocity, so attitude error grows cubically with time unless external aiding (GPS, star tracker, etc.) is fused.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 and Starship flight computers run strapdown mechanization at 1 kHz on their IMUs; any drift in the quaternion integration forces the vehicle to rely on GPS updates or else the landing burn misses the pad by kilometres.

ISRO’s Chandrayaan-3 lander used the same equations inside its inertial navigation system to propagate position and attitude during the 25-minute powered descent when Earth-based tracking was unavailable.

Modern automotive-grade IMUs in Bosch and Continental dead-reckoning modules integrate these equations at 400 Hz to keep lane-level position for 30–60 s when GNSS is lost inside tunnels or urban canyons.

Northrop Grumman’s LN-251 and Honeywell’s H-764G airborne INS units implement ECEF mechanization equations; their 0.8 nautical-mile-per-hour drift specification is derived directly from the residual gyro bias after the attitude integration step.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Direction cosine matrix / quaternion | Attitude propagation requires a singularity-free rotation representation |
| Specific force vs. acceleration | Accelerometers measure f = a – g; you must add gravity back |
| Coriolis and transport-rate terms | Velocity integration occurs in a rotating frame (Earth or navigation frame) |
| Numerical integration (Euler, RK4, coning-sculling) | IMU data arrive at discrete high rate; you must preserve accuracy over long periods |
| Reference-frame transformations | Body → navigation → ECEF conversions appear in every equation |

If any row above is unfamiliar, pause and study that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Raw IMU outputs
An IMU gives two vectors at each time step: specific force \(f^b\) measured in the body frame and angular rate \(\omega^b_{ib}\) also in the body frame. These are the only direct measurements; everything else is computed.

Example: a stationary IMU on a lab bench reads \(f^b \approx [0,0,-9.81]^\top\) m/s² and \(\omega^b_{ib} \approx [0,0,0]^\top\) rad/s.

Formal statement:  
$$f^b = C^n_b (a^n - g^n) + \text{bias + noise}, \quad \omega^b_{ib} = \omega^b_{in} + \omega^n_{ie} + \text{bias + noise}.$$

> [!WARNING]
> Treating \(f^b\) as true acceleration without rotating it and adding gravity will produce a position that accelerates downward at 9.81 m/s² within seconds.

### Step 2 — Attitude propagation
You integrate the gyroscope measurements to obtain the attitude matrix \(C^n_b\) or quaternion \(q^n_b\).

The differential equation is  
$$\dot{C}^n_b = C^n_b [\omega^b_{ib} \times] - [\omega^n_{in} \times] C^n_b.$$

A simple Euler step over interval \(\Delta t\) is  
$$C^n_b(t+\Delta t) \approx C^n_b(t) \bigl(I + [\omega^b_{ib}\Delta t \times]\bigr) - [\omega^n_{in}\Delta t \times] C^n_b(t).$$

> [!WARNING]
> Ignoring the transport-rate term \(\omega^n_{in}\) on a moving vehicle (aircraft, missile) produces attitude drift that grows linearly with velocity.

### Step 3 — Specific-force resolution
Rotate the measured specific force into the navigation frame:  
$$f^n = C^n_b f^b.$$

This vector now lies in the same frame where gravity and Coriolis are expressed.

### Step 4 — Velocity mechanization
The navigation-frame velocity derivative is  
$$\dot{v}^n = f^n + g^n - (2\omega^n_{ie} + \omega^n_{en}) \times v^n.$$

The term in parentheses is the sum of Earth rotation and transport rate; omitting it on long-range flights produces tens of metres per second of velocity error.

### Step 5 — Position mechanization
Position (or latitude/longitude/height) is obtained by integrating velocity, with additional curvature terms when using curvilinear coordinates:  
$$\dot{r}^n = v^n, \quad \dot{L} = \frac{v_E}{(R+h)\cos L}, \quad \dot{h} = -v_D.$$

### Step 6 — Full closed set
The six coupled equations above (attitude, velocity, position) constitute the mechanization equations solved at every IMU epoch.

## 5. Worked examples — har step show karo

**Example 1 — Stationary IMU at known latitude**  
*Given:* IMU at rest on Earth at 45° N, perfect sensors, \(\omega^b_{ib}=0\), \(f^b=[0,0,-9.81]^\top\).  
*Find:* velocity after 10 s.  
Step 1: \(C^n_b = I\), so \(f^n = [0,0,-9.81]^\top\).  
Step 2: \(\omega^n_{ie} = [0,\Omega\cos L,\Omega\sin L]^\top\).  
Step 3: \(\dot{v}^n = f^n + g^n - 2\omega^n_{ie}\times v^n\). At rest \(v=0\), \(g^n = [0,0,9.81]^\top\), therefore \(\dot{v}^n=0\).  
**Final answer: velocity remains zero.**  
*Reflection:* Gravity cancellation is exact only when attitude and gravity model are perfect.

**Example 2 — Constant body-rate rotation**  
*Given:* \(\omega^b_{ib}=[0,0,0.1]^\top\) rad/s, initial \(C^n_b=I\).  
*Find:* \(C^n_b\) after 1 s using Euler integration.  
\(C^n_b(1) \approx I + [0.1\Delta t \times] = \begin{bmatrix}1&-0.1&0\\0.1&1&0\\0&0&1\end{bmatrix}\).  
**Final answer:** rotation matrix above.  
*Reflection:* Small-angle approximation holds only for short \(\Delta t\); larger intervals require quaternion or Runge–Kutta.

**Example 3 — Level flight with constant acceleration**  
*Given:* aircraft flying north at 100 m/s, IMU reads \(f^b=[0,1,0]^\top\) m/s² after rotation.  
*Find:* north velocity after 60 s including Coriolis.  
Without Coriolis: \(v_N=160\) m/s.  
With \(2\Omega\sin L \approx 1.03\times10^{-4}\) rad/s the east Coriolis term deflects velocity by ~6 m/s east.  
**Final answer: 160 m/s north, –6 m/s east.**  
*Reflection:* Even modest speeds produce measurable Coriolis deflection after one minute.

**Example 4 — 10-second free fall with attitude drift**  
*Given:* 1° attitude error after 10 s, perfect accelerometers.  
*Find:* position error.  
1° tilt mis-resolves 0.17 m/s² of gravity into horizontal channel. Double integration yields 8.7 m horizontal error.  
**Final answer: ~8.7 m position error.**  
*Reflection:* Attitude error is the dominant source of position error growth (Schuler tuning mitigates but does not eliminate it).

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Treating accelerometer output as inertial acceleration | Forgetting to add gravity back              | Always resolve \(f^n + g^n\) before integration      |
| Using Euler angles for long-duration propagation | Gimbal lock at 90° pitch                    | Switch to quaternion or DCM mechanization            |
| Ignoring Earth-rate in velocity equation | Underestimating \(\Omega \approx 15^\circ\)/h | Include \(2\omega^n_{ie}\times v^n\) term            |
| Single-precision floating-point accumulation | Round-off after 10⁵ integrations            | Use double precision or compensated summation        |
| Large \(\Delta t\) without coning/sculling compensation | High-frequency vibration aliases into bias  | Implement coning/sculling corrections or run at ≥200 Hz |
| Latitude singularity at poles     | Division by \(\cos L\) in longitude rate    | Switch to ECEF Cartesian mechanization near poles    |

## 7. The textbook-precise statement
The strapdown inertial navigation mechanization equations in the local-level north-east-down frame are given by  
$$\dot{C}^n_b = C^n_b[\omega^b_{ib}\times]-[\omega^n_{in}\times]C^n_b,$$  
$$\dot{v}^n = C^n_b f^b + g^n - (2\omega^n_{ie}+\omega^n_{en})\times v^n,$$  
$$\dot{r}^n = v^n,$$  
where \(\omega^n_{in}=\omega^n_{ie}+\omega^n_{en}\) and all vectors are expressed in the navigation frame (Farrell, *Aided Navigation: GPS with High Rate Sensors*, 2008, §5.3).

## 8. Visual — diagram or schematic
```
Body frame (b)          Navigation frame (n)
   z^b (up)                 N (north)
    ^                        ^
    |                        |
    | y^b (right)            | E (east)
    | /                      | /
    |/                       |/
    +----> x^b (forward)     +----> D (down)
```
Arrows show the direction-cosine matrix \(C^n_b\) that continuously rotates the body axes onto the navigation axes while the vehicle moves.

## 9. The memory technique

1. **The hook** — Imagine the IMU as a blindfolded person inside a spinning box; the gyros tell how fast the box spins, the accelerometers tell which way gravity is pulling relative to the box walls; your job is to keep redrawing the box’s orientation on a map every millisecond.
2. **What to overlearn** — The exact form of the velocity equation \(\dot{v}^n = f^n + g^n - (2\omega_{ie}^n + \omega_{en}^n)\times v^n\) and the fact that attitude error grows as \(t^3\) in unaided INS.
3. **Spaced-repetition schedule** — Review the six coupled equations after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Start from Newton’s second law in an inertial frame, transform all vectors into the navigation frame using the chain rule for rotating frames, then discretise.

## 10. What this unlocks
Once you can integrate an IMU you can fuse it with GNSS, barometers, or star trackers inside an extended Kalman filter; the same mechanization equations become the process model for tightly-coupled or loosely-coupled INS/GNSS architectures used in every modern aircraft and spacecraft.

- Next topics: Schuler tuning, error-state Kalman filter for INS/GNSS, coning/sculling compensation algorithms.

## 11. Self-check — five questions, no answers
1. Derive the transport-rate term \(\omega^n_{en}\) from the curvature of the Earth for an east velocity \(v_E\).
2. A 0.01°/h gyro bias exists; after 1 hour what is the approximate tilt error and the resulting position error growth?
3. Write the quaternion kinematic equation equivalent to the DCM equation in Step 2.
4. Why does a 1° attitude error produce a position error that grows as \(t^3\) rather than \(t^2\)?
5. In ECEF mechanization, which fictitious accelerations disappear and which remain?