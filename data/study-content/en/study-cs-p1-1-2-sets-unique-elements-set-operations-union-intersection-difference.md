## 1. The one-sentence answer
**A Python set is an unordered collection of unique, hashable elements that supports the mathematical operations of union, intersection, and difference in constant average time.**

Sets eliminate duplicates by construction: when two identical values are added, only one survives. This uniqueness follows directly from the requirement that every element must be hashable and therefore testable for equality in O(1) time on average. The three core operations then become simple lookups or merges over the underlying hash table rather than repeated linear scans. Because order is never recorded, iteration yields elements in an arbitrary but deterministic sequence for a given insertion history.

> [!NOTE]
> The single most powerful mental shift is to stop thinking “a set is a list without duplicates” and start thinking “a set is a mathematical set implemented so that membership and the three Boolean algebra operations are primitives.”

## 2. Why this matters — concrete and current
In aerospace trajectory planning at NASA’s Jet Propulsion Laboratory, sets of reachable waypoints are intersected in real time to prune infeasible paths for the Perseverance rover; each intersection must finish in microseconds, which Python’s built-in set operations deliver without custom C extensions.  
Semiconductor design tools at TSMC use set difference to compute the exact polygons that must be added or removed when a mask layer is revised; the operation is performed on millions of coordinate pairs and must be bit-exact.  
Modern machine-learning pipelines at Hugging Face deduplicate training corpora by hashing sentences into sets before tokenization; the resulting set-difference step removes near-duplicates that would otherwise inflate gradient variance.  
Network routers running FRRouting maintain sets of advertised prefixes; the union of two BGP peers’ sets is computed to decide route advertisement, guaranteeing no duplicate prefixes are ever injected into the forwarding table.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Hashable objects     | Only hashable values can be stored; lists and dicts are excluded |
| Boolean algebra      | Union, intersection and difference obey the same identities taught in discrete mathematics |
| Average-case O(1) lookup | Explains why set operations are fast and why worst-case degradation must be understood |

## 4. Building the idea — from intuition to formalism

### Step 1 — Uniqueness by construction
A set never stores two elements that compare equal.  
```python
s = {1, 2, 2, 3}
print(s)          # {1, 2, 3}
```
Formally, a set \(S\) satisfies \(\forall x,y\in S.\; x=y\implies x=y\) (tautological) and the insertion rule \(x\in S\lor x\notin S\) after every update.  
> [!WARNING]  
> If you later mutate a stored element so that its hash changes, the set’s internal invariant is broken and lookup becomes undefined.

### Step 2 — Creation syntax and type
Literal syntax uses curly braces; the empty set requires the constructor.  
```python
empty = set()
numbers = {1, 2, 3}
```
The mathematical statement is \(S = \{x_1,x_2,\dots,x_n\}\) where each \(x_i\) is distinct and hashable.

### Step 3 — Union
The union of two sets contains every element present in either.  
```python
a = {1, 2}
b = {2, 3}
a | b          # {1, 2, 3}
```
Mathematically:  
\[ A \cup B = \{x \mid x\in A \lor x\in B\} \]

### Step 4 — Intersection
The intersection retains only elements common to both.  
```python
a & b          # {2}
```
\[ A \cap B = \{x \mid x\in A \land x\in B\} \]

### Step 5 — Difference
Difference removes from the left operand every element present in the right.  
```python
a - b          # {1}
```
\[ A \setminus B = \{x \mid x\in A \land x\notin B\} \]

### Step 6 — Algebraic closure
All three operations return new sets, preserving the type and uniqueness invariant; this yields a Boolean algebra on the power set of hashable objects.

## 5. Worked examples — every step shown

**Example 1 — Basic uniqueness**  
*Given:* the literal `{1, 1, 2}`.  
*Find:* the resulting set and its length.  
1. Parser evaluates the literal and inserts 1, then attempts to insert the second 1.  
   *Why:* equality test `1 == 1` succeeds, so the duplicate is discarded.  
2. 2 is inserted.  
   *Why:* it is distinct under equality.  
**{1, 2}**  
*Reflection:* The length is always the number of distinct hashable values supplied.

**Example 2 — Union of overlapping sets**  
*Given:* `A = {1,2,3}`, `B = {3,4,5}`.  
*Find:* `A | B`.  
1. Create a new hash table.  
   *Why:* union must not mutate inputs.  
2. Copy every element of A.  
3. For each element of B, insert only if absent.  
   *Why:* the hash table already guarantees uniqueness.  
**{1, 2, 3, 4, 5}**

**Example 3 — Intersection followed by difference**  
*Given:* `users = {"alice","bob","carol"}`, `admins = {"bob","dave"}`.  
*Find:* non-admin users.  
1. Compute `users & admins` → `{"bob"}`.  
   *Why:* only common element.  
2. Subtract that result from users: `users - (users & admins)`.  
   *Why:* difference removes exactly the intersection.  
**{"alice","carol"}**

**Example 4 — Symmetric difference via other primitives**  
*Given:* `A = {1,2,3}`, `B = {3,4}`.  
*Find:* elements in exactly one of the sets.  
1. `(A - B) | (B - A)`.  
   *Why:* each difference keeps the exclusive part; union merges them.  
**{1, 2, 4}**

## 6. Common traps and how to avoid them

| Trap                          | Why it happens                              | How to avoid it                              |
|-------------------------------|---------------------------------------------|----------------------------------------------|
| Adding a list to a set        | Lists are unhashable                        | Convert to tuple first or use frozenset      |
| Expecting insertion order     | Hash tables do not preserve order           | Use dict (3.7+) or list if order matters     |
| Mutating a set while iterating| Runtime modification invalidates iterators  | Iterate over a copy: `for x in set(s):`      |
| Using `==` on floats inside sets | Hash collisions with NaN or -0.0         | Avoid floats; use Decimal or scale to int    |
| Assuming `set()` is the same as `{}` | `{}` creates a dict, not a set         | Always write `set()` for the empty set       |
| Forgetting that sets are unordered | Trying to index with `[0]`               | Convert to list or use `next(iter(s))`       |
| Large sets causing memory spikes | Hash table overhead (~8× element size)  | Use `sys.getsizeof` to monitor before scaling|

## 7. The textbook-precise statement
A set \(S\) over a universe \(U\) of hashable objects is a finite subset \(S\subseteq U\) stored in a hash table so that the predicates \(x\in S\), \(S_1\cup S_2\), \(S_1\cap S_2\) and \(S_1\setminus S_2\) each run in expected \(O(1)\) time per element. Python’s `set` type implements exactly this structure (Cormen et al., *Introduction to Algorithms*, 4e, Ch. 11, “Hash Tables”).

## 8. Visual — diagram or schematic
```
          A                  B
       +-----+           +-----+
       | 1   |           | 4   |
       | 2   |   union   | 3   |
       | 3   | --------> |     |
       +-----+           +-----+
          \               /
           \   intersect /
            +-----------+
            |     3     |
            +-----------+
```

The diagram shows two circles whose overlapping region is the intersection; the symmetric difference is everything except the overlap.

## 9. The memory technique
1. **The hook** — picture a velvet bag that instantly rejects duplicate marbles; any marble already inside makes the new one bounce out.  
2. **What to overlearn** — `s | t`, `s & t`, `s - t` and the fact that every element is unique and hashable.  
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — rebuild from the definition: a set is a collection with no duplicates; union keeps anything in either collection, intersection keeps only what is in both, difference keeps what is in the first but not the second.

## 10. What this unlocks
Sets are the foundation for graph adjacency-list representations, database relational algebra, and the internals of dict keys.  
- Next: frozenset (immutable sets)  
- Next: dict comprehensions that rely on key uniqueness  
- Next: graph algorithms that treat adjacency as a set for O(1) edge tests

## 11. Self-check — five questions, no answers
1. What is the length of `len({1, "1", 1.0})` and why?  
2. Write an expression that returns the elements present in exactly two of three given sets A, B, and C.  
3. Why does `s.add([1,2])` raise an exception while `s.add((1,2))` succeeds?  
4. Demonstrate that `(A | B) - (A & B)` equals the symmetric difference.  
5. Predict the output of `set("abracadabra") & set("aardvark")` and justify each character that survives.