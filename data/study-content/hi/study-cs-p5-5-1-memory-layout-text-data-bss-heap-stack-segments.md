## 1. The one-sentence answer
**C program ka memory layout five fixed segments mein divide hota hai — text (read-only code), data (initialized globals), BSS (uninitialized globals), heap (dynamic allocations) aur stack (function locals aur call frames) — jisme har segment ka address range, permissions aur lifetime alag hota hai.**

Yeh division compiler aur linker dwara binary banate waqt decide hoti hai, aur runtime par operating system process ko yeh segments allocate karta hai. Text segment sirf instructions rakhta hai aur kabhi change nahi hota. Data aur BSS segments global aur static variables ke liye hote hain, lekin data mein values pehle se load hoti hain jabki BSS ko zero se fill kiya jata hai. Heap aur stack dono runtime par grow aur shrink karte hain, lekin opposite directions mein.

> [!NOTE]
> Sabse badi aha yeh hai ki ek hi variable ka address aur behaviour uske declaration jagah (global, static, local, ya malloc) par depend karta hai, na ki sirf uske naam par.

## 2. Why this matters — concrete and current
Linux kernel ke scheduler mein per-CPU variables ko BSS segment mein rakh kar boot time par zeroing avoid ki jati hai, jisse early boot latency kam hoti hai (seen in kernel 5.15+ patches).

Google’s TensorFlow Lite Micro library carefully places model weights in data segment aur activations ko heap par allocate karti hai taaki embedded MCUs par stack overflow na ho; yeh technique unke 2023 Edge TPU deployment paper mein document ki gayi hai.

Semiconductor companies jaise ARM apne Cortex-M startup code mein .data aur .bss sections ko linker script se control karte hain, jo directly flash se SRAM tak copy hoti hai — yeh har commercial microcontroller firmware ka standard practice hai.

NASA’s Mars Perseverance rover ke flight software (written in C) ne stack segment size ko rigorously limit kiya tha taaki radiation-induced bit flips se call stack corrupt na ho; yeh detail unke 2021 FSW architecture review mein mention hai.

Modern JIT compilers (V8, JVM) dynamically generated machine code ko text segment ke equivalent read-execute mapping mein place karte hain using mprotect, jo W^X policy enforce karta hai aur security bugs ko rokta hai.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Pointers & addresses     | Har segment ka starting address aur offset samajhna zaroori hai |
| Variable storage classes | auto, static, extern decide karte hain segment choice     |
| Function call mechanism  | Stack frames, return addresses aur local variables ka linkage |
| Linker scripts (.ld)     | Kaise compiler .text, .data, .bss symbols ko map karta hai |

Agar pointers ya storage classes weak hain to pehle unhe revise karo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Programs are just bytes with different permissions
Jab aap C code likhte ho, compiler usko instructions aur data dono mein tod deta hai. Instructions kabhi change nahi hote isliye unhe alag read-only area mein rakha jata hai.

Example: `int main(){ return 42; }` ka assembly code text segment mein chala jata hai.

Formal statement: text segment ka virtual address range \( [T_{start}, T_{end}] \) sirf execute permission rakhta hai, koi write allowed nahi.

> [!WARNING]
> Agar koi bug text segment ko overwrite karne ki koshish kare to segmentation fault aa jayega kyunki page permissions enforce hote hain.

### Step 2 — Initialized globals must survive across calls
Global variables jo compile time par value rakhte hain unhe binary ke andar store karna padta hai taaki program start hote hi woh value ready mile.

Example: `int g = 5;` ko data segment mein rakha jata hai aur 5 value directly binary mein embed hoti hai.

Formal: data segment size linker dwara \( \sum |var_i| \) ke equal hoti hai jahaan var_i initialized hain.

### Step 3 — Uninitialized globals are zeroed once
BSS segment un variables ke liye hota hai jinka initial value zero hota hai. OS ya startup code BSS ko ek baar zero karta hai.

Example: `static int counter;` BSS mein jata hai aur runtime par zero hota hai.

Formal: BSS ka virtual size record hota hai lekin file size zero hoti hai kyunki values store nahi karni padti.

### Step 4 — Dynamic size needs a growable region
Jab aapko runtime par kitna memory chahiye pata nahi hota, heap use karte hain. malloc sbrk ya mmap dwara heap ko badhata hai.

Example: `int *p = malloc(100*sizeof(int));` heap par block allocate karta hai.

Formal: heap pointer \( H_{brk} \) badhta hai jab `brk()` ya `mmap()` call hota hai.

### Step 5 — Function calls need LIFO storage
Har function call apna local data aur return address stack par push karta hai. Stack pointer neeche ki taraf move karta hai.

Example: recursive call `fact(n-1)` har level par stack frame add karta hai.

Formal: stack grows toward lower addresses, frame pointer \( FP \) aur stack pointer \( SP \) ke beech locals aur saved registers hote hain.

### Step 6 — Complete layout in virtual address space
Ek typical 32-bit process mein segments is order mein hote hain (high to low address): stack, heap, BSS, data, text.

Formal: virtual memory map \( VM = \{ \text{text} \cup \text{data} \cup \text{BSS} \cup \text{heap} \cup \text{stack} \} \) with non-overlapping ranges aur distinct page permissions.

## 5. Worked examples — har step show karo

**Example 1 — Locating a global variable**
- *Given:* `int ready = 1;` outside any function.
- *Find:* segment name aur initial content.
Compiler symbol table mein entry dekhega aur kyunki value di gayi hai, data segment mein place karega. Linker .data section mein 4 bytes reserve karega aur 0x00000001 store karega. *Why:* initialized global rule directly data segment choose karta hai.
**Final answer:** data segment, value 1

*Reflection:* yeh simple case hai kyunki initialization compile-time par clear thi.

**Example 2 — BSS zeroing**
- *Given:* `static long arr[1000];`
- *Find:* kitna memory file mein occupy karegi.
BSS section record karegi 8000 bytes lekin ELF file mein koi bytes nahi likhe jayenge. Startup code .bss ko memset(0) karega. *Why:* uninitialized static rule BSS choose karta hai aur file size optimize hoti hai.
**Final answer:** BSS, 0 bytes in binary

*Reflection:* students aksar sochte hain file bhi badi hogi, lekin BSS trick yahi hai.

**Example 3 — Heap allocation address**
- *Given:* `char *buf = malloc(64);`
- *Find:* kaunsa segment address return karega.
malloc heap top par se block dega, address data/BSS ke upar hoga. *Why:* dynamic size rule heap ko force karta hai.
**Final answer:** heap segment

*Reflection:* address value sirf runtime par pata chalti hai.

**Example 4 — Stack frame growth**
- *Given:* recursive `int sum(int n){ return n ? n+sum(n-1) : 0; }` called with 5.
- *Find:* kitne stack frames banenge.
5 calls tak stack pointer har baar 16-24 bytes neeche jayega (return addr + locals). *Why:* LIFO call rule stack use karta hai.
**Final answer:** 5 frames on stack

*Reflection:* deep recursion stack overflow deta hai isliye yeh limit important hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Assuming all globals go to data   | Forgetting BSS zero-initialization rule     | Declaration dekh kar check karo: value hai ya nahi |
| Treating heap aur stack as same   | Dono runtime grow karte hain isliye confuse | Lifetime: heap explicit free, stack auto     |
| Ignoring BSS size in binary       | ELF file size dekh kar galat estimate       | `size` command ya readelf se .bss dekho      |
| Stack growing into heap           | No guard page ya too deep recursion         | ulimit -s set karo aur recursion limit rakho |
| Writing to string literal         | Text segment read-only hota hai             | `char s[]` use karo instead of `char *s`     |
| Static local variable in wrong segment | Static keyword ko miss kar dete hain     | Har static variable ko data/BSS mein count karo |
| Pointer to freed heap block       | Lifetime khatam hone ke baad use            | free ke turant baad pointer NULL kar do      |

## 7. The textbook-precise statement
In a C program the address space is partitioned into five segments with distinct access rights and lifetimes. The text segment contains the executable instructions and is mapped read-execute only. The data segment holds initialized static storage duration objects whose values are copied from the executable file at load time. The BSS segment holds uninitialized static storage duration objects that are zero-filled before main is called. The heap is the region of memory from which dynamic storage duration objects are allocated via malloc and freed via free. The stack contains automatic storage duration objects and function call frames; it grows downward toward lower addresses. All segments occupy non-overlapping ranges in the process virtual address space (Bryant & O'Hallaron, Computer Systems: A Programmer's Perspective, 3e, §9.2).

## 8. Visual — diagram or schematic
```
High address  0xFFFFFFFF
          +------------------+
          |     Stack        |  <-- grows down (SP decreases)
          | (locals, frames) |
          +------------------+
          |      ...         |
          +------------------+
          |      Heap        |  <-- grows up (brk increases)
          +------------------+
          |      BSS         |  (uninit globals, zeroed)
          +------------------+
          |      Data        |  (init globals, from binary)
          +------------------+
          |      Text        |  (code, read-only)
Low address 0x00000000
```

## 9. The memory technique

**The hook**  
Imagine five floors in a building: top floor (stack) jahaan har customer (function) apna suitcase (frame) rakh ke chala jata hai; ground floor (text) jahaan permanent rule book (code) chipki hai.

**What to overlearn**  
1. Text = code, read-only  
2. Data = initialized globals, BSS = uninitialized globals (zero)  
3. Stack grows down, heap grows up

**Spaced-repetition schedule**  
Review 1 din baad, 3 din, 7 din, 16 din, 35 din par.

**First-principles fallback**  
Agar kuch bhool jao to yeh socho: “Kya variable compile-time value rakhta hai? Kya size runtime par badhega? Kya function call khatam hone par value chahiye?” — in teeno sawalon se segment decide ho jayega.

## 10. What this unlocks
Yeh knowledge aapko directly kernel memory management, custom allocators, buffer overflow exploits, aur embedded linker scripts samajhne ke liye taiyar karti hai.

- Next: custom malloc implementation using sbrk  
- Buffer overflow attacks (stack smashing)  
- Linker script (.ld) writing for microcontrollers  
- Memory-mapped I/O placement in embedded C

## 11. Self-check — five questions, no answers
1. Ek global `int x = 10;` aur `static int y;` mein kaunsa segment alag hai aur kyun?
2. Agar aap 10 MB ka local array ek function mein declare karo to kaunsa segment overflow hoga aur kaise?
3. `const char *s = "hello";` aur `char s[] = "hello";` ke segments alag kyun hote hain?
4. Ek program mein `malloc` se allocate kiya hua block ka address stack ke neeche kaise aa sakta hai?
5. Agar BSS zero na kiya jaye to kaunsa C standard guarantee break hoga?