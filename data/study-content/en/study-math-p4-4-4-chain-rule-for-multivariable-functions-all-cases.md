## 1. The one-sentence answer
**The chain rule for multivariable functions states that the total rate of change of a composite function equals the sum, over all intermediate variables, of the product of the relevant partial derivatives along each dependency path.**

Consider a quantity \(z\) that depends on intermediate quantities \(x\) and \(y\), each of which may themselves depend on one or more independent parameters. Differentiating \(z\) with respect to any chosen parameter requires accounting for every route through which that parameter can influence \(z\). Each route contributes a product of local rates of change; the overall rate is their sum. This structure arises because the first-order Taylor expansion of a function of several variables is linear, so infinitesimal increments add when they reach the same output.

The same logic applies whether the outer function has one or several outputs and whether the independent variables number one or several. The rule therefore unifies the ordinary single-variable chain rule with every combination of total and partial derivatives that appears in vector calculus.

> [!NOTE]
> The decisive insight is that partial derivatives already isolate the contribution of one variable while holding others fixed; the chain rule merely reconnects those isolated contributions by multiplication along each path and addition across paths.

## 2. Why this matters — concrete and current
In orbital-mechanics software used by SpaceX for Falcon 9 trajectory optimization, the position of the vehicle is expressed as a composition of coordinate transformations and thrust models; the chain rule supplies the exact partial derivatives needed by the nonlinear programming solver that minimizes fuel while satisfying heating constraints.

Gradient-based training of convolutional neural networks at DeepMind relies on back-propagation, which is the chain rule applied to the directed acyclic graph of tensor operations; every weight update is a summed product of partial derivatives propagated backward through layers.

Semiconductor process simulators at TSMC compute how small changes in etch time and temperature affect transistor threshold voltage; the underlying finite-element models are nested functions of geometry and material parameters, and the chain rule yields the sensitivity gradients that drive automatic process calibration.

In general-relativistic magnetohydrodynamics codes used by the Event Horizon Telescope collaboration, the stress-energy tensor is a composite function of metric components and fluid four-velocity; the chain rule produces the conserved quantities required for stable long-term integration of accretion flows around Sagittarius A*.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Partial derivative             | Isolates the effect of one variable while others are held fixed |
| Total derivative               | Captures simultaneous change of several intermediate variables |
| First-order Taylor expansion in several variables | Justifies the linear approximation whose coefficients are the partial derivatives |
| Tree diagram of functional dependence | Organizes the distinct paths along which an independent variable can affect the output |

## 4. Building the idea — from intuition to formalism

### Step 1 — Recall the single-variable chain rule
If \(z = f(g(t))\), then the rate at which \(z\) changes with \(t\) is the product of the rate at which \(f\) changes with its argument and the rate at which that argument changes with \(t\).

Example: \(z = \sin(u)\), \(u = t^2\). Then \(\frac{dz}{dt} = \cos(t^2) \cdot 2t\).

Formal statement:
\[
\frac{dz}{dt} = f'(u(t)) \cdot u'(t).
\]

> [!WARNING]
> Treating the intermediate variable as constant when it actually depends on \(t\) produces a derivative of zero and erases the entire effect.

### Step 2 — Introduce a single intermediate layer with two variables
Let \(z = f(x,y)\) where both \(x\) and \(y\) depend on the same single parameter \(t\). An increment \(\mathrm{d}t\) produces increments \(\mathrm{d}x\) and \(\mathrm{d}y\) that each contribute to \(\mathrm{d}z\).

Example: \(z = x^2 + y^2\), \(x = \cos t\), \(y = \sin t\). Then \(\frac{dz}{dt} = 2x(-\sin t) + 2y(\cos t)\).

Formal statement:
\[
\frac{dz}{dt} = \frac{\partial f}{\partial x}\frac{dx}{dt} + \frac{\partial f}{\partial y}\frac{dy}{dt}.
\]

> [!WARNING]
> Omitting one of the two product terms yields an incomplete derivative that fails to satisfy the definition of the total derivative.

### Step 3 — Draw the dependency tree
Each arrow carries its own partial or ordinary derivative. Summation occurs at every node that receives more than one incoming contribution.

The tree for Step 2 is
```
t ──→ x ──→
        z
t ──→ y ──→
```
with the two paths multiplied and added.

### Step 4 — Allow two independent parameters
Now let \(x = x(s,t)\) and \(y = y(s,t)\). The partial derivative of \(z\) with respect to \(s\) follows the same pattern, treating \(t\) as constant.

Formal statement:
\[
\frac{\partial z}{\partial s} = \frac{\partial f}{\partial x}\frac{\partial x}{\partial s} + \frac{\partial f}{\partial y}\frac{\partial y}{\partial s}.
\]

### Step 5 — General composition with arbitrary numbers of variables
Suppose \(\mathbf{u} = (u_1,\dots,u_m)\) and each \(u_i\) depends on \(\mathbf{t} = (t_1,\dots,t_n)\). The Jacobian matrix of the composite map is the product of the individual Jacobian matrices.

Formal statement:
\[
D(f\circ\mathbf{u})(\mathbf{t}) = Df(\mathbf{u}(\mathbf{t}))\cdot D\mathbf{u}(\mathbf{t}).
\]

### Step 6 — Textbook statement of all cases
The preceding constructions are unified by the single requirement that every path in the dependency graph contributes a product of first partial derivatives, and all paths are summed.

## 5. Worked examples — every step shown

**Example 1 — Single intermediate variable, one parameter**  
*Given:* \(z = e^{x+y}\), \(x = t^2\), \(y = \ln t\).  
*Find:* \(\frac{dz}{dt}\).  

\[
\frac{\partial z}{\partial x} = e^{x+y}, \quad \frac{dx}{dt} = 2t \quad \Rightarrow \quad \frac{\partial z}{\partial x}\frac{dx}{dt} = e^{x+y}\cdot 2t
\]
*Why:* product of the two rates along the \(x\)-path.  

\[
\frac{\partial z}{\partial y} = e^{x+y}, \quad \frac{dy}{dt} = \frac{1}{t} \quad \Rightarrow \quad \frac{\partial z}{\partial y}\frac{dy}{dt} = e^{x+y}\cdot\frac{1}{t}
\]
*Why:* product along the \(y\)-path.  

Add the contributions:
\[
\frac{dz}{dt} = e^{x+y}\Bigl(2t + \frac{1}{t}\Bigr).
\]
**Final answer**  
\(\dfrac{dz}{dt}=e^{x+y}(2t+1/t)\)

*Reflection:* The exponential factor is common to both paths; recognizing shared factors prevents redundant computation in more complex trees.

**Example 2 — Two independent parameters**  
*Given:* \(w = x^2 y\), \(x = s+t\), \(y = s-t\).  
*Find:* \(\partial w/\partial s\) at \((s,t)=(1,0)\).  

\[
\frac{\partial w}{\partial x}=2xy, \quad \frac{\partial x}{\partial s}=1 \quad \Rightarrow \quad 2xy\cdot 1
\]
*Why:* chain-rule factor for the \(x\)-path.  

\[
\frac{\partial w}{\partial y}=x^2, \quad \frac{\partial y}{\partial s}=1 \quad \Rightarrow \quad x^2\cdot 1
\]
*Why:* chain-rule factor for the \(y\)-path.  

Sum and evaluate:
\[
\frac{\partial w}{\partial s}=2xy+x^2=2(1)(1)+1=3.
\]
**Final answer**  
\(\partial w/\partial s=3\) at the given point.

*Reflection:* Holding \(t\) fixed selects only the partials with respect to \(s\); confusing total and partial derivatives is the most frequent source of sign errors.

**Example 3 — Three intermediate variables**  
*Given:* \(v=f(x,y,z)=xyz\), \(x=u+v\), \(y=u-v\), \(z=uv\).  
*Find:* \(\partial v/\partial u\).  

Apply the three-term chain rule and substitute:
\[
\frac{\partial v}{\partial u}=yz\cdot 1 + xz\cdot 1 + xy\cdot v = yz + xz + xy v.
\]
At \((u,v)=(1,1)\):
\[
x=2,\; y=0,\; z=1 \quad \Rightarrow \quad \partial v/\partial u=0+2+0=2.
\]
**Final answer**  
\(\partial v/\partial u=2\)

*Reflection:* The middle term vanishes because \(y=0\); systematic substitution after differentiation avoids arithmetic mistakes.

**Example 4 — Matrix form**  
*Given:* \(\mathbf{r}(t)=(\cos t,\sin t)\), \(f(x,y)=x^2+y^2\).  
*Find:* \(D(f\circ\mathbf{r})(t)\).  

Jacobian of outer map: \([2x,2y]\).  
Jacobian of inner map: \([-\sin t,\cos t]^\top\).  
Product:
\[
[2\cos t,2\sin t]\begin{bmatrix}-\sin t\\\cos t\end{bmatrix}=-2\cos t\sin t+2\sin t\cos t=0.
\]
**Final answer**  
\(D(f\circ\mathbf{r})(t)=0\) (constant radius).

*Reflection:* The matrix product automatically sums the two paths; writing the Jacobians explicitly makes the cancellation visible.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using ordinary derivatives for all partials | Habit from single-variable calculus | Label every derivative as partial or total according to which variables are held fixed |
| Forgetting a path in the tree | Visualizing only the most obvious dependence | Draw the complete dependency diagram before differentiating |
| Treating an independent variable as constant when it is not | Misreading the problem statement | Explicitly list which symbols are independent before starting |
| Confusing \(\partial z/\partial x\) with \(\mathrm{d}z/\mathrm{d}x\) | Notation overload | Reserve \(\mathrm{d}\) exclusively for total derivatives along a single-parameter curve |
| Differentiating with respect to the wrong variable after substitution | Mechanical substitution without re-labeling | Keep the original variables until the final substitution step |
| Sign error when a variable appears in both numerator and denominator | Chain-rule multiplication of negative factors | Track the sign of each factor separately before multiplying |
| Applying the single-variable chain rule to a vector output | Assuming the outer function is scalar | Use the Jacobian matrix whenever the output dimension exceeds one |

## 7. The textbook-precise statement
Let \(U\subset\mathbb{R}^n\) be open, let \(\mathbf{g}:U\to\mathbb{R}^m\) be differentiable at \(\mathbf{a}\in U\), and let \(f:\mathbb{R}^m\to\mathbb{R}\) be differentiable at \(\mathbf{g}(\mathbf{a})\). Then the composite \(h=f\circ\mathbf{g}\) is differentiable at \(\mathbf{a}\) and
\[
Dh(\mathbf{a})=Df(\mathbf{g}(\mathbf{a}))\,D\mathbf{g}(\mathbf{a}).
\]
In coordinates this is the familiar sum-over-paths formula. (See Apostol, *Mathematical Analysis*, 2e, Theorem 12.11.)

## 8. Visual — diagram or schematic
```text
          t1 ──∂x/∂t1──► x ──∂f/∂x──►
                         │
          t2 ──∂x/∂t2──► │            f ──► total/partial of f
                         │
          t1 ──∂y/∂t1──► y ──∂f/∂y──►
                         │
          t2 ──∂y/∂t2──►
```
Each horizontal arrow is multiplied; vertical convergence at \(f\) implies summation.

## 9. The memory technique
1. **The hook** — Picture a chain of paper clips; each clip is a partial derivative. When several clips run in parallel they are taped together and their strengths add.
2. **What to overlearn** — The two-variable, one-parameter formula \(\frac{dz}{dt}=\frac{\partial f}{\partial x}\frac{dx}{dt}+\frac{\partial f}{\partial y}\frac{dy}{dt}\) and the Jacobian product rule.
3. **Spaced-repetition schedule** — Review the two-variable formula at 1 day, 3 days, 7 days, 16 days, 35 days; each time recompute one fresh example from scratch.
4. **First-principles fallback** — Return to the definition \(f(\mathbf{x}+\mathbf{h})=f(\mathbf{x})+Df(\mathbf{x})\mathbf{h}+o(\|\mathbf{h}\|)\) and substitute the linear approximations for every intermediate map.

## 10. What this unlocks
Mastery of the multivariable chain rule permits direct computation of gradients on arbitrary computational graphs, which is the foundation for implicit differentiation, constrained optimization via Lagrange multipliers, and the derivation of the divergence theorem from the fundamental theorem of calculus.

- Next: Implicit function theorem
- Next: Inverse function theorem
- Next: Differentiation under the integral sign
- Next: Back-propagation in deep networks

## 11. Self-check — five questions, no answers
1. Compute \(\frac{d}{dt}(x^2+y^3)\) where \(x=\sin t\), \(y=e^t\).
2. Find both \(\partial z/\partial s\) and \(\partial z/\partial t\) for \(z=xy+ y^2\), \(x=s^2+t\), \(y=st\).
3. A function \(w(u,v)\) satisfies \(u=x+y\), \(v=x-y\). Express \(\partial w/\partial x\) in terms of \(\partial w/\partial u\) and \(\partial w/\partial v\).
4. Why does the chain-rule expression for \(\frac{\partial}{\partial x}(f(g(x,y),h(x,y)))\) contain a term with \(\frac{\partial g}{\partial x}\) even though \(x\) is the variable of differentiation?
5. Construct a counter-example showing that the ordinary single-variable chain rule fails when two of the intermediate variables depend on the same parameter.