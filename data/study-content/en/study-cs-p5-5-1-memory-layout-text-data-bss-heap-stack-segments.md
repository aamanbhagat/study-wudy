## 1. The one-sentence answer
**In a running C program the virtual address space is partitioned into five segments—text, data, BSS, heap, and stack—each with distinct contents, permissions, lifetimes, and growth directions.**

These segments arise because a process needs separate regions for immutable instructions, persistent initialized values, zero-initialized globals, dynamically allocated objects whose sizes are known only at runtime, and short-lived automatic storage that must be reclaimed on function exit. The operating system and the C runtime together map these regions into a single linear virtual address space so that the same machine instructions can reference every kind of object without the programmer writing explicit segment qualifiers. The resulting layout is not an arbitrary convention; it directly encodes the lifetimes and access patterns required by the C abstract machine while allowing the kernel to enforce protection and efficient paging.

> [!NOTE]
> The single most important insight is that the heap and stack grow toward each other inside the same address space; any collision between them produces the classic “stack overflow” or “out-of-memory” failure even when total physical RAM remains plentiful.

## 2. Why this matters — concrete and current
NASA’s flight software for the Perseverance rover runs on a RAD750 processor whose linker script explicitly places exception vectors in the text segment and telemetry buffers in the data segment; any accidental write into text would trigger an immediate hardware exception that the fault-protection software relies on to reboot safely.

Modern ML inference engines such as TensorFlow Lite for Microcontrollers allocate activation tensors on the heap while keeping quantized weights in the read-only data segment; mis-placement of a large weight array into BSS instead of data produces silent zero-initialization and completely incorrect model output.

Semiconductor companies such as ARM use the same five-segment model when they validate their Cortex-M memory protection unit (MPU) configurations; the MPU regions are sized and attributed exactly to the boundaries reported by the linker map file, preventing user tasks from corrupting each other’s stacks.

The Linux kernel’s `mmap` and `brk` system calls implement the heap segment; every call to `malloc` larger than 128 KiB ultimately invokes one of these, which is why profiling tools such as `perf` and `eBPF` can attribute heap growth to individual allocation sites in production workloads at companies like Meta and Google.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| Virtual address space          | All five segments live inside one contiguous virtual address range per process.       |
| Linker script / object file sections | The compiler and linker decide which symbols belong in text, data, or BSS before the program even runs. |
| Pointer arithmetic and lifetimes | Heap and stack objects are referenced by pointers whose validity depends on segment rules. |
| `malloc`/`free` and automatic storage | These are the only two mechanisms that create objects after `main` has started.     |

## 4. Building the idea — from intuition to formalism

### Step 1 — The program is a static recipe plus mutable state
A compiled C executable is a file that already contains every machine instruction and every initialized global value; the operating system simply copies these bytes into memory once.  
Example: the bytes of `printf` and the bytes of the string literal `"hello"` are both present in the executable.  
Formal statement:  
$$
\text{Executable} = \text{Text} \cup \text{Data}_\text{init}
$$  
> [!WARNING]  
> Treating the executable itself as writable leads to the false belief that a running program can modify its own code without `mprotect`.

### Step 2 — Uninitialized globals must still exist and must be zero
C requires that all objects with static storage duration begin life as zero; the executable therefore records only their size, not their contents.  
Example: `static int counter;` occupies space but contributes zero bytes to the file.  
Formal statement:  
$$
\text{BSS size} = \sum_{\text{uninit static}} \text{sizeof}(o)
$$  
> [!WARNING]  
> Assuming BSS memory contains whatever was left by the previous process violates the C standard and produces non-portable bugs.

### Step 3 — Dynamic allocation cannot be predicted at compile time
Objects whose size or count is determined by user input must be created after the program starts; the heap segment is the region whose end address can be moved at runtime by `brk` or `mmap`.  
Example: `int *p = malloc(n*sizeof(int));` extends the heap by at least `n*sizeof(int)` bytes.  
Formal statement:  
$$
\text{Heap end} \leftarrow \text{Heap end} + \Delta \quad (\Delta \text{ chosen at runtime})
$$  
> [!WARNING]  
> Confusing heap growth with stack growth reverses the direction and produces off-by-one errors when computing remaining space.

### Step 4 — Automatic storage must be reclaimed on lexical exit
Local variables and call frames are pushed when a function is entered and popped when it returns; the stack pointer is adjusted in the function prologue and epilogue.  
Example: the address of a local `int x` is always between the current stack pointer and the frame of the caller.  
Formal statement:  
$$
\text{SP}_\text{after call} = \text{SP}_\text{before call} - \text{frame size}
$$  
> [!WARNING]  
> Returning the address of a local variable yields a dangling pointer once the callee’s frame is popped.

### Step 5 — The five segments occupy distinct ranges with fixed permissions
Text is read-execute, data and BSS are read-write, heap and stack are read-write; any violation raises a segmentation fault.  
Formal statement:  
$$
\text{Permissions}(s) = 
\begin{cases}
\text{RE} & s = \text{text} \\
\text{RW} & s \in \{\text{data, BSS, heap, stack}\}
\end{cases}
$$  
> [!WARNING]  
> Attempting to execute code placed on the heap without first calling `mprotect` triggers an execute-never fault on modern CPUs.

### Step 6 — The overall address-space layout is monotonic
On most architectures the text segment occupies the lowest addresses, followed by data, BSS, then the heap growing upward while the stack grows downward from the highest addresses.  
Formal statement:  
$$
\text{addr}(\text{text}) < \text{addr}(\text{data}) \le \text{addr}(\text{BSS}) < \text{brk} \ll \text{stack base}
$$  
> [!WARNING]  
> Assuming the stack grows upward (as on some ancient DSPs) produces incorrect buffer-overrun calculations on x86-64 and ARM.

### Step 7 — The runtime initialises BSS before `main`
After the kernel maps the segments, the C library’s start-up code writes zeros through the entire BSS range; only then is `main` invoked.  
Formal statement:  
$$
\forall o \in \text{BSS},\; o \leftarrow 0 \quad \text{before entry to } main
$$  
> [!WARNING]  
> Relying on this zero-initialization for non-static locals is undefined behaviour.

## 5. Worked examples — every step shown

**Example 1 — Locating a string literal**  
*Given:*  
```c
const char *msg = "hello";
```  
*Find:* segment of the characters `'h','e','l','l','o'`.  
Step 1: the string literal has static storage duration → must be in data or read-only data.  
Step 2: the literal is never modified by the program → linker places it in a read-only subsection of text or data.  
**Final answer:** read-only data (often merged with text).  

*Reflection:* the `const` qualifier alone does not move an object; storage duration decides the segment.

**Example 2 — BSS versus data**  
*Given:*  
```c
int a = 5;          /* initialized */
int b;              /* uninitialized */
static int c;       /* uninitialized, static */
```  
*Find:* segments for `a`, `b`, `c`.  
Step 1: `a` has an explicit initializer → data segment.  
Step 2: `b` and `c` have static duration and no initializer → BSS.  
**Final answer:** `a` → data, `b` and `c` → BSS.  

*Reflection:* the keyword `static` on a local variable changes its segment from stack to BSS.

**Example 3 — Heap extension size**  
*Given:* `malloc(4096)` on a system with 4 KiB pages.  
*Find:* minimum bytes added to the heap segment.  
Step 1: `brk` system call adjusts the program break by at least the requested size.  
Step 2: the kernel rounds up to whole pages → at least 4096 bytes.  
**Final answer:** 4096 bytes (one page).  

*Reflection:* the heap can grow by more than requested because of page granularity.

**Example 4 — Stack frame calculation**  
*Given:*  
```c
void f(void) {
    int x[100];
    /* … */
}
```  
*Find:* bytes reserved on the stack for `f`’s frame (ignoring alignment).  
Step 1: each `int` occupies 4 bytes → 400 bytes for the array.  
Step 2: return address and saved frame pointer add at least 16 bytes on x86-64.  
Step 3: total frame size = 400 + 16 = 416 bytes.  
**Final answer:** 416 bytes.  

*Reflection:* stack usage is determined at compile time for fixed-size arrays; variable-length arrays move part of the reservation to runtime.

## 6. Common traps and how to avoid them

| Trap                                      | Why it happens                                      | How to avoid it                                      |
|-------------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Returning address of a local array        | Confuses stack lifetime with heap lifetime          | Never return pointers to automatic storage           |
| Assuming global variables start at zero when declared inside a function | Static duration rules are independent of block scope | Use `static` keyword explicitly or move to file scope |
| Writing through a pointer obtained from `malloc` after `free` | Heap metadata is reused immediately                 | Set pointer to `NULL` immediately after `free`       |
| Placing large arrays on the stack         | Default stack size is only a few megabytes          | Use `malloc` or increase stack size via `ulimit`     |
| Expecting code on the heap to be executable | Modern CPUs enforce W^X by default                  | Call `mprotect` with `PROT_EXEC` if truly required   |
| Treating BSS as uninitialised garbage     | C standard mandates zero-initialisation             | Rely on the guarantee; do not “initialise” manually  |
| Forgetting that string literals are read-only | They often share pages with text segment            | Never write through a `char *` that points to a literal |

## 7. The textbook-precise statement
A C implementation maps every object to one of five segments whose addresses satisfy  
$$
0 \le \text{addr(text)} < \text{addr(data)} \le \text{addr(BSS)} < \text{brk} < \text{addr(stack)}
$$  
with permissions  
$$
\text{prot(text)} = \text{PROT_READ} \lor \text{PROT_EXEC},\quad
\text{prot(others)} = \text{PROT_READ} \lor \text{PROT_WRITE}.
$$  
Static-storage-duration objects with initializers occupy the data segment; those without occupy BSS and are zeroed before `main`. Automatic objects occupy the stack; their addresses are valid only between entry and exit of the declaring block. Dynamically allocated objects occupy the heap and remain valid from successful allocation until the corresponding deallocation. (See ISO/IEC 9899:2018 §6.2.4 “Storage durations of objects” and the System V ABI, §3.3 “Process Initialization”.)

## 8. Visual — diagram or schematic
```text
0x00007fffffffffff
          +------------------+  <-- stack base (high addresses)
          |     stack        |  grows downward
          |  (local vars,    |
          |   call frames)   |
          +------------------+  <-- stack pointer
          |                  |
          |   unmapped /     |
          |   guard pages    |
          +------------------+  <-- current brk
          |     heap         |  grows upward
          |  (malloc arena)  |
          +------------------+
          |     BSS          |  zero-initialized globals
          +------------------+
          |     data         |  initialized globals
          +------------------+
          |     text         |  code + read-only data
0x0000000000400000 <-- start of text
```

## 9. The memory technique

**The hook**  
Picture a kitchen: the recipe book (text) never changes, the pre-measured ingredients on the counter (data) are ready, the empty bowls waiting to be filled (BSS) start empty, the shopping trolley you roll around (heap) grows as you add items, and your tiny chopping board (stack) is cleared after every dish.

**What to overlearn**  
- Text is always lowest and read-execute.  
- BSS is zeroed before `main`; data is not.  
- Heap grows up, stack grows down; collision is fatal.

**Spaced-repetition schedule**  
Review the five-segment diagram at 1 day, 3 days, 7 days, 16 days, and 35 days after first study.

**First-principles fallback**  
Re-derive every segment from the four storage durations in the C standard plus the two runtime allocation mechanisms (`malloc`/`brk` versus automatic push/pop).

## 10. What this unlocks
Understanding the five segments lets you reason about buffer overflows, memory protection, linker scripts, and performance of dynamic allocation.  

- Next: position-independent code and the global offset table (GOT).  
- Next: implementing a simple allocator on top of `brk`/`mmap`.  
- Next: using `mprotect` to create guard pages between heap and stack.  
- Next: analysing core dumps with `readelf -l` and `pmap`.

## 11. Self-check — five questions, no answers
1. A 10 MiB global array is declared without an initializer. Which segment grows, and by how many bytes on a 64-bit Linux system?  
2. A function returns the address of a local `int`. After the function returns, which segment no longer guarantees the validity of that address?  
3. You add `const` to a file-scope pointer initialized to a string literal. Does the string move from data to text? Explain.  
4. On an architecture where the stack grows upward, which single inequality in the layout formula must be reversed?  
5. A program calls `malloc(1)` one million times. Which segment’s end address changes, and why might the total virtual memory reported by the OS be far larger than 1 MiB?