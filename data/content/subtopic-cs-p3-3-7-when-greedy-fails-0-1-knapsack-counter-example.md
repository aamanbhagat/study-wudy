## What it is
The 0/1 Knapsack problem is an optimization puzzle: given a set of items, each with a weight and a value, determine which items to include in a collection so that the total weight is less than or equal to a given limit (the knapsack's capacity) and the total value is as large as possible. The "0/1" property means you must either take an entire item (1) or leave it behind (0); you cannot take a fraction of an item. A greedy algorithm for this problem fails because making the locally best choice—like picking the item with the highest value-to-weight ratio—does not guarantee a globally optimal solution.

## Why it matters
The 0/1 Knapsack problem is a classic NP-hard problem, forming the foundation for understanding dynamic programming and computational complexity. In aerospace, this exact problem appears in cargo manifesting for a launch vehicle: given a fixed payload capacity (mass and volume), select the combination of scientific instruments and satellites that maximizes total mission value. In machine learning, it's analogous to feature selection, where you must choose a subset of features to include in a model to maximize predictive power without exceeding a computational budget.

## When to study it
Before tackling this, you must be comfortable with the following:
1.  **Greedy Algorithms:** You should understand the core concept of making a locally optimal choice at each step. You should have studied a problem where a greedy approach *does* work, such as the Fractional Knapsack problem or Dijkstra's algorithm for shortest paths.
2.  **Algorithm Analysis:** Basic understanding of time complexity, such as $O(n \log n)$.
3.  **Optimization Problems:** The general structure of a problem seeking to maximize or minimize a quantity subject to constraints.

If you haven't studied the Fractional Knapsack problem, do that first. The contrast between it and the 0/1 version is the entire point.

## How to study it (step by step)
1.  **Formalize the Problem:** Write down the mathematical definition of the 0/1 Knapsack problem. Define the inputs (weights $w_i$, values $v_i$, capacity $W$) and the objective function to maximize, including the constraint that the choice variable $x_i$ must be in $\{0, 1\}$.
2.  **Propose a Greedy Strategy:** The most intuitive greedy strategy is to calculate the value density, $\rho_i = v_i / w_i$, for each item. The strategy is then: sort items by descending density and add them to the knapsack in that order until no more items fit.
3.  **Construct a Counter-Example:** Create a simple scenario with 3-4 items and a carefully chosen knapsack capacity designed to make the greedy strategy fail. The key is to have the highest-density item "block" a combination of other items that is collectively more valuable.
4.  **Execute the Greedy Strategy:** Apply the density-based greedy algorithm to your counter-example. Calculate the total value obtained.
5.  **Find the Optimal Solution:** For the same counter-example, find the true optimal solution by inspection or by checking all possible combinations (since the example is small).
6.  **Compare and Analyze:** Compare the value from the greedy solution to the optimal solution. Articulate precisely *why* the greedy choice led to a suboptimal result, focusing on the "leftover capacity" after the first greedy choice was made.

## Key ideas, with intuition
1.  **Indivisibility is the Core Problem:** In the Fractional Knapsack problem, you can take a piece of an item. This guarantees that you can always completely fill the knapsack with the most value-dense substances. In the 0/1 version, an item is a discrete, "lumpy" unit. You cannot chop it up to perfectly fill the remaining space.
2.  **A Greedy Choice is a Commitment:** When the greedy algorithm picks the item with the highest value/weight ratio, it consumes a chunk of the knapsack's capacity. This commitment might be a mistake. It might prevent you from selecting two other items that, together, would have used the capacity more effectively to yield a higher total value, even if their individual ratios were lower.
    $$ \text{Greedy choice: } \max(\rho_1, \rho_2, ..., \rho_n) $$
    $$ \text{Optimal choice: } \max_{\text{all valid subsets}} \sum v_i $$
    The counter-example shows that the arguments that maximize these two expressions are not always the same.
3.  **The "Blocking" Effect:** The first, locally optimal choice can "block" the globally optimal solution. By taking item A, you might reduce the remaining capacity $W'$ to a point where the best remaining items, B and C, no longer fit together. However, the optimal solution might have been to forgo A entirely and just take B and C.

## Worked example
Let's define a knapsack and a set of items to demonstrate the failure of the value-density greedy strategy.

**Problem Setup:**
- Knapsack Capacity: $W = 50$ kg
- Items:
    - Item A: $v_A = 60$, $w_A = 10$ kg
    - Item B: $v_B = 100$, $w_B = 20$ kg
    - Item C: $v_C = 120$, $w_C = 30$ kg

**Step 1: Calculate Value Densities ($\rho = v/w$)**
- $\rho_A = 60 / 10 = 6$
- $\rho_B = 100 / 20 = 5$
- $\rho_C = 120 / 30 = 4$

The sorted order by density is A, then B, then C.

**Step 2: Apply the Greedy Strategy**
1.  **Select Item A:** It has the highest density.
    - Add Item A to the knapsack.
    - Current value: $60$.
    - Remaining capacity: $50 - 10 = 40$ kg.
2.  **Select Item B:** It's the next highest density.
    - Add Item B to the knapsack.
    - Current value: $60 + 100 = 160$.
    - Remaining capacity: $40 - 20 = 20$ kg.
3.  **Attempt to Select Item C:** It's the last item.
    - Weight of Item C is $30$ kg.
    - Remaining capacity is only $20$ kg. We cannot add Item C.

**Greedy Solution:**
- Items taken: {A, B}
- Total Value: $160$
- Total Weight: $30$ kg

**Step 3: Find the Optimal Solution (by inspection)**
Let's check other combinations:
- {A, B}: Value 160, Weight 30. (Greedy solution)
- {A, C}: Value 180, Weight 40.
- {B, C}: Value 220, Weight 50.
- {A, B, C}: Weight 60, exceeds capacity.
- {A}: Value 60.
- {B}: Value 100.
- {C}: Value 120.

**Optimal Solution:**
- Items taken: {B, C}
- Total Value: $220$
- Total Weight: $50$ kg

**Reflection:**
The greedy algorithm produced a value of $160$, while the optimal solution is $220$. The strategy failed because the initial, locally optimal choice of taking Item A (density 6) "blocked" the globally optimal solution. Taking A used up just enough capacity ($10$ kg) to prevent us from taking both B and C, whose combined value is much higher. The optimal strategy involved skipping the highest-density item to enable a better combination of lower-density items.

## Diagrams
Here is an ASCII diagram illustrating the knapsack state for both the greedy and optimal solutions.

**Greedy Solution (Value: 160)**
```text
Capacity: 50
|==================================================|
|AAAAAAAAAA|BBBBBBBBBBBBBBBBBBBB|..................|
| (10 kg)  |      (20 kg)       |  (20 kg unused)  |
| Value 60 |     Value 100      |                  |
+--------------------------------------------------+
0          10                   30                 50
```

**Optimal Solution (Value: 220)**
```text
Capacity: 50
|==================================================|
|BBBBBBBBBBBBBBBBBBBB|CCCCCCCCCCCCCCCCCCCCCCCCCCCCCC|
|      (20 kg)       |           (30 kg)            |
|     Value 100      |          Value 120           |
+--------------------------------------------------+
0                    20                             50
```
The diagrams clearly show that the greedy choice left a "gap" of unused capacity, whereas the optimal solution filled the knapsack completely with a more valuable combination.

## Memory technique — remember this forever
1.  **The Story: "The Tourist's Mistake"**
    Imagine a tourist in a gift shop with a small carry-on bag. The first thing they see is a very heavy, very dense, moderately valuable crystal sculpture (high value/weight ratio). They grab it, and it almost fills their bag. They then walk past two large, light, and extremely valuable paintings. Together, the paintings are worth far more than the crystal, and they would have fit perfectly in the empty bag. But because the tourist made the "greedy" choice for the dense crystal first, they can no longer fit the paintings. The indivisibility of the crystal (they couldn't break a piece off) led to the suboptimal outcome.

2.  **Must Overlearn:**
    - Problem: Maximize $\sum_{i=1}^{n} v_i x_i$ subject to $\sum_{i=1}^{n} w_i x_i \le W$ and $x_i \in \{0, 1\}$.
    - Reason for failure: **Local optimum ≠ Global optimum** due to **item indivisibility**.

3.  **Spaced Repetition Schedule:**
    - Review this concept in: 1 day, 3 days, 7 days, 16 days, 35 days. Each time, try to reconstruct the worked example from memory.

4.  **First Principles Pathway:**
    If you forget the details, rebuild it.
    - **Goal:** Prove greedy fails.
    - **Greedy Heuristic:** Use the best one, value/weight ratio.
    - **How to make it fail?** The first choice must be a mistake. Make the highest-ratio item "block" a better combo.
    - **Setup:**
        - Knapsack of capacity $W$.
        - Item A: Highest ratio, small weight $w_A$.
        - Items B & C: Lower ratios, but $v_B + v_C > v_A$ and $w_B + w_C \approx W$.
        - Crucially, ensure $w_A + w_B > W$ or $w_A + w_C > W$ so that picking A prevents picking the full optimal set.
    - Now just plug in simple numbers until it works, like in the worked example.

## Common mistakes
1.  **Confusing 0/1 with Fractional Knapsack:** Students forget that the ability to take fractions of an item in the Fractional version is precisely what allows the greedy strategy to work. Always check if items are divisible.
2.  **Trying other Greedy Strategies:** Thinking "maybe sorting by highest value first would work?" or "lowest weight first?". All simple greedy strategies fail for the general 0/1 Knapsack problem. You can construct counter-examples for them as well. The value-density one is just the most robust-seeming, which makes its failure the most instructive.
3.  **Assuming the Optimal Solution Fills the Knapsack:** In our worked example, the optimal solution happened to use the full capacity. This is not always the case. The optimal solution might leave some capacity unused if the available items don't fit well.

## Self-check
1.  Using the items from the worked example, what is the minimum knapsack capacity $W$ for which the greedy solution (by value/weight ratio) is also the optimal solution?
2.  Construct a new set of four items and a knapsack capacity $W$ where the greedy strategy fails, and the optimal solution requires leaving at least 5kg of capacity unused.
3.  Prove or disprove the following statement: "For any instance of the 0/1 Knapsack problem where all items have the same weight, the greedy strategy of picking items in descending order of value is always optimal."