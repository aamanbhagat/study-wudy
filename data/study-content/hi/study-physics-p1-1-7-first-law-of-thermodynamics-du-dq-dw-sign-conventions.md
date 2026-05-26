## 1. The one-sentence answer
**The first law of thermodynamics states that the change in internal energy of a system equals the heat added to it minus the work done by it: \(dU = dQ - dW\).**

Yeh law energy conservation ka direct application hai closed systems ke liye. Internal energy \(U\) ek state function hai jo sirf system ke current state par depend karti hai, jabki heat \(dQ\) aur work \(dW\) path-dependent hain. Sign convention yahan clear hai: heat system mein add hone par positive, aur work system ke dwara kiya jaane par positive, isliye minus sign lagta hai.

Aap is equation ko energy balance ke roop mein soch sakte hain. Agar system heat absorb karta hai lekin usi energy ka kuch hissa work karne mein use karta hai, toh baaki energy uske internal state ko badalti hai jaise temperature ya pressure.

> [!NOTE]
> Sabse badi aha yeh hai ki \(U\) sirf initial aur final state par depend karti hai, isliye cycle ke liye \(\Delta U = 0\) hota hai aur \(Q = W\) ban jaata hai, chahe path kitna bhi complicated ho.

## 2. Why this matters — concrete and current
SpaceX ke Raptor engines mein combustion chamber ke andar first law directly apply hota hai jab propellant burn karke high-pressure gas banata hai aur nozzle se expand karke thrust generate karta hai; yahan \(dW\) nozzle ke through kinetic energy mein convert hoti hai aur \(dU\) chamber temperature ko control karti hai.

ISRO ke cryogenic upper stages mein liquid hydrogen aur oxygen ke mixture par yeh law use hota hai taaki boil-off losses ko minimize kiya ja sake; engineers \(dQ\) ke through heat leaks ko calculate karke insulation design karte hain.

Nuclear reactor fuel rods mein fission se release hone wali energy \(dQ\) ke roop mein aati hai aur coolant flow \(dW\) banata hai, isliye first law rod ke temperature rise ko predict karta hai aur meltdown avoid karta hai.

Stellar interiors jaise Sun ke core mein gravitational compression work \(dW\) karta hai aur nuclear fusion \(dQ\) deta hai, jisse \(\Delta U\) hydrostatic equilibrium maintain karta hai; yeh models Chandra X-ray Observatory ke data se validate hue hain.

Semiconductor fabs mein rapid thermal annealing processes first law ka use karte hain wafer temperature ko control karne ke liye jab heat lamps \(dQ\) supply karte hain aur gas flow work extract karta hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Conservation of energy | Basis for stating that energy can only be transferred as heat or work |
| Definition of work   | Mechanical work \(dW = P\,dV\) directly appears in the sign convention |
| Heat as energy transfer | \(dQ\) ko distinguish karna zaroori hai state function se |
| State variables      | \(U\) ek state function hai isliye path-independent hai   |

Agar aap inme se koi bhi weak feel kar rahe hain to pehle basic mechanics aur calorimetry padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Energy can only change form, never disappear
Energy ka total amount fixed rehta hai. Jab aap ek gas ko piston se compress karte hain toh aap energy daal rahe hain, lekin woh energy gas ke andar store hoti hai ya heat ke roop mein nikal sakti hai.

Example: Haath se bicycle pump compress karo; cylinder garam ho jaata hai kyunki work energy heat ban gayi.

Formal statement: Closed system ke liye total energy balance zero hota hai.

> [!WARNING]
> Agar aap energy ko “create” karne wali cheez samajh baithe toh entire equation galat ho jaayegi.

### Step 2 — Heat and work are the only two ways to transfer energy
Heat \(dQ\) temperature difference se hota hai, work \(dW\) force-displacement se. Dono ko infinitesimal quantities ke roop mein likha jaata hai kyunki yeh path par depend karte hain.

Example: Ek ideal gas ko freely expand hone do; \(dW = 0\) aur agar insulated hai toh \(dQ = 0\), phir bhi temperature gir sakti hai.

Formal: \(dQ\) aur \(dW\) inexact differentials hain.

> [!WARNING]
> Inko exact differential samajhna common galti hai jo baad mein integration errors laata hai.

### Step 3 — Internal energy is a state function
\(U\) sirf \(T, V, n\) par depend karta hai, isliye \(\Delta U = U_f - U_i\) path se independent hai.

Example: Same initial aur final state leke do alag paths choose karo; \(\Delta U\) dono mein same aayega.

Formal: \(dU\) exact differential hai.

> [!WARNING]
> Cycle mein \(\Delta U = 0\) bhool jaana calculation ko zero galat kar deta hai.

### Step 4 — Write the balance with sign convention
Heat system mein jaaye toh positive, work system kare toh positive. Isliye equation \(dU = dQ - dW\) banti hai.

Example: Isobaric expansion mein \(dW = P\,dV > 0\) toh \(dU = dQ - P\,dV\).

Formal: \(dU = \delta Q - \delta W\) (standard physics convention).

> [!WARNING]
> Chemistry convention (\(dU = dQ + dW\)) se confuse mat hona; sign flip ho jaata hai.

### Step 5 — Apply to finite changes and cycles
Integrate karke \(\Delta U = Q - W\) milta hai. Closed cycle ke liye \(Q = W\).

Formal: \(\oint dU = 0 \implies Q = W\).

## 5. Worked examples — har step show karo

**Example 1 — Constant volume heating**
- *Given:* Ideal gas, \(V =\) constant, \(Q = 500\) J added.
- *Find:* \(\Delta U\) and \(W\).

Pehle \(dV = 0\) dekha toh \(W = \int P\,dV = 0\).  
Phir first law lagaya: \(\Delta U = Q - W = 500 - 0\).  
*Why:* Volume fixed hone se work zero ho gaya, saari energy internal mein gayi.

**Final answer**  
\(\Delta U = 500\) J

*Reflection:* Yeh simple case sign convention clear karta hai jab \(W = 0\).

**Example 2 — Isobaric expansion**
- *Given:* Monatomic gas, \(P = 1\) atm, \(V\) from 2 L to 3 L, \(Q = 800\) J.
- *Find:* \(\Delta U\).

Work calculate kiya: \(W = P\Delta V = 1 \times 10^5 \times 0.001 = 100\) J.  
First law: \(\Delta U = 800 - 100 = 700\) J.  
*Why:* Pressure constant raha isliye work direct \(P\Delta V\) se nikala.

**Final answer**  
\(\Delta U = 700\) J

*Reflection:* Real engines mein yeh step bar-bar aata hai.

**Example 3 — Adiabatic process**
- *Given:* \(Q = 0\), \(\Delta U = -300\) J.
- *Find:* \(W\).

Direct equation: \(0 - W = -300\) \(\implies W = 300\) J.  
*Why:* Adiabatic mein heat zero, isliye work internal energy se aata hai.

**Final answer**  
\(W = 300\) J (by system)

*Reflection:* Sign convention yahan critical hai warna direction ulat ho jaati.

**Example 4 — Full cycle**
- *Given:* Cycle with \(Q_\text{in} = 2000\) J, \(Q_\text{out} = 1200\) J.
- *Find:* Net work.

Net heat \(Q_\text{net} = 800\) J. Cycle mein \(\Delta U = 0\), isliye \(W = Q_\text{net}\).  
*Why:* State function property use ki.

**Final answer**  
\(W = 800\) J

*Reflection:* Efficiency calculations yahin se shuru hote hain.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                        | How to avoid it                              |
|-----------------------------|---------------------------------------|----------------------------------------------|
| Using chemistry sign convention | Different textbooks mixed padhe       | Always check preface mein convention         |
| Treating \(dQ, dW\) as exact | Differentials ki definition bhoolna   | Remember \(\oint \delta Q \neq 0\)           |
| Forgetting \(\Delta U = 0\) in cycle | State function nature samajh na aana  | Cycle start aur end point same hai ya nahi check karo |
| Sign of work flip karna     | “By system” vs “on system” confuse    | Explicitly likho “work done by system = +”   |
| Assuming \(U\) depends on path | Energy conservation galat apply karna | Sirf initial-final states dekho             |
| Units mismatch (J vs cal)   | Conversion factor bhoolna             | Har calculation mein J mein convert karo     |

## 7. The textbook-precise statement
For a closed system with only PV work, the first law is expressed as  
\[dU = \delta Q - \delta W,\]  
where \(dU\) is the exact differential of the internal energy (a state function), \(\delta Q\) is the inexact heat transfer to the system, and \(\delta W = P\,dV\) is the inexact work done by the system. The equation holds under the assumption of quasi-static processes and no other forms of work. (See Fermi, *Thermodynamics*, 1956, §2.1.)

## 8. Visual — diagram or schematic
```text
System boundary
+-------------------+
|       U           |   <-- Internal energy (state function)
|   +dQ -->   -dW -->|   <-- Heat in (+), Work out (+)
|                   |
+-------------------+
        |P dV|
```
Arrow directions show positive conventions clearly.

## 9. The memory technique
**The hook** — Imagine a bank account \(U\): deposits are heat \(+dQ\), withdrawals are work you do \(-dW\).

**What to overlearn** — \(dU = dQ - dW\), \(\Delta U = 0\) for any cycle, and work sign: by system positive.

**Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days with one numerical cycle problem each time.

**First-principles fallback** — Energy cannot be created or destroyed; only transferred as heat or work. Write the balance and fix signs by asking “who did the work?”

## 10. What this unlocks
Yeh law aapko directly second law, heat engines, and entropy calculations tak le jaata hai.

- Carnot cycle efficiency derivation
- Enthalpy and Gibbs free energy definitions
- Rocket nozzle performance equations
- Joule-Thomson expansion analysis

## 11. Self-check — five questions, no answers
1. Ek monatomic ideal gas ko isochoric process mein 300 J heat diya gaya. \(\Delta U\) aur \(W\) kya hoga?
2. Kyun ek closed cycle mein net work heat input ke barabar hota hai?
3. Agar aap chemistry wala sign convention use karo toh equation kaise badlegi?
4. Adiabatic free expansion mein \(\Delta U = 0\) kyun hota hai jab temperature change ho sakta hai?
5. Real gas ke liye first law mein kya extra term add hoga jab intermolecular forces kaam kar rahe hon?