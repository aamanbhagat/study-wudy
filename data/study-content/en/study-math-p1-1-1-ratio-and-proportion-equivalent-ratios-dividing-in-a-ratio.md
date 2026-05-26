## 1. The one-sentence answer
**A ratio compares two quantities by division; two ratios are equivalent when one is a scalar multiple of the other; dividing a quantity in a given ratio means partitioning it into parts whose sizes stand in that ratio.**

A ratio states how many times larger one amount is than another. Write the comparison as \(a:b\) or \(\frac{a}{b}\). Scaling both numbers by the same positive integer leaves the comparison unchanged, so \(2:3\) and \(4:6\) describe identical relative sizes.

When a total quantity must be split so that the parts stand in the ratio \(m:n\), first add the parts to obtain the total number of shares, then multiply each share by the actual size of one share. The resulting parts sum back to the original total and satisfy the stated ratio.

> [!NOTE]
> The single operation that generates every equivalent ratio and every correct division is multiplication by the same positive number on both sides of the comparison; nothing else preserves the relative sizes.

## 2. Why this matters — concrete and current
In semiconductor process control, engineers maintain dopant-to-silicon ratios inside a crystal-growth furnace; a 1:10 000 deviation measured by secondary-ion mass spectrometry determines whether a wafer batch meets 3 nm node specifications at TSMC.

NASA’s Artemis program allocates propellant mass between liquid hydrogen and liquid oxygen tanks in the fixed ratio 1:6 by mass; any deviation changes specific impulse and aborts the lunar trajectory computed by the Orion guidance computer.

In large-language-model training runs at OpenAI, the dataset is partitioned into training, validation, and test subsets using the ratio 90:5:5; the exact split controls both the number of tokens seen by each GPU and the statistical power of the final benchmark numbers reported in the technical report.

Pharmaceutical compounding pharmacies calculate active-ingredient to excipient ratios when preparing paediatric suspensions; a 1:50 ratio of antibiotic to syrup base must be reproduced to within 2 % or the delivered dose falls outside the FDA-approved therapeutic window.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Multiplication facts | Scaling both parts of a ratio by the same integer         |
| Division with remainders | Determining how many whole shares fit into a total      |
| Order of operations  | Evaluating expressions such as \(\frac{m}{m+n}\times T\)  |

## 4. Building the idea — from intuition to formalism

### Step 1 — Compare two quantities
Two lengths can be compared by asking how many times one fits into the other.  
Example: a stick 6 cm long and another 9 cm long. The shorter fits into the longer \( \frac{9}{6} = 1.5 \) times.  
Formal statement: the ratio of quantity \(A\) to quantity \(B\) is the quotient \(\frac{A}{B}\).  
> [!WARNING]  
> Treating the ratio as a subtraction instead of a division destroys the scaling property that later steps rely on.

### Step 2 — Record the comparison with two numbers
The same relationship can be written without division by keeping both original numbers: 6:9.  
This notation is read “6 to 9”.  
Formal statement: \(A:B\) denotes the ordered pair \((A,B)\) understood up to positive scaling.

### Step 3 — Generate equivalent ratios by scaling
Multiply both numbers by any positive integer \(k\):  
\(6:9 = (6k):(9k)\).  
Example: \(k=2\) yields 12:18, still the same relative size.  
Formal statement: \(A:B \equiv (kA):(kB)\) for all \(k>0\).  
> [!WARNING]  
> Using different multipliers on each side produces a different ratio and is the most common source of later arithmetic errors.

### Step 4 — Decide whether two ratios are equivalent
Two ratios \(A:B\) and \(C:D\) are equivalent precisely when the cross-products are equal: \(A\cdot D = B\cdot C\).  
Example: 4:6 and 10:15 satisfy \(4\cdot15=6\cdot10=60\).

### Step 5 — Divide a total quantity into the stated parts
Let total \(T\) be divided in ratio \(m:n\).  
Compute one share size \(s = \frac{T}{m+n}\).  
First part = \(m\cdot s\), second part = \(n\cdot s\).  
Formal statement: the parts are \(\frac{m}{m+n}T\) and \(\frac{n}{m+n}T\).

## 5. Worked examples — every step shown

**Example 1 — Scale a ratio**  
*Given:* ratio 5:7; multiply by 4.  
*Find:* equivalent ratio.  
Multiply first term: \(5\times4=20\).  
*Why:* definition of equivalence requires identical multiplier.  
Multiply second term: \(7\times4=28\).  
*Why:* same multiplier preserves relative size.  
**20:28**

*Reflection:* the operation is reversible by dividing both terms by 4; this reversibility is used constantly in simplification.

**Example 2 — Check equivalence**  
*Given:* 9:12 and 15:20.  
*Find:* are they equivalent?  
Cross-multiply: \(9\times20=180\), \(12\times15=180\).  
*Why:* equality of cross-products is the test derived in Step 4.  
**Yes, they are equivalent.**

*Reflection:* the test works even when numbers are large; no need to reduce first.

**Example 3 — Divide money**  
*Given:* £240 to be shared in ratio 3:5.  
*Find:* each share.  
Add parts: \(3+5=8\).  
*Why:* total number of equal shares.  
One share: \(\frac{240}{8}=30\).  
*Why:* division distributes the total evenly.  
First person: \(3\times30=90\).  
*Why:* three shares.  
Second person: \(5\times30=150\).  
*Why:* five shares.  
**£90 and £150**

*Reflection:* the two amounts sum to 240, confirming conservation.

**Example 4 — Mix solutions**  
*Given:* 750 ml of 2:3 acid-to-water mixture.  
*Find:* volume of acid.  
Add parts: 5.  
Acid fraction: \(\frac{2}{5}\).  
*Why:* ratio supplies the numerator.  
Acid volume: \(\frac{2}{5}\times750=300\).  
*Why:* multiplication converts fraction to actual quantity.  
**300 ml of acid**

*Reflection:* the same arithmetic yields the water volume (450 ml) without a second ratio.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Adding instead of multiplying     | Confuses ratio with total quantity          | Always scale both parts by the same factor   |
| Using different multipliers       | Forgetting the definition of equivalence    | Write the multiplier once and apply to both  |
| Forgetting to add parts before dividing | Treating ratio as already the total      | Add the ratio numbers first                  |
| Treating ratio as a fraction only | Losing the ordered-pair view                | Keep both colon and fraction forms side-by-side|
| Reversing order of terms          | Reading “A to B” as “B to A”                | Label each quantity explicitly before writing|
| Scaling by zero or negative       | Ignoring domain restriction \(k>0\)         | State \(k>0\) at the start of every scaling  |
| Not checking that parts sum to total | Arithmetic slip after multiplication     | Add the two final parts and compare with \(T\)|

## 7. The textbook-precise statement
Let \(a,b,c,d\) be positive real numbers. The ratios \(a:b\) and \(c:d\) are equivalent if and only if there exists \(k>0\) such that \(c=ka\) and \(d=kb\), or equivalently \(ad=bc\). To divide a positive quantity \(T\) in the ratio \(m:n\) where \(m,n>0\), assign the parts \(\frac{m}{m+n}T\) and \(\frac{n}{m+n}T\). (See: Rosen, *Elementary Number Theory and Its Applications*, 6e, §1.2, and any standard arithmetic text covering rational numbers.)

## 8. Visual — diagram or schematic
```text
Total length T
|------------|------------|------------|------------|------------|
     m parts       n parts
     each of size s = T/(m+n)
```
Label the leftmost m segments “first share” and the remaining n segments “second share”. The vertical bar at the division point sits at distance \(\frac{m}{m+n}T\) from the left end.

## 9. The memory technique

1. **The hook** — Picture a cake recipe calling for “2 cups flour to 3 cups sugar”; every time you double the recipe you multiply both numbers by the same factor, exactly as equivalent ratios demand.
2. **What to overlearn** — The cross-multiplication test \(ad=bc\); the part-sum formula \(\frac{m}{m+n}T\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive every equivalent ratio by multiplying both terms by an arbitrary positive integer \(k\), then recover the division rule by solving \(m s + n s = T\) for \(s\).

## 10. What this unlocks
Mastery of ratios supplies the language for rates, percentages, similar triangles, and linear relationships that appear throughout algebra and physics.

- Proportional reasoning in similar figures and scale drawings
- Constant-speed and constant-rate problems in kinematics
- Weighted averages and mixture equations in chemistry
- Probability weights and expected-value calculations
- Dimensional analysis and unit conversion factors

## 11. Self-check — five questions, no answers
1. Write three ratios equivalent to 7:4.  
2. Determine whether 18:24 and 27:36 are equivalent and justify with cross-multiplication.  
3. Divide 560 marbles in the ratio 4:3. State both resulting counts.  
4. A 1.2 L solution is mixed in the ratio 5:7. How many millilitres of the first component are present?  
5. A student claims that 2:5 is the same as 5:2 because both contain the digits 2 and 5. Identify the precise mathematical error in this reasoning.