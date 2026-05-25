## 1. What it is — in plain English

Imagine you have a puzzle where the answer isn't a single number, but a whole function – a rule that tells you how something changes over time or space. This is what a *differential equation* is: a relationship between a function and its rates of change (its derivatives). Most of these puzzles are tricky to solve directly because they're "non-linear," meaning the parts of the function and its derivatives interact in complicated ways.

A Bernoulli equation is a special kind of non-linear differential equation. It looks almost like an "easy" type of differential equation (called a *linear first-order ODE*) but with one extra term that makes it non-linear and therefore harder to solve. Think of it like a slightly warped version of a familiar shape.

The clever trick for Bernoulli equations is a "decoder ring" or a "magic lens" called a *substitution*. This substitution transforms the complicated non-linear equation into a simpler, linear one that we already know how to solve. Once we solve the simpler version, we just "undo" the substitution to get the answer to our original, complex puzzle.

So, in essence, a Bernoulli equation is a particular type of differential equation that, despite its non-linear appearance, can be systematically converted into a solvable linear form through a specific algebraic substitution. It's a testament to how creative mathematical transformations can unlock solutions to seemingly intractable problems.

## 2. Why it matters — real-world applications

Bernoulli equations, and the techniques used to solve them, are far from abstract mathematical curiosities. They model a variety of phenomena where quantities change in ways that are proportional to themselves, but also influenced by a non-linear factor.

1.  **Fluid Dynamics (Torricelli's Law and Tank Draining):** One classic application is modeling the rate at which water drains from a tank through an orifice at the bottom. The velocity of the efflux is often described by Torricelli's Law, which can lead to a Bernoulli equation when considering how the height of the water in the tank changes over time. Engineers at companies like **Grundfos** (pumps) or **Xylem** (water technology) would use such models to design efficient fluid handling systems, predict draining times, or understand pressure dynamics in pipelines.

2.  **Population Dynamics (Logistic Growth):** While the standard logistic equation is often solved directly, variations that include more complex interactions or harvesting terms can lead to Bernoulli forms. For example, if a population grows logistically but also experiences a rate of loss (e.g., predation, disease) that is non-linearly dependent on the population size. Biologists and epidemiologists use these models to predict population sizes, understand disease spread, or manage wildlife, informing decisions for organizations like the **CDC** or **NOAA Fisheries**.

3.  **Chemical Reactions:** In some chemical reactions, the rate of change of reactant concentration can be described by a Bernoulli equation. For instance, if a reactant is consumed at a rate proportional to its concentration, but also participates in a secondary reaction whose rate depends non-linearly on the concentration of another species. Chemical engineers at companies like **BASF** or **Dow Chemical** employ these models to optimize reactor design, predict reaction yields, and control process parameters.

4.  **Heat Transfer with Convection/Radiation:** While often simplified, some models of heat transfer, particularly those involving combined convection and radiation, can involve terms that resemble Bernoulli equations. The rate of heat loss from a surface might depend linearly on the temperature difference, but also non-linearly (e.g., to the fourth power for radiation) on the absolute temperature. Aerospace engineers at **SpaceX** or **Boeing** might use simplified forms of these equations to model thermal management for spacecraft or aircraft components.

## 3. Prerequisites — what you must know first

Before diving into Bernoulli equations, ensure you have a solid grasp of the following fundamental concepts. If any of these feel unfamiliar, pause and review them thoroughly.

*   **Derivatives:** The concept of a derivative as an instantaneous rate of change. You should be comfortable calculating derivatives of common functions (polynomials, exponentials, logarithms, trigonometric functions) and applying rules like the product rule and chain rule.
*   **Integrals:** The concept of an integral as an anti-derivative or the accumulation of a quantity. You should be proficient in basic integration techniques, including substitution and integration by parts.
*   **Basic Algebra:** Manipulating equations, solving for variables, working with exponents and logarithms. This is foundational for all steps in solving ODEs.
*   **Linear First-Order Differential Equations:** This is *critical*. You must know how to solve differential equations of the form $y' + P(x)y = Q(x)$ using the **integrating factor method**. Bernoulli equations transform into this exact type of equation.
*   **Product Rule for Differentiation:** Used when deriving the integrating factor method and sometimes implicitly when differentiating substituted terms. Recall $(uv)' = u'v + uv'$.
*   **Chain Rule for Differentiation:** Absolutely essential for differentiating the substitution variable $v$ with respect to $x$, as $v$ is a function of $y$, and $y$ is a function of $x$. Recall $\frac{d}{dx}f(g(x)) = f'(g(x))g'(x)$.

## 4. The core idea — step by step

The core idea behind solving a Bernoulli equation is to transform it into a linear first-order differential equation, which we already know how to solve. This transformation is achieved through a specific substitution. Let's break down the process step-by-step.

### Step 1: Recognize the Bernoulli Equation Form

**Plain English:** The very first thing you need to do is to look at your differential equation and see if it matches a specific "pattern" that screams "Bernoulli!" If it doesn't match, this method won't work.

**Small Concrete Example:** Consider the equation $y' + \frac{1}{x}y = x y^2$. Does it fit the pattern?

**The Formal/Mathematical Version:** A first-order differential equation is a Bernoulli equation if it can be written in the form:
$$ \frac{dy}{dx} + P(x)y = Q(x)y^n $$
where $P(x)$ and $Q(x)$ are continuous functions of $x$, and $n$ is any real number.
*   If $n=0$, the equation becomes $y' + P(x)y = Q(x)$, which is a linear first-order ODE.
*   If $n=1$, the equation becomes $y' + P(x)y = Q(x)y$, which can be rearranged to $y' + (P(x)-Q(x))y = 0$, a separable linear first-order ODE.
*   For these cases ($n=0$ or $n=1$), the Bernoulli substitution method still works but is unnecessarily complicated, as direct methods are simpler. The Bernoulli method is primarily useful when $n \ne 0$ and $n \ne 1$.

In our example $y' + \frac{1}{x}y = x y^2$:
Here, $P(x) = \frac{1}{x}$, $Q(x) = x$, and $n = 2$. Since $n \ne 0$ and $n \ne 1$, it is indeed a Bernoulli equation.

**What could go wrong:** You might misidentify $P(x)$, $Q(x)$, or $n$. Make sure the equation is exactly in the form $y' + P(x)y = Q(x)y^n$ before proceeding. Sometimes you might need to divide by a coefficient of $y'$ to get it into this standard form. For example, $x y' + y = x^2 y^3$ needs to be divided by $x$ first: $y' + \frac{1}{x}y = x y^3$.

### Step 2: Choose the Substitution Variable

**Plain English:** The term $y^n$ is what makes the equation non-linear and hard to solve. Our goal is to replace $y$ with a new variable, let's call it $v$, such that the equation becomes linear in $v$. The specific substitution that works like magic for Bernoulli equations is $v = y^{1-n}$. This choice is not random; it's carefully designed to simplify the equation.

**Small Concrete Example:** For our equation $y' + \frac{1}{x}y = x y^2$, we found $n=2$.
So, the substitution will be $v = y^{1-2}$.

**The Formal/Mathematical Version:** Let the new dependent variable $v$ be defined as:
$$ v = y^{1-n} $$

In our example:
$$ v = y^{1-2} = y^{-1} $$

**What could go wrong:** A common mistake is miscalculating $1-n$, especially if $n$ is negative or a fraction. Double-check your arithmetic!

### Step 3: Differentiate the Substitution

**Plain English:** We've defined $v$ in terms of $y$. But our original equation has $y'$ (which is $\frac{dy}{dx}$). To replace $y'$ with something involving $v'$, we need to differentiate our substitution $v = y^{1-n}$ with respect to $x$. Remember that $y$ is a function of $x$, so we'll need the chain rule.

**Small Concrete Example:** We have $v = y^{-1}$. Differentiate both sides with respect to $x$:
$$ \frac{dv}{dx} = \frac{d}{dx}(y^{-1}) $$
Using the chain rule, $\frac{d}{dx}(y^{-1}) = -1 \cdot y^{-1-1} \cdot \frac{dy}{dx} = -y^{-2}y'$.
So, $v' = -y^{-2}y'$.

**The Formal/Mathematical Version:** Differentiate $v = y^{1-n}$ with respect to $x$ using the chain rule:
$$ \frac{dv}{dx} = (1-n)y^{(1-n)-1} \frac{dy}{dx} $$
$$ v' = (1-n)y^{-n}y' $$
This expression gives us $y'$ in terms of $v'$ and $y$, or more usefully, it gives us a term $y^{-n}y'$ that we will see in the next step.
From $v' = (1-n)y^{-n}y'$, we can isolate $y^{-n}y'$:
$$ y^{-n}y' = \frac{1}{1-n}v' $$
This is a crucial identity we'll use for substitution.

**What could go wrong:** Forgetting the chain rule is the most common error here. You must multiply by $y'$ (or $\frac{dy}{dx}$) after differentiating $y$ with respect to its exponent. Also, make sure to handle the coefficient $(1-n)$ correctly.

### Step 4: Manipulate the Original Equation

**Plain English:** We have $v$ and $v'$ in terms of $y$ and $y'$. Now we need to make the original Bernoulli equation look like these new terms so we can substitute them in. The key is to get rid of the $y^n$ term on the right side of the original equation and create a $y^{-n}y'$ term on the left. We do this by multiplying the entire original equation by $y^{-n}$.

**Small Concrete Example:** Our original equation is $y' + \frac{1}{x}y = x y^2$.
Multiply every term by $y^{-n} = y^{-2}$:
$$ y^{-2}y' + \frac{1}{x}y \cdot y^{-2} = x y^2 \cdot y^{-2} $$
Simplify the exponents:
$$ y^{-2}y' + \frac{1}{x}y^{-1} = x $$

**The Formal/Mathematical Version:** Take the standard Bernoulli form:
$$ y' + P(x)y = Q(x)y^n $$
Multiply the entire equation by $y^{-n}$ (assuming $y \ne 0$):
$$ y^{-n}y' + P(x)y \cdot y^{-n} = Q(x)y^n \cdot y^{-n} $$
Simplify the exponents:
$$ y^{-n}y' + P(x)y^{1-n} = Q(x) $$
Notice how the $y^n$ term on the right side has vanished, leaving just $Q(x)$. Also, notice the term $y^{1-n}$ which is exactly our $v$. And the $y^{-n}y'$ term is directly related to $v'$.

**What could go wrong:** Forgetting to multiply *every* term by $y^{-n}$. It's easy to miss the middle term, $P(x)y$. Also, be careful with the exponent arithmetic: $y \cdot y^{-n} = y^{1-n}$.

### Step 5: Substitute $v$ and $v'$ into the Modified Equation

**Plain English:** Now we have all the pieces! We've transformed the original equation into a form where we can directly replace the $y$ and $y'$ terms with our new variable $v$ and its derivative $v'$.

**Small Concrete Example:** From Step 4, we have:
$$ y^{-2}y' + \frac{1}{x}y^{-1} = x $$
From Step 2, we have $v = y^{-1}$.
From Step 3, we have $y^{-2}y' = -v'$. (Remember $v' = -y^{-2}y'$, so $y^{-2}y' = -v'$)
Substitute these into the modified equation:
$$ (-v') + \frac{1}{x}(v) = x $$
$$ -v' + \frac{1}{x}v = x $$
Rearrange into standard linear form $v' + \tilde{P}(x)v = \tilde{Q}(x)$:
$$ v' - \frac{1}{x}v = -x $$
This is a linear first-order ODE in $v$.

**The Formal/Mathematical Version:** We have the modified equation:
$$ y^{-n}y' + P(x)y^{1-n} = Q(x) $$
And our substitution identities:
$$ v = y^{1-n} $$
$$ y^{-n}y' = \frac{1}{1-n}v' $$
Substitute these into the modified equation:
$$ \frac{1}{1-n}v' + P(x)v = Q(x) $$
To get it into the standard linear form $v' + \tilde{P}(x)v = \tilde{Q}(x)$, multiply the entire equation by $(1-n)$:
$$ v' + (1-n)P(x)v = (1-n)Q(x) $$
This is a linear first-order differential equation in $v$. Let $\tilde{P}(x) = (1-n)P(x)$ and $\tilde{Q}(x) = (1-n)Q(x)$.

**What could go wrong:** Forgetting to multiply by $(1-n)$ to get $v'$ by itself, or making an algebraic error when doing so. Pay close attention to signs.

### Step 6: Solve the Resulting Linear First-Order ODE for $v$

**Plain English:** Congratulations! You've transformed a complicated non-linear equation into a standard linear one. Now, you just need to solve this new equation for $v(x)$ using the integrating factor method, which you should already be familiar with.

**Small Concrete Example:** Our linear ODE is $v' - \frac{1}{x}v = -x$.
Here, $\tilde{P}(x) = -\frac{1}{x}$ and $\tilde{Q}(x) = -x$.
The integrating factor is $\mu(x) = e^{\int \tilde{P}(x) dx} = e^{\int -\frac{1}{x} dx} = e^{-\ln|x|} = e^{\ln|x|^{-1}} = |x|^{-1} = \frac{1}{x}$ (we can usually assume $x>0$ for simplicity, or just use $1/x$).
Multiply the linear ODE by the integrating factor:
$$ \frac{1}{x}v' - \frac{1}{x^2}v = -x \cdot \frac{1}{x} $$
$$ \frac{d}{dx}\left(\frac{1}{x}v\right) = -1 $$
Integrate both sides with respect to $x$:
$$ \int \frac{d}{dx}\left(\frac{1}{x}v\right) dx = \int -1 dx $$
$$ \frac{1}{x}v = -x + C $$
Solve for $v$:
$$ v(x) = -x^2 + Cx $$

**The Formal/Mathematical Version:**
The linear ODE is $v' + \tilde{P}(x)v = \tilde{Q}(x)$.
1.  Calculate the integrating factor: $\mu(x) = e^{\int \tilde{P}(x) dx}$.
2.  Multiply the entire linear ODE by $\mu(x)$. The left side will become $\frac{d}{dx}(\mu(x)v)$.
3.  Integrate both sides with respect to $x$: $\mu(x)v = \int \mu(x)\tilde{Q}(x) dx + C$.
4.  Solve for $v(x)$: $v(x) = \frac{1}{\mu(x)} \left( \int \mu(x)\tilde{Q}(x) dx + C \right)$.

**What could go wrong:** Errors in calculating the integrating factor (especially the integral in the exponent), or errors in performing the final integration. Don't forget the constant of integration, $C$!

### Step 7: Substitute Back to Find $y$

**Plain English:** We've found the solution for $v(x)$, but the original problem was about $y(x)$. The final step is to use our initial substitution ($v = y^{1-n}$) to convert our solution for $v$ back into a solution for $y$.

**Small Concrete Example:** We found $v(x) = -x^2 + Cx$.
Our original substitution was $v = y^{-1}$.
So, $y^{-1} = -x^2 + Cx$.
To solve for $y$, take the reciprocal of both sides:
$$ y(x) = \frac{1}{-x^2 + Cx} $$
This is the solution to the original Bernoulli equation.

**The Formal/Mathematical Version:**
You have the solution for $v(x)$ from Step 6.
Recall the substitution from Step 2: $v = y^{1-n}$.
To solve for $y$, raise both sides to the power of $\frac{1}{1-n}$:
$$ y = v^{\frac{1}{1-n}} $$
Substitute your expression for $v(x)$ into this equation to get $y(x)$.

**What could go wrong:** Algebraic errors when solving for $y$. Forgetting that $y^{1-n}$ means $y$ raised to the power of $(1-n)$, not $y$ multiplied by $1-n$. Also, remember to consider potential singular solutions like $y=0$ if it wasn't covered by the general solution. If $n>0$, $y=0$ is often a trivial solution, and it might be lost when dividing by $y^n$. You should check if $y=0$ is a solution by plugging it back into the original ODE.

## 5. Worked examples — multiple, with every step shown

### Example 1: Easy

**Problem:** Solve the differential equation $y' + y = y^2$.

**Given:** A first-order differential equation $y' + y = y^2$.
**Want:** The function $y(x)$ that satisfies this equation.

**Solution:**

1.  **Identify the Bernoulli form:**
    $$ y' + (1)y = (1)y^2 $$
    This matches $y' + P(x)y = Q(x)y^n$ with $P(x)=1$, $Q(x)=1$, and $n=2$.
    *This confirms it's a Bernoulli equation and identifies its components.*

2.  **Choose the substitution:**
    Since $n=2$, we use the substitution $v = y^{1-n}$:
    $$ v = y^{1-2} = y^{-1} $$
    *This transformation will convert the non-linear term into a linear one.*

3.  **Differentiate the substitution:**
    Differentiate $v = y^{-1}$ with respect to $x$ using the chain rule:
    $$ \frac{dv}{dx} = -1 \cdot y^{-1-1} \cdot \frac{dy}{dx} $$
    $$ v' = -y^{-2}y' $$
    From this, we can express $y^{-2}y'$ in terms of $v'$:
    $$ y^{-2}y' = -v' $$
    *This step prepares the derivative term for substitution into the original equation.*

4.  **Manipulate the original equation:**
    Divide the original equation $y' + y = y^2$ by $y^n = y^2$:
    $$ \frac{y'}{y^2} + \frac{y}{y^2} = \frac{y^2}{y^2} $$
    $$ y^{-2}y' + y^{-1} = 1 $$
    *This step transforms the equation into a form where we can directly substitute $v$ and $v'$.*

5.  **Substitute $v$ and $v'$:**
    Substitute $v = y^{-1}$ and $y^{-2}y' = -v'$ into the manipulated equation:
    $$ (-v') + (v) = 1 $$
    Rearrange into the standard linear first-order ODE form $v' + \tilde{P}(x)v = \tilde{Q}(x)$:
    $$ v' - v = -1 $$
    *This is the crucial step where the non-linear Bernoulli equation becomes a solvable linear equation.*

6.  **Solve the linear ODE for $v$:**
    Here, $\tilde{P}(x) = -1$ and $\tilde{Q}(x) = -1$.
    Calculate the integrating factor $\mu(x)$:
    $$ \mu(x) = e^{\int \tilde{P}(x) dx} = e^{\int -1 dx} = e^{-x} $$
    Multiply the linear ODE $v' - v = -1$ by $\mu(x) = e^{-x}$:
    $$ e^{-x}v' - e^{-x}v = -e^{-x} $$
    The left side is the derivative of the product $\mu(x)v$:
    $$ \frac{d}{dx}(e^{-x}v) = -e^{-x} $$
    Integrate both sides with respect to $x$:
    $$ \int \frac{d}{dx}(e^{-x}v) dx = \int -e^{-x} dx $$
    $$ e^{-x}v = e^{-x} + C $$
    Solve for $v$:
    $$ v(x) = \frac{e^{-x} + C}{e^{-x}} = 1 + Ce^x $$
    *This is the standard procedure for solving linear first-order ODEs using the integrating factor.*

7.  **Substitute back to find $y$:**
    Recall our substitution $v = y^{-1}$. So, $y^{-1} = 1 + Ce^x$.
    Solve for $y$:
    $$ y(x) = \frac{1}{1 + Ce^x} $$
    *Finally, we revert our substitution to get the solution for the original variable $y$.*

    **Check for $y=0$ solution:** If $y=0$, then $y'=0$. Plugging into $y'+y=y^2$ gives $0+0=0^2$, which is $0=0$. So $y(x)=0$ is a solution. Our general solution $y(x) = \frac{1}{1 + Ce^x}$ can represent $y=0$ if $C \to \infty$ (or it's considered a singular solution).

    The final answer is $\boxed{y(x) = \frac{1}{1 + Ce^x}}$.

**Reflection:** This example was straightforward because $P(x)$ and $Q(x)$ were constants, leading to simple integrals. The main challenge was carefully applying the substitution steps and the integrating factor method.

### Example 2: Medium

**Problem:** Solve the differential equation $y' + \frac{1}{x}y = x y^2$.

**Given:** A first-order differential equation $y' + \frac{1}{x}y = x y^2$.
**Want:** The function $y(x)$ that satisfies this equation.

**Solution:**

1.  **Identify the Bernoulli form:**
    $$ y' + \left(\frac{1}{x}\right)y = (x)y^2 $$
    This matches $y' + P(x)y = Q(x)y^n$ with $P(x)=\frac{1}{x}$, $Q(x)=x$, and $n=2$.
    *The equation is in the correct Bernoulli form.*

2.  **Choose the substitution:**
    Since $n=2$, we use $v = y^{1-n}$:
    $$ v = y^{1-2} = y^{-1} $$
    *This is the standard substitution for $n=2$.*

3.  **Differentiate the substitution:**
    Differentiate $v = y^{-1}$ with respect to $x$:
    $$ v' = -y^{-2}y' $$
    From this, $y^{-2}y' = -v'$.
    *The chain rule is applied here to relate $v'$ to $y'$ and $y$.*

4.  **Manipulate the original equation:**
    Divide the original equation $y' + \frac{1}{x}y = x y^2$ by $y^n = y^2$:
    $$ \frac{y'}{y^2} + \frac{1}{x}\frac{y}{y^2} = x\frac{y^2}{y^2} $$
    $$ y^{-2}y' + \frac{1}{x}y^{-1} = x $$
    *Every term is divided by $y^2$ to prepare for substitution.*

5.  **Substitute $v$ and $v'$:**
    Substitute $v = y^{-1}$ and $y^{-2}y' = -v'$ into the manipulated equation:
    $$ (-v') + \frac{1}{x}(v) = x $$
    Rearrange into the standard linear first-order ODE form $v' + \tilde{P}(x)v = \tilde{Q}(x)$:
    $$ v' - \frac{1}{x}v = -x $$
    *The non-linear equation is now linear in $v$.*

6.  **Solve the linear ODE for $v$:**
    Here, $\tilde{P}(x) = -\frac{1}{x}$ and $\tilde{Q}(x) = -x$.
    Calculate the integrating factor $\mu(x)$:
    $$ \mu(x) = e^{\int -\frac{1}{x} dx} = e^{-\ln|x|} = e^{\ln|x|^{-1}} = \frac{1}{|x|} $$
    Assuming $x>0$, we use $\mu(x) = \frac{1}{x}$.
    Multiply the linear ODE $v' - \frac{1}{x}v = -x$ by $\mu(x) = \frac{1}{x}$:
    $$ \frac{1}{x}v' - \frac{1}{x^2}v = -x \cdot \frac{1}{x} $$
    $$ \frac{d}{dx}\left(\frac{1}{x}v\right) = -1 $$
    Integrate both sides with respect to $x$:
    $$ \int \frac{d}{dx}\left(\frac{1}{x}v\right) dx = \int -1 dx $$
    $$ \frac{1}{x}v = -x + C $$
    Solve for $v$:
    $$ v(x) = -x^2 + Cx $$
    *The integrating factor method is applied carefully, including the logarithm property.*

7.  **Substitute back to find $y$:**
    Recall $v = y^{-1}$. So, $y^{-1} = -x^2 + Cx$.
    Solve for $y$:
    $$ y(x) = \frac{1}{-x^2 + Cx} $$
    *The final solution for $y$ is obtained by inverting the substitution.*

    **Check for $y=0$ solution:** If $y=0$, then $y'=0$. Plugging into $y' + \frac{1}{x}y = x y^2$ gives $0 + 0 = 0$, which is $0=0$. So $y(x)=0$ is a solution. Our general solution can represent $y=0$ if $C \to \infty$ (or it's considered a singular solution).

    The final answer is $\boxed{y(x) = \frac{1}{-x^2 + Cx}}$.

**Reflection:** This example introduced $x$-dependent $P(x)$ and $Q(x)$, making the integration for the integrating factor slightly more complex, but still manageable. The key was careful application of logarithm properties.

### Example 3: Medium-Hard

**Problem:** Solve the differential equation $x y' + y = x^2 y^3$.

**Given:** A first-order differential equation $x y' + y = x^2 y^3$.
**Want:** The function $y(x)$ that satisfies this equation.

**Solution:**

1.  **Identify the Bernoulli form:**
    First, we must divide by $x$ to get $y'$ by itself, matching the standard form $y' + P(x)y = Q(x)y^n$:
    $$ y' + \frac{1}{x}y = x y^3 $$
    Now it matches the form with $P(x)=\frac{1}{x}$, $Q(x)=x$, and $n=3$.
    *This initial manipulation to get the standard form is crucial.*

2.  **Choose the substitution:**
    Since $n=3$, we use $v = y^{1-n}$:
    $$ v = y^{1-3} = y^{-2} $$
    *The substitution is chosen based on the value of $n$.*

3.  **Differentiate the substitution:**
    Differentiate $v = y^{-2}$ with respect to $x$:
    $$ v' = -2y^{-3}y' $$
    From this, we can express $y^{-3}y'$ in terms of $v'$:
    $$ y^{-3}y' = -\frac{1}{2}v' $$
    *Careful application of the chain rule, including the coefficient.*

4.  **Manipulate the original equation:**
    Divide the standard form equation ($y' + \frac{1}{x}y = x y^3$) by $y^n = y^3$:
    $$ \frac{y'}{y^3} + \frac{1}{x}\frac{y}{y^3} = x\frac{y^3}{y^3} $$
    $$ y^{-3}y' + \frac{1}{x}y^{-2} = x $$
    *Every term is divided by $y^3$.*

5.  **Substitute $v$ and $v'$:**
    Substitute $v = y^{-2}$ and $y^{-3}y' = -\frac{1}{2}v'$ into the manipulated equation:
    $$ \left(-\frac{1}{2}v'\right) + \frac{1}{x}(v) = x $$
    Multiply by $-2$ to get $v'$ by itself and into the standard linear form $v' + \tilde{P}(x)v = \tilde{Q}(x)$:
    $$ v' - \frac{2}{x}v = -2x $$
    *This step requires multiplying by the reciprocal of the coefficient of $v'$.*

6.  **Solve the linear ODE for $v$:**
    Here, $\tilde{P}(x) = -\frac{2}{x}$ and $\tilde{Q}(x) = -2x$.
    Calculate the integrating factor $\mu(x)$:
    $$ \mu(x) = e^{\int -\frac{2}{x} dx} = e^{-2\ln|x|} = e^{\ln|x|^{-2}} = |x|^{-2} = \frac{1}{x^2} $$
    Assuming $x>0$, we use $\mu(x) = \frac{1}{x^2}$.
    Multiply the linear ODE $v' - \frac{2}{x}v = -2x$ by $\mu(x) = \frac{1}{x^2}$:
    $$ \frac{1}{x^2}v' - \frac{2}{x^3}v = -2x \cdot \frac{1}{x^2} $$
    $$ \frac{d}{dx}\left(\frac{1}{x^2}v\right) = -\frac{2}{x} $$
    Integrate both sides with respect to $x$:
    $$ \int \frac{d}{dx}\left(\frac{1}{x^2}v\right) dx = \int -\frac{2}{x} dx $$
    $$ \frac{1}{x^2}v = -2\ln|x| + C $$
    Solve for $v$:
    $$ v(x) = x^2(-2\ln|x| + C) = -2x^2\ln|x| + Cx^2 $$
    *The integration involves a logarithm, and the final solution for $v$ is obtained by multiplying by $x^2$.*

7.  **Substitute back to find $y$:**
    Recall $v = y^{-2}$. So, $y^{-2} = -2x^2\ln|x| + Cx^2$.
    Solve for $y$:
    $$ y^2 = \frac{1}{-2x^2\ln|x| + Cx^2} $$
    $$ y(x) = \pm\sqrt{\frac{1}{-2x^2\ln|x| + Cx^2}} $$
    *Remember to take both positive and negative roots when solving for $y$ from $y^2$.*

    **Check for $y=0$ solution:** If $y=0$, then $y'=0$. Plugging into $x y' + y = x^2 y^3$ gives $x(0) + 0 = x^2(0)^3$, which is $0=0$. So $y(x)=0$ is a solution. Our general solution does not include $y=0$.

    The final answer is $\boxed{y(x) = \pm\sqrt{\frac{1}{Cx^2 - 2x^2\ln|x|}}}$.

**Reflection:** This example required an initial division to get the standard form, and the value of $n=3$ led to a different exponent in the substitution. The integration for $v$ was also slightly more involved. The final step of solving for $y$ involved a square root, necessitating the $\pm$ sign.

### Example 4: Harder ($n$ is negative)

**Problem:** Solve the differential equation $y' + 2y = e^x y^{-1}$.

**Given:** A first-order differential equation $y' + 2y = e^x y^{-1}$.
**Want:** The function $y(x)$ that satisfies this equation.

**Solution:**

1.  **Identify the Bernoulli form:**
    $$ y' + (2)y = (e^x)y^{-1} $$
    This matches $y' + P(x)y = Q(x)y^n$ with $P(x)=2$, $Q(x)=e^x$, and $n=-1$.
    *Recognizing $n=-1$ is key here.*

2.  **Choose the substitution:**
    Since $n=-1$, we use $v = y^{1-n}$:
    $$ v = y^{1-(-1)} = y^{1+1} = y^2 $$
    *The exponent $1-n$ becomes $2$ in this case.*

3.  **Differentiate the substitution:**
    Differentiate $v = y^2$ with respect to $x$:
    $$ v' = 2y y' $$
    From this, we can express $y y'$ in terms of $v'$:
    $$ y y' = \frac{1}{2}v' $$
    *The chain rule yields $2yy'$, which we then rearrange.*

4.  **Manipulate the original equation:**
    Divide the original equation $y' + 2y = e^x y^{-1}$ by $y^n = y^{-1}$:
    $$ \frac{y'}{y^{-1}} + \frac{2y}{y^{-1}} = \frac{e^x y^{-1}}{y^{-1}} $$
    $$ y y' + 2y^2 = e^x $$
    *Dividing by $y^{-1}$ is equivalent to multiplying by $y$. This simplifies the terms nicely.*

5.  **Substitute $v$ and $v'$:**
    Substitute $v = y^2$ and $y y' = \frac{1}{2}v'$ into the manipulated equation:
    $$ \left(\frac{1}{2}v'\right) + 2(v) = e^x $$
    Multiply by $2$ to get $v'$ by itself and into the standard linear form $v' + \tilde{P}(x)v = \tilde{Q}(x)$:
    $$ v' + 4v = 2e^x $$
    *The equation is now linear in $v$. Note the coefficients change due to multiplying by $2$.*

6.  **Solve the linear ODE for $v$:**
    Here, $\tilde{P}(x) = 4$ and $\tilde{Q}(x) = 2e^x$.
    Calculate the integrating factor $\mu(x)$:
    $$ \mu(x) = e^{\int 4 dx} = e^{4x} $$
    Multiply the linear ODE $v' + 4v = 2e^x$ by $\mu(x) = e^{4x}$:
    $$ e^{4x}v' + 4e^{4x}v = 2e^x \cdot e^{4x} $$
    $$ \frac{d}{dx}(e^{4x}v) = 2e^{5x} $$
    Integrate both sides with respect to $x$:
    $$ \int \frac{d}{dx}(e^{4x}v) dx = \int 2e^{5x} dx $$
    $$ e^{4x}v = \frac{2}{5}e^{5x} + C $$
    Solve for $v$:
    $$ v(x) = \frac{\frac{2}{5}e^{5x} + C}{e^{4x}} = \frac{2}{5}e^x + Ce^{-4x} $$
    *This involves integrating an exponential function and then dividing by another exponential.*

7.  **Substitute back to find $y$:**
    Recall $v = y^2$. So, $y^2 = \frac{2}{5}e^x + Ce^{-4x}$.
    Solve for $y$:
    $$ y(x) = \pm\sqrt{\frac{2}{5}e^x + Ce^{-4x}} $$
    *Again, remember the $\pm$ when taking the square root.*

    **Check for $y=0$ solution:** If $y=0$, then $y'=0$. Plugging into $y' + 2y = e^x y^{-1}$ gives $0 + 0 = e^x (0)^{-1}$. The term $0^{-1}$ is undefined, so $y=0$ is *not* a solution to this specific Bernoulli equation. This is an important distinction when $n$ is negative.

    The final answer is $\boxed{y(x) = \pm\sqrt{\frac{2}{5}e^x + Ce^{-4x}}}$.

**Reflection:** This example was harder due to $n=-1$, which changed the substitution exponent to $2$ and required careful handling of negative exponents in the manipulation step. The final integration and algebraic simplification were also more involved. Note the important check for $y=0$ as a potential singular solution, which in this case, was not valid.

## 6. Common mistakes and traps

1.  **Incorrectly identifying $n$:** Students sometimes confuse $n$ with the exponent of $y$ in $P(x)y$ or fail to put the equation in standard form first (e.g., $xy' + y = y^3$ vs. $y' + \frac{1}{x}y = \frac{1}{x}y^3$). Always ensure it's $y' + P(x)y = Q(x)y^n$.
2.  **Algebraic errors in $1-n$ or $1/(1-n)$:** Especially when $n$ is negative or fractional, calculating $1-n$ or its reciprocal can lead to simple arithmetic mistakes that derail the entire solution.
3.  **Forgetting the Chain Rule when differentiating $v$:** When $v = y^{1-n}$, then $v' = (1-n)y^{-n}y'$. Missing the $y'$ term or the coefficient $(1-n)$ is a very common error.
4.  **Not multiplying *all* terms by $y^{-n}$:** When transforming the original equation, students sometimes forget to multiply $P(x)y$ by $y^{-n}$, leading to an incorrect intermediate equation.
5.  **Errors in the Integrating Factor Method:** This is a prerequisite, but mistakes still occur: incorrect integration for $\int \tilde{P}(x) dx$, forgetting the constant of integration $C$, or algebraic errors when solving for $v(x)$.
6.  **Forgetting to substitute back from $v$ to $y$:** The problem asks for $y(x)$, not $v(x)$. The final step of converting $v(x)$ back to $y(x)$ using $y = v^{1/(1-n)}$ is sometimes overlooked or done incorrectly.
7.  **Neglecting the $y=0$ singular solution:** For Bernoulli equations where $n>0$, $y=0$ is often a trivial solution that is lost when dividing by $y^n$. It should always be checked separately by plugging $y=0$ into the original ODE. If $n<0$, $y=0$ might make the original equation undefined.

## 7. Textbook-precise explanation

A **Bernoulli differential equation** is a first-order ordinary differential equation that can be written in the form:
$$ \frac{dy}{dx} + P(x)y = Q(x)y^n $$
where $P(x)$ and $Q(x)$ are continuous functions on some interval $(a, b)$, and $n$ is a real number.

The method of solution involves a specific substitution, provided that $n \ne 0$ and $n \ne 1$ (as these cases reduce to linear or separable equations, respectively).

**The Substitution Method:**

1.  **Transformation:** Divide the entire equation by $y^n$ (assuming $y \ne 0$ for the interval of interest):
    $$ y^{-n}\frac{dy}{dx} + P(x)y^{1-n} = Q(x) \quad (*) $$

2.  **New Variable:** Introduce a new dependent variable $v$ defined by:
    $$ v = y^{1-n} $$

3.  **Derivative of $v$:** Differentiate $v$ with respect to $x$ using the chain rule:
    $$ \frac{dv}{dx} = (1-n)y^{(1-n)-1}\frac{dy}{dx} = (1-n)y^{-n}\frac{dy}{dx} $$
    From this, we can express the $y^{-n}\frac{dy}{dx}$ term from equation $(*)$ in terms of $v'$:
    $$ y^{-n}\frac{dy}{dx} = \frac{1}{1-n}\frac{dv}{dx} $$

4.  **Substitution into $(*)$:** Substitute $v$ and $\frac{1}{1-n}\frac{dv}{dx}$ into equation $(*)$:
    $$ \frac{1}{1-n}\frac{dv}{dx} + P(x)v = Q(x) $$

5.  **Linear Form:** Multiply the entire equation by $(1-n)$ to obtain a standard linear first-order differential equation in $v$:
    $$ \frac{dv}{dx} + (1-n)P(x)v = (1-n)Q(x) $$
    This equation is of the form $\frac{dv}{dx} + \tilde{P}(x)v = \tilde{Q}(x)$, where $\tilde{P}(x) = (1-n)P(x)$ and $\tilde{Q}(x) = (1-n)Q(x)$.

6.  **Solution of Linear ODE:** Solve this linear equation for $v(x)$ using the integrating factor method. The integrating factor is $\mu(x) = e^{\int \tilde{P}(x) dx}$. The solution for $v(x)$ will be:
    $$ v(x) = \frac{1}{\mu(x)} \left( \int \mu(x)\tilde{Q}(x) dx + C \right) $$

7.  **Back-Substitution:** Finally, substitute back $y^{1-n}$ for $v$ and solve for $y(x)$:
    $$ y(x) = [v(x)]^{\frac{1}{1-n}} $$

**Singular Solutions:** If $n>0$, the solution $y(x)=0$ (where $y'=0$) might be a valid solution to the original Bernoulli equation, but it may be lost when dividing by $y^n$. This case should be checked separately. If $n<0$, $y=0$ typically makes $y^n$ (or $y^{-n}$) undefined, so $y=0$ is not a solution.

**Reference:** This method is typically covered in introductory differential equations textbooks. For example, see:
*   **Zill, D.G. (2017). *Differential Equations with Boundary-Value Problems* (9th ed.). Cengage Learning. §2.4**
*   **Boyce, W.E., DiPrima, R.C., & Meade, D.B. (2017). *Elementary Differential Equations and Boundary Value Problems* (11th ed.). John Wiley & Sons. §2.4**

## 8. ASCII diagrams

Here's a flowchart illustrating the solution process for Bernoulli equations:

```text
+-----------------------------------------------------+
|         Start: Bernoulli Equation                   |
|         dy/dx + P(x)y = Q(x)y^n                     |
|         (Check: n != 0, n != 1)                     |
+--------------------------+--------------------------+
                           |
                           | 1. Manipulate to prepare
                           |    (Divide by y^n)
                           V
+--------------------------+--------------------------+
|         y^(-n)y' + P(x)y^(1-n) = Q(x)               |
+--------------------------+--------------------------+
                           |
                           | 2. Introduce Substitution
                           |    Let v = y^(1-n)
                           |    Then y^(-n)y' = (1/(1-n))v'
                           V
+--------------------------+--------------------------+
|         (1/(1-n))v' + P(x)v = Q(x)                  |
+--------------------------+--------------------------+
                           |
                           | 3. Convert to Standard Linear ODE
                           |    (Multiply by (1-n))
                           V
+--------------------------+--------------------------+
|         v' + (1-n)P(x)v = (1-n)Q(x)                 |
|         (This is v' + ~P(x)v = ~Q(x))               |
+--------------------------+--------------------------+
                           |
                           | 4. Solve Linear ODE for v(x)
                           |    (Using Integrating Factor Method)
                           V
+--------------------------+--------------------------+
|         Solution for v(x)                           |
+--------------------------+--------------------------+
                           |
                           | 5. Substitute Back to find y(x)
                           |    y = v^(1/(1-n))
                           V
+--------------------------+--------------------------+
|         Final Solution for y(x)                     |
|         (Check for y=0 singular solution if n>0)    |
+-----------------------------------------------------+
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Imagine "Bernoulli the Bear" who has a "Nuisance" ($y^n$) on his back. To get rid of it, he uses a "Vacuum" ($v$) cleaner. The vacuum cleaner's power is "1 minus the Nuisance" ($1-n$). So, "Bernoulli's Nuisance is vacuumed up by $y$ to the power of 1 minus N."
    *   **Bernoulli's Nuisance:** $y^n$ is the problem term.
    *   **Vacuum (v):** The substitution variable.
    *   **Power of 1 minus N:** $v = y^{1-n}$.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **Bernoulli Form:** $y' + P(x)y = Q(x)y^n$ (Recognize this pattern immediately!)
    *   **The Substitution:** $v = y^{1-n}$ (This is the "magic key".)
    *   **The Transformed Linear Form:** $v' + (1-n)P(x)v = (1-n)Q(x)$ (This is where you're headed, a linear ODE you know how to solve.)

3.  **Spaced-Repetition Schedule:**
    To truly embed this knowledge, commit to this review schedule:
    *   **Day 1:** Immediately after this lesson, review all steps and try 1-2 practice problems.
    *   **Day 3:** Review the core idea, mnemonic, and formulas. Re-do one of the worked examples without looking at the solution.
    *   **Day 7:** Review the entire lesson, focusing on common mistakes. Try a new, challenging practice problem.
    *   **Day 16:** Briefly recall the Bernoulli form, substitution, and transformed equation. Mentally walk through the steps.
    *   **Day 35:** Attempt a complex Bernoulli equation problem from a textbook or online resource, and articulate the steps and reasoning aloud.

4.  **The First-Principles Re-derivation Pathway:**
    If you ever forget the exact form of the transformed linear equation, you can quickly re-derive it:
    *   **Start with the Bernoulli form:** $y' + P(x)y = Q(x)y^n$.
    *   **Recall the substitution:** $v = y^{1-n}$.
    *   **Differentiate $v$ (Chain Rule!):** $v' = (1-n)y^{(1-n)-1}y' = (1-n)y^{-n}y'$.
    *   **Manipulate original ODE:** Divide the original Bernoulli equation by $y^n$: $y^{-n}y' + P(x)y^{1-n} = Q(x)$.
    *   **Substitute:** Now you have $y^{-n}y' = \frac{1}{1-n}v'$ and $y^{1-n} = v$. Plug these in:
        $\frac{1}{1-n}v' + P(x)v = Q(x)$.
    *   **Clear the fraction:** Multiply by $(1-n)$: $v' + (1-n)P(x)v = (1-n)Q(x)$.
    This entire derivation takes less than a minute once you understand the logic, and it ensures you never have to blindly memorize the final linear form.

## 10. Connections — what this leads to

Mastering Bernoulli equations is more than just learning a specific solution technique; it's a stepping stone to understanding broader concepts in differential equations and their applications.

*   **Understanding Transformations:** The most direct connection is to the power of *transformations* in mathematics. Just as Bernoulli equations are transformed into linear equations, many other complex problems (not just ODEs) can be simplified by clever substitutions. This idea is central to fields like integral transforms (Laplace, Fourier), which simplify ODEs and PDEs, and even in advanced algebra for changing bases or coordinate systems.
*   **Linear vs. Non-linear Dynamics:** Bernoulli equations provide a concrete example of how a slight non-linearity ($y^n$ instead of just $y$) can dramatically change the solution method and the nature of solutions. This distinction is fundamental in studying dynamical systems, where linear systems are often solvable analytically, while non-linear systems frequently require numerical methods or qualitative analysis.
*   **Integrating Factor Method:** Since Bernoulli equations reduce to linear first-order ODEs, they reinforce your proficiency with the integrating factor method. This method is a cornerstone for solving many types of first-order ODEs and appears in various forms in physics and engineering (e.g., in circuits or fluid flow problems).
*   **Riccati Equations:** Bernoulli equations are closely related to Riccati equations, which are of the form $y' = P(x) + Q(x)y + R(x)y^2$. While Riccati equations are generally harder to solve, if one particular solution is known, a substitution can transform a Riccati equation into a Bernoulli equation, which can then be solved using the method learned here. This demonstrates how one type of equation can lead to another, building a hierarchy of solvability.
*   **Numerical Methods for ODEs:** Often, real-world differential equations are too complex to solve analytically, even with clever transformations like for Bernoulli equations. Understanding analytical solutions for simpler cases (like Bernoulli) provides a benchmark for validating numerical methods (e.g., Euler's method, Runge-Kutta methods) used to approximate solutions for more general non-linear ODEs.
*   **Stability Analysis:** For non-linear systems, the qualitative behavior of solutions (e.g., whether they approach a stable equilibrium or diverge) is often more important than an exact analytical formula. While Bernoulli equations give exact solutions, they serve as an introduction to how non-linear terms can influence the long-term behavior of a system, a concept central to stability analysis in control theory and dynamical systems.

## 11. Self-check questions

1.  Identify whether the following equations are Bernoulli equations. If so, identify $P(x)$, $Q(x)$, and $n$:
    a) $y' + \frac{2}{x}y = 3x^2 y^4$
    b) $y' + y \ln x = x^2$
    c) $y' + \frac{1}{y} = x y^2$
    d) $x^2 y' + y = y^2$

2.  For the Bernoulli equation $y' - \frac{1}{x}y = x y^3$, what is the appropriate substitution $v = y^{1-n}$? What is the corresponding expression for $y^{-n}y'$ in terms of $v'$?

3.  After applying the Bernoulli substitution and transformation, an equation becomes $v' + 3v = 6e^{2x}$. What was the original Bernoulli equation (in terms of $y$) if the substitution used was $v=y^{-1}$?

4.  Solve the differential equation $y' + y = xy^3$. Show all steps clearly.

5.  Solve the differential equation $x y' + y = x^3 y^{-1}$. Pay close attention to any special conditions or solutions.