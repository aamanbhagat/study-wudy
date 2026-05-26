## 1. The one-sentence answer
**An exact equation is a first-order ODE written as \(M(x,y)\,dx + N(x,y)\,dy = 0\) whose left-hand side is exactly the total differential of some scalar potential function \(F(x,y)\).**

Iska matlab yeh hai ki agar aap \(M\) aur \(N\) ko sahi se choose karte ho, to poora expression \(dF\) ban jaata hai. Solution phir seedha \(F(x,y) = C\) ban jaata hai bina kisi integrating factor ke. Aap sirf check karte ho ki \(\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}\) ho, aur phir \(F\) ko integrate karke nikaalte ho.

Yeh condition isliye powerful hai kyunki woh batati hai ki vector field \((M,N)\) conservative hai — matlab koi path-independent potential exist karta hai. Agar condition fail ho jaaye to equation exact nahi hoti aur aapko aur tools (jaise integrating factor) lagane padte hain.

> [!NOTE]
> The single “aha” moment: the equality \(\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}\) is simply the two-dimensional version of \(\nabla\times\mathbf{F}=0\), which guarantees a scalar potential exists.

## 2. Why this matters — concrete and current
In orbital mechanics, NASA’s trajectory design tools treat the two-body problem as an exact equation derived from the conservative gravitational force; the potential function directly supplies the vis-viva equation used in every mission planning software.

In semiconductor process simulation, Synopsys TCAD solvers reduce dopant diffusion models to exact first-order forms so that the concentration profile is recovered by a single quadrature instead of a full time-stepping scheme.

In thermodynamic modelling of lithium-ion batteries, the open-circuit voltage is obtained by integrating an exact differential of the Gibbs free energy; CATL and Panasonic use this step to extract analytic expressions for entropy change without numerical fitting loops.

In classical field theory, the condition that the electromagnetic field strength two-form is closed (\(dF=0\)) is precisely the exactness test; this underpins the existence of the four-potential in every modern particle-physics Monte-Carlo generator.

In micro-fluidic chip design, pressure-driven Stokes flow in a slowly varying channel reduces to an exact equation whose potential gives the flow rate directly, allowing Autodesk CFD to bypass iterative solvers for the first design pass.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Partial derivatives  | To state and verify the exactness condition \(\partial M/\partial y=\partial N/\partial x\) |
| Total differential   | The entire equation must equal \(dF\) for some \(F\)      |
| Line integrals       | Path independence follows automatically once exactness holds |
| First-order ODEs     | The given equation is already written in differential form |

Agar aapko partial derivatives ya total differential abhi comfortable nahi hain, to pause karke unhe pehle revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Recognise the differential form
Aap dekhte ho ki equation ko \(M(x,y)\,dx + N(x,y)\,dy = 0\) ke roop mein likha gaya hai. Iska matlab yeh hai ki hum ek vector field \((M,N)\) dekh rahe hain aur poochna chahte hain ki kya yeh field kisi scalar ke gradient se aaya hai.

Example: \( (2x + y)\,dx + (x + 2y)\,dy = 0 \). Yahan \(M=2x+y\), \(N=x+2y\).

Formal statement: We are given the Pfaffian equation \(M\,dx + N\,dy = 0\) on an open rectangle in \(\mathbb{R}^2\).

> [!WARNING]
> Agar aap yahan \(M\) aur \(N\) ko galat identify kar lete ho (jaise terms ko interchange kar dete ho), to baaki saari checks fail ho jaayengi.

### Step 2 — Test the exactness condition
Aap compute karte ho \(\frac{\partial M}{\partial y}\) aur \(\frac{\partial N}{\partial x}\). Agar dono barabar aayein to equation exact hai.

Example: \(\frac{\partial M}{\partial y}=1\), \(\frac{\partial N}{\partial x}=1\). Barabar hain, isliye exact.

Formal statement: The equation is exact on a simply-connected domain if and only if \(\frac{\partial M}{\partial y}=\frac{\partial N}{\partial x}\).

> [!WARNING]
> Domain simply-connected hona zaroori hai; warna counter-examples (jaise \(-\frac{y}{x^2+y^2}dx + \frac{x}{x^2+y^2}dy=0\)) exist karte hain.

### Step 3 — Integrate \(M\) with respect to \(x\)
Aap \(F(x,y)=\int M(x,y)\,dx\) karte ho, treating \(y\) as constant. Integration “constant” actually \(g(y)\) hota hai.

Example: \(F(x,y)=x^2 + xy + g(y)\).

Formal statement: \(F(x,y)=\int^{x}M(t,y)\,dt + g(y)\).

> [!WARNING]
> Agar aap \(g(y)\) ko turant zero kar dete ho, to derivative check fail ho sakta hai.

### Step 4 — Differentiate with respect to \(y\) and solve for \(g'(y)\)
\(\frac{\partial F}{\partial y}\) ko \(N\) ke barabar set karke \(g'(y)\) nikaalte ho.

Example: \(\frac{\partial F}{\partial y}=x + g'(y)=N=x+2y\), hence \(g'(y)=2y\), \(g(y)=y^2\).

Formal statement: \(g'(y)=N(x,y)-\frac{\partial}{\partial y}\int M\,dx\).

> [!WARNING]
> Agar \(g'(y)\) mein \(x\) bacha rahe to calculation mistake hai; exact equation mein woh term cancel ho jaana chahiye.

### Step 5 — Write the implicit solution
\(F(x,y)=C\) hi solution hai.

Example: \(x^2 + xy + y^2 = C\).

Formal statement: The general solution is \(F(x,y)=C\) where \(dF=M\,dx+N\,dy\).

## 5. Worked examples — har step show karo

**Example 1 — Linear-looking but exact**
*Given:* \((3x^2 + 6xy)\,dx + (3x^2 + 2y)\,dy = 0\)
*Find:* Implicit solution.
\(\frac{\partial M}{\partial y}=6x\), \(\frac{\partial N}{\partial x}=6x\). Equal, hence exact.  
Integrate \(M\): \(F=x^3 + 3x^2 y + g(y)\).  
Differentiate: \(\frac{\partial F}{\partial y}=3x^2 + g'(y)=N=3x^2 + 2y\), so \(g'(y)=2y\), \(g=y^2\).  
Thus \(x^3 + 3x^2 y + y^2 = C\).  
*Why* each move: exactness test confirms potential exists; integration recovers all \(x\)-dependent terms; \(g'(y)\) fixes the remaining \(y\)-only piece.  
**\(x^3 + 3x^2 y + y^2 = C\)**

*Reflection:* The equation looked non-exact at first glance but the mixed terms cancelled perfectly; always compute both partials before deciding.

**Example 2 — Missing \(x\) term in \(N\)**
*Given:* \((e^y + y\cos x)\,dx + (xe^y + \sin x)\,dy = 0\)
\(\frac{\partial M}{\partial y}=e^y - y\sin x = \frac{\partial N}{\partial x}\). Exact.  
\(F = x e^y + y\sin x + g(y)\).  
\(\frac{\partial F}{\partial y}=x e^y + \sin x + g'(y) = N\), hence \(g'(y)=0\).  
**\(x e^y + y\sin x = C\)**

*Reflection:* When \(g'(y)\) vanishes the potential is already complete; this pattern appears often in trigonometric-exponential mixes.

**Example 3 — Quadratic with cross terms**
*Given:* \((2xy + y^3)\,dx + (x^2 + 3xy^2)\,dy = 0\)
Test: both partials equal \(2x + 3y^2\).  
\(F = x^2 y + x y^3 + g(y)\).  
\(g'(y)=0\).  
**\(x^2 y + x y^3 = C\)**

*Reflection:* Homogeneous-looking equations can still be exact; never assume integrating factor is needed until the test fails.

**Example 4 — Higher-degree polynomial**
*Given:* \((3x^2 y + 2xy^2 + y^3)\,dx + (x^3 + 2x^2 y + 3xy^2)\,dy = 0\)
Test passes. Integrate \(M\): \(F = x^3 y + x^2 y^2 + x y^3 + g(y)\).  
\(g'(y)=0\).  
**\(x^3 y + x^2 y^2 + x y^3 = C\)**

*Reflection:* Degree-three terms arrange themselves symmetrically; the potential is simply the “average” monomial integral.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting \(g(y)\) after integrating \(M\) | Students treat integration constant as zero | Always differentiate and match to \(N\)      |
| Swapping \(M\) and \(N\)          | Equation written with \(dy\) first          | Fix the order before computing partials      |
| Checking exactness on a slit plane | Domain not simply connected                 | Verify rectangle or disk before concluding   |
| Differentiating \(F\) w.r.t. wrong variable | Confusion between \(\partial/\partial x\) and \(\partial/\partial y\) | Label every derivative explicitly            |
| Leaving \(x\) in \(g'(y)\)        | Algebraic slip in subtraction               | Re-substitute the expression of \(\partial F/\partial y\) |
| Treating non-exact equations as exact | Skipping the test step                      | Always write the two partials side-by-side   |
| Sign error in \(g'(y)\)           | \(N - \partial F/\partial y\) sign flip     | Double-check subtraction order               |

## 7. The textbook-precise statement
Let \(M\) and \(N\) be continuously differentiable functions on a simply-connected open set \(D\subset\mathbb{R}^2\). The equation \(M(x,y)\,dx + N(x,y)\,dy=0\) is exact if and only if \(\frac{\partial M}{\partial y}=\frac{\partial N}{\partial x}\) throughout \(D\). In that case there exists a twice-continuously-differentiable function \(F:D\to\mathbb{R}\) such that \(dF=M\,dx+N\,dy\), and the general solution is given implicitly by \(F(x,y)=C\). (Boyce & DiPrima, *Elementary Differential Equations*, 11e, §2.4, Theorem 2.4.1.)

## 8. Visual — diagram or schematic
```
y
↑
|          level curve F(x,y)=C
|        /
|      /
|    /
|  /
|/
+------------→ x
   gradient (M,N) perpendicular to level curves
```
Level curves of \(F\) are everywhere orthogonal to the vector field \((M,N)\). The constant \(C\) simply labels which curve passes through the initial condition.

## 9. The memory technique
**The hook** — Picture a skier descending a mountain: the height function \(F\) is the potential; the slope vector \((M,N)\) points downhill. When the curl is zero, every path from A to B loses the same height, exactly as in an exact equation.

**What to overlearn**  
- Exactness test: \(\partial M/\partial y = \partial N/\partial x\)  
- Recovery: \(F=\int M\,dx + g(y)\) then \(g'(y)=N-\partial F/\partial y\)  
- Solution: \(F(x,y)=C\)

**Spaced-repetition schedule** — Review the test and recovery steps after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — If the formula is forgotten, start from the definition \(dF = \frac{\partial F}{\partial x}dx + \frac{\partial F}{\partial y}dy\) and equate coefficients with \(M\) and \(N\); the equality of mixed partials immediately yields the exactness condition.

## 10. What this unlocks
Mastering exact equations lets you recognise conservative fields instantly and supplies the quickest analytic solution route for any first-order ODE that passes the test. It directly feeds into later topics.

- Integrating factors for non-exact equations  
- Exactness in three or more variables (Pfaffian systems)  
- Hamiltonian mechanics where the symplectic form is closed  
- Thermodynamic identities (Maxwell relations)  
- Numerical symplectic integrators that preserve an underlying potential

## 11. Self-check — five questions, no answers
1. For \(M=2x\sin y + y\), \(N=x^2\cos y + x\), verify exactness and recover \(F\).

2. Show that \((2xy + y^3)dx + (x^2 + 3xy^2)dy=0\) is exact and solve it; then differentiate the implicit answer to recover the original ODE.

3. Why does the exactness test fail for \(-y\,dx + x\,dy=0\) on the punctured plane even though the formal partials match?

4. Given an exact equation whose potential is \(F(x,y)=x^3 y + e^y\), write the ODE and an initial condition that selects the particular curve \(F=2\).

5. Suppose \(\frac{\partial M}{\partial y}-\frac{\partial N}{\partial x}=3x\). Can any scalar integrating factor \(\mu(y)\) alone make the equation exact? Justify with a one-line calculation.