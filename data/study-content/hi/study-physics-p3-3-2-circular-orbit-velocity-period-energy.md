## 1. The one-sentence answer
**A circular orbit is the trajectory where a satellite moves at constant speed around a central body such that gravitational force exactly supplies the centripetal acceleration required for that radius.**

Iska matlab yeh hai ki radius fix rehta hai kyunki speed aur gravitational pull perfectly balance karte hain. Velocity sirf radius aur central mass par depend karti hai, period bhi usi se nikalti hai, aur total mechanical energy negative hoti hai jo bound orbit dikhati hai. Energy split hoti hai kinetic aur potential mein, lekin dono ka sum hamesha \(-\frac{GMm}{2r}\) hota hai.

> [!NOTE]
> Sabse badi aha yeh hai ki circular orbit mein kinetic energy exactly half the magnitude of potential energy hoti hai — yeh relation sirf circular orbits ke liye strict hai aur elliptical orbits mein average hota hai.

## 2. Why this matters — concrete and current
SpaceX Starlink satellites 550 km altitude par circular orbits maintain karte hain taaki constant coverage mile aur drag minimal rahe.  
GPS constellation 20 200 km par circular medium-Earth orbits use karti hai jahaan period exactly 12 sidereal hours hota hai, jo ground tracking aur timing synchronisation ke liye zaroori hai.  
ESA’s Sentinel-1 radar satellites Sun-synchronous circular orbits mein fly karte hain taaki same local solar time par repeated imaging ho.  
Blue Origin New Shepard suborbital tests circular-orbit equations ko validate karte hain jab vehicle apogee par horizontal velocity add karta hai.  
Natural example: Jupiter ke Galilean moons mein Io ka 1.77 Earth-day period circular-orbit velocity formula se directly predict hota hai.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Newton’s law of gravitation | Force balance derive karne ke liye \(F = \frac{GMm}{r^2}\) |
| Centripetal acceleration   | \( \frac{v^2}{r} \) ko gravity se equate karne ke liye     |
| Specific mechanical energy | Total energy \(E = K + U\) ko evaluate karne ke liye       |
| Angular frequency / period | \(T = 2\pi r / v\) relation build karne ke liye            |

Agar upar ke koi bhi concept weak hain to pause karke unhe pehle revise karo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Force balance sets the speed
Gravity satellite ko andar khinchti hai aur centripetal force ka kaam karti hai.  
Example: 400 km altitude par Earth ke liye gravity acceleration lagbhag 8.7 m/s² hota hai; isliye satellite ko utni hi speed chahiye ki woh “gira” na paaye.  
Formal statement:  
$$ \frac{GM m}{r^2} = \frac{m v^2}{r} $$  
> [!WARNING]
> Agar aap yahan mass m ko cancel karna bhool jaayein to aapko galat velocity expression milegi.

### Step 2 — Solve for circular speed
Equation ko rearrange karke velocity nikaalte hain.  
$$ v = \sqrt{\frac{GM}{r}} $$  
Yeh speed sirf central body ke mass aur orbital radius par depend karti hai.

### Step 3 — Period from circumference and speed
Ek poora chakkar ka time \(T = 2\pi r / v\) hota hai.  
Substitute \(v\):  
$$ T = 2\pi \sqrt{\frac{r^3}{GM}} $$  
Kepler’s third law ka special case yahin se nikalta hai jab eccentricity zero ho.

### Step 4 — Kinetic and potential energy
Kinetic energy \(K = \frac12 m v^2 = \frac{GMm}{2r}\).  
Potential energy \(U = -\frac{GMm}{r}\).  
Total specific energy \(\varepsilon = \frac{v^2}{2} - \frac{GM}{r} = -\frac{GM}{2r}\).

### Step 5 — Negative total energy means bound orbit
\(\varepsilon < 0\) dikhata hai ki orbit band hai; escape ke liye \(\varepsilon \ge 0\) chahiye. Circular orbit sabse tight bound state hai given radius ke liye.

### Step 6 — Textbook-grade summary relation
Circular orbit ke liye velocity, period aur energy ek dusre se directly linked hain through the same \(\sqrt{GM/r}\) term.

## 5. Worked examples — har step show karo

**Example 1 — Low-Earth orbit speed**  
*Given:* Earth radius 6371 km, altitude 400 km, \(GM = 3.986 \times 10^{14}\) m³/s².  
*Find:* Circular velocity.  
Step 1: \(r = 6371 + 400 = 6771\) km = \(6.771 \times 10^6\) m.  
Step 2: \(v = \sqrt{GM/r}\).  
*Why:* Direct formula apply kiya kyunki force balance already derive ho chuka hai.  
**\(v = 7668\) m/s**  
*Reflection:* Simple plug-in example; shows speed almost 7.7 km/s hoti hai.

**Example 2 — ISS orbital period**  
*Given:* Same r = 6771 km.  
*Find:* Period T.  
\(T = 2\pi\sqrt{r^3/GM}\).  
*Why:* Velocity already jaante hain to period = circumference/velocity.  
**\(T = 5560\) s ≈ 92.7 min**  
*Reflection:* Real ISS value se match karta hai.

**Example 3 — Total mechanical energy**  
*Given:* 1000 kg satellite at 6771 km.  
*Find:* Total energy E.  
\(E = -\frac{GM m}{2r}\).  
*Why:* Virial theorem se kinetic = –½ potential.  
**\(E = -2.95 \times 10^{10}\) J**  
*Reflection:* Negative sign confirm karta hai ki orbit bound hai.

**Example 4 — Radius from observed period**  
*Given:* Geostationary T = 86 164 s.  
*Find:* Required r.  
Rearrange Kepler’s law: \(r = \left(\frac{GM T^2}{4\pi^2}\right)^{1/3}\).  
*Why:* Period measurement se orbit radius nikaalna common operational task hai.  
**\(r = 42\,164\) km**  
*Reflection:* Shows inverse use of same equations.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using Earth radius instead of orbital radius | Students r = R_earth lete hain              | Always add altitude to planetary radius      |
| Forgetting to cancel satellite mass | Equation mein m dono taraf dikhta hai       | Cancel m pehle step mein hi                  |
| Mixing G and g                    | Surface gravity ko GM/r² samajhna           | GM ko standard value ya mu se yaad rakho     |
| Taking period in hours but radius in km without unit check | Unit mismatch                               | SI units mein convert karo pehle             |
| Assuming energy zero at infinity but sign galat | Potential negative hota hai                 | Always U = –GMm/r use karo                   |
| Confusing circular v with escape v | Escape velocity √2 times badi hoti hai      | Escape = √2 × circular yaad rakho            |
| Using mean radius for oblate Earth | Earth perfect sphere nahi                   | J2 term ya equatorial/polar radius choose karo |

## 7. The textbook-precise statement
For a satellite of mass \(m\) in a circular orbit of radius \(r\) about a spherical primary of gravitational parameter \(\mu = GM\), the speed, period and specific mechanical energy are given by  
\[ v = \sqrt{\frac{\mu}{r}}, \qquad T = 2\pi\sqrt{\frac{r^3}{\mu}}, \qquad \varepsilon = -\frac{\mu}{2r} \]  
provided \(r\) lies outside the primary’s atmosphere and oblateness effects are neglected (Curtis, *Orbital Mechanics for Engineering Students*, 3e, §2.4).

## 8. Visual — diagram or schematic
```
          velocity v
             ↑
             |
   r         |   satellite
   ●---------●
  /           \
 /             \
central body   circular path
```
Radius vector r central body se satellite tak, velocity vector tangential, gravity inward along –r.

## 9. The memory technique
1. **The hook** — Imagine a bucket of water swung in a vertical circle; water stays in only when speed exactly \(\sqrt{gR}\) hoti hai — same balance circular orbit mein.
2. **What to overlearn** — \(v = \sqrt{\mu/r}\), \(T = 2\pi\sqrt{r^3/\mu}\), \(\varepsilon = -\mu/(2r)\).
3. **Spaced-repetition schedule** — Review 1 day, 3 days, 7 days, 16 days, 35 days later.
4. **First-principles fallback** — Force balance se shuru karo: \(GMm/r^2 = mv^2/r\), cancel m, solve for v, phir T aur energy nikaalo.

## 10. What this unlocks
Circular-orbit relations seed hain elliptical orbits, vis-viva equation aur Hohmann transfer derivation ke liye.  
- Elliptical orbits ke semi-major axis se energy link  
- Two-body problem ke specific angular momentum  
- Orbit determination from two position vectors  
- Low-thrust spiral transfers aur station-keeping calculations

## 11. Self-check — five questions, no answers
1. 500 km altitude par LEO velocity calculate karo (Earth \(\mu = 3.986\times10^{14}\)).  
2. Agar period 90 min hai to radius kitni hogi?  
3. Total energy negative kyun hoti hai circular orbit mein?  
4. Escape velocity aur circular velocity ka ratio kya hai same radius par?  
5. Agar aap radius double kar do to period kitna badhega (exact factor)?