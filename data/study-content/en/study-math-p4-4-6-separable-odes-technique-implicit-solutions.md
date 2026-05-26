## 1. The one-sentence answer
**A first-order ODE is separable when it can be rewritten so that all y-terms multiply dy and all x-terms multiply dx, after which both sides integrate independently to produce an implicit relation between x and y.**

This structure arises whenever the right-hand side factors into a product of a function of x alone and a function of y alone. The separation step converts the differential relation into two ordinary integrals whose antiderivatives are set equal, plus one arbitrary constant. The resulting equation defines y only implicitly in most cases; solving explicitly for y is neither required nor always possible.

The method therefore yields families of solution curves without demanding closed-form expressions. It applies directly to autonomous equations and to many classical models that reduce to quadrature.

> [!NOTE]
> The constant of integration must be introduced immediately after the two indefinite integrals are written; omitting it or inserting it only at the end frequently produces an incomplete family that misses singular solutions.

## 2. Why this matters — concrete and current
In orbital mechanics, the two-body problem under inverse-square gravity reduces to a separable first-order equation for radial distance versus angle; NASA’s Deep Space Network trajectory integrators still employ the resulting implicit energy relation to validate numerical propagators before committing to high-fidelity ephemerides.

In semiconductor process modeling, the oxidation of silicon to form gate dielectrics obeys the Deal–Grove relation, a separable ODE whose implicit solution supplies the exact oxide thickness versus time used by TSMC and Intel for sub-5 nm node calibration.

In reinforcement-learning theory, the continuous-time limit of Q-learning yields the Hamilton–Jacobi–Bellman ODE; when the reward and dynamics separate, the implicit solution gives the exact value function for linear-quadratic regulators employed by DeepMind’s MuZero planning module.

Population dynamics with Allee effects produce separable logistic-type equations whose implicit integrals determine extinction thresholds; these thresholds appear in IUCN Red List assessments for species whose growth rates have been measured in field studies.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Derivative as rate       | Supplies the dy/dx symbol that must be treated as a fraction during separation |
| Indefinite integration   | Converts each separated side into an antiderivative       |
| Arbitrary constant       | Appears once after integration and parametrizes the solution family |
| Implicit differentiation | Verifies that an implicit relation satisfies the original ODE |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the product structure
A first-order equation dy/dx = F(x,y) separates when F factors as f(x)·g(y).  
Concrete example: dy/dx = x y becomes dy/dx = x · y, with f(x)=x and g(y)=y.  
Formally:  
$$ \frac{dy}{dx} = f(x)g(y). $$

> [!WARNING]
> If the right-hand side contains an inseparable term such as x+y, separation fails and another method is required.

### Step 2 — Rewrite differentials
Treat dy/dx formally as a ratio and move every y-factor with dy to the left.  
Example continuation:  
$$ \frac{dy}{y} = x\, dx. $$

### Step 3 — Integrate both sides independently
Apply the integral sign to each side:  
$$ \int \frac{1}{y}\, dy = \int x\, dx. $$
Each integral is now an ordinary calculus problem.

### Step 4 — Evaluate the antiderivatives
Compute:  
$$ \ln |y| = \frac12 x^2 + C. $$

### Step 5 — Solve for the implicit relation
Clear the logarithm by exponentiation or leave the equation as written; both forms are implicit solutions:  
$$ y = \pm e^{x^2/2 + C} \quad \text{or} \quad \ln |y| - \frac12 x^2 = C. $$

### Step 6 — Verify by differentiation
Differentiate the implicit equation implicitly and recover the original ODE, confirming correctness.

## 5. Worked examples — every step shown

**Example 1 — Linear growth**  
*Given:* dy/dx = 2x y, y(0)=1.  
*Find:* the solution.  
Step: rewrite as dy/y = 2x dx.  
*Why:* factors separate cleanly.  
Integrate: ∫ dy/y = ∫ 2x dx → ln|y| = x² + C.  
*Why:* standard antiderivatives.  
Apply initial condition: ln|1| = 0 + C ⇒ C=0.  
Thus ln|y| = x
².  
Exponentiate: y = ± e^{x²}.  
Initial condition selects the positive branch.  
**y = e^{x²}**  
*Reflection:* the absolute value and sign choice are fixed by the initial datum; the implicit logarithmic form already encodes both signs.

**Example 2 — Autonomous logistic**  
*Given:* dy/dx = y(1-y).  
*Find:* implicit solution.  
Separate: dy/[y(1-y)] = dx.  
Partial fractions yield (1/y + 1/(1-y)) dy = dx.  
Integrate: ln|y| - ln|1-y| = x + C.  
Combine: ln |y/(1-y)| = x + C.  
Exponentiate: y/(1-y) = K e^x, K=±e^C.  
Solve algebraically for y: y = K e^x / (1 + K e^x).  
**y = \frac{K e^x}{1 + K e^x}**  
*Reflection:* the same separation produces both the implicit logarithmic relation and the explicit logistic formula; either satisfies the ODE.

**Example 3 — Trigonometric coefficient**  
*Given:* dy/dx = x / cos y, y(0)=0.  
Separate: cos y dy = x dx.  
Integrate: sin y = (1/2)x² + C.  
Initial condition: sin 0 = C ⇒ C=0.  
**sin y = x²/2**  
*Reflection:* the solution remains implicit; attempting to write y = arcsin(x
²/2) is valid only inside |x|≤√2, illustrating domain restrictions.

**Example 4 — Singular solution**  
*Given:* dy/dx = y²/x.  
Separate: dy/y² = dx/x.  
Integrate: -1/y = ln|x| + C.  
Clear: y = -1/(ln|x| + C).  
The constant solution y≡0 satisfies the ODE yet is lost if division by y² is performed without checking.  
**y = 0 is an additional singular solution**  
*Reflection:* envelope or lost solutions appear when a factor used in separation vanishes identically.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                                      |
|-----------------------------|---------------------------------------------|------------------------------------------------------|
| Forgetting +C               | Integration performed mechanically          | Insert C immediately after both integrals appear     |
| Division by zero            | g(y)=0 omitted during separation            | Test constant solutions y=k where g(k)=0 separately  |
| Absolute values dropped     | Logarithm integration ignored               | Retain |·| until exponentiation or initial conditions fix sign |
| Treating implicit as explicit | Solving for y viewed as mandatory        | Leave relation F(x,y)=C when inversion is impossible |
| Domain oversight            | Arcsin or ln arguments ignored              | State interval on which the implicit function is defined |
| Sign errors after exponentiation | ± from e^C forgotten                    | Keep ± or absorb into arbitrary positive K           |
| Mixing differentials        | dx placed on wrong side                     | Always move every y-term with dy before integrating  |

## 7. The textbook-precise statement
A first-order equation M(x) + N(y) dy/dx = 0 is separable when it can be written dy/g(y) = f(x) dx. Integrating both sides yields  
$$ \int \frac{dy}{g(y)} = \int f(x)\, dx + C, $$  
provided g(y) ≠ 0. The resulting relation F(y) − G(x) = C defines the general solution implicitly (Boyce & DiPrima, *Elementary Differential Equations*, 11e, §2.2).

## 8. Visual — diagram or schematic
```text
x-axis (horizontal)          y-axis (vertical)
   |                              |
   |   f(x)                       |   1/g(y)
   |   ------>                    |   ------>
   |                              |
   +----------> dx                +----------> dy
   multiply both sides by dx·g(y) to obtain
   g(y) dy = f(x) dx
   then integrate left with respect to y,
   right with respect to x.
```
The diagram shows the two differentials aligned after multiplication by the reciprocal factors, making the integrals independent.

## 9. The memory technique

1. **The hook** — Picture two rivers, one carrying only x-water and one only y-water; separation opens a lock so each river flows into its own integral lake.  
2. **What to overlearn** — The exact separation template dy/g(y) = f(x) dx and the rule that +C appears once after both integrals.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start from dy/dx = f(x)g(y), multiply both sides by dx/g(y), then integrate.

## 10. What this unlocks
Mastery of separation supplies the first rigorous technique for producing closed-form solutions and prepares the ground for exact equations, integrating factors, and substitution methods.

- Exact equations (next subtopic)  
- Autonomous phase-line analysis  
- Reduction of order for equations missing x or y  
- First integrals in classical mechanics

## 11. Self-check — five questions, no answers
1. Separate and integrate dy/dx = e^x / y².  
2. Does the equation dy/dx = x + y admit separation? Explain.  
3. Find every constant solution of dy/dx = y(y-2)(y+1) before separating.  
4. An implicit solution ln|y| + x² = C passes through (0,1). Determine C and state the largest interval containing x=0 on which the solution is defined.  
5. Verify by implicit differentiation that sin y − x²/2 = 0 satisfies dy/dx = x / cos y wherever cos y ≠ 0.