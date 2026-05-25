## 1. What it is — in plain English

Imagine you have a big dictionary of words, and you want to find *all* occurrences of *all* those words within a really long book, all at once. Doing this by searching for each word individually would take forever. You'd read the book once for "apple," then again for "banana," and so on. That's super inefficient.

The Aho-Corasick algorithm is like a super-smart librarian who can scan the book just *once* and tell you every single place where *any* word from your dictionary appears. It builds a special kind of "search machine" that knows all your words and can spot them as it reads through the text.

Think of it as setting up a series of tripwires. Each tripwire is a part of one of your search words. As the librarian reads, if they hit a tripwire, they know they are on the path to finding a word. If they hit a dead end, they instantly know which *other* tripwire is the next best place to continue from, without having to restart their search from the beginning.

It's a way to find many different patterns (words) in a single piece of text very, very quickly, much faster than searching for each pattern one by one. It's especially powerful when you have a huge list of patterns to look for.

## 2. Why it matters — real-world applications

The Aho-Corasick algorithm is a foundational tool in computer science for its efficiency in multi-pattern string matching. Its applications span various critical domains:

1.  **Antivirus and Malware Detection**: Antivirus software needs to scan files and network traffic for thousands, sometimes millions, of known malware signatures (patterns). Aho-Corasick allows it to efficiently check for all these signatures simultaneously in a single pass, making real-time threat detection feasible without bogging down the system.
2.  **Intrusion Detection Systems (IDS) and Network Packet Inspection**: Network security devices like firewalls and IDSs monitor network traffic for malicious patterns, known attack signatures, or policy violations. They use algorithms like Aho-Corasick to rapidly scan incoming data packets for numerous predefined "bad" sequences, enabling quick identification and blocking of threats. This is crucial for protecting critical infrastructure, including systems in aerospace and defense, from cyberattacks.
3.  **Spam Filtering and Content Moderation**: Email providers and social media platforms use Aho-Corasick to identify and filter out spam, hate speech, or inappropriate content. They maintain large dictionaries of forbidden words, phrases, or URLs, and the algorithm allows them to scan incoming messages or posts efficiently against all these patterns to flag or block undesirable content.
4.  **Bioinformatics and Genomics**: In biological research, scientists often search vast DNA or protein sequences for specific genetic motifs, regulatory elements, or disease markers. Aho-Corasick can be used to find all occurrences of a set of target DNA sequences (e.g., specific genes or mutations) within a much larger genome, accelerating discoveries in genetics and medicine.
5.  **Compiler Design and Lexical Analysis**: The first phase of a compiler, lexical analysis, involves breaking down source code into a stream of tokens (keywords, identifiers, operators). Aho-Corasick can be used to efficiently recognize multiple keywords (like `if`, `else`, `while`) and operators as patterns within the input program text, speeding up the parsing process.

## 3. Prerequisites — what you must know first

Before diving deep into Aho-Corasick, ensure you have a solid grasp of these fundamental concepts:

*   **Tries (Prefix Trees)**: A tree-like data structure used to store a dynamic set of strings, where each node represents a prefix of one or more strings.
*   **Breadth-First Search (BFS)**: A graph traversal algorithm that explores all the neighbor nodes at the present depth level before moving on to the nodes at the next depth level.
*   **Finite Automata (FA)**: A mathematical model of computation that consists of a finite set of states, a finite set of input symbols, a transition function, an initial state, and a set of final states.
*   **Queues**: A linear data structure that follows the First-In, First-Out (FIFO) principle, essential for implementing BFS.
*   **Basic String Matching Concepts**: An understanding of why naive string matching is slow and how algorithms like Knuth-Morris-Pratt (KMP) improve efficiency by avoiding redundant comparisons (though KMP is for single-pattern, its concept of "failure function" is analogous to Aho-Corasick's failure links).

## 4. The core idea — step by step

The Aho-Corasick algorithm works by constructing a special kind of finite automaton from the set of patterns, then using this automaton to process the text. It combines the idea of a trie with "failure links" to efficiently handle mismatches.

### Step 1: Build the Trie (Pattern Tree)

The first step is to organize all your search patterns into a data structure called a trie (pronounced "try," short for "retrieval"). This structure efficiently stores strings that share common prefixes.

*   **Plain-English Statement**: We take all the words we want to find and put them into a tree. If words start with the same letters, they share the same branches at the beginning. Each node in the tree represents a partial word (a prefix). We mark the nodes that complete a full search word.

*   **Small Concrete Example**: Let's say our patterns are $P = \{\text{he, she, his, hers}\}$.
    *   We start with an empty root node.
    *   For "he": root $\to$ `h` $\to$ `e`. Mark `e` as a pattern end.
    *   For "she": root $\to$ `s` $\to$ `h` $\to$ `e`. Mark `e` as a pattern end.
    *   For "his": root $\to$ `h` $\to$ `i` $\to$ `s`. Mark `s` as a pattern end. (Note: `h` is shared with "he").
    *   For "hers": root $\to$ `h` $\to$ `e` $\to$ `r` $\to$ `s`. Mark `s` as a pattern end. (Note: `h` and `he` are shared with "he").

*   **Formal/Mathematical Version**:
    Given a set of patterns $P = \{p_1, p_2, \dots, p_k\}$, construct a trie $T$.
    Each node $u$ in $T$ corresponds to a unique prefix of some pattern in $P$.
    The root node $\epsilon$ represents the empty string.
    For each character $c$ in the alphabet $\Sigma$, a node $u$ has a child $v$ labeled $c$ if the string represented by $v$ is $string(u) + c$.
    Each node $u$ is marked as `is_pattern_end` if $string(u) \in P$.

*   **What Could Go Wrong**:
    *   Failing to mark all nodes that correspond to complete patterns. If a pattern is a prefix of another (e.g., `car` and `cart`), both `car` and `cart` nodes must be marked.
    *   Incorrectly handling character transitions, leading to a malformed trie.

### Step 2: Add Failure Links (Fallback Paths)

This is where Aho-Corasick gets its power. Failure links tell us what to do if the current character doesn't match the next expected character in the trie. Instead of restarting the search from the root, we can "fall back" to the longest possible *suffix* of what we've seen so far that is *also a prefix of some pattern*.

*   **Plain-English Statement**: Imagine you're scanning text and you've matched "s-h" (from "she"). If the next letter isn't 'e', you haven't found "she". But maybe you've found the beginning of *another* word? For "sh", the longest *part of it that's at the end* (a suffix) that also *starts another word* (a prefix) is "h" (from "he" or "his"). So, if "she" fails, you can instantly jump to the "h" state and continue searching from there, without throwing away your "h" match. This is like having a backup plan for every partial match.

*   **Small Concrete Example**: Patterns: $P = \{\text{he, she, his, hers}\}$.
    *   Root's failure link points to itself (or a special null/sentinel).
    *   Node `h`: Its proper suffixes are empty string. The empty string is a prefix of all patterns. So $fail(\text{h}) = \text{root}$.
    *   Node `s`: Its proper suffixes are empty string. So $fail(\text{s}) = \text{root}$.
    *   Node `sh`: Its proper suffixes are `h`, empty string. `h` is a prefix of "he", "his", "hers". So $fail(\text{sh}) = \text{h}$.
    *   Node `he` (from "he"): Its proper suffixes are `e`, empty string. `e` is not a prefix of any pattern. So $fail(\text{he}) = fail(\text{h}) = \text{root}$.
    *   Node `her` (from "hers"): Its proper suffixes are `er`, `r`, empty string. None of these are prefixes of patterns. So $fail(\text{her}) = fail(\text{he}) = \text{root}$.
    *   Node `hers` (from "hers"): Its proper suffixes are `ers`, `rs`, `s`, empty string. `s` is not a prefix of any pattern. So $fail(\text{hers}) = fail(\text{her}) = \text{root}$.

    These failure links are typically built using a Breadth-First Search (BFS) starting from the root.

*   **Formal/Mathematical Version**:
    For each node $u$ in the trie, its failure link $fail(u)$ points to the node $v$ such that $string(v)$ is the longest proper suffix of $string(u)$ that is also a prefix of some pattern in $P$.
    The failure link for the root node is the root itself ($fail(\text{root}) = \text{root}$).
    For any child $v$ of the root (i.e., $string(v)$ is a single character), $fail(v) = \text{root}$.
    For any other node $u$ with parent $p$ and character $c$ ($string(u) = string(p) + c$):
    To find $fail(u)$:
    1.  Start at $curr = fail(p)$.
    2.  While $curr$ does not have a child for character $c$ and $curr \ne \text{root}$, set $curr = fail(curr)$.
    3.  If $curr$ has a child for $c$, then $fail(u)$ is that child.
    4.  Else ($curr = \text{root}$ and no child for $c$), $fail(u) = \text{root}$.
    This process is performed using BFS, level by level, ensuring that $fail(p)$ is already computed when computing $fail(u)$.

*   **What Could Go Wrong**:
    *   Incorrectly applying the BFS-based construction, leading to wrong failure links. A common error is not handling the root and its direct children properly.
    *   Misunderstanding "longest proper suffix that is also a prefix of some pattern." This is key.

### Step 3: Add Output Links (Pattern Matches)

Sometimes, when you match a long pattern, you might have also implicitly matched a shorter pattern that is a suffix of the longer one. Output links help us report all such patterns.

*   **Plain-English Statement**: If you've just matched "hers", you know you found "hers". But what if "s" was also a pattern? Or "rs"? Or "she"? Output links act like a shortcut. If a node `u` completes a pattern, its output link points to the *next* node (via its failure link chain) that *also* completes a pattern. This lets you quickly find all patterns that end at the current position in the text.

*   **Small Concrete Example**: Patterns: $P = \{\text{he, she, his, hers}\}$.
    *   Node `e` (from "he"): `is_pattern_end`. No output link needed yet as it's not a suffix of any other pattern *ending at this point*.
    *   Node `e` (from "she"): `is_pattern_end`. $fail(\text{she})$ is `h`. Is `h` a pattern? No. So $output(\text{she})$ follows $fail(\text{h})$ to root. No output link to another pattern.
    *   Consider patterns `a`, `b`, `cab`, `dab`. If we match `cab`, we also matched `b`. The output link from the node for `cab` would point to the node for `b`.

*   **Formal/Mathematical Version**:
    For each node $u$, its output link $output(u)$ points to a node $v$ such that $string(v)$ is a pattern, and $v$ is reachable from $u$ by following zero or more failure links. More precisely, if $fail(u)$ corresponds to a pattern, then $output(u) = fail(u)$. Otherwise, $output(u) = output(fail(u))$. This creates a linked list of pattern nodes reachable via failure links.
    The output function $O(u)$ for a node $u$ is the set of patterns that end at $u$ or at any node reachable from $u$ by following failure links and output links.
    $O(u) = \{string(u) \mid \text{is_pattern_end}(u) \}$.
    If $u \ne \text{root}$, then $O(u) = O(u) \cup O(fail(u))$. (This is usually computed during the BFS for failure links).

*   **What Could Go Wrong**:
    *   Missing patterns that are suffixes of other patterns (e.g., finding "hers" but not "s" if "s" was also a pattern).
    *   Not correctly chaining output links, leading to incomplete reporting of matches.

### Step 4: Traverse the Text (Searching)

Once the automaton (trie with failure and output links) is built, we can use it to search the input text.

*   **Plain-English Statement**: Start at the very beginning of your book (the input text) and at the root of your search tree. Read the book character by character. As you read each letter, try to move deeper into the search tree along the branch that matches that letter. If you hit a dead end (the current letter doesn't match any branch), use your "failure link" backup plan to jump to a different, relevant spot in the tree, and try again with the same letter. If you land on a node that's marked as a complete word, you've found a word! Also, check if any *other* words end at this spot by following the "output links."

*   **Small Concrete Example**: Text $T = \text{ushers}$, Patterns $P = \{\text{he, she, his, hers}\}$.
    1.  Start at root. Text char `u`. No `u` child from root. Stay at root.
    2.  Text char `s`. Root $\to$ `s`. Current node is `s`.
    3.  Text char `h`. `s` $\to$ `sh`. Current node is `sh`.
    4.  Text char `e`. `sh` $\to$ `she`. Current node is `she`. `she` is a pattern end. Report "she" found at index 1-3.
    5.  Text char `r`. `she` has no `r` child. Follow $fail(\text{she}) = \text{h}$. `h` has no `r` child. Follow $fail(\text{h}) = \text{root}$. `root` has no `r` child. Stay at root. (This is where the "her" part of "hers" would start if we were at `h` and not `she`).
    6.  Text char `s`. Root $\to$ `s`. Current node is `s`.
    (Wait, this example is slightly off. If `she` has no `r` child, we should fall back to $fail(\text{she}) = \text{h}$. Then from `h`, we check for `r`. `h` does not have `r`. So we follow $fail(\text{h}) = \text{root`. Then from `root`, we check for `r`. `root` does not have `r`. So we stay at root. This is correct. The `hers` pattern is missed. Let's re-trace `ushers` for `hers`.)

    Let's refine the example with $P = \{\text{he, she, hers}\}$ and Text `ushers`.
    *   **Text: u**
        *   Current node: root. Read 'u'. Root has no 'u' child. Stay at root.
    *   **Text: s**
        *   Current node: root. Read 's'. Move to `s` node.
    *   **Text: h**
        *   Current node: `s`. Read 'h'. Move to `sh` node.
    *   **Text: e**
        *   Current node: `sh`. Read 'e'. Move to `she` node.
        *   `she` is a pattern end. **Report "she" at index 1-3.**
    *   **Text: r**
        *   Current node: `she`. Read 'r'. `she` has no 'r' child.
        *   Follow $fail(\text{she}) = \text{h}$. Current node becomes `h`.
        *   `h` has 'e' child, not 'r'. (This is where the example needs careful thought. The failure link from `she` goes to `h`. Now we are at `h` and need to process 'r'. `h` does *not* have an 'r' child).
        *   Follow $fail(\text{h}) = \text{root}$. Current node becomes `root`.
        *   `root` has no 'r' child. Stay at root.
    *   **Text: s**
        *   Current node: root. Read 's'. Move to `s` node.
        *   No patterns end at `s`. No output links.

    This example shows that `hers` is *not* found this way because `she` consumed the `sh` part. This is a common point of confusion. The Aho-Corasick algorithm *does* find `hers` if it's constructed correctly. The issue is in *how* we apply the transitions.

    Let's re-think the traversal.
    When we are at `she` and the next character is `r`:
    1.  `she` does not have an `r` child.
    2.  We follow $fail(\text{she})$, which points to `h`.
    3.  Now, from node `h`, we *try to process the character `r` again*.
    4.  Node `h` *does* have an `e` child (for `he`), but not an `r` child.
    5.  So we follow $fail(\text{h})$, which points to `root`.
    6.  Now, from `root`, we *try to process the character `r` again*.
    7.  Root does not have an `r` child. So we stay at root.
    This means the `r` is "lost" in this path. This is a crucial detail. The failure links are for *re-aligning the state*, not re-processing the character from a new state.

    The correct traversal:
    Start at root. For each character $c$ in text $T$:
    1.  While current node $u$ has no child for $c$ AND $u \ne \text{root}$, set $u = fail(u)$.
    2.  If $u$ has a child for $c$, move to that child. Else, stay at root (no match for $c$ from root). Let the new current node be $u'$.
    3.  From $u'$, report any patterns: If $u'$ itself is a pattern end, report it. Then, follow $output(u')$ and report all patterns reachable through that chain.

    Let's re-re-trace `ushers` for patterns $P = \{\text{he, she, hers}\}$.
    *   Assume trie and failure links are built:
        *   `root` -> `h` -> `e` (pattern: `he`)
        *   `root` -> `s` -> `h` -> `e` (pattern: `she`)
        *   `h` -> `e` -> `r` -> `s` (pattern: `hers`)
        *   $fail(\text{h}) = \text{root}$
        *   $fail(\text{s}) = \text{root}$
        *   $fail(\text{sh}) = \text{h}$
        *   $fail(\text{he}) = \text{root}$
        *   $fail(\text{she}) = \text{he}$ (longest proper suffix of `she` is `he`, which is a pattern prefix).
        *   $fail(\text{her}) = \text{root}$ (longest proper suffix of `her` is `er`, then `r`, none are prefixes. $fail(\text{he}) = \text{root}$)
        *   $fail(\text{hers}) = \text{s}$ (longest proper suffix of `hers` is `s`, which is a prefix of `she`).

    Now, search `ushers`:
    *   **Current state: root, Text index: 0 (char 'u')**
        *   Root has no 'u' child. State remains root.
    *   **Current state: root, Text index: 1 (char 's')**
        *   Root has 's' child. Move to node `s`.
        *   Node `s` is not a pattern end. No output links.
    *   **Current state: `s`, Text index: 2 (char 'h')**
        *   Node `s` has 'h' child. Move to node `sh`.
        *   Node `sh` is not a pattern end. No output links.
    *   **Current state: `sh`, Text index: 3 (char 'e')**
        *   Node `sh` has 'e' child. Move to node `she`.
        *   Node `she` *is* a pattern end. **Report "she" at index 1-3.**
        *   Follow output links from `she`: $output(\text{she})$ points to `he`. `he` is a pattern end. **Report "he" at index 2-3.** (This is the power of output links!)
    *   **Current state: `she`, Text index: 4 (char 'r')**
        *   Node `she` has no 'r' child.
        *   Follow $fail(\text{she}) = \text{he}$. Current state becomes `he`.
        *   Node `he` has 'r' child. Move to node `her`.
        *   Node `her` is not a pattern end. No output links.
    *   **Current state: `her`, Text index: 5 (char 's')**
        *   Node `her` has 's' child. Move to node `hers`.
        *   Node `hers` *is* a pattern end. **Report "hers" at index 2-5.**
        *   Follow output links from `hers`: $output(\text{hers})$ points to `s`. `s` is not a pattern end. $output(\text{s})$ points to null. No further patterns.

    This refined trace correctly finds all patterns. The key is that after following a failure link, you *re-evaluate* the *same character* from the *new state*.

*   **Formal/Mathematical Version**:
    Let $S$ be the input text of length $N$.
    Let $current\_state = \text{root}$.
    For each character $S[i]$ from $i=0$ to $N-1$:
    1.  **Transition with Failure Links**: While $current\_state$ does not have a child for $S[i]$ and $current\_state \ne \text{root}$, set $current\_state = fail(current\_state)$.
    2.  **Move to Next State**: If $current\_state$ has a child for $S[i]$, set $current\_state = child(current\_state, S[i])$.
    3.  **Report Matches**: Let $temp\_state = current\_state$. While $temp\_state \ne \text{root}$:
        *   If $temp\_state$ is marked as a pattern end, report the pattern $string(temp\_state)$ found ending at index $i$.
        *   If $output(temp\_state)$ is defined, set $temp\_state = output(temp\_state)$. Else, break. (This is a simplified approach; usually, you'd iterate through the failure link chain to report all patterns.)
        More robust reporting: Iterate $temp\_state = current\_state$. While $temp\_state \ne \text{root}$ and $temp\_state$ has patterns associated with it (either directly or via output links):
        *   Report all patterns associated with $temp\_state$.
        *   Set $temp\_state = output(temp\_state)$ (if output links are used to chain pattern-ending nodes).

*   **What Could Go Wrong**:
    *   Not correctly handling the root node's behavior during transitions (it acts as a "default" state).
    *   Failing to follow the chain of output links, thus missing nested or suffix patterns.
    *   Incorrectly calculating the end index of the reported pattern.

## 5. Worked examples — multiple, with every step shown

Let's walk through several examples.

### Example 1: Simple patterns, no overlap

**Problem**: Find all occurrences of patterns $P = \{\text{a, ab}\}$ in text $T = \text{abc}$.

**Given**:
*   Patterns: $P = \{\text{a, ab}\}$
*   Text: $T = \text{abc}$

**What we want**: List of (pattern, end\_index) pairs.

**Solution Steps**:

**Part 1: Build the Trie**

1.  Start with `root`.
2.  Add `a`: `root` $\xrightarrow{a}$ `node_a`. Mark `node_a` as pattern end for `a`.
3.  Add `ab`: `node_a` $\xrightarrow{b}$ `node_ab`. Mark `node_ab` as pattern end for `ab`.

**Trie Structure (simplified):**
```
      (root)
        |
        a
       (node_a) - marks "a"
        |
        b
       (node_ab) - marks "ab"
```

**Part 2: Build Failure Links (BFS)**

1.  Initialize queue `Q`. Add `root` to `Q`.
2.  $fail(\text{root}) = \text{root}$.
3.  Dequeue `root`. Process children:
    *   Child `node_a` (from `root` via 'a'):
        *   $fail(\text{node_a}) = \text{root}$ (longest proper suffix of "a" is empty string, which is prefix of all, maps to root).
        *   Enqueue `node_a`.
4.  Dequeue `node_a`. Process children:
    *   Child `node_ab` (from `node_a` via 'b'):
        *   Parent is `node_a`. $fail(\text{node_a}) = \text{root}$.
        *   From $fail(\text{node_a})$ (which is `root`), check for 'b' child. `root` has no 'b' child.
        *   So, $fail(\text{node_ab}) = \text{root}$.
        *   Enqueue `node_ab`.
5.  Dequeue `node_ab`. No children. Queue is empty.

**Failure Links:**
*   $fail(\text{root}) = \text{root}$
*   $fail(\text{node_a}) = \text{root}$
*   $fail(\text{node_ab}) = \text{root}$

**Part 3: Build Output Links**

*   `node_a` is a pattern end. No suffix of `a` is also a pattern. So, no direct output link from `node_a` to another pattern.
*   `node_ab` is a pattern end. Its failure link is `root`. No pattern ends at `root`. So no direct output link from `node_ab` to another pattern.
    *(Note: Output links are often implicitly handled by checking pattern flags on nodes and following failure links during search, or explicitly built as a chain of pattern-ending nodes via failure links.)*
    For this example, let's assume we check `is_pattern_end` on the current node and then recursively up its failure link chain.

**Part 4: Search Text $T = \text{abc}$**

*   `current_state = root`
*   **Index 0, char 'a'**:
    1.  `current_state` (root) has 'a' child. Move to `node_a`.
    2.  `node_a` is pattern end for `a`. **Report "a" at index 0.**
    3.  Check failure link chain for other patterns: $fail(\text{node_a}) = \text{root}$. Root is not a pattern. No more to report.
*   **Index 1, char 'b'**:
    1.  `current_state` (`node_a`) has 'b' child. Move to `node_ab`.
    2.  `node_ab` is pattern end for `ab`. **Report "ab" at index 1.**
    3.  Check failure link chain: $fail(\text{node_ab}) = \text{root}$. No more to report.
*   **Index 2, char 'c'**:
    1.  `current_state` (`node_ab`) has no 'c' child.
    2.  Follow $fail(\text{node_ab}) = \text{root}$. `current_state` becomes `root`.
    3.  Now, from `root`, check for 'c' child. Root has no 'c' child. `current_state` remains `root`.
    4.  No pattern ends at `root`. No output links.

**Final Answer:**
The algorithm reports the following matches:
*   **("a", 0)**
*   **("ab", 1)**

**Reflection**: This example was straightforward because there were no complex overlaps or nested patterns requiring deep failure link traversals during search. Each pattern was found distinctly.

---

### Example 2: Overlapping patterns, basic failure links

**Problem**: Find all occurrences of patterns $P = \{\text{he, she, his}\}$ in text $T = \text{ushers}$.

**Given**:
*   Patterns: $P = \{\text{he, she, his}\}$
*   Text: $T = \text{ushers}$

**What we want**: List of (pattern, end\_index) pairs.

**Solution Steps**:

**Part 1: Build the Trie**

1.  Start with `root`.
2.  Add `he`: `root` $\xrightarrow{h}$ `node_h` $\xrightarrow{e}$ `node_he`. Mark `node_he` for `he`.
3.  Add `she`: `root` $\xrightarrow{s}$ `node_s` $\xrightarrow{h}$ `node_sh` $\xrightarrow{e}$ `node_she`. Mark `node_she` for `she`.
4.  Add `his`: `node_h` $\xrightarrow{i}$ `node_hi` $\xrightarrow{s}$ `node_his`. Mark `node_his` for `his`.

**Trie Structure (simplified):**
```
      (root)
      /    \
     s      h
    /      / \
  (node_s) (node_h)
    |      |
    h      e (node_he) - marks "he"
   (node_sh) |
     |       i
     e (node_she) - marks "she"
           (node_hi)
             |
             s (node_his) - marks "his"
```

**Part 2: Build Failure Links (BFS)**

1.  Initialize queue `Q`. Add `root` to `Q`.
2.  $fail(\text{root}) = \text{root}$.
3.  Dequeue `root`. Process children:
    *   `node_s` (from `root` via 's'): $fail(\text{node_s}) = \text{root}$. Enqueue `node_s`.
    *   `node_h` (from `root` via 'h'): $fail(\text{node_h}) = \text{root}$. Enqueue `node_h`.
4.  Dequeue `node_s`. Process children:
    *   `node_sh` (from `node_s` via 'h'):
        *   Parent `node_s`. $fail(\text{node_s}) = \text{root}$.
        *   From $fail(\text{node_s})$ (`root`), check for 'h' child. `root` has 'h' child (`node_h`).
        *   So, $fail(\text{node_sh}) = \text{node_h}$. Enqueue `node_sh`.
5.  Dequeue `node_h`. Process children:
    *   `node_he` (from `node_h` via 'e'):
        *   Parent `node_h`. $fail(\text{node_h}) = \text{root}$.
        *   From $fail(\text{node_h})$ (`root`), check for 'e' child. `root` has no 'e' child.
        *   So, $fail(\text{node_he}) = \text{root}$. Enqueue `node_he`.
    *   `node_hi` (from `node_h` via 'i'):
        *   Parent `node_h`. $fail(\text{node_h}) = \text{root}$.
        *   From $fail(\text{node_h})$ (`root`), check for 'i' child. `root` has no 'i' child.
        *   So, $fail(\text{node_hi}) = \text{root}$. Enqueue `node_hi`.
6.  Dequeue `node_sh`. Process children:
    *   `node_she` (from `node_sh` via 'e'):
        *   Parent `node_sh`. $fail(\text{node_sh}) = \text{node_h}$.
        *   From $fail(\text{node_sh})$ (`node_h`), check for 'e' child. `node_h` has 'e' child (`node_he`).
        *   So, $fail(\text{node_she}) = \text{node_he}$. Enqueue `node_she`.
7.  Dequeue `node_he`. No children.
8.  Dequeue `node_hi`. Process children:
    *   `node_his` (from `node_hi` via 's'):
        *   Parent `node_hi`. $fail(\text{node_hi}) = \text{root}$.
        *   From $fail(\text{node_hi})$ (`root`), check for 's' child. `root` has 's' child (`node_s`).
        *   So, $fail(\text{node_his}) = \text{node_s}$. Enqueue `node_his`.
9.  Dequeue `node_she`. No children.
10. Dequeue `node_his`. No children. Queue is empty.

**Failure Links:**
*   $fail(\text{root}) = \text{root}$
*   $fail(\text{node_s}) = \text{root}$
*   $fail(\text{node_h}) = \text{root}$
*   $fail(\text{node_sh}) = \text{node_h}$
*   $fail(\text{node_he}) = \text{root}$
*   $fail(\text{node_hi}) = \text{root}$
*   $fail(\text{node_she}) = \text{node_he}$
*   $fail(\text{node_his}) = \text{node_s}$

**Part 3: Build Output Links**
For simplicity, we'll assume output links are handled by traversing failure links during search.
*   `node_he` is pattern `he`. Its $fail(\text{node_he}) = \text{root}$. No pattern at root.
*   `node_she` is pattern `she`. Its $fail(\text{node_she}) = \text{node_he}$. `node_he` is pattern `he`. So, if we find `she`, we also found `he`.
*   `node_his` is pattern `his`. Its $fail(\text{node_his}) = \text{node_s}$. `node_s` is not a pattern.

**Part 4: Search Text $T = \text{ushers}$**

*   `current_state = root`
*   **Index 0, char 'u'**:
    1.  Root has no 'u' child. State remains `root`.
*   **Index 1, char 's'**:
    1.  Root has 's' child. Move to `node_s`.
    2.  `node_s` is not a pattern end.
*   **Index 2, char 'h'**:
    1.  `node_s` has 'h' child. Move to `node_sh`.
    2.  `node_sh` is not a pattern end.
*   **Index 3, char 'e'**:
    1.  `node_sh` has 'e' child. Move to `node_she`.
    2.  `node_she` is pattern end for `she`. **Report "she" at index 3.**
    3.  Follow failure link chain: $temp\_state = \text{node_she}$.
        *   `node_she` is pattern `she`.
        *   $fail(\text{node_she}) = \text{node_he}$. `node_he` is pattern `he`. **Report "he" at index 3.**
        *   $fail(\text{node_he}) = \text{root}$. No pattern at root. Stop.
*   **Index 4, char 'r'**:
    1.  `current_state` (`node_she`) has no 'r' child.
    2.  Follow $fail(\text{node_she}) = \text{node_he}$. `current_state` becomes `node_he`.
    3.  Now, from `node_he`, check for 'r' child. `node_he` has no 'r' child.
    4.  Follow $fail(\text{node_he}) = \text{root}$. `current_state` becomes `root`.
    5.  Now, from `root`, check for 'r' child. Root has no 'r' child. `current_state` remains `root`.
    6.  No patterns to report.
*   **Index 5, char 's'**:
    1.  `current_state` (root) has 's' child. Move to `node_s`.
    2.  `node_s` is not a pattern end.

**Final Answer:**
The algorithm reports the following matches:
*   **("she", 3)**
*   **("he", 3)**

**Reflection**: This example highlights the importance of failure links and how they allow finding overlapping patterns. When `she` was found, `he` was also reported because `fail(node_she)` leads to `node_he`, which is a pattern. The character 'r' after `she` caused a fallback, and since 'r' wasn't a valid continuation from `he` or `root`, the search effectively reset for that character. Note that `his` was not found because the text `ushers` does not contain `his`.

---

### Example 3: Nested patterns, complex output

**Problem**: Find all occurrences of patterns $P = \{\text{a, aa, aaa}\}$ in text $T = \text{aaaaa}$.

**Given**:
*   Patterns: $P = \{\text{a, aa, aaa}\}$
*   Text: $T = \text{aaaaa}$

**What we want**: List of (pattern, end\_index) pairs.

**Solution Steps**:

**Part 1: Build the Trie**

1.  Start with `root`.
2.  Add `a`: `root` $\xrightarrow{a}$ `node_a`. Mark `node_a` for `a`.
3.  Add `aa`: `node_a` $\xrightarrow{a}$ `node_aa`. Mark `node_aa` for `aa`.
4.  Add `aaa`: `node_aa` $\xrightarrow{a}$ `node_aaa`. Mark `node_aaa` for `aaa`.

**Trie Structure (simplified):**
```
      (root)
        |
        a
       (node_a) - marks "a"
        |
        a
       (node_aa) - marks "aa"
        |
        a
       (node_aaa) - marks "aaa"
```

**Part 2: Build Failure Links (BFS)**

1.  Initialize queue `Q`. Add `root` to `Q`.
2.  $fail(\text{root}) = \text{root}$.
3.  Dequeue `root`. Process children:
    *   `node_a` (from `root` via 'a'): $fail(\text{node_a}) = \text{root}$. Enqueue `node_a`.
4.  Dequeue `node_a`. Process children:
    *   `node_aa` (from `node_a` via 'a'):
        *   Parent `node_a`. $fail(\text{node_a}) = \text{root}$.
        *   From $fail(\text{node_a})$ (`root`), check for 'a' child. `root` has 'a' child (`node_a`).
        *   So, $fail(\text{node_aa}) = \text{node_a}$. Enqueue `node_aa`.
5.  Dequeue `node_aa`. Process children:
    *   `node_aaa` (from `node_aa` via 'a'):
        *   Parent `node_aa`. $fail(\text{node_aa}) = \text{node_a}$.
        *   From $fail(\text{node_aa})$ (`node_a`), check for 'a' child. `node_a` has 'a' child (`node_aa`).
        *   So, $fail(\text{node_aaa}) = \text{node_aa}$. Enqueue `node_aaa`.
6.  Dequeue `node_aaa`. No children. Queue is empty.

**Failure Links:**
*   $fail(\text{root}) = \text{root}$
*   $fail(\text{node_a}) = \text{root}$
*   $fail(\text{node_aa}) = \text{node_a}$
*   $fail(\text{node_aaa}) = \text{node_aa}$

**Part 3: Build Output Links**
(Again, handled by traversing failure links during search for simplicity, but explicitly chaining them would be: $output(\text{node_aaa}) \to \text{node_aa}$, $output(\text{node_aa}) \to \text{node_a}$)

**Part 4: Search Text $T = \text{aaaaa}$**

*   `current_state = root`
*   **Index 0, char 'a'**:
    1.  Root has 'a' child. Move to `node_a`.
    2.  `node_a` is pattern end for `a`. **Report "a" at index 0.**
    3.  $fail(\text{node_a}) = \text{root}$. No more patterns.
*   **Index 1, char 'a'**:
    1.  `current_state` (`node_a`) has 'a' child. Move to `node_aa`.
    2.  `node_aa` is pattern end for `aa`. **Report "aa" at index 1.**
    3.  Follow failure link chain: $temp\_state = \text{node_aa}$.
        *   `node_aa` is pattern `aa`.
        *   $fail(\text{node_aa}) = \text{node_a}$. `node_a` is pattern `a`. **Report "a" at index 1.**
        *   $fail(\text{node_a}) = \text{root}$. No more patterns.
*   **Index 2, char 'a'**:
    1.  `current_state` (`node_aa`) has 'a' child. Move to `node_aaa`.
    2.  `node_aaa` is pattern end for `aaa`. **Report "aaa" at index 2.**
    3.  Follow failure link chain: $temp\_state = \text{node_aaa}$.
        *   `node_aaa` is pattern `aaa`.
        *   $fail(\text{node_aaa}) = \text{node_aa}$. `node_aa` is pattern `aa`. **Report "aa" at index 2.**
        *   $fail(\text{node_aa}) = \text{node_a}$. `node_a` is pattern `a`. **Report "a" at index 2.**
        *   $fail(\text{node_a}) = \text{root}$. No more patterns.
*   **Index 3, char 'a'**:
    1.  `current_state` (`node_aaa`) has 'a' child. Move to `node_aaa` (this is a self-loop from `node_aaa` back to itself, because `node_aaa` has a child for 'a' that leads to `node_aaaa` if it existed, but here it's `node_aaa` that becomes the new state after a transition from `node_aaa` with 'a' and following failure links).
        Let's be precise: `node_aaa` has no child for 'a' that extends `aaaa`.
        So, $current\_state$ (`node_aaa`) has no 'a' child.
        Follow $fail(\text{node_aaa}) = \text{node_aa}$. `current_state` becomes `node_aa`.
        Now, from `node_aa`, check for 'a' child. `node_aa` has 'a' child (`node_aaa`). Move to `node_aaa`.
    2.  `node_aaa` is pattern end for `aaa`. **Report "aaa" at index 3.**
    3.  Follow failure link chain: $temp\_state = \text{node_aaa}$.
        *   `node_aaa` is pattern `aaa`.
        *   $fail(\text{node_aaa}) = \text{node_aa}$. `node_aa` is pattern `aa`. **Report "aa" at index 3.**
        *   $fail(\text{node_aa}) = \text{node_a}$. `node_a` is pattern `a`. **Report "a" at index 3.**
        *   $fail(\text{node_a}) = \text{root}$. No more patterns.
*   **Index 4, char 'a'**:
    1.  `current_state` (`node_aaa`) has no 'a' child.
    2.  Follow $fail(\text{node_aaa}) = \text{node_aa}$. `current_state` becomes `node_aa`.
    3.  Now, from `node_aa`, check for 'a' child. `node_aa` has 'a' child (`node_aaa`). Move to `node_aaa`.
    4.  `node_aaa` is pattern end for `aaa`. **Report "aaa" at index 4.**
    5.  Follow failure link chain: $temp\_state = \text{node_aaa}$.
        *   `node_aaa` is pattern `aaa`.
        *   $fail(\text{node_aaa}) = \text{node_aa}$. `node_aa` is pattern `aa`. **Report "aa" at index 4.**
        *   $fail(\text{node_aa}) = \text{node_a}$. `node_a` is pattern `a`. **Report "a" at index 4.**
        *   $fail(\text{node_a}) = \text{root`. No more patterns.

**Final Answer:**
The algorithm reports the following matches:
*   **("a", 0)**
*   **("aa", 1)**
*   **("a", 1)**
*   **("aaa", 2)**
*   **("aa", 2)**
*   **("a", 2)**
*   **("aaa", 3)**
*   **("aa", 3)**
*   **("a", 3)**
*   **("aaa", 4)**
*   **("aa", 4)**
*   **("a", 4)**

**Reflection**: This example demonstrates the full power of Aho-Corasick in finding all overlapping and nested patterns. The failure links and the subsequent reporting via the failure chain ensure that every possible match is identified. The state transitions can be tricky to trace manually when a character leads to a failure link, and then that same character is re-evaluated from the new state.

---

### Example 4: Complex failure and output links

**Problem**: Find all occurrences of patterns $P = \{\text{ab, bc, bcd, cde}\}$ in text $T = \text{abcde}$.

**Given**:
*   Patterns: $P = \{\text{ab, bc, bcd, cde}\}$
*   Text: $T = \text{abcde}$

**What we want**: List of (pattern, end\_index) pairs.

**Solution Steps**:

**Part 1: Build the Trie**

1.  Start with `root`.
2.  Add `ab`: `root` $\xrightarrow{a}$ `node_a` $\xrightarrow{b}$ `node_ab`. Mark `node_ab` for `ab`.
3.  Add `bc`: `root` $\xrightarrow{b}$ `node_b` $\xrightarrow{c}$ `node_bc`. Mark `node_bc` for `bc`.
4.  Add `bcd`: `node_bc` $\xrightarrow{d}$ `node_bcd`. Mark `node_bcd` for `bcd`.
5.  Add `cde`: `root` $\xrightarrow{c}$ `node_c` $\xrightarrow{d}$ `node_cd` $\xrightarrow{e}$ `node_cde`. Mark `node_cde` for `cde`.

**Trie Structure (simplified):**
```
      (root)
      / | \
     a  b  c
    /   |  |
  (node_a)(node_b)(node_c)
    |   |    |
    b   c    d
  (node_ab) (node_bc) (node_cd)
             |          |
             d          e
           (node_bcd) (node_cde)
```

**Part 2: Build Failure Links (BFS)**

1.  Initialize queue `Q`. Add `root` to `Q`.
2.  $fail(\text{root}) = \text{root}$.
3.  Dequeue `root`. Process children:
    *   `node_a`: $fail(\text{node_a}) = \text{root}$. Enqueue `node_a`.
    *   `node_b`: $fail(\text{node_b}) = \text{root}$. Enqueue `node_b`.
    *   `node_c`: $fail(\text{node_c}) = \text{root}$. Enqueue `node_c`.
4.  Dequeue `node_a`. Process children:
    *   `node_ab`: $fail(\text{node_ab}) = \text{root}$ (from $fail(\text{node_a})=\text{root}$, no 'b' child in root). Enqueue `node_ab`.
5.  Dequeue `node_b`. Process children:
    *   `node_bc`: $fail(\text{node_bc}) = \text{root}$ (from $fail(\text{node_b})=\text{root}$, no 'c' child in root). Enqueue `node_bc`.
6.  Dequeue `node_c`. Process children:
    *   `node_cd`: $fail(\text{node_cd}) = \text{root}$ (from $fail(\text{node_c})=\text{root}$, no 'd' child in root). Enqueue `node_cd`.
7.  Dequeue `node_ab`. No children.
8.  Dequeue `node_bc`. Process children:
    *   `node_bcd`: $fail(\text{node_bcd}) = \text{node_cd}$ (from $fail(\text{node_bc})=\text{root}$, 'd' child of root is not `node_cd`. Wait, this is wrong. $fail(\text{node_bc})=\text{root}$. From root, 'd' is not a child. So $fail(\text{node_bcd}) = \text{root}$. This is crucial. Let's re-evaluate.)
        *   For `node_bcd` (from `node_bc` via 'd'):
            *   Parent `node_bc`. $fail(\text{node_bc}) = \text{root}$.
            *   From $fail(\text{node_bc})$ (`root`), check for 'd' child. `root` has no 'd' child.
            *   So, $fail(\text{node_bcd}) = \text{root}$. Enqueue `node_bcd`.
9.  Dequeue `node_cd`. Process children:
    *   `node_cde`: $fail(\text{node_cde}) = \text{node_e}$ (from $fail(\text{node_cd})=\text{root}$, no 'e' child in root. This is also wrong.)
        *   For `node_cde` (from `node_cd` via 'e'):
            *   Parent `node_cd`. $fail(\text{node_cd}) = \text{root}$.
            *   From $fail(\text{node_cd})$ (`root`), check for 'e' child. `root` has no 'e' child.
            *   So, $fail(\text{node_cde}) = \text{root}$. Enqueue `node_cde`.
10. Dequeue `node_bcd`. No children.
11. Dequeue `node_cde`. No children. Queue is empty.

**Corrected Failure Links (this is where it gets tricky due to common suffixes):**
Let's re-do failure links carefully.
*   $fail(\text{root}) = \text{root}$
*   $fail(\text{node_a}) = \text{root}$
*   $fail(\text{node_b}) = \text{root}$
*   $fail(\text{node_c}) = \text{root}$
*   $fail(\text{node_ab})$: Parent `node_a`, $fail(\text{node_a}) = \text{root}$. Root has no 'b' child. So $fail(\text{node_ab}) = \text{root}$.
*   $fail(\text{node_bc})$: Parent `node_b`, $fail(\text{node_b}) = \text{root}$. Root has no 'c' child. So $fail(\text{node_bc}) = \text{root}$.
*   $fail(\text{node_cd})$: Parent `node_c`, $fail(\text{node_c}) = \text{root}$. Root has no 'd' child. So $fail(\text{node_cd}) = \text{root}$.

Now for deeper nodes:
*   $fail(\text{node_bcd})$: Parent `node_bc`, $fail(\text{node_bc}) = \text{root}$. Root has no 'd' child. So $fail(\text{node_bcd}) = \text{root}$.
*   $fail(\text{node_cde})$: Parent `node_cd`, $fail(\text{node_cd}) = \text{root}$. Root has no 'e' child. So $fail(\text{node_cde}) = \text{root}$.

This set of failure links is too simple. The logic for failure links needs to consider *all* patterns.
Let's re-examine $fail(\text{node_bcd})$. String is "bcd". Proper suffixes are "cd", "d".
Is "cd" a prefix of any pattern? No.
Is "d" a prefix of any pattern? No.
So $fail(\text{node_bcd})$ should indeed be `root`.

Let's re-examine $fail(\text{node_cde})$. String is "cde". Proper suffixes are "de", "e".
Is "de" a prefix of any pattern? No.
Is "e" a prefix of any pattern? No.
So $fail(\text{node_cde})$ should indeed be `root`.

This means the failure links are simpler than I initially thought for this specific set of patterns.
The only non-root failure links would occur if a suffix of a node's string was *also a prefix* of another pattern.
E.g., if patterns were `abc`, `bc`, `c`. Then $fail(\text{node_abc})$ would be `node_bc`.

**Part 3: Build Output Links**
This is where the actual overlap detection happens for this example.
*   `node_ab` is pattern `ab`.
*   `node_bc` is pattern `bc`.
*   `node_bcd` is pattern `bcd`. Its $fail(\text{node_bcd}) = \text{root}$. No patterns at root.
*   `node_cde` is pattern `cde`. Its $fail(\text{node_cde}) = \text{root}$. No patterns at root.

No explicit output links if we handle by traversing failure chain.

**Part 4: Search Text $T = \text{abcde}$**

*   `current_state = root`
*   **Index 0, char 'a'**:
    1.  Root has 'a' child. Move to `node_a`.
    2.  `node_a` is not a pattern.
*   **Index 1, char 'b'**:
    1.  `node_a` has 'b