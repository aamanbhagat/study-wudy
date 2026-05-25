## What it is
The properties of expected value, variance, and standard deviation are rules that describe how these statistical measures change when we apply a linear transformation (scaling and shifting) to a random variable. These properties allow us to calculate the new mean and spread of a dataset or distribution without re-calculating from scratch using every data point.

## Why it matters
These properties are the bedrock of data preprocessing in machine learning and error propagation in physics. When you "normalize" or "standardize" data before feeding it to a neural network, you are directly applying these rules to set the mean to 0 and standard deviation to 1. In experimental physics or rocket science, if you have measurements with known error (variance), these properties let you calculate the error of a final quantity that is a function of those measurements.

## When to study it
You must be comfortable with the definitions of a random variable (both discrete and continuous), probability mass/density functions, and the integral/summation definitions of expected value and variance. Specifically, you should know that $E[X] = \int_{-\infty}^{\infty} x f(x) dx$ and $\text{Var}(X) = E[(X - E[X])^2]$. An understanding of the linearity of sums and integrals is essential, as expectation is built on them.

## How to study it (step by step)
1.  **Review the Definition:** Write down the definition of expected value for a continuous random variable $X$: $E[X] = \int_{-\infty}^{\infty} x f_X(x) dx$. Recognize this as a "weighted average" of the values $x$, weighted by their probability density $f_X(x)$.
2.  **Derive Linearity of Expectation:** Let $Y = aX + b$. Find $E[Y]$ from first principles. Use the definition $E[Y] = \int (ax+b)f_X(x)dx$. Use the linearity of the integral to split it into two parts, pull out the constants $a$ and $b$, and show that $E[aX+b] = aE[X] + b$.
3.  **Review the Definition of Variance:** Write down the definition $\text{Var}(X) = E[(X-\mu)^2]$, where $\mu = E[X]$. Internalize that variance measures the expected *squared* distance from the mean.
4.  **Derive Variance Properties:** Let $Y = aX+b$. Find $\text{Var}(Y)$. Start with the definition: $\text{Var}(Y) = E[(Y - E[Y])^2]$. Substitute $Y = aX+b$ and $E[Y] = aE[X]+b$. Simplify the expression inside the expectation and see how the $b$ term cancels out and the $a$ term can be factored out and squared.
5.  **Derive Standard Deviation Properties:** Since the standard deviation is the square root of the variance, $\text{SD}(X) = \sqrt{\text{Var}(X)}$, the properties for SD follow directly from the variance properties. Take the square root of your result from step 4, $\text{Var}(aX+b) = a^2\text{Var}(X)$, and be careful with the square root of $a^2$.
6.  **Solve a Concrete Problem:** Let a random variable $X$ have $E[X]=5$ and $\text{Var}(X)=2$. Calculate $E[10-2X]$ and $\text{SD}(10-2X)$ using only the properties you just derived. Do not invent a distribution for $X$.

## Key ideas, with intuition
1.  **Expectation is Linear (Shifts and Scales Predictably):** Expectation acts like a linear function. If you take every value of your random variable, multiply it by $a$, and add $b$, the mean of the new set of values will be the old mean multiplied by $a$, plus $b$.
    $$ E[aX + b] = aE[X] + b $$
    *Intuition:* Imagine a class's test scores. If the professor decides to double everyone's score ($a=2$) and then add 10 bonus points ($b=10$), the class average will also double and then have 10 points added to it.

2.  **Variance is Immune to Shifts:** Adding a constant $b$ to every value of a random variable shifts the entire distribution, including its mean, by $b$. However, the *spread* or *dispersion* around the new mean remains identical. The distances between points don't change.
    $$ \text{Var}(X + b) = \text{Var}(X) $$
    *Intuition:* If everyone in the class gets 10 bonus points, the average goes up by 10, but the gap between the highest and lowest scores doesn't change. The class is not more or less spread out than before.

3.  **Variance Scales Quadratically:** Multiplying every value by a constant $a$ scales the spread. Since variance is based on *squared* distances from the mean, its value scales by the factor $a^2$.
    $$ \text{Var}(aX) = a^2 \text{Var}(X) $$
    *Intuition:* If the professor doubles everyone's score, the distance of each score from the mean also doubles. For example, a score that was 5 points above average is now 10 points above the new average. Since variance squares these distances, its value will be multiplied by $2^2=4$.

4.  **Standard Deviation Scales Linearly (with an Absolute Value):** The standard deviation, $\sigma$, is the square root of variance. It is in the same units as the original data. Therefore, it scales linearly with $|a|$. We need the absolute value because standard deviation can never be negative.
    $$ \text{SD}(aX+b) = \sqrt{\text{Var}(aX+b)} = \sqrt{a^2\text{Var}(X)} = |a|\sqrt{\text{Var}(X)} = |a|\text{SD}(X) $$

## Worked example
Let $X$ be a random variable with mean $E[X] = \mu$ and variance $\text{Var}(X) = \sigma^2$. A very common operation in statistics is to "standardize" $X$ by creating a new random variable $Z = \frac{X - \mu}{\sigma}$. Let's find the mean and variance of $Z$ using the properties.

**Step 1: Rewrite the transformation in the form $aX+b$.**
The transformation is $Z = \frac{1}{\sigma}X - \frac{\mu}{\sigma}$.
Here, our scaling factor is $a = \frac{1}{\sigma}$ and our shifting factor is $b = -\frac{\mu}{\sigma}$.

**Step 2: Calculate the expected value of Z.**
Using the linearity of expectation, $E[aX+b] = aE[X]+b$:
$$ E[Z] = E\left[\frac{1}{\sigma}X - \frac{\mu}{\sigma}\right] $$
$$ E[Z] = \frac{1}{\sigma}E[X] - \frac{\mu}{\sigma} $$
We know $E[X]=\mu$, so we substitute that in:
$$ E[Z] = \frac{1}{\sigma}(\mu) - \frac{\mu}{\sigma} = \frac{\mu}{\sigma} - \frac{\mu}{\sigma} = 0 $$

**Step 3: Calculate the variance of Z.**
Using the variance properties, $\text{Var}(aX+b) = a^2\text{Var}(X)$:
$$ \text{Var}(Z) = \text{Var}\left(\frac{1}{\sigma}X - \frac{\mu}{\sigma}\right) $$
The additive term $-\frac{\mu}{\sigma}$ has no effect on the variance. The scaling term $\frac{1}{\sigma}$ is squared:
$$ \text{Var}(Z) = \left(\frac{1}{\sigma}\right)^2 \text{Var}(X) = \frac{1}{\sigma^2}\text{Var}(X) $$
We know $\text{Var}(X)=\sigma^2$, so we substitute that in:
$$ \text{Var}(Z) = \frac{1}{\sigma^2}(\sigma^2) = 1 $$

**Reflection:**
This example demonstrates the power of these properties. We proved that *any* random variable (with finite mean and variance), no matter its original distribution, can be transformed into a new variable with a mean of 0 and a variance (and standard deviation) of 1. This process of standardization is fundamental for comparing different datasets and is a required preprocessing step for many machine learning algorithms. Each step relied directly on applying one of the core properties.

## Diagrams

```text
A probability density function (PDF) and its transformations.

1. Original PDF of X
   Mean=μ, Spread=σ
         |
        /|\
       / | \
      /  |  \
     /   |   \
   ----------------> x
         μ

2. Shifted PDF of Y = X + b
   Mean=μ+b, Spread=σ (unchanged)
                   |
                  /|\
                 / | \
                /  |  \
               /   |   \
   ----------------------------> x
                   μ+b

3. Scaled PDF of W = aX (for a > 1)
   Mean=aμ, Spread=aσ (wider)
            |
           /|\
          / | \
         /  |  \
        /   |   \
   --------------------------> x
            aμ
```

## Memory technique — remember this forever
1.  **The "Physics Lab" Story:**
    *   You have a set of measurements for length, $X$, in meters. The average is $E[X]$ and the standard deviation is $\text{SD}(X)$.
    *   **Expectation:** Your lab partner says, "Let's convert to centimeters and then add 30cm to every measurement." That's $Y = 100X + 30$. Your new average is just the old average, converted and shifted: $E[Y] = 100E[X] + 30$. It's a simple, linear unit conversion.
    *   **Variance:** What about the error (spread)? The shift of 30cm doesn't introduce more or less error; it just moves everything. So $b$ is irrelevant. The conversion to centimeters ($a=100$) makes the spread 100 times larger. But variance is in *squared units* (meters-squared). So to convert variance, you must use the squared conversion factor: $\text{Var}(Y) = 100^2 \text{Var}(X)$.

2.  **Must Overlearn These Formulas:**
    *   $E[aX + b] = aE[X] + b$
    *   $\text{Var}(aX + b) = a^2 \text{Var}(X)$

3.  **Spaced Repetition Schedule:**
    *   Review these derivations and formulas tomorrow (1 day), then in 3 days, 7 days, 16 days, and 35 days. Each time, try to re-derive them from the definitions without looking.

4.  **First Principles Pathway:**
    *   If you forget, you can always rebuild from the definitions. For $E[aX+b]$, just compute $\int (ax+b)f(x)dx$ and use the linearity of integrals. For $\text{Var}(aX+b)$, compute $E[((aX+b) - E[aX+b])^2]$, substitute $E[aX+b]=aE[X]+b$, simplify the algebra inside, and then take the expectation. The properties are unavoidable consequences of the definitions.

## Common mistakes
1.  **Forgetting the Square on 'a' for Variance:** Writing $\text{Var}(aX) = a\text{Var}(X)$. This is the most common error. Remember variance is in *squared units*.
2.  **Keeping the 'b' for Variance:** Incorrectly writing $\text{Var}(X+b) = \text{Var}(X) + b$ or $\text{Var}(X)+b^2$. Remember that shifting a distribution does not change its spread.
3.  **Forgetting the Absolute Value for Standard Deviation:** Writing $\text{SD}(-2X) = -2\text{SD}(X)$. Standard deviation cannot be negative. The correct result is $\text{SD}(-2X) = |-2|\text{SD}(X) = 2\text{SD}(X)$.
4.  **Applying to Non-Linear Transformations:** These rules only apply to linear transformations of the form $aX+b$. You cannot say $E[X^2] = (E[X])^2$.

## Self-check
1.  A random variable $X$ has $E[X] = -5$ and $\text{Var}(X) = 9$. Let $Y = 1 - 2X$. Find $E[Y]$ and $\text{SD}(Y)$.
2.  The average height of a group of astronauts is $180$ cm with a standard deviation of $5$ cm. An engineer needs to work with these measurements in meters. What are the mean, variance, and standard deviation of the astronauts' heights in meters?
3.  Let $X$ be a random variable. Prove that $\text{Var}(X)$ is unaffected by an additive constant by expanding the definition $\text{Var}(X+b) = E[((X+b) - E[X+b])^2]$ and showing it simplifies to $\text{Var}(X)$.