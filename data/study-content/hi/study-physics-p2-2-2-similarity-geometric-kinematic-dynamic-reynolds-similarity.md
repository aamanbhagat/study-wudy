## 1. The one-sentence answer
**Similarity lets you test a small, cheap model and confidently predict how a full-scale prototype will behave in fluid flow by matching key dimensionless numbers.**

Geometric similarity means every length in the model is a constant scale factor times the corresponding length in the prototype. Kinematic similarity adds that velocity vectors at corresponding points are also scaled by a constant factor. Dynamic similarity further requires that all forces (inertia, viscous, gravity, etc.) remain in the same ratio, which is achieved when dimensionless groups such as the Reynolds number are identical. Reynolds similarity is the special case used for viscous-dominated incompressible flows: matching Re guarantees dynamic similarity between model and prototype.

> [!NOTE]
> The single “aha” is that once Re matches, the entire non-dimensional flow field becomes identical; pressure coefficients, drag coefficients and streamline patterns collapse onto the same curves regardless of actual size or speed.

## 2. Why this matters — concrete and current
SpaceX uses 1:10 water-tunnel models of Starship to match Reynolds number before each flight test; the measured base-drag coefficient is then applied directly to the full-scale vehicle.  
ISRO’s Vikram lander nozzle was validated in a 1:5 cold-flow rig where Re was kept above 10^6 so that separation behaviour observed on the model would appear on the flight hardware.  
Boeing’s 787 wing was finalised after 1:30-scale cryogenic tests in NASA’s National Transonic Facility; matching Re at Mach 0.85 removed the need for an extra wind-tunnel entry.  
Biomedical engineers scale coronary-artery stents from 3 mm patient geometry to 30 mm glass models and match Re so that wall-shear-stress maps remain valid for thrombosis prediction.  
Naval architects test 1:50 hull models in towing tanks at Froude–Reynolds combined conditions; the resulting wave-drag data feed directly into the resistance estimate for the 300 m container ship.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Dimensionless groups     | They collapse the governing equations into a form that depends only on ratios, not absolute sizes |
| Navier–Stokes equations  | The starting point whose non-dimensional form reveals Re, Fr, etc. |
| Length, velocity and force scales | Needed to define the ratios that must be preserved      |
| Incompressible flow assumption | Keeps density constant so Re alone can enforce dynamic similarity |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Geometric similarity
All linear dimensions of the model are multiplied by the same constant scale factor \(\lambda_L\).  
A 2 m chord aerofoil tested as a 0.2 m model gives \(\lambda_L = 0.1\).  
Formally, every point \(\mathbf{x}_p\) on the prototype maps to \(\mathbf{x}_m = \lambda_L \mathbf{x}_p\).

> [!WARNING]
> If angles or curvature ratios differ even slightly, the flow topology itself changes and later similarity conditions become meaningless.

### Step 2 — Kinematic similarity
Velocity vectors at corresponding points satisfy \(\mathbf{V}_m = \lambda_V \mathbf{V}_p\).  
Streamlines therefore look identical when plotted in non-dimensional coordinates.  
The formal statement is \(\frac{\mathbf{V}_m(\mathbf{x}_m)}{V_\infty,m} = \frac{\mathbf{V}_p(\mathbf{x}_p)}{V_\infty,p}\).

### Step 3 — Dynamic similarity
All forces acting on corresponding fluid particles must remain in the same ratio.  
Inertia, pressure, viscous and body forces must each scale by the same constant.  
This requirement forces certain dimensionless numbers to be identical between model and prototype.

### Step 4 — Non-dimensional Navier–Stokes
Start from the incompressible NS equation  
\[
\rho\left(\frac{\partial\mathbf{V}}{\partial t}+\mathbf{V}\cdot\nabla\mathbf{V}\right)=-\nabla p+\mu\nabla^2\mathbf{V}+\rho\mathbf{g}.
\]
Divide every term by a reference inertia force \(\rho V_\infty^2/L\); the viscous term becomes \(\frac{1}{\text{Re}}\nabla^2\mathbf{V}^*\) where \(\text{Re}=\rho V_\infty L/\mu\).

### Step 5 — Reynolds similarity condition
Dynamic similarity for incompressible, isothermal flow without free surfaces is obtained simply by setting  
\[
\text{Re}_m=\text{Re}_p\qquad\Rightarrow\qquad\frac{\rho_m V_m L_m}{\mu_m}=\frac{\rho_p V_p L_p}{\mu_p}.
\]
All non-dimensional flow quantities (pressure coefficient, skin-friction distribution, separation points) then become identical.

### Step 6 — Complete similarity statement
When geometric similarity, kinematic similarity and Reynolds-number equality hold simultaneously, the non-dimensional solution of the Navier–Stokes equations is unique; therefore every force coefficient measured on the model applies directly to the prototype.

## 5. Worked examples — har step show karo

**Example 1 — Simple pipe-flow scale**  
*Given:* Prototype pipe \(D_p=0.2\) m, water at 20 °C, \(V_p=2\) m/s. Model uses air at same temperature, \(D_m=0.05\) m.  
*Find:* Required model speed for Re equality.  
Step 1: Write \(\text{Re}_p=\text{Re}_m\).  
Step 2: Insert values \(\frac{1000\times2\times0.2}{0.001}=\frac{1.2\times V_m\times0.05}{1.8\times10^{-5}}\).  
Step 3: Solve \(V_m=133.3\) m/s.  
**133.3 m/s**  
*Reflection:* The high speed shows why air models of water flows often become impractical; the density–viscosity ratio forces extreme velocities.

**Example 2 — Ship model in towing tank**  
*Given:* 1:25 scale hull, \(\lambda_L=0.04\). Water at 15 °C for both.  
*Find:* Model speed that matches prototype Re at 8 m/s.  
Algebra yields \(V_m=200\) m/s — clearly impossible.  
**Reflection:* Real ship tests therefore match Froude number instead and accept a Reynolds-number mismatch that is later corrected by empirical methods.

**Example 3 — Blood-flow stent validation**  
*Given:* Artery \(D=3\) mm, blood \(\mu=0.004\) Pa·s, \(\rho=1050\) kg/m³, peak velocity 0.5 m/s. Model uses glycerine–water mixture \(\mu=0.3\) Pa·s, \(\rho=1200\) kg/m³, \(D_m=30\) mm.  
Solve for model velocity: \(V_m=0.0056\) m/s.  
**0.0056 m/s**  
*Reflection:* The extremely low speed keeps Re matched while allowing optical measurement of wall shear.

**Example 4 — Cryogenic wind-tunnel test**  
*Given:* 1:30 model of 787 wing tested in nitrogen at 100 K where \(\mu\) drops sharply.  
Calculate required pressure to keep Re equal to flight condition at 250 m/s; result is 3.2 atm.  
**3.2 atm**  
*Reflection:* Cryogenic pressurised tunnels exploit the strong temperature dependence of viscosity to reach flight Re on small models.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                                      |
|-------------------------------------|---------------------------------------------|------------------------------------------------------|
| Matching only geometric scale factor| Students forget velocity or fluid properties must also change | Always write the full Re equality before calculating speed |
| Using room-temperature air for water model | Density ratio ignored                       | Check \(\rho/\mu\) ratio first; switch fluid if needed |
| Ignoring wall roughness scaling     | Roughness height does not scale with \(\lambda_L\) | Use smooth models or apply roughness correction formulas |
| Assuming Re equality guarantees everything | Free-surface or compressibility effects present | Verify that Fr or Ma are either matched or negligible |
| Sign error in scale-factor algebra  | Confusing prototype-to-model versus model-to-prototype | Keep subscripts consistent and solve symbolically first |

## 7. The textbook-precise statement
For two incompressible flows to be dynamically similar, the following must hold simultaneously: (i) geometric similarity, i.e., there exists a constant \(\lambda_L\) such that every linear dimension of the model is \(\lambda_L\) times the corresponding dimension of the prototype; (ii) the Reynolds numbers based on any convenient reference length and velocity are identical, \(\text{Re}_m=\text{Re}_p\); (iii) the non-dimensional boundary conditions (including relative roughness) are identical. Under these conditions the non-dimensional velocity field \(\mathbf{V}^*(\mathbf{x}^*)\) is unique and all force coefficients are therefore the same. (Munson, Young & Okiishi, *Fundamentals of Fluid Mechanics*, 7e, §7.3).

## 8. Visual — diagram or schematic
```
Prototype          Model (λ_L = 0.1)
   L_p = 2 m          L_m = 0.2 m
   V_p = 10 m/s       V_m = ? (set by Re)
   ρ_p, μ_p           ρ_m, μ_m
Flow direction →   Flow direction →
```
All lengths are multiplied by 0.1; velocity is adjusted so that \(\rho V L/\mu\) remains constant.

## 9. The memory technique
1. **The hook** — Picture two identical toy boats, one in a bathtub and one in an ocean; only when the “swirliness” (Re) looks the same do the wakes match.  
2. **What to overlearn** — \(\text{Re}=\rho V L/\mu\) must be identical; geometric scale factor alone is never enough.  
3. **Spaced-repetition schedule** — Review the definition after 1 day, 3 days, 7 days, 16 days and 35 days.  
4. **First-principles fallback** — Non-dimensionalise the NS equation; the coefficient in front of the viscous term is exactly 1/Re.

## 10. What this unlocks
- Mach-number similarity for compressible flows  
- Froude-number similarity for free-surface flows  
- Scaling of heat-transfer coefficients via Reynolds analogy  
- Wind-tunnel wall corrections and blockage factors  
- Next topic: Buckingham Pi theorem and complete sets of dimensionless groups

## 11. Self-check — five questions, no answers
1. A 1:10 water model of an oil pipeline must run at what speed if prototype oil velocity is 1.5 m/s?  
2. Why does matching only geometric similarity fail to predict drag on a 1:50 aircraft model tested in air?  
3. Derive the required kinematic viscosity ratio when length scale is 0.05 and velocity scale must stay below 20 m/s.  
4. In the cryogenic tunnel example, if temperature is lowered further, does required pressure rise or fall? Explain.  
5. Identify the hidden assumption that breaks Reynolds similarity when surface waves appear on a ship model.