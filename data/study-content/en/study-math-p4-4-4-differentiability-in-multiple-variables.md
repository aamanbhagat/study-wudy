## 1. The one-sentence answer
**Differentiability in several variables means the function can be approximated by a linear map at a point with an error that vanishes faster than the distance to that point.**

In one variable the derivative is a number that gives the slope of the tangent line. In several variables the same idea must hold simultaneously in every direction, so the approximating object is a linear transformation whose matrix is built from the partial derivatives. The definition therefore requires that the remainder after subtracting this linear piece, when divided by the Euclidean length of the displacement vector, tends to zero; mere existence of partial derivatives is not enough.

The extra strength of the definition automatically forces continuity and guarantees that the directional derivative exists in every direction and equals the linear map applied to the direction vector. Consequently the graph lies against its tangent hyperplane more tightly than any mere collection of directional slopes would guarantee.

> [!NOTE]
> The single limit condition replaces an entire family of one-variable limits; once it holds, all directional derivatives are automatically consistent with one linear object.

## 2. Why this matters — concrete and current
In training large neural networks, back-propagation computes the gradient of the loss; the optimizer treats the loss as differentiable so that a single linear map (the Jacobian) supplies the steepest-descent direction in parameter space. Modern frameworks such as PyTorch and JAX rely on automatic differentiation that is provably correct only when the underlying functions satisfy the multivariable definition at every step.

Aircraft flight simulators solve the six-degree-of-freedom rigid-body equations whose right-hand sides must be differentiable for the numerical integrators to maintain both stability and physical fidelity; discontinuities in the aerodynamic coefficients produce non-physical jumps in predicted forces.

Semiconductor process simulation packages such as Sentaurus solve coupled nonlinear PDEs for carrier transport; the Newton–Raphson solver linearizes the system at each iteration precisely because the current-density functions are required to be differentiable with respect to electrostatic potential and quasi-Fermi levels.

Computer-graphics rendering pipelines evaluate the reflectance equation at each shading point; the Cook–Torrance microfacet model must be differentiable so that gradient-based inverse rendering can recover material parameters from photographs, a technique now used in industrial light-stage capture at companies such as Disney Research.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Limits of functions \(\mathbb{R}^n\to\mathbb{R}\) | The very definition is a limit statement in several variables. |
| Partial derivatives      | They supply the entries of the candidate derivative matrix. |
| Linear transformations   | The derivative itself is required to be a linear map.     |
| Norms on \(\mathbb{R}^n\) | The error term is measured with \(\|h\|\), usually the Euclidean norm. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Tangent line becomes tangent hyperplane
A function of several variables should lie against a flat “sheet” near a point so that the vertical gap shrinks faster than the horizontal distance.  
For \(f(x,y)=x^2+y^2\) at \((0,0)\), the flat sheet is the \(xy\)-plane itself.  
Formally, we seek a linear map \(L\) such that
\[
\lim_{h\to 0}\frac{|f(a+h)-f(a)-L(h)|}{\|h\|}=0.
\]
> [!WARNING]
> Replacing the single limit by separate one-variable limits along each axis allows functions whose graphs contain sharp ridges invisible to the axes.

### Step 2 — Partial derivatives give candidate slopes
Compute the ordinary derivatives while freezing all but one variable; these numbers become the entries of the matrix of \(L\).  
At \((1,2)\) for \(f(x,y)=x^2 y\), \(\partial f/\partial x=2xy=4\) and \(\partial f/\partial y=x^2=1\).  
The candidate map is therefore \(L(h,k)=4h+k\).

### Step 3 — The remainder must vanish faster than linear
Subtract the linear piece and divide by \(\|h\|\). The resulting scalar must approach zero regardless of the path taken by \(h\).  
If the limit fails along even one path, the function is not differentiable.

### Step 4 — Existence of partials is insufficient
The classic counter-example \(f(x,y)=\frac{xy}{x^2+y^2}\) for \((x,y)\ne(0,0)\) and \(f(0,0)=0\) has both partial derivatives zero at the origin, yet the limit along \(y=x\) is \(1/2\), so the remainder does not tend to zero.

### Step 5 — Continuity of the partial derivatives guarantees differentiability
If all first partial derivatives exist in a neighborhood and are continuous at the point, the limit condition holds automatically. This is the most common sufficient condition used in practice.

### Step 6 — The textbook definition
A function \(f:\mathbb{R}^n\to\mathbb{R}^m\) is differentiable at \(a\) if there exists a linear map \(Df(a)\) such that
\[
\lim_{h\to0}\frac{\|f(a+h)-f(a)-Df(a)(h)\|}{\|h\|}=0.
\]
When the partial derivatives exist and are continuous, \(Df(a)\) is represented by the Jacobian matrix.

## 5. Worked examples — every step shown

**Example 1 — Simple quadratic**  
*Given:* \(f(x,y)=x^2+y^2\), \(a=(0,0)\).  
*Find:* Is \(f\) differentiable at \(a\)?  

The candidate linear map is the zero map.  
\[
\frac{|f(h,k)-0-0|}{\sqrt{h^2+k^2}}=\frac{h^2+k^2}{\sqrt{h^2+k^2}}=\sqrt{h^2+k^2}\to0.
\]
*Why:* The algebraic identity follows by factoring the numerator.  
**Final answer:** Differentiable, \(Df(0,0)=0\).

*Reflection:* The function is smooth; the limit is elementary because the remainder is quadratic.

**Example 2 — Mixed term**  
*Given:* \(f(x,y)=xy\) at \((1,1)\).  
*Find:* The derivative map.  

Partials: \(f_x=y=1\), \(f_y=x=1\).  
Remainder: \(f(1+h,1+k)-f(1,1)-(h+k)=hk\).  
\[
\frac{|hk|}{\sqrt{h^2+k^2}}\le\frac{(h^2+k^2)/2}{\sqrt{h^2+k^2}}=\frac12\sqrt{h^2+k^2}\to0.
\]
*Why:* AM-GM bounds the product by the quadratic mean.  
**Final answer:** \(Df(1,1)(h,k)=h+k\).

*Reflection:* Even though the function is bilinear, the remainder still vanishes faster than linear.

**Example 3 — Classic non-differentiable function**  
*Given:* \(f(x,y)=\frac{xy}{\sqrt{x^2+y^2}}\) for \((x,y)\ne0\), \(f(0,0)=0\).  
*Find:* Differentiability at origin.  

Partials at origin are zero, yet along \(y=x\) the remainder quotient equals \(1/(2\sqrt{2})\neq0\).  
**Final answer:** Not differentiable.

*Reflection:* Partial derivatives exist but the joint limit fails; this is the canonical trap.

**Example 4 — Sufficient condition via continuity**  
*Given:* \(f(x,y)=x^3\sin y\) at any point.  
*Find:* Differentiability.  

Both partials \(3x^2\sin y\) and \(x^3\cos y\) are continuous everywhere, hence \(f\) is differentiable everywhere.  
**Final answer:** Differentiable on \(\mathbb{R}^2\).

*Reflection:* Continuity of partials is an easy-to-check shortcut that covers most textbook examples.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Checking only the partial derivatives | Textbooks often compute partials first, creating the illusion that they suffice | Always verify the full limit definition or invoke the continuity theorem |
| Using only axial paths in the limit | Students forget that \(h\) can approach along any curve | Test polar or parametric paths \(h=t\cdot u\) with arbitrary unit vector \(u\) |
| Confusing directional derivatives with the derivative | Directional derivatives may exist yet fail to assemble into one linear map | Compute the candidate Jacobian and test the remainder directly |
| Forgetting the norm in the denominator | The expression looks like an ordinary limit without it | Write \(\|h\|\) explicitly at every step |
| Assuming symmetry of mixed partials | Equality of mixed partials requires continuity of the second derivatives | Differentiability alone does not imply \(f_{xy}=f_{yx}\) |
| Treating the Jacobian as a scalar | In higher dimensions the derivative is a matrix | Keep matrix notation until the very end of a calculation |
| Neglecting the domain of the partials | Partials may exist only on a lower-dimensional set | Confirm that partials exist throughout an open neighborhood |

## 7. The textbook-precise statement
Let \(U\subset\mathbb{R}^n\) be open and \(f:U\to\mathbb{R}^m\). Then \(f\) is differentiable at \(a\in U\) if there exists a linear map \(L:\mathbb{R}^n\to\mathbb{R}^m\) such that
\[
\lim_{h\to0}\frac{\|f(a+h)-f(a)-L(h)\|}{\|h\|}=0.
\]
When this holds, \(L\) is unique and is denoted \(Df(a)\). If all first-order partial derivatives exist in a neighborhood of \(a\) and are continuous at \(a\), then \(f\) is differentiable at \(a\) and the matrix of \(Df(a)\) is the Jacobian matrix. (Stewart, *Calculus*, 9e, §14.4, Theorem 3.)

## 8. Visual

```text
          z
          |
          |   graph of f
         /|\
        / | \
   tangent plane ----> L(h)
      /   |   \
     /    |    \
    /     a     \
   +-------------+-- y
  /
 x
```
The vertical gap between the curved surface and the tangent plane shrinks faster than the horizontal distance from \(a\).

## 9. The memory technique

1. **The hook** — Picture the graph “kissing” its tangent plane with an error smaller than any linear tilt; the plane must be perfectly flat, not wrinkled along hidden diagonals.  
2. **What to overlearn** — The exact limit definition with the norm in the denominator; the theorem that continuous partials imply differentiability.  
3. **Spaced-repetition schedule** — Review the definition after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the candidate linear map from the partial derivatives, substitute into the remainder, and test the limit in polar coordinates.

## 10. What this unlocks
Differentiability supplies the linear approximation required by every subsequent technique in multivariable calculus and its applications.  

- The inverse- and implicit-function theorems rest on the invertibility of \(Df(a)\).  
- Taylor expansions of higher order begin with the first-order linear term guaranteed by differentiability.  
- The chain rule for vector-valued functions is stated and proved using the linear-map definition.  
- Gradients, Hessians, and critical-point classification all presuppose the existence of \(Df\).

## 11. Self-check — five questions, no answers
1. State the precise limit definition of differentiability for a map \(f:\mathbb{R}^2\to\mathbb{R}\) at a point \(a\).  
2. Construct a function whose partial derivatives exist at the origin yet the function fails to be differentiable there.  
3. Prove that if the first partial derivatives exist in a neighborhood and are continuous at \(a\), then \(f\) is differentiable at \(a\).  
4. Compute the Jacobian matrix of \(f(x,y,z)= (x^2 y, e^{yz})\) and verify the differentiability condition directly at \((1,0,0)\).  
5. Explain why the existence of all directional derivatives at a point does not imply differentiability.