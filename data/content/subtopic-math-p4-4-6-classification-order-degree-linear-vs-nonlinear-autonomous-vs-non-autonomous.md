## What it is
An Ordinary Differential Equation (ODE) is an equation involving a function of a single independent variable and its derivatives. Classification is the process of labeling an ODE by its fundamental properties: its **order**, **degree**, **linearity**, and **autonomy**. This taxonomy is the first step in analysis, as it dictates which methods can be used to solve the equation.

## Why it matters
Classification is not academic; it is the triage for all differential equations. In rocket science, the two-body problem is a linear ODE system (integrable), but adding a third body (e.g., Sun-Earth-Moon) makes it nonlinear and chaotic. In machine learning, Neural ODEs use autonomous systems to model continuous transformations, while non-autonomous systems can model processes driven by external, time-varying data.

## When to study it
You are ready for this topic. The only prerequisites are a solid understanding of differential calculus, specifically the notation for first and higher-order derivatives ($f'(x)$, $\frac{dy}{dx}$, $y''$, $y^{(n)}$), and the distinction between dependent and independent variables.

## How to study it (step by step)
1.  **Order:** Write down five ODEs from a textbook. For each one, circle the highest-order derivative present. The order of that derivative is the order of the ODE. For example, in $y''' + 2y' - y = 0$, the highest derivative is $y'''$, so the order is 3.
2.  **Degree:** For the same five equations, ensure they are written as a polynomial in the derivatives (no radicals or fractional powers of derivatives). Identify the highest-order derivative again. The power to which this derivative is raised is the degree. For $ (y'')^3 + y' = 0 $, the order is 2 and the degree is 3. Note: if the equation cannot be written as a polynomial in its derivatives (e.g., $\sin(y') = x$), the degree is undefined.
3.  **Linearity:** The most critical classification. An ODE is linear if the dependent variable (say, $y$) and all its derivatives appear only to the first power and are not multiplied together. Their coefficients must only be functions of the independent variable (say, $x$). Test this: $y'' + x^2 y' + y = 0$ is linear. $y'' + y y' + y = 0$ is nonlinear because of the $y y'$ term. $y'' + \sin(y) = 0$ is nonlinear because of the $\sin(y)$ term.
4.  **Autonomy:** Inspect the equation for the independent variable. If the independent variable (e.g., $t$ for time) does not explicitly appear, the equation is autonomous (time-invariant). The system's laws don't change over time. Contrast $y' = -ky$ (autonomous decay) with $y' = -k(t)y$ (non-autonomous decay, where the decay "constant" changes with time).
5.  **Synthesize:** Take three complex ODEs and classify them on all four metrics. Write down your reasoning for each classification. For example: $t(y'')^2 + 4y = 0$.
    *   Order: 2 (from $y''$)
    *   Degree: 2 (from $(y'')^2$)
    *   Linearity: Nonlinear (because $y''$ is squared)
    *   Autonomy: Non-autonomous (because of the explicit $t$)

## Key ideas, with intuition
1.  **Order is "System Memory."** A first-order system's rate of change ($y'$) depends only on its current state ($y$). A second-order system's acceleration ($y''$) depends on its state ($y$) and velocity ($y'$). Newton's second law, $F=ma \implies \ddot{x} = F(x, \dot{x}, t)/m$, is fundamentally second-order; you need to know position and velocity to predict the future.

2.  **Linearity is "Superposition."** A system is linear if its response to a sum of inputs is the sum of its responses to each input individually. If $y_1(t)$ and $y_2(t)$ are solutions to a linear homogeneous ODE, then any linear combination $c_1 y_1(t) + c_2 y_2(t)$ is also a solution. This property is the foundation of Fourier analysis and quantum mechanics. Nonlinearity means interactions and feedback, where the whole is different from the sum of its parts.
    $$
    \text{If } L[y] = 0 \text{ is a linear ODE, then } L[c_1 y_1 + c_2 y_2] = c_1 L[y_1] + c_2 L[y_2] = 0.
    $$

3.  **Autonomy is "Time Invariance."** An autonomous system is one whose governing laws do not change with time. The phase portrait (a plot of $y'$ vs $y$) is static. For a non-autonomous system, the rules change from moment to moment, driven by an external clock. The equation for a pendulum is autonomous: $\ddot{\theta} + \frac{g}{L}\sin\theta = 0$. The equation for a pendulum whose length changes with time, $\ddot{\theta} + \frac{g}{L(t)}\sin\theta = 0$, is non-autonomous.

## Worked example
Classify the following ODE completely:
$$
\sqrt{\frac{d^2y}{dx^2}} = 5x \left(\frac{dy}{dx}\right) + y^3
$$

**Step 1: Prepare the Equation**
The equation has a radical involving a derivative. To determine the degree, we must clear it by writing the equation in a polynomial form with respect to its derivatives. Square both sides:
$$
\frac{d^2y}{dx^2} = \left( 5x \frac{dy}{dx} + y^3 \right)^2
$$
$$
y'' = 25x^2(y')^2 + 10xy^3y' + y^6
$$

**Step 2: Determine Order**
The highest-order derivative present in the equation is $y''$, or $\frac{d^2y}{dx^2}$.
*   **Order: 2**

**Step 3: Determine Degree**
Now that the equation is in polynomial form, we look at the power of the highest-order derivative ($y''$). It appears as $y''$ to the power of 1.
*   **Degree: 1**

**Step 4: Determine Linearity**
A linear ODE requires the dependent variable $y$ and all its derivatives ($y', y''$) to appear to the power of 1, with coefficients depending only on the independent variable $x$.
*   The term $y^6$ violates this (power of $y$ is not 1).
*   The term $25x^2(y')^2$ violates this (power of $y'$ is not 1).
*   The term $10xy^3y'$ violates this (contains $y^3$).
The equation is definitively nonlinear.
*   **Linearity: Nonlinear**

**Step 5: Determine Autonomy**
An autonomous equation cannot have the independent variable, $x$, appearing explicitly. The terms $25x^2(y')^2$ and $10xy^3y'$ both contain $x$ as a coefficient.
*   **Autonomy: Non-autonomous**

**Reflection:**
The initial step of clearing the radical was crucial; without it, the degree would be ambiguous. The classification then proceeded as a checklist. Order is found first, then degree (of the highest order term). Linearity requires checking *all* terms for violations. Autonomy is a simple check for any explicit $x$ outside of the arguments of $y$ and its derivatives.

## Diagrams
Here is a decision flowchart for classifying an ODE.

```text
                  +-----------------------------+
                  | Given: F(x, y, y', y'', ...) = 0 |
                  +-----------------------------+
                             |
                             V
+-------------------------------------------------------------+
| 1. ORDER: What is the highest derivative, y^(n)?             |
|    --> The order is n.                                      |
+-------------------------------------------------------------+
                             |
                             V
+-------------------------------------------------------------+
| 2. DEGREE: Is the ODE a polynomial in y, y', ...?           |
|    If YES --> What is the power of y^(n)? --> The degree is k. |
|    If NO  --> Degree is undefined.                           |
+-------------------------------------------------------------+
                             |
                             V
+-------------------------------------------------------------+
| 3. LINEARITY: Check two conditions:                         |
|    A) Are y, y', y'', ... all to the power of 1?             |
|    B) Are their coefficients only functions of x?           |
|    If YES to both --> Linear.                               |
|    If NO to either -> Nonlinear.                            |
+-------------------------------------------------------------+
                             |
                             V
+-------------------------------------------------------------+
| 4. AUTONOMY: Does the independent variable 'x' appear       |
|    EXPLICITLY in the equation?                              |
|    If YES --> Non-autonomous.                               |
|    If NO  --> Autonomous.                                  |
+-------------------------------------------------------------+
```

## Memory technique — remember this forever
1.  **Mnemonic:** Think of classifying an ODE like a military report: "**O**fficer **D**aniel's **L**egal **A**ffairs."
    *   **O**rder: Rank (Highest derivative)
    *   **D**egree: Power/Influence of the highest rank (Power of that derivative)
    *   **L**inear: Rules of Engagement (Does it obey superposition?)
    *   **A**utonomous: Mission Time (Are the rules time-invariant?)

2.  **Must-Memorize Formulas/Facts:**
    *   The general form of an **n-th order linear ODE**:
        $$a_n(x)y^{(n)} + a_{n-1}(x)y^{(n-1)} + \dots + a_1(x)y' + a_0(x)y = g(x)$$
        Any deviation from this structure (e.g., $y^2$, $\sin(y)$, $y \cdot y'$) makes it nonlinear.
    *   **Autonomous Form**: $F(y, y', y'', \dots, y^{(n)}) = 0$. The independent variable is absent.

3.  **Spaced Repetition Schedule:** Review these definitions and re-classify 3 new equations at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.**

4.  **First Principles Pathway:** If you forget, you can rebuild the concepts from the general linear form. Write it down. Ask:
    *   What's the highest derivative in my equation vs. the general form? -> **Order**
    *   Is my equation a polynomial in derivatives? What's the power of the highest one? -> **Degree**
    *   Does my equation look exactly like the general form, or does it have illegal terms like $y^2$ or $y y'$? -> **Linearity**
    *   In the general form, the coefficients $a_k(x)$ and forcing term $g(x)$ depend on $x$. Do they in my equation? If not, it's -> **Autonomous**.

## Common mistakes
1.  **Confusing Order and Degree:** Seeing $(y')^3$ and calling it a third-order equation. It is first-order, third-degree. Order is about the *type* of derivative, degree is about its *power*.
2.  **Misidentifying Nonlinearity from Coefficients:** Believing $y'' + (\cos x)y = 0$ is nonlinear because of the $\cos x$ term. This is incorrect. The equation is linear because the *coefficients* of $y$ and its derivatives can be functions of $x$. The nonlinearity comes from functions of $y$, like $\cos(y)$.
3.  **Incorrectly Clearing Radicals:** For the equation $\sqrt{y'} + y = x$, squaring gives $y' + y^2 - 2xy = -x^2$. A common mistake is to just write $y' + y^2 = x^2$, which is wrong and leads to an incorrect classification. Be precise with algebra.

## Self-check
1.  Classify the ODE for radioactive decay: $\frac{dN}{dt} = -\lambda N$.
2.  Classify the forced, damped pendulum equation: $mL\ddot{\theta} + c\dot{\theta} + mg\sin(\theta) = F_0 \cos(\omega t)$.
3.  Construct an ODE that is second-order, third-degree, nonlinear in its dependent variable but linear in its derivatives, and autonomous. Justify each property.