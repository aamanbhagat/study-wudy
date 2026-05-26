## 1. The one-sentence answer
**Comparison operators in Python are the six symbols ==, !=, <, >, <=, and >= that take two values and return a Boolean (True or False) stating whether the stated relation holds.**

They exist because programs must make decisions. A thermostat does not “know” temperature; it compares the measured value against a threshold and acts accordingly. In code the same act is expressed by writing temperature > 22, which yields either True or False and therefore controls an if-statement or loop.

The operators are deliberately symmetric. == asks whether two objects are equal under Python’s definition of equality; != is its logical negation. The four ordering operators (<, >, <=, >=) impose a total order on numbers and a lexicographic order on strings, but they are undefined between incompatible types such as int and str in Python 3.

> [!NOTE]
> The single most important insight is that these operators never modify their operands; they only produce a new Boolean value that subsequent code can inspect.

## 2. Why this matters — concrete and current
In the flight-control software of SpaceX Falcon 9, sensor readings of tank pressure are compared against hard limits every 10 ms using expressions of the form p > p_max; a True result triggers an immediate abort sequence.

Modern recommendation systems at Netflix evaluate millions of feature comparisons such as user_watch_time >= median_watch_time inside gradient-boosted trees; each split is literally a comparison operator compiled down to a few machine instructions.

Semiconductor place-and-route tools from Synopsys compare wire delays with inequalities d1 + d2 <= clock_period to decide whether a timing path meets the required frequency; millions of such checks occur during a single chip compile.

In reinforcement-learning research, the Atari DQN agent’s target network update contains the line if abs(Q(s,a) - target) > delta: …; the comparison decides whether an experience is stored in the replay buffer or discarded.

Database engines such as PostgreSQL rewrite SQL predicates containing <, >, <=, >= into index scans; the query planner’s cost model is built directly on the semantics of these operators.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Variables and assignment | Operators compare values stored in variables; without variables the expressions have nothing to operate on. |
| Integer and floating-point literals | The most common operands are numbers; you must recognise 3, 3.0, -7, etc. |
| Boolean values True/False | Every comparison produces one of these two values; later control flow depends on them. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Equality as sameness
Two quantities are equal when they denote the same mathematical object.  
Example: the integers 5 and 5 are the same.  
Formal statement:  
$$a = b \quad\text{is written in Python as}\quad a == b$$  
> [!WARNING]
> Using the single = here would be an assignment, silently destroying the intended comparison.

### Step 2 — Inequality as difference
Negating equality yields “not the same.”  
Example: 5 and 6 differ.  
Formal statement:  
$$a \neq b \quad\text{is written}\quad a != b$$  
> [!WARNING]
> The symbol <> from some older languages is a SyntaxError in Python 3.

### Step 3 — Ordering on the number line
Numbers possess a natural left-to-right order.  
Example: –3 lies left of 7, so –3 < 7.  
Formal statement:  
$$a < b,\quad a > b,\quad a \le b,\quad a \ge b$$  
> [!WARNING]
> Reversing the symbol (writing 7 < –3) produces the opposite Boolean and breaks any subsequent logic that assumes the correct direction.

### Step 4 — Result is always Boolean
Every application of a comparison operator yields an object of type bool.  
Example: type(3 < 5) is <class 'bool'>.  
Formal statement:  
$$\forall a,b \in S,\quad (a \mathbin{\mathrm{op}} b) \in \{\texttt{True},\texttt{False}\}$$  
> [!WARNING]
> Treating the result as an integer (e.g., summing comparisons) works because True == 1, but obscures intent and fails for chained comparisons.

### Step 5 — Chaining is a conjunction
Python permits a < b <= c, which is syntactic sugar for a < b and b <= c.  
Formal statement:  
$$a < b \le c \quad\equiv\quad (a < b) \land (b \le c)$$  
> [!WARNING]
> The middle operand b is evaluated only once; writing a < f() <= c calls f only once, unlike the expanded form.

### Step 6 — Textbook definition
A comparison expression is any expression formed by an operand, one of the six operators, and another operand (or a chain thereof). Its value is the Boolean stating whether the relation holds under Python’s value semantics.

## 5. Worked examples — every step shown

**Example 1 — Simple numeric equality**  
*Given:* x = 10  
*Find:* whether x equals 10.  
x == 10  
*Why:* the operator == compares the current value of x with the literal 10.  
Result: True  
**True**  
*Reflection:* the comparison never changes x itself.

**Example 2 — String ordering**  
*Given:* s = "apple", t = "banana"  
*Find:* whether s comes before t alphabetically.  
s < t  
*Why:* Python compares Unicode code points lexicographically.  
Result: True  
**True**  
*Reflection:* case matters; "Apple" < "banana" is False because uppercase 'A' precedes lowercase 'b'.

**Example 3 — Chained comparison**  
*Given:* temperature = 23.5  
*Find:* whether temperature lies in the closed interval [20, 25].  
20 <= temperature <= 25  
*Why:* the expression is evaluated as (20 <= temperature) and (temperature <= 25).  
Result: True  
**True**  
*Reflection:* the variable is read only once, which matters when the middle expression has side effects.

**Example 4 — Mixed-type pitfall avoided**  
*Given:* a = 5, b = "5"  
*Find:* result of a == b.  
a == b evaluates to False because int and str are never equal.  
*Why:* Python 3 refuses implicit conversion between incompatible types for ==.  
**False**  
*Reflection:* always ensure operand types are compatible before comparing.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using = instead of ==       | Muscle memory from mathematics and assignment | Type == deliberately; let the linter flag single = inside expressions |
| Comparing float values with == | Floating-point rounding error               | Use math.isclose(a, b, rel_tol=1e-9)         |
| Chained comparison with side effects | Misunderstanding that middle operand is evaluated once | Extract the middle expression into a variable if it is costly or has side effects |
| Assuming "5" == 5 is True   | Expectation of automatic type coercion      | Remember Python 3 does not coerce for ==     |
| Using <= on sets            | Belief that ordering exists on every type   | Sets support only == and !=; ordering raises TypeError |
| Negating a chain incorrectly | Writing not a < b < c instead of a >= b or b >= c | Expand the chain first, then negate          |
| Identity versus equality on lists | Using is when == is intended                | Reserve is for None and singleton checks; use == for value equality |

## 7. The textbook-precise statement
A comparison expression consists of one or more primary expressions separated by comparison operators drawn from the set {==, !=, <, >, <=, >=}. When more than one operator appears, the expression is a chained comparison whose semantics are defined by the conjunction of adjacent pairwise comparisons, each evaluated at most once (Python Language Reference, version 3.12, §6.10). The result of any such expression is an object of type bool.

## 8. Visual — diagram or schematic
```text
Number line (values increase rightward)
   ...  -3   -2   -1    0    1    2    3   ...
          <------------->
               a < b
          <--------------->
               a <= b
```
Label each operator by placing its symbol beneath the appropriate segment of the line; the direction of the symbol matches the direction of the inequality.

## 9. The memory technique

1. **The hook** — Picture two identical twins standing on either side of a mirror: == means “they look the same,” != means “one is wearing a different hat.”
2. **What to overlearn** — The six operator glyphs and the fact that every comparison returns a bool; also remember that a < b <= c is legal and efficient.
3. **Spaced-repetition schedule** — Review the operator table after 1 day, again after 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — If you forget a glyph, reconstruct it from the English phrase: “less than or equal” gives <= because the line under < adds “or equal.”

## 10. What this unlocks
Mastery of comparison operators lets you write the predicates that drive every conditional and loop. The immediate next concepts are Boolean algebra (and, or, not), if/elif/else statements, while and for loop termination conditions, and the key function used in sorting.

- if statements and conditional expressions  
- short-circuit evaluation with and/or  
- list comprehensions with filters  
- sorting with key= and reverse=  
- binary search invariants  

## 11. Self-check — five questions, no answers
1. Evaluate 3 == 3.0 and explain why the result is what it is.  
2. Write the expression that is True precisely when x lies strictly between 0 and 1.  
3. Predict the result of "10" < "9" and justify it.  
4. Why does 1 < 2 < 3 evaluate to True while (1 < 2) < 3 evaluates to False?  
5. Construct a chained comparison that is False for every real number and prove it.