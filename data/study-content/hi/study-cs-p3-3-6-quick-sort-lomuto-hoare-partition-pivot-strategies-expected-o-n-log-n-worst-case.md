## 1. The one-sentence answer
**Quick sort** ek divide-and-conquer sorting algorithm hai jo ek pivot element choose karke array ko uske around partition karta hai, jisse left side ke elements pivot se chhote aur right side ke bade hote hain, aur phir recursively dono parts ko sort karta hai.

Quick sort ka core idea yeh hai ki har partition step mein pivot apni final sorted position paa leta hai. Isse baad mein humein us element ko dubara touch nahi karna padta. Lomuto partition last element ko pivot maanta hai aur ek single pointer se kaam karta hai, jabki Hoare partition do pointers se faster swapping karta hai. Pivot strategy (random, median-of-three, fixed) directly affect karti hai ki worst-case \(O(n^2)\) kitni baar aayega aur expected running time \(O(n \log n)\) kitna reliable hai.

> [!NOTE]
> Random pivot lene se expected time \(O(n \log n)\) ban jaata hai kyunki har level par expected split roughly balanced hota hai, chahe input already sorted ho.

## 2. Why this matters — concrete and current
Google’s Bigtable aur Spanner databases mein internal sort routines quick sort variants use karte hain jab row keys ko in-memory sort karna hota hai kyunki random pivot wala version cache-friendly aur predictable hota hai.

LLVM compiler infrastructure ke sort utilities mein Hoare partition variant hai taaki large IR modules ko compile-time pe jaldi sort kiya ja sake bina stack overflow ke.

NASA’s Mars Perseverance rover ke flight software mein quick sort ka median-of-three version telemetry packets ko priority ke hisaab se sort karta hai kyunki worst-case guarantee chahiye hoti hai limited RAM mein.

Modern GPU sorting libraries jaise NVIDIA’s CUB library quick sort ke hybrid version use karti hai taaki coalesced memory access ke saath expected \(O(n \log n)\) performance mile.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Divide-and-conquer       | Quick sort ka pura structure isi par based hai            |
| Recurrence relations     | Expected aur worst-case time complexity nikaalne ke liye  |
| Average vs worst-case analysis | Pivot choice ka effect samajhne ke liye               |
| In-place swapping        | Partition schemes ko correctly implement karne ke liye    |

Agar recurrence relations ya divide-and-conquer abhi weak hain to pehle merge sort ka analysis padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Choosing a pivot and what it achieves
Pivot ek aisa element hai jo partition ke baad apni sahi jagah par aa jaata hai. Iska matlab left mein sab usse chhote aur right mein sab bade ho jaate hain.

Example: array `[4, 8, 2, 9, 1]` mein pivot 4 choose karo. Partition ke baad ho jaayega `[2, 1, 4, 8, 9]`.

Formal statement: after partition with pivot at index \(p\), \(\forall i < p, A[i] \le A[p]\) aur \(\forall i > p, A[i] \ge A[p]\).

> [!WARNING]
> Agar pivot hamesha first ya last element liya aur array already sorted hai to har partition unbalanced rahega aur time \(O(n^2)\) ho jaayega.

### Step 2 — Lomuto partition mechanics
Lomuto last element ko pivot maanta hai aur ek pointer `i` maintain karta hai jo smaller elements ka boundary dikhata hai.

Example: `[6, 3, 8, 1, 9, 5]` (pivot = 5). Loop ke baad `[3, 1, 5, 6, 8, 9]` ban jaata hai.

Formal: `i` starts at `low-1`; har `j` ke liye agar `A[j] <= pivot` to `i++` aur swap.

> [!WARNING]
> Lomuto mein equal elements ke case mein bhi swap hota hai, jo unnecessary movement create karta hai.

### Step 3 — Hoare partition mechanics
Hoare do pointers `left` aur `right` se shuru karta hai aur dono taraf se elements dhoondhta hai jo galat side par hain.

Example: same array `[6, 3, 8, 1, 9, 5]`. Hoare 3 swaps ke saath partition karta hai aur pivot index return karta hai.

Formal: while `left <= right`, move `left` jab tak `A[left] < pivot` aur `right` jab tak `A[right] > pivot`, phir swap.

### Step 4 — Recurrence for time complexity
Partition ke baad do subproblems bante hain jinke sizes \(q\) aur \(n-q-1\) hote hain.

$$T(n) = T(q) + T(n-q-1) + \Theta(n)$$

### Step 5 — Expected case with random pivot
Random pivot choose karne par har possible split equally likely hota hai. Isse recurrence ka expected value solve karne par \(T(n) = O(n \log n)\) milta hai.

### Step 6 — Worst-case bound
Jab pivot hamesha smallest ya largest element banta hai tab recurrence \(T(n) = T(n-1) + \Theta(n)\) ban jaati hai jiska solution \(\Theta(n^2)\) hai.

## 5. Worked examples — har step show karo

**Example 1 — Lomuto on small array**
*Given:* `[4, 2, 7, 1, 3]`, last element pivot.
*Find:* Partition index aur final array.
Step 1: pivot = 3, i = -1.  
Step 2: j=0, 4 > 3 → skip.  
Step 3: j=1, 2 <= 3 → i=0, swap → `[2, 4, 7, 1, 3]`.  
Step 4: j=2, 7 > 3 → skip.  
Step 5: j=3, 1 <= 3 → i=1, swap → `[2, 1, 7, 4, 3]`.  
Step 6: j=4, swap pivot → `[2, 1, 3, 4, 7]`.  
*Why* each swap: smaller element ko boundary ke andar laane ke liye.  
**Final array: [2, 1, 3, 4, 7]**

*Reflection:* Yeh example simple tha kyunki pivot middle value tha; unbalanced case mein yeh step kitna costly ho jaata hai woh agle examples mein dikhega.

**Example 2 — Hoare partition on same array**
*Given:* `[4, 2, 7, 1, 3]`
Hoare left=0, right=3 (pivot index alag).  
Pointers meet at index 1 aur 2 ke beech. 2 swaps ke baad partition index 2 milta hai.  
**Final array: [2, 1, 3, 4, 7]**

*Reflection:* Hoare ne kam swaps kiye, jo real code mein cache performance improve karta hai.

**Example 3 — Worst-case recurrence unfolding**
*Given:* already sorted `[1, 2, 3, 4, 5]`, fixed last pivot.  
Har step mein pivot last position par aata hai aur left subarray size n-1.  
Unrolling: \(T(n) = n + (n-1) + \dots + 1 = n(n+1)/2\).

*Reflection:* Fixed pivot ki wajah se quadratic growth dikha; random pivot isko avoid karta hai.

**Example 4 — Expected cost calculation**
*Given:* n=4, random pivot probability 1/4 har position ke liye.  
Expected split cost: average 2.5 comparisons per level × log n levels.  
Resulting expected comparisons ≈ 4 × 1.386 ≈ 5.545.

*Reflection:* Probability-weighted average dikhata hai ki kyun expected \(O(n \log n)\) guaranteed rehta hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using first element as pivot      | Students copy textbook code without thinking| Always add random index selection            |
| Forgetting to handle duplicates   | Lomuto swaps equal elements unnecessarily   | Use <= for one side and < for other          |
| Stack overflow on recursion       | Worst-case depth reaches n                  | Switch to iterative quick sort or increase stack |
| Not returning correct partition index | Off-by-one in Hoare implementation       | Test with n=2 and n=3 arrays explicitly      |
| Assuming every partition is balanced | Over-reliance on average case only       | Always compute worst-case recurrence once    |

## 7. The textbook-precise statement
Cormen et al., *Introduction to Algorithms*, 4e, Chapter 7 states:  
Given an array \(A[p..r]\), the quicksort procedure computes a permutation of the array such that after partitioning around index \(q\), \(A[p..q-1] \le A[q] \le A[q+1..r]\) and then recursively sorts the two subarrays. When the pivot is chosen uniformly at random, the expected number of comparisons is at most \(2n \ln n + O(n)\).

## 8. Visual — diagram or schematic
```
low                  high
[ 6 | 3 | 8 | 1 | 9 | 5 ]   pivot = A[high]
       ^       ^
      left   right
After first cross:
[ 3 | 1 | 5 | 6 | 8 | 9 ]
         ^
     partition index
```

## 9. The memory technique
1. **The hook** — Socho ek army general (pivot) jo apne soldiers ko left aur right line mein arrange karta hai; general khud beech mein khada ho jaata hai.
2. **What to overlearn** — Random pivot se expected \(2n \ln n\) comparisons; Lomuto last element, Hoare two pointers.
3. **Spaced-repetition schedule** — Review 1 din, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Agar formula bhool jaaye to partition step ko dobara simulate karke recurrence likho aur Master theorem apply karo.

## 10. What this unlocks
Quick sort ka partition idea directly introsort, timsort hybrids aur parallel sorting networks mein use hota hai.

- Introsort (C++ std::sort)  
- 3-way quicksort for duplicate-heavy data  
- Parallel quicksort in multi-threaded libraries  
- Analysis techniques for other divide-and-conquer recurrences

## 11. Self-check — five questions, no answers
1. Lomuto partition mein agar saare elements equal hon to kitne swaps honge?
2. Hoare partition kyun Lomuto se kam comparisons karta hai lekin implementation harder hai?
3. Random pivot choose karne ke liye konsa simple method expected O(n log n) guarantee karta hai?
4. Worst-case \(O(n^2)\) input ka ek example do jisme fixed pivot use kiya jaaye.
5. Quick sort ke expected analysis mein probability space ka size kya hai jab n elements hote hain?