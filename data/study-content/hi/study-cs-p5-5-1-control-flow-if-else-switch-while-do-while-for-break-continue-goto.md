## 1. The one-sentence answer
**Control flow statements in C decide the order in which statements execute by letting you branch on conditions or repeat blocks of code.**

Aap already jaante ho ki C mein har line normally top-to-bottom chalta hai. Control flow statements us sequence ko todte hain. `if/else` aur `switch` aapko ek baar decide karne dete hain ki kaunsa block chalega. `while`, `do-while` aur `for` ek block ko tab tak repeat karte hain jab tak koi condition true rahe. `break`, `continue` aur `goto` us repeat ya branch ko beech mein rokne ya chhodne ka tareeka dete hain.

In sab ka core idea ek hi hai: program ka execution path data aur conditions par depend karta hai. Isse aap static code ko dynamic bana paate ho.

> [!NOTE]
> Sabse badi aha yeh hai ki har control-flow construct ultimately ek ya do machine-level jumps (conditional ya unconditional) mein translate hota hai; baaki sab syntactic sugar hai.

## 2. Why this matters — concrete and current
Linux kernel ke scheduler mein `for` loops aur `if` conditions har CPU cycle par decide karte hain kaunsa process run hoga; ek galat `break` statement pura system hang kar sakta hai.

Arduino aur STM32 firmware mein `while(1)` loop ke andar `switch` statements sensor data ko handle karte hain; yeh pattern har modern embedded motor controller mein dikhta hai.

Game engines jaise Unity’s internal C++ layer (jo C-style control flow use karta hai) `do-while` loops se fixed-timestep physics simulate karte hain taaki frame rate independent physics mile.

Compilers jaise GCC mein peephole optimiser `goto` statements ko strategically insert karta hai taaki branch prediction better ho; yeh technique 2023 ke LLVM papers mein bhi discuss hui hai.

Database engines (SQLite) ke B-tree traversal code mein `continue` statements leaf nodes ko efficiently skip karte hain, jo billions of rows par query speed decide karta hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| C expressions        | Har `if` aur loop condition ek expression hota hai        |
| Blocks & scoping     | `{ }` ke andar variables ka lifetime control flow se judta hai |
| Relational & logical operators | `==`, `&&`, `||` bina inke conditions likhna mushkil hai |

Agar upar ke teen concepts clear nahi hain to pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Branching from a single condition
Aap ek condition check karte ho aur uske hisaab se alag code chalate ho.  
Example: `if (x > 0) printf("positive");`  
Formal statement:  
$$
\text{if } (E) \ S_1 \ [\text{else } S_2]
$$
> [!WARNING]
> Expression `E` ko hamesha scalar type (integer ya pointer) mein evaluate hona chahiye; floating-point comparison mein round-off error se galat branch ho sakta hai.

### Step 2 — Multi-way branch with switch
Jab ek variable ke multiple discrete values par alag-alag action chahiye to `switch` use karo.  
Example: `switch (day) { case 1: ... }`  
Formal rule: control `case` label par jump karta hai jahaan expression match kare; agar koi match na ho to `default` par jaata hai.

### Step 3 — Entry-controlled repetition (while)
Condition pehle check hoti hai, phir body chalti hai.  
$$
\text{while } (E) \ S
$$
Agar pehli baar hi `E` false ho to body ek baar bhi nahi chalegi.

### Step 4 — Exit-controlled repetition (do-while)
Body pehle chalti hai, condition baad mein check hoti hai.  
$$
\text{do } S \ \text{while } (E);
$$
Yeh guarantee karta hai ki body kam-se-kam ek baar chalegi.

### Step 5 — Compact iteration (for)
Initialisation, condition aur update ek jagah likhne ka syntactic sugar.  
$$
\text{for } (E_1; E_2; E_3) \ S \equiv E_1; \ \text{while } (E_2) \{ S; E_3; \}
$$

### Step 6 — Early exit and skip (break/continue)
`break` loop ya switch se bahar nikal jaata hai. `continue` current iteration skip karke next check par le jaata hai.

### Step 7 — Unrestricted jump (goto)
Kisi bhi labelled statement par seedha jump. Modern C mein iska use sirf error-handling aur state-machine cleanup mein hota hai.

### Step 8 — Textbook-grade statement
Kernighan & Ritchie, *The C Programming Language*, 2e, §3.1–3.8: “The control flow of a program is determined by the sequencing of statements, selection (`if`, `switch`), iteration (`while`, `for`, `do`), and unrestricted jumps (`goto`, `break`, `continue`).”

## 5. Worked examples — har step show karo

**Example 1 — Simple if-else**  
*Given:* `int x = -3;`  
*Find:* print sign.  
```
if (x > 0)
    printf("positive");
else
    printf("non-positive");
```
*Why:* Relational operator `>` scalar value deta hai jo `if` expect karta hai.  
**Final answer:** prints “non-positive”

*Reflection:* Yeh example isliye simple hai kyunki single condition thi; nesting badhane par readability girti hai.

**Example 2 — Switch with fallthrough**  
*Given:* `int month = 2;`  
*Find:* days in month.  
```
switch (month) {
case 2: days = 28; break;
case 4: case 6: case 9: case 11: days = 30; break;
default: days = 31;
}
```
*Why:* `break` fallthrough rokta hai.  
**Final answer:** days = 28

*Reflection:* Missing `break` ek classic bug hai jo multiple cases execute kar deta hai.

**Example 3 — for loop with continue**  
*Given:* sum of even numbers 1 se 10 tak.  
```
int sum = 0;
for (int i = 1; i <= 10; i++) {
    if (i % 2) continue;
    sum += i;
}
```
*Why:* `continue` odd numbers skip karta hai.  
**Final answer:** sum = 30

*Reflection:* `continue` se code cleaner rehta hai lekin deeply nested loops mein samajhna mushkil ho sakta hai.

**Example 4 — do-while with break**  
*Given:* read numbers until negative ya zero mile.  
```
int n;
do {
    scanf("%d", &n);
    if (n <= 0) break;
    printf("%d\n", n*n);
} while (1);
```
*Why:* `do-while(1)` infinite loop banata hai, `break` se exit.  
**Final answer:** loop exits on first non-positive input

*Reflection:* Yeh pattern menu-driven programs mein common hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| Missing `break` in switch   | Fallthrough by default                  | Har case ke end mein `break` likho           |
| `=` instead of `==`         | Assignment returns non-zero value       | Compiler warning `-Wall` on rakho            |
| Infinite `while(1)` without exit | Condition kabhi false nahi hoti     | Hamesha `break` ya `return` ka plan rakho    |
| `for` loop variable reuse   | Scope rules C89 mein alag the         | C99+ mein loop variable declare karo         |
| `goto` across variable init | Jump variable declaration skip kar sakta hai | Sirf error labels ke liye goto use karo |
| `do-while` semicolon galti  | Missing semicolon syntax error deta hai | Hamesha `do { } while (E);` likho            |
| Floating-point loop condition | Round-off se kabhi false nahi hota | Integer counter ya epsilon check use karo |

## 7. The textbook-precise statement
Kernighan and Ritchie, *The C Programming Language*, 2nd edition, §3.1–3.8: “Selection is achieved with `if` and `switch`; iteration with `while`, `for`, and `do`; jumps with `break`, `continue`, and `goto`. The expression in `if`, `while`, `for`, and `do` must have scalar type. A `switch` statement causes control to jump to the `case` label whose constant-expression equals the controlling expression, or to `default` if no match exists. Execution falls through to the next case unless a `break` is encountered.”

## 8. Visual — diagram or schematic
```
          [start]
             |
          if (cond) ---- false ----> [else block] --+
             | true                                 |
             v                                      |
        [if block]                                  |
             |                                      |
             +------------------> [next statement] <+
```

## 9. The memory technique
1. **The hook** — Socho ek traffic signal: `if` red-light par rukta hai, `while` green hone tak wait karta hai, `for` har signal par ek step aage badhta hai.
2. **What to overlearn** — `for (init; cond; update)` ka expansion `while` mein, aur `switch` mein har case ke saath `break` ki zaroorat.
3. **Spaced-repetition schedule** — 1 din baad ek chhota program likho, 3 din baad switch-fallthrough bug fix karo, 7 din baad nested loop with `continue`, 16 din baad `goto` cleanup pattern, 35 din baad purana code review karo.
4. **First-principles fallback** — Bhool jaaye to yaad karo ki har construct ek ya do conditional jumps (`JNZ`, `JMP`) mein compile hota hai.

## 10. What this unlocks
Control flow mastery ke baad aap functions, recursion, data-structure traversal aur algorithms likh sakte ho.  
- Function calls ke andar loops  
- Recursive tree traversal  
- State machines (`switch` + `enum`)  
- Algorithm analysis (loop invariants)

## 11. Self-check — five questions, no answers
1. Ek `for` loop ko `while` loop mein convert karo bina semantics badle.  
2. `switch` mein `default` ke baad `break` ki zaroorat kyun nahi hoti?  
3. `do-while` aur `while` mein se kaunsa menu input ke liye better hai aur kyun?  
4. Neeche diye code mein kitni baar “hi” print hoga?  
   ```c
   for (int i = 0; i < 5; i++) {
       if (i == 3) continue;
       printf("hi");
   }
   ```  
5. `goto` use kiye bina ek deeply nested loop se bahar nikalne ka tareeka likho.