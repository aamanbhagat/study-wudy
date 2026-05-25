## What it is
A Markov chain is a mathematical model for a sequence of events where the probability of the next event depends *only* on the current state, not on the sequence of events that preceded it. This "memoryless" property is called the Markov property. It describes a system that transitions from one state to another within a finite or countable set of possible states.

## Why it matters
Markov chains are fundamental to modeling random systems across disciplines. In Computer Science, Google's original PageRank algorithm is a massive Markov chain where web pages are states. In Physics, they model the time evolution of systems in statistical mechanics and thermodynamics (e.g., diffusion). In aerospace, they are used in fault-tolerant computing to model system reliability and in signal processing to model error-correcting codes.

## When to study it
You must have a solid grasp of two areas before tackling this topic.
1.  **Probability Theory:** Specifically, conditional probability, Bayes' theorem, and the law of total probability. You should be comfortable with the notation $P(A|B)$.
2.  **Linear Algebra:** You need to be fluent in matrix multiplication, vector spaces, and especially eigenvalues and eigenvectors. The steady-state of a Markov chain is an eigenvector problem.

## How to study it (step by step)
1.  **Grasp the Markov Property.** Find a simple system (e.g., weather being sunny or rainy). Write down in words why $P(\text{Tomorrow is Sunny} | \text{Today is Sunny, Yesterday was Rainy})$ is the same as $P(\text{Tomorrow is Sunny} | \text{Today is Sunny})$. Internalize this "memoryless" idea.
2.  **Construct a Transition Matrix.** For the same system, assign probabilities to each possible transition (e.g., Sunny $\to$ Sunny, Sunny $\to$ Rainy, etc.). Arrange these into a square matrix $P$, where the entry $P_{ij}$ is the probability of moving from state $i$ to state $j$. Verify that each row sums to 1. Why must it?
3.  **Iterate the System.** Start with an initial state vector $\pi^{(0)}$ (a row vector of probabilities for being in each state). Calculate the state after one step: $\pi^{(1)} = \pi^{(0)}P$. Calculate the state after two steps: $\pi^{(2)} = \pi^{(1)}P = \pi^{(0)}P^2$. Derive this result and understand why matrix multiplication propagates the probabilities correctly.
4.  **Derive the Steady-State Equation.** Define the steady-state (or stationary distribution) $\pi$ as the state vector that does not change over time. This means $\pi^{(n+1)} = \pi^{(n)}$. Using the result from the previous step, show this implies $\pi = \pi P$.
5.  **Solve for the Steady-State.** Recognize that $\pi = \pi P$ is an eigenvector equation. Specifically, $\pi$ is the *left eigenvector* of the transition matrix $P$ corresponding to the eigenvalue $\lambda=1$. Solve this system of linear equations for a simple 2x2 or 3x3 matrix, remembering to use the constraint that the elements of $\pi$ must sum to 1.
6.  **Model a Random Walk.** Define a simple 1D random walk on a finite number of states (e.g., 3 states in a line: -1, 0, 1). Write down its transition matrix. Is it possible to get stuck? What happens at the boundaries? This connects the abstract chain to a physical process.

## Key ideas, with intuition
1.  **The Markov Property (Memorylessness):** The future is conditionally independent of the past, given the present. Formally, for a sequence of random variables $X_0, X_1, X_2, ...$:
    $$ P(X_{n+1}=j | X_n=i, X_{n-1}=i_{n-1}, ..., X_0=i_0) = P(X_{n+1}=j | X_n=i) $$
    *Intuition:* If you are modeling the weather, you don't need to know the entire history of sunny and rainy days. All the predictive power is contained in today's weather.

2.  **The Transition Matrix ($P$):** This matrix encodes the "rules" of the system. The entry in the $i$-th row and $j$-th column, $P_{ij}$, is the probability of moving from state $i$ to state $j$ in one step.
    $$ P_{ij} = P(X_{n+1}=j | X_n=i) $$
    *Intuition:* The matrix $P$ is a complete, one-step roadmap of the system's dynamics. Each row is a probability distribution, so its elements must be non-negative and sum to 1.

3.  **The State Vector ($\pi^{(n)}$):** This row vector tells you the probability of being in each state at time step $n$. For a system with $k$ states, $\pi^{(n)} = [\pi_1^{(n)}, \pi_2^{(n)}, ..., \pi_k^{(n)}]$, where $\sum_{i=1}^k \pi_i^{(n)} = 1$.
    *Intuition:* The state vector is a snapshot of the system's probabilistic configuration at a specific time. Multiplying it by $P$ evolves that snapshot one step into the future: $\pi^{(n+1)} = \pi^{(n)}P$.

4.  **The Steady-State Distribution ($\pi$):** For many chains, as $n \to \infty$, the state vector $\pi^{(n)}$ converges to a fixed distribution $\pi$, regardless of the initial state $\pi^{(0)}$. This equilibrium distribution satisfies the key equation:
    $$ \pi = \pi P $$
    *Intuition:* This is the point of balance. The probabilistic flow *out* of each state is exactly equal to the probabilistic flow *into* it. The system is still dynamic (states are changing), but the overall distribution of states is stable. This is an eigenvector equation for the eigenvalue $\lambda=1$.

## Worked example
**Problem:** A machine can be in one of two states: `Working` (W) or `Broken` (B).
- If it is `Working` today, there is a 90% chance it is `Working` tomorrow and a 10% chance it is `Broken`.
- If it is `Broken` today, there is a 60% chance it is `Working` tomorrow (after being repaired) and a 40% chance it is still `Broken`.

If the machine is `Working` on day 0, what is the probability it is `Working` on day 2? What is the long-term probability that the machine is `Working`?

**Solution:**

1.  **Define States and Transition Matrix.**
    Let state 1 be `Working` (W) and state 2 be `Broken` (B). The transition probabilities are:
    $P(W \to W) = 0.9$, $P(W \to B) = 0.1$
    $P(B \to W) = 0.6$, $P(B \to B) = 0.4$

    The transition matrix $P$ is:
    $$ P = \begin{pmatrix} 0.9 & 0.1 \\ 0.6 & 0.4 \end{pmatrix} $$
    *Reflection:* This matrix fully describes the one-step dynamics. The first row corresponds to starting in state W, the second to starting in state B. Both rows sum to 1, as required.

2.  **Calculate State on Day 2.**
    The initial state is `Working`, so the initial state vector is $\pi^{(0)} = [1 \quad 0]$.
    State on day 1:
    $$ \pi^{(1)} = \pi^{(0)}P = [1 \quad 0] \begin{pmatrix} 0.9 & 0.1 \\ 0.6 & 0.4 \end{pmatrix} = [0.9 \quad 0.1] $$
    State on day 2:
    $$ \pi^{(2)} = \pi^{(1)}P = [0.9 \quad 0.1] \begin{pmatrix} 0.9 & 0.1 \\ 0.6 & 0.4 \end{pmatrix} = [0.9(0.9) + 0.1(0.6) \quad 0.9(0.1) + 0.1(0.4)] $$
    $$ \pi^{(2)} = [0.81 + 0.06 \quad 0.09 + 0.04] = [0.87 \quad 0.13] $$
    The probability it is `Working` on day 2 is $0.87$.
    *Reflection:* This step-by-step application of matrix multiplication correctly propagates the probabilities through time, accounting for all possible paths.

3.  **Find the Steady-State Distribution.**
    Let the steady-state vector be $\pi = [\pi_W \quad \pi_B]$. We solve $\pi = \pi P$:
    $$ [\pi_W \quad \pi_B] = [\pi_W \quad \pi_B] \begin{pmatrix} 0.9 & 0.1 \\ 0.6 & 0.4 \end{pmatrix} $$
    This gives a system of two equations:
    1.  $\pi_W = 0.9\pi_W + 0.6\pi_B$
    2.  $\pi_B = 0.1\pi_W + 0.4\pi_B$

    From equation 1: $0.1\pi_W = 0.6\pi_B \implies \pi_W = 6\pi_B$.
    (Note: Equation 2 gives the same relationship: $0.6\pi_B = 0.1\pi_W$).
    We also have the constraint that probabilities must sum to 1:
    $\pi_W + \pi_B = 1$

    Substitute $\pi_W = 6\pi_B$ into the constraint:
    $6\pi_B + \pi_B = 1 \implies 7\pi_B = 1 \implies \pi_B = 1/7$.
    Then, $\pi_W = 6(1/7) = 6/7$.
    The steady-state distribution is $\pi = [6/7 \quad 1/7]$.
    The long-term probability that the machine is `Working` is $6/7 \approx 0.857$.
    *Reflection:* Solving the eigenvector equation gave us the *ratio* of probabilities. The normalization condition ($\sum \pi_i = 1$) provided the final piece to find the unique distribution.

## Diagrams
A state transition diagram for the worked example:

```text
      0.9
    +----->-----+
    |           |
   ( W )<----->( B )
    |    0.6    |    0.1
    +---------->+
           ^
           | 0.4
           +----+
```
*Description:* Two nodes, labeled `W` (Working) and `B` (Broken). An arrow from `W` looping back to itself is labeled `0.9`. An arrow from `W` to `B` is labeled `0.1`. An arrow from `B` to `W` is labeled `0.6`. An arrow from `B` looping back to itself is labeled `0.4`.

## Memory technique — remember this forever
1.  **Mnemonic:** "Markov's Memory is Missing." The future only cares about *now*. To predict tomorrow's weather, you look at today's sky, not last week's almanac.

2.  **Formulas to Overlearn:**
    -   **Transition Probability:** $P_{ij} = P(X_{n+1}=j | X_n=i)$ (The rulebook)
    -   **State Evolution:** $\pi^{(n+1)} = \pi^{(n)}P$ (The time-step)
    -   **Steady-State Equation:** $\pi = \pi P$ (The equilibrium)

3.  **Spaced Repetition Schedule:** Review this material and re-derive the steady-state equation from the state evolution equation at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, start from the law of total probability. The probability of being in state $j$ at time $n+1$ is the sum over all possible states $i$ at time $n$ of (the probability of being in state $i$ at time $n$) times (the probability of transitioning from $i$ to $j$). This is exactly what the matrix multiplication $\pi^{(n+1)} = \pi^{(n)}P$ calculates: $\pi_j^{(n+1)} = \sum_i \pi_i^{(n)} P_{ij}$. The steady state is simply the case where $\pi^{(n+1)} = \pi^{(n)}$.

## Common mistakes
1.  **Row vs. Column Stochastic Matrices:** We used row vectors for states ($\pi$) and a row-stochastic matrix ($P$, where rows sum to 1). Some texts use column vectors, which requires a column-stochastic matrix (columns sum to 1) and the evolution equation $x^{(n+1)} = P x^{(n)}$. Be consistent; mixing them up will lead to incorrect results.
2.  **Assuming a Steady State Exists:** Not all Markov chains have a unique steady-state distribution. A chain might be periodic (e.g., state A always goes to B, B always goes to A) or have transient states you can never return to. The chain must be *ergodic* (irreducible and aperiodic) for a unique steady state to exist.
3.  **Forgetting the Normalization Constraint:** The equation $\pi = \pi P$ will only define the *ratios* of the probabilities in $\pi$. You will always get a system with one redundant equation. You must add the external constraint $\sum \pi_i = 1$ to find the unique solution.

## Self-check
1.  Consider a 3-state Markov chain with transition matrix
    $$ P = \begin{pmatrix} 0.5 & 0.5 & 0 \\ 0 & 0.5 & 0.5 \\ 0.5 & 0 & 0.5 \end{pmatrix} $$
    If the system starts in state 1, what is the probability distribution after two steps?

2.  Find the steady-state distribution for the 2-state "random walk" on a line with reflecting boundaries, whose transition matrix is:
    $$ P = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} $$
    What is unusual about the behavior of $\pi^{(n)}$ in this case? Does it converge?

3.  Consider a simple 1D random walk on the integers $\mathbb{Z}$. At each step, you move right with probability $p$ and left with probability $1-p$. Why can this process *not* have a steady-state distribution? (Hint: What does $\sum \pi_i = 1$ imply for an infinite number of states?)