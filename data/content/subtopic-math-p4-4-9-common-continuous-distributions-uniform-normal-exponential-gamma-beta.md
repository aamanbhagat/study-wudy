## What it is
Continuous probability distributions describe the probabilities of outcomes for a random variable that can take any value in a continuous range. Unlike discrete distributions (like a coin flip), the probability of any single exact outcome is zero; instead, we consider the probability of an outcome falling within an interval. The Uniform, Normal, Exponential, Gamma, and Beta distributions are foundational models for various types of continuous random phenomena.

## Why it matters
These distributions are the building blocks for modeling the physical world and complex systems. In physics and rocketry, the Normal distribution models measurement errors and sensor noise. In computer science, the Exponential distribution models the time between events in a network or the lifetime of a server component. The Beta distribution is central to Bayesian inference in machine learning, used to model and update our beliefs about probabilities.

## When to study it
You must have a firm grasp of single-variable calculus, specifically definite integration. You should also understand the foundational concepts of probability theory: random variables, the distinction between discrete and continuous variables, Probability Density Functions (PDFs), Cumulative Distribution Functions (CDFs), expected value, and variance. If you cannot confidently compute $E[X] = \int_{-\infty}^{\infty} x f(x) dx$ for a given PDF $f(x)$, you should review that first.

## How to study it (step by step)
1.  **Master the Uniform distribution.** Start with $X \sim U(a, b)$. Derive its PDF, CDF, mean, and variance from first principles. It's the simplest case: a flat line PDF. This builds your mechanical skills with the definitions.
2.  **Move to the Exponential distribution.** Study $X \sim \text{Exp}(\lambda)$. Derive its properties. Focus on the intuition of "waiting time" for an event in a Poisson process and prove its unique "memoryless" property.
3.  **Tackle the Normal distribution.** For $X \sim N(\mu, \sigma^2)$, do not try to derive the PDF's form. Instead, focus on its parameters: $\mu$ (mean, center) and $\sigma^2$ (variance, spread). Learn to standardize any Normal variable into a standard Normal $Z \sim N(0, 1)$ using the Z-score: $Z = (X - \mu) / \sigma$.
4.  **Connect Exponential to Gamma.** See the Gamma distribution, $X \sim \Gamma(\alpha, \beta)$, as a generalization. Understand its parameters: $\alpha$ is a shape parameter, $\beta$ is a rate parameter. Recognize that an $\text{Exp}(\lambda)$ is just a $\Gamma(1, \lambda)$. The key insight is that the sum of $k$ independent $\text{Exp}(\lambda)$ variables is a $\Gamma(k, \lambda)$ variable.
5.  **Understand the Beta distribution's domain.** Study $X \sim \text{Beta}(\alpha, \beta)$. The most critical feature is that its support is the interval $[0, 1]$. This makes it perfect for modeling probabilities, proportions, or percentages. Think of $\alpha$ as "successes + 1" and $\beta$ as "failures + 1".
6.  **Solidify with practice.** For each distribution, find its mean and variance from its parameter definition. Then, solve one problem of the form "calculate $P(c < X < d)$" by setting up and solving the appropriate integral $\int_c^d f(x) dx$.

## Key ideas, with intuition
1.  **Probability is Area, not Height.** The value of the PDF, $f(x)$, is a probability *density*, not a probability. It can be greater than 1. The probability that a variable $X$ falls into a range $[a, b]$ is the area under the PDF curve from $a$ to $b$.
    $$ P(a \le X \le b) = \int_a^b f(x) dx $$
    This implies $P(X=c) = \int_c^c f(x) dx = 0$ for any constant $c$.

2.  **Parameters Define the Story.** Each distribution tells a story, and the parameters are the characters.
    *   **Uniform $U(a, b)$:** "Any outcome between $a$ and $b$ is equally likely." The parameters $a$ and $b$ define the interval of possibility.
    *   **Exponential $\text{Exp}(\lambda)$:** "How long must I wait for a memoryless event to happen?" The parameter $\lambda$ is the *rate* of occurrence; higher $\lambda$ means shorter waiting time.
    *   **Normal $N(\mu, \sigma^2)$:** "What is the result of adding up many small, independent random effects?" The parameter $\mu$ is the center of the distribution, and $\sigma$ is the standard deviation, controlling its spread.
    *   **Beta $\text{Beta}(\alpha, \beta)$:** "What is a plausible value for this unknown probability?" The parameters $\alpha$ and $\beta$ act like counts of prior evidence for "successes" and "failures."

3.  **Relationships Create a Family Tree.** These distributions are not isolated islands. The Exponential is a special case of the Gamma. The sum of independent Exponential variables is a Gamma variable. The Normal distribution is a limiting case for many other distributions (the Central Limit Theorem). Understanding these connections reduces cognitive load.

## Worked example
**Problem:** The time to failure of a critical rocket engine component follows an Exponential distribution with a mean lifetime of 1000 hours. The component was inspected at 500 hours and was working perfectly. What is the probability that it will last for at least another 1000 hours?

**Solution:**
1.  **Define the random variable and distribution.** Let $T$ be the time to failure in hours. We are given that $T \sim \text{Exp}(\lambda)$. The mean of an Exponential distribution is $E[T] = 1/\lambda$. We are given $E[T] = 1000$, so $\lambda = 1/1000$. The PDF is $f(t) = \frac{1}{1000} e^{-t/1000}$ for $t \ge 0$.

2.  **Formulate the question mathematically.** We want to find the probability that the component lasts for at least another 1000 hours, *given* that it has already lasted 500 hours. This is a conditional probability: $P(T \ge 500 + 1000 \mid T \ge 500)$, which simplifies to $P(T \ge 1500 \mid T \ge 500)$.

3.  **Apply the Memoryless Property.** The key feature of the Exponential distribution is that it is "memoryless." This means $P(T \ge t_0 + t \mid T \ge t_0) = P(T \ge t)$. The past has no bearing on the future. The fact that the component has already survived for 500 hours is irrelevant to its future lifetime.

4.  **Calculate the simplified probability.** We can therefore simplify our problem:
    $$ P(T \ge 1500 \mid T \ge 500) = P(T \ge 1000) $$

5.  **Compute the integral.** Now we calculate $P(T \ge 1000)$ using the PDF.
    $$ P(T \ge 1000) = \int_{1000}^{\infty} f(t) dt = \int_{1000}^{\infty} \frac{1}{1000} e^{-t/1000} dt $$
    Let $u = -t/1000$, so $du = -1/1000 dt$. The integral becomes:
    $$ = \int_{t=1000}^{t=\infty} -e^u du = \left[ -e^{-t/1000} \right]_{1000}^{\infty} $$
    $$ = (-e^{-\infty}) - (-e^{-1000/1000}) = (0) - (-e^{-1}) = e^{-1} \approx 0.3679 $$

**Reflection:** Each step was necessary. Step 1 translated the problem statement into a precise mathematical model. Step 2 formulated the exact probabilistic question. Step 3 was the critical insight, applying the core conceptual property of the chosen distribution to simplify the problem dramatically. Steps 4 and 5 were the mechanical application of calculus to get the final number. Without the memoryless property, we would have had to compute $\frac{P(T \ge 1500 \cap T \ge 500)}{P(T \ge 500)} = \frac{P(T \ge 1500)}{P(T \ge 500)}$, which requires more integration but yields the same result.

## Diagrams
The two most important shapes to internalize are the Normal and Exponential PDFs.

**Normal Distribution PDF, $N(\mu, \sigma^2)$**
A symmetric bell curve centered at $\mu$. The standard deviation $\sigma$ controls the "spread" or "width" of the bell.
```text
      f(x)
        ^
        |
        |          .
        |         /|\
        |        / | \
        |       /  |  \
        |      /   |   \
        |     /    |    \
        +----|-----|-----|-------> x
            μ-σ    μ    μ+σ
```

**Exponential Distribution PDF, $\text{Exp}(\lambda)$**
A decaying curve starting at $f(0)=\lambda$ and approaching zero as $x \to \infty$. It is only defined for $x \ge 0$.
```text
      f(x)
        ^
      λ + .
        |  \
        |   \
        |    \
        |     `.
        |       `._
        +----------`-------------> x
          0
```

## Memory technique — remember this forever
1.  **The Story:** Imagine you're at a spaceport.
    *   A shuttle arrives at a completely random time in a 60-minute window. When? **Uniform**.
    *   You're waiting for a cosmic ray to hit a detector. The waiting time for the *next* one? **Exponential**.
    *   The waiting time for the *10th* cosmic ray? **Gamma**.
    *   You measure the final velocity of a launched rocket. The tiny variations from wind, fuel burn, etc., add up. The resulting distribution of velocities? **Normal**.
    *   You want to model your belief about the success probability of a new engine design, from 0 to 1. **Beta**.

2.  **Overlearn these two formulas:**
    *   **Normal PDF:** $f(x | \mu, \sigma^2) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}$
    *   **Exponential PDF:** $f(x | \lambda) = \lambda e^{-\lambda x}$ for $x \ge 0$.

3.  **Spaced Repetition Schedule:** Review these distributions and their properties (PDF, mean, variance, story) at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Actively re-derive one property (e.g., the mean of the Exponential) from the PDF at each review.

4.  **First Principles Pathway:** If you forget a formula, rebuild from the definition of expected value and the story. For the mean of the Exponential: "It's a waiting time. I know the PDF is $f(x) = \lambda e^{-\lambda x}$. The mean must be $E[X] = \int_0^\infty x \cdot (\lambda e^{-\lambda x}) dx$." This is an integral you can solve with integration by parts. This is your foundation.

## Common mistakes
1.  **Integrating outside the support.** Forgetting that the Exponential PDF is zero for $x < 0$, or that the Beta PDF is zero outside $[0, 1]$. If asked for $P(X < 2)$ for an Exponential variable, the integral is $\int_0^2 f(x)dx$, not $\int_{-\infty}^2 f(x)dx$.
2.  **Confusing rate and mean.** For the Exponential distribution, the parameter $\lambda$ is the *rate*. The mean (average waiting time) is $1/\lambda$. A high rate means a low mean, which is intuitive but easy to mix up.
3.  **Using $\sigma$ instead of $\sigma^2$.** The Normal distribution is parameterized by the mean $\mu$ and the *variance* $\sigma^2$. Be careful to take the square root to get the standard deviation $\sigma$ when needed, for instance in the PDF formula.
4.  **Treating the PDF value as a probability.** Stating that for $X \sim \text{Exp}(2)$, the "probability" of the event happening at time $t=0$ is $f(0)=2$. This is incorrect. The probability density is 2, but $P(X=0)=0$.

## Self-check
1.  A random number generator produces a number $X$ from a Uniform distribution on $[-5, 5]$. What is the PDF, $f(x)$? What is $P(0 < X < 5)$? What is $P(X > 10)$?
2.  The number of calls arriving at a help desk follows a Poisson process with a rate of 2 calls per minute. What is the probability that you have to wait more than 1 minute for the first call? What is the probability you have to wait more than 1 minute for the first call, given that you have already waited 30 seconds?
3.  A random variable $X$ follows a Beta distribution, $X \sim \text{Beta}(3, 1)$. Without performing any integration, what is its expected value, $E[X]$? What does the shape of its PDF look like on the interval $[0, 1]$? (Hint: think about the "successes" and "failures" interpretation).