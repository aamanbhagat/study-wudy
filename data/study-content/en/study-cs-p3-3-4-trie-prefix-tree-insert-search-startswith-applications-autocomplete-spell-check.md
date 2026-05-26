## 1. The one-sentence answer
**A trie is a tree in which each node stores a single character and edges represent transitions to the next character, enabling prefix-based operations on strings in time linear in string length.**

A trie compresses a collection of strings by sharing common prefixes. Instead of storing each string separately, the structure records only the branching decisions at each character position. The root represents the empty prefix; every path from the root spells a string that has been inserted.

Because nodes are visited sequentially along the characters of a query, both insertion and lookup avoid scanning irrelevant data. Marking certain nodes as word endings distinguishes complete words from proper prefixes, which is essential for correct search semantics.

> [!NOTE]
> The decisive insight is that search cost depends only on the length of the query string, never on the total number of stored strings; this independence from collection size is what makes tries scale for autocomplete and spell-checking at web scale.

## 2. Why this matters — concrete and current
Google’s search bar uses a trie (or trie variant) to surface suggestions while the user types; each keystroke traverses a few nodes to retrieve the top completions from billions of historical queries.

Modern code editors such as Visual Studio Code and JetBrains IDEs maintain a trie over identifiers, keywords, and user-defined symbols to provide instantaneous spell-checking and completion lists without rescanning the entire project on every keystroke.

Network routers store IP prefixes in a trie (often a Patricia trie) so that the longest-prefix match for an incoming packet address can be found in a single pass over the address bits, a requirement for line-rate forwarding at 100 Gb/s and beyond.

In bioinformatics, tools such as BLAST and minimap2 index k-mers of reference genomes inside tries or trie-like structures; this permits rapid detection of exact prefix matches when aligning noisy long reads from Oxford Nanopore sequencers.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Tree node        | Each character position becomes a node with child pointers |
| Hash map or array indexing | Fast retrieval of the child for a given character         |
| String as sequence | Operations walk the string character by character         |
| Boolean flag per node | Distinguishes a complete word from a mere prefix          |

## 4. Building the idea — from intuition to formalism

### Step 1 — Represent each character by a node
A node contains an array or map of children and a Boolean flag indicating whether a word ends here.  
Example: the word “cat” produces three nodes linked by edges labeled ‘c’, ‘a’, ‘t’, with the final node’s flag set true.  
Formally, a node \(N\) is a pair \((C, end)\) where \(C\) is a partial function from alphabet \(\Sigma\) to nodes and \(end \in \{true, false\}\).  
> [!WARNING]
> Omitting the end flag collapses “cat” and “ca” into indistinguishable states, breaking search.

### Step 2 — Insert traverses or creates the path
Start at the root. For each successive character, follow the existing child or allocate a new node. Set the end flag on the final node.  
Example: inserting “car” after “cat” reuses the “ca” prefix and adds a new branch at the third character.  
Insertion cost is \(\Theta(m)\) where \(m\) is the string length.

### Step 3 — Search follows the exact path
For a query string, traverse the child pointers character by character. Return true only if the path exists and the final node’s end flag is true.  
Example: searching “ca” after inserting “cat” reaches the second node but finds end = false, correctly reporting absence.  
Search cost is again \(\Theta(m)\).

### Step 4 — startsWith stops at the prefix node
The same traversal as search is performed, yet the end flag is ignored; success occurs as soon as the last character’s node is reached.  
Example: startsWith(“ca”) succeeds even though no word “ca” was inserted.

### Step 5 — Time complexity is independent of collection size
Because each operation examines only the query characters, both insert and search run in \(O(m \cdot t)\) where \(t\) is the time to access a child (constant for fixed alphabet).  
> [!WARNING]
> Using a hash map for children changes \(t\) to expected \(O(1)\) but introduces worst-case degradation if hashes collide.

### Step 6 — The textbook definition
A trie for a set of strings \(S \subseteq \Sigma^*\) is a tree whose root-to-leaf paths are exactly the strings in \(S\), with each edge labeled by a distinct symbol and no node having two outgoing edges with the same label.

## 5. Worked examples — every step shown

**Example 1 — Insert “tea” into an empty trie**  
*Given:* empty trie, string “tea”.  
*Find:* resulting structure after insertion.  
Create root \(R\).  
Allocate node \(A\) for ‘t’, set \(R.child['t'] = A\). *Why:* first character must start a new path.  
Allocate node \(B\) for ‘e’, set \(A.child['e'] = B\). *Why:* second character continues the path.  
Allocate node \(C\) for ‘a’, set \(B.child['a'] = C\) and \(C.end = true\). *Why:* final character marks a complete word.  
**Final structure:** root → ‘t’ → ‘e’ → ‘a’ (end).  

**Example 2 — Search “tea” after the insertion above**  
*Given:* trie containing “tea”.  
*Find:* result of search(“tea”).  
Start at root, follow ‘t’ to \(A\). *Why:* character must match an existing edge.  
Follow ‘e’ to \(B\). *Why:* continue exact sequence.  
Follow ‘a’ to \(C\). *Why:* reach the candidate end node.  
Return \(C.end\). *Why:* flag confirms a full word.  
**true**

**Example 3 — starts<|eos|>