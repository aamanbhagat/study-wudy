## 1. The one-sentence answer
**Root locus (Evans’ method) is the set of all points in the s-plane that satisfy the angle condition of the closed-loop characteristic equation as the gain K varies from 0 to ∞.**

Iska matlab yeh hai ki aap ek open-loop transfer function \(G(s)H(s)\) lete ho aur dekhna chahte ho ki closed-loop poles kaise move karenge jab aap proportional gain K badhaate ho. Har point jo 180°(2k+1) ka phase deta hai woh root-locus ka hissa hai. Isse aap quickly predict kar sakte ho stability, damping aur natural frequency bina har K ke liye roots solve kiye.

Aap isko sketch karne ke liye kuch fixed rules use karte ho jaise real-axis segments, asymptotes, centroid, departure angles. Yeh graphical tool especially powerful hai jab system order 3 ya usse zyada ho kyunki algebraic solving mushkil ho jaata hai.

> [!NOTE]
> The single most important “aha” is that the root locus is nothing but the loci where \(\angle G(s)H(s) = 180^\circ(2k+1)\); magnitude condition only tells you the value of K at any point on that locus.

## 2. Why this matters — concrete and current
SpaceX uses root-locus sketches during early GNC design of Falcon 9 TVC loops to place dominant poles for 1.2–1.5 damping ratio before full Monte-Carlo runs. ISRO’s PSLV and GSLV attitude controllers are still tuned with Evans’ rules because the method reveals immediately when a structural-flexibility mode will cross the imaginary axis.

Modern launch-vehicle papers (e.g., “Robust GNC for Ariane 6” 2022) employ root-locus migration plots to verify gain margins against propellant-slosh poles that move with fill fraction. In semiconductor wafer-stage control, ASML applies the same technique to piezo stages whose plant contains multiple resonant pairs; locus rules let engineers see at a glance which notch filter placement pushes closed-loop poles leftward.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Open-loop poles & zeros  | They are the starting and ending points of every branch   |
| Angle and magnitude conditions of 1 + KG(s)H(s) = 0 | Core test that decides whether a test point lies on the locus |
| s-plane regions (LHP, RHP, imaginary axis) | Tell stability and oscillation behaviour directly         |
| Asymptote formulas       | Required to sketch high-gain behaviour for n > m          |

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the closed-loop equation
Aap likhte ho characteristic equation \(1 + KG(s)H(s) = 0\). Iska matlab \(KG(s)H(s) = -1\). Isliye magnitude \(K|G(s)H(s)| = 1\) aur angle \(\angle G(s)H(s) = 180^\circ(2k+1)\).  
Example: \(G(s) = 1/s(s+2)\). Test point s = −1 + j gives angle −180° so it lies on locus.  
Formal: A point s lies on the root locus iff \(\angle G(s)H(s) = (2k+1)180^\circ\).

> [!WARNING]
> Agar aap angle condition ko magnitude se confuse karoge to galat branches draw ho jaayengi.

### Step 2 — Real-axis locus segments
Real axis par sirf woh segments locus hote hain jinke right side mein odd number of poles + zeros hote hain.  
Example: poles at 0, −2, −4 → segment (−2,0) and (−∞,−4) locus hain.  
Formal: Count real poles and zeros to the right of test point; if odd, segment is on locus.

> [!WARNING]
> Even count wale segments ko mat include karna; branch count galat ho jaayega.

### Step 3 — Number of branches and termination
n branches start from open-loop poles (K=0) aur m branches end at open-loop zeros (K→∞); remaining n−m branches infinity ko jaate hain.  
Formal: Number of branches = number of poles of \(G(s)H(s)\).

### Step 4 — Asymptotes for branches going to infinity
Asymptote angles \(\phi_k = \frac{(2k+1)180^\circ}{n-m}\), centroid \(\sigma = \frac{\sum p_i - \sum z_i}{n-m}\).  
Formal: \(\sigma = \frac{\sum \text{finite poles} - \sum \text{finite zeros}}{n-m}\).

> [!WARNING]
> Centroid galat calculate karne se poora high-gain behaviour shift ho jaata hai.

### Step 5 — Breakaway and break-in points
Real-axis par breakaway points dhundne ke liye \(dK/ds = 0\) solve karte ho jahaan K = −1/G(s)H(s).  
Formal: Solve \(\frac{d}{ds}[1/G(s)H(s)] = 0\).

### Step 6 — Angle of departure and arrival
Departure angle from a pole = 180° minus sum of angles from all other poles plus sum from zeros.  
Formal: \(\theta_d = 180^\circ - \sum \angle(p-p_i) + \sum \angle(p-z_j)\).

### Step 7 — Imaginary-axis crossings
Routh-Hurwitz ya substitution s = jω se K aur ω nikaalte ho jahaan locus imaginary axis kaat-ta hai.

### Step 8 — Textbook-grade statement
The root locus is the continuous curve in the complex plane consisting of all s satisfying both the angle and magnitude conditions of the closed-loop characteristic equation for K ∈ [0, ∞).

## 5. Worked examples — har step show karo

**Example 1 — First-order system**  
*Given:* \(G(s) = 1/(s+3)\), H=1.  
*Find:* Root locus.  
Step: n=1, m=0 → one branch from −3 to −∞ along real axis.  
K at s=−5: K=2.  
**Final answer**  
Straight line from −3 to −∞.  

*Reflection:* Trivial case shows starting and ending points clearly.

**Example 2 — Second-order with breakaway**  
*Given:* \(G(s) = 1/[s(s+4)]\).  
*Find:* Locus and breakaway.  
Breakaway at s=−2 (solve dK/ds=0).  
**Final answer**  
Two branches leave −0 and −4, meet at −2, then go vertically ±j2.  

*Reflection:* Real-axis rule plus derivative test combine here.

**Example 3 — System with zero**  
*Given:* \(G(s) = (s+2)/[s(s+1)(s+3)]\).  
Departure from pole at 0 is +60°.  
**Final answer**  
Locus has one finite zero at −2; two branches → ∞ at ±60°.

*Reflection:* Zero pulls locus leftward.

**Example 4 — Imaginary crossing**  
*Given:* \(G(s) = K/[s(s+1)(s+2)]\).  
Routh array gives K=6 at ω=√2.  
**Final answer**  
Branches cross jω axis at ±j√2 when K=6.

*Reflection:* Stability limit directly visible.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| Forgetting (2k+1) multiples | Students remember only 180°             | Always write 180°(2k+1) while testing points |
| Wrong centroid sign         | Sign error in pole-zero subtraction     | Write \(\sigma = (\sum p - \sum z)/(n-m)\)   |
| Missing break-in points     | Only look for breakaway                 | Solve dK/ds=0 on entire real axis            |
| Counting zeros to right     | Confuse pole and zero counting          | Mark P and Z distinctly on diagram           |
| Asymptote angle formula     | Use 360° instead of 180°                | Memorise \(\phi = (2k+1)180/(n-m)\)          |
| K negative locus            | Assume K>0 only                         | Draw 0° locus separately when needed         |

## 7. The textbook-precise statement
The Evans root locus is the set of points s ∈ ℂ such that  
\[1 + K G(s)H(s) = 0, \quad K \ge 0\]  
where \(G(s)H(s)\) is a real rational function with n poles and m zeros (n ≥ m). Equivalently, s lies on the locus if and only if  
\[\angle G(s)H(s) = (2k+1)180^\circ, \quad k \in \mathbb{Z}\]  
and  
\[K = \frac{1}{|G(s)H(s)|}.\]  
(Reference: Ogata, *Modern Control Engineering*, 5e, §7-3.)

## 8. Visual — diagram or schematic
```
          Im
           ^
           |     * (asymptote 60°)
           |    /
   pole *--|-------* breakaway
  at -4    |     \
           |      \
  pole *---+-------* pole at 0
  at -2    |      real axis
           +------------------> Re
```
Branches start at poles, meet at breakaway, then depart at ±90° (for n-m=2).

## 9. The memory technique
1. **The hook** — Imagine poles as magnets shooting “phase arrows”; only the path where total arrow twist is odd multiple of 180° is allowed.  
2. **What to overlearn** — Angle condition \(\angle G H = 180^\circ(2k+1)\), asymptote angles \((2k+1)180/(n-m)\), centroid formula.  
3. **Spaced-repetition schedule** — Review rules after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Return to \(KG(s)H(s) = -1\) and test any point with vector angles.

## 10. What this unlocks
Root-locus mastery lets you move directly to compensator design (lead, lag, PID) and to modern state-space pole placement.  
- Lead compensator zero placement using departure-angle rules  
- Gain and phase margin estimation from crossing points  
- Extension to discrete systems via w-plane or bilinear mapping  
- MIMO root-locus generalizations used in launch-vehicle TVC

## 11. Self-check — five questions, no answers
1. For \(G(s)=K/[s(s+1)(s+5)]\), how many branches go to infinity and at what angles?  
2. A test point s=−1+j3 gives total angle 135° from all poles and zeros; does it lie on the 180° locus?  
3. Calculate the centroid for a system with poles at 0, −1, −2 and a zero at −3.  
4. Where is the breakaway point of \(G(s)=K/[s(s+4)]\)?  
5. If a branch departs a complex pole at +120°, what does that imply for the arrival angle at a nearby zero?