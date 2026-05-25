## What it is
A greedy algorithm builds up a solution piece by piece, always choosing the next piece that offers the most obvious and immediate benefit. It makes the locally optimal choice at each stage with the hope of finding a global optimum. This strategy is simple and often fast, but it does not guarantee the best overall solution for all problems.

## Why it matters
Greedy algorithms are fundamental to compression, networking, and scheduling. Huffman coding is used in standard compression formats like PNG and MP3, essential for transmitting large scientific datasets from probes like the James Webb Space Telescope. Greedy strategies also appear in network routing protocols (like Dijkstra's algorithm for finding the shortest path) and resource allocation problems in operating systems and cloud computing.

## When to study it
You must be comfortable with the following before proceeding:
*   **Asymptotic Notation:** Big-O, Big-Ω, Big-Θ. You need to analyze the efficiency of these algorithms.
*   **Sorting Algorithms:** Specifically, understanding that sorting takes at least $O(n \log n)$ time is crucial, as many greedy algorithms begin by sorting the input.
*   **Priority Queues & Heaps:** Huffman coding relies directly on a min-priority queue, which is typically implemented with a min-heap. Understanding heap operations ($insert$, $extract\_min$) is non-negotiable.

## How to study it (step by step)
1.  **Internalize the Core Idea:** Write down the definition of a "greedy choice" in your own words. Find a real-world analogy, like making change with the fewest coins. Notice that for US currency this works, but for a hypothetical currency with coins {1, 4, 5}, making change for 8 cents greedily gives {5, 1, 1, 1} (4 coins) while the optimum is {4, 4} (2 coins). This contrast is the key.
2.  **Solve Activity Selection:** Given a set of activities with start and finish times, select the maximum number of non-overlapping activities. The greedy choice is to sort by *finish time* and always pick the next compatible activity. Prove to yourself why sorting by start time or duration fails.
3.  **Solve Fractional Knapsack:** Given items with weights and values, and a knapsack of a certain capacity, maximize the value of items in the knapsack. You can take fractions of items. The greedy choice is to sort items by their value-to-weight ratio ($v_i / w_i$) and take as much as possible of the highest-ratio items first.
4.  **Implement Huffman Coding:** Implement the full algorithm from scratch using a min-priority queue. Start with a frequency map of characters, build the Huffman tree, and then traverse the tree to generate the prefix codes.
5.  **Prove Correctness (Informally):** For one of the algorithms (e.g., Activity Selection), write a short proof sketch. The structure is always: (1) Assume there is an optimal solution. (2) Show that your first greedy choice is "safe" – meaning, there exists an optimal solution that *includes* your first greedy choice. (3. Use induction to show this holds for all subsequent choices. This formalizes the intuition.

## Key ideas, with intuition
1.  **The Greedy Choice Property:** This is the heart of the matter. It means that a globally optimal solution can be reached by making a sequence of locally optimal choices. The crucial insight is that making the "best" choice right now does not prevent you from reaching the overall best solution later. For activity selection, picking the activity that finishes earliest leaves the maximum amount of time available for subsequent activities, which is a safe local choice.

2.  **Optimal Substructure:** This property means that an optimal solution to the entire problem contains optimal solutions to its subproblems. After making a greedy choice for activity selection (picking the first activity to finish, $a_1$), the problem reduces to finding an optimal solution for the remaining activities that are compatible with $a_1$. The optimal solution to the original problem is $a_1$ plus the optimal solution to the subproblem. This property is shared with dynamic programming, but the greedy approach is simpler because you don't need to explore multiple choices at each step.

3.  **The Correct "Greedy" Metric:** The success of a greedy algorithm depends entirely on *what* you are being greedy about.
    *   **Activity Selection:** Greedy about *finish time*. Why? It maximizes the remaining resource (time).
    *   **Fractional Knapsack:** Greedy about *value/weight ratio*. Why? It maximizes the value packed per unit of capacity used.
    *   **Huffman Coding:** Greedy about *frequency*. Why? It assigns the shortest codes to the most common characters, minimizing the total encoded length. The two lowest-frequency characters are "pushed deepest" into the tree, guaranteeing they get longer codes, which is fine since they are rare.

## Worked example
We will perform Huffman coding for the string "A_DEAD_DAD".

**Step 1: Calculate character frequencies.**
First, count the occurrences of each unique character.
*   A: 3
*   D: 4
*   E: 1
*   _: 2

**Step 2: Create a min-priority queue of leaf nodes.**
Each node contains a character and its frequency (its weight). The priority queue will order them by frequency, from lowest to highest.
Queue: `(E, 1), (_, 2), (A, 3), (D, 4)`

**Step 3: Iteratively build the Huffman Tree.**
Repeat until only one node (the root) remains in the queue:
a. Extract the two nodes with the minimum frequencies from the queue.
b. Create a new internal node whose frequency is the sum of the two extracted nodes' frequencies.
c. Make the first extracted node the left child and the second the right child.
d. Insert this new internal node back into the priority queue.

*   **Iteration 1:**
    *   Extract `(E, 1)` and `(_, 2)`.
    *   Create new node with frequency $1+2=3$.
    *   Queue: `(NewNode, 3), (A, 3), (D, 4)`

*   **Iteration 2:**
    *   Extract `(NewNode, 3)` and `(A, 3)`.
    *   Create new node with frequency $3+3=6$.
    *   Queue: `(D, 4), (NewNode, 6)`

*   **Iteration 3:**
    *   Extract `(D, 4)` and `(NewNode, 6)`.
    *   Create new node with frequency $4+6=10$. This is the root.
    *   Queue: `(Root, 10)` -> Loop terminates.

**Step 4: Traverse the tree to assign codes.**
Assign `0` to left branches and `1` to right branches. Traverse from the root to each leaf to read the code.

*   D: `0`
*   E: `100`
*   _: `101`
*   A: `11`

**Reflection:**
The greedy choice at each step was to merge the two least frequent nodes. This pushes rare characters (like 'E') deeper into the tree, giving them longer codes, and keeps frequent characters (like 'D') shallower, giving them shorter codes. This minimizes the total length of the encoded message:
$L = \sum_{i} f_i \cdot (\text{length of code}_i)$
For our example: $L = 4(1) + 3(2) + 2(3) + 1(3) = 4 + 6 + 6 + 3 = 19$ bits. Any other encoding will result in a total length $\ge 19$ bits.

## Diagrams
Here is the step-by-step construction of the Huffman Tree from the worked example.

**Initial State (Forest of leaf nodes):**
```text
(E:1)   (_:2)   (A:3)   (D:4)
```

**After Iteration 1 (Merge E and _):**
```text
  (3)
 /   \
(E:1) (_:2)      (A:3)   (D:4)
```

**After Iteration 2 (Merge the new node and A):**
```text
      (6)
     /   \
   (3)   (A:3)
  /   \
(E:1) (_:2)         (D:4)
```

**Final Tree (After Iteration 3):**
```text
         (10)
        /    \
      (D:4)  (6)
             /   \
           (3)   (A:3)
          /   \
        (E:1) (_:2)

// Final Codes derived by assigning 0 to left, 1 to right
// D: 0
// A: 11
// _: 101
// E: 100
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** "The Impatient Cashier." A greedy algorithm is like a cashier making change who always gives back the largest denomination coin possible without going over. This works for standard currency (local optimum leads to global optimum), but fails for weird coin systems (the greedy choice isn't always safe). This story reminds you of both the power and the danger of greedy algorithms.

2.  **Formulas/Facts to Overlearn:**
    *   **Greedy Choice Property:** A globally optimal solution can be achieved by making a locally optimal choice.
    *   **Optimal Substructure:** An optimal solution contains optimal solutions to subproblems.
    *   **The Three Strategies:**
        *   Activity Selection: Sort by **finish time**.
        *   Fractional Knapsack: Sort by **value/weight ratio**.
        *   Huffman Coding: Merge two **lowest frequency** nodes.

3.  **Spaced Repetition Schedule:**
    *   Review this material in **1 day**. Re-solve the Huffman example from memory.
    *   Review in **3 days**. Re-solve the Activity Selection problem.
    *   Review in **7 days**. Re-solve the Fractional Knapsack problem.
    *   Review in **16 days**. Re-implement one of them.
    *   Review in **35 days**. Explain the difference between Greedy and Dynamic Programming to a rubber duck.

4.  **First Principles Pathway:** If you forget a specific greedy strategy, ask: "What is my resource to preserve?"
    *   For activities, the resource is *time*. To preserve the most time, finish the current task as early as possible. -> Sort by finish time.
    *   For knapsack, the resource is *capacity*. To get the most value per unit of capacity, pick the most "value-dense" items. -> Sort by value/weight ratio.
    *   For compression, the resource is *bits*. To use the fewest bits, give the shortest codes to the most frequent symbols. -> Combine lowest frequencies.

## Common mistakes
1.  **Applying Greedy to Non-Greedy Problems:** The most common error is using a greedy approach for the 0/1 Knapsack problem (where you cannot take fractions of items). Sorting by value/weight ratio can fail. For example, a knapsack of capacity 50, item A (w=50, v=100) and item B (w=10, v=10). Greedily, you'd pick A. But the optimal is B.
2.  **Choosing the Wrong Metric:** For Activity Selection, students often try sorting by start time or duration. Create a counterexample for each to prove to yourself why they fail. The correct metric (finish time) is not always intuitive until you understand the "resource preservation" principle.
3.  **Incorrect Proof Logic:** When trying to prove a greedy algorithm's correctness, many students just show it works on an example. A correct proof uses a "cut-and-paste" argument: assume an optimal solution exists that *doesn't* use the first greedy choice, then show you can swap the greedy choice in to get a solution that is just as good, or better.

## Self-check
1.  You are given the following activities with [start, finish] times: `[1, 4]`, `[3, 5]`, `[0, 6]`, `[5, 7]`, `[3, 9]`, `[5, 9]`, `[6, 10]`, `[8, 11]`, `[8, 12]`, `[2, 14]`, `[12, 16]`. What is the maximum number of non-overlapping activities you can schedule? List the activities in the order you select them.
2.  You have a knapsack with a capacity of 15 kg. You have three items:
    *   Item A: 10 kg, $60 value
    *   Item B: 20 kg, $100 value
    *   Item C: 30 kg, $120 value
    What is the maximum value you can carry if you can take fractions of items?
3.  Consider the problem of making change for 30 cents using the coin denominations {1, 5, 10, 25}. The standard greedy algorithm works. Now, consider a new set of denominations {1, 12, 25}. Show, by finding a counterexample, why the standard greedy algorithm (always taking the largest coin possible) fails for this new set. What does this tell you about the Greedy Choice Property for this new problem?