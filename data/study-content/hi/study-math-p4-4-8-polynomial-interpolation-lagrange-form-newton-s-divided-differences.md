## 1. The one-sentence answer
**Polynomial interpolation in Lagrange and Newton divided-difference forms constructs a unique polynomial of degree at most n-1 that passes exactly through any n distinct data points.**

Iska matlab yeh hai ki agar aapke paas (x_i, y_i) pairs hain aur aap un sab points se guzarne wala ek smooth polynomial chahte ho, to dono methods yeh polynomial deta hain. Lagrange form seedha formula deta hai jisme har point ka contribution alag-alag product ke through aata hai. Newton form pehle divided differences calculate karta hai aur phir ek cumulative product structure banata hai jo baad mein new points add karne mein efficient hota hai.

Dono forms mathematically equivalent hain lekin computation aur numerical stability mein farq padta hai. Lagrange mein har evaluation ke liye poora product naya se shuru karna padta hai, jabki Newton mein pehle se calculate kiye differences reuse ho jaate hain. Yeh dono university-level numerical methods ka core hain kyunki real data almost hamesha discrete points mein aata hai.

> [!NOTE]
> The single most important insight is that the interpolating polynomial is unique regardless of the form you choose; only the computational path changes.

## 2. Why this matters — concrete and current
In aerospace trajectory design, NASA’s Deep Space Network uses Newton divided-difference interpolation to generate smooth position and velocity profiles from sparse tracking data received from spacecraft; the divided-difference table is updated in real time as new range measurements arrive, allowing onboard guidance computers to evaluate the polynomial without recomputing everything from scratch.

In semiconductor lithography, ASML’s EUV scanners rely on Lagrange interpolation to correct wavefront aberrations across a 26 mm field; the algorithm fits measured Zernike coefficients at 20–30 sensor locations and evaluates the correction polynomial at every exposure slit position within microseconds.

In machine-learning surrogate modelling, Google’s Vizier Bayesian optimisation platform builds local Lagrange interpolants over the acquisition function when the underlying objective is expensive; these cheap polynomial surrogates guide the next hyper-parameter query while preserving exact agreement at previously evaluated points.

In computational fluid dynamics, ANSYS Fluent employs Newton divided-difference tables to reconstruct high-order face fluxes from cell-centred data on unstructured meshes; the same table also supplies the derivatives needed for slope limiters, reducing numerical dissipation near shocks.

In radio astronomy, the Event Horizon Telescope collaboration interpolates visibility data onto a regular uv-grid using Lagrange polynomials before applying the FFT; because the measurement locations are irregular, the divided-difference form allows rapid addition of new telescope baselines without rebuilding the entire interpolant.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Function evaluation      | You must be comfortable substituting numbers into products and sums without arithmetic slips. |
| Finite differences       | Newton form is the continuous analogue of forward differences; you need to recognise the pattern. |
| Uniqueness of polynomials| The fact that n points determine a unique degree-(n-1) polynomial underpins every formula. |
| Big-O notation           | Complexity arguments for evaluating each form rely on counting multiplications.       |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with the geometric picture
Aapke paas n distinct x-values hain aur un par y-values hain. Aap ek aisa curve chahte ho jo in sab points se guzre. Sabse simple curve jo n points ko connect kare woh degree at most n-1 ka polynomial hota hai.

Example: points (0,1), (1,2), (2,4). Teen points ke liye degree ≤2 polynomial chahiye.

Mathematically, we seek P ∈ Π_{n-1} such that P(x_i)=y_i for i=0,…,n-1.

> [!WARNING]
> If two x-values coincide the construction collapses; always verify distinctness of abscissae before writing any formula.

### Step 2 — Write the Lagrange basis polynomials
Har point ke liye ek “basis” polynomial ℓ_j(x) banate hain jo sirf apne x_j par 1 aur baaki sab x_i par 0 deta hai.

ℓ_j(x) = ∏_{i≠j} (x-x_i)/(x_j-x_i).

Example: j=0 ke liye ℓ_0(x) = (x-1)(x-2)/((0-1)(0-2)).

The full interpolant is then P(x) = ∑ y_j ℓ_j(x).

### Step 3 — Observe the direct but expensive formula
Lagrange form already gives an explicit expression, yet every new evaluation recomputes all n products. This is O(n²) work per query.

### Step 4 — Introduce divided differences
Newton form replaces the product structure with a triangular table. The zeroth divided differences are simply f[x_i] = y_i. First-order differences are f[x_i,x_{i+1}] = (y_{i+1}-y_i)/(x_{i+1}-x_i). Higher orders follow recursively.

### Step 5 — Build the Newton basis
Define π_k(x) = ∏_{i=0}^{k-1} (x-x_i). Then P(x) = a_0 + a_1 π_1(x) + … + a_{n-1} π_{n-1}(x) where the coefficients a_k are exactly the divided differences f[x_0,…,x_k].

### Step 6 — Prove equivalence by induction
Both forms satisfy the same n interpolation conditions and both lie in Π_{n-1}; by uniqueness they are identical.

### Step 7 — State the algorithmic complexity
Lagrange evaluation costs Θ(n²) arithmetic operations. Newton evaluation after table construction costs Θ(n) per query; table construction itself is Θ(n²).

### Step 8 — Textbook-grade statement
Let x_0,…,x_{n-1} be distinct and y_i = f(x_i). There exists a unique P ∈ Π_{n-1} such that P(x_i)=y_i. Its Lagrange representation is P(x)=∑_{j=0}^{n-1} y_j ∏_{i≠j} (x-x_i)/(x_j-x_i). Its Newton representation is P(x)=∑_{k=0}^{n-1} f[x_0,…,x_k] ∏_{i=0}^{k-1} (x-x_i), where the divided differences obey the recurrence f[x_0,…,x_k]=(f[x_1,…,x_k]-f[x_0,…,x_{k-1}])/(x_k-x_0).

## 5. Worked examples

**Example 1 — Linear Lagrange interpolation**
*Given:* (0,1), (2,5).  
*Find:* P(1).

ℓ_0(x) = (x-2)/(0-2) = (x-2)/(-2).  
ℓ_1(x) = (x-0)/(2-0) = x/2.  
P(x) = 1·ℓ_0(x) + 5·ℓ_1(x).  
At x=1: P(1) = 1·(1-2)/(-2) + 5·(1)/2 = 0.5 + 2.5 = 3.  
*Why* each line: we substituted the definition of ℓ_j directly.  
**3**

*Reflection:* Linear case already shows the weighted-average flavour; generalisation replaces two terms by n terms.

**Example 2 — Quadratic Newton table**
*Given:* x = 0,1,3; y = 1,3,13.  
*Find:* P(2).

Divided-difference table:  
f[0]=1, f[1]=3, f[3]=13.  
f[0,1]=(3-1)/(1-0)=2.  
f[1,3]=(13-3)/(3-1)=5.  
f[0,1,3]=(5-2)/(3-0)=1.  

Newton form: P(x)=1 + 2x + 1·x(x-1).  
At x=2: 1 + 4 + 2·1 = 7.  
*Why* each line: recurrence fills the table; coefficients sit on the diagonal.  
**7**

*Reflection:* Adding a fourth point only requires one new diagonal entry; Lagrange would need an entirely new product.

**Example 3 — Evaluate existing Newton polynomial at two new points**
*Given:* P(x) already built as 1 + 2x + x(x-1). Evaluate at 4 and at 5.

P(4)=1+8+4·3=21.  
P(5)=1+10+5·4=31.  
*Why:* only two multiplications per point after the constant term.  
**21, 31**

*Reflection:* Demonstrates the O(n) query cost advantage.

**Example 4 — Recover Lagrange from Newton coefficients**
*Given:* Newton coefficients 1,2,1 for points 0,1,3. Expand into monomial basis and compare coefficients with direct Lagrange.

Newton expanded: 1 + 2x + x²-x = x² + x + 1.  
Direct Lagrange yields the same quadratic; coefficients match exactly.  
*Why:* uniqueness guarantees identity.  
**x² + x + 1**

*Reflection:* Shows both routes produce the identical polynomial; choice is purely computational.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using repeated x-values           | Data copied from measurement logs without checking  | Sort and verify x_i are strictly increasing first    |
| Forgetting the denominator sign in ℓ_j | Copying the product without flipping each (x_j-x_i) | Write the product as ∏ (x-x_i) / ∏ (x_j-x_i) separately |
| Computing divided differences in wrong order | Treating the table as a simple forward-difference table | Always use the recursive definition with newest points on the right |
| Evaluating Lagrange at an x_j and getting rounding error instead of exactly y_j | Floating-point cancellation in numerator and denominator | Use Horner-like nested multiplication or switch to Newton form |
| Storing the entire Lagrange polynomial instead of the basis values | Misunderstanding that coefficients are not stored explicitly | Store only the data points; regenerate basis on the fly when needed |
| Ignoring the cost of table construction | Assuming Newton is always faster | Build the table once, then amortise over many queries |
| Extrapolating far outside the convex hull | Polynomial degree grows, oscillations explode       | Restrict evaluation to the smallest interval containing the data |

## 7. The textbook-precise statement
Let x_0 < x_1 < … < x_{n-1} be distinct real numbers and let y_i ∈ ℝ. There exists a unique polynomial P of degree at most n-1 such that P(x_i)=y_i for each i. One representation is the Lagrange form  
P(x) = ∑_{j=0}^{n-1} y_j ℓ_j(x), ℓ_j(x) = ∏_{i≠j} (x-x_i)/(x_j-x_i).  
An equivalent representation is the Newton form  
P(x) = ∑_{k=0}^{n-1} f[x_0,…,x_k] π_k(x), π_k(x) = ∏_{i=0}^{k-1} (x-x_i),  
where the divided differences satisfy f[x_i]=y_i and the recurrence f[x_0,…,x_k] = (f[x_1,…,x_k] - f[x_0,…,x_{k-1}]) / (x_k - x_0). (Burden, Faires & Burden, *Numerical Analysis*, 10e, §3.1–3.3.)

## 8. Visual — diagram or schematic
```
x0   x1        x2
 |    |         |
 y0   y1        y2
  \   |   /
   ℓ0 ℓ1 ℓ2          ← Lagrange basis (each zero at all but one node)
     \ | /
       P(x)          ← final interpolant (unique)
```

The diagram shows three nodes; each ℓ_j touches 1 at its own node and 0 at the others; their y-weighted sum yields P.

## 9. The memory technique
1. **The hook** — Picture a relay race: each runner (point) hands the baton only at its own station; Lagrange is the set of perfectly timed hand-offs, Newton is the cumulative distance chart that lets you add runners later.
2. **What to overlearn** — The recursive definition of divided differences and the O(n) evaluation cost of an already-built Newton polynomial.
3. **Spaced-repetition schedule** — Review the recurrence after 1 day, rebuild a 5-point table after 3 days, compare Lagrange vs Newton timings after 7 days, derive uniqueness from scratch after 16 days, and implement both forms in code after 35 days.
4. **First-principles fallback** — If the formula is forgotten, start from the requirement P(x_i)=y_i, assume a general polynomial of degree ≤n-1, set up the Vandermonde system, and recognise that the solution can be rewritten in product form.

## 10. What this unlocks
Mastery of these two forms lets you move immediately to error formulas, Chebyshev nodes, spline interpolation, and numerical differentiation.

- Error term for interpolation: f(x)-P(x)=f[x_0,…,x_{n-1},x]·π_n(x)
- Piecewise cubic splines (C² continuity)
- Hermite interpolation (value + derivative data)
- Barycentric Lagrange weights for fast evaluation
- Lebesgue constants and Runge phenomenon analysis

## 11. Self-check — five questions, no answers
1. Construct the Lagrange polynomial for the points (–1,0), (0,1), (1,0) and evaluate it at x=0.5.
2. Build the divided-difference table for x=1,2,4,7 with y=3,6,12,24 and write the Newton polynomial.
3. Show algebraically that the Newton form for any three collinear points reduces to a linear polynomial.
4. A student claims that evaluating the Lagrange form at one of the original nodes always returns exactly the given y-value even in floating-point arithmetic; is the claim true?
5. Given an already-computed Newton table of size n=6, how many arithmetic operations are required to evaluate the polynomial at a new abscissa?