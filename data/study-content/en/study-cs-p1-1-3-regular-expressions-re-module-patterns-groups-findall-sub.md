## 1. The one-sentence answer

**Regular expressions are a compact, declarative language for matching, extracting, and transforming textual patterns, implemented in Python through the re module via compiled pattern objects, capturing groups, findall, and sub.**

A regular expression describes a set of strings that obey a precise syntactic rule. In Python the re module turns that description into an executable matcher. The matcher walks the input character by character, records positions where the rule succeeds, and can either return those positions, the matched substrings, or produce a new string by substitution.

The core operations are therefore three: test whether a pattern occurs, harvest every occurrence (findall), and rewrite every occurrence (sub). Groups add the ability to label and retrieve sub-parts of each match without writing extra string arithmetic.

> [!NOTE]
> The decisive insight is that a regular expression is not a search command; it is a finite-state recognizer written in a terse syntax, so every quantifier, alternation, and group directly corresponds to a transition or memory cell inside that automaton.

## 2. Why this matters — concrete and current

NASA’s telemetry logs from the Perseverance rover contain timestamped sensor lines whose format changes across firmware revisions; a single compiled regex with named groups extracts temperature, voltage, and error codes in under a millisecond per line, feeding the downstream anomaly-detection pipeline.

In semiconductor manufacturing, ASML’s EUV lithography tools emit gigabytes of daily trace files. Process engineers use re.sub with back-references to normalize wafer IDs and step numbers before feeding the cleaned data into machine-learning yield models.

Genomics pipelines at the Broad Institute rely on regex patterns that locate restriction sites and primer sequences inside FASTQ reads; findall with overlapping groups identifies all candidate cut positions in a single linear pass, enabling rapid variant calling.

Modern web browsers and CDNs (Cloudflare, Fastly) apply regex-based rewrite rules at the edge to redirect traffic, strip tracking parameters, and enforce security headers; each rule is compiled once and executed on every request header.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Python str and bytes     | All patterns operate on text or binary sequences          |
| Zero-based indexing      | Match objects report start and end positions              |
| Function objects         | re.compile returns a reusable pattern object              |
| Escape sequences         | Backslashes must be understood before writing patterns    |

## 4. Building the idea — from intuition to formalism

### Step 1 — A pattern is a predicate on strings
A pattern succeeds or fails on any given string.  
Example: the literal "cat" succeeds on "concatenate" and fails on "dog".  
Formally, a pattern \(P\) denotes a language \(L(P) \subseteq \Sigma^*\) where \(\Sigma\) is the alphabet.  
> [!WARNING] Treating the pattern as an imperative “find” instruction instead of a set-membership test leads to incorrect assumptions about order and multiplicity.

### Step 2 — Atoms and concatenation
Single characters and escaped metacharacters are the atoms. Juxtaposition means concatenation.  
Example: r"ab" matches the substring "ab".  
\[ P = a \cdot b \quad \text{where } \cdot \text{ denotes concatenation.} \]

### Step 3 — Quantifiers introduce repetition
?, *, + and {m,n} expand a pattern into a variable-length sequence of the preceding atom.  
Example: r"a+" matches "a", "aa", "aaa" but not "".  
\[ P^* = \bigcup_{k=0}^\infty P^k \]

### Step 4 — Alternation and character classes
| creates choice; brackets define sets.  
Example: r"[0-9]+" matches any non-empty digit string.  
The language is the union of the languages of the alternatives.

### Step 5 — Capturing groups label sub-matches
Parentheses create numbered or named groups that record the substring matched by the enclosed sub-pattern.  
Example: r"(\d{4})-(\d{2})-(\d{2})" captures year, month, day.  
Group \(i\) stores the string matched by the \(i\)-th opening parenthesis.

### Step 6 — findall harvests every non-overlapping match
findall returns either the full match or the tuple of groups when groups are present.  
Example: re.findall(r"(\d+)", "12 34") yields ['12','34'].

### Step 7 — sub rewrites using back-references
sub replaces every match with a template that may contain \1, \g<name>, etc.  
Example: re.sub(r"(\w+) (\w+)", r"\2, \1", "John Doe") yields "Doe, John".

### Step 8 — The compiled pattern object
re.compile(pattern, flags) produces a reusable SRE_Pattern that exposes match, search, findall, sub, etc. All subsequent operations are methods on this object.

## 5. Worked examples — every step shown

**Example 1 — Literal match**  
*Given:* text = "The cat sat"  
*Find:* Does the pattern r"cat" occur?  
Step 1: compile(r"cat") → pattern object.  
*Why*: compilation builds the automaton once.  
Step 2: pattern.search(text) returns a match object at span (4,7).  
*Why*: search scans left-to-right and stops at first success.  
**Match span (4,7)**

*Reflection*: The example is trivial yet illustrates that the result is a position, not a Boolean.

**Example 2 — Simple groups**  
*Given:* text = "2024-03-15"  
*Find:* Extract year, month, day.  
Step 1: p = re.compile(r"(\d{4})-(\d{2})-(\d{2})")  
*Why*: parentheses create capturing groups 1, 2, 3.  
Step 2: m = p.match(text)  
Step 3: m.group(1), m.group(2), m.group(3) → '2024','03','15'  
**('2024','03','15')**

*Reflection*: Groups turn positional extraction into a single declarative pattern.

**Example 3 — findall with groups**  
*Given:* text = "ID: A12, ID: B07"  
*Find:* All identifiers.  
Step 1: p = re.compile(r"ID: ([A-Z]\d+)")  
Step 2: p.findall(text) → ['A12','B07']  
*Why*: When groups exist, findall returns only the group tuples, not the full match.  
**['A12','B07']**

*Reflection*: The behaviour changes automatically once capturing parentheses appear.

**Example 4 — sub with back-reference**  
*Given:* text = "user@example.com"  
*Find:* Mask the local part.  
Step 1: p = re.compile(r"(.+)@(.+)")  
Step 2: p.sub(r"***@\2", text) → "***@example.com"  
*Why*: \2 inserts the second captured group verbatim.  
**'***@example.com'**

*Reflection*: Substitution reuses captured text without manual slicing.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to raw-string a pattern | Backslashes are interpreted by Python first | Always write r"..."                          |
| Using .* instead of .*?           | Greedy quantifier consumes too much         | Add ? for non-greedy when needed             |
| Expecting findall to return full matches when groups exist | Documented behaviour of the C engine        | Use finditer or wrap the whole pattern in a group |
| Overlapping matches lost          | findall and sub advance after each match    | Use a look-ahead or manual loop with search  |
| Uncompiled pattern in a loop      | Repeated compilation cost                   | Compile once outside the loop                |
| Confusing match (anchored) with search | match implies ^ implicitly                  | Use search when the pattern may start anywhere |
| Named groups accessed by number   | Numbering still applies                     | Use groupdict() for clarity                  |

## 7. The textbook-precise statement

A regular expression over alphabet \(\Sigma\) is an expression built from atoms, concatenation, alternation, and Kleene star. The language \(L(r)\) is defined inductively. The Python re module implements POSIX ERE plus Perl extensions; its engine is a backtracking NFA. The function re.compile(r, flags=0) returns a pattern object whose findall(string) yields either list[str] or list[tuple[str,…]] according to the number of capturing groups. sub(repl, string, count=0) returns the rewritten string. Reference: Friedl, *Mastering Regular Expressions*, 3e, Chapter 3 (Python-specific behaviour in Appendix).

## 8. Visual — diagram or schematic

```text
Input:   "ID: A12, ID: B07"
Pattern: ID: ([A-Z]\d+)
States:  S0 --'I'--> S1 --'D'--> S2 --':'--> S3 --' '-->
         S3 --[A-Z]--> S4 --\d+--> S5 (accept, capture group 1)
         After match, engine resets to S0 at position after match.
```

## 9. The memory technique

**The hook**  
Imagine the regex pattern as a fishing net whose mesh size and shape are drawn by the quantifiers and groups; findall lifts every fish the net catches, sub paints each fish a new colour.

**What to overlearn**  
- Always prefix patterns with r  
- findall returns groups when any exist  
- sub back-references are \1, \2 or \g<name>

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive the language accepted by each quantifier from the inductive definition of regular expressions, then map each operator to its Python spelling.

## 10. What this unlocks

Mastery of the re module supplies the text-processing primitive required by log analysis, compiler lexers, bioinformatics parsers, and data-cleaning pipelines. It directly precedes the study of finite automata, context-free grammars, and the design of domain-specific languages.

- Next: tokenizers and simple parsers  
- Next: writing a minimal lexer with re  
- Next: integrating regex with pandas string methods

## 11. Self-check — five questions, no answers

1. What does re.findall(r"(\d+)-(\d+)", "12-34 56-78") return?  
2. Why does re.match(r"cat", "concat") return None while re.search succeeds?  
3. Write a single substitution that swaps the first two words of any line.  
4. A pattern contains nested parentheses; which group number corresponds to the inner pair?  
5. Under what exact condition does findall return a list of strings rather than a list of tuples?