## What it is
The Laplace Transform is an integral transform that converts a function of a real variable $t$ (often time) to a function of a complex variable $s$ (complex frequency). Proving the transforms of standard functions means rigorously deriving these new functions in the $s$-domain by applying the definition of the transform, which is an improper integral. We are building the foundational entries of a "dictionary" that translates between the time domain and the frequency domain.

## Why it matters
This "dictionary" is the heart of using Laplace transforms to solve linear ordinary differential equations (ODEs). It turns calculus operations (differentiation and integration in the $t$-domain) into algebraic operations (multiplication and division by $s$ in the $s$-domain). This is the standard method for analyzing linear time-invariant systems in control theory for aircraft and spacecraft, designing electrical circuits, and processing signals.

## When to study it
Before tackling these proofs, you must be proficient with:
1.  **Improper Integrals:** Specifically, evaluating integrals of the form $\int_0^\infty g(t) \, dt$.
2.  **Integration by Parts:** You should be able to apply $\int u \, dv = uv - \int v \, du$ fluently.
3.  **Euler's Formula:** A solid understanding of $e^{i\theta} = \cos(\theta) + i\sin(\theta)$ is essential for the elegant proofs of sine and cosine transforms.
4.  **Complex Variables:** Basic arithmetic with complex numbers and understanding the condition for convergence, $\text{Re}(s) > a$.

If you are not confident in these, pause and review them. The derivations will be opaque otherwise.

## How to study it (step by step)
1.  **Memorize the Definition:** Write down the definition $\mathcal{L}\{f(t)\} = F(s) = \int_0^\infty e^{-st} f(t) \, dt$ ten times. This is your fundamental tool; everything flows from it.
2.  **Derive the Simplest Case:** Prove that $\mathcal{L}\{1\} = \frac{1}{s}$. Pay close attention to the evaluation of the improper integral and the condition required for convergence ($\text{Re}(s) > 0$).
3.  **Derive the Master Function:** Prove that $\mathcal{L}\{e^{at}\} = \frac{1}{s-a}$. This is the most important transform. Notice how the previous case is just a special instance where $a=0$. State the condition for convergence: $\text{Re}(s) > \text{Re}(a)$.
4.  **Use Euler's Formula:** Combine the result for $\mathcal{L}\{e^{at}\}$ with Euler's formula. Let $a = ib$. Find $\mathcal{L}\{e^{ibt}\} = \frac{1}{s-ib}$. Now, use the fact that $\mathcal{L}\{\cos(bt) + i\sin(bt)\} = \mathcal{L}\{\cos(bt)\} + i\mathcal{L}\{\sin(bt)\}$ to extract the transforms for $\cos(bt)$ and $\sin(bt)$ by equating the real and imaginary parts.
5.  **Practice with Integration by Parts:** Derive $\mathcal{L}\{t\}$. Apply integration by parts to the defining integral, letting $u=t$ and $dv=e^{-st}dt$.
6.  **Generalize with Induction (Optional but Recommended):** Use the result from step 5 to derive $\mathcal{L}\{t^2\}$. See the pattern and form a hypothesis for $\mathcal{L}\{t^n\}$. Prove it by induction using integration by parts.

## Key ideas, with intuition
1.  **The Transform as a "Probe":** The integral $\int_0^\infty e^{-st} f(t) \, dt$ can be thought of as "probing" the function $f(t)$ with a family of decaying exponentials $e^{-st}$. The value of $F(s)$ tells you "how much" of the specific decay/oscillation pattern $e^{-st}$ is present in $f(t)$.
2.  **Convergence is Key:** The term $e^{-st}$ must decay to zero faster than $f(t)$ grows for the integral to converge. If $f(t) = e^{at}$, we need the real part of $s$ to be greater than $a$ to ensure the product $e^{-st}e^{at} = e^{-(s-a)t}$ decays. This gives the "Region of Convergence" (ROC).
    $$ \lim_{t \to \infty} e^{-(s-a)t} \to 0 \quad \iff \quad \text{Re}(s-a) > 0 \quad \iff \quad \text{Re}(s) > \text{Re}(a) $$
3.  **Euler's Formula is a Shortcut:** Proving the transforms for sine and cosine using integration by parts is tedious and requires doing it twice. Recognizing that sine and cosine are just the components of a complex exponential ($e^{i\omega t}$) allows you to do one, much simpler, transform and then just extract the real and imaginary parts. This is a recurring theme in physics and engineering: complex exponentials are often easier to manipulate than sines and cosines.

## Worked example
**Derive the Laplace Transform of $f(t) = \cos(bt)$.**

We will use the most efficient method, leveraging Euler's formula.

1.  **State the Goal:** We want to compute $\mathcal{L}\{\cos(bt)\} = \int_0^\infty e^{-st} \cos(bt) \, dt$.

2.  **Relate to Complex Exponentials:** Recall Euler's formula, $e^{ibt} = \cos(bt) + i\sin(bt)$. From this, we see that $\cos(bt) = \text{Re}(e^{ibt})$.

3.  **Use Linearity:** The Laplace transform is a linear operator, which means the transform of the real part is the real part of the transform.
    $$ \mathcal{L}\{\cos(bt)\} = \mathcal{L}\{\text{Re}(e^{ibt})\} = \text{Re}(\mathcal{L}\{e^{ibt}\}) $$

4.  **Transform the Exponential:** We already know the transform for an exponential function $\mathcal{L}\{e^{at}\} = \frac{1}{s-a}$. We apply this with $a = ib$.
    $$ \mathcal{L}\{e^{ibt}\} = \frac{1}{s-ib} $$
    This is valid for $\text{Re}(s) > \text{Re}(ib)$, which simplifies to $\text{Re}(s) > 0$.

5.  **Extract the Real Part:** To find the real part of the complex fraction, we multiply the numerator and denominator by the complex conjugate of the denominator.
    $$ \frac{1}{s-ib} = \frac{1}{s-ib} \cdot \frac{s+ib}{s+ib} = \frac{s+ib}{s^2 - (ib)^2} = \frac{s+ib}{s^2 - i^2b^2} = \frac{s+ib}{s^2+b^2} $$
    This can be split into its real and imaginary parts:
    $$ \frac{s}{s^2+b^2} + i \frac{b}{s^2+b^2} $$

6.  **State the Final Result:** The real part is our answer.
    $$ \mathcal{L}\{\cos(bt)\} = \text{Re}\left(\frac{s+ib}{s^2+b^2}\right) = \frac{s}{s^2+b^2} $$

**Reflection:** This method is powerful because it avoids a messy double integration by parts. By stepping into the complex plane (Step 2), we solved a simpler problem (Step 4) and then projected the result back to the real axis (Step 5) to get our answer. As a bonus, we also found $\mathcal{L}\{\sin(bt)\} = \frac{b}{s^2+b^2}$ from the imaginary part for free.

## Diagrams
This diagram shows the core concept of the Laplace Transform: mapping a function from the time domain ($t$-domain) to the complex frequency domain ($s$-domain).

```text
       t-domain                               s-domain
 (Functions of time, t>=0)             (Functions of complex freq, s)
+-------------------------+             +---------------------------+
|                         |             |                           |
|      f(t) = cos(bt)     | --L{f(t)}-> |    F(s) = s / (s^2 + b^2)   |
|                         |             |                           |
|       (Calculus)        |             |        (Algebra)          |
|   d/dt, integral dt     |             |      *s, /s               |
+-------------------------+             +---------------------------+
```
This diagram illustrates the weighting function $e^{-st}$ for a real, positive $s$. It's this decaying exponential that multiplies $f(t)$ before integration, ensuring the integral converges for well-behaved functions.

```text
        ^ e^{-st}
        |
      1 +-------------------
        | \
        |  \
        |   \
        |    \
        |     \
        |______\____________> t
        0      (decay rate depends on s)
```

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Think of the Laplace Transform as a machine that "flattens" functions. Its favorite food is exponentials. When it sees $f(t) = e^{at}$, it easily processes it into the simple fraction $\frac{1}{s-a}$. For everything else, it tries to see the exponential inside. For $\cos(bt)$, it sees the "shadow" (real part) of the spinning complex exponential $e^{ibt}$ and processes that. The `s` in co`s`ine reminds you that the `s` goes in the numerator for the cosine transform: $\frac{\textbf{s}}{s^2+b^2}$.

2.  **Must-Memorize Formulas:**
    *   **The Definition:** $\mathcal{L}\{f(t)\} = F(s) = \int_0^\infty e^{-st} f(t) \, dt$
    *   **The Master Exponential:** $\mathcal{L}\{e^{at}\} = \frac{1}{s-a}$
    *   **The Sinusoids:** $\mathcal{L}\{\cos(bt)\} = \frac{s}{s^2+b^2}$ and $\mathcal{L}\{\sin(bt)\} = \frac{b}{s^2+b^2}$

3.  **Spaced Repetition Schedule:**
    *   Day 1: Re-derive all three transforms from the definition.
    *   Day 3: Re-derive the transform for $\cos(bt)$ and $\sin(bt)$ from $\mathcal{L}\{e^{at}\}$ and Euler's formula.
    *   Day 7: Write the formulas from memory, then check. Re-derive any you missed.
    *   Day 16: Re-derive $\mathcal{L}\{t^2\}$ from first principles.
    *   Day 35: Re-derive all of them again.

4.  **First Principles Pathway:** If you forget everything, you only need to remember the definition: $\int_0^\infty e^{-st} f(t) \, dt$.
    *   Forgot $\mathcal{L}\{e^{at}\}$? Integrate $\int_0^\infty e^{-st} e^{at} \, dt = \int_0^\infty e^{-(s-a)t} \, dt$.
    *   Forgot $\mathcal{L}\{\cos(bt)\}$? You can either do the brutal double integration by parts on $\int_0^\infty e^{-st} \cos(bt) \, dt$, or you can remember that $\cos(bt) = \text{Re}(e^{ibt})$ and use the exponential rule. The second way is better.

## Common mistakes
1.  **Forgetting the Region of Convergence (ROC):** Stating $\mathcal{L}\{e^{2t}\} = \frac{1}{s-2}$ is incomplete. The correct statement is $\mathcal{L}\{e^{2t}\} = \frac{1}{s-2}$ for $\text{Re}(s) > 2$. Without this condition, the defining integral diverges.
2.  **Mixing up Sine and Cosine Numerators:** A classic error is to write $\frac{b}{s^2+b^2}$ for cosine. Remember: `s` is for co`s`ine. The other one gets the constant, $b$.
3.  **Sign Errors in Integration:** When evaluating the integral of an exponential, e.g., $\int e^{-(s-a)t} dt$, the result is $\frac{-1}{s-a}e^{-(s-a)t}$. Forgetting the negative sign from the chain rule is a frequent source of error.
4.  **Treating $s$ as the integration variable:** The integral is with respect to $t$. The variable $s$ is treated as a constant during the integration. The limits of integration for $t$ are $0$ and $\infty$; once evaluated, the variable $t$ vanishes completely, leaving a function of only $s$.

## Self-check
1.  From the definition, derive the Laplace transform of a constant function, $f(t) = c$. What is the region of convergence?
2.  Using integration by parts, derive the Laplace transform of the ramp function, $f(t) = t$.
3.  Using the definition of the hyperbolic cosine, $\cosh(at) = \frac{e^{at} + e^{-at}}{2}$, and the linearity of the Laplace transform, derive $\mathcal{L}\{\cosh(at)\}$ without performing any new integrations.