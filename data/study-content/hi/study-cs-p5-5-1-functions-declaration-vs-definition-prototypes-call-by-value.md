## 1. The one-sentence answer
**In C, a function declaration (or prototype) tells the compiler the signature so calls can be checked before the body appears, while the definition supplies the actual code; call by value means every argument is copied into a fresh local parameter so the caller’s variables stay untouched.**

Declaration aur definition alag hote hain kyunki C ek-pass compiler model follow karta hai. Jab aap pehle function call likhte ho aur uska body baad mein define karte ho, compiler ko pehle se pata hona chahiye ki return type kya hai aur parameters kaun se hain. Prototype exactly wahi signature deta hai bina body ke. Call by value ka matlab hai ki function ke andar parameter ko badalne se caller ke original variable par koi asar nahi padta.

Yeh farq practical code mein dikhta hai jab aap header files mein prototypes rakhte ho aur .c files mein definitions. Agar prototype galat ho to compiler warning ya error de sakta hai jo runtime bugs ko rokta hai.

> [!NOTE]
> Sabse badi aha yeh hai ki C mein “function exists” aur “function works” do alag baatein hain; prototype sirf pehli baat confirm karta hai, definition doosri.

## 2. Why this matters — concrete and current
Linux kernel developers har roz thousands of function prototypes header files mein likhte hain taaki cross-file calls compile-time check ho sakein; bina prototype ke build time par cryptic linker errors aate hain jo kernel debugging ko slow kar dete hain.

In aerospace flight software (NASA’s cFS framework) call-by-value semantics ko deliberately use kiya jata hai taaki ek module ke andar parameter corruption doosre module ko na affect kare; yeh DO-178C certification ke liye zaroori hai.

Modern ML inference engines jaise TensorFlow Lite ke C backend mein matrix multiplication functions prototypes ke through expose kiye jaate hain; yeh header-only interface allow karta hai different SIMD backends (AVX, NEON) ko bina caller code change kiye swap karna.

Semiconductor EDA tools (Synopsys VCS) ke core simulation loop mein call-by-value passing ka use hota hai jab small structs ko pass kiya jata hai; yeh cache-friendly hota hai aur race conditions kam karta hai jab multiple threads same function ko call karte hain.

Embedded RTOS jaise FreeRTOS mein task-creation functions ke prototypes public headers mein hote hain; yeh developers ko bina source dekhe bhi correct arguments pass karne deta hai aur stack-overflow bugs ko compile time par pakadta hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Basic C syntax       | Function header aur body ka structure samajhna zaroori hai |
| Variable scope       | Local copies banane ka logic samajhne ke liye             |
| Compilation pipeline | Declaration vs definition ka farq tabhi clear hota hai jab aap preprocessing aur linking steps jaante ho |
| Pointer basics       | Call-by-value aur call-by-reference ka contrast samajhne ke liye |

Agar upar wale concepts missing hain to pehle unhe revise karo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Separate announcement from implementation
C compiler ko ek function call dekhne se pehle uske naam, return type aur parameters pata hone chahiye. Isliye hum pehle signature announce karte hain bina body ke.  
Example: `int max(int a, int b);` ek declaration hai.  
Formal statement:  
$$ \text{declaration} ::= \text{type-specifier declarator } \texttt{;} $$  
> [!WARNING] Agar declaration galat ho (parameter count mismatch) to compiler call site par wrong code generate kar sakta hai jo runtime par crash karega.

### Step 2 — Definition supplies the executable body
Declaration ke baad hum body dete hain jo actual instructions contain karti hai.  
Example:  
```c
int max(int a, int b) { return a > b ? a : b; }
```  
Yeh definition hai kyunki isme compound-statement hai.  
Formal:  
$$ \text{definition} ::= \text{declaration} \text{ compound-statement} $$

### Step 3 — Prototype is just a declaration placed before use
Jab declaration function definition se pehle hoti hai to usey prototype kehte hain. Yeh forward reference allow karta hai.  
Formal prototype example:  
```c
double sqrt(double x);   /* prototype */
```

### Step 4 — Call-by-value copies the argument
Function call par har argument ki copy banayi jaati hai aur woh copy parameter variable mein store hoti hai.  
Example:  
```c
void inc(int x) { x = x + 1; }
int main() { int n = 5; inc(n); /* n remains 5 */ }
```  
Formal semantics: parameter binding is  
$$ \text{param}_i \leftarrow \text{value}(\text{arg}_i) $$

### Step 5 — Consequence for mutability
Call-by-value ki wajah se function andar kiye gaye changes caller ko visible nahi hote. Agar aap original value badalna chahte ho to pointer pass karna padta hai.

### Step 6 — Linkage rules tie declaration and definition
Agar ek hi naam ki multiple declarations hon to woh compatible honi chahiye; definition sirf ek jagah honi chahiye (ODR).  
Textbook rule: “All declarations of the same function must be compatible.”

### Step 7 — Compile-time checking enabled by prototype
Prototype hone se compiler har call site par argument count aur types verify kar sakta hai, jo bina prototype ke possible nahi.

## 5. Worked examples — har step show karo

**Example 1 — Minimal prototype before definition**  
*Given:* A program that calls `square` before its definition.  
*Find:* Correct way to compile without error.  
Step 1: Write prototype above `main`.  
```c
int square(int);
int main(void) { return square(4); }
int square(int x) { return x*x; }
```  
*Why*: Prototype ne compiler ko signature bata diya pehle.  
**Final answer**  
Program compiles cleanly aur 16 return karta hai.

**Example 2 — Missing prototype causes implicit-int warning**  
*Given:* Call without any declaration.  
*Find:* What compiler does.  
Step 1: Remove prototype.  
Compiler assumes `int square()` (implicit int, K&R style).  
*Why*: Old C rule ab bhi default hai kuch compilers mein.  
**Final answer**  
Possible type mismatch warning aur wrong code generation.

**Example 3 — Call-by-value leaves caller unchanged**  
*Given:* `void swap(int a, int b) { int t = a; a = b; b = t; }` aur call `swap(x, y)`.  
*Find:* Values of x and y after call.  
Step 1: Arguments copied into a and b.  
Step 2: a aur b swap hue, x aur y nahi.  
*Why*: Copies independent hain.  
**Final answer**  
x aur y unchanged rahte hain.

**Example 4 — Combining prototype with call-by-value struct**  
*Given:*  
```c
struct Point { int x, y; };
void move(struct Point p, int dx);
```
*Find:* Effect on caller’s struct.  
Step 1: Entire struct copied on call.  
Step 2: Inside move, p.x += dx sirf local copy par hota hai.  
*Why*: Call-by-value copies whole aggregate.  
**Final answer**  
Caller’s original Point object same rehta hai.

*Reflection*: Yeh examples isliye tricky hain kyunki log aksar sochte hain ki function andar badla hua value bahar bhi dikhega; C ka call-by-value rule us illusion ko todta hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting semicolon after prototype | Students treat it like function header      | Har prototype ke end mein `;` lagana yaad rakho |
| Assuming call-by-value mutates caller | Confusion with other languages              | Har parameter ke liye “copy” word socho      |
| Mismatched prototype vs definition | Parameter names ya types alag likhna        | Copy-paste ya header file use karo           |
| Implicit declaration warning ignored | Old compilers still allow it                | `-Wall -Werror` flags hamesha on rakho       |
| Passing large structs by value    | Performance cost hidden                     | Pointer ya `const` reference pattern seekho  |
| Multiple conflicting prototypes   | Different headers mein alag signature       | Single authoritative header file rakho       |
| Returning address of local variable | Call-by-value mindset se related            | Stack variable ka address return mat karo    |

## 7. The textbook-precise statement
Kernighan and Ritchie, *The C Programming Language*, 2e, §4.2:  
“A function declaration specifies the name, return type, and parameter types of a function. A function definition additionally supplies the body. All declarations of a function must be compatible. Function arguments are passed by value: each argument expression is evaluated and its value is assigned to the corresponding parameter before execution of the function body begins.”

## 8. Visual — diagram or schematic
```text
Caller stack frame          Callee stack frame
+------------------+        +------------------+
| int n = 5;       |   copy | int x = 5;       |
| call inc(n)      |------->| x = x + 1;       |
+------------------+        +------------------+
(original n untouched)
```

## 9. The memory technique
1. **The hook** — Socho ek function ek “contract form” (prototype) bhejta hai pehle, phir baad mein “full report” (definition) deta hai; call-by-value ek photocopy bhejta hai, asli document nahi.
2. **What to overlearn** — Prototype ends with `;`, definition does not; every argument is copied exactly once.
3. **Spaced-repetition schedule** — Review 1 din, 3 din, 7 din, 16 din, 35 din ke baad.
4. **First-principles fallback** — Agar rule bhool jaaye to yaad karo: C compiler ko call se pehle signature chahiye aur har value copy hoti hai kyunki stack frame alag banta hai.

## 10. What this unlocks
Yeh concept aapko header files, separate compilation, aur pointer-based call-by-reference patterns samajhne ke liye taiyar karta hai.  
- Next: Pointers as function parameters  
- Next: Header guards aur multiple inclusion  
- Next: Inline functions aur linkage specifiers  
- Next: Variadic functions (`stdarg.h`)

## 11. Self-check — five questions, no answers
1. Ek function declaration aur definition mein exactly kya farq hota hai ek line mein likho.  
2. Neeche diye code mein kaunsi line prototype hai aur kyun zaroori hai?  
3. Call-by-value mein agar struct 1 KB ka ho to kitni copying hoti hai?  
4. Agar aap prototype mein `int foo(int)` likho aur definition mein `int foo(float)` to kya hoga?  
5. Ek aisa scenario likho jahaan call-by-value galat result de aur usko pointer se kaise theek karoge.