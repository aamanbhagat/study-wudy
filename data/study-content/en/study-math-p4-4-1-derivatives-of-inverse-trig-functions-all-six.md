## 1. The one-sentence answer
**The derivatives of the six inverse trigonometric functions are the algebraic reciprocals of the derivatives of the original trigonometric functions, adjusted by the chain rule and absolute values for domains.**

Each inverse trigonometric function is defined as the inverse relation of a restricted trigonometric function, so its derivative follows from implicit differentiation of the corresponding identity. For example, if \( y = \arcsin x \), then \( \sin y = x \). Differentiating both sides with respect to \( x \) immediately produces \( \cos y \cdot y' = 1 \), and solving for \( y' \) yields \( y' = 1 / \sqrt{1 - x^2} \) after substituting back \( \cos y = \sqrt{1 - \sin^2 y} \). The same pattern, with sign and absolute-value adjustments required by the ranges of the remaining five functions, produces the full set of six formulas.

These six formulas close the elementary differentiation table: every standard function built from polynomials, exponentials, logarithms, trigonometric functions, and their inverses now has an explicit derivative expressed in elementary terms.

> [!NOTE]
> The absolute values in the derivatives of arcsec and arccsc arise because the derivative of the original secant and cosecant can change sign independently of the inverse function’s range; forgetting them is the single most common source of sign errors on exams.

## 2. Why this matters — concrete and current
In orbital mechanics, NASA’s Deep Space Network uses arctangent derivatives to linearize angle-tracking loops when updating spacecraft attitude from radio-signal phase data; the \( 1/(1+x^2) \) term appears directly in the Jacobian of the measurement model.

In semiconductor lithography, ASML’s latest EUV scanners model lens-aberration corrections with arcsec and arccsc derivatives; the \( 1/(|x|\sqrt{x^2-1}) \) factors quantify how small changes in mask angle propagate to wafer overlay error.

Transformer-based language models rely on rotary positional embeddings whose gradients involve arctangent derivatives; the clean algebraic form allows exact back-propagation through the embedding layer without numerical approximation.

In computer-graphics ray-tracing pipelines at NVIDIA, arccos derivatives appear in the analytic derivative of the microfacet normal-distribution function, enabling real-time gradient descent for material-parameter optimization inside shaders.

Fundamental-physics Monte Carlo event generators (e.g., MadGraph) repeatedly differentiate inverse trigonometric functions when computing helicity amplitudes for scattering processes at the LHC; the closed-form derivatives keep the entire computation inside double-precision arithmetic.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Implicit differentiation       | Converts the relation \( \sin y = x \) into an equation for \( dy/dx \) |
| Chain rule                     | Required once the argument of the inverse trig function is composite |
| Domain and range restrictions  | Determines the correct sign when solving for the missing trigonometric function |
| Absolute value in square roots | Appears when \( \sqrt{u^2} = |u| \) is used to recover the original trig function |

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the defining identity
If \( y = \arcsin x \), the definition forces \( \sin y = x \) with \( y \in [-\pi/2,\pi/2] \).  
Concrete example: when \( x = 1/2 \), \( y = \pi/6 \).  
Differentiate both sides:  
\[ \cos y \cdot \frac{dy}{dx} = 1. \]  
> [!WARNING]
> Using the unrestricted sine identity without restricting the range produces an ambiguous sign for \( \cos y \).

### Step 2 — Solve for the derivative
\[ \frac{dy}{dx} = \frac{1}{\cos y}. \]  
Substitute \( \cos y = \sqrt{1 - \sin^2 y} \) using the known range:  
\[ \frac{dy}{dx} = \frac{1}{\sqrt{1 - x^2}}. \]

### Step 3 — Repeat for arccos
Let \( y = \arccos x \), so \( \cos y = x \) with \( y \in [0,\pi] \).  
Differentiating yields \( -\sin y \cdot y' = 1 \).  
Because \( \sin y \ge 0 \) on the range, \( \sin y = \sqrt{1 - x^2} \), hence  
\[ y' = -\frac{1}{\sqrt{1 - x^2}}. \]

### Step 4 — Handle arctan and arccot
Let \( y = \arctan x \), so \( \tan y = x \) with \( y \in (-\pi/2,\pi/2) \).  
Differentiating: \( \sec^2 y \cdot y' = 1 \).  
\( \sec^2 y = 1 + \tan^2 y = 1 + x^2 \), therefore  
\[ y' = \frac{1}{1 + x^2}. \]  
The identical calculation for arccot produces the negative sign because its range forces \( \sec^2 y \) to appear with opposite orientation.

### Step 5 — Introduce arcsec and arccsc
Let \( y = \arcsec x \), so \( \sec y = x \) with \( y \in [0,\pi] \setminus \{\pi/2\} \).  
Differentiating: \( \sec y \tan y \cdot y' = 1 \).  
\( \tan y = \sqrt{\sec^2 y - 1} = \sqrt{x^2 - 1} \), but the absolute value \( |x| \) must be restored because \( \sec y \) and \( x \) may have opposite signs outside the principal branch:  
\[ y' = \frac{1}{|x|\sqrt{x^2 - 1}}. \]  
Arccsc follows with a minus sign.

### Step 6 — Assemble the complete table
The six formulas are now obtained uniformly by implicit differentiation plus range-aware sign choices.

## 5. Worked examples — every step shown

**Example 1 — Basic arcsin**  
*Given:* \( f(x) = \arcsin(3x) \).  
*Find:* \( f'(x) \).  
Differentiate the outer function:  
\[ f'(x) = \frac{1}{\sqrt{1 - (3x)^2}} \cdot 3 \]  
*Why:* chain rule applied to the composite argument.  
Simplify the radicand:  
\[ f'(x) = \frac{3}{\sqrt{1 - 9x^2}}. \]  
**Final answer**  
\[ \frac{3}{\sqrt{1-9x^2}} \]  
*Reflection:* The only algebraic step is clearing the square; the domain restriction \( |3x| < 1 \) is inherited automatically.

**Example 2 — Negative sign with arccos**  
*Given:* \( y = \arccos(e^x) \).  
*Find:* \( dy/dx \).  
Apply the known derivative:  
\[ \frac{dy}{dx} = -\frac{1}{\sqrt{1-(e^x)^2}} \cdot e^x. \]  
*Why:* chain rule multiplies by the inner derivative \( e^x \).  
**Final answer**  
\[ -\frac{e^x}{\sqrt{1-e^{2x}}}. \]  
*Reflection:* The minus sign is mandatory; omitting it is the most frequent error when students memorize only the arcsin formula.

**Example 3 — Arctan of a quotient**  
*Given:* \( f(x) = \arctan(x/(1+x^2)) \).  
*Find:* \( f'(x) \).  
Let \( u = x/(1+x^2) \). Then  
\[ f'(x) = \frac{1}{1+u^2} \cdot u'. \]  
Compute \( u' \) by quotient rule:  
\[ u' = \frac{(1+x^2)-x\cdot 2x}{(1+x^2)^2} = \frac{1-x^2}{(1+x^2)^2}. \]  
Substitute and simplify:  
\[ f'(x) = \frac{(1+x^2)^2}{(1+x^2)^2 + x^2} \cdot \frac{1-x^2}{(1+x^2)^2} = \frac{1-x^2}{1+2x^2+x^4 + x^2}. \]  
**Final answer**  
\[ \frac{1-x^2}{1 + 2x^2 + x^4}. \]  
*Reflection:* The numerator \( 1-x^2 \) is the derivative of the argument; recognizing this pattern accelerates later problems.

**Example 4 — Arcsec with absolute value**  
*Given:* \( y = \arcsec(2x) \), \( x > 1/2 \).  
*Find:* \( dy/dx \).  
\[ \frac{dy}{dx} = \frac{1}{|2x|\sqrt{(2x)^2-1}} \cdot 2. \]  
Because \( x > 1/2 \), \( |2x| = 2x \).  
**Final answer**  
\[ \frac{1}{x\sqrt{4x^2-1}}. \]  
*Reflection:* The absolute value disappears only after the domain statement is used; without the domain the answer would be incorrect for \( x < -1/2 \).

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting the minus sign for arccos/arccot | Students memorize only the positive arcsin/arctan forms | Write the full six-line table once and keep it visible while solving |
| Dropping the absolute value in arcsec/arccsc | Treating \( \sqrt{x^2-1} \) as always positive without checking the sign of \( x \) | Insert \( |x| \) explicitly before substituting numerical values |
| Domain violation when simplifying radicals | Canceling factors that are zero at the boundary of the domain | State the open interval on which the derivative is valid before algebraic simplification |
| Confusing arccot with arctan signs | Both involve \( 1+x^2 \) in the denominator | Remember arccot range \( (0,\pi) \) forces the negative sign |
| Chain-rule order errors with composite arguments | Placing the inner derivative outside the radical | Always apply the outer derivative first, then multiply by the inner derivative |
| Using degrees instead of radians | Calculator in degree mode produces numerical mismatch | All calculus formulas assume radians; set calculator to radians before checking |
| Sign error after implicit differentiation of sec y | Forgetting that tan y can be negative while sec y is positive | Recompute tan y from the range of arcsec on each interval separately |

## 7. The textbook-precise statement
Let \( f \) be one of the six inverse trigonometric functions with its standard range. Then \( f \) is differentiable on the interior of its domain, and the derivative is given by the corresponding formula below (Stewart, *Calculus*, 9e, §3.4, Theorem 5):

\[
\begin{align*}
\frac{d}{dx}\arcsin x &= \frac{1}{\sqrt{1-x^2}}, & |x|<1, \\
\frac{d}{dx}\arccos x &= -\frac{1}{\sqrt{1-x^2}}, & |x|<1, \\
\frac{d}{dx}\arctan x &= \frac{1}{1+x^2}, & x\in\mathbb{R}, \\
\frac{d}{dx}\arccot x &= -\frac{1}{1+x^2}, & x\in\mathbb{R}, \\
\frac{d}{dx}\arcsec x &= \frac{1}{|x|\sqrt{x^2-1}}, & |x|>1, \\
\frac{d}{dx}\arccsc x &= -\frac{1}{|x|\sqrt{x^2-1}}, & |x|>1.
\end{align*}
\]

## 8. Visual — diagram or schematic
```text
y
↑
|          arcsin branch
|   \     /
|    \   /
|     \ /
|------*------→ x
|     / \
|    /   \
|   /     \
|  arccos branch (negative slope)
|
```
Horizontal axis labeled \( x \in (-1,1) \); vertical axis \( y \). The arcsin curve rises from \( ( -1, -\pi/2) \) to \( (1, \pi/2) \) with vertical tangents at the endpoints. The arccos curve falls from \( (-1, \pi) \) to \( (1, 0) \) with the same vertical tangents but opposite monotonicity. Slope magnitudes are identical at every interior point.

## 9. The memory technique

1. **The hook**  
   Picture six archers standing on the unit circle; each shoots an arrow whose slope is the reciprocal of the original trig derivative, with a minus sign if the archer faces “downhill” (arccos, arccot, arccsc).

2. **What to overlearn**  
   - Arcsin and arctan positive formulas.  
   - The three minus signs for the “co-” functions.  
   - The factor \( |x| \) only for arcsec/arccsc.

3. **Spaced-repetition schedule**  
   Review the six formulas at 1 day, 3 days, 7 days, 16 days, and 35 days after first mastery.

4. **First-principles fallback**  
   Return to the defining identity, differentiate implicitly, and restore the correct sign from the known range of each inverse function.

## 10. What this unlocks
Mastery of these six derivatives completes the elementary differentiation catalogue and immediately enables logarithmic differentiation of inverse trig compositions, implicit differentiation in related-rates problems, and the formation of the inverse-function theorem for \( C^1 \) maps.

- Linear approximations and Newton’s method applied to inverse trig equations  
- Integration techniques that reverse these derivatives (e.g., trig substitution)  
- Multivariable gradients involving spherical and cylindrical coordinates  
- Automatic-differentiation rules inside machine-learning frameworks

## 11. Self-check — five questions, no answers
1. Compute the derivative of \( \arcsin(\sqrt{1-x^2}) \) and state its domain.  
2. Show that the derivative of \( \arctan x + \arctan(1/x) \) is identically zero for \( x > 0 \); explain the constant value.  
3. Differentiate \( y = x \arcsec x \) and simplify.  
4. A student claims \( \frac{d}{dx}\arccsc x = \frac{d}{dx}\arcsec x \). Under what conditions, if any, is the claim true?  
5. Find the second derivative of \( \arctan(e^x) \) and determine its sign for all real \( x \).