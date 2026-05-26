## 1. The one-sentence answer
**Angular momentum of a system stays constant when the net external torque on that system is exactly zero.**

Iska matlab yeh hai ki jab koi bahari torque system par nahi lagta, tab uska total angular momentum vector same rehta hai — direction aur magnitude dono. Aap soch sakte hain ki linear momentum tab conserve hota hai jab net force zero ho; yahan bilkul parallel relation hai, lekin force ki jagah torque aur linear momentum ki jagah angular momentum. Yeh condition tabhi apply hoti hai jab aap system ko properly define karo, taaki sirf external torques count hon.

Agar system ke andar internal torques hain (jaise do particles ek dusre par force laga rahe hain), woh angular momentum ko cancel kar sakte hain agar woh central forces hain, lekin external torque zero hona zaroori hai. Real life mein yeh tab useful hota hai jab friction ya gravity jaise external agents torque na paida karen.

> [!NOTE]
> Sabse badi aha moment yeh hai: conservation tab nahi hoti jab torque zero ho, balki tab hoti hai jab *net external* torque zero ho — internal torques system ke andar angular momentum ko redistribute kar sakte hain lekin total ko nahi badal sakte.

## 2. Why this matters — concrete and current
SpaceX Starlink satellites apne reaction wheels aur magnetorquers use karte hain taaki external torque (mainly gravity gradient aur solar radiation pressure) ko counter karke angular momentum ko conserve kar sakein during attitude adjustments.

ISRO ke Chandrayaan-2 orbiter ne lunar gravity assist ke dauran angular momentum conservation ka use kiya tha taaki minimal propellant se orbit change ho sake, kyunki koi significant external torque nahi tha during coasting phase.

Neutron star mergers mein LIGO-Virgo detections show karte hain ki angular momentum conservation binary system ke spin evolution ko dictate karta hai jab tak gravitational waves torque na paida karen.

Figure skating athletes aur divers angular momentum conservation ka directly exploit karte hain jab woh tuck position lete hain — koi external torque nahi hota air mein, isliye spin speed badh jaati hai.

Satellite operators jaise Planet Labs daily mein angular momentum bias wheels ko manage karte hain kyunki Earth’s magnetic field se minimal external torque hota hai aur wheels ko desaturate karna padta hai.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector cross product     | Angular momentum aur torque dono r × p aur r × F ke form mein hote hain |
| Torque as dL/dt          | Yeh directly dikhata hai kab L constant rahega            |
| System boundary definition | External vs internal torque distinguish karne ke liye     |
| Rigid body vs particle   | Moment of inertia I ke through L = Iω samajhne ke liye    |

Agar upar wale concepts clear nahi hain to pehle unhe revise karo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with the definition of angular momentum
Angular momentum ek particle ke liye position aur linear momentum ka cross product hota hai. Yeh vector hai aur rotation ki “quantity of motion” ko measure karta hai.

Concrete example: ek mass m jo origin se r distance par velocity v ke saath ghoom raha hai, uska L = r × mv hota hai.

Formal statement:
$$ \vec{L} = \vec{r} \times \vec{p} $$

> [!WARNING]
> Agar aap sirf magnitude leke cross product ka direction bhool jaoge to conservation vector form mein nahi samajh paoge.

### Step 2 — Relate torque to rate of change of angular momentum
Torque angular momentum ko badalta hai bilkul waise jaise force linear momentum ko badalta hai.

Formal statement:
$$ \vec{\tau} = \frac{d\vec{L}}{dt} $$

### Step 3 — Identify the condition for constancy
Agar net external torque zero ho to dL/dt zero ho jaata hai, matlab L constant rehta hai.

Formal statement:
$$ \vec{\tau}_{\rm ext} = 0 \implies \frac{d\vec{L}}{dt} = 0 \implies \vec{L} = \text{constant} $$

### Step 4 — Distinguish internal and external torques
Internal torques agar Newton’s third law ke equal-opposite central forces se aate hain to woh total L ko nahi badalte. Sirf external torque matter karta hai.

### Step 5 — Extend to system of particles and rigid bodies
Total L system ke sab particles ke L ka vector sum hota hai. Rigid body ke liye L = Iω tab bhi conserve hota hai jab τ_ext = 0.

### Step 6 — Textbook-grade statement
Net external torque ke zero hone par total angular momentum vector time ke saath constant rehta hai, chahe internal motion kuch bhi ho.

## 5. Worked examples — har step show karo

**Example 1 — Simple particle in free space**
*Given:* Ek particle mass 2 kg origin se 3 m door hai, velocity 4 m/s tangential, koi force nahi.
*Find:* Angular momentum after 10 s.
L = r × p = 3 × (2 × 4) = 24 kg m²/s (direction out of plane).
*Why:* Koi external force nahi matlab torque zero, isliye L same rehta hai.
**Final answer:** 24 kg m²/s (constant)

*Reflection:* Yeh example isliye simple thi kyunki single particle aur zero force; generalise hota hai jab τ_ext = 0.

**Example 2 — Ice skater spin**
*Given:* Skater moment of inertia 4 kg m² se 1 kg m² kar deti hai, initial ω = 2 rad/s.
*Find:* Final ω.
L initial = 4 × 2 = 8, L final = 1 × ω, L conserve → ω = 8 rad/s.
*Why:* Arms andar khinchne se I badla lekin external torque zero (ice friction negligible).
**Final answer:** 8 rad/s

*Reflection:* Internal forces I ko change karti hain lekin total L ko nahi.

**Example 3 — Two-disk collision**
*Given:* Disk A (I = 2, ω = 5) dusre disk B (I = 3, ω = 0) se frictionlessly connect ho jaata hai.
*Find:* Common ω.
Total L = 2 × 5 + 3 × 0 = 10, final I = 5, ω = 2 rad/s.
*Why:* External torque zero (axis fixed lekin bearing torque free).
**Final answer:** 2 rad/s

*Reflection:* System boundary define karna zaroori tha.

**Example 4 — Satellite with thruster misfire**
*Given:* Satellite L = 50 kg m²/s, ek thruster 0.1 Nm torque 20 s tak lagata hai.
*Find:* ΔL.
ΔL = τ Δt = 0.1 × 20 = 2, final L = 52.
*Why:* Thruster external torque paida karta hai, isliye conservation nahi.
**Final answer:** 52 kg m²/s

*Reflection:* Real missions mein aise torques ko actively cancel karna padta hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| External torque ko internal samajhna | System boundary galat define karna          | Pehle clearly define karo kya system hai     |
| Sirf magnitude dekhna             | Vector nature bhool jaana                   | Hamesha direction bhi check karo             |
| Friction ko hamesha external maanna | Har friction torque paida nahi karti        | Axis ke saath friction line of action dekho  |
| I change hone par L change samajhna | Internal work ko external torque samajhna   | Yaad rakho internal torques total L nahi badalte |
| 2D motion mein direction bhoolna  | Plane perpendicular vector ignore karna     | Right-hand rule har baar apply karo          |

## 7. The textbook-precise statement
When the net external torque acting on a system of particles is zero, the total angular momentum of the system about a fixed point (or the center of mass) is constant in both magnitude and direction. That is, if \(\vec{\tau}_{\rm ext} = \sum_i \vec{r}_i \times \vec{F}_i^{\rm ext} = 0\), then \(\frac{d}{dt}\sum_i (\vec{r}_i \times \vec{p}_i) = 0\), so \(\vec{L}_{\rm total} = \) constant. This holds provided the internal forces are central (along the line joining the particles). (Kleppner & Kolenkow, *An Introduction to Mechanics*, 2e, §6.3)

## 8. Visual — diagram or schematic
```
          z
          ↑
          |   L (constant)
          |  ↗
   particle A --> F_ext = 0
          |  
          |  r × p
   origin O ----------------> x
          \
           particle B (internal force only)
```
Axis labels: origin O, position vectors r_A and r_B, total L along z (no external torque).

## 9. The memory technique

1. **The hook** — Socho ek space station jo freely rotate kar raha hai; koi bahar se “push” nahi kar sakta to uska spin kabhi nahi badlega.
2. **What to overlearn** — τ_ext = 0 ⇒ L = constant (vector).
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — τ = dL/dt se shuru karo, external torque zero set karo, integrate to get L constant.

## 10. What this unlocks
Yeh concept aapko rigid body rotation, precession, rocket spin stabilization aur orbital mechanics ke torque-free motion samajhne deta hai.

- Gyroscopic precession
- Euler’s equations for rigid bodies
- Reaction wheel dynamics in spacecraft
- Conservation during collisions in 2D

## 11. Self-check — five questions, no answers
1. Ek particle par ek force lag raha hai jo uske position vector ke parallel hai. Kya uska angular momentum conserve hoga?
2. Do particles ek dusre par equal opposite forces laga rahe hain jo unke connecting line ke along hain. Total L kya hoga?
3. Ek disk frictionless axle par ghoom raha hai. Agar uspar ek tangential force lagaye to kya L change hoga?
4. Ice skater arms failaati hai to ω kam hoti hai. Kaunsa quantity exactly constant rehta hai?
5. Ek satellite ke reaction wheel ka angular momentum badhta hai. Iske liye external torque kya hona chahiye?