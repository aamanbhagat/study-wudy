## 1. The one-sentence answer
**`range(start, stop, step)` returns an immutable sequence of integers beginning at `start`, ending before `stop`, and advancing by `step`.**

In its simplest use, `range(5)` yields the integers 0, 1, 2, 3, 4. The first argument is omitted and defaults to zero; the single supplied value acts as the exclusive upper bound. Adding a second argument shifts the lower bound: `range(2, 5)` produces 2, 3, 4. The third argument supplies the increment, which may be positive or negative.

The sequence never includes the stop value itself. This half-open convention guarantees that the length of the sequence equals `(stop - start) // step` when the arguments are integers and step is nonzero.

> [!NOTE]
> The stop value is always excluded; this single design choice eliminates off-by-one errors when `range` is used to index or partition other sequences.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover flight software uses `range` to step through fixed-duration control cycles when generating 10 ms telemetry frames; the exclusive stop bound ensures the final frame of each 1000-frame buffer is never overwritten.  

Google’s TensorFlow data pipeline employs `range` inside `tf.data.Dataset.range` to create deterministic shard indices for training partitions across thousands of TPU cores; the arithmetic guarantees every example appears in exactly one shard.  

Semiconductor place-and-route tools at TSMC iterate over cell rows with `range(row_start, row_stop, row_pitch)` to place power rails on a 7 nm grid without fence-post collisions.  

The CPython interpreter’s own `list(range(1_000_000))` micro-benchmark in the performance suite measures allocation cost; the measured constant-time construction of the range object itself underpins the speed of every `for` loop that iterates over integer intervals.

## 3. Mental prerequisites

| Concept          | Why you need it here                              |
|------------------|---------------------------------------------------|
| Integer literals | `start`, `stop`, and `step` must be integers      |
| Sequence protocol| `range` objects support indexing and iteration    |
| Floor division   | Length formula uses `//` to handle negative steps |

## 4. Building the idea — from intuition to formalism

### Step 1 — A half-open interval on the number line
A range describes every integer strictly inside a half-open interval.  
`range(0, 5)` selects 0, 1, 2, 3, 4.  
$$[start, stop) = \{ n \in \mathbb{Z} \mid start \le n < stop \}$$

> [!WARNING]
> Treating the interval as closed on the right produces one extra value and breaks every subsequent length calculation.

### Step 2 — Adding a stride
When a nonzero integer `step` is supplied, only every `step`-th integer is kept.  
`range(0, 10, 2)` yields 0, 2, 4, 6, 8.  
$$\{ start + k\cdot step \mid k \in \mathbb{N}_0,\ start + k\cdot step < stop \}$$

> [!WARNING]
> Using a floating-point step silently raises `TypeError`; the arithmetic must remain exact.

### Step 3 — Negative stride reverses direction
A negative `step` traverses downward; the inequality sign flips.  
`range(5, 0, -1)` yields 5, 4, 3, 2, 1.  
$$\{ start + k\cdot step \mid k \in \mathbb{N}_0,\ start + k\cdot step > stop \}$$

> [!WARNING]
> Forgetting to make `stop` smaller than `start` with a negative step yields an empty sequence.

### Step 4 — Default values
`range(stop)` expands to `range(0, stop, 1)`.  
`range(start, stop)` expands to `range(start, stop, 1)`.

### Step 5 — Length formula
The number of integers generated is given by  
$$\max\left(0,\ \left\lceil\frac{stop-start}{step}\right\rceil\right)$$  
when `step > 0`, and the symmetric form for `step < 0`. In Python this is computed with floor division and a guard against the empty case.

### Step 6 — The textbook definition
`range` is the unique function satisfying the six-tuple  
`(start, stop, step, __len__, __getitem__, __iter__)`  
where `__getitem__(k)` returns `start + k*step` for `0 ≤ k < len(range)` and raises `IndexError` otherwise.

## 5. Worked examples — every step shown

**Example 1 — Default start**  
*Given:* `range(4)`  
*Find:* the integers produced and the length.  
`range(4)` expands to `range(0, 4, 1)`.  
The sequence is therefore 0, 1, 2, 3.  
Length = `(4-0)//1 = 4`.  
**0 1 2 3**  
*Reflection:* The omitted start defaults to zero; the exclusive stop produces exactly four values.

**Example 2 — Explicit start and stop**  
*Given:* `range(3, 7)`  
*Find:* sequence and length.  
Start = 3, stop = 7, step = 1.  
Values: 3, 4, 5, 6.  
Length = `(7-3)//1 = 4`.  
**3 4 5 6**  
*Reflection:* The lower bound is now inclusive; the length formula remains unchanged.

**Example 3 — Non-unit step**  
*Given:* `range(1, 10, 3)`  
*Find:* sequence.  
1 + 0·3 = 1 (< 10)  
1 + 1·3 = 4 (< 10)  
1 + 2·3 = 7 (< 10)  
1 + 3·3 = 10 (not < 10)  
**1 4 7**  
*Reflection:* The final candidate equals the stop and is excluded; the length is 3.

**Example 4 — Negative step**  
*Given:* `range(10, 0, -2)`  
*Find:* sequence.  
10, 8, 6, 4, 2 (all > 0).  
Length = 5.  
**10 8 6 4 2**  
*Reflection:* The stop value 0 is never reached; the direction of comparison is reversed by the sign of step.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Expecting inclusive stop    | Habit from closed-interval mathematics      | Always write `stop-1` explicitly when needed |
| Using float step            | Copy-paste from numeric loops               | Cast to `int` or use `numpy.arange` instead  |
| Empty range with wrong sign | Negative step but start < stop              | Swap bounds or change sign of step           |
| IndexError on large k       | Forgetting range length formula             | Compute `len(r)` before indexing             |
| Modifying the range object  | Belief that range is a list                 | Remember it is immutable; convert if needed  |
| Non-integer arguments       | Passing variables that became floats        | Assert `isinstance(x, int)` at call site     |
| Infinite loop with step=0   | Explicit zero step                          | Guard with `if step == 0: raise ValueError`  |

## 7. The textbook-precise statement
A call `range(start, stop=None, step=1)` returns a `range` object `r` such that:  
- if `stop is None` then `start, stop, step = 0, start, 1`;  
- `r[i] = start + i·step` for `0 ≤ i < n`, where `n = max(0, (stop-start+step-(1 if step>0 else -1))//step)`;  
- iteration yields `r[0], r[1], …, r[n-1]` in order.  
Reference: Python Language Reference, §5.3 “Sequence Types — range”.

## 8. Visual — diagram or schematic
```text
Number line (step = 2, start = 1, stop = 9)
0   1   2   3   4   5   6   7   8   9  10
    ↑               ↑               ↑
   r[0]            r[1]            r[2]
   1               3               5
(stop = 9 never reached)
```

## 9. The memory technique

1. **The hook** — Picture a fence with posts at every integer; you walk from the first post you touch (`start`) to the post you must not touch (`stop`), taking strides of size `step`.  
2. **What to overlearn** — `range(stop)` starts at 0; stop is exclusive; length = `max(0, (stop-start)//step)`.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the sequence by repeatedly adding `step` while the inequality `current < stop` (or `> stop`) holds.

## 10. What this unlocks
Mastery of `range` supplies the integer sequences required by every subsequent control-flow construct, slicing operation, and numeric algorithm in Python.  

- `for i in range(len(seq))` — index-based loops  
- `seq[::step]` — extended slicing  
- `numpy.arange` and `linspace` — vectorised numeric ranges  
- Iteration over multi-dimensional grids (`itertools.product(range(...), ...)`)

## 11. Self-check — five questions, no answers
1. What sequence does `range(5, 0, -1)` produce?  
2. Compute `len(range(10, 100, 7))` without executing code.  
3. Why does `range(0.5, 5)` raise an exception?  
4. A programmer writes `for i in range(n-1, -1, -1)` to traverse indices backward; what single change would also work and why is it clearer?  
5. Given `r = range(1000000000)`, does `r[999999999]` allocate memory for a billion integers? Explain.