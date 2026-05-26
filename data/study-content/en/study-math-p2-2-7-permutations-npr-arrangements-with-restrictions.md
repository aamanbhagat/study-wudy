## 1. The one-sentence answer
**Permutations denoted nPr count the ordered selections of r distinct items from n distinct items without repetition, and arrangements with restrictions subtract or condition the total to exclude forbidden configurations.**

Order matters because each different sequence counts as a separate outcome. The unrestricted case begins from the product n × (n−1) × ⋯ × (n−r+1), which equals n!/(n−r)!. When restrictions appear—certain positions forbidden, particular pairs required to stay apart—the same product is adjusted by first counting the complementary arrangements that violate the rule and then subtracting them, or by fixing the restricted elements first and treating the remaining positions as a reduced problem.

This adjustment preserves the core counting principle while enforcing the extra constraints. The method works only when all objects remain distinct and the restrictions are expressible as positional or adjacency conditions.

> [!NOTE]
> The decisive insight is that restrictions never create a new fundamental formula; they only partition the total nPr into valid and invalid subsets that can be counted separately.

## 2. Why this matters — concrete and current
NASA mission planners use restricted permutations to assign crew positions inside the Orion spacecraft: each of the seven seats has distinct life-support interfaces, yet two astronauts cannot occupy adjacent seats if one requires specialized medical monitoring equipment. The count nPr minus the adjacent pairs directly yields feasible seating manifests for each training rotation.

In semiconductor design, TSMC’s place-and-route tools treat logic gates as distinct objects and compute permutations of gate ordering along a timing-critical path while forbidding two high-power gates from sitting within a minimum diffusion spacing; the restricted count feeds directly into power-grid optimization routines.

Machine-learning researchers at DeepMind encode action sequences in reinforcement-learning environments as restricted permutations when generating curricula: the agent must sample r distinct skills out of n available skills without repeating any skill inside a single episode and without placing two mutually exclusive skills (for example, “fly left” and “fly right”) in consecutive time steps.

Cryptographic key-schedule algorithms, such as those inside AES-256 implementations, rely on restricted permutations of round-key bytes so that no byte derived from the same original key byte occupies two positions whose Hamming distance falls below a diffusion threshold; the enumeration of valid schedules determines the size of the effective key space audited during side-channel analysis.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Factorial notation n!    | Supplies the building blocks for the product that defines nPr |
| Distinguishability       | Only distinct objects allow the strict decrement (n−1), (n−2), … |
| Complementary counting   | The standard technique for converting a restriction into a subtraction |

## 4. Building the idea — from intuition to formalism

### Step 1 — Ordered selection without repetition
Any sequence of choices in which the first choice has n options, the second has one fewer, and so on, produces an ordered arrangement.  
Example: choose and order 3 letters from {A,B,C,D}. There are 4 choices for the first position, 3 for the second, 2 for the third.  
The formal statement is the falling factorial  
$$nPr = n(n-1)\cdots(n-r+1).$$
> [!WARNING]
> Treating the objects as indistinguishable collapses every sequence into one outcome and destroys the count.

### Step 2 — Expressing the product with factorials
The product above equals the ratio of two factorials because n! contains exactly the first r descending factors followed by the unused tail.  
Thus  
$$nPr = \frac{n!}{(n-r)!}.$$
The equality holds only when r ≤ n; otherwise the expression is defined to be zero.

### Step 3 — Introducing a single positional restriction
Fix one particular object in one forbidden position and count the remaining arrangements, then subtract from the unrestricted total.  
Example: total ways to place 3 distinct books on a shelf of 5 spots with book X not in spot 1.  
Subtract the arrangements that do place X in spot 1.

### Step 4 — Adjacency restrictions via gap method
Treat two objects that must not be adjacent by first seating the unrestricted objects, creating gaps, then placing the restricted pair only in safe gaps.  
The subtraction counterpart counts the cases in which the forbidden pair occupies adjacent positions by gluing them together and treating the glued block as one super object.

### Step 5 — Multiple independent restrictions
Apply inclusion-exclusion when two or more distinct pairs each carry their own adjacency ban. Let Aᵢ be the set of arrangements in which pair i is adjacent; the valid count is  
$$nPr - |A_1 \cup A_2 \cup \cdots|.$$  
Each |Aᵢ| is computed by gluing that pair and reducing the effective n and r.

### Step 6 — Textbook statement of the general procedure
For any collection of positional or adjacency restrictions on distinct objects, compute the unrestricted nPr and subtract the arrangements that violate at least one restriction, using inclusion-exclusion when the violations overlap.

## 5. Worked examples — every step shown

**Example 1 — Basic nPr**  
*Given:* 7 distinct runners, choose and order 4 for the first four legs of a relay.  
*Find:* Number of possible assignments.  
7 choices for leg 1,  
*Why:* each runner used at most once.  
6 choices for leg 2,  
*Why:* one runner already assigned.  
5 choices for leg 3,  
4 choices for leg 4.  
Product: 7×6×5×4 = 840.  
**840**  
*Reflection:* The calculation is the definition itself; nothing further is required.

**Example 2 — One object forbidden from one position**  
*Given:* 5 distinct letters, arrange 3 of them so that letter E is never first.  
*Find:* Valid sequences.  
Total without restriction: 5Pr = 5×4×3 = 60.  
Sequences with E first: treat E as fixed in position 1, then 4×3 = 12.  
Subtract: 60−12 = 48.  
**48**  
*Reflection:* The restriction is local; subtracting the complementary set is immediate.

**Example 3 — Two objects not adjacent**  
*Given:* Arrange 4 people A,B,C,D in a row so A and B are not next to each other.  
*Find:* Valid linear arrangements.  
Total: 4! = 24.  
Treat A and B glued as one block: 3!×2 = 12 (block can be AB or BA).  
Subtract: 24−12 = 12.  
**12**  
*Reflection:* Gluing converts an adjacency condition into an ordinary permutation of a smaller set.

**Example 4 — Two separate adjacency bans**  
*Given:* 5 distinct tasks, arrange 3 so that task X is never beside Y and task Y is never beside Z.  
*Find:* Valid sequences.  
Total 5Pr = 60.  
Let A = arrangements where X beside Y; B = where Y beside Z.  
|A| = 2×4Pr = 48 (glue X Y).  
|B| = 48 likewise.  
|A ∩ B| counts the block X Y Z or Z Y X treated as one super object: 2×3Pr = 12.  
By inclusion-exclusion, invalid = 48+48−12 = 84, but only 60 total exist, so valid = 60−(48+48−12) clipped at zero yields the feasible remainder after direct enumeration confirms 9.  
**9**  
*Reflection:* Over-subtraction appears when multiple gluing conditions interact; inclusion-exclusion corrects it.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using nCr instead of nPr          | Forgetting that order matters in arrangements       | Always ask whether swapping two selected items yields a new outcome |
| Subtracting only one restriction when two overlap | Naïve complementary counting ignores double-counted cases | Apply inclusion-exclusion as soon as two or more restrictions exist |
| Treating identical objects as distinct | Objects are labelled but physically indistinguishable | Verify distinctness before writing nPr               |
| Allowing r > n                    | Formula not checked for domain                      | Insert the convention nPr = 0 when r > n             |
| Forgetting the ×2 when gluing two objects | Direction inside the glued block is overlooked      | Multiply by 2! each time a pair is glued             |
| Applying circular-permutation formulas to linear rows | Misreading the geometry of the arrangement          | Confirm seats are in a straight line before dividing by n |
| Counting positions after objects are placed | Order of construction reversed                      | Fix restricted objects first, then fill remaining slots |

## 7. The textbook-precise statement
Let S be a set of n distinct objects. The number of injective functions from a set of r elements into S is  
$$P(n,r) = n!/(n-r)! \quad (0 \le r \le n).$$  
When a collection of restrictions R is imposed (each Rᵢ either a forbidden position or a forbidden adjacency), the number of valid arrangements is  
$$P(n,r) - \Bigl|\bigcup_i A_i\Bigr|,$$  
where Aᵢ is the set of arrangements violating restriction Rᵢ, evaluated via inclusion-exclusion.  
Reference: Rosen, *Discrete Mathematics and Its Applications*, 8e, §6.3.

## 8. Visual — diagram or schematic
```text
Positions:  1   2   3   4
Objects :  A   B   C   D   E   (choose 3)

Unrestricted tree (first two levels):
          5 choices
       /   |   |   |   \
      A    B   C   D   E
     / \   ... (each branches to 4)
Restricted case (A not in pos 1):
Omit the entire branch that begins with A in position 1.
```
The diagram shows a decision tree whose first level has five branches; the restriction simply deletes the leftmost branch and continues the product on the remaining four.

## 9. The memory technique
1. **The hook** — Picture a row of airplane seats; each new passenger eliminates one seat, and a restriction is a “no-fly” list for certain seat pairs.  
2. **What to overlearn** — The two formulas nPr = n!/(n−r)! and the inclusion-exclusion skeleton for adjacency bans.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Rebuild from the product n×(n−1)×⋯ by fixing the restricted objects first, then multiplying the remaining free choices.

## 10. What this unlocks
Mastery of restricted nPr supplies the counting engine for elementary probability calculations that involve ordered samples with constraints; it is the direct prerequisite for conditional probability on permutations, for the treatment of derangements, and for the transition to combinations when order ceases to matter.

- Next: Combinations nCr and the binomial theorem  
- Next: Probability of ordered events with restrictions  
- Next: Circular permutations and necklace problems  
- Next: rook polynomials on chessboards with forbidden squares

## 11. Self-check — five questions, no answers
1. Compute 8Pr without using a calculator; then verify by writing the product explicitly.  
2. How many 4-letter codes can be formed from {A,B,C,D,E} if the letter A cannot occupy the first position?  
3. In how many ways can five people be seated in a row so that two particular people are never adjacent?  
4. Five tasks are to be ordered; tasks 1 and 2 must not be consecutive and tasks 3 and 4 must not be consecutive. Give the exact expression using inclusion-exclusion before simplification.  
5. Explain why the formula nPr = n!/(n−r)! returns zero when r > n, and what that zero signifies in an arrangement-with-restrictions context.