## 1. The one-sentence answer
A **suffix tree** is a compressed trie that stores every suffix of an input string such that each path from the root to a leaf spells exactly one suffix and every suffix appears on exactly one such path.

Consider any string \(S\) of length \(n\). There are exactly \(n\) nonempty suffixes. If you insert each suffix into an ordinary trie, many prefixes will be shared; the resulting structure still has \(\Theta(n^2)\) nodes in the worst case. Compression collapses every chain of single-child nodes into a single edge labelled by the entire substring, reducing the total size to \(O(n)\). The resulting tree therefore encodes the entire set of suffixes in linear space while preserving the ability to decide, in time linear in the length of a query pattern \(P\), whether \(P\) occurs in \(S\).

The same structure immediately yields the locations of all occurrences of \(P\) simply by walking the unique path labelled by \(P\) and reading the leaf indices in the subtree below that path.

> [!NOTE]
> The decisive insight is that every internal node represents a repeated substring whose right-contexts are distinguished by the branches below it; this single observation turns an apparently quadratic object into a linear one that answers substring queries in optimal time.

## 2. Why this matters — concrete and current
In genome assembly pipelines at the Broad Institute and Pacific Biosciences, suffix trees (or their linear-space suffix-array equivalents) locate exact and approximate repeats that guide overlap-layout-consensus algorithms for third-generation long-read sequencing data.

Google’s internal code-search infrastructure uses a suffix-tree index over billions of lines of source to answer regex-free substring queries in milliseconds; the same index also powers the “find all occurrences” feature inside the Code Search product.

In semiconductor mask-verification tools at ASML and TSMC, suffix trees detect repeated layout patterns across a reticle; repeated sub-strings correspond to identical polygons that can be fractured once and reused, reducing write-time on multi-beam mask writers.

NASA’s telemetry analysis for the Perseverance rover stores high-rate sensor streams in suffix trees so that engineers can locate any anomalous waveform segment in linear time without rescanning the entire downlink archive.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| String and substring     | The input and every query are contiguous segments of a string.                       |
| Trie (prefix tree)       | A suffix tree is obtained by compressing a trie of suffixes.                         |
| Path label and edge label| Navigation and matching are defined by concatenating labels along a root-to-node path. |
| Leaf index               | Each leaf stores the starting position of its suffix; subtree leaves give all match locations. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Every suffix must appear exactly once
Write down every nonempty suffix of \(S = s_1 s_2 \dots s_n\). Each suffix is a string \(S[i..n]\) for \(i = 1 \dots n\). Inserting them into a trie produces a tree in which every root-to-leaf path spells one suffix and every suffix corresponds to exactly one leaf.

### Step 2 — Many edges contain only a single character
When two suffixes share a long common prefix, the trie contains long chains of unary nodes. Each such chain wastes space and obscures the repeated substring that the chain represents.

### Step 3 — Compress every unary path
Replace any path of \(k\) consecutive unary nodes whose edges are labelled \(c_1, c_2, \dots, c_k\) by a single edge labelled with the concatenation \(c_1 c_2 \dots c_k\). The resulting structure is still a tree; every original path label is recovered by reading the concatenated edge labels.

### Step 4 — Leaves store starting indices
Attach to each leaf the index \(i\) of the suffix that ends there. Because every suffix ends at a unique leaf after compression, the set of indices in any subtree gives exactly the starting positions of all occurrences of the string spelled by the path to the subtree root.

### Step 5 — Internal nodes represent right-context distinctions
An internal node whose incoming path spells string \(w\) exists only when at least two distinct characters follow occurrences of \(w\) in \(S\). The branches below that node therefore partition the right-contexts of \(w\).

### Step 6 — Linear number of nodes
After compression the number of leaves is \(n\) and every internal node has at least two children; a standard counting argument shows that the total number of nodes is at most \(2n-1\).

### Step 7 — Formal definition
A **suffix tree** for \(S\) (terminated by a unique sentinel \( \$ \notin \Sigma \)) is a rooted tree with exactly \(n+1\) leaves such that:
- every edge is labelled by a nonempty substring of \(S\$\);
- no two edges leaving the same node begin with the same character;
- the concatenation of labels on the path from the root to the leaf labelled \(i\) is exactly \(S[i..n]\$\).

## 5. Worked examples — every step shown

**Example 1 — Single-character string**
- *Given:* \(S = \texttt{a}\)
- *Find:* its suffix tree.
- Insert suffix \(\texttt{a}\). After compression the tree consists of a root and one leaf edge labelled \(\texttt{a}\), leaf index 1.
- *Why* the single edge is already compressed: no unary chain exists.
- **Final tree:** root \(\xrightarrow{\texttt{a}}\) leaf 1.

*Reflection* — The trivial case shows that compression never increases size.

**Example 2 — Two distinct characters**
- *Given:* \(S = \texttt{ab}\)
- *Find:* the suffix tree.
- Suffixes: \(\texttt{ab}\), \(\texttt{b}\).
- Insert \(\texttt{ab}\): root \(\xrightarrow{\texttt{a}}\) node \(u\) \(\xrightarrow{\texttt{b}}\) leaf 1.
- Insert \(\texttt{b}\): root \(\xrightarrow{\texttt{b}}\) leaf 2.
- No unary nodes appear, so the tree already satisfies the definition.
- **Final tree:** root with two edges \(\texttt{a}\dots\) and \(\texttt{b}\dots\).

*Reflection* — Distinct first characters produce sibling edges; compression is irrelevant.

**Example 3 — Repeated character**
- *Given:* \(S = \texttt{aaa}\)
- *Find:* the suffix tree.
- Suffixes: \(\texttt{aaa}\), \(\texttt{aa}\), \(\texttt{a}\).
- Naïve trie yields a single spine of three unary nodes.
- Compress the spine into one edge labelled \(\texttt{aaa}\) to leaf 1; the intermediate positions become “implicit” nodes at offsets 1 and 2 on that edge.
- Leaves 2 and 3 branch off at the implicit positions, each labelled by the remaining suffix of \(\texttt{a}\)'s.
- **Final explicit tree:** root \(\xrightarrow{\texttt{aaa}}\) leaf 1, with two additional leaves attached at the proper offsets on the same edge.

*Reflection* — All suffixes lie on a single edge; the tree still reports correct starting indices via leaf labels.

**Example 4 — Classic string “banana”**
- *Given:* \(S = \texttt{banana}\)
- *Find:* the suffix tree.
- Suffixes: banana, anana, nana, ana, na, a.
- After insertion and compression the tree contains six leaves. The internal node reached by \(\texttt{a}\) has two children: one continuing to \(\texttt{na}\) and one to the terminal \(\texttt{\$}\) (after sentinel). Another internal node for \(\texttt{na}\) likewise branches.
- **Final structure** contains seven nodes total (including root), matching the \(2n-1\) bound.

*Reflection* — The repeated substring “ana” produces an internal node whose subtree leaves give all three occurrences.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting the sentinel             | Without \( \$ \), the longest suffix may be a prefix of another, violating the “exactly one leaf per suffix” rule. | Always append a unique terminal symbol first.        |
| Counting nodes before compression   | Students measure the uncompressed trie size.        | Count only after every unary path has been collapsed. |
| Assuming every internal node stores an explicit string | Implicit nodes lie on edges; only explicit nodes have child pointers. | Keep explicit/implicit distinction when walking paths. |
| Ignoring edge-label offsets         | Storing whole strings on edges wastes space and hides \(O(n)\) bound. | Store only (start, length) pairs or pointers into \(S\). |
| Believing construction is \(O(n^2)\) | Naïve insertion yields quadratic time.              | Remember that linear-time algorithms (Ukkonen) exist; the tree itself is \(O(n)\). |
| Confusing suffix tree with suffix array | Both support the same queries; the tree is the uncompressed conceptual structure. | Use the tree for intuition; implement the array for practice. |
| Forgetting that leaves must be unique | Two suffixes ending at the same leaf implies one is a prefix of the other. | Sentinel guarantees uniqueness.                      |

## 7. The textbook-precise statement
Let \(S = s_1 s_2 \dots s_n\) be a string over alphabet \(\Sigma\) and let \( \$ \notin \Sigma\). A *suffix tree* for \(S\) is a rooted, directed tree \(T\) with exactly \(n+1\) leaves satisfying:
1. Each edge is labelled by a nonempty substring of \(S\$\).
2. Labels on sibling edges begin with distinct characters.
3. For every \(i \in \{1,\dots,n+1\}\) there is a unique leaf whose root-to-leaf path label equals \(S[i..n]\$\).

The tree contains at most \(2n\) nodes and can be built in \(O(n)\) time (Ukkonen 1995). See Gusfield, *Algorithms on Strings, Trees, and Sequences*, Ch. 5–6.

## 8. Visual — diagram or schematic
```text
          root
       /   |     \
     a    na     banana$
    / \    |
  na$  $   na$
 /      \
$        $
```
Leaf indices (left-to-right): 6, 4, 2, 5, 3, 1 (after sentinel). Each edge label is shown; implicit nodes lie at character offsets along the longer edges.

## 9. The memory technique
1. **The hook** — Picture a family tree in which every descendant’s name is a suffix of the family founder’s name; branches split exactly when two cousins receive different middle initials.
2. **What to overlearn** — (a) number of leaves = \(n+1\); (b) every internal node has ≥2 children; (c) path label to leaf \(i\) = suffix \(i\).
3. **Spaced-repetition schedule** — Review the definition at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the node bound from “leaves = \(n\), branching factor ≥2” and remember that compression never changes the set of path labels.

## 10. What this unlocks
Mastery of the suffix tree immediately opens linear-time algorithms for longest repeated substring, longest common substring of multiple strings, and exact matching with wildcards.

- Suffix array + LCP array (space-optimized sibling)
- Burrows–Wheeler transform and FM-index
- Ukkonen’s online construction algorithm
- Generalised suffix tree for a set of strings

## 11. Self-check — five questions, no answers
1. Draw the suffix tree for \(S = \texttt{abcab}\). How many internal nodes does it contain?
2. Prove that after compression a suffix tree on a string of length \(n\) has at most \(2n-1\) nodes.
3. A query pattern \(P\) reaches an internal node \(v\) whose subtree contains four leaves. What does this tell you about occurrences of \(P\) in \(S\)?
4. What goes wrong if the input string is not terminated by a unique sentinel?
5. Given two strings \(S\) and \(T\), describe how a single generalised suffix tree can be used to compute the longest common substring of \(S\) and \(T\) in linear time.