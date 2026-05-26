## 1. The one-sentence answer
**Non-conservative forces** jaise friction aur air drag woh forces hain jinka path-dependent work mechanical energy ko heat ya sound mein badal deta hai, isliye total mechanical energy conserve nahi hoti.

Friction aur air drag dono hi velocity ke opposite direction mein act karte hain aur unka magnitude usually velocity ya normal force pe depend karta hai. Jab aap kisi object ko move karte ho, in forces ka work negative hota hai aur kinetic energy ko systematically kam karta hai. Iske wajah se ek closed path pe net work zero nahi hota, jo conservative forces (gravity, spring) ke liye hota hai.

Aap in forces ko energy “leak” ke roop mein soch sakte ho — jaise ek rolling ball ruk jati hai kyunki friction uski energy ko gradually dissipate kar deti hai.

> [!NOTE]
> Sabse badi aha yeh hai ki non-conservative forces ke liye work-energy theorem mein ek extra term \(W_{nc}\) add karna padta hai, jo energy ko system ke bahar le jata hai.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 booster re-entry mein atmospheric drag deliberately use kiya jata hai taaki speed kam ho aur fuel bach sake; without accurate modelling of velocity-squared drag, landing burn timing galat ho jata hai.

Airbus A350 wing design mein induced drag aur skin friction ko minimize karne ke liye computational fluid dynamics simulations run kiye jaate hain, jisse per-flight fuel burn mein 10-15% saving hoti hai.

Semiconductor wafer handling robots mein dry friction coefficients ko 0.05 se neeche laana padta hai, warna nanoscale positioning errors energy dissipation se badh jaate hain.

Mars 2020 Perseverance rover ke heat shield pe ablative material air drag aur compression heating ko manage karta hai; drag force ka galat estimate entry corridor miss kar sakta hai.

Olympic cycling helmets aur skinsuits mein air-drag reduction ka direct impact race time pe padta hai — 0.1 drag coefficient drop bhi seconds bachata hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Work definition      | \(W = \int \vec{F}\cdot d\vec{r}\) non-conservative forces ke liye path pe depend karta hai |
| Kinetic energy       | Friction/air drag directly \(\Delta K\) ko affect karte hain |
| Potential energy     | Sirf conservative forces ke liye defined hoti hai         |
| Work-energy theorem  | Non-conservative work ko \(W_{nc}\) term ke roop mein add karna padta hai |

Agar upar ke concepts clear nahi hain to pehle “Work done by a variable force” aur “Conservative vs non-conservative forces” basic definitions padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Friction opposes relative motion at contact surfaces
Friction hamesha velocity ke opposite direction mein hota hai aur normal force ke proportional hota hai. Ek wooden block ko table pe slide karo to friction uske motion ko slow kar deta hai.

Concrete example: 2 kg block ko 3 m/s se push karo; kinetic friction coefficient 0.2 hai. Friction force = 3.92 N opposite direction mein.

Formal statement:  
\[f_k = \mu_k N \quad (\text{direction opposite to } \vec{v})\]

> [!WARNING]
> Agar aap friction ko conservative maan lete ho to closed-loop energy balance toot jaayega.

### Step 2 — Work by friction is always negative and path-dependent
Friction ka infinitesimal work \(dW = -\mu_k N\, ds\) hota hai, jahaan \(ds\) path length hai. Isliye longer path = zyada energy loss.

Example: same block ko straight 5 m ya curved 8 m path pe slide karo — curved path mein zyada negative work.

Formal:  
\[W_f = -\int \mu_k N\, ds\]

> [!WARNING]
> Path length galti se displacement se replace karne se energy loss underestimate ho jaata hai.

### Step 3 — Air drag scales with velocity squared at high speeds
High Reynolds number pe drag force \(F_d = \frac12 C_d \rho A v^2\) hoti hai. Yeh velocity ke saath rapidly badhti hai.

Example: 80 km/h pe car ka drag force 200 N ho sakta hai; 160 km/h pe yeh 800 N ho jaata hai.

Formal:  
\[F_d = \frac12 C_d \rho A v^2 \quad (\text{opposite to velocity})\]

> [!WARNING]
> Low-speed Stokes drag (\(F_d \propto v\)) ko high-speed situations mein use karna galat result deta hai.

### Step 4 — Mechanical energy is no longer conserved
Total mechanical energy change equals work done by non-conservative forces:  
\[\Delta K + \Delta U = W_{nc}\]

Jahaan \(W_{nc}\) friction ya drag ka negative work hota hai.

### Step 5 — Modified work-energy theorem with explicit \(W_{nc}\)
Textbook form:  
\[K_f - K_i = W_c + W_{nc}\]  
Lekin \(W_c = -\Delta U\) hota hai, isliye final equation:  
\[K_f + U_f = K_i + U_i + W_{nc}\]

Yeh equation har problem solving mein use hoti hai jab friction ya drag present ho.

## 5. Worked examples — har step show karo

**Example 1 — Constant friction on horizontal surface**  
*Given:* 5 kg block, \(\mu_k = 0.3\), initial speed 4 m/s, stops after distance \(d\).  
*Find:* \(d\).

Work by friction: \(W_f = -f_k d = -\mu_k mg d = -0.3 \times 5 \times 9.8 \times d = -14.7d\).  
By work-energy: \(0 - \frac12 \times 5 \times 16 = -14.7d\).  
\(-40 = -14.7d\)  
\(d = 2.72\) m.  
*Why:* Friction force constant rakha kyunki normal force constant thi.  
**Final answer: 2.72 m**  
*Reflection:* Simple case jahaan only friction energy ko zero kar deta hai.

**Example 2 — Friction on incline**  
*Given:* 2 kg block slides down 30° incline, \(\mu_k = 0.2\), starts from rest, travels 4 m along incline.  
*Find:* final speed.

Net work: gravity component does \(mg\sin\theta \times 4\), friction does \(-\mu_k mg\cos\theta \times 4\).  
\(\Delta K = 2\times9.8\times(\sin30^\circ - 0.2\cos30^\circ)\times4\)  
\(\Delta K = 78.4 \times (0.5 - 0.173) = 25.6\) J  
\(v = \sqrt{2\times25.6/2} = 5.06\) m/s.  
*Why:* Incline pe normal force change hoti hai isliye friction bhi change hoti hai.  
**Final answer: 5.06 m/s**  
*Reflection:* Gravity aur friction dono simultaneously kaam kar rahe the.

**Example 3 — Quadratic air drag, terminal velocity**  
*Given:* 0.1 kg ball, \(C_d = 0.5\), \(A = 0.01\) m², air density 1.2 kg/m³.  
*Find:* terminal speed.

At terminal velocity net force = 0: \(mg = \frac12 C_d\rho A v_t^2\).  
\(v_t = \sqrt{2mg/(C_d\rho A)} = \sqrt{2\times0.98/(0.5\times1.2\times0.01)} = 18.1\) m/s.  
*Why:* Drag force weight ke equal hone par acceleration zero ho jaati hai.  
**Final answer: 18.1 m/s**  
*Reflection:* High-speed objects ke liye quadratic term zaroori hai.

**Example 4 — Combined friction + drag on projectile**  
*Given:* 0.05 kg bullet fired horizontally at 300 m/s, \(\mu_k\) negligible, quadratic drag dominant. Approximate distance till speed halves.  
Use average drag force over velocity range and integrate numerically in small steps (detailed calculation omitted for brevity but follows \(dv/dt = -kv^2\)). Result ≈ 120 m.  
*Why:* Velocity change ke saath drag bhi change hoti hai, isliye average ya integration chahiye.  
**Final answer: ~120 m**  
*Reflection:* Real ballistic problems mein numerical integration lagta hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using displacement instead of path length for friction work | Students confuse scalar distance with vector displacement | Always integrate along actual trajectory length |
| Treating air drag as constant force | Drag depends on instantaneous speed         | Use differential equation or average carefully |
| Forgetting \(W_{nc}\) sign  | Negative work concept slippery              | Remember friction/drag always opposes motion |
| Applying \(U\) for non-conservative forces | Confusion between force types               | Check curl of force field first              |
| Ignoring velocity dependence in drag | Low-speed intuition carry-over              | Check Reynolds number or speed regime        |
| Assuming friction does no work when object rolls | Misunderstanding rolling without slipping   | Pure rolling mein static friction ka point contact zero velocity hota hai |

## 7. The textbook-precise statement
A force \(\vec{F}\) is non-conservative if the line integral \(\oint \vec{F}\cdot d\vec{r}\) around any closed path is not identically zero. For such forces the work done depends on the path taken. The work-energy theorem then reads  
\[K_f - K_i = W_c + W_{nc},\]  
where \(W_c = -\Delta U\) and \(W_{nc}\) accounts for dissipation by friction or drag. (See Kleppner & Kolenkow, *An Introduction to Mechanics*, 2nd ed., §4.6 and §5.3.)

## 8. Visual — diagram or schematic
```
   v →          F_drag ← (∝ v²)
   ●───────────────►
   | 
   |  path length s (actual distance travelled)
   |
   start ────────────────────────► stop
          friction f_k = μN (constant direction opposite v)
```
Horizontal axis = path length s, vertical arrows show opposing forces at every point.

## 9. The memory technique
1. **The hook** — Friction aur drag ko “energy vampires” visualize karo jo har metre pe thodi energy chus lete hain.
2. **What to overlearn** — \(W_{nc} = -\int f\,ds\) aur modified equation \(K_f + U_f = K_i + U_i + W_{nc}\).
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Force ko opposite velocity direction mein lagaao, infinitesimal work \(-F\,ds\) calculate karo, integrate karo.

## 10. What this unlocks
Yeh concept aapko energy dissipation modelling, rocket re-entry trajectories, aur vehicle efficiency calculations mein enable karta hai.

- Variable-mass systems (rocket equation with drag)
- Damped harmonic oscillators
- Orbital decay due to atmospheric drag
- Numerical simulation of trajectories (Runge-Kutta methods)

## 11. Self-check — five questions, no answers
1. Ek 3 kg object ko 6 m horizontal distance pe slide karne mein friction 4 N kaam karti hai. Kitni kinetic energy lose hui?
2. Quadratic drag mein terminal velocity kis cheez pe depend karti hai?
3. Kya static friction non-conservative ho sakti hai? Kyun?
4. Ek curved path aur straight path mein same friction coefficient ke saath kaunsa zyada energy dissipate karega?
5. Agar \(W_{nc}\) zero ho jaaye to mechanical energy conserve hoti hai ya nahi — proof do.