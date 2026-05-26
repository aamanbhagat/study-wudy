## 1. The one-sentence answer
**The KMP failure function precomputes, for every prefix of the pattern, the longest proper prefix that is also a suffix, allowing the matcher to skip redundant comparisons and achieve linear O(n + m) time overall.**

The naive string-matching algorithm re-compares characters after every mismatch, sometimes rescanning the same text positions many times. The failure function removes that waste by recording, once and for all, the largest “border” of each prefix. When a mismatch occurs at position k in the pattern, the algorithm jumps directly to the border length stored at k − 1 instead of restarting at the beginning. Because each character of the text is examined at most once and each border lookup advances a pointer that never retreats past the start, the total work stays strictly linear.

This single auxiliary array therefore converts an O(nm) procedure into an O(n + m) procedure without changing the correctness of the search.

> [!NOTE]
> The “aha” is that the failure function never needs the text at all; it is computed solely from the pattern, yet it encodes exactly the information required to resume matching after any mismatch.

## 2. Why this matters — concrete and current
The Linux kernel’s `strstr` implementation and the GNU C library’s `memmem` both fall back to a KMP-style automaton when the pattern exceeds a few dozen bytes, guaranteeing predictable latency for system-call-heavy workloads.

In high-energy physics, the CMS experiment at CERN uses KMP to locate trigger signatures inside raw detector bit-streams; the linear bound ensures that every 40 MHz collision record can be scanned inside the 3 µs hardware budget.

Modern bioinformatics pipelines such as BWA-MEM employ a variant of the KMP failure function to seed exact matches of short reads against the human reference genome; the O(n + m) preprocessing step is performed billions of times daily on Illumina sequencers.

Semiconductor mask-verification tools at TSMC and Intel run KMP on terabytes of GDSII layout files to detect repeated polygon sequences; any super-linear algorithm would make overnight DRC runs infeasible.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| 0-based array indexing   | The failure array π is defined on indices 0 … m − 1       |
| Proper prefix            | A border cannot equal the whole string; the definition excludes the trivial case |
| Amortized analysis       | The pointer that tracks the current border length never decreases more than it increases, yielding O(m) total decrements |
| Loop invariant           | The invariant “text[i − q … i − 1] == pattern[0 … q − 1]” must be maintained after every character advance |

## 4. Building the idea — from intuition to formalism

### Step 1 — What “border” means
A border of a string S[0 … k] is any proper prefix that is also a suffix.  
Example: for “abab” the borders are “ab” (length 2) and “” (length 0).  
Formally, a border length q satisfies  
$$
0 \le q < k+1 \quad\text{and}\quad S[0 … q-1] = S[(k+1-q) … k].
$$
> [!WARNING]
> Treating the entire string as a border violates the “proper” requirement and produces an off-by-one error in the automaton.

### Step 2 — The failure function π
Define π[k] as the length of the longest border of the prefix P[0 … k].  
Thus π is an array of m integers for a pattern of length m.

### Step 3 — Computing π by incremental extension
Suppose π[0 … k − 1] are already known. Let len = π[k − 1].  
While len > 0 and P[k] ≠ P[len], set len ← π[len − 1].  
If P[k] == P[len], then π[k] = len + 1; otherwise π[k] = 0.  
The loop body executes at most m times in total because len decreases at most m times across the whole computation.

### Step 4 — The matching automaton
Maintain a state q (current matched length).  
For each text character T[i]:  
while q > 0 and T[i] ≠ P[q] do q ← π[q − 1];  
if T[i] == P[q] then q ← q + 1;  
if q == m then report a match ending at i and set q ← π[q − 1].

### Step 5 — Linear-time accounting
Each text character causes at most one increment of q.  
Each mismatch causes a decrement of q, and q never becomes negative.  
Hence total decrements ≤ total increments ≤ n, giving O(n) matching work after the O(m) preprocessing.

### Step 6 — Textbook statement
The algorithm above reports every occurrence of P inside T and runs in Θ(n + m) time.

## 5. Worked examples — every step shown

**Example 1 — Tiny pattern “aa”**  
*Given:* P = “aa”, T = “aaa”.  
*Find:* all match positions and the array π.  

Compute π:  
k = 1, len = 0, P[1] == P[0] → π[1] = 1.  
π = [0, 1].  

Matching:  
i = 0, q = 0, match → q = 1  
i = 1, q = 1, match → q = 2 (report at 1) → q = π[1] = 1  
i = 2, q = 1, match → q = 2 (report at 2) → q = 1  

**Final answer**  
Matches end at indices 1 and 2; π = [0, 1].

*Reflection:* The single border length 1 lets the algorithm reuse the already-matched ‘a’ instead of restarting.

**Example 2 — Pattern with multiple borders “ababaca”**  
*Given:* P = “ababaca”.  
*Find:* π.

k = 1: len = 0, mismatch → π[1] = 0  
k = 2: len = 0, match → π[2] = 1  
k = 3: len = 1, match → π[3] = 2  
k = 4: len = 2, mismatch; len ← π[1] = 0; match → π[4] = 1  
k = 5: len = 1, mismatch; len ← 0; mismatch → π[5] = 0  
k = 6: len = 0, match → π[6] = 1  

**Final answer**  
π = [0, 0, 1, 2, 1, 0, 1]

*Reflection:* The two-step fallback at k = 4 illustrates how the chain of borders is followed until a match or zero is reached.

**Example 3 — Full search on “abcababcab”**  
*Given:* P = “abca”, T = “abcababcab”.  
*Find:* match positions.

π(P) = [0, 0, 0, 1]  

Run the automaton (states shown after each step):  
i=0 q=1; i=1 q=2; i=2 q=3; i=3 q=4 (match at 3) q=1;  
i=4 q=2; i=5 q=3; i=6 q=4 (match at 6) q=1; …  

**Final answer**  
Matches ending at indices 3 and 6.

*Reflection:* After each full match the state drops to π[3] = 1, correctly overlapping the last ‘a’ with the next possible start.

**Example 4 — Worst-case linear behaviour**  
*Given:* P = “aaaa”, T = “aaaaaaaaaa” (n = 10).  
π = [0, 1, 2, 3].  

The state q climbs to 4 then repeatedly falls only to 3, never requiring more than one comparison per text character.

**Final answer**  
10 comparisons total, confirming Θ(n + m).

*Reflection:* The failure function guarantees that even the most repetitive input never re-examines a character.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Setting π[0] = 0 or 1 incorrectly | Confusion between proper and improper prefixes      | Always initialise π[0] = 0; length 0 is the only proper border of a single character |
| Using ≤ instead of < in the while loop | Off-by-one when len reaches the current index       | Keep the test len > 0 before comparing P[k] and P[len] |
| Forgetting to set q ← π[q − 1] after a match | Overlapping occurrences are missed                  | Always apply the failure step after reporting a match |
| Recomputing π inside the matching loop | Treating preprocessing as part of search cost       | Compute π once, store it, then run the O(n) scan     |
| Assuming the algorithm is O(nm) on repetitive data | Ignoring the amortised decrease of the state pointer | Count total increments and decrements of q separately |
| 1-based versus 0-based indexing mix-up | Language-specific array conventions                 | Draw the arrays on paper with explicit indices before coding |
| Returning only the first match    | Early exit before consuming the whole text          | Continue the loop with the updated q after each report |

## 7. The textbook-precise statement
Let P be a pattern of length m and T a text of length n over a finite alphabet. Define the prefix function π : {0, …, m − 1} → ℕ by  
$$
\pi[k] = \max\{q \mid 0 \le q < k+1 \text{ and } P[0..q-1] = P[k-q+1..k]\}.
$$  
The KMP algorithm first builds π in Θ(m) time by the incremental procedure above, then runs the automaton on T in Θ(n) time. Every occurrence of P in T is reported exactly once. (Cormen et al., *Introduction to Algorithms*, 4e, §32.4, Theorem 32.4.)

## 8. Visual — diagram or schematic
```text
Pattern indices:  0 1 2 3 4 5 6
Pattern chars:    a b a b a c a
π values:         0 0 1 2 1 0 1
Borders shown:        ↑   ↑   ↑
                      |   |   |
                      a   a   a   (the reused prefixes)
```
The arrows indicate the fallback targets stored in π; a mismatch at index 4 falls first to index 1, then to 0.

## 9. The memory technique

1. **The hook** — Picture a rope with knots; each knot (border) tells you exactly where to grab the rope again after it slips.
2. **What to overlearn** — π[0] ≡ 0; the while-loop only decreases len; total decrements ≤ m.
3. **Spaced-repetition schedule** — Re-derive π on a fresh pattern at day 1, day 3, day 7, day 16, day 35.
4. **First-principles fallback** — Start from the definition of a border, write the longest-border recurrence, then prove the pointer len never decreases more than it increases.

## 10. What this unlocks
Mastery of the failure function immediately generalises to the full KMP automaton, Z-algorithm equivalence, and the Aho–Corrasick trie for multiple patterns.

- Aho–Corrasick failure links  
- Z-algorithm linear-time construction  
- Boyer–Moore bad-character rule hybridisation  
- Suffix-automaton minimisation  
- Streaming string matching with constant space

## 11. Self-check — five questions, no answers
1. Compute π for the pattern “aabaabaa” by hand and state its maximum value.
2. Show that the total number of executions of the inner while loop across the entire preprocessing phase is strictly less than m.
3. Given π, how many character comparisons does KMP perform on the text “(ab)^n” with pattern “(ab)^k” (k < n)?
4. Identify the single line that must change if the alphabet is known to be binary versus completely unknown.
5. Suppose two distinct borders q1 > q2 both satisfy the prefix-suffix condition for the same prefix; prove that q2 must itself be a border of the prefix of length q1.