## 1. What it is — in plain English

Imagine you have a big box of items, and you need to sort them into smaller bins quickly. To do this, you use a "sorting rule" (a hash function) that tells you which bin each item goes into. Normally, you'd pick one good sorting rule and stick with it.

But what if someone knows your sorting rule? They could deliberately give you items that all go into the *same* bin, making your sorting system slow and messy. This is like a "traffic jam" in one bin.

Universal hashing is a clever trick to prevent this. Instead of having just one fixed sorting rule, you have a whole "recipe book" of many different sorting rules. When you start sorting, you *randomly pick one rule* from this book. You don't tell anyone which rule you picked.

The "magic" of this recipe book is that it's designed so that, no matter which two items you pick, only a tiny fraction of the rules in the book will make those two specific items land in the same bin. Because you pick a rule randomly, the chance of picking a rule that causes many collisions for *any* given set of items becomes very, very small. This gives you a strong *probabilistic guarantee* that your sorting system will perform well on average, even against a malicious attacker.

## 2. Why it matters — real-world applications

Universal hashing is crucial in scenarios where unpredictable data or malicious attacks can degrade performance. It ensures robust, average-case performance for hash-based data structures.

1.  **Network Security and DDoS Prevention:** Imagine a web server that uses hash tables to keep track of active connections or user sessions. If an attacker knows the hash function, they could send a flood of requests (a Distributed Denial of Service, DDoS, attack) where all request IDs hash to the same bucket. This would overload a single part of the hash table, slowing down or crashing the server. By using universal hashing, the server picks a random hash function for each session or over short periods, making it impossible for the attacker to predict which requests will collide. This ensures that connection lookups remain fast on average.

2.  **Large-scale Distributed Systems (e.g., Apache Cassandra, DynamoDB):** These databases distribute data across many servers using hashing. When a new piece of data arrives, a hash function determines which server it should go to. If the hash function isn't robust, data might unevenly distribute, leading to "hot spots" (servers with too much data) and performance bottlenecks. While consistent hashing handles server additions/removals, universal hashing ensures the underlying data distribution across the *initial* set of servers is good, preventing an attacker or even just "unlucky" data patterns from creating performance issues.

3.  **Machine Learning - Feature Hashing (Hashing Trick):** In machine learning, especially with text or categorical data, you often have a huge number of potential features (e.g., words in a vocabulary). Creating a separate dimension for each feature can lead to extremely high-dimensional, sparse data. Feature hashing maps these high-dimensional features into a lower-dimensional space using a hash function. Universal hashing ensures that, on average, the number of collisions (different features mapping to the same dimension) is minimized, preserving information and allowing the model to learn effectively without needing to store a large mapping table.

4.  **Operating Systems - Caching and Memory Management:** Operating systems use hash tables for various tasks, like managing page tables or file system caches. For example, a file system might hash file paths to quickly locate files in a cache. Universal hashing guarantees that these lookups remain efficient, preventing specific file access patterns from degrading system performance by causing excessive collisions. This is vital for maintaining system responsiveness and stability under diverse workloads.

## 3. Prerequisites — what you must know first

Before diving deep into universal hashing, ensure you have a solid grasp of these fundamental concepts:

*   **Hashing:** The general idea of mapping keys (data) to indices (slots) in a fixed-size array (hash table).
*   **Hash Function:** A function that performs the mapping from keys to indices.
*   **Hash Table:** A data structure that uses a hash function to map keys to an array of buckets or slots.
*   **Collision:** When two different keys map to the same index in a hash table.
*   **Collision Resolution:** Techniques to handle collisions, such as **chaining** (each slot stores a linked list of colliding items) or **open addressing** (probing for the next available slot).
*   **Modular Arithmetic:** Operations involving the remainder after division (e.g., $x \pmod m$). Essential for mapping hash values to table indices.
*   **Probability:** Basic concepts like sample space, events, probability of an event, conditional probability.
*   **Expected Value:** The average outcome of a random variable, often calculated using $E[X] = \sum x \cdot P(X=x)$.
*   **Indicator Random Variables:** A random variable that takes value 1 if an event occurs and 0 otherwise. Very useful for calculating expected values.
*   **Linearity of Expectation:** $E[X+Y] = E[X] + E[Y]$, even if $X$ and $Y$ are not independent. This is a powerful tool.
*   **Prime Numbers:** Their properties are often leveraged in the design of hash functions and universal families to ensure good distribution.
*   **Big O Notation:** For analyzing the average-case and worst-case time complexity of algorithms and data structures.

## 4. The core idea — step by step

Let's break down the concept of universal hashing step by step, building intuition along the way.

### Step 1: The Problem with a Single, Fixed Hash Function

*   **Plain-English Statement:** If you always use the same hash function, an intelligent adversary can figure out how to make all your data items collide, slowing your system down dramatically. It's like having a secret code that's not so secret if everyone knows you always use the same one.

*   **Small Concrete Example:** Imagine a hash table of size $m=10$. Your fixed hash function is $h(k) = k \pmod{10}$. If an attacker knows this, they can insert keys like $10, 20, 30, 40, \dots$. All these keys hash to index $0$. If you use chaining, all items will end up in the linked list at index $0$, making lookups $O(N)$ instead of $O(1)$.

*   **Formal/Mathematical Version:** Let $U$ be the universe of all possible keys, and $h: U \to \{0, 1, \dots, m-1\}$ be a single, fixed hash function. If an adversary knows $h$, they can choose a set $S \subset U$ of $N$ keys such that for all $k \in S$, $h(k) = i$ for some fixed index $i$. This leads to a worst-case scenario where all $N$ items map to the same bucket.

*   **What Could Go Wrong:** The worst-case performance of a hash table with a fixed hash function is $O(N)$ for insertions, deletions, and lookups, where $N$ is the number of items currently stored. This happens if all keys hash to the same slot. This worst-case can be intentionally triggered by an adversary or unintentionally by unlucky data patterns.

### Step 2: Introducing a Family of Hash Functions

*   **Plain-English Statement:** Instead of having just one hash function, we have a whole collection, or "family," of different hash functions. Think of it as a playbook with many different strategies.

*   **Small Concrete Example:** Our "playbook" $\mathcal{H}$ might contain three hash functions for $m=10$:
    *   $h_1(k) = k \pmod{10}$
    *   $h_2(k) = (2k+1) \pmod{10}$
    *   $h_3(k) = (3k+7) \pmod{10}$
    Now, when we need to hash, we don't just use $h_1$. We choose one from $\{h_1, h_2, h_3\}$.

*   **Formal/Mathematical Version:** We define a set $\mathcal{H} = \{h_1, h_2, \dots, h_k\}$ where each $h_j: U \to \{0, 1, \dots, m-1\}$ is a distinct hash function.

*   **What Could Go Wrong:** Just having a family isn't enough. If all functions in the family are "bad" (e.g., they all cause collisions for the same set of keys), then we haven't solved the problem. The family itself needs to have a special property.

### Step 3: Random Selection

*   **Plain-English Statement:** Before we start hashing any data, we *randomly pick one* hash function from our family. This choice is made secretly and is not revealed to any potential attacker.

*   **Small Concrete Example:** Before inserting any items, we roll a die. If it's a 1 or 2, we pick $h_1$. If it's a 3 or 4, we pick $h_2$. If it's a 5 or 6, we pick $h_3$. We then use *only that chosen function* for all operations until we decide to change it (which is usually never, for a given hash table instance).

*   **Formal/Mathematical Version:** At the beginning of the hash table's lifetime, we choose a hash function $h \in \mathcal{H}$ uniformly at random. This chosen $h$ is then used for all subsequent hashing operations (insertions, deletions, lookups) on that particular hash table instance. The randomness is in the *selection of the function*, not in the keys themselves.

*   **What Could Go Wrong:** If the random selection isn't truly uniform, or if the "randomness" is predictable, an attacker could still exploit it. The critical point is that the adversary *does not know* which function was chosen.

### Step 4: The Universal Property

*   **Plain-English Statement:** The "magic" property of a good family of hash functions (a "universal family") is this: for *any two different keys* you can pick, only a very small fraction of the hash functions in the family will cause those two specific keys to collide.

*   **Small Concrete Example:** Let's say our family $\mathcal{H}$ has 100 hash functions. If it's a universal family for $m=10$ (table size), then for *any* two distinct keys $x$ and $y$, at most $100/10 = 10$ of the functions in $\mathcal{H}$ will map $x$ and $y$ to the same bucket. The other 90 functions will map them to different buckets.

*   **Formal/Mathematical Version:** A family of hash functions $\mathcal{H}$ mapping keys from $U$ to $\{0, \dots, m-1\}$ is called **universal** if for any two distinct keys $x, y \in U$, the number of hash functions $h \in \mathcal{H}$ such that $h(x) = h(y)$ is at most $|\mathcal{H}|/m$.
    This can also be stated probabilistically: if $h$ is chosen uniformly at random from $\mathcal{H}$, then for any distinct $x, y \in U$,
    $$P(h(x) = h(y)) \le \frac{1}{m}$$

*   **What Could Go Wrong:** Designing such a family is non-trivial. A poorly designed family might not satisfy this property, meaning many functions could cause collisions for specific pairs of keys, defeating the purpose.

### Step 5: The Probabilistic Guarantee (Expected Collisions)

*   **Plain-English Statement:** Because we picked a hash function randomly from a universal family, we can guarantee that, *on average*, the number of collisions for any given key will be very small, even if the data itself is chosen maliciously. This means the hash table will perform efficiently most of the time.

*   **Small Concrete Example:** If you have a hash table with $N$ items already in it and you want to insert a new item, say $x$. We want to know how many items already in the table will collide with $x$. If we picked our hash function from a universal family, the *expected* number of collisions for $x$ will be roughly $N/m$. If $N$ is proportional to $m$ (i.e., the load factor $\alpha = N/m$ is a constant), then the expected number of collisions is a constant. This means operations are $O(1)$ on average.

*   **Formal/Mathematical Version:** Let $h$ be chosen uniformly at random from a universal family $\mathcal{H}$. Let $S$ be a set of $N$ keys already in the hash table. For any key $x \notin S$, the expected number of collisions that $x$ experiences with keys in $S$ is:
    $$E[\text{collisions for } x] = E\left[\sum_{y \in S} I(h(x)=h(y))\right]$$
    where $I(h(x)=h(y))$ is an indicator random variable that is 1 if $h(x)=h(y)$ and 0 otherwise.
    By linearity of expectation:
    $$E[\text{collisions for } x] = \sum_{y \in S} E[I(h(x)=h(y))] = \sum_{y \in S} P(h(x)=h(y))$$
    Since $\mathcal{H}$ is universal, $P(h(x)=h(y)) \le 1/m$ for $x \ne y$.
    $$E[\text{collisions for } x] \le \sum_{y \in S} \frac{1}{m} = \frac{N}{m}$$
    Thus, the expected number of collisions for any key is at most the load factor $\alpha = N/m$. If we use chaining, the expected time for a lookup or insertion is $O(1 + N/m)$.

*   **What Could Go Wrong:** This is an *expected* guarantee, not a worst-case guarantee for a *single run*. In any specific run, it's *possible* (though unlikely) to pick a hash function that leads to many collisions. However, over many runs or with many different sets of data, the average performance will be good. It doesn't prevent all collisions, it just makes them unlikely on average.

### Step 6: A Concrete Universal Family (Example: The $(a,b)$ Family)

*   **Plain-English Statement:** How do we actually build one of these "recipe books" of hash functions? A common way involves picking a large prime number and using simple arithmetic operations, combined with random coefficients.

*   **Small Concrete Example:** Let $p$ be a prime number larger than any possible key (e.g., $p=101$). Let $m$ be the size of our hash table (e.g., $m=10$). We pick two random numbers, $a$ and $b$, where $a$ is between $1$ and $p-1$ (inclusive) and $b$ is between $0$ and $p-1$ (inclusive). Our hash function for a key $k$ is then:
    1.  Multiply $k$ by $a$ and add $b$.
    2.  Take the result modulo $p$. This keeps the number within a manageable range.
    3.  Take *that* result modulo $m$. This maps it to a bucket in our hash table.
    So, if $a=3, b=5$, and key $k=20$:
    $h_{3,5}(20) = ((3 \times 20 + 5) \pmod{101}) \pmod{10}$
    $= ((60 + 5) \pmod{101}) \pmod{10}$
    $= (65 \pmod{101}) \pmod{10}$
    $= 65 \pmod{10}$
    $= 5$.
    So, key $20$ goes to bucket $5$. If we picked $a=7, b=1$:
    $h_{7,1}(20) = ((7 \times 20 + 1) \pmod{101}) \pmod{10}$
    $= ((140 + 1) \pmod{101}) \pmod{10}$
    $= (141 \pmod{101}) \pmod{10}$
    $= 40 \pmod{10}$
    $= 0$.
    Key $20$ goes to bucket $0$. Notice how different choices of $a,b$ lead to different hash values for the same key.

*   **Formal/Mathematical Version:** Let $p$ be a prime number such that $p \ge |U|$ (or at least $p$ is larger than any key we expect). Let $m$ be the size of the hash table. The universal hash family $\mathcal{H}_{p,m}$ consists of hash functions $h_{a,b}$ of the form:
    $$h_{a,b}(k) = ((ak + b) \pmod p) \pmod m$$
    where $a \in \{1, 2, \dots, p-1\}$ and $b \in \{0, 1, \dots, p-1\}$.
    There are $p(p-1)$ such hash functions in this family. This family is proven to be universal.

*   **What Could Go Wrong:** Choosing $p$ too small could lead to issues. $p$ should be a prime number significantly larger than the maximum possible key value to ensure good distribution. If $p$ is too small, different keys might map to the same value after the first modulo operation, reducing the effectiveness of the family. The choice of $m$ (table size) is also important as it dictates the load factor and thus the expected number of collisions.

## 5. Worked examples — multiple, with every step shown

### Example 1 (Easy): Verifying a Collision for Specific Hash Functions

**Problem:**
Consider a small universal hash family $\mathcal{H} = \{h_1, h_2, h_3\}$ for a hash table of size $m=5$. The functions are:
$h_1(k) = k \pmod 5$
$h_2(k) = (k+1) \pmod 5$
$h_3(k) = (k+2) \pmod 5$
Given two distinct keys $x=3$ and $y=8$, determine for which functions in $\mathcal{H}$ they collide.

**Given:**
*   Keys: $x=3$, $y=8$
*   Hash table size: $m=5$
*   Hash family: $\mathcal{H} = \{h_1, h_2, h_3\}$

**Wanted:**
Identify $h \in \mathcal{H}$ such that $h(3) = h(8)$.

**Solution:**

**Step 1: Evaluate $h_1(3)$ and $h_1(8)$**
$$h_1(3) = 3 \pmod 5 = 3$$
*This calculates the hash value for key 3 using $h_1$.*
$$h_1(8) = 8 \pmod 5 = 3$$
*This calculates the hash value for key 8 using $h_1$.*
Since $h_1(3) = 3$ and $h_1(8) = 3$, they collide.

**Step 2: Evaluate $h_2(3)$ and $h_2(8)$**
$$h_2(3) = (3+1) \pmod 5 = 4 \pmod 5 = 4$$
*This calculates the hash value for key 3 using $h_2$.*
$$h_2(8) = (8+1) \pmod 5 = 9 \pmod 5 = 4$$
*This calculates the hash value for key 8 using $h_2$.*
Since $h_2(3) = 4$ and $h_2(8) = 4$, they collide.

**Step 3: Evaluate $h_3(3)$ and $h_3(8)$**
$$h_3(3) = (3+2) \pmod 5 = 5 \pmod 5 = 0$$
*This calculates the hash value for key 3 using $h_3$.*
$$h_3(8) = (8+2) \pmod 5 = 10 \pmod 5 = 0$$
*This calculates the hash value for key 8 using $h_3$.*
Since $h_3(3) = 0$ and $h_3(8) = 0$, they collide.

**Final Answer:**
Keys $x=3$ and $y=8$ collide for all functions in the family: $\mathbf{h_1, h_2, h_3}$.

**Reflection:**
This example shows that even a universal family can have functions that cause collisions for specific pairs. The key is that the *fraction* of such functions is small relative to the total number of functions in the family. In this case, 3 out of 3 functions caused a collision. This family might not be truly universal according to the strict definition $P(h(x)=h(y)) \le 1/m = 1/5$, as $3/3 = 1 > 1/5$. This example highlights the importance of using a *properly constructed* universal family, like the $(a,b)$ family, which guarantees the property.

---

### Example 2 (Medium): Using the $(a,b)$ Universal Family

**Problem:**
A hash table has size $m=7$. We use the universal hash family $h_{a,b}(k) = ((ak+b) \pmod{11}) \pmod 7$.
Suppose we randomly choose $a=3$ and $b=5$. Calculate the hash values for keys $k_1=15$ and $k_2=26$.

**Given:**
*   Hash table size: $m=7$
*   Prime $p=11$
*   Chosen coefficients: $a=3$, $b=5$
*   Keys: $k_1=15$, $k_2=26$
*   Hash function form: $h_{a,b}(k) = ((ak+b) \pmod p) \pmod m$

**Wanted:**
$h_{3,5}(15)$ and $h_{3,5}(26)$.

**Solution:**

**Step 1: Calculate $h_{3,5}(15)$**
$$h_{3,5}(15) = ((3 \cdot 15 + 5) \pmod{11}) \pmod 7$$
*This is the general formula for the hash function with the given $a, b, k$.*
$$h_{3,5}(15) = ((45 + 5) \pmod{11}) \pmod 7$$
*First, perform the multiplication and addition inside the innermost parentheses.*
$$h_{3,5}(15) = (50 \pmod{11}) \pmod 7$$
*Next, calculate the first modulo operation.*
To find $50 \pmod{11}$: $50 = 4 \times 11 + 6$, so $50 \pmod{11} = 6$.
$$h_{3,5}(15) = 6 \pmod 7$$
*Now, calculate the second modulo operation.*
$$h_{3,5}(15) = 6$$
*The final hash value for $k_1=15$ is 6.*

**Step 2: Calculate $h_{3,5}(26)$**
$$h_{3,5}(26) = ((3 \cdot 26 + 5) \pmod{11}) \pmod 7$$
*This is the general formula for the hash function with the given $a, b, k$.*
$$h_{3,5}(26) = ((78 + 5) \pmod{11}) \pmod 7$$
*First, perform the multiplication and addition inside the innermost parentheses.*
$$h_{3,5}(26) = (83 \pmod{11}) \pmod 7$$
*Next, calculate the first modulo operation.*
To find $83 \pmod{11}$: $83 = 7 \times 11 + 6$, so $83 \pmod{11} = 6$.
$$h_{3,5}(26) = 6 \pmod 7$$
*Now, calculate the second modulo operation.*
$$h_{3,5}(26) = 6$$
*The final hash value for $k_2=26$ is 6.*

**Final Answer:**
$h_{3,5}(15) = \mathbf{6}$
$h_{3,5}(26) = \mathbf{6}$

**Reflection:**
In this specific instance, even with a universal hash function, keys $15$ and $26$ hash to the same bucket (a collision occurred). This is perfectly normal; universal hashing doesn't *prevent* collisions, it merely ensures that the *probability* of any two distinct keys colliding is low (at most $1/m$), and thus the *expected* number of collisions is low. The specific choice of $a$ and $b$ matters. If we chose different $a, b$, these keys might not collide.

---

### Example 3 (Harder): Probability of Collision for Two Keys

**Problem:**
Using the universal hash family $h_{a,b}(k) = ((ak+b) \pmod p) \pmod m$, where $p=13$ and $m=5$.
What is the probability that two distinct keys, $x=2$ and $y=7$, collide if $a$ and $b$ are chosen uniformly at random from their respective ranges ($a \in \{1, \dots, p-1\}$ and $b \in \{0, \dots, p-1\}$)?

**Given:**
*   Prime $p=13$
*   Hash table size: $m=5$
*   Keys: $x=2$, $y=7$
*   Hash family: $h_{a,b}(k) = ((ak+b) \pmod{13}) \pmod 5$
*   Ranges for $a, b$: $a \in \{1, \dots, 12\}$, $b \in \{0, \dots, 12\}$

**Wanted:**
$P(h_{a,b}(2) = h_{a,b}(7))$

**Solution:**

**Step 1: Understand the Universal Property**
For a universal family, the probability of collision for any two distinct keys $x, y$ is $P(h(x)=h(y)) \le 1/m$. We need to calculate this probability for the given $x, y$ and specific family.

**Step 2: Define intermediate values**
Let $h'_{a,b}(k) = (ak+b) \pmod p$.
Then $h_{a,b}(k) = h'_{a,b}(k) \pmod m$.
We are looking for $P(h'_{a,b}(x) \pmod m = h'_{a,b}(y) \pmod m)$.

**Step 3: Analyze the mapping of $h'_{a,b}(k)$**
For any distinct $x, y \in U$ and any $r_x, r_y \in \{0, \dots, p-1\}$, there is exactly one pair $(a,b)$ such that $a \in \{1, \dots, p-1\}$ and $b \in \{0, \dots, p-1\}$ for which:
$$ax+b \equiv r_x \pmod p$$
$$ay+b \equiv r_y \pmod p$$
Subtracting the first equation from the second:
$$a(y-x) \equiv r_y - r_x \pmod p$$
Since $x \ne y$, $(y-x) \not\equiv 0 \pmod p$. Because $p$ is prime, $(y-x)$ has a multiplicative inverse modulo $p$.
So, $a \equiv (r_y - r_x)(y-x)^{-1} \pmod p$.
Since $a \in \{1, \dots, p-1\}$, there is a unique $a$ for any given $r_x, r_y$ (unless $r_x=r_y$ and $a=0$, but $a$ must be non-zero). If $a$ is determined, $b$ is also uniquely determined: $b \equiv r_x - ax \pmod p$.
This means that as $(a,b)$ range over all $p(p-1)$ possible pairs, the pair $(h'_{a,b}(x), h'_{a,b}(y))$ takes on each of the $p(p-1)$ distinct pairs $(r_x, r_y)$ where $r_x \ne r_y$ exactly once.
If $r_x = r_y$, then $a(y-x) \equiv 0 \pmod p$. Since $y-x \not\equiv 0 \pmod p$ and $p$ is prime, this implies $a \equiv 0 \pmod p$. But $a \in \{1, \dots, p-1\}$, so $h'_{a,b}(x)$ and $h'_{a,b}(y)$ can *never* be equal for distinct $x,y$ with $a \ne 0$.
So, $h'_{a,b}(x) \ne h'_{a,b}(y)$ for all valid $(a,b)$ pairs.

**Step 4: Calculate the total number of $(a,b)$ pairs**
Number of choices for $a$: $p-1 = 13-1 = 12$.
Number of choices for $b$: $p = 13$.
Total number of distinct hash functions in the family: $(p-1)p = 12 \times 13 = 156$.

**Step 5: Identify colliding pairs $(r_x, r_y)$ for $h'_{a,b}(x)$ and $h'_{a,b}(y)$**
A collision $h_{a,b}(x) = h_{a,b}(y)$ occurs if $h'_{a,b}(x) \pmod m = h'_{a,b}(y) \pmod m$.
Let $r_x = h'_{a,b}(x)$ and $r_y = h'_{a,b}(y)$. We know $r_x \ne r_y$.
We need $r_x \pmod m = r_y \pmod m$.
This means $r_x \equiv r_y \pmod m$.
This is equivalent to $r_x - r_y \equiv 0 \pmod m$, or $m$ divides $(r_x - r_y)$.

**Step 6: Count the number of $(r_x, r_y)$ pairs such that $r_x \pmod m = r_y \pmod m$ and $r_x \ne r_y$**
The values $r_x$ and $r_y$ can each take any value from $\{0, \dots, p-1\}$.
For a fixed $r_x \in \{0, \dots, p-1\}$, how many $r_y \in \{0, \dots, p-1\}$ satisfy $r_y \equiv r_x \pmod m$ and $r_y \ne r_x$?
The values $r_y$ that satisfy $r_y \equiv r_x \pmod m$ are $r_x, r_x+m, r_x+2m, \dots$.
The number of such values in $\{0, \dots, p-1\}$ is $\lfloor (p-1-r_x)/m \rfloor + 1$.
More simply, for each $r_x$, there are $\lceil p/m \rceil$ or $\lfloor p/m \rfloor$ values of $r_y$ that are congruent to $r_x \pmod m$.
Specifically, there are $p$ possible values for $r_x$, and $p$ possible values for $r_y$.
The pairs $(r_x, r_y)$ are uniformly distributed over $p(p-1)$ possibilities (where $r_x \ne r_y$).
The number of values in $\{0, \dots, p-1\}$ that map to a specific bucket $j \pmod m$ is $\lfloor (p-1-j)/m \rfloor + 1$.
Let $k_j = \text{count of } r \in \{0, \dots, p-1\} \text{ s.t. } r \pmod m = j$.
So, $\sum_{j=0}^{m-1} k_j = p$.
The number of pairs $(r_x, r_y)$ such that $r_x \pmod m = r_y \pmod m$ and $r_x \ne r_y$ is $\sum_{j=0}^{m-1} k_j(k_j-1)$.
For $p=13, m=5$:
$j=0: \{0, 5, 10\}$. $k_0 = 3$.
$j=1: \{1, 6, 11\}$. $k_1 = 3$.
$j=2: \{2, 7, 12\}$. $k_2 = 3$.
$j=3: \{3, 8\}$. $k_3 = 2$.
$j=4: \{4, 9\}$. $k_4 = 2$.
Check: $3+3+3+2+2 = 13 = p$. Correct.
Number of colliding pairs $(r_x, r_y)$ where $r_x \ne r_y$:
$k_0(k_0-1) = 3 \times 2 = 6$
$k_1(k_1-1) = 3 \times 2 = 6$
$k_2(k_2-1) = 3 \times 2 = 6$
$k_3(k_3-1) = 2 \times 1 = 2$
$k_4(k_4-1) = 2 \times 1 = 2$
Total number of $(r_x, r_y)$ pairs that result in a collision is $6+6+6+2+2 = 22$.

**Step 7: Calculate the probability of collision**
The total number of possible distinct $(r_x, r_y)$ pairs (i.e., $h'_{a,b}(x)$ and $h'_{a,b}(y)$ values) is $p(p-1) = 13 \times 12 = 156$.
The number of these pairs that cause a collision is 22.
The probability of collision for $x=2, y=7$ is the number of colliding $(a,b)$ pairs divided by the total number of $(a,b)$ pairs. This is equivalent to the number of colliding $(r_x, r_y)$ pairs divided by the total number of $(r_x, r_y)$ pairs.
$$P(h_{a,b}(x)=h_{a,b}(y)) = \frac{\text{Number of colliding } (r_x, r_y) \text{ pairs}}{\text{Total number of distinct } (r_x, r_y) \text{ pairs}}$$
$$P(h_{a,b}(x)=h_{a,b}(y)) = \frac{22}{156}$$
Simplify the fraction: $22/156 = 11/78$.

**Final Answer:**
The probability that keys $x=2$ and $y=7$ collide is $\mathbf{\frac{11}{78}}$.

**Reflection:**
Note that $11/78 \approx 0.141$. The universal property states $P(h(x)=h(y)) \le 1/m$. Here $1/m = 1/5 = 0.2$. Since $0.141 \le 0.2$, this specific family satisfies the universal property for these keys. This example demonstrates the detailed counting required to verify the universal property for a specific family and pair of keys. The key insight is that the mapping $(a,b) \to (h'_{a,b}(x), h'_{a,b}(y))$ is a bijection to pairs $(r_x, r_y)$ where $r_x \ne r_y$.

---

### Example 4 (Application): Expected Collisions for a New Item

**Problem:**
A hash table of size $m=100$ uses a hash function $h$ chosen randomly from a universal family. There are $N=250$ items currently stored in the table. What is the expected number of collisions that a new item $x$ (not currently in the table) will experience upon insertion? Assume chaining is used for collision resolution.

**Given:**
*   Hash table size: $m=100$
*   Number of items in table: $N=250$
*   Hash function $h$ chosen from a universal family.
*   New item: $x$

**Wanted:**
$E[\text{collisions for } x]$

**Solution:**

**Step 1: Define an indicator random variable for collisions**
Let $S = \{y_1, y_2, \dots, y_N\}$ be the set of $N$ items already in the hash table.
For each item $y_j \in S$, define an indicator random variable $C_j$:
$C_j = 1$ if $h(x) = h(y_j)$ (i.e., $x$ collides with $y_j$)
$C_j = 0$ if $h(x) \ne h(y_j)$

**Step 2: Express the total number of collisions as a sum of indicator variables**
The total number of collisions for $x$, let's call it $C_x$, is the sum of these indicator variables:
$$C_x = \sum_{j=1}^{N} C_j$$
*This means we count 1 for every item already in the table that collides with $x$.*

**Step 3: Apply linearity of expectation**
The expected number of collisions for $x$ is $E[C_x]$:
$$E[C_x] = E\left[\sum_{j=1}^{N} C_j\right]$$
By linearity of expectation, the expectation of a sum is the sum of expectations:
$$E[C_x] = \sum_{j=1}^{N} E[C_j]$$
*This is a powerful property: it holds even if the random variables $C_j$ are not independent.*

**Step 4: Calculate the expectation of a single indicator variable**
The expected value of an indicator random variable is simply the probability of the event it indicates:
$$E[C_j] = P(C_j = 1) = P(h(x) = h(y_j))$$
*This is the probability that the new item $x$ collides with a specific existing item $y_j$.*

**Step 5: Apply the universal property**
Since $h$ is chosen from a universal family and $x \ne y_j$ (because $x$ is not currently in the table), we know that:
$$P(h(x) = h(y_j)) \le \frac{1}{m}$$
*This is the core guarantee of universal hashing: the probability of any two distinct keys colliding is at most $1/m$.*

**Step 6: Substitute back and calculate the total expected collisions**
$$E[C_x] \le \sum_{j=1}^{N} \frac{1}{m}$$
*We sum this probability for each of the $N$ items already in the table.*
$$E[C_x] \le N \cdot \frac{1}{m}$$
$$E[C_x] \le \frac{N}{m}$$
Now, substitute the given values: $N=250$, $m=100$.
$$E[C_x] \le \frac{250}{100}$$
$$E[C_x] \le 2.5$$

**Final Answer:**
The expected number of collisions that a new item $x$ will experience upon insertion is at most $\mathbf{2.5}$.

**Reflection:**
This example demonstrates how the probabilistic guarantee of universal hashing translates into practical performance. An expected number of $2.5$ collisions means that, on average, inserting a new item will require probing or traversing a linked list of about $2.5$ items. This is a constant time operation, which is excellent performance for a hash table. The load factor $\alpha = N/m = 250/100 = 2.5$ directly relates to the expected number of collisions. This shows why keeping the load factor low is important for good hash table performance.

## 6. Common mistakes and traps

1.  **Confusing Universal Hashing with Cryptographic Hashing:** Students often think universal hashing provides cryptographic security. It does not. Universal hashing protects against *worst-case performance* from an adversary who knows the *data distribution*, but not the *hash function*. Cryptographic hashing (like SHA-256) is designed to be one-way, collision-resistant (hard to find *any* collision), and avalanche-effect-producing, making it suitable for security applications like digital signatures. Universal hashing only guarantees a *low probability* of collision for *any two specific keys*, and the hash function itself isn't secret in the long run, only its random selection.

2.  **Forgetting the Random Selection Step:** The "universal" property applies to the *family* of hash functions. The performance guarantee only holds if a function is chosen *uniformly at random* from this family. If you pick a function deterministically, or if the "randomness" is predictable, an adversary can still find keys that cause worst-case collisions for that specific function.

3.  **Misunderstanding "Probabilistic Guarantee":** Universal hashing provides an *average-case* performance guarantee (specifically, an expected number of collisions). It does *not* guarantee that every single operation will be fast, nor does it guarantee that no collisions will occur. In any given run, you might, by chance, pick a "bad" hash function from the universal family or encounter a set of keys that still collide frequently. The guarantee is statistical over the choice of hash function.

4.  **Not Understanding the Role of Prime Numbers:** In constructions like $h_{a,b}(k) = ((ak+b) \pmod p) \pmod m$, the prime $p$ is crucial. It ensures that $ak+b \pmod p$ distributes values uniformly over $\{0, \dots, p-1\}$ as $a$ and $b$ vary. If $p$ were composite, certain values might never be generated, or distributions could be skewed, breaking the universal property. $p$ should also be larger than the maximum possible key value.

5.  **Assuming Universal Hashing Prevents All Collisions:** Universal hashing aims to *minimize the expected number of collisions*, not eliminate them. Collisions are an inherent part of hashing when the key universe is larger than the hash table. The goal is to make collisions random and evenly distributed, avoiding "hot spots."

6.  **Incorrectly Applying Linearity of Expectation:** While linearity of expectation is powerful ($E[X+Y] = E[X] + E[Y]$), students sometimes misapply it or forget its conditions. It's important to remember it holds *always*, regardless of the independence of $X$ and $Y$. This is critical for deriving the expected number of collisions.

## 7. Textbook-precise explanation

A **universal hash family** is a collection of hash functions $\mathcal{H}$ with a specific probabilistic property. Let $U$ be the universe of all possible keys, and $m$ be the number of slots in a hash table. Each hash function $h \in \mathcal{H}$ maps keys from $U$ to the set of hash table indices $\{0, 1, \dots, m-1\}$.

A family $\mathcal{H}$ is said to be **universal** if for any two distinct keys $x, y \in U$, the number of hash functions $h \in \mathcal{H}$ for which $h(x) = h(y)$ is exactly $|\mathcal{H}|/m$ or less.
Formally:
$$ \forall x, y \in U, x \ne y: \quad |\{h \in \mathcal{H} \mid h(x) = h(y)\}| \le \frac{|\mathcal{H}|}{m} $$
Equivalently, if a hash function $h$ is chosen uniformly at random from $\mathcal{H}$, then for any distinct keys $x, y \in U$:
$$ P(h(x) = h(y)) \le \frac{1}{m} $$

The primary benefit of using a universal hash family is the **probabilistic guarantee** it provides for hash table performance.
**Theorem (Expected Collisions):**
Suppose a hash function $h$ is chosen uniformly at random from a universal hash family $\mathcal{H}$. Let $S$ be a set of $N$ keys currently stored in a hash table of size $m$. For any key $x \notin S$, the expected number of keys in $S$ that collide with $x$ (i.e., map to the same hash table slot as $x$) is at most $N/m$.
Let $C_x$ be the random variable representing the number of collisions for key $x$ with keys in $S$.
$$ E[C_x] \le \frac{N}{m} $$
**Proof Sketch:**
Let $S = \{y_1, y_2, \dots, y_N\}$. For each $y_j \in S$, define an indicator random variable $I_j$ such that $I_j = 1$ if $h(x) = h(y_j)$ and $I_j = 0$ otherwise.
The total number of collisions for $x$ is $C_x = \sum_{j=1}^{N} I_j$.
By linearity of expectation:
$$ E[C_x] = E\left[\sum_{j=1}^{N} I_j\right] = \sum_{j=1}^{N} E[I_j] $$
Since $I_j$ is an indicator variable, $E[I_j] = P(h(x) = h(y_j))$.
Because $h$ is chosen from a universal family and $x \ne y_j$, we have $P(h(x) = h(y_j)) \le 1/m$.
Therefore:
$$ E[C_x] \le \sum_{j=1}^{N} \frac{1}{m} = N \cdot \frac{1}{m} = \frac{N}{m} $$
This result implies that if chaining is used for collision resolution, the expected time for a search, insertion, or deletion operation in a hash table using a universally chosen hash function is $O(1 + N/m)$. If the load factor $\alpha = N/m$ is constant, then these operations take $O(1)$ expected time.

**A common construction for a universal hash family (Cormen et al., Introduction to Algorithms, 4e, §11.3.3):**
Let $p$ be a prime number such that $p > \max(U)$ (where $U$ is the universe of keys). Let $m$ be the size of the hash table.
The family $\mathcal{H}_{p,m}$ consists of hash functions $h_{a,b}$ of the form:
$$ h_{a,b}(k) = ((ak + b) \pmod p) \pmod m $$
where $a \in \{1, 2, \dots, p-1\}$ and $b \in \{0, 1, \dots, p-1\}$. There are $p(p-1)$ such hash functions in this family. This family $\mathcal{H}_{p,m}$ is a universal hash family.

## 8. ASCII diagrams

Here's a conceptual diagram illustrating how universal hashing works, contrasting it with a fixed hash function.

```text
Scenario 1: Fixed Hash Function (Vulnerable)
---------------------------------------------
+---------------------+
| Fixed Hash Function |
| h(k) = k mod 10     |
+---------------------+
          |
          v
+---------------------+
| Keys: 10, 20, 30, 40|
+---------------------+
          |
          v
+-------------------------------------------------------------+
| Hash Table (m=10)                                           |
|                                                             |
| [0] -> [10] -> [20] -> [30] -> [40] (All keys collide here) |
| [1] ->                                                      |
| [2] ->                                                      |
| ...                                                         |
| [9] ->                                                      |
+-------------------------------------------------------------+
Result: Worst-case performance (O(N) for operations) because adversary knows h.


Scenario 2: Universal Hashing (Robust)
--------------------------------------
+------------------------------------------------+
| Universal Hash Family H                        |
| (A "recipe book" of diverse hash functions)    |
| e.g., {h_1, h_2, h_3, ..., h_k}                |
+------------------------------------------------+
          |
          v (Randomly choose ONE function h from H)
          |
          v (Adversary does NOT know which h was chosen)
+-------------------------------------------------------------+
| Chosen Hash Function h_random (e.g., h_j from the family)   |
+-------------------------------------------------------------+
          |
          v
+---------------------+
| Keys: 10, 20, 30, 40|
+---------------------+
          |
          v
+-------------------------------------------------------------+
| Hash Table (m=10)                                           |
|                                                             |
| [0] -> [40]                                                 |
| [1] -> [10]                                                 |
| [2] ->                                                      |
| [3] ->                                                      |
| [4] -> [20]                                                 |
| [5] ->                                                      |
| [6] ->                                                      |
| [7] -> [30]                                                 |
| [8] ->                                                      |
| [9] ->                                                      |
+-------------------------------------------------------------+
Result: Expected O(1) performance for operations, as collisions are
        distributed randomly across the table, even for adversarial input.
        The adversary cannot predict which keys will collide.
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Think of "Universal Hashing" as a **"Secret Dice Roll" for your Hash Function**.
    *   **Universal** = You have a *universe* of options (many hash functions).
    *   **Hashing** = The process of mapping keys to slots.
    *   **Secret Dice Roll** = You *randomly* pick one hash function from your universe, and you keep that choice secret from anyone who might try to exploit your system. Because the choice is random and secret, no attacker can predict which function you're using, making it impossible for them to consistently cause collisions. This leads to a *probabilistic guarantee* of good performance.

2.  **1-3 Formulas/Facts to Overlearn:**
    *   **Definition of Universal Family:** For any distinct $x, y$, $P(h(x)=h(y)) \le 1/m$. (The probability of any two specific keys colliding is at most $1/m$).
    *   **Expected Collisions:** For a new item $x$ and $N$ items already in the table, $E[\text{collisions for } x] \le N/m$. (The expected number of collisions is at most the load factor).
    *   **The $(a,b)$ Family Construction:** $h_{a,b}(k) = ((ak+b) \pmod p) \pmod m$, where $p$ is a prime ($a \in [1, p-1], b \in [0, p-1]$). This is the practical way to build a universal family.

3.  **Spaced-Repetition Schedule:**
    *   Review the core concepts and formulas: **1 day** after learning.
    *   Review again, try a simple example: **3 days** after the first review.
    *   Review, compare with cryptographic hashing: **7 days** after the second review.
    *   Review, re-derive the expected collisions: **16 days** after the third review.
    *   Final review, connect to other data structures: **35 days** after the fourth review.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the formula for expected collisions, you can always rebuild it:
    *   **Start with the goal:** We want to find the expected number of collisions for a new key $x$ with $N$ keys $y_1, \dots, y_N$ already in the table.
    *   **Introduce indicator variables:** For each $y_j$, define $I_j = 1$ if $h(x)=h(y_j)$ and $0$ otherwise.
    *   **Sum the indicators:** Total collisions $C_x = \sum_{j=1}^N I_j$.
    *   **Apply Linearity of Expectation:** $E[C_x] = E[\sum I_j] = \sum E[I_j]$. (This is the crucial step that doesn't require independence).
    *   **Relate $E[I_j]$ to probability:** $E[I_j] = P(I_j=1) = P(h(x)=h(y_j))$.
    *   **Apply the Universal Property:** Since $h$ is from a universal family, $P(h(x)=h(y_j)) \le 1/m$.
    *   **Substitute and conclude:** $E[C_x] \le \sum_{j=1}^N (1/m) = N/m$.
    This pathway ensures you understand *why* the formula works, not just *what* it is.

## 10. Connections — what this leads to

Universal hashing is a foundational concept in randomized algorithms and data structures. It underpins many advanced techniques and provides a bridge to understanding more complex probabilistic guarantees.

*   **Perfect Hashing:** While universal hashing provides good *average-case* performance, perfect hashing aims for *worst-case O(1)* lookup time. For a *static* set of keys (keys that don't change after insertion), it's possible to construct a hash table with zero collisions. Universal hashing is often used as a component in two-level perfect hashing schemes, where a universal hash function maps keys to buckets, and then a *second* universal hash function (tailored to the size of each bucket) resolves collisions within that bucket perfectly.

*   **Bloom Filters:** These probabilistic data structures are used to test whether an element is a member of a set. They use *multiple independent hash functions* (often drawn from a universal family) to map an item to several positions in a bit array. Universal hashing ensures that these multiple hash functions behave "randomly" enough to minimize false positives.

*   **Cuckoo Hashing:** This is an advanced open-addressing scheme that guarantees *worst-case O(1)* lookup time. It uses multiple hash functions (typically two) from a universal family. An item can reside in one of the slots determined by its hash functions. If both slots are occupied, it "kicks out" an existing item, which then tries to find a new home. Universal hashing is essential for ensuring that items can usually find a place and that cycles (where items keep kicking each other out) are rare.

*   **Cryptographic Hashing (Contrast):** Understanding universal hashing helps highlight the distinct requirements for cryptographic hash functions. While both deal with mapping data to fixed-size outputs, universal hashing focuses on distributing keys to prevent *performance attacks*, whereas cryptographic hashing focuses on properties like collision resistance, pre-image resistance, and second pre-image resistance for *security applications*. They solve different problems with different guarantees.

*   **Randomized Algorithms:** Universal hashing is a prime example of a randomized algorithm. It uses randomness (in choosing the hash function) to achieve good average-case performance, even against adversarial inputs. This principle is fundamental to many other areas of computer science, from randomized quicksort to load balancing in distributed systems.

*   **Min-wise Independent Permutations:** These are families of hash functions that, when applied to a set, ensure that each element has an equal probability of being the minimum element in the hashed set. They are used in similarity detection algorithms (e.g., Jaccard similarity for document similarity) and sketching large datasets, where universal hashing principles are extended to ensure randomness properties over permutations.

## 11. Self-check questions

1.  Explain in your own words why using a single, fixed hash function can be problematic, and how universal hashing addresses this problem.
2.  Consider a hash table of size $m=10$. If you choose a hash function $h$ from a universal family, what is the maximum probability that two distinct keys, $x$ and $y$, will collide (i.e., $h(x) = h(y)$)?
3.  A hash table of size $m=200$ contains $N=300$ items. If a hash function is chosen from a universal family, what is the upper bound on the expected number of collisions a new item will encounter upon insertion? Show your steps.
4.  You are designing a hash table using the $(a,b)$ universal family: $h_{a,b}(k) = ((ak+b) \pmod p) \pmod m$. If your keys can be up to $10^9$ and your hash table size is $m=10^5$, suggest an appropriate prime number $p$ and explain why it's suitable.
5.  Discuss the key differences between universal hashing and cryptographic hashing. When would you use one over the other, and why?