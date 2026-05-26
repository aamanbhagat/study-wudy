## 1. The one-sentence answer
**Generators are functions that pause at yield statements and resume on demand, producing values lazily instead of returning everything at once.**

Aap ek normal function likhte ho jo ek hi baar run karke list ya value deta hai. Generator function mein `yield` use karte ho to function ka execution freeze ho jaata hai aur agla value maangne par wahi se continue hota hai. Iska matlab hai ki aap ek time par sirf ek value memory mein rakhte ho, jo badi datasets ke liye bahut efficient hai.

Yeh behaviour iterators ki tarah kaam karta hai lekin aapko manually `__iter__` aur `__next__` implement nahi karna padta. `next()` call karne se generator state resume hoti hai aur `send()` value ko andar bhej kar two-way communication allow karta hai.

> [!NOTE]
> Sabse badi aha yeh hai ki generator ek function nahi balki ek state machine hai jo har `yield` par apni local variables aur instruction pointer ko freeze karke rakh deta hai.

## 2. Why this matters — concrete and current
Netflix ke recommendation pipeline mein real-time user event streams ko process karne ke liye generators use kiye jaate hain taaki har event ko memory mein load kiye bina sequentially handle kiya ja sake.

SpaceX ke telemetry processing systems mein rocket sensor data ke continuous streams ko generators ke through filter aur transform kiya jaata hai, jisse gigabytes of data ko low-memory footprint mein analyse kiya ja sake.

Google ke TensorFlow Data API mein `tf.data.Dataset` internally generators ka use karta hai taaki training batches lazily load hon aur GPU ko starve na hona pade.

Apache Airflow ke custom operators mein ETL pipelines ke liye generators ka use hota hai jisse intermediate results disk par write kiye bina stage-by-stage processing hoti hai.

Semiconductor simulation tools (jaise SPICE variants) mein circuit waveform generation ke liye generators ka use hota hai taaki millions of time steps ko ek saath store kiye bina iterate kiya ja sake.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Functions & scope    | Local variables ko generator state mein freeze karne ke liye |
| Iterators & `for` loops | Generator objects ko consume karne ka standard tareeka samajhne ke liye |
| `return` vs expression evaluation | `yield` aur `return` ke difference ko samajhne ke liye |

Agar upar ke teeno concepts clear nahi hain to pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Normal function execution ends permanently
Ek normal function call karte ho to woh pura execute hota hai aur `return` ke baad uska stack frame destroy ho jaata hai. Iska concrete example dekho:

```python
def normal():
    return 42
print(normal())  # 42
print(normal())  # 42 — har baar naya call
```

Formal statement: A function call \(f(x)\) evaluates to a value and terminates; subsequent calls create fresh activation records.

> [!WARNING]
> Agar aap sochte ho ki function ko pause karke resume kar sakte hain bina `yield` ke, to state manually manage karna padega aur code complex ho jaayega.

### Step 2 — yield freezes execution instead of terminating
`yield` expression function ko pause karta hai aur ek value return karta hai lekin local state (variables, program counter) ko intact rakhta hai.

```python
def gen():
    yield 1
    yield 2
```

Formal: Execution of a generator function produces a generator object whose `__next__` method resumes at the last suspension point.

### Step 3 — Generator object is an iterator
Calling the generator function returns a generator object jo `Iterator` protocol implement karta hai.

```python
g = gen()
print(next(g))  # 1
```

### Step 4 — next() resumes from last yield
`next(g)` generator ko resume karta hai aur agla `yield` tak execute karta hai.

### Step 5 — send() injects a value at the yield point
`g.send(value)` `yield` expression ki jagah `value` ko assign karta hai aur resume karta hai.

Formal: `send(v)` resumes execution with the `yield` expression evaluating to \(v\).

### Step 6 — Generator exhaustion raises StopIteration
Jab koi aur `yield` nahi bachta to `StopIteration` raise hota hai, jo `for` loop ko naturally terminate karta hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple counter**
*Given:* Ek generator jo 0 se 2 tak count kare.
*Find:* Values produced by successive `next()` calls.
```python
def counter():
    i = 0
    yield i      # Step 1: pause here
    i += 1
    yield i      # Step 2: pause here
    i += 1
    yield i      # Step 3: pause here
g = counter()
print(next(g))   # Why: resumes from start till first yield
print(next(g))   # Why: resumes after previous yield
print(next(g))   # Why: resumes after second yield
```
**Final answer**
```
0
1
2
```
*Reflection:* Yeh example isliye simple thi kyunki koi input nahi tha; state sirf local variable `i` mein thi.

**Example 2 — Fibonacci generator**
*Given:* Infinite Fibonacci sequence via generator.
*Find:* First five numbers using a loop.
```python
def fib():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b
g = fib()
for _ in range(5):
    print(next(g))
```
**Final answer**
```
0
1
1
2
3
```
*Reflection:* Infinite loop andar `yield` hone se memory safe hai.

**Example 3 — Using next() with default**
*Given:* Generator jo teen baar yield karta hai.
*Find:* Safe exhaustion handling.
```python
def three():
    yield 10
    yield 20
    yield 30
g = three()
print(next(g, "done"))
print(next(g, "done"))
print(next(g, "done"))
print(next(g, "done"))
```
**Final answer**
```
10
20
30
done
```
*Reflection:* Default value `StopIteration` ko silently handle karti hai.

**Example 4 — Coroutine style with send()**
*Given:* Generator jo sent value ko accumulate kare.
*Find:* Running sum after two `send()` calls.
```python
def accumulator():
    total = 0
    while True:
        val = yield total
        total += val
g = accumulator()
next(g)          # prime the generator
print(g.send(3)) # Why: yield total evaluates to 3
print(g.send(5)) # Why: total becomes 8, yields 8
```
**Final answer**
```
0
3
8
```
*Reflection:* `send()` ne generator ko ek stateful coroutine bana diya.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to prime with `next()` before `send()` | Generator starts before first yield         | Hamesha pehla `next(g)` call karo            |
| Expecting multiple values from one `yield` | `yield` ek hi value deta hai                | Multiple values ke liye tuple yield karo     |
| Reusing exhausted generator | Generator ek baar hi chal sakta hai         | Naya generator object banao har baar         |
| Using `return` inside generator | `return` StopIteration raise karta hai      | `return value` ki jagah final `yield` use karo |
| Storing large state in closure | Generator state sirf local variables mein hota hai | External state alag se manage karo           |
| Mixing `yield` and `print` for debugging | Side effects execution order ko confuse karte hain | Debugging ke liye `yield` values inspect karo |

## 7. The textbook-precise statement
A generator function is any function containing a `yield` expression. When called, it returns a generator object that implements the iterator protocol. Each call to its `__next__()` method resumes execution from the most recent suspension point until the next `yield` or until the function terminates, at which point `StopIteration` is raised. The `send(v)` method resumes execution with the `yield` expression evaluating to `v`. (Ramalho, *Fluent Python*, 2e, Chapter 14, "Iterables, Iterators, and Generators".)

## 8. Visual — diagram or schematic
```text
Generator State Machine
          start
            |
            v
   [created] --> next() --> [running] --> yield --> [suspended]
            ^                                    |
            |                                    v
         StopIteration                     next()/send() resumes
            |
            v
       [exhausted]
```
Labels: arrows show transitions; `yield` point par state freeze hoti hai.

## 9. The memory technique
**The hook** — Socho generator ek lazy river hai jisme paani (values) tab tak nahi behta jab tak aap bucket (`next()`) na maango.

**What to overlearn** — `yield` pauses, `next()` resumes, `send(v)` replaces the `yield` value with `v`, exhaustion → `StopIteration`.

**Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Agar sab bhool jaao to function call stack ko manually simulate karo: har `yield` par locals dict mein save karo aur instruction pointer record karo.

## 10. What this unlocks
Generators aapko streaming data pipelines, coroutines, aur memory-efficient algorithms likhne dete hain.

- Async generators (`async def` + `yield`)
- Context managers ke saath generator-based `contextlib.contextmanager`
- Custom `itertools` style tools
- Producer-consumer patterns bina threads ke

## 11. Self-check — five questions, no answers
1. Ek generator likho jo 1 se 100 tak sirf even numbers lazily de.
2. `send()` aur `next()` mein kya farak hai jab generator already running ho?
3. Kya ek generator object ko do alag `for` loops mein reuse kar sakte ho? Kyun?
4. `yield from` statement ka generator ke andar kya role hai?
5. Agar ek generator ke andar exception raise ho to uska state kya hota hai?