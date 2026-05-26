## 1. The one-sentence answer
**Partial derivatives quantify the instantaneous rate of change of a multivariable function along one coordinate direction while all other variables remain fixed.**

Aap ek function \(f(x,y)\) lete ho. Jab aap \(x\) ko badalte ho aur \(y\) ko constant rakhte ho, toh jo slope milta hai woh \(\partial f / \partial x\) hai. Yeh single-variable derivative ka direct extension hai, lekin ab surface ke upar ek specific direction mein slice banakar dekha jaata hai. Calculation bilkul same power rule, product rule wagairah se hoti hai, bas har baar yeh yaad rakhna padta hai ki dusre variables numbers ki tarah treat kiye jaate hain.

Geometric meaning yeh hai ki surface \(z = f(x,y)\) par ek point pe do alag tangent lines hote hain: ek \(x\)-direction mein aur ek \(y\)-direction mein. In dono slopes ko combine karke aap surface ka local behaviour samajh sakte ho bina poori surface ko ek saath differentiate kiye.

> [!NOTE]
> The single most important “aha” is that holding variables constant turns a surface into an ordinary curve in one plane, letting every tool from single-variable calculus apply slice-by-slice.

## 2. Why this matters — concrete and current
In climate modelling, NASA’s Earth System Models use partial derivatives of temperature and pressure fields with respect to latitude while holding longitude fixed; this produces the meridional heat-transport terms that drive global circulation forecasts.

In semiconductor process simulation, Synopsys TCAD tools compute \(\partial n / \partial x\) of carrier density inside a transistor channel while doping concentration is held constant; these derivatives feed directly into the drift-diffusion equations that predict leakage current before fabrication.

In reinforcement-learning robotics, DeepMind’s trajectory optimisers differentiate the value function partially with respect to joint angles while keeping time fixed; the resulting policy gradients update motor torques thousands of times per second on physical humanoid hardware.

In computational fluid dynamics for Boeing 787 wing design, the pressure coefficient \(C_p(x,y)\) is differentiated partially with respect to chord-wise coordinate \(x\) at constant span \(y\); these values locate shock-wave positions that determine drag rise at transonic speeds.

In quantitative finance, the Black–Scholes–Merton PDE for option pricing contains the term \(\partial V / \partial t\) (theta) while volatility and spot price are treated as independent variables; every major bank’s risk engine evaluates this daily for millions of contracts.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Single-variable derivative     | Definition and rules (power, product, chain) transfer directly once other variables are frozen |
| Limit definition of derivative | Partial derivative is exactly that limit in one variable |
| Functions of several variables | Domain, range and level surfaces must be visualised before slopes are computed |

If any row is unfamiliar, pause and review single-variable limits and derivatives first.

## 4. Building the idea — from intuition to formalism

### Step 1 — From ordinary derivative to slice
Aap already jaante ho ki \(df/dx\) ek curve ki slope deta hai. Multivariable case mein surface ko ek plane mein kaat kar wahi curve bana dete hain.

Example: \(f(x,y) = x^2 + y^2\). Plane \(y=2\) mein kaatne par curve \(z = x^2 + 4\) banta hai jiski slope \(2x\) hai.

Formal statement:  
\[
\frac{\partial f}{\partial x}(a,b) = \lim_{h \to 0} \frac{f(a+h,b)-f(a,b)}{h}.
\]

> [!WARNING]
> Agar aap limit ke andar \(b\) ko bhi \(h\)-dependent bana doge toh definition collapse ho jaayegi aur aap directional derivative nikal rahe honge, partial nahi.

### Step 2 — Notation conventions
\(\partial f / \partial x\), \(f_x\), aur \(D_x f\) sab ek hi cheez hain. Subscript notation \(f_x\) tab useful hoti hai jab multiple partials ek saath likhne hon.

### Step 3 — Calculation rules
Power rule, product rule, chain rule exactly waise hi lagte hain; har variable jo differentiate nahi ho raha hai use constant maana jaata hai.

Example: \(\partial/\partial x (x^2 y) = 2x y\) kyunki \(y\) constant hai.

### Step 4 — Geometric picture
At point \((a,b,f(a,b))\) the partial \(\partial f/\partial x\) is the slope of the tangent line lying in the plane parallel to the \(xz\)-plane.

### Step 5 — Higher-order mixed partials
Aap \(\partial^2 f / \partial y \partial x\) le sakte ho. Agar \(f\) ke second partials continuous hain toh Clairaut’s theorem se \(\partial^2 f / \partial x \partial y = \partial^2 f / \partial y \partial x\) hota hai.

### Step 6 — Textbook-grade definition
Let \(f: D \subset \mathbb{R}^n \to \mathbb{R}\) be defined on an open set. The partial derivative with respect to the \(i\)-th variable at \(\mathbf{a}\) exists if the following one-variable limit exists.

## 5. Worked examples — har step show karo

**Example 1 — Simple polynomial**  
*Given:* \(f(x,y) = 3x^2 y + y^3\).  
*Find:* \(\partial f / \partial x\) at \((1,2)\).  

Treat \(y\) constant:  
\[
\frac{\partial f}{\partial x} = 6x y.
\]  
*Why:* Power rule on \(x^2\) term only; \(y\) behaves like a coefficient.  
Substitute: \(6(1)(2) = 12\).  
**12**  

*Reflection:* The example is easy because no other variable depends on \(x\); the same rule scales to any number of variables.

**Example 2 — Product with chain rule**  
*Given:* \(f(x,y) = e^{xy} \sin x\).  
*Find:* \(\partial f / \partial y\).  

Product rule + chain rule on exponential:  
\[
\frac{\partial f}{\partial y} = e^{xy} \cdot x \cdot \sin x + e^{xy} \cdot 0 = x e^{xy} \sin x.
\]  
*Why:* \(\sin x\) is independent of \(y\), so its partial is zero.  
**\(x e^{xy} \sin x\)**  

*Reflection:* Students often forget the chain-rule factor \(x\); writing the inner function \(u=xy\) explicitly prevents the slip.

**Example 3 — Implicit surface**  
*Given:* \(x^2 + y^2 + z^2 = 9\).  
*Find:* \(\partial z / \partial x\) treating \(y\) constant.  

Differentiate both sides wrt \(x\):  
\[
2x + 2z \frac{\partial z}{\partial x} = 0 \implies \frac{\partial z}{\partial x} = -\frac{x}{z}.
\]  
*Why:* \(y\) disappears because it is held constant.  
**\(-\frac{x}{z}\)** (on the sphere, \(z \neq 0\))  

*Reflection:* Implicit differentiation reappears constantly in thermodynamics and optimisation constraints.

**Example 4 — Second mixed partial**  
*Given:* \(f(x,y) = x^3 \sin y + y^2 e^x\).  
*Find:* \(\partial^2 f / \partial x \partial y\).  

First \(\partial f / \partial y = x^3 \cos y + 2y e^x\).  
Now differentiate wrt \(x\):  
\[
\frac{\partial^2 f}{\partial x \partial y} = 3x^2 \cos y + 2y e^x.
\]  
*Why:* Product rule on second term; first term’s \(x^3\) yields \(3x^2\).  
**\(3x^2 \cos y + 2y e^x\)**  

*Reflection:* Verifying equality with \(\partial^2 f / \partial y \partial x\) builds that mixed partials commute when smoothness holds.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating \(y\) as a function of \(x\) | Old single-variable habit                   | Explicitly write “hold \(y\) fixed” before differentiating |
| Writing \(d\) instead of \(\partial\) | Notation laziness                           | Use \(\partial\) whenever ≥2 independent variables exist |
| Forgetting chain-rule multiplier  | Inner function dependence overlooked        | Introduce intermediate variable \(u(x,y)\) each time |
| Evaluating at wrong point         | Order of substitution mistaken              | Compute symbolic partial first, substitute numbers last |
| Assuming mixed partials always equal | Clairaut’s hypothesis ignored               | Check continuity of second partials before swapping order |
| Confusing level curve with graph  | Visualisation error                         | Draw the slice plane \(y = b\) explicitly    |
| Zero partial implying constant function | Multivariable constant is stronger          | Remember \(f_x = 0\) only says constant along lines parallel to \(x\)-axis |

## 7. The textbook-precise statement
Let \(D \subset \mathbb{R}^2\) be open and let \(f: D \to \mathbb{R}\). The partial derivative of \(f\) with respect to \(x\) at \((a,b) \in D\) is defined by
\[
f_x(a,b) = \lim_{h \to 0} \frac{f(a+h,b) - f(a,b)}{h},
\]
provided the limit exists. The partial with respect to \(y\) is defined analogously. If \(f_x\) and \(f_y\) exist and are continuous on \(D\), then the mixed second partials are equal: \(f_{xy} = f_{yx}\) (Clairaut). (Stewart, *Calculus*, 9e, §14.3)

## 8. Visual — diagram or schematic
```
      z
      ↑
      |     surface z=f(x,y)
      |   ↗   ↘
      |  /     \
      | /       \
------|-----------→ y
     /|
    / |
   /  |
  x   |  tangent line in x-dir (slope = f_x)
      |  tangent line in y-dir (slope = f_y)
```
The two tangent lines lie in the planes \(y = b\) and \(x = a\) respectively; their slopes are the two first partial derivatives.

## 9. The memory technique
1. **The hook** — Picture a topographic map; walking purely east gives the east–west slope (\(f_x\)) while your north coordinate stays frozen.
2. **What to overlearn** — Definition with limit, power/product/chain rules applied while holding variables constant, and the equality \(f_{xy}=f_{yx}\) under continuity.
3. **Spaced-repetition schedule** — Review definition after 1 day, compute five fresh examples after 3 days, prove Clairaut on a new function after 7 days, then again at 16 and 35 days.
4. **First-principles fallback** — Return to the slice-plane picture: fix every variable except one, reduce to ordinary derivative, then restore the fixed values.

## 10. What this unlocks
Partial derivatives are the gateway to the gradient vector, directional derivatives, tangent planes, linear approximations, and the full machinery of vector calculus.  

- Gradient \(\nabla f\) is assembled directly from the partials.  
- Directional derivative in any unit vector \(\mathbf{u}\) is \(\nabla f \cdot \mathbf{u}\).  
- Tangent-plane equation uses \(f_x\) and \(f_y\) at the point of tangency.  
- Optimisation (critical points, Lagrange multipliers) begins with setting all partials to zero.  
- Divergence and curl in later vector-calculus chapters are built from partial operators.

## 11. Self-check — five questions, no answers
1. Compute \(\partial f / \partial x\) and \(\partial f / \partial y\) for \(f(x,y) = \ln(x^2 + y^2)\) at \((1,1)\).  
2. For \(f(x,y) = x^y\), find both first partials and verify the mixed partials are equal.  
3. A surface is given implicitly by \(x^3 + y^3 + z^3 = 3xyz\). Derive an expression for \(\partial z / \partial x\) holding \(y\) fixed.  
4. Explain in one sentence why \(f_x(a,b) = 0\) does not imply that \(f\) is constant everywhere.  
5. Construct a function where \(f_{xy} \neq f_{yx}\) at the origin and show where the continuity hypothesis fails.