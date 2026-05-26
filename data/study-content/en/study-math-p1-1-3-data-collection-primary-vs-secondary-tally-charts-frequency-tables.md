## 1. The one-sentence answer
**Data collection organises raw observations into primary or secondary sources, then condenses them via tally charts into frequency tables that count occurrences of each category or value.**

Primary data arises when you gather the observations yourself for a specific purpose; secondary data consists of observations already collected by someone else. The distinction matters because primary collection lets you control exactly what is measured and how, while secondary sources trade control for speed and lower cost. Once observations exist, a tally chart records each item as a mark in its category so that no count is lost or double-counted; the resulting totals populate a frequency table whose rows list every distinct value or class and whose columns give the corresponding counts.

A frequency table therefore converts an unordered list of raw entries into a compact summary that immediately reveals which outcomes dominate and which are rare.

> [!NOTE]
> The single most powerful move is to treat every raw observation as belonging to exactly one cell of the eventual table; any ambiguity in category definition will propagate into every later calculation.

## 2. Why this matters — concrete and current
NASA’s Mars Sample Return mission logs every rock-core measurement on-site as primary data; later Earth-based laboratories re-analyse the same cores, treating the original logs as secondary data to calibrate new instruments.

Google’s COVID-19 Community Mobility Reports rely on aggregated, anonymised phone-location records that began as primary data inside Google; epidemiologists download the tables as secondary data to fit transmission models without repeating the original collection.

Semiconductor fabs record every wafer-defect coordinate as primary data during fabrication; process engineers later query historical defect tables (secondary) to train machine-learning classifiers that predict yield loss before the next lot starts.

The Large Hadron Collider stores petabytes of collision events as primary data; theorists publish frequency tables of particle signatures that other groups treat as secondary data when searching for rare decays.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Distinguishing a single observation from a collection of observations | Frequency tables count many observations, not one         |
| Ability to list distinct categories or values without overlap | Each observation must map to exactly one cell             |
| Basic counting       | Tally marks are a visual counting device                  |

## 4. Building the idea — from intuition to formalism

### Step 1 — Recognise that raw observations are unordered
Any list of measurements or answers arrives without inherent order.  
Example: the eye colours of ten classmates written on separate slips of paper.  
Formally, let \( S = \{x_1, x_2, \dots, x_n\} \) be the set of raw observations.  
> [!WARNING] Treating two identical values as already “counted” before systematic recording will under-count later.

### Step 2 — Decide whether the observations will be primary or secondary
Primary data are collected by the analyst for the present question; secondary data already exist.  
Example: asking classmates their eye colour yourself (primary) versus copying a published table of national eye-colour statistics (secondary).  
The choice is recorded as a binary attribute of the data source before any counting begins.

### Step 3 — Define mutually exclusive categories
Each observation must belong to one and only one category.  
Example: eye-colour categories {brown, blue, green, other}.  
Formally, the categories form a partition \( C_1, C_2, \dots, C_k \) of the possible values.

### Step 4 — Record each observation with a tally mark
Draw a vertical stroke for every observation; group every fifth stroke horizontally.  
Example: four brown eyes produce four strokes; the fifth produces a crossed bundle.  
This step converts the unordered set \( S \) into a set of running counts without mental arithmetic.

### Step 5 — Convert tallies into frequencies
Count the strokes in each category to obtain the frequency \( f_i \) for category \( C_i \).  
Formally, \( f_i = |\{ x \in S : x \in C_i \}| \).  
The list \( (C_1, f_1), \dots, (C_k, f_k) \) is the frequency table.

### Step 6 — Verify completeness
The sum of all frequencies must equal the total number of observations:  
\[
\sum_{i=1}^k f_i = n.
\]
Any discrepancy signals an error in category assignment or tallying.

## 5. Worked examples — every step shown

**Example 1 — Simple primary collection**  
*Given:* You ask five friends their favourite fruit and obtain: apple, banana, apple, apple, orange.  
*Find:* The frequency table.  
Step 1: Categories chosen = {apple, banana, orange}. *Why*: mutually exclusive and exhaustive.  
Step 2: Tally marks: apple |||, banana |, orange |. *Why*: each observation placed once.  
Step 3: Frequencies: apple 3, banana 1, orange 1. *Why*: count the strokes.  
**apple: 3, banana: 1, orange: 1**  

*Reflection:* The example is easy because categories were obvious; real data often require an explicit “other” category.

**Example 2 — Secondary data with an extra category**  
*Given:* A published table already lists 12 students’ transport modes but omits “cycle”. You add three cyclists from your own observation.  
*Find:* Updated frequency table.  
Step 1: Start with published frequencies: bus 5, walk 4, car 3. *Why*: secondary source accepted as-is.  
Step 2: Add primary tallies for cyclists: cycle |||. *Why*: new observations kept separate.  
Step 3: Sum check: 5+4+3+3=15. *Why*: total must match new sample size.  
**bus: 5, walk: 4, car: 3, cycle: 3**  

*Reflection:* Mixing primary and secondary requires explicit documentation of source for each row.

**Example 3 — Tallying grouped numerical data**  
*Given:* Heights (cm) of 20 plants: 12, 15, 14, 12, 18, 15, 12, 14, 15, 18, 12, 15, 14, 15, 18, 12, 15, 14, 15, 18.  
*Find:* Frequency table with classes 10–13, 14–17, 18–21.  
Step 1: Tally each value into its class. *Why*: raw values are continuous; grouping reduces noise.  
Step 2: Counts: 10–13: 6, 14–17: 9, 18–21: 5. *Why*: five bundles plus singles.  
Step 3: Verify 6+9+5=20.  
**10–13: 6, 14–17: 9, 18–21: 5**  

*Reflection:* Class boundaries must be chosen before tallying; changing them later forces a complete recount.

**Example 4 — Detecting an inconsistent category**  
*Given:* Survey responses for “pet owned”: dog, cat, dog, fish, dog, “none”, cat, bird.  
*Find:* Frequency table and any correction needed.  
Step 1: Initial categories {dog, cat, fish, bird, none}. *Why*: “none” is valid.  
Step 2: Tally: dog |||, cat ||, fish |, bird |, none |.  
Step 3: Sum = 8, matches sample size.  
**dog: 3, cat: 2, fish: 1, bird: 1, none: 1**  

*Reflection:* The trap avoided was treating “none” as missing data; it is a legitimate category.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Overlapping categories      | Categories defined with shared values       | Write explicit, non-overlapping rules first  |
| Forgetting the “other” bin  | Rare answers appear after tallying starts   | Include an “other” category from the outset  |
| Counting tallies instead of strokes | Mental shortcut when bundles look like single marks | Always count individual strokes, not bundles |
| Mixing primary and secondary without labels | Speed of copying existing tables            | Prefix every row with source tag P or S      |
| Changing class intervals mid-count | Desire to improve presentation              | Freeze class boundaries before any tallying  |
| Ignoring zero-frequency categories | Table looks cleaner without empty rows      | List every planned category even if f_i = 0  |
| Double-counting an observation | Same slip of paper read twice               | Physically move each observation after tallying |

## 7. The textbook-precise statement
A data set consists of n observations drawn from a universe of possible values. When the observations are collected expressly for the study at hand they are termed primary; when taken from existing records they are termed secondary. A tally chart assigns each observation to exactly one cell of a partition of the universe and records the assignment by a stroke. The frequency of cell i is the cardinality of the subset of observations falling in that cell. The resulting frequency table is the function f: C → ℕ satisfying ∑f(c) = n. (See Moore, McCabe & Craig, *Introduction to the Practice of Statistics*, 10e, §1.1–1.2.)

## 8. Visual — diagram or schematic
```text
Raw observations (unordered)
        │
        ▼
   Tally chart
   ┌──────────────┐
   │ apple  |||   │  ← 3
   │ banana |     │  ← 1
   │ orange |     │  ← 1
   └──────────────┘
        │
        ▼
Frequency table
Category │ Frequency
─────────┼──────────
apple    │    3
banana   │    1
orange   │    1
─────────┼──────────
Total    │    5
```

## 9. The memory technique
1. **The hook** — Picture a librarian stamping every returned book exactly once; the stamp is the tally mark and the shelf list is the frequency table.  
2. **What to overlearn** — Categories must be exhaustive and mutually exclusive; total frequency always equals sample size n.  
3. **Spaced-repetition schedule** — Review definitions at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Rebuild by listing every raw observation on separate slips, sorting the slips into piles (categories), then counting the size of each pile.

## 10. What this unlocks
Mastery of primary/secondary distinction and frequency tables supplies the raw material for every subsequent descriptive statistic and probability model.  
- Construction of bar charts and histograms  
- Calculation of sample mean, median and mode  
- Introduction to probability mass functions  
- Design of experiments that decide whether new data must be primary

## 11. Self-check — five questions, no answers
1. A researcher downloads last year’s national census file. Is this primary or secondary data for a study of household size?  
2. Thirty students list their birth months. Write the exact sequence of steps that turns the list into a frequency table.  
3. Why must the sum of frequencies equal the number of observations? What does a mismatch reveal?  
4. A survey question allows multiple answers (“select all that apply”). Which rule of frequency tables is violated and how would you repair the design?  
5. You have both hand-written lab notes (primary) and a published summary table (secondary) for the same experiment. Under what precise condition would you combine them into one frequency table?