## What it is
A discrete random variable is a function that maps the outcomes of a random experiment to a countable set of numbers (e.g., integers). The Probability Mass Function (PMF) gives the probability that the variable takes on a specific value. The Cumulative Distribution Function (CDF) gives the probability that the variable takes on a value less than or equal to a specific value.

## Why it matters
Discrete random variables are the foundation for modeling any system with countable states. In computer science, this includes network packet arrivals or the number of bit errors in a transmission. In quantum mechanics, energy levels of atoms are quantized and thus modeled as discrete random variables. In aerospace, the number of successful engine ignitions in a multi-engine launch vehicle is a discrete random variable critical for mission success probability calculations.

## When to study it
You must be comfortable with the following before proceeding:
1.  **Set Theory:** Sample spaces ($\Omega$), events, unions, intersections, and complements.
2.  **Axioms of Probability:** The three fundamental axioms (non-negativity, normalization, additivity for disjoint events).
3.  **Functions:** The definition of a function, its domain, and its codomain.

If any of these are weak, review them first. Otherwise, you will build on a faulty foundation.

## How to study it (step by step)
1.  **Define a simple experiment.** Consider flipping a fair coin three times. Write down the sample space $\Omega$. It has $2^3 = 8$ outcomes: {HHH, HHT, HTH, THH, HTT, THT, TTH, TTT}.
2.  **Define a random variable.** Let $X$ be the number of heads in the three flips. This $X$ is a discrete random variable. What are the possible values $X$ can take? List them.
3.  **Derive the PMF.** For each possible value $k$ that $X$ can take, calculate $p_X(k) = P(X=k)$. For example, to find $P(X=2)$, count the outcomes in $\Omega$ with exactly two heads and divide by the total number of outcomes. Do this for all possible $k$.
4.  **Verify PMF properties.** Check that for all your calculated probabilities, $p_X(k) \ge 0$. Then, check that $\sum_k p_X(k) = 1$. If it doesn't, you have made an error.
5.  **Derive the CDF.** The CDF is $F_X(x) = P(X \le x)$. Calculate $F_X(k)$ for each integer $k$ from 0 upwards by summing the PMF values: $F_X(k) = \sum_{i \le k} p_X(i)$.
6.  **Plot both functions.** Sketch the PMF as a bar chart (or stem plot) and the CDF as a step function. Observe the shape of each. Notice how the height of the steps in the CDF corresponds to the values of the PMF.

## Key ideas, with intuition
1.  **A Random Variable is a Function, not a Variable.** A random variable $X$ is a deterministic function mapping outcomes from the sample space $\Omega$ to the real numbers $\mathbb{R}$. The "randomness" is in which outcome $\omega \in \Omega$ occurs, not in the function itself. For a discrete RV, the range is a countable set.
    $$ X: \Omega \to \{x_1, x_2, x_3, \dots\} \subset \mathbb{R} $$
    *Intuition:* Think of it as a measurement device. The experiment runs, an outcome occurs, and the device reads a number. The device itself is fixed (the function), but the reading depends on the random outcome.

2.  **The PMF is a Distribution of Mass.** The Probability Mass Function, $p_X(k)$, tells you how much probability "mass" is located at each specific point $k$.
    $$ p_X(k) = P(X=k) $$
    The total mass must be 1, which is why the sum over all possible values is 1.
    $$ \sum_{k} p_X(k) = 1 $$
    *Intuition:* Imagine a 1 kg metal bar. The PMF tells you how to break that bar into a finite or countably infinite number of point masses and where to place them on the number line.

3.  **The CDF is an Accumulation of Mass.** The Cumulative Distribution Function, $F_X(x)$, tells you the total probability mass accumulated as you scan from left to right along the number line, up to and including point $x$.
    $$ F_X(x) = P(X \le x) = \sum_{k \le x} p_X(k) $$
    *Intuition:* For a discrete variable, this function is a step function. It is flat between the possible values of $X$ because no new mass is being added. At each value $k$ where $p_X(k) > 0$, the CDF "jumps" up by exactly the amount of mass at that point, $p_X(k)$.

## Worked example
Let's model the outcome of a single roll of a fair six-sided die.

**1. Define the experiment and random variable.**
The sample space is $\Omega = \{1, 2, 3, 4, 5, 6\}$. Let the random variable $X$ be the number showing on the die. So, $X$ can take values in the set $\{1, 2, 3, 4, 5, 6\}$.

**2. Derive the PMF.**
Since the die is fair, each outcome is equally likely with probability $1/6$.
The PMF, $p_X(k) = P(X=k)$, is:
$$
p_X(k) =
\begin{cases}
1/6 & \text{if } k \in \{1, 2, 3, 4, 5, 6\} \\
0 & \text{otherwise}
\end{cases}
$$
We can verify that $\sum_{k=1}^{6} p_X(k) = \sum_{k=1}^{6} \frac{1}{6} = 6 \times \frac{1}{6} = 1$.

**3. Derive the CDF.**
The CDF, $F_X(x) = P(X \le x)$, is calculated by summing the PMF values.
-   For $x < 1$: $F_X(x) = P(X \le x) = 0$.
-   For $1 \le x < 2$: $F_X(x) = P(X \le x) = P(X=1) = 1/6$.
-   For $2 \le x < 3$: $F_X(x) = P(X \le x) = P(X=1) + P(X=2) = 1/6 + 1/6 = 2/6$.
-   ...
-   For $5 \le x < 6$: $F_X(x) = P(X \le 5) = 5/6$.
-   For $x \ge 6$: $F_X(x) = P(X \le 6) = 6/6 = 1$.

So, the CDF is a step function. For example, $F_X(3.7) = P(X \le 3.7) = P(X=1) + P(X=2) + P(X=3) = 3/6 = 1/2$.

**Reflection:**
- Step 1 clearly defined the model.
- Step 2 derived the probability of each specific outcome from the problem statement (a fair die). We verified it summed to 1, a crucial sanity check.
- Step 3 built the cumulative function directly from the PMF, showing how probability accumulates. The calculation for a non-integer value like $3.7$ demonstrates that the CDF holds its value between the discrete "jumps".

## Diagrams
Here are the PMF and CDF for the fair die example.

**Probability Mass Function (PMF)**
A stem plot showing the "mass" at each point.
```text
p(k)
^
|
1/6 +--*-----*-----*-----*-----*-----*
|  |     |     |     |     |     |
|  |     |     |     |     |     |
+-------------------------------------> k
   1     2     3     4     5     6
```

**Cumulative Distribution Function (CDF)**
A step function showing the accumulated probability. The open circle `o` means the point is not included, the closed circle `*` means it is.
```text
F(x)
^
1.0 +-----------------------------*
    |                             |
5/6 +-----------------------o     *
    |                       |     |
4/6 +-----------------o     *     *
    |                 |     |     |
3/6 +-----------o     *     *     *
    |           |     |     |     |
2/6 +-----o     *     *     *     *
    |     |     |     |     |     |
1/6 o-----*     *     *     *     *
    |
+-------------------------------------> x
    1     2     3     4     5     6
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:**
    -   **PMF** is a **P**ile of **M**ass at a **F**ew points. Think of it as a blueprint for placing discrete, heavy weights on a number line.
    -   **CDF** is **C**limbing **D**iscrete **F**unction. Imagine walking along the number line from negative infinity. Your altitude is zero until you hit the first weight (the first point with non-zero probability), where you instantly jump up. You stay at that altitude until the next weight, where you jump again. The CDF is a record of your altitude.

2.  **Must-learn formulas:**
    $$ p_X(k) = P(X=k) \quad (\text{PMF: Probability at a point}) $$
    $$ F_X(x) = P(X \le x) = \sum_{k \le x} p_X(k) \quad (\text{CDF: Cumulative probability up to a point}) $$
    $$ \sum_{\text{all } k} p_X(k) = 1 \quad (\text{Total probability is one}) $$

3.  **Spaced repetition schedule:**
    Review these definitions and re-derive the fair die example from scratch at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Do not just read it; reproduce it.

4.  **First principles pathway:**
    If you forget everything, start from the axioms of probability. An event like $\{X \le x\}$ can be written as the union of disjoint events $\{X=k\}$ for all possible values $k \le x$. By the additivity axiom, $P(X \le x) = P(\bigcup_{k \le x} \{X=k\}) = \sum_{k \le x} P(X=k)$. This directly rebuilds the CDF formula from the PMF definition and the axioms.

## Common mistakes
1.  **Treating the CDF as continuous.** For a discrete RV, the CDF is a step function. It is not a smooth line connecting the points. $F_X(2.5)$ is exactly equal to $F_X(2)$, not some interpolated value.
2.  **Incorrect summation for the CDF.** Writing $F_X(x) = p_X(x)$. The CDF is a sum up to $x$, not the value of the PMF at $x$.
3.  **Forgetting the PMF must sum to 1.** This is the most common tool for solving for unknown parameters in a PMF definition. If your PMF doesn't sum to 1, it is not a valid PMF.
4.  **Confusing $P(X \le k)$ and $P(X < k)$.** For discrete variables, these are different. $P(X < k) = P(X \le k) - P(X=k) = F_X(k) - p_X(k)$. This distinction is critical.

## Self-check
1.  A discrete random variable $Y$ has the following PMF: $p_Y(0)=0.1$, $p_Y(1)=0.3$, $p_Y(2)=0.4$, $p_Y(3)=0.2$. What is $F_Y(2.1)$? What is $P(1 \le Y < 3)$?
2.  You draw two cards from a standard 52-card deck without replacement. Let the random variable $N$ be the number of aces you draw. Derive the PMF and CDF of $N$.
3.  A random variable $K$ can take values $\{1, 2, 3, 4\}$. Its PMF is given by $p_K(k) = c \cdot k^2$ for some constant $c$. First, find the value of $c$. Then, calculate $P(K > 2)$.