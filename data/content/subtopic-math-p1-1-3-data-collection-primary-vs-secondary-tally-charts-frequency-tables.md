## What it is
Data collection is the process of gathering information to answer a specific question. Primary data is collected directly by you for your specific purpose, while secondary data was collected by someone else previously. Tally charts and frequency tables are the most basic mathematical tools used to organize and compress raw, unstructured data into a readable format.

## Why it matters
Before you can train a machine learning model or analyze telemetry from a rocket test stand, you must understand where your data comes from and how to structure it. Poorly collected or unstructured raw data leads to garbage-in, garbage-out (GIGO) scenarios. Frequency tables are the absolute foundation of probability distributions, which govern everything from quantum mechanics to the expected failure rates of aerospace components.

## When to study it
You should already understand basic arithmetic (addition, counting) and how to read a simple grid or table. If you cannot reliably count items or add single-digit numbers, review basic arithmetic first. No advanced mathematics is required for this module.

## How to study it (step by step)
1. **Define your data needs:** Choose a simple real-world variable (e.g., the manufacturer of cars passing your window) and decide if you need primary data (you looking out the window) or secondary data (looking up a traffic study online).
2. **Collect raw data:** Spend 10 minutes observing and writing down the raw, unstructured results in a sequential list.
3. **Build a tally chart:** Set up a table. Read through your raw list one by one, crossing out each item as you draw a tally mark (groups of five) in the corresponding category.
4. **Convert to a frequency table:** Translate the tally marks into integers. This integer is called the *frequency*, denoted as $f$.
5. **Verify the total:** Sum the frequencies. Ensure $\sum f = N$, where $N$ is your total number of observations. If they do not match, you made an error in step 3.

## Key ideas, with intuition
* **Primary vs. Secondary Data:** Primary means "First-hand" (you attached the thermocouple and measured the rocket engine temperature). Secondary means "Second-hand" (you downloaded NASA's historical temperature logs). Primary is tailored to your exact problem but expensive to gather; secondary is cheap but might not perfectly fit your parameters.
* **Raw Data is Useless at Scale:** A list like `[Red, Blue, Red, Red, Green, Blue]` scales terribly. If you have 10,000 observations, a raw list tells you nothing. We need aggregation.
* **Tallying as Chunking:** Tallying uses a unary numeral system but chunks by fives (four vertical lines, one diagonal stroke). This optimizes human visual processing. We can instantly recognize groups of five without counting them individually.
* **The Frequency Table Constraint:** A frequency table maps a category $x_i$ to a frequency $f_i$. The fundamental mathematical constraint is conservation of data. The sum of all frequencies must equal the total number of data points $N$:
  $$\sum_{i=1}^{k} f_i = N$$
  where $k$ is the number of distinct categories.

## Worked example
Suppose you are testing a batch of 15 bolts for a rocket payload adapter. You measure their diameters and categorize them as "Undersized" (U), "Nominal" (N), or "Oversized" (O). 

**Raw data:** N, N, U, O, N, N, N, U, N, O, N, N, U, N, N.

**Step 1: Set up the tally chart.**
Go through the list left to right. Strike through the letter in the raw data, and add a mark to the chart.
* U gets 3 marks.
* N gets 10 marks (two groups of five).
* O gets 2 marks.

**Step 2: Convert to a frequency table.**
Count the tallies to find $f_i$ for each category.
* $f_U = 3$
* $f_N = 10$
* $f_O = 2$

**Step 3: Verify.**
Calculate the sum of the frequencies:
$$\sum f_i = 3 + 10 + 2 = 15$$
Since $N = 15$, our table is verified.

*Reflection:* Crossing off raw data as you tally prevents double-counting. The frequency table instantly shows that "Nominal" dominates the batch—a fact that requires mental effort to extract from the raw string of letters.

## Diagrams
```text
Raw Data Stream: [N, N, U, O, N, N, N, U, N, O, N, N, U, N, N]

Category (x) | Tally      | Frequency (f)
----------------------------------------
Undersized   | |||        | 3
Nominal      | |||| ||||  | 10
Oversized    | ||         | 2
----------------------------------------
                          | Total N = 15
```

## Memory technique — remember this forever
1. **The Hook:** "Primary = Pioneer, Secondary = Scavenger." A pioneer maps the territory themselves. A scavenger uses maps others left behind.
2. **The Formula to overlearn:** 
   $$\sum_{i=1}^{k} f_i = N$$
3. **Spaced-repetition schedule:** Review this concept and re-derive the formula in 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget how to check a frequency table, remember *conservation of mass*. You cannot create or destroy data points during organization. The sum of the parts must equal the whole.

## Common mistakes
* **Miscounting raw data:** Skipping an item or counting it twice. *Solution:* Always physically cross off or delete raw data points as you tally them.
* **Skipping the verification step:** Failing to check if $\sum f_i = N$. This is the easiest way to catch a careless error. Never skip it.
* **Confusing the category with the frequency:** If you are counting the number of "5mm" bolts and "10mm" bolts, do not accidentally add the labels (5 and 10) instead of the frequencies (how many of each bolt you have).

## Self-check
1. You find a dataset of lunar crater diameters on Wikipedia to use for a physics project. Is this primary or secondary data?
2. Convert the raw data `[A, B, A, C, A, B, B, B]` into a frequency table. What is $N$?
3. A frequency table has categories $X, Y, Z$ with frequencies $f_X = 12$, $f_Y = 2x$, and $f_Z = 8$. If the total number of observations $N = 30$, what is the algebraic value of $x$?