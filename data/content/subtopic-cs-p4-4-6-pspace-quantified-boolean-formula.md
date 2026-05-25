## What it is
The Quantified Boolean Formula problem (QBF) asks whether a given logical formula is true, where its variables are bound by universal ($\forall$, "for all") and existential ($\exists$, "there exists") quantifiers. It is a generalization of the Boolean Satisfiability Problem (SAT), which only uses existential quantifiers implicitly. Deciding if a QBF is true is the canonical complete problem for the complexity class PSPACE.

## Why it matters
QBF is fundamental to understanding the limits of computation with bounded memory. It appears in critical applications like formal verification of hardware and software (e.g., ensuring a flight control system has no bugs), AI planning (where an agent must find a plan that works against any possible contingency), and solving two-player games like chess or Go. Mastering QBF provides the theoretical foundation for analyzing problems where you must contend with an adversary or an uncertain environment.

## When to study it
You must have a solid grasp of these prerequisites. If any are weak, review them first.
- **Propositional Logic:** You must be fluent in Boolean variables, operators ($\land, \lor, \neg$), clauses, and conjunctive normal form (CNF).
- **Complexity Theory Basics:** You must understand the definitions of P, NP, NP-completeness, and PSPACE.
- **The SAT Problem:** You must understand why SAT is NP-complete. The logic of QBF builds directly on it.
- **Recursion:** The standard algorithm for solving QBF is recursive, and analyzing its space complexity is key.

## How to study it (step by step)
1.  **Solidify SAT.** Write down the definition of a Boolean formula in 3-CNF. Remind yourself that SAT asks: $\exists x_1 \exists x_2 \dots \exists x_n \phi(x_1, \dots, x_n)$?
2.  **Introduce Quantifiers.** Consider the formula $\phi(x, y) = (x \lor y)$. What is the truth value of $\exists x \forall y \, \phi(x, y)$? What about $\forall y \exists x \, \phi(x, y)$? Work through these small examples to see that quantifier order matters immensely.
3.  **Frame QBF as a Game.** Think of a QBF like $\exists x_1 \forall x_2 \exists x_3 \dots \phi$ as a game between two players. Player $\exists$ chooses values for the $x_i$ variables quantified by $\exists$, and Player $\forall$ chooses values for variables quantified by $\forall$. Player $\exists$ wins if the final formula $\phi$ is true; Player $\forall$ wins if it is false. A QBF is true if and only if Player $\exists$ has a winning strategy.
4.  **Derive the Recursive Solver.** Write down a recursive function `EVAL(QBF_formula)`. The base case is when the formula has no quantifiers; just evaluate it. For the recursive step, if the formula is $\exists x \psi$, the function returns `EVAL(ψ with x=0) OR EVAL(ψ with x=1)`. If it's $\forall x \psi$, it returns `EVAL(ψ with x=0) AND EVAL(ψ with x=1)`.
5.  **Analyze the Space Complexity.** Analyze the `EVAL` function you just designed. The recursion depth is at most $n$, the number of variables. At each level of recursion, you only need to store the current variable's assignment and a few pointers. This requires polynomial space, $O(n \cdot |\phi|)$, proving that QBF is in PSPACE.
6.  **Sketch the Hardness Proof.** You don't need to reproduce the full proof, but understand the intuition. The proof that QBF is PSPACE-hard involves showing that any polynomial-space Turing Machine computation can be encoded as a massive QBF. The quantifiers are used to state "for all steps in time" and "there exists a valid next configuration."

## Key ideas, with intuition
1.  **SAT vs. QBF: A Question vs. a Game.**
    - **SAT asks a question:** Is there *any* assignment that makes $\phi$ true? This is like finding a single needle in a haystack.
    - **QBF poses a game:** Can the "exists" player *always* win, no matter what the "for all" player does? This is like having a winning strategy in chess from the start.

2.  **Quantifiers as AND/OR Trees.** A QBF can be visualized as a game tree.
    - An existential quantifier $\exists x$ corresponds to an **OR** node. We (the "exists" player) get to choose the branch ($x=0$ or $x=1$) that leads to a win. We only need one winning branch.
    $$ \text{Truth of } \exists x \, \phi \iff (\text{Truth of } \phi|_{x=0}) \lor (\text{Truth of } \phi|_{x=1}) $$
    - A universal quantifier $\forall y$ corresponds to an **AND** node. The adversary chooses the branch. To win, we must be able to win down *both* branches.
    $$ \text{Truth of } \forall y \, \phi \iff (\text{Truth of } \phi|_{y=0}) \land (\text{Truth of } \phi|_{y=1}) $$

3.  **Space is Reusable, Time is Not.** The recursive QBF solver may explore an exponential number of paths in the game tree, taking exponential time. However, once it's done exploring the $x_1=0$ subtree, it can reuse that same memory (call stack space) to explore the $x_1=1$ subtree. The maximum memory needed is proportional to the *depth* of the tree (number of variables), not the total *size* of the tree. This is the core reason QBF is in PSPACE but not known to be in P or NP.

## Worked example
Let's determine if the following QBF is true: $\Phi = \exists x_1 \forall x_2 \, (x_1 \lor x_2) \land (\neg x_1 \lor \neg x_2)$.

**Step 1: Frame as a game.**
Player $\exists$ chooses a value for $x_1$. Then, Player $\forall$ chooses a value for $x_2$. Player $\exists$ wins if the final expression is true.

**Step 2: Player $\exists$ considers their moves.**
Player $\exists$ can choose $x_1 = 1$ or $x_1 = 0$. We need to see if either choice leads to a guaranteed win. This is an OR condition for Player $\exists$.
Is ($\Phi$ with $x_1=1$) OR ($\Phi$ with $x_1=0$) true?

**Step 3: Analyze the case $x_1 = 1$.**
If Player $\exists$ chooses $x_1=1$, the formula becomes $\forall x_2 \, (1 \lor x_2) \land (0 \lor \neg x_2)$, which simplifies to $\forall x_2 \, (True) \land (\neg x_2)$, or simply $\forall x_2 \, \neg x_2$.
Now Player $\forall$ must choose $x_2$. This is an AND condition for Player $\exists$; they must win for both choices of $x_2$.
- If Player $\forall$ chooses $x_2=1$, the formula is $\neg 1 = \text{False}$.
- If Player $\forall$ chooses $x_2=0$, the formula is $\neg 0 = \text{True}$.
Since Player $\forall$ can force a loss for Player $\exists$ by choosing $x_2=1$, the sub-formula $\forall x_2 \, \neg x_2$ is **False**. So, $x_1=1$ is a losing move for Player $\exists$.

**Step 4: Analyze the case $x_1 = 0$.**
If Player $\exists$ chooses $x_1=0$, the formula becomes $\forall x_2 \, (0 \lor x_2) \land (1 \lor \neg x_2)$, which simplifies to $\forall x_2 \, (x_2) \land (True)$, or simply $\forall x_2 \, x_2$.
Now Player $\forall$ must choose $x_2$.
- If Player $\forall$ chooses $x_2=1$, the formula is $1 = \text{True}$.
- If Player $\forall$ chooses $x_2=0$, the formula is $0 = \text{False}$.
Since Player $\forall$ can force a loss for Player $\exists$ by choosing $x_2=0$, the sub-formula $\forall x_2 \, x_2$ is **False**. So, $x_1=0$ is also a losing move for Player $\exists$.

**Step 5: Conclude.**
Player $\exists$ needed to find *one* winning move ($x_1=1$ OR $x_1=0$). Since both moves lead to a situation where Player $\forall$ can win, Player $\exists$ does not have a winning strategy.
Therefore, the original QBF $\Phi$ is **False**.

**Reflection:** Each step broke the problem down by peeling off one quantifier. The $\exists$ quantifier became a check to see if *either* substitution worked (an OR). The $\forall$ quantifier became a check to see if *both* substitutions worked (an AND). This recursive decomposition is the heart of the QBF algorithm.

## Diagrams
This ASCII diagram shows the game tree for the worked example. `E` nodes are choices for Player $\exists$ (OR nodes), and `A` nodes are for Player $\forall$ (AND nodes). The formula is evaluated at the leaves.

```text
                 E(x1) -- Is Φ True?
                /     \
               /       \
      (x1=0)  /         \ (x1=1)
             /           \
         A(x2)           A(x2)
         /   \           /   \
 (x2=0) /     \ (x2=1)   /     \ (x2=0)
       /       \       /       \
  (0∨0)∧(1∨1) (0∨1)∧(1∨0) (1∨0)∧(0∨1) (1∨1)∧(0∨0)
      |             |           |           |
    False         True        True        False
      \           /           \           /
       \   &     /             \   &     /
        \       /               \       /
         False                   False
           \                     /
            \         |         /
             \                 /
                    False
```

## Memory technique — remember this forever
1.  **Mnemonic:** **"Quantified SAT is a PSPACE Game."**
    - **Quantified SAT:** It's just SAT with $\forall$ and $\exists$.
    - **PSPACE:** The resources needed are Polynomial SPACE.
    - **Game:** The core intuition is a two-player game. $\exists$ is you, trying to win. $\forall$ is your adversary, trying to make you lose. A QBF is true if you have a winning strategy.

2.  **Must-know formulas:** The recursive evaluation rules.
    - For an existential quantifier: $T(\exists x \, \phi) = T(\phi|_{x=0}) \lor T(\phi|_{x=1})$
    - For a universal quantifier: $T(\forall x \, \phi) = T(\phi|_{x=0}) \land T(\phi|_{x=1})$
    (Where $T(\psi)$ is the truth value of formula $\psi$, and $\phi|_{x=c}$ is $\phi$ with $x$ replaced by constant $c$.)

3.  **Spaced Repetition Schedule:**
    - Review this material in **1 day**. (Re-do the worked example from memory).
    - Review again in **3 days**. (Explain the game analogy to an imaginary student).
    - Review again in **7 days**. (Write the recursive algorithm in pseudocode).
    - Review again in **16 days**. (Explain why it's in PSPACE but not necessarily NP).
    - Final review in **35 days**. (Solve the self-check problems).

4.  **First Principles Pathway:** If you forget everything, rebuild it from the game.
    - Start with a simple formula like $\exists x \forall y \, (x \oplus y)$.
    - "I get to pick $x$. My opponent picks $y$. I win if $x \oplus y$ is true."
    - "If I pick $x=0$, my opponent can pick $y=0$, then $0 \oplus 0 = 0$. I lose."
    - "If I pick $x=1$, my opponent can pick $y=1$, then $1 \oplus 1 = 0$. I lose."
    - "I have no winning strategy. The formula is false."
    - This line of reasoning naturally leads you to the recursive AND/OR evaluation structure. From there, analyzing the call stack of that recursion gets you back to PSPACE.

## Common mistakes
1.  **Reordering Quantifiers:** Thinking that $\exists x \forall y \, \phi$ is the same as $\forall y \exists x \, \phi$. It is not. The first means "There is a single $x$ that works for all $y$," while the second means "For every $y$, there is some $x$ (which can depend on $y$) that works."
2.  **Confusing Time and Space:** Seeing the exponential game tree and concluding the algorithm needs exponential space. The key is that the algorithm explores the tree depth-first, so it only needs space proportional to the depth of the recursion, which is the number of variables.
3.  **Ignoring the Quantifier Order:** Evaluating the formula from the inside out. You must always evaluate based on the outermost quantifier first. The choice for $x_1$ in $\exists x_1 \forall x_2 \dots$ must be made *without* knowing what $x_2$ will be.

## Self-check
1.  Is the QBF $\forall x \exists y \, (x \lor y) \land (\neg x \lor \neg y)$ true or false?
2.  Construct a simple Boolean formula $\phi(x, y)$ such that $\exists x \forall y \, \phi(x,y)$ is false, but $\forall y \exists x \, \phi(x,y)$ is true.
3.  Consider a variant of QBF where the formula is not in CNF but is a circuit of AND, OR, and NOT gates. Explain in one sentence why this problem is still in PSPACE.