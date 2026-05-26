## 1. The one-sentence answer
**static_assert evaluates a constant expression at compile time and aborts compilation with a programmer-supplied message when that expression is false.**

In C, every ordinary `assert` runs while the program executes; the check therefore consumes CPU cycles and can be disabled entirely by defining `NDEBUG`. A compile-time assertion, by contrast, is performed by the compiler itself before any object code is emitted. The feature therefore guarantees that an invariant holds for the particular target platform, word size, or library configuration chosen at build time.

Because the test occurs before linking or execution, a failing `static_assert` produces a clean diagnostic that names the exact source line and the supplied message. This property turns what would have been a latent runtime bug into an immediate, reproducible build failure.

> [!NOTE]
> The decisive insight is that the compiler’s constant-expression evaluator becomes an additional, zero-cost verification pass that can examine sizes, alignments, and macro values that are unknowable until preprocessing and type checking finish.

## 2. Why this matters — concrete and current
The Linux kernel uses `static_assert` (via the macro `BUILD_BUG_ON`) inside architecture-specific headers to guarantee that the size of the thread-info structure exactly matches the configured stack size on every supported platform; a mismatch would silently corrupt the task stack at runtime.

In the GNU C Library, `static_assert` protects the public `struct stat` layout so that 64-bit time_t fields remain correctly aligned on both ILP32 and LP64 ABIs; any future header change that violates the layout is caught at the first attempted build of dependent packages.

High-performance linear-algebra libraries such as OpenBLAS embed `static_assert` statements that verify the SIMD vector width chosen by the build system is a multiple of the natural alignment of `double`; the check prevents mis-compilation when cross-compiling for ARM SVE or RISC-V V-extension targets.

NASA’s Core Flight System (cFS) flight software employs `static_assert` to ensure that the on-board command-packet structure remains 8-byte aligned on both the RAD750 and the newer GR740 processors, eliminating an entire class of radiation-induced data-corruption risks that would otherwise appear only after launch.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Integer constant expression | The condition passed to `static_assert` must be known at translation phase 7. |
| `sizeof` and `_Alignof`   | These operators produce constant expressions usable inside the assertion. |
| Preprocessor macros       | Most real-world uses hide the keyword behind a macro that supplies a helpful message. |
| Translation phases        | Understanding that preprocessing and constant evaluation precede code generation explains why the check is free at runtime. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Compile-time versus runtime evaluation
A condition that depends only on literals, `sizeof`, or `enum` constants can be reduced by the compiler to a single Boolean value before any machine instruction is generated.  
Example: `sizeof(int) == 4`.  
Formal statement: an expression `E` is an *integer constant expression* if it is one of the forms listed in C11 6.6.  
> [!WARNING]  
> Using a variable or a function call makes the expression non-constant; the compiler will reject the assertion even if the value happens to be true at runtime.

### Step 2 — The classic `assert` macro cannot help
`assert` expands to a runtime test wrapped in an `if`; the test is removed when `NDEBUG` is defined. Consequently an invariant that must hold for the chosen ABI cannot be enforced by `assert`.  
Formal observation: the macro lives in `<assert.h>` and expands after preprocessing, so its argument is never examined by the constant-expression machinery.

### Step 3 — The keyword `_Static_assert`
C11 introduced the keyword `_Static_assert` that takes two arguments: a constant expression and a string literal.  
Syntax: `_Static_assert(` *constant-expression* `,` *string-literal* `);`.  
The declaration is well-formed only when the constant expression compares unequal to zero.

### Step 4 — The header macro `static_assert`
`<assert.h>` optionally defines the macro `static_assert` as an alias for `_Static_assert`, allowing the identifier to be used without leading underscore.  
The macro is available only when `__STDC_VERSION__ >= 201112L`.

### Step 5 — Scope and placement rules
A `static_assert` declaration may appear wherever an ordinary declaration is permitted—at file scope, inside a function, or inside a `struct` definition (C11 6.7.2.1p3).  
It does not declare an identifier and therefore does not affect the symbol table.

### Step 6 — The resulting translation-unit constraint
If the constant expression evaluates to zero, the implementation must produce a diagnostic message containing the supplied string literal; translation fails. This is the textbook statement of the feature.

## 5. Worked examples — every step shown

**Example 1 — Enforcing pointer size**  
*Given:* A header that must be portable only to 64-bit targets.  
*Find:* A compile-time check that aborts otherwise.  

```c
_Static_assert(sizeof(void*) == 8, "only 64-bit supported");
```
*Why:* `sizeof(void*)` is an integer constant expression.  
*Why:* The string literal becomes part of the diagnostic.  
**`static_assert` accepted on 64-bit builds, rejected elsewhere.**

*Reflection:* The example isolates the single requirement that the expression be constant.

**Example 2 — Array-size validation**  
*Given:*  
```c
#define MAX_SENSORS 32
int readings[MAX_SENSORS];
```
*Find:* Guarantee that the array contains a power-of-two number of elements.  

```c
static_assert((MAX_SENSORS & (MAX_SENSORS-1)) == 0,
              "MAX_SENSORS must be a power of two");
```
*Why:* The bitwise expression is evaluated at translation time.  
**Compilation fails with the given message if the macro is changed to 30.**

*Reflection:* Demonstrates that macro values participate in constant expressions.

**Example 3 — Structure layout invariant**  
*Given:* A packet structure that must remain 8-byte aligned for DMA.  
*Find:* Check inside the struct definition.  

```c
struct dma_packet {
    uint32_t header;
    uint32_t len;
    uint64_t data[4];
    _Static_assert(sizeof(struct dma_packet) == 40,
                   "unexpected padding");
};
```
*Why:* `_Alignof` and `sizeof` are constant; the assertion is part of the struct body.  
**Any added field that changes size triggers an immediate diagnostic.**

*Reflection:* Shows that assertions can live inside type declarations.

**Example 4 — Conditional compilation guard**  
*Given:* A library that supports only C11 and later.  
*Find:* A single check at the top of the public header.  

```c
#if __STDC_VERSION__ < 201112L
#error "C11 or later required"
#else
static_assert(1, "C11 static_assert available");
#endif
```
*Why:* The preprocessor test selects the translation path; the assertion then confirms the feature.  
**Final binary is emitted only when both checks pass.**

*Reflection:* Combines preprocessor and compile-time assertion for layered safety.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Passing a non-constant expression   | Programmer confuses runtime truth with compile-time constant | Wrap the expression with `sizeof` or an `enum` value |
| Forgetting the message argument     | C11 syntax requires two arguments                   | Always supply a string literal, even if empty        |
| Using `static_assert` before C11    | Macro is not defined; identifier is reserved        | Guard with `#if __STDC_VERSION__ >= 201112L`         |
| Placing assertion after a statement inside a function | Block-item rules require declarations first in older modes | Move the assertion to the top of the block           |
| Expecting the check when `NDEBUG` is defined | Confusion with the runtime `assert` macro           | Remember `static_assert` is unaffected by `NDEBUG`   |
| Relying on VLAs or `alloca` sizes   | Those sizes are not constant expressions            | Use only `sizeof` on complete types or literal arithmetic |
| Message string not being a literal  | Compiler requires a string literal for the diagnostic | Write a literal; do not compute the message          |

## 7. The textbook-precise statement
C11 6.7.2.1 paragraph 3 and 6.7.10 together state:

> A static assertion declaration has the form  
> `_Static_assert (` *constant-expression* `,` *string-literal* `) ;`  
> The *constant-expression* shall be an integer constant expression. If it compares equal to zero, a diagnostic message including the *string-literal* shall be issued and the translation fails.

See also ISO/IEC 9899:2011 §6.6 and §7.2.

## 8. Visual — diagram or schematic
```text
Translation phases
1–4  Preprocessing & macro expansion
5    Tokenization
6    Syntactic & semantic analysis
7    Constant-expression evaluation  <-- static_assert examined here
8    Code generation
9    Linking
```
A failure at phase 7 produces a diagnostic and aborts before phase 8; no object file is written.

## 9. The memory technique
1. **The hook** — Picture a security guard standing at the compiler’s door; the guard reads a stone tablet (`static_assert`) and smashes the incoming translation unit if the carved equation is false.
2. **What to overlearn** — `_Static_assert(` *ice* `,` *"msg"* `);` and the fact that the first argument must be an integer constant expression.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by asking “Does this value exist before any instruction is emitted?”; if yes, it may appear inside `_Static_assert`.

## 10. What this unlocks
`static_assert` supplies the compile-time branch of generic programming and type-safe metaprogramming in C. It is a prerequisite for safe implementation of `_Generic` macros, for header-only libraries that adapt to target endianness, and for the modern `<stdalign.h>` and `<stdatomic.h>` facilities that themselves contain hidden `static_assert` checks.

- Safer use of `_Generic` selection
- Compile-time endianness and alignment dispatch
- Header-only SIMD abstraction layers
- Verified constant table sizes for embedded systems

## 11. Self-check — five questions, no answers
1. Write a `static_assert` that verifies a macro `PAGE_SIZE` is at least 4096 and a power of two.
2. Explain why `static_assert(sizeof(int) == 4, "32-bit");` may still compile on a 64-bit platform.
3. What diagnostic does the implementation produce if the constant expression evaluates to zero?
4. Can a `static_assert` appear after an executable statement inside a compound statement in C11? Demonstrate with a minimal example.
5. Identify the latent defect:  
   ```c
   int n = 8;
   static_assert(n == 8, "n must be 8");
   ```