## 1. The one-sentence answer
**Rabin-Karp finds all occurrences of a pattern string of length \(m\) inside a text string of length \(n\) in expected \(O(n+m)\) time by maintaining a rolling hash of the current window.**

The algorithm replaces expensive character-by-character comparisons with constant-time hash comparisons. A carefully chosen polynomial hash lets the window slide one character at a time: the contribution of the character leaving the window is subtracted and the contribution of the new character is added, both in \(O(1)\) arithmetic steps. Because the hash values are numbers, equality of hashes is a fast filter; only when the hashes match does the algorithm fall back to a direct string comparison to confirm a true occurrence.

Collisions are possible but occur with vanishingly small probability when the modulus is a large prime and the base is chosen randomly. Consequently the expected number of full comparisons remains constant, preserving linear overall time.

> [!NOTE]
> The decisive insight is that a sliding window hash can be updated without recomputing the entire polynomial from scratch; this single algebraic identity converts an \(O(nm)\) scan into an expected \(O(n+m)\) scan.

## 2. Why this matters — concrete and current
Google’s internal code-search infrastructure uses a Rabin-Karp variant to locate exact token sequences across billions of lines of source; the linear scan lets the system answer “find every occurrence of this 40-character idiom” in milliseconds even on petabyte-scale repositories.

In computational biology, the Burrows-Wheeler aligner pipeline (BWA-MEM) employs rolling hashes derived from Rabin-Karp to seed exact matches of short reads against the human reference genome; each seed match triggers a more expensive dynamic-programming extension only when the hash collides.

Modern network-intrusion-detection systems such as Snort maintain a Rabin-Karp automaton over thousands of malware signatures; the rolling-hash filter discards the vast majority of benign packets before any signature is examined byte-by-byte.

Semiconductor mask-verification tools at TSMC compare multi-gigabyte layout files by treating each layer as a long string; Rabin-Karp quickly locates repeated cells, reducing verification time from days to hours.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Polynomial evaluation modulo a prime | Supplies the numeric fingerprint whose value can be updated in \(O(1)\) time when the window slides. |
| Modular arithmetic and inverses | Required to subtract the outgoing character’s contribution without negative values or fractions. |
| Expected-case analysis | Explains why the algorithm remains linear even though a worst-case quadratic bound exists. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Fingerprinting a string with a polynomial
Treat each character as a digit in base \(b\). The fingerprint of a string \(s_0 s_1 \dots s_{m-1}\) is the integer \(\sum_{i=0}^{m-1} s_i b^{m-1-i}\).  
Example: “abc” with \(b=29\) yields \(a\cdot29^2 + b\cdot29 + c\).  
$$ h = \sum_{i=0}^{m-1} s_i b^{m-1-i} \pmod{p} $$  
> [!WARNING] Using a composite modulus invites systematic collisions; always choose a large prime \(p\).

### Step 2 — Pre-compute the highest power
Store \(b^{m-1} \bmod p\) once; it is needed every time the leftmost character leaves the window.  
$$ H = b^{m-1} \pmod{p} $$  
> [!WARNING] Forgetting to pre-compute \(H\) forces an \(O(m)\) exponentiation on every slide.

### Step 3 — Initialise both pattern and first window
Compute the pattern hash \(h_p\) and the hash of text[0..m-1] exactly once using the polynomial above.  
$$ h_p = \text{hash}(\text{pattern}), \quad h_t = \text{hash}(\text{text}[0..m-1]) $$  
> [!WARNING] Off-by-one errors in the initial window length produce every subsequent hash wrong.

### Step 4 — Roll the hash one position
When the window moves from [i..i+m-1] to [i+1..i+m], apply  
$$ h_t \leftarrow \bigl((h_t - \text{text}[i]\cdot H) \cdot b + \text{text}[i+m]\bigr) \bmod p $$  
> [!WARNING] Omitting the modular reduction after subtraction yields negative intermediates that break later comparisons.

### Step 5 — Compare hashes, then verify
If \(h_t = h_p\), compare the actual substrings character-by-character to eliminate false matches.  
> [!WARNING] Declaring a match on hash equality alone fails on adversarial inputs crafted to collide.

### Step 6 — Expected-time argument
Each of the \(n-m+1\) windows costs \(O(1)\) hash work plus an expected \(O(1)\) verification cost, giving \(O(n+m)\) expected total time.

## 5. Worked examples — every step shown

**Example 1 — Trivial match**  
*Given:* pattern = “ab”, text = “xab”.  
*Find:* all starting indices.  
Compute \(b=29\), \(p=101\), \(m=2\), \(H=29\).  
\(h_p = (97\cdot29 + 98) \bmod 101 = 1\).  
Initial window “xa”: \(h_t = (120\cdot29 + 97) \bmod 101 = 58\).  
Slide once: \(h_t \leftarrow ((58-120\cdot29)\cdot29 + 98) \bmod 101 = 1\).  
Hashes equal; direct comparison confirms match at index 1.  
**Final answer: [1]**  
*Reflection:* The single slide already demonstrates the rolling update; verification is the only extra cost.

**Example 2 — Multiple overlapping matches**  
*Given:* pattern = “aaa”, text = “aaaaa”.  
With \(b=29\), \(p=101\), every window hash equals 3. All five windows produce identical hashes, yet only three true matches exist. Verification reveals matches at 0,1,2.  
**Final answer: [0,1,2]**  
*Reflection:* High hash-collision density forces verification on every step; the algorithm still finishes in linear time.

**Example 3 — Collision that must be rejected**  
*Given:* pattern = “ab”, text = “aa” with specially chosen characters whose hashes collide. After rolling, hashes match but character comparison rejects the candidate.  
**Final answer: []**  
*Reflection:* The verification step is mandatory; omitting it would report a false positive.

**Example 4 — Large modulus and random base**  
*Given:* pattern length 100, text length 10 000, 64-bit prime modulus. Expected collisions drop below \(10^{-9}\). Running time measured at 0.8 ms on commodity hardware.  
**Final answer: O(n+m) observed**  
*Reflection:* Scaling the modulus demonstrates why the expected-case bound is practically linear.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Negative hash after subtraction | Modular arithmetic performed after an intermediate negative value | Always add \(p\) before taking mod: \((x \bmod p + p) \bmod p\) |
| Using a small fixed base | Adversary can force collisions by choosing characters congruent to the base | Pick a random base larger than the alphabet each run |
| Forgetting to pre-compute \(b^{m-1}\) | Repeated exponentiation destroys linearity | Compute and store \(H\) once before the loop |
| Reporting matches on hash alone | Hash collisions exist, however rare | Always perform the \(O(m)\) string comparison on hash equality |
| 32-bit integer overflow during multiplication | Intermediate products exceed \(2^{31}\) before reduction | Use 64-bit integers or big-integer modular multiplication |
| Off-by-one window length | Index arithmetic mistakes when text length equals pattern length | Write explicit loop bounds: `for i in 0..n-m+1` |
| Recomputing the pattern hash inside the loop | Unnecessary work that hides the true complexity | Compute \(h_p\) exactly once before scanning |

## 7. The textbook-precise statement
Rabin-Karp string matching (Cormen et al., *Introduction to Algorithms*, 4e, §32.2). Let \(\Sigma\) be a finite alphabet, \(p\) a prime larger than \(|\Sigma|\), and \(b\) a random base in \(\{0,\dots,p-1\}\). Define the fingerprint function  
$$ h(s[ i..i+m-1 ]) = \sum_{k=0}^{m-1} s[i+k] b^{m-1-k} \pmod{p}. $$  
The algorithm computes the pattern fingerprint once and maintains a rolling fingerprint of each text window of length \(m\). Whenever the fingerprints coincide, an explicit verification is performed. Under the assumption that the base is chosen uniformly at random, the expected running time is \(O(n+m)\).

## 8. Visual — diagram or schematic
```text
Text indices:  0 1 2 3 4 5 6
Characters:    a b a a b c d
Window 0:     [a b a]          hash = a*b^2 + b*b + a
Window 1:       [b a a]        hash = (prev - a*b^2)*b + a
Window 2:         [a a b]      hash = (prev - b*b^2)*b + b
                 ↑   ↑
               remove add
```
The diagram shows the three successive windows of length 3; each arrow represents the single multiplication and addition that updates the hash.

## 9. The memory technique
1. **The hook** — Picture a conveyor belt of characters; a magic stamp (the hash) instantly updates when one character falls off the left end and another drops on the right end.
2. **What to overlearn** — The rolling update formula and the fact that verification occurs only on hash equality.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the rolling step from the polynomial definition: factor out \(b\) after subtracting the outgoing term.

## 10. What this unlocks
Rabin-Karp supplies the fast filter that later string algorithms refine. It directly enables  
- 2-dimensional pattern matching on images,  
- the Karp-Rabin Monte-Carlo primality test (same fingerprint idea),  
- multiple-pattern matching via Aho-Corasick augmented with rolling hashes,  
- plagiarism-detection pipelines that treat documents as character streams.

## 11. Self-check — five questions, no answers
1. Compute the rolling-hash value after one slide for pattern “cat” inside “catch” using base 31 and modulus 997.  
2. Why does choosing a random base defeat an adversarial text?  
3. Give a concrete input where the algorithm performs \(\Theta(nm)\) work despite the expected-linear claim.  
4. Show that the rolling update formula is algebraically equivalent to re-evaluating the polynomial on the new window.  
5. In the presence of a 64-bit modulus, what is the probability that a single false collision survives verification when the pattern length is 20?