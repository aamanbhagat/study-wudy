## 1. The one-sentence answer
**A language is decidable (recursive) when a Turing machine halts on every input and correctly answers membership; it is recognizable (recursively enumerable) when a Turing machine accepts every string in the language and may loop forever on strings outside it.**

A language encodes a decision problem: given a string, does it belong to the set? The Turing machine supplies the only rigorous model of mechanical computation that can run for unbounded time. When the machine is required to halt on every input, the language earns the stronger label “decidable.” When the machine is permitted to run forever on negative instances, the language earns the weaker label “recognizable.”

The distinction matters because every algorithm we actually execute on real hardware must halt. Recognizable languages therefore mark the outer boundary of what any program can ever certify; decidable languages mark the boundary of what any program can ever settle in finite time.

> [!NOTE]
> The halting problem is recognizable but not decidable; that single fact separates the two classes and shows why termination cannot be guaranteed by inspection of source code alone.

## 2. Why this matters — concrete and current
Model checkers used by NASA and Airbus to verify flight-control software decide safety properties only for fragments whose languages are decidable; outside those fragments the tools deliberately switch to semi-decision procedures that may run forever on unsafe traces.

Modern SMT solvers inside Microsoft’s Z3 and Google’s internal verification pipeline decide quantifier-free fragments of first-order logic; the underlying theory of arithmetic with uninterpreted functions is decidable, which is why the solvers always terminate on the supported theories.

Regular-expression engines in every web browser decide membership for the language of a given pattern; because regular languages are decidable, the engine can safely reject malicious input without risking non-termination.

The Coq and Lean proof assistants recognize (but do not always decide) the set of provable theorems in dependent type theory; the underlying language is recursively enumerable, which is why a failed proof search may loop until the user intervenes.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Turing machine           | Supplies the sole formal device that defines both classes |
| Language as a set of strings | The object whose membership the machine must settle |
| Acceptance vs. halting   | Distinguishes the two classes precisely |

## 4. Building the idea — from intuition to formalism

### Step 1 — A machine that always answers
A Turing machine that decides a language must, on every input, reach a halting state labelled accept or reject.  
Example: the language of balanced parentheses over the alphabet {(,)} is decided by a machine that simulates a counter and halts after scanning the whole string.  
Formally,  
$$L\text{ is decidable}\iff\exists\text{ TM }M\text{ such that }M\text{ halts on every }w\text{ and }w\in L\iff M\text{ accepts }w.$$  
> [!WARNING]  
> Omitting the universal-halting requirement collapses the definition into recognizability.

### Step 2 — A machine that may run forever on “no”
A Turing machine that recognizes a language need only accept strings inside the language; on strings outside it may loop.  
Example: the language of all Turing machines that accept their own encoding is recognized by a universal simulator that simply runs the candidate machine on itself and accepts if that simulation ever accepts.  
Formally,  
$$L\text{ is recognizable}\iff\exists\text{ TM }M\text{ such that }w\in L\iff M\text{ accepts }w.$$  
> [!WARNING]  
> Confusing “accepts” with “halts” hides the possibility of non-halting behaviour on the complement.

### Step 3 — The complement distinguishes the classes
If both \(L\) and its complement \(\overline{L}\) are recognizable, then a machine for \(L\) and a machine for \(\overline{L}\) can be dovetailed; the first to accept decides membership.  
Formally,  
$$L\text{ decidable}\iff L\text{ recognizable and }\overline{L}\text{ recognizable}.$$  
> [!WARNING]  
> The dovetailing argument fails if either machine may loop, which is exactly why the complement must also be recognizable.

### Step 4 — Enumeration characterises recognizability
A language is recognizable exactly when there exists a Turing machine that enumerates precisely its members (possibly with repetitions, possibly never halting).  
Formally,  
$$L\text{ recognizable}\iff L=\emptyset\text{ or }L=\text{range}(f)\text{ for some computable }f:\mathbb{N}\to\Sigma^*.$$  
> [!WARNING]  
> The enumerator may output members in any order and may never finish, mirroring the recognizer’s possible non-halting behaviour.

### Step 5 — Textbook closure properties
Decidable languages are closed under complement, union, intersection, concatenation and Kleene star. Recognizable languages are closed under union, intersection, concatenation and Kleene star but not under complement.  
The final formal statement therefore reads:  
A language \(L\subseteq\Sigma^*\) is decidable when a total computable function \(\chi_L:\Sigma^*\to\{0,1\}\) exists; it is recognizable when a partial computable function \(\phi_L:\Sigma^*\rightharpoonup\{0,1\}\) exists whose domain is exactly \(L\).

## 5. Worked examples — every step shown

**Example 1 — Finite language**  
*Given:* \(L=\{001,110\}\) over \(\{0,1\}\).  
*Find:* Decide whether \(L\) is decidable.  
A Turing machine hard-codes the two strings and compares the input against each; it rejects after a single pass if neither matches.  
*Why* comparison is finite: both strings have fixed length.  
*Why* it halts: the input is scanned once.  
**\(L\) is decidable.**  
*Reflection* Trivial finite sets expose that decidability only requires a terminating procedure, not an interesting algorithm.

**Example 2 — Regular language**  
*Given:* \(L=\{w\in\{0,1\}^* \mid w\text{ ends with }01\}\).  
*Find:* Show \(L\) decidable.  
Construct a two-state DFA that tracks whether the last two symbols were 01; convert the DFA to a TM that simulates the DFA and halts after reading the whole input.  
*Why* the DFA suffices: regular languages are decided by finite memory.  
*Why* the TM halts: it copies the DFA transition table and stops at end-of-input.  
**\(L\) is decidable.**  
*Reflection* Any language whose membership depends on a bounded window inherits decidability from the finite automaton.

**Example 3 — Halting problem**  
*Given:* \(A_{\text{TM}}=\{\langle M,w\rangle \mid M\text{ accepts }w\}\).  
*Find:* Show \(A_{\text{TM}}\) recognizable but not decidable.  
A universal TM \(U\) on input \(\langle M,w\rangle\) simulates \(M\) on \(w\) and accepts exactly when that simulation accepts.  
*Why* \(U\) recognizes: it accepts precisely the yes instances.  
*Why* not decidable: reduction from the halting problem yields a contradiction if a total decider existed.  
**\(A_{\text{TM}}\) recognizable, not decidable.**  
*Reflection* The universal simulator is the canonical witness that recognizability is strictly weaker than decidability.

**Example 4 — Complement of halting problem**  
*Given:* \(\overline{A_{\text{TM}}}\).  
*Find:* Show neither \(\overline{A_{\text{TM}}}\) nor its complement is decidable.  
Assume a decider \(D\) for \(\overline{A_{\text{TM}}}\). Then a machine that runs \(D\) and flips the answer would decide \(A_{\text{TM}}\), contradicting Example 3.  
*Why* the reduction works: complementation is computable.  
*Why* the contradiction follows: decidability is closed under complement.  
**Neither language is decidable.**  
*Reflection* Once one side of a pair is shown recognizable-but-not-decidable, the other side immediately loses both properties.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating “recognizable” as “decidable in practice” | Everyday programs rarely loop, so intuition collapses the classes | Always ask whether the machine is required to halt on every input |
| Forgetting that the empty language is decidable | Edge case feels artificial | Check the definition: the machine that immediately rejects decides \(\emptyset\) |
| Assuming every recognizable language has a decidable complement | The halting-problem pair is the classic counter-example | Memorize that recognizable languages are not closed under complement |
| Confusing enumeration order with lexicographic order | Enumerators need not produce strings in any particular sequence | Remember the enumerator definition allows arbitrary order |
| Believing every decidable language is regular | Decidable languages properly contain the context-free languages | Keep the Chomsky hierarchy in view |
| Overlooking that the universal TM itself may loop | The simulator inherits non-halting behaviour from the simulated machine | Distinguish acceptance from halting at every step |
| Thinking Rice’s theorem applies to recognizable languages | Rice’s theorem concerns non-trivial properties of r.e. sets | Apply Rice only after confirming the property is semantic |

## 7. The textbook-precise statement
A language \(L\subseteq\Sigma^*\) is **recursive** (decidable) if there exists a Turing machine \(M\) such that for every \(w\in\Sigma^*\), \(M\) halts and accepts \(w\) exactly when \(w\in L\). \(L\) is **recursively enumerable** (recognizable) if there exists a Turing machine \(M\) such that \(w\in L\) if and only if \(M\) accepts \(w\) (possibly looping otherwise).  
Sipser, *Introduction to the Theory of Computation*, 3e, Definition 4.1 and Theorem 4.6.

## 8. Visual — diagram or schematic
```text
Input w
   │
   ▼
Universal Simulator U
   │
   ├── accepts  →  w ∈ L          (recognizable)
   │
   └── loops    →  w ∉ L          (may be unrecognizable complement)
   
If U is forced to halt on every path:
   │
   └── rejects  →  w ∉ L          (decidable)
```
The diagram shows the single extra transition (reject on non-acceptance) that upgrades recognizability to decidability.

## 9. The memory technique
**The hook** — picture a librarian who either stamps every book “belongs here” and returns it, or keeps searching the infinite basement forever; the first librarian decides, the second only recognizes.  
**What to overlearn** — (1) decidable = halts on every input; (2) recognizable = halts and accepts on yes instances; (3) both recognizable and co-recognizable \(\iff\) decidable.  
**Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.  
**First-principles fallback** — rebuild from the universal Turing machine: simulate, accept on yes, and ask whether a total halting version can be constructed.

## 10. What this unlocks
The separation supplies the foundation for Gödel’s incompleteness theorems, the classification of complexity classes, and the theory of oracle machines.  
- Rice’s theorem on undecidability of non-trivial properties of r.e. sets  
- The arithmetic hierarchy and relativization  
- Reductions that prove undecidability of Post’s correspondence problem, CFG equivalence, and tiling problems  
- The link between decidability and the computability of fixed points in denotational semantics

## 11. Self-check — five questions, no answers
1. Give a concrete language that is recognizable yet whose complement is not recognizable.  
2. Prove that the set of all valid first-order sentences in the language of arithmetic is not decidable.  
3. Show that every finite language is decidable by exhibiting an explicit total Turing machine.  
4. Why does dovetailing two recognizers decide membership only when both languages are recognizable?  
5. Construct a language that is neither recognizable nor co-recognizable and justify the construction with a diagonal argument.