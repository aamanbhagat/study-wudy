## 1. The one-sentence answer

**Domain** is the complete set of allowed inputs, **codomain** is the declared set of possible outputs, and **range** is the actual set of outputs that the function produces.

A function is a precise rule that takes every element from the domain and sends it to exactly one element in the codomain. The range is always a subset of the codomain; it may be smaller because some values in the codomain might never appear. When you change the domain you can change the range even if the rule stays the same.

The distinction matters the moment you start proving statements about functions or writing code that must never crash on invalid inputs.

> [!NOTE]
> The range is discovered after you apply the rule; the domain and codomain are chosen before you apply it. This single ordering prevents almost every later confusion.

## 2. Why this matters — concrete and current

In training large language models, the input domain is restricted to token IDs from a fixed vocabulary; choosing a wrong domain produces out-of-distribution embeddings that break gradient flow in the attention layers at OpenAI and Google DeepMind.

Spacecraft trajectory software at NASA’s Jet Propulsion Laboratory defines the domain of the gravitational potential function over position vectors that avoid planetary radii; an incorrect domain lets the integrator step inside a planet and produces mission-ending NaN values.

Semiconductor timing analysis tools from Synopsys treat arrival time as a function whose domain is the set of valid clock edges; the range tells designers the actual slack, while the codomain is the larger set of all real numbers that could theoretically appear.

In type-safe programming languages such as Rust and Haskell, the domain and codomain are encoded in function signatures; the compiler uses them to reject entire classes of runtime errors before the program runs.

Natural phenomena such as blackbody radiation restrict the domain of Planck’s law to positive frequencies; extending the domain to negative values yields non-physical negative energy densities.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Set                  | Domain, codomain and range are all sets; you must be able to list or describe their elements. |
| Ordered pair         | A function is a set of ordered pairs; the first element must come from the domain. |
| Basic mapping intuition | You already know that each input produces exactly one output; this lesson only names the sets involved. |

If any row above is unfamiliar, pause and review sets first.

## 4. Building the idea — from intuition to formalism

### Step 1 — A machine with an input gate
Think of a function as a machine that accepts only certain objects through its input gate. The gate’s size and shape define the domain.

Example: the squaring machine accepts any real number.  
Formal statement: Let \(D = \mathbb{R}\). Then the rule \(f(x) = x^2\) is defined for every \(x \in D\).

> [!WARNING]
> If you later feed the machine a value outside \(D\), the rule itself becomes undefined; every later calculation collapses.

### Step 2 — Declaring the output drawer
Before you turn the machine on, you also declare a drawer large enough to hold every possible result you might ever see. That drawer is the codomain.

Example: you decide the drawer will be all real numbers, written \(C = \mathbb{R}\).  
Formal statement: \(f: D \to C\) where \(C = \mathbb{R}\).

### Step 3 — Observing what actually lands in the drawer
After running every allowed input, you look inside the drawer and see only non-negative numbers. That smaller set is the range.

Example: \(f(x) = x^2\) never produces a negative value.  
Formal statement: range \(R = \{ y \in C \mid y \geq 0 \} = [0, \infty)\).

### Step 4 — Range is always a subset of codomain
Because you chose \(C\) first, every value that actually appears must already be inside \(C\). Hence \(R \subseteq C\).

### Step 5 — Changing the domain changes the range
If you shrink the gate to \(D = [0, 2]\), the machine still follows \(f(x) = x^2\), but now the range shrinks to \([0, 4]\).

Formal statement: \(R = \{ x^2 \mid x \in [0, 2] \} = [0, 4]\).

### Step 6 — Restricting the codomain does not change the range
You may later say “I only care about outputs up to 10”, so you set a new codomain \(C' = [0, 10]\). The range remains \([0, 4]\) because the machine never produced anything larger.

### Step 7 — Notation that records all three sets
We write \(f: D \to C\) and separately state \(R = f(D)\). This single line tells a reader the chosen gate, the declared drawer, and the actual contents.

### Step 8 — Textbook-grade definition
A function \(f\) from domain \(D\) to codomain \(C\) is a rule that assigns to each element of \(D\) exactly one element of \(C\). The range of \(f\) is the set \(R = \{ f(x) \mid x \in D \}\).

## 5. Worked examples — har step show karo

**Example 1 — Simple polynomial**  
*Given:* \(f(x) = x^2 + 1\), \(D = \mathbb{R}\), \(C = \mathbb{R}\).  
*Find:* range \(R\).

All real inputs are allowed, so \(D = \mathbb{R}\).  
The smallest value occurs at \(x = 0\): \(f(0) = 1\).  
As \(|x|\) grows, \(f(x)\) grows without bound.  
Hence every value \(\geq 1\) appears.  
**\(R = [1, \infty)\)**

*Reflection:* The example is easy because the parabola never dips below 1; the same rule with a different domain would give a different range.

**Example 2 — Restricted domain**  
*Given:* \(f(x) = \sqrt{x-3}\), \(D = [3, \infty)\), \(C = \mathbb{R}\).  
*Find:* range.

Inside the square root, \(x-3 \geq 0\) forces \(D = [3, \infty)\).  
Let \(y = \sqrt{x-3}\). Then \(y \geq 0\) and \(x = y^2 + 3\).  
Every \(y \geq 0\) is reached.  
**\(R = [0, \infty)\)**

*Reflection:* The domain restriction moved the starting point; the codomain still contained negatives that the range never used.

**Example 3 — Fractional function**  
*Given:* \(f(x) = \frac{1}{x}\), \(D = \mathbb{R} \setminus \{0\}\), \(C = \mathbb{R}\).  
*Find:* range.

Zero is excluded from the domain because division by zero is undefined.  
For any \(y \neq 0\), solve \(x = 1/y\); \(x\) is never zero.  
Thus every non-zero real is attained.  
**\(R = \mathbb{R} \setminus \{0\}\)**

*Reflection:* The range equals the codomain minus one point; students often forget to remove zero from the range as well.

**Example 4 — Piecewise with finite domain**  
*Given:*  
\[
f(x) = 
\begin{cases} 
x+1 & 0 \leq x < 2 \\
3 & 2 \leq x \leq 3 
\end{cases}
\]  
\(D = [0, 3]\), \(C = \mathbb{R}\).  
*Find:* range.

On \([0, 2)\) the outputs run over \([1, 3)\).  
At every point in \([2, 3]\) the output is exactly 3.  
Union gives all values from 1 up to but not including 4, plus the extra point already included.  
**\(R = [1, 3]\)**

*Reflection:* The constant piece added nothing new; the range is still an interval because the linear piece already reached 3.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Writing range = codomain          | Student never checks which outputs appear   | Always solve \(y = f(x)\) for \(x\) and see which \(y\) are possible |
| Forgetting domain restrictions    | Square roots or denominators ignored        | List every operation that can break and solve the inequality first |
| Using interval notation on discrete sets | Copying real-number habits                 | Write set notation explicitly when the set is finite |
| Confusing “possible” with “actual”| Mixing codomain language into range         | Repeat: codomain is chosen, range is discovered      |
| Changing domain after finding range | Order of definition forgotten               | Write \(D\) first, then compute \(R = f(D)\)         |
| Assuming every real function has range \(\mathbb{R}\) | Linear examples dominate early practice   | Test a quadratic or rational function immediately    |

## 7. The textbook-precise statement

A function \(f\) consists of three sets \(D\), \(C\) and a rule that assigns to each element \(x \in D\) a unique element \(f(x) \in C\). The set \(D\) is called the domain of \(f\), the set \(C\) is called the codomain of \(f\), and the set  
\[
R = \{ y \in C \mid \exists x \in D \text{ such that } y = f(x) \}
\]  
is called the range (or image) of \(f\). We write \(f: D \to C\) and note that \(R \subseteq C\) always holds. (See Stewart, *Precalculus*, 8e, §2.3.)

## 8. Visual — diagram or schematic

```
          Domain D               Codomain C
        +-----------+          +-----------+
        |  1        |          |   4       |
        |  2        |   f      |   9       |
        |  3        |--------->|  16       |
        |  4        |          |  25       |
        +-----------+          |  ...      |
                               +-----------+
                                   Range R
                                 +-----------+
                                 |   4       |
                                 |   9       |
                                 |  16       |
                                 |  25       |
                                 +-----------+
```

The arrows start only from elements inside D and land only inside C; the shaded lower box shows the actual landings that form R.

## 9. The memory technique

**The hook** — Picture a vending machine whose coin slot only accepts certain coins (domain), whose internal bins can theoretically hold any snack (codomain), but which actually only ever dispenses chips and soda (range).

**What to overlearn** — The three symbols \(D\), \(C\), \(R\) and the fact that \(R = f(D) \subseteq C\).

**Spaced-repetition schedule** — Review the definition after 1 day, again after 3 days, 7 days, 16 days and 35 days.

**First-principles fallback** — If you forget the symbols, ask: “What can I legally put in?” (domain), “What drawer did I declare?” (codomain), “What actually came out?” (range).

## 10. What this unlocks

Once you can separate domain, codomain and range you can discuss injectivity, surjectivity, continuity on an interval, inverse functions, and limits at the boundary of the domain.

- Inverses exist only when the range equals the codomain of the inverse.
- Continuity proofs require an open interval inside the domain.
- Limits at infinity are statements about the behaviour as \(x\) approaches the “edge” of an unbounded domain.
- In linear algebra the column space is exactly the range of a matrix viewed as a function.

## 11. Self-check — five questions, no answers

1. For \(f(x) = |x| + 2\) with domain \([-3, 3]\) and codomain \([0, 10]\), what is the range?

2. A function is defined by \(f(x) = 1/(x^2 - 4)\). State the largest possible real domain and the corresponding range.

3. Explain in one sentence why changing the codomain from \(\mathbb{R}\) to \([0, \infty)\) never changes the range of \(f(x) = x^2\).

4. Give an example where the range is a single point even though the domain contains an interval.

5. A student claims “the range of every linear function \(f(x) = mx + c\) is all real numbers.” Construct a counter-example by choosing a restricted domain and show the range is different.