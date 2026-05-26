## 1. The one-sentence answer
**Root-finding from scratch means writing your own code for bisection and Newton-Raphson so that you locate where f(x) = 0 without calling external solvers.**

Bisection works by repeatedly cutting an interval that is known to contain a root in half, keeping only the half where the sign change still occurs. Newton-Raphson instead uses the tangent line at the current guess to jump straight to a better approximation, repeating until the update becomes tiny. Both algorithms are built from basic loops and arithmetic; the only external ingredient is the ability to evaluate the function (and its derivative for Newton) at any point you choose.

Aap dekhoge ki bisection guaranteed converge karta hai lekin slow hai, jabki Newton fast hai lekin initial guess aur derivative ki zaroorat padti hai. Iska core idea yeh hai ki numerical methods ko khud implement karne se aap unki convergence properties aur failure modes ko asal mein samajh paate ho.

> [!NOTE]
> The single most important insight is that every iteration is just a deterministic rule that shrinks either the interval width (bisection) or the residual (Newton); once you can code that rule and a safe stopping test, the computer does the rest.

## 2. Why this matters — concrete and current
NASA’s trajectory design tools still contain hand-written bisection routines inside their Lambert solver because the method never fails when the search interval is correctly bracketed, even for highly eccentric orbits.

In semiconductor process simulation, companies such as TSMC solve nonlinear charge-balance equations at each mesh point of a transistor; Newton-Raphson is the default inner solver because quadratic convergence keeps the overall runtime acceptable for meshes with millions of nodes.

Modern machine-learning frameworks (PyTorch, JAX) implement custom root-finding layers for implicit models; the gradient of the layer is obtained by differentiating through the Newton iterations, which is only possible when the solver code is visible and differentiable.

In computational fluid dynamics, pressure-velocity coupling inside OpenFOAM repeatedly solves scalar nonlinear equations for density; a safeguarded Newton method with bisection fallback is used so that the simulation does not diverge on the first time step of a new geometry.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Continuity of f      | Guarantees that a sign change implies a root (IVT)        |
| Derivative f′        | Supplies the slope of the tangent line in Newton-Raphson  |
| Loop termination     | Prevents infinite iteration; needs both tolerance and max steps |
| Floating-point arithmetic | Explains why exact zero is rarely reached and why safeguards are required |

Agar aap continuity ya derivative nahi samajhte, to pehle single-variable calculus ke woh chapters padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Locate an interval that must contain a root
Aap ek aise closed interval [a, b] dhundte ho jahaan f(a) aur f(b) ke signs opposite hain.  
Example: f(x) = x² − 2, a = 1, b = 2 → f(1) = −1, f(2) = 2.  
Formal statement: if f is continuous on [a, b] and f(a)f(b) < 0, then ∃ c ∈ (a, b) such that f(c) = 0.  
> [!WARNING] Agar interval galat choose kiya aur sign change nahi mila, to pura algorithm zero root return kar sakta hai even when roots exist elsewhere.

### Step 2 — Halve the interval and keep the sign-changing half
Midpoint c = (a + b)/2 calculate karo; agar f(a)f(c) < 0 to right half discard karo, warna left half.  
Example: c = 1.5, f(1.5) = 0.25 > 0 → new interval [1, 1.5].  
Formal update:  
$$
[a_{n+1}, b_{n+1}] =
\begin{cases}
[a_n, c] & \text{if } f(a_n)f(c) < 0, \\
[c, b_n] & \text{otherwise}.
\end{cases}
$$

### Step 3 — Stop when the interval is smaller than tolerance
Repeat Step 2 until b − a < ε. The final midpoint is returned as the root.  
This produces linear convergence with error halving each step.

### Step 4 — Replace the secant with the tangent for faster progress
Newton-Raphson ek point xₙ se shuru hota hai aur uss point par tangent line ka x-intercept nikaalta hai.  
Example: f(x) = x² − 2, x₀ = 1.5, f′(x) = 2x → next guess 1.4167.  
Formal iteration:  
$$
x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}.
$$

### Step 5 — Add safeguards so Newton does not diverge
Agar |f′(xₙ)| bahut chhota ho ya naya point interval se bahar jaaye, to bisection step fallback karo.  
Formal hybrid rule: try Newton; if |x_{n+1} − x_n| > |b − a|/2 then replace with bisection midpoint.

### Step 6 — Code the loop with explicit stopping criteria
Python mein while loop chalao jo max_iter aur tol dono check kare. Function aur derivative ko callables ke roop mein pass karo.

### Step 7 — Return the best available approximation and diagnostics
Final x, f(x), aur total iterations report karo taaki caller convergence quality judge kar sake.

## 5. Worked examples — har step show karo

**Example 1 — Bisection on x² − 2**  
*Given:* f(x) = x² − 2, a = 1, b = 2, tol = 0.01.  
*Find:* approximate root.  
Step 1: c = 1.5, f(1.5) = 0.25 > 0 → [1, 1.5]. *Why:* sign change ab left half mein hai.  
Step 2: c = 1.25, f(1.25) = −0.4375 < 0 → [1.25, 1.5]. *Why:* sign change ab right half mein.  
Step 3: c = 1.375, interval length 0.125 > 0.01 → continue.  
Final answer after tolerance met: **1.414**  
*Reflection:* Har step sirf ek comparison aur assignment hai; code likhna bahut seedha hai.

**Example 2 — Newton on same function**  
*Given:* f(x) = x² − 2, f′(x) = 2x, x₀ = 1.5.  
*Find:* root after two iterations.  
x₁ = 1.5 − (2.25 − 2)/(3) = 1.41666… *Why:* tangent slope se linear approximation.  
x₂ = 1.41666 − (2.00694 − 2)/(2.8333) ≈ 1.41421. *Why:* quadratic error drop.  
Final answer: **1.41421**  
*Reflection:* Ek hi derivative evaluation se do decimal accuracy mil gayi.

**Example 3 — Newton failure case and bisection rescue**  
*Given:* f(x) = x³ − x + 0.1, x₀ = 0, f′(0) = −1.  
*Find:* safe next step.  
Newton gives x₁ = 0.1. |f′(0.1)| small → switch to bisection on [−1, 1].  
Final answer: **−0.1** (bisection midpoint)  
*Reflection:* Safeguard add karne se algorithm robust banta hai.

**Example 4 — Python implementation skeleton**  
```python
def bisection(f, a, b, tol=1e-8, max_iter=100):
    for _ in range(max_iter):
        c = (a + b) / 2
        if abs(b - a) < tol:
            return c
        if f(a) * f(c) < 0:
            b = c
        else:
            a = c
    return c
```
*Why:* loop body exactly Step 2 aur Step 3 ko mirror karta hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| f(a)·f(b) > 0 yet root exists | Multiple roots or even multiplicity         | Plot or sample more points before starting   |
| Newton hits f′(x) = 0       | Horizontal tangent at guess                 | Check |f′| > ε before division; else bisect     |
| Infinite loop on flat region | tol never reached because of floating point | Add iteration cap and return best-so-far     |
| Using x = 0 as default start | Function may be undefined or derivative zero | Require user-supplied bracket or start       |
| Reporting c without f(c)    | Residual may still be large                 | Always return both x and |f(x)|               |
| Forgetting to copy interval endpoints | Mutable variables overwritten               | Use local variables inside loop              |

## 7. The textbook-precise statement
Let f be continuous on the closed interval [a, b] and suppose f(a)f(b) < 0. The bisection method generates a sequence of nested intervals [aₙ, bₙ] with a₀ = a, b₀ = b whose lengths satisfy |bₙ − aₙ| = (b − a)/2ⁿ and whose midpoints cₙ converge to a root of f.  

If in addition f is differentiable, f′(ξ) ≠ 0 at the root ξ, and x₀ is sufficiently close to ξ, then the Newton iteration  
x_{n+1} = x_n − f(x_n)/f′(x_n)  
converges quadratically to ξ (Burden, Faires & Burden, *Numerical Analysis*, 10e, §2.3 and §2.4).

## 8. Visual — diagram or schematic
```
f(x)
 ^
 |     * tangent at x0
 |    /
 |   /     x1
 |  /     /
 | /     /
 |/     /
 x0--->/----------> x
       root
```
Horizontal axis labelled x, vertical f(x). Vertical dashed lines at successive Newton guesses showing rapid approach to the root; a horizontal bracket shows the shrinking bisection interval on the same axis.

## 9. The memory technique
1. **The hook** — Picture Newton as a skier who always points skis straight down the tangent slope; bisection is a lumberjack who keeps sawing exactly in the middle of a marked log.  
2. **What to overlearn** — Bisection error halves each step; Newton error squares each step when close.  
3. **Spaced-repetition schedule** — Review the two update formulas on day 1, 3, 7, 16, 35.  
4. **First-principles fallback** — Derive Newton from the linear Taylor expansion f(x) ≈ f(xₙ) + f′(xₙ)(x − xₙ) set to zero; derive bisection from the intermediate-value theorem.

## 10. What this unlocks
Once you can write these two solvers, you can embed them inside larger scientific codes (ODE integrators, optimization loops, implicit neural layers) and differentiate through them.  
- Next: secant method and Brent’s method  
- Hybrid safeguarded solvers in SciPy’s optimize.root_scalar  
- Automatic differentiation of iterative solvers for ML

## 11. Self-check — five questions, no answers
1. For f(x) = e^x − 3 on [1, 2], how many bisection steps guarantee error < 10^{-6}?  
2. Starting Newton at x₀ = 0 for f(x) = x³ − 2x + 2, what happens on the first iteration and why?  
3. Write the exact condition that must be checked before performing the Newton division.  
4. In the hybrid algorithm, after how many consecutive Newton failures should you permanently fall back to bisection?  
5. Prove that the bisection sequence of midpoints is always inside the original interval [a, b].