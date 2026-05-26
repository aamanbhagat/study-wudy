## 1. The one-sentence answer
**Torque equals the time derivative of angular momentum: \(\tau = \frac{dL}{dt}\).**

Yeh relation rotational dynamics ka fundamental equation hai. Linear case mein force momentum ka rate of change hota hai, isi tarah rotational motion mein torque angular momentum ka rate of change define karta hai. Agar torque zero hai to angular momentum constant rehta hai, jo conservation of angular momentum ka seedha consequence hai.

Is equation ko samajhne ke liye aapko vectors aur derivatives dono ki zaroorat padti hai kyunki \(L\) ek vector hai aur uska direction bhi change ho sakta hai.

> [!NOTE]
> Sabse bada aha moment yeh hai ki torque sirf magnitude nahi badalta balki angular momentum ke direction ko bhi ghuma sakta hai — isi wajah se gyroscopic precession aur satellite attitude control possible hote hain.

## 2. Why this matters — concrete and current
SpaceX Starlink satellites mein reaction wheels aur control moment gyros \(\tau = dL/dt\) ka direct use karte hain taaki satellite ko bina propellant waste kiye orientation badla ja sake. Jab wheel ka angular momentum badla jaata hai, uska reaction torque satellite body ko ghumata hai.

ISRO ke Chandrayaan-3 lander ne descent phase mein torque control algorithms use kiye the jo angular momentum derivative ko track karte the taaki thrust vector stable rahe jab lunar gravity torque apply kar raha tha.

In particle physics, LHC ke dipole magnets mein beam particles par magnetic torque unke angular momentum vector ko twist karta hai; \(\tau = dL/dt\) se hi spin precession frequency calculate hoti hai jo beam stability ke liye critical hai.

Figure skating spins aur divers ke twists mein athletes apne moment of inertia ko change karke torque-free angular momentum ko control karte hain — yeh exactly isi equation ka real-world demonstration hai.

Quantum computing mein superconducting qubits ke rotational states ko microwave pulses se torque jaise effective fields se manipulate kiya jaata hai, jahaan \(dL/dt\) ka classical analog gate operations design karne mein use hota hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Linear momentum \(p = mv\) | Torque is rotational analog of force; \(L\) is rotational analog of \(p\) |
| Vector cross product | Both torque and angular momentum defined via \(r \times F\) and \(r \times p\) |
| Time derivative of vectors | Direction change of \(L\) produces torque even if magnitude fixed |
| Rigid body rotation basics | Later steps link \(\tau = I\alpha\) to full \(\tau = dL/dt\) form |

Agar cross product ya vector derivatives weak hain to pehle woh padh lo warna yeh section mushkil lagega.

## 4. Building the idea — from intuition to formalism

### Step 1 — Linear case se rotational case tak jump
Linear mechanics mein \(F = \frac{dp}{dt}\) hota hai. Rotational motion ke liye hum ek similar quantity dhundte hain jo position ke saath multiply ho.  
Example: ek particle jo origin ke around ghum raha hai, uspar lage force ka “rotational push” \(r \times F\) se measure karte hain.  
Formal statement: \(\tau = r \times F\).

> [!WARNING]
> Agar aap cross product ko dot product se confuse karoge to torque ka direction galat aa jaayega aur saare baad ke calculations ulta padenge.

### Step 2 — Angular momentum define karna
Angular momentum \(L\) ko linear momentum ka rotational counterpart banate hain.  
Example: same particle ke liye \(L = r \times p = m(r \times v)\).  
Formal statement: \(L = r \times p\).

### Step 3 — Time derivative lena
Ab \(L\) ka time derivative lo.  
Example: constant mass ke liye \(\frac{dL}{dt} = \frac{dr}{dt} \times p + r \times \frac{dp}{dt}\). Pehla term zero ho jaata hai kyunki \(v \times mv = 0\).  
Formal statement: \(\frac{dL}{dt} = r \times F = \tau\).

### Step 4 — General vector form
Direction change bhi include karo.  
Example: jab \(L\) vector sirf ghum raha ho bina magnitude badle, tab bhi \(\tau\) non-zero hota hai.  
Formal statement: \(\tau = \frac{dL}{dt}\) (full vector equation, body ya space frame mein).

### Step 5 — Rigid body extension
Rigid body ke liye \(L = I\omega\).  
Example: jab \(I\) constant ho to \(\tau = I\frac{d\omega}{dt}\). Lekin jab body rotate kar raha ho to \(I\) tensor hota hai aur extra terms aate hain.  
Formal statement: \(\tau = \frac{d}{dt}(I\omega)\) (inertial frame).

## 5. Worked examples — har step show karo

**Example 1 — Simple point mass**  
*Given:* Ek 2 kg particle origin se 3 m door hai, velocity 4 m/s tangential, force 5 N radial.  
*Find:* Torque aur \(dL/dt\).  
Step 1: \(r = 3\hat{i}\), \(v = 4\hat{j}\), \(p = mv = 8\hat{j}\).  
Step 2: \(L = r \times p = 0\) (radial force, tangential velocity).  
Step 3: Force radial hone se torque zero.  
**Final answer**  
\(\tau = 0\), \(dL/dt = 0\).  
*Reflection:* Yeh case torque-free motion dikhata hai; radial force angular momentum nahi badalta.

**Example 2 — Tangential force**  
*Given:* Upar wali particle par ab 5 N tangential force.  
*Find:* Torque magnitude.  
Step 1: \(F = 5\hat{j}\).  
Step 2: \(\tau = r \times F = 3 \times 5 \hat{k} = 15\hat{k}\).  
Step 3: \(dL/dt = 15\hat{k}\).  
**Final answer**  
\(\tau = 15\hat{k}\) Nm.  
*Reflection:* Tangential force hi torque deta hai — yeh basic intuition lock karta hai.

**Example 3 — Changing direction**  
*Given:* A spinning wheel with \(L = 10\hat{k}\) kg m²/s, external torque 2 Nm along x-axis for 3 s.  
*Find:* Final \(L\).  
Step 1: \(\Delta L = \tau \Delta t = 2\hat{i} \times 3 = 6\hat{i}\).  
Step 2: Final \(L = 6\hat{i} + 10\hat{k}\).  
**Final answer**  
\(L = 6\hat{i} + 10\hat{k}\).  
*Reflection:* Direction change dikhata hai bina magnitude badle torque ka asar.

**Example 4 — Variable I**  
*Given:* Ice skater spinning at \(\omega = 5\) rad/s, arms out \(I = 3\) kg m², pulls arms in \(I = 1.5\) kg m² (no external torque).  
*Find:* New \(\omega\).  
Step 1: \(\tau = 0\) so \(L\) constant.  
Step 2: \(L = I_1\omega_1 = I_2\omega_2\).  
Step 3: \(\omega_2 = 10\) rad/s.  
**Final answer**  
\(\omega = 10\) rad/s.  
*Reflection:* Torque zero hone par bhi speed badh sakti hai jab I change ho.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| \(\tau = I\alpha\) ko har jagah use karna | Sirf fixed axis ke liye valid           | Check karo ki I constant aur axis fixed hai ya nahi |
| Vector direction ignore karna | Cross product ka direction bhool jaate hain | Right-hand rule har baar draw karo           |
| Frame choice galat karna    | Body frame mein extra \(\omega \times L\) term | Space frame se shuru karo phir body frame shift karo |
| Mass variable maanna        | Rocket jaise cases mein mass change hoti hai | Variable mass systems ke liye alag equation yaad rakho |
| Sign convention mix karna   | Clockwise vs counterclockwise           | Consistent axis direction fix kar lo pehle   |
| Derivative term skip karna  | \(v \times p\) term zero nahi dikh raha | Algebraically pehle term ko zero prove karo  |

## 7. The textbook-precise statement
In an inertial reference frame, the net torque \(\tau\) acting on a system equals the time rate of change of its total angular momentum \(L\):
\[
\tau = \frac{dL}{dt},
\]
where \(\tau = \sum_i (r_i \times F_i)\) and \(L = \sum_i (r_i \times p_i)\). This holds provided the reference point is either fixed in the inertial frame or is the system’s center of mass. (Goldstein, Poole & Safko, *Classical Mechanics*, 3e, §4.2)

## 8. Visual — diagram or schematic
```
          z
          |
          |   L
          |  /
          | /
  origin--O--------> r
         / \
        /   \  F (tangential)
       v     \
```
r vector origin se particle tak, v tangential, F tangential direction mein. L = r × p z-axis ke along. Torque = r × F bhi z-direction mein.

## 9. The memory technique
1. **The hook** — Socho ek “angular momentum river” jo torque ke “wind” se bah raha hai; jahan wind lagta hai wahan river ka direction ya speed badalta hai.
2. **What to overlearn** — \(\tau = r \times F\), \(L = r \times p\), aur \(\tau = dL/dt\) (vector form).
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Cross product se shuru karo, time derivative lo, pehla term zero dikhao, baaki r × F ban jaata hai.

## 10. What this unlocks
Yeh equation rigid body dynamics, rocket attitude control, gyroscopes aur quantum spin systems ki buniyad hai.

- Euler’s rigid body equations
- Precession aur nutation calculations
- Variable-mass rocket torque equations
- Spacecraft reaction-wheel sizing
- Magnetic resonance spin dynamics

## 11. Self-check — five questions, no answers
1. Ek particle par sirf radial force lage to kya \(\frac{dL}{dt}\) zero hoga? Proof ke saath.
2. Jab \(L\) vector ka direction change ho raha ho lekin magnitude constant, torque kis direction mein hoga?
3. Ice skater example mein agar external torque thoda sa lag jaaye to kaise equation badlegi?
4. Body frame mein \(\tau = dL/dt\) likhne par extra term kya aata hai aur kyun?
5. Ek satellite reaction wheel system mein wheel speed badhane se satellite body ka angular momentum kis direction mein badlega?