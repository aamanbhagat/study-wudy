## 1. The one-sentence answer
**Classification of an ordinary differential equation identifies four attributes—order, degree, linearity, and autonomy—by examining the highest derivative, its algebraic power after clearing denominators or radicals, the presence of products or nonlinear functions of the unknown, and any explicit dependence on the independent variable.**

These attributes partition the space of all ODEs into families that admit different existence theorems, solution methods, and qualitative behaviors. Order fixes the number of independent constants a general solution must contain. Degree, linearity, and autonomy together decide whether the equation can be rewritten in a form that permits superposition, separation of variables, or reduction of order. The four labels are logically independent: a second-order equation may be nonlinear and autonomous, or linear and non-autonomous.

> [!NOTE]
> Order and degree are local algebraic properties of a single equation; linearity and autonomy are structural properties that govern the global solution space.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 guidance computer integrates a nonlinear, non-autonomous second-order system describing rigid-body rotation under time-varying thrust; the classification immediately signals that standard linear Kalman-filter updates must be replaced by an extended or unscented filter.

In semiconductor process control, the diffusion of dopant atoms obeys a linear autonomous PDE that reduces to an autonomous ODE after separation of variables; the autonomy permits an exact similarity solution used by Intel and TSMC to set implant schedules.

Modern epidemiological models such as SEIR with time-dependent contact rates produce non-autonomous nonlinear systems; classifying the non-autonomy tells modelers that the next-generation matrix method must be replaced by numerical Floquet or Lyapunov-exponent calculations, as done in the 2020–2022 COVID-19 forecasting pipelines at Imperial College and Johns Hopkins.

Circuit simulators such as SPICE linearize around operating points only after confirming that transistor equations are nonlinear; the classification step determines whether the Newton–Raphson loop will converge or whether harmonic-balance methods are required.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Function of one variable and its derivatives | Every ODE is an equality relating a function y and one or more of its derivatives with respect to an independent variable x. |
| Algebraic power and polynomial degree | Degree is defined only after the equation is written as a polynomial in the highest derivative. |
| Function composition and products | Nonlinearity is detected precisely by the appearance of products y·y′, (y′)², sin(y), or e^y. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the independent and dependent variables
An ODE always relates one unknown function (the dependent variable) to its rates of change with respect to another quantity (the independent variable).  
Example: In y″ + x y′ + y = sin(x) the independent variable is x and the dependent variable is y.  
Formally, an equation F(x, y, y′, …, y^(n)) = 0 is ordinary when only one independent variable appears.

> [!WARNING]
> Treating a parameter that actually varies with x as a constant will misclassify autonomy later.

### Step 2 — Locate the highest derivative and read off the order
The order is the largest integer k such that the k-th derivative appears.  
Example: y″ + 3y′ + 2y = 0 has order 2.  
Formally, order = max {k | ∂F/∂y^(k) ≢ 0}.

> [!WARNING]
> If an equation contains y^(3) inside a square root that is later squared, the order remains 3, not 6.

### Step 3 — Clear the equation to a polynomial in the highest derivative and read off the degree
After fractions and radicals are eliminated, the degree is the highest power to which the order-th derivative is raised.  
Example: (y″)² + y′ = 0 has degree 2.  
Formally, once the equation is polynomial in y^(n), degree = deg_{y^(n)}(F).

> [!WARNING]
> Degree is undefined for equations that cannot be made polynomial, such as those containing sin(y″).

### Step 4 — Test linearity by checking the three linear conditions
An ODE is linear when it can be written a_n(x) y^(n) + … + a_0(x) y = g(x) with no products among y and its derivatives and with coefficients depending only on x.  
Example: y″ + x y = 0 is linear; y y′ = 1 is nonlinear.  
Formally, the equation is linear if it is of first degree in y, y′, …, y^(n) and free of compositions.

> [!WARNING]
> A term such as x² y″ looks harmless but is still linear; the coefficient may depend on x, yet the unknown y″ appears only to the first power.

### Step 5 — Test autonomy by checking explicit x-dependence outside the coefficients of y
An ODE is autonomous when the independent variable x does not appear explicitly except possibly inside the unknown function and its derivatives.  
Example: y′ = y(1 – y) is autonomous; y′ = x y is non-autonomous.  
Formally, after the equation is written in normal form y^(n) = f(x, y, …, y^(n–1)), autonomy holds exactly when ∂f/∂x ≡ 0.

## 5. Worked examples — every step shown

**Example 1 — First-order linear autonomous**  
*Given:* dy/dx = 3y.  
*Find:* order, degree, linear/nonlinear, autonomous/non-autonomous.  
Step 1: Highest derivative is y′ → order 1.  
*Why:* Only the first derivative appears.  
Step 2: y′ appears to power 1 after writing y′ – 3y = 0 → degree 1.  
*Why:* Polynomial degree in the highest derivative is 1.  
Step 3: No products of y with itself or its derivatives → linear.  
*Why:* Satisfies the three linear conditions.  
Step 4: Right-hand side 3y contains no explicit x → autonomous.  
**Final classification: order 1, degree 1, linear, autonomous.**

**Example 2 — Second-order nonlinear non-autonomous**  
*Given:* y″ + x (y′)² + sin(x) y = 0.  
Step 1: Highest derivative y″ → order 2.  
Step 2: y″ appears to power 1 → degree 1.  
Step 3: (y′)² is a product of derivatives → nonlinear.  
Step 4: Explicit x multiplies (y′)² and sin(x) multiplies y → non-autonomous.  
**Final classification: order 2, degree 1, nonlinear, non-autonomous.**

**Example 3 — Degree greater than one**  
*Given:* (y″)³ + y = x.  
Step 1: y″ → order 2.  
Step 2: After clearing, y″ is raised to power 3 → degree 3.  
Step 3: y″ and y appear only to first powers and are not multiplied → linear.  
Step 4: Explicit x on right-hand side → non-autonomous.  
**Final classification: order 2, degree 3, linear, non-autonomous.**

**Example 4 — Hidden nonlinearity**  
*Given:* y′ = y / (x + y).  
Step 1: y′ → order 1.  
Step 2: y′ appears to power 1 after clearing denominator → degree 1.  
Step 3: Multiply both sides by (x + y) yields (x + y) y′ – y = 0; the term y y′ appears → nonlinear.  
Step 4: Explicit x remains → non-autonomous.  
**Final classification: order 1, degree 1, nonlinear, non-autonomous.**

*Reflection:* The algebraic rearrangement in Example 4 shows why clearing denominators must precede the linearity test.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Calling an equation “degree 2” because order is 2 | Confusion between two independent labels | Always locate the highest derivative first, then raise it to a power. |
| Declaring y y′ = 0 linear because y′ appears alone | Overlooking products between unknown and derivative | Scan every term for any multiplication involving y or its derivatives. |
| Forgetting that sin(y″) makes degree undefined | Treating transcendental functions as polynomial powers | Check whether the equation can be written as a polynomial in y^(n). |
| Labeling y′ = k y autonomous when k is later revealed to be k(t) | Treating parameters as constants too early | Verify that every coefficient is free of explicit x before claiming autonomy. |
| Counting order from the independent variable’s derivative | Mixing partial and ordinary derivatives in a single equation | Confirm only one independent variable is present. |
| Assuming every first-order equation is separable | Conflating order with solution method | Separation depends on additional structure beyond order. |
| Ignoring that (dy/dx)² + dy/dx = 0 has degree 2 | Treating the squared term as cosmetic | Raise the highest derivative only after the equation is normalized. |

## 7. The textbook-precise statement
An ordinary differential equation of order n is an equation of the form  
F(x, y, y′, …, y^(n)) = 0,  
where F is a given function of n + 2 variables, not identically zero, and at least one of the partial derivatives ∂F/∂y^(k) for k = 0,…,n is not identically zero. The equation is of degree m if, after clearing radicals and denominators, it is polynomial of degree m in the highest derivative y^(n). It is linear when it can be written  
a_n(x) y^(n) + ⋯ + a_0(x) y = g(x)  
with a_i and g continuous on an interval I and a_n(x) ≠ 0 on I. It is autonomous when, after reduction to normal form y^(n) = f(x, y, …, y^(n–1)), the right-hand side satisfies ∂f/∂x ≡ 0. (See Coddington, *An Introduction to Ordinary Differential Equations*, 1961, §1.2.)

## 8. Visual — diagram or schematic
```text
ODE
 ├── Order?  (highest k with y^(k) present)
 │     1 → first-order family
 │     2 → second-order family
 │
 ├── Degree? (power of y^(n) after clearing)
 │     1 → linear candidate
 │    >1 → higher-degree (often harder)
 │
 ├── Linear? (no products, coeffs of x only)
 │     yes → superposition applies
 │     no  → nonlinear methods
 │
 └── Autonomous? (no explicit x)
       yes → time-invariant, equilibria
       no  → forced, time-varying
```

## 9. The memory technique
1. **The hook** — Picture the equation as a patient in a hospital: order is the patient’s age, degree is the severity of the chief complaint, linearity is whether the illness obeys simple addition rules, and autonomy is whether the symptoms depend on the clock on the wall.  
2. **What to overlearn** — Order = highest derivative index; degree = exponent of that derivative after normalization; linear ⇔ first power of every y^(k) with coefficients of x alone; autonomous ⇔ no lone x on the right-hand side of normal form.  
3. **Spaced-repetition schedule** — Review the four definitions at 1 day, 3 days, 7 days, 16 days, 35 days after first study.  
4. **First-principles fallback** — Start from the normal form y^(n) = f(x, y, …, y^(n–1)), count derivatives, inspect powers, test products, then test ∂f/∂x.

## 10. What this unlocks
Correct classification immediately selects the admissible analytic and numerical machinery for the remainder of an ODE course.  
- Order 1 linear autonomous equations open separation of variables and integrating factors.  
- Linear equations of any order open the theory of vector spaces of solutions and the Wronskian.  
- Autonomous nonlinear equations open phase-line and phase-plane analysis.  
- Non-autonomous linear equations open variation of parameters and Laplace transforms.  
- Higher-degree or fully nonlinear equations route the student toward numerical methods or qualitative theory.

## 11. Self-check — five questions, no answers
1. Write the order, degree, linearity, and autonomy labels for (y″)² + x y′ + y³ = sin(t).  
2. Give an example of a second-order equation that is linear, of degree 1, and non-autonomous.  
3. Is the degree of y′ + sin(y) = 0 defined? Justify.  
4. Explain why the equation y y″ – (y′)² = 0 is nonlinear even though every derivative appears to the first power.  
5. Construct a first-order autonomous nonlinear equation whose right-hand side is a cubic polynomial in y.