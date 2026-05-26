## 1. The one-sentence answer
**Optimization finds the maximum or minimum value of a function under given conditions by locating critical points where the derivative is zero or undefined.**

Iska matlab yeh hai ki jab aapko kisi quantity ko badhana ya ghatana ho — jaise profit, area, ya cost — to aap function ko model karte ho aur uske slope ko zero kar dete ho taaki extreme point mil jaaye. Unconstrained cases mein aap freely variables change kar sakte ho, jabki constrained cases mein kuch restrictions (jaise fixed perimeter) lagte hain jo substitution ya inequalities se handle hote hain. Yeh technique real problems ko equations mein badal kar solve karti hai bina trial-and-error ke.

> [!NOTE]
> The core “aha” is that every smooth peak or valley must have a flat tangent; setting the derivative to zero converts an intuitive search into an algebraic equation.

## 2. Why this matters — concrete and current
SpaceX uses single-variable optimization to choose the exact throttle profile that minimizes fuel for a given payload mass while respecting thrust constraints during ascent.  
In semiconductor manufacturing, TSMC applies constrained optimization to maximize wafer yield by tuning etch time and temperature under fixed thermal budgets, directly affecting billions of dollars in production cost.  
Google’s data-center cooling systems run real-time unconstrained gradient-based routines on temperature functions to reduce power draw; each 1 % improvement saves megawatts daily.  
In fundamental physics, the brachistochrone problem (fastest descent curve) is solved via calculus of variations, an extension of basic optimization that appears in particle-accelerator lattice design at CERN.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Limit definition of derivative | Tells us that a horizontal tangent (zero slope) signals a candidate extremum |
| Product, quotient, chain rules | Required to compute derivatives of realistic objective functions |
| Domain and continuity | Guarantees that extrema exist and lie inside the interval we examine |
| Solving algebraic equations | Critical-point equations must be solved exactly |

Agar continuity ya derivative rules weak hain, to pehle woh sections revise karo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Model the quantity to optimize
Aap ek real situation ko ek differentiable function \(f(x)\) ke roop mein likhte ho.  
Example: ek 100 m wire se rectangle banate hain; area \(A(x)=x(50-x)\) hai.  
Formal statement: Let \(f:\mathbb{R}\to\mathbb{R}\) be the objective function we wish to extremize.  
> [!WARNING] Agar model galat ho (wrong domain ya missing constraint) to pura solution meaningless ho jaata hai.

### Step 2 — Locate critical points by setting the derivative to zero
Slope zero hone ka matlab hai local max ya min.  
Example: \(A'(x)=50-2x=0\) deta hai \(x=25\).  
Formal: Solve \(f'(x)=0\) or identify where \(f'(x)\) does not exist inside the domain.  
> [!WARNING] Zero derivative sirf candidate deta hai; second-derivative test ya sign check zaroori hai.

### Step 3 — Classify each critical point
Second derivative ya first-derivative sign chart se confirm karo.  
Example: \(A''(x)=-2<0\) to maximum.  
Formal: If \(f''(c)>0\) then local minimum; if \(f''(c)<0\) then local maximum (Second Derivative Test).

### Step 4 — Incorporate constraints via substitution
Agar ek variable fixed hai, to usko express karke ek-variable function banao.  
Example: fixed perimeter \(P=2x+2y\) se \(y=P/2-x\) substitute karo.  
Formal: Reduce the constrained problem to an unconstrained one on a smaller domain.

### Step 5 — Check endpoints and boundary behaviour
Closed interval par endpoints bhi evaluate karo.  
Example: [0,50] interval mein A(0)=0 aur A(50)=0 bhi dekho.  
Formal: On a closed bounded interval \([a,b]\), the extreme-value theorem guarantees attainment of max and min; compare critical values with \(f(a)\) and \(f(b)\).

### Step 6 — State the first-derivative test for global behaviour
Sign change of \(f'\) around a critical point decides increase/decrease.  
Formal: If \(f'\) changes from positive to negative at \(c\), then \(f\) has a local maximum at \(c\).

## 5. Worked examples — har step show karo

**Example 1 — Open box from square sheet**  
*Given:* 12 cm side square sheet se corner cut karke box banana hai.  
*Find:* Maximum volume.  
Let side of square cut be \(x\). Volume \(V(x)=x(12-2x)^2\).  
Differentiate: \(V'(x)=(12-2x)^2-4x(12-2x)\).  
Set \(V'(x)=0\): factor \((12-2x)(12-6x)=0\) gives \(x=2\) or \(x=6\).  
Domain \(0<x<6\), so test \(x=2\).  
*Why* — factoring reveals roots quickly and discards endpoint \(x=6\) where volume zero.  
**Final answer: 128 cm³ at \(x=2\).**  
*Reflection:* Simple polynomial case; generalises to any volume-with-cut problem.

**Example 2 — Maximum area rectangle with fixed perimeter**  
*Given:* 200 m fencing.  
*Find:* Largest rectangular field.  
Let length \(x\), width \(y=100-x\). Area \(A(x)=x(100-x)\).  
\(A'(x)=100-2x=0\) gives \(x=50\).  
\(A''(x)=-2<0\) confirms maximum.  
*Why* — substitution removes constraint before differentiation.  
**Final answer: 2500 m² when square.**  
*Reflection:* Classic unconstrained reduction; same pattern appears in economics (revenue vs price).

**Example 3 — Minimum time to run and swim**  
*Given:* Beach 1 km offshore, point B 3 km along shore; run 5 km/h, swim 2 km/h.  
*Find:* Fastest path.  
Let run distance \(x\). Time \(T(x)=\frac{\sqrt{1+(3-x)^2}}{2}+\frac{x}{5}\).  
\(T'(x)=\frac{x-3}{2\sqrt{1+(3-x)^2}}+\frac{1}{5}=0\).  
Solve numerically: \(x\approx2.31\) km.  
*Why* — derivative balances marginal time costs, precursor to Snell’s law.  
**Final answer: minimum time ≈ 1.05 h.**  
*Reflection:* Shows optimization beyond polynomials; needs numerical solve.

**Example 4 — Profit maximisation with quadratic cost**  
*Given:* Price \(p=120-0.02q\), cost \(C=20q+0.01q^2\).  
*Find:* Optimal quantity.  
Profit \(P(q)=q(120-0.02q)-(20q+0.01q^2)\).  
\(P'(q)=100-0.05q=0\) gives \(q=2000\).  
\(P''(q)=-0.05<0\) maximum.  
*Why* — marginal revenue = marginal cost at optimum.  
**Final answer: 2000 units, profit ₹80 000.**  
*Reflection:* Business setting; same calculus works for any differentiable revenue/cost pair.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting domain endpoints | Students assume interior critical point is global | Always evaluate \(f(a)\) and \(f(b)\) on closed intervals |
| Treating every zero derivative as maximum | Confuse with inflection points              | Run second-derivative test or sign chart     |
| Wrong substitution in constraints | Lose one variable incorrectly               | Express constraint explicitly before differentiating |
| Ignoring units or scaling   | Answer numerically correct but physically meaningless | Keep units throughout and check dimensions   |
| Division by zero when differentiating quotients | Overlooked in modelling                     | Simplify expression before differentiation   |
| Assuming unconstrained optimum satisfies hidden constraints | Real problems often have implicit bounds    | List all constraints before starting         |

## 7. The textbook-precise statement
Let \(f\) be continuous on a closed interval \([a,b]\) and differentiable on \((a,b)\). If \(f\) attains a local extremum at an interior point \(c\in(a,b)\), then \(f'(c)=0\) (Fermat’s stationary-point theorem). For a constrained problem, substitute the constraint to reduce to a single-variable function and proceed as above. (Stewart, *Calculus*, 9e, §4.1 and §4.7).

## 8. Visual — diagram or schematic
```
y ↑
  |     . (local max)
  |    / \
  |   /   \___
  |  /         \
  | /           \
  |/_____________\______→ x
   a   c1  c2   b
```
Horizontal tangents at c1 (max) and c2 (min); endpoints a,b also checked.

## 9. The memory technique
1. **The hook** — Picture a ball rolling on a smooth hill; it must stop (zero speed) exactly at the top or bottom.  
2. **What to overlearn** — \(f'(c)=0\) for interior extrema; second-derivative sign test; endpoint evaluation on closed intervals.  
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Rederive by writing the difference quotient, setting its limit to zero, and solving.

## 10. What this unlocks
Aap ab single-variable models ko analytically solve kar sakte ho aur multivariable constrained problems (Lagrange multipliers) ke liye foundation bana sakte ho.  
- Next: Mean-value theorem applications  
- Next: Related-rates problems  
- Next: Curve sketching with first- and second-derivative tests  
- Next: Introduction to Lagrange multipliers in multivariable calculus

## 11. Self-check — five questions, no answers
1. Find the exact dimensions that maximise the area of a rectangle inscribed in a semicircle of radius 5.  
2. A cylindrical can must hold 1000 cm³; material costs are fixed. Derive the height-to-radius ratio that minimises surface area.  
3. Explain why a critical point where \(f''(c)=0\) may be neither max nor min; give a concrete counter-example.  
4. In the lifeguard problem, if running speed equals swimming speed, what path does the calculus optimum predict?  
5. Identify the modelling error if a student forgets to restrict \(x\) to \([0,50]\) when maximising \(A(x)=x(50-x)\).