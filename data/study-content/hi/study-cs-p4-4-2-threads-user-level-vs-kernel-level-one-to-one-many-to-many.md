## 1. The one-sentence answer
**Threads are lightweight execution units inside a process whose mapping to kernel scheduling entities can be handled entirely in user space, entirely by the kernel, or through a hybrid scheduler.**

User-level threads live inside a library that the process itself runs. The kernel never sees more than one thread per process, so context switches happen with simple function calls and no system-call overhead. Kernel-level threads, on the other hand, are scheduled directly by the OS; each thread has its own kernel data structure and the scheduler can move any thread to any core.

The three classic mapping models follow from these two choices. Many-to-one packs many user threads onto a single kernel thread, one-to-one gives every user thread its own kernel thread, and many-to-many lets a user-space scheduler multiplex user threads onto a smaller pool of kernel threads.

> [!NOTE]
> The decisive “aha” is that the kernel only ever schedules kernel threads; everything else is an illusion maintained by user-space code or by the kernel’s own thread abstraction.

## 2. Why this matters — concrete and current
Go runtime (used by Kubernetes, Docker, and Cloudflare Workers) implements a many-to-many model called “G-M-P” so that a single blocked system call does not freeze an entire OS thread; the Go scheduler simply parks the goroutine and wakes another.

NVIDIA’s CUDA driver on Linux uses one-to-one kernel threads for each CUDA stream so that GPU work can be overlapped with CPU work without user-space polling loops.

Android’s ART runtime switched from many-to-one to one-to-one mapping in Android 8 to reduce jank when a single thread performs a long blocking I/O; the change is documented in the Android Open Source Project commit logs.

High-frequency trading engines at Jane Street and Hudson River Trading pin each kernel thread to a dedicated core (one-to-one) so that the scheduler never migrates the thread and cache lines stay hot.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Process vs thread        | Threads share address space; processes do not             |
| Context switch           | Cost difference between user and kernel switches          |
| System call              | Crossing the user-kernel boundary is expensive            |
| Scheduler                | Who decides which thread runs next                        |

If any row is unfamiliar, pause and read the corresponding section on processes first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Distinguish user thread from kernel thread
A user thread is merely a stack, a set of registers, and a small control block kept inside the process address space. A kernel thread is the same structure but stored inside the kernel and visible to the scheduler.

Concrete example: a program using the POSIX pthread library with the many-to-one library (old LinuxThreads) creates 100 pthread objects, yet the kernel’s `ps` command shows only one process and one LWP.

Formal statement: let \(U\) be the set of user threads and \(K\) the set of kernel threads; a mapping function \(f: U \to K\) decides which kernel thread executes a given user thread.

> [!WARNING]
> If you assume every pthread is always a kernel thread, you will mis-predict latency when the library uses many-to-one.

### Step 2 — Many-to-one model
All user threads are multiplexed onto a single kernel thread. The user-space scheduler performs context switches with ordinary procedure calls.

Example: Green threads in early JVM or old GNU Pth library.

Formal: \(|K| = 1\), \(f(u) = k_0\) for every \(u \in U\).

> [!WARNING]
> A single blocking system call blocks the only kernel thread and therefore the entire process.

### Step 3 — One-to-one model
Every user thread is backed by exactly one kernel thread. The kernel scheduler sees every thread.

Example: modern Linux NPTL pthreads, Windows threads, goroutine when GOMAXPROCS equals the number of OS threads.

Formal: \(f\) is bijective, \(|U| = |K|\).

> [!WARNING]
> Thread creation now costs a system call and a kernel object allocation; programs that spawn millions of threads pay both time and memory.

### Step 4 — Many-to-many model
A user-space scheduler maps many user threads onto a smaller, variable-sized pool of kernel threads. The kernel still sees only kernel threads.

Example: original Solaris threads, Go runtime, some Haskell GHC implementations.

Formal: \(f: U \to K\) is surjective but not injective; the scheduler can change \(|K|\) at runtime.

> [!WARNING]
> The two schedulers (user and kernel) can fight each other unless the kernel provides scheduler activations or similar upcalls.

### Step 5 — Scheduler activation (hybrid mechanism)
When a kernel thread blocks, the kernel sends an upcall to the user-space scheduler so it can reassign the remaining user threads.

Formal: the kernel exports a set of activation records; the user library installs a handler that receives these records.

### Step 6 — Textbook-grade summary
A thread mapping is defined by the triple \((U, K, f)\) together with the policy that decides when \(|K|\) may change. The three classic models are the three common cardinalities of the image of \(f\).

## 5. Worked examples — har step show karo

**Example 1 — Many-to-one blocking**
*Given:* 4 user threads, 1 kernel thread, thread 2 issues read() on stdin.  
*Find:* state of all threads after the call.  
Step 1: user scheduler saves registers of thread 2.  
Step 2: read() traps into kernel.  
Step 3: kernel blocks the single kernel thread.  
Step 4: user scheduler never regains control because its only kernel thread is asleep.  
**All four user threads are blocked.**  
*Reflection:* the example shows why many-to-one fails on any blocking call.

**Example 2 — One-to-one creation cost**
*Given:* program calls pthread_create 10000 times on Linux NPTL.  
*Find:* number of kernel threads visible to `ps`.  
Each pthread_create issues clone() with CLONE_THREAD, producing one kernel thread each.  
**Exactly 10000 kernel threads appear.**  
*Reflection:* memory usage grows linearly; each kernel thread needs a kernel stack of 8 KiB.

**Example 3 — Many-to-many rebalancing**
*Given:* Go program, GOMAXPROCS=4, 10000 goroutines, 4 OS threads.  
*Find:* mapping after one goroutine blocks on syscall.  
Go scheduler parks the blocked goroutine, picks another runnable goroutine, and keeps the same 4 OS threads.  
**Image of f stays size 4.**  
*Reflection:* many-to-many hides blocking latency from the kernel.

**Example 4 — Scheduler activation**
*Given:* Solaris 2.6 with two-level threads, thread A blocks in kernel.  
*Find:* sequence of events.  
Kernel sends activation record via upcall; user scheduler receives record, removes A from its run queue, and may request another kernel thread.  
**User scheduler regains control without a new system call.**  
*Reflection:* upcalls close the feedback loop between the two schedulers.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Assuming pthread_create is cheap  | Confusing user thread creation with kernel thread creation | Measure with time or strace; check library docs |
| Believing many-to-many never blocks | Forgetting that the kernel thread pool can be exhausted | Watch for “all kernel threads blocked” messages in runtime logs |
| Using thread-local storage with many-to-one | TLS is per kernel thread, not per user thread | Switch to one-to-one or use explicit user-thread keys |
| Ignoring signal delivery          | Signals are delivered to kernel threads only | Use pthread_sigmask and dedicated signal threads |
| Over-subscribing cores            | Creating more kernel threads than cores without reason | Set GOMAXPROCS or equivalent to number of cores |
| Forgetting that fork() duplicates only the calling thread in some models | NPTL vs old LinuxThreads difference       | Read the man page for pthread_atfork         |

## 7. The textbook-precise statement
A thread is an independent execution context within a process. Let \(T_u\) be the set of user-level threads and \(T_k\) the set of kernel-level threads. A mapping \(\phi: T_u \to T_k\) is maintained either by a user-space library or by the kernel. The three standard models are defined by the cardinality of the image of \(\phi\): many-to-one (\(|\operatorname{im}(\phi)|=1\)), one-to-one (\(\phi\) bijective), and many-to-many (\(\phi\) surjective, \(|\operatorname{im}(\phi)| \ge 1\) variable). The kernel scheduler only ever selects from \(T_k\). (Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §4.4–4.5)

## 8. Visual — diagram or schematic
```
User space          Kernel space
+-------------+     +-------------+
| U-thread 1  | --> |             |
| U-thread 2  |     | K-thread A  | --> CPU 0
| U-thread 3  |     |             |
| ...         |     +-------------+
| U-thread N  |     | K-thread B  | --> CPU 1
+-------------+     +-------------+
Many-to-many mapping shown by arrows fanning into fewer K-threads
```

## 9. The memory technique
1. **The hook** — picture a busy restaurant: user threads are customers, kernel threads are waiters; many-to-one means one overworked waiter, one-to-one means one waiter per customer, many-to-many means the maître d’ keeps reassigning a small team of waiters.
2. **What to overlearn** — many-to-one blocks the whole process on any syscall; one-to-one costs one kernel object per thread; many-to-many needs two cooperating schedulers.
3. **Spaced-repetition schedule** — review the three models after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — start from “who runs the scheduler?”; if the answer is only the kernel, you have one-to-one; if the answer is a library, you have many-to-one or many-to-many.

## 10. What this unlocks
You can now reason about concurrency libraries (Go, Tokio, libuv), design high-performance servers, and understand why certain runtime flags exist.

- Next topics: thread synchronization primitives, thread pools, work-stealing schedulers
- Later topics: user-level interrupts, scheduler activations in modern kernels, lightweight threading in WebAssembly

## 11. Self-check — five questions, no answers
1. In a many-to-one library, what happens to the other user threads when one thread executes a blocking read()?
2. Why does creating 100 000 kernel threads usually exhaust memory before CPU time?
3. A program using many-to-many suddenly stops making progress even though CPU usage is low. Name two possible causes.
4. On Linux, how can you experimentally distinguish many-to-one from one-to-one behaviour of a threading library?
5. Draw the mapping arrows for a many-to-many system after two kernel threads have blocked and the user scheduler has requested one extra kernel thread.