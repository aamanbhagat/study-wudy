## 1. The one-sentence answer
**User-level threads are created and scheduled by a library in user space while kernel-level threads are created and scheduled by the operating system kernel, producing three standard mapping models between the two.**

A thread is an independent sequence of execution inside a process. When the thread library runs entirely in user space, every thread switch occurs without entering the kernel; the library simply saves and restores registers and the stack pointer. This yields very low overhead but leaves the kernel unaware that multiple threads exist, so a blocking system call or a single-processor schedule halts the entire process.

When the kernel itself maintains thread control blocks, each thread is a first-class schedulable entity. Context switches now require a system call and a full kernel entry, raising cost, yet the kernel can place different threads on different cores and can continue other threads when one blocks. The three mapping models arise from how many user-level threads are allowed to correspond to how many kernel-level threads: many user threads onto one kernel thread (many-to-one), one-to-one, or an arbitrary number of user threads onto an arbitrary number of kernel threads (many-to-many).

> [!NOTE]
> The decisive performance difference is not raw speed of a single switch but whether the kernel can ever run two threads of the same process simultaneously; only the one-to-one and many-to-many models permit true parallelism on multicore hardware.

## 2. Why this matters — concrete and current
Modern Linux uses the one-to-one model via the NPTL implementation of pthreads; every pthread maps to a distinct kernel task, allowing Go’s runtime and Java’s JVM to obtain genuine parallelism on servers with dozens of cores.

NVIDIA’s CUDA runtime and Apple’s Grand Central Dispatch both rely on many-to-many mappings so that thousands of lightweight user-level tasks can be multiplexed onto a smaller pool of kernel threads that the OS can migrate across GPU or CPU cores without exhausting kernel resources.

Google’s gVisor and AWS Firecracker use user-level threading libraries inside lightweight VMs to schedule millions of application threads while presenting only a few kernel threads to the host hypervisor, reducing context-switch pressure on the host scheduler.

In high-energy physics data pipelines at CERN, the many-to-many model inside ROOT’s TThreadExecutor lets reconstruction jobs keep thousands of analysis threads runnable while the kernel sees only as many threads as there are physical cores, preventing oversubscription on the batch farm.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Process vs. thread distinction | Threads share an address space; the mapping decision only concerns execution state, not memory isolation. |
| Context switch mechanics   | Register save/restore cost differs dramatically between user-space and kernel entry. |
| Blocking system calls      | A blocking call inside a user-level thread can freeze the entire process unless the library intercepts it. |
| Multicore scheduling       | Only kernel-visible threads can be placed on separate cores by the OS scheduler. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A thread is just a stack and a set of registers
A running thread is completely described by its program counter, stack pointer, and the remaining general-purpose registers. No other state is required for correctness.  
Example: two threads inside the same process can each execute `i++` on their own private `i` simply by having separate stacks; the shared code segment and heap remain identical.  
Formally, a thread state \( T \) is the tuple \( (PC, SP, R) \).  
> [!WARNING]  
> Treating the heap or open-file table as part of thread state leads to the incorrect belief that threads need separate address spaces.

### Step 2 — User-level threads keep the tuple inside a user-space library
The library stores each \( T \) in a user-allocated structure and performs switches by direct register manipulation. The kernel sees only one thread of control.  
Example: the classic “green threads” library in early Java saved eight registers and switched stacks with a few assembly instructions.  
Formally, the library maintains a ready queue \( Q_u \) of user thread states; a context switch is the operation \( T_{cur} \leftarrow \text{dequeue}(Q_u) \).  
> [!WARNING]  
> Forgetting that the kernel still sees a single process leads to the false expectation that user-level threads will automatically use multiple cores.

### Step 3 — Kernel-level threads expose the same tuple to the scheduler
The kernel now allocates a thread control block (TCB) for each thread and includes it in its own ready queue \( Q_k \).  
Example: on Linux, `clone(CLONE_THREAD)` creates a new kernel task sharing the mm_struct but with its own TCB.  
Formally, the kernel scheduler runs the selection function \( \text{next}(Q_k) \).  
> [!WARNING]  
> Assuming every kernel thread switch is as cheap as a user-level switch ignores the cost of mode switch and TLB flush.

### Step 4 — Many-to-one mapping collapses many \( T_u \) onto one \( T_k \)
All user threads share a single kernel thread; the library multiplexes them.  
Formally, there exists a surjective function \( f: \{T_u\} \to \{T_k\} \) with \( |\{T_k\}| = 1 \).  
> [!WARNING]  
> A blocking call inside any user thread blocks the sole kernel thread, stalling every other user thread.

### Step 5 — One-to-one mapping gives an injective function
Each user thread is given its own kernel thread: \( f \) is bijective.  
Formally, \( |\{T_u\}| = |\{T_k\}| \) and \( f \) is one-to-one.  
> [!WARNING]  
> Creating thousands of kernel threads exhausts kernel memory and increases scheduler overhead.

### Step 6 — Many-to-many mapping uses an intermediate pool
A two-level scheduler maps \( m \) user threads onto \( n \) kernel threads where \( m \) and \( n \) are independent.  
Formally, \( f: \{T_u\} \to \{T_k\} \) is surjective with \( 1 \le n \le m \).  
> [!WARNING]  
> Without careful load balancing between the two schedulers, some kernel threads may idle while user threads remain runnable.

### Step 7 — The textbook classification follows directly
The three models are exactly the three possible cardinalities of the image of \( f \): one kernel thread, exactly as many kernel threads as user threads, or an arbitrary number of kernel threads.

## 5. Worked examples — every step shown

**Example 1 — Single blocking call under many-to-one**  
*Given:* A process has four user threads mapped onto one kernel thread; thread 2 issues `read()` on a slow device.  
*Find:* Which threads continue to run?  
Step 1: The user-level scheduler yields to thread 2. *Why:* library policy.  
Step 2: `read()` traps into the kernel. *Why:* system call.  
Step 3: Kernel blocks the only kernel thread. *Why:* one-to-one inside the kernel.  
Step 4: No other user thread can run. *Why:* no remaining kernel thread.  
**Final answer: all four threads are blocked.**  
*Reflection:* The example isolates the classic “one blocking call freezes everything” failure mode of many-to-one.

**Example 2 — True parallelism under one-to-one**  
*Given:* Eight cores, eight user threads each mapped one-to-one.  
*Find:* Maximum simultaneous execution.  
Step 1: Kernel scheduler places each TCB on a distinct core. *Why:* one-to-one mapping.  
Step 2: All eight threads execute machine instructions at once. *Why:* separate program counters.  
**Final answer: eight threads run in parallel.**  
*Reflection:* Demonstrates why one-to-one is required for CPU-bound workloads on multicore hardware.

**Example 3 — Many-to-many with two kernel threads**  
*Given:* 100 user threads, two kernel threads.  
*Find:* Number of user threads that can be blocked without halting the process.  
Step 1: Library assigns user threads to the two kernel threads. *Why:* two-level scheduler.  
Step 2: Up to 98 user threads may block on I/O while the remaining two continue. *Why:* each kernel thread can still run.  
**Final answer: 98 user threads may block.**  
*Reflection:* Shows the flexibility gained by decoupling the two cardinalities.

**Example 4 — Scheduler activation (advanced many-to-many)**  
*Given:* A user thread blocks inside the kernel; the kernel “upcalls” the library.  
*Find:* How the library regains a runnable kernel thread.  
Step 1: Kernel sends activation message. *Why:* scheduler activation protocol.  
Step 2: Library creates a new user thread to handle the upcall. *Why:* maintains many-to-many invariant.  
Step 3: Library reassigns remaining user threads to the freed kernel thread. *Why:* keeps \( n \) kernel threads busy.  
**Final answer: the library receives an extra kernel thread temporarily.**  
*Reflection:* Illustrates the extra mechanism needed to keep many-to-many correct when blocking occurs inside the kernel.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming user-level threads automatically use all cores | The kernel still sees one schedulable entity | Check the mapping model of the threading library before measuring speedup |
| Believing kernel threads are always faster | Ignores the mode-switch and cache cost | Benchmark both creation and context-switch latency on the target hardware |
| Forgetting that many-to-many still needs two schedulers | The library scheduler and kernel scheduler must cooperate | Read the source of the two-level scheduler (e.g., Go runtime) |
| Creating thousands of kernel threads “just in case” | One-to-one makes every user thread cost a TCB | Use many-to-many or thread pools when thread count exceeds a few hundred |
| Ignoring signal delivery differences | Signals are delivered to the process, not individual user threads | Use `sigprocmask` carefully or switch to kernel threads for signal-heavy code |
| Expecting deterministic scheduling with user-level threads | The library scheduler is invisible to the kernel’s fairness policies | Accept non-determinism or move time-critical threads into kernel threads |
| Overlooking stack-size limits in many-to-many | Each user thread still needs its own stack even if multiplexed | Set explicit stack sizes and monitor RSS growth |

## 7. The textbook-precise statement
A threading system implements a mapping \( f \) from the set of user-level threads \( U \) to the set of kernel-level threads \( K \). The system is many-to-one when \( |f(U)| = 1 \), one-to-one when \( f \) is bijective, and many-to-many when \( 1 < |f(U)| < |U| \). (Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §4.3–4.4.)

## 8. Visual — diagram or schematic
```text
User space                  Kernel space
+-------------+            +-------------+
| User TCB 1  |            | Kernel TCB A|
| User TCB 2  |  many-to-  | Kernel TCB B|
| User TCB 3  |   one      +-------------+
|     ...     |             (one-to-one)
+-------------+             each maps 1:1
   many-to-many             to a user TCB
   maps any subset
   onto A or B
```
Labelled axes: left column = user thread control blocks; right column = kernel thread control blocks; arrows show the function \( f \).

## 9. The memory technique
1. **The hook** — Picture a busy restaurant: user threads are customers, kernel threads are waiters. Many-to-one is one waiter for the whole room; one-to-one is a waiter per customer; many-to-many is a shift of waiters that can be reassigned.
2. **What to overlearn** — (a) many-to-one blocks the process on any kernel call; (b) one-to-one costs one TCB per thread; (c) many-to-many needs two schedulers.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from the cardinality of the image of \( f \): 1, equal to \( |U| \), or any number in between.

## 10. What this unlocks
Understanding the three models lets you choose the correct threading library for a workload and predict its scaling behaviour on multicore hardware.  
- Next: thread pools and work-stealing schedulers  
- Next: scheduler activations and upcalls  
- Next: user-level file systems and networking stacks that rely on non-blocking user threads  
- Next: lightweight process (LWP) abstractions in modern kernels

## 11. Self-check — five questions, no answers
1. A program creates 10 000 threads that each perform a single blocking read; which mapping model will still make progress on the remaining threads?  
2. On a 64-core machine, a CPU-bound matrix multiplication uses a many-to-one library; measured speedup is 1.0. Why?  
3. A one-to-one library creates a thread that immediately calls `pthread_join` on itself; what kernel-visible state change occurs?  
4. In a many-to-many system the library’s ready queue is empty yet two kernel threads remain runnable; what must be true about the user threads assigned to those kernel threads?  
5. You observe that increasing the number of kernel threads from 4 to 8 doubles throughput while increasing from 8 to 16 yields no gain; name the most likely bottleneck and the mapping model in use.