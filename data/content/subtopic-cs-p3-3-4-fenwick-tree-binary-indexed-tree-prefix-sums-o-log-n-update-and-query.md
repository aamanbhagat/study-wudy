## What it is
A Fenwick tree, or Binary Indexed Tree (BIT), is a data structure that efficiently calculates prefix sums of an array. It allows for both point updates (changing the value at an index) and prefix sum queries (finding the sum of elements from the start up to an index) in $O(\log n)$ time. It achieves this by cleverly storing partial sums in an auxiliary array, where each element represents the sum over a specific range of the original array.

## Why it matters
This structure is critical in competitive programming and any domain requiring real-time analysis of cumulative data. In physics simulations, you might use it to track the cumulative energy or momentum distribution in a system and update it locally after a particle interaction. In aerospace, it could be used for rapid calculation of integrated sensor readings over time, allowing for fast updates and queries on telemetry data streams.

## When to study it
You must be completely fluent with binary representations of integers, including bitwise operations like AND (`&`), OR (`|`), NOT (`~`), and XOR (`^`). Specifically, you need to understand two's complement representation to grasp the key trick for finding the least significant bit. A solid understanding of arrays and the concept of prefix sums is also required.

## How to study it (step by step)
1.  **The Problem:** Start with a simple array. Implement two functions: `update(index, value)` and `query(index)` (for prefix sum). Note that a naive implementation has $O(1)$ update but $O(n)$ query. Now, implement a version using a prefix sum array. Note that this gives $O(1)$ query but $O(n)$ update. The Fenwick tree is the solution that balances these to $O(\log n)$ for both.
2.  **The Core Idea:** Take an array of size 8. Write down the indices 1 through 8 in binary. For each index `i`, find its least significant bit (LSB) — the value of the rightmost '1' bit (e.g., for 6 (0110), the LSB is 2 (0010)). The key insight is that the Fenwick tree element at index `i` will store the sum of `LSB(i)` elements from the original array.
3.  **Derive the Range:** For each index `i` from 1 to 8, use the LSB you found in step 2 to determine the range it's responsible for. The range for index `i` is `[i - LSB(i) + 1, i]`. For example, for `i=6`, LSB is 2. The range is `[6 - 2 + 1, 6] = [5, 6]`. `BIT[6]` will store `array[5] + array[6]`.
4.  **Derive the Operations:**
    *   **Query:** To get the prefix sum up to index `i`, you need `BIT[i]`, plus the prefix sum up to `i - LSB(i)`. Write out the steps for `query(7)`. You'll access `BIT[7]`, then `BIT[6]` (since $7 - \text{LSB}(7) = 7-1=6$), then `BIT[4]` (since $6 - \text{LSB}(6) = 6-2=4$), then `BIT[0]` (since $4 - \text{LSB}(4) = 4-4=0$), and stop. Notice how you are "climbing" the implicit tree by turning off the LSB.
    *   **Update:** If you update `array[i]`, which `BIT` indices need to change? All indices `j` whose range includes `i`. This happens for all `j >= i` that can be reached by repeatedly adding the LSB. To update index 3, you update `BIT[3]`, then `BIT[4]` ($3+\text{LSB}(3)=3+1=4$), then `BIT[8]` ($4+\text{LSB}(4)=4+4=8$).
5.  **Implement:** Code the `update` and `query` functions in your language of choice. The core trick is that `LSB(i)` can be calculated with the bitwise operation `i & -i`. Test it against your naive prefix sum implementation on random arrays.

## Key ideas, with intuition
1.  **Each index is responsible for a range.** A naive array `A[i]` is responsible only for value `i`. A prefix sum array `P[i]` is responsible for the range `[0...i]`. A Fenwick tree `BIT[i]` is responsible for a range of size `2^k`, where `2^k` is the value of the least significant bit (LSB) of `i`.
    $$ \text{range}(i) = [i - 2^k + 1, i] \quad \text{where } 2^k = \text{LSB}(i) $$
    For example, `BIT[6]` (binary `...0110`) has LSB value 2. It's responsible for the sum of 2 elements, ending at index 6: `A[5] + A[6]`. `BIT[8]` (binary `...1000`) has LSB value 8. It's responsible for `A[1] + ... + A[8]`.

2.  **The LSB trick isolates range size.** The fastest way to get the value of the LSB of a number `i` is with the bitwise operation `i & -i`. This works because in two's complement arithmetic, `-i` is calculated as `~i + 1`. This operation flips all bits of `i` and adds one, which has the effect of keeping the LSB and all bits to its right the same, while flipping all bits to its left. ANDing this with the original `i` isolates the LSB.
    *   `i = 6` (`0110`)
    *   `-i = -6` (`1010` in two's complement)
    *   `i & -i` = `0110 & 1010` = `0010` (which is 2, the range size)

3.  **Querying walks "up" the tree by removing the LSB.** To get a prefix sum `query(i)`, we add `BIT[i]` to our total. This covers the range `[i - LSB(i) + 1, i]`. The next piece we need is the prefix sum ending at `i - LSB(i)`. So, we set `i = i - (i & -i)` and repeat until `i` becomes 0. This is a path up towards the root of an implicit tree.

4.  **Updating walks "down" the tree by adding the LSB.** When we change `A[i]` by a `delta`, we must add `delta` to every `BIT[j]` whose range contains `i`. The first such index is `i` itself. The *next* range that contains `i` is found by jumping to the next "parent" in the implicit structure. This is done by `i = i + (i & -i)`. We repeat this until `i` goes past the end of the array.

## Worked example
Let's use an array `A` of size 8, initialized to all zeros. We want to perform two operations:
1. `update(3, 5)`: Add 5 to the element at index 3.
2. `query(7)`: Get the sum of elements from index 1 to 7.

Our Fenwick tree, `BIT`, is also of size 9 (1-indexed, so we need indices 1-8) and initialized to zeros.

**Step 1: `update(3, 5)`**
- We need to add `delta = 5` to `A[3]`.
- We start at index `i = 3`.
- **Current `i = 3`** (binary `0011`):
    - LSB is `3 & -3` which is `1`.
    - Add `delta` to `BIT[3]`. `BIT[3]` becomes 5.
    - Update `i`: `i = i + LSB(i) = 3 + 1 = 4`.
- **Current `i = 4`** (binary `0100`):
    - LSB is `4 & -4` which is `4`.
    - Add `delta` to `BIT[4]`. `BIT[4]` becomes 5.
    - Update `i`: `i = i + LSB(i) = 4 + 4 = 8`.
- **Current `i = 8`** (binary `1000`):
    - LSB is `8 & -8` which is `8`.
    - Add `delta` to `BIT[8]`. `BIT[8]` becomes 5.
    - Update `i`: `i = i + LSB(i) = 8 + 8 = 16`.
- `i` (16) is now greater than our array size (8), so we stop.
- **Final `BIT` state:** `[0, 0, 0, 5, 5, 0, 0, 0, 5]` (at indices 0-8).

**Step 2: `query(7)`**
- We want the prefix sum up to index 7. Initialize `sum = 0`.
- We start at index `i = 7`.
- **Current `i = 7`** (binary `0111`):
    - LSB is `7 & -7` which is `1`.
    - Add `BIT[7]` to sum. `sum = 0 + 0 = 0`.
    - Update `i`: `i = i - LSB(i) = 7 - 1 = 6`.
- **Current `i = 6`** (binary `0110`):
    - LSB is `6 & -6` which is `2`.
    - Add `BIT[6]` to sum. `sum = 0 + 0 = 0`.
    - Update `i`: `i = i - LSB(i) = 6 - 2 = 4`.
- **Current `i = 4`** (binary `0100`):
    - LSB is `4 & -4` which is `4`.
    - Add `BIT[4]` to sum. `sum = 0 + 5 = 5`.
    - Update `i`: `i = i - LSB(i) = 4 - 4 = 0`.
- `i` is now 0, so we stop.
- **Final result:** The prefix sum up to index 7 is 5.

**Reflection:**
The `update` propagated the change to all ranges that contain index 3: `BIT[3]` (range `[3,3]`), `BIT[4]` (range `[1,4]`), and `BIT[8]` (range `[1,8]`). The `query` correctly summed the necessary disjoint ranges to form the prefix `[1,7]`. It did this by grabbing `BIT[7]` (range `[7,7]`), then `BIT[6]` (range `[5,6]`), and finally `BIT[4]` (range `[1,4]`). Since only `BIT[4]` was non-zero from our update, the sum was 5. This matches reality: `A[3]` is 5, and all other elements are 0, so the prefix sum is 5.

## Diagrams
Here are two diagrams illustrating the structure for an array of size 8.

**1. Range Responsibilities:** This shows which original array indices' sums are stored in each `BIT` index.

```text
BIT Index | Binary | LSB | Range Covered
----------|--------|-----|-------------------------
1         | 0001   | 1   | [1]
2         | 0010   | 2   | [1, 2]
3         | 0011   | 1   | [3]
4         | 0100   | 4   | [1, 2, 3, 4]
5         | 0101   | 1   | [5]
6         | 0110   | 2   | [5, 6]
7         | 0111   | 1   | [7]
8         | 1000   | 8   | [1, 2, 3, 4, 5, 6, 7, 8]
```

**2. Implicit Tree Structure (Update/Query Paths):** This shows the parent-child relationships. To query, you follow arrows up (`i -= LSB(i)`). To update, you find all nodes that have you in their subtree (follow arrows down, `i += LSB(i)`).

```text
             (root)
               |
               8
              / \
             /   \
            4     .
           / \
          /   \
         2     6
        / \   / \
       1   3 5   7
```
An update at index 3 would travel `3 -> 4 -> 8`. A query at index 7 would travel `7 -> 6 -> 4 -> 0`.

## Memory technique — remember this forever
1.  **Mnemonic:** "Fenwick's LSB Ladder".
    - To **Query** (get a sum), you need to go **up** the ladder to the root. You climb down a rung by turning your LSB **off**: `i -= i & -i`.
    - To **Update** a value, you need to tell everyone **up** the ladder about it. You jump to the next responsible parent by extending your reach with your LSB: `i += i & -i`.
    - **Q**uery -> **S**ubtract. **U**pdate -> **A**dd. (QS, UA).

2.  **Must-learn formulas:**
    *   Find LSB: `int lsb = i & -i;`
    *   Query loop: `for (; i > 0; i -= i & -i) sum += bit[i];`
    *   Update loop: `for (; i <= n; i += i & -i) bit[i] += delta;`

3.  **Spaced Repetition Schedule:**
    *   Day 1: Re-implement from scratch.
    *   Day 3: Solve one easy problem using a BIT.
    *   Day 7: Explain the LSB range responsibility rule to a rubber duck.
    *   Day 16: Solve a medium problem requiring range sums (`query(b) - query(a-1)`).
    *   Day 35: Re-derive the update/query logic from first principles.

4.  **First Principles Pathway:** If you forget everything, remember this: **"Each `BIT[i]` stores the sum of a block of size LSB(i) ending at `i`."** From this single fact, you can re-derive everything.
    *   To get `sum(1...i)`, I need `BIT[i]`. What's left? The sum up to `i - LSB(i)`. This gives the query recurrence.
    *   To update `A[k]`, which `BIT[i]`s are affected? Any `i` where `k` is in `[i - LSB(i) + 1, i]`. This gives the update logic.

## Common mistakes
1.  **0-based vs. 1-based indexing.** The `i & -i` logic is designed for 1-based indexing. `LSB(0)` is undefined in this context. Always implement your BIT with a size `n+1` array and use indices `1` to `n`.
2.  **Updating with a value vs. a delta.** The `update` function should add a *change* in value (`delta`), not the new absolute value. If `A[i]` changes from 5 to 7, you call `update(i, 2)`. If it changes from 5 to 2, you call `update(i, -3)`.
3.  **Range Sum `sum(l, r)` error.** The sum of elements in the range `[l, r]` is `query(r) - query(l-1)`, not `query(r) - query(l)`. Forgetting the `-1` is a frequent off-by-one error.

## Self-check
1.  Given an array of size 16, initialized to zeros, what is the state of the `BIT` array after performing `update(11, 100)`?
2.  Using the `BIT` from the previous question, what is the result of `query(13)`? What is the result for the range sum from index 9 to 13?
3.  Could you use a Fenwick tree to find the *maximum* value in a prefix `[1...i]`? If `update(i, val)` sets `A[i] = val`, how does this change the logic? What property of addition allows BITs to work for sums, and does that property hold for the `max` operation in this context?