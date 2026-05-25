## 1. What it is — in plain English

Imagine you have two numbers, say 24 and 15. The regular Euclidean algorithm is like a smart detective that finds their greatest common divisor (GCD) – the biggest number that divides both of them perfectly. For 24 and 15, that's 3.

Now, the *Extended* Euclidean algorithm is like that same detective, but it does something extra special. Not only does it find the GCD (which is 3 in our example), but it also figures out how to write that GCD as a combination of the original two numbers. It finds two other numbers, let's call them $x$ and $y$, such that if you multiply your first number by $x$ and your second number by $y$, and then add those two results, you get the GCD. So for 24 and 15, it would find $x$ and $y$ such that $24x + 15y = 3$.

Think of it like this: You have two different-sized measuring cups, say a 24-ounce cup and a 15-ounce cup. You want to measure out exactly 3 ounces of liquid. How can you do it? The Extended Euclidean algorithm tells you exactly how many times to fill or empty each cup (and whether to add or subtract their contents) to get that precise 3 ounces. You might fill the 24-ounce cup once ($+1 \times 24$), then empty the 15-ounce cup one time ($+ (-1) \times 15$), and you'd have 9 ounces. But if you filled the 24-ounce cup twice ($+2 \times 24 = 48$) and then emptied the 15-ounce cup three times ($-3 \times 15 = -45$), you'd be left with $48 - 45 = 3$ ounces! So $x=2$ and $y=-3$ would be the numbers.

In essence, it's a clever way to "unwind" the steps of the regular Euclidean algorithm backwards to express the GCD as a linear combination of the original inputs. This property, that the GCD of two numbers can always be written in this form, is incredibly powerful and has a special name: Bezout's Identity. The Extended Euclidean algorithm is the practical method to find those specific $x$ and $y$ coefficients.

## 2. Why it matters — real-world applications

The Extended Euclidean algorithm (EEA) is far from a mere mathematical curiosity; it's a foundational tool with critical applications across various fields, especially where secure communication and precise calculations are paramount.

1.  **Cryptography (RSA Algorithm):** This is perhaps its most famous application. Modern secure communication, from online banking to encrypted messaging (like WhatsApp), relies heavily on public-key cryptography, particularly the RSA algorithm. A core step in RSA involves finding a "decryption key" $d$ given an "encryption key" $e$ and a modulus $n$. This $d$ is essentially the modular multiplicative inverse of $e$ modulo $n$. The EEA is precisely the algorithm used to compute this modular inverse, which allows secure messages to be decrypted. Without the EEA, RSA as we know it would not function, making much of the internet vulnerable.

2.  **Solving Linear Diophantine Equations:** These are equations of the form $ax + by = c$, where $a, b, c$ are integers, and we are looking for integer solutions for $x$ and $y$. The EEA is the primary method to find *one particular solution* to $ax + by = \text{gcd}(a,b)$. Once you have that, you can scale it to solve $ax + by = c$ (if $c$ is a multiple of $\text{gcd}(a,b)$) and then find all other possible integer solutions. This is crucial in fields like resource allocation, scheduling, and even some aspects of computer science where integer constraints are common. For instance, imagine a manufacturing process where you need to produce a certain number of units using two machines with different production rates and costs per batch; the EEA can help determine integer batches to meet a target.

3.  **Computer Graphics and Image Processing:** While less direct, the concept of GCD and modular arithmetic (which the EEA facilitates) appears in algorithms for tasks like tiling patterns, generating seamless textures, or even optimizing pixel arrangements. For example, if you're trying to tile a screen with two different sized patterns, the GCD can help ensure they align perfectly, and the relationships derived from the EEA might inform how to adjust sizes for optimal fit without gaps or overlaps.

4.  **Error-Correcting Codes (e.g., Reed-Solomon codes):** In digital communication and data storage (CDs, DVDs, QR codes, deep space communication), information can get corrupted. Error-correcting codes add redundancy to data so that errors can be detected and corrected. Many advanced error-correction algorithms, such as Reed-Solomon codes, rely on computations in finite fields (Galois fields). Finding modular inverses in these fields, which is a key operation for decoding, is done using an adapted form of the Extended Euclidean algorithm. This ensures that data sent from Mars rovers or stored on your hard drive remains intact despite noise or physical damage.

## 3. Prerequisites — what you must know first

Before diving into the Extended Euclidean algorithm, ensure you have a solid grasp of these fundamental concepts. Each is a building block for understanding the "extended" part.

*   **Basic Arithmetic Operations:** Proficiency in addition, subtraction, multiplication, and division with integers, including handling negative numbers.
*   **Division Algorithm (with remainder):** The ability to express any integer $a$ divided by a positive integer $b$ as $a = qb + r$, where $q$ is the quotient and $r$ is the remainder, with $0 \le r < b$.
*   **Euclidean Algorithm:** The iterative process for finding the greatest common divisor (GCD) of two integers by repeatedly applying the division algorithm. You must be comfortable performing this algorithm forwards.
*   **Greatest Common Divisor (GCD):** Understanding what the GCD of two numbers means and how to find it.
*   **Linear Equations:** Basic algebra skills, especially solving for variables and substituting expressions into other equations.
*   **Modular Arithmetic (basic understanding):** While not strictly required for the *algorithm itself*, understanding modular inverses (which the EEA computes) is a major motivation for learning it. Knowing what $a \equiv b \pmod m$ means is helpful.

## 4. The core idea — step by step

The core idea of the Extended Euclidean algorithm is to "unwind" the steps of the standard Euclidean algorithm. While the standard algorithm works *forwards* to find the GCD, the extended version works *backwards* from the GCD to express it as a linear combination of the original two numbers. This is known as Bezout's Identity: for any two integers $a$ and $b$, there exist integers $x$ and $y$ such that $ax + by = \text{gcd}(a,b)$.

Let's walk through it with an example: finding $x, y$ for $\text{gcd}(99, 78)$.

### Step 1: Perform the Standard Euclidean Algorithm

**Plain English:** First, just do the regular GCD calculation. Divide the larger number by the smaller, then replace the larger number with the smaller, and the smaller with the remainder. Repeat until the remainder is zero. The last non-zero remainder is the GCD.

**Example:** For $a=99$ and $b=78$:
1.  $99 = 1 \cdot 78 + 21$
2.  $78 = 3 \cdot 21 + 15$
3.  $21 = 1 \cdot 15 + 6$
4.  $15 = 2 \cdot 6 + 3$
5.  $6 = 2 \cdot 3 + 0$

The last non-zero remainder is 3. So, $\text{gcd}(99, 78) = 3$.

**Formal/Mathematical Version:**
Given integers $a, b$ with $a \ge b > 0$:
$$a = q_1 b + r_1 \quad (0 \le r_1 < b)$$
$$b = q_2 r_1 + r_2 \quad (0 \le r_2 < r_1)$$
$$r_1 = q_3 r_2 + r_3 \quad (0 \le r_3 < r_2)$$
$$\vdots$$
$$r_{k-2} = q_k r_{k-1} + r_k \quad (r_k = \text{gcd}(a,b))$$
$$r_{k-1} = q_{k+1} r_k + 0$$
Here, $r_k$ is the GCD.

**What could go wrong:** Miscalculating any division or remainder will throw off the entire subsequent process. Double-check your arithmetic!

### Step 2: Rewrite Each Remainder Equation

**Plain English:** Now, take every line from the Euclidean algorithm (except the last one that gave a remainder of zero) and rearrange it to isolate the *remainder*. We want to express each remainder in the form $r = \text{dividend} - (\text{quotient} \times \text{divisor})$.

**Example:**
From our example:
1.  $99 = 1 \cdot 78 + 21 \implies 21 = 99 - 1 \cdot 78$
2.  $78 = 3 \cdot 21 + 15 \implies 15 = 78 - 3 \cdot 21$
3.  $21 = 1 \cdot 15 + 6 \implies 6 = 21 - 1 \cdot 15$
4.  $15 = 2 \cdot 6 + 3 \implies 3 = 15 - 2 \cdot 6$

**Formal/Mathematical Version:**
From the equations in Step 1:
$$r_1 = a - q_1 b$$
$$r_2 = b - q_2 r_1$$
$$r_3 = r_1 - q_3 r_2$$
$$\vdots$$
$$r_k = r_{k-2} - q_k r_{k-1}$$
Here, $r_k$ is the GCD.

**What could go wrong:** Simple algebraic errors, especially sign errors when moving terms across the equals sign. Make sure it's always `remainder = dividend - (quotient * divisor)`.

### Step 3: Back-Substitute Starting from the GCD Equation

**Plain English:** This is the heart of the "extended" algorithm. Start with the equation that defines the GCD (the last non-zero remainder equation). Then, work your way *upwards* through the rewritten remainder equations. In each step, you'll substitute an expression for a remainder into the equation above it. The goal is to progressively replace remainders until you only have the original numbers ($a$ and $b$) and their coefficients.

**Example:** We want to express $\text{gcd}(99, 78) = 3$ in the form $99x + 78y = 3$.
Our equations from Step 2:
(1) $21 = 99 - 1 \cdot 78$
(2) $15 = 78 - 3 \cdot 21$
(3) $6 = 21 - 1 \cdot 15$
(4) $3 = 15 - 2 \cdot 6$

Start with the equation for the GCD (equation 4):
$3 = 15 - 2 \cdot 6$

Now, look at the equation *above* it (equation 3). It expresses `6` in terms of `21` and `15`. Substitute this expression for `6` into our GCD equation:
$3 = 15 - 2 \cdot (\mathbf{21 - 1 \cdot 15})$

**Formal/Mathematical Version:**
Start with $r_k = r_{k-2} - q_k r_{k-1}$.
Substitute $r_{k-1} = r_{k-3} - q_{k-1} r_{k-2}$ into the equation for $r_k$.
Then substitute $r_{k-2} = r_{k-4} - q_{k-2} r_{k-3}$, and so on, until only $a$ and $b$ remain.

**What could go wrong:** This is where most students make mistakes.
*   **Incorrect substitution:** Substituting the wrong value or expression.
*   **Arithmetic errors:** Especially when distributing negative signs or combining terms.
*   **Losing track of terms:** Not keeping $a$ and $b$ separate from the coefficients.

### Step 4: Simplify and Collect Coefficients

**Plain English:** After each substitution, expand the expression and group terms by the numbers that are *not* remainders (i.e., the original $a$ and $b$, or the remainders that are still "active" in the expression). Don't perform the multiplication if it involves $a$ or $b$; just keep them as $a \cdot (\text{coefficient})$ or $b \cdot (\text{coefficient})$.

**Example (continuing from Step 3):**
$3 = 15 - 2 \cdot (21 - 1 \cdot 15)$
Distribute the $-2$:
$3 = 15 - 2 \cdot 21 + 2 \cdot 1 \cdot 15$
$3 = 15 - 2 \cdot 21 + 2 \cdot 15$
Combine the '15' terms: (Remember, $15 = 1 \cdot 15$)
$3 = (1+2) \cdot 15 - 2 \cdot 21$
$3 = 3 \cdot 15 - 2 \cdot 21$

Now, we need to get rid of `15`. Look at equation (2): $15 = 78 - 3 \cdot 21$. Substitute this:
$3 = 3 \cdot (\mathbf{78 - 3 \cdot 21}) - 2 \cdot 21$
Distribute the $3$:
$3 = 3 \cdot 78 - 3 \cdot 3 \cdot 21 - 2 \cdot 21$
$3 = 3 \cdot 78 - 9 \cdot 21 - 2 \cdot 21$
Combine the '21' terms:
$3 = 3 \cdot 78 + (-9-2) \cdot 21$
$3 = 3 \cdot 78 - 11 \cdot 21$

Finally, we need to get rid of `21`. Look at equation (1): $21 = 99 - 1 \cdot 78$. Substitute this:
$3 = 3 \cdot 78 - 11 \cdot (\mathbf{99 - 1 \cdot 78})$
Distribute the $-11$:
$3 = 3 \cdot 78 - 11 \cdot 99 + 11 \cdot 1 \cdot 78$
$3 = 3 \cdot 78 - 11 \cdot 99 + 11 \cdot 78$
Combine the '78' terms:
$3 = (3+11) \cdot 78 - 11 \cdot 99$
$3 = 14 \cdot 78 - 11 \cdot 99$

So, we have $3 = -11 \cdot 99 + 14 \cdot 78$.
Thus, $x = -11$ and $y = 14$.

**Formal/Mathematical Version:**
At each step, substitute the expression for the largest remaining remainder, expand, and collect coefficients for the terms that are *not* being substituted. Continue until the expression is solely in terms of $a$ and $b$.
$$r_k = C_1 r_{j} + C_2 r_{j-1}$$
Substitute $r_j = C_3 r_{m} + C_4 r_{m-1}$
$$r_k = C_1 (C_3 r_m + C_4 r_{m-1}) + C_2 r_{j-1}$$
$$r_k = C_1 C_3 r_m + C_1 C_4 r_{m-1} + C_2 r_{j-1}$$
...and so on.

**What could go wrong:** This is the most error-prone part.
*   **Incorrect distribution:** Forgetting to multiply all terms inside parentheses.
*   **Sign errors:** Especially when distributing negative numbers.
*   **Not combining like terms correctly:** Adding or subtracting coefficients incorrectly.
*   **Substituting too early or too late:** Only substitute for the *largest* remainder in the current expression, moving upwards in the list of rewritten equations.

### Step 5: Verify Bezout's Identity

**Plain English:** Once you have your $x$ and $y$ values, plug them back into the original equation $ax + by = \text{gcd}(a,b)$ to make sure it holds true.

**Example:**
We found $x = -11$ and $y = 14$ for $a=99, b=78, \text{gcd}(99, 78) = 3$.
Check: $99 \cdot (-11) + 78 \cdot 14$
$= -1089 + 1092$
$= 3$
It works!

**Formal/Mathematical Version:**
Confirm that $ax + by = \text{gcd}(a,b)$ by direct calculation.

**What could go wrong:** Skipping this step. It's a critical check to catch errors from Step 4.

### Step 6: Understanding General Solutions (Optional but Important)

**Plain English:** The Extended Euclidean Algorithm gives *one specific pair* of integers $(x,y)$. However, there are infinitely many integer pairs $(x',y')$ that satisfy $ax' + by' = \text{gcd}(a,b)$.

**Example:** For $99x + 78y = 3$, we found $(x,y) = (-11, 14)$.
We know that $\text{gcd}(99, 78) = 3$. Let $a' = a/\text{gcd}(a,b) = 99/3 = 33$ and $b' = b/\text{gcd}(a,b) = 78/3 = 26$.
The general solutions are given by:
$x' = x + k \cdot (b/\text{gcd}(a,b)) = x + k \cdot b'$
$y' = y - k \cdot (a/\text{gcd}(a,b)) = y - k \cdot a'$
where $k$ is any integer.

Using our values:
$x' = -11 + k \cdot (78/3) = -11 + 26k$
$y' = 14 - k \cdot (99/3) = 14 - 33k$

Let's test for $k=1$:
$x' = -11 + 26(1) = 15$
$y' = 14 - 33(1) = -19$
Check: $99(15) + 78(-19) = 1485 - 1482 = 3$. This also works!

**Formal/Mathematical Version:**
If $(x_0, y_0)$ is a particular solution to $ax + by = \text{gcd}(a,b)$, then all integer solutions are given by:
$$x = x_0 + k \frac{b}{\text{gcd}(a,b)}$$
$$y = y_0 - k \frac{a}{\text{gcd}(a,b)}$$
for any integer $k \in \mathbb{Z}$.

**What could go wrong:** Forgetting to divide by the GCD when calculating $a'$ and $b'$. The formula only works if $a'$ and $b'$ are coprime.

## 5. Worked examples — multiple, with every step shown

### Example 1: Find $x, y$ such that $24x + 15y = \text{gcd}(24, 15)$

**Problem:** Find integers $x$ and $y$ satisfying Bezout's Identity for $a=24$ and $b=15$.

**Given:** $a=24$, $b=15$.
**Want:** $x, y$ such that $24x + 15y = \text{gcd}(24, 15)$.

**Step 1: Apply the Euclidean Algorithm to find $\text{gcd}(24, 15)$.**
$$24 = 1 \cdot 15 + 9 \quad \text{ (Divide 24 by 15, remainder is 9)}$$
$$15 = 1 \cdot 9 + 6 \quad \text{ (Divide 15 by 9, remainder is 6)}$$
$$9 = 1 \cdot 6 + 3 \quad \text{ (Divide 9 by 6, remainder is 3)}$$
$$6 = 2 \cdot 3 + 0 \quad \text{ (Divide 6 by 3, remainder is 0)}$$
The last non-zero remainder is 3. So, $\text{gcd}(24, 15) = 3$.

**Step 2: Rewrite each equation to isolate the remainder.**
(1) $9 = 24 - 1 \cdot 15 \quad \text{ (Isolate 9 from the first equation)}$
(2) $6 = 15 - 1 \cdot 9 \quad \text{ (Isolate 6 from the second equation)}$
(3) $3 = 9 - 1 \cdot 6 \quad \text{ (Isolate 3 from the third equation)}$

**Step 3 & 4: Back-substitute to express the GCD (3) in terms of 24 and 15.**
Start with the equation that defines the GCD (equation 3):
$$3 = 9 - 1 \cdot 6 \quad \text{ (This is our starting point)}$$

Now, substitute the expression for '6' from equation (2) into this equation:
$$3 = 9 - 1 \cdot (\mathbf{15 - 1 \cdot 9}) \quad \text{ (Replace 6 with its equivalent expression)}$$

Distribute the $-1$:
$$3 = 9 - 1 \cdot 15 + 1 \cdot 1 \cdot 9 \quad \text{ (Carefully distribute the negative sign)}$$
$$3 = 9 - 15 + 9 \quad \text{ (Simplify the multiplication)}$$

Combine the '9' terms:
$$3 = (1+1) \cdot 9 - 1 \cdot 15 \quad \text{ (Group terms involving 9 together)}$$
$$3 = 2 \cdot 9 - 1 \cdot 15 \quad \text{ (Simplify the coefficients)}$$

Now, substitute the expression for '9' from equation (1) into this new equation:
$$3 = 2 \cdot (\mathbf{24 - 1 \cdot 15}) - 1 \cdot 15 \quad \text{ (Replace 9 with its equivalent expression)}$$

Distribute the $2$:
$$3 = 2 \cdot 24 - 2 \cdot 1 \cdot 15 - 1 \cdot 15 \quad \text{ (Distribute 2 to both terms inside the parenthesis)}$$
$$3 = 2 \cdot 24 - 2 \cdot 15 - 1 \cdot 15 \quad \text{ (Simplify the multiplication)}$$

Combine the '15' terms:
$$3 = 2 \cdot 24 + (-2-1) \cdot 15 \quad \text{ (Group terms involving 15 together)}$$
$$3 = 2 \cdot 24 - 3 \cdot 15 \quad \text{ (Simplify the coefficients)}$$

We have successfully expressed 3 as a linear combination of 24 and 15.
So, $x=2$ and $y=-3$.

**Step 5: Verify the result.**
$24(2) + 15(-3) = 48 - 45 = 3$. This matches $\text{gcd}(24, 15)$.

**Answer:**
$\boxed{x=2, y=-3}$

**Reflection:** This was a straightforward example with small numbers. The key challenge was carefully tracking the coefficients and signs during the back-substitution. It's easy to make a mistake when distributing a negative number or when combining terms.

---

### Example 2: Find $x, y$ such that $101x + 100y = \text{gcd}(101, 100)$

**Problem:** Find integers $x$ and $y$ satisfying Bezout's Identity for $a=101$ and $b=100$.

**Given:** $a=101$, $b=100$.
**Want:** $x, y$ such that $101x + 100y = \text{gcd}(101, 100)$.

**Step 1: Apply the Euclidean Algorithm.**
$$101 = 1 \cdot 100 + 1 \quad \text{ (Divide 101 by 100, remainder is 1)}$$
$$100 = 100 \cdot 1 + 0 \quad \text{ (Divide 100 by 1, remainder is 0)}$$
The last non-zero remainder is 1. So, $\text{gcd}(101, 100) = 1$.

**Step 2: Rewrite each equation to isolate the remainder.**
(1) $1 = 101 - 1 \cdot 100 \quad \text{ (Isolate 1 from the first equation)}$

**Step 3 & 4: Back-substitute.**
The GCD is 1, and the first rewritten equation already expresses 1 in terms of 101 and 100.
$$1 = 1 \cdot 101 - 1 \cdot 100$$
So, $x=1$ and $y=-1$.

**Step 5: Verify the result.**
$101(1) + 100(-1) = 101 - 100 = 1$. This matches $\text{gcd}(101, 100)$.

**Answer:**
$\boxed{x=1, y=-1}$

**Reflection:** This example highlights that the process can be very short if the GCD is found quickly. It reinforces the idea that the "extended" part directly follows from the standard algorithm's steps.

---

### Example 3: Find $x, y$ such that $2651x + 1914y = \text{gcd}(2651, 1914)$

**Problem:** Find integers $x$ and $y$ satisfying Bezout's Identity for $a=2651$ and $b=1914$.

**Given:** $a=2651$, $b=1914$.
**Want:** $x, y$ such that $2651x + 1914y = \text{gcd}(2651, 1914)$.

**Step 1: Apply the Euclidean Algorithm.**
$$2651 = 1 \cdot 1914 + 737 \quad \text{ (Eq 1)}$$
$$1914 = 2 \cdot 737 + 440 \quad \text{ (Eq 2)}$$
$$737 = 1 \cdot 440 + 297 \quad \text{ (Eq 3)}$$
$$440 = 1 \cdot 297 + 143 \quad \text{ (Eq 4)}$$
$$297 = 2 \cdot 143 + 11 \quad \text{ (Eq 5)}$$
$$143 = 13 \cdot 11 + 0 \quad \text{ (Eq 6)}$$
The last non-zero remainder is 11. So, $\text{gcd}(2651, 1914) = 11$.

**Step 2: Rewrite each equation to isolate the remainder.**
(1) $737 = 2651 - 1 \cdot 1914$
(2) $440 = 1914 - 2 \cdot 737$
(3) $297 = 737 - 1 \cdot 440$
(4) $143 = 440 - 1 \cdot 297$
(5) $11 = 297 - 2 \cdot 143$

**Step 3 & 4: Back-substitute.**
Start with the equation for the GCD (equation 5):
$$11 = 297 - 2 \cdot 143$$

Substitute '143' from equation (4):
$$11 = 297 - 2 \cdot (\mathbf{440 - 1 \cdot 297})$$
$$11 = 297 - 2 \cdot 440 + 2 \cdot 297$$
$$11 = (1+2) \cdot 297 - 2 \cdot 440$$
$$11 = 3 \cdot 297 - 2 \cdot 440$$

Substitute '297' from equation (3):
$$11 = 3 \cdot (\mathbf{737 - 1 \cdot 440}) - 2 \cdot 440$$
$$11 = 3 \cdot 737 - 3 \cdot 440 - 2 \cdot 440$$
$$11 = 3 \cdot 737 + (-3-2) \cdot 440$$
$$11 = 3 \cdot 737 - 5 \cdot 440$$

Substitute '440' from equation (2):
$$11 = 3 \cdot 737 - 5 \cdot (\mathbf{1914 - 2 \cdot 737})$$
$$11 = 3 \cdot 737 - 5 \cdot 1914 + 10 \cdot 737$$
$$11 = (3+10) \cdot 737 - 5 \cdot 1914$$
$$11 = 13 \cdot 737 - 5 \cdot 1914$$

Substitute '737' from equation (1):
$$11 = 13 \cdot (\mathbf{2651 - 1 \cdot 1914}) - 5 \cdot 1914$$
$$11 = 13 \cdot 2651 - 13 \cdot 1914 - 5 \cdot 1914$$
$$11 = 13 \cdot 2651 + (-13-5) \cdot 1914$$
$$11 = 13 \cdot 2651 - 18 \cdot 1914$$

So, $x=13$ and $y=-18$.

**Step 5: Verify the result.**
$2651(13) + 1914(-18) = 34463 - 34452 = 11$. This matches $\text{gcd}(2651, 1914)$.

**Answer:**
$\boxed{x=13, y=-18}$

**Reflection:** This example demonstrates the process with larger numbers and more steps. The critical aspect is meticulous organization and careful arithmetic at each substitution and simplification step. It's very easy to make a small error that cascades through the rest of the calculation.

---

### Example 4: Find the modular inverse of $7 \pmod{26}$

**Problem:** Find an integer $x$ such that $7x \equiv 1 \pmod{26}$. This is equivalent to finding $x$ and $y$ such that $7x + 26y = 1$. (Note: A modular inverse exists if and only if $\text{gcd}(a,m)=1$. Here, $\text{gcd}(7,26)=1$, so an inverse exists.)

**Given:** $a=7$, $m=26$.
**Want:** $x$ such that $7x \equiv 1 \pmod{26}$. This means we are looking for $x$ in the equation $7x + 26y = 1$.

**Step 1: Apply the Euclidean Algorithm to find $\text{gcd}(26, 7)$.**
$$26 = 3 \cdot 7 + 5 \quad \text{ (Eq 1)}$$
$$7 = 1 \cdot 5 + 2 \quad \text{ (Eq 2)}$$
$$5 = 2 \cdot 2 + 1 \quad \text{ (Eq 3)}$$
$$2 = 2 \cdot 1 + 0 \quad \text{ (Eq 4)}$$
The last non-zero remainder is 1. So, $\text{gcd}(26, 7) = 1$. This confirms that an inverse exists.

**Step 2: Rewrite each equation to isolate the remainder.**
(1) $5 = 26 - 3 \cdot 7$
(2) $2 = 7 - 1 \cdot 5$
(3) $1 = 5 - 2 \cdot 2$

**Step 3 & 4: Back-substitute.**
Start with the equation for the GCD (equation 3):
$$1 = 5 - 2 \cdot 2$$

Substitute '2' from equation (2):
$$1 = 5 - 2 \cdot (\mathbf{7 - 1 \cdot 5})$$
$$1 = 5 - 2 \cdot 7 + 2 \cdot 5$$
$$1 = (1+2) \cdot 5 - 2 \cdot 7$$
$$1 = 3 \cdot 5 - 2 \cdot 7$$

Substitute '5' from equation (1):
$$1 = 3 \cdot (\mathbf{26 - 3 \cdot 7}) - 2 \cdot 7$$
$$1 = 3 \cdot 26 - 9 \cdot 7 - 2 \cdot 7$$
$$1 = 3 \cdot 26 + (-9-2) \cdot 7$$
$$1 = 3 \cdot 26 - 11 \cdot 7$$

We have the equation $1 = -11 \cdot 7 + 3 \cdot 26$.
This is in the form $7x + 26y = 1$, where $x = -11$ and $y = 3$.

**Step 5: Verify the result.**
$7(-11) + 26(3) = -77 + 78 = 1$. This is correct.

The value of $x$ we found is $-11$. However, modular inverses are usually expressed as a positive integer within the range $[0, m-1]$.
To find this, we add multiples of $m$ (which is 26) to $x$ until it's positive:
$x = -11 + 26 = 15$.
So, $15$ is the modular inverse of $7 \pmod{26}$.
Let's check: $7 \cdot 15 = 105$.
$105 \div 26 = 4$ with a remainder of $1$.
So, $7 \cdot 15 \equiv 1 \pmod{26}$.

**Answer:**
The modular inverse of $7 \pmod{26}$ is $\boxed{15}$.

**Reflection:** This example demonstrates a crucial application of the Extended Euclidean Algorithm: finding modular inverses. The process is identical to finding $x$ and $y$ for Bezout's Identity, but with the added step of adjusting the resulting $x$ to be in the correct modular range (typically positive and less than the modulus).

## 6. Common mistakes and traps

1.  **Sign Errors During Back-Substitution:** This is by far the most frequent mistake. When substituting an expression like $(A - B \cdot C)$ and distributing a negative coefficient, it's easy to forget to flip the sign of the second term. For example, $-2(X - Y)$ becomes $-2X + 2Y$, not $-2X - 2Y$.
2.  **Incorrectly Grouping Terms:** After substitution, students sometimes incorrectly combine coefficients. Remember to group terms that multiply the *same* number (either $a$, $b$, or an intermediate remainder that hasn't been substituted yet). Treat $a$ and $b$ as distinct variables that you never multiply together.
3.  **Substituting for the Wrong Remainder:** Always substitute for the largest remainder in the current expression, working your way *up* the list of rewritten Euclidean algorithm equations. Substituting out of order or for a number that isn't a remainder can lead to incorrect results or circular logic.
4.  **Arithmetic Errors in the Euclidean Algorithm:** A simple mistake in division or remainder calculation in the initial forward pass of the Euclidean algorithm will render all subsequent back-substitution steps incorrect. Double-check this first stage meticulously.
5.  **Forgetting to Rewrite Equations:** Not explicitly writing out each remainder in the form $r = a - qb$ before starting back-substitution makes the process much harder to track and prone to errors.
6.  **Not Verifying the Result:** Skipping the final check $ax + by = \text{gcd}(a,b)$ means any error made during the process will go undetected. This step is quick and can save a lot of grief.

## 7. Textbook-precise explanation

The Extended Euclidean Algorithm is a computational procedure that, given two integers $a$ and $b$, computes their greatest common divisor $\text{gcd}(a,b)$ and also finds integers $x$ and $y$ satisfying Bezout's Identity:
$$ax + by = \text{gcd}(a,b)$$

**Formal Definition and Algorithm:**

Let $a, b$ be integers with $a \ge b > 0$. The standard Euclidean algorithm generates a sequence of remainders $r_0, r_1, \dots, r_k$ where $r_0=a$, $r_1=b$, and for $i \ge 1$:
$$r_{i-1} = q_i r_i + r_{i+1} \quad \text{with } 0 \le r_{i+1} < r_i$$
This sequence continues until $r_{k+1} = 0$. The last non-zero remainder, $r_k$, is $\text{gcd}(a,b)$.

The Extended Euclidean Algorithm then proceeds by working backwards through these equations. From each equation $r_{i-1} = q_i r_i + r_{i+1}$, we can express the remainder $r_{i+1}$ as a linear combination:
$$r_{i+1} = r_{i-1} - q_i r_i$$
Starting with the equation for $r_k = \text{gcd}(a,b)$:
$$r_k = r_{k-2} - q_k r_{k-1}$$
We recursively substitute expressions for $r_{k-1}, r_{k-2}, \dots, r_2$ until the equation is expressed solely in terms of $r_0=a$ and $r_1=b$.

Let's define sequences $(x_i)$ and $(y_i)$ such that $r_i = ax_i + by_i$.
For the initial steps:
$r_0 = a = a \cdot 1 + b \cdot 0 \implies (x_0, y_0) = (1, 0)$
$r_1 = b = a \cdot 0 + b \cdot 1 \implies (x_1, y_1) = (0, 1)$

For subsequent steps, using the division $r_{i-1} = q_i r_i + r_{i+1}$, we have $r_{i+1} = r_{i-1} - q_i r_i$.
Substituting the linear combinations:
$ax_{i+1} + by_{i+1} = (ax_{i-1} + by_{i-1}) - q_i (ax_i + by_i)$
$ax_{i+1} + by_{i+1} = a(x_{i-1} - q_i x_i) + b(y_{i-1} - q_i y_i)$
Thus, we can define the recursive relations for the coefficients:
$$x_{i+1} = x_{i-1} - q_i x_i$$
$$y_{i+1} = y_{i-1} - q_i y_i$$
The algorithm terminates when $r_{k+1}=0$. The coefficients $x_k$ and $y_k$ corresponding to $r_k = \text{gcd}(a,b)$ are the desired integers. That is, $ax_k + by_k = \text{gcd}(a,b)$.

**Example Trace (from $a=99, b=78$):**

| $i$ | $r_i$ | $q_i$ | $x_i$ | $y_i$ | Calculation for $x_i, y_i$ |
| --- | ----- | ----- | ----- | ----- | -------------------------- |
| 0   | 99    |       | 1     | 0     | Base case: $99 = 1 \cdot 99 + 0 \cdot 78$ |
| 1   | 78    | 1     | 0     | 1     | Base case: $78 = 0 \cdot 99 + 1 \cdot 78$ |
| 2   | 21    | 3     | $1 - 1 \cdot 0 = 1$ | $0 - 1 \cdot 1 = -1$ | $21 = 99 - 1 \cdot 78 = 1 \cdot 99 + (-1) \cdot 78$ |
| 3   | 15    | 1     | $0 - 3 \cdot 1 = -3$ | $1 - 3 \cdot (-1) = 4$ | $15 = 78 - 3 \cdot 21 = 0 \cdot 99 + 1 \cdot 78 - 3(1 \cdot 99 - 1 \cdot 78) = -3 \cdot 99 + 4 \cdot 78$ |
| 4   | 6     | 2     | $1 - 1 \cdot (-3) = 4$ | $-1 - 1 \cdot 4 = -5$ | $6 = 21 - 1 \cdot 15 = (1 \cdot 99 - 1 \cdot 78) - 1(-3 \cdot 99 + 4 \cdot 78) = 4 \cdot 99 - 5 \cdot 78$ |
| 5   | 3     |       | $-3 - 2 \cdot 4 = -11$ | $4 - 2 \cdot (-5) = 14$ | $3 = 15 - 2 \cdot 6 = (-3 \cdot 99 + 4 \cdot 78) - 2(4 \cdot 99 - 5 \cdot 78) = -11 \cdot 99 + 14 \cdot 78$ |

The GCD is $r_5 = 3$, and the corresponding coefficients are $x_5 = -11$ and $y_5 = 14$. This table method is an alternative to the direct back-substitution method described earlier and is often preferred in algorithms textbooks.

**Citations:**
*   Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed., pp. 984-988). MIT Press.
*   Rosen, K. H. (2019). *Discrete Mathematics and Its Applications* (8th ed., pp. 256-259). McGraw-Hill Education.

## 8. ASCII diagrams

The Extended Euclidean Algorithm is best visualized as a two-phase process: a forward pass (the standard Euclidean algorithm) and a backward pass (the substitution phase).

```text
Phase 1: Forward Pass (Euclidean Algorithm - finding GCD)

       a = q1 * b + r1    <-- (Isolate r1 later)
       b = q2 * r1 + r2   <-- (Isolate r2 later)
       r1 = q3 * r2 + r3  <-- (Isolate r3 later)
       ...
       r(k-2) = qk * r(k-1) + rk  <-- (This rk is the GCD)
       r(k-1) = q(k+1) * rk + 0

       (GCD is rk)
       
------------------------------------------------------------------

Phase 2: Backward Pass (Extended Euclidean Algorithm - finding x, y)

       Start here:
       rk = r(k-2) - qk * r(k-1)   (Express GCD in terms of previous remainders)
       
       Substitute r(k-1) using: r(k-1) = r(k-3) - q(k-1) * r(k-2)
       rk = r(k-2) - qk * [ r(k-3) - q(k-1) * r(k-2) ]
          = C1 * r(k-2) + C2 * r(k-3)
          
       Substitute r(k-2) using: r(k-2) = r(k-4) - q(k-2) * r(k-3)
       rk = C1 * [ r(k-4) - q(k-2) * r(k-3) ] + C2 * r(k-3)
          = D1 * r(k-3) + D2 * r(k-4)
          
       ... (Continue substituting upwards) ...
       
       Eventually, substitute r2 using: r2 = b - q2 * r1
       ...
       
       Finally, substitute r1 using: r1 = a - q1 * b
       ...
       rk = X * a + Y * b  <-- (This is the final form, Bezout's Identity)
```

**Description of the Diagram:**
The diagram illustrates the flow of the Extended Euclidean Algorithm. The top block represents the standard Euclidean Algorithm, where divisions are performed sequentially from top to bottom until a remainder of 0 is reached. The GCD is the last non-zero remainder, `rk`. The arrows indicate the progression.

The horizontal line separates the two phases. The bottom block depicts the "extended" part. It starts from the equation involving the GCD (`rk`) and the two remainders above it (`r(k-2)` and `r(k-1)`). The arrows point upwards, signifying the back-substitution process. Each step involves replacing a remainder with its expression from the previous (Euclidean algorithm) steps, gradually eliminating intermediate remainders until only the original numbers `a` and `b` remain, along with their coefficients `X` and `Y`.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Imagine a ladder. The **Euclidean Algorithm** is climbing *down* the ladder, step by step, finding smaller and smaller remainders until you hit the ground (GCD). The **Extended Euclidean Algorithm** is then *climbing back up* that same ladder, but now you're carrying a bucket. At each step up, you're "mixing" the contents of the previous buckets (substituting remainders) until you reach the top, where your bucket now contains the GCD perfectly measured out using only the original two ingredients.
    **Mnemonic:** "Euclid Down, Bezout Up!" (Euclid's algorithm goes down to find the GCD, then Bezout's Identity is built back up by substitution).

2.  **Formulas/Facts to Overlearn:**
    *   **Bezout's Identity:** For any integers $a, b$, there exist integers $x, y$ such that $ax + by = \text{gcd}(a,b)$. This is the *goal* of the Extended Euclidean Algorithm.
    *   **Remainder Isolation:** Every step of the Euclidean algorithm, $A = Q \cdot B + R$, can be rewritten as $R = A - Q \cdot B$. This is the *key step* for preparing for back-substitution.
    *   **Modular Inverse Connection:** If $\text{gcd}(a,m)=1$, then $ax + my = 1$. The $x$ found (modulo $m$) is the modular inverse of $a \pmod m$.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review the entire lesson. Work through Example 1 again without looking at the solution.
    *   **Day 3:** Work through Example 3 again. Try to explain the "why" behind each step aloud.
    *   **Day 7:** Solve a new problem: Find $x, y$ for $\text{gcd}(87, 23)$.
    *   **Day 16:** Solve a modular inverse problem: Find the inverse of $17 \pmod{31}$.
    *   **Day 35:** Explain the algorithm to an imaginary friend, focusing on the connection between the forward and backward passes. Solve a challenging problem like $\text{gcd}(12345, 6789)$.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the exact steps, you can always rebuild the process:
    1.  **Start with the Euclidean Algorithm:** Remember how to find the GCD of two numbers, say $a$ and $b$, by repeated division. Write down all the steps.
    2.  **Isolate Remainders:** From each division step, rearrange the equation to express the remainder in terms of the dividend, divisor, and quotient. (e.g., $r = \text{dividend} - \text{quotient} \times \text{divisor}$).
    3.  **Identify the GCD Equation:** Locate the equation where the remainder is the GCD. This is your starting point for the "extended" part.
    4.  **Back-Substitute Systematically:** Take the GCD equation. Replace the largest remainder in that equation with its expression from the step above it. Simplify by collecting coefficients. Repeat this process, moving upwards through your list of isolated remainder equations, until only $a$ and $b$ (and their coefficients) remain.
    5.  **Verify:** Plug your found $x$ and $y$ back into $ax + by = \text{gcd}(a,b)$.

This pathway ensures that even if you forget the specific "formula" for the recursive coefficients in the table method, you can always derive $x$ and $y$ through the intuitive back-substitution.

## 10. Connections — what this leads to

The Extended Euclidean Algorithm is a cornerstone in number theory and computational mathematics, unlocking several advanced concepts and practical applications:

*   **Modular Multiplicative Inverses:** As demonstrated in the examples, the EEA is the standard algorithm for finding modular inverses. This is fundamental for division in modular arithmetic, which is crucial for many cryptographic systems and error-correcting codes.
*   **Solving Linear Congruences:** An equation of the form $ax \equiv b \pmod m$ can be solved using modular inverses, which are found via the EEA. If $\text{gcd}(a,m)=1$, there's a unique solution. If $\text{gcd}(a,m)=d > 1$, solutions exist if and only if $d$ divides $b$.
*   **Chinese Remainder Theorem (CRT):** The CRT provides a way to solve systems of linear congruences. The construction of solutions often involves finding modular inverses, which the EEA provides. This theorem has applications in cryptography, computer science (e.g., fast modular exponentiation), and even ancient calendar calculations.
*   **RSA Cryptosystem:** As mentioned, the EEA is directly used to calculate the private decryption key $d$ from the public encryption key $e$ and the totient $\phi(n)$. This is the backbone of secure internet communication.
*   **Linear Diophantine Equations:** The EEA is the primary tool for finding a particular integer solution to $ax + by = c$. Once a particular solution $(x_0, y_0)$ for $ax + by = \text{gcd}(a,b)$ is found, the general solution for $ax+by=c$ (if $c$ is a multiple of $\text{gcd}(a,b)$) can be derived.
*   **Continued Fractions:** There's a deep connection between the quotients obtained in the Euclidean Algorithm and the representation of rational numbers as continued fractions. The Extended Euclidean Algorithm can be adapted to find the convergents of a continued fraction, which are the best rational approximations of a real number.
*   **Abstract Algebra (Rings and Fields):** The concept of finding inverses (multiplicative inverses in fields, or elements that generate the ideal $\text{gcd}(a,b)$ in rings) is formalized and generalized in abstract algebra. The EEA is a concrete algorithm that demonstrates these abstract principles in the ring of integers $\mathbb{Z}$.

## 11. Self-check questions

1.  Find integers $x$ and $y$ such that $105x + 36y = \text{gcd}(105, 36)$.
2.  Using the Extended Euclidean Algorithm, find the modular multiplicative inverse of $13 \pmod{47}$.
3.  Determine if the linear Diophantine equation $30x + 42y = 100$ has integer solutions. If not, explain why. If it does, find one particular integer solution.
4.  Find integers $x$ and $y$ such that $323x + 19y = \text{gcd}(323, 19)$. What do you notice about this specific case, and how does it simplify the algorithm?
5.  Consider the equation $ax + by = \text{gcd}(a,b)$. If $(x_0, y_0)$ is a solution, prove that $(x_0 + k \frac{b}{\text{gcd}(a,b)}, y_0 - k \frac{a}{\text{gcd}(a,b)})$ is also a solution for any integer $k$.