## 1. The one-sentence answer
**A function assigns every element of its domain exactly one element of its codomain, and the range is the subset of the codomain that is actually reached.**

A function is a rule that pairs each allowed input with exactly one output. The domain collects every input the rule is permitted to receive. The codomain is the larger set from which outputs are chosen in advance. The range is the smaller set of outputs that the rule actually produces.

Think of a vending machine. The domain is the set of coins the machine accepts. The codomain is the set of all items stocked in the machine. The range is the set of items that actually come out when valid coins are inserted. Changing the machine’s internal wiring can shrink the range without changing the codomain.

> [!NOTE]
> The range is always a subset of the codomain; the two sets coincide only when the function is surjective.

## 2. Why this matters — concrete and current
In aerospace trajectory software, the domain of a guidance function is the set of valid sensor readings (angles, velocities) while its codomain is the set of possible thrust-vector commands; the range determines which commands are reachable and therefore which collision-avoidance maneuvers are feasible on the Mars Perseverance rover.

In transformer language models at OpenAI and Google, each attention head defines a function whose domain is the set of token embeddings seen so far and whose codomain is the vector space of possible next-token logits; the range of the softmax output controls which tokens the model can actually generate.

Semiconductor timing analysis at TSMC treats propagation delay as a function whose domain is the set of valid supply voltages and temperatures; the range of that function must lie inside the codomain of acceptable clock periods or the chip fails static-timing verification.

In quantum-circuit simulation, the unitary operator is a function whose domain is the set of valid input state vectors on the Bloch sphere and whose codomain is the set of all possible output state vectors; the range tells physicists which measurement outcomes remain reachable after noise.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Set notation     | Domain, codomain and range are sets; we must describe membership and subsets precisely. |
| Ordered pairs    | A function is a special set of ordered pairs; this view makes the definitions rigorous. |
| Basic mapping intuition | We need to picture “input → output” before distinguishing the three sets. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Inputs that are allowed
A function cannot be asked to operate on just any object; only certain objects are permitted.  
Example: the squaring rule applied only to integers.  
Formally, the **domain** \(D\) of \(f\) is the set of all first components of the ordered pairs that constitute \(f\):
\[
D = \{ x \mid \exists y\ (x,y)\in f \}.
\]
> [!WARNING] Treating the domain as “all real numbers” without checking leads to undefined expressions such as division by zero.

### Step 2 — Outputs chosen from a declared target
When we define a function we also declare a set that will contain every possible output, even if some elements are never produced.  
Example: codomain declared as the integers when squaring positive integers.  
Formally, the **codomain** \(C\) is any set such that
\[
f\subseteq D\times C.
\]

### Step 3 — Outputs that actually appear
Some elements of the codomain may never be reached. The set of those that are reached is the range.  
Example: range of \(x\mapsto x^2\) over positive integers is the perfect squares.  
Formally, the **range** (image) is
\[
f(D) = \{ y\in C \mid \exists x\in D\ (x,y)\in f \}.
\]

### Step 4 — Subset relation
Every element of the range is, by construction, an element of the codomain, but the converse need not hold.  
Formally,
\[
f(D)\subseteq C.
\]

### Step 5 — The textbook definition of a function
A function \(f:D\to C\) is a set of ordered pairs satisfying: (i) every element of \(D\) appears exactly once as a first component, (ii) every second component lies in \(C\).

## 5. Worked examples — every step shown

**Example 1 — Constant function**  
*Given:* \(f=\{(1,4),(2,4),(3,4)\}\), \(C=\mathbb{Z}\).  
*Find:* domain, codomain, range.  

Step 1: Collect first components → domain \(D=\{1,2,3\}\).  
*Why:* definition of domain.  

Step 2: The declared target set is already given → codomain \(C=\mathbb{Z}\).  
*Why:* explicit declaration.  

Step 3: Collect second components that appear → range \(f(D)=\{4\}\).  
*Why:* only value actually attained.  

**Example 2 — Linear function over reals**  
*Given:* \(f(x)=2x+1\), \(D=\mathbb{R}\), \(C=\mathbb{R}\).  
*Find:* range.  

Step 1: Solve \(y=2x+1\) for \(x\) → \(x=\frac{y-1}{2}\).  
*Why:* every real \(y\) yields a real \(x\).  

Step 2: Therefore range equals codomain \(\mathbb{R}\).  
*Why:* surjective onto declared codomain.  

**Example 3 — Quadratic with restricted domain**  
*Given:* \(f(x)=x^2\), \(D=\{x\in\mathbb{R}\mid x\geq 0\}\), \(C=\mathbb{R}\).  
*Find:* range.  

Step 1: For \(x\geq 0\), \(x^2\geq 0\).  
*Why:* square of non-negative number is non-negative.  

Step 2: For any \(y\geq 0\) set \(x=\sqrt{y}\in D\).  
*Why:* square root returns non-negative value.  

Step 3: Range = \([0,\infty)\).  
**Final answer**  
\[
\text{range}=[0,\infty).
\]

**Example 4 — Function given by formula with hidden restriction**  
*Given:* \(f(x)=\frac{1}{x-2}\), \(D=\mathbb{R}\setminus\{2\}\), \(C=\mathbb{R}\).  
*Find:* range.  

Step 1: Set \(y=\frac{1}{x-2}\).  
*Why:* prepare to solve.  

Step 2: \(x=2+\frac{1}{y}\).  
*Why:* algebraic rearrangement.  

Step 3: \(y\neq 0\) because denominator would be undefined.  
*Why:* \(x\) must stay in domain.  

Step 4: Range = \(\mathbb{R}\setminus\{0\}\).  
**Final answer**  
\[
\text{range}=\mathbb{R}\setminus\{0\}.
\]

*Reflection:* the last two examples show that algebraic rearrangement plus domain constraints together determine the range.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Declaring codomain = range automatically | Habit from school where codomain is omitted | Always state codomain first, then compute range separately |
| Forgetting domain restrictions    | Treating every formula as defined on all reals | Scan for division by zero, even roots of negatives, logs of non-positive numbers |
| Writing range as an interval without proof | Assuming continuity implies all intermediate values | Solve \(y=f(x)\) explicitly for every claimed \(y\) |
| Using “output” ambiguously        | Colloquial language collapses codomain and range | Use only the three technical terms           |
| Assuming finite sets have range equal to codomain | Small examples often happen to be surjective | Check whether every element of codomain is hit |
| Ignoring empty domain             | Edge case rarely discussed                  | Verify \(D\neq\emptyset\) before claiming properties |
| Confusing “image of element” with range | Notation \(f(x)\) versus \(f(D)\)           | Reserve \(f(D)\) for the set of all outputs |

## 7. The textbook-precise statement
Let \(D\) and \(C\) be sets. A **function** \(f\) from \(D\) to \(C\) is a subset \(f\subseteq D\times C\) such that for every \(x\in D\) there exists a unique \(y\in C\) with \((x,y)\in f\). The set \(D\) is the **domain** of \(f\), the set \(C\) is the **codomain** of \(f\), and the set
\[
f(D)=\{y\in C\mid \exists x\in D\ (x,y)\in f\}
\]
is the **range** (or image) of \(f\). (See Rosen, *Discrete Mathematics and Its Applications*, 8e, §2.3.)

## 8. Visual — diagram or schematic
```text
Domain D          Codomain C
{1, 2, 3}   ──f──► {a, b, c, d}
   │               ▲
   │               │
   └──► a          │
       b  ◄────────┘  (range = {a, b})
       (c, d never reached)
```
Arrows leave every element of D exactly once and land inside C; the range is the subset of C that receives at least one arrow.

## 9. The memory technique
1. **The hook** — Picture a mail-sorting office: the domain is every street the postman is allowed to visit, the codomain is every possible mailbox in the city, and the range is the mailboxes that actually receive letters today.  
2. **What to overlearn** — Domain = allowed inputs; codomain = declared target set; range ⊆ codomain always.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Rebuild from the ordered-pair definition: list every pair, collect first components for domain, declared second-set for codomain, attained second components for range.

## 10. What this unlocks
Mastery of domain, codomain and range lets you state precisely when a function is injective, surjective or bijective and prepares the ground for inverse functions.  
- Injective and surjective functions  
- Inverse-function theorem  
- Function composition and images of sets  
- Limits and continuity (domain restrictions become vertical asymptotes)  
- Linear transformations and their column spaces (range = column space)

## 11. Self-check — five questions, no answers
1. Give the domain, codomain and range of \(f(x)=\sqrt{x-1}\) when the codomain is declared to be \(\mathbb{R}\).  
2. Construct a function whose range is strictly smaller than its codomain even though both sets are finite and have the same cardinality.  
3. Explain why the equation \(y=x^2+1\) defines a function from \(\mathbb{R}\) to \([1,\infty)\) but not from \(\mathbb{R}\) to \(\mathbb{R}\).  
4. A piecewise function is defined by \(f(x)=x\) for \(x<0\) and \(f(x)=x+1\) for \(x\geq 0\). Determine its range when the codomain is \(\mathbb{R}\).  
5. Prove or disprove: if \(D\) is empty then the range must also be empty, regardless of the codomain.