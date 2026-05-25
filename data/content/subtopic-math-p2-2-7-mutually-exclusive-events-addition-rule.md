## What it is
Mutually exclusive events are outcomes that cannot happen at the same time. The addition rule states that if two events are mutually exclusive, the probability of either one occurring is simply the sum of their individual probabilities.

## Why it matters
In probability, complex systems are analyzed by breaking them down into simpler, non-overlapping cases. In aerospace engineering, a fault tree analysis calculates the probability of system failure by adding the probabilities of mutually exclusive catastrophic events (e.g., a rocket fails due to *either* a turbopump explosion *or* a guidance software crash). In quantum mechanics, a particle's state collapses into mutually exclusive eigenstates, whose individual probabilities must sum perfectly to $1$. 

## When to study it
You must already understand:
*   Basic probability concepts (sample space, events).
*   Fraction and decimal arithmetic.
*   Basic set theory notation (union $\cup$, intersection $\cap$).

If you do not know what a sample space is, or if the symbol $\cup$ is unfamiliar, return to fundamental probability and set theory before proceeding.

## How to study it (step by step)
1.  **Define the sample space:** Write out every possible outcome of an experiment. 
2.  **Define your events:** Group outcomes into Event $A$ and Event $B$.
3.  **Check for intersection:** Ask, "Is it physically possible for $A$ and $B$ to occur simultaneously?" If no, they are mutually exclusive.
4.  **Apply the rule:** Add the probabilities: $P(A \cup B) = P(A) + P(B)$.
5.  **Test the boundary:** Create a scenario where events *can* overlap (e.g., drawing a Red card and drawing a King). Attempting to use the simple addition rule here will yield the wrong answer, proving why mutual exclusivity is a strict requirement.

## Key ideas, with intuition

**Idea 1: "OR" translates to Addition (for disjoint sets)**
In probability, the word "OR" usually implies the union of sets ($\cup$). When you want the probability of $A$ *or* $B$ happening, you are expanding your winning conditions. More ways to win means a higher probability. You accumulate probability mass by adding.

**Idea 2: The Empty Intersection**
For mutually exclusive events, the intersection (the "AND" case, denoted $A \cap B$) is the empty set $\emptyset$. Therefore, the probability of them happening together is zero:
$$P(A \cap B) = 0$$

**Idea 3: The General Addition Rule**
The absolute, unbreakable rule for *any* two events is:
$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$
Intuition: If you add the probability of $A$ and the probability of $B$, you double-count the outcomes where they overlap. You must subtract the overlap $P(A \cap B)$ once to correct this. However, if the events are mutually exclusive, $P(A \cap B) = 0$, and the formula simplifies elegantly to $P(A) + P(B)$.

## Worked example
**Problem:** You roll a fair, standard 6-sided die. What is the probability of rolling a $2$ OR rolling an odd number?

**Step 1: Define the sample space ($S$)**
$$S = \{1, 2, 3, 4, 5, 6\}$$
Total outcomes = $6$.

**Step 2: Define the events and their probabilities**
Event $A$: Rolling a $2$. 
$$A = \{2\} \implies P(A) = \frac{1}{6}$$
Event $B$: Rolling an odd number.
$$B = \{1, 3, 5\} \implies P(B) = \frac{3}{6}$$

**Step 3: Check for mutual exclusivity**
Can a number be both $2$ and odd? No. The intersection $A \cap B = \emptyset$. The events are mutually exclusive.

**Step 4: Apply the addition rule**
$$P(A \cup B) = P(A) + P(B)$$
$$P(A \cup B) = \frac{1}{6} + \frac{3}{6} = \frac{4}{6} = \frac{2}{3}$$

**Reflection:** This worked because the sets of winning outcomes did not overlap. If we simply counted the winning outcomes in the sample space directly ($\{1, 2, 3, 5\}$), we see there are $4$ winning outcomes out of $6$. The addition rule perfectly matches the physical reality of the sets.

## Diagrams

```text
MUTUALLY EXCLUSIVE EVENTS (No Overlap)
+-----------------------------------------+
| Sample Space (S)                        |
|                                         |
|     *******               *******       |
|   **       **           **       **     |
|  * Event A   *         * Event B   *    |
|  * P(A)=0.2  *         * P(B)=0.3  *    |
|   **       **           **       **     |
|     *******               *******       |
|                                         |
|  P(A U B) = 0.2 + 0.3 = 0.5             |
+-----------------------------------------+

NOT MUTUALLY EXCLUSIVE (Overlap exists)
+-----------------------------------------+
| Sample Space (S)                        |
|                                         |
|         *******   *******               |
|       **       ***       **             |
|      * Event A * * Event B *            |
|      *        *   *        *            |
|       **       ***       **             |
|         *******   *******               |
|                  ^                      |
|             Intersection                |
|             P(A ∩ B) > 0                |
|                                         |
|  Must subtract intersection to avoid    |
|  double-counting!                       |
+-----------------------------------------+
```

## Memory technique — remember this forever

1.  **The Hook:** "Exclusive clubs don't share members." If Club A and Club B are mutually exclusive, no one is allowed to be in both. To find the total number of people in either club, you just add the two rosters together. No double-counting is possible.
2.  **Must overlearn:** 
    *   If mutually exclusive: $P(A \cap B) = 0$
    *   Addition rule: $P(A \cup B) = P(A) + P(B)$
3.  **Spaced-repetition schedule:** Review this concept and re-derive the general formula in 1 day, 3 days, 7 days, 16 days, and 35 days.
4.  **First principles pathway:** If you forget the rule, draw a Venn diagram. Let $A$ have $a$ elements and $B$ have $b$ elements, with no overlap. The total elements in $A$ or $B$ is exactly $a + b$. Divide by the total sample space $N$: $\frac{a+b}{N} = \frac{a}{N} + \frac{b}{N} = P(A) + P(B)$.

## Common mistakes
*   **Confusing "Mutually Exclusive" with "Independent":** This is the single most common error in probability. 
    *   *Mutually exclusive* means they cannot happen together ($P(A \cap B) = 0$). 
    *   *Independent* means one happening doesn't affect the probability of the other ($P(A \cap B) = P(A) \cdot P(B)$). 
    *   If $A$ and $B$ are mutually exclusive (and have a probability $>0$), they are *highly dependent*. If $A$ happens, $B$ is guaranteed *not* to happen.
*   **Blindly adding probabilities that overlap:** Trying to find the probability of drawing a Heart or a Face Card from a deck by doing $P(\text{Heart}) + P(\text{Face Card})$. You will double-count the King, Queen, and Jack of Hearts. You must use the general addition rule here.
*   **Probabilities exceeding 1:** If you add probabilities and get $1.2$, you have either failed to subtract an intersection, or you have defined your sample space incorrectly. Probabilities are strictly bounded: $0 \le P(E) \le 1$.

## Self-check
1. A bag contains $5$ red marbles, $3$ blue marbles, and $2$ green marbles. What is the probability of drawing a red OR a green marble?
2. Event $X$ and Event $Y$ are mutually exclusive. $P(X) = 0.4$ and $P(Y) = 0.5$. What is $P(X \cap Y)$? Are $X$ and $Y$ independent? 
3. An aerospace engineer determines that the probability of a sensor failing due to radiation is $0.05$. The probability of it failing due to thermal stress is $0.08$. The probability of it failing due to *both* simultaneously is $0.01$. Are these failure modes mutually exclusive? What is the probability that the sensor fails due to radiation or thermal stress?