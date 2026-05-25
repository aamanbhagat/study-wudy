## What it is
A Bernoulli differential equation is a first-order ordinary differential equation of the form $y' + P(x)y = Q(x)y^n$. It appears almost linear, but the $y^n$ term on the right-hand side makes it non-linear for any $n$ other than $0$ or $1$. The core solution technique is a substitution that transforms this non-linear equation into a linear one, which can then be solved systematically.

## Why it matters
This equation form models phenomena where the rate of change is affected by some power of the state itself, a common feature in non-linear systems. In aerospace, it can model vehicle velocity subject to atmospheric drag, where drag is proportional to the square of velocity ($v^2$). In physics and population dynamics, the famous logistic equation, which models population growth with a limiting carrying capacity, is a Bernoulli equation.

## When to study it
Before tackling this, you must have complete mastery over solving first-order linear ODEs of the form $y' + P(x)y = Q(x)$ using the integrating factor method. You also need proficiency with the chain rule from differential calculus and standard integration techniques. If you cannot solve $y' + 2xy = x$ instantly, review that topic first.

## How to study it (step by step)
1.  **Pattern Recognition.** Drill the standard form $y' + P(x)y = Q(x)y^n$. Take a mixed set of first-order ODEs and, in under 5 seconds each, identify which are Bernoulli and state the values of $P(x)$, $Q(x)$, and $n$.
2.  **Derive the Substitution.** Do not memorize the substitution blindly. Start with the standard form, and divide by the term causing the non-linearity, $y^n$, to get $y^{-n}y' + P(x)y^{1-n} = Q(x)$. Observe that the term $y^{1-n}$ and a piece of its derivative, $y^{-n}y'$, are both present. This structure demands the substitution $v = y^{1-n}$.
3.  **Execute the Transformation.** Define $v = y^{1-n}$. Use the chain rule to find its derivative: $\frac{dv}{dx} = (1-n)y^{-n}\frac{dy}{dx}$. Isolate the $y^{-n}y'$ term from this derivative and substitute both $v$ and the expression for $y^{-n}y'$ back into the equation from step 2.
4.  **Solve the Linear ODE.** After substitution, you will have a linear ODE in the variable $v$. The form will be $\frac{1}{1-n}v' + P(x)v = Q(x)$. Rearrange it to the standard linear form $v' + (1-n)P(x)v = (1-n)Q(x)$ and solve for $v(x)$ using an integrating factor.
5.  **Back-substitute.** You have found $v(x)$, but the original problem asked for $y(x)$. Use your initial definition, $v = y^{1-n}$, to solve for $y$ in terms of $v$. Be careful with the algebra here.
6.  **Analyze Special Cases.** Consider what happens when $n=0$ or $n=1$. Convince yourself that for these values, the equation is already linear and the substitution is unnecessary (and for $n=1$, undefined).

## Key ideas, with intuition
1.  **The Non-Linear "Blocker".** The term $y^n$ is the sole obstacle preventing the equation from being a simple linear ODE. The entire strategy revolves around neutralizing this specific term.
2.  **Transformation as a "Change of View".** The substitution $v = y^{1-n}$ is not a random guess; it's a "linearizing transform." Imagine you are looking at a complicated curve. By changing your coordinate system (e.g., using logarithmic axes), the curve might become a straight line. This substitution does the same thing: it changes the dependent variable from $y$ to $v$ in such a way that the new equation's structure becomes linear.
3.  **The Chain Rule is the Key.** The core insight comes from preparing the equation for substitution. After dividing by $y^n$:
    $$ y^{-n}\frac{dy}{dx} + P(x)y^{1-n} = Q(x) $$
    The structure is screaming "chain rule." We have a function of $y$, which is $y^{1-n}$, and we also have the core of its derivative, $y^{-n}\frac{dy}{dx}$. If we let $v = y^{1-n}$, then we know $\frac{dv}{dx} = (1-n)y^{-n}\frac{dy}{dx}$. The pieces on the left side of the equation are related by differentiation, which is what allows the substitution to simplify the entire expression into a linear form.

## Worked example
Solve the equation $y' + \frac{1}{x}y = x^2y^4$.

**1. Identification:**
This is a Bernoulli equation in the form $y' + P(x)y = Q(x)y^n$ with:
- $P(x) = \frac{1}{x}$
- $Q(x) = x^2$
- $n = 4$

**2. Prepare for Substitution:**
Divide the entire equation by the non-linear term, $y^4$:
$$ y^{-4}y' + \frac{1}{x}y^{-3} = x^2 $$

**3. Define and Execute Substitution:**
Let $v = y^{1-n} = y^{1-4} = y^{-3}$.
Now, find the derivative of $v$ with respect to $x$ using the chain rule:
$$ \frac{dv}{dx} = -3y^{-4}\frac{dy}{dx} $$
Isolate the term $y^{-4}y'$ that appears in our prepared equation:
$$ y^{-4}y' = -\frac{1}{3}\frac{dv}{dx} $$
Substitute $v = y^{-3}$ and the expression for $y^{-4}y'$ back into the prepared equation:
$$ \left(-\frac{1}{3}\frac{dv}{dx}\right) + \frac{1}{x}v = x^2 $$

**4. Solve the Linear ODE in $v$:**
Rearrange the equation into the standard linear form $v' + P_v(x)v = Q_v(x)$:
$$ \frac{dv}{dx} - \frac{3}{x}v = -3x^2 $$
The integrating factor is $I(x) = e^{\int -\frac{3}{x}dx} = e^{-3\ln|x|} = e^{\ln(x^{-3})} = x^{-3}$.
Multiply the linear equation by $I(x)$:
$$ x^{-3}\frac{dv}{dx} - 3x^{-4}v = -3x^2 \cdot x^{-3} $$
$$ x^{-3}v' - 3x^{-4}v = -\frac{3}{x} $$
The left side is the result of the product rule for $\frac{d}{dx}(I(x)v)$:
$$ \frac{d}{dx}(x^{-3}v) = -\frac{3}{x} $$
Integrate both sides with respect to $x$:
$$ x^{-3}v = \int -\frac{3}{x}dx = -3\ln|x| + C $$
Solve for $v(x)$:
$$ v(x) = x^3(-3\ln|x| + C) $$

**5. Back-substitute to find $y$:**
Recall that $v = y^{-3}$.
$$ y^{-3} = -3x^3\ln|x| + Cx^3 $$
Solve for $y(x)$:
$$ y(x) = \left(Cx^3 - 3x^3\ln|x|\right)^{-1/3} $$

**Reflection:** Each step was a logical consequence of the previous one. Identifying the form dictated the strategy. Dividing by $y^n$ revealed the underlying structure. The chain rule provided the exact substitution needed to linearize the equation. The integrating factor method, a known tool, solved the now-linear system. The final back-substitution simply reverted to the original variable.

## Diagrams
A flow-chart of the solution process:

```text
+--------------------------------+
| Bernoulli ODE (non-linear in y)|
| y' + P(x)y = Q(x)y^n            |
+--------------------------------+
                 |
                 | Divide by y^n
                 v
+--------------------------------+
| Prepared Form                  |
| y^{-n}y' + P(x)y^{1-n} = Q(x)   |
+--------------------------------+
                 |
                 | Substitute v = y^{1-n}
                 | and v' = (1-n)y^{-n}y'
                 v
+--------------------------------+
| Linear ODE (in v)              |
| v' + (1-n)P(x)v = (1-n)Q(x)    |
+--------------------------------+
                 |
                 | Solve using Integrating Factor
                 v
+--------------------------------+
| Solution for v(x)              |
+--------------------------------+
                 |
                 | Back-substitute y = v^{1/(1-n)}
                 v
+--------------------------------+
| Solution for y(x)              |
+--------------------------------+
```

## Memory technique — remember this forever
1.  **The Story:** Think of **Bernoulli's Annoying Power** ($y^n$). Your mission is to eliminate it.
    - **Step 1: Confront the enemy.** Divide everything by $y^n$. This isolates it.
    - **Step 2: A new weapon.** After dividing, you see $y^{1-n}$. This is your new variable, $v$. The name of the weapon is $v = y^{1-n}$. The power is "1 minus the annoying power".
    - **Step 3: Win the linear battle.** The equation is now linear in $v$. Use your standard weapon (integrating factor) to win.
    - **Step 4: Return to the original world.** Substitute back to find $y$.

2.  **Must-Know Formulas:**
    - The Form: $y' + P(x)y = Q(x)y^n$
    - The Substitution: $v = y^{1-n}$

3.  **Spaced Repetition Schedule:** Review this entire mini-lesson and solve one new problem on: Day 1, Day 3, Day 7, Day 16, Day 35.

4.  **First Principles Pathway:** If you forget the substitution formula, re-derive it.
    - Write the standard form: $y' + P(x)y = Q(x)y^n$.
    - Divide by the problem term: $y^{-n}y' + P(x)y^{1-n} = Q(x)$.
    - Stare at it. You see a function of $y$ (the $y^{1-n}$ term) and something that looks like its derivative.
    - Let $v$ be that function: $v = y^{1-n}$.
    - Differentiate it: $\frac{dv}{dx} = (1-n)y^{-n}\frac{dy}{dx}$. This confirms the substitution works because the $y^{-n}y'$ piece is right there in the equation. You have just re-derived the method from scratch.

## Common mistakes
- **Ignoring the constant from the chain rule.** When substituting $v=y^{1-n}$, students often write $v' = y^{-n}y'$, forgetting the crucial $(1-n)$ factor. This makes the resulting linear equation incorrect. Always write $v' = (1-n)y^{-n}y'$.
- **Sign errors in the integrating factor.** The linear equation for $v$ will be $v' + (1-n)P(x)v = ...$. The term $(1-n)P(x)$ can have a tricky sign. A mistake here will corrupt the entire solution.
- **Botching the final back-substitution.** After finding $v(x)$, solving for $y$ in $v = y^{1-n}$ requires careful algebra. For example, if $v = y^{-2}$, then $y = v^{-1/2} = 1/\sqrt{v}$, not $v^2$ or $-v^{1/2}$.
- **Applying the method when $n=1$.** If $n=1$, the equation is $y' + P(x)y = Q(x)y$, which simplifies to $y' + (P(x)-Q(x))y = 0$. This is a simple separable linear equation. The Bernoulli substitution formula involves $1/(1-n)$, which would cause division by zero.

## Self-check
1.  Solve $y' + y = y^3$.
2.  For the equation $x\frac{dy}{dx} - 2y = \frac{x^2}{y^2}$, first rewrite it in the standard Bernoulli form. Then, perform the substitution to obtain a linear ODE in $v$. Do not solve the final linear equation.
3.  The velocity $v$ of a rocket subject to constant thrust $T$, constant mass $m$, and atmospheric drag proportional to $v^3$ can be modeled as $m\frac{dv}{dt} = T - kv^3$. Solve for $v(t)$ assuming the rocket starts from rest, $v(0)=0$.