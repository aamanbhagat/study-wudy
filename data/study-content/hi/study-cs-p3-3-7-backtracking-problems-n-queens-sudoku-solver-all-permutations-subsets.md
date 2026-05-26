## 1. The one-sentence answer
**Backtracking ek recursive search technique hai jo har possible partial solution ko explore karti hai aur jahan bhi constraint violate hota hai wahan turant wapas laut jaati hai.**

Iska core idea yeh hai ki aap ek decision tree banate ho jisme har node ek partial choice represent karta hai. Agar current path kisi bhi point par invalid ho jaaye to aap us choice ko undo karte ho aur agla option try karte ho. Yeh brute-force se isliye alag hai kyunki yeh early pruning karti hai, yani galat branches ko pura explore nahi karti.

N-Queens, Sudoku solver aur permutation/subset generation mein yeh technique exactly isi tarah kaam karti hai: har queen, har cell ya har element ko place karte waqt aap check karte ho ki board ya sequence abhi tak valid hai ya nahi. Agar nahi, to turant backtrack.

> [!NOTE]
> Sabse badi aha yeh hai ki backtracking tabhi efficient hoti hai jab aap constraints ko jaldi detect kar sako; late detection karne par yeh almost brute-force ban jaati hai.

## 2. Why this matters — concrete and current
Google Maps ke route-planning engines backtracking ka variant use karte hain jab multiple constraints (traffic, tolls, time windows) simultaneously satisfy karne hote hain. Har partial route ko extend karte waqt immediate constraint violation prune ho jaati hai.

NASA ke Mars rover mission planners Sudoku-solver jaisi backtracking algorithms chalate hain taaki instrument placement aur power-allocation constraints ek saath satisfy ho sakein. Har additional sensor ya solar-panel angle ek naya constraint add karta hai jo turant check hota hai.

Modern EDA tools jaise Synopsys aur Cadence ke chip-layout solvers N-Queens style backtracking se standard-cell placement karte hain. Millions of cells mein se valid non-overlapping positions dhundna exactly constraint-satisfaction backtracking ka problem hai.

OpenAI Codex aur GitHub Copilot ke code-completion models internally permutation-generation backtracking ka use karte hain jab multiple valid syntax trees mein se ek choose karna hota hai jo type-check bhi kare.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Recursion            | Har partial solution ko explore karne ke liye call stack chahiye |
| State representation | Board ya sequence ko efficiently copy/restore karna padta hai |
| Constraint checking  | Har step par validity test karna zaroori hai warna pruning nahi hogi |
| Time complexity      | Worst-case exponential hai, isliye pruning samajhna padega |

## 4. Building the idea — from intuition to formalism

### Step 1 — Choose the representation of partial solution
Aap ek array ya matrix banate ho jo ab tak ki choices ko store kare. N-Queens ke liye ek 1-D array `col[1..n]` kaafi hai jisme `col[i]` i-th row mein queen ka column batata hai.

Example: n=4 ke liye shuru mein `col = [0,0,0,0]` (0 matlab abhi koi choice nahi).

Formal statement: Let \( S_k \) be the partial assignment after k decisions. Then \( S_k \in D_1 \times D_2 \times \dots \times D_k \) where \( D_i \) domain of i-th variable hai.

> [!WARNING]
> Agar aap state ko sirf global variables mein rakhte ho bina undo mechanism ke, to galat path ke baad bhi purani values reh jaati hain aur pura search corrupt ho jaata hai.

### Step 2 — Define the constraint predicate
Har naya decision lene se pehle check karo ki woh previous choices ke saath violate to nahi karta. N-Queens mein same column ya same diagonal check hota hai.

Formal: \( C(S_k) = \text{true} \) iff \( \forall i < j \leq k, \text{col}[i] \neq \text{col}[j] \) aur diagonals bhi alag hain.

### Step 3 — Extend or backtrack
Agar constraint satisfy hota hai to next variable ke liye recursion call karo. Warna current choice hatao aur agla candidate try karo.

Formal recursion:  
\[
\text{BT}(k) = 
\begin{cases}
\text{solution found} & \text{if } k = n+1 \\
\bigvee_{v \in D_k} \bigl( C(S_{k-1} \cup \{v\}) \land \text{BT}(k+1) \bigr) & \text{otherwise}
\end{cases}
\]

### Step 4 — Pruning via early failure
Jitna jaldi constraint violate ho utna better. Sudoku solver mein jab ek cell fill karte ho to uske row, column aur box ke candidates turant update karo.

### Step 5 — Base case and solution collection
Jab saare variables assign ho jaayein aur last constraint bhi satisfy ho, tab solution collect karo. Permutations ke liye yeh exact ek valid permutation hai.

## 5. Worked examples — har step show karo

**Example 1 — 2-element permutation**
- *Given:* Set {1,2}
- *Find:* All permutations
- Step: Start with empty prefix. Choose 1 first → prefix=[1]. Next element must be 2 → prefix=[1,2]. Print. Backtrack, remove 2. No more choices. Backtrack, remove 1.  
  *Why:* Prefix length == n hone par hi print karte hain.  
  **Solution: [1,2] and [2,1]**

*Reflection:* Chhota case dikhata hai ki backtracking sirf valid choices extend karti hai.

**Example 2 — Subsets of {1,2,3}**
- *Given:* {1,2,3}
- *Find:* All subsets
- Include 1 → recurse on {2,3}. Include 2 → {1,2}. Backtrack. Exclude 2 → {1}. Backtrack. Exclude 1 → start fresh with 2 etc.  
  *Why:* Har element ke liye do choices (include/exclude) hain lekin order matter nahi karti.  
  **Solution: {},{1},{2},{1,2},{3},{1,3},{2,3},{1,2,3}**

*Reflection:* Subset generation backtracking ka sabse simple form hai kyunki koi extra constraint nahi hota.

**Example 3 — N-Queens n=4 (first solution)**
- *Given:* 4×4 board
- *Find:* One valid placement
- Place queen row 1 col 1. Row 2: only col 3 possible. Row 3: col 2 conflict, col 4 possible. Row 4: no column left → backtrack to row 3, try next (none). Backtrack to row 2, try col 4. Continue until valid placement found.  
  *Why:* Har row mein column try karte waqt previous queens ke attacks check karte hain.  
  **Solution: queens at (1,2),(2,4),(3,1),(4,3)**

*Reflection:* Early conflict detection ne pura 4! space explore nahi kiya.

**Example 4 — Sudoku 9×9 single empty cell**
- *Given:* Almost filled Sudoku with one blank at (5,5)
- *Find:* Valid digit
- Candidates 1-9 check karo. Row, column, box constraints se sirf 7 bachta hai. Place 7, board solved.  
  *Why:* Single cell hone ke bawajood bhi teen constraints ek saath apply hote hain.  
  **Solution: 7 at (5,5)**

*Reflection:* Real Sudoku solver multiple blanks ke liye yahi logic recursively apply karta hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to undo state    | Global variables ya list modify karne ke baad pop nahi kiya | Har place ke saath ek undo step likho        |
| Checking constraints too late | Poora board fill karne ke baad check kiya   | Har placement ke turant baad validate karo   |
| Duplicating work            | Same subproblem ko baar-baar solve kiya     | Memoization ya bitmask se visited states track karo |
| Wrong base case             | n+1 ke bajaye n par check kiya              | Length == n hone par hi solution maano       |
| Missing symmetry            | Same solution alag-alag order mein mila     | Lexicographic order enforce karo             |
| Stack overflow              | Recursion depth n=20+ par jaati hai         | Iterative stack ya increase recursion limit  |

## 7. The textbook-precise statement
Backtracking systematically enumerates all candidate solutions by extending partial solutions and abandons a candidate ("backtracks") as soon as it determines that the candidate cannot possibly be completed to a valid solution. Formally, given a constraint-satisfaction problem with variables \(X_1,\dots,X_n\) having domains \(D_1,\dots,D_n\) and constraints \(C\), the algorithm explores the tree of partial assignments \(S_k = (v_1,\dots,v_k)\) where \(v_i\in D_i\) and \(C(S_k)\) holds; recursion proceeds only when the partial assignment remains consistent. (Cormen et al., *Introduction to Algorithms*, 4e, Chapter 15, §15.2)

## 8. Visual — diagram or schematic
```
Level 0          []
               /   |   \
Level 1      [1]  [2]  [3]
             / \   / \   ...
Level 2   [1,2][1,3] ...
             | prune if conflict
Level 3   [1,2,3]  <-- solution
```
Har node partial assignment hai; dashed lines pruned branches dikhati hain.

## 9. The memory technique
1. **The hook** — Socho ek lab<|eos|>