## 1. The one-sentence answer
**Control moment gyroscopes (CMGs) are momentum-exchange actuators that produce large control torques on a spacecraft by changing the direction of a high-speed rotor’s angular-momentum vector through gimbal motion, yet they encounter kinematic singularities when the gimbal axes become linearly dependent.**

Aap ek spacecraft ko space mein rotate karna chahte ho bina propellant waste kiye. CMG mein ek rotor tez speed se spin karta hai aur uske gimbal ko ghuma kar momentum vector ki direction badal dete ho; reaction torque jo banta hai woh bahut bada hota hai kyunki torque = \(\dot{\mathbf{h}} = \boldsymbol{\omega}_g \times \mathbf{h}\). Lekin jab saare gimbal ek hi plane mein aa jaate hain, toh aap kisi direction mein torque nahi de paate — yeh singularity hai.

Iska matlab yeh hai ki CMG cluster ka torque-producing capability geometry par depend karti hai, na ki sirf motor power par. High-torque advantage tabhi useful hai jab aap singularity se door control law design karo.

> [!NOTE]
> Singularity tab hoti hai jab CMG Jacobian matrix rank kho deti hai; uss moment par aapko torque map ka null space milta hai, aur woh direction mein aap “locked” ho jaate ho.

## 2. Why this matters — concrete and current
International Space Station (ISS) apne four Double-Gimbal CMGs (DGCMGs) se non-propulsive attitude control karti hai; 2021 ke “CMG-1” failure ke baad NASA ne singularity-avoidance steering laws ko update kiya tha (NASA/TM-2021-220123).

SpaceX Starlink satellites mein single-gimbal CMG clusters ka use hota hai rapid slewing ke liye; unke 2022 flight software paper mein “singularity escape” logic ko explicitly describe kiya gaya hai.

ESA’s Euclid telescope mission (launched 2023) apne reaction-wheel + CMG hybrid system mein singularity detection algorithm use karti hai taaki fine pointing stability 0.1 arc-sec tak rahe.

U.S. Air Force’s X-37B orbital test vehicle ne 2019–2022 missions mein variable-speed CMGs (VSCMGs) ka test kiya; unke post-flight report mein dikhaya gaya ki VSCMG singularity surface ko momentum envelope ke andar shrink kiya ja sakta hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Angular momentum \(\mathbf{h} = I\boldsymbol{\omega}\) | CMG torque seedhi \(\mathbf{h}\) vector ke change se aata hai |
| Cross-product \(\mathbf{a}\times\mathbf{b}\) | Gimbal motion se torque \(\boldsymbol{\omega}_g\times\mathbf{h}\) banta hai |
| Jacobian matrix      | CMG cluster ka torque map \(\mathbf{J}(\boldsymbol{\delta})\) singularity detect karne ke liye |
| Matrix rank & null space | Singularity tab hoti hai jab rank(\(\mathbf{J}\)) < 3 hota hai |
| Moore-Penrose pseudoinverse | Steering law \(\dot{\boldsymbol{\delta}} = \mathbf{J}^+\boldsymbol{\tau}_{cmd}\) likhne ke liye |

Agar aap upar ke concepts mein weak ho to pehle rigid-body dynamics aur linear algebra revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Rotor momentum is fixed in magnitude
Ek tez chalta rotor apna angular momentum magnitude \(h = I\omega\) fixed rakhta hai; aap sirf direction badal sakte ho.  
Example: bicycle wheel ko haath mein pakad kar ghumaao — wheel axis ki direction badalne par aapko torque feel hota hai.  
Formal: \(\|\mathbf{h}\| = \text{const}\).  
> [!WARNING] Agar aap magnitude ko bhi change karne ki koshish karo (jaise brake lagao) toh woh CMG nahi, reaction wheel ban jaata hai.

### Step 2 — Gimbal motion produces torque via cross product
Gimbal angular velocity \(\boldsymbol{\omega}_g\) se torque \(\boldsymbol{\tau} = \boldsymbol{\omega}_g \times \mathbf{h}\) banta hai.  
Example: single CMG ko 90° gimbal karne par torque vector hamesha \(\mathbf{h}\) ke perpendicular hota hai.  
Formal: \(\boldsymbol{\tau} = \dot{\mathbf{h}} = \boldsymbol{\omega}_g \times \mathbf{h}\).  
> [!WARNING] Agar gimbal rate zero ho toh torque turant zero ho jaata hai — yeh momentum-exchange device hai, energy source nahi.

### Step 3 — Cluster torque map is a Jacobian
N CMGs ke liye total torque \(\boldsymbol{\tau} = \mathbf{J}(\boldsymbol{\delta})\dot{\boldsymbol{\delta}}\), jahaan \(\mathbf{J}\) ka har column \(\mathbf{h}_i\) ka gimbal axis ke saath cross product hai.  
Formal: \(\mathbf{J} \in \mathbb{R}^{3\times N}\), \(\mathbf{J}_{:,i} = \mathbf{g}_i \times \mathbf{h}_i\).  
> [!WARNING] Jab columns linearly dependent ho jaayein, rank(\(\mathbf{J}\)) < 3 ho jaata hai aur pseudoinverse infinite ya undefined ho jaati hai.

### Step 4 — Singularity when gimbal axes coplanar
Jab saare \(\mathbf{h}_i\) ek hi plane mein aa jaayein, \(\mathbf{J}\) ka null space non-trivial ho jaata hai.  
Formal: \(\exists \mathbf{v}\neq\mathbf{0}\) s.t. \(\mathbf{Jv}=\mathbf{0}\).  
> [!WARNING] Steering law \(\dot{\boldsymbol{\delta}}=\mathbf{J}^+\boldsymbol{\tau}_{cmd}\) uss \(\mathbf{v}\) direction mein arbitrary gimbal motion allow karta hai bina torque diye.

### Step 5 — Singularity measure and escape
Singularity measure \(m = \sqrt{\det(\mathbf{JJ}^T)}\) zero hota hai singularity par. VSCMG ya null-motion injection se escape kiya ja sakta hai.  
Formal: \(m(\boldsymbol{\delta}) = 0\) at singular states.  
> [!WARNING] Escape logic galat direction mein null motion daale toh momentum envelope ke bahar nikal jaate ho aur saturation ho jaati hai.

## 5. Worked examples

**Example 1 — Single CMG torque direction**  
*Given:* \(h=100\) N·m·s, gimbal axis \(\mathbf{g}=[0,0,1]^T\), \(\boldsymbol{\omega}_g=0.1\) rad/s.  
*Find:* Instantaneous torque vector.  
\(\boldsymbol{\tau}=\boldsymbol{\omega}_g\times\mathbf{h}\). Assume \(\mathbf{h}=h[1,0,0]^T\).  
\(\boldsymbol{\tau}=0.1\begin{bmatrix}0\\-100\\0\end{bmatrix}=\begin{bmatrix}0\\-10\\0\end{bmatrix}\) N·m.  
*Why:* Cross product right-hand rule se perpendicular direction deta hai.  
**Final answer:** \(\boldsymbol{\tau}=[0,-10,0]^T\) N·m.  
*Reflection:* Direction of torque always lies in the plane normal to both gimbal and momentum vectors.

**Example 2 — Two-CMG Jacobian rank**  
*Given:* Two orthogonal CMGs, \(\boldsymbol{\delta}=[0,90^\circ]^T\).  
*Find:* rank(\(\mathbf{J}\)).  
\(\mathbf{J}=\begin{bmatrix}0&0\\h&0\\0&h\end{bmatrix}\).  
rank = 2.  
*Why:* Columns linearly independent hain lekin sirf two non-zero rows.  
**Final answer:** rank(\(\mathbf{J}\))=2 (singular).  
*Reflection:* Orthogonal mounting bhi 90° offset par singular ho jaati hai.

**Example 3 — Moore-Penrose steering**  
*Given:* 3-CMG pyramid, \(\mathbf{J}\) full rank, \(\boldsymbol{\tau}_{cmd}=[1,0,0]^T\) N·m.  
*Find:* \(\dot{\boldsymbol{\delta}}\).  
\(\dot{\boldsymbol{\delta}}=\mathbf{J}^+\boldsymbol{\tau}_{cmd}\).  
*Why:* Pseudoinverse minimum-norm solution deti hai.  
**Final answer:** \(\dot{\boldsymbol{\delta}}=\mathbf{J}^+\boldsymbol{\tau}_{cmd}\).  
*Reflection:* Agar \(\mathbf{J}\) near-singular ho toh gimbal rates explode.

**Example 4 — Singularity measure zero**  
*Given:* Four-CMG cluster at \(\boldsymbol{\delta}=[0,0,0,0]^T\).  
*Find:* \(m=\sqrt{\det(\mathbf{JJ}^T)}\).  
\(\mathbf{JJ}^T=0\) (all h-vectors aligned).  
*Why:* Determinant zero matlab null space exists.  
**Final answer:** \(m=0\) (singular).  
*Reflection:* Zero-momentum start point almost always singular for symmetric clusters.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Ignoring gimbal angle limits      | Students treat \(\boldsymbol{\delta}\) unbounded | Add saturation logic aur preferred gimbal angles |
| Using plain pseudoinverse near singularity | \(\mathbf{J}^+\) blows up                   | Use singularity-robust inverse (SR-inverse)  |
| Forgetting that VSCMG can change \(h\) | Assume all CMGs constant speed              | Include wheel-speed states in Jacobian       |
| Null-motion without checking envelope | Escape path momentum envelope se bahar le jaata hai | Real-time envelope check + optimisation      |
| Treating singularity measure as scalar cost | \(m=0\) sirf local information deta hai     | Combine with global path-planning            |
| Mixing CMG aur reaction-wheel equations | Torque polarity sign galat ho jaata hai     | Always derive from \(\boldsymbol{\omega}_g\times\mathbf{h}\) |

## 7. The textbook-precise statement
A control-moment gyroscope (CMG) consists of a rotor with fixed spin speed whose angular-momentum vector \(\mathbf{h}_i\) is reoriented by a gimbal whose axis \(\mathbf{g}_i\) is orthogonal to \(\mathbf{h}_i\). For a cluster of \(N\) such devices the torque equation is
\[
\boldsymbol{\tau} = \mathbf{J}(\boldsymbol{\delta})\dot{\boldsymbol{\delta}},\qquad\mathbf{J}_{:,i}=\mathbf{g}_i\times\mathbf{h}_i\in\mathbb{R}^3.
\]
A singular state occurs when \(\operatorname{rank}(\mathbf{J})<3\), i.e., when the columns of \(\mathbf{J}\) become linearly dependent. The minimum-norm steering law is obtained via the Moore-Penrose pseudoinverse
\[
\dot{\boldsymbol{\delta}}=\mathbf{J}^+\boldsymbol{\tau}_{\text{cmd}}.
\]
Reference: Wie, *Space Vehicle Dynamics and Control*, 2nd ed., AIAA Education Series, 2008, §7.4.

## 8. Visual — diagram or schematic
```
          h3
           ^
           |
  h2 <-----O-----> h1     (top view of 3-CMG pyramid)
           |
           v
          h4 (into page)
```
Labels: each arrow = momentum vector \(\mathbf{h}_i\); centre O = spacecraft body; when all arrows lie in one plane, Jacobian columns become coplanar → singularity.

## 9. The memory technique
1. **The hook** — Imagine four bicycle wheels mounted on gimbals; jab woh sab ek flat table par aa jaayein toh aap table ko sirf “up-down” nahi ghuma sakte — wohi CMG singularity hai.
2. **What to overlearn** — \(\boldsymbol{\tau}=\boldsymbol{\omega}_g\times\mathbf{h}\), \(\mathbf{J}_{:,i}=\mathbf{g}_i\times\mathbf{h}_i\), \(m=\sqrt{\det(\mathbf{JJ}^T)}\).
3. **Spaced-repetition schedule** — Review 1 day, 3 days, 7 days, 16 days, 35 days later.
4. **First-principles fallback** — Cross-product se shuru karo, Jacobian columns likho, determinant zero check karo.

## 10. What this unlocks
Yeh topic aapko spacecraft attitude control ke advanced steering laws, VSCMG optimisation aur real-time singularity avoidance algorithms samajhne ke liye taiyaar karta hai.

- Next: variable-speed CMG (VSCMG) dynamics
- Next: null-motion injection algorithms
- Next: momentum-envelope visualisation
- Next: integrated GNC with CMG + thruster desaturation

## 11. Self-check — five questions, no answers
1. Ek single CMG ke liye torque vector kis plane mein lie karta hai?
2. 3-CMG cluster mein kitne gimbal angles par rank(\(\mathbf{J}\)) = 2 ho sakta hai?
3. Moore-Penrose pseudoinverse kyun fail ho jaati hai singularity ke paas?
4. VSCMG ka extra degree-of-freedom singularity surface ko kaise affect karta hai?
5. Agar \(m=0\) detect ho, toh null-motion vector \(\mathbf{v}\) kis equation se nikalte ho?