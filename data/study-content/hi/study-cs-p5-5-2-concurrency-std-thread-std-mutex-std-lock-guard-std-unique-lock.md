## 1. The one-sentence answer
**Concurrency in C++ uses std::thread to run tasks in parallel, while std::mutex, std::lock_guard and std::unique_lock protect shared data from simultaneous access.**

Yeh primitives aapko ek hi program ke andar multiple execution paths banane dete hain bina data corruption ke. std::thread ek nayi thread spawn karta hai, mutex uss thread ko critical section mein entry control karta hai, aur lock_guard/unique_lock mutex ko automatically release karte hain jab scope khatam ho. Iska matlab yeh hai ki race conditions automatically handle ho jaate hain agar aap in wrappers ko sahi se use karo.

Agar aap sirf raw mutex lock/unlock likhoge to exception aane par deadlock ho sakta hai. Lock_guard aur unique_lock RAII idiom follow karte hain, isliye woh destructor mein unlock kar dete hain chahe koi exception throw ho.

> [!NOTE]
> Sabse badi aha moment yeh hai ki ownership of the lock ko object ke lifetime se jod dena deadlock aur data races dono ko ek saath solve kar deta hai.

## 2. Why this matters — concrete and current
High-frequency trading engines at Jane Street aur Citadel har microsecond ke liye multiple order-matching threads chalate hain; std::mutex aur unique_lock un shared order books ko protect karte hain bina performance loss ke.

TensorFlow aur PyTorch ke C++ backends data-parallel training ke dauran GPU-CPU data transfer threads ko std::thread se manage karte hain aur gradient buffers ko mutex-protected queues mein rakhte hain.

Aerospace flight software (NASA’s cFS aur ESA’s TASTE) deterministic timing ke liye thread pools use karte hain jahaan lock_guard se protected telemetry buffers real-time deadlines meet karte hain.

Modern game engines jaise Unreal Engine 5 ke Chaos Physics system multi-threaded rigid-body simulation ke liye unique_lock se guarded task queues chalate hain taaki frame drops na hon.

Semiconductor design tools (Synopsys VCS) billion-gate simulations ko parallel threads mein todte hain aur shared netlist data structures ko std::mutex se lock karte hain.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| C++11 move semantics     | std::thread objects move-only hote hain                   |
| RAII                     | Lock guards destructor mein unlock karte hain             |
| Function objects & lambdas | Thread constructor ko callable dena padta hai           |
| Basic exception safety   | Raw lock/unlock exception ke time par deadlock create kar sakta hai |

Agar upar ke concepts clear nahi hain to pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Launching independent execution
Ek thread banane ka matlab hai ek function ko alag call stack par chalana.  
`std::thread t([]{ /* work */ });` ek lambda ko nayi thread par execute karta hai.  
Formal statement: `std::thread` constructor ek `Callable` aur arguments leta hai aur `std::invoke` ko naye thread ke entry point par call karta hai.  
> [!WARNING] Agar thread object destroy hone se pehle join ya detach nahi kiya to program terminate ho jaata hai.

### Step 2 — Shared mutable state creates races
Dono threads ek hi integer ko increment kar rahe hon to final value non-deterministic hoti hai.  
Example: dono threads `x++` karte hain 100000 baar; expected 200000 lekin actual value kabhi 200000 nahi hoti.  
Formal: data race undefined behaviour hai per [intro.races] in the standard.

### Step 3 — Mutual exclusion with std::mutex
`std::mutex m; m.lock(); /* critical */ m.unlock();` ek time par sirf ek thread ko andar jaane deta hai.  
Formal: `mutex` ek Lockable type hai jiska `lock()` blocking call hai aur sirf unlocked state mein hi succeed karta hai.

### Step 4 — Manual unlock is dangerous
Exception aane par unlock kabhi nahi hota → deadlock.  
Isliye raw lock/unlock avoid karna chahiye.

### Step 5 — RAII wrapper: std::lock_guard
`std::lock_guard<std::mutex> lg(m);` constructor mein lock karta hai aur destructor mein unlock.  
Formal: `lock_guard` Lockable type L ka reference store karta hai aur uska lifetime scope tak mutex owned rehta hai.

### Step 6 — Deferred locking with std::unique_lock
`std::unique_lock<std::mutex> ul(m, std::defer_lock); ul.lock();` aapko lock ko baad mein lene aur manually unlock karne ki flexibility deta hai.  
Formal: `unique_lock` movable hai aur `owns_lock()` member function se ownership query kar sakte hain.

### Step 7 — Ownership transfer enables scoped locking patterns
unique_lock move karne se lock ownership ek function se doosre function mein ja sakti hai bina extra locking ke.

### Step 8 — Textbook-grade guarantee
C++ standard guarantees that once a thread successfully calls `lock()` on a mutex, no other thread can observe the mutex in the locked state until the owning thread unlocks it.

## 5. Worked examples — har step show karo

**Example 1 — Basic thread creation**  
*Given:* Ek counter ko 0 se 10 tak ek alag thread mein print karna hai.  
*Find:* Correct thread launch aur join.  
```cpp
#include <thread>
#include <iostream>
void print() { for(int i=0;i<=10;++i) std::cout << i << '\n'; }
int main() {
    std::thread t(print);
    t.join();
}
```
*Why:* `join()` main thread ko wait karne deta hai taaki program khatam na ho jaaye.  
**Final answer:** 0 se 10 tak numbers print hote hain ek alag thread se.

**Example 2 — Race condition**  
*Given:* Global `int x = 0;` dono threads 100000 baar `x++` karte hain.  
*Find:* Final value.  
Race ki wajah se final value non-deterministic hoti hai (usually < 200000).  
*Reflection:* Yeh example dikhata hai kyun mutex zaroori hai.

**Example 3 — lock_guard protection**  
*Given:* Same counter problem with mutex.  
```cpp
std::mutex m; int x = 0;
void inc() {
    for(int i=0;i<100000;++i) {
        std::lock_guard<std::mutex> lg(m);
        ++x;
    }
}
```
*Why:* Scope khatam hote hi destructor unlock karta hai.  
**Final answer:** x == 200000 guaranteed.

**Example 4 — unique_lock with deferred locking**  
*Given:* Ek function jo lock sirf condition ke hisaab se lena chahta hai.  
```cpp
std::unique_lock<std::mutex> ul(m, std::defer_lock);
if (need_lock) ul.lock();
// work
// ul automatically unlocks on scope exit
```
*Reflection:* unique_lock move semantics allow returning a locked guard from a factory function.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to join/detach   | Thread object lifetime khatam ho jaata hai  | Always join ya detach before thread variable goes out of scope |
| Locking two mutexes without order | Deadlock (ABBA problem)                     | Consistent global locking order enforce karo |
| Using raw mutex in exception path | unlock() kabhi nahi chalta                  | Hamesha lock_guard ya unique_lock use karo   |
| Copying a std::thread       | Move-only type hai                          | std::move() use karo ya reference rakh lo    |
| Locking already locked mutex from same thread | Recursive deadlock                          | std::recursive_mutex use karo agar zaroorat ho |
| Not checking owns_lock() after try_lock | Logic error                                 | unique_lock ke saath owns_lock() check karo  |
| Destroying mutex while locked | Undefined behaviour                         | Mutex hamesha threads se zyada scope mein rakho |

## 7. The textbook-precise statement
From Anthony Williams, *C++ Concurrency in Action*, 2e, §2.1–§4.4:  
A `std::thread` object represents a thread of execution. Its constructor takes a callable object and arguments; the new thread invokes `std::invoke` on those arguments. A mutex type satisfies the *Lockable* requirements if it provides `lock()`, `try_lock()` and `unlock()`. `std::lock_guard<M>` and `std::unique_lock<M>` are *scoped lock* wrappers; the former is neither movable nor copyable, while the latter is movable and supports deferred locking, timed locking and manual unlocking. All operations on a mutex after its construction and before its destruction are performed with a happens-before relation between a successful unlock and the next successful lock on the same mutex object.

## 8. Visual — diagram or schematic
```
Main Thread                  Worker Thread
    |                              |
    | std::thread t(fn)            |
    |----------------------------->|
    |                              | lock_guard lg(m)
    |                              |   enter critical
    |                              |   ++shared
    |                              |   ~lg => unlock
    | t.join() waits               |
    |<-----------------------------|
    | program continues            |
```

## 9. The memory technique

1. **The hook** — Socho ek bouncer (mutex) aur ek VIP pass (lock_guard) jo automatically wapas le leta hai jab aap club se nikalte ho.
2. **What to overlearn** — `std::lock_guard` hamesha scope exit par unlock karta hai; `std::thread` ko join/detach karna zaroori hai warna terminate.
3. **Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Agar yaad na rahe to socho: kaunsa object lock ka ownership rakhta hai? Woh object scope se bahar jaane par hi unlock hona chahiye.

## 10. What this unlocks
Yeh primitives aapko higher-level concurrency abstractions samajhne ka base dete hain.

- `std::async` aur `std::future`
- `std::condition_variable` aur producer-consumer patterns
- Thread pools aur task queues
- `std::shared_mutex` aur reader-writer locks
- Atomic operations (`std::atomic`) ke saath lock-free programming

## 11. Self-check — five questions, no answers
1. Agar ek thread `std::thread t(fn);` ke baad bina join/detach kiye khatam ho jaaye to kya hoga?
2. `std::lock_guard` ko move karne ki koshish karne par compiler kya error dega?
3. Do threads ek dusre ke mutex ko lock karne ki koshish kar rahe hain bina kisi order ke — kaunsa trap hai?
4. `std::unique_lock` ke saath `defer_lock` use karne ka fayda kya hai?
5. Ek function jo `std::unique_lock` return karta hai, woh lock ownership kaise transfer karta hai?