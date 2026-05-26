## 1. The one-sentence answer
**The acceleration of the centre of mass of any system of particles is fixed exclusively by the vector sum of all external forces divided by the total mass.**

Aap sochiye ek group of particles ko jo ek dusre par forces laga rahe hain. Har particle apna individual motion follow karta hai, lekin jab aap un sabke positions ko mass-weighted average karke centre of mass (CM) nikaalte ho, to us CM ka acceleration sirf bahar se aane wali forces par depend karta hai. Internal forces jo particles ek dusre par lagate hain, woh exactly cancel ho jaate hain Newton’s third law ki wajah se, isliye woh CM ko accelerate nahi kar paate.

Iska matlab yeh hai ki aap system ke andar kya ho raha hai usko ignore kar sakte ho jab sirf CM motion dekhna ho. Chahe particles collide kar rahe hon, explode kar rahe hon ya connected springs se judey hon, CM ka path wahi rahega jo ek single point mass M par net F_ext lagaane se banta.

> [!NOTE]
> The deepest “aha” here is that internal forces cannot change the motion of the centre of mass; only forces from outside the system boundary can.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 booster separation ke time pe, dono stages alag-alag trajectories follow karti hain lekin unka combined centre of mass vertical line mein accelerate hota rehta hai sirf gravity aur thrust ke net external component se.

LIGO detector mein two test masses ke darmiyan gravitational wave detection ke liye, scientists exactly is principle ko use karte hain: internal laser forces masses ko move karti hain lekin CM position ko sirf external seismic aur gravity gradients hi affect karte hain.

In high-energy physics at CERN, when protons collide inside ATLAS detector, the transverse momentum of the visible particles ka vector sum zero hona chahiye agar koi invisible particle (jaise neutrino) nahi hai; yeh directly F_ext = 0 wale case se aata hai.

Satellite formation flying missions jaise ESA’s PROBA-3 mein, two spacecrafts ko apne CM ko common orbit par maintain karna padta hai taaki solar corona ko precisely observe kar sakein, bina internal thruster forces ke CM ko disturb kiye.

Natural phenomenon mein, binary star systems jaise Sirius A-B, dono stars apne common CM ke around elliptical orbits mein ghumte hain kyunki unke mutual gravitational forces internal hain aur sirf galactic tidal forces external hain.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Newton’s second law  | F = ma must be applied to every particle before summing   |
| Vector addition      | Forces and momenta are vectors; direction matters         |
| System boundary      | You must clearly define what counts as “external”         |
| Weighted average     | Definition of centre of mass position uses mass weighting |

Agar aapko vector addition ya Newton’s laws abhi tak solid nahi hain, to pehle unko revise kar lo warna yeh derivation slippery ho jaayegi.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with a single particle
Aap ek particle par net force lagaate ho to uska acceleration F/m hota hai. Yeh bilkul basic hai.

Example: 2 kg ki ek ball par 10 N horizontal force → a = 5 m/s² right.

Formal statement:  
$$ \vec{F} = m \vec{a} $$

> [!WARNING]
> Agar aap yahan force ko scalar treat karne ki galti karo to vector direction later steps mein toot jaayegi.

### Step 2 — Write equation for every particle in the system
N particles hain to har i-th particle ke liye  
$$ \vec{F}_i^{\text{net}} = m_i \vec{a}_i $$  
likho. Net force mein dono external aur internal forces shamil hain.

### Step 3 — Sum all individual equations
Poore system ke liye equations add karo:  
$$ \sum_i \vec{F}_i^{\text{net}} = \sum_i m_i \vec{a}_i $$

Left side ab total force ban jaata hai.

### Step 4 — Split forces into external and internal
Har \(\vec{F}_i^{\text{net}} = \vec{F}_i^{\text{ext}} + \sum_{j\neq i} \vec{F}_{ij}\).  
Jab sum karoge to internal pairs \(\vec{F}_{ij} + \vec{F}_{ji}\) Newton’s third law se zero ho jaate hain.

Result:  
$$ \sum \vec{F}^{\text{ext}} = \sum_i m_i \vec{a}_i $$

### Step 5 — Introduce centre-of-mass definition
Centre of mass position  
$$ \vec{R}_{\text{CM}} = \frac{1}{M} \sum_i m_i \vec{r}_i $$  
jahan \(M = \sum m_i\). Iski second time derivative  
$$ M \vec{a}_{\text{CM}} = \sum_i m_i \vec{a}_i $$  
hai.

### Step 6 — Obtain the master equation
Combining Step 4 and Step 5:  
$$ \vec{F}_{\text{ext, net}} = M \vec{a}_{\text{CM}} $$  
ya  
$$ \vec{a}_{\text{CM}} = \frac{\vec{F}_{\text{ext, net}}}{M} $$

Yeh final rigorous result hai.

## 5. Worked examples — har step show karo

**Example 1 — Two blocks colliding on frictionless table**  
*Given:* m₁ = 3 kg, m₂ = 2 kg, dono rest par hain. Ek external 10 N force left block par 4 s tak lagta hai.  
*Find:* a_CM during force application.  

Step: F_ext,net = 10 N (right block par koi external force nahi).  
M = 5 kg.  
a_CM = 10 N / 5 kg = 2 m/s² right.  
*Why:* Internal collision force dono particles par opposite direction mein hai, cancel ho jaati hai.  

**Final answer**  
**2 m/s² to the right**

*Reflection:* Collision ke bawajood CM uniformly accelerate karta raha kyunki sirf external force ne kaam kiya.

**Example 2 — Exploding projectile**  
*Given:* 4 kg projectile apni highest point par explode hota hai into 1.5 kg aur 2.5 kg pieces. Explosion ke internal forces hain.  
*Find:* CM motion just after explosion.  

F_ext,net = weight = 4g downward (air resistance neglect).  
a_CM = g downward, explosion se bilkul unaffected.  

**Final answer**  
**a_CM remains g downward**

*Reflection:* Internal blast sirf relative velocities badalta hai, CM trajectory wahi parabolic rehti hai.

**Example 3 — Variable-mass rocket (foundation case)**  
*Given:* Rocket mass 1000 kg (including fuel), external gravity 9800 N down, thrust 15000 N up.  
*Find:* a_CM.  

F_ext,net = thrust − weight = 5200 N up.  
a_CM = 5200 / 1000 = 5.2 m/s² up.  

**Final answer**  
**5.2 m/s² upward**

*Reflection:* Fuel mass loss ko abhi ignore kiya; yeh sirf external force rule dikhata hai.

**Example 4 — Three-body system with mixed forces**  
*Given:* m₁ = 1 kg, m₂ = 2 kg, m₃ = 3 kg. External forces 6 N, −3 N, 9 N respectively along x. Internal forces between pairs given but not needed.  
*Find:* a_CM.  

F_ext,net = 6 − 3 + 9 = 12 N.  
M = 6 kg.  
a_CM = 12 / 6 = 2 m/s² along +x.  

**Final answer**  
**2 m/s² in positive x-direction**

*Reflection:* Internal forces cancel regardless of their magnitudes, proving the rule’s generality.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Treating internal forces as affecting a_CM | Students forget Newton’s third law pairs    | Always write F_ij + F_ji = 0 explicitly before summing |
| Forgetting that gravity on every particle is external | Think “gravity is internal to Earth+object” | Define system boundary first; Earth’s gravity is external unless Earth is inside system |
| Applying a_CM = F_ext/M to variable-mass systems without care | Rocket equation intuition interferes        | Check whether mass is leaving with velocity; use proper variable-mass form later |
| Confusing velocity of CM with velocity of particles | CM can move even if some particles are at rest | Always compute R_CM first, then differentiate twice |
| Sign errors in vector sum of external forces | Direction of each external force missed     | Draw free-body diagram of entire system as one object |
| Assuming a_CM = 0 when total momentum conserved | Over-generalising conservation cases        | Verify F_ext,net is truly zero before claiming conservation |

## 7. The textbook-precise statement
For a system of N particles with masses m_i and position vectors r_i, define the centre-of-mass position by  
$$ \vec{R}_{\text{CM}} = \frac{1}{M} \sum_{i=1}^N m_i \vec{r}_i, \quad M = \sum_{i=1}^N m_i. $$  
If the only forces acting on the particles are internal forces obeying Newton’s third law (F_ij = −F_ji) and external forces F_i^ext, then  
$$ M \frac{d^2\vec{R}_{\text{CM}}}{dt^2} = \sum_{i=1}^N \vec{F}_i^{\text{ext}}. $$  
Hence the acceleration of the centre of mass is determined solely by the net external force:  
$$ \vec{a}_{\text{CM}} = \frac{\vec{F}_{\text{ext, net}}}{M}. $$  
(Kleppner & Kolenkow, *An Introduction to Mechanics*, 2e, §3.3).

## 8. Visual — diagram or schematic
```text
          F_ext1 →          F_ext2 →
   m1 ●────────● m2
       \      / 
        \    /   ← internal forces cancel
         \  / 
          ● CM
           ↓
       F_ext,net = F_ext1 + F_ext2
```
CM accelerates exactly as though all mass M were concentrated there and only F_ext,net acted.

## 9. The memory technique
1. **The hook** — Imagine the entire system as one giant invisible point mass sitting at the CM; external forces kick this point, internal forces only make particles dance around it.

2. **What to overlearn** —  
   $$ \vec{F}_{\text{ext, net}} = M \vec{a}_{\text{CM}} $$  
   and the statement “internal forces cancel in pairs”.

3. **Spaced-repetition schedule** — Review the master equation after 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback** — Start from ∑F_i = ∑m_i a_i, split external/internal, invoke Newton’s third law, replace right-hand side by M a_CM.

## 10. What this unlocks
Yeh result directly conservation of momentum (jab F_ext,net = 0) aur rocket equation ke variable-mass version ki taraf le jaata hai.

- Next: Conservation of linear momentum in isolated systems  
- Next: Reduced-mass concept in two-body problems  
- Next: Derivation of rocket thrust term −v_rel (dm/dt)  
- Next: CM frame transformations in collision analysis

## 11. Self-check — five questions, no answers
1. Ek 5 kg aur 3 kg ka dumbbell frictionless surface par pada hai. Aap uske ek end par 4 N force lagate ho. CM ka acceleration kitna hoga?

2. Agar saare internal forces zero ho jaayein to kya a_CM change ho jaayegi? Reasoning do.

3. Ek closed system mein F_ext,net = 0 hai. CM velocity kya karegi?

4. Do particles ek dusre ko attract kar rahe hain (internal gravity). Kya unka CM accelerate hoga? Agar haan to kis force se?

5. Ek rocket fuel eject kar raha hai. Kabhi-kabhi log kehte hain “ejected mass par force lag rahi hai”. Yeh argument galat kyun hai jab a_CM nikaalte ho?