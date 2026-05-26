## 1. The one-sentence answer
**Electric pump-fed cycle** ek modern rocket propulsion architecture hai jismein propellants ko electrically driven pumps se high pressure par combustion chamber mein inject kiya jaata hai, bina traditional turbine-driven turbopumps ke.

Yeh cycle batteries, fuel cells ya auxiliary power sources se electricity leke pumps ko drive karta hai. Iska matlab yeh hai ki propellant flow rate aur pressure ko independent electrical control se manage kiya ja sakta hai, jo gas-generator ya staged-combustion cycles mein hota nahi. Result mein system simpler ho jaata hai, lekin electrical power source ki mass aur efficiency critical ho jaati hai.

Aapko yeh samajhna zaroori hai ki traditional cycles mein hot gas se turbine chalti thi, jisse complexity aur temperature limits aati thi; electric version mein woh thermal chain remove ho jaati hai.

> [!NOTE]
> Sabse badi "aha" yeh hai ki electric pumps ne turbopump ke turbine inlet temperature constraint ko hata diya, lekin uski jagah battery specific energy ka naya bottleneck laa diya.

## 2. Why this matters — concrete and current
Rocket Lab ke Electron rocket mein electric motor driven centrifugal pumps use hote hain jo RP-1 aur LOX ko ~100 bar pressure tak deliver karte hain, jisse 300 kN thrust class ka small-lift vehicle possible hota hai bina heavy turbopump assembly ke.

NASA ke Glenn Research Center ne 2022 mein 10 kW-class electric pump test article publish kiya jismein permanent-magnet motor aur supercritical CO2 bearing design dikhaaya gaya; yeh future Mars ascent vehicles ke liye lightweight feed system ki taraf step hai.

Astra Space ke Rocket 3.3 vehicle ne 2021 flight mein electric pump-fed upper stage try kiya, jisse restart capability aur throttling range dono improve hue bina gas-generator exhaust ke.

European Space Agency ke FLPP programme ke under 2023 mein Cryogenic Electric Pump demonstrator ka ground test hua jismein 50 kW motor ne 15 kg/s LOX flow achieve kiya, yeh Ariane Next reusable stage concepts ke liye data de raha hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Mass flow rate \(\dot{m}\) | Pump power directly proportional hota hai \(\dot{m} \Delta P\) ke |
| Pump head and efficiency | Electric motor sizing aur battery mass calculate karne ke liye |
| Specific energy (Wh/kg) | Battery mass budget decide karta hai overall vehicle performance |
| Bernoulli equation   | Pressure rise across pump ko velocity aur density se link karta hai |

## 4. Building the idea — from intuition to formalism

### Step 1 — Propellant pressure requirement
Liquid rocket engines ko combustion chamber pressure se 1.2–1.5× zyada pressure par propellants chahiye taaki injector orifices se proper atomization ho. Ek concrete example: 50 bar chamber pressure ke liye pump ko ~65 bar deliver karna padta hai. Formal statement: \(\Delta P_{\text{pump}} = P_{\text{cc}} / \eta_{\text{inj}} + \Delta P_{\text{line}}\).

> [!WARNING]
> Agar aap line losses ko neglect karoge to actual chamber pressure target se 10-15% kam ho jaayegi.

### Step 2 — Electric motor torque-speed relation
Pump impeller ko drive karne ke liye motor torque \(T = \dot{m} \cdot r \cdot \Delta v_{\theta}\) generate karta hai. Yeh step isliye zaroori hai kyunki electrical power \(P = T \omega\) directly battery se aata hai.

### Step 3 — Power balance equation
Total electrical power \(P_{\text{elec}} = \frac{\dot{m} \Delta P}{\rho \eta_{\text{pump}} \eta_{\text{motor}}}\). Display math: $$P_{\text{elec}} = \frac{\dot{m} \Delta P}{\rho \eta_{\text{pump}} \eta_{\text{motor}}}$$.

> [!WARNING]
> \(\eta_{\text{pump}}\) ko 0.7 maan lena common galti hai; cryogenic fluids mein yeh 0.55-0.65 tak gir sakta hai.

### Step 4 — Battery mass estimation
Battery mass \(m_{\text{bat}} = \frac{P_{\text{elec}} \cdot t_{\text{burn}}}{e_{\text{spec}} \cdot \eta_{\text{discharge}}}\) hoti hai jahaan \(e_{\text{spec}}\) Wh/kg mein hota hai.

### Step 5 — Cycle-level vehicle impact
Net payload fraction improve hoti hai kyunki turbopump ke heavy turbine, gas generator aur plumbing hat jaate hain, lekin battery mass add hoti hai. Textbook-grade statement: electric pump-fed cycle tabhi advantageous hai jab \(e_{\text{spec}} > 250\) Wh/kg aur burn time < 300 s.

## 5. Worked examples — har step show karo

**Example 1 — Basic power calculation**
- *Given:* \(\dot{m} = 5\) kg/s, \(\Delta P = 60\) bar, \(\rho = 800\) kg/m³, \(\eta_{\text{pump}} = 0.65\), \(\eta_{\text{motor}} = 0.92\)
- *Find:* \(P_{\text{elec}}\)
Pehle \(\Delta P\) ko Pa mein convert karo: \(60 \times 10^5 = 6 \times 10^6\) Pa.  
Phir numerator \(\dot{m} \Delta P = 5 \times 6 \times 10^6 = 3 \times 10^7\) W.  
Denominator \(\rho \eta_{\text{pump}} \eta_{\text{motor}} = 800 \times 0.65 \times 0.92 \approx 477\).  
\(P_{\text{elec}} = 3 \times 10^7 / 477 \approx 62.9\) kW.  
**62.9 kW**  
*Reflection:* Yeh example isliye simple thi kyunki density constant maani; real cryogenic case mein density variation add karna padta hai.

**Example 2 — Battery mass for 120 s burn**
- *Given:* \(P_{\text{elec}} = 63\) kW, \(t = 120\) s, \(e_{\text{spec}} = 220\) Wh/kg, \(\eta_{\text{discharge}} = 0.9\)
Energy required = \(63 \times 120 / 3600 = 2.1\) kWh.  
Mass = \(2.1 / (220 \times 0.9) \approx 10.6\) kg.  
**10.6 kg**  
*Reflection:* Battery mass ka comparison turbopump mass (usually 40-80 kg) se karna zaroori hota hai.

## 6. Common traps and how to avoid them

| Trap                          | Why it happens                          | How to avoid it                              |
|-------------------------------|-----------------------------------------|----------------------------------------------|
| Pump efficiency ko room-temp value use karna | Cryogenic viscosity alag hoti hai       | Test data ya CFD se \(\eta\) lo            |
| Battery Peukert effect ignore karna | High C-rate par capacity girti hai      | Discharge curve use karo                     |
| Motor cooling mass bhool jaana  | High power density par heat sink chahiye | Thermal model mein add karo                  |
| Throttling limit galat lagaana  | Electric motor torque curve non-linear hota hai | Torque-speed map plot karo                   |

## 7. The textbook-precise statement
An electric pump-fed cycle is a bipropellant feed system in which the propellant pumps are driven by electric motors whose electrical energy is supplied by an on-board source independent of the main combustion process. The cycle pressure rise is given by \(\Delta P = \eta_p \rho \omega^2 r_2^2 / 2\) for centrifugal pumps, with motor power satisfying \(P_m = \dot{m} \Delta P / (\rho \eta_p \eta_m)\). All hypotheses: steady incompressible flow, constant density, motor efficiency independent of load, and battery voltage sag neglected. Reference: Sutton & Biblarz, *Rocket Propulsion Elements*, 9e, §6.5.

## 8. Visual — diagram or schematic
```
Battery Pack (e_spec)
        |
   [Controller] ----> Motor (η_m)
        |                  |
        v                  v
   Pump Impeller ----> ΔP rise
        |                  |
   Propellant Tank     Injector → Chamber
```
Labels: vertical arrow from battery to motor labelled “electrical power”, horizontal arrow from pump to chamber labelled “\(\dot{m}, \Delta P\)”.

## 9. The memory technique
1. **The hook** — Imagine a battery pack as a “silent turbine” jo heat ke bina pressure banata hai.
2. **What to overlearn** — Power equation \(P_{\text{elec}} = \dot{m} \Delta P / (\rho \eta_p \eta_m)\) aur threshold \(e_{\text{spec}} > 250\) Wh/kg.
3. **Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Agar equation bhool jaaye to \(\text{power} = \text{force} \times \text{velocity}\) se shuru karo aur force = pressure × area, velocity = volume flow / area.

## 10. What this unlocks
Electric pump-fed architecture aapko variable thrust aur multiple restarts easily deta hai bina gas-generator exhaust loss ke.

- Battery mass optimisation ke liye specific energy vs burn time trade studies
- Cryogenic motor cooling techniques
- Throttle ratio > 10:1 wale engines ke control algorithms

## 11. Self-check — five questions, no answers
1. 80 bar chamber pressure ke liye minimum pump \(\Delta P\) kya hoga agar injector pressure drop 20% maana jaaye?
2. Agar \(\eta_p\) 0.60 se 0.70 ho jaaye to same flow ke liye electrical power kitna % kam ho jaayega?
3. 300 s burn time par 200 Wh/kg battery kab turbopump se heavy ho jaayegi?
4. Motor torque-speed curve mein konsa region throttling ke liye unsafe hai aur kyun?
5. Cryogenic LOX pump mein density change ko neglect karne se mass flow estimate kitna % galat ho sakta hai?