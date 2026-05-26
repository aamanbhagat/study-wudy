## 1. The one-sentence answer
**Momentum tabhi conserve hota hai jab system par net external force zero ho.**

Yeh rule seedha Newton ke laws se aata hai. Agar koi bahari force (jaise gravity, friction, ya thrust) system ke andar total momentum ko badal sakti hai, toh momentum sirf tabhi constant rehta hai jab woh force overall zero ho. Internal forces (jaise collision ke dauran do objects ke beech push) hamesha cancel ho jaate hain Newton’s third law ki wajah se, lekin external forces aise cancel nahi hote.

Aap jab ek closed system dekhte ho jismein koi net bahari force na ho, tab total momentum vector constant rehta hai. Rocket science mein yeh samajhna zaroori hai kyunki rockets continuously external forces (thrust aur gravity) ke saath interact karte hain.

> [!NOTE]
> Asal “aha” yeh hai: conservation sirf tab apply hota hai jab aap system boundary aise choose karo ki saare important forces internal ho jaayein; warna equation mein extra term dikhna hi padega.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 landing mein first stage par gravity aur atmospheric drag dono external forces hain, isliye momentum conservation directly stage separation ke liye nahi lagta; instead engineers net force wali equation solve karte hain.

ISRO ke Chandrayaan-3 lander descent mein lunar gravity ko external mana jaata hai, isliye total momentum conserve nahi hota aur thrust vectoring se compensate karna padta hai.

Particle physics detectors (jaise LHC ke CMS) mein colliding beams ke momentum tabhi conserve maana jaata hai jab magnetic fields aur beam-pipe forces ko carefully zero net external category mein daala jaaye.

Satellite formation flying missions (ESA’s PROBA-3) mein differential solar radiation pressure ek external force ban jaata hai, isliye relative momentum conservation sirf tabhi valid hota hai jab dono satellites ko ek single system maana jaaye aur pressure force internal ho.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Vector addition      | Momentum ek vector hai, isliye direction matter karta hai |
| Newton’s second law  | \( \vec{F}_{net} = \frac{d\vec{p}}{dt} \) yahin se shuru hota hai |
| Newton’s third law   | Internal forces cancel karne ke liye zaroori             |
| System boundary      | Kya external hai aur kya internal, yeh define karta hai   |

Agar upar wale concepts clear nahi hain toh pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Define the system clearly
System woh objects ka group hai jinke beech momentum exchange dekhna hai. Boundary aise draw karo ki external forces alag dikhein.  
Example: do billiard balls colliding — dono balls ko ek system lo.  
Formal: System \( S \) = collection of particles with total momentum \( \vec{P} = \sum_i m_i \vec{v}_i \).  
> [!WARNING] Boundary galat choose karne se ek force external dikhne lagegi jo asal mein internal thi aur conservation equation toot jaayega.

### Step 2 — Write Newton’s second law for the whole system
Har particle par \( \vec{F}_i = \frac{d\vec{p}_i}{dt} \). Total karne par \( \sum \vec{F}_i = \frac{d\vec{P}}{dt} \).  
Example: ek block table par slide kar raha hai — friction external force hai.  
Formal: \( \vec{F}_{ext,net} = \frac{d\vec{P}}{dt} \).  
> [!WARNING] Students aksar internal forces ko bhi sum mein daal dete hain, jo double-counting create karta hai.

### Step 3 — Apply Newton’s third law to internal forces
Internal forces equal aur opposite hote hain, isliye unka vector sum zero hota hai.  
Example: do masses spring se jude hain — spring force dono par opposite.  
Formal: \( \vec{F}_{ij} = -\vec{F}_{ji} \) ⇒ \( \sum_{internal} \vec{F} = 0 \).  
> [!WARNING] Agar forces non-central hain (jaise magnetic fields mein) toh third law thoda modify hota hai aur momentum angular form mein jaata hai.

### Step 4 — Identify when net external force vanishes
Agar \( \vec{F}_{ext,net} = 0 \), tab \( \frac{d\vec{P}}{dt} = 0 \) ⇒ \( \vec{P} = \) constant.  
Example: space mein do satellites kisi thruster ke bina collide kar rahe hain.  
Formal: \( \vec{F}_{ext,net} = 0 \implies \vec{P}(t) = \vec{P}(0) \).  
> [!WARNING] Zero force matlab sirf net zero; ek taraf gravity aur doosri taraf normal force cancel kar sakte hain.

### Step 5 — Write the conservation statement
Jab net external force zero ho, total linear momentum vector constant rehta hai.  
Formal: \( \vec{P}_{total} = \) constant (vector equation, teen components).  
> [!WARNING] Direction bhool jaane se sirf magnitude conserve maan loge jo galat hai.

### Step 6 — Extend to variable-mass systems (rocket preview)
Rocket mein mass flow hota hai, isliye equation ban jaati hai \( m\frac{dv}{dt} = -v_{ex}\frac{dm}{dt} + F_{ext} \).  
Formal: \( \frac{d}{dt}(m\vec{v}) = \vec{F}_{ext} + \vec{v}_{rel}\frac{dm}{dt} \).  
> [!WARNING] Variable mass ko galat handle karne se thrust term miss ho jaata hai.

## 5. Worked examples — har step show karo

**Example 1 — Two ice skaters pushing**
*Given:* 60 kg aur 80 kg skaters, frictionless ice par khade, dono ek dusre ko 10 N se 2 s tak push karte hain.  
*Find:* Final velocities.  
Pehle system define: dono skaters. External force = 0 (friction negligible).  
\( \vec{F}_{ext,net} = 0 \implies \vec{P}_{initial} = \vec{P}_{final} \).  
Initial momentum = 0.  
60 kg wale ki velocity \( v_1 \), 80 kg wale ki \( -v_2 \):  
\( 60v_1 - 80v_2 = 0 \).  
Force se acceleration nikaal: impulse = 20 Ns dono taraf opposite.  
\( 60v_1 = 20 \implies v_1 = \frac{1}{3} \) m/s.  
**Final answer**  
\( v_1 = 0.333 \) m/s right, \( v_2 = 0.25 \) m/s left.  
*Reflection:* Frictionless surface ne external force zero kiya, isliye momentum conserve hua; real ice par thoda friction hota toh net force non-zero hota.

**Example 2 — Ball hitting wall with friction**
*Given:* 0.2 kg ball, 5 m/s se vertical wall par lagta hai aur 3 m/s se wapas aata hai.  
*Find:* Change in momentum aur average force (ignore gravity).  
System = ball only. Wall ki normal force external hai.  
\( \Delta p_x = 0.2(-3) - 0.2(5) = -1.6 \) kg m/s.  
Time of contact 0.01 s maana toh \( F_{avg} = \frac{-1.6}{0.01} = -160 \) N.  
**Final answer**  
Momentum change = −1.6 kg m/s (wall ne diya).  
*Reflection:* Wall external force de rahi thi, isliye ball ka momentum conserve nahi hua.

**Example 3 — Two blocks with spring, no friction**
*Given:* 2 kg aur 3 kg blocks, spring se jude, frictionless table par, initial velocities 4 m/s aur 0.  
*Find:* Maximum spring compression.  
External force = 0. Momentum conserve: \( 2\times4 + 3\times0 = 5v_{cm} \implies v_{cm} = 1.6 \) m/s.  
CM frame mein kinetic energy spring mein jaati hai.  
**Final answer**  
Maximum compression jab relative velocity zero ho jaaye.  
*Reflection:* Frictionless table ne conservation allow kiya; energy alag se conserve hoti hai.

**Example 4 — Exploding projectile in air**
*Given:* 5 kg projectile 100 m/s se 30° angle par ja raha hai, 100 m height par explode hota hai aur do 2 kg aur 3 kg tukdon mein bant jaata hai.  
*Find:* Tukdon ke velocity range just after explosion (external force = gravity).  
Explosion ke turant baad gravity impulse negligible.  
Momentum x-component conserve: \( 5\times100\cos30^\circ = 2v_{2x} + 3v_{3x} \).  
**Final answer**  
x-momenta ka weighted average projectile ke original momentum ke barabar.  
*Reflection:* Gravity continuously external force de raha tha lekin short explosion duration mein uska effect chhota pada.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| External force ko internal samajhna | Boundary galat draw karna                   | Pehle clearly likho “system ke bahar kya hai” |
| Sirf magnitude conserve maanna    | Vector nature bhool jaana                   | Hamesha teen components alag-alag check karo |
| Friction ko hamesha external maanna | Table ko system se alag nahi sochte         | Agar dono blocks system hain toh friction internal ho sakti hai |
| Time interval lamba lena          | Impulse of external force badh jaata hai    | Sirf instantaneous ya short Δt ke liye apply karo |
| Variable mass system mein thrust bhoolna | Rocket equation nahi yaad                   | dm/dt term alag se likho                     |
| 1-D collision mein y-component bhoolna | Sirf x dekh rahe hote hain                 | Vector likh ke check karo                    |

## 7. The textbook-precise statement
When the net external force acting on a system of particles is zero, the total linear momentum of the system remains constant in time. That is, if \( \vec{F}_{ext}^{net} = \sum_i \vec{F}_i^{ext} = 0 \), then \( \frac{d\vec{P}}{dt} = 0 \), hence \( \vec{P}(t) = \vec{P}(0) \). Here \( \vec{P} = \sum_i m_i\vec{v}_i \) and the internal forces are assumed to obey Newton’s third law in its strong form. (Taylor, *Classical Mechanics*, 1e, §3.3)

## 8. Visual — diagram or schematic
```text
   External world
   (gravity, friction)
         ↓   ↑
   ------------------  ← system boundary
   |  m1   →←   m2   |   internal forces cancel
   |  (spring)       |
   ------------------
   Net F_ext = 0  ⇒  P_total = constant
```

## 9. The memory technique
1. **The hook** — “No outside push, momentum stays put” — ek sealed box socho jismein billiard balls khel rahe hain; box ko koi nahi hila raha.
2. **What to overlearn** — \( \vec{F}_{ext,net} = \frac{d\vec{P}}{dt} \) aur “jab zero toh constant”.
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Newton II likho, internal forces cancel karo, net external zero dekho.

## 10. What this unlocks
Yeh condition aapko closed-system collisions, rocket equation derivation, aur center-of-mass motion samajhne deta hai.  
- Next: variable-mass systems aur thrust  
- Center-of-mass reference frame problems  
- Impulse-momentum theorem with external forces  
- Multi-body gravitational problems (restricted three-body)

## 11. Self-check — five questions, no answers
1. Ek 2 kg aur 3 kg block collision kar rahe hain frictionless surface par. External force zero hai? Momentum conserve hoga?
2. Ek ball vertical wall se takraati hai. Kaunsa component conserve hota hai?
3. Rocket equation mein thrust term kis wajah se aata hai jab momentum conservation apply karte hain?
4. Agar do cars collide kar rahe hain aur road friction present hai, system kis tarah choose karoge taaki momentum conserve ho?
5. Ek exploding shell air mein girta hai. Explosion ke turant baad momentum conserve hota hai ya nahi? Kyun?