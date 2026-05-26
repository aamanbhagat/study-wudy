## 1. The one-sentence answer
**Vis-viva equation** specific mechanical energy ke conservation se nikalti hai aur kisi bhi point par orbital speed ko radial distance aur semi-major axis se directly link karti hai.

Yeh equation aapko bataati hai ki jab ek spacecraft ya satellite ek elliptical orbit mein move kar raha hai, to uski speed sirf uske focus se doori (r) aur orbit ke size (a) par depend karti hai. Energy total constant rehti hai isliye kinetic aur potential energy ka balance har jagah same rehta hai.

Iska matlab yeh hai ki aapko full trajectory nahi chahiye — sirf local r aur overall a jaanne se velocity nikal jaati hai bina vector calculus ke.

> [!NOTE]
> Sabse badi aha yeh hai ki negative total energy (elliptical orbit) ka matlab hota hai speed exactly itni honi chahiye ki woh gravitational well se nikal na paaye, aur yeh local r aur global a dono se decide hota hai.

## 2. Why this matters — concrete and current
SpaceX Starship lunar transfer burns mein engineers vis-viva use karke exact delta-v calculate karte hain jab vehicle apogee par pahunchta hai, bina pura n-body simulation run kiye.

ESA Juice mission Jupiter orbit insertion ke liye vis-viva se derived arrival speeds se propellant budget fix kiya gaya tha, jisse 2023 trajectory optimisation paper mein clear dikhaaya gaya.

Planet Earth observation companies jaise Planet Labs daily low-Earth orbit maintenance burns plan karne ke liye yeh equation quick back-of-envelope checks ke liye use karte hain jab drag se semi-major axis ghat-ta hai.

Natural phenomena mein Halley’s comet jaise long-period objects ki speed jab 1 AU par hoti hai, usko vis-viva se seedha predict kiya ja sakta hai bina numerical integration ke.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Specific mechanical energy | Total energy per unit mass constant rehta hai, yahi se equation nikalti hai |
| Conservation of energy | Kinetic + potential = constant, vis-viva ka direct source |
| Semi-major axis      | Elliptical orbit ka energy level define karta hai         |
| Two-body problem     | Reduced mass aur central force assumption zaroori hai     |

Agar specific mechanical energy ya two-body assumptions aapko clear nahi hain to pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Total energy remains constant
Specific mechanical energy ek spacecraft ke liye hamesha same rehti hai kyunki gravity conservative force hai.  
Example: 400 km altitude par ek satellite ki energy 3000 km altitude par bhi exactly same hogi.  
Formal statement:  
$$\varepsilon = \frac{v^2}{2} - \frac{GM}{r} = \text{constant}.$$  
> [!WARNING] Agar aap yahan potential term ka sign galat kar do to final equation ka sign flip ho jaayega aur hyperbolic orbits confuse ho jaayengi.

### Step 2 — Energy at any two points equate karo
Do different radii par energy same hone se velocities relate ho jaati hain.  
Example: perigee aur apogee par radial velocity zero hoti hai lekin speed alag hoti hai.  
Formal:  
$$\frac{v_1^2}{2} - \frac{GM}{r_1} = \frac{v_2^2}{2} - \frac{GM}{r_2}.$$

### Step 3 — Introduce semi-major axis via apsides
Perigee aur apogee ke average se semi-major axis a nikalti hai aur energy uske through express hoti hai.  
Formal result:  
$$\varepsilon = -\frac{GM}{2a}.$$

### Step 4 — Substitute constant energy back
Ab constant energy ko kisi bhi r par likho.  
Formal:  
$$\frac{v^2}{2} - \frac{GM}{r} = -\frac{GM}{2a}.$$

### Step 5 — Algebraic rearrangement
Multiply by 2 aur terms rearrange karo.  
Final textbook form:  
$$v^2 = GM\left(\frac{2}{r} - \frac{1}{a}\right).$$

### Step 6 — Verify limiting cases
Circular orbit (r = a) daal kar check karo: v = sqrt(GM/r) milna chahiye. Escape (a → ∞) par v = sqrt(2GM/r) milna chahiye.

## 5. Worked examples — har step show karo

**Example 1 — Circular low-Earth orbit**  
*Given:* r = 6778 km, a = 6778 km, GM = 3.986 × 10^5 km³/s².  
*Find:* orbital speed.  
Step: v² = GM(2/r − 1/a) = GM(2/r − 1/r) = GM/r.  
*Why:* dono radii same hone se 1/a term cancel ho jaata hai.  
**v = 7.67 km/s**

*Reflection:* yeh sabse simple case hai jisse circular velocity formula recover hota hai.

**Example 2 — ISS actual altitude**  
*Given:* perigee 415 km, apogee 422 km, GM Earth = 3.986 × 10^5 km³/s².  
*Find:* speed at perigee.  
a = (6778 + 415 + 6778 + 422)/2 = 6796.5 km.  
v² = 3.986e5(2/6778 − 1/6796.5).  
*Why:* average radius se a nikaala kyunki energy a par depend karti hai.  
**v = 7.66 km/s**

*Reflection:* chhota eccentricity hone se speed almost circular jaisa hi rehta hai.

**Example 3 — Geostationary transfer orbit apogee**  
*Given:* a = 24 400 km, r = 42 164 km.  
*Find:* speed at apogee.  
v² = 3.986e5(2/42164 − 1/24400).  
*Why:* apogee par speed sabse kam hoti hai isliye negative term dominant.  
**v = 1.60 km/s**

*Reflection:* yeh GTO circularisation burn ke liye delta-v estimate deta hai.

**Example 4 — Parabolic escape trajectory**  
*Given:* r = 6778 km, a → ∞.  
*Find:* escape speed.  
v² = GM(2/r).  
*Why:* 1/a term zero ho jaata hai.  
**v = 11.2 km/s**

*Reflection:* yeh limit case hyperbolic excess velocity zero hone par match karta hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| Sign error in potential     | Students potential ko +GM/r likhte hain | Always negative potential yaad rakho         |
| Using a instead of r        | Confusion between local radius aur size | Clearly define r = current distance, a = constant |
| Forgetting 1/a term         | Circular orbit se habit                 | Always check limiting case a = r             |
| Units mismatch              | km aur m mix karna                      | GM ke units ke hisaab se r aur a fix karo    |
| Applying to hyperbolic without change | a negative hota hai hyperbolic mein     | Negative a ko sahi se 1/a term mein daalo    |
| Ignoring two-body assumption| Real multi-body effects                 | Sirf jab third body perturbation negligible ho tab use karo |

## 7. The textbook-precise statement
The vis-viva equation states that for a body in a Keplerian orbit about a central mass, the speed v at a radial distance r from the focus satisfies  
$$v^2 = GM\left(\frac{2}{r}-\frac{1}{a}\right),$$  
where a is the semi-major axis (negative for hyperbolic orbits) and GM is the gravitational parameter of the central body. This holds under the assumptions of the two-body problem with an inverse-square central force, conservation of specific mechanical energy, and the orbit being a conic section. (Bate, Mueller & White, *Fundamentals of Astrodynamics*, 1971, §2.4)

## 8. Visual — diagram or schematic
```
Focus (Earth)          Perigee          Apogee
     • ------------------•------------------•
          r_p               r_a
          <------- 2a ---------->
```
r current distance hai kisi bhi point par; a = (r_p + r_a)/2 fixed rehta hai. Velocity vector tangential hota hai aur magnitude vis-viva se nikalti hai.

## 9. The memory technique
1. **The hook** — Imagine energy ek bank balance hai: kinetic speed ke square mein aur potential r ke 1/r mein; balance negative hone par orbit band rehti hai.
2. **What to overlearn** — v² = GM(2/r − 1/a) aur ε = −GM/(2a) dono cold yaad hone chahiye.
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din par ek simple circular aur elliptical example solve karo.
4. **First-principles fallback** — Energy equate karo, apsides se a nikaalo, phir rearrange karo.

## 10. What this unlocks
Yeh equation aapko orbital period, escape velocity, aur rendezvous delta-v calculations ke liye seedha entry point deti hai.

- Hohmann transfer orbit design
- Lambert’s problem initial velocity guess
- Orbit determination from two position vectors
- Aerobraking altitude planning

## 11. Self-check — five questions, no answers
1. Derive vis-viva from scratch using only energy conservation in two lines.
2. Calculate speed at 300 km altitude for a circular orbit around Earth.
3. For an elliptical orbit with a = 10 000 km, r = 7000 km, GM = 4 × 10^5 km³/s², speed kya hogi?
4. Agar aap hyperbolic excess velocity zero maan kar vis-viva apply karo to escape speed kaunsa limit deta hai?
5. Identify the mistake: student ne r aur a dono ko 8000 km daal kar v = 0 nikaala — kyun galat hai?