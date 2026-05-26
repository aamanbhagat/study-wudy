## 1. The one-sentence answer
**The Boyer-Moore algorithm searches for a pattern inside a text by preprocessing the pattern so that mismatches allow large jumps forward, using two independent rules—the bad-character heuristic and the good-suffix heuristic—whose larger shift is always taken.**

At its core the method never examines every character. When a mismatch occurs at some position, the algorithm already knows, from tables built on the pattern alone, how far it can safely slide the pattern without missing any possible match. The two heuristics compute that safe distance from different information: one from the mismatched character itself, the other from the already-matched suffix.

The bad-character rule looks only at the single offending character and asks how far the pattern must move so that the same character aligns with its last occurrence inside the pattern. The good-suffix rule looks at the longest suffix that already matched and asks how far the pattern must move so that an identical suffix re-aligns, or so that a prefix of the pattern matches the end of that suffix. The algorithm simply chooses the bigger of the two proposed shifts.

> [!NOTE]
> The decisive insight is that the two heuristics are independent; taking their maximum never skips a true occurrence, yet routinely produces average-case linear or even sub-linear behaviour on real text.

## 2. Why this matters — concrete and current
In genome-assembly pipelines at Illumina and Pacific Biosciences, the same short-read aligners (BWA-MEM, Bowtie 2) rely on a variant of Boyer-Moore to locate seed k-mers inside reference genomes that are billions of bases long; each skipped character directly reduces the number of cache misses on terabyte-scale sequencing runs.

Modern network-intrusion-detection systems such as Snort and Suricata embed Boyer-Moore inside their multi-pattern string engines; when scanning every packet against thousands of attack signatures at 100 Gbps line rate, the heuristics keep the per-byte cost below one cycle on average.

Inside the Linux kernel’s `strstr` implementation and the GNU C library’s `memmem`, the two heuristics are the default engine for substring search on large buffers; any program that greps multi-gigabyte log files therefore inherits the same skip distances.

Semiconductor mask-verification tools at TSMC and Intel run Boyer-Moore variants on petabyte-scale layout databases to locate repeated geometric patterns; the good-suffix rule exploits the repetitive nature of standard-cell libraries to achieve measured speed-ups of 4–8× over naïve scanning.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| 0-based string indexing  | All shift calculations are expressed as distances from the current alignment position. |
| Last-occurrence table    | The bad-character heuristic is literally a lookup in this table. |
| Longest proper suffix    | The good-suffix table stores, for every suffix length, the rightmost re-occurrence of that suffix as a proper prefix. |
| Safe-shift invariant     | Every shift must guarantee that no earlier alignment position could have produced a match that is now skipped. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Alignment and mismatch
A pattern \(P\) of length \(m\) is placed under a text \(T\) of length \(n\) so that \(P[0..m-1]\) is compared with \(T[i..i+m-1]\). A mismatch at index \(j\) (from the right) immediately tells us that the current alignment cannot be a match.

**Example.**  
\(P=\) “abc”, \(T=\) “abxabc”, alignment at \(i=0\): mismatch at \(j=0\) because ‘c’≠‘x’.

Formally the comparison stops at the first \(j\) where \(P[m-1-j]\neq T[i+m-1-j]\).

> [!WARNING]
> Treating the mismatch position as absolute rather than relative to the right end of the pattern produces an off-by-one error in every subsequent shift.

### Step 2 — Bad-character heuristic
Precompute for every alphabet symbol \(c\) the largest index \(k<m-1\) such that \(P[k]=c\). On mismatch with character \(c=T[i+m-1-j]\), shift the pattern right by \(\max(1,m-1-k)\) if \(k\) exists, otherwise by \(m\).

**Example.**  
\(P=\) “abc”, last-occurrence table: a:0, b:1 (c is ignored because it is at the end). Mismatch on ‘x’ yields shift 3.

The shift distance is
\[
\text{bcShift}(c,j)=\max(1,m-1-\text{last}[c])
\]
when \(\text{last}[c]<m-1-j\); otherwise the shift is 1.

> [!WARNING]
> Using the occurrence that lies to the right of the mismatch position would produce a negative shift and an infinite loop.

### Step 3 — Good-suffix heuristic
Precompute two tables: one for the longest suffix that matches a proper prefix, and one for the longest suffix that matches any earlier occurrence of itself. On a mismatch after matching a suffix of length \(s\), the shift is the distance to the next position where that suffix reappears.

Formally let \(\text{gsShift}(s)\) be the smallest \(d>0\) such that \(P[m-s-d..m-d-1]\) equals the matched suffix and the character preceding it differs.

**Example.**  
\(P=\) “abxab”, matched suffix “ab” after mismatch. The table yields shift 3 so that the prefix “ab” aligns with the matched suffix.

> [!WARNING]
> Forgetting to handle the case where the suffix matches a prefix of the pattern (the border case) produces a shift of zero on periodic patterns.

### Step 4 — Taking the maximum
At every mismatch the algorithm computes both shifts and advances by their maximum. This single rule combines the two independent sources of information.

The combined shift is
\[
\text{shift}=\max(\text{bcShift}(c,j),\text{gsShift}(s)).
\]

### Step 5 — Preprocessing and full algorithm
Both tables can be built in \(O(m+|\Sigma|)\) time via the Z-algorithm or KMP border tables. The search phase never retreats the text pointer, guaranteeing \(O(n+m)\) worst-case time when both heuristics are used.

The textbook statement appears in the next section.

## 5. Worked examples — every step shown

**Example 1 — Single mismatch, bad-character only**  
*Given:* \(P=\) “needle”, \(T=\) “findneedleinahaystack”, alignment at 0.  
*Find:* shift after first mismatch.  
Compare rightmost characters: ‘e’=‘e’, ‘l’=‘l’, … until ‘d’≠‘i’.  
*Why* The mismatch character is ‘i’, last[‘i’] = –1.  
Shift = \(m=6\).  
**6**  
*Reflection.* The pattern contains no ‘i’, so the entire length can be skipped; this is the strongest possible bad-character move.

**Example 2 — Good-suffix triggers larger jump**  
*Given:* \(P=\) “abcabx”, \(T=\) “abxababcabx”, alignment at 3.  
*Find:* shift after matching suffix “ab”.  
Bad-character on ‘c’ gives shift 2.  
Good-suffix table for suffix length 2 returns shift 3.  
*Why* The larger value 3 is chosen.  
**3**  
*Reflection.* Good-suffix exploits the internal repetition “ab” that bad-character ignores.

**Example 3 — Both heuristics agree**  
*Given:* \(P=\) “abracadabra”, mismatch after suffix “abra”.  
Both tables return shift 7.  
**7**  
*Reflection.* When the two numbers coincide, the algorithm still evaluates both; the redundancy costs only a table lookup.

**Example 4 — Full search on periodic pattern**  
*Given:* \(P=\) “aaa”, \(T=\) “aaaaaaa”.  
Every alignment mismatches only at the leftmost character.  
Bad-character shift = 1, good-suffix shift = 2.  
Maximum is taken each time, producing three comparisons total.  
**Final match positions: 0,1,2,3,4**  
*Reflection.* The good-suffix rule prevents the quadratic behaviour that naïve shifting would exhibit on runs of identical characters.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using the rightmost occurrence instead of the rightmost occurrence to the left of the mismatch | Confuses the definition of “last” | Store only indices < m–1 and test the condition explicitly |
| Forgetting the border case in good-suffix | The Z-algorithm produces zero for the whole pattern | Add a second table that records proper-prefix matches |
| Shifting by zero on periodic patterns | Both heuristics return 0 when the suffix equals a prefix | Always enforce a minimum shift of 1 when the maximum is 0 |
| Building the last-occurrence table with 1-based indices | Off-by-one in every shift formula | Initialise the table to –1 and use 0-based indices throughout |
| Applying good-suffix when the entire pattern matched | The mismatch position is undefined | Handle the “full match” case separately before consulting the suffix table |
| Ignoring case or Unicode normalisation | The alphabet \(\Sigma\) changes | Normalise both strings to the same canonical form before preprocessing |
| Assuming average-case linearity implies worst-case linearity | Good-suffix alone already guarantees \(O(n)\) worst-case | Always implement both heuristics together |

## 7. The textbook-precise statement
Let \(P\) be a pattern of length \(m\) over alphabet \(\Sigma\) and \(T\) a text of length \(n\). Preprocess two tables:  
\(\text{last}[c]\) = largest index \(k\) with \(P[k]=c\), or –1 if none;  
\(\text{gs}[s]\) = smallest shift \(d>0\) such that the suffix of length \(s\) re-occurs at position \(m-s-d\) and the preceding characters differ (or the border shift if no such \(d\)).  

The Boyer-Moore search returns every index \(i\) where \(T[i..i+m-1]=P\) by advancing the alignment \(i\) according to
\[
i\leftarrow i+\max\bigl(m-1-j-\text{last}[T[i+m-1-j]],\text{gs}[s]\bigr)
\]
after each mismatch at relative position \(j\).  
Cormen et al., *Introduction to Algorithms*, 4e, Chapter 32, §32.4.

## 8. Visual — diagram or schematic
```text
Text   :  a b r a c a d a b r a
Pattern:      a b r a c a d a b r a
               ↑ mismatch here (char 'c')
Bad-char shift (last['c']=4)  → 3
Good-suffix (matched "abra")  → 7
Chosen shift = 7
New alignment:
Text   :  a b r a c a d a b r a
Pattern:                    a b r a c a d a b r a
```
The diagram shows the two candidate arrows; the longer one is selected.

## 9. The memory technique
**The hook** — Picture a knight on a chessboard that can move either “sideways like a rook” (bad-character) or “forward like a bishop on the same colour” (good-suffix); it always chooses the longer legal leap.

**What to overlearn**  
- last[c] is the rightmost index strictly before the end of the pattern.  
- gs[s] is the smallest positive shift that preserves the already-matched suffix.  
- Final shift = max(bc, gs).

**Spaced-repetition schedule** — Review the two table-construction algorithms at 1 day, 3 days, 7 days, 16 days, 35 days after first study.

**First-principles fallback** — Re-derive both heuristics from the single invariant “no occurrence can be skipped,” then recompute the tables on the shortest non-trivial pattern “abab”.

## 10. What this unlocks
Mastery of the two heuristics immediately lets you understand every modern string-matching variant (Horspool, Sunday, Turbo-BM) and supplies the skip-table foundation for the Aho-Corasick automaton used in multi-pattern search.

- KMP failure function (the good-suffix table is a strict generalisation)  
- Z-algorithm (used to build the good-suffix table in linear time)  
- Aho-Corasick failure links (each link stores a good-suffix-like shift)  
- Suffix-array LCP queries that accelerate the same decisions on static dictionaries

## 11. Self-check — five questions, no answers
1. On pattern “aa” and text “aaa”, what is the sequence of shifts produced by each heuristic separately and by their maximum?  
2. Construct a pattern where the bad-character shift is always 1 yet the good-suffix shift yields an overall linear scan.  
3. Prove that taking the maximum of the two shifts never skips an occurrence.  
4. Give the exact contents of both tables for the pattern “abracadabra”.  
5. A colleague claims that storing only the good-suffix table is sufficient for worst-case linear time. Identify the flaw in that claim.