## What it is
Backtracking is an algorithmic technique for solving problems recursively by trying to build a solution incrementally, one piece at a time. It abandons a candidate solution ("backtracks") as soon as it determines that the candidate cannot possibly be completed to a valid solution. This is a refined, systematic brute-force search that prunes large portions of the search space.

## Why it matters
Backtracking is the core of solving any problem that can be modeled as a constraint satisfaction problem (CSP). In aerospace, this applies to resource allocation and scheduling, such as planning a sequence of maneuvers for a satellite with constraints on fuel, timing, and instrument orientation. In machine learning, search algorithms in decision tree construction and reinforcement learning (e.g., Monte Carlo Tree Search) use backtracking-like principles to explore the space of possible policies or decisions.

## When to study it
You must have a rock-solid understanding of **recursion**. If the concept of a function call stack, base cases, and recursive leaps of faith is not second nature, you will struggle. You should also be comfortable with basic data structures like arrays, lists, and hash sets for tracking state.

## How to study it (step by step)
1.  **Master the Recursive Template:** Write a simple recursive function that counts down from $N$ to 0. Trace its execution on paper, drawing the call stack for $N=3$. Internalize the flow of control.
2.  **Solve "Subsets":** Given a set of numbers like $\{1, 2, 3\}$, write a backtracking algorithm to generate all possible subsets: $\emptyset, \{1\}, \{2\}, \{3\}, \{1,2\}, \{1,3\}, \{2,3\}, \{1,2,3\}$. This is the simplest form: for each element, you have two choices—include it or not.
3.  **Solve "Permutations":** Given $\{1, 2, 3\}$, generate all permutations: $(1,2,3), (1,3,2), (2,1,3), \dots$. This adds a constraint: once an element is used in the current permutation, it cannot be used again. This forces you to manage a "visited" or "used" state.
4.  **Solve "N-Queens":** Place $N$ queens on an $N \times N$ chessboard so that no two queens threaten each other. This introduces more complex, geometric constraints (rows, columns, diagonals) and is the canonical backtracking problem. Start with $N=4$.
5.  **Analyze the Pruning:** For your N-Queens solution, add a counter to track how many times your `is_valid` placement function is called. Compare this to $N!$ or $N^2$, the size of the unpruned search space, to appreciate how much work backtracking saves.

## Key ideas, with intuition
1.  **State-Space Tree:** Imagine every possible choice you can make at each step as a branch in a tree. The root is the empty solution, and the leaves are complete (but not necessarily valid) solutions. Backtracking is simply a Depth-First Search (DFS) on this conceptual tree.

2.  **The "Choose, Explore, Unchoose" Pattern:** This is the fundamental template for any backtracking function.
    *   **Choose:** Make a choice. (e.g., place a queen in a specific square, add a number to a permutation).
    *   **Explore:** Call the function recursively to explore the consequences of that choice.
    *   **Unchoose:** Backtrack. Undo the choice you just made so that you can explore other options from the same decision point. This is the most critical and most forgotten step.

3.  **Constraint Propagation & Pruning:** The power of backtracking comes from applying constraints early. When considering a choice, you first check if it violates any constraints given the choices made so far. If it does, you don't even bother exploring that path. You "prune" that entire branch of the state-space tree, saving immense computation. For N-Queens, if placing a queen at $(r, c)$ creates a conflict, we don't recursively explore any board configurations that include a queen at $(r, c)$.

## Worked example
Let's solve the 4-Queens problem. We want to place 4 queens on a $4 \times 4$ board. We'll place one queen per row, deciding which column to place it in.

**State:** We need to track the column placement for each queen. Let's use an array `cols`, where `cols[i]` is the column of the queen in row `i`.

**Goal:** Find a valid `cols` array of length 4.

**Step 1: Row 0**
-   Try placing Queen 0 at `(row=0, col=0)`. Board is valid so far. `cols = [0]`.
-   Recurse for Row 1.

```text
  0 1 2 3
0 Q . . .
1 . . . .
2 . . . .
3 . . . .
```

**Step 2: Row 1**
-   Try `(1, 0)`. Invalid (same column as Q0).
-   Try `(1, 1)`. Invalid (diagonal to Q0).
-   Try `(1, 2)`. Valid. `cols = [0, 2]`.
-   Recurse for Row 2.

```text
  0 1 2 3
0 Q . . .
1 . . Q .
2 . . . .
3 . . . .
```

**Step 3: Row 2**
-   Try `(2, 0)`. Invalid (column conflict).
-   Try `(2, 1)`. Invalid (diagonal to Q1).
-   Try `(2, 2)`. Invalid (column conflict).
-   Try `(2, 3)`. Invalid (diagonal to Q1).
-   No valid column for Row 2. We have failed.

**Step 4: Backtrack!**
-   Return from the Row 2 recursion. We are back at the Row 1 decision point.
-   "Unchoose" the placement of Q1 at `(1, 2)`. `cols` is back to `[0]`.
-   Continue exploring choices for Row 1. Try `(1, 3)`. Valid. `cols = [0, 3]`.
-   Recurse for Row 2.

```text
  0 1 2 3
0 Q . . .
1 . . . Q
2 . . . .
3 . . . .
```

**Step 5: Row 2 (second attempt)**
-   Try `(2, 1)`. Valid. `cols = [0, 3, 1]`.
-   Recurse for Row 3.

```text
  0 1 2 3
0 Q . . .
1 . . . Q
2 . Q . .
3 . . . .
```

**Step 6: Row 3**
-   Try `(3, 0)`. Invalid (column).
-   Try `(3, 1)`. Invalid (column).
-   Try `(3, 2)`. Invalid (diagonal to Q1).
-   Try `(3, 3)`. Invalid (column).
-   No valid column for Row 3. We have failed again.

**Step 7: Backtrack again!**
-   Return from Row 3. "Unchoose" Q2 at `(2, 1)`. `cols = [0, 3]`.
-   No more options for Row 2. Return from Row 2.
-   "Unchoose" Q1 at `(1, 3)`. `cols = [0]`.
-   No more options for Row 1. Return from Row 1.
-   "Unchoose" Q0 at `(0, 0)`. `cols = []`.
-   We have exhausted all possibilities that started with Q0 at `(0,0)`.

This process continues. We now try placing Q0 at `(0, 1)` and repeat the entire search. Eventually, we find the solution `cols = [1, 3, 0, 2]`.

**Reflection:** Each "Recurse" step goes deeper into the state-space tree. Each "Backtrack" step moves back up the tree to explore a sibling branch. The `is_valid` check is the pruning mechanism that prevents us from exploring doomed branches.

## Diagrams
Here is the state-space tree for generating permutations of `{A, B, C}`. The `X` marks a pruned path because a letter is already used.

```text
                      (ROOT)
                      /  |  \
                     /   |   \
                    A    B    C
                   / \   / \   / \
                  /   \ /   \ /   \
                 B     C   A   C   A   B
                 |     |   |   |   |   |
                 C     B   C   A   B   A
                / \   / \
               X   C B   X
             (A,B,A)   |
                     (A,B,C) ... etc.

Path taken by DFS:
1. Choose A
2. Choose B
3. Choose C -> Solution (A,B,C)
4. Unchoose C
5. No more choices after B. Unchoose B.
6. Choose C
7. Choose B -> Solution (A,C,B)
... and so on.
```

## Memory technique — remember this forever
1.  **Mnemonic:** **"Choose, Explore, Unchoose."** Chant this. It is the core pattern. Think of it like exploring a cave system: you walk down a path (**Choose**), see where it leads (**Explore**), and if it's a dead end, you walk back to the last junction to try a different path (**Unchoose**).

2.  **Formulas/Facts to Overlearn:** The pseudocode template.
    ```python
    def backtrack(candidate, other_state):
        if is_solution(candidate):
            add_to_results(candidate)
            return

        for choice in get_next_choices(candidate, other_state):
            if is_valid(choice):
                # 1. Choose
                make_choice(choice)

                # 2. Explore
                backtrack(new_candidate, new_state)

                # 3. Unchoose
                undo_choice(choice)
    ```

3.  **Spaced Repetition Schedule:**
    *   **1 day:** Re-implement "Subsets" from scratch.
    *   **3 days:** Re-implement "Permutations" from scratch.
    *   **7 days:** Re-implement "N-Queens" from scratch.
    *   **16 days:** Solve a Sudoku puzzle solver.
    *   **35 days:** Explain the difference between backtracking and plain DFS to a rubber duck.

4.  **First Principles Pathway:** If you forget everything, remember that backtracking is just a **Depth-First Search (DFS)** on the implicit graph of all possible states. The nodes are partial solutions, and edges are the choices that extend them. The "unchoose" step is equivalent to returning from a recursive DFS call and thus popping from the call stack, effectively moving back up the tree.

## Common mistakes
1.  **Forgetting to Unchoose:** This is the #1 bug. If you modify a data structure (e.g., add an element to a list, mark a cell on a board), you *must* undo that modification after the recursive call returns. Failure to do so corrupts the state for sibling branches of the search tree.
2.  **Incorrect Base Case:** Your recursion must have a clear stopping condition. For permutations of size $N$, the base case is when your current permutation has length $N$. For Sudoku, it's when the board is full. An incorrect base case leads to infinite recursion or missed solutions.
3.  **Modifying Loop Variables:** When iterating through choices, do not modify the collection of choices from within the loop. For example, `for choice in choices: backtrack(choice)` is safe. Modifying `choices` inside this loop can lead to unpredictable behavior.
4.  **Passing Mutable State Incorrectly:** Be careful with passing lists, dictionaries, or objects. If you pass the same list reference down all recursive paths and modify it, the "unchoose" step from one branch will affect another. Often, you need to pass copies or ensure the "unchoose" step is perfect.

## Self-check
1.  (Easy) Given an integer $N$, generate all strings of $N$ pairs of balanced parentheses. For $N=2$, the output would be `"(())"` and `"()()"`.
2.  (Medium) Given a 2D array of characters and a dictionary of valid words, find all words from the dictionary that can be formed by a sequence of adjacent (horizontally, vertically, or diagonally) letters. A letter's cell cannot be used more than once in a single word.
3.  (Hard) The Knight's Tour: On an $N \times N$ chessboard, find a sequence of moves for a knight that visits every square exactly once. Does a solution exist for a $5 \times 5$ board? What about a $3 \times 3$ board?