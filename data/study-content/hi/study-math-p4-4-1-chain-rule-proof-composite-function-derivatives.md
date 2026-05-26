## 1. The one-sentence answer
**The chain rule states that the derivative of a composite function equals the product of the outer function’s derivative (evaluated at the inner function) and the inner function’s derivative.**

Iska matlab yeh hai ki jab ek function doosre function ke andar ghus jaaye, to uska slope nikaalne ke liye aap dono functions ke slopes ko sahi jagah par multiply karte ho. Pehli function ka derivative inner function ki value par liya jaata hai, aur uske saath inner function ka apna derivative lagta hai. Yeh rule limits ki definition se directly aata hai, bina kisi shortcut ke.

Aap isse pehle single-function derivatives aur limit definition dono dekh chuke ho. Ab composite cases mein yeh rule har baar kaam karta hai jab dono functions differentiable hon.

> [!NOTE]
> The single most important “aha” is that the chain rule never adds or subtracts derivatives; it always multiplies them after shifting the outer derivative’s input to the inner function’s output.

## 2. Why this matters — concrete and current
In aerospace trajectory planning, SpaceX’s Falcon 9 guidance software repeatedly differentiates composite expressions that map engine throttle through atmospheric density and vehicle mass; the chain rule supplies the exact gradient needed for real-time steering corrections.

In semiconductor process simulation, Synopsys TCAD tools differentiate composite mobility models where carrier velocity depends on electric field which itself depends on doping profile; each Newton iteration inside the solver uses the chain rule to assemble the Jacobian.

In modern neural-network training, PyTorch and JAX compute gradients of loss functions that are deep compositions of matrix multiplications and activation functions; automatic differentiation engines apply the chain rule (in its multivariable form) millions of times per second on GPUs.

In orbital mechanics, NASA’s GMAT propagator differentiates composite Keplerian elements that depend on position vectors obtained from numerical integration; the resulting variational equations rely on the chain rule to propagate state-transition matrices.

In climate modelling, the Community Earth System Model differentiates composite radiation-transfer functions whose optical depth depends on water-vapour concentration that itself depends on temperature; the chain rule appears inside every adjoint sensitivity run.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Limit definition of derivative | The chain-rule proof begins from the exact limit expression for (f ∘ g)′(x). |
| Continuity of differentiable functions | Used to justify that g(x+h) → g(x) inside the limit. |
| Basic differentiation rules (sum, product, power) | Needed to verify the rule on concrete polynomials before proving it. |

Agar aap in teeno mein se koi bhi weak feel kar rahe ho, to pause karke pehle woh sections revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Composition as successive mappings
Aap ek function ko doosre ke andar daalte ho, jaise temperature ko Celsius se Fahrenheit mein badalna aur phir us Fahrenheit ko heat-index formula mein daalna. Slope nikaalne ke liye dono badlaav ko track karna padta hai.

Concrete example: let g(x) = x² and f(u) = sin(u). Then (f ∘ g)(x) = sin(x
²). Slope of sin at x² must be multiplied by slope of x².

Formal statement: Let u = g(x). The composite is f(g(x)).

> [!WARNING]
> Agar aap yahaan galti se f aur g ko interchange kar do, to poora derivative sign flip ho jaayega aur numerical answers wrong aaenge.

### Step 2 — Write the difference quotient for the composite
Difference quotient for f(g(x)) is exactly  
$$
\frac{f(g(x+h))-f(g(x))}{h}.
$$

### Step 3 — Insert and remove the inner increment
Add and subtract f(g(x+h)) – f(g(x)) ke beech g(x+h) – g(x) ka term:  
$$
\frac{f(g(x+h))-f(g(x))}{g(x+h)-g(x)}\cdot\frac{g(x+h)-g(x)}{h}.
$$

### Step 4 — Take the limit as h → 0
Pehla factor → f′(g(x)) kyunki g(x+h) → g(x) (continuity). Doosra factor → g′(x). Product rule of limits deta hai  
$$
(f\circ g)'(x)=f'(g(x))\,g'(x).
$$

### Step 5 — Handle the case g′(x) = 0 separately
Agar g′(x) = 0, to direct substitution se limit zero ho jaata hai, jo rule ke saath consistent hai.

### Step 6 — Textbook-grade statement
Agar g differentiable at x aur f differentiable at g(x), to f ∘ g differentiable at x aur uska derivative f′(g(x)) g′(x) hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple power inside sine**  
*Given:* y = sin(x³)  
*Find:* dy/dx  
Step 1: outer = sin(u), u = x³.  
Step 2: d(sin u)/du = cos u, evaluated at u = x
³ → cos(x³).  
Step 3: du/dx = 3x².  
Step 4: multiply → cos(x³)·3x
².  
*Why:* each derivative is applied at the correct input value.  
**3x² cos(x³)**

*Reflection:* power rule aur trigonometric derivative dono chain ke andar aa gaye; pattern same rahega for any outer function.

**Example 2 — Nested radicals**  
*Given:* y = √(3 + √(x))  
*Find:* dy/dx  
Let u = 3 + √x, outer = √u.  
d(√u)/du = 1/(2√u) at u = 3 + √x.  
du/dx = 1/(2√x).  
Multiply: 1/(2√(3 + √x)) · 1/(2√x).  
**1/(4 √x √(3 + √x))**

*Reflection:* two square-root layers produce two factors of ½; the pattern generalises to any depth.

**Example 3 — Exponential of a quotient**  
*Given:* y = e^( (x+1)/(x-1) )  
*Find:* dy/dx  
Outer: e^v, v = (x+1)/(x-1).  
d(e^v)/dv = e^v.  
dv/dx = [(1)(x-1) – (x+1)(1)]/(x-1)² = –2/(x-1)².  
Result: e^((x+1)/(x-1)) · (–2/(x-1)²).  
**–2 e^((x+1)/(x-1)) / (x-1)²**

*Reflection:* quotient rule inside chain rule; both must be shown explicitly.

**Example 4 — Triple composition**  
*Given:* y = sin(√(ln x))  
*Find:* dy/dx  
Innermost: ln x → 1/x.  
Middle: √u, u = ln x → 1/(2√(ln x)).  
Outer: sin w, w = √(ln x) → cos(√(ln x)).  
Multiply three derivatives: cos(√(ln x)) · (1/(2√(ln x))) · (1/x).  
**cos(√(ln x)) / (2 x √(ln x))**

*Reflection:* each additional layer adds exactly one extra factor; order of multiplication does not matter.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to evaluate outer derivative at inner value | Students write cos(x) instead of cos(x³) | Always replace the dummy variable with the inner expression before writing final answer. |
| Treating constants inside outer function as variables | Confusion between parameters and variables | Mark every symbol that depends on x with an arrow before differentiating. |
| Dropping the inner derivative when it is a constant | “It is just a number” mindset | Even if inner derivative is constant, it must still appear. |
| Applying chain rule twice on the same layer | Mis-counting composition depth | Draw a small bracket diagram showing each pair of parentheses. |
| Sign error in inner quotient or product | Algebraic slip inside inner derivative | Recompute inner derivative on a separate line before multiplying. |
| Using chain rule when functions are not composed | Over-application on sums | Check whether one function’s output is literally the other function’s input. |
| Limit argument missing when g′(x)=0 | Special case ignored | Verify separately that the difference quotient tends to zero. |

## 7. The textbook-precise statement
Let f be a function defined on an open interval containing the point g(a), and let g be defined on an open interval containing a. Suppose g is differentiable at a and f is differentiable at g(a). Then the composite function f ∘ g is differentiable at a and  
$$
(f\circ g)'(a)=f'(g(a))\,g'(a).
$$
(Stewart, *Calculus*, 9e, §3.4, Theorem 3)

## 8. Visual — diagram or schematic
```text
x ──[g]──▶ u=g(x) ──[f]──▶ y=f(u)
     │               │
   g'(x)          f'(u)   ← evaluated at u=g(x)
     │               │
     └── multiply ───┘
           │
           ▼
       (f∘g)'(x)
```
Horizontal arrows show successive mappings; vertical arrows show where each derivative is taken; the final multiplication yields the composite derivative.

## 9. The memory technique
1. **The hook** — Picture a train: the engine (outer) pulls the carriages (inner). The speed of the whole train is engine speed (at carriage position) times carriage speed.
2. **What to overlearn** — (f ∘ g)′ = f′(g) g′ and the three-line limit argument that proves it.
3. **Spaced-repetition schedule** — Review the proof at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Return to the difference quotient, insert and cancel the inner increment Δu, then take limits separately.

## 10. What this unlocks
Once the chain rule is solid, every later differentiation technique (implicit, logarithmic, parametric, related rates) becomes a direct application or modest extension.

- Multivariable chain rule for gradients and directional derivatives  
- Automatic-differentiation engines in machine learning  
- Linearisation of nonlinear ODE systems via the variational equation  
- Back-propagation algorithm viewed as reverse-mode chain rule  
- Sensitivity analysis in optimal-control problems  

## 11. Self-check — five questions, no answers
1. Differentiate sin(cos(x²)) and state which factor comes from which layer.  
2. Prove that d/dx [f(x)]^n = n [f(x)]^{n-1} f′(x) using only the chain rule and power rule for constants.  
3. Find the derivative of e^{1/x} at x = 2; then explain why the answer would be undefined at x = 0.  
4. A student writes d/dx sin(x²) = cos(2x). Identify the exact conceptual error and correct it.  
5. Let g be differentiable everywhere and g(0) = 0, g′(0) = 3. Define f(u) = u² sin(1/u) for u ≠ 0 and f(0) = 0. Compute (f ∘ g)′(0).