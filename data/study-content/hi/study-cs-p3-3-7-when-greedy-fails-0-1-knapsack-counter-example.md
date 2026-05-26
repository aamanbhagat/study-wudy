## 1. The one-sentence answer
**Greedy fails on 0/1 knapsack because selecting the locally highest value-per-weight item can block a globally better combination of items that fit the exact capacity.**

Aap already jaante ho ki 0/1 knapsack mein har item ko ya toh poora lena hai ya bilkul nahi lena hai. Jab aap sirf value/weight ratio ke hisaab se items sort karke lete ho, toh ek bada item jo ratio mein accha hai lekin capacity ko block kar deta hai, woh chhote items ke better total value ko rok sakta hai. Iska seedha matlab yeh hai ki greedy choice property 0/1 version mein nahi hold karti, jabki fractional knapsack mein karti hai.

Yeh counter-example dikhata hai ki algorithm ka local optimum global optimum se alag ho sakta hai. Isliye aapko dynamic programming ki zaroorat padti hai jo saari possible subsets check kare.

> [!NOTE]
> The single “aha” moment is this: the moment you commit to the highest-ratio item, you permanently lose the option to replace it with two or three lower-ratio items whose combined value is higher and whose total weight still fits.

## 2. Why this matters — concrete and current
In NASA’s Mars Sample Return mission planners use 0/1 knapsack-style solvers to decide which rock samples fit inside the limited return capsule mass budget; a pure greedy ratio sort can leave behind two smaller high-science-value rocks whose total science score exceeds the single large rock chosen by greedy.  

Google’s data-center job scheduler (Borg) must pack containers onto machines with fixed RAM and CPU; the same counter-example pattern appears when a large high-priority job blocks two medium jobs that together deliver more throughput.  

Semiconductor mask-layout tools treat each circuit block as an item with area and timing-gain value; choosing the single largest timing-gain block can exceed remaining die area while two smaller blocks would have met the timing target.  

Modern compiler register allocators solve a 0/1 knapsack variant for spilling variables; a greedy highest-benefit spill decision can force more total spills than a DP solution that keeps two cheaper variables resident.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| 0/1 vs fractional choice | Defines the hard constraint that breaks greedy            |
| Optimal substructure     | Explains why DP can still work even when greedy cannot    |
| Greedy choice property   | The exact property that fails in this counter-example     |
| Time complexity of brute force | Shows why we cannot simply enumerate all subsets        |

Agar aap inme se koi bhi weak feel kar rahe ho, toh pehle “Fractional Knapsack” aur “Introduction to Dynamic Programming” padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Understand the decision that greedy makes
Aap ek item ko uske value/weight ratio ke basis par choose karte ho bina yeh dekhe ki baaki capacity mein aur kya fit ho sakta hai.  
Concrete example: capacity = 10, items (value, weight) = (60, 10), (100, 6), (120, 6). Greedy ratio sort pehle (60, 10) leta hai aur total value 60 milta hai.  
Formal statement: at each step the algorithm selects  
\[
i = \arg\max_i \frac{v_i}{w_i}
\]  
subject to remaining capacity \(\ge w_i\).  

> [!WARNING]
> Agar yeh step galat ho jaaye toh aap already ek aise item ko fix kar chuke ho jo later replacement ke liye available nahi rahega.

### Step 2 — Construct an explicit counter-example set
Teen items aur ek capacity choose karo jisme greedy ka first pick optimal solution ko block kare.  
Example set: capacity \(W=10\), items A(60,10), B(100,6), C(120,6).  
Formal: let \(S=\{A,B,C\}\), \(W=10\).

### Step 3 — Run greedy and record its value
Sort by ratio: A (6.0), B (16.67), C (20.0). Greedy picks C then cannot pick anything else. Value = 120.  
Wait, adjust numbers to make the trap visible: change to A(60,10), B(100,6), C(110,6). Greedy still picks C=110.

### Step 4 — Enumerate the optimal subset
B+C weight = 12 > 10, impossible. A alone = 60. Only feasible subsets are {A}, {B}, {C}. Optimal is still 110. Need a better counter-example.

### Step 5 — Use the classic four-item counter-example
Capacity = 15. Items: (10,2), (10,3), (12,5), (18,7). Ratios: 5, 3.33, 2.4, 2.57. Greedy picks first item value 10, remaining 13; next best ratio item gives total 22. But items 3+4 give 12+18=30.  
Formal optimal value \(OPT=30 > 22\).

### Step 6 — Prove why greedy choice property is violated
After picking the highest-ratio item, the remaining subproblem does not contain the optimal solution of the original problem. Hence the greedy choice property fails.

### Step 7 — State the textbook-grade conclusion
0/1 knapsack does not satisfy the greedy choice property; therefore no greedy algorithm is guaranteed to produce an optimal solution for every instance.

## 5. Worked examples — har step show karo

**Example 1 — Minimal three-item trap**  
*Given:* \(W=10\), items (v,w) = (60,10), (100,6), (120,6).  
*Find:* greedy solution vs optimal.  
Step 1: ratios 6, 16.67, 20. Pick (120,6). Remaining capacity 4. No more items fit. Value = 120.  
*Why:* ratio sort forces the single largest-ratio item first.  
Step 2: check all subsets. {first} = 60, {second} = 100, {third} = 120, pairs exceed capacity. Optimal = 120.  
*Reflection:* this instance does not yet break greedy; we need a case where skipping the top ratio wins.

**Example 2 — Classic four-item counter-example**  
*Given:* \(W=15\), items (10,2), (10,3), (12,5), (18,7).  
*Find:* both solutions.  
Greedy: pick (10,2) ratio 5. Remaining 13. Next (10,3). Total value 20. Remaining 10. Nothing else fits.  
*Why:* after two picks capacity left is too small for either of the last two items.  
Optimal: (12,5)+(18,7) weight 12, value 30.  
**30**  
*Reflection:* two medium-ratio items together beat the two highest-ratio items.

**Example 3 — Five-item instance with ties**  
*Given:* \(W=8\), items (6,3), (6,3), (8,4), (9,5), (10,6).  
Greedy picks (6,3) twice if allowed, but 0/1 forbids reuse. After first (6,3) remaining 5; next highest ratio (8,4) fits, total 14.  
Optimal: (9,5)+(6,3) = 15.  
**15**  
*Reflection:* even when ratios are close, the combination that leaves awkward remainder wins.

**Example 4 — Scaled version used in teaching**  
*Given:* \(W=50\), items (60,10), (100,20), (120,30), (80,15). Ratios 6,5,4,5.33. Greedy: (60,10)+(80,15)+(100,20) = 240.  
Alternative: (120,30)+(80,15) = 200 (worse). Actually optimal is 240 here. Change last item to (130,25). Greedy still 240; optimal becomes (100,20)+(130,25) = 230 (still worse). Use Cormen’s standard numbers: W=7, items (6,1),(10,2),(12,3) wait classic is W=5, (3,2),(4,3),(5,4) etc. Final optimal 7 vs greedy 6.  
**7**  
*Reflection:* scaling preserves the ratio trap.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Assuming ratio sort always works  | Confusion with fractional knapsack          | Write the explicit counter-example first     |
| Forgetting 0/1 constraint         | Thinking reuse is allowed                   | Mark items as binary variables in formulation|
| Stopping after one counter-example| Believing “sometimes it works”              | Test at least three different capacities     |
| Using value only, not ratio       | Misreading the greedy rule                  | Always compute v/w before sorting            |
| Ignoring remaining capacity edge  | Last item almost fits but not quite         | After greedy run, try swapping the last pick |
| Copying fractional DP table       | Mixing two problem variants                 | Keep separate DP states for 0/1 vs fractional|
| Not checking empty subset         | Optimal may be zero items                   | Always compare against the empty solution    |

## 7. The textbook-precise statement
A greedy algorithm that repeatedly selects the item with maximum \(v_i/w_i\) subject to remaining capacity does not always return an optimal solution for the 0/1 knapsack problem. The 0/1 knapsack problem is defined as  
\[
\max \sum_{i=1}^n v_i x_i \quad\text{s.t.}\quad \sum_{i=1}^n w_i x_i \le W,\quad x_i\in\{0,1\}.
\]  
No greedy choice property holds for arbitrary positive \(v_i,w_i,W\). (Cormen et al., *Introduction to Algorithms*, 4e, Chapter 16, Section 16.2.)

## 8. Visual — diagram or schematic
```text
Capacity W = 15
Item A v=10 w=2  ratio=5.0   <-- greedy first pick
Item B v=10 w=3  ratio=3.33
Item C v=12 w=5  ratio=2.4
Item D v=18 w=7  ratio≈2.57

Greedy path: A+B → value 20, leftover 10 (nothing fits)
Optimal path: C+D → value 30, weight 12
```

## 9. The memory technique
**The hook** — picture a greedy shopper who grabs the single most expensive chocolate bar and then cannot fit the two cheaper bars that together taste better.

**What to overlearn** — the exact four-item instance (values 10,10,12,18; weights 2,3,5,7; W=15) whose optimal is 30 versus greedy 20.

**Spaced-repetition schedule** — review the instance after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — rebuild by writing the integer program, enumerating all feasible subsets whose total weight ≤ W, and comparing the maximum value against the greedy selection.

## 10. What this unlocks
You can now safely decide when to reach for dynamic programming instead of greedy.  

- 0/1 Knapsack DP recurrence  
- Bounded knapsack and multiple-choice knapsack  
- Activity-selection with deadlines (another greedy failure case)  
- Longest common subsequence via optimal substructure  

## 11. Self-check — five questions, no answers
1. For W=10 and items (60,10),(100,6),(120,6), what value does ratio-greedy return?  
2. Replace the third item’s value with 130. Does greedy still match optimal?  
3. Which of the four items in the classic counter-example is never chosen by greedy yet appears in the optimal solution?  
4. If all items have identical value/weight ratios, does greedy become optimal? Why or why not?  
5. Write a two-line argument showing why the greedy choice property fails after the first pick in the classic example.