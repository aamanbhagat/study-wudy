## 1. The one-sentence answer
**Pressure-fed cycle** ek rocket propulsion system hai jismein high-pressure inert gas (jaise helium) propellant tanks ko pressurise karke liquid propellants ko directly combustion chamber mein push karta hai, bina kisi pump ke.

Iska matlab yeh hai ki dono fuel aur oxidiser tanks ko itna strong banana padta hai ki woh 20–50 bar tak pressure ko safely hold kar sakein. Gas pressure tank ke ullu propellant ko injector orifices ke through force karti hai, jahaan woh mix hokar burn hoti hai. Kyunki koi rotating machinery nahi hoti, cycle bahut simple aur reliable hoti hai, lekin tank mass fraction high ho jaata hai.

> [!NOTE]
> Sabse badi “aha” yeh hai ki pressure-fed cycle mein pump ki zaroorat nahi padti, isliye upper stages mein jahaan thrust requirement kam aur reliability zaroori hoti hai, yeh cycle aaj bhi preferred choice hai.

## 2. Why this matters — concrete and current
SpaceX ke Falcon 9 upper stage (Merlin vacuum) originally pressure-fed ideas se inspire tha, lekin final design pump-based tha; pressure-fed cycle ka direct example Northrop Grumman ke Antares upper stage ke AJ-10 engine mein dekha ja sakta hai jo hypergolic propellants ko helium se push karta hai.

NASA ke Lunar Module Descent Propulsion System (DPS) ne pressure-fed cycle use kiya tha Apollo missions mein, jahaan 100 % reliability chahiye thi aur restart capability zaroori thi.

Small satellite launchers jaise Firefly Alpha ke upper stage aur Rocket Lab ke Electron ke Curie engine variants pressure-fed architecture par based hain kyunki yeh light payload mass ke liye tank pressure ko 30 bar tak rakhna affordable hai.

Recent research papers (AIAA 2022-1234) dikhaate hain ki pressure-fed methane-oxygen systems future lunar landers ke liye candidate hain kyunki inmein turbo-pump cavitation ka khatra zero hota hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Ideal gas law        | Pressurising gas (helium) ke pressure-volume relation samajhne ke liye |
| Bernoulli’s equation | Injector mein fluid acceleration aur pressure drop calculate karne ke liye |
| Isentropic nozzle flow | Thrust aur specific impulse derive karne ke liye          |
| Mass flow continuity | Tank se chamber tak propellant flow rate match karne ke liye |

Agar upar ke koi bhi concept weak hain to pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Pressurising gas as the driving force
Pressure-fed cycle ka sabse simple idea yeh hai ki ek external high-pressure gas tank propellant tanks ke ullu gas daal kar unhe pressurise karta hai.  
Example: 200 bar helium bottle ko regulator se 25 bar tak reduce karke fuel tank mein daala jaata hai.  
Formal statement:  
$$P_{\text{tank}} = P_{\text{reg}} > P_c + \Delta P_{\text{inj}} + \Delta P_{\text{line}}$$  
> [!WARNING]  
> Agar regulator pressure galat set ho gaya to chamber pressure unstable ho jaayegi aur thrust oscillate karega.

### Step 2 — Propellant outflow through injector
Pressurised propellant injector orifices se guzarta hai jahaan pressure drop velocity mein convert hota hai.  
Example: 25 bar tank pressure, 15 bar chamber pressure → 10 bar drop across injector.  
Formal statement (simplified Bernoulli):  
$$\dot{m} = A_{\text{inj}} \sqrt{2\rho(P_{\text{tank}} - P_c)}$$  
> [!WARNING]  
> Injector area galat hone se mixture ratio drift ho jaata hai aur combustion instability aa sakti hai.

### Step 3 — Combustion chamber pressure balance
Chamber pressure sirf tank pressure aur injector resistance se decide hoti hai; koi pump head nahi hota.  
Formal statement: steady-state mein  
$$P_c = P_{\text{tank}} - \Delta P_{\text{inj}} - \Delta P_{\text{line}}$$  

### Step 4 — Nozzle expansion and thrust
Chamber gases nozzle mein expand hokar thrust produce karte hain. Thrust equation:  
$$F = \dot{m}v_e + (P_e - P_a)A_e$$  
Pressure-fed systems mein \(P_c\) relatively low (10–20 bar) hota hai isliye nozzle area ratio bhi modest rakha jaata hai.

### Step 5 — Tank mass penalty as fundamental limit
High pressure ke liye tank walls thick honi padti hain, isliye propellant mass fraction kam ho jaata hai. Yeh wajah hai ki pressure-fed cycle sirf upper stages mein use hoti hai jahaan total \(\Delta v\) requirement kam hoti hai.

### Step 6 — System-level reliability advantage
Koi turbo-pump bearings, seals ya cavitation nahi → failure modes kam. Isliye Apollo aur modern smallsat upper stages isko choose karte hain.

## 5. Worked examples — har step show karo

**Example 1 — Basic chamber pressure calculation**  
*Given:* Helium regulated at 22 bar, injector \(\Delta P = 7\) bar, line losses 1 bar.  
*Find:* Steady chamber pressure \(P_c\).  
Step: \(P_c = 22 - 7 - 1 = 14\) bar.  
*Why:* Sirf pressure balance equation apply kiya.  
**14 bar**

*Reflection:* Yeh example simple hai lekin yahi equation baad ke complex cases ki foundation hai.

**Example 2 — Mass flow rate through injector**  
*Given:* Fuel density \(\rho = 1020\) kg/m³, total injector area \(A = 2.5 \times 10^{-4}\) m², \(\Delta P = 8\) bar = 800 kPa.  
*Find:* \(\dot{m}\).  
Step 1: \(\dot{m} = A\sqrt{2\rho\Delta P}\).  
Step 2: \(\sqrt{2\times1020\times800000} = 1275\) m/s (effective velocity).  
Step 3: \(\dot{m} = 2.5\times10^{-4}\times1275 = 0.319\) kg/s.  
*Why:* Bernoulli se derived orifice equation use kiya.  
**0.319 kg/s**

*Reflection:* Density aur \(\Delta P\) dono sahi units mein hona zaroori hai.

**Example 3 — Thrust at altitude**  
*Given:* \(\dot{m} = 5\) kg/s, \(v_e = 2800\) m/s, \(P_e = 0.8\) bar, \(A_e = 0.12\) m², ambient \(P_a = 0.01\) bar.  
*Find:* Thrust \(F\).  
Step: \(F = 5\times2800 + (0.8-0.01)\times10^5\times0.12 = 14000 + 9480 = 23480\) N.  
*Why:* Momentum thrust + pressure thrust dono add kiye.  
**23480 N**

*Reflection:* Upper stage mein \(P_a\) near zero hoti hai isliye pressure term important hai.

**Example 4 — Tank wall thickness estimate**  
*Given:* Tank radius 0.6 m, material yield 400 MPa, safety factor 2, pressure 25 bar.  
*Find:* Minimum thickness \(t\).  
Step: Hoop stress \(\sigma = Pr/t\), \(t = Pr/(\sigma/2)\).  
\(t = (25\times10^5\times0.6)/(200\times10^6) = 0.0075\) m = 7.5 mm.  
*Why:* Thin-wall pressure vessel formula apply kiya.  
**7.5 mm**

*Reflection:* Yeh thickness hi mass penalty ka source hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Ignoring regulator droop    | Students assume constant supply pressure    | Always use regulator performance curve       |
| Wrong mixture ratio         | Separate fuel/oxidiser \(\Delta P\) match nahi karte | Both legs ke injector areas simultaneously size karo |
| Under-estimating tank mass  | Only volume dekhte hain, pressure nahi      | Wall thickness formula se mass calculate karo |
| Forgetting helium mass      | High pressure gas bhi mass add karta hai    | Ideal gas law se helium mass bhi add karo    |
| Injector cavitation         | Local pressure vapour pressure se neeche    | Minimum \(\Delta P\) margin rakho (usually 20 %) |

## 7. The textbook-precise statement
In a pressure-fed rocket propulsion system the chamber pressure is determined solely by the regulated pressurant gas pressure and the hydraulic resistance of the propellant feed lines and injectors. No turbopump is present. The governing steady-state relation is  
\[P_c = P_{\text{pressurant,reg}} - \sum\Delta P_{\text{feed}} - \Delta P_{\text{inj}},\]  
where all pressures are time-averaged and the pressurant is treated as an ideal gas undergoing isothermal blow-down unless active regulation is specified. (Sutton & Biblarz, *Rocket Propulsion Elements*, 9e, §6.3).

## 8. Visual — diagram or schematic
```text
Helium bottle (200 bar)
        │ regulator
        ▼ 25 bar
   ┌────┴────┐
   │         │
Fuel tank   Ox tank
(25 bar)    (25 bar)
   │         │
 injector   injector
   └────┬────┘
        ▼
   Combustion chamber (14 bar)
        │
      nozzle
        ▼ exhaust
```

## 9. The memory technique
1. **The hook** — Imagine a bicycle pump (helium) jo do balloons (propellant tanks) ko zor se daba raha hai taaki paani (propellant) ek chhote hole se bahar nikle.
2. **What to overlearn** — \(P_c = P_{\text{reg}} - \Delta P_{\text{inj}}\) aur \(\dot{m} = A\sqrt{2\rho\Delta P}\).
3. **Spaced-repetition schedule** — 1 din baad, 3 din baad, 7 din baad, 16 din baad, 35 din baad.
4. **First-principles fallback** — Agar formula bhool jaaye to Bernoulli equation se shuru karo aur injector pressure drop ko velocity head mein convert karo.

## 10. What this unlocks
Pressure-fed cycle samajhne ke baad aap gas-generator cycle, staged-combustion cycle aur electric pump-fed architectures ko compare kar paoge. Yeh foundation hai upper-stage restart engines, reaction control systems aur future in-space refuelling concepts ke liye.

- Staged combustion cycle analysis
- Cryogenic tank pressurisation modelling
- Blow-down versus regulated pressurant trade studies

## 11. Self-check — five questions, no answers
1. Ek pressure-fed system mein chamber pressure 18 bar hai aur injector pressure drop 6 bar. Regulator pressure kya honi chahiye agar line losses 2 bar hain?
2. Kyun pressure-fed cycle upper stages mein hi common hai lekin booster stages mein rare?
3. Agar helium temperature badhe to tank pressure par kya asar padega (qualitative)?
4. Injector area 10 % badha di jaaye to thrust aur mixture ratio dono ka kya hoga?
5. Ek student ne tank mass calculate karte hue material yield strength ki jagah ultimate strength use kar di. Result high hoga ya low, aur kyun?