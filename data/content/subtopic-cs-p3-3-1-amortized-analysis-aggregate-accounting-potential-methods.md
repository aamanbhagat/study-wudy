## What it is
Amortized analysis gives the average cost of an operation in a sequence, when that sequence contains a few very expensive operations alongside many cheap ones. It is not an average-case analysis, which depends on probability; it is a worst-case guarantee for the *entire sequence* of operations, effectively spreading the cost of rare, expensive events over the more frequent, cheap ones.

## Why it matters
This concept is fundamental to proving the efficiency of common data structures like Python's `list`, C++'s `std::vector`, and hash tables, which all perform occasional, expensive resizing operations. In aerospace, a real-time operating system might have a garbage collector that occasionally causes a high-latency spike; amortized analysis helps guarantee that the system's average performance remains within critical bounds. In physics simulations, adaptive mesh refinement involves expensive re-gridding operations, but amortized analysis can show that the average cost per time step remains low.

## When to study it
You must be completely fluent with Big-O, Big-Omega, and Big-Theta notation. You should also have a solid grasp of basic data structures (arrays, linked lists) and be able to analyze the complexity of simple iterative algorithms (e.g., loops and nested loops). A basic understanding of mathematical series, particularly geometric series, is also required.

## How to study it (step by step)
1.  **Analyze the worst case:** Take a dynamic array that doubles its capacity when full. Write down the actual cost of a single `push` operation. Note that the worst-case is $O(n)$ but most cases are $O(1)$. This tension is why amortized analysis is needed.
2.  **Use the Aggregate Method:** Calculate the *total* cost for a sequence of $n$ `push` operations, starting from an empty array. Sum up the costs of all cheap insertions and all expensive resize-and-copy events. Divide this total cost by $n$ to find the amortized cost.
3.  **Re-solve with the Accounting Method:** Assign a fixed "payment" (amortized cost) to each `push`. For a cheap push, use part of the payment for the operation and save the rest as "credit". For an expensive resize, use the accumulated credit to "pay" for the extra work. Your goal is to show the credit balance never goes negative.
4.  **Re-solve with the Potential Method:** This is the most formal method. Define a "potential function" $\Phi$ that represents the stored-up "work" or "pre-paid credit" in the data structure. The amortized cost of an operation is its actual cost plus the change in potential it causes. This method directly connects to potential energy in physics; a system in a high-potential state is ready to do a lot of work.
5.  **Compare and contrast:** For the dynamic array problem, write down the results from all three methods. Confirm they yield the same Big-O complexity. Articulate in your own words how the "credit" in the accounting method is formalized by the "potential" in the potential method.

## Key ideas, with intuition
1.  **Amortized vs. Average-Case:** Amortized analysis is a worst-case guarantee over a *sequence*. It assumes nothing about the probability of inputs. Average-case analysis computes the expected cost based on a probability distribution of inputs. If you're building a flight controller, you need the amortized guarantee, not a probabilistic one.

2.  **Aggregate Method: The Total Bill.** This is the most straightforward approach. For a sequence of $n$ operations, the amortized cost per operation is simply the total cost divided by $n$.
    $$ \text{Amortized Cost} = \frac{\text{Total Actual Cost of } n \text{ Operations}}{n} $$
    This gives the overall picture but doesn't provide insight into the cost of individual operations.

3.  **Accounting Method: The Banker's Analogy.** Imagine you charge a fixed fee, $\hat{c}$, for every operation.
    *   If the actual cost, $c_i$, is less than $\hat{c}$, you use $c_i$ to perform the work and deposit the surplus, $\hat{c} - c_i$, as credit into a bank account associated with the data structure.
    *   If the actual cost $c_i$ is greater than $\hat{c}$, you withdraw from the bank account to pay the difference, $c_i - \hat{c}$.
    *   The key constraint is that the bank account balance must *never be negative*. If you can find a fee $\hat{c}$ that ensures this, then $\hat{c}$ is a valid amortized cost.

4.  **Potential Method: The Physicist's Analogy.** This formalizes the accounting method. We define a potential function $\Phi(D)$ which maps a state $D$ of the data structure to a real number. Think of $\Phi$ as the potential energy stored in the system.
    *   We require $\Phi(D_0) = 0$ for the initial state $D_0$, and $\Phi(D_i) \ge 0$ for all subsequent states $D_i$.
    *   The amortized cost $\hat{c}_i$ of the $i$-th operation is its actual cost $c_i$ plus the change in potential it induces:
        $$ \hat{c}_i = c_i + \Phi(D_i) - \Phi(D_{i-1}) $$
    *   A cheap operation that sets up an expensive one later will increase the potential (storing energy). An expensive operation will decrease the potential (releasing energy), using that stored value to "pay" for its high actual cost. The total amortized cost for $n$ operations is $\sum \hat{c}_i = \sum c_i + \Phi(D_n) - \Phi(D_0)$, which must be an upper bound on the total actual cost $\sum c_i$.

## Worked example
Let's analyze a sequence of $n$ `push` operations on a dynamic array that doubles its capacity when full. We will use the **potential method**.

Let $s_i$ be the number of elements in the array (size) after the $i$-th operation.
Let $k_i$ be the capacity of the array after the $i$-th operation.
The actual cost of the $i$-th `push` operation, $c_i$, is:
-   $c_i = 1$ if the array is not full ($s_{i-1} < k_{i-1}$).
-   $c_i = s_{i-1} + 1$ if the array is full ($s_{i-1} = k_{i-1}$). This cost includes copying $s_{i-1}$ old elements and adding the new one.

**Goal:** Find an amortized cost $\hat{c}_i$ that is constant.

**1. Define the Potential Function:**
The "messiness" or "stored work" in our array is the number of elements we've added since the last resize, relative to the capacity. A good potential function captures this. Let's try:
$$ \Phi(D_i) = 2s_i - k_i $$
We must verify that $\Phi(D_i) \ge 0$. A resize happens when $s_i = k_{i-1} + 1$. After the resize, the new capacity becomes $k_i = 2k_{i-1} = 2(s_i-1)$. So, $s_i = k_i/2 + 1$. The minimum size for a given capacity $k_i$ is just over half full. Thus, $s_i \ge k_i/2$. This means $2s_i \ge k_i$, so $2s_i - k_i \ge 0$. Our potential is non-negative. For an empty array, $s_0=0, k_0=0$, so $\Phi(D_0)=0$.

**2. Analyze the case: No Resize**
Here, the $i$-th `push` does not trigger a resize.
-   Actual cost: $c_i = 1$.
-   State change: $s_i = s_{i-1} + 1$ and $k_i = k_{i-1}$.
-   Change in potential: $\Delta\Phi = \Phi(D_i) - \Phi(D_{i-1}) = (2s_i - k_i) - (2s_{i-1} - k_{i-1}) = (2(s_{i-1}+1) - k_{i-1}) - (2s_{i-1} - k_{i-1}) = 2$.
-   Amortized cost: $\hat{c}_i = c_i + \Delta\Phi = 1 + 2 = 3$.

**3. Analyze the case: Resize**
Here, the $i$-th `push` triggers a resize. This happens when $s_{i-1} = k_{i-1}$. Assume $k_{i-1}>0$.
-   Actual cost: $c_i = s_{i-1} + 1 = k_{i-1} + 1$.
-   State change: $s_i = s_{i-1} + 1$ and $k_i = 2k_{i-1}$.
-   Change in potential:
    $$ \Delta\Phi = \Phi(D_i) - \Phi(D_{i-1}) $$
    $$ = (2s_i - k_i) - (2s_{i-1} - k_{i-1}) $$
    $$ = (2(s_{i-1}+1) - 2k_{i-1}) - (2s_{i-1} - k_{i-1}) $$
    $$ = (2s_{i-1} + 2 - 2k_{i-1}) - (2s_{i-1} - k_{i-1}) $$
    $$ = 2 - k_{i-1} $$
-   Amortized cost: $\hat{c}_i = c_i + \Delta\Phi = (k_{i-1} + 1) + (2 - k_{i-1}) = 3$.

**Reflection:**
In both cases, the amortized cost is 3. We have successfully spread the large $O(n)$ cost of resizing over the sequence of operations, proving that the `push` operation on a doubling dynamic array has a constant amortized cost, $O(1)$. The potential function brilliantly captured the "stored obligation" to perform a copy, increasing by 2 for every simple insertion and then dropping significantly during a resize to pay for the large actual cost.

## Diagrams
Here is the state of a dynamic array during a sequence of 5 pushes, starting with capacity 2.

```text
Operation | Array State [s=size, k=capacity] | Actual Cost (c_i)
-------------------------------------------------------------------
Initial   | [] s=0, k=0                        | 0
push(A)   | [A] s=1, k=2  (Resize k=0->2)      | 1
push(B)   | [A, B] s=2, k=2                    | 1
push(C)   | [A, B, C] s=3, k=4 (Resize k=2->4) | 3 (copy A,B + add C)
push(D)   | [A, B, C, D] s=4, k=4              | 1
push(E)   | [A,B,C,D,E] s=5, k=8 (Resize k=4->8) | 5 (copy A..D + add E)
```

This diagram plots the actual cost vs. the amortized cost for the sequence above.

```text
      ^ Cost
      |
    5 +-------------X (Actual)
      |             .
    4 +             .
      |             .
    3 +---O----O----O----O----O (Amortized = 3)
      |             .
    2 +             .
      |             .
    1 +---X----X---------X----.
      +--------------------------------> Operation i
        1    2    3    4    5
```

## Memory technique — remember this forever
1.  **The Story:** "The Rent Analogy".
    -   **Aggregate:** You want to know your average daily housing cost. You sum up 12 months of rent payments and divide by 365. Simple, but only looks backward.
    -   **Accounting:** You decide your "daily rent cost" is $40. On most days, you do nothing (actual cost $0), so you put $40 in a jar. On the 1st of the month, you pay $1200 (actual cost). You take the $1160 you saved in the jar plus today's $40 to make the payment. You've successfully managed your cash flow.
    -   **Potential:** Your bank account balance is the potential function, $\Phi$. Most days, your balance increases (a small deposit). On rent day, you make a huge withdrawal (actual cost) which causes a large drop in potential. The change in your bank balance smooths out the perceived cost.

2.  **Must-Memorize Formulas:**
    -   **Aggregate:** $\hat{c}_{\text{avg}} = \frac{1}{n} \sum_{i=1}^{n} c_i$
    -   **Accounting:** For a chosen $\hat{c}$, ensure Credit = $\sum_{i=1}^{n} (\hat{c} - c_i) \ge 0$ always.
    -   **Potential:** $\hat{c}_i = c_i + \Phi(D_i) - \Phi(D_{i-1})$

3.  **Spaced Repetition Schedule:**
    -   Review these ideas and re-derive the dynamic array example in **1 day**.
    -   Do it again in **3 days**.
    -   Again in **7 days**.
    -   Again in **16 days**.
    -   Final review in **35 days**.

4.  **First Principles Pathway:** If you forget everything, remember the goal: to find an average cost over a worst-case sequence. Start with the **aggregate method**. Write down a sequence of operations (like `push` on a dynamic array), manually calculate the *total* cost of all operations, and divide by the number of operations. This is the definition of amortized cost. The other methods are just more elegant ways of proving the same bound without having to analyze the entire sequence at once.

## Common mistakes
1.  **Confusing Amortized with Average-Case:** Never say "on average, this operation costs...". Say "the amortized cost of this operation is...". The former implies probability, the latter implies a worst-case sequential guarantee.
2.  **Picking a Bad Potential Function:** A common mistake is defining a $\Phi$ that can become negative, which violates the core requirement. Always prove $\Phi(D_i) \ge \Phi(D_0)$ for all $i$.
3.  **Incorrectly Calculating Actual Cost:** Be meticulous. When a dynamic array resizes from size $k$ to $2k$, the cost is not just copying $k$ elements. It's copying $k$ elements *and* inserting the new one, for a total cost of $k+1$.
4.  **"Credit" vs "Debt" in Accounting:** In the accounting method, your chosen amortized cost $\hat{c}$ must be large enough to build sufficient credit for expensive operations. If you pick $\hat{c}$ too small, you'll go into debt (credit < 0), and the proof fails.

## Self-check
1.  A dynamic array is implemented to grow by a constant factor, but instead of doubling, it triples its capacity ($k_{new} = 3k_{old}$) upon becoming full. Using the potential method, find the amortized cost of the `push` operation.
2.  Consider a binary counter of $k$ bits that starts at 0. It supports one operation: `increment()`. The cost of an `increment()` is the number of bits that are flipped. For example, incrementing from 3 (011) to 4 (100) costs 3 flips. What is the amortized cost of the `increment()` operation?
3.  What is the amortized cost of `push` on a dynamic array if, instead of doubling, its capacity grows linearly (i.e., $k_{new} = k_{old} + C$ for some constant $C$)? Prove your answer.