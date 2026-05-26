## 1. The one-sentence answer
**Aho-Corasick builds a finite automaton from multiple patterns so that any text can be scanned once in linear time while reporting every occurrence of every pattern.**

The algorithm first inserts all patterns into a trie. Each node stores the character that leads to it and a list of patterns that end there. From the trie it then computes failure links that act exactly like the prefix table in KMP, but across every branch of the trie. Once the automaton is complete, processing the text becomes a simple walk: at every step you follow the next character or slide along a failure link; whenever you land on a node that ends a pattern you report a match.

The decisive insight is that failure links turn the whole structure into a deterministic automaton whose states already encode every possible overlap among the patterns. After the linear-time preprocessing you never need to backtrack on the text again.

> [!NOTE]
> The single “aha” is that the failure function pre-computes every possible mismatch so the automaton never restarts from scratch; it only jumps to the longest proper suffix that is also a prefix of some pattern.

## 2. Why this matters — concrete and current
In anti-virus engines such as ClamAV and Windows Defender, thousands of malware signatures must be matched against every incoming file; Aho-Corasick lets the scanner run in time linear in file size regardless of the number of signatures.

Bioinformatics pipelines such as Bowtie2 and BWA use a variant of the automaton to locate all occurrences of short sequencing reads inside a reference genome while tolerating a few mismatches via the failure links.

Modern packet-inspection hardware in Cisco and Juniper routers employs Aho-Corasick automata in ternary content-addressable memory (TCAM) to detect intrusion signatures at multi-gigabit line rates without dropping packets.

Search engines and log-analytics platforms such as Elasticsearch rely on the same automaton when they evaluate hundreds of regular-expression or keyword alerts against streaming log lines in a single pass.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Trie (prefix tree)       | The initial structure that stores all patterns and gives the “goto” transitions.     |
| KMP prefix (failure) function | Supplies the intuition for failure links that handle mismatches without backtracking. |
| Finite automaton         | The final view of the trie-plus-failure-links as a deterministic state machine.      |
| BFS / level-order traversal | Required to compute failure links correctly, level by level.                         |

If any of the above rows is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Insert every pattern into a trie
You create a root node and, for each pattern, walk character by character, adding new child nodes only when a transition does not already exist. Every node that corresponds to the end of a pattern stores the pattern index (or the word itself).

Example: patterns “he”, “she”, “his”. After insertion the trie contains nodes for h→e, s→h→e, h→i→s.

Formally, let the transition function be \(\delta(q, c)\) where \(q\) is a state and \(c\) a character. Initially \(\delta\) is partial.

> [!WARNING]
> If you forget to mark output nodes, later matches will be invisible even though the automaton reaches the correct state.

### Step 2 — Add failure links via BFS
Process nodes level by level. For a node reached by character \(c\) from parent \(p\), its failure link points to the state you would reach from the failure of \(p\) by following \(c\). This is exactly the KMP border computation lifted to a tree.

Formal statement: \(\text{fail}(q) = \delta^*(\text{fail}(p), c)\) where \(\delta^*\) follows failure links until a defined transition appears.

> [!WARNING]
> Computing failure links in DFS order instead of BFS produces incorrect borders because a node’s parent failure must already be finalised.

### Step 3 — Merge output links
When a failure link lands on a node that itself ends a pattern, you must also report that pattern. The clean way is to chain output links so that a single state can emit multiple matches in constant time per match.

### Step 4 — Determinise the automaton
For every state and every alphabet symbol, pre-compute the next state by following failure links if necessary. After this step \(\delta(q, c)\) is total for the whole alphabet.

### Step 5 — Run the automaton on the text
Start at the root. For each character \(t_i\) set \(q \leftarrow \delta(q, t_i)\). If \(q\) has an output (or its output-link chain), report the matches ending at position \(i\).

The textbook-grade statement appears in Section 7.

## 5. Worked examples

**Example 1 — Two short patterns, tiny text**
*Given:* patterns = ["he","she"], text = "shershe".
*Find:* every match position.
Insert “he” and “she”. After failure-link computation, state for “he” fails to the state after “e” of “she”.  
Processing: s→sh→she (match “she” at 3), e→r (fail to root), s→sh→she (match “she” at 7), e (match “he” at 7).  
*Why* each step: failure link from “she” state already encodes that the suffix “he” is also a pattern.  
**Final answer**  
Matches: “she”@3, “she”@7, “he”@7.

**Example 2 — Overlapping patterns**
*Given:* patterns = ["aa","aaa"], text = "aaaa".
After automaton construction the state reached after three ‘a’s carries outputs for both patterns.  
Run yields matches at positions 2,3,4 for “aa” and 3,4 for “aaa”.  
*Why* the overlaps appear automatically: failure links point back inside the same chain of ‘a’s.

**Example 3 — Pattern that is suffix of another**
*Given:* patterns = ["bc","abc"], text = "abc".
The automaton reaches the “abc” node; its failure link points to the “bc” node, so both matches are reported at position 3.

**Example 4 — Larger alphabet with missing transitions**
*Given:* patterns = ["ab","ba"], text = "abab", alphabet {a,b,c}.
All missing transitions are routed to root via failure links. The run correctly reports “ab” at 2 and 4, “ba” at 3.

*Reflection:* each example forces the failure links to handle a different kind of overlap; together they cover the three common sources of multiple matches.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting to store multiple outputs at one node | Students think one pattern ends per state           | Keep an explicit output list or chained output link  |
| Computing failure links without BFS | DFS order leaves parent failures undefined          | Always use a queue exactly as in level-order BFS     |
| Not pre-computing all \(\delta(q,c)\) | Runtime jumps along failure links become visible    | After link construction, run a second pass to totalise the transition table |
| Treating the automaton as non-deterministic at runtime | Slows the scan to quadratic                         | Determinise once in preprocessing                    |
| Reporting matches without position | Position = current text index minus pattern length  | Always record the end index while walking the text   |
| Ignoring empty patterns           | Trie root becomes an immediate match                | Reject or specially handle length-zero patterns      |
| Alphabet size mismatch            | Missing transitions cause null-pointer crashes      | Explicitly initialise every state with all symbols   |

## 7. The textbook-precise statement
Let \(P = \{P_1, \dots, P_k\}\) be a set of patterns over alphabet \(\Sigma\). The Aho-Corasick automaton is the 5-tuple \((Q, \Sigma, \delta, q_0, F)\) where \(Q\) is the set of nodes of the trie, \(q_0\) the root, \(F \subseteq Q\) the nodes that end at least one pattern, and the transition function \(\delta\) is defined by first building the goto function on the trie edges and then augmenting it with the failure function \(f: Q \to Q\) computed by breadth-first traversal:

\[
f(q) = 
\begin{cases}
q_0 & \text{if } q = q_0, \\
\delta(f(p), a) & \text{if } q = \delta(p, a) \text{ and } \delta(f(p), a) \text{ defined}.
\end{cases}
\]

After \(f\) is known, \(\delta(q, a)\) is made total by following failure links. The running time to build the automaton is \(O(|P| \cdot |\Sigma|)\) and the running time to scan a text \(T\) is \(O(|T| + occ)\) where \(occ\) is the number of matches reported. (Cormen et al., *Introduction to Algorithms*, 3e, Chapter 32, Section 32.4, extended with the original Aho–Corasick construction.)

## 8. Visual — diagram or schematic
```
          root
         /    \
        h      s
       / \      \
      e   i      h
     /   /        \
   (he) i          e
       /            \
     (his)           (she)
Failure links:
  “e”(he)  → root
  “i”(his) → root
  “h”(she) → “h”(root child)
  “e”(she) → “e”(he)   ← also carries “he” output
```
States with double circles are output states. Dashed arrows show failure links.

## 9. The memory technique

1. **The hook** — picture a telephone switchboard where every cable that fails to connect immediately drops to the next lower socket that still makes sense; that dropping cable is the failure link.
2. **What to overlearn** — (a) failure links are computed by BFS, (b) after construction \(\delta(q,c)\) must be total, (c) match reporting walks the output-link chain.
3. **Spaced-repetition schedule** — review the failure-link construction at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — if you forget the exact formula, rebuild the automaton from the definition: insert patterns, run BFS from the root, and at each node set \(f(q)=\delta(f(p),c)\) while following already-computed failures.

## 10. What this unlocks
Once you master Aho-Corasick you can immediately understand:
- Generalised suffix automata and their use in bioinformatics.
- The construction of the Aho-Corasick-based “multiple regex” engines inside Hyperscan and RE2.
- How to extend the automaton with edit-distance transitions for approximate matching.
- The relationship between Aho-Corasick and the Z-algorithm when all patterns are suffixes of one another.

## 11. Self-check — five questions, no answers
1. Build the Aho-Corasick automaton for patterns {“a”, “ab”, “bc”} and list every transition and failure link.
2. In the text “abcbc”, at which positions does the automaton report matches and which patterns?
3. Why does a naïve trie without failure links give quadratic behaviour on the input “aaaa…a” with pattern “a”?
4. Suppose two patterns differ only in their last character; how many extra states does the automaton need compared with a single pattern?
5. A student computed failure links in DFS order and obtained an automaton that missed half the matches. Which invariant was violated?