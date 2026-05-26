## 1. The one-sentence answer

**Riemann sums approximate the net signed area under a continuous function by partitioning its domain into thin rectangles and summing their signed areas; the definite integral is defined as the limit of these sums when the partition norm tends to zero.**

Aap already know that antiderivatives give indefinite integrals. Here the focus shifts to a precise, limit-based definition of the definite integral itself. Left, right, and midpoint Riemann sums are three concrete choices for picking the height of each rectangle; each choice produces a different sequence of approximations that all converge to the same number when the mesh of the partition shrinks to zero.

The key insight is that the integral does not presuppose an antiderivative; it is constructed directly from the function values via a limiting process that works even when no elementary antiderivative exists.

> [!NOTE]
> The “aha” moment is realising that area is not assumed geometrically; it is manufactured as the limit of algebraic sums, turning a geometric intuition into a rigorous number that later theorems can manipulate.

## 2. Why this matters — concrete and current

In aerospace trajectory optimisation, SpaceX’s guidance algorithms evaluate integrals of thrust and drag profiles over time by replacing the continuous integral with high-resolution midpoint Riemann sums inside the onboard flight computer; the same sums appear in the open-source trajectory library `poliastro`.

Semiconductor process engineers at TSMC integrate dopant concentration functions over wafer depth to predict threshold voltages; they discretise the integral with adaptive left and right Riemann sums whose error bounds feed directly into the process-control software.

In reinforcement-learning theory, the policy-gradient theorem expresses expected return as an integral over state-action trajectories; modern analyses (e.g., papers from DeepMind, 2022) replace the integral by midpoint Riemann sums on a fine time grid to obtain unbiased gradient estimators that remain stable under function approximation.

Climate models at the European Centre for Medium-Range Weather Forecasts integrate radiative-transfer equations vertically through each atmospheric column; the operational code uses left-endpoint Riemann sums on pressure levels because the resulting telescoping property simplifies mass-conservation checks.

Gravitational-wave data-analysis pipelines (LIGO/Virgo) compute matched-filter integrals between detector strain and template waveforms; these are evaluated as midpoint Riemann sums on frequency grids whose spacing is chosen so that the Riemann-sum error lies below the detector noise floor.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Limit of a sequence      | The definite integral is literally a limit of Riemann sums; without limits the definition collapses. |
| Partition of an interval | You must be able to divide [a,b] into subintervals whose lengths can be made arbitrarily small. |
| Continuous function on a closed interval | Guarantees that upper and lower sums converge to the same value, so the integral exists. |
| Supremum and infimum     | Used to define upper and lower Darboux sums that bracket every Riemann sum.          |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Partition the interval
Aap start with a closed interval [a,b] and cut it into n subintervals by choosing points a = x₀ < x₁ < … < xₙ = b. The length of the i-th subinterval is Δxᵢ = xᵢ – xᵢ₋₁.  
Example: [0,1] divided at 0, 0.3, 0.7, 1 gives three subintervals.  
Formal statement: A **partition** P of [a,b] is any finite increasing sequence of points from a to b.  
> [!WARNING] If the points are not strictly increasing, some Δxᵢ = 0 and the later limit argument breaks.

### Step 2 — Choose a sample point in each subinterval
For each subinterval [xᵢ₋₁, xᵢ] pick a point ξᵢ (left endpoint, right endpoint, or midpoint).  
Example: left endpoints give ξ₁ = 0, ξ₂ = 0.3, ξ₃ = 0.7 on the partition above.  
Formal: The set {ξᵢ} is called a **choice of tags** for P.

### Step 3 — Form the Riemann sum
Multiply each function value f(ξᵢ) by the width Δxᵢ and add:  
$$S(P,f,\xi)=\sum_{i=1}^n f(\xi_i)\Delta x_i.$$  
Example: f(x)=x² on [0,1] with the three-point partition and left tags yields S=0·0.3+0.09·0.4+0.49·0.3=0.183.

### Step 4 — Introduce the norm of the partition
Define ||P|| = max Δxᵢ. The norm measures how fine the partition is.  
Formal: ||P|| → 0 means every subinterval length → 0.

### Step 5 — Take the limit
The definite integral exists when, for every sequence of partitions whose norms → 0 and every choice of tags, the Riemann sums converge to the same number L:  
$$\int_a^b f(x)\,dx = \lim_{\|P\|\to0} S(P,f,\xi) = L.$$  
This L is the **definite integral** of f from a to b.

### Step 6 — Specialise to left, right, midpoint sums
Left Riemann sum uses ξᵢ = xᵢ₋₁; right uses ξᵢ = xᵢ; midpoint uses ξᵢ = (xᵢ₋₁ + xᵢ)/2. When f is continuous on [a,b], all three limits equal the integral.

### Step 7 — Connect to Darboux formulation (optional but rigorous)
Upper sum U(P,f) = Σ Mᵢ Δxᵢ and lower sum L(P,f) = Σ mᵢ Δxᵢ bracket every Riemann sum; their common limit is again the integral.

## 5. Worked examples — har step show karo

**Example 1 — Left Riemann sum on a linear function**  
*Given:* f(x)=3x+1 on [0,2], partition P with n=4 equal parts.  
*Find:* Left Riemann sum.  
Δx=0.5; points 0,0.5,1,1.5,2. Left tags: 0,0.5,1,1.5.  
Sum = 1·0.5 + 2.5·0.5 + 4·0.5 + 5.5·0.5 = 6.5.  
*Why* each multiplication occurs: width times height at left edge.  
**6.5**  
*Reflection:* Linear functions give exact integral with any single rectangle; the error appears only when curvature is present.

**Example 2 — Right Riemann sum**  
*Given:* Same f and P.  
Right tags: 0.5,1,1.5,2. Sum = 2.5·0.5 + 4·0.5 + 5.5·0.5 + 7·0.5 = 9.5.  
*Why* the tags shifted right: each height is now evaluated at the right endpoint.  
**9.5**  
*Reflection:* The overestimate and underestimate straddle the true integral 8; their average already equals the exact value.

**Example 3 — Midpoint rule with unequal partition**  
*Given:* f(x)=x² on [0,3], P={0,1,3}.  
*Find:* Midpoint Riemann sum.  
Subintervals [0,1] (Δx=1, mid=0.5), [1,3] (Δx=2, mid=2).  
Sum = (0.5)²·1 + (2)²·2 = 0.25 + 8 = 8.25.  
*Why* midpoints chosen: they reduce error for quadratic functions.  
**8.25**  
*Reflection:* Even with unequal widths the definition still applies; only the norm must go to zero for convergence.

**Example 4 — Limit definition yielding exact integral**  
*Given:* f(x)=x on [0,1], regular partition with n subintervals.  
*Find:* Limit of right Riemann sums as n→∞.  
Δx=1/n, right tags k/n, k=1…n.  
Sum = Σ_{k=1}^n (k/n)(1/n) = (1/n²) Σ k = (1/n²)·n(n+1)/2 → 1/2.  
*Why* the algebraic identity Σ k = n(n+1)/2 is used: it converts the sum into a closed form whose limit is immediate.  
**1/2**  
*Reflection:* The calculation recovers the known antiderivative result without ever invoking the Fundamental Theorem, illustrating the power of the definition.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting that Δxᵢ may be unequal | Students default to equal spacing                   | Always write Δxᵢ = xᵢ – xᵢ₋₁ before summing          |
| Using left/right sums on discontinuous functions | Limit may not exist or may depend on tags         | Check continuity on [a,b] first                      |
| Confusing norm ||P|| with 1/n     | Notation hides that some intervals can stay large   | Compute max Δxᵢ explicitly                           |
| Treating Riemann sum as area when f changes sign | Negative rectangles are subtracted                  | Keep signed heights; area requires |f| later           |
| Skipping the limit and calling any sum “the integral” | Premature identification                         | Write “limit as ||P||→0” every time                 |
| Choosing tags outside [xᵢ₋₁,xᵢ]   | Accidental extrapolation                            | Verify ξᵢ ∈ [xᵢ₋₁,xᵢ] before evaluating f            |
| Arithmetic slip in Σ k or Σ k²    | Formula memorised incorrectly                       | Re-derive Σ k = n(n+1)/2 from induction once        |

## 7. The textbook-precise statement

Let f be continuous on the closed bounded interval [a,b]. A **partition** P of [a,b] is a finite set of points a = x₀ < x₁ < ⋯ < xₙ = b. For each subinterval [xᵢ₋₁,xᵢ] let Δxᵢ = xᵢ – xᵢ₋₁ and choose any ξᵢ ∈ [xᵢ₋₁,xᵢ]. The corresponding **Riemann sum** is  
$$S(P,f,\xi)=\sum_{i=1}^n f(\xi_i)\Delta x_i.$$  
The **norm** of P is ||P|| = max Δxᵢ. We say that the **definite integral** of f from a to b equals L if  
$$\lim_{\|P\|\to0}S(P,f,\xi)=L$$  
for every sequence of partitions whose norms tend to zero and every admissible choice of tags. This number is denoted ∫_a^b f(x) dx. (Stewart, *Calculus*, 9e, §5.2, Definition of the Definite Integral.)

## 8. Visual — diagram or schematic

```text
x-axis:  a ─── x0 ─── x1 ─── x2 ─── … ─── xn = b
         |Δx1|   |Δx2|   |Δx3|
Heights:  f(ξ1)   f(ξ2)   f(ξ3)   …   rectangles drawn above/below axis
```
Left tag: ξᵢ at left edge of each rectangle; right tag at right edge; midpoint at centre. When rectangles become narrower the jagged staircase approaches the smooth curve.

## 9. The memory technique

1. **The hook** — Picture a staircase whose steps shrink until they disappear into the curve; each step’s area is f(ξᵢ)Δxᵢ and the vanishing height difference is the limit.
2. **What to overlearn** — The definition  
   $$\int_a^b f=\lim_{\|P\|\to0}\sum f(\xi_i)\Delta x_i$$  
   and the three canonical choices (left, right, midpoint).
3. **Spaced-repetition schedule** — Review the definition after 1 day, 3 days, 7 days, 16 days, 35 days; each time recompute one fresh Riemann sum from scratch.
4. **First-principles fallback** — If the formula is lost, restart from “partition → tag → product → sum → norm → limit”.

## 10. What this unlocks

Mastery of Riemann sums lets you define arc length, volumes of revolution, work, probability densities, and line integrals without circular reasoning. It is also the gateway to the Fundamental Theorem of Calculus, improper integrals, and numerical quadrature rules used in scientific computing.

- Next immediate topics: Fundamental Theorem of Calculus (Parts I & II)
- Later topics: substitution rule, integration by parts, numerical methods (trapezoidal, Simpson)
- Advanced extensions: Riemann–Stieltjes integrals, Lebesgue theory

## 11. Self-check — five questions, no answers

1. Compute the left, right, and midpoint Riemann sums for f(x)=x³ on [0,2] using n=4 equal subintervals; which is closest to the true integral?
2. Give an example of a function and a sequence of partitions where the Riemann sums converge to two different limits depending on tag choice.
3. Prove that if f is continuous on [a,b] then the left-endpoint Riemann sums converge to the same limit as the right-endpoint sums.
4. A partition has points 0, 0.1, 0.3, 1. What is its norm? If you add the point 0.05, does the norm necessarily decrease?
5. Suppose ||Pₙ||→0 but one particular subinterval length stays fixed at 0.2 for all n; can the Riemann sums still converge to the integral? Explain.