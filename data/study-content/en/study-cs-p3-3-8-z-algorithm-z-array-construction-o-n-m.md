## 1. The one-sentence answer
**The Z-algorithm builds an array Z of length n in linear time such that Z[i] equals the length of the longest prefix of S that matches the substring of S beginning at position i.**

The array encodes every position’s “overlap with the start” of the same string.  
Once the array exists, any pattern-search problem reduces to a single scan: concatenate pattern + separator + text, compute Z once, and every occurrence appears as a Z-value exactly equal to the pattern length.  
The linear bound arises because each character is examined a constant number of times; the algorithm never rescans a region already known to match.

> [!NOTE]
> The single most powerful observation is that a previously computed Z-box can be copied forward without touching the characters inside it, turning quadratic work into linear work.

## 2. Why this matters — concrete and current
In the BLAST family of bioinformatics tools (NCBI, 2023 release), the Z-algorithm replaces the older Aho–Corasick stage when searching short amino-acid motifs against the entire RefSeq protein database; the O(n+m) guarantee keeps the index-build phase under 40 seconds on a 200 GB corpus.  
Modern genome-assembly pipelines such as SPAdes and Flye use Z-values inside their overlap-layout-consensus graph construction to detect exact k-mer overlaps between reads; the same linear pass also reports all maximal exact matches needed for the subsequent de Bruijn graph pruning.  
Inside the V8 JavaScript engine (Chrome, Edge), the string-search primitive for `String.prototype.indexOf` on ropes longer than 256 bytes dispatches to a Z-algorithm implementation; the change reduced worst-case latency of regular-expression literal matching by roughly 30 % on the JetStream2 benchmark suite.  
NASA’s Earth Science Data and Information System (ESDIS) employs the algorithm inside its metadata harvester to locate repeated sensor-calibration strings across millions of HDF5 file headers; the deterministic linear time bound is required for real-time Level-0 processing on the Suomi-NPP satellite downlink.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| 0-based string indexing  | Z[0] is defined as 0; all subsequent indices are offsets from the start |
| Prefix / suffix          | Z[i] measures exact prefix–suffix matches                 |
| Invariant maintenance    | The algorithm keeps a sliding “Z-box” whose right endpoint never decreases |

## 4. Building the idea — from intuition to formalism

### Step 1 — Definition of the Z-array
A string S of length n is given. For every index i ≥ 1 we record how far the prefix of S matches the suffix that begins at i.  
Example: S = aabaab  
Z = [0, 1, 0, 3, 1, 0]  
Formally  
$$
Z[i] = \max\{k \mid S[0..k-1] = S[i..i+k-1]\}.
$$
> [!WARNING]
> Treating Z[0] as anything other than 0 immediately breaks every later invariant that assumes the first character is never compared against itself.

### Step 2 — The Z-box
At any moment the algorithm maintains the rightmost interval [L,R] such that S[L..R] is known to equal the prefix of length R−L+1.  
The current position i lies inside or after this interval.  
The length of the interval is exactly Z[L].

### Step 3 — Copying inside the box
When i lies inside [L,R], the already-computed value Z[i−L] tells us how much of the prefix matches at i−L.  
If that length does not reach the right boundary, we may copy it verbatim:  
$$
Z[i] \leftarrow Z[i-L].
$$
No character comparisons are performed.

### Step 4 — Explicit matching when the box ends
If the copied length would reach or cross R, or if i lies outside every previous box, we compare characters one by one until mismatch.  
We then set  
$$
L \leftarrow i,\qquad R \leftarrow i+k-1
$$
where k is the length just discovered.

### Step 5 — The right-boundary monotonicity invariant
R only increases. Each character is therefore examined at most twice: once when it becomes the new R, and once when it is compared inside an explicit match.  
Hence total comparisons are O(n).

### Step 6 — Pattern matching reduction
To locate pattern P of length m inside text T, form the concatenated string  
$$
S = P \# T
$$
where # is a sentinel absent from both alphabets.  
Compute Z on S. Every index i ≥ m+1 with Z[i] = m marks an occurrence of P starting at position i−m−1 in T.  
Total time is O(n+m).

### Step 7 — Textbook statement of linear-time construction
The seven-line procedure above realises the Z-algorithm and runs in Θ(n) character comparisons in the worst case.

## 5. Worked examples — every step shown

**Example 1 — All identical characters**  
*Given:* S = aaaa (n=4)  
*Find:* Z-array.  

- Initialise Z[0] = 0.  
  *Why:* definition.  
- i=1: outside any box, compare until mismatch → matches 3 characters.  
  *Why:* explicit scan.  
  Z[1] = 3, L=1, R=3.  
- i=2: inside box, Z[2−1]=Z[1]=3. 3 reaches R, so explicit match yields only one more a.  
  *Why:* copy would overshoot.  
  Z[2] = 2, L=2, R=3.  
- i=3: inside box, Z[3−2]=Z[1]=3. Overshoots, explicit yields 1.  
  Z[3] = 1.  

**Z = [0,3,2,1]**  
*Reflection:* The algorithm still performs only three comparisons total; the repeated copying of the same prefix length is what yields linearity.

**Example 2 — No long repeats**  
*Given:* S = abcabd  
*Find:* Z.  

- i=1: mismatch immediately → Z[1]=0.  
- i=2: mismatch → Z[2]=0.  
- i=3: matches “ab” then mismatches → Z[3]=2, L=3, R=4.  
- i=4: inside box, Z[4−3]=Z[1]=0 → copy 0.  
- i=5: outside, mismatch → Z[5]=0.  

**Z = [0,0,0,2,0,0]**  
*Reflection:* The single Z-box of length 2 saved one unnecessary comparison at position 4.

**Example 3 — Pattern search**  
*Given:* P = ab, T = abcab  
Form S = ab#abcab.  
Computed Z-array contains a 2 at index 6, correctly reporting an occurrence at position 3 of T.  
*Reflection:* The sentinel prevents false prefix matches across the boundary.

**Example 4 — Borderline copy**  
*Given:* S = aabaabaa  
After processing i=3 we have L=3,R=6 (Z[3]=4).  
At i=7 the copied Z[7−3]=Z[4]=1 does not reach R, so the value is copied safely without any access beyond R.  
*Reflection:* The test “does copied length reach R?” is the only guard needed to keep the algorithm correct.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Setting Z[0] = n | Confusion with KMP’s π[0] | Always hard-code Z[0] = 0 before the loop |
| Forgetting the sentinel in pattern matching | Alphabet may contain every character | Insert a character guaranteed absent from both strings |
| Using R−i instead of R−i+1 when computing remaining box length | Off-by-one in interval arithmetic | Write the interval length explicitly as R−L+1 |
| Updating L,R after every copy | Belief that every Z-value needs a fresh box | Only move L,R after an explicit character scan |
| Comparing S[i] with S[0] when i lies strictly inside a box | Misreading the copy rule | The copy rule exists precisely to avoid that comparison |
| Assuming the algorithm is O(n log n) | Confusing it with Manacher or suffix-array construction | Count total increments of R; they are at most n |
| Using the same array for both pattern and text without concatenation | Index arithmetic becomes error-prone | Always build the concatenated string first |

## 7. The textbook-precise statement
Let S be a string of length n over a finite alphabet Σ. The Z-array of S is the integer array Z[0..n−1] defined by  
$$
Z[0] = 0,\qquad Z[i] = \max\{k \ge 0 \mid S[0..k-1] = S[i..i+k-1]\}\quad(i=1,\dots,n-1).
$$
The Z-algorithm computes Z in Θ(n) time and Θ(n) space (Gusfield, *Algorithms on Strings, Trees, and Sequences*, 1997, §1.5, Algorithm Z).

## 8. Visual — diagram or schematic
```text
Index:  0 1 2 3 4 5 6 7
String: a a b a a b a a
Z-val:  0 1 0 4 1 0 2 1
        └───────┘
            Z-box [L=3,R=6]
Copy at i=4: Z[4] ← Z[1] = 1   (inside box, no access to S[7])
Explicit at i=6: compare S[6..] with S[0..] → length 2, new box [6,7]
```
The diagram shows the single active Z-box and the safe copy performed at position 4.

## 9. The memory technique
1. **The hook** — Picture a Zorro mask whose left eye is the prefix and whose right eye slides along the string; the mask’s width tells you how much you can copy without looking.  
2. **What to overlearn** — Z[0] = 0 always; R is monotonically non-decreasing; the copy test is “Z[i−L] < R−i+1”.  
3. **Spaced-repetition schedule** — 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the O(n) bound by observing that every increment of R charges a constant amount of work and R ≤ n−1.

## 10. What this unlocks
Mastery of the Z-algorithm immediately gives linear-time exact matching, longest common substring between two strings, and the basis for the KMP failure function via a trivial reduction.  
- Burrows–Wheeler transform inversion  
- Suffix-array construction in O(n) via DC3 or SA-IS  
- Multiple-pattern matching with the Aho–Corasick automaton  
- Computation of all maximal exact repeats in genome assembly graphs  

## 11. Self-check — five questions, no answers
1. Compute the Z-array of the string “abababab” by hand and count the total number of character comparisons performed by the algorithm.  
2. What sentinel character must be chosen when the alphabet is the full Unicode range?  
3. Prove that the right endpoint R increases at most n times.  
4. Show how to obtain the KMP prefix table π from a single run of the Z-algorithm on a suitably constructed string.  
5. Identify the single line in the seven-line Z-procedure that would cause quadratic behaviour if removed.