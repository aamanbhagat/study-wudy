## 1. The one-sentence answer
**In two variables a limit exists only when the function approaches the same value along every possible path to the point.**

In one dimension a limit concerns the behavior of \(f(x)\) as \(x\) nears a single number from left or right. Two dimensions replace the line with a plane, so the point \((a,b)\) can be approached along infinitely many curves. The numerical value obtained may change with the chosen curve; when that occurs the overall limit cannot be assigned any single number.

The student therefore tests candidate paths (straight lines of varying slopes, parabolas, trigonometric spirals) and compares the resulting one-variable limits. Agreement on several paths is never proof of existence; disagreement on even one path is immediate disproof. Only after exhaustive path checks does one invoke the \(\varepsilon\)-\(\delta\) definition that quantifies “every possible approach.”

> [!NOTE]
> The decisive insight is that path dependence is not a defect of the function but a geometric fact of the plane: two distinct curves can meet at a point while carrying different limiting values, exactly as two roads can arrive at the same town from different altitudes.

## 2. Why this matters — concrete and current
In computational fluid dynamics, ANSYS Fluent solves the Navier–Stokes equations on two-dimensional slices of turbine blades; if the pressure field limit at a sharp trailing edge depended on the mesh-refinement path, the solver would report inconsistent lift coefficients and the blade design would be rejected.

Semiconductor process engineers at TSMC use finite-element models of dopant diffusion in silicon wafers. The concentration limit at an oxide interface must be path-independent; otherwise the predicted threshold voltage of a transistor drifts with the chosen mesh direction and the chip fails electrical test.

In reinforcement-learning value-function approximation, the gradient of a critic network is evaluated at state-action pairs. When the network is continuous but not uniformly so, the limit of the temporal-difference error can vary with the trajectory taken through state space, producing unstable policy updates that were observed in OpenAI’s 2019 Procgen benchmark failures.

Gravitational lensing calculations for the Event Horizon Telescope require the deflection angle of null geodesics near a Kerr black-hole horizon. Path dependence in the coordinate chart would produce multiple images of the same photon ring, contradicting the single observed ring diameter reported in the 2019 ApJL paper.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| One-variable limits            | Every path test reduces to a familiar single-variable limit |
| Functions of two variables     | The object whose limit is under discussion                |
| Polar coordinates              | A systematic way to parameterize all directions at once   |
| \(\varepsilon\)-\(\delta\) definition in 1D | The template that must be lifted to \(\mathbb{R}^2\)     |

## 4. Building the idea — from intuition to formalism

### Step 1 — Limits on a line versus limits in a plane
A one-variable limit only distinguishes two directions. In the plane every direction is available simultaneously, so the same function can return different numbers when the same point is reached along different rays.

Example: consider \(f(x,y)=\frac{x}{x+y}\) approaching \((0,0)\). Along the x-axis (\(y=0\)) the expression collapses to 1; along the line \(y=x\) it collapses to \(\frac12\).

Formally, the candidate limit \(L\) must satisfy
\[
\lim_{t\to 0}f(\gamma(t))=L
\]
for every differentiable curve \(\gamma(t)\) with \(\gamma(0)=(a,b)\).

> [!WARNING]
> Treating the plane as “just two independent lines” hides the fact that most paths are not axis-aligned.

### Step 2 — Straight-line paths with variable slope
Any line through \((a,b)\) may be written \(y-a=m(x-a)\). Substituting yields a one-variable function of \(x\) whose limit as \(x\to a\) must be independent of \(m\).

Example: \(\frac{xy}{x^2+y^2}\) at \((0,0)\). Along \(y=mx\) one obtains \(\frac{m}{1+m^2}\), which changes with \(m\).

The formal requirement is therefore
\[
\lim_{x\to a}f(x,a+m(x-a))=L\quad\text{for every real }m.
\]

> [!WARNING]
> Checking only the horizontal and vertical lines misses the slope dependence that often appears at 45 degrees.

### Step 3 — Parabolic and higher-order paths
When linear paths agree, try \(y-a=k(x-a)^p\) for \(p\neq 1\). Different exponents weight the terms differently and frequently expose hidden dependence.

Example: \(\frac{x^2 y}{x^4+y^2}\) yields 0 along every straight line but \(\frac12\) along \(y=x^2\).

The mathematical statement is that the limit must be the same for every continuous path, not merely every linear one.

> [!WARNING]
> Students who stop after Step 2 falsely conclude the limit exists.

### Step 4 — Polar substitution for all directions at once
Set \(x=r\cos\theta\), \(y=r\sin\theta\). If the resulting expression still depends on \(\theta\) after \(r\to 0\), the limit fails uniformly in angle.

Example: \(\frac{x^2 y}{x^4+y^2}\) becomes \(\frac{r^3\cos^2\theta\sin\theta}{r^2(\cos^4\theta+r^2\sin^2\theta)}\); the \(\theta\)-dependent numerator survives.

Formally, if after simplification the expression is not independent of \(\theta\) in the limit \(r\to 0\), no single \(L\) exists.

> [!WARNING]
> Polar form can mask dependence if the substitution is performed after an algebraic cancellation that already assumes a fixed ratio.

### Step 5 — The negation of the limit definition
The \(\varepsilon\)-\(\delta\) statement “for every \(\varepsilon>0\) there exists \(\delta>0\) …” fails precisely when there exist two sequences \((x_n,y_n)\to(a,b)\) and \((u_n,v_n)\to(a,b)\) such that \(f(x_n,y_n)\) and \(f(u_n,v_n)\) approach different numbers.

This supplies the rigorous criterion used in proofs.

> [!WARNING]
> Sequence arguments are easy to misuse by choosing sequences that do not actually reach the point.

### Step 6 — Textbook definition of the two-variable limit
The limit equals \(L\) if and only if every path produces \(L\). Equivalently,
\[
\forall\varepsilon>0\,\exists\delta>0\text{ such that }0<\sqrt{(x-a)^2+(y-b)^2}<\delta\implies|f(x,y)-L|<\varepsilon.
\]

## 5. Worked examples — every step shown

**Example 1 — Linear paths already disagree**
*Given:* \(f(x,y)=\frac{x-y}{x+y}\) and the point \((0,0)\).  
*Find:* Does \(\lim_{(x,y)\to(0,0)}f(x,y)\) exist?

Substitute \(y=mx\):
\[
f(x,mx)=\frac{x-mx}{x+mx}=\frac{1-m}{1+m}.
\]
The right-hand side depends on \(m\).  
*Why:* Different slopes are different paths, so the one-variable limits differ.  
Hence the two-variable limit does not exist.  
**No limit exists.**

*Reflection:* The simplest trap is to check only \(m=0\) and \(m=1\); any other \(m\) immediately shows dependence.

**Example 2 — All lines agree, parabola disagrees**
*Given:* \(f(x,y)=\frac{x^2y}{x^4+y^2}\).  
*Find:* Limit at \((0,0)\)?

Along \(y=mx\):
\[
\frac{x^2(mx)}{x^4+(mx)^2}=\frac{mx^3}{x^2(x^2+m^2)}=0\to 0.
\]
Along \(y=x^2\):
\[
\frac{x^2\cdot x^2}{x^4+(x^2)^2}=\frac{x^4}{2x^4}=\frac12.
\]
*Why:* The parabolic path weights the denominator differently.  
**No limit exists.**

*Reflection:* After linear paths succeed, the next systematic probe is always a quadratic path.

**Example 3 — Polar coordinates expose angular dependence**
*Given:* \(f(x,y)=\frac{x y^2}{x^2+y^4}\).  
*Find:* Limit at origin.

In polar form \(x=r\cos\theta\), \(y=r^{1/2}\sin^{1/2}\theta\) (adjusted scaling) yields an expression whose limit oscillates with \(\theta\).  
**No limit exists.**

*Reflection:* Polar coordinates compress all directions into a single parameter \(\theta\); persistent \(\theta\)-dependence is conclusive.

**Example 4 — Limit does exist**
*Given:* \(f(x,y)=\frac{x^2 y}{x^2+y^2}\).  
*Find:* Limit at \((0,0)\)?

Along any line \(y=mx\): \(\frac{m x^3}{x^2+m^2 x^2}=0\).  
In polar: \(\frac{r^3\cos^2\theta\sin\theta}{r^2}=r\cos^2\theta\sin\theta\to 0\) uniformly in \(\theta\).  
By the squeeze theorem \(|f(x,y)|\leq r\to 0\).  
**Limit equals 0.**

*Reflection:* Uniform decay in polar coordinates supplies the missing “all paths” guarantee.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Checking only axes                | Habit from single-variable calculus         | Always test at least three distinct slopes   |
| Stopping after linear paths       | Illusion that lines exhaust all approaches  | Immediately follow with \(y=x^2\) or polar   |
| Confusing “path independent along lines” with existence | Over-generalization of 1-D intuition     | Remember the definition quantifies over all curves |
| Using sequences that never reach the point | Careless choice of indices               | Verify \(\|(x_n,y_n)\|\to 0\) explicitly     |
| Algebraic cancellation before polar substitution | Hidden assumption of fixed ratio       | Substitute first, then simplify              |
| Assuming continuity implies limit exists | Conflating the two notions               | Test the limit before claiming continuity    |
| Ignoring behavior at infinity along path | Path may escape any bounded neighborhood | Restrict to a small disk first               |

## 7. The textbook-precise statement
A function \(f:\mathbb{R}^2\setminus\{(a,b)\}\to\mathbb{R}\) satisfies
\[
\lim_{(x,y)\to(a,b)}f(x,y)=L
\]
if and only if for every \(\varepsilon>0\) there exists \(\delta>0\) such that
\[
0<\sqrt{(x-a)^2+(y-b)^2}<\delta\implies|f(x,y)-L|<\varepsilon.
\]
Equivalently, the composition \(f\circ\gamma\) tends to \(L\) for every continuous curve \(\gamma\) with \(\gamma(0)=(a,b)\). (Stewart, *Calculus*, 9e, §14.2, Theorem 2.)

## 8. Visual — diagram or schematic
```text
          y
          ^
          |     path 2: y = x^2
          |    .
          |   /  
          |  /   path 1: y = 2x
          | /     
(0,0)-----|-------> x
          |
Two distinct curves meet at the origin but carry different limiting values of f.
```
Label the axes, mark the origin, and draw at least one straight line of non-zero slope and one parabola.

## 9. The memory technique
1. **The hook** — Picture two mountain roads that both end at the same summit yet one is a gentle ramp and the other a steep cliff; the altitude you feel at the top cannot be unique if the roads differ.  
2. **What to overlearn** — The polar substitution \(x=r\cos\theta\), \(y=r\sin\theta\) and the fact that any surviving \(\theta\) dependence kills the limit.  
3. **Spaced-repetition schedule** — Review the definition at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the \(\varepsilon\)-\(\delta\) statement from the single-variable case by replacing \(|x-a|\) with the Euclidean distance.

## 10. What this unlocks
Mastery of path dependence supplies the precise obstruction that prevents a function from being continuous and therefore differentiable.  

- Differentiability in several variables (requires the limit of the difference quotient to be linear).  
- Partial derivatives and the gradient (exist even when the full limit fails).  
- Green’s theorem and line integrals (path independence reappears as exactness of differential forms).  
- Complex analysis (Cauchy–Riemann equations are the 2-D continuity statement in disguise).

## 11. Self-check — five questions, no answers
1. Show that \(\lim_{(x,y)\to(0,0)}\frac{x^3-y^3}{x^3+y^3}\) does not exist by exhibiting two paths.  
2. Prove that \(\lim_{(x,y)\to(0,0)}\frac{x^2 y}{x^2+y^2}\) equals zero using the squeeze theorem.  
3. Why does agreement of all linear paths fail to guarantee existence of the limit?  
4. Convert \(\frac{xy}{\sqrt{x^2+y^2}}\) to polar coordinates and decide whether the limit at the origin exists.  
5. Construct a function that is continuous along every straight line through the origin yet discontinuous at the origin itself.