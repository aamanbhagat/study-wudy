## 1. The one-sentence answer
**Recursion is a function calling itself on a smaller instance of the same problem until a base case stops the chain.**

Aap jab koi problem ko usi tarah ke chhote version mein todte ho aur usi function ko wapas bulाते ho, tab recursion ban jaata hai. Python mein yeh directly allowed hai lekin har recursive call stack frame leta hai, isliye depth limit hoti hai. Factorial, Fibonacci aur binary search teen classic cases hain jahaan yeh pattern naturally fit hota hai.

> [!NOTE]
> Sabse badi aha yeh hai ki recursion sirf “function apne aap ko call kare” nahi hai; asal cheez yeh hai ki har call ka result seedha previous call ke result par depend karta hai aur base case se wapas build hota hai.

## 2. Why this matters — concrete and current
Google’s PageRank algorithm originally used recursive matrix methods to rank web pages; modern distributed versions still rely on the same recursive decomposition. SpaceX’s flight software uses recursive descent parsers for command telemetry because the grammar itself is recursively defined. PyTorch’s autograd engine walks the computation graph recursively to compute gradients; every tensor operation adds a node that later gets traversed in reverse. Modern CPU branch predictors and cache-coherence protocols internally run recursive tree traversals on directory structures. Semiconductor design tools such as Synopsys IC Compiler perform recursive floor-planning on millions of cells, where each sub-block is solved by the same algorithm on a smaller region.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Function call stack | Each recursive call pushes a new frame; you must visualise how frames are created and popped. |
| Base case vs recursive case | Without an explicit stopping condition the call stack grows until Python raises RecursionError. |
| Time and space complexity | You need big-O notation to compare naive recursion against memoised or iterative versions. |
| Divide-and-conquer pattern | Binary search and recursive Fibonacci both split the problem; understanding this pattern makes the code obvious. |

Agar upar ke concepts mein se koi bhi weak hai to pehle “Introduction to Functions” aur “Big-O notation” padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the self-similar subproblem
Aap dekho ki problem ka bada version exactly usi tarah ka hai lekin input chhota hai. Factorial(5) = 5 × Factorial(4) bilkul isi pattern ka hai.  
Example: n = 5 → 5 × (4 × (3 × (2 × 1))).  
Formal: \(n! = n \times (n-1)!\) for \(n > 0\).  
> [!WARNING] Agar aap subproblem ko galat define karoge (jaise n-2 ki jagah n-1), toh recurrence hi galat ban jaayegi aur final answer kabhi nahi milega.

### Step 2 — Write the explicit base case first
Base case woh input hai jahaan recursion ruk jaaye. Factorial ke liye 0! = 1.  
Formal: \(0! = 1\).

### Step 3 — Express the recursive case
Recursive case mein original function ko chhote input ke saath call karo aur uska result combine karo.  
Formal: \(fact(n) = n \times fact(n-1)\).

### Step 4 — Ensure progress toward the base case
Har call mein input strictly chhota hona chahiye warna infinite recursion hogi. n → n-1 guaranteed decrease hai.

### Step 5 — Count stack frames and return path
Python har call ke liye ek frame banata hai. Jab base case hit hota hai, har frame apna pending multiplication karke return karta hai. Depth = n, isliye space O(n) hoti hai.

### Step 6 — Extend the same skeleton to Fibonacci and binary search
Fibonacci: \(F(n) = F(n-1) + F(n-2)\), base \(F(0)=0, F(1)=1\).  
Binary search: search space ko half karo aur ek hi taraf recursion karo.

### Step 7 — Textbook-grade recurrence relation
Let \(T(n)\) be the running time. For naive Fibonacci:  
$$T(n) = T(n-1) + T(n-2) + \Theta(1), \quad T(0)=T(1)=\Theta(1).$$

## 5. Worked examples — har step show karo

**Example 1 — Factorial(4)**  
*Given:* n = 4  
*Find:* 4!  
fact(4) calls fact(3) → fact(2) → fact(1) → fact(0) = 1.  
fact(1) returns 1 × 1 = 1.  
fact(2) returns 2 × 1 = 2.  
fact(3) returns 3 × 2 = 6.  
fact(4) returns 4 × 6 = 24.  
*Why* each line: har step base case se wapas multiply karta hai kyunki pending operation stack frame mein stored tha.  
**24**

*Reflection:* yeh example linear chain dikhata hai; har call ek hi subproblem maangta hai.

**Example 2 — Fibonacci(5)**  
*Given:* n = 5  
*Find:* F(5)  
F(5) = F(4) + F(3)  
F(4) = F(3) + F(2) … tree ban jaata hai.  
Final value = 5.  
**5**

*Reflection:* exponential calls dikhata hai; same subproblems baar-baar solve hote hain.

**Example 3 — Binary search on [1,3,5,7,9], target = 5**  
*Given:* sorted list, low = 0, high = 4  
mid = 2 → value 5 == target → return index 2.  
**2**

*Reflection:* har step search space half hoti hai, isliye O(log n).

**Example 4 — Factorial with memoisation (Fibonacci style)**  
*Given:* n = 6, memo = {}  
Agar key n memo mein hai to wahi return karo, warna compute karke store karo.  
**720**

*Reflection:* memoisation ne time ko O(n) kar diya kyunki har value sirf ek baar calculate hui.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Missing base case           | Student sirf recursive line likhta hai      | Base case ko hamesha pehle likho             |
| Recursion depth > 1000      | Python default limit 1000 frames            | sys.setrecursionlimit ya iterative version   |
| Exponential time Fibonacci  | Har call do naye calls karti hai            | Memoisation ya bottom-up DP                  |
| Off-by-one in binary search | mid calculation mein +1 ya -1 galti         | low + (high-low)//2 formula use karo         |
| Forgetting return keyword   | Call result use nahi hota                   | Har recursive call ke aage return likho      |
| Modifying list while recursing | Side-effect recursion mein dangerous      | Immutable copies ya indices se kaam lo       |
| Stack overflow on large n   | Linear depth for factorial                  | Tail recursion ya iteration choose karo      |

## 7. The textbook-precise statement
A recursive algorithm for a problem of size n is one that reduces the problem to one or more subproblems of strictly smaller size, solves those subproblems recursively, and combines their solutions. The recursion terminates when the problem size reaches a base case whose solution is known directly. (Cormen et al., *Introduction to Algorithms*, 4e, Chapter 4, “Divide-and-Conquer” and Section 9.1 on recurrence relations.)

## 8. Visual — diagram or schematic
```
fact(4)
 └── 4 × fact(3)
      └── 3 × fact(2)
           └── 2 × fact(1)
                └── 1 × fact(0) → 1
```
Har level ek frame hai; arrows neeche base case ki taraf jaate hain aur values wapas upar multiply hote hain.

## 9. The memory technique
1. **The hook** — Socho recursion ek “matryoshka doll” ki tarah hai: har doll andar ek chhoti doll rakhti hai, sabse andar ek solid doll (base case) hoti hai.
2. **What to overlearn** — Base case pehle likho; har call mein input strictly decrease hona chahiye; Fibonacci ke liye memo dict ya @cache decorator.
3. **Spaced-repetition schedule** — 1 din baad factorial code likho, 3 din baad Fibonacci tree draw karo, 7 din baad binary search implement karo, 16 aur 35 din baad dono ko compare karo.
4. **First-principles fallback** — Agar formula bhool jaao to sirf yeh do sawal poochho: “Base case kya hai?” aur “Chhota input ka result kaise combine hoga?”

## 10. What this unlocks
Recursion samajh lene ke baad aap tree traversal, divide-and-conquer (merge sort, quick sort), dynamic programming, backtracking aur compiler recursive-descent parsers naturally samajh jaoge.

- Merge sort aur quick sort ke recurrence relations
- Dynamic programming state transition tables
- Backtracking (N-Queens, Sudoku)
- Tree and graph DFS algorithms

## 11. Self-check — five questions, no answers
1. fact(0) aur fact(1) dono base cases kyun likhte hain?
2. Naive Fibonacci(30) kitne recursive calls karega? Memoised version kitne karega?
3. Binary search mein mid = (low + high) // 2 ki jagah low + (high - low) // 2 kyun behtar hai?
4. Tail-recursive factorial Python mein bhi stack overflow kyun de sakta hai?
5. Agar aap Fibonacci ko bottom-up DP se solve karo, toh space kitna hoga aur kyun?