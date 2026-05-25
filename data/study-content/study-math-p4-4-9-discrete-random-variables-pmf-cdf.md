## 1. What it is — in plain English

Imagine you're playing a game, like rolling a die or flipping a coin. The outcome of these actions is uncertain – you don't know what you'll get before you do it. A "random variable" is simply a way to turn these uncertain outcomes into numbers. For instance, if you flip a coin, you might say "Heads" is 1 and "Tails" is 0. If you roll a die, the number that shows up (1, 2, 3, 4, 5, or 6) is already a number, so that's your random variable.

Now, a "discrete random variable" is a special kind of random variable where the numbers it can take on are countable. Think of distinct, separate values, like the integers 0, 1, 2, 3, or the numbers you get when rolling a die. You can't get a 2.5 when rolling a die; it's always a whole number. There are "gaps" between the possible values.

The "Probability Mass Function" (PMF) is like a detailed map that tells you exactly how likely each specific, countable outcome of your random variable is. If your random variable is the number of heads in two coin flips (0, 1, or 2), the PMF would tell you the probability of getting exactly 0 heads, exactly 1 head, and exactly 2 heads. It's about the "mass" of probability concentrated at each single point.

Finally, the "Cumulative Distribution Function" (CDF) is like a running total of probabilities. Instead of just asking "What's the chance of getting exactly 1 head?", the CDF asks, "What's the chance of getting 1 head *or less*?" It tells you the probability that your random variable will take on a value less than or equal to a certain number. It "accumulates" probabilities as you move up the possible values.

## 2. Why it matters — real-world applications

Understanding discrete random variables, PMFs, and CDFs is fundamental because it allows us to quantify and reason about uncertainty in situations where outcomes are countable. This has vast implications across many fields:

1.  **Quality Control and Manufacturing (e.g., Intel, Boeing):** Companies like Intel, which produce microprocessors, need to know the probability of a certain number of defective chips appearing in a batch. If $X$ is the number of defects in 100 chips, $X$ is a discrete random variable. The PMF $P(X=k)$ tells them the likelihood of exactly $k$ defects, which helps in setting quality standards and identifying production issues. Similarly, Boeing might use these concepts to model the number of faulty rivets in an aircraft wing section to ensure safety and reliability.

2.  **Telecommunications and Network Engineering (e.g., Cisco, Google):** In data transmission, errors can occur. If $X$ is the number of corrupted packets received over a network connection in a minute, $X$ is a discrete random variable. Network engineers at Cisco or Google use PMFs to model the probability of $k$ errors occurring, which informs the design of error-correction codes and network protocols to ensure reliable data delivery. The CDF can tell them the probability of having "at most" a certain number of errors, which is critical for service level agreements.

3.  **Genetics and Bioinformatics (e.g., Pfizer, academic research):** When studying mutations in DNA or the effectiveness of a new drug, discrete random variables are essential. For example, if $X$ is the number of specific genetic mutations in a sample of 100 individuals, or the number of patients out of 50 who respond positively to a new treatment, $X$ is discrete. Researchers at Pfizer or in university labs use PMFs to understand the distribution of these counts, helping them assess disease prevalence or drug efficacy. The CDF might tell them the probability of observing "fewer than or equal to" a certain number of responders, guiding clinical trial interpretations.

4.  **Finance and Insurance (e.g., AIG, Goldman Sachs):** Insurance companies like AIG rely heavily on these concepts to calculate premiums. If $X$ is the number of insurance claims filed in a given month for a particular policy type, $X$ is a discrete random variable. Actuaries use PMFs to estimate the probability of different numbers of claims, which directly impacts how much to charge customers to remain profitable. Investment banks like Goldman Sachs might use similar models to assess the number of discrete market events (e.g., stock price jumps or crashes) within a trading period to manage risk.

## 3. Prerequisites — what you must know first

Before diving deep into discrete random variables, PMFs, and CDFs, ensure you have a solid grasp of the following foundational concepts. If any of these feel unfamiliar, it's highly recommended to review them first.

*   **Set Theory Basics:**
    *   **Sets and Elements:** Understanding what a set is (a collection of distinct objects) and what an element is (an object within a set).
    *   **Subsets:** Knowing when one set is contained within another.
    *   **Union ($\cup$) and Intersection ($\cap$):** How to combine or find common elements between sets.
    *   **Empty Set ($\emptyset$):** The set containing no elements.
*   **Basic Probability:**
    *   **Sample Space ($\Omega$):** The set of all possible outcomes of a random experiment.
    *   **Events:** A subset of the sample space (a specific outcome or group of outcomes).
    *   **Probability of an Event ($P(A)$):** The likelihood of an event $A$ occurring, always between 0 and 1.
    *   **Axioms of Probability:** The fundamental rules probabilities must follow (non-negativity, sum to 1 for sample space, additivity for disjoint events).
    *   **Conditional Probability ($P(A|B)$):** The probability of event $A$ occurring given that event $B$ has already occurred.
*   **Functions:**
    *   **Definition:** A rule that assigns each input (from its domain) to exactly one output (in its codomain/range).
    *   **Domain, Codomain, Range:** Understanding the set of possible inputs, the set where outputs can lie, and the actual set of outputs.
    *   **Mapping:** How inputs are transformed into outputs.
*   **Summation Notation ($\sum$):**
    *   **Definition:** How to represent and calculate the sum of a sequence of numbers. For example, $\sum_{i=1}^{n} a_i = a_1 + a_2 + \dots + a_n$.
*   **Inequalities:**
    *   **Symbols:** Understanding $<, \le, >, \ge$ and their meanings (less than, less than or equal to, greater than, greater than or equal to).
    *   **Intervals:** How to represent ranges of numbers using inequalities, e.g., $x \le 5$.

## 4. The core idea — step by step

Let's build up the concepts of discrete random variables, PMF, and CDF step-by-step, starting from the most basic ideas and gradually adding mathematical rigor.

### Step 1: Random Variables - Quantifying Uncertainty

*   **Plain English Statement:** A random variable is essentially a numerical summary of the outcome of a random experiment. Instead of describing an outcome with words (like "Heads" or "Red card"), we assign a number to it. This makes it easier to do math with probabilities.
*   **Small Concrete Example:** Imagine you're flipping a coin twice. The raw outcomes are sequences like HH, HT, TH, TT. Let's define a random variable $X$ as "the number of heads in two flips".
    *   If the outcome is TT, $X$ takes the value 0.
    *   If the outcome is HT or TH, $X$ takes the value 1.
    *   If the outcome is HH, $X$ takes the value 2.
    So, $X$ can take on the values $\{0, 1, 2\}$.
*   **Formal/Mathematical Version:** A random variable $X$ is a function $X: \Omega \to \mathbb{R}$ that maps each outcome $\omega$ in the sample space $\Omega$ to a unique real number.
    In our coin flip example:
    *   $\Omega = \{\text{HH, HT, TH, TT}\}$
    *   $X(\text{TT}) = 0$
    *   $X(\text{HT}) = 1$
    *   $X(\text{TH}) = 1$
    *   $X(\text{HH}) = 2$
    The set of all possible values that $X$ can take is called the **range** of $X$, denoted $R_X$. In this case, $R_X = \{0, 1, 2\}$.
*   **What Could Go Wrong:** A common mistake is to confuse the random variable itself (which is a *function* or a *rule*) with the specific values it can take. $X$ is the rule "number of heads"; $x$ is a specific value like 0, 1, or 2.

### Step 2: Discrete vs. Continuous Random Variables

*   **Plain English Statement:** Random variables come in two main flavors: discrete and continuous. A **discrete random variable** can only take on specific, separate values – you can count them. Think of steps on a staircase. A **continuous random variable** can take on any value within a given range, no matter how small the increments. Think of a smooth ramp.
*   **Small Concrete Example:**
    *   **Discrete:**
        *   The number of cars passing a specific point on a road in an hour (can be 0, 1, 2, ..., but not 1.5 cars).
        *   The number of defective items in a batch of 100 (can be 0, 1, ..., 100, but not 5.7 defects).
    *   **Continuous:**
        *   The height of a randomly selected person (could be 175 cm, 175.3 cm, 175.38 cm, etc.).
        *   The time it takes for a battery to die (could be 10.2 hours, 10.25 hours, etc.).
*   **Formal/Mathematical Version:** A random variable $X$ is **discrete** if its range $R_X$ is a countable set. A countable set is one that is either finite (like $\{0, 1, 2\}$) or countably infinite (like the set of all non-negative integers $\{0, 1, 2, \dots\}$).
*   **What Could Go Wrong:** Assuming all random variables are discrete. Many real-world measurements (like time, weight, temperature) are inherently continuous, and require different tools (Probability Density Functions).

### Step 3: Probability Mass Function (PMF) - The Likelihood of Each Specific Outcome

*   **Plain English Statement:** For a discrete random variable, the PMF tells you the exact probability for *each* of its possible values. It's like a list or a table where for every number the random variable can be, you get its specific chance of happening.
*   **Small Concrete Example:** Let's go back to our two-coin flip example, where $X$ is the number of heads, $R_X = \{0, 1, 2\}$. Assuming fair coins:
    *   $P(X=0)$ (outcome TT): There's 1 way to get 0 heads (TT) out of 4 total outcomes. So, $P(X=0) = 1/4$.
    *   $P(X=1)$ (outcomes HT, TH): There are 2 ways to get 1 head (HT, TH) out of 4 total outcomes. So, $P(X=1) = 2/4 = 1/2$.
    *   $P(X=2)$ (outcome HH): There's 1 way to get 2 heads (HH) out of 4 total outcomes. So, $P(X=2) = 1/4$.
    This collection of probabilities is the PMF. We often denote it as $p_X(x)$.
    So, $p_X(0)=1/4$, $p_X(1)=1/2$, $p_X(2)=1/4$.
*   **Formal/Mathematical Version:** For a discrete random variable $X$, its Probability Mass Function (PMF), denoted $p_X(x)$ (or sometimes $f_X(x)$ or simply $P(X=x)$), is a function that satisfies the following properties:
    1.  **Non-negativity:** $p_X(x) \ge 0$ for all $x \in \mathbb{R}$. This means probabilities cannot be negative.
    2.  **Normalization (Sum to One):** $\sum_{x \in R_X} p_X(x) = 1$. The sum of all probabilities for all possible values of $X$ must equal 1 (certainty).
    3.  **Zero for impossible values:** $p_X(x) = 0$ for any $x \notin R_X$. If a value is not in the range of $X$, its probability is zero.
    For our example:
    1.  $1/4 \ge 0$, $1/2 \ge 0$. (Satisfied)
    2.  $p_X(0) + p_X(1) + p_X(2) = 1/4 + 1/2 + 1/4 = 1$. (Satisfied)
    3.  $p_X(5) = 0$ because 5 is not a possible number of heads in two flips. (Satisfied)
*   **What Could Go Wrong:** The most common errors are defining a PMF where the probabilities don't sum to 1, or where some probabilities are negative. Also, remember that the PMF only assigns positive probability to the *discrete* values in $R_X$.

### Step 4: Cumulative Distribution Function (CDF) - The Likelihood of "Up To" an Outcome

*   **Plain English Statement:** The CDF tells you the probability that the random variable $X$ will take on a value *less than or equal to* a certain number $x$. It's a running total of probabilities, accumulating the "mass" as you move along the number line.
*   **Small Concrete Example:** Using the two-coin flip example ($X$ = number of heads, $R_X = \{0, 1, 2\}$):
    *   $F_X(0) = P(X \le 0) = P(X=0) = 1/4$. (The chance of 0 heads or less is just the chance of 0 heads).
    *   $F_X(0.5) = P(X \le 0.5) = P(X=0) = 1/4$. (Since $X$ can only be 0, 1, 2, any value between 0 and 1 means only 0 heads is possible).
    *   $F_X(1) = P(X \le 1) = P(X=0) + P(X=1) = 1/4 + 1/2 = 3/4$. (The chance of 1 head or less is the chance of 0 heads plus the chance of 1 head).
    *   $F_X(1.9) = P(X \le 1.9) = P(X=0) + P(X=1) = 1/4 + 1/2 = 3/4$.
    *   $F_X(2) = P(X \le 2) = P(X=0) + P(X=1) + P(X=2) = 1/4 + 1/2 + 1/4 = 1$. (The chance of 2 heads or less is the chance of 0, 1, or 2 heads, which covers all possibilities, so it's 1).
    *   $F_X(3) = P(X \le 3) = P(X=0) + P(X=1) + P(X=2) = 1$. (Any value greater than or equal to the maximum possible value will have a CDF of 1).
*   **Formal/Mathematical Version:** For a discrete random variable $X$, its Cumulative Distribution Function (CDF), denoted $F_X(x)$, is defined for all real numbers $x \in \mathbb{R}$ as:
    $$F_X(x) = P(X \le x) = \sum_{t \le x, t \in R_X} p_X(t)$$
    The properties of a CDF are:
    1.  **Range:** $0 \le F_X(x) \le 1$ for all $x \in \mathbb{R}$.
    2.  **Non-decreasing:** If $a < b$, then $F_X(a) \le F_X(b)$. As you move right on the number line, the accumulated probability can only stay the same or increase.
    3.  **Limits at Infinities:**
        *   $\lim_{x \to -\infty} F_X(x) = 0$. As $x$ goes to negative infinity, the probability of $X$ being less than or equal to it approaches zero.
        *   $\lim_{x \to \infty} F_X(x) = 1$. As $x$ goes to positive infinity, the probability of $X$ being less than or equal to it approaches one (all possible outcomes are included).
    4.  **Right-Continuity:** $F_X(x)$ is right-continuous. This means that at any point $x_0$, $F_X(x_0) = \lim_{x \to x_0^+} F_X(x)$. For discrete variables, this means the "jumps" in the CDF occur *at* the values $x$ in $R_X$, and the function holds the lower value until it reaches the jump point.
*   **What Could Go Wrong:** A common error is defining the CDF only for the discrete values in $R_X$. The CDF is defined for *all* real numbers. Another trap is forgetting that it's cumulative and non-decreasing.

### Step 5: Relating PMF and CDF

*   **Plain English Statement:** The PMF and CDF are two sides of the same coin. If you have one, you can always find the other. The PMF tells you the probability at each specific point, and the CDF is the sum of these probabilities up to a certain point. Conversely, if you have the CDF, you can find the PMF by looking at how much the probability "jumps" at each discrete value.
*   **Small Concrete Example:**
    *   **From PMF to CDF:** We already did this in Step 4. $F_X(x)$ is the sum of $p_X(t)$ for all $t \le x$.
    *   **From CDF to PMF:** If we know $F_X(x)$ for our two-coin flip example:
        *   $F_X(0) = 1/4$
        *   $F_X(1) = 3/4$
        *   $F_X(2) = 1$
        The possible values for $X$ are the points where the CDF "jumps": 0, 1, 2.
        *   $p_X(0) = F_X(0) - F_X(\text{value just before 0}) = 1/4 - 0 = 1/4$. (Assuming $F_X(x)=0$ for $x<0$).
        *   $p_X(1) = F_X(1) - F_X(0) = 3/4 - 1/4 = 1/2$.
        *   $p_X(2) = F_X(2) - F_X(1) = 1 - 3/4 = 1/4$.
        This successfully reconstructs our PMF!
*   **Formal/Mathematical Version:**
    *   **From PMF to CDF:** $F_X(x) = \sum_{t \le x, t \in R_X} p_X(t)$
    *   **From CDF to PMF:** For any $x_i \in R_X$ (assuming $R_X = \{x_1, x_2, \dots\}$ with $x_1 < x_2 < \dots$), the probability mass at $x_i$ is the size of the jump in the CDF at $x_i$.
        $$p_X(x_i) = F_X(x_i) - F_X(x_{i-1})$$
        where $x_{i-1}$ is the largest value in $R_X$ strictly less than $x_i$. If $x_i$ is the smallest value in $R_X$, then $p_X(x_i) = F_X(x_i)$. More generally, using the right-continuity property:
        $$p_X(x) = F_X(x) - \lim_{y \to x^-} F_X(y)$$
        This means the probability at a point $x$ is the value of the CDF at $x$ minus the value the CDF approaches just *before* $x$.
*   **What Could Go Wrong:** Incorrectly calculating the jumps. Forgetting that $F_X(x)$ is constant between the discrete values.

## 5. Worked examples — multiple, with every step shown

Here are several worked examples to solidify your understanding, ranging from straightforward to slightly more complex.

### Example 1: Fair Six-Sided Die Roll

**Problem:** Let $X$ be the outcome when a fair six-sided die is rolled. Find its Probability Mass Function (PMF) and Cumulative Distribution Function (CDF).

**What's Given:** A fair six-sided die.
**What We Want:** The PMF, $p_X(x)$, and the CDF, $F_X(x)$, for $X$.

**Solution:**

1.  **Identify the Sample Space and Random Variable Values:**
    *   The sample space $\Omega$ (all possible outcomes) is $\{1, 2, 3, 4, 5, 6\}$.
    *   The random variable $X$ is defined as the outcome of the roll. So, the set of possible values for $X$, $R_X$, is also $\{1, 2, 3, 4, 5, 6\}$.
    *   *Explanation:* We first list all possible results of the experiment. Since the random variable directly represents these results, its possible values are the same.

2.  **Determine the PMF ($p_X(x)$):**
    *   Since the die is fair, each outcome is equally likely.
    *   The probability of rolling any specific number (1, 2, 3, 4, 5, or 6) is $1/6$.
    *   So, the PMF is:
        $$p_X(x) = \begin{cases} \frac{1}{6} & \text{for } x \in \{1, 2, 3, 4, 5, 6\} \\ 0 & \text{otherwise} \end{cases}$$
    *   *Explanation:* For a fair die, each face has an equal chance of appearing. There are 6 faces, so the probability of any single face is 1 divided by 6.

3.  **Check PMF Properties:**
    *   All $p_X(x) = 1/6 \ge 0$. (Non-negativity satisfied)
    *   $\sum_{x \in R_X} p_X(x) = p_X(1) + p_X(2) + p_X(3) + p_X(4) + p_X(5) + p_X(6)$
        $= \frac{1}{6} + \frac{1}{6} + \frac{1}{6} + \frac{1}{6} + \frac{1}{6} + \frac{1}{6} = 6 \times \frac{1}{6} = 1$. (Normalization satisfied)
    *   *Explanation:* It's good practice to quickly verify the two main properties of a PMF to ensure no calculation errors were made.

4.  **Determine the CDF ($F_X(x)$):**
    *   The CDF is $F_X(x) = P(X \le x) = \sum_{t \le x, t \in R_X} p_X(t)$. We need to consider different intervals for $x$.
    *   For $x < 1$: There are no possible outcomes less than or equal to $x$.
        $$F_X(x) = 0$$
    *   For $1 \le x < 2$: Only $X=1$ is less than or equal to $x$.
        $$F_X(x) = P(X=1) = \frac{1}{6}$$
    *   For $2 \le x < 3$: $X=1$ or $X=2$ are less than or equal to $x$.
        $$F_X(x) = P(X=1) + P(X=2) = \frac{1}{6} + \frac{1}{6} = \frac{2}{6} = \frac{1}{3}$$
    *   For $3 \le x < 4$: $X=1, 2, 3$ are less than or equal to $x$.
        $$F_X(x) = P(X=1) + P(X=2) + P(X=3) = \frac{3}{6} = \frac{1}{2}$$
    *   For $4 \le x < 5$: $X=1, 2, 3, 4$ are less than or equal to $x$.
        $$F_X(x) = P(X=1) + P(X=2) + P(X=3) + P(X=4) = \frac{4}{6} = \frac{2}{3}$$
    *   For $5 \le x < 6$: $X=1, 2, 3, 4, 5$ are less than or equal to $x$.
        $$F_X(x) = P(X=1) + P(X=2) + P(X=3) + P(X=4) + P(X=5) = \frac{5}{6}$$
    *   For $x \ge 6$: All possible outcomes ($1, 2, 3, 4, 5, 6$) are less than or equal to $x$.
        $$F_X(x) = P(X=1) + \dots + P(X=6) = \frac{6}{6} = 1$$
    *   Combining these, the CDF is:
        $$F_X(x) = \begin{cases} 0 & \text{for } x < 1 \\ \frac{1}{6} & \text{for } 1 \le x < 2 \\ \frac{2}{6} & \text{for } 2 \le x < 3 \\ \frac{3}{6} & \text{for } 3 \le x < 4 \\ \frac{4}{6} & \text{for } 4 \le x < 5 \\ \frac{5}{6} & \text{for } 5 \le x < 6 \\ 1 & \text{for } x \ge 6 \end{cases}$$
    *   *Explanation:* The CDF is a step function. It accumulates probabilities. For any $x$, we sum the probabilities of all discrete values $t$ that are less than or equal to $x$. It's crucial to define the CDF for *all* real numbers, not just the discrete points.

**Final Answer:**
The PMF is $p_X(x) = 1/6$ for $x \in \{1, 2, 3, 4, 5, 6\}$ and $0$ otherwise.
The CDF is:
$$ \boxed{ F_X(x) = \begin{cases} 0 & \text{for } x < 1 \\ \frac{1}{6} & \text{for } 1 \le x < 2 \\ \frac{1}{3} & \text{for } 2 \le x < 3 \\ \frac{1}{2} & \text{for } 3 \le x < 4 \\ \frac{2}{3} & \text{for } 4 \le x < 5 \\ \frac{5}{6} & \text{for } 5 \le x < 6 \\ 1 & \text{for } x \ge 6 \end{cases} } $$

**Reflection:** This example was straightforward because of the uniform probability distribution. The key was to systematically define the PMF for each possible outcome and then build the CDF by accumulating these probabilities across all relevant intervals. The most common pitfall here is not defining the CDF for all real numbers, but only for the discrete points.

---

### Example 2: Biased Coin Flips

**Problem:** A biased coin has a probability of landing Heads, $P(H) = 0.6$. It is flipped 3 times. Let $Y$ be the number of Heads observed. Find the PMF and CDF for $Y$.

**What's Given:** A biased coin, $P(H) = 0.6$, $P(T) = 1 - 0.6 = 0.4$. 3 flips.
**What We Want:** The PMF, $p_Y(y)$, and the CDF, $F_Y(y)$, for $Y$.

**Solution:**

1.  **Identify the Random Variable Values:**
    *   $Y$ is the number of heads in 3 flips. Possible values for $Y$ are $R_Y = \{0, 1, 2, 3\}$.
    *   *Explanation:* With three flips, you can get zero, one, two, or three heads.

2.  **Determine the PMF ($p_Y(y)$):**
    *   This is a binomial distribution scenario, where $n=3$ (number of trials) and $p=0.6$ (probability of success, i.e., heads). The probability of getting exactly $y$ heads in $n$ trials is given by $P(Y=y) = \binom{n}{y} p^y (1-p)^{n-y}$.
    *   For $y=0$: (TTT)
        $$p_Y(0) = P(Y=0) = \binom{3}{0} (0.6)^0 (0.4)^{3-0} = 1 \times 1 \times (0.4)^3 = 0.064$$
        *Explanation:* No heads (TTT) means 0.4 * 0.4 * 0.4. $\binom{3}{0}=1$ because there's only one way to get 0 heads.
    *   For $y=1$: (HTT, THT, TTH)
        $$p_Y(1) = P(Y=1) = \binom{3}{1} (0.6)^1 (0.4)^{3-1} = 3 \times 0.6 \times (0.4)^2 = 3 \times 0.6 \times 0.16 = 0.288$$
        *Explanation:* One head means H T T, or T H T, or T T H. Each specific sequence has probability $0.6 \times 0.4 \times 0.4 = 0.096$. There are $\binom{3}{1}=3$ such sequences.
    *   For $y=2$: (HHT, HTH, THH)
        $$p_Y(2) = P(Y=2) = \binom{3}{2} (0.6)^2 (0.4)^{3-2} = 3 \times (0.6)^2 \times 0.4 = 3 \times 0.36 \times 0.4 = 0.432$$
        *Explanation:* Two heads means H H T, or H T H, or T H H. Each specific sequence has probability $0.6 \times 0.6 \times 0.4 = 0.144$. There are $\binom{3}{2}=3$ such sequences.
    *   For $y=3$: (HHH)
        $$p_Y(3) = P(Y=3) = \binom{3}{3} (0.6)^3 (0.4)^{3-3} = 1 \times (0.6)^3 \times 1 = 0.216$$
        *Explanation:* Three heads (HHH) means $0.6 \times 0.6 \times 0.6$. $\binom{3}{3}=1$ because there's only one way to get 3 heads.
    *   The PMF is:
        $$p_Y(y) = \begin{cases} 0.064 & \text{for } y=0 \\ 0.288 & \text{for } y=1 \\ 0.432 & \text{for } y=2 \\ 0.216 & \text{for } y=3 \\ 0 & \text{otherwise} \end{cases}$$

3.  **Check PMF Properties:**
    *   All $p_Y(y) \ge 0$. (Satisfied)
    *   $\sum_{y \in R_Y} p_Y(y) = 0.064 + 0.288 + 0.432 + 0.216 = 1.000$. (Normalization satisfied)
    *   *Explanation:* Always verify that probabilities are non-negative and sum to 1.

4.  **Determine the CDF ($F_Y(y)$):**
    *   $F_Y(y) = P(Y \le y) = \sum_{t \le y, t \in R_Y} p_Y(t)$.
    *   For $y < 0$:
        $$F_Y(y) = 0$$
    *   For $0 \le y < 1$:
        $$F_Y(y) = p_Y(0) = 0.064$$
    *   For $1 \le y < 2$:
        $$F_Y(y) = p_Y(0) + p_Y(1) = 0.064 + 0.288 = 0.352$$
    *   For $2 \le y < 3$:
        $$F_Y(y) = p_Y(0) + p_Y(1) + p_Y(2) = 0.064 + 0.288 + 0.432 = 0.784$$
    *   For $y \ge 3$:
        $$F_Y(y) = p_Y(0) + p_Y(1) + p_Y(2) + p_Y(3) = 0.064 + 0.288 + 0.432 + 0.216 = 1$$
    *   Combining these, the CDF is:
        $$F_Y(y) = \begin{cases} 0 & \text{for } y < 0 \\ 0.064 & \text{for } 0 \le y < 1 \\ 0.352 & \text{for } 1 \le y < 2 \\ 0.784 & \text{for } 2 \le y < 3 \\ 1 & \text{for } y \ge 3 \end{cases}$$
    *   *Explanation:* We sum the PMF values up to each point. The CDF increases in steps at the discrete values of $Y$.

**Final Answer:**
The PMF is:
$$ \boxed{ p_Y(y) = \begin{cases} 0.064 & \text{for } y=0 \\ 0.288 & \text{for } y=1 \\ 0.432 & \text{for } y=2 \\ 0.216 & \text{for } y=3 \\ 0 & \text{otherwise} \end{cases} } $$
The CDF is:
$$ \boxed{ F_Y(y) = \begin{cases} 0 & \text{for } y < 0 \\ 0.064 & \text{for } 0 \le y < 1 \\ 0.352 & \text{for } 1 \le y < 2 \\ 0.784 & \text{for } 2 \le y < 3 \\ 1 & \text{for } y \ge 3 \end{cases} } $$

**Reflection:** This example introduced a biased coin and multiple trials, requiring the use of binomial probabilities to calculate the PMF. The calculation of the CDF then followed the same cumulative summation principle. The main challenge here was accurately calculating the individual PMF values.

---

### Example 3: Probabilities from a Given PMF Table

**Problem:** A discrete random variable $Z$ has the following PMF:
| $z$ | 1 | 2 | 3 | 4 |
| :-- | :- | :- | :- | :- |
| $p_Z(z)$ | 0.2 | 0.3 | 0.4 | 0.1 |

Find the following probabilities:
a) $P(Z > 2)$
b) $P(1 < Z \le 3)$
c) $P(Z \le 2.5)$

**What's Given:** The PMF table for $Z$.
**What We Want:** $P(Z > 2)$, $P(1 < Z \le 3)$, $P(Z \le 2.5)$.

**Solution:**

First, let's verify the PMF: $0.2 + 0.3 + 0.4 + 0.1 = 1.0$. All probabilities are non-negative. The PMF is valid.

a) **Find $P(Z > 2)$:**
    *   $P(Z > 2)$ means the probability that $Z$ takes a value strictly greater than 2.
    *   From the table, the values of $Z$ greater than 2 are $Z=3$ and $Z=4$.
    *   $P(Z > 2) = P(Z=3) + P(Z=4)$
        $= 0.4 + 0.1$
        $= 0.5$
    *   *Explanation:* For discrete variables, "greater than 2" means starting from the next integer value, which is 3. We sum the probabilities for all such values.

b) **Find $P(1 < Z \le 3)$:**
    *   $P(1 < Z \le 3)$ means the probability that $Z$ takes a value strictly greater than 1 and less than or equal to 3.
    *   From the table, the values of $Z$ that satisfy this condition are $Z=2$ and $Z=3$.
    *   $P(1 < Z \le 3) = P(Z=2) + P(Z=3)$
        $= 0.3 + 0.4$
        $= 0.7$
    *   *Explanation:* Pay close attention to the strict vs. non-strict inequalities. $Z=1$ is excluded, $Z=3$ is included.

c) **Find $P(Z \le 2.5)$:**
    *   $P(Z \le 2.5)$ means the probability that $Z$ takes a value less than or equal to 2.5.
    *   From the table, the values of $Z$ that satisfy this condition are $Z=1$ and $Z=2$. (Since $Z$ is discrete, $Z=3$ is not $\le 2.5$).
    *   $P(Z \le 2.5) = P(Z=1) + P(Z=2)$
        $= 0.2 + 0.3$
        $= 0.5$
    *   *Explanation:* Even though 2.5 is not a possible value for $Z$, the CDF is defined for it. We sum probabilities for all discrete values up to 2.5. This is equivalent to $F_Z(2.5)$.

**Final Answer:**
a) $P(Z > 2) = \boxed{0.5}$
b) $P(1 < Z \le 3) = \boxed{0.7}$
c) $P(Z \le 2.5) = \boxed{0.5}$

**Reflection:** This example emphasizes the importance of correctly interpreting inequalities when working with discrete random variables. The inclusion or exclusion of boundary points (e.g., $Z > 2$ vs. $Z \ge 2$) makes a difference. Also, remember that the CDF definition $P(X \le x)$ is for *any* real number $x$, not just the discrete values.

---

### Example 4: PMF and Probabilities from a Given CDF

**Problem:** A discrete random variable $W$ has the following CDF:
$$F_W(w) = \begin{cases} 0 & w < 0 \\ 0.1 & 0 \le w < 1 \\ 0.3 & 1 \le w < 2 \\ 0.7 & 2 \le w < 3 \\ 1 & w \ge 3 \end{cases}$$
Find:
a) The PMF, $p_W(w)$.
b) $P(W=2)$.
c) $P(W < 1)$.
d) $P(1 < W \le 3)$.

**What's Given:** The CDF, $F_W(w)$.
**What We Want:** The PMF, $p_W(w)$, and specific probabilities $P(W=2)$, $P(W < 1)$, $P(1 < W \le 3)$.

**Solution:**

a) **Find the PMF ($p_W(w)$):**
    *   The possible values for $W$ are the points where the CDF "jumps". These are $w=0, 1, 2, 3$.
    *   The probability mass at each point is the size of the jump.
    *   For $w=0$: $p_W(0) = F_W(0) - \lim_{w \to 0^-} F_W(w) = 0.1 - 0 = 0.1$.
        *Explanation:* The jump at $w=0$ is from 0 to 0.1.
    *   For $w=1$: $p_W(1) = F_W(1) - \lim_{w \to 1^-} F_W(w) = F_W(1) - F_W(0) = 0.3 - 0.1 = 0.2$.
        *Explanation:* The jump at $w=1$ is from 0.1 to 0.3.
    *   For $w=2$: $p_W(2) = F_W(2) - \lim_{w \to 2^-} F_W(w) = F_W(2) - F_W(1) = 0.7 - 0.3 = 0.4$.
        *Explanation:* The jump at $w=2$ is from 0.3 to 0.7.
    *   For $w=3$: $p_W(3) = F_W(3) - \lim_{w \to 3^-} F_W(w) = F_W(3) - F_W(2) = 1 - 0.7 = 0.3$.
        *Explanation:* The jump at $w=3$ is from 0.7 to 1.
    *   The PMF is:
        $$p_W(w) = \begin{cases} 0.1 & \text{for } w=0 \\ 0.2 & \text{for } w=1 \\ 0.4 & \text{for } w=2 \\ 0.3 & \text{for } w=3 \\ 0 & \text{otherwise} \end{cases}$$
    *   *Explanation:* We find the PMF by identifying the points where the CDF steps up, and the magnitude of each step is the probability mass at that point.

b) **Find $P(W=2)$:**
    *   This is directly given by the PMF we just calculated.
    *   $P(W=2) = p_W(2) = 0.4$.
    *   *Explanation:* The probability of $W$ being exactly 2 is simply the value of the PMF at $w=2$.

c) **Find $P(W < 1)$:**
    *   For a discrete random variable, $P(W < 1)$ means the probability that $W$ takes a value strictly less than 1.
    *   This includes $W=0$.
    *   Using the PMF: $P(W < 1) = P(W=0) = 0.1$.
    *   Using the CDF: $P(W < 1) = \lim_{w \to 1^-} F_W(w)$. Looking at the CDF definition, for $w$ values just below 1 (e.g., $w=0.9$), $F_W(w) = 0.1$.
        So, $P(W < 1) = 0.1$.
    *   *Explanation:* For discrete variables, $P(X < a)$ is not necessarily $F_X(a)$. It is $F_X(a^-)$, i.e., the value of the CDF just before $a$.

d) **Find $P(1 < W \le 3)$:**
    *   This means the probability that $W$ takes a value strictly greater than 1 and less than or equal to 3.
    *   Using the PMF: The values satisfying this are $W=2$ and $W=3$.
        $P(1 < W \le 3) = P(W=2) + P(W=3) = 0.4 + 0.3 = 0.7$.
    *   Using the CDF: A useful property is $P(a < X \le b) = F_X(b) - F_X(a)$.
        $P(1 < W \le 3) = F_W(3) - F_W(1)$.
        From the CDF definition: $F_W(3) = 1$ and $F_W(1) = 0.3$.
        $P(1 < W \le 3) = 1 - 0.3 = 0.7$.
    *   *Explanation:* This problem demonstrates a key property of the CDF for calculating probabilities over an interval. The difference in CDF values gives the cumulative probability between the two points, *including* the upper bound but *excluding* the lower bound.

**Final Answer:**
a) The PMF is:
$$ \boxed{ p_W(w) = \begin{cases} 0.1 & \text{for } w=0 \\ 0.2 & \text{for } w=1 \\ 0.4 & \text{for } w=2 \\ 0.3 & \text{for } w=3 \\ 0 & \text{otherwise} \end{cases} } $$
b) $P(W=2) = \boxed{0.4}$
c) $P(W < 1) = \boxed{0.1}$
d) $P(1 < W \le 3) = \boxed{0.7}$

**Reflection:** This example tested the ability to derive a PMF from a CDF by observing the jumps, and then using both the PMF and CDF properties to calculate various probabilities. The trickiest part is correctly handling strict vs. non-strict inequalities, especially when using the CDF. Remember $P(X < a) \neq F_X(a)$ for discrete variables, but $P(X \le a) = F_X(a)$.

## 6. Common mistakes and traps

Students often stumble on these specific points when first learning about discrete random variables, PMFs, and CDFs:

1.  **Confusing PMF and CDF:** Mixing up $P(X=x)$ (the probability of a single specific value, given by the PMF) with $P(X \le x)$ (the cumulative probability up to and including $x$, given by the CDF). This leads to incorrect calculations for specific event probabilities.
2.  **Forgetting PMF sums to 1:** When constructing or checking a PMF, students sometimes define probabilities that sum to something other than 1. This violates a fundamental axiom of probability.
3.  **CDF not being non-decreasing:** A CDF must always be non-decreasing. If your calculated CDF decreases at any point, it's a clear sign of an error in your summation or logic.
4.  **CDF not covering all real numbers:** The CDF, $F_X(x)$, is a function defined for *all* real numbers $x$, not just the discrete values that the random variable can take. It's a step function that holds its value between jumps.
5.  **Incorrectly calculating probabilities from CDF with strict inequalities:** For discrete random variables, $P(X < a) \ne F_X(a)$. Instead, $P(X < a) = F_X(a^-)$ (the value of the CDF just before $a$). For example, if $X$ can only be integers, $P(X < 3)$ is $P(X \le 2)$, which is $F_X(2)$, not $F_X(3)$.
6.  **Misinterpreting interval probabilities:** Be very careful with intervals like $P(a < X \le b)$, $P(a \le X < b)$, $P(a < X < b)$, and $P(a \le X \le b)$.
    *   $P(a < X \le b) = F_X(b) - F_X(a)$. (This is the most common and generally useful one).
    *   $P(a \le X \le b) = F_X(b) - F_X(a^-)$ (where $a^-$ is the value just before $a$). Or, more simply, it's $P(X=a) + P(a < X \le b)$.
    *   $P(a < X < b) = F_X(b^-) - F_X(a)$.
    *   Forgetting these nuances leads to off-by-one errors in discrete probability calculations.

## 7. Textbook-precise explanation

To provide a rigorous, textbook-level understanding, we begin with the underlying probability space.

Let $(\Omega, \mathcal{F}, P)$ be a probability space, where:
*   $\Omega$ is the **sample space**, the set of all possible outcomes of a random experiment.
*   $\mathcal{F}$ is a **sigma-algebra** (or event space) on $\Omega$, which is a collection of subsets of $\Omega$ (called events) that includes $\Omega$ itself, is closed under complementation, and is closed under countable unions.
*   $P$ is a **probability measure** defined on $\mathcal{F}$, which assigns a probability to each event in $\mathcal{F}$, satisfying the axioms of probability.

**Definition 1: Random Variable**
A **random variable** $X$ is a function $X: \Omega \to \mathbb{R}$ such that for every Borel set $B \subseteq \mathbb{R}$, the set $\{\omega \in \Omega : X(\omega) \in B\}$ is an event in $\mathcal{F}$. (This condition is known as measurability and ensures that we can assign probabilities to statements about $X$).

**Definition 2: Discrete Random Variable**
A random variable $X$ is a **discrete random variable** if its range $R_X = \{x \in \mathbb{R} : \exists \omega \in \Omega \text{ such that } X(\omega) = x\}$ is a countable set. That is, $R_X$ is either finite or countably infinite.

**Definition 3: Probability Mass Function (PMF)**
For a discrete random variable $X$ with range $R_X = \{x_1, x_2, \dots\}$, its **Probability Mass Function (PMF)**, denoted $p_X(x)$ (or $f_X(x)$), is a function $p_X: \mathbb{R} \to [0,1]$ defined as:
$$p_X(x) = P(X=x) = P(\{\omega \in \Omega : X(\omega) = x\})$$
The PMF must satisfy the following properties:
1.  **Non-negativity:** $p_X(x) \ge 0$ for all $x \in \mathbb{R}$.
2.  **Normalization:** $\sum_{x \in R_X} p_X(x) = 1$. (The sum is taken over all values $x$ for which $p_X(x) > 0$).
3.  **Zero for impossible values:** $p_X(x) = 0$ for $x \notin R_X$.

**Definition 4: Cumulative Distribution Function (CDF)**
For any random variable $X$ (discrete or continuous), its **Cumulative Distribution Function (CDF)**, denoted $F_X(x)$, is a function $F_X: \mathbb{R} \to [0,1]$ defined as:
$$F_X(x) = P(X \le x) = P(\{\omega \in \Omega : X(\omega) \le x\})$$
For a discrete random variable $X$ with PMF $p_X(x)$, the CDF can be expressed as:
$$F_X(x) = \sum_{t \le x, t \in R_X} p_X(t)$$
The CDF must satisfy the following properties:
1.  **Range:** $0 \le F_X(x) \le 1$ for all $x \in \mathbb{R}$.
2.  **Monotonically Non-decreasing:** If $a < b$, then $F_X(a) \le F_X(b)$.
3.  **Limits at Infinities:**
    *   $\lim_{x \to -\infty} F_X(x) = 0$.
    *   $\lim_{x \to \infty} F_X(x) = 1$.
4.  **Right-Continuity:** $F_X(x)$ is right-continuous, i.e., $\lim_{y \to x^+} F_X(y) = F_X(x)$ for all $x \in \mathbb{R}$.

**Relationship between PMF and CDF for Discrete Random Variables:**
*   From