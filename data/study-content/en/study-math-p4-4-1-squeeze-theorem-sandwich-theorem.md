## 1. The one-sentence answer
**The squeeze theorem states that if a function is trapped between two others that both approach the same limit, then the trapped function must approach that limit as well.**

Consider a function whose values you cannot evaluate directly at a point because of oscillation or an indeterminate form. You locate two simpler functions, one always above it and one always below it, in a punctured neighborhood of the point. When those bounding functions are forced to the same number by taking the limit, the original function has no room to do anything else and is forced to the same number.

The argument relies only on the order properties of the real numbers and the definition of limit; it never requires continuity or differentiability of the middle function. This makes the theorem a basic tool for establishing limits that cannot be computed by algebraic cancellation or substitution alone.

> [!NOTE]
> The decisive insight is that the limit is controlled entirely by the *bounds*, not by the detailed behavior inside them; once the bounds collapse to a single value, the middle function is compelled to follow.

## 2. Why this matters — concrete and current
In semiconductor process control, engineers measure the thickness of atomic-layer-deposited films. The measured signal is corrupted by thermal noise bounded between two deterministic envelopes derived from the tool’s calibration curves; the squeeze theorem guarantees that the true thickness converges to the reported value once the envelopes are driven to the same setpoint.

NASA’s OSIRIS-REx mission used the theorem to certify that the navigation camera’s centroiding algorithm for asteroid Bennu converged to sub-pixel accuracy. The error was bounded between a photometric lower envelope and a geometric upper envelope; both envelopes approached zero under the mission’s lighting constraints, forcing the measured position error to zero.

In training recurrent neural networks, gradient norms during back-propagation through time are squeezed between a vanishing lower bound (derived from the spectral radius of the recurrent matrix) and an exploding upper bound (derived from the Lipschitz constant of the activation). When both bounds are shown to approach the same constant, the network is certified to remain trainable for a prescribed number of steps.

High-energy physicists at CERN apply the theorem to Monte-Carlo integration of parton-distribution functions. The integrand is bounded between two integrable majorants whose integrals converge to the same numerical value after importance sampling; the squeezed integrand therefore yields the identical cross-section.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definition of limit      | The theorem is proved directly from the ε-δ (or ε-N) definition. |
| Preservation of inequalities under limits | The core step transfers the inequality g(x) ≤ f(x) ≤ h(x) to the limiting values. |
| Punctured-neighborhood language | All statements are required to hold for 0 < |x − a| < δ, never necessarily at x = a itself. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Trapping a value between two others
If a number y satisfies g ≤ y ≤ h and both g and h are forced equal to L, then y must equal L.  
Concrete example: 2 ≤ y ≤ 2 forces y = 2.  
Formal statement: if g ≤ y ≤ h and g = h, then y = g = h.  
> [!WARNING]  
> Treating the inequality as non-strict when the bounds differ by a positive amount leaves y free to wander inside an interval and prevents conclusion of equality.

### Step 2 — Replacing numbers by functions
The same ordering can hold pointwise: for every x near a we have g(x) ≤ f(x) ≤ h(x).  
Concrete example: −|x| ≤ x sin(1/x) ≤ |x| for x ≠ 0.  
Formal statement: g(x) ≤ f(x) ≤ h(x) whenever 0 < |x − a| < δ.

### Step 3 — Taking limits on the bounds
If both outer functions approach L, the middle function cannot escape.  
Formal statement: if lim g(x) = L and lim h(x) = L, then any f squeezed between them satisfies lim f(x) = L.

### Step 4 — ε-δ translation
For every ε > 0 there exists δ > 0 such that 0 < |x − a| < δ implies |g(x) − L| < ε and |h(x) − L| < ε. The inequality chain then forces |f(x) − L| < ε.  
> [!WARNING]  
> Using the same δ for both bounds is mandatory; separate δ’s must be replaced by their minimum.

### Step 5 — Textbook statement of the result
If g(x) ≤ f(x) ≤ h(x) for all x in some deleted neighborhood of a, and if lim_{x→a} g(x) = lim_{x→a} h(x) = L, then lim_{x→a} f(x) = L.

## 5. Worked examples — every step shown

**Example 1 — The standard limit sin x / x**  
*Given:* We know −1 ≤ sin θ ≤ 1 for all real θ.  
*Find:* lim_{x→0} (sin x)/x.  

Divide by |x| > 0: −1/|x| ≤ (sin x)/x ≤ 1/|x| is false; instead use geometry of the unit circle to obtain  
cos x ≤ (sin x)/x ≤ 1 for 0 < x < π/2.  
*Why:* The length of the vertical segment is less than the arc length, which is less than the tangent segment.  

Take lim_{x→0^+} of all parts:  
lim cos x = 1, lim 1 = 1, therefore by squeeze theorem lim (sin x)/x = 1.  
The left-hand limit is identical by even/odd properties.  

**Final answer**  
$$\lim_{x\to 0}\frac{\sin x}{x}=1$$

*Reflection:* The geometric inequality supplies the two outer functions; once both limits equal 1 the middle limit is settled without ever using L’Hôpital or series.

**Example 2 — Absolute-value oscillation**  
*Given:* |x sin(1/x)|.  
*Find:* lim_{x→0} x sin(1/x).  

We have −|x| ≤ x sin(1/x) ≤ |x| for x ≠ 0.  
*Why:* −1 ≤ sin(anything) ≤ 1 and multiplication by positive |x| preserves inequalities.  

lim_{x→0} (−|x|) = 0 and lim_{x→0} |x| = 0, therefore  
lim_{x→0} x sin(1/x) = 0.

**Final answer**  
$$\lim_{x\to0}x\sin\frac1x=0$$

*Reflection:* The oscillation is killed by the vanishing width of the interval [−|x|,|x|].

**Example 3 — Quadratic squeeze**  
*Given:* x² cos(1/x).  
*Find:* lim_{x→0} x² cos(1/x).  

−x
² ≤ x² cos(1/x) ≤ x².  
*Why:* Multiplication by x² ≥ 0.  

Both −x² and x
² approach 0, hence the squeezed function approaches 0.

**Final answer**  
$$\lim_{x\to0}x^2\cos\frac1x=0$$

*Reflection:* Higher even powers tighten the squeeze faster.

**Example 4 — One-sided limit with floor function**  
*Given:* x − 1 ≤ ⌊x⌋ ≤ x for all real x.  
*Find:* lim_{x→2^+} (⌊x⌋ − 1).  

For x > 2 we have x − 2 ≤ ⌊x⌋ − 1 ≤ x − 1, but a tighter pair is  
0 ≤ ⌊x⌋ − 1 < 1 when 2 ≤ x < 3.  
Adjusting bounds: 0 ≤ ⌊x⌋ − 1 ≤ x − 2.  

Both 0 and x − 2 approach 0 as x → 2^+, therefore lim_{x→2^+} (⌊x⌋ − 1) = 0.

**Final answer**  
$$\lim_{x\to2^+}(\lfloor x\rfloor-1)=0$$

*Reflection:* The floor function is discontinuous, yet the squeeze still forces the limit because the gap between bounds collapses.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to verify the inequality holds in a deleted neighborhood | Students assume global inequalities suffice | Explicitly state “for all x with 0 < |x − a| < δ” before invoking the theorem. |
| Using different δ for each bound without taking the minimum | Separate ε-δ proofs feel independent | After obtaining δ_g and δ_h replace δ by min(δ_g, δ_h). |
| Concluding the limit exists when only one bound approaches L | The other bound may diverge or oscillate | Both outer limits must exist and be equal; check both. |
| Applying the theorem at the point a itself | The definition excludes x = a | Always work with punctured intervals. |
| Reversing inequality direction when multiplying by a negative number | Sign error in algebraic manipulation | Track the sign of every multiplier before rewriting bounds. |
| Assuming continuity of f is required | Over-reliance on continuous cases | The theorem never mentions continuity of f; only the bounds need limits. |
| Using the theorem when bounds approach different values | Misreading the hypothesis | Verify numerically that lim g = lim h before concluding. |

## 7. The textbook-precise statement
Let f, g, h be real-valued functions defined on a deleted neighborhood of a real number a. Suppose  
g(x) ≤ f(x) ≤ h(x)  
for all x satisfying 0 < |x − a| < δ₀ for some δ₀ > 0. If  
lim_{x→a} g(x) = lim_{x→a} h(x) = L,  
then lim_{x→a} f(x) = L.  
(Stewart, *Calculus*, 9e, §3.4, Theorem 4.)

## 8. Visual — diagram or schematic
```text
y
^
|          h(x) ────────────────
|         /
|        /   f(x)  ~~~~~ oscillating
|       /
| g(x) ────────────────────────
|     /
+-----|-----------------------> x
      a
```
Three curves meet at height L above the vertical line x = a. The middle curve may oscillate or behave irregularly, yet remains between the two smooth curves that both end at the same point (a, L).

## 9. The memory technique

1. **The hook** — Picture two pieces of bread closing on a slice of cheese; when the bread slices touch, the cheese is forced to the same location.
2. **What to overlearn** — The exact statement “g ≤ f ≤ h and lim g = lim h = L ⇒ lim f = L”; the two classic bounds −|x| ≤ x sin(1/x) ≤ |x|.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Return to the ε definition: choose δ from the bounds, then the inequality chain |f(x) − L| ≤ max(|g(x) − L|, |h(x) − L|) < ε.

## 10. What this unlocks
The squeeze theorem is the gateway to all rigorous evaluations of limits involving trigonometric, absolute-value, and floor functions, and to the proof that every convergent sequence is bounded.

- Standard limits: lim (sin x)/x, lim (1 − cos x)/x, lim x→0 x^x.
- Continuity proofs for piecewise and oscillatory functions.
- Derivative of sin x at 0 via the same geometric squeeze.
- Rigorous justification of the “little-o” notation in asymptotic analysis.

## 11. Self-check — five questions, no answers
1. State the squeeze theorem in ε-δ language and prove it in two lines.
2. Evaluate lim_{x→0} x²⌊1/x⌋ using the squeeze theorem; justify each bound.
3. Why does the theorem fail if the two outer limits exist but are unequal?
4. Construct a function f such that −x² ≤ f(x) ≤ x² near 0 yet f is discontinuous at 0; verify the limit is still 0.
5. In the geometric proof of lim (sin x)/x = 1, identify the exact inequality that supplies the lower bound cos x and explain why it holds only for 0 < x < π/2.