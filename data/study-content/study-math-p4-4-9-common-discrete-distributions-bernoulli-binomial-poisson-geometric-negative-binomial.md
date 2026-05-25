## 1. What it is — in plain English

Imagine you're running a simple experiment where something either happens or it doesn't. Like flipping a coin: it's either heads or tails. Or checking a light bulb: it's either working or broken. When we repeat these simple experiments, or look at how often certain events occur, we start to see patterns in the probabilities of different outcomes.

A "discrete distribution" is like a blueprint that tells us how likely each possible outcome is when the outcomes can be counted (like 0, 1, 2, 3, etc., not values like 1.5 or $\pi$). It's a list or a formula that assigns a probability to every single countable result of a random event.

The distributions we're going to explore are specific "blueprints" for very common types of random situations. The Bernoulli distribution is for a single "yes/no" event. The Binomial is for counting how many "yeses" you get in a fixed number of tries. The Poisson is for counting rare events over a specific period or space. And the Geometric and Negative Binomial are for figuring out how many tries it takes to get a certain number of "yeses."

Think of them as specialized tools in a probability toolbox. Each tool is designed to model a particular kind of random counting problem. Knowing which tool to use for which problem is the first step to understanding and predicting random phenomena.

## 2. Why it matters — real-world applications

These discrete distributions are fundamental building blocks in probability and statistics, underpinning countless applications across science, engineering, business, and daily life. They allow us to model, predict, and make decisions in situations involving countable outcomes.

1.  **Quality Control and Manufacturing (Binomial, Poisson):** Companies like Boeing or Intel use these to assess product reliability. For instance, the Binomial distribution can model the probability of finding a certain number of defective components in a batch of 100 products (e.g., microchips, aircraft rivets) if the probability of any single component being defective is known. The Poisson distribution can model the number of surface defects on a newly painted car body or the number of errors per page in a manufactured circuit board, helping to set acceptable quality thresholds.

2.  **Healthcare and Clinical Trials (Bernoulli, Binomial, Negative Binomial):** When testing a new drug, each patient's outcome (recovery/no recovery) is a Bernoulli trial. The Binomial distribution helps determine the probability of a certain number of patients responding positively in a clinical trial of, say, 100 patients. If researchers are looking for a specific number of successful immunizations, the Negative Binomial distribution can help estimate how many people they might need to vaccinate in total to achieve, for example, 5 successful immunizations, which is crucial for resource planning.

3.  **Customer Service and Network Traffic (Poisson, Geometric):** Telecommunication companies or online retailers (like Amazon) use the Poisson distribution to model the number of customer calls arriving at a call center per minute or the number of website hits per second. This helps them staff appropriately and manage server loads. The Geometric distribution can model the number of customers a salesperson needs to contact until they make their first sale, or the number of data packets transmitted until the first one is successfully received, informing sales strategies and network retransmission protocols.

4.  **Machine Learning and Anomaly Detection (Poisson):** In cybersecurity, the Poisson distribution can model the expected number of login attempts to a server from a specific IP address within a time window. A significantly higher number of attempts than predicted by the Poisson model could signal an anomaly or a brute-force attack, triggering security alerts. Similarly, in natural language processing, the frequency of rare words in a document can sometimes be modeled by a Poisson distribution.

5.  **Physics and Particle Detection (Poisson):** In nuclear physics, the number of radioactive decays detected by a Geiger counter in a fixed time interval often follows a Poisson distribution, especially for rare decay events. This helps physicists understand the properties of radioactive materials and design detectors. In astrophysics, the number of photons arriving from a distant star per unit time can also be modeled this way.

## 3. Prerequisites — what you must know first

To fully grasp the concepts of discrete probability distributions, you should be comfortable with the following foundational topics:

*   **Set Theory Basics:** Understanding sets, elements, subsets, unions ($\cup$), intersections ($\cap$), and complements ($^c$) as they relate to defining events and sample spaces.
*   **Basic Probability Axioms:** The three Kolmogorov axioms of probability (probability of an event is non-negative, probability of sample space is 1, additivity for disjoint events).
*   **Sample Space and Events:** The set of all possible outcomes (sample space $\Omega$) and specific collections of outcomes (events).
*   **Counting Principles (Combinatorics):**
    *   **Factorials:** $n! = n \times (n-1) \times \dots \times 1$.
    *   **Permutations:** Number of ways to arrange $k$ items from $n$ distinct items ($P(n,k)$).
    *   **Combinations:** Number of ways to choose $k$ items from $n$ distinct items without regard to order ($\binom{n}{k} = \frac{n!}{k!(n-k)!}$).
*   **Conditional Probability:** $P(A|B) = \frac{P(A \cap B)}{P(B)}$, the probability of event A given event B has occurred.
*   **Independence of Events:** Two events A and B are independent if $P(A \cap B) = P(A)P(B)$, or equivalently, $P(A|B) = P(A)$.
*   **Random Variables:** The concept of a random variable as a function that maps outcomes from a sample space to real numbers.
*   **Discrete vs. Continuous Random Variables:** The distinction between random variables whose outcomes are countable (discrete) and those that can take any value in an interval (continuous).
*   **Probability Mass Function (PMF):** For a discrete random variable, a function $P(X=x)$ that gives the probability that the random variable $X$ takes on a specific value $x$.
*   **Expected Value (Mean) of a Discrete Random Variable:** $E[X] = \sum_{x} x P(X=x)$, the weighted average of the possible values.
*   **Variance of a Discrete Random Variable:** $Var[X] = E[(X - E[X])^2] = E[X^2] - (E[X])^2$, a measure of the spread of the distribution.
*   **Summation Notation:** $\sum$, for adding a series of terms.
*   **Geometric Series:** Understanding the sum of an infinite geometric series $a + ar + ar^2 + \dots = \frac{a}{1-r}$ for $|r|<1$.

## 4. The core idea — step by step

Let's break down each common discrete distribution, building intuition and then formalizing it.

---

### Step 1: The Bernoulli Distribution

*   **Plain-English Statement:** Imagine you're doing a single, simple experiment that has only two possible outcomes: "success" or "failure." Think of it as a "yes" or "no" question. The Bernoulli distribution describes the probability of getting a "success" or a "failure" in this single try.

*   **Small Concrete Example:**
    *   Flipping a coin once: Is it heads (success) or tails (failure)?
    *   Checking if a single light bulb works: Does it work (success) or not (failure)?
    *   A customer clicks on an ad: Did they click (success) or not (failure)?

*   **Formal/Mathematical Version:**
    A random variable $X$ follows a Bernoulli distribution with parameter $p$ if it takes value 1 (for success) with probability $p$, and value 0 (for failure) with probability $1-p$.
    We write this as $X \sim \text{Bernoulli}(p)$.

    The **Probability Mass Function (PMF)** is:
    $$ P(X=k) = \begin{cases} p & \text{if } k=1 \\ 1-p & \text{if } k=0 \\ 0 & \text{otherwise} \end{cases} $$
    This can be written more compactly as:
    $$ P(X=k) = p^k (1-p)^{1-k} \quad \text{for } k \in \{0, 1\} $$

    The **Expected Value (Mean)** is:
    $$ E[X] = p $$

    The **Variance** is:
    $$ Var[X] = p(1-p) $$

*   **What Could Go Wrong:**
    *   Assuming the experiment has more than two outcomes. The Bernoulli distribution is strictly for binary (two-outcome) events.
    *   Confusing $p$ with the number of trials. $p$ is the probability of success, and there is only *one* trial.

---

### Step 2: The Binomial Distribution

*   **Plain-English Statement:** Now, imagine you repeat that single Bernoulli experiment (like flipping a coin) a fixed number of times, and each time the outcome doesn't affect the others. The Binomial distribution helps you figure out the probability of getting a specific number of "successes" in those fixed number of tries.

*   **Small Concrete Example:**
    *   Flipping a coin 10 times: What's the probability of getting exactly 7 heads?
    *   Testing 20 light bulbs: What's the probability that exactly 3 are defective?
    *   Sending 5 emails: What's the probability that exactly 4 are opened, assuming each open is independent?

*   **Formal/Mathematical Version:**
    A random variable $X$ follows a Binomial distribution with parameters $n$ (number of trials) and $p$ (probability of success on a single trial) if it represents the number of successes in $n$ independent Bernoulli trials.
    We write this as $X \sim \text{Binomial}(n, p)$.

    The **Probability Mass Function (PMF)** is:
    $$ P(X=k) = \binom{n}{k} p^k (1-p)^{n-k} \quad \text{for } k \in \{0, 1, \dots, n\} $$
    where $\binom{n}{k} = \frac{n!}{k!(n-k)!}$ is the binomial coefficient, representing the number of ways to choose $k$ successes from $n$ trials.

    The **Expected Value (Mean)** is:
    $$ E[X] = np $$

    The **Variance** is:
    $$ Var[X] = np(1-p) $$

*   **What Could Go Wrong:**
    *   The number of trials ($n$) is not fixed beforehand. If you stop when you get a certain number of successes, that's a different distribution (Geometric or Negative Binomial).
    *   The trials are not independent. For example, drawing cards without replacement.
    *   The probability of success ($p$) changes from trial to trial.
    *   The outcomes are not binary (success/failure).

---

### Step 3: The Poisson Distribution

*   **Plain-English Statement:** This distribution is for counting how many times an event happens within a fixed interval of time or space, especially when these events are rare and occur independently of each other at a constant average rate. Think of it as counting "occurrences" rather than "successes" from trials.

*   **Small Concrete Example:**
    *   Number of phone calls received by a call center in one hour.
    *   Number of defects on a roll of fabric per square meter.
    *   Number of cars passing a specific point on a highway in a 5-minute interval.
    *   Number of typos on a page of a book.

*   **Formal/Mathematical Version:**
    A random variable $X$ follows a Poisson distribution with parameter $\lambda$ (lambda), where $\lambda$ is the average rate of events in the given interval.
    We write this as $X \sim \text{Poisson}(\lambda)$.
    The value $\lambda$ must be positive ($\lambda > 0$).

    The **Probability Mass Function (PMF)** is:
    $$ P(X=k) = \frac{e^{-\lambda} \lambda^k}{k!} \quad \text{for } k \in \{0, 1, 2, \dots\} $$
    where $e$ is Euler's number (approximately 2.71828).

    The **Expected Value (Mean)** is:
    $$ E[X] = \lambda $$

    The **Variance** is:
    $$ Var[X] = \lambda $$
    (A key characteristic of the Poisson distribution is that its mean equals its variance.)

*   **What Could Go Wrong:**
    *   Events are not independent (e.g., if one event makes another more or less likely).
    *   The average rate ($\lambda$) is not constant over the interval.
    *   The interval of observation is not fixed or clearly defined.
    *   Trying to apply it when events are not "rare" in the context of many potential opportunities (e.g., number of heads in 2 coin flips). Poisson is often a good approximation to Binomial when $n$ is large and $p$ is small, such that $np = \lambda$.

---

### Step 4: The Geometric Distribution

*   **Plain-English Statement:** Instead of counting successes in a fixed number of trials, now we're counting how many trials it takes *until* the very first success happens. Each trial is still a Bernoulli experiment.

*   **Small Concrete Example:**
    *   Flipping a coin: How many flips until you get the first head? (Could be 1st flip, 2nd, 3rd, etc.)
    *   Shooting free throws: How many attempts until you make your first basket?
    *   A salesperson calling leads: How many calls until they make their first sale?

*   **Formal/Mathematical Version:**
    A random variable $X$ follows a Geometric distribution with parameter $p$ (probability of success on a single trial) if it represents the total number of independent Bernoulli trials required to get the *first* success.
    We write this as $X \sim \text{Geometric}(p)$.
    (Note: Some texts define Geometric as the number of *failures before* the first success. Here, we use the "number of trials *including* the first success.")

    The **Probability Mass Function (PMF)** is:
    $$ P(X=k) = (1-p)^{k-1} p \quad \text{for } k \in \{1, 2, 3, \dots\} $$
    This means we had $k-1$ failures, each with probability $(1-p)$, followed by one success with probability $p$.

    The **Expected Value (Mean)** is:
    $$ E[X] = \frac{1}{p} $$

    The **Variance** is:
    $$ Var[X] = \frac{1-p}{p^2} $$

*   **What Could Go Wrong:**
    *   Confusing the two definitions of Geometric distribution (total trials vs. failures before success). Always state which definition you are using.
    *   Not ensuring trials are independent and the probability of success $p$ remains constant.
    *   Applying it when you're looking for *more than one* success (that's Negative Binomial).

---

### Step 5: The Negative Binomial Distribution

*   **Plain-English Statement:** This is a generalization of the Geometric distribution. Instead of waiting for the *first* success, you're waiting for the *r-th* success. You're still counting the total number of trials needed to achieve a specific number of successes.

*   **Small Concrete Example:**
    *   Flipping a coin: How many flips until you get your 3rd head?
    *   Testing light bulbs: How many bulbs do you need to test until you find the 5th working bulb?
    *   A baseball player's batting average: How many at-bats until they hit their 10th home run?

*   **Formal/Mathematical Version:**
    A random variable $X$ follows a Negative Binomial distribution with parameters $r$ (number of desired successes) and $p$ (probability of success on a single trial) if it represents the total number of independent Bernoulli trials required to get the $r$-th success.
    We write this as $X \sim \text{Negative Binomial}(r, p)$.
    (Again, some texts define Negative Binomial as the number of *failures before* the $r$-th success. We use the "total number of trials *including* the $r$-th success.")

    For the $r$-th success to occur on the $k$-th trial, we must have had exactly $r-1$ successes in the first $k-1$ trials, and the $k$-th trial must be a success.

    The **Probability Mass Function (PMF)** is:
    $$ P(X=k) = \binom{k-1}{r-1} p^r (1-p)^{k-r} \quad \text{for } k \in \{r, r+1, r+2, \dots\} $$
    Here, $\binom{k-1}{r-1}$ accounts for the number of ways to arrange the $r-1$ successes among the first $k-1$ trials.

    The **Expected Value (Mean)** is:
    $$ E[X] = \frac{r}{p} $$

    The **Variance** is:
    $$ Var[X] = \frac{r(1-p)}{p^2} $$
    Notice that when $r=1$, these formulas simplify to the Geometric distribution's formulas.

*   **What Could Go Wrong:**
    *   Confusing it with the Binomial distribution. Binomial has a fixed number of trials and counts successes. Negative Binomial has a fixed number of successes and counts trials.
    *   Mixing up $r$ (number of successes) with $k$ (total number of trials).
    *   Not ensuring trials are independent and $p$ is constant.
    *   Incorrectly calculating the binomial coefficient (e.g., using $\binom{k}{r}$ instead of $\binom{k-1}{r-1}$).

---

## 5. Worked examples — multiple, with every step shown

Let's work through several examples to solidify understanding.

### Example 1: Binomial Distribution (Easy)

**Problem:** A fair coin is flipped 5 times. What is the probability of getting exactly 3 heads?

**Identify:**
*   This is a sequence of independent trials with two outcomes (heads/tails).
*   The number of trials is fixed ($n=5$).
*   We are counting the number of successes (heads).
*   This fits the **Binomial Distribution**.

**Given:**
*   Number of trials, $n = 5$
*   Probability of success (getting a head), $p = 0.5$ (since it's a fair coin)
*   Number of desired successes (heads), $k = 3$

**What we want:** $P(X=3)$, where $X \sim \text{Binomial}(n=5, p=0.5)$.

**Solution:**
The PMF for a Binomial distribution is $P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}$.

1.  **Substitute the given values into the PMF formula:**
    $$ P(X=3) = \binom{5}{3} (0.5)^3 (1-0.5)^{5-3} $$
    *Here, we are directly applying the Binomial PMF formula with $n=5$, $k=3$, and $p=0.5$.*

2.  **Calculate the binomial coefficient $\binom{5}{3}$:**
    $$ \binom{5}{3} = \frac{5!}{3!(5-3)!} = \frac{5!}{3!2!} $$
    *The binomial coefficient tells us how many different ways we can choose 3 positions for heads out of 5 flips.*

3.  **Expand the factorials:**
    $$ \binom{5}{3} = \frac{5 \times 4 \times 3 \times 2 \times 1}{(3 \times 2 \times 1)(2 \times 1)} = \frac{120}{6 \times 2} = \frac{120}{12} = 10 $$
    *Performing the factorial calculations.*

4.  **Calculate the probability terms:**
    $$ (0.5)^3 = 0.5 \times 0.5 \times 0.5 = 0.125 $$
    $$ (1-0.5)^{5-3} = (0.5)^2 = 0.5 \times 0.5 = 0.25 $$
    *These are the probabilities of getting 3 successes and 2 failures in a specific order.*

5.  **Multiply all parts together:**
    $$ P(X=3) = 10 \times 0.125 \times 0.25 $$
    $$ P(X=3) = 1.25 \times 0.25 $$
    $$ P(X=3) = 0.3125 $$
    *This is the final probability: the number of ways to get 3 heads in 5 flips, multiplied by the probability of any one specific sequence of 3 heads and 2 tails.*

**Final Answer:**
The probability of getting exactly 3 heads in 5 flips of a fair coin is $\boxed{0.3125}$.

**Reflection:** This example was straightforward because it directly asked for "exactly k" successes. The trickiest part for beginners is often correctly calculating the binomial coefficient.

---

### Example 2: Poisson Distribution (Medium)

**Problem:** A call center receives an average of 4 calls per hour. Assuming the number of calls follows a Poisson distribution, what is the probability that the call center receives *more than 2* calls in a randomly selected hour?

**Identify:**
*   We are counting events (calls) in a fixed interval (one hour).
*   Events are assumed to be independent and occur at a constant average rate.
*   This fits the **Poisson Distribution**.

**Given:**
*   Average rate of calls, $\lambda = 4$ calls per hour.

**What we want:** $P(X > 2)$, where $X \sim \text{Poisson}(\lambda=4)$.

**Solution:**
The PMF for a Poisson distribution is $P(X=k) = \frac{e^{-\lambda} \lambda^k}{k!}$.
To find $P(X > 2)$, it's easier to calculate the complement: $P(X > 2) = 1 - P(X \le 2)$.
This means $P(X > 2) = 1 - [P(X=0) + P(X=1) + P(X=2)]$.

1.  **Calculate $P(X=0)$:**
    $$ P(X=0) = \frac{e^{-4} 4^0}{0!} $$
    *Using the Poisson PMF for $k=0$. Remember $4^0 = 1$ and $0! = 1$.*
    $$ P(X=0) = \frac{e^{-4} \times 1}{1} = e^{-4} \approx 0.018316 $$

2.  **Calculate $P(X=1)$:**
    $$ P(X=1) = \frac{e^{-4} 4^1}{1!} $$
    *Using the Poisson PMF for $k=1$. Remember $1! = 1$.*
    $$ P(X=1) = \frac{e^{-4} \times 4}{1} = 4e^{-4} \approx 4 \times 0.018316 = 0.073264 $$

3.  **Calculate $P(X=2)$:**
    $$ P(X=2) = \frac{e^{-4} 4^2}{2!} $$
    *Using the Poisson PMF for $k=2$. Remember $2! = 2 \times 1 = 2$.*
    $$ P(X=2) = \frac{e^{-4} \times 16}{2} = 8e^{-4} \approx 8 \times 0.018316 = 0.146528 $$

4.  **Sum these probabilities:**
    $$ P(X \le 2) = P(X=0) + P(X=1) + P(X=2) $$
    $$ P(X \le 2) \approx 0.018316 + 0.073264 + 0.146528 $$
    $$ P(X \le 2) \approx 0.238108 $$
    *This is the probability of receiving 0, 1, or 2 calls.*

5.  **Calculate $P(X > 2)$ using the complement rule:**
    $$ P(X > 2) = 1 - P(X \le 2) $$
    $$ P(X > 2) \approx 1 - 0.238108 $$
    $$ P(X > 2) \approx 0.761892 $$
    *Subtracting the probability of 2 or fewer calls from 1 gives the probability of more than 2 calls.*

**Final Answer:**
The probability that the call center receives more than 2 calls in an hour is approximately $\boxed{0.7619}$.

**Reflection:** The main trick here is recognizing that "more than 2" means $X=3, 4, 5, \dots$ and that calculating the complement ($1 - P(X \le 2)$) is much more efficient than summing an infinite series. It also requires careful calculation of $e^{-\lambda}$ and factorials.

---

### Example 3: Geometric Distribution (Medium)

**Problem:** A basketball player makes 60% of their free throws. What is the probability that the player makes their first free throw on their 4th attempt? (Assume attempts are independent.)

**Identify:**
*   We are looking for the number of trials until the *first* success.
*   Each trial is a Bernoulli trial (make/miss).
*   This fits the **Geometric Distribution** (using the definition where $X$ is the total number of trials until the first success).

**Given:**
*   Probability of success (making a free throw), $p = 0.60$
*   Number of trials until the first success, $k = 4$

**What we want:** $P(X=4)$, where $X \sim \text{Geometric}(p=0.60)$.

**Solution:**
The PMF for a Geometric distribution (total trials definition) is $P(X=k) = (1-p)^{k-1} p$.

1.  **Substitute the given values into the PMF formula:**
    $$ P(X=4) = (1-0.60)^{4-1} (0.60) $$
    *We're applying the Geometric PMF for $k=4$ and $p=0.60$. This represents 3 failures followed by 1 success.*

2.  **Calculate the term $(1-p)^{k-1}$:**
    $$ (1-0.60)^{4-1} = (0.40)^3 $$
    $$ (0.40)^3 = 0.40 \times 0.40 \times 0.40 = 0.064 $$
    *This is the probability of having 3 consecutive failures.*

3.  **Multiply by the probability of success $p$:**
    $$ P(X=4) = 0.064 \times 0.60 $$
    $$ P(X=4) = 0.0384 $$
    *Multiplying the probability of 3 failures by the probability of a success on the 4th trial gives the overall probability.*

**Final Answer:**
The probability that the player makes their first free throw on their 4th attempt is $\boxed{0.0384}$.

**Reflection:** The key is recognizing that "first success on the k-th attempt" implies $k-1$ failures followed by one success. It's crucial to be consistent with the definition of the Geometric distribution used.

---

### Example 4: Negative Binomial Distribution (Hard)

**Problem:** In a factory, 15% of the items produced are defective. What is the probability that the 5th defective item found is the 20th item inspected? (Assume inspections are independent.)

**Identify:**
*   We are looking for the total number of trials until a specific number of successes (defective items) is reached.
*   Each inspection is a Bernoulli trial (defective/not defective).
*   This fits the **Negative Binomial Distribution** (using the definition where $X$ is the total number of trials until the $r$-th success).

**Given:**
*   Probability of success (finding a defective item), $p = 0.15$
*   Number of desired successes (defective items), $r = 5$
*   Total number of trials (items inspected), $k = 20$

**What we want:** $P(X=20)$, where $X \sim \text{Negative Binomial}(r=5, p=0.15)$.

**Solution:**
The PMF for a Negative Binomial distribution (total trials definition) is $P(X=k) = \binom{k-1}{r-1} p^r (1-p)^{k-r}$.

1.  **Substitute the given values into the PMF formula:**
    $$ P(X=20) = \binom{20-1}{5-1} (0.15)^5 (1-0.15)^{20-5} $$
    $$ P(X=20) = \binom{19}{4} (0.15)^5 (0.85)^{15} $$
    *This represents finding 4 defective items in the first 19 inspections, and then the 5th defective item on the 20th inspection.*

2.  **Calculate the binomial coefficient $\binom{19}{4}$:**
    $$ \binom{19}{4} = \frac{19!}{4!(19-4)!} = \frac{19!}{4!15!} $$
    *This counts the number of ways to arrange 4 successes (defective items) among the first 19 trials.*
    $$ \binom{19}{4} = \frac{19 \times 18 \times 17 \times 16}{4 \times 3 \times 2 \times 1} $$
    $$ \binom{19}{4} = 19 \times 3 \times 17 \times 2 = 3876 $$
    *Performing the factorial calculations. (Note: $18/ (3 \times 2) = 3$, $16/4 = 4$, so $19 \times 3 \times 17 \times 4 / (1 \times 1 \times 1 \times 1) = 3876$.)*

3.  **Calculate the probability terms:**
    $$ (0.15)^5 \approx 0.0000759375 $$
    $$ (0.85)^{15} \approx 0.0873542 $$
    *These are the probabilities of getting 5 successes and 15 failures in a specific order.*

4.  **Multiply all parts together:**
    $$ P(X=20) = 3876 \times 0.0000759375 \times 0.0873542 $$
    $$ P(X=20) \approx 3876 \times 0.0000066399 $$
    $$ P(X=20) \approx 0.02572 $$
    *This is the final probability, combining the number of arrangements with the probabilities of successes and failures.*

**Final Answer:**
The probability that the 5th defective item found is the 20th item inspected is approximately $\boxed{0.0257}$.

**Reflection:** This problem is harder due to the larger numbers involved in the binomial coefficient and the exponents, requiring a calculator. The key conceptual challenge is correctly setting up the PMF: understanding why it's $\binom{k-1}{r-1}$ and not $\binom{k}{r}$, and ensuring $k \ge r$.

---

## 6. Common mistakes and traps

Students often stumble on these points when working with discrete distributions:

1.  **Confusing Binomial with Geometric/Negative Binomial:**
    *   **Binomial:** Fixed number of trials ($n$), counting the number of successes ($k$). The question usually asks "What is the probability of $k$ successes in $n$ trials?"
    *   **Geometric/Negative Binomial:** Number of trials is *not* fixed; you're counting how many trials it takes *until* the first (Geometric) or $r$-th (Negative Binomial) success. The question usually asks "What is the probability that the $r$-th success occurs on the $k$-th trial?"
    *   **Trap:** Applying the Binomial PMF when the number of trials is itself the random variable, or vice-versa.

2.  **Incorrectly Identifying Parameters ($n, p, \lambda, r, k$):**
    *   **Trap:** Swapping $n$ and $k$ in Binomial, or $r$ and $k$ in Negative Binomial. Misinterpreting the average rate $\lambda$ in Poisson, or the probability of success $p$. Always double-check what each symbol represents in the context of the problem.

3.  **Forgetting "At Least," "At Most," or "Between" Probabilities:**
    *   **Trap:** Calculating $P(X=k)$ when the question asks for $P(X \ge k)$, $P(X \le k)$, or $P(a \le X \le b)$. These require summing multiple PMF values (or using the complement rule, as shown in the Poisson example).

4.  **Calculation Errors with Factorials, Exponents, or $e^{-\lambda}$:**
    *   **Trap:** Forgetting that $0! = 1$. Incorrectly calculating large factorials or powers. Rounding too early in intermediate steps, especially with $e^{-\lambda}$ in Poisson calculations, which can significantly affect the final answer.

5.  **Not Checking Assumptions (Independence, Constant Probability, Fixed Interval):**
    *   **Trap:** Applying a distribution where its underlying assumptions are violated. For example, using Binomial for drawing cards *without replacement* (where $p$ changes), or Poisson for events that are clearly not independent (e.g., a power outage causing a cascade of failures).

6.  **Inconsistent Definitions for Geometric/Negative Binomial:**
    *   **Trap:** Some textbooks define Geometric as the number of *failures before* the first success, while others define it as the *total number of trials* until the first success. Similarly for Negative Binomial. Be explicit about which definition you are using, as it affects the PMF formula and the expected value. (This lesson uses "total number of trials.")

## 7. Textbook-precise explanation

This section provides the formal, rigorous definitions as you would encounter them in an advanced university textbook.

---

**1. Bernoulli Distribution**

A discrete random variable $X$ is said to follow a Bernoulli distribution with parameter $p$, denoted $X \sim \text{Bernoulli}(p)$, if its probability mass function (PMF) is given by:
$$ P(X=k) = p^k (1-p)^{1-k} \quad \text{for } k \in \{0, 1\} $$
where $0 \le p \le 1$ is the probability of success.
The expected value is $E[X] = p$.
The variance is $Var[X] = p(1-p)$.
*Reference: Ross, S. M. (2014). *A First Course in Probability* (9th ed.). Pearson. Chapter 4, Section 4.1.*

---

**2. Binomial Distribution**

A discrete random variable $X$ is said to follow a Binomial distribution with parameters $n$ and $p$, denoted $X \sim \text{Binomial}(n, p)$, if it represents the number of successes in $n$ independent Bernoulli trials, each with probability of success $p$. Its probability mass function (PMF) is given by:
$$ P(X=k) = \binom{n}{k} p^k (1-p)^{n-k} \quad \text{for } k \in \{0, 1, \dots, n\} $$
where $n \in \{1, 2, 3, \dots\}$ is the number of trials, $0 \le p \le 1$ is the probability of success on a single trial, and $\binom{n}{k} = \frac{n!}{k!(n-k)!}$.
The expected value is $E[X] = np$.
The variance is $Var[X] = np(1-p)$.
*Reference: Walpole, R. E., Myers, R. H., Myers, S. L., & Ye, K. (2016). *Probability & Statistics for Engineers & Scientists* (9th ed.). Pearson. Chapter 5, Section 5.3.*

---

**3. Poisson Distribution**

A discrete random variable $X$ is said to follow a Poisson distribution with parameter $\lambda$, denoted $X \sim \text{Poisson}(\lambda)$, if it represents the number of events occurring in a fixed interval of time or space, provided these events occur with a known constant mean rate $\lambda$ and independently of the time since the last event. Its probability mass function (PMF) is given by:
$$ P(X=k) = \frac{e^{-\lambda} \lambda^k}{k!} \quad \text{for } k \in \{0, 1, 2, \dots\} $$
where $\lambda > 0$ is the average number of events in the given interval, and $e$ is the base of the natural logarithm.
The expected value is $E[X] = \lambda$.
The variance is $Var[X] = \lambda$.
*Reference: Blitzstein, J. K., & Hwang, J. (2019). *Introduction to Probability* (2nd ed.). CRC Press. Chapter 3, Section 3.6.*

---

**4. Geometric Distribution**

A discrete random variable $X$ is said to follow a Geometric distribution with parameter $p$, denoted $X \sim \text{Geometric}(p)$, if it represents the total number of independent Bernoulli trials required to achieve the first success. Its probability mass function (PMF) is given by:
$$ P(X=k) = (1-p)^{k-1} p \quad \text{for } k \in \{1, 2, 3, \dots\} $$
where $0 < p \le 1$ is the probability of success on a single trial.
The expected value is $E[X] = \frac{1}{p}$.
The variance is $Var[X] = \frac{1-p}{p^2}$.
*Reference: Ross, S. M. (2014). *A First Course in Probability* (9th ed.). Pearson. Chapter 4, Section 4.5.*

---

**5. Negative Binomial Distribution**

A discrete random variable $X$ is said to follow a Negative Binomial distribution with parameters $r$ and $p$, denoted $X \sim \text{Negative Binomial}(r, p)$, if it represents the total number of independent Bernoulli trials required to achieve the $r$-th success. Its probability mass function (PMF) is given by:
$$ P(X=k) = \binom{k-1}{r-1} p^r (1-p)^{k-r} \quad \text{for } k \in \{r, r+1, r+2, \dots\} $$
where $r \in \{1, 2, 3, \dots\}$ is the number of desired successes, and $0 < p \le 1$ is the probability of success on a single trial. Note that for $r=1$, the Negative Binomial distribution reduces to the Geometric distribution.
The expected value is $E[X] = \frac{r}{p}$.
The variance is $Var[X] = \frac{r(1-p)}{p^2}$.
*Reference: Walpole, R. E., Myers, R. H., Myers, S. L., & Ye, K. (2016). *Probability & Statistics for Engineers & Scientists* (9th ed.). Pearson. Chapter 5, Section 5.4.*

## 8. ASCII diagrams

Here are some conceptual ASCII diagrams to help visualize these distributions.

```text
Diagram 1: Bernoulli Trial (Single Event)

  Outcome:    Failure (0)    Success (1)
  Probability:  1-p             p

  Example: Coin Flip
  ------------------
  Outcome:    Tails          Heads
  Probability: 0.5            0.5


Diagram 2: Binomial Distribution (Fixed Trials, Count Successes)

  Experiment: Repeat N Bernoulli trials. Count K successes.
  -------------------------------------------------------------
  Trial 1: S/F
  Trial 2: S/F
  ...
  Trial N: S/F

  Possible K values: 0, 1, 2, ..., N

  PMF Example (N=5, p=0.5):
  P(X=k)
  ^
  |      *
  |    *   *
  |  *       *
  +------------------> k
    0  1  2  3  4  5
    (S=Success, F=Failure)


Diagram 3: Geometric Distribution (Trials Until 1st Success)

  Experiment: Repeat Bernoulli trials until 1st success.
  --------------------------------------------------------
  Trial 1: F
  Trial 2: F
  Trial 3: S <--- First Success on 3rd trial (k=3)

  Possible K values: 1, 2, 3, ... (infinite)

  PMF Example (p=0.5):
  P(X=k)
  ^
  | *
  |  *
  |   *
  |    *
  |     *
  +------------------> k
    1  2  3  4  5  6
    (Probability decreases exponentially)


Diagram 4: Negative Binomial Distribution (Trials Until R-th Success)

  Experiment: Repeat Bernoulli trials until R-th success.
  ---------------------------------------------------------
  Trial 1: F
  Trial 2: S
  Trial 3: F
  Trial 4: F
  Trial 5: S
  Trial 6: F
  Trial 7: S <--- 3rd Success (R=3) on 7th trial (k=7)

  Possible K values: R, R+1, R+2, ... (infinite)

  PMF Example (R=3, p=0.5):
  P(X=k)
  ^
  |         *
  |       *   *
  |     *       *
  +------------------> k
    3  4  5  6  7  8  9
    (Peaks later than Geometric, then decreases)


Diagram 5: Poisson Distribution (Events in an Interval)

  Experiment: Count events in a fixed interval (time/space).
  ----------------------------------------------------------
  Time Interval: |--------------------------------------|
  Events:        X  X    X  X      X X  X
  Count:         Number of X's in the interval (e.g., 8)

  Possible K values: 0, 1, 2, ... (infinite)

  PMF Example (lambda=2):
  P(X=k)
  ^
  |       *
  |     *   *
  |   *       *
  | *           *
  +------------------> k
    0  1  2  3  4  5  6
    (Shape depends on lambda; often skewed right)
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    *   **B**inary: **B**ernoulli (single yes/no)
    *   **B**unch of **B**inary: **B**inomial (fixed number of yes/no trials, count successes)
    *   **P**er **P**eriod: **P**oisson (events per unit time/space)
    *   **G**o for **G**old: **G**eometric (how many tries until the *first* success)
    *   **N**umerous **N**eeds: **N**egative Binomial (how many tries until the *r-th* success)

    Imagine a "Big Bad Nasty Green Python" (BBNGP) representing the order of increasing complexity or scope: Bernoulli (single), Binomial (many fixed), Poisson (many rare), Geometric (first success), Negative Binomial (r-th success).

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **Binomial PMF:** $P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}$
        *   *Why:* It's the most common and forms the basis for understanding the others (especially Poisson as a limit, and Bernoulli as $n=1$).
    *   **Poisson PMF:** $P(X=k) = \frac{e^{-\lambda} \lambda^k}{k!}$
        *   *Why:* Crucial for modeling event counts, and its mean/variance equality ($\lambda$) is a unique identifier.
    *   **Geometric PMF (Total Trials):** $P(X=k) = (1-p)^{k-1} p$
        *   *Why:* Essential for waiting time problems. The structure $(1-p)^{k-1} p$ clearly shows $k-1$ failures then 1 success.
    *   **Bonus Fact:** For all these, remember their means and variances. The relationship $E[X] = Var[X] = \lambda$ for Poisson is particularly noteworthy.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review all definitions, PMFs, means, and variances. Work through 2-3 simple examples for each.
    *   **Day 3:** Re-read and re-derive the PMFs from first principles (see below). Work through 2-3 medium-difficulty examples, mixing distributions.
    *   **Day 7:** Attempt 3-4 hard, multi-part problems. Write down the conditions for each distribution.
    *   **Day 16:** Review all concepts, focus on distinguishing between similar distributions (e.g., Binomial vs. Negative Binomial). Explain each distribution in your own words without looking at notes.
    *   **Day 35:** Create a mind map linking these distributions to each other and to broader probability concepts. Solve a challenging problem that requires identifying the correct distribution from a real-world scenario.

4.  **First-Principles Re-derivation Pathway:**
    *   **Bernoulli:** Trivial. $P(X=1)=p, P(X=0)=1-p$.
    *   **Binomial:**
        1.  Consider $k$ successes and $n-k$ failures. The probability of *one specific sequence* (e.g., SSSFF...F) is $p^k (1-p)^{n-k}$ due to independence.
        2.  How many such sequences are there? This is choosing $k$ positions for successes out of $n$ trials, which is $\binom{n}{k}$.
        3.  Multiply these: $P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}$.
    *   **Geometric (Total Trials):**
        1.  For the first success to occur on the $k$-th trial, the first $k-1$ trials must be failures, and the $k$-th trial must be a success.
        2.  Probability of a failure is $(1-p)$. Probability of a success is $p$.
        3.  Due to independence, the probability of this specific sequence (F, F, ..., F, S) is $(1-p) \times (1-p) \times \dots \times (1-p)$ ($k-1$ times) $\times p$.
        4.  So, $P(X=k) = (1-p)^{k-1} p$.
    *   **Negative Binomial (Total Trials):**
        1.  For the $r$-th success to occur on the $k$-th trial, the $k$-th trial *must* be a success.
        2.  This means that among the first $k-1$ trials, there must have been exactly $r-1$ successes.
        3.  The probability of $r-1$ successes in $k-1$ trials is given by the Binomial PMF: $\binom{k-1}{r-1} p^{r-1} (1-p)^{(k-1)-(r-1)}$.
        4.  Multiply this by the probability of the $k$-th trial being a success ($p$): $P(X=k) = \binom{k-1}{r-1} p^{r-1} (1-p)^{k-r} \times p$.
        5.  Combine the $p$ terms: $P(X=k) = \binom{k-1}{r-1} p^r (1-p)^{k-r}$.
    *   **Poisson:** This is typically derived as a limit of the Binomial distribution as $n \to \infty$ and $p \to 0$ such that $np = \lambda$ remains constant. While a full derivation is beyond a "first-principles re-derivation" in the sense of simple combinatorial logic, understanding it as the "law of rare events" or a limiting case of Binomial is crucial.

## 10. Connections — what this leads to

Understanding common discrete distributions is foundational for almost all subsequent topics in probability and statistics. They are the building blocks for:

1.  **Continuous Distributions:** Just as discrete distributions model countable outcomes, continuous distributions (like the Normal, Exponential, Gamma, Beta, etc.) model outcomes that can take any value within a range. The Poisson distribution, for instance, is closely related to the Exponential distribution (the waiting time between Poisson events is exponentially distributed).
2.  **Central Limit Theorem (CLT):** The Binomial distribution, when $n$ is large, can be approximated by the Normal distribution. This is a direct consequence of the CLT, which states that the sum (or average) of a large number of independent random variables will be approximately normally distributed. This is critical for statistical inference.
3.  **Statistical Inference:**
    *   **Hypothesis Testing:** These distributions are used to construct test statistics and p-values. For example, testing if a coin is fair (Binomial), or if the average rate of events has changed (Poisson).
    *   **Confidence Intervals:** Estimating population parameters (like $p$ for Binomial or $\lambda$ for Poisson) often involves using these distributions.
    *   **Parameter Estimation:** Methods like Maximum Likelihood Estimation (MLE) or Method of Moments rely on the PMFs of these distributions to estimate unknown parameters from observed data.
4.  **Stochastic Processes:** These distributions are the basis for understanding processes that evolve randomly over time.
    *   **Queuing Theory:** Modeling customer arrival rates (Poisson) and service times to optimize waiting lines.
    *   **Markov Chains:** Discrete distributions can define transition probabilities between states.
5.  **Regression Analysis:**
    *   **Logistic Regression:** While the output is continuous, it models the probability $p$ of a Bernoulli outcome.
    *   **Poisson Regression:** Used for modeling count data where the dependent variable follows a Poisson distribution (e.g., number of accidents, number of sales).
6.  **Reliability Engineering:** Assessing the failure rates of components (Geometric, Negative Binomial, Poisson) and predicting system lifetimes.
7.  **Actuarial Science:** Modeling the number of claims (Poisson) or the number of policies until a certain number of claims (Negative Binomial).
8.  **Machine Learning:**
    *   **Naive Bayes Classifiers:** Often assume features follow discrete distributions (e.g., Bernoulli for binary features, Multinomial for word counts, which is related to Binomial).
    *   **Anomaly Detection:** Deviations from expected Poisson counts can signal unusual activity.

## 11. Self-check questions

1.  **Easy:** A biased coin lands on heads with a probability of 0.7. If you flip the coin 8 times, what is the probability of getting exactly 6 heads? Identify the distribution, its parameters, and set up the formula.
2.  **Medium:** On average, 3 cars pass a certain checkpoint every 5 minutes. Assuming a Poisson distribution, what is the probability that *no more than 1* car passes the checkpoint in a 5-minute interval?
3.  **Medium-Hard:** A quality control inspector checks items on an assembly line. The probability that an item is defective is 0.05.
    *   a) What is the probability that the first defective item found is the 10th item inspected?
    *   b) What is the probability that the 3rd defective item found is the 10th item inspected?
    *   c) What is the expected number of items inspected until the first defective item is found?
4.  **Hard:** A new drug has a 70% success rate in treating a particular disease. A pharmaceutical company wants to find 4 patients who respond positively to the drug for a follow-up study.
    *   a) What is the probability that they need to treat exactly 6 patients to find these 4 positive responders?
    *   b) What is the expected number of patients they will need to treat to find 4 positive responders?
    *   c) If they treat 5 patients, what is the probability that *at least 3* of them respond positively? (Assume independent trials.)
5.  **Challenging:** Consider a scenario where customers arrive at a store according to a Poisson process with an average rate of $\lambda = 10$ customers per hour.
    *   a) What is the probability that exactly 5 customers arrive in a 30-minute period?
    *   b) What is the probability that the first customer arrives *after* 10 minutes? (Hint: This connects Poisson to a continuous distribution or can be solved by considering $P(X=0)$ in the interval.)
    *   c) If the store can only handle 12 customers per hour without becoming overcrowded, what is the probability that the store *does not* become overcrowded in a given hour?