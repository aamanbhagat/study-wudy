## 1. The one-sentence answer
**Work done by a variable force equals the definite integral of force with respect to displacement along the path.**

Aap jab force constant nahi hoti, tab simple \(W = F \cdot d\) formula kaam nahi karta. Force position ke saath badalti hai, isliye aap displacement ko chhote-chhote segments mein todte ho aur har segment par \(F(x) \Delta x\) calculate karke un sabko jod dete ho. Yeh jodna limit mein jaakar integration ban jaata hai.

Iska matlab yeh hai ki total work uss area ke barabar hota hai jo force-displacement graph ke neeche banta hai. Jab force vector bhi direction badalta hai, tab dot product ke saath line integral lagta hai.

> [!NOTE]
> Sabse badi aha yeh hai: integration sirf “area nikaalna” nahi, balki continuously badalte force ko hisaab dene ka rigorous tareeka hai — ek hi equation se aap spring, gravity, thrust profile sab handle kar sakte ho.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 ke first-stage landing burn mein thrust profile time ke saath badalta hai; engineers variable-thrust equation ko integrate karke remaining propellant mass aur touchdown velocity nikaalte hain.

ISRO ke Reusable Launch Vehicle technology demonstrator ke wing actuators mein variable aerodynamic force ka kaam hota hai; integration se total energy loss calculate kiya jaata hai jo thermal protection system design ko affect karta hai.

James Webb Space Telescope ke sunshield deployment mechanism mein spring forces position ke saath change hote hain; NASA ne finite-element simulation mein work integral use karke deployment torque budget banaya.

Semiconductor wafer steppers mein variable reluctance motors ka force-position curve integration se energy per step nikaala jaata hai, jo throughput aur thermal drift dono ko control karta hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Definition of work for constant force | Baseline samajhna zaroori hai jisse variable case ko generalize kar sakein |
| Derivative as instantaneous rate | Force ko \(F(x)\) function ki tarah likhne ke liye        |
| Definite integral as limit of Riemann sums | Work ko chhote displacement pieces ka sum banane ke liye  |
| Dot product of vectors | Jab force aur displacement aligned na hon                 |

Agar upar ke concepts mein se koi weak hai to pehle usko revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Constant force gives simple multiplication
Constant force mein work sirf \(F \times d\) hota hai. Ek concrete example: 10 N ki constant force se 3 m move karne par work = 30 J. Formal statement: \(W = \vec{F} \cdot \Delta \vec{x}\).

> [!WARNING]
> Agar aap yahin galti se soch lein ki “force thodi badal rahi hai to bhi average le lenge”, to baad mein variable case mein sign aur direction dono kharab ho jaayenge.

### Step 2 — Break path into tiny segments
Jab force badalti hai, aap path ko \(N\) chhote \(\Delta x_i\) pieces mein todte ho. Har piece par force lagbhag constant maani ja sakti hai. Work ka total = \(\sum F(x_i) \Delta x_i\).

### Step 3 — Take the limit as segments become infinitesimal
\(\Delta x_i \to 0\) aur \(N \to \infty\) karne par sum ek definite integral ban jaata hai: \(W = \int_{x_1}^{x_2} F(x) \, dx\).

### Step 4 — Include direction with dot product
Agar force vector hai, to \(W = \int_C \vec{F} \cdot d\vec{x}\). Yeh line integral hai.

### Step 5 — Textbook-grade statement
Agar \(F(x)\) continuous hai \([a,b]\) par, to work done by force jab particle \(a\) se \(b\) tak move kare, woh \(W = \int_a^b F(x) \, dx\) hai (one dimension).

## 5. Worked examples — har step show karo

**Example 1 — Linear spring**
*Given:* Spring constant \(k = 200\) N/m, displacement from \(x=0\) to \(x=0.5\) m.  
*Find:* Work done by restoring force.  

\(F(x) = -kx\)  
\(W = \int_0^{0.5} (-200x) \, dx = -200 \left[ \frac{x^2}{2} \right]_0^{0.5} = -200 \times 0.125 = -25\) J  
*Why:* Negative sign dikhata hai force displacement ke against hai.  
**Final answer:** -25 J  
*Reflection:* Linear force ka integral quadratic hota hai — potential energy ka seedha source.

**Example 2 — Gravity varying with height (near Earth approximation)**
*Given:* \(F(y) = -mg\), constant actually, but treat as variable to practice.  
*Find:* Work from \(y=0\) to \(y=10\) m.  
\(W = \int_0^{10} (-mg) \, dy = -mg [y]_0^{10} = -mg \times 10\)  
**Final answer:** \(-10mg\) J  
*Reflection:* Constant force bhi integral se nikalti hai, baseline check.

**Example 3 — Rocket thrust profile**
*Given:* Thrust \(T(x) = 5000 + 300x\) N (x in km), burnout at 50 km.  
*Find:* Work done by engine.  
\(W = \int_0^{50} (5000 + 300x) \, dx = [5000x + 150x^2]_0^{50} = 250000 + 375000 = 625000\) kJ  
**Final answer:** 625 MJ  
*Reflection:* Linear thrust profile ka integral quadratic term deta hai — mass-flow change model karta hai.

**Example 4 — Force at an angle changing with position**
*Given:* \(\vec{F} = (3x, 4)\) N, along x-axis from 0 to 2 m.  
*Find:* Work.  
\(W = \int_0^2 3x \, dx = \frac{3}{2}x^2 \big|_0^2 = 6\) J  
**Final answer:** 6 J  
*Reflection:* Sirf x-component contribute karti hai jab motion x-axis par ho.

## 6. Common traps and how to avoid them

| Trap                          | Why it happens                              | How to avoid it                              |
|-------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting negative sign in restoring forces | Students sirf magnitude yaad rakhte hain    | Hamesha \(F(x)\) ka sign check karo          |
| Using indefinite integral without limits | Limits bhool jaate hain                     | Definite integral likho with limits          |
| Ignoring path when force is non-conservative | Sochte hain sirf endpoints matter karte hain | Line integral ya path specify karo           |
| Treating \(\Delta x\) as constant in sum    | Riemann sum ka limit nahi lete              | \(\Delta x \to dx\) likho aur integrate karo |
| Confusing work by force vs change in KE     | Work-energy theorem jaldi apply kar dete hain | Pehle work nikaalo, phir theorem lagao       |

## 7. The textbook-precise statement
If \(F\) is a continuous function on the closed interval \([a,b]\), the work done by the force \(F(x)\) acting in the direction of the x-axis as its point of application moves from \(x=a\) to \(x=b\) is given by
\[
W = \int_a^b F(x)\, dx.
\]
(Halliday, Resnick & Walker, *Fundamentals of Physics*, 12e, §7-4)

## 8. Visual — diagram or schematic
```
F(x)
 ^
 |      /|
 |     / |
 |    /  | area = work
 |   /   |
 |  /    |
 | /_____|
 +---------→ x
 a         b
```
Area under the \(F(x)\) curve between \(a\) and \(b\) equals work done.

## 9. The memory technique
**The hook:** Socho force graph ek “energy landscape” hai; integral neeche ka area = total “kaam jo force ne kiya”.

**What to overlearn:**  
\(W = \int_a^b \vec{F} \cdot d\vec{x}\)  
Spring: \(W = -\frac12 kx^2\)

**Spaced-repetition schedule:** 1 din, 3 din, 7 din, 16 din, 35 din.

**First-principles fallback:** Riemann sum se shuru karo → limit lo → integral ban jaayega.

## 10. What this unlocks
Yeh technique aapko potential energy functions, conservative forces, aur power calculations tak le jaati hai.

- Potential energy definition via \(U = -W_\text{conservative}\)
- Work-energy theorem for variable forces
- Line integrals in central-force problems (orbits)

## 11. Self-check — five questions, no answers
1. Ek spring \(k=150\) N/m ko 0.4 m compress karne mein kitna work lagega?
2. Jab force aur displacement hamesha perpendicular hon, tab work kyun zero hota hai — integral kya deta hai?
3. \(F(x)=x^2\) ke liye 1 se 3 tak work nikaalo aur uska sign interpret karo.
4. Non-conservative force ke liye path alag-alag lene par work alag kyun aata hai?
5. Rocket equation mein variable mass ko work integral mein kaise model karoge?