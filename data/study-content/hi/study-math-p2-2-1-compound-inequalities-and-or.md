## 1. The one-sentence answer
**Compound inequalities combine two or more simple inequalities using the logical connectives AND or OR, restricting the solution set to values that satisfy the combined conditions simultaneously or alternatively.**

A compound inequality with AND requires every part to hold true at the same time, so the solution is the overlapping region on the number line. A compound inequality with OR accepts any value that satisfies at least one part, producing a union of intervals. Both cases are solved by treating each inequality separately first and then applying the logical connector to merge the results.

The key distinction is that AND narrows possibilities while OR widens them; misidentifying the connector immediately produces an incorrect interval.

> [!NOTE]
> The single most important insight is that the solution set of an AND compound inequality is the intersection of individual solution sets, while the solution set of an OR compound inequality is their union; every later manipulation is simply a mechanical way to compute that intersection or union on the real line.

## 2. Why this matters — concrete and current
In semiconductor manufacturing, process engineers at TSMC set compound temperature and pressure constraints during wafer deposition; the chamber must remain above 380 °C AND below 420 °C simultaneously, otherwise lattice defects appear and entire batches are scrapped.

In aerospace trajectory planning, SpaceX’s Falcon 9 guidance software evaluates velocity windows during re-entry: the vehicle may throttle down only when its speed is below 1200 m/s OR its altitude exceeds 45 km; satisfying either condition triggers the next burn sequence.

In machine-learning hyperparameter search, libraries such as Optuna encode feasibility regions as compound inequalities on learning rate and batch size; a trial is accepted only when learning rate lies between 1e-4 and 1e-2 AND batch size is a power of two, shrinking the search space without exhaustive enumeration.

In financial risk models at JPMorgan, Value-at-Risk calculations impose liquidity thresholds: a position is flagged for review when its 10-day volatility exceeds 3 % OR its correlation with the S&P 500 drops below 0.4; the OR connector ensures early detection of either isolated or systemic stress.

In climate science, the IPCC AR6 report defines compound drought-heat events as periods where precipitation remains below the 10th percentile AND temperature stays above the 90th percentile for at least five consecutive days; such joint conditions drive the majority of projected agricultural losses.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Solving linear inequalities | Every compound inequality is first broken into separate linear inequalities that must be solved correctly. |
| Interval notation        | The final answer is almost always expressed as an interval or union of intervals. |
| Number-line representation | Intersection and union become visually obvious only when drawn on a number line. |
| Basic set operations     | AND corresponds to set intersection; OR corresponds to set union. |

If any row above is unfamiliar, pause and master that single concept before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Separate the inequalities
Treat each inequality on its own; the logical connector is applied only after both solution sets are known.  
Example: solve \(x+3>5\) and \(2x<10\). First solve \(x>2\) and \(x<5\).  
Formal statement: given inequalities \(A\) and \(B\), compute solution sets \(S_A\) and \(S_B\) independently.  
> [!WARNING]
> Skipping this separation and attempting to manipulate both sides together usually produces sign errors or lost solutions.

### Step 2 — Draw each solution on the number line
Shade the region for each solved inequality; the visual overlap or coverage immediately reveals the compound result.  
Example: \(x>2\) shades (2, ∞); \(x<5\) shades (-∞, 5).  
Formal statement: represent \(S_A\) and \(S_B\) as subsets of \(\mathbb{R}\).

### Step 3 — Apply the logical connector
For AND, retain only the overlapping segment (intersection). For OR, retain every shaded point (union).  
Example: intersection of the two intervals is (2, 5).  
Formal statement: solution set \(S = S_A \cap S_B\) when the connector is AND; \(S = S_A \cup S_B\) when the connector is OR.

### Step 4 — Translate back to interval or inequality notation
Write the final shaded region using interval symbols or compound inequality symbols.  
Example: intersection yields \(2 < x < 5\).  
Formal statement: \(S = (2,5)\) or equivalently \(\{x\in\mathbb{R}\mid 2<x<5\}\).

### Step 5 — Verify boundary points
Test at least one point inside each candidate interval and at each boundary to confirm the connector was applied correctly.  
Example: test \(x=3\) (true for both) and \(x=6\) (fails AND).  
Formal statement: a point \(x_0\) belongs to the solution if and only if it satisfies the original compound statement.

### Step 6 — Record the solution set in set-builder form
Express the answer with full set notation so that later algebraic manipulations remain unambiguous.  
Formal statement: \(S = \{x\in\mathbb{R}\mid P(x)\}\) where \(P(x)\) encodes the logical combination of the original inequalities.

## 5. Worked examples — har step show karo

**Example 1 — Simple AND intersection**  
*Given:* Solve \(x-1\geq 4\) AND \(3x\leq 21\).  
*Find:* The solution set.  
Solve first inequality: \(x\geq 5\).  
Solve second: \(x\leq 7\).  
Intersection: \(5\leq x\leq 7\).  
*Why* each move: the connector AND forces both conditions, so only the common interval survives.  
**Final answer**  
\[5\leq x\leq 7\]  
*Reflection:* The example is straightforward; the same pattern scales when coefficients become negative.

**Example 2 — Simple OR union**  
*Given:* Solve \(x+2<1\) OR \(x-3>4\).  
*Find:* The solution set.  
First: \(x<-1\); second: \(x>7\).  
Union: \(x<-1\) or \(x>7\).  
*Why* each move: OR accepts any point that satisfies at least one inequality, so both rays are kept.  
**Final answer**  
\[x<-1 \quad\text{or}\quad x>7\]  
*Reflection:* Notice the gap between -1 and 7; that gap is excluded precisely because neither original inequality holds there.

**Example 3 — AND with negative coefficient**  
*Given:* Solve \(-2x>6\) AND \(x+4<9\).  
*Find:* The solution set.  
First inequality: divide by -2 and flip sign → \(x<-3\).  
Second: \(x<5\).  
Intersection: \(x<-3\).  
*Why* each move: sign flip occurs only on the isolated inequality; the AND connector is applied afterward.  
**Final answer**  
\[x<-3\]  
*Reflection:* Students often forget the sign flip; testing \(x=-4\) confirms the solution while \(x=-2\) fails.

**Example 4 — Mixed AND/OR with three parts**  
*Given:* Solve \(x\geq -1\) AND (\(x<2\) OR \(x>5\)).  
*Find:* The solution set.  
Inner OR gives \((-\infty,2)\cup(5,\infty)\).  
Intersect with \([ -1,\infty )\): \([-1,2)\cup(5,\infty)\).  
*Why* each move: parentheses dictate order; intersection trims only the leftmost ray.  
**Final answer**  
\[-1\leq x<2 \quad\text{or}\quad x>5\]  
*Reflection:* Parentheses change the logical grouping; without them the meaning would be different.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to flip inequality sign when multiplying by negative | Mechanical habit from equations             | Circle the negative coefficient before dividing |
| Treating AND and OR identically   | Visual similarity of the symbols            | Always draw the number line before writing the answer |
| Writing “and” when the connector is OR | Copying the problem statement without checking | Underline the logical word in the original question |
| Including the endpoint when a strict inequality is present | Boundary-test omission                      | Test the boundary value in the original inequality |
| Solving the compound inequality as a single chain without separation | Over-generalising “add/subtract from all parts” | Separate every inequality first, then combine |
| Confusing union symbol ∪ with intersection ∩ | Notation overload                           | Write the word “union” or “intersection” next to the symbol until automatic |
| Dropping solutions when an OR interval wraps around infinity | Infinity notation feels abstract            | Always shade both rays completely on the number line |

## 7. The textbook-precise statement
A compound inequality is a statement formed by joining two or more inequalities with the logical connectives “and” or “or.” Let \(A(x)\) and \(B(x)\) be open sentences involving the real variable \(x\). The compound statement \(A(x)\) and \(B(x)\) is true precisely when both \(A(x)\) and \(B(x)\) are true; its solution set is therefore \(\{x\in\mathbb{R}\mid A(x)\}\cap\{x\in\mathbb{R}\mid B(x)\}\). The compound statement \(A(x)\) or \(B(x)\) is true when at least one of \(A(x)\) or \(B(x)\) is true; its solution set is \(\{x\in\mathbb{R}\mid A(x)\}\cup\{x\in\mathbb{R}\mid B(x)\}\). (See Lay, *Linear Algebra and Its Applications*, 5e, §1.1, for the corresponding set-theoretic formulation.)

## 8. Visual — diagram or schematic
```
Number line (AND case)
-∞ ---- (2 ---- 5) ---- ∞
          ↑ overlap ↑
          shaded interval (2,5)

Number line (OR case)
-∞ ---- (-1)        (7 ---- ∞
       shaded     shaded
```

The diagram shows two separate rays for OR and a single closed segment for AND; every point inside a shaded region satisfies the compound statement.

## 9. The memory technique

1. **The hook**  
Imagine two spotlights on a number line: AND is the narrow patch where both beams overlap; OR is the entire area lit by either spotlight.

2. **What to overlearn**  
- AND → intersection ∩  
- OR → union ∪  
- Always solve each inequality separately before combining.

3. **Spaced-repetition schedule**  
Review the intersection/union distinction after 1 day, 3 days, 7 days, 16 days, and 35 days.

4. **First-principles fallback**  
If notation is forgotten, redraw the number line, shade each solution, and literally mark the overlapping or combined region; the shaded set is the answer.

## 10. What this unlocks
Mastery of compound inequalities supplies the logical scaffolding for systems of inequalities, linear programming, and interval arithmetic used in optimisation and computer-aided proofs.  

- Systems of linear inequalities in two variables  
- Feasible-region description in linear programming  
- Interval arithmetic in rigorous computing  
- Domain restrictions in function analysis  
- Constraint propagation in constraint-satisfaction solvers  

## 11. Self-check — five questions, no answers
1. Solve \(2x-3>5\) AND \(4-x\geq 1\) and express the answer in interval notation.  
2. Without solving, predict whether the solution set of \(x>0\) OR \(x<-2\) will contain a gap; justify in one sentence.  
3. Find the error in the following attempted solution: “\( -3x<6 \) and \(x>1\) gives \(x>-2\) and \(x>1\), therefore \(x>-2\)”.  
4. Write the compound inequality whose solution set is exactly \((-\infty,-4]\cup[7,\infty)\).  
5. A temperature \(T\) must satisfy \(T\geq 20\) AND (\(T<30\) OR \(T>40\)). Is \(T=35\) admissible? Show the logical evaluation.