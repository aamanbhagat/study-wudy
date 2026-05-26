## 1. The one-sentence answer
**Fubini's theorem states that a double integral of a continuous function over a rectangle equals either of its two possible iterated integrals.**

A double integral ∬_R f(x,y) dA measures the signed volume under the graph of f over a rectangular region R in the plane. When f is continuous on a closed bounded rectangle, the volume can be obtained by first integrating with respect to one variable while holding the other fixed, then integrating the result with respect to the remaining variable. The order of the two single-variable integrations does not matter; both routes produce the identical number.

This equivalence converts an abstract two-dimensional accumulation into a concrete sequence of ordinary integrals that can be evaluated with the fundamental theorem of calculus. The continuity hypothesis guarantees that the inner integrals exist for every fixed value of the outer variable and that the outer integral then exists as well.

> [!NOTE]
> The decisive insight is that the two-dimensional limit of Riemann sums factors into successive one-dimensional limits precisely when f is continuous on the compact rectangle.

## 2. Why this matters — concrete and current
In computational fluid dynamics, NASA’s OVERFLOW solver evaluates double integrals of pressure and velocity fields over rectangular control volumes to compute lift and drag on aircraft wings; Fubini’s theorem permits these integrals to be reduced to nested quadrature routines that run efficiently on GPU clusters.

In machine-learning research, the paper “Variational Inference with Normalizing Flows” (Rezende & Mohamed, 2015) computes expectations of log-densities over rectangular parameter domains; the authors invoke Fubini to interchange the order of integration when deriving the evidence lower bound, enabling stable stochastic gradient estimates.

Semiconductor process simulation packages such as Synopsys Sentaurus use double integrals of dopant concentration over rectangular masks to predict threshold-voltage shifts; switching the order of integration via Fubini reduces the number of expensive Monte-Carlo samples required for each process corner.

In probabilistic robotics, joint posterior densities over position and velocity are integrated over rectangular state-space windows to obtain marginal probabilities for Kalman-filter updates; autonomous-vehicle stacks at Waymo rely on this interchange to keep real-time latency below 10 ms.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Single-variable definite integral | The double integral is reduced to two successive ordinary integrals. |
| Continuity on a closed bounded set | Guarantees that all inner integrals exist and the iterated integrals are equal. |
| Riemann sums in one variable | The definition of the double integral begins with two-dimensional Riemann sums that must factor. |
| Product of intervals     | A rectangle [a,b]×[c,d] is the Cartesian product that permits separation of variables. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Volume as a limit of rectangular boxes
The signed volume under z = f(x,y) over a rectangle is the limit of sums of volumes of thin boxes whose heights are sample values of f.  
For the unit square and f(x,y) = x + y the sum with four equal subsquares already approximates 1.  
$$
V = \lim_{\|P\| \to 0} \sum_{i=1}^m \sum_{j=1}^n f(x_{ij}^*, y_{ij}^*) \Delta x_i \Delta y_j.
$$
> [!WARNING] Treating the two-dimensional mesh norm as two independent one-dimensional norms without ensuring uniform refinement in both directions produces inconsistent limits.

### Step 2 — Fixing one variable produces a slice
Hold x fixed; the inner sum over y becomes an ordinary Riemann sum for the integral of the slice function y ↦ f(x,y).  
On [0,1]×[0,1] with f(x,y) = x y the inner integral with respect to y at fixed x equals x/2.  
$$
\int_c^d f(x,y)\, dy \quad \text{(x held constant)}.
$$

### Step 3 — The outer integral accumulates the slices
Integrate the resulting function of x to obtain the total volume.  
Continuing the example yields ∫_0^1 (x/2) dx = 1/4, matching the known volume.  
$$
\int_a^b \Bigl( \int_c^d f(x,y)\, dy \Bigr) dx.
$$

### Step 4 — Symmetry of the two orders
Repeating the process with the roles of x and y reversed produces an iterated integral that must equal the same volume when f is continuous.  
For the same f the order dy dx also equals 1/4.  
$$
\int_c^d \Bigl( \int_a^b f(x,y)\, dx \Bigr) dy = \int_a^b \Bigl( \int_c^d f(x,y)\, dy \Bigr) dx.
$$

### Step 5 — Statement of Fubini’s theorem for rectangles
When f is continuous on the compact rectangle R = [a,b]×[c,d], both iterated integrals exist and are equal to the double integral.  
$$
\iint_R f(x,y)\, dA = \int_a^b \int_c^d f(x,y)\, dy\, dx = \int_c^d \int_a^b f(x,y)\, dx\, dy.
$$

## 5. Worked examples — every step shown

**Example 1 — Constant function**  
*Given:* f(x,y) = 5 on [0,2]×[1,3].  
*Find:* ∬_R 5 dA.  
Step 1: Form the iterated integral ∫_0^2 ∫_1^3 5 dy dx.  
*Why:* Fubini permits replacement of the double integral by either iterated integral.  
Step 2: Inner integral ∫_1^3 5 dy = 5y |_1^3 = 10.  
*Why:* Antiderivative of constant is linear.  
Step 3: Outer integral ∫_0^2 10 dx = 20.  
*Why:* Fundamental theorem again.  
**20**

*Reflection:* The result equals height times area; the example verifies that both orders give the identical product.

**Example 2 — Linear in one variable**  
*Given:* f(x,y) = x on [0,1]×[0,1].  
*Find:* the double integral.  
Step 1: ∫_0^1 ∫_0^1 x dy dx.  
*Why:* Order dy dx chosen arbitrarily.  
Step 2: ∫_0^1 x dy = x y |_0^1 = x.  
*Why:* x treated as constant.  
Step 3: ∫_0^1 x dx = 1/2.  
*Why:* Power rule.  
**1/2**

*Reflection:* The inner integral simply multiplies by the length of the y-interval.

**Example 3 — Product of functions**  
*Given:* f(x,y) = x y on [0,2]×[0,3].  
*Find:* volume.  
Step 1: ∫_0^2 ∫_0^3 x y dy dx.  
Step 2: ∫_0^3 y dy = y²/2 |_0^3 = 9/2, then multiply by x → (9/2)x.  
*Why:* Separation of variables.  
Step 3: ∫_0^2 (9/2)x dx = (9/4)x² |_0^2 = 9.  
**9**

*Reflection:* The double integral factors into the product of two single integrals.

**Example 4 — Non-separable polynomial**  
*Given:* f(x,y) = x² y + x y² on [1,2]×[0,1].  
*Find:* iterated integral in both orders.  
Step 1 (dy dx): ∫_1^2 ∫_0^1 (x² y + x y²) dy dx.  
Step 2: Inner antiderivative (x² y²/2 + x y³/3)|_0^1 = x²/2 + x/3.  
Step 3: ∫_1^2 (x²/2 + x/3) dx = [x³/6 + x²/6]_1^2 = (8/6 + 4/6) − (1/6 + 1/6) = 10/6 = 5/3.  
Step 4 (dx dy): ∫_0^1 ∫_1^2 (x² y + x y²) dx dy yields identical 5/3.  
**5/3**

*Reflection:* Equality of orders confirms Fubini; the mixed terms do not prevent separation inside each iterated integral.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Integrating limits in the wrong order | Confusing which variable belongs to which interval | Write the rectangle as [a,b]×[c,d] explicitly before choosing order. |
| Treating f(x,y) as constant when it depends on the outer variable | Forgetting that the inner integral produces a function of the outer variable | After each inner integration, verify that the result still depends on the remaining variable. |
| Assuming equality holds for discontinuous functions | Fubini requires continuity on the compact set      | Check continuity on the closed rectangle first.      |
| Using open intervals for the domain | The theorem is stated for closed bounded rectangles | Always close the intervals; continuity on the compact set supplies uniform continuity. |
| Forgetting that dA is area element, not dx dy in that order | Notation abuse when switching orders               | Rewrite the iterated integral with the chosen order each time. |
| Numerical quadrature without uniform mesh refinement | Riemann-sum definition demands mesh norm → 0 in both directions simultaneously | Use adaptive quadrature that controls the two-dimensional norm. |
| Interchanging order for improper integrals without absolute convergence | Counter-examples exist when continuity fails at infinity | Verify absolute integrability before switching order. |

## 7. The textbook-precise statement
Let f be continuous on the closed rectangle R = [a,b] × [c,d]. Then the double integral exists and equals both iterated integrals:
$$
\iint_R f(x,y)\,dA = \int_a^b\Bigl(\int_c^d f(x,y)\,dy\Bigr)dx = \int_c^d\Bigl(\int_a^b f(x,y)\,dx\Bigr)dy.
$$
(See Stewart, *Calculus*, 9e, §15.1, Theorem 1.)

## 8. Visual — diagram or schematic
```text
y
↑
d +-------------------+
  |                   |
  |        R          |
  |                   |
c +-------------------+--> x
  a                   b
```
Horizontal lines are slices of constant y; vertical lines are slices of constant x. Integrating first dy traverses each vertical strip; integrating first dx traverses each horizontal strip. Both paths cover the identical rectangle.

## 9. The memory technique
1. **The hook** — Picture two librarians shelving the same stack of books: one sorts by row then column, the other by column then row; when the books are continuous in height, both finish with identical total height.
2. **What to overlearn** — The equality of the two iterated integrals for any continuous f on a closed rectangle; the precise domain notation [a,b]×[c,d].
3. **Spaced-repetition schedule** — Review the theorem statement at 1 day, 3 days, 7 days, 16 days, 35 days, each time recomputing one non-trivial example.
4. **First-principles fallback** — Rebuild from the definition: form the two-dimensional Riemann sum, factor the inner sum into an ordinary integral, then integrate the resulting function; continuity guarantees the factoring is valid.

## 10. What this unlocks
Fubini’s theorem supplies the computational engine for all subsequent multiple-integration theory.  
- Triple integrals over boxes become iterated integrals in any order.  
- Change of variables in higher dimensions rests on the same separation of limits.  
- Green’s, Stokes’, and divergence theorems are proved by reducing surface integrals to iterated single-variable integrals via Fubini.  
- Probability calculations with joint densities over rectangular supports become routine marginalisation.

## 11. Self-check — five questions, no answers
1. Evaluate ∬_{[0,1]×[0,2]} (x + 2y) dA by both orders and confirm numerical equality.  
2. Why does continuity on the closed rectangle guarantee that the inner integral exists for every fixed outer value?  
3. Give a counter-example function on [0,1]×[0,1] that is discontinuous at one point yet whose iterated integrals still exist but differ.  
4. A double integral over [−1,1]×[−1,1] of an odd function in x is claimed to be zero; justify or refute using Fubini.  
5. In a numerical code the rectangle is discretized with unequal spacing Δx_i and Δy_j; what condition on the mesh guarantees convergence to the iterated integral?