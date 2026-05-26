## 1. The one-sentence answer
**Clairaut’s theorem asserts that the mixed second partial derivatives of a sufficiently smooth function of two variables are identical.**

Consider a function \(f(x,y)\) whose first partial derivatives exist and whose second partial derivatives are continuous in a neighborhood of a point. Differentiating first with respect to \(x\) and then with respect to \(y\) yields exactly the same number as differentiating first with respect to \(y\) and then with respect to \(x\). The equality is not automatic; it requires the continuity hypothesis to rule out pathological behavior at the point in question. Without that hypothesis the two mixed derivatives may differ, though such examples are artificial and rarely appear in applications.

The result extends immediately to functions of more variables and to higher-order mixed derivatives: any permutation of the differentiation order produces the same outcome once all the relevant partials are continuous. This commutativity of differentiation operators is what permits us to write \(f_{xy}\) without specifying order.

> [!NOTE]
> The single most important insight is that continuity of the second partials is the precise “switch” that turns two a priori different limits into one and the same number; drop continuity and the switch can flip.

## 2. Why this matters — concrete and current
In computational fluid dynamics, NASA’s OVERFLOW solver evaluates the Hessian of the pressure field to obtain viscous stresses; symmetry of that Hessian (guaranteed by Clairaut) halves the storage and guarantees that the discrete divergence and curl operators remain consistent on curvilinear grids.

In machine-learning libraries such as JAX and PyTorch, the Hessian-vector products used by second-order optimizers (e.g., K-FAC at DeepMind) rely on the fact that \(\partial^2 L / \partial w_i \partial w_j = \partial^2 L / \partial w_j \partial w_i\); any implementation that inadvertently broke this symmetry would produce non-symmetric curvature matrices and divergent training runs.

Maxwell’s relations in thermodynamics follow directly from Clairaut applied to the differential of internal energy \(dU = T\,dS - P\,dV\); the equality \(\partial^2 U / \partial S \partial V = \partial^2 U / \partial V \partial S\) yields the experimentally verified identity \((\partial T / \partial V)_S = -(\partial P / \partial S)_V\), which underpins the design of supercritical CO₂ turbines.

In semiconductor electrostatics, the Poisson–Boltzmann equation for carrier density contains the term \(\partial^2 \phi / \partial x \partial y\); device simulators such as Sentaurus enforce Clairaut symmetry to guarantee that the computed capacitance matrix remains symmetric positive definite, a prerequisite for stable Newton–Raphson convergence.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| First-order partial derivatives | Mixed partials are obtained by differentiating an already-computed first partial. |
| Limit definition of the derivative | The equality is an equality of two iterated limits; without the definition one cannot see where continuity intervenes. |
| Continuity of functions of several variables | The hypothesis that guarantees the two iterated limits coincide. |
| Open disk (or open rectangle) in \(\mathbb{R}^2\) | The neighborhood on which all second partials must exist and be continuous. |

## 4. Building the idea — from intuition to formalism

### Step 1 — First partial derivatives exist
A function \(f(x,y)\) possesses a partial derivative with respect to \(x\) at \((a,b)\) when the ordinary one-variable limit
\[
f_x(a,b) = \lim_{h\to 0} \frac{f(a+h,b)-f(a,b)}{h}
\]
exists. The same holds for \(f_y\). These are ordinary slopes along lines parallel to the coordinate axes.

**Example.** Let \(f(x,y)=x^2 y\). Then \(f_x(1,2)=2\cdot 1\cdot 2=4\) and \(f_y(1,2)=1^2=1\).

**Formal statement.**
\[
f_x(a,b)=\lim_{h\to0}\frac{f(a+h,b)-f(a,b)}{h},\qquad
f_y(a,b)=\lim_{k\to0}\frac{f(a,b+k)-f(a,b)}{k}.
\]

> [!WARNING]
> If either first partial fails to exist, the entire discussion of mixed partials is undefined at that point.

### Step 2 — Mixed partials are iterated limits
The mixed partial \(f_{xy}\) is obtained by differentiating \(f_x\) with respect to \(y\):
\[
f_{xy}(a,b)=\lim_{k\to0}\frac{f_x(a,b+k)-f_x(a,b)}{k}.
\]
Likewise \(f_{yx}\) differentiates \(f_y\) with respect to \(x\). These are two different sequences of limits.

**Example.** Continuing with \(f(x,y)=x^2 y\),
\[
f_{xy}(1,2)=\lim_{k\to0}\frac{2\cdot1\cdot(2+k)-2\cdot1\cdot2}{k}=2,
\]
and \(f_{yx}(1,2)=2\) as well.

**Formal statement.**
\[
f_{xy}(a,b)=\lim_{k\to0}\frac1k\Bigl(\lim_{h\to0}\frac{f(a+h,b+k)-f(a,b+k)}{h}-\lim_{h\to0}\frac{f(a+h,b)-f(a,b)}{h}\Bigr).
\]

> [!WARNING]
> Students frequently treat \(f_{xy}\) as a single object rather than an iterated limit; this hides the place where continuity is required.

### Step 3 — Equality holds for polynomials and rational functions with continuous denominators
Direct computation on any polynomial, or on any rational function whose denominator does not vanish, shows \(f_{xy}=f_{yx}\). The algebraic cancellation is automatic.

**Example.** \(f(x,y)=e^{xy}\). Then \(f_x= y e^{xy}\), \(f_{xy}=e^{xy}+xy e^{xy}\), and the same expression appears for \(f_{yx}\).

**Formal statement.** If all second partials exist and are continuous on an open set containing \((a,b)\), then \(f_{xy}(a,b)=f_{yx}(a,b)\).

> [!WARNING]
> The polynomial case creates the false impression that equality is free; the next step supplies the counter-example that forces the continuity hypothesis.

### Step 4 — A counter-example when continuity fails
Define
\[
f(x,y)=\begin{cases}
xy\frac{x^2-y^2}{x^2+y^2} & (x,y)\ne(0,0),\\
0 & (x,y)=(0,0).
\end{cases}
\]
Direct calculation yields \(f_{xy}(0,0)=-1\) while \(f_{yx}(0,0)=1\).

**Formal statement.** The second partials exist everywhere yet are discontinuous at the origin; consequently the mixed derivatives differ.

> [!WARNING]
> Omitting the continuity check on this example leads students to believe the theorem is false in general.

### Step 5 — The continuity hypothesis closes the gap
When \(f_{xy}\) and \(f_{yx}\) are both continuous at \((a,b)\), the two iterated limits become equal by a standard \(\varepsilon\)-\(\delta\) argument that interchanges the order of taking limits.

**Formal statement (Clairaut).** If \(f_{xy}\) and \(f_{yx}\) exist in a neighborhood of \((a,b)\) and are continuous at \((a,b)\), then \(f_{xy}(a,b)=f_{yx}(a,b)\).

## 5. Worked examples — every step shown

**Example 1 — Elementary polynomial**  
*Given:* \(f(x,y)=x^3 y^2\).  
*Find:* \(f_{xy}(1,1)\) and \(f_{yx}(1,1)\).  

Compute \(f_x=3x^2 y^2\).  
*Why:* differentiate treating \(y\) constant.  

Differentiate with respect to \(y\): \(f_{xy}=6x^2 y\).  
*Why:* product rule on \(3x^2 y^2\).  

At \((1,1)\): \(6\cdot1\cdot1=6\).  

Now \(f_y=2x^3 y\), then \(f_{yx}=6x^2 y=6\) at \((1,1)\).  
*Why:* identical algebraic expression appears.  

**6**  

*Reflection.* The equality is immediate because every term is a monomial; the only skill required is careful bookkeeping of coefficients.

**Example 2 — Exponential**  
*Given:* \(f(x,y)=e^{x+y}\).  
*Find:* Verify \(f_{xy}=f_{yx}\) everywhere.  

\(f_x=e^{x+y}\), \(f_{xy}=e^{x+y}\).  
*Why:* derivative of \(e^{x+y}\) w.r.t. \(y\) is itself.  

\(f_y=e^{x+y}\), \(f_{yx}=e^{x+y}\).  
*Why:* same function.  

**\(e^{x+y}\)**  

*Reflection.* The exponential is its own derivative, so the order never matters once the first partial is formed.

**Example 3 — Trigonometric with chain rule**  
*Given:* \(f(x,y)=\sin(x^2 y)\).  
*Find:* \(f_{xy}(0,\pi/2)\).  

\(f_x=2x y\cos(x^2 y)\).  
*Why:* chain rule, derivative of inside w.r.t. \(x\).  

Then \(f_{xy}=2y\cos(x^2 y)+2x y(-2x^2 y\sin(x^2 y))\) evaluated at \((0,\pi/2)\) yields \( \pi \).  
*Why:* product rule on \(2x y \cos(\cdot)\).  

Repeating in reverse order produces the identical value \(\pi\).  

**\(\pi\)**  

*Reflection.* The chain-rule term containing \(\sin\) vanishes at the evaluation point, illustrating that some contributions may disappear yet the final numbers still match.

**Example 4 — Counter-example verification**  
*Given:* the piecewise function of Step 4.  
*Find:* Show \(f_{xy}(0,0)\ne f_{yx}(0,0)\).  

Along the path \(k=0\) first then \(h\), one obtains \(-1\); the opposite order yields \(1\).  
*Why:* the difference quotient limits depend on the path taken when continuity is absent.  

**\(f_{xy}(0,0)=-1\), \(f_{yx}(0,0)=1\)**  

*Reflection.* This is the canonical warning that continuity cannot be omitted.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming equality without checking continuity | Most textbook exercises are polynomials, so equality always holds | Explicitly verify that the second partials are continuous on an open disk before invoking the theorem |
| Confusing existence of partials with continuity | Students see that first partials exist and stop | Remember the theorem’s hypothesis concerns the *second* partials |
| Interchanging limits without justification | The notation \(f_{xy}\) hides two limits | Write the iterated-limit expression in full at least once |
| Evaluating only at a single point | The counter-example is discontinuous only at one point | Check continuity in a whole neighborhood, not merely at the point |
| Forgetting that higher-order mixed derivatives also commute | The pattern is the same but the indices grow | State the general multi-index version once the two-variable case is clear |
| Applying the theorem on a domain with holes | Continuity may fail across a slit | Confirm the open set is path-connected and contains a disk around the point |
| Sign errors in chain-rule examples | Many minus signs appear when differentiating \(\cos\) or \(\ln\) | Keep an extra line that records the sign of each factor |

## 7. The textbook-precise statement
**Theorem (Clairaut).** Let \(D\subset\mathbb{R}^2\) be an open disk containing the point \((a,b)\). Suppose the second partial derivatives \(f_{xy}\) and \(f_{yx}\) exist on \(D\) and are continuous at \((a,b)\). Then
\[
f_{xy}(a,b)=f_{yx}(a,b).
\]
(See Stewart, *Calculus*, 9e, §14.3, Theorem 3.)

## 8. Visual — diagram or schematic
```text
          y
          ^
          |
     f_y ─┼─► (direction of first y-derivative)
          |
          |
x ◄───────┼──────────────►
          |
     f_x ─┼─►
          |
   f_xy   f_yx   (two paths to the same mixed derivative)
          |
```
The diagram shows the two possible routes from the value \(f(a,b)\) to the mixed second derivative at the same point: right-then-up versus up-then-right. Under the continuity hypothesis both arrows terminate at the identical number.

## 9. The memory technique

**The hook.** Picture a perfectly smooth sheet of rubber; pressing first along \(x\) then along \(y\) produces the same crease as the opposite order—only a tear (discontinuity) lets the creases differ.

**What to overlearn.**  
- The exact statement: continuity of \(f_{xy}\) and \(f_{yx}\) on an open disk \(\implies\) equality.  
- The standard counter-example function and the two values \(-1\) and \(1\) at the origin.

**Spaced-repetition schedule.** Review the statement and counter-example at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback.** Re-derive the equality by writing both mixed partials as iterated limits, subtract them, and apply the mean-value theorem twice; the continuity hypothesis makes the remainder terms vanish.

## 10. What this unlocks
Clairaut’s theorem is the justification for treating the Hessian matrix of any \(C^2\) function as symmetric; this symmetry propagates into every subsequent topic that uses second derivatives.

- Taylor expansion of several variables  
- Classification of critical points via the Hessian determinant  
- Equality of mixed partials in vector calculus identities (e.g., \(\nabla\times\nabla f=0\))  
- Maxwell relations and thermodynamic potentials  
- Automatic differentiation algorithms that assume symmetric Jacobians of gradients

## 11. Self-check — five questions, no answers
1. Compute \(f_{xy}\) and \(f_{yx}\) at \((0,0)\) for \(f(x,y)=x y (x^2-y^2)/(x^2+y^2)\) when \((x,y)\ne(0,0)\) and \(f(0,0)=0\); are they equal?

2. State the precise topological condition on the domain that appears in Clairaut’s theorem.

3. Give an example of a function whose first partials exist everywhere, whose second partials exist everywhere, yet whose mixed partials are discontinuous at one point.

4. Why does the proof of Clairaut’s theorem fail if we only assume that \(f_{xy}\) and \(f_{yx}\) exist in a neighborhood but are not continuous at the point?

5. In the expression for the second-order Taylor polynomial of \(f(x,y)\) about \((a,b)\), which coefficients would be written incorrectly if \(f_{xy}(a,b)\ne f_{yx}(a,b)\)?