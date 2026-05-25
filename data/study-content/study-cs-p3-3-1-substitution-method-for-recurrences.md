## 1. What it is — in plain English

Imagine you have a recipe for baking a cake. This recipe tells you how to make a big cake by first making a few smaller identical cakes, and then combining them with some extra frosting. This is essentially what a "recurrence relation" is in computer science: it's a mathematical recipe that describes how much work an algorithm does by breaking a big problem down into smaller, similar problems.

Now, the "substitution method" is like trying to figure out the *total* amount of work (or "calories" in our cake analogy) that recipe will generate, without actually baking it. You *guess* what the final amount of work will look like – for instance, "I bet this recipe makes a cake that scales with the square of its size" – and then you use a rigorous mathematical proof technique called "induction" to check if your guess is correct.

It's fundamentally a "guess and check" strategy, but with a very strict way of checking. You're not just eyeballing it; you're proving mathematically that your guess holds true for all possible problem sizes, from the smallest to the largest. If your guess doesn't quite fit, the method often gives you clues on how to adjust your guess to make it work.

So, in simple terms, the substitution method is a formal way to prove the running time (or space complexity) of a recursive algorithm by first making an educated guess about its complexity, and then using mathematical induction to verify that guess. It's one of the foundational tools for understanding how efficient recursive code truly is.

## 2. Why it matters — real-world applications

Understanding the complexity of algorithms through methods like substitution isn't just an academic exercise; it has profound real-world implications across various industries where performance is critical.

1.  **Optimizing Large-Scale Data Processing (Google, Amazon):** Companies like Google (for search indexing) or Amazon (for product recommendations and database queries) handle petabytes of data. Algorithms like Merge Sort or Quick Sort, whose running times are often analyzed using recurrences, are fundamental to efficiently sorting and processing this data. If you incorrectly estimate that a sorting algorithm is $O(n)$ instead of $O(n \log n)$ or even $O(n^2)$, you might design a system that takes seconds to process small inputs but days or weeks for large ones, leading to massive operational costs or system failures. Correct analysis ensures scalable and responsive services.

2.  **Machine Learning Model Training (DeepMind, OpenAI):** Many machine learning algorithms, particularly those based on "divide-and-conquer" paradigms (like decision trees, certain clustering algorithms, or even aspects of parallel neural network training), can be described by recurrence relations. For instance, building a decision tree involves recursively partitioning data. Analyzing the recurrence for such a process helps predict how long it will take to train a model on a dataset of a given size, which is crucial for resource allocation in data centers and for rapidly iterating on model designs. Understanding the complexity helps engineers choose the right algorithm for real-time inference versus offline training.

3.  **Scientific Simulations (NASA, CERN):** In fields like aerospace engineering (e.g., simulating airflow over a wing, orbital mechanics) or physics (e.g., N-body simulations for celestial mechanics, particle collision simulations at CERN), complex numerical algorithms are used. Many of these algorithms can be recursive or have recursive structures in their parallel implementations. For example, a fast multipole method used in N-body simulations has a recursive structure. Using the substitution method to analyze their recurrences allows scientists and engineers to predict computation times, optimize algorithms for supercomputers, and ensure simulations complete within practical timeframes, directly impacting research progress and design cycles.

4.  **Computer Graphics and Gaming (NVIDIA, Pixar):** Algorithms for rendering realistic graphics, such as ray tracing or fractal generation, often exhibit recursive behavior. Ray tracing, for instance, involves calculating light paths that can bounce off surfaces, leading to recursive calls. Analyzing the recurrence relations helps graphics engineers understand how rendering time scales with scene complexity (number of objects, light sources, reflections). This knowledge is vital for optimizing game engines for smooth frame rates or for rendering high-fidelity animated movies efficiently, where a single frame can take hours to render.

## 3. Prerequisites — what you must know first

Before diving into the substitution method, ensure you have a solid grasp of these fundamental concepts. If any of these feel unfamiliar, pause and review them first.

*   **Recurrence Relations:** A mathematical equation or inequality that describes a function in terms of its values on smaller inputs. For example, $T(n) = 2T(n/2) + n$.
*   **Big O Notation:** A way to describe the upper bound of an algorithm's running time or space complexity as the input size grows. For example, $O(n \log n)$ means the algorithm's time grows no faster than $c \cdot n \log n$ for some constant $c$.
*   **Mathematical Induction:** A proof technique used to prove a statement is true for all natural numbers. It involves proving a base case and an inductive step (assuming it's true for $k$, proving it's true for $k+1$, or for $k<n$, proving it's true for $n$). This is the *backbone* of the substitution method.
*   **Logarithms:** The inverse operation to exponentiation. Understanding properties like $\log_b(xy) = \log_b x + \log_b y$, $\log_b(x/y) = \log_b x - \log_b y$, and $\log_b(x^k) = k \log_b x$ is crucial.
*   **Series and Sums:** Basic knowledge of arithmetic and geometric series, and how to work with summation notation ($\sum$).
*   **Basic Algebra and Inequalities:** Proficiency in manipulating algebraic expressions, solving inequalities, and understanding their properties (e.g., multiplying by a negative number flips the inequality sign).

## 4. The core idea — step by step

The substitution method is essentially a proof by mathematical induction. You make a guess about the solution to a recurrence, and then you use induction to prove that your guess is correct.

### Step 1: Guess the form of the solution

*   **Plain English:** Look at the recurrence relation and try to make an educated guess about its Big O complexity. This often requires intuition gained from experience, or by using tools like the recursion tree method or even the Master Theorem (if you know it, though for the purpose of *learning* substitution, try to guess without it initially).
*   **Small Concrete Example:** For $T(n) = 2T(n/2) + n$, you might guess $T(n) = O(n \log n)$. This comes from recognizing it's similar to Merge Sort.
*   **Formal/Mathematical Version:** We want to show that $T(n)$ is bounded above by some function $f(n)$. So, we *hypothesize* that $T(n) \le c \cdot f(n)$ for some positive constant $c$ and for all $n \ge n_0$ (where $n_0$ is some minimum problem size).
    $$ \text{Hypothesis: } T(n) \le c f(n) $$
    (Sometimes, if we're proving a lower bound, we'd guess $T(n) \ge c f(n)$ or if an exact bound, $T(n) = \Theta(f(n))$, which requires proving both upper and lower bounds.)
*   **What could go wrong:** Your guess might be too loose (e.g., guessing $O(n^2)$ for $T(n) = n \log n$, which is technically correct but not tight) or too tight (e.g., guessing $O(n)$ for $T(n) = n \log n$, which is incorrect). A poor guess will make it impossible to prove the inductive step.

### Step 2: Formulate the inductive hypothesis

*   **Plain English:** Clearly state what you are assuming to be true for smaller problem sizes. This is the "inductive hypothesis" part of mathematical induction.
*   **Small Concrete Example:** If we're trying to prove $T(n) \le c n \log n$, our inductive hypothesis would be: "Assume that for all $k < n$, $T(k) \le c k \log k$ holds true."
*   **Formal/Mathematical Version:** For the inductive step, we assume that our guess holds for all values $k$ smaller than $n$.
    $$ \text{Inductive Hypothesis: } T(k) \le c f(k) \text{ for all } k < n $$
    It's crucial to use a specific constant $c$ here, not $O$-notation. $O$-notation already hides constants and lower-order terms, which is what we are trying to *find* and *prove* with this method.
*   **What could go wrong:** Using $O$-notation in the hypothesis (e.g., $T(k) = O(k \log k)$) is a common mistake. This makes the proof circular and invalid because $O$-notation itself is what we're trying to establish. We need to work with concrete inequalities.

### Step 3: Substitute the hypothesis into the recurrence

*   **Plain English:** Take your original recurrence relation and replace the $T(\text{smaller input})$ terms with your inductive hypothesis.
*   **Small Concrete Example:** Given $T(n) = 2T(n/2) + n$. Using the hypothesis $T(k) \le c k \log k$ for $k=n/2$:
    $$ T(n) \le 2(c(n/2) \log(n/2)) + n $$
*   **Formal/Mathematical Version:**
    Given a recurrence like $T(n) = a T(n/b) + g(n)$, substitute $T(n/b)$ with $c (n/b) \log(n/b)$ (if $f(n) = n \log n$ was your guess).
    $$ T(n) \le a \left( c \left(\frac{n}{b}\right) \log\left(\frac{n}{b}\right) \right) + g(n) $$
*   **What could go wrong:** Algebraic errors during substitution. Forgetting to apply the constant $c$ to *all* terms from the hypothesis.

### Step 4: Simplify and solve for the constant $c$

*   **Plain English:** Algebraically manipulate the inequality from Step 3. Your goal is to show that the result is less than or equal to $c f(n)$ (your original guess) for some choice of $c$. You'll often need to find a value for $c$ that makes the inequality hold.
*   **Small Concrete Example:** Continuing from the previous step:
    $$ T(n) \le 2(c(n/2) \log(n/2)) + n $$
    $$ T(n) \le c n \log(n/2) + n $$
    $$ T(n) \le c n (\log n - \log 2) + n \quad (\text{using } \log(x/y) = \log x - \log y) $$
    $$ T(n) \le c n \log n - c n \log 2 + n $$
    We want to show that $T(n) \le c n \log n$. So we need:
    $$ c n \log n - c n \log 2 + n \le c n \log n $$
    Subtract $c n \log n$ from both sides:
    $$ - c n \log 2 + n \le 0 $$
    $$ n \le c n \log 2 $$
    Since $n > 0$, we can divide by $n$:
    $$ 1 \le c \log 2 $$
    $$ c \ge \frac{1}{\log 2} $$
    Since $\log 2$ is a positive constant (assuming base 2, $\log_2 2 = 1$; for other bases, it's still positive), we can choose any $c \ge 1/\log 2$ (e.g., $c=1$) to make the inequality hold.
*   **Formal/Mathematical Version:**
    $$ T(n) \le \dots \text{ (algebraic manipulation) } \dots $$
    $$ \le c f(n) - (\text{some positive residual term}) $$
    The "positive residual term" is key. If you end up with $c f(n) + (\text{some positive term})$, your guess might be too small, or you might need the "lower-order term" trick (see Step 6). If you can show $T(n) \le c f(n)$, you've found a valid $c$.
*   **What could go wrong:** Incorrect algebraic manipulation, especially with logarithms. Not being able to find a $c$ that satisfies the inequality (often indicates a wrong initial guess or the need for the "lower-order term" trick).

### Step 5: Handle the base cases

*   **Plain English:** The inductive proof only works for $n$ large enough. You need to explicitly check that your hypothesized inequality holds for the smallest values of $n$ (the base cases of the recurrence).
*   **Small Concrete Example:** For $T(n) = 2T(n/2) + n$ with $T(1) = 1$. Our guess is $T(n) \le c n \log n$.
    Let's check $n=1$:
    $T(1) = 1$.
    Hypothesis: $c \cdot 1 \log 1 = c \cdot 0 = 0$.
    So, $1 \le 0$, which is false. This is a common issue!
    The solution is to realize that $n \log n$ is 0 for $n=1$. We need to choose a base case $n_0 > 1$ (e.g., $n_0=2$) for which the $\log n$ term is positive.
    Let's check $n=2$:
    $T(2) = 2T(1) + 2 = 2(1) + 2 = 4$.
    Hypothesis: $c \cdot 2 \log_2 2 = c \cdot 2 \cdot 1 = 2c$.
    We need $4 \le 2c$, which means $c \ge 2$.
    So, if we choose $c \ge 2$ (and $c \ge 1/\log_2 2 = 1$), our base case $T(2)$ is satisfied. For $n_0=2$, we can prove $T(n) \le c n \log n$ for all $n \ge 2$.
*   **Formal/Mathematical Version:** Show that $T(n_0) \le c f(n_0)$ for some base case $n_0$. If the function $f(n)$ (e.g., $n \log n$) is zero or negative for small $n$, you might need to pick a larger $n_0$ (e.g., $n=2$ or $n=3$) and verify the inequality for those specific values. The constant $c$ must satisfy *both* the inductive step and all chosen base cases.
*   **What could go wrong:** Forgetting to check base cases. The base case not fitting the general form (e.g., $n \log n$ being 0 for $n=1$). This often means you need to adjust your base case $n_0$ or sometimes even slightly modify your guess (see Step 6).

### Step 6: Address "lower-order terms" and "exact forms" (The "Subtraction Trick")

*   **Plain English:** Sometimes, a simple guess like $T(n) \le c f(n)$ doesn't quite work because after substitution and simplification, you're left with a term that prevents you from showing $T(n) \le c f(n)$. For example, you might get $T(n) \le c f(n) + \text{something positive}$. To fix this, you make your inductive hypothesis *stronger* by subtracting a lower-order term. Instead of $T(n) \le c f(n)$, you try $T(n) \le c f(n) - d g(n)$ for some positive constants $c, d$ and a lower-order function $g(n)$.
*   **Small Concrete Example:** Consider $T(n) = T(n/2) + 1$. If we guess $T(n) \le c \log n$:
    $T(n) \le c \log(n/2) + 1 = c(\log n - \log 2) + 1 = c \log n - c \log 2 + 1$.
    We want $c \log n - c \log 2 + 1 \le c \log n$.
    This requires $-c \log 2 + 1 \le 0$, or $1 \le c \log 2$, so $c \ge 1/\log 2$. This works!
    *However, let's consider a recurrence where this *doesn't* work easily.*
    Suppose $T(n) = 2T(n/2) + 1$. If we guess $T(n) \le c n$:
    $T(n) \le 2(c(n/2)) + 1 = c n + 1$.
    We want $c n + 1 \le c n$. This implies $1 \le 0$, which is false. Our guess $O(n)$ is correct, but the simple form $T(n) \le c n$ is not strong enough for the inductive proof.
    Here, we use the subtraction trick. Guess $T(n) \le c n - d$ for some $d > 0$.
    Substitute: $T(n) \le 2(c(n/2) - d) + 1 = c n - 2d + 1$.
    We want $c n - 2d + 1 \le c n - d$.
    Subtract $c n$ from both sides: $-2d + 1 \le -d$.
    Add $2d$ to both sides: $1 \le d$.
    So, if we choose $d \ge 1$ (e.g., $d=1$), this inequality holds. Now we just need to pick $c$ to satisfy the base cases. For $T(1)=1$, $T(1) \le c(1) - d$. So $1 \le c - d$. If $d=1$, then $1 \le c-1 \implies c \ge 2$.
    Thus, $T(n) = O(n)$ is proven with $T(n) \le 2n - 1$.
*   **Formal/Mathematical Version:** If your inductive step yields $T(n) \le c f(n) + \text{positive_term}$, try strengthening your hypothesis to $T(n) \le c f(n) - d g(n)$ where $g(n)$ is a lower-order function than $f(n)$ (e.g., $g(n)=n$ if $f(n)=n \log n$, or $g(n)=1$ if $f(n)=n$). Then solve for both $c$ and $d$.
*   **What could go wrong:** Not recognizing when this trick is needed. Choosing an incorrect lower-order term $g(n)$.

## 5. Worked examples — multiple, with every step shown

We will use $\log$ to denote $\log_2$ unless otherwise specified, which is common in algorithm analysis.

### Example 1: $T(n) = 2T(n/2) + n$, with base case $T(1)=1$.

**Problem:** Find an upper bound for the recurrence $T(n) = 2T(n/2) + n$, given $T(1)=1$.

**Given:** Recurrence $T(n) = 2T(n/2) + n$. Base case $T(1)=1$.
**Want:** An upper bound $O(f(n))$ for $T(n)$.

**Step 1: Guess the form of the solution.**
This recurrence is typical for algorithms like Merge Sort. Intuitively, at each level of recursion, we do $O(n)$ work, and there are $\log n$ levels. So, we guess $T(n) = O(n \log n)$.
Let's hypothesize $T(n) \le c n \log n$ for some constant $c > 0$ and for $n \ge n_0$.

**Step 2: Formulate the inductive hypothesis.**
Assume that for all $k < n$, $T(k) \le c k \log k$ holds true.
Specifically, for $k=n/2$, we assume $T(n/2) \le c (n/2) \log(n/2)$.

**Step 3: Substitute the hypothesis into the recurrence.**
$$ T(n) = 2T(n/2) + n $$
Substitute $T(n/2)$ using our hypothesis:
$$ T(n) \le 2 \left( c \left(\frac{n}{2}\right) \log\left(\frac{n}{2}\right) \right) + n \quad (\text{We replace } T(n/2) \text{ with its assumed upper bound.}) $$

**Step 4: Simplify and solve for the constant $c$.**
$$ T(n) \le c n \log\left(\frac{n}{2}\right) + n \quad (\text{The } 2 \text{ and } 1/2 \text{ cancel out.}) $$
Apply logarithm property $\log(a/b) = \log a - \log b$:
$$ T(n) \le c n (\log n - \log 2) + n \quad (\text{Breaking down the logarithm.}) $$
$$ T(n) \le c n \log n - c n \log 2 + n \quad (\text{Distributing } cn \text{ across the terms.}) $$
We want to show that $T(n) \le c n \log n$. For this to be true, the remaining terms must be less than or equal to zero:
$$ - c n \log 2 + n \le 0 \quad (\text{This is the condition for our hypothesis to hold.}) $$
Factor out $n$:
$$ n (1 - c \log 2) \le 0 \quad (\text{Simplifying the inequality.}) $$
Since $n$ is typically a positive input size ($n \ge 1$), we can divide by $n$ without changing the inequality direction:
$$ 1 - c \log 2 \le 0 \quad (\text{Focusing on the constant terms.}) $$
Rearrange the terms to solve for $c$:
$$ 1 \le c \log 2 \quad (\text{Moving } c \log 2 \text{ to the right side.}) $$
$$ c \ge \frac{1}{\log 2} \quad (\text{Dividing by } \log 2 \text{. Since } \log 2 > 0 \text{, inequality direction remains the same.}) $$
Since we are using $\log_2$, $\log_2 2 = 1$. So, $c \ge 1$. We can choose $c=1$ (or any $c \ge 1$).

**Step 5: Handle the base cases.**
Our hypothesis is $T(n) \le c n \log n$.
Let's check $T(1)=1$.
$c \cdot 1 \cdot \log 1 = c \cdot 0 = 0$.
So, $1 \le 0$, which is false. This means our guess $T(n) \le c n \log n$ doesn't hold for $n=1$.
This is common when $f(n)$ is 0 for small $n$. We need to pick a sufficiently large $n_0$ as the base case for our induction. Let's try $n=2$.
For $n=2$, the recurrence is $T(2) = 2T(2/2) + 2 = 2T(1) + 2$.
Given $T(1)=1$, we have $T(2) = 2(1) + 2 = 4$.
Now, check if $T(2) \le c \cdot 2 \log 2$ holds for our chosen $c$.
$4 \le c \cdot 2 \cdot 1 \quad (\text{Using } \log_2 2 = 1 \text{ and our hypothesis for } n=2.)$
$4 \le 2c \quad (\text{Simplifying.})$
$c \ge 2 \quad (\text{Solving for } c.)$
This requirement ($c \ge 2$) is consistent with our earlier finding ($c \ge 1$). So, we can choose $c=2$.
With $c=2$, our hypothesis $T(n) \le 2n \log n$ holds for $n=2$ and for the inductive step for all $n \ge 2$.
Therefore, $T(n) = O(n \log n)$.

**Final Answer:** $\boxed{T(n) = O(n \log n)}$

**Reflection:** The tricky part here was handling the base case $T(1)=1$ where $n \log n$ evaluates to 0. We resolved this by choosing a larger base case ($n_0=2$) and ensuring our constant $c$ satisfied both the inductive step and this new base case.

---

### Example 2: $T(n) = 4T(n/2) + n^2$, with base case $T(1)=1$.

**Problem:** Find an upper bound for the recurrence $T(n) = 4T(n/2) + n^2$, given $T(1)=1$.

**Given:** Recurrence $T(n) = 4T(n/2) + n^2$. Base case $T(1)=1$.
**Want:** An upper bound $O(f(n))$ for $T(n)$.

**Step 1: Guess the form of the solution.**
This recurrence looks like $T(n) = aT(n/b) + f(n)$ where $a=4, b=2, f(n)=n^2$.
Compare $f(n)$ with $n^{\log_b a} = n^{\log_2 4} = n^2$. Since $f(n)$ is asymptotically equal to $n^{\log_b a}$, we might guess $T(n) = O(n^2 \log n)$ (using Master Theorem intuition, but we're proving it with substitution).
Let's hypothesize $T(n) \le c n^2 \log n$ for some constant $c > 0$ and for $n \ge n_0$.

**Step 2: Formulate the inductive hypothesis.**
Assume that for all $k < n$, $T(k) \le c k^2 \log k$ holds true.
Specifically, for $k=n/2$, we assume $T(n/2) \le c (n/2)^2 \log(n/2)$.

**Step 3: Substitute the hypothesis into the recurrence.**
$$ T(n) = 4T(n/2) + n^2 $$
Substitute $T(n/2)$:
$$ T(n) \le 4 \left( c \left(\frac{n}{2}\right)^2 \log\left(\frac{n}{2}\right) \right) + n^2 \quad (\text{Replacing } T(n/2) \text{ with its assumed upper bound.}) $$

**Step 4: Simplify and solve for the constant $c$.**
$$ T(n) \le 4 \left( c \frac{n^2}{4} \log\left(\frac{n}{2}\right) \right) + n^2 \quad (\text{Squaring the } n/2 \text{ term.}) $$
$$ T(n) \le c n^2 \log\left(\frac{n}{2}\right) + n^2 \quad (\text{The } 4 \text{ and } 1/4 \text{ cancel out.}) $$
Apply logarithm property $\log(a/b) = \log a - \log b$:
$$ T(n) \le c n^2 (\log n - \log 2) + n^2 \quad (\text{Breaking down the logarithm.}) $$
$$ T(n) \le c n^2 \log n - c n^2 \log 2 + n^2 \quad (\text{Distributing } cn^2 \text{ across the terms.}) $$
We want to show $T(n) \le c n^2 \log n$. For this to be true, the remaining terms must be less than or equal to zero:
$$ - c n^2 \log 2 + n^2 \le 0 \quad (\text{Condition for the hypothesis to hold.}) $$
Factor out $n^2$:
$$ n^2 (1 - c \log 2) \le 0 \quad (\text{Simplifying the inequality.}) $$
Since $n^2 > 0$ for $n \ge 1$, we can divide by $n^2$:
$$ 1 - c \log 2 \le 0 \quad (\text{Focusing on the constant terms.}) $$
Rearrange to solve for $c$:
$$ 1 \le c \log 2 \quad (\text{Moving } c \log 2 \text{ to the right side.}) $$
$$ c \ge \frac{1}{\log 2} \quad (\text{Dividing by } \log 2 \text{. Assuming } \log = \log_2, \text{ so } \log 2 = 1.) $$
Thus, $c \ge 1$. We can choose $c=1$.

**Step 5: Handle the base cases.**
Our hypothesis is $T(n) \le c n^2 \log n$.
For $n=1$, $T(1)=1$.
Hypothesis: $c \cdot 1^2 \log 1 = c \cdot 0 = 0$.
So, $1 \le 0$, which is false. Again, $n \log n$ (and thus $n^2 \log n$) is 0 for $n=1$.
We need to pick a larger base case, $n_0 \ge 2$.
Let's check $n=2$:
$T(2) = 4T(2/2) + 2^2 = 4T(1) + 4$.
Given $T(1)=1$, we have $T(2) = 4(1) + 4 = 8$.
Now, check if $T(2) \le c \cdot 2^2 \log 2$ holds for our chosen $c$.
$8 \le c \cdot 4 \cdot 1 \quad (\text{Using } \log_2 2 = 1 \text{ and our hypothesis for } n=2.)$
$8 \le 4c \quad (\text{Simplifying.})$
$c \ge 2 \quad (\text{Solving for } c.)$
This requirement ($c \ge 2$) is consistent with our earlier finding ($c \ge 1$). So, we can choose $c=2$.
With $c=2$, our hypothesis $T(n) \le 2n^2 \log n$ holds for $n=2$ and for the inductive step for all $n \ge 2$.
Therefore, $T(n) = O(n^2 \log n)$.

**Final Answer:** $\boxed{T(n) = O(n^2 \log n)}$

**Reflection:** This example was similar to the first, reinforcing the pattern of dealing with the $\log 2$ term and adjusting the base case for functions that are zero at $n=1$.

---

### Example 3: $T(n) = T(n/2) + 1$, with base case $T(1)=1$.

**Problem:** Find an upper bound for the recurrence $T(n) = T(n/2) + 1$, given $T(1)=1$.

**Given:** Recurrence $T(n) = T(n/2) + 1$. Base case $T(1)=1$.
**Want:** An upper bound $O(f(n))$ for $T(n)$.

**Step 1: Guess the form of the solution.**
This recurrence is typical for algorithms that halve the problem size and do constant work at each step (e.g., binary search). The number of times you can halve $n$ until it reaches 1 is $\log n$. So, we guess $T(n) = O(\log n)$.
Let's hypothesize $T(n) \le c \log n$ for some constant $c > 0$ and for $n \ge n_0$.

**Step 2: Formulate the inductive hypothesis.**
Assume that for all $k < n$, $T(k) \le c \log k$ holds true.
Specifically, for $k=n/2$, we assume $T(n/2) \le c \log(n/2)$.

**Step 3: Substitute the hypothesis into the recurrence.**
$$ T(n) = T(n/2) + 1 $$
Substitute $T(n/2)$:
$$ T(n) \le c \log\left(\frac{n}{2}\right) + 1 \quad (\text{Replacing } T(n/2) \text{ with its assumed upper bound.}) $$

**Step 4: Simplify and solve for the constant $c$.**
Apply logarithm property $\log(a/b) = \log a - \log b$:
$$ T(n) \le c (\log n - \log 2) + 1 \quad (\text{Breaking down the logarithm.}) $$
$$ T(n) \le c \log n - c \log 2 + 1 \quad (\text{Distributing } c \text{ across the terms.}) $$
We want to show $T(n) \le c \log n$. For this to be true, the remaining terms must be less than or equal to zero:
$$ - c \log 2 + 1 \le 0 \quad (\text{Condition for the hypothesis to hold.}) $$
Rearrange to solve for $c$:
$$ 1 \le c \log 2 \quad (\text{Moving } c \log 2 \text{ to the right side.}) $$
$$ c \ge \frac{1}{\log 2} \quad (\text{Dividing by } \log 2 \text{. Assuming } \log = \log_2, \text{ so } \log 2 = 1.) $$
Thus, $c \ge 1$. We can choose $c=1$.

**Step 5: Handle the base cases.**
Our hypothesis is $T(n) \le c \log n$.
For $n=1$, $T(1)=1$.
Hypothesis: $c \cdot \log 1 = c \cdot 0 = 0$.
So, $1 \le 0$, which is false. Again, $\log n$ is 0 for $n=1$.
We need to pick a larger base case, $n_0 \ge 2$.
Let's check $n=2$:
$T(2) = T(2/2) + 1 = T(1) + 1$.
Given $T(1)=1$, we have $T(2) = 1 + 1 = 2$.
Now, check if $T(2) \le c \log 2$ holds for our chosen $c$.
$2 \le c \cdot 1 \quad (\text{Using } \log_2 2 = 1 \text{ and our hypothesis for } n=2.)$
$c \ge 2 \quad (\text{Solving for } c.)$
This requirement ($c \ge 2$) is consistent with our earlier finding ($c \ge 1$). So, we can choose $c=2$.
With $c=2$, our hypothesis $T(n) \le 2 \log n$ holds for $n=2$ and for the inductive step for all $n \ge 2$.
Therefore, $T(n) = O(\log n)$.

**Final Answer:** $\boxed{T(n) = O(\log n)}$

**Reflection:** This example again highlighted the common issue with base cases when the guessed function evaluates to zero. The solution is consistently to choose a larger $n_0$ and ensure $c$ satisfies that base case.

---

### Example 4: $T(n) = 3T(n/3) + n$, with base case $T(1)=1$. (Requires the "Subtraction Trick")

**Problem:** Find an upper bound for the recurrence $T(n) = 3T(n/3) + n$, given $T(1)=1$.

**Given:** Recurrence $T(n) = 3T(n/3) + n$. Base case $T(1)=1$.
**Want:** An upper bound $O(f(n))$ for $T(n)$.

**Step 1: Guess the form of the solution.**
This recurrence is similar to Example 1, but with $a=3, b=3$. $f(n)=n$.
Compare $f(n)$ with $n^{\log_b a} = n^{\log_3 3} = n^1 = n$. Since $f(n)$ is asymptotically equal to $n^{\log_b a}$, we might guess $T(n) = O(n \log n)$.
Let's hypothesize $T(n) \le c n \log n$ for some constant $c > 0$ and for $n \ge n_0$.

**Step 2: Formulate the inductive hypothesis.**
Assume that for all $k < n$, $T(k) \le c k \log k$ holds true.
Specifically, for $k=n/3$, we assume $T(n/3) \le c (n/3) \log(n/3)$.

**Step 3: Substitute the hypothesis into the recurrence.**
$$ T(n) = 3T(n/3) + n $$
Substitute $T(n/3)$:
$$ T(n) \le 3 \left( c \left(\frac{n}{3}\right) \log\left(\frac{n}{3}\right) \right) + n \quad (\text{Replacing } T(n/3) \text{ with its assumed upper bound.}) $$

**Step 4: Simplify and solve for the constant $c$.**
$$ T(n) \le c n \log\left(\frac{n}{3}\right) + n \quad (\text{The } 3 \text{ and } 1/3 \text{ cancel out.}) $$
Apply logarithm property $\log(a/b) = \log a - \log b$:
$$ T(n) \le c n (\log n - \log 3) + n \quad (\text{Breaking down the logarithm.}) $$
$$ T(n) \le c n \log n - c n \log 3 + n \quad (\text{Distributing } cn \text{ across the terms.}) $$
We want to show $T(n) \le c n \log n$. For this to be true, the remaining terms must be less than or equal to zero:
$$ - c n \log 3 + n \le 0 \quad (\text{Condition for the hypothesis to hold.}) $$
Factor out $n$:
$$ n (1 - c \log 3) \le 0 \quad (\text{Simplifying the inequality.}) $$
Since $n > 0$, we can divide by $n$:
$$ 1 - c \log 3 \le 0 \quad (\text{Focusing on the constant terms.}) $$
Rearrange to solve for $c$:
$$ 1 \le c \log 3 \quad (\text{Moving } c \log 3 \text{ to the right side.}) $$
$$ c \ge \frac{1}{\log 3} \quad (\text{Dividing by } \log 3 \text{. Assuming } \log = \log_2, \text{ so } \log_2 3 \approx 1.58.) $$
So, $c \ge 1/\log_2 3$. This seems to work! We can choose $c = 1/\log_2 3$.

**Wait! Let's re-examine.**
The previous examples had $\log 2$ in the denominator, which is 1. Here, $\log_2 3 \approx 1.58$.
So $c \ge 1.58$. Let's pick $c=2$.
The inductive step works for $T(n) \le c n \log n$.

**Step 5: Handle the base cases.**
Our hypothesis is $T(n) \le c n \log n$.
For $n=1$, $T(1)=1$.
Hypothesis: $c \cdot 1 \cdot \log 1 = c \cdot 0 = 0$.
So, $1 \le 0$, which is false. Again, $\log n$ is 0 for $n=1$.
We need to pick a larger base case. For $n/3$ to be an integer, $n$ must be a power of 3. Let's choose $n_0 = 3$.
$T(3) = 3T(3/3) + 3 = 3T(1) + 3$.
Given $T(1)=1$, we have $T(3) = 3(1) + 3 = 6$.
Now, check if $T(3) \le c \cdot 3 \log 3$ holds for our chosen $c$.
$6 \le c \cdot 3 \log 3 \quad (\text{Using } \log = \log_2 \text{ and our hypothesis for } n=3.)$
$2 \le c \log 3 \quad (\text{Dividing by 3.})$
$c \ge \frac{2}{\log 3} \quad (\text{Solving for } c. \text{ If } \log=\log_2, \text{ then } c \ge 2/\log_2 3 \approx 2/1.58 \approx 1.26.)$
This requirement ($c \ge 1.26$) is consistent with our earlier finding ($c \ge 1/\log_2 3 \approx 0.63$). So, we can choose $c=2$.
With $c=2$, our hypothesis $T(n) \le 2n \log n$ holds for $n=3$ and for the inductive step for all $n \ge 3$.
Therefore, $T(n) = O(n \log n)$.

**Wait, what if the simple guess *didn't* work?**
Let's consider a slightly different recurrence where the basic $c f(n)$ guess won't work easily.
Suppose $T(n) = 2T(n/2) + \sqrt{n}$.
If we guess $T(n) \le c n$:
$T(n) \le 2(c n/2) + \sqrt{n} = c n + \sqrt{n}$.
We need $c n + \sqrt{n} \le c n$, which implies $\sqrt{n} \le 0$, which is false for $n>0$.
This is where the "subtraction trick" comes in.
Let's use the subtraction trick for the original example, even though it wasn't strictly necessary for the $O(n \log n)$ bound, to demonstrate the technique.

**Re-attempting Example 4 with the "Subtraction Trick" (to demonstrate the method, even if not strictly needed for the $O$ bound):**
**Problem:** Find an upper bound for the recurrence $T(n) = 3T(n/3) + n$, with base case $T(1)=1$.

**Step 1: Guess the form of the solution (with subtraction trick).**
We still guess $T(n) = O(n \log n)$, but we strengthen the hypothesis to make the algebra work more cleanly or if the simple form fails.
Let's hypothesize $T(n) \le c n \log n - d n$ for some positive constants $c, d$ and for $n \ge n_0$.

**Step 2: Formulate the inductive hypothesis.**
Assume that for all $k < n$, $T(k) \le c k \log k - d k$ holds true.
Specifically, for $k=n/3$, we assume $T(n/3) \le c (n/3) \log(n/3) - d (n/3)$.

**Step 3: Substitute the hypothesis into the recurrence.**
$$ T(n) = 3T(n/3) + n $$
Substitute $T(n/3)$:
$$ T(n) \le 3 \left( c \left(\frac{n}{3}\right) \log\left(\frac{n}{3}\right) - d \left(\frac{n}{3}\right) \right) + n \quad (\text{Replacing } T(n/3) \text{ with its stronger assumed upper bound.}) $$

**Step 4: Simplify and solve for the constants $c$ and $d$.**
$$ T(n) \le c n \log\left(\frac{n}{3}\right) - d n + n \quad (\text{Distributing the } 3 \text{ and simplifying.}) $$
Apply logarithm property $\log(a/b) = \log a - \log b$:
$$ T(n) \le c n (\log n - \log 3) - d n + n \quad (\text{Breaking down the logarithm.}) $$
$$ T(n) \le c n \log n - c n \log 3 - d n + n \quad (\text{Distributing } cn \text{ across the terms.}) $$
We want to show $T(n) \le c n \log n - d n$. For this to be true, the remaining terms must be less than or equal to zero:
$$ - c n \log 3 + n \le 0 \quad (\text{Notice the } -dn \text{ on both sides cancels out.}) $$
Factor out $n$:
$$ n (1 - c \log 3) \le 0 $$
Since $n > 0$, we can divide by $n$:
$$ 1 - c \log 3 \le 0 $$
$$ c \ge \frac{1}{\log 3} $$
This condition for $c$ is the same as before. Let's choose $c = 1/\log_2 3 \approx 0.63$.
Now we need to satisfy the base cases for both $c$ and $d$.

**Step 5: Handle the base cases.**
Our hypothesis is $T(n) \le c n \log n - d n$.
As before, $n=1$ is problematic because $\log 1 = 0$, making $c n \log n - d n = -d$.
$T(1)=1$, so $1 \le -d$. This is impossible since $d$ must be positive.
We need to pick a larger base case, $n_0 \ge 3$ (since $n/3$ is used).
Let's choose $n=3$.
$T(3) = 3T(1) + 3 = 3(1) + 3 = 6$.
Now, check if $T(3) \le c \cdot 3 \log 3 - d \cdot 3$ holds.
$6 \le c \cdot 3 \log 3 - 3d \quad (\text{Using our hypothesis for } n=3.)$
Substitute $c = 1/\log 3$:
$6 \le \left(\frac{1}{\log 3}\right) \cdot 3 \log 3 - 3d \quad (\text{Substituting the value of } c.)$
$6 \le 3 - 3d \quad (\text{The } \log 3 \text{ terms cancel.})$
$3 \le -3d \quad (\text{Subtracting 3 from both sides.})$
$d \le -1 \quad (\text{Dividing by 3. Oh, wait! Dividing by a negative flips the inequality.})$
$d \ge -1$.
This is a problem! We need $d > 0$. This means our choice of $c = 1/\log 3$ is too tight for the base case with the subtraction trick.
We need to choose $c$ large enough to satisfy *both* the inductive step *and* the base case.
From the inductive step, we need $c \ge 1/\log 3$.
From the base case, we need $6 \le 3c \log 3 - 3d$.
Let's choose $c$ to be a slightly larger value, say $c=2$.
Then from the inductive step, $1 - 2 \log 3 \le 0 \implies 1 \le 2 \log 3 \implies \log 3 \ge 1/2$. This is true since $\log_2 3 \approx 1.58 > 0.5$. So $c=2$ works for the inductive step.
Now check base case with $c=2$:
$6 \le 2 \cdot 3 \log 3 - 3d$
$6 \le 6 \log 3 - 3d$
$3d \le 6 \log 3 - 6$
$d \le 2 \log 3 - 2$
Since $\log_2 3 \approx 1.58$, $d \le 2(1.58) - 2 = 3.16 - 2 = 1.16$.
So we can choose any $d$ such that $0 < d \le 1.16$. Let's pick $d=1$.
With $c=2$ and $d=1$, our hypothesis $T(n) \le 2n \log n - n$ holds for $n=3$ and for the inductive step for all $n \ge 3$.
Therefore, $T(n) = O(n \log n)$.

**Final Answer (using the subtraction trick for demonstration):** $\boxed{T(n) = O(n \log n)}$

**Reflection:** This example demonstrates that sometimes the "simple" guess $T(n) \le c f(n)$ isn't strong enough, even if the $O$-notation is correct. The "subtraction trick" ($T(n) \le c f(n) - d g(n)$) provides the necessary slack in the inequality to make the inductive step work. It also shows that choosing $c$ and $d$ requires satisfying *all* conditions (inductive step and base cases) simultaneously.

---

### Example 5: $T(n) = T(\lfloor n/2 \rfloor) + T(\lceil n/2 \rceil) + 1$, with base case $T(1)=1$.

**Problem:** Find an upper bound for the recurrence $T(n) = T(\lfloor n/2 \rfloor) + T(\lceil n/2 \rceil) + 1$, given $T(1)=1$.

**Given:** Recurrence $T(n) = T(\lfloor n/2 \rfloor) + T(\lceil n/2 \rceil) + 1$. Base case $T(1)=1$.
**Want:** An upper bound $O(f(n))$ for $T(n)$.

**Step 1: Guess the form of the solution.**
This recurrence is similar to $T(n) = 2T(n/2) + 1$. From similar recurrences (like counting nodes in a binary tree), we might guess $T(n) = O(n)$.
Let's hypothesize $T(n) \le c n - d$ for some positive constants $c, d$ and for $n \ge n_0$. (The $-d$ term is often helpful for recurrences with constant additive terms, as seen in the "subtraction trick").

**Step 2: Formulate the inductive hypothesis.**
Assume that for all $k < n$, $T(k) \le c k - d$ holds true.
Specifically, for $k=\lfloor n/2 \rfloor$ and $k=\lceil n/2 \rceil$, we assume:
$T(\lfloor n/2 \rfloor) \le c \lfloor n/2 \rfloor - d$
$T(\lceil n/2 \rceil) \le c \lceil n/2 \rceil - d$

**Step 3: Substitute the hypothesis into the recurrence.**
$$ T(n) = T(\lfloor n/2 \rfloor) + T(\lceil n/2 \rceil) + 1 $$
Substitute $T(\lfloor n/2 \rfloor)$ and $T(\lceil n/2 \rceil)$:
$$ T(n) \le (c \lfloor n/2 \rfloor - d) + (c \lceil n/2 \rceil - d) + 1 \quad (\text{Replacing subproblems with their assumed upper bounds.}) $$

**Step 4: Simplify and solve for the constants $c$ and $d$.**
Factor out $c$:
$$ T(n) \le c (\lfloor n/2 \rfloor + \lceil n/2 \rceil) - 2d + 1 \quad (\text{Grouping terms.}) $$
Recall the property $\lfloor x \rfloor + \lceil x \rceil = 2x$ for any real number $x$. For integers $n$, $\lfloor n/2 \rfloor + \lceil n/2 \rceil = n$.
$$ T(n) \le c n - 2d + 1 \quad (\text{Using the property of floor and ceil.}) $$
We want to show $T(n) \le c n - d$. For this to be true, the remaining terms must be less than or equal to the target $-d$:
$$ c n - 2d + 1 \le c n - d \quad (\text{This is the condition we need to satisfy.}) $$
Subtract $c n$ from both sides:
$$ - 2d + 1 \le - d \quad (\text{Simplifying the inequality.}) $$
Add $2d$ to both sides:
$$ 1 \le d \quad (\text{Solving for } d. \text{ So we need } d \ge 1.) $$
We can choose $d=1$.

**Step 5: Handle the base cases.**
Our hypothesis is $T(n) \le c n - d$. We chose $d=1$, so $T(n) \le c n - 1$.
Given $T(1)=1$.
Check $n=1$:
$T(1) = 1$.
Hypothesis: $c \cdot 1 - 1 = c - 1$.
We need $1 \le c - 1$.
$c \ge 2 \quad (\text{Solving for } c.)$
This means we can choose any $c \ge 2$. Let's pick $c=2$.
With $c=2$ and $d=1$, our hypothesis $T(n) \le 2n - 1$ holds for $n=1$ and for the inductive step for all $n \ge 1$.
Therefore, $T(n) = O(n)$.

**Final Answer:** $\boxed{T(n) = O(n)}$

**Reflection:** This example demonstrates how floor/ceil functions are often handled in recurrence relations: they sum to $n$, simplifying the algebra. It also shows a clear case where the "subtraction trick" ($T(n) \le cn - d$) is extremely useful to make the inductive step work for a simple linear function.

## 6. Common mistakes and traps

1.  **Using Big O notation in the inductive hypothesis:** This is the most frequent and critical error. You *cannot* assume $T(k) = O(k \log k)$ because $O(k \log k)$ hides constants and lower-order terms. The purpose of the substitution method is to *find* those constants and prove the specific inequality $T(k) \le c k \log k$. Using $O$-notation makes the proof circular and invalid.
2.  **Ignoring the base cases:** A proof by induction is incomplete without verifying the base cases. Even if your inductive step holds, if it doesn't hold for the smallest values of $n$, the entire proof is invalid.
3.  **Incorrectly handling base cases when $f(n)=0$ for small $n$:** As seen in examples, if your guessed function $f(n)$ (e.g., $n \log n$ or $\log n$) evaluates to 0 for $n=1$, it will often fail the base case $T(1)=1$. The solution is to choose a slightly larger $n_0$ (e.g., $n=2$ or $n=3$) as your base case, and ensure $c$ satisfies that specific value of $T(n_0)$.
4.  **Algebraic errors:** Mistakes in manipulating logarithms, inequalities, or fractions can easily lead to incorrect conclusions about $c$ or $d$. Double-check every algebraic step.
5.  **Not strengthening the inductive hypothesis (forgetting the "subtraction trick"):** If you reach a point where your simplified inequality looks like $T(n) \le c f(n) + \text{positive_term}$ (e.g., $cn + 1 \le cn$), your simple guess $T(n) \le c f(n)$ might not be strong enough. You need to try $T(n) \le c f(n) - d g(n)$ to introduce the necessary "slack" to absorb the positive term.
6.  **Not choosing $c$ (and $d$) to satisfy *all* conditions:** The chosen constants $c$ and $d$ must simultaneously satisfy the inequality derived from the inductive step *and* all the base cases you check. If a $c$ works for the inductive step but not the base case, you need to pick a larger $c$ (or adjust $n_0$).

## 7. Textbook-precise explanation

The substitution method for solving recurrence relations is a formal technique based on mathematical induction to prove an asymptotic bound (typically an upper bound $O$, or sometimes a lower bound $\Omega$) for a recurrence.

Given a recurrence relation for a function $T(n)$, the method proceeds as follows:

1.  **Guess the form of the solution:** Based on intuition, experience, or other methods (like the recursion tree method or Master Theorem), propose an asymptotic bound, say $O(f(n))$. This means we hypothesize that $T(n) \le c f(n)$ for some positive constant $c$ and all sufficiently large $n$ (i.e., $n \ge n_0$). If proving a lower bound, we would hypothesize $T(n) \ge c f(n)$. For a tight bound $\