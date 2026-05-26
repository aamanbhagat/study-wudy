## 1. The one-sentence answer
**The Aho-Corasick algorithm builds a deterministic finite automaton from a dictionary of patterns so that every occurrence of any pattern inside a text can be reported in total linear time.**

It begins with a trie of the patterns. Each node represents a prefix. From every node the automaton records the longest proper suffix that is also a prefix of some pattern; these “failure” links turn the trie into a complete automaton that never needs to backtrack while scanning the text. Because every transition is precomputed, a single left-to-right pass over the text visits a constant number of states per character and emits every match the instant it occurs.

The same failure links also propagate output lists, so that when a state is reached all patterns that end there are reported without extra work. The construction phase costs linear time in the total length of the patterns; the matching phase costs linear time in the length of the text plus the number of matches reported.

> [!NOTE]
> The single deepest insight is that failure links convert an otherwise exponential backtracking search into a deterministic walk whose every step is O(1).

## 2. Why this matters — concrete and current
In computational biology, the Aho-Corasick automaton is the core of the Kraken taxonomic classifier used by the NIH and thousands of metagenomics pipelines; it simultaneously matches millions of k-mer signatures against gigabase-scale reads in a single linear pass.

Modern anti-virus engines such as ClamAV and Windows Defender maintain automata over tens of thousands of malware signatures; each incoming file is scanned once, with matches emitted instantly and without rescanning.

Packet-filtering hardware in high-speed routers (e.g., those implementing Snort rulesets at 100 Gb/s) compiles intrusion-detection patterns into Aho-Corasick automata that fit in on-chip SRAM, guaranteeing line-rate inspection with bounded memory.

In large-scale natural-language processing, Lucene’s “MultiPhraseQuery” and certain neural-machine-translation tokenizers pre-build Aho-Corasick automata over domain-specific lexicons so that entity linking or compound-word splitting occurs in linear time during indexing.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Trie (prefix tree)       | The initial structure that stores all patterns            |
| Finite automaton         | The model that guarantees O(1) transitions per character  |
| Suffix–prefix overlap    | The combinatorial fact that failure links exploit         |
| Breadth-first search     | The order in which failure links must be computed         |

## 4. Building the idea — from intuition to formalism

### Step 1 — Insert every pattern into a trie
Plain English: each pattern becomes a path from the root; identical prefixes share nodes.

Example: patterns “he”, “she”, “his”.  
Root → h → e (output “he”)  
Root → s → h → e (output “she”)  
Root → h → i → s (output “his”).

Formal statement:  
Let \(P = \{p_1,\dots,p_k\}\). The trie \(T\) is the minimal deterministic tree such that every \(p_i\) labels a unique path from the root.

> [!WARNING]
> Forgetting to mark output nodes at pattern ends will silently drop matches that end exactly at those states.

### Step 2 — Add failure links by longest proper suffix
Plain English: for every node, compute the longest suffix of the string it represents that is also a prefix stored in the trie.

Formal statement:  
For node \(u\) representing string \(w\), the failure link \(\pi(u)\) points to the node representing the longest proper suffix of \(w\) that is a prefix of some pattern.

> [!WARNING]
> Using the entire string instead of a proper suffix produces self-loops that hide shorter patterns.

### Step 3 — Propagate outputs along failure links
Plain English: any match found via a failure link must also be reported.

Formal statement:  
The output list of \(u\) is the union of its own patterns and the output list of \(\pi(u)\).

### Step 4 — Complete the transition function
Plain English: every character from every state must have a defined next state; missing edges follow failure links.

Formal statement:  
\(\delta(u,c) = \delta(\pi(u),c)\) when no direct child exists.

### Step 5 — Breadth-first construction order
Plain English: failure links of children can be computed only after their parent’s failure link is known.

Formal statement:  
Process nodes level by level; \(\pi(u)\) is obtained from \(\pi(\text{parent}(u))\) in constant time.

### Step 6 — Linear-time guarantee
Plain English: each character of the text advances the automaton exactly once; each match is reported in amortized constant time.

Formal statement:  
Matching costs \(O(|T| + |M|)\) where \(|M|\) is the number of matches reported.

## 5. Worked examples — every step shown

**Example 1 — Two short disjoint patterns**  
*Given:* patterns “ab”, “cd”; text “xabcy”.  
*Find:* all matches and their ending positions.  

1. Build trie: root— a — b (out “ab”); root— c — d (out “cd”).  
   *Why:* each pattern receives its own path.  
2. Failure links: both depth-1 nodes fail to root.  
   *Why:* no proper suffix matches any prefix.  
3. Scan “x”: stay at root.  
   *Why:* no transition on ‘x’.  
4. Scan “a”: move to node “a”.  
5. Scan “b”: move to node “ab”, emit “ab” at position 3.  
   *Why:* direct transition exists.  
6. Continue similarly; “cd” never matches.  

**Final answer**  
Matches: (“ab”, end index 3).

*Reflection:* disjoint patterns produce an almost tree-like automaton; the only non-trivial work is the root self-loop.

**Example 2 — Overlapping patterns**  
*Given:* patterns “he”, “she”; text “shershe”.  
*Find:* every match.  

1. Trie: root— s — h — e (out “she”); root— h — e (out “he”).  
2. Failure of “h” (under s) points to the standalone “h”.  
   *Why:* suffix “h” of “sh” equals prefix “h”.  
3. Failure of “e” under “h” points to “e” under root.  
4. Scan yields matches at positions 3 (“she”), 4 (“he”), 7 (“she”).

**Final answer**  
Matches at ending positions 3,4,7.

*Reflection:* failure links automatically discover the embedded “he” inside “she”.

**Example 3 — Multiple matches at one position**  
*Given:* patterns “a”, “aa”; text “aaa”.  
*Find:* all ending positions and which patterns matched.  

1. Trie contains root— a (out “a”)— a (out “aa”).  
2. Failure of second “a” points to first “a”; its output list therefore contains both.  
3. After three steps the automaton sits at depth 2 and reports both patterns at every position ≥2.

**Final answer**  
Position 1: “a”; positions 2,3: “a” and “aa”.

*Reflection:* output propagation via failure links is what reports multiple patterns without rescanning.

**Example 4 — Pattern that is suffix of another**  
*Given:* patterns “bc”, “abc”; text “xabc”.  
*Find:* matches.  

1. Trie: root— a — b — c (out “abc”); root— b — c (out “bc”).  
2. Failure of the “b” under “a” points to the standalone “b”.  
3. Consequently the final “c” reports both patterns.

**Final answer**  
Matches (“abc”,3) and (“bc”,3).

*Reflection:* the automaton discovers the shorter pattern automatically once the longer one is recognized.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                              |
|-------------------------------------|-----------------------------------------------------|----------------------------------------------|
| Forgetting to follow failure links during matching | Intuition that every transition must be explicit   | Always implement \(\delta\) with the while-loop or precompute full table |
| Storing only the deepest match      | Output lists are not merged along failure links     | Union outputs at construction time           |
| Using DFS instead of BFS for links  | Children’s failures depend on parents               | Enforce level-order processing               |
| Treating the empty string as pattern| Root failure link becomes undefined                 | Reject empty patterns at input validation    |
| Reporting matches before consuming the character | Off-by-one in transition timing                     | Emit outputs after the transition, not before|
| Assuming patterns are distinct      | Duplicate patterns create duplicate output entries  | Use a set when inserting into output lists   |
| Not handling alphabet size          | Transition table becomes huge for Unicode           | Use map or hash table for sparse alphabets   |

## 7. The textbook-precise statement
Aho-Corasick constructs, in \(O(\sum |p_i| \cdot |\Sigma|)\) time, a deterministic automaton \((\,Q,\Sigma,\delta,q_0,F\,)\) whose failure function \(\pi\) satisfies  
\[
\delta(q,a) = \delta(\pi(q),a)
\]  
whenever the direct transition is absent. Every path label from the root to a state in \(F\) corresponds to a pattern occurrence. The algorithm appears in Aho & Corasick, “Efficient string matching: an aid to bibliographic search”, *Communications of the ACM* 18(6):333–340, 1975; a modern presentation is given in Cormen et al., *Introduction to Algorithms*, 3e, §32.4 (exercises).

## 8. Visual — diagram or schematic
```text
          root
         /    \
        a      b
       / \     |
      b   c    c  (out "bc")
     /     \
    c       (out "abc")
   (out "abc","bc")
Failure links:
  node "b"(under a) → node "b"(under root)
  node "c"(under b) → node "c"(under root)
```
Each solid arrow is a trie edge; dashed arrows are failure links. The diagram is fully determined once the patterns “abc” and “bc” are inserted.

## 9. The memory technique
1. **The hook** — picture a detective walking down a corridor of doors; every door has a “failure” rope that drops him to the longest suffix corridor that still makes sense.  
2. **What to overlearn** — (i) failure links are computed by BFS, (ii) output lists are unioned along failure links, (iii) matching never backtracks.  
3. **Spaced-repetition schedule** — review construction at 1 day, full automaton at 3 days, matching phase at 7 days, edge-case patterns at 16 days, implementation from scratch at 35 days.  
4. **First-principles fallback** — rebuild the trie, then re-derive each failure link from the parent’s failure link using the suffix–prefix definition.

## 10. What this unlocks
Aho-Corasick supplies the linear-time multiple-pattern primitive that later algorithms compose with suffix arrays, wavelet trees, and streaming sketches.

- Building the AC automaton inside a suffix automaton yields the “dictionary matching on compressed text” problem.  
- Using AC failure links as the backbone of the KMP automaton for a single pattern shows the direct generalization.  
- Modern variants appear in two-dimensional pattern matching and in the Aho-Corasick–like structures used by GPU-accelerated BLAST.

## 11. Self-check — five questions, no answers
1. Given patterns “aa”, “aaa”, how many distinct states does the final automaton contain?  
2. While scanning a text of length \(n\) that contains \(m\) overlapping matches, what is the exact number of automaton transitions performed?  
3. Why must failure links be computed by BFS rather than DFS?  
4. Suppose two patterns are identical; which data structure choice prevents duplicate output entries?  
5. If the alphabet size is \(10^5\) (Unicode), which implementation decision keeps both construction and matching linear?