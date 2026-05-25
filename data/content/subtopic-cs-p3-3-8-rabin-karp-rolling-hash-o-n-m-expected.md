## What it is
The Rabin-Karp algorithm is a string-searching algorithm that finds occurrences of a pattern string within a larger text string. It avoids expensive character-by-character comparisons by instead comparing hash values of the pattern and the text's substrings. Its key innovation is the "rolling hash," which allows it to calculate the hash of the next substring in constant $O(1)$ time from the previous one.

## Why it matters
This algorithm's core idea—the rolling hash—is widely used in problems involving fixed-size windows over a sequence. In bioinformatics, it's used for finding specific gene sequences in DNA. In data deduplication systems (like those used in cloud storage or version control), it's used to efficiently find duplicate blocks of data without comparing the blocks directly.

## When to study it
Before tackling Rabin-Karp, you must be comfortable with:
1.  **Basic String Operations:** Accessing characters, substrings, and lengths.
2.  **Hash Functions:** Understand their purpose (mapping data to a fixed-size value) and the concept of collisions.
3.  **Modular Arithmetic:** Operations like addition, subtraction, and multiplication modulo a number $M$. This is non-negotiable.
4.  **Big-O Notation:** You need to understand the difference between $O(n+m)$, $O(nm)$, and why "expected" vs "worst-case" matters.

If you are not solid on modular arithmetic, pause and review it. The algorithm is impossible to implement correctly without it.

## How to study it (step by step)
1.  **Master the Hash Function:** Write a function that computes a polynomial rolling hash for a given string from scratch. For a string $S$ of length $m$, a base $b$, and a modulus $M$, the hash is $h(S) = (\sum_{i=0}^{m-1} S[i] \cdot b^{m-1-i}) \pmod M$. Use a simple string like "cat" and small values for $b$ and $M$ to compute it by hand.
2.  **Derive the Rolling Update:** Take a string "abcd" and a window of size 3. You have the hash for "abc". Write out the polynomial for $h(\text{"abc"})$ and $h(\text{"bcd"})$. Algebraically manipulate the first to get the second. This will reveal the $O(1)$ update formula.
3.  **Implement the Core Loop:** Write the main loop of the Rabin-Karp algorithm. It should calculate the pattern's hash once, then calculate the hash of the first text window. Then, loop from the second character to the end, applying your rolling update formula at each step.
4.  **Add Collision Handling:** Inside your loop, when the hash of the current text window matches the pattern's hash, add a secondary check: a direct, character-by-character comparison of the substring and the pattern. This handles spurious matches (collisions).
5.  **Analyze Complexity:** Explain to yourself why the worst-case complexity is $O(nm)$. (Hint: what if every substring has the same hash as the pattern?). Then explain why, with a good hash function, the expected complexity is $O(n+m)$. (Hint: how often do you expect collisions?).

## Key ideas, with intuition
1.  **Comparing Hashes is Faster than Comparing Strings:** Imagine you want to see if two 1000-page books are identical. Instead of reading them side-by-side (slow), you could compute a checksum (a hash) for each. If the checksums differ, the books are different. If they match, they are *probably* the same. This is the core trade-off: we do a fast, cheap integer comparison that might give us false positives, which we then resolve with the slow, expensive string comparison.
    $$
    h(\text{pattern}) \stackrel{?}{=} h(\text{text\_substring})
    $$

2.  **The Rolling Hash is a "Sliding" Calculation:** Re-calculating the hash for every substring of the text is slow. For a text of length $n$ and pattern of length $m$, this would be $O(nm)$. The rolling hash lets us slide our window one character to the right and update the hash in $O(1)$ time.
    Intuition: To change the hash of "abc" to "bcd", we just need to:
    -   Remove the contribution of 'a'.
    -   "Shift" the remaining "bc" to the left (multiply by the base).
    -   Add the contribution of the new character 'd'.

3.  **Polynomials Give Characters Positional Value:** We can't just sum the character values (e.g., `a+b+c`) because "abc", "bca", and "cba" would all have the same hash. Using a polynomial hash treats a string like a number in base $b$.
    $$
    h(\text{"abc"}) = (a \cdot b^2 + b \cdot b^1 + c \cdot b^0) \pmod M
    $$
    This way, the position of each character matters, just like in the number 123, the '1' is worth more than the '2' or '3'.

4.  **Modular Arithmetic Prevents Number Overflows:** The polynomial hash values can become astronomically large for even moderately long strings. By performing all calculations modulo a large prime number $M$, we keep the hash values within a manageable integer range.
    $$
    h_{new} = ((h_{old} - \text{val}(\text{char}_{out}) \cdot b^{m-1}) \cdot b + \text{val}(\text{char}_{in})) \pmod M
    $$

## Worked example
Let's find the pattern $P = \text{"BCA"}$ in the text $T = \text{"ABCAABCD"}$.

**Setup:**
-   Let's map characters to integers: A=1, B=2, C=3, D=4.
-   Choose a small prime base, $b = 5$.
-   Choose a large prime modulus, $M = 101$.
-   Pattern length $m = 3$. Text length $n = 8$.

**Step 1: Pre-computation**
-   Calculate the hash of the pattern $P = \text{"BCA"}$.
    $h(P) = (2 \cdot 5^2 + 3 \cdot 5^1 + 1 \cdot 5^0) \pmod{101}$
    $h(P) = (2 \cdot 25 + 3 \cdot 5 + 1 \cdot 1) \pmod{101}$
    $h(P) = (50 + 15 + 1) \pmod{101} = 66 \pmod{101} = 66$.
    **Target hash = 66.**
-   We also need $b^{m-1} \pmod M$ for the rolling update.
    $H = b^{m-1} = 5^{3-1} = 5^2 = 25$.

**Step 2: Initial Hash of Text Window**
-   Calculate the hash of the first window of the text, $T[0..2] = \text{"ABC"}$.
    $h(T[0..2]) = (1 \cdot 5^2 + 2 \cdot 5^1 + 3 \cdot 5^0) \pmod{101}$
    $h(T[0..2]) = (25 + 10 + 3) \pmod{101} = 38 \pmod{101} = 38$.
-   $38 \neq 66$. No match.

**Step 3: Roll the Hash Window**
-   **Window 1:** $T[1..3] = \text{"BCA"}$. Old hash is 38. Character out is 'A' (value 1). Character in is 'A' (value 1).
    $h_{new} = ((h_{old} - \text{val}('A') \cdot H) \cdot b + \text{val}('A')) \pmod M$
    $h_{new} = ((38 - 1 \cdot 25) \cdot 5 + 1) \pmod{101}$
    $h_{new} = ((13) \cdot 5 + 1) \pmod{101}$
    $h_{new} = (65 + 1) \pmod{101} = 66$.
-   **Hash Match!** $66 = 66$. Now, verify the strings.
    Is $T[1..3]$ ("BCA") equal to $P$ ("BCA")? Yes.
    **Match found at index 1.**

-   **Window 2:** $T[2..4] = \text{"CAA"}$. Old hash is 66. Char out: 'B' (2). Char in: 'A' (1).
    $h_{new} = ((66 - 2 \cdot 25) \cdot 5 + 1) \pmod{101}$
    $h_{new} = ((66 - 50) \cdot 5 + 1) \pmod{101}$
    $h_{new} = (16 \cdot 5 + 1) \pmod{101} = (80 + 1) \pmod{101} = 81$.
-   $81 \neq 66$. No match.

...and so on. The process continues until all windows are checked.

**Reflection:**
-   Step 1 created our target value.
-   Step 2 established the initial state.
-   Step 3 used the $O(1)$ update formula to efficiently check subsequent windows, leading to a hash match. The crucial verification step confirmed it wasn't a collision.

## Diagrams
A sliding window view:

```text
Text:    A B C A A B C D
         |---|           Window 1: h("ABC")
           |---|         Window 2: h("BCA")  <-- Roll from 1 to 2
             |---|       Window 3: h("CAA")  <-- Roll from 2 to 3
               ...
```

Polynomial hash structure for "BCA" with base $b$:

```text
Character:    B         C         A
Value:        2         3         1
Position:     m-1=2     m-2=1     m-3=0
Weight:       b^2       b^1       b^0
             /         /         /
Contribution: 2*b^2  +  3*b^1  +  1*b^0
```

## Memory technique — remember this forever
1.  **Mnemonic:** **R**olling **K**arps **P**olynomials. The name itself reminds you of the core ideas: **R**olling hash, **K**arp (the person), and **P**olynomials (the type of hash). Think of a fish (karp) rolling down a hill, picking up numbers (polynomial terms) as it goes.

2.  **Must Overlearn Formulas:**
    -   **Hash Definition:** $h(S) = (\sum_{i=0}^{m-1} S[i] \cdot b^{m-1-i}) \pmod M$
    -   **Rolling Update:** $h_{new} = ((h_{old} - T[i] \cdot b^{m-1}) \cdot b + T[i+m]) \pmod M$

3.  **Spaced Repetition Schedule:** Review these formulas and the mnemonic now. Then again in **1 day, 3 days, 7 days, 16 days, and 35 days**. Quiz yourself by deriving the rolling update from the hash definition.

4.  **First Principles Pathway:** If you forget the rolling update formula, you can always re-derive it.
    -   Write the full polynomial for the old window: $h_{old} = (T[i]b^{m-1} + T[i+1]b^{m-2} + \dots + T[i+m-1]b^0)$.
    -   Write the full polynomial for the new window: $h_{new} = (T[i+1]b^{m-1} + T[i+2]b^{m-2} + \dots + T[i+m]b^0)$.
    -   Notice that $(h_{old} - T[i]b^{m-1})$ gives you the terms for $T[i+1 \dots i+m-1]$, but their powers are off by one.
    -   Multiply by $b$ to fix the powers: $(h_{old} - T[i]b^{m-1}) \cdot b = (T[i+1]b^{m-1} + \dots)$.
    -   Finally, add the new term $T[i+m]$. This rebuilds the formula from scratch.

## Common mistakes
1.  **Incorrect Modular Arithmetic with Subtraction:** When computing $(h_{old} - \text{term}) \pmod M$, the result of the subtraction can be negative. A negative result in modulo is valid but handled differently in many programming languages. The safe way is to write `(h_old - term + M) % M` to ensure the result is always positive.
2.  **Forgetting to Modulo at Each Step:** Intermediate calculations like `h_old * b` can overflow standard integer types. You must apply the modulo operator after every addition, subtraction, or multiplication to keep the numbers small.
3.  **Recomputing Powers:** The term $b^{m-1}$ is constant throughout the algorithm. Calculating `pow(b, m-1)` inside the main loop is a major performance bug, turning your $O(1)$ update into $O(\log m)$ or worse. Compute it once and store it in a variable.

## Self-check
1.  What are the best choices for the base $b$ and modulus $M$ to minimize collisions in practice? Why is choosing $b=1$ a bad idea?
2.  Using text $T = \text{"abracadabra"}$ and pattern $P = \text{"abra"}$, find all occurrences using the Rabin-Karp algorithm. Use character values a=1, b=2, c=3, d=4, r=5. Use base $b=10$ and modulus $M=11$. Show the hash of the pattern and the hash value of each sliding window.
3.  How could you adapt the Rabin-Karp algorithm to solve the "longest common substring" problem for two strings, A and B? (Hint: This would involve a binary search on the length of the substring).