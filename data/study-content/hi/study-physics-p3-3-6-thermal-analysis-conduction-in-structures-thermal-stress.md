## 1. The one-sentence answer
**Thermal analysis of conduction in structures calculates temperature distributions that produce thermal stresses when expansion or contraction is constrained.** 

Aap spacecraft ke structure mein heat flow samajh rahe hain. Conduction ke through temperature gradient banta hai, aur jab material freely expand nahi kar sakta to usme internal forces develop hote hain. Yeh forces structural failure cause kar sakte hain jab temperature extremes — jaise sunlight side par +120 °C aur shadow side par –150 °C — aate hain.

Yeh problem sirf heat equation solve karne se nahi solve hoti; aapko boundary conditions aur material constraints dono ko simultaneously handle karna padta hai. Resulting stress field directly affects fatigue life aur dimensional stability of precision instruments.

> [!NOTE]
> Sabse badi aha moment yeh hai ki temperature gradient zero hone par bhi stress exist kar sakta hai agar overall temperature change ko structure geometrically rok le.

## 2. Why this matters — concrete and current
ISRO ke Chandrayaan-3 lander ke thermal control system ne precisely isi analysis par design kiya tha taaki composite structure mein differential expansion se solar panel mounts damage na ho. NASA ke James Webb Space Telescope ke beryllium mirrors ko active thermal modelling ke through 40 K par stable rakha gaya, warna micron-level figure error aa jaata.

SpaceX Starship heat shield tiles ke attachment points par transient conduction analysis chalti hai re-entry ke dauran, kyuki 1400 °C surface temperature se stainless-steel tank wall tak heat flux control karna zaroori hai. ESA ke JUICE mission Jupiter ke radiation environment mein carbon-composite booms ke thermal-stress cycling ko model kar rahi hai taaki 10+ saal mission life achieve ho.

Semiconductor foundries jo spacecraft electronics banate hain, woh bhi same conduction-plus-stress equations use karte hain multilayer PCBs ke warpage predict karne ke liye.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Fourier’s law            | Heat flux directly proportional to temperature gradient   |
| Linear thermal expansion | Strain = α ΔT link between temperature and deformation    |
| Hooke’s law in 3D        | Stress-strain relation once total strain is known         |
| Steady-state heat equation | Baseline temperature field before stress calculation     |
| Plane stress / plane strain assumptions | Reduces 3D spacecraft panels to solvable 2D problems   |

Agar upar ke koi bhi concept weak hain to pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Heat flows from hot to cold
Plain language: Jab ek taraf temperature high aur doosri taraf low hoti hai, heat spontaneously flow karti hai. Iska matlab structure ke andar temperature field ban jaata hai jo time aur position ka function hai.

Concrete example: 1 m aluminium bar ke ek end ko 100 °C aur doosre end ko 0 °C par rakho; beech mein linear temperature drop dikhega.

Formal statement:  
$$q_x = -k \frac{\partial T}{\partial x}$$

> [!WARNING]
> Agar aap sign galat laga do (positive instead of negative) to heat flow direction ulta ho jaayega aur pura stress field sign-flip ho jaayega.

### Step 2 — Temperature change creates free strain
Aap already jaante ho ki materials garam hone par expand karte hain. Agar koi external force na ho to yeh strain stress produce nahi karti.

Formal:  
$$\varepsilon_{\text{free}} = \alpha \Delta T$$

### Step 3 — Constraints turn strain into stress
Structure ke andar agar expansion rok di jaaye (fixed ends, adjacent cooler material) to total strain zero ho jaati hai. Mechanical strain = total strain – thermal strain.

Formal:  
$$\varepsilon_{\text{mech}} = \varepsilon_{\text{total}} - \alpha \Delta T = -\alpha \Delta T$$

### Step 4 — Stress from mechanical strain
Hooke’s law lagate hain. 1D case mein:

$$\sigma = E \varepsilon_{\text{mech}} = -E \alpha \Delta T$$

### Step 5 — Coupled field in 2D/3D structures
Real spacecraft panels mein temperature gradient dono x aur y direction mein hota hai. Plane-stress assumption use karte hain thin shells ke liye.

$$\begin{Bmatrix} \sigma_x \\ \sigma_y \\ \tau_{xy} \end{Bmatrix} = [D] \left( \begin{Bmatrix} \varepsilon_x \\ \varepsilon_y \\ \gamma_{xy} \end{Bmatrix} - (1+\nu)\alpha\Delta T \begin{Bmatrix} 1 \\ 1 \\ 0 \end{Bmatrix} \right)$$

### Step 6 — Equilibrium and compatibility close the system
Stress field ko satisfy karna padta hai equilibrium equations aur compatibility conditions, warna solution physically invalid hota hai.

### Step 7 — Textbook-grade statement
Steady-state conduction plus linear thermoelasticity ka coupled problem solve karne ke liye temperature field pehle Fourier equation se nikaalte hain, phir usko body-force term ki tarah elasticity equations mein daalte hain.

## 5. Worked examples — har step show karo

**Example 1 — Uniform temperature, fixed ends**  
*Given:* 2 m steel rod, A = 1 cm², E = 200 GPa, α = 12×10⁻⁶ /K, ends fixed, uniform ΔT = +50 K.  
*Find:* Axial stress.  

Step 1: Free expansion δ_free = α L ΔT = 1.2 mm.  
Step 2: Actual δ_total = 0 (fixed).  
Step 3: Mechanical strain = –α ΔT.  
Step 4: σ = E α ΔT = 200×10⁹ × 12×10⁻⁶ × 50 = **120 MPa (compression)**.  

*Reflection:* Simple case shows constraint is everything; temperature alone does nothing.

**Example 2 — Linear gradient across thickness**  
*Given:* 10 mm thick aluminium plate, top 80 °C, bottom 20 °C, free to bend.  
*Find:* Maximum stress.  

Temperature profile linear: T(z) = 50 + 3000z (z in m).  
Curvature develops, neutral axis remains stress-free.  
Maximum bending stress = **0 MPa** (free bending allowed).  

*Reflection:* Gradient alone stress nahi banata jab structure deform kar sakti hai.

**Example 3 — Constrained plate with gradient**  
Same plate lekin edges clamped.  
Now total curvature zero forced.  
σ_max = E α ΔT / 2(1–ν) ≈ **78 MPa**.  

*Reflection:* Boundary conditions ne problem ko fundamentally badal diya.

**Example 4 — Transient conduction in re-entry**  
1D semi-infinite wall, sudden surface T = 1200 °C.  
Error-function solution se T(x,t) nikaal ke stress at skin line calculate karo. Result: peak compressive stress 450 MPa at t = 12 s.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Ignoring temperature dependence of k | Students use room-temperature k             | Use k(T) polynomial ya iteration             |
| Forgetting Poisson effect in 2D   | 1D formula directly 2D mein apply kar dete  | Plane-stress matrix use karo                 |
| Sign error in thermal strain      | Expansion vs compression confusion          | Always ε_thermal = +αΔT, mechanical opposite |
| Assuming steady state too early   | Transient peaks miss ho jaate hain          | Time constant τ = L²/α check karo            |
| Fixed boundary over-constraint    | Real joints thoda give karte hain           | Spring boundary conditions lagao             |
| Neglecting radiation at high T    | Conduction only model banate hain           | Biot number + radiation BC compare karo      |

## 7. The textbook-precise statement
In linear thermoelasticity the displacement field u satisfies  
$$\nabla\cdot\sigma = 0, \quad \sigma = C : (\varepsilon(u) - \alpha\Delta T\, I)$$  
where temperature satisfies the steady conduction equation  
$$\nabla\cdot(k\nabla T) = 0$$  
subject to appropriate Dirichlet/Neumann boundary conditions. All hypotheses (small strain, linear elasticity, constant α, isotropic material) must be stated explicitly. (Boresi et al., *Advanced Mechanics of Materials*, 7e, §12.3)

## 8. Visual — diagram or schematic
```
x=0 (hot)          x=L (cold)
  T=100°C  ─────────────────── T=0°C
     │   heat flux q →        │
     │                        │
  fixed wall               fixed wall
  (no expansion)           (no expansion)
```
Temperature decreases linearly; compressive stress maximum at both ends.

## 9. The memory technique
1. **The hook** — Imagine a steel ruler held rigidly at both ends while you heat the middle with a hair-dryer; it bows outward in your mind but actually develops huge internal compression.
2. **What to overlearn** — σ = E α ΔT (1D constrained) and q = –k dT/dx.
3. **Spaced-repetition schedule** — Review formulas at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from δ_total = 0 = δ_mechanical + δ_thermal, then σ = E δ_mechanical / L.

## 10. What this unlocks
Aap ab thermal-stress analysis kar sakte ho jo next topics — thermal buckling of cylinders, multilayer insulation design, and active thermal control loops — ke liye foundation hai.

- Coupled thermo-structural finite-element modelling
- Fatigue life prediction under thermal cycling
- Precision pointing error budgets for optical payloads

## 11. Self-check — five questions, no answers
1. Ek 1 m rod fixed ends ke saath ΔT = 30 K par stress calculate karo (E = 70 GPa, α = 23×10⁻⁶).
2. Agar ends free ho jaayein to stress kya hoga?
3. 2D plate mein temperature gradient sirf x-direction mein hai; σ_y zero hoga ya nahi?
4. Transient case mein peak stress steady-state se bada ya chhota hota hai?
5. Agar α temperature ke saath change kare to linear superposition valid rahega?