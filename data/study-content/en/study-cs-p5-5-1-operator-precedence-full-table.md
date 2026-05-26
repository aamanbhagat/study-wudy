## 1. The one-sentence answer
**Operator precedence in C is a fixed, language-defined hierarchy that dictates the order in which operators bind to operands in any expression containing more than one operator.**

In an expression such as `a + b * c`, the multiplication is performed before the addition even though addition appears first in the source text. This rule exists because the C grammar assigns every operator a numeric precedence level and an associativity direction; the compiler uses these values to construct an unambiguous parse tree without requiring parentheses in every case. Without such a hierarchy the same token sequence could be interpreted in multiple incompatible ways, breaking both readability and portability across compilers.

The hierarchy is not arbitrary. It mirrors the relative “strength” of operations in mathematics and hardware: multiplicative operators sit above additive ones, shifts above comparisons, and logical operators lowest of all. Unary operators generally outrank binary ones, and postfix operators outrank prefix ones.

> [!NOTE]
> The single most important realization is that precedence is resolved at compile time by the parser; the resulting abstract syntax tree is what executes, not the linear text you wrote.

## 2. Why this matters — concrete and current
NASA’s flight software for the Perseverance rover is written in C and contains thousands of expressions mixing bitwise masks, pointer arithmetic, and comparisons; a single misplaced precedence assumption would have produced incorrect trajectory calculations that surface only under rare sensor conditions.

Modern optimizing compilers such as LLVM/Clang rely on the exact precedence table when they rewrite expressions for instruction scheduling; an incorrect internal model of precedence would silently emit wrong machine code for vectorized loops in machine-learning kernels.

Semiconductor vendors ship C models of their hardware (e.g., ARM’s Cortex-M DSP libraries) where saturated arithmetic and shifts are combined with comparisons; the precedence rules guarantee that `x >> 1 > 0` is parsed identically on every target toolchain.

High-energy physics simulation codes at CERN (Geant4’s C core) evaluate millions of geometric predicates per second; consistent operator binding prevents nondeterministic branching that would invalidate Monte-Carlo results.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| C expression syntax      | You must recognize an expression as a sequence of operands and operators before precedence can be applied. |
| Lvalues vs rvalues       | Several operators (++, --, &) produce lvalues whose precedence interactions affect later assignments. |
| Basic arithmetic types   | The usual arithmetic conversions occur after precedence has already fixed the shape of the expression tree. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Expressions are trees, not sequences
An expression is a tree whose internal nodes are operators. The linear source text is only one possible serialization of that tree.

Example: `a + b * c` must become the tree with `*` at the root and `+` as its left child.

Formally, the grammar is ambiguous without additional disambiguation rules:
$$
E \to E + E \mid E * E \mid \mathit{id}
$$

> [!WARNING]
> Treating the source text as left-to-right evaluation order produces the wrong tree for any expression whose operators differ in strength.

### Step 2 — Assign numeric precedence levels
Each operator receives an integer rank. Higher rank binds tighter.

The ranks range from 1 (lowest, comma) to 16 (highest, postfix ++). Multiplication receives rank 13 while addition receives rank 12.

### Step 3 — Resolve highest rank first
Scan the token list, locate every operator of the current maximum rank, and attach it to its operands, replacing the subexpression by a single non-terminal.

Continuing the example, `*` (rank 13) is attached before `+` (rank 12).

### Step 4 — Apply associativity on equal ranks
When two operators share the same rank, associativity decides grouping: left-to-right for most binary operators, right-to-left for assignment and unary operators.

`a = b = c` becomes `a = (b = c)` because assignment is right-associative.

### Step 5 — Insert unary and postfix distinctions
Postfix operators (., ->, [], ()) receive the highest rank (16). Prefix unary operators receive rank 14 or 15 depending on the operator.

`++*p` is `++(*p)` because postfix would have been higher, yet here only prefix forms appear.

### Step 6 — Encode the complete table
The preceding rules are summarized by the canonical precedence table reproduced in every C reference. The table lists every operator, its rank, associativity, and syntactic form.

### Step 7 — The grammar becomes unambiguous
With the table supplied, the original ambiguous grammar is replaced by a layered grammar in which each precedence level occupies its own non-terminal, guaranteeing a unique parse tree for every well-formed expression.

## 5. Worked examples — every step shown

**Example 1 — Simple arithmetic**
- *Given:* `3 + 4 * 5`
- *Find:* the value of the expression under C rules.
- Scan for highest precedence operator: `*` (rank 13).  
  *Why:* multiplication outranks addition.  
  Replace: `3 + 20`.  
  *Why:* the subexpression `4 * 5` evaluates to 20.  
  Now only `+` remains (rank 12).  
  *Why:* single remaining operator.  
  Result: 23.

**23**

*Reflection:* The example isolates the single most common trap—visual left-to-right reading versus actual rank ordering.

**Example 2 — Mixed shift and comparison**
- *Given:* `1 << 2 > 3`
- *Find:* the parsed tree and value.
- Highest rank is `<<` and `>` both at rank 11 and 10 respectively; `<<` wins.  
  *Why:* shift precedence is 11, relational is 10.  
  Replace: `(1 << 2) > 3` → `4 > 3`.  
  *Why:* shift performed first.  
  Result: 1 (true).

**1**

*Reflection:* Shifts bind tighter than comparisons, a fact frequently forgotten when masking bits before testing.

**Example 3 — Assignment and unary**
- *Given:* `a = -b++`
- *Find:* equivalent parenthesized form.
- Postfix `++` has rank 16.  
  *Why:* postfix highest.  
  Replace: `a = -(b++)`.  
  *Why:* unary minus (rank 14) is next.  
  Resulting tree: assignment receives the negated post-increment.

**a = -(b++)**

*Reflection:* The combination of postfix and unary forces right-to-left evaluation of the unaries after postfix has been resolved.

**Example 4 — Logical and bitwise mixture**
- *Given:* `x & 1 && y`
- *Find:* the evaluation order.
- `&` has rank 9, `&&` has rank 6.  
  *Why:* bitwise AND outranks logical AND.  
  Replace: `(x & 1) && y`.  
  *Why:* rank difference forces grouping.  
  Only then is `&&` evaluated.

**(x & 1) && y**

*Reflection:* The example shows why defensive parentheses remain useful even though precedence is well-defined.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                              |
|-----------------------------------|-----------------------------------------------------|----------------------------------------------|
| Writing `a & b == 0` expecting bitwise test | `==` (rank 10) > `&` (rank 9)                       | Always parenthesize: `a & (b == 0)` or `(a & b) == 0` |
| Assuming `++*p` increments the pointer | Prefix `*` and `++` share high ranks but associate right-to-left | Write `++(*p)` or `(*p)++` explicitly        |
| Forgetting that `?:` is right-associative | Conditional operator is the only ternary and right-associative | Chain `?:` only when the semantics truly require right grouping |
| Confusing shift precedence with additive | Both feel “arithmetic” yet shifts sit one level higher | Internalize the single rank gap between additive (12) and shift (11) |
| Using `=` inside `while (x = y & z)` | Assignment (rank 2) is below bitwise AND            | Use `==` or parenthesize the assignment      |
| Expecting `sizeof int * p` to be `sizeof(int *)` | `sizeof` is unary (rank 14) but the operand is a type name requiring parentheses | Always write `sizeof(int) * p`               |
| Mixing `,` and assignment in `a = b, c = d` | Comma has lowest precedence (rank 1)                | Parenthesize each assignment if comma is intended only as separator |

## 7. The textbook-precise statement
In ISO C, the precedence and associativity of operators are defined by the grammar in §6.5 of the C17 standard (ISO/IEC 9899:2018). Each syntactic category corresponds to one precedence level; for example:

```
logical-AND-expression:
    inclusive-OR-expression
    logical-AND-expression && inclusive-OR-expression
```

The full mapping appears in K&R, *The C Programming Language*, 2nd ed., Appendix A.2.1, Table 2.1. All operators are left-associative except assignment, conditional, and unary operators, which are right-associative. No operator may be split across sequence points except by explicit parentheses.

## 8. Visual — diagram or schematic
```text
Precedence ladder (highest at top)
16  postfix ++ -- () [] . ->
15  prefix ++ -- ! ~ + - * & (type) sizeof _Alignof
14  * / %
13  + -
12  << >>
11  < <= > >=
10  == !=
 9  &
 8  ^
 7  |
 6  &&
 5  ||
 4  ?:
 3  = += -= *= /= ...
 2  ,
```
Each horizontal line represents one rank; operators on the same line share associativity rules given in Step 4.

## 9. The memory technique

1. **The hook** — Picture a 16-rung ladder leaning against a compiler; every time you write an expression you climb the ladder from the bottom, stopping at the highest rung that contains an operator.
2. **What to overlearn** — The three critical rank boundaries: multiplicative (13) above additive (12), shift (11) above relational (10), and bitwise AND (9) above logical AND (6).
3. **Spaced-repetition schedule** — Review the ladder at 1 day, 3 days, 7 days, 16 days, 35 days; each time reconstruct the tree of `a = b & c == 1 << d` without looking.
4. **First-principles fallback** — Re-derive any forgotten entry by comparing the operator’s mathematical “binding strength” with its neighbors and testing both groupings on paper.

## 10. What this unlocks
Mastery of the precedence table lets you read and write dense C expressions that appear in systems code, device drivers, and performance-critical loops without defensive parentheses that obscure intent. It directly precedes the study of sequence points, undefined behavior in expressions, and the parsing of declarations that intertwine pointers, arrays, and function types.

- Pointer declarator syntax (the “clockwise spiral” rule)
- Sequence-point analysis for `i++ + i++`
- Expression rewriting in optimizers
- Macro hygiene when expanding token sequences

## 11. Self-check — five questions, no answers
1. Rewrite `x & 1 << 2 == 0` with explicit parentheses that reflect C precedence.
2. Draw the abstract syntax tree for `a += b = c ? d : e`.
3. Evaluate `1 | 2 && 3 ^ 4` step by step, stating the rank used at each reduction.
4. Identify the parse error (if any) in `sizeof int * p + 1` and supply the minimal parentheses that make it legal.
5. In the expression `p->x++ + ++q->y`, which two operators are evaluated first, and why?