## 1. The one-sentence answer

**Angular displacement θ quantifies how far an object has rotated, angular velocity ω is the instantaneous rate of change of θ, and angular acceleration α is the instantaneous rate of change of ω.**

Yeh teen quantities linear motion ke displacement, velocity aur acceleration ke rotational analogues hain. Linear case mein aap position x ke saath kaam karte ho; yahan aap ek fixed axis ke around rotation angle θ ke saath kaam karte ho. θ ko radians mein measure karna zaroori hai kyunki sirf radians mein derivative aur integral clean rehte hain. ω = dθ/dt aur α = dω/dt define karne ke baad aap rotational dynamics ke equations seedha linear kinematics se map kar sakte ho.

> [!NOTE]
> The single deepest insight yeh hai ki θ, ω aur α sirf scalar nahi hain jab axis direction matter karti hai — woh actually vectors hain jinka direction rotation axis ke along hota hai (right-hand rule). Yeh vector nature baad mein torque aur angular momentum ko possible banata hai.

## 2. Why this matters — concrete and current

SpaceX Starlink satellites mein reaction wheels θ aur ω ko precisely control karke attitude maintain karte hain bina propellant waste kiye.  
ISRO ke Chandrayaan-3 lander ne descent ke dauran angular rates ko α limits ke andar rakha taaki sensors aur thrusters synchronised rahein.  
Modern smartphone IMUs (InvenSense, Bosch) har millisecond mein ω measure karke image stabilisation aur AR tracking dete hain.  
Neutron star glitches mein sudden α jumps astronomers ko superfluid interior ke bare mein data dete hain (Nature Astronomy, 2023 papers).  
Electron synchrotron rings (CERN, DESY) mein beam particles ko stable orbit mein rakhne ke liye α ko micro-radian accuracy se control karna padta hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Derivative           | ω aur α ko θ ke successive derivatives ke roop mein define karne ke liye |
| Radian measure       | θ ko dimensionless rakhne ke liye taaki dθ/dt velocity ban sake |
| Vector vs scalar     | Direction of rotation axis samajhne ke liye (right-hand rule) |
| Linear kinematics    | Equations jaise v = u + at ko rotational form mein translate karne ke liye |

Agar aapko derivative ya radian clear nahi hain to pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — From arc length to angle
Jab koi object ghumta hai, uske kisi point ne kitna linear distance cover kiya usko arc length s kehte hain. Lekin s radius r par depend karta hai. Isliye hum ek radius-independent quantity define karte hain.

Example: 1 m radius wala wheel 3.14 m ghumta hai to θ = 1 radian.

$$ \theta = \frac{s}{r} $$

> [!WARNING]
> Agar aap θ ko degrees mein rakhte ho to baad ke derivatives galat ho jaayenge kyunki d(degrees)/dt ka factor π/180 extra aata hai.

### Step 2 — Instantaneous angular velocity
θ time ke saath badal raha hai. Uski rate of change ω hai. Small time dt mein dθ change hota hai.

$$ \omega = \frac{d\theta}{dt} $$

Example: θ = 4t² rad, t = 2 s par ω = 16 rad/s.

> [!WARNING]
> Sign convention bhoolna common hai — clockwise negative maanna padta hai agar right-hand rule follow kar rahe ho.

### Step 3 — Angular acceleration
ω khud change ho raha hai to uski rate α hai.

$$ \alpha = \frac{d\omega}{dt} = \frac{d^2\theta}{dt^2} $$

Example: upar wale case mein α = 8 rad/s² constant.

### Step 4 — Vector definition
Ek axis choose karo. Thumb us direction mein, fingers curl rotation ke hisaab se. θ, ω, α sab us axis ke along vectors ban jaate hain.

$$ \vec{\omega} = \omega \hat{n}, \quad \vec{\alpha} = \alpha \hat{n} $$

### Step 5 — Relating linear and angular quantities
Kisi point par v = rω aur a_tangential = rα. Yeh relation rigid body ke liye exact hai.

### Step 6 — Constant-α kinematic equations
Linear equations ko direct copy karo, x → θ, v → ω, a → α.

$$ \theta = \theta_0 + \omega_0 t + \frac12\alpha t^2 $$
$$ \omega^2 = \omega_0^2 + 2\alpha(\theta - \theta_0) $$

### Step 7 — Textbook-grade statement
Jab α constant ho to upar ke equations motion ko completely describe karte hain. Variable α ke liye integration zaroori hai.

## 5. Worked examples — har step show karo

**Example 1 — Constant α, simple calculation**  
*Given:* θ₀ = 0, ω₀ = 2 rad/s, α = 3 rad/s², t = 4 s.  
*Find:* θ aur ω at t = 4 s.  

Pehle ω nikaalo:  
ω = ω₀ + αt = 2 + 3×4 = 14 rad/s  
*Why:* direct definition se ω badal raha hai α ke hisaab se.  

Phir θ nikaalo:  
θ = θ₀ + ω₀t + ½αt² = 0 + 2×4 + ½×3×16 = 32 rad  
*Why:* integral of ω dt kiya gaya hai.  

**Final answer**  
**ω = 14 rad/s, θ = 32 rad**

*Reflection:* Yeh sabse basic case hai; constant α wahi hai jo linear motion mein a = constant hota hai.

**Example 2 — Finding α from θ(t)**  
*Given:* θ(t) = 5t³ − 2t (rad).  
*Find:* α at t = 1 s.  

Pehle ω = dθ/dt = 15t² − 2  
*Why:* pehla derivative velocity deta hai.  

Phir α = dω/dt = 30t  
*Why:* doosra derivative acceleration deta hai.  

t = 1 s par α = 30 rad/s².  

**Final answer**  
**α = 30 rad/s²**

*Reflection:* Function diya ho to derivatives laga ke seedha α nikal jaata hai.

**Example 3 — Rocket spin-up**  
*Given:* Solid rocket motor spin rate ω₀ = 0, α = 12 rad/s² for 5 s, phir α = 0.  
*Find:* final ω aur total θ.  

ω = 0 + 12×5 = 60 rad/s  
θ = 0 + 0×5 + ½×12×25 = 150 rad  

**Final answer**  
**ω = 60 rad/s, θ = 150 rad**

*Reflection:* Real rockets finite burn time ke saath spin dete hain; yeh example wahi model karta hai.

**Example 4 — Variable α**  
*Given:* α(t) = 4t rad/s³, ω₀ = 1 rad/s at t = 0.  
*Find:* ω(t) aur θ(t).  

ω(t) = ∫α dt = ∫4t dt = 2t² + 1  
θ(t) = ∫ω dt = ∫(2t² + 1) dt = (2/3)t³ + t + θ₀ (θ₀ = 0)  

**Final answer**  
**ω(t) = 2t² + 1, θ(t) = (2/3)t³ + t**

*Reflection:* Jab α time-dependent ho to integration zaroori hai; constant-α formulas nahi chalenge.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using degrees instead of radians | Habit from school trigonometry              | Always convert to rad before differentiating |
| Forgetting right-hand rule sign | Visualising rotation direction wrong        | Draw axis aur thumb direction pehle fix karo |
| Treating ω as dθ/dt in degrees/s | Missing unit consistency                    | Check units: rad/s must aaye                 |
| Confusing a = rα with centripetal | Tangential aur radial acceleration mix      | Remember a_tangential = rα, a_radial = rω²   |
| Assuming α constant jab woh nahi | Over-applying kinematic equations           | α(t) check karo pehle                        |
| Vector direction ignore karna   | 2D motion sochke 3D bhool jaana             | Har problem mein axis vector likho           |
| Small angle approximation misuse| θ << 1 rad nahi hai phir bhi use karte hain | Check karo θ kitna bada hai                  |

## 7. The textbook-precise statement

When a rigid body rotates about a fixed axis, the angular position θ(t) is a function of time. The angular velocity and angular acceleration are defined by the first and second time derivatives:

$$
\omega(t) \equiv \frac{d\theta}{dt}, \qquad \alpha(t) \equiv \frac{d\omega}{dt} = \frac{d^2\theta}{dt^2}.
$$

If the rotation axis is chosen along unit vector \(\hat{n}\), then \(\vec{\omega} = \omega\hat{n}\) and \(\vec{\alpha} = \alpha\hat{n}\). All kinematic relations follow directly from the definitions provided the angle is expressed in radians. (Kleppner & Kolenkow, *An Introduction to Mechanics*, 2e, §6.2)

## 8. Visual — diagram or schematic

```
          y
          |
          |     ω (out of page)
          |      ↑
     θ →  |   ●────── r
          |  /       \
          | /         \
     ─────┼───────────── x
          |
          |
```

Wheel centre origin par, radius vector r, rotation ω page se bahar (right-hand rule). θ arc angle hai starting from +x axis.

## 9. The memory technique

1. **The hook** — Imagine a clock hand whose tip speed is ω and whose speed is increasing at α; the hand’s angle from 12 o’clock is θ.
2. **What to overlearn** — ω = dθ/dt, α = dω/dt, aur right-hand rule for vector direction.
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Formula bhool jaaye to θ(t) se shuru karo, do derivatives laga do, sign ke liye axis choose karo.

## 10. What this unlocks

Yeh definitions torque = Iα, angular momentum conservation aur rigid-body energy equations ka foundation hain.

- Next: rotational kinetic energy ½Iω²
- Next: torque aur angular impulse
- Next: precession aur gyroscopic motion
- Next: Euler’s equations for 3D rigid body

## 11. Self-check — five questions, no answers

1. θ = 3t² + 2t rad diya hai. t = 2 s par α kitna hai?
2. Ek wheel 4 rad/s se shuru hota hai aur 3 s mein 10 rad ghumta hai. α constant hai to uski value?
3. Right-hand rule se, clockwise rotation (x-y plane mein dekhte hue) ka ω vector kis direction mein hoga?
4. α = 2 rad/s² constant hai lekin θ degrees mein diya gaya hai. Equation galat kyun hogi?
5. Variable α(t) = t² wale case mein ω(t) aur θ(t) derive karo jab ω₀ = 0, θ₀ = 0.