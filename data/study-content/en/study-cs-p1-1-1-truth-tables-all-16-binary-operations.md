## 1. The one-sentence answer
**Exactly sixteen distinct binary boolean operations exist, each corresponding to one of the 2^4 possible ways to assign an output bit to every combination of two input bits.**

Two boolean variables A and B generate four input rows: (F,F), (F,T), (T,F), (T,T). For each row the output may be chosen independently as true or false, producing 16 possible functions. These functions are the complete set of truth tables that any two-input logic gate or boolean expression can realize. They include familiar operations such as AND and XOR as well as the two constant functions and the four projection and negation functions.

The enumeration is exhaustive and non-redundant: every possible mapping from two bits to one bit appears exactly once. Because hardware ultimately implements one of these 16 mappings at every logic gate, the set forms the atomic foundation of all digital computation.

> [!NOTE]
> Once you internalize that the four output bits can be chosen freely, every subsequent property—associativity, duality, functional completeness—follows directly from inspecting which of the 16 tables satisfy the required pattern.

## 2. Why this matters — concrete and current
In semiconductor design, every standard-cell library enumerates these 16 functions and retains only those whose transistor implementations meet area, delay, and power targets; TSMC’s 3 nm process, for example, supplies cells for NAND, NOR, XOR, and MUX (a ternary-derived function built from the 16) while discarding the rest.

Modern SAT solvers used by AWS and Google for hardware verification encode every gate as one of these 16 truth tables, then apply resolution or CDCL on the resulting CNF; the 2023 AWS Nitro verification run processed more than 10^12 clauses derived from such tables.

In machine-learning accelerators, the bitwise operations inside binarized neural networks (BNNs) are restricted to the eight linearly separable functions among the 16; XNOR-Net, published at CVPR 2016 and deployed in Intel’s Movidius VPU, replaces 32-bit MACs with XNOR and popcount, both drawn directly from the enumerated set.

Control logic in aerospace flight computers, such as the Boeing 787’s common-core system, implements majority voting and interlock conditions using only the monotone functions (AND, OR, implication) from the 16; DO-254 certification therefore requires exhaustive truth-table proofs for each of these gates.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Boolean values   | Inputs and outputs are drawn exclusively from {F, T} or {0, 1}. |
| Ordered pairs    | The four input combinations must be enumerated without repetition or omission. |
| 2^n counting     | The formula 2^4 = 16 follows immediately from independent choice of each output bit. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Two inputs produce four rows
Any binary operation receives two independent boolean values. The complete list of input combinations is therefore the Cartesian product {F,T} × {F,T}, which yields exactly four rows.  
Example: label the rows (F,F), (F,T), (T,F), (T,T).  
Formal statement:  
$$| \{0,1\}^2 | = 4.$$  
> [!WARNING]
> Omitting even one row (commonly (T,T)) silently collapses two distinct operations into one.

### Step 2 — Each row admits an independent output choice
For every one of the four rows the designer may assign either false or true. The choices do not constrain one another.  
Example: the row (F,F) can map to T while (F,T) maps to F.  
Formal statement: each output position is an element of a two-element set, giving a function  
$$f : \{0,1\}^2 \to \{0,1\}.$$

### Step 3 — Four independent binary choices yield 16 tables
Because each of the four positions may be filled in two ways, the total number of distinct tables is  
$$2^4 = 16.$$  
No further identification or equivalence is applied at this stage; each assignment is a separate operation.

### Step 4 — Lexicographic ordering produces a canonical numbering
Order the rows by treating the pair (A,B) as a binary integer (A as MSB). The four output bits then form a 4-bit binary number whose decimal value labels the operation from 0 to 15.  
Example: the table whose outputs are F,F,F,F receives number 0; the table T,T,T,T receives number 15.

### Step 5 — Standard names attach to eight of the sixteen tables
Eight of the numbered tables correspond to the classically named operations (FALSE, AND, A, B, XOR, OR, NAND, TRUE, etc.). The remaining eight receive systematic names built from negation and projection.

### Step 6 — The set is closed under duality and composition
Negating both inputs and the output maps any table to another table inside the same set of 16; likewise, composition of any two tables yields a third table still inside the set.

### Step 7 — Textbook statement
A binary boolean operation is any function \(f:\{0,1\}^2\to\{0,1\}\). There are exactly sixteen such functions; each is uniquely identified by its truth table or by its index in {0 … 15}.

## 5. Worked examples — every step shown

**Example 1 — Constant FALSE (operation 0)**  
*Given:* four input rows.  
*Find:* the table for the constant-false function.  
Row (F,F) → F (by definition of constant).  
*Why:* every output must be false.  
Row (F,T) → F.  
*Why:* same rule.  
Row (T,F) → F.  
*Why:* same rule.  
Row (T,T) → F.  
*Why:* same rule.  
**0**  
*Reflection:* the example forces recognition that a constant function still occupies a full four-row table.

**Example 2 — Logical AND (operation 8)**  
*Given:* the four rows ordered as above.  
*Find:* the table whose outputs are F,F,F,T.  
(F,F) → F (conjunction false when any argument false).  
*Why:* definition of AND.  
(F,T) → F.  
*Why:* same definition.  
(T,F) → F.  
*Why:* same definition.  
(T,T) → T.  
*Why:* both arguments true.  
**8**  
*Reflection:* the single T appears only in the final row, illustrating that AND is the meet operation in the boolean lattice.

**Example 3 — Exclusive OR / XOR (operation 6)**  
*Given:* rows ordered lexicographically.  
*Find:* outputs that equal 1 precisely when inputs differ.  
(F,F) → F.  
*Why:* inputs identical.  
(F,T) → T.  
*Why:* inputs differ.  
(T,F) → T.  
*Why:* inputs differ.  
(T,T) → F.  
*Why:* inputs identical.  
**6**  
*Reflection:* XOR is the addition operation in GF(2); its table is the only one that is linear over that field.

**Example 4 — Material implication A → B (operation 11)**  
*Given:* rows.  
*Find:* the table that is false only when A true and B false.  
(F,F) → T (vacuous truth).  
*Why:* antecedent false.  
(F,T) → T.  
*Why:* antecedent false.  
(T,F) → F.  
*Why:* antecedent true, consequent false.  
(T,T) → T.  
*Why:* both true.  
**11**  
*Reflection:* the table differs from OR only in the first row, exposing the common error of treating implication as disjunction.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                                   | How to avoid it                                      |
|-----------------------------|--------------------------------------------------|------------------------------------------------------|
| Treating (A,B) and (B,A) rows as interchangeable | Habit from commutative operators                 | Always list rows in fixed lexicographic order        |
| Forgetting the constant-0 and constant-1 tables   | Intuition that every operation must “do something” | Explicitly enumerate all 2^4 possibilities           |
| Confusing NAND with NOT                        | NAND with one input tied high equals NOT         | Keep both inputs free when writing the table         |
| Writing implication as A OR B                     | Surface similarity of truth tables               | Check the single differing row (F,F)                 |
| Assuming all 16 are associative                   | Most binary operators in algebra are associative | Test associativity on the two middle rows only       |
| Miscounting when A or B is negated               | Projection functions are easily overlooked       | Count the four functions that ignore one argument    |
| Index off-by-one when converting binary to decimal | MSB/LSB reversal                                 | Fix A as the higher bit consistently                 |

## 7. The textbook-precise statement
A binary boolean function is any map \(f : \{0,1\}^2 \to \{0,1\}\). There exist exactly \(2^{2^2} = 16\) such functions. Each function is uniquely determined by the 4-tuple of values  
$$(f(0,0),\; f(0,1),\; f(1,0),\; f(1,1)).$$  
The integer whose binary representation equals that 4-tuple is the function’s index in the interval [0,15]. (See Knuth, *The Art of Computer Programming*, vol. 4A, §7.1.1.)

## 8. Visual — diagram or schematic
```text
A B |  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15
----|------------------------------------------------
0 0 |  0  1  0  1  0  1  0  1  0  1  0  1  0  1  0  1
0 1 |  0  0  1  1  0  0  1  1  0  0  1  1  0  0  1  1
1 0 |  0  0  0  0  1  1  1  1  0  0  0  0  1  1  1  1
1 1 |  0  0  0  0  0  0  0  0  1  1  1  1  1  1  1  1
```
Each column is one complete truth table; column index equals the decimal value of the output bits read top to bottom.

## 9. The memory technique

1. **The hook** — Picture a tiny 2-by-2 chessboard whose four squares are light-bulbs; each bulb can be on or off independently, and the 16 possible illumination patterns are the 16 operations.
2. **What to overlearn** — The decimal indices of AND (8), OR (14), XOR (6), NAND (7), and the two constants (0, 15).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the count by writing the four rows, then noting each row’s output bit may be chosen freely, hence 2^4.

## 10. What this unlocks
Mastery of the 16 tables permits direct construction of any two-input gate and immediate recognition of functional completeness, duality, and normal-form conversion.  

- Next: ternary operations and Shannon expansion  
- Next: Karnaugh maps for minimization  
- Next: Post’s lattice of all boolean clones  
- Next: gate-level netlist verification in VLSI CAD

## 11. Self-check — five questions, no answers
1. Write the four-row truth table for the function whose index is 9; give its common name if it has one.  
2. Which two of the 16 operations are their own duals under simultaneous negation of inputs and output?  
3. Demonstrate by exhaustive check that exactly one of the 16 tables is associative, commutative, and idempotent.  
4. A circuit contains a single gate whose truth table is unknown; you observe that the output is always the opposite of input A regardless of B. Which index must the gate possess?  
5. Prove that the set {NAND} is functionally complete while the set {AND, OR} is not, using only the enumeration of the 16 tables.