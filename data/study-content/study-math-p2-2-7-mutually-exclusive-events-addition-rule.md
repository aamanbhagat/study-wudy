## 1. What it is — in plain English

Imagine you're trying to do two things at the exact same time. Can you simultaneously jump up AND sit down? No, you can only do one or the other. This simple idea is at the heart of "mutually exclusive events."

In probability, "events" are just things that can happen. Two events are "mutually exclusive" if they cannot both occur at the same time during a single trial or observation. If one happens, the other absolutely cannot. They are completely separate, like two different lanes on a highway that never intersect.

The "addition rule" for these events tells us how to figure out the probability that *either one OR the other* of these events will happen. Since they can't happen together, we don't have to worry about counting any overlap, because there isn't any. We just add up their individual probabilities.

So, in short: if two things can't happen at the same time, the chance of one OR the other happening is simply the sum of their individual chances. It's like asking, "What's the probability I pick a red candy OR a blue candy from a bag?" If a candy can't be both red and blue at the same time, you just add the probability of picking red to the probability of picking blue.

## 2. Why it matters — real-world applications

Understanding mutually exclusive events and their addition rule is fundamental across many fields, from ensuring safety to making informed business decisions.

1.  **Aerospace and Safety Systems:** In aircraft design or nuclear power plant safety, engineers analyze potential failure modes. For instance, a specific critical component might fail due to "material fatigue" OR "software malfunction." If these two failure modes are truly independent and cannot occur simultaneously in the *exact same way* to cause the *same specific failure event* (e.g., a single sensor cannot simultaneously report a fatigue error and a software error from its internal logic), then the probability of the component failing due to *either* fatigue *or* software malfunction is the sum of their individual probabilities. This helps in designing redundant systems and setting maintenance schedules.
2.  **Medical Diagnostics:** When a patient presents with symptoms, doctors consider various diagnoses. A patient might have "Disease A" OR "Disease B." If a patient cannot simultaneously have both Disease A and Disease B (e.g., they are distinct conditions with non-overlapping diagnostic criteria), then the probability of a patient having *either* Disease A *or* Disease B can be calculated using the addition rule, given the prevalence of each disease in the population. This informs diagnostic testing strategies.
3.  **Marketing and Consumer Behavior:** A marketing team might survey customers about their preferred brand of a product. If customers can only state one preferred brand, then the event "customer prefers Brand X" and "customer prefers Brand Y" are mutually exclusive. The probability that a randomly selected customer prefers *either* Brand X *or* Brand Y is the sum of their individual preference probabilities. This helps companies understand market share and target advertising.
4.  **Machine Learning Classification:** In multi-class classification problems, a machine learning model assigns an input to one of several categories. For example, an image recognition model might classify an animal as a "cat," "dog," or "bird." Assuming an image contains only one animal of interest, the events "image is a cat," "image is a dog," and "image is a bird" are mutually exclusive. The model might output probabilities for each class. If we want to know the probability that an image is *either* a cat *or* a dog, we would sum their predicted probabilities (assuming the model's outputs are well-calibrated probabilities).

## 3. Prerequisites — what you must know first

Before diving deep into mutually exclusive events and the addition rule, ensure you have a solid grasp of these foundational concepts:

*   **Basic Probability:** The idea that probability is a number between 0 and 1 (or 0% and 100%) representing the likelihood of an event.
*   **Experiment/Trial:** A process that leads to well-defined outcomes (e.g., flipping a coin, rolling a die).
*   **Outcome:** A single possible result of an experiment (e.g., heads, rolling a 3).
*   **Sample Space ($\Omega$ or $S$):** The set of all possible outcomes of an experiment (e.g., for a coin flip, $S = \{\text{Heads, Tails}\}$).
*   **Event:** A subset of the sample space; a collection of one or more outcomes (e.g., "rolling an even number" on a die is the event $\{2, 4, 6\}$).
*   **Probability of an Event ($P(A)$):** The likelihood of event A occurring, often calculated as (Number of favorable outcomes) / (Total number of possible outcomes) for equally likely outcomes.
*   **Set Notation (Basic):** Understanding what a "set" is, and the concepts of "union" ($\cup$) and "intersection" ($\cap$) for combining or finding common elements between sets.

## 4. The core idea — step by step

Let's break down the concept of mutually exclusive events and their addition rule into manageable steps.

### Step 1: Understanding "Events"

**Plain-English Statement:** An event is simply something that can happen when you perform an action or observe something. It's a specific result or a collection of results you're interested in.

**Small Concrete Example:**
If you roll a standard six-sided die:
*   "Rolling a 3" is an event.
*   "Rolling an even number" is another event (it includes outcomes 2, 4, and 6).

**Formal/Mathematical Version:**
Let $S$ be the sample space of an experiment. An event $A$ is any subset of $S$.
For example, if $S = \{1, 2, 3, 4, 5, 6\}$ (rolling a die), then $A = \{3\}$ is an event, and $B = \{2, 4, 6\}$ is another event.

**What could go wrong:** Confusing an outcome with an event. An outcome is the most basic result (e.g., just '3'). An event can be a single outcome or a group of outcomes (e.g., 'even number'). All outcomes are events, but not all events are single outcomes.

### Step 2: Defining "Mutually Exclusive Events"

**Plain-English Statement:** Two events are mutually exclusive if they cannot happen at the same time. If one occurs, the other absolutely cannot. They have no outcomes in common.

**Small Concrete Example:**
If you roll a standard six-sided die:
*   Event A: "Rolling a 1" ($A = \{1\}$)
*   Event B: "Rolling a 2" ($B = \{2\}$)
These are mutually exclusive because you cannot roll both a 1 and a 2 on a single roll.
*   Event C: "Rolling an odd number" ($C = \{1, 3, 5\}$)
*   Event D: "Rolling an even number" ($D = \{2, 4, 6\}$)
These are also mutually exclusive because a number cannot be both odd and even simultaneously.

**Formal/Mathematical Version:**
Two events $A$ and $B$ are mutually exclusive (or disjoint) if their intersection is the empty set. That is, $A \cap B = \emptyset$.
Here, $\cap$ denotes the intersection of sets, and $\emptyset$ denotes the empty set (a set with no elements).

**What could go wrong:** Assuming events are mutually exclusive when they're not. For example, "rolling an even number" ($E = \{2, 4, 6\}$) and "rolling a number greater than 3" ($G = \{4, 5, 6\}$) are *not* mutually exclusive because they both contain outcomes 4 and 6. Their intersection is $E \cap G = \{4, 6\} \neq \emptyset$.

### Step 3: Understanding "OR" in Probability (Union of Events)

**Plain-English Statement:** When we talk about the probability of event A "OR" event B happening, we're asking for the chance that at least one of them occurs. It could be A, or it could be B, or it could be both (if they're not mutually exclusive).

**Small Concrete Example:**
If you roll a die:
*   Event A: "Rolling a 1" ($A = \{1\}$)
*   Event B: "Rolling a 2" ($B = \{2\}$)
The event "Rolling a 1 OR a 2" means we're interested if the outcome is 1 or if the outcome is 2. The outcomes for this combined event are $\{1, 2\}$.

**Formal/Mathematical Version:**
The event "A or B" is represented by the union of the two sets, $A \cup B$.
This set contains all outcomes that are in $A$, or in $B$, or in both.

**What could go wrong:** Forgetting that "OR" in probability means "at least one." It's not exclusive OR (meaning one or the other but not both) unless the events are mutually exclusive.

### Step 4: The Intuition of the Addition Rule for Mutually Exclusive Events

**Plain-English Statement:** If two events cannot happen at the same time, then the probability of one OR the other happening is simply the sum of their individual probabilities. You don't need to subtract any overlap because there isn't any.

**Small Concrete Example:**
Imagine a bag with 5 red marbles, 3 blue marbles, and 2 green marbles (total 10 marbles).
*   Event R: Picking a red marble. $P(R) = 5/10 = 0.5$.
*   Event B: Picking a blue marble. $P(B) = 3/10 = 0.3$.
Picking a red marble and picking a blue marble are mutually exclusive (a single marble can't be both red and blue).
The probability of picking a red OR a blue marble is the total number of red and blue marbles divided by the total: $(5+3)/10 = 8/10 = 0.8$.
Notice that $P(R) + P(B) = 0.5 + 0.3 = 0.8$. The rule holds!

**Formal/Mathematical Version:**
If $A$ and $B$ are mutually exclusive events, then the probability of $A$ or $B$ occurring is:
$$P(A \cup B) = P(A) + P(B)$$

**What could go wrong:** This is the critical point: *only apply this rule if the events are truly mutually exclusive*. If there's any overlap, you'd be double-counting the overlapping outcomes, and the result would be too high. For non-mutually exclusive events, a different (more general) addition rule is needed: $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.

### Step 5: Extending to More Than Two Mutually Exclusive Events

**Plain-English Statement:** The idea extends easily. If you have several events, and *no two of them* can happen at the same time, then the probability of *any one* of them happening is just the sum of all their individual probabilities.

**Small Concrete Example:**
Using the marble example again: 5 red, 3 blue, 2 green (10 total).
*   Event R: Picking red. $P(R) = 0.5$.
*   Event B: Picking blue. $P(B) = 0.3$.
*   Event G: Picking green. $P(G) = 0.2$.
These three events are mutually exclusive (a marble can only be one color).
The probability of picking red OR blue OR green is $P(R) + P(B) + P(G) = 0.5 + 0.3 + 0.2 = 1.0$. This makes sense, as you are guaranteed to pick one of those colors.

**Formal/Mathematical Version:**
If $A_1, A_2, \dots, A_n$ are $n$ mutually exclusive events, then:
$$P(A_1 \cup A_2 \cup \dots \cup A_n) = P(A_1) + P(A_2) + \dots + P(A_n)$$
This can also be written using summation notation:
$$P\left(\bigcup_{i=1}^{n} A_i\right) = \sum_{i=1}^{n} P(A_i)$$

**What could go wrong:** Again, the critical condition of mutual exclusivity must hold for *every pair* of events. If $A_1$ and $A_2$ are mutually exclusive, but $A_2$ and $A_3$ are not, then this simple addition rule cannot be applied to all three simultaneously.

## 5. Worked examples — multiple, with every step shown

Here are several worked examples demonstrating the application of the addition rule for mutually exclusive events.

### Example 1: Rolling a Die (Easy)

**Problem:** What is the probability of rolling a 2 or a 5 on a single throw of a fair six-sided die?

**Given:**
*   A fair six-sided die.
*   Event A: Rolling a 2.
*   Event B: Rolling a 5.

**What we want:** $P(A \text{ or } B)$, which is $P(A \cup B)$.

**Solution:**

1.  **Identify the sample space ($S$):**
    $S = \{1, 2, 3, 4, 5, 6\}$
    *This represents all possible outcomes when rolling a single die.*

2.  **Determine the individual probabilities:**
    *   Event A: Rolling a 2. There is 1 outcome (2) out of 6 total outcomes.
        $$P(A) = \frac{1}{6}$$
        *The probability of rolling a 2 is 1 favorable outcome divided by 6 total outcomes.*
    *   Event B: Rolling a 5. There is 1 outcome (5) out of 6 total outcomes.
        $$P(B) = \frac{1}{6}$$
        *The probability of rolling a 5 is 1 favorable outcome divided by 6 total outcomes.*

3.  **Check for mutual exclusivity:**
    Can you roll both a 2 and a 5 on a single throw of a die? No.
    So, events A and B are mutually exclusive. $A \cap B = \emptyset$.
    *This is the crucial check. Since they cannot happen at the same time, we can use the addition rule.*

4.  **Apply the addition rule for mutually exclusive events:**
    $$P(A \cup B) = P(A) + P(B)$$
    *Because the events are mutually exclusive, we can simply add their individual probabilities.*

5.  **Calculate the final probability:**
    $$P(A \cup B) = \frac{1}{6} + \frac{1}{6} = \frac{2}{6} = \frac{1}{3}$$
    *Perform the addition and simplify the fraction.*

**Answer:** The probability of rolling a 2 or a 5 is $\boxed{\frac{1}{3}}$.

**Reflection:** This example was straightforward because the events were simple (single outcomes) and clearly mutually exclusive. The key was confirming that a single die roll cannot result in both a 2 and a 5 simultaneously.

### Example 2: Drawing Cards (Medium)

**Problem:** What is the probability of drawing an Ace or a King from a standard 52-card deck on a single draw?

**Given:**
*   A standard 52-card deck.
*   Event A: Drawing an Ace.
*   Event K: Drawing a King.

**What we want:** $P(A \text{ or } K)$, which is $P(A \cup K)$.

**Solution:**

1.  **Identify the sample space size:**
    There are 52 cards in a standard deck.
    *This is the total number of possible outcomes for drawing a single card.*

2.  **Determine the individual probabilities:**
    *   Event A: Drawing an Ace. There are 4 Aces (Ace of Spades, Hearts, Diamonds, Clubs) in a deck.
        $$P(A) = \frac{4}{52}$$
        *The probability of drawing an Ace is 4 favorable outcomes divided by 52 total outcomes.*
    *   Event K: Drawing a King. There are 4 Kings (King of Spades, Hearts, Diamonds, Clubs) in a deck.
        $$P(K) = \frac{4}{52}$$
        *The probability of drawing a King is 4 favorable outcomes divided by 52 total outcomes.*

3.  **Check for mutual exclusivity:**
    Can a single card be both an Ace and a King at the same time? No.
    So, events A and K are mutually exclusive. $A \cap K = \emptyset$.
    *This confirms that there is no overlap between the set of Aces and the set of Kings.*

4.  **Apply the addition rule for mutually exclusive events:**
    $$P(A \cup K) = P(A) + P(K)$$
    *Since the events are mutually exclusive, we can directly sum their probabilities.*

5.  **Calculate the final probability:**
    $$P(A \cup K) = \frac{4}{52} + \frac{4}{52} = \frac{8}{52}$$
    *Add the probabilities.*

6.  **Simplify the fraction:**
    $$\frac{8}{52} = \frac{2 \times 4}{13 \times 4} = \frac{2}{13}$$
    *Divide both numerator and denominator by their greatest common divisor, 4.*

**Answer:** The probability of drawing an Ace or a King is $\boxed{\frac{2}{13}}$.

**Reflection:** This example reinforces the concept with a slightly larger sample space. The critical step remains checking for mutual exclusivity. If the question had been "drawing an Ace or a Red card," the events would *not* be mutually exclusive (there are red Aces), and a different formula would be needed.

### Example 3: Employee Department (Medium-Hard)

**Problem:** In a company, 30% of employees work in Engineering, 25% work in Sales, and 15% work in Marketing. Assuming each employee works in only one department, what is the probability that a randomly selected employee works in Engineering or Sales?

**Given:**
*   Event E: Employee works in Engineering. $P(E) = 0.30$.
*   Event S: Employee works in Sales. $P(S) = 0.25$.
*   Event M: Employee works in Marketing. $P(M) = 0.15$.
*   Condition: Each employee works in only one department.

**What we want:** $P(E \text{ or } S)$, which is $P(E \cup S)$.

**Solution:**

1.  **Identify the individual probabilities:**
    *   $P(E) = 0.30$ (given)
    *   $P(S) = 0.25$ (given)
    *We are directly provided with the probabilities, so no need to calculate from raw counts.*

2.  **Check for mutual exclusivity:**
    The problem explicitly states, "Assuming each employee works in only one department." This means an employee cannot simultaneously work in Engineering and Sales.
    Therefore, events E and S are mutually exclusive. $E \cap S = \emptyset$.
    *This is a key piece of information provided in the problem statement that allows us to use the addition rule.*

3.  **Apply the addition rule for mutually exclusive events:**
    $$P(E \cup S) = P(E) + P(S)$$
    *Since an employee cannot be in both departments at once, we can sum their probabilities.*

4.  **Calculate the final probability:**
    $$P(E \cup S) = 0.30 + 0.25 = 0.55$$
    *Perform the addition.*

**Answer:** The probability that a randomly selected employee works in Engineering or Sales is $\boxed{0.55}$.

**Reflection:** This example uses percentages, which are just probabilities expressed differently. The crucial part was recognizing that the problem statement guaranteed mutual exclusivity. The information about Marketing employees ($P(M)=0.15$) was extra data not needed for this specific question, which is common in probability problems.

### Example 4: Product Preferences (Hard)

**Problem:** A survey of smartphone users found that 40% prefer Brand A, 35% prefer Brand B, 15% prefer Brand C, and the rest prefer other brands. If a user can only state one preferred brand, what is the probability that a randomly selected user prefers Brand A or Brand C?

**Given:**
*   Event A: User prefers Brand A. $P(A) = 0.40$.
*   Event B: User prefers Brand B. $P(B) = 0.35$.
*   Event C: User prefers Brand C. $P(C) = 0.15$.
*   Condition: A user can only state one preferred brand.

**What we want:** $P(A \text{ or } C)$, which is $P(A \cup C)$.

**Solution:**

1.  **Identify the individual probabilities:**
    *   $P(A) = 0.40$ (given)
    *   $P(C) = 0.15$ (given)
    *The probabilities for the events of interest are provided directly.*

2.  **Check for mutual exclusivity:**
    The problem states, "If a user can only state one preferred brand." This means a user cannot simultaneously prefer Brand A and Brand C.
    Therefore, events A and C are mutually exclusive. $A \cap C = \emptyset$.
    *This condition is essential. If users could prefer multiple brands, this simple addition rule wouldn't apply.*

3.  **Apply the addition rule for mutually exclusive events:**
    $$P(A \cup C) = P(A) + P(C)$$
    *Since the events are mutually exclusive, we can sum their probabilities.*

4.  **Calculate the final probability:**
    $$P(A \cup C) = 0.40 + 0.15 = 0.55$$
    *Perform the addition.*

**Answer:** The probability that a randomly selected user prefers Brand A or Brand C is $\boxed{0.55}$.

**Reflection:** This problem is similar to the employee department example but uses a slightly different context. The "rest prefer other brands" information ($1 - (0.40 + 0.35 + 0.15) = 1 - 0.90 = 0.10$) is extraneous to the question asked. The difficulty primarily comes from identifying the relevant information and ensuring the mutual exclusivity condition is met, which it was.

## 6. Common mistakes and traps

Students often make specific errors when dealing with mutually exclusive events and the addition rule. Be vigilant for these:

1.  **Applying the rule when events are NOT mutually exclusive:** This is the most common and critical mistake. If events $A$ and $B$ can both happen at the same time (i.e., $A \cap B \neq \emptyset$), then $P(A \cup B) \neq P(A) + P(B)$. You would be double-counting the outcomes in the intersection.
2.  **Confusing "OR" with "AND":** The addition rule is for "OR" (union of events). For "AND" (intersection of events), you need multiplication rules, which are different and depend on whether events are independent.
3.  **Forgetting to simplify fractions/probabilities:** Always reduce fractions to their simplest form and express probabilities consistently (e.g., decimals, fractions, or percentages).
4.  **Not understanding the sample space:** If you misidentify the total possible outcomes, your individual probabilities $P(A)$ and $P(B)$ will be incorrect from the start.
5.  **Assuming equal probability for all outcomes:** Not all experiments have equally likely outcomes (e.g., a biased coin). If outcomes are not equally likely, you cannot simply count favorable outcomes and divide by total outcomes; you must use given probabilities or derived probabilities for each event.
6.  **Ignoring contextual clues for mutual exclusivity:** Sometimes the problem statement implies mutual exclusivity (e.g., "one choice only," "cannot be both"). Failing to recognize these clues can lead to incorrect assumptions.

## 7. Textbook-precise explanation

In probability theory, events are formally defined as subsets of a sample space. The concept of mutual exclusivity and its associated addition rule is a cornerstone of axiomatic probability.

**Definition 1: Sample Space and Event**
Let $S$ be the sample space of a random experiment, representing the set of all possible outcomes. An **event** $A$ is any subset of $S$.

**Definition 2: Mutually Exclusive Events**
Two events $A$ and $B$ are said to be **mutually exclusive** (or disjoint) if their intersection is the empty set. That is, $A \cap B = \emptyset$. This implies that $A$ and $B$ cannot occur simultaneously in a single trial of the experiment.
More generally, a collection of events $A_1, A_2, \dots, A_n$ is mutually exclusive if $A_i \cap A_j = \emptyset$ for all $i \neq j$.

**Axiom 3: The Addition Rule for Mutually Exclusive Events**
One of the fundamental axioms of probability (often referred to as the third Kolmogorov axiom) states that for a sequence of mutually exclusive events $A_1, A_2, \dots$, the probability of their union is the sum of their individual probabilities.
For two mutually exclusive events $A$ and $B$:
$$P(A \cup B) = P(A) + P(B)$$
For a finite sequence of $n$ mutually exclusive events $A_1, A_2, \dots, A_n$:
$$P(A_1 \cup A_2 \cup \dots \cup A_n) = P(A_1) + P(A_2) + \dots + P(A_n) = \sum_{i=1}^{n} P(A_i)$$
This rule is a direct consequence of the definition of probability measure, where the measure of a union of disjoint sets is the sum of their measures.

**Contrast with the General Addition Rule:**
It is crucial to distinguish this from the **General Addition Rule** for any two events $A$ and $B$ (whether mutually exclusive or not):
$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$
When $A$ and $B$ are mutually exclusive, $A \cap B = \emptyset$, and thus $P(A \cap B) = P(\emptyset) = 0$. In this special case, the general addition rule simplifies to $P(A \cup B) = P(A) + P(B) - 0 = P(A) + P(B)$, confirming the rule for mutually exclusive events.

**Reference:**
*   "Ross, Sheldon M. *A First Course in Probability*. 10th ed., Pearson, 2019, Chapter 2."
*   "DeGroot, Morris H., and Mark J. Schervish. *Probability and Statistics*. 4th ed., Pearson, 2012, Chapter 1."

## 8. ASCII diagrams

A Venn diagram is an excellent way to visualize mutually exclusive events.

```text
       Sample Space S
+---------------------------------+
|                                 |
|      +-------+       +-------+ |
|      | Event |       | Event | |
|      |   A   |       |   B   | |
|      +-------+       +-------+ |
|                                 |
|                                 |
+---------------------------------+

Description:
This diagram shows a rectangular sample space 'S' representing all possible outcomes.
Inside 'S', there are two distinct circles (or ovals) labeled 'Event A' and 'Event B'.
Crucially, these two circles do not overlap or touch at any point.
This visual separation indicates that there are no outcomes common to both Event A and Event B.
Therefore, A and B are mutually exclusive events.
The area covered by A OR B (A union B) is simply the sum of the area of A and the area of B.
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Think of "OR" as "ADD," but only if there's "NO OVERLAP."
    Imagine two separate, non-overlapping circles (like in the Venn diagram above) or two distinct parking spots. If you want to park in spot A *or* spot B, you just add the chances of getting into each spot, because getting into one doesn't affect your ability to get into the other (they don't share space). The key is "No Overlap, Just Add."

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **Definition of Mutually Exclusive Events:** $A \cap B = \emptyset$ (They cannot happen at the same time).
    *   **Addition Rule for Mutually Exclusive Events:** $P(A \cup B) = P(A) + P(B)$.
    *   **The crucial condition:** This rule *only* applies if $A$ and $B$ are mutually exclusive.

3.  **Spaced-Repetition Schedule:**
    *   **Review 1:** After 1 day. Re-read this section, work one simple example.
    *   **Review 2:** After 3 days. Work two medium difficulty examples without looking at solutions.
    *   **Review 3:** After 7 days. Explain the concept to yourself or a friend, ensuring you highlight the "mutually exclusive" condition.
    *   **Review 4:** After 16 days. Work a hard example and articulate the "what could go wrong" scenarios.
    *   **Review 5:** After 35 days. Re-derive the rule from first principles (see below) and connect it to the general addition rule.

4.  **The First-Principles Re-derivation Pathway:**
    If you ever forget the formula, you can rebuild it by thinking about sets and counting:
    *   **Start with the definition of probability:** For equally likely outcomes, $P(\text{Event}) = \frac{\text{Number of outcomes in Event}}{\text{Total number of outcomes in Sample Space}}$.
    *   **Consider two events, A and B, that are mutually exclusive.** This means they share no outcomes. $A \cap B = \emptyset$.
    *   **What does "A OR B" mean?** It means any outcome that is in A, or in B. Since there's no overlap, the total number of outcomes for "A OR B" is simply the sum of the number of outcomes in A and the number of outcomes in B.
        Let $N(A)$ be the number of outcomes in event A.
        Let $N(B)$ be the number of outcomes in event B.
        Let $N(S)$ be the total number of outcomes in the sample space.
        Then, $N(A \cup B) = N(A) + N(B)$ (because $A$ and $B$ are disjoint).
    *   **Apply the probability definition:**
        $P(A \cup B) = \frac{N(A \cup B)}{N(S)}$
        Substitute the sum from the previous step:
        $P(A \cup B) = \frac{N(A) + N(B)}{N(S)}$
    *   **Separate the fraction:**
        $P(A \cup B) = \frac{N(A)}{N(S)} + \frac{N(B)}{N(S)}$
    *   **Recognize the individual probabilities:**
        $P(A \cup B) = P(A) + P(B)$
    This re-derivation clearly shows *why* the rule works when events are mutually exclusive – because you're simply adding distinct counts of outcomes.

## 10. Connections — what this leads to

The concept of mutually exclusive events and their addition rule is a foundational building block for many advanced topics in probability and statistics:

1.  **General Addition Rule:** Understanding the mutually exclusive case is the stepping stone to the more general addition rule, $P(A \cup B) = P(A) + P(B) - P(A \cap B)$, where you learn to subtract the overlap when events are *not* mutually exclusive. This is crucial for handling real-world scenarios where events often do overlap.
2.  **Complementary Events:** Complementary events are a special case of mutually exclusive events. If $A$ is an event, its complement $A^c$ (or $A'$) is the event that $A$ does not occur. $A$ and $A^c$ are always mutually exclusive, and their union covers the entire sample space. Thus, $P(A) + P(A^c) = 1$, a frequently used identity.
3.  **Partitions of a Sample Space:** A set of mutually exclusive events whose union is the entire sample space is called a partition. This concept is vital for understanding total probability and Bayes' theorem.
4.  **Conditional Probability and Independence:** While directly about "OR," understanding mutual exclusivity helps differentiate it from independence, which is about "AND" and whether events influence each other. These concepts are often confused.
5.  **Discrete Probability Distributions:** Many discrete probability distributions (like the binomial, Poisson, or geometric distributions) rely on the sum of probabilities of mutually exclusive outcomes to calculate the probability of a range of events. For example, $P(X \le 2) = P(X=0) + P(X=1) + P(X=2)$, where $X=0, X=1, X=2$ are mutually exclusive outcomes.
6.  **Statistical Inference:** The ability to correctly calculate probabilities of combined events is essential for hypothesis testing, confidence intervals, and decision-making under uncertainty in statistics.

## 11. Self-check questions

1.  Define "mutually exclusive events" in your own words, and provide an example from everyday life that is *not* a dice roll or card draw.
2.  A bag contains 7 red, 5 blue, and 3 green marbles. If you draw one marble at random, what is the probability that it is either blue or green?
3.  Explain why the addition rule $P(A \cup B) = P(A) + P(B)$ cannot be used to find the probability of drawing a red card or a Queen from a standard deck of cards.
4.  In a survey, 60% of people prefer coffee, 30% prefer tea, and 10% prefer hot chocolate. If each person chose only one beverage, what is the probability that a randomly selected person prefers coffee or hot chocolate?
5.  Consider an experiment where you flip a coin twice. Let Event A be "getting two heads" and Event B be "getting exactly one tail." Are these events mutually exclusive? Calculate $P(A \cup B)$.