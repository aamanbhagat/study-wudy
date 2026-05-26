## 1. The one-sentence answer
**Compound inequalities combine two or more simple inequalities with the logical connectives AND or OR, restricting the solution set to the intersection or union of the individual solution sets.**

An inequality such as \(x > 3\) describes a ray on the number line. When two such rays or intervals must both hold at once, their common region is the set of values satisfying the compound statement with AND. When either condition is allowed to hold, the combined region is the set satisfying the compound statement with OR.

The distinction between these connectives is purely logical. AND requires every listed condition to be true simultaneously; OR requires only that at least one listed condition be true. Once the logical meaning is fixed, the algebraic work reduces to solving each simple inequality separately and then combining the resulting intervals according to the chosen connective.

> [!NOTE]
> The single most important insight is that the solution set of an AND compound is always contained inside every individual solution set, while the solution set of an OR compound always contains every individual solution set.

## 2. Why this matters — concrete and current
In semiconductor process control, engineers at TSMC must keep both wafer temperature between 298 K and 302 K and chamber pressure between 1.8 Pa and 2.2 Pa during deposition; the acceptable operating window is exactly the AND intersection of these two intervals.

Flight-control software on SpaceX Falcon 9 stages continuously monitors both structural load factor and propellant-tank pressure; the abort logic triggers when either threshold is crossed, which is an OR union of two half-planes in state space.

In quantitative finance, a covered-call strategy on an equity requires the underlying price to lie simultaneously above the strike and below a chosen profit cap; the position remains open only inside that AND interval.

Meteorological models at the European Centre for Medium-Range Weather Forecasts issue frost warnings when surface temperature drops below 0 °C or wind chill falls below −5 °C; the alert region is the OR union of those two conditions.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Simple linear inequalities | Every compound inequality is built from them              |
| Interval notation        | Compact way to record solution sets before combining them |
| Number-line representation | Visual test for intersection versus union                 |
| Basic set operations     | AND corresponds to intersection; OR corresponds to union  |

## 4. Building the idea — from intuition to formalism

### Step 1 — A single inequality carves a ray or interval
Any linear inequality such as \(x \ge -1\) describes all real numbers on one side of a boundary point. On the number line this is a closed ray beginning at −1.

### Step 2 — Two inequalities together create two separate cuts
Consider the pair \(x \ge -1\) and \(x < 4\). Each inequality produces its own ray or interval; the compound statement decides how these two regions are merged.

### Step 3 — AND keeps only the overlapping segment
The logical word AND retains only those numbers that lie inside both regions at once. The resulting set is the intersection of the two intervals.

\[
\{x \mid x \ge -1\} \cap \{x \mid x < 4\} = [-1,4)
\]

> [!WARNING]
> Treating the boundary points independently of the connective will produce an incorrect interval; the closed or open character of each endpoint must be preserved exactly.

### Step 4 — OR keeps the entire combined region
The logical word OR retains every number that satisfies at least one of the inequalities. The resulting set is the union of the two intervals.

\[
\{x \mid x \ge -1\} \cup \{x \mid x < 4\} = (-\infty,4)
\]

### Step 5 — Formal definition via solution sets
Let \(A\) and \(B\) be the solution sets of two inequalities. The compound inequality with AND has solution set \(A \cap B\); the compound inequality with OR has solution set \(A \cup B\).

## 5. Worked examples — every step shown

**Example 1 — Simple AND with matching directions**  
*Given:* Solve \(x > 2 \land x < 7\).  
*Find:* The solution set in interval notation.  

Solve each inequality:  
\(x > 2\) gives \((2,\infty)\).  
*Why:* The boundary 2 is excluded by the strict inequality.  

\(x < 7\) gives \((-\infty,7)\).  
*Why:* The boundary 7 is excluded.  

Intersect the intervals:  
\((2,\infty) \cap (-\infty,7) = (2,7)\).  
*Why:* The overlapping region begins immediately after 2 and ends immediately before 7.  

**Final answer**  
\[(2,7)\]

*Reflection:* The two inequalities pointed toward each other, so their intersection is a bounded open interval; this pattern generalizes to any “between a and b” statement.

**Example 2 — AND with one inclusive endpoint**  
*Given:* Solve \(-3 \le x \land x < 5\).  
*Find:* The solution set.  

\(-3 \le x\) gives \([-3,\infty)\).  
*Why:* The boundary −3 is included.  

\(x < 5\) gives \((-\infty,5)\).  
*Why:* The boundary 5 is excluded.  

Intersection:  
\([-3,\infty) \cap (-\infty,5) = [-3,5)\).  

**Final answer**  
\[-3,5)\]

*Reflection:* Mixed inclusive/exclusive endpoints survive unchanged in an AND intersection.

**Example 3 — OR with disjoint intervals**  
*Given:* Solve \(x < -1 \lor x \ge 4\).  
*Find:* The solution set.  

\(x < -1\) gives \((-\infty,-1)\).  
\(x \ge 4\) gives \([4,\infty)\).  

Union:  
\((-\infty,-1) \cup [4,\infty)\).  

**Final answer**  
\[(-\infty,-1) \cup [4,\infty)\]

*Reflection:* When the intervals do not overlap, the union simply writes both pieces side by side.

**Example 4 — OR that covers the whole line**  
*Given:* Solve \(x \le 0 \lor x > -2\).  
*Find:* The solution set.  

\(x \le 0\) gives \((-\infty,0]\).  
\(x > -2\) gives \((-2,\infty)\).  

Union:  
\((-\infty,0] \cup (-2,\infty) = (-\infty,\infty)\).  
*Why:* The second interval already contains the first.

**Final answer**  
\[(-\infty,\infty)\]

*Reflection:* An OR compound can collapse to the entire real line when one interval contains the other.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Reversing inequality sign when multiplying by negative | Mechanical habit overrides logic            | Check the sign of the multiplier before each step |
| Writing “and” when the intervals are disjoint | Visual overlap is empty, yet the word feels natural | Always test a number from each interval      |
| Treating OR as intersection       | Confusion between everyday “or” and logical OR | Draw both intervals; the union is everything shaded |
| Forgetting to flip the endpoint type | Copying symbols without checking connective | Re-examine each original inequality after solving |
| Solving only one side of an AND   | Assuming the stricter bound automatically satisfies the other | Solve both inequalities independently first  |
| Using commas instead of union symbol | Notation confusion with lists               | Use \(\cup\) for OR and \(\cap\) for AND consistently |
| Including the boundary when the inequality is strict | Boundary symbol is written but not read     | Circle strict symbols before writing interval notation |

## 7. The textbook-precise statement
Let \(P(x)\) and \(Q(x)\) be open sentences each defining a subset of \(\mathbb{R}\). The compound sentence  
\[
P(x) \land Q(x)
\]  
has solution set  
\[
\{x \in \mathbb{R} \mid P(x) \text{ is true}\} \cap \{x \in \mathbb{R} \mid Q(x) \text{ is true}\}.
\]  
The compound sentence  
\[
P(x) \lor Q(x)
\]  
has solution set equal to the corresponding union. (See Lay, *Linear Algebra and Its Applications*, 6e, §1.1 for the set-builder notation and interval arithmetic.)

## 8. Visual — diagram or schematic

```text
Number line for  -3 ≤ x  AND  x < 5
-∞ ----(-3]================[5)---- ∞
          ▲ closed          ▲ open

Number line for  x < -1  OR  x ≥ 4
-∞ ===(-1)--------[4===∞
       ▲ open       ▲ closed
```

The shaded segments above show intersection (single contiguous block) versus union (two separate blocks).

## 9. The memory technique

1. **The hook** — Picture a locked gate that opens only when *both* keys turn (AND) versus a gate that opens when *either* key turns (OR).
2. **What to overlearn** — The symbols \(\cap\) for AND and \(\cup\) for OR; the rule that AND never enlarges a solution set while OR never shrinks it.
3. **Spaced-repetition schedule** — Review the intersection/union definitions after 1 day, again after 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Redraw the two intervals on a number line, shade each solution set, then shade only the overlapping region for AND or the total shaded region for OR.

## 10. What this unlocks
Mastery of compound inequalities supplies the logical scaffolding for systems of inequalities, linear programming feasible regions, and interval arithmetic used in verified numerical computing.

- Systems of linear inequalities in two variables
- Feasible-region description in linear programming
- Domain restrictions when solving radical or rational equations
- Piecewise function definitions
- Constraint propagation in satisfiability solvers

## 11. Self-check — five questions, no answers
1. Solve \(2x-1 > 5 \land 3x+4 < 19\) and express the answer in interval notation.
2. Determine whether the compound statement \(x \ge 0 \lor x \le -1\) covers every real number; justify with a counter-example if it does not.
3. Graph the solution set of \(-4 < x \le 2 \land x \ne 0\) on a number line and write it using interval notation with a union if necessary.
4. Explain why the solution set of \(x < 3 \lor x > 1\) equals \((-\infty,\infty)\).
5. A temperature \(T\) must satisfy both \(T > 20\) and \(T \le 35\) while pressure \(P\) must satisfy \(P < 5\) or \(P > 8\). Write the four-variable compound inequality describing the safe operating region.