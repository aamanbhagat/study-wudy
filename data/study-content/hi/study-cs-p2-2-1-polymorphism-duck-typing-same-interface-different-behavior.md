## 1. The one-sentence answer
**Polymorphism through duck typing lets objects of unrelated classes respond to the same method calls with their own behaviour, as long as they share the same method names and signatures.**

Iska matlab yeh hai ki aapko inheritance ki zaroorat nahi padti. Agar do classes mein `fly()` aur `quack()` methods hain, to dono ko ek hi function mein pass kiya ja sakta hai bina kisi common base class ke. Python interpreter sirf runtime par check karta hai ki method exist karti hai ya nahi. Yeh dynamic languages mein common hai kyunki type checking strict nahi hoti.

Yeh approach code ko loose coupling deta hai. Ek function jo `draw()` call karta hai, kisi bhi object ke saath kaam karega jo `draw()` implement karta hai — chahe woh `Circle` ho ya `SVGRenderer`.

> [!NOTE]
> Sabse badi aha yeh hai ki interface sirf method names aur signatures se define hota hai, na ki class hierarchy se.

## 2. Why this matters — concrete and current
PyTorch mein har neural network module `forward()` method implement karta hai. Different architectures jaise ResNet aur Transformer dono ko `nn.Module` subclass kiye bina bhi ek hi training loop mein use kiya ja sakta hai, kyunki dono `forward()` provide karte hain.

Django REST framework mein har view class `get()`, `post()` jaise methods define karti hai. Custom permission classes aur serializers bhi duck typing par depend karte hain taaki middleware unhe interchangeably treat kar sake.

Game engines jaise Unity ke ECS (Entity Component System) mein har component `update()` method provide karta hai. Physics component aur AI component ko ek hi scheduler loop mein call kiya jaata hai bina explicit inheritance ke.

NumPy aur Pandas mein array-like objects (`__array_ufunc__` protocol) duck typing allow karte hain. Ek custom tensor class jo NumPy interface follow karta hai, NumPy functions ke saath seedha kaam kar sakta hai.

Semiconductor design tools (EDA software) mein different simulator backends (SPICE, Verilog) ek common `simulate(netlist)` interface follow karte hain, jisse top-level orchestration code same rehta hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Class and instance   | Methods ko object par call karne ke liye structure chahiye |
| Method definition    | Duck typing ka core yahi hai — same method name           |
| Dynamic typing       | Python runtime par hi method existence check karta hai    |
| Function as first-class object | Polymorphic behaviour ko functions mein pass karne ke liye |

Agar aap inme se koi bhi weak feel kar rahe hain, to pehle basic classes aur methods wapas padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Interface as method names only
Aap ek aise function likhte ho jo kisi bhi object par `speak()` call karta hai. Agar object ke paas `speak` method hai, to woh chalega.

Example: `def make_it_speak(thing): thing.speak()`  
Formal statement: An object \(o\) is usable in context \(C\) if for every method name \(m\) required by \(C\), \(o\) has an attribute \(m\) that is callable with the expected signature.

> [!WARNING]
> Agar aap yahan type check laga dete ho (`isinstance`), to duck typing ka fayda khatam ho jaata hai.

### Step 2 — No inheritance required
Do completely unrelated classes `Duck` aur `Robot` dono `speak()` implement kar sakte hain.

Example:  
```python
class Duck:
    def speak(self): return "quack"
class Robot:
    def speak(self): return "beep"
```
Formal: Let \(D_1\) and \(D_2\) be classes with no common ancestor. If \(\forall m \in I\), \(D_1\) and \(D_2\) both define \(m\), then instances of both satisfy interface \(I\).

> [!WARNING]
> Students soch lete hain ki base class zaroori hai — yeh galat assumption hai.

### Step 3 — Runtime resolution
Python method lookup `__getattribute__` par hota hai jab call hota hai, na ki compile time par.

Formal: Method resolution occurs at call time via the object’s `__dict__` or class MRO, not via static type declarations.

### Step 4 — Same interface, different behaviour
`Duck.speak()` aur `Robot.speak()` dono `speak` naam ke hain lekin alag logic return karte hain. Yeh polymorphism hai.

### Step 5 — Liskov substitution without inheritance
Agar ek function `I` interface expect karta hai, to koi bhi object jo `I` satisfy karta hai, us function mein substitute ho sakta hai.

Formal statement (textbook grade): An object is substitutable for an interface \(I\) if it provides all operations in \(I\) with compatible signatures, independent of its position in any inheritance hierarchy.

## 5. Worked examples — har step show karo

**Example 1 — Basic duck**
- *Given:* `class Sparrow: def fly(self): return "flying"` aur `class Airplane: def fly(self): return "jet"`
- *Find:* Ek function jo dono ko handle kare.
```python
def takeoff(vehicle):
    return vehicle.fly()
print(takeoff(Sparrow()))  # Sparrow() banaya
print(takeoff(Airplane()))
```
*Why:* Function sirf `fly` naam check karta hai.  
**Final answer:** `"flying"` aur `"jet"` dono print hote hain.  
*Reflection:* Yeh sabse simple case hai; inheritance ki zaroorat nahi dikhi.

**Example 2 — With arguments**
- *Given:* Do classes with `area(self, unit)` method.
- *Find:* Calculate total area in same unit.
```python
def total_area(shapes, unit="m"):
    return sum(s.area(unit) for s in shapes)
```
*Why:* List comprehension har object par `area` call karti hai.  
**Final answer:** Sum of returned values.  
*Reflection:* Signature match zaroori hai, return type nahi.

**Example 3 — File-like objects**
- *Given:* Custom class jo `read()` aur `close()` implement karta hai.
- *Find:* Use with `with` statement.
```python
class StringIO:
    def read(self): ...
    def close(self): ...
with StringIO() as f: data = f.read()
```
*Why:* Context manager protocol duck typing se kaam karta hai.  
**Final answer:** Resource automatically closed.  
*Reflection:* Built-in protocols bhi duck typing par based hain.

**Example 4 — Mixed collection**
- *Given:* List containing `Dog`, `Cat` aur `SpeakerDevice` objects.
- *Find:* Call `make_sound()` on all.
```python
for obj in [Dog(), Cat(), SpeakerDevice()]:
    obj.make_sound()
```
*Why:* Loop mein koi type check nahi.  
**Final answer:** Three different sounds produced.  
*Reflection:* Scalability aati hai jab naye classes add karte ho bina function badle.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| Using `isinstance` check    | Habit from statically typed languages   | Remove type checks; rely on method existence |
| Assuming inheritance needed | Textbook examples mostly show inheritance | Write two unrelated classes that share methods |
| Ignoring signature mismatch | Only method name checked, not arguments | Test with actual call signatures             |
| Overusing duck typing everywhere | Feels “Pythonic” too quickly         | Use only when behaviour truly varies         |
| No tests for missing methods | Runtime error appears late              | Write unit tests that pass different objects |
| Confusing with monkey patching | Both are dynamic but different intent | Keep duck typing limited to interface match  |

## 7. The textbook-precise statement
An object \(o\) conforms to an interface \(I\) if, for every operation \(m\) declared in \(I\), \(o\) provides a callable attribute with the same name and arity. No inheritance relationship between the class of \(o\) and any definition of \(I\) is required. (Ramalho, *Fluent Python*, 2e, §13.4, “Duck Typing”)

## 8. Visual — diagram or schematic
```text
          make_sound()
               |
     +---------+---------+
     |                   |
  class Dog           class Cat
  speak()="woof"      speak()="meow"
     |                   |
  instance d          instance c
     |                   |
     +---------+---------+
               |
        def chorus(pets):
            for p in pets:
                p.make_sound()
```
Diagram shows two unrelated classes feeding into one function purely via shared method name.

## 9. The memory technique
1. **The hook** — Imagine a literal duck and a rubber duck toy both responding to “quack” command; the caller never checks their birth certificate.
2. **What to overlearn** — Method name + expected arguments = interface; inheritance optional.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days by writing one new duck-typed function each time.
4. **First-principles fallback** — Agar bhool jaao to socho: “Agar object par dot-call chal jaaye to kaam ho gaya.”

## 10. What this unlocks
Yeh concept aapko composition over inheritance, protocol-oriented design, aur plugin architectures samajhne deta hai.

- Next: Abstract Base Classes (abc module) aur structural subtyping
- Protocol classes in Python 3.8+
- Dependency injection frameworks
- Writing generic algorithms that accept any “file-like” or “array-like” object

## 11. Self-check — five questions, no answers
1. Ek `Vector` class aur ek `Matrix` class dono `transpose()` implement karte hain. Kya dono ko ek hi `invert(obj)` function mein bhej sakte hain?
2. Agar `Robot` class mein `speak(self, volume)` hai lekin function `speak()` bina argument ke call karta hai, kya hoga?
3. `isinstance(obj, Duck)` check hatane se code mein kya farak padta hai?
4. Ek nayi class `Parrot` add karne par existing `fly_all(birds)` function ko change karna padega kya?
5. Duck typing aur Java interface mein runtime behaviour ka farak kya hai?