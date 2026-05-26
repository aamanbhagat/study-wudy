## 1. The one-sentence answer
**String indexing and slicing let you reach any character or substring inside a Python string by using its position numbers, including negative positions counted from the end and ranges with optional steps.**

A string in Python is simply an ordered sequence of characters stored at consecutive positions that always begin at zero. When you write `s[0]` you are asking for the character that sits at the first slot; `s[-1]` reaches the last character without needing to know the string length in advance. Slicing extends the same idea by letting you request a continuous range such as `s[2:5]` or every other character with `s[::2]`.

The underlying mechanism is the same for both indexing and slicing: Python calculates the desired positions once, then returns either a single character or a new string that contains exactly those characters. This operation never changes the original string because strings are immutable.

> [!NOTE]
> The single most important “aha” is that positions are always counted from zero on the left and from minus one on the right; once you internalise these two anchors, every indexing and slicing expression becomes a simple arithmetic lookup rather than a guessing game.

## 2. Why this matters — concrete and current
In bioinformatics pipelines at Illumina, DNA reads are stored as strings and sliced with expressions such as `read[10:30]` to extract primer regions before alignment.  
Google’s search indexing stack uses character-level slicing on URL and title strings to build n-gram features that feed into ranking models.  
SpaceX telemetry software parses fixed-width log lines from rocket sensors by slicing each line at known column offsets (`line[0:8]`, `line[9:17]`) to extract timestamps and sensor values without regular expressions.  
Natural-language-processing libraries such as Hugging Face Tokenizers rely on byte-pair slicing (`text[::2]`) during pre-tokenisation to reduce sequence length before feeding data into transformer models.  
Semiconductor EDA tools written in Python slice netlist strings to isolate gate names and port lists when converting designs between Verilog and VHDL formats.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Zero-based counting      | Python positions start at 0, not 1                        |
| Sequence type            | Strings behave like any other ordered sequence            |
| Immutability             | Slicing always produces a new string; original never changes |
| Negative indexing        | Allows access from the end without calling `len()`        |

If any of these rows are unfamiliar, pause and review the corresponding earlier lesson before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Strings as ordered sequences
A string is an ordered collection of characters where each character occupies a unique integer position.  
Example: the string `"python"` has six characters stored at positions 0 through 5.  
Formally, a string \( s \) of length \( n \) satisfies \( s = s_0 s_1 \dots s_{n-1} \).  
> [!WARNING]  
> Treating the first character as position 1 will produce an off-by-one error in every subsequent slice.

### Step 2 — Positive indexing
You retrieve a single character by writing the string name followed by square brackets containing a non-negative integer.  
Example: `"python"[0]` yields `'p'`.  
Formally, \( s[i] = s_i \) where \( 0 \leq i < n \).  
> [!WARNING]  
> Using an index equal to or larger than the length raises an `IndexError`.

### Step 3 — Negative indexing
Negative indices count backwards from the end; `-1` refers to the last character.  
Example: `"python"[-1]` yields `'n'`.  
Formally, \( s[-k] = s_{n-k} \) for \( 1 \leq k \leq n \).  
> [!WARNING]  
> The value `-0` is identical to `0`, so negative indexing never reaches the first character with index 0.

### Step 4 — Basic slicing syntax
A slice `s[start:stop]` returns characters from index `start` inclusive up to index `stop` exclusive.  
Example: `"python"[2:5]` yields `'tho'`.  
Formally, the result is the string \( s_i s_{i+1} \dots s_{j-1} \) where \( i = start \), \( j = stop \).  
> [!WARNING]  
> The stop index is exclusive; forgetting this produces one extra or one fewer character than intended.

### Step 5 — Default values in slices
Omitting `start` defaults to 0; omitting `stop` defaults to the string length.  
Example: `"python"[:3]` yields `'pyt'`.  
Formally, `s[:stop]` expands to `s[0:stop]` and `s[start:]` expands to `s[start:n]`.  
> [!WARNING]  
> Writing `s[:]` creates a shallow copy; mutating the copy later will not affect the original, but the copy operation itself costs linear time.

### Step 6 — Step parameter
A third colon-separated value supplies the stride.  
Example: `"python"[::2]` yields `'pto'`.  
Formally, the result contains characters at positions \( i, i+d, i+2d, \dots \) where \( d \) is the step.  
> [!WARNING]  
> A step of 0 raises a `ValueError`; negative steps reverse direction but still require correct start/stop ordering.

### Step 7 — Textbook-grade statement
For any string \( s \) of length \( n \), the expression \( s[i:j:k] \) evaluates to the string formed by characters \( s_m \) where \( m \) runs over the arithmetic progression starting at \( i \), ending before \( j \), with common difference \( k \), all indices interpreted under Python’s negative-index and default rules.

## 5. Worked examples — har step show karo

**Example 1 — Single positive index**  
*Given:* `s = "abcde"`  
*Find:* `s[2]`  
`s[2]` looks up the character whose position equals 2.  
Position 0 holds `'a'`, position 1 holds `'b'`, position 2 holds `'c'`.  
**'c'**  
*Reflection:* The example is simple yet establishes that counting truly begins at zero.

**Example 2 — Negative index from the end**  
*Given:* `s = "abcdef"`  
*Find:* `s[-2]`  
Length is 6, therefore `-2` maps to position \( 6-2 = 4 \).  
Position 4 holds `'e'`.  
**'e'**  
*Reflection:* Negative indices remove the need to compute `len(s)-1` manually.

**Example 3 — Exclusive slice**  
*Given:* `s = "python"`  
*Find:* `s[2:5]`  
Start at 2 (`'t'`), stop before 5; positions 2, 3, 4 give `'t','h','o'`.  
**'tho'**  
*Reflection:* The exclusive stop prevents the common off-by-one mistake of including the end index.

**Example 4 — Stride slice with negative step**  
*Given:* `s = "abcdef"`  
*Find:* `s[5:1:-2]`  
Start at 5 (`'f'`), move left by 2 each time, stop before 1: positions 5, 3 give `'f','d'`.  
**'fd'**  
*Reflection:* Direction reversal requires the start index to be larger than the stop index when the step is negative.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using 1-based thinking      | Habit from mathematics or other languages   | Always write the first character as index 0  |
| Forgetting slice is exclusive | Intuition says “up to and including”        | Mentally read `s[a:b]` as “from a up to but not b” |
| Index equal to length       | Confusing length with last valid index      | Remember valid indices run 0 … n-1           |
| Negative index magnitude too large | Assuming any negative number is safe      | Check that `abs(k) <= n` before use          |
| Step = 0                    | Copy-paste error or misunderstanding        | Never write a literal 0 in the step position |
| Modifying slice result      | Expecting strings to behave like lists      | Remember every slice returns a new immutable string |
| Reversed slice with positive step | Writing `s[5:1]` when step is positive   | Swap start and stop or use negative step     |

## 7. The textbook-precise statement
Let \( s \) be an object of type `str` with length \( n = \operatorname{len}(s) \). For any integers \( i, j, k \) the expression \( s[i:j:k] \) produces a new string whose characters are taken from the arithmetic sequence of indices generated by the Python slice object `slice(i, j, k)`. When \( k > 0 \), indices run from the normalised start (default 0) up to but not including the normalised stop (default \( n \)); when \( k < 0 \), indices run downwards. All indices are interpreted under the standard negative-index rule: any index \( m \) satisfying \( -n \leq m < 0 \) is replaced by \( m + n \). The operation is defined in “The Python Language Reference”, version 3.12, §3.2 “String literals and sequences”.

## 8. Visual — diagram or schematic
```
 indices:   0   1   2   3   4   5
           +---+---+---+---+---+---+
 string s: | p | y | t | h | o | n |
           +---+---+---+---+---+---+
 negative: -6  -5  -4  -3  -2  -1
```
Labelled positions show both positive and negative indices for the same characters. The slice `s[2:5]` covers positions 2, 3, 4; `s[-1]` points to the final `'n'`.

## 9. The memory technique
1. **The hook** — Picture the string as a railway train; each carriage carries one letter. The engine is carriage 0; the guard van at the rear is carriage -1.  
2. **What to overlearn** — Zero-based start, exclusive stop, and the three-part slice syntax `start:stop:step`.  
3. **Spaced-repetition schedule** — Review the train image after 1 day, 3 days, 7 days, 16 days, and 35 days.  
4. **First-principles fallback** — If the syntax slips, redraw the index diagram above, mark the desired positions, then write the slice that selects exactly those positions.

## 10. What this unlocks
Mastery of string indexing and slicing directly enables list and tuple operations, regular-expression result handling, and efficient text parsing used in later modules.  
- Next topic: list methods and list comprehensions  
- Later topic: regular expressions and `re` module  
- Applied topic: building simple tokenisers for language models  

## 11. Self-check — five questions, no answers
1. For `s = "abcdef"`, evaluate `s[1:-1:2]` and state its length.  
2. Why does `s[3:3]` always produce an empty string regardless of `s`?  
3. Write an expression that extracts every third character of `s` starting from the second character.  
4. A student writes `s[-0]` expecting the last character; explain the actual result.  
5. Given `s = "123456789"`, construct a single slice that reverses the string without using the built-in `reversed` function.