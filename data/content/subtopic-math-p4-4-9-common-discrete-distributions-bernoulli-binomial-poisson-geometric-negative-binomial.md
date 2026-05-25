## What it is
Discrete probability distributions model the probabilities of outcomes for a random variable that can only take on a finite or countably infinite number of values. The five distributions you've listed are foundational "families" of models for discrete events, each arising from a different story about the underlying random process, typically built from simple success/failure trials.

## Why it matters
These distributions are the building blocks of statistical modeling and machine learning. In aerospace, the Binomial distribution models the number of successful engine tests in a fixed batch, while the Poisson distribution models the number of micrometeoroid impacts on a satellite over a year. In computer science, the Geometric distribution can model the number of attempts needed to successfully transmit a data packet.

## When to study it
Before tackling this, you must have a solid grasp of basic probability theory: sample spaces, events, axioms of probability, and conditional probability. You must also be fluent in elementary combinatorics, specifically the binomial coefficient $\binom{n}{k}$. Finally, you should understand the definition of a random variable and its probability mass function (PMF).

## How to study it (step by step)
1.  **Master the Bernoulli Trial.** This is the atom. A single event with two outcomes: success (probability $p$) or failure (probability $1-p$). Derive its PMF, expected value, and variance. This is your foundation.
2.  **Build the Binomial.** Ask: "What if I run $n$ independent Bernoulli trials and count the successes?" Use combinatorics to derive the Binomial PMF from first principles. Understand *why* the $\binom{n}{k}$ term is necessary.
3.  **Build the Geometric.** Ask: "What if I run independent Bernoulli trials until I get my *first* success?" Derive the PMF for the number of trials required. Contrast this with the Binomial: here, the number of trials is the random variable.
4.  **Generalize to the Negative Binomial.** Ask: "What if I run independent Bernoulli trials until I get my $r$-th success?" Derive its PMF. See that the Geometric distribution is just a Negative Binomial with $r=1$.
5.  **Introduce the Poisson.** This one is different. Think of events happening at a constant average *rate* over time or space. Study its derivation as the limit of a Binomial distribution where $n \to \infty$ and $p \to 0$ such that $np = \lambda$ (a constant). This intuition is critical.
6.  **Solve targeted problems.** For each distribution, find and solve 3-5 problems that clearly match its "story." For example: (Binomial) number of defective items in a batch; (Poisson) number of calls to a help center in an hour; (Geometric) number of coin flips until the first heads.

## Key ideas, with intuition
1.  **The Bernoulli Trial is the building block.** Everything here (except Poisson, which is a limiting case) is constructed from a sequence of independent trials, each with a 'success' probability $p$ and a 'failure' probability $1-p$. The core question is always: what are we counting?

2.  **Fixed Trials vs. Trials until Success.** This is the main distinction.
    *   **Binomial**: You fix the number of trials, $n$. You count the number of successes, $k$.
    *   **Geometric/Negative Binomial**: You fix the number of successes you want to see ($1$ for Geometric, $r$ for Negative Binomial). You count the number of trials, $k$, it takes to achieve them.

3.  **The Poisson Process: Events in an Interval.** The Poisson distribution is fundamentally different. It doesn't count successes in a set number of trials. Instead, it models the number of times an event occurs in a fixed interval of time or space, given a known average rate, $\lambda$. The key assumptions are that events are independent and the rate is constant.

4.  **Relationships are key.** Understanding how these distributions relate to each other deepens your knowledge.
    *   **Bernoulli($p$)** is just a **Binomial($n=1, p$)**.
    *   A sum of $n$ independent **Bernoulli($p$)** variables is a **Binomial($n, p$)** variable.
    *   **Geometric($p$)** is a special case of **NegativeBinomial($r=1, p$)**.
    *   **Poisson($\lambda$)** is the limit of **Binomial($n, \lambda/n$)** as $n \to \infty$. This is useful for approximating Binomial probabilities when $n$ is large and $p$ is small.

## Worked example
**Problem:** A new type of rocket engine has a 90% success probability ($p=0.9$) for a single static fire test. The tests are independent. If we conduct 10 such tests ($n=10$), what is the probability that exactly 8 of them are successful?

**Solution:**
1.  **Identify the distribution.** We have a fixed number of independent trials ($n=10$). Each trial has two outcomes (success/failure) with a constant probability of success ($p=0.9$). We are counting the number of successes. This is the classic story for a Binomial distribution. Let $X$ be the random variable representing the number of successful tests. We say $X \sim \text{Binomial}(n=10, p=0.9)$.

2.  **Recall the PMF.** The probability mass function for a Binomial distribution is:
    $$ P(X=k) = \binom{n}{k} p^k (1-p)^{n-k} $$
    This formula makes intuitive sense:
    *   $p^k$: The probability of getting $k$ specific successes.
    *   $(1-p)^{n-k}$: The probability of getting the remaining $n-k$ specific failures.
    *   $\binom{n}{k}$: The number of ways to arrange those $k$ successes among the $n$ trials.

3.  **Plug in the values.** We want to find $P(X=8)$, with $n=10$, $k=8$, and $p=0.9$.
    $$ P(X=8) = \binom{10}{8} (0.9)^8 (1-0.9)^{10-8} $$

4.  **Calculate each term.**
    *   The binomial coefficient: $\binom{10}{8} = \frac{10!}{8!(10-8)!} = \frac{10 \times 9}{2 \times 1} = 45$.
    *   The success term: $(0.9)^8 \approx 0.43046721$.
    *   The failure term: $(0.1)^2 = 0.01$.

5.  **Compute the final probability.**
    $$ P(X=8) = 45 \times 0.43046721 \times 0.01 \approx 0.1937 $$

**Reflection:** Each step directly followed from identifying the underlying process. Recognizing the "fixed number of trials" story immediately pointed to the Binomial distribution. The PMF was then a direct application of combinatorics and probability rules for independent events.

## Diagrams
Here is a conceptual map of the relationships between the distributions:

```text
               +----------------------+
               |   Bernoulli Trial    |  (Single success/failure event, prob p)
               |       X ~ Bern(p)    |
               +----------------------+
                         |
                         | Sum over n independent trials
                         v
               +----------------------+
               |  Binomial Dist.      |  (Count k successes in n trials)
               |   X ~ Bin(n, p)      |
               +----------------------+
                         |
                         | Take limit as n->inf, p->0, np=lambda
                         v
               +----------------------+
               |    Poisson Dist.     |  (Count k events in an interval, rate lambda)
               |    X ~ Pois(lambda)  |
               +----------------------+


               +----------------------+
               |   Bernoulli Trial    |
               +----------------------+
                         |
                         | Count trials until 1st success
                         v
               +----------------------+
               |   Geometric Dist.    |  (k trials needed for 1st success)
               |    X ~ Geo(p)        |
               +----------------------+
                         |
                         | Generalize to r successes
                         v
               +----------------------+
               | Neg. Binomial Dist.  |  (k trials needed for r-th success)
               |   X ~ NB(r, p)       |
               +----------------------+
```

And here is a sample PMF for our Binomial(10, 0.9) example:

```text
P(X=k)
  ^
  |
0.4 -
  |
0.3 -
  |                             #
0.2 -                           #
  |             #               #
0.1 -           #               #
  |     #       #       #       #
--+-------------------------------------> k (number of successes)
  0 1 2 3 4 5 6 7       8       9      10
```

## Memory technique — remember this forever
1.  **The Story:** Imagine you're at a carnival game. You're throwing darts at a balloon.
    *   **Bernoulli**: You throw ONE dart. Did it pop? (Success/Failure).
    *   **Binomial**: You buy 10 darts ($n=10$). How many balloons ($k$) did you pop? (Fixed trials, count successes).
    *   **Geometric**: You keep throwing darts until you pop your FIRST balloon. How many darts ($k$) did it take? (Count trials until 1st success).
    *   **Negative Binomial**: You promise to pop 5 balloons ($r=5$) for your friend. How many darts ($k$) did you have to throw to pop the 5th one? (Count trials until r-th success).
    *   **Poisson**: The carnival owner says people pop balloons at an average rate of 2 per minute ($\lambda=2$). How many might be popped in the next minute ($k$)? (Count events in a fixed interval).

2.  **Formulas to Overlearn:** Do not paraphrase these. Burn them into memory.
    *   **Binomial PMF:** $P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}$ for $k \in \{0, 1, ..., n\}$
    *   **Poisson PMF:** $P(X=k) = \frac{\lambda^k e^{-\lambda}}{k!}$ for $k \in \{0, 1, 2, ...\}$

3.  **Spaced Repetition Schedule:** Review these concepts and re-derive the PMFs from the "story" at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget a formula, rebuild it. For Binomial/Geometric/Negative Binomial, start with a specific sequence of independent successes (S) and failures (F).
    *   Example for Binomial($n=4, k=2$): One possible sequence is SSFF. The probability is $p \cdot p \cdot (1-p) \cdot (1-p) = p^2(1-p)^2$.
    *   Now ask: "How many such sequences are there?" This is a combinatorics problem. For SSFF, it's the number of ways to arrange the 2 S's in 4 spots, which is $\binom{4}{2}$.
    *   Combine them: $\binom{4}{2} p^2 (1-p)^2$. This is the PMF. You can rebuild all of them this way.

## Common mistakes
1.  **Binomial vs. Negative Binomial Confusion:** The most common error. Always ask: is the number of trials fixed (Binomial), or are we continuing until we hit a target number of successes (Negative Binomial/Geometric)?
2.  **Off-by-One Errors in Geometric/NB:** Be precise about the random variable definition. Does $X=k$ mean the success occurred *on* the $k$-th trial, or after $k-1$ failures? The PMF changes slightly depending on the convention. The one used here ($P(X=k) = (1-p)^{k-1}p$) assumes $X$ is the trial number of the first success.
3.  **Misinterpreting the Poisson Rate $\lambda$**: If a satellite gets an average of 3 impacts per year, and you are asked for the probability of impacts in a 6-month period, you must adjust the rate. The new rate is $\lambda' = 3 \times (0.5 \text{ years}) = 1.5$. The rate parameter must match the interval of the question.
4.  **Forgetting Independence:** All these models (except for more advanced variations) assume the trials or events are independent. If the outcome of one test affects the next, these distributions do not apply.

## Self-check
1.  A fair coin is tossed 6 times. What is the probability of getting exactly 3 heads? Which distribution applies and why?
2.  On average, a star-tracking sensor on a spacecraft has to be recalibrated 0.5 times per day due to cosmic ray interference. What is the probability that it requires no recalibrations on a given 3-day mission leg?
3.  A manufacturing process for a critical bolt has a 1% defect rate. You need 5 non-defective bolts for an assembly. What is the probability that you find the 5th non-defective bolt on your 7th inspection? What assumptions are you making?