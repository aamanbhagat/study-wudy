## 1. The one-sentence answer
**Dynamic programming solves overlapping subproblems with optimal substructure by storing results of subproblems in a table instead of recomputing them.**

Iska matlab yeh hai ki jab ek problem ko chhote pieces mein tod sakte ho aur woh pieces baar-baar repeat ho rahe hon, to unke answers ko ek array ya matrix mein rakh lo. Fibonacci series mein har number do pehle numbers ka sum hota hai, isliye pehle computed values ko reuse karne se exponential time O(2^n) se linear O(n) ho jaata hai. Coin change aur 0/1 knapsack mein bhi yahi principle kaam karta hai: har subproblem ka optimal ya count value table mein store karo aur aage badho.

Yeh approach tabhi kaam karti hai jab problem optimal substructure dikhaye — matlab badi problem ka best solution chhoti problems ke best solutions se ban sake. Recursion se shuru karo, phir memoization add karo, aur finally bottom-up tabulation tak pahuncho.

> [!NOTE]
> The single most important “aha” is that the same subproblem state (index + remaining capacity or remaining sum) will be asked thousands of times; caching it once turns an exponential tree into a DAG of size equal to the number of distinct states.

## 2. Why this matters — concrete and current
Google’s OR-Tools and Amazon’s route-optimisation engines use 0/1-knapsack-style DP inside their bin-packing solvers that decide which parcels fit into a delivery van of limited volume and weight; each van loading decision runs in milliseconds because the DP table is pre-sized to realistic parcel counts.

Coin-change DP (minimum coins) appears inside the Linux kernel’s page-frame allocator and inside modern SSD firmware when the controller must decide how many erase blocks of different sizes to combine to satisfy a write request of exact byte length; both systems need the absolute minimum number of operations.

NASA’s Europa Clipper mission planning software models instrument data budgets as a 0/1 knapsack where each scientific instrument is an item with a “value” (scientific return) and a “weight” (power + downlink time); the DP solution guarantees the highest scientific return under the strict power cap of the spacecraft.

LeetCode and Codeforces problems on Fibonacci and coin change are used by Jane Street and Hudson River Trading as the first filter in their quant-developer interviews; candidates who cannot produce the O(n) or O(n·amount) DP versions are rejected before the probability and stochastic-calculus rounds begin.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Recursion & call stack   | DP is recursion with memoisation; you must see the recursion tree first |
| 2-D array indexing       | Bottom-up tables for knapsack are 2-D; off-by-one errors are fatal |
| Time–space trade-off     | You will convert O(n) space Fibonacci DP into O(1) space; same idea appears in knapsack space optimisation |

Agar upar ke teen concepts comfortable nahi hain to recursion aur array basics pehle revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify overlapping subproblems
Plain Hinglish claim: Jab recursion tree mein ek hi state kai baar call ho rahi ho, tab us state ka answer ek baar calculate karke store kar lo.  
Concrete example: fib(5) = fib(4)+fib(3); fib(4) = fib(3)+fib(2); fib(3) do baar calculate ho raha hai.  
Formal statement:  
$$T(n) = T(n-1)+T(n-2),\quad T(0)=0,\ T(1)=1.$$  
> [!WARNING] Agar aap sirf recursion likh ke ruk jaoge to exponential time rahega; overlapping ko pehchanna zaroori hai.

### Step 2 — Define the state clearly
State ko aise define karo ki woh saare necessary parameters contain kare. Fibonacci ke liye state sirf n hai; coin change ke liye (index, remainingAmount) ya (remainingAmount) dono chalte hain. 0/1 knapsack ke liye state (i, W) = first i items aur capacity W.

### Step 3 — Write the recurrence
Fibonacci:  
$$dp[n] = dp[n-1] + dp[n-2]$$  
Coin change count:  
$$dp[x] = \sum_{c\in coins} dp[x-c] \quad (x\ge c)$$  
Coin change min coins:  
$$dp[x] = \min_{c\in coins}(dp[x-c])+1$$  
0/1 knapsack:  
$$dp[i][w] = \max(dp[i-1][w],\ dp[i-1][w-w_i]+v_i)$$  
> [!WARNING] Galat recurrence likhne se poora table galat ho jaata hai; har transition ko problem statement se match karo.

### Step 4 — Choose memoisation or bottom-up
Top-down (memo) recursion tree ko directly cache karta hai. Bottom-up table ko chhote se bade ki taraf bharata hai. Dono ka final complexity same hoti hai.

### Step 5 — Analyse complexity
States ki sankhya × transitions per state = time. Fibonacci: O(n) states, O(1) work → O(n). Knapsack: O(nW) states, O(1) work → O(nW).

### Step 6 — Space optimisation (optional but powerful)
Jab nayi row purani row par depend karti hai, to do arrays ya ek 1-D array se kaam chal jaata hai. Fibonacci O(1) space tak pahunch jaata hai.

### Step 7 — Textbook-grade statement
A problem exhibits optimal substructure and overlapping subproblems if and only if an optimal solution to the problem contains optimal solutions to its subproblems and the total number of distinct subproblems is polynomial in the input size.

## 5. Worked examples — har step show karo

**Example 1 — Fibonacci(6)**  
*Given:* n = 6  
*Find:* 6th Fibonacci number using bottom-up DP  
dp[0] = 0, dp[1] = 1  
dp[2] = dp[1]+dp[0] = 1  
dp[3] = dp[2]+dp[1] = 2  
dp[4] = dp[3]+dp[2] = 3  
dp[5] = dp[4]+dp[3] = 5  
dp[6] = dp[5]+dp[4] = 8  
**8**  
*Reflection:* Sirf ek loop chala, har value ek baar hi calculate hui.

**Example 2 — Coin change count (coins = [1,2,3], amount = 4)**  
*Given:* coins = [1,2,3], amount = 4  
*Find:* number of combinations  
dp[0] = 1  
dp[1] = dp[1-1] = 1  
dp[2] = dp[2-1]+dp[2-2] = 2  
dp[3] = dp[3-1]+dp[3-2]+dp[3-3] = 3  
dp[4] = dp[4-1]+dp[4-2]+dp[4-3] = 4  
**4**  
*Reflection:* Order-insensitive combinations count hui kyunki humne coins ko outer loop mein rakha.

**Example 3 — Coin change minimum coins (same input)**  
dp[0] = 0, dp[x] = ∞ initially  
dp[1] = min(∞, dp[0]+1) = 1  
dp[2] = min(dp[1]+1, dp[0]+1) = 1 (using coin 2)  
dp[3] = 1 (using coin 3)  
dp[4] = 2 (2+2)  
**2**  
*Reflection:* min operation se greedy 3+1 wala galat answer avoid ho gaya.

**Example 4 — 0/1 Knapsack (n=3, W=5, weights=[2,3,4], values=[3,4,5])**  
dp[0][w] = 0 for all w  
i=1 (w=2,v=3): dp[1][5] = max(dp[0][5], dp[0][3]+3) = 3  
i=2 (w=3,v=4): dp[2][5] = max(dp[1][5], dp[1][2]+4) = 7  
i=3 (w=4,v=5): dp[3][5] = max(dp[2][5], dp[2][1]+5) = 7  
**7**  
*Reflection:* Item 2 aur item 3 dono lene ki koshish 7 deti hai; table ne sab possible subsets check kiye.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using same array index for both loops in coin change | Students copy unbounded-knapsack template without thinking | Outer loop coins, inner loop amount for combinations |
| Initialising dp[0] = 0 for count problems | They forget the empty-set case | Always set dp[0] = 1 for counting combinations |
| Forgetting to handle amount < coin inside inner loop | Off-by-one thinking | Add explicit if (x >= c) guard |
| Using 2-D table when 1-D suffices | Over-generalising from 0/1 to unbounded | Check recurrence: agar sirf previous row chahiye to 1-D karo |
| Returning dp[n] instead of dp[W] in knapsack | Variable-name confusion | Always name capacity dimension W |
| Memo key missing one parameter | State definition incomplete | Write state tuple on paper before coding |
| Not resetting dp table between test cases | Global array reuse | Use local arrays or explicit memset |

## 7. The textbook-precise statement
Cormen et al., *Introduction to Algorithms*, 4e, Chapter 15 states: “A dynamic-programming algorithm solves each subproblem just once and then saves its answer in a table, thereby avoiding the work of recomputing the answer every time the subproblem is encountered.” The chapter requires that the problem possess (1) optimal substructure and (2) overlapping subproblems, and that the number of distinct subproblems be polynomial in the input size.

## 8. Visual — diagram or schematic
```
          fib(5)
         /      \
     fib(4)     fib(3)
     /   \       /   \
  fib(3) fib(2) fib(2) fib(1)
```
Arrows point back to already-computed nodes; the two fib(3) and two fib(2) calls are the overlaps that memoisation removes.

## 9. The memory technique

1. **The hook** — Imagine a library where every Fibonacci number, every coin amount and every knapsack capacity has its own shelf; once a book (answer) is placed on the shelf you never recompute it.
2. **What to overlearn** — dp[n] = dp[n-1]+dp[n-2]; dp[x] += dp[x-c]; dp[i][w] = max(…); O(nW) time for classic knapsack.
3. **Spaced-repetition schedule** — Review the four recurrences after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Draw the recursion tree on paper, circle repeated states, then build the table whose rows/columns exactly match those states.

## 10. What this unlocks
- Unbounded knapsack, longest common subsequence, edit distance, matrix-chain multiplication
- Bitset optimisations and convex-hull trick for harder DP
- State compression techniques used in competitive programming and in reinforcement-learning value iteration

## 11. Self-check — five questions, no answers
1. Compute fib(10) with both top-down memo and bottom-up; verify answers match.
2. For coins = [1,3,4] and amount = 6, how many combinations exist?
3. Why does swapping the two loops in the coin-change count code change the answer from combinations to permutations?
4. In 0/1 knapsack, what happens to the answer if you allow an item to be taken twice?
5. Reduce the space of the 0/1 knapsack DP from O(nW) to O(W) and prove the new code still produces the correct optimum.