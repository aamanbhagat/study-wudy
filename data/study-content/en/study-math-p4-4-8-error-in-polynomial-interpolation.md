## 1. The one-sentence answer
**The error in polynomial interpolation is the pointwise difference between a function \(f\) and its unique polynomial \(P_n\) of degree at most \(n\) that matches \(f\) at \(n+1\) distinct nodes, expressed exactly by a remainder term involving the \((n+1)\)-st derivative of \(f\).**

Consider a smooth function \(f\) and \(n+1\) points \(x_0,\dots,x_n\). There is exactly one polynomial of degree \(\le n\) that passes through the points \((x_i,f(x_i))\). At any other point \(x\), this polynomial generally differs from \(f(x)\). The size of that difference is controlled by how rapidly \(f\) curves, measured by its highest derivative that the polynomial cannot reproduce.

The explicit formula isolates this difference as a product of the nodal distances multiplied by a single unknown derivative value somewhere in the interval. This converts an abstract approximation question into a concrete bound once a maximum for that derivative is known.

> [!NOTE]
> The error vanishes identically at the nodes and is otherwise proportional to the next derivative, exactly as the Taylor remainder generalizes from a single expansion point to many.

## 2. Why this matters — concrete and current
In orbital mechanics, NASA’s GMAT and ESA’s GODOT propagate spacecraft trajectories by interpolating high-fidelity gravitational potentials; the interpolation-error term supplies rigorous step-size control that keeps position error below 10 cm over a lunar transfer.

Semiconductor foundries use cubic-spline interpolation of measured doping profiles inside TCAD simulators; the explicit error formula determines the mesh density needed to keep threshold-voltage predictions inside 1 mV, directly affecting yield at TSMC’s 3 nm node.

Modern machine-learning libraries (JAX, PyTorch) accelerate repeated evaluation of special functions by pre-computing Chebyshev interpolants on GPUs; the error term is monitored at runtime to decide when to fall back to higher-precision arithmetic, preventing silent accuracy loss in large language-model training runs.

Global weather models at ECMWF employ barycentric Lagrange interpolation on reduced Gaussian grids; the interpolation-error bound enters the uncertainty quantification pipeline that produces the probabilistic forecasts delivered daily to national meteorological services.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Existence and uniqueness of interpolating polynomial | Guarantees that \(P_n\) is well-defined before error is discussed |
| Taylor’s theorem with Lagrange remainder | Supplies the single-point prototype that the multi-point error formula extends |
| Rolle’s theorem          | The key tool that forces the auxiliary function to possess an extra root |
| Continuous differentiability | Ensures the \((n+1)\)-st derivative exists on the closed interval |

## 4. Building the idea — from intuition to formalism

### Step 1 — The interpolant exists and is unique
A polynomial of degree at most \(n\) is fixed by \(n+1\) independent conditions. Given distinct nodes \(x_0,\dots,x_n\) and values \(f(x_i)\), exactly one such polynomial \(P_n\) satisfies \(P_n(x_i)=f(x_i)\) for each \(i\).

**Example.** Nodes \(0,1,2\) and values \(1,3,7\) determine the unique quadratic \(P_2(x)=x^2+2x+1\).

Formally,
\[
P_n(x_i)=f(x_i),\qquad i=0,\dots,n.
\]

> [!WARNING]
> If two distinct polynomials of degree \(\le n\) agreed at the nodes, their difference would be a nonzero polynomial of degree \(\le n\) with \(n+1\) roots—an impossibility.

### Step 2 — Define the error function
Let \(e(x)=f(x)-P_n(x)\). Then \(e(x_i)=0\) at every node, so the error vanishes exactly where data are given.

### Step 3 — Construct an auxiliary function that forces an extra root
Fix an arbitrary evaluation point \(x\notin\{x_0,\dots,x_n\}\). Define
\[
g(t)=f(t)-P_n(t)-\lambda\prod_{i=0}^n(t-x_i),
\]
where the constant \(\lambda\) is chosen so that \(g(x)=0\). The product \(\omega(t)=\prod(t-x_i)\) supplies \(n+1\) roots already; adding the extra factor makes \(g\) vanish at the \(n+2\) points \(x_0,\dots,x_n,x\).

### Step 4 — Apply Rolle’s theorem repeatedly
Because \(g\) has \(n+2\) roots, its first derivative has at least \(n+1\) roots, the second derivative at least \(n\) roots, and so on. After \(n+1\) differentiations, \(g^{(n+1)}\) possesses at least one root \(\xi\) inside the smallest interval containing all the points.

### Step 5 — Evaluate the \((n+1)\)-st derivative
Differentiating the auxiliary function yields
\[
g^{(n+1)}(t)=f^{(n+1)}(t)-\lambda(n+1)!.
\]
At the Rolle root \(\xi\) we obtain \(g^{(n+1)}(\xi)=0\), hence
\[
\lambda=\frac{f^{(n+1)}(\xi)}{(n+1)!}.
\]
Substituting back the definition of \(\lambda\) produces the error formula.

### Step 6 — State the interpolation error theorem
For any \(x\) in the interval,
\[
f(x)-P_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}\prod_{i=0}^n(x-x_i)
\]
for some \(\xi=\xi(x)\) between the smallest and largest of \(\{x,x_0,\dots,x_n\}\).

## 5. Worked examples — every step shown

**Example 1 — Linear interpolation of \(\sqrt{x}\) at 1 and 4**  
*Given:* \(f(x)=\sqrt{x}\), nodes \(x_0=1\), \(x_1=4\).  
*Find:* error at \(x=2.25\).  

The linear interpolant is \(P_1(x)= \frac{2}{3}x+\frac{1}{3}\).  
Error formula: \(f(2.25)-P_1(2.25)=\frac{f''(\xi)}{2}(2.25-1)(2.25-4)\).  
Here \(f''(x)=-\frac14 x^{-3/2}\).  
At \(\xi\in[1,4]\) the product \((2.25-1)(2.25-4)=-2.8125\) and \(|f''|\le\frac14\).  
Thus \(|e(2.25)|\le\frac14\cdot\frac12\cdot2.8125\approx0.3516\).  
Actual value: \(\sqrt{2.25}=1.5\), \(P_1(2.25)=1.8333\), difference \(-0.3333\).

*Reflection.* The bound is only 5 % loose; the unknown \(\xi\) can be replaced by an interval maximum when a derivative bound is available.

**Example 2 — Quadratic interpolation of \(e^x\) on \([0,1]\)**  
*Given:* nodes \(0,0.5,1\).  
*Find:* expression for the error.  

\(\omega(x)=x(x-0.5)(x-1)\).  
Error: \(e^x-P_2(x)=\frac{e^\xi}{6}x(x-0.5)(x-1)\), \(\xi\in[0,1]\).

**Example 3 — Runge phenomenon on equispaced nodes**  
*Given:* \(f(x)=1/(1+25x^2)\), 9 equispaced nodes on \([-1,1]\).  
The error term grows like \(|\omega(x)|\) near the endpoints; the tenth derivative reaches \(10^{12}\) scale, producing visible oscillations of amplitude >0.5.

**Example 4 — Chebyshev nodes remove the growth**  
Same \(f\) interpolated at the 9 Chebyshev extrema.  
\(|\omega(x)|\le2^{-8}\) on \([-1,1]\); the tenth derivative bound yields a uniform error <0.02, confirming the clustering effect.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using \(n\) instead of \(n+1\) in the derivative order | Confusing degree with number of points | Count nodes first, then set derivative order to one higher |
| Treating \(\xi\) as a fixed point rather than an unknown | Misreading the mean-value statement | Always keep “there exists \(\xi(x)\)” in the final sentence |
| Forgetting the product \(\prod(x-x_i)\) can be huge | Focusing only on the derivative | Compute or bound \(\|\omega\|_\infty\) separately on the interval |
| Applying the formula at a node | Overlooking that both sides vanish | Verify \(x\) is distinct from all nodes before quoting the expression |
| Assuming equispaced nodes are optimal | Intuition from Taylor series | Compare Lebesgue constants; switch to Chebyshev nodes when possible |
| Neglecting that \(f\) must be \(C^{n+1}\) | Using the formula on merely continuous data | Check differentiability hypothesis before invoking the theorem |
| Confusing interpolation error with truncation error of a series | Terminology overlap in numerical analysis texts | Keep separate notebooks: interpolation vs. series truncation |

## 7. The textbook-precise statement
Let \(f\in C^{n+1}[a,b]\) and let \(x_0,\dots,x_n\) be distinct points in \([a,b]\). Let \(P_n\) be the unique polynomial of degree at most \(n\) satisfying \(P_n(x_i)=f(x_i)\) for \(i=0,\dots,n\). Then for every \(x\in[a,b]\) there exists \(\xi=\xi(x)\) strictly between the smallest and largest of \(\{x,x_0,\dots,x_n\}\) such that
\[
f(x)-P_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}\prod_{i=0}^n(x-x_i).
\]
(Burden, Faires, Burden, *Numerical Analysis*, 10e, Theorem 3.3.)

## 8. Visual — diagram or schematic
```text
f(x)  ↑
      |     *  (true function)
      |    / \  
      |   /   *  P_n(x)  (interpolant)
      |  /     \
      | /       \
      |/         \
------+-------------------> x
     x0   x1   x2   x
```
Vertical distance at \(x\) is the interpolation error; \(\omega(x)\) measures horizontal lever-arm product from the nodes.

## 9. The memory technique

**The hook.** Picture the error as the single extra “wiggle” that the \((n+1)\)-st derivative is still free to make after the polynomial has used up all its degrees of freedom at the nodes.

**What to overlearn.**  
\[
f(x)-P_n(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}\omega(x),\qquad\omega(x)=\prod_{i=0}^n(x-x_i).
\]
The product \(\omega(x)\) and the factorial in the denominator must be automatic.

**Spaced-repetition schedule.** Review the formula at 1 day, 3 days, 7 days, 16 days, 35 days; each time recompute the error for the same simple example (e.g., \(\sqrt{x}\) on two nodes).

**First-principles fallback.** Re-derive by constructing the auxiliary function \(g(t)\) that vanishes at the nodes plus the evaluation point, then apply Rolle’s theorem \(n+1\) times.

## 10. What this unlocks
The error formula is the gateway to all subsequent approximation theory. It directly motivates Newton divided-difference tables (the divided differences estimate the successive derivatives appearing in the remainder), explains why Chebyshev nodes minimize \(\|\omega\|_\infty\), supplies the convergence theory for Bernstein polynomials, and furnishes the local error term inside piecewise-polynomial methods such as cubic splines and finite-element bases.

- Convergence rates for analytic functions on Bernstein ellipses  
- Lebesgue constants and near-optimality of Chebyshev nodes  
- A-posteriori error estimators in adaptive quadrature  
- Error analysis of barycentric Lagrange weights  

## 11. Self-check — five questions, no answers
1. Write the explicit error term for linear interpolation of \(f(x)=\ln x\) at nodes 1 and \(e\) evaluated at \(x=2\).

2. For which choice of three nodes on \([-1,1]\) is \(\max|\omega(x)|\) smallest when interpolating a degree-4 polynomial?

3. A student claims the interpolation error is zero everywhere if \(f\) is itself a polynomial of degree \(n\). Identify the flaw in the reasoning.

4. Given only that \(|f^{(n+1)}(x)|\le M\) on \([a,b]\), derive a uniform error bound for any \(x\in[a,b]\).

5. Suppose the nodes are perturbed by machine epsilon; how does the interpolation-error formula change, and why can the perturbation dominate the truncation term for large \(n\)?