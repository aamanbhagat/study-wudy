## What it is
Naive pattern matching is a brute-force algorithm for finding occurrences of a pattern string $P$ within a larger text string $T$. It works by sliding the pattern over the text, one position at a time, and checking for a character-by-character match at each position. This is the most straightforward, intuitive approach to the problem.

## Why it matters
This algorithm, while inefficient, is the conceptual foundation for all advanced string-matching algorithms (like KMP, Boyer-Moore, Rabin-Karp). In aerospace, you might use a more advanced version to scan for specific error codes or keywords in gigabytes of telemetry log files from a launch vehicle. In computational physics, pattern matching is used to find specific motifs in particle collision data or sequences in simulated polymer chains.

## When to study it
You should understand the following before proceeding:
*   **Basic Programming:** You must be comfortable with loops (specifically nested `for` loops), string/array indexing, and conditional statements (`if`).
*   **Big O Notation:** You need a working knowledge of what $O(n)$, $O(n^2)$, etc., mean. Specifically, you must understand how to analyze the complexity of nested loops.

If you are not solid on these, pause and review them. Hand-waving your understanding of Big O will make it impossible to appreciate why better algorithms are needed.

## How to study it (step by step)
1.  **Whiteboard the Logic:** Take a pen and paper. Write a short text `T` and a pattern `P`. Manually slide `P` along `T` one character at a time, checking for matches. Verbally describe what you are doing. This builds the core intuition.
2.  **Write the Pseudocode:** Translate your whiteboard logic into formal pseudocode. Define your variables: `n` for length of `T`, `m` for length of `P`. Define your loop bounds carefully. What is the last possible starting position in `T` for a match to occur?
3.  **Implement in Code:** Write the algorithm in a language of your choice (Python is excellent for this). Your code should be a direct translation of your pseudocode. Test it with simple cases, edge cases (empty pattern, empty text), and cases where the pattern is not found.
4.  **Derive the Worst-Case Complexity:** Construct a text `T` and pattern `P` that forces the algorithm to do the maximum possible number of comparisons. For example, `T = "AAAAAAAAAB"` and `P = "AAB"`. Count the comparisons manually for this small case, then generalize to derive the $O(nm)$ complexity.
5.  **Derive the Best-Case Complexity:** Construct a text and pattern that results in the fewest comparisons. This is trivial, but important for a complete understanding. What happens if the first character of the pattern never appears in the text?

## Key ideas, with intuition
1.  **The Sliding Window:** The core idea is a "window" of size $m$ (the length of the pattern) that slides across the text. We start the window at index 0 of the text, then index 1, index 2, and so on.
    $$
    \text{Text } T \text{ of length } n \\
    \text{Pattern } P \text{ of length } m
    $$
2.  **Outer Loop for Sliding:** An outer loop controls the starting position of the window. Let's call this starting position $s$ (for "shift"). This loop must run from $s=0$ up to the last possible position where the pattern could fit. If the text has length $n$ and the pattern has length $m$, the last possible starting index is $n-m$. So, the outer loop runs for $s \in [0, n-m]$.
3.  **Inner Loop for Comparing:** For each position $s$ of the window, an inner loop compares the characters of the pattern $P$ with the corresponding characters in the text's window. It compares $P[j]$ with $T[s+j]$ for $j \in [0, m-1]$. If any character mismatches, the inner loop breaks, and we slide the window to the next position ($s+1$).
4.  **Worst-Case Complexity is $O(nm)$:** The complexity is dominated by the nested loops. The outer loop runs approximately $n$ times. In the worst case, the inner loop runs $m$ times for each iteration of the outer loop. This happens when the pattern and text are highly repetitive, forcing many character comparisons before a mismatch is found.
    $$
    \text{Total Comparisons} \approx (\text{Outer Loop Iterations}) \times (\text{Inner Loop Iterations}) \approx (n-m+1) \times m \in O(nm)
    $$

## Worked example
Let's find all occurrences of pattern $P = \text{"ABRA"}$ in text $T = \text{"ABACADABRAC"}$.
Here, $n = 11$ and $m = 4$. The outer loop for shift $s$ will run from $s=0$ to $s=11-4=7$.

*   **$s=0$**: Window is `T[0..3]` = `ABAC`.
    *   `T[0]` vs `P[0]`: 'A' == 'A' (match)
    *   `T[1]` vs `P[1]`: 'B' == 'B' (match)
    *   `T[2]` vs `P[2]`: 'A' == 'R' (mismatch). **Stop.**

*   **$s=1$**: Window is `T[1..4]` = `BACA`.
    *   `T[1]` vs `P[0]`: 'B' == 'A' (mismatch). **Stop.**

*   **$s=2$**: Window is `T[2..5]` = `ACAD`.
    *   `T[2]` vs `P[0]`: 'A' == 'A' (match)
    *   `T[3]` vs `P[1]`: 'C' == 'B' (mismatch). **Stop.**

*   **$s=3$**: Window is `T[3..6]` = `CADA`.
    *   `T[3]` vs `P[0]`: 'C' == 'A' (mismatch). **Stop.**

*   **$s=4$**: Window is `T[4..7]` = `ADAB`.
    *   `T[4]` vs `P[0]`: 'A' == 'A' (match)
    *   `T[5]` vs `P[1]`: 'D' == 'B' (mismatch). **Stop.**

*   **$s=5$**: Window is `T[5..8]` = `DABR`.
    *   `T[5]` vs `P[0]`: 'D' == 'A' (mismatch). **Stop.**

*   **$s=6$**: Window is `T[6..9]` = `ABRA`.
    *   `T[6]` vs `P[0]`: 'A' == 'A' (match)
    *   `T[7]` vs `P[1]`: 'B' == 'B' (match)
    *   `T[8]` vs `P[2]`: 'R' == 'R' (match)
    *   `T[9]` vs `P[3]`: 'A' == 'A' (match)
    *   **Full match found at index 6.**

*   **$s=7$**: Window is `T[7..10]` = `BRAC`.
    *   `T[7]` vs `P[0]`: 'B' == 'A' (mismatch). **Stop.**

The algorithm terminates. It found one occurrence of the pattern starting at index 6.

**Reflection:** Each step `s` represents one "slide" of the window. For each slide, we perform a direct, character-by-character comparison. If we find a mismatch at any point, we abandon the current slide immediately and move to the next, which is a minor optimization but doesn't change the worst-case complexity.

## Diagrams
Here is the process for the worked example at two key steps, $s=0$ and $s=6$.

**Step s=0 (Mismatch):**
```text
Text T:      A B A C A D A B R A C
Index:       0 1 2 3 4 5 6 7 8 9 10
             | | |
Pattern P:   A B R A
Comparison:  ^ ^ X  (match, match, mismatch at index 2)
```

**Step s=6 (Full Match):**
```text
Text T:      A B A C A D A B R A C
Index:       0 1 2 3 4 5 6 7 8 9 10
                         | | | |
Pattern P:               A B R A
Comparison:              ^ ^ ^ ^  (match, match, match, match)
```

## Memory technique — remember this forever
1.  **Mnemonic:** Think of it as the **"Inchworm Search."** The pattern `P` is an inchworm of length $m$. It starts at the beginning of a long leaf (the text `T`). It checks the leaf right under its body, from head to tail. If everything matches, it reports success. If not, it inches forward exactly one spot and repeats the entire head-to-tail check. It's slow, methodical, and re-checks terrain it has already partially seen.

2.  **Formulas/Facts to Overlearn:**
    *   Outer loop runs from shift $s=0$ to $n-m$.
    *   Inner loop compares $P[j]$ with $T[s+j]$ for $j=0$ to $m-1$.
    *   Worst-case time complexity: $O((n-m+1)m)$, which simplifies to $O(nm)$.

3.  **Spaced Repetition Schedule:**
    *   Review this lesson in: **1 day**. Re-implement the code from scratch.
    *   Review in: **3 days**. Re-derive the worst-case complexity.
    *   Review in: **7 days**. Whiteboard the "Inchworm Search" for a new example.
    *   Review in: **16 days**. Explain the loop bounds to an imaginary student.
    *   Review in: **35 days**. Compare its complexity to a hypothetical $O(n+m)$ algorithm and explain why the latter would be better.

4.  **First Principles Pathway:** If you forget everything, how do you rebuild it? The problem is "find P in T". The most basic, brute-force way to solve *any* search problem is to check *every possibility*. What are the possibilities here? The pattern `P` could start at index 0 of `T`, or index 1, or index 2, ... up to the last possible spot. This gives you the outer loop. For each of these starting possibilities, what does it mean to "check"? It means you must verify that *all* characters of `P` match the corresponding characters of `T`. This gives you the inner loop. The nested loop structure is the inevitable result of this first-principles approach.

## Common mistakes
1.  **Off-by-One in Loop Bounds:** A common error is to run the outer loop up to $n$ instead of $n-m$. This will cause an "index out of bounds" error when the algorithm tries to access `T[s+j]` near the end of the text.
2.  **Forgetting the `+1`:** The number of possible shifts is $n-m+1$, not $n-m$. Forgetting this can lead to subtle miscalculations in complexity analysis, though it doesn't change the final Big O.
3.  **Misidentifying the Worst Case:** Students sometimes think the worst case is when the pattern is not in the text. The true worst case is when every possible alignment is a "near miss" that fails only on the very last character, maximizing the work done by the inner loop. Example: `T = "aaaaaaaa...ab"` and `P = "aa...ab"`.

## Self-check
1.  Given $T = \text{"racecar"}$ and $P = \text{"car"}$, how many character comparisons are performed in total before the algorithm terminates (assuming it stops after finding the first match)?
2.  Construct a text $T$ of length 10 and a pattern $P$ of length 4 that demonstrates the absolute worst-case number of comparisons for the naive algorithm. Calculate this number.
3.  The naive algorithm requires no extra space besides a few variables for loop counters. If you were allowed to use $O(n+m)$ extra space for pre-computation, can you imagine a strategy that might avoid re-comparing the same characters in $T$ over and over again? Describe the general idea in one or two sentences. (This is a lead-in to more advanced algorithms).