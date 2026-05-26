## 1. The one-sentence answer
**Context managers** let you wrap resource acquisition and release into a single `with` block so that cleanup always happens even when exceptions occur.

Aap ne kabhi file open karke bhool se close nahi kiya hoga aur baad mein data corrupt hote dekha hoga. Python ka `with` statement exactly isi problem ko solve karta hai: jaise hi block khatam hota hai, automatically cleanup code chal jaata hai bina aap ko manually `close()` ya `release()` likhna padta. Iska core mechanism do dunder methods hain — `__enter__` jo block shuru hone par resource deta hai aur `__exit__` jo block khatam hone par (ya exception aane par) usko safely saaf karta hai.

Yeh sirf files tak limited nahi hai. Database connections, locks, temporary directories, aur network sockets sab iske through manage kiye ja sakte hain. Agar `__exit__` method `True` return kare to exception suppress ho jaata hai, warna normal traceback propagate hota hai.

> [!NOTE]
> Sabse badi aha yeh hai ki cleanup code likhne ki zaroorat nahi padti — protocol guarantee karta hai ki `__exit__` hamesha chalega, chahe exception aaye ya na aaye.

## 2. Why this matters — concrete and current
FastAPI aur SQLAlchemy jaise libraries internally context managers use karte hain jab async database sessions manage karte hain; ek bhi connection leak hone par high-traffic services mein connection pool exhaust ho jaata hai.

PyTorch DataLoader aur Hugging Face datasets library temporary cache directories ke liye context managers banate hain taaki training ke dauran disk space automatically release ho jaaye jab worker processes crash ho jaayein.

CUDA programming mein `torch.cuda.device` context manager GPU device switching ko safe banata hai; bina iske multi-GPU training scripts mein silent device mismatch bugs aa jaate hain jo sirf production mein pakde jaate hain.

OpenAI’s tiktoken library aur similar tokenizers temporary memory-mapped files ke liye context managers provide karte hain taaki badi vocabulary files ko load karne ke baad turant unmap kiya ja sake, jo low-memory inference servers ke liye zaroori hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Exception handling   | `__exit__` ko pata hona chahiye ki exception aaya tha ya nahi |
| Class & instance methods | Context manager ek class ka object hota hai jisme `__enter__` aur `__exit__` define kiye jaate hain |
| Resource lifecycle   | Setup (acquire) aur teardown (release) ka clear mental model zaroori hai |

Agar upar ke teeno concepts clear nahi hain to pehle exception handling aur basic OOP padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Resource pair: acquire then release
Jab bhi koi resource (file, lock, connection) liya jaata hai, usko release karna bhi zaroori hota hai. Manual release bhool jaane par leaks hote hain.

Example: `f = open("data.txt")` ke baad `f.close()` likhna padta tha. Agar beech mein exception aa jaaye to close kabhi nahi chalta.

Formal statement: Resource R ke liye pair (acquire(R), release(R)) hona chahiye jahaan release hamesha execute ho.

> [!WARNING]
> Agar aap manually release call karte ho aur exception aa jaaye, release skip ho jaayega aur resource leak hoga.

### Step 2 — The `with` statement syntax
Python ne `with expr as var:` syntax diya hai jo acquire aur release ko automatically wrap karta hai.

Example:
```python
with open("data.txt") as f:
    data = f.read()
```
Yeh internally `f = open("data.txt")` karta hai, block execute karta hai, phir `f.close()`.

Formal: `with EXPR as VAR:` → `VAR = EXPR.__enter__()`, BLOCK execute, `EXPR.__exit__(*exc_info)` call.

### Step 3 — The context manager protocol
Koi bhi object context manager ban jaata hai agar usme `__enter__` aur `__exit__` methods defined hon.

`__enter__` block ke andar use hone wala value return karta hai. `__exit__` (exc_type, exc_val, exc_tb) leta hai aur `True` return karne par exception suppress karta hai.

### Step 4 — `__enter__` implementation
`__enter__` method usually self return karta hai taaki `as` variable ko object mil jaaye.

Example:
```python
class File:
    def __enter__(self):
        self.f = open(self.name)
        return self.f
```

### Step 5 — `__exit__` implementation and exception handling
`__exit__` mein hamesha cleanup code (close, release) likha jaata hai. Agar `exc_type` non-None hai to exception aaya tha.

Agar method `True` return kare to exception daba diya jaata hai.

Formal signature:
```python
def __exit__(self, exc_type, exc_val, exc_tb):
    ...
    return False   # default: do not suppress
```

### Step 6 — Context manager as a first-class object
Context managers ko variables mein store karke multiple blocks mein reuse kiya ja sakta hai, lekin zyadatar ek hi baar use kiya jaata hai.

### Step 7 — Textbook-grade definition
Ek context manager woh object hai jo `__enter__` aur `__exit__` protocol implement karta hai aur `with` statement ke saath deterministic resource management provide karta hai.

## 5. Worked examples

**Example 1 — Basic file context manager**
*Given:* Ek simple file reader class banana hai jo `with` ke saath use ho sake.
*Find:* Poora implementation.

```python
class ManagedFile:
    def __init__(self, filename):
        self.filename = filename
    def __enter__(self):
        self.file = open(self.filename, 'r')
        return self.file
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close()
        return False
```
*Why:* `__enter__` file open karke handle return karta hai. `__exit__` hamesha close karega.

**Final answer**  
`with ManagedFile("test.txt") as f: print(f.read())` block khatam hone par file automatically band ho jaayegi.

*Reflection:* Yeh example trivial lagta hai lekin exception aane par bhi close guarantee karta hai.

**Example 2 — Exception suppression**
*Given:* Ek context manager jo ZeroDivisionError ko suppress kare.
*Find:* `__exit__` logic.

```python
class SuppressZero:
    def __enter__(self): return self
    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is ZeroDivisionError:
            return True
        return False
```
*Why:* `return True` exception ko daba deta hai.

**Final answer**  
`with SuppressZero(): 1/0` → koi traceback nahi aayega.

*Reflection:* Suppression sirf tab kaam karta hai jab exact exception type match ho.

**Example 3 — Timer context manager**
*Given:* Execution time measure karna hai.
*Find:* `__enter__` aur `__exit__` mein time capture.

```python
import time
class Timer:
    def __enter__(self):
        self.start = time.time()
        return self
    def __exit__(self, *args):
        self.end = time.time()
        print(self.end - self.start)
```
*Why:* Start time enter mein, elapsed time exit mein calculate hota hai.

**Final answer**  
`with Timer(): time.sleep(0.5)` → lagbhag 0.5 print hoga.

*Reflection:* Side-effect (printing) ko `__exit__` mein rakhna common pattern hai.

**Example 4 — Nested context managers**
*Given:* Do files ek saath manage karni hain.
*Find:* Nested `with` usage.

```python
with open("a.txt") as f1, open("b.txt") as f2:
    ...
```
*Why:* Python 2.7+ se multiple comma-separated context managers allowed hain aur dono `__exit__` guarantee se chalenge.

**Final answer**  
Dono files block ke baad safely close ho jaayengi.

*Reflection:* Multiple resources ke liye comma syntax cleaner hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to return self from `__enter__` | Students assume object automatically mil jaayega | Hamesha `return self` ya resource handle return karo |
| Not handling `exc_type` correctly | Exception information ignore kar dete hain | `if exc_type:` check karo cleanup se pehle |
| Returning `True` by mistake | Accidental exception swallowing            | Default `False` rakho, sirf jab zaroorat ho tab True |
| Using context manager multiple times | State reuse bugs                           | `__init__` mein fresh state initialise karo |
| Not closing resources in `__exit__` | Cleanup code bhool jaate hain              | `__exit__` ko sirf cleanup ke liye rakho     |
| Ignoring return value of `open` inside `__enter__` | File handle assign nahi hota               | `self.f = open(...)`; `return self.f`        |
| Nested `with` indentation mistakes | Readability aur logic error                | Multiple `with` comma syntax prefer karo     |

## 7. The textbook-precise statement
A context manager is an object that defines `__enter__` and `__exit__` methods and can be used as the operand of a `with` statement. The `with` statement guarantees that if the `__enter__` method returns normally, then `__exit__` will be called exactly once, even if an exception occurs inside the suite. If `__exit__` returns a true value, the exception is suppressed; otherwise it is propagated. (Python Software Foundation, *Python Language Reference*, §9.3, release 3.12)

## 8. Visual — diagram or schematic
```text
with EXPR as VAR:
    BLOCK
        │
        ▼
   EXPR.__enter__() ──► return value ──► VAR
        │
   execute BLOCK
        │
        ▼
   EXPR.__exit__(exc_type, exc_val, exc_tb)
        │
   if return True → suppress else propagate
```

## 9. The memory technique
1. **The hook** — Imagine a bouncer (`__enter__`) letting you into a club and the same bouncer (`__exit__`) forcing you out even if a fight breaks out.
2. **What to overlearn** — Signature `def __exit__(self, exc_type, exc_val, exc_tb)` aur default return value `False`.
3. **Spaced-repetition schedule** — Review 1 din baad, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Agar signature bhool jaao to yaad rakho: enter = acquire, exit = release + exception info.

## 10. What this unlocks
Ab aap custom resources safely manage kar sakte ho aur `contextlib` module ke decorators samajh paoge.

- `contextlib.contextmanager` decorator
- `async with` aur `__aenter__`/`__aexit__`
- `ExitStack` for dynamic number of context managers
- Resource pooling patterns in web frameworks

## 11. Self-check — five questions, no answers
1. Agar `__enter__` `None` return kare to `as` variable kya hoga?
2. Kya `__exit__` mein `return True` karne se `KeyboardInterrupt` bhi suppress ho jaayega?
3. Ek aisa context manager likho jo sirf write-only file ke liye ho aur exception aane par bhi file truncate na ho.
4. Multiple context managers comma syntax mein kis order mein `__exit__` call hote hain?
5. Agar `__exit__` raise kare to original exception kya hota hai?