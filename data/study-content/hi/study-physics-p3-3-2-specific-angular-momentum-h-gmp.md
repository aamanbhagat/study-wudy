## 1. The one-sentence answer
**Specific angular momentum ka magnitude h = √(GM p) deta hai, jahaan p semi-latus rectum hai aur yeh relation sirf inverse-square gravity fields mein valid hai.**

Yeh formula directly aata hai angular momentum conservation se jab aap orbit equation derive karte ho. r aur v ke cross product se h vector nikalta hai, uska magnitude constant rehta hai, aur conic-section geometry usko p ke saath link kar deti hai. Iska matlab yeh hai ki ek hi h value se aap bata sakte ho kitna “twist” ya areal velocity orbit mein hai, bina poora velocity vector jaane.

Agar aap p ko a(1-e²) se replace kar do toh h = √[GM a(1-e²)] ban jaata hai elliptical orbits ke liye. Yeh relation aapko orbit size aur shape dono se angular momentum connect karne deta hai.

> [!NOTE]
> Sabse badi aha yeh hai ki h sirf shape aur size par depend karta hai, energy (ya semi-major axis) se independent hai — isliye same h wale do alag-alag energy orbits possible hain.

## 2. Why this matters — concrete and current
SpaceX Starlink constellation mein satellites ko precise h value assign karke same altitude par alag inclinations maintain kiye jaate hain; h galat hua toh plane-keeping burns mein 30-40% extra propellant kharch hota hai.

ISRO ka Gaganyaan re-entry capsule trajectory design mein h = √(GM p) use karke lift-to-drag ratio fix kiya jaata hai taaki landing footprint 10 km se kam rahe.

NASA’s Parker Solar Probe ke Venus gravity-assist maneuvers mein h ko √(GM p) se calculate karke periapsis altitude decide karte hain; 2021 ke flyby mein yeh value 2.4 × 10⁵ km²/s thi.

ESA’s Sentinel-1 SAR satellites daily repeat ground-track achieve karne ke liye h ko sub-metre precision se lock karte hain; yeh value directly ground-track drift equation mein jaati hai.

Natural phenomenon mein Halley’s comet ka h = √(GM p) ≈ 1.4 × 10⁶ km²/s hai, jo uske 76-year period aur high eccentricity dono ko simultaneously satisfy karta hai.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector cross product     | h = r × v define karne ke liye                            |
| Specific mechanical energy | h ko energy se alag rakhne ke liye taaki p isolate ho sake |
| Conic section orbit equation | p ko r aur θ ke saath relate karne ke liye                |
| Inverse-square gravity   | Force law se angular momentum conservation prove karne ke liye |

## 4. Building the idea — from intuition to formalism

### Step 1 — Angular momentum is conserved
Plain Hinglish claim: Central gravity force hamesha position vector ke along hoti hai, isliye torque zero rehta hai aur h vector constant rehta hai.

Concrete example: Earth ke centre se 7000 km par circular orbit mein 7.5 km/s velocity wala satellite; r aur v perpendicular hain toh |h| = 7000 × 7.5 = 52 500 km²/s constant rehta hai.

Formal statement:  
$$ \frac{d}{dt}(\mathbf{r} \times \mathbf{v}) = 0 \implies \mathbf{h} = \text{constant} $$

> [!WARNING]
> Agar force exactly radial nahi hai (jaise oblate Earth perturbation), toh h vector drift karega aur formula toot jaayega.

### Step 2 — Orbit equation from two-body problem
Plain Hinglish claim: Angular momentum conservation use karke differential equation solve karne par r = (h²/GM) / (1 + e cos θ) milta hai.

Concrete example: e = 0.3, h = 60 000 km²/s, GM = 398 600 km³/s² lene par semi-latus rectum p = h²/GM = 9000 km nikalta hai.

Formal statement:  
$$ r = \frac{h^2 / GM}{1 + e \cos\theta} $$

### Step 3 — Definition of semi-latus rectum
Plain Hinglish claim: p = h²/GM by definition hota hai jab orbit equation ko standard conic form se compare karte hain.

Formal statement:  
$$ p \equiv \frac{h^2}{GM} \implies h = \sqrt{GM p} $$

### Step 4 — Textbook-grade relation
Agar aap p ko eccentricity aur semi-major axis se link karo toh final expression ban jaati hai.

## 5. Worked examples — har step show karo

**Example 1 — Circular LEO**
- *Given:* Altitude 300 km, Earth GM = 398 600 km³/s², R = 6371 km
- *Find:* h
r = 6671 km, circular orbit mein p = r = 6671 km  
h = √(GM p) = √(398 600 × 6671) ≈ 51 570 km²/s  
*Why:* p = r kyun liya? Kyunki e = 0 hone par p = a(1-e²) = a.

**Example 2 — Elliptical Molniya**
- *Given:* a = 26 554 km, e = 0.72
- *Find:* h
p = a(1-e²) = 26 554 × (1-0.5184) = 12 772 km  
h = √(398 600 × 12 772) ≈ 71 340 km²/s  
*Why:* Pehle p nikaala kyunki formula mein p chahiye, a aur e se seedha p mil jaata hai.

**Example 3 — From state vector**
- *Given:* r = [7000, 0, 0] km, v = [0, 7.5, 0] km/s
- *Find:* h aur phir p
h = |r × v| = 52 500 km²/s  
p = h²/GM = 52 500² / 398 600 ≈ 6904 km  
*Why:* Cross product se h vector magnitude nikaal ke formula verify kiya.

**Example 4 — Escape trajectory**
- *Given:* Hyperbolic excess velocity 3 km/s, periapsis radius 6671 km
- *Find:* h
Energy se a = -GM/v∞² negative aata hai, p = |a|(e²-1)  
h = √(GM p) = 62 140 km²/s  
*Why:* Hyperbola mein bhi same formula chalti hai kyunki derivation central force par based hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| p ko radius maan lena             | Circular orbit se habit                     | hamesha p = a(1-e²) ya h²/GM check karo      |
| GM ki units galat karna           | km³/s² vs m³/s² mix kar dete hain           | Consistent km units rakho                    |
| h vector ki jagah scalar use karna| Magnitude chahiye lekin direction bhool jaate hain | Problem statement dekho, scalar maanga hai ya vector |
| Perturbed gravity mein formula apply karna | Two-body assumption toot jaati hai          | J2 ya drag ke liye averaged h use karo       |
| e > 1 par bhi p positive lena     | Hyperbola mein sign confusion               | p = |a|(e²-1) ya h²/GM dono try karo            |

## 7. The textbook-precise statement
In the two-body problem with inverse-square gravitational acceleration, specific angular momentum is conserved. The magnitude of specific angular momentum is related to the semi-latus rectum p of the conic-section orbit by  
$$ h = \sqrt{\mu p}, \quad \mu = GM $$  
where the orbit equation is  
$$ r = \frac{p}{1 + e \cos\theta}. $$  
All assumptions of the Keplerian two-body problem must hold: point-mass central body, no non-gravitational forces, and motion confined to a single plane (Vallado, *Fundamentals of Astrodynamics and Applications*, 4e, §2.2).

## 8. Visual — diagram or schematic
```
          Focus (Earth)
             •
            /|\  
           / | \   p (semi-latus rectum)
          /  |  \  
     r(θ) /   |θ  \   r = p / (1+e cosθ)
         /    |    \
        /     |     \
       •------|------•  (apoapsis direction)
     periapsis
```
Horizontal line through focus is major axis; perpendicular distance from focus to orbit at θ = 90° is exactly p.

## 9. The memory technique
1. **The hook** — Socho ek satellite ko “lasso” se pakda gaya hai; lasso ki lambaai p hai aur h uss lasso ko kitni zor se ghuma raha hai.
2. **What to overlearn** — h = √(GM p) aur p = h²/GM dono ek second mein convert ho jaane chahiye.
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Angular momentum conservation → r × v = h → orbit equation derive → p = h²/GM.

## 10. What this unlocks
Yeh formula aapko seedha orbital elements (a, e, i, Ω, ω, ν) nikaalne ke liye ready karta hai.

- Specific orbital energy se combined use karke period nikaalna
- Ground-track repeat condition
- Lambert’s problem initial guess
- Delta-v for plane change (h vector direction change)

## 11. Self-check — five questions, no answers
1. Ek circular orbit mein h = √(GM r) kyun ban jaata hai?
2. Agar e = 0.5 aur a = 10 000 km ho toh h kitna hoga (GM = 398 600)?
3. h vector ka direction kya hota hai aur woh kis plane ko define karta hai?
4. Agar aap drag force add kar do toh formula mein kya badlega?
5. Derive karo ki p = a(1-e²) sirf ellipse ke liye valid hai, hyperbola ke liye nahi.