## 1. The one-sentence answer
**Data collection distinguishes primary sources you gather yourself from secondary sources already existing, then organises raw observations into tally charts and frequency tables so patterns become visible and countable.**

Primary data means you design the collection process and record observations directly, while secondary data means you use records someone else already compiled. The moment you move from scattered observations to systematic marks, you begin converting qualitative or quantitative raw material into countable structure. Tally charts serve as the first mechanical bridge because each stroke groups five identical events, and frequency tables simply replace those strokes with exact integers.

> [!NOTE]
> The single insight that changes everything is that frequency is not the data itself; frequency is the count of how often each distinct value appears, and this count is what later probability statements actually operate on.

## 2. Why this matters — concrete and current
SpaceX records every telemetry packet from each Falcon 9 flight as primary data; analysts later combine it with historical launch logs that are secondary data to model failure rates before the next mission.  

In semiconductor fabs, TSMC collects primary sensor readings from every wafer in real time; these streams feed secondary databases that process engineers query to locate yield-loss patterns across thousands of lots.  

During the 2020 census, India’s Registrar General collected primary household responses door-to-door; demographers now treat that same dataset as secondary when they build migration models for urban planning.  

Modern recommender systems at Netflix treat each user click as primary data at ingestion; the same clicks become secondary training examples when the modelling team retrains the ranking algorithm weeks later.  

Climate researchers treat raw buoy temperature readings as primary; once those readings enter the HadCRUT archive they become secondary for every subsequent IPCC report.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Distinction between observation and record | Prevents treating someone else’s already-processed numbers as freshly observed facts |
| Counting versus measuring | Determines whether you will build a tally chart or a grouped frequency table |
| Notion of a variable taking repeated values | Makes the idea of “how many times” meaningful            |

If any row above is unfamiliar, pause and master that single idea first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Raw observations versus structured records
Aap notice events around you; each event is an observation. Until you write it down with a clear label and time, it remains unusable for later counting.  
Example: you see five red cars pass. The sentence “five red cars” is still an observation.  
Formal statement: Let \(O\) be the set of raw observations; a record is a function \(r: O \to V \times T\) where \(V\) is the value space and \(T\) is a timestamp.  
> [!WARNING]  
> Treating an already-summarised report as a fresh observation collapses the distinction between primary and secondary and produces double-counting later.

### Step 2 — Primary versus secondary collection
Primary collection means you control the instrument, the sampling frame, and the recording protocol. Secondary collection means you receive a finished dataset whose protocol you did not design.  
Example: conducting your own survey of 50 classmates is primary; downloading the same survey results from a government portal is secondary.  
Formal statement: Data \(D\) is primary for investigator \(I\) if \(I\) specified the sampling design; otherwise \(D\) is secondary for \(I\).

### Step 3 — The tally mark as a grouping operator
Each observation is marked by a vertical stroke. After four strokes a diagonal cross completes a group of five. This converts an unordered list into grouped cardinalities.  
Example: marks |||| |||| || become three groups and two singles, i.e., frequency 17.  
Formal statement: Let \(n(v)\) be the number of times value \(v\) appears; a tally chart realises the map \(v \mapsto \lfloor n(v)/5 \rfloor\) groups plus remainder.

### Step 4 — From tally to frequency table
Replace each completed group with its integer count. The table now contains two columns: distinct values and their frequencies.  
Example: value “red” has tally |||| || (7) becomes frequency 7.  
Formal statement: A frequency table is the function \(f: V \to \mathbb{N}\) where \(f(v) = |\{o \in O : r(o) = v\}|\).

### Step 5 — Absolute versus relative frequency
Divide each frequency by the total number of observations to obtain proportions. These proportions are the empirical probabilities that later probability models will estimate.  
Formal statement: Relative frequency \(\hat{p}(v) = f(v)/N\), \(N = \sum_v f(v)\).

### Step 6 — Textbook-grade definition
A dataset collected under a protocol designed by the analyst is primary; any other dataset is secondary. A tally chart is a visual device that records cardinality in multiples of five. A frequency table is the ordered pair \((V, f)\) where \(f\) is the counting function defined above.

## 5. Worked examples — har step show karo

**Example 1 — Simple primary tally**  
*Given:* You record the colour of 12 cars: red, blue, red, red, white, blue, red, blue, red, white, red, blue.  
*Find:* Build the tally chart and frequency table.  
Step 1: List distinct values → red, blue, white.  
Step 2: Count each → red appears 7 times, blue 4, white 2.  
Step 3: Draw tallies: red |||| ||, blue ||||, white ||.  
**red: 7, blue: 4, white: 2**  
*Reflection:* The example is easy because values are already categorical; the only skill is consistent grouping.

**Example 2 — Secondary data into frequency table**  
*Given:* A published table lists ages of 25 students: 14, 15, 14, 16, 15, 14, 15, 16, 14, 15, 14, 15, 16, 14, 15, 14, 16, 15, 14, 15, 16, 14, 15, 14, 15.  
*Find:* Frequency table.  
Step 1: Identify values 14, 15, 16.  
Step 2: Count → 14 appears 10, 15 appears 10, 16 appears 5.  
**14: 10, 15: 10, 16: 5**  
*Reflection:* Data arrived already recorded; you only performed the counting step.

**Example 3 — Mixed primary collection with tally**  
*Given:* You survey 30 classmates on transport mode and obtain: bus 12, metro 9, walk 5, cycle 4.  
*Find:* Present both tally and relative frequencies.  
Tally: bus |||| |||| ||, metro |||| ||||, walk ||||, cycle ||||.  
Frequencies: bus 12, metro 9, walk 5, cycle 4.  
Relative: bus \(12/30 = 0.4\), metro \(0.3\), walk \(0.167\), cycle \(0.133\).  
**Relative frequencies: 0.4, 0.3, 0.167, 0.133**  
*Reflection:* Relative frequencies prepare the ground for probability statements.

**Example 4 — Error detection in secondary table**  
*Given:* A report claims 40 students with frequencies 18, 15, 10 for three categories.  
*Find:* Verify consistency.  
Step 1: Sum frequencies → 18 + 15 + 10 = 43.  
Step 2: Compare with stated total → mismatch.  
**Inconsistency detected; data cannot be used without correction**  
*Reflection:* Always cross-check total frequency against reported sample size before any further calculation.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating a summarised report as primary | Forgetting the original collector’s protocol | Ask “Who defined the sampling frame?”        |
| Counting tallies as individual items | Miscounting the fifth diagonal stroke       | Always multiply complete groups by 5 first   |
| Forgetting to divide by total N   | Jumping straight to percentages             | Write the column “Relative frequency” immediately after absolute frequency |
| Using open-ended classes too early | Data appears continuous but you skip grouping rules | First build raw frequency table, then decide class width |
| Double-counting overlapping secondary sources | Not checking metadata timestamps            | Record source ID for every observation       |
| Ignoring missing values           | Treating blanks as zero frequency           | Add an explicit “Missing” row with its count |
| Rounding relative frequencies before summing | Losing the check that they must total 1     | Keep at least four decimals until final rounding |

## 7. The textbook-precise statement
A datum is primary for an investigator if that investigator specified the population, the sampling design, the measurement instrument, and the recording protocol; otherwise the datum is secondary. A tally chart for a finite set of observations \(O\) and value set \(V\) is a visual realisation of the function that maps each \(v \in V\) to \(\lfloor n(v)/5 \rfloor\) complete groups plus a remainder, where \(n(v) = |\{o \in O : value(o) = v\}|\). A frequency table is the ordered pair \((V, f)\) where \(f(v) = n(v)\). (Moore, *The Basic Practice of Statistics*, 8e, §1.1–1.2)

## 8. Visual — diagram or schematic
```
Value | Tally          | Frequency
------|----------------|----------
Red   | |||| ||        |   7
Blue  | ||||           |   4
White | ||             |   2
Total |                |  13
```
Each vertical line represents one observation; the diagonal crosses every fifth line.

## 9. The memory technique

1. **The hook**  
   Picture a shopkeeper striking matchsticks on a wooden plank; every fifth stick snaps into a bundle. The plank is the tally chart; the bundles are the frequencies.

2. **What to overlearn**  
   - Primary = you designed the protocol.  
   - Frequency \(f(v) = \) number of times \(v\) occurs.  
   - Relative frequency = \(f(v)/N\).

3. **Spaced-repetition schedule**  
   Review definitions after 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback**  
   If you forget the distinction, ask: “Did I choose the questions and the sample myself?” If yes, primary; otherwise secondary. Counting always reduces to “how many times does this exact value appear?”

## 10. What this unlocks
Mastery here lets you move directly into probability models, because every probability statement begins with an empirical frequency.  

- Construction of probability mass functions  
- Introduction of random variables  
- Rules for combining events (union, intersection)  
- Sampling distributions and the law of large numbers  
- Design of experiments that compare primary and secondary sources

## 11. Self-check — five questions, no answers
1. You download last year’s rainfall figures published by IMD. Are these primary or secondary for your project?  
2. Thirty students give their favourite subject; you draw |||| |||| |||| || for “Maths”. How many students chose Maths?  
3. A frequency table lists 12, 8, 5, 3. What is the relative frequency of the first category?  
4. A report states 50 observations yet the frequencies sum to 47. What single check reveals the error?  
5. You collect eye-colour data yourself and later combine it with a government health survey. Which part remains primary and which becomes secondary?