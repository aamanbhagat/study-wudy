## What it is
Decidability classifies computational problems based on whether an algorithm exists that can solve them and always provide a "yes" or "no" answer. A language is **decidable** (or recursive) if a Turing Machine exists that halts on every possible input, accepting strings in the language and rejecting those not in it. A language is **recognizable** (or recursively enumerable) if a Turing Machine exists that halts and accepts strings in thelanguage, but may loop forever on strings that are not.

## Why it matters
Decidability establishes the absolute limits of computation. In aerospace engineering, you cannot write a program that proves with 100% certainty that any arbitrary guidance software will never enter an infinite loop (this is the Halting Problem, a famous undecidable problem). In machine learning, understanding decidability helps frame which classes of functions are theoretically learnable from data and which are not. It is the bedrock that separates what is possible from what is impossible for any computer, now or in the future.

## When to study it
You must have a solid grasp of the following before proceeding. If not, review them first.
- **Formal Language Theory:** Regular languages, Context-Free Languages.
- **Automata Theory:** Deterministic and Nondeterministic Finite Automata (DFAs/NFAs), Pushdown Automata.
- **Turing Machines (TMs):** The formal definition of a TM, how it operates on an input tape, and the concept of a TM's language, $L(M)$.
- **The Church-Turing Thesis:** The principle that TMs capture the intuitive notion of an algorithm.

## How to study it (step by step)
1.  **Solidify Turing Machine Halting.** Take a simple TM, for example, one that accepts strings with an even number of 0s. Trace its execution on an input like "010" (accepts) and "01" (rejects). Observe that it *always* reaches an accept or reject state and halts. This is the behavior of a **decider**.
2.  **Define Decidable vs. Recognizable.** Write the formal definitions side-by-side. For a language $L$:
    -   **Decidable:** There is a TM $M$ where for any input string $w$: if $w \in L$, $M$ accepts; if $w \notin L$, $M$ rejects. $M$ never loops.
    -   **Recognizable:** There is a TM $M$ where for any input string $w$: if $w \in L$, $M$ accepts. If $w \notin L$, $M$ either rejects or loops.
3.  **Explore the Asymmetry.** Consider the Halting Problem: given a program $\langle P \rangle$ and input $w$, does $P$ halt on $w$? You can build a recognizer for this: simulate $P$ on $w$. If it halts, you accept. But if it doesn't halt, your simulation runs forever. You can't be sure it *won't* halt after another million steps, so you can never definitively reject. This is why the Halting Problem is recognizable but not decidable.
4.  **Prove a simple language is decidable.** Take $L = \{0^n1^n \mid n \ge 0\}$. Write down the high-level algorithm for a TM that decides this language. (e.g., "Scan tape, cross off a 0, scan right to find and cross off a 1. Repeat. If you run out of 0s and 1s at the same time, accept. Otherwise, reject."). Convince yourself this TM always halts.
5.  **Understand the Hierarchy.** Draw the Venn diagram of language classes: Regular languages are a subset of Context-Free, which are a subset of Decidable, which are a subset of Recognizable. Find one example language for each region.

## Key ideas, with intuition
1.  **Decider = Total Algorithm.** A decider is a Turing Machine that implements a *total function*. It guarantees an answer for every possible input. Think of it as a perfect consultant who always says "yes" or "no" and never "I'm still thinking...".
2.  **Recognizer = Partial Algorithm.** A recognizer implements a *partial function*. It only guarantees an answer for inputs where the answer is "yes". For "no" inputs, it might never reply. This is like a search for a proof: if you find one, you're done (accept). If you don't find one, you can keep searching forever, never sure if one doesn't exist or you just haven't found it yet (loop).
3.  **The Complement Connection.** A crucial theorem states:
    $$
    \text{A language } L \text{ is decidable if and only if both } L \text{ and its complement } \bar{L} \text{ are recognizable.}
    $$
    *Intuition*: If you have a recognizer $M_1$ for $L$ and a recognizer $M_2$ for $\bar{L}$, you can build a decider for $L$. On input $w$, run $M_1$ and $M_2$ in parallel (e.g., alternating one step of each). Since $w$ is either in $L$ or $\bar{L}$, one of the two machines is *guaranteed* to halt and accept. If $M_1$ halts, you accept $w$. If $M_2$ halts, you reject $w$. This combined machine always halts and gives a definitive answer.

## Worked example
**Problem:** Prove that the language $A_{DFA} = \{ \langle B, w \rangle \mid B \text{ is a DFA that accepts the string } w \}$ is decidable.

**Solution:**
To prove $A_{DFA}$ is decidable, we must construct a Turing Machine, let's call it $M$, that takes an input $\langle B, w \rangle$, always halts, and accepts if and only if DFA $B$ accepts string $w$.

**High-Level Description of TM $M$:**
On input $\langle B, w \rangle$, where $B$ is the encoding of a DFA and $w$ is an input string:
1.  **Type Check:** First, check if the input is a valid encoding of a DFA and a string. For example, does $B$ have 5 components (states, alphabet, transition function, start state, final states)? If not, *reject*. This step always terminates.
2.  **Simulation:** Simulate the execution of DFA $B$ on input string $w$.
    a.  Keep track of $B$'s current state and the current position in the input string $w$. Initialize the current state to $B$'s start state, and the position to the beginning of $w$.
    b.  For each symbol in $w$, one by one, update the current state of $B$ according to $B$'s transition function, $\delta$.
3.  **Conclusion:** After processing the last symbol of $w$, observe the final state of $B$.
    a.  If the current state is one of $B$'s final states, *accept*.
    b.  If the current state is not a final state, *reject*.

**Why this process decides the language:**
-   **Step 1 (Type Check):** This is a simple parsing task on a finite string encoding. It will always terminate.
-   **Step 2 (Simulation):** The simulation proceeds one symbol at a time through the input string $w$. If $w$ has length $n$, the simulation performs exactly $n$ state transitions. This process is guaranteed to terminate. It cannot loop.
-   **Step 3 (Conclusion):** This is a single check against a finite set of final states. It terminates instantly.

Since the TM $M$ halts on all inputs (it either rejects in step 1 or completes the finite simulation in steps 2 and 3), it is a decider. Therefore, the language $A_{DFA}$ is decidable.

## Diagrams
A Venn Diagram illustrating the hierarchy of language classes.

```text
+---------------------------------------------------+
| Recognizable Languages (Turing Machines)          |
|                                                   |
|   +---------------------------------------------+ |
|   | Decidable Languages (Decider TMs)           | |
|   |                                             | |
|   |   +---------------------------------------+ | |
|   |   | Context-Free Languages (PDAs)         | | |
|   |   |                                       | | |
|   |   |   +---------------------------------+ | | |
|   |   |   | Regular Languages (DFAs/NFAs)   | | | |
|   |   |   +---------------------------------+ | | |
|   |   +---------------------------------------+ | |
|   +---------------------------------------------+ |
|                                                   |
+---------------------------------------------------+
```

Behavior of a Recognizer vs. a Decider on an input string $w$.

```text
           Input w
              |
              V
+---------------------------+
| Turing Machine M          |
+---------------------------+
      |           |
      |           |
 w in L(M)   w not in L(M)
      |           |
      V           +----------------+
  HALT &         /                 \
 ACCEPT       HALT &              LOOP
             REJECT           (Forever)


For a DECIDER, the "LOOP" path does not exist.
For a RECOGNIZER, the "LOOP" path is possible.
```

## Memory technique — remember this forever
1.  **Mnemonic:** "**D**eciders **D**efinitely **D**eclare." They give a definite yes/no. "**R**ecognizers might **R**un 'round." They confirm a 'yes' but might run forever on a 'no'.
2.  **Must-know facts:**
    -   $L$ is **decidable** if a TM exists that halts on *all* inputs, accepting $w \in L$ and rejecting $w \notin L$.
    -   $L$ is **recognizable** if a TM exists that, for $w \in L$, halts and accepts. (For $w \notin L$, it may reject or loop).
    -   $L$ is decidable $\iff$ $L$ and $\bar{L}$ are both recognizable.
3.  **Spaced Repetition Schedule:** Review these definitions and the worked example in 1 day, 3 days, 7 days, 16 days, and 35 days. Each time, try to re-derive the result for $A_{DFA}$ from scratch.
4.  **First Principles Pathway:** If you forget, start with the definition of a Turing Machine. It's a state machine with a tape. Ask yourself: "What is the most powerful behavior I can guarantee from this machine?" The answer is that it *always stops* and gives an answer. That's a decider. "What is a weaker, but still useful, guarantee?" That it stops on the inputs I care about (the 'yes' cases). That's a recognizer.

## Common mistakes
1.  **Confusing "reject" and "loop".** For a decider, these are different: it must enter a specific reject state. For a recognizer, looping is a way of not accepting; it is distinct from explicitly rejecting.
2.  **Thinking "undecidable" means "unrecognizable".** This is false. The Halting Problem is the canonical counterexample: it is undecidable but it is recognizable.
3.  **Assuming the complement of a recognizable language is recognizable.** This is not true in general. If it were, then by the key theorem ($L$ and $\bar{L}$ recognizable $\implies L$ decidable), every recognizable language would be decidable, which we know is false.
4.  **Incorrectly designing a decider that might loop.** When asked to prove a language is decidable, your proposed TM *must* have a clear argument for why it halts on *all* inputs, not just the ones in the language. The simulation in the $A_{DFA}$ example works because a DFA's execution path has a length exactly equal to its input string.

## Self-check
1.  Is the language $L = \{ w \mid w \text{ is a binary string containing '101' as a substring} \}$ decidable? Justify your answer by describing a TM that decides it.
2.  If language $L_1$ is decidable and language $L_2$ is decidable, is their intersection $L_1 \cap L_2$ also decidable? Explain how to construct a decider for the intersection from the deciders for $L_1$ and $L_2$.
3.  Let $HALT_{empty} = \{ \langle M \rangle \mid M \text{ is a TM that halts on the empty string } \epsilon \}$. Is this language recognizable? Is it decidable? Justify your reasoning.