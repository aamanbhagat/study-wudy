## 1. The one-sentence answer
**Polymorphism via duck typing means that two objects support the same set of operations whenever they expose identical method names and signatures, irrespective of any shared inheritance hierarchy.**

In practice this removes the requirement that classes descend from a common base. A function written against a protocol can accept any argument that satisfies the protocol at runtime. The language runtime resolves each method call by inspecting the object itself rather than its static type.

The resulting flexibility appears in dynamic languages such as Python, Ruby, and JavaScript, and in statically typed languages that add structural typing or protocol extensions. The programmer writes code once; the concrete behaviour is supplied later by whichever object is passed in.

> [!NOTE]
> The decisive insight is that the *interface is defined by usage*, not by declaration; any object that supplies the required names at call time will work.

## 2. Why this matters — concrete and current
Google’s TensorFlow 2.x builds computation graphs by treating every layer object as a callable that implements `__call__`. Custom layers written by researchers need only define that single method; the framework never inspects their inheritance.

NASA’s Jet Propulsion Laboratory uses Python-based simulation frameworks for rover autonomy. Sensor models, planners, and actuator controllers all expose the same `step(time)` and `reset()` methods. New hardware can be swapped in without recompiling the mission scheduler.

Shopify’s payment-processing pipeline routes transactions through interchangeable “gateway” objects. Each gateway implements `authorize`, `capture`, and `refund`. Adding support for a new payment provider requires only that the new class satisfy those three methods.

Modern web browsers expose the same DOM interfaces (`addEventListener`, `querySelector`) across HTML elements, SVG nodes, and shadow roots. JavaScript libraries therefore operate uniformly on any of them without type checks.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Method resolution        | Duck typing relies on dynamic lookup of names at runtime. |
| Interface vs. implementation | The distinction clarifies why inheritance is unnecessary. |
| Runtime type checking    | You must understand when and how type errors surface.     |

## 4. Building the idea — from intuition to formalism

### Step 1 — Objects respond to messages
An object answers a method call if it possesses a matching attribute that is callable.  
Example: both a `Mallard` and a `RobotDuck` define `quack()`.  
Formal statement:  
```text
∀ o₁, o₂ : (o₁.quack ≃ callable) ∧ (o₂.quack ≃ callable) ⇒ o₁ and o₂ are interchangeable for any client that calls quack.
```
> [!WARNING]
> Assuming the method must be inherited from a shared superclass will cause you to reject valid objects.

### Step 2 — The client cares only about behaviour
A function written against the expected operations never mentions concrete classes.  
Example: `def make_it_quack(duck): duck.quack()`.  
Formal statement: the function’s precondition is solely the existence of the required attribute.

### Step 3 — Absence of inheritance removes coupling
Two classes may implement identical method sets yet share no common ancestor.  
Example: `class Dog: def speak(self): return "woof"` and `class Robot: def speak(self): return "beep"` are both usable by `def greet(x): print(x.speak())`.

### Step 4 — Runtime lookup replaces static checking
The language locates the method by inspecting the object’s dictionary or equivalent structure at the moment of call.  
Formal statement: method resolution is `obj.__dict__[name]` or the language’s equivalent protocol.

### Step 5 — The protocol is implicit
No `interface` or `abstract class` declaration is required; the protocol is the set of messages the client actually sends.  
This is the textbook definition of duck typing.

## 5. Worked examples — every step shown

**Example 1 — Minimal duck-typed function**  
*Given:* Two unrelated classes and a client function.  
*Find:* Output when the function receives either object.  
```python
class Sparrow:
    def fly(self): return "flaps wings"

class Airplane:
    def fly(self): return "jet engines"

def travel(vehicle):
    return vehicle.fly()
```
Step 1: `travel(Sparrow())` looks up `fly` on the Sparrow instance → returns `"flaps wings"`.  
*Why:* Name lookup succeeds.  
Step 2: `travel(Airplane())` likewise succeeds.  
**"flaps wings"**  
*Reflection:* The function never tested the argument’s type; only the presence of `fly` mattered.

**Example 2 — List of heterogeneous objects**  
*Given:* A list containing both classes above.  
*Find:* Result of mapping `travel` over the list.  
```python
vehicles = [Sparrow(), Airplane()]
result = [travel(v) for v in vehicles]
```
Step 1: First iteration binds `v` to Sparrow → `"flaps wings"`.  
*Why:* Same resolution as Example 1.  
Step 2: Second iteration binds `v` to Airplane → `"jet engines"`.  
**["flaps wings", "jet engines"]**  
*Reflection:* Polymorphism appears at the collection level without any common base class.

**Example 3 — Optional protocol methods**  
*Given:* A class that implements only a subset of expected methods.  
*Find:* Behaviour when an absent method is called.  
```python
class Fish:
    def swim(self): return "swims"
```
Calling `travel(Fish())` raises `AttributeError`.  
*Why:* The implicit protocol was not satisfied.  
**AttributeError**  
*Reflection:* Duck typing shifts error detection from compile time to first use.

**Example 4 — Adding a default via mixin (escalating)**  
*Given:* A mixin that supplies a missing method.  
*Find:* How to make `Fish` compatible without inheritance from a shared base.  
```python
class FlyingMixin:
    def fly(self): return "glides"

class FlyingFish(FlyingMixin, Fish): pass
```
`travel(FlyingFish())` now returns `"glides"`.  
**"glides"**  
*Reflection:* Mixins allow incremental protocol satisfaction while preserving the duck-typed style.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Over-checking `isinstance`        | Habit from static languages                 | Delete the check; let the call fail naturally |
| Assuming method names guarantee semantics | Names alone carry no contract          | Document or test expected behaviour          |
| Silent failure on missing methods | AttributeError is sometimes caught too high | Let the exception propagate or use `hasattr` only when a fallback is intended |
| Confusing duck typing with monkey patching | Both are dynamic, but patching mutates existing objects | Keep patching separate from protocol design  |
| IDE autocomplete fails            | Static analysis cannot see implicit protocols | Use type hints (`Protocol` in Python) for tooling |
| Performance surprise on repeated lookups | Attribute access cost is underestimated | Cache bound methods when hot paths are identified |
| Accidental name collisions        | Two unrelated methods share a name          | Choose distinctive names or adopt a formal protocol |

## 7. The textbook-precise statement
Duck typing is a form of structural polymorphism in which the suitability of an object for a given use is determined solely by the presence, at runtime, of the methods and attributes the client invokes. No nominal relationship among types is required.  
Cormen, Leiserson, Rivest & Stein, *Introduction to Algorithms*, 4e, Ch. 22 (graph algorithms) and the Python Language Reference, §3.3.2 (“Attribute references”) together supply the formal basis: method lookup is defined by the object’s attribute dictionary rather than by its static type.

## 8. Visual — diagram or schematic
```text
Client Code
    |
    v
def operate(obj):
    obj.start()
    obj.stop()

          +-------------+     +-------------+
          |  Motor      |     |  Pump       |
          |-------------|     |-------------|
          | start()     |     | start()     |
          | stop()      |     | stop()      |
          +-------------+     +-------------+
                ^                   ^
                |                   |
         (no inheritance link)
```
The diagram shows two unrelated classes satisfying the same implicit protocol required by `operate`.

## 9. The memory technique

**The hook** — Picture a literal duck and a wooden decoy placed side-by-side; both “quack” when squeezed, so any hunter calling “duck” treats them identically.

**What to overlearn** — The sentence “If it walks like a duck and quacks like a duck, it is a duck for any client that only walks and quacks.”

**Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Re-derive by writing a one-line function that calls a single method on its argument, then substitute any object possessing that method.

## 10. What this unlocks
Duck-typed polymorphism is the foundation for iterator protocols, context managers, and the entire “file-like object” abstraction in Python. It directly enables dependency-injection patterns, plugin architectures, and generic algorithms that later appear in statically typed languages as structural types or traits.

- Next: abstract base classes and `typing.Protocol`
- Next: multiple dispatch and visitor patterns
- Next: interface segregation in large systems

## 11. Self-check — five questions, no answers
1. Write a three-line function that accepts any object exposing `read` and `close` and returns the first line; what happens when the argument lacks `close`?

2. Two classes implement `__iter__` but return different iterator types. Does a `for` loop over either object behave polymorphically?

3. Identify the implicit protocol used by the `with` statement and give two unrelated classes that both satisfy it.

4. A colleague inserts an `isinstance(x, Duck)` guard before calling `x.quack()`. What static guarantee does this add, and what runtime cost does it introduce?

5. Construct a minimal counter-example in which two classes share a method name yet produce observably incorrect behaviour when substituted for each other; explain why duck typing alone could not have prevented the error.