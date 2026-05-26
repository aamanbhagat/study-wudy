## 1. The one-sentence answer
**Newton's law of gravitation states that every pair of point masses attracts each other with a force directly proportional to the product of their masses and inversely proportional to the square of the distance between them, acting along the line joining their centres.**

Yeh law poori universe mein same form mein kaam karta hai, bina kisi medium ki zaroorat ke. Force ek "action at a distance" phenomenon hai — do objects ke beech seedha force lagta hai, chahe unke beech vacuum ho. Iska matlab yeh hai ki gravitational influence instantly nahi failti (modern view mein light-speed par), lekin Newtonian model mein hum ise turant maante hain.

Aap is law ko sirf Earth ke objects tak mat socho. Iska asli power tab dikhta hai jab aap ise planets, satellites aur galaxies par apply karte ho. Universal hone ka matlab yeh bhi hai ki same constant \(G\) har jagah same value rakhta hai.

> [!NOTE]
> Sabse bada "aha" moment yeh hai ki ek hi equation falling apple aur orbiting Moon dono ko ek saath explain karti hai — nature mein scale-independent symmetry exist karti hai.

## 2. Why this matters — concrete and current
ISRO's Chandrayaan-3 mission ne lunar orbit insertion ke liye exactly isi law ke inverse-square prediction ka use kiya tha taaki descent trajectory calculate ki ja sake. Without precise knowledge of \(GM_\ Earth\) aur \(GM_\ Moon\), landing ellipse galat ho jaati.

SpaceX Starlink satellites low-Earth orbit mein re-entry avoid karne ke liye continuous station-keeping burns lagate hain jo gravitational perturbations (including third-body effects from Moon aur Sun) ko counter karte hain. Yeh perturbations seedha Newton's law se derive hote hain.

Gravitational assist manoeuvres (Voyager 1 & 2, Parker Solar Probe) planet ke gravity well ka use karti hain velocity badhane ke liye. Trajectory designers numerical integration mein Newton's law ko core force model ke taur par use karte hain.

LIGO aur future space-based detectors (LISA) gravitational waves detect karte hain jo Einstein ke general-relativity correction hain Newtonian law ke upar, lekin unki starting point bhi Newtonian potential se hoti hai jab weak-field approximation ki jaati hai.

Semiconductor aur precision metrology labs mein Cavendish-type experiments ab bhi \(G\) ki value refine kar rahe hain kyunki atomic interferometry aur satellite missions (GRACE-FO) mein micro-Gal gravity measurements ki zaroorat padti hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Vector notation      | Force direction along line joining centres                |
| Inverse-square behaviour | Distance dependence samajhne ke liye                      |
| Newton's second law  | \(F = ma\) se acceleration aur orbit equations derive karne ke liye |
| Point-mass idealisation | Extended bodies ko centre-of-mass par treat karne ke liye |

Agar aapko vectors ya \(F=ma\) abhi tak comfortable nahi, to pehle un sections ko complete kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Everyday attraction to universal claim
Aap dekhte ho ki sab cheezein neeche girti hain. Newton ne socha ki yeh force sirf Earth tak limited nahi, balki har mass ke beech exist karta hai.

Concrete example: Apple Earth ki taraf, Moon bhi Earth ki taraf — dono same law se.

Formal statement: Force on mass \(m_1\) due to \(m_2\) is proportional to \(m_1 m_2\).

> [!WARNING]
> Agar aap yeh maan lete ho ki force sirf Earth ke liye alag hai, to planetary motion equations bilkul alag ho jaayengi aur orbits predict nahi ho paayengi.

### Step 2 — Distance dependence from Kepler
Kepler ke third law se \(T^2 \propto r^3\) aata hai. Newton ne dikhaya ki iske liye force \(1/r^2\) hona chahiye.

Formal: \(F \propto 1/r^2\).

### Step 3 — Action at a distance
Force ka matlab hai koi medium nahi chahiye. Vacuum mein bhi force exist karta hai.

### Step 4 — Vector form
Direction: line joining centres ke along, attractive.

$$ \vec{F}_{12} = -G \frac{m_1 m_2}{r^2} \hat{r}_{12} $$

### Step 5 — Universal constant
\(G\) same value har jagah. Cavendish experiment ne isko measure kiya.

### Step 6 — Superposition
Multiple masses ke liye vector sum.

### Step 7 — Point mass equivalence
Spherical symmetric body ko centre par point mass treat kar sakte hain (shell theorem).

### Step 8 — Textbook statement
Yeh law Newtonian mechanics ka core gravitational interaction define karta hai.

## 5. Worked examples

**Example 1 — Earth-surface weight**
*Given:* \(m = 70\) kg, \(R_E = 6.37 \times 10^6\) m, \(M_E = 5.97 \times 10^{24}\) kg, \(G = 6.67430 \times 10^{-11}\).
*Find:* Force on person.
Step 1: \(r = R_E\).  
Step 2: \(F = G M_E m / R_E^2\).  
*Why:* Surface par distance centre se hi count hota hai.  
**\(F = 686.7\) N**  
*Reflection:* Yeh normal weight hai; same law Moon par alag value dega.

**Example 2 — Earth-Moon force**
*Given:* Moon mass \(7.34 \times 10^{22}\) kg, distance \(3.84 \times 10^8\) m.
*Find:* Gravitational force.
Step-by-step calculation yields \(F = 1.98 \times 10^{20}\) N.  
*Why:* Inverse-square drop-off dramatically reduce karti hai.  
**\(1.98 \times 10^{20}\) N**  
*Reflection:* Iska acceleration Moon ko orbit mein rakhta hai.

**Example 3 — Orbital speed**
*Given:* Low-Earth circular orbit, \(r = R_E + 400\) km.
*Find:* Speed.
Derive \(v = \sqrt{GM/r}\).  
**\(7670\) m/s**  
*Reflection:* Centripetal force gravitational force se aata hai.

**Example 4 — Escape velocity**
Derive \(v_\text{esc} = \sqrt{2GM/R}\).  
**\(11.2\) km/s from Earth surface**  
*Reflection:* Kinetic energy gravitational potential barrier cross karti hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| Force "transmitted" by medium | Classical intuition medium maangta hai  | Yaad rakho: vacuum mein bhi equation same    |
| Confuse with Newton's third law | Action-reaction pair galat samajhna     | Force pair always equal-opposite, same line  |
| \(G\) ko acceleration samajhna | \(g\) aur \(G\) mix karna               | \(G\) universal constant, \(g\) local        |
| Extended bodies par direct apply | Centre-of-mass ignore karna             | Shell theorem ya integration use karo        |
| Instantaneous action          | Relativity bhool jaana                  | Newtonian limit mein accept karo, note karo  |
| Sign of force                 | Attractive negative bhoolna             | Vector direction \(\hat{r}\) se fix karo     |

## 7. The textbook-precise statement
Newton's law of universal gravitation asserts that the gravitational force exerted by a point mass \(m_2\) on another point mass \(m_1\) separated by displacement vector \(\vec{r}_{12}\) is given by
\[
\vec{F}_{12} = -G\frac{m_1 m_2}{r_{12}^2}\hat{r}_{12},
\]
where \(G\) is the universal gravitational constant, the force is always attractive, and the law is assumed to hold instantaneously in Newtonian mechanics. The statement presupposes an inertial frame, point-mass or spherically symmetric bodies (via Newton's shell theorem), and the validity of vector superposition for multiple bodies. (See Feynman, *The Feynman Lectures on Physics*, Vol. I, §7-1 and §9-7.)

## 8. Visual — diagram or schematic
```text
          m1
           •
           |  F12 (attractive)
           |
r12 <------|------> centre line
           |
           • m2
```
Two point masses aligned on x-axis; force vectors point toward each other along the connecting line; magnitude \(G m_1 m_2 / r^2\).

## 9. The memory technique
1. **The hook** — Imagine two giant invisible rubber bands stretched between every pair of masses; thicker masses pull harder, farther distance weakens band quadratically.
2. **What to overlearn** — \(F = G m_1 m_2 / r^2\) and \(G = 6.67430 \times 10^{-11}\) N m² kg⁻².
3. **Spaced-repetition schedule** — Review formula day 1, 3, 7, 16, 35.
4. **First-principles fallback** — Start from centripetal acceleration requirement for circular motion + Kepler's \(T^2 \propto r^3\) to recover \(1/r^2\) dependence.

## 10. What this unlocks
Yeh law seedha orbital mechanics, escape velocity, tidal forces aur gravitational potential energy ki taraf le jaata hai.

- Two-body problem reduction to one-body
- Kepler's laws derivation
- Hohmann transfer orbits
- Roche limit calculations
- N-body perturbation theory foundation

## 11. Self-check — five questions, no answers
1. Calculate the ratio of gravitational force on a 1 kg mass at Earth's surface versus at geostationary altitude.
2. Explain why the gravitational force between two extended spheres can be calculated using centre-to-centre distance.
3. A satellite is in circular orbit; if radius doubles, by what factor does orbital speed change?
4. Identify the conceptual error: "Gravity needs air to pull things down."
5. Derive the escape velocity formula from energy conservation using Newton's gravitational force.