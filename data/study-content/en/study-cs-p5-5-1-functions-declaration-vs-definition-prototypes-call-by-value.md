## 1. The one-sentence answer
**In C, a function declaration introduces a name and signature so the compiler can check calls, a definition supplies the executable body, a prototype is a declaration placed before use, and call by value passes copies of arguments so the callee cannot modify the caller's variables.**

A function must be known to the compiler before any call occurs. The declaration supplies only the interface—return type, name, and parameter types—while the definition supplies the implementation. Without a prior declaration the compiler cannot verify argument types or count, leading to implicit-int assumptions that modern C rejects.

A prototype is simply a declaration written at file scope or inside another function; its sole purpose is to enable correct calls before the definition appears. Call by value follows directly from the rule that each parameter is a fresh local variable initialised from the argument expression; any assignment inside the function affects only that local copy.

> [!NOTE]
> The separation of declaration from definition is what permits mutual recursion and separate compilation; call by value is the reason a swap function written with ordinary parameters never swaps the caller's variables.

## 2. Why this matters — concrete and current
The Linux kernel declares thousands of functions in header files so that device-driver modules compiled separately can call core routines without seeing their definitions; a missing prototype once produced a subtle bug in the e1000 network driver that corrupted packet buffers for years.

NASA’s flight software for the Perseverance rover is written in C with strict prototype requirements enforced by MISRA rules; every function used in the entry-descent-landing sequence is prototyped in a single shared header so static analysis tools can prove absence of type errors before upload.

TensorFlow’s custom C++ ops call into hand-written C kernels; the kernels are declared via prototypes in .h files and defined in .c files that are compiled to separate object files, allowing the build system to link optimised assembly versions without recompiling the entire framework.

Modern semiconductor simulators such as SPICE derivatives rely on call-by-value semantics when passing small structs that describe transistor parameters; because the simulator never intends to mutate the caller’s model data, the copy semantics guarantee thread safety inside parallel Newton–Raphson iterations.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Basic variable declarations and types | Parameters and return types are declared exactly like variables. |
| Block structure and compound statements | The function body is a block; understanding scope is required to see why call-by-value copies live only inside that block. |
| Expression evaluation order | Arguments are fully evaluated before the call; this interacts with call-by-value copying. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A function needs a name and a contract before it can be called
Any identifier used in an expression must have been declared so the compiler knows its type. For functions the minimal declaration states only what the call site needs: the result type and the types of arguments.

Example:
```c
int square(int);
```
Formal statement:
$$
\text{declaration} ::= \texttt{type-specifier declarator ;}
$$
where declarator contains the function name and parameter-type list.

> [!WARNING]
> Omitting the declaration lets the compiler assume an implicit `int` return type and unspecified parameters; modern compilers reject this under `-std=c99` or later.

### Step 2 — The definition supplies the body that turns the name into executable code
A definition is a declaration plus a compound statement that implements the contract. Only one definition may exist for any given function name.

Example:
```c
int square(int x) { return x * x; }
```
Formal statement:
$$
\text{definition} ::= \texttt{type-specifier declarator compound-statement}
$$

### Step 3 — A prototype is a declaration that appears before any call
Placing the declaration early in the translation unit (or in a header) satisfies the compiler’s requirement that every call be preceded by a prototype in scope.

### Step 4 — Parameter names in a prototype are optional and have no storage
Only the types matter for type checking; names are allowed solely for documentation and are ignored by the compiler.

### Step 5 — Call by value creates fresh parameter objects
Each parameter is a distinct automatic object whose initial value is obtained by assignment from the corresponding argument expression. Consequently, modifications inside the callee never affect the caller’s objects.

Formal statement:
$$
\text{parameter}_{i} \leftarrow \text{argument}_{i} \quad \text{(copy semantics)}
$$

### Step 6 — The complete rule set
A function may be declared many times but defined only once; every call must be preceded by a declaration in scope; all arguments are passed by value unless pointers are used.

## 5. Worked examples — every step shown

**Example 1 — Minimal declaration before definition**
- *Given:* A call to `max` appears before its definition.
- *Find:* The minimal prototype that makes the program compile.
Step 1: Write the prototype at file scope.  
*Why:* The compiler must see the signature before the call.  
```c
int max(int, int);
```
Step 2: Provide the definition later.  
*Why:* The definition supplies the body required by the linker.  
```c
int max(int a, int b) { return a > b ? a : b; }
```
**Final answer**  
```c
int max(int, int);          /* prototype */
... calls to max ...
int max(int a, int b) { ... } /* definition */
```
*Reflection:* The example isolates declaration from definition; the comma-separated list without names shows that names are optional in prototypes.

**Example 2 — Prototype inside another function**
- *Given:* A helper function is needed only inside `compute`.
- *Find:* A local prototype.
Step 1: Place the declaration inside the block.  
*Why:* Scope rules allow prototypes at block scope.  
```c
double compute(double x) {
    double helper(double);   /* prototype visible only here */
    return helper(x) + 1.0;
}
```
**Final answer**  
The prototype is scoped to `compute`; no other function can see `helper`.

*Reflection:* Demonstrates that prototypes need not be at file scope.

**Example 3 — Call-by-value does not mutate caller**
- *Given:* Attempt to swap two integers with a function.
- *Find:* Values after the call.
Step 1: Define the function using ordinary parameters.  
*Why:* Parameters receive copies.  
```c
void swap(int a, int b) { int t = a; a = b; b = t; }
```
Step 2: Call it.  
*Why:* Arguments are evaluated and copied.  
```c
int x = 3, y = 7;
swap(x, y);
```
**Final answer**  
`x == 3`, `y == 7` (unchanged).  
*Reflection:* The classic trap that forces students to discover pointers.

**Example 4 — Prototype mismatch detected at compile time**
- *Given:* A prototype declares `int f(double)` but definition uses `int f(int)`.
- *Find:* Compiler behaviour.
Step 1: Prototype seen first.  
*Why:* Type checking uses the prototype.  
Step 2: Definition appears with incompatible parameter.  
*Why:* The types must agree exactly.  
**Final answer**  
Compilation error: conflicting types for `f`.

*Reflection:* Shows why prototypes must be kept in sync with definitions.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting a prototype before first call | Old C allowed implicit `int`                | Compile with `-Wall -Werror` and C99+        |
| Placing parameter names only in definition, then wondering why calls fail | Names are irrelevant to the compiler in prototypes | Always write prototypes with parameter types only |
| Defining the same function in two .c files | Each definition creates a strong symbol     | Use header for declaration, single .c for definition |
| Expecting a swap function to work without pointers | Call-by-value copies are invisible to caller | Draw the stack frames before writing         |
| Writing a prototype inside `main` but calling from elsewhere | Scope of block-scope declaration is limited | Move prototypes to file scope or headers     |
| Using `void foo();` and later calling with arguments | Empty parentheses mean unspecified parameters | Write `void foo(void);` for zero parameters  |
| Returning a local array by value   | Arrays decay to pointers, but the storage dies | Return a pointer to static or heap storage   |

## 7. The textbook-precise statement
A function declarator of the form  
$$
T\ D(\,T_1,\dots,T_n\,)\texttt{;}
$$  
is a prototype declaration. The corresponding definition must be  
$$
T\ D(\,T_1\,x_1,\dots,T_n\,x_n\,)\ \texttt{\{}\ \textit{block-item-list}\ \texttt{\}}
$$  
with identical return type \(T\) and parameter types \(T_i\). All arguments are evaluated and then assigned to the parameter objects (call-by-value). Reference: Kernighan & Ritchie, *The C Programming Language*, 2e, §4.2–4.5.

## 8. Visual — diagram or schematic
```text
Translation unit
+---------------------------+
| int max(int, int);        |  <-- prototype (declaration)
| ...                       |
| int max(int a, int b) {   |  <-- definition
|     return a>b ? a : b;   |
| }                         |
+---------------------------+

Call site
  caller frame
  +-----------+
  | arg1=5    | --copy-->  callee frame
  | arg2=3    |            +-----------+
  +-----------+            | a = 5     |
                           | b = 3     |
                           +-----------+
```
The diagram shows that the two frames contain distinct objects; only values travel across the call boundary.

## 9. The memory technique
1. **The hook** — Picture a restaurant menu (declaration/prototype) versus the kitchen that actually cooks the meal (definition). The waiter copies your order onto a ticket (call by value); the kitchen never reaches back to change what you wrote on your own notepad.
2. **What to overlearn** — (a) Every call requires a prior prototype in scope. (b) Parameters are fresh locals. (c) One definition rule.
3. **Spaced-repetition schedule** — Review the three facts above at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by writing the smallest compilable program that calls an undeclared function, then add the prototype and observe the diagnostic disappear.

## 10. What this unlocks
Mastery of declaration versus definition and call-by-value is the prerequisite for understanding pointers, call-by-reference simulation, recursion, and separate compilation units.

- Pointer parameters and the `&` operator (next lesson)  
- Header files and the one-definition rule  
- Recursion and stack-frame layout  
- Linkage and `extern` / `static` function specifiers  

## 11. Self-check — five questions, no answers
1. Write the shortest prototype that allows `printf("%d\n", cube(3));` to compile.
2. A function is declared `double f(int);` and later defined as `double f(double x){…}`. What diagnostic does a conforming compiler emit?
3. Demonstrate with a four-line program that a function `void inc(int n){n++;} ` leaves its argument unchanged at the call site.
4. Why does the following code violate the one-definition rule when placed in two separate .c files that are later linked together?  
   ```c
   int twice(int x){ return 2*x; }
   ```
5. A programmer writes `int foo();` and then calls `foo(3.14);`. The program compiles and runs. Explain the latent defect and how to repair it with a prototype.