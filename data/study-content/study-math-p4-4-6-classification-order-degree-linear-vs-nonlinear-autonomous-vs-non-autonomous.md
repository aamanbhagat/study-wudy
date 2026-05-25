## 1. What it is — in plain English

Imagine you have a big pile of tools in your garage. Some are for cutting, some for hammering, some for screwing things in. To find the right tool for a job, you first need to know what kind of tool it is, right? You wouldn't try to hammer a nail with a screwdriver.

In mathematics, "Ordinary Differential Equations" (ODEs) are like those tools. They are equations that involve an unknown function and its derivatives. These equations describe how things change. Just like with tools, before you can *solve* an ODE (which is like using the tool), you need to *understand* what kind of ODE it is.

"Classification" is simply the process of sorting and categorizing these ODEs based on a few key characteristics. We look at features like the highest derivative present (its "order"), the power to which that highest derivative is raised (its "degree"), whether the equation behaves "nicely" like a straight line (is it "linear" or "nonlinear"), and whether time or position explicitly affects the system (is it "autonomous" or "non-autonomous"). This sorting helps us pick the right mathematical "tool" or method to tackle it.

## 2. Why it matters — real-world applications

Classifying ODEs isn't just an academic exercise; it's a fundamental step that dictates how we approach and solve problems across science and engineering. Knowing an ODE's classification often tells us immediately what kind of behavior to expect from the system it describes and which analytical or numerical techniques are applicable.

1.  **Aerospace Engineering (Rocket Trajectories):** When designing a rocket, engineers use ODEs to model its motion, taking into account thrust, gravity, and air resistance. A simple model might yield a linear ODE, which has well-understood analytical solutions. However, a more realistic model incorporating variable mass, non-constant gravitational fields, or drag forces that depend nonlinearly on velocity might result in a *nonlinear* and *non-autonomous* ODE. Recognizing this nonlinearity immediately tells the engineers that they likely won't find a simple closed-form solution and will need to rely on numerical simulation methods (often implemented in software like MATLAB or Python) to predict the rocket's path. This is crucial for companies like SpaceX or NASA.

2.  **Electrical Engineering (Circuit Analysis):** The behavior of RLC (Resistor-Inductor-Capacitor) circuits is described by second-order ODEs. If the components are ideal (e.g., resistance is constant, capacitance doesn't depend on voltage), the resulting ODE is *linear*. This allows engineers to use powerful techniques like Laplace transforms to analyze circuit responses (e.g., how a speaker circuit responds to an audio signal). If, however, a component like a diode introduces a non-linear voltage-current relationship, the ODE becomes *nonlinear*, requiring different analysis techniques, often involving linearization around operating points or numerical methods.

3.  **Population Dynamics (Biology/Ecology):** The growth of a population can be modeled by ODEs. The simplest model, $dP/dt = kP$ (where $P$ is population, $t$ is time), is a first-order, linear, and autonomous ODE, describing exponential growth. A more realistic logistic growth model, $dP/dt = kP(1 - P/K)$ (where $K$ is carrying capacity), is *nonlinear* due to the $P^2$ term. This classification immediately tells biologists that while the exponential model has a straightforward solution, the logistic model (though still separable) exhibits more complex dynamics, such as saturation, which is characteristic of many real-world biological systems.

4.  **Machine Learning (Optimization & Control):** In advanced machine learning, especially in areas like reinforcement learning or optimal control, dynamic systems are often modeled by ODEs. For instance, training a neural network can sometimes be viewed as finding the optimal path in a high-dimensional space, described by gradient-based ODEs. If the underlying system's dynamics are *autonomous* (i.e., time-invariant), certain stability analyses and control strategies become applicable. If the system is *non-autonomous* (e.g., external factors changing over time), the complexity of control design increases significantly, influencing how algorithms are designed to adapt and learn.

## 3. Prerequisites — what you must know first

Before diving into the classification of ODEs, ensure you have a solid grasp of the following fundamental concepts:

*   **Functions:** An understanding of what a function is ($y = f(x)$), including independent variables (input, often $x$ or $t$) and dependent variables (output, often $y$).
*   **Derivatives:** A firm grasp of differentiation rules (power rule, product rule, chain rule, etc.) and the meaning of derivatives as rates of change. You should be comfortable with first derivatives ($y'$ or $dy/dx$), second derivatives ($y''$ or $d^2y/dx^2$), and higher-order derivatives ($y^{(n)}$ or $d^ny/dx^n$).
*   **Algebra:** Proficiency in manipulating algebraic expressions, solving equations, and understanding polynomials. This includes isolating terms and recognizing powers.
*   **Equations:** A basic understanding that an equation expresses a relationship between variables, often involving an equality sign.
*   **Variables:** The distinction between independent variables (which can be chosen freely) and dependent variables (whose values depend on the independent variables). In ODEs, the unknown function is always the dependent variable.

If any of these feel shaky, it's highly recommended to review them before proceeding. This lesson assumes you are comfortable with these foundational mathematical tools.

## 4. The core idea — step by step

Let's break down the classification of Ordinary Differential Equations into its fundamental components. We'll build intuition, provide concrete examples, and then formalize the definitions.

### Step 1: Understanding Differential Equations (Review/Context)

**Plain-English Statement:** At its heart, a differential equation is just an equation that includes not only an unknown function (like $y$) but also one or more of its derivatives (like $y'$ or $y''$). It describes a relationship between a quantity and its rate(s) of change. "Ordinary" means there's only one independent variable (e.g., $x$ or $t$), so we only deal with ordinary derivatives, not partial derivatives.

**Small Concrete Example:**
Consider the equation:
$$ \frac{dy}{dx} = 2x $$
Here, $y$ is our unknown function of $x$. The equation relates the first derivative of $y$ with respect to $x$ to the variable $x$ itself. If we integrate both sides, we find $y = x^2 + C$.

**Formal/Mathematical Version:**
An ordinary differential equation (ODE) is an equation involving an unknown function of a single independent variable and one or more of its derivatives with respect to that variable. It can generally be expressed in the form:
$$ F(x, y, y', y'', \ldots, y^{(n)}) = 0 $$
where $y = y(x)$ is the dependent variable, $x$ is the independent variable, and $y^{(k)}$ denotes the $k$-th derivative of $y$ with respect to $x$.

**What Could Go Wrong:**
A common mistake is confusing an ODE with a Partial Differential Equation (PDE). A PDE involves an unknown function of *multiple* independent variables and its *partial* derivatives. For example, $\frac{\partial u}{\partial t} = \frac{\partial^2 u}{\partial x^2}$ is a PDE, not an ODE. Always check that there's only one independent variable.

### Step 2: Order of an ODE

**Plain-English Statement:** The "order" of an ODE is simply the highest derivative that appears in the equation. Think of it as the "level" of change being described. If the equation only has first derivatives, it's a first-order ODE. If it has second derivatives, and no higher ones, it's a second-order ODE, and so on.

**Small Concrete Example:**
Let's look at a few examples:
1.  $$ \frac{dy}{dx} + 5y = \sin(x) $$
    The highest derivative here is $\frac{dy}{dx}$ (the first derivative). So, this is a **first-order** ODE.
2.  $$ y'' - 3y' + 2y = 0 $$
    The highest derivative is $y''$ (the second derivative). So, this is a **second-order** ODE.
3.  $$ \frac{d^3y}{dx^3} + \left(\frac{dy}{dx}\right)^4 - xy = e^x $$
    The highest derivative is $\frac{d^3y}{dx^3}$ (the third derivative). The power of the first derivative $(\frac{dy}{dx})^4$ does not affect the order. So, this is a **third-order** ODE.

**Formal/Mathematical Version:**
The order of an ordinary differential equation is the order of the highest derivative of the dependent variable with respect to the independent variable appearing in the equation.

**What Could Go Wrong:**
Students sometimes confuse the power of a derivative with the order of the derivative. For instance, in $y'' + (y')^3 = x$, the highest derivative is $y''$ (second order), even though $y'$ is raised to the power of 3. The order is 2, not 3. Always look for the *superscript* on $y^{(n)}$ or the number of primes.

### Step 3: Degree of an ODE

**Plain-English Statement:** The "degree" of an ODE is the power to which the *highest order derivative* is raised, *after* the equation has been cleared of fractions and radicals with respect to the derivatives and made polynomial in its derivatives. If the highest derivative appears as just $y''$, its power is 1. If it appears as $(y'')^3$, its power is 3.

**Small Concrete Example:**
1.  $$ y'' - 3y' + 2y = 0 $$
    The highest derivative is $y''$. It is raised to the power of 1. So, this is a **degree 1** ODE.
2.  $$ \left(\frac{d^2y}{dx^2}\right)^3 + \left(\frac{dy}{dx}\right)^2 - xy = e^x $$
    The highest derivative is $\frac{d^2y}{dx^2}$. It is raised to the power of 3. So, this is a **degree 3** ODE.
3.  $$ \sqrt{y'} + y = x $$
    First, we need to clear the radical. Square both sides: $y' = (x-y)^2$.
    The highest derivative is $y'$. It is raised to the power of 1. So, this is a **degree 1** ODE.
4.  $$ \sin(y'') + y' = x $$
    Here, the highest derivative $y''$ is inside a $\sin$ function. This equation is *not* a polynomial in its derivatives. Therefore, its **degree is undefined**.

**Formal/Mathematical Version:**
The degree of an ordinary differential equation is the power of the highest order derivative, provided that the differential equation can be expressed as a polynomial in its derivatives. If the equation cannot be expressed as a polynomial in its derivatives (e.g., if a derivative is inside a transcendental function like $\sin(y'')$, $e^{y'}$, or $\log(y''')$), then the degree is undefined.

**What Could Go Wrong:**
-   **Not making it polynomial first:** Failing to clear radicals or fractions involving derivatives before determining the power. For example, for $(y')^{1/2} + y = x$, the degree is not $1/2$. You must square both sides to get $y' = (x-y)^2$, then the degree is 1.
-   **Confusing powers of $y$ or $x$ with powers of derivatives:** In $(y'')^3 + y^2 = x$, the degree is 3, not 2, because $y^2$ is a power of the dependent variable, not a derivative.
-   **Undefined degree:** Forgetting that equations like $\cos(y') + y = x$ or $e^{y''} = x$ have an undefined degree because they are not polynomial in their derivatives.

### Step 4: Linear vs. Nonlinear ODEs

**Plain-English Statement:** An ODE is "linear" if the dependent variable ($y$) and all its derivatives ($y'$, $y''$, etc.) appear only to the first power and are never multiplied together. Also, their coefficients can only depend on the independent variable ($x$), not on $y$ or its derivatives. If any of these conditions are violated, the ODE is "nonlinear." Think of it like a linear equation in algebra ($ax+b=0$) where the variable $x$ is only to the power of 1.

**Small Concrete Example:**
1.  $$ x^2 y'' + \sin(x) y' - 3y = e^x $$
    -   $y''$, $y'$, and $y$ all appear to the first power.
    -   They are not multiplied together (e.g., no $y y'$ or $(y')^2$).
    -   Their coefficients ($x^2$, $\sin(x)$, $-3$) depend only on $x$.
    -   This is a **linear** ODE.
2.  $$ y'' + y y' = x $$
    -   The term $y y'$ involves the dependent variable $y$ multiplied by its derivative $y'$. This violates the condition.
    -   This is a **nonlinear** ODE.
3.  $$ y'' + (y')^2 = 0 $$
    -   The term $(y')^2$ involves a derivative raised to a power greater than 1. This violates the condition.
    -   This is a **nonlinear** ODE.
4.  $$ y'' + \cos(y) = x $$
    -   The term $\cos(y)$ involves the dependent variable $y$ inside a nonlinear function ($\cos$). This violates the condition (it's not $y$ to the first power).
    -   This is a **nonlinear** ODE.

**Formal/Mathematical Version:**
An $n$-th order ordinary differential equation is said to be **linear** if it can be written in the form:
$$ a_n(x) \frac{d^ny}{dx^n} + a_{n-1}(x) \frac{d^{n-1}y}{dx^{n-1}} + \ldots + a_1(x) \frac{dy}{dx} + a_0(x) y = g(x) $$
where $a_n(x), a_{n-1}(x), \ldots, a_0(x)$ and $g(x)$ are functions of the independent variable $x$ only.
If an ODE cannot be written in this form, it is **nonlinear**.
Key conditions for linearity:
1.  The dependent variable $y$ and all its derivatives $y', y'', \ldots, y^{(n)}$ appear only to the first power.
2.  No products of $y$ or any of its derivatives are present (e.g., $y y'$, $y^2$, $(y')^3$).
3.  No transcendental functions (like $\sin(y)$, $e^y$, $\log(y')$) of $y$ or its derivatives are present.

**What Could Go Wrong:**
-   **Confusing $x$ terms with $y$ terms:** An equation like $y'' + x^2 y' + \sin(x) y = e^x$ is linear. The $x^2$, $\sin(x)$, and $e^x$ terms are fine because they are functions of the *independent* variable $x$, acting as coefficients or the forcing term. It's when $y$ or its derivatives appear in these positions (e.g., $y^2 y''$, $\sin(y) y'$, $e^y$) that it becomes nonlinear.
-   **Missing implicit nonlinearities:** Sometimes a nonlinearity isn't immediately obvious. For example, $y' = y/x$ is linear. But $y' = x/y$ can be rewritten as $y y' = x$, which is nonlinear.

### Step 5: Autonomous vs. Non-autonomous ODEs

**Plain-English Statement:** An ODE is "autonomous" if the independent variable (often $t$ for time, or $x$ for position) does *not* explicitly appear anywhere in the equation. It only appears implicitly through the dependent variable and its derivatives. If the independent variable *does* explicitly show up, the ODE is "non-autonomous." Think of it as whether the system's rules change over time (non-autonomous) or stay constant (autonomous).

**Small Concrete Example:**
1.  $$ \frac{d^2y}{dt^2} + 3\frac{dy}{dt} + 2y = 0 $$
    -   The independent variable is $t$.
    -   The equation contains $y''$, $y'$, and $y$. None of these terms explicitly include $t$ by itself (e.g., no $t$, $t^2$, $\sin(t)$).
    -   This is an **autonomous** ODE.
2.  $$ \frac{dy}{dt} + ty = 0 $$
    -   The independent variable is $t$.
    -   The term $ty$ explicitly includes $t$.
    -   This is a **non-autonomous** ODE.
3.  $$ y'' + y' + y^2 = \sin(x) $$
    -   The independent variable is $x$.
    -   The term $\sin(x)$ explicitly includes $x$.
    -   This is a **non-autonomous** ODE. (Note: it's also nonlinear due to $y^2$).

**Formal/Mathematical Version:**
An ordinary differential equation $F(x, y, y', \ldots, y^{(n)}) = 0$ is said to be **autonomous** if the function $F$ does not explicitly depend on the independent variable $x$. That is, it can be written as $F(y, y', \ldots, y^{(n)}) = 0$. If $F$ explicitly depends on $x$, then the ODE is **non-autonomous**.

**What Could Go Wrong:**
-   **Misinterpreting coefficients:** If an ODE has coefficients that are functions of the independent variable, it is non-autonomous. For example, $x y'' + y' = 0$ is non-autonomous because of the $x$ in front of $y''$. This is different from $y y'' + y' = 0$, which is autonomous (but nonlinear). The key is whether the *explicit* independent variable appears.
-   **Confusing autonomous with linear:** Autonomous and linear are independent classifications. An ODE can be autonomous and nonlinear (e.g., $y' = y^2$), or non-autonomous and linear (e.g., $y' = x y$).

## 5. Worked examples — multiple, with every step shown

Let's classify several ODEs using all the criteria we've discussed.

### Example 1: Easy

**Problem:** Classify the following ODE:
$$ \frac{dy}{dx} + 2y = \cos(x) $$

**Given:** The ODE is $\frac{dy}{dx} + 2y = \cos(x)$.
**We want:** To determine its order, degree, linearity, and whether it's autonomous.

---

**Step-by-step Solution:**

1.  **Identify the dependent and independent variables:**
    *   The derivative is $\frac{dy}{dx}$, so $y$ is the dependent variable and $x$ is the independent variable.
    *   *Explanation:* The notation $\frac{dy}{dx}$ explicitly tells us that $y$ depends on $x$.

2.  **Determine the Order:**
    *   The highest derivative present is $\frac{dy}{dx}$, which is a first derivative.
    *   Therefore, the **Order is 1**.
    *   *Explanation:* We look for $y'$, $y''$, $y'''$, etc., and pick the highest one. Here, only $y'$ appears.

3.  **Determine the Degree:**
    *   The highest derivative is $\frac{dy}{dx}$. It is raised to the power of 1.
    *   The equation is already a polynomial in its derivatives.
    *   Therefore, the **Degree is 1**.
    *   *Explanation:* We check the power of the highest derivative found in step 2. If it's not inside a function like $\sin$ or $\exp$, and not under a radical, its power is its degree.

4.  **Determine Linearity:**
    *   Check for conditions of linearity:
        *   Are $y$ and its derivatives (here, $y'$) raised only to the first power? Yes, $y'$ is to power 1, and $y$ is to power 1.
        *   Are there any products of $y$ or its derivatives? No (e.g., no $y \cdot y'$).
        *   Are there any nonlinear functions of $y$ or its derivatives? No (e.g., no $\sin(y)$ or $e^{y'}$).
        *   Are coefficients of $y$ and its derivatives functions of only the independent variable $x$? Yes, the coefficient of $y'$ is $1$ (a constant, which is a function of $x$), and the coefficient of $y$ is $2$ (also a constant). The right-hand side $\cos(x)$ is also a function of $x$.
    *   All conditions are met.
    *   Therefore, the ODE is **Linear**.
    *   *Explanation:* We systematically check the rules for linearity. Since all rules are followed, the equation is linear.

5.  **Determine Autonomy:**
    *   Does the independent variable $x$ appear explicitly in the equation?
    *   Yes, the term $\cos(x)$ explicitly contains $x$.
    *   Therefore, the ODE is **Non-autonomous**.
    *   *Explanation:* An autonomous ODE would not have any explicit $x$ terms. Since $\cos(x)$ is present, it's non-autonomous.

---

**Final Answer:**
The ODE $\frac{dy}{dx} + 2y = \cos(x)$ is:
*   **Order: 1**
*   **Degree: 1**
*   **Linear**
*   **Non-autonomous**

**Reflection:** This was a straightforward example. The key was to carefully check each classification criterion against the given equation. No tricky powers or functions were present.

### Example 2: Medium

**Problem:** Classify the following ODE:
$$ y y'' + (y')^3 = x^2 $$

**Given:** The ODE is $y y'' + (y')^3 = x^2$.
**We want:** To determine its order, degree, linearity, and whether it's autonomous.

---

**Step-by-step Solution:**

1.  **Identify the dependent and independent variables:**
    *   The derivatives are $y''$ and $y'$, so $y$ is the dependent variable and $x$ is the independent variable (implied by prime notation, $y' = dy/dx$).
    *   *Explanation:* The prime notation $y'$ and $y''$ universally implies differentiation with respect to a single independent variable, typically $x$ or $t$.

2.  **Determine the Order:**
    *   The derivatives present are $y''$ (second order) and $y'$ (first order).
    *   The highest derivative is $y''$.
    *   Therefore, the **Order is 2**.
    *   *Explanation:* We pick the highest number of primes.

3.  **Determine the Degree:**
    *   The highest derivative is $y''$.
    *   It is raised to the power of 1 (implicitly, $y'' = (y'')^1$).
    *   The equation is already a polynomial in its derivatives.
    *   Therefore, the **Degree is 1**.
    *   *Explanation:* The degree is the power of the *highest order* derivative. Even though $(y')^3$ exists, $y'$ is not the highest order derivative.

4.  **Determine Linearity:**
    *   Check for conditions of linearity:
        *   Are $y$ and its derivatives raised only to the first power? No, $y'$ is raised to the power of 3 in $(y')^3$. This violates the condition.
        *   Are there any products of $y$ or its derivatives? Yes, the term $y y''$ involves the dependent variable $y$ multiplied by its derivative $y''$. This also violates the condition.
        *   Are there any nonlinear functions of $y$ or its derivatives? No.
        *   Are coefficients of $y$ and its derivatives functions of only the independent variable $x$? The coefficient of $y''$ is $y$, which is the dependent variable, not just $x$. This also violates the condition.
    *   Since multiple conditions for linearity are violated, this ODE is **Nonlinear**.
    *   *Explanation:* The presence of $(y')^3$ and $y y''$ immediately makes the equation nonlinear.

5.  **Determine Autonomy:**
    *   Does the independent variable $x$ appear explicitly in the equation?
    *   Yes, the term $x^2$ explicitly contains $x$.
    *   Therefore, the ODE is **Non-autonomous**.
    *   *Explanation:* The right-hand side $x^2$ is an explicit function of the independent variable $x$.

---

**Final Answer:**
The ODE $y y'' + (y')^3 = x^2$ is:
*   **Order: 2**
*   **Degree: 1**
*   **Nonlinear**
*   **Non-autonomous**

**Reflection:** This example highlights the importance of carefully checking the definition of degree (power of the *highest* derivative) and linearity (multiple ways an ODE can be nonlinear). The $y y''$ term and $(y')^3$ term are both red flags for nonlinearity.

### Example 3: Medium-Hard

**Problem:** Classify the following ODE:
$$ \sin(y'') + e^x y' = \sqrt{y} $$

**Given:** The ODE is $\sin(y'') + e^x y' = \sqrt{y}$.
**We want:** To determine its order, degree, linearity, and whether it's autonomous.

---

**Step-by-step Solution:**

1.  **Identify the dependent and independent variables:**
    *   The derivatives are $y''$ and $y'$, so $y$ is the dependent variable and $x$ is the independent variable.
    *   *Explanation:* Standard prime notation implies $x$ as the independent variable.

2.  **Determine the Order:**
    *   The derivatives present are $y''$ (second order) and $y'$ (first order).
    *   The highest derivative is $y''$.
    *   Therefore, the **Order is 2**.
    *   *Explanation:* $y''$ is the highest order derivative.

3.  **Determine the Degree:**
    *   The highest derivative is $y''$.
    *   However, $y''$ is inside a transcendental function, $\sin(y'')$.
    *   This equation cannot be expressed as a polynomial in its derivatives.
    *   Therefore, the **Degree is Undefined**.
    *   *Explanation:* For an ODE to have a degree, it must be polynomial in its derivatives. The presence of $\sin(y'')$ prevents this.

4.  **Determine Linearity:**
    *   Check for conditions of linearity:
        *   Are $y$ and its derivatives raised only to the first power? No, $y''$ is inside $\sin(y'')$, which is a nonlinear function of $y''$. Also, $y$ is under a square root, $\sqrt{y} = y^{1/2}$, which is not $y$ to the first power. These violate the condition.
        *   Are there any products of $y$ or its derivatives? No.
        *   Are there any nonlinear functions of $y$ or its derivatives? Yes, $\sin(y'')$ and $\sqrt{y}$ are nonlinear functions of the dependent variable/its derivative.
        *   Are coefficients of $y$ and its derivatives functions of only the independent variable $x$? The coefficient of $y'$ is $e^x$, which is a function of $x$, which is fine. But the $\sin(y'')$ and $\sqrt{y}$ terms are themselves nonlinear.
    *   Since multiple conditions for linearity are violated, this ODE is **Nonlinear**.
    *   *Explanation:* $\sin(y'')$ and $\sqrt{y}$ are direct violations of linearity.

5.  **Determine Autonomy:**
    *   Does the independent variable $x$ appear explicitly in the equation?
    *   Yes, the term $e^x$ explicitly contains $x$.
    *   Therefore, the ODE is **Non-autonomous**.
    *   *Explanation:* The presence of $e^x$ makes it non-autonomous.

---

**Final Answer:**
The ODE $\sin(y'') + e^x y' = \sqrt{y}$ is:
*   **Order: 2**
*   **Degree: Undefined**
*   **Nonlinear**
*   **Non-autonomous**

**Reflection:** This example illustrates cases where the degree is undefined due to transcendental functions of derivatives. It also shows how multiple factors can contribute to nonlinearity.

### Example 4: Hard/Tricky

**Problem:** Classify the following ODE:
$$ \frac{d^2y}{dx^2} + \left(\frac{dy}{dx}\right)^2 + y = 0 $$

**Given:** The ODE is $\frac{d^2y}{dx^2} + \left(\frac{dy}{dx}\right)^2 + y = 0$.
**We want:** To determine its order, degree, linearity, and whether it's autonomous.

---

**Step-by-step Solution:**

1.  **Identify the dependent and independent variables:**
    *   The derivatives are $\frac{d^2y}{dx^2}$ and $\frac{dy}{dx}$, so $y$ is the dependent variable and $x$ is the independent variable.
    *   *Explanation:* The Leibniz notation clearly indicates $y$ depends on $x$.

2.  **Determine the Order:**
    *   The derivatives present are $\frac{d^2y}{dx^2}$ (second order) and $\frac{dy}{dx}$ (first order).
    *   The highest derivative is $\frac{d^2y}{dx^2}$.
    *   Therefore, the **Order is 2**.
    *   *Explanation:* We identify the highest order of differentiation.

3.  **Determine the Degree:**
    *   The highest derivative is $\frac{d^2y}{dx^2}$.
    *   It is raised to the power of 1 (implicitly, $(\frac{d^2y}{dx^2})^1$).
    *   The equation is already a polynomial in its derivatives.
    *   Therefore, the **Degree is 1**.
    *   *Explanation:* Despite the $(\frac{dy}{dx})^2$ term, the degree is determined by the power of the *highest* order derivative, which is $\frac{d^2y}{dx^2}$ and its power is 1.

4.  **Determine Linearity:**
    *   Check for conditions of linearity:
        *   Are $y$ and its derivatives raised only to the first power? No, the term $\left(\frac{dy}{dx}\right)^2$ involves a derivative raised to the power of 2. This violates the condition.
        *   Are there any products of $y$ or its derivatives? No.
        *   Are there any nonlinear functions of $y$ or its derivatives? No, other than the power of the derivative.
        *   Are coefficients of $y$ and its derivatives functions of only the independent variable $x$? Yes, the coefficients are all constants (1), which are functions of $x$. However, the power rule violation already makes it nonlinear.
    *   Since the term $\left(\frac{dy}{dx}\right)^2$ violates the first power rule for derivatives, this ODE is **Nonlinear**.
    *   *Explanation:* The term $(\frac{dy}{dx})^2$ is the direct cause of nonlinearity.

5.  **Determine Autonomy:**
    *   Does the independent variable $x$ appear explicitly in the equation?
    *   The equation contains $\frac{d^2y}{dx^2}$, $\left(\frac{dy}{dx}\right)^2$, and $y$. None of these terms explicitly contain $x$ (e.g., no $x$, $x^2$, $\sin(x)$).
    *   Therefore, the ODE is **Autonomous**.
    *   *Explanation:* There are no explicit $x$ terms in the equation.

---

**Final Answer:**
The ODE $\frac{d^2y}{dx^2} + \left(\frac{dy}{dx}\right)^2 + y = 0$ is:
*   **Order: 2**
*   **Degree: 1**
*   **Nonlinear**
*   **Autonomous**

**Reflection:** This example is tricky because it's autonomous but nonlinear. The nonlinearity comes from the *power* of a derivative, not from a product of $y$ and its derivative, or a transcendental function. It's a good reminder that linearity is a very strict condition.

## 6. Common mistakes and traps

Students often stumble on specific points when classifying ODEs. Here are some of the most common traps:

1.  **Confusing Order and Degree:** Mistaking the highest power of *any* derivative for the degree, rather than the power of the *highest order* derivative. For example, in $y''' + (y')^5 = x$, the order is 3, and the degree is 1 (not 5).
2.  **Incorrectly Determining Degree for Non-Polynomial Forms:** Forgetting that degree is undefined if the ODE cannot be written as a polynomial in its derivatives. Expressions like $\sin(y')$, $e^{y''}$, $\ln(y''')$, or even $\sqrt{y'}$ (before squaring) mean the degree is undefined.
3.  **Misidentifying Linearity due to Independent Variable Terms:** Thinking an ODE is nonlinear because of terms like $\sin(x)$ or $x^2$. For example, $y'' + x^2 y' + \sin(x) y = 0$ is LINEAR. The coefficients ($x^2$, $\sin(x)$) are functions of the independent variable $x$, which is perfectly fine for linearity. Nonlinearity arises from $y$, $y'$, etc., appearing in powers greater than one, being multiplied together, or being inside nonlinear functions.
4.  **Missing Implicit Nonlinearities:** Overlooking products like $y y'$ or $y^2 y''$ as sources of nonlinearity. Also, functions like $\sqrt{y}$ or $1/y'$ are nonlinear forms of $y$ or its derivatives.
5.  **Confusing Autonomous with Linear:** These are independent classifications. An ODE can be autonomous and nonlinear (e.g., $y' = y^2$), or non-autonomous and linear (e.g., $y' = x$). Don't assume one implies the other.
6.  **Not Rearranging or Simplifying First:** Sometimes an ODE might look complex. It's often helpful to clear denominators or radicals involving derivatives before determining the degree. For example, $y' = \frac{1}{y'}$ becomes $(y')^2 = 1$, which has degree 2, not undefined.

## 7. Textbook-precise explanation

Let $y = y(x)$ be an unknown function of a single independent variable $x$. An ordinary differential equation (ODE) is an equation that involves $x$, $y$, and one or more derivatives of $y$ with respect to $x$. Such an equation can generally be expressed in the form $F(x, y, y', y'', \ldots, y^{(n)}) = 0$.

**Order:**
The **order** of an ordinary differential equation is the order of the highest derivative of the dependent variable $y$ with respect to the independent variable $x$ appearing in the equation.
*Example:* In $y''' + (y')^2 - xy = 0$, the highest derivative is $y'''$, so the order is 3.
(See: Boyce & DiPrima, *Elementary Differential Equations and Boundary Value Problems*, 11e, Chapter 1, Section 1.2, p. 5)

**Degree:**
The **degree** of an ordinary differential equation is the highest exponent (power) of the highest order derivative occurring in the equation, after the equation has been rationalized and made free from radicals and fractional powers with respect to the derivatives. If the equation cannot be expressed as a polynomial in its derivatives, then its degree is undefined.
*Example:* In $(y'')^3 + x^2 y' - y = 0$, the highest order derivative is $y''$, and its power is 3, so the degree is 3. In $\cos(y') + y = x$, the degree is undefined because $\cos(y')$ is not a polynomial in $y'$.
(See: Zill, *A First Course in Differential Equations with Modeling Applications*, 11e, Chapter 1, Section 1.1, p. 4)

**Linearity:**
An $n$-th order ordinary differential equation is said to be **linear** if it can be written in the specific form:
$$ a_n(x) \frac{d^ny}{dx^n} + a_{n-1}(x) \frac{d^{n-1}y}{dx^{n-1}} + \ldots + a_1(x) \frac{dy}{dx} + a_0(x) y = g(x) $$
where $a_n(x), a_{n-1}(x), \ldots, a_0(x)$ and $g(x)$ are functions of the independent variable $x$ only, and $a_n(x) \not\equiv 0$.
If an ODE cannot be expressed in this form, it is **nonlinear**. This occurs if:
1.  The dependent variable $y$ or any of its derivatives $y', y'', \ldots, y^{(n)}$ appear to a power other than one (e.g., $y^2$, $(y')^3$).
2.  There are products of the dependent variable and/or its derivatives (e.g., $y y'$, $y'' y'$).
3.  The dependent variable or its derivatives appear as arguments of transcendental functions (e.g., $\sin(y)$, $e^{y'}$, $\log(y'')$).
*Example:* $x^2 y'' + e^x y' - y = \sin(x)$ is linear. $y'' + y y' = x$ is nonlinear due to the $y y'$ term.
(See: Tenenbaum & Pollard, *Ordinary Differential Equations*, Dover Publications, Chapter 1, Section 1, p. 1)

**Autonomy:**
An ordinary differential equation $F(x, y, y', \ldots, y^{(n)}) = 0$ is said to be **autonomous** if the function $F$ does not explicitly depend on the independent variable $x$. That is, the equation can be written solely in terms of $y$ and its derivatives: $F(y, y', \ldots, y^{(n)}) = 0$. If $F$ explicitly depends on $x$, then the ODE is **non-autonomous**.
*Example:* $y'' + y' + y^2 = 0$ is autonomous. $y'' + x y' + y = 0$ is non-autonomous due to the explicit $x$ term.
(See: Perko, *Differential Equations and Dynamical Systems*, 3e, Chapter 1, Section 1.1, p. 1)

## 8. ASCII diagrams

Here's an ASCII diagram illustrating the classification process for an ODE.

```text
                                  START
                                    |
                                    v
                          +---------------------+
                          |  Is it an ODE?      |
                          | (Only one indep. var)|
                          +---------------------+
                                    | Yes
                                    v
                          +---------------------+
                          |   Determine ORDER   |
                          | (Highest derivative)|
                          +---------------------+
                                    |
                                    v
                          +---------------------+
                          |   Determine DEGREE  |
                          | (Power of highest   |
                          |  derivative, if poly)|
                          +---------------------+
                                    |
                                    v
                          +---------------------+
                          |   Is it LINEAR?     |
                          | (y & deriv. power 1,|
                          |  no products, no non-|
                          |  linear functions of|
                          |  y or deriv., coeffs|
                          |  only depend on indep.|
                          |  var.)              |
                          +---------------------+
                                /   \
                             Yes     No
                             /         \
                            v           v
                     +-------+       +-------+
                     | LINEAR|       |NONLINEAR|
                     +-------+       +-------+
                                    |
                                    v
                          +---------------------+
                          | Is it AUTONOMOUS?   |
                          | (No explicit indep. |
                          |  variable)          |
                          +---------------------+
                                /   \
                             Yes     No
                             /         \
                            v           v
                     +---------+   +-------------+
                     |AUTONOMOUS|   |NON-AUTONOMOUS|
                     +---------+   +-------------+
                                    |
                                    v
                                  END
```

*Figure Description:* This flow chart outlines the sequential process of classifying an ordinary differential equation. It begins by confirming it's an ODE. Then, it proceeds to determine the order (based on the highest derivative), followed by the degree (power of that highest derivative, if polynomial). Next, it branches based on linearity, checking for specific conditions related to the dependent variable and its derivatives. Finally, it classifies the ODE as autonomous or non-autonomous based on the explicit presence of the independent variable.

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    To remember the four key classifications, use the acronym **O.D.L.A.**
    *   **O**rder
    *   **D**egree
    *   **L**inear/Nonlinear
    *   **A**utonomous/Non-autonomous

    Visualize an "ODLA" — a giant, ancient, wise owl with four eyes, each focusing on one aspect of the ODE. The first eye looks at the "Order" (how many primes/d's), the second at "Degree" (the power of that highest prime), the third at "Linearity" (is it straight and simple?), and the fourth at "Autonomy" (does it depend on $x$ explicitly?).

2.  **1-3 Formulas/Facts to Overlearn:**
    *   **Order:** The highest $n$ in $y^{(n)}$. (Simplest, most fundamental.)
    *   **Linearity Condition:** Must be of the form $a_n(x)y^{(n)} + \dots + a_0(x)y = g(x)$. No $y \cdot y'$, no $y^2$, no $\sin(y)$, no $(y')^3$. This is the trickiest and most important one.
    *   **Autonomous Condition:** No explicit $x$ (or $t$) terms.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review all definitions and worked examples. Re-classify a few examples from your textbook.
    *   **Day 3:** Review definitions and try to classify 2-3 new, challenging ODEs without looking at notes.
    *   **Day 7:** Quickly recall the definitions for each classification. Try to explain them to an imaginary peer.
    *   **Day 16:** Review the common mistakes and traps. Work through an example specifically designed to hit one of those traps.
    *   **Day 35:** Without notes, write down the formal definitions for order, degree, linearity, and autonomy. Test yourself on a complex ODE.

4.  **First-Principles Re-derivation Pathway:**
    If you forget a specific rule for classification, always go back to the fundamental definition of an ODE and build up:
    *   **What is an ODE?** An equation involving a function $y(x)$ and its derivatives.
    *   **Order:** If it's about derivatives, what's the most "complex" derivative? The highest one. That's the order.
    *   **Degree:** If the order is the highest derivative, what's its "strength" or "multiplicity"? How many times is *that specific highest derivative* multiplied by itself? That's the degree. (Remember to make it polynomial first!)
    *   **Linearity:** What does "linear" mean in algebra ($y=mx+b$)? Straight lines, no squares, no products of variables. Apply that to $y$ and its derivatives. Can the equation be written as a sum of terms, where each term is a function of $x$ multiplied by $y$ or one of its derivatives (all to power 1)? If yes, linear.
    *   **Autonomy:** What does "autonomous" mean (self-governing)? Does the equation's behavior explicitly depend on the independent variable $x$ itself, or only on the state of $y$ and its changes? If $x$ doesn't explicitly show up, it's autonomous.

## 10. Connections — what this leads to

Understanding ODE classification is not an end in itself; it's a crucial foundational step that unlocks a vast array of techniques and concepts in differential equations and beyond.

1.  **Solution Methods:** The most direct implication is that the method used to solve an ODE is almost entirely dependent on its classification.
    *   **First-order linear ODEs** have general solution techniques (integrating factors).
    *   **First-order nonlinear ODEs** often require specialized methods like separation of variables, exact equations, or substitution techniques (e.g., Bernoulli equations). Many do not have analytical solutions.
    *   **Second-order linear ODEs with constant coefficients** have systematic solution methods involving characteristic equations.
    *   **Higher-order linear ODEs** (especially with variable coefficients) are significantly harder and often require power series methods or numerical approaches.
    *   **Nonlinear ODEs of any order** are notoriously difficult to solve analytically. Their study often focuses on qualitative analysis (phase plane analysis, stability) or numerical methods.

2.  **Existence and Uniqueness Theorems:** For many ODEs, particularly linear ones, there are theorems (like Picard-Lindelöf for first-order ODEs) that guarantee the existence and uniqueness of a solution under certain conditions. These theorems often have stricter requirements for nonlinear ODEs, where solutions may exist but not be unique, or may "blow up" (become infinite) in finite time.

3.  **Numerical Methods:** When analytical solutions are impossible (which is common for nonlinear and higher-order ODEs), classification guides the choice of numerical methods (e.g., Euler's method, Runge-Kutta methods). The stability and accuracy of these methods can depend on the ODE's properties.

4.  **Qualitative Analysis and Dynamical Systems:** For autonomous ODEs, especially systems of first-order ODEs, the independent variable (often time) can be ignored when analyzing the "phase space." This allows for the study of equilibrium points, limit cycles, and chaotic behavior without needing explicit solutions, forming the basis of dynamical systems theory. Non-autonomous systems introduce time-varying dynamics, complicating this analysis.

5.  **Control Theory and Stability Analysis:** In engineering, linear ODEs are much easier to control and analyze for stability than nonlinear ones. Classification helps engineers decide if linearization techniques are appropriate or if more advanced nonlinear control strategies are needed.

6.  **Modeling Limitations:** Recognizing an ODE as nonlinear often implies that superposition (the idea that the sum of solutions is also a solution) does not apply. This is a fundamental difference from linear systems and affects how models are interpreted and combined.

## 11. Self-check questions

1.  Classify the following ODE by its order, degree, linearity, and autonomy:
    $$ \frac{d^3y}{dt^3} + t^2 \frac{dy}{dt} - 5y = \sin(t) $$

2.  Classify the following ODE by its order, degree, linearity, and autonomy:
    $$ (y')^2 + y'' = 0 $$

3.  Classify the following ODE by its order, degree, linearity, and autonomy:
    $$ \frac{d^2y}{dx^2} + \sqrt{y} = x $$

4.  Classify the following ODE by its order, degree, linearity, and autonomy:
    $$ \frac{d}{dx}\left(\frac{dy}{dx}\right) + e^{y'} + y = 0 $$

5.  Consider the ODE $y''' - y \cdot y'' + x^2 = 0$. Explain why it is nonlinear. If the $x^2$ term were replaced by $y^2$, would the classification regarding autonomy change? Justify your answer.