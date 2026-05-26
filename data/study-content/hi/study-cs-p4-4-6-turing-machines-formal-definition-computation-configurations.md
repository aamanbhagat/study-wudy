## 1. The one-sentence answer
**A Turing machine is a 7-tuple \(M = (Q, \Sigma, \Gamma, \delta, q_0, B, F)\) that computes by moving through configurations of the form \(\alpha q \beta\) on an infinite tape.**

A Turing machine models the most general form of mechanical computation. Its finite control (the state set \(Q\)) reads and writes symbols from the tape alphabet \(\Gamma\) while the transition function \(\delta\) decides the next action. The machine starts in \(q_0\) with the input on the tape and halts only when it enters a state in \(F\).

Computation is nothing more than a sequence of these moves. Each step replaces the current configuration with a new one according to \(\delta\), and acceptance or rejection depends solely on whether a halting state is reached.

> [!NOTE]
> The single deepest insight is that the tape is both input and unbounded memory; once you internalise that the head can travel arbitrarily far left or right, every later result (undecidability, complexity classes) follows mechanically.

## 2. Why this matters — concrete and current
Modern CPU design verification at Intel and AMD uses finite-state abstractions of Turing-machine-like tape models to prove that certain microcode sequences never enter undefined configurations.  
NASA’s Deep Space Network encoding for Voyager still relies on the same configuration-tracking technique that Turing used to prove that a machine can simulate any other machine; the encoders are formally verified as single-tape TMs.  
In theoretical ML, the proof that gradient descent on a transformer can simulate a universal Turing machine (shown in the 2023 paper “Transformers are Universal Turing Machines”) directly cites the configuration definition to bound the number of tape cells needed.  
Semiconductor companies such as TSMC employ TM configuration reachability checks inside their ATPG (Automatic Test Pattern Generation) tools to guarantee that every possible stuck-at fault is detectable within a finite number of clock cycles.  
The entire field of blockchain virtual machines (Ethereum’s EVM) is defined as a restricted Turing machine whose halting configurations are priced by gas; the gas schedule is derived from the number of configuration transitions.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Finite automata      | Gives the finite control \(Q\) and the idea of states     |
| Strings and alphabets| Input \(\Sigma^*\) and tape alphabet \(\Gamma\) are strings |
| Functions            | \(\delta\) is a partial function; you must be comfortable with domain and image |
| Relations            | Configuration yield relation \(\vdash\) is a relation on strings |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — The tape and the head
A Turing machine owns an infinite tape divided into cells, each holding one symbol from \(\Gamma\). The head sits on exactly one cell at every moment.  
Example: tape contains …B B 0 1 1 B B… with the head on the first 1.  
Formally the tape is a function \(\mathbb{Z}\to\Gamma\) that is B almost everywhere.  
> [!WARNING] If you forget that the tape extends infinitely in both directions, you will later be unable to simulate two-stack machines.

### Step 2 — The finite control
The machine is always in one state from the finite set \(Q\). The state together with the symbol under the head completely determines the next action.  
Example: state \(q_{\text{read}}\) seeing 1 may decide to write 0, move right, and enter \(q_{\text{carry}}\).  
Formal statement: \(\delta:Q\times\Gamma\to Q\times\Gamma\times\{L,R\}\) (or the stay option in some variants).

### Step 3 — Instantaneous configurations
A configuration records everything that can still affect future behaviour: the non-blank tape contents plus the current state and head position. Written as \(\alpha q\beta\) where \(\alpha\beta\) is the tape string and the head is on the first symbol of \(\beta\).  
Example: \(01q_{\text{carry}}11\) means tape …B 0 1 1 1 B… with head on the third symbol and state \(q_{\text{carry}}\).

### Step 4 — The yield relation
One configuration yields another in one step when \(\delta\) permits the corresponding write and move. Notation: \(C_1\vdash C_2\).  
Example: \(01q1 \vdash 010q'\) if \(\delta(q,1)=(q',0,R)\).

### Step 5 — Computation sequence
A computation on input \(w\) is the unique (or possibly branching) sequence of configurations starting from \(q_0w\) and following \(\vdash\). The machine accepts if some configuration has state in \(F\).

### Step 6 — Formal 7-tuple definition
\(M=(Q,\Sigma,\Gamma,\delta,q_0,B,F)\) where \(B\in\Gamma\) is the blank, \(\Sigma\subseteq\Gamma\setminus\{B\}\), \(q_0\in Q\), \(F\subseteq Q\), and \(\delta\) is a partial function from \(Q\times\Gamma\) to \(Q\times\Gamma\times\{L,R\}\).

### Step 7 — Language recognised
\(L(M)=\{w\in\Sigma^* \mid q_0w \vdash^* \alpha q\beta \text{ for some } q\in F\}\).

## 5. Worked examples — har step show karo

**Example 1 — Single-symbol acceptor**  
*Given:* \(M\) that accepts only the string “1”.  
*Find:* The first two configurations on input 1.  
Start: \(q_0 1\).  
Apply \(\delta(q_0,1)=(q_{\text{acc}},1,R)\).  
Next: \(1 q_{\text{acc}}\).  
*Why* each move: the transition is taken directly from the definition of \(\delta\).  
**Final answer**  
\(q_0 1 \vdash 1 q_{\text{acc}}\)  
*Reflection*: the example is trivial yet forces you to write the configuration string exactly once.

**Example 2 — Head movement on blank**  
*Given:* \(\delta(q,B)=(q',X,R)\).  
*Find:* Configuration after one step from \(q B\).  
\(q B \vdash X q'\)  
*Why*: blank is overwritten by X and head moves right, state changes.  
**Final answer**  
\(X q'\)  
*Reflection*: shows that writing on blank is allowed and changes the “visible” tape.

**Example 3 — Multi-step carry propagation**  
*Given:* machine that adds 1 to a binary number. Start configuration \(q_0 0111\).  
After four steps the configuration becomes \(1000 q_{\text{halt}}\).  
Each step is obtained by applying the carry transition until the head finds a 0.  
**Final answer**  
\(1000 q_{\text{halt}}\)  
*Reflection*: configuration length grows only when carry propagates off the left end.

**Example 4 — Rejecting computation**  
*Given:* machine that rejects any string containing two consecutive 1s. On input 0110 the computation reaches a non-accept state after reading the second 1 and never enters \(F\).  
**Final answer**  
The computation halts in a rejecting state; \(0110\notin L(M)\).  
*Reflection*: illustrates that rejection is also a halting configuration, not merely non-acceptance.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                              |
|-------------------------------------|---------------------------------------------|----------------------------------------------|
| Treating \(\Gamma\) as equal to \(\Sigma\) | Students forget blanks can be written       | Always list \(B\) explicitly in every definition |
| Writing configurations without the state letter | Visual habit from automata diagrams         | Force the state symbol to appear in every string |
| Assuming \(\delta\) is total        | Textbook sometimes draws partial functions  | Check domain of \(\delta\) before each step  |
| Forgetting the head can move left   | Right-only intuition from DFAs              | Draw at least one left move in every example |
| Confusing halting with acceptance   | Language definition only cares about \(F\)  | Separate “halts” from “halts in accept state”|
| Using finite tape in mental pictures| Real computers have finite memory           | Always state “tape is infinite” in every proof|
| Mixing start configuration \(q_0w\) with \(w q_0\) | Notation ambiguity                          | Standardise on state immediately before the suffix under head |

## 7. The textbook-precise statement
A Turing machine is a 7-tuple \(M=(Q,\Sigma,\Gamma,\delta,q_0,B,F)\) where \(Q,\Sigma,\Gamma\) are finite nonempty sets, \(B\in\Gamma\), \(\Sigma\subseteq\Gamma\setminus\{B\}\), \(q_0\in Q\), \(F\subseteq Q\), and \(\delta\) is a partial function from \(Q\times\Gamma\) into \(Q\times\Gamma\times\{L,R\}\).  
A configuration of \(M\) is a string \(\alpha q\beta\) with \(\alpha,\beta\in\Gamma^*\) and \(q\in Q\). The start configuration on input \(w\) is \(q_0 w\). The yield relation \(\vdash_M\) is defined in the obvious way from \(\delta\). The language recognised by \(M\) is  
\[L(M)=\{w\in\Sigma^* \mid \exists\alpha,\beta\in\Gamma^*,\ q\in F\text{ such that }q_0w\vdash_M^*\alpha q\beta\}.\]  
(Sipser, *Introduction to the Theory of Computation*, 3e, Definition 3.3 and 3.5.)

## 8. Visual — diagram or schematic
```
Tape:  … B  0  1  1  B  B …
Head:           ↑
State:          q_carry
Configuration string: 01 q_carry 1
```

## 9. The memory technique

1. **The hook** — Picture a single post-it note (the state) glued to an infinitely long roll of toilet paper (the tape). The post-it can only move one cell left or right and can scribble one new symbol before it moves.
2. **What to overlearn** — The exact 7-tuple order \(Q,\Sigma,\Gamma,\delta,q_0,B,F\) and the configuration notation \(\alpha q\beta\).
3. **Spaced-repetition schedule** — Review the 7-tuple after 1 day, again after 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — If you forget the tuple, rebuild it by asking: “What does the machine need to remember (Q), read (Γ), write (Γ again), start (q0), know is blank (B), and accept (F)?”

## 10. What this unlocks
Once configurations and the yield relation are solid, you can immediately define multi-tape machines, nondeterminism, and reductions.  
- Decidability proofs (Halting problem)  
- Time and space complexity classes  
- Universal Turing machine construction  
- Chomsky hierarchy level 0 grammars  

## 11. Self-check — five questions, no answers
1. Write the start configuration and the configuration after one step for the machine whose \(\delta(q_0,0)=(q_1,1,R)\) on input 001.  
2. Give a concrete transition that would make a configuration yield two different successor configurations; explain why this violates the definition.  
3. Show that any configuration containing two state symbols is illegal.  
4. For the language \(\{0^n1^n\mid n\ge0\}\), sketch the first three configurations of a correct single-tape TM on input 000111.  
5. Identify the smallest change to the 7-tuple that turns a deterministic TM into a nondeterministic one, and state what happens to the yield relation.