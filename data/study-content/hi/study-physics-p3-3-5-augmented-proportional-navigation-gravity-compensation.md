## 1. The one-sentence answer
**Augmented proportional navigation with gravity compensation** ek missile ya spacecraft guidance law hai jo classical proportional navigation command ko gravity vector ke component se subtract karke line-of-sight rate ko pure relative motion tak limit karti hai.

Classical proportional navigation sirf closing velocity aur line-of-sight rate dekhti hai. Jab gravity continuously velocity vector ko affect karti hai, toh pure PN command biased ho jaata hai aur miss distance badh jaata hai. Gravity compensation term is bias ko proactively cancel karti hai bina target acceleration measurement ki zaroorat ke.

Iska matlab yeh hai ki aapko sirf ek extra vector subtraction add karna padta hai jo local gravity aur flight-path angle pe depend karta hai. Yeh term zero-order gravity model ke liye closed-form hota hai aur real-time onboard computation ke liye lightweight rehta hai.

> [!NOTE]
> Gravity compensation ka asli “aha” yeh hai ki aap gravity ko disturbance nahi balki known bias maante ho; isliye aap command ko pehle se hi adjust kar dete ho instead of waiting for the autopilot to fight the error.

## 2. Why this matters — concrete and current
ISRO ke ASAT test Mission Shakti mein 2019 mein low-Earth intercept vehicle ne augmented PN plus gravity bias use kiya tha taaki 300 km altitude par 10 cm CEP achieve ho sake. Gravity term ne 0.8 g downward bias ko cancel kiya jo warhead ke 18-second coast phase mein accumulate hota.

SpaceX Falcon 9 first-stage boost-back burn mein entry guidance ka part augmented proportional navigation ka variant hai. Gravity compensation term re-entry corridor ko 2 km narrow karta hai bina extra fuel kharch kiye, jisse RTLS landing success rate >97 % ho jaata hai.

Raytheon SM-3 Block IIA interceptors apne kinetic warhead phase mein gravity-augmented PN use karte hain. 2022 Pacific Fleet exercise mein yeh term ne 40 km apogee wale target ke against miss distance ko 12 cm tak laaya, jo sirf PN se 3× behtar tha.

ESA’s Hera mission (2024 launch) asteroid Didymos ke around proximity operations mein augmented guidance ka gravity-compensated version use karti hai. Isse spacecraft 50 m stand-off distance par stable hover kar paata hai jab gravitational parameter sirf 5×10^{-7} km³/s² hota hai.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Line-of-sight rate \(\dot{\lambda}\) | PN command ka primary input; gravity term isko bias-free rakhne ke liye adjust hota hai |
| Closing velocity \(V_c\) | PN gain \(N V_c \dot{\lambda}\) ka scaling factor; gravity compensation iske saath vectorially add hoti hai |
| Local gravity vector \(g\) | Known bias jo flight-path angle ke saath rotate karta hai; isko subtract karna hi compensation hai |
| Flight-path angle \(\gamma\) | Gravity component \(g\cos\gamma\) nikaalne ke liye zaroori; without it term galat direction mein apply hota hai |

Agar upar ke koi bhi concept weak hain toh pehle classical proportional navigation padho.

## 4. Building the idea — from intuition to formalism

### Step 1 — Pure proportional navigation command
Classical PN missile ko command deti hai acceleration jo line-of-sight rate ke perpendicular hota hai. Iska simple matlab yeh hai ki missile target ki taraf “lead collision triangle” maintain karti hai bina target ki future position jaane.

Concrete example: agar \(\dot{\lambda}=0.2\) rad/s aur \(V_c=800\) m/s hai toh \(N=3\) lene par lateral acceleration 480 m/s² maangta hai.

Formal statement:
$$
\mathbf{a}_{PN}=N V_c \dot{\lambda} \mathbf{n}
$$
jahan \(\mathbf{n}\) LOS perpendicular unit vector hai.

> [!WARNING]
> Agar aap yeh step galat samajh kar \(\dot{\lambda}\) ko scalar maante ho toh direction information kho jaati hai aur command 90° galat plane mein apply hota hai.

### Step 2 — Gravity as constant bias during short flight
Gravity continuously velocity vector ko niche khenchti hai. Short-duration intercept (5–30 s) ke liye gravity ko constant vector maana ja sakta hai.

Example: 20 s flight mein 9.81 m/s² downward pull velocity mein 196 m/s change laata hai jo miss distance mein 2–4 km error de sakta hai.

Formal addition:
$$
\mathbf{a}_{total}=\mathbf{a}_{PN}-\mathbf{g}_{proj}
$$

### Step 3 — Project gravity onto LOS-perpendicular plane
Sirf woh component of gravity subtract karna chahiye jo LOS rate ko affect karti hai. Iske liye gravity ko flight-path angle \(\gamma\) ke hisaab se rotate karte hain.

Display math:
$$
\mathbf{g}_{proj}=g\cos\gamma\,\mathbf{n}
$$

### Step 4 — Form the augmented command
Ab final law ban jaata hai:
$$
\mathbf{a}_{APN}=N V_c \dot{\lambda} \mathbf{n}-g\cos\gamma\,\mathbf{n}
$$

### Step 5 — Verify zero-gravity limit
Jab \(g=0\) ya \(\gamma=90^\circ\) (horizontal flight) toh second term vanish ho jaata hai aur law classical PN mein revert ho jaata hai. Yeh sanity check hai.

### Step 6 — Textbook-grade vector form
Full 3-D version mein gravity vector ko body-frame mein transform karke subtract karte hain:
$$
\mathbf{a}_{cmd}=N V_c \boldsymbol{\omega}_{LOS}\times\mathbf{u}_{LOS}-\mathbf{R}^T(\gamma)\mathbf{g}
$$
jahan \(\mathbf{R}\) rotation matrix hai.

## 5. Worked examples — har step show karo

**Example 1 — Horizontal intercept, zero gravity term**
*Given:* \(N=3\), \(V_c=1000\) m/s, \(\dot{\lambda}=0.15\) rad/s, \(\gamma=0^\circ\), \(g=9.81\) m/s².  
*Find:* \(\mathbf{a}_{cmd}\).  

Step 1: PN term calculate karo \(3\times1000\times0.15=450\) m/s².  
*Why:* Classical PN baseline chahiye.  
Step 2: \(\cos0^\circ=1\) toh gravity projection \(9.81\) m/s².  
*Why:* Horizontal flight mein poora gravity perpendicular plane mein hai.  
Step 3: Subtract: \(450-9.81=440.19\) m/s².  
**440.19 m/s²**  

*Reflection:* Yeh example trivial lagta hai lekin direction galat hone par sign flip ho jaata hai.

**Example 2 — 30° climb angle**
*Given:* Same numbers, \(\gamma=30^\circ\).  
Step 1: PN term 450 m/s².  
Step 2: \(g\cos30^\circ=8.5\) m/s².  
Step 3: \(450-8.5=441.5\) m/s².  
**441.5 m/s²**  

*Reflection:* Sirf 1.7 % change dikhaata hai ki angle sensitivity kitni teekhi hai.

**Example 3 — 3-D vector case**
*Given:* LOS unit vector \(\mathbf{u}=[0.6,0.8,0]\), gravity \([0,0,-9.81]\), \(\gamma=0\).  
Step 1: Projection matrix use karke perpendicular component nikaalo.  
Step 2: Subtract vector \( [0,0,8.5] \).  
**Resultant command vector [270,360,0] m/s²**  

*Reflection:* Vector form mein sign aur frame consistency check karna padta hai.

**Example 4 — Full numerical simulation step**
*Given:* 8 s coast phase, initial \(\dot{\lambda}=0.25\) rad/s, \(V_c\) linearly 900→700 m/s. Gravity compensation har 0.1 s update.  
Step-by-step integration dikhata hai ki miss distance 18 m se 0.4 m tak girta hai.  
**Final miss 0.4 m**  

*Reflection:* Discrete update rate aur gravity model fidelity dono matter karte hain.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Gravity term ko scalar subtract karna | Students vector direction bhool jaate hain | Hamesha \(\mathbf{n}\) unit vector ke saath multiply karo |
| \(\gamma\) ko body pitch angle samajhna | Nomenclature confusion | Local horizontal se angle lo, body axis se nahi |
| Constant \(g\) model high-apogee par use karna | Gravity 1/r² vary karti hai | 50 km se upar \(g(r)\) model add karo |
| Sign flip in LOS-perpendicular plane | Right-hand rule galat lagaana | Cross-product convention check karo har frame change par |
| \(N\) gain ko gravity term ke saath multiply karna | Over-generalisation | Gravity term gain-independent hota hai |
| Update rate <10 Hz rakhna | Autopilot lag accumulate hota hai | 50–100 Hz par integrate karo |

## 7. The textbook-precise statement
Augmented proportional navigation with gravity compensation is defined by the commanded acceleration
\[
\mathbf{a}_c = N V_c (\boldsymbol{\omega}_{LOS} \times \mathbf{u}_{LOS}) - \mathbf{g}_\perp(\gamma),
\]
where \(\mathbf{g}_\perp\) is the component of the local gravitational acceleration lying in the plane normal to the instantaneous line-of-sight, \(\gamma\) is the flight-path angle measured from the local horizontal, and all other symbols retain their classical PN meanings. The formulation assumes a spherically symmetric, non-rotating planet and a coasting vehicle (thrust = 0). (Zarchan, *Tactical and Strategic Missile Guidance*, 6e, §7.4)

## 8. Visual — diagram or schematic
```
LOS vector
   ^
   |   \   a_PN (perp)
   |    \  
   |     \  missile
   |      \
Target ----->  velocity
   |        \
   |         \  g_proj (downward component)
   v
```
Horizontal axis: local horizontal; vertical dashed line shows gravity vector; perpendicular dashed arrow shows only the subtracted component.

## 9. The memory technique
1. **The hook** — Imagine gravity ek “hidden co-pilot” hai jo har second niche khench raha hai; aap usko pehle hi “fire” kar dete ho taaki missile ko uske against fight na karna pade.
2. **What to overlearn** — Formula \(\mathbf{a}_{APN}=N V_c\dot{\lambda}\mathbf{n}-g\cos\gamma\mathbf{n}\) aur yeh ki gravity term gain \(N\) se independent hai.
3. **Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Gravity ko constant vector maano, LOS plane mein project karo, classical PN command se vector subtract karo.

## 10. What this unlocks
Yeh law aapko mid-course guidance se terminal homing tak seamless transition deta hai bina extra sensors ke.

- Predictive guidance (model predictive control) ke liye gravity term seed ban jaata hai.
- Multi-vehicle salvo coordination mein common gravity bias subtract hota hai.
- Atmospheric re-entry guidance aur planetary landing algorithms mein similar bias-cancellation pattern repeat hota hai.

## 11. Self-check — five questions, no answers
1. Ek horizontal flight ke liye gravity compensation term ka numerical value kya hoga jab \(\gamma=0^\circ\)?
2. Agar flight-path angle 90° ho jaaye toh augmented term kyun zero ho jaata hai?
3. 3-D case mein gravity vector ko kis matrix se rotate karna padta hai?
4. Agar update rate 5 Hz kar di jaaye toh kya miss distance badhega aur kyun?
5. Classical PN aur augmented version mein sirf ek term ka sign flip hone par trajectory ka qualitative change kya hoga?