## 1. The one-sentence answer
**Power is the time rate of doing work or transferring energy.**

Aap jab koi force lagakar displacement karte ho, work accumulate hota hai. Power bataata hai ki yeh work kitni tezi se ho raha hai. Average power sirf total work ko total time se divide karti hai, lekin instantaneous power ek exact moment par work ke badalne ki speed dikhaati hai.

Jab velocity constant hoti hai, power force aur velocity ke dot product se nikalti hai. Rocket engines mein yeh directly thrust aur exhaust velocity se link hoti hai, isliye power calculations mission design mein critical hote hain.

> [!NOTE]
> Power ek scalar hai lekin velocity vector hone ke bawajood; sabse badi aha yeh hai ki power zero ho sakti hai jab force velocity ke perpendicular ho, bhale hi force aur speed dono non-zero hon.

## 2. Why this matters — concrete and current
SpaceX Starship re-entry aur landing burns mein instantaneous power peaks 10–12 GW tak pahunchte hain; average power figures se yeh clearly alag hota hai kyuki thrust profile time ke saath badalta hai.

ISRO ke Gaganyaan mission ke solid boosters mein power delivery curve decide karti hai ki structural loads kitne seconds mein peak karenge, isliye average versus instantaneous distinction design simulations mein use hota hai.

Semiconductor fabs mein high-power laser annealing tools (Applied Materials ke machines) instantaneous power spikes ko control karte hain taaki wafer temperature gradient safe rahe; average power se yeh spikes miss ho jaate hain.

LIGO detectors mein mirror actuators ko continuous low average power chahiye lekin instantaneous power bursts gravitational-wave events ke time par precise hone chahiye; power spectral density analysis isi distinction par based hai.

Electric propulsion systems jaise Hall thrusters (NASA’s Psyche mission) mein power = thrust × velocity relation se efficiency map ki jaati hai; instantaneous power fluctuations battery aur solar array sizing decide karti hain.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Work (scalar product) | Power = dW/dt, isliye work ki definition pehle clear honi chahiye |
| Derivative (limit)   | Instantaneous power derivative ki tarah define hoti hai   |
| Vector dot product   | P = F · v form nikalne ke liye zaroori hai                |
| SI base units        | Watt = J s⁻¹ ko verify karne aur dimensional analysis ke liye |

Agar derivative ya dot product abhi weak hain to pause karke unhe pehle revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Work accumulates over time
Work ek scalar quantity hai jo force aur displacement ke saath badhti hai. Jab aap ek constant force se ek object ko move karte ho, total work W = F·Δr hota hai. Lekin agar yeh displacement time ke saath ho raha hai, to hum jaanna chahte hain kitni jaldi work ho raha hai.

Example: 100 N force se 5 m door tak ek box ko 10 s mein push karna. Total work 500 J hai.

Formal statement: \(W = \int \mathbf{F}\cdot d\mathbf{r}\).

> [!WARNING]
> Agar aap work ko time ke saath divide karna bhool jaayein to power ki jagah energy hi calculate karte rah jaoge.

### Step 2 — Average power as total work over total time
Average power sirf ek overall rate deti hai. Jab motion irregular ho, average power total work ko total time se divide karke nikalti hai.

Example: upar wale case mein average power = 500 J / 10 s = 50 W.

Formal statement: \(P_\text{avg} = \frac{\Delta W}{\Delta t}\).

> [!WARNING]
> Average power peak loads ko hide kar sakti hai; rocket engine design mein yeh galti structural failure la sakti hai.

### Step 3 — Instantaneous power via derivative
Jab time interval bahut chhota ho jaaye, average power instantaneous power ban jaati hai. Mathematically yeh work function ka derivative hai.

Example: agar W(t) = 50t² J, to t = 3 s par instantaneous power dW/dt = 300 W hoti hai.

Formal statement: \(P = \lim_{\Delta t \to 0} \frac{\Delta W}{\Delta t} = \frac{dW}{dt}\).

> [!WARNING]
> Derivative lena bhool jaane par aap sirf average values hi use kar paoge aur time-varying thrust profiles galat model honge.

### Step 4 — Power expressed as force–velocity dot product
Work ki definition se derivative nikaalte hue P = F · v milta hai. Yeh form rocket nozzle analysis mein sabse useful hai.

Example: 5000 N thrust, 2000 m/s exhaust velocity, aligned vectors → P = 10 MW.

Formal statement: \(P = \mathbf{F}\cdot\mathbf{v}\).

> [!WARNING]
> Agar vectors perpendicular hon to power zero ho jaati hai, chahe magnitudes bade hon.

### Step 5 — Units and dimensional consistency
Power ki SI unit watt (W) hai jo J s⁻¹ ke barabar hai. Horsepower, kilowatt jaise conversions practical calculations mein aate hain.

Formal statement: \([P] = \text{kg·m}^2\text{s}^{-3}\).

> [!WARNING]
> Unit mismatch (W vs kW) mission power budgets mein 1000× error la sakta hai.

### Step 6 — Rocket-specific power relation
Thrust power = thrust × effective exhaust velocity. Yeh instantaneous power ko propellant flow rate se link karti hai.

Formal statement: \(P = \dot{m} v_e^2 / 2\) (kinetic power in exhaust).

## 5. Worked examples — har step show karo

**Example 1 — Constant force lifting**
*Given:* 200 N upward force, 3 m displacement in 4 s at constant speed.  
*Find:* Average and instantaneous power.  

P_avg = ΔW/Δt = (200 × 3)/4 = 150 W.  
Kyuki speed constant hai, instantaneous power bhi 150 W hai.  
*Why:* Work scalar hai aur time interval fixed, isliye average = instantaneous.  

**Final answer**  
**150 W**

*Reflection:* Yeh example simple hai kyuki velocity constant thi; general case mein derivative chahiye.

**Example 2 — Variable force, position-dependent**
*Given:* F = 10x N, x from 0 to 2 m in 5 s (assume linear time mapping).  
*Find:* Instantaneous power at x = 1 m.  

W = ∫10x dx = 5x², dW/dt = 10x dx/dt.  
At x = 1 m, v = 2/5 = 0.4 m/s → P = 10×1×0.4 = 4 W.  
*Why:* Derivative chain rule use kiya kyuki x time ka function hai.  

**Final answer**  
**4 W**

*Reflection:* Variable force mein position aur velocity dono track karna padta hai.

**Example 3 — Rocket thrust at constant exhaust velocity**
*Given:* ṁ = 50 kg/s, v_e = 3000 m/s, thrust aligned with velocity.  
*Find:* Instantaneous power delivered to vehicle.  

P = F v_e = (ṁ v_e) v_e = 50 × 3000² = 450 MW.  
*Why:* Dot product 1 hone se scalar multiplication ban jaati hai.  

**Final answer**  
**450 MW**

*Reflection:* Yeh form electric propulsion sizing mein seedha use hota hai.

**Example 4 — Sinusoidal velocity profile**
*Given:* v(t) = 10 sin(πt) m/s, F = 100 N constant and aligned.  
*Find:* Average power over first 2 s.  

W = ∫ F v dt = 1000 ∫ sin(πt) dt from 0 to 2 = 2000/π J.  
P_avg = 2000/(π×2) ≈ 318.3 W.  
*Why:* Integral work deta hai, phir divide karke average.  

**Final answer**  
**≈ 318.3 W**

*Reflection:* Oscillatory motion mein average power net energy transfer ko capture karti hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using P = Fv even when F ⊥ v | Students forget dot product                 | Always check angle between vectors           |
| Confusing W and P units     | J vs W sikhne mein slip                     | Write unit after every numerical answer      |
| Treating average as instantaneous | Constant-velocity examples over-practiced | Derivative laga ke check karo                |
| Missing negative power      | Braking ya opposing force cases             | Sign of dot product explicitly verify karo   |
| kW vs MW conversion error   | Large rocket numbers                        | Always write 10³ or 10⁶ factor visibly       |
| Ignoring mass-flow power    | Only vehicle kinetic energy soch rahe       | Exhaust kinetic power bhi calculate karo     |

## 7. The textbook-precise statement
Power is defined as the time derivative of work:  
\[P(t)=\frac{dW}{dt}=\mathbf{F}(t)\cdot\mathbf{v}(t),\]  
where the second equality follows when \(W=\int\mathbf{F}\cdot d\mathbf{r}\). Average power over an interval \([t_1,t_2]\) is  
\[P_\text{avg}=\frac{1}{t_2-t_1}\int_{t_1}^{t_2}P(t)\,dt=\frac{W(t_2)-W(t_1)}{t_2-t_1}.\]  
The SI unit is the watt (W), equal to one joule per second. (Young & Freedman, *University Physics*, 15e, §6.4)

## 8. Visual — diagram or schematic
```
Work W
 ^
 |          / slope = P_inst
 |         /
 |        /
 |_______/_______________> t
   Δt
```
Horizontal axis time, vertical axis cumulative work. Straight line segment ka slope average power hai; curve ka tangent instantaneous power.

## 9. The memory technique
1. **The hook** — Imagine a rocket exhaust glowing brighter exactly when power spikes; brightness = instantaneous power.
2. **What to overlearn** — \(P=\mathbf{F}\cdot\mathbf{v}\) and \(1\,\text{W}=1\,\text{J/s}\).
3. **Spaced-repetition schedule** — Review 1 day, 3 days, 7 days, 16 days, 35 days later.
4. **First-principles fallback** — W = ∫F·dr se derivative lo → P = F·v.

## 10. What this unlocks
Yeh section aapko energy flow rate samajhne deta hai jo next topics jaise conservation of energy in variable-mass systems aur rocket equation derivations mein seedha use hota hai.

- Kinetic power in exhaust streams
- Specific impulse calculations
- Energy budgets in orbital transfers

## 11. Self-check — five questions, no answers
1. Ek 500 N force 10 m/s velocity ke saath 30° angle par laga rahi hai. Instantaneous power kya hai?
2. Work function W(t) = 3t³ + 2t diya gaya hai. t = 2 s par instantaneous power nikaalo.
3. Average power 200 W hai 5 s ke interval mein. Total work kitna hua?
4. Kyun hota hai ki ek satellite mein constant thrust ke bawajood power badalti rehti hai?
5. 10 kW motor 2 hp motor se zyada powerful hai ya kam? Calculation ke saath batao.