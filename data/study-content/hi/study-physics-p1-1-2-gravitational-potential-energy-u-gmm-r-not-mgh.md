## 1. The one-sentence answer
**Gravitational potential energy is defined as U = −GMm/r because we choose zero at infinity, making the expression valid at all distances rather than only near Earth’s surface.**

Yeh formula tab use hoti hai jab aap do masses ke beech gravitational interaction ko exact taur par model karna chahte ho. mgh wali approximation tabhi kaam karti hai jab r Earth ke radius se bahut kam badle, lekin spaceflight aur orbital mechanics mein distance badal jaati hai, isliye potential infinity se integrate karke nikaalna padta hai. Negative sign ka matlab yeh hai ki system bound hai aur energy zero se neeche hai.

> [!NOTE]
> Sabse badi aha yeh hai ki potential energy negative ho sakti hai — yeh galti nahi, balki reference choice ka natija hai jo infinity par zero set karta hai.

## 2. Why this matters — concrete and current
SpaceX Starship aur NASA Artemis missions mein lunar transfer trajectories calculate karte waqt engineers exactly U = −GMm/r use karte hain taaki Earth-Moon-Sun three-body effects sahi se model ho sakein.  
ISRO ke Chandrayaan-2 orbiter ke insertion burns mein yeh potential energy difference se hi delta-v budget nikaala gaya tha, kyunki 100 km lunar orbit tak potential mgh se kaafi alag padta hai.  
LIGO-Virgo gravitational wave detections mein binary black hole inspirals ke energy loss curves U = −GMm/r par based effective-one-body models se match kiye jaate hain.  
GPS satellite clocks mein relativistic time dilation correction ke liye gravitational potential difference −GMm/r se nikaala jaata hai, warna position error roz 10 km se zyada ho jaata.  
Exoplanet transit spectroscopy mein stellar reflex motion ke radial velocity semi-amplitude mein host star ka gravitational potential energy term directly −GMm/r se aata hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Newton’s law of gravitation F = −GMm/r² | Force se potential nikaalne ke liye integrate karna padega |
| Work-energy theorem  | Potential energy work ke negative gradient ke roop mein define hoti hai |
| Definite integral from ∞ to r | Reference point infinity par zero set karne ke liye zaroori |
| Vector vs scalar fields | Potential scalar hai, force vector, isliye gradient lena padta hai |

Agar integral ya work-energy theorem abhi clear nahi, toh pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Force law as starting point
Gravity ki force do masses ke beech F = −GMm/r² radially andar ki taraf hoti hai. Iska matlab yeh hai ki koi bhi displacement dr ke against kaam karna padega jab aap mass ko door le ja rahe ho.

### Step 2 — Potential energy definition via work
Potential energy change ΔU = −W_gravity hota hai jab object ko reference se final position tak le jaayein. Isliye U(r) − U(∞) = −∫_∞^r F·dr.

### Step 3 — Reference choice at infinity
Hum U(∞) = 0 set karte hain kyunki infinity par force zero ho jaati hai aur koi interaction nahi bachti. Isse U(r) = −∫_∞^r (−GMm/r′²) dr′.

### Step 4 — Performing the integral
Integral solve karne par U(r) = −GMm/r milta hai. Display math:
$$U(r) = -\frac{GMm}{r}.$$

### Step 5 — Negative sign physical meaning
Negative value ka matlab system se energy nikaalni padegi taaki masses ko infinity tak alag kiya ja sake; yeh bound gravitational systems ke liye natural hai.

### Step 6 — Recovering mgh approximation
Jab r = R_E + h aur h ≪ R_E, Taylor expansion se U(r) ≈ −GMm/R_E + (GMm/R_E²)h, jisme constant term ignore karne par mgh milta hai.

> [!WARNING]
> Agar aap reference point surface par zero kar dete ho toh negative sign aur infinity behaviour dono kho jaate hain, jo orbital escape calculations mein galat result deta hai.

## 5. Worked examples — har step show karo

**Example 1 — Escape velocity from Earth surface**  
*Given:* M_E = 5.97 × 10²⁴ kg, R_E = 6.37 × 10⁶ m, m = 1 kg.  
*Find:* Minimum speed at surface so U + K = 0 at infinity.  
Conservation: ½mv² − GMm/R_E = 0.  
v = √(2GM/R_E).  
*Why:* Total mechanical energy zero set karna zaroori hai taaki infinity par kinetic zero ho.  
**v = 11.2 km/s**

*Reflection:* Yeh example sirf energy balance dikhata hai; direction matter nahi karti kyunki potential scalar hai.

**Example 2 — Potential difference between two altitudes**  
*Given:* r₁ = 7000 km, r₂ = 8000 km, M_E.  
*Find:* ΔU for 1000 kg satellite.  
U₂ − U₁ = −GMm(1/r₂ − 1/r₁).  
*Why:* Direct subtraction kyunki constant factor cancel ho jaata hai.  
**ΔU = 1.07 × 10⁹ J**

*Reflection:* mgh se alag kyunki dono altitudes pe g effective change hota hai.

**Example 3 — Circular orbit energy**  
*Given:* r orbit.  
*Find:* Total E = K + U.  
K = GMm/(2r), U = −GMm/r, E = −GMm/(2r).  
*Why:* Virial theorem se K = −U/2 aata hai.  
**E = −GMm/(2r)**

*Reflection:* Negative total energy bound orbit confirm karti hai.

**Example 4 — Transfer from LEO to GEO**  
*Given:* r_LEO = 6771 km, r_GEO = 42164 km.  
*Find:* Energy needed per kg.  
ΔU + ΔK calculate karke Hohmann burn budget nikaalte hain.  
*Why:* Dono orbits par total energy alag-alag hoti hai.  
**Required ΔE ≈ 23.6 MJ/kg**

*Reflection:* Real missions mein yeh value atmospheric drag aur third-body perturbations se thodi adjust hoti hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Sign of U galat lagaana     | mgh positive hone ki aadat                  | Hamesha infinity reference yaad rakho        |
| r = 0 par infinity ignore karna | Division by zero soch ke skip kar dete hain | r > 0 physical constraint yaad rakho         |
| mgh ko universal maan lena  | School level approximation yaad rehti hai   | h/R_E < 0.01 tabhi use karo                  |
| Force aur potential mix karna | Gradient bhool jaate hain                   | F = −dU/dr explicitly check karo             |
| Reduced mass bhool jaana    | Do bodies dono move kar rahe hon            | μ = m₁m₂/(m₁+m₂) use karo jab M ≈ m na ho    |
| Units mismatch              | GMm/r ke units energy ke nahi lagte         | Joule mein convert karke verify karo         |

## 7. The textbook-precise statement
The gravitational potential energy of a two-body system consisting of point masses M and m separated by distance r is given by  
$$U(r) = -\frac{GMm}{r}, \qquad r > 0,$$  
where the zero of potential is taken at infinite separation. This expression is obtained by integrating the conservative gravitational force field  
$$\mathbf{F}(\mathbf{r}) = -\frac{GMm}{r^2}\hat{\mathbf{r}}$$  
from infinity to r, under the assumption that the bodies are spherically symmetric or point-like and that no other forces act. (Kleppner & Kolenkow, *An Introduction to Mechanics*, 2e, §9.3).

## 8. Visual — diagram or schematic
```text
U(r)
 ^
 |                 zero at ∞
 |   ────────────────────────────────→ r
 |          /
 |         /
 |        /   U = -GMm/r
 |       /
 |      /
 |____/_______________________________
      R_E   orbit   GEO
```
Curve negative hai, r = 0 par −∞, r → ∞ par 0 ki taraf asymptotically jaati hai. Slope −dU/dr force deta hai.

## 9. The memory technique
1. **The hook** — Socho potential ek “gravity well” hai jismein aap infinity se neeche girte ho; negative sign well ki depth dikhata hai.  
2. **What to overlearn** — U = −GMm/r, F = −dU/dr, aur E_total < 0 for bound orbits.  
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.  
4. **First-principles fallback** — Force se shuru karo, infinity se integrate karo, reference zero yaad rakho.

## 10. What this unlocks
Yeh formula aapko orbital mechanics, escape trajectories, aur gravitational two-body problem ke liye ready karta hai.  
- Kepler’s laws derivation  
- Hohmann transfer orbits  
- Reduced-mass two-body problem  
- Effective potential in central-force motion  
- Black-hole event-horizon calculations (Schwarzschild metric limit)

## 11. Self-check — five questions, no answers
1. 500 km altitude par ek satellite ke liye U = −GMm/r aur mgh mein kitna percent difference hai?  
2. Agar potential zero surface par set kar dein toh escape velocity formula kaise badlegi?  
3. Do bodies ke beech total energy negative hone ka kya matlab hai?  
4. Circular orbit mein kinetic energy aur potential energy ka ratio kya hai?  
5. Ek student ne U = +GMm/r likha; kaunsa step galat hua aur result kis physical situation mein galat padega?