## 1. The one-sentence answer
**A limit describes the value a function approaches as its input gets arbitrarily close to a chosen point, without requiring the function to be defined or continuous at that exact point.**

Aap jab kisi function ko x ke ek number ke paas le jaate ho, to uska output kya value pakadta hai, yeh limit ke through samajh aata hai. Table of values bana kar aap numerically dekhte ho ki function ka output kitna stable ho raha hai dono taraf se, jabki graph par visually yeh dikhta hai ki curve kis height par jaakar touch karne wali hai.

Yeh approach bilkul starting point hai limits ke liye kyunki yeh derivative aur integral jaise advanced ideas ki buniyad rakhta hai bina pehle formal epsilon-delta proof maange. Graphical view especially helpful hai jab function mein holes, jumps ya asymptotes hote hain.

> [!NOTE]
> The core “aha” is that the limit cares only about nearby behaviour, not the actual value (or even existence) of the function at the point itself.

## 2. Why this matters — concrete and current
In aerospace trajectory design at NASA’s Johnson Space Center, engineers use limit tables to predict fuel-burn rates as a spacecraft approaches the exact orbital insertion velocity; a small misjudgement in the limit produces large delta-v errors.

Semiconductor foundries such as TSMC rely on graphical limit analysis of dopant diffusion profiles when gate lengths shrink below 3 nm; the concentration function is undefined exactly at the interface, yet the limiting value determines leakage current.

In machine-learning hardware, NVIDIA’s TensorRT optimiser inspects activation functions via tabulated limits near saturation points to decide safe quantisation ranges, preventing overflow in INT8 inference.

Climate models at the European Centre for Medium-Range Weather Forecasts evaluate radiative-transfer functions at the tropopause; the graphical limit of long-wave flux as altitude approaches the boundary layer sets the upper boundary condition for the entire simulation.

Gravitational-wave data analysis at LIGO uses one-sided limits of strain amplitude as frequency approaches the seismic wall; tables confirm the detector’s response before matched filtering begins.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Function notation | You must read f(x) correctly to build the table.          |
| Domain and range | You need to know where the function is even defined.      |
| Coordinate plane | Graphs are plotted on x-y axes; limits appear as heights. |
| Left and right approach | Limits require checking both sides independently.     |

If any row above feels shaky, pause and review that single idea first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Pick a target x-value
Aap decide karte ho ki x kis number ke paas jaana hai; isko usually c kehte hain.  
Example: let c = 2 for f(x) = (x² – 4)/(x – 2).  
Formal statement: we examine behaviour as x → 2.  
> [!WARNING]  
> Choosing a point where the function is already defined can hide removable discontinuities; students then wrongly think the limit equals f(c).

### Step 2 — Build a table from both sides
Values of x ko c ke left aur right se chhote-chhote steps mein likho aur f(x) calculate karo.  
Example table rows: x = 1.9, 1.99, 1.999 and x = 2.1, 2.01, 2.001.  
Formal: record ordered pairs (x, f(x)) approaching c from each side.

### Step 3 — Observe numerical stabilisation
Aap dekhte ho ki f(x) ek hi number ki taraf badh raha hai ya nahi.  
Agar dono taraf se wohi number aata hai, limit exist karta hai.  
Formal: if the left-hand and right-hand sequences converge to the same L, we write lim_{x→c} f(x) = L.

### Step 4 — Draw the graph and read the height
Plot points aur curve ko mentally extend karo; y-axis par jo height dikhe, wohi limit hai.  
Holes ya jumps clearly dikh jaate hain.  
Formal: the y-coordinate that the curve approaches (even if the point itself is missing) is the limit value.

### Step 5 — State the formal definition using tables and graphs
Textbook language: lim_{x→c} f(x) = L means that for every sequence {x_n} → c with x_n ≠ c, f(x_n) → L.  
Graphically this appears as vertical distance between curve and line y = L shrinking to zero near x = c.

## 5. Worked examples — har step show karo

**Example 1 — Simple removable discontinuity**  
*Given:* f(x) = (x² – 1)/(x – 1), target c = 1.  
*Find:* lim_{x→1} f(x) via table and graph.  
x = 0.9 → f = 1.9; x = 0.99 → f = 1.99; x = 1.01 → f = 2.01.  
Both sides approach 2.  
*Why:* direct substitution is 0/0, so table reveals the hidden value after cancellation.  
**2**  
*Reflection:* the graph has a hole at (1,2) yet the limit is still 2; this pattern repeats in rational functions.

**Example 2 — One-sided limit exists**  
*Given:* f(x) = |x|/x, c = 0.  
*Find:* left and right limits separately.  
Left table (x = –0.1, –0.01) gives –1; right table gives +1.  
*Why:* absolute value changes definition across zero.  
**Limit does not exist**  
*Reflection:* always test both sides; one-sided agreement is mandatory.

**Example 3 — Infinite limit graphically**  
*Given:* f(x) = 1/x, c = 0.  
Tables show left → –∞, right → +∞.  
Graph approaches y-axis asymptotically.  
**Limit does not exist (unbounded)**  
*Reflection:* unbounded behaviour is still useful information for later asymptote work.

**Example 4 — Trigonometric with table**  
*Given:* f(x) = sin(x)/x, c = 0.  
x = ±0.1 → ≈0.9983; x = ±0.01 → ≈0.99998.  
Graph squeezes to y = 1.  
**1**  
*Reflection:* famous limit that appears in derivatives of sine; table confirms before any theorem is invoked.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Plugging x = c directly     | Habit from algebra                          | Always build table first when 0/0 appears    |
| Ignoring one side           | Assuming symmetry                           | Force two separate columns in every table    |
| Reading y-value at the point| Confusing function value with limit         | Cover the point with finger on graph         |
| Stopping at 3 decimal places| Early rounding hides slow convergence       | Use at least 6 decimals or scientific notation |
| Declaring limit exists when sides differ | Over-eagerness to finish | Write LHL = ? and RHL = ? explicitly       |
| Forgetting removable holes  | Visual gap not noticed                      | Draw open circle on graph before reading height |
| Mixing x and y while reading graph | Axis confusion                     | Label every column “x” and “f(x)”            |

## 7. The textbook-precise statement
Let f be a function defined on an open interval containing c, except possibly at c itself. We say that the limit of f(x) as x approaches c is L, written  
$$\lim_{x \to c} f(x) = L,$$  
provided that for every sequence {x_n} in the domain of f such that x_n ≠ c and x_n → c, we have f(x_n) → L. Equivalently, the left-hand limit equals the right-hand limit:  
$$\lim_{x \to c^-} f(x) = \lim_{x \to c^+} f(x) = L.$$  
(Stewart, *Calculus*, 9e, §2.2)

## 8. Visual — diagram or schematic
```
y
^
|               /
|              /
|   hole      /
|    o       /
|           /
|          /
|         /
|        /
+--------|---------> x
         c
```
The curve approaches the open circle from both left and right; the y-coordinate of that circle is the limit value.

## 9. The memory technique

1. **The hook** — Imagine walking toward a door labelled “c”; you never open it, yet you can still guess the colour of the wall behind it by looking through the narrowing gap on both sides.  
2. **What to overlearn** — LHL = RHL is the only condition that grants existence; write both every single time.  
3. **Spaced-repetition schedule** — Review tables after 1 day, redraw graphs after 3 days, state the definition after 7 days, solve mixed problems after 16 days, teach someone after 35 days.  
4. **First-principles fallback** — If stuck, rebuild the table with 8 values on each side; the numbers themselves will tell you whether convergence occurs.

## 10. What this unlocks
Once limits via tables and graphs are solid, every later idea in calculus rests on this foundation.

- Derivative as limit of difference quotient  
- Continuity defined via limits equalling function value  
- L’Hôpital’s rule for indeterminate forms  
- Definite integral as limit of Riemann sums  
- Taylor series convergence tests  

## 11. Self-check — five questions, no answers
1. For f(x) = (x – 3)/(x² – 9), construct a six-row table around x = 3 and state the limit if it exists.  
2. Sketch a graph that has lim_{x→2} f(x) = 5 yet f(2) is undefined.  
3. Why does the function f(x) = |x – 1|/(x – 1) fail to have a limit at x = 1 even though both one-sided tables look clean?  
4. A student claims lim_{x→0} 1/x = ∞; rewrite the claim correctly using limit language and explain the error.  
5. Given only the graph of a function with two holes and one jump, label every visible limit value and mark which ones do not exist.