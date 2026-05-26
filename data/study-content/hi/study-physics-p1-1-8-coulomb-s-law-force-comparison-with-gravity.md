## 1. The one-sentence answer
**Coulomb's law states that the electrostatic force between two stationary point charges is directly proportional to the product of the charges and inversely proportional to the square of the distance between them.**

Iska matlab yeh hai ki force vector form mein likha jaata hai aur yeh gravity ke law se bahut milta-julta hai, lekin charges positive ya negative ho sakte hain isliye force attract ya repel dono kar sakti hai. Gravity sirf masses ke beech attract karti hai aur hamesha weak hoti hai compared to electrostatic force jab charges present hon. Aap is law ko samajh kar electric fields aur rocket propulsion systems jaise ion thrusters ko model kar sakte hain.

> [!NOTE]
> Sabse badi "aha" yeh hai ki dono laws inverse-square form share karte hain, isliye unke mathematical consequences (field lines, potential) parallel hain, lekin electrostatic force ki strength aur sign flexibility usey gravity se alag karti hai.

## 2. Why this matters — concrete and current
SpaceX Starlink satellites mein electrostatic actuators solar array deployment ke liye Coulomb forces ka use karte hain taaki vibration control ho sake without mechanical wear.

NASA's Dawn mission ne ion thrusters mein charged particle acceleration ke liye Coulomb's law based electric fields design kiye, jisse low-thrust but high-efficiency trajectory control possible hui.

Semiconductor fabs mein ASML ke EUV lithography machines photoresist contamination avoid karne ke liye electrostatic chucks use karte hain jo Coulomb repulsion se wafers ko hold karte hain.

Particle physics detectors jaise LHC ke CMS experiment mein Coulomb scattering data se charge-to-mass ratios measure kiye jaate hain, jo dark matter search models ko constrain karte hain.

Natural phenomenon mein lightning initiation ke time pe thundercloud charge separation Coulomb forces se govern hoti hai, jo weather prediction models mein input hoti hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Vector addition      | Force direction aur net field calculation ke liye         |
| Newton's third law   | Action-reaction pairs samajhne ke liye                    |
| Inverse-square scaling | Distance dependence ko quantify karne ke liye          |
| Scalar vs vector quantities | Charge product scalar hai lekin force vector hai     |

Agar vector addition weak hai to pehle 2D force resolution practice karo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Charges exert forces at a distance
Do stationary charges ek dusre par force lagate hain bina direct contact ke.  
Example: ek plastic rod ko silk se rub karne ke baad woh paper pieces ko attract karta hai.  
Formal statement: force \(\vec{F}\) charge \(q_1\) aur \(q_2\) ke beech exist karti hai.  
> [!WARNING]
> Agar aap force ko sirf contact force samjhein to field concept kabhi nahi banega.

### Step 2 — Magnitude depends on charge product and distance squared
Force ki strength charge values ke product ke saath badhti hai aur distance ke square se ghatti hai.  
Example: agar dono charges double ho jaayein to force 4× ho jaati hai, lekin distance double karne se force 1/4 ho jaati hai.  
Formal: \(F \propto \frac{|q_1 q_2|}{r^2}\).  
> [!WARNING]
> Sign bhool jaane se force direction galat ho jaati hai.

### Step 3 — Introduce the constant of proportionality
Experimental measurement se constant \(k = 8.99 \times 10^9\) N·m²/C² aata hai.  
Formal: \(F = k \frac{|q_1 q_2|}{r^2}\).  
> [!WARNING]
> \(k\) ko 1/(4\pi\epsilon_0) ke saath confuse mat karo jab SI units use ho rahe hon.

### Step 4 — Add vector direction with sign of charges
Force vector radial hoti hai; same signs repel, opposite attract.  
Formal: \(\vec{F}_{12} = k \frac{q_1 q_2}{r^2} \hat{r}_{12}\).  
> [!WARNING]
> Direction \(\hat{r}\) define karna bhoolne se Newton's third law violate hoti dikhegi.

### Step 5 — Write the comparison with gravity
Gravity bhi same form leti hai lekin mass hamesha positive aur constant weak hota hai.  
Formal: \(\vec{F}_g = G \frac{m_1 m_2}{r^2} \hat{r}\), \(G = 6.67 \times 10^{-11}\).  
> [!WARNING]
> Strength ratio \(k/G \approx 10^{20}\) bhoolne se macroscopic vs microscopic forces galat judge hote hain.

### Step 6 — State the complete law for point charges
Dono laws ko ek saath rakh kar superposition principle add karo.  
Formal textbook-grade equation: \(\vec{F}_{12} = k \frac{q_1 q_2}{r_{12}^2} \hat{r}_{12}\) with \(k = 1/(4\pi\epsilon_0)\).

## 5. Worked examples — har step show karo

**Example 1 — Two positive charges**  
*Given:* \(q_1 = 2\,\mu\)C, \(q_2 = 3\,\mu\)C, \(r = 0.5\) m.  
*Find:* magnitude of force.  
Step 1: convert to coulombs → \(2 \times 10^{-6}\) C.  
Step 2: plug into magnitude formula \(F = k \frac{q_1 q_2}{r^2}\).  
Step 3: calculate \(k \times 6 \times 10^{-12} / 0.25 = 0.2158\) N.  
*Why* each conversion kiya: units consistent rakhne ke liye.  
**Final answer: 0.216 N (repulsive)**  
*Reflection:* basic magnitude calculation, generalises directly to any same-sign pair.

**Example 2 — Attractive force with electron and proton**  
*Given:* electron charge \(-e\), proton \(+e\), \(r = 5.29 \times 10^{-11}\) m (Bohr radius).  
*Find:* magnitude.  
Step 1: \(e = 1.6 \times 10^{-19}\) C.  
Step 2: \(F = k e^2 / r^2\).  
Step 3: numerical evaluation gives 8.23 × 10^{-8} N.  
*Why* negative sign ignore kiya: magnitude maanga gaya tha.  
**Final answer: 8.23 × 10^{-8} N**  
*Reflection:* shows how atomic scales pe force huge hoti hai.

**Example 3 — Compare electrostatic vs gravitational force**  
*Given:* same electron-proton pair.  
*Find:* ratio \(F_e / F_g\).  
Step 1: write both formulas.  
Step 2: ratio = \(k e^2 / (G m_e m_p)\).  
Step 3: plug numbers → ≈ 2.27 × 10^{39}.  
*Why* masses use kiye: gravity comparison ke liye.  
**Final answer: 2.27 × 10^{39}**  
*Reflection:* electrostatic force overwhelmingly stronger at small scales.

**Example 4 — Net force on third charge**  
*Given:* three charges in line, q1 at 0, q2 at 0.2 m, q3 at 0.5 m.  
*Find:* force on q3.  
Step 1: calculate pairwise vectors.  
Step 2: add components (here 1D).  
Step 3: net = F_{13} + F_{23}.  
*Why* vector addition kiya: superposition.  
**Final answer: net force vector (direction dependent on signs)**  
*Reflection:* real problems mein multiple charges superposition lagta hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| Forgetting vector direction | Treating force as scalar                | Always draw \(\hat{r}\) arrow first          |
| Sign error in charge product| Missing negative charge effect          | Write q1 and q2 with signs before multiplying|
| Using k = 9 × 10^9 without 4\pi\epsilon_0 | Unit confusion                     | Memorise both forms together                 |
| Comparing magnitudes without constants | Ignoring k vs G difference         | Always compute ratio explicitly              |
| Assuming force independent of medium | Vacuum formula apply karna medium mein | Check \(\epsilon\) value if given            |
| 2D/3D problems mein angle galat | Only radial component sochna         | Resolve into x-y components explicitly       |

## 7. The textbook-precise statement
Coulomb's law asserts that the force exerted by a point charge \(q_1\) on another point charge \(q_2\) separated by a displacement vector \(\vec{r}_{12}\) in vacuum is
\[
\vec{F}_{12} = \frac{1}{4\pi\epsilon_0}\frac{q_1 q_2}{r_{12}^2}\hat{r}_{12},
\]
where \(\epsilon_0 = 8.854 \times 10^{-12}\) F/m, the charges are stationary, and the surrounding medium is linear, homogeneous, and isotropic. The force obeys Newton's third law and the principle of superposition. (Griffiths, *Introduction to Electrodynamics*, 4e, §2.1)

## 8. Visual — diagram or schematic
```text
q1 (+) ---------------- r ----------------> q2 (+)
          <--- F12 (repulsive)     F21 --->
               \hat{r} from q1 to q2
```
Horizontal line pe two charges, arrows outward for repulsion, \(\hat{r}\) clearly labelled from source to test charge.

## 9. The memory technique
1. **The hook** — Imagine two balloons rubbed on hair; they push apart exactly like same-sign charges under an invisible inverse-square spring.
2. **What to overlearn** — \(F = k q_1 q_2 / r^2\) vector form and \(k/G \approx 10^{20}\).
3. **Spaced-repetition schedule** — Review 1 day, 3 days, 7 days, 16 days, 35 days after first study.
4. **First-principles fallback** — Derive from experimental inverse-square observation plus proportionality to charge product, then insert measured k.

## 10. What this unlocks
Coulomb's law directly leads to the definition of electric field and Gauss's law.  
- Electric field of continuous charge distributions  
- Electric potential and voltage calculations  
- Ion thruster performance equations in rocket propulsion  
- Atomic orbital models in quantum mechanics foundations  

## 11. Self-check — five questions, no answers
1. Two charges 4 μC and −2 μC are 10 cm apart; calculate the force vector on each.  
2. Why does the electron-proton force ratio remain constant regardless of distance?  
3. A third charge is placed midway between two equal positive charges; qualitatively describe net force.  
4. If the medium dielectric constant becomes 2, by what factor does the force change?  
5. Identify the mistake: a student writes \(F = G q_1 q_2 / r^2\) and claims it equals gravitational force.