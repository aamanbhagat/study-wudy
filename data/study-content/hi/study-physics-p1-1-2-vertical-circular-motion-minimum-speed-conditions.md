## 1. The one-sentence answer
**Vertical circular motion mein minimum speed condition yeh hai ki top point par velocity kam se kam \(\sqrt{gr}\) honi chahiye taaki centripetal force gravity se pura ho sake aur string ya track tension zero par na jaaye.**

Iska matlab yeh hai ki jab koi object vertical circle mein ghum raha hai, jaise string ke end mein tied ball ya roller-coaster loop mein car, toh har point par net force center ki taraf \(mv^2/r\) ke barabar hona zaroori hai. Neeche gravity opposite direction mein hoti hai, isliye speed zyada chahiye; upar gravity same direction mein hoti hai, isliye minimum speed kam ho sakti hai.

Aap sochiye ek ball ko string se bandh kar vertically ghuma rahe hain. Agar top par speed bahut kam ho, toh ball apna circular path chhod kar seedha neeche gir jaayegi kyunki centripetal requirement poori nahi ho paa rahi.

> [!NOTE]
> Sabse badi aha yeh hai ki top par gravity khud centripetal force ka hissa ban jaati hai, isliye minimum speed zero nahi balki \(\sqrt{gr}\) hoti hai — bina iske circle toot jaata hai.

## 2. Why this matters — concrete and current
SpaceX Starship aur Falcon 9 ke booster recovery mein vertical descent trajectories ko control karte waqt circular arc segments use hote hain jahaan minimum speed conditions ensure karte hain ki aerodynamic loads predictable rahein.

ISRO ke Reusable Launch Vehicle (RLV) tests mein loop manoeuvres ke dauran top-point velocity \(\sqrt{gr}\) se upar rakhna padta hai taaki control surfaces par minimum dynamic pressure bana rahe.

Natural phenomena mein, yeh condition comets ke highly eccentric orbits ke periapsis-apoapsis transitions ko samajhne mein help karti hai, jaise Oort cloud objects jab solar gravity dominant hoti hai.

Roller-coaster design companies jaise Bolliger & Mabillard loop-the-loop tracks mein yeh calculation use karti hain taaki passenger g-forces safe rahein aur ride kabhi airtime ke naam par track se nahi udde.

Particle accelerators jaise LHC ke vertical bending magnets mein beam pipe ke andar charged particles ke circular paths ke liye similar minimum energy thresholds apply hote hain.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Newton's second law      | Net force = ma, yahaan centripetal acceleration \(v^2/r\) ke liye use hota hai |
| Free-body diagrams       | Tension, gravity aur normal force ko alag-alag vectors mein todna padta hai |
| Centripetal acceleration | Circular motion ka defining relation \(a_c = v^2/r\) yahin se aata hai |
| Energy conservation      | Kinetic aur potential energy ka balance minimum speed nikaalne mein help karta hai |

Agar inme se koi bhi weak hai toh pehle Newton's laws aur uniform circular motion revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify forces at the top
Vertical circle ke top par object par do forces kaam karti hain: gravity downward (center ki taraf) aur tension/string force bhi downward. In dono ko milakar centripetal force dena padta hai.

Concrete example: ek 0.5 kg ka ball 1 m radius ki string se ghuma rahe hain. Top par agar tension zero ho jaaye toh sirf gravity \(mg\) hi centripetal force de sakti hai.

Formal statement:
$$mg + T = \frac{mv^2}{r} \quad (T \ge 0)$$
Minimum speed ke liye \(T = 0\) lo:
$$v_{\min} = \sqrt{gr}$$

> [!WARNING]
> Agar aap yahaan forces ki direction galat le lete hain (gravity ko outward maan lete hain) toh poora equation ulta ho jaata hai aur aapko galat \(v_{\min} = 0\) milta hai.

### Step 2 — Write radial equation at bottom
Neeche point par gravity outward (center se door) hoti hai, isliye tension ko extra centripetal force dena padta hai.

Formal:
$$T - mg = \frac{mv^2}{r}$$
Yahaan minimum speed nahi hoti kyunki \(T\) jitna bhi bada ho sakta hai.

### Step 3 — Use energy conservation between bottom and top
Bottom se top tak height change \(2r\) hoti hai. Total mechanical energy constant maano (no dissipation).

$$ \frac{1}{2}mv_b^2 = \frac{1}{2}mv_t^2 + mg(2r) $$

### Step 4 — Substitute minimum top speed
\(v_t = \sqrt{gr}\) daal do energy equation mein:
$$v_b = \sqrt{5gr}$$

### Step 5 — Generalise for any angle
Angle \(\theta\) par radial equation:
$$T + mg\cos\theta = \frac{mv^2}{r}$$
Jahaan \(\cos\theta = -1\) top ke liye, \(+1\) bottom ke liye.

### Step 6 — Critical condition for leaving the circle
Jab \(T = 0\) aur \(v^2 < gr\cos\theta\) ho jaaye, object parabolic trajectory par nikal jaata hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple top-point minimum**
*Given:* Radius \(r = 0.8\) m, \(g = 9.8\) m/s².
*Find:* Minimum speed at top for string.

Step 1: Top par equation likho \(mg = mv^2/r\).
Step 2: Cancel \(m\), solve \(v = \sqrt{gr}\).
Step 3: Number plug karo \(v = \sqrt{9.8 \times 0.8} = \sqrt{7.84}\).

*Why* yeh step kiya: Sirf gravity ko centripetal source maana kyunki tension minimum zero maanga.

**Final answer**  
**2.8 m/s**

*Reflection:* Yeh example basic force balance sikhaata hai; agar radius double kar do toh speed \(\sqrt{2}\) guna badhegi.

**Example 2 — Minimum launch speed from bottom**
*Given:* Same \(r = 0.8\) m.
*Find:* Minimum speed at bottom.

Step 1: Top speed \(\sqrt{gr}\) lo.
Step 2: Energy: \(\frac12 m v_b^2 = \frac12 m(gr) + mg(2r)\).
Step 3: Simplify \(v_b^2 = 5gr\).

*Why* yeh step kiya: Potential energy increase ko kinetic se cover karna zaroori hai.

**Final answer**  
**6.26 m/s**

*Reflection:* Energy link yahin se aata hai jo baad ke examples mein bhi repeat hoga.

**Example 3 — Critical angle for leaving path**
*Given:* Speed at bottom \(\sqrt{4gr}\).
*Find:* Angle jahaan string slack ho jaaye.

Step 1: Energy se \(v^2 = 4gr - 2gr(1-\cos\theta)\).
Step 2: Radial: \(mg\cos\theta = mv^2/r\).
Step 3: Solve \(\cos\theta = 2/3\).

*Why* yeh step kiya: Dono equations ko simultaneous solve karna padta hai.

**Final answer**  
**\(\theta = 48.2^\circ\)**

*Reflection:* Real problems mein yeh angle aapko dikhaata hai ki loop kitna complete kar paayega.

**Example 4 — Car in a death-well (loop-the-loop)**
*Given:* Loop radius 10 m, car mass 800 kg.
*Find:* Minimum speed at bottom for safe top passage.

Step 1: Top par \(v_t \ge \sqrt{gr}\).
Step 2: Energy difference \(2r\).
Step 3: \(v_b = \sqrt{5gr} = 22.14\) m/s.

*Why* yeh step kiya: Normal force bhi zero ho sakti hai jaise tension.

**Final answer**  
**22.14 m/s**

*Reflection:* Practical design mein safety factor ke liye 10-20 % zyada speed rakhte hain.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Gravity direction galat lena      | Top aur bottom confuse ho jaate hain        | Hamesha diagram mein center ki taraf arrow lagao |
| Energy term bhool jaana           | Height change 2r nahi  r maan lete hain     | Top-bottom vertical distance exactly 2r hota hai |
| Tension negative allow karna      | Equation solve karte waqt sign miss        | \(T \ge 0\) explicitly likho har baar        |
| Mass cancel karna bhoolna         | Numerical plug karte waqt m chalta rehta hai| Pehle equation simplify kar lo               |
| Angle \(\theta\) definition       | \(\theta\) vertical se count karna          | Top par \(\theta = 180^\circ\) ya \(\cos\theta = -1\) fix kar lo |

## 7. The textbook-precise statement
For an object of mass \(m\) attached to a string of length \(r\) moving in a vertical circle, the minimum speed at the highest point required to maintain contact is given by \(v = \sqrt{gr}\), derived from the radial component of Newton's second law under the constraint that tension \(T \ge 0\). At angle \(\theta\) measured from the lowest point, the general condition is \(v^2 \ge gr(\cos\theta - 2)\) when energy is conserved from the bottom. (Kleppner & Kolenkow, *An Introduction to Mechanics*, 2e, §6.3)

## 8. Visual — diagram or schematic
```
          T + mg (both down)
              ↓
     ● ←─────── top (v_min = √(gr))
    /         \
   /           \
  /             \
 ● bottom       ● side
   ↑ mg up       mg at angle
T - mg = mv²/r
```

Yeh diagram vertical circle dikhata hai jahaan top par dono forces center (neeche) ki taraf hain, bottom par tension upar aur gravity neeche.

## 9. The memory technique
**The hook** — Top par ball ko “gravity ne pakad liya” socho; agar speed kam hui toh gravity ball ko andar khinch leti hai jaise ek dost aapko circle mein khinch raha ho.

**What to overlearn** — \(v_t = \sqrt{gr}\), \(v_b = \sqrt{5gr}\), energy loss \(mg(2r)\).

**Spaced-repetition schedule** — 1 din baad quick derivation, 3 din baad ek example solve, 7 din baad trap table revise, 16 din baad full numerical set, 35 din baad textbook statement yaad karo.

**First-principles fallback** — Formula bhool jaaye toh free-body diagram banao, radial direction choose karo, Newton II likho, \(T=0\) set karke solve karo, phir energy se bottom connect karo.

## 10. What this unlocks
Yeh concept aapko non-uniform circular motion, banked curves with friction, aur orbital mechanics ke Hohmann transfers samajhne ke liye ready karta hai.

- Conical pendulum aur banked track problems
- Satellite geostationary orbit insertion burns
- Charged particle motion in magnetic fields with gravity
- Vehicle dynamics on hilly roads (crest aur valley)

## 11. Self-check — five questions, no answers
1. Ek 2 m radius wale loop mein top par minimum speed kitni honi chahiye?
2. Agar bottom speed \(\sqrt{6gr}\) ho toh kitne degree par string slack padegi?
3. Car loop mein normal force zero hone ka matlab kya hai physically?
4. Kyun energy conservation aur force equation dono ek saath use karne padte hain?
5. Agar friction add ho jaaye toh minimum speed badhegi ya ghattegi — reasoning do.