## What it is
A Trie, also known as a prefix tree, is a tree-like data structure that stores a dynamic set of strings. Each path from the root to a node represents a common prefix of the strings stored. The name "Trie" comes from its use in information re**trie**val.

## Why it matters
Tries are the fundamental data structure behind autocomplete features in search engines and code editors, as well as spell-checking and word suggestion algorithms. In networking, they are used to store IP routing tables for efficient longest-prefix matching. Their ability to quickly search for items with a shared prefix is critical in applications where search performance is paramount.

## When to study it
You should understand the following before tackling Tries:
*   **Basic Tree Concepts:** Root, node, child, edge, path.
*   **Hash Maps (Dictionaries):** The concept of key-value pairs and constant-time average lookups. A Trie node's children are often implemented using a hash map.
*   **String Manipulation:** Basic operations like accessing characters at a specific index.

If you are comfortable with these, you are ready.

## How to study it (step by step)
1.  **Define the Node:** On paper, design the `TrieNode` class. What information must each node hold? It needs pointers to its children and a flag to indicate if a word ends at this node. Settle on using a hash map from character to `TrieNode` for the children.
2.  **Implement `insert`:** Write the code to insert a word. Iterate through the word's characters. For each character, check if a path (a child node) exists. If not, create it. After the loop, mark the final node as the end of a word.
3.  **Implement `search`:** Write the code to search for a full word. This will be very similar to `insert`, but instead of creating nodes, you return `false` if a path doesn't exist. At the end of the word's path, you must also check if the `isEndOfWord` flag is true.
4.  **Implement `startsWith`:** Write the code to check if any word starts with a given prefix. This is nearly identical to `search`, but you do *not* need to check the `isEndOfWord` flag at the end. You only need to verify that the path for the prefix exists.
5.  **Analyze Complexity:** For each of the three methods, derive the time and space complexity. Let $k$ be the length of the key (the string being inserted or searched) and $N$ be the number of keys in the Trie. Notice how the time complexity depends only on $k$, which is the source of a Trie's power.
6.  **Application Sketch:** Outline how you would build a simple autocomplete system. Given a user's partial input string, how would you use `startsWith` and a recursive traversal (like Depth First Search) from the prefix's end node to find all possible complete words?

## Key ideas, with intuition
1.  **Paths are Prefixes:** The core idea is that the structure of the tree itself encodes the data. A path from the root to any node represents a unique prefix. For example, the path `root -> 'c' -> 'a' -> 't'` represents the prefix "cat".

2.  **Nodes are not Words, `isEndOfWord` is:** Simply reaching a node does not mean you have found a word. Consider inserting "TEA". You create nodes for 'T', 'E', and 'A'. The path `root -> 'T'` exists, but "T" is not a word in our set. We need a boolean flag, `isEndOfWord`, on each node to explicitly mark the end of a complete word.

3.  **Shared Prefixes, Shared Memory:** If you insert "TEA" and then "TEN", they share the path `root -> 'T' -> 'E'`. You don't store "T" and "E" twice. This makes Tries space-efficient for datasets with many common prefixes (like an English dictionary).

4.  **Complexity is Proportional to Key Length, Not Dataset Size:** To search for a word of length $k$, you traverse at most $k$ nodes. Whether the Trie contains 100 words or 100 million words, the search time is the same. This is a profound advantage over structures like hash tables (where hash collisions can degrade performance) or balanced binary search trees (where complexity is $O(k \cdot \log N)$).
    $$
    \text{Time Complexity (insert, search, startsWith)} = O(k)
    $$
    $$
    \text{Space Complexity} = O(\sum_{i=1}^{N} k_i) \approx O(N \cdot k_{avg})
    $$
    where $N$ is the number of words and $k_i$ is the length of the $i$-th word.

## Worked example
Let's insert the words: "CAR", "CAT", "CAB". Then, we will search for "CAT" and check for the prefix "CA".

**1. Insert "CAR":**
*   **C:** Root has no child 'C'. Create node 'C'. Move to 'C'.
*   **A:** Node 'C' has no child 'A'. Create node 'A'. Move to 'A'.
*   **R:** Node 'A' has no child 'R'. Create node 'R'. Move to 'R'.
*   Mark node 'R' as `isEndOfWord = true`.

**2. Insert "CAT":**
*   **C:** Root has a child 'C'. Move to 'C'.
*   **A:** Node 'C' has a child 'A'. Move to 'A'.
*   **T:** Node 'A' has no child 'T'. Create node 'T'. Move to 'T'.
*   Mark node 'T' as `isEndOfWord = true`.

**3. Insert "CAB":**
*   **C:** Root has a child 'C'. Move to 'C'.
*   **A:** Node 'C' has a child 'A'. Move to 'A'.
*   **B:** Node 'A' has no child 'B'. Create node 'B'. Move to 'B'.
*   Mark node 'B' as `isEndOfWord = true`.

**Resulting Trie:** (See diagram below)

**4. Search for "CAT":**
*   Start at root.
*   Follow 'C' -> exists.
*   Follow 'A' -> exists.
*   Follow 'T' -> exists.
*   We are at the end of the word. Check the final node's flag: `isEndOfWord` is `true`.
*   **Result: Found.**

**5. `startsWith("CA")`:**
*   Start at root.
*   Follow 'C' -> exists.
*   Follow 'A' -> exists.
*   We are at the end of the prefix. The path exists.
*   **Result: True.**

**Reflection:** The `insert` operations built upon the existing structure, sharing the "CA" prefix for all three words. The `search` succeeded because the full path existed *and* the final node was marked as a word. The `startsWith` succeeded simply because the path for the prefix existed, regardless of any word-ending flags.

## Diagrams
```text
      (root)
        |
        C
        |
        A
       /|\
      / | \
     R* B* T*

* = isEndOfWord = true
```

## Memory technique — remember this forever
1.  **Mnemonic:** "Trie" is from "re**trie**val". Picture a tree where each branch is a letter, like a path you follow in a "Choose Your Own Adventure" book to spell out a word. To retrieve a word, you just trace the path of its letters.

2.  **Must-Overlearn Facts:**
    *   **Node Structure:** `TrieNode { children: Map<Character, TrieNode>, isEndOfWord: boolean }`
    *   **Time Complexity:** `insert(key)`, `search(key)`, `startsWith(prefix)` are all $O(k)$, where $k$ is the length of the key/prefix.
    *   **Key Distinction:** `search` requires `isEndOfWord == true` at the destination node. `startsWith` does not.

3.  **Spaced Repetition Schedule:** Review this material and re-implement a Trie from scratch at **1 day, 3 days, 7 days, 16 days, 35 days**.

4.  **First Principles Pathway:** If you forget everything, start here: "I need to store strings to find prefixes quickly."
    *   How can I represent a prefix? A sequence of characters.
    *   How can I represent a sequence? A path in a tree.
    *   So, let each edge be a character. A path from the root is a prefix.
    *   What if I insert "car" and "care"? The path for "car" is a prefix of the path for "care". How do I know "car" is a valid word itself? I must add a flag to the node at 'r' to mark it: `isEndOfWord`.
    *   This reasoning rebuilds the entire structure and logic.

## Common mistakes
1.  **Forgetting to initialize the root node:** Your Trie class needs a `root = new TrieNode()` in its constructor. All operations start from this empty root.
2.  **Confusing `search` and `startsWith` logic:** A common bug is to implement `search` but forget the final check `currentNode.isEndOfWord`. This makes your `search` behave like `startsWith`, returning true for "CA" when only "CAT" is in the trie.
3.  **Mishandling case sensitivity:** Deciding upfront whether to convert all strings to lower/upper case is crucial. Inconsistent casing will store "Apple" and "apple" on completely different paths.
4.  **Incorrectly updating the traversal pointer:** A classic mistake is `node = node.children.get(char)` without checking if the child exists first, leading to a `NullPointerException`. Always check for existence before moving to the next node.

## Self-check
1.  Draw the final state of a Trie after inserting the following words in order: "GO", "GONE", "GOT".
2.  Describe the algorithm and edge cases for a `delete` function in a Trie. What happens when you delete "BUG" if "BUGGY" is also in the Trie? What if you delete "BUGGY" and "BUG" is the only other word?
3.  You are building a system to find all words in a dictionary that are anagrams of a given input string (e.g., for "ATE", find "EAT", "TEA", "ATE"). How could you adapt a Trie to solve this problem efficiently? (Hint: what is the canonical representation of an anagram?)