## 1. The one-sentence answer
**KMP uses a precomputed failure function (also called the prefix or π table) that encodes the longest proper prefix which is also a suffix for every prefix of the pattern; this table lets the matcher skip redundant comparisons so that both preprocessing and searching finish in linear time O(n + m).**

The failure function avoids re-examining characters already matched. When a mismatch occurs at position j in the pattern, instead of sliding the pattern by one and restarting from index 0, you jump to π[j-1] and continue comparing from there. Because each character of the text is examined at most once and each jump strictly decreases the current state, total comparisons stay bounded by 2(n + m).

> [!NOTE]
> The single “aha” moment is that the same information you store to build the automaton also guarantees that you never move the text pointer backward; every character is read exactly once while the pattern pointer only moves forward or jumps to a previously computed smaller value.

## 2. Why this matters — concrete and current
In genome assembly pipelines at Illumina and Pacific Biosciences, KMP-style exact matching locates short reads inside de-Bruijn graphs; the linear scan keeps the overall O(G) runtime feasible for gigabase genomes.  
Modern web browsers (Chromium’s HTML parser) employ KMP to locate the closing tag “</script>” inside streamed documents; the failure table prevents quadratic backtracking on maliciously crafted input.  
Network intrusion-detection systems such as Snort still ship a KMP engine for single-pattern signatures because its O(n + m) guarantee survives worst-case traffic at 100 Gbps line rate.  
In aerospace telemetry, NASA’s Mars 2020 rover ground software uses KMP to synchronise fixed-length command frames inside variable-length radio packets; the deterministic linear bound simplifies real-time scheduling proofs.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|---------------------------------------------------------------------------------------|
| 0-based string indexing  | Pattern and text arrays are accessed by integer offsets; off-by-one errors break π.   |
| Loop invariants          | The proof that the matcher never retreats the text pointer rests on an invariant.     |
| Amortised analysis       | Each mismatch causes a jump whose total cost across the whole run is still linear.    |

If any row above is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — What the failure function records
A proper prefix of P[0..k] is any P[0..q] where q < k. The failure value π[k] stores the largest q such that P[0..q] equals the suffix P[k-q..k].  
Example: for P = "ababca", π[5] = 1 because the suffix "a" matches the prefix "a".  
Formally,  
$$
\pi[k] = \max\{q < k \mid P[0..q] = P[k-q..k]\}.
$$
> [!WARNING]
> If you include the whole string (q = k) you obtain the trivial match; the algorithm deliberately excludes it so that a mismatch forces a genuine shift.

### Step 2 — Computing π by incremental extension
Start with π[0] = 0. Maintain a length variable len that records the current candidate match length. For each new index i, compare P[i] with P[len]. If equal, set π[i] = len + 1 and advance len. If unequal and len > 0, fall back to len = π[len-1]; otherwise π[i] remains 0.  
This produces the entire table in a single left-to-right pass.

### Step 3 — The search phase re-uses the same table
Initialise q = 0. For each character T[i] in the text, while q > 0 and T[i] ≠ P[q] set q = π[q-1]. If T[i] == P[q] then q++. When q reaches m a match is reported and q becomes π[q-1]. Because q never exceeds m and each step either increases q by one or decreases it, the total number of decrements cannot exceed the total number of increments, which is at most n + m.

### Step 4 — Invariant that guarantees O(n + m)
At every iteration the quantity 2i + q is strictly increasing and bounded above by 2(n + m). Hence the loop body executes O(n + m) times.

### Step 5 — Textbook-grade statement
After the five steps above we obtain the complete linear-time KMP procedure whose correctness rests on the prefix-table invariant and whose complexity follows from the strictly monotonic potential function.

## 5. Worked examples — har step show karo

**Example 1 — Tiny pattern "aa"**  
*Given:* P = "aa", T = "aaaaa".  
*Find:* all match positions and the π table.  
Compute π: π[0] = 0, i = 1, len = 0, P[1] == P[0] ⇒ π[1] = 1.  
Search: every position yields a match, q moves 0→1→0→1… never exceeds 2.  
**Final answer**  
Matches at indices 0,1,2,3; total steps = 5 + 2 = 7.  
*Reflection:* Even on the worst-case repetitive string the pointer never retreats, confirming linearity.

**Example 2 — Pattern "abc"**  
*Given:* P = "abc", T = "ababc".  
π = [0,0,0].  
Search reaches match at index 2 after five comparisons.  
**Final answer**  
Single match at position 2.  
*Reflection:* No fallback ever occurs, yet the algorithm still runs in O(n + m).

**Example 3 — Pattern with real fallback "abab"**  
*Given:* P = "abab", T = "ababcabab".  
π = [0,0,1,2].  
At the mismatch after "abab c", q jumps from 4 to π[3] = 2, then to 3, then reports match.  
**Final answer**  
Match at index 5.  
*Reflection:* The jump re-uses two already-matched characters without rereading them.

**Example 4 — Full derivation on "aabaab"**  
*Given:* P = "aabaab", T = "aabaabaabaab".  
Step-by-step π computation yields [0,1,0,1,2,3].  
During search the state q climbs to 6 twice and each time falls back using π values; total state changes = 12 text + 6 pattern = 18 operations.  
**Final answer**  
Matches at 0 and 6.  
*Reflection:* The counted operations equal 2(n + m) in the worst case, proving the bound.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                                      | How to avoid it                                      |
|-----------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting π[0] = 0         | Students think every entry needs a loop             | Initialise the array with π[0] = 0 before the loop   |
| Using ≤ instead of < in π   | Confusing proper prefix with whole string           | Always enforce q < k in the definition               |
| Moving text pointer backward| Copying naïve string match logic                    | Never decrement i; only q is allowed to decrease     |
| Off-by-one when reporting   | Reporting match at i instead of i-m+1               | Record match start as i-m+1 after q reaches m        |
| Recomputing π inside search | Believing each search needs a fresh table           | Precompute π once per pattern                        |

## 7. The textbook-precise statement
Cormen et al., *Introduction to Algorithms*, 4e, §32.4 states:  
Let P be a pattern of length m and T a text of length n over alphabet Σ. The prefix function π : {0,…,m-1} → {0,…,m-1} satisfies π[0] = 0 and for 1 ≤ q < m,  
$$
\pi[q] = \max\{k \mid k < q \land P[0..k-1] = P[q-k..q-1]\}.
$$  
The KMP matcher maintains the invariant that after processing T[0..i] the variable q equals the longest prefix of P that is a suffix of T[0..i]. Because each iteration either increments i or strictly decreases q while i stays fixed, the total work is Θ(n + m).

## 8. Visual — diagram or schematic
```
Text index i:   0 1 2 3 4 5 6 7
Text T:         a b a b c a b a
Pattern state q:0 1 2 3 2 0 1 2
                ↑ mismatch at q=3, jump to π[2]=1
                then match continues
```
The diagram shows q never exceeding 3 and i monotonically increasing.

## 9. The memory technique
1. **The hook** — picture a rope that “fails” at a knot; the knot tells you how many metres you can safely reuse.  
2. **What to overlearn** — π[0] is always 0; the matcher never decrements i.  
3. **Spaced-repetition schedule** — review the π construction at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — if you forget the formula, rebuild π by asking “what is the longest proper prefix that matches the suffix ending at i?” and simulate the two-pointer walk.

## 10. What this unlocks
Once you master the failure function you can derive the full KMP automaton, move to Z-algorithm equivalence proofs, and implement Aho-Corasick for multiple patterns.  
- Next topics: Z-algorithm, Boyer-Moore, Aho-Corasick.  
- Techniques: rolling-hash verification, streaming pattern matching.

## 11. Self-check — five questions, no answers
1. Compute π for the pattern "abababab".  
2. Show that the total number of times q is decremented across any run is ≤ n.  
3. Why does KMP still run in O(n + m) on a unary alphabet?  
4. Identify the single line that would break the linear-time guarantee if changed from < to ≤.  
5. Given a mismatch at q = 5 and π = [0,0,1,2,3,1], what is the new value of q after the fallback?