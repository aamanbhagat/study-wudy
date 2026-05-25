## What it is
The Aho-Corasick algorithm is a high-performance string-searching algorithm that finds all occurrences of a finite set of keywords (the "dictionary") within an input text. It achieves this in a single pass by pre-processing the keywords into a specialized finite automaton—a trie augmented with "failure links." This is fundamentally a generalization of the Knuth-Morris-Pratt (KMP) algorithm from a single pattern to multiple patterns.

## Why it matters
This algorithm is the backbone of many "scan for bad stuff" systems. In network security, Intrusion Detection Systems (IDS) use it to scan network traffic for thousands of malicious signatures simultaneously at line speed. In bioinformatics, it's used to locate multiple specific DNA or protein sequences within a genome. Compilers and text editors use similar principles to perform syntax highlighting by recognizing a set of reserved keywords in code.

## When to study it
Before tackling Aho-Corasick, you must have a solid understanding of two prerequisites. If you are not confident in these, stop and review them first.
1.  **Tries (Prefix Trees):** You must be able to build and traverse a trie. The Aho-Corasick automaton is built directly on top of a trie structure.
2.  **Knuth-Morris-Pratt (KMP) Algorithm:** The core concept of a "failure function" (or LPS array) in KMP, which prevents re-scanning the text after a mismatch, is generalized into "failure links" in Aho-Corasick. Without understanding why KMP is efficient, the purpose of failure links will be unclear.

## How to study it (step by step)
1.  **Build a Trie:** Take a set of keywords, e.g., `{"a", "ab", "bab", "bc", "bca", "c", "caa"}`. Manually draw the corresponding trie on paper. Number the nodes starting from 0 at the root.
2.  **Grok Failure Links:** The failure link for a node `u` points to the node `v` that represents the longest proper suffix of the string corresponding to `u` that is also a prefix in the trie. For the string "bca" (let's say it ends at node `N`), its longest proper suffix that is a prefix in our dictionary is "a". So, the failure link from `N` would point to the node for "a". Calculate these links for your hand-drawn trie.
3.  **Automate Failure Link Creation:** The links are computed level by level, using a Breadth-First Search (BFS) starting from the root. For a node `u` with parent `p` reached by character `ch`, its failure link is found by traversing the failure link of its parent `p` until we find a node that has a transition for `ch`. This is the most complex part; code it.
4.  **Build the full Automaton:** The Aho-Corasick automaton is the trie plus the failure links. The "next state" function `go(state, char)` is defined as: if `state` has a child for `char`, go there. If not, follow the failure link of `state` and try again: `go(failure[state], char)`. Implement this transition logic.
5.  **Implement the Search:** Traverse the input text character by character, using your `go(state, char)` function to move through the automaton. If the state you land on (or any state reachable by its "output links") corresponds to a keyword, record a match.
6.  **Solve a Problem:** Find a problem tagged "Aho-Corasick" on a platform like Codeforces or LeetCode and solve it from scratch. This will solidify the implementation details.

## Key ideas, with intuition
1.  **Trie for Prefix Sharing:** The base structure is a trie containing all keywords. This is efficient because it merges common prefixes. For keywords `{"he", "her", "his"}`, the path for "h" and "he" is shared.
    $$ \text{Trie encodes shared prefixes.} $$

2.  **Failure Links for Suffix Recovery:** This is the KMP generalization. Imagine you are matching the text `ababc` against the dictionary `{"ab", "bab"}`. You've successfully followed the path for `aba` in the trie. The next text character is `b`. The `aba` node has no transition for `b`. What now? Instead of starting over, we ask: "What is the longest *suffix* of my current match (`aba`) that is also a *prefix* of some keyword in my dictionary?" The answer is `ab`. The failure link from the `aba` node points to the `ab` node. We jump there and continue, effectively preserving the progress made by matching the `ab` suffix.
    $$ \text{State } u \xrightarrow{\text{failure}} \text{State } v $$
    $$ \text{where string}(v) = \text{longest_proper_suffix}(\text{string}(u)) \cap \text{Prefixes} $$

3.  **Output Links for Suffix Matches:** What if we match the keyword `she` in a text? We have also implicitly matched the keyword `he`. The automaton needs to report this. An "output link" is a pointer from the node for `she` to the node for `he`. During a search, after landing on a state, we follow the chain of output links to report all keywords that are suffixes of the current matched string. In practice, this is often merged with the failure link traversal.
    $$ \text{If string}(v) \text{ is a keyword and } \text{string}(v) \text{ is a suffix of } \text{string}(u), \text{ we must report } v \text{ when we reach } u. $$

## Worked example
**Dictionary:** `{"he", "she", "his", "hers"}`
**Text:** `"ushers"`

**Step 1: Build the Trie**
We insert the four keywords. Nodes are numbered for clarity. The nodes corresponding to the end of a word are marked with `*`.

**Step 2: Build Failure Links (and draw the Automaton)**
We compute failure links using a BFS queue.
-   `q = {1, 2, 6}` (children of root 0)
-   `failure[0] -> 0` (root fails to itself)
-   `failure[1] (h) -> 0`
-   `failure[2] (s) -> 0`
-   `failure[6] (s) -> 0` (this is from `his`, so `s` is a child of `i`)
-   Now process next level: `q = {3, 4, 7}`
-   `failure[3] (she) -> failure[2](s) -> 0`. Does 0 have a child `h`? Yes, node 1. So, `failure[3] -> 1`.
-   `failure[4] (his) -> failure[1](h) -> 0`. Does 0 have a child `i`? No. `failure[0]->0`. Does 0 have a child `i`? No. So `failure[4] -> 0`.
-   ...and so on. The final automaton is shown in the diagram.

**Step 3: Search the text "ushers"**
-   Start at state `0`.
-   `u`: `go(0, 'u')`. No child `u`. Follow `failure[0] -> 0`. Still no child `u`. State remains `0`.
-   `s`: `go(0, 's')`. Move to state `2`.
-   `h`: `go(2, 'h')`. Move to state `3`.
-   `e`: `go(3, 'e')`. Move to state `4`. State `4` is a match for `"she"`. **Found "she" ending at index 3.**
    -   We must also check output/failure links. `failure[4]` points to `5`. State `5` is a match for `"he"`. **Found "he" ending at index 3.**
-   `r`: `go(4, 'r')`. Move to state `5`.
-   `s`: `go(5, 's')`. Move to state `6`. State `6` is a match for `"hers"`. **Found "hers" ending at index 5.**

**Reflection:** The trie structure allowed us to match prefixes efficiently. The failure link from state `4` (`she`) to state `5` (`he`) was crucial; it allowed us to find the `he` match without re-scanning and also positioned us correctly to find `hers` immediately after.

## Diagrams
This diagram shows the final Aho-Corasick automaton for the dictionary `{"he", "she", "his", "hers"}`. Solid lines are the main trie transitions. Dashed lines are the failure links. `(0)` is the root. `(*)` denotes a terminal node for a keyword.

```text
          (0) --s--> (2) --h--> (3) --e--> (4*) --r--> (5) --s--> (6*)
          /|\         |                 (she)         (hers)
           |          |
           h          | failure from 3 to 1
           |          |
          \|/         |
          (1) --i--> (7) --s--> (8*)
          / \         (his)
         /   \
        e     i
       /       \
     (9*)       ...
     (he)


Failure Links (--> means "failure link points to"):
2(s)   --> 0
1(h)   --> 0
3(sh)  --> 1(h)      <-- Longest proper suffix of "sh" that's a prefix is "h"
7(hi)  --> 0
4(she) --> 9(he)     <-- Longest proper suffix of "she" that's a prefix is "he"
... etc.
```

## Memory technique — remember this forever
1.  **Visual Hook:** Think of the Aho-Corasick automaton as a "Subway Map for Words." The trie paths are the regular train lines (solid lines). The failure links (dashed lines) are emergency underground tunnels. If a train (your text pointer) is on a line and hits a dead end (mismatch), it doesn't go all the way back to the main station (start of text). Instead, it takes the nearest emergency tunnel to another line that shares the last part of its route, saving massive amounts of time.

2.  **Must Overlearn:**
    -   **Structure:** Trie + Failure Links = Automaton.
    -   **Failure Link Logic:** For a node `u` reached via character `c` from parent `p`, its failure link is `failure[u] = go(failure[p], c)`. This is the recursive definition that you implement iteratively with a BFS.
    -   **Search Logic:** `current_state = go(current_state, next_char)`. Always transition. Never reset to root unless the failure links lead you there.

3.  **Spaced Repetition Schedule:** Review your implementation and notes on this topic at: **1 day, 3 days, 7 days, 16 days, 35 days.** Set calendar reminders now.

4.  **First Principles Pathway:** If you forget everything, rebuild it.
    -   "I need to find multiple patterns." -> "A single KMP for each is too slow if the text is huge."
    -   "How can I combine the patterns?" -> "A trie combines them by prefix."
    -   "What happens on a text mismatch at node `u`?" -> "I can't just go to the root; I'll lose information. This is the same problem KMP solves."
    -   "KMP uses an LPS array to find the longest proper suffix that is also a prefix. I need the same thing for my trie." -> "So, for the string `s(u)` ending at node `u`, I need a pointer to the node `v` representing the longest proper suffix of `s(u)` that is also a prefix in my trie." -> This defines the failure link.

## Common mistakes
1.  **Incorrect Failure Link for Depth-1 Nodes:** Students often write complex logic for the children of the root. Any node at depth 1 has a failure link that points directly back to the root, always.
2.  **Forgetting to Traverse Output/Failure Links for Matches:** When you land on a state `S` that marks the end of a word, you've found a match. But you must also check `failure[S]`, `failure[failure[S]]`, and so on. If any of those states also mark the end of a word, you've found those too (e.g., finding "he" when you match "she").
3.  **Off-by-One Errors in Match Indices:** Remember to report the index where the match *ends*, not where it starts. You can calculate the start index from the end index and the length of the matched keyword.
4.  **Building the `go` function incorrectly:** A common bug is to only implement the trie transitions and forget the "if no transition exists, follow the failure link" part. This makes the search function slow and incorrect. A properly memoized `go` function is key to the algorithm's speed.

## Self-check
1.  Construct the full Aho-Corasick automaton (trie and all failure links) for the dictionary `{"cat", "car", "cart", "at"}`.
2.  Given the automaton from the worked example (`{"he", "she", "his", "hers"}`), trace the search for the text `"shishers"` and list all keywords found and their ending positions.
3.  What is the time complexity to build the Aho-Corasick automaton, and what is the time complexity to search a text with it? Express your answer in terms of $L$ (total length of all keywords in the dictionary), $N$ (length of the text), and $|\Sigma|$ (size of the alphabet).