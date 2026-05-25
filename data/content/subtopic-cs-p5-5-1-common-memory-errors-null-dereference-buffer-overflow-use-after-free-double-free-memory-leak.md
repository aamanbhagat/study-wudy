## What it is
In C, memory errors are runtime mistakes that occur when a program incorrectly accesses or manages memory. These are not syntax errors caught by the compiler, but logical flaws that violate the rules of how memory is allocated, used, and deallocated, often leading to crashes or security vulnerabilities.

## Why it matters
These errors are the root cause of countless critical system failures and security exploits. In aerospace, a memory leak in flight control software could exhaust memory over a long mission, causing a system failure. In high-performance physics simulations, a buffer overflow could corrupt data, silently invalidating scientific results or crashing a simulation that has run for weeks.

## When to study it
Before tackling this, you must have a firm grasp of the following C concepts:
- **Pointers:** What they are (addresses), how to declare them, dereference them (`*`), and take an address (`&`).
- **Arrays and Pointer Arithmetic:** The equivalence between `a[i]` and `*(a + i)`.
- **Dynamic Memory Allocation:** The function pair `malloc()` and `free()`, and the concept of the heap.
- **The Call Stack:** How local variables and function arguments are stored.

If any of these are weak, review them first. Proceeding without them will lead to confusion.

## How to study it (step by step)
1.  **Review the Stack and Heap:** Draw a diagram of a simple C program's memory. Label the stack (for local variables, grows and shrinks with function calls) and the heap (for dynamically allocated memory). Understand that `malloc` allocates on the heap.
2.  **Code and Debug a Null Dereference:** Write a program that declares a pointer, initializes it to `NULL`, and then tries to write a value to the location it points to (e.g., `*p = 10;`). Compile with debug flags (`-g`) and run it in a debugger like `gdb`. Observe the "segmentation fault" and inspect the pointer's value at the time of the crash.
3.  **Code and Observe a Buffer Overflow:** Write a function with a small local character array (e.g., `char buffer[8];`). Use a function like `strcpy` to copy a string longer than 8 characters into it. Place another local variable after the buffer in your code and print its value before and after the `strcpy` call. Observe how it gets corrupted.
4.  **Code a Use-After-Free and Double Free:** Allocate a block of memory with `malloc`, store a value, `free` it, and then try to read from it again (use-after-free). Then, call `free` on the same pointer a second time (double free). Observe the program's behavior, which may be a crash or simply unpredictable output.
5.  **Code and Detect a Memory Leak:** Write a program with a loop that calls `malloc` on each iteration but never calls `free`. Run this program using a memory-profiling tool like Valgrind (`valgrind --leak-check=full ./your_program`). Analyze the output to see how it pinpoints the exact line where the un-freed memory was allocated.

## Key ideas, with intuition
1.  **Pointers are just addresses.** A pointer is a variable that holds a memory address, which is just an integer. The special value `NULL` (often address `0`) is reserved by the operating system to mean "this pointer points to nothing." Attempting to read from or write to address `0` is an invalid operation that the OS will block, causing a crash (segmentation fault). It's like trying to deliver mail to house number 0 on a street where addresses start at 1.

2.  **Allocation is a lease.** When you call `p = malloc(N)`, you are asking the system to lease you a contiguous block of `N` bytes on the heap. The system gives you the starting address of this block. Your program is only allowed to access memory in the range $[p, p + N - 1]$. Accessing memory outside this range (e.g., `*(p + N)`) is a buffer overflow/underflow, breaking the lease agreement.

3.  **`free()` ends the lease, but doesn't forget the address.** Calling `free(p)` tells the system, "I am done with the memory block at address `p`." The system is now free to lease that memory to another part of your program (or another program). However, the variable `p` itself still contains the old address. A pointer holding an address to memory you no longer own is called a **dangling pointer**. Using it is a **use-after-free** error, and it's dangerous because that memory might now contain completely different data.

## Worked example
Let's demonstrate a classic stack-based buffer overflow. The goal is to see how writing past the end of one variable can corrupt an adjacent variable in memory.

**Code:**
```c
#include <stdio.h>
#include <string.h>

void vulnerable_function() {
    char password_buffer[16];
    int access_granted = 0; // Should remain 0 for unauthorized user

    printf("Enter password: ");
    // A dangerous function that doesn't check buffer size
    gets(password_buffer); 

    if (access_granted != 0) {
        printf("\nAccess Granted!\n");
    } else {
        printf("\nAccess Denied.\n");
    }
}

int main() {
    vulnerable_function();
    return 0;
}
```
*Note: `gets()` is so dangerous it's been removed from modern C standards. We use it here for a clear demonstration.*

**Step-by-step execution and analysis:**

1.  **Function Call:** `vulnerable_function()` is called. The system allocates space on the stack for its local variables. Because they are declared sequentially, `access_granted` and `password_buffer` will likely be placed next to each other in memory. The stack grows "downwards" on x86 architectures, so `password_buffer` will be at a lower memory address than `access_granted`.

2.  **Memory Layout (Before `gets`):**
    ```
    High Memory Address  | ...                 |
                         | access_granted (4 bytes, value=0) |
                         | password_buffer (16 bytes)        |
    Low Memory Address   | ...                 |
    ```

3.  **User Input:** The program prompts for a password.
    - **Scenario A (Normal Input):** The user enters "password". The `gets` function reads this and copies it into `password_buffer`. The string "password" is 8 characters plus a null terminator `\0`, so 9 bytes are written. This fits comfortably within the 16-byte buffer. `access_granted` remains `0`. The output is "Access Denied."

    - **Scenario B (Attack Input):** The user enters a very long string: "AAAAAAAAAAAAAAAAAAAAAAAA". This is 24 'A's.

4.  **The Overflow:** `gets` reads all 24 characters and starts writing them into `password_buffer`.
    - The first 16 'A's fill `password_buffer` completely.
    - `gets` doesn't stop. It continues writing the remaining 8 'A's into the memory immediately following the buffer. This is the memory allocated for the `access_granted` variable.
    - The integer `0` is stored in binary as `00000000 00000000 00000000 00000000`. The character 'A' has an ASCII value of 65, or `01000001` in binary. By writing 'A's over the memory for `access_granted`, we change its value from `0` to a large non-zero number.

5.  **Memory Layout (After Overflow):**
    ```
    High Memory Address  | ...                 |
                         | access_granted (value is now non-zero!) | <-- Corrupted by overflow
                         | password_buffer (filled with 'A's)      |
    Low Memory Address   | ...                 |
    ```

6.  **Final Check:** The `if (access_granted != 0)` condition is now true. The program prints "Access Granted!", even though we never legitimately changed the variable.

**Reflection:** This worked because C provides no built-in protection against writing past the end of an array. The `gets` function blindly writes data to a memory address, and the overflow simply overwrote adjacent data on the stack. This is the fundamental mechanism behind many security exploits.

## Diagrams
Here is the stack layout for the worked example, before and after the buffer overflow.

**Before Overflow:**
```text
          Stack Frame for vulnerable_function()
          (Grows downwards)
      +-----------------------------------------+
      | ... other stack data (return address)   |
      +-----------------------------------------+  <-- High Address
      | access_granted = 0  (4 bytes)           |
      +-----------------------------------------+
      | password_buffer[15]                     |
      | ...                                     |
      | password_buffer[0]  (16 bytes total)    |
      +-----------------------------------------+  <-- Low Address
```

**After Overflow with "AAAAAAAAAAAAAAAAAAAAAAAA":**
```text
          Stack Frame for vulnerable_function()
          (Grows downwards)
      +-----------------------------------------+
      | ... other stack data (return address)   |
      +-----------------------------------------+  <-- High Address
      | access_granted = 0x41414141 ('AAAA')    |  <-- CORRUPTED!
      +-----------------------------------------+
      | password_buffer[15] = 'A'               |
      | ...                                     |
      | password_buffer[0]  = 'A'               |
      +-----------------------------------------+  <-- Low Address
```

## Memory technique — remember this forever
1.  **The "Memory Landlord" Analogy:**
    -   `malloc`: You sign a lease for an apartment (a memory block). The landlord gives you the key (a pointer).
    -   **Null Dereference:** Trying to use key `NULL`. This key doesn't open any apartment; it's an invalid address. Crash.
    -   **Buffer Overflow:** Your apartment has a capacity of 10 people, but you invite 20. They spill into the hallway and the neighbor's apartment, causing chaos.
    -   **Memory Leak:** You move out but never return the key (`free`). The landlord thinks the apartment is still occupied and can't rent it to anyone else. The building slowly runs out of available apartments.
    -   **Use-After-Free:** You return the key, your lease ends, but you kept a copy. You sneak back in later. Someone else might be living there now; your actions are unpredictable and dangerous.
    -   **Double Free:** You return the key. An hour later, you return it again. The landlord's records become corrupted, and they might give the same key to two different new tenants.

2.  **Facts to Overlearn:**
    -   `if (ptr) { /* use ptr */ }` — Always check for `NULL` before dereferencing.
    -   `free(ptr); ptr = NULL;` — After freeing, always nullify the pointer to prevent it from dangling.
    -   `malloc(strlen(str) + 1);` — For strings, always allocate one extra byte for the null terminator `\0`.

3.  **Spaced Repetition Schedule:**
    Review these concepts and the "Memory Landlord" analogy at: 1 day, 3 days, 7 days, 16 days, 35 days. Actively try to write code that causes and then fixes each error during each review.

4.  **First Principles Pathway:**
    If you forget, start here: Memory is a giant array of bytes, indexed by addresses (unsigned integers). A pointer variable stores an address. `malloc(N)` is a system request for the starting address of a free block of `N` consecutive bytes. All memory errors are a misuse of this simple model: using a forbidden address (`NULL`), writing outside your given `N` bytes, or mismanaging the "free" and "in-use" status of your block.

## Common mistakes
-   **Off-by-one errors:** Using `<=` instead of `<` in a loop that accesses an array of size `N`, e.g., `for (int i = 0; i <= N; i++) arr[i] = ...;`. This writes one element past the buffer.
-   **Forgetting the null terminator:** Allocating `malloc(strlen(s))` instead of `malloc(strlen(s) + 1)` for a string `s`, then trying to copy `s` into it. `strcpy` will copy the null terminator and write one byte out of bounds.
-   **Leaking memory in error paths:** A function allocates memory at the beginning, but has an early `return` statement if an error occurs, skipping the `free()` call at the end.
-   **Freeing non-heap memory:** Calling `free()` on a pointer to a local variable (on the stack) or a global variable. `free()` can only be called on pointers returned by `malloc` or its variants.

## Self-check
1.  What is the specific memory error in the following code snippet, and on which line does it occur?
    ```c
    void create_report(int score) {
        char* report_prefix = "Score: ";
        char* report = malloc(strlen(report_prefix));
        strcpy(report, report_prefix);
        // ... more code to finish report
        printf("%s%d\n", report, score);
        free(report);
    }
    ```
2.  The function below is supposed to duplicate a string, but it contains at least three distinct memory-related bugs. Identify and fix them.
    ```c
    char* duplicate_string(char* original) {
        char* new_str = malloc(strlen(original));
        for (int i = 0; i < strlen(original); i++) {
            new_str[i] = original[i];
        }
        return new_str;
    }
    ```
3.  Explain how a use-after-free vulnerability could be more dangerous than a simple memory leak. Describe a hypothetical scenario where freeing memory, having another part of the program re-allocate it, and then using the original dangling pointer could lead to executing attacker-controlled code.