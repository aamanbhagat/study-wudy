## 1. The one-sentence answer
**Open-loop pitch-over** ek pre-programmed sequence hai jismein rocket liftoff ke turant baad vertical se gradually tilt karta hai taaki desired orbital inclination aur altitude achieve ho sake.

Yeh maneuver rocket ke guidance system mein hard-coded hota hai. Launch ke pehle trajectory calculations ke basis par pitch angle ka time history define kar diya jaata hai. Koi real-time sensor feedback ismein use nahi hota, isliye isse open-loop kehte hain. Rocket ke thrust vector aur aerodynamic forces is pitch program ko follow karte hue vehicle ko gravity turn trajectory par le jaate hain.

Aap soch sakte hain ki yeh ek open-loop controller hai jo sirf time ya velocity ke hisaab se pitch rate command deta hai. Iska matlab hai ki agar wind ya thrust variation ho toh bhi rocket wahi fixed profile follow karega.

> [!NOTE]
> Sabse badi aha yeh hai ki open-loop pitch-over gravity turn ka seed hai — rocket ko sirf thoda sa initial tilt dekar baaki kaam gravity aur centrifugal force par chhod dete hain, isse propellant waste nahi hota.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 missions mein first-stage pitch program precisely tuned hota hai taaki downrange landing zone tak pahunche; thodi si galti bhi RTLS ya drone-ship recovery ko miss karwa sakti hai.  
ISRO PSLV aur GSLV launches mein open-loop pitch-over profile ko Indian launch pads se sun-synchronous orbits ke liye customize kiya jaata hai, jahaan inclination 98° ke aas-paas maintain karni padti hai.  
NASA SLS Block 1 flights ke liye pitch program ko Artemis trajectory ke saath integrate kiya gaya hai taaki Orion spacecraft lunar transfer injection ke liye sahi heading par ho.  
ULA Atlas V aur Vulcan Centaur rockets mein open-loop pitch-over ko national security payloads ke liye use kiya jaata hai jahaan real-time guidance updates restricted hote hain.  
Blue Origin New Glenn development tests mein yeh technique vehicle stability aur fairing separation timing ko validate karne ke liye ground simulations mein chalayi jaati hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Inertial frame & launch coordinate system | Pitch angle ko Earth-fixed frame se inertial frame mein convert karna padta hai |
| Gravity turn dynamics | Samajhna zaroori hai ki pitch-over ke baad thrust aur gravity ka vector kaise couple hote hain |
| Open-loop vs closed-loop control | Distinguish karna padega kyunki yeh program kisi feedback par depend nahi karta |
| Basic rocket equation & specific impulse | Pitch profile propellant consumption ko directly affect karti hai |

## 4. Building the idea — from intuition to formalism

### Step 1 — Initial vertical rise
Rocket liftoff ke baad kuch seconds tak vertical rise karta hai taaki tower se safe clearance mil jaaye. Iska matlab yeh hai ki pitch angle zero rehta hai.  
Example: Falcon 9 almost 7–8 seconds tak vertical jaata hai.  
Formal statement:  
$$ \theta(t) = 0, \quad 0 \leq t \leq t_{\text{clear}} $$  
> [!WARNING]
> Agar clearance time galat liya toh tower collision ya excessive aerodynamic load ho sakta hai.

### Step 2 — Kick angle or initial pitch bias
Ek chhota sa instantaneous pitch angle (kick angle) diya jaata hai. Yeh angle 2°–5° ke beech hota hai.  
Formal:  
$$ \theta(t_{\text{kick}}) = \theta_0 $$  
> [!WARNING]
> Bahut bada kick angle sideslip angle badha deta hai aur structural failure la sakta hai.

### Step 3 — Constant pitch-rate phase
Ab pitch angle linearly time ke saath badhta hai. Yeh rate 0.5°–1°/s ke aas-paas hota hai.  
$$ \theta(t) = \theta_0 + \dot{\theta} \cdot (t - t_{\text{kick}}) $$  
> [!WARNING]
> Constant rate assumption agar wind shear ke saath match na kare toh angle-of-attack spike ho jaata hai.

### Step 4 — Transition to gravity turn
Jab dynamic pressure q aur velocity dono sufficient ho jaayein, pitch program gravity turn mein merge ho jaata hai. Ab pitch rate naturally velocity vector ke saath align ho jaati hai.  
Formal condition:  
$$ \dot{\theta}_{\text{prog}} = \frac{g \sin \gamma}{V} $$  
> [!WARNING]
> Agar transition timing galat ho toh closed-loop guidance ko bhi correct karna mushkil ho jaata hai.

### Step 5 — Open-loop termination at guidance handover
Pitch program tab tak chalta hai jab tak second-stage ignition ya fairing separation na ho jaaye. Uske baad closed-loop guidance le leta hai.  
Formal:  
$$ t_{\text{handover}} = t \text{ where } h \geq h_{\text{guide}} $$  

## 5. Worked examples

**Example 1 — Simple kick-angle calculation**  
*Given:* Vertical rise 6 s, kick angle 3°.  
*Find:* Pitch angle at t = 6 s.  
Step 1: t_clear = 6 s.  
Step 2: θ = 3°.  
*Why*: Direct assignment of initial bias.  
**3°**

*Reflection*: Yeh example isliye simple thi kyunki koi rate involved nahi tha; asli missions mein yeh sirf starting point hota hai.

**Example 2 — Linear pitch-rate profile**  
*Given:* θ₀ = 3°, pitch rate 0.7°/s, handover at 80 s.  
*Find:* θ at handover.  
Step 1: Δt = 80 − 6 = 74 s.  
Step 2: θ = 3 + 0.7 × 74 = 54.8°.  
*Why*: Linear interpolation because open-loop table constant rate store karti hai.  
**54.8°**

*Reflection*: Linear assumption easy to implement hai lekin real wind data ke saath update karna padta hai.

**Example 3 — Gravity-turn matching condition**  
*Given:* V = 1200 m/s, γ = 35°, g = 9.81 m/s².  
*Find:* Required pitch rate.  
Step 1: Use formula \(\dot{\theta} = g \sin\gamma / V\).  
Step 2: \(\dot{\theta} = 9.81 \times \sin 35^\circ / 1200 \approx 0.0047\) rad/s.  
*Why*: Yahi rate gravity turn naturally deta hai.  
**0.0047 rad/s**

*Reflection*: Yeh step dikhata hai ki open-loop program gravity-turn rate se match karna zaroori hai warna angle-of-attack badhega.

**Example 4 — Multi-phase profile with handover**  
*Given:* t_clear = 8 s (0°), kick 4°, rate 0.65°/s till 70 s, then gravity turn.  
*Find:* θ at 70 s and check handover condition.  
Step 1: θ(70) = 4 + 0.65 × (70 − 8) = 44.3°.  
Step 2: Compare with gravity-turn rate at current V.  
*Why*: Handover tabhi sahi hai jab dono rates 5 % ke andar match karein.  
**44.3° at handover**

*Reflection*: Escalated example dikhata hai ki real missions mein multiple phases aur tolerance check dono zaroori hote hain.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Ignoring wind shear         | Student sochta hai atmosphere ideal hai     | Monte-Carlo wind profiles use karo           |
| Too aggressive kick angle   | Early dynamic pressure low hota hai         | 2°–5° limit aur q-dot check lagao            |
| Forgetting Earth rotation   | Launch site latitude ignore kar dete hain   | Inertial velocity mein ωₑ × R term add karo  |
| Constant rate till staging  | Staging ke baad thrust change hota hai      | Phase-wise rate tables banao                 |
| No angle-of-attack limit    | Open-loop mein feedback nahi hota           | Pre-flight load indicator max-α check karo   |
| Wrong handover altitude     | Closed-loop guidance late activate hoti hai | h ≥ 50 km aur V ≥ 2 km/s dono condition rakho |

## 7. The textbook-precise statement
An open-loop pitch program consists of a time-indexed sequence of commanded pitch angles θ_prog(t) generated prior to flight and injected into the attitude control system without feedback. The commanded angle satisfies the initial-value problem  
θ_prog(0) = 0,  
dθ_prog/dt = ω_prog(t) for t ∈ [t_clear, t_handover],  
where ω_prog(t) is piecewise constant or linear and chosen so that the resulting flight-path angle γ(t) remains within a prescribed angle-of-attack corridor α_max. The program terminates at the first instant t_handover where both altitude and velocity satisfy the closed-loop guidance capture criteria. (See Vinh, *Flight Mechanics of Space Vehicles*, 1981, §4.3.)

## 8. Visual — diagram or schematic
```
Vertical ↑
   |   t=0   θ=0°
   |   t=6s  kick → θ=3°
   |_________________________  ← constant-rate line (0.7°/s)
  / 
 /   gravity-turn curve (natural)
/
→ horizontal (orbital)
```
X-axis: downrange distance, Y-axis: altitude. Dashed line shows programmed θ(t); solid curve shows actual velocity-vector tilt after gravity takes over.

## 9. The memory technique
1. **The hook** — Socho rocket ko “ek haath se dheere se dhakka dena” jaise initial kick angle, baaki gravity khud tilt kar degi.
2. **What to overlearn** — Kick angle range 2°–5°, typical pitch rate 0.5°–1°/s, handover jab h > 40 km.
3. **Spaced-repetition schedule** — 1 din baad formula yaad karo, 3 din baad ek example solve karo, 7 din baad trap table revise karo, 16 din baad full profile design karo, 35 din baad mission data se compare karo.
4. **First-principles fallback** — Agar rate bhool jaao toh sirf yeh yaad rakho: pitch rate ≈ g sinγ / V; velocity aur flight-path angle se wapas nikaal sakte ho.

## 10. What this unlocks
Yeh concept aapko gravity-turn optimization, closed-loop guidance handover logic, aur ascent load-relief algorithms samajhne ke liye taiyaar karta hai.  
- Next: Pitch program optimization using indirect methods  
- Next: Closed-loop explicit guidance (PEG)  
- Next: Six-DOF ascent trajectory simulation  
- Next: Wind-bias and adaptive pitch steering

## 11. Self-check — five questions, no answers
1. Ek rocket ke liye agar kick angle 8° kar diya jaaye toh angle-of-attack par kya asar padega?  
2. Constant pitch-rate 0.9°/s 90 s tak chalayein; handover angle kitna hoga (assume t_clear = 5 s)?  
3. Gravity-turn rate aur programmed rate mein 10 % mismatch ho toh α_max cross hone ki sambhavna kitni hai?  
4. Earth rotation term ko pitch program mein add karna kyun zaroori hai equatorial launches ke liye?  
5. Agar wind shear profile launch ke din badal jaaye toh open-loop pitch program kis cheez ko sabse zyada affect karega?