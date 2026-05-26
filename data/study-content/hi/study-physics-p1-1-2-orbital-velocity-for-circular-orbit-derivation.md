## 1. The one-sentence answer
**Orbital velocity** for a circular orbit is the constant tangential speed at which a satellite must move so that gravitational force exactly supplies the required centripetal acceleration, yielding \( v = \sqrt{\frac{GM}{r}} \).

Yeh velocity aapko batati hai ki ek body ko kis speed par rakhna zaroori hai taaki woh ek fixed radius ke circular path par gravitational pull ke against balance ho jaaye. Agar speed kam ho to orbit gir jaayega, agar zyada ho to escape trajectory ban jaayegi. Derivation Newton ke laws aur centripetal force ke simple balance se aati hai.

> [!NOTE]
> Sabse badi “aha” yeh hai ki orbital velocity sirf central mass \( M \) aur radius \( r \) par depend karti hai — satellite ki apni mass cancel ho jaati hai.

## 2. Why this matters — concrete and current
SpaceX Starlink satellites 550 km altitude par is formula se derived velocity ~7.6 km/s par operate karte hain, jo unke station-keeping burns ko design karne mein directly use hota hai.

ISRO ka Chandrayaan-3 mission lunar circular orbit insertion ke liye same relation ka variant \( v = \sqrt{\frac{GM_{\text{Moon}}}{r}} \) use karke 1.6 km/s velocity target kiya tha.

GPS constellation satellites 20 200 km altitude par ~3.9 km/s orbital velocity maintain karte hain; thodi si velocity error bhi position accuracy ko metres se kilometres tak degrade kar deti hai.

Binary star systems aur exoplanet detection mein radial-velocity technique is velocity formula ke inverse se central star ki mass calculate karti hai, jaise Kepler-452 system ke liye papers mein dikha hai.

Natural phenomena jaise geostationary weather satellites (INSAT series) 36 000 km par exactly 3.07 km/s velocity par rehte hain, jo Earth’s rotation ke saath sync karta hai.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Newton’s second law      | Net force = mass × acceleration likhne ke liye            |
| Gravitational force law  | \( F = \frac{GMm}{r^2} \) central force provide karti hai |
| Centripetal acceleration | Circular motion mein \( a = \frac{v^2}{r} \) zaroori hai  |
| Vector vs scalar         | Direction of velocity (tangential) aur force (radial) samajhne ke liye |

Agar upar ke koi bhi concept weak hain to pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Circular motion demands inward acceleration
Aapko pata hai ki koi bhi object straight line mein jaana chahta hai (Newton’s first law). Circular path par rehne ke liye continuously inward acceleration chahiye. Iska magnitude \( a_c = \frac{v^2}{r} \) hota hai.

Concrete example: car 10 m radius ke round track par 5 m/s par ghum rahi hai to usko \( 2.5 \) m/s² inward acceleration chahiye.

Formal statement: centripetal acceleration vector radially inward hota hai, magnitude \( \frac{v^2}{r} \).

> [!WARNING]
> Agar aap yahan \( v^2/r \) ki jagah galti se \( v/r \) likh do to pura derivation collapse ho jaayega.

### Step 2 — Gravity supplies that inward force
Satellite ke liye sirf gravitational force hi available inward force hai. \( F_g = \frac{GMm}{r^2} \) radially inward.

### Step 3 — Equate gravitational force to centripetal requirement
Newton’s second law lagao: net force = mass × acceleration. Yahan net force \( F_g \) hai aur acceleration \( v^2/r \).

### Step 4 — Write the force balance equation
$$ \frac{GMm}{r^2} = m \frac{v^2}{r} $$

### Step 5 — Cancel satellite mass and solve for velocity
Mass \( m \) dono taraf se cancel hota hai:
$$ \frac{GM}{r^2} = \frac{v^2}{r} $$
Multiply both sides by \( r \):
$$ v^2 = \frac{GM}{r} $$
Take square root:
$$ v = \sqrt{\frac{GM}{r}} $$

### Step 6 — State the final textbook-grade result
Circular orbit ke liye orbital speed \( v = \sqrt{\frac{GM}{r}} \) hoti hai, jahaan \( M \) central body ki mass aur \( r \) orbit radius hai (surface se nahi, centre se).

## 5. Worked examples — har step show karo

**Example 1 — Low Earth Orbit velocity**
*Given:* Earth mass \( M = 5.97 \times 10^{24} \) kg, radius \( r = 6371 \) km + 400 km = \( 6.771 \times 10^6 \) m.
*Find:* Orbital velocity.
Step 1: \( GM = 3.986 \times 10^{14} \) m³/s² (standard value).  
Step 2: \( \frac{GM}{r} = 5.886 \times 10^7 \).  
Step 3: \( v = \sqrt{5.886 \times 10^7} \approx 7672 \) m/s.  
*Why* each step: GM value ready-made liya kyunki G aur M alag calculate karna redundant hai.  
**7672 m/s**

*Reflection:* Yeh sabse basic case hai; altitude change karne par r badalta hai.

**Example 2 — Geostationary orbit**
*Given:* \( r = 42164 \) km = \( 4.2164 \times 10^7 \) m.
*Find:* \( v \).
$$ v = \sqrt{\frac{3.986 \times 10^{14}}{4.2164 \times 10^7}} = 3075 \text{ m/s} $$
*Why:* Radius almost 6.6 times bada hai isliye velocity almost 2.5 times kam.

**Example 3 — Moon orbit around Earth**
*Given:* \( r = 384400 \) km.
*Find:* \( v \).
$$ v = \sqrt{\frac{3.986 \times 10^{14}}{3.844 \times 10^8}} \approx 1018 \text{ m/s} $$
*Why:* Bahut badi r ki wajah se velocity bahut low.

**Example 4 — Different central body (Mars)**
*Given:* Mars \( GM = 4.282 \times 10^{13} \) m³/s², low orbit \( r = 3390 + 400 = 3790 \) km.
*Find:* \( v \).
$$ v = \sqrt{\frac{4.282 \times 10^{13}}{3.79 \times 10^6}} \approx 3372 \text{ m/s} $$
*Why:* Mars ki mass kam hone se velocity Earth se kam.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using radius from surface instead of centre | Students forget centre-of-mass reference    | Always add planet radius + altitude          |
| Forgetting mass \( m \) cancels   | Equation mein \( m \) dekh kar confuse hote hain | Explicitly cancel \( m \) dono taraf se      |
| Using \( v = \sqrt{\frac{GM}{r^2}} \) | Square root galat lagate hain               | Last step mein \( v^2 = GM/r \) check karo   |
| Mixing linear speed with angular speed | \( \omega r \) aur \( v \) ko alag nahi samajhte | Formula mein sirf tangential \( v \) use karo |
| Applying formula to elliptical orbits | Over-generalisation                         | Sirf circular ke liye use karo; elliptical mein vis-viva lagega |

## 7. The textbook-precise statement
For a satellite of mass \( m \) in a circular orbit of radius \( r \) about a spherically symmetric central body of mass \( M \), the orbital speed satisfies
$$ v = \sqrt{\frac{GM}{r}} $$
provided \( r \) is measured from the centre of \( M \), the orbit lies outside the central body, and relativistic and atmospheric-drag effects are negligible. (See Goldstein, *Classical Mechanics*, 3e, §3.3.)

## 8. Visual — diagram or schematic
```
          satellite
             •  ← v (tangential)
            / \
           /   \
          /     \   r (radius)
         /       \
        •---------•  centre of Earth (M)
       gravity → inward
```

Diagram shows velocity vector perpendicular to radius vector; gravitational force along radius inward.

## 9. The memory technique
1. **The hook** — Imagine a cannon on a very tall mountain firing horizontally; at exact “orbital” speed the cannonball keeps missing Earth and circles forever.
2. **What to overlearn** — \( v = \sqrt{\frac{GM}{r}} \) and the fact that satellite mass cancels.
3. **Spaced-repetition schedule** — Review 1 day later, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Force balance \( \frac{GMm}{r^2} = m\frac{v^2}{r} \) se shuru karo aur mass cancel karke square root lo.

## 10. What this unlocks
Yeh formula aapko circular orbits ke baad elliptical, parabolic aur hyperbolic trajectories samajhne ke liye ready karta hai.

- Vis-viva equation derivation
- Escape velocity calculation
- Kepler’s third law link with period \( T = 2\pi\sqrt{\frac{r^3}{GM}} \)
- Hohmann transfer orbit planning
- Specific orbital energy concept

## 11. Self-check — five questions, no answers
1. Derive \( v \) for a 300 km altitude orbit around Earth and compare with 1000 km altitude.
2. Agar central mass double ho jaaye lekin radius same rahe to velocity kitni badhegi?
3. Ek student \( v = \sqrt{\frac{GM}{r^2}} \) likh raha hai — galti kya hai?
4. Moon ke surface se kitni door par orbital velocity 500 m/s ho jaayegi? (Moon GM = \( 4.904 \times 10^{12} \))
5. Geostationary orbit velocity aur low-Earth-orbit velocity ka ratio numerically calculate karo.