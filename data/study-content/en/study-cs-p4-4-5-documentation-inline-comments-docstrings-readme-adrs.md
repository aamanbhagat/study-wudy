## 1. The one-sentence answer
**Documentation is the disciplined embedding of human-readable explanations at four nested scales—inline comments, docstrings, README files, and Architecture Decision Records—to preserve intent across time and teams.**

Inline comments clarify individual statements that the code itself cannot express. Docstrings define the contract of a function or module so callers need never read its body. A README supplies the minimal map a newcomer requires to build, test, and run the project. ADRs record the irreversible choices that later maintainers must understand before they can safely alter the system.

These layers are not optional decoration. They convert tacit knowledge into explicit, searchable artefacts that survive personnel changes, refactoring, and scaling. Without them, every future reader must reconstruct the original reasoning from source alone—an error-prone and expensive reconstruction.

> [!NOTE]
> The decisive insight is that documentation is not writing about code; it is writing the missing information that code cannot carry.

## 2. Why this matters — concrete and current
NASA’s Mars Perseverance rover flight software contains more than 1.2 million lines; every module carries both inline comments and machine-readable docstrings that feed the automated test harness used during the seven-minute descent. A single omitted precondition comment in the entry-descent-landing sequencer would have required re-validation of the entire chain.

Google’s internal monorepo enforces docstring coverage on every public API; the resulting corpus powers the company’s code-search and refactoring tools, reducing the median time to understand an unfamiliar service from hours to minutes.

The Linux kernel’s Documentation/ directory and commit-message conventions function as living READMEs and lightweight ADRs. When the io_uring subsystem was introduced, the accompanying decision record prevented three separate attempts to re-implement the same facility over the following two years.

In machine-learning research, papers that omit ADRs for hyper-parameter and data-pipeline choices have repeatedly produced irreproducible results; the 2022 ML Reproducibility Challenge identified missing decision provenance as the dominant failure mode across 300 submitted reproductions.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Control flow and scope   | Comments must attach to the smallest executable unit      |
| Function and module boundaries | Docstrings describe contracts at exactly these boundaries |
| Version control (git)    | READMEs and ADRs live alongside commits and branches      |
| Trade-off reasoning      | ADRs exist only when multiple acceptable designs compete  |

## 4. Building the idea — from intuition to formalism

### Step 1 — Local opacity
Code statements can be syntactically correct yet semantically surprising.  
Example: `x = x & (x - 1)` clears the lowest set bit; without a comment the next reader must rediscover the idiom.  
Formal statement: For any statement \( s \), if its weakest precondition or postcondition is not mechanically derivable from surrounding code, an inline comment \( c(s) \) must record the missing predicate.  
> [!WARNING]  
> Placing the comment above the wrong statement silently documents a different fact than intended.

### Step 2 — Contract boundary
A function’s observable behaviour forms an implicit contract.  
Example: `def sqrt(x):` must state domain, precision, and error behaviour.  
Formal statement: A docstring \( D(f) \) is a triple \( (P, Q, E) \) where \( P \) is precondition, \( Q \) postcondition, and \( E \) the set of raised exceptions.  
> [!WARNING]  
> Omitting \( E \) leads callers to treat unexpected exceptions as bugs rather than part of the interface.

### Step 3 — Project entry point
A newcomer must discover build commands, dependencies, and entry points without reading source.  
Formal statement: A README is a minimal sufficient description \( R \) such that \( \forall d \in \) developers, \( \text{build}(R) \) succeeds in time \( < t_{\text{threshold}} \).

### Step 4 — Irreversible choice
Some decisions cannot be reversed without prohibitive cost.  
Example: choice of database or authentication protocol.  
Formal statement: An ADR is a tuple \( (C, A, N, S) \) recording Context, Decision, Alternatives considered, and Status.

### Step 5 — Layer ordering
Documentation must be read at the coarsest relevant scale first.  
Formal statement: The documentation lattice is ordered by scope: \( \text{ADR} \succ \text{README} \succ \text{docstring} \succ \text{comment} \).

### Step 6 — Maintenance invariant
Every code change that alters an assumption must update the corresponding documentation element.  
Formal statement: Let \( \Delta_c \) be a code delta; then \( \Delta_d \) must be applied to keep the documentation predicate true.

### Step 7 — Textbook statement
Documentation at each scale minimises the cognitive distance between the artefact and the mental model required to modify it safely.

## 5. Worked examples — every step shown

**Example 1 — Single-line clarification**  
*Given:* `result = (a + b) >> 1`  
*Find:* minimal clarifying comment.  
Step 1: Identify non-obvious intent.  
*Why:* The expression computes average without overflow for unsigned integers.  
Step 2: Attach comment to the statement.  
*Why:* Scope must be exact.  
**result = (a + b) >> 1  # average without overflow for uint32**  

**Example 2 — Docstring contract**  
*Given:* A function `def connect(host, timeout=5)`.  
*Find:* Complete docstring.  
Step 1: Write precondition.  
*Why:* Caller must know valid host formats.  
Step 2: Write postcondition and exceptions.  
*Why:* Distinguishes normal return from error cases.  
```python
def connect(host, timeout=5):
    """Establish TCP connection.
    Pre: host is hostname or IP literal.
    Post: returns socket or raises OSError within timeout seconds.
    """
```

**Example 3 — README minimum**  
*Given:* New repository.  
*Find:* Required sections.  
Step 1: List build, test, run commands.  
*Why:* Enables immediate reproduction.  
Step 2: Add contribution and licence pointers.  
*Why:* Legal and social onboarding.  

**Example 4 — ADR for database choice**  
*Given:* Team must pick between PostgreSQL and SQLite.  
*Find:* One-page ADR.  
Step 1: Record context and rejected alternatives.  
*Why:* Prevents re-litigation.  
Step 2: State consequences and review date.  
*Why:* Documents when decision may be revisited.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Comment restates the obvious | Author assumes reader shares mental model   | Delete any sentence that merely paraphrases the code |
| Docstring omits exceptions  | Focus on happy path during initial writing  | Mandate exception list in code-review checklist |
| README contains installation prose longer than one screen | Author writes tutorial instead of reference | Enforce “copy-paste to build” test in CI     |
| ADR written after the fact  | Decision already shipped                    | Require ADR before merge of the implementing PR |
| Inline comments drift       | Code edited, comment left behind            | Treat comment update as part of the same diff |
| Multiple competing READMEs  | Organic growth across subdirectories        | Designate single canonical README at repository root |
| ADR written in natural language only | No machine-readable status field       | Use YAML front-matter with explicit Status key |

## 7. The textbook-precise statement
Documentation is the set of artefacts \( D = \{C, S, R, A\} \) where \( C \) is the set of inline comments, \( S \) the set of docstrings, \( R \) the project README, and \( A \) the set of ADRs, such that for every future developer \( d \), the time to reach a correct modification decision is minimised subject to the constraint that \( D \) remains consistent with the source under every accepted change. (Martin, *Clean Code*, 2008, Ch. 4; extended by the ADR template in Nygard, “Documenting Architecture Decisions”, 2011.)

## 8. Visual — diagram or schematic
```text
Project root
├── README.md          (entry: build, test, run)
├── docs/
│   └── adr/
│       ├── 0001-use-postgres.md
│       └── 0002-async-runtime.md
└── src/
    └── module.py
        ├── docstring (API contract)
        └── # inline comments (local invariants)
```
The diagram shows scope decreasing from top to bottom; each layer answers questions the layer above leaves open.

## 9. The memory technique
1. **The hook** — Picture four nested Russian dolls: the outermost is the ADR (why the system exists), then the README (how to obtain it), the docstring (how to call it), and the innermost comment (why this line is written this way).  
2. **What to overlearn** — The four scopes and their single responsibility: comment = statement, docstring = contract, README = onboarding, ADR = irreversible choice.  
3. **Spaced-repetition schedule** — Review the four-scope model at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Ask: “What would a reader need to know that the code cannot express?” Answer at the smallest applicable scope.

## 10. What this unlocks
Mastery of these documentation layers removes the largest source of friction when moving from reading to modifying production code.  

- Enables safe large-scale refactoring  
- Supports automated API documentation generators  
- Provides the raw material for architecture review boards  
- Prepares the ground for formal methods that treat contracts as first-class artefacts  

## 11. Self-check — five questions, no answers
1. Which single line of the expression `x &= x - 1` most requires an inline comment, and why?  
2. Write the minimal docstring for a function that may raise both `ValueError` and `TimeoutError`; justify the order of sections.  
3. A README contains a 40-line “How the algorithm works” essay. What rule has been violated and what is the corrective action?  
4. An ADR records a decision that was later reversed. Which field must be updated and what new ADR should be created?  
5. Given a 200-line module containing 12 functions and zero docstrings, rank the order in which you would add documentation layers to minimise time-to-first-correct-edit for a new maintainer.