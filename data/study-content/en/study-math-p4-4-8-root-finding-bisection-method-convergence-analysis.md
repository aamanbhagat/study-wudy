## 1. The one-sentence answer
**Bisection-method convergence analysis proves that the interval length contracts by exactly one half at every step, guaranteeing linear convergence with rate 1/2.**

The bisection method begins with an interval known to contain a root by the intermediate-value theorem. At each iteration the method evaluates the midpoint, discards one half of the current interval, and retains the other half that still brackets the root. Because the retained interval is always half as long as its predecessor, the maximum possible distance from the midpoint to the unknown root is halved after every function evaluation.

This halving produces a simple, a-priori error bound that depends only on the initial interval length and the iteration count; no derivative information is required. The convergence is therefore guaranteed, yet it is only linear: the number of correct digits grows by roughly one bit per iteration.

> [!NOTE]
> The decisive insight is that the error bound is completely independent of the function’s shape—only the initial bracket length and the iteration count matter.

## 2. Why this matters — concrete and current
NASA’s trajectory-design software for the Artemis lunar missions solves Kepler’s equation repeatedly inside a high-fidelity propagator; bisection supplies a derivative-free, guaranteed bracket that is embedded inside a larger Newton loop to meet the required 10^{-12} position tolerance.

In semiconductor process simulation, Synopsys TCAD tools locate the Fermi level by solving a nonlinear charge-neutrality equation; the bisection stage provides a robust initial guess that prevents divergence when the doping profile changes abruptly across a pn-junction.

Modern machine-learning frameworks such as PyTorch and JAX use safeguarded bisection inside their line-search routines for non-smooth loss surfaces; the method guarantees that the step length remains inside a valid interval even when the gradient is corrupted by floating-point noise.

Climate-model developers at the UK Met Office employ bisection to invert saturation-vapour-pressure tables inside the radiation scheme; the guaranteed convergence rate allows the code to budget a fixed number of iterations per grid cell without risking solver failure on extreme temperature ranges.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Intermediate Value Theorem     | Guarantees that a sign change implies at least one root   |
| Continuity on a closed interval| Ensures the function cannot “jump over” zero inside the bracket |
| Absolute-error definition      | Supplies the quantity whose contraction we measure        |
| Geometric sequence             | Describes the exact halving of the error bound            |

## 4. Building the idea — from intuition to formalism

### Step 1 — A guaranteed bracket
If a continuous function changes sign at the endpoints of an interval, a root must lie inside that interval.  
Example: \(f(x)=x^2-2\) on \([1,2]\) satisfies \(f(1)<0\) and \(f(2)>0\).  
Formally,  
\[
f(a)f(b)<0 \implies \exists\, c\in(a,b)\quad f(c)=0.
\]
> [!WARNING]  
> Dropping the continuity hypothesis allows the function to jump over zero, destroying the bracket.

### Step 2 — Midpoint selection
Evaluate the function at the midpoint \(m=(a+b)/2\). Exactly one of the two subintervals \([a,m]\) or \([m,b]\) must still contain a sign change.  
The new interval length is exactly \((b-a)/2\).

### Step 3 — Error bound after one step
The maximum distance from \(m\) to the unknown root is half the original interval length:  
\[
|c-m|\le\frac{b-a}{2}.
\]

### Step 4 — Iteration produces a geometric sequence
After \(n\) iterations the interval length satisfies  
\[
b_n-a_n=\frac{b_0-a_0}{2^n}.
\]
Hence the error bound is  
\[
E_n\le\frac{b_0-a_0}{2^n}.
\]

### Step 5 — Linear convergence with rate 1/2
Taking logarithms shows that the number of correct bits grows linearly with \(n\):  
\[
-\log_2 E_n\ge n-\log_2(b_0-a_0).
\]
The asymptotic constant is exactly \(1/2\), confirming linear convergence of order one.

### Step 6 — Textbook convergence statement
Let \(f\) be continuous on \([a_0,b_0]\) with \(f(a_0)f(b_0)<0\). The bisection sequence \(\{x_n\}\) of midpoints satisfies  
\[
|x_n-c|\le\frac{b_0-a_0}{2^n}\qquad\text{for all }n\ge0,
\]
where \(c\) is a root. This is the precise statement found in Burden & Faires, *Numerical Analysis*, 10e, §2.1.

## 5. Worked examples — every step shown

**Example 1 — Single iteration on a quadratic**  
*Given:* \(f(x)=x^2-2\), \([a,b]=[1,2]\).  
*Find:* Midpoint and new interval after one bisection step.  

1. Compute midpoint \(m=(1+2)/2=1.5\).  
   *Why:* The midpoint halves the interval by definition.  
2. Evaluate \(f(1.5)=0.25>0\).  
   *Why:* Sign change now lies in \([1,1.5]\).  
3. Replace \(b\) with \(m\).  

**New interval:** \([1,1.5]\).  
**Error bound:** \(0.25\).

*Reflection:* The calculation is trivial yet already shows the exact halving that drives all later analysis.

**Example 2 — Error bound after five iterations**  
*Given:* Same \(f\), initial interval length \(1\).  
*Find:* Smallest \(n\) such that \(E_n\le10^{-3}\).  

\[
\frac{1}{2^n}\le10^{-3}\implies n\ge\log_2(1000)\approx9.96.
\]
Thus ten iterations suffice.  

*Reflection:* The bound depends only on interval length, not on \(f'\).

**Example 3 — Multiple roots inside bracket**  
*Given:* \(f(x)=x^3-x\), \([a,b]=[-1.5,1.5]\).  
*Find:* Behaviour of the sequence.  

Bisection still produces a valid nested sequence of intervals whose lengths halve, but the limit point is one of the three roots; which root is obtained depends on the initial midpoint choices.  

*Reflection:* Convergence remains linear; uniqueness is not required for the error bound.

**Example 4 — Floating-point termination test**  
*Given:* Machine epsilon \(\varepsilon=2^{-52}\).  
*Find:* Iteration at which the interval length drops below \(\varepsilon\).  

\[
\frac{b_0-a_0}{2^n}<\varepsilon\implies n>\log_2\bigl((b_0-a_0)/\varepsilon\bigr).
\]
For \([0,1]\) this occurs at \(n=53\).  

*Reflection:* In practice one also monitors \(|f(m)|\) to avoid unnecessary iterations once rounding error dominates.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using \(|f(m)|<\varepsilon\) alone  | Function may be flat near the root                  | Always combine with interval-length test             |
| Forgetting that convergence is only linear | Students expect quadratic speed from Newton         | Compare iteration counts with Newton on the same problem |
| Bracket endpoints exactly at a root | Floating-point returns zero immediately             | Test \(f(a)=0\) or \(f(b)=0\) before entering loop   |
| Assuming the method finds the root of smallest magnitude | Bisection follows the sign pattern, not magnitude   | Post-process with other solvers if needed            |
| Overflow when \(a\) and \(b\) have large magnitude | Midpoint computation \((a+b)/2\) may overflow       | Use \(a+(b-a)/2\) or fused multiply-add              |
| Stopping after a fixed number of steps without checking tolerance | Bound may still exceed required accuracy            | Compute \(n=\lceil\log_2((b-a)/\text{tol})\rceil\)   |
| Applying bisection to a discontinuous function | Sign change may not imply a root                    | Verify continuity on the closed interval first       |

## 7. The textbook-precise statement
Let \(f:[a,b]\to\mathbb{R}\) be continuous and satisfy \(f(a)f(b)<0\). Define the sequence of midpoints by  
\[
x_{n+1}=\frac{a_n+b_n}{2},\qquad
[a_{n+1},b_{n+1}]=\begin{cases}
[a_n,x_{n+1}] & \text{if }f(a_n)f(x_{n+1})<0,\\
[x_{n+1},b_n] & \text{otherwise}.
\end{cases}
\]
Then \(\{x_n\}\) converges to a root \(c\in[a,b]\) and the error satisfies  
\[
|x_n-c|\le\frac{b-a}{2^n}\qquad\text{for all }n\ge0.
\]
(Burden & Faires, *Numerical Analysis*, 10e, Theorem 2.1.)

## 8. Visual — diagram or schematic
```text
Iteration 0:   a0 ---------------- m0 ---------------- b0     length L
Iteration 1:   a0 -------- m1 -------- b1 = m0               length L/2
Iteration 2:   a0 ---- m2 ---- b2 = m1                       length L/4
Iteration 3:   a0 -- m3 -- b3 = m2                           length L/8
...
Iteration n:   [an ........ mn ........ bn]                  length L/2^n
```
Each vertical bar marks the retained interval; the discarded half is shown with a dashed line.

## 9. The memory technique

1. **The hook** — Picture a librarian repeatedly tearing a phone book exactly in half and throwing away the half that does not contain the desired name; the remaining stack halves every time.

2. **What to overlearn** — The bound \(E_n\le(b_0-a_0)/2^n\) and the fact that the contraction factor is exactly \(1/2\).

3. **Spaced-repetition schedule** — Review the bound at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

4. **First-principles fallback** — Start from the nested-interval theorem: each interval is closed, nested, and length \(\to0\), hence the intersection is a single point that must be a root.

## 10. What this unlocks
Bisection convergence supplies the only a-priori, derivative-free error control in one dimension; it therefore serves as the safety net inside hybrid solvers and as the benchmark against which faster methods are compared.

- Brent’s method ( safeguarded inverse quadratic interpolation )
- Regula falsi and its Illinois variant
- Analysis of higher-order one-point iterations (Newton, Halley)
- Complexity counts inside global optimization routines
- Rigorous verification of floating-point implementations of elementary functions

## 11. Self-check — five questions, no answers
1. Starting from an interval of length 4, how many bisection iterations are required to guarantee an error smaller than \(10^{-6}\)?

2. A student claims that after 20 iterations the midpoint is guaranteed to be within \(10^{-6}\) of the root even if the initial interval was \([10^{10},10^{10}+1]\). Is the claim correct?

3. Construct a continuous function on \([0,1]\) for which bisection converges to the leftmost root regardless of the initial midpoint.

4. Show that the sequence of midpoints produced by bisection is always monotonic once the first sign-change decision is made.

5. Suppose \(f\) is continuous but \(f'\) changes sign inside the initial bracket. Does the linear convergence rate of bisection change?