## 1. The one-sentence answer
**Conservation of energy and angular momentum in a gravitational field means that both specific mechanical energy and specific angular momentum of a spacecraft or planet remain constant because gravity is a conservative central force.**

Yeh baat simple hai: gravity sirf radially kaam karti hai, isliye koi torque nahi lagta aur angular momentum vector constant rehta hai. Saath hi potential energy position pe depend karti hai aur kinetic energy velocity pe, lekin unka total ek fixed value pe rehta hai. Iska matlab orbit mein aap speed badhaate ho to height girti hai, lekin dono quantities alag-alag nahi badalti.

Aap soch sakte ho jaise ek satellite Earth ke around ghum raha hai. Jab woh perigee pe hota hai, velocity maximum hoti hai kyunki potential energy sabse kam (sabse negative) hoti hai. Angular momentum bhi same rehta hai kyunki radius vector aur velocity vector ka cross product fixed hai.

> [!NOTE]
> Sabse badi aha moment yeh hai ki dono conservations ek saath mil kar orbit ko conic section bana dete hain bina kisi differential equation solve kiye — sirf algebra se.

## 2. Why this matters — concrete and current
SpaceX Starship aur Falcon 9 dono re-entry aur orbital insertion ke liye specific energy aur angular momentum conservation ka direct use karte hain taaki propellant budget calculate kar sakein. Jab booster landing burn karta hai, total energy constant rehti hai isliye engineers exact delta-v predict kar paate hain.

ESA ka JUICE mission Jupiter ke moons ke around gravity assists plan kar raha hai. Angular momentum conservation se flyby trajectory ka plane aur speed change bina extra fuel ke calculate hota hai.

NASA ke Parker Solar Probe ne multiple Venus gravity assists use kiye. Har assist mein specific angular momentum vector tilt hota hai lekin magnitude constant rehta hai, jisse perihelion distance kam hota jaata hai.

Two-Line Element sets jo Space Force public karta hai, dono conservation laws se derived orbital elements (a, e, i, Ω, ω) contain karte hain. Inke bina real-time collision avoidance possible nahi hota.

ISRO ka Gaganyaan mission crew capsule ke re-entry corridor design mein total mechanical energy ko constant maankar heating load predict karta hai.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector cross product     | Angular momentum L = r × mv define karne ke liye          |
| Work-energy theorem      | Potential energy function derive karne ke liye            |
| Central force definition | Torque zero hone aur angular momentum conserve hone ke liye |
| Specific quantities      | m ko cancel karke per-unit-mass equations likhne ke liye  |

Agar cross product ya central force concept weak hai to pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Gravity exerts no torque
Gravity hamesha mass ke center ki taraf radially point karti hai. Iska matlab force aur position vector parallel hain, unka cross product zero hai. Torque τ = r × F = 0. Angular momentum L = r × p isliye constant rehta hai.

Concrete example: Earth ke center se 7000 km door ek satellite 8 km/s tangential velocity se move kar raha hai. Force sirf inward hai, koi tangential component nahi, isliye L vector direction aur magnitude dono same rehte hain.

Formal statement:  
$$ \frac{d\mathbf{L}}{dt} = \mathbf{r} \times \mathbf{F} = 0 \quad \Rightarrow \quad \mathbf{L} = \text{constant} $$

> [!WARNING]
> Agar aap torque ko sirf magnitude se sochte ho aur vector nature bhool jaate ho to orbit plane change ko miss kar doge.

### Step 2 — Specific angular momentum is constant
Mass cancel karke h = L/m = r × v define karte hain. h vector ka magnitude aur direction dono fixed rehte hain.

Concrete example: same satellite ke liye h = 7000 km × 8 km/s = 56 000 km²/s (magnitude).

Formal statement:  
$$ \mathbf{h} = \mathbf{r} \times \mathbf{v} = \text{constant} $$

> [!WARNING]
> Agar aap h ko scalar maante ho to inclination aur node precession calculations galat ho jaayengi.

### Step 3 — Gravitational force is conservative
Force F = −GMm/r² ê_r ek potential function se aati hai. Work done path independent hai.

Concrete example: 300 km aur 1000 km altitude ke beech jaane mein kitna bhi detour karo, net work same rahega.

Formal statement:  
$$ \mathbf{F} = -\nabla U \quad \text{where} \quad U = -\frac{GMm}{r} $$

> [!WARNING]
> Agar potential ko positive sign se likh doge to energy signs ulta ho jaayega aur escape velocity galat nikalegi.

### Step 4 — Total mechanical energy is constant
Kinetic plus potential energy ka sum constant rehta hai kyunki sirf conservative force kaam karti hai.

Concrete example: circular orbit mein ½mv² − GMm/r = −GMm/(2r) hota hai.

Formal statement:  
$$ E = \frac{1}{2}mv^2 - \frac{GMm}{r} = \text{constant} $$

> [!WARNING]
> Agar non-conservative forces jaise drag ko ignore na karo to energy suddenly nahi constant rehti.

### Step 5 — Specific energy and vis-viva equation
Energy ko bhi per unit mass karte hain: ε = v²/2 − μ/r. Isse vis-viva equation nikalti hai.

Formal statement:  
$$ v^2 = \mu\left(\frac{2}{r} - \frac{1}{a}\right) $$

### Step 6 — Orbit shape from h and ε
h aur ε dono se eccentricity e = √(1 + 2εh²/μ²) nikalti hai aur orbit conic section hoti hai.

Formal statement:  
$$ r = \frac{h^2/\mu}{1 + e\cos\theta} $$

## 5. Worked examples — har step show karo

**Example 1 — Circular orbit energy**
*Given:* Low Earth orbit, r = 6771 km, μ = 398 600 km³/s².  
*Find:* Specific energy ε.

v = √(μ/r) = √(398600/6771) ≈ 7.67 km/s  
ε = v²/2 − μ/r = (58.83)/2 − 58.83 = −29.415 km²/s²  
*Why:* v² = μ/r isliye kinetic term potential ke half hota hai, total negative.

**Final answer**  
**ε = −μ/(2r) = −29.42 km²/s²**

*Reflection:* Yeh example simple hai lekin sign negative hone se bound orbit confirm hoti hai.

**Example 2 — Angular momentum at two points**
*Given:* Elliptical orbit, perigee r_p = 7000 km, v_p = 9.2 km/s.  
*Find:* h.

h = r_p × v_p (perpendicular) = 7000 × 9.2 = 64 400 km²/s  
*Why:* Perigee pe radius aur velocity 90° pe hote hain isliye magnitude direct product.

**Final answer**  
**h = 64 400 km²/s**

*Reflection:* h constant hone se apogee velocity turant nikal sakti hai.

**Example 3 — Vis-viva at arbitrary point**
*Given:* a = 10 000 km, r = 8000 km.  
*Find:* speed v.

v² = μ(2/r − 1/a) = 398600(2/8000 − 1/10000) = 398600(0.000125) = 49.825  
v = 7.06 km/s

**Final answer**  
**v = 7.06 km/s**

*Reflection:* Energy conservation se bina time jaane speed nikal gayi.

**Example 4 — Eccentricity from energy and h**
*Given:* ε = −15 km²/s², h = 60 000 km²/s, μ = 398 600.  
*Find:* e.

e = √(1 + 2εh²/μ²) = √(1 + 2(−15)(3.6×10⁹)/(1.59×10¹¹)) = √(1 − 0.678) = 0.57

**Final answer**  
**e = 0.57**

*Reflection:* Dono conserved quantities se orbit shape bina integration ke mil gayi.

## 6. Common traps and how to avoid them

| Trap                          | Why it happens                              | How to avoid it                                      |
|-------------------------------|---------------------------------------------|------------------------------------------------------|
| Sign of potential energy galat | +GMm/r likhna aadat se                     | hamesha U = −μ/r yaad rakho                          |
| h ko scalar treat karna       | 2D problems mein vector bhool jaana         | h vector hai, direction bhi track karo               |
| Energy mein m mat rakhna      | Specific vs total energy confuse karna      | hamesha per-unit-mass use karo                       |
| Drag ko ignore karna          | Real atmosphere mein energy nahi constant   | Vacuum assumption clearly state karo                 |
| Perigee pe velocity radial zero maanna | Geometry galat samajhna              | r aur v ke angle ko cross product se verify karo     |
| a ko negative lena            | Hyperbolic orbits mein                  | a > 0 elliptic, a < 0 hyperbolic convention yaad rakho |

## 7. The textbook-precise statement
In the absence of non-conservative forces, the specific mechanical energy  
ε = v²/2 − μ/r  
and the specific angular momentum vector  
h = r × v  
of a particle moving under an inverse-square central gravitational force are both constant. The orbit is therefore a conic section whose semi-major axis is determined solely by ε and whose eccentricity is determined by both ε and h. (Curtis, *Orbital Mechanics for Engineering Students*, 4e, §2.3 and §2.4)

## 8. Visual — diagram or schematic
```
          h (out of page)
               ↑
   r × v  -->  • satellite
              / \
             /   \   v
            r     θ
           /       \
          Earth     (perigee)
```
Radial vector r aur tangential velocity v ka cross product h page se bahar constant rehta hai. Energy se v ki magnitude r ke hisaab se badalti hai.

## 9. The memory technique

1. **The hook** — Socho ek frisbee jo space mein ghum rahi hai bina kisi torque ke; woh hamesha same plane mein same spin rate se ghumegi aur uski total “energy budget” bhi fixed rahegi.
2. **What to overlearn** — ε = v²/2 − μ/r aur h = r × v; dono constant.
3. **Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Torque = r × F = 0 se shuru karo, phir dL/dt = 0, phir energy ke liye work-energy theorem.

## 10. What this unlocks
Yeh dono conservation laws aapko Kepler’s laws, vis-viva equation, orbit determination aur gravity-assist design tak le jaate hain.

- Lambert’s problem (time-of-flight)
- Orbit determination from angles-only measurements
- Escape velocity aur hyperbolic excess speed
- Frozen orbits aur sun-synchronous design

## 11. Self-check — five questions, no answers
1. Ek circular orbit mein specific energy ka value kitna hota hai agar radius double kar diya jaaye?
2. Agar angular momentum vector ka direction change ho jaaye to kya physically ho raha hai?
3. Hyperbolic escape trajectory pe specific energy positive kaise hoti hai?
4. Perigee aur apogee dono pe radial velocity zero kyun hoti hai?
5. Agar ek chhota drag force lag jaaye to kaunsi quantity pehle “tootegi” — energy ya angular momentum?