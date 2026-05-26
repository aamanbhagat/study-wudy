## 1. The one-sentence answer
**Separable ODEs are first-order equations that can be algebraically rearranged into the product form \( g(y) \, dy = f(x) \, dx \), after which both sides are integrated to produce an implicit relation between \( x \) and \( y \).**

Aap already jaante hain ki ek ordinary differential equation (ODE) mein ek unknown function aur uske derivatives hote hain. Jab equation ko aise likha ja sake ki saare \( y \)-dependent terms ek taraf aur \( x \)-dependent terms doosri taraf aa jaayein, tab hum variables ko “separate” kar paate hain. Is separation ke baad integration ek antar (integral) equation deta hai jismein \( y \) ko explicitly solve karna zaroori nahi hota; relation khud hi solution hota hai.

Yeh technique sirf tab kaam karti hai jab right-hand side ko do alag functions mein factor kiya ja sake. Agar aisa factorisation possible hai toh solution ka implicit form \( G(y) = F(x) + C \) ban jaata hai, jahaan \( G \) aur \( F \) antiderivatives hain. Kabhi-kabhi is implicit form ko explicit \( y = \phi(x) \) mein badalna mushkil hota hai, lekin implicit form bhi kaafi hota hai kyunki aap usmein se qualitative information nikaal sakte hain.

> [!NOTE]
> The deepest “aha” yeh hai ki separation of variables actually chain rule ko reverse karti hai: jab aap \( \frac{dy}{dx} = f(x)g(y) \) ko \( \frac{1}{g(y)} dy = f(x) dx \) likhte hain, toh left side \( \frac{d}{dx} G(y(x)) \) ka antar hai.

## 2. Why this matters — concrete and current
Newton’s law of cooling governs temperature decay of satellites in low-Earth orbit; SpaceX thermal engineers use the separable form to predict how fast a Starlink panel cools during eclipse.

Radioactive decay chains inside semiconductor doping processes at TSMC are modelled by separable rate equations; the implicit solution directly gives dopant concentration versus anneal time.

Logistic population models inside epidemiological software (e.g., the compartmental models used by Imperial College COVID-19 team) reduce to separable ODEs when vital dynamics are ignored; the implicit solution yields the classic S-curve without needing numerical solvers at early design stages.

Mixing problems in continuous stirred-tank reactors at BASF chemical plants are first written as separable mass-balance ODEs; the resulting implicit relation tells operators the exact residence time needed to reach a target concentration.

In orbital mechanics, the two-body problem under inverse-square gravity reduces, after angular-momentum conservation, to a separable radial ODE whose implicit solution is the polar equation of a conic section; this is still used in preliminary trajectory design at NASA JPL.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Single-variable integration and antiderivatives | Direct integration after separation produces the solution |
| Chain rule (differentiation) | Separation is the chain rule run backwards                |
| Implicit differentiation | Needed later to verify that an implicit relation satisfies the ODE |
| Domain and range of functions | Guarantees that division by \( g(y) \) is valid           |

Agar upar ke koi bhi concept weak hain toh pehle unhe revise karo; warna separation steps galat ho jaayenge.

## 4. Building the idea — from intuition to formalism

### Step 1 — Spot the product structure
Aap dekhte hain ki right-hand side do functions ka product hai, ek sirf \( x \) ka aur ek sirf \( y \) ka.  
Example: \( \frac{dy}{dx} = x y^2 \).  
Formal statement: \( \frac{dy}{dx} = f(x) g(y) \) with \( g(y) \neq 0 \).  
> [!WARNING] Agar aap \( g(y) = 0 \) ko divide kar dete hain toh constant solutions kho jaate hain.

### Step 2 — Algebraic separation
Dono taraf divide aur multiply karke saare \( y \)-terms left aur \( x \)-terms right kar do.  
Example: \( y^{-2} dy = x \, dx \).  
Formal: \( \frac{1}{g(y)} dy = f(x) dx \).

### Step 3 — Integrate both sides
Antiderivative lo.  
$$ \int \frac{1}{g(y)} \, dy = \int f(x) \, dx + C $$  
Yeh step already implicit solution deta hai.

### Step 4 — Introduce the arbitrary constant correctly
Constant ek taraf hi aata hai; dono taraf alag-alag constants daalne ki zaroorat nahi.  
> [!WARNING] Do constants daal kar aap ek hi family ko do baar count kar rahe hote hain.

### Step 5 — Verify by implicit differentiation
Differentiate both sides w.r.t. \( x \) using chain rule; aap wapas original ODE paa jaate ho. Yeh final rigour check hai.

## 5. Worked examples — har step show karo

**Example 1 — Basic polynomial**  
*Given:* \( \frac{dy}{dx} = x y \).  
*Find:* implicit solution.  
Divide: \( \frac{1}{y} dy = x \, dx \).  
Integrate: \( \ln |y| = \frac{x^2}{2} + C \).  
*Why:* Division isolates variables; integration produces logs and quadratics.  
**Final answer**  
\[ \ln |y| = \frac{x^2}{2} + C \]  

*Reflection:* Trivial case; constant solutions \( y = 0 \) alag se check karna zaroori tha.

**Example 2 — Trigonometric**  
*Given:* \( \frac{dy}{dx} = \frac{\cos x}{\sin y} \).  
Separate: \( \sin y \, dy = \cos x \, dx \).  
Integrate: \( -\cos y = \sin x + C \).  
**Final answer**  
\[ \cos y + \sin x = K \]  

*Reflection:* Sign absorbed into arbitrary constant; implicit form already clean.

**Example 3 — Rational with initial condition**  
*Given:* \( \frac{dy}{dx} = \frac{x+1}{y^2} \), \( y(0) = 2 \).  
Separate and integrate: \( \frac{y^3}{3} = \frac{x^2}{2} + x + C \).  
Apply IC: \( C = \frac{8}{3} \).  
**Final answer**  
\[ y^3 = \frac{3}{2}x^2 + 3x + 8 \]  

*Reflection:* Initial condition fixes constant without solving for \( y \) explicitly.

**Example 4 — Hidden separable after substitution**  
*Given:* \( \frac{dy}{dx} = e^{x-y} \).  
Rewrite: \( e^y dy = e^x dx \).  
Integrate: \( e^y = e^x + C \).  
**Final answer**  
\[ y = \ln(e^x + C) \]  

*Reflection:* Exponential product looked non-separated until rewritten; always check for such rewrites.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting \( y = 0 \) solution   | Division by \( g(y) \) discards it          | Always test constant solutions separately    |
| Two arbitrary constants           | Integrating both sides independently        | Keep only one constant on one side           |
| Division by zero at singular points | \( g(y) = 0 \) at isolated points           | Check domain before separating               |
| Losing absolute value in logs     | Careless antiderivative                     | Retain \( |y| \) until final simplification     |
| Treating implicit as explicit     | Solving for \( y \) when algebra fails      | Leave in implicit form when asked            |
| Sign errors after integration     | Absorbing signs into \( C \) wrongly        | Verify by differentiation                    |
| Applying IC before integration    | Constant evaluated on wrong equation        | Integrate fully, then substitute             |

## 7. The textbook-precise statement
A first-order ODE \( \frac{dy}{dx} = f(x,y) \) is called separable if there exist continuous functions \( f_1(x) \) and \( g_1(y) \) such that \( f(x,y) = \frac{f_1(x)}{g_1(y)} \) on some rectangle where \( g_1(y) \neq 0 \). Under this hypothesis the equation can be rewritten \( g_1(y) dy = f_1(x) dx \). Integrating both sides yields the implicit solution \( G(y) = F(x) + C \), where \( G' = g_1 \) and \( F' = f_1 \). Every differentiable solution of the implicit relation satisfies the original ODE on intervals where \( g_1(y(x)) \neq 0 \) (Boyce & DiPrima, Elementary Differential Equations and Boundary Value Problems, 11e, §2.2).

## 8. Visual — diagram or schematic
```text
x-axis →          y-axis ↑
   f(x)            g(y)
   ----   multiply   ----
   dx                dy
     \               /
      \             /
       \           /
        v         v
         ∫f(x)dx = ∫g(y)dy + C
              implicit curve G(y) − F(x) = C
```
Horizontal arrows show integration after separation; vertical link shows the chain-rule origin.

## 9. The memory technique
1. **The hook** — Picture variables “divorcing”: x goes to one courtroom, y to another; each gets its own integral “lawyer”.
2. **What to overlearn** — Form \( g(y) dy = f(x) dx \); the single-constant rule; verification by implicit differentiation.
3. **Spaced-repetition schedule** — Review examples after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start again from chain rule: \( \frac{d}{dx} G(y(x)) = g(y) y' \); set equal to \( f(x) \) and rearrange.

## 10. What this unlocks
Aap ab exact equations, linear first-order ODEs aur substitution methods (homogeneous, Bernoulli) padh sakte hain.  
- Exact equations extend the same integration idea to non-separable forms.  
- Linear ODE integrating-factor technique often reduces to a separable equation after multiplication.  
- Autonomous systems in phase-plane analysis begin with separable scalar equations as the simplest case.

## 11. Self-check — five questions, no answers
1. Separate and solve \( \frac{dy}{dx} = \frac{x^2}{1+y^2} \) and state the implicit solution.  
2. Does \( y \equiv -1 \) satisfy \( \frac{dy}{dx} = (y+1)x \)? Show verification.  
3. Identify the step where absolute values may be dropped in \( \int \frac{1}{y} dy \).  
4. Given \( y(0) = 0 \), why must you check whether the separated equation is valid at that point?  
5. Convert the implicit solution \( \ln |y| + e^{-x} = C \) back to explicit form and differentiate to confirm it solves the ODE.