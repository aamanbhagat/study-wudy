## 1. The one-sentence answer
**A stack is a linear data structure that enforces last-in-first-out (LIFO) access, exposing only push, pop, and peek operations at one end.**

Picture a narrow tube that holds plates. You can place a plate only on top and remove only the top plate; any attempt to reach a lower plate first violates the tube’s physical constraint. The same rule governs every element added to or removed from a stack: the most recently inserted element must be the first one retrieved. This single ordering rule produces every property that follows.

In code the rule appears as three primitive actions. Push inserts an element at the sole accessible end and becomes the new top. Pop removes and returns the current top. Peek returns the top without removing it. All other positions remain unreachable until every element above them has been popped.

> [!NOTE]
> The LIFO discipline is not a performance trick; it is an invariant that guarantees every sequence of operations remains consistent with the ordering of insertion, which is exactly why stacks model recursion, undo histories, and expression evaluation without extra bookkeeping.

## 2. Why this matters — concrete and current
The Java Virtual Machine maintains a call stack for every thread; each method invocation pushes a frame containing local variables and the return address, and each return pops that frame. A stack overflow error occurs precisely when this structure exceeds its allocated depth.

Compilers such as LLVM and GCC use an explicit operator stack while converting infix expressions to postfix during syntax analysis; the same stack later drives code generation for arithmetic expressions on register-poor architectures.

Modern web browsers store navigation history in a stack so that the Back button always returns to the most recent prior page; forward navigation after a Back click simply pops the reverse stack.

Undo/redo buffers inside editors such as Vim and Microsoft Word are stacks of delta objects; each edit pushes a reversible change, and Ctrl-Z repeatedly pops the most recent delta.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| One-dimensional array    | Supplies contiguous random-access storage for one implementation |
| Singly-linked list       | Supplies dynamic node allocation for the alternative implementation |
| Reference / pointer      | Required to link nodes or to track the top index          |
| Constant-time access     | Needed to verify that push and pop remain O(1)            |

## 4. Building the idea — from intuition to formalism

### Step 1 — LIFO ordering
A linear collection becomes a stack exactly when the only permissible removal order is the reverse of the insertion order.  
Concrete example: inserting A then B then C must allow removal only in the sequence C, B, A.  
Formally, if \(\sigma = x_1 x_2 \dots x_n\) is the sequence of insertions, every legal pop sequence is a permutation \(\pi\) satisfying the stack permutation condition: there is no triple \(i < j < k\) such that \(\pi\) contains \(x_j, x_k, x_i\) in that order.  
> [!WARNING]  
> Treating the structure as a queue (permitting removal from the opposite end) immediately destroys the LIFO invariant and produces incorrect results for every algorithm that depends on reversal.

### Step 2 — The three core operations
Only three methods are exposed: push inserts at the accessible end, pop removes and returns the element at that end, and peek returns the element without removal.  
Example: after push(5), push(7), peek returns 7 while the structure still contains both elements.  
Let \(S\) be the abstract stack; the axioms are  
\[
\text{pop}(\text{push}(x,S)) = x, \qquad \text{peek}(\text{push}(x,S)) = x.
\]
> [!WARNING]  
> Exposing an internal index or iterator that allows direct access to non-top elements silently violates the contract and permits clients to break LIFO ordering.

### Step 3 — Array-backed implementation
Allocate a fixed-capacity array and maintain an integer `top` that indexes the current top element. Push writes at `top+1` and increments; pop decrements and returns the value.  
Example: array `[_,_,_,_]` with `top = -1`; push(4) yields `[4,_,_,_]` and `top = 0`.  
Capacity \(C\) yields  
\[
\text{push cost} = O(1),\quad\text{pop cost} = O(1)
\]
provided no resize occurs.  
> [!WARNING]  
> Forgetting to check `top == C-1` before push produces an out-of-bounds write that corrupts adjacent memory.

### Step 4 — Linked-list-backed implementation
Each node stores a value and a pointer to the node beneath it. The stack reference points to the top node. Push creates a new node whose next pointer targets the old top; pop follows the next pointer and discards the old top.  
Example: top \(\to\) 7 \(\to\) 5 \(\to\) null; pop returns 7 and leaves top \(\to\) 5.  
Both operations remain \(O(1)\) because only the head pointer is mutated.  
> [!WARNING]  
> Losing the pointer to the node below the top (e.g., by overwriting without saving it) produces a memory leak or an unreachable chain of nodes.

### Step 5 — Complexity and growth policy
Array implementations amortize resizing to \(O(1)\) per operation by doubling capacity when full. Linked-list implementations pay an extra pointer per element but never resize.  
The textbook statement of efficiency follows directly: every stack operation executes a constant number of primitive steps independent of the number of elements currently stored.

## 5. Worked examples — every step shown

**Example 1 — Basic push/pop sequence**  
*Given:* empty stack \(S\).  
*Find:* state after push(1), push(2), pop().  
Step 1: push(1) places 1 at top. *Why:* top is the only legal insertion site.  
Step 2: push(2) places 2 above 1. *Why:* newest element becomes new top.  
Step 3: pop() returns 2 and restores 1 as top. *Why:* LIFO requires the most recent element to be removed first.  
**2**  
*Reflection:* The example isolates the reversal property without implementation details.

**Example 2 — Peek versus pop**  
*Given:* stack containing [3,1] (3 on top).  
*Find:* result of peek followed by pop.  
Step 1: peek returns 3, structure unchanged. *Why:* peek reads without mutating top.  
Step 2: pop returns 3, top becomes 1. *Why:* pop both reads and removes.  
**3 then 3**  
*Reflection:* Demonstrates that peek is a pure query while pop is a mutator.

**Example 3 — Array implementation trace**  
*Given:* array of capacity 4, top = −1.  
*Find:* array contents and top after push(9), push(4), pop().  
Step 1: write 9 at index 0, top = 0. *Why:* top + 1 is the next free slot.  
Step 2: write 4 at index 1, top = 1. *Why:* each push advances the index by one.  
Step 3: read index 1 (=4), top = 0. *Why:* pop decrements after returning the value.  
**[9,4,_,_], top=0**  
*Reflection:* Shows index arithmetic that must be maintained exactly.

**Example 4 — Detecting stack permutation**  
*Given:* insertion order 1 2 3, candidate pop order 3 1 2.  
*Find:* whether the order is legal.  
Step 1: push 1, push 2, push 3 (top = 3). *Why:* all pushes precede any pop in this prefix.  
Step 2: pop 3 (legal). *Why:* 3 is current top.  
Step 3: next required pop is 1, yet top is now 2. *Why:* 2 was pushed after 1, so 1 cannot be reached before 2.  
Illegal.  
*Reflection:* The forbidden 2-1-3 pattern appears; the test generalizes to any input sequence via the same simulation.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using pop to obtain top without removing | Confusing peek with pop semantics           | Always call peek when removal is undesired   |
| Off-by-one top index in array     | Starting top at 0 instead of −1             | Initialise top = −1 and test before every access |
| Memory leak in linked-list pop    | Not freeing the detached node               | Explicitly null the next pointer of the removed node |
| Resizing array without copying    | Allocating new array but losing old data    | Copy every element before updating the reference |
| Allowing direct array access      | Exposing the internal array reference       | Keep the array private and expose only the three operations |
| Integer overflow on size counter  | Using 32-bit counter for more than 2^31 elements | Use 64-bit counters or size_t                |
| Assuming linked list is always faster | Ignoring cache effects of pointer chasing   | Benchmark both implementations on target hardware |

## 7. The textbook-precise statement
A stack is an abstract data type whose values are sequences of elements and whose operations satisfy the axioms  
\[
\text{pop}(\text{push}(x,s)) = x, \qquad \text{pop}(\text{push}(x,s)) \text{ leaves } s, \qquad \text{peek}(\text{push}(x,s)) = x
\]  
for every element \(x\) and every stack \(s\). Both array-based and linked-list-based realizations achieve \(O(1)\) worst-case time for each operation (amortized for array growth). See Cormen et al., *Introduction to Algorithms*, 4e, Chapter 10, Section 10.1.

## 8. Visual — diagram or schematic
```
Array implementation          Linked-list implementation
Index:  0  1  2  3            top
        [9][4][ ][ ]           │
         ↑                     ▼
       top=1                 ┌───┐   ┌───┐
                             │ 4 │──▶│ 9 │──▶ null
                             └───┘   └───┘
```
The left diagram shows contiguous storage with an integer cursor; the right diagram shows nodes linked by pointers with the top reference always at the head.

## 9. The memory technique
**The hook** — Imagine a single-serving cafeteria plate dispenser: each new plate is forced on top of the previous one; gravity guarantees you can take only the top plate.  
**What to overlearn** — push inserts at top, pop removes from top, both are O(1); array uses an index, list uses a head pointer.  
**Spaced-repetition schedule** — Review the three axioms at 1 day, 3 days, 7 days, 16 days, 35 days.  
**First-principles fallback** — Re-derive from the physical tube model: only the exposed end may be touched; every other access path is physically blocked.

## 10. What this unlocks
Mastery of stacks supplies the control-flow primitive required for depth-first search, expression parsing, and recursive algorithm simulation.  

- Depth-first search and backtracking algorithms  
- Recursive descent parsers and shunting-yard expression evaluation  
- Call-stack modelling for runtime systems and tail-call optimisation  
- Undo histories and reversible computation frameworks  

## 11. Self-check — five questions, no answers
1. After the sequence push(1), push(2), pop(), push(3), pop(), what is the next element that pop() returns?  
2. In an array implementation whose capacity is exactly equal to the number of elements, what is the total number of writes performed by n successive pushes?  
3. Why does a linked-list stack never need an explicit “is-full” test?  
4. Give a permutation of 1 2 3 4 that cannot be obtained as a stack pop sequence and prove it is illegal using the forbidden-pattern definition.  
5. Suppose an adversary can call an internal “swap-top-two” method; which stack-based algorithm would first produce an incorrect answer and why?