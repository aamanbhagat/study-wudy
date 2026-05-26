## 1. The one-sentence answer
**Hohmann Δv calculation** gives the exact two impulsive velocity increments needed to move a spacecraft from one circular orbit to another using the most fuel-efficient elliptical transfer.

Pehla maneuver perigee par hota hai jahaan aap apni circular speed badhaate ho taaki elliptical path par chadh sako. Doosra maneuver apogee par hota hai jahaan aap speed kam karte ho taaki target circular orbit par settle ho jaao. Dono Δv values vis-viva equation se nikalti hain aur unka vector sum total propellant cost decide karta hai.

Yeh calculation tabhi valid hai jab dono orbits coplanar hon aur transfer ellipse ka perigee r1 aur apogee r2 ke saath coincide kare. Agar aap in dono changes ko sahi sequence mein apply karo to spacecraft minimum energy path par travel karta hai.

> [!NOTE]
> The real aha moment yeh hai ki total Δv sirf radii ratio par depend karta hai — GM value cancel ho jaati hai, isliye aap kisi bhi central body ke liye same formula use kar sakte ho.

## 2. Why this matters — concrete and current
SpaceX Starlink constellation mein satellites ko 550 km LEO se higher shells mein shift karne ke liye Hohmann transfers routinely use kiye jaate hain; har plane change ke saath combined Δv budget calculate karna padta hai.

NASA ke Artemis program ke Gateway station ko lunar NRHO mein pohunchane ke liye Earth departure aur lunar arrival dono Hohmann-style burns ka hissa hain, jahaan even 50 m/s ki saving bhi mission mass par bada asar daalti hai.

ISRO ka Gaganyaan human-rated vehicle apne service module ke Δv margins ko Hohmann profiles se validate karta hai taaki crew return aur rendezvous dono safe rahein.

ESA’s Sentinel constellation maintenance mein orbit raising burns Hohmann method se plan kiye jaate hain kyunki unka fuel budget limited hota hai aur lifetime directly Δv efficiency par depend karta hai.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vis-viva equation        | Gives speed at any point on an ellipse once a and r known |
| Specific angular momentum| Confirms that both burns remain tangential and coplanar   |
| Circular orbit speed     | Baseline velocity from which Δv1 aur Δv2 subtract/add hote hain |
| Kepler’s second law      | Explains why speed at perigee highest aur apogee lowest hoti hai |

Agar upar ke koi bhi concept missing hain to pehle unhe revise kar lo warna calculation steps adhure rahenge.

## 4. Building the idea — from intuition to formalism

### Step 1 — Circular speeds as reference
Circular orbit mein gravitational force centripetal force ke barabar hoti hai, isliye speed sirf radius aur GM par depend karti hai.  
Example: Earth ke 300 km LEO mein speed lagbhag 7.73 km/s hoti hai.  
Formal statement:  
$$v_{\text{circ}} = \sqrt{\frac{GM}{r}}$$  
> [!WARNING] Agar aap yahaan GM ki value galat lete ho to dono Δv scale ho jaayenge aur total propellant estimate 10–15 % galat ho sakta hai.

### Step 2 — Transfer ellipse semi-major axis
Hohmann ellipse ka perigee r1 aur apogee r2 hota hai, isliye uska semi-major axis average radius ban jaata hai.  
Example: 300 km se 35 786 km GEO tak jaane ke liye a = (6678 + 42 164)/2 km.  
Formal statement:  
$$a_t = \frac{r_1 + r_2}{2}$$  

### Step 3 — Perigee velocity on transfer ellipse
Vis-viva equation se perigee par speed nikaalte hain kyunki wahi energy sabse high hoti hai.  
Formal statement:  
$$v_{\text{peri}} = \sqrt{GM\left(\frac{2}{r_1} - \frac{1}{a_t}\right)}$$  

### Step 4 — First impulsive Δv
Δv1 = v_peri − v_circ1, vector tangential outward.  
Agar yeh step galat sign le liya to spacecraft elliptical path ke bajaye hyperbolic escape kar jaayega.

### Step 5 — Apogee velocity on transfer ellipse
Apogee par speed sabse low hoti hai; wahi formula repeat karo lekin r2 use karo.  
Formal statement:  
$$v_{\text{apo}} = \sqrt{GM\left(\frac{2}{r_2} - \frac{1}{a_t}\right)}$$  

### Step 6 — Second impulsive Δv
Δv2 = v_circ2 − v_apo (positive value target orbit faster hoti hai).  
Yeh burn tangential aur prograde hota hai.

### Step 7 — Total Δv and optimality proof
Total Δv = Δv1 + Δv2. Yeh minimum hota hai kyunki transfer ellipse ke eccentricity sabse kam hoti hai jo dono radii ko touch karti hai.

## 5. Worked examples — har step show karo

**Example 1 — LEO to GEO transfer**  
*Given:* r1 = 6678 km, r2 = 42 164 km, GM = 3.986 × 10^5 km³/s²  
*Find:* Δv1 aur Δv2  
v_circ1 = √(GM/r1) = 7.726 km/s  
a_t = 24 421 km  
v_peri = √[GM(2/r1 − 1/a_t)] = 10.189 km/s  
Δv1 = 10.189 − 7.726 = **2.463 km/s**  
*Why:* r1 par energy badhaane ke liye yeh exact increment chahiye.  
v_circ2 = 3.075 km/s  
v_apo = √[GM(2/r2 − 1/a_t)] = 1.607 km/s  
Δv2 = 3.075 − 1.607 = **1.468 km/s**  
*Why:* Apogee par speed badhaani padti hai taaki circular ho jaaye.  
**Final answer: Δv1 = 2.463 km/s, Δv2 = 1.468 km/s**  
*Reflection:* Numbers clean hain kyunki radii ratio bada hai; yeh pattern har GEO mission mein repeat hota hai.

**Example 2 — Two close LEO shells**  
*Given:* r1 = 6678 km, r2 = 7078 km  
Δv1 = 0.118 km/s, Δv2 = 0.111 km/s  
**Final answer: total Δv = 0.229 km/s**  
*Reflection:* Chhote radius difference par dono burns almost equal ho jaate hain.

**Example 3 — Mars transfer from Earth**  
*Given:* r1 = 1 AU, r2 = 1.524 AU, GM_sun = 1.327 × 10^11 km³/s²  
a_t = 1.262 AU  
Δv1 = 2.945 km/s, Δv2 = 2.648 km/s  
**Final answer: total Δv = 5.593 km/s**  
*Reflection:* Interplanetary case mein GM change hota hai lekin method identical rehta hai.

**Example 4 — Reverse transfer (higher to lower)**  
*Given:* r1 = 42 164 km, r2 = 6678 km  
Δv1 = 1.468 km/s (retrograde), Δv2 = 2.463 km/s (retrograde)  
**Final answer: same magnitudes, opposite direction**  
*Reflection:* Direction reverse karne se calculation structure bilkul same rehta hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using r instead of a in vis-viva  | Students forget energy depends on a         | Always compute a_t first                     |
| Forgetting Δv2 sign               | Visualise kiya nahi ki apogee slow hota hai | Diagram draw karke vectors mark karo         |
| GM value mismatch                 | Different units ya constants mix kar dete   | Ek hi GM value poore calculation mein use karo |
| Assuming non-coplanar burns       | Plane change ko ignore kar dete hain        | Confirm inclination difference zero hai      |
| Using average speed instead of vis-viva | Shortcut lene ki aadat                      | Formula ko har baar apply karo               |
| Radius in km vs m confusion       | Unit slip                                   | Sab radii ko km mein rakh ke GM bhi km³/s² lo |

## 7. The textbook-precise statement
A Hohmann transfer between two coplanar circular orbits of radii r₁ and r₂ (r₂ > r₁) is effected by an elliptic trajectory whose semi-major axis is aₜ = (r₁ + r₂)/2. The two velocity increments are  
Δv₁ = √[GM(2/r₁ − 2/(r₁ + r₂))] − √(GM/r₁)  
Δv₂ = √(GM/r₂) − √[GM(2/r₂ − 2/(r₁ + r₂))].  
Both impulses are applied tangentially; the first is prograde at perigee and the second is prograde at apogee. (Curtis, *Orbital Mechanics for Engineering Students*, 4e, §6.3)

## 8. Visual — diagram or schematic
```
                Apogee (r2)
                   *
                  / \
                 /   \
   Transfer     /     \   Circular outer
   ellipse     /       \     orbit
              /         \
  Perigee    *-----------*------> direction
   (r1)       \         /
               \       /
                \     /
                 \   /
                  \ /
                   *
             Inner circular orbit
```
Perigee par first burn, apogee par second burn; arrows tangential hain.

## 9. The memory technique
1. **The hook** — Socho ek rubber band jo do circles ko chhoota hai; stretch karne par sabse chhoti ellipse banti hai — wahi Hohmann hai.
2. **What to overlearn** — aₜ = (r₁ + r₂)/2 aur dono vis-viva expressions cold yaad hon.
3. **Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Vis-viva equation se energy difference nikaal lo, phir circular speeds subtract kar do.

## 10. What this unlocks
Yeh dono Δv values aapko bi-elliptic transfers, plane-change combined maneuvers aur rendezvous timing samajhne ke liye ready karte hain.

- Lambert’s problem solutions
- Optimal departure windows for interplanetary trajectories
- Electric propulsion spiral vs impulsive Hohmann trade studies
- Formation flying Δv budgets

## 11. Self-check — five questions, no answers
1. 300 km aur 400 km circular orbits ke beech Hohmann Δv1 aur Δv2 calculate karo (GM Earth use karo).
2. Agar r₂/r₁ = 2 ho to total Δv / v_circ1 ka ratio kya hoga?
3. Kyun agar aap Δv2 ko retrograde laga do to spacecraft kis orbit par chala jaayega?
4. Kya Hohmann transfer tab bhi optimal rehta hai jab dono orbits inclined hon? Short reason do.
5. Ek student ne aₜ galat liya aur Δv1 15 % zyada aa gaya; usne kis step par galti ki hogi?