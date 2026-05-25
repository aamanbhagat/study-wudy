## 1. What it is — in plain English

Imagine you have a big pile of cookies, say 24 of them. You want to share them equally among your friends. If you have 2 friends, can you share them perfectly without any cookies left over? Yes, each friend gets 12. What if you have 3 friends? Yes, each gets 8. What about 5 friends? No, you'd have 4 cookies left over.

"Divisibility" is just a fancy way of asking if one number can be divided by another number *perfectly*, with absolutely no remainder left over. If you can divide 24 by 2 and get a whole number (12) with zero remainder, we say "24 is divisible by 2."

Now, imagine you have a *really* big number, like 7,381,926. How do you quickly tell if it's divisible by 3, or 4, or 7, without actually doing the long division? That's where "divisibility rules" come in! They are clever shortcuts, like secret codes, that let you check divisibility just by looking at certain digits or doing simple calculations with them.

These rules are like quick mental checks that save you time and effort. Instead of performing a full division, which can be tedious for large numbers, you can apply a simple trick to instantly know if one number fits perfectly into another. It's a fundamental concept in mathematics that helps us understand how numbers relate to each other.

## 2. Why it matters — real-world applications

Divisibility rules might seem like simple tricks, but they underpin many complex systems and are crucial in various real-world scenarios:

1.  **Cryptography and Cybersecurity**: At the heart of secure communication (like online banking or encrypted messages) are algorithms that rely heavily on prime numbers and factorization. Divisibility rules are the most basic tools for determining if a large number is prime or composite (meaning it can be divided by smaller numbers). For instance, the RSA encryption standard, widely used today, depends on the difficulty of factoring very large numbers into their prime components. Efficiently checking for small prime factors (using divisibility rules) is a first step in many factorization algorithms.

2.  **Computer Science and Algorithm Design**: Computers often perform calculations involving large numbers. Divisibility checks are fundamental in optimizing algorithms. For example, in hashing functions (used for data storage and retrieval), modulo operations (which are essentially remainders after division) are frequently used. Knowing divisibility rules allows for quicker checks for even/odd numbers, or for numbers divisible by 4 or 8, which can be optimized at a low level in hardware or software. This impacts the speed and efficiency of everything from database lookups to graphics rendering.

3.  **Scheduling and Resource Allocation**: Imagine a manufacturing plant needing to produce a certain number of items, say 1,200 widgets. If they need to package them in boxes of 6, or ship them on pallets that hold 8 items, quickly knowing if 1,200 is divisible by 6 or 8 helps in planning production runs, ordering packaging, and optimizing logistics to avoid waste or incomplete batches. Similar applications exist in dividing shifts for employees, allocating computational resources, or even designing network packets.

4.  **Error Detection and Correction (Checksums)**: Many systems, from bank account numbers to ISBNs on books, use a "checksum" digit. This digit is calculated based on the other digits in a way that makes the entire number divisible by a specific number (often 10 or 11). If a single digit is accidentally typed incorrectly, the divisibility rule will fail, indicating an error. This simple application of divisibility helps ensure data integrity in countless everyday transactions and data storage.

## 3. Prerequisites — what you must know first

Before diving into divisibility rules, ensure you have a solid grasp of these foundational mathematical concepts:

*   **Basic Arithmetic**: Proficiency in addition, subtraction, multiplication, and division of whole numbers.
*   **Integers**: Understanding what integers are (positive and negative whole numbers, including zero) and how they behave.
*   **Remainder (in Division)**: Knowing that when you divide one number by another, you get a quotient and sometimes a remainder. For example, $17 \div 5 = 3$ with a remainder of $2$. Divisibility means the remainder is $0$.
*   **Place Value**: Understanding that the position of a digit in a number determines its value (e.g., in 345, the '3' represents 3 hundreds, '4' represents 4 tens, and '5' represents 5 units). A number $N$ can be written as $d_n 10^n + \dots + d_1 10^1 + d_0 10^0$.
*   **Basic Algebraic Manipulation**: The ability to work with variables, substitute values, and simplify expressions.
*   **Factors and Multiples**: Understanding that if $a$ divides $b$, then $a$ is a factor of $b$, and $b$ is a multiple of $a$.
*   **Prime and Composite Numbers (basic idea)**: Knowing that a prime number has exactly two distinct positive divisors: 1 and itself. A composite number has more than two.

## 4. The core idea — step by step

The core idea behind divisibility rules is to exploit the properties of our base-10 number system and modular arithmetic. We represent a number $N$ as a sum of its digits multiplied by powers of 10. For example, $N = d_n d_{n-1} \dots d_1 d_0$ can be written as $N = d_n 10^n + d_{n-1} 10^{n-1} + \dots + d_1 10^1 + d_0 10^0$.

We then use the fact that $10$ (or powers of $10$) behave in specific ways when divided by certain numbers. For instance, $10$ is divisible by $2$ and $5$. Also, $10$ leaves a remainder of $1$ when divided by $3$ or $9$, and a remainder of $-1$ (or $9$) when divided by $11$. These properties allow us to simplify the divisibility check dramatically.

Let's explore the rules one by one.

### Step 1: Divisibility Rules for 2, 5, and 10 (Last Digit Rules)

These rules are the simplest because they only depend on the very last digit of a number.

*   **Plain-English Statement**:
    *   **Rule for 2**: A number is divisible by 2 if its last digit is an even number (0, 2, 4, 6, or 8).
    *   **Rule for 5**: A number is divisible by 5 if its last digit is 0 or 5.
    *   **Rule for 10**: A number is divisible by 10 if its last digit is 0.

*   **Small Concrete Example**:
    *   For 2: Is 3478 divisible by 2? Yes, because its last digit is 8, which is even.
    *   For 5: Is 1235 divisible by 5? Yes, because its last digit is 5.
    *   For 10: Is 9870 divisible by 10? Yes, because its last digit is 0.

*   **Formal/Mathematical Version (with Proofs)**:
    Let $N$ be any integer. We can express $N$ in terms of its last digit $d_0$ and the number formed by its preceding digits, $K$. So, $N = 10K + d_0$.
    For example, if $N = 3478$, then $K = 347$ and $d_0 = 8$.

    *   **Proof for 2**:
        We want to know if $N$ is divisible by 2.
        $$N = 10K + d_0$$
        Since $10K$ is a multiple of 10, it is also a multiple of 2 (because $10 = 2 \times 5$).
        So, $10K$ is always divisible by 2.
        For $N$ to be divisible by 2, the remaining part, $d_0$, must also be divisible by 2.
        Therefore, $N$ is divisible by 2 if and only if its last digit $d_0$ is divisible by 2.
        This means $d_0$ must be 0, 2, 4, 6, or 8.

    *   **Proof for 5**:
        Similarly, for $N$ to be divisible by 5:
        $$N = 10K + d_0$$
        Since $10K$ is a multiple of 10, it is also a multiple of 5 (because $10 = 5 \times 2$).
        So, $10K$ is always divisible by 5.
        For $N$ to be divisible by 5, the remaining part, $d_0$, must also be divisible by 5.
        Therefore, $N$ is divisible by 5 if and only if its last digit $d_0$ is divisible by 5.
        This means $d_0$ must be 0 or 5.

    *   **Proof for 10**:
        For $N$ to be divisible by 10:
        $$N = 10K + d_0$$
        Since $10K$ is a multiple of 10, it is always divisible by 10.
        For $N$ to be divisible by 10, the remaining part, $d_0$, must also be divisible by 10.
        The only single digit $d_0$ (from 0 to 9) that is divisible by 10 is 0.
        Therefore, $N$ is divisible by 10 if and only if its last digit $d_0$ is 0.

*   **What could go wrong**: Students might accidentally look at the first digit or a middle digit instead of *only* the last digit. Always focus on the units place.

### Step 2: Divisibility Rules for 4 and 8 (Last Few Digits Rules)

These rules extend the idea of the last digit to the last two or three digits, because $100$ is divisible by $4$, and $1000$ is divisible by $8$.

*   **Plain-English Statement**:
    *   **Rule for 4**: A number is divisible by 4 if the number formed by its last two digits is divisible by 4.
    *   **Rule for 8**: A number is divisible by 8 if the number formed by its last three digits is divisible by 8.

*   **Small Concrete Example**:
    *   For 4: Is 7316 divisible by 4? Yes, because the number formed by its last two digits, 16, is divisible by 4 ($16 \div 4 = 4$).
    *   For 8: Is 52,128 divisible by 8? Yes, because the number formed by its last three digits, 128, is divisible by 8 ($128 \div 8 = 16$).

*   **Formal/Mathematical Version (with Proofs)**:
    Let $N$ be any integer.
    *   **Proof for 4**:
        We can write $N$ as $N = 100K + (10d_1 + d_0)$, where $10d_1 + d_0$ represents the number formed by the last two digits.
        For example, if $N = 7316$, then $K = 73$ and $10d_1 + d_0 = 16$.
        Since $100K$ is a multiple of 100, it is always divisible by 4 (because $100 = 4 \times 25$).
        For $N$ to be divisible by 4, the remaining part, $10d_1 + d_0$, must also be divisible by 4.
        Therefore, $N$ is divisible by 4 if and only if the number formed by its last two digits is divisible by 4.

    *   **Proof for 8**:
        We can write $N$ as $N = 1000K + (100d_2 + 10d_1 + d_0)$, where $100d_2 + 10d_1 + d_0$ represents the number formed by the last three digits.
        For example, if $N = 52128$, then $K = 52$ and $100d_2 + 10d_1 + d_0 = 128$.
        Since $1000K$ is a multiple of 1000, it is always divisible by 8 (because $1000 = 8 \times 125$).
        For $N$ to be divisible by 8, the remaining part, $100d_2 + 10d_1 + d_0$, must also be divisible by 8.
        Therefore, $N$ is divisible by 8 if and only if the number formed by its last three digits is divisible by 8.

*   **What could go wrong**: Students might try to apply the rule to numbers with fewer than two (for 4) or three (for 8) digits. For example, for 36, the "last two digits" *is* 36. For 7, the "last two digits" is 07, which is 7. You still check 7 for divisibility by 4 (it's not).

### Step 3: Divisibility Rules for 3 and 9 (Sum of Digits Rules)

These rules are powerful because they work for numbers of any length and are based on a unique property of 10 with respect to 3 and 9.

*   **Plain-English Statement**:
    *   **Rule for 3**: A number is divisible by 3 if the sum of its digits is divisible by 3.
    *   **Rule for 9**: A number is divisible by 9 if the sum of its digits is divisible by 9.

*   **Small Concrete Example**:
    *   For 3: Is 456 divisible by 3? Sum of digits: $4+5+6 = 15$. Is 15 divisible by 3? Yes ($15 \div 3 = 5$). So, 456 is divisible by 3.
    *   For 9: Is 729 divisible by 9? Sum of digits: $7+2+9 = 18$. Is 18 divisible by 9? Yes ($18 \div 9 = 2$). So, 729 is divisible by 9.

*   **Formal/Mathematical Version (with Proofs)**:
    Let $N$ be an integer represented by its digits $d_n d_{n-1} \dots d_1 d_0$.
    So, $N = d_n 10^n + d_{n-1} 10^{n-1} + \dots + d_1 10^1 + d_0 10^0$.

    *   **Proof for 3**:
        Consider the powers of 10 modulo 3:
        $10 \equiv 1 \pmod 3$
        $10^2 \equiv 10 \times 10 \equiv 1 \times 1 \equiv 1 \pmod 3$
        In general, $10^k \equiv 1^k \equiv 1 \pmod 3$ for any non-negative integer $k$.

        Now substitute this into the expression for $N$:
        $$N \equiv d_n (1) + d_{n-1} (1) + \dots + d_1 (1) + d_0 (1) \pmod 3$$
        $$N \equiv d_n + d_{n-1} + \dots + d_1 + d_0 \pmod 3$$
        This means that $N$ and the sum of its digits, $\sum d_i$, always have the same remainder when divided by 3.
        Therefore, $N$ is divisible by 3 if and only if the sum of its digits is divisible by 3.

    *   **Proof for 9**:
        The proof is identical to the rule for 3, but with modulo 9:
        Consider the powers of 10 modulo 9:
        $10 \equiv 1 \pmod 9$
        $10^2 \equiv 10 \times 10 \equiv 1 \times 1 \equiv 1 \pmod 9$
        In general, $10^k \equiv 1^k \equiv 1 \pmod 9$ for any non-negative integer $k$.

        Substitute this into the expression for $N$:
        $$N \equiv d_n (1) + d_{n-1} (1) + \dots + d_1 (1) + d_0 (1) \pmod 9$$
        $$N \equiv d_n + d_{n-1} + \dots + d_1 + d_0 \pmod 9$$
        This means that $N$ and the sum of its digits, $\sum d_i$, always have the same remainder when divided by 9.
        Therefore, $N$ is divisible by 9 if and only if the sum of its digits is divisible by 9.

*   **What could go wrong**: Students might forget that if the sum of digits is a large number, they can repeat the process (sum the digits of *that* sum) until they get a single digit. E.g., for 999, sum is 27. Sum of digits of 27 is $2+7=9$, which is divisible by 9.

### Step 4: Divisibility Rule for 6 (Combined Rule)

This rule combines two previous rules.

*   **Plain-English Statement**: A number is divisible by 6 if it is divisible by *both* 2 and 3.

*   **Small Concrete Example**:
    *   Is 138 divisible by 6?
        1.  Is it divisible by 2? Yes, its last digit is 8 (even).
        2.  Is it divisible by 3? Sum of digits: $1+3+8 = 12$. Is 12 divisible by 3? Yes.
        Since it's divisible by both 2 and 3, 138 is divisible by 6.

*   **Formal/Mathematical Version (with Proof)**:
    For any integers $a, b, c$, if $a$ divides $c$ and $b$ divides $c$, and if $a$ and $b$ are *coprime* (meaning their greatest common divisor is 1, $\text{gcd}(a,b)=1$), then their product $ab$ also divides $c$.
    In this case, we have $a=2$ and $b=3$.
    $\text{gcd}(2,3) = 1$, so 2 and 3 are coprime.
    If a number $N$ is divisible by 2, it means $N = 2k_1$ for some integer $k_1$.
    If a number $N$ is divisible by 3, it means $N = 3k_2$ for some integer $k_2$.
    Since $\text{gcd}(2,3)=1$, it implies that $N$ must be a multiple of their product, $2 \times 3 = 6$.
    Therefore, $N$ is divisible by 6 if and only if it is divisible by both 2 and 3.

*   **What could go wrong**: Students might check only one condition (e.g., only divisibility by 2) and assume divisibility by 6. Both conditions *must* be met. Also, this rule only works because 2 and 3 are coprime. For example, a number divisible by 4 and 6 is *not* necessarily divisible by $4 \times 6 = 24$ (e.g., 12 is divisible by 4 and 6, but not 24).

### Step 5: Divisibility Rule for 11 (Alternating Sum Rule)

This rule involves an alternating sum of digits.

*   **Plain-English Statement**: A number is divisible by 11 if the alternating sum of its digits (starting from the rightmost digit, subtracting the next, adding the next, and so on) is divisible by 11.

*   **Small Concrete Example**:
    *   Is 1925 divisible by 11?
        Start from the right: $5 - 2 + 9 - 1 = 11$.
        Is 11 divisible by 11? Yes. So, 1925 is divisible by 11.
    *   Is 814 divisible by 11?
        Start from the right: $4 - 1 + 8 = 11$.
        Is 11 divisible by 11? Yes. So, 814 is divisible by 11.
    *   Is 2684 divisible by 11?
        Start from the right: $4 - 8 + 6 - 2 = 0$.
        Is 0 divisible by 11? Yes ($0 \div 11 = 0$). So, 2684 is divisible by 11.

*   **Formal/Mathematical Version (with Proof)**:
    Let $N$ be an integer represented by its digits $d_n d_{n-1} \dots d_1 d_0$.
    So, $N = d_n 10^n + d_{n-1} 10^{n-1} + \dots + d_1 10^1 + d_0 10^0$.

    Consider the powers of 10 modulo 11:
    $10 \equiv -1 \pmod{11}$
    $10^2 \equiv (-1)^2 \equiv 1 \pmod{11}$
    $10^3 \equiv (-1)^3 \equiv -1 \pmod{11}$
    In general, $10^k \equiv (-1)^k \pmod{11}$.

    Substitute this into the expression for $N$:
    $$N \equiv d_n (-1)^n + d_{n-1} (-1)^{n-1} + \dots + d_1 (-1)^1 + d_0 (-1)^0 \pmod{11}$$
    $$N \equiv d_n (-1)^n + d_{n-1} (-1)^{n-1} + \dots - d_1 + d_0 \pmod{11}$$
    This is the alternating sum of digits, starting with $d_0$ (units digit) being positive.
    Therefore, $N$ is divisible by 11 if and only if the alternating sum of its digits (starting from the rightmost digit as positive) is divisible by 11.

*   **What could go wrong**: Students often get confused about which digit to start with (rightmost or leftmost) and whether to add or subtract first. Always start with the rightmost digit, adding it, then subtracting the next, then adding, and so on.

### Step 6: Divisibility Rule for 7 (The "Double and Subtract" Rule)

This rule is a bit more complex and often requires iteration.

*   **Plain-English Statement**: To check if a number is divisible by 7, remove its last digit, double that removed digit, and subtract it from the remaining number. If the result is divisible by 7, then the original number is also divisible by 7. Repeat this process if the resulting number is still large.

*   **Small Concrete Example**:
    *   Is 343 divisible by 7?
        1.  Remove last digit (3), remaining number is 34.
        2.  Double removed digit: $3 \times 2 = 6$.
        3.  Subtract from remaining number: $34 - 6 = 28$.
        4.  Is 28 divisible by 7? Yes ($28 \div 7 = 4$).
        So, 343 is divisible by 7.

    *   Is 1358 divisible by 7?
        1.  Remove last digit (8), remaining number is 135.
        2.  Double removed digit: $8 \times 2 = 16$.
        3.  Subtract: $135 - 16 = 119$.
        4.  Is 119 divisible by 7? Let's repeat the rule:
            a. Remove last digit (9), remaining number is 11.
            b. Double removed digit: $9 \times 2 = 18$.
            c. Subtract: $11 - 18 = -7$.
            d. Is -7 divisible by 7? Yes ($-7 \div 7 = -1$).
        So, 1358 is divisible by 7.

*   **Formal/Mathematical Version (with Proof)**:
    Let $N$ be a number. We can write $N = 10a + b$, where $b$ is the last digit and $a$ is the number formed by the remaining digits.
    For example, if $N = 343$, then $a = 34$ and $b = 3$.

    We want to show that $N$ is divisible by 7 if and only if $a - 2b$ is divisible by 7.
    Assume $N$ is divisible by 7, so $10a + b \equiv 0 \pmod 7$.
    We want to transform $10a + b$ into $a - 2b$.
    Multiply the congruence by $-2$:
    $$-2(10a + b) \equiv -2(0) \pmod 7$$
    $$-20a - 2b \equiv 0 \pmod 7$$
    Since $-20 \equiv 1 \pmod 7$ (because $-20 = -3 \times 7 + 1$), we can substitute:
    $$1a - 2b \equiv 0 \pmod 7$$
    This shows that if $N$ is divisible by 7, then $a - 2b$ is also divisible by 7.

    Conversely, assume $a - 2b$ is divisible by 7, so $a - 2b \equiv 0 \pmod 7$.
    We want to show that $10a + b$ is divisible by 7.
    From $a - 2b \equiv 0 \pmod 7$, we have $a \equiv 2b \pmod 7$.
    Now substitute $a \equiv 2b$ into $10a + b$:
    $$10a + b \equiv 10(2b) + b \pmod 7$$
    $$10a + b \equiv 20b + b \pmod 7$$
    $$10a + b \equiv 21b \pmod 7$$
    Since $21b$ is clearly divisible by 7 ($21b = 7 \times 3b$), we have:
    $$10a + b \equiv 0 \pmod 7$$
    Thus, $N$ is divisible by 7 if and only if $a - 2b$ is divisible by 7.

*   **What could go wrong**: Students might perform the operations in the wrong order (e.g., subtract before doubling) or forget to repeat the process for large results. Be careful with negative results; a negative multiple of 7 (like -7) is still considered divisible by 7.

## 5. Worked examples — multiple, with every step shown

Here are several worked examples demonstrating the application of divisibility rules.

### Example 1: Checking multiple rules for a medium-sized number

**Problem**: Determine if the number $61,740$ is divisible by 2, 3, 4, 5, 6, 9, 10.

**Given**: The number $N = 61,740$.
**Want**: To check divisibility by 2, 3, 4, 5, 6, 9, 10.

**Solution**:

1.  **Divisibility by 2**:
    *   **Rule**: A number is divisible by 2 if its last digit is even (0, 2, 4, 6, 8).
    *   **Step**: The last digit of $61,740$ is $0$.
    *   **Explanation**: Since $0$ is an even number, the condition is met.
    *   **Result**: $61,740$ **is divisible by 2**.

2.  **Divisibility by 3**:
    *   **Rule**: A number is divisible by 3 if the sum of its digits is divisible by 3.
    *   **Step**: Calculate the sum of digits: $6 + 1 + 7 + 4 + 0 = 18$.
    *   **Explanation**: Now we check if $18$ is divisible by 3. Yes, $18 \div 3 = 6$.
    *   **Result**: $61,740$ **is divisible by 3**.

3.  **Divisibility by 4**:
    *   **Rule**: A number is divisible by 4 if the number formed by its last two digits is divisible by 4.
    *   **Step**: The last two digits of $61,740$ form the number $40$.
    *   **Explanation**: Now we check if $40$ is divisible by 4. Yes, $40 \div 4 = 10$.
    *   **Result**: $61,740$ **is divisible by 4**.

4.  **Divisibility by 5**:
    *   **Rule**: A number is divisible by 5 if its last digit is 0 or 5.
    *   **Step**: The last digit of $61,740$ is $0$.
    *   **Explanation**: Since the last digit is $0$, the condition is met.
    *   **Result**: $61,740$ **is divisible by 5**.

5.  **Divisibility by 6**:
    *   **Rule**: A number is divisible by 6 if it is divisible by both 2 and 3.
    *   **Step**: From our previous checks:
        *   $61,740$ is divisible by 2 (checked in step 1).
        *   $61,740$ is divisible by 3 (checked in step 2).
    *   **Explanation**: Since both conditions are satisfied, the number is divisible by 6.
    *   **Result**: $61,740$ **is divisible by 6**.

6.  **Divisibility by 9**:
    *   **Rule**: A number is divisible by 9 if the sum of its digits is divisible by 9.
    *   **Step**: The sum of digits is $18$ (calculated in step 2).
    *   **Explanation**: Now we check if $18$ is divisible by 9. Yes, $18 \div 9 = 2$.
    *   **Result**: $61,740$ **is divisible by 9**.

7.  **Divisibility by 10**:
    *   **Rule**: A number is divisible by 10 if its last digit is 0.
    *   **Step**: The last digit of $61,740$ is $0$.
    *   **Explanation**: Since the last digit is $0$, the condition is met.
    *   **Result**: $61,740$ **is divisible by 10**.

**Final Answer**: The number $61,740$ is divisible by **2, 3, 4, 5, 6, 9, and 10**.

**Reflection**: This example was straightforward because the number ended in 0, simplifying checks for 2, 5, and 10. The sum of digits was also a clear multiple of 3 and 9.

---

### Example 2: Checking divisibility for a larger number, including 8 and 11

**Problem**: Determine if the number $1,408,824$ is divisible by 4, 8, and 11.

**Given**: The number $N = 1,408,824$.
**Want**: To check divisibility by 4, 8, and 11.

**Solution**:

1.  **Divisibility by 4**:
    *   **Rule**: A number is divisible by 4 if the number formed by its last two digits is divisible by 4.
    *   **Step**: The last two digits of $1,408,824$ form the number $24$.
    *   **Explanation**: We check if $24$ is divisible by 4. Yes, $24 \div 4 = 6$.
    *   **Result**: $1,408,824$ **is divisible by 4**.

2.  **Divisibility by 8**:
    *   **Rule**: A number is divisible by 8 if the number formed by its last three digits is divisible by 8.
    *   **Step**: The last three digits of $1,408,824$ form the number $824$.
    *   **Explanation**: We check if $824$ is divisible by 8. We can perform a quick division:
        $$824 \div 8$$
        $$800 \div 8 = 100$$
        $$24 \div 8 = 3$$
        $$100 + 3 = 103$$
        Since $824 \div 8 = 103$ with no remainder, $824$ is divisible by 8.
    *   **Result**: $1,408,824$ **is divisible by 8**.

3.  **Divisibility by 11**:
    *   **Rule**: A number is divisible by 11 if the alternating sum of its digits (starting from the rightmost digit, subtracting the next, adding the next, etc.) is divisible by 11.
    *   **Step**: The digits of $1,408,824$ are $1, 4, 0, 8, 8, 2, 4$.
        Calculate the alternating sum:
        $$4 - 2 + 8 - 8 + 0 - 4 + 1$$
        $$2 + 8 - 8 + 0 - 4 + 1$$
        $$10 - 8 + 0 - 4 + 1$$
        $$2 + 0 - 4 + 1$$
        $$2 - 4 + 1$$
        $$-2 + 1 = -1$$
    *   **Explanation**: The alternating sum is $-1$. Is $-1$ divisible by 11? No, because $-1$ is not a multiple of 11 (the multiples of 11 are ..., -22, -11, 0, 11, 22, ...).
    *   **Result**: $1,408,824$ **is NOT divisible by 11**.

**Final Answer**: The number $1,408,824$ is divisible by **4 and 8**, but **not by 11**.

**Reflection**: The rule for 8 required a small mental calculation, but it was still faster than long division. The alternating sum for 11 needs careful tracking of signs.

---

### Example 3: Applying the rule for 7 multiple times

**Problem**: Determine if the number $10,563$ is divisible by 7.

**Given**: The number $N = 10,563$.
**Want**: To check divisibility by 7.

**Solution**:

1.  **First application of the rule for 7**:
    *   **Rule**: Remove the last digit, double it, and subtract from the remaining number.
    *   **Step**:
        *   Original number: $10,563$.
        *   Last digit: $3$.
        *   Remaining number: $1056$.
        *   Double the last digit: $3 \times 2 = 6$.
        *   Subtract: $1056 - 6 = 1050$.
    *   **Explanation**: We have reduced the problem to checking if $1050$ is divisible by 7. Since $1050$ is still a large number, we repeat the process.

2.  **Second application of the rule for 7**:
    *   **Step**:
        *   Current number: $1050$.
        *   Last digit: $0$.
        *   Remaining number: $105$.
        *   Double the last digit: $0 \times 2 = 0$.
        *   Subtract: $105 - 0 = 105$.
    *   **Explanation**: We have reduced the problem to checking if $105$ is divisible by 7. We can repeat the process one more time.

3.  **Third application of the rule for 7**:
    *   **Step**:
        *   Current number: $105$.
        *   Last digit: $5$.
        *   Remaining number: $10$.
        *   Double the last digit: $5 \times 2 = 10$.
        *   Subtract: $10 - 10 = 0$.
    *   **Explanation**: The result is $0$. $0$ is divisible by 7 ($0 \div 7 = 0$).
    *   **Result**: Since the final result is divisible by 7, the original number $10,563$ **is divisible by 7**.

**Final Answer**: The number $10,563$ **is divisible by 7**.

**Reflection**: The rule for 7 often requires multiple iterations, which can be a bit tedious but is systematic. Recognizing that $0$ is divisible by any non-zero integer is important.

---

### Example 4: Finding a missing digit using divisibility rules

**Problem**: The number $5x8$ is a three-digit number where $x$ is the middle digit. If $5x8$ is divisible by both 3 and 4, find the possible values for $x$.

**Given**: The number $N = 5x8$. $N$ is divisible by 3 and 4.
**Want**: To find the possible values for the digit $x$.

**Solution**:

Since $N$ must be divisible by both 3 and 4, we apply each rule separately.

1.  **Divisibility by 4**:
    *   **Rule**: A number is divisible by 4 if the number formed by its last two digits is divisible by 4.
    *   **Step**: The last two digits of $5x8$ form the number $x8$.
    *   **Explanation**: We need $x8$ to be a multiple of 4. Let's list two-digit numbers ending in 8 that are multiples of 4:
        *   $08$ (if $x=0$) is $2 \times 4$.
        *   $28$ (if $x=2$) is $7 \times 4$.
        *   $48$ (if $x=4$) is $12 \times 4$.
        *   $68$ (if $x=6$) is $17 \times 4$.
        *   $88$ (if $x=8$) is $22 \times 4$.
        The possible values for $x$ based on divisibility by 4 are $0, 2, 4, 6, 8$.

2.  **Divisibility by 3**:
    *   **Rule**: A number is divisible by 3 if the sum of its digits is divisible by 3.
    *   **Step**: The digits of $5x8$ are $5, x, 8$.
        Calculate the sum of digits: $5 + x + 8 = 13 + x$.
    *   **Explanation**: We need $13 + x$ to be a multiple of 3. Since $x$ is a single digit, $x$ can be any integer from 0 to 9. Let's test values for $x$:
        *   If $x=0$, $13+0=13$ (not divisible by 3).
        *   If $x=1$, $13+1=14$ (not divisible by 3).
        *   If $x=2$, $13+2=15$ (divisible by 3). So $x=2$ is a possibility.
        *   If $x=3$, $13+3=16$ (not divisible by 3).
        *   If $x=4$, $13+4=17$ (not divisible by 3).
        *   If $x=5$, $13+5=18$ (divisible by 3). So $x=5$ is a possibility.
        *   If $x=6$, $13+6=19$ (not divisible by 3).
        *   If $x=7$, $13+7=20$ (not divisible by 3).
        *   If $x=8$, $13+8=21$ (divisible by 3). So $x=8$ is a possibility.
        *   If $x=9$, $13+9=22$ (not divisible by 3).
        The possible values for $x$ based on divisibility by 3 are $2, 5, 8$.

3.  **Combine the conditions**:
    *   For $5x8$ to be divisible by *both* 3 and 4, $x$ must satisfy both sets of conditions.
    *   Values for $x$ (from rule for 4): $\{0, 2, 4, 6, 8\}$
    *   Values for $x$ (from rule for 3): $\{2, 5, 8\}$
    *   The values common to both sets are the intersection: $\{2, 8\}$.

**Final Answer**: The possible values for $x$ are $\boxed{2, 8}$.

**Reflection**: This example shows how divisibility rules can be used to solve problems involving unknown digits. It requires systematic application of each rule and then finding the common values that satisfy all conditions.

---

## 6. Common mistakes and traps

Students often encounter specific pitfalls when working with divisibility rules. Being aware of these can help avoid errors:

1.  **Confusing "sum of digits" with "last digit" rules**: A frequent error is applying the sum-of-digits rule (for 3 and 9) to numbers like 2, 5, or 10, or vice-versa. For example, thinking 12 is divisible by 5 because $1+2=3$ (which is not 0 or 5).
2.  **Incomplete check for combined rules (especially 6)**: For a number to be divisible by 6, it *must* be divisible by *both* 2 and 3. Students sometimes check only one condition (e.g., "it ends in an even number, so it's divisible by 6") and forget the other.
3.  **Arithmetic errors in sums or alternating sums**: Simple addition or subtraction mistakes when calculating the sum of digits (for 3, 9) or the alternating sum (for 11) can lead to incorrect conclusions. Double-checking these calculations is crucial.
4.  **Misinterpreting "last two/three digits"**: For rules like 4 and 8, the rule applies to the *number formed by* the last two or three digits, not just the digits themselves. For example, for 107, the last two digits form 07 (which is 7), not 70.
5.  **Incorrect starting point or operation for rule of 11**: Many students struggle with the alternating sum for 11, often starting from the leftmost digit, or incorrectly alternating between addition and subtraction (e.g., adding the first, then subtracting the second, etc., instead of starting with the rightmost as positive). Remember: rightmost digit is positive, then subtract, add, subtract, etc.
6.  **Not iterating the rule for 7 sufficiently**: The rule for 7 often requires repeating the "double and subtract" process multiple times until a small, easily recognizable multiple of 7 (or 0) is obtained. Stopping too early is a common mistake.

## 7. Textbook-precise explanation

In formal number theory, divisibility is defined rigorously, and the rules are derived using modular arithmetic and properties of integer representation.

**Definition**: An integer $a$ is said to **divide** an integer $b$, denoted $a|b$, if there exists an integer $k$ such that $b = ak$. If $a|b$, we also say that $b$ is a multiple of $a$, or $a$ is a divisor (or factor) of $b$.

Let $N$ be a positive integer. We can express $N$ in base 10 using its digits $d_n, d_{n-1}, \dots, d_1, d_0$ as:
$$N = d_n 10^n + d_{n-1} 10^{n-1} + \dots + d_1 10^1 + d_0 10^0$$
where $d_i \in \{0, 1, \dots, 9\}$.

**Divisibility Rules (Formal Statements and Proof Outlines)**:

1.  **Rule for 2, 5, 10**: $N$ is divisible by $m \in \{2, 5, 10\}$ if and only if its last digit, $d_0$, is divisible by $m$.
    *   **Proof**: We write $N = 10 \cdot (d_n 10^{n-1} + \dots + d_1) + d_0$. Let $K = d_n 10^{n-1} + \dots + d_1$. Then $N = 10K + d_0$.
        Since $10 \equiv 0 \pmod 2$, $10 \equiv 0 \pmod 5$, and $10 \equiv 0 \pmod{10}$, it follows that $10K \equiv 0 \pmod m$ for $m \in \{2, 5, 10\}$.
        Therefore, $N \equiv d_0 \pmod m$. This means $N$ is divisible by $m$ if and only if $d_0$ is divisible by $m$.

2.  **Rule for 4**: $N$ is divisible by 4 if and only if the number formed by its last two digits, $10d_1 + d_0$, is divisible by 4.
    *   **Proof**: We write $N = 100 \cdot (d_n 10^{n-2} + \dots + d_2) + (10d_1 + d_0)$. Let $K' = d_n 10^{n-2} + \dots + d_2$. Then $N = 100K' + (10d_1 + d_0)$.
        Since $100 = 4 \times 25$, we have $100 \equiv 0 \pmod 4$. Thus, $100K' \equiv 0 \pmod 4$.
        Therefore, $N \equiv (10d_1 + d_0) \pmod 4$. This means $N$ is divisible by 4 if and only if $10d_1 + d_0$ is divisible by 4.

3.  **Rule for 8**: $N$ is divisible by 8 if and only if the number formed by its last three digits, $100d_2 + 10d_1 + d_0$, is divisible by 8.
    *   **Proof**: We write $N = 1000 \cdot (d_n 10^{n-3} + \dots + d_3) + (100d_2 + 10d_1 + d_0)$. Let $K'' = d_n 10^{n-3} + \dots + d_3$. Then $N = 1000K'' + (100d_2 + 10d_1 + d_0)$.
        Since $1000 = 8 \times 125$, we have $1000 \equiv 0 \pmod 8$. Thus, $1000K'' \equiv 0 \pmod 8$.
        Therefore, $N \equiv (100d_2 + 10d_1 + d_0) \pmod 8$. This means $N$ is divisible by 8 if and only if $100d_2 + 10d_1 + d_0$ is divisible by 8.

4.  **Rule for 3, 9**: $N$ is divisible by $m \in \{3, 9\}$ if and only if the sum of its digits, $\sum_{i=0}^n d_i$, is divisible by $m$.
    *   **Proof**: We use the property that $10 \equiv 1 \pmod 3$ and $10 \equiv 1 \pmod 9$.
        Thus, $10^k \equiv 1^k \equiv 1 \pmod m$ for $m \in \{3, 9\}$ and any non-negative integer $k$.
        Substituting this into the expression for $N$:
        $$N = d_n 10^n + \dots + d_1 10^1 + d_0 10^0$$
        $$N \equiv d_n (1) + \dots + d_1 (1) + d_0 (1) \pmod m$$
        $$N \equiv \sum_{i=0}^n d_i \pmod m$$
        Therefore, $N$ is divisible by $m$ if and only if $\sum_{i=0}^n d_i$ is divisible by $m$.

5.  **Rule for 6**: $N$ is divisible by 6 if and only if $N$ is divisible by both 2 and 3.
    *   **Proof**: This follows from the property that if $a|N$ and $b|N$, and $\text{gcd}(a,b)=1$, then $ab|N$. Since $\text{gcd}(2,3)=1$, if $2|N$ and $3|N$, then $(2 \times 3)|N$, which means $6|N$. Conversely, if $6|N$, then $N=6k=2(3k)$ so $2|N$, and $N=6k=3(2k)$ so $3|N$.

6.  **Rule for 11**: $N$ is divisible by 11 if and only if the alternating sum of its digits, $d_0 - d_1 + d_2 - d_3 + \dots + (-1)^n d_n$, is divisible by 11.
    *   **Proof**: We use the property that $10 \equiv -1 \pmod{11}$.
        Thus, $10^k \equiv (-1)^k \pmod{11}$ for any non-negative integer $k$.
        Substituting this into the expression for $N$:
        $$N = d_n 10^n + d_{n-1} 10^{n-1} + \dots + d_1 10^1 + d_0 10^0$$
        $$N \equiv d_n (-1)^n + d_{n-1} (-1)^{n-1} + \dots + d_1 (-1)^1 + d_0 (-1)^0 \pmod{11}$$
        $$N \equiv d_0 - d_1 + d_2 - d_3 + \dots + (-1)^n d_n \pmod{11}$$
        Therefore, $N$ is divisible by 11 if and only if the alternating sum of its digits is divisible by 11.

7.  **Rule for 7**: Let $N = 10a + b$, where $b$ is the units digit and $a$ is the number formed by the remaining digits. Then $N$ is divisible by 7 if and only if $a - 2b$ is divisible by 7.
    *   **Proof**: As shown in Section 4, this proof involves manipulating the congruence $10a + b \equiv 0 \pmod 7$ by multiplying by $-2$, using the fact that $-20 \equiv 1 \pmod 7$. The reverse implication also holds.

These formal definitions and proofs can be found in standard number theory textbooks, such as:
*   **Burton, D. M. (2010). *Elementary Number Theory* (7th ed.). McGraw-Hill.** (See Chapter 3: Divisibility Theory)
*   **Rosen, K. H. (2011). *Elementary Number Theory and Its Applications* (6th ed.). Pearson.** (See Chapter 3: Divisibility and Modular Arithmetic)

## 8. ASCII diagrams

Let's visualize how the digits of a number are used for different divisibility rules. Consider a number $N = d_n d_{n-1} \dots d_3 d_2 d_1 d_0$.

```text
    N = d_n d_{n-1} ... d_3 d_2 d_1 d_0
        |                 |   |   |
        |                 |   |   +--- d_0 (Units Digit)
        |                 |   +------- d_1 (Tens Digit)
        |                 +----------- d_2 (Hundreds Digit)
        +----------------------------- d_n (Most Significant Digit)

Rule for 2, 5, 10: Focus on d_0
---------------------------------
    N = d_n d_{n-1} ... d_3 d_2 d_1 [d_0]
                                      ^
                                      Last digit must be 0, 2, 4, 6, 8 (for 2)
                                      Last digit must be 0, 5 (for 5)
                                      Last digit must be 0 (for 10)

Rule for 4: Focus on d_1 d_0 (the number formed by last two digits)
-------------------------------------------------------------------
    N = d_n d_{n-1} ... d_3 d_2 [d_1 d_0]
                                  ^^^^^
                                  Number formed by d_1 and d_0 must be divisible by 4.

Rule for 8: Focus on d_2 d_1 d_0 (the number formed by last three digits)
-------------------------------------------------------------------------
    N = d_n d_{n-1} ... d_3 [d_2 d_1 d_0]
                              ^^^^^^^^^
                              Number formed by d_2, d_1, d_0 must be divisible by 8.

Rule for 3, 9: Sum of ALL digits
---------------------------------
    N = d_n + d_{n-1} + ... + d_3 + d_2 + d_1 + d_0
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        Sum of all digits must be divisible by 3 (for 3) or 9 (for 9).

Rule for 11: Alternating Sum of digits (starting from right)
------------------------------------------------------------
    N = d_n d_{n-1} ... d_3 d_2 d_1 d_0
        +/-   -/+   ...   +/-   -/+   +
        Sum = d_0 - d_1 + d_2 - d_3 + ...
              ^^^^^^^^^^^^^^^^^^^^^^^^^^^
              Alternating sum must be divisible by 11.

Rule for 7: Iterative "double and subtract"
-------------------------------------------
    N = (Remaining digits) (Last digit)
        (      a        ) (      b     )
    New number to check = a - 2*b. Repeat until small.
```

## 9. Memory technique — never forget this

Divisibility rules are best remembered through a combination of mnemonics, understanding the underlying principles, and consistent practice.

1.  **A Specific Mnemonic/Visual Hook**:
    *   **2, 5, 10 (Last Digit)**: "The **End** tells the tale for **Two**, **Five**, and **Ten**." (Just look at the last digit).
    *   **4 (Last Two Digits)**: "For **Four**, check the **Final Pair**." (The number formed by the last two digits).
    *   **8 (Last Three Digits)**: "For **Eight**, examine the **Ending Trio**." (The number formed by the last three digits).
    *   **3, 9 (Sum of Digits)**: "For **Three** and **Nine**, **Sum the Line**." (Sum all digits).
    *   **6 (Both 2 and 3)**: "For **Six**, it's a **Double Fix**." (Must pass both 2 and 3).
    *   **7 (Double and Subtract)**: "For **Seven**, **Double-Deduct** the last, then test the rest." (Double the last digit, subtract from the remaining).
    *   **11 (Alternating Sum)**: "For **Eleven**, **Alternate Sum** from the **Right**." (Start + last digit, - next, + next...).

2.  **The 1-3 Formulas/Facts they MUST overlearn**:
    *   **For 3 and 9**: $N \equiv \sum d_i \pmod 3$ and $N \equiv \sum d_i \pmod 9$. (The number is congruent to the sum of its digits modulo 3 or 9).
    *   **For 11**: $N \equiv d_0 - d_1 + d_2 - d_3 + \dots \pmod{11}$. (The number is congruent to the alternating sum of its digits modulo 11, starting with the rightmost digit as positive).
    *   **For 7**: If $N = 10a + b$, then $N$ is divisible by 7 if and only if $a - 2b$ is divisible by 7.

3.  **Spaced-Repetition Schedule**:
    To truly embed these rules in long-term memory, follow this review schedule:
    *   **Day 1**: Immediately after learning.
    *   **Day 3**: Review again.
    *   **Day 7**: Review again.
    *   **Day 16**: Review again.
    *   **Day 35**: Final review.
    During each review, don't just recite the rules; work through a few examples for each rule.

4.  **The First-Principles Re-derivation Pathway**:
    If you ever forget a rule, you can rebuild it using modular arithmetic and the base-10 representation of numbers:
    *   **For 2, 5, 10 (Last Digit)**: Remember $N = 10K + d_0$. Since $10$ is a multiple of 2, 5, and 10, then $10K$ is also a multiple. So $N$ is divisible iff $d_0$ is.
    *   **For 4, 8 (Last Few Digits)**: Remember $N = 100K' + (10d_1+