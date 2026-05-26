## 1. The one-sentence answer
**Arithmetic operators in Python are the six built-in symbols that map pairs of numbers to a single numeric result according to the standard rules of arithmetic, with floor division and modulo supplying the integer-division pair required by programming.**

These operators act directly on `int` and `float` objects. Addition, subtraction, multiplication, and true division produce results whose type follows Python’s numeric coercion rules; the remaining two operators, floor division and modulo, always yield an integer when both operands are integers.

The power operator completes the set by repeated multiplication, handling both positive and negative exponents through the same underlying arithmetic. Together the six symbols let any numeric expression be written without calling functions.

> [!NOTE]
> Floor division (`//`) always rounds toward negative infinity, not toward zero; the sign of the result is therefore determined solely by the sign of the quotient, never by the sign of the remainder.

## 2. Why this matters — concrete and current
In aerospace trajectory code at NASA’s Jet Propulsion Laboratory, floor division and modulo compute the exact number of whole orbits completed and the fractional remainder when propagating Keplerian elements forward in time.

Inside the CUDA kernels that train large language models at NVIDIA, multiplication and addition operators accumulate the billions of dot-product terms that constitute each gradient step; a single misplaced division changes the entire loss surface.

Semiconductor place-and-route tools at TSMC use the power operator to evaluate exponential decay models of wire delay, then apply modulo arithmetic to map the resulting real-valued slack values onto discrete clock-grid positions.

Game-engine physics at Unity Technologies repeatedly applies subtraction and multiplication to update velocities, then uses floor division to convert continuous positions into integer tile indices for collision maps.

The Euclidean algorithm for computing greatest common divisors, which underpins every modern cryptographic library, is expressed with a single modulo operation inside its loop; correctness therefore rests directly on Python’s definition of `%`.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Integers and floats | The operators behave differently on `int` versus `float`  |
| Sign and ordering | Floor division and modulo results change with negative operands |
| Operator precedence | Determines evaluation order inside compound expressions   |

## 4. Building the idea — from intuition to formalism

### Step 1 — Addition and subtraction restore displacement
Addition combines two quantities; subtraction recovers the original quantity when one addend is removed.  
Example: starting at 5 and adding 3 yields 8; subtracting 3 returns 5.  
$$a + b = c \quad\text{and}\quad c - b = a$$  
> [!WARNING]
> Treating subtraction as “remove the smaller number” fails when the subtrahend is larger, producing a negative result that still obeys the same equation.

### Step 2 — Multiplication is repeated addition
Multiplication scales one quantity by an integer count of the other.  
Example: 4 added three times equals 12.  
$$a \times b = \underbrace{a + a + \dots + a}_{b\text{ times}}$$  
> [!WARNING]
> Forgetting that multiplication by a negative reverses direction produces sign errors in later steps.

### Step 3 — True division yields the exact quotient
Division finds the unique real number that, when multiplied by the divisor, recovers the dividend.  
Example: 7 divided by 2 is exactly 3.5.  
$$a / b = q \quad\text{where}\quad q \times b = a$$  
> [!WARNING]
> Using true division when an integer index is required produces a `float` that cannot be used directly as a list index.

### Step 4 — Floor division discards the fractional part toward −∞
Floor division returns the greatest integer less than or equal to the true quotient.  
Example: 7 // 2 equals 3; (−7) // 2 equals −4.  
$$a // b = \lfloor a / b \rfloor$$  
> [!WARNING]
> Programmers who expect truncation toward zero obtain off-by-one errors on negative operands.

### Step 5 — Modulo recovers the remainder after floor division
The modulo operator yields the unique non-negative remainder whose magnitude is strictly less than the divisor.  
Example: 7 % 2 equals 1 because 2·3 + 1 = 7.  
$$a \% b = r \quad\text{where}\quad a = (a // b) \times b + r,\; 0 \le r < |b|$$  
> [!WARNING]
> Assuming the remainder always has the sign of the dividend violates Python’s guarantee that the result is non-negative when the divisor is positive.

### Step 6 — Exponentiation denotes repeated multiplication
The power operator multiplies the base by itself the number of times given by the exponent.  
Example: 2 ** 3 equals 8.  
$$a ** b = \underbrace{a \times a \times \dots \times a}_{b\text{ times}}$$  
> [!WARNING]
> Reversing the order of a negative exponent and a fractional base without using parentheses changes the mathematical meaning.

### Step 7 — The six operators together form a closed arithmetic system
Any numeric expression built from integers and floats using these six symbols evaluates to a single `int` or `float` according to the rules above.

## 5. Worked examples — every step shown

**Example 1 — Simple positive operands**  
*Given:* 17 and 5.  
*Find:* results of all six operators.  
17 + 5  
*Why:* direct addition.  
= 22  

17 − 5  
*Why:* direct subtraction.  
= 12  

17 * 5  
*Why:* multiplication.  
= 85  

17 / 5  
*Why:* true division produces float.  
= 3.4  

17 // 5  
*Why:* floor(3.4) = 3.  
= 3  

17 % 5  
*Why:* 17 = 3·5 + 2.  
= 2  

17 ** 5  
*Why:* repeated multiplication.  
= 1419857  

**17 + 5, 12, 85, 3.4, 3, 2, 1419857**

*Reflection:* All operators behave as expected on positive integers; the only subtlety is the float produced by `/`.

**Example 2 — Negative dividend**  
*Given:* −17 and 5.  
*Find:* `//` and `%`.  
−17 // 5  
*Why:* floor(−3.4) = −4.  
= −4  

−17 % 5  
*Why:* −17 = (−4)·5 + 3.  
= 3  

**−4, 3**

*Reflection:* The remainder stays non-negative; many languages return −2 instead.

**Example 3 — Modulo for cyclic indexing**  
*Given:* array index 23 into a list of length 7.  
*Find:* wrapped index.  
23 % 7  
*Why:* 23 = 3·7 + 2.  
= 2  

**2**

*Reflection:* Modulo converts any integer into the range [0, divisor).

**Example 4 — Power with negative exponent**  
*Given:* 2 and −3.  
*Find:* 2 ** −3.  
2 ** −3  
*Why:* 1 / (2 ** 3).  
= 0.125  

**0.125**

*Reflection:* Negative exponents invert the result; parentheses are required when the base is also negative.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using `/` when `//` is required | True division always returns float         | Decide integer versus real result before writing the operator |
| Expecting `//` to truncate toward zero | Python defines floor, not truncation       | Test with a negative left operand            |
| Assuming `%` can be negative | Python guarantees non-negative remainder   | Write `a % b` only when `b > 0`              |
| Forgetting `**` has higher precedence than unary minus | −2 ** 2 parses as −(2 ** 2)                | Parenthesize: (−2) ** 2                      |
| Mixing `int` and `float` in modulo | Result type follows the operands           | Cast explicitly when an integer remainder is mandatory |
| Integer overflow intuition from C | Python integers have arbitrary precision   | Never worry about bit width                  |
| Writing `a ** b ** c` expecting left-to-right | Exponentiation is right-associative        | Use parentheses or break into two statements |

## 7. The textbook-precise statement
Let \(a, b \in \mathbb{Z}\) with \(b \neq 0\). Python defines the floor-division and modulo operators by the unique integers \(q\) and \(r\) satisfying
\[
a = q b + r, \quad 0 \le r < |b|.
\]
The operators are therefore
\[
a // b := q = \left\lfloor \frac{a}{b} \right\rfloor, \qquad a \% b := r.
\]
True division and the remaining operators follow the field axioms of the reals when at least one operand is a float. (Python Software Foundation, *Python Language Reference*, version 3.12, §5.1 “Unary arithmetic operations” and §5.2 “Binary arithmetic operations”.)

## 8. Visual — diagram or schematic
```text
Number line for a = −17, b = 5
−20   −15   −10    −5     0     5    10
  |-----|-----|-----|-----|-----|-----|
               q = −4          r = 3
               <------ 5 ------>
−17 = (−4)·5 + 3
```
The diagram shows the unique multiple of 5 lying at or below −17; the distance to the next multiple supplies the non-negative remainder.

## 9. The memory technique

**The hook**  
Picture six colored keys on a piano: the white keys are the familiar four arithmetic operations; the two black keys are the “floor” and “remainder” pedals that keep you on whole notes.

**What to overlearn**  
- `//` always floors toward −∞.  
- `r = a % b` satisfies \(0 \le r < |b|\).  
- `**` is right-associative.

**Spaced-repetition schedule**  
Review the six operator definitions after 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback**  
Re-derive any operator from its defining equation \(a = q b + r\) or from repeated addition.

## 10. What this unlocks
Mastery of these operators lets you write any numeric expression, implement integer algorithms, and reason about overflow-free arithmetic in Python.

- Integer algorithms (Euclidean GCD, primality tests)  
- Array indexing with wrap-around  
- Fixed-point and modular arithmetic in cryptography  
- Expression parsing and operator-precedence trees  
- Next topic: comparison operators and Boolean logic

## 11. Self-check — five questions, no answers
1. Evaluate `(-7) // 3` and `(-7) % 3`; verify the defining equation holds.  
2. Without running code, predict the type and value of `2 ** 3 / 4`.  
3. Rewrite the expression `a - (a // b) * b` using only the modulo operator.  
4. Show that `n % 2 == 0` is true precisely when `n` is even, for any integer `n`.  
5. Determine the value of `2 ** 2 ** 3` and explain why parentheses would change the result.