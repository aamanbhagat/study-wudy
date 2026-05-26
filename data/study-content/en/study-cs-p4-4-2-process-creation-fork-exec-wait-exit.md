## 1. The one-sentence answer
**Process creation in Unix-like systems is performed by the four system calls fork(), exec(), wait(), and exit(), which together duplicate an existing process, replace its program image, synchronize parent-child lifetimes, and terminate execution.**

A process is simply a running program together with its address space, registers, and open files. When a program needs another independent computation, it cannot merely jump to new code; the kernel must allocate a fresh process descriptor, copy the relevant parts of the parent’s state, and schedule the copy. The call fork() performs exactly that duplication and returns two different values—one to each copy—so the same source text can behave differently in parent and child.

Once duplicated, the child typically discards the inherited program by calling exec(), which loads an entirely new executable into the existing address space. The parent, if it must know when the work finishes, calls wait() to block until the child exits. Finally, exit() releases all resources and notifies the parent through the wait mechanism. These four primitives therefore give every higher-level operation—shell pipelines, web-server worker pools, build systems—its concrete implementation.

> [!NOTE]
> The single deepest insight is that fork() copies the *process*, not merely the thread of control; the two resulting processes therefore share no mutable state unless they explicitly request shared memory.

## 2. Why this matters — concrete and current
The bash shell uses fork() followed by exec() for every external command; without these two calls the interactive command line would be impossible. Modern web servers such as Nginx and Apache spawn worker processes with fork() at startup and later replace selected workers via exec() when configuration changes require a new binary, allowing zero-downtime reloads on thousands of production machines.

In high-performance computing, the MPI runtime on Linux clusters creates the initial set of ranks by repeated fork() calls from a single launcher process; each child then exec()s the user application. Semiconductor design tools from Synopsys and Cadence rely on the same pattern to launch thousands of simulation jobs from a single job-control script, each job terminating cleanly via exit() so the parent can harvest results with wait().

The Linux kernel itself uses a carefully restricted form of fork() (clone()) to create every user-space process and every kernel thread; the entire Android and iOS user-space ecosystems rest on this single primitive.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Process vs. program      | fork() duplicates the former, exec() loads the latter     |
| File descriptors         | They are copied by fork() and must be understood to avoid leaks |
| Return-value conventions | fork() returns two different values in one source text    |
| Zombie and orphan states | Created by exit() and reaped by wait(); ignoring them wastes PIDs |

## 4. Building the idea — from intuition to formalism

### Step 1 — A process is an independent scheduling entity
A process comprises an address space, register state, and kernel bookkeeping. Duplication must therefore copy all three.

Example: a 4-byte integer variable in the parent keeps its value in the child unless the child writes to it.

Formal statement:  
$$P' = \text{fork}(P) \implies \text{addr}(P') = \text{copy}(\text{addr}(P)) \land \text{PID}(P') \neq \text{PID}(P).$$

> [!WARNING]
> Forgetting that file descriptors are duplicated leads to both processes writing to the same socket.

### Step 2 — fork() returns two values from one call
The kernel returns the child’s PID to the parent and zero to the child; both continue at the instruction immediately after the call.

Example: after `pid = fork()`, the parent sees a positive integer while the child sees zero.

Formal statement:  
$$\text{return}(P) = \text{PID}(P'),\qquad \text{return}(P') = 0.$$

> [!WARNING]
> Testing the return value with a single equality (instead of <0, ==0, >0) silently mishandles fork failure.

### Step 3 — exec() replaces the address space
exec() discards the current memory image and loads a new executable, preserving only the PID and open file descriptors (unless FD_CLOEXEC is set).

Formal statement:  
$$\text{exec}(P, \text{path}) \implies \text{addr}(P) \leftarrow \text{load}(\text{path}) \land \text{PC}(P) \leftarrow \text{entry}(\text{path}).$$

> [!WARNING]
> A failed exec() returns –1 and leaves the original program running; many programmers forget to check.

### Step 4 — wait() synchronizes lifetimes
The parent blocks until a child changes state; the kernel reaps the child and returns its exit status.

Formal statement:  
$$\text{wait}(P) \text{ blocks until } \exists P_c \text{ with parent}(P_c)=P \land \text{state}(P_c)=\text{zombie}.$$

> [!WARNING]
> Calling wait() in the child or omitting it in the parent produces zombies that exhaust the PID table.

### Step 5 — exit() terminates and notifies
exit() closes open descriptors, releases memory, stores the status byte, and wakes any waiting parent.

Formal statement:  
$$\text{exit}(P, s) \implies \text{state}(P) \leftarrow \text{zombie}(s) \land \text{wake}(\text{parent}(P)).$$

## 5. Worked examples — every step shown

**Example 1 — Minimal fork**
*Given:* a program that prints its PID.  
*Find:* output of parent and child.

```
pid = fork();
if (pid == 0) printf("child %d\n", getpid());
else          printf("parent %d\n", getpid());
```
- `fork()` creates a second process. *Why:* kernel allocates new task_struct.  
- Both continue after the call. *Why:* return value differs.  
- Two lines appear (order undefined). *Why:* scheduler decides.

**Final answer**  
Two lines, one from each process.

*Reflection:* The example is tricky only because output interleaving surprises beginners; the generalisation is that after fork() control flow is duplicated.

**Example 2 — fork + exec**
*Given:* shell-like code.  
*Find:* how “ls” is launched.

```
if (fork() == 0) {
    execlp("ls", "ls", NULL);
    _exit(127);          /* only reached on failure */
}
```
- fork() duplicates. *Why:* child must not disturb parent.  
- execlp replaces image. *Why:* child now runs ls.  
- _exit after exec failure. *Why:* prevents child from continuing as shell.

**Final answer**  
Child process image is replaced by /bin/ls; parent continues.

*Reflection:* The pattern appears in every Unix shell.

**Example 3 — wait for exit status**
*Given:* parent must obtain child status.  
*Find:* correct wait usage.

```
pid = fork();
if (pid == 0) exit(42);
else {
    waitpid(pid, &status, 0);
    printf("%d\n", WEXITSTATUS(status));
}
```
- waitpid blocks. *Why:* parent must not exit first.  
- WEXITSTATUS extracts low byte. *Why:* kernel stores only eight bits.

**Final answer**  
42 is printed.

*Reflection:* Ignoring status hides bugs that exit() was meant to report.

**Example 4 — Race on shared descriptor**
*Given:* both processes write to stdout after fork without closing.  
*Find:* possible output corruption.

- Both inherit fd 1. *Why:* fork duplicates table.  
- Concurrent writes interleave. *Why:* no lock inside stdio.

**Final answer**  
Garbled output possible; close(fd) in child before exec avoids it.

*Reflection:* The trap generalises to any inherited resource.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Testing fork return with == | Single equality misses negative failure     | Always use <0 / ==0 / >0 three-way test      |
| exec without checking return| Failure leaves original program running     | Test exec return and call _exit on error     |
| Parent exits before wait    | Child becomes orphan, then zombie           | Always wait in ancestors that create children|
| Forgetting FD_CLOEXEC       | Child inherits unwanted descriptors         | Set close-on-exec on every sensitive fd      |
| Using exit() instead of _exit in child | stdio buffers flushed twice            | Use _exit after exec failure                 |
| Ignoring EINTR on wait      | Slow system calls are interrupted by signals| Loop around waitpid with EINTR handling      |
| Assuming fork copies only code | Data, heap, and stack are also copied  | Measure memory usage before large forks      |

## 7. The textbook-precise statement
A process \(P\) is created from an existing process \(Q\) by the primitive  
\[
\text{fork}(Q) \to (P, Q) \quad\text{where}\quad \text{PID}(P)\neq\text{PID}(Q),\quad \text{addr}(P)=\text{copy}(\text{addr}(Q)).
\]
Subsequent replacement is expressed by  
\[
\text{exec}(P,\text{path}) \to P' \quad\text{with}\quad \text{addr}(P')=\text{load}(\text{path}).
\]
Termination and synchronisation obey  
\[
\text{exit}(P,s) \to \text{zombie}(P,s),\qquad \text{wait}(Q) \to s \text{ when } P\text{ is reaped}.
\]
(See Silberschatz, Galvin, Gagne, *Operating System Concepts*, 10e, §3.3–3.4.)

## 8. Visual — diagram or schematic
```text
Parent (PID 1000)
   |
   | fork()
   v
Child (PID 1001) ------------> exec("ls") --> /bin/ls image
   |                               |
   | exit(0)                       | exit(0)
   v                               v
zombie (status 0) <------------ waitpid(1001) -- reaps
```

## 9. The memory technique
1. **The hook** — picture a photocopier (fork) that instantly produces a second running twin; the twin then walks through a door labelled “exec” and emerges as an entirely different person while keeping the same name tag (PID).
2. **What to overlearn** — fork returns 0 in child, PID in parent; exec never returns on success; wait reaps zombies.
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — derive every behaviour from the two invariants “address spaces are distinct after fork” and “exec discards the old address space.”

## 10. What this unlocks
Mastery of these four calls is the prerequisite for understanding shells, job control, process hierarchies, and the implementation of higher-level concurrency abstractions.

- Thread creation (clone, pthread_create)
- Process scheduling and the ready queue
- Inter-process communication (pipes, sockets)
- Container runtimes (namespaces + fork)

## 11. Self-check — five questions, no answers
1. After a successful fork, which variables are guaranteed to have identical values in parent and child?
2. What happens to file descriptor 1 if a child calls exec without closing it and the new program writes to stdout?
3. Why can a parent deadlock if it forks, then waits inside a signal handler that itself calls wait?
4. A program calls fork twice in succession without waiting. How many processes exist immediately afterward, and how many zombies appear if none of the children ever exit?
5. Construct the shortest correct C fragment that launches “/bin/date” and prints its exit status without ever leaving a zombie.