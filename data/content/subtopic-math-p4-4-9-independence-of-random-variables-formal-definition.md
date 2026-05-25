## What it is
Two random variables $X$ and $Y$ are independent if knowing the outcome of one provides no information about the outcome of the other. Formally, this means their joint probability distribution is simply the product of their individual (marginal) distributions.

## Why it matters
Independence is a foundational simplifying assumption in modeling complex systems. In machine learning, the "Naive" in Naive Bayes classification comes from the assumption that all feature variables are independent. In statistical mechanics, the behavior of an ideal gas is modeled by assuming the velocities of individual particles are independent random variables. In aerospace engineering, the reliability of a system with redundant components is often calculated by assuming the failure of each component is an independent event.

## When to study it
Before tackling this, you must have a firm grasp of the following concepts. If any of these are weak, review them first.
- Sample spaces, events, and probability axioms.
- Random variables (both discrete and continuous).
- Probability Mass Functions (PMFs) for discrete random variables.
- Probability Density Functions (PDFs) for continuous random variables.
- Cumulative Distribution Functions (CDFs).
- Joint and marginal distributions (for both PMFs and PDFs).

## How to study it (step by step)
1.  **Review independence of events.** Recall that two events $A$ and $B$ are independent if and only if $P(A \cap B) = P(A)P(B)$. This is the conceptual seed for everything that follows.
2.  **Connect events to random variables.** A statement like "$X=x$" is an event—it's the set of all outcomes $\omega$ in the sample space such that $X(\omega) = x$. The statement "$X \le x$" is also an event. Independence of random variables means that events defined by $X$ are independent of events defined by $Y$.
3.  **Derive the discrete case.** Let $X$ and $Y$ be discrete random variables. For them to be independent, the event $\{X=x\}$ must be independent of the event $\{Y=y\}$ for all possible values $x$ and $y$. Applying the rule for events: $P(X=x \text{ and } Y=y) = P(X=x)P(Y=y)$. This is simply $p_{X,Y}(x,y) = p_X(x)p_Y(y)$.
4.  **Derive the continuous case.** For continuous variables, the probability of any single point is zero. Instead, we use events like $\{a \le X \le b\}$. The most fundamental statement of independence uses the Cumulative Distribution Function (CDF), as $F_X(x) = P(X \le x)$. The event $\{X \le x\}$ must be independent of $\{Y \le y\}$ for all $x, y$. This gives the master definition: $F_{X,Y}(x,y) = F_X(x)F_Y(y)$. By differentiating this with respect to $x$ and then $y$, we get the more common PDF form: $f_{X,Y}(x,y) = f_X(x)f_Y(y)$.
5.  **Solve a simple verification problem.** Find a joint PMF presented in a table. Calculate the marginal PMFs by summing the rows and columns. Then, check if the joint probability in *every single cell* equals the product of its corresponding row and column marginals. If even one cell fails, they are not independent.

## Key ideas, with intuition
1.  **Factorization is the key.** The single most important idea is that the joint distribution factors into the product of the marginals. This is the computational test for independence.
    -   **Discrete:** $p_{X,Y}(x,y) = p_X(x)p_Y(y)$ for all $x, y$.
    -   **Continuous:** $f_{X,Y}(x,y) = f_X(x)f_Y(y)$ for all $x, y$.
    -   **General (using CDFs):** $F_{X,Y}(x,y) = F_X(x)F_Y(y)$ for all $x, y$.

2.  **Information is inert.** Independence means that conditioning on one variable does not alter the probability distribution of the other. If $X$ and $Y$ are independent, then the conditional probability $P(Y=y | X=x)$ is just $P(Y=y)$. The information that $X=x$ is irrelevant to the probabilities of $Y$.
    $$
    p_{Y|X}(y|x) = \frac{p_{X,Y}(x,y)}{p_X(x)} = \frac{p_X(x)p_Y(y)}{p_X(x)} = p_Y(y)
    $$

3.  **Geometry: Rectangular Support.** For continuous variables, a necessary (but not sufficient) condition for independence is that the support of the joint PDF (the region where it's non-zero) must be a rectangle. If the support is a triangle, a circle, or any non-rectangular shape, the variables are dependent. This is because the range of possible values for $Y$ depends on the specific value of $X$, which violates independence.

## Worked example
Let $X$ and $Y$ be discrete random variables with the following joint PMF, $p_{X,Y}(x,y)$:

|      | y=0  | y=1  |
| :--- | :--- | :--- |
| **x=0** | 0.1  | 0.2  |
| **x=1** | 0.3  | 0.4  |

Are $X$ and $Y$ independent?

**Step 1: Calculate the marginal PMFs.**
The marginal PMF for $X$, $p_X(x)$, is found by summing across the rows.
-   $p_X(0) = P(X=0) = p_{X,Y}(0,0) + p_{X,Y}(0,1) = 0.1 + 0.2 = 0.3$
-   $p_X(1) = P(X=1) = p_{X,Y}(1,0) + p_{X,Y}(1,1) = 0.3 + 0.4 = 0.7$
(Check: $0.3 + 0.7 = 1.0$)

The marginal PMF for $Y$, $p_Y(y)$, is found by summing down the columns.
-   $p_Y(0) = P(Y=0) = p_{X,Y}(0,0) + p_{X,Y}(1,0) = 0.1 + 0.3 = 0.4$
-   $p_Y(1) = P(Y=1) = p_{X,Y}(0,1) + p_{X,Y}(1,1) = 0.2 + 0.4 = 0.6$
(Check: $0.4 + 0.6 = 1.0$)

**Step 2: Test the factorization condition for all (x, y) pairs.**
The condition for independence is $p_{X,Y}(x,y) = p_X(x)p_Y(y)$. We must check this for every cell in the table.
-   **(x=0, y=0):** Is $p_{X,Y}(0,0) = p_X(0)p_Y(0)$?
    -   LHS: $0.1$
    -   RHS: $(0.3)(0.4) = 0.12$
    -   $0.1 \ne 0.12$. The condition fails.

**Step 3: Conclude.**
Since the factorization condition fails for the cell $(x=0, y=0)$, the random variables $X$ and $Y$ are **not independent**. We do not need to check any other cells; a single failure is sufficient to prove dependence.

**Reflection:** The process is mechanical. First, compute the marginals, which represent the standalone probability distributions of each variable. Second, use the marginals to compute what the joint probabilities *would be* if the variables were independent. Finally, compare this hypothetical independent world to the actual joint probabilities given. If they don't match everywhere, there is some interaction or dependence between the variables.

## Diagrams
A joint PMF table with its marginals calculated. Independence holds if and only if every cell `p(x,y)` is the product of its `p(x)` and `p(y)`.

```text
       y=y1     y=y2    ...    y=yn   | MARGINAL p(x)
      +--------+--------+-----+--------+---------------->
x=x1  | p(x1,y1) p(x1,y2) ...  p(x1,yn) | p(x1)
x=x2  | p(x2,y1) p(x2,y2) ...  p(x2,yn) | p(x2)
...   |  ...      ...    ...    ...   | ...
x=xm  | p(xm,y1) p(xm,y2) ...  p(xm,yn) | p(xm)
      +--------+--------+-----+--------+
      |        |        |     |
      V        V        V     V
MARGINAL p(y1)   p(y2)   ...  p(yn)
  p(y)
```

For continuous variables, independence requires a rectangular support.

```text
       y-axis
        ^
        |
      d +-----------------+
        |                 |
        |   Support of    |
        |  f(x,y) is here |
      c +-----------------+
        +-----------------|--------> x-axis
        a                 b

Dependent case (e.g., triangular support):
       y-axis
        ^
        |
      d +--.
        |   `.
        |     `.  Support
        |       `.
      c +---------`-------+--------> x-axis
        a                 b
```

## Memory technique — remember this forever
1.  **The Story:** Think of two isolated workshops, one for $X$ and one for $Y$. The "marginal" probabilities $p_X(x)$ and $p_Y(y)$ are the blueprints for what each workshop produces on its own. The "joint" probability $p_{X,Y}(x,y)$ is the blueprint for a combined project. If the variables are **independent**, the workshops don't communicate; to get the combined blueprint, you just staple their individual blueprints together—you **multiply** their probabilities. If they are dependent, one workshop has to call the other, and the blueprint is more complex than a simple product.

2.  **Formulas to overlearn:**
    $$
    F_{X,Y}(x,y) = F_X(x)F_Y(y) \quad \text{(The Master Definition)}
    $$
    $$
    p_{X,Y}(x,y) = p_X(x)p_Y(y) \quad \text{(Discrete Workhorse)}
    $$
    $$
    f_{X,Y}(x,y) = f_X(x)f_Y(y) \quad \text{(Continuous Workhorse)}
    $$

3.  **Spaced Repetition Schedule:** Review this concept and re-derive the PMF/PDF formulas from the CDF definition at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, rebuild from the independence of *events*.
    -   Start with $P(A \cap B) = P(A)P(B)$.
    -   Define the events as $A = \{X \le x\}$ and $B = \{Y \le y\}$.
    -   Substitute them in: $P(\{X \le x\} \cap \{Y \le y\}) = P(X \le x)P(Y \le y)$.
    -   Recognize these are the definitions of the CDFs: $F_{X,Y}(x,y) = F_X(x)F_Y(y)$.
    -   From this CDF definition, you can derive the PMF and PDF versions.

## Common mistakes
1.  **Confusing Independence with Mutually Exclusive.** Two events $A$ and $B$ are mutually exclusive if $A \cap B = \emptyset$. If $P(A)>0$ and $P(B)>0$, they cannot be independent, because if you know $A$ occurred, you know for certain that $B$ did not occur. $P(B|A) = 0 \ne P(B)$.
2.  **Checking only one point.** You must verify that $p_{X,Y}(x,y) = p_X(x)p_Y(y)$ or $f_{X,Y}(x,y) = f_X(x)f_Y(y)$ for **all** possible values of $x$ and $y$. Finding a single counterexample is enough to prove dependence.
3.  **Assuming Uncorrelated implies Independent.** Two variables having zero covariance (or correlation) means $E[XY] = E[X]E[Y]$. Independence implies zero correlation. However, the converse is not true in general. It is possible for variables to be dependent but have zero correlation. (The classic counterexample is $X \sim \text{Uniform}(-1,1)$ and $Y=X^2$).

## Self-check
1.  The joint PMF of $X$ and $Y$ is given by $p_{X,Y}(x,y) = c(x+y)$ for $x \in \{1,2\}$ and $y \in \{1,2\}$, and is zero otherwise. First, find the constant $c$. Then, determine if $X$ and $Y$ are independent.
2.  The joint PDF of $X$ and $Y$ is $f_{X,Y}(x,y) = 2$ for $x > 0, y > 0, x+y < 1$, and is zero otherwise. Without doing any calculations, can you determine if $X$ and $Y$ are independent? Why?
3.  Let $X$ and $Y$ be independent random variables. Let $g$ and $h$ be any two functions. Prove that the random variables $U=g(X)$ and $V=h(Y)$ are also independent.