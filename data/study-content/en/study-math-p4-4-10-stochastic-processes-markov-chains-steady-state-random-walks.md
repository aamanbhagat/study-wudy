## 1. The one-sentence answer
**A Markov chain is a memoryless stochastic process on a finite or countable state space whose long-run behaviour is captured by a unique steady-state distribution when the chain is irreducible and aperiodic; random walks are the special case in which transitions occur only to neighbouring states.**

The memoryless property means that the probability of moving to any next state depends solely on where you are now. All earlier history can be discarded without changing the future probabilities. This single restriction turns an arbitrary sequence of random variables into a tractable object whose evolution is completely described by a transition matrix.

Steady-state is the probability vector \(\pi\) that remains unchanged after one step: \(\pi P = \pi\). When such a vector exists and is unique, the chain forgets its starting point and the proportion of time spent in each state converges to the entries of \(\pi\). Random walks inherit the same structure but restrict the support of each row of \(P\) to adjacent vertices or lattice points.

> [!NOTE]
> The single most powerful fact is that the entire future trajectory is encoded in one matrix multiplication; everything else—absorption probabilities, hitting times, mixing rates—follows from powers of that matrix.

## 2. Why this matters — concrete and current
Google’s PageRank algorithm models the web as a giant Markov chain whose steady-state vector supplies the ranking scores; the original 1998 paper treats hyperlinks as transition probabilities and solves \(\pi P = \pi\) on billions of states.

In semiconductor manufacturing, Intel uses continuous-time Markov chains to predict defect propagation through successive lithography and etch steps; steady-state occupancy of each defect state directly informs yield-loss budgets reported in their quarterly technology reviews.

High-frequency trading desks at Jane Street simulate order-book dynamics as random walks on a discrete price lattice with state-dependent drift; the resulting hitting-time distributions determine optimal posting and cancellation thresholds executed in live markets.

Single-molecule experiments in biophysics track a DNA polymerase as a Markov chain on a template strand; steady-state probabilities of each incorporation state, measured via optical tweezers, calibrate kinetic models published in *Nature* papers on replication fidelity.

Queueing networks inside Amazon Web Services route requests across micro-services whose occupancy is modelled by product-form Markov chains; steady-state server utilisation feeds the autoscaling policies that keep latency below 10 ms for Prime Video traffic.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Finite-dimensional probability vectors | Steady-state is a left eigenvector of the transition matrix normalised to sum to 1. |
| Matrix multiplication    | One-step evolution is exactly \(\pi_{n+1} = \pi_n P\).    |
| Limits of sequences      | Convergence to steady-state is the limit of \(P^n\) as \(n\to\infty\). |
| Graph connectivity       | Irreducibility of the chain is equivalent to strong connectivity of its transition graph. |

## 4. Building the idea — from intuition to formalism

### Step 1 — States and the memoryless property
A stochastic process records a random outcome at each time. When the next outcome depends only on the present state, the process is Markovian.

Consider a weather model with states {sunny, rainy}. The chance it rains tomorrow depends only on today’s weather, not on yesterday’s.

Formally, \(P(X_{n+1}=j\mid X_n=i,X_{n-1}=i_{n-1},\dots,X_0=i_0)=P(X_{n+1}=j\mid X_n=i)\).

> [!WARNING]
> If dependence on two previous days is required, the process is no longer Markov on the original state space; enlarging the state to pairs restores the property but changes the matrix dimension.

### Step 2 — Transition probabilities
Each state \(i\) carries a probability distribution over the next state. These numbers are collected into a row-stochastic matrix \(P\) whose entries satisfy \(p_{ij}\ge0\) and \(\sum_j p_{ij}=1\).

In the weather example the matrix might read
\[
P=\begin{pmatrix}0.7&0.3\\0.4&0.6\end{pmatrix}.
\]

### Step 3 — One-step evolution
If the current distribution is the row vector \(\pi_n\), the distribution one step later is obtained by matrix multiplication: \(\pi_{n+1}=\pi_n P\).

This operation is associative, so the distribution after \(n\) steps is simply \(\pi_0 P^n\).

### Step 4 — Steady-state equations
A distribution \(\pi\) is stationary when it is unchanged by the dynamics: \(\pi=\pi P\). Written componentwise this yields the linear system
\[
\pi_j=\sum_i\pi_i p_{ij},\qquad\sum_j\pi_j=1.
\]

### Step 5 — Random walks on graphs
A random walk on an undirected graph chooses a neighbour uniformly at random. The transition matrix is therefore \(p_{ij}=1/\deg(i)\) whenever \(i\sim j\). The stationary distribution is proportional to degree: \(\pi_i=\deg(i)/(2m)\).

### Step 6 — Convergence theorem (textbook statement)
For an irreducible, aperiodic, finite-state Markov chain the powers \(P^n\) converge entrywise to the rank-one matrix whose rows are the unique stationary distribution \(\pi\).

## 5. Worked examples — every step shown

**Example 1 — Two-state weather chain**  
*Given:* Transition matrix
\[
P=\begin{pmatrix}0.7&0.3\\0.4&0.6\end{pmatrix}.
\]  
*Find:* Stationary distribution \(\pi\).  

Solve \(\pi P=\pi\) together with \(\pi_1+\pi_2=1\):  
\(\pi_1=0.7\pi_1+0.4\pi_2\) *Why:* expand the first component of the matrix equation.  
\(0.3\pi_1=0.4\pi_2\) *Why:* rearrange.  
Substitute \(\pi_2=1-\pi_1\) to obtain \(\pi_1=4/7\), \(\pi_2=3/7\).

**\(\pi=(4/7,3/7)\)**

*Reflection:* The algebra is only two equations; the same linear system scales to hundreds of states when solved numerically.

**Example 2 — Gambler’s ruin (absorbing chain)**  
*Given:* States 0,1,2,3; 0 and 3 absorbing, \(p_{i,i+1}=p_{i,i-1}=1/2\) for \(i=1,2\).  
*Find:* Probability of absorption at 3 starting from 1.  

Let \(h_i\) be the probability of hitting 3 from \(i\). Then \(h_0=0\), \(h_3=1\), and  
\(h_1=\frac12 h_0+\frac12 h_2= \frac12 h_2\),  
\(h_2=\frac12 h_1+\frac12 h_3=\frac12 h_1+\frac12\).  
Solving yields \(h_1=1/3\), \(h_2=2/3\).

**\(h_1=1/3\)**

*Reflection:* Boundary conditions replace the normalisation \(\sum\pi=1\) because probability mass eventually leaves the transient class.

**Example 3 — Simple symmetric random walk on \(\mathbb{Z}\)**  
*Given:* \(p_{i,i+1}=p_{i,i-1}=1/2\).  
*Find:* Return probability to 0 after 2 steps.  

The only paths are \(+-\) and \(-+\), each with probability \(1/4\), so total probability \(1/2\).

**\(P(X_2=0)=1/2\)**

*Reflection:* Parity shows the walk is periodic; steady-state does not exist on the infinite line.

**Example 4 — PageRank on a three-page web**  
*Given:* Dangling node adjustment yields
\[
P=\begin{pmatrix}0&1&0\\1/2&0&1/2\\0&1&0\end{pmatrix}.
\]  
*Find:* Stationary vector.  

Solve \(\pi P=\pi\), \(\sum\pi_i=1\): the unique solution is \(\pi=(1/4,1/2,1/4)\).

**\(\pi=(1/4,1/2,1/4)\)**

*Reflection:* The dangling-node fix guarantees irreducibility; without it the chain would have multiple stationary measures.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Treating periodic chains as convergent | Eigenvalue \(-1\) produces oscillation      | Compute gcd of return times before claiming limits   |
| Forgetting row versus column vectors | Notation inconsistency in literature        | Always write \(\pi\) as row vector and post-multiply |
| Assuming every chain has a unique stationary distribution | Reducible chains possess a convex set of stationary measures | Verify irreducibility via graph connectivity first   |
| Confusing hitting time with return time | Both use the same first-step equations      | Return time conditions on \(X_0=i\) and next visit; hitting time allows start elsewhere |
| Using \(P^n\) entries directly as probabilities when \(n\) is small | Transient effects dominate                  | Compute at least 10–20 steps or diagonalise \(P\)    |
| Normalising the left eigenvector incorrectly | Numerical solvers return unscaled vectors   | Always divide by the sum after solving \((P^T-I)v=0\) |
| Ignoring absorbing states when computing long-run averages | Absorption probability 1                     | Classify states first; discard transient classes     |

## 7. The textbook-precise statement
An irreducible, aperiodic Markov chain on a finite state space \(S\) possesses a unique probability vector \(\pi\) satisfying \(\pi P=\pi\). Moreover,
\[
\lim_{n\to\infty}P^n(i,j)=\pi_j\quad\text{for all }i,j\in S.
\]
(Grinstead & Snell, *Introduction to Probability*, 2e, §11.3, Theorem 11.8.)

## 8. Visual — diagram or schematic

```text
States:  S ──0.7──> S
          │         │
         0.3       0.4
          │         │
          v         v
          R <──0.6── R

Transition graph of two-state weather chain.
Self-loops carry probabilities 0.7 (sunny) and 0.6 (rainy).
```

## 9. The memory technique

**The hook**  
Picture a goldfish that only remembers the last second; every time it looks around it decides where to swim next using only its current bowl position. That goldfish is the Markov chain.

**What to overlearn**  
- \(\pi=\pi P\) together with \(\sum\pi_i=1\)  
- \(P^n(i,j)\to\pi_j\) for irreducible aperiodic finite chains  
- Stationary measure of random walk: \(\pi_i=\deg(i)/(2m)\)

**Spaced-repetition schedule**  
Review definitions at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive the balance equations \(\pi_j=\sum_i\pi_i p_{ij}\) by writing the law of total probability for the event \(\{X_{n+1}=j\}\) and passing to the limit.

## 10. What this unlocks
Mastery of Markov chains supplies the language for analysing any system whose future depends on a finite memory. The same matrix \(P\) reappears in reinforcement learning (value iteration), in queueing theory (embedded Markov chains), and in statistical physics (Glauber dynamics for Ising models).

- Mixing-time bounds and coupling arguments  
- Continuous-time Markov chains via the infinitesimal generator  
- Martingale methods for random-walk exit problems  
- Spectral graph theory through the normalised Laplacian  

## 11. Self-check — five questions, no answers
1. Write the transition matrix for a random walk on the cycle graph \(C_5\) and compute its stationary distribution by inspection.  
2. For the two-state chain in Example 1, compute \(P^3\) explicitly and verify that its rows approach \((4/7,3/7)\).  
3. A chain has period 2. Does \(\lim_{n\to\infty}P^n\) exist entrywise? Explain.  
4. In gambler’s ruin with total capital \(N=5\), compute the probability of eventual ruin starting with 2 units when the probability of winning a round is \(p=2/3\).  
5. Construct a reducible three-state chain possessing at least two distinct stationary distributions; exhibit them both.