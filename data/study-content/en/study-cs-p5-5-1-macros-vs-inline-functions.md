## 1. The one-sentence answer
**Macros perform textual substitution before compilation while inline functions request the compiler to insert function body code at call sites after type checking.**

A macro is expanded by the preprocessor, which blindly replaces the macro name with its definition text. This happens before the compiler ever sees the source, so no types are examined and no scope rules apply. The result can produce efficient code but also surprising expansions when arguments contain side effects or operators.

An inline function, introduced in C99, is a genuine function that the compiler may choose to expand inline. The compiler performs the usual semantic checks, respects scope, and can optimize across the inlined body. The programmer merely supplies the hint; the compiler decides whether inlining actually occurs.

> [!NOTE]
> The decisive difference is timing and safety: macros rewrite text before any analysis, inline functions rewrite code after full semantic analysis.

## 2. Why this matters — concrete and current
In the Linux kernel, hot-path primitives such as `list_entry` and many atomic operations remain macros to guarantee zero function-call overhead and to allow compile-time constant folding across architecture-specific barriers.  

High-frequency trading platforms written in C keep order-book update routines as inline functions so that type checking prevents accidental mixing of price and quantity integers while still achieving the same instruction count as a macro.  

NASA’s flight software for the Perseverance rover uses inline functions for sensor-filtering routines; the MISRA-C checker can verify that every argument is the correct fixed-point type, something impossible with macros.  

Semiconductor EDA tools such as those from Synopsys rely on inline functions inside their C models of hardware timing arcs because the compiler can then apply interprocedural constant propagation that a macro expansion would hide from later optimisation passes.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Preprocessor phases        | Macros are expanded in phase 4, before any syntax tree exists |
| Function call semantics    | Inline functions obey the same rules as ordinary functions |
| Side effects in expressions| Macros can duplicate or reorder side effects; inline functions cannot |
| Compilation pipeline       | Distinguishes textual substitution from code generation   |

## 4. Building the idea — from intuition to formalism

### Step 1 — Textual replacement
A macro is a name that the preprocessor replaces with a token sequence.  
`#define SQUARE(x) x * x` turns `SQUARE(3+1)` into `3+1 * 3+1`.  
Formally the preprocessor performs the mapping  
$$
\texttt{token-sequence} \leftarrow \text{subst}(\texttt{macro-name}, \texttt{argument-list}).
$$
> [!WARNING]  
> Forgetting that substitution is purely textual leads to operator-precedence bugs.

### Step 2 — Absence of type checking
Because replacement occurs before parsing, the compiler never sees the macro parameters as typed objects. Consequently `SQUARE(3.5)` and `SQUARE("hi")` are both accepted and produce whatever the resulting tokens happen to mean.

### Step 3 — Multiple evaluation of arguments
If an argument contains a side effect, the macro may evaluate it more than once.  
`SQUARE(i++)` expands to `i++ * i++`, incrementing `i` twice.

### Step 4 — Inline function declaration
Declaring `inline int square(int x) { return x * x; }` tells the compiler that calls to `square` are candidates for inlining. The compiler still type-checks every call.

### Step 5 — Single evaluation guarantee
Inside an inline function each parameter is evaluated exactly once, exactly as in an ordinary function. The generated code may contain no call instruction, yet the semantics remain those of a function.

### Step 6 — Compiler discretion
The C standard grants the compiler freedom to ignore the `inline` keyword or to inline a function that lacks it. The only guarantee is that the function’s address is unique if it is not `static`.

### Step 7 — Textbook outcome
Macros trade safety for guaranteed textual substitution; inline functions trade guaranteed substitution for type safety and well-defined evaluation order.

## 5. Worked examples — every step shown

**Example 1 — Simple macro expansion**  
*Given:* `#define MAX(a,b) a>b?a:b` and the statement `x = MAX(3,5);`  
*Find:* the preprocessor output.  
Step 1: locate macro invocation → `MAX(3,5)`.  
*Why* — preprocessor matches the defined name.  
Step 2: replace parameters → `3>5?3:5`.  
*Why* — textual substitution inserts tokens verbatim.  
**`x = 3>5?3:5;`**

*Reflection:* The example is trivial yet already shows that no parentheses protect the result.

**Example 2 — Side-effect duplication**  
*Given:* `#define SQR(x) x*x` and `int i=2; int r = SQR(i++);`  
*Find:* final values of `r` and `i`.  
Step 1: expand → `i++ * i++`.  
*Why* — each `x` is replaced independently.  
Step 2: evaluate left-to-right (implementation defined) → two increments occur.  
*Why* — C permits multiple modifications between sequence points.  
**`r = 4`, `i = 4` (typical outcome).**

*Reflection:* Demonstrates why macros must be written with extreme caution around any argument that is not a simple variable.

**Example 3 — Equivalent inline function**  
*Given:* `inline int sqr(int x){return x*x;}` and the same `i=2; r=sqr(i++);`  
*Find:* final values.  
Step 1: type check passes (both operands `int`).  
*Why* — function semantics enforce a single evaluation.  
Step 2: compiler may emit `r = 4; i = 3;` without a call.  
*Why* — inlining preserves the abstract machine semantics.  
**`r = 4`, `i = 3`.**

*Reflection:* The behavioural difference appears only when side effects are present.

**Example 4 — Type safety contrast**  
*Given:* `SQUARE(2.5)` versus `sqr(2.5)` with the definitions above.  
*Find:* compiler behaviour.  
Step 1 (macro): tokens become `2.5 * 2.5`, accepted.  
Step 2 (inline): argument `double` mismatches `int` parameter → diagnostic required.  
**Macro silently produces `double`; inline function rejects the call.**

*Reflection:* The example isolates the safety gain that only appears after the preprocessor stage.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Operator precedence error   | Macro body lacks parentheses                | Always parenthesise every parameter and the whole expression |
| Multiple side-effect evaluation | Textual substitution duplicates arguments | Convert to inline function or use statement expression |
| No debugging symbol for macro | Preprocessor removes the name before compilation | Prefer inline functions for logic that must be stepped through |
| Macro name clashes across headers | No namespace or scope                       | Use a distinctive prefix or switch to functions |
| `inline` ignored at -O0     | Compiler follows optimisation level         | Measure with `-Winline` or profile; do not rely on the keyword alone |
| Variadic macro argument counting | Preprocessor macros can be variadic but fragile | Use `inline` variadic functions when possible |
| Token pasting surprises     | `##` operator concatenates tokens           | Limit `##` to narrow, well-tested helper macros |

## 7. The textbook-precise statement
An object-like or function-like macro is processed in translation phase 4 by replacing the macro invocation with the corresponding preprocessing token sequence (ISO/IEC 9899:2018, §6.10.3). An inline function definition has external linkage by default and provides an alternative to an external definition; the compiler may substitute the function body for a call (ISO/IEC 9899:2018, §6.7.4). See also Harbison & Steele, *C: A Reference Manual*, 5e, §7.3 and §9.4.

## 8. Visual — diagram or schematic
```text
Source code
    │
    ▼
Preprocessor (phase 4)
    │  Macro expansion only
    │  No types, no scope
    ▼
Compiler front-end
    │  Parsing + semantic analysis
    │  Inline decision (may inline or not)
    ▼
Optimiser & code generator
    │  Final instruction stream
```
The diagram shows the strict ordering: macro work finishes before any C semantics are applied; inline decisions occur inside the compiler after the semantics are known.

## 9. The memory technique
1. **The hook** — Picture a macro as a rubber stamp that blindly presses ink onto the page; an inline function as a clerk who first checks the form is correct, then may photocopy the text into the document.  
2. **What to overlearn** — Macros evaluate arguments multiple times; inline functions evaluate them once; macros have no type checking.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by asking “At what moment is this text examined?” If before the parser, it is a macro; if after, it is a function (inline or not).

## 10. What this unlocks
Mastery of the distinction lets you read and write performance-critical systems code without introducing subtle bugs. It directly precedes the study of compiler optimisation passes, attribute-based hints (`__attribute__((always_inline))`), and header-only library design.

- Link-time optimisation and whole-program analysis  
- `static inline` versus `extern inline` linkage rules  
- Macro-free header libraries using C11 `_Generic`  
- MISRA-C and CERT coding standards compliance checks  

## 11. Self-check — five questions, no answers
1. Expand `#define F(a) (a)+(a)` for the expression `F(x++);` and state how many times `x` is incremented.  
2. Rewrite the same macro as an inline function and give the resulting increment count.  
3. A macro contains the token sequence `a ## b`. What phase must succeed for the concatenation to be valid?  
4. Under which optimisation level is an `inline` function most likely to remain a call?  
5. Identify the latent defect: `#define ABS(x) x<0 ? -x : x` when used inside `y = ABS(a) - ABS(b);`.