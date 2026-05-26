## 1. The one-sentence answer
**3DOF point mass equations of motion** describe the translational trajectory of a rocket by treating it as a single point with three degrees of freedom (usually down-range, cross-range, and altitude) while ignoring attitude dynamics.

In rocket flight mechanics aap rocket ko sirf mass ke point ki tarah dekhte ho jismein sirf position aur velocity change hoti hai. Gravity, thrust aur aerodynamic forces (lift aur drag) ko vector form mein likh kar Newton’s second law apply karte ho. Iska result ek set of coupled ordinary differential equations hota hai jo time ke saath altitude, velocity, flight-path angle aur heading angle ko evolve karta hai.

Yeh model early mission design, range-safety calculations aur preliminary trajectory optimisation ke liye kaafi accurate hota hai kyunki rotational dynamics ko alag se handle karne ki zaroorat nahi padti.

> [!NOTE]
> Sabse badi “aha” yeh hai ki 3DOF model mein sirf net force vector aur mass ka ratio hi acceleration deta hai; moment of inertia ya control-surface deflection ka koi direct asar nahi padta, isliye computation bahut tez ho jaata hai.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 recovery trajectories mein 3DOF point-mass propagation use karke booster landing point predict kiya jaata hai, phir Monte-Carlo runs se dispersion bands banaye jaate hain.

ISRO PSLV aur GSLV missions ke launch-window analysis mein yeh equations down-range safety corridors aur instantaneous impact point (IIP) calculate karne ke liye standard tool hain.

NASA’s Program to Optimize Simulated Trajectories (POST) aur ESA’s Trajectory Optimisation Tool (TOSCA) dono 3DOF point-mass dynamics ko inner-loop integrator ke roop mein chalate hain.

Hypersonic glide vehicles jaise DF-17 ke glide phase ko model karne ke liye bhi 3DOF equations kaafi hain kyunki attitude control ko alag 6DOF layer mein rakha jaata hai.

Reusable sounding rockets (Rocket Lab Electron recovery studies) mein 3DOF model se fuel-optimal return-to-launch-site trajectories jaldi iterate ki jaati hain.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector calculus          | Force aur acceleration ko 3D space mein resolve karne ke liye |
| Newton’s second law      | m·a = ΣF ka direct application trajectory equations deta hai |
| Flight-path angle γ      | Velocity vector aur local horizontal ke beech angle define karta hai |
| Coordinate transformations | Earth-centred, launch-centred aur velocity-centred frames ke beech convert karna padta hai |
| Basic ODE integration    | Equations ko numerically solve karna padta hai (Runge-Kutta etc.) |

Agar upar ke concepts mein se koi bhi weak hai to pehle usko revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with Newton’s law in inertial frame
Aap rocket ko ek point mass maante ho aur uspar lagnewale sabhi forces (thrust, drag, lift, gravity) ko vector sum karte ho.  
Example: ek vertically rising rocket par sirf thrust T aur weight mg lage hain, isliye acceleration sirf vertical direction mein T/m − g hota hai.  
Formal statement:  
$$m\frac{d\mathbf{v}}{dt}=\mathbf{T}+\mathbf{A}+\mathbf{G}$$  
> [!WARNING] Agar aap yahan mass ko constant maan lete ho jabki propellant burn ho raha ho, to velocity prediction mein 15–20 % error aa sakta hai.

### Step 2 — Resolve forces into velocity-relative frame
Drag aur lift hamesha velocity vector ke relative hote hain, isliye local vertical-horizontal frame (LVH) ya wind frame use karna padta hai.  
Example: agar rocket 30° ke angle par udd raha hai to drag force ko −D·(cosγ, sinγ) components mein todna padega.  
Formal:  
$$\mathbf{A}=-D\hat{\mathbf{v}}+L\hat{\mathbf{n}}$$  
> [!WARNING] Agar aap drag ko inertial frame mein galat direction mein lagate ho to trajectory curve ulta ho jaata hai.

### Step 3 — Introduce flight-path angle γ and heading ψ
Velocity vector ki direction ko do angles se define karte hain: elevation γ aur azimuth ψ. In angles ke derivatives force components se directly linked hote hain.  
Formal:  
$$ \dot{\gamma}=\frac{L\cos\phi_T}{m v}+\left(\frac{v}{r}-\frac{g}{v}\right)\cos\gamma $$  
> [!WARNING] γ = ±90° par denominator zero ho jaata hai, isliye singularity handling (gimbal lock) ya quaternion formulation chahiye.

### Step 4 — Add Earth curvature and gravity variation
Flat-Earth approximation sirf short range ke liye theek hai; 3DOF model mein centripetal aur gravity terms r cosγ aur GM/r² ke roop mein aate hain.  
Formal:  
$$ \dot{v}=\frac{T-D}{m}-g\sin\gamma+\frac{v^2}{r}\sin\gamma $$  
> [!WARNING] 200 km se upar jaate hi inverse-square gravity must use karna padta hai warna apogee 5–8 % galat nikalega.

### Step 5 — Write the complete 3DOF set
Position (r, λ, ϕ), velocity v, γ aur ψ ke liye six coupled ODEs milte hain. Yeh set hi trajectory propagation ka core hai.  
Formal textbook-grade equations (next section mein detailed).

## 5. Worked examples — har step show karo

**Example 1 — Vertical launch at t=0**  
*Given:* T = 500 kN, m = 50 000 kg, g = 9.81 m s⁻², initial v = 0.  
*Find:* dv/dt at ignition.  
Step 1: Net force = T − mg = 500 000 − 490 500 = 9 500 N.  
Step 2: a = F/m = 9 500 / 50 000 = 0.19 m s⁻².  
*Why:* Sirf vertical component liya kyunki γ = 90°.  
**Final answer**  
0.19 m s⁻² upward.  
*Reflection:* Yeh case trivial hai lekin mass change aur thrust vectoring shuru hone par yeh base line ban jaata hai.

**Example 2 — Constant-altitude cruise**  
*Given:* L = mg, D = 10 kN, T = 12 kN, v = 200 m s⁻¹, γ = 0.  
*Find:* horizontal acceleration.  
Step 1: Net axial force = T − D = 2 kN.  
Step 2: aₓ = 2 000 / m.  
*Why:* γ = 0 hone se lift gravity balance kar rahi hai.  
**Final answer**  
aₓ = 2 000 / m m s⁻².  
*Reflection:* Real cruise mein thrust = drag hota hai; yahan extra thrust acceleration deta hai.

**Example 3 — 2D ballistic trajectory segment**  
*Given:* v = 1 500 m s⁻¹, γ = 30°, D = 0 (vacuum), g = 9.81.  
*Find:* γ̇.  
Step 1: γ̇ = −(g cosγ)/v.  
Step 2: γ̇ = −(9.81 × √3/2)/1 500 ≈ −0.00566 rad s⁻¹.  
*Why:* Drag zero hone se sirf gravity term bachta hai.  
**Final answer**  
γ̇ ≈ −0.00566 rad s⁻¹.  
*Reflection:* Isse range aur apogee analytically nikal sakte hain.

**Example 4 — Full numerical step (Euler, Δt = 1 s)**  
*Given:* v = 2 000 m s⁻¹, γ = 20°, r = 6 378 km, T = 0, D = 5 kN, m = 2 000 kg.  
Step 1: Compute v̇ = −D/m − g sinγ + v²/r sinγ.  
Step 2: γ̇ = −(g cosγ)/v + (v/r) cosγ.  
Step 3: Update v_new = v + v̇ Δt, γ_new = γ + γ̇ Δt.  
*Why:* Ek single integration step dikhane ke liye Euler method use kiya.  
**Final answer**  
v_new ≈ 1 994.1 m s⁻¹, γ_new ≈ 19.97°.  
*Reflection:* Real code mein RK4 ya higher-order integrator lagate hain.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Constant mass assumption          | Propellant mass change bhool jaana          | m(t) = m_dry + m_prop(t) ko explicitly likho |
| γ = 90° singularity ignore karna  | Vertical flight par denominator zero        | Switch to Cartesian ya quaternion variables  |
| Drag direction wrong frame mein   | Wind frame vs inertial frame mix karna      | Velocity vector ko har step par normalise karo |
| Flat-Earth gravity                | Short-range approximation lamba chalana     | r > 200 km par GM/r² use karo                |
| Thrust vector = body axis         | Angle-of-attack zero maan lena              | α aur β angles ko alag se track karo         |
| Unit inconsistency                | km vs m, rad vs deg                         | Har input ko SI base units mein convert karo |
| Initial heading ψ = 0 fixed       | Cross-range motion miss ho jaati hai        | Launch azimuth ko initial ψ mein daalo       |

## 7. The textbook-precise statement
The 3DOF point-mass translational equations of motion for an aerospace vehicle in a spherical rotating Earth frame are given by Zipfel, *Modeling and Simulation of Aerospace Vehicle Dynamics*, 2e, §3.3:

$$
\begin{align}
\dot{v}&=\frac{T-D}{m}-g\sin\gamma+\frac{v^{2}}{r}\sin\gamma+2\omega_{e}v\cos\phi\cos\psi\\
\dot{\gamma}&=\frac{L\cos\phi_{T}}{mv}+\left(\frac{v}{r}-\frac{g}{v}\right)\cos\gamma+2\omega_{e}\sin\phi\cos\psi\\
\dot{\psi}&=\frac{L\sin\phi_{T}}{mv\cos\gamma}-\frac{v}{r}\cos\gamma\tan\phi+2\omega_{e}(\sin\phi\sin\psi+\cos\phi\tan\gamma\cos\psi)
\end{align}
$$

with auxiliary kinematic equations for r, λ, ϕ. All forces are expressed in the velocity coordinate system; mass variation and Earth rotation terms are retained.

## 8. Visual — diagram or schematic
```
          Local Vertical
               ↑
               |  r (radius)
               |
   Velocity --> v
               \
                \ γ (flight-path angle)
                 \
------------------ Horizontal (local)
```
Velocity vector v, flight-path angle γ (measured from local horizontal), radial distance r from Earth centre. Heading ψ (not shown) lies out of the plane.

## 9. The memory technique

1. **The hook**  
   Socho rocket ek “smart marble” hai jo sirf net force ke hisaab se fisal raha hai; uske andar koi “twist” nahi hai.

2. **What to overlearn**  
   - v̇ = (T − D)/m − g sinγ  
   - γ̇ = (L cos φ_T)/(m v) + (v/r − g/v) cosγ  
   - Mass must be m(t).

3. **Spaced-repetition schedule**  
   1 din baad, 3 din, 7 din, 16 din, 35 din — har baar ek naya initial condition ke saath integrate karo.

4. **First-principles fallback**  
   Newton’s law → force balance in velocity frame → divide by m → chain rule for angles → add spherical gravity.

## 10. What this unlocks
Yeh equations aapko 6DOF attitude dynamics, optimal control (indirect method), Monte-Carlo dispersion analysis aur real-time guidance law design tak le jaate hain.

- 6DOF rigid-body simulation ka inner translational loop
- Indirect optimal-control primer arcs
- Covariance propagation for launch-vehicle guidance
- Entry trajectory design for capsules

## 11. Self-check — five questions, no answers
1. Agar mass 10 % galat input kar do to apogee kitna shift hota hai?
2. γ = 90° par equations kis form mein rewrite karoge?
3. Earth rotation term 2ωₑv kis component ko affect karta hai aur kitna?
4. Ek student ne drag ko inertial x-axis par laga diya; trajectory kis direction mein deviate karegi?
5. 3DOF model se 6DOF model mein jaane ke liye kaunsa extra state vector add karna padega?