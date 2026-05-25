## 1. What it is — in plain English

Imagine you're trying to describe something random that can take on *any* value within a range, not just specific, countable numbers. Like the exact height of a randomly chosen person, which could be 175.321 cm, or 175.322 cm, or anything in between. Or the precise time a bus arrives, which isn't just 9:00 or 9:01, but could be 9:00:30.5 seconds. These are "continuous random variables."

Since there are infinitely many possible values (even between 175 cm and 176 cm, there are endless decimal possibilities), we can't talk about the "probability" of a person being *exactly* 175.321 cm tall. That probability would be practically zero. Instead, we talk about the *likelihood* of the height falling within a certain *range*, like between 175 cm and 176 cm.

To do this, we use two main tools: the **Probability Density Function (PDF)** and the **Cumulative Distribution Function (CDF)**. Think of the PDF as a "likelihood map" that shows where the values are more concentrated or "dense." Where the map is higher, values are more likely to occur. The CDF, on the other hand, is like a "running total" of likelihoods. It tells you the total chance that the random variable will be less than or equal to a specific value.

Finally, **percentiles** are just specific points on this "running total." For example, the 90th percentile for heights means that 90% of people are shorter than or equal to that height, and 10% are taller. It's a way to mark specific cut-off points in our distribution.

## 2. Why it matters — real-world applications

Understanding continuous random variables, PDFs, CDFs, and percentiles is absolutely fundamental across many scientific, engineering, and business disciplines. Here are a few concrete examples:

1.  **Aerospace Engineering & Reliability:** When designing an aircraft, engineers need to know the lifespan of critical components like turbine blades or structural elements. The "Time To Failure" for such a component is a continuous random variable.
    *   A **PDF** for component failure time allows engineers to estimate the probability that a part will fail within a specific operational window (e.g., between 5,000 and 10,000 flight hours).
    *   The **CDF** helps determine the probability that a component will fail *by* a certain time, which is crucial for setting maintenance schedules and replacement intervals to ensure safety. For example, if the 99th percentile of failure time is 20,000 hours, it means there's a 1% chance a component will fail before 20,000 hours, informing safety margins.

2.  **Machine Learning & Artificial Intelligence:** Many machine learning models deal with continuous data (e.g., image pixel intensities, sensor readings, financial market values).
    *   **PDFs** are used to model the underlying distribution of data. For instance, in generative models (like Generative Adversarial Networks or Variational Autoencoders), the goal is often to learn the PDF of the training data to generate new, similar data points. Gaussian (Normal) PDFs are used to model noise in sensor readings or uncertainty in predictions.
    *   **CDFs** are implicitly used in ranking and quantile regression, where we want to predict specific percentiles of an outcome rather than just the mean. Understanding the full distribution via PDF/CDF allows for robust uncertainty quantification, providing not just a prediction but also a range of plausible values.

3.  **Physics & Quantum Mechanics:** In quantum mechanics, the position or momentum of a particle cannot be known with absolute certainty; instead, they are described by probability distributions.
    *   The "wave function" $\Psi(x,t)$ for a particle, when squared ($|\Psi(x,t)|^2$), gives a **Probability Density Function (PDF)** for finding the particle at a specific position $x$ at time $t$. This means we can only talk about the probability of finding a particle within a certain region of space.
    *   The **CDF** derived from this PDF would give the probability of finding the particle at or to the left of a certain position. This probabilistic interpretation is a cornerstone of quantum theory.

4.  **Finance & Risk Management:** Financial markets involve continuous variables like stock prices, interest rates, and currency exchange rates.
    *   **PDFs** are used to model the distribution of asset returns. For example, the Black-Scholes model for option pricing assumes that asset prices follow a log-normal distribution, whose PDF describes the likelihood of different price levels.
    *   **CDFs** and **percentiles** are critical for risk management. Value-at-Risk (VaR), a common risk metric, is essentially a percentile. For instance, a 95% VaR of -$1 million means there's a 5% chance of losing $1 million or more over a specified period. This helps financial institutions quantify and manage potential losses.

## 3. Prerequisites — what you must know first

Before diving deep into continuous random variables, ensure you have a solid grasp of these foundational concepts:

*   **Basic Probability Theory:**
    *   **Sample Space:** The set of all possible outcomes of a random experiment.
    *   **Events:** Subsets of the sample space for which we can assign probabilities.
    *   **Probability Axioms:** The fundamental rules probabilities must follow (e.g., probabilities are non-negative, the probability of the entire sample space is 1).
*   **Discrete Random Variables:**
    *   **Definition:** A variable whose possible values are countable (e.g., number of heads in coin flips, number of cars passing a point).
    *   **Probability Mass Function (PMF):** A function that gives the probability that a discrete random variable is exactly equal to some value.
    *   **Expected Value and Variance:** How to calculate the average outcome and spread for discrete variables.
*   **Set Theory Basics:**
    *   **Union ($\cup$), Intersection ($\cap$), Complement ($^c$):** How to combine and manipulate sets of outcomes.
    *   **Subsets:** Understanding relationships between sets.
*   **Calculus I (Single Variable Calculus):** This is absolutely crucial.
    *   **Functions:** Understanding domain, range, graphing, and properties of various function types.
    *   **Limits:** The concept of approaching a value, essential for understanding continuity and the definitions of derivatives and integrals.
    *   **Derivatives:** The rate of change of a function. You need to be comfortable calculating derivatives of common functions.
    *   **Integrals (Definite and Indefinite):**
        *   **Antiderivatives:** The reverse of differentiation.
        *   **Definite Integrals:** Calculating the area under a curve between two points. This is *the* core tool for finding probabilities with continuous random variables.
        *   **Fundamental Theorem of Calculus:** The critical link between differentiation and integration, stating that differentiation and integration are inverse operations. This theorem directly connects PDFs and CDFs.
    *   **Properties of Integrals:** Linearity, additivity, etc.
*   **Basic Algebra:** Solving equations, inequalities, manipulating expressions.

If any of these concepts feel unfamiliar or shaky, it's highly recommended to review them before proceeding. A strong calculus foundation, particularly with integration, is non-negotiable for this topic.

## 4. The core idea — step by step

Let's break down the concepts of continuous random variables, PDF, CDF, and percentiles piece by piece, building intuition along the way.

### Step 1: What is a Continuous Random Variable?

*   **Plain English Statement:** A continuous random variable is a number whose value comes from a random process, and it can take *any* value within a certain range or interval. Think of measurements like height, weight, temperature, time, or distance. These aren't restricted to specific, separate numbers; they can be decimals, fractions, or irrational numbers.

*   **Small Concrete Example:** Imagine you're measuring the exact time (in minutes) a customer spends waiting in a queue at a bank. This time could be 2.5 minutes, 3.14159 minutes, 0.001 minutes, or any value within a reasonable interval (e.g., from 0 minutes up to, say, 10 minutes). It's not just 1 minute, 2 minutes, 3 minutes, etc.

*   **Formal/Mathematical Version:** A random variable $X$ is continuous if its set of possible values (its range) is an uncountable set, typically an interval on the real number line (e.g., $(a, b)$, $[a, b]$, $(-\infty, \infty)$). Formally, for any real number $x$, the probability $P(X=x)$ is $0$. This is a crucial distinction from discrete random variables, where $P(X=x)$ can be positive for specific values of $x$.

*   **What Could Go Wrong:** A common mistake is to confuse a continuous random variable with a discrete one. If you can list all possible outcomes (even if the list is infinite, like 1, 2, 3, ...), it's discrete. If you have to describe the outcomes as an *interval* because there are infinitely many possibilities *between* any two values, it's continuous. Forgetting that $P(X=x)=0$ for a continuous $X$ can lead to significant conceptual errors.

### Step 2: The Probability Density Function (PDF)

*   **Plain English Statement:** Since the probability of a continuous random variable taking *any single exact value* is zero, we can't use a "probability mass function" like we do for discrete variables. Instead, we use a **Probability Density Function (PDF)**, often denoted $f_X(x)$. This function doesn't give you the probability of $X$ being exactly $x$; rather, it tells you how "dense" or concentrated the probability is *around* $x$. A higher $f_X(x)$ means values near $x$ are more likely to occur. The actual probability is found by calculating the *area* under this function over an interval.

*   **Small Concrete Example:** Let's say the waiting time $X$ (in minutes) for a customer in a bank queue has a PDF $f_X(x) = \frac{1}{5}e^{-x/5}$ for $x \ge 0$, and $f_X(x) = 0$ for $x < 0$.
    *   If you plot this function, you'll see it starts high at $x=0$ and then decreases. This tells us that shorter waiting times (near 0) are more likely than very long waiting times.
    *   To find the probability that a customer waits between 2 and 3 minutes, you would calculate the area under this curve from $x=2$ to $x=3$.

*   **Formal/Mathematical Version:** A function $f_X(x)$ is a Probability Density Function for a continuous random variable $X$ if it satisfies two conditions:
    1.  **Non-negativity:** $f_X(x) \ge 0$ for all $x \in \mathbb{R}$. (Probability density cannot be negative.)
    2.  **Total Area is 1:** The total area under the curve of $f_X(x)$ over its entire range must be equal to 1. This means:
        $$ \int_{-\infty}^{\infty} f_X(x) dx = 1 $$
    The probability that $X$ falls within a specific interval $[a, b]$ is given by the integral of the PDF over that interval:
    $$ P(a \le X \le b) = \int_a^b f_X(x) dx $$
    Note that for continuous random variables, $P(a \le X \le b) = P(a < X \le b) = P(a \le X < b) = P(a < X < b)$ because $P(X=a)=0$ and $P(X=b)=0$.

*   **What Could Go Wrong:**
    *   **Misinterpreting $f_X(x)$ as a probability:** Remember, $f_X(x)$ is a *density*, not a probability. It can even be greater than 1 (e.g., a uniform distribution over $[0, 0.5]$ has $f_X(x)=2$ for $x \in [0, 0.5]$). Only the *area* under the PDF represents probability.
    *   **Forgetting the total area must be 1:** This is a fundamental property. If you're given a function and asked if it's a valid PDF, this is the first thing to check (after non-negativity).

### Step 3: The Cumulative Distribution Function (CDF)

*   **Plain English Statement:** The **Cumulative Distribution Function (CDF)**, denoted $F_X(x)$, gives you the *total accumulated probability* that the random variable $X$ will take on a value *less than or equal to* a specific number $x$. It's like a running total. If you know the CDF, you can easily find the probability of $X$ being in any interval.

*   **Small Concrete Example:** Using the bank waiting time example, $F_X(x)$ would tell you the probability that a customer waits for $x$ minutes *or less*.
    *   $F_X(2)$ would be the probability that a customer waits 2 minutes or less.
    *   $F_X(5)$ would be the probability that a customer waits 5 minutes or less.
    *   Since it's cumulative, $F_X(5)$ must be greater than or equal to $F_X(2)$.
    *   To find the probability of waiting between 2 and 3 minutes ($P(2 \le X \le 3)$), you could calculate $F_X(3) - F_X(2)$.

*   **Formal/Mathematical Version:** For a continuous random variable $X$ with PDF $f_X(t)$, its CDF $F_X(x)$ is defined as:
    $$ F_X(x) = P(X \le x) = \int_{-\infty}^{x} f_X(t) dt $$
    The variable of integration is usually denoted $t$ to distinguish it from the upper limit $x$.
    Properties of a valid CDF:
    1.  **Monotonically Non-decreasing:** If $x_1 < x_2$, then $F_X(x_1) \le F_X(x_2)$. (As $x$ increases, the accumulated probability can only stay the same or increase.)
    2.  **Limits:**
        *   $\lim_{x \to -\infty} F_X(x) = 0$ (The probability of $X$ being less than negative infinity is 0.)
        *   $\lim_{x \to \infty} F_X(x) = 1$ (The probability of $X$ being less than positive infinity is 1.)
    3.  **Right-continuous:** For all $x$, $\lim_{y \to x^+} F_X(y) = F_X(x)$. (This is a technical condition for continuous random variables, ensuring the function doesn't "jump down".)
    Using the CDF, the probability of $X$ falling into an interval $(a, b]$ is:
    $$ P(a < X \le b) = F_X(b) - F_X(a) $$

*   **What Could Go Wrong:**
    *   **Confusing PDF and CDF:** They are different functions with different meanings. PDF is density, CDF is cumulative probability.
    *   **Incorrect integration limits:** Remember the CDF integrates from $-\infty$ up to $x$. If the PDF has a specific support (e.g., $x \ge 0$), then the integral starts from the lower bound of that support.
    *   **Forgetting CDF properties:** A valid CDF must start at 0, end at 1, and never decrease.

### Step 4: Relation between PDF and CDF

*   **Plain English Statement:** The PDF and CDF are intimately linked through calculus. The PDF is essentially the "rate of change" of the CDF. If you have the CDF, you can get the PDF by taking its derivative. Conversely, if you have the PDF, you get the CDF by integrating it. This is a direct application of the Fundamental Theorem of Calculus.

*   **Small Concrete Example:** If $F_X(x)$ tells you the total probability up to $x$, then $f_X(x)$ tells you how quickly that total probability is increasing at point $x$. If the CDF is steep at a certain point, it means the PDF is high there, indicating a high concentration of probability. If the CDF is flat, the PDF is zero, meaning no probability density in that region.

*   **Formal/Mathematical Version:** If $F_X(x)$ is differentiable at $x$, then the PDF $f_X(x)$ is the derivative of the CDF $F_X(x)$:
    $$ f_X(x) = \frac{d}{dx} F_X(x) $$
    This relationship holds for almost all $x$ where the CDF is smooth.

*   **What Could Go Wrong:**
    *   **Incorrectly applying the Fundamental Theorem of Calculus:** Make sure you remember how to differentiate an integral and integrate a derivative.
    *   **Ignoring the support of the PDF/CDF:** When differentiating the CDF to get the PDF, remember that the PDF will be zero outside the support of the random variable. For instance, if $F_X(x)=0$ for $x<0$, then $f_X(x)=0$ for $x<0$.

### Step 5: Percentiles (Quantiles)

*   **Plain English Statement:** A percentile (or quantile) is a specific *value* of the random variable $X$ that corresponds to a certain accumulated probability. If we talk about the $p$-th percentile, it means that $p\%$ of the outcomes are less than or equal to that value. For example, the 90th percentile of exam scores is the score below which 90% of students fall.

*   **Small Concrete Example:** Let's say the time it takes for a certain chemical reaction to complete is a continuous random variable $X$. If the 25th percentile of reaction time is 10 minutes, it means there's a 25% chance the reaction will complete in 10 minutes or less. If the 75th percentile is 18 minutes, there's a 75% chance it will complete in 18 minutes or less.

*   **Formal/Mathematical Version:** For a given probability $p \in (0,1)$, the $p$-th percentile (or $p$-th quantile) $x_p$ is the value such that the cumulative probability up to $x_p$ is $p$. That is:
    $$ F_X(x_p) = P(X \le x_p) = p $$
    To find $x_p$, you typically set the CDF equal to $p$ and solve for $x_p$.

*   **What Could Go Wrong:**
    *   **Confusing percentile with probability:** A percentile is a *value* of the random variable (e.g., 10 minutes, 175 cm), not a probability (which is a number between 0 and 1).
    *   **Misinterpreting $p$:** The $p$ in $x_p$ (e.g., 90th percentile) is the *percentage* (as a decimal, so 0.90 for the 90th percentile), not the value of $x$.

### Step 6: Median and Quartiles

*   **Plain English Statement:** These are just special, commonly used percentiles.
    *   The **median** is the 50th percentile: the value that splits the probability distribution exactly in half. Half the outcomes are below it, and half are above it.
    *   The **first quartile** ($Q_1$) is the 25th percentile: the value below which 25% of outcomes fall.
    *   The **third quartile** ($Q_3$) is the 75th percentile: the value below which 75% of outcomes fall. (The second quartile is the median.)

*   **Small Concrete Example:** If we're looking at the distribution of adult male heights:
    *   The median height might be 175 cm. This means 50% of adult males are 175 cm or shorter.
    *   The first quartile might be 170 cm. This means 25% of adult males are 170 cm or shorter.
    *   The third quartile might be 180 cm. This means 75% of adult males are 180 cm or shorter.

*   **Formal/Mathematical Version:**
    *   **Median ($m$):** $F_X(m) = 0.5$
    *   **First Quartile ($Q_1$):** $F_X(Q_1) = 0.25$
    *   **Third Quartile ($Q_3$):** $F_X(Q_3) = 0.75$

*   **What Could Go Wrong:**
    *   **Mixing up the definitions:** Just remember the percentages associated with each: 25% for $Q_1$, 50% for median, 75% for $Q_3$.
    *   **Forgetting how to calculate them:** They are found by setting the CDF equal to the corresponding probability and solving for $x$.

## 5. Worked examples — multiple, with every step shown

Here are several worked examples to solidify your understanding, ranging from easy to more challenging.

### Example 1: Finding Probability from a Given PDF

**Problem:**
A continuous random variable $X$ has the following Probability Density Function (PDF):
$$ f_X(x) = \begin{cases} \frac{1}{2}x & \text{for } 0 \le x \le 2 \\ 0 & \text{otherwise} \end{cases} $$
Find the probability $P(0.5 \le X \le 1.5)$.

**Solution:**

**1. Identify what's given and what we want:**
*   Given: The PDF $f_X(x) = \frac{1}{2}x$ for $0 \le x \le 2$.
*   Want: The probability $P(0.5 \le X \le 1.5)$.

**2. Recall the formula for probability from PDF:**
For a continuous random variable, the probability that $X$ falls within an interval $[a, b]$ is given by the integral of its PDF over that interval:
$$ P(a \le X \le b) = \int_a^b f_X(x) dx $$

**3. Set up the integral with the given values:**
In this problem, $a = 0.5$ and $b = 1.5$. The function $f_X(x)$ is $\frac{1}{2}x$ within this interval (since $0.5$ and $1.5$ both fall between $0$ and $2$).
$$ P(0.5 \le X \le 1.5) = \int_{0.5}^{1.5} \frac{1}{2}x \, dx $$
*This step translates the probability question into a definite integral calculation.*

**4. Perform the integration:**
First, find the antiderivative of $\frac{1}{2}x$. The power rule for integration states $\int x^n dx = \frac{x^{n+1}}{n+1} + C$.
$$ \int \frac{1}{2}x \, dx = \frac{1}{2} \int x^1 \, dx = \frac{1}{2} \left( \frac{x^{1+1}}{1+1} \right) = \frac{1}{2} \left( \frac{x^2}{2} \right) = \frac{x^2}{4} $$
*Here, we applied the basic power rule for integration. We don't need the $+C$ for definite integrals.*

**5. Evaluate the definite integral using the Fundamental Theorem of Calculus:**
The definite integral $\int_a^b g(x) dx = G(b) - G(a)$, where $G(x)$ is the antiderivative of $g(x)$.
$$ P(0.5 \le X \le 1.5) = \left[ \frac{x^2}{4} \right]_{0.5}^{1.5} $$
$$ P(0.5 \le X \le 1.5) = \left( \frac{(1.5)^2}{4} \right) - \left( \frac{(0.5)^2}{4} \right) $$
*We substitute the upper limit and lower limit into the antiderivative and subtract the results.*

**6. Calculate the numerical value:**
$$ P(0.5 \le X \le 1.5) = \left( \frac{2.25}{4} \right) - \left( \frac{0.25}{4} \right) $$
$$ P(0.5 \le X \le 1.5) = \frac{2.25 - 0.25}{4} = \frac{2.00}{4} = 0.5 $$
*Perform the arithmetic to get the final probability.*

**Final Answer:**
$$ \boxed{P(0.5 \le X \le 1.5) = 0.5} $$

**Reflection:** This example was straightforward because the PDF was simple and the interval for probability calculation fell entirely within the defined support of the PDF. The key was correctly setting up and evaluating the definite integral.

---

### Example 2: Finding the CDF from a PDF and then a Probability

**Problem:**
A continuous random variable $X$ has the following PDF:
$$ f_X(x) = \begin{cases} 2e^{-2x} & \text{for } x \ge 0 \\ 0 & \text{for } x < 0 \end{cases} $$
a) Find the Cumulative Distribution Function (CDF), $F_X(x)$.
b) Use the CDF to find $P(X \le 1)$.

**Solution:**

**Part a) Finding the CDF:**

**1. Identify what's given and what we want:**
*   Given: PDF $f_X(x) = 2e^{-2x}$ for $x \ge 0$.
*   Want: CDF $F_X(x)$.

**2. Recall the definition of CDF:**
The CDF $F_X(x)$ is the integral of the PDF from $-\infty$ up to $x$:
$$ F_X(x) = \int_{-\infty}^{x} f_X(t) dt $$
*This is the fundamental relationship between PDF and CDF.*

**3. Consider cases for $x$ based on the PDF's support:**

*   **Case 1: $x < 0$**
    For any $x < 0$, the PDF $f_X(t)$ is $0$ for all $t \le x$.
    $$ F_X(x) = \int_{-\infty}^{x} 0 \, dt = 0 $$
    *Since the PDF is 0 for all negative values, no probability accumulates before $x=0$.*

*   **Case 2: $x \ge 0$}
    For $x \ge 0$, the integral from $-\infty$ to $x$ must be split. From $-\infty$ to $0$, the PDF is $0$. From $0$ to $x$, the PDF is $2e^{-2t}$.
    $$ F_X(x) = \int_{-\infty}^{0} 0 \, dt + \int_{0}^{x} 2e^{-2t} \, dt $$
    $$ F_X(x) = 0 + \int_{0}^{x} 2e^{-2t} \, dt $$
    *We only need to integrate the non-zero part of the PDF.*

**4. Perform the integration for $x \ge 0$:**
To integrate $2e^{-2t}$, we use a substitution or recall the integral of $e^{at}$ is $\frac{1}{a}e^{at}$.
$$ \int 2e^{-2t} \, dt = 2 \left( \frac{1}{-2} e^{-2t} \right) = -e^{-2t} $$
*This is the antiderivative of the exponential function.*

**5. Evaluate the definite integral:**
$$ F_X(x) = \left[ -e^{-2t} \right]_{0}^{x} $$
$$ F_X(x) = (-e^{-2x}) - (-e^{-2(0)}) $$
$$ F_X(x) = -e^{-2x} - (-e^0) $$
$$ F_X(x) = -e^{-2x} - (-1) $$
$$ F_X(x) = 1 - e^{-2x} $$
*Substitute the upper and lower limits and simplify.*

**6. Combine the cases to write the full CDF:**
$$ F_X(x) = \begin{cases} 0 & \text{for } x < 0 \\ 1 - e^{-2x} & \text{for } x \ge 0 \end{cases} $$

**Final Answer (Part a):**
$$ \boxed{F_X(x) = \begin{cases} 0 & \text{for } x < 0 \\ 1 - e^{-2x} & \text{for } x \ge 0 \end{cases}} $$

**Part b) Using the CDF to find $P(X \le 1)$:**

**1. Identify what's given and what we want:**
*   Given: CDF $F_X(x)$ from part (a).
*   Want: $P(X \le 1)$.

**2. Recall the definition of CDF:**
By definition, $F_X(x) = P(X \le x)$.
*This is a direct application of the CDF's meaning.*

**3. Substitute the value into the CDF:**
We want $P(X \le 1)$, which is simply $F_X(1)$. Since $1 \ge 0$, we use the second case of our CDF:
$$ P(X \le 1) = F_X(1) = 1 - e^{-2(1)} $$
$$ P(X \le 1) = 1 - e^{-2} $$
*Substitute $x=1$ into the correct part of the CDF function.*

**4. Calculate the numerical value (optional, but good for understanding):**
Using $e \approx 2.71828$:
$$ e^{-2} \approx (2.71828)^{-2} \approx 0.1353 $$
$$ P(X \le 1) \approx 1 - 0.1353 \approx 0.8647 $$

**Final Answer (Part b):**
$$ \boxed{P(X \le 1) = 1 - e^{-2}} $$

**Reflection:** This example demonstrates the crucial process of deriving a CDF from a PDF. It also highlights the importance of correctly handling the integration limits based on the PDF's support. The exponential distribution is a very common continuous distribution, so this is a practical skill.

---

### Example 3: Finding an Unknown Constant and a Percentile

**Problem:**
A continuous random variable $Y$ has the following PDF:
$$ f_Y(y) = \begin{cases} c(4-y^2) & \text{for } 0 \le y \le 2 \\ 0 & \text{otherwise} \end{cases} $$
a) Find the value of the constant $c$ that makes $f_Y(y)$ a valid PDF.
b) Find the median of $Y$.

**Solution:**

**Part a) Finding the constant $c$:**

**1. Identify what's given and what we want:**
*   Given: PDF $f_Y(y) = c(4-y^2)$ for $0 \le y \le 2$.
*   Want: The value of $c$.

**2. Recall the property of a valid PDF:**
The total area under the PDF must be equal to 1:
$$ \int_{-\infty}^{\infty} f_Y(y) dy = 1 $$
*This is the defining characteristic for normalizing a PDF.*

**3. Set up the integral with the given PDF and its support:**
Since $f_Y(y)$ is $0$ outside the interval $[0, 2]$, we only need to integrate over this interval.
$$ \int_{0}^{2} c(4-y^2) dy = 1 $$
*We simplify the integration limits to the non-zero part of the PDF.*

**4. Perform the integration:**
$$ c \int_{0}^{2} (4-y^2) dy = 1 $$
$$ c \left[ 4y - \frac{y^3}{3} \right]_{0}^{2} = 1 $$
*Integrate term by term using the power rule.*

**5. Evaluate the definite integral:**
$$ c \left[ \left( 4(2) - \frac{(2)^3}{3} \right) - \left( 4(0) - \frac{(0)^3}{3} \right) \right] = 1 $$
$$ c \left[ \left( 8 - \frac{8}{3} \right) - (0) \right] = 1 $$
$$ c \left[ \frac{24}{3} - \frac{8}{3} \right] = 1 $$
$$ c \left[ \frac{16}{3} \right] = 1 $$
*Substitute the limits and simplify the expression.*

**6. Solve for $c$:**
$$ c = \frac{3}{16} $$
*Isolate $c$ to find its value.*

**Final Answer (Part a):**
$$ \boxed{c = \frac{3}{16}} $$

**Part b) Finding the median of $Y$:**

**1. Identify what's given and what we want:**
*   Given: The PDF with the constant $c = \frac{3}{16}$. So, $f_Y(y) = \frac{3}{16}(4-y^2)$ for $0 \le y \le 2$.
*   Want: The median $m$.

**2. Recall the definition of the median:**
The median $m$ is the value such that $P(Y \le m) = 0.5$. In terms of the CDF, $F_Y(m) = 0.5$.
*The median is the 50th percentile.*

**3. First, find the CDF, $F_Y(y)$:**
For $0 \le y \le 2$:
$$ F_Y(y) = \int_{0}^{y} f_Y(t) dt = \int_{0}^{y} \frac{3}{16}(4-t^2) dt $$
$$ F_Y(y) = \frac{3}{16} \left[ 4t - \frac{t^3}{3} \right]_{0}^{y} $$
$$ F_Y(y) = \frac{3}{16} \left[ \left( 4y - \frac{y^3}{3} \right) - \left( 4(0) - \frac{(0)^3}{3} \right) \right] $$
$$ F_Y(y) = \frac{3}{16} \left( 4y - \frac{y^3}{3} \right) $$
*We integrate the PDF from the lower bound of its support (0) up to an arbitrary $y$ to get the CDF.*
(And $F_Y(y)=0$ for $y<0$, $F_Y(y)=1$ for $y>2$.)

**4. Set the CDF equal to 0.5 and solve for $m$:**
We need to find $m$ such that $F_Y(m) = 0.5$.
$$ \frac{3}{16} \left( 4m - \frac{m^3}{3} \right) = 0.5 $$
$$ \frac{3}{16} \left( \frac{12m - m^3}{3} \right) = 0.5 $$
$$ \frac{1}{16} (12m - m^3) = 0.5 $$
$$ 12m - m^3 = 16 \times 0.5 $$
$$ 12m - m^3 = 8 $$
$$ m^3 - 12m + 8 = 0 $$
*This is a cubic equation. Solving cubic equations analytically can be complex, but for many problems, you might be able to find a root by inspection or numerical methods.*

**5. Solve the cubic equation for $m$:**
We are looking for a root $m$ in the interval $[0, 2]$. Let $g(m) = m^3 - 12m + 8$.
We can test integer values or use a numerical solver.
*   $g(0) = 8$
*   $g(1) = 1 - 12 + 8 = -3$
*   $g(2) = 8 - 24 + 8 = -8$
Since $g(0)$ is positive and $g(1)$ is negative, there must be a root between 0 and 1.
This cubic equation doesn't have a simple integer or rational root. Using a numerical solver (e.g., Wolfram Alpha, or a calculator's root finder), the real root in the interval $[0, 2]$ is approximately $m \approx 0.697$.
*In a typical exam setting, if a cubic equation arises, it often has a simple rational root that can be found by inspection, or you'd be allowed to leave it in the form of the equation, or use a calculator.*

**Final Answer (Part b):**
$$ \boxed{\text{The median } m \text{ is the solution to } m^3 - 12m + 8 = 0 \text{ such that } 0 \le m \le 2. \text{ Numerically, } m \approx 0.697} $$

**Reflection:** This example involved two key steps: first, using the property that the total integral of a PDF must be 1 to find an unknown constant. Second, deriving the CDF and then using its definition to find a percentile (the median), which often leads to solving an equation. The cubic equation part highlights that not all solutions are simple, and sometimes numerical methods are required.

---

### Example 4: Finding PDF from CDF, and then a Percentile

**Problem:**
A continuous random variable $Z$ has the following Cumulative Distribution Function (CDF):
$$ F_Z(z) = \begin{cases} 0 & \text{for } z < 0 \\ 1 - e^{-z^2/2} & \text{for } z \ge 0 \end{cases} $$
a) Find the Probability Density Function (PDF), $f_Z(z)$.
b) Find the 90th percentile of $Z$.

**Solution:**

**Part a) Finding the PDF:**

**1. Identify what's given and what we want:**
*   Given: CDF $F_Z(z)$.
*   Want: PDF $f_Z(z)$.

**2. Recall the relationship between PDF and CDF:**
The PDF is the derivative of the CDF:
$$ f_Z(z) = \frac{d}{dz} F_Z(z) $$
*This is the inverse relationship to what we did in Example 2.*

**3. Differentiate $F_Z(z)$ for each case:**

*   **Case 1: $z < 0$**
    $F_Z(z) = 0$
    $$ f_Z(z) = \frac{d}{dz}(0) = 0 $$
    *The derivative of a constant is 0.*

*   **Case 2: $z \ge 0$**
    $F_Z(z) = 1 - e^{-z^2/2}$
    To differentiate this, we use the chain rule. Let $u = -z^2/2$, so $\frac{du}{dz} = -z$.
    Then $\frac{d}{dz}(e^u) = e^u \frac{du}{dz}$.
    $$ f_Z(z) = \frac{d}{dz}(1 - e^{-z^2/2}) $$
    $$ f_Z(z) = 0 - \left( e^{-z^2/2} \cdot \frac{d}{dz}\left(-\frac{z^2}{2}\right) \right) $$
    $$ f_Z(z) = - \left( e^{-z^2/2} \cdot (-z) \right) $$
    $$ f_Z(z) = z e^{-z^2/2} $$
    *Careful application of the chain rule is essential here.*

**4. Combine the cases to write the full PDF:**
$$ f_Z(z) = \begin{cases} z e^{-z^2/2} & \text{for } z \ge 0 \\ 0 & \text{for } z < 0 \end{cases} $$
*Note: This is the PDF for the Rayleigh distribution, which is used in physics and engineering.*

**Final Answer (Part a):**
$$ \boxed{f_Z(z) = \begin{cases} z e^{-z^2/2} & \text{for } z \ge 0 \\ 0 & \text{for } z < 0 \end{cases}} $$

**Part b) Finding the 90th percentile of $Z$:**

**1. Identify what's given and what we want:**
*   Given: CDF $F_Z(z)$ and the percentile probability $p = 0.90$.
*   Want: The 90th percentile, $z_{0.90}$.

**2. Recall the definition of a percentile:**
The $p$-th percentile $z_p$ is the value such that $F_Z(z_p) = p$.
*This directly uses the CDF.*

**3. Set the CDF equal to 0.90 and solve for $z_{0.90}$:**
We use the part of the CDF for $z \ge 0$ since $0.90$ is a positive probability, meaning $z_{0.90}$ must be $\ge 0$.
$$ F_Z(z_{0.90}) = 1 - e^{-z_{0.90}^2/2} = 0.90 $$
*Set up the equation using the CDF.*

**4. Solve for $z_{0.90}$:**
$$ 1 - e^{-z_{0.90}^2/2} = 0.90 $$
$$ e^{-z_{0.90}^2/2} = 1 - 0.90 $$
$$ e^{-z_{0.90}^2/2} = 0.10 $$
*Isolate the exponential term.*

**5. Take the natural logarithm of both sides:**
$$ \ln(e^{-z_{0.90}^2/2}) = \ln(0.10) $$
$$ -\frac{z_{0.90}^2}{2} = \ln(0.10) $$
*The natural logarithm is the inverse of the exponential function.*

**6. Solve for $z_{0.90}$:**
$$ z_{0.90}^2 = -2 \ln(0.10) $$
Since $\ln(0.10)$ is a negative number (approximately -2.3026), $-2 \ln(0.10)$ will be positive.
$$ z_{0.90} = \sqrt{-2 \ln(0.10)} $$
$$ z_{0.90} \approx \sqrt{-2(-2.3026)} \approx \sqrt{4.6052} \approx 2.146 $$
*Take the square root. Since $z \ge 0$ for this distribution, we take the positive root.*

**Final Answer (Part b):**
$$ \boxed{z_{0.90} = \sqrt{-2 \ln(0.10)} \approx 2.146} $$

**Reflection:** This example demonstrates how to move from a CDF to a PDF by differentiation, and then how to use the CDF directly to find a percentile by solving an equation. It also involves working with natural logarithms, which are common when dealing with exponential distributions.

## 6. Common mistakes and traps

Students often stumble on specific points when learning about continuous random variables. Being aware of these traps can help you avoid them:

1.  **Thinking $P(X=x) = f_X(x)$:** This is perhaps the most common misconception. For a continuous random variable, the probability of it taking *any single exact value* is zero ($P(X=x)=0$). The PDF $f_X(x)$ is a *density*, not a probability. Only the *area* under the PDF over an interval represents probability.
2.  **Assuming $f_X(x)$ must be $\le 1$:** While probabilities are always between 0 and 1, a PDF value $f_X(x)$ can absolutely be greater than 1. For example, a uniform distribution on the interval $[0, 0.5]$ has a PDF $f_X(x) = 2$ for $x \in [0, 0.5]$. The condition is that $f_X(x) \ge 0$ and $\int_{-\infty}^{\infty} f_X(x) dx = 1$.
3.  **Incorrect Integration Limits for CDF:** When calculating $F_X(x) = \int_{-\infty}^{x} f_X(t) dt$, students sometimes forget to split the integral if the PDF is defined piecewise (e.g., $f_X(t)=0$ for $t<0$). The integral should start from the lowest possible value where the PDF is non-zero.
4.  **Confusing CDF and PDF properties:**
    *   PDF ($f_X(x)$): non-negative, total area is 1. Can be > 1.
    *   CDF ($F_X(x)$): starts at 0, ends at 1, non-decreasing. Always between 0 and 1.
    Mixing these properties can lead to incorrect conclusions or calculations.
5.  **Errors in Calculus (Integration/Differentiation):** Since this topic relies heavily on calculus, basic algebraic or calculus errors (e.g., incorrect antiderivatives, chain rule mistakes, sign errors) are frequent. Double-check your derivatives and integrals.
6.  **Misinterpreting Percentiles:** A percentile is a *value* of the random variable (e.g., 10 minutes, 175 cm), not a probability. The $p$-th percentile $x_p$ is the value such that $P(X \le x_p) = p$. Don't confuse $x_p$ with $p$.
7.  **Forgetting the support of the random variable:** Always pay attention to the interval(s) where the PDF is non-zero. This defines the "support" of the distribution and is crucial for setting up integrals correctly and for interpreting results.

## 7. Textbook-precise explanation

This section provides the formal, rigorous definitions as you would encounter them in a university-level probability textbook.

**Definition 1: Continuous Random Variable**
A random variable $X$ is called a **continuous random variable** if its Cumulative Distribution Function $F_X(x)$ is continuous for all $x \in \mathbb{R}$. Equivalently, $X$ is continuous if there exists a non-negative function $f_X(x)$ such that for any real numbers $a$ and $b$ with $a \le b$, the probability $P(a \le X \le b)$ can be expressed as:
$$ P(a \le X \le b) = \int_a^b f_X(x) dx $$
For a continuous random variable, $P(X=x) = 0$ for any specific value $x$.

**Definition 2: Probability Density Function (PDF)**
The function $f_X(x)$ defined above is called the **Probability Density Function (PDF)** of the continuous random variable $X$. A function $f_X(x)$ is a valid PDF if it satisfies the following two conditions:
1.  **Non-negativity:** $f_X(x) \ge 0$ for all $x \in \mathbb{R}$.
2.  **Normalization:** The total area under the curve is equal to 1:
    $$ \int_{-\infty}^{\infty} f_X(x) dx = 1 $$

**Definition 3: Cumulative Distribution Function (CDF)**
The **Cumulative Distribution Function (CDF)** of a continuous random variable $X$, denoted $F_X(x)$, is defined for any real number $x$ as:
$$ F_X(x) = P(X \le x) = \int_{-\infty}^{x} f_X(t) dt $$
A function $F_X(x)$ is a valid CDF if it satisfies the following properties:
1.  **Monotonically Non-decreasing:** For any $x_1 < x_2$, $F_X(x_1) \le F_X(x_2)$.
2.  **Limits:**
    $$ \lim_{x \to -\infty} F_X(x) = 0 $$
    $$ \lim_{x \to \infty} F_X(x) = 1 $$
3.  **Right-continuous:** For any $x$, $\lim_{y \to x^+} F_X(y) = F_X(x)$. (This property holds for all CDFs, both discrete and continuous.)
4.  **Relationship to PDF:** If $F_X(x)$ is differentiable at $x$, then its derivative is the PDF:
    $$ f_X(x) = \frac{d}{dx} F_X(x) $$
    This relationship is a direct consequence of the Fundamental Theorem of Calculus.

**Definition 4: Percentiles (Quantiles)**
For a continuous random variable $X$ and a probability $p \in (0,1)$, the **$p$-th percentile** (or **$p$-th quantile**) of $X$, denoted $x_p$, is the value such that the cumulative probability up to $x_p$ is $p$. That is:
$$ F_X(x_p) = P(X \le x_p) = p $$
*   The **median** is the 50th percentile ($x_{0.50}$), satisfying $F_X(x_{0.50}) = 0.5$.
*   The **first quartile** is the 25th percentile ($x_{0.25}$), satisfying $F_X(x_{0.25}) = 0.25$.
*   The **third quartile** is the 75th percentile ($x_{0.75}$), satisfying $F_X(x_{0.75}) = 0.75$.

**Reference:**
These definitions are standard and can be found in most introductory probability textbooks. For example:
*   **Ross, S. M. (2019). *A First Course in Probability* (10th ed.). Pearson.** (Chapter 5: Continuous Random Variables)
*   **DeGroot, M. H., & Schervish, M. J. (2012). *Probability and Statistics* (4th ed.). Pearson.** (Chapter 4: Continuous Random Variables)

## 8. ASCII diagrams

Here are ASCII diagrams illustrating a Probability Density Function (PDF) and a Cumulative Distribution Function (CDF).

```text
               Probability Density Function (PDF) - f(x)
       f(x) ^
            |       /----------\
            |      /            \
            |     /              \
            |    /                \
            |   /                  \
            |  /                    \
            | /                      \
            +---------------------------------> x
          -inf                                +inf
            
    The height of the curve f(x) indicates the *density* of probability at x.
    It is NOT the probability P(X=x).
    
    The probability P(a <= X <= b) is the AREA under the curve f(x)
    between points 'a' and 'b'.
    
       f(x) ^
            |       /--\
            |      /####\  <-- This shaded area is P(a <= X <= b)
            |     /######\
            |    /########\
            |   /##########\
            |  /------------\
            | /              \
            +---------------------> x
            a       b
    
    
    
               Cumulative Distribution Function (CDF) - F(x)
       F(x) ^
            1 +--------------------------------- (Approaches 1 as x -> +inf)
            |  /
            | /
            |/
            |
            |
            |
            +---------------------------------> x
          -inf                                +inf
            0 (Starts at 0 as x -> -inf)
            
    The CDF, F(x), represents the *total accumulated probability*
    that the random variable X takes a value LESS THAN OR EQUAL TO x.
    
    F(x) is always between 0 and 1, and it is non-decreasing.
    
    To find P(a < X <= b) using the CDF:
    
       F(x) ^
            1 +---------------------
            |  /
            | /
            |/
            |      F(b) ----------
            |           |         |
            |           |         |   <-- This vertical distance is P(a < X <= b)
            |      F(a) -------   |
            |           |     |   |
            +---------------------> x
                      a   b
    
    P(a < X <= b) = F(b) - F(a)
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **P**DF is for **P**oint (density), **C**DF is for **C**umulative (accumulation).
    *   Think of a **P**DF as a **P**rofile of a hill – taller parts mean more likely outcomes. The **C**DF is like the **C**umulative amount of water you'd collect if it rained on the hill, filling up from left to right.
    *   **P**DF is the **D**erivative of **C**DF (PD), and **C**DF is the **I**ntegral of **P**DF (CIP). Remember "PD-CIP" as a pair.

2.  **Formulas/Facts to Overlearn:**
    You absolutely MUST internalize these four relationships. They are the bedrock of working with continuous random variables:
    *   **Probability from PDF:** $P(a \le X \le b) = \int_a^b f_X(x) dx$
    *   **CDF from PDF:** $F_X(x) = \int_{-\infty}^x f_X(t) dt$
    *   **PDF from CDF:** $f_X(x) = \frac{d}{dx} F_X(x)$ (where $F_X(x)$ is differentiable)
    *   **Percentile Definition:** $F_X(x_p) = p$ (where $x_p$ is the $p$-th percentile)

3.  **Spaced-Repetition Schedule:**
    To truly embed these concepts and formulas into your long-term memory, follow this schedule:
    *   **Review 1:** After 1 day
    *   **Review 2:** After 3 days
    *   **Review 3:** After 7 days
    *   **Review 4:** After 16 days
    *   **Review 5:** After 35 days
    Each review session should involve re-deriving the core relationships and working through a few practice problems without looking at solutions.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget a formula, you can rebuild it by starting with these core ideas:
    *   **Start with the idea of probability as "area":** For continuous variables, the chance of falling into a range is the area under some "likelihood curve." This immediately leads to the idea of **integration** for calculating probabilities from a **PDF**.
        *   $P(a \le X \le b) = \text{Area under } f_X(x) \text{ from } a \text{ to } b \implies \int_a^b f_X(x) dx$.
    *   **Think "cumulative":** If you want the probability up to a certain point $x$, you just accumulate all the area from the very beginning (negative infinity) up to $x$. This defines the **CDF**.
        *   $P(X \le x) = \text{Accumulated area up to } x \implies F_X(x) = \int_{-\infty}^x f_X(t) dt$.
    *   **Connect integral and derivative:** The Fundamental Theorem of Calculus tells us that differentiation and integration are inverse operations. If the CDF is an integral of the PDF, then the PDF must be the derivative of the CDF.
        *   $F_X(x) = \int_{-\infty}^x f_X(t) dt \implies \frac{d}{dx} F_X(x) = f_X(x)$.
    *   **Percentiles are inverse CDF:** If the CDF gives you the probability for a given value, then a percentile asks for the *value* for a given probability