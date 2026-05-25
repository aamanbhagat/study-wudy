## What it is
The Boyer-Moore algorithm is a highly efficient string-searching algorithm that finds occurrences of a pattern within a text. It achieves its speed by pre-processing the pattern and then scanning the text, comparing the pattern from right-to-left, which allows it to skip large portions of the text using two heuristics: the "bad character" rule and the "good suffix" rule.

## Why it matters
This algorithm, and its variants, are foundational to text processing in almost every field. In your work, you will see it in:
-   **Genomics:** Searching for specific gene sequences (patterns) within an entire genome (text) is a classic application.
-   **Signal Processing:** Finding a known signal waveform (e.g., from a pulsar or an adversary's radar) within a noisy stream of telemetry data.
-   **Compilers & Text Editors:** The "find" functionality in any IDE or text editor relies on an efficient string search; Boyer-Moore is a common choice for its excellent average-case performance.

## When to study it
Before tackling this, you must have a solid grasp of:
1.  **Naive String Search:** You should understand the brute-force $O(m \times n)$ approach to appreciate why Boyer-Moore is an improvement.
2.  **Hash Maps (or Dictionaries):** The bad character heuristic is typically implemented using a hash map or an array to store the last seen index of each character.
3.  **String Indexing and Slicing:** You need to be comfortable with concepts like prefixes, suffixes, and 0-based indexing.

If you are not comfortable with these, review them first. The logic of the heuristics will be opaque otherwise.

## How to study it (step by step)
1.  **Isolate the "Bad Character" Rule:** Write down a text and a pattern. Manually trace a search using *only* the bad character rule. Pre-compute the "last occurrence" table for the pattern. Notice how a character in the text that's not in the pattern allows a massive jump.
2.  **Implement the Bad Character Rule:** Code a simplified Boyer-Moore that only uses this first heuristic. Test it against the naive algorithm to see the performance gain.
3.  **Isolate the "Good Suffix" Rule:** Choose a pattern with repeated substrings, like `AB CAB`. Find a text that creates a partial match (e.g., `...D CAB`). Manually calculate the shift needed to align the next occurrence of `CAB`. Then, consider a partial match like `...D AB` and calculate the shift to align the prefix `AB` at the start of the pattern.
4.  **Understand the Good Suffix Pre-computation:** This is the hardest part. Work through the logic for building the `good_suffix` shift table (often called `gs` or `f`). Use a concrete example and write down the table values as you derive them.
5.  **Combine the Rules:** Take an example where a mismatch occurs. Calculate the shift proposed by the bad character rule. Calculate the shift proposed by the good suffix rule. The algorithm dictates you must take the *maximum* of these two values. Understand *why* the maximum is required for correctness (it's the safest, largest possible jump).
6.  **Implement the Full Algorithm:** Add the good suffix pre-computation and logic to your code from step 2.
7.  **Analyze Complexity:** Reason about the best-case and worst-case scenarios. The best case is $O(n/m)$, when the last character of the pattern never appears in the text. The worst case is $O(nm)$, but this is pathologically rare.

## Key ideas, with intuition
1.  **Right-to-Left Scan:** This is the central insight. By comparing the pattern's last character against the text first, a mismatch provides information about an entire block of $m$ characters. Naive search compares from left-to-right, so a mismatch at the first character only tells you about that one character. Right-to-left scanning maximizes the information gained from each character comparison.

2.  **The Bad Character Heuristic:** When a mismatch occurs between the pattern character $p[i]$ and the text character $t[k]$, we look at the "bad" text character, $t[k]$. The rule asks: "Where is the last time the character $t[k]$ appeared in my pattern?" Let's say it's at index $j$. We can safely shift the pattern to the right so that $p[j]$ aligns with $t[k]$. If $t[k]$ doesn't exist in the pattern at all, we can shift the entire pattern past this point.
    $$ \text{shift}_{bc} = \max(1, i - \text{last\_occurrence}(t[k])) $$
    The intuition is: "This text character caused a problem. Let's shift my pattern so a matching character in the pattern is now in that spot. To make the biggest jump, let's use the rightmost one."

3.  **The Good Suffix Heuristic:** This rule applies when we've found a partial match from the right. Suppose the suffix $s$ of the pattern matched a substring in the text, but the next character to the left was a mismatch. We now have a "good suffix" $s$. The rule asks: "Is there another occurrence of $s$ somewhere else in the pattern?" If yes, we shift the pattern to align with that next occurrence. If no, we ask a fallback question: "What is the longest prefix of my pattern that is also a suffix of $s$?" We then shift to align that prefix with the end of the good suffix in the text.
    The intuition is: "I've already done the work to confirm this suffix matches. I can't just throw that information away. Let's shift the pattern just enough to leverage this partial match, hoping it leads to a full match after the shift."

4.  **The Maximum Shift Rule:** At every mismatch, you compute *both* the bad character shift and the good suffix shift. You MUST take the maximum of the two.
    $$ \text{shift} = \max(\text{shift}_{bc}, \text{shift}_{gs}) $$
    This guarantees correctness. A smaller shift is always safe, but we want the largest *safe* shift. Taking the max ensures we make the biggest possible jump without risking skipping over a valid alignment.

## Worked example
Text T: `ABABACABA`
Pattern P: `ABAC`

**1. Pre-computation:**
-   **Bad Character Table (last occurrence of char in P):**
    -   A: 2
    -   B: 1
    -   C: 3
    -   (all others): -1
-   **Good Suffix Table (shift amount for good suffix of length k):** This is complex to derive, so we'll use the results.
    -   k=1 (suffix `C`): If `C` mismatches, we look for another `C`. None. We look for a prefix that is a suffix of `C`. None. Shift by pattern length = 4.
    -   k=2 (suffix `AC`): Another `AC`? No. Prefix that's a suffix of `AC`? `A` is not, `C` is not. Shift by pattern length = 4.
    -   k=3 (suffix `BAC`): Another `BAC`? No. Prefix that's a suffix of `BAC`? `A` is not, `C` is not. Shift by pattern length = 4.

**2. Search Process:**

**Attempt 1:**
Align P with the start of T.
```text
T:  A B A B A C A B A
P:  A B A C
         ^
```
-   Scan P from right to left.
-   `T[3]` is `B`, `P[3]` is `C`. Mismatch.
-   **Bad Character Rule:** The "bad character" in the text is `B`. The last occurrence of `B` in `P` is at index 1. The mismatch is at index 3. Shift = $3 - 1 = 2$.
-   **Good Suffix Rule:** No good suffix (mismatch on first compare). Shift is 1.
-   **Decision:** $\max(2, 1) = 2$. Shift P right by 2.

**Attempt 2:**
```text
T:  A B A B A C A B A
P:      A B A C
             ^
```
-   Scan P from right to left.
-   `T[5]` is `C`, `P[3]` is `C`. Match.
-   `T[4]` is `A`, `P[2]` is `A`. Match.
-   `T[3]` is `B`, `P[1]` is `B`. Match.
-   `T[2]` is `A`, `P[0]` is `A`. Match.
-   **Full match found at index 2.** Now we must shift to find other potential matches. We shift by the good suffix rule for the longest prefix of P that is a suffix of P. Let's assume for simplicity we shift by 1 to continue searching.

This example highlights the bad character rule. The key insight is that the mismatch on `B` vs `C` immediately told us the pattern couldn't possibly match at index 0 or 1, so we jumped straight to index 2.

## Diagrams

**Bad Character Rule Example:**
Text `T`, Pattern `P`. Mismatch at `T[i]` (character 'X') and `P[j]`. The last occurrence of 'X' in `P` is at index `k`.

```text
Initial Alignment:
T:  ... | | | | | X | ...
P:      | | |a|b|c|d|
                ^--- Mismatch (d != X)

Shift Calculation:
The bad character is 'X'. Find last 'X' in P. Let's say it's at index k.
P:  ... |X| ... |d|
        ^------- k

New Alignment:
Shift P so P[k] is under T[i].
T:  ... | | | | | X | ...
P:          ... |X| ... |d|
```

**Good Suffix Rule Example:**
Mismatch occurs after matching a suffix `s`.

```text
Initial Alignment:
T:  ... | | |X|s|s|s| ...
P:      | |a|b|s|s|s|
            ^----- Mismatch (b != X)

Good Suffix `s` has been found. Find next occurrence of `s` in P.
P:  ... |s|s|s| ... |b|s|s|s|
        <------>
          Next `s`

New Alignment:
Shift P to align the next occurrence of `s`.
T:  ... | | |X|s|s|s| ...
P:          ... |s|s|s| ...
```

## Memory technique — remember this forever
1.  **The Story:** You are a quality control inspector with a template (the Pattern). You're lazy, so you check the *last checkpoint first* (right-to-left scan).
    -   If it fails (**Bad Character**): You look at the defective part from the assembly line (the text character). You say, "Ah, a type 'X' defect. Let me check my template for the last place I'm supposed to see an 'X'." You slide the whole template so that part of the template aligns with the defect.
    -   If it passes, but a previous checkpoint fails (**Good Suffix**): You say, "Well, this whole end section is perfect (the good suffix). I won't re-check it. Let me see if this perfect section appears anywhere else on my template. I'll slide my template to that other spot and try again."

2.  **Must Overlearn:**
    -   **Core Logic:** Scan pattern right-to-left.
    -   **Shift Rule:** `shift = max(bad_character_shift, good_suffix_shift)`
    -   **Bad Character Shift:** `shift = mismatch_pos_in_pattern - last_occurrence(bad_char)`

3.  **Spaced Repetition Schedule:**
    -   Review this lesson in: 1 day, 3 days, 7 days, 16 days, 35 days.
    -   Each time, re-derive the logic on a fresh piece of paper with a new example.

4.  **First Principles Pathway:** If you forget everything, rebuild from this question: **"What is the largest possible shift I can make from the current position that is guaranteed not to skip over a potential match?"**
    -   This question forces you to consider the two pieces of information you have at a mismatch:
        1.  The mismatched text character (the "bad character"). To not miss a match, this character must align with an identical character in the pattern. The largest safe shift aligns it with the *rightmost* such character. This re-derives the bad character rule.
        2.  The suffix that already matched (the "good suffix"). To not miss a match, this suffix in the text must align with an identical suffix in the pattern. The largest safe shift aligns it with the *next* (rightmost) occurrence of that suffix. This re-derives the good suffix rule.

## Common mistakes
1.  **Off-by-one Errors:** Calculating shifts using 0-based indices is tricky. `shift = i - j` is a common bug. Be precise: shift is the distance between the start of the current alignment and the start of the next one.
2.  **Bad Character Shift Calculation:** A frequent error is shifting to align with the *first* or *any* occurrence of the bad character in the pattern. You must use the *last* (rightmost) occurrence to ensure the shift is maximal but still safe.
3.  **Ignoring the `max()`:** A student might implement only one heuristic or forget to take the maximum of the two. This leads to either incorrect (too large) or inefficient (too small) shifts.
4.  **Good Suffix Edge Cases:** The pre-computation for the good suffix table is complex. Errors often occur in the fallback case (when the good suffix doesn't repeat), specifically in finding the longest prefix of the pattern that is a suffix of the good suffix.

## Self-check
1.  Given the pattern `NEEDLE`, compute its bad character table.
2.  Trace the full Boyer-Moore algorithm on the text `FINDAHAYSTACKNEEDLEINAHAYSTACK` with the pattern `NEEDLE`. For the first mismatch you encounter, write down the alignment, the bad character shift, the good suffix shift, and the final shift taken.
3.  Construct a short text and pattern where the good suffix rule provides a larger (and thus more optimal) shift than the bad character rule. Explain why the bad character rule's proposed shift is smaller in this specific case.