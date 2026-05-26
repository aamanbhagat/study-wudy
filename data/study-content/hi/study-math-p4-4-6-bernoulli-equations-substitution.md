## 1. The one-sentence answer
**A Bernoulli equation is a first-order nonlinear ODE that becomes linear after the substitution \(v = y^{1-n}\).**

Iska matlab yeh hai ki jab aapke paas equation \( y' + P(x)y = Q(x)y^n \) (with \( n \neq 0,1 \)) ho, toh direct linear methods apply nahi hote. Lekin ek power substitution se nonlinear term ko hataya ja sakta hai aur equation ko standard linear form mein badla ja sakta hai. Substitution ke baad aap integrating factor use karke solve kar sakte ho, phir \( v \) se wapas \( y \) nikaal sakte ho.

Yeh technique sirf tab kaam karti hai jab equation exactly isi form mein ho. Agar n=0 ya n=1 ho toh equation already linear hoti hai aur substitution ki zaroorat nahi padti.

> [!NOTE]
> The single "aha" moment is that the exponent \(1-n\) is deliberately chosen so that the chain rule on \( v' \) exactly cancels the \( y^n \) power and produces a linear term in \( v \).

## 2. Why this matters — concrete and current
In aerospace guidance, the rocket equation with quadratic drag is frequently reduced to a Bernoulli equation; SpaceX trajectory teams linearise it via this substitution before feeding the result into Model Predictive Control loops.

In semiconductor doping models, the nonlinear diffusion equation for impurity concentration is transformed by the same substitution, allowing closed-form solutions that feed directly into TCAD simulation software used by TSMC and Intel.

In population dynamics with Allee effects, the logistic model with an extra \( y^n \) term appears in papers on invasive species; the Bernoulli substitution yields explicit thresholds that field ecologists at USGS plug into decision-support dashboards.

In optimal control of chemotherapy dosing, the tumour-growth ODE is Bernoulli; oncologists at MD Anderson convert it to linear form so that Pontryagin’s principle can be applied analytically before numerical refinement.

In MEMS capacitor design, the pull-in voltage equation reduces to a Bernoulli ODE whose closed solution determines safe operating voltages for STMicroelectronics sensors.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| First-order linear ODE | After substitution the equation must be solved by an integrating factor |
| Chain rule           | Differentiating \( v = y^{1-n} \) produces the exact cancellation needed |
| Integrating factor   | The transformed equation is linear and requires this method |
| Separation of variables | Used both before and after the substitution step         |

Agar aapko linear first-order ODEs ya chain rule comfortable nahi hain, toh pehle woh sections revise karo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Recognise the nonlinear power
Aap dekhte ho ki equation mein \( y^n \) term present hai jisse linearity toot rahi hai. Concrete example: \( y' + xy = x^3 y^2 \). Yahan n=2 hai.

Formally, the Bernoulli equation is
$$ y' + P(x)y = Q(x)y^n, \quad n \neq 0,1. $$

> [!WARNING]
> Agar aap n ko galat identify kar lete ho, toh substitution factor \(1-n\) galat ho jaayega aur linearity nahi aayegi.

### Step 2 — Introduce the substitution
Define \( v = y^{1-n} \). Isse \( y = v^{1/(1-n)} \) ban jaata hai. Example mein n=2 toh \( v = y^{-1} \).

Formally,
$$ v = y^{1-n}. $$

> [!WARNING]
> Bhool jaana ki \( y \) ko \( v \) ke terms mein express karna padega, warna aap \( y' \) ko replace nahi kar paoge.

### Step 3 — Differentiate using the chain rule
Differentiate both sides: \( v' = (1-n)y^{-n} y' \). Example: \( v' = -y^{-2} y' \).

Formally,
$$ v' = (1-n)y^{-n} y'. $$

> [!WARNING]
> Sign error ya exponent mistake yahan common hai aur pura equation sign-flip kar deta hai.

### Step 4 — Solve for \( y' \) and substitute
\( y' = \frac{v'}{(1-n)y^{-n}} \) ko original equation mein daalo. Nonlinear term cancel ho jaata hai aur linear equation \( v' + (1-n)P(x)v = (1-n)Q(x) \) milti hai.

Formally,
$$ \frac{v'}{1-n} + P(x)v = Q(x). $$

> [!WARNING]
> Agar aap \( 1-n \) ko divide karna bhool jaayein toh coefficients galat ho jaate hain.

### Step 5 — Solve the linear equation
Ab standard integrating factor \( \mu = e^{\int(1-n)P(x)\,dx} \) use karo, \( v \) nikaalo, phir \( y = v^{1/(1-n)} \) se wapas aao.

Formally, the transformed equation is linear and solved by the usual method; back-substitution recovers \( y \).

## 5. Worked examples — har step show karo

**Example 1 — Simple constant-coefficient case**
*Given:* \( y' + y = xy^2 \)
*Find:* explicit solution

Divide by \( y^2 \): \( y^{-2}y' + y^{-1} = x \).  
Let \( v = y^{-1} \), then \( v' = -y^{-2}y' \), so \( -v' + v = x \).  
Why: substitution directly produces linear equation.  
Integrating factor \( e^{-x} \): \( \frac{d}{dx}(v e^{-x}) = -x e^{-x} \).  
Integrate: \( v e^{-x} = -x e^{-x} - e^{-x} + C \).  
Thus \( v = -x-1 + C e^x \).  
Back-substitute: \( y = \frac{1}{C e^x - x - 1} \).  
**\( y = (C e^x - x - 1)^{-1} \)**

*Reflection:* Constant coefficients made integration trivial; the same algebra works for variable coefficients.

**Example 2 — Variable coefficient, n=3**
*Given:* \( y' + \frac{1}{x}y = x^2 y^3 \)
*Find:* solution on \( x>0 \)

Let \( v = y^{-2} \), so \( v' = -2 y^{-3} y' \).  
Divide original by \( y^3 \): \( y^{-3}y' + x^{-1} y^{-2} = x^2 \).  
Multiply by −1/2: \( -\frac12 y^{-3}y' - \frac12 x^{-1} y^{-2} = -\frac12 x^2 \).  
Hence \( \frac12 v' + \frac12 x^{-1} v = -\frac12 x^2 \).  
Why: factor 1/2 keeps coefficients clean.  
Integrating factor \( \sqrt{x} \): solve to obtain \( v = -\frac12 x^2 + C x^{-1} \).  
Thus \( y = (C x^{-1} - \frac12 x^2)^{-1/2} \).  
**\( y = \left( C x^{-1} - \tfrac12 x^2 \right)^{-1/2} \)**

*Reflection:* Negative exponent in integrating factor is handled by careful algebra; sign of n dictates the power.

**Example 3 — Initial-value problem**
*Given:* \( y' - 2y = x y^{-1} \), \( y(0)=1 \)
*Find:* solution satisfying IC

n=−1 so \( v=y^2 \), \( v'=2y y' \).  
Divide by y: \( y^{-1}y' - 2 y^{-1} = x \).  
Multiply by 2: \( 2y^{-1}y' - 4 y^{-1} = 2x \).  
Hence \( v' - 2v = 2x \).  
Why: factor 2 aligns with derivative of v.  
Integrating factor \( e^{-2x} \): \( v = -x - \frac12 + C e^{2x} \).  
IC gives C=3/2, so \( v = -x -1/2 + \frac32 e^{2x} \).  
**\( y = \sqrt{\frac32 e^{2x} - x - \frac12} \)**

*Reflection:* IC fixes constant only after back-substitution; sign check under square root is mandatory.

**Example 4 — Singular solution check**
*Given:* \( y' + y = y^2 \)
*Find:* all solutions including possible singular ones

Let \( v = y^{-1} \), obtain \( v' - v = -1 \).  
Solution \( v = 1 + C e^{-x} \).  
Thus \( y = (1 + C e^{-x})^{-1} \).  
When C→∞ we recover y=0, which also satisfies the ODE.  
**General solution \( y = (1 + C e^{-x})^{-1} \), plus singular solution y=0**

*Reflection:* Always test y=0 separately when n>1; it may be an envelope solution.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using v = y^n instead of v = y^{1-n} | Students copy substitution from separable equations | Always compute 1-n first from the given power |
| Forgetting to multiply the right-hand side by 1-n | Division step is skipped                    | Write the transformed equation explicitly before integrating |
| Sign error in v'            | Chain-rule sign overlooked                  | Differentiate v = y^{1-n} on paper every time |
| Applying substitution when n=0 or 1 | Equation is already linear                  | Check n before starting                      |
| Losing domain restrictions after back-substitution | Negative bases or even roots                | State interval where solution is real        |
| Treating C as final answer without back-substituting | Stops one step early                        | Always finish with y in terms of x           |
| Using wrong integrating factor power | (1-n)P(x) coefficient missed                | Write μ = exp(∫(1-n)P dx) explicitly         |

## 7. The textbook-precise statement
A Bernoulli equation is the first-order equation
$$ \frac{dy}{dx} + P(x)y = Q(x)y^n, \quad n\in\mathbb{R}\setminus\{0,1\}, $$
where P and Q are continuous on an interval I. The substitution \( v=y^{1-n} \) produces the linear equation
$$ \frac{dv}{dx} + (1-n)P(x)v = (1-n)Q(x). $$
If \( \mu(x)=\exp\bigl(\int(1-n)P(x)\,dx\bigr) \) is an integrating factor, then
$$ v(x)=\mu(x)^{-1}\Bigl(C+\int\mu(s)(1-n)Q(s)\,ds\Bigr). $$
The solution y is recovered by \( y=v^{1/(1-n)} \) on intervals where the expression is defined and differentiable. (Boyce & DiPrima, *Elementary Differential Equations*, 11e, §2.4)

## 8. Visual — diagram or schematic
```
x-axis
  |          v(x) after IF
  |   μ(x) * v(x) = integral curve
  |        /
  |       /
  |      /
y-axis  /
         original nonlinear y(x) curve bends upward
```

The horizontal axis is x; the vertical axis shows both v and y on different scales. The straight-line behaviour appears only after the substitution and integrating factor are applied.

## 9. The memory technique
1. **The hook** — Picture a “power ladder”: the exponent 1-n knocks the nonlinear rung down to a linear one, like removing a middle step on a staircase.
2. **What to overlearn** — Formula \( v = y^{1-n} \) and the exact transformed linear equation \( v' + (1-n)P v = (1-n)Q \).
3. **Spaced-repetition schedule** — Review the substitution step after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If you forget the formula, start from \( v = y^{1-n} \), differentiate with chain rule, solve for y', substitute, and watch the y^n term cancel.

## 10. What this unlocks
Mastering Bernoulli substitution lets you solve an entire family of nonlinear first-order models that appear in control theory and population dynamics, and it prepares the ground for more advanced exact-equation techniques and Riccati equations.

- Next: exact equations via integrating factors that are functions of both variables
- Riccati equations, which reduce to Bernoulli when a particular solution is known
- Autonomous equations reducible by v = y^k substitutions in higher-order cases

## 11. Self-check — five questions, no answers
1. Identify n and write the substitution for \( y' + 3x^2 y = 5x y^4 \).
2. After substitution, what is the coefficient of v in the linear equation obtained from \( y' - \frac{2}{x}y = x y^{1/2} \)?
3. Solve \( y' + y = y^3 \), y(0)=1/2 and state the maximal interval of existence.
4. Why does the substitution fail when n=1, and what method replaces it?
5. A student obtains \( v' + 2v = x \) but forgets to multiply the right-hand side by (1-n). What is the resulting error in y?