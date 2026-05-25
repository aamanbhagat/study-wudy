## What it is
A Stack is a linear data structure that stores a collection of items. It is constrained to follow the **Last-In, First-Out (LIFO)** principle, meaning the last element added to the stack will be the first one removed. All additions and removals happen at a single end, referred to as the "top" of the stack.

## Why it matters
The LIFO behavior of stacks is fundamental to how modern computers execute programs via the "call stack," which manages function calls and local variables. In aerospace, stacks are used in backtracking algorithms for autonomous navigation and pathfinding, such as a Mars rover calculating a path out of a dead-end canyon. In compilers, they are essential for parsing expressions and checking syntax, like balancing parentheses in your code.

## When to study it
You are ready for this topic. The prerequisites are:
1.  **Basic Programming Constructs:** Variables, loops, conditional statements, and functions.
2.  **Arrays (Static and Dynamic):** Understanding how to access elements by index and the concept of contiguous memory.
3.  **Pointers/References and Linked Lists:** Understanding how nodes can point to one another to form a sequence. This is required for the linked list implementation.

## How to study it (step by step)
1.  **Physical Intuition (5 min):** Take a small stack of books. Add one to the top (`push`). Remove one from the top (`pop`). Try to read the title of the top book without removing it (`peek`). Notice you cannot access a book in the middle without first removing all the books above it. This is LIFO.
2.  **Array Implementation (30 min):** Write a `Stack` class from scratch using a fixed-size array and an integer variable `top` to track the index of the top element. Implement `push(item)`, `pop()`, `peek()`, `isEmpty()`, and `isFull()`. Pay close attention to handling stack overflow (pushing to a full stack) and underflow (popping from an empty stack).
3.  **Linked List Implementation (30 min):** Re-implement the `Stack` class, this time using a singly linked list. The `top` of the stack will be the `head` of the list. Notice how this implementation naturally avoids the "stack overflow" problem of a fixed-size array.
4.  **Complexity Analysis (15 min):** For both of your implementations, derive the time complexity of `push`, `pop`, and `peek`. Prove to yourself why they are all $O(1)$ operations. Consider the worst-case for a dynamic array `push` (resizing) and understand why it is considered $O(1)$ *amortized*.
5.  **Problem Solving (30 min):** Solve the "Valid Parentheses" problem (e.g., LeetCode #20). Given a string containing just `(`, `)`, `{`, `}`, `[`, `]`, determine if the input string is valid. Use your stack implementation to track opening brackets.

## Key ideas, with intuition
1.  **LIFO: Last-In, First-Out.** This is the defining constraint. The element that has been in the collection for the least amount of time is the only one that can be removed. Think of it as a narrow, vertical container: you can only add things to the top and take things from the top.

2.  **The Interface is Minimal and Constrained.** A stack is an Abstract Data Type (ADT). The *idea* of a stack is defined only by its operations, not its underlying structure. The core operations are:
    *   `push(item)`: Add an item to the top.
    *   `pop()`: Remove and return the item from the top.
    *   `peek()`: Return the item from the top without removing it.
    *   `isEmpty()`: Check if the stack is empty.
    This restricted access is a feature, not a bug. It simplifies logic for problems that naturally fit the LIFO model.

3.  **Implementation Determines Performance Trade-offs.** The LIFO *behavior* is constant, but the implementation details matter.
    *   **Array-based:** Fast due to memory locality (cache-friendly). Can have a fixed size, leading to overflow, or be a dynamic array, which incurs an occasional resizing cost.
    *   **Linked list-based:** Flexible size, no overflow issues. Each element requires extra memory for a pointer, and elements are not stored contiguously, which can be slightly slower due to cache misses.

4.  **The "Top" is a Pointer or an Index.** The "top" isn't a special piece of data; it's simply a mechanism to keep track of where the next operation should occur. In an array implementation, it's an integer index. In a linked list implementation, it's a pointer to the head node.
    $$
    \text{Array:} \quad \text{top}_{\text{index}} = \text{top}_{\text{index}} + 1 \quad (\text{on push})
    $$
    $$
    \text{Linked List:} \quad \text{new_node.next} = \text{top}_{\text{pointer}}; \quad \text{top}_{\text{pointer}} = \text{new_node} \quad (\text{on push})
    $$

## Worked example
We will trace the operations on a stack implemented with an array of size 4. Let `S` be the array and `top` be the index of the top element. We initialize `top = -1` to indicate an empty stack.

**Initial State:**
`S = [ , , , ]`, `top = -1`

1.  **`push(10)`**
    *   Increment `top`: `top` becomes `0`.
    *   Place element at `S[top]`: `S[0] = 10`.
    *   State: `S = [10, , , ]`, `top = 0`.

2.  **`push(20)`**
    *   Increment `top`: `top` becomes `1`.
    *   Place element at `S[top]`: `S[1] = 20`.
    *   State: `S = [10, 20, , ]`, `top = 1`.

3.  **`peek()`**
    *   Check if `top == -1`. It is not.
    *   Return the element at `S[top]`, which is `S[1]`.
    *   Returns: `20`.
    *   State: `S = [10, 20, , ]`, `top = 1` (unchanged).

4.  **`pop()`**
    *   Check if `top == -1`. It is not.
    *   Get the element to return: `value = S[top]`, so `value = 20`.
    *   Decrement `top`: `top` becomes `0`.
    *   Returns: `20`.
    *   State: `S = [10, 20, , ]`, `top = 0`. (Note: we don't need to clear `S[1]`, it's now considered invalid memory that will be overwritten by a future `push`).

5.  **`pop()`**
    *   Check if `top == -1`. It is not.
    *   Get value: `value = S[top]`, so `value = 10`.
    *   Decrement `top`: `top` becomes `-1`.
    *   Returns: `10`.
    *   State: `S = [10, 20, , ]`, `top = -1`. The stack is now empty.

6.  **`pop()`**
    *   Check if `top == -1`. It is.
    *   This is a stack underflow condition. Throw an error or return a null value.

**Reflection:** Each step was a simple, constant-time operation. `push` involved an index increment and an assignment. `pop` involved an index decrement. `peek` was just an array lookup. This efficiency is the primary benefit of a stack.

## Diagrams
**Array-based Stack:**
The `top` index tracks the last element inserted.

```text
Initial (empty):       push(5):               push(12):              pop():
top = -1               top = 0                top = 1                top = 0
[ | | | ]              [5| | | ]              [5|12| | ]             [5|12| | ]
  ^                      ^                      ^                      ^
  |                      |                      |                      |
 top points here        top points here        top points here       top points here
 (conceptually)
```

**Linked List-based Stack:**
The `top` pointer always points to the head of the list. `push` adds a new head. `pop` removes the head.

```text
Initial: top -> NULL

push(A):
  top
   |
  [A|next] -> NULL

push(B):
  top
   |
  [B|next] -> [A|next] -> NULL

pop(): (returns B)
  top
   |
  [A|next] -> NULL
```

## Memory technique — remember this forever
1.  **Mnemonic:** A **stack** of plates at a cafeteria. You can't grab a plate from the middle. You **push** a clean plate onto the top, and you **pop** the top plate off to use. LIFO: Last plate on is the First plate off.

2.  **Must overlearn:**
    *   Principle: **LIFO (Last-In, First-Out)**
    *   Core Operations: `push(item)`, `pop()`, `peek()`
    *   Time Complexity: **$O(1)$** for `push`, `pop`, `peek` (amortized for dynamic arrays).

3.  **Spaced Repetition Schedule:** Review your implementations and these key ideas at these intervals from today: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, derive it from the plate analogy.
    *   How do I add a plate? Put it on top. That's `push`.
    *   How do I take a plate? Take it from the top. That's `pop`.
    *   Can I see what the top plate looks like? Yes. That's `peek`.
    *   Is it fast? Yes, I don't have to move other plates. That implies $O(1)$ time.
    *   How would I build this with an array? I need to know where the "top" is. An index variable will do.
    *   How would I build this with a linked list? The "top" is just the head of the list. Adding/removing the head is fast.

## Common mistakes
1.  **Off-by-One `top` Index:** In an array implementation, confusing whether `top` points to the actual top element or the next available empty slot. A common convention is for `top` to be the index of the last element, starting at `-1` for an empty stack. Be consistent.
2.  **Ignoring Edge Cases:** Failing to check for underflow (`pop`/`peek` on an empty stack) or overflow (`push` on a full fixed-size array stack). This leads to runtime errors or undefined behavior.
3.  **$O(n)$ Linked List Pop:** When implementing `pop` with a linked list, a beginner might traverse the list to find the second-to-last node to update its `next` pointer. This is wrong and slow ($O(n)$). The correct $O(1)$ method is to simply make the head's `next` node the new head: `top = top.next`.
4.  **Modifying the Stack Incorrectly:** Using `peek` and then forgetting to `pop` when you meant to consume the element, leading to infinite loops in algorithms that use stacks.

## Self-check
1.  **Easy:** How would you implement a `size()` method for both the array-based and linked-list-based stacks that runs in $O(1)$ time?
2.  **Medium:** Use a stack to check if a word is a palindrome.
3.  **Hard:** Design a stack that, in addition to `push`, `pop`, and `peek`, supports a `getMin()` operation that returns the minimum element in the stack in $O(1)$ time.