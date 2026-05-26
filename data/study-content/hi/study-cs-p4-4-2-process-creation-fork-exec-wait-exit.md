## 1. The one-sentence answer
**Process creation in Unix-like systems uses fork() to duplicate a running process, exec() to load a new program into it, wait() to let the parent synchronise on the child's termination, and exit() to end a process cleanly.**

Fork() takes the current process and produces an identical child whose only difference is the returned PID value; this gives the parent and child separate address spaces while sharing the same initial code and data. Exec() then overwrites the child's memory image with a fresh executable, so the same PID now runs a completely different program. Wait() blocks the parent until a child reports its exit status, and exit() flushes buffers, closes descriptors, and hands the termination code back to the kernel. Together these four calls form the standard pattern every shell and server uses to launch external commands.

> [!NOTE]
> The single deepest insight is that fork() does not “start a new program”; it only clones the caller. Exec() is the call that actually brings a different binary into memory.

## 2. Why this matters — concrete and current
Linux containers (Docker, containerd) rely on the same fork()+exec() sequence inside the OCI runtime when they create the first process of a new namespace; without it, image layers could never become running workloads. Modern web servers such as Nginx and Node.js use fork() at startup to create worker pools that later exec() into the actual request-handling binary, giving each worker an isolated copy-on-write address space. The systemd init system calls fork() once per service unit and then exec() into the daemon binary, allowing it to track every daemon through wait() and reap zombies. In high-performance computing, MPI launchers on clusters (OpenMPI, MPICH) repeatedly fork() launcher processes that exec() user binaries across thousands of nodes; the wait() status collection feeds directly into job schedulers such as Slurm.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| PID and process state    | fork() and wait() exchange numeric PIDs and exit codes    |
| File descriptors         | They are duplicated by fork() and replaced by exec()      |
| Copy-on-write semantics  | Explains why fork() is cheap despite creating a full copy |
| Zombie and orphan states | Appear when wait() or exit() are used incorrectly         |

If any row above is unfamiliar, pause and read the corresponding section on process lifecycle before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — A process is just an address space plus registers
A process is defined by its virtual memory contents and CPU register snapshot. When the kernel receives a fork() request it allocates a new task_struct, duplicates the page tables, and marks every writable page copy-on-write.

### Step 2 — fork() returns twice from one call site
After the kernel finishes duplication it schedules both parent and child. The parent receives the child's PID (>0); the child receives 0. This single return-value difference is the only way code can distinguish the two flows.

### Step 3 — exec() discards the old image
execve(path, argv, envp) unmaps almost every page, loads the new ELF segments, sets up the new stack and arguments, then jumps to the new entry point. The PID never changes; only the memory contents do.

### Step 4 — wait() collects termination status
A parent calls waitpid(pid, &status, options). The kernel blocks until the child enters the zombie state, then copies the exit code and signal information into status and removes the zombie.

### Step 5 — exit() performs final cleanup
The exit(status) system call flushes stdio buffers, runs atexit handlers, closes file descriptors with close-on-exec cleared, and finally invokes do_exit() which sets the task state to EXIT_ZOMBIE and wakes waiters.

### Step 6 — The canonical sequence
Most programs therefore follow:
```c
if (fork() == 0) {
    execve(...);
    _exit(127);          /* only reached on failure */
}
waitpid(...);
```
Any deviation (missing wait, calling exec in the parent, ignoring exec failure) produces zombies, runaway processes, or silent failures.

### Step 7 — Formal return and error contracts
fork() returns -1 on failure (ENOMEM, EAGAIN), a positive PID to the parent, and 0 to the child. exec() returns only on failure (-1 with errno set). waitpid() returns the waited PID or -1; the status word encodes both exit code and signal via macros WIFEXITED, WEXITSTATUS, etc.

## 5. Worked examples — har step show karo

**Example 1 — Minimal fork**
*Given:* A program that prints its PID.
*Find:* How many lines appear on stdout after fork().
```c
printf("%d\n", getpid());
if (fork() == 0) printf("%d\n", getpid());
```
- Parent prints once, returns child's PID, continues.
- Child prints once, returns 0, continues.
- Two lines appear; PIDs differ.
*Why:* fork() duplicated the address space after the first printf.
**Final answer:** two distinct PIDs printed.

*Reflection:* The example shows fork() really is a clone, not a spawn.

**Example 2 — fork()+exec to run ls**
*Given:* Need to run /bin/ls from inside C.
*Find:* Correct child-side sequence.
```c
if (fork() == 0) {
    char *argv[] = {"ls", "-l", NULL};
    execve("/bin/ls", argv, environ);
    perror("execve"); _exit(127);
}
wait(NULL);
```
- Child replaces its image; parent waits.
*Why:* execve never returns on success, so perror only executes on failure.
**Final answer:** ls output followed by parent prompt.

*Reflection:* Demonstrates the classic “fork, exec in child, wait in parent” pattern.

**Example 3 — Handling exec failure**
*Given:* A misspelled path.
*Find:* Exit status observed by parent.
Child calls execve on a non-existent file, _exit(127) runs, parent sees WIFEXITED(status) true and WEXITSTATUS(status)==127.
*Why:* The explicit _exit guarantees a known failure code.
**Final answer:** parent receives status 127.

*Reflection:* Always protect exec with an immediate _exit.

**Example 4 — Multiple children and selective wait**
*Given:* Two children, only the second must be waited explicitly.
*Find:* Correct waitpid usage.
```c
pid_t p1 = fork();
if (p1 == 0) { execve(...); _exit(1); }
pid_t p2 = fork();
if (p2 == 0) { execve(...); _exit(2); }
int status;
waitpid(p2, &status, 0);   // reap only p2
```
- p1 becomes orphan, reparented to init (or systemd).
*Why:* waitpid with explicit PID selects which child to reap.
**Final answer:** only p2's status collected; p1 reaped later by init.

*Reflection:* Selective waiting prevents accidental blocking on the wrong child.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting wait()           | Parent exits before child finishes          | Always pair fork() with waitpid()            |
| Calling exec in parent      | Misunderstanding return values              | Check fork() return value before exec        |
| Ignoring exec failure       | exec returns only on error                  | Place _exit immediately after exec           |
| Using wait() with multiple children | wait() reaps any child                      | Use waitpid with explicit PID                |
| Not handling fork() == -1   | Resource exhaustion possible                | Check return value and retry or abort        |
| Race on shared file descriptors | Both parent and child keep descriptors open | Close unneeded descriptors right after fork  |
| Zombie accumulation         | Parent never reaps                          | Install SIGCHLD handler or call waitpid in loop |

## 7. The textbook-precise statement
In Silberschatz, Galvin, Gagne, Operating System Concepts, 10e, §3.3, the process creation interface is defined as follows. The system call pid_t fork(void) creates a new child process that is an exact duplicate of the calling process; on success it returns the child's PID to the parent and 0 to the child, and returns -1 on failure with errno set. The call int execve(const char *pathname, char *const argv[], char *const envp[]) overlays the calling process image with the program named by pathname; on success it does not return, and on failure returns -1 with errno set. The call pid_t waitpid(pid_t pid, int *wstatus, int options) suspends the calling process until a child specified by pid changes state; the status of the child is stored in wstatus and may be inspected with the macros WIFEXITED, WEXITSTATUS, WIFSIGNALED, etc. Finally, the call _Noreturn void _exit(int status) terminates the calling process, returning status to the parent via waitpid.

## 8. Visual — diagram or schematic
```text
Parent (PID 1200)
   |
   | fork()
   v
Parent (1200) ----------------------> waitpid()
   |                                     |
   +-- Child (1201) --execve("/bin/ls")--> ls runs
                                     |
                                     v
                                  exit(0)
                                     |
                                     v
                              zombie reaped by waitpid
```

## 9. The memory technique

1. **The hook** — Picture a photocopier (fork) that spits out an identical sheet; the new sheet then walks into a fax machine (exec) that erases everything and prints a completely different document while keeping the same sheet number (PID).
2. **What to overlearn** — fork returns 0 to child, PID to parent; exec never returns on success; waitpid reaps a specific PID.
3. **Spaced-repetition schedule** — Review the four call signatures after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If you forget the return values, re-derive them from the single fact that the kernel must give each execution context a way to know “am I the original or the copy?”

## 10. What this unlocks
Mastery of these four calls lets you understand how shells, containers, job schedulers, and service managers actually start programs. It directly leads to:
- Implementing a minimal shell with pipelines and redirection
- Building process supervisors (systemd, supervisord)
- Writing container runtimes that set up namespaces and cgroups
- Reasoning about zombie reaping, signal handling, and daemonisation patterns

## 11. Self-check — five questions, no answers
1. After a successful fork(), which memory pages are guaranteed to be shared between parent and child until one writes?
2. If execve fails, why must the child call _exit immediately afterward?
3. What is the numeric value stored in wstatus when a child terminates with exit(42)?
4. A parent forks three children and calls wait(NULL) twice; which child may still be a zombie afterward?
5. Construct a scenario where omitting close(fd) after fork() causes both parent and child to keep a socket open, and explain the resulting bug.