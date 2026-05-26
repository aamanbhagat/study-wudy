## 1. The one-sentence answer
**The first law for open systems (control volumes) expresses conservation of energy by tracking the time rate of change of energy inside a fixed region plus the net energy carried across its boundaries by mass flow, heat, and work.**

Iska matlab yeh hai ki jab fluid continuously andar-bahar flow kar raha hota hai, aap sirf system ke andar energy change nahi dekh sakte jaise closed system mein. Aapko mass ke saath energy ka transport bhi account karna padta hai. Isliye enthalpy appear hoti hai kyunki pressure work flow ke saath automatically include ho jaati hai.

Aap ek rocket nozzle ya jet engine ke through air dekhiye: energy balance mein inlet aur outlet pe kinetic plus internal energy plus flow work sab ek saath aata hai. Yeh equation compressible flow problems ka foundation hai kyunki density, velocity aur temperature sab coupled hote hain.

> [!NOTE]
> The single key insight is that enthalpy \(h = u + p/\rho\) naturally replaces internal energy because the \(p\,dV\) work done to push mass into or out of the control volume is already bundled inside the energy flux term.

## 2. Why this matters — concrete and current
SpaceX Raptor engine testing mein nozzle ke andar high-speed combustion products ka energy balance exactly isi law se solve kiya jaata hai taaki chamber pressure aur exhaust velocity predict ki ja sake.

ISRO ke cryogenic upper stage (CE-20) design mein open-system first law ka use karke hydrogen turbopump ke through energy transfer calculate karte hain, jisse turbine inlet temperature aur mass-flow matching hoti hai.

NASA Langley ke 0.3 m Transonic Cryogenic Tunnel mein test section ke steady-state energy balance se total temperature loss ko correct kiya jaata hai, jo directly model validation ke liye use hota hai.

Pratt & Whitney geared turbofan engines ke high-bypass fan stage mein inlet distortion ke effect ko open-system energy equation se model karte hain, jo fuel-burn efficiency ko directly affect karta hai.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Closed-system first law  | Starting point before adding mass-flow terms              |
| Control-volume definition| Fixed region in space through which fluid crosses         |
| Enthalpy \(h = u + p/\rho\) | Converts flow work into an energy flux carried by mass |
| Steady vs unsteady flow  | Tells whether \(\partial/\partial t\) term survives       |

Agar upar ke concepts clear nahi hain to pehle closed-system thermodynamics aur control-volume kinematics padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the closed-system statement
Closed system ke liye energy balance simple hai: \(\Delta E = Q - W\). Lekin jab mass continuously enter aur exit kar raha ho, woh closed-system boundary har baar change hoti hai, isliye practical nahi.

Example: Ek balloon mein gas fill karte waqt aap har moment naye mass ko andar la rahe ho. Formal statement: \( \frac{dE}{dt}\big|_{\text{sys}} = \dot{Q} - \dot{W} \).

> [!WARNING]
> Agar aap yahin galti se closed-system equation ko directly open flow pe apply kar doge to boundary work ko double-count karoge aur enthalpy term miss ho jaayega.

### Step 2 — Switch to a fixed control volume
Reynolds transport theorem ke through closed-system derivative ko control-volume terms mein badalte hain. Yeh step mathematically rigorous hai lekin physically yeh sirf ek mathematical trick hai jo fixed region choose karke mass crossing ko explicit banata hai.

Example: Nozzle ke andar ek fixed box soch lo. Ab mass inlet aur outlet pe clearly dikhta hai. Formal: \(\frac{d}{dt}\int_{\text{CV}} e\,\rho\,dV + \int_{\text{CS}} e\,\rho\,\mathbf{V}\cdot d\mathbf{A} = \dot{Q} - \dot{W}\).

### Step 3 — Separate flow work from shaft work
Jab mass control surface cross karta hai, pressure force kaam karta hai. Is work ko shaft-work se alag karte hain taaki \(\dot{W}_{\text{shaft}}\) aur flow-work term dono saaf rahein.

Example: Compressor shaft power alag hota hai, jabki inlet pe \(p\,A\,V\) term flow work hai. Formal: \(\dot{W} = \dot{W}_{\text{shaft}} + \int p\,\mathbf{V}\cdot d\mathbf{A}\).

### Step 4 — Combine internal energy and flow work into enthalpy
\(u + p/\rho\) ko ek term \(h\) mein likh dete hain. Yeh sirf algebraic regrouping hai lekin compressible flow mein bahut powerful kyunki \(h\) stagnation properties se directly connect hota hai.

Example: Perfect gas ke liye \(h = c_p T\). Formal: energy flux term ab \(\int (h + V^2/2 + gz)\rho\mathbf{V}\cdot d\mathbf{A}\) ban jaata hai.

### Step 5 — Write the final open-system first-law equation
Saare terms ek saath laakar textbook form milta hai. Yeh equation ab compressible aerodynamics ke liye ready hai.

Formal statement:
\[
\frac{d}{dt}\int_{\text{CV}} \rho\left(u + \frac{V^2}{2} + gz\right)dV + \int_{\text{CS}} \rho\left(h + \frac{V^2}{2} + gz\right)\mathbf{V}\cdot d\mathbf{A} = \dot{Q}_{\text{net}} - \dot{W}_{\text{shaft,net}}
\]

## 5. Worked examples — har step show karo

**Example 1 — Steady adiabatic nozzle**
*Given:* Air enters a converging nozzle at 300 K, 100 kPa, 10 m/s; exits at 250 K, 60 kPa. Neglect potential energy and shaft work.  
*Find:* Exit velocity.  

Apply steady-state form (all \(\partial/\partial t = 0\)) and one inlet–one outlet:  
\(h_1 + V_1^2/2 = h_2 + V_2^2/2\).  
For air \(c_p = 1004\) J kg\(^{-1}\) K\(^{-1}\),  
\(1004\times300 + 10^2/2 = 1004\times250 + V_2^2/2\).  
\(V_2 = \sqrt{2\times1004\times50 - 50} \approx 316\) m/s.  
*Why:* Enthalpy drop directly converts to kinetic energy because no heat or shaft work.  

**Final answer**  
**316 m/s**

*Reflection:* Simple energy conversion; same logic later extends to Rayleigh-line flow.

**Example 2 — Tank filling (unsteady)**
*Given:* An evacuated tank of volume 2 m³ is filled from a 500 kPa, 400 K reservoir until tank pressure reaches 300 kPa. Assume adiabatic and negligible KE.  
*Find:* Final temperature inside tank.  

Unsteady integral reduces to \(m_2 u_2 = m_i h_i\) because initial mass zero and \(\dot{Q}=\dot{W}=0\).  
For air \(\gamma=1.4\), \(T_2 = \gamma T_i = 1.4\times400 = 560\) K.  
*Why:* Inlet enthalpy (not internal energy) is the correct energy brought by incoming mass.  

**Final answer**  
**560 K**

*Reflection:* Classic trap — students often use \(u\) instead of \(h\).

**Example 3 — Compressor with heat loss**
*Given:* Steady flow compressor, inlet 290 K, outlet 450 K, shaft work input 180 kJ/kg, heat loss 20 kJ/kg.  
*Find:* Change in kinetic energy (assume negligible PE).  

\(h_1 + V_1^2/2 + w_{\text{shaft}} = h_2 + V_2^2/2 + q\).  
Rearrange: \(V_2^2/2 - V_1^2/2 = c_p(T_1-T_2) + w_{\text{shaft}} - q = 1004(-160) + 180000 - (-20000) = 39640\) J/kg.  
\(\Delta(\text{KE}) \approx 39.6\) kJ/kg.  
*Why:* Signs of work and heat follow the convention used in the derivation.  

**Final answer**  
**39.6 kJ/kg**

*Reflection:* Shows how heat and work terms sit alongside enthalpy.

**Example 4 — Rocket thrust chamber (simplified)**
*Given:* Chamber stagnation temperature 3200 K, \(\gamma=1.2\), \(c_p=2500\) J kg\(^{-1}\) K\(^{-1}\), throat velocity sonic.  
*Find:* Throat static temperature.  

At throat \(M=1\), \(T_t/T_0 = 2/(\gamma+1)\).  
\(T_t = 3200\times2/(2.2) = 2909\) K.  
Energy equation confirms \(h_0 = h_t + V_t^2/2\) with \(V_t = \sqrt{\gamma R T_t}\).  
*Why:* Sonic condition plus energy equation together fix throat state.  

**Final answer**  
**2909 K**

*Reflection:* Foundation for all isentropic nozzle tables used in propulsion.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using \(u\) instead of \(h\) at inlet/outlet | Forgetting flow work is carried by mass     | Always replace \(u + p/\rho\) with \(h\)     |
| Sign error on shaft work          | Mixing \(\dot{Q}-\dot{W}\) convention       | Write \(\dot{W}_{\text{shaft}}\) positive when done by device on fluid |
| Dropping unsteady term too early  | Assuming everything is steady               | Check if mass inside CV is changing          |
| Neglecting KE when Mach > 0.3     | Thinking “low speed” incorrectly            | Compare \(V^2/2\) with \(c_p\Delta T\)       |
| Forgetting multiple inlets        | Writing single-stream equation              | Sum over all \(\dot{m}_i h_i\) terms         |
| Units mismatch (kJ vs kW)         | Mixing specific and rate quantities         | Keep \(\dot{m}\) outside when using specific \(h\) |

## 7. The textbook-precise statement
For a fixed control volume the integral form of the first law of thermodynamics for an open system is
\[
\frac{d}{dt}\int_{\rm CV}\rho\left(u+\frac{V^2}{2}+gz\right)d\mathcal{V}+\int_{\rm CS}\rho\left(h+\frac{V^2}{2}+gz\right)\mathbf{V}\cdot d\mathbf{A}=\dot{Q}_{\rm net,in}-\dot{W}_{\rm shaft,net,out},
\]
where the control surface is the closed boundary of the control volume, \(h=u+p/\rho\), and body forces other than gravity are neglected. All heat and shaft-work transfers are positive when into the control volume. (Anderson, *Fundamentals of Aerodynamics*, 6e, §9.2)

## 8. Visual — diagram or schematic
```text
          Q_dot (heat in)
               ↓
   ┌──────────────────────┐
   │                      │
→ │   CONTROL VOLUME     │ →  m_out (h + V²/2 + gz)
   │   (fixed in space)   │
   │                      │
   └──────────────────────┘
          ↑
       W_shaft (out)
```
Inlet mass flux arrow on left carries its own \(h+V^2/2+gz\); outlet arrow on right carries the same quantities evaluated at exit state.

## 9. The memory technique
1. **The hook** — Picture a fixed cardboard box sitting inside a wind tunnel; heat and shaft wires poke through the walls while air streams in one side and out the other — the box itself never moves.
2. **What to overlearn** — Steady single-stream equation \(h_1+V_1^2/2=h_2+V_2^2/2\) and the definition \(h=u+p/\rho\).
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If the final equation slips your mind, restart from the closed-system statement, apply Reynolds transport theorem, isolate flow work, and regroup into enthalpy.

## 10. What this unlocks
Aap ab stagnation temperature, isentropic relations, and Rayleigh/Fanno flow ke liye energy equation directly use kar sakte hain.

- Normal-shock relations (energy jump condition)
- Nozzle design and choking criteria
- Combustor heat-addition analysis
- Turbomachinery stage work calculation

## 11. Self-check — five questions, no answers
1. Ek steady nozzle mein inlet temperature 290 K aur exit temperature 240 K hai. Exit velocity kya hogi agar inlet velocity negligible ho?
2. Kya hota hai agar aap tank-filling example mein enthalpy ki jagah internal energy use karte ho?
3. Ek control volume ke andar mass badh raha hai. Kaunsa term non-zero rahega jo steady flow mein zero hota hai?
4. Mach 0.8 flow mein kinetic-energy term ko neglect karne se percentage error kitna aata hai (assume \(c_p\Delta T\) reference)?
5. Rocket chamber mein total enthalpy constant kyun maani jaati hai jabki combustion ho rahi hoti hai?