## 1. The one-sentence answer
**A variable in Python is a named reference that binds an identifier to an object in memory, created through assignment and changeable through reassignment, while obeying strict naming rules.**

Aap ek variable ko ek label ki tarah soch sakte ho jo kisi value ko memory mein track karta hai. Jab aap `x = 5` likhte ho, Python ek object `5` banata hai aur usko naam `x` se connect kar deta hai. Reassignment ka matlab hai ki wohi naam ab kisi aur object ko point kar sakta hai bina purane object ko turant delete kiye.

Yeh mechanism Python ko dynamic banata hai, lekin iske liye kuch strict rules hain taaki interpreter confusion na kare. Naming rules ensure karte hain ki identifier valid ho, assignment `=` operator se hota hai, aur reassignment sirf naam ko naya object deta hai.

> [!NOTE]
> Sabse badi aha yeh hai ki variable khud value nahi rakhta — woh sirf ek reference hai, isliye ek hi naam multiple baar alag-alag values ko point kar sakta hai bina naye variable declare kiye.

## 2. Why this matters — concrete and current
In machine learning training loops at companies like OpenAI, variables hold model weights that get reassigned after every gradient update step inside PyTorch or TensorFlow, allowing a single name like `weights` to represent evolving parameters across millions of iterations.

NASA’s Mars Perseverance rover flight software uses Python-based ground analysis scripts where variables store sensor readings that are reassigned in real time as new telemetry packets arrive, ensuring the same identifier always reflects the latest state without creating thousands of temporary names.

In semiconductor design verification at Intel, Python scripts assign pin voltages and timing values to variables that are later reassigned during Monte Carlo simulations, letting engineers reuse the same variable names across thousands of test vectors without namespace pollution.

Modern web frameworks like FastAPI reassign request-scoped variables inside async handlers when processing concurrent API calls, enabling efficient memory use because the same identifier can safely point to new request objects after each handler finishes.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Object               | Python variables reference objects, not raw memory slots  |
| Identifier           | Must follow lexical rules to be recognised by the parser  |
| Assignment operator  | `=` creates the binding between name and object           |

Agar aap in teeno concepts ko pehle se nahi samajhte, toh Python ke basic execution model ko ek baar padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — A variable is only a name, not a container
Aap intuitively soch sakte ho ki variable ek dabba hai, lekin Python mein variable ek naam hai jo ek object ko point karta hai.  
Example: `age = 21` mein `age` naam hai aur `21` ek integer object hai.  
Formal statement:  
$$ \text{name} \mapsto \text{object reference} $$  
> [!WARNING]
> Agar aap variable ko real container samajhoge toh later reference semantics aur mutable objects samajhne mein dikkat hogi.

### Step 2 — Assignment creates the binding
Assignment operator `=` naam ko object se jodta hai.  
Example: `count = 0` ek naya reference banata hai.  
Formal:  
$$ \text{identifier} = \text{expression} \quad \text{(evaluates right-hand side first)} $$  
> [!WARNING]
> Left-hand side par expression nahi ho sakta; sirf valid identifier allowed hai.

### Step 3 — Naming rules enforce lexical validity
Python identifiers letters, digits aur underscore se ban sakte hain, lekin digit se shuru nahi ho sakte aur reserved words nahi ho sakte.  
Example: `user_name` valid hai, `2nd_place` invalid hai.  
Formal rule set:  
$$ \text{identifier} ::= (\text{letter}|\_)(\text{letter}|\text{digit}|\_)* $$  
> [!WARNING]
> Case-sensitive hone ki wajah se `Name` aur `name` alag variables maane jaate hain.

### Step 4 — Reassignment changes the reference
Reassignment se wohi naam ab dusre object ko point karne lagta hai.  
Example: `x = 5` ke baad `x = "hello"` karne par `x` ab string object ko refer karta hai.  
Formal:  
$$ \text{name} \leftarrow \text{new object reference} $$  
> [!WARNING]
> Purana object turant delete nahi hota; garbage collection decide karti hai kab delete hoga.

### Step 5 — Multiple names can reference the same object
Ek hi object ke multiple naam ho sakte hain.  
Example: `a = [1,2]` aur `b = a` ke baad dono `a` aur `b` same list ko point karte hain.  
Formal:  
$$ \text{name}_1 \equiv \text{name}_2 \implies \text{same object id} $$  
> [!WARNING]
> Mutable objects mein changes dono names ke through dikhte hain.

### Step 6 — The binding is stored in a namespace
Python har scope mein ek dictionary maintain karta hai jisme naam-to-reference mappings rehti hain.  
Formal textbook view: variable lookup first local, then enclosing, then global, then built-in namespaces mein hota hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple assignment**  
*Given:* `score = 100`  
*Find:* variable ka current reference.  
Step 1: Right-hand side evaluate hota hai → integer object 100.  
Step 2: `score` naam us object se bind hota hai.  
**Final answer**  
`score` ab 100 ke object ko refer karta hai.  
*Reflection:* Yeh sabse basic case hai; yahan koi reassignment nahi hui.

**Example 2 — Reassignment**  
*Given:* `x = 10` phir `x = x + 5`  
*Find:* final value of `x`.  
Step 1: `x = 10` → reference ban gaya.  
Step 2: Right-hand side `x + 5` evaluate → 15.  
Step 3: `x` ab 15 ko refer karta hai.  
**Final answer**  
`x` equals 15.  
*Reflection:* Reassignment purane reference ko replace karti hai, value ko nahi badalti.

**Example 3 — Invalid naming**  
*Given:* `2fast = 3`  
*Find:* kya yeh allowed hai.  
Step 1: Parser pehla character check karta hai.  
Step 2: Digit se shuru hone ki wajah se SyntaxError.  
**Final answer**  
Invalid identifier.  
*Reflection:* Naming rules compile-time par enforce hoti hain.

**Example 4 — Shared reference**  
*Given:* `lst = [1,2]` aur `alias = lst` phir `alias.append(3)`  
*Find:* `lst` ki state.  
Step 1: Dono names same list object ko point karte hain.  
Step 2: `append` mutation karta hai.  
Step 3: `lst` ab `[1,2,3]` dikhata hai.  
**Final answer**  
`lst` also becomes `[1,2,3]`.  
*Reflection:* Yeh wahi case hai jahan variable-as-container wali galatfahmi sabse zyada nuksaan karti hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using keyword as variable   | Student forgets reserved words list         | Always check `keyword.kwlist` before naming  |
| Thinking `=` is equality    | School math background                      | Read `=` as “binds to” not “equals”          |
| Reusing names in same scope without intent | Forgetting previous binding still exists | Use meaningful new names or `del` explicitly |
| Starting name with digit    | Copy-paste from other languages             | Run code immediately; Python gives clear error |
| Case mismatch (`Total` vs `total`) | Case-sensitive language                     | Pick one casing style and stick to it        |
| Forgetting that lists are mutable | Variable feels like a box                   | Draw reference arrows on paper for first 20 examples |
| Shadowing built-in names    | Using `list`, `str` as variable names       | Never shadow built-ins; use `_list` if needed |

## 7. The textbook-precise statement
An identifier is a lexical token that names an object. In Python, assignment statements of the form `target = expression` evaluate the expression and bind the resulting object to the target identifier in the current namespace (van Rossum et al., *Python Language Reference*, 3.2). Reassignment replaces the binding; the original object’s lifetime is governed by reference counting. Valid identifiers match the regular expression `[a-zA-Z_][a-zA-Z0-9_]*` and must not be keywords. The binding is stored in a `dict` inside the frame object and looked up according to the LEGB rule.

## 8. Visual — diagram or schematic
```
Memory
+-------------+
| id(100)     | <-- value object
+-------------+
      ^
      | reference
+-------------+
| name: "x"   |   <-- variable binding in namespace
+-------------+
```
Reassignment `x = 200` creates a new arrow from `"x"` to a fresh integer object 200.

## 9. The memory technique
1. **The hook** — Imagine a luggage tag with a name written on it; the tag can be moved to any suitcase (object) at any time.
2. **What to overlearn** — Valid identifier regex, the fact that `=` creates a reference, and that only the name moves on reassignment.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Agar rules bhool jaayein toh ek chhota program likho aur usko `dis` module se decompile karke dekho ki bytecode mein `STORE_NAME` instruction kaise kaam karta hai.

## 10. What this unlocks
Yeh concept aapko functions, classes, aur modules ke namespace samajhne ke liye taiyar karta hai.  
- Next: function scope and `global`/`nonlocal` statements  
- Next: mutable default arguments trap in function definitions  
- Next: class attributes versus instance attributes  
- Next: dictionary key naming rules in data structures

## 11. Self-check — five questions, no answers
1. Kya `my-var = 5` valid Python code hai? Kyun ya kyun nahi?
2. `a = 1; b = a; a = 2` ke baad `b` ki value kya hogi aur kyun?
3. Ek list ko do variables se point karne par mutation ka kya asar padta hai?
4. Python mein variable ka type kab decide hota hai — assignment ke time ya runtime par?
5. Agar aap `id(x)` call karte ho pehle aur baad mein `x = x + 1` karte ho, toh `id(x)` change hota hai ya nahi? Explain karo.