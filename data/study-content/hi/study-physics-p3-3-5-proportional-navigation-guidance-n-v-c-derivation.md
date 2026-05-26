## 1. The one-sentence answer
**Proportional navigation guidance** ek missile ya interceptor guidance law hai jisme lateral acceleration command directly proportional hoti hai line-of-sight (LOS) angular rate se, mathematically \(a = N \cdot V_c \cdot \dot{\lambda}\).

Yeh law collision triangle ko maintain karta hai bina target ki future position predict kiye. Aap sirf LOS rate ko measure karte ho aur usko closing velocity aur navigation constant se scale kar dete ho, jisse missile target ki taraf naturally curve karti hai. Derivation is principle se aati hai ki agar bearing constant rahe toh collision hoga; isliye \(\dot{\lambda}\) ko zero karne ke liye proportional command lagate hain.

> [!NOTE]
> Sabse badi aha moment yeh hai ki aapko target ki speed ya heading nahi chahiye — sirf relative LOS rotation rate aur closing speed kaafi hai, jo radar se directly mil jaati hai.

## 2. Why this matters — concrete and current
Raytheon AIM-120 AMRAAM aur MBDA Meteor jaise beyond-visual-range missiles proportional navigation ke variants use karte hain taaki high-speed maneuvering targets ko intercept kar sakein bina onboard target prediction ke.

SpaceX aur Rocket Lab ke second-stage attitude control systems mein bhi simplified PN-like logic appear karti hai jab upper stage ko de-orbiting vehicle se match karna hota hai.

Indian DRDO ke Astra missile aur Barak-8 surface-to-air system dono ne PN derivation ko base banaya hai, phir usme drag aur gravity compensation add kiya hai.

Modern automotive radar ke saath collision-avoidance systems (jaise Tesla Autopilot ke forward-collision mitigation) low-N PN variants use karte hain jahaan closing velocity optical flow se estimate hoti hai.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Relative velocity vector | Closing velocity \(V_c\) aur LOS rate \(\dot{\lambda}\) dono relative motion se define hote hain |
| Angular kinematics       | \(\dot{\lambda}\) ko perpendicular velocity component se relate karna padta hai |
| Vector cross product     | 2-D plane mein LOS rate nikaalne ke liye \( \mathbf{r} \times \mathbf{v} \) form zaroori hai |
| First-order control      | Acceleration command ko directly rate error se link karna |

Agar relative velocity ya angular rate clear nahi hai toh pehle 2-D kinematics padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Collision course geometry
Agar missile aur target ke beech line-of-sight ka angle constant rahe (yaani \(\dot{\lambda}=0\)) toh dono ek dusre se takraayenge. Iska matlab hai missile ko sirf itna accelerate karna hai ki LOS rotate na ho.

Concrete example: 500 m/s speed wali missile 300 m/s target ke peeche hai aur LOS angle abhi bhi badal raha hai; aapko \(\dot{\lambda}\) ko zero karna hai.

Formal statement: collision condition \(\dot{\lambda}=0\) hai.

> [!WARNING]
> Agar aap yahan \(\dot{\lambda}\) ko zero karne ki jagah position error ko zero karne ki koshish karoge toh pure pursuit ban jaayega aur missile target ke peeche lag jaayegi.

### Step 2 — LOS rate from relative velocity
LOS vector \(\mathbf{r}\) aur relative velocity \(\mathbf{v}_r\) ke cross product se angular rate nikalti hai. 2-D case mein magnitude form \(V_\perp / r = \dot{\lambda}\) hota hai.

Formal: \(\dot{\lambda} = \frac{\mathbf{r} \times \mathbf{v}_r}{r^2}\).

### Step 3 — Required perpendicular acceleration
LOS rate ko cancel karne ke liye perpendicular direction mein acceleration lagani padti hai jo \(\dot{\lambda}\) ko time ke saath integrate kare. Simple proportional control yahi deta hai: \(a = N V_c \dot{\lambda}\).

Formal: command acceleration \(a_c = N V_c \dot{\lambda}\).

### Step 4 — Closing velocity definition
Closing velocity \(V_c = -\dot{r}\) hoti hai (range decrease ki rate). Isko radar Doppler se directly measure karte hain.

### Step 5 — Navigation constant N
N typically 3 se 5 ke beech hota hai taaki stability aur fast response dono mile. N=3 se ZEM (zero-effort miss) minimum hota hai ideal case mein.

Formal: \(N > 2\) for finite-time interception in non-maneuvering target.

### Step 6 — Complete PN law
Combining sab steps, missile lateral acceleration command becomes \(a = N V_c \dot{\lambda}\), jisme direction LOS perpendicular hoti hai.

## 5. Worked examples — har step show karo

**Example 1 — Basic LOS rate calculation**
- *Given:* Missile-target range vector \(\mathbf{r} = (8000, 0)\) m, relative velocity \(\mathbf{v}_r = (-400, 120)\) m/s.
- *Find:* \(\dot{\lambda}\).

Pehle magnitude \(r = 8000\) m.  
Perpendicular component \(V_\perp = 120\) m/s.  
\(\dot{\lambda} = 120 / 8000 = 0.015\) rad/s.  
*Why:* Cross-product ka 2-D equivalent yahi deta hai.

**Final answer**  
\(\dot{\lambda} = 0.015\) rad/s

*Reflection:* Yeh step sirf geometry check karti hai; ab isko command mein convert karna hai.

**Example 2 — Command acceleration with N=3**
- *Given:* \(V_c = 650\) m/s, \(\dot{\lambda} = 0.015\) rad/s, \(N=3\).
- *Find:* \(a_c\).

\(a_c = 3 \times 650 \times 0.015 = 29.25\) m/s².  
*Why:* Direct multiplication kyunki law linear hai.

**Final answer**  
\(a_c = 29.25\) m/s² (LOS perpendicular)

*Reflection:* Real missile mein yeh value lateral acceleration limit ke andar honi chahiye.

**Example 3 — Effect of N on time-to-go**
- *Given:* Same numbers lekin N=4.
- *Find:* New \(a_c\).

\(a_c = 4 \times 650 \times 0.015 = 39\) m/s².  
*Why:* Higher N faster response deta hai lekin actuator saturation risk badhata hai.

**Final answer**  
\(a_c = 39\) m/s²

*Reflection:* N choose karte waqt actuator limit aur stability dono dekhna padta hai.

**Example 4 — Non-zero target maneuver**
- *Given:* Target 3 g lateral maneuver add karta hai, N=4.
- *Find:* Required \(a_c\) adjustment (simple first-order).

Base command 39 m/s² + compensation term (target accel projected) ≈ 39 + 9.8 ≈ 48.8 m/s².  
*Why:* Pure PN target maneuver ko partially compensate karta hai; augmented PN isme gravity aur maneuver terms add karta hai.

**Final answer**  
\(a_c \approx 48.8\) m/s²

*Reflection:* Yeh dikhata hai kyun advanced variants PN base se shuru hote hain.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using \(V_c\) as missile speed | Students missile speed ko hi closing speed samajh lete hain | Always \(V_c = -\dot{r}\) ya Doppler measurement use karo |
| Sign error in \(\dot{\lambda}\) | Coordinate frame choose karte waqt positive/negative confuse ho jaata hai | Consistent right-hand rule ya body-fixed frame fix kar lo |
| N=1 lena                    | Proportional control ka minimal value soch ke | N>2 hona chahiye for finite intercept time   |
| Ignoring LOS perpendicular direction | Command vector direction galat lagate hain | Cross-product se direction nikaalo, scalar multiply mat karo |
| High N saturation           | Fast response chahiye isliye N badha dete hain | Actuator limit check karo aur N=3–5 band mein rakho |
| Zero range division         | Terminal phase mein r→0 par \(\dot{\lambda}\) blow up lagta hai | Blinding logic ya range threshold lagaao |

## 7. The textbook-precise statement
Proportional navigation guidance issues an acceleration command perpendicular to the instantaneous line-of-sight given by  
\[ \mathbf{a}_c = N V_c \dot{\lambda} \hat{\mathbf{e}}_\perp \]  
where \(V_c = -\dot{r}\) is the closing speed, \(\dot{\lambda}\) is the inertial line-of-sight rate, \(N\) is a dimensionless navigation gain (typically \(3 \leq N \leq 5\)), and \(\hat{\mathbf{e}}_\perp\) is the unit vector perpendicular to the LOS. The law is derived under the assumption of constant closing velocity and non-maneuvering target; it guarantees zero miss distance for \(N>2\) in the absence of acceleration limits (Zarchan, *Tactical and Strategic Missile Guidance*, 6e, Chapter 2).

## 8. Visual — diagram or schematic
```
Target (T)
   •
    \   LOS (r)
     \ 
      \ θ=λ
Missile (M) • ------------> V_m
             \
              \ V_r (relative)
               \
                • (collision point if λ̇=0)
```
Horizontal axis range, vertical axis cross-track. \(\dot{\lambda}\) arrow curved around LOS.

## 9. The memory technique
1. **The hook** — Imagine a searchlight beam jo target par lock hai; aapko beam ko hilne se rokna hai. Beam hil raha hai matlab \(\dot{\lambda}\) nonzero, isliye aap side mein dhakka dete ho.
2. **What to overlearn** — Formula \(a = N V_c \dot{\lambda}\), N typically 3–5, aur \(V_c = -\dot{r}\).
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — LOS vector cross relative velocity se \(\dot{\lambda}\) nikaalo, phir perpendicular component ko N se scale karo.

## 10. What this unlocks
Yeh law augmented proportional navigation, optimal guidance aur predictive guidance ke liye foundation deta hai.

- Augmented PN (gravity + target maneuver compensation)
- Optimal guidance law (linear quadratic regulator form)
- Sliding-mode guidance variants
- Multi-vehicle formation guidance

## 11. Self-check — five questions, no answers
1. Ek 800 m/s closing speed aur 0.02 rad/s LOS rate ke liye N=3 par command acceleration kya hogi?
2. Kyun N=2 se kam value finite-time interception nahi deti?
3. Agar target 4 g turn kare toh pure PN kitna miss karega (qualitative)?
4. Sign flip kaise hota hai jab aap missile body frame se inertial frame mein command translate karte ho?
5. High-N value actuator saturation paida kyun karti hai aur usse miss distance kaise badhta hai?