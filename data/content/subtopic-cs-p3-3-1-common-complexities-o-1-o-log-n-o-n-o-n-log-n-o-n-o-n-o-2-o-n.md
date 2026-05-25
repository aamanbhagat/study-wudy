## What it is
Common complexities are standard categories used in Big O notation to describe how an algorithm's runtime or memory usage scales with the size of the input, $n$. These categories, from fastest-growing to slowest-growing, form a hierarchy: $O(n!)$, $O(2^n)$, $O(n^3)$, $O(n^2)$, $O(n \log n)$, $O(n)$, $O(\log n)$, and $O(1)$. This provides a standardized language for comparing the efficiency of different algorithms.

## Why it matters
Understanding this hierarchy is critical for selecting the right algorithm for a given task, especially with large datasets. In aerospace, simulating fluid dynamics over a rocket body involves massive grids ($n$ can be billions of points); an $O(n^2)$ algorithm is computationally infeasible, while an $O(n \log n)$ algorithm might be possible. In machine learning, training models involves optimization problems where an exponential-time algorithm ($O(2^n)$) would never finish, dictating the need for polynomial-time approximations.

## When to study it
You should be comfortable with the formal definition of Big O notation ($f(n) \in O(g(n))$), the concept of upper bounds, and the properties of logarithms and exponents. Specifically, you must know that $\log_a(n) = \frac{\log_b(n)}{\log_b(a)}$, which is why the base of the logarithm is dropped in Big O analysis. If you are not solid on these, review them first.

## How to study it (step by step)
1.  **Review Fundamentals**: Spend 20 minutes reviewing the graphs of $y=1$, $y=\log x$, $y=x$, $y=x^2$, and $y=2^x$. Get a visceral feel for how fast each one grows.
2.  **Code & Count**: For each complexity class, write a trivial piece of code that exhibits it. For $O(n)$, a single `for` loop from $1$ to $n$. For $O(n^2)$, a nested `for` loop. For $O(\log n)$, a simple binary search. As you write, manually count the number of primary operations for $n=4, 8, 16$.
3.  **Plot the Growth**: Use a plotting tool (Python's matplotlib, Desmos, etc.) to graph all these functions on the same axes for $n=1$ to $100$. Observe the "takeover" points where faster-growing functions surpass slower ones. This visual is non-negotiable for building intuition.
4.  **Analyze Two Sorts**: Implement or analyze Bubble Sort ($O(n^2)$) and Merge Sort ($O(n \log n)$). Run them on an array of 1,000 elements, then 10,000, then 100,000. Time their execution. The performance difference will cease to be abstract and become concrete.
5.  **Study the Intractable**: Read about the Traveling Salesperson Problem (TSP). Understand why the brute-force solution is $O(n!)$ and why this makes it impossible to solve optimally for even a moderate number of cities (e.g., $n=50$). This demonstrates the hard wall between polynomial and exponential/factorial time.

## Key ideas, with intuition
1.  **The Great Divide: Polynomial vs. Exponential.** Algorithms with complexities like $O(n^2)$ or $O(n^3)$ are called *polynomial time* algorithms. While $O(n^3)$ is slower than $O(n^2)$, they are both considered "tractable" or "efficient" for reasonably large $n$. Algorithms like $O(2^n)$ and $O(n!)$ are *exponential time*. The amount of work they require explodes so rapidly that they are only usable for very small $n$. This is the most important dividing line in complexity theory.

2.  **Logarithmic time means "halving the problem".** An algorithm is $O(\log n)$ if it reduces the size of the problem by a constant fraction (e.g., by 1/2) in each step. Think of searching a sorted dictionary: you open to the middle, decide which half the word is in, and discard the other half. The number of steps to find the word grows as the logarithm of the number of pages, not linearly.
    $$ \text{Problem size at step } k: N_k = \frac{n}{2^k} $$
    $$ \text{We stop when } N_k \approx 1 \implies \frac{n}{2^k} = 1 \implies n = 2^k \implies k = \log_2 n $$

3.  **The Hierarchy of Growth.** For large enough $n$, the growth rates are strictly ordered. This allows you to immediately compare algorithms.
    $$ O(1) < O(\log n) < O(n) < O(n \log n) < O(n^2) < O(n^3) < \dots < O(2^n) < O(n!) $$
    An $O(n)$ algorithm will *always* beat an $O(n^2)$ algorithm for a sufficiently large input, regardless of constant factors.

## Worked example
**Problem:** Analyze the time complexity of the following Python function, which checks if a list contains any duplicate values.

```python
def has_duplicates(items):
    n = len(items)
    for i in range(n):
        for j in range(i + 1, n):
            if items[i] == items[j]:
                return True
    return False
```

**Step-by-step derivation:**

1.  **Identify the input size.** The primary parameter that determines the workload is the number of elements in the list `items`. Let's call this $n$.

2.  **Analyze the loops.** We have two nested `for` loops. The outer loop, controlled by `i`, runs from `0` to `n-1`. The inner loop, controlled by `j`, runs from `i + 1` to `n-1`.

3.  **Count the operations in the inner loop.** The core operation is the comparison `items[i] == items[j]`. We need to count how many times this comparison happens.

4.  **Express the count as a summation.** The number of comparisons depends on the value of `i` in the outer loop.
    - When $i=0$, $j$ runs from $1$ to $n-1$. This is $n-1$ comparisons.
    - When $i=1$, $j$ runs from $2$ to $n-1$. This is $n-2$ comparisons.
    - ...
    - When $i=n-2$, $j$ runs from $n-1$ to $n-1$. This is $1$ comparison.
    - When $i=n-1$, the inner loop does not run. This is $0$ comparisons.

    The total number of comparisons is the sum of an arithmetic series:
    $$ T(n) = (n-1) + (n-2) + \dots + 1 + 0 $$

5.  **Solve the summation.** This is the sum of the first $n-1$ integers. The formula for the sum of the first $k$ integers is $\frac{k(k+1)}{2}$. Here, $k = n-1$.
    $$ T(n) = \frac{(n-1)((n-1)+1)}{2} = \frac{(n-1)n}{2} = \frac{n^2 - n}{2} $$

6.  **Apply the definition of Big O.** We need to find the simplest function $g(n)$ such that $T(n) \in O(g(n))$. We drop constant factors and lower-order terms.
    $$ T(n) = \frac{1}{2}n^2 - \frac{1}{2}n $$
    The dominant term is $\frac{1}{2}n^2$. We drop the constant coefficient $\frac{1}{2}$.

    Therefore, the time complexity is $O(n^2)$.

**Reflection:** The nested loop structure, where the inner loop's execution depends on the outer loop's progress in this triangular fashion, is a classic pattern for $O(n^2)$ complexity. Each element is compared with every other element that comes after it.

## Diagrams
This diagram illustrates the relative growth rates of common complexities. Notice how quickly the exponential and factorial functions become vertical, representing their intractability.

```text
Operations
  ^
  |
  |                                                  *** O(n!)
  |                                               **
  |                                             **  O(2^n)
  |                                           **
  |                                          *
  |                                        **
  |                                      **
  |                                    **
  |                                  **
  |                                **
  |                              **
  |                            **
  |                         ***
  |                      ***  O(n^2)
  |                   ***
  |                ***
  |             ***
  |          ***   O(n log n)
  |       ***
  |    ***  O(n)
  | ***
  |** O(log n)
  |_________________ O(1)
  +--------------------------------------------------> n (Input Size)
```

## Memory technique — remember this forever
1.  **The "Address Book" Analogy:**
    - **$O(1)$:** Knowing a person's page number. Instant lookup.
    - **$O(\log n)$:** The book is sorted by name. You open to the middle, check the name, and discard half the book. Repeat.
    - **$O(n)$:** The book is unsorted. To find a name, you must read every entry from start to finish.
    - **$O(n \log n)$:** The cost to sort the entire address book so you can do fast lookups later.
    - **$O(n^2)$:** You have an unsorted book. To find if any two people share a birthday, you pick a person and compare their birthday to every other person, then repeat for the next person.
    - **$O(2^n)$:** Finding all possible groups of people you could invite to a party (the "power set").
    - **$O(n!)$:** Finding every possible seating arrangement for all the people at the party.

2.  **Must-Overlearn Facts:** The hierarchy is non-negotiable. Burn it into your memory.
    $$ O(1) < O(\log n) < O(n) < O(n \log n) < O(n^2) < O(2^n) < O(n!) $$

3.  **Spaced Repetition Schedule:**
    - Review this entire lesson in **1 day**.
    - Re-draw the growth graph from memory in **3 days**.
    - Explain the address book analogy to a friend (or a rubber duck) in **7 days**.
    - Write code snippets for $O(1), O(n), O(n^2), O(\log n)$ from scratch in **16 days**.
    - Re-derive the worked example from scratch in **35 days**.

4.  **First Principles Pathway:** If you forget, reason from the code's structure.
    - No loops, just simple statements? $\implies O(1)$.
    - A single loop over $n$ items? $\implies O(n)$.
    - Two nested loops over $n$ items? $\implies O(n^2)$.
    - A loop that halves the remaining items at each step? $\implies O(\log n)$.
    - A recursive call that splits the problem in half and does linear work to combine? $\implies O(n \log n)$.

## Common mistakes
1.  **Thinking Logarithms are Slow.** Students new to $O(\log n)$ see the word "log" and think it's complicated and slow. It is incredibly fast. For an input of a billion items ($n=10^9$), $\log_2 n \approx 30$.
2.  **Confusing $O(n^2)$ and $O(2^n)$.** They look similar, but their performance is worlds apart. For $n=20$, $n^2 = 400$, while $2^n \approx 1,000,000$. Polynomial growth is manageable; exponential growth is a brick wall.
3.  **Prematurely Dropping Constants.** You can only drop constants and lower-order terms *after* you have the full expression for $T(n)$. Don't look at a loop that runs to $n/2$ and immediately call it $O(n)$ without thinking. First, establish it's $T(n) = c \cdot (n/2)$, *then* simplify to $O(n)$.
4.  **Forgetting the "Worst-Case" Assumption.** Unless specified otherwise, Big O refers to the worst-case scenario. An algorithm to find an item in a list might find it on the first try ($O(1)$ best case), but its complexity is $O(n)$ because in the worst case, you have to check every element.

## Self-check
1.  What is the time complexity of a function that prints the sum of the first and last element of an array of size $n$?
2.  You have two lists, each of size $n$. You write an algorithm that checks if any item from the first list is also present in the second list using nested loops. What is its time complexity?
3.  An algorithm processes a dataset of size $n$. It works by first sorting the data and then iterating through the sorted data once. If the best available sorting algorithm is used, what is the overall time complexity of this entire process?