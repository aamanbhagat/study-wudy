## 1. The one-sentence answer
**Instance methods operate on individual objects using `self`, class methods operate on the class itself using `cls` via `@classmethod`, and static methods are plain functions attached to a class via `@staticmethod` that need neither the object nor the class.**

Instance methods are the default in Python classes. Jab aap koi method likhte ho aur usme pehla parameter `self` hota hai, toh woh instance method ban jaata hai. Iska matlab yeh hai ki har object apne alag state ke saath us method ko call kar sakta hai. Class methods mein `@classmethod` decorator lagta hai aur pehla parameter `cls` hota hai, jo class ko represent karta hai, na ki kisi object ko. Static methods mein `@staticmethod` decorator lagta hai aur koi special first parameter nahi hota; yeh sirf code ko logically group karne ke liye class ke andar rakha jaata hai.

Yeh teen tarike methods ko attach karne ke hain kyunki Python mein har cheez object hai, lekin kabhi-kabhi aapko object ke data ki zaroorat nahi padti. Instance methods object-specific behaviour ke liye hain, class methods class-level changes ya alternative constructors ke liye, aur static methods utility functions ke liye jo class ke namespace mein rehte hain.

> [!NOTE]
> Sabse badi aha yeh hai ki `@classmethod` aur `@staticmethod` dono hi inheritance mein alag-alag behave karte hain: class methods subclass ko `cls` ke roop mein pass karte hain, jabki static methods bilkul normal functions ki tarah rehte hain.

## 2. Why this matters — concrete and current
Django ORM mein `objects.create()` ek `@classmethod` hai jo `cls` use karke model class ke hisaab se instance banata hai; isliye har subclass apna custom manager inherit kar sakta hai bina code duplicate kiye.

PyTorch ke `nn.Module` mein `@staticmethod` methods jaise `is_scripting()` utility checks ke liye use hote hain jo GPU/CPU device detection mein madad karte hain bina kisi model instance ki zaroorat ke.

Pandas `DataFrame` class mein `@classmethod` jaise `from_dict` alternative constructors provide karta hai jo raw data se directly DataFrame bana sakta hai, aur yeh pattern large-scale data pipelines (jaise Spark ke PySpark bindings) mein bhi dikhta hai.

TensorFlow ke `tf.keras.Model` subclassing API mein instance methods `call()` aur `train_step()` object state maintain karte hain, jabki `@staticmethod` methods jaise loss calculation helpers ko logically group karte hain taaki code readable rahe.

Semiconductor design tools (jaise Synopsys ke Python APIs) mein class methods kaafi use hote hain kyunki wafer simulation classes ko dynamically configure karna padta hai bina har baar naya object banaye.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Python functions     | Methods are just functions attached to classes            |
| `self` parameter     | Distinguishes instance methods from the other two types   |
| Decorators           | `@classmethod` and `@staticmethod` are implemented as decorators |
| Class vs object      | Understanding that `cls` points to the class, not an instance |

Agar upar wale concepts clear nahi hain toh pehle basic Python functions aur classes padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Every method is a function first
Python mein class ke andar likha gaya function technically ek normal function hi hota hai. Jab aap usse call karte ho toh Python automatically pehla argument inject karta hai.

Example: `class Dog: def bark(self): print("woof")` mein `bark` ek function hai jo `self` maangta hai. Jab `d = Dog(); d.bark()` karte ho toh `Dog.bark(d)` hota hai internally.

Formal statement:  
$$ \text{method}(obj, \dots) \equiv \text{function}(obj, \dots) $$

> [!WARNING]
> Agar aap `self` ko bhool jaayein toh TypeError aayega kyunki Python automatically argument pass karega lekin function usko accept nahi karega.

### Step 2 — Instance methods receive the concrete object
Default behaviour yeh hai ki pehla parameter object ko refer karta hai. Iska naam `self` convention hai lekin koi bhi naam chal sakta hai.

Example: `def change_name(self, new_name): self.name = new_name` sirf us particular dog ka naam badalta hai.

Formal:  
$$ m_{instance}(self, \dots) \quad \text{where } self \in \text{instances of class} $$

### Step 3 — `@classmethod` receives the class instead
`@classmethod` decorator function ko wrap karke pehla argument class banata hai. Iska naam `cls` hota hai.

Example: ` @classmethod def from_breed(cls, breed): return cls(breed=breed) ` ek factory method hai jo class ko use karke naya object banata hai.

Formal:  
$$ m_{class}(cls, \dots) \quad \text{where } cls \equiv \text{the class object itself} $$

> [!WARNING]
> Agar aap `@classmethod` ke bina `cls` use karne ki koshish karoge toh `cls` ek normal variable ban jaayega aur inheritance mein galat class pass hogi.

### Step 4 — `@staticmethod` receives nothing special
Yeh decorator sirf method ko class namespace mein daalta hai lekin koi implicit argument nahi deta.

Example: ` @staticmethod def is_valid_age(age): return 0 < age < 30 ` koi bhi object ya class ke bina call ho sakta hai.

Formal:  
$$ m_{static}(\dots) \quad \text{no implicit first argument} $$

### Step 5 — Inheritance changes behaviour only for class methods
Jab subclass `@classmethod` ko call karta hai toh `cls` subclass hota hai, lekin static method mein aisa nahi hota.

Formal statement (textbook style later): class methods follow the MRO for the `cls` argument.

## 5. Worked examples — har step show karo

**Example 1 — Simple instance method**  
*Given:* `class Counter: def __init__(self): self.count = 0` aur `def increment(self): self.count += 1`  
*Find:* `c = Counter(); c.increment(); print(c.count)`  
Step 1: object `c` banao.  
Step 2: `increment` call karo — Python `self` mein `c` pass karta hai.  
Step 3: `self.count` update hota hai.  
**Final answer**  
`1`  
*Reflection:* Yeh example simple hai lekin yahin se pata chalta hai ki har object ka apna state rehta hai.

**Example 2 — Class method as alternative constructor**  
*Given:* `class Person: def __init__(self, name): self.name = name`  
`@classmethod def from_string(cls, s): return cls(s.split()[0])`  
*Find:* `p = Person.from_string("Ravi Kumar")`  
Step 1: `from_string` `cls` ko `Person` class ke roop mein receive karta hai.  
Step 2: `cls(...)` call hota hai jo `__init__` ko trigger karta hai.  
**Final answer**  
`p.name == "Ravi"`  
*Reflection:* Factory pattern ka basic version hai jo subclassing ke time kaam aata hai.

**Example 3 — Static method for validation**  
*Given:* `@staticmethod def is_adult(age): return age >= 18`  
*Find:* `Person.is_adult(20)`  
Step 1: koi `self` ya `cls` nahi jaata.  
Step 2: function normal tarah execute hota hai.  
**Final answer**  
`True`  
*Reflection:* Code logically class ke saath rehta hai lekin state ki zaroorat nahi.

**Example 4 — Inheritance with class vs static**  
*Given:* `class A: @classmethod def show_cls(cls): print(cls.__name__)` aur `@staticmethod def show_static(): print("static")`  
`class B(A): pass`  
*Find:* `B.show_cls()` aur `B.show_static()`  
Step 1: class method `cls` ko `B` deta hai.  
Step 2: static method mein koi farak nahi.  
**Final answer**  
`B` aur `static`  
*Reflection:* Yeh farak inheritance ke time important hota hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using `self` inside `@staticmethod` | Student sochta hai har method mein `self` chahiye | Decorator dekh lo pehle, phir parameter likho |
| Forgetting `@classmethod`         | Normal method samajh ke `cls` likh dete hain | Hamesha decorator lagana yaad rakho          |
| Calling class method on instance  | Lagta hai instance call karne se `self` milega | `cls` hi milega, instance nahi                |
| Modifying class variable in instance method without `cls` | Confusion between instance and class data   | Class data ke liye class method use karo     |
| Overusing static methods          | Sab kuch class ke andar daal dete hain      | Sirf tab use karo jab function class se related ho |

## 7. The textbook-precise statement
In Python, methods defined inside a class are descriptors. An instance method is a function whose first parameter is bound to the instance. A class method, created by the built-in `classmethod` type, binds its first parameter to the class. A static method, created by the built-in `staticmethod` type, receives no implicit first parameter.  

When looked up on a subclass, a class method receives the subclass as `cls`; a static method does not change. (Ramalho, *Fluent Python*, 2e, Chapter 9, “Decorators and descriptors”, pp. 312–318).

## 8. Visual — diagram or schematic
```text
Class Namespace
├── instance_method(self, ...)   → bound to object (receives self)
├── class_method(cls, ...)       → bound to class   (receives cls)
└── static_method(...)           → plain function   (receives nothing)
```

## 9. The memory technique
1. **The hook** — Imagine three doors: first door has a person (instance) standing, second door has the blueprint (class) standing, third door is empty.  
2. **What to overlearn** — `@classmethod` → `cls`, `@staticmethod` → nothing, default → `self`.  
3. **Spaced-repetition schedule** — Review 1 din baad, 3 din, 7 din, 16 din, 35 din.  
4. **First-principles fallback** — Agar bhool jaaye toh socho “kya mujhe object chahiye? Class chahiye? Kuch nahi chahiye?” aur uske hisaab se decorator decide karo.

## 10. What this unlocks
Yeh topic aapko advanced OOP patterns jaise factory methods, registry patterns aur mixin classes samajhne mein madad karega.  

- Next: Abstract base classes (`abc.ABC`)  
- Polymorphic constructors  
- Metaclasses jo class creation ko control karte hain  
- Descriptor protocol jo `@property` aur methods ke peeche kaam karta hai

## 11. Self-check — five questions, no answers
1. Ek class method ko bina decorator ke likhne par kya hota hai?  
2. Agar subclass `@classmethod` ko override kare toh `cls` kis class ko point karega?  
3. Static method mein `self` use karne ki koshish karne par kaunsa error aata hai?  
4. Ek utility function jo kisi bhi class state ko touch nahi karta, usko static ya class method mein se kaunsa banana sahi hai?  
5. `Person.from_json(json_str)` method likhna hai jo naya Person object return kare — kaunsa decorator use karoge aur kyun?