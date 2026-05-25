## What it is
The GNU Debugger (GDB) is an interactive tool that lets you run another program under controlled conditions. It allows you to pause the program's execution at specific points, inspect the state of its memory and variables, and trace the flow of control through its functions. It is a "source-level" debugger, meaning it maps the running machine code back to the original source code you wrote.

## Why it matters
In complex scientific computing—like simulating orbital mechanics, solving partial differential equations for fluid dynamics, or debugging numerical instabilities in a machine learning model—`printf` statements are insufficient. GDB allows you to freeze a simulation at the exact moment a physical quantity like velocity becomes `NaN` (Not a Number) and inspect the entire program state that led to the invalid calculation. For embedded systems in aerospace, GDB (often cross-compiling) is the primary tool for debugging flight control software running on hardware, where you can't just print to a console.

## When to study it
Before using GDB, you must be comfortable with:
1.  **C or C++ Programming:** You need a program to debug. You should understand functions, pointers, scope, and basic data structures.
2.  **Compilation with GCC/Clang:** You must know how to compile a program from the command line and, crucially, how to include debugging symbols using the `-g` flag. Without this flag, GDB's output is nearly useless.
3.  **The Call Stack:** You should have a mental model of how function calls are pushed onto a stack and popped off when they return.

If you are not comfortable with these, pause and review them first.

## How to study it (step by step)
1.  **Create and Compile:** Write a simple C program with at least two functions. For example, a `main` function that calls a `calculate_sum` function which contains a loop. Compile it with debugging symbols: `gcc -g -o my_program my_program.c`.
2.  **Start and Break:** Start GDB by running `gdb ./my_program`. The program is loaded but not yet running. Set a breakpoint at the first line of your `main` function using the command `break main` (or `b main`).
3.  **Run and Inspect:** Start the program with `run` (or `r`). It will immediately stop at the breakpoint you set. Use `print <variable_name>` (or `p <variable_name>`) to inspect the initial values of your variables. They will likely be uninitialized garbage.
4.  **Step Over:** Use the `next` command (or `n`) to execute the current line and move to the next one. If the current line is a function call, `next` executes the entire function and stops on the line *after* the call. Use `n` to step over a few lines of code, printing variables after each step to see how they change.
5.  **Step Into:** Restart the program with `run`. When you reach the line that calls `calculate_sum`, use the `step` command (or `s`). This time, you will jump *into* the `calculate_sum` function, stopping at its first line. This is the key difference between `next` and `step`.
6.  **Examine the Stack:** Inside `calculate_sum`, use the `backtrace` command (or `bt`). It will show you the call stack: frame #0 is your current function (`calculate_sum`), and frame #1 is the function that called it (`main`). This tells you "how you got here."
7.  **Set a Watchpoint:** Identify a variable inside your loop. Set a watchpoint on it with `watch <variable_name>`. Use the `continue` (or `c`) command to let the program run freely. It will now stop automatically every time the value of that variable changes, allowing you to catch unintended modifications.

## Key ideas, with intuition
1.  **Breakpoints are intentional stops.** Think of a breakpoint as a red light you place in your code. The program executes at full speed until it hits that line, then halts and gives you control. You can set them on function names (`b my_func`) or specific line numbers (`b my_file.c:42`).
2.  **`next` vs. `step` is about abstraction levels.** When you are at a function call `f(x)`, you have a choice.
    *   `next`: Treat `f(x)` as a black box. You don't care *how* it works, only that it executes and you can see the result. You step *over* it.
    *   `step`: You suspect the bug is inside `f(x)`. You want to zoom in and examine its internal workings. You step *into* it.
3.  **Watchpoints are data-driven stops.** A breakpoint is location-based; a watchpoint is data-based. You don't say "stop at line 55." You say "stop whenever the variable `pressure` changes." This is incredibly powerful for finding where a variable is being corrupted, as the program will break precisely on the line of code that caused the change.
4.  **Backtrace is your history.** The call stack is the sequence of nested function calls that led to your current location. `backtrace` simply prints this stack. The top of the stack (frame 0) is where you are now. The bottom (highest frame number) is almost always `main`. It answers the question, "What is the chain of function calls that brought me to this point?"

## Worked example
Let's debug a program with a logic error. The program is supposed to calculate the sum of squares $S = \sum_{i=1}^{N} i^2$, but it's giving the wrong answer.

**`buggy_sum.c`**
```c
#include <stdio.h>

int sum_squares(int n) {
    int total = 0;
    for (int i = 0; i <= n; i++) { // Bug is here: should be i=1
        total += i * i;
    }
    return total;
}

int main() {
    int N = 3;
    int result = sum_squares(N);
    // For N=3, we expect 1^2 + 2^2 + 3^2 = 1 + 4 + 9 = 14
    printf("Sum of squares up to %d is %d\n", N, result);
    return 0;
}
```

**Debugging Session:**

1.  **Compile with debug symbols.**
    ```bash
    $ gcc -g -o buggy_sum buggy_sum.c
    ```

2.  **Run the program to see the error.**
    ```bash
    $ ./buggy_sum
    Sum of squares up to 3 is 14
    ```
    Wait, the example worked for N=3. Let's change `N` to `2` in the code. We expect $1^2+2^2=5$. Recompile and run.
    ```bash
    $ ./buggy_sum
    Sum of squares up to 2 is 5
    ```
    The bug is subtle. Let's re-read the code. The loop runs from `i = 0` to `n`. For $N=3$, it calculates $0^2+1^2+2^2+3^2 = 14$. For $N=2$, it calculates $0^2+1^2+2^2=5$. The formula is supposed to start from 1. The bug is that the loop includes `i=0`. Let's pretend we didn't spot this by eye and use GDB.

3.  **Start GDB and set a breakpoint.** We want to see what happens inside the loop.
    ```bash
    $ gdb ./buggy_sum
    (gdb) b sum_squares
    Breakpoint 1 at 0x1169: file buggy_sum.c, line 4.
    ```

4.  **Run the program.** It will stop at the beginning of our function.
    ```bash
    (gdb) run
    Starting program: /path/to/buggy_sum

    Breakpoint 1, sum_squares (n=2) at buggy_sum.c:4
    4	    int total = 0;
    ```

5.  **Step and watch the loop.** Let's set a breakpoint inside the loop and watch the variables `i` and `total`.
    ```bash
    (gdb) b 6
    Breakpoint 2 at 0x1182: file buggy_sum.c, line 6.
    (gdb) c
    Continuing.

    Breakpoint 2, sum_squares (n=2) at buggy_sum.c:6
    6	        total += i * i;
    ```
    Now we are at the start of the first loop iteration. Let's inspect `i`.
    ```bash
    (gdb) p i
    $1 = 0
    ```
    **Reflection:** This is the "aha!" moment. We expected the loop to start with `i=1`, but it's starting at `i=0`. We've found the source of our logic error. The loop condition `i = 0` is incorrect for this specific formula.

6.  **Confirm the rest of the loop.**
    ```bash
    (gdb) c
    Continuing.

    Breakpoint 2, sum_squares (n=2) at buggy_sum.c:6
    6	        total += i * i;
    (gdb) p i
    $2 = 1
    (gdb) p total
    $3 = 0
    (gdb) c
    Continuing.

    Breakpoint 2, sum_squares (n=2) at buggy_sum.c:6
    6	        total += i * i;
    (gdb) p i
    $4 = 2
    (gdb) p total
    $5 = 1
    ```
    **Reflection:** Each step confirmed our hypothesis. We used a breakpoint (`b`) to get to the area of interest, `run` (`r`) to start, `continue` (`c`) to jump between loop iterations, and `print` (`p`) to inspect the state. This systematic process revealed the faulty loop initialization.

## Diagrams
**Call Stack for `backtrace`**

Imagine `main` calls `func_A`, which then calls `func_B`. When you are stopped inside `func_B` and run `bt`:

```text
       Stack Growth Direction
             |
             V
+-------------------------+
| Stack Frame for func_B  |  <-- Frame 0 (Current Location)
| (local vars: z, etc.)   |
+-------------------------+
| Stack Frame for func_A  |  <-- Frame 1
| (local vars: y, etc.)   |
+-------------------------+
| Stack Frame for main    |  <-- Frame 2
| (local vars: x, etc.)   |
+-------------------------+
| ...                     |
```

**`next` vs. `step`**

```text
Your Code:
10: x = 5;
11: y = my_function(x);  <-- You are here
12: z = y + 1;

Command -> Path
-----------------------------------------------------------------
'next'  -> Executes line 11 completely, stops at line 12.
           (Stays in the same function)

'step'  -> Enters 'my_function', stops at the first line inside it.
           (Moves down one level in the call stack)
```

## Memory technique — remember this forever
1.  **The Detective Analogy:**
    *   You are a detective, and the bug is the culprit.
    *   **GDB** is your detective kit.
    *   **Breakpoints (`b`)** are stakeouts. You tell GDB, "Wait at this address (line number) and tell me when the code gets here."
    *   **Watchpoints (`watch`)** are tripwires. You say, "This piece of evidence (variable) is critical. Let me know the instant anyone modifies it."
    *   **`next` and `step` (`n`/`s`)** are how you tail the suspect. `next` follows them from building to building. `step` follows them *inside* a building.
    *   **Backtrace (`bt`)** is reviewing the case file. It shows the sequence of events (function calls) that led to the current scene.
    *   **Print (`p`)** is interrogating a witness (inspecting a variable).

2.  **Must Overlearn Commands:**
    *   `b <location>`: Set **b**reakpoint. Location can be `function_name` or `file.c:line_number`.
    *   `r`: **R**un the program.
    *   `n`: Go to the **n**ext line (don't enter functions).
    *   `s`: **S**tep into the next line (enter functions).
    *   `bt`: Show the **b**ack**t**race (call stack).
    *   `p <expression>`: **P**rint the value of an expression.
    *   `watch <expression>`: Stop when the expression's value changes.

3.  **Spaced Repetition Schedule:**
    *   Practice these commands today.
    *   Review in 1 day: Re-do the worked example from memory.
    *   Review in 3 days: Debug a new, small program you write.
    *   Review in 7 days: Debug a program with pointers and structs.
    *   Review in 16 days: Explain the detective analogy to a rubber duck.
    *   Review in 35 days: Use GDB on a piece of code you haven't seen before.

4.  **First Principles Pathway:** If you forget a command, state your intent in plain English. The GDB command is almost always a direct abbreviation.
    *   "I need to *break* execution." -> `break`
    *   "I want to *print* this variable." -> `print`
    *   "How did I get here? Trace it *back*." -> `backtrace`
    *   "I want to continue until the next breakpoint." -> `continue`

## Common mistakes
1.  **Forgetting `-g`:** Compiling with `gcc my_program.c` instead of `gcc -g my_program.c`. The program will run in GDB, but you won't see source code, line numbers, or variable names. GDB will only show you raw memory addresses and assembly instructions.
2.  **Using `step` on library functions:** Accidentally using `s` on a line like `printf("hello");`. You will dive deep into the C standard library implementation details, which is confusing and rarely what you want. Use `n` for library calls unless you are an expert. If you get lost, use `finish` to execute the rest of the current function and return to the caller.
3.  **Setting a watchpoint on an out-of-scope variable:** If you set `watch my_var` in `main`, but then `step` into a function where `my_var` doesn't exist, the watchpoint will be deleted. Watchpoints are context-sensitive.
4.  **Confusing `run` and `continue`:** `run` starts the program from the very beginning (optionally with new arguments). `continue` resumes execution from wherever it is currently paused. Using `run` when you mean `continue` will restart your whole debugging session.

## Self-check
1.  You have a C++ program with a critical physics calculation inside a function named `propagate_state_vector`. How do you command GDB to run the program and stop execution precisely at the beginning of that function?
2.  You are paused on the line `Matrix C = multiply(A, B);`. You are confident that matrices `A` and `B` are correct, but you suspect the `multiply` function is buggy. Which GDB command (`step` or `next`) do you use to investigate, and why?
3.  In a large simulation, a variable `double kinetic_energy` is correctly calculated as `4500.0` at the start of a time step, but by the end of the 1,000-line function, it has been corrupted to `-1.0e-9`. You have no idea which of the 1,000 lines is responsible. What is the single most efficient GDB command you can use to find the exact line of code that corrupts the value? Provide the full command.