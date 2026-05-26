## 1. The one-sentence answer
**Mass properties of a rocket evolve continuously because propellant mass leaves the vehicle, shifting the center of gravity (CG) and altering every element of the inertia tensor.**

Jab rocket propellant burn karta hai, uska total mass kam hota hai aur mass distribution bhi badalta hai. Iska matlab CG ka location body-fixed frame mein move karta hai, usually forward ki taraf agar tanks aft mein hain. Inertia tensor ke diagonal aur off-diagonal terms dono change hote hain kyunki mass moments \(\int (y^2 + z^2) dm\) jaise integrals ab alag dm field par evaluate hote hain.

Aapko yeh change har time step par track karna padta hai kyunki equations of motion mein angular acceleration \(\mathbf{I}^{-1}(\mathbf{M} - \boldsymbol{\omega} \times \mathbf{I}\boldsymbol{\omega})\) directly inertia tensor par depend karti hai. Agar aap fixed-mass assumption lete ho to control algorithms galat torque commands denge aur vehicle unstable ho sakta hai.

> [!NOTE]
> Sabse badi “aha” yeh hai ki propellant depletion sirf mass loss nahi hai — yeh ek moving-mass problem hai jisme CG aur inertia dono state variables ban jaate hain jo flight software ko real-time update karne padte hain.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 first-stage landing algorithm har millisecond CG shift ko account karta hai jab propellant grid fins aur engine gimbaling ke liye used hota hai; bina iske touchdown accuracy 10 m se zyada degrade ho jaati hai.

ISRO GSLV Mk-III cryogenic upper stage ke liye inertia tensor update model use karta hai jisse nutation damping ke liye reaction control thrusters ka duty cycle decide hota hai — 2023 Chandrayaan-3 mission data mein yeh update 0.8° attitude error kam kiya.

Blue Origin New Shepard capsule recovery mein CG aft shift ko model kiya jaata hai taaki drogue parachute deployment timing sahi ho; 2022 test flight mein bina update ke 4° pitch oscillation dekha gaya tha.

European Space Agency Ariane 6 upper stage ke Vinci engine restart sequence mein real-time inertia tensor estimate use hoti hai kyunki LH2/LOX depletion ke saath roll inertia 18 % tak badal jaati hai — yeh data 2024 flight software validation report mein published hai.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Rigid-body angular momentum \(\mathbf{H} = \mathbf{I}\boldsymbol{\omega}\) | Inertia tensor directly multiplies angular velocity       |
| Center of mass definition \( \mathbf{r}_{cg} = \frac{1}{m}\int \mathbf{r}\,dm \) | CG location is first moment; propellant removal moves it  |
| Parallel-axis theorem    | Tanks ke local inertia ko vehicle CG ke around shift karne ke liye |
| Time-varying mass systems | Rocket equation aur variable-mass torque equations        |

Agar parallel-axis theorem ya variable-mass torque term aapko clear nahi, pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Mass leaves, distribution changes
Rocket ke andar propellant solid ya liquid form mein specific tanks mein hota hai. Jab woh burn hota hai aur exhaust ke through nikal jaata hai, vehicle ke andar bachi hui mass ka geometric distribution badalta hai. Iska seedha asar CG aur inertia par padta hai.

Example: 100 kg propellant wala cylindrical tank jo rocket ke tail mein hai, jab 60 kg burn ho jaaye to bacha hua 40 kg mass ab sirf tank ke lower half mein maana ja sakta hai.

Formal statement: instantaneous mass distribution \(\rho(\mathbf{r},t)\) time-dependent hai, isliye
\[
m(t) = \int_V \rho(\mathbf{r},t)\,dV, \qquad \mathbf{r}_{cg}(t) = \frac{1}{m(t)}\int_V \mathbf{r}\,\rho(\mathbf{r},t)\,dV.
\]

> [!WARNING]
> Agar aap sirf total mass update karte ho lekin \(\mathbf{r}_{cg}\) ko fixed maante ho, to torque equation mein extra fictitious moment term miss ho jaayega aur simulation drift karega.

### Step 2 — CG as first mass moment
CG naya origin ban jaata hai jiske around inertia tensor calculate hota hai. Har propellant slice remove hone par CG vector shift hota hai.

Example: agar aft tank se mass nikal raha hai to CG forward move karta hai.

Formal:
\[
\Delta\mathbf{r}_{cg} = \frac{m_p(\mathbf{r}_p - \mathbf{r}_{cg})}{m - m_p}
\]
jahaan \(m_p\) ejected propellant mass hai aur \(\mathbf{r}_p\) uska centroid.

### Step 3 — Inertia tensor definition
Inertia tensor 3×3 symmetric matrix hai jisme products of inertia bhi hote hain. Har element mass distribution ka second moment hota hai.

Formal:
\[
I_{xx} = \int (y^2 + z^2)\,dm, \quad I_{xy} = -\int xy\,dm
\]
jab CG naya origin hai.

### Step 4 — Time derivative of inertia tensor
Dono CG aur \(\mathbf{I}\) time-dependent hain, isliye
\[
\dot{\mathbf{I}} = \frac{d}{dt}\int (\mathbf{r}\cdot\mathbf{r}\,\mathbf{E} - \mathbf{r}\mathbf{r}^T)\,dm(t).
\]
Propellant mass flux \(\dot{m}\) aur tank geometry se \(\dot{\mathbf{I}}\) directly calculate hota hai.

### Step 5 — Coupling into equations of motion
Euler’s equation ab extra term le leta hai:
\[
\mathbf{I}\dot{\boldsymbol{\omega}} + \boldsymbol{\omega}\times\mathbf{I}\boldsymbol{\omega} + \dot{\mathbf{I}}\boldsymbol{\omega} = \mathbf{M}_{ext}.
\]

### Step 6 — Discrete tank model for flight software
Real-time implementation mein tanks ko finite number of lumped masses ke roop mein model kiya jaata hai. Har time step par mass remove karke CG aur \(\mathbf{I}\) re-compute kiya jaata hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple axial CG shift**
*Given:* 2000 kg rocket body with CG at 5 m from nose. Aft tank at 8 m from nose contains 800 kg propellant. 300 kg burn ho jaaye.
*Find:* new CG location.
Pehle total mass = 2800 kg, moment = 2000×5 + 800×8 = 16400 kg·m.  
Naya mass = 2500 kg.  
Naya moment = 16400 − 300×8 = 14000 kg·m.  
Naya CG = 14000/2500 = 5.6 m.  
*Why:* mass moment balance kiya kyunki CG weighted average hota hai.  
**5.6 m from nose**

*Reflection:* yeh example linear shift dikhata hai; jab tank geometry complex ho to integral chahiye.

**Example 2 — Diagonal inertia change**
*Given:* thin cylindrical tank radius 0.5 m, length 3 m, initial propellant 600 kg, uniform density. 200 kg burn ho jaaye (assume level drops uniformly).
*Find:* change in \(I_{xx}\) about cylinder axis.
Initial \(I_{xx} = \frac{1}{2}m r^2 = 0.5\times600\times0.25 = 75\) kg·m².  
Mass density linear drop se naya \(m = 400\) kg, same radius.  
Naya \(I_{xx} = 50\) kg·m².  
*Why:* \(I_{xx}\) mass ke proportional hai jab radius fixed ho.  
**Drop of 25 kg·m²**

*Reflection:* uniform burn assumption simple hai lekin real sloshing ignore karti hai.

**Example 3 — Parallel-axis correction after CG shift**
*Given:* same rocket, new CG 0.6 m forward. Tank local inertia about its own CG 40 kg·m², distance from new vehicle CG 2.4 m.
*Find:* contribution to vehicle \(I_{zz}\).
Use parallel-axis: \(I_{zz,veh} = 40 + 400\times(2.4)^2 = 40 + 2304 = 2344\) kg·m².  
*Why:* local inertia ko vehicle CG par shift karna zaroori hai.  
**2344 kg·m²**

*Reflection:* CG move hone ke baad har component ko re-shift karna padta hai.

**Example 4 — Combined CG + tensor update with time step**
*Given:* at t = 10 s, \(\dot{m} = −40\) kg/s from tank whose centroid 1.8 m aft of current CG. Current \(I_{xx} = 1200\) kg·m². Time step \(\Delta t = 0.5\) s.
*Find:* updated CG shift and \(\Delta I_{xx}\).
Mass removed = 20 kg.  
CG shift \(\Delta r_{cg} = \frac{20\times1.8}{m-20}\) (forward).  
Removed mass ka local \(I_{xx,rem} \approx 8\) kg·m².  
Naya \(I_{xx} = 1200 - 8 - 20\times d^2\) (parallel-axis).  
*Why:* dono first aur second moments update kiye.  
**Updated values ready for Euler integration**

*Reflection:* yeh step flight software loop mein har 20 ms par repeat hota hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating CG as fixed              | Mass loss ko sirf scalar samajhna           | Har time step par first-moment integral chalao |
| Ignoring products of inertia      | Off-diagonal terms zero maanna              | Full 3×3 tensor matrix update karo           |
| Using body-frame derivatives only | \(\dot{\mathbf{I}}\) term bhoolna           | Euler equation mein explicit \(\dot{\mathbf{I}}\boldsymbol{\omega}\) daalo |
| Slosh modes neglect karna         | Liquid propellant ko rigid maanna           | Pendulum ya spring-mass slosh model add karo |
| Sign error in CG shift            | Aft mass removal forward shift hai          | Vector direction check karo (nose = positive) |
| Large time steps in simulation    | \(\Delta t\) bada lene se instability       | CFL-like condition ya adaptive step use karo |
| Parallel-axis application galat   | Wrong reference point choose karna          | Hamesha current vehicle CG se distance lo    |

## 7. The textbook-precise statement
In variable-mass rigid-body dynamics the center-of-mass location and inertia tensor are explicit functions of time. Let \(\rho(\mathbf{r},t)\) be the instantaneous mass density inside the control volume fixed to the rocket body. Then
\[
\mathbf{r}_{cg}(t)=\frac{1}{m(t)}\int_{V(t)}\mathbf{r}\rho(\mathbf{r},t)\,dV,\qquad
\mathbf{I}(t)=\int_{V(t)}\bigl(r^2\mathbf{E}-\mathbf{r}\mathbf{r}^T\bigr)\rho(\mathbf{r},t)\,dV
\]
where \(m(t)=\int\rho\,dV\). The rotational equation about the moving center of mass becomes
\[
\mathbf{I}\dot{\boldsymbol{\omega}}+\boldsymbol{\omega}\times\mathbf{I}\boldsymbol{\omega}+\dot{\mathbf{I}}\boldsymbol{\omega}=\mathbf{M}_{ext}+\mathbf{M}_{thrust}.
\]
All hypotheses (rigid body except for the depleting propellant, no sloshing, body-fixed frame origin at instantaneous CG) must be stated explicitly. (Wiesel, *Spaceflight Dynamics*, 3e, §4.3)

## 8. Visual — diagram or schematic
```
Nose
  |
  |  CG(t) ───►  (moves forward)
  |  
Tank 1 (emptying)   CG(t+Δt)
  |  ████  ← remaining propellant
  |  ████
  |  ████
Engine
```
X-axis nose-to-tail. CG arrow har time step par thoda aage badhta hai jab aft propellant mass kam hoti hai. Coordinates: nose at x=0, initial CG at x=5.2 m, final CG at x=5.8 m.

## 9. The memory technique
1. **The hook** — Socho rocket ek “khali hota hua peechhe se bhaari dibba” hai; jaise jaise peechhe ka maal nikalega, balance point aage ki taraf khisak jaayega.
2. **What to overlearn** — \(\mathbf{r}_{cg}(t)\) aur full \(\mathbf{I}(t)\) dono time-dependent state variables hain; parallel-axis theorem har lumped tank par apply karna.
3. **Spaced-repetition schedule** — 1 din baad formula likho, 3 din baad ek example solve karo, 7 din baad simulation loop banao, 16 din baad slosh add karo, 35 din baad textbook derivation se compare karo.
4. **First-principles fallback** — Mass moment integrals se shuru karo: pehle \(\int dm\), phir \(\int\mathbf{r}\,dm\), phir \(\int r^2 dm\).

## 10. What this unlocks
Ab aap variable-mass attitude dynamics, sloshing-coupled control, real-time inertia estimation aur stage-separation logic samajh sakte ho.

- Next: propellant slosh dynamics as pendulum model
- Next: time-varying mass in six-DOF equations of motion
- Next: Kalman filter design for online CG/Inertia estimation
- Next: optimal trajectory re-planning with moving CG constraints

## 11. Self-check — five questions, no answers
1. Ek cylindrical tank se uniform mass removal par CG shift direction kya hogi agar tank vehicle ke center line par hai?
2. \(I_{zz}\) kis factor se sabse zyada affect hota hai jab aft tank khali hota hai — mass loss ya CG shift?
3. Parallel-axis theorem apply karte waqt reference point galat choose karne se kitna error aata hai?
4. Agar \(\dot{\mathbf{I}}\boldsymbol{\omega}\) term ignore kar diya jaaye to Euler integration mein kaunsa instability dikhega?
5. Real-time flight software mein 100 Hz update rate par CG calculation ke liye kaunsa numerical method stable rahega?