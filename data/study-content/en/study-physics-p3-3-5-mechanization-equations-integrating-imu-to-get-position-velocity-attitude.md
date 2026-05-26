## 1. The one-sentence answer
**Mechanization equations are the coupled first-order differential equations that integrate an inertial measurement unit’s specific-force vector and angular-rate vector to produce time histories of position, velocity, and attitude expressed in a chosen navigation reference frame.**

Raw accelerometer readings supply specific force (acceleration minus gravity) while gyroscopes supply angular velocity; both are body-frame quantities. Without transformation into a stable frame and explicit compensation for gravity, Coriolis acceleration, and Earth-rate transport, the integrals diverge rapidly from true motion. The mechanization set therefore consists of three vector equations—one each for attitude quaternion (or direction-cosine matrix) propagation, velocity update, and position update—linked through the instantaneous attitude solution.

The attitude equation rotates the body-to-navigation transformation matrix at the measured angular rate corrected by navigation-frame transport rate. The velocity equation integrates the rotated specific force, subtracts gravity and Coriolis terms, and yields velocity in the navigation frame. The position equation integrates that velocity, usually in curvilinear coordinates when the navigation frame is Earth-fixed.

> [!NOTE]
> The decisive insight is that an IMU never measures position or velocity directly; every navigation quantity is obtained by integrating noisy, rotating-frame measurements that must be continuously corrected by the very quantities being computed.

## 2. Why this matters — concrete and current
SpaceX recovers Falcon 9 first stages using a tightly coupled INS/GPS solution whose core is a strapdown mechanization running at 1 kHz on flight computers; any undetected integration error forces an abort.  
NASA’s Orion spacecraft employs the same mechanization equations inside its redundant inertial navigation units during the high-speed atmospheric entry blackout when GPS is unavailable.  
DJI’s Avata cine-whoop drones run a lightweight version of these equations at 8 kHz to maintain attitude when vision positioning is lost inside buildings or under bridges.  
Autonomous underwater vehicles such as WHOI’s Sentry AUV rely on unaided mechanization for tens of minutes between acoustic fixes, making precise Coriolis and gravity modeling essential for meter-level bathymetric mapping.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector differentiation in rotating frames | Attitude and velocity equations contain cross-product transport terms that arise only in non-inertial frames |
| Direction-cosine matrix or quaternion kinematics | Converts body-frame measurements into the navigation frame and must itself be integrated |
| Specific force versus acceleration | Accelerometers measure f = a − g; gravity must be modeled separately |
| Earth-rate and transport-rate vectors | Required to keep the navigation frame locally level as the vehicle moves over a rotating Earth |

## 4. Building the idea — from intuition to formalism

### Step 1 — Raw IMU outputs live in the body frame
An accelerometer triad measures the non-gravitational force per unit mass along three orthogonal axes fixed to the vehicle; a gyroscope triad measures the vehicle’s angular velocity relative to inertial space, also in body axes. These six scalars are the only measurements available.

Example: a stationary IMU on a launch pad reads f^b = [0,0,−g]ᵀ and ω^b = [0,0,0]ᵀ.

Formally,
$$
\mathbf{f}^b = C_n^b (\mathbf{a}^n - \mathbf{g}^n), \qquad \boldsymbol{\omega}^b_{ib} = \text{measured}.
$$

> [!WARNING]
> Treating f^b directly as inertial acceleration without rotating it produces a velocity vector that points in the wrong direction the instant the vehicle pitches or rolls.

### Step 2 — Propagate attitude to maintain the transformation matrix
The body-to-navigation direction-cosine matrix C_b^n changes at a rate set by the relative angular velocity between the two frames.

The kinematic equation is
$$
\dot{C}_b^n = C_b^n [\boldsymbol{\omega}^n_{nb} \times],
$$
where ω^n_nb = ω^n_ib − ω^n_ie − ω^n_en and the last two terms are Earth rate and transport rate.

### Step 3 — Resolve specific force into the navigation frame
Multiply the body specific-force vector by the current C_b^n:
$$
\mathbf{f}^n = C_b^n \mathbf{f}^b.
$$
This vector now lies along north-east-down (or ECEF) axes and can be compared with gravity models.

### Step 4 — Form the velocity differential equation
Newton’s second law written in the rotating navigation frame yields
$$
\dot{\mathbf{v}}^n = \mathbf{f}^n + \mathbf{g}^n - (2\boldsymbol{\omega}^n_{ie} + \boldsymbol{\omega}^n_{en}) \times \mathbf{v}^n.
$$
The cross-product terms are Coriolis and transport-rate corrections.

### Step 5 — Integrate velocity to position
In a local-level north-east-down frame,
$$
\dot{L} = \frac{v_N}{R_M + h}, \quad \dot{\ell} = \frac{v_E}{(R_N + h)\cos L}, \quad \dot{h} = -v_D,
$$
where L, ℓ, h are latitude, longitude, and height, and R_M, R_N are meridional and transverse radii of curvature.

### Step 6 — Close the mechanization loop
The attitude matrix from Step 2 is used in Step 3; the velocity from Step 4 is used to compute transport rate in Step 2; the position from Step 5 updates gravity and Earth-rate vectors. The three equations must therefore be solved simultaneously at each time step.

## 5. Worked examples — every step shown

**Example 1 — Stationary IMU at the equator**  
*Given:* f^b = [0,0,−g]ᵀ, ω^b = [0,0,Ω]ᵀ, initial C_b^n = I, v^n = 0.  
*Find:* velocity after 10 s with no motion.  
Step 1: ω^n_ie = [Ω,0,0]ᵀ (north).  
Step 2: transport rate = 0 because v = 0.  
Step 3: f^n = [0,0,−g]ᵀ.  
Step 4: \dot v^n = f^n + g^n − 2Ω × v = 0 (gravity cancels f).  
Final velocity remains zero.  
**Answer:** v^n(t) = [0,0,0]ᵀ.  
*Reflection:* The cancellation of gravity and specific force is the first sanity check any mechanization must pass.

**Example 2 — Constant north acceleration, level flight**  
*Given:* f^b = [0,0,−g]ᵀ rotated by a 90° yaw so that after C_b^n the north component is 1 m s⁻².  
*Find:* v_N after 5 s.  
Integration of \dot v_N = f_N gives v_N = 5 m s⁻¹.  
**Answer:** v_N = 5 m s⁻¹.  
*Reflection:* Without Coriolis the velocity grows exactly as expected; the next example adds Earth rotation.

**Example 3 — Eastward velocity at 45° latitude**  
*Given:* v_E = 100 m s⁻¹, L = 45°.  
*Find:* Coriolis acceleration in the vertical channel.  
2Ω × v term produces a downward acceleration of 2Ω v_E cos L ≈ 0.0103 m s⁻².  
**Answer:** a_D = −0.0103 m s⁻².  
*Reflection:* Even modest speeds generate measurable vertical Coriolis that must be integrated or the altitude will drift.

**Example 4 — Full 3-D mechanization step at 100 Hz**  
*Given:* current C_b^n, f^b, ω^b, v^n, L, h.  
Compute ω^n_nb, integrate quaternion or DCM one step, resolve f^n, apply gravity and Coriolis, integrate v^n, integrate curvilinear position.  
**Answer:** updated C_b^n, v^n, (L,ℓ,h) after Δt = 0.01 s.  
*Reflection:* All three vector equations are coupled through the attitude matrix; a single matrix multiply error corrupts every channel.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting transport rate         | Velocity appears in the rotating-frame derivative   | Always recompute ω_en from current v and position    |
| Using inertial gravity instead of local plumb-bob gravity | Mechanization frame is not inertial                 | Use Somigliana formula or EGM model referenced to navigation frame |
| Integrating Euler angles directly | Gimbal-lock singularity at 90° pitch                | Use quaternions or DCM throughout                    |
| Neglecting Earth-rate compensation in attitude | Gyro measures ω_ib; navigation frame needs ω_in     | Subtract ω_ie + ω_en before integrating attitude     |
| Double-counting gravity           | Treating accelerometer output as true acceleration  | Explicitly add modeled g^n after rotating f^b        |
| Coarse alignment error at start   | Initial C_b^n wrong by a few degrees                | Perform fine leveling or transfer alignment first    |
| Time-step mismatch between attitude and velocity loops | Attitude must be faster to keep rotation accurate   | Run attitude at IMU rate; velocity at half rate or lower |

## 7. The textbook-precise statement
The strapdown inertial navigation mechanization equations in the north-east-down frame are
$$
\dot{C}_b^n = C_b^n[\boldsymbol{\omega}^n_{nb}\times],\qquad
\dot{\mathbf{v}}^n = C_b^n\mathbf{f}^b + \mathbf{g}^n - (2\boldsymbol{\omega}^n_{ie}+\boldsymbol{\omega}^n_{en})\times\mathbf{v}^n,
$$
$$
\dot{L}=\frac{v_N}{R_M+h},\quad\dot{\ell}=\frac{v_E}{(R_N+h)\cos L},\quad\dot{h}=-v_D,
$$
with ω^n_nb = C_b^n ω^b_ib − ω^n_ie − ω^n_en. All vectors are expressed at the same instant; gravity g^n is the local plumb-bob gravity. (Titterton & Weston, *Strapdown Inertial Navigation Technology*, 2nd ed., §3.3.)

## 8. Visual — diagram or schematic
```text
Body frame (b) ──C_b^n──▶ Navigation frame (n)
       │                       │
       │ f^b, ω^b              │ f^n, v^n
       ▼                       ▼
   Accelerometers          Velocity integrator
       │                       │
       │                       │ +g^n −(2ω_ie+ω_en)×v
       │                       ▼
       │                  Position integrator
       │                       │
       └───────────◀───────────┘  (attitude feedback)
```
The loop shows that attitude matrix C_b^n is both output and necessary input to every other integration.

## 9. The memory technique
**The hook** — Picture the IMU as a blindfolded navigator inside a spinning box; the mechanization equations are the set of instructions that translate every shove felt on the box walls into steps on an Earth globe while the box itself is turning.

**What to overlearn** — The three core differential equations above and the definition ω^n_nb = C_b^n ω^b − ω_ie^n − ω_en^n.

**Spaced-repetition schedule** — Review the equations at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

**First-principles fallback** — Start from the general vector derivative formula (d/dt)_n = (d/dt)_b − ω_nb ×, apply it to velocity, insert the accelerometer definition of specific force, and the mechanization set reappears.

## 10. What this unlocks
Mastery of mechanization supplies the deterministic propagation model required by every subsequent navigation filter.  
- Extended or unscented Kalman filters that blend IMU with GPS, baro, or star-tracker measurements  
- Error-state INS/GNSS loosely or tightly coupled architectures  
- Inertial aiding of GNSS carrier-phase tracking loops during scintillation  
- Multi-IMU fault detection and isolation via parity equations derived from the same mechanization

## 11. Self-check — five questions, no answers
1. Write the velocity mechanization equation in the ECEF frame and identify the additional centrifugal term.  
2. An IMU is rotated 180° about its yaw axis in 0.1 s while sitting on the lab bench. What is the integrated attitude change if transport rate is neglected?  
3. Show that a constant eastward velocity produces a vertical Coriolis acceleration proportional to cos L.  
4. Why must the attitude integration rate be at least twice the velocity integration rate in a typical strapdown system?  
5. A mechanization initialized with a 0.1° tilt error is flown due north for 10 min at 200 m s⁻¹. Qualitatively describe the dominant velocity and position error signatures that appear.