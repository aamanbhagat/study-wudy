## What it is
Trigonometric integration is a collection of techniques for finding the antiderivative of functions involving products and powers of $\sin(x)$, $\cos(x)$, $\tan(x)$, and $\sec(x)$. The core strategy is to use trigonometric identities to manipulate the integrand into a form that can be solved using a simple substitution. This isn't one single formula, but a decision tree based on the powers of the functions involved.

## Why it matters
These integrals are fundamental in Fourier analysis, which decomposes complex waveforms (like audio signals, or quantum wavefunctions) into a sum of simple sines and cosines. In aerospace, solving differential equations for orbital mechanics or satellite attitude dynamics often involves these forms. They also appear when calculating physical quantities like the work done by a non-constant force or the electric field of a charged rod.

## When to study it
You must be proficient with basic integration techniques, especially the power rule and **u-substitution**. You also need immediate recall of the derivatives of all six trigonometric functions. Critically, you must have the following trigonometric identities memorized cold:
- Pythagorean identities: $\sin^2(x) + \cos^2(x) = 1$ and $1 + \tan^2(x) = \sec^2(x)$.
- Half-angle identities: $\sin^2(x) = \frac{1 - \cos(2x)}{2}$ and $\cos^2(x) = \frac{1 + \cos(2x)}{2}$.
If these are not second nature, pause and review them now. Proceeding without them is inefficient.

## How to study it (step by step)
1.  **Master the Primitives.** Write down the derivatives of $\sin(x)$, $\cos(x)$, $\tan(x)$, $\sec(x)$ and the integrals of $\sin(x)$, $\cos(x)$, $\sec^2(x)$, $\sec(x)\tan(x)$, $\tan(x)$, and $\sec(x)$. Verify them from first principles. This takes 20 minutes and is non-negotiable.
2.  **Solve the "Odd Power Out" Case.** Work through five examples of $\int \sin^m(x) \cos^n(x) \, dx$ where at least one of $m$ or $n$ is odd. Focus on the pattern: save one factor from the odd power to be part of $du$, convert the remaining even power using $\sin^2(x) + \cos^2(x) = 1$, and perform a u-substitution.
3.  **Solve the "Both Even Powers" Case.** Work through three examples where both $m$ and $n$ are even. Use the half-angle identities to reduce the powers. Notice how this transforms the problem from high powers to multiple angles.
4.  **Solve the Tangent/Secant Cases.** The logic is parallel to sin/cos. Work through three examples of $\int \tan^m(x) \sec^n(x) \, dx$ where $n$ is even. Save a $\sec^2(x)$ factor for $du$ with $u=\tan(x)$.
5.  **Solve the Other Tangent/Secant Case.** Work through three examples where $m$ is odd and $n \ge 1$. Save a $\sec(x)\tan(x)$ factor for $du$ with $u=\sec(x)$.
6.  **Synthesize.** Create a one-page flowchart or decision tree for yourself that asks questions like "Is the power of sine odd?" and directs you to the correct strategy. Test it on a mixed set of problems.

## Key ideas, with intuition
1.  **The Goal: A Simple u-Substitution.** All these techniques are designed to transform a complicated integrand like $\sin^5(x)\cos^2(x)$ into a simple polynomial in $u$, like $\int (1-u^2)^2 u^2 (-du)$. The trigonometric identities are the tools for this transformation. The core question is always: "What can I choose for $u$ so that $du$ is present in the integral?"

2.  **The "Odd Man Out" Strategy.** This is the primary strategy for $\int \sin^m(x)\cos^n(x)\,dx$. If a power is odd, you can "peel off" one factor to serve as your $du$.
    - If the power of $\sin(x)$ is odd (e.g., $\sin^3(x)$), write it as $\sin^2(x) \cdot \sin(x)$. The lone $\sin(x)$ is saved for $du$. The remaining $\sin^2(x)$ can be converted to $1-\cos^2(x)$. Now everything is in terms of $\cos(x)$, so you can set $u=\cos(x)$ and $du = -\sin(x)\,dx$.
    $$ \int \sin^3(x) \, dx = \int \sin^2(x) \cdot \sin(x) \, dx = \int (1-\cos^2(x)) \sin(x) \, dx $$

3.  **The "Power Reduction" Strategy.** If both powers of $\sin(x)$ and $\cos(x)$ are even, the "Odd Man Out" strategy fails because you can't isolate a single factor for $du$ without leaving a fractional power. The fallback is to reduce the powers using the half-angle identities. This lowers the degree of the integrand at the cost of introducing a multiple angle, which is a worthwhile trade.
    $$ \int \cos^4(x) \, dx = \int (\cos^2(x))^2 \, dx = \int \left(\frac{1+\cos(2x)}{2}\right)^2 \, dx $$

4.  **The Tangent-Secant Partnership.** The derivatives link these two functions: $\frac{d}{dx}\tan(x) = \sec^2(x)$ and $\frac{d}{dx}\sec(x) = \sec(x)\tan(x)$. This dictates the strategy for $\int \tan^m(x)\sec^n(x)\,dx$.
    - If the power of $\sec(x)$ is even, save a $\sec^2(x)$ factor. Let $u=\tan(x)$, so $du = \sec^2(x)\,dx$. Convert remaining secants to tangents using $\sec^2(x) = 1+\tan^2(x)$.
    - If the power of $\tan(x)$ is odd (and you have at least one secant), save a $\sec(x)\tan(x)$ factor. Let $u=\sec(x)$, so $du=\sec(x)\tan(x)\,dx$. Convert remaining tangents to secants.

## Worked example
Evaluate $\int \sin^3(x) \cos^4(x) \, dx$.

**Step 1: Analyze the powers.**
The power of sine is $m=3$ (odd). The power of cosine is $n=4$ (even). Since there is an odd power, we will use the "Odd Man Out" strategy. The odd power is on sine, so we will save a $\sin(x)$ factor. This means our substitution will be $u = \cos(x)$.

**Step 2: Isolate the factor for $du$.**
Rewrite $\sin^3(x)$ as $\sin^2(x) \sin(x)$.
$$ \int \sin^3(x) \cos^4(x) \, dx = \int \sin^2(x) \sin(x) \cos^4(x) \, dx $$
Rearrange to group the future $u$ and $du$ terms.
$$ \int \sin^2(x) \cos^4(x) \sin(x) \, dx $$

**Step 3: Convert the remaining terms to the substitution variable.**
Our substitution will be $u = \cos(x)$. We need to convert the remaining $\sin^2(x)$ into cosines. Use the identity $\sin^2(x) = 1 - \cos^2(x)$.
$$ \int (1 - \cos^2(x)) \cos^4(x) \sin(x) \, dx $$

**Step 4: Perform the u-substitution.**
Let $u = \cos(x)$. Then $du = -\sin(x) \, dx$, which means $\sin(x) \, dx = -du$.
Substitute $u$ and $du$ into the integral.
$$ \int (1 - u^2) u^4 (-du) $$

**Step 5: Solve the resulting polynomial integral.**
$$ - \int (u^4 - u^6) \, du = - \left( \frac{u^5}{5} - \frac{u^7}{7} \right) + C = \frac{u^7}{7} - \frac{u^5}{5} + C $$

**Step 6: Substitute back to the original variable.**
Replace $u$ with $\cos(x)$.
$$ \frac{\cos^7(x)}{7} - \frac{\cos^5(x)}{5} + C $$

**Reflection:** The strategy worked because the odd power of sine provided the $\sin(x)$ needed for the $du$ of $u=\cos(x)$. The remaining even power of sine, $\sin^2(x)$, was easily converted to cosines using the fundamental Pythagorean identity. This transformed a complex trigonometric integral into a simple polynomial integral.

## Diagrams
Here is an ASCII diagram illustrating the "Odd Man Out" strategy for $\int \sin^3(x) \cos^4(x) \, dx$.

```text
Integrand: sin³(x)cos⁴(x)
              |
              V
Identify odd power: sin³(x)
              |
              V
"Peel off" one factor for du:
  sin²(x) cos⁴(x)   <-->   sin(x)
       |                       |
       V                       V
Convert to target 'u'      This becomes part of du
(u = cos(x))                   (du = -sin(x)dx)
       |
       V
(1 - cos²(x)) cos⁴(x)
       |
       V
Substitute u = cos(x):
  (1 - u²) u⁴           <-->   (-du)
       |
       V
Integrate polynomial: -∫(u⁴ - u⁶)du
```

## Memory technique — remember this forever
1.  **The Mnemonic:**
    - For $\sin/\cos$: "**Odd Man Out, Even Power Down.**" If an odd power exists, isolate one factor for $du$. If both are even, power down with half-angle formulas.
    - For $\tan/\sec$: "**Even Secant, Save a Square. Odd Tangent, Save a Pair.**" If secant power is even, save $\sec^2(x)$ for $du$. If tangent power is odd, save $\sec(x)\tan(x)$ (a pair) for $du$.

2.  **Formulas to Overlearn:**
    - $\sin^2(x) + \cos^2(x) = 1$
    - $1 + \tan^2(x) = \sec^2(x)$
    - $\cos^2(x) = \frac{1 + \cos(2x)}{2}$
    - $\sin^2(x) = \frac{1 - \cos(2x)}{2}$

3.  **Spaced Repetition Schedule:**
    Do a mixed set of 5 problems on these days: Day 1, Day 3, Day 7, Day 16, Day 35.

4.  **First Principles Pathway:**
    If you forget everything, rebuild from the definitions on a unit circle. A point $(x,y)$ on the circle is $(\cos\theta, \sin\theta)$. The Pythagorean theorem $x^2+y^2=1$ immediately gives $\cos^2\theta + \sin^2\theta = 1$. Divide by $\cos^2\theta$ to get $1+\tan^2\theta=\sec^2\theta$. The double angle formula $\cos(2\theta) = \cos^2\theta - \sin^2\theta$ can be rearranged to give the half-angle identities. The entire strategy can be reverse-engineered from these three identities and the derivatives of the trig functions.

## Common mistakes
1.  **Sign Errors in Substitution:** When setting $u = \cos(x)$, remember that $du = -\sin(x) \, dx$. Forgetting this negative sign is a frequent and costly error.
2.  **Identity Mix-ups:** Using $\sin^2(x) = 1 + \cos^2(x)$ instead of $1 - \cos^2(x)$. Write the identity down on your paper before you use it.
3.  **Applying the Wrong Strategy:** Trying to use the "Odd Man Out" strategy when both powers are even. This will leave you with a square root (e.g., $\sqrt{1-u^2}$) that you can't easily integrate. If both powers are even, you *must* use the power-reduction/half-angle formulas.
4.  **Forgetting $+C$:** The integral is an antiderivative, a family of functions. Always add the constant of integration.

## Self-check
Solve these without looking at your notes.
1.  $\int \sin(x) \cos^4(x) \, dx$
2.  $\int \tan^5(x) \sec^4(x) \, dx$
3.  $\int \sin^4(x) \, dx$