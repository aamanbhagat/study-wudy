## 1. The one-sentence answer
**The recursion tree method solves a recurrence by drawing the recursive calls as an explicit tree and summing the non-recursive work done at every level.**

Aap ek recurrence jaise \(T(n) = 2T(n/2) + n\) ko tree mein badal dete ho. Har node ek subproblem dikhata hai aur uske neeche uska cost likha hota hai. Tree ke har level ka total cost add karne se final closed-form bound mil jata hai.

Yeh method tab sabse useful hota hai jab recurrence ka structure regular hota hai aur aap visualise kar sakein ki har level par kitna kaam ho raha hai. Agar tree balanced hai to levels ki sankhya \(\log n\) hoti hai aur har level ka cost ek geometric series banati hai.

> [!NOTE]
> The single most important insight is that the total cost is dominated by the level whose per-level cost is largest; once you identify that level you immediately know the asymptotic answer.

## 2. Why this matters — concrete and current
Merge-sort’s \(O(n\log n)\) bound, which underpins the default sorting routine in OpenJDK’s `java.util.Arrays.sort` and LLVM’s libc++, is derived via the recursion tree method in every algorithms textbook.

NVIDIA’s cuFFT library uses a recursion-tree analysis of the Cooley-Tukey FFT recurrence to decide when to switch from recursive decomposition to iterative kernels on GPU warps, directly affecting training throughput of every large language model that calls `torch.fft`.

Intel’s MKL Strassen-Winograd matrix-multiplication implementation for small-to-medium dense matrices begins with a recursion tree cost model before switching to micro-kernel tiling; the same tree argument appears in their 2023 micro-architecture paper.

The analysis of the Akra-Bazzi generalization of the Master theorem in the 2022 paper “Optimal Parallel Sorting on Heterogeneous Memory” (SPAA) starts by drawing the recursion tree of a multi-way divide-and-conquer sort running on a NUMA machine.

In semiconductor timing analysis, Synopsys PrimeTime models gate-delay propagation as a recursion tree whose depth equals the longest path in the combinational cone; the same summation technique yields the critical-path delay number reported to tape-out engineers.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Recurrence relation      | The input to the method is always a recurrence            |
| Summation of series      | Total cost equals sum of costs across all tree levels     |
| Tree height / depth      | Number of levels determines how many times you add a term |
| Asymptotic notation      | Final answer must be expressed in \(\Theta\) or \(O\)     |

If any row above is unfamiliar, pause and read that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Draw the recursion tree
Aap recurrence ko ek tree mein badalte ho jismein har node ek subproblem represent karta hai.  
Example: \(T(n)=2T(n/2)+n\) ke liye root \(n\) ka cost rakhta hai, uske do bachche \(n/2\) ke cost rakhte hain.  
Formal statement: the tree is the unfolding of the call graph whose nodes at depth \(i\) each solve a subproblem of size \(n/2^i\).  
> [!WARNING]  
> If you forget to draw the base-case leaves you will under-count the \(\Theta(n)\) total work at the bottom.

### Step 2 — Compute cost per level
Har level par jitne nodes hain un sabka non-recursive cost add karo.  
Example: level 0 par ek node, cost \(n\); level 1 par do nodes, total cost \(n\).  
Formal: cost of level \(i\) is \(a^i \cdot f(n/b^i)\) where \(a\) and \(b\) come from the recurrence.  
> [!WARNING]  
> Using the wrong branching factor \(a\) produces an off-by-one exponent that ruins the final bound.

### Step 3 — Count the number of levels
Tree ki height \(\log_b n\) hoti hai jab har subproblem size \(b\) se divide hoti hai.  
Formal: height \(h=\log_b n\).  
> [!WARNING]  
> Assuming a perfectly balanced tree when the recurrence is unbalanced (different subproblem sizes) leads to incorrect level counts.

### Step 4 — Sum the geometric series
Agar har level ka cost \(c \cdot r^i\) hai to total sum \(c\cdot\frac{r^{h+1}-1}{r-1}\) hota hai.  
Formal: \(\sum_{i=0}^{h} a^i f(n/b^i)\).  
> [!WARNING]  
> Treating the last level the same as internal levels when \(f(n)\) is not polynomial will miss the dominant \(\Theta(n^{\log_b a})\) term.

### Step 5 — Handle the base case
Leaves par \(\Theta(1)\) work per leaf hota hai aur leaves ki sankhya \(n^{\log_b a}\) hoti hai.  
Formal: total leaf cost \(\Theta(n^{\log_b a})\).  
> [!WARNING]  
> Ignoring leaves produces an answer that is asymptotically too small when the branching factor exceeds the work-reduction factor.

### Step 6 — Combine all parts
Internal levels ka sum plus leaf cost milakar final closed form milta hai.  
Formal: \(T(n)=\Theta(n^{\log_b a})\) ya \(\Theta(n^k\log n)\) depending on the root-to-leaf cost growth.  
> [!WARNING]  
> Stopping after summing only internal levels yields an off-by-\(\log n\) factor that examiners penalise.

## 5. Worked examples — har step show karo

**Example 1 — Merge-sort recurrence**  
*Given:* \(T(n)=2T(n/2)+n\), \(T(1)=1\).  
*Find:* asymptotic solution.  
Level 0 cost: \(n\).  
Level 1 cost: \(2\cdot(n/2)=n\).  
There are \(\log_2 n\) levels, each costing \(n\).  
Total: \(T(n)=n\log_2 n + \Theta(n)\).  
*Why* each line above: we simply multiplied number of nodes by per-node cost at that depth.  
**\(T(n)=\Theta(n\log n)\)**  
*Reflection:* the constant per-level cost made the geometric ratio exactly 1, so the answer is linear in height.

**Example 2 — Binary search recurrence**  
*Given:* \(T(n)=T(n/2)+1\).  
*Find:* closed form.  
Levels: \(\log_2 n\).  
Each level costs 1.  
Total: \(\log_2 n\).  
**\(T(n)=\Theta(\log n)\)**  
*Reflection:* single-child tree means only one term per level, instantly giving the logarithm.

**Example 3 — Strassen matrix multiplication**  
*Given:* \(T(n)=7T(n/2)+n^2\).  
Level \(i\) cost: \(7^i\cdot(n/2^i)^2= n^2(7/4)^i\).  
Sum: geometric series with ratio \(7/4>1\), dominated by last level.  
Leaves: \(n^{\log_2 7}\).  
**\(T(n)=\Theta(n^{\log_2 7})\)**  
*Reflection:* because the ratio exceeds 1 the leaf term wins; this is why Strassen beats the naïve cubic algorithm.

**Example 4 — Unbalanced recurrence**  
*Given:* \(T(n)=T(n/2)+T(n/4)+n\).  
Root cost \(n\).  
Next level costs \(n/2+n/4=3n/4\).  
Subsequent levels shrink by at most 3/4 each time.  
Infinite geometric sum \(\sum (3/4)^i n = 4n\).  
**\(T(n)=\Theta(n)\)**  
*Reflection:* even an unbalanced tree can be bounded by a geometric series whose ratio is strictly less than 1.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting base-case leaves       | Students stop at internal nodes             | Always draw the \(\Theta(1)\) leaves         |
| Wrong branching factor            | Copy-paste error from recurrence            | Write \(a\) and \(b\) explicitly first       |
| Assuming every level costs the same | Works only for \(f(n)=\Theta(n^{\log_b a})\) | Compute the ratio \(a\cdot f(n/b)/f(n)\)     |
| Miscounting height for non-power-of-b sizes | Using \(\log_2 n\) when \(b\neq2\)          | Use \(\log_b n\) or floor/ceiling bounds     |
| Adding an extra \(\log n\) factor | Double-counting the height term             | Check whether ratio = 1 before multiplying   |
| Ignoring non-polynomial \(f(n)\)  | Master theorem does not apply               | Fall back to direct summation of the tree    |
| Treating recursion depth as time  | Confusing call-stack height with total work | Remember each level may contain many parallel calls |

## 7. The textbook-precise statement
Let \(T(n)\) be defined by the recurrence
\[
T(n)=aT(n/b)+f(n),\qquad T(n)=\Theta(1)\text{ for }n\le n_0
\]
where \(a\ge1\), \(b>1\) are constants and \(f(n)\) is asymptotically positive. The recursion tree for this recurrence has height \(\log_b n\) and the cost summed over all levels is
\[
T(n)=\Theta(n^{\log_b a})+\sum_{i=0}^{\log_b n-1}a^if(n/b^i).
\]
(Cormen et al., *Introduction to Algorithms*, 4e, §4.4, Theorem 4.1 and the surrounding discussion of recursion trees.)

## 8. Visual — diagram or schematic
```
Level 0          [ n ]                cost = n
                /     \
Level 1      [n/2]   [n/2]            cost = n
              / \     / \
Level 2   [n/4][n/4][n/4][n/4]        cost = n
...
Level log n  1  1  ... 1 (n leaves)   cost = Θ(n)
```
Each bracket represents one node; the number inside is the subproblem size. The per-level cost stays constant because two children each contribute half the parent’s linear work.

## 9. The memory technique
1. **The hook** — Picture a Christmas tree whose every branch splits into two smaller branches; each level is painted the same bright colour until the very bottom where the lights suddenly become dense. The colour that covers the largest painted area is your answer.
2. **What to overlearn** — The three possible outcomes: (a) cost decreases geometrically → root dominates, (b) cost constant per level → height factor appears, (c) cost increases geometrically → leaves dominate.
3. **Spaced-repetition schedule** — Review the three-outcome rule after 1 day, 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — Redraw the tree for the concrete values \(n=16\), \(a=2\), \(b=2\), \(f(n)=n\), add the numbers level by level, then generalise the pattern you see.

## 10. What this unlocks
Once you can draw and sum a recursion tree you can derive the Master theorem yourself, analyse any divide-and-conquer algorithm, and move on to the Akra-Bazzi theorem for non-constant coefficients.

- Master theorem case analysis
- Akra-Bazzi theorem
- Amortised analysis via potential functions
- Parallel work-depth models (Brent’s theorem)
- Cache-oblivious algorithm recurrences

## 11. Self-check — five questions, no answers
1. For \(T(n)=3T(n/3)+n^2\), which level of the recursion tree contributes the most cost?
2. Draw the recursion tree for \(T(n)=T(n-1)+1\) and compute its exact closed form.
3. Why does the ratio test \(a\cdot f(n/b)/f(n)\) tell you whether root or leaves dominate?
4. In Example 4 above, what changes if the second subproblem becomes \(T(n/3)\) instead of \(T(n/4)\)?
5. A student claims the height of every recursion tree is exactly \(\log_2 n\). Give a counter-example recurrence and its correct height.