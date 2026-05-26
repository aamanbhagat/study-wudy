## 1. The one-sentence answer
**Root locus (Evans’ method) is the set of all points in the s-plane that closed-loop poles trace as the loop gain K varies from zero to infinity.**

The method converts an algebraic characteristic equation into a geometric construction problem. Instead of solving the polynomial 1 + K G(s)H(s) = 0 repeatedly for each K, you apply a handful of angle and magnitude rules that let you sketch the entire family of pole trajectories by hand. The sketch immediately reveals stability margins, dominant poles, and the gain values at which the system crosses into instability.

Because the loci are continuous curves that obey the angle condition ∠G(s)H(s) = 180° + 360°ℓ, every point on a sketched branch satisfies the closed-loop equation for some real K ≥ 0. This geometric view turns high-order feedback design into a visual exercise rather than a numerical root-finding chore.

> [!NOTE]
> The single most powerful insight is that the closed-loop poles must always lie on these curves; therefore the designer’s only remaining job is to choose K so the operating point on the locus meets transient-response specifications.

## 2. Why this matters — concrete and current
SpaceX uses root-locus sketches of the Falcon 9 TVC (thrust-vector-control) loop to select autopilot gains that keep bending-mode poles safely left of the imaginary axis during Max-Q; the same diagrams appear in post-flight reviews when propellant slosh frequencies shift.

NASA’s SLS flight-control team applies Evans’ rules to the thrust-oscillation compensator; the locus reveals the precise gain at which the 8 Hz structural mode crosses the jω axis, allowing notch-filter placement before hardware-in-the-loop tests.

Boeing’s 777X fly-by-wire pitch axis is tuned with root-locus plots of the augmented short-period dynamics; the sketches show how elevator rate saturation moves the effective zeros and therefore relocates the break-in point on the real axis.

Modern satellite attitude-control papers (e.g., ESA’s 2022 study on Sentinel-6) employ root-locus analysis of reaction-wheel torque loops to guarantee that flexible solar-array modes remain at least 6 dB below the 0 dB crossing for all wheel-speed operating points.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Open-loop transfer function G(s)H(s) | Supplies the poles and zeros that become the starting and ending points of every locus branch |
| Angle and magnitude conditions of the characteristic equation | The angle condition defines the locus geometry; the magnitude condition gives the required K at any point on it |
| s-plane pole-zero geometry | All sketching rules are statements about angles or distances measured from these points |
| Routh-Hurwitz array | Supplies an independent check that the imaginary-axis crossings found on the locus are indeed stability boundaries |

## 4. Building the idea — from intuition to formalism

### Step 1 — The angle condition
Any point s that could be a closed-loop pole must make the total phase of G(s)H(s) equal to an odd multiple of 180°.  
Consider the simple plant G(s) = 1/(s(s+2)). At the test point s = −1 + j, the vector from the pole at 0 contributes −90° and the vector from −2 contributes −135°; their sum is −225° ≡ 135° (mod 360°), so s is not on the locus.  
Formally:  
$$
\angle G(s)H(s) = (2\ell+1)180^\circ, \quad \ell \in \mathbb{Z}.
$$
> [!WARNING]
> Using 0° instead of 180° produces the complementary root locus for negative K and yields an entirely different set of curves.

### Step 2 — Number and termination of branches
The number of separate locus branches equals the number of finite open-loop poles, n. As K → ∞, m of these branches terminate at the finite zeros; the remaining n−m branches go to infinity along straight-line asymptotes.  
For G(s) = K(s+3)/(s(s+1)(s+2)), n = 3, m = 1, so one branch ends at −3 and two branches depart to infinity.  
$$
\text{Number of branches} = n, \quad \text{branches to infinity} = n-m.
$$

### Step 3 — Asymptote angles and centroid
The asymptotes are rays leaving the centroid  
$$
\sigma_a = \frac{\sum p_i - \sum z_i}{n-m}
$$  
at angles  
$$
\phi_a = \frac{(2q+1)180^\circ}{n-m}, \quad q=0,1,\dots,n-m-1.
$$  
In the preceding example the centroid is (−3 + 3)/2 = 0 and the angles are ±60°.  
> [!WARNING]
> Forgetting to subtract the zero locations when computing σ_a shifts every asymptote by a constant offset and misplaces all high-gain behavior.

### Step 4 — Real-axis segments
A test point on the real axis lies on the locus if and only if the total number of real poles and zeros to its right is odd.  
This follows directly from the angle condition: each real-axis vector contributes 0° or 180°.  
> [!WARNING]
> Complex poles and zeros always appear in conjugate pairs and therefore cancel each other’s angle contribution on the real axis; they must be ignored when counting.

### Step 5 — Breakaway and break-in points
Points where multiple branches meet or leave the real axis satisfy dK/ds = 0. Substituting K = −1/G(s)H(s) and differentiating yields a polynomial whose real roots are candidate break points; only those that also satisfy the angle condition are retained.  
The final textbook statement is therefore: the root locus is the continuous curve in the s-plane obeying the angle condition for K ≥ 0, constructed by the five rules above together with the magnitude relation K = 1/|G(s)H(s)| that labels each point with its corresponding gain.

## 5. Worked examples — every step shown

**Example 1 — First-order plant**  
*Given:* G(s) = K/s, unity feedback.  
*Find:* root locus.  
K = −s ⇒ s = −K. The single branch starts at s = 0 (K = 0) and travels left along the real axis to −∞.  
**Final answer:** the entire negative real axis.  
*Reflection:* The angle condition is satisfied everywhere on the negative real axis because the single vector always contributes exactly 180°.

**Example 2 — Second-order plant with zero**  
*Given:* G(s) = K(s+2)/(s(s+4)).  
*Find:* sketch the locus.  
Poles at 0, −4; zero at −2. Real-axis segment lies between −2 and −4 (odd count to the right). Asymptote (n−m = 1) is 180°. Breakaway calculation: K = −s(s+4)/(s+2), dK/ds = 0 gives s = −2 ± √2. Only s = −0.586 satisfies the angle condition.  
**Final answer:** branch leaves 0, meets real axis at −0.586, travels to zero at −2; second branch leaves −4 and goes to −∞.  
*Reflection:* The zero “pulls” one branch away from the pole at −4, illustrating finite-zero termination.

**Example 3 — Third-order system**  
*Given:* G(s) = K/(s(s+1)(s+2)).  
*Find:* asymptotes and imaginary-axis crossing.  
Centroid σ_a = −1, angles ±60°, 180°. Routh array on 1 + K G(s) = 0 shows row of zeros when K = 6; auxiliary polynomial s² + 2 = 0 ⇒ ±j√2.  
**Final answer:** branches cross imaginary axis at ±j√2 when K = 6.  
*Reflection:* Asymptote angles alone do not give the crossing gain; Routh supplies the missing magnitude information.

**Example 4 — System with complex poles**  
*Given:* G(s) = K/((s+1)(s² + 2s + 2)).  
*Find:* departure angle from the complex poles.  
The complex poles lie at −1 ± j. The departure angle from −1 + j is 180° minus the angles contributed by the other pole and the conjugate pair. Calculation yields ±108.4°.  
**Final answer:** departure angles ±108.4° from the complex poles.  
*Reflection:* Complex poles require explicit angle arithmetic; the conjugate symmetry guarantees the locus is symmetric about the real axis.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Counting real-axis poles only | Students forget that real zeros also contribute 180° phase | Always tally every real singularity to the right of the test point |
| Using (2q)180°/(n−m) for asymptotes | Confusing positive-feedback locus with negative-feedback | Use odd multiples (2q+1) for standard negative feedback |
| Placing break points without angle check | Solving dK/ds = 0 yields extraneous roots | Verify each candidate satisfies ∠G(s)H(s) = 180° |
| Ignoring centroid shift by zeros | Treating numerator as pure gain | Subtract every finite zero location in the centroid formula |
| Forgetting that K must be positive | Allowing branches that require negative gain | After sketching, evaluate K = 1/|G(s)H(s)| and discard segments where K < 0 |
| Missing departure-angle sign error | Mixing the 180° reference direction | Draw vectors from every other singularity and measure counterclockwise from positive real axis |
| Assuming all branches reach infinity | Systems with n = m | When n = m there are no asymptotes; all branches end at finite zeros |

## 7. The textbook-precise statement
Let G(s)H(s) = N(s)/D(s) be a proper rational function with n poles and m zeros, none on the imaginary axis. The root locus is the set  
$$
\mathcal{L} = \{ s \in \mathbb{C} : \angle G(s)H(s) = (2\ell+1)180^\circ, \, K = 1/|G(s)H(s)| \ge 0 \}.
$$  
The construction rules (number of branches, asymptotes, real-axis segments, break points, departure/arrival angles) follow directly from the argument principle applied to 1 + KG(s)H(s). Reference: Ogata, *Modern Control Engineering*, 5e, §7-3.

## 8. Visual — diagram or schematic
```text
Im
 ^
 |           * (pole)
 |          / \
 |         /   \   (asymptotes ±60°)
 |        /     \
 |  -----/-------\-------> Re
 |      /         \
 |     *           *   (real-axis segment)
 |   (breakaway)   (zero)
 |
```
Labelled elements: poles marked ×, zero marked ○, centroid at σ_a, arrows indicating increasing K.

## 9. The memory technique
1. **The hook** — Picture the open-loop poles as “magnets” repelling the loci while zeros act as “sinks” that attract branches; K is the strength of the repulsion.  
2. **What to overlearn** — (i) angle condition ∠G(s)H(s) = 180°(2ℓ+1), (ii) centroid formula, (iii) real-axis odd-count rule.  
3. **Spaced-repetition schedule** — Review the five sketching rules at 1 day, 3 days, 7 days, 16 days, 35 days after first study.  
4. **First-principles fallback** — Start from 1 + KG(s)H(s) = 0, take the argument of both sides, and recover the angle condition; all geometric rules are corollaries.

## 10. What this unlocks
Mastery of root-locus sketching lets you design lead-lag compensators by placing zeros and poles so that the desired dominant closed-loop poles lie on the compensated locus.  

- Next: frequency-domain Nyquist and Bode design that supplies the same gain and phase margins visible on the locus.  
- Next: state-space pole placement and LQR, which can be interpreted as moving the same loci with full-state feedback.  
- Next: gain scheduling for nonlinear rocket dynamics, where each operating point has its own local root locus.

## 11. Self-check — five questions, no answers
1. For G(s) = K(s+4)/(s(s+1)(s+3)(s+6)), how many branches approach infinity and at what angles?  
2. A test point s = −2 + j3 is proposed for the system G(s) = K/(s(s+1)(s+2)). Compute the angle deficiency and state whether it lies on the locus.  
3. Derive the breakaway-point polynomial for G(s) = K/(s(s+4)) and verify which real root satisfies the angle condition.  
4. Explain why the real-axis locus segment between a pole at −1 and a zero at −3 is traversed from right to left as K increases.  
5. Using only the angle condition, show that the departure angle from a complex pole at −a + jb must be the negative of the departure angle from its conjugate.