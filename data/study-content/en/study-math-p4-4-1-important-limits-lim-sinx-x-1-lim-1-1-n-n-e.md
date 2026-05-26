## 1. The one-sentence answer
**These two limits are the precise statements that the derivative of sine at zero equals one and that the exponential function grows at a rate exactly equal to its own value.**

The first limit concerns the ratio of sine to its argument. When the argument is measured in radians and approaches zero, the ratio settles at exactly 1. This occurs because, on the unit circle, the vertical rise of the sine curve matches the arc length for an infinitesimally small central angle.

The second limit concerns repeated multiplication by a factor that shrinks toward 1 while the number of factors grows without bound. The product converges to the number called *e*. This number is the unique base for which the exponential function equals its own derivative.

> [!NOTE]
> Both limits are not arbitrary constants; each encodes the instantaneous rate of change of its parent function at a single point, and every subsequent derivative rule for sine, cosine, and the exponential family flows from them.

## 2. Why this matters — concrete and current
In single-slit laser diffraction experiments performed at facilities such as SLAC, the intensity pattern on the detector is governed by the squared sinc function whose central lobe width is fixed by \(\lim_{x\to 0}\frac{\sin x}{x}=1\); engineers use this exact limit to calibrate pixel spacing to sub-micron precision.

Spacecraft attitude control at NASA’s Jet Propulsion Laboratory models small-angle rotations of reaction wheels with the linear approximation \(\sin\theta\approx\theta\), which rests on the same limit; without it, accumulated pointing error exceeds the 0.001° tolerance required for deep-space imaging.

Continuous-compounding interest calculations inside the Bloomberg terminal rely on the definition \(e=\lim_{n\to\infty}(1+1/n)^n\); every overnight swap contract priced on the platform therefore embeds this limit to convert quoted rates into instantaneous forward curves.

In transformer language models at OpenAI, the softmax operation normalizes logits via the exponential function whose derivative identity again traces back to the same limit for \(e\); gradient magnitudes during training remain stable only because this limit supplies the exact scaling factor.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definition of limit      | Both results are statements about the value a function approaches under a specific constraint. |
| Radian measure of angle  | The equality \(\lim\frac{\sin x}{x}=1\) holds only when \(x\) is in radians. |
| Sequence versus function | The expression \((1+1/n)^n\) is a sequence indexed by integers; its limit must be compared with the continuous exponential. |
| Standard limit laws      | Algebraic combinations of the two core limits appear in later derivative proofs. |

## 4. Building the idea — from intuition to formalism

### Step 1 — The unit-circle squeeze
On the unit circle the length of the vertical chord is always shorter than the arc length, which is shorter than the tangent segment.  
For a central angle \(x\) (radians) the inequalities \(\sin x < x < \tan x\) hold for \(0<x<\pi/2\).  
Dividing by the positive quantity \(\sin x\) and taking reciprocals yields  
\[
\cos x < \frac{\sin x}{x} < 1.
\]
> [!WARNING]
> Replacing radians by degrees destroys the inequalities because the arc length would no longer equal the numerical value of the angle.

### Step 2 — Taking the limit inside the squeeze
As \(x\to 0^+\) both \(\cos x\) and 1 approach 1. By the squeeze theorem,  
\[
\lim_{x\to 0^+}\frac{\sin x}{x}=1.
\]
The same limit from the left follows by even/odd symmetry, giving the two-sided result  
\[
\lim_{x\to 0}\frac{\sin x}{x}=1.
\]

### Step 3 — The compound-interest sequence
Consider the sequence \(a_n=(1+1/n)^n\). For each fixed \(n\), expand the binomial or take the natural logarithm:  
\[
\ln a_n=n\ln(1+1/n).
\]
As \(n\to\infty\), the argument \(1/n\to 0\), so the expression inside resembles the definition of the derivative of \(\ln\) at 1.

### Step 4 — Identifying the derivative of the logarithm
The difference quotient for \(\ln x\) at \(x=1\) is exactly  
\[
\lim_{h\to 0}\frac{\ln(1+h)-\ln 1}{h}=\lim_{h\to 0}\frac{\ln(1+h)}{h}.
\]
Substituting \(h=1/n\) produces  
\[
\lim_{n\to\infty}\ln a_n=1,
\]
hence  
\[
\lim_{n\to\infty}a_n=e^1=e.
\]

### Step 5 — Connecting the two limits through the exponential
Because the derivative of \(e^x\) at zero equals 1, the linear approximation \(e^x\approx 1+x\) for small \(x\) recovers the same numerical value that appears in the compound-interest limit when \(x=1/n\).

### Step 6 — Textbook statements
The two limits therefore stand as  
\[
\lim_{x\to 0}\frac{\sin x}{x}=1,\qquad\lim_{n\to\infty}\Bigl(1+\frac1n\Bigr)^n=e.
\]

## 5. Worked examples — every step shown

**Example 1 — Direct substitution check**  
*Given:* Evaluate \(\lim_{x\to 0}\frac{\sin(3x)}{x}\).  
*Find:* The numerical value of the limit.  
Rewrite the expression:  
\[
\frac{\sin(3x)}{x}=\frac{\sin(3x)}{3x}\cdot 3.
\]
As \(x\to 0\), \(3x\to 0\), so the first factor approaches 1.  
*Why:* The known limit applies after the substitution \(u=3x\).  
Thus the product tends to \(1\cdot 3=3\).  
**3**  

*Reflection:* The constant factor 3 is pulled out by algebraic scaling; the same pattern appears whenever a linear argument is present.

**Example 2 — One-sided sequence limit**  
*Given:* Compute \(\lim_{n\to\infty}(1+2/n)^n\).  
*Find:* The exact limit value.  
Rewrite:  
\[
\Bigl(1+\frac2n\Bigr)^n=\Bigl[\Bigl(1+\frac2n\Bigr)^{n/2}\Bigr]^2.
\]
The inner expression tends to \(e\), therefore the whole limit is \(e^2\).  
*Why:* The substitution \(m=n/2\) converts the exponent exactly into the standard form.  
**\(e^2\)**  

*Reflection:* Recognition of the hidden standard limit inside a power avoids unnecessary logarithm work.

**Example 3 — Derivative of sine at zero**  
*Given:* Use the limit definition to find \((\sin x)'|_{x=0}\).  
*Find:* The derivative value.  
By definition  
\[
(\sin x)'|_{x=0}=\lim_{h\to 0}\frac{\sin h-\sin 0}{h}=\lim_{h\to 0}\frac{\sin h}{h}=1.
\]
*Why:* The subtracted term is zero and the remaining ratio is the fundamental limit.  
**1**  

*Reflection:* This single evaluation supplies the coefficient that propagates through every later derivative of sine and cosine.

**Example 4 — Combined limit**  
*Given:* Evaluate \(\lim_{x\to 0}\frac{e^x-1}{x}\).  
*Find:* The value.  
Rewrite the numerator using the series definition or the known limit for \(e\):  
\[
e^x=\lim_{n\to\infty}\Bigl(1+\frac x n\Bigr)^n,
\]
so the difference quotient becomes the definition of the derivative of the exponential at zero and equals 1.  
*Why:* The compound-interest limit with \(n=1/x\) recovers the same constant.  
**1**  

*Reflection:* The two headline limits are dual statements of the same derivative fact evaluated at different base points.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using degree mode on a calculator | Most calculators default to degrees, breaking the radian identity. | Always set calculator to radians before evaluating trigonometric limits. |
| Writing \(\lim(1+1/n)^n=e^x\)     | Confusing the sequence index with the final exponent. | Keep the exponent exactly \(n\) until the limit is taken. |
| Canceling \(\sin x\) with \(x\) before the limit | Treating the symbols as identical rather than as a ratio. | Retain the fraction until the squeeze or known limit is applied. |
| Interchanging limit and exponent without justification | Assuming continuity of the exponential before it is proved. | First prove the logarithm limit, then exponentiate. |
| Forgetting the two-sided nature for sine | Sine is odd, yet students examine only \(x>0\). | Verify the left-hand limit separately using \(\sin(-x)=-\sin x\). |
| Replacing \(n\) by a real variable too early | The original expression is defined only for integers. | Keep \(n\in\mathbb N\) until the continuous extension is justified. |
| Assuming the limit equals 1 for any base | Generalizing from the special base \(e\). | Distinguish \((1+r/n)^n\to e^r\) from the pure \(e\) case. |

## 7. The textbook-precise statement
Let \(f(x)=\sin x\) (with \(x\) in radians) and let \(a_n=(1+1/n)^n\). Then  
\[
\lim_{x\to 0}\frac{f(x)-f(0)}{x}=1,\qquad\lim_{n\to\infty}a_n=e,
\]
where \(e\) is the unique positive real number satisfying \(\ln e=1\). (See Stewart, *Calculus*, 9e, §3.4, Theorem 5 and §3.7, Example 6.)

## 8. Visual — diagram or schematic
```text
Unit circle, radius 1, angle x (radians) in first quadrant
          B
         /|
        / |  sin x
       /  |
      /   |
     /    |
A---/-----C
 arc x   tangent x
```
- Arc length = \(x\)
- Vertical chord = \(\sin x\)
- Tangent segment = \(\tan x\)
The inequalities \(\sin x < x < \tan x\) become visible; dividing through by \(\sin x\) produces the squeeze that forces the ratio to 1.

## 9. The memory technique
1. **The hook** — Picture a tiny slice of pie on the unit circle: the vertical bite equals the curved crust only in the limit, giving the number 1; the same slice, when repeated forever with shrinking thickness, grows into the smooth exponential curve whose slope is itself.  
2. **What to overlearn** — \(\lim_{x\to0}\frac{\sin x}{x}=1\) and \(\lim_{n\to\infty}(1+1/n)^n=e\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive both limits from the squeeze theorem on the unit circle and from the difference quotient of \(\ln x\) at 1.

## 10. What this unlocks
These two numerical facts become the seed values for the entire theory of differentiation of trigonometric and exponential functions.  
- Chain rule applied to \(\sin u(x)\) and \(e^{u(x)}\)  
- Taylor series expansions centered at zero  
- Differential equations \(y'=y\) and \(y''+y=0\)  
- Fourier analysis and Laplace transforms that rely on the same linear approximations  

## 11. Self-check — five questions, no answers
1. Evaluate \(\lim_{x\to0}\frac{\sin(5x)}{3x}\) without a calculator.  
2. Show that \(\lim_{n\to\infty}(1+3/n)^{2n}=e^6\) using only the standard limit for \(e\).  
3. Why does replacing \(x\) by \(x^\circ\) invalidate the statement \(\lim\frac{\sin x}{x}=1\)?  
4. Use the definition of the derivative to prove that \(\frac{d}{dx}e^x\big|_{x=0}=1\).  
5. Identify the hidden misuse of limits in the false claim that \(\lim_{x\to0}\frac{\sin x}{x}=\frac{\lim\sin x}{\lim x}=0/0\) is indeterminate.