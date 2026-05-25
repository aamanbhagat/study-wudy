## What it is
Open addressing is a collision resolution strategy for hash tables where all key-value pairs are stored directly in the main array. When a new key hashes to an index that is already occupied (a collision), we systematically probe subsequent array slots according to a deterministic rule until an empty one is found. The three main probing strategies are linear probing, quadratic probing, and double hashing.

## Why it matters
This technique is fundamental to the implementation of high-performance hash maps, such as C++'s `std::unordered_map` or Python's `dict`. In performance-critical applications like physics simulations or real-time spacecraft telemetry processing, open addressing offers superior cache performance over its alternative (chaining) because related data is stored contiguously in memory, reducing cache misses. This locality of reference is crucial when memory access speeds are a bottleneck.

## When to study it
Before tackling this, you must have a firm grasp of the following:
1.  **Basic Hashing:** What a hash function is, the concept of a hash table, and why collisions happen.
2.  **Modular Arithmetic:** Comfort with the modulo operator ($a \pmod m$) is non-negotiable, as it's the basis for all hash table indexing.
3.  **Arrays/Contiguous Memory:** You must understand how arrays are laid out in memory and the performance implications of sequential access (cache locality).
4.  **Separate Chaining:** You should understand separate chaining as the primary alternative to open addressing to appreciate the trade-offs.

If you are not confident in these areas, review them first. Proceeding without them will lead to confusion.

## How to study it (step by step)
1.  **Implement Linear Probing:** Write a simple hash table class from scratch that uses only linear probing for insertion and search. Use an array of integers and a simple hash function like $h(k) = k \pmod m$.
2.  **Trace by Hand:** On paper, create a hash table of size $m=11$. Manually insert the keys $\{22, 1, 13, 12, 24, 35\}$. Draw the table after each insertion, showing how you resolve collisions. This will build your intuition for "primary clustering."
3.  **Derive the General Probe Formula:** Write down the general formula for a probe sequence: $h(k, i)$, where $k$ is the key and $i$ is the probe number ($i=0, 1, 2, \dots$). Then, write the specific formulas for linear, quadratic, and double hashing. Understand how each one modifies the "offset" from the initial hash location.
4.  **Analyze Quadratic Probing:** Re-do the insertion exercise from step 2, this time using quadratic probing with the formula $h(k, i) = (h'(k) + i^2) \pmod{11}$. Observe how it avoids the clustering seen in step 2.
5.  **Analyze Double Hashing:** Repeat the exercise one last time with double hashing. Use $h_1(k) = k \pmod{11}$ and a second hash function $h_2(k) = 1 + (k \pmod{10})$. Compare the final table state to the previous two.
6.  **The Deletion Problem:** Reason through why simply removing an element from an open-addressed table breaks the `find` operation. Devise the "tombstone" solution and understand its performance implications (e.g., search times are no longer dependent only on the load factor but also on the number of tombstones).

## Key ideas, with intuition
The core of open addressing is the **probe sequence**. This is the sequence of array indices visited when trying to insert or find a key. The goal is to find an empty slot for insertion, or the key itself for a search. The search stops when we find the key or an empty slot (which means the key is not in the table).

The general form of the probe sequence is:
$$
h(k, i) = (h'(k) + f(i)) \pmod m
$$
where $h'(k)$ is the initial hash, $i$ is the probe attempt number (starting at $i=0$), $m$ is the table size, and $f(i)$ is the function that distinguishes the different methods.

1.  **Linear Probing: $f(i) = i$**
    $$
    h(k, i) = (h'(k) + i) \pmod m
    $$
    **Intuition:** If your parking spot is taken, you just check the next one, then the next one, and so on. This is simple and has great cache performance. However, it leads to **primary clustering**: long runs of occupied slots build up, significantly degrading performance as the table fills.

2.  **Quadratic Probing: $f(i) = c_1 i + c_2 i^2$ (usually $c_1=0, c_2=1$)**
    $$
    h(k, i) = (h'(k) + i^2) \pmod m
    $$
    **Intuition:** If your parking spot is taken, you check 1 spot away, then 4 spots away, then 9, etc. This "jumps" over initial clusters, avoiding primary clustering. However, if two keys have the same initial hash $h'(k)$, they will generate the exact same probe sequence. This is called **secondary clustering**.

3.  **Double Hashing: $f(i) = i \cdot h_2(k)$**
    $$
    h(k, i) = (h_1(k) + i \cdot h_2(k)) \pmod m
    $$
    **Intuition:** If your parking spot is taken, the *step size* you use to check the next spot depends on a *second hash function* applied to your key. For example, one key might probe spots $5, 8, 11, \dots$ while another key that also initially hashed to 5 might probe $5, 10, 4, \dots$. Since the probe sequence depends on the key itself, this method effectively eliminates both primary and secondary clustering and is the most robust of the three. For this to work well, $h_2(k)$ must never be zero, and $m$ should be a prime number.

## Worked example
Let's insert the keys $\{76, 93, 40, 47, 10\}$ into a hash table of size $m=7$ using **linear probing**.
The hash function is $h'(k) = k \pmod 7$.

**Initial Table:**
```
Index: 0   1   2   3   4   5   6
Value: [ ] [ ] [ ] [ ] [ ] [ ] [ ]
```

1.  **Insert 76:**
    -   $h'(76) = 76 \pmod 7 = 6$.
    -   Index 6 is empty. Place 76 there.
    -   **Table:** `[ ] [ ] [ ] [ ] [ ] [ ] [76]`

2.  **Insert 93:**
    -   $h'(93) = 93 \pmod 7 = 2$.
    -   Index 2 is empty. Place 93 there.
    -   **Table:** `[ ] [ ] [93] [ ] [ ] [ ] [76]`

3.  **Insert 40:**
    -   $h'(40) = 40 \pmod 7 = 5$.
    -   Index 5 is empty. Place 40 there.
    -   **Table:** `[ ] [ ] [93] [ ] [ ] [40] [76]`

4.  **Insert 47:**
    -   $h'(47) = 47 \pmod 7 = 5$. **Collision!** Index 5 is occupied by 40.
    -   Probe 1 ($i=1$): $h(47, 1) = (5 + 1) \pmod 7 = 6$. Index 6 is occupied by 76.
    -   Probe 2 ($i=2$): $h(47, 2) = (5 + 2) \pmod 7 = 0$. Index 0 is empty. Place 47 there.
    -   **Table:** `[47] [ ] [93] [ ] [ ] [40] [76]`

5.  **Insert 10:**
    -   $h'(10) = 10 \pmod 7 = 3$.
    -   Index 3 is empty. Place 10 there.
    -   **Table:** `[47] [ ] [93] [10] [ ] [40] [76]`

**Reflection:** The insertion of 47 demonstrates the core process. The initial hash created a collision at index 5. Linear probing dictated that we check the next sequential slots (6, then 0 after wrapping around) until we found an empty space. This sequential checking is what creates the "primary clustering" problem; the collision caused by 47 has now made a collision at index 6 more likely for future insertions.

## Diagrams
Here is the state of the hash table during the worked example, showing the collision and resolution for inserting key 47.

**State before inserting 47:**
```text
Index: 0   1   2   3   4   5   6
Value: [ ] [ ] [93] [ ] [ ] [40] [76]
```

**Attempt to insert 47:**
$h'(47) = 47 \pmod 7 = 5$. A collision occurs at index 5.

**Probing sequence for 47:**
```text
Index: 0   1   2   3   4   5   6
Value: [ ] [ ] [93] [ ] [ ] [40] [76]
                               ^   ^
                               |   |
Probe 1 (i=1) h=6 (collision) -+   |
Initial hash (i=0) h=5 (collision) -+

Probe 2 (i=2) h=0 (empty!)
  v
[ ]
```

**Final state after inserting 47:**
```text
Index: 0   1   2   3   4   5   6
Value: [47] [ ] [93] [ ] [ ] [40] [76]
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Imagine you're trying to park on a street (`the hash table`).
    *   **Linear Probing:** Your assigned spot is taken. You check the *very next spot*, and the next, and the next. You're a "linear" thinker.
    *   **Quadratic Probing:** Your spot is taken. You're cleverer. You *jump* ahead, first 1 spot, then 4, then 9... You take "quadratic" leaps.
    *   **Double Hashing:** Your spot is taken. You're a pro. You have a *second, secret number* in your head ($h_2(k)$) that tells you your personal jump distance. You jump by that amount repeatedly. Your car model determines your jump size.

2.  **Formulas to Overlearn:** Let $h'(k)$ or $h_1(k)$ be the primary hash.
    *   **Linear:** $h(k, i) = (h'(k) + i) \pmod m$
    *   **Quadratic:** $h(k, i) = (h'(k) + i^2) \pmod m$
    *   **Double:** $h(k, i) = (h_1(k) + i \cdot h_2(k)) \pmod m$

3.  **Spaced Repetition Schedule:** Review these formulas and the parking story at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. Each time, re-derive them from the first principles pathway below.

4.  **First Principles Pathway:** If you forget, start here: "Collision resolution needs a deterministic probe sequence." The general form is `(base + offset) % size`.
    *   What's the simplest possible offset? Just count up from the base. `offset = i`. That's **linear probing**.
    *   What's a better offset that jumps further to avoid clusters? Use a polynomial. The simplest non-linear one is `offset = i^2`. That's **quadratic probing**.
    *   What's the best offset, one that depends on the key itself to avoid different keys following the same path? Make the step size itself dependent on the key. `offset = i * h2(k)`. That's **double hashing**.

## Common mistakes
1.  **Incorrect Deletion:** Simply removing an element creates a "hole" in a probe chain. Any subsequent search for an element that had to probe past this hole will incorrectly stop and report the element is not found. **The fix:** Use a special "tombstone" marker to indicate a deleted slot, which the insert operation can overwrite but the search operation knows to probe past.
2.  **Forgetting the Modulo:** Applying the modulo operator only at the end of a long probe sequence is wrong. The modulo must be applied at *each step* to ensure the index wraps around the array correctly: `(h'(k) + i) mod m`, not `(h'(k) + i mod m)`.
3.  **Bad Table Size ($m$):** For quadratic probing and double hashing, the choice of $m$ is critical. If $m$ is a power of 2, quadratic probing can fail to explore all slots. For double hashing, if $m$ is not prime, it's more likely that $h_2(k)$ shares a factor with $m$, severely shortening the probe sequence. A prime number for $m$ is almost always the best choice.
4.  **$h_2(k)$ Can Be Zero:** In double hashing, if your second hash function $h_2(k)$ can return 0, the probe sequence becomes $h(k, i) = (h_1(k) + i \cdot 0) \pmod m = h_1(k)$. You will probe the same slot forever. Ensure $h_2(k)$ always returns a value in $[1, m-1]$. A common choice is $h_2(k) = 1 + (k \pmod{m-1})$.

## Self-check
1.  Take a hash table of size $m=11$ and insert the keys $\{10, 22, 31, 4, 15, 28, 17\}$. Use quadratic probing with $h(k,i) = (k \pmod{11} + i^2) \pmod{11}$. Draw the final state of the table.
2.  Explain precisely why searching for key `47` in the final table of the worked example would fail if we had inserted it, then deleted key `76` by simply clearing index 6.
3.  You are implementing double hashing with table size $m=13$. Your primary hash is $h_1(k) = k \pmod{13}$. Propose a valid secondary hash function $h_2(k)$ and justify why it is a good choice (i.e., why it will not produce 0 and is likely to generate full probe sequences).