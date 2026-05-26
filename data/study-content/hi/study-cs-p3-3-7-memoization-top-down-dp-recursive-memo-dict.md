## 1. The one-sentence answer
**Memoization (top-down DP) stores results of expensive recursive calls in a dictionary so that identical subproblems are never recomputed.**

Aap recursion use karte ho kisi problem ko chhote subproblems mein todne ke liye. Har recursive call apna result ek memo dictionary mein store karti hai. Agar wohi subproblem dobara aaye, toh function turant dictionary se value return kar deta hai bina naye computation ke. Iska matlab yeh hai ki exponential time complexity wale recursion trees linear ya polynomial ban jaate hain jab overlapping subproblems exist karte hain.

Yeh approach naturally recursive code ko dynamic programming mein convert karti hai bina bottom-up iteration likhe. Aap sirf ek extra dictionary add karte ho aur function ke entry aur exit points par check karte ho.

> [!NOTE]
> The core “aha” moment is realising that recursion depth and call count are two different things; memoization attacks the call count while preserving the natural recursive structure.

## 2. Why this matters — concrete and current
Google’s TPUs use memoized attention patterns inside transformer inference pipelines; repeated key-query dot-product blocks for identical token prefixes are cached, cutting latency by 30–40 % on long-context prompts.

AlphaFold’s multiple sequence alignment stage memoizes pairwise HMM scores across millions of protein fragments; without memoization the same evolutionary distance calculations would be repeated billions of times.

Semiconductor place-and-route tools (Cadence Innovus, Synopsys IC Compiler) memoize Steiner-tree costs for identical net topologies during global routing; this single optimisation routinely saves hours on million-gate designs.

Modern chess engines (Stockfish NNUE) memoize evaluation scores of identical pawn-structure + piece-placement bitboards at the leaves of alpha-beta search, allowing deeper search within the same time budget.

Path-planning modules on Mars rovers (Perseverance) memoize cost-to-go values for grid cells that share identical elevation and rock-density features, enabling real-time replanning when new obstacles appear.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Recursion                | The algorithm is expressed as a recursive function that calls itself on smaller inputs. |
| Hash table / dictionary  | Provides O(1) average-time lookup and update for memo storage. |
| Overlapping subproblems  | The property that guarantees repeated calls to the same subproblem; without it memoization gives no benefit. |
| Optimal substructure     | Ensures the stored answer for a subproblem can be safely reused in larger solutions. |

If any row above feels unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the recursive structure
Plain Hinglish claim: Kisi bhi problem ko recursively solve karne ke liye pehle uske natural recursive breakdown dhundho.

Concrete example: Fibonacci series mein \(F(n) = F(n-1) + F(n-2)\).

Formal statement:  
$$F(n)=\begin{cases}0 & n=0\\1 & n=1\\F(n-1)+F(n-2) & n>1\end{cases}$$

> [!WARNING]
> Agar aap ne subproblem ko galat define kiya (jaise base case miss kiya), toh memo dictionary kabhi bhi hit nahi hogi aur recursion infinite ho sakta hai.

### Step 2 — Detect overlapping subproblems
Plain Hinglish claim: Recursion tree draw karke dekho kaunsi nodes baar-baar repeat ho rahi hain.

Concrete example: \(F(5)\) ke tree mein \(F(3)\) teen baar calculate hota hai.

Formal statement: Let \(S\) be the set of all subproblem identifiers; if \(|S| \ll\) number of recursive calls, overlapping exists.

### Step 3 — Add the memo dictionary
Plain Hinglish claim: Ek dictionary `memo` banao jo subproblem key ko uske already-computed answer se map kare.

Formal statement:  
`memo: Key → Value`, initially empty.

### Step 4 — Wrap the recursive function
Plain Hinglish claim: Function ke shuru mein check karo ki key already memo mein hai; agar hai toh turant return karo.

Formal statement:  
```python
if key in memo:
    return memo[key]
```

### Step 5 — Store the result before returning
Plain Hinglish claim: Recursive calls complete hone ke baad unka result memo mein daal do.

Formal statement:  
`memo[key] = result; return result`

### Step 6 — Analyse time complexity
Plain Hinglish claim: Har unique subproblem sirf ek baar solve hota hai; baaki calls O(1) dictionary lookup hain.

Formal statement: Time = \(O(|S| \cdot T_{\text{work}})\), where \(T_{\text{work}}\) is work outside recursive calls.

## 5. Worked examples — har step show karo

**Example 1 — Fibonacci(6)**  
*Given:* \(n=6\)  
*Find:* \(F(6)\) using memoization.  

```
def fib(n, memo={}):
    if n in memo: return memo[n]          # Step 4 check
    if n == 0: return 0
    if n == 1: return 1
    memo[n] = fib(n-1, memo) + fib(n-2, memo)  # Step 5 store
    return memo[n]
```
*Why:* Dictionary check prevents recomputation of \(F(3)\), \(F(4)\), etc.  
**Final answer: 8**

*Reflection:* Small example shows exponential tree collapsing to linear work; generalises to any linear recurrence.

**Example 2 — Number of ways to climb stairs (3 steps)**  
*Given:* 3 stairs, 1 or 2 steps at a time.  
*Find:* Memoized count.  

Call tree shows `ways(2)` computed twice; memo reduces calls from 5 to 3.  
**Final answer: 3**

*Reflection:* Demonstrates that even tiny inputs expose overlapping subproblems.

**Example 3 — 0/1 Knapsack (capacity 4, items [2,3], values [4,5])**  
*Given:* weights = [2,3], values = [4,5], W=4.  
*Find:* Maximum value.  

Memo key = (index, remaining_capacity). Four unique keys created; each solved once.  
**Final answer: 5**

*Reflection:* Two-dimensional state shows memo dictionary can hold tuples as keys.

**Example 4 — Longest common subsequence of “ABCBDAB” and “BDCAB”**  
*Given:* Two strings of length 7.  
*Find:* LCS length.  

State = (i,j). 49 possible states; memo ensures each pair examined at most once.  
**Final answer: 4**

*Reflection:* Quadratic states become quadratic time instead of exponential, the classic DP win.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to pass memo to recursive calls | Default argument behaviour in Python        | Always pass memo explicitly or use a wrapper |
| Using mutable default argument {} | Python caches default dict across calls     | Use `None` and create inside function        |
| Storing only the return value without key | Key construction mistake                    | Always include all varying parameters in key |
| Memoizing non-overlapping problems | Wasted memory with zero speedup             | Draw recursion tree first                    |
| Not handling base cases before memo check | Infinite recursion on edge inputs           | Place base-case checks before memo lookup    |
| Key collision with different types | Integer vs string “5” treated same          | Use typed tuples or consistent key format    |
| Ignoring space complexity         | Memo table grows with number of states      | Track |S| and decide if bottom-up table is cheaper |

## 7. The textbook-precise statement
Memoization is a top-down dynamic-programming technique that augments a recursive formulation with a dictionary that records the solutions to subproblems. Let \(P\) be a problem whose solution can be expressed by the recurrence  
\[OPT(i) = f(OPT(i_1),\dots,OPT(i_k))\]  
where each \(i_j \prec i\) under a well-founded order. If the set of reachable subproblems \(S\) satisfies \(|S| \ll T\) (where \(T\) is the number of recursive calls without memoization), then storing each \(OPT(i)\) the first time it is computed reduces total running time to \(\Theta(|S| \cdot T_{\text{work}})\).  

Cormen et al., *Introduction to Algorithms*, 4e, Chapter 14, Section 14.1.

## 8. Visual — diagram or schematic
```
F(6)
├── F(5)
│   ├── F(4)  ← memo hit later
│   └── F(3)  ← memo hit later
└── F(4)      ← memo hit
```
Labels: each node is a subproblem; dashed arrows indicate dictionary lookup instead of recomputation.

## 9. The memory technique

**The hook**  
Imagine a librarian who writes every answered question on a slip and pins it to a board; when the same question is asked again she simply reads the slip instead of re-solving the problem.

**What to overlearn**  
1. Key = complete state tuple (all parameters that change).  
2. Check memo before any work; write memo before return.  
3. Time = number of unique states × work per state.

**Spaced-repetition schedule**  
Review the three facts above after 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback**  
If you forget the code pattern, redraw the recursion tree, mark repeated nodes, and place a cache box beside each unique node; the cache box is the memo dictionary.

## 10. What this unlocks
Memoization is the gateway to all top-down DP patterns and to understanding when bottom-up tabulation is preferable.

- Bottom-up DP table construction  
- State-space reduction techniques  
- DP on trees and DAGs  
- Alpha-beta search with transposition tables  
- Caching layers in distributed systems

## 11. Self-check — five questions, no answers
1. Write a memoized recursive function for the number of binary strings of length n without consecutive 1s.  
2. How many unique states exist for the LCS problem on two strings of lengths m and n?  
3. What happens to correctness if you store the result after the return statement instead of before?  
4. Convert the memoized Fibonacci code into an iterative bottom-up version; compare space usage.  
5. Identify a recursion whose subproblems do not overlap; explain why memoization gives no asymptotic gain.