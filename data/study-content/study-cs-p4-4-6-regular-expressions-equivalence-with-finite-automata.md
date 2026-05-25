## 1. What it is — in plain English

Imagine you're searching for specific words or patterns in a very long document. You might want to find all occurrences of "cat", or perhaps "cat" followed by "nap", or even "cat" followed by *any* number of "meow"s. Regular expressions are like a special, powerful language for describing these kinds of text patterns. They let you write down exactly what you're looking for, no matter how simple or complex the pattern might be.

Now, imagine a tiny, specialized machine whose only job is to scan text and tell you, "Yes, this piece of text matches the pattern I'm looking for!" or "No, it doesn't." This machine has a limited number of "states" it can be in, and it moves from one state to another based on each character it reads. These simple machines are called Finite Automata.

The big, profound idea we're exploring is that these two seemingly different concepts — the descriptive language of regular expressions and the pattern-recognizing machines of finite automata — are actually two sides of the same coin. They are *equivalent*. This means that for any pattern you can describe with a regular expression, you can build a finite automaton that recognizes exactly that pattern, and vice-versa. They have the exact same power to describe or recognize patterns.

Think of it like this: one is a blueprint (the regular expression) and the other is the factory that builds exactly what's on the blueprint (the finite automaton). Or, one is a recipe (RE) and the other is a chef who can perfectly execute that recipe (FA). They both represent the same underlying set of rules for what constitutes a valid "word" in a particular "language."

## 2. Why it matters — real-world applications

The equivalence between regular expressions and finite automata is a cornerstone of computer science, underpinning many tools and systems you interact with daily. Understanding this connection allows us to build efficient pattern-matching algorithms and analyze the capabilities of various computational models.

1.  **Text Processing and Search Utilities:** Tools like `grep`, `sed`, `awk` in Unix-like systems, and the search-and-replace features in modern text editors (VS Code, Sublime Text, Notepad++) heavily rely on regular expressions. When you search for `^user[0-9]+@example\.com$` to find email addresses starting with "user" followed by numbers at "example.com", the underlying engine often converts this regular expression into a finite automaton for efficient scanning of large text files. This is crucial for system administrators, developers, and data analysts.

2.  **Lexical Analysis in Compilers:** The first phase of any compiler is lexical analysis, where the source code (e.g., C++, Python) is broken down into a stream of "tokens" (keywords like `if`, `while`; identifiers like `myVariable`; operators like `+`, `-`; numbers, etc.). Each type of token is defined by a regular expression. For example, an identifier might be defined by `[a-zA-Z_][a-zA-Z0-9_]*`. Tools like `flex` (Fast Lexical Analyzer Generator) take these regular expression definitions and automatically generate a finite automaton (often a DFA) that can efficiently scan the input code and produce the token stream. This is fundamental to all programming languages and software development.

3.  **Network Intrusion Detection Systems (NIDS):** Security systems like Snort or Suricata use regular expressions to define patterns of malicious network traffic. For instance, a regex might describe a known attack signature in a packet payload. These systems need to process network traffic at very high speeds, often gigabits per second. The regular expressions are compiled into highly optimized finite automata (or similar state machines) that can perform extremely fast pattern matching on incoming data streams, identifying threats in real-time. This is critical for cybersecurity and protecting national infrastructure.

4.  **Bioinformatics:** In genetics and molecular biology, DNA and protein sequences are essentially long strings of characters (e.g., A, T, C, G for DNA). Researchers use regular expressions to find specific patterns within these sequences, such as binding sites, regulatory elements, or gene motifs. For example, a biologist might search for `GATC(A|T){2,5}GC` to find a specific sequence pattern. The efficient pattern matching enabled by the FA equivalence is vital for analyzing vast genomic datasets, which has implications for drug discovery and understanding diseases.

## 3. Prerequisites — what you must know first

Before diving deep into the equivalence of regular expressions and finite automata, ensure you have a solid grasp of these foundational concepts:

*   **Set Theory:** Understanding of sets, elements, union ($\cup$), intersection ($\cap$), complement, and subsets. These are fundamental for defining formal languages and automata components.
*   **Formal Languages:**
    *   **Alphabet ($\Sigma$):** A finite, non-empty set of symbols.
    *   **String:** A finite sequence of symbols from an alphabet.
    *   **Language:** A set of strings over an alphabet.
    *   **Concatenation:** Combining two strings or two languages.
    *   **Kleene Star ($^*$):** The set of all possible strings formed by concatenating zero or more strings from a language.
    *   **Empty String ($\epsilon$):** The string with no symbols.
    *   **Empty Set ($\emptyset$):** The set containing no strings.
*   **Finite Automata (FA):**
    *   **Deterministic Finite Automata (DFA):** A 5-tuple $(Q, \Sigma, \delta, q_0, F)$ where $Q$ is a finite set of states, $\Sigma$ is the alphabet, $\delta$ is the transition function, $q_0$ is the start state, and $F$ is the set of accept states. Understand how a DFA processes a string and decides whether to accept or reject it.
    *   **Non-deterministic Finite Automata (NFA):** Similar to DFA but with the allowance for multiple transitions on the same input symbol from a state, and $\epsilon$-transitions (transitions without consuming an input symbol). Understand that NFAs and DFAs are equivalent in power.
    *   **Regular Languages:** The class of languages that can be recognized by a finite automaton (DFA or NFA).
*   **Mathematical Induction:** A proof technique used to establish that a statement is true for all natural numbers (or for all elements in a recursively defined set). This is crucial for understanding the formal proofs of equivalence.

## 4. The core idea — step by step

The core idea is **Kleene's Theorem**, which formally states that a language is regular if and only if it is recognized by a finite automaton, and if and only if it can be described by a regular expression. We will prove this theorem by showing how to convert between them.

### Step 1: Defining Regular Expressions (REs)

**Plain English:** Regular expressions are a way to build complex patterns using a few basic building blocks and operations. Think of them as a "grammar" for patterns.

**Small Concrete Example:**
*   `a`: Matches the character 'a'.
*   `ab`: Matches the string "ab".
*   `a|b`: Matches either 'a' or 'b'.
*   `a*`: Matches zero or more 'a's (e.g., "", "a", "aa", "aaa", ...).
*   `(a|b)*`: Matches any string consisting of zero or more 'a's or 'b's (e.g., "", "a", "b", "aa", "ab", "ba", "bb", ...).

**The Formal/Mathematical Version:**
Let $\Sigma$ be an alphabet. The regular expressions over $\Sigma$ are defined recursively as follows:
1.  $\emptyset$ is a regular expression (denoting the empty language, $L(\emptyset) = \emptyset$).
2.  $\epsilon$ is a regular expression (denoting the language containing only the empty string, $L(\epsilon) = \{\epsilon\}$).
3.  For any $a \in \Sigma$, $a$ is a regular expression (denoting the language containing only the string $a$, $L(a) = \{a\}$).
4.  If $R_1$ and $R_2$ are regular expressions, then so are:
    *   $(R_1 \cup R_2)$ (or $(R_1 + R_2)$ or $(R_1|R_2)$) (union/OR, $L(R_1 \cup R_2) = L(R_1) \cup L(R_2)$).
    *   $(R_1 R_2)$ (concatenation, $L(R_1 R_2) = L(R_1)L(R_2)$).
    *   $(R_1^*)$ (Kleene star, $L(R_1^*) = (L(R_1))^*$).

We often omit parentheses when precedence is clear: Kleene star has highest precedence, then concatenation, then union. For example, $ab^*c$ means $a(b^*)c$.

**What could go wrong:** Misinterpreting operator precedence is a common mistake. For instance, `ab|c` is not the same as `a(b|c)`. The first means "ab" or "c", while the second means "a" followed by "b" or "c" (i.e., "ab" or "ac"). Always clarify with parentheses if unsure.

### Step 2: Defining Finite Automata (FAs)

**Plain English:** A finite automaton is a conceptual machine that reads an input string character by character and, based on its current state and the character read, moves to a new state. It accepts the string if it ends up in an "accepting" state after reading the entire string.

**Small Concrete Example:**
A DFA that accepts strings containing an even number of 'a's over $\Sigma = \{a, b\}$.
*   States: $q_0$ (even 'a's), $q_1$ (odd 'a's).
*   Start state: $q_0$.
*   Accept state: $q_0$.
*   Transitions:
    *   From $q_0$: on 'a' go to $q_1$; on 'b' stay at $q_0$.
    *   From $q_1$: on 'a' go to $q_0$; on 'b' stay at $q_1$.

**The Formal/Mathematical Version:**
A Deterministic Finite Automaton (DFA) is a 5-tuple $M = (Q, \Sigma, \delta, q_0, F)$, where:
*   $Q$ is a finite set of states.
*   $\Sigma$ is a finite input alphabet.
*   $\delta: Q \times \Sigma \to Q$ is the transition function.
*   $q_0 \in Q$ is the start state.
*   $F \subseteq Q$ is the set of accept (or final) states.

A Non-deterministic Finite Automaton (NFA) is a 5-tuple $M = (Q, \Sigma, \delta, q_0, F)$, where $\delta: Q \times (\Sigma \cup \{\epsilon\}) \to \mathcal{P}(Q)$ is the transition function, mapping a state and an input symbol (or $\epsilon$) to a *set* of possible next states.

**What could go wrong:** Incorrectly defining the transition function or the set of final states will lead to an automaton that recognizes the wrong language. Forgetting to handle all input symbols from all states in a DFA is a common oversight.

### Step 3: Kleene's Theorem Part 1: Converting Regular Expressions to NFAs (Thompson's Construction)

**Plain English:** This part of the theorem shows that for *any* regular expression, we can systematically build an NFA that recognizes exactly the language described by that regular expression. We do this by building NFAs for the simplest parts of the RE and then combining them using rules that mirror the RE operations.

**Small Concrete Example:**
Let's build an NFA for the RE $a^*b$.
1.  Start with an NFA for `a`:
    ```text
    (q_0) --a--> (q_1)  (q_1 is accept)
    ```
2.  Apply Kleene star to get NFA for `a*`:
    ```text
        +-------epsilon-------+
        |                     |
    ((q_s)) --epsilon--> (q_0) --a--> (q_1) --epsilon--> ((q_f))
        |                     |
        +-------epsilon-------+
    ```
    (where `(( ))` denotes start and accept states)
3.  Start with an NFA for `b`:
    ```text
    (q_2) --b--> (q_3)  (q_3 is accept)
    ```
4.  Concatenate NFA for `a*` and NFA for `b` to get NFA for `a*b`:
    ```text
        +-------epsilon-------+
        |                     |
    ((q_s)) --epsilon--> (q_0) --a--> (q_1) --epsilon--> (q_2) --b--> (q_3) --epsilon--> ((q_f))
        |                     |
        +-------epsilon-------+
    ```
    The accept state of the first NFA (q1) becomes a non-accepting state, and we add an epsilon transition from it to the start state of the second NFA (q2). The new overall start state is q_s and the new overall accept state is q_f.

**The Formal/Mathematical Version (Thompson's Construction):**
We construct an NFA $N(R)$ for a regular expression $R$ by induction on the structure of $R$. Each constructed NFA $N(R)$ will have a single start state and a single accept state, and no transitions entering the start state or leaving the accept state.

*   **Base Cases:**
    *   **$R = \emptyset$:**
        $$ N(\emptyset) = \quad (q_s) \quad (q_f) $$
        (Two states, no transitions. This NFA accepts no strings.)
    *   **$R = \epsilon$:**
        $$ N(\epsilon) = \quad (q_s) \xrightarrow{\epsilon} ((q_f)) $$
        (One $\epsilon$-transition from start to accept. Accepts only $\epsilon$.)
    *   **$R = a$ (for $a \in \Sigma$):**
        $$ N(a) = \quad (q_s) \xrightarrow{a} ((q_f)) $$
        (One transition on $a$ from start to accept. Accepts only $a$.)

*   **Inductive Steps:** Assume $N(R_1)$ and $N(R_2)$ are NFAs for $R_1$ and $R_2$, with start states $s_1, s_2$ and accept states $f_1, f_2$ respectively.

    *   **$R = R_1 \cup R_2$ (Union):**
        Create a new start state $s$ and a new accept state $f$. Add $\epsilon$-transitions from $s$ to $s_1$ and $s_2$. Add $\epsilon$-transitions from $f_1$ and $f_2$ to $f$.
        $$ N(R_1 \cup R_2) = \quad (s) \xrightarrow{\epsilon} N(R_1) \xrightarrow{\epsilon} (f) $$
        $$ \qquad \qquad \quad \quad \quad \quad \quad \uparrow \epsilon \quad \downarrow \epsilon $$
        $$ \qquad \qquad \quad \quad \quad \quad \quad (s_2) \xrightarrow{\epsilon} N(R_2) \xrightarrow{\epsilon} (f_2) $$
        (This diagram is simplified. The actual construction involves new start/final states and $\epsilon$-transitions to connect them to the respective sub-NFAs.)
        More precisely:
        ```text
            +----epsilon----> (s1) --N(R1)-- (f1) ----epsilon----+
            |                                                      |
            ((s))                                                  ((f))
            |                                                      |
            +----epsilon----> (s2) --N(R2)-- (f2) ----epsilon----+
        ```

    *   **$R = R_1 R_2$ (Concatenation):**
        The start state is $s_1$. The accept state is $f_2$. Add an $\epsilon$-transition from $f_1$ to $s_2$. $f_1$ is no longer an accept state, and $s_2$ is no longer a start state.
        ```text
        ((s1)) --N(R1)-- (f1) ----epsilon----> (s2) --N(R2)-- ((f2))
        ```

    *   **$R = R_1^*$ (Kleene Star):**
        Create a new start state $s$ and a new accept state $f$. Add an $\epsilon$-transition from $s$ to $s_1$. Add an $\epsilon$-transition from $f_1$ to $f$. Add an $\epsilon$-transition from $f_1$ back to $s_1$ (for repetition). Add an $\epsilon$-transition from $s$ to $f$ (for zero repetitions).
        ```text
            +----epsilon----> (s1) --N(R1)-- (f1) ----epsilon----+
            |                   ^               |                  |
            |                   |               |                  |
            ((s))               +----epsilon----+                  ((f))
            |                                                      |
            +-------------------epsilon----------------------------+
        ```

**What could go wrong:** Forgetting $\epsilon$-transitions, especially the one from the new start state directly to the new accept state for Kleene star (to handle zero repetitions). Also, ensure each sub-NFA has a single, distinct start and accept state before combining.

### Step 4: Kleene's Theorem Part 2: Converting FAs to Regular Expressions (State Elimination Method)

**Plain English:** This part shows that for *any* finite automaton, we can find a regular expression that describes exactly the language it recognizes. The method involves systematically removing states from the FA, and as we remove a state, we update the regular expressions on the transitions between the remaining states to account for all paths that *used* to go through the removed state. We keep doing this until only the start and accept states remain, with a single regular expression transition between them.

**Small Concrete Example:**
Consider a simple DFA:
```text
      a,b
    /-----\
    |     |
    ((q0)) --a--> (q1)
    ^     |
    |  b  |
    \-----/
```
(q0 is start and accept, q1 is non-accept)
Let's find the RE for paths from q0 to q0.
Paths that stay at q0: `b`
Paths that go q0 -> q1 -> q0: `a` then `(any loop at q1)` then `b`
This method gets complex quickly, so we use a more structured approach.

**The Formal/Mathematical Version (State Elimination Method / Generalized NFA):**
1.  **Convert to a Generalized NFA (GNFA):**
    *   Create a unique start state $q_{start}$ with an $\epsilon$-transition to the original FA's start state.
    *   Create a unique accept state $q_{accept}$ with $\epsilon$-transitions from all original FA's accept states.
    *   Ensure there's exactly one transition between any pair of states, labeled with a regular expression. If multiple transitions exist, combine their labels with `|`. If no transition exists, label it $\emptyset$. If there's a self-loop, label it $R^*$.

2.  **Eliminate states one by one:**
    *   Choose an intermediate state $q_k \in Q \setminus \{q_{start}, q_{accept}\}$ to eliminate.
    *   For every pair of states $q_i, q_j \in Q \setminus \{q_k\}$ (where $q_i \ne q_k, q_j \ne q_k$):
        Update the regular expression label $R_{ij}$ on the transition from $q_i$ to $q_j$ using the formula:
        $$ R_{ij}^{new} = R_{ij}^{old} \cup R_{ik} (R_{kk})^* R_{kj} $$
        Where:
        *   $R_{ij}^{old}$ is the current RE from $q_i$ to $q_j$.
        *   $R_{ik}$ is the RE from $q_i$ to $q_k$.
        *   $R_{kk}$ is the RE for the self-loop at $q_k$.
        *   $R_{kj}$ is the RE from $q_k$ to $q_j$.
        This formula captures paths from $q_i$ to $q_j$ that either don't go through $q_k$ ($R_{ij}^{old}$) OR go from $q_i$ to $q_k$, loop at $q_k$ zero or more times, and then go from $q_k$ to $q_j$.

3.  **Repeat:** Continue eliminating states until only $q_{start}$ and $q_{accept}$ remain.

4.  **Final Regular Expression:** The label on the single transition from $q_{start}$ to $q_{accept}$ is the regular expression for the language of the original FA.

**What could go wrong:**
*   **Algebraic errors:** The REs can become complex, leading to mistakes in concatenation, union, or Kleene star operations.
*   **Incorrect order of state elimination:** While the order doesn't affect correctness, choosing a smart order can simplify the algebra.
*   **Missing paths:** Forgetting to account for all possible paths that go through the eliminated state, or paths that don't.
*   **Handling $\epsilon$ and $\emptyset$:** Remember $\emptyset$ acts like zero in multiplication ($R \emptyset = \emptyset R = \emptyset$) and identity in union ($R \cup \emptyset = R$). $\epsilon$ acts like identity in concatenation ($R\epsilon = \epsilon R = R$).

### Step 5: Equivalence Conclusion

**Plain English:** Since we've shown a constructive method to go from any regular expression to an NFA (which can then be converted to a DFA) AND a constructive method to go from any FA (DFA or NFA) to a regular expression, we've definitively proven that regular expressions and finite automata have the exact same expressive power. They describe precisely the same class of languages: the regular languages.

**Formal Statement:**
Kleene's Theorem states: A language $L$ is regular if and only if there exists a regular expression $R$ such that $L = L(R)$, and if and only if there exists a finite automaton $M$ such that $L = L(M)$.
This means the set of languages described by regular expressions is exactly the same as the set of languages recognized by finite automata.
$$ \{L \mid L = L(R) \text{ for some RE } R\} = \{L \mid L = L(M) \text{ for some FA } M\} $$

**What could go wrong:** Not fully internalizing *why* the constructive proofs establish equivalence. It's not enough to just know the algorithms; understanding that they cover *all* possible cases (due to the inductive nature of the proofs) is key.

## 5. Worked examples — multiple, with every step shown

### Example 1 (Easy): RE to NFA

**Problem:** Construct an NFA for the regular expression $R = (a|b)^*$.

**Given:** Regular expression $R = (a|b)^*$.
**Want:** An NFA $N(R)$ that recognizes $L(R)$.

**Step-by-step construction using Thompson's:**

1.  **Construct $N(a)$:**
    We start with the base case for a single symbol $a$.
    $$ N(a) = \quad (s_a) \xrightarrow{a} ((f_a)) $$
    *Explanation:* This NFA has a start state $s_a$ and an accept state $f_a$. It transitions from $s_a$ to $f_a$ only upon reading the symbol 'a'. It accepts only the string "a".

2.  **Construct $N(b)$:**
    Similarly, for the symbol $b$.
    $$ N(b) = \quad (s_b) \xrightarrow{b} ((f_b)) $$
    *Explanation:* This NFA has a start state $s_b$ and an accept state $f_b$. It transitions from $s_b$ to $f_b$ only upon reading the symbol 'b'. It accepts only the string "b".

3.  **Construct $N(a|b)$ (Union):**
    Let $R_1 = a$ and $R_2 = b$. We apply the union rule for $N(R_1 \cup R_2)$.
    Create a new start state $s_{ab}$ and a new accept state $f_{ab}$.
    Add $\epsilon$-transitions from $s_{ab}$ to $s_a$ and $s_b$.
    Add $\epsilon$-transitions from $f_a$ and $f_b$ to $f_{ab}$.
    $$ N(a|b) = \quad (s_{ab}) \xrightarrow{\epsilon} (s_a) \xrightarrow{a} (f_a) \xrightarrow{\epsilon} ((f_{ab})) $$
    $$ \qquad \qquad \qquad \quad \quad \quad \quad \uparrow \epsilon \quad \downarrow \epsilon $$
    $$ \qquad \qquad \qquad \quad \quad \quad \quad \quad (s_b) \xrightarrow{b} (f_b) $$
    *Explanation:* The new start state $s_{ab}$ can non-deterministically choose to follow the path for 'a' or the path for 'b' via $\epsilon$-transitions. If either 'a' or 'b' is accepted, an $\epsilon$-transition leads to the new final state $f_{ab}$. This NFA accepts either "a" or "b".

4.  **Construct $N((a|b)^*)$ (Kleene Star):**
    Let $R_1 = (a|b)$. We apply the Kleene star rule for $N(R_1^*)$.
    Create a new start state $s_{(a|b)*}$ and a new accept state $f_{(a|b)*}$.
    Add an $\epsilon$-transition from $s_{(a|b)*}$ to $s_{ab}$ (the start of $N(a|b)$).
    Add an $\epsilon$-transition from $f_{ab}$ (the accept of $N(a|b)$) to $f_{(a|b)*}$.
    Add an $\epsilon$-transition from $f_{ab}$ back to $s_{ab}$ (for repetition).
    Add an $\epsilon$-transition from $s_{(a|b)*}$ directly to $f_{(a|b)*}$ (to accept $\epsilon$).
    $$ N((a|b)^*) = \quad (s_{(a|b)*}) \xrightarrow{\epsilon} (s_{ab}) \xrightarrow{\epsilon} (s_a) \xrightarrow{a} (f_a) \xrightarrow{\epsilon} (f_{ab}) \xrightarrow{\epsilon} ((f_{(a|b)*})) $$
    $$ \qquad \qquad \qquad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \uparrow \epsilon \quad \downarrow \epsilon \quad \uparrow \epsilon $$
    $$ \qquad \qquad \qquad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad (s_b) \xrightarrow{b} (f_b) $$
    $$ \qquad \qquad \qquad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \uparrow \epsilon $$
    $$ \qquad \qquad \qquad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad \quad