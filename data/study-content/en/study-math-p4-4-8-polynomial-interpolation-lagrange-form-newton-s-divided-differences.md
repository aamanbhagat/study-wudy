## 1. The one-sentence answer
**Polynomial interpolation constructs the unique polynomial of degree at most \(n\) that passes exactly through any \(n+1\) distinct points.**

The underlying task is to replace an unknown function \(f\) by a polynomial \(p\) that agrees with \(f\) at prescribed abscissae. Because the vector space of polynomials of degree \(\le n\) has dimension \(n+1\), exactly one such polynomial exists once \(n+1\) distinct nodes are supplied. The Lagrange form writes this polynomial explicitly as a linear combination of basis polynomials that each equal 1 at one node and 0 at all others. Newton’s divided-difference form rewrites the same polynomial in a nested product that reveals the successive slopes between the data points and permits cheap addition of new nodes.

Both representations are algebraically identical; they differ only in computational cost and in how easily they expose the effect of adding or removing a point. The choice between them is therefore dictated by the surrounding algorithm rather than by any difference in the mathematical object they describe.

> [!NOTE]
> The interpolant is completely determined by the nodes and the ordinates; no derivative information is required, yet the resulting polynomial is unique in the space of degree-\(\le n\) polynomials.

## 2. Why this matters — concrete and current
In trajectory design at NASA’s Jet Propulsion Laboratory, cubic spline interpolants (a piecewise extension of the same idea) generate reference paths for the Mars Perseverance rover; the divided-difference table supplies the coefficients that are uploaded to the flight computer every sol.

Modern graphics pipelines at NVIDIA employ Newton interpolation inside the tensor cores to approximate transcendental functions such as \(\operatorname{atan2}\) to within one ulp, because the nested multiplication maps directly onto fused multiply-add instructions and re-uses the same coefficient table across an entire warp.

In semiconductor process control, ASML’s lithography scanners fit low-degree Lagrange polynomials to wafer-height sensor data taken at 10 000 points per second; the resulting surface model drives real-time focus corrections whose residual error must stay below 1 nm.

Machine-learning libraries such as PyTorch’s `torch.nn.functional.grid_sample` fall back to Newton-form barycentric weights when the user requests cubic interpolation on non-uniform grids, because the divided-difference algorithm avoids the \(O(n^2)\) cost of rebuilding a full Vandermonde matrix at every forward pass.

Global climate models at the European Centre for Medium-Range Weather Forecasts reconstruct sparse radiosonde profiles with Newton interpolants before feeding them into the semi-Lagrangian advection scheme; the same table also supplies the divided-difference error estimate used to adapt the vertical grid.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| Field axioms of \(\mathbb{R}\) | Guarantee that addition and multiplication of the given ordinates are well-defined.  |
| Linear independence of monomials | Prove that the interpolating polynomial of degree \(\le n\) is unique.             |
| Finite differences / slopes    | Supply the divided-difference coefficients that appear in Newton’s form.           |
| Summation and product notation | Express both the Lagrange basis and the Newton product compactly.                  |

## 4. Building the idea — from intuition to formalism

### Step 1 — Existence from linear algebra
Any set of \(n+1\) distinct abscissae \(x_0,\dots,x_n\) and corresponding ordinates \(y_0,\dots,y_n\) determines a unique polynomial of degree at most \(n\) that satisfies \(p(x_i)=y_i\).

Consider three points \((0,1)\), \((1,2)\), \((2,4)\). The monomial basis \(\{1,x,x^2\}\) yields the Vandermonde system whose solution is \(p(x)=1+x+x^2\).

The coefficient vector \(\mathbf{c}\) solves the linear system
\[
V\mathbf{c}=\mathbf{y},\qquad V_{ij}=x_i^{j}.
\]
Uniqueness follows because \(\det V\neq0\) when the \(x_i\) are distinct.

> [!WARNING]
> If two nodes coincide, the Vandermonde matrix becomes singular and the uniqueness claim collapses.

### Step 2 — Lagrange basis polynomials
Define the auxiliary polynomials
\[
\ell_j(x)=\prod_{i\neq j}\frac{x-x_i}{x_j-x_i}.
\]
Each \(\ell_j\) satisfies \(\ell_j(x_k)=\delta_{jk}\).

For the nodes above, \(\ell_0(x)=\frac{(x-1)(x-2)}{(0-1)(0-2)}=\frac12(x-1)(x-2)\).

The interpolant is then the linear combination
\[
p(x)=\sum_{j=0}^n y_j\ell_j(x).
\]

> [!WARNING]
> Omitting the normalization constants \(x_j-x_i\) produces a function that vanishes at the nodes but does not equal 1 at its own node.

### Step 3 — Newton’s divided-difference table
The first divided differences are simply slopes:
\[
f[x_i,x_{i+1}]=\frac{f(x_{i+1})-f(x_i)}{x_{i+1}-x_i}.
\]
Higher-order entries obey the recurrence
\[
f[x_i,\dots,x_{i+k}]=\frac{f[x_{i+1},\dots,x_{i+k}]-f[x_i,\dots,x_{i+k-1}]}{x_{i+k}-x_i}.
\]

The same three points give the table
\[
\begin{array}{ccc}
1 & & \\
  & 1 & \\
2 & & 1 \\
  & 2 & \\
4 & & 
\end{array}
\]
so the second divided difference is 1.

### Step 4 — Newton basis and nested multiplication
The interpolant admits the product representation
\[
p(x)=f[x_0]+f[x_0,x_1](x-x_0)+f[x_0,x_1,x_2](x-x_0)(x-x_1)+\cdots.
\]
Evaluating the right-hand side requires only \(n\) multiplications once the divided differences are known.

### Step 5 — Equivalence of the two forms
Both expressions are polynomials of degree \(\le n\) that interpolate the same data; by uniqueness they are identical.

### Step 6 — Textbook statement
Let \(x_0,\dots,x_n\) be distinct and let \(f\) be defined at these points. There exists a unique polynomial \(p_n\) of degree at most \(n\) such that \(p_n(x_i)=f(x_i)\) for each \(i\). It may be written in the Lagrange form
\[
p_n(x)=\sum_{j=0}^n f(x_j)\ell_j(x),\qquad\ell_j(x)=\prod_{i\neq j}\frac{x-x_i}{x_j-x_i}
\]
or in the Newton form
\[
p_n(x)=\sum_{k=0}^n f[x_0,\dots,x_k]\pi_k(x),\qquad\pi_k(x)=\prod_{i=0}^{k-1}(x-x_i).
\]

## 5. Worked examples — every step shown

**Example 1 — Linear interpolant through two points**  
*Given:* Nodes \(x_0=1\), \(x_1=3\) with values \(f(1)=2\), \(f(3)=8\).  
*Find:* The Lagrange and Newton forms of \(p_1(x)\).  

Lagrange basis:  
\[
\ell_0(x)=\frac{x-3}{1-3}=\frac{x-3}{-2},\qquad\ell_1(x)=\frac{x-1}{3-1}=\frac{x-1}{2}.
\]
Hence
\[
p_1(x)=2\cdot\frac{x-3}{-2}+8\cdot\frac{x-1}{2}=- (x-3)+4(x-1).
\]
Simplifying yields \(p_1(x)=3x-1\).  

Newton table: first divided difference \(f[1,3]=3\).  
Thus
\[
p_1(x)=2+3(x-1).
\]
Both expressions expand to the same linear polynomial.

**Reflection.** The arithmetic is identical once the divided difference is recognized as the slope.

**Example 2 — Quadratic through three equally spaced nodes**  
*Given:* \((0,1)\), \((1,3)\), \((2,7)\).  
*Find:* Newton form.  

Divided-difference table:
\[
\begin{array}{c|ccc}
0 & 1 \\
  &   & 2 \\
1 & 3 \\
  &   & 2 \\
2 & 7
\end{array}
\]
Second difference \(f[0,1,2]=0\).  
Newton polynomial:
\[
p(x)=1+2x+0\cdot x(x-1)=1+2x.
\]

**Reflection.** The zero second difference correctly signals that the data already lie on a straight line.

**Example 3 — Adding a fourth point to an existing Newton interpolant**  
*Given:* The cubic data set that produced the divided-difference coefficients \(1,2,1,1/3\). Add the node \(x_4=4\) with value 10.  
*Find:* The updated Newton polynomial.  

Append one more divided-difference column:
\[
f[0,1,2,3,4]=\frac{1/3-1/3}{4-(-1)}=0.
\]
The new term vanishes, so the polynomial is unchanged—an immediate illustration of the “flat” error term.

**Reflection.** Newton form permits incremental extension without recomputing earlier coefficients.

**Example 4 — Explicit Lagrange polynomial of degree 3**  
*Given:* Nodes \(-1,0,1,2\) with values \(1,0,1,8\).  
*Find:* \(p_3(x)\) in Lagrange form and evaluate at \(x=0.5\).  

Basis polynomials and the resulting linear combination produce
\[
p_3(x)=\frac14(x+1)x(x-2)+\frac12(x+1)(x-1)(x-2)+\frac18 x(x-1)(x-2).
\]
Substituting \(x=0.5\) yields the value 0.3125.

**Reflection.** Direct evaluation of the product form is \(O(n^2)\); barycentric weights reduce it to \(O(n)\).

## 6. Common traps and how to avoid them

| Trap                                      | Why it happens                                      | How to avoid it                                      |
|-------------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using the same node twice                 | Data entry error or misunderstanding uniqueness     | Verify all \(x_i\) distinct before constructing \(V\) or \(\ell_j\) |
| Forgetting the denominator in \(\ell_j\)  | Copying the product without normalization           | Always include the constant factor \(1/\prod_{i\neq j}(x_j-x_i)\) |
| Confusing forward differences with divided differences | Notation overlap in equally spaced tables         | Write the full divided-difference symbol \(f[x_i,\dots,x_k]\) |
| Evaluating Newton form left-to-right      | Destroys the nesting advantage                      | Use Horner-like accumulation from the highest term   |
| Ignoring floating-point cancellation      | Subtractive cancellation in high-order differences  | Monitor the magnitude of successive divided differences; switch to Chebyshev nodes when they grow |
| Assuming the interpolant converges as \(n\to\infty\) | Runge phenomenon on equispaced grids            | Always inspect the Lebesgue constant or choose Chebyshev extrema |
| Overwriting the original data array       | In-place update of the divided-difference table     | Keep a separate triangular array or copy the \(y\)-vector first |

## 7. The textbook-precise statement
Let \(x_0,\dots,x_n\) be distinct real numbers and let \(f:\{x_0,\dots,x_n\}\to\mathbb{R}\). There exists a unique polynomial \(p_n\in\mathbb{P}_n\) satisfying \(p_n(x_i)=f(x_i)\) for \(i=0,\dots,n\). It admits the representations
\[
p_n(x)=\sum_{j=0}^n f(x_j)\ell_j(x),\qquad\ell_j(x)=\prod_{\substack{0\le i\le n\\i\neq j}}\frac{x-x_i}{x_j-x_i}
\]
(Lagrange) and
\[
p_n(x)=\sum_{k=0}^n a_k\pi_k(x),\qquad a_k=f[x_0,\dots,x_k],\quad\pi_k(x)=\prod_{i=0}^{k-1}(x-x_i)
\]
(Newton), where the divided differences satisfy the recurrence given in Step 3. (Burden & Faires, *Numerical Analysis*, 10e, §3.1–3.2.)

## 8. Visual — diagram or schematic
```text
x:   x0     x1       x2       x3
     •------•--------•--------•
     |      |        |        |
f:   y0     y1       y2       y3
     |      |        |        |
     +--Δ1--+--Δ2----+--Δ3----+
            |        |        |
            +---Δ²---+---Δ²---+
                     |        |
                     +---Δ³---+
Newton coefficients read down the leftmost diagonal of the completed table.
```

## 9. The memory technique

**The hook.** Picture a triangular spreadsheet whose left edge holds the data values; each interior entry is the slope between the two entries above it. The Newton polynomial simply reads that left edge and multiplies the successive “rise-over-run” factors.

**What to overlearn.**  
- The Lagrange basis definition.  
- The divided-difference recurrence.  
- The uniqueness theorem for polynomials of degree \(\le n\).

**Spaced-repetition schedule.** Review the three overlearned items at 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback.** Re-derive uniqueness from the fact that any two interpolants differ by a polynomial with \(n+1\) roots, hence identically zero; rebuild the divided-difference table from its slope definition.

## 10. What this unlocks
Lagrange and Newton interpolation are the foundation for every subsequent numerical method that replaces an unknown function by a polynomial surrogate.

- Error formula and convergence theory for analytic functions.  
- Piecewise polynomial methods: splines and piecewise-cubic Hermite interpolation.  
- Numerical differentiation and integration (trapezoidal, Simpson, Gaussian quadrature nodes).  
- Solution of nonlinear equations via inverse interpolation.  
- Spectral collocation methods on Chebyshev grids.

## 11. Self-check — five questions, no answers
1. Write the explicit Lagrange polynomial of degree 2 that passes through \((0,0)\), \((1,1)\), \((2,0)\).  
2. Construct the divided-difference table for the data \((-2,3)\), \((-1,1)\), \((0,2)\), \((1,4)\) and read off the Newton form.  
3. Prove that the second divided difference \(f[x_0,x_1,x_2]\) equals half the second forward difference when the nodes are equally spaced with spacing \(h\).  
4. A student claims that adding a new node always increases the degree of the Newton interpolant. Give a counter-example with four nodes.  
5. Explain why the Lebesgue constant for equispaced nodes grows exponentially with \(n\), whereas for Chebyshev nodes it grows only logarithmically.