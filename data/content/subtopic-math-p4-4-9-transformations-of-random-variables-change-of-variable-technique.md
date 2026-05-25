## What it is
The change-of-variable technique is a method for finding the probability density function (PDF) of a new random variable, $Y$, which is a function of an old random variable, $X$, whose PDF is already known. If $Y = g(X)$, and we know $f_X(x)$, this technique lets us find $f_Y(y)$. It is fundamentally about mapping probability densities from one space to another.

## Why it matters
This is not an abstract exercise; it's a core tool in simulation, statistics, and physics. In machine learning, it's used to generate samples from complex distributions starting from a simple uniform distribution (e.g., inverse transform sampling, Box-Muller transform). In physics, changing variables from momentum to kinetic energy ($E = p^2/2m$) requires transforming the momentum probability distribution into an energy distribution, which is essential in statistical mechanics.

## When to study it
You must be proficient with the following before proceeding:
1.  **Single-Variable Calculus:** Derivatives, integrals, the chain rule, and finding and differentiating inverse functions ($g^{-1}(y)$).
2.  **Foundational Probability:** You must have a rock-solid understanding of the distinction between a Cumulative Distribution Function (CDF), $F_X(x) = P(X \le x)$, and a Probability Density Function (PDF), $f_X(x) = F'_X(x)$. You must understand that probability is the *area* under the PDF, not the value of the PDF itself.

If any of these are weak, master them first. This topic builds directly upon them.

## How to study it (step by step)
1.  **Master the CDF Method.** This is the fundamental, always-correct approach. For a transformation $Y=g(X)$, write the definition of the CDF of Y: $F_Y(y) = P(Y \le y)$. Substitute $g(X)$ for $Y$ to get $P(g(X) \le y)$.
2.  **Isolate X.** Algebraically solve the inequality $g(X) \le y$ for $X$. Be careful with the direction of the inequality if you multiply or divide by a negative number. The result will be of the form $X \le g^{-1}(y)$ or $X \ge g^{-1}(y)$.
3.  **Express in terms of $F_X$.** Rewrite the probability from the previous step using the CDF of $X$. For example, $P(X \le g^{-1}(y))$ is simply $F_X(g^{-1}(y))$.
4.  **Differentiate to find the PDF.** Once you have $F_Y(y)$ expressed in terms of $F_X$, find the PDF of $Y$ by differentiating with respect to $y$: $f_Y(y) = \frac{d}{dy} F_Y(y)$. Use the chain rule.
5.  **Derive the Formula.** Use the CDF method for a strictly increasing function $g(X)$ to derive the general formula: $f_Y(y) = f_X(g^{-1}(y)) \frac{d}{dy}g^{-1}(y)$. Then, repeat for a strictly decreasing function to see where the absolute value comes from. This will solidify your understanding of the shortcut.
6.  **Solve a non-monotonic case.** Apply the CDF method to a function like $Y=X^2$ where $X$ can be positive or negative. Notice how $P(Y \le y)$ involves two regions for $X$ ($-\sqrt{y} \le X \le \sqrt{y}$), forcing you to sum contributions. This reveals the limitation of the simple formula and reinforces the power of the first-principles CDF method.

## Key ideas, with intuition
1.  **Conservation of Probability.** A change of variable squishes or stretches intervals. The probability contained in an interval must be conserved. If an interval $dx$ is stretched into a larger interval $dy$, the probability density must decrease in that new interval to keep the probability ($f(x)dx$) the same.
    $$f_X(x) |dx| \approx f_Y(y) |dy|$$
    This simple relationship is the heart of the matter. It tells you that the new density $f_Y(y)$ is the old density $f_X(x)$ scaled by the ratio of the interval lengths, $|dx/dy|$.

2.  **The CDF is the Invariant Bridge.** PDFs are densities; their values change when you re-parameterize the space. Probabilities, however, are invariant. The statement $P(Y \le y_0)$ refers to the same fundamental event regardless of how you label the variable. The CDF method works because it starts with this invariant quantity (probability) and only derives the context-dependent density (PDF) at the very end.

3.  **The Jacobian Factor is a Stretch Factor.** The term $|\frac{d}{dy} g^{-1}(y)|$ or $|dx/dy|$ is the "stretch factor." It's the 1D version of the Jacobian determinant from multivariable calculus. If this derivative is large, it means a small change in $y$ corresponds to a large change in $x$, so the original probability density from $x$ is being "spread thin" over $y$. If the derivative is small, the density is being "piled up." The absolute value is crucial because area must be positive.

## Worked example
Let $X$ be a random variable with a uniform distribution on $(0, 1)$, denoted $X \sim U(0,1)$. Its PDF is $f_X(x) = 1$ for $0 < x < 1$, and $0$ otherwise. Let the transformation be $Y = -\ln(X)$. Find the PDF of $Y$, $f_Y(y)$.

**Step 1: Determine the support of Y.**
As $x$ goes from $0 \to 1$, $\ln(x)$ goes from $-\infty \to 0$. Therefore, $y = -\ln(x)$ goes from $\infty \to 0$. The support of $Y$ is $(0, \infty)$.

**Step 2: Start with the CDF of Y.**
By definition:
$$F_Y(y) = P(Y \le y)$$
For $y > 0$:
$$F_Y(y) = P(-\ln(X) \le y)$$

**Step 3: Isolate X.**
$$P(\ln(X) \ge -y)$$
$$P(X \ge e^{-y})$$
The inequality flips when we multiply by $-1$. We exponentiate both sides to isolate $X$.

**Step 4: Express in terms of the CDF/PDF of X.**
Since $X$ is uniform on $(0,1)$, $P(X \ge a)$ is the length of the interval $[a, 1]$, which is $1-a$, for $0<a<1$. So:
$$P(X \ge e^{-y}) = 1 - P(X < e^{-y}) = 1 - F_X(e^{-y})$$
For $X \sim U(0,1)$, its CDF is $F_X(x)=x$ for $0<x<1$. Since $y>0$, $e^{-y}$ is between 0 and 1, so we can substitute:
$$F_Y(y) = 1 - e^{-y}$$

**Step 5: Differentiate to find the PDF of Y.**
$$f_Y(y) = \frac{d}{dy} F_Y(y) = \frac{d}{dy} (1 - e^{-y}) = -(-e^{-y}) = e^{-y}$$

**Final Result:**
The PDF of $Y$ is $f_Y(y) = e^{-y}$ for $y > 0$, and $0$ otherwise. This is the PDF of an Exponential distribution with rate parameter $\lambda=1$.

**Reflection:** Each step was necessary. Starting with the CDF provided a rigorous foundation. Isolating $X$ was the key algebraic manipulation. Using the known distribution of $X$ allowed us to evaluate the probability. Finally, differentiation, the fundamental relationship between CDF and PDF, gave us the answer. This process, known as inverse transform sampling, is a cornerstone of Monte Carlo simulation.

## Diagrams
Here is a mapping of infinitesimal intervals. A small interval $dx$ near $x=0$ gets stretched into a much larger interval $dy$. An interval near $x=1$ gets compressed.

```text
       f_X(x)
        ^
      1 +----------+
        |          |
        |          |
      0 +----------+------> x
        0    dx    1

           |
           | Y = -ln(X)
           V

       f_Y(y)
        ^
      1 +     \
        |      \
        |       \
      0 +--------+------> y
        0   dy   ...
```
The uniform probability mass in the small $dx$ near $x=1$ is mapped to the compressed (and thus higher density) region for small $y$. The probability mass in the $dx$ near $x=0$ is mapped to the stretched (and thus lower density) region for large $y$.

## Memory technique — remember this forever
1.  **The Mnemonic: "Probability Taffy."**
    Think of the PDF $f_X(x)$ as the thickness of a piece of taffy along an axis $x$. The transformation $Y=g(X)$ is you stretching or squishing that taffy. The formula $f_Y(y) = f_X(x) \left|\frac{dx}{dy}\right|$ is the recipe for the new thickness. The new thickness ($f_Y(y)$) is the old thickness ($f_X(x)$) adjusted by how much you stretched it ($|dx/dy|$). If you stretch it (stretch factor $|dx/dy| > 1$), it gets thinner. If you compress it ($|dx/dy| < 1$), it gets thicker.

2.  **Formulas to Overlearn:**
    For a monotonic (always increasing or always decreasing) function $Y=g(X)$ with inverse $X=g^{-1}(Y)$:
    $$f_Y(y) = f_X(g^{-1}(y)) \left| \frac{d}{dy} g^{-1}(y) \right|$$
    And the first principles definition that always works, even for non-monotonic functions:
    $$F_Y(y) = P(Y \le y)$$

3.  **Spaced Repetition Schedule:**
    Review this material and rework the example from scratch at: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:**
    If you forget the formula, never panic. Always fall back to the CDF method.
    *   Write $F_Y(y) = P(Y \le y)$.
    *   Substitute $Y = g(X)$.
    *   Solve for $X$.
    *   Express the probability in terms of $F_X$.
    *   Differentiate.
    This derivation is your safety net. It cannot fail you.

## Common mistakes
1.  **Forgetting the Absolute Value.** The term $\frac{d}{dy} g^{-1}(y)$ can be negative if $g$ is a decreasing function. A PDF can never be negative. The absolute value ensures the scaling factor is positive, conserving the sign of the probability density.
2.  **Forgetting the Jacobian Term Entirely.** Simply calculating $f_X(g^{-1}(y))$ is wrong. This is equivalent to assuming probability density is invariant, ignoring the "taffy stretching." It only works if $Y=X+c$, where the stretch factor is 1.
3.  **Mishandling Non-Monotonic Functions.** For a function like $Y=X^2$, two values of $x$ (e.g., $x_1 = -2$ and $x_2=2$) map to the same value of $y$ ($y=4$). When using the CDF method, $P(Y \le y) = P(X^2 \le y) = P(-\sqrt{y} \le X \le \sqrt{y})$. You must account for all regions of $X$ that map into the target region of $Y$. The simple formula fails here unless you sum the contributions from all inverse "branches".

## Self-check
1.  Let $X \sim N(0, 1)$ (standard normal distribution). Find the PDF of $Y = \sigma X + \mu$. What is this distribution called?
2.  Let $X \sim U(0, \pi/2)$. Find the PDF of $Y = \tan(X)$.
3.  Let $X \sim N(0, 1)$. Find the PDF of $Y = X^2$. (Hint: Be careful with the support of Y and the fact that two $x$ values map to one $y$ value).