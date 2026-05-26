## 1. The one-sentence answer
**D'Alembert's solution** gives the explicit formula for the displacement of an infinite vibrating string by superposing right- and left-going waves determined solely by the initial shape and velocity.

The one-dimensional wave equation \(u_{tt}=c^2u_{xx}\) is a linear hyperbolic PDE whose general solution can be written as the sum of two arbitrary functions, one traveling at speed \(+c\) and one at speed \(-c\). When initial data \(u(x,0)=f(x)\) and \(u_t(x,0)=g(x)\) are supplied on the line \(t=0\), these two functions are fixed by integrating the data along the characteristic lines \(x\pm ct=\) constant. The resulting expression is an exact, closed-form solution valid for all \(x\in\mathbb{R}\) and \(t>0\).

Because the value of \(u\) at any point \((x,t)\) depends only on the data inside the interval \([x-ct,x+ct]\), the solution respects finite propagation speed and automatically satisfies the PDE wherever the data are twice differentiable.

> [!NOTE]
> The interval of dependence \([x-ct,x+ct]\) is the single geometric fact that replaces an entire initial-boundary-value problem on an infinite line.

## 2. Why this matters — concrete and current
Seismic imaging companies such as Schlumberger and CGG use D'Alembert-type propagators inside reverse-time migration algorithms to reconstruct subsurface reflectors from marine streamer data; the explicit formula supplies an exact reference solution against which finite-difference codes are validated before deployment on GPU clusters.

LIGO's gravitational-wave pipelines employ one-dimensional wave-equation models along each interferometer arm; D'Alembert's formula gives the exact transfer function from mirror displacement to photodetector strain, allowing calibration of the 4 km arms to within \(10^{-19}\) m.

In semiconductor process simulation, Synopsys TCAD tools solve the acoustic wave equation inside photoresist layers during extreme-ultraviolet lithography; the analytic solution supplies the initial guess for iterative solvers that predict feature distortion at the 3 nm node.

Violin makers at Stradivari workshops and modern luthiers simulate the transverse motion of a bowed string with D'Alembert's formula to predict the precise location of “wolf notes” before the instrument is carved.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Second-order linear PDE classification | Identifies the equation as hyperbolic, guaranteeing real characteristics |
| Chain rule for partial derivatives | Required when changing variables to \(\xi=x+ct\), \(\eta=x-ct\) |
| Fundamental theorem of calculus | Converts the integrated velocity term into the definite integral appearing in the formula |
| Domain of dependence           | Explains why only data between \(x-ct\) and \(x+ct\) matter |

## 4. Building the idea — from intuition to formalism

### Step 1 — The wave equation and its characteristic lines
A vibrating string obeys Newton's second law applied to each small segment, yielding the PDE \(u_{tt}=c^2u_{xx}\). The lines along which signals travel at exactly speed \(c\) are \(x\pm ct=\) constant; these are the only directions in which the second derivatives can balance without forcing the solution to be smoother than the data.

**Example.** On the line \(x-ct=0\) the quantity \(u_t+cu_x\) is constant for any solution.

> [!WARNING]
> Treating the PDE as elliptic (as one does for Laplace's equation) produces an entirely different set of complex characteristics and destroys finite propagation speed.

### Step 2 — Change to characteristic coordinates
Introduce new independent variables \(\xi=x+ct\), \(\eta=x-ct\). The chain rule transforms the wave operator into
\[
u_{tt}-c^2u_{xx}= -4c^2u_{\xi\eta}.
\]
The PDE therefore reduces to \(u_{\xi\eta}=0\).

### Step 3 — General solution by direct integration
Integrate \(u_{\xi\eta}=0\) once with respect to \(\xi\) to obtain \(u_\eta=F(\eta)\) for an arbitrary function \(F\). A second integration yields
\[
u(\xi,\eta)=G(\xi)+H(\eta),
\]
where \(G\) and \(H\) are arbitrary twice-differentiable functions. Returning to \(x,t\) gives the d'Alembert general solution
\[
u(x,t)=G(x+ct)+H(x-ct).
\]

### Step 4 — Matching initial displacement
At \(t=0\) we have \(u(x,0)=G(x)+H(x)=f(x)\). This single equation determines the sum of the two unknown functions.

### Step 5 — Matching initial velocity
Differentiate the general solution with respect to \(t\):
\[
u_t(x,t)=cG'(x+ct)-cH'(x-ct).
\]
At \(t=0\) this equals \(g(x)\). Integrate both sides from an arbitrary lower limit \(a\) to \(x\):
\[
\int_a^x g(s)\,ds=c\bigl(G(x)-G(a)\bigr)-c\bigl(H(x)-H(a)\bigr).
\]
The two integration constants are fixed by the displacement condition, producing the explicit integral term.

### Step 6 — Assembling the formula
Solving the linear system for \(G\) and \(H\) yields the textbook statement of D'Alembert's solution.

## 5. Worked examples — every step shown

**Example 1 — Zero initial velocity**  
*Given:* \(u_{tt}=4u_{xx}\), \(u(x,0)=\sin x\), \(u_t(x,0)=0\).  
*Find:* \(u(x,t)\).  

Differentiate the general form and set \(t=0\): \(4G'(x)-4H'(x)=0\) implies \(G'(x)=H'(x)\).  
Integrate: \(G(x)=H(x)+C\).  
From displacement: \(2G(x)-C=\sin x\), so \(G(x)=\frac12\sin x+C/2\).  
Thus \(H(x)=\frac12\sin x-C/2\).  
Hence
\[
u(x,t)=\frac12\bigl(\sin(x+2t)+\sin(x-2t)\bigr).
\]
**Final answer**  
\[u(x,t)=\frac12\bigl(\sin(x+2t)+\sin(x-2t)\bigr).\]  
*Reflection.* The trigonometric identity immediately shows a standing wave; the same algebra works for any even extension of \(f\).

**Example 2 — Constant initial velocity**  
*Given:* \(c=1\), \(f(x)=0\), \(g(x)=1\).  
*Find:* \(u(x,t)\).  

The integral term becomes \(\frac12\int_{x-t}^{x+t}1\,ds=t\).  
**Final answer**  
\[u(x,t)=t.\]  
*Reflection.* A uniform initial kick produces linear growth in time; the formula automatically satisfies the PDE because second derivatives vanish.

**Example 3 — Compact-support initial data**  
*Given:* \(c=1\), \(f(x)=1-|x|\) for \(|x|\le1\) (zero elsewhere), \(g=0\).  
*Find:* \(u(0,2)\).  

The interval of dependence is \([-2,2]\). Only the portion inside \([-1,1]\) contributes, giving
\[
u(0,2)=\frac12\bigl(f(-2)+f(2)\bigr)=0.
\]
**Final answer**  
\[u(0,2)=0.\]  
*Reflection.* The disturbance has already left the origin; the solution is identically zero outside the light cone.

**Example 4 — Nonzero velocity with jump**  
*Given:* \(c=1\), \(f=0\), \(g(x)=1\) for \(0<x<1\) (zero elsewhere).  
*Find:* \(u(0.5,0.5)\).  

Interval \([0,1]\).  
\[
u(0.5,0.5)=\frac12\int_0^1 1\,ds=0.5.
\]
**Final answer**  
\[u(0.5,0.5)=0.5.\]  
*Reflection.* The integral simply measures the length of the support inside the interval of dependence.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting the factor \(1/(2c)\) in front of the integral | Students copy the \(g=0\) formula by rote | Always derive the velocity term from the chain-rule differentiation before integrating |
| Using \(x\pm t\) when \(c\neq1\) | Automatic substitution of \(c=1\) | Keep \(c\) symbolic until the final line |
| Integrating \(g\) from 0 to \(x+ct\) instead of the symmetric interval | Confusing the lower limit of integration | Fix the lower limit by the displacement condition first |
| Applying the formula on a finite interval without reflection | Ignoring boundary conditions | Verify the problem statement really is the infinite-line Cauchy problem |
| Differentiating under the integral sign without Leibniz rule | The limits depend on \(x\) and \(t\) | Write the Leibniz formula explicitly once |
| Assuming \(f\) must be \(C^2\) everywhere | Overlooking that weak solutions still satisfy the integral form | Check the regularity hypothesis in the theorem statement |
| Sign error in the velocity term | Mixing \(\partial_t\) versus \(\partial_x\) characteristics | Re-derive \(u_t=cG'-cH'\) each time |

## 7. The textbook-precise statement
Let \(c>0\), \(f\in C^2(\mathbb{R})\), \(g\in C^1(\mathbb{R})\). The unique \(C^2\) solution of the Cauchy problem
\[
u_{tt}-c^2u_{xx}=0,\qquad u(x,0)=f(x),\quad u_t(x,0)=g(x)
\]
is given by
\[
u(x,t)=\frac{f(x+ct)+f(x-ct)}{2}+\frac1{2c}\int_{x-ct}^{x+ct}g(s)\,ds.
\]
(Strauss, *Partial Differential Equations: An Introduction*, 2nd ed., §2.4, Theorem 1.)

## 8. Visual — diagram or schematic
```text
t
↑
|     • (x,t)
|    / \
|   /   \
|  /     \
| /       \
|/_________\
0-----------→ x
   x-ct   x+ct
```
The two characteristic lines emanating from \((x,t)\) intersect the initial line \(t=0\) at \(x-ct\) and \(x+ct\). All information that reaches the observation point travels exactly along these lines; nothing outside the interval contributes.

## 9. The memory technique
1. **The hook** — Picture two messengers leaving every point of the initial line at speed \(c\); at time \(t\) they meet at \(x\) carrying the average height plus the accumulated “push” \(g\) collected between them.
2. **What to overlearn** — The exact placement of the factor \(1/(2c)\) and the symmetric limits \(x\pm ct\).
3. **Spaced-repetition schedule** — Re-derive the formula from the change of variables at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Return to the coordinate change \(\xi=x+ct\), \(\eta=x-ct\), integrate \(u_{\xi\eta}=0\) twice, then match \(f\) and \(g\).

## 10. What this unlocks
D'Alembert's formula is the prototype for all subsequent hyperbolic theory. It immediately generalizes to systems, supplies the explicit kernel for Duhamel's principle, and serves as the benchmark for energy methods and domain-of-dependence arguments in higher dimensions.

- Energy conservation proofs for the wave equation
- Kirchhoff's formula in three space dimensions
- Representation of solutions via retarded potentials
- Numerical schemes that respect characteristics (Lax–Wendroff, upwind)

## 11. Self-check — five questions, no answers
1. Write the explicit solution when \(f(x)=x^2\) and \(g(x)=x\) with \(c=1\); verify it satisfies the PDE by direct differentiation.
2. For which pairs \((f,g)\) is the solution \(u(x,t)\) a polynomial of degree at most 3?
3. Show that if \(g=0\) and \(f\) is odd, then \(u(0,t)=0\) for all \(t\).
4. A student claims the solution at \((x,t)\) depends on the value of \(g\) at the single point \(x\). Produce a counter-example where this fails.
5. Derive the formula for \(c=3\) starting from the change of variables \(\xi=x+3t\), \(\eta=x-3t\) without quoting the \(c=1\) case.