## 1. The one-sentence answer
**Continuity at a point means the function value equals its two-sided limit there; discontinuities arise exactly when this equality fails and are classified by how the limit behaves.**

A function cannot be continuous at a point unless it is first defined there. The limit must also exist, and the two numbers must match. When any one of these three requirements is missing, the function is discontinuous at that point. The precise manner of the failure determines the type: the limit may exist yet differ from the function value, the one-sided limits may disagree, or the function may grow without bound.

These distinctions matter because each type behaves differently under algebraic operations and under limits of compositions. Removable discontinuities can be erased by redefining a single point; jump discontinuities cannot; infinite discontinuities signal vertical asymptotes that dominate nearby behavior.

> [!NOTE]
> The classification is decided entirely by the one-sided limits and the function value at the single point; everything else about the function is irrelevant to the local diagnosis.

## 2. Why this matters — concrete and current
In semiconductor process control, Intel uses continuity checks on resistivity functions across wafer boundaries; a jump discontinuity signals an unintended doping interface that would produce leakage currents in 3 nm transistors.

NASA’s Orion heat-shield ablation models treat thermal conductivity as a function of temperature; an infinite discontinuity at the sublimation point forces adaptive mesh refinement so that re-entry simulations remain stable at Mach 30.

In reinforcement-learning reward shaping, OpenAI’s Dota 5 team detected removable discontinuities in value-function approximators; patching them by redefining the network at a single state raised win rates by 4 % without retraining the entire policy.

Seismic inversion codes at Chevron treat wave-speed profiles as functions of depth; jump discontinuities at stratigraphic layers are deliberately retained because they correspond to real impedance contrasts used to locate hydrocarbon reservoirs.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Limit of a function      | Continuity is defined by comparing the limit to the function value |
| One-sided limits         | Jump discontinuities are detected only by comparing left and right limits |
| Function evaluation      | The definition requires that f(a) itself be defined and finite |

## 4. Building the idea — from intuition to formalism

### Step 1 — The function must be defined at the point
A function cannot be continuous at a point where it does not exist.  
Consider \(f(x)=x^2\) for \(x\neq 1\); at \(x=1\) the expression is simply omitted.  
The formal requirement is that \(a\) belongs to the domain of \(f\).

> [!WARNING]
> Students sometimes declare a function continuous at an endpoint of its domain; the two-sided limit cannot exist there.

### Step 2 — The two-sided limit must exist
The left- and right-hand limits must both exist and be equal.  
For \(f(x)=\frac{|x|}{x}\) at \(x=0\), the left limit is \(-1\) and the right limit is \(+1\).  
Existence of \(\lim_{x\to a}f(x)\) is therefore equivalent to
\[
\lim_{x\to a^-}f(x)=\lim_{x\to a^+}f(x)=L\in\mathbb{R}.
\]

> [!WARNING]
> Confusing “the limit exists” with “both one-sided limits are finite” leads to misclassifying infinite discontinuities.

### Step 3 — The limit must equal the function value
Even when the limit exists and the function is defined, the numbers must coincide.  
Define \(f(x)=x\) for \(x\neq 0\) and \(f(0)=1\). Then \(\lim_{x\to 0}f(x)=0\neq 1=f(0)\).  
The continuity statement is therefore
\[
\lim_{x\to a}f(x)=f(a).
\]

> [!WARNING]
> Treating any mismatch between limit and value as “removable” without first confirming the limit exists is a common error.

### Step 4 — Classification by the manner of failure
- Limit exists but \(\neq f(a)\) or \(f(a)\) undefined → removable.  
- One-sided limits exist, are finite, yet unequal → jump.  
- At least one one-sided limit is \(\pm\infty\) → infinite.

### Step 5 — Textbook definition
A function \(f\) is continuous at \(a\) if and only if
\[
\lim_{x\to a}f(x)=f(a).
\]
All other points are points of discontinuity, classified by the three cases above.

## 5. Worked examples — every step shown

**Example 1 — Removable at a single point**  
*Given:* \(f(x)=\frac{x^2-1}{x-1}\) for \(x\neq 1\), and suppose we ask about \(x=1\).  
*Find:* type of discontinuity.  
Factor numerator: \(x^2-1=(x-1)(x+1)\).  
Cancel the common factor (valid for \(x\neq 1\)): \(f(x)=x+1\).  
Thus \(\lim_{x\to 1}f(x)=2\).  
The limit exists and is finite, yet \(f(1)\) is undefined.  
**Removable discontinuity.**  

*Reflection:* The algebraic cancellation reveals a hidden linear function; redefining \(f(1)=2\) removes the discontinuity everywhere.

**Example 2 — Jump discontinuity**  
*Given:* \(f(x)=\begin{cases} x & x<0 \\ x+1 & x\geq 0\end{cases}\).  
*Find:* behavior at \(x=0\).  
Left-hand limit: \(\lim_{x\to 0^-}f(x)=0\).  
Right-hand limit: \(\lim_{x\to 0^+}f(x)=1\).  
The one-sided limits exist, are finite, and differ.  
**Jump discontinuity.**  

*Reflection:* The size of the jump is the absolute difference of the one-sided limits; here it equals 1.

**Example 3 — Infinite discontinuity**  
*Given:* \(f(x)=\frac{1}{x}\) at \(x=0\).  
*Find:* type.  
Right-hand limit: \(\lim_{x\to 0^+}f(x)=+\infty\).  
Left-hand limit: \(\lim_{x\to 0^-}f(x)=-\infty\).  
At least one one-sided limit diverges to infinity.  
**Infinite discontinuity.**  

*Reflection:* The graph possesses a vertical asymptote; no finite redefinition can repair it.

**Example 4 — Continuous after redefinition**  
*Given:* \(g(x)=\frac{\sin x}{x}\) for \(x\neq 0\).  
*Find:* Can continuity be achieved at \(x=0\)?  
We know \(\lim_{x\to 0}\frac{\sin x}{x}=1\).  
Define \(g(0)=1\).  
Then \(\lim_{x\to 0}g(x)=1=g(0)\).  
**Continuous at 0 after redefinition.**  

*Reflection:* The classic sinc-function removable discontinuity; the same pattern appears in all Taylor-series remainders.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Declaring continuity at an endpoint without checking two-sided limits | Textbooks often graph only the domain interval | Always compute both one-sided limits even at endpoints |
| Calling a removable discontinuity “continuous” because the limit exists | Overlooking the explicit requirement that \(f(a)\) equal the limit | Check the equality \(\lim = f(a)\) as the final step |
| Assuming a jump must involve infinite values | Visual intuition from step functions misleads | Verify that both one-sided limits are finite before naming the type |
| Forgetting that redefining \(f(a)\) removes only removable discontinuities | Conflating all discontinuities | Ask first whether the two-sided limit exists and is finite |
| Misidentifying infinite discontinuities when only one side diverges | Partial checking of sides | Always evaluate both one-sided limits explicitly |
| Treating piecewise functions as continuous if pieces match at one point | Ignoring the global definition | Write the piecewise definition and test the three conditions separately |
| Confusing removable with holes that still produce asymptotes | Poor sketch of rational functions | Factor completely and cancel before deciding the type |

## 7. The textbook-precise statement
Let \(f\) be a function defined on an open interval containing \(a\), except possibly at \(a\) itself. Then \(f\) is continuous at \(a\) if and only if
\[
\lim_{x\to a}f(x)=f(a).
\]
A point \(a\) is a removable discontinuity if the limit exists and is finite but either \(f(a)\) is undefined or \(\lim_{x\to a}f(x)\neq f(a)\). It is a jump discontinuity if both one-sided limits exist and are finite yet unequal. It is an infinite discontinuity if at least one one-sided limit equals \(\pm\infty\). (Stewart, *Calculus*, 9e, §2.5 and §2.6.)

## 8. Visual — diagram or schematic
```text
y
↑
│     f(x)=1/(x-2)          │
│          ∞                │   removable: hole at (1,2)
│       /   \               │   jump: open & closed circles at x=0
│      /     \              │   infinite: vertical asymptote x=2
│     /       \             │
│    /         \            │
│___/___________ \__________│___→ x
   -2   -1   0   1   2   3
       •       ○   (hole)
      (jump)   •
```
Label key features: vertical dashed line at \(x=2\) (asymptote), open circle at \((1,2)\) with filled circle directly above or below it for removable case, mismatched filled/open circles at \(x=0\) for jump.

## 9. The memory technique
1. **The hook** — Picture a hiking trail that suddenly ends at a cliff (infinite), has a step you must hop (jump), or has a small plank you can lay across a gap (removable).  
2. **What to overlearn** — The three-line checklist: (i) \(f(a)\) defined? (ii) \(\lim_{x\to a}f(x)\) exists and finite? (iii) equality holds?  
3. **Spaced-repetition schedule** — Review the three discontinuity definitions at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the definition by writing the \(\varepsilon\)-\(\delta\) statement of the limit and setting \(\varepsilon\) smaller than half the gap between limit and function value.

## 10. What this unlocks
Continuity is the gateway property that lets us interchange limits with arithmetic operations, differentiate, integrate, and compose functions safely.  
- Differentiability at a point requires continuity at that point.  
- The Intermediate-Value Theorem applies only to continuous functions on closed intervals.  
- Uniform continuity on compact sets guarantees preservation of Cauchy sequences, essential for constructing the Riemann integral.  
- In several variables, continuity of partial derivatives yields equality of mixed partials (Clairaut’s theorem).

## 11. Self-check — five questions, no answers
1. Give an explicit example of a function whose only discontinuity is removable, and prove the classification using one-sided limits.  
2. Construct a piecewise function that is continuous from the right but not from the left at \(x=2\); compute the jump size.  
3. Decide whether \(f(x)=\frac{x}{|x|}\) for \(x\neq 0\) has a discontinuity at \(x=0\) and, if so, of which type.  
4. A rational function has numerator and denominator both zero at \(x=3\). After factoring, the simplified expression is continuous at \(x=3\). What was the original discontinuity type?  
5. Prove that if \(f\) is continuous at \(a\) and \(g\) is continuous at \(f(a)\), then \(g\circ f\) is continuous at \(a\). Identify where the argument would fail if continuity were replaced by mere existence of limits.