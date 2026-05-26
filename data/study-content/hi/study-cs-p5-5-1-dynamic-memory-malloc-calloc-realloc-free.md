## 1. The one-sentence answer
**Dynamic memory allocation in C lets aap runtime par heap se exact size ki memory maang sakte ho using malloc, calloc, realloc aur usko free kar sakte ho jab kaam khatam ho jaaye.**

Yeh static arrays se alag hai kyunki aapko compile time par size fix nahi karna padta. Jab aapko pata nahi hota kitni jagah chahiye — jaise user input ke hisaab se list banaani ho — tab heap par block maangna padta hai. Har allocated block ka pointer aapke paas rehta hai aur aap usko manage karte ho.

Agar aap free nahi karoge to memory leak ho jaayegi aur program bada hone par crash kar sakta hai. Agar galat pointer free karoge to undefined behaviour aa jaayega.

> [!NOTE]
> Sabse badi aha yeh hai ki C mein aap khud hi memory ke malik ho — compiler aapke liye kuch bhi automatically nahi sambhaalega, isliye har malloc ka ek corresponding free hona zaroori hai.

## 2. Why this matters — concrete and current
Linux kernel ke memory allocator (slab allocator) malloc family ka hi extended version use karta hai taaki high-frequency allocations jaise socket buffers aur task structs ke liye fast aur cache-friendly blocks milein.

TensorFlow aur PyTorch ke C++ backend layers dynamic tensors ke liye realloc ka use karte hain jab batch size badhta hai, taaki har baar naya buffer allocate na karna pade aur GPU-CPU data movement kam ho.

Modern game engines jaise Unreal Engine 5 ke Chaos physics system mein particle systems ke liye realloc ka pattern use hota hai jab explosion ke time particle count badhta hai, bina purane data ko copy kiye bina.

Semiconductor design tools (Synopsys VCS) bade netlists ke liye calloc se zero-initialised memory maangte hain taaki uninitialised read bugs verification ke time pakde ja sakein.

PostgreSQL ke shared buffer manager runtime par shared memory segments ko realloc karke badaata hai jab workload badhta hai, bina server restart kiye.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Pointers             | Allocation functions sirf address return karte hain       |
| sizeof operator      | Block size calculate karne ke liye zaroori                |
| NULL pointer         | Allocation failure detect karne ka standard tareeka       |
| Undefined behaviour  | Double free aur use-after-free samajhne ke liye           |

Agar pointers aur sizeof clear nahi hain to pehle unko revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Heap exists outside your stack frame
Stack par variables function ke khatam hone par automatically gayab ho jaate hain. Heap alag region hai jo program ke poore lifetime tak available rehta hai.

Concrete example: `int x = 5;` stack par hai. Agar aapko 1000 integers chahiye jo function ke baad bhi zinda rahein to heap maangna padega.

Formal statement:  
Heap ek process address space ka contiguous virtual region hai jise `brk`/`sbrk` ya `mmap` system calls ke through badhaaya ja sakta hai.

> [!WARNING]
> Agar aap stack overflow avoid karne ke liye badi arrays heap par daalte ho lekin unko free nahi karte to process ka virtual memory badhta rahega aur OS eventually OOM kill kar dega.

### Step 2 — malloc requests raw bytes
`malloc(size)` heap se `size` bytes ka uninitialised block maangta hai aur uska starting address return karta hai.

Formal:  
```c
void *malloc(size_t size);
```
Agar `size == 0` ya heap mein jagah nahi to `NULL` return hota hai.

### Step 3 — calloc adds zero-initialisation
`calloc(nmemb, size)` `nmemb * size` bytes maangta hai aur har byte ko zero karta hai.

Formal:  
```c
void *calloc(size_t nmemb, size_t size);
```

### Step 4 — realloc grows or shrinks an existing block
`realloc(ptr, new_size)` purane block ko naye size mein badal sakta hai (copy karke agar zaroori ho).

Formal:  
```c
void *realloc(void *ptr, size_t size);
```
Agar `ptr == NULL` to yeh `malloc` jaisa behave karta hai.

### Step 5 — free returns the block to the allocator
`free(ptr)` block ko wapas heap manager ko de deta hai.

Formal:  
```c
void free(void *ptr);
```
`ptr` must wohi address hona chahiye jo allocation function ne diya tha.

### Step 6 — Ownership and lifetime rules
Allocated block ka ownership aapke paas hota hai jab tak aap explicitly free nahi karte. Multiple free ya dangling pointer use karna undefined behaviour hai.

### Step 7 — Textbook-grade contract
Allocation functions ya to valid pointer dete hain ya `NULL`. Valid pointer ko sirf ek baar free kar sakte ho. Realloc failure par purana pointer valid rehta hai.

## 5. Worked examples — har step show karo

**Example 1 — Single integer on heap**  
*Given:* Ek integer dynamically store karna hai.  
*Find:* Pointer aur uski value.  

```c
int *p = malloc(sizeof(int));
if (p != NULL) *p = 42;
```
Why: `sizeof(int)` exact bytes maangta hai taaki portable rahe.  
**Final answer:** `p` ek valid heap address hold karta hai jisme 42 stored hai.  

*Reflection:* Yeh sabse simple case hai; yahan galti sirf NULL check bhoolne mein ho sakti hai.

**Example 2 — Array of 100 integers with calloc**  
*Given:* Zero-initialised array chahiye.  
*Find:* Proper calloc call.  

```c
int *arr = calloc(100, sizeof(int));
```
Why: `calloc` har element zero karta hai jo counting arrays ke liye safe hai.  
**Final answer:** `arr[0]` se `arr[99]` tak sab zero.  

*Reflection:* Agar `malloc` use karte to alag se loop se zero karna padta.

**Example 3 — Growing an array with realloc**  
*Given:* 5 elements ka array hai, ab 10 chahiye.  
*Find:* Safe realloc pattern.  

```c
int *new_arr = realloc(arr, 10 * sizeof(int));
if (new_arr != NULL) arr = new_arr;
```
Why: Direct `arr = realloc(...)` mat karo kyunki failure par purana pointer kho jaayega.  
**Final answer:** `arr` ab 10 elements hold kar sakta hai.  

*Reflection:* Yeh step real programs mein sabse zyada galti hoti hai.

**Example 4 — Full allocate-use-free cycle**  
*Given:* Ek string dynamically banao aur print karo.  
*Find:* Leak-free code.  

```c
char *s = malloc(6);
if (s) {
    strcpy(s, "hello");
    puts(s);
    free(s);
}
```
Why: `free` ke baad pointer ko NULL karna optional lekin achha practice hai.  
**Final answer:** Memory block successfully release ho gaya.  

*Reflection:* Har allocation ka ek free must dikhe code review mein.

## 6. Common traps and how to avoid them

| Trap                    | Why it happens                          | How to avoid it                          |
|-------------------------|-----------------------------------------|------------------------------------------|
| Forgetting free         | Programmer assumes OS will clean up     | Har malloc ke saath ek free likho        |
| Using after free        | Pointer abhi bhi purana address hold karta hai | Free ke turant baad pointer = NULL       |
| realloc without check   | Failure par purana pointer overwrite    | Hamesha temporary pointer use karo       |
| sizeof wrong type       | `malloc(100)` instead of `sizeof(int)`  | `sizeof(*ptr)` pattern follow karo       |
| Double free             | Same pointer do baar free               | Free ke baad NULL assign karo            |
| NULL dereference        | Allocation fail check nahi kiya         | Har allocation ke baad if (ptr) check    |
| Mismatched size         | realloc mein purana size galat          | Size ko alag variable mein store rakho   |

## 7. The textbook-precise statement
From Kernighan and Ritchie, *The C Programming Language*, 2nd edition, §7.8:

> The functions `malloc`, `calloc`, `realloc` and `free` provide a simple but effective dynamic memory allocator. `malloc(n)` returns a pointer to n bytes of uninitialised storage or NULL if the request cannot be satisfied. `calloc(n, size)` returns a pointer to enough storage for an array of n objects each of size bytes, initialised to zero. `realloc(p, n)` changes the size of the block pointed to by p to n bytes, preserving its contents if possible, and returns a pointer to the new block or NULL. `free(p)` releases the block pointed to by p for reuse; the behaviour is undefined if p is NULL or has already been freed.

## 8. Visual — diagram or schematic
```
Stack                  Heap
+-------------+        +-------------------+
| main()      |        | 0x1000: malloc(20)|
|   int *p    |------->| ... data ...      |
|             |        |                   |
|             |        | 0x2000: free()    |
+-------------+        +-------------------+
```
Label: Arrow shows pointer from stack variable to heap block. Free ke baad woh block allocator ke control mein wapas chala jaata hai.

## 9. The memory technique

**The hook**  
Socho ek kiraye ka ghar (heap) jisme aap temporary room maangte ho (malloc) aur jab kaam khatam ho jaaye to chaabi wapas kar dete ho (free). Ghar malik (OS) kabhi khud nahi aata.

**What to overlearn**  
1. `void *p = malloc(n * sizeof(*p));`  
2. Allocation ke turant baad NULL check.  
3. Har allocation ka ek free.

**Spaced-repetition schedule**  
Review after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Agar yaad na rahe to yaad rakho: heap ek shared pool hai, aapko khud manage karna hai. Allocation maango, pointer store karo, kaam khatam hone par wapas do.

## 10. What this unlocks
Dynamic memory aapko linked lists, trees, hash tables aur vectors jaise data structures banana seekhaata hai jo compile-time size nahi jaante.

- Next: Implementing a resizable vector in C  
- Next: Custom memory pools for performance-critical code  
- Next: Understanding arena allocators used in game engines

## 11. Self-check — five questions, no answers
1. Agar `malloc(0)` call karo to kya return hota hai aur kyun?  
2. `realloc(NULL, 100)` aur `malloc(100)` mein kya farak hai?  
3. Ek array ko double size karne ke liye realloc ka sahi pattern likho.  
4. Kyun `free(p); free(p);` undefined behaviour hai?  
5. Agar `calloc` ki jagah `malloc` + manual zeroing use karo to performance aur safety mein kya trade-off hai?