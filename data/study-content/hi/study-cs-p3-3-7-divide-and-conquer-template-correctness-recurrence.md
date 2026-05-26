## 1. The one-sentence answer
**Divide and conquer** is a recursive algorithm template that splits a problem into independent smaller subproblems of the same form, solves them, and combines their results.

Aap ek badi problem ko do ya teen chhote identical problems mein todte ho, har ek ko recursively solve karte ho, aur phir unke answers ko ek saath jodte ho. Iska seedha matlab yeh hai ki time complexity aksar \(T(n) = aT(n/b) + f(n)\) ki form mein aa jaati hai. Correctness proof ke liye aap base case, inductive hypothesis aur combine step ko alag-alag verify karte ho.

> [!NOTE]
> The single most important “aha” is that the same recurrence template works for both analysis and correctness: once you write the recurrence correctly, proving both time bound and correctness becomes mechanical induction.

## 2. Why this matters — concrete and current
Strassen’s matrix multiplication (1969) reduced the exponent of matrix multiplication from 3 to \(\approx 2.807\) and is still the basis of every modern linear-algebra library used in aerospace trajectory optimisation at NASA and ESA.

FFT-based polynomial multiplication inside NVIDIA’s cuFFT and Intel MKL makes real-time 8K video encoding and transformer training feasible; without the \(O(n\log n)\) divide-and-conquer step these workloads would be 50–100× slower.

Merge sort inside the Linux kernel’s `sort()` and glibc’s `qsort()` handles millions of elements during every package-manager database rebuild on every Linux server worldwide.

Closest-pair-of-points algorithm (divide-and-conquer version) is the core geometric primitive inside Google Maps’ route-snapping and every modern VLSI placement tool at TSMC and Intel.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Recursion                | The conquer step is literally a recursive call            |
| Induction                | The standard way to prove both correctness and \(T(n)\)   |
| Asymptotic notation      | We express the final running time using \(\Theta\)        |
| Master theorem (basic)   | Gives closed form for most divide-and-conquer recurrences |

If any of these four feel shaky, pause and revise them first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify independent subproblems
Aap problem ko aise parts mein todte ho ki har part ka solution doosre parts par depend na kare.  
Concrete example: array ko do halves mein todna merge-sort ke liye.  
Formal statement: given instance \(P(n)\), produce \(a\) independent instances each of size \(n/b\).  
> [!WARNING] Agar subproblems overlap (jaise Fibonacci), divide-and-conquer exponential ho jaata hai; dynamic programming chahiye.

### Step 2 — Write the combine function
Subproblems ke answers ko \(O(f(n))\) time mein merge karna hota hai.  
Example: merge-sort mein do sorted halves ko merge karna.  
Formal: \(C(n) \in \Theta(f(n))\).  
> [!WARNING] Combine step agar \(\Theta(n^2)\) ho jaaye to poora algorithm slow ho sakta hai (jaise naïve matrix multiplication).

### Step 3 — Write the recurrence
\(T(n) = aT(n/b) + f(n)\) with base case \(T(1) = \Theta(1)\).  
> [!WARNING] Size \(n/b\) hamesha integer nahi hota; floor/ceil ya exact power-of-b assume karna padta hai.

### Step 4 — Prove correctness by induction
Base: \(n=1\) trivial.  
Inductive: assume subproblems sahi solve hue; combine step sahi result deta hai.  
Formal: let \(P(k)\) be “algorithm returns correct answer on size \(k\)”. Show \(P(n)\) follows from \(P(n/b)\).

### Step 5 — Solve the recurrence
Use Master theorem or substitution to obtain closed form.  
> [!WARNING] Master theorem conditions (\(f(n)\) vs \(n^{\log_b a}\)) yaad rakhna zaroori hai.

## 5. Worked examples — har step show karo

**Example 1 — Binary search**  
*Given:* Sorted array \(A[1..n]\), key \(x\).  
*Find:* Index of \(x\) or report absent.  
Mid index choose karo: \(m = \lfloor n/2 \rfloor\).  
Agar \(A[m] = x\) return \(m\); warna left ya right half par recurse.  
*Why* — yeh step subproblem size exactly half karta hai.  
Recurrence: \(T(n) = T(n/2) + O(1)\).  
Final answer \(\Theta(\log n)\).  
*Reflection* — simplest divide-and-conquer; combine step is empty.

**Example 2 — Merge sort**  
*Given:* Array of \(n\) numbers.  
*Find:* Sorted version.  
Divide into two halves, sort recursively, merge in linear time.  
*Why* — merge is the non-trivial combine.  
Recurrence: \(T(n) = 2T(n/2) + \Theta(n)\).  
Solution \(\Theta(n\log n)\).  
*Reflection* — classic case where Master theorem case 2 applies.

**Example 3 — Strassen matrix multiplication**  
*Given:* Two \(n\times n\) matrices.  
*Find:* Their product.  
Divide each matrix into four \(n/2\) blocks, compute seven recursive multiplications instead of eight, combine with 18 additions.  
*Why* — one multiplication saved at each level.  
Recurrence: \(T(n) = 7T(n/2) + \Theta(n^2)\).  
Solution \(\Theta(n^{\log_2 7})\).  
*Reflection* — shows how reducing \(a\) changes the exponent.

**Example 4 — Maximum subarray (divide-and-conquer version)**  
*Given:* Array of integers (can be negative).  
*Find:* Contiguous subarray with largest sum.  
Divide at mid, solve left, right and crossing; crossing solved in linear time by two suffix/prefix scans.  
*Why* — crossing case needs extra combine logic.  
Recurrence: \(T(n) = 2T(n/2) + \Theta(n)\).  
Solution again \(\Theta(n\log n)\).  
*Reflection* — shows combine step can be more involved than simple merge.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting base case              | Excitement to write recurrence first        | Always write \(T(1)=\Theta(1)\) explicitly   |
| Assuming subproblem size exactly \(n/2\) | Ignoring floor/ceil                         | Use \(\lfloor n/2\rfloor\) or prove by induction on powers of 2 |
| Combine step cost counted wrong   | Overlooking extra linear scans              | Count every pass over the data               |
| Applying Master theorem outside conditions | \(f(n)\) not polynomial                     | Check the three cases before quoting         |
| Overlapping subproblems           | Problem not truly independent               | Draw recursion tree; if diamonds appear, switch to DP |
| Induction hypothesis too weak     | Only proving “some answer” instead of “the correct answer” | State exactly what the algorithm returns     |

## 7. The textbook-precise statement
A divide-and-conquer algorithm for a problem of size \(n\) divides the problem into \(a \ge 1\) subproblems each of size at most \(\lceil n/b\rceil\) where \(b \ge 2\), solves the subproblems recursively, and combines their solutions in \(\Theta(f(n))\) time. The running time therefore satisfies the recurrence
\[
T(n) =
\begin{cases}
\Theta(1) & \text{if } n \le n_0, \\
aT(\lceil n/b\rceil) + f(n) & \text{otherwise}.
\end{cases}
\]
Correctness follows by induction on \(n\) once the combine function is proven to produce a correct solution from correct subsolutions. (Cormen et al., *Introduction to Algorithms*, 4e, §4.1–4.2)

## 8. Visual — diagram or schematic
```
n
├── n/2
│   ├── n/4
│   └── n/4
└── n/2
    ├── n/4
    └── n/4
```
Each leaf is size 1; work at each level is \(f(n)\) (merge/combine). Total levels \(\log_b n\).

## 9. The memory technique
1. **The hook** — Imagine a general cutting an army into smaller identical regiments, each regiment solving the same battle plan, then reports back to be merged into one victory report.
2. **What to overlearn** — Recurrence skeleton \(T(n)=aT(n/b)+f(n)\), Master theorem three cases, and the induction template “base + assume subproblems + prove combine”.
3. **Spaced-repetition schedule** — Review recurrence form after 1 day, Master theorem after 3 days, full proof after 7 days, one new example after 16 days, mixed set after 35 days.
4. **First-principles fallback** — Draw the recursion tree, count work per level, sum the geometric series.

## 10. What this unlocks
Once you internalise divide-and-conquer you can immediately understand FFT, Karatsuba, closest-pair, convex-hull, and the entire family of \(\Theta(n\log n)\) geometric algorithms.

- Fast Fourier Transform (next paradigm topic)
- Selection in worst-case linear time (median-of-medians)
- Any problem whose recurrence tree is balanced

## 11. Self-check — five questions, no answers
1. Write the recurrence for the number of comparisons performed by merge sort on an array of size \(n=2^k\).
2. Prove by induction that binary search returns the correct index or reports absence.
3. For which values of \(a,b,f(n)\) does the Master theorem give \(T(n)=\Theta(n^2)\)?
4. Identify the combine step cost in the maximum-subarray divide-and-conquer algorithm and show it is linear.
5. Suppose someone claims “every divide-and-conquer algorithm runs in \(O(n\log n)\) time”. Give a concrete counter-example and explain where the claim fails.