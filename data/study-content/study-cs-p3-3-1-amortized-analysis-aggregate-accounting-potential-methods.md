## 1. What it is — in plain English

Imagine you have a car. Most days, you just put gas in it, which is a small, regular expense. But every few months, your car needs a major service – new tires, oil change, maybe brake pads. That's a big, expensive job! If you only looked at the cost of that one big service, you'd think owning a car is incredibly expensive for that specific day.

Amortized analysis is like looking at the total cost of owning your car over a whole year, including all the gas and all the big services, and then dividing that total by the number of days you drove it. This gives you a more realistic "average daily cost" that smooths out the impact of those rare, expensive service days.

In computer science, some operations in a sequence might be very expensive, but they happen very rarely. When they do happen, they often set things up so that many subsequent operations become very cheap. Amortized analysis helps us understand the *overall* cost of a sequence of operations, rather than just focusing on the worst possible cost of a *single* operation. It’s about understanding the long-term cost, not just the peak short-term cost.

## 2. Why it matters — real-world applications

Amortized analysis is crucial for understanding the practical performance of many fundamental data structures and algorithms, especially when a worst-case analysis for a single operation might be misleadingly pessimistic.

1.  **Dynamic Arrays (e.g., `std::vector` in C++, `ArrayList` in Java):** When you add an element to a dynamic array and it runs out of space, the array needs to be reallocated to a larger size (often double its current capacity), and all existing elements are copied over. This single reallocation operation can be $O(N)$ where $N$ is the current number of elements. However, this expensive operation happens very rarely. Amortized analysis proves that a sequence of $M$ insertions actually takes $O(M)$ total time, meaning each insertion is $O(1)$ *on average* (amortized). This understanding is fundamental to why these structures are so efficient in practice.

2.  **Hash Tables (e.g., `std::unordered_map` in C++, `HashMap` in Java):** Similar to dynamic arrays, hash tables sometimes need to "rehash" or "resize" themselves when the load factor (number of elements / number of buckets) becomes too high. Rehashing involves creating a new, larger array of buckets and re-inserting all existing elements into the new buckets, which can be an $O(N)$ operation. Amortized analysis shows that, despite these occasional expensive rehashes, the average cost of an insertion or lookup operation over a sequence is $O(1)$ (assuming good hash functions).

3.  **Log-Structured Merge-trees (LSM-trees) in Databases:** Many modern NoSQL databases (like Apache Cassandra, RocksDB, Google's Bigtable) use LSM-trees for efficient writes. Writes are buffered in memory (a memtable) and then flushed to disk in sorted immutable files (SSTables). Periodically, these SSTables are merged together in a background process to reduce the number of files and improve read performance. These merge operations can be very expensive, consuming significant CPU and I/O. However, they are amortized over many small writes, ensuring that the *amortized* cost of a write operation remains very low, making LSM-trees excellent for write-heavy workloads. This is crucial for large-scale data storage in cloud computing and big data systems.

4.  **Garbage Collection Algorithms:** Some garbage collection strategies, particularly incremental or generational collectors, might have occasional "stop-the-world" pauses that are long and expensive. However, these pauses are infrequent, and the collector is designed to perform most of its work concurrently or in very short bursts, spreading the cost over the application's runtime. Amortized analysis can be used to analyze the overall overhead of garbage collection relative to the application's useful work.

## 3. Prerequisites — what you must know first

Before diving into amortized analysis, ensure you have a solid grasp of these fundamental concepts:

*   **Big O Notation ($O, \Omega, \Theta$):** Understanding how to express the upper bound, lower bound, and tight bound of an algorithm's running time or space complexity.
*   **Worst-Case Complexity:** The maximum running time an algorithm takes for any input of a given size.
*   **Average-Case Complexity:** The expected running time over all possible inputs of a given size, usually assuming a probability distribution of inputs.
*   **Data Structures:** Basic understanding of arrays, linked lists, stacks, queues, and how dynamic arrays (like `std::vector`) resize.
*   **Summation Notation ($\sum$):** How to work with sums, especially geometric series.
*   **Proof by Induction:** While not strictly mandatory for *all* amortized analyses, it's a powerful tool, especially for the aggregate method.

## 4. The core idea — step by step

Amortized analysis focuses on the total cost of a *sequence* of operations, rather than the cost of a single operation in isolation. It smooths out the cost, allowing us to say that the average cost per operation over a long sequence is low, even if some individual operations are very expensive.

Let's break down the core idea and the three primary methods for performing amortized analysis.

### Step 1: The Problem with Worst-Case Analysis for Sequences

*   **Plain English Statement:** Sometimes, the absolute worst thing that *could* happen during one operation is very bad, but it almost never happens, or it only happens because of many previous cheap operations. If we always assume the worst case for *every* operation in a sequence, our total cost estimate might be far too high and not reflect reality.
*   **Concrete Example:** Consider a dynamic array that doubles its capacity when full. A `push_back` operation usually takes $O(1)$ time. But if the array is full, `push_back` triggers a resize, copying all $N$ elements to a new array, taking $O(N)$ time. If we have $M$ `push_back` operations, and we just say "each `push_back` could be $O(N)$," then $M$ operations would be $M \times O(N) = O(MN)$. This is a massive overestimate, as resizing only happens occasionally.
*   **Formal/Mathematical Version:** If an operation $i$ has a worst-case cost $c_i^{worst}$, then a sequence of $M$ operations would have a total worst-case cost of $\sum_{i=1}^{M} c_i^{worst}$. If $c_i^{worst}$ is often $O(N)$ for a data structure of size $N$, this sum can be very large.
*   **What Could Go Wrong:** Overestimating performance. If you always assume the worst-case for every operation, you might prematurely discard an otherwise efficient algorithm or data structure.

### Step 2: The Intuition of Amortization – Expensive Operations "Pay for Themselves"

*   **Plain English Statement:** The rare, expensive operations aren't random; they are usually a consequence of many cheap operations that came before them. In a way, the cheap operations "save up" or "build up" the need for the expensive operation, and once the expensive operation is done, it provides a lot of "cheapness" for future operations.
*   **Concrete Example:** When our dynamic array resizes from capacity $N$ to $2N$, it costs $O(N)$ to copy elements. But this resize now allows for $N$ more *cheap* $O(1)$ insertions before another resize is needed. The $N$ previous $O(1)$ insertions "used up" the capacity, and the $O(N)$ resize "bought" $N$ new $O(1)$ slots.
*   **Formal/Mathematical Version:** We want to find an "amortized cost" $\hat{c}_i$ for each operation $i$ such that the total amortized cost $\sum_{i=1}^{M} \hat{c}_i$ is an upper bound on the actual total cost $\sum_{i=1}^{M} c_i$. That is, $\sum_{i=1}^{M} c_i \le \sum_{i=1}^{M} \hat{c}_i$. Ideally, $\hat{c}_i$ is much lower than $c_i^{worst}$.
*   **What Could Go Wrong:** Misunderstanding the "pay for themselves" principle. It's not about average-case probability; it's about structural properties and how operations interact.

### Step 3: Aggregate Method

*   **Plain English Statement:** This is the most straightforward method. We calculate the total actual cost of a sequence of $M$ operations and then divide by $M$ to get the average cost per operation.
*   **Concrete Example:** For the dynamic array, we add $M$ elements. Most are $O(1)$. Resizes happen at capacities $1, 2, 4, 8, \dots, 2^k$. The total cost of copying elements is $1+2+4+\dots+2^k \approx 2 \cdot 2^k$. If $M \approx 2^k$, the total cost is $O(M)$. So, the amortized cost per operation is $O(M)/M = O(1)$.
*   **Formal/Mathematical Version:**
    Let $c_i$ be the actual cost of the $i$-th operation.
    The total actual cost for a sequence of $M$ operations is $\sum_{i=1}^{M} c_i$.
    The amortized cost per operation is $\hat{c} = \frac{\sum_{i=1}^{M} c_i}{M}$.
*   **What Could Go Wrong:** This method requires analyzing the entire sequence of operations at once. It might not be easy to apply if the sequence of operations is not fixed or if the operations are complex and interact in non-obvious ways. It also doesn't provide a clear "reason" why the cost is amortized, just the result.

### Step 4: Accounting Method (or Banker's Method)

*   **Plain English Statement:** Imagine we have a bank account. We "charge" each operation a fixed "amortized cost" (our target average cost). If an operation is cheap, we deposit the "extra" money (credits) into the bank. If an operation is expensive, we withdraw money from the bank to cover the difference. The rule is: the bank account balance must never go negative. If we can always keep the balance non-negative, then the total amortized cost is an upper bound on the total actual cost.
*   **Concrete Example:** For the dynamic array, let's say the amortized cost of `push_back` is 3 "credits."
    *   When we `push_back` and the array is *not* full (cost 1), we use 1 credit and deposit $3-1=2$ credits into the bank.
    *   When we `push_back` and the array *is* full (cost $N$ for copying $N$ elements), we use 3 credits. We need $N-3$ more credits. We withdraw these from the bank. If the bank has enough credits from previous operations, we're good.
    We need to ensure that when a resize happens, the accumulated credits are sufficient.
*   **Formal/Mathematical Version:**
    Let $c_i$ be the actual cost of the $i$-th operation.
    Let $\hat{c}_i$ be the amortized cost of the $i$-th operation.
    We "pay" $\hat{c}_i$ for operation $i$. If $\hat{c}_i > c_i$, we store $\hat{c}_i - c_i$ credits. If $\hat{c}_i < c_i$, we use $c_i - \hat{c}_i$ credits from storage.
    The total credits stored after $M$ operations must be non-negative: $\sum_{i=1}^{M} (\hat{c}_i - c_i) \ge 0$.
    This implies $\sum_{i=1}^{M} \hat{c}_i \ge \sum_{i=1}^{M} c_i$.
*   **What Could Go Wrong:** Choosing the right amortized cost $\hat{c}_i$ and demonstrating that the credit balance never goes negative can be tricky. It requires careful tracking of how credits are accumulated and spent.

### Step 5: Potential Method (or Physicist's Method)

*   **Plain English Statement:** This is the most formal and often most elegant method. We define a "potential function" that maps the state of our data structure to a non-negative real number. Think of it like a spring: the more "stressed" the data structure is (e.g., a dynamic array getting full), the higher its potential energy. When an expensive operation occurs, it "releases" this potential energy, making the data structure less stressed. The amortized cost of an operation is its actual cost plus the change in potential.
*   **Concrete Example:** For the dynamic array, let $num$ be the number of elements and $cap$ be the capacity. We could define a potential function $\Phi(D) = 2 \cdot num - cap$ if $num > cap/2$, and $\Phi(D) = 0$ otherwise.
    *   When $num \le cap/2$, potential is 0.
    *   As $num$ increases beyond $cap/2$, potential increases.
    *   When `push_back` causes a resize (e.g., $num=cap$, new $cap' = 2 \cdot cap$), the potential drops significantly because $cap'$ is much larger relative to $num$. The drop in potential helps pay for the copy cost.
*   **Formal/Mathematical Version:**
    Let $D_0$ be the initial state of the data structure.
    Let $D_i$ be the state after the $i$-th operation.
    Let $c_i$ be the actual cost of the $i$-th operation.
    Define a potential function $\Phi(D)$ such that $\Phi(D) \ge 0$ for all states $D$, and $\Phi(D_0) = 0$.
    The amortized cost of the $i$-th operation is defined as:
    $$ \hat{c}_i = c_i + \Phi(D_i) - \Phi(D_{i-1}) $$
    The total amortized cost for $M$ operations is:
    $$ \sum_{i=1}^{M} \hat{c}_i = \sum_{i=1}^{M} (c_i + \Phi(D_i) - \Phi(D_{i-1})) $$
    This is a telescoping sum:
    $$ \sum_{i=1}^{M} \hat{c}_i = \sum_{i=1}^{M} c_i + \Phi(D_M) - \Phi(D_0) $$
    Since $\Phi(D_M) \ge 0$ and $\Phi(D_0) = 0$, we have $\sum_{i=1}^{M} \hat{c}_i \ge \sum_{i=1}^{M} c_i$.
    Thus, if we can show that $\hat{c}_i$ is small (e.g., $O(1)$), then the total actual cost is also bounded by $O(M)$ (or $M \cdot \hat{c}_i$).
*   **What Could Go Wrong:** Defining an appropriate potential function $\Phi(D)$ is often the most challenging part. It requires deep insight into the data structure's behavior. An incorrectly chosen potential function might not satisfy the non-negativity constraint or might not simplify the amortized cost analysis.

### Step 6: Choosing a Method

*   **Plain English Statement:** Which method should you use?
    *   **Aggregate** is often the easiest to apply if you can directly sum up the costs over a known sequence.
    *   **Accounting** provides good intuition by explicitly tracking "credits" and is useful when you want to assign a fixed amortized cost to each operation.
    *   **Potential** is the most powerful and general method, especially for complex data structures and when you need a rigorous proof. It's often preferred in advanced textbook analyses.
*   **Concrete Example:** For a simple dynamic array, all three methods work well. For something like a splay tree or a Fibonacci heap, the potential method is usually the only practical way to prove amortized bounds.
*   **Formal/Mathematical Version:** No specific formal version, but understanding the strengths of each method is key.
*   **What Could Go Wrong:** Sticking to a less suitable method out of habit. Sometimes, one method is significantly easier to apply or yields a clearer proof than others for a given problem.

## 5. Worked examples — multiple, with every step shown

### Example 1: Dynamic Array - Aggregate Method

**Problem:** Analyze the amortized time complexity of $M$ `push_back` operations on a dynamic array that starts with capacity 1 and doubles its capacity when it becomes full.

**Given:**
*   Initial capacity: $C_0 = 1$.
*   Operation: `push_back`.
*   Resizing strategy: When array is full, create a new array of $2 \times \text{current capacity}$, copy all elements, then add the new element.
*   Number of operations: $M$.

**We want:** The amortized cost per `push_back` operation.

**Solution:**

1.  **Identify the cost of a single `push_back` operation:**
    *   If the array is *not* full, adding an element takes $O(1)$ time (just placing it in the next available slot).
    *   If the array *is* full, it requires:
        1.  Allocating a new array of double the current capacity.
        2.  Copying all existing $k$ elements from the old array to the new array. This costs $O(k)$ time.
        3.  Adding the new element. This costs $O(1)$ time.
        So, a resize operation costs $O(k)$, where $k$ is the number of elements being copied.

2.  **Analyze the total cost for $M$ `push_back` operations:**
    Let's track the actual costs. The array's capacity will follow a sequence like $1, 2, 4, 8, \dots, 2^k$.
    A resize happens when the array becomes full at capacities $1, 2, 4, \dots, 2^k$.
    *   The 1st element costs 1 (no resize).
    *   The 2nd element costs $1+1=2$ (resize from 1 to 2, copy 1 element, then add 1).
    *   The 3rd element costs 1.
    *   The 4th element costs $1+2=3$ (resize from 2 to 4, copy 2 elements, then add 1).
    *   The 5th, 6th, 7th elements cost 1 each.
    *   The 8th element costs $1+4=5$ (resize from 4 to 8, copy 4 elements, then add 1).

    The total cost for $M$ operations is the sum of costs for all individual element insertions.
    Let $c_i$ be the actual cost of the $i$-th `push_back` operation.
    The total cost $\sum_{i=1}^{M} c_i$ consists of two parts:
    *   $M$ basic insertions (each costs 1 unit of time): $M \times 1 = M$.
    *   Costs due to resizing. Resizing occurs when the number of elements reaches a power of 2: $1, 2, 4, \dots, 2^k$, where $2^k < M \le 2^{k+1}$.
        The costs for copying elements during resizes are:
        $1$ (when capacity goes from 1 to 2)
        $+ 2$ (when capacity goes from 2 to 4)
        $+ 4$ (when capacity goes from 4 to 8)
        $\dots$
        $+ 2^j$ (when capacity goes from $2^j$ to $2^{j+1}$)
        The last resize occurs when the array has $2^k$ elements, and its capacity becomes $2^{k+1}$.
        The sum of these copying costs is $1 + 2 + 4 + \dots + 2^k$.
        This is a geometric series sum: $2^{k+1} - 1$.
        Since $M$ elements have been inserted, the final capacity is $2^{k+1}$ (or less, if $M$ is not exactly a power of 2). So, $2^k < M \le 2^{k+1}$.
        Thus, the total copying cost is less than $2M$.

3.  **Calculate the total actual cost:**
    $$ \text{Total Cost} = (\text{Cost of } M \text{ insertions}) + (\text{Cost of all copies}) $$
    $$ \text{Total Cost} = M \cdot O(1) + \sum_{j=0}^{k} 2^j $$
    $$ \text{Total Cost} = M + (2^{k+1} - 1) $$
    Since $M \le 2^{k+1} < 2M$, we know that $2^{k+1} - 1 < 2M$.
    Therefore,
    $$ \text{Total Cost} < M + 2M - 1 $$
    $$ \text{Total Cost} < 3M - 1 $$
    So, the total cost for $M$ operations is $O(M)$.

4.  **Calculate the amortized cost per operation:**
    $$ \text{Amortized Cost per operation} = \frac{\text{Total Cost}}{M} $$
    $$ \text{Amortized Cost per operation} = \frac{O(M)}{M} $$
    $$ \text{Amortized Cost per operation} = \mathbf{O(1)} $$

**Reflection:** The key insight here is that while individual resizes are expensive ($O(N)$), they are infrequent. The sum of all copy operations over a long sequence of insertions is still proportional to the total number of insertions, not the square of it.

### Example 2: Dynamic Array - Accounting Method

**Problem:** Analyze the amortized time complexity of $M$ `push_back` operations on a dynamic array that starts with capacity 1 and doubles its capacity when it becomes full, using the Accounting Method.

**Given:** Same as Example 1.
**We want:** The amortized cost per `push_back` operation using credits.

**Solution:**

1.  **Define the amortized cost $\hat{c}_i$ for each `push_back` operation:**
    Let's propose an amortized cost of $\hat{c}_i = 3$ units (credits) for each `push_back` operation. We need to show that these credits are sufficient to cover all actual costs without going into debt.

2.  **Track credits for each type of `push_back` operation:**
    Let `num_elements` be the current number of elements and `capacity` be the current capacity.
    *   **Case 1: `push_back` when `num_elements < capacity` (no resize).**
        *   Actual cost $c_i = 1$ (for placing the new element).
        *   Credits "paid" = 3.
        *   Credits saved = $\hat{c}_i - c_i = 3 - 1 = 2$ credits.
        These 2 credits are stored in our "bank."

    *   **Case 2: `push_back` when `num_elements = capacity` (resize required).**
        *   Actual cost $c_i = (\text{current number of elements}) + 1$. Let $k$ be the number of elements *before* this `push_back`. So, the actual cost is $k+1$ (copy $k$ elements, then place the new one).
        *   Credits "paid" = 3.
        *   Credits needed from bank = $c_i - \hat{c}_i = (k+1) - 3$.

3.  **Demonstrate that the bank balance never goes negative:**
    Let's assign the 2 credits saved from Case 1 operations as follows:
    *   1 credit pays for the actual $O(1)$ insertion cost of the current operation.
    *   1 credit is saved to pay for copying an element *from the old array to the new array* during a future resize.
    *   1 credit is saved to pay for copying an element *from the old array to the new array* during a future resize, *for the element that will occupy the second half of the new array*. (This is the trickiest part of the accounting method; let's refine.)

    A more common credit assignment for dynamic arrays:
    *   When an element is inserted into a non-full array (cost 1):
        *   1 credit pays for the actual insertion.
        *   1 credit is stored *with the element itself* to pay for its future copying during a resize.
        *   1 credit is stored *with the element itself* to pay for the future copying of another element that will be inserted into the *newly available half* of the array after a resize. (This is the tricky bit, let's simplify).

    Let's simplify the credit allocation: Each `push_back` operation pays 3 credits.
    *   1 credit pays for the actual insertion of the new element.
    *   2 credits are saved. These 2 credits are specifically for paying for the copying of elements during a resize.

    Consider an array with capacity $k$. When it's full and we insert the $(k+1)$-th element, a resize happens. The new capacity becomes $2k$.
    The actual cost of this operation is $k$ (for copying $k$ existing elements) + $1$ (for inserting the new element) = $k+1$.
    The credits available to cover this cost come from two sources:
    1.  The 3 credits paid by the current $(k+1)$-th `push_back` operation.
    2.  The credits saved from the previous $k$ `push_back` operations. Each of these $k$ operations was a non-resizing insert (except possibly the first one). Let's assume they all saved 2 credits each for copying. So, $k \times 2$ credits are saved.

    Total credits available when a resize happens for $k$ elements:
    *   Credits from the current operation: 3
    *   Credits saved from previous $k-1$ operations (each saved 2 credits): $(k-1) \times 2$
    *   Total credits available: $3 + 2(k-1) = 3 + 2k - 2 = 2k + 1$.

    The actual cost of the resize (copy $k$ elements) plus the current insertion (1 element) is $k+1$.
    We have $2k+1$ credits available. We need $k+1$ credits.
    Since $2k+1 \ge k+1$ for $k \ge 0$, we always have enough credits.
    Specifically, we use $k+1$ credits for the actual work.
    We are left with $(2k+1) - (k+1) = k$ credits. These credits are "left over" and can be thought of as paying for future elements in the new, larger array.

    Let's re-evaluate the credit distribution to be more precise:
    *   Assign $\hat{c}_i = 3$ as the amortized cost for `push_back`.
    *   When an element is inserted into a non-full array:
        *   Actual cost $c_i = 1$.
        *   We pay 3 credits. 1 credit covers $c_i$. The remaining 2 credits are stored.
        *   These 2 credits are "attached" to the element just inserted. One credit will pay for this element to be copied during the next resize. The other credit will pay for some other element to be copied.
    *   When an element is inserted into a full array (capacity $k$, $k$ elements):
        *   Actual cost $c_i = k+1$ (copy $k$ elements, insert 1 new element).
        *   We need $k+1$ credits.
        *   The current operation pays 3 credits.
        *   The other $k$ existing elements each carry 1 credit from their insertion (total $k$ credits).
        *   Total available credits: $3 + k$.
        *   We need to pay $k+1$. We have $k+3$ credits.
        *   This covers the cost. $k+3 - (k+1) = 2$ credits are left over. These 2 credits are attached to the newly inserted element for future resizes.

    Since we always have enough credits (the balance never goes negative), the total amortized cost is the sum of the amortized costs of each operation.
    $$ \sum_{i=1}^{M} \hat{c}_i = \sum_{i=1}^{M} 3 = 3M $$
    Since $\sum_{i=1}^{M} c_i \le \sum_{i=1}^{M} \hat{c}_i$, the total actual cost is $O(M)$.

4.  **Calculate the amortized cost per operation:**
    $$ \text{Amortized Cost per operation} = \frac{\text{Total Amortized Cost}}{M} $$
    $$ \text{Amortized Cost per operation} = \frac{3M}{M} $$
    $$ \text{Amortized Cost per operation} = \mathbf{O(1)} $$

**Reflection:** The accounting method makes the "paying for themselves" idea explicit by tracking credits. The choice of 3 credits is arbitrary but works. If we chose 2, it would fail. If we chose 4, it would also work but be less tight. The key is to ensure the credits are sufficient at every point.

### Example 3: Dynamic Array - Potential Method

**Problem:** Analyze the amortized time complexity of $M$ `push_back` operations on a dynamic array that starts with capacity 1 and doubles its capacity when it becomes full, using the Potential Method.

**Given:** Same as Example 1.
**We want:** The amortized cost per `push_back` operation using a potential function.

**Solution:**

1.  **Define a potential function $\Phi(D)$:**
    Let $num$ be the number of elements in the array and $cap$ be its current capacity.
    We propose the potential function:
    $$ \Phi(D) = \begin{cases} 2 \cdot num - cap & \text{if } num > cap/2 \\ 0 & \text{if } num \le cap/2 \end{cases} $$
    *   **Initial state:** $D_0$: $num=0, cap=1$. $\Phi(D_0) = 0$ since $0 \le 1/2$.
    *   **Properties:** $\Phi(D) \ge 0$ always. When $num > cap/2$, $2 \cdot num > cap$, so $2 \cdot num - cap > 0$.

2.  **Analyze the amortized cost $\hat{c}_i = c_i + \Phi(D_i) - \Phi(D_{i-1})$ for two cases:**

    *   **Case 1: `push_back` when `num < cap` (no resize).**
        Let $num_{prev}$ and $cap_{prev}$ be the state before the operation.
        Let $num_{curr} = num_{prev} + 1$ and $cap_{curr} = cap_{prev}$ be the state after.
        Actual cost $c_i = 1$.

        *   **Subcase 1a: $num_{prev} < cap_{prev}/2$ and $num_{curr} \le cap_{curr}/2$.**
            (e.g., $num_{prev}=0, cap_{prev}=1 \implies num_{curr}=1, cap_{curr}=1$. Here $num_{curr} > cap_{curr}/2$)
            Let's adjust the example. $num_{prev}=1, cap_{prev}=4 \implies num_{curr}=2, cap_{curr}=4$. $\Phi(D_{prev})=0, \Phi(D_{curr})=0$.
            $$ \hat{c}_i = c_i + \Phi(D_{curr}) - \Phi(D_{prev}) = 1 + 0 - 0 = 1 $$

        *   **Subcase 1b: $num_{prev} < cap_{prev}/2$ and $num_{curr} > cap_{curr}/2$.**
            (e.g., $num_{prev}=1, cap_{prev}=2 \implies num_{curr}=2, cap_{curr}=2$. Here $num_{prev}=1 \le 2/2$, $num_{curr}=2 > 2/2$. So $\Phi(D_{prev})=0$, $\Phi(D_{curr}) = 2 \cdot 2 - 2 = 2$.)
            $$ \hat{c}_i = c_i + \Phi(D_{curr}) - \Phi(D_{prev}) = 1 + (2 \cdot num_{curr} - cap_{curr}) - 0 $$
            Since $num_{curr} = cap_{curr}/2 + 1$ (if it just crossed the threshold), then $2 \cdot num_{curr} - cap_{curr} = 2(cap_{curr}/2 + 1) - cap_{curr} = cap_{curr} + 2 - cap_{curr} = 2$.
            So, $\hat{c}_i = 1 + 2 = 3$.

        *   **Subcase 1c: $num_{prev} > cap_{prev}/2$ and $num_{curr} > cap_{curr}/2$.**
            (e.g., $num_{prev}=2, cap_{prev}=2 \implies num_{curr}=3, cap_{curr}=4$. Oh, this is a resize case. Let's use $num_{prev}=3, cap_{prev}=4 \implies num_{curr}=4, cap_{curr}=4$. Here $num_{prev}=3 > 4/2$, $num_{curr}=4 > 4/2$.)
            $$ \Phi(D_{prev}) = 2 \cdot num_{prev} - cap_{prev} $$
            $$ \Phi(D_{curr}) = 2 \cdot num_{curr} - cap_{curr} $$
            $$ \hat{c}_i = c_i + (2 \cdot num_{curr} - cap_{curr}) - (2 \cdot num_{prev} - cap_{prev}) $$
            Since $c_i = 1$ and $cap_{curr} = cap_{prev}$, and $num_{curr} = num_{prev} + 1$:
            $$ \hat{c}_i = 1 + (2(num_{prev}+1) - cap_{prev}) - (2 \cdot num_{prev} - cap_{prev}) $$
            $$ \hat{c}_i = 1 + (2 \cdot num_{prev} + 2 - cap_{prev} - 2 \cdot num_{prev} + cap_{prev}) $$
            $$ \hat{c}_i = 1 + 2 = 3 $$
        In all non-resizing cases, the amortized cost is $O(1)$ (specifically, 1 or 3).

    *   **Case 2: `push_back` when `num = cap` (resize required).**
        Let $num_{prev} = cap_{prev}$. (So $num_{prev} > cap_{prev}/2$ is always true for $cap_{prev} \ge 1$).
        The array capacity doubles: $cap_{curr} = 2 \cdot cap_{prev}$.
        The number of elements becomes $num_{curr} = num_{prev} + 1$.
        Actual cost $c_i = num_{prev} + 1$ (copy $num_{prev}$ elements, insert 1 new element).

        Let's calculate the potential change:
        $$ \Phi(D_{prev}) = 2 \cdot num_{prev} - cap_{prev} $$
        Since $num_{prev} = cap_{prev}$, this simplifies to $\Phi(D_{prev}) = 2 \cdot cap_{prev} - cap_{prev} = cap_{prev}$.

        After the operation, $num_{curr} = cap_{prev} + 1$. The new capacity is $cap_{curr} = 2 \cdot cap_{prev}$.
        Now we check if $num_{curr} > cap_{curr}/2$:
        $cap_{prev} + 1 > (2 \cdot cap_{prev})/2 \implies cap_{prev} + 1 > cap_{prev}$. This is always true.
        So, $\Phi(D_{curr}) = 2 \cdot num_{curr} - cap_{curr} = 2(cap_{prev} + 1) - 2 \cdot cap_{prev}$
        $$ \Phi(D_{curr}) = 2 \cdot cap_{prev} + 2 - 2 \cdot cap_{prev} = 2 $$

        Now, calculate the amortized cost:
        $$ \hat{c}_i = c_i + \Phi(D_{curr}) - \Phi(D_{prev}) $$
        $$ \hat{c}_i = (num_{prev} + 1) + 2 - cap_{prev} $$
        Since $num_{prev} = cap_{prev}$:
        $$ \hat{c}_i = (cap_{prev} + 1) + 2 - cap_{prev} $$
        $$ \hat{c}_i = 1 + 2 = 3 $$

3.  **Conclusion:**
    In all cases (resizing or not), the amortized cost $\hat{c}_i$ for a single `push_back` operation is at most 3.
    Since the amortized cost for each operation is $O(1)$, the total amortized cost for $M$ operations is $O(M)$.
    And since $\sum_{i=1}^{M} c_i \le \sum_{i=1}^{M} \hat{c}_i$, the total actual cost for $M$ operations is $O(M)$.

4.  **Calculate the amortized cost per operation:**
    $$ \text{Amortized Cost per operation} = \frac{\text{Total Amortized Cost}}{M} $$
    $$ \text{Amortized Cost per operation} = \frac{O(M)}{M} $$
    $$ \text{Amortized Cost per operation} = \mathbf{O(1)} $$

**Reflection:** The potential method is powerful because it formalizes the "stress" on the data structure. The choice of $\Phi(D)$ is critical; it must capture the state transitions effectively. Here, the potential builds up as the array fills and is "released" during a resize, paying for the copying.

### Example 4: Binary Counter Increment

**Problem:** Analyze the amortized time complexity of $M$ `INCREMENT` operations on a binary counter that starts at 0. An `INCREMENT` operation flips bits from 0 to 1, or 1 to 0. The cost of an `INCREMENT` is the number of bits flipped.

**Given:**
*   A binary counter, initially 0.
*   Operation: `INCREMENT`.
*   Cost: Number of bits flipped.
*   Number of operations: $M$.

**We want:** The amortized cost per `INCREMENT` operation.

**Solution (using Potential Method):**

1.  **Define a potential function $\Phi(D)$:**
    Let $k$ be the number of 1s in the binary representation of the counter.
    We propose the potential function: $\Phi(D) = k$.
    *   **Initial state:** $D_0$: counter is 0, so $k=0$. $\Phi(D_0) = 0$.
    *   **Properties:** $\Phi(D) \ge 0$ always.

2.  **Analyze the amortized cost $\hat{c}_i = c_i + \Phi(D_i) - \Phi(D_{i-1})$ for an `INCREMENT` operation:**

    Consider an `INCREMENT` operation. Let the counter value change from $x$ to $x+1$.
    Let $k_{prev}$ be the number of 1s in $x$.
    Let $k_{curr}$ be the number of 1s in $x+1$.

    When we increment a binary number, we find the rightmost 0-bit. All 1-bits to its right are flipped to 0, and the rightmost 0-bit is flipped to 1.
    Example: $011011 \xrightarrow{\text{increment}} 011100$
    *   Original: `...X011...1` (let there be $j$ ones after the rightmost zero)
    *   New: `...X100...0`

    Let $j$ be the number of 1s that are flipped to 0. These are the bits from the rightmost position up to (but not including) the rightmost 0.
    The rightmost 0-bit is flipped to 1. This is 1 bit.
    So, the actual cost $c_i = j+1$ (number of bits flipped).

    Now, let's analyze the change in potential: $\Phi(D_{curr}) - \Phi(D_{prev}) = k_{curr} - k_{prev}$.
    *   The $j$ bits that were 1 are now 0. This decreases the count of 1s by $j$.
    *   The one bit that was 0 is now 1. This increases the count of 1s by 1.
    *   All other bits remain unchanged.
    Therefore, the change in the number of 1s is $k_{curr} - k_{prev} = 1 - j$.

    Now, substitute these into the amortized cost formula:
    $$ \hat{c}_i = c_i + \Phi(D_{curr}) - \Phi(D_{prev}) $$
    $$ \hat{c}_i = (j+1) + (1-j) $$
    $$ \hat{c}_i = j+1+1-j $$
    $$ \hat{c}_i = 2 $$

3.  **Conclusion:**
    The amortized cost $\hat{c}_i$ for a single `INCREMENT` operation is 2.
    Since the amortized cost for each operation is $O(1)$, the total amortized cost for $M$ operations is $O(M)$.
    And since $\sum_{i=1}^{M} c_i \le \sum_{i=1}^{M} \hat{c}_i$, the total actual cost for $M$ operations is $O(M)$.

4.  **Calculate the amortized cost per operation:**
    $$ \text{Amortized Cost per operation} = \frac{\text{Total Amortized Cost}}{M} $$
    $$ \text{Amortized Cost per operation} = \frac{O(M)}{M} $$
    $$ \text{Amortized Cost per operation} = \mathbf{O(1)} $$

**Reflection:** This example beautifully illustrates how the potential method works. An expensive `INCREMENT` (flipping many 1s to 0s) causes a large decrease in potential, which helps pay for the actual cost. A cheap `INCREMENT` (flipping just a 0 to 1) causes a small increase in potential, storing "energy" for future expensive operations. The number of 1s in the counter is an excellent measure of its "stress" or "potential."

## 6. Common mistakes and traps

1.  **Confusing Amortized Analysis with Average-Case Analysis:**
    *   **Trap:** Assuming "amortized" means "average over random inputs."
    *   **Why it happens:** Both involve "average" behavior.
    *   **Correction:** Amortized analysis considers the average cost over a *sequence* of operations, where the sequence is *chosen adversarially* (worst possible sequence), but the expensive operations are offset by a structural guarantee or "credit" system. Average-case analysis, however, relies on a *probability distribution* of inputs or operations. Amortized guarantees hold for *any* sequence of operations, not just average ones.

2.  **Incorrectly Defining the Potential Function ($\Phi(D)$):**
    *   **Trap:** Choosing a $\Phi(D)$ that doesn't satisfy $\Phi(D) \ge 0$ or $\Phi(D_0)=0$, or one that doesn't simplify the amortized cost effectively.
    *   **Why it happens:** The potential function can seem abstract. It requires deep insight into how the data structure's "stress" changes.
    *   **Correction:** Always verify that $\Phi(D) \ge 0$ for all reachable states and $\Phi(D_0)=0$ (or at least $\Phi(D_0)$ is a constant that can be absorbed). The potential function should ideally increase before expensive operations and decrease during them.

3.  **Not Accounting for All Costs or Initial State:**
    *   **Trap:** Missing a small but recurring cost in the aggregate method, or not properly initializing credits/potential.
    *   **Why it happens:** Overlooking edge cases or the first few operations.
    *   **Correction:** Be meticulous. For accounting, ensure the initial credit balance is sufficient or $\Phi(D_0)$ is set correctly. For aggregate, ensure all types of operations in the sequence, including initial setup, are considered.

4.  **Applying Amortized Analysis Where Worst-Case Per Operation is Critical:**
    *   **Trap:** Using amortized bounds for real-time systems where individual operation latency cannot exceed a strict deadline.
    *   **Why it happens:** Amortized analysis gives a good overall picture but hides individual expensive operations.
    *   **Correction:** Amortized bounds are not suitable for systems with hard real-time constraints where *every* operation must complete within a guaranteed worst-case time. For such systems, strict worst-case analysis per operation is required.

5.  **Incorrectly Summing Costs in the Aggregate Method:**
    *   **Trap:** Mistakes in calculating the sum of costs for resizing operations (e.g., in dynamic arrays, summing $N$ times instead of $1+2+4+\dots$).
    *   **Why it happens:** Errors in geometric series sums or misidentifying when expensive operations occur.
    *   **Correction:** Clearly identify the pattern of expensive operations and their costs. Use correct summation formulas. Often, the total cost of resizing is approximately twice the size of the final array.

6.  **Misinterpreting Credits in the Accounting Method:**
    *   **Trap:** Not being clear about *what* the credits are paying for, or how they are distributed and consumed.
    *   **Why it happens:** The "bank account" analogy can be vague if not rigorously applied.
    *   **Correction:** Explicitly state how many credits each operation "pays," how many are "spent" on its immediate cost, and how many are "saved" (and for what future cost). Ensure the credit balance never drops below zero.

## 7. Textbook-precise explanation

Amortized analysis is a method for analyzing the time or space complexity of algorithms that perform a sequence of operations. Unlike worst-case analysis, which focuses on the maximum cost of any single operation, or average-case analysis, which relies on a probability distribution of inputs, amortized analysis guarantees the average performance of each operation *over a sequence of operations*. This guarantee holds for *any* sequence of operations.

Let $c_i$ be the actual cost of the $i$-th operation in a sequence of $M$ operations. We seek to define an amortized cost $\hat{c}_i$ for each operation such that the total amortized cost is an upper bound on the total actual cost. That is, $\sum_{i=1}^{M} c_i \le \sum_{i=1}^{M} \hat{c}_i$. If we can show that each $\hat{c}_i$ is small (e.g., $O(1)$), then the total actual cost for $M$ operations is $O(M)$.

### Aggregate Method

The aggregate method directly computes the total actual cost for a sequence of $M$ operations, $\sum_{i=1}^{M} c_i$. The amortized cost per operation is then defined as the total cost divided by the number of operations:
$$ \hat{c} = \frac{\sum_{i=1}^{M} c_i}{M} $$
This method is effective when the total cost can be easily bounded, often by identifying the cumulative effect of expensive operations.

### Accounting Method (Banker's Method)

The accounting method assigns an amortized cost $\hat{c}_i$ to each operation $i$. If $\hat{c}_i > c_i$, the difference $\hat{c}_i - c_i$ is "saved" as credits. If $\hat{c}_i < c_i$, the difference $c_i - \hat{c}_i$ is "paid" by drawing from previously saved credits. The fundamental requirement is that the total number of credits must never become negative throughout the sequence of operations.
Let $B_j$ be the total credits accumulated after $j$ operations. We must ensure $B_j \ge 0$ for all $j=1, \dots, M$.
The total amortized cost for $M$ operations is $\sum_{i=1}^{M} \hat{c}_i$.
The total actual cost is $\sum_{i=1}^{M} c_i$.
By definition of credits, $B_M = B_0 + \sum_{i=1}^{M} (\hat{c}_i - c_i)$. If $B_0=0$ and $B_M \ge 0$, then $\sum_{i=1}^{M} (\hat{c}_i - c_i) \ge 0$, which implies $\sum_{i=1}^{M} \hat{c}_i \ge \sum_{i=1}^{M} c_i$.

### Potential Method (Physicist's Method)

The potential method is the most general and often the most elegant. It defines a potential function $\Phi(D)$ that maps the state $D$ of the data structure to a non-negative real number. This function represents the "potential energy" stored in the data structure.
Let $D_0$ be the initial state and $D_i$ be the state after the $i$-th operation. We require $\Phi(D_i) \ge 0$ for all states $D_i$, and typically $\Phi(D_0)=0$.
The amortized cost $\hat{c}_i$ of the $i$-th operation is defined as its actual cost $c_i$ plus the change in potential:
$$ \hat{c}_i = c_i + \Phi(D_i) - \Phi(D_{i-1}) $$
The total amortized cost for a sequence of $M$ operations is:
$$ \sum_{i=1}^{M} \hat{c}_i = \sum_{i=1}^{M} (c_i + \Phi(D_i) - \Phi(D_{i-1})) $$
This is a telescoping sum:
$$ \sum_{i=1}^{M} \hat{c}_i = \sum_{i=1}^{M} c_i + \Phi(D_M) - \Phi(D_0) $$
Since $\Phi(D_M) \ge 0$ and $\Phi(D_0)=0$, it follows that $\sum_{i=1}^{M} \hat{c}_i \ge \sum_{i=1}^{M} c_i$.
Therefore, if we can show that each $\hat{c}_i$ is bounded by a constant (e.g., $O(1)$), then the total actual cost for the sequence is bounded by $O(M)$.

**Reference:** For a comprehensive and rigorous treatment of amortized analysis, refer to *Introduction to Algorithms* by Cormen, Leiserson, Rivest, and Stein (CLRS), 4th Edition, Chapter 17, "Amortized Analysis."

## 8. ASCII diagrams

Here's an ASCII diagram illustrating the dynamic array resizing process, which is a classic example for amortized analysis.

```text
Scenario: Dynamic Array (vector) 'push_back' operations

Initial State:
Array: [ ]
Size:  0
Capacity: 1
Potential: 0 (since num=0 <= cap/2=0.5)

1. push_back(A):
   Array: [A]
   Size:  1
   Capacity: 1
   Actual Cost: 1 (place A)
   Potential: 2*1 - 1 = 1 (since num=1 > cap/2=0.5)
   Amortized Cost: 1 + (1 - 0) = 2

2. push_back(B): (Array is full, requires resize)
   a. Allocate new array (double capacity):
      Old Array: [A]
      New Array: [ ][ ] (Capacity 2)

   b. Copy elements:
      Old Array: [A]
      New Array: [A][ ]
      Cost for copying: 1 (copy A)

   c. Place new element:
      New Array: [A][B]
      Cost for placing B: 1
   Actual Cost: 1 (copy A) + 1 (place B) = 2
   Size:  2
   Capacity: 2
   Potential: 2*2 - 2 = 2 (since num=2 > cap/2=1)
   Amortized Cost: 2 + (2 - 1) = 3

3. push_back(C):
   Array: [A][B][C]
   Size:  3
   Capacity: 4 (new capacity after previous resize)
   Actual Cost: 1
   Potential: 2*3 - 4 = 2 (since num=3 > cap/2=2)
   Amortized Cost: 1 + (2 - 2) = 1

4. push_back(D):
   Array: [A][B][C][D]
   Size:  4
   Capacity: 4
   Actual Cost: 1
   Potential: 2*4 - 4 = 4 (since num=4 > cap/2=2)
   Amortized Cost: 1 + (4 - 2) = 3

5. push_back(E): (Array is full, requires resize)
   a. Allocate new array (double capacity):
      Old Array: [A][B][C][D]
      New Array: [ ][ ][ ][ ][ ][ ][ ][ ] (Capacity 8)

   b. Copy elements:
      New Array: [A][B][C][D][ ][ ][ ][ ]
      Cost for copying: 4

   c. Place new element:
      New Array: [A][B][C][D][E][ ][ ][ ]
      Cost for placing E: 1
   Actual Cost: 4 (copy) + 1 (place E) = 5
   Size:  5
   Capacity: 8
   Potential: 2*5 - 8 = 2 (since num=5 > cap/2=4)
   Amortized Cost: 5 + (2 - 4) = 3
```

This diagram visually demonstrates how the potential builds up (e.g., from step 3 to 4, potential increases from 2 to 4) and then is "spent" during a resize (e.g., from step 4 to 5, potential drops from 4 to 2, helping to offset the actual cost of 5). The amortized cost for each operation remains small and constant.

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Think of "AMP" for **A**ggregate, **M**aintain (Accounting), **P**otential.
    Or, use the nicknames: "Aggregate sums it up," "Banker (Accounting) uses credits," "Physicist (Potential) uses energy."
    Visualize a **spring**: As a data structure gets "stressed" (e.g., a dynamic array getting full), the spring compresses, building up **potential energy**. When the expensive operation happens (e.g., resize), the spring *releases* its energy, helping to pay for the cost, and the data structure becomes "relaxed" again.

2.  **Formulas/Facts to Overlearn:**
    *   **Amortized Cost Definition (Potential Method):** $\hat{c}_i = c_i + \Phi(D_i) - \Phi(D_{i-1})$
    *   **Total Amortized vs. Total Actual:** $\sum_{i=1}^{M} c_i \le \sum_{i=1}^{M} \hat{c}_i$ (given $\Phi(D_0)=0, \Phi(D_M) \ge 0$).
    *   **Dynamic Array `push_back` Amortized Cost:** $O(1)$. This is the canonical example.

3.  **Spaced-Repetition Schedule:**
    *   **Review 1:** Immediately after this lesson (today).
    *   **Review 2:** In 1 day.
    *   **Review 3:** In 3 days.
    *   **Review 4:** In 7 days.
    *   **Review 5:** In 16 days.
    *   **Review 6:** In 35 days.
    *   For each review, try to explain all three methods in your own words, and work through the dynamic array example with one of the methods.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the specific formulas or methods, always start from the core idea:
    *   **Problem:** A single operation might be very expensive, but it's rare. If we assume worst-case for every operation, we overestimate total cost.
    *   **Insight:** These rare, expensive operations are often triggered by many preceding cheap operations, and they set up the data structure for many future cheap operations. They "pay for themselves" over the long run.
    *   **Goal:** Find an "average" cost per operation over a sequence that is a true upper bound on the actual average cost.
    *   **Aggregate:** "Just sum everything up and divide." This is the most direct way to get the average.
    *   **Accounting:** "Let's assign a fixed price (amortized cost) to each operation. If it's cheap, save the change as credits. If it's expensive, use saved credits. The bank account must never go negative." This makes the "paying for themselves" explicit.
    *   **Potential:** "Let's define a 'stress' level (potential) for the data structure. Cheap operations increase stress/potential. Expensive operations relieve stress/potential. The change in stress helps pay for the actual work." This is the most formal way to model the "paying for themselves" idea.

## 10. Connections — what this leads to

Amortized analysis is a foundational technique that unlocks the understanding and design of many advanced data structures and algorithms:

*   **Advanced Data Structures:**
    *   **Splay Trees:** These self-adjusting binary search trees have $O(\log N)$ amortized time for all operations (search, insert, delete). Their worst-case for a single operation can be $O(N)$, but the splay operation ensures good amortized