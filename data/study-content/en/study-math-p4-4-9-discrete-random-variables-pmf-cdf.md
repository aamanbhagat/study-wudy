## 1. The one-sentence answer
**A discrete random variable is a function from a sample space to a countable set of numbers whose probabilities are completely described by a probability mass function (PMF) and accumulated by a cumulative distribution function (CDF).**

A random variable assigns a number to every possible outcome of an experiment. When the possible numbers are isolated points—0, 1, 2, … or perhaps only the values 3 and 7—the variable is called discrete. The PMF simply lists, for each possible number, the exact probability that the variable equals that number. The CDF adds those probabilities up as you move left to right, giving the probability that the variable is at most any chosen value.

The two functions are linked by definition: the CDF at any point is the sum of the PMF values at all points up to and including that point. Once either function is known, the other is determined. This pair replaces the need to manipulate the original sample space directly.

> [!NOTE]
> The single most important realization is that the PMF and CDF together turn an abstract probability space into ordinary arithmetic on a list or a step function; every later calculation is just addition or subtraction on those values.

## 2. Why this matters — concrete and current
In modern error-correcting codes used by NAND flash memory controllers at Samsung and Micron, the number of bit flips per 4 kB page is modeled as a discrete random variable whose PMF (a Poisson or binomial distribution) determines the required strength of LDPC codes; the CDF supplies the probability that more than t errors occur and a page must be retired.

In reinforcement-learning agents deployed by DeepMind for Atari games, the action-value function is estimated by treating the immediate reward as a discrete random variable whose PMF is learned directly; the CDF of the return distribution enables risk-sensitive policies that avoid actions whose lower-tail probability exceeds a safety threshold.

Single-photon detectors in quantum key distribution systems count photon arrivals in fixed time bins; the count is a discrete random variable whose PMF (thermal or Poisson) is measured to set detection thresholds, and its CDF gives the false-alarm rate used to compute the secure key rate in papers from the NIST quantum network testbed.

In high-frequency trading engines at Jane Street and Citadel, the number of limit-order arrivals inside a one-millisecond window is treated as a discrete random variable; the empirical PMF feeds a simulator whose CDF is used to size inventory buffers so that the probability of queue depletion stays below 0.1 %.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Sample space and events  | The random variable is defined on this space; events become sets of numbers. |
| Axiomatic probability    | Guarantees that PMF values are non-negative and sum to 1. |
| Countable sets           | Ensures the sum over the PMF is well-defined.             |
| Function notation        | PMF and CDF are ordinary functions of a real variable.    |

## 4. Building the idea — from intuition to formalism

### Step 1 — From outcomes to numbers
Any experiment produces outcomes. We care only about a numerical summary of each outcome.  
Concrete example: roll two fair dice; the outcome is an ordered pair, but we record only their sum.  
Formally, a random variable \(X\) is a function \(X:\Omega\to\mathbb{R}\) where \(\Omega\) is the sample space.  
> [!WARNING]  
> Treating \(X\) as the experiment itself rather than a function on its outcomes leads to confusion when the same numbers arise from different underlying outcomes.

### Step 2 — Restricting the range to countable sets
If the image of \(X\) contains only isolated points that can be listed, \(X\) is discrete.  
Example: the sum of two dice takes values in \(\{2,3,\dots,12\}\).  
Formally, \(X\) is discrete when there exists a countable set \(S\subset\mathbb{R}\) such that \(P(X\in S)=1\).

### Step 3 — The probability mass function
The PMF records the probability attached to each point in the range.  
Example: \(p_X(7)=6/36\) because six of the 36 dice pairs sum to 7.  
Formally,
\[
p_X(x)=\begin{cases}
P(X=x) & x\in S,\\
0 & \text{otherwise}.
\end{cases}
\]

### Step 4 — Normalization and support
The PMF must sum to one over its support.  
Example: \(\sum_{k=2}^{12}p_X(k)=1\).  
Formally,
\[
\sum_{x\in S}p_X(x)=1,\qquad p_X(x)\ge0.
\]

### Step 5 — The cumulative distribution function
The CDF accumulates probability from the left.  
Example: \(F_X(7)=P(X\le7)=21/36\).  
Formally,
\[
F_X(x)=P(X\le x)=\sum_{t\le x}p_X(t).
\]

### Step 6 — Recovery of the PMF from the CDF
Jumps of the CDF recover the PMF.  
Formally,
\[
p_X(x)=F_X(x)-F_X(x^-).
\]

### Step 7 — Textbook statement
A function \(p:\mathbb{R}\to[0,1]\) is the PMF of a discrete random variable if its support is countable and the sum of its values equals 1; the associated CDF is the partial-sum function defined above (Ross, *A First Course in Probability*, 10e, §2.2).

## 5. Worked examples — every step shown

**Example 1 — Single Bernoulli trial**  
*Given:* A coin with \(P(H)=p\) is flipped once; let \(X=1\) if heads, \(X=0\) if tails.  
*Find:* PMF and CDF of \(X\).  

- Write the possible values: \(X\in\{0,1\}\).  
  *Why:* The definition of a discrete random variable requires listing the countable range.  
- Compute \(p_X(1)=p\), \(p_X(0)=1-p\).  
  *Why:* These are the probabilities of the defining events.  
- The CDF is therefore
  \[
  F_X(x)=\begin{cases}
  0 & x<0,\\
  1-p & 0\le x<1,\\
  1 & x\ge1.
  \end{cases}
  \]
  *Why:* Add the masses up to and including \(x\).  

**\(p_X(x)\) and \(F_X(x)\) fully determined.**

*Reflection:* The example is trivial yet shows that both functions are completely fixed once the two masses are known.

**Example 2 — Sum of two independent dice**  
*Given:* Fair six-sided dice, \(X=\) sum.  
*Find:* \(p_X(7)\) and \(F_X(7)\).  

- Enumerate the 36 equally likely outcomes.  
  *Why:* Uniform probability measure on finite space.  
- Six outcomes give sum 7, so \(p_X(7)=6/36\).  
  *Why:* Direct counting.  
- \(F_X(7)=\sum_{k=2}^{7}p_X(k)=21/36\).  
  *Why:* Definition of CDF as cumulative sum.  

**\(p_X(7)=1/6\), \(F_X(7)=7/12\).**

*Reflection:* Even when the support is larger, the same two definitions suffice.

**Example 3 — Geometric distribution (number of trials until first success)**  
*Given:* Success probability \(p\), \(X=\) number of trials until first success.  
*Find:* Closed-form PMF and CDF.  

- \(P(X=k)=(1-p)^{k-1}p\) for \(k=1,2,\dots\).  
  *Why:* One success after \(k-1\) failures, independent trials.  
- CDF:
  \[
  F_X(x)=1-(1-p)^{\lfloor x\rfloor},\qquad x\ge1.
  \]
  *Why:* Finite geometric series sums the tail.  

**PMF and CDF obtained in closed form.**

*Reflection:* Infinite support appears, yet the summation identity still recovers the CDF.

**Example 4 — Mixture of two Poissons**  
*Given:* With probability \(1/2\), \(X\sim\mathrm{Poisson}(1)\); otherwise \(X\sim\mathrm{Poisson}(3)\).  
*Find:* Expression for \(p_X(k)\).  

- Law of total probability:
  \[
  p_X(k)=\frac12\cdot\frac{e^{-1}1^k}{k!}+\frac12\cdot\frac{e^{-3}3^k}{k!}.
  \]
  *Why:* Conditioning on which component is active.  
- CDF follows by summing the above from 0 to \(\lfloor x\rfloor\).  

**Explicit PMF written; CDF obtained by summation.**

*Reflection:* The support remains the non-negative integers, but the PMF is no longer a single standard family.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Writing \(p_X(x)>1\) for some \(x\) | Confusing PMF with CDF or density           | Check that every value is a probability ≤1.          |
| Treating CDF as continuous        | Visualizing every distribution as a smooth curve | Remember discrete CDFs are step functions with jumps exactly at the support points. |
| Forgetting \(p_X(x)=0\) outside support | Implicitly assuming every integer is possible | Explicitly set PMF to zero off the countable set \(S\). |
| Using \(F_X(x)=P(X<x)\) instead of \(P(X\le x)\) | Notation overlap with continuous case       | Always include the equality; discrete probability at the point matters. |
| Summing PMF over uncountable sets | Misapplying integral intuition              | Verify the index set is countable before writing \(\sum\). |
| Confusing support of \(X\) with range of CDF | CDF is defined on all reals                 | State the support of the PMF separately from the domain of the CDF. |
| Computing \(P(X=x)\) from CDF without left limit | Ignoring the jump definition                | Always subtract \(F_X(x^-)\).                        |

## 7. The textbook-precise statement
Let \(X:\Omega\to\mathbb{R}\) be a random variable on a probability space \((\Omega,\mathcal{F},P)\). \(X\) is discrete if there exists a countable set \(S\subset\mathbb{R}\) such that \(P(X\in S)=1\). The probability mass function of \(X\) is the function \(p_X:\mathbb{R}\to[0,1]\) given by
\[
p_X(x)=P(X=x),\qquad x\in S,
\]
and \(p_X(x)=0\) otherwise. The cumulative distribution function is
\[
F_X(x)=P(X\le x)=\sum_{t\le x}p_X(t),\qquad x\in\mathbb{R}.
\]
Any function \(p\) satisfying \(p(x)\ge0\) for all \(x\) and \(\sum_{x\in S}p(x)=1\) with countable \(S\) is the PMF of some discrete random variable (Ross, *A First Course in Probability*, 10e, §2.2).

## 8. Visual — diagram or schematic
```text
p_X(x)
  ^
  |          • 6/36
  |          | (at x=7)
  |   •      |
  |   |      |
  |   |  •   |
  +---+--+---+---> x
     2  7  12
F_X(x) is the running height of these bars; jumps occur only at integers 2 through 12.
```

## 9. The memory technique

1. **The hook** — Picture a staircase whose steps sit only at the possible values of \(X\); each step’s height is exactly the PMF mass, and the height you reach after any step is the CDF value.
2. **What to overlearn** — \(p_X(x)\ge0\), \(\sum p_X(x)=1\), and \(F_X(x)=\sum_{t\le x}p_X(t)\).
3. **Spaced-repetition schedule** — Review definitions after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive everything from \(P(X=x)\) by writing the two axioms (non-negativity and normalization) and the definition of cumulative probability.

## 10. What this unlocks
Mastery of the PMF–CDF pair lets you compute expectations, variances, and generating functions without returning to the sample space, and supplies the language for the Poisson limit theorem, the law of large numbers for discrete variables, and the construction of empirical distributions in statistics.

- Next: Expectation and variance of discrete random variables
- Next: Probability generating functions
- Next: Convergence in distribution for discrete sequences
- Next: Markov chains on countable state spaces

## 11. Self-check — five questions, no answers
1. A discrete random variable takes values in \(\{0,1,2\}\) with \(p(0)=1/4\), \(p(1)=1/2\). What must \(p(2)\) equal?
2. Write the CDF of the random variable in question 1 at the points \(x=-0.5\), \(x=0.5\), \(x=1.5\), \(x=2.5\).
3. If \(F_X(3.7)=0.4\) and \(p_X(4)=0.3\), what is \(F_X(4)\)?
4. Explain why a function that equals \(1/2\) at every integer cannot be a PMF.
5. Construct a discrete random variable whose CDF has a jump of size \(1/3\) at \(x=0\) and is continuous from the right everywhere.