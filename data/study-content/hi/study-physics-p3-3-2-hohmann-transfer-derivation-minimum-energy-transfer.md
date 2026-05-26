## 1. The one-sentence answer
**Hohmann transfer ek minimum-energy elliptical trajectory hai jo do circular orbits ke beech fuel-efficient transition provide karti hai, sirf do impulsive burns ke through.**

Yeh technique isliye kaam karti hai kyunki dono orbits ke circular velocities aur ek elliptical path ke velocities ko vis-viva equation se link kiya jaata hai. Pehla burn spacecraft ko low orbit se transfer ellipse ke perigee velocity tak accelerate karta hai; dusra burn apogee par high orbit ki circular velocity match karta hai. Total \(\Delta v\) sabse kam hota hai jab transfer ellipse ke semi-major axis dono radii ka average le.

> [!NOTE]
> Sabse badi aha yeh hai ki energy sirf perigee aur apogee par change hoti hai — beech ke path par koi thrust nahi chahiye, isliye propellant mass exponentially kam ho jaati hai.

## 2. Why this matters — concrete and current
SpaceX Starlink constellation deployment mein Falcon 9 repeatedly Hohmann-style transfers use karta hai taaki 550 km LEO se target shells tak pahunche bina extra propellant waste kiye.  
NASA’s Artemis program lunar Gateway module ko Earth-Moon L2 halo orbit mein shift karne ke liye Hohmann-type transfers plan kar raha hai kyunki total \(\Delta v\) budget 3.2 km/s ke andar limited hai.  
ISRO’s Gaganyaan mission recovery capsule ko low Earth orbit se higher parking orbit mein laane ke liye Hohmann ellipse ka calculation use karta hai, jisse service module ka propellant margin safe rehta hai.  
Commercial geostationary satellite operators jaise SES aur Intelsat har launch ke baad Hohmann transfer se GTO se GEO tak jaate hain; yeh ek standard 1500 m/s \(\Delta v\) budget deta hai jo electric propulsion ke saath combine hota hai.  
ESA’s Juice mission Jupiter moons ke beech transfer sequence mein multiple Hohmann legs include karti hai taaki gravity-assist ke saath total propellant mass 3000 kg ke neeche rahe.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Specific angular momentum \(h\) | Transfer ellipse ke perigee-apogee radii fix karta hai    |
| Vis-viva equation    | Har radius par velocity nikaalne ke liye zaroori hai      |
| Specific mechanical energy \(\mathcal{E}\) | Minimum energy wali ellipse prove karne mein madad karta hai |
| Two-body problem assumptions | Point-mass gravity aur no perturbations ka model deta hai |

Agar angular momentum ya vis-viva equation abhi clear nahi hai to pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Two circular orbits and their velocities
Dono orbits circular hain isliye velocity magnitude constant rehti hai aur direction tangential hoti hai.  
Example: Earth radius 6371 km + 300 km altitude low orbit aur 35786 km GEO.  
Formal statement: \(v_{\text{circ}} = \sqrt{\mu/r}\).  
> [!WARNING]
> Agar aap yahan par \(\mu\) galat lete ho (jaise Earth ke liye 398600 km³/s² ki jagah 3.986×10^5 galat units mein), saara \(\Delta v\) 5-10% galat aa jaayega.

### Step 2 — Elliptical transfer orbit geometry
Transfer orbit ka perigee low orbit radius \(r_1\) aur apogee high orbit radius \(r_2\) par touch karta hai.  
Example: \(r_1 = 6671\) km, \(r_2 = 42164\) km.  
Formal statement: semi-major axis \(a = (r_1 + r_2)/2\).

### Step 3 — Velocity on transfer ellipse via vis-viva
Vis-viva deta hai \(v = \sqrt{\mu(2/r - 1/a)}\).  
Perigee velocity \(v_p = \sqrt{\mu(2/r_1 - 1/a)}\) aur apogee velocity \(v_a = \sqrt{\mu(2/r_2 - 1/a)}\).

### Step 4 — First impulsive burn calculation
Low orbit circular velocity \(v_1 = \sqrt{\mu/r_1}\) se \(v_p\) tak change karna padta hai.  
\(\Delta v_1 = v_p - v_1\).

### Step 5 — Second impulsive burn calculation
Apogee par \(v_a\) se high orbit circular velocity \(v_2 = \sqrt{\mu/r_2}\) tak change.  
\(\Delta v_2 = v_2 - v_a\).

### Step 6 — Total \(\Delta v\) aur minimum energy proof
Total \(\Delta v = \Delta v_1 + \Delta v_2\). Kisi aur elliptical path se yeh sum zyada hota hai kyunki energy conservation aur Lambert’s theorem ke through yeh hi path sabse kam energy maangta hai.

## 5. Worked examples — har step show karo

**Example 1 — LEO to GEO simple numbers**  
*Given:* \(r_1 = 6671\) km, \(r_2 = 42164\) km, \(\mu = 398600\) km³/s².  
*Find:* \(\Delta v_1\), \(\Delta v_2\), total \(\Delta v\).  
\(a = (6671 + 42164)/2 = 24417.5\) km.  
\(v_1 = \sqrt{398600/6671} \approx 7.726\) km/s.  
\(v_p = \sqrt{398600(2/6671 - 1/24417.5)} \approx 10.151\) km/s.  
\(\Delta v_1 = 10.151 - 7.726 = 2.425\) km/s.  
\(v_a = \sqrt{398600(2/42164 - 1/24417.5)} \approx 1.607\) km/s.  
\(v_2 = \sqrt{398600/42164} \approx 3.075\) km/s.  
\(\Delta v_2 = 3.075 - 1.607 = 1.468\) km/s.  
Total \(\Delta v = 3.893\) km/s.  
*Why:* Har step vis-viva aur circular velocity formula se directly aaya.  
**Final answer: 3.893 km/s**  
*Reflection:* Yeh numbers real GEO insertion ke kareeb hain; rounding error sirf 0.001 km/s tak rehta hai.

**Example 2 — Same orbits but altitude change**  
*Given:* Same radii, lekin \(\mu\) ko 3.986×10^5 km³/s² likha.  
Calculation repeat karne par total \(\Delta v\) 3.893 km/s hi aata hai (unit consistency check).  
*Why:* \(\mu\) ko scientific notation mein likhna sirf readability ke liye hai.  
**Final answer: 3.893 km/s**  
*Reflection:* Unit slip sabse common galti hai.

**Example 3 — Moon to higher lunar orbit**  
*Given:* \(r_1 = 1838\) km, \(r_2 = 3848\) km, \(\mu_{\text{Moon}} = 4903\) km³/s².  
\(a = 2843\) km.  
\(\Delta v_1 = 0.648\) km/s, \(\Delta v_2 = 0.384\) km/s.  
Total \(\Delta v = 1.032\) km/s.  
*Why:* Lunar \(\mu\) chhota hone se velocities bhi kam hain.  
**Final answer: 1.032 km/s**  
*Reflection:* Scale change hone par bhi same derivation apply hoti hai.

**Example 4 — Reverse transfer (high to low)**  
*Given:* Same Earth radii, lekin ab \(r_1 > r_2\).  
Burn directions reverse ho jaate hain lekin magnitudes same rehte hain.  
**Final answer: 3.893 km/s (same magnitude)**  
*Reflection:* Direction change sirf sign flip hai; energy budget identical rehta hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| Wrong \(\mu\) value         | Mixed units (km vs m)                   | Always check \(\mu\) in km³/s²               |
| Forgetting \(\Delta v_2\) sign | Velocity vector direction ignore       | Apogee par burn retrograde hota hai          |
| Using \(a = r_2\) instead of \((r_1+r_2)/2\) | Ellipse definition bhoolna            | Semi-major axis ko average se confirm karo   |
| Non-tangential burns assume karna | Real mission mein misalignment       | Ideal case mein tangential hi rakho          |
| Atmospheric drag ignore karna | Low perigee pe drag term add nahi kiya | 300 km se upar perigee rakhna                |
| Electric propulsion compare karna | Hohmann impulsive model nahi hai     | Electric ke liye spiral transfer alag hota hai |

## 7. The textbook-precise statement
A Hohmann transfer orbit between two coplanar circular orbits of radii \(r_1 < r_2\) is the unique elliptical trajectory of semi-major axis \(a = (r_1 + r_2)/2\) that intersects both circles tangentially. The total velocity increment required is
\[
\Delta v = \sqrt{\frac{\mu}{r_1}}\left(\sqrt{\frac{2r_2}{r_1+r_2}}-1\right) + \sqrt{\frac{\mu}{r_2}}\left(1-\sqrt{\frac{2r_1}{r_1+r_2}}\right).
\]
Under the assumptions of the two-body Keplerian problem (inverse-square gravity, point masses, no perturbations, impulsive thrust), this \(\Delta v\) is minimal among all two-impulse transfers (Prussing & Conway, *Orbital Mechanics*, 2e, §6.3).

## 8. Visual — diagram or schematic
```
          Apogee (r2)
             *
            / \
           /   \
          /     \
Perigee  *-------*  Transfer ellipse
(r1)      \     /
           \   /
            \ /
             * Burn 2 (tangent)
   Burn 1 (tangent)
Circular low orbit
```
X-axis major axis aligned; perigee left, apogee right; both burns purely tangential.

## 9. The memory technique
1. **The hook** — Imagine a rubber band stretched between two circles; the thinnest ellipse is the cheapest rubber-band snap.  
2. **What to overlearn** — \(a = (r_1+r_2)/2\) aur total \(\Delta v\) formula cold yaad.  
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.  
4. **First-principles fallback** — Vis-viva equation se \(v_p\) aur \(v_a\) nikaal lo, phir circular velocities subtract kar do.

## 10. What this unlocks
Hohmann transfer samajhne ke baad aap bi-elliptic transfers, plane-change combined maneuvers, aur Lambert’s problem solve kar sakte ho.  
- Next: Bi-elliptic transfer \(\Delta v\) comparison  
- Next: Optimal staging with Hohmann legs  
- Next: Gravity-assist patched conics sequences  

## 11. Self-check — five questions, no answers
1. 300 km aur 1000 km circular orbits ke beech Hohmann \(\Delta v_1\) calculate karo (\(\mu = 398600\)).  
2. Agar \(r_2 = 3r_1\) ho to total \(\Delta v / v_1\) ka ratio kya hoga?  
3. Kya Hohmann transfer non-coplanar orbits ke liye bhi minimum energy deta hai? Kyun?  
4. Ek student ne \(a = r_2\) le liya — final \(\Delta v\) mein kitna error aayega?  
5. Real mission mein Hohmann use karte waqt konsa perturbation sabse pehle check karna chahiye?