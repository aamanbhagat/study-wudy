## 1. The one-sentence answer
**Naive pattern matching aligns a pattern string of length \(m\) at every possible starting position in a text string of length \(n\) and performs character-by-character comparisons until a mismatch or a complete match occurs.**

The algorithm examines up to \(n-m+1\) candidate alignments. At each alignment it may compare as many as \(m\) characters before either succeeding or stopping at the first mismatch. Because these two loops are independent, the total work is bounded by the product of the two lengths.

In the worst case every alignment requires a full scan of the pattern, producing quadratic behaviour. In the best case the first character of the pattern never appears in the text, so each alignment costs only a single comparison and the running time becomes linear.

> [!NOTE]
> The decisive insight is that the algorithm never reuses information from one alignment when it moves to the next; every comparison is performed from scratch.

## 2. Why this matters — concrete and current
In the LLVM compiler infrastructure the naive matcher is still used inside the TableGen backend to locate instruction mnemonics within a few hundred characters; the small constant factors and simplicity outweigh asymptotic concerns for that restricted domain.

NASA’s telemetry parsers employ a naïve scan to locate fixed-format headers inside raw spacecraft downlink packets; the packets are short enough that \(O(nm)\) is acceptable while the code must remain verifiable under DO-178C.

Early versions of the Snort intrusion-detection system used a naïve multi-pattern loop before replacing it with Aho–Corasick; the original implementation remains the reference against which optimised engines are validated on the 1999 DARPA intrusion-detection data set.

DNA fragment assembly pipelines at the Broad Institute still contain a naïve “seed-and-extend” stage that verifies exact k-mer matches before invoking more sophisticated aligners; the stage is invoked only after a Bloom filter has already discarded the great majority of candidates.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| 0-based array indexing   | Starting positions run from 0 to \(n-m\), so off-by-one errors produce immediate out-of-bounds accesses. |
| String immutability      | The algorithm never mutates either string, only reads them, which simplifies correctness arguments. |
| Worst-case versus average-case analysis | The \(O(nm)\) bound is a worst-case guarantee; many practical inputs finish far sooner. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Every possible starting position must be examined
A match can begin at any index \(i\) where the remaining suffix of the text is at least as long as the pattern.  
Text = "abcabc", Pattern = "cab" → possible \(i \in \{0,1,2,3\}\).  
Formally the range is  
\[
i = 0,1,\dots,n-m.
\]
> [!WARNING]
> Using \(i \le n-m+1\) produces an out-of-range access on the final alignment.

### Step 2 — At each position a sequential character comparison occurs
For a fixed \(i\), compare text[\(i+j\)] with pattern[\(j\)] for \(j = 0,1,\dots,m-1\).  
Stop at the first mismatch or when \(j\) reaches \(m\).  
The inner loop therefore executes at most \(m\) iterations.

### Step 3 — Success is declared only on a complete match
If all \(m\) comparisons succeed, record \(i\) as a valid occurrence. The algorithm continues to the next \(i\) because overlapping matches are possible.

### Step 4 — Failure at any character aborts the current alignment
A mismatch at position \(j\) immediately discards the current \(i\) and advances to \(i+1\). No backtracking inside the pattern is performed.

### Step 5 — The two nested loops are independent
The outer loop runs \(n-m+1\) times; each iteration of the inner loop is bounded by \(m\). The product yields the complexity bound  
\[
T(n,m) = O((n-m+1)m).
\]

### Step 6 — The textbook statement of the naïve algorithm
The procedure above is exactly the brute-force string-matching algorithm presented in standard references.

## 5. Worked examples — every step shown

**Example 1 — Exact match at the first position**  
*Given:* text = "banana", pattern = "ban"  
*Find:* all starting indices of occurrences.  

- Set \(i=0\): compare b=b, a=a, n=n → all match.  
  *Why:* every character agrees, therefore a match is reported.  
- Report index 0.  
- \(i=1,2,3\) produce mismatches on the first or second character.  

**0**  
*Reflection:* The example demonstrates the shortest successful inner-loop execution; the cost is exactly \(m\).

**Example 2 — No match at all**  
*Given:* text = "abcde", pattern = "ac"  
*Find:* occurrences.  

- \(i=0\): a=a, then b≠c → mismatch after two comparisons.  
  *Why:* the second character differs, so the alignment is abandoned.  
- \(i=1,2,3\): first character never matches.  
- No indices reported.  

**[]**  
*Reflection:* Early mismatch on the second character shows how the inner loop can terminate after only two steps.

**Example 3 — Overlapping occurrences**  
*Given:* text = "aaa", pattern = "aa"  
*Find:* all starting indices.  

- \(i=0\): a=a, a=a → match at 0.  
- \(i=1\): a=a, a=a → match at 1.  

**0 1**  
*Reflection:* The naïve algorithm naturally reports overlapping matches because it never skips alignments.

**Example 4 — Pattern equals entire text**  
*Given:* text = "match", pattern = "match" (\(n=m=5\))  
*Find:* occurrences.  

- Only \(i=0\) is possible.  
- Five comparisons succeed.  

**0**  
*Reflection:* The boundary case \(n=m\) forces exactly one alignment and reduces the outer loop to a single iteration.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                                      |
|-----------------------------|---------------------------------------------|------------------------------------------------------|
| Off-by-one on final index   | Confusing \(n-m\) with \(n-m+1\)            | Write the loop as `for (int i = 0; i <= n-m; i++)`   |
| Accessing beyond array end  | Inner loop runs to \(j < m\) without guard  | Always test `i+j < n` before any access              |
| Assuming early exit on first mismatch | Forgetting that the algorithm still scans later alignments | Keep the outer loop running to completion            |
| Treating empty pattern as match | Edge case \(m=0\) is undefined in some languages | Add explicit guard: if \(m==0\) return empty list    |
| Counting comparisons instead of alignments | Complexity analysis mixes two different quantities | State both \((n-m+1)\) alignments and \(\le m\) comparisons per alignment |
| Ignoring Unicode code points | Assuming one byte per character             | Use the language’s native string length function     |
| Reusing the same index variable | Shadowing \(i\) inside the inner loop       | Use distinct variables \(i\) and \(j\)               |

## 7. The textbook-precise statement
Let \(T[0..n-1]\) and \(P[0..m-1]\) be arrays of characters. The naïve string-matching procedure reports every index \(s\) such that  
\[
T[s+j] = P[j] \quad\text{for all } j=0,1,\dots,m-1
\]  
and \(0\le s\le n-m\). Its worst-case running time is \(\Theta((n-m+1)m)\). (Cormen et al., *Introduction to Algorithms*, 4e, §32.1.)

## 8. Visual — diagram or schematic
```text
Text:     a b a b c a b a
Indices:  0 1 2 3 4 5 6 7
Pattern:        c a b          (i=3)
Compare:        ^ ^ ^  → mismatch at position 4
Next:             c a b        (i=4)
Compare:          ^ ^ ^  → mismatch at position 5
Next:               c a b      (i=5)
Compare:          a b a        (i=5) → full match reported
```
The diagram shows the pattern sliding rightward one position at a time; each vertical column represents one character comparison.

## 9. The memory technique
1. **The hook** — Picture a ruler sliding along a tape measure; every millimetre you stop and compare the entire pattern length before moving the ruler again.  
2. **What to overlearn** — The two nested-loop bounds: outer \(n-m+1\), inner \(\le m\), product \(O(nm)\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the range of starting indices from the inequality \(s+m-1\le n-1\), then multiply by the maximum inner-loop cost.

## 10. What this unlocks
Mastery of the naïve algorithm supplies the baseline against which every faster string-matching technique is measured.  

- KMP and Boyer-Moore both reduce the inner-loop cost by reusing previous comparison results.  
- Rabin-Karp replaces character comparisons with rolling hashes while still examining every alignment.  
- Aho-Corasick extends the same sliding-window idea to multiple patterns simultaneously.  
- Suffix-array construction algorithms often begin with a naïve verification pass before applying radix sort.

## 11. Self-check — five questions, no answers
1. For text length 1000 and pattern length 50, what is the exact number of character comparisons performed in the worst case?  
2. Does the naïve algorithm ever compare the same pair of characters more than once?  
3. Write the precise loop bounds that correctly handle the case \(m > n\).  
4. Identify the single change that would turn the naïve algorithm into a “find first match only” procedure.  
5. Suppose every character of the text equals the first character of the pattern; how many comparisons occur for a pattern of length \(m\) inside a text of length \(n\)?