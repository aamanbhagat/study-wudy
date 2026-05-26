## 1. The one-sentence answer
**Enumerations** are a C language mechanism that binds a sequence of named integer constants to successive values starting at zero by default.

In everyday code you often need a small set of related constants—days of the week, error codes, token kinds, hardware states. Typing literal numbers each time invites typos and obscures meaning. An enumeration lets you write readable names while the compiler still substitutes ordinary integers, so the generated machine code remains identical to the version that used raw numbers.

The feature therefore solves a documentation and maintenance problem rather than a performance problem. It adds no runtime cost and occupies no extra storage beyond the integer it represents.

> [!NOTE]
> The decisive insight is that an enumeration is nothing more than a compile-time name-to-integer mapping; once the names are replaced, the program behaves exactly as if the integers had been written by hand.

## 2. Why this matters — concrete and current
The Linux kernel defines hundreds of enumerations for process states (`TASK_RUNNING`, `TASK_INTERRUPTIBLE`, …) and for error categories returned by system calls; these names appear in every scheduler trace and every `errno` handling path.

In the LLVM/Clang codebase, enumerations label every token kind (`tok::kw_int`, `tok::l_brace`, …) produced by the lexer; the subsequent parser switches on these named values rather than on magic integers, making the several-million-line compiler tractable for human readers.

Flight software on NASA’s Mars rovers uses enumerations to encode spacecraft modes (`SAFE`, `DRIVE`, `SAMPLE`) inside the flight computer’s command-and-telemetry packets; the same values are logged verbatim, allowing ground operators to reconstruct mode transitions from raw telemetry without consulting separate tables.

Semiconductor vendors publish header files containing enumerations for every peripheral register field (STM32’s `GPIO_Mode_IN`, `GPIO_Mode_OUT`, …); device-driver authors include these headers so that the numeric bit patterns never appear as literals in application code.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Integer types (`int`, `unsigned`) | Enumerators are always stored as integers; you must know their ranges and promotion rules. |
| Preprocessor `#define`   | The older technique for named constants; understanding its drawbacks shows why `enum` was introduced. |
| `switch` statement       | The most common place enumerators appear as case labels; fall-through and exhaustiveness rules interact directly with them. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Naming a single constant
You want a readable synonym for the integer 0 that represents “Sunday.”  
```c
enum { SUN } day;
```
The identifier `SUN` is declared as a constant whose value is 0.  
$$ \text{SUN} \equiv 0 $$
> [!WARNING]
> Forgetting that the identifier is replaced at compile time can lead to attempts to take its address—an error, because enumerators are not lvalues.

### Step 2 — Creating a list of related constants
Multiple names are listed inside the same braces; each subsequent name receives the previous value plus one.  
```c
enum { SUN, MON, TUE } day;
```
Thus `SUN = 0`, `MON = 1`, `TUE = 2`.  
$$ v_i = v_{i-1} + 1 \quad (v_0 = 0) $$

### Step 3 — Explicit value assignment
Any enumerator may be given an explicit value; later enumerators continue counting from that point.  
```c
enum { SUN = 7, MON, TUE = 1 } day;
```
`SUN = 7`, `MON = 8`, `TUE = 1`.

### Step 4 — Naming the type itself
Prefixing the list with a tag creates a new type name usable in declarations.  
```c
enum weekday { SUN, MON, TUE };
enum weekday today;
```
The tag `weekday` is now a distinct type whose underlying representation is still `int`.

### Step 5 — Typed enumerations (C23)
An underlying type may be specified, guaranteeing the exact storage width.  
```c
enum weekday : unsigned char { SUN, MON };
```
All enumerators are still compile-time constants, yet `sizeof(enum weekday)` equals `sizeof(unsigned char)`.

## 5. Worked examples — every step shown

**Example 1 — Minimal definition**  
*Given:* Need a constant for “off” state.  
*Find:* An enumeration containing only that constant.  
Step 1: Write the keyword and braces.  
*Why:* The grammar requires `enum { … }`.  
Step 2: Place the identifier inside.  
*Why:* The identifier becomes the named constant.  
Step 3: Terminate with semicolon.  
**`enum { OFF };`**  
*Reflection:* The example shows that even a single enumerator is valid and receives value 0.

**Example 2 — Default sequencing**  
*Given:* Traffic-light colours.  
*Find:* Values for red, yellow, green.  
Step 1: List the three names.  
*Why:* Default increment supplies 0, 1, 2.  
Step 2: Declare a variable of the new type.  
*Why:* Demonstrates that the tag can be used immediately.  
**`enum light { RED, YELLOW, GREEN }; enum light sig = RED;`**  
*Reflection:* Implicit values are the most common source of off-by-one errors later in the code.

**Example 3 — Explicit values and gaps**  
*Given:* HTTP status codes 200, 404, 500.  
*Find:* An enumeration preserving the numeric values.  
Step 1: Assign 200 to the first name.  
*Why:* Overrides the default zero.  
Step 2: Skip to 404 for the next.  
*Why:* The compiler does not fill gaps.  
Step 3: Continue from the last explicit value or assign again.  
**`enum status { OK = 200, NOT_FOUND = 404, SERVER_ERROR = 500 };`**  
*Reflection:* Explicit values break the simple arithmetic progression; always verify the last assigned value when reading such an enum.

**Example 4 — Switch exhaustiveness**  
*Given:* The `light` enumeration above.  
*Find:* A switch that must handle every colour.  
Step 1: Write cases for each enumerator.  
*Why:* The compiler sees the names, not the integers.  
Step 2: Add a `default` only if future extension is expected.  
*Why:* Omitting `default` lets the compiler warn about missing cases.  
**`switch (sig) { case RED: … break; case YELLOW: … break; case GREEN: … break; }`**  
*Reflection:* Using enumerators inside `switch` turns a maintenance hazard into a compile-time check.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Assuming the first enumerator is always 0 | Previous explicit assignment may have changed the base | Read the definition from top to bottom before using values |
| Treating enumerators as variables | They are constants; `&RED` is illegal       | Remember they have no storage or address     |
| Using the same name in two enums  | C namespaces are flat for tags              | Prefix tags (`light_RED`) or place in separate headers |
| Forgetting that the type is compatible with `int` | Implicit conversion hides overflow          | Cast explicitly when storing into a narrower integer |
| Relying on ordering for comparisons | Values may be non-monotonic after explicit assignments | Compare only against named constants, never by numeric order |
| Defining an enum inside a function and expecting it to be visible elsewhere | Tag scope follows ordinary block rules     | Move the definition to header scope          |
| Expecting `sizeof(enum tag)` to be smaller than `int` in pre-C23 code | Underlying type was implementation-defined  | Use C23’s explicit underlying type or accept `int` |

## 7. The textbook-precise statement
An enumeration type is declared by  
```c
enum identifier_opt { enumerator-list } ;
```
where each enumerator is an identifier optionally followed by `= constant-expression`. The identifiers are constants of type `int` (or the declared underlying type in C23) with implementation-defined values consistent with the given expressions and the rule that an omitted expression equals one more than the previous enumerator. (Kernighan & Ritchie, *The C Programming Language*, 2nd ed., §2.5; ISO/IEC 9899:2023, §6.7.2.2)

## 8. Visual — diagram or schematic

```text
Source text                  Compiler action               Generated code
-------------                -----------------             --------------
enum light {                 RED  -> 0                     mov  $0, %eax
  RED,                       YELLOW -> 1                   ...
  YELLOW,                    GREEN -> 2
  GREEN
};
enum light sig = RED;        sig = 0
```

## 9. The memory technique

1. **The hook** — Picture a set of labelled jars on a shelf; the first jar is empty (value 0) and each next jar holds one more marble than the previous unless you deliberately drop a different number of marbles into it.  
2. **What to overlearn** — (a) default starts at 0 and increments by 1; (b) an enumerator is a compile-time constant, never an lvalue; (c) the tag creates a distinct type even though the representation is integer.  
3. **Spaced-repetition schedule** — Review the three facts above after 1 day, 3 days, 7 days, 16 days, and 35 days.  
4. **First-principles fallback** — Re-derive by writing the integer values by hand, then replace each literal with a name inside braces; the compiler performs exactly the same substitution you just did mentally.

## 10. What this unlocks
Enumerations integrate directly with `switch`, bit-field packing, and `struct` definitions, forming the foundation for state-machine encodings and protocol header constants used throughout systems programming. They also prepare the ground for later C++ `enum class` and for the exhaustive pattern-matching constructs appearing in modern languages.

- `switch` exhaustiveness checking  
- Bit masks inside hardware register definitions  
- Token and AST node kinds inside compilers  
- State-machine tables in real-time operating systems  

## 11. Self-check — five questions, no answers
1. Write the shortest valid enumeration that gives the name `PI` the value 3.  
2. After `enum { A = 5, B, C = 1, D };`, what are the numeric values of A, B, C, and D?  
3. Can the address-of operator be applied to an enumerator? Demonstrate with a one-line program that fails to compile.  
4. In a `switch` on an enumeration variable, what happens if one enumerator is omitted and no `default` label exists?  
5. How does the storage size of an enumeration change when an explicit underlying type is supplied in C23 versus classic C?