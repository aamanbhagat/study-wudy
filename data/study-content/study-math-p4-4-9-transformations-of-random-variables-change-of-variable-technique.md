## 1. What it is — in plain English

Imagine you have a machine that spits out random numbers, say, how many text messages you get in an hour. This is a "random variable" — a quantity whose value is determined by chance. Now, what if you decide to do something to that random number? For example, what if you take the number of texts and double it, or square it, or convert it into a different unit?

When you apply a mathematical operation (a "transformation") to a random variable, you create a *new* random variable. This new variable will also have its own pattern of randomness, its own probabilities. The "change-of-variable technique" is simply a set of tools and rules that tell us exactly how the original pattern of randomness changes when we apply that mathematical operation.

Think of it like this: you have a bag of marbles of different colors, and you know the probability of picking each color. If you then decide to paint all the red marbles blue, and all the green marbles yellow, you've transformed the "color" variable. The change-of-variable technique helps you figure out the new probabilities for picking blue or yellow marbles in your transformed bag. It's about understanding how the "chances" or "likelihoods" shift when we modify the underlying random quantity.

## 2. Why it matters — real-world applications

Understanding transformations of random variables is fundamental across many scientific and engineering disciplines. Here are a few concrete examples:

1.  **Aerospace Engineering & Control Systems:** Imagine a sensor measuring altitude, which has some inherent random error (noise), perhaps following a Gaussian distribution. If the sensor's output is fed into a non-linear control system (e.g., an amplifier with a saturation curve, or a filter that squares the input), engineers need to know the *new* distribution of the error at the output of that system. This is crucial for predicting system performance, stability, and safety margins. For instance, if the transformed noise becomes heavy-tailed, it could lead to unexpected large errors.

2.  **Machine Learning & Data Science:** Many machine learning algorithms assume that input data follows a certain distribution (e.g., Gaussian for linear regression). If your raw data doesn't fit this assumption, you might apply a transformation (like a logarithm, square root, or Box-Cox transformation) to make it more Gaussian-like. Understanding how these transformations affect the data's probability distribution is essential for correctly applying statistical tests, building accurate models, and interpreting their results. For example, if you transform a feature $X$ to $\log(X)$, the distribution of $\log(X)$ is directly derived using this technique.

3.  **Physics & Engineering (Kinetic Energy):** In thermodynamics or classical mechanics, if the velocity ($V$) of particles in a gas follows a Maxwell-Boltzmann distribution (a specific probability distribution), and you're interested in their kinetic energy ($KE = \frac{1}{2}mV^2$), you're performing a transformation. To understand the distribution of kinetic energies, you must use the change-of-variable technique. This allows physicists to predict properties of gases, such as average energy or the likelihood of particles having very high energies.

4.  **Finance & Economics:** Stock prices are often modeled as following a log-normal distribution. If you want to calculate the distribution of the *returns* on an investment (which is typically a logarithmic transformation of the price ratio, e.g., $\log(P_t/P_{t-1})$), or the distribution of a portfolio's value (which is often a sum or product of individual asset values), you're using transformations. This is vital for risk management, option pricing, and portfolio optimization in companies like Goldman Sachs or BlackRock.

5.  **Reliability Engineering:** When designing components, their lifetime might follow an exponential or Weibull distribution. If the stress on the component is a function of its lifetime (a transformation), or if the component's failure is triggered by a transformed version of an environmental variable, understanding the distribution of the transformed variable helps in predicting product reliability and setting warranty periods.

## 3. Prerequisites — what you must know first

Before diving deep into transformations of random variables, ensure you have a solid grasp of the following concepts:

*   **Set Theory Basics:** Understanding of sets, subsets, unions, intersections, and complements.
*   **Basic Probability Theory:**
    *   **Sample Space ($\Omega$):** The set of all possible outcomes of a random experiment.
    *   **Events:** Subsets of the sample space.
    *   **Probability Measure ($P$):** A function that assigns a probability (a number between 0 and 1) to events.
*   **Random Variables (RVs):**
    *   **Definition:** A function that maps outcomes from the sample space to real numbers.
    *   **Discrete Random Variables:** RVs that can only take on a countable number of values (e.g., number of heads in coin flips).
    *   **Probability Mass Function (PMF):** For discrete RVs, $P_X(x) = P(X=x)$, the probability that $X$ takes a specific value $x$.
    *   **Continuous Random Variables:** RVs that can take on any value within a given range (e.g., height, temperature).
    *   **Probability Density Function (PDF):** For continuous RVs, $f_X(x)$, a function such that the probability of $X$ falling into an interval $[a,b]$ is $\int_a^b f_X(x) dx$. Note that $f_X(x)$ itself is *not* a probability.
*   **Cumulative Distribution Function (CDF):** For *any* random variable (discrete or continuous), $F_X(x) = P(X \le x)$, the probability that $X$ takes a value less than or equal to $x$. This is the most fundamental description of a random variable's distribution.
*   **Calculus I & II:**
    *   **Differentiation:** Especially the chain rule, for finding PDFs from CDFs.
    *   **Integration:** For calculating probabilities from PDFs and understanding the relationship between PDF and CDF.
    *   **Inverse Functions:** Understanding how to find $g^{-1}(y)$ if $y=g(x)$.
    *   **Monotonic Functions:** Functions that are either always increasing or always decreasing.
    *   **Absolute Value:** Its properties and how it affects derivatives.

## 4. The core idea — step by step

The central problem we're addressing is this: we know the probability distribution of a random variable $X$, and we define a new random variable $Y$ as a function of $X$, say $Y = g(X)$. Our goal is to find the probability distribution of $Y$.

### Step 1: Start with the problem statement and the universal approach (the CDF)

**Plain English:** We're given information about $X$'s randomness (its PMF or PDF, and thus its CDF). We've created a new random variable $Y$ by applying some function $g$ to $X$. We want to describe $Y$'s randomness. The most reliable way to do this for *any* type of random variable (discrete or continuous) is to first find its Cumulative Distribution Function (CDF).

**Small concrete example:** Let $X$ be a random variable representing the outcome of a fair coin flip, where $X=0$ for tails and $X=1$ for heads. Its PMF is $P_X(0) = 0.5$, $P_X(1) = 0.5$. Now, let $Y = X^2$. What is $Y$'s distribution?
To start, we'd look for $F_Y(y) = P(Y \le y)$.

**Formal/mathematical version:**
Given the CDF of $X$, $F_X(x)$, or its PMF $P_X(x)$ (for discrete) or PDF $f_X(x)$ (for continuous).
Let $Y = g(X)$ for some function $g$.
The objective is to find $F_Y(y)$, $P_Y(y)$, or $f_Y(y)$.
The universal starting point is:
$$F_Y(y) = P(Y \le y)$$
Substitute $Y=g(X)$:
$$F_Y(y) = P(g(X) \le y)$$

**What could go wrong:** Students might try to jump directly to the PDF formula, which is only applicable for continuous variables and sometimes requires specific conditions on $g$. Starting with the CDF is always safe.

### Step 2: Relate the event $g(X) \le y$ to an event involving $X$

**Plain English:** The expression $P(g(X) \le y)$ means "the probability that our transformed variable $Y$ is less than or equal to some value $y$." To calculate this probability, we need to rephrase this condition in terms of $X$. That is, what values must $X$ take for $g(X)$ to be less than or equal to $y$? This step often involves finding the inverse of $g$.

**Small concrete example:** Continuing with $X \sim U(0,1)$ (uniform distribution between 0 and 1) and $Y = X^2$.
We want $F_Y(y) = P(Y \le y) = P(X^2 \le y)$.
For $y \ge 0$, the inequality $X^2 \le y$ implies $-\sqrt{y} \le X \le \sqrt{y}$.
Since $X$ is defined only on $[0,1]$, we must combine these conditions: $0 \le X \le \sqrt{y}$.
So, $P(X^2 \le y) = P(0 \le X \le \sqrt{y})$.

**Formal/mathematical version:**
We need to solve the inequality $g(x) \le y$ for $x$.
If $g$ is a **strictly increasing** function (e.g., $g(x)=2x+1$, $g(x)=e^x$):
Then $g(X) \le y \iff X \le g^{-1}(y)$.
So, $F_Y(y) = P(X \le g^{-1}(y)) = F_X(g^{-1}(y))$.

If $g$ is a **strictly decreasing** function (e.g., $g(x)=-X$, $g(x)=1/X$ for $X>0$):
Then $g(X) \le y \iff X \ge g^{-1}(y)$. (Note the inequality flip!)
So, $F_Y(y) = P(X \ge g^{-1}(y)) = 1 - P(X < g^{-1}(y))$.
For continuous $X$, $P(X < g^{-1}(y)) = P(X \le g^{-1}(y)) = F_X(g^{-1}(y))$.
So, $F_Y(y) = 1 - F_X(g^{-1}(y))$.

**What could go wrong:**
1.  **Forgetting to flip the inequality sign** when $g$ is a decreasing function. This is a very common mistake.
2.  **Incorrectly finding the inverse function** $g^{-1}(y)$.
3.  **Ignoring the domain of $X$**. The solution for $X$ must be intersected with the original domain of $X$. For example, if $X \in [0,1]$ and $X^2 \le y$ implies $X \in [-\sqrt{y}, \sqrt{y}]$, the actual range for $X$ is $[0, \sqrt{y}]$.

### Step 3: Differentiate the CDF to get the PDF (for continuous variables)

**Plain English:** Once we have the CDF of $Y$, $F_Y(y)$, as a function of $y$, we can find its Probability Density Function (PDF) by simply taking the derivative with respect to $y$. This is the fundamental relationship between CDF and PDF for continuous random variables.

**Small concrete example:** Let's assume we've found $F_Y(y) = F_X(g^{-1}(y))$ for a strictly increasing $g$.
Then $f_Y(y) = \frac{d}{dy} F_Y(y) = \frac{d}{dy} F_X(g^{-1}(y))$.
Using the chain rule, if $u = g^{-1}(y)$, then $\frac{d}{dy} F_X(u) = F_X'(u) \cdot \frac{du}{dy} = f_X(u) \cdot \frac{d}{dy} g^{-1}(y)$.
So, $f_Y(y) = f_X(g^{-1}(y)) \cdot \frac{d}{dy} g^{-1}(y)$.

**Formal/mathematical version:**
For a continuous random variable $Y$, its PDF $f_Y(y)$ is given by:
$$f_Y(y) = \frac{d}{dy} F_Y(y)$$
Applying this to the cases from Step 2:
If $g$ is strictly increasing:
$$f_Y(y) = \frac{d}{dy} F_X(g^{-1}(y)) = f_X(g^{-1}(y)) \cdot \frac{d}{dy} g^{-1}(y)$$
If $g$ is strictly decreasing:
$$f_Y(y) = \frac{d}{dy} [1 - F_X(g^{-1}(y))] = -f_X(g^{-1}(y)) \cdot \frac{d}{dy} g^{-1}(y)$$

**What could go wrong:**
1.  **Forgetting the chain rule.** The derivative of $F_X(g^{-1}(y))$ is not just $f_X(g^{-1}(y))$.
2.  **Incorrectly calculating the derivative of the inverse function** $\frac{d}{dy} g^{-1}(y)$.

### Step 4: The General PDF Formula (Jacobian for univariate case)

**Plain English:** Notice a pattern in Step 3. For an increasing function, we have a positive derivative of the inverse. For a decreasing function, we have a negative derivative, but probability density must always be non-negative. This suggests we need an absolute value. The general formula combines both cases into a single, compact expression. This is often called the "Jacobian" method for univariate transformations.

**Small concrete example:**
If $g(x) = -x$, then $g^{-1}(y) = -y$.
$\frac{d}{dy} g^{-1}(y) = -1$.
From Step 3 (decreasing case), $f_Y(y) = -f_X(-y) \cdot (-1) = f_X(-y)$.
Using the general formula: $f_Y(y) = f_X(g^{-1}(y)) \left| \frac{d}{dy} g^{-1}(y) \right| = f_X(-y) \left| -1 \right| = f_X(-y)$. Both match!

**Formal/mathematical version:**
If $Y = g(X)$ where $g$ is a differentiable and **strictly monotonic** (either strictly increasing or strictly decreasing) function, then the PDF of $Y$ is given by:
$$f_Y(y) = f_X(g^{-1}(y)) \left| \frac{d}{dy} g^{-1}(y) \right|$$
An alternative, often more convenient form, uses the derivative of $g(x)$ with respect to $x$:
Recall that $\frac{d}{dy} g^{-1}(y) = \frac{1}{g'(x)}$ where $x=g^{-1}(y)$.
So, the formula can also be written as:
$$f_Y(y) = f_X(g^{-1}(y)) \left| \frac{1}{g'(g^{-1}(y))} \right|$$
**Important:** The domain of $f_Y(y)$ must be specified, which is the range of $g(X)$ over the domain of $X$.

**What could go wrong:**
1.  **Forgetting the absolute value.** This is the most common and critical error. Probability densities cannot be negative.
2.  **Using the formula when $g$ is *not* strictly monotonic.** This formula only applies to monotonic transformations.

### Step 5: Handling Non-Monotonic Transformations (Continuous Variables)

**Plain English:** What if the function $g(X)$ isn't always increasing or always decreasing? For example, $Y=X^2$. If $X$ can be positive or negative, then both $X=2$ and $X=-2$ map to $Y=4$. In such cases, we can't just find a single inverse $g^{-1}(y)$. Instead, for a given $y$, there might be multiple $x$ values that map to it. We need to sum up the contributions from each of these $x$ values.

**Small concrete example:** Let $X \sim U(-1,1)$ and $Y = X^2$.
We want $F_Y(y) = P(Y \le y) = P(X^2 \le y)$.
For $y \in [0,1]$ (the range of $Y$), $X^2 \le y$ means $-\sqrt{y} \le X \le \sqrt{y}$.
So, $F_Y(y) = P(-\sqrt{y} \le X \le \sqrt{y}) = F_X(\sqrt{y}) - F_X(-\sqrt{y})$.
Now, differentiate this to get $f_Y(y)$:
$f_Y(y) = \frac{d}{dy} [F_X(\sqrt{y}) - F_X(-\sqrt{y})]$
Using the chain rule:
$f_Y(y) = f_X(\sqrt{y}) \cdot \frac{d}{dy}(\sqrt{y}) - f_X(-\sqrt{y}) \cdot \frac{d}{dy}(-\sqrt{y})$
$f_Y(y) = f_X(\sqrt{y}) \cdot \frac{1}{2\sqrt{y}} - f_X(-\sqrt{y}) \cdot \frac{-1}{2\sqrt{y}}$
$f_Y(y) = f_X(\sqrt{y}) \cdot \frac{1}{2\sqrt{y}} + f_X(-\sqrt{y}) \cdot \frac{1}{2\sqrt{y}}$
$f_Y(y) = \left[ f_X(\sqrt{y}) + f_X(-\sqrt{y}) \right] \frac{1}{2\sqrt{y}}$

Notice that $\frac{1}{2\sqrt{y}}$ is $\left| \frac{d}{dy} g_1^{-1}(y) \right|$ where $g_1^{-1}(y) = \sqrt{y}$ and $g_2^{-1}(y) = -\sqrt{y}$.
And $g'(x) = 2x$. So $\left| \frac{1}{g'(x)} \right| = \left| \frac{1}{2x} \right|$.
At $x=\sqrt{y}$, this is $\left| \frac{1}{2\sqrt{y}} \right|$.
At $x=-\sqrt{y}$, this is $\left| \frac{1}{-2\sqrt{y}} \right| = \left| \frac{1}{2\sqrt{y}} \right|$.

**Formal/mathematical version:**
If $Y = g(X)$ and for a given $y$, there are multiple distinct values $x_1, x_2, \ldots, x_k$ such that $y = g(x_i)$ (i.e., $g$ is not monotonic), and $g$ is differentiable at each $x_i$ with $g'(x_i) \ne 0$, then the PDF of $Y$ is:
$$f_Y(y) = \sum_{i=1}^{k} f_X(x_i) \left| \frac{d}{dy} g_i^{-1}(y) \right|$$
where $g_i^{-1}(y)$ refers to the $i$-th inverse branch of $g(x)$ that yields $x_i$, or equivalently:
$$f_Y(y) = \sum_{i=1}^{k} f_X(x_i) \left| \frac{1}{g'(x_i)} \right|$$
where $x_i$ are the solutions to $g(x)=y$.

**What could go wrong:**
1.  **Missing some of the inverse branches (roots).** Forgetting that $X^2=y$ has two solutions, $\sqrt{y}$ and $-\sqrt{y}$.
2.  **Not summing the contributions.** Each branch adds to the total probability density.
3.  **Incorrectly defining the domain of $Y$.** The range of $Y=g(X)$ must be carefully determined based on the domain of $X$.

### Step 6: Transformations for Discrete Random Variables

**Plain English:** For discrete random variables, the process is much simpler. We don't use PDFs or derivatives. Instead, we directly calculate the probability mass function (PMF) for $Y$. For each possible value $y$ that $Y$ can take, we find all the $x$ values such that $g(x)=y$, and then sum their probabilities.

**Small concrete example:** Let $X$ be the number of heads in two coin flips, so $X \in \{0,1,2\}$ with $P_X(0)=0.25, P_X(1)=0.5, P_X(2)=0.25$.
Let $Y = (X-1)^2$.
Possible values for $Y$:
If $X=0$, $Y=(0-1)^2 = 1$.
If $X=1$, $Y=(1-1)^2 = 0$.
If $X=2$, $Y=(2-1)^2 = 1$.
So, $Y$ can take values $0$ or $1$.
$P_Y(0) = P(Y=0) = P(X=1) = 0.5$.
$P_Y(1) = P(Y=1) = P(X=0 \text{ or } X=2) = P(X=0) + P(X=2) = 0.25 + 0.25 = 0.5$.
The PMF for $Y$ is $P_Y(0)=0.5, P_Y(1)=0.5$.

**Formal/mathematical version:**
If $X$ is a discrete random variable with PMF $P_X(x)$, and $Y = g(X)$, then the PMF of $Y$ is:
$$P_Y(y) = \sum_{x: g(x)=y} P_X(x)$$
The sum is over all values of $x$ in the support of $X$ such that $g(x)$ equals the specific value $y$.

**What could go wrong:**
1.  **Forgetting to sum probabilities** when multiple $x$ values map to the same $y$ value.
2.  **Incorrectly identifying the support of $Y$.** List all possible values $Y$ can take.

## 5. Worked examples — multiple, with every step shown

### Example 1: Easy - Monotonic, Continuous (CDF Method & PDF Formula)

**Problem:** Let $X$ be a continuous random variable with PDF $f_X(x) = 2x$ for $0 < x < 1$, and $0$ otherwise. Let $Y = 3X+2$. Find the PDF of $Y$, $f_Y(y)$.

**Given:** $f_X(x) = 2x$ for $0 < x < 1$.
**Wanted:** $f_Y(y)$.

**Method 1: Using the CDF approach**

1.  **Find the CDF of $X$, $F_X(x)$:**
    For $x \le 0$, $F_X(x) = \int_{-\infty}^x 0 \, dt = 0$.
    For $0 < x < 1$, $F_X(x) = \int_{0}^x 2t \, dt = [t^2]_0^x = x^2$.
    For $x \ge 1$, $F_X(x) = \int_{0}^1 2t \, dt + \int_{1}^x 0 \, dt = 1^2 = 1$.
    *Explanation:* The CDF is the integral of the PDF. We integrate $f_X(t)$ from $-\infty$ up to $x$, being careful with the piecewise definition of $f_X(x)$.

2.  **Find the CDF of $Y$, $F_Y(y)$:**
    We know $Y = 3X+2$. So, $F_Y(y) = P(Y \le y) = P(3X+2 \le y)$.
    Solve for $X$: $3X \le y-2 \implies X \le \frac{y-2}{3}$.
    So, $F_Y(y) = P(X \le \frac{y-2}{3}) = F_X\left(\frac{y-2}{3}\right)$.
    *Explanation:* We substitute the transformation into the CDF definition and solve the inequality for $X$ to express $P(Y \le y)$ in terms of $P(X \le \text{something})$.

3.  **Determine the support of $Y$:**
    Since $0 < X < 1$:
    $3(0)+2 < Y < 3(1)+2$
    $2 < Y < 5$.
    *Explanation:* The range of $Y$ is determined by applying the transformation $g(x)$ to the minimum and maximum values of $X$'s domain.

4.  **Substitute $F_X(x)$ into $F_Y(y)$ for the relevant domain:**
    For $2 < y < 5$, we use $F_X(x) = x^2$ with $x = \frac{y-2}{3}$.
    $F_Y(y) = \left(\frac{y-2}{3}\right)^2 = \frac{(y-2)^2}{9}$.
    *Explanation:* We plug the expression for $X$ in terms of $Y$ into the CDF of $X$. We must ensure that the value $\frac{y-2}{3}$ falls within the range $[0,1]$ for $F_X(x)=x^2$ to be applicable, which it does for $y \in (2,5)$.
    For $y \le 2$, $F_Y(y) = 0$.
    For $y \ge 5$, $F_Y(y) = 1$.

5.  **Differentiate $F_Y(y)$ to find $f_Y(y)$:**
    For $2 < y < 5$:
    $f_Y(y) = \frac{d}{dy} \left( \frac{(y-2)^2}{9} \right) = \frac{1}{9} \cdot 2(y-2) \cdot 1 = \frac{2(y-2)}{9}$.
    *Explanation:* The PDF is the derivative of the CDF. We apply the chain rule.

6.  **State the final PDF:**
    $$f_Y(y) = \begin{cases} \frac{2(y-2)}{9} & \text{for } 2 < y < 5 \\ 0 & \text{otherwise} \end{cases}$$
    *Explanation:* Combine the piecewise definitions.

**Method 2: Using the PDF formula**

1.  **Identify $g(X)$, $g^{-1}(Y)$, and their derivatives:**
    $Y = g(X) = 3X+2$.
    Solve for $X$: $X = \frac{Y-2}{3}$. So, $g^{-1}(Y) = \frac{Y-2}{3}$.
    *Explanation:* Find the inverse function of the transformation.

2.  **Calculate the derivative of the inverse function:**
    $\frac{d}{dy} g^{-1}(Y) = \frac{d}{dy} \left(\frac{Y-2}{3}\right) = \frac{1}{3}$.
    *Explanation:* Differentiate the inverse function with respect to $Y$.

3.  **Determine the support of $Y$:**
    As before, $0 < X < 1 \implies 2 < Y < 5$.
    *Explanation:* Determine the range of the new random variable.

4.  **Apply the PDF formula:** $f_Y(y) = f_X(g^{-1}(y)) \left| \frac{d}{dy} g^{-1}(y) \right|$.
    Substitute $g^{-1}(y) = \frac{y-2}{3}$ into $f_X(x) = 2x$:
    $f_X\left(g^{-1}(y)\right) = f_X\left(\frac{y-2}{3}\right) = 2\left(\frac{y-2}{3}\right)$.
    Now, multiply by the absolute derivative:
    $f_Y(y) = 2\left(\frac{y-2}{3}\right) \cdot \left| \frac{1}{3} \right| = \frac{2(y-2)}{3} \cdot \frac{1}{3} = \frac{2(y-2)}{9}$.
    This is valid for $2 < y < 5$.
    *Explanation:* Plug the inverse function into $f_X(x)$ and multiply by the absolute value of the derivative of the inverse function.

5.  **State the final PDF:**
    $$f_Y(y) = \begin{cases} \frac{2(y-2)}{9} & \text{for } 2 < y < 5 \\ 0 & \text{otherwise} \end{cases}$$

**Reflection:** This example was straightforward because $g(X)$ was strictly increasing, so both methods yielded the same result without complications. The CDF method is more fundamental, while the PDF formula is a shortcut for monotonic transformations.

### Example 2: Medium - Monotonic, Continuous, Non-uniform

**Problem:** Let $X$ be an exponential random variable with PDF $f_X(x) = e^{-x}$ for $x > 0$, and $0$ otherwise. Let $Y = \sqrt{X}$. Find the PDF of $Y$, $f_Y(y)$.

**Given:** $f_X(x) = e^{-x}$ for $x > 0$.
**Wanted:** $f_Y(y)$.

**Method: Using the PDF formula (since $g(X)=\sqrt{X}$ is monotonic for $X>0$)**

1.  **Identify $g(X)$, $g^{-1}(Y)$, and their derivatives:**
    $Y = g(X) = \sqrt{X}$.
    To find the inverse, square both sides: $Y^2 = X$. So, $g^{-1}(Y) = Y^2$.
    *Explanation:* The transformation is $Y=\sqrt{X}$. We need to express $X$ in terms of $Y$.

2.  **Calculate the derivative of the inverse function:**
    $\frac{d}{dy} g^{-1}(Y) = \frac{d}{dy} (Y^2) = 2Y$.
    *Explanation:* Differentiate $X=Y^2$ with respect to $Y$.

3.  **Determine the support of $Y$:**
    Since $X > 0$, $Y = \sqrt{X}$ must also be positive. So, $Y > 0$.
    *Explanation:* The domain of $X$ ($X>0$) dictates the domain of $Y$.

4.  **Apply the PDF formula:** $f_Y(y) = f_X(g^{-1}(y)) \left| \frac{d}{dy} g^{-1}(y) \right|$.
    Substitute $g^{-1}(y) = Y^2$ into $f_X(x) = e^{-x}$:
    $f_X(g^{-1}(y)) = f_X(Y^2) = e^{-Y^2}$.
    Now, multiply by the absolute derivative:
    $f_Y(y) = e^{-Y^2} \cdot |2Y|$.
    Since $Y > 0$, $|2Y| = 2Y$.
    So, $f_Y(y) = 2Y e^{-Y^2}$.
    This is valid for $Y > 0$.
    *Explanation:* Plug $X$ (in terms of $Y$) into $f_X(x)$ and multiply by the absolute value of the derivative of $X$ with respect to $Y$.

5.  **State the final PDF:**
    $$f_Y(y) = \begin{cases} 2y e^{-y^2} & \text{for } y > 0 \\ 0 & \text{otherwise} \end{cases}$$

**Reflection:** This example demonstrates the use of the PDF formula for a non-linear but monotonic transformation. It's crucial to correctly identify the inverse function and its derivative, and to pay attention to the domain of the new variable. This resulting distribution is known as the Rayleigh distribution.

### Example 3: Hard - Non-monotonic, Continuous

**Problem:** Let $X$ be a standard normal random variable with PDF $f_X(x) = \frac{1}{\sqrt{2\pi}} e^{-x^2/2}$ for $-\infty < x < \infty$. Let $Y = X^2$. Find the PDF of $Y$, $f_Y(y)$.

**Given:** $f_X(x) = \frac{1}{\sqrt{2\pi}} e^{-x^2/2}$ for $x \in \mathbb{R}$.
**Wanted:** $f_Y(y)$.

**Method: Using the general PDF formula for non-monotonic functions**

1.  **Identify $g(X)$ and determine its monotonicity:**
    $Y = g(X) = X^2$.
    This function is not monotonic over $X \in \mathbb{R}$. For a given $y > 0$, there are two values of $x$ such that $X^2=y$: $x_1 = \sqrt{y}$ and $x_2 = -\sqrt{y}$.
    *Explanation:* Recognize that the transformation is non-monotonic, meaning multiple $X$ values map to the same $Y$ value.

2.  **Determine the support of $Y$:**
    Since $Y = X^2$, and $X$ can be any real number, $Y$ must be non-negative. So, $Y > 0$.
    *Explanation:* The range of $Y$ is the square of the range of $X$.

3.  **Find the inverse branches and their derivatives:**
    For $y > 0$, the solutions to $y=x^2$ are $x_1 = \sqrt{y}$ and $x_2 = -\sqrt{y}$.
    Let $g_1^{-1}(y) = \sqrt{y}$ and $g_2^{-1}(y) = -\sqrt{y}$.
    Derivatives:
    $\frac{d}{dy} g_1^{-1}(y) = \frac{d}{dy}(\sqrt{y}) = \frac{1}{2\sqrt{y}}$.
    $\frac{d}{dy} g_2^{-1}(y) = \frac{d}{dy}(-\sqrt{y}) = -\frac{1}{2\sqrt{y}}$.
    *Explanation:* Identify each inverse function (branch) and compute its derivative with respect to $Y$.

4.  **Apply the general PDF formula:** $f_Y(y) = \sum_{i=1}^{k} f_X(x_i) \left| \frac{d}{dy} g_i^{-1}(y) \right|$.
    Here $k=2$.
    $f_Y(y) = f_X(\sqrt{y}) \left| \frac{1}{2\sqrt{y}} \right| + f_X(-\sqrt{y}) \left| -\frac{1}{2\sqrt{y}} \right|$.
    Since $y > 0$, $\frac{1}{2\sqrt{y}}$ is positive.
    $f_Y(y) = f_X(\sqrt{y}) \frac{1}{2\sqrt{y}} + f_X(-\sqrt{y}) \frac{1}{2\sqrt{y}}$.
    *Explanation:* Sum the contributions from each branch, remembering the absolute value.

5.  **Substitute $f_X(x)$:**
    $f_X(\sqrt{y}) = \frac{1}{\sqrt{2\pi}} e^{-(\sqrt{y})^2/2} = \frac{1}{\sqrt{2\pi}} e^{-y/2}$.
    $f_X(-\sqrt{y}) = \frac{1}{\sqrt{2\pi}} e^{-(-\sqrt{y})^2/2} = \frac{1}{\sqrt{2\pi}} e^{-y/2}$.
    *Explanation:* Substitute the $x$ values (in terms of $y$) into the original PDF $f_X(x)$.

6.  **Combine terms:**
    $f_Y(y) = \frac{1}{\sqrt{2\pi}} e^{-y/2} \cdot \frac{1}{2\sqrt{y}} + \frac{1}{\sqrt{2\pi}} e^{-y/2} \cdot \frac{1}{2\sqrt{y}}$
    $f_Y(y) = 2 \cdot \frac{1}{\sqrt{2\pi}} e^{-y/2} \cdot \frac{1}{2\sqrt{y}}$
    $f_Y(y) = \frac{1}{\sqrt{2\pi y}} e^{-y/2}$.
    This is valid for $y > 0$.

7.  **State the final PDF:**
    $$f_Y(y) = \begin{cases} \frac{1}{\sqrt{2\pi y}} e^{-y/2} & \text{for } y > 0 \\ 0 & \text{otherwise} \end{cases}$$
    *Explanation:* Combine the results and specify the domain. This is the PDF of a Chi-squared distribution with 1 degree of freedom.

**Reflection:** This example highlights the importance of correctly handling non-monotonic transformations. The key is to identify all $x$ values that map to a given $y$ and sum their contributions, each weighted by the absolute value of the derivative of its inverse branch. Forgetting the second branch ($-\sqrt{y}$) or the absolute value would lead to an incorrect result.

### Example 4: Discrete Random Variable

**Problem:** Let $X$ be a discrete random variable with PMF $P_X(x)$ given by:
$P_X(-1) = 0.2$
$P_X(0) = 0.3$
$P_X(1) = 0.4$
$P_X(2) = 0.1$
Let $Y = X^2$. Find the PMF of $Y$, $P_Y(y)$.

**Given:** $P_X(x)$ for $x \in \{-1, 0, 1, 2\}$.
**Wanted:** $P_Y(y)$.

**Method: Direct calculation of PMF**

1.  **Determine the possible values for $Y$:**
    Apply the transformation $Y=X^2$ to each possible value of $X$:
    If $X=-1$, $Y=(-1)^2 = 1$.
    If $X=0$, $Y=(0)^2 = 0$.
    If $X=1$, $Y=(1)^2 = 1$.
    If $X=2$, $Y=(2)^2 = 4$.
    So, the possible values for $Y$ are $\{0, 1, 4\}$.
    *Explanation:* List all possible outcomes for $Y$ by applying the transformation to each outcome of $X$.

2.  **Calculate $P_Y(y)$ for each possible value of $Y$:**
    *   For $y=0$:
        $P_Y(0) = P(Y=0) = P(X^2=0)$.
        The only $X$ value for which $X^2=0$ is $X=0$.
        So, $P_Y(0) = P_X(0) = 0.3$.
        *Explanation:* Find all $X$ values that map to $Y=0$ and sum their probabilities.

    *   For $y=1$:
        $P_Y(1) = P(Y=1) = P(X^2=1)$.
        The $X$ values for which $X^2=1$ are $X=-1$ and $X=1$.
        So, $P_Y(1) = P_X(-1) + P_X(1) = 0.2 + 0.4 = 0.6$.
        *Explanation:* Find all $X$ values that map to $Y=1$ and sum their probabilities.

    *   For $y=4$:
        $P_Y(4) = P(Y=4) = P(X^2=4)$.
        The only $X$ value for which $X^2=4$ is $X=2$.
        So, $P_Y(4) = P_X(2) = 0.1$.
        *Explanation:* Find all $X$ values that map to $Y=4$ and sum their probabilities.

3.  **State the final PMF:**
    $$P_Y(y) = \begin{cases} 0.3 & \text{for } y=0 \\ 0.6 & \text{for } y=1 \\ 0.1 & \text{for } y=4 \\ 0 & \text{otherwise} \end{cases}$$
    *Self-check:* The probabilities sum to $0.3 + 0.6 + 0.1 = 1.0$.

**Reflection:** This example demonstrates the simplicity of discrete transformations. The key is to correctly identify all $X$ values that map to a given $Y$ value and sum their corresponding probabilities. The non-monotonic nature of $Y=X^2$ is handled naturally by this summation process.

## 6. Common mistakes and traps

1.  **Forgetting the Absolute Value in the PDF Formula:** The most frequent and critical error. Probability density functions must always be non-negative. If $g'(x)$ is negative, $\frac{d}{dy} g^{-1}(y)$ will also be negative, and forgetting the absolute value will lead to a negative PDF, which is impossible.
2.  **Incorrectly Handling the Domain/Support:**
    *   **For $X$:** Not restricting $X$ to its original domain when solving $g(X) \le y$.
    *   **For $Y$:** Not correctly determining the new range (support) of $Y$ based on the domain of $X$ and the function $g$. This can lead to a PDF that is non-zero outside its valid range or zero inside its valid range.
3.  **Misapplying the Inverse Function for Non-Monotonic $g$:** Using the simple $f_Y(y) = f_X(g^{-1}(y)) \left| \frac{d}{dy} g^{-1}(y) \right|$ formula when $g(X)$ is not strictly monotonic. This will miss contributions from other branches (e.g., for $Y=X^2$, ignoring the negative root).
4.  **Forgetting the Chain Rule:** When using the CDF method and differentiating $F_X(g^{-1}(y))$ with respect to $y$, students sometimes forget to multiply by $\frac{d}{dy} g^{-1}(y)$.
5.  **Confusing Discrete and Continuous Methods:** Attempting to use differentiation for discrete variables, or summation for continuous variables. The methods are distinct.
6.  **Errors in Algebraic Manipulation:** Incorrectly solving $g(X) \le y$ for $X$, finding $g^{-1}(y)$, or calculating derivatives.
7.  **Not Checking if the Resulting PDF Integrates to 1:** For continuous distributions, a quick check that $\int_{-\infty}^\infty f_Y(y) dy = 1$ can catch many errors.

## 7. Textbook-precise explanation

Let $X$ be a random variable defined on a probability space $(\Omega, \mathcal{F}, P)$. Let $g: \mathbb{R} \to \mathbb{R}$ be a measurable function. We define a new random variable $Y = g(X)$. Our goal is to determine the probability distribution of $Y$.

**Case 1: Discrete Random Variables**
If $X$ is a discrete random variable with Probability Mass Function (PMF) $P_X(x)$, the PMF of $Y=g(X)$ is given by:
$$P_Y(y) = P(Y=y) = P(g(X)=y) = \sum_{x \in \{x_i : g(x_i)=y\}} P_X(x_i)$$
The sum is taken over all values $x_i$ in the support of $X$ such that $g(x_i)$ equals $y$.

**Case 2: Continuous Random Variables (General Approach via CDF)**
If $X$ is a continuous random variable with Cumulative Distribution Function (CDF) $F_X(x)$, the CDF of $Y=g(X)$ is found by:
$$F_Y(y) = P(Y \le y) = P(g(X) \le y)$$
The event $\{g(X) \le y\}$ must be re-expressed in terms of $X$. Once $F_Y(y)$ is found, the Probability Density Function (PDF) $f_Y(y)$ can be obtained by differentiation, provided $F_Y(y)$ is differentiable:
$$f_Y(y) = \frac{d}{dy} F_Y(y)$$

**Case 3: Continuous Random Variables (PDF Formula for Monotonic Transformations)**
Let $X$ be a continuous random variable with PDF $f_X(x)$. Let $Y = g(X)$, where $g$ is a differentiable and strictly monotonic function (either strictly increasing or strictly decreasing) with a non-zero derivative $g'(x) \ne 0$ for all $x$ in the support of $X$. Then $g$ has a unique inverse function $x = g^{-1}(y)$. The PDF of $Y$ is given by:
$$f_Y(y) = f_X(g^{-1}(y)) \left| \frac{d}{dy} g^{-1}(y) \right|$$
Alternatively, using the property $\frac{d}{dy} g^{-1}(y) = \frac{1}{g'(x)}$ where $x=g^{-1}(y)$:
$$f_Y(y) = f_X(g^{-1}(y)) \left| \frac{1}{g'(g^{-1}(y))} \right|$$
The support of $Y$ is the range of $g(X)$ over the support of $X$.

**Case 4: Continuous Random Variables (PDF Formula for Non-Monotonic Transformations)**
If $Y = g(X)$ where $g$ is a differentiable function that is not strictly monotonic, then for a given $y$, there may be multiple distinct values $x_1, x_2, \ldots, x_k$ such that $y = g(x_i)$. Assume $g'(x_i) \ne 0$ for each $x_i$. Then the PDF of $Y$ is given by:
$$f_Y(y) = \sum_{i=1}^{k} f_X(x_i) \left| \frac{d}{dy} g_i^{-1}(y) \right|$$
where $g_i^{-1}(y)$ denotes the $i$-th inverse branch of $g(x)$ corresponding to $x_i$, or equivalently:
$$f_Y(y) = \sum_{i=1}^{k} f_X(x_i) \left| \frac{1}{g'(x_i)} \right|$$
where $x_i$ are the solutions to $g(x)=y$. The support of $Y$ is the range of $g(X)$ over the support of $X$.

**References:**
*   **Casella, G., & Berger, R. L. (2002). *Statistical Inference* (2nd ed., Chapter 2). Duxbury Advanced Series.** This textbook provides a rigorous treatment of univariate transformations of random variables.
*   **Wasserman, L. (2004). *All of Statistics: A Concise Course in Statistical Inference* (Chapter 2). Springer.** Offers a more concise yet clear explanation.

## 8. ASCII diagrams

Let's visualize how probability density transforms when a random variable $X$ is mapped to $Y=g(X)$. Imagine probability mass as a fluid distributed along the x-axis according to $f_X(x)$. When we apply $g(X)$, this fluid is "moved" to the y-axis.

Consider a small interval $[x, x+dx]$ on the X-axis. The probability mass in this interval is approximately $f_X(x) dx$.
This interval maps to $[g(x), g(x+dx)]$ on the Y-axis. Let $y = g(x)$, then $g(x+dx) \approx g(x) + g'(x)dx = y + dy$.
So the interval on the Y-axis is approximately $[y, y+dy]$, where $dy = g'(x)dx$.
The probability mass in this Y-interval is approximately $f_Y(y) dy$.

Since probability mass is conserved, $f_X(x) dx \approx f_Y(y) dy$.
This implies $f_Y(y) \approx f_X(x) \frac{dx}{dy}$.
And since $dx/dy = 1/(dy/dx) = 1/g'(x)$, we get $f_Y(y) = f_X(x) \left| \frac{1}{g'(x)} \right|$.
Replacing $x$ with $g^{-1}(y)$ gives the formula. The absolute value is crucial because $g'(x)$ can be negative, but density must be positive.

```text
  Visualizing Probability Mass Transformation

  X-Axis (Domain of X):
  ---------------------------------------------------> X
  [  . . . . . . . . . . . . . . . . . . . . . . . ]  <-- f_X(x) (density of probability mass)
  ^  ^                                               ^
  |  |                                               |
  x  x+dx                                            X_max
  (small interval on X, contains f_X(x)dx mass)


  Transformation: Y = g(X)
  - If g(X) "stretches" the X-axis (g'(x) > 1 or g'(x) < -1),
    the probability mass spreads out, so f_Y(y) becomes lower.
    The interval dx maps to a larger dy.  |dy/dx| > 1 => |dx/dy| < 1.

  - If g(X) "compresses" the X-axis (g'(x) is between -1 and 1, excluding 0),
    the probability mass concentrates, so f_Y(y) becomes higher.
    The interval dx maps to a smaller dy. |dy/dx| < 1 => |dx/dy| > 1.


  Example: Y = 2X (stretching)
  ---------------------------------------------------> X
  [ . . . . . . . . . . . . . . . . . . . . . . . ]  (f_X(x) is high)

  ---------------------------------------------------> Y
  [   .   .   .   .   .   .   .   .   .   .   .   ]  (f_Y(y) is lower, mass spread out)
    y   y+dy
    (dy is twice dx, so f_Y(y) is half f_X(x))
    f_Y(y) = f_X(y/2) * |1/2|

  Example: Y = X/2 (compressing)
  ---------------------------------------------------> X
  [   .   .   .   .   .   .   .   .   .   .   .   ]  (f_X(x) is lower)

  ---------------------------------------------------> Y
  [ . . . . . . . . . . . . . . . . . . . . . . . ]  (f_Y(y) is higher, mass concentrated)
    y y+dy
    (dy is half dx, so f_Y(y) is twice f_X(x))
    f_Y(y) = f_X(2y) * |2|

  The factor |d(g^-1(y))/dy| (or |1/g'(x)|) quantifies this stretching/compression.
  It's the ratio of the length of the X-interval to the length of the Y-interval.
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Imagine a "Probability Press." You feed in a random variable $X$ with its density $f_X(x)$. The transformation $Y=g(X)$ is like a machine that squishes or stretches this density.
    *   **"CDF First"**: If you're stuck, always start by defining $F_Y(y) = P(g(X) \le y)$. This is the most robust path.
    *   **"Inverse and Derivative"**: To figure out the squishing/stretching factor, you need to know how $X$ changes for a small change in $Y$. That's $dX/dY$, which is the derivative of $X=g^{-1}(Y)$ with respect to $Y$.
    *   **"Absolute Value is Vital"**: Probability density is always positive. The squishing/stretching factor can be negative if $g(X)$ is decreasing, but the density cannot. So, always take the absolute value of the derivative.
    *   **"Sum for Splits"**: If the "Probability Press" has multiple paths (non-monotonic $g$), sum up the squishing/stretching from each path.

    **Mnemonic:** "**C**an **D**o **F**ine, then **I**nverse **D**erivative **A**lways **S**um for **S**plits." (CDF, Inverse Derivative, Absolute Value, Sum for Splits).

2.  **Formulas/Facts to Overlearn:**
    *   **The Universal CDF Start:** $F_Y(y) = P(Y \le y) = P(g(X) \le y)$. This is your fallback for any transformation.
    *   **PDF Formula (Monotonic, Continuous):** $f_Y(y) = f_X(g^{-1}(y)) \left| \frac{d}{dy} g^{-1}(y) \right|$. This is the workhorse for most continuous transformations.
    *   **PMF Formula (Discrete):** $P_Y(y) = \sum_{x: g(x)=y} P_X(x)$. Simple and direct for discrete variables.

3.  **Spaced-Repetition Schedule:**
    *   **1 day:** Review the core ideas and worked examples. Try to re-derive the PDF formula.
    *   **3 days:** Attempt a new set of practice problems (one monotonic, one non-monotonic continuous, one discrete).
    *   **7 days:** Explain the concept in your own words to an imaginary student. Focus on common pitfalls.
    *   **16 days:** Re-derive the general PDF formula (for non-monotonic functions) from the CDF principle.
    *   **35 days:** Pick a complex transformation from a textbook and work it out from first principles.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the PDF formula for continuous variables, you can always rebuild it:
    1.  **Start with the definition of the CDF of $Y$:** $F_Y(y) = P(Y \le y)$.
    2.  **Substitute $Y=g(X)$:** $F_Y(y) = P(g(X) \le y)$.
    3.  **Solve the inequality $g(X) \le y$ for $X$**:
        *   If $g$ is strictly increasing: $X \le g^{-1}(y)$. So $F_Y(y) = P(X \le g^{-1}(y)) = F_X(g^{-1}(y))$.
        *   If $g$ is strictly decreasing: $X \ge g^{-1}(y)$. So $F_Y(y) = P(X \ge g^{-1}(y)) = 1 - F_X(g^{-1}(y))$.
        *   If $g$ is non-monotonic: Split the domain of $X$ into monotonic regions and sum the probabilities. For example, for $Y=X^2$, $P(X^2 \le y) = P(-\sqrt{y} \le X \le \sqrt{y}) = F_X(\sqrt{y}) - F_X(-\sqrt{y})$.
    4.  **Differentiate $F_Y(y)$ with respect to $y$ to get $f_Y(y)$:**
        *   For $F_X(g^{-1}(y))$, apply the chain rule: $f_X(g^{-1}(y)) \cdot \frac{d}{dy} g^{-1}(y)$.
        *   For $1 - F_X(g^{-1}(y))$, apply the chain rule: $-f_X(g^{-1}(y)) \cdot \frac{d}{dy} g^{-1}(y)$.
        *   Notice that the derivative of $g^{-1}(y)$ is negative for decreasing $g$. The absolute value combines these cases.
        *   For non-monotonic cases, differentiate each term