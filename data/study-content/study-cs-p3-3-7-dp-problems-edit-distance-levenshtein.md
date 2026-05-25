## 1. What it is — in plain English

Imagine you have two words, like "kitten" and "sitting." You want to change "kitten" into "sitting" using the fewest possible steps. What kind of steps are allowed? You can either insert a letter, delete a letter, or change one letter into another (substitute). The "edit distance" between "kitten" and "sitting" is the smallest number of these operations you need to perform.

Think of it like a game where you're trying to fix a typo. If you typed "apple" but meant "apply," you could change the 'e' to a 'y' – that's one "edit." If you typed "bananna" and meant "banana," you could delete one 'n' – that's also one "edit." The goal is always to find the absolute minimum number of such changes.

This specific type of edit distance, which counts insertions, deletions, and substitutions each as one operation, is called the Levenshtein distance. It's a way to measure how "different" two strings are. A distance of zero means the strings are identical, while a larger distance means they require more changes to become the same.

## 2. Why it matters — real-world applications

The Levenshtein distance, and edit distance concepts in general, are fundamental in many computational tasks, especially those involving text or sequences.

1.  **Spell Checkers and Autocorrection:** When you type a word and your phone or computer suggests a correction, it often uses edit distance. For instance, if you type "recieve," a spell checker calculates its edit distance to common words. "Receive" has an edit distance of 1 (substitute 'i' for 'e'), making it a strong candidate for correction. This is crucial in applications like Microsoft Word, Google Docs, and even search engine query correction.
2.  **Bioinformatics and DNA Sequence Alignment:** In genetics, scientists compare DNA or protein sequences to understand evolutionary relationships or identify functional similarities. DNA sequences are essentially long strings of A, T, C, G. Edit distance algorithms (like the more sophisticated Needleman-Wunsch or Smith-Waterman, which are extensions of the same DP principles) are used to find the minimum number of mutations (insertions, deletions, substitutions) required to transform one sequence into another. This helps in identifying homologous genes, predicting protein structure, and understanding disease mechanisms.
3.  **Plagiarism Detection:** Software used by universities and publishers to detect plagiarism often employs string similarity metrics, including edit distance. By comparing submitted texts against a vast database of existing works, they can flag sections that are too similar, even if minor modifications (like adding or removing a few words) have been made, indicating potential copying.
4.  **Natural Language Processing (NLP) and Information Retrieval:** For tasks like fuzzy string matching in databases, deduplication of records, or improving search results, edit distance is invaluable. If a user searches for "John Smith" but a record exists for "Jon Smyth," edit distance can help link these, as the names are very similar despite minor spelling differences. This is vital in customer relationship management (CRM) systems or large data analysis platforms.
5.  **Optical Character Recognition (OCR) Error Correction:** When scanning a document, OCR software converts images of text into actual editable text. This process is prone to errors (e.g., 'O' might be recognized as '0', 'l' as '1'). Edit distance can be used to compare the OCR output against a dictionary of valid words and suggest the closest correct word, thereby improving the accuracy of digitized documents.

## 3. Prerequisites — what you must know first

Before diving deep into the Levenshtein distance, ensure you have a solid grasp of these foundational concepts:

*   **Recursion:** The concept of a function calling itself to solve smaller instances of the same problem, along with understanding base cases and the recursive step.
*   **Memoization:** An optimization technique where the results of expensive function calls are stored (cached) and returned when the same inputs occur again, avoiding redundant computations.
*   **Dynamic Programming (DP):** An algorithmic paradigm that solves complex problems by breaking them down into simpler, overlapping subproblems and storing the results of these subproblems to avoid recomputing them. It often involves building up a solution from the bottom-up using a table.
*   **Arrays/Matrices (2D Arrays):** How to declare, initialize, and access elements in one-dimensional and two-dimensional data structures, which are used to store DP table values.
*   **String Manipulation:** Basic operations on strings, such as accessing characters by index, determining string length, and understanding prefixes and suffixes.
*   **Minimum/Maximum Operations:** The ability to find the smallest or largest value among a set of options, often used in recurrence relations.

## 4. The core idea — step by step

The core idea behind calculating the Levenshtein distance using Dynamic Programming is to break down the problem of transforming one string into another into smaller, manageable subproblems. We build up a solution by considering prefixes of the strings.

### Step 1: Define the Problem and the DP Table

**Plain English:** We want to find the minimum number of operations to turn one string into another. We'll use a grid (a 2D array, or "DP table") to store the answers to smaller versions of this problem. Each cell in this grid will represent the edit distance between a prefix of the first string and a prefix of the second string.

**Concrete Example:** Let's say we want to find the edit distance between "cat" and "cut". Our DP table will be $(length("cat")+1) \times (length("cut")+1)$, which is $4 \times 4$. The extra row/column is for the empty string.

**Formal/Mathematical Version:** Let $S_1$ be the first string of length $m$ and $S_2$ be the second string of length $n$. We define a 2D array, $dp[i][j]$, which will store the Levenshtein distance between the prefix $S_1[0 \dots i-1]$ and the prefix $S_2[0 \dots j-1]$. The final answer will be in $dp[m][n]$.

**What could go wrong:** Forgetting to account for the empty string in your table dimensions. If your strings are $m$ and $n$ characters long, your DP table needs to be $(m+1) \times (n+1)$ to accommodate prefixes of length 0 up to $m$ and $n$.

### Step 2: Initialize the Base Cases

**Plain English:** What's the distance if one of the strings is empty? If you want to turn "cat" into an empty string, you have to delete all three letters. So, the distance is 3. Similarly, to turn an empty string into "cut", you have to insert all three letters, so the distance is 3. This forms the starting row and column of our DP table.

**Concrete Example:** For "cat" and "cut":
$dp[0][0]$ = 0 (empty string to empty string requires 0 operations).
$dp[i][0]$ = $i$ (to turn $S_1[0 \dots i-1]$ into an empty string, delete $i$ characters).
$dp[0][j]$ = $j$ (to turn an empty string into $S_2[0 \dots j-1]$, insert $j$ characters).

Our initialized table for "cat" (rows) and "cut" (columns) would look like this:

```
      ""  c   u   t
   ""  0   1   2   3
   c   1   .   .   .
   a   2   .   .   .
   t   3   .   .   .
```

**Formal/Mathematical Version:**
$$dp[0][0] = 0$$
For $i$ from $1$ to $m$:
$$dp[i][0] = i$$
For $j$ from $1$ to $n$:
$$dp[0][j] = j$$

**What could go wrong:** Incorrectly initializing the base cases. If $dp[i][0]$ isn't $i$, or $dp[0][j]$ isn't $j$, all subsequent calculations will be flawed. These base cases are the foundation.

### Step 3: Consider the Last Characters — The Recursive Step (Intuition)

**Plain English:** Now, for any other cell $dp[i][j]$, we're trying to find the distance between $S_1[0 \dots i-1]$ and $S_2[0 \dots j-1]$. We look at the last characters of these prefixes: $S_1[i-1]$ and $S_2[j-1]$.

*   **Case 1: The last characters match.** If $S_1[i-1]$ is the same as $S_2[j-1]$, then we don't need to do any operation on these characters. The edit distance for $S_1[0 \dots i-1]$ and $S_2[0 \dots j-1]$ is simply the edit distance of their preceding prefixes: $S_1[0 \dots i-2]$ and $S_2[0 \dots j-2]$. This value is found at $dp[i-1][j-1]$.

*   **Case 2: The last characters do not match.** If $S_1[i-1]$ is different from $S_2[j-1]$, we *must* perform an operation involving one of these characters. Which operation should we choose? The one that leads to the *minimum* total operations. We have three choices, each costing 1 operation:
    1.  **Deletion:** Delete $S_1[i-1]$. Now we need to transform $S_1[0 \dots i-2]$ into $S_2[0 \dots j-1]$. The cost is $1 + dp[i-1][j]$.
    2.  **Insertion:** Insert $S_2[j-1]$ into $S_1$. Now we need to transform $S_1[0 \dots i-1]$ into $S_2[0 \dots j-2]$. The cost is $1 + dp[i][j-1]$.
    3.  **Substitution:** Change $S_1[i-1]$ to $S_2[j-1]$. Now we need to transform $S_1[0 \dots i-2]$ into $S_2[0 \dots j-2]$. The cost is $1 + dp[i-1][j-1]$.

We take the minimum of these three options.

**Concrete Example:** Let's calculate $dp[1][1]$ for "cat" and "cut".
$S_1[0]$ is 'c', $S_2[0]$ is 'c'. They match!
So, $dp[1][1] = dp[1-1][1-1] = dp[0][0] = 0$.

Now $dp[1][2]$ for "c" and "cu".
$S_1[0]$ is 'c', $S_2[1]$ is 'u'. They don't match.
We consider:
1.  Delete 'c' from $S_1$: $1 + dp[0][2] = 1 + 2 = 3$. (Transform "" to "cu")
2.  Insert 'u' into $S_1$: $1 + dp[1][1] = 1 + 0 = 1$. (Transform "c" to "c", then insert 'u')
3.  Substitute 'c' with 'u': $1 + dp[0][1] = 1 + 1 = 2$. (Transform "" to "c", then substitute)
The minimum is 1. So $dp[1][2] = 1$.

**Formal/Mathematical Version:** For $i$ from $1$ to $m$ and $j$ from $1$ to $n$:
If $S_1[i-1] == S_2[j-1]$:
$$dp[i][j] = dp[i-1][j-1]$$
Else ($S_1[i-1] \neq S_2[j-1]$):
$$dp[i][j] = 1 + \min(dp[i-1][j], \quad // \text{Deletion from } S_1$$
$$\qquad \qquad \qquad dp[i][j-1], \quad // \text{Insertion into } S_1$$
$$\qquad \qquad \qquad dp[i-1][j-1]) \quad // \text{Substitution}$$

**What could go wrong:**
1.  Forgetting the `+1` cost when characters don't match. Each operation (insert, delete, substitute) costs 1.
2.  Confusing the indices: $dp[i-1][j]$ refers to deleting the $i$-th character of $S_1$ (leaving $S_1[0 \dots i-2]$). $dp[i][j-1]$ refers to inserting the $j$-th character of $S_2$ (leaving $S_2[0 \dots j-2]$). $dp[i-1][j-1]$ refers to either matching or substituting the characters.
3.  Not taking the minimum of the three options when characters don't match. The goal is always the *minimum* operations.

### Step 4: Building the Solution Iteratively (Bottom-Up)

**Plain English:** We fill the DP table cell by cell, starting from the top-left (after base cases) and moving right, then down. Because each cell $dp[i][j]$ only depends on cells $dp[i-1][j]$, $dp[i][j-1]$, and $dp[i-1][j-1]$ (which are above or to the left), we are guaranteed that these required values will already be computed when we need them.

**Concrete Example:** Continuing "cat" to "cut":

```
      ""  c   u   t
   ""  0   1   2   3
   c   1   0   1   2  (dp[1][1]=0 because 'c'=='c'; dp[1][2]=min(dp[0][2]+1, dp[1][1]+1, dp[0][1]+1)=min(3,1,2)=1; dp[1][3]=min(dp[0][3]+1, dp[1][2]+1, dp[0][2]+1)=min(4,2,3)=2)
   a   2   1   1   2  (dp[2][1]=min(dp[1][1]+1, dp[2][0]+1, dp[1][0]+1)=min(1,3,2)=1. 'a'!='c'...)
   t   3   2   1   0  (dp[3][3]=0 because 't'=='t')
```
(The values in the table are filled in this order: $dp[1][1]$, $dp[1][2]$, $dp[1][3]$, then $dp[2][1]$, $dp[2][2]$, $dp[2][3]$, and so on.)

**Formal/Mathematical Version:**
Iterate $i$ from $1$ to $m$:
  Iterate $j$ from $1$ to $n$:
    Apply the recurrence relation from Step 3 to calculate $dp[i][j]$.

**What could go wrong:** Incorrect loop bounds (e.g., starting from 0 instead of 1 for $i, j$ when calculating non-base cases, or ending at $m-1, n-1$). This would lead to out-of-bounds errors or missing the final cell.

### Step 5: The Final Answer

**Plain English:** Once the entire grid is filled, the value in the bottom-right corner of the table, $dp[m][n]$, is the Levenshtein distance between the full first string and the full second string.

**Concrete Example:** For "cat" to "cut", the final value in $dp[3][3]$ is 0. This is incorrect, as "cat" to "cut" should be 1 (substitute 'a' with 'u'). Let's re-evaluate the example calculation carefully.

Let's re-do the "cat" to "cut" table filling for clarity:
$S_1 = \text{"cat"}$, $S_2 = \text{"cut"}$. $m=3, n=3$.

Initialize:
```
      ""  c   u   t
   ""  0   1   2   3
   c   1   .   .   .
   a   2   .   .   .
   t   3   .   .   .
```

Fill $dp[1][1]$ (for "c" vs "c"): $S_1[0] == S_2[0]$ ('c' == 'c').
$dp[1][1] = dp[0][0] = 0$.

Fill $dp[1][2]$ (for "c" vs "cu"): $S_1[0]$ ('c') $\neq S_2[1]$ ('u').
$dp[1][2] = 1 + \min(dp[0][2], dp[1][1], dp[0][1]) = 1 + \min(2, 0, 1) = 1 + 0 = 1$.

Fill $dp[1][3]$ (for "c" vs "cut"): $S_1[0]$ ('c') $\neq S_2[2]$ ('t').
$dp[1][3] = 1 + \min(dp[0][3], dp[1][2], dp[0][2]) = 1 + \min(3, 1, 2) = 1 + 1 = 2$.

Current table:
```
      ""  c   u   t
   ""  0   1   2   3
   c   1   0   1   2
   a   2   .   .   .
   t   3   .   .   .
```

Fill $dp[2][1]$ (for "ca" vs "c"): $S_1[1]$ ('a') $\neq S_2[0]$ ('c').
$dp[2][1] = 1 + \min(dp[1][1], dp[2][0], dp[1][0]) = 1 + \min(0, 2, 1) = 1 + 0 = 1$.

Fill $dp[2][2]$ (for "ca" vs "cu"): $S_1[1]$ ('a') $\neq S_2[1]$ ('u').
$dp[2][2] = 1 + \min(dp[1][2], dp[2][1], dp[1][1]) = 1 + \min(1, 1, 0) = 1 + 0 = 1$.

Fill $dp[2][3]$ (for "ca" vs "cut"): $S_1[1]$ ('a') $\neq S_2[2]$ ('t').
$dp[2][3] = 1 + \min(dp[1][3], dp[2][2], dp[1][2]) = 1 + \min(2, 1, 1) = 1 + 1 = 2$.

Current table:
```
      ""  c   u   t
   ""  0   1   2   3
   c   1   0   1   2
   a   2   1   1   2
   t   3   .   .   .
```

Fill $dp[3][1]$ (for "cat" vs "c"): $S_1[2]$ ('t') $\neq S_2[0]$ ('c').
$dp[3][1] = 1 + \min(dp[2][1], dp[3][0], dp[2][0]) = 1 + \min(1, 3, 2) = 1 + 1 = 2$.

Fill $dp[3][2]$ (for "cat" vs "cu"): $S_1[2]$ ('t') $\neq S_2[1]$ ('u').
$dp[3][2] = 1 + \min(dp[2][2], dp[3][1], dp[2][1]) = 1 + \min(1, 2, 1) = 1 + 1 = 2$.

Fill $dp[3][3]$ (for "cat" vs "cut"): $S_1[2]$ ('t') == $S_2[2]$ ('t').
$dp[3][3] = dp[2][2] = 1$.

Final table:
```
      ""  c   u   t
   ""  0   1   2   3
   c   1   0   1   2
   a   2   1   1   2
   t   3   2   2   1
```

**Final Answer:** The value in $dp[3][3]$ is 1. This means the Levenshtein distance between "cat" and "cut" is 1 (substitute 'a' with 'u').

**What could go wrong:** Misinterpreting the final value. Always remember that $dp[m][n]$ is the distance between the *entire* string $S_1$ (length $m$) and $S_2$ (length $n$).

## 5. Worked examples — multiple, with every step shown

We will use $S_1$ for the row string and $S_2$ for the column string. $m = \text{length}(S_1)$, $n = \text{length}(S_2)$. The DP table will be $(m+1) \times (n+1)$.

### Example 1: Easy - "apple" to "apply"

**Problem:** Find the Levenshtein distance between "apple" and "apply".
**Given:** $S_1 = \text{"apple"}$, $S_2 = \text{"apply"}$.
**Want:** The minimum number of operations (insert, delete, substitute) to transform $S_1$ into $S_2$.

**Step 1: Initialize DP table**
$m=5, n=5$. Table size $(5+1) \times (5+1) = 6 \times 6$.

$$
\begin{array}{|c|c|c|c|c|c|c|}
\hline
\text{} & \text{} & \text{a} & \text{p} & \text{p} & \text{l} & \text{y} \\
\hline
\text{} & 0 & 1 & 2 & 3 & 4 & 5 \\
\hline
\text{a} & 1 & . & . & . & . & . \\
\hline
\text{p} & 2 & . & . & . & . & . \\
\hline
\text{p} & 3 & . & . & . & . & . \\
\hline
\text{l} & 4 & . & . & . & . & . \\
\hline
\text{e} & 5 & . & . & . & . & . \\
\hline
\end{array}
$$

**Step 2: Fill the table**

$i=1, j=1$: $S_1[0]=\text{'a'}$, $S_2[0]=\text{'a'}$. Match!
$$dp[1][1] = dp[0][0] = 0$$
$i=1, j=2$: $S_1[0]=\text{'a'}$, $S_2[1]=\text{'p'}$. No match.
$$dp[1][2] = 1 + \min(dp[0][2], dp[1][1], dp[0][1]) = 1 + \min(2, 0, 1) = 1 + 0 = 1$$
$i=1, j=3$: $S_1[0]=\text{'a'}$, $S_2[2]=\text{'p'}$. No match.
$$dp[1][3] = 1 + \min(dp[0][3], dp[1][2], dp[0][2]) = 1 + \min(3, 1, 2) = 1 + 1 = 2$$
$i=1, j=4$: $S_1[0]=\text{'a'}$, $S_2[3]=\text{'l'}$. No match.
$$dp[1][4] = 1 + \min(dp[0][4], dp[1][3], dp[0][3]) = 1 + \min(4, 2, 3) = 1 + 2 = 3$$
$i=1, j=5$: $S_1[0]=\text{'a'}$, $S_2[4]=\text{'y'}$. No match.
$$dp[1][5] = 1 + \min(dp[0][5], dp[1][4], dp[0][4]) = 1 + \min(5, 3, 4) = 1 + 3 = 4$$

Table after $i=1$:
$$
\begin{array}{|c|c|c|c|c|c|c|}
\hline
\text{} & \text{} & \text{a} & \text{p} & \text{p} & \text{l} & \text{y} \\
\hline
\text{} & 0 & 1 & 2 & 3 & 4 & 5 \\
\hline
\text{a} & 1 & 0 & 1 & 2 & 3 & 4 \\
\hline
\text{p} & 2 & . & . & . & . & . \\
\hline
\text{p} & 3 & . & . & . & . & . \\
\hline
\text{l} & 4 & . & . & . & . & . \\
\hline
\text{e} & 5 & . & . & . & . & . \\
\hline
\end{array}
$$

$i=2, j=1$: $S_1[1]=\text{'p'}$, $S_2[0]=\text{'a'}$. No match.
$$dp[2][1] = 1 + \min(dp[1][1], dp[2][0], dp[1][0]) = 1 + \min(0, 2, 1) = 1 + 0 = 1$$
$i=2, j=2$: $S_1[1]=\text{'p'}$, $S_2[1]=\text{'p'}$. Match!
$$dp[2][2] = dp[1][1] = 0$$
$i=2, j=3$: $S_1[1]=\text{'p'}$, $S_2[2]=\text{'p'}$. Match!
$$dp[2][3] = dp[1][2] = 1$$
$i=2, j=4$: $S_1[1]=\text{'p'}$, $S_2[3]=\text{'l'}$. No match.
$$dp[2][4] = 1 + \min(dp[1][4], dp[2][3], dp[1][3]) = 1 + \min(3, 1, 2) = 1 + 1 = 2$$
$i=2, j=5$: $S_1[1]=\text{'p'}$, $S_2[4]=\text{'y'}$. No match.
$$dp[2][5] = 1 + \min(dp[1][5], dp[2][4], dp[1][4]) = 1 + \min(4, 2, 3) = 1 + 2 = 3$$

Table after $i=2$:
$$
\begin{array}{|c|c|c|c|c|c|c|}
\hline
\text{} & \text{} & \text{a} & \text{p} & \text{p} & \text{l} & \text{y} \\
\hline
\text{} & 0 & 1 & 2 & 3 & 4 & 5 \\
\hline
\text{a} & 1 & 0 & 1 & 2 & 3 & 4 \\
\hline
\text{p} & 2 & 1 & 0 & 1 & 2 & 3 \\
\hline
\text{p} & 3 & . & . & . & . & . \\
\hline
\text{l} & 4 & . & . & . & . & . \\
\hline
\text{e} & 5 & . & . & . & . & . \\
\hline
\end{array}
$$

$i=3, j=1$: $S_1[2]=\text{'p'}$, $S_2[0]=\text{'a'}$. No match.
$$dp[3][1] = 1 + \min(dp[2][1], dp[3][0], dp[2][0]) = 1 + \min(1, 3, 2) = 1 + 1 = 2$$
$i=3, j=2$: $S_1[2]=\text{'p'}$, $S_2[1]=\text{'p'}$. Match!
$$dp[3][2] = dp[2][1] = 1$$
$i=3, j=3$: $S_1[2]=\text{'p'}$, $S_2[2]=\text{'p'}$. Match!
$$dp[3][3] = dp[2][2] = 0$$
$i=3, j=4$: $S_1[2]=\text{'p'}$, $S_2[3]=\text{'l'}$. No match.
$$dp[3][4] = 1 + \min(dp[2][4], dp[3][3], dp[2][3]) = 1 + \min(2, 0, 1) = 1 + 0 = 1$$
$i=3, j=5$: $S_1[2]=\text{'p'}$, $S_2[4]=\text{'y'}$. No match.
$$dp[3][5] = 1 + \min(dp[2][5], dp[3][4], dp[2][4]) = 1 + \min(3, 1, 2) = 1 + 1 = 2$$

Table after $i=3$:
$$
\begin{array}{|c|c|c|c|c|c|c|}
\hline
\text{} & \text{} & \text{a} & \text{p} & \text{p} & \text{l} & \text{y} \\
\hline
\text{} & 0 & 1 & 2 & 3 & 4 & 5 \\
\hline
\text{a} & 1 & 0 & 1 & 2 & 3 & 4 \\
\hline
\text{p} & 2 & 1 & 0 & 1 & 2 & 3 \\
\hline
\text{p} & 3 & 2 & 1 & 0 & 1 & 2 \\
\hline
\text{l} & 4 & . & . & . & . & . \\
\hline
\text{e} & 5 & . & . & . & . & . \\
\hline
\end{array}
$$

$i=4, j=1$: $S_1[3]=\text{'l'}$, $S_2[0]=\text{'a'}$. No match.
$$dp[4][1] = 1 + \min(dp[3][1], dp[4][0], dp[3][0]) = 1 + \min(2, 4, 3) = 1 + 2 = 3$$
$i=4, j=2$: $S_1[3]=\text{'l'}$, $S_2[1]=\text{'p'}$. No match.
$$dp[4][2] = 1 + \min(dp[3][2], dp[4][1], dp[3][1]) = 1 + \min(1, 3, 2) = 1 + 1 = 2$$
$i=4, j=3$: $S_1[3]=\text{'l'}$, $S_2[2]=\text{'p'}$. No match.
$$dp[4][3] = 1 + \min(dp[3][3], dp[4][2], dp[3][2]) = 1 + \min(0, 2, 1) = 1 + 0 = 1$$
$i=4, j=4$: $S_1[3]=\text{'l'}$, $S_2[3]=\text{'l'}$. Match!
$$dp[4][4] = dp[3][3] = 0$$
$i=4, j=5$: $S_1[3]=\text{'l'}$, $S_2[4]=\text{'y'}$. No match.
$$dp[4][5] = 1 + \min(dp[3][5], dp[4][4], dp[3][4]) = 1 + \min(2, 0, 1) = 1 + 0 = 1$$

Table after $i=4$:
$$
\begin{array}{|c|c|c|c|c|c|c|}
\hline
\text{} & \text{} & \text{a} & \text{p} & \text{p} & \text{l} & \text{y} \\
\hline
\text{} & 0 & 1 & 2 & 3 & 4 & 5 \\
\hline
\text{a} & 1 & 0 & 1 & 2 & 3 & 4 \\
\hline
\text{p} & 2 & 1 & 0 & 1 & 2 & 3 \\
\hline
\text{p} & 3 & 2 & 1 & 0 & 1 & 2 \\
\hline
\text{l} & 4 & 3 & 2 & 1 & 0 & 1 \\
\hline
\text{e} & 5 & . & . & . & . & . \\
\hline
\end{array}
$$

$i=5, j=1$: $S_1[4]=\text{'e'}$, $S_2[0]=\text{'a'}$. No match.
$$dp[5][1] = 1 + \min(dp[4][1], dp[5][0], dp[4][0]) = 1 + \min(3, 5, 4) = 1 + 3 = 4$$
$i=5, j=2$: $S_1[4]=\text{'e'}$, $S_2[1]=\text{'p'}$. No match.
$$dp[5][2] = 1 + \min(dp[4][2], dp[5][1], dp[4][1]) = 1 + \min(2, 4, 3) = 1 + 2 = 3$$
$i=5, j=3$: $S_1[4]=\text{'e'}$, $S_2[2]=\text{'p'}$. No match.
$$dp[5][3] = 1 + \min(dp[4][3], dp[5][2], dp[4][2]) = 1 + \min(1, 3, 2) = 1 + 1 = 2$$
$i=5, j=4$: $S_1[4]=\text{'e'}$, $S_2[3]=\text{'l'}$. No match.
$$dp[5][4] = 1 + \min(dp[4][4], dp[5][3], dp[4][3]) = 1 + \min(0, 2, 1) = 1 + 0 = 1$$
$i=5, j=5$: $S_1[4]=\text{'e'}$, $S_2[4]=\text{'y'}$. No match.
$$dp[5][5] = 1 + \min(dp[4][5], dp[5][4], dp[4][4]) = 1 + \min(1, 1, 0) = 1 + 0 = 1$$

Final table:
$$
\begin{array}{|c|c|c|c|c|c|c|}
\hline
\text{} & \text{} & \text{a} & \text{p} & \text{p} & \text{l} & \text{y} \\
\hline
\text{} & 0 & 1 & 2 & 3 & 4 & 5 \\
\hline
\text{a} & 1 & 0 & 1 & 2 & 3 & 4 \\
\hline
\text{p} & 2 & 1 & 0 & 1 & 2 & 3 \\
\hline
\text{p} & 3 & 2 & 1 & 0 & 1 & 2 \\
\hline
\text{l} & 4 & 3 & 2 & 1 & 0 & 1 \\
\hline
\text{e} & 5 & 4 & 3 & 2 & 1 & 1 \\
\hline
\end{array}
$$

**Final Answer:** The value in $dp[5][5]$ is $\mathbf{1}$.
**Reflection:** This was straightforward because only the last character needed to be changed ('e' to 'y'). The path of minimum cost mostly followed the diagonal, indicating common prefixes.

---

### Example 2: Medium - "kitten" to "sitting"

**Problem:** Find the Levenshtein distance between "kitten" and "sitting".
**Given:** $S_1 = \text{"kitten"}$, $S_2 = \text{"sitting"}$.
**Want:** The minimum number of operations.

**Step 1: Initialize DP table**
$m=6, n=7$. Table size $(6+1) \times (7+1) = 7 \times 8$.

$$
\begin{array}{|c|c|c|c|c|c|c|c|c|}
\hline
\text{} & \text{} & \text{s} & \text{i} & \text{t} & \text{t} & \text{i} & \text{n} & \text{g} \\
\hline
\text{} & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 \\
\hline
\text{k} & 1 & . & . & . & . & . & . & . \\
\hline
\text{i} & 2 & . & . & . & . & . & . & . \\
\hline
\text{t} & 3 & . & . & . & . & . & . & . \\
\hline
\text{t} & 4 & . & . & . & . & . & . & . \\
\hline
\text{e} & 5 & . & . & . & . & . & . & . \\
\hline
\text{n} & 6 & . & . & . & . & . & . & . \\
\hline
\end{array}
$$

**Step 2: Fill the table (partial for brevity, showing key cells)**

Let's compute the first few cells:
$dp[1][1]$ (k vs s): $1 + \min(dp[0][1], dp[1][0], dp[0][0]) = 1 + \min(1, 1, 0) = 1$.
$dp[1][2]$ (k vs si): $1 + \min(dp[0][2], dp[1][1], dp[0][1]) = 1 + \min(2, 1, 1) = 2$.
...
$dp[2][1]$ (ki vs s): $1 + \min(dp[1][1], dp[2][0], dp[1][0]) = 1 + \min(1, 2, 1) = 2$.
$dp[2][2]$ (ki vs si): $S_1[1]=\text{'i'}$, $S_2[1]=\text{'i'}$. Match! $dp[2][2] = dp[1][1] = 1$.

The full table will be:
$$
\begin{array}{|c|c|c|c|c|c|c|c|c|}
\hline
\text{} & \text{} & \text{s} & \text{i} & \text{t} & \text{t} & \text{i} & \text{n} & \text{g} \\
\hline
\text{} & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 \\
\hline
\text{k} & 1 & 1 & 2 & 3 & 4 & 5 & 6 & 7 \\
\hline
\text{i} & 2 & 2 & 1 & 2 & 3 & 4 & 5 & 6 \\
\hline
\text{t} & 3 & 3 & 2 & 1 & 2 & 3 & 4 & 5 \\
\hline
\text{t} & 4 & 4 & 3 & 2 & 1 & 2 & 3 & 4 \\
\hline
\text{e} & 5 & 5 & 4 & 3 & 2 & 2 & 3 & 4 \\
\hline
\text{n} & 6 & 6 & 5 & 4 & 3 & 3 & 2 & 3 \\
\hline
\end{array}
$$

Let's trace a few crucial cells:
-   $dp[1][1]$ (k vs s): No match. $1 + \min(dp[0][1], dp[1][0], dp[0][0]) = 1 + \min(1, 1, 0) = 1$. (Substitute 'k' with 's')
-   $dp[2][2]$ (ki vs si): Match ('i' == 'i'). $dp[1][1] = 1$.
-   $dp[3][3]$ (kit vs sit): Match ('t' == 't'). $dp[2][2] = 1$.
-   $dp[4][4]$ (kitt vs sitt): Match ('t' == 't'). $dp[3][3] = 1$.
-   $dp[5][5]$ (kitte vs sitti): No match ('e' != 'i').
    $1 + \min(dp[4][5], dp[5][4], dp[4][4]) = 1 + \min(2, 2, 1) = 1 + 1 = 2$. (Substitute 'e' with 'i')
-   $dp[6][6]$ (kitten vs sittin): Match ('n' == 'n'). $dp[5][5] = 2$.
-   $dp[6][7]$ (kitten vs sitting): No match ('n' != 'g').
    $1 + \min(dp[5][7], dp[6][6], dp[5][6]) = 1 + \min(4, 2, 3) = 1 + 2 = 3$. (Insert 'g' into "kitten" to get "sitting")

**Final Answer:** The value in $dp[6][7]$ is $\mathbf{3}$.
**Reflection:** This is a classic example. The operations are:
1.  Substitute 'k' with 's' (kitten -> sitten)
2.  Substitute 'e' with 'i' (sitten -> sittin)
3.  Insert 'g' (sittin -> sitting)
Total 3 operations. This shows how the DP approach correctly finds the minimum path even when multiple changes are required.

---

### Example 3: Harder - "algorithm" to "altruistic"

**Problem:** Find the Levenshtein distance between "algorithm" and "altruistic".
**Given:** $S_1 = \text{"algorithm"}$, $S_2 = \text{"altruistic"}$.
**Want:** The minimum number of operations.

**Step 1: Initialize DP table**
$m=9, n=10$. Table size $(9+1) \times (10+1) = 10 \times 11$.

$$
\begin{array}{|c|c|c|c|c|c|c|c|c|c|c|c|}
\hline
\text{} & \text{} & \text{a} & \text{l} & \text{t} & \text{r} & \text{u} & \text{i} & \text{s} & \text{t} & \text{i} & \text{c} \\
\hline
\text{} & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
\hline
\text{a} & 1 & . & . & . & . & . & . & . & . & . & . \\
\hline
\text{l} & 2 & . & . & . & . & . & . & . & . & . & . \\
\hline
\text{g} & 3 & . & . & . & . & . & . & . & . & . & . \\
\hline
\text{o} & 4 & . & . & . & . & . & . & . & . & . & . \\
\hline
\text{r} & 5 & . & . & . & . & . & . & . & . & . & . \\
\hline
\text{i} & 6 & . & . & . & . & . & . & . & . & . & . \\
\hline
\text{t} & 7 & . & . & . & . & . & . & . & . & . & . \\
\hline
\text{h} & 8 & . & . & . & . & . & . & . & . & . & . \\
\hline
\text{m} & 9 & . & . & . & . & . & . & . & . & . & . \\
\hline
\end{array}
$$

**Step 2: Fill the table (full table, calculated in typical row-major order)**

$$
\begin{array}{|c|c|c|c|c|c|c|c|c|c|c|c|}
\hline
\text{} & \text{} & \text{a} & \text{l} & \text{t} & \text{r} & \text{u} & \text{i} & \text{s} & \text{t} & \text{i} & \text{c} \\
\hline
\text{} & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
\hline
\text{a} & 1 & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 \\
\hline
\text{l} & 2 & 1 & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 \\
\hline
\text{g} & 3 & 2 & 1 & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 \\
\hline
\text{o} & 4 & 3 & 2 & 2 & 2 & 3 & 4 & 5 & 6 & 7 & 8 \\
\hline
\text{r} & 5 & 4 & 3 & 3 & 2 & 3 & 4 & 5 & 6 & 7 & 8 \\
\hline
\text{i} & 6 & 5 & 4 & 4 & 3 & 3 & 2 & 3 & 4 & 5 & 6 \\
\hline
\text{t} & 7 & 6 & 5 & 4 & 4 & 3 & 3 & 3 & 2 & 3 & 4 \\
\hline
\text{h} & 8 & 7 & 6 & 5 & 5 & 4 & 4 & 4 & 3 & 3 & 4 \\
\hline
\text{m} & 9 & 8 & 7 & 6 & 6 & 5 & 5 & 5 & 4 & 4 & 4 \\
\hline
\end{array}
$$

**Final Answer:** The value in $dp[9][10]$ is $\mathbf{4}$.
**Reflection:** This example highlights how the algorithm handles longer strings with multiple differences. The common prefix "al" reduces initial costs. The differences "go" vs "tr", "rith" vs "uis", and "m" vs "tic" are resolved optimally. One possible sequence of 4 operations:
1.  Substitute 'g' for 't' (alg... -> alt...)
2.  Delete 'o' (altg... -> alt...)
3.  Substitute 'h' for 's' (algoritm -> altruism)
4.  Insert 'c' (altruism -> altruistic)
This is just one path; the DP guarantees it's the minimum.

---

### Example 4: Edge Case - Empty String

**Problem:** Find the Levenshtein distance between "hello" and "".
**Given:** $S_1 = \text{"hello"}$, $S_2 = \text{""}$.
**Want:** The minimum number of operations.

**Step 1: Initialize DP table**
$m=5, n=0$. Table size $(5+1) \times (0+1) = 6 \times 1$.

$$
\begin{array}{|c|c|}
\hline
\text{} & \text{} \\
\hline
\text{} & 0 \\
\hline
\text{h} & 1 \\
\hline
\text{e} & 2 \\
\hline
\text{l} & 3 \\
\hline
\text{l} & 4 \\
\hline
\text{o} & 5 \\
\hline
\end{array}
$$

**Step 2: Fill the table**
Since $S_2$ is empty ($n=0$), the DP table only has one column (index 0). By definition of base cases, $dp[i][0] = i$.

$$
\begin{array}{|c|c|}
\hline
\text{} & \text{} \\
\hline
\text{} & 0 \\
\hline
\text{h} & 1 \\
\hline
\text{e} & 2 \\
\hline
\text{l} & 3 \\
\hline
\text{l} & 4 \\
\hline
\text{o} & 5 \\
\hline
\end{array}
$$

**Final Answer:** The value in $dp[5][0]$ is $\mathbf{5}$.
**Reflection:** This confirms the base case logic: to transform "hello" into an empty string, you must delete all 5 characters. The algorithm correctly handles empty strings as one of its dimensions.

## 6. Common mistakes and traps

1.  **Off-by-one errors in string indexing:** The DP table usually uses 1-based indexing for string lengths (e.g., $dp[i][j]$ for prefix of length $i$ and $j$), while programming languages often use 0-based indexing for characters. This means $S_1[i-1]$ corresponds to the $i$-th character of $S_1$ when referring to $dp[i][j]$. Forgetting this can lead to incorrect character comparisons.
2.  **Incorrect base case initialization:** Not setting $dp[i][0] = i$ and $dp[0][j] = j$ correctly. These values are crucial because they define the cost of transforming a string into an empty string (all deletions) or an empty string into a non-empty string (all insertions).
3.  **Forgetting the `+1` cost:** When characters $S_1[i-1]$ and $S_2[j-1]$ do not match, any operation (insert, delete, substitute) incurs a cost of 1. A common mistake is to forget to add this `1` to the minimum of the three options.
4.  **Swapping `i` and `j` in recurrence:** Confusing $dp[i-1][j]$ (deletion from $S_1$) with $dp[i][j-1]$ (insertion into $S_1$). While the overall minimum might still be found, understanding which operation corresponds to which diagonal/adjacent cell is vital for correctness and tracing.
5.  **Not understanding the meaning of $dp[i][j]$:** If a student thinks $dp[i][j]$ means the distance between $S_1[i]$ and $S_2[j]$, rather than between prefixes $S_1[0 \dots i-1]$ and $S_2[0 \dots j-1]$, their logic for character comparison and base cases will be flawed.
6.  **Incorrect loop bounds:** Iterating $i$ and $j$ from 0 instead of 1 when filling the main part of the DP table, or stopping too early/late, leading to incomplete or incorrect table calculation.

## 7. Textbook-precise explanation

The Levenshtein distance, also known as edit distance, between two sequences (strings) $a$ and $b$ is the minimum number of single-character edits (insertions, deletions, or substitutions) required to change $a$ into $b$. Each operation is typically assigned a cost of 1.

Let $a$ be a string of length $m$, and $b$ be a string of length $n$. We denote $a[i]$ as the $i$-th character of string $a$ (using 0-based indexing), and $a[1 \dots i]$ as the prefix of $a$ of length $i$.

We define a function $lev(a, b)$ to be the Levenshtein distance between $a$ and $b$. This can be computed using dynamic programming by constructing an $(m+1) \times (n+1)$ matrix, $dp$, where $dp[i][j]$ stores the Levenshtein distance between $a[1 \dots i]$ and $b[1 \dots j]$.

The recurrence relation for $dp[i][j]$ is as follows:

**Base Cases:**
If $i = 0$ and $j = 0$:
$$dp[0][0] = 0$$
If $i > 0$ and $j = 0$: (Transforming $a[1 \dots i]$ into an empty string requires $i$ deletions)
$$dp[i][0] = i$$
If $i = 0$ and $j > 0$: (Transforming an empty string into $b[1 \dots j]$ requires $j$ insertions)
$$dp[0][j] = j$$

**Recursive Step (for $i > 0$ and $j > 0$):**
Let $cost_{sub}$ be $0$ if $a[i-1] = b[j-1]$ (characters match), and $1$ if $a[i-1] \neq b[j-1]$ (characters differ, requiring a substitution).

$$dp[i][j] = \min \begin{cases}
dp[i-1][j] + 1 & \quad \text{(Deletion from } a \text{)} \\
dp[i][j-1] + 1 & \quad \text{(Insertion into } a \text{)} \\
dp[i-1][j-1] + cost_{sub} & \quad \text{(Match or Substitution)}
\end{cases}$$

The final Levenshtein distance between $a$ and $b$ is $dp[m][n]$.

This formulation is standard in algorithms textbooks. For example, a detailed discussion can be found in *Introduction to Algorithms* by Cormen, Leiserson, Rivest, and Stein (CLRS), often in chapters related to dynamic programming or string matching, though Levenshtein specifically might be presented as an exercise or in a section on sequence alignment (e.g., Chapter 15 or 17 in earlier editions).

## 8. ASCII diagrams

Here's an ASCII diagram illustrating the DP table for calculating the Levenshtein distance between "GUM" and "GAME".
$S_1 = \text{"GUM"}$ (rows, length $m=3$)
$S_2 = \text{"GAME"}$ (columns, length $n=4$)
The table size is $(m+1) \times (n+1) = 4 \times 5$.

The cell $dp[i][j]$ represents the edit distance between $S_1[0 \dots i-1]$ and $S_2[0 \dots j-1]$.
The values are filled starting from the top-left, moving right then down.

```text
       ""  G   A   M   E
    +---------------------
""  |  0   1   2   3   4   <-- Base cases: Cost to turn empty string into S2 prefix (insertions)
    |
G   |  1   0   1   2   3   <-- dp[1][1]=0 because 'G'=='G'. dp[1][2]=1+min(dp[0][2],dp[1][1],dp[0][1]) = 1+min(2,0,1)=1.
    |                        (G vs GA: insert 'A')
A   |  2   1   1   1   2   <-- dp[2][2]=1 (GA vs GA: 'A'=='A', dp[1][1]=0, but prev was 'G' vs 'G', so 1)
    |                        (G vs G is 0. GA vs GA is 0. But G vs GA is 1. GA vs G is 1. So 1)
M   |  3   2   2   1   2   <-- dp[3][3]=1 because 'M'=='M'. dp[2][2]=1.
    +---------------------

Final Answer: dp[3][4] = 2
```

Let's trace $dp[2][2]$: $S_1[1]=\text{'U'}$, $S_2[1]=\text{'A'}$. No match.
$dp[2][2] = 1 + \min(dp[1][2], dp[2][1], dp[1][1]) = 1 + \min(1, 1, 0) = 1$.
This means it costs 1 to turn "GU" into "GA". (Substitute 'U' with 'A').

Let's trace $dp[3][4]$: $S_1[2]=\text{'M'}$, $S_2[3]=\text{'E'}$. No match.
$dp[3][4] = 1 + \min(dp[2][4], dp[3][3], dp[2][3]) = 1 + \min(2, 1, 2) = 1 + 1 = 2$.
This means it costs 2 to turn "GUM" into "GAME".
(Paths to 2:
1.  From $dp[3][3]$ (cost 1, for "GUM" vs "GAM"): $1 + dp[3][3] = 1+1=2$. (Insert 'E' into "GUM" after transforming "GUM" to "GAM")
2.  From $dp[2][4]$ (cost 2, for "GU" vs "GAME"): $1 + dp[2][4] = 1+2=3$. (Delete 'M' from "GUM" after transforming "GU" to "GAME")
3.  From $dp[2][3]$ (cost 2, for "GU" vs "GAM"): $1 + dp[2][3] = 1+2=3$. (Substitute 'M' with 'E' after transforming "GU" to "GAM")
Minimum is 2.
)

The operations for "GUM" to "GAME" (distance 2):
1.  Substitute 'U' with 'A' (GUM -> GAM)
2.  Insert 'E' (GAM -> GAME)

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Imagine a **"Distance Grid"** or a **"Typo Correction Board."** You're trying to navigate from the top-left corner (empty strings) to the bottom-right (full strings). Each step you take (right, down, or diagonal) represents an operation.
    *   Moving **right** (from $dp[i][j-1]$ to $dp[i][j]$) is an **Insertion** (adding a character to $S_1$ to match $S_2$).
    *   Moving **down** (from $dp[i-1][j]$ to $dp[i][j]$) is a **Deletion** (removing a character from $S_1$).
    *   Moving **diagonally** (from $dp[i-1][j-1]$ to $dp[i][j]$) is either a **Match** (cost 0 if characters are same) or a **Substitution** (cost 1 if characters are different).
    You always choose the path (right, down,