## 1. The one-sentence answer
**Potential energy** is the energy a system stores because of the relative positions of its parts or its location in a force field, recoverable as work when the configuration changes.

Aap is energy ko tab feel karte hain jab koi object height par ho ya spring stretch ho. Force conservative ho to uska kaam path-independent hota hai aur us stored amount ko potential energy kehte hain. Gravitational case mein yeh mgh (near Earth) ya –GMm/r (point masses) ban jaata hai; elastic case mein ½kx² spring ke deformation se aata hai.

> [!NOTE]
> Sabse badi aha yeh hai ki potential energy sirf position ka function hai, velocity ya time ka nahi; isliye total mechanical energy tabhi constant rehti hai jab sirf conservative forces kaam karein.

## 2. Why this matters — concrete and current
SpaceX Starship re-entry trajectories mein engineers –GMm/r gravitational potential use karke exact delta-v budget banate hain, kyunki low-Earth orbit se lunar transfer tak energy difference directly propellant mass decide karti hai.  
James Webb Space Telescope ke sunshield deployment mein elastic potential energy ½kx² spring mechanisms store karti hai jo zero-g mein reliable fold-out deta hai; NASA ke 2021 deployment logs mein yeh energy budget explicitly track kiya gaya tha.  
Semiconductor wire-bonding machines mein ultrasonic transducers elastic potential energy ko control karte hain taaki bond force sub-micron precision mein rahe; ASML aur Kulicke & Soffa ke latest tools yahi principle use karte hain.  
Earthquake early-warning systems building sway ko gravitational potential mgh change ke through measure karte hain; Japan Meteorological Agency ke network mein yeh data 2011 Tohoku quake ke baad refine kiya gaya.  
Perovskite solar-cell research papers (Nature Energy, 2023) elastic lattice distortion ½kx² term ko model karte hain taaki charge-carrier recombination loss predict kiya ja sake.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Work done by force   | Potential energy = negative of work by conservative force |
| Conservative force   | Path independence guarantee karta hai                     |
| Derivative           | Force = –dU/dx se potential se force nikaalte hain        |
| Vector vs scalar     | Potential scalar hai, force vector                        |

Agar “conservative force” ya “work-energy theorem” aapko abhi clear nahi, to pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Energy stored by position
Jab aap ek weight ko upar uthate hain, aapne uske against gravity kaam kiya; woh kaam wapas mil sakta hai jab weight neeche aaye.  
Example: 2 kg weight ko 3 m upar uthao — aapne 58.8 J kaam kiya.  
Formal statement: $$U_g = mgh$$ (constant g ke liye).  
> [!WARNING]
> Agar aap g ko constant maan kar bade height par calculation karo (jaise 1000 km), to energy galat ho jaayegi kyunki g actually vary karta hai.

### Step 2 — General gravitational field
Point-mass field mein force 1/r² se ghat-ta hai, isliye potential bhi 1/r form leta hai.  
Example: Earth-surface se 400 km par ISS ke liye –GMm/r use karna padta hai.  
Formal: $$U = -\frac{GMm}{r}$$.  
> [!WARNING]
> Zero of potential infinity par liya jaata hai; surface par zero lene se sign aur value dono ulat jaayenge.

### Step 3 — Elastic deformation
Spring ko x distance tak khinchne mein force linearly badhta hai, isliye kaam quadratic hota hai.  
Example: k = 200 N/m spring ko 0.1 m khincho — 1 J store hota hai.  
Formal: $$U_s = \frac12 kx^2$$.  
> [!WARNING]
> Hooke’s law sirf small x ke liye valid hai; bade deformation par plastic deformation shuru ho jaata hai aur energy recover nahi hoti.

### Step 4 — Force from potential
Definition se $$ \vec F = -\nabla U $$.  
Yeh step potential energy ko force se link karta hai.

### Step 5 — Total mechanical energy
$$E = K + U$$ conservative systems mein constant rehta hai.

## 5. Worked examples

**Example 1 — Simple lift**  
*Given:* 5 kg mass ko 4 m vertically uthaya gaya, g = 9.8 m/s².  
*Find:* Change in gravitational potential energy.  
Step 1: $$ \Delta U = mg\Delta h $$ likho.  
*Why:* Definition se potential difference height difference ke proportional hota hai.  
Step 2: Numbers daalo: 5 × 9.8 × 4 = 196 J.  
**196 J**  
*Reflection:* Straight calculation; sign positive kyunki height badhi.

**Example 2 — Escape velocity hint**  
*Given:* 1 kg mass surface of Earth (R = 6371 km) se infinity tak jaana hai.  
*Find:* Minimum kinetic energy chahiye.  
Step 1: $$ U_i = -\frac{GM m}{R} $$, $$ U_f = 0 $$.  
*Why:* Infinity par zero convention.  
Step 2: $$ \Delta U = \frac{GM m}{R} = 6.25 \times 10^7 $$ J.  
**6.25 × 10^7 J**  
*Reflection:* Negative potential ki wajah se positive energy chahiye escape ke liye.

**Example 3 — Spring launch**  
*Given:* 0.2 kg mass, k = 800 N/m spring 0.15 m compress.  
*Find:* Release par speed.  
Step 1: ½kx² = 9 J store.  
*Why:* Elastic potential kinetic mein convert.  
Step 2: ½mv² = 9 → v = 9.49 m/s.  
**9.49 m/s**  
*Reflection:* Energy conservation ne velocity directly diya.

**Example 4 — Combined field**  
*Given:* 10 kg mass Earth surface se 200 km upar, plus 0.05 m stretch spring (k = 500 N/m).  
*Find:* Total potential change.  
Step 1: Gravitational: –GMm/r₂ + GMm/R.  
Step 2: Elastic: ½kx² = 0.625 J.  
Step 3: Total ≈ 6.19 × 10^6 J + 0.625 J.  
**6.19 × 10^6 J**  
*Reflection:* Dono potentials add hote hain kyunki dono conservative hain.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                           | How to avoid it                              |
|-----------------------------|------------------------------------------|----------------------------------------------|
| mgh use karna 500 km height par | g constant samajhna                      | –GMm/r formula ya g(h) = g(R/(R+h))² use karo |
| Potential zero surface par lena | School textbooks aise karte hain         | Zero infinity par fix karo, sign check karo  |
| Spring energy ½kx² ke jagah kx² likhna | ½ factor bhool jaana                     | Integration ya average force yaad rakho      |
| Negative gravitational sign bhoolna | Intuition positive energy chahta hai     | Infinity zero convention yaad rakho          |
| Non-conservative work add karna | Friction ya drag ignore karna            | Mechanical energy tabhi constant jab sirf conservative forces hon |
| x spring compression mein negative lena | Direction convention confuse hona        | x² hone se sign matter nahi karta            |

## 7. The textbook-precise statement
A conservative force field \(\vec F\) admits a scalar potential energy function \(U\) such that \(\vec F = -\nabla U\) and the work done between any two points is path-independent. For a uniform gravitational field the potential is \(U(\vec r) = m\vec g\cdot\vec r + C\); for Newtonian gravity of two point masses it is \(U(r) = -GMm/r + C\) with the conventional choice \(C = 0\) at infinity. For a linear spring obeying Hooke’s law the elastic potential is \(U(x) = \frac12 kx^2\). (Taylor, *Classical Mechanics*, 2005, §4.3 & §4.5)

## 8. Visual — diagram or schematic
```
          y ↑
            |       U = mgh  (straight line)
            |      /
            |     /
   U=0 -----+----/------------ x (or h)
            |   /
            |  /
Grav. U →   | /   U = -GMm/r  (hyperbola, asymptote 0)
            |/
   -∞ ------+----------------→ r
```
Horizontal axis height or radial distance; vertical axis shows linear rise for constant-g and 1/r decay for point-mass gravity.

## 9. The memory technique
1. **The hook** — Imagine a “potential bank account”: height or stretch balance mein energy jama hoti hai, jab object neeche aata hai ya spring chhodte hain toh balance se withdraw hota hai.
2. **What to overlearn** — \(U_g = mgh\), \(U = -GMm/r\), \(U_s = \frac12 kx^2\), aur \(F = -\nabla U\).
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Work = ∫F·dr integrate karke potential nikaal lo; zero point infinity par rakh ke sign check karo.

## 10. What this unlocks
Yeh section aapko energy conservation, orbital mechanics, aur simple harmonic motion ke liye taiyar karta hai.  
- Escape velocity aur orbital energy calculations  
- Satellite station-keeping delta-v budgets  
- Spring-mass damper systems aur vibration analysis  
- Lennard-Jones potential jaise advanced intermolecular potentials samajhne ka base

## 11. Self-check — five questions, no answers
1. 3 kg mass ko 10 m upar uthane mein kitna gravitational potential badlega (g = 9.8)?  
2. Earth se 1000 km door 1 kg mass ka potential –GMm/r se calculate karo aur mgh se compare karo.  
3. Ek spring k = 400 N/m ko 8 cm compress kiya gaya; stored energy kitni?  
4. Agar aap gravitational potential ka zero surface par lete ho to –GMm/r expression mein kya badlega?  
5. Ek conservative force F = –kx se kaunsa potential energy function milega?