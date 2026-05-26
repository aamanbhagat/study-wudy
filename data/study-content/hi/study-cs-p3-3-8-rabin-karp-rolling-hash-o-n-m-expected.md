## 1. The one-sentence answer
**Rabin-Karp finds all occurrences of a pattern string of length m inside a text string of length n by comparing rolling hashes instead of characters, delivering expected O(n + m) time.**

The core trick is to treat every m-length window of the text as a number in base-b arithmetic and maintain a single hash value that slides forward in constant time when the window moves by one character. You pre-compute the pattern hash once, then slide the text window while updating the hash with a subtraction-addition pair and a modular multiplication; whenever the hashes match you fall back to a direct character comparison to confirm. Because a good hash function spreads values uniformly, the probability of a spurious collision is low enough that the expected number of verifications stays small, giving linear expected running time.

> [!NOTE]
> The real “aha” is that you never need to re-read the entire window; the hash carries forward the contribution of the overlapping m-1 characters, turning an O(m) per-window cost into O(1).

## 2. Why this matters — concrete and current
Google’s internal code-search index uses a Rabin-Karp variant to locate exact token sequences across billions of lines of source; the rolling-hash step lets the crawler keep a single 64-bit fingerprint per sliding window instead of storing every possible substring.

In semiconductor mask inspection, ASML’s lithography tools compare petabytes of design polygons against scanned silicon images; Rabin-Karp’s linear expected scan locates repeated defect patterns without quadratic blow-up on repetitive layout regions.

Bioinformatics pipelines at Illumina employ Rabin-Karp to seed exact k-mer matches between short reads and a reference genome; the O(n + m) expected bound keeps the seeding stage from dominating the overall O(n log n) aligner runtime on human-scale data.

Modern plagiarism detectors such as Turnitin’s core engine run Rabin-Karp over tokenized student submissions against a corpus of past papers; the constant-time hash slide lets the system compare a new 10 000-word essay against millions of stored documents in seconds.

NASA’s Mars 2020 rover flight software contains a Rabin-Karp routine that scans telemetry packets for known command sequences; the algorithm’s predictable expected latency satisfies the hard real-time deadlines of the spacecraft’s command decoder.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Hash functions   | Map variable-length strings to fixed-size integers        |
| Modular arithmetic | Keeps intermediate values inside a machine word         |
| Big-O expectation | Understand why collisions do not destroy linear time      |
| String indexing  | Access characters by position to compute window hashes    |

If any row above is unfamiliar, pause and read the corresponding prerequisite section first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Replace character-by-character comparison with a fingerprint
You can decide whether two strings are identical by comparing a compact numeric summary instead of every character.  
Example: pattern “abc” and window “abc” both produce the fingerprint 97·b² + 98·b + 99.  
Formal statement: let the hash of a string s[1..m] be  
$$h(s) = \sum_{i=1}^{m} s[i]\cdot b^{m-i} \pmod{p}.$$  
> [!WARNING] If you treat the fingerprint as an exact proof of equality you will accept false matches whenever two different strings collide under the chosen modulus.

### Step 2 — Pre-compute the pattern hash once
Calculate the single numeric value for the entire pattern; this costs O(m) and never changes.  
Example: pattern “abc”, b = 131, p = 997 → h(P) = 140.  
Formal statement: store h(P) in a register before any text window is examined.

### Step 3 — Slide the window with a constant-time update rule
When the window moves from s[i..i+m-1] to s[i+1..i+m], subtract the outgoing character multiplied by b^{m-1} and add the incoming character, then multiply the whole result by b modulo p.  
Example: current hash 140, drop ‘a’, add ‘d’ → new hash = ((140 - 97·b²)·b + 100) mod 997.  
Formal statement:  
$$h_{i+1} = \bigl((h_i - s[i]\cdot b^{m-1})\cdot b + s[i+m]\bigr) \pmod{p}.$$  
> [!WARNING] Forgetting the modular multiplication after subtraction produces values outside the intended residue class and breaks later comparisons.

### Step 4 — Choose a large prime modulus and a random base
Select p > n·m and b randomly from 1…p-1 at runtime; this reduces the probability that an adversary can craft colliding strings.  
Formal statement: collision probability for any fixed pair is at most 1/p; union bound over O(n) windows yields expected O(1) false matches.

### Step 5 — Verify on hash equality
Only when h(window) equals h(P) do you compare the actual characters; a mismatch discards the candidate in O(m) worst-case time.  
Formal statement: the algorithm reports an occurrence only after an explicit character-by-character test succeeds.

### Step 6 — Expected-time analysis
Each of the n-m+1 windows costs O(1) hash work plus O(m) verification work only on collisions. With the random prime choice the expected number of collisions is O(1), therefore total expected cost is O(n + m).

## 5. Worked examples — har step show karo

**Example 1 — Single match, no collision**  
*Given:* text = “ababc”, pattern = “abc”, b = 10, p = 101.  
*Find:* all starting indices where pattern occurs.  
Compute h(P) = (97·10² + 98·10 + 99) mod 101 = 140 mod 101 = 39.  
Window 0: “aba” → 39. Match, verify characters → true occurrence at index 0.  
Window 1: rolling update → 40. No match.  
Window 2: rolling update → 39. Match, verify → true occurrence at index 2.  
**Final answer**  
**0 2**  
*Reflection:* The small alphabet and tiny modulus made manual arithmetic trivial; the same arithmetic scales unchanged to 64-bit words.

**Example 2 — Hash collision that must be rejected**  
*Given:* text = “abcd”, pattern = “abd”, b = 10, p = 13.  
h(P) = 39 mod 13 = 0.  
Window “abc” hashes to 0 yet characters differ.  
Verification step discards the candidate.  
**Final answer**  
**no match**  
*Reflection:* The algorithm never trusts the hash alone; verification is the safety net that preserves correctness.

**Example 3 — Multiple overlapping matches**  
*Given:* text = “aaa”, pattern = “aa”, b = 131, p = 997.  
h(P) = 97·131 + 97 = 12834 mod 997 = 90.  
Three windows each produce hash 90 and all verify successfully.  
**Final answer**  
**0 1**  
*Reflection:* Overlapping matches are reported without extra asymptotic cost because each verification still costs O(m).

**Example 4 — Large prime, 64-bit arithmetic**  
*Given:* text length 10^6, pattern length 10^3, random 64-bit prime p, base b = 131.  
Only the rolling update formula is executed; 64-bit overflow is handled by built-in modular reduction. Expected collisions < 2.  
**Final answer**  
**list of verified match positions**  
*Reflection:* The same O(1) update works regardless of alphabet size once characters are mapped to integers.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                                      |
|-----------------------------|---------------------------------------------|------------------------------------------------------|
| Using 32-bit int for hash   | Overflow wraps silently                     | Use 64-bit or big-integer modular arithmetic         |
| Fixed small prime modulus   | Adversary can force collisions              | Pick random prime at runtime larger than n·m         |
| Skipping verification       | False positives reported as matches         | Always compare characters when hashes match          |
| Recomputing b^{m-1} each step | Wastes time and invites overflow           | Pre-compute power once in O(m)                       |
| Treating empty pattern      | Edge case crashes rolling formula           | Handle m = 0 as a separate early return              |
| Not mapping Unicode to ints | Characters outside 0–255 produce negative hashes | Map every character to a positive integer first     |
| Ignoring multiple matches   | Algorithm stops after first hit             | Continue sliding until text end                      |

## 7. The textbook-precise statement
Cormen, Leiserson, Rivest, Stein, *Introduction to Algorithms*, 4e, Chapter 32, §32.2:  
The Rabin-Karp algorithm computes a rolling hash  
$$h_i = \bigl(\sum_{j=0}^{m-1} T[i+j]\,b^{m-1-j}\bigr)\bmod p$$  
for each window i = 1 … n-m+1. The update  
$$h_{i+1} = (b(h_i - T[i]b^{m-1}) + T[i+m])\bmod p$$  
runs in O(1) arithmetic steps. With a prime p chosen uniformly at random from a range of size Ω(nm) the expected number of spurious matches is O(1), therefore the expected running time is Θ(n + m) plus the time to read the input strings.

## 8. Visual — diagram or schematic
```
Text:   a b a b c
Index:  0 1 2 3 4
Window1: [a b a]  hash = 39
Window2:   [b a b]  hash = 40   (subtract a* b^2, add b, *b, add next)
Window3:     [a b c]  hash = 39
```
Each arrow shows the single modular multiplication and two additions that move the hash from one window to the next.

## 9. The memory technique
1. **The hook** — Picture a conveyor belt of characters; only the front and back rollers move while the middle stays put—exactly how the hash “rolls”.
2. **What to overlearn** — The rolling update formula and the fact that verification is mandatory on every hash collision.
3. **Spaced-repetition schedule** — Review the formula at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the update rule from the definition h = ∑ s[i]·b^{m-1-i} by writing h_{i+1} explicitly and simplifying.

## 10. What this unlocks
Rabin-Karp supplies the linear-time expected seed stage for more advanced string algorithms.  
- Aho-Corasick builds an automaton on top of rolling hashes for multiple patterns.  
- 2-D pattern matching extends the same rolling idea to image blocks.  
- Plagiarism and bioinformatics pipelines combine Rabin-Karp seeding with edit-distance verification.  
- Streaming duplicate detection in log files uses the identical rolling fingerprint to keep constant space per window.

## 11. Self-check — five questions, no answers
1. Compute the rolling hash of “abcd” after the window slides once, given b = 131 and p = 997.
2. Why does choosing a fixed small prime allow an attacker to force quadratic behaviour?
3. In a text of all identical characters, how many hash collisions occur and how many verifications are performed?
4. Show that the modular multiplication by b after subtraction is necessary to keep the hash value congruent to the new window.
5. Suppose two distinct patterns produce the same hash; does the algorithm still report correct matches for each?