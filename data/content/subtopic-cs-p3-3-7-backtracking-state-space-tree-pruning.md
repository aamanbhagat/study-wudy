## What it is
Backtracking is a general algorithmic technique for finding all (or some) solutions to computational problems, notably constraint satisfaction problems. It incrementally builds candidates for the solutions and abandons a candidate ("backtracks") as soon as it determines that the candidate cannot possibly be completed to a valid solution. This process is equivalent to a depth-first search on a **state-space tree**, where **pruning** is the act of ignoring subtrees that violate the problem's constraints.

## Why it matters
Backtracking is the engine behind solving many combinatorial optimization and constraint satisfaction problems that appear intractable. In aerospace, it's used for planning and scheduling, such as task scheduling for a Mars rover or optimizing satellite communication windows, where solutions must satisfy a complex set of physical and operational constraints. In machine learning, it appears in areas like parsing complex grammars and solving logic puzzles, which are foundational to symbolic AI.

## When to study it
You must have a solid grasp of **recursion** before tackling backtracking; it is the natural implementation mechanism. You should also understand **trees** as a data structure and be comfortable with **depth-first search (DFS)**, as backtracking is a specialized form of DFS. Familiarity with basic complexity analysis, particularly factorial ($O(n!)$) and exponential ($O(k^n)$) growth, is required to appreciate the power of pruning.

## How to study it (step by step)
1.  **Implement a simple permutation generator.** Write a recursive function that generates all permutations of a string like "ABC". Do not add any constraints yet.
2.  **Draw the recursion tree.** For your "ABC" permutation generator, map out the entire call stack on paper. This is the *state-space tree*. The root is the empty string, its children are "A", "B", "C", their children are "AB", "AC", etc.
3.  **Introduce a constraint.** Modify your function to solve a new problem: "Find all permutations of 'ABC' that do not contain 'AB'".
4.  **Implement pruning.** Add a check inside your recursive function. Before making a recursive call, check if the current partial solution already violates the constraint. If `current_string == "AB"`, do not proceed.
5.  **Contrast the trees.** Draw the new, smaller state-space tree. The entire branch starting from the "AB" node is now gone. This is pruning. You have saved computational work.
6.  **Solve the N-Queens problem for N=4.** This is the classic backtracking problem. On a 4x4 chessboard, place 4 queens so that no two queens threaten each other. Do this on paper first, explicitly saying "backtrack" when you hit a dead end.
7.  **Implement N-Queens.** Translate your paper-and-pencil logic into code. Pay close attention to how you represent the board state and how you check for valid queen placements.

## Key ideas, with intuition
*   **State-Space Tree:** Imagine every possible choice you can make at every step of a problem forms a giant tree. The root is the problem's initial state. Each path from the root to a leaf represents one potential sequence of choices. For placing 4 queens on a 4x4 board, the root is an empty board, its children are boards with one queen in row 1, their children are boards with queens in rows 1 and 2, and so on. The full tree represents every possible placement, valid or not.
*   **Brute Force as Tree Traversal:** A brute-force approach explores this *entire* state-space tree. For N-Queens, this would be trying all $64 \times 63 \times \dots$ placements, which is computationally infeasible. A slightly smarter brute force might try all $4^4$ ways to place one queen per row.
*   **Backtracking as Smart Traversal (DFS):** Backtracking performs a depth-first search (DFS) on this tree. It goes deep down one path, for example: place Q at (row=0, col=0), then try to place Q at (row=1, col=0), then (row=1, col=1), etc.
*   **Pruning is the "Aha!" Moment:** This is the core optimization. Instead of exploring a path to its bitter end, we ask at every step: "Is this path *already* invalid?" For N-Queens, after placing a queen at (0,0), when we consider placing the next queen at (1,0) or (1,1), we immediately see they are under attack. There is *no point* in exploring any of the millions of potential solutions that start with these two moves. We "prune" those entire branches from the state-space tree, saving immense amounts of computation.
    $$ \text{Total Work} = \sum_{\text{nodes } n} \text{Work}(n) \quad \xrightarrow{\text{Pruning}} \quad \text{Total Work} = \sum_{n \in \text{ValidPartialSolutions}} \text{Work}(n) $$

## Worked example
**Problem:** Find one valid placement for the 4-Queens problem.

**State:** A list or array representing the column of the queen in each row. `board = [col_q0, col_q1, ...]`
**Constraint:** No two queens can be on the same row, column, or diagonal.
`is_valid(board, row, col)` checks if placing a queen at `(row, col)` conflicts with queens already in `board[0...row-1]`.

1.  **Start (row 0):** Board is empty `[]`. Try placing Queen 0.
    *   Place Q0 at `(0, 0)`. Board: `[0]`. Recurse for row 1.
2.  **Recurse (row 1):** Board: `[0]`. Try placing Queen 1.
    *   Try `(1, 0)`: Invalid (same column as Q0).
    *   Try `(1, 1)`: Invalid (diagonal with Q0).
    *   Try `(1, 2)`: Valid. Board: `[0, 2]`. Recurse for row 2.
3.  **Recurse (row 2):** Board: `[0, 2]`. Try placing Queen 2.
    *   Try `(2, 0)`: Invalid (same column as Q0).
    *   Try `(2, 1)`: Invalid (diagonal with Q0).
    *   Try `(2, 2)`: Invalid (same column as Q1).
    *   Try `(2, 3)`: Invalid (diagonal with Q1).
    *   **No valid column in this row. This path is dead.** Return `false`.
4.  **Backtrack (to row 1):** The call for row 2 failed. We are back in the context of row 1. Undo the last choice. Board was `[0, 2]`.
    *   Try next placement for Q1. Last was `(1, 2)`.
    *   Try `(1, 3)`: Valid. Board: `[0, 3]`. Recurse for row 2.
5.  **Recurse (row 2):** Board: `[0, 3]`. Try placing Queen 2.
    *   Try `(2, 0)`: Invalid (column).
    *   Try `(2, 1)`: Valid. Board: `[0, 3, 1]`. Recurse for row 3.
6.  **Recurse (row 3):** Board: `[0, 3, 1]`. Try placing Queen 3.
    *   Try `(3, 0)`: Invalid (column).
    *   Try `(3, 1)`: Invalid (column).
    *   Try `(3, 2)`: Invalid (diagonal).
    *   Try `(3, 3)`: Invalid (column).
    *   **No valid column. This path is dead.** Return `false`.
7.  **Backtrack (to row 2):** The call for row 3 failed. We are back in row 2. Undo choice. Board was `[0, 3, 1]`.
    *   Try next placement for Q2. Last was `(2, 1)`. No more columns to try.
    *   **No more valid columns in this row.** Return `false`.
8.  **Backtrack (to row 1):** The call for row 2 failed. We are back in row 1. Undo choice. Board was `[0, 3]`.
    *   Try next placement for Q1. Last was `(1, 3)`. No more columns to try.
    *   **No more valid columns in this row.** Return `false`.
9.  **Backtrack (to row 0):** The call for row 1 failed. We are back in row 0. Undo choice. Board was `[0]`.
    *   Try next placement for Q0. Last was `(0, 0)`.
    *   Place Q0 at `(0, 1)`. Board: `[1]`. Recurse for row 1.

...This process continues. Eventually, it will find the solution `[1, 3, 0, 2]`.

**Reflection:** Each "Recurse" step goes deeper into the state-space tree. Each "Invalid" check is a **pruning** action—we don't bother exploring that subtree. Each "Backtrack" step means we've exhausted a subtree and are moving up to explore a sibling branch.

## Diagrams
A pruned state-space tree for finding permutations of {A, B, C} that do not contain "AB".

```text
              (root)
             /   |   \
            A    B    C
           / \   |   / \
          /   \  |  /   \
        AC     *AB* CA CB
        |        |  |  |
       ACB       X  CAB CBA

*AB* is an invalid partial state. The entire subtree below it is pruned (marked with X).
Without pruning, we would have explored ABC and ABD... etc.
```

## Memory technique — remember this forever
1.  **The Mnemonic:** "Theseus in the Labyrinth".
    You are Theseus exploring a vast maze (the state-space tree) for the Minotaur (a solution). At each junction (a recursive call), you choose a path (a candidate choice) and unspool a golden thread (modify the state). If you hit a dead end (violate a constraint), you don't keep wandering. You turn around, follow your thread back to the last junction (undo the state change, i.e., "backtrack"), and try the next unexplored path. Pruning is like having a magical map that tells you certain corridors are guaranteed to be dead ends, so you don't even bother entering them.

2.  **The Formula to Overlearn:** The Backtracking Template. Burn this into your memory.

    ```python
    def backtrack(candidate, input_data, output):
        if is_solution(candidate, input_data):
            output.add(candidate)
            return

        for choice in next_choices(candidate, input_data):
            # 1. Choose
            add_choice_to_candidate(choice, candidate)

            # 2. Explore
            backtrack(candidate, input_data, output)

            # 3. Unchoose (Backtrack)
            remove_choice_from_candidate(choice, candidate)
    ```

3.  **Spaced Repetition:** Review this template and the Labyrinth mnemonic at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Each time, re-implement N-Queens from scratch.

4.  **First Principles Pathway:** If you forget everything, rebuild it from **Depth-First Search**. A standard recursive DFS looks like this: `dfs(node): mark_visited(node); for neighbor in node.neighbors: if not visited(neighbor): dfs(neighbor)`. To get to backtracking, you realize the "graph" is implicit. The "neighbors" are the next valid choices. The "visit" action is making a choice, and because you need to explore other paths from the same node, you must "un-visit" after the recursive call returns. This "visit/un-visit" pair is the "choose/unchoose" pattern.

## Common mistakes
*   **Forgetting to un-choose.** The most common bug. After a recursive call returns, you *must* revert the state to what it was before the call. If you place a queen on the board, recurse, and that path fails, you must remove that queen before trying the next column in the current row.
*   **Modifying shared state incorrectly.** When passing state (like the board) by reference, a change in one recursive call affects all others. Forgetting to backtrack (see above) means a choice made for one branch of the tree incorrectly persists when exploring a sibling branch.
*   **Inefficient validity checks.** The `is_valid()` function is called at every step. If this check is slow (e.g., it re-scans the entire board from scratch every time), it can dominate the runtime and negate the benefits of pruning.
*   **Incorrect base case.** The `is_solution()` check must be precise. Stopping one level too early means you only find partial solutions; stopping one level too late can lead to index-out-of-bounds errors or infinite recursion.

## Self-check
1.  What is the "state", what are the "choices", and what is the "pruning condition" for generating all balanced parentheses strings of length $2n$? (e.g., for $n=2$, `(())` and `()()`).
2.  A "Sudoku solver" is a classic backtracking application. Describe its state-space tree. How many children does the root node have in the worst case for a standard 9x9 grid? How does pruning drastically reduce this?
3.  Consider the problem of finding if a path exists from a start to an end point in a maze (a 2D grid with walls). You can solve this with BFS or DFS. You can also frame it as a backtracking problem. How does the backtracking formulation differ from a standard DFS for this specific problem? Is there any advantage?