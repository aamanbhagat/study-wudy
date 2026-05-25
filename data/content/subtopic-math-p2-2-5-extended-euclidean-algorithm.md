## What it is
The Euclidean algorithm is a method for finding the greatest common divisor (GCD) of two integers. The *Extended* Euclidean algorithm takes this a step further: it finds the integer coefficients (called Bézout coefficients) that allow you to express that GCD as a linear combination of the two original integers. If your numbers are $a$ and $b$, this algorithm finds the integers $x$ and $y$ such that $ax + by = \gcd(a, b)$.

## Why it matters
This is the computational engine of modern cryptography. In the RSA algorithm, you must find the modular inverse of a number to generate a private key; the Extended Euclidean algorithm is exactly how computers calculate this efficiently. In physics and mechanical engineering, it solves linear Diophantine equations, which are required when calculating discrete gear ratios or balancing chemical and nuclear equations where fractional atoms or teeth are physically impossible.

## When to study it
Do not attempt this until you have mastered:
1. The standard Euclidean Algorithm (finding the GCD via repeated division).
2. The Division Algorithm ($a = qb + r$).
3. Basic algebraic substitution and factorization.
4. The fundamentals of modular arithmetic.

If you cannot quickly use the standard Euclidean algorithm to find $\gcd(252, 198)$, go back and drill that first.

## How to study it (step by step)
1. **Run the standard algorithm:** Write out the standard Euclidean algorithm for two numbers $a$ and $b$ as a stack of equations in the form $a = qb + r$. (10 mins)
2. **Isolate the remainders:** Rewrite every equation so the remainder $r$ is by itself on one side: $r = a - qb$. (5 mins)
3. **Master back-substitution:** Start with the equation for the final non-zero remainder (which is the GCD). Substitute the remainder from the equation above it into this equation. (15 mins)
4. **Group, do not compute:** After substituting, group the terms algebraically. *Never* multiply out the terms to collapse them back into a single number, or you will undo the algorithm. (15 mins)
5. **Iterate to the top:** Repeat the substitution and grouping process moving up the stack until your equation is purely in terms of the original $a$ and $b$. (15 mins)
6. **Learn the tabular method:** Once you understand the back-substitution from first principles, learn the forward (tabular) method for the Extended Euclidean algorithm. It is vastly less prone to arithmetic errors during exams or coding. (30 mins)

## Key ideas, with intuition

**Bézout’s Identity**
For any non-zero integers $a$ and $b$, there exist integers $x$ and $y$ such that:
$$ax + by = \gcd(a, b)$$
This proves that the GCD is the smallest positive integer that can be written as a linear combination of $a$ and $b$. 

**Remainders as Variables**
The intuition that makes the algorithm click is treating your original numbers and intermediate remainders as algebraic variables, $X, Y, Z$, rather than numbers to be evaluated. If you have $23 - 11(25 - 1(23))$, you do not calculate $25 - 23 = 2$. You treat $23$ and $25$ as variables: $X - 11(Y - X) = 12X - 11Y$. 

**The Modular Inverse Connection**
If $\gcd(a, m) = 1$, they are coprime. By Bézout's identity, $ax + my = 1$. 
If we take this equation modulo $m$, the $my$ term becomes $0$, leaving:
$$ax \equiv 1 \pmod m$$
Here, $x$ is the modular inverse of $a$ modulo $m$. The Extended Euclidean algorithm is the rigorous way to find $x$.

## Worked example
**Problem:** Find $\gcd(73, 25)$ and express it as a linear combination $73x + 25y$.

**Step 1: Standard Euclidean algorithm**
$$73 = 2(25) + 23$$
$$25 = 1(23) + 2$$
$$23 = 11(2) + 1$$
$$2 = 2(1) + 0$$
The last non-zero remainder is $1$. So, $\gcd(73, 25) = 1$.

**Step 2: Isolate the remainders**
Rewrite the first three equations:
(Eq 1) $23 = 73 - 2(25)$
(Eq 2) $2 = 25 - 1(23)$
(Eq 3) $1 = 23 - 11(2)$

**Step 3: Back-substitute from the bottom up**
Start with Eq 3:
$$1 = 23 - 11(2)$$

Substitute the remainder $2$ using Eq 2:
$$1 = 23 - 11(25 - 1(23))$$

Distribute the $-11$, treating $23$ and $25$ as variables:
$$1 = 23 - 11(25) + 11(23)$$
Group the $23$s:
$$1 = 12(23) - 11(25)$$

Now substitute the remainder $23$ using Eq 1:
$$1 = 12(73 - 2(25)) - 11(25)$$

Distribute the $12$:
$$1 = 12(73) - 24(25) - 11(25)$$
Group the $25$s:
$$1 = 12(73) - 35(25)$$

**Result:** $x = 12$, $y = -35$.
*Reflection:* We systematically replaced each remainder with a combination of the previous remainders until only the original two numbers ($73$ and $25$) were left. 

## Diagrams

The flow of back-substitution is a ladder. You move down to find the GCD, then climb back up, swapping out the smallest piece for larger pieces at each rung.

```text
FORWARD PASS (Division)          BACKWARD PASS (Substitution)
-----------------------          ----------------------------
73 = 2(25) + 23                  [3] 1 = 12(73) - 35(25)
      |      |                           ^           ^
      v      v                           | (Sub 23)  |
25 = 1(23) + 2                   [2] 1 = 12(23) - 11(25)
      |      |                           ^           ^
      v      v                           | (Sub 2)   |
23 = 11(2) + 1  ===============> [1] 1 = 1(23) - 11(2)
```

## Memory technique — remember this forever
1. **The Hook:** "Don't take the bait; treat them like variables." The biggest trap is the urge to do basic arithmetic. When you see $12(73) - 24(25)$, your brain wants to multiply $12 \times 73$. Don't. $73$ and $25$ are your $X$ and $Y$.
2. **Must overlearn:** Bézout's Identity: $ax + by = \gcd(a, b)$.
3. **Spaced-repetition schedule:** Review a new pair of numbers to apply the algorithm on day 1, day 3, day 7, day 16, and day 35.
4. **First principles pathway:** If you forget the algorithm, write out the standard division steps $a = qb + r$. Realize that you want $r$ in terms of $a$ and $b$. Algebra dictates you must isolate $r$ and substitute upwards. The algorithm is just basic algebra applied systematically.

## Common mistakes
* **Losing the negative sign:** When distributing a negative coefficient during back-substitution (e.g., $-11(25 - 1(23))$), students frequently write $-11(25) - 11(23)$ instead of $+ 11(23)$. 
* **Collapsing the numbers:** Multiplying out the intermediate steps (e.g., turning $73 - 2(25)$ into $23$). This destroys the linear combination you are trying to build.
* **Starting at the wrong equation:** Students sometimes try to back-substitute starting from the equation with the $0$ remainder ($2 = 2(1) + 0$). Always start at the equation yielding the GCD (the last non-zero remainder).

## Self-check
1. Find the GCD of $118$ and $34$, and express it as a linear combination of $118$ and $34$.
2. Find the modular inverse of $17$ modulo $312$ using the Extended Euclidean algorithm.
3. Solve the linear Diophantine equation $144x + 89y = 2$. (Hint: What is $\gcd(144, 89)$? How does it relate to the number $2$?)