## 1. The one-sentence answer
**A partial derivative measures the instantaneous rate of change of a multivariable function while holding all but one independent variable fixed.**

A function of several variables changes when any one of its inputs changes. The partial derivative isolates that change by freezing every other input at a constant value and then applying the ordinary derivative with respect to the single free variable. This produces a new function that itself depends on all the original variables.

Geometrically the result is the slope of the curve obtained by slicing the graph of the surface with a plane parallel to one coordinate axis. Algebraically it is computed by the same differentiation rules used in one variable, except that every symbol not being differentiated is treated as a literal constant.

> [!NOTE]
> The partial derivative is the first rigorous step that lets you replace the single slope number of one-variable calculus with a whole collection of directional slopes that together describe the local tilt of a surface or hypersurface.

## 2. Why this matters — concrete and current
In computational fluid dynamics, NASA’s OVERFLOW solver evaluates partial derivatives of velocity and pressure fields with respect to each spatial coordinate while time is held fixed; these derivatives enter the discretized Navier–Stokes equations that predict airflow over the Space Launch System rocket.

In semiconductor process simulation, Synopsys TCAD tools compute partial derivatives of dopant concentration with respect to temperature and time; the resulting sensitivity maps guide the billion-dollar decisions that set annealing schedules for 3 nm transistors.

In deep-learning frameworks such as PyTorch and JAX, the backward pass is assembled from partial derivatives of the loss with respect to each weight; automatic differentiation libraries literally store and multiply millions of these partials every training step on models such as GPT-4.

Meteorological models at the European Centre for Medium-Range Weather Forecasts differentiate temperature and humidity fields partially with respect to latitude while longitude and pressure level are fixed; the resulting gradients drive the data-assimilation step that produces daily global forecasts.

In quantitative finance, the Black–Scholes–Merton PDE for option pricing is built from partial derivatives of the option value with respect to underlying price and time; every major bank’s risk engine evaluates these Greeks thousands of times per second.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Limit definition of the ordinary derivative | The partial derivative is defined by exactly the same limit, only with other variables frozen. |
| Standard differentiation rules (power, product, chain) | These rules carry over verbatim once constants are identified. |
| Functions of several variables and their domains | You must be able to write f(x,y) or f(x,y,z) and know which symbols are independent. |
| Graph of z = f(x,y) as a surface in R³ | Geometric meaning is read directly from tangent lines lying in vertical planes parallel to the coordinate planes. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Isolate one variable
Treat every independent variable except one as a fixed number. The function then collapses to an ordinary function of a single real variable.

Example: for f(x,y) = x²y + sin y, fix y = 3. Then f(x,3) = 3x
² + sin 3, an ordinary quadratic.

Formally, the partial derivative of f with respect to x at (a,b) is
$$
\frac{\partial f}{\partial x}(a,b) = \lim_{h\to 0}\frac{f(a+h,b)-f(a,b)}{h}.
$$

> [!WARNING]
> If you allow y to change with h you are computing a directional derivative along a slanted path, not the partial derivative.

### Step 2 — Apply ordinary differentiation rules
Differentiate the resulting single-variable expression exactly as in first-year calculus; every symbol that is not the differentiation variable is a constant.

Example continued: d/dx (3x² + sin 3) = 6x. Restore the variable name to obtain 6x evaluated at any point.

### Step 3 — Notation
The symbols ∂f/∂x, f_x, and D_x f all denote the same partial derivative. The round “∂” reminds the reader that other variables exist and are being held constant.

### Step 4 — Higher-order partials
Differentiate a first partial again, possibly with respect to a different variable. Equality of mixed partials holds when the second partials are continuous (Clairaut’s theorem).

### Step 5 — Geometric interpretation
The number f_x(a,b) equals the slope of the tangent line to the curve obtained by intersecting the surface z = f(x,y) with the vertical plane y = b.

### Step 6 — Textbook definition
Let f : D ⊂ R² → R be defined on an open set D. If the limit above exists, f is said to be differentiable with respect to x at (a,b) and the value is denoted ∂f/∂x(a,b).

## 5. Worked examples — every step shown

**Example 1 — Simple polynomial**  
*Given:* f(x,y) = 3x²y – 5xy³  
*Find:* ∂f/∂x and ∂f/∂y at (1,–1).  

Treat y as constant and differentiate term by term:  
∂f/∂x = 6xy – 5y³  *Why:* power rule on first term, y constant on second.  
At (1,–1): 6(1)(–1) – 5(–1)³ = –6 – 5(–1) = –6 + 5 = –1.  

Treat x as constant:  
∂f/∂y = 3x
² – 15xy²  *Why:* product rule on second term.  
At (1,–1): 3(1)² – 15(1)(1) = 3 – 15 = –12.  

**–1**  **–12**

*Reflection:* The only algebraic hazard is misidentifying which letter is constant; once that is settled the calculation is mechanical.

**Example 2 — Exponential and trigonometric**  
*Given:* f(x,y) = e^{xy} cos(x + y)  
*Find:* f_x(0,0).  

Differentiate with respect to x, y constant:  
f_x = y e^{xy} cos(x+y) – e^{xy} sin(x+y)  *Why:* product rule plus chain rule on each factor.  
At (0,0): 0·1·1 – 1·0 = 0.  

**0**

*Reflection:* Two chain-rule contributions appear; keeping track of which variable is active prevents sign errors.

**Example 3 — Implicit partial**  
*Given:* x³ + y³ + z³ – 3xyz = 1, solve for ∂z/∂x treating y constant.  

Differentiate both sides with respect to x:  
3x² + 3z² (∂z/∂x) – 3(yz + xy ∂z/∂x) = 0.  
Collect terms: (3z
² – 3xy) ∂z/∂x = –3x² + 3yz.  
Thus ∂z/∂x = (–x
² + yz) / (z² – xy).  

**(\(-x^2 + yz\)) / (\(z^2 - xy\))**

*Reflection:* Implicit differentiation works verbatim once the other independent variable is declared constant.

**Example 4 — Second-order mixed partial**  
*Given:* f(x,y) = x sin(xy)  
*Find:* f_xy and verify f_xy = f_yx at (π/2,1).  

First f_x = sin(xy) + x y cos(xy).  
Then f_xy = x cos(xy) + [cos(xy) + x y (–x sin(xy))] = 2x cos(xy) – x² y sin(xy).  
At (π/2,1): 2(π/2)·0 – (π²/4)(1)·1 = –π²/4.  

Symmetrically computing f_yx yields the same value, confirming equality.

**–π²/4**

*Reflection:* Mixed partials commute only after the continuity hypothesis is satisfied; here the functions are C^∞.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating a variable that should be constant as if it varies | Habit from single-variable calculus | Explicitly write “y = c” before differentiating. |
| Confusing ∂f/∂x with df/dx | Notation looks similar | Always use the round ∂ when more than one independent variable exists. |
| Forgetting the product or chain rule on the active variable | Mechanical oversight | Underline the variable being differentiated at each step. |
| Evaluating at a point before differentiating | Premature substitution hides functional dependence | Keep the symbolic expression until the final substitution. |
| Assuming mixed partials are equal without checking continuity | Clairaut’s theorem is not automatic | Verify second partials are continuous on an open set. |
| Writing the limit with two increments h and k | Misreading the definition | The partial limit uses a single increment h in one variable only. |
| Sign error when differentiating trig or exponential functions | Chain-rule sign tracking | Write the inner derivative explicitly each time. |

## 7. The textbook-precise statement
Let f be defined on an open set D ⊂ R^n. The partial derivative of f with respect to the i-th variable x_i at a point a ∈ D is
$$
\frac{\partial f}{\partial x_i}(\mathbf{a}) = \lim_{h\to 0}\frac{f(\mathbf{a}+h\mathbf{e}_i)-f(\mathbf{a})}{h},
$$
provided the limit exists. If all first partial derivatives exist and are continuous on D, then f is differentiable on D (Stewart, *Calculus: Early Transcendentals*, 9e, §14.3, Theorem 3).

## 8. Visual — diagram or schematic
```
z
↑
|     surface z=f(x,y)
|    /
|   /   tangent line (slope = f_x)
|  /____
| /     \
|/_______\
+---------> x
   y fixed (plane y = b)
```
The diagram shows the vertical plane y = b cutting the surface; the resulting curve has tangent slope exactly equal to the partial derivative with respect to x.

## 9. The memory technique

**The hook**  
Picture a mountain surface; you stand at a point and ask “how steep is the trail if I walk purely east while my north coordinate is frozen?” That single fixed-direction slope is the partial derivative.

**What to overlearn**  
- Definition via the one-variable limit with other variables constant.  
- Notation ∂/∂x versus d/dx.  
- The mechanical rule “all other letters are constants.”

**Spaced-repetition schedule**  
Review the definition after 1 day, recompute two examples after 3 days, prove Clairaut’s theorem after 7 days, differentiate an implicit surface after 16 days, and derive a thermodynamic identity after 35 days.

**First-principles fallback**  
Return to the limit definition, freeze every variable except one, and reduce to the single-variable case you already know.

## 10. What this unlocks
Partial derivatives are the raw material from which the gradient vector, the total differential, directional derivatives, tangent planes, and the chain rule for multivariable functions are built.

- Gradient and directional derivatives  
- Tangent planes and linear approximations  
- Multivariable chain rule and implicit differentiation  
- Extrema via critical points and the Hessian  
- Vector calculus identities (curl, divergence)  

## 11. Self-check — five questions, no answers
1. Compute ∂/∂x and ∂/∂y of f(x,y) = arctan(x/y) at (1,1).  
2. For g(x,y,z) = x y^z, find all three first partial derivatives and evaluate them at (2,3,1).  
3. Show that the mixed partials of h(x,y) = x^3 y – y^3 x differ at the origin, and explain why Clairaut’s theorem does not apply.  
4. A surface is given implicitly by F(x,y,z) = x e^y + y e^z + z e^x = 0. Derive an expression for ∂z/∂x.  
5. In the definition of f_x(a,b), what happens geometrically if the limit fails to exist? Give a concrete surface that illustrates the failure.