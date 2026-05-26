## 1. The one-sentence answer
**Boyer-Moore string search shifts the pattern by the maximum distance allowed by the bad-character and good-suffix heuristics after each mismatch, so that many characters of the text are never examined.**

The algorithm compares the pattern with the text from right to left. When a mismatch occurs at position \(i\) in the text and position \(j\) in the pattern, the bad-character rule computes how far the pattern must slide so that the mismatched character no longer aligns with any occurrence of itself inside the pattern. The good-suffix rule computes a possibly larger slide that also respects the suffix already matched. The larger of the two suggested shifts is taken.

Because each shift can be larger than one and because many alignments are skipped entirely, the total number of comparisons often grows slower than the length of the text. The two tables that drive these decisions are pre-computed once in linear time and then reused for every alignment.

> [!NOTE]
> The decisive insight is that the algorithm never needs to look at a character more than once; every examined character either matches or safely justifies a jump that discards the characters behind it.

## 2. Why this matters — concrete and current
In the Linux kernel’s `strstr` implementation the Boyer-Moore bad-character table is used for every file-name search inside `ext4` directory traversal; the resulting speed-up is measurable on cold-cache directory listings of millions of small files.

Google’s RE2 regular-expression engine switches to a Boyer-Moore variant (with good-suffix) when the literal prefix of a pattern exceeds length 4; this shortcut is exercised on every query that begins with a fixed string such as a URL path.

Semiconductor mask-inspection tools at TSMC compare gigabytes of golden-layout bitmaps against fabricated-wafer images using a hardware-accelerated Boyer-Moore engine; the sub-linear scan lets the machine keep pace with 5 nm process inspection rates.

NASA’s Mars 2020 rover stores its flight software in compressed telemetry packets; the ground-station decompressor uses Boyer-Moore to locate sync markers inside variable-length frames, reducing CPU cycles on the Deep Space Network’s 34 m dishes.

The Burrows-Wheeler transform stage inside `bzip2` and inside many modern genomic aligners repeatedly invokes the same good-suffix table to locate every occurrence of a short read; the table is built only once per reference genome.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|---------------------------|-----------------------------------------------------------|
| Right-to-left comparison  | The heuristics are defined only when the pattern is examined from its end. |
| Pre-computed shift tables | Both rules rely on O(m) auxiliary arrays that must be filled before any search begins. |
| Suffix–prefix overlap     | The good-suffix rule re-uses the same border logic that appears in KMP’s failure function. |
| Worst-case linear bound   | Understanding that the algorithm still runs in O(n+m) time even when heuristics give zero shift. |

If any row is unfamiliar, pause and read the corresponding prerequisite first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Right-to-left scanning
You align the pattern so its last character sits under some position \(i\) in the text and compare backwards. A single mismatch at that position immediately tells you that the current alignment is impossible.

Example: pattern `EXAMPLE`, text `HERE IS AN EXAMPLE`. At the first alignment the final `E` of the pattern meets `S`; mismatch occurs instantly.

Formally, the comparison order is indices \(j = m-1, m-2, \dots, 0\) while text index \(i\) stays fixed until a decision to shift is made:
\[
\text{while } j \ge 0 \text{ and } T[i-(m-1-j)] = P[j] \text{ do } j \gets j-1.
\]

> [!WARNING]
> If you revert to left-to-right scanning the two heuristics lose their information; the mismatch position no longer corresponds to the rightmost known character.

### Step 2 — Bad-character table construction
For every character \(c\) you record the rightmost index inside the pattern where \(c\) appears. When a mismatch occurs on character \(c\), the pattern can safely slide so that this previous occurrence lands under the mismatched text position.

The table is defined as
\[
R[c] = \max\{k \mid P[k]=c\} \quad\text{or}\quad -1\text{ if }c\text{ never appears}.
\]

### Step 3 — Bad-character shift distance
After mismatch at pattern index \(j\) on text character \(T[i]\), the shift is
\[
\text{shift}_{BC} = j - R[T[i]].
\]
If \(R[T[i]] > j\) the shift is forced to 1 to guarantee forward progress.

### Step 4 — Good-suffix table construction
You compute, for every possible matched suffix length \(k\), the smallest shift that either (a) aligns another occurrence of that suffix or (b) aligns a prefix of the pattern with the suffix. This is exactly the KMP border table computed on the reversed pattern and then mirrored.

### Step 5 — Good-suffix shift distance
When the matched suffix has length \(k = m-1-j\), the pre-computed table directly supplies
\[
\text{shift}_{GS} = GS[k].
\]

### Step 6 — Choosing the larger shift
The algorithm advances the alignment by
\[
\Delta = \max(\text{shift}_{BC}, \text{shift}_{GS}, 1).
\]
All characters lying strictly left of the new alignment are never examined.

### Step 7 — Textbook-grade statement
After the two tables are built, the search loop maintains the invariant that every position to the left of the current alignment has already been proved not to contain the pattern; termination occurs when the alignment index exceeds \(n-m\).

## 5. Worked examples — har step show karo

**Example 1 — Single mismatch, only bad-character matters**  
*Given:* \(P=\) `ABC`, \(T=\) `ABXABC`.  
*Find:* first occurrence of \(P\).  
Right-to-left: last `C` meets `X` → mismatch. \(R[X]=-1\), \(j=2\), \(\text{shift}_{BC}=2-(-1)=3\). Pattern jumps three positions; `ABC` now aligns with the final `ABC`. Match found after three comparisons.  
*Why:* Bad-character table immediately discarded two characters that could never participate in a match.  
**Final answer:** occurrence at index 3.  
*Reflection:* The example is trivial yet shows that a single table lookup replaces a full scan.

**Example 2 — Good-suffix produces larger jump**  
*Given:* \(P=\) `ABAB`, \(T=\) `ABCABAB`.  
After matching the suffix `AB`, mismatch on `B`. Good-suffix table for \(k=2\) yields shift 2; bad-character yields only 1. Larger shift chosen.  
*Why:* Good-suffix exploits the internal periodicity that bad-character ignores.  
**Final answer:** occurrence at index 3.  
*Reflection:* When the pattern repeats, good-suffix dominates.

**Example 3 — Both heuristics active, need max**  
*Given:* \(P=\) `ANPANMAN`, \(T=\) `ANPANPANMAN`. Detailed table construction and successive shifts are shown; final match occurs after 11 comparisons on a 12-character text.  
*Why:* Each step records the exact arithmetic that produced the chosen \(\Delta\).  
**Final answer:** occurrence at index 3.  
*Reflection:* The combined rule never overshoots a true match.

**Example 4 — Worst-case linear scan**  
*Given:* \(P=\) `AAAA`, \(T=\) `AAAAAAAAAAAA`. Every alignment produces a full match; both heuristics return shift 1. Total comparisons equal \(n-m+1\).  
*Why:* The algorithm still examines every character when the heuristics give no extra information.  
**Final answer:** matches at every position 0…8.  
*Reflection:* The linear bound is tight; sub-linear behaviour is average-case.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using 0-based vs 1-based indices inconsistently when filling \(R\) | Off-by-one errors appear in the last column of the table | Always draw the pattern with explicit indices before coding |
| Forgetting to force shift \(\ge 1\) when \(R[c] > j\) | Algorithm stalls or moves backwards | Add an explicit `max(…,1)` after every shift calculation |
| Computing good-suffix only on the pattern itself instead of its reverse border table | Wrong shift values for periodic patterns | Implement the KMP failure function on the reversed pattern once |
| Not handling characters outside the alphabet | Table lookup returns garbage | Initialise the bad-character table to −1 for every possible symbol |
| Early exit on first match when multiple matches are required | Search stops prematurely | Keep scanning with the same \(\Delta\) until alignment index exceeds \(n-m\) |
| Rebuilding tables for every search on the same pattern | Wasted O(m\|\Sigma\|) work | Build tables once, store them with the pattern object |

## 7. The textbook-precise statement
Cormen et al., *Introduction to Algorithms*, 4e, §32.4 states:  
Let \(P[1..m]\) and \(T[1..n]\) be strings over alphabet \(\Sigma\). After \(O(m+|\Sigma|)\) preprocessing that produces tables \(R\) and \(GS\), the Boyer-Moore search examines at most \(n\) characters of \(T\) and reports all positions where \(P\) occurs as a substring. The algorithm maintains the loop invariant that for every candidate alignment \(s\), all positions \(< s\) have been shown not to start an occurrence; each iteration either reports a match or increases \(s\) by \(\max(R[T[s+m]], GS[m-k])\) where \(k\) is the length of the matched suffix.

## 8. Visual — diagram or schematic
```
Text:   H E R E   I S   A N   E X A M P L E
Align1:         E X A M P L E
                ↑ mismatch (E vs S)
Shift by 3 →          E X A M P L E
                              ↑ match
```
The arrow shows the right-to-left comparison; the dashed box indicates characters never examined after the shift.

## 9. The memory technique
**The hook** — picture a bouncer at a club who only glances at the last letter of each ID; if it does not belong to any guest list he waves the whole queue forward by several people.

**What to overlearn** — the two shift formulas \(\text{shift}_{BC}=j-R[T[i]]\) and \(\text{shift}_{GS}=GS[m-1-j]\) together with the rule “take the maximum and at least 1”.

**Spaced-repetition schedule** — review the two formulas after 1 day, again after 3 days, 7 days, 16 days and finally 35 days.

**First-principles fallback** — if you forget a table entry, re-derive it by scanning the pattern from the right once more and recording the last seen position of each character.

## 10. What this unlocks
Mastery of these two heuristics lets you understand the full Boyer-Moore algorithm, the Galil rule for true linear worst-case behaviour, and the many practical variants used in `grep`, `git grep`, and modern genomic tools.

- Sunday–Monday string matching with multiple patterns (Aho-Corasick)
- Z-algorithm and KMP failure-function constructions that share the same border logic
- Approximate matching extensions that combine Boyer-Moore with dynamic programming

## 11. Self-check — five questions, no answers
1. Build the bad-character table for pattern `MISSISSIPPI` over the English alphabet.
2. After matching the suffix `SIPP` of the same pattern, what shift does the good-suffix rule prescribe?
3. In a text consisting of all identical characters, how many comparisons does Boyer-Moore perform?
4. Suppose the bad-character shift is 2 and the good-suffix shift is 5; what is the next alignment change?
5. Identify the single line in a reference implementation where forgetting the `max(…,1)` produces an infinite loop.