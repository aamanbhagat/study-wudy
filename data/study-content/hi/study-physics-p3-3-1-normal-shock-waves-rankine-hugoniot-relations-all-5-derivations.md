## 1. The one-sentence answer
**Normal shock waves ke liye Rankine-Hugoniot relations woh paanch conserved quantities hain jo ek discontinuity ke dono taraf mass, momentum aur energy balance se directly nikalti hain.**

Normal shock ek infinitely thin surface hoti hai jisme flow properties (pressure, density, velocity) abruptly change karti hain. Yeh relations aapko shock ke pehle aur baad ke states ko link karti hain bina kisi loss term ke. Derivation sirf three conservation laws se shuru hoti hai aur phir Mach number ke through closed-form expressions tak pahunchti hai.

Rankine-Hugoniot relations compressible flow mein shock strength predict karti hain. Jab aap inhe samajh jaate ho to supersonic inlets, re-entry vehicles aur jet engine diffusers ka design possible hota hai.

> [!NOTE]
> Sabse badi aha moment yeh hai ki normal shock mein entropy hamesha badhti hai, isliye shock ke baad flow subsonic ho jaata hai — yeh sirf conservation laws se nikalti hai, koi extra assumption nahi lagti.

## 2. Why this matters — concrete and current
SpaceX Starship re-entry ke dauran bow shock ke pressure jump ko exactly inhi relations se model kiya jaata hai taaki heat-shield thickness decide ho sake. NASA’s Mars 2020 entry capsule ke aerothermal loads bhi Rankine-Hugoniot pressure ratio se validate kiye gaye the.

Pratt & Whitney aur GE ke afterburning turbofans mein normal shocks inlet diffusers mein occur karti hain; engine surge margin inhi density-ratio predictions par depend karta hai.

Hypersonic cruise vehicles jaise DARPA’s HAWC missile ke scramjet isolator design mein shock-train length aur pressure recovery dono Rankine-Hugoniot relations se calculate hote hain.

Natural phenomena mein supernova remnants ke blast waves bhi yahi jump conditions follow karte hain; astrophysics codes jaise FLASH yahi relations embed karte hain.

Semiconductor plasma etching reactors mein shock waves wafer surface par non-uniformity create karti hain — process engineers in relations ko use karke chamber pressure set karte hain.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Control-volume analysis  | Shock ko ek thin discontinuity maankar conservation laws likhne ke liye |
| Steady 1-D flow          | Mass, momentum, energy fluxes ko simple algebraic form mein likhne ke liye |
| Perfect-gas equation     | p = ρRT aur h = cpT ko close karne ke liye                |
| Mach number definition   | M = u/a ko pressure aur density ratios mein substitute karne ke liye |

Agar steady 1-D control volume ya perfect-gas relations weak hain to pehle woh revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Control volume around the shock
Ek infinitely thin normal shock ke dono taraf ek fixed control volume socho. Flow left se right ki taraf ja raha hai. Mass, momentum aur energy ka net flux zero hona chahiye kyunki steady state hai.

Concrete example: M1 = 2 wala air flow ek shock cross karta hai; aapko sirf inlet aur outlet properties chahiye, andar kya ho raha hai uski zaroorat nahi.

Formal statement:
$$
\frac{d}{dx}(\rho u) = 0, \quad \frac{d}{dx}(p + \rho u^2) = 0, \quad \frac{d}{dx}\Bigl(\rho u\Bigl(h + \frac{u^2}{2}\Bigr)\Bigr) = 0
$$

> [!WARNING]
> Agar aap control volume ko shock ke bilkul parallel nahi rakhte to shear aur heat-transfer terms aa jaayenge aur saari simplicity khatam ho jaayegi.

### Step 2 — Integrate across the discontinuity
Integrate karo ek infinitesimal length ke across. Fluxes balance ho jaate hain:
$$
\rho_1 u_1 = \rho_2 u_2
$$
$$
p_1 + \rho_1 u_1^2 = p_2 + \rho_2 u_2^2
$$
$$
h_1 + \frac{u_1^2}{2} = h_2 + \frac{u_2^2}{2}
$$

Yeh teen equations hi Rankine-Hugoniot ka core hain.

### Step 3 — Introduce perfect-gas closure
h = cp T aur a² = γRT use karke energy equation ko temperature aur velocity mein likho. Isse ek naya relation nikalti hai:
$$
\frac{p_2}{p_1} = 1 + \frac{2\gamma}{\gamma+1}(M_1^2-1)
$$

### Step 4 — Density ratio derive karo
Mass aur momentum ko combine karke density ratio nikaalo:
$$
\frac{\rho_2}{\rho_1} = \frac{(\gamma+1)M_1^2}{(\gamma-1)M_1^2 + 2}
$$

### Step 5 — Velocity and temperature ratios
Velocity ratio seedha mass conservation se:
$$
\frac{u_2}{u_1} = \frac{\rho_1}{\rho_2}
$$
Temperature ratio dono pressure aur density ratios se:
$$
\frac{T_2}{T_1} = \frac{p_2}{p_1}\frac{\rho_1}{\rho_2}
$$

### Step 6 — Entropy jump (fifth relation)
Second law se entropy change:
$$
\frac{s_2-s_1}{R} = \ln\Bigl[\Bigl(\frac{p_2}{p_1}\Bigr)^{1/(\gamma-1)}\Bigl(\frac{\rho_1}{\rho_2}\Bigr)^{\gamma/(\gamma-1)}\Bigr]
$$
Shock ke baad s2 > s1 hona zaroori hai.

### Step 7 — Textbook-grade statement
Upar ke paanch closed-form expressions (pressure ratio, density ratio, velocity ratio, temperature ratio, entropy change) hi normal shock ke liye Rankine-Hugoniot relations kehte hain.

## 5. Worked examples — har step show karo

**Example 1 — Basic pressure jump**
*Given:* γ = 1.4, M1 = 2.0, p1 = 101 kPa  
*Find:* p2  

Step 1: pressure-ratio formula apply karo  
$$
\frac{p_2}{p_1} = 1 + \frac{2\times1.4}{2.4}(4-1) = 4.5
$$  
*Why:* Formula Step 3 se directly aayi hai.  
**p2 = 454.5 kPa**

*Reflection:* Simple number daal ke formula verify karna easy hota hai; yeh base case hai.

**Example 2 — Density and velocity together**
*Given:* M1 = 3, γ = 1.4  
*Find:* ρ2/ρ1 aur u2/u1  

Density ratio:
$$
\frac{\rho_2}{\rho_1} = \frac{2.4\times9}{0.4\times9+2} = 3.368
$$  
*Why:* Step 4 ka formula.  
Velocity ratio = 1/3.368 = 0.297  
**ρ2/ρ1 = 3.368, u2/u1 = 0.297**

*Reflection:* Density badhne se velocity girti hai — mass conservation ka direct consequence.

**Example 3 — Temperature after shock**
*Given:* M1 = 2.5, T1 = 288 K  
*Find:* T2  

Pehle p2/p1 = 7.125, ρ2/ρ1 = 3.0 (approx).  
$$
\frac{T_2}{T_1} = 7.125\times\frac{1}{3} = 2.375 \implies T_2 = 684 K
$$  
*Why:* Temperature dono pressure aur density se nikalti hai.  
**T2 = 684 K**

*Reflection:* High Mach par temperature jump bahut badi hoti hai — re-entry heating ka reason.

**Example 4 — Entropy increase check**
*Given:* M1 = 2  
*Find:* (s2−s1)/R  

$$
\frac{s_2-s_1}{R} = \ln(4.5^{2.5}\times0.3^{3.5}) \approx 0.523
$$  
*Why:* Positive value confirm karti hai ki shock irreversible hai.  
**(s2−s1)/R = 0.523**

*Reflection:* Entropy badhna hi prove karta hai ki supersonic flow shock ke baad subsonic ho jaata hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| γ = 1.4 hamesha daal dena         | Air ke liye default soch lena               | Problem statement mein gas clearly check karo |
| M2 > 1 rakhna                     | Post-shock supersonic flow maanna           | M2 formula se verify karo (M2 < 1 hona chahiye) |
| Energy equation mein h ki jagah cpT likhna bhool jaana | Stagnation enthalpy yaad nahi rehti       | h + u²/2 ko hamesha likho                    |
| Density ratio ko  (γ+1)/(γ−1) se zyada kar dena | Limit bhool jaana                         | M1 → ∞ par limit (γ+1)/(γ−1) yaad rakho      |
| Entropy negative aa jaana         | Sign error in log argument                  | p2/p1 aur ρ2/ρ1 dono >1 hone chahiye         |
| Control volume mein body forces add karna | Extra terms soch lena                     | Normal shock ke liye sirf pressure aur momentum flux |

## 7. The textbook-precise statement
John D. Anderson, *Modern Compressible Flow*, 4e, §4.3 states:  
For a stationary normal shock in a perfect gas with constant γ, the Rankine-Hugoniot relations are
$$
\frac{p_2}{p_1}=1+\frac{2\gamma}{\gamma+1}(M_1^2-1),\qquad
\frac{\rho_2}{\rho_1}=\frac{(\gamma+1)M_1^2}{(\gamma-1)M_1^2+2},
$$
together with the corresponding expressions for velocity, temperature and entropy jump, provided the upstream Mach number M1 > 1 and the flow is steady, inviscid and adiabatic.

## 8. Visual — diagram or schematic
```
          u1, p1, ρ1, T1, M1>1          |          u2, p2, ρ2, T2, M2<1
   ─────────────────────────────────────┼─────────────────────────────────────► x
                Supersonic inflow       Shock       Subsonic outflow
```
Shock surface x = 0 par hai. Left side supersonic properties, right side subsonic. Arrow direction flow ki taraf.

## 9. The memory technique
**The hook** — Socho ek “traffic jam” wave jo supersonic cars ko suddenly slow kar deti hai; density badhti hai, speed girti hai, pressure jump hota hai.

**What to overlearn** — Pressure ratio aur density ratio dono formulas cold yaad hone chahiye; M2 < 1 hamesha prove karna.

**Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.

**First-principles fallback** — Agar formula bhool jaao to teen conservation equations likho aur M1 ke through solve karo.

## 10. What this unlocks
Yeh relations compressible aerodynamics ke har aage ke topic ki foundation hain.

- Oblique shocks aur Prandtl-Meyer expansion fans
- Shock-expansion theory for supersonic airfoils
- Rayleigh line aur Fanno line flow with friction/heat addition
- Hypersonic similarity rules
- Computational shock-capturing schemes (Godunov-type methods)

## 11. Self-check — five questions, no answers
1. M1 = 1.8, γ = 1.4 ke liye p2/p1 calculate karo.
2. Density ratio ka maximum possible value kya hai jab M1 → ∞?
3. Prove karo ki M2 hamesha 1 se kam rehta hai normal shock ke baad.
4. Agar γ = 1.3 ho to entropy jump kis tarah badalta hai?
5. Ek control volume mein agar heat addition daal do to Rankine-Hugoniot relations kaunsi term se violate hoti hain?