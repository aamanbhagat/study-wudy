## 1. The one-sentence answer
**Arithmetic operators in Python perform basic mathematical operations on numeric values using the symbols +, -, *, /, //, %, and **.**

In Python, these operators work on integers and floats exactly as you expect from school mathematics, but with a few language-specific behaviours that become important once your programs grow beyond toy examples. The ordinary symbols +, -, and * give addition, subtraction, and multiplication; / always returns a float even when both operands are integers; // truncates toward negative infinity (floor division); % yields the remainder after division; and ** raises the left operand to the power of the right operand. Because Python is a dynamically typed language, the same operator can produce different result types depending on operand types, which is why you must internalise both the mathematical definition and the implementation rule for each symbol.

> [!NOTE]
> The single most important “aha” is that // and % are not just “integer division and remainder”; they are mathematically linked by the identity a = (a//b)*b + (a%b) for any integers a and b (b ≠ 0), and this identity holds even when a or b is negative.

## 2. Why this matters — concrete and current
In aerospace trajectory code at NASA’s Jet Propulsion Laboratory, floor division and modulo are used to convert continuous mission-elapsed time into discrete orbit numbers and phase angles inside the MONTE toolkit.  
In semiconductor timing analysis at TSMC, exponentiation ** appears inside the Elmore-delay model when calculating RC time constants raised to fractional powers for sub-3 nm process corners.  
In PyTorch’s autograd engine, the element-wise power operator ** is overloaded so that gradients of x**n flow correctly through the computation graph during training of large language models.  
Graphics shaders written in GLSL (used by Unreal Engine 5) rely on the modulo operator % to implement repeating texture coordinates without floating-point drift across millions of fragments per frame.  
Inside the CPython interpreter itself, the % operator implements the formatting mini-language for old-style string interpolation that is still used in logging modules of production services at companies such as Dropbox.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Python int and float types | All arithmetic operators are defined only on these numeric types; you must know how literals are written and how type is inferred. |
| Variable assignment  | Operators produce values that are almost always stored in variables before further use. |
| Expression evaluation order | Without knowing precedence you cannot predict the result of mixed-operator expressions. |

If any of the above rows are unfamiliar, pause and read the corresponding earlier lesson before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Addition and subtraction behave exactly as in mathematics
Addition and subtraction are the most intuitive operators.  
`3 + 5` yields 8 and `10 - 4` yields 6.  
Formally, for any numbers \(a, b \in \mathbb{R}\), \(a + b\) and \(a - b\) are the usual field operations.  
> [!WARNING]  
> Do not assume that subtracting two equal floats will always give exactly zero; floating-point rounding can produce tiny residuals such as -1.1102230246251565e-16.

### Step 2 — Multiplication and true division
Multiplication is written with *; true division always uses /.  
`7 * 3` gives 21; `7 / 2` gives 3.5 even though both operands are int.  
Mathematically, \(a / b = a \times b^{-1}\) for \(b \neq 0\).

### Step 3 — Floor division truncates toward negative infinity
The // operator implements floor division: the greatest integer less than or equal to the exact quotient.  
`7 // 2` equals 3; `-7 // 2` equals -4 (not -3).  
Formally, \(a // b = \lfloor a / b \rfloor\) where \(\lfloor \cdot \rfloor\) is the floor function.

### Step 4 — Modulo yields the remainder consistent with floor division
% returns the value r such that \(a = (a // b) \cdot b + r\) and \(0 \leq |r| < |b|\).  
`7 % 2` is 1; `-7 % 2` is 1 (because -4*2 + 1 = -7).  
This sign behaviour surprises many learners coming from C or Java.

### Step 5 — Exponentiation with **
** raises the left operand to the power of the right operand and supports fractional and negative exponents when the base is positive.  
`2 ** 3` equals 8; `9 ** 0.5` equals 3.0; `2 ** -1` equals 0.5.

### Step 6 — Precedence and associativity complete the formal grammar
Python defines a strict precedence table (exponentiation highest, then unary minus, then *, /, //, %, then + and -). All binary operators except ** are left-associative; ** is right-associative.  
Thus `2 ** 3 ** 2` equals 512, not 64.

## 5. Worked examples — har step show karo

**Example 1 — Simple positive operands**  
*Given:* `a = 17`, `b = 5`  
*Find:* value of each operator.  
17 + 5 → 22 *Why:* direct addition.  
17 - 5 → 12 *Why:* direct subtraction.  
17 * 5 → 85 *Why:* multiplication.  
17 / 5 → 3.4 *Why:* true division always returns float.  
17 // 5 → 3 *Why:* floor(3.4) = 3.  
17 % 5 → 2 *Why:* 3*5 + 2 = 17.  
17 ** 2 → 289 *Why:* 17 raised to power 2.  
**Final answer**  
22, 12, 85, 3.4, 3, 2, 289

*Reflection:* All results follow the definitions directly; no edge cases yet.

**Example 2 — Negative dividend**  
*Given:* `a = -17`, `b = 5`  
*Find:* // and % results.  
-17 // 5 → -4 *Why:* floor(-3.4) = -4.  
-17 % 5 → 3 *Why:* -4*5 + 3 = -17.  
**Final answer**  
-4 and 3

*Reflection:* The identity \(a = (a//b)*b + (a%b)\) still holds; the sign of the remainder follows the divisor.

**Example 3 — Fractional exponent**  
*Given:* base 8, exponent 1/3  
*Find:* 8 ** (1/3)  
Exact division 1/3 produces float 0.333…; 8 ** 0.3333333333333333 evaluates to approximately 1.9999999999999996.  
**Final answer**  
≈ 2.0 (within floating-point tolerance)

*Reflection:* Never compare floating-point results with ==; always use a tolerance.

**Example 4 — Mixed expression with precedence**  
*Given:* `2 + 3 * 4 ** 2 % 5`  
*Find:* the value.  
Innermost: 4 ** 2 = 16.  
16 % 5 = 1.  
3 * 1 = 3.  
2 + 3 = 5.  
**Final answer**  
5

*Reflection:* Operator precedence, not left-to-right reading, determines the result.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Expecting -7 // 2 == -3           | Learner assumes truncation toward zero      | Remember // always uses floor, test with negative numbers early |
| Using % to check even/odd on negatives | Sign of remainder follows divisor           | Write abs(x) % 2 == 0 or x % 2 == 0 after normalising sign |
| 0.1 + 0.2 == 0.3                  | Binary floating-point representation error  | Use math.isclose() or decimal.Decimal for money      |
| Treating ** as left-associative   | Most operators are left-associative         | Parenthesise: 2 ** (3 ** 2) when needed              |
| Dividing two ints and expecting int | Python 3 changed / to true division         | Use // explicitly when integer result required       |
| Forgetting that % works with floats | Modulo is defined for floats too            | Write explicit tests with float operands             |
| Overusing ** for square roots     | ** 0.5 is slower and less precise than math.sqrt | Import math and use math.sqrt for readability        |

## 7. The textbook-precise statement
In the Python programming language, the arithmetic operators are defined on instances of numbers.Real (and by extension numbers.Complex for **). For a, b ∈ ℤ with b ≠ 0 the operators satisfy:

a + b, a − b, a * b ∈ ℤ,  
a / b ∈ ℚ,  
a // b = ⌊a/b⌋,  
a % b = a − (a//b)·b with 0 ≤ a % b < |b| when b > 0.

These identities appear in the Python Language Reference, version 3.12, §6.6 “Arithmetic conversions” and §6.7 “Binary arithmetic operations”. The floor-division and modulo pair is further guaranteed by the theorem stated in the same section: “The modulo operator always yields a result with the same sign as its second operand.”

## 8. Visual — diagram or schematic
```text
Operator Precedence (highest to lowest)
**          (right-associative)
+x, -x      (unary)
*, /, //, % (left-associative)
+, -        (left-associative)
```
The diagram shows the order in which Python evaluates a mixed expression; each level is evaluated only after higher levels are resolved.

## 9. The memory technique
1. **The hook** — Picture a floor with negative numbers sliding leftward; the // operator is a broom that always sweeps toward the leftmost integer, and the % operator is whatever dust remains on the floor.  
2. **What to overlearn** — The identity a = (a//b)*b + (a%b) and the fact that / always returns float.  
3. **Spaced-repetition schedule** — Review the identity after 1 day, 3 days, 7 days, 16 days, and 35 days by writing five negative-number test cases each time.  
4. **First-principles fallback** — If you forget the sign rule, derive it again from the mathematical definition of floor: ⌊x⌋ is the greatest integer ≤ x; compute a//b first, then obtain the remainder by subtraction.

## 10. What this unlocks
Mastery of these operators lets you implement integer indexing, cyclic buffers, polynomial evaluation, and geometric transformations without ever importing extra modules.  
- Next you will meet the comparison operators <, <=, == that produce Boolean results from the numeric values you now know how to compute.  
- You will also meet augmented assignment (a += 3) which is syntactic sugar built directly on these same operators.  
- Later, bitwise operators & | ^ rely on the same mental model of remainder and quotient when you treat integers in base 2.

## 11. Self-check — five questions, no answers
1. What is the exact value of (-23) // 4 and (-23) % 4? Verify that the identity holds.  
2. Write a one-line expression that returns the last two digits of any non-negative integer n without using string conversion.  
3. Predict the result of 2 ** 3 ** 2 and explain why parentheses change the answer.  
4. Why does 0.1 * 3 % 1 not equal 0.3 % 1 even though mathematically they should?  
5. A graphics loop must map frame index i (which may be negative during rewinding) onto the range [0, 59]. Which single operator achieves this mapping correctly for all integers i?