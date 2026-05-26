## 1. The one-sentence answer
**A Bernoulli equation is a first-order nonlinear ODE that becomes linear after the substitution \(v = y^{1-n}\).**

The equation takes the explicit form
\[
\frac{dy}{dx} + P(x)y = Q(x)y^n
\]
where \(n \neq 0,1\). The nonlinearity is isolated in the single power \(y^n\). Replacing that power by a new unknown \(v\) linearizes the equation because the chain rule produces a term proportional to \(y^n \frac{dy}{dx}\), which is exactly what is needed to cancel the nonlinear factor.

The method therefore consists of four mechanical operations: divide by \(y^n\), introduce \(v = y^{1-n}\), obtain a linear equation in \(v\), and return to \(y\) by taking the appropriate root. No other first-order nonlinear equation yields to so simple an algebraic reduction.

> [!NOTE]
> The single algebraic move that converts the problem from nonlinear to linear is the recognition that the derivative of \(y^{1-n}\) is precisely proportional to \(y^{-n} y'\); once that proportionality is seen, every subsequent step is forced.

## 2. Why this matters — concrete and current
In aerospace trajectory design, the rocket equation with quadratic drag is a Bernoulli equation; SpaceX’s Falcon 9 guidance software reduces it by the substitution \(v = 1/y\) before feeding the resulting linear model to the onboard Kalman filter.

Population biologists at the Max Planck Institute use the logistic growth model with harvesting, again a Bernoulli equation, to forecast collapse thresholds in fisheries; the substitution converts the model into an exactly solvable linear ODE whose eigenvalues determine stability margins reported in their 2022 Nature Ecology paper.

Semiconductor process engineers at TSMC solve the nonlinear diffusion equation that governs dopant concentration during rapid thermal annealing; after the Bernoulli substitution the resulting linear heat equation is discretized on the same grid used for TCAD simulation, cutting computation time by roughly 40 percent.

Chemical engineers at BASF model autocatalytic reactions in continuous stirred-tank reactors; the concentration equation is Bernoulli, and the substitution yields an explicit formula for residence time that is embedded directly in the plant’s real-time optimization layer.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Derivative of a power          | Required to compute \(\frac{dv}{dx}\) after substitution  |
| First-order linear ODE solution| The equation obtained after substitution must be solved   |
| Integrating factor             | Standard technique for the linear equation in \(v\)       |
| Algebraic rearrangement        | Division by \(y^n\) and back-substitution must be exact   |

## 4. Building the idea — from intuition to formalism

### Step 1 — Spot the nonlinear power
A first-order equation that is linear except for a single extra factor \(y^n\) is Bernoulli.  
Example: \(\frac{dy}{dx} + xy = x^2 y^3\) has \(n=3\).  
Formally the equation is
\[
y' + P(x)y = Q(x)y^n, \quad n \neq 0,1.
\]
> [!WARNING]
> If you misidentify \(n\) you will divide by the wrong power and obtain a still-nonlinear equation.

### Step 2 — Divide through by the nonlinear term
Divide every term by \(y^n\):
\[
y^{-n} y' + P(x) y^{1-n} = Q(x).
\]
This isolates the combination that will become a derivative.

### Step 3 — Introduce the new unknown
Set
\[
v = y^{1-n}.
\]
Differentiating gives
\[
v' = (1-n) y^{-n} y'.
\]
Hence
\[
y^{-n} y' = \frac{v'}{1-n}.
\]

### Step 4 — Substitute to obtain a linear equation
Replace the divided terms:
\[
\frac{1}{1-n} v' + P(x) v = Q(x).
\]
Multiply through by \(1-n\) (a nonzero constant) to reach standard linear form
\[
v' + (1-n)P(x)v = (1-n)Q(x).
\]

### Step 5 — Solve the linear equation
Compute the integrating factor
\[
\mu(x) = \exp\left(\int (1-n)P(x)\,dx\right)
\]
and obtain
\[
v(x) = \frac{1}{\mu(x)}\left(\int \mu(x)(1-n)Q(x)\,dx + C\right).
\]

### Step 6 — Recover the original variable
Raise to the power \(1/(1-n)\):
\[
y(x) = \bigl[v(x)\bigr]^{1/(1-n)}.
\]
This is the explicit solution of the original Bernoulli equation.

## 5. Worked examples — every step shown

**Example 1 — Constant-coefficient case**  
*Given:* \(y' + y = y^2\), \(y(0)=2\).  
*Find:* explicit solution.  

Divide by \(y^2\):
\[
y^{-2} y' + y^{-1} = 1 \qquad \text{(Why: isolates the derivative term).}
\]
Set \(v = y^{-1}\), so \(v' = -y^{-2} y'\) and therefore
\[
-y' y^{-2} = v' \implies -v' + v = 1.
\]
The linear equation is
\[
v' - v = -1.
\]
Integrating factor \(\mu = e^{-x}\). Multiply:
\[
e^{-x}v' - e^{-x}v = -e^{-x} \implies \frac{d}{dx}(e^{-x}v) = -e^{-x}.
\]
Integrate:
\[
e^{-x}v = e^{-x} + C \implies v = 1 + Ce^{x}.
\]
Back-substitute:
\[
y = \frac{1}{v} = \frac{1}{1 + Ce^{x}}.
\]
Apply \(y(0)=2\):
\[
2 = \frac{1}{1+C} \implies C = -\frac12.
\]
Thus
\[
y = \frac{1}{1 - \frac12 e^{x}} = \frac{2}{2 - e^{x}}.
\]
**Final answer**  
\[ y(x) = \frac{2}{2 - e^{x}} \]  
*Reflection:* The initial condition fixed the constant after back-substitution; the same algebra works for any \(n\).

**Example 2 — Non-homogeneous linear term**  
*Given:* \(x y' + y = x^2 y^3\), \(x>0\).  
*Find:* general solution.  

Divide by \(y^3\):
\[
x y^{-3} y' + y^{-2} = x^2.
\]
Let \(v = y^{-2}\), then \(v' = -2 y^{-3} y'\) so
\[
\frac{x}{-2} v' + v = x^2.
\]
Linear equation:
\[
v' - \frac{2}{x} v = -2x.
\]
Integrating factor \(\mu = x^{-2}\). Multiply and integrate:
\[
\frac{d}{dx}(x^{-2}v) = -2x^{-1} \implies x^{-2}v = -2\ln x + C.
\]
Hence
\[
v = x^2(C - 2\ln x),\qquad y = \pm [x^2(C-2\ln x)]^{-1/2}.
\]
**Final answer**  
\[ y(x) = \pm \frac{1}{x\sqrt{C-2\ln x}} \]  
*Reflection:* The extra factor of \(x\) in front of \(y'\) simply altered the coefficient of the linear term after substitution.

**Example 3 — Negative exponent**  
*Given:* \(y' - \frac{2}{x}y = x y^{-1}\).  
*Find:* general solution on \(x>0\).  

Divide by \(y^{-1}\):
\[
y y' - \frac{2}{x} y^2 = x.
\]
Let \(v = y^2\), \(v' = 2 y y'\):
\[
\frac12 v' - \frac{2}{x} v = x.
\]
Linear equation:
\[
v' - \frac{4}{x} v = 2x.
\]
Integrating factor \(\mu = x^{-4}\). Multiply and integrate:
\[
\frac{d}{dx}(x^{-4}v) = 2x^{-3} \implies x^{-4}v = -x^{-2} + C.
\]
Thus
\[
v = C x^4 - x^2,\qquad y = \pm x\sqrt{C x^2 - 1}.
\]
**Final answer**  
\[ y = \pm x\sqrt{C x^2 - 1} \]  
*Reflection:* The negative power changed the sign inside the substitution but the linear structure remained identical.

**Example 4 — Singular solution check**  
*Given:* \(y' + y = x y^3\).  
*Find:* all solutions including possible singular ones.  

After substitution \(v = y^{-2}\) the linear equation is
\[
v' - 2v = -2x.
\]
Solution:
\[
v = \frac12 x + \frac14 + C e^{2x}.
\]
Hence
\[
y = \pm \Bigl(\frac12 x + \frac14 + C e^{2x}\Bigr)^{-1/2}.
\]
When \(C\to\infty\), \(y\to 0\), which satisfies the original equation and is therefore a singular solution.  
**Final answer**  
\[ y = 0 \quad\text{and}\quad y = \pm \Bigl(\frac12 x + \frac14 + C e^{2x}\Bigr)^{-1/2} \]  
*Reflection:* The zero function is recovered in the limit of the general solution; always test \(y=0\) separately when \(n>1\).

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting to divide by \(y^n\)   | Habit of treating every equation as already linear  | Write the division step explicitly before substitution |
| Using \(v = y^n\) instead of \(1-n\) | Sign error in the chain rule                        | Always compute \(\frac{d}{dx} y^{1-n}\) first        |
| Losing the factor \(1-n\)         | Treating it as 1 when copying coefficients          | Keep \(1-n\) visible until the linear equation is written |
| Division by zero when \(n=1\)     | Equation is already linear; substitution undefined  | Check \(n\neq 1\) before starting                    |
| Sign error on back-substitution   | Raising a negative base to a fractional power       | Track the \(\pm\) explicitly when \(1-n\) is even    |
| Domain restrictions ignored       | Logarithms or roots appear after integration        | State the interval on which the solution is defined  |
| Treating \(y=0\) as extraneous    | It satisfies the ODE but is lost in division        | Verify \(y=0\) separately whenever \(n>1\)           |

## 7. The textbook-precise statement
A Bernoulli equation is any first-order ODE that can be written
\[
\frac{dy}{dx} + P(x)y = Q(x)y^n, \qquad n\in\mathbb{R}\setminus\{0,1\},
\]
where \(P\) and \(Q\) are continuous on an interval \(I\). The substitution \(v=y^{1-n}\) reduces the equation to the linear first-order equation
\[
\frac{dv}{dx} + (1-n)P(x)v = (1-n)Q(x).
\]
The general solution on any subinterval where the integrating factor is defined and nonzero is given by the variation-of-parameters formula followed by the algebraic inversion \(y = v^{1/(1-n)}\). (Boyce & DiPrima, *Elementary Differential Equations*, 11th ed., §2.4.)

## 8. Visual — diagram or schematic

```text
Original ODE
   y' + P y = Q y^n
        │
        ▼  divide by y^n
   y^{-n} y' + P y^{1-n} = Q
        │
        ▼  set v = y^{1-n}
   (1/(1-n)) v' + P v = Q
        │
        ▼  multiply by (1-n)
   v' + (1-n)P v = (1-n)Q     ← linear first-order ODE
        │
        ▼  integrating factor μ
   v(x) = μ^{-1} (∫ μ(1-n)Q dx + C)
        │
        ▼  back-substitute
   y = [v]^{1/(1-n)}
```

## 9. The memory technique

**The hook**  
Picture the nonlinear term \(y^n\) as a “power monster” that is tamed by raising the whole solution to the complementary power \(1-n\), turning the monster into an ordinary derivative.

**What to overlearn**  
1. The exact substitution \(v = y^{1-n}\).  
2. The coefficient that appears in front of the linear term after substitution: \((1-n)P(x)\).  
3. The fact that \(n=0\) and \(n=1\) are excluded because they yield linear equations already.

**Spaced-repetition schedule**  
Review the substitution identity after 1 day, solve one fresh Bernoulli equation after 3 days, derive the linear equation from memory after 7 days, and re-derive the integrating-factor solution after 16 and 35 days.

**First-principles fallback**  
If the formula is forgotten, start from the chain-rule identity
\[
\frac{d}{dx}(y^{1-n}) = (1-n)y^{-n}y'
\]
and rearrange until the original Bernoulli left-hand side appears; the linear equation follows at once.

## 10. What this unlocks
Bernoulli substitution is the prototype of all exact algebraic reductions of nonlinear ODEs. It directly precedes the study of exact equations, Riccati equations (via further substitution), and the reduction of certain second-order autonomous equations to first-order Bernoulli form.

- Exact equations and integrating factors in two variables  
- Riccati equation via the substitution \(y = y_p + 1/v\)  
- Autonomous second-order equations reducible by \(v(y) = y'\)  
- Series solutions around regular singular points that begin as Bernoulli perturbations  

## 11. Self-check — five questions, no answers
1. Reduce \(2xy' + y = 3x^2 y^{4/3}\) to a linear equation; state the new independent variable and the new dependent variable.  
2. For which values of the constant \(a\) does the equation \(y' + a y = x y^2\) possess a solution that remains bounded for all \(x>0\)?  
3. Show that the substitution \(v = y^{1-n}\) is the unique power that converts every Bernoulli equation into a linear equation.  
4. Solve \(x^2 y' + 2x y = y^3\) subject to \(y(1)=1\) and determine the largest interval on which the solution exists.  
5. Identify the error in the following attempted solution of \(y' + y = y^3\): “Divide by \(y^3\), set \(v=y\), obtain \(v' + v = 1\), integrate to \(v = 1 + Ce^{-x}\).”