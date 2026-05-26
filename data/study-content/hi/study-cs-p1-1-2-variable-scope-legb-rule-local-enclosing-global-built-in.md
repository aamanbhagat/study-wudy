## 1. The one-sentence answer
**The LEGB rule is Python’s fixed four-level lookup order for resolving any name: Local → Enclosing → Global → Built-in.**

Jab aap kisi variable ya function ka naam likhte ho, Python turant is sequence mein dhundta hai. Pehle current function ke andar dekhta hai (Local), phir us function ko wrap karne wale function ke andar (Enclosing), phir module level par (Global), aur last mein built-in names jaise `len` ya `print` (Built-in). Agar naam kisi bhi jagah nahi milta to `NameError` aata hai.

Yeh rule sirf read-time par naam dhundne ke liye hai. Assignment statements hamesha current scope mein naya naam create karte hain, jab tak aap `global` ya `nonlocal` keyword na use karo. Isliye ek hi naam alag-alag jagah par alag values hold kar sakta hai bina interference ke.

> [!NOTE]
> Sabse badi aha yeh hai ki Python mein scope static hai — code likhte waqt hi decide ho jaata hai kahan dhundna hai — runtime par nahi badalta.

## 2. Why this matters — concrete and current
FastAPI aur Django jaise web frameworks mein view functions aur dependency injectors LEGB ka faayda uthate hain taaki request-local variables safely alag rahein bina global state ko touch kiye.

PyTorch aur TensorFlow ke custom autograd functions mein nested training loops enclosing scope se hyperparameters uthate hain, jisse model configuration ek jagah clean rehti hai.

NumPy aur pandas ke internal Cython extensions global constants ko built-in level par rakh kar repeated name lookups ko avoid karte hain, jo large DataFrame operations mein performance deta hai.

CPython interpreter khud apne built-in functions ko C level par optimized scope tables mein store karta hai, isliye har Python program `len` ya `range` ko turant bina search ke use kar paata hai.

Jupyter notebooks mein cell-to-cell variable sharing global scope par depend karti hai, lekin functions ke andar LEGB ensure karta hai ki notebook-level variables accidentally overwrite na ho jaayein.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Function definition (`def`) | LEGB sirf functions ke andar meaningful hai               |
| Assignment vs reference     | Assignment hamesha local scope banata hai                 |
| Nested functions            | Enclosing scope tabhi exist karta hai jab functions nest ho |

Agar upar ke teen concepts clear nahi hain to pehle functions aur basic assignment padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Names live in namespaces
Python har naam ko ek dictionary jaisi structure mein store karta hai. Har function apna alag namespace banata hai.
```python
x = 10          # module namespace mein
def f():
    x = 20      # function namespace mein
```
Yeh do alag dictionaries hain. Formal statement: har scope ek mapping `name → object` maintain karta hai.

> [!WARNING]
> Agar aap sochte ho ki dono `x` ek hi hain, to aapko galat value mil sakti hai jab function call ho.

### Step 2 — Lookup follows a fixed sequence
Jab naam read karte ho, Python sirf LEGB order mein dekhta hai aur pehla milne wala value return karta hai.
$$ \text{Lookup}(name) = \text{first match in } L \to E \to G \to B $$

### Step 3 — Assignment creates local binding
Koi bhi assignment (`=`) bina `global` keyword ke current function ke local namespace mein naya entry banata hai.
```python
x = 5
def g():
    x = 7      # local x ban gaya, global nahi badla
```

> [!WARNING]
> Agar aap sochte ho ki yeh global `x` ko update karega, to aapko dono jagah alag values dikhengi aur debugging mushkil hogi.

### Step 4 — Enclosing scope sirf nested functions mein hota hai
Ek function ke andar define kiya gaya function enclosing scope access kar sakta hai.
```python
def outer():
    y = 3
    def inner():
        print(y)   # enclosing y milta hai
    inner()
```

### Step 5 — Built-in scope last fallback hai
Agar `len`, `int`, `print` jaise naam kisi bhi upar wale scope mein nahi milte, Python unhe `__builtins__` module se uthata hai.

### Step 6 — `global` aur `nonlocal` rules ko bypass karte hain
`global` keyword current scope ko global namespace se bind karta hai. `nonlocal` enclosing ko target karta hai. In dono ke bina assignment hamesha local banata hai.

### Step 7 — Textbook-grade rule
A name lookup resolves to the nearest binding in the statically determined LEGB chain; assignment without declaration keywords always creates a new local binding in the current function scope.

## 5. Worked examples — har step show karo

**Example 1 — Simple local shadows global**
*Given:*  
```python
x = "global"
def test():
    x = "local"
    return x
```
*Find:* `test()` ka return value.  
Step 1: `test()` call hota hai → new local namespace banta hai.  
Step 2: `x = "local"` assignment local namespace mein entry banata hai.  
Step 3: `return x` local lookup karta hai aur turant `"local"` mil jaata hai.  
**"local"**  
*Reflection:* Yeh example isliye simple hai kyunki koi nesting nahi thi; sirf L vs G clash dikhata hai.

**Example 2 — Enclosing scope read**
*Given:*  
```python
def outer():
    msg = "enclosing"
    def inner():
        return msg
    return inner()
```
*Find:* `outer()` ka return value.  
Step 1: `outer` call → `msg` enclosing namespace mein.  
Step 2: `inner` call → local namespace khali, E level par `msg` milta hai.  
Step 3: Value return hoti hai bina kisi assignment ke.  
**"enclosing"**  
*Reflection:* Read operations enclosing tak ja sakte hain, lekin assignment nahi ja sakta bina `nonlocal` ke.

**Example 3 — Built-in fallback**
*Given:*  
```python
def calc():
    return len([1, 2, 3])
```
*Find:* `calc()` ka return value.  
Step 1: `len` naam kisi local ya global mein nahi.  
Step 2: Built-in namespace mein `len` milta hai.  
Step 3: Function call hota hai aur 3 return hota hai.  
**3**  
*Reflection:* Built-in names tab kaam aate hain jab aap accidentally koi built-in naam overwrite na kar do.

**Example 4 — nonlocal assignment**
*Given:*  
```python
def outer():
    count = 0
    def inner():
        nonlocal count
        count += 1
        return count
    return inner()
```
*Find:* `outer()` ka return value.  
Step 1: `nonlocal count` inner ko enclosing `count` se bind karta hai.  
Step 2: `count += 1` enclosing namespace mein update karta hai.  
Step 3: Updated value return hoti hai.  
**1**  
*Reflection:* `nonlocal` ke bina yeh code `UnboundLocalError` deta kyunki assignment local scope create kar deta.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting `global` before assignment | Student sochta hai global value update hoga | Assignment se pehle `global` likho           |
| Using same name in nested function without `nonlocal` | Assignment local bana deta hai              | `nonlocal` ya alag naam use karo             |
| Overwriting built-in name         | `list = []` jaise code likh dete hain       | Built-in names ko variable mat banao         |
| Expecting runtime scope change    | Dynamic languages ki aadat                  | Yaad rakho Python static LEGB follow karta hai |
| Reading before assignment in function | UnboundLocalError aata hai                  | Variable ko pehle assign karo ya parameter banao |
| Lambda inside loop capturing wrong variable | Late binding + enclosing scope              | Default argument trick ya separate function  |
| Assuming class body follows LEGB like functions | Class body alag namespace hota hai          | Class attributes ke liye `self` ya class name use karo |

## 7. The textbook-precise statement
In Python, a simple name lookup follows the LEGB rule: the interpreter searches for the name first in the local scope, then in the enclosing function scopes, then in the global (module) scope, and finally in the built-in scope. An assignment statement binds a name in the current local scope unless the name is declared global or nonlocal. This rule is stated formally in the Python Language Reference, Version 3.12, §4.2.2 “Resolution of names” and is implemented in CPython’s `symtable` and `ceval` modules.

## 8. Visual — diagram or schematic
```text
Lookup order for name "x":

         ┌─────────────────────┐
         │ Built-in (B)        │   ← last: len, print, int...
         └──────────▲──────────┘
                    │
         ┌──────────┴──────────┐
         │ Global (G)          │   ← module-level names
         └──────────▲──────────┘
                    │
         ┌──────────┴──────────┐
         │ Enclosing (E)       │   ← outer function
         └──────────▲──────────┘
                    │
         ┌──────────┴──────────┐
         │ Local (L)           │   ← current function ← first
         └─────────────────────┘
```
Arrow direction shows search path; first match wins.

## 9. The memory technique

**The hook**  
Imagine four Russian nesting dolls labelled L-E-G-B. You open the smallest (Local) first; only if empty you open the next larger doll.

**What to overlearn**  
1. Assignment = local creation (unless `global`/`nonlocal`).  
2. Lookup order is always L→E→G→B.  
3. `nonlocal` and `global` are the only two keywords that change binding target.

**Spaced-repetition schedule**  
Review the four-step order after 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback**  
Agar rule bhool jaaye to socho: “Python ko kaunsa dictionary pehle check karni chahiye?” — current function ki dictionary sabse pehle, phir uske upar wali, aur aakhir mein built-in dictionary.

## 10. What this unlocks
LEGB samajhne ke baad aap closures, decorators, and factory functions comfortably likh sakte ho.

- Closures jo enclosing state ko capture karte hain  
- Decorators jo wrapper functions mein nonlocal variables maintain karte hain  
- Callback-based event loops (asyncio) jo lexical scoping par depend karte hain  
- Config-driven function generators jo global constants safely use karte hain  

## 11. Self-check — five questions, no answers
1. Neeche diye code mein `print(x)` kya output dega?  
   ```python
   x = 10
   def f():
       x = 20
       def g():
           print(x)
       g()
   f()
   ```

2. Agar aap `global x` hata do to kya error aayega?  
   ```python
   x = 5
   def inc():
       x += 1
   inc()
   ```

3. Ek lambda expression jo list comprehension ke andar hai, woh kis scope se variable uthayega?

4. `nonlocal` aur `global` dono ek saath ek hi naam par use kar sakte hain kya? Kyun ya kyun nahi?

5. Agar aap `len` naam ka apna function module level par define kar do, to kisi dusre function ke andar `len([1,2])` kis `len` ko call karega?