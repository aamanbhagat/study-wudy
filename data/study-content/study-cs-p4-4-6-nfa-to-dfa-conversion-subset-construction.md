## 1. What it is — in plain English

Imagine you're trying to follow a set of instructions. Sometimes, the instructions are very clear: "If you see a red light, stop. If you see a green light, go." There's no ambiguity, no choices to make. This is like a **Deterministic Finite Automaton (DFA)**. For any given situation and any input, there's only one specific next step.

Now, imagine a "choose your own adventure" book. "If you see a monster, you can either (A) run away, or (B) try to fight it." Or, "You can jump to page 10 *for free* without doing anything." Here, you might have multiple options for a single input, or even options that don't require any input at all. This is like a **Nondeterministic Finite Automaton (NFA)**. It can be in multiple "possible" states at once, or make choices without consuming input.

The "NFA to DFA conversion" is a way to take those fuzzy, choice-filled NFA instructions and turn them into a completely clear, unambiguous DFA instruction set. It means we're translating a machine that can explore multiple paths simultaneously into an equivalent machine that always knows exactly where it is and what to do next. The "subset construction" is the specific method we use for this translation.

Essentially, the DFA we build doesn't track a single NFA state; instead, it tracks *all possible NFA states* the original NFA could be in at any given moment. Each state in our new DFA is actually a *set* of states from the original NFA. This way, by following one clear path in the DFA, we are implicitly exploring all possible paths of the NFA at the same time.

## 2. Why it matters — real-world applications

The ability to convert NFAs to DFAs is fundamental in computer science, particularly in areas dealing with pattern matching and language recognition.

1.  **Regular Expression Engines (e.g., in text editors, programming languages):** When you use a regular expression like `a(b|c)*d` to search for patterns in text, the regex is often first converted into an NFA. While NFAs are easier to construct from regular expressions, they are generally slower to simulate directly because they might explore multiple paths. Converting this NFA to a DFA results in a machine that can recognize the pattern much faster. This optimized DFA is then used by tools like `grep`, `sed`, `awk`, or the regex libraries in Python, Java, or JavaScript to quickly find matches in large text files or codebases.

2.  **Lexical Analysis in Compilers:** The first phase of a compiler, the lexical analyzer (or "lexer"), breaks source code into a stream of tokens (keywords, identifiers, operators, etc.). The rules for these tokens are typically defined using regular expressions. These regexes are converted to NFAs, which are then converted to DFAs. The resulting DFA is a highly efficient state machine that can scan the input program character by character, identifying tokens with minimal computational overhead. This is crucial for the speed of compilation.

3.  **Network Protocol State Machines:** Many communication protocols (like TCP, HTTP) can be modeled as state machines. While a protocol specification might initially be described in a way that suggests multiple possible transitions from a given state (NFA-like ambiguity), for efficient implementation in network devices (routers, firewalls), these often need to be converted into a deterministic form (DFA) to ensure predictable and fast processing of incoming packets. This ensures that the device always knows the exact state of a connection and what actions to take.

4.  **Hardware Design and Verification:** In designing digital circuits, especially control units, state machines are frequently used. Sometimes, a high-level specification might be more easily expressed as an NFA. However, for actual hardware implementation, the circuit must behave deterministically. Converting the NFA specification to a DFA ensures that the hardware design is unambiguous and can be directly translated into logic gates. In verification, converting a non-deterministic model of a system to a deterministic one can help prove properties or detect deadlocks.

## 3. Prerequisites — what you must know first

Before diving into NFA to DFA conversion, ensure you have a solid understanding of the following concepts:

*   **Alphabet ($\Sigma$)**: A finite, non-empty set of input symbols. (e.g., $\{0, 1\}$, $\{a, b, c\}$).
*   **String**: A finite sequence of symbols from an alphabet. (e.g., "010", "aba").
*   **Language**: A set of strings. (e.g., the set of all binary strings ending with '0').
*   **Finite Automaton (FA)**: A mathematical model of computation that recognizes regular languages. It has a finite number of states and transitions between them based on input symbols.
*   **State**: A configuration or memory of the automaton at a given point in time.
*   **Transition**: A rule that dictates how the automaton moves from one state to another upon reading an input symbol.
*   **Start State ($q_0$)**: The unique state where the automaton begins processing an input string.
*   **Final (Accepting) States ($F$)**: A subset of states where, if the automaton ends up in one of these states after processing an entire string, the string is considered accepted.
*   **Deterministic Finite Automaton (DFA)**: A type of FA where, for each state and each input symbol, there is *exactly one* transition to a next state. No choices, no empty string transitions.
*   **Nondeterministic Finite Automaton (NFA)**: A type of FA where, for a given state and input symbol, there can be *zero, one, or multiple* transitions to next states. It can also have $\epsilon$-transitions.
*   **$\epsilon$-transition (Epsilon Transition)**: A special type of transition in an NFA that allows the automaton to move from one state to another *without consuming any input symbol*. It's like a "free jump."

## 4. The core idea — step by step

The core idea behind NFA to DFA conversion using subset construction is to simulate all possible paths an NFA could take by making each DFA state represent a *set* of NFA states.

Let's break it down. Suppose we have an NFA $N = (Q, \Sigma, \delta, q_0, F)$. We want to construct an equivalent DFA $D = (Q', \Sigma, \delta', q'_0, F')$.

### Step 1: The Intuition of "Reading All Possibilities"

**Plain-English Statement:** When an NFA reads an input symbol, it might have multiple choices for its next state, or it might be able to jump to other states "for free" using $\epsilon$-transitions. Our DFA needs to keep track of *all* these possibilities simultaneously.

**Concrete Example:** Imagine an NFA is in state $q_1$. When it reads an 'a', it could go to $q_2$ or $q_3$. Additionally, from $q_2$, it could immediately jump to $q_4$ via an $\epsilon$-transition. The DFA, upon reading 'a' from a state representing $q_1$, must transition to a state that represents $\{q_2, q_3, q_4\}$.

**Formal/Mathematical Version:** This step doesn't have a direct formal notation yet, as it's purely conceptual. It's about understanding that the DFA's "current state" must encapsulate the NFA's "current set of possible states."

**What could go wrong:** If you only track one possible path, you're not simulating the NFA correctly. The "nondeterminism" means choices *must* be explored.

### Step 2: States of the DFA are Sets of NFA States

**Plain-English Statement:** Since the DFA needs to remember all possible NFA states it could be in, each state in our new DFA will actually be a *collection* (a set) of states from the original NFA.

**Concrete Example:** If the NFA has states $\{q_0, q_1, q_2\}$, then a DFA state might be $\{q_0\}$, or $\{q_1, q_2\}$, or $\{q_0, q_1, q_2\}$, or even the empty set $\emptyset$.

**Formal/Mathematical Version:**
The set of states for the DFA, $Q'$, will be a subset of the power set of $Q$.
$$Q' \subseteq \mathcal{P}(Q)$$
where $\mathcal{P}(Q)$ is the power set of $Q$ (the set of all subsets of $Q$).
Each element $S \in Q'$ is a set of NFA states, $S \subseteq Q$.

**What could go wrong:** Confusing a DFA state (which is a set) with a single NFA state. Forgetting that the empty set is also a possible DFA state (representing no possible NFA paths).

### Step 3: Epsilon Closure (Crucial Pre-computation)

**Plain-English Statement:** Before processing any input symbol, an NFA can jump around using $\epsilon$-transitions without consuming any input. We need to know all the states reachable "for free" from any given state or set of states. This is called the "epsilon closure."

**Concrete Example:** If an NFA has states $q_0 \xrightarrow{\epsilon} q_1 \xrightarrow{\epsilon} q_2$, then $\epsilon\text{-closure}(q_0)$ would be $\{q_0, q_1, q_2\}$. If we start in $q_0$ and then read an 'a', we must consider that the NFA could have *first* moved to $q_1$ or $q_2$ before reading 'a'.

**Formal/Mathematical Version:**
For any state $q \in Q$, the $\epsilon\text{-closure}(q)$ is the set of all states reachable from $q$ by following zero or more $\epsilon$-transitions.
For any set of states $S \subseteq Q$, the $\epsilon\text{-closure}(S)$ is the set of all states reachable from any state in $S$ by following zero or more $\epsilon$-transitions.
$$ \epsilon\text{-closure}(S) = \{q' \in Q \mid \exists q \in S \text{ such that } q' \text{ is reachable from } q \text{ via zero or more } \epsilon\text{-transitions}\} $$

**What could go wrong:** Forgetting to include the starting state(s) in its own $\epsilon$-closure. Missing indirect $\epsilon$-transitions (e.g., $q_1 \xrightarrow{\epsilon} q_2 \xrightarrow{\epsilon} q_3$, missing $q_3$ from $\epsilon\text{-closure}(q_1)$).

### Step 4: Defining the Start State of the DFA

**Plain-English Statement:** The DFA starts by simulating all possible NFA states reachable from the NFA's start state, including any free $\epsilon$-jumps.

**Concrete Example:** If the NFA's start state is $q_0$, and $q_0 \xrightarrow{\epsilon} q_1$, then the DFA's start state $q'_0$ will be the set $\{q_0, q_1\}$.

**Formal/Mathematical Version:**
The start state of the DFA, $q'_0$, is the $\epsilon\text{-closure}$ of the NFA's start state $q_0$.
$$q'_0 = \epsilon\text{-closure}(q_0)$$

**What could go wrong:** Setting $q'_0$ to just $\{q_0\}$ without considering $\epsilon$-transitions.

### Step 5: Defining Transitions for the DFA

**Plain-English Statement:** To figure out where the DFA goes from a state $S$ (which is a set of NFA states) on input $a$:
1.  Imagine the NFA is in *any* of the states within $S$.
2.  From each of those NFA states, follow all possible transitions on input $a$.
3.  Collect *all* the NFA states reached this way.
4.  Finally, take the $\epsilon$-closure of this collected set of states. This final set is the new DFA state.

**Concrete Example:** Let DFA state $S = \{q_1, q_2\}$. On input 'a':
*   From $q_1$, NFA goes to $q_3$.
*   From $q_2$, NFA goes to $q_4$ and $q_5$.
*   So, we've reached $\{q_3, q_4, q_5\}$.
*   Now, take the $\epsilon\text{-closure}(\{q_3, q_4, q_5\})$. If $q_4 \xrightarrow{\epsilon} q_6$, then the new DFA state is $\{q_3, q_4, q_5, q_6\}$.

**Formal/Mathematical Version:**
For a DFA state $S \in Q'$ and an input symbol $a \in \Sigma$, the transition function $\delta'$ is defined as:
$$ \delta'(S, a) = \epsilon\text{-closure}\left(\bigcup_{q \in S} \delta(q, a)\right) $$
Here, $\delta(q, a)$ is the NFA's transition function, which returns a set of states. The union $\bigcup_{q \in S} \delta(q, a)$ collects all states reachable from *any* state in $S$ by reading $a$.

**What could go wrong:** Forgetting to take the $\epsilon$-closure *after* following the 'a' transitions. Only considering transitions from one state in $S$ instead of all of them.

### Step 6: Defining Final States for the DFA

**Plain-English Statement:** A DFA state is a final (accepting) state if *any* of the NFA states it represents is an original NFA final state. If the NFA could possibly end up in an accepting state, then the DFA should accept.

**Concrete Example:** If $F_{NFA} = \{q_2\}$, and a DFA state is $S = \{q_0, q_1, q_2\}$, then $S$ is a final state because $q_2 \in S$ and $q_2 \in F_{NFA}$.

**Formal/Mathematical Version:**
The set of final states for the DFA, $F'$, is:
$$ F' = \{S \in Q' \mid S \cap F \neq \emptyset\} $$
That is, any DFA state $S$ is a final state if it contains at least one NFA final state.

**What could go wrong:** Requiring *all* NFA states in $S$ to be final states.

### Step 7: The Algorithm (Subset Construction)

**Plain-English Statement:** We start with the DFA's initial state (the $\epsilon$-closure of the NFA's start state). Then, for each new DFA state we discover and for each input symbol, we calculate where the DFA would go next using the transition rule. We keep doing this until no new DFA states are discovered.

**Algorithm Steps:**
1.  **Initialize:**
    *   $Q' = \emptyset$ (set of DFA states)
    *   $\text{Dstates} = \{q'_0\}$ (set of DFA states to process, initially just the start state)
    *   $q'_0 = \epsilon\text{-closure}(q_0)$
    *   $\delta' = \emptyset$ (DFA transition function)
2.  **Loop:** While $\text{Dstates}$ is not empty:
    *   Remove a state $S$ from $\text{Dstates}$.
    *   Add $S$ to $Q'$.
    *   For each input symbol $a \in \Sigma$:
        *   Calculate $S_a = \epsilon\text{-closure}\left(\bigcup_{q \in S} \delta(q, a)\right)$.
        *   If $S_a$ is not in $Q'$ and not in $\text{Dstates}$ yet, add $S_a$ to $\text{Dstates}$.
        *   Add the transition $(S, a, S_a)$ to $\delta'$.
3.  **Final States:**
    *   $F' = \{S \in Q' \mid S \cap F \neq \emptyset\}$.
4.  **Result:** The DFA is $D = (Q', \Sigma, \delta', q'_0, F')$.

**What could go wrong:** Forgetting to add newly discovered states to the set of states to be processed. Incorrectly calculating $\epsilon$-closures or transitions, leading to an incomplete or incorrect DFA.

## 5. Worked examples — multiple, with every step shown

We will use the notation $q_i$ for NFA states and $\{q_i, q_j, ...\}$ for DFA states. The NFA transition function is $\delta$, and the DFA transition function is $\delta'$.

### Example 1: Simple NFA without $\epsilon$-transitions

**Problem:** Convert the following NFA to an equivalent DFA.
NFA $N = (\{q_0, q_1, q_2\}, \{0, 1\}, \delta, q_0, \{q_2\})$
Transitions $\delta$:
*   $\delta(q_0, 0) = \{q_0\}$
*   $\delta(q_0, 1) = \{q_0, q_1\}$
*   $\delta(q_1, 0) = \{q_2\}$
*   $\delta(q_1, 1) = \{q_2\}$
*   $\delta(q_2, 0) = \emptyset$
*   $\delta(q_2, 1) = \emptyset$

**Given:**
*   NFA states $Q = \{q_0, q_1, q_2\}$
*   Alphabet $\Sigma = \{0, 1\}$
*   Start state $q_0$
*   Final state $F = \{q_2\}$
*   Transition function $\delta$ as defined above.

**Want:** An equivalent DFA $D = (Q', \Sigma, \delta', q'_0, F')$.

---

**Step 1: Calculate $\epsilon$-closures for all NFA states.**
Since there are no $\epsilon$-transitions in this NFA, the $\epsilon$-closure of any state $q$ is just $\{q\}$.
*   $\epsilon\text{-closure}(q_0) = \{q_0\}$
*   $\epsilon\text{-closure}(q_1) = \{q_1\}$
*   $\epsilon\text{-closure}(q_2) = \{q_2\}$

**Step 2: Determine the DFA's start state.**
$q'_0 = \epsilon\text{-closure}(q_0)$
$q'_0 = \{q_0\}$
*This is the first DFA state we'll process.* Let's call it $A = \{q_0\}$.
DFA states to process: $\{A\}$
DFA states found: $\{A\}$
DFA transitions: $\emptyset$

**Step 3: Build the DFA transition table.**
We will systematically process each discovered DFA state for each input symbol.

**State A = $\{q_0\}$**
*   **On input '0':**
    *   $\delta'(A, 0) = \epsilon\text{-closure}(\bigcup_{q \in A} \delta(q, 0))$
    *   $= \epsilon\text{-closure}(\delta(q_0, 0))$
    *   $= \epsilon\text{-closure}(\{q_0\})$
    *   $= \{q_0\}$
    *   This is state $A$. So, $\delta'(A, 0) = A$.
    *   *Explanation: From NFA state $q_0$, on input '0', we only go to $q_0$. The $\epsilon$-closure of $\{q_0\}$ is just $\{q_0\}$ since there are no $\epsilon$-transitions.*
*   **On input '1':**
    *   $\delta'(A, 1) = \epsilon\text{-closure}(\bigcup_{q \in A} \delta(q, 1))$
    *   $= \epsilon\text{-closure}(\delta(q_0, 1))$
    *   $= \epsilon\text{-closure}(\{q_0, q_1\})$
    *   $= \{q_0, q_1\}$
    *   This is a *new* state. Let's call it $B = \{q_0, q_1\}$.
    *   Add $B$ to states to process. So, $\delta'(A, 1) = B$.
    *   *Explanation: From NFA state $q_0$, on input '1', we go to $q_0$ and $q_1$. The $\epsilon$-closure of $\{q_0, q_1\}$ is just $\{q_0, q_1\}$.*

DFA states to process: $\{B\}$
DFA states found: $\{A, B\}$
DFA transitions: $(A, 0, A)$, $(A, 1, B)$

**State B = $\{q_0, q_1\}$**
*   **On input '0':**
    *   $\delta'(B, 0) = \epsilon\text{-closure}(\bigcup_{q \in B} \delta(q, 0))$
    *   $= \epsilon\text{-closure}(\delta(q_0, 0) \cup \delta(q_1, 0))$
    *   $= \epsilon\text{-closure}(\{q_0\} \cup \{q_2\})$
    *   $= \epsilon\text{-closure}(\{q_0, q_2\})$
    *   $= \{q_0, q_2\}$
    *   This is a *new* state. Let's call it $C = \{q_0, q_2\}$.
    *   Add $C$ to states to process. So, $\delta'(B, 0) = C$.
    *   *Explanation: From $q_0$ on '0' we go to $q_0$. From $q_1$ on '0' we go to $q_2$. Union is $\{q_0, q_2\}$. No $\epsilon$-transitions.*
*   **On input '1':**
    *   $\delta'(B, 1) = \epsilon\text{-closure}(\bigcup_{q \in B} \delta(q, 1))$
    *   $= \epsilon\text{-closure}(\delta(q_0, 1) \cup \delta(q_1, 1))$
    *   $= \epsilon\text{-closure}(\{q_0, q_1\} \cup \{q_2\})$
    *   $= \epsilon\text{-closure}(\{q_0, q_1, q_2\})$
    *   $= \{q_0, q_1, q_2\}$
    *   This is a *new* state. Let's call it $D = \{q_0, q_1, q_2\}$.
    *   Add $D$ to states to process. So, $\delta'(B, 1) = D$.
    *   *Explanation: From $q_0$ on '1' we go to $q_0, q_1$. From $q_1$ on '1' we go to $q_2$. Union is $\{q_0, q_1, q_2\}$. No $\epsilon$-transitions.*

DFA states to process: $\{C, D\}$
DFA states found: $\{A, B, C, D\}$
DFA transitions: $(A, 0, A)$, $(A, 1, B)$, $(B, 0, C)$, $(B, 1, D)$

**State C = $\{q_0, q_2\}$**
*   **On input '0':**
    *   $\delta'(C, 0) = \epsilon\text{-closure}(\bigcup_{q \in C} \delta(q, 0))$
    *   $= \epsilon\text{-closure}(\delta(q_0, 0) \cup \delta(q_2, 0))$
    *   $= \epsilon\text{-closure}(\{q_0\} \cup \emptyset)$
    *   $= \epsilon\text{-closure}(\{q_0\})$
    *   $= \{q_0\}$
    *   This is state $A$. So, $\delta'(C, 0) = A$.
    *   *Explanation: From $q_0$ on '0' we go to $q_0$. From $q_2$ on '0' we go nowhere. Union is $\{q_0\}$. No $\epsilon$-transitions.*
*   **On input '1':**
    *   $\delta'(C, 1) = \epsilon\text{-closure}(\bigcup_{q \in C} \delta(q, 1))$
    *   $= \epsilon\text{-closure}(\delta(q_0, 1) \cup \delta(q_2, 1))$
    *   $= \epsilon\text{-closure}(\{q_0, q_1\} \cup \emptyset)$
    *   $= \epsilon\text{-closure}(\{q_0, q_1\})$
    *   $= \{q_0, q_1\}$
    *   This is state $B$. So, $\delta'(C, 1) = B$.
    *   *Explanation: From $q_0$ on '1' we go to $q_0, q_1$. From $q_2$ on '1' we go nowhere. Union is $\{q_0, q_1\}$. No $\epsilon$-transitions.*

DFA states to process: $\{D\}$
DFA states found: $\{A, B, C, D\}$
DFA transitions: $(A, 0, A)$, $(A, 1, B)$, $(B, 0, C)$, $(B, 1, D)$, $(C, 0, A)$, $(C, 1, B)$

**State D = $\{q_0, q_1, q_2\}$**
*   **On input '0':**
    *   $\delta'(D, 0) = \epsilon\text{-closure}(\bigcup_{q \in D} \delta(q, 0))$
    *   $= \epsilon\text{-closure}(\delta(q_0, 0) \cup \delta(q_1, 0) \cup \delta(q_2, 0))$
    *   $= \epsilon\text{-closure}(\{q_0\} \cup \{q_2\} \cup \emptyset)$
    *   $= \epsilon\text{-closure}(\{q_0, q_2\})$
    *   $= \{q_0, q_2\}$
    *   This is state $C$. So, $\delta'(D, 0) = C$.
    *   *Explanation: From $q_0$ on '0' to $q_0$. From $q_1$ on '0' to $q_2$. From $q_2$ on '0' nowhere. Union is $\{q_0, q_2\}$. No $\epsilon$-transitions.*
*   **On input '1':**
    *   $\delta'(D, 1) = \epsilon\text{-closure}(\bigcup_{q \in D} \delta(q, 1))$
    *   $= \epsilon\text{-closure}(\delta(q_0, 1) \cup \delta(q_1, 1) \cup \delta(q_2, 1))$
    *   $= \epsilon\text{-closure}(\{q_0, q_1\} \cup \{q_2\} \cup \emptyset)$
    *   $= \epsilon\text{-closure}(\{q_0, q_1, q_2\})$
    *   $= \{q_0, q_1, q_2\}$
    *   This is state $D$. So, $\delta'(D, 1) = D$.
    *   *Explanation: From $q_0$ on '1' to $q_0, q_1$. From $q_1$ on '1' to $q_2$. From $q_2$ on '1' nowhere. Union is $\{q_0, q_1, q_2\}$. No $\epsilon$-transitions.*

DFA states to process: $\emptyset$ (All states processed)
DFA states found: $\{A, B, C, D\}$
DFA transitions: $(A, 0, A)$, $(A, 1, B)$, $(B, 0, C)$, $(B, 1, D)$, $(C, 0, A)$, $(C, 1, B)$, $(D, 0, C)$, $(D, 1, D)$

**Step 4: Determine the DFA's final states.**
The NFA's final state is $q_2$. Any DFA state that contains $q_2$ is a final state.
*   $A = \{q_0\}$ (No $q_2$)
*   $B = \{q_0, q_1\}$ (No $q_2$)
*   $C = \{q_0, q_2\}$ (Contains $q_2$) $\implies C$ is a final state.
*   $D = \{q_0, q_1, q_2\}$ (Contains $q_2$) $\implies D$ is a final state.
So, $F' = \{C, D\}$.

**Final Answer:**
The equivalent DFA is $D = (\{A, B, C, D\}, \{0, 1\}, \delta', A, \{C, D\})$, where:
*   $A = \{q_0\}$
*   $B = \{q_0, q_1\}$
*   $C = \{q_0, q_2\}$
*   $D = \{q_0, q_1, q_2\}$

And the transition function $\delta'$ is:
| State | 0 | 1 |
| :---- | :- | :- |
| $A$   | $A$ | $B$ |
| $B$   | $C$ | $D$ |
| $C$   | $A$ | $B$ |
| $D$   | $C$ | $D$ |

**Reflection:** This example was straightforward because there were no $\epsilon$-transitions, simplifying the $\epsilon$-closure calculations. The main challenge was systematically exploring all reachable DFA states and their transitions.

---

### Example 2: NFA with $\epsilon$-transitions

**Problem:** Convert the following NFA to an equivalent DFA.
NFA $N = (\{q_0, q_1, q_2\}, \{a, b\}, \delta, q_0, \{q_2\})$
Transitions $\delta$:
*   $\delta(q_0, a) = \{q_0\}$
*   $\delta(q_0, \epsilon) = \{q_1\}$
*   $\delta(q_1, b) = \{q_2\}$
*   $\delta(q_1, \epsilon) = \{q_2\}$
*   $\delta(q_2, a) = \emptyset$
*   $\delta(q_2, b) = \emptyset$

**Given:**
*   NFA states $Q = \{q_0, q_1, q_2\}$
*   Alphabet $\Sigma = \{a, b\}$
*   Start state $q_0$
*   Final state $F = \{q_2\}$
*   Transition function $\delta$ as defined above.

**Want:** An equivalent DFA $D = (Q', \Sigma, \delta', q'_0, F')$.

---

**Step 1: Calculate $\epsilon$-closures for all NFA states.**
*   $\epsilon\text{-closure}(q_0)$: From $q_0$, we can reach $q_0$ (0 $\epsilon$-transitions), and $q_1$ (via $\epsilon$). From $q_1$, we can reach $q_2$ (via $\epsilon$). So, $\epsilon\text{-closure}(q_0) = \{q_0, q_1, q_2\}$.
*   $\epsilon\text{-closure}(q_1)$: From $q_1$, we can reach $q_1$ (0 $\epsilon$-transitions), and $q_2$ (via $\epsilon$). So, $\epsilon\text{-closure}(q_1) = \{q_1, q_2\}$.
*   $\epsilon\text{-closure}(q_2)$: From $q_2$, we can reach $q_2$ (0 $\epsilon$-transitions). No outgoing $\epsilon$-transitions. So, $\epsilon\text{-closure}(q_2) = \{q_2\}$.

**Step 2: Determine the DFA's start state.**
$q'_0 = \epsilon\text{-closure}(q_0)$
$q'_0 = \{q_0, q_1, q_2\}$
*This is the first DFA state we'll process.* Let's call it $A = \{q_0, q_1, q_2\}$.
DFA states to process: $\{A\}$
DFA states found: $\{A\}$
DFA transitions: $\emptyset$

**Step 3: Build the DFA transition table.**

**State A = $\{q_0, q_1, q_2\}$**
*   **On input 'a':**
    *   $\delta'(A, a) = \epsilon\text{-closure}(\bigcup_{q \in A} \delta(q, a))$
    *   $= \epsilon\text{-closure}(\delta(q_0, a) \cup \delta(q_1, a) \cup \delta(q_2, a))$
    *   $= \epsilon\text{-closure}(\{q_0\} \cup \emptyset \cup \emptyset)$
    *   $= \epsilon\text{-closure}(\{q_0\})$
    *   $= \{q_0, q_1, q_2\}$ (from Step 1)
    *   This is state $A$. So, $\delta'(A, a) = A$.
    *   *Explanation: From $q_0$ on 'a' goes to $q_0$. From $q_1, q_2$ on 'a' goes nowhere. Union is $\{q_0\}$. Then take $\epsilon$-closure of $\{q_0\}$, which is $\{q_0, q_1, q_2\}$.*
*   **On input 'b':**
    *   $\delta'(A, b) = \epsilon\text{-closure}(\bigcup_{q \in A} \delta(q, b))$
    *   $= \epsilon\text{-closure}(\delta(q_0, b) \cup \delta(q_1, b) \cup \delta(q_2, b))$
    *   $= \epsilon\text{-closure}(\emptyset \cup \{q_2\} \cup \emptyset)$
    *   $= \epsilon\text{-closure}(\{q_2\})$
    *   $= \{q_2\}$ (from Step 1)
    *   This is a *new* state. Let's call it $B = \{q_2\}$.
    *   Add $B$ to states to process. So, $\delta'(A, b) = B$.
    *   *Explanation: From $q_0$ on 'b' goes nowhere. From $q_1$ on 'b' goes to $q_2$. From $q_2$ on 'b' goes nowhere. Union is $\{q_2\}$. Then take $\epsilon$-closure of $\{q_2\}$, which is $\{q_2\}$.*

DFA states to process: $\{B\}$
DFA states found: $\{A, B\}$
DFA transitions: $(A, a, A)$, $(A, b, B)$

**State B = $\{q_2\}$**
*   **On input 'a':**
    *   $\delta'(B, a) = \epsilon\text{-closure}(\bigcup_{q \in B} \delta(q, a))$
    *   $= \epsilon\text{-closure}(\delta(q_2, a))$
    *   $= \epsilon\text{-closure}(\emptyset)$
    *   $= \emptyset$
    *   This is a *new* state. Let's call it $C = \emptyset$.
    *   Add $C$ to states to process. So, $\delta'(B, a) = C$.
    *   *Explanation: From $q_2$ on 'a' goes nowhere. $\epsilon$-closure of empty set is empty set.*
*   **On input 'b':**
    *   $\delta'(B, b) = \epsilon\text{-closure}(\bigcup_{q \in B} \delta(q, b))$
    *   $= \epsilon\text{-closure}(\delta(q_2, b))$
    *   $= \epsilon\text{-closure}(\emptyset)$
    *   $= \emptyset$
    *   This is state $C$. So, $\delta'(B, b) = C$.
    *   *Explanation: From $q_2$ on 'b' goes nowhere. $\epsilon$-closure of empty set is empty set.*

DFA states to process: $\{C\}$
DFA states found: $\{A, B, C\}$
DFA transitions: $(A, a, A)$, $(A, b, B)$, $(B, a, C)$, $(B, b, C)$

**State C = $\emptyset$ (The "dead" state)**
*   **On input 'a':**
    *   $\delta'(C, a) = \epsilon\text{-closure}(\bigcup_{q \in C} \delta(q, a))$
    *   $= \epsilon\text{-closure}(\emptyset)$
    *   $= \emptyset$
    *   This is state $C$. So, $\delta'(C, a) = C$.
    *   *Explanation: From no NFA states, on any input, we go to no NFA states. $\epsilon$-closure of empty set is empty set.*
*   **On input 'b':**
    *   $\delta'(C, b) = \epsilon\text{-closure}(\bigcup_{q \in C} \delta(q, b))$
    *   $= \epsilon\text{-closure}(\emptyset)$
    *   $= \emptyset$
    *   This is state $C$. So, $\delta'(C, b) = C$.
    *   *Explanation: Same as above.*

DFA states to process: $\emptyset$ (All states processed)
DFA states found: $\{A, B, C\}$
DFA transitions: $(A, a, A)$, $(A, b, B)$, $(B, a, C)$, $(B, b, C)$, $(C, a, C)$, $(C, b, C)$

**Step 4: Determine the DFA's final states.**
The NFA's final state is $q_2$. Any DFA state that contains $q_2$ is a final state.
*   $A = \{q_0, q_1, q_2\}$ (Contains $q_2$) $\implies A$ is a final state.
*   $B = \{q_2\}$ (Contains $q_2$) $\implies B$ is a final state.
*   $C = \emptyset$ (No $q_2$)
So, $F' = \{A, B\}$.

**Final Answer:**
The equivalent DFA is $D = (\{A, B, C\}, \{a, b\}, \delta', A, \{A, B\})$, where:
*   $A = \{q_0, q_1, q_2\}$
*   $B = \{q_2\}$
*   $C = \emptyset$

And the transition function $\delta'$ is:
| State | a | b |
| :---- | :- | :- |
| $A$   | $A$ | $B$ |
| $B$   | $C$ | $C$ |
| $C$   | $C$ | $C$ |

**Reflection:** The presence of $\epsilon$-transitions made the $\epsilon$-closure calculation crucial, especially for the start state. Also, the empty set $\emptyset$ naturally emerged as a "dead state" in the DFA.

---

### Example 3: NFA for "strings containing 'ab' or 'ba'"

**Problem:** Convert the following NFA to an equivalent DFA.
NFA $N = (\{q_0, q_1, q_2, q_3, q_4\}, \{a, b\}, \delta, q_0, \{q_4\})$
Transitions $\delta$:
*   $\delta(q_0, \epsilon) = \{q_1, q_3\}$
*   $\delta(q_1, a) = \{q_2\}$
*   $\delta(q_2, b) = \{q_4\}$
*   $\delta(q_3, b) = \{q_2\}$ (Note: this should be $q_3 \xrightarrow{b} q_4$ for 'ba' or $q_3 \xrightarrow{b} q_2$ which is odd. Let's adjust for a common pattern: `(a|b)*ab(a|b)*` or `(a|b)*ba(a|b)*`. A more typical NFA for "contains 'ab' or 'ba'" would have $q_0 \xrightarrow{\epsilon} q_1$ and $q_0 \xrightarrow{\epsilon} q_3$. $q_1$ leads to 'ab', $q_3$ leads to 'ba'. Let's redefine for clarity.)

Let's use a simpler NFA for "strings ending with 01". This is a classic example that often results in a larger DFA.

**Problem (Revised):** Convert the NFA recognizing strings ending with "01" to a DFA.
NFA $N = (\{q_0, q_1, q_2\}, \{0, 1\}, \delta, q_0, \{q_2\})$
Transitions $\delta$:
*   $\delta(q_0, 0) = \{q_0, q_1\}$
*   $\delta(q_0, 1) = \{q_0\}$
*   $\delta(q_1, 1) = \{q_2\}$
*   All other transitions are to $\emptyset$.

**Given:**
*   NFA states $Q = \{q_0, q_1, q_2\}$
*   Alphabet $\Sigma = \{0, 1\}$
*   Start state $q_0$
*   Final state $F = \{q_2\}$
*   Transition function $\delta$ as defined above. (No $\epsilon$-transitions here, simplifying $\epsilon$-closure).

**Want:** An equivalent DFA $D = (Q', \Sigma, \delta', q'_0, F')$.

---

**Step 1: Calculate $\epsilon$-closures for all NFA states.**
No $\epsilon$-transitions, so $\epsilon\text{-closure}(q_i) = \{q_i\}$ for all $q_i \in Q$.

**Step 2: Determine the DFA's start state.**
$q'_0 = \epsilon\text{-closure}(q_0) = \{q_0\}$.
Let $A = \{q_0\}$.
DFA states to process: $\{A\}$
DFA states found: $\{A\}$
DFA transitions: $\emptyset$

**Step 3: Build the DFA transition table.**

**State A = $\{q_0\}$**
*   **On input '0':**
    *   $\delta'(A, 0) = \epsilon\text{-closure}(\delta(q_0, 0)) = \epsilon\text{-closure}(\{q_0, q_1\}) = \{q_0, q_1\}$.
    *   New state: $B = \{q_0, q_1\}$. Add $B$ to states to process. So, $\delta'(A, 0) = B$.
*   **On input '1':**
    *   $\delta'(A, 1) = \epsilon\text{-closure}(\delta(q_0, 1)) = \epsilon\text{-closure}(\{q_0\}) = \{q_0\}$.
    *   This is state $A$. So, $\delta'(A, 1) = A$.

DFA states to process: $\{B\}$
DFA states found: $\{A, B\}$
DFA transitions: $(A, 0, B)$, $(A, 1, A)$

**State B = $\{q_0, q_1\}$**
*   **On input '0':**
    *   $\delta'(B, 0) = \epsilon\text{-closure}(\delta(q_0, 0) \cup \delta(q_1, 0))$
    *   $= \epsilon\text{-closure}(\{q_0, q_1\} \cup \emptyset)$
    *   $= \{q_0, q_1\}$.
    *   This is state $B$. So, $\delta'(B, 0) = B$.
*   **On input '1':**
    *   $\delta'(B, 1) = \epsilon\text{-closure}(\delta(q_0, 1) \cup \delta(q_1, 1))$
    *   $= \epsilon\text{-closure}(\{q_0\} \cup \{q_2\})$
    *   $= \{q_0, q_2\}$.
    *   New state: $C = \{q_0, q_2\}$. Add $C$ to states to process. So, $\delta'(B, 1) = C$.

DFA states to process: $\{C\}$
DFA states found: $\{A, B, C\}$
DFA transitions: $(A, 0, B)$, $(A, 1, A)$, $(B, 0, B)$, $(B, 1, C)$

**State C = $\{q_0, q_2\}$**
*   **On input '0':**
    *   $\delta'(C, 0) = \epsilon\text{-closure}(\delta(q_0, 0) \cup \delta(q_2, 0))$
    *   $= \epsilon\text{-closure}(\{q_0, q_1\} \cup \emptyset)$
    *   $= \{q_0, q_1\}$.
    *   This is state $B$. So, $\delta'(C, 0) = B$.
*   **On input '1':**
    *   $\delta'(C, 1) = \epsilon\text{-closure}(\delta(q_0, 1) \cup \delta(q_2, 1))$
    *   $= \epsilon\text{-closure}(\{q_0\} \cup \emptyset)$
    *   $= \{q_0\}$.
    *   This is state $A$. So, $\delta'(C, 1) = A$.

DFA states to process: $\emptyset$ (All states processed)
DFA states found: $\{A, B, C\}$
DFA transitions: $(A, 0, B)$, $(A, 1, A)$, $(B, 0, B)$, $(B, 1, C)$, $(C, 0, B)$, $(C, 1, A)$

**Step 4: Determine the DFA's final states.**
The NFA's final state is $q_2$. Any DFA state that contains $q_2$ is a final state.
*   $A = \{q_0\}$ (No $q_2$)
*   $B = \{q_0, q_1\}$ (No $q_2$)
*   $C = \{q_0, q_2\}$ (Contains $q_2$) $\implies C$ is a final state.
So, $F' = \{C\}$.

**Final Answer:**
The equivalent DFA is $D = (\{A, B, C\}, \{0, 1\}, \delta', A, \{C\})$, where:
*   $A = \{q_0\}$
*   $B = \{q_0, q_1\}$
*   $C = \{q_0, q_2\}$

And the transition function $\delta'$ is:
| State | 0 | 1 |
| :---- | :- | :- |
| $A$   | $B$ | $A$ |
| $B$   | $B$ | $C$ |
| $C$   | $B$ | $A$ |

**Reflection:** This example demonstrates how a relatively small NFA (3 states) can lead to a DFA with a similar number of states, but the states themselves are combinations of NFA states. The NFA's ability to "guess" when to transition to $q_1$ (to look for '01') is captured by the DFA states.

---

### Example 4: NFA with multiple $\epsilon$-transitions leading to a more complex structure

**Problem:** Convert the following NFA to an equivalent DFA.
NFA $N = (\{q_0, q_1, q_2, q_3\}, \{a, b\}, \delta, q_0, \{q_3\})$
Transitions $\delta$:
*   $\delta(q_0, \epsilon) = \{q_1, q_3\}$
*   $\delta(q_1, a) = \{q_1\}$
*   $\delta(q_1, b) = \{q_2\}$
*   $\delta(q_2, \epsilon) = \{q_1\}$
*   $\delta(q_3, b) = \{q_3\}$

**Given:**
*   NFA states $Q = \{q_0, q_1, q_2, q_3\}$
*   Alphabet $\Sigma = \{a, b\}$
*   Start state $q_0$
*   Final state $F = \{q_3\}$
*   Transition function $\delta$ as defined above.

**Want:** An equivalent DFA $D = (Q', \Sigma, \delta', q'_0, F')$.

---

**Step 1: Calculate $\epsilon$-closures for all NFA states.**
*   $\epsilon\text{-closure}(q_0)$: From $q_0$, we can go to $q_0$, $q_1$, $q_3$. From $q_1$, we can go to $q_2$ (via $b$), but we're looking for $\epsilon$-transitions. From $q_1$, there are no $\epsilon$-transitions. From $q_2$, there is an $\epsilon$-transition to $q_1$.
    *   Initial: $\{q_0\}$
    *   Add $\delta(q_0, \epsilon)$: $\{q_0, q_1, q_3\}$
    *   Check for new $\epsilon$-transitions from $q_1$: None.
    *   Check for new $\epsilon$-transitions from $q_3$: None.
    *   So, $\epsilon\text{-closure}(q_0) = \{q_0, q_1, q_3\}$.
*   $\epsilon\text{-closure}(q_1)$: From $q_1$, no $\epsilon$-transitions. So, $\epsilon\text{-closure}(q_1) = \{q_1\}$.
*   $\epsilon\text{-closure}(q_2)$: From $q_2$, we can go to $q_2$ (0 $\epsilon$-transitions), and $q_1$ (via $\epsilon$). From $q_1$, no $\epsilon$-transitions. So, $\epsilon\text{-closure}(q_2) = \{q_1, q_2\}$.
*   $\epsilon\text{-closure}(q_3)$: From $q_3$, no $\epsilon$-transitions. So, $\epsilon\text{-closure}(q_3) = \{q_3\}$.

**Step 2: Determine the DFA's start state.**
$q'_0 = \epsilon\text{-closure}(q_0) = \{q_0, q_1, q_3\}$.
Let $A = \{q_0, q_1, q_3\}$.
DFA states to process: $\{A\}$
DFA states found: $\{A\}$
DFA transitions: $\emptyset$

**Step 3: Build the DFA transition table.**

**State A = $\{q_0, q_1, q_3\}$**
*   **On input 'a':**
    *   $\delta'(A, a) = \epsilon\text{-closure}(\delta(q_0, a) \cup \delta(q_1, a) \cup \delta(q_3, a))$
    *   $= \epsilon\text{-closure}(\emptyset \cup \{q_1\} \cup \emptyset)$
    *   $= \epsilon\text{-closure}(\{q_1\})$
    *   $= \{q_1\}$ (from Step 1)
    *   New state: $B = \{q_1\}$. Add $B$ to states to process. So, $\delta'(A, a) = B$.
*   **On input 'b':**
    *   $\delta'(A, b) = \epsilon\text{-closure}(\delta(q_0, b) \cup \delta(q_1, b) \cup \delta(q_3, b))$
    *   $= \epsilon\text{-closure}(\emptyset \cup \{q_2\} \cup \{q_3\})$
    *   $= \epsilon\text{-closure}(\{q_2, q_3\})$
    *   To calculate $\epsilon\text{-closure}(\{q_2, q_3\})$:
        *   Start with $\{q_2, q_3\}$.
        *   From $q_2$, add $\epsilon\text{-closure}(q_2) = \{q_1, q_2\}$.
        *   From $q_3$, add $\epsilon\text{-closure}(q_3) = \{q_3\}$.
        *   Union of these is $\{q_1, q_2, q_3\}$.
    *   So, $\delta'(A, b) = \{q_1, q_2, q_3\}$.
    *   New state: $C = \{q_1, q_2, q_3\}$. Add $C$ to states to process. So, $\delta'(A, b) = C$.

DFA states to process: $\{B, C\}$
DFA states found: $\{A, B, C\}$
DFA transitions: $(A, a, B)$, $(A, b, C)$

**State B = $\{q_1\}$**
*   **On input 'a':**
    *   $\delta'(B, a) = \epsilon\text{-closure}(\delta(q_1, a))$
    *   $= \epsilon\text{-closure}(\{q_1\})$
    *   $= \{q_1\}$
    *   This is state $B$. So, $\delta'(B, a) = B$.
*   **On input 'b':**
    *   $\delta'(B, b) = \epsilon\text{-closure}(\delta(q_1, b))$
    *   $= \epsilon\text{-closure}(\{q_2\})$
    *   $= \{q_1, q_2\}$ (from Step 1)
    *   New state: $D = \{q_1, q_2\}$. Add $D$ to states to process. So, $\delta'(B, b) = D$.

DFA states to process: $\{C, D\}$
DFA states found: $\{A, B, C, D\}$
DFA transitions: $(A, a, B)$, $(A, b, C)$, $(B, a, B)$, $(B, b, D)$

**State C = $\{q_1, q_2, q_3\}$**
*   **On input 'a':**
    *   $\delta'(C, a) = \epsilon\text{-closure}(\delta(q_1, a) \cup \delta(q_2, a) \cup \delta(q_3, a))$
    *   $= \epsilon\text{-closure}(\{q_1\} \cup \emptyset \cup \emptyset)$
    *   $= \epsilon\text{-closure}(\{q_1\})$
    *   $= \{q_1\}$
    *   This is state $B$. So, $\delta'(C, a) = B$.
*   **On input 'b':**
    *   $\delta'(C, b) = \epsilon\text{-closure}(\delta(q_1, b) \cup \delta(q_2, b) \cup \delta(q_3, b))$
    *   $= \epsilon\text{-closure}(\{q_2\} \cup \emptyset \cup \{q_3\})$
    *   $= \epsilon\text{-closure}(\{q_2, q_3\})$
    *   $= \{q_1, q_2, q_3\}$ (calculated previously for $\delta'(A, b)$)
    *   This is state $C$. So, $\delta'(C, b) = C$.

DFA states to process: $\{D\}$
DFA states found: $\{A, B, C, D\}$
DFA transitions: $(A, a, B)$, $(A, b, C)$, $(B, a, B)$, $(B, b, D)$, $(C, a, B)$, $(C, b, C)$

**State D = $\{q_1, q_2\}$**
*   **On input 'a':**
    *   $\delta'(D, a) = \epsilon\text{-closure}(\delta(q_1, a) \cup \delta(q_2, a))$
    *   $= \epsilon\text{-closure}(\{q_1\} \cup \emptyset)$
    *   $= \epsilon\text{-closure}(\{q_1\})$
    *   $= \{q_1\}$
    *   This is state $B$. So, $\delta'(D, a) = B$.
*   **On input 'b':**
    *   $\delta'(D, b) = \epsilon\text{-closure}(\delta(q_1, b) \cup \delta(q_2, b))$
    *   $= \epsilon\text{-closure}(\{q_2\} \cup \emptyset)$
    *   $= \epsilon\text{-closure}(\{q_2\})$
    *   $= \{q_1, q_2\}$ (from Step 1)
    *   This is state $D$. So, $\delta'(D, b) = D$.

DFA states to process: $\emptyset$ (All states processed)
DFA states found: $\{A, B, C, D\}$
DFA transitions: $(A, a, B)$, $(A, b, C)$, $(B, a, B)$, $(B, b, D)$, $(C, a, B)$, $(C, b, C)$, $(D, a, B)$, $(D, b, D)$

**Step 4: Determine the DFA's final states.**
The NFA's final state is $q_3$. Any DFA state that contains $q_3$ is a final state.
*   $A = \{q_0, q_1, q_3\}$ (Contains $q_3$) $\implies A$ is a final state.
*   $B = \{q_1\}$ (No $q_3$)
*   $C = \{q_1, q_2, q_3\}$ (Contains $q_3$) $\implies C$ is a final state.
*   $D = \{q_1, q_2\}$ (No $q_3$)
So, $F' = \{A, C\}$.

**Final Answer:**
The equivalent DFA is $D = (\{A, B, C, D\}, \{a, b\}, \delta', A, \{A, C\})$, where:
*   $A = \{q_0, q_1, q_3\}$
*   $B = \{q_1\}$
*   $C = \{q_1, q_2, q_3\}$
*   $D = \{q_1, q_2\}$

And the transition function $\delta'$ is:
| State | a | b |
| :---- | :- | :- |
| $A$   | $B$ | $C$ |
| $B$   | $B$ | $D$ |
| $C$   | $B$ | $C$ |
| $D$   | $B$ | $D$ |

**Reflection:** This example highlights the importance of correctly calculating $\epsilon$-closures, especially when they involve chains or cycles of $\epsilon$-transitions (like $q_2 \xrightarrow{\epsilon} q_1$). A small error in $\epsilon$-closure propagates through all subsequent transition calculations. The $\epsilon$-transitions allow the NFA to "jump" to different parts of its structure without consuming input, and the DFA must capture all these parallel possibilities.

## 6. Common mistakes and traps

1.  **Incorrect $\epsilon$-closure calculation:** This is the most frequent and critical error. Students often forget to include the starting state itself, or miss indirect $\epsilon$-transitions (e.g., $q_1 \xrightarrow{\epsilon} q_2 \xrightarrow{\epsilon} q_3$, missing $q_3$ when computing $\epsilon\text{-closure}(q_1)$).
    *   *Why it happens:* Not systematically exploring all reachable states via $\epsilon$-transitions, or assuming $\epsilon$-closure only applies to direct transitions.
2.  **Forgetting $\epsilon$-closure *after* symbol transition:** When calculating $\delta'(S, a)$, it's common to compute $\bigcup_{q \in S} \delta(q, a)$ but forget to apply $\epsilon\text{-closure}$ to the resulting set.
    *   *Why it happens:* Overlooking the final step in the transition rule, or misunderstanding that $\epsilon$-transitions can occur *after* an input symbol is consumed.
3.  **Incorrectly identifying final states:** A DFA state $S$ is final if *any* NFA state in $S$ is an NFA final state. Some students mistakenly require *all* states in $S$ to be final, or miss a final state entirely.
    *   *Why it happens:* Misinterpreting the definition of acceptance for an NFA (any accepting path is sufficient).
4.  **Not handling the empty set ($\emptyset$) as a DFA state:** If a transition leads to no NFA states (e.g., $\delta(q, a) = \emptyset$), its $\epsilon$-closure is also $\emptyset$. This empty set state is a valid DFA state (often called a "dead state" or "trap state") and must be included in the DFA's states and transitions. All transitions from the empty set lead back to itself.
    *   *Why it happens:* Assuming that an empty set means "no transition" rather than a valid state that absorbs all further input without accepting.
5.  **Not systematically exploring all reachable DFA states:** Students might stop too early, only processing states they explicitly wrote down, and missing states that are reachable from those.
    *   *Why it happens:* Lack of a systematic algorithm (like using a queue/list of "states to process") to ensure all reachable states are discovered.
6.  **Confusing NFA states with DFA states:** Mixing up single NFA states ($q_i$) with DFA states (which are *sets* of NFA states, $\{q_i, q_j, ...\}$).
    *   *Why it happens:* Not maintaining clear notation or conceptual distinction between the two types of automata.

## 7. Textbook-precise explanation

Let $N = (Q, \Sigma, \delta, q_0, F)$ be an NFA, where:
*   $Q$ is a finite set of states.
*   $\Sigma$ is the input alphabet.
*   $\delta: Q \times (\Sigma \cup \{\epsilon\}) \to \mathcal{P}(Q)$ is the transition function, mapping a state and an input symbol (or $\epsilon$) to a set of next states.
*   $q_0 \in Q$ is the start state.
*   $F \subseteq Q$ is the set of final (accepting) states.

We want to construct an equivalent DFA $D = (Q', \Sigma, \delta', q'_0, F')$, where:
*   $Q'$ is a finite set of states (each state in $Q'$ is a subset of $Q$).
*   $\Sigma$ is the same input alphabet.
*   $\delta': Q' \times \Sigma \to Q'$ is the transition function, mapping a DFA state and an input symbol to a single next DFA state.
*   $q'_0 \in Q'$ is the start state.
*   $F' \subseteq Q'$ is the set of final states.

The construction, known as **subset construction** (or powerset construction), proceeds as follows:

**1. Epsilon Closure ($\epsilon\text{-closure}$):**
For any state $q \in Q$, $\epsilon\text{-closure}(q)$ is the set of all states reachable from $q$ by following zero or more $\epsilon$-transitions.
Formally, $\epsilon\text{-closure}(q) = \{q' \in Q \mid q \xrightarrow{\epsilon^*} q'\}$.
For any set of states $S \subseteq Q$, $\epsilon\text{-closure}(S) = \bigcup_{q \in S} \epsilon\text{-closure}(q)$.
(Sipser, *Introduction to the Theory of Computation*, 3rd ed., §1.2; Hopcroft, Motwani, Ullman, *Introduction to Automata Theory, Languages, and Computation*, 3rd ed., §2.3)

**2. DFA Start State ($q'_0$):**
The start state of the DFA is the $\epsilon$-closure of the NFA'