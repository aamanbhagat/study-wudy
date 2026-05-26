## 1. The one-sentence answer
**Reaction wheels store and exchange angular momentum with the spacecraft body to enable precise three-axis attitude control without expending propellant, but they require active momentum management because wheel speeds must periodically cross zero, where stiction and bearing disturbances create unwanted torque spikes.**

Aap spacecraft ko rotate karna chahte ho bina fuel waste kiye. Reaction wheel ek flywheel hota hai jo motor se speed badalta hai; jab wheel angular momentum gain karta hai, body opposite direction mein rotate hoti hai taaki total momentum zero rahe. Yeh technique bahut clean hai lekin wheel ki speed zero ke paas pahunchti hai to bearing friction suddenly change hota hai aur control loop mein disturbance aa jaati hai.

Zero-crossing management isliye zaroori hai kyunki ek baar wheel speed zero cross kar jaaye, uske baad wapas accelerate karne mein ek chhota sa torque glitch hota hai jo pointing accuracy ko kharab kar sakta hai. Isliye mission designers wheel momentum ko thrusters ya magnetorquers se periodically “dump” karte hain taaki zero-crossing ko avoid ya carefully handle kiya ja sake.

> [!NOTE]
> The real insight is that reaction wheels do not create net torque on the spacecraft; they only redistribute existing momentum. Zero-crossing is therefore not a momentum problem but a hardware nonlinearity problem that appears exactly when the actuator is asked to reverse direction.

## 2. Why this matters — concrete and current
NASA’s Kepler spacecraft lost two reaction wheels in 2013; the zero-speed stiction events and subsequent bearing degradation forced the mission into two-wheel K2 mode, showing how a single zero-crossing failure can end prime science operations.

SpaceX’s Starlink satellites use four reaction wheels per satellite with active momentum desaturation via differential drag and occasional ion-thruster dumps; zero-crossing avoidance algorithms are part of the onboard GNC flight software that keeps the constellation’s attitude stable during station-keeping burns.

ESA’s Gaia astrometry mission maintains micro-arcsecond pointing by keeping its reaction wheels away from zero speed for weeks at a time; any unplanned zero-crossing would smear the focal-plane images and corrupt the billion-star catalogue.

ISRO’s Astrosat and upcoming XPoSat both employ momentum-bias wheels whose zero-crossing behaviour was characterised on ground spin rigs; flight data showed that crossing at rates below 5 rpm produced torque spikes large enough to excite the 0.8 Hz structural mode of the spacecraft bus.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Angular momentum \(\mathbf{L} = I\boldsymbol{\omega}\) | Reaction-wheel torque directly changes wheel momentum, which appears as equal-and-opposite body momentum. |
| Rigid-body Euler equations | The three-axis coupling between body rates and wheel momenta must be written before any control law can be derived. |
| Stiction and Coulomb friction model | Zero-crossing torque disturbance is a discontinuous nonlinearity; without this model the controller will chatter. |
| Quaternion kinematics    | Attitude representation must be singularity-free when the wheels are near zero speed and the spacecraft may be slewing. |

If any row is unfamiliar, pause and review that topic first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Total system momentum is conserved
Aap spacecraft body plus four reaction wheels ko ek isolated system maante ho. Koi external torque nahi to \(\frac{d}{dt}(\mathbf{L}_\text{body} + \mathbf{L}_\text{wheels}) = 0\).

Concrete example: agar body stationary hai aur wheel suddenly +10 N·m·s momentum le leta hai, body ko –10 N·m·s momentum milta hai, yani body opposite direction mein ghumegi.

Formal statement:  
$$\mathbf{L}_\text{total} = \mathbf{I}_\text{body}\boldsymbol{\omega}_\text{body} + \sum_{i=1}^4 I_{w,i}\omega_{w,i}\hat{\mathbf{a}}_i = \text{const}.$$

> [!WARNING]
> Agar aap external torque (gravity gradient, solar radiation pressure) ko zero maan lete ho jab woh actually present hai, to momentum budget drift kar jaayega aur wheel saturation speed galat calculate hogi.

### Step 2 — Wheel torque produces body torque
Wheel motor torque \(\tau_w\) wheel speed badalta hai aur simultaneously body par –\(\tau_w\) torque lagta hai. Yeh actuator ka basic principle hai.

### Step 3 — Momentum envelope and saturation
Har wheel ki maximum safe speed hoti hai (usually 3000–6000 rpm). Char wheels ka combined momentum vector ek polyhedron banata hai; jab spacecraft ka desired momentum is envelope ke bahar jaata hai, wheels saturate.

### Step 4 — Zero-speed crossing introduces discontinuity
Friction model:  
$$\tau_\text{friction} = \begin{cases} 
\tau_\text{Coulomb}\operatorname{sign}(\omega_w) & |\omega_w| > \omega_\text{deadband} \\
\tau_\text{stiction} & \omega_w = 0 
\end{cases}$$

Jab wheel zero cross karta hai, \(\tau_\text{stiction}\) ek sudden jump deta hai jo attitude control loop mein high-frequency disturbance ban jaata hai.

### Step 5 — Momentum management law
Magnetorquers ya thrusters se external torque lagakar wheel momentum ko desired bias value par le aate hain. Typical law:  
$$\boldsymbol{\tau}_\text{dump} = -K(\mathbf{L}_\text{wheels} - \mathbf{L}_\text{bias}).$$

### Step 6 — Textbook-grade statement
The closed-loop spacecraft dynamics with reaction wheels and momentum dumping become a hybrid system whose continuous states are body rate and wheel speeds, and whose discrete events are zero-crossing detections and desaturation triggers.

## 5. Worked examples — har step show karo

**Example 1 — Single-axis momentum exchange**  
*Given:* A 500 kg spacecraft with principal inertia 200 kg·m² about z-axis carries one reaction wheel with \(I_w = 0.05\) kg·m². Wheel speed changes from 0 to 2000 rpm in 10 s.  
*Find:* Body angular velocity after the manoeuvre.  

Wheel angular momentum:  
$$L_w = 0.05 \times 2000 \times \frac{2\pi}{60} = 10.472 \text{ N·m·s}.$$  
Conservation:  
$$I_b \omega_b + L_w = 0 \implies \omega_b = -\frac{10.472}{200} = -0.05236 \text{ rad/s}.$$  
*Why:* We applied \(\mathbf{L}_\text{total}=0\) directly because no external torque.  
**Final answer** –0.05236 rad/s (–3 deg/s).  
*Reflection:* The example is simple because it ignores friction; real zero-crossing would add a small glitch at t = 0.

**Example 2 — Zero-crossing torque spike**  
*Given:* Wheel friction model \(\tau_f = 0.002 \operatorname{sign}(\omega)\) N·m. Controller demands 0.01 N·m continuous torque while crossing zero.  
*Find:* Instantaneous torque error at crossing.  
Torque error = 0.002 N·m (20 % of command).  
*Why:* Sign function flips discontinuously.  
**Final answer** 0.002 N·m spike.  
*Reflection:* Shows why rate-commanding through zero must be done slowly or with bias.

**Example 3 — Four-wheel pyramid momentum envelope**  
*Given:* Four wheels in pyramid configuration, each with max |L| = 5 N·m·s, pyramid angle 35°.  
*Find:* Maximum momentum along body x-axis.  
Projection factor = cos(35°) ≈ 0.8192.  
Max L_x = 4 × 5 × 0.8192 = 16.384 N·m·s.  
**Final answer** 16.384 N·m·s.  
*Reflection:* Envelope calculation is essential before any slew planning.

**Example 4 — Desaturation trigger**  
*Given:* Wheel momentum vector reaches 80 % of envelope. Magnetorquer authority 0.05 N·m.  
*Find:* Minimum dump time to bring momentum back to 50 %.  
Required ΔL = 0.3 × 16.384 ≈ 4.915 N·m·s.  
Time = 4.915 / 0.05 = 98.3 s.  
**Final answer** 98.3 s continuous torque.  
*Reflection:* Shows why magnetorquers are preferred for low-duty-cycle dumping.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Treating friction as linear viscous | Students forget stiction at zero speed              | Always insert a sign or tanh function in simulation  |
| Ignoring wheel inertia in total I | Body inertia matrix alone used for controller gain  | Augment plant model with wheel dynamics              |
| Zero-bias command through zero    | Command profile forces every wheel through zero     | Add 5–10 % momentum bias or swap wheel roles         |
| Saturation during eclipse         | Magnetorquer dumping unavailable                    | Pre-dump momentum before eclipse entry               |
| Quaternion sign flip at zero-cross | Numerical discontinuity mistaken for physical event | Use quaternion switching logic with hysteresis       |

## 7. The textbook-precise statement
In the absence of external torque the angular-momentum balance for a rigid spacecraft equipped with reaction wheels is given by  
$$\mathbf{I}_b\dot{\boldsymbol{\omega}} + \boldsymbol{\omega}\times(\mathbf{I}_b\boldsymbol{\omega} + \mathbf{h}_w) = -\dot{\mathbf{h}}_w + \boldsymbol{\tau}_\text{ext},$$  
where \(\mathbf{h}_w\) is the wheel angular-momentum vector expressed in body axes. The wheel-speed dynamics are  
$$I_{w,i}\dot{\omega}_{w,i} = \tau_{m,i} - \tau_{f,i}(\omega_{w,i}), \quad i=1,\dots,4.$$  
A zero-speed crossing occurs whenever \(\omega_{w,i}(t)\) changes sign; at that instant the friction map \(\tau_{f,i}\) is discontinuous. Momentum management consists of applying an external torque \(\boldsymbol{\tau}_\text{ext}\) (via magnetorquers or thrusters) so that \(\mathbf{h}_w\) remains inside a prescribed interior set that excludes a neighbourhood of the origin. (Sidi, *Spacecraft Dynamics and Control*, 1997, §7.5; Wie, *Space Vehicle Dynamics and Control*, 2e, §6.4.)

## 8. Visual — diagram or schematic
```
Spacecraft body (box)
          +z
           |
  Wheel 1 (pyramid)   Wheel 2
     /   \               /   \
    /     \             /     \
   +-------Body center-------+
    \     /             \     /
     \   /               \   /
  Wheel 4                 Wheel 3
           |
          -z
Each wheel axis tilted 35° from body xy-plane. Arrows show momentum vectors h1..h4. Zero-crossing event marked on Wheel 1 when its arrow length passes through origin.
```

## 9. The memory technique
1. **The hook** — Imagine four spinning tops inside a box; when any top stops and tries to spin the other way it “sticks” for a moment and gives the box a kick. That kick is the zero-crossing disturbance.
2. **What to overlearn** — \(\mathbf{L}_\text{total} = \mathbf{I}_b\boldsymbol{\omega}_b + \mathbf{h}_w = \text{const}\); friction model contains a sign function; desaturation law is proportional to excess momentum.
3. **Spaced-repetition schedule** — Review the conservation equation after 1 day, the friction model after 3 days, a full four-wheel envelope calculation after 7 days, and a complete desaturation simulation after 16 and 35 days.
4. **First-principles fallback** — Start from \(\frac{d}{dt}(\mathbf{L}_\text{body} + \mathbf{L}_\text{wheels}) = \boldsymbol{\tau}_\text{ext}\), set \(\boldsymbol{\tau}_\text{ext}=0\) for free motion, then insert the piecewise friction law at \(\omega_w=0\).

## 10. What this unlocks
Once you master reaction-wheel momentum management you can design attitude controllers for any three-axis stabilised spacecraft, analyse CMG singularities, and move to sensor fusion problems that must reject wheel-induced vibrations.

- Next topics: Control-moment gyroscopes (CMGs), magnetic detumbling laws, jitter budgeting for optical payloads, and Kalman-filter tuning in the presence of actuator noise.

## 11. Self-check — five questions, no answers
1. A 200 kg·m² spacecraft with one wheel of 0.1 kg·m² changes wheel speed by 3000 rpm. What body rate results if total momentum remains zero?  
2. Draw the torque-versus-speed curve of a reaction wheel that includes both Coulomb and stiction friction. Mark the zero-crossing region.  
3. Four wheels in a pyramid at 35° have individual momentum limit 4 N·m·s. Compute the maximum body momentum along the pyramid axis.  
4. Your wheel momentum vector is at 90 % of envelope. Magnetorquer torque is 0.03 N·m. How long must you dump to reach 40 %?  
5. A controller commands continuous torque through zero speed. Predict the attitude jitter spectrum and suggest one software mitigation.