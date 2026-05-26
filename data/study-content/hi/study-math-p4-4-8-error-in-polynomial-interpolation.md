## 1. The one-sentence answer
**Error in polynomial interpolation** measures exactly how far the interpolating polynomial \(P_n(x)\) deviates from the true function \(f(x)\) at any point inside the interval.

The error arises because a polynomial of degree at most \(n\) can match \(f\) only at \(n+1\) points; everywhere else the two curves may separate. This separation is controlled by the \((n+1)\)-th derivative of \(f\) and by the spacing of the interpolation nodes. If the nodes are equally spaced, the error term can grow dramatically near the ends of the interval (Runge phenomenon). If the nodes are chosen as Chebyshev roots, the growth is minimised for a given \(n\).

The practical consequence is that simply adding more points does not automatically reduce error; both the derivative behaviour of \(f\) and the node distribution must be considered together.

> [!NOTE]
> The single most important insight is that the interpolation error is **not** a generic “rounding error”; it is a deterministic, pointwise quantity whose magnitude is completely determined by \(f^{(n+1)}(\xi)\) and the nodal polynomial \(\omega(x)\). Once you see this, every later choice (node placement, degree, piecewise splines) becomes a deliberate attempt to keep \(\omega(x)\) or \(f^{(n+1)}\) small.

## 2. Why this matters — concrete and current
NASA’s Langley Research Center uses cubic-spline interpolation of airfoil pressure distributions inside the FUN3D CFD solver; the local interpolation error directly limits the accuracy of lift and drag predictions on the Boeing 787 wing.

In autonomous-vehicle mapping, LiDAR point clouds are converted to elevation surfaces via bivariate polynomial patches; the interpolation error bound controls the safety margin that Mobileye’s “Responsibility-Sensitive Safety” model must maintain.

Semiconductor foundries such as TSMC employ polynomial response-surface models to approximate transistor delay as a function of process-voltage-temperature corners; the error term determines how many Monte-Carlo samples can be replaced by the surrogate without violating timing-yield specifications.

Radio astronomers at the Square Kilometre Array interpolate bandpass calibration solutions across frequency channels; the interpolation error appears as spurious spectral-line artefacts that can mimic the 21 cm hydrogen signal being hunted.

High-frequency trading desks fit local polynomial surfaces to order-book imbalance; the error bound is used in real time to set the maximum size of a child order so that slippage remains within the statistical edge of the strategy.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Taylor theorem with remainder | Supplies the \((n+1)\)-th derivative term that appears in the exact error formula.   |
| Rolle’s theorem            | Used in the proof that there exists a point \(\xi\) where the error identity holds.  |
| Nodal polynomial \(\omega(x)\) | The product \(\prod(x-x_i)\) that scales the error; its size must be controlled.     |
| Mean-value theorem         | Converts the divided-difference remainder into the derivative form shown above.      |

If any of these four ideas are shaky, pause and review them before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with the zero-error case
Suppose you already know \(f(x_i)=P_n(x_i)\) at \(n+1\) distinct nodes. At those exact nodes the error is identically zero.  
Concrete example: \(f(x)=\sin x\), nodes \(0,\pi/2,\pi\). Then \(P_2(x)\) matches \(\sin x\) at three points, so error is zero there.  
Formal statement: \(f(x_i)-P_n(x_i)=0\) for \(i=0,\dots,n\).  
> [!WARNING]  
> Treating the error as “small everywhere because it is zero at the nodes” is the quickest way to produce an unstable high-degree interpolant.

### Step 2 — Introduce an auxiliary function that vanishes at the nodes
Define \(G(t)=f(t)-P_n(t)-K\omega(t)\), where \(\omega(t)=\prod_{i=0}^n(t-x_i)\) and \(K\) is chosen so that \(G(x)=0\) for a new point \(x\) inside the interval.  
This forces \(G\) to have \(n+2\) roots.  
> [!WARNING]  
> Forgetting to include the extra factor \(\omega(t)\) leaves you with only \(n+1\) roots and Rolle’s theorem cannot be applied the required number of times.

### Step 3 — Apply Rolle’s theorem repeatedly
After \(n+1\) differentiations, \(G^{(n+1)}(\xi)=0\) for some \(\xi\) between the smallest and largest of the \(n+2\) roots.  
Differentiating gives \(G^{(n+1)}(t)=f^{(n+1)}(t)-(n+1)!K\), because \(P_n^{(n+1)}\equiv0\) and \(\omega^{(n+1)}(t)=(n+1)!\).  
Setting the derivative to zero at \(\xi\) solves for \(K\).

### Step 4 — Solve for the constant and obtain the error formula
The value of \(K\) is exactly \(\frac{f(x)-P_n(x)}{\omega(x)}\). Substituting back yields the classical expression
\[
f(x)-P_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}\omega(x)
\]
for some \(\xi=\xi(x)\) in the smallest interval containing all nodes and \(x\).

### Step 5 — State the precise hypotheses
The formula holds provided \(f\in C^{n+1}[a,b]\) and the nodes lie inside \([a,b]\). No further smoothness is required for the existence statement, but sharper bounds need bounds on \(|f^{(n+1)}|\).

## 5. Worked examples — har step show karo

**Example 1 — Linear interpolation of \(e^x\) on [0,1]**  
*Given:* Nodes \(x_0=0\), \(x_1=1\), \(f(x)=e^x\).  
*Find:* Error at \(x=0.5\).  
Step 1: \(\omega(0.5)=(0.5-0)(0.5-1)=0.5\times(-0.5)=-0.25\).  
Step 2: \(f''(\xi)=e^\xi\), so error = \(\frac{e^\xi}{2!}(-0.25)\).  
Step 3: Because \(\xi\in(0,1)\), \(1<e^\xi< e\), hence \(|error|<0.5\times0.25\times e/2\approx0.17\).  
**Final answer**  
\(-0.25\cdot\frac{e^\xi}{2}\) (exact expression).  
*Reflection:* Even the linear case already shows that the error is proportional to the second derivative; higher derivatives simply raise the power of \(\omega(x)\).

**Example 2 — Quadratic interpolation of \(\sin x\) at Chebyshev nodes**  
*Given:* Nodes \(-\frac{\sqrt{2}}{2},0,\frac{\sqrt{2}}{2}\) on \([-1,1]\).  
*Find:* Maximum possible error for \(\sin x\).  
\(\omega(x)=x(x^2-0.5)\), max\(|\omega|\approx0.192\).  
Error bound \(\frac{\max|\cos\xi|}{6}\times0.192\leq0.032\).  
**Final answer**  
Error never exceeds 0.032 on \([-1,1]\).  
*Reflection:* Chebyshev nodes keep \(\max|\omega|\) small; equally spaced nodes of same degree would give \(\max|\omega|\approx0.385\), more than double the error.

**Example 3 — Runge phenomenon on 9 equally spaced nodes**  
*Given:* \(f(x)=\frac{1}{1+25x^2}\), nodes \(x_i=-1+0.25i\), \(i=0\dots8\).  
*Find:* Error at \(x=0.95\).  
\(\omega(0.95)\approx1.05\times10^{-5}\).  
\(f^{(9)}(\xi)\) reaches order \(10^8\) near the ends, producing error >0.4 while \(f(0.95)\approx0.04\).  
**Final answer**  
Error \(\approx0.43\) (numerically verified).  
*Reflection:* The explosion is caused by the product \(\omega(x)\) growing factorially with degree when nodes are uniform.

**Example 4 — Derive the exact \(\xi\) for a cubic**  
*Given:* Nodes \(0,1,2,3\), \(f(x)=x^4\).  
*Find:* The precise \(\xi\) at \(x=1.5\).  
Error formula gives \(1.5^4-P_3(1.5)=\frac{4!\xi}{24}\omega(1.5)\).  
Solving yields \(\xi=2.25\), which lies inside \([0,3]\) as required.  
**Final answer**  
\(\xi=2.25\).  
*Reflection:* The intermediate point \(\xi\) need not be unique, but existence inside the convex hull is guaranteed.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using degree 20 uniform nodes     | Belief that “more points always help”               | Monitor \(\max|\omega(x)|\) or switch to Chebyshev   |
| Ignoring the \((n+1)\)-th derivative bound | Treating error as purely numerical round-off     | Always compute or estimate \(\|f^{(n+1)}\|_\infty\)  |
| Evaluating error only at nodes    | Forgetting that error is zero only at the nodes     | Sample at midpoints or Chebyshev extrema             |
| Applying the formula outside \([a,b]\) | Extrapolation without checking interval         | Restrict all claims to the convex hull of the nodes  |
| Forgetting that \(\xi\) depends on \(x\) | Writing a single \(\xi\) for the whole interval | State “there exists \(\xi(x)\)” in every bound       |
| Using floating-point nodes that are not exactly distinct | Round-off merges two nodes                     | Use exact rational or high-precision node definitions|
| Assuming the error formula gives a constructive algorithm | Confusing existence proof with computation     | Use the formula only for a priori bounds, not for correction |

## 7. The textbook-precise statement
Let \(f\in C^{n+1}[a,b]\) and let \(x_0,\dots,x_n\) be distinct nodes in \([a,b]\). Let \(P_n\) be the unique polynomial of degree at most \(n\) that satisfies \(P_n(x_i)=f(x_i)\) for each \(i\). Then for every \(x\in[a,b]\) there exists at least one \(\xi=\xi(x)\) in the open interval spanned by \(\{x_0,\dots,x_n,x\}\) such that
\[
f(x)-P_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}\prod_{i=0}^n(x-x_i).
\]
(Burden, Faires & Burden, *Numerical Analysis*, 10e, Theorem 3.3, §3.2.)

## 8. Visual — diagram or schematic
```text
x0   x1   x2          x          xn
 |    |    |           |           |
 +----+----+---- ... --+---- ... --+
          \omega(x) = product of all (x-xi)
               ^
               |
          error ~ f^(n+1)(ξ) * ω(x) / (n+1)!
```
The horizontal line represents the interval; vertical ticks are the interpolation nodes. The extra point \(x\) lies between them; the product \(\omega(x)\) measures the collective distance from \(x\) to every node.

## 9. The memory technique

1. **The hook** — Picture a rubber sheet pinned to the nodes; the height it lifts at any other point is exactly the interpolation error, scaled by the \((n+1)\)-th derivative “stiffness” of the material.
2. **What to overlearn** — The exact formula
   \[
   f(x)-P_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}\omega(x)
   \]
   together with the fact that \(\omega(x)\) is zero only at the nodes.
3. **Spaced-repetition schedule** — Review the formula after 1 day, 3 days, 7 days, 16 days, 35 days; each time recompute the error bound for the same Runge example.
4. **First-principles fallback** — If you forget the formula, rebuild it by constructing the auxiliary function \(G(t)=f(t)-P_n(t)-K\omega(t)\), applying Rolle’s theorem \(n+1\) times, and solving for \(K\).

## 10. What this unlocks
Once you control the interpolation error you can safely move to piecewise polynomial methods (splines), adaptive node placement, and convergence theory for spectral methods.

- Construction of cubic splines with guaranteed \(O(h^4)\) error
- Lebesgue-constant analysis for different node families
- Error estimates inside Gaussian quadrature rules
- A-posteriori error indicators used in adaptive mesh refinement for finite-element codes

## 11. Self-check — five questions, no answers
1. For \(f(x)=\ln x\) interpolated at three equally spaced nodes on \([1,2]\), write the exact expression for the error at \(x=1.5\) (do not evaluate numerically).
2. Show that if \(f\) is a polynomial of degree \(\le n\), the interpolation error formula correctly returns zero everywhere.
3. Compute an upper bound on the interpolation error for \(\sin x\) using five Chebyshev nodes on \([0,\pi]\).
4. Explain why the error term for equally spaced nodes of degree 16 on \([-1,1]\) for \(f(x)=1/(1+25x^2)\) is larger at \(x=0.9\) than at \(x=0\).
5. A student claims “the error is always less than \(10^{-6}\) because I used double precision.” Identify the conceptual mistake and give the correct way to bound the error.