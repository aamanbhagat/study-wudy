## 1. What it is — in plain English

Imagine you have two pieces of string, one 18 inches long and the other 12 inches long. You want to cut both strings into smaller, equal-sized pieces, and you want these pieces to be as long as possible. What's the longest possible length for these equal pieces? The Euclidean algorithm is a clever, ancient method to figure that out.

In simple terms, the Euclidean algorithm is a step-by-step procedure to find the greatest common divisor (GCD) of two numbers. The GCD is the largest number that divides both of your original numbers without leaving any remainder. Think of it as finding the biggest "measuring stick" that perfectly fits into the lengths of both your strings.

Instead of listing all the divisors for each number and comparing them (which can be very slow for large numbers), the Euclidean algorithm uses a trick: it repeatedly replaces the larger number with the remainder of the division of the two numbers. This process quickly shrinks the numbers involved until one of them becomes zero. The non-zero number at that point is your GCD. It's surprisingly efficient and elegant!

## 2. Why it matters — real-world applications

The Euclidean algorithm, despite its ancient origins, is fundamental to many modern technologies and scientific fields. Its efficiency and mathematical elegance make it indispensable.

1.  **Cryptography (RSA Algorithm):** This is perhaps one of the most critical applications. The security of modern internet communication, including online banking and secure websites (HTTPS), relies heavily on the RSA encryption algorithm. A core part of RSA involves finding modular inverses, which can only be done if the number and the modulus are coprime (their GCD is 1). The Extended Euclidean Algorithm (a slightly more advanced version) is used to efficiently calculate these modular inverses, which are essential for both encrypting and decrypting messages. Without it, secure online transactions as we know them would be impossible.

2.  **Computer Science (Rational Number Arithmetic & Optimization):** When computers perform calculations with fractions (rational numbers), they often need to simplify them to their lowest terms (e.g., $\frac{6}{9}$ simplifies to $\frac{2}{3}$). To do this, you divide both the numerator and the denominator by their greatest common divisor. The Euclidean algorithm provides the fastest way to find this GCD, ensuring that calculations are efficient and don't overflow with unnecessarily large numbers. It's also used in algorithms for tasks like generating musical scales or optimizing resource allocation by finding common periods.

3.  **Aerospace Engineering & Physics (Orbital Mechanics and Synchronization):** In fields dealing with periodic phenomena, like orbital mechanics, understanding the GCD can be crucial for synchronization. For instance, if two satellites have orbital periods of 120 minutes and 180 minutes, knowing their GCD (60 minutes) helps predict when they will next align or be in a specific relative configuration. In physics, analyzing wave patterns or resonant frequencies often involves finding common divisors to understand when different cycles align or interfere constructively. This principle extends to signal processing and data compression where common periodicities or structures can be identified and exploited for efficiency.

4.  **Music Theory:** The harmonious relationships between musical notes are based on simple integer ratios of frequencies. For example, an octave is a 2:1 ratio, and a perfect fifth is a 3:2 ratio. When designing scales or understanding complex polyrhythms, the Euclidean algorithm can be used to find the simplest common "beat" or the fundamental frequency that underpins a set of notes or rhythms, ensuring that the components are harmonically related and aesthetically pleasing.

## 3. Prerequisites — what you must know first

Before diving deep into the Euclidean algorithm, ensure you have a solid grasp of these foundational concepts:

*   **Integers:** The set of whole numbers, both positive and negative, including zero ($\dots, -2, -1, 0, 1, 2, \dots$).
*   **Division Algorithm (Division with Remainder):** For any two integers $a$ (dividend) and $b$ (divisor) with $b > 0$, there exist unique integers $q$ (quotient) and $r$ (remainder) such that $a = qb + r$, where $0 \le r < b$.
*   **Remainder (Modulo) Operation:** The result $r$ from the division algorithm. Often denoted as $a \pmod b = r$.
*   **Factors/Divisors:** An integer $d$ is a divisor of an integer $a$ if $a = kd$ for some integer $k$. This means $d$ divides $a$ evenly, with no remainder.
*   **Greatest Common Divisor (GCD):** For two non-zero integers $a$ and $b$, the GCD is the largest positive integer that divides both $a$ and $b$. It's often written as $\text{gcd}(a, b)$.
*   **Basic Algebra:** Ability to manipulate equations and understand variables.

## 4. The core idea — step by step

The Euclidean algorithm is built upon a single, powerful mathematical property. Let's break it down into intuitive steps.

### Step 1: Understanding the Greatest Common Divisor (GCD)

*   **Plain English Statement:** The GCD of two numbers is the biggest number that can divide both of them without leaving any leftover. It's like finding the largest common "chunk" that fits perfectly into both quantities.
*   **Small Concrete Example:** Let's find the GCD of 12 and 18.
    *   Divisors of 12: {1, 2, 3, 4, 6, 12}
    *   Divisors of 18: {1, 2, 3, 6, 9, 18}
    *   Common Divisors: {1, 2, 3, 6}
    *   The Greatest Common Divisor is 6. So, $\text{gcd}(12, 18) = 6$.
*   **Formal/Mathematical Version:** For two integers $a, b$ (not both zero), $\text{gcd}(a, b)$ is the unique positive integer $d$ such that:
    1.  $d | a$ and $d | b$ (meaning $d$ divides $a$ and $d$ divides $b$).
    2.  If $c$ is any integer such that $c | a$ and $c | b$, then $c | d$. (This means $d$ is the *greatest* of the common divisors).
*   **What Could Go Wrong:** You might confuse the GCD with any common divisor, or with the Least Common Multiple (LCM). Remember, it's the *greatest* common *divisor*.

### Step 2: The Division Algorithm's Role

*   **Plain English Statement:** The Euclidean algorithm uses the idea of division with remainder. Instead of just getting a quotient, we also care about what's left over. This remainder is key to shrinking our numbers.
*   **Small Concrete Example:** Let's divide 18 by 12.
    *   $18 \div 12 = 1$ with a remainder of $6$.
    *   We can write this as: $18 = 1 \cdot 12 + 6$.
*   **Formal/Mathematical Version:** Given integers $a$ and $b$ with $b > 0$, there exist unique integers $q$ and $r$ such that:
    $$a = qb + r, \quad \text{where } 0 \le r < b$$
    Here, $a$ is the dividend, $b$ is the divisor, $q$ is the quotient, and $r$ is the remainder.
*   **What Could Go Wrong:** Incorrectly calculating the remainder. For example, if you divide 20 by 7, the remainder is 6 ($20 = 2 \cdot 7 + 6$), not -1 or 13. The remainder must always be non-negative and strictly less than the divisor.

### Step 3: The Key Property (Euclid's Lemma for GCD)

*   **Plain English Statement:** This is the heart of the Euclidean algorithm. It states that the greatest common divisor of two numbers ($a$ and $b$) is exactly the same as the greatest common divisor of the smaller number ($b$) and the remainder ($r$) you get when you divide $a$ by $b$. This allows us to work with smaller numbers in each step!
*   **Small Concrete Example:** We know $\text{gcd}(18, 12) = 6$.
    *   From Step 2, we had $18 = 1 \cdot 12 + 6$. Here, $a=18$, $b=12$, and $r=6$.
    *   The key property says $\text{gcd}(18, 12) = \text{gcd}(12, 6)$.
    *   Let's check: Divisors of 12: {1, 2, 3, 4, 6, 12}. Divisors of 6: {1, 2, 3, 6}.
    *   Common Divisors of (12, 6): {1, 2, 3, 6}. The GCD is 6.
    *   Indeed, $\text{gcd}(18, 12) = 6$ and $\text{gcd}(12, 6) = 6$. The property holds!
*   **Formal/Mathematical Version:** If $a = qb + r$, where $a, b, q, r$ are integers and $b \ne 0$, then:
    $$\text{gcd}(a, b) = \text{gcd}(b, r)$$
    *Proof Sketch:*
    Let $d = \text{gcd}(a, b)$. By definition, $d|a$ and $d|b$.
    Since $a = qb + r$, we can rearrange to $r = a - qb$.
    Since $d|a$ and $d|b$, it follows that $d$ also divides any linear combination of $a$ and $b$. So, $d | (a - qb)$, which means $d | r$.
    Thus, $d$ is a common divisor of $b$ and $r$.
    Now, let $d' = \text{gcd}(b, r)$. By definition, $d'|b$ and $d'|r$.
    Since $a = qb + r$, it follows that $d'$ also divides $a$ (because $d'$ divides $qb$ and $r$).
    Thus, $d'$ is a common divisor of $a$ and $b$.
    Since $d$ is the *greatest* common divisor of $a$ and $b$, and $d'$ is a common divisor of $a$ and $b$, we must have $d' \le d$.
    Similarly, since $d'$ is the *greatest* common divisor of $b$ and $r$, and $d$ is a common divisor of $b$ and $r$, we must have $d \le d'$.
    Since $d' \le d$ and $d \le d'$, it must be that $d = d'$.
*   **What Could Go Wrong:** Not understanding *why* this property works. Without this understanding, the algorithm just feels like a magical trick rather than a logical process. The proof sketch above helps solidify this.

### Step 4: Iteration and Termination

*   **Plain English Statement:** We repeatedly apply the key property from Step 3. We take the smaller number ($b$) and the remainder ($r$) from the previous step, and treat them as our new pair of numbers ($a'$ and $b'$). We then divide $a'$ by $b'$ to get a new remainder $r'$. We keep doing this, generating smaller and smaller positive remainders, until one of the remainders is zero.
*   **Small Concrete Example:** Let's continue with $\text{gcd}(18, 12)$.
    1.  Start with $(a, b) = (18, 12)$.
        $18 = 1 \cdot 12 + 6$. (Remainder $r=6$)
        Now, we know $\text{gcd}(18, 12) = \text{gcd}(12, 6)$.
    2.  New pair $(a, b) = (12, 6)$.
        $12 = 2 \cdot 6 + 0$. (Remainder $r=0$)
        Now, we know $\text{gcd}(12, 6) = \text{gcd}(6, 0)$.
*   **Formal/Mathematical Version:** We generate a sequence of remainders $r_0, r_1, r_2, \dots$ where $r_0 = a$ and $r_1 = b$.
    $$r_0 = q_1 r_1 + r_2 \quad (0 \le r_2 < r_1)$$
    $$r_1 = q_2 r_2 + r_3 \quad (0 \le r_3 < r_2)$$
    $$r_2 = q_3 r_3 + r_4 \quad (0 \le r_4 < r_3)$$
    $$\dots$$
    $$r_{k-1} = q_k r_k + r_{k+1} \quad (0 \le r_{k+1} < r_k)$$
    Since the remainders are strictly decreasing non-negative integers ($r_1 > r_2 > r_3 > \dots \ge 0$), this sequence must eventually reach a remainder of zero.
*   **What Could Go Wrong:** Incorrectly assigning the "new" $a$ and $b$. The previous $b$ becomes the new $a$, and the previous $r$ becomes the new $b$. It's always $\text{gcd}(\text{previous divisor}, \text{previous remainder})$.

### Step 5: The Final Step (When remainder is zero)

*   **Plain English Statement:** When you reach a point where the remainder is zero, it means the number you just divided by perfectly divides the previous number. That divisor is your greatest common divisor.
*   **Small Concrete Example:** Continuing from Step 4:
    *   $\text{gcd}(12, 6)$ led to $12 = 2 \cdot 6 + 0$.
    *   The remainder is 0. The divisor in this step was 6.
    *   So, 6 is the GCD.
*   **Formal/Mathematical Version:** The sequence of equations terminates when we find a remainder $r_{k+1} = 0$.
    The last non-zero remainder, $r_k$, is the greatest common divisor of $a$ and $b$.
    This is because $\text{gcd}(r_k, r_{k+1}) = \text{gcd}(r_k, 0)$.
    By definition, any number divides 0, and the greatest divisor of $r_k$ is $r_k$ itself. So, $\text{gcd}(r_k, 0) = r_k$.
*   **What Could Go Wrong:** Accidentally picking the quotient, or thinking that 0 is the GCD. The GCD is always the *last non-zero remainder*.

## 5. Worked examples — multiple, with every step shown

Here are several examples demonstrating the Euclidean algorithm in action. Pay close attention to how each step follows the rule $\text{gcd}(a, b) = \text{gcd}(b, r)$.

### Example 1: Finding $\text{gcd}(48, 18)$

**Problem:** Find the greatest common divisor of 48 and 18.

**Given:** Two integers, $a=48$ and $b=18$.
**Want:** $\text{gcd}(48, 18)$.

**Step 1:** Divide 48 by 18.
$$48 = 2 \cdot 18 + 12$$
**Explanation:** We divide the larger number (48) by the smaller number (18). The quotient is 2, and the remainder is 12. According to the key property, $\text{gcd}(48, 18) = \text{gcd}(18, 12)$.

**Step 2:** Now, we find $\text{gcd}(18, 12)$. Divide 18 by 12.
$$18 = 1 \cdot 12 + 6$$
**Explanation:** The previous divisor (18) becomes our new dividend, and the previous remainder (12) becomes our new divisor. The quotient is 1, and the new remainder is 6. So, $\text{gcd}(18, 12) = \text{gcd}(12, 6)$.

**Step 3:** Now, we find $\text{gcd}(12, 6)$. Divide 12 by 6.
$$12 = 2 \cdot 6 + 0$$
**Explanation:** The previous divisor (12) becomes our new dividend, and the previous remainder (6) becomes our new divisor. The quotient is 2, and the remainder is 0. Since the remainder is 0, the algorithm terminates. The GCD is the last non-zero remainder, which was 6. So, $\text{gcd}(12, 6) = \text{gcd}(6, 0) = 6$.

**Final Answer:**
The greatest common divisor of 48 and 18 is $\boxed{6}$.

**Reflection:** This was a straightforward example with small numbers, demonstrating the iterative reduction of the problem to smaller pairs until a zero remainder is reached.

---

### Example 2: Finding $\text{gcd}(101, 73)$

**Problem:** Find the greatest common divisor of 101 and 73.

**Given:** Two integers, $a=101$ and $b=73$.
**Want:** $\text{gcd}(101, 73)$.

**Step 1:** Divide 101 by 73.
$$101 = 1 \cdot 73 + 28$$
**Explanation:** We divide 101 by 73. The quotient is 1, and the remainder is 28. This means $\text{gcd}(101, 73) = \text{gcd}(73, 28)$.

**Step 2:** Now, we find $\text{gcd}(73, 28)$. Divide 73 by 28.
$$73 = 2 \cdot 28 + 17$$
**Explanation:** The previous divisor (73) becomes the new dividend, and the previous remainder (28) becomes the new divisor. The quotient is 2, and the new remainder is 17. So, $\text{gcd}(73, 28) = \text{gcd}(28, 17)$.

**Step 3:** Now, we find $\text{gcd}(28, 17)$. Divide 28 by 17.
$$28 = 1 \cdot 17 + 11$$
**Explanation:** We repeat the process. The quotient is 1, and the remainder is 11. So, $\text{gcd}(28, 17) = \text{gcd}(17, 11)$.

**Step 4:** Now, we find $\text{gcd}(17, 11)$. Divide 17 by 11.
$$17 = 1 \cdot 11 + 6$$
**Explanation:** The quotient is 1, and the remainder is 6. So, $\text{gcd}(17, 11) = \text{gcd}(11, 6)$.

**Step 5:** Now, we find $\text{gcd}(11, 6)$. Divide 11 by 6.
$$11 = 1 \cdot 6 + 5$$
**Explanation:** The quotient is 1, and the remainder is 5. So, $\text{gcd}(11, 6) = \text{gcd}(6, 5)$.

**Step 6:** Now, we find $\text{gcd}(6, 5)$. Divide 6 by 5.
$$6 = 1 \cdot 5 + 1$$
**Explanation:** The quotient is 1, and the remainder is 1. So, $\text{gcd}(6, 5) = \text{gcd}(5, 1)$.

**Step 7:** Now, we find $\text{gcd}(5, 1)$. Divide 5 by 1.
$$5 = 5 \cdot 1 + 0$$
**Explanation:** The quotient is 5, and the remainder is 0. The algorithm terminates. The last non-zero remainder was 1. So, $\text{gcd}(5, 1) = \text{gcd}(1, 0) = 1$.

**Final Answer:**
The greatest common divisor of 101 and 73 is $\boxed{1}$.

**Reflection:** This example shows that even if numbers are relatively prime (their GCD is 1), the algorithm will still systematically find it. It required more steps due to the remainders not quickly becoming small.

---

### Example 3: Finding $\text{gcd}(270, 192)$

**Problem:** Find the greatest common divisor of 270 and 192.

**Given:** Two integers, $a=270$ and $b=192$.
**Want:** $\text{gcd}(270, 192)$.

**Step 1:** Divide 270 by 192.
$$270 = 1 \cdot 192 + 78$$
**Explanation:** The larger number (270) divided by the smaller (192) gives a quotient of 1 and a remainder of 78. So, $\text{gcd}(270, 192) = \text{gcd}(192, 78)$.

**Step 2:** Now, we find $\text{gcd}(192, 78)$. Divide 192 by 78.
$$192 = 2 \cdot 78 + 36$$
**Explanation:** The previous divisor (192) becomes the new dividend, and the previous remainder (78) becomes the new divisor. The quotient is 2, and the new remainder is 36. So, $\text{gcd}(192, 78) = \text{gcd}(78, 36)$.

**Step 3:** Now, we find $\text{gcd}(78, 36)$. Divide 78 by 36.
$$78 = 2 \cdot 36 + 6$$
**Explanation:** Repeating the process, 78 divided by 36 gives a quotient of 2 and a remainder of 6. So, $\text{gcd}(78, 36) = \text{gcd}(36, 6)$.

**Step 4:** Now, we find $\text{gcd}(36, 6)$. Divide 36 by 6.
$$36 = 6 \cdot 6 + 0$$
**Explanation:** The previous divisor (36) becomes the new dividend, and the previous remainder (6) becomes the new divisor. This division results in a quotient of 6 and a remainder of 0. The algorithm terminates. The last non-zero remainder was 6. So, $\text{gcd}(36, 6) = \text{gcd}(6, 0) = 6$.

**Final Answer:**
The greatest common divisor of 270 and 192 is $\boxed{6}$.

**Reflection:** This example involved slightly larger numbers and a few more steps, but the process remained identical. It's a good illustration of how the numbers quickly decrease in size.

---

### Example 4: Finding $\text{gcd}(100, 25)$

**Problem:** Find the greatest common divisor of 100 and 25.

**Given:** Two integers, $a=100$ and $b=25$.
**Want:** $\text{gcd}(100, 25)$.

**Step 1:** Divide 100 by 25.
$$100 = 4 \cdot 25 + 0$$
**Explanation:** We divide 100 by 25. The quotient is 4, and the remainder is 0. Since the remainder is 0 in the very first step, the algorithm terminates immediately. The GCD is the divisor from this step, which is 25. So, $\text{gcd}(100, 25) = \text{gcd}(25, 0) = 25$.

**Final Answer:**
The greatest common divisor of 100 and 25 is $\boxed{25}$.

**Reflection:** This example shows a quick termination case. If one number is a multiple of the other, the GCD is simply the smaller number, and the algorithm finds this in a single step.

## 6. Common mistakes and traps

1.  **Incorrect Remainder Calculation:** This is the most frequent error. Always ensure $0 \le r < b$. For example, when dividing 20 by 3, the remainder is 2 ($20 = 6 \cdot 3 + 2$), not -1 or any other number outside the specified range.
2.  **Swapping Numbers Incorrectly:** After calculating $a = qb + r$, the next step is to find $\text{gcd}(b, r)$. A common mistake is to use $q$ instead of $b$, or $a$ instead of $b$, or to swap $b$ and $r$ in the wrong order. Remember: (previous divisor, previous remainder).
3.  **Stopping Too Early or Too Late:** The algorithm terminates *when the remainder is 0*. The GCD is the *last non-zero remainder* (which is the divisor in the step that yielded a 0 remainder). Stopping before a 0 remainder or trying to continue past it will lead to incorrect results.
4.  **Confusing Quotient and Remainder:** The quotient $q$ is not used in the next step of the Euclidean algorithm (though it's crucial for the division itself). Only the divisor $b$ and the remainder $r$ are carried forward.
5.  **Not Understanding the Underlying Principle:** Just memorizing the steps without understanding *why* $\text{gcd}(a, b) = \text{gcd}(b, r)$ can make it hard to debug mistakes or apply the concept in more advanced scenarios.
6.  **Applying to Non-Integers:** The Euclidean algorithm is specifically for integers. While there are extensions to other rings (like polynomials), the basic algorithm as presented here is for whole numbers.

## 7. Textbook-precise explanation

The Euclidean algorithm is a method for computing the greatest common divisor (GCD) of two integers. The GCD of two non-zero integers $a$ and $b$, denoted $\text{gcd}(a, b)$, is the largest positive integer that divides both $a$ and $b$. If $a=0$ and $b \ne 0$, then $\text{gcd}(0, b) = |b|$. By convention, $\text{gcd}(0,0)=0$.

The algorithm is based on the following fundamental property (often referred to as Euclid's Lemma for GCDs):
**Theorem:** Let $a$ and $b$ be integers with $b \ne 0$. If $a = qb + r$ for some integers $q$ and $r$, then $\text{gcd}(a, b) = \text{gcd}(b, r)$.

**Proof:** Let $d = \text{gcd}(a, b)$. By definition, $d|a$ and $d|b$. Since $r = a - qb$, and $d$ divides both $a$ and $b$, it must divide any linear combination of $a$ and $b$. Therefore, $d|(a - qb)$, which implies $d|r$. Thus, $d$ is a common divisor of $b$ and $r$.
Now, let $d' = \text{gcd}(b, r)$. By definition, $d'|b$ and $d'|r$. Since $a = qb + r$, and $d'$ divides both $b$ and $r$, it must divide $qb+r$. Therefore, $d'|a$. Thus, $d'$ is a common divisor of $a$ and $b$.
Since $d$ is the *greatest* common divisor of $a$ and $b$, and $d'$ is a common divisor of $a$ and $b$, it must be that $d' \le d$.
Similarly, since $d'$ is the *greatest* common divisor of $b$ and $r$, and $d$ is a common divisor of $b$ and $r$, it must be that $d \le d'$.
From $d' \le d$ and $d \le d'$, it follows that $d = d'$. Hence, $\text{gcd}(a, b) = \text{gcd}(b, r)$.

The Euclidean Algorithm proceeds as follows:
Given two non-negative integers $a$ and $b$ with $a \ge b$.
1.  If $b=0$, then $\text{gcd}(a, b) = a$.
2.  If $b \ne 0$, apply the Division Algorithm to $a$ and $b$ to obtain $a = qb + r$, where $0 \le r < b$.
3.  Replace the pair $(a, b)$ with $(b, r)$ and repeat the process from step 1.

This process generates a sequence of decreasing non-negative remainders: $r_1 = b > r_2 > r_3 > \dots \ge 0$. Since the remainders are strictly decreasing and bounded below by zero, the sequence must terminate in a finite number of steps, eventually producing a remainder of zero. The last non-zero remainder in this sequence is the GCD of the original two integers.

Let the sequence of divisions be:
$$a = q_1 b + r_1 \quad (0 \le r_1 < b)$$
$$b = q_2 r_1 + r_2 \quad (0 \le r_2 < r_1)$$
$$r_1 = q_3 r_2 + r_3 \quad (0 \le r_3 < r_2)$$
$$\dots$$
$$r_{k-2} = q_k r_{k-1} + r_k \quad (0 \le r_k < r_{k-1})$$
$$r_{k-1} = q_{k+1} r_k + 0$$
By the theorem, we have:
$\text{gcd}(a, b) = \text{gcd}(b, r_1) = \text{gcd}(r_1, r_2) = \dots = \text{gcd}(r_{k-1}, r_k) = \text{gcd}(r_k, 0)$.
Since $\text{gcd}(r_k, 0) = r_k$, the last non-zero remainder $r_k$ is the GCD of $a$ and $b$.

**Reference:**
*   Rosen, Kenneth H. *Elementary Number Theory and Its Applications*. 6th ed., Pearson, 2011. (Chapter 3, Section 3.3)
*   Cormen, Thomas H., Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein. *Introduction to Algorithms*. 4th ed., MIT Press, 2022. (Chapter 31, Section 31.2)

## 8. ASCII diagrams

Here's an ASCII diagram illustrating the flow of the Euclidean algorithm:

```text
                                START
                                  |
                                  V
                           Input: a, b (integers)
                                  |
                                  V
               +-------------------------------------+
               | Is b equal to 0?                    |
               | (Base Case / Termination Condition) |
               +-------------------------------------+
                  | Yes                         | No
                  |                             V
                  |                      Calculate: a = q * b + r
                  |                      (q is quotient, r is remainder)
                  V                                |
             Output a (GCD)                        V
                  |                      New values: (a <- b, b <- r)
                  V                                |
                 END                               V
                                        (Loop back to "Is b equal to 0?")
```

This diagram shows the iterative nature: you perform a division, check the remainder. If the remainder is zero, you're done, and the current 'a' (which was the 'b' from the previous step) is the GCD. If not, you replace your numbers with the old divisor and the new remainder, and repeat the process.

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:** Think of it as "The Remainder Race." You have two numbers, and you repeatedly "race" them by dividing the larger by the smaller. The "winner" (the divisor) and the "leftover" (the remainder) then race again. The numbers get smaller and smaller, like runners getting tired, until one runner (the remainder) collapses to zero. The last runner still standing (the previous divisor) is the champion – the GCD!
    *   **"D-S-R-Z": Divide, Swap, Repeat until Zero.**
        *   **D**ivide: $a$ by $b$ to get remainder $r$.
        *   **S**wap: The old $b$ becomes new $a$, the old $r$ becomes new $b$.
        *   **R**epeat: Go back to Divide.
        *   Until **Z**ero: When $r=0$, the current $a$ is the GCD.

2.  **Formulas/Facts to Overlearn:**
    *   The Division Algorithm: $a = qb + r$, where $0 \le r < b$.
    *   The Core Property: $\text{gcd}(a, b) = \text{gcd}(b, r)$.
    *   The Termination Condition: $\text{gcd}(a, 0) = a$.

3.  **Spaced-Repetition Schedule:**
    *   **1 Day:** Review the steps and do 2-3 simple examples.
    *   **3 Days:** Review the core property and do 2-3 medium examples.
    *   **7 Days:** Review the proof sketch for $\text{gcd}(a, b) = \text{gcd}(b, r)$ and do 1-2 harder examples.
    *   **16 Days:** Mentally walk through the algorithm without writing anything down. Do a challenge problem.
    *   **35 Days:** Explain the algorithm aloud to an imaginary person. Solve a problem involving three numbers (e.g., $\text{gcd}(a,b,c) = \text{gcd}(\text{gcd}(a,b), c)$).

4.  **First-Principles Re-derivation Pathway:**
    If you forget the algorithm, you can always rebuild it by starting with the definition of GCD:
    1.  What does $\text{gcd}(a, b)$ mean? It's the largest number $d$ that divides both $a$ and $b$.
    2.  If $d$ divides $a$ and $d$ divides $b$, what else must $d$ divide? Any combination $xa + yb$.
    3.  Consider the Division Algorithm: $a = qb + r$. Rearrange it: $r = a - qb$.
    4.  If $d$ divides $a$ and $b$, then $d$ must divide $r$ (since $r = a - qb$). So, $d$ is a common divisor of $b$ and $r$.
    5.  Conversely, if $d'$ divides $b$ and $r$, then $d'$ must divide $a$ (since $a = qb + r$). So, $d'$ is a common divisor of $a$ and $b$.
    6.  Since the set of common divisors for $(a, b)$ is the same as for $(b, r)$, their greatest common divisors must also be the same. Thus, $\text{gcd}(a, b) = \text{gcd}(b, r)$.
    7.  This means you can keep replacing the pair $(a, b)$ with $(b, r)$ until the remainder is 0. When the remainder is 0, say $X = Q \cdot Y + 0$, then $\text{gcd}(X, Y) = \text{gcd}(Y, 0) = Y$. So the last non-zero remainder is the GCD.

## 10. Connections — what this leads to

The Euclidean algorithm is a cornerstone of number theory and has far-reaching implications and extensions:

*   **Extended Euclidean Algorithm:** This is a direct extension that not only finds $\text{gcd}(a, b)$ but also finds integers $x$ and $y$ such that $ax + by = \text{gcd}(a, b)$. This identity is known as Bézout's Identity.
*   **Modular Inverses:** The Extended Euclidean Algorithm is crucial for finding modular inverses. An integer $a$ has a multiplicative inverse modulo $m$ (an integer $x$ such that $ax \equiv 1 \pmod m$) if and only if $\text{gcd}(a, m) = 1$. The algorithm provides a constructive way to find this $x$.
*   **Solving Linear Diophantine Equations:** Equations of the form $ax + by = c$, where $a, b, c$ are integers and we seek integer solutions for $x$ and $y$, are called linear Diophantine equations. Such an equation has integer solutions if and only if $\text{gcd}(a, b)$ divides $c$. The Extended Euclidean Algorithm is used to find a particular solution.
*   **RSA Cryptography:** As mentioned earlier, the Extended Euclidean Algorithm is fundamental to RSA for computing modular inverses, which are essential for decryption keys.
*   **Continued Fractions:** The quotients generated during the Euclidean algorithm can be used to construct the continued fraction expansion of a rational number $\frac{a}{b}$.
*   **Rational Number Simplification:** It's the most efficient method to reduce a fraction $\frac{a}{b}$ to its simplest form by dividing both numerator and denominator by $\text{gcd}(a, b)$.
*   **Chinese Remainder Theorem:** While not directly used in its primary form, the underlying number theory principles, especially those relating to modular arithmetic and coprimality (often established via GCD), are vital for understanding and proving the Chinese Remainder Theorem.
*   **Abstract Algebra:** The concept of a Euclidean algorithm can be generalized to other algebraic structures called Euclidean Domains, which are integral domains where a "division algorithm" with a suitable "norm" function can be defined. Examples include polynomial rings.

## 11. Self-check questions

1.  Use the Euclidean algorithm to find $\text{gcd}(60, 24)$. Show all steps.
2.  Compute $\text{gcd}(123, 45)$ using the Euclidean algorithm.
3.  Determine $\text{gcd}(999, 49)$ using the Euclidean algorithm.
4.  Prove that for any positive integer $k$, $\text{gcd}(ka, kb) = k \cdot \text{gcd}(a, b)$.
5.  Explain in your own words why the Euclidean algorithm is guaranteed to terminate.