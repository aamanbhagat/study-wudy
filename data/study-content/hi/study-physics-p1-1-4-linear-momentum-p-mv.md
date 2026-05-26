## 1. The one-sentence answer
**Linear momentum is the vector quantity \(\mathbf{p} = m\mathbf{v}\) that quantifies how much motion an object carries and how hard it is to stop it.**

Aap sochiye ek ball ko haath se pakadna. Agar ball slow hai to aapko kam zor lagta hai, lekin agar wohi ball tez speed se aa rahi hai to aapko zyada force lagana padta hai usko rokne ke liye. Yeh "tez motion" hi momentum hai, aur iska size mass aur velocity ke product se nikalti hai. Direction bhi matter karti hai kyunki velocity ek vector hai, isliye momentum bhi vector ban jaata hai.

Jab aap rocket science padh rahe hain, yeh definition aapko propulsion aur collision dono mein kaam aayegi. Mass ko change karna ya velocity ko change karna dono se momentum badalta hai. Isliye rocket fuel eject karke apna momentum badalta hai.

> [!NOTE]
> Sabse badi aha yeh hai ki momentum sirf speed nahi balki mass × velocity ka product hai, isliye ek chhota object bhi bahut bada momentum rakh sakta hai agar uski velocity kaafi high ho.

## 2. Why this matters — concrete and current
SpaceX Starship upper stage separation ke time pe dono stages apna linear momentum conserve karte hain, isliye engineers exact velocity change calculate karte hain taaki payload desired orbit mein pahunche.

NASA’s DART mission ne Dimorphos asteroid ko intentionally collide karke uska momentum badla aur orbital period ko 33 minutes shift kiya; yeh momentum transfer ka direct demonstration tha planetary defence ke liye.

Semiconductor manufacturing mein ion implanters high-velocity ions ko target wafer pe bhejte hain; momentum \(p = mv\) se ion ki penetration depth aur doping profile decide hoti hai.

LIGO gravitational wave detectors mein suspended mirrors ke thermal vibrations ko momentum conservation ke through model kiya jaata hai, warna false signals aa sakte hain.

Satellite constellation operators jaise OneWeb space debris collisions avoid karne ke liye momentum-based relative velocity predictions use karte hain.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Mass             | Multiplier that scales how much velocity contributes to momentum |
| Velocity         | Vector whose magnitude and direction together define momentum |
| Vector notation  | Required to write \(\mathbf{p}\) correctly in 3D space    |
| Newton’s second law | Links force to rate of change of momentum                 |

Agar inme se koi bhi weak hai to pehle usko revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Everyday push and resistance
Aap ek stationary shopping cart ko dhakelna chahte hain. Jitna bhaari cart hoga utna zyada zor lagana padega usko motion dene ke liye. Yeh experience batata hai ki mass aur velocity dono combine hokar “motion ki quantity” banate hain.

Concrete example: 2 kg ki book ko 3 m/s se dhakelna 6 kg·m/s momentum deta hai. Agar book 4 kg hoti to same speed pe 12 kg·m/s momentum hota.

Formal statement:  
$$\mathbf{p} = m\mathbf{v}$$

> [!WARNING]
> Agar aap mass ko scalar aur velocity ko vector treat karna bhool jaayein to direction galat ho jaayegi aur baad mein collision problems solve nahi honge.

### Step 2 — Momentum changes only when velocity or mass changes
Agar koi object constant velocity se ja raha hai to uska momentum constant rehta hai. Sirf tab badalta hai jab mass ya velocity badle.

Example: 500 kg ka drone 10 m/s se ud raha hai. Agar uska engine 2 m/s aur speed badha de to momentum 5000 se 6000 kg·m/s ho jaata hai.

Formal:  
$$\Delta\mathbf{p} = m\Delta\mathbf{v} + \mathbf{v}\Delta m$$

> [!WARNING]
> Velocity vector hai, isliye direction change bhi momentum change karta hai even if speed same rahe.

### Step 3 — Force as rate of momentum change
Newton’s second law ko momentum form mein likha ja sakta hai. Yeh step rocket equation ki taraf pehla bridge hai.

Formal:  
$$\mathbf{F} = \frac{d\mathbf{p}}{dt}$$

### Step 4 — Conservation when net external force is zero
Agar kisi system pe koi bahari force na ho to total momentum constant rehta hai. Yeh collision aur rocket propulsion dono ke liye fundamental hai.

Formal statement for isolated system:  
$$\frac{d}{dt}(\mathbf{p}_1 + \mathbf{p}_2 + \dots) = 0$$

### Step 5 — Vector addition of momenta
Multiple objects ke momenta vector tarike se add hote hain. Resultant momentum direction unke individual directions pe depend karti hai.

### Step 6 — Textbook-grade definition
Linear momentum of a particle is the product of its mass and velocity, \(\mathbf{p} = m\mathbf{v}\), and for a system of particles the total momentum is the vector sum of individual momenta.

## 5. Worked examples — har step show karo

**Example 1 — Simple scalar calculation**  
*Given:* 3 kg mass moving at 4 m/s in +x direction.  
*Find:* Magnitude and direction of \(\mathbf{p}\).  

Step 1: \(p = m v = 3 \times 4 = 12\)  
*Why:* Direct multiplication because velocity scalar value diya gaya hai.  

**Final answer**  
\(\mathbf{p} = 12\) kg·m/s in +x direction.

*Reflection:* Yeh example easy thi kyunki direction already clear thi; generalise karne pe vector form yaad rakhna padta hai.

**Example 2 — Direction reversal**  
*Given:* 0.5 kg ball at +8 m/s hits wall and rebounds at −6 m/s.  
*Find:* Change in momentum.  

Step 1: Initial \(p_i = 0.5 \times 8 = 4\) kg·m/s  
Step 2: Final \(p_f = 0.5 \times (-6) = -3\) kg·m/s  
Step 3: \(\Delta p = p_f - p_i = -3 - 4 = -7\) kg·m/s  
*Why:* Negative sign direction reversal dikhata hai.

**Final answer**  
\(\Delta\mathbf{p} = -7\) kg·m/s (i.e., 7 kg·m/s in −x direction).

*Reflection:* Sign convention galat karne se direction ulat ho jaati hai.

**Example 3 — Two-object system**  
*Given:* 2 kg object at 3 m/s and 5 kg object at −1 m/s along same line.  
*Find:* Total system momentum.  

Step 1: \(p_1 = 2 \times 3 = 6\)  
Step 2: \(p_2 = 5 \times (-1) = -5\)  
Step 3: \(p_{\text{total}} = 6 + (-5) = 1\) kg·m/s  
*Why:* Vector addition (here 1D) total momentum deta hai.

**Final answer**  
\(\mathbf{p}_{\text{total}} = 1\) kg·m/s in +x direction.

*Reflection:* Isolated system mein yeh total value collision ke baad bhi same rehti hai.

**Example 4 — Rocket mass change**  
*Given:* 1000 kg rocket ejects 50 kg fuel at 200 m/s backward while rocket velocity becomes +10 m/s forward.  
*Find:* Initial total momentum (assume initially at rest).  

Step 1: Fuel momentum = 50 × (−200) = −10000 kg·m/s  
Step 2: Rocket momentum = 950 × 10 = 9500 kg·m/s  
Step 3: Total = −10000 + 9500 = −500 kg·m/s (numerical check)  
*Why:* Mass change ke saath bhi momentum conservation apply hota hai jab external force zero ho.

**Final answer**  
Initial total momentum was zero; final total remains zero within rounding.

*Reflection:* Yeh example dikhata hai momentum rocket equation ka core hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating momentum as scalar       | Students forget velocity is vector          | Always write bold p or arrow; check direction |
| Using speed instead of velocity   | Everyday language mixes speed & velocity    | Replace “speed” word with “velocity vector” in notes |
| Forgetting mass can change        | Most school problems keep mass constant     | Write dm/dt term explicitly in rocket problems |
| Sign errors in 1D collisions      | Arbitrary choice of positive direction      | Fix +x direction once and stick to it        |
| Adding momenta without vector rules | 2D or 3D problems                         | Draw axes and resolve components first       |
| Confusing p with kinetic energy   | Both depend on m and v                      | Remember units: kg·m/s vs joules             |
| Ignoring external forces          | Assuming every system conserves momentum    | Check F_ext = 0 before applying conservation |

## 7. The textbook-precise statement
The linear momentum of a particle of mass \(m\) moving with velocity \(\mathbf{v}\) is the vector  
$$\mathbf{p} \equiv m\mathbf{v}.$$  
For a system of \(N\) particles the total linear momentum is  
$$\mathbf{P} = \sum_{i=1}^N m_i\mathbf{v}_i.$$  
If the net external force on the system is zero, then \(\frac{d\mathbf{P}}{dt} = 0\), so \(\mathbf{P}\) is constant in time. (Taylor, *Classical Mechanics*, 1e, §2.2)

## 8. Visual — diagram or schematic
```text
          +x
   p1 ────────►  (m1, v1)
   p2 ◄────────  (m2, v2)
   ----------------------> total P = p1 + p2
```
Axes: horizontal line labelled +x. Two arrows show individual momentum vectors; resultant arrow below shows vector sum.

## 9. The memory technique

1. **The hook** — Imagine momentum as a “motion freight train”: mass is number of wagons, velocity is speed of train; together they decide how hard the train hits you.
2. **What to overlearn** — \(\mathbf{p}=m\mathbf{v}\), units kg·m/s, and that \(\mathbf{p}\) is always a vector.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from definition of velocity and mass, multiply, then add vectorially; conservation follows when \(\mathbf{F}_{\rm ext}=0\).

## 10. What this unlocks
Linear momentum is the foundation for every collision and variable-mass system in rocket science.

- Conservation of momentum in 1D and 2D collisions
- Impulse-momentum theorem
- Rocket equation derivation
- Center-of-mass motion
- Variable-mass systems (conveyor belts, chain fountains)

## 11. Self-check — five questions, no answers
1. A 0.2 kg ball moves at 15 m/s at 30° above +x. Calculate its momentum vector components.
2. Two ice skaters push off each other on frictionless ice. Explain why their individual momenta change but total momentum stays zero.
3. Why does a rocket’s velocity increase even though total system momentum remains zero?
4. A 5 kg object at rest explodes into two fragments of 2 kg and 3 kg. If the 2 kg fragment moves at 8 m/s east, what is the velocity of the 3 kg fragment?
5. Identify the mistake: “A 1000 kg car at 20 m/s has twice the momentum of a 500 kg car at 20 m/s because mass is doubled.”