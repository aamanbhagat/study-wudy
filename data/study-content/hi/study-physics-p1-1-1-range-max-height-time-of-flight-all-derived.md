## 1. The one-sentence answer
**Range, maximum height, and time of flight are the three closed-form expressions that completely describe the landing behaviour of a projectile launched with initial speed \(u\) at angle \(\theta\) under constant gravity.**

Iska matlab yeh hai ki aapko har baar numerical integration nahi karna padta. Sirf teen formulas se aap bata sakte ho ki goli kitni der udegi, kitni unchi jaayegi, aur kitni door giri. Yeh formulas velocity ke horizontal aur vertical components ko alag-alag treat karke aate hain, kyunki gravity sirf vertical direction mein kaam karti hai.

Aap in formulas ko ek baar derive kar lo, phir unko yaad rakhna bahut easy ho jaata hai kyunki har quantity ka physical meaning clear rehta hai. Time of flight vertical motion ka zero-crossing hai, maximum height vertical velocity ke zero hone ka point hai, aur range usi time ko horizontal velocity se multiply karke milta hai.

> [!NOTE]
> Sabse badi "aha" yeh hai ki dono components independent hain — horizontal velocity constant rehti hai, vertical velocity linearly badalti hai — isliye teen alag-alag simple equations se poora trajectory lock ho jaata hai.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 booster re-entry trajectory planning mein engineers exactly inhi formulas ke variants use karte hain taaki grid fins ka angle decide kar sakein before atmospheric entry. ISRO ke PSLV missions bhi launch azimuth aur pitch profile choose karte waqt time-of-flight aur range expressions ko validate karte hain ground-track prediction ke liye.

Artillery guidance systems jaise M982 Excalibur round mein on-board computer real-time wind correction ke saath range formula ko adjust karta hai, jisse circular error probable 10 m se kam ho jaata hai. Cricket aur basketball coaching analytics mein bhi coaches projectile equations se release angle optimise karte hain, kyunki ball ka hang time aur landing spot directly inhi expressions se nikalte hain.

Natural phenomena mein, volcanic ejecta ke deposition range aur maximum height predict karne ke liye volcanologists yahi equations use karte hain, jisse lahar flow modelling aur evacuation zones decide hote hain.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector components        | Initial velocity ko x aur y directions mein todna zaroori hai |
| Kinematic equations      | Constant acceleration (g) ke liye \(v = u + at\), \(s = ut + \frac12 at^2\) chahiye |
| Quadratic equation       | Vertical displacement zero karne par quadratic solve karna padta hai |
| Trigonometric identities | \(\sin 2\theta = 2\sin\theta\cos\theta\) range formula ko simplify karta hai |

Agar vector resolution ya basic kinematic equations weak hain, to unhe pehle solid kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Split velocity into independent directions
Horizontal velocity constant rehti hai kyunki koi force us direction mein nahi hai. Vertical velocity gravity se linearly ghat-ti hai. Iska concrete example: 20 m/s at 30° launch karo to \(u_x = 20\cos30^\circ \approx 17.32\) m/s constant rahega, \(u_y = 20\sin30^\circ = 10\) m/s se shuru hoga.

Formal statement:
\[
u_x = u\cos\theta, \quad u_y = u\sin\theta
\]

> [!WARNING]
> Agar aap components galat sign ke saath le lete ho (jaise dono positive maan lete ho bina direction samjhe), to maximum height negative aa jaayega aur saari calculation toot jaayegi.

### Step 2 — Write separate kinematic equations
x-motion: \(x = u_x t\)
y-motion: \(y = u_y t - \frac12 g t^2\)

Yeh step sirf isliye zaroori hai kyunki gravity sirf y ko affect karti hai.

### Step 3 — Time of flight from y = 0
Projectile wapas y = 0 par aata hai jab launch aur landing height same ho. Equation \(u_y t - \frac12 g t^2 = 0\) deta hai \(t(u_y - \frac12 g t) = 0\). Non-trivial root:
\[
T = \frac{2u\sin\theta}{g}
\]

> [!WARNING]
> Zero root ko ignore mat karna; woh launch instant hai, lekin agar aap dono roots mix kar doge to time negative aa sakta hai.

### Step 4 — Maximum height at vertical velocity = 0
Vertical velocity \(v_y = u_y - g t\) zero hoti hai jab \(t = u_y/g\). Us time ko y equation mein daalo:
\[
H = \frac{u^2\sin^2\theta}{2g}
\]

### Step 5 — Range by substituting T into x equation
\[
R = u_x \cdot T = (u\cos\theta)\cdot\frac{2u\sin\theta}{g} = \frac{u^2\sin 2\theta}{g}
\]

### Step 6 — Textbook-grade summary
In teeno expressions mein \(u\) aur \(\theta\) sirf launch parameters hain; \(g\) constant mana jaata hai. Yeh derivation sirf constant gravity aur flat ground ke liye valid hai.

## 5. Worked examples — har step show karo

**Example 1 — Basic 45° launch**
*Given:* \(u = 20\) m/s, \(\theta = 45^\circ\), \(g = 10\) m/s²  
*Find:* T, H, R  

Pehle components: \(u_x = 20/\sqrt{2} = 10\sqrt{2}\), \(u_y = 10\sqrt{2}\).  
Time of flight: \(T = 2\times10\sqrt{2}/10 = 2\sqrt{2}\) s.  
*Why:* Vertical zero displacement wala quadratic solve kiya.  
Maximum height: \(H = (10\sqrt{2})^2/(2\times10) = 10\) m.  
*Why:* \(v_y = 0\) wala time use kiya.  
Range: \(R = 10\sqrt{2}\times2\sqrt{2} = 40\) m.  
**Final answer: T = 2.828 s, H = 10 m, R = 40 m**  
*Reflection:* 45° case sabse simple hai kyunki sin2θ = 1; yeh maximum range ka benchmark ban jaata hai.

**Example 2 — 30° launch on Earth**
*Given:* \(u = 40\) m/s, \(\theta = 30^\circ\), \(g = 9.8\) m/s²  
*Find:* T, H, R  

\(u_x = 34.64\) m/s, \(u_y = 20\) m/s.  
\(T = 2\times20/9.8 \approx 4.08\) s.  
\(H = 400/(2\times9.8) \approx 20.41\) m.  
\(R = 34.64\times4.08 \approx 141.3\) m.  
**Final answer: T ≈ 4.08 s, H ≈ 20.41 m, R ≈ 141.3 m**  
*Reflection:* Angle kam hone se height ghat-ti hai lekin time aur range ka balance change hota hai.

**Example 3 — Different planet (Moon)**
*Given:* \(u = 20\) m/s, \(\theta = 45^\circ\), \(g = 1.62\) m/s²  
*Find:* R  

\(T = 2\times14.14/1.62 \approx 17.46\) s, \(R = 14.14\times17.46 \approx 247\) m.  
**Final answer: R ≈ 247 m**  
*Reflection:* g kam hone se range aur time dono badhte hain linearly aur quadratically.

**Example 4 — Find angle for given range**
*Given:* \(u = 30\) m/s, R = 60 m, g = 10 m/s²  
*Find:* \(\theta\)  

\(60 = 900\sin2\theta/10 \implies \sin2\theta = 2/3 \implies 2\theta \approx 41.81^\circ \implies \theta \approx 20.9^\circ\).  
**Final answer: \(\theta \approx 20.9^\circ\)**  
*Reflection:* Inverse trigonometric step dikhata hai ki real design mein angle solve karna padta hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using T = u sinθ/g instead of 2u sinθ/g | Half time (ascent only) bhool jaate hain    | Always check landing height = launch height |
| Forgetting cosθ in range    | Sirf vertical motion yaad rehta hai         | Range = ux × T likh ke verify karo           |
| g = 10 ya 9.8 mix karna     | Approximation habit                         | Problem statement mein g ki value note karo  |
| Negative height answer      | Sign convention galat                       | Upward positive lo, g negative               |
| 2θ wala identity bhoolna    | Range formula direct yaad karte hain        | Derivation step 5 ko har baar repeat karo    |

## 7. The textbook-precise statement
Under constant gravitational acceleration \(g\) acting vertically downward and neglecting air resistance, a particle launched from the origin with speed \(u\) at angle \(\theta\) to the horizontal follows a parabolic trajectory. The time of flight, maximum height, and horizontal range on level ground are respectively
\[
T = \frac{2u\sin\theta}{g}, \quad H = \frac{u^2\sin^2\theta}{2g}, \quad R = \frac{u^2\sin 2\theta}{g}.
\]
These expressions assume launch and landing occur at the same vertical coordinate and \(g\) is uniform (Halliday, Resnick & Walker, *Fundamentals of Physics*, 12e, §4-3).

## 8. Visual — diagram or schematic
```
          H (max height)
             ^
            / \
           /   \
          /     \
 launch   /       \  landing
   o-----/---------\-----o
     ux        R
     uy (initial)
Vertical axis: y, horizontal: x
Trajectory equation: y = x tanθ − (g x²)/(2 u² cos²θ)
```

## 9. The memory technique
1. **The hook** — Imagine a cricket ball tossed at 45°; the path looks like a perfect symmetric rainbow whose top is H, total width R, and flight time T.
2. **What to overlearn** — \(T = 2u\sin\theta/g\), \(H = u^2\sin^2\theta/(2g)\), \(R = u^2\sin2\theta/g\).
3. **Spaced-repetition schedule** — Review formulas after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Components nikaalo, y = 0 solve karo for T, vy = 0 solve karo for H, ux × T for R.

## 10. What this unlocks
Yeh expressions aapko orbital mechanics ke basic two-body trajectories, rocket staging timing, aur even Monte-Carlo trajectory simulations ke liye foundation dete hain.

- Vacuum trajectory models for sounding rockets
- Optimal launch angle derivation (45° maximum range)
- Adding drag perturbation later in aerodynamics courses

## 11. Self-check — five questions, no answers
1. 25 m/s at 60° launch karne par time of flight kya hoga agar g = 10 m/s²?
2. Maximum range kis angle par hoti hai aur kyun?
3. Agar landing height launch height se 5 m upar ho to T ka expression kaise badlega?
4. Range formula mein sin2θ kyun aata hai — iska geometric matlab kya hai?
5. Ek student ne T = u sinθ/g likha; uski calculation mein exactly kya galti hai aur usse kaunsa physical quantity galat nikalega?