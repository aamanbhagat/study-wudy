## 1. The one-sentence answer
**Bernoulli's equation** is the integrated form of Newton's second law applied to an inviscid fluid particle moving along a streamline.

Aap streamline ke along ek small fluid element ko consider karte ho. Us element par pressure force aur gravity force lagte hain. In forces ko mass × acceleration ke barabar set karne se ek differential equation milti hai jo velocity, pressure aur height ko relate karti hai. Isko integrate karne par constant total head ka result aata hai.

Yeh derivation sirf inviscid flow aur steady flow ke liye valid hai, lekin yeh rocket nozzles aur airfoil lift jaise practical problems mein directly use hoti hai.

> [!NOTE]
> Sabse badi “aha” yeh hai ki pressure aur velocity ek dusre ke trade-off karte hain taaki unka sum (plus potential) streamline ke along constant rahe — yeh energy conservation nahi, balki momentum conservation ka direct result hai.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 ke Merlin engines mein nozzle ke andar flow ko model karne ke liye Bernoulli ka integrated form use kiya jata hai taaki chamber pressure se exit velocity calculate ki ja sake; isse thrust prediction 2 % ke andar hoti hai.

Airbus A350 ke wing design mein CFD validation ke liye along upper surface streamline par Bernoulli ka pressure-velocity relation check kiya jata hai, jisse shock-induced separation ko avoid kiya ja sake.

ISRO ke GSLV cryogenic upper stage ke LOX/LH2 turbopump discharge line mein pressure recovery predict karne ke liye yeh equation first-order estimate deti hai jab full Navier-Stokes solve karna costly ho.

Natural phenomena mein, Jupiter ke Great Red Spot ke andar high-speed jets aur low-pressure cores ka balance exactly isi streamline momentum balance se samajha jata hai, jo recent Juno mission data se match karta hai.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Streamline definition    | Acceleration sirf tangential direction mein allowed hai   |
| Eulerian vs Lagrangian   | Force balance instantaneous fluid element par lagta hai   |
| Inviscid assumption      | Shear stress zero mana jata hai, warna extra term aayega   |
| Steady flow              | Local acceleration term zero hota hai                     |
| Body force (gravity)     | Potential term ρgz generate karta hai                     |

Agar upar ke koi bhi concept clear nahi hain to pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Choose a streamline and a fluid element
Aap ek arbitrary streamline lete ho aur uske along ek infinitesimal length ds ka fluid element consider karte ho. Element ka cross-section area A hai aur density ρ constant maani jaati hai.

Concrete example: horizontal streamline in a pipe jismein velocity badh rahi hai.

Formal statement: element ka mass dm = ρ A ds.

> [!WARNING]
> Agar aap element ko streamline se hatakar lete ho to normal acceleration term aa jayega aur pura derivation toot jayega.

### Step 2 — Write acceleration along the streamline
Tangential direction mein acceleration sirf convective hota hai kyunki flow steady hai: a_s = v ∂v/∂s.

Formal: a_s = v (dv/ds).

### Step 3 — Identify forces in the tangential direction
Pressure force net = −(dp) A. Gravity component = −ρ g A ds (dz/ds).

Formal force balance: −dp A − ρ g A ds (dz/ds) = dm · a_s.

### Step 4 — Substitute mass and acceleration
ρ A ds · v (dv/ds) = −A dp − ρ g A ds (dz/ds).

A ko cancel karne ke baad: ρ v dv + dp + ρ g dz = 0.

### Step 5 — Divide by density and recognise exact differentials
v dv + dp/ρ + g dz = 0.

Yeh already exact differential form hai.

### Step 6 — Integrate along the streamline
∫ v dv + ∫ dp/ρ + g ∫ dz = constant.

Constant-density case mein: ½ v² + p/ρ + g z = constant.

### Step 7 — State the final Bernoulli equation
p + ½ ρ v² + ρ g z = constant along a streamline.

### Step 8 — Note the restrictions explicitly
Equation tabhi valid hai jab ρ constant, viscosity zero, flow steady aur barotropic ho.

## 5. Worked examples — har step show karo

**Example 1 — Horizontal pipe contraction**
*Given:* ρ = 1000 kg m⁻³, v₁ = 2 m s⁻¹, p₁ = 200 kPa, A₁/A₂ = 4.
*Find:* p₂.
Step 1: z₁ = z₂, isliye p₁ + ½ρv₁² = p₂ + ½ρv₂².
Step 2: Continuity se v₂ = 8 m s⁻¹.
Step 3: p₂ = 200000 + 500(4 − 64) = 170000 Pa.
*Why:* Continuity se velocity double nahi, quadruple ho gayi kyunki area ratio 4 hai.
**Final answer**  
170 kPa

*Reflection:* Simple case jisme gravity absent hai, isliye pressure drop directly kinetic energy gain se match karta hai.

**Example 2 — Tank draining from orifice**
*Given:* Large tank, surface velocity ≈ 0, z = 5 m.
*Find:* Exit velocity.
Step 1: p_surface = p_exit = Patm.
Step 2: ½ρv² = ρ g z.
Step 3: v = √(2 g z) = 9.9 m s⁻¹.
*Why:* Surface par v = 0 lene se equation direct Torricelli form mein aa jata hai.
**Final answer**  
≈ 9.9 m s⁻¹

*Reflection:* Real mein viscosity correction lagta hai lekin ideal case yahi deta hai.

**Example 3 — Pitot-static tube**
*Given:* p₀ − p = 2.5 kPa, ρ_air = 1.225 kg m⁻³.
*Find:* v.
Step 1: ½ ρ v² = Δp.
Step 2: v = √(2 Δp / ρ) = 64.1 m s⁻¹.
*Why:* Stagnation point par v = 0 hota hai.
**Final answer**  
64.1 m s⁻¹

*Reflection:* Yahi principle modern airspeed indicators mein use hota hai.

**Example 4 — Rocket nozzle along streamline**
*Given:* Chamber p₀ = 70 bar, ρ = 10 kg m⁻³, exit p_e = 0.1 bar.
*Find:* v_e (ideal).
Step 1: ½ v_e² = (p₀ − p_e)/ρ.
Step 2: v_e = √[2(7×10⁶ − 10⁴)/10] ≈ 1183 m s⁻¹.
*Why:* High pressure ratio aur low density ki wajah se velocity supersonic tak pahunchti hai.
**Final answer**  
≈ 1183 m s⁻¹

*Reflection:* Real nozzle mein γ aur compressible effects add karne padte hain.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Applying Bernoulli across streamlines | Equation sirf ek streamline ke along valid hai     | Hamesha “along streamline” condition yaad rakho      |
| Forgetting density must be constant | Variable density flow mein extra term chahiye       | Check karo ρ constant hai ya barotropic relation hai |
| Using it for unsteady flow        | Local acceleration term neglect ho jata hai         | Unsteady term zero hai ya nahi, pehle verify karo    |
| Ignoring viscosity near walls     | Boundary layer mein shear force exist karti hai     | Wall se door streamlines choose karo                 |
| Confusing p + ½ρv² with energy    | Energy conservation alag equation hai               | Yaad rakho yeh momentum se aaya hai                  |

## 7. The textbook-precise statement
For an inviscid, steady, barotropic flow with conservative body forces, the Euler equation projected along a streamline reduces to  
v·∇v = −(1/ρ)∇p − ∇Φ.  
Integration along any streamline yields  
∫(dp/ρ) + ½v² + Φ = constant.  
When density is constant this becomes  
p + ½ρv² + ρgz = B,  
where B is constant on each streamline (Anderson, *Fundamentals of Aerodynamics*, 6e, §3.5).

## 8. Visual — diagram or schematic
```
          streamline
   ─────────────────────────────▶
          ds
   ┌──────┐
   │      │ A
   │  dm  │ ρ
   │      │
   └──────┘
p ────▶     ◀──── p+dp
          g sinθ (downward component)
z increasing upward
```
Arrow shows flow direction; pressure acts on both faces; gravity component along streamline is shown.

## 9. The memory technique
1. **The hook** — Imagine a tiny bead sliding on a wire (the streamline); pressure pushes it, gravity pulls it, and its speed changes exactly so that p + ½ρv² + ρgz never changes.
2. **What to overlearn** — The differential form ρv dv + dp + ρg dz = 0 and the constant-density integrated result.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from F = ma on the element, cancel A, divide by ρ, integrate.

## 10. What this unlocks
Yeh derivation aapko compressible flow, potential flow, and turbomachinery ke liye ready karti hai.

- Crocco’s theorem
- Kelvin’s circulation theorem
- Isentropic relations in nozzles
- Actuator disk theory for propellers

## 11. Self-check — five questions, no answers
1. Ek streamline ke along pressure badhe to velocity kya karegi? Quantitative answer do.
2. Agar density vary karti hai to kaunsa extra term aayega?
3. Pitot tube ko 90° streamline se hatakar rakhne par reading galat kyun hoti hai?
4. Unsteady Bernoulli equation ka extra term kya hai?
5. Rocket combustion chamber se nozzle throat tak streamline par gravity term kyun negligible hota hai?