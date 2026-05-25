## 1. What it is — in plain English

Imagine you have a big stack of index cards, each with a number on it, and you need to sort them from smallest to largest. Most sorting methods would have you pick two cards, compare them, and decide which one comes first. Radix sort takes a totally different approach.

Instead of comparing entire numbers, Radix sort looks at the numbers digit by digit. Think of it like how a post office sorts mail: they might first sort all mail by state, then within each state, sort by city, then by zip code, and so on. They don't compare the *entire* address at once.

The magic of Radix sort is that it uses a simpler, very fast sorting method (like putting things into buckets) repeatedly. It sorts all the numbers based on their *last* digit, then based on their *second-to-last* digit, and so on, until it sorts by the *first* digit. By doing this carefully, the numbers end up perfectly sorted.

There are two main ways to do this: starting from the "least significant digit" (LSD), which means starting from the rightmost digit, or starting from the "most significant digit" (MSD), which means starting from the leftmost digit. LSD is generally simpler and more common for fixed-length integers.

## 2. Why it matters — real-world applications

Radix sort is a non-comparison sort, meaning it doesn't compare elements directly to sort them. This allows it to achieve better-than-$O(N \log N)$ performance in certain scenarios, making it incredibly valuable for specific types of data and applications.

1.  **Large-scale Data Processing and Database Systems:** When dealing with massive datasets where keys (like IDs, timestamps, or numerical codes) have a fixed number of digits or a known maximum length, Radix sort can be significantly faster than comparison-based sorts. For instance, sorting millions of customer IDs, product SKUs, or transaction records in a database system might leverage Radix sort for its efficiency, especially if the data is already stored in a way that allows easy digit extraction.
2.  **Network Routing and IP Address Sorting:** In networking, IP addresses (e.g., `192.168.1.10`) are essentially 32-bit numbers. Sorting lists of IP addresses to optimize routing tables or for network analysis is a prime candidate for Radix sort. Each octet (the numbers separated by dots) can be treated as a "digit," and the addresses can be sorted very efficiently. Similarly, MAC addresses are 48-bit numbers often represented in hexadecimal, which also lends itself well to digit-by-digit sorting.
3.  **Compiler Design and Symbol Table Sorting:** Compilers and interpreters often need to manage and sort symbol tables, which store information about variables, functions, and other program elements. If these symbols are assigned fixed-length identifiers or numerical representations internally, Radix sort can be used to efficiently sort them, speeding up lookup and processing times within the compiler's various phases.
4.  **Bioinformatics and Genomic Data:** In bioinformatics, sequences of DNA or RNA are strings of characters (A, C, G, T/U). While direct character sorting can be done, if these sequences are encoded numerically (e.g., A=0, C=1, G=2, T=3), or if one needs to sort by specific "chunks" of the sequence, Radix sort can be applied. For example, sorting short reads from next-generation sequencing, where each read is a fixed length string, could benefit from Radix sort's efficiency.
5.  **Aerospace and Physics Data Analysis:** In fields generating vast amounts of sensor data, such as from satellites, particle accelerators, or flight recorders, data points often come with high-precision numerical identifiers or timestamps. If these identifiers are processed in batches and have a consistent format (e.g., fixed-point numbers with a certain number of digits), Radix sort could be employed to quickly order these data points for subsequent analysis, pattern recognition, or anomaly detection.

## 3. Prerequisites — what you must know first

Before diving deep into Radix sort, ensure you have a solid grasp of these fundamental concepts:

*   **Comparison Sorts:** Understanding algorithms like Bubble Sort, Merge Sort, Quick Sort, and their $O(N \log N)$ lower bound helps appreciate why Radix sort is special.
*   **Counting Sort:** Radix sort *uses* Counting Sort as a subroutine for sorting based on individual digits; you must understand how Counting Sort works and its $O(N+K)$ time complexity.
*   **Stable Sort:** A sorting algorithm is stable if elements with equal values maintain their relative order in the sorted output; this property is absolutely crucial for LSD Radix Sort.
*   **Time Complexity Analysis (Big O Notation):** The ability to analyze algorithms and express their efficiency using $O()$, $\Omega()$, and $\Theta()$ notation is essential for understanding Radix sort's performance.
*   **Arrays/Lists:** Familiarity with basic array operations (accessing, iterating, storing elements) is necessary, as Radix sort typically operates on arrays.
*   **Integers and Digits:** Basic arithmetic operations like modulo (`%`) and integer division (`/`) for extracting digits from numbers are fundamental.

## 4. The core idea — step by step

Radix sort is built upon a very clever idea: instead of comparing entire numbers, we sort them by their individual "digits" (or characters, or bits) using a stable sorting algorithm. Let's break down this core idea.

### Step 1: The "Digit-by-Digit" Approach

*   **Plain English:** Imagine you have a list of words, like "cat", "bat", "apple". How would you sort them without comparing the whole word? You could first sort them by their *last* letter. Then, you'd take that partially sorted list and sort it again by the *second-to-last* letter, and so on. Or you could start from the *first* letter. The key is breaking down the sorting problem into smaller, simpler sorts based on parts of the items.

*   **Small Concrete Example:**
    Let's sort the numbers: `[170, 045, 075, 090, 802, 024, 002, 066]`
    Instead of comparing `170` with `045`, we'll look at just the units digit first, then the tens digit, then the hundreds digit.

*   **Formal/Mathematical Version:**
    Given a list of $n$ numbers, $A = [a_1, a_2, \dots, a_n]$, where each $a_i$ has at most $d$ digits. Radix sort performs $d$ passes. In each pass $j$ (from $1$ to $d$), it sorts the numbers based on their $j$-th digit.
    To extract the $j$-th digit (from the right, 1-indexed) of a number $x$:
    $$ \text{digit}_j(x) = \left\lfloor \frac{x}{10^{j-1}} \right\rfloor \pmod{10} $$
    For example, for $x = 170$ and $j=1$ (units digit): $\lfloor \frac{170}{10^0} \rfloor \pmod{10} = \lfloor 170 \rfloor \pmod{10} = 170 \pmod{10} = 0$.
    For $x = 170$ and $j=2$ (tens digit): $\lfloor \frac{170}{10^1} \rfloor \pmod{10} = \lfloor 17 \rfloor \pmod{10} = 17 \pmod{10} = 7$.
    For $x = 170$ and $j=3$ (hundreds digit): $\lfloor \frac{170}{10^2} \rfloor \pmod{10} = \lfloor 1.7 \rfloor \pmod{10} = 1 \pmod{10} = 1$.

*   **What could go wrong:** If numbers have varying lengths (e.g., `5`, `123`, `45`), we need to treat shorter numbers as if they have leading zeros (e.g., `005`). Otherwise, the digit extraction logic might fail or produce incorrect results.

### Step 2: LSD vs MSD

*   **Plain English:** "LSD" stands for Least Significant Digit. This means we start sorting by the rightmost digit (the units place), then move to the tens place, then the hundreds place, and so on, working our way to the left. "MSD" stands for Most Significant Digit. This means we start sorting by the leftmost digit (the highest place value), then move to the next digit to the right, and so on.

*   **Small Concrete Example:**
    Numbers: `[123, 45, 6]` (assume 3 digits for all, so `[123, 045, 006]`)
    *   **LSD:**
        1.  Sort by units digit: `[123, 045, 006]` -> `[006, 123, 045]` (because 6, 3, 5)
        2.  Sort by tens digit (from current list): `[006, 123, 045]` -> `[006, 045, 123]` (because 0, 4, 2)
        3.  Sort by hundreds digit (from current list): `[006, 045, 123]` -> `[006, 045, 123]` (because 0, 0, 1)
        Result: `[6, 45, 123]`
    *   **MSD:**
        1.  Sort by hundreds digit: `[123, 045, 006]` -> `[006, 045, 123]` (groups 0-99, 100-199, etc.)
        2.  Recursively sort the "0" group (`[006, 045]`) by tens digit: `[006, 045]` -> `[006, 045]`
        3.  Recursively sort the "00" group (`[006]`) by units digit: `[006]` -> `[006]`
        4.  Recursively sort the "04" group (`[045]`) by units digit: `[045]` -> `[045]`
        5.  Recursively sort the "1" group (`[123]`) by tens digit: `[123]` -> `[123]`
        Result: `[6, 45, 123]`

*   **Formal/Mathematical Version:**
    *   **LSD Radix Sort:** Iterates $j$ from $1$ to $d$. In each iteration, it performs a stable sort on the input array based on the $j$-th digit (from right to left).
    *   **MSD Radix Sort:** Takes an array and a current digit position $j$. It performs a stable sort on the array based on the $j$-th digit (from left to right). Then, it recursively calls itself on each "bucket" or group formed by the $j$-th digit, for the $(j+1)$-th digit.

*   **What could go wrong:** MSD is more complex to implement due to its recursive nature and handling of sub-arrays. LSD is generally preferred for integer sorting because of its simplicity and guaranteed $d$ passes. MSD can be more efficient if the data is already somewhat sorted or if keys differ significantly at the most significant digits, leading to smaller recursive calls.

### Step 3: The Role of a Stable Sort

*   **Plain English:** Imagine you're sorting a list of students by their grade, but some students have the same grade. If two students, Alice and Bob, both have an 'A', and Alice was listed before Bob originally, a stable sort would ensure Alice is *still* listed before Bob after the sort. An unstable sort might swap their order. For Radix sort, stability is critical: when we sort by a digit, if two numbers have the *same value* for that digit, their relative order from the *previous* digit's sort must be preserved.

*   **Small Concrete Example:**
    Numbers: `[170, 045, 075, 090, 802, 024, 002, 066]`
    Let's focus on `045` and `075`.
    1.  **Sort by units digit:**
        Numbers ending in 5: `045`, `075`. Since `045` appeared before `075` in the original list, a stable sort will ensure `045` comes before `075` in the bucket for '5'.
        After sorting by units digit, the list might look like: `[170, 090, 802, 002, 024, 045, 075, 066]` (this is a simplified view, the actual stable sort maintains relative order for equal digits).
    2.  **Sort by tens digit:**
        Now, when we sort by the tens digit, `045` has a '4' and `075` has a '7'. They will naturally be separated. But what if we had `145` and `245`? After sorting by units digit, `145` would precede `245` (assuming it did initially). When sorting by tens digit, both have '4'. A stable sort ensures `145` *still* precedes `245`. If it didn't, the previous sort by units digit would be undone.

*   **Formal/Mathematical Version:**
    A sorting algorithm $S$ is stable if for any two elements $A[i]$ and $A[j]$ in the input array such that $A[i] = A[j]$ and $i < j$, then in the sorted output array $A'$, $A'[k]$ (the element originally at $A[i]$) appears before $A'[l]$ (the element originally at $A[j]$).
    In LSD Radix Sort, if we sort by digit $p$, and two numbers $x$ and $y$ have the same $p$-th digit value, then their relative order in the output must be the same as their relative order *before* this pass. This ensures that the correctness of sorting by digit $p-1$ is preserved.

*   **What could go wrong:** If you use an unstable sorting algorithm (like Quick Sort) as the subroutine for Radix sort, the results will be incorrect. The sorting done in a previous pass (e.g., by the units digit) would be undone by a later pass (e.g., by the tens digit) if the relative order of numbers with the same tens digit but different units digits is not preserved.

### Step 4: LSD Radix Sort using Counting Sort

*   **Plain English:** The most common way to implement the "stable sort" needed for Radix sort is by using Counting Sort. Counting Sort works great because it's stable and very fast for a limited range of input values (which is perfect for digits 0-9). So, for LSD Radix sort, we repeat Counting Sort $d$ times. Each time, we tell Counting Sort to sort based on a different digit position, starting from the rightmost digit and moving left.

*   **Small Concrete Example:**
    Let's sort `[170, 045, 075, 090, 802, 024, 002, 066]` using LSD Radix Sort with Counting Sort. Max digits $d=3$. Max digit value $k=9$.
    **Initial List:** `[170, 045, 075, 090, 802, 024, 002, 066]`

    **Pass 1: Sort by Units Digit (rightmost digit, $j=1$)**
    *   Extract units digits: `0, 5, 5, 0, 2, 4, 2, 6`
    *   Apply Counting Sort based on these digits.
        *   Count array: `[0:2, 1:0, 2:2, 3:0, 4:1, 5:2, 6:1, 7:0, 8:0, 9:0]` (Counts of 0s, 1s, 2s, etc.)
        *   Cumulative count array: `[2, 2, 4, 4, 5, 7, 8, 8, 8, 8]`
        *   Output array (building from right to left to maintain stability):
            - `066` (digit 6) goes to index 8-1=7: `[_,_,_,_,_,_,_,066]`
            - `002` (digit 2) goes to index 4-1=3: `[_,_,_,002,_,_,_,066]`
            - `802` (digit 2) goes to index 3-1=2: `[_,_,802,002,_,_,_,066]`
            - `024` (digit 4) goes to index 5-1=4: `[_,_,802,002,024,_,_,066]`
            - `075` (digit 5) goes to index 7-1=6: `[_,_,802,002,024,_,075,066]`
            - `045` (digit 5) goes to index 6-1=5: `[_,_,802,002,024,045,075,066]`
            - `090` (digit 0) goes to index 2-1=1: `[_,090,802,002,024,045,075,066]`
            - `170` (digit 0) goes to index 1-1=0: `[170,090,802,002,024,045,075,066]`
    *   **List after Pass 1:** `[170, 090, 802, 002, 024, 045, 075, 066]`

    **Pass 2: Sort by Tens Digit ($j=2$)**
    *   Extract tens digits from current list: `7, 9, 0, 0, 2, 4, 7, 6`
    *   Apply Counting Sort.
        *   Count array: `[0:2, 1:0, 2:1, 3:0, 4:1, 5:0, 6:1, 7:2, 8:0, 9:1]`
        *   Cumulative count array: `[2, 2, 3, 3, 4, 4, 5, 7, 7, 8]`
        *   Output array:
            - `066` (digit 6) goes to index 5-1=4: `[_,_,_,_,066,_,_,_]`
            - `075` (digit 7) goes to index 7-1=6: `[_,_,_,_,066,_,075,_]`
            - `045` (digit 4) goes to index 4-1=3: `[_,_,_,045,066,_,075,_]`
            - `024` (digit 2) goes to index 3-1=2: `[_,_,024,045,066,_,075,_]`
            - `002` (digit 0) goes to index 2-1=1: `[_,002,024,045,066,_,075,_]`
            - `802` (digit 0) goes to index 1-1=0: `[802,002,024,045,066,_,075,_]`
            - `090` (digit 9) goes to index 8-1=7: `[802,002,024,045,066,_,075,090]`
            - `170` (digit 7) goes to index 6-1=5: `[802,002,024,045,066,170,075,090]`
    *   **List after Pass 2:** `[802, 002, 024, 045, 066, 170, 075, 090]`

    **Pass 3: Sort by Hundreds Digit ($j=3$)**
    *   Extract hundreds digits from current list: `8, 0, 0, 0, 0, 1, 0, 0`
    *   Apply Counting Sort.
        *   Count array: `[0:6, 1:1, 2:0, ..., 8:1]`
        *   Cumulative count array: `[6, 7, 7, ..., 8]`
        *   Output array:
            - `090` (digit 0) goes to index 6-1=5: `[_,_,_,_,_,090,_,_]`
            - `075` (digit 0) goes to index 5-1=4: `[_,_,_,_,075,090,_,_]`
            - `170` (digit 1) goes to index 7-1=6: `[_,_,_,_,075,090,170,_]`
            - `066` (digit 0) goes to index 4-1=3: `[_,_,_,066,075,090,170,_]`
            - `045` (digit 0) goes to index 3-1=2: `[_,_,045,066,075,090,170,_]`
            - `024` (digit 0) goes to index 2-1=1: `[_,024,045,066,075,090,170,_]`
            - `002` (digit 0) goes to index 1-1=0: `[002,024,045,066,075,090,170,_]`
            - `802` (digit 8) goes to index 8-1=7: `[002,024,045,066,075,090,170,802]`
    *   **List after Pass 3:** `[002, 024, 045, 066, 075, 090, 170, 802]`

    The list is now fully sorted!

*   **Formal/Mathematical Version:**
    **LSD_Radix_Sort(A, d)**
    1.  `max_val = max(A)` (Find the maximum value to determine the number of digits `d`)
    2.  `exp = 1` (Current digit place value: units, tens, hundreds...)
    3.  While `max_val / exp > 0`:
        a.  `Counting_Sort(A, exp)` (Sort `A` based on the digit at `exp` place)
        b.  `exp = exp * 10` (Move to the next digit place: tens, hundreds, etc.)

    **Counting_Sort(A, exp)** (Modified for Radix Sort)
    1.  `n = length(A)`
    2.  `output = array of size n`
    3.  `count = array of size 10` (for digits 0-9), initialized to zeros.
    4.  For `i = 0 to n-1`:
        a.  `digit = (A[i] / exp) % 10` (Extract the digit at the `exp` place)
        b.  `count[digit] = count[digit] + 1`
    5.  For `i = 1 to 9`:
        a.  `count[i] = count[i] + count[i-1]` (Cumulative count)
    6.  For `i = n-1 down to 0`: (Iterate backward to ensure stability)
        a.  `digit = (A[i] / exp) % 10`
        b.  `output[count[digit] - 1] = A[i]`
        c.  `count[digit] = count[digit] - 1`
    7.  For `i = 0 to n-1`:
        a.  `A[i] = output[i]` (Copy the sorted elements back to the original array)

*   **What could go wrong:** Incorrectly implementing `Counting_Sort` (especially the backward iteration for stability) or errors in extracting the digit using `(A[i] / exp) % 10`. Also, not correctly determining `d` (the maximum number of digits) or handling numbers with different lengths (e.g., `5` vs `123`) by implicitly padding with leading zeros.

### Step 5: MSD Radix Sort

*   **Plain English:** Instead of starting from the rightmost digit, MSD Radix Sort starts from the leftmost digit (the most significant one). It first sorts numbers into "buckets" based on their first digit. Then, crucially, it *recursively* applies the same MSD sorting process to each bucket, but now focusing on the *next* digit to the right. This continues until all digits have been considered for a given group of numbers.

*   **Small Concrete Example:**
    Numbers: `[170, 045, 075, 090, 802, 024, 002, 066]`
    **Initial List:** `[170, 045, 075, 090, 802, 024, 002, 066]`

    **Pass 1: Sort by Hundreds Digit (leftmost digit, $j=3$)**
    *   Extract hundreds digits: `1, 0, 0, 0, 8, 0, 0, 0`
    *   Apply a stable sort (like Counting Sort) based on these digits. This creates "buckets" for each leading digit.
        *   Bucket 0: `[045, 075, 090, 024, 002, 066]` (maintaining relative order)
        *   Bucket 1: `[170]`
        *   Bucket 8: `[802]`
        (Other buckets are empty)
    *   Current list (conceptual, not necessarily physically rearranged yet): `[045, 075, 090, 024, 002, 066, 170, 802]`

    **Recursively Sort Bucket 0 (`[045, 075, 090, 024, 002, 066]`) by Tens Digit ($j=2$)**
    *   Extract tens digits: `4, 7, 9, 2, 0, 6`
    *   Apply stable sort.
        *   Bucket 0 (from current group): `[002]`
        *   Bucket 2 (from current group): `[024]`
        *   Bucket 4 (from current group): `[045]`
        *   Bucket 6 (from current group): `[066]`
        *   Bucket 7 (from current group): `[075]`
        *   Bucket 9 (from current group): `[090]`
    *   The "0" group is now conceptually `[002, 024, 045, 066, 075, 090]`

    **Recursively Sort Bucket 00 (`[002]`) by Units Digit ($j=1$)**
    *   Only `002`. Already sorted.

    **Recursively Sort Bucket 02 (`[024]`) by Units Digit ($j=1$)**
    *   Only `024`. Already sorted.
    ... and so on for all sub-buckets.

    **After all recursion:** The final sorted list is assembled by concatenating the sorted buckets:
    `[002, 024, 045, 066, 075, 090, 170, 802]`

*   **Formal/Mathematical Version:**
    **MSD_Radix_Sort(A, start_index, end_index, digit_place)**
    1.  If `start_index >= end_index` or `digit_place` is beyond max digits:
        a.  Return (base case: sub-array is empty, single element, or all digits processed)
    2.  `n = end_index - start_index + 1`
    3.  Use a stable sorting algorithm (e.g., Counting Sort) to sort the sub-array `A[start_index...end_index]` based on the digit at `digit_place`.
    4.  This sorting partitions the sub-array into `k` (e.g., 10 for decimal digits) buckets.
    5.  For each bucket `b` from $0$ to $k-1$:
        a.  Let `bucket_start` and `bucket_end` be the indices of elements belonging to bucket `b`.
        b.  If `bucket_start < bucket_end`:
            i.  `MSD_Radix_Sort(A, bucket_start, bucket_end, digit_place + 1)`

*   **What could go wrong:** Implementing the recursive calls and correctly identifying the `start_index` and `end_index` for each sub-bucket is significantly more complex than LSD. The overhead of recursion can also be an issue for very small buckets. MSD is often more efficient for string sorting or when keys have very different lengths, as it can stop processing a sub-bucket once it's sorted or contains only one element.

### Step 6: Time Complexity Analysis

*   **Plain English:** How long does Radix sort take? Well, we perform a simple sorting operation (like Counting Sort) for each "digit" in our numbers. If our numbers have, say, $d$ digits, and each time we sort, it takes roughly $N$ steps (where $N$ is the number of items) plus $K$ steps (where $K$ is the range of possible digit values, usually 10 for decimal digits), then the total time is $d$ times $(N+K)$.

*   **Small Concrete Example:**
    If we have $N=1,000,000$ numbers, each with $d=5$ digits, and we are sorting decimal digits ($K=10$).
    Each pass of Counting Sort takes $O(N+K) = O(1,000,000 + 10) \approx O(1,000,000)$ operations.
    Since there are $d=5$ passes, the total time is approximately $5 \times 1,000,000 = 5,000,000$ operations.
    Compare this to a comparison sort like Merge Sort: $N \log N = 1,000,000 \log_2 1,000,000 \approx 1,000,000 \times 20 = 20,000,000$ operations. Radix sort is faster here!

*   **Formal/Mathematical Version:**
    Let $n$ be the number of elements to be sorted.
    Let $d$ be the maximum number of digits (or characters, or "passes") in any input element.
    Let $k$ be the base (or radix) of the numbers being sorted (e.g., 10 for decimal numbers, 2 for binary, 256 for bytes). This $k$ also represents the range of values for each "digit".

    Each pass of Radix sort involves a stable sorting algorithm, typically Counting Sort.
    The time complexity of Counting Sort for $n$ elements, where each element's value is in the range $0$ to $k-1$, is $O(n+k)$.

    Since Radix sort performs $d$ passes, and each pass takes $O(n+k)$ time, the total time complexity for Radix sort is:
    $$ O(d(n+k)) $$

    **Space Complexity:**
    Radix sort requires $O(n+k)$ auxiliary space due to the Counting Sort subroutine (for the `count` array and the `output` array).

*   **What could go wrong:** Misinterpreting $d$ or $k$. $d$ is not necessarily the *value* of the largest number, but the *number of digits* in the largest number. For example, $1000$ has $d=4$ digits, but its value is $10^3$. Also, $k$ is the base of the numbers, not the maximum value in the input array. For example, if we sort 32-bit integers, we might treat them as 4 groups of 8-bit numbers. Here, $d=4$ and $k=2^8=256$. If $k$ is very large (e.g., if we try to sort numbers by their full value in one pass), then $k$ can dominate $n$, and Radix sort becomes inefficient. Radix sort is efficient when $k$ is relatively small compared to $n$, and $d$ is also small.

## 5. Worked examples — multiple, with every step shown

We will use LSD Radix Sort with Counting Sort for these examples, as it's the most common and illustrative.

### Example 1: Easy - 2-digit numbers

**Problem:** Sort the following list of numbers: `[23, 12, 45, 34, 11]`

**Given:** An unsorted array of integers.
**Want:** A sorted array of integers.

**Maximum number of digits (d):** 2 (all numbers are 2-digit)
**Base (k):** 10 (decimal digits 0-9)

**Initial List:** `A = [23, 12, 45, 34, 11]`

---

**Pass 1: Sort by Units Digit (exp = 1)**

1.  **Extract units digits:**
    *   `23` -> 3
    *   `12` -> 2
    *   `45` -> 5
    *   `34` -> 4
    *   `11` -> 1

2.  **Counting Sort steps:**
    *   **Initialize `count` array (size 10) to zeros:** `[0,0,0,0,0,0,0,0,0,0]`
    *   **Populate `count` array:**
        *   `11` (digit 1): `count[1]` becomes 1
        *   `12` (digit 2): `count[2]` becomes 1
        *   `23` (digit 3): `count[3]` becomes 1
        *   `34` (digit 4): `count[4]` becomes 1
        *   `45` (digit 5): `count[5]` becomes 1
        `count = [0,1,1,1,1,1,0,0,0,0]`
    *   **Calculate cumulative `count` array:**
        *   `count[0]` = 0
        *   `count[1]` = `count[0]` + `count[1]` = 0 + 1 = 1
        *   `count[2]` = `count[1]` + `count[2]` = 1 + 1 = 2
        *   `count[3]` = `count[2]` + `count[3]` = 2 + 1 = 3
        *   `count[4]` = `count[3]` + `count[4]` = 3 + 1 = 4
        *   `count[5]` = `count[4]` + `count[5]` = 4 + 1 = 5
        *   ... (rest remain 5)
        `cumulative_count = [0,1,2,3,4,5,5,5,5,5]`
    *   **Build `output` array (size 5) by iterating `A` backward (for stability):**
        *   Current `A[4]` is `11`. Units digit is 1. `cumulative_count[1]` is 1. Place `11` at `output[1-1]` = `output[0]`. Decrement `cumulative_count[1]` to 0.
            `output = [11, _, _, _, _]`
        *   Current `A[3]` is `34`. Units digit is 4. `cumulative_count[4]` is 4. Place `34` at `output[4-1]` = `output[3]`. Decrement `cumulative_count[4]` to 3.
            `output = [11, _, _, 34, _]`
        *   Current `A[2]` is `45`. Units digit is 5. `cumulative_count[5]` is 5. Place `45` at `output[5-1]` = `output[4]`. Decrement `cumulative_count[5]` to 4.
            `output = [11, _, _, 34, 45]`
        *   Current `A[1]` is `12`. Units digit is 2. `cumulative_count[2]` is 2. Place `12` at `output[2-1]` = `output[1]`. Decrement `cumulative_count[2]` to 1.
            `output = [11, 12, _, 34, 45]`
        *   Current `A[0]` is `23`. Units digit is 3. `cumulative_count[3]` is 3. Place `23` at `output[3-1]` = `output[2]`. Decrement `cumulative_count[3]` to 2.
            `output = [11, 12, 23, 34, 45]`
    *   **Copy `output` back to `A`:**
        `A = [11, 12, 23, 34, 45]`

---

**Pass 2: Sort by Tens Digit (exp = 10)**

1.  **Extract tens digits:**
    *   `11` -> 1
    *   `12` -> 1
    *   `23` -> 2
    *   `34` -> 3
    *   `45` -> 4

2.  **Counting Sort steps:**
    *   **Initialize `count` array (size 10) to zeros:** `[0,0,0,0,0,0,0,0,0,0]`
    *   **Populate `count` array:**
        *   `11` (digit 1): `count[1]` becomes 1
        *   `12` (digit 1): `count[1]` becomes 2
        *   `23` (digit 2): `count[2]` becomes 1
        *   `34` (digit 3): `count[3]` becomes 1
        *   `45` (digit 4): `count[4]` becomes 1
        `count = [0,2,1,1,1,0,0,0,0,0]`
    *   **Calculate cumulative `count` array:**
        *   `count[0]` = 0
        *   `count[1]` = 0 + 2 = 2
        *   `count[2]` = 2 + 1 = 3
        *   `count[3]` = 3 + 1 = 4
        *   `count[4]` = 4 + 1 = 5
        *   ... (rest remain 5)
        `cumulative_count = [0,2,3,4,5,5,5,5,5,5]`
    *   **Build `output` array (size 5) by iterating `A` backward (for stability):**
        *   Current `A[4]` is `45`. Tens digit is 4. `cumulative_count[4]` is 5. Place `45` at `output[5-1]` = `output[4]`. Decrement `cumulative_count[4]` to 4.
            `output = [_, _, _, _, 45]`
        *   Current `A[3]` is `34`. Tens digit is 3. `cumulative_count[3]` is 4. Place `34` at `output[4-1]` = `output[3]`. Decrement `cumulative_count[3]` to 3.
            `output = [_, _, _, 34, 45]`
        *   Current `A[2]` is `23`. Tens digit is 2. `cumulative_count[2]` is 3. Place `23` at `output[3-1]` = `output[2]`. Decrement `cumulative_count[2]` to 2.
            `output = [_, _, 23, 34, 45]`
        *   Current `A[1]` is `12`. Tens digit is 1. `cumulative_count[1]` is 2. Place `12` at `output[2-1]` = `output[1]`. Decrement `cumulative_count[1]` to 1.
            `output = [_, 12, 23, 34, 45]`
        *   Current `A[0]` is `11`. Tens digit is 1. `cumulative_count[1]` is 1. Place `11` at `output[1-1]` = `output[0]`. Decrement `cumulative_count[1]` to 0.
            `output = [11, 12, 23, 34, 45]`
    *   **Copy `output` back to `A`:**
        `A = [11, 12, 23, 34, 45]`

---

**Final Answer:**
$\boxed{[11, 12, 23, 34, 45]}$

**Reflection:** This example was straightforward because all numbers had the same number of digits, and there were no duplicates after the first pass that would test stability further. It clearly shows the digit-by-digit sorting process.

### Example 2: Medium - 3-digit numbers with varying lengths (implicit padding)

**Problem:** Sort the following list of numbers: `[329, 457, 657, 839, 436, 720, 355]`

**Given:** An unsorted array of integers.
**Want:** A sorted array of integers.

**Maximum number of digits (d):** 3 (e.g., 329, 457, etc.)
**Base (k):** 10

**Initial List:** `A = [329, 457, 657, 839, 436, 720, 355]`

---

**Pass 1: Sort by Units Digit (exp = 1)**

1.  **Extract units digits:**
    *   `329` -> 9
    *   `457` -> 7
    *   `657` -> 7
    *   `839` -> 9
    *   `436` -> 6
    *   `720` -> 0
    *   `355` -> 5

2.  **Counting Sort steps:**
    *   **Initialize `count` array:** `[0,0,0,0,0,0,0,0,0,0]`
    *   **Populate `count` array:**
        *   `720` (0): `count[0]`=1
        *   `355` (5): `count[5]`=1
        *   `436` (6): `count[6]`=1
        *   `457` (7): `count[7]`=1
        *   `657` (7): `count[7]`=2
        *   `329` (9): `count[9]`=1
        *   `839` (9): `count[9]`=2
        `count = [1,0,0,0,0,1,1,2,0,2]`
    *   **Calculate cumulative `count` array:**
        `cumulative_count = [1,1,1,1,1,2,3,5,5,7]`
    *   **Build `output` array (size 7) by iterating `A` backward:**
        *   `355` (digit 5): `cumulative_count[5]` is 2. `output[1] = 355`. `cumulative_count[5]` becomes 1.
        *   `720` (digit 0): `cumulative_count[0]` is 1. `output[0] = 720`. `cumulative_count[0]` becomes 0.
        *   `436` (digit 6): `cumulative_count[6]` is 3. `output[2] = 436`. `cumulative_count[6]` becomes 2.
        *   `839` (digit 9): `cumulative_count[9]` is 7. `output[6] = 839`. `cumulative_count[9]` becomes 6.
        *   `657` (digit 7): `cumulative_count[7]` is 5. `output[4] = 657`. `cumulative_count[7]` becomes 4.
        *   `457` (digit 7): `cumulative_count[7]` is 4. `output[3] = 457`. `cumulative_count[7]` becomes 3.
        *   `329` (digit 9): `cumulative_count[9]` is 6. `output[5] = 329`. `cumulative_count[9]` becomes 5.
        `output = [720, 355, 436, 457, 657, 329, 839]`
    *   **Copy `output` back to `A`:**
        `A = [720, 355, 436, 457, 657, 329, 839]`

---

**Pass 2: Sort by Tens Digit (exp = 10)**

1.  **Extract tens digits:**
    *   `720` -> 2
    *   `355` -> 5
    *   `436` -> 3
    *   `457` -> 5
    *   `657` -> 5
    *   `329` -> 2
    *   `839` -> 3

2.  **Counting Sort steps:**
    *   **Initialize `count` array:** `[0,0,0,0,0,0,0,0,0,0]`
    *   **Populate `count` array:**
        *   `720` (2): `count[2]`=1
        *   `329` (2): `count[2]`=2
        *   `436` (3): `count[3]`=1
        *   `839` (3): `count[3]`=2
        *   `355` (5): `count[5]`=1
        *   `457` (5): `count[5]`=2
        *   `657` (5): `count[5]`=3
        `count = [0,0,2,2,0,3,0,0,0,0]`
    *   **Calculate cumulative `count` array:**
        `cumulative_count = [0,0,2,4,4,7,7,7,7,7]`
    *   **Build `output` array (size 7) by iterating `A` backward:**
        *   `839` (digit 3): `cumulative_count[3]` is 4. `output[3] = 839`. `cumulative_count[3]` becomes 3.
        *   `329` (digit 2): `cumulative_count[2]` is 2. `output[1] = 329`. `cumulative_count[2]` becomes 1.
        *   `657` (digit 5): `cumulative_count[5]` is 7. `output[6] = 657`. `cumulative_count[5]` becomes 6.
        *   `457` (digit 5): `cumulative_count[5]` is 6. `output[5] = 457`. `cumulative_count[5]` becomes 5.
        *   `436` (digit 3): `cumulative_count[3]` is 3. `output[2] = 436`. `cumulative_count[3]` becomes 2.
        *   `355` (digit 5): `cumulative_count[5]` is 5. `output[4] = 355`. `cumulative_count[5]` becomes 4.
        *   `720` (digit 2): `cumulative_count[2]` is 1. `output[0] = 720`. `cumulative_count[2]` becomes 0.
        `output = [720, 329, 436, 839, 355, 457, 657]`
    *   **Copy `output` back to `A`:**
        `A = [720, 329, 436, 839, 355, 457, 657]`

---

**Pass 3: Sort by Hundreds Digit (exp = 100)**

1.  **Extract hundreds digits:**
    *   `720` -> 7
    *   `329` -> 3
    *   `436` -> 4
    *   `839` -> 8
    *   `355` -> 3
    *   `457` -> 4
    *   `657` -> 6

2.  **Counting Sort steps:**
    *   **Initialize `count` array:** `[0,0,0,0,0,0,0,0,0,0]`
    *   **Populate `count` array:**
        *   `329` (3): `count[3]`=1
        *   `355` (3): `count[3]`=2
        *   `436` (4): `count[4]`=1
        *   `457` (4): `count[4]`=2
        *   `657` (6): `count[6]`=1
        *   `720` (7): `count[7]`=1
        *   `839` (8): `count[8]`=1
        `count = [0,0,0,2,2,0,1,1,1,0]`
    *   **Calculate cumulative `count` array:**
        `cumulative_count = [0,0,0,2,4,4,5,6,7,7]`
    *   **Build `output` array (size 7) by iterating `A` backward:**
        *   `657` (digit 6): `cumulative_count[6]` is 5. `output[4] = 657`. `cumulative_count[6]` becomes 4.
        *   `457` (digit 4): `cumulative_count[4]` is 4. `output[3] = 457`. `cumulative_count[4]` becomes 3.
        *   `355` (digit 3): `cumulative_count[3]` is 2. `output[1] = 355`. `cumulative_count[3]` becomes 1.
        *   `839` (digit 8): `cumulative_count[8]` is 7. `output[6] = 839`. `cumulative_count[8]` becomes 6.
        *   `436` (digit 4): `cumulative_count[4]` is 3. `output[2] = 436`. `cumulative_count[4]` becomes 2.
        *   `329` (digit 3): `cumulative_count[3]` is 1. `output[0] = 329`. `cumulative_count[3]` becomes 0.
        *   `720` (digit 7): `cumulative_count[7]` is 6. `output[5] = 720`. `cumulative_count[7]` becomes 5.
        `output = [329, 355, 436, 457, 657, 720, 839]`
    *   **Copy `output` back to `A`:**
        `A = [329, 355, 436, 457, 657, 720, 839]`

---

**Final Answer:**
$\boxed{[329, 355, 436, 457, 657, 720, 839]}$

**Reflection:** This example highlights the importance of stability when multiple numbers share the same digit in a particular pass. For instance, `457` and `657` both had '5' in the tens place. Because `457` came before `657` in the list after the units digit sort, the stable Counting Sort preserved that order for the tens digit pass. This is crucial for the final correctness.

### Example 3: Hard - Numbers with varying lengths and duplicates (explicit padding)

**Problem:** Sort the following list of numbers: `[17, 2, 100, 5, 20, 17, 10, 2]`

**Given:** An unsorted array of integers.
**Want:** A sorted array of integers.

**Maximum value:** 100. So, we consider all numbers as 3-digit numbers by padding with leading zeros (e.g., `2` becomes `002`, `17` becomes `017`).
**Maximum number of digits (d):** 3
**Base (k):** 10

**Initial List:** `A = [017, 002, 100, 005, 020, 017, 010, 002]`

---

**Pass 1: Sort by Units Digit (exp = 1)**

1.  **Extract units digits:** `7, 2, 0, 5, 0, 7, 0, 2`

2.  **Counting Sort steps:**
    *   `count = [0:3, 1:0, 2:2, 3:0, 4:0, 5:1, 6:0, 7:2, 8:0, 9:0]`
    *   `cumulative_count = [3,3,5,5,5,6,6,8,8,8]`
    *   **Build `output` (iterating `A` backward):**
        *   `002` (digit 2): `output[4] = 002`. `cumulative_count[2]` becomes 4.
        *   `010` (digit 0): `output[2] = 010`. `cumulative_count[0]` becomes 2.
        *   `017` (digit 7): `output[7] = 017`. `cumulative_count[7]` becomes 7.
        *   `020` (digit 0): `output[1] = 020`. `cumulative_count[0]` becomes 1.
        *   `005` (digit 5): `output[5] = 005`. `cumulative_count[5]` becomes 5.
        *   `100` (digit 0): `output[0] = 100`. `cumulative_count[0]` becomes 0.
        *   `002` (digit 2): `output[3] = 002`. `cumulative_count[2]` becomes 3.
        *   `017` (digit 7): `output[6] = 017`. `cumulative_count[7]` becomes 6.
        `output = [100, 020, 010, 002, 002, 005, 017, 017]`
    *   **Copy `output` back to `A`:**
        `A = [100, 020, 010, 002, 002, 005, 017, 017]`

---

**Pass 2: Sort by Tens Digit (exp = 10)**

1.  **Extract tens digits:** `0, 2, 1, 0, 0, 0, 1, 1`

2.  **Counting Sort steps:**
    *   `count = [0:4, 1:3, 2:1, 3:0, ...]`
    *   `cumulative_count = [4,7,8,8,8,8,8,8,8,8]`
    *   **Build `output` (iterating `A` backward):**
        *   `017` (digit 1): `output[6] = 017`. `cumulative_count[1]` becomes 6.
        *   `017` (digit 1): `output[5] = 017`. `cumulative_count[1]` becomes 5.
        *   `005` (digit 0): `output[3] = 005`. `cumulative_count[0]` becomes 3.
        *   `002` (digit 0): `output[2] = 002`. `cumulative_count[0]` becomes 2.
        *   `002` (digit 0): `output[1] = 002`. `cumulative_count[0]` becomes 1.
        *   `010` (digit 1): `output[4] = 010`. `cumulative_count[1]` becomes 4.
        *   `020` (digit 2): `output[7] = 020`. `cumulative_count[2]` becomes 7.
        *   `100` (digit 0): `output[0] = 100`. `cumulative_count[0]` becomes 0.
        `output = [100, 002, 002, 005, 010, 017, 017, 020]`
    *   **Copy `output` back to `A`:**
        `A = [100, 002, 002, 005, 010, 017, 017, 020]`

---

**Pass 3: Sort by Hundreds Digit (exp = 100)**

1.  **Extract hundreds digits:** `1, 0, 0, 0, 0, 0, 0, 0`

2.  **Counting Sort steps:**
    *   `count = [0:7, 1:1, 2:0, ...]`
    *   `cumulative_count = [7,8,8,8,8,8,8,8,8,8]`
    *   **Build `output` (iterating `A` backward):**
        *   `020` (digit 0): `output[6] = 020`. `cumulative_count[0]` becomes 6.
        *   `017` (digit 0): `output[5] = 017`. `cumulative_count[0]` becomes 5.
        *   `017` (digit 0): `output[4] = 017`. `cumulative_count[0]` becomes 4.
        *   `010` (digit 0): `output[3] = 010`. `cumulative_count[0]` becomes 3.
        *   