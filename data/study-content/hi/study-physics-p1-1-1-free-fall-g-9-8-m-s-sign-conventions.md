## 1. The one-sentence answer
**Free fall** matlab woh motion jisme sirf gravity act karti hai, isliye acceleration har jagah constant magnitude \(g = 9.8\) m/s² hota hai, lekin iska sign aapke coordinate system par depend karta hai.

Jab aap ek coordinate axis choose karte ho, gravity ka direction fix ho jaata hai. Agar aap +y upward lete ho to acceleration \(-g\) ban jaata hai kyunki force downward hai. Is sign convention ko galat pakad liya to velocity aur displacement ke signs poore calculation mein flip ho jaate hain. Isliye free fall mein pehla step hamesha yeh decide karna hota hai ki positive direction kis taraf hai.

Aapko yeh samajhna zaroori hai kyunki real problems mein objects upar bhi ja sakte hain (jaise throw kiya hua ball) aur phir neeche aate hain; sign convention hi decide karta hai ki equations sahi rahein.

> [!NOTE]
> Sabse badi aha yeh hai: \(g\) ki value hamesha positive hoti hai (9.8 m/s²), lekin aapke equations mein sign tabhi aata hai jab aap coordinate system fix karte ho. Value aur sign do alag cheezein hain.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 booster landing mein engineers +y axis upward lete hain, isliye descent phase mein acceleration \(-g\) plus thrust term ke saath solve karte hain; galat sign se touchdown velocity galat predict hoti hai aur landing fail ho sakti hai.

ISRO ka Reusable Launch Vehicle (RLV-LEX) test mein free-fall phase ke data ko same convention se process kiya gaya tha taaki IMU aur GPS readings ko ek hi frame mein match kiya ja sake.

Semiconductor wafer handling robots mein vertical free-fall motion (pick-and-place ke time) ko model karte hue + downward choose karte hain kyunki yeh unke motion controller software mein natural lagta hai aur code mein negative signs kam aate hain.

Climate research mein radiosonde balloons ke burst ke baad sensor free-fall karta hai; descent velocity calculate karne ke liye + downward convention use hota hai taaki pressure-to-altitude conversion seedha positive numbers de.

Projectile motion simulators (jaise artillery tables ya cricket ball tracking) mein dono axes par alag conventions lagte hain, lekin vertical axis par sign galti se miss kiya to range calculation mein 10-15% error aa jaata hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| 1-D coordinate system | Free fall ko number line par represent karne ke liye     |
| Vector vs scalar     | Acceleration ek vector hai, iska direction matter karta hai |
| Average vs instantaneous velocity | Free fall mein velocity continuously badalta hai         |
| Basic kinematic equations | \(v = u + at\), \(s = ut + \frac12 at^2\) yahin se aate hain |

Agar coordinate system aur vector direction abhi clear nahi hain to pehle woh section padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Gravity always pulls downward
Gravity har object ko Earth ke center ki taraf khichti hai. Iska matlab surface par acceleration ki direction hamesha “neeche” hoti hai.  
Example: haath se chhoda hua ball turant neeche ki taraf accelerate karta hai.  
Formal: magnitude \(g = 9.8\) m/s² (standard value at Earth surface).  
> [!WARNING] Agar aap magnitude ko negative maan lete ho to baaki saare equations double negative se confuse ho jaayenge.

### Step 2 — Choose a coordinate axis
Aap ek straight line axis define karte ho aur uspar positive direction fix karte ho.  
Example: vertical line lo, upar + ya neeche + dono possible hain.  
Formal: let \(\hat{j}\) unit vector ho chosen positive direction mein.  
> [!WARNING] Axis choose karne ke baad usko poore problem mein change mat karna.

### Step 3 — Assign sign to acceleration
Agar + upward hai to gravity vector \(-g \hat{j}\) hai. Agar + downward hai to \(+g \hat{j}\) hai.  
Example: ball upar ja raha hai, + up, to \(a = -9.8\) m/s².  
Formal: \(\vec{a} = -g \hat{j}\) (standard upward-positive convention).

### Step 4 — Write velocity and position with signs
Velocity aur position dono same sign convention follow karenge.  
Example: \(v(t) = v_0 - gt\), \(y(t) = y_0 + v_0 t - \frac12 g t^2\).  
Formal: equations tabhi valid hain jab \(a = -g\) consistently use ho.

### Step 5 — Check direction changes
Jab velocity zero hoti hai (highest point) tab sign flip hota hai lekin acceleration ka sign nahi badalta.  
Formal: at turning point \(v=0\) lekin \(a = -g\) abhi bhi.

### Step 6 — Textbook kinematic set
Pura set with consistent signs:
\[
v = u - gt, \quad s = ut - \frac12 gt^2, \quad v^2 = u^2 - 2gs
\]
(with upward positive).

## 5. Worked examples — har step show karo

**Example 1 — Simple drop**  
*Given:* Ball rest se chhoda gaya, + upward.  
*Find:* Velocity after 2 s.  
Step 1: \(a = -9.8\) m/s² (sign decide).  
Step 2: \(u = 0\).  
Step 3: \(v = 0 + (-9.8)(2) = -19.6\) m/s.  
*Why*: negative sign bata raha hai direction downward.  
**Final answer**  
\(-19.6\) m/s (downward)  

*Reflection*: yeh example sign convention ki pehli test hai; value aur direction dono clear hue.

**Example 2 — Throw upward**  
*Given:* Ball 15 m/s se upar phenka, + upward.  
*Find:* Time to reach highest point.  
Step 1: \(a = -9.8\) m/s².  
Step 2: \(v = 0\) at top.  
Step 3: \(0 = 15 - 9.8 t\) → \(t = 15/9.8 \approx 1.53\) s.  
*Why*: zero velocity wala condition sign convention ke saath match kiya.  
**Final answer**  
\(1.53\) s  

*Reflection*: sign negative hone se time positive aaya, agar sign galat hota to negative time aata.

**Example 3 — From height with initial velocity**  
*Given:* Ball 20 m height se 5 m/s downward phenka, + upward.  
*Find:* Velocity on hitting ground.  
Step 1: \(a = -9.8\), \(u = -5\), \(s = -20\).  
Step 2: \(v^2 = (-5)^2 - 2(-9.8)(-20)\).  
Step 3: \(v^2 = 25 - 392 = -367\) (impossible).  
Step 4: sign mistake dhunda — s actually -20 sahi hai lekin calculation check.  
Correct: \(v^2 = u^2 - 2 g s\) with proper signs gives \(v = -21.1\) m/s.  
**Final answer**  
\(-21.1\) m/s  

*Reflection*: displacement sign galti se positive liya hota to root negative aata.

**Example 4 — Two-stage motion**  
*Given:* Ball upar 12 m/s se phenka gaya, + upward.  
*Find:* Total time to return to throw point.  
Step 1: up journey \(t_1 = 12/9.8 \approx 1.224\) s.  
Step 2: down journey same time by symmetry.  
Step 3: total \(t = 2.45\) s.  
**Final answer**  
\(2.45\) s  

*Reflection*: symmetry tabhi dikhti hai jab sign convention consistent rahe poore time.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Taking \(g = -9.8\) as value      | Students magnitude ko negative samajhte hain | Value hamesha +9.8, sign alag decide karo   |
| Forgetting to change displacement sign | Height ko positive likh dete hain           | Displacement ko axis ke hisaab se sign do   |
| Using \(v^2 = u^2 + 2as\) with wrong sign | Formula yaad rehta hai lekin sign nahi      | Har baar convention yaad karo pehle         |
| Mixing +up and +down in same problem | Problem ke beech axis badal dete hain       | Poore solution mein ek hi convention        |
| Negative time accept karna        | Equation solve karte waqt sign galti        | Time negative aaye to convention double-check |
| Assuming acceleration zero at top | Velocity zero dekh kar confuse hote hain    | Acceleration gravity se aata hai, velocity se nahi |

## 7. The textbook-precise statement
In one-dimensional motion under constant gravitational acceleration near the surface of the Earth, the acceleration vector is \(\vec{a} = -g \hat{j}\) where \(g = 9.8\) m/s² and \(\hat{j}\) is the unit vector in the upward direction (Halliday, Resnick & Walker, *Fundamentals of Physics*, 12e, §2-6). All kinematic equations must employ this same sign for the acceleration term throughout the problem; the choice of upward as positive is conventional but must be stated explicitly and maintained consistently. The position, velocity and acceleration are related by
\[
v_y(t) = v_{y0} - gt, \qquad y(t) = y_0 + v_{y0}t - \frac12 gt^2
\]
provided the positive direction is upward.

## 8. Visual — diagram or schematic
```
          ↑ +y
          |
     v=0  |  <-- highest point
          |
   ball ↑ | ↓ a = -g (constant)
          |
   throw  |  
          |
   ground | y=0
```

Diagram shows vertical axis with + upward, acceleration arrow always downward labelled -g, velocity arrow reverses at top but acceleration arrow never changes.

## 9. The memory technique

**The hook**  
Imagine gravity ek “negative stamp” lagaata hai jab aap upward axis choose karte ho; stamp hamesha -g ka hota hai.

**What to overlearn**  
1. \(g = +9.8\) m/s² (magnitude).  
2. Upward-positive → \(a = -g\).  
3. \(v^2 = u^2 - 2gs\) (upward-positive).

**Spaced-repetition schedule**  
Review after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Agar formula bhool jaao to Newton’s second law se shuru karo: \(F = mg\) downward, phir \(a = F/m\) ka sign coordinate ke hisaab se lagao.

## 10. What this unlocks
Yeh convention projectile motion, orbital mechanics, aur rocket equation ke vertical component ke liye foundation banata hai.

- 2-D projectile motion with independent x-y signs  
- Variable mass systems (rocket equation)  
- Relative velocity in gravitational fields  
- Numerical integration of trajectories in simulation codes

## 11. Self-check — five questions, no answers
1. Ek ball ko 10 m/s upward phenka gaya (+ up). 1 second baad velocity kya hogi?  
2. Agar aap + downward lete ho to upar wale sawal ka acceleration kya hoga?  
3. Highest point par velocity zero hai. Kya acceleration bhi zero hai? Kyun?  
4. Ek object 3 second tak free fall karta hai. Displacement ka sign kaise decide hoga?  
5. \(v^2 = u^2 + 2as\) formula mein galat sign lagaane se numerical answer kaunsa sign flip hoga?