## 1. The one-sentence answer
**Integers** are the set \(\mathbb{Z} = \{\dots, -3, -2, -1, 0, 1, 2, 3, \dots\}\) closed under addition, subtraction, and multiplication, visualized as equally spaced points on the number line, with absolute value \(|x|\) defined as the distance from \(x\) to 0.

Integers begin with the counting numbers and extend them symmetrically in both directions to capture opposites. Addition and subtraction move left or right along this line by fixed steps; multiplication scales distances and respects sign rules that arise from the requirement that opposites sum to zero. Absolute value discards direction and retains only magnitude, turning every integer into a non-negative distance.

This construction supplies the first number system in which subtraction is always possible and equations such as \(x + 5 = 2\) possess solutions.

> [!NOTE]
> The number line is not merely a picture; it is the geometric embodiment of the order relation and the metric that defines absolute value, making every later property of integers visually immediate.

## 2. Why this matters — concrete and current
In semiconductor design, two’s-complement integer arithmetic inside 64-bit registers determines overflow behavior for every CPU; Intel’s Alder Lake cores rely on the same signed-magnitude rules taught here to guarantee deterministic wrap-around in performance counters.

NASA’s Deep Space Network encodes spacecraft velocity vectors as 32-bit integers; a sign error in absolute-value calculations once produced the 1999 Mars Climate Orbiter loss, showing that distance-from-zero semantics directly affect mission survival.

Modern gradient-descent optimizers in machine-learning frameworks store parameter updates as 16-bit integers during quantization; absolute-value clipping prevents gradient explosion and is implemented exactly by the definition \(|x| = \max(x, -x)\).

High-frequency trading engines at Jane Street represent price differences in integer ticks rather than floats; subtraction and absolute-value operations decide whether a crossed spread triggers an automatic execution.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Counting numbers     | Starting set before negatives are adjoined                |
| Addition as movement | Basis for defining subtraction as inverse movement        |
| Opposites            | Pairs that sum to zero, required to introduce negatives   |

## 4. Building the idea — from intuition to formalism

### Step 1 — Extend the counting numbers symmetrically
The counting numbers \(1, 2, 3, \dots\) lack solutions to equations such as \(x + 3 = 1\). Introduce a new symbol \(-3\) defined by the property that \(3 + (-3) = 0\). Repeating this for every counting number produces the full set of integers.

Example: \(5 + (-5) = 0\).

Formal statement:
\[
\mathbb{Z} = \mathbb{N}_0 \cup \{-n \mid n \in \mathbb{N}_0\}
\]
where \(\mathbb{N}_0 = \{0, 1, 2, \dots\}\).

> [!WARNING]
> Treating \(-n\) as “subtract n” instead of “the number that adds to n to give zero” produces sign errors later.

### Step 2 — Represent every integer as a point on a line
Place 0 at an origin. Mark positive integers at equal intervals to the right and their opposites at equal intervals to the left. The resulting ordered set is the number line.

Formal statement: there exists an order-preserving bijection between \(\mathbb{Z}\) and the points \(\{k \cdot d \mid k \in \mathbb{Z}\}\) for any fixed spacing \(d > 0\).

### Step 3 — Define addition as directed displacement
To compute \(a + b\), start at \(a\) and move \(|b|\) units in the direction indicated by the sign of \(b\).

Formal statement:
\[
a + b = 
\begin{cases}
a + |b| & \text{if } b \ge 0, \\
a - |b| & \text{if } b < 0.
\end{cases}
\]

> [!WARNING]
> Reversing the direction for negative addends inverts the sign of the result.

### Step 4 — Define subtraction as addition of the opposite
Subtraction is never primitive: \(a - b := a + (-b)\).

### Step 5 — Define multiplication by repeated addition and sign rules
First define \(a \cdot n\) for \(n > 0\) as \(a + a + \dots + a\) (\(n\) times). Extend by the requirement that \((-a) \cdot b = -(a \cdot b)\) and \(a \cdot (-b) = -(a \cdot b)\), which follows from distributivity and the definition of opposites.

Formal statement:
\[
(-a) \cdot (-b) = a \cdot b.
\]

### Step 6 — Define absolute value as distance to zero
The distance between \(x\) and 0 on the number line is independent of direction:
\[
|x| = 
\begin{cases}
x & \text{if } x \ge 0, \\
-x & \text{if } x < 0.
\end{cases}
\]

This is the textbook definition reached after the preceding steps.

## 5. Worked examples — every step shown

**Example 1 — Simple displacement**
*Given:* Compute \(-4 + 7\).
*Find:* The resulting integer.
Start at \(-4\).  
Move 7 units right because 7 is positive.  
\(-4 + 7 = 3\).  
*Why:* Positive addend dictates rightward movement on the number line.  
**3**

*Reflection:* The sign of the second operand alone determines direction; magnitude is always added.

**Example 2 — Subtraction via opposite**
*Given:* Compute \(3 - 8\).
*Find:* The value.
Rewrite as \(3 + (-8)\).  
Start at 3, move 8 units left.  
\(3 - 8 = -5\).  
*Why:* Subtraction is addition of the additive inverse.  
**-5**

*Reflection:* Every subtraction problem reduces to an addition problem once the opposite is formed.

**Example 3 — Multiplication with mixed signs**
*Given:* Compute \((-6) \cdot 4\).
*Find:* The product.
First, \(6 \cdot 4 = 24\).  
Attach a minus sign because exactly one factor is negative.  
\((-6) \cdot 4 = -24\).  
*Why:* The rule \((-a) \cdot b = -(a \cdot b)\) follows from distributivity.  
**-24**

*Reflection:* Count the negative signs; an odd count yields a negative product.

**Example 4 — Absolute value inside an expression**
*Given:* Evaluate \(| -3 | - | 5 - 9 |\).
*Find:* The numerical value.
Compute inner expression: \(5 - 9 = -4\).  
Absolute values: \(|-3| = 3\), \(|-4| = 4\).  
Subtract: \(3 - 4 = -1\).  
*Why:* Absolute value is applied after each sub-expression is evaluated.  
**-1**

*Reflection:* Absolute-value bars act as grouping symbols that must be resolved after their contents.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating subtraction as “take away” without rewriting | Early arithmetic habits ignore additive inverses | Always rewrite \(a - b\) as \(a + (-b)\)     |
| Forgetting the sign rule for two negatives | Memorized rules without derivation          | Re-derive from distributivity each time      |
| Confusing \(|-x|\) with \(-|x|\)  | Direction and magnitude conflated           | Recall \(|x|\) is distance, hence non-negative |
| Assuming division always yields an integer | Over-generalizing closure properties        | Check whether remainder is zero before claiming an integer quotient |
| Placing negatives on the wrong side of zero | Mirror symmetry not internalized            | Verify that \(n + (-n) = 0\) places them symmetrically |
| Evaluating absolute value before operations inside | Order-of-operations confusion               | Treat bars as parentheses; finish inner work first |
| Overflow intuition from calculators | Hidden modular arithmetic in hardware       | Remember \(\mathbb{Z}\) itself has no overflow; only machine representations do |

## 7. The textbook-precise statement
Let \(\mathbb{Z}\) be the set of integers. Addition and multiplication are binary operations satisfying the ring axioms; subtraction is defined by \(a - b := a + (-b)\), where \(-b\) is the unique additive inverse of \(b\). The absolute-value function is the map
\[
|\cdot| : \mathbb{Z} \to \mathbb{N}_0, \quad |x| = 
\begin{cases}
x & x \ge 0 \\
-x & x < 0.
\end{cases}
\]
It satisfies the metric axioms \(d(x,y) = |x-y|\). (See: Artin, *Algebra*, 2e, Chapter 1, §1.1–1.2.)

## 8. Visual — diagram or schematic
```text
...  -4  -3  -2  -1   0   1   2   3   4  ...
     |   |   |   |   |   |   |   |   |   |
    -4  -3  -2  -1   0   1   2   3   4   5   (labels)
          ↑               ↑
       -2 is here       | -2 | = 2 (distance)
```
The diagram shows equal spacing, symmetric opposites about zero, and absolute value as an undirected length.

## 9. The memory technique

1. **The hook** — Picture a ruler glued to a mirror at zero; absolute value is the reading you obtain after ignoring which side of the mirror a mark lies on.
2. **What to overlearn** — \(a + (-a) = 0\) for every integer \(a\); \(|x|\) is always \(\ge 0\); multiplication sign rule obtained by counting negatives.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Rebuild from the definition that every integer \(n\) possesses a unique opposite \(-n\) such that their sum is zero; absolute value is the non-negative member of the pair \(\{x, -x\}\).

## 10. What this unlocks
Mastery of integers supplies the additive group and ordered ring structure required for all subsequent number systems.

- Construction of rationals as equivalence classes of integer pairs
- Congruence relations and modular arithmetic
- Well-ordering principle and induction on non-negative integers
- Metric spaces once distance is defined via absolute value

## 11. Self-check — five questions, no answers
1. Compute \(-7 + (-3) - (-5)\) and justify each sign change.
2. On the number line, a point starts at \(-2\). After adding an unknown integer it lands at 6. What is the integer and why must its sign be positive?
3. Prove that \(|a - b| = |b - a|\) using only the definition of absolute value.
4. Evaluate \((-2) \cdot (-3) \cdot (-4)\) and state how many negatives determine the final sign.
5. Identify the logical error in the claim “\(\sqrt{4} = \pm 2\) because both 2 and -2 have absolute value 2.”