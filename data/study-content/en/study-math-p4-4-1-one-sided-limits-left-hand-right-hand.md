## 1. The one-sentence answer
**One-sided limits isolate the behavior of a function as its input approaches a point from only the left or only the right.**

The two-sided limit of \(f(x)\) at \(a\) exists only when both one-sided limits exist and agree. When they differ, the function cannot settle to a single value, so the ordinary limit fails to exist even if each separate approach looks orderly. This distinction matters immediately for functions whose graphs jump, have corners, or are defined piecewise.

Consider \(f(x) = |x|\) at \(x=0\). Approaching from the positive side, every value is identical to the input itself; approaching from the negative side, every value is the negation of the input. Each direction produces a clean limit of 0, yet the two-sided statement still holds because the two results match. Replace the expression with \(f(x) = x/|x|\) and the two directions now produce \(+1\) and \(-1\); the ordinary limit is declared nonexistent.

> [!NOTE]
> The left-hand limit equals the right-hand limit if and only if the two-sided limit exists; disagreement is the most common reason a limit “does not exist.”

## 2. Why this matters — concrete and current
In semiconductor process control, optical critical-dimension tools measure line-edge roughness by taking one-sided limits of intensity profiles across photoresist boundaries; a mismatch between left and right edges signals an etch bias that must be corrected before the next wafer lot.

NASA’s Orion heat-shield instrumentation records temperature histories during atmospheric entry; engineers compute one-sided limits of heat-flux data immediately before and after peak heating to decide whether ablative material recession models remain valid.

Modern reinforcement-learning agents that control tokamak plasma current treat the safety factor profile as a function whose left- and right-hand limits at rational surfaces must coincide; divergence triggers an immediate control override to avoid tearing modes.

Aircraft flight-management systems evaluate one-sided limits of angle-of-attack time series when a stall-warning vane fails; the left-hand limit (pre-failure) and right-hand limit (post-failure) are compared to decide whether the envelope-protection law must be switched to a degraded mode.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Function notation \(f(x)\) | One-sided limits are statements about the output values of a function as its input approaches a point from one direction. |
| Informal notion of “approaching” | You must already accept that \(x\) can get arbitrarily close to \(a\) without equaling \(a\). |
| Basic piecewise definitions | Most examples that expose differing one-sided limits are defined by different rules on each side of the point. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Directional approach
A limit statement can restrict the variable \(x\) to values strictly less than \(a\) or strictly greater than \(a\).  
Example: for \(f(x)=\sqrt{x-2}\), only values \(x>2\) are allowed inside the square root.  
Formally, the left-hand limit is written
\[
\lim_{x\to a^-}f(x)=L.
\]
> [!WARNING]  
> Omitting the superscript “−” or “+” silently converts the statement into a two-sided claim that may be false.

### Step 2 — Left-hand definition
The left-hand limit equals \(L\) when, for every \(\varepsilon>0\), there exists \(\delta>0\) such that \(0<a-x<\delta\) forces \(|f(x)-L|<\varepsilon\).  
This is the ordinary \(\varepsilon\)-\(\delta\) definition with the extra constraint \(x<a\).

### Step 3 — Right-hand definition
Symmetrically, the right-hand limit equals \(L\) when \(0<x-a<\delta\) forces \(|f(x)-L|<\varepsilon\).

### Step 4 — Agreement implies two-sided limit
If both one-sided limits exist and are equal to the same number \(L\), then the two-sided limit also equals \(L\). The proof simply chooses the smaller of the two \(\delta\) values obtained from each side.

### Step 5 — Disagreement implies nonexistence
If the left-hand limit equals \(L_1\) and the right-hand limit equals \(L_2\) with \(L_1\neq L_2\), then no single \(L\) satisfies the two-sided \(\varepsilon\)-\(\delta\) definition; hence \(\lim_{x\to a}f(x)\) does not exist.

### Step 6 — Textbook statement
The preceding five steps together constitute the precise criterion used in every rigorous calculus text.

## 5. Worked examples — every step shown

**Example 1 — Absolute-value corner**  
*Given:* \(f(x)=|x|\).  
*Find:* \(\lim_{x\to0^-}f(x)\) and \(\lim_{x\to0^+}f(x)\).  

For \(x<0\), \(f(x)=-x\).  
*Why:* The definition of absolute value on the negative side.  
Thus \(\lim_{x\to0^-}(-x)=0\).  
*Why:* The identity function is continuous, so the limit equals the function value at the endpoint approached.  

For \(x>0\), \(f(x)=x\).  
*Why:* Absolute-value definition on the positive side.  
Thus \(\lim_{x\to0^+}x=0\).  
**0**  

*Reflection:* Both sides agree, so the ordinary limit also exists and equals 0; the corner is still “continuous.”

**Example 2 — Step function**  
*Given:* \(f(x)=\begin{cases}0 & x<0\\1 & x\geq0\end{cases}\).  
*Find:* one-sided limits at 0.  

Left: every \(x<0\) gives \(f(x)=0\), so the limit is 0.  
*Why:* Constant function on \((-\infty,0)\).  
Right: every \(x>0\) gives \(f(x)=1\), so the limit is 1.  
*Why:* Constant function on \((0,\infty)\).  
**Left = 0, right = 1**  

*Reflection:* The jump is detected exactly by the mismatch of one-sided limits.

**Example 3 — Rational function with domain restriction**  
*Given:* \(f(x)=\frac{x-1}{\sqrt{x}-1}\).  
*Find:* \(\lim_{x\to1^+}f(x)\).  

Domain requires \(x>1\) for the square root to be real.  
Rationalize the numerator: multiply by conjugate \(\sqrt{x}+1\).  
\[
f(x)=\frac{(x-1)(\sqrt{x}+1)}{(\sqrt{x}-1)(\sqrt{x}+1)}=\sqrt{x}+1,\quad x\neq1.
\]
Now the simplified expression is defined for \(x>0\).  
Take the right-hand limit: \(\lim_{x\to1^+}(\sqrt{x}+1)=2\).  
**2**  

*Reflection:* Algebraic simplification removes the apparent singularity, but the one-sided restriction still governs the domain.

**Example 4 — Oscillatory mismatch**  
*Given:* \(f(x)=\frac{|x|}{x}\sin(1/x)\) for \(x\neq0\).  
*Find:* one-sided limits at 0.  

For \(x>0\), \(f(x)=\sin(1/x)\).  
\(\lim_{x\to0^+}\sin(1/x)\) does not exist (oscillates).  
For \(x<0\), \(f(x)=-\sin(1/x)\).  
\(\lim_{x\to0^-}(-\sin(1/x))\) also fails to exist.  
**Both one-sided limits fail to exist**  

*Reflection:* Even when left and right expressions differ by a sign, the underlying oscillation can still destroy each one-sided limit separately.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Writing \(\lim_{x\to a}f(x)\) when only one side is defined | Habit of omitting the superscript | Always check the domain before dropping the “−” or “+”. |
| Assuming \(\lim_{x\to a^-}f(x)=\lim_{x\to a^+}f(x)\) without checking | Visual intuition from continuous graphs | Compute both sides explicitly on any piecewise or absolute-value function. |
| Using the same \(\delta\) for both sides without taking the minimum | Over-generalizing the two-sided proof | In proofs, explicitly set \(\delta=\min(\delta_L,\delta_R)\). |
| Forgetting that an infinite one-sided limit still “exists” in the extended sense | Confusion between “does not exist” and “equals infinity” | State “the limit is \(+\infty\)” only when the one-sided definition is satisfied. |
| Canceling factors that are zero on the excluded side | Algebraic reflex without domain check | Verify that the canceled factor is nonzero throughout the punctured one-sided neighborhood. |
| Confusing \(f(a)\) with either one-sided limit | Belief that limits must equal function value | Remind yourself that one-sided limits never consult the value at \(a\). |
| Treating removable discontinuities as jumps | Misreading a hole as a step | Plot or tabulate three points on each side before concluding. |

## 7. The textbook-precise statement
Let \(f\) be defined on an open interval \((a-\delta_0,a)\) for some \(\delta_0>0\). We say
\[
\lim_{x\to a^-}f(x)=L
\]
if for every \(\varepsilon>0\) there exists \(\delta>0\) such that
\[
0<a-x<\delta\implies|f(x)-L|<\varepsilon.
\]
The right-hand limit is defined symmetrically. If both one-sided limits exist and are equal, then \(\lim_{x\to a}f(x)\) exists and equals that common value. (Stewart, *Calculus*, 9e, §2.2, Definition 4 and Theorem 2.)

## 8. Visual — diagram or schematic
```text
y
^
|          f(x)
|     +-----     ----+     
|    /               \    
|   /                 \   
|  /                   \  
| /                     \ 
|/_______________________\
+-------------------------> x
         a
       <-- left   right -->
```
The left arrow approaches \(a\) from values less than \(a\); the right arrow approaches from values greater than \(a\). The vertical gap at \(x=a\) indicates that \(f(a)\) itself is irrelevant to either one-sided limit.

## 9. The memory technique
1. **The hook** — Picture a one-way street that ends at a door: you can only arrive from the left or only from the right; the two arrivals are independent journeys.  
2. **What to overlearn** — The symbols “\(x\to a^-\)” and “\(x\to a^+\)” and the fact that equality of the two one-sided limits is necessary and sufficient for the two-sided limit.  
3. **Spaced-repetition schedule** — Review the definition after 1 day, again after 3 days, 7 days, 16 days, and 35 days.  
4. **First-principles fallback** — Re-derive the \(\varepsilon\)-\(\delta\) statement while restricting the inequality \(0<|x-a|<\delta\) to either \(x<a\) or \(x>a\).

## 10. What this unlocks
One-sided limits are the precise instrument that detects jump discontinuities, decides the existence of vertical tangents, and supplies the hypotheses for the intermediate-value theorem on half-open intervals.  

- Differentiability at a point (requires both one-sided derivatives to exist and agree).  
- Definition of the Dirac delta as a limit of nascent functions whose left and right behaviors differ.  
- Laplace-transform inversion theorems that integrate along contours approaching branch cuts from one side only.  
- Numerical schemes that reconstruct weak solutions of conservation laws by enforcing Rankine–Hugoniot conditions across one-sided traces.

## 11. Self-check — five questions, no answers
1. Compute \(\lim_{x\to2^-}\frac{x^2-4}{x-2}\) and \(\lim_{x\to2^+}\frac{x^2-4}{x-2}\).  
2. Does \(\lim_{x\to0}\frac{|x|}{x}\) exist? Justify using one-sided limits.  
3. Give an example of a function for which the left-hand limit exists, the right-hand limit does not, and the two-sided limit therefore fails.  
4. True or false: if \(\lim_{x\to a^-}f(x)=+\infty\) and \(\lim_{x\to a^+}f(x)=+\infty\), then \(\lim_{x\to a}f(x)=+\infty\). Explain.  
5. Using only the \(\varepsilon\)-\(\delta\) definition, prove that \(\lim_{x\to0^-}\sqrt{-x}=0\).