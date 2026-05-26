## 1. The one-sentence answer
**U-substitution replaces a composite integrand with a simpler variable \(u\) so the integral reduces to a standard form, and for definite integrals the limits must also be rewritten in terms of \(u\) to avoid returning to the original variable.**

When you have an integral whose integrand contains a function and its derivative multiplied together, you introduce \(u\) equal to the inner function. Differentiating both sides gives \(du\) that exactly cancels the extra factor, turning the whole expression into \(\int f(u)\,du\). For definite integrals this substitution must be carried through to the endpoints as well; otherwise the numerical value you obtain is meaningless.

The change-of-limits step is not optional bookkeeping. It encodes the fact that the interval of integration is being measured in the new coordinate \(u\) rather than in \(x\). Once the limits are expressed in \(u\), you evaluate the antiderivative at those new numbers and finish; no back-substitution is required.

> [!NOTE]
> The single deepest insight is that the differential \(du = g'(x)\,dx\) carries the Jacobian of the change of variable, so rewriting the limits is simply applying the same transformation to the boundary points.

## 2. Why this matters — concrete and current
In orbital-mechanics software used by SpaceX, the vis-viva equation is integrated with respect to true anomaly; the substitution \(u = \cos\theta\) converts the integrand into a rational function whose definite limits run from \(-1\) to \(1\), allowing rapid evaluation of \(\Delta v\) budgets inside the flight computer.

Semiconductor-process simulators at TSMC solve diffusion equations of the form \(\int_0^t e^{-E_a/RT(\tau)}\,d\tau\). The substitution \(u = E_a/RT(\tau)\) changes both the integrand and the upper limit that depends on the temperature ramp, producing closed-form expressions that are embedded in the process-control loop.

In reinforcement-learning policy-gradient algorithms the expectation \(\mathbb{E}_{\pi_\theta}[\nabla_\theta\log\pi_\theta(a|s)Q(s,a)]\) is estimated by sampling trajectories. When the policy contains a Gaussian whose variance depends on state, the re-parameterization trick uses a u-substitution that moves the sampling limits into the standard-normal space, exactly the same change-of-limits procedure.

Microwave-filter designers integrate the phase accumulated along a tapered transmission line. The substitution \(u = \beta(z)\) where \(\beta\) is the local propagation constant converts the integral into a simple difference of arctangents evaluated between the cutoff frequencies at the two ends of the taper.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Chain rule               | Produces the factor that becomes \(du\)                   |
| Derivative of standard functions | Identifies which part of the integrand is \(g'(x)\) |
| Definite-integral definition | Supplies the numerical limits that must be transformed |
| Antiderivative uniqueness (up to constant) | Guarantees that evaluating at new limits still gives the correct net area |

If any row is unfamiliar, pause and review that single idea before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Spot the inner function and its derivative
Look at the integrand and ask whether it contains some function \(g(x)\) multiplied by something that is exactly \(g'(x)\) or a constant multiple of it.  
Concrete example: \(\int x^2\sqrt{x^3+1}\,dx\) contains \(g(x)=x^3+1\) and \(g'(x)=3x^2\), which appears (up to the factor 3).  
Formal statement: if the integrand can be written \(f(g(x))g'(x)\), set \(u=g(x)\).  
> [!WARNING] Missing the derivative factor entirely produces an integral that cannot be expressed in elementary functions after substitution.

### Step 2 — Introduce the new variable and differentiate
Write \(u=g(x)\). Differentiate both sides with respect to \(x\): \(\frac{du}{dx}=g'(x)\), hence \(du=g'(x)\,dx\).  
In the example above, \(u=x^3+1\) gives \(du=3x^2\,dx\), so \(x^2\,dx=\frac13 du\).

### Step 3 — Rewrite the indefinite integrand
Substitute into the integral: every occurrence of \(g(x)\) becomes \(u\) and the differential factor becomes \(du\). The integral collapses to a function of \(u\) alone.  
Result: \(\int x^2\sqrt{x^3+1}\,dx=\frac13\int\sqrt{u}\,du\).

### Step 4 — Translate the limits of a definite integral
For \(\int_a^b f(g(x))g'(x)\,dx\), compute the new lower limit \(u_a=g(a)\) and new upper limit \(u_b=g(b)\). The integral becomes \(\int_{u_a}^{u_b}f(u)\,du\).  
Example: \(\int_0^1 x^2\sqrt{x^3+1}\,dx\) has limits \(u(0)=1\) and \(u(1)=2\), so the substituted problem is \(\frac13\int_1^2 u^{1/2}\,du\).

### Step 5 — Integrate with respect to \(u\) and evaluate
Find an antiderivative \(F(u)\) of the new integrand, then compute \(F(u_b)-F(u_a)\). No return to \(x\) is required.  
In the running example the final numerical value is \(\frac13\cdot\frac23[u^{3/2}]_1^2=\frac29(2\sqrt2-1)\).

### Step 6 — Verify by differentiation (optional but rigorous)
Differentiate the obtained antiderivative with respect to \(x\) using the chain rule; the result must recover the original integrand. This step confirms both the substitution and the limit change were performed correctly.

## 5. Worked examples — har step show karo

**Example 1 — Simple power with linear inner function**  
*Given:* \(\int_0^2 2x\sqrt{x^2+1}\,dx\)  
*Find:* exact value of the definite integral.  
Set \(u=x^2+1\). Then \(du=2x\,dx\).  
When \(x=0\), \(u=1\); when \(x=2\), \(u=5\).  
Thus the integral equals \(\int_1^5\sqrt{u}\,du=\frac23[u^{3/2}]_1^5=\frac23(5\sqrt5-1)\).  
*Why each move:* the factor \(2x\,dx\) is exactly \(du\), and the endpoints are obtained by direct substitution into \(u=g(x)\).  
**\(\dfrac{2}{3}(5\sqrt{5}-1)\)**  
*Reflection:* the example is the prototype; once the derivative matches, the rest is mechanical.

**Example 2 — Trigonometric composite**  
*Given:* \(\int_0^{\pi/6}\sin^2\theta\cos\theta\,d\theta\)  
*Find:* value.  
Let \(u=\sin\theta\), \(du=\cos\theta\,d\theta\). Limits: \(\theta=0\) gives \(u=0\); \(\theta=\pi/6\) gives \(u=1/2\).  
Integral becomes \(\int_0^{1/2}u^2\,du=\frac13 u^3\Big|_0^{1/2}=\frac1{24}\).  
*Why:* \(\cos\theta\,d\theta\) is supplied verbatim by \(du\).  
**\(\dfrac{1}{24}\)**  
*Reflection:* trigonometric substitutions often hide inside the differential; always check the derivative of the chosen \(u\).

**Example 3 — Exponential with reciprocal factor**  
*Given:* \(\int_1^e\frac{\ln x}{x}\,dx\)  
*Find:* value.  
Set \(u=\ln x\), \(du=\frac1x\,dx\). Limits become \(u(1)=0\), \(u(e)=1\).  
Integral = \(\int_0^1 u\,du=\frac12 u^2\Big|_0^1=\frac12\).  
*Why:* the factor \(1/x\) is precisely the derivative of \(\ln x\).  
**\(\frac12\)**  
*Reflection:* the original variable disappears completely after the limit change.

**Example 4 — Nested radical requiring two-stage thinking**  
*Given:* \(\int_0^8\frac{x}{\sqrt{1+x}}\,dx\) (first rewrite the integrand)  
*Find:* exact value.  
Rewrite numerator: \(x=(1+x)-1\), so integral splits into \(\int_0^8\sqrt{1+x}\,dx-\int_0^8(1+x)^{-1/2}\,dx\).  
For the first term set \(u=1+x\), \(du=dx\), limits 1 to 9; yields \(\frac23[u^{3/2}]_1^9= \frac23(27-1)\).  
Second term with same \(u\) is \(\int_1^9 u^{-1/2}\,du=2[u^{1/2}]_1^9=2(3-1)\).  
Net result \(\frac23\cdot26-4= \frac{52}3-4= \frac{40}3\).  
*Why:* algebraic rearrangement exposes the derivative hidden inside the square root.  
**\(\dfrac{40}{3}\)**  
*Reflection:* sometimes an algebraic identity must precede the substitution.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to change limits and evaluating the antiderivative at original \(x\) values | Habit from indefinite integrals | Write the new limits immediately after introducing \(u\) |
| Differentiating \(u\) incorrectly (sign error or missing chain-rule factor) | Rushing the derivative step | Always recompute \(du\) in one line before substituting |
| Substituting only inside the integrand but leaving \(dx\) untouched | Treating \(du\) as optional | Replace the entire differential expression at once |
| Using the same letter for both old and new limits | Notation laziness | Adopt explicit symbols \(u_a=g(a)\), \(u_b=g(b)\) |
| Reversing the inequality of limits when \(g'(x)<0\) | Not noticing that \(g\) is decreasing | Check the sign of \(g'(x)\) and swap limits if necessary, adding a minus sign |
| Choosing a \(u\) whose derivative does not appear in the integrand | Pattern-matching without verification | Verify that \(g'(x)\) or a constant multiple is visibly present |
| Back-substituting after a definite-integral substitution | Confusion between indefinite and definite procedures | Stop once the numerical value \(F(u_b)-F(u_a)\) is obtained |

## 7. The textbook-precise statement
Let \(g\) be continuously differentiable on \([a,b]\) and let \(f\) be continuous on the range of \(g\). Then
\[
\int_a^b f(g(x))g'(x)\,dx = \int_{g(a)}^{g(b)} f(u)\,du.
\]
If \(g'(x)<0\) on a subinterval the inequality of limits reverses and a minus sign appears, exactly as in the substitution rule for Riemann integrals. (Stewart, *Calculus*, 9e, §5.5, Theorem 2, p. 392.)

## 8. Visual — diagram or schematic
```text
x-axis:  a -------------------------- b
          |                             |
          g(a)                         g(b)
u-axis:   u_a ------------------------- u_b
          (lower limit)               (upper limit)

Arrow labelled "u = g(x)" maps each x-endpoint to its image;
du = g'(x) dx stretches or compresses the interval length.
```

## 9. The memory technique
1. **The hook** — picture the definite-integral interval as a rubber band labelled with \(x\)-numbers; when you slide it onto the \(u\)-axis the numbers at the two ends must also slide to their new positions.
2. **What to overlearn** — the two-line ritual “\(u=g(x)\), \(du=g'(x)\,dx\)”, followed immediately by “limits become \(g(a)\) and \(g(b)\)”.
3. **Spaced-repetition schedule** — review the ritual after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — return to the definition of the Riemann sum, replace each \(\Delta x_i\) by \(\Delta u_i/g'(x_i)\), and watch the partition transform into the new interval.

## 10. What this unlocks
Mastery of u-substitution with changed limits lets you evaluate large classes of definite integrals that appear in physics and engineering without ever returning to the original variable.

- Trigonometric integrals that reduce to powers of sine or cosine
- Gaussian integrals after completing the square and shifting limits
- Beta and Gamma function identities used in Bayesian statistics
- Arc-length and surface-of-revolution formulas in vector calculus
- Expectation integrals inside machine-learning loss functions

## 11. Self-check — five questions, no answers
1. Evaluate \(\int_0^1\frac{x}{\sqrt{1+x^2}}\,dx\) by substituting \(u=1+x^2\).
2. Without computing the integral, state the new limits when \(\int_2^3\frac{1}{x\ln x}\,dx\) is transformed by \(u=\ln x\).
3. A student obtains \(\frac12 u^2\big|_1^3\) after substituting \(u=x^2\) but forgets to change limits. What numerical error is introduced?
4. Show that if \(g'(x)<0\) the substitution rule acquires a minus sign; give a concrete numerical example.
5. Identify the smallest algebraic change that would make \(\int_0^1 x\sqrt{x^3+1}\,dx\) *not* amenable to a single u-substitution.