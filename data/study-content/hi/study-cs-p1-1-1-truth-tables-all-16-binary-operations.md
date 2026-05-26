## 1. The one-sentence answer
**Truth tables for binary operations systematically enumerate all 16 possible Boolean functions of two inputs by listing every combination of 0/1 values and the corresponding output.**

Do inputs A aur B hain. Inki char possible combinations hoti hain: (0,0), (0,1), (1,0), (1,1). Har combination ke liye output 0 ya 1 ho sakta hai. Isliye 2^4 = 16 alag-alag functions ban jaate hain. Yeh functions logic gates, arithmetic circuits aur decision logic ki building blocks hain. Har function ko uske truth table se uniquely identify kiya jaata hai.

> [!NOTE]
> Sabse badi aha yeh hai ki koi bhi two-input Boolean behaviour exactly ek truth table se describe hota hai; isliye 16 tables poori possible space ko cover karte hain bina kisi exception ke.

## 2. Why this matters — concrete and current
In VLSI design, Intel aur TSMC ke engineers har gate ka exact truth table verify karte hain before tape-out. Agar ek single gate ka table galat ho toh billion-transistor chip mein silent data corruption aa sakta hai.

Modern SAT solvers (jaise MiniSat aur Z3 jo Microsoft Research use karta hai) 16 possible operators ko enumerate karke circuit equivalence checking karte hain. Yeh technique aerospace mein Boeing ke flight-control software verification mein bhi lagti hai.

Machine-learning accelerators (NVIDIA Tensor Cores) mein Boolean pruning logic 16 operations mein se sirf 4–5 frequently used operations ko hardware mein hardwire karta hai; baaki ko truth-table lookup se emulate kiya jaata hai.

Quantum circuit simulators (IBM Qiskit) classical pre-processing step mein 16 Boolean functions ko truth tables ke through decompose karte hain taaki measurement-based error correction fast ho.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Binary digits (0/1)  | Inputs aur outputs sirf inhi do values par based hote hain |
| Function             | Har truth table actually ek mapping define karta hai      |
| Enumeration          | 4 input rows ko systematically fill karna padta hai       |

Agar upar ke teen concepts clear nahi hain toh pehle “Binary representation” aur “What is a function” padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Count the input combinations
Do Boolean variables A aur B hain. Unke liye char possible input pairs hain. In char rows ko fixed order mein likhna padta hai.

Example: rows ko lexicographic order mein rakho — (0,0), (0,1), (1,0), (1,1).

Formal statement:
$$
\text{Input space} = \{0,1\}^2 = \{(0,0),(0,1),(1,0),(1,1)\}
$$

> [!WARNING]
> Agar row order change kar di toh table ka meaning nahi badalta lekin comparison aur standardisation toot jaati hai.

### Step 2 — Decide output column
Har row ke liye ek output bit choose karna hai. Yeh bit 0 ya 1 ho sakta hai. Is choice ko ek vector maano jisme 4 entries hain.

Example: output vector (0,1,1,0) ek possible function deta hai.

Formal statement:
$$
f:\{0,1\}^2 \to \{0,1\}
$$

### Step 3 — Enumerate all possible output vectors
4 positions mein har jagah 2 choices hain, isliye 2^4 = 16 alag vectors milte hain. Har vector ek unique function represent karta hai.

### Step 4 — Name the 16 functions
Standard names hain: FALSE, AND, A AND NOT B, A, NOT A AND B, B, XOR, OR, NOR, XNOR, NOT B, A OR NOT B, NOT A, NOT A OR B, NAND, TRUE.

### Step 5 — Map each name to its table
Har naam ko uske exact 4-bit output vector se associate karo. Yeh mapping canonical hai aur textbooks mein fixed hai.

## 5. Worked examples — har step show karo

**Example 1 — Constant FALSE**
*Given:* Do inputs A, B.
*Find:* Us function ka truth table jiska output hamesha 0 ho.
- Row (0,0) → output 0 (kyunki function constant hai)
- Row (0,1) → output 0
- Row (1,0) → output 0
- Row (1,1) → output 0
**Final answer**
```
A B | F
0 0 | 0
0 1 | 0
1 0 | 0
1 1 | 0
```
*Reflection:* Yeh sabse simple case hai; isse pata chalta hai ki constant functions bhi valid binary operations hain.

**Example 2 — AND**
*Given:* Standard AND semantics.
*Find:* Truth table.
- (0,0) → 0 (kyunki dono 1 nahi)
- (0,1) → 0
- (1,0) → 0
- (1,1) → 1
**Final answer**
```
A B | AND
0 0 | 0
0 1 | 0
1 0 | 0
1 1 | 1
```
*Reflection:* AND sirf tab 1 deta hai jab dono inputs 1 hon; yeh pattern baaki gates samajhne mein madad karta hai.

**Example 3 — XOR**
*Given:* “Different inputs → 1” rule.
*Find:* Complete table.
- (0,0) → 0
- (0,1) → 1
- (1,0) → 1
- (1,1) → 0
**Final answer**
```
A B | XOR
0 0 | 0
0 1 | 1
1 0 | 1
1 1 | 0
```
*Reflection:* XOR ka output 1 tab aata hai jab inputs alag hon; yeh adder circuits ka core hai.

**Example 4 — Implication (A → B)**
*Given:* Implication table jo material implication follow karti hai.
*Find:* 4-row table.
- (0,0) → 1 (false implies anything is true)
- (0,1) → 1
- (1,0) → 0
- (1,1) → 1
**Final answer**
```
A B | A→B
0 0 | 1
0 1 | 1
1 0 | 0
1 1 | 1
```
*Reflection:* Is function ko aksar log galat samajhte hain kyunki natural-language “if” se farak hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Row order galat karna       | Lexicographic sequence yaad nahi rehti      | Hamesha (0,0) se shuru karo aur binary count karo |
| Output vector ko function naam se confuse karna | 16 names yaad rakhna mushkil lagta hai     | Pehle sirf 4-bit vector likho, phir naam yaad karo |
| NAND aur NOR ko interchange karna | Dono “NOT of something” lagte hain         | NAND = NOT(AND), NOR = NOT(OR) yaad rakho    |
| Implication table galat bharna | 0→0 ko galti se 0 kar dete hain            | “False implies anything” rule yaad rakho     |
| Duplicate functions count karna | Symmetric tables ko alag samajhna          | 4-bit vector ko integer (0–15) mein convert karke compare karo |

## 7. The textbook-precise statement
A binary Boolean function is any mapping \(f:\{0,1\}^2\to\{0,1\}\). There exist exactly \(2^{2^2}=16\) such functions. Each function is uniquely identified by its truth table, which is a 4-tuple in \(\{0,1\}^4\) listing the value of \(f\) on the ordered domain \((0,0),(0,1),(1,0),(1,1)\). (Mendelson, *Introduction to Mathematical Logic*, 6e, §1.2)

## 8. Visual — diagram or schematic
```
Input pairs          Output column
( A , B )            f(A,B)
  0   0   ───────►   b0
  0   1   ───────►   b1
  1   0   ───────►   b2
  1   1   ───────►   b3
```
Har bi (0 ya 1) ek function ko define karta hai. Poora set 16 alag 4-bit strings banta hai.

## 9. The memory technique
1. **The hook** — 16 tables ko ek 4-bit binary counter ke roop mein socho; har counter value ek alag function hai.
2. **What to overlearn** — 4 input rows ka fixed order aur 2^4 = 16 formula.
3. **Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — “Do inputs → 4 rows, har row 2 choices → 16 tables” count karke rebuild karo.

## 10. What this unlocks
Yeh knowledge aapko logic gate minimisation, Karnaugh maps, aur adder/subtractor design samajhne deta hai.
- Next: Karnaugh-map simplification
- Next: Multiplexer-based function implementation
- Next: SAT solver variable encoding

## 11. Self-check — five questions, no answers
1. Kitne unique two-input Boolean functions hain?
2. XOR ka output vector (4-bit) kya hai?
3. A → B table mein (0,0) entry kyun 1 hoti hai?
4. NAND aur AND mein kaise related hain?
5. Agar ek 4-bit vector (1,0,0,1) hai toh kaunsa standard naam us function ko milta hai?