## 1. The one-sentence answer
**Linear approximation replaces a differentiable function near a point with its tangent line, while differentials express the resulting change as \(dy = f'(x)\,dx\).**

The tangent line at a point on a smooth curve matches both the function value and its instantaneous slope there. Because the curve bends only gradually, this straight line stays close to the curve for a short distance on either side. Replacing the curve with the line therefore turns a hard evaluation into simple arithmetic.

Differentials formalize the same idea without naming a second point. They treat an infinitesimal horizontal change \(dx\) as an independent quantity and produce the corresponding vertical change \(dy\) by multiplying by the derivative. The two notions are interchangeable: the linear approximation is exactly the statement that \(\Delta y \approx dy\) when the step size is small.

> [!NOTE]
> The error in the approximation shrinks faster than the step size itself; that quadratic vanishing is what makes the tangent line useful for practical calculation.

## 2. Why this matters — concrete and current
Spacecraft navigation at JPL relies on linear updates to predicted trajectories. When a probe is millions of kilometres away, even a one-metre-per-second velocity error grows into kilometres of position error; mission teams therefore linearize the gravitational equations about the current state vector and propagate only the first-order correction until the next measurement arrives.

Semiconductor process control uses differential estimates to keep transistor gate lengths inside a few nanometres. Metrology tools measure a test structure, compute the local sensitivity of etch rate to chamber pressure, and issue a differential correction to the next wafer batch, avoiding the need to re-solve the full plasma model every few minutes.

Gradient-based optimizers in large language-model training repeatedly replace the loss surface by its tangent hyperplane. Each parameter update is precisely a linear approximation step; the enormous scale of these models makes higher-order terms computationally prohibitive, so the first-order differential supplies the only feasible descent direction.

Surveying instruments such as total stations convert tiny angle and distance readings into coordinate shifts via differentials. A 1-arc-second angular error at 500 m produces a transverse displacement of roughly 2.4 mm; the instrument firmware applies the differential map \(d\mathbf{r} = \mathbf{J}\,d\boldsymbol{\theta}\) to report that displacement instantly.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Derivative at a point    | Supplies the slope of the tangent line                    |
| Limit definition of derivative | Guarantees that the error term vanishes faster than the step size |
| Continuity               | Ensures the function value itself does not jump away from the tangent |

## 4. Building the idea — from intuition to formalism

### Step 1 — The tangent line matches value and slope
A smooth curve and its tangent share both height and tilt at the contact point, so nearby the two graphs are almost indistinguishable.

Consider \(f(x) = x^2\) at \(a = 1\). Then \(f(1) = 1\) and \(f'(1) = 2\), giving the line \(y = 2(x-1) + 1\).

The tangent line is
\[
L(x) = f(a) + f'(a)(x-a).
\]

> [!WARNING]
> If the derivative does not exist, no unique tangent line is defined and the approximation cannot even be stated.

### Step 2 — The vertical gap shrinks faster than the horizontal step
Write an arbitrary nearby point as \(x = a + h\). The actual change in function value is \(\Delta y = f(a+h) - f(a)\). The tangent predicts exactly \(f'(a)h\). Their difference is the remainder \(R(h)\).

For the same quadratic,
\[
\Delta y = (1+h)^2 - 1 = 2h + h^2, \qquad f'(a)h = 2h,
\]
so
\[
R(h) = h^2.
\]

Formally,
\[
f(a+h) = f(a) + f'(a)h + R(h), \qquad \lim_{h\to 0} \frac{R(h)}{h} = 0.
\]

> [!WARNING]
> Treating \(R(h)\) as negligible without verifying the limit can produce large relative errors when \(h\) is not tiny.

### Step 3 — The linear approximation is the tangent line itself
Discarding the remainder yields the practical estimate
\[
f(a+h) \approx f(a) + f'(a)h.
\]
In function notation this is
\[
f(x) \approx L(x) = f(a) + f'(a)(x-a).
\]

### Step 4 — Differentials package the same relation without a second point
Introduce two new symbols: let \(dx\) be any small increment (often equal to \(h\)) and define
\[
dy := f'(x)\,dx.
\]
Then the approximation reads \(\Delta y \approx dy\).

### Step 5 — The differential notation is consistent with the derivative
Dividing both sides by \(dx\) recovers
\[
\frac{dy}{dx} = f'(x),
\]
so the differential formalism is merely a convenient rewriting of the derivative already known to exist.

### Step 6 — The textbook statement collects all hypotheses
If \(f\) is differentiable at \(a\), then the linear function \(L(x)\) satisfies
\[
\lim_{x\to a}\frac{f(x)-L(x)}{x-a}=0.
\]

## 5. Worked examples — every step shown

**Example 1 — Square-root evaluation**  
*Given:* Approximate \(\sqrt{1.04}\) using the linear approximation at \(a=1\).  
*Find:* The numerical estimate and the exact error.

- Write \(f(x)=\sqrt{x}\).  
  *Why:* The function is differentiable for \(x>0\).
- Compute \(f(1)=1\), \(f'(x)=\frac12 x^{-1/2}\), so \(f'(1)=\frac12\).  
  *Why:* Direct substitution into the derivative formula.
- Form the tangent: \(L(x)=1+\frac12(x-1)\).  
  *Why:* Apply the definition of \(L(x)\).
- Substitute \(x=1.04\): \(L(1.04)=1+\frac12(0.04)=1.02\).  
  *Why:* Arithmetic evaluation.
- True value \(\sqrt{1.04}\approx 1.0198039\), error \(\approx 0.000196\).  
  *Why:* Comparison with calculator output.

**1.02**

*Reflection:* The step \(h=0.04\) is modest; the quadratic remainder \(R(h)=-\frac14 h^2\) already predicts an error of order \(10^{-4}\).

**Example 2 — Sine in radians**  
*Given:* Approximate \(\sin(0.03)\).  
*Find:* Linear estimate.

- \(f(x)=\sin x\), \(a=0\), \(f(0)=0\), \(f'(0)=1\).  
  *Why:* Standard values at the origin.
- \(L(x)=x\).  
  *Why:* Tangent line collapses to the identity.
- \(\sin(0.03)\approx 0.03\).  
  *Why:* Direct substitution.

**0.03**

*Reflection:* The next term in the Taylor series is \(-\frac{(0.03)^3}{6}\approx -4.5\times10^{-6}\), confirming the linear error scale.

**Example 3 — Differential of a product**  
*Given:* \(y=x^2\sin x\), \(x= \pi/2\), \(dx=0.01\).  
*Find:* Estimate for \(\Delta y\).

- Compute \(dy = (2x\sin x + x^2\cos x)\,dx\).  
  *Why:* Product rule inside the differential.
- At \(x=\pi/2\): \(dy = ( \pi\cdot 1 + (\pi/2)^2\cdot 0 )\cdot 0.01 = 0.031416\).  
  *Why:* Numerical substitution.

**0.031416**

*Reflection:* The differential automatically supplies the correct linear combination of increments without expanding the whole product.

**Example 4 — Relative error propagation**  
*Given:* The radius of a sphere is measured as \(r=5\) cm with possible error \(dr=0.05\) cm.  
*Find:* Approximate relative error in volume.

- \(V=\frac43\pi r^3\), so \(dV=4\pi r^2\,dr\).  
  *Why:* Differentiate the volume formula.
- Relative error \(\frac{dV}{V}=\frac{3\,dr}{r}\).  
  *Why:* Divide differentials: \(\frac{dV}{V}=3\frac{dr}{r}\).
- Insert values: \(\frac{3\cdot 0.05}{5}=0.03\) or 3 %.  
  *Why:* Arithmetic.

**3 %**

*Reflection:* The factor of three arises because volume scales with the cube of radius; differentials capture this scaling instantly.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using the approximation far from \(a\) | The limit condition fails when \(|h|\) is large | Always check that \(|x-a|\) is small relative to the scale of \(f\) |
| Confusing \(dy\) with \(\Delta y\) | Notation looks identical at first glance    | Keep the exact definition \(dy=f'(x)dx\) written explicitly |
| Forgetting the domain of \(f'\)   | Derivative may not exist everywhere         | Verify differentiability at the chosen base point before writing \(L(x)\) |
| Treating differentials as ordinary fractions without care | They behave like fractions only to first order | Use them strictly as shorthand for the linear term |
| Applying the formula to a non-differentiable kink | Absolute-value or step functions            | Graph or test the derivative limit before proceeding |
| Reporting absolute instead of relative error | Physical context usually cares about scale  | Always compute both \(\Delta y\) and \(\frac{\Delta y}{y}\) when units matter |
| Neglecting higher-order terms in error analysis | Quadratic remainder is invisible in the linear step | Estimate \(R(h)\) via the second derivative when precision is required |

## 7. The textbook-precise statement
Let \(f\) be differentiable on an open interval containing \(a\). The linear approximation (or tangent-line approximation) to \(f\) at \(a\) is the function
\[
L(x)=f(a)+f'(a)(x-a).
\]
It satisfies
\[
\lim_{x\to a}\frac{f(x)-L(x)}{x-a}=0.
\]
The differential of \(f\) at \(x\) is the linear function
\[
dy=f'(x)\,dx.
\]
(See Stewart, *Calculus*, 9e, §3.10.)

## 8. Visual — diagram or schematic
```text
y
↑
|               curve y=f(x)
|              /
|             /   tangent L(x)
|            /   /
|           /   /
|          /   /
|         /   /
|        /   /
|_______/___/___________→ x
        a   a+h
```
- Horizontal axis labelled \(x\), vertical axis labelled \(y\).
- Curve passes through \((a,f(a))\) and bends gently upward.
- Straight line through the same point with slope \(f'(a)\).
- Small horizontal segment of length \(h\) from \(a\) to \(a+h\); vertical distance from curve to line at \(a+h\) is the remainder \(R(h)\).

## 9. The memory technique

**The hook**  
Picture the tangent line as a short steel ruler clamped to the curve at one point; any nearby measurement is read directly off the ruler instead of following the bending metal.

**What to overlearn**  
1. \(L(x)=f(a)+f'(a)(x-a)\)  
2. \(dy=f'(x)\,dx\)  
3. The limit \(\lim_{h\to0}R(h)/h=0\)

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Start from the definition of the derivative, subtract the linear term, divide by \(h\), and take the limit; the resulting zero limit is the only property required to justify every later use.

## 10. What this unlocks
Linear approximation supplies the local linear model that underpins Newton’s method, numerical differentiation, and the first term of every Taylor expansion. It also extends immediately to partial derivatives and the total differential in several variables, forming the foundation of gradient descent and the inverse-function theorem.

- Newton’s method for root finding  
- Taylor polynomials of higher degree  
- Multivariable chain rule and gradient  
- Error analysis in numerical integration  
- Linearization of nonlinear ODEs

## 11. Self-check — five questions, no answers
1. Using \(a=4\), obtain the linear approximation to \(\sqrt{x}\) and evaluate it at \(x=4.1\).

2. Compute the differential \(dy\) for \(y=\tan x\) at \(x=\pi/4\) when \(dx=0.02\); then compare with the actual change in \(\tan x\).

3. A metal disk has radius measured with 0.2 % relative error. What is the approximate relative error in its area?

4. Explain why the linear approximation to \(|x|\) at \(x=0\) cannot be formed, even though the function is continuous.

5. Suppose \(f''(a)\) exists and is nonzero. Derive an explicit expression for the remainder \(R(h)\) that shows it is asymptotically \(\frac12 f''(a)h^2\).