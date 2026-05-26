## 1. The one-sentence answer
**An accelerometer in an inertial navigation system measures specific force, which is the net non-gravitational acceleration acting on the sensor mass.**

Iska matlab yeh hai ki accelerometer sirf un forces ko detect karta hai jo rocket ya vehicle ko push karte hain jaise thrust aur drag, lekin gravity ko directly nahi measure karta. Gravity ko alag se mathematical model mein account kiya jaata hai, warna position calculation galat ho jaayegi. Isliye inertial navigation mein accelerometer output ko gravity compensation ke saath integrate karna padta hai taaki true acceleration mile.

Aap soch sakte ho ki accelerometer ek spring-mass system hai jismein mass sirf tab move karta hai jab koi non-gravitational force lage. Free-fall mein accelerometer zero output deta hai kyunki dono mass aur housing ek saath accelerate kar rahe hote hain.

> [!NOTE]
> The key aha moment yeh hai ki gravity ek fictitious force nahi balki geometry hai — accelerometer isliye gravity ko ignore karta hai kyunki woh local inertial frame mein sirf real contact forces feel karta hai.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 uses strapdown inertial measurement units where accelerometers measure non-gravitational specific force during ascent; gravity is subtracted in the navigation computer so that the vehicle can compute its exact velocity vector for stage separation.

ISRO’s Chandrayaan-3 lander relied on the same principle in its inertial navigation system during the powered descent phase, allowing the onboard computer to distinguish between engine thrust and lunar gravity without external GPS.

Boeing 787 and Airbus A350 aircraft employ ring-laser gyro and accelerometer triads that feed specific-force data into the air-data inertial reference unit; this enables continuous attitude and position propagation even when GPS signals are jammed over conflict zones.

In quantum gravimetry research at NASA’s Cold Atom Lab on the ISS, scientists calibrate classical accelerometers against atom-interferometer readings to separate true non-gravitational disturbances from the known gravitational field, improving future deep-space navigation algorithms.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Specific force vector    | Accelerometer output is exactly this vector; you must separate it from gravitational acceleration. |
| Specific force integration | Velocity and position are obtained by successive integration of specific force after gravity compensation. |
| Local-level frame        | Gravity vector must be expressed in the navigation frame that rotates with Earth.       |
| Coriolis and transport rates | When integrating in a rotating frame these fictitious accelerations appear and must be corrected. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Distinguish contact force from gravity
Accelerometer ke andar mass sirf tab displace hota hai jab koi physical surface usse push kare; gravity dono mass aur housing ko equally affect karti hai, isliye relative displacement zero rehta hai. Concrete example: free-fall elevator mein accelerometer reading zero hoti hai. Formally, specific force \(\mathbf{f}\) define hoti hai as \(\mathbf{f} = \mathbf{a} - \mathbf{g}\), jahaan \(\mathbf{a}\) inertial acceleration aur \(\mathbf{g}\) gravitational acceleration hai.  
> [!WARNING] Agar aap \(\mathbf{f}\) ko directly \(\mathbf{a}\) samajh kar integrate karoge to gravity double-count ho jaayegi aur position drift exponential ban jaayegi.

### Step 2 — Sensor measures proper acceleration
Accelerometer ka output proper acceleration hota hai, jo Newtonian mechanics mein non-gravitational force per unit mass ke barabar hai. Example: surface par khada insaan 1 g upward specific force feel karta hai. Mathematically, \(\mathbf{f} = \frac{\mathbf{F}_\text{non-grav}}{m}\).  
> [!WARNING] “Proper acceleration” aur “coordinate acceleration” ko mix mat karna; inertial navigation equations mein sirf proper acceleration available hota hai.

### Step 3 — Gravity must be modelled separately
Navigation computer mein Earth gravity model (WGS84 ya EGM2008) se \(\mathbf{g}(\mathbf{r})\) calculate kiya jaata hai aur measured \(\mathbf{f}\) mein add kiya jaata hai taaki inertial acceleration \(\mathbf{a} = \mathbf{f} + \mathbf{g}\) mile.  
> [!WARNING] Gravity model error directly velocity error ban jaata hai kyunki integration amplifies bias.

### Step 4 — Rotate into navigation frame
Body-frame specific force ko direction cosine matrix \(C_b^n\) se navigation frame mein transform karna padta hai: \(\mathbf{f}^n = C_b^n \mathbf{f}^b\).  
> [!WARNING] Attitude error isliye critical hai kyunki galat rotation matrix gravity vector ko galat direction mein project kar deta hai.

### Step 5 — Integrate with Coriolis compensation
Navigation-frame velocity update equation hoti hai \(\dot{\mathbf{v}}^n = \mathbf{f}^n + \mathbf{g}^n - (2\boldsymbol{\omega}_{ie}^n +boldsymbol{\omega}_{en}^n)\times\mathbf{v}^n\). Last term Coriolis aur transport rate correction hai.  
> [!WARNING] Earth-rate term ko neglect karne se long-duration flights mein hundreds of metres ka error aa jaata hai.

## 5. Worked examples

**Example 1 — Stationary accelerometer on ground**  
*Given:* Accelerometer z-axis par 9.81 m/s² upward reading de raha hai, latitude 0°.  
*Find:* True inertial acceleration.  
Step 1: Measured \(\mathbf{f}^b = [0,0,9.81]^\top\).  
Step 2: Gravity \(\mathbf{g}^n = [0,0,-9.81]^\top\).  
Step 3: \(\mathbf{a}^n = \mathbf{f}^n + \mathbf{g}^n = 0\).  
*Why*: Gravity compensation se pata chalta hai vehicle inertial frame mein rest par hai.  
**Final answer**  
\(\mathbf{a}^n = \mathbf{0}\)

*Reflection*: Simple case shows that zero net acceleration only appears after explicit gravity subtraction.

**Example 2 — Rocket in vertical hover**  
*Given:* Thrust exactly balances weight, accelerometer reads +9.81 m/s².  
*Find:* Inertial acceleration.  
Step 1: \(\mathbf{f} = +9.81 \hat{k}\).  
Step 2: Add \(\mathbf{g} = -9.81 \hat{k}\).  
Step 3: Result \(\mathbf{a} = 0\).  
*Why*: Hover means velocity constant, acceleration zero.  
**Final answer**  
\(\mathbf{a} = \mathbf{0}\)

*Reflection*: Demonstrates that accelerometer reading equals weight even when vehicle is not moving inertially.

**Example 3 — Constant thrust vertical ascent**  
*Given:* Specific force reading 19.62 m/s² upward, ignore rotation.  
*Find:* Inertial acceleration after 5 s.  
Step 1: \(\mathbf{f} = 19.62 \hat{k}\).  
Step 2: \(\mathbf{a} = 19.62 - (-9.81) = 29.43\) m/s².  
Step 3: \(v = 29.43 \times 5 = 147.15\) m/s.  
*Why*: Gravity compensation doubles effective acceleration.  
**Final answer**  
\(v = 147.15\) m/s upward

*Reflection*: Linear integration shows how specific-force bias directly scales velocity error.

**Example 4 — Aircraft level turn with Coriolis**  
*Given:* Eastward velocity 200 m/s at 45° latitude, measured \(\mathbf{f}^n\) already gravity-compensated.  
*Find:* Additional acceleration term.  
Step 1: \(2\boldsymbol{\omega}_{ie} \times \mathbf{v}\) magnitude calculate karo.  
Step 2: Term value \(2 \times 7.292 \times 10^{-5} \times 200 \times \sin 45^\circ \approx 0.0206\) m/s².  
*Why*: Rotating-frame correction must be subtracted before integration.  
**Final answer**  
Coriolis acceleration magnitude 0.0206 m/s² northward

*Reflection*: Shows that even small angular-rate terms become important at aircraft speeds over long times.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Treating accelerometer output as inertial acceleration | Students forget gravity compensation                | Always write \(\mathbf{a} = \mathbf{f} + \mathbf{g}\) explicitly |
| Ignoring attitude error propagation | Small tilt misaligns gravity vector                 | Run covariance analysis on attitude before integration |
| Using scalar g everywhere         | Latitude and altitude variation ignored             | Implement WGS84 or spherical harmonic model          |
| Forgetting Coriolis in velocity integration | Rotating Earth frame not considered                 | Include full \(\boldsymbol{\omega}_{ie}\) cross-product term |
| Double integration without bias estimation | Accelerometer bias grows quadratically              | Run Kalman filter that estimates bias states         |
| Assuming sensor frame = navigation frame | Strapdown mounting ignored                          | Maintain real-time DCM or quaternion propagation     |

## 7. The textbook-precise statement
In the inertial navigation mechanisation equations the accelerometer triad measures the specific-force vector \(\mathbf{f}^b\) in the body frame. The navigation-frame velocity derivative is given by  
$$\dot{\mathbf{v}}^n = C_b^n\mathbf{f}^b + \mathbf{g}^n - (2\boldsymbol{\omega}_{ie}^n + \boldsymbol{\omega}_{en}^n)\times\mathbf{v}^n,$$  
where \(C_b^n\) is the direction-cosine matrix, \(\mathbf{g}^n\) is the plumb-bob gravity, and the angular-rate terms account for Earth rotation and transport rate (Savage, *Strapdown Analytics*, 2e, §4.3).

## 8. Visual — diagram or schematic
```
Body frame (b)          Navigation frame (n)
   ^ z_b                     ^ z_n (up)
   |                         |
   |  f^b (measured)         |  f^n = C_b^n f^b
   |                         |
   o------> y_b              o------> y_n (east)
  /                         /
 x_b                       x_n (north)
Gravity vector g^n points down (–z_n)
Accelerometer feels only contact force; g added mathematically
```

## 9. The memory technique
1. **The hook** — Imagine an accelerometer as a tiny “push detector” inside your rocket; gravity is invisible to it because everything falls together, like a magic elevator that never shows weight.
2. **What to overlearn** — Equation \(\mathbf{a} = \mathbf{f} + \mathbf{g}\); definition that \(\mathbf{f}\) is proper acceleration; necessity of the Coriolis term.
3. **Spaced-repetition schedule** — Review the core equation after 1 day, 3 days, 7 days, 16 days and 35 days with one numerical example each time.
4. **First-principles fallback** — Start from Newton’s second law in an inertial frame, subtract gravitational acceleration, and rotate the resulting specific force into the navigation frame.

## 10. What this unlocks
Mastering this distinction lets you derive full strapdown inertial navigation equations, implement gravity and Coriolis compensation, and design Kalman-filter sensor-fusion algorithms that blend IMU data with GPS or star trackers.

- Next topics: gyroscopic precession and attitude propagation
- Schuler tuning and bounded inertial errors
- Multi-sensor fusion with GNSS and magnetometers

## 11. Self-check — five questions, no answers
1. An accelerometer sits on a table at rest. What is its specific-force reading and what is its inertial acceleration?
2. During a perfect free-fall trajectory, what value does a three-axis accelerometer report?
3. Derive the velocity-update equation in the navigation frame including the transport-rate term.
4. A 0.1° attitude error exists at the equator. After 60 s of integration, estimate the horizontal position error caused by gravity mis-projection.
5. Why does neglecting the Coriolis term produce a velocity error that grows linearly with time rather than quadratically?