## 1. The one-sentence answer
**Magnetic force on a current-carrying conductor** is the net force experienced by a wire carrying electric current when placed inside an external magnetic field, arising because moving charges inside the wire each feel a Lorentz force.

Current ek wire mein flow karta hai toh uske andar electrons drift velocity ke saath move karte hain. Jab yeh wire magnetic field B mein aata hai, har charge par force q(v × B) lagta hai. Saare charges ke forces vectorially add hokar wire ke liye ek macroscopic force deta hai jo wire ko physically dhakel ya khinch sakta hai.

Yeh force sirf tab zero hota hai jab current direction aur B field parallel ya anti-parallel hon; any angle par force magnitude I L B sinθ ke hisaab se badalta hai. Direction hamesha current aur B dono ke perpendicular plane mein hota hai, right-hand rule se nikaala ja sakta hai.

> [!NOTE]
> Sabse bada “aha” yeh hai ki current khud force nahi lagata — current sirf charges ko motion deta hai, aur magnetic field un moving charges par force lagata hai. Wire khud neutral rehta hai, lekin net force tab bhi non-zero hota hai kyunki positive lattice ions force feel nahi karte.

## 2. Why this matters — concrete and current
Tesla Model 3 aur Cybertruck ke permanent-magnet synchronous motors mein stator windings par yahi force torque produce karti hai; har phase current aur rotor magnet field ka cross product directly wheel tak pahunchta hai.

NASA aur ESA ke ion thrusters aur Hall-effect thrusters mein current-carrying coils par lage magnetic forces plasma beam ko focus aur accelerate karte hain; yeh force calculation hi mission delta-v budget ka hissa hota hai.

Railgun prototypes (US Navy EMRG program) 32 MJ kinetic energy achieve karte hain kyunki 5–6 MA current aur 5–10 T pulsed fields ke beech bani force projectile ko 2.5 km/s tak accelerate karti hai.

LIGO aur future LISA mission ke mirror actuators mein voice-coil actuators ka design exactly isi force par based hai; picometre-level displacement control ke liye current aur local B field ko precisely tune kiya jaata hai.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector cross product     | Force direction aur magnitude dono v × B se nikalte hain  |
| Drift velocity           | Current I = n A v_d q ka microscopic origin samajhne ke liye |
| Lorentz force on single charge | Macroscopic force ko charges ke sum ke roop mein derive karne ke liye |
| Right-hand rule          | Direction jaldi nikaalne aur sign errors avoid karne ke liye |

Agar upar ke koi bhi concept weak hain toh pehle unhe revise kar lo; warna derivation mein sign aur direction mistakes ho jaayengi.

## 4. Building the idea — from intuition to formalism

### Step 1 — Single charge feels magnetic force
Ek charge q magnetic field B mein velocity v ke saath move kare toh uspar force sirf tab lagta hai jab v aur B perpendicular hon.  
Example: electron 10^6 m/s se 0.5 T field mein 90° par move kare toh force 8 × 10^{-14} N magnitude ka hota hai.  
Formal:  
$$ \vec{F} = q (\vec{v} \times \vec{B}) $$  
> [!WARNING]
> Agar aap velocity aur field ko scalar treat karoge toh force zero aa jaayega jabki asal mein maximum hota hai.

### Step 2 — Current as collective drifting charges
Wire mein current I = n A v_d q hota hai jahaan n charge density, A cross-section, v_d drift speed. Saare charges ek jaise v_d se move karte hain.  
Example: copper wire mein 1 A current ke liye v_d lagbhag 10^{-4} m/s hota hai.  
Formal:  
$$ I = n A v_d q $$

### Step 3 — Integrate single-charge forces over length
Length L wale wire ke liye total force har charge ke force ka vector sum hai. Charges evenly distributed hain isliye integration simple ho jaati hai.  
Formal:  
$$ \vec{F} = \int q (\vec{v}_d \times \vec{B}) \, dn = I (\vec{L} \times \vec{B}) $$  
> [!WARNING]
> Agar B field wire ke andar vary karta hai toh simple I L × B formula galat ho jaayega; integration zaroori hai.

### Step 4 — Vector form and angle dependence
Final expression mein sinθ term aata hai kyunki cross product ka magnitude v B sinθ hota hai.  
Formal:  
$$ \vec{F} = I \vec{L} \times \vec{B} \quad \Rightarrow \quad F = I L B \sin\theta $$

### Step 5 — Direction via right-hand rule
Ungliyan current ki taraf, haath B ki taraf, palm force ki taraf. Yeh rule cross product ki right-handedness se aata hai.

## 5. Worked examples — har step show karo

**Example 1 — Straight wire perpendicular field**  
*Given:* 2 m long wire, I = 5 A, B = 0.4 T, θ = 90°.  
*Find:* Force magnitude.  
Step 1: Formula yaad karo F = I L B sinθ. *Why* — sab quantities already perpendicular hain.  
Step 2: sin90° = 1. *Why* — maximum force chahiye.  
**4 N**

*Reflection:* Yeh sabse simple case hai; sirf magnitude nikaalna hai.

**Example 2 — Wire at angle**  
*Given:* L = 0.8 m, I = 3 A, B = 0.5 T, θ = 30°.  
*Find:* F.  
Step 1: sin30° = 0.5 likho. *Why* — angle component nikaalna zaroori hai.  
Step 2: F = 3 × 0.8 × 0.5 × 0.5 = 0.6 N. *Why* — scalar multiplication.  
**0.6 N**

*Reflection:* Angle galat lene se factor-of-two error aa jaata hai.

**Example 3 — Force direction**  
*Given:* Current +x direction, B +y direction.  
*Find:* Force direction.  
Step 1: Right-hand rule apply karo. *Why* — cross product z-direction deta hai.  
**Force along +z axis**

*Reflection:* Direction sign important hai motors mein torque polarity ke liye.

**Example 4 — Two parallel wires**  
*Given:* Two 1 m wires, I1 = I2 = 10 A, separation 0.05 m.  
*Find:* Force per unit length.  
Step 1: B due to wire 1 = μ₀ I₁ / 2πd. *Why* — Biot-Savart se aata hai.  
Step 2: F/L = μ₀ I₁ I₂ / 2πd = 4 × 10^{-4} N/m. *Why* — mutual force.  
**4 × 10^{-4} N/m (attractive)**

*Reflection:* Yeh Ampere definition ka base hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using F = I L B without sinθ | Students scalar soch lete hain              | Hamesha θ check karo aur cross product yaad karo |
| Wrong right-hand rule       | Left hand use karna ya fingers confuse hona | Consistent right-hand practice karo          |
| Ignoring that B must be external | Apne hi field ko count kar lete hain        | Clearly “external B” likho problem mein      |
| Forgetting L is vector      | Length ko scalar maante hain                | Direction of current ke along L vector lo    |
| Sign error in 3D            | Coordinate system skip kar dete hain        | i, j, k components alag-alag likho           |
| Non-uniform B               | Formula blindly apply karte hain            | Integration check karo jab B vary kare       |

## 7. The textbook-precise statement
The magnetic force on a straight, steady current-carrying conductor of length vector \(\vec{L}\) placed in a uniform magnetic field \(\vec{B}\) is given by  
$$ \vec{F} = I \vec{L} \times \vec{B}, $$  
where \(I\) is the constant current, provided the conductor is electrically neutral in its rest frame and the magnetic field is uniform over the entire length. (Griffiths, *Introduction to Electrodynamics*, 4e, §5.1.2)

## 8. Visual — diagram or schematic
```
  B (into page) × × × × × × ×
  ───────────────────────────────► I (+x)
                ↑ F (+z)
```
Wire along x-axis, B into page (negative y), force comes out along positive z. Coordinates: wire from (0,0,0) to (L,0,0), B = (0,0,-B).

## 9. The memory technique
1. **The hook** — Imagine wire ko ek “magnetic river” mein rakha hai; current river ke flow jaisa hai aur force river ke kinare dhakel deti hai.
2. **What to overlearn** — F = I L × B vector form aur right-hand rule dono.
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Lorentz force q(v × B) se shuru karo, current I = n A v_d q likho, integrate over length.

## 10. What this unlocks
Yeh force electric motors, loudspeakers, galvanometers aur railguns ki buniyad hai. Aage jaakar aap isko use karke torque on current loops, DC motor back-emf, aur Ampere’s definition of ampere padhoge.

- Magnetic torque on a current loop  
- DC and AC motor equations  
- Force between parallel current-carrying wires  
- Railgun and coil-gun design calculations

## 11. Self-check — five questions, no answers
1. Ek 3 m wire mein 8 A current hai aur B = 0.2 T at 60° angle; force magnitude kya hogi?  
2. Agar current aur B dono double kar diye jaayein toh force kitni baar badhegi?  
3. Right-hand rule se force direction nikaalo jab current north aur B east ho.  
4. Kyun parallel currents attract karte hain — microscopic charges ke hisaab se explain karo.  
5. Agar magnetic field wire ke length ke saath linearly badhe toh simple I L × B formula kyun galat ho jaayega?