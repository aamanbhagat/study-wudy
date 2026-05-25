## 1. What it is — in plain English

Imagine you're packing a backpack for a hike. Your backpack has a maximum weight limit, say 10 kilograms. You have a pile of items, each with its own weight and a "value" (how much you want or need it). For instance, a heavy sleeping bag might be very valuable, while a light snack might be less valuable.

The goal is to pack your backpack so that the *total value* of everything inside is as high as possible, without going over the 10-kilogram weight limit. Here's the catch: you can't cut items in half. You either take the whole sleeping bag, or you leave it. You can't take half a sleeping bag. This "all or nothing" choice is why it's called the "0/1 Knapsack" problem (0 for not taking, 1 for taking).

A "greedy" approach would be to always pick the item that seems "best" at that exact moment. For example, you might think, "I'll always pick the item that gives me the most value per kilogram." So, if a small, light item gives you a lot of value for its weight, you'd pick that first. Then you'd look for the next best value-per-kilogram item that still fits, and so on.

This lesson explores a specific scenario where this seemingly smart "greedy" strategy *fails*. It shows that sometimes, making the best local choice at each step doesn't lead to the best overall solution for your backpack. You might end up with a packed backpack, but a different combination of items, chosen less "greedily," could have given you even more total value.

## 2. Why it matters — real-world applications

Understanding when greedy algorithms fail is crucial because it tells us when to invest in more complex, but guaranteed-optimal, solutions. The 0/1 Knapsack problem and its variants appear in many real-world resource allocation scenarios:

1.  **Satellite Payload Optimization (Aerospace):** When designing a satellite, there's a strict weight limit for the scientific instruments and components (the "payload") it can carry into orbit. Each instrument has a weight and a scientific "value" or priority. Engineers need to select the optimal subset of instruments to maximize scientific return without exceeding the launch vehicle's capacity. This is a classic 0/1 Knapsack problem.

2.  **Investment Portfolio Selection (Finance):** An investor has a limited budget (knapsack capacity) and a list of potential investments (items), each with a cost (weight) and an expected return (value). The investor wants to choose a set of investments to maximize total expected return without exceeding their budget. Since you typically buy whole shares or specific projects, this is often a 0/1 decision.

3.  **Resource Allocation in Cloud Computing:** A cloud provider might have a physical server with a limited amount of RAM and CPU (knapsack capacity). They need to decide which virtual machines (VMs) to host on it. Each VM requires a certain amount of resources (weight) and generates a certain revenue or serves a certain priority of customer (value). The goal is to maximize the utilization or revenue of the physical server.

4.  **Cutting Stock Problem (Manufacturing - variant):** While not a direct 0/1 Knapsack, the underlying principles of optimizing resource use apply. Imagine you have a long piece of material (e.g., metal, fabric) of a certain length (knapsack capacity). You need to cut smaller pieces of various lengths (weights) to fulfill customer orders. Each cut piece might have a certain profit (value). The goal is to cut the material to maximize profit while minimizing waste, where each cut piece is either taken or not (0/1).

5.  **Project Selection and Budgeting:** A company has a fixed budget for the next fiscal year (knapsack capacity). There are various potential projects, each requiring a specific budget (weight) and promising a certain return on investment or strategic benefit (value). The company needs to select the most impactful projects within its budget, where projects are typically approved or rejected in their entirety.

## 3. Prerequisites — what you must know first

Before diving into why greedy fails for 0/1 Knapsack, ensure you have a solid grasp of these fundamental concepts:

*   **Algorithms:** A step-by-step procedure or formula for solving a problem.
*   **Optimization Problems:** Problems where the goal is to find the best possible solution from all feasible solutions (e.g., maximize profit, minimize cost).
*   **Greedy Algorithms:** A class of algorithms that make locally optimal choices at each step with the hope of finding a globally optimal solution. They are often simple and fast.
*   **Computational Complexity (Big O Notation):** A way to describe the performance or complexity of an algorithm (e.g., $O(N)$, $O(N \log N)$). Greedy algorithms are often attractive because of their low complexity.
*   **Mathematical Notation:** Familiarity with basic set notation, summation ($\sum$), and variables to represent quantities.

## 4. The core idea — step by step

The core idea of "When greedy fails" for the 0/1 Knapsack problem revolves around understanding the specific greedy strategy often applied and then demonstrating a scenario where its local optimality prevents global optimality.

### ### Step 1: Understanding the 0/1 Knapsack Problem

**Plain-English Statement:** You have a bag with a limited weight capacity. You are presented with a list of items. Each item has a specific weight and a specific value. You must decide for each item whether to take it completely or leave it completely – no partial items allowed. Your goal is to choose a combination of items such that their total weight does not exceed the bag's capacity, and their total value is maximized.

**Concrete Example:**
Knapsack Capacity $W = 10 \text{ kg}$.
Items:
*   Item A: Weight $w_A = 6 \text{ kg}$, Value $v_A = \$100$
*   Item B: Weight $w_B = 4 \text{ kg}$, Value $v_B = \$60$
*   Item C: Weight $w_C = 4 \text{ kg}$, Value $v_C = \$60$

We need to pick items to maximize total value without exceeding 10 kg.

**Formal/Mathematical Version:**
Given $n$ items, where item $i$ has weight $w_i > 0$ and value $v_i > 0$. Given a knapsack capacity $W > 0$.
We want to choose a subset of items $S \subseteq \{1, 2, \dots, n\}$ such that:
1.  $\sum_{i \in S} w_i \le W$ (total weight constraint)
2.  $\sum_{i \in S} v_i$ is maximized (objective function)

This is often formulated using binary decision variables $x_i \in \{0, 1\}$:
Maximize $\sum_{i=1}^{n} v_i x_i$
Subject to $\sum_{i=1}^{n} w_i x_i \le W$
and $x_i \in \{0, 1\}$ for all $i \in \{1, \dots, n\}$.

**What could go wrong:** If we try to exhaustively list all possible subsets of items, the number of subsets can be $2^n$, which becomes incredibly large even for moderate $n$. This brute-force approach is too slow for many real-world problems.

### ### Step 2: Introducing the Common Greedy Strategy for Knapsack

**Plain-English Statement:** The most intuitive greedy strategy for the Knapsack problem is to prioritize items that offer the "best bang for your buck." This means calculating the value-to-weight ratio for each item ($v_i/w_i$) and then picking items with the highest ratio first, as long as they fit in the knapsack.

**Concrete Example:**
Using the items from Step 1:
*   Item A: $w_A = 6, v_A = \$100$. Ratio $v_A/w_A = 100/6 \approx 16.67 \text{ \$/kg}$
*   Item B: $w_B = 4, v_B = \$60$. Ratio $v_B/w_B = 60/4 = 15.00 \text{ \$/kg}$
*   Item C: $w_C = 4, v_C = \$60$. Ratio $v_C/w_C = 60/4 = 15.00 \text{ \$/kg}$

The greedy strategy would first consider Item A because it has the highest value-to-weight ratio.

**Formal/Mathematical Version:**
1.  For each item $i$, calculate its value-to-weight ratio $r_i = v_i / w_i$.
2.  Sort all items in descending order based on their $r_i$ values.
3.  Iterate through the sorted items:
    *   If the current item $i$ fits into the remaining capacity of the knapsack (i.e., $w_i \le \text{remaining capacity}$), then add item $i$ to the knapsack and update the remaining capacity.
    *   If it doesn't fit, skip it and move to the next item.

**What could go wrong:** This strategy seems perfectly logical. Why would you ever pick an item with a worse "bang for your buck" if a better one is available? The problem arises because of the "0/1" constraint – you can't take a fraction of an item.

### ### Step 3: Illustrating the Greedy Strategy (where it *might* work, or seems plausible)

**Plain-English Statement:** Let's apply the greedy strategy to a simple case to see how it works. Sometimes, it actually gives the correct answer.

**Concrete Example:**
Knapsack Capacity $W = 10 \text{ kg}$.
Items:
*   Item A: $w_A = 3 \text{ kg}$, $v_A = \$60$ (Ratio: 20)
*   Item B: $w_B = 5 \text{ kg}$, $v_B = \$75$ (Ratio: 15)
*   Item C: $w_C = 2 \text{ kg}$, $v_C = \$20$ (Ratio: 10)

1.  Calculate ratios: A: 20, B: 15, C: 10.
2.  Sorted order: A, B, C.
3.  Apply greedy:
    *   Pick A ($w=3, v=60$). Remaining capacity: $10 - 3 = 7 \text{ kg}$. Total value: \$60.
    *   Pick B ($w=5, v=75$). Remaining capacity: $7 - 5 = 2 \text{ kg}$. Total value: $\$60 + \$75 = \$135$.
    *   Item C ($w=2, v=20$) fits. Pick C. Remaining capacity: $2 - 2 = 0 \text{ kg}$. Total value: $\$135 + \$20 = \$155$.

In this example, the greedy approach yields a total value of \$155. It turns out this is also the optimal solution for this specific set of items. This shows why the greedy strategy is often tempting – it's simple and *sometimes* works.

**What could go wrong:** Just because it works for one example doesn't mean it works for all. The "0/1" constraint is the critical factor that can break this simple logic.

### ### Step 4: Introducing the Counter-Example — When Greedy Fails

**Plain-English Statement:** Now, let's use a specific example where the greedy strategy, despite seeming logical, does *not* produce the best possible outcome. This is the "counter-example" that proves greedy isn't always optimal for 0/1 Knapsack.

**Concrete Example:**
Knapsack Capacity $W = 10 \text{ kg}$.
Items:
*   Item A: Weight $w_A = 6 \text{ kg}$, Value $v_A = \$100$
*   Item B: Weight $w_B = 4 \text{ kg}$, Value $v_B = \$60$
*   Item C: Weight $w_C = 4 \text{ kg}$, Value $v_C = \$60$

Let's apply the greedy strategy (highest value-to-weight ratio):

1.  Calculate ratios:
    *   Item A: $v_A/w_A = 100/6 \approx 16.67 \text{ \$/kg}$
    *   Item B: $v_B/w_B = 60/4 = 15.00 \text{ \$/kg}$
    *   Item C: $v_C/w_C = 60/4 = 15.00 \text{ \$/kg}$

2.  Sorted order (descending ratio): Item A, then Item B (or C, they have the same ratio). Let's say A, B, C.

3.  Apply greedy selection:
    *   **Pick Item A:** It has the highest ratio. $w_A = 6 \text{ kg}$, $v_A = \$100$.
        *   Remaining capacity: $10 - 6 = 4 \text{ kg}$.
        *   Current total value: \$100.
    *   **Consider Item B:** $w_B = 4 \text{ kg}$. It fits into the remaining 4 kg capacity.
        *   Pick Item B.
        *   Remaining capacity: $4 - 4 = 0 \text{ kg}$.
        *   Current total value: $\$100 + \$60 = \$160$.
    *   **Consider Item C:** $w_C = 4 \text{ kg}$. It does *not* fit into the remaining 0 kg capacity.
        *   Skip Item C.

The greedy algorithm, following its strict rule, results in picking Item A and Item B, for a total weight of $6+4=10 \text{ kg}$ and a total value of $\$100 + \$60 = \mathbf{\$160}$.

**What could go wrong:** This is where the "aha!" moment happens. The greedy choice of Item A, while locally optimal (best ratio), has left exactly 4 kg remaining. This 4 kg slot is perfectly filled by Item B. But what if there was a better combination?

### ### Step 5: Comparing Greedy vs. Optimal

**Plain-English Statement:** Now, let's look at the same problem from Step 4 and find the *actual* best solution, not just what the greedy algorithm gives us. We'll see that the greedy choice prevented us from reaching the true maximum value.

**Concrete Example:**
Knapsack Capacity $W = 10 \text{ kg}$.
Items:
*   Item A: Weight $w_A = 6 \text{ kg}$, Value $v_A = \$100$ (Ratio: 16.67)
*   Item B: Weight $w_B = 4 \text{ kg}$, Value $v_B = \$60$ (Ratio: 15.00)
*   Item C: Weight $w_C = 4 \text{ kg}$, Value $v_C = \$60$ (Ratio: 15.00)

**Greedy Solution (from Step 4):**
Selected: Item A, Item B
Total Weight: $6 + 4 = 10 \text{ kg}$
Total Value: $100 + 60 = \mathbf{\$160}$

**Let's find the Optimal Solution (by trying combinations that fit):**
*   **Combination 1: {A, B}** (Greedy's choice)
    *   Weight: $6 + 4 = 10 \text{ kg}$
    *   Value: $100 + 60 = \$160$
*   **Combination 2: {A, C}** (Similar to A, B due to B and C having same properties)
    *   Weight: $6 + 4 = 10 \text{ kg}$
    *   Value: $100 + 60 = \$160$
*   **Combination 3: {B, C}**
    *   Weight: $4 + 4 = 8 \text{ kg}$ (This is $\le 10 \text{ kg}$, so it's valid)
    *   Value: $60 + 60 = \mathbf{\$120}$
*   **Combination 4: {A}**
    *   Weight: $6 \text{ kg}$
    *   Value: $\$100$
*   **Combination 5: {B}**
    *   Weight: $4 \text{ kg}$
    *   Value: $\$60$
*   **Combination 6: {C}**
    *   Weight: $4 \text{ kg}$
    *   Value: $\$60$

Comparing all valid combinations, the maximum value we can achieve is $\mathbf{\$120}$ with {B, C}. Wait, this is wrong. My manual calculation in my head was wrong. The greedy solution (A+B) gives $100+60=160$. The optimal solution is actually $B+C = 60+60=120$. This means the greedy solution in this case *was* optimal.

Let me re-evaluate the counter-example. The classic counter-example needs Item A to be *just* big enough to block two other items that combined are better.

Let's retry the example to make greedy *fail*:
Knapsack Capacity $W = 10 \text{ kg}$.
Items:
*   Item A: Weight $w_A = 6 \text{ kg}$, Value $v_A = \$100$ (Ratio: $16.67 \text{ \$/kg}$)
*   Item B: Weight $w_B = 5 \text{ kg}$, Value $v_B = \$90$ (Ratio: $18.00 \text{ \$/kg}$)
*   Item C: Weight $w_C = 5 \text{ kg}$, Value $v_C = \$90$ (Ratio: $18.00 \text{ \$/kg}$)

**Greedy Strategy:**

1.  Ratios: A: $100/6 \approx 16.67$, B: $90/5 = 18.00$, C: $90/5 = 18.00$.
2.  Sorted order: B, C, A (or C, B, A). Let's pick B first.
3.  Apply greedy selection:
    *   **Pick Item B:** $w_B = 5 \text{ kg}$, $v_B = \$90$.
        *   Remaining capacity: $10 - 5 = 5 \text{ kg}$.
        *   Current total value: \$90.
    *   **Consider Item C:** $w_C = 5 \text{ kg}$. It fits into the remaining 5 kg capacity.
        *   Pick Item C.
        *   Remaining capacity: $5 - 5 = 0 \text{ kg}$.
        *   Current total value: $\$90 + \$90 = \mathbf{\$180}$.
    *   **Consider Item A:** $w_A = 6 \text{ kg}$. It does *not* fit into the remaining 0 kg capacity.
        *   Skip Item A.

The greedy algorithm results in picking Item B and Item C, for a total weight of $5+5=10 \text{ kg}$ and a total value of $\mathbf{\$180}$.

**Now, let's find the Optimal Solution (by trying combinations that fit):**
*   **Combination 1: {B, C}** (Greedy's choice)
    *   Weight: $5 + 5 = 10 \text{ kg}$
    *   Value: $90 + 90 = \mathbf{\$180}$
*   **Combination 2: {A}**
    *   Weight: $6 \text{ kg}$
    *   Value: $\$100$
*   **Combination 3: {A, B}** (or {A, C})
    *   Weight: $6 + 5 = 11 \text{ kg}$. This exceeds capacity $W=10$. **Invalid.**

In this revised example, the greedy approach *still* yields the optimal solution (\$180). This means my counter-example construction is flawed. The issue is that the "best ratio" items (B and C) combine to perfectly fill the knapsack and yield the highest value.

Let's try a *classic* counter-example structure. The trick is to have one item with a *very slightly* better ratio that takes up *just enough* space to prevent an even better combination of *other* items.

**Revised Counter-Example (This is the one that works):**
Knapsack Capacity $W = 10 \text{ kg}$.
Items:
*   Item A: Weight $w_A = 7 \text{ kg}$, Value $v_A = \$100$ (Ratio: $100/7 \approx 14.28 \text{ \$/kg}$)
*   Item B: Weight $w_B = 5 \text{ kg}$, Value $v_B = \$70$ (Ratio: $70/5 = 14.00 \text{ \$/kg}$)
*   Item C: Weight $w_C = 5 \text{ kg}$, Value $v_C = \$70$ (Ratio: $70/5 = 14.00 \text{ \$/kg}$)

**Greedy Strategy (highest value-to-weight ratio):**

1.  Ratios: A: $100/7 \approx 14.28$, B: $70/5 = 14.00$, C: $70/5 = 14.00$.
2.  Sorted order: A, B, C (or A, C, B).
3.  Apply greedy selection:
    *   **Pick Item A:** It has the highest ratio. $w_A = 7 \text{ kg}$, $v_A = \$100$.
        *   Remaining capacity: $10 - 7 = 3 \text{ kg}$.
        *   Current total value: \$100.
    *   **Consider Item B:** $w_B = 5 \text{ kg}$. It does *not* fit into the remaining 3 kg capacity.
        *   Skip Item B.
    *   **Consider Item C:** $w_C = 5 \text{ kg}$. It does *not* fit into the remaining 3 kg capacity.
        *   Skip Item C.

The greedy algorithm results in picking only Item A, for a total weight of $7 \text{ kg}$ and a total value of $\mathbf{\$100}$.

**Now, let's find the Optimal Solution (by trying combinations that fit):**
*   **Combination 1: {A}** (Greedy's choice)
    *   Weight: $7 \text{ kg}$
    *   Value: $\$100$
*   **Combination 2: {B, C}**
    *   Weight: $5 + 5 = 10 \text{ kg}$ (This is $\le 10 \text{ kg}$, so it's valid)
    *   Value: $70 + 70 = \mathbf{\$140}$
*   **Combination 3: {A, B}** (or {A, C})
    *   Weight: $7 + 5 = 12 \text{ kg}$. This exceeds capacity $W=10$. **Invalid.**
*   **Combination 4: {B}**
    *   Weight: $5 \text{ kg}$
    *   Value: $\$70$
*   **Combination 5: {C}**
    *   Weight: $5 \text{ kg}$
    *   Value: $\$70$

Comparing all valid combinations, the maximum value we can achieve is $\mathbf{\$140}$ by picking Item B and Item C.

**Conclusion:** The greedy algorithm yielded \$100, while the optimal solution is \$140. This demonstrates that the greedy approach fails for the 0/1 Knapsack problem.

**What could go wrong:** It's easy to accidentally construct an example where greedy *does* work, as I just did. The key for a counter-example is that a locally optimal choice (Item A with the best ratio) consumes just enough capacity to prevent a globally better combination (Items B and C) from being chosen.

### ### Step 6: Explaining *Why* Greedy Fails Here

**Plain-English Statement:** The greedy algorithm fails because it's short-sighted. It focuses solely on getting the absolute best value-to-weight ratio *at the current moment*, without considering how that choice might impact future possibilities. By picking a large item with a slightly better ratio, it might fill up the knapsack in such a way that no other items can fit, even if a combination of smaller, slightly less ratio-efficient items could have yielded a higher total value. The "0/1" constraint is the critical factor: if we could take fractions, the greedy approach would work.

**Formal/Mathematical Version:**
The greedy strategy for 0/1 Knapsack problem, based on sorting items by $v_i/w_i$ ratio, is optimal for the **Fractional Knapsack Problem**. In the fractional version, we *can* take a fraction of an item. If we could take $3/5$ of Item B and $3/5$ of Item C in the counter-example, the greedy approach would simply fill the remaining capacity with fractions of the next best items until the knapsack is full.

However, the $x_i \in \{0, 1\}$ constraint fundamentally changes the problem. When an item is selected, its entire weight $w_i$ is consumed from the capacity. This creates a "hole" or remaining capacity $W - w_i$. If $w_i$ is large, this remaining capacity might be too small to accommodate other items, even if those items, when combined, would offer a higher value than the chosen item. The local optimal choice (Item A) in our counter-example effectively "blocked" the path to the global optimal choice (Items B and C). The greedy algorithm doesn't have the foresight to make a slightly suboptimal local choice (e.g., *not* picking Item A) if it leads to a much better global outcome.

**What could go wrong:** Students might confuse this with problems where greedy *does* work (like Fractional Knapsack, Activity Selection, or Huffman Coding). The key differentiator is the "0/1" decision and the structure of the problem not satisfying the "greedy choice property" and "optimal substructure" in the way required for simple greedy algorithms.

## 5. Worked examples — multiple, with every step shown

### Example 1: Easy - Greedy Works

**Problem Statement:** You have a knapsack with a capacity of $W = 15 \text{ kg}$.
Items available:
*   Item A: $w_A = 3 \text{ kg}$, $v_A = \$30$
*   Item B: $w_B = 5 \text{ kg}$, $v_B = \$40$
*   Item C: $w_C = 7 \text{ kg}$, $v_C = \$63$
*   Item D: $w_D = 4 \text{ kg}$, $v_D = \$28$

**Identify what's given and what we want:**
Given: Knapsack capacity $W=15$. Items with weights ($w_i$) and values ($v_i$).
Want: Maximize total value by selecting items (0/1 choice) without exceeding capacity.

**Step-by-step solution:**

1.  **Calculate Value-to-Weight Ratios ($v_i/w_i$) for each item:**
    *   Item A: $r_A = \frac{30}{3} = 10 \text{ \$/kg}$
    *   Item B: $r_B = \frac{40}{5} = 8 \text{ \$/kg}$
    *   Item C: $r_C = \frac{63}{7} = 9 \text{ \$/kg}$
    *   Item D: $r_D = \frac{28}{4} = 7 \text{ \$/kg}$
    *   *Explanation:* We calculate the "bang for your buck" for each item to prioritize them.

2.  **Sort items by ratio in descending order:**
    *   Sorted order: A (10), C (9), B (8), D (7)
    *   *Explanation:* The greedy strategy dictates we pick the most "efficient" items first.

3.  **Apply Greedy Selection:**
    *   Initialize: Current Weight $W_{curr} = 0$, Current Value $V_{curr} = 0$, Remaining Capacity $W_{rem} = 15 \text{ kg}$.
    *   **Pick Item A:**
        *   $w_A = 3 \text{ kg}$, $v_A = \$30$.
        *   Check if $w_A \le W_{rem}$: $3 \le 15$ (True).
        *   Add Item A.
        *   $W_{curr} = 0 + 3 = 3 \text{ kg}$.
        *   $V_{curr} = 0 + 30 = \$30$.
        *   $W_{rem} = 15 - 3 = 12 \text{ kg}$.
        *   *Explanation:* Item A fits, so we take it and update our knapsack's state.
    *   **Pick Item C:**
        *   $w_C = 7 \text{ kg}$, $v_C = \$63$.
        *   Check if $w_C \le W_{rem}$: $7 \le 12$ (True).
        *   Add Item C.
        *   $W_{curr} = 3 + 7 = 10 \text{ kg}$.
        *   $V_{curr} = 30 + 63 = \$93$.
        *   $W_{rem} = 12 - 7 = 5 \text{ kg}$.
        *   *Explanation:* Item C fits in the remaining space, so we take it.
    *   **Pick Item B:**
        *   $w_B = 5 \text{ kg}$, $v_B = \$40$.
        *   Check if $w_B \le W_{rem}$: $5 \le 5$ (True).
        *   Add Item B.
        *   $W_{curr} = 10 + 5 = 15 \text{ kg}$.
        *   $V_{curr} = 93 + 40 = \$133$.
        *   $W_{rem} = 5 - 5 = 0 \text{ kg}$.
        *   *Explanation:* Item B perfectly fills the remaining capacity.
    *   **Consider Item D:**
        *   $w_D = 4 \text{ kg}$, $v_D = \$28$.
        *   Check if $w_D \le W_{rem}$: $4 \le 0$ (False).
        *   Skip Item D.
        *   *Explanation:* The knapsack is full, so Item D cannot be taken.

4.  **Final Greedy Result:**
    *   Items selected: A, C, B
    *   Total Weight: $15 \text{ kg}$
    *   Total Value: $\mathbf{\$133}$

5.  **Verification (Optimal Solution):** For this small example, we can quickly see that A+C+B is indeed optimal. Any other combination would either exceed capacity or yield less value. For example, A+D (3+4=7kg, $30+28=58), A+B (3+5=8kg, $30+40=70). The greedy choice worked here.

**Reflection:** This example shows that the greedy approach isn't *always* wrong. It can be optimal when the item sizes and values align favorably, often when smaller, high-ratio items can be picked without blocking better overall combinations.

---

### Example 2: Medium - The Classic Counter-Example

**Problem Statement:** You have a knapsack with a capacity of $W = 10 \text{ kg}$.
Items available:
*   Item A: $w_A = 7 \text{ kg}$, $v_A = \$100$
*   Item B: $w_B = 5 \text{ kg}$, $v_B = \$70$
*   Item C: $w_C = 5 \text{ kg}$, $v_C = \$70$

**Identify what's given and what we want:**
Given: Knapsack capacity $W=10$. Items with weights ($w_i$) and values ($v_i$).
Want: Maximize total value by selecting items (0/1 choice) without exceeding capacity.

**Step-by-step solution:**

1.  **Calculate Value-to-Weight Ratios ($v_i/w_i$) for each item:**
    *   Item A: $r_A = \frac{100}{7} \approx 14.28 \text{ \$/kg}$
    *   Item B: $r_B = \frac{70}{5} = 14.00 \text{ \$/kg}$
    *   Item C: $r_C = \frac{70}{5} = 14.00 \text{ \$/kg}$
    *   *Explanation:* Item A has a slightly better ratio than B and C.

2.  **Sort items by ratio in descending order:**
    *   Sorted order: A (14.28), B (14.00), C (14.00) (Order of B and C doesn't matter as they have the same ratio).
    *   *Explanation:* We prioritize Item A due to its highest efficiency.

3.  **Apply Greedy Selection:**
    *   Initialize: Current Weight $W_{curr} = 0$, Current Value $V_{curr} = 0$, Remaining Capacity $W_{rem} = 10 \text{ kg}$.
    *   **Pick Item A:**
        *   $w_A = 7 \text{ kg}$, $v_A = \$100$.
        *   Check if $w_A \le W_{rem}$: $7 \le 10$ (True).
        *   Add Item A.
        *   $W_{curr} = 0 + 7 = 7 \text{ kg}$.
        *   $V_{curr} = 0 + 100 = \$100$.
        *   $W_{rem} = 10 - 7 = 3 \text{ kg}$.
        *   *Explanation:* Item A, being the most efficient, is selected first.
    *   **Consider Item B:**
        *   $w_B = 5 \text{ kg}$, $v_B = \$70$.
        *   Check if $w_B \le W_{rem}$: $5 \le 3$ (False).
        *   Skip Item B.
        *   *Explanation:* Item B is too heavy to fit in the remaining 3 kg.
    *   **Consider Item C:**
        *   $w_C = 5 \text{ kg}$, $v_C = \$70$.
        *   Check if $w_C \le W_{rem}$: $5 \le 3$ (False).
        *   Skip Item C.
        *   *Explanation:* Item C is also too heavy.

4.  **Final Greedy Result:**
    *   Items selected: A
    *   Total Weight: $7 \text{ kg}$
    *   Total Value: $\mathbf{\$100}$

5.  **Verification (Optimal Solution):**
    *   Let's consider all possible valid combinations:
        *   **{A}:** Weight = $7 \text{ kg}$, Value = $\$100$.
        *   **{B}:** Weight = $5 \text{ kg}$, Value = $\$70$.
        *   **{C}:** Weight = $5 \text{ kg}$, Value = $\$70$.
        *   **{A, B}:** Weight = $7+5=12 \text{ kg}$. Exceeds capacity. (Invalid)
        *   **{A, C}:** Weight = $7+5=12 \text{ kg}$. Exceeds capacity. (Invalid)
        *   **{B, C}:** Weight = $5+5=10 \text{ kg}$. This fits perfectly. Value = $70+70 = \mathbf{\$140}$.
    *   Comparing all valid combinations, the maximum value is $\mathbf{\$140}$.

**Reflection:** The greedy algorithm picked Item A (value \$100) because it had the highest value-to-weight ratio. However, this choice left only 3 kg remaining, too little for any other item. The optimal solution was to pick Items B and C, which collectively have a lower average ratio than A, but their combined weight of 10 kg perfectly fills the knapsack for a total value of \$140. This clearly demonstrates how the greedy approach fails.

---

### Example 3: Harder - More items, same concept

**Problem Statement:** You have a knapsack with a capacity of $W = 20 \text{ kg}$.
Items available:
*   Item A: $w_A = 10 \text{ kg}$, $v_A = \$100$
*   Item B: $w_B = 6 \text{ kg}$, $v_B = \$50$
*   Item C: $w_C = 6 \text{ kg}$, $v_C = \$50$
*   Item D: $w_D = 6 \text{ kg}$, $v_D = \$50$
*   Item E: $w_E = 3 \text{ kg}$, $v_E = \$20$

**Identify what's given and what we want:**
Given: Knapsack capacity $W=20$. Items with weights ($w_i$) and values ($v_i$).
Want: Maximize total value by selecting items (0/1 choice) without exceeding capacity.

**Step-by-step solution:**

1.  **Calculate Value-to-Weight Ratios ($v_i/w_i$) for each item:**
    *   Item A: $r_A = \frac{100}{10} = 10.00 \text{ \$/kg}$
    *   Item B: $r_B = \frac{50}{6} \approx 8.33 \text{ \$/kg}$
    *   Item C: $r_C = \frac{50}{6} \approx 8.33 \text{ \$/kg}$
    *   Item D: $r_D = \frac{50}{6} \approx 8.33 \text{ \$/kg}$
    *   Item E: $r_E = \frac{20}{3} \approx 6.67 \text{ \$/kg}$
    *   *Explanation:* Item A has the highest ratio. B, C, D have the same next highest ratio. E is the least efficient.

2.  **Sort items by ratio in descending order:**
    *   Sorted order: A (10.00), B (8.33), C (8.33), D (8.33), E (6.67). (Order of B, C, D is arbitrary among themselves).
    *   *Explanation:* We prioritize Item A.

3.  **Apply Greedy Selection:**
    *   Initialize: $W_{curr} = 0$, $V_{curr} = 0$, $W_{rem} = 20 \text{ kg}$.
    *   **Pick Item A:**
        *   $w_A = 10 \text{ kg}$, $v_A = \$100$.
        *   Check if $w_A \le W_{rem}$: $10 \le 20$ (True).
        *   Add Item A.
        *   $W_{curr} = 10 \text{ kg}$. $V_{curr} = \$100$. $W_{rem} = 10 \text{ kg}$.
        *   *Explanation:* Item A is selected due to its highest ratio.
    *   **Pick Item B:**
        *   $w_B = 6 \text{ kg}$, $v_B = \$50$.
        *   Check if $w_B \le W_{rem}$: $6 \le 10$ (True).
        *   Add Item B.
        *   $W_{curr} = 10 + 6 = 16 \text{ kg}$. $V_{curr} = 100 + 50 = \$150$. $W_{rem} = 10 - 6 = 4 \text{ kg}$.
        *   *Explanation:* Item B fits in the remaining capacity.
    *   **Consider Item C:**
        *   $w_C = 6 \text{ kg}$, $v_C = \$50$.
        *   Check if $w_C \le W_{rem}$: $6 \le 4$ (False).
        *   Skip Item C.
        *   *Explanation:* Item C is too heavy for the remaining 4 kg.
    *   **Consider Item D:**
        *   $w_D = 6 \text{ kg}$, $v_D = \$50$.
        *   Check if $w_D \le W_{rem}$: $6 \le 4$ (False).
        *   Skip Item D.
        *   *Explanation:* Item D is also too heavy.
    *   **Consider Item E:**
        *   $w_E = 3 \text{ kg}$, $v_E = \$20$.
        *   Check if $w_E \le W_{rem}$: $3 \le 4$ (True).
        *   Add Item E.
        *   $W_{curr} = 16 + 3 = 19 \text{ kg}$. $V_{curr} = 150 + 20 = \$170$. $W_{rem} = 4 - 3 = 1 \text{ kg}$.
        *   *Explanation:* Item E fits in the remaining space.

4.  **Final Greedy Result:**
    *   Items selected: A, B, E
    *   Total Weight: $19 \text{ kg}$
    *   Total Value: $\mathbf{\$170}$

5.  **Verification (Optimal Solution):**
    *   Consider the greedy solution: {A, B, E} -> Value = $100+50+20 = \$170$. Weight = $10+6+3=19 \text{ kg}$.
    *   Now consider other combinations. What if we didn't pick A?
        *   If we pick B, C, D: Weight = $6+6+6 = 18 \text{ kg}$. Value = $50+50+50 = \mathbf{\$150}$. (This is less than greedy).
        *   What if we pick B, C, D, E? Weight = $18+3=21 \text{ kg}$. Exceeds capacity. (Invalid).
        *   What if we pick {B, C, D} and then try to fit A? $18+10=28$. Invalid.
        *   What if we pick {A, C, D}? Weight $10+6+6 = 22 \text{ kg}$. Exceeds capacity. (Invalid).
        *   What if we pick {B, C, D} (18kg, $150) and then try to fill the remaining 2kg? No item fits.
        *   Let's try to find a better combination. The key is that A takes 10kg. If we don't take A, we have 20kg to fill.
        *   If we take B, C, D (18kg, $150), we have 2kg left. No item fits. Value = $150.
        *   What if we take B, C, E? Weight = $6+6+3 = 15 \text{ kg}$. Value = $50+50+20 = \$120$.
        *   What if we take A and two other items? A is 10kg. We have 10kg left.
            *   A + B + C? $10+6+6 = 22 \text{ kg}$. Invalid.
            *   A + B + D? $10+6+6 = 22 \text{ kg}$. Invalid.
            *   A + (B or C or D) + E? A (10kg) + B (6kg) + E (3kg) = 19kg. Value $100+50+20 = \$170$. (This is the greedy solution).

    *   This example is tricky because the greedy solution actually *is* optimal. I need a new example where it clearly fails. The "harder" means more items, but the failure mechanism needs to be clear.

**Let's try a *new* Example 3 to ensure greedy fails:**

**Problem Statement:** You have a knapsack with a capacity of $W = 15 \text{ kg}$.
Items available:
*   Item A: $w_A = 10 \text{ kg}$, $v_A = \$100$
*   Item B: $w_B = 4 \text{ kg}$, $v_B = \$45$
*   Item C: $w_C = 4 \text{ kg}$, $v_C = \$45$
*   Item D: $w_D = 4 \text{ kg}$, $v_D = \$45$

**Identify what's given and what we want:**
Given: Knapsack capacity $W=15$. Items with weights ($w_i$) and values ($v_i$).
Want: Maximize total value by selecting items (0/1 choice) without exceeding capacity.

**Step-by-step solution:**

1.  **Calculate Value-to-Weight Ratios ($v_i/w_i$) for each item:**
    *   Item A: $r_A = \frac{100}{10} = 10.00 \text{ \$/kg}$
    *   Item B: $r_B = \frac{45}{4} = 11.25 \text{ \$/kg}$
    *   Item C: $r_C = \frac{45}{4} = 11.25 \text{ \$/kg}$
    *   Item D: $r_D = \frac{45}{4} = 11.25 \text{ \$/kg}$
    *   *Explanation:* Items B, C, D have higher ratios than Item A.

2.  **Sort items by ratio in descending order:**
    *   Sorted order: B (11.25), C (11.25), D (11.25), A (10.00). (Order of B, C, D is arbitrary).
    *   *Explanation:* We prioritize B, C, D due to their higher efficiency.

3.  **Apply Greedy Selection:**
    *   Initialize: $W_{curr} = 0$, $V_{curr} = 0$, $W_{rem} = 15 \text{ kg}$.
    *   **Pick Item B:**
        *   $w_B = 4 \text{ kg}$, $v_B = \$45$.
        *   Check if $w_B \le W_{rem}$: $4 \le 15$ (True).
        *   Add Item B.
        *   $W_{curr} = 4 \text{ kg}$. $V_{curr} = \$45$. $W_{rem} = 11 \text{ kg}$.
        *   *Explanation:* Item B is selected due to its high ratio.
    *   **Pick Item C:**
        *   $w_C = 4 \text{ kg}$, $v_C = \$45$.
        *   Check if $w_C \le W_{rem}$: $4 \le 11$ (True).
        *   Add Item C.
        *   $W_{curr} = 4 + 4 = 8 \text{ kg}$. $V_{curr} = 45 + 45 = \$90$. $W_{rem} = 11 - 4 = 7 \text{ kg}$.
        *   *Explanation:* Item C fits.
    *   **Pick Item D:**
        *   $w_D = 4 \text{ kg}$, $v_D = \$45$.
        *   Check if $w_D \le W_{rem}$: $4 \le 7$ (True).
        *   Add Item D.
        *   $W_{curr} = 8 + 4 = 12 \text{ kg}$. $V_{curr} = 90 + 45 = \$135$. $W_{rem} = 7 - 4 = 3 \text{ kg}$.
        *   *Explanation:* Item D fits.
    *   **Consider Item A:**
        *   $w_A = 10 \text{ kg}$, $v_A = \$100$.
        *   Check if $w_A \le W_{rem}$: $10 \le 3$ (False).
        *   Skip Item A.
        *   *Explanation:* Item A is too heavy for the remaining 3 kg.

4.  **Final Greedy Result:**
    *   Items selected: B, C, D
    *   Total Weight: $12 \text{ kg}$
    *   Total Value: $\mathbf{\$135}$

5.  **Verification (Optimal Solution):**
    *   Greedy solution: {B, C, D} -> Value = $45+45+45 = \$135$. Weight = $4+4+4=12 \text{ kg}$.
    *   Consider other combinations:
        *   What if we pick Item A? It takes 10 kg, leaving 5 kg.
            *   If we pick A (10kg, $100), we have 5kg remaining.
            *   Can we fit any other items? Yes, one of B, C, or D (4kg, $45).
            *   So, {A, B} (or A, C, or A, D): Weight = $10+4=14 \text{ kg}$. Value = $100+45 = \mathbf{\$145}$.
    *   Comparing the greedy solution (\$135) with {A, B} (\$145), the optimal solution is $\mathbf{\$145}$.

**Reflection:** In this example, the greedy algorithm prioritized items B, C, and D because they had a higher value-to-weight ratio. It filled the knapsack with these items, resulting in a total value of \$135. However, by taking the slightly less efficient Item A, and then one of B, C, or D, we could achieve a total value of \$145. This illustrates the failure of the greedy approach clearly. The greedy choice of B, C, and D, while locally optimal, prevented the inclusion of Item A which, when combined with another item, formed a better overall solution.

---

### Example 4: Tricky - Edge case with many items

**Problem Statement:** You have a knapsack with a capacity of $W = 12 \text{ kg}$.
Items available:
*   Item A: $w_A = 6 \text{ kg}$, $v_A = \$60$
*   Item B: $w_B = 6 \text{ kg}$, $v_B = \$60$
*   Item C: $w_C = 6 \text{ kg}$, $v_C = \$60$
*   Item D: $w_D = 1 \text{ kg}$, $v_D = \$11$
*   Item E: $w_E = 1 \text{ kg}$, $v_E = \$11$
*   Item F: $w_F = 1 \text{ kg}$, $v_F = \$11$
*   Item G: $w_G = 1 \text{ kg}$, $v_G = \$11$
*   Item H: $w_H = 1 \text{ kg}$, $v_H = \$11$
*   Item I: $w_I = 1 \text{ kg}$, $v_I = \$11$

**Identify what's given and what we want:**
Given: Knapsack capacity $W=12$. Items with weights ($w_i$) and values ($v_i$).
Want: Maximize total value by selecting items (0/1 choice) without exceeding capacity.

**Step-by-step solution:**

1.  **Calculate Value-to-Weight Ratios ($v_i/w_i$) for each item:**
    *   Items A, B, C: $r = \frac{60}{6} = 10.00 \text{ \$/kg}$
    *   Items D, E, F, G, H, I: $r = \frac{11}{1} = 11.00 \text{ \$/kg}$
    *   *Explanation:* The small items (D-I) all have a higher value-to-weight ratio than the large items (A-C).

2.  **Sort items by ratio in descending order:**
    *   Sorted order: D, E, F, G, H, I (all 11.00), then A, B, C (all 10.00).
    *   *Explanation:* We prioritize the small items due to their higher efficiency.

3.  **Apply Greedy Selection:**
    *   Initialize: $W_{curr} = 0$, $V_{curr} = 0$, $W_{rem} = 12 \text{ kg}$.
    *   **Pick D, E, F, G, H, I (all 1kg, $11):**
        *   Each fits. We pick all 6 of them.
        *   $W_{curr} = 6 \times 1 = 6 \text{ kg}$.
        *   $V_{curr} = 6 \times 11 = \$66$.
        *   $W_{rem} = 12 - 6 = 6 \text{ kg}$.
        *   *Explanation:* All small, high-ratio items are selected first.
    *   **Consider Item A:**
        *   $w_A = 6 \text{ kg}$, $v_A = \$60$.
        *   Check if $w_A \le W_{rem}$: $6 \le 6$ (True).
        *   Add Item A.
        *   $W_{curr} = 6 + 6 = 12 \text{ kg}$.
        *   $V_{curr} = 66 + 60 = \$126$.
        *   $W_{rem} = 6 - 6 = 0 \text{ kg}$.
        *   *Explanation:* Item A fits perfectly in the remaining space.
    *   **Consider Item B and C:**
        *   They do not fit as $W_{rem}$ is 0.

4.  **Final Greedy Result:**
    *   Items selected: D, E, F, G, H, I, A
    *   Total Weight: $12 \text{ kg}$
    *   Total Value: $\mathbf{\$126}$

5.  **Verification (Optimal Solution):**
    *   Greedy solution: {D,E,F,G,H,I,A} -> Value = $6 \times \$11 + \$60 = \$66 + \$60 = \$126$. Weight = $6 \times 1 + 6 = 12 \text{ kg}$.
    *   Consider other combinations:
        *   What if we pick two large items, say {A, B}?
            *   Weight = $6+6 = 12 \text{ kg}$.
            *   Value = $60+60 = \mathbf{\$120}$.
        *   This is less than the greedy solution.
        *   What if we pick A, B, C? Weight $18 \text{ kg}$. Invalid.
        *   What if we pick all small items? D-I (6 items). Weight 6kg, Value $66. Remaining 6kg. Could take A, B, or C. This is what greedy did.
        *   So the greedy solution looks pretty good here.

**Let's try a *new* Example 4 to ensure greedy fails:**

**Problem Statement:** You have a knapsack with a capacity of $W = 10 \text{ kg}$.
Items available:
*   Item A: $w_A = 9 \text{ kg}$, $v_A = \$90$
*   Item B: $w_B = 6 \text{ kg}$, $v_B = \$50$
*   Item C: $w_C = 6 \text{ kg}$, $v_C = \$50$
*   Item D: $w_D = 2 \text{ kg}$, $v_D = \$15$

**Identify what's given and what we want:**
Given: Knapsack capacity $W=10$. Items with weights ($w_i$) and values ($v_i$).
Want: Maximize total value by selecting items (0/1 choice) without exceeding capacity.

**Step-by-step solution:**

1.  **Calculate Value-to-Weight Ratios ($v_i/w_i$) for each item:**
    *   Item A: $r_A = \frac{90}{9} = 10.00 \text{ \$/kg}$
    *   Item B: $r_B = \frac{50}{6} \approx 8.33 \text{ \$/kg}$
    *   Item C: $r_C = \frac{50}{6} \approx 8.33 \text{ \$/kg}$
    *   Item D: $r_D = \frac{15}{2} = 7.50 \text{ \$/kg}$
    *   *Explanation:* Item A has the highest ratio.

2.  **Sort items by ratio in descending order:**
    *   Sorted order: A (10.00), B (8.33), C (8.33), D (7.50).
    *   *Explanation:* Item A is prioritized.

3.  **Apply Greedy Selection:**
    *   Initialize: $W_{curr} = 0$, $V_{curr} = 0$, $W_{rem} = 10 \text{ kg}$.
    *   **Pick Item A:**
        *   $w_A = 9 \text{ kg}$, $v_A = \$90$.
        *   Check if $w_A \le W_{rem}$: $9 \le 10$ (True).
        *   Add Item A.
        *   $W_{curr} = 9 \text{ kg}$. $V_{curr} = \$90$. $W_{rem} = 1 \text{ kg}$.
        *   *Explanation:* Item A is selected due to its highest ratio.
    *   **Consider Item B:**
        *   $w_B = 6 \text{ kg}$, $v_B = \$50$.
        *   Check if $w_B \le W_{rem}$: $6 \le 1$ (False).
        *   Skip Item B.
        *   *Explanation:* Item B is too heavy.
    *   **Consider Item C:**
        *   $w_C = 6 \text{ kg}$, $v_C = \$50$.
        *   Check if $w_C \le W_{rem}$: $6 \le 1$ (False).
        *   Skip Item C.
        *   *Explanation:* Item C is too heavy.
    *   **Consider Item D:**
        *   $w_D = 2 \text{ kg}$, $v_D = \$15$.
        *   Check if $w_D \le W_{rem}$: $2 \le 1$ (False).
        *   Skip Item D.
        *   *Explanation:* Item D is also too heavy.

4.  **Final Greedy Result:**
    *   Items selected: A
    *   Total Weight: $9 \text{ kg}$
    *   Total Value: $\mathbf{\$90}$

5.  **Verification (Optimal Solution):**
    *   Greedy solution: {A} -> Value = $\$90$. Weight = $9 \text{ kg}$.
    *   Consider other combinations:
        *