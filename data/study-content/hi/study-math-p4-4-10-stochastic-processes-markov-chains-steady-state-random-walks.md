## 1. The one-sentence answer
**A Markov chain models a system that jumps between discrete states where the probability of the next jump depends only on the present state.**

Iska matlab yeh hai ki future behaviour sirf abhi wale state par depend karta hai. History ya purane states ka koi asar nahi padta. Random walk ek special case hai jisme states ek line, grid ya graph ke nodes hote hain aur har step ek neighbour ki taraf hota hai. Steady-state tab aata hai jab probabilities time ke saath stable ho jaati hain aur har state ki long-run frequency ek fixed vector se describe hoti hai.

Aap jab bhi kisi system ko “memoryless” dekh rahe hain — jaise ek molecule ka next position, ek web surfer ka next click, ya ek stock ka next move — Markov chain usko mathematically pakadti hai.

> [!NOTE]
> Sabse badi “aha” yeh hai ki ek hi transition matrix P se aap infinite future predict kar sakte ho bina har step ko simulate kiye; steady-state vector π sirf linear algebra (πP=π) se nikal jaata hai.

## 2. Why this matters — concrete and current
Google PageRank originally ek absorbing Markov chain tha jisme web pages states hain aur hyperlinks transition probabilities hain; har page ki steady-state probability uski ranking decide karti thi (Brin & Page, 1998).

In semiconductor manufacturing, Intel aur TSMC yield-prediction models mein defect propagation ko Markov chains se track karte hain taaki wafer-level failure probability calculate ho sake.

NASA’s Mars rovers path-planning algorithms random-walk based Monte-Carlo tree search use karte hain jab terrain map partially unknown hota hai; steady-state occupancy probabilities safe corridors batate hain.

Single-molecule tracking experiments (published in Nature Methods, 2022) DNA polymerase ke movement ko Markov chain se model karte hain; transition rates se enzyme kinetics nikalti hai.

Modern reinforcement learning libraries (DeepMind’s Acme, OpenAI’s Spinning Up) value-function estimation ke liye Markov Decision Processes ka steady-state analysis use karte hain jab policy evaluation karte hain.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Matrix multiplication    | Transition probabilities ko ek step se agle step tak le jaane ke liye |
| Eigenvectors & eigenvalues | Steady-state vector π exactly left eigenvector hai eigenvalue 1 ke saath |
| Probability axioms       | Rows of P stochastic matrices honi chahiye (non-negative + sum to 1) |
| Graph theory basics      | Random walks ko directed/undirected graphs ke adjacency matrix se link karne ke liye |

Agar eigenvectors ya stochastic matrices pehli baar dekh rahe ho to pehle linear algebra ka woh hissa revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — States and memoryless property
Aap ek finite set of states S = {1,2,…,n} soch lo. Har time t par system ek state mein hota hai. Markov property ka matlab hai P(X_{t+1}=j | X_t=i, X_{t-1},…,X_0) = P(X_{t+1}=j | X_t=i).

Example: Mausam model mein states “Sunny” aur “Rainy” hain. Agar aaj Sunny hai to kal Rainy hone ki probability 0.3 hai, chahe kal kaisa bhi tha.

Formal statement: $$P(X_{t+1}=j|X_t=i)=\,P_{ij}$$ jahaan P transition matrix hai.

> [!WARNING]
> Agar aap history ko bhi include karne lagen to process Markov nahi rahega aur pura state space explode ho jaayega.

### Step 2 — One-step and n-step transitions
P^k ke (i,j) entry probability deti hai ki system i se shuru hokar exactly k steps baad j par ho.

Example: 2-state chain P = [[0.7,0.3],[0.4,0.6]], tab P^2 calculate karne se 2 din baad probabilities milti hain.

Formal: $$P^{(k)}=P^k$$ matrix power se.

> [!WARNING]
> Matrix power galat calculate karne se probabilities negative ya >1 aa sakti hain — hamesha row-sum check karo.

### Step 3 — Steady-state equations
Agar system lambe time tak chalta rahe to probability distribution π satisfy karti hai π=πP aur ∑π_i=1.

Example: Upar wale 2-state chain mein π_1=0.4/0.7=4/7, π_2=3/7 solve hota hai.

Formal: $$\pi(I-P)=0$$ with normalisation.

> [!WARNING]
> Har chain ka steady-state nahi hota; periodic ya transient chains mein limit exist nahi karta.

### Step 4 — Random walk on a graph
States graph ke vertices hain. Transition probability 1/degree(i) hoti hai har neighbour ke liye.

Example: Cycle graph C_4 par random walk symmetric hota hai aur steady-state uniform 1/4 hota hai.

Formal: $$P_{ij}=A_{ij}/d_i$$ jahaan A adjacency matrix hai.

### Step 5 — Ergodicity conditions
Irreducible + aperiodic chain ke liye unique steady-state exist karti hai aur convergence hoti hai regardless of starting state.

Formal theorem (textbook grade): Finite-state irreducible aperiodic Markov chain ek unique stationary distribution π possess karti hai aur ||μP^n−π||→0 for any initial μ.

## 5. Worked examples — har step show karo

**Example 1 — Two-state weather chain**  
*Given:* P = [[0.7,0.3],[0.4,0.6]], initial sunny probability 1.  
*Find:* Probability rainy after 2 days.  
Step 1: Row vector [1,0] multiply by P gives [0.7,0.3].  
*Why:* Pehla step current distribution ko ek transition ke baad laata hai.  
Step 2: [0.7,0.3]P = [0.61,0.39].  
*Why:* Dusra multiplication do steps baad ki distribution deta hai.  
**Final answer**  
0.39  
*Reflection:* Simple multiplication se n-step behaviour samajh aata hai; yeh pattern badi chains mein bhi same rehta hai.

**Example 2 — Steady-state of same chain**  
*Given:* Same P.  
*Find:* π.  
Solve π_1=0.7π_1+0.4π_2, π_1+π_2=1.  
*Why:* Balance equations se flow in = flow out.  
**Final answer**  
π=(4/7,3/7)  
*Reflection:* Linear system solve karna hi steady-state nikaalne ka seedha tareeka hai.

**Example 3 — Gambler’s ruin (absorbing chain)**  
*Given:* States 0,1,2,3; 0 and 3 absorbing; fair game p=1/2.  
*Find:* Absorption probability to 3 starting from 1.  
Let u_i = prob absorb at 3 from i. u_0=0, u_3=1.  
u_1=½u_0+½u_2 → u_1=½u_2.  
u_2=½u_1+½u_3 → u_2=½u_1+½.  
Solve: u_1=1/3.  
**Final answer**  
1/3  
*Reflection:* Absorbing states add boundary conditions; method generalises to any absorbing chain.

**Example 4 — Random walk on undirected graph**  
*Given:* Complete graph K_3.  
*Find:* Steady-state.  
Each vertex degree 2, P uniform 1/2 to other two vertices.  
πP=π immediately satisfied by π=(1/3,1/3,1/3).  
**Final answer**  
(1/3,1/3,1/3)  
*Reflection:* Symmetric graphs par steady-state hamesha uniform hota hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to normalise π   | Students solve π(P−I)=0 but ignore sum=1    | Always add the extra equation ∑π_i=1         |
| Assuming every chain has steady-state | Periodic chains oscillate                   | Check gcd of cycle lengths =1 (aperiodicity) |
| Treating rows vs columns wrong | Confusion whether π row or column vector   | Consistently use row vector πP=π             |
| Using P^k without checking convergence | Transient behaviour misread as steady      | Compute ||P^{k+1}−P^k|| and see if →0        |
| Ignoring absorbing states   | Probability mass leaks to absorbing states  | Identify absorbing states before solving     |
| Wrong degree in random walk | Forgetting self-loops or weighted edges     | Always recompute degrees from adjacency      |

## 7. The textbook-precise statement
A discrete-time Markov chain on a finite state space S is a sequence {X_n} such that  
P(X_{n+1}=j | X_n=i,X_{n-1},…,X_0)=P_{ij}  
for all n and all histories. The matrix P=(P_{ij}) is stochastic: P_{ij}≥0, ∑_j P_{ij}=1.  
A probability distribution π on S is stationary if πP=π.  
Theorem (Norris, Markov Chains, 1997, Theorem 1.7.7): If the chain is irreducible and aperiodic then there exists a unique stationary distribution π and lim_{n→∞}P^n(i,j)=π_j for every i,j.

## 8. Visual — diagram or schematic
```
States:  1 ──0.3──> 2
         ^          |
         |0.4       |0.6
         |          v
         0.7 <──────
```
Labels: arrows = transition probabilities; self-loop on 1 shows 0.7 probability stay.

## 9. The memory technique
**The hook** — Imagine a goldfish that only remembers the last lily pad it sat on; that is exactly the Markov property.

**What to overlearn** — π=πP with ∑π_i=1; P stochastic matrix; irreducible + aperiodic ⇒ unique π and convergence.

**Spaced-repetition schedule** — Review definition after 1 day, solve one steady-state problem after 3 days, prove convergence theorem after 7 days, apply to a random-walk graph after 16 days, derive mixing time bound after 35 days.

**First-principles fallback** — Agar πP=π bhool jaaye to detailed balance equations likho: flow i→j = flow j→i for reversible chains, ya simply solve the linear system (I−P^T)π^T=0 plus normalisation.

## 10. What this unlocks
Yeh foundation deta hai continuous-time Markov chains, Poisson processes, MCMC sampling algorithms aur reinforcement learning ke policy evaluation step ko samajhne ke liye.

- Mixing time analysis aur cutoff phenomena
- Metropolis-Hastings algorithm
- Google’s PageRank eigenvalue formulation
- Queueing networks (Jackson networks)
- Spectral clustering on graphs via random-walk Laplacian

## 11. Self-check — five questions, no answers
1. 3-state chain ke liye P diya ho to 5 steps baad distribution kaise nikaalein?
2. Kyun kuch chains ka lim P^n exist nahi karta even though rows stochastic hain?
3. Random walk on a bipartite graph mein steady-state kyun nahi hoti?
4. Agar ek state transient hai to uski long-run probability kya hogi?
5. Derive the condition on the transition graph that guarantees uniqueness of π without using the word “irreducible”.