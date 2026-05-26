## 1. The one-sentence answer
**Magnetic force on a moving charge is the vector F = q(v × B), always perpendicular to both velocity and field, doing no work but curving the path.**

Iska matlab yeh hai ki jab koi charged particle velocity ke saath move karta hai, tab magnetic field us par ek force lagata hai jo sirf direction badalta hai, speed nahi. Force ka magnitude qvB sinθ hota hai jahaan θ velocity aur B ke beech ka angle hai. Direction right-hand rule se nikalti hai: fingers velocity ki taraf, palm B ki taraf, thumb force ki direction (positive charge ke liye).

Aap dekh sakte hain ki parallel velocity component force se bilkul affect nahi hota, sirf perpendicular component circular ya helical path banata hai. Yeh property particle detectors aur plasma confinement mein kaam aati hai.

> [!NOTE]
> Sabse badi aha yeh hai ki magnetic force velocity ke saath hamesha perpendicular rehta hai, isliye kinetic energy constant rehti hai — sirf direction change hoti hai.

## 2. Why this matters — concrete and current
NASA ke Parker Solar Probe mission mein solar wind ke protons aur electrons ko magnetic field lines follow karte hue measure kiya jaata hai, jahaan F = qv×B unke trajectories ko shape deta hai aur data interpretation mein use hota hai.

CERN ke Large Hadron Collider mein proton beams ko dipole magnets se bend kiya jaata hai; har magnet ka B field exactly isi cross-product force se calculate kiya jaata hai taaki 27 km ring mein stable orbit bane.

SpaceX Starship aur future electric propulsion concepts mein magnetic nozzles plasma ko steer karte hain, jahaan Lorentz force ions ko accelerate aur direct karta hai without physical walls touching.

Semiconductor industry mein Hall-effect sensors (Bosch aur Infineon ke automotive chips) charge carriers par lage F = qv×B ko voltage mein convert karke current aur position detect karte hain.

Natural phenomenon mein Earth ka magnetic field cosmic rays ko deflect karta hai; ISS par astronauts ke radiation exposure ko yeh force directly control karti hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Vector cross product | Force direction aur magnitude nikalne ke liye zaroori     |
| Right-hand rule      | v × B ki perpendicular direction samajhne ke liye         |
| Scalar multiplication by q | Charge sign force direction ulta kar deta hai             |
| Unit vectors         | 3D space mein components alag-alag dekhne ke liye         |

Agar cross product ya right-hand rule weak hai to pause karke usko pehle revise karo.

## 4. Building the idea — from intuition to formalism

### Step 1 — No work, only direction change
Magnetic field moving charge par force lagata hai lekin velocity ke perpendicular hone ki wajah se kaam nahi karta. Ek concrete example: electron gun se nikla electron horizontal velocity ke saath vertical B field mein ghus jaaye to sirf sideways mudta hai, speed same rehti hai.

Formal statement: magnetic force ka dot product velocity ke saath zero hota hai, F · v = 0.

> [!WARNING]
> Agar aap force ko velocity ke parallel maan lete ho to energy conservation toot jaayegi aur calculations galat ho jaayengi.

### Step 2 — Magnitude from experiments
Experiments (J.J. Thomson’s e/m measurement) dikhate hain ki force proportional hai charge, speed aur field strength ke product ko, aur sinθ factor angle par depend karta hai.

Formal: |F| = q v B sinθ.

### Step 3 — Direction via right-hand rule
Right-hand rule deta hai ki v, B aur F mutually perpendicular hain. Positive charge ke liye v fingers, B palm, F thumb.

Formal vector: F = q (v × B) jahaan × cross product hai.

### Step 4 — Component decomposition
Velocity ko parallel aur perpendicular parts mein todte hain. Parallel component (v∥) force zero deti hai; perpendicular (v⊥) circular motion produce karti hai.

Formal: F = q v⊥ B (magnitude) with radius r = mv⊥ / (qB).

### Step 5 — Full vector equation
Sab combine karke textbook form milta hai.

Formal statement: \(\vec{F} = q (\vec{v} \times \vec{B})\).

## 5. Worked examples — har step show karo

**Example 1 — Perpendicular case**
*Given:* q = +1.6×10⁻¹⁹ C, v = 5×10⁶ m/s in +x, B = 0.2 T in +z.
*Find:* Force vector.
Step 1: θ = 90°, sinθ = 1. *Why*: components fully perpendicular hain.
Step 2: |F| = qvB = 1.6×10⁻¹⁹ × 5×10⁶ × 0.2 = 1.6×10⁻¹³ N. *Why*: magnitude formula seedha apply.
Step 3: Direction +y (right-hand rule). *Why*: x cross z = y.
**Final answer** \(\vec{F} = 1.6 \times 10^{-13} \hat{j}\) N  
*Reflection*: Yeh basic case hai; har perpendicular situation mein yahi pattern repeat hota hai.

**Example 2 — Parallel velocity**
*Given:* Same values lekin v also has 3×10⁶ m/s in +z.
*Find:* Force.
Step 1: v⊥ = 5×10⁶ m/s, v∥ ignore. *Why*: parallel part cross product zero deta hai.
Step 2: |F| remains 1.6×10⁻¹³ N in +y. *Why*: sirf perpendicular component contribute karta hai.
**Final answer** \(\vec{F} = 1.6 \times 10^{-13} \hat{j}\) N  
*Reflection*: Helical path ka seedha demonstration.

**Example 3 — Arbitrary angle**
*Given:* v = 4×10⁶ m/s at 30° to B = 0.5 T, q = e.
*Find:* Force magnitude.
Step 1: sin30° = 0.5. *Why*: angle component nikaalna zaroori.
Step 2: F = qvB sinθ = 1.6×10⁻¹⁹ × 4×10⁶ × 0.5 × 0.5 = 1.6×10⁻¹³ N. *Why*: formula exact.
**Final answer** 1.6×10⁻¹³ N  
*Reflection*: Angle factor bhoolna common error hai.

**Example 4 — Electron in mixed field**
*Given:* Electron (q = −e), v = (3,0,4)×10⁶ m/s, B = (0,0,0.1) T.
*Find:* Force.
Step 1: v × B = determinant se (4e6×0.1, −3e6×0.1, 0). *Why*: vector cross product rules apply.
Step 2: Multiply by q = −e (negative sign reverses direction). *Why*: charge sign force direction ulta karta hai.
**Final answer** \(\vec{F} = (-6.4 \times 10^{-14}, -4.8 \times 10^{-14}, 0)\) N  
*Reflection*: 3D components handle karna seekhna zaroori hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                           | How to avoid it                              |
|-----------------------------|------------------------------------------|----------------------------------------------|
| Using |F| = qvB without sinθ   | Forgetting angle dependence              | Always resolve v into v⊥ first           |
| Wrong force direction       | Left-hand rule galti se use karna        | Strictly right-hand rule ya vector cross product yaad rakho |
| Ignoring charge sign        | Electron ko positive treat karna         | q negative hone par direction reverse karo   |
| Adding parallel velocity to radius formula | Misunderstanding helical motion     | r = m v⊥ / (qB) sirf perpendicular speed se  |
| Units mismatch              | Tesla, coulomb, m/s mix karna            | SI units check karo har baar                 |
| Assuming force does work    | Classical intuition se sochna            | Dot product F·v = 0 verify karo              |
| 2D plane mein 3D vector bhoolna | Diagram flat dekhna                 | Har component alag se likho                  |

## 7. The textbook-precise statement
The magnetic force exerted on a point charge q moving with velocity v in a magnetic field B is given exactly by the expression  
\(\vec{F}_B = q (\vec{v} \times \vec{B})\),  
where the cross product is taken in the usual right-handed sense. This relation holds in SI units when B is expressed in tesla, v in m s⁻¹ and q in coulomb. The force is always orthogonal to v, hence does no work. (Griffiths, *Introduction to Electrodynamics*, 4e, §5.1)

## 8. Visual — diagram or schematic
```
      z
      ↑
      |     F (+y)
      |    ↗
      |   /
 B    |  /  v (in x-y plane)
(along z)→
      |
      +----------→ x
```
v lies in x-y plane, B along z; F comes out along +y for positive q. Coordinates: v = (vx, vy, 0), B = (0,0,Bz), F = q(vy Bz, −vx Bz, 0).

## 9. The memory technique
1. **The hook** — Imagine your right hand holding a gun: index finger = velocity, middle finger = B field, thumb = force (positive charge).
2. **What to overlearn** — F = q(v × B) and r = mv⊥/(qB) for cyclotron radius.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Cross product determinant yaad na ho to components likho: i(j k) determinant se force nikaal lo.

## 10. What this unlocks
Yeh equation cyclotron motion, magnetic mirrors aur ExB drift jaise advanced plasma phenomena ka foundation hai.  
- Next: Lorentz force full form (E + v×B)  
- Magnetic confinement in tokamaks  
- Mass spectrometers aur velocity selectors  
- Synchrotron radiation calculations

## 11. Self-check — five questions, no answers
1. Ek proton v = 10⁷ m/s, B = 0.05 T perpendicular mein ghum raha hai. Radius kya hoga?
2. Agar velocity aur B parallel hain to force kya hogi? Proof do.
3. Electron aur proton same speed aur B mein; kis ka radius bada hoga aur kyun?
4. 3D vector v = (1,2,3), B = (0,1,0) ke liye force direction batao (q positive).
5. Formula F = qvB sinθ use karke energy change zero prove karo.