## 1. The one-sentence answer
**Product-to-sum formulas rewrite every product of two trigonometric functions as a sum or difference of trigonometric functions.**

These identities arise directly from the angle-addition formulas by algebraic rearrangement. They replace multiplication with addition, which simplifies integration, Fourier analysis, and the solution of trigonometric equations. The four core identities cover all combinations of sine and cosine.

The key insight is that multiplication in the time or angle domain becomes convolution in the frequency domain; these formulas make that translation explicit and elementary.

> [!NOTE]
> The formulas work because addition formulas already encode the product of complex exponentials via Euler’s formula; the real and imaginary parts simply separate into the sine and cosine cases.

## 2. Why this matters — concrete and current
In radar signal processing at Lockheed Martin’s Space Systems, product-to-sum identities convert the product of a transmitted chirp and a received echo into sum and difference frequencies that reveal target range and velocity after low-pass filtering.

In semiconductor test equipment manufactured by Keysight Technologies, these identities allow engineers to predict intermodulation distortion products when two sinusoidal tones drive a nonlinear amplifier, turning a multiplication of voltages into measurable spectral lines at sum and difference frequencies.

NASA’s Deep Space Network uses the identities inside the Fourier-transform pipeline that extracts telemetry from weak spacecraft signals; the conversion from products to sums reduces computational load when correlating received waveforms against known carrier templates.

In quantum-control software developed at Rigetti Computing, product-to-sum expansions simplify the analytic integration of time-dependent Hamiltonians containing products of Pauli operators modulated by sinusoidal drives.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Angle-addition formulas  | Source identities from which all product-to-sum formulas are derived by rearrangement |
| Even/odd properties of sine and cosine | Determines sign changes when arguments are swapped       |
| Linear superposition     | Permits splitting a single sum into separate terms        |

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the known sum-to-product source
The cosine of a sum expands to a product of cosines minus a product of sines.  
Concrete example: \(\cos(75^\circ)=\cos(45^\circ+30^\circ)=\frac{\sqrt{2}}{2}\cdot\frac{\sqrt{3}}{2}-\frac{\sqrt{2}}{2}\cdot\frac{1}{2}\).  
\[
\cos(A+B)=\cos A\cos B-\sin A\sin B
\]
> [!WARNING]
> Reversing the sign here produces the wrong product-to-sum formula later.

### Step 2 — Write the companion difference formula
Replace \(B\) by \(-B\) and use even/odd symmetry.  
\[
\cos(A-B)=\cos A\cos B+\sin A\sin B
\]

### Step 3 — Add the two equations
Adding cancels the sine terms and isolates the product of cosines.  
\[
\cos(A+B)+\cos(A-B)=2\cos A\cos B
\]
\[
\cos A\cos B=\frac{1}{2}[\cos(A+B)+\cos(A-B)]
\]

### Step 4 — Subtract the two equations
Subtracting isolates the product of sines.  
\[
\cos(A-B)-\cos(A+B)=2\sin A\sin B
\]
\[
\sin A\sin B=\frac{1}{2}[\cos(A-B)-\cos(A+B)]
\]

### Step 5 — Repeat the process with sine-addition formulas
Start from \(\sin(A+B)=\sin A\cos B+\cos A\sin B\) and \(\sin(A-B)=\sin A\cos B-\cos A\sin B\). Adding and subtracting yields the mixed-product identities.  
\[
\sin A\cos B=\frac{1}{2}[\sin(A+B)+\sin(A-B)]
\]
\[
\cos A\sin B=\frac{1}{2}[\sin(A+B)-\sin(A-B)]
\]

### Step 6 — Assemble the complete set
All four identities together constitute the product-to-sum formulas; each holds for any real angles \(A\) and \(B\).

## 5. Worked examples — every step shown

**Example 1 — Convert a simple product**  
*Given:* \(\sin 3\theta\cos\theta\)  
*Find:* an equivalent sum.  
Start with the mixed-product identity:  
\[
\sin A\cos B=\frac12[\sin(A+B)+\sin(A-B)]
\]  
*Why:* direct substitution of the formula derived in Step 5.  
Set \(A=3\theta\), \(B=\theta\):  
\[
\sin 3\theta\cos\theta=\frac12[\sin(4\theta)+\sin(2\theta)]
\]  
**Final answer**  
\[
\frac12[\sin(4\theta)+\sin(2\theta)]
\]  
*Reflection:* The only algebraic move was matching arguments; signs remain positive because both sine terms appear with the same sign in the identity.

**Example 2 — Handle a difference of angles**  
*Given:* \(\cos 50^\circ\cos 10^\circ\)  
*Find:* a sum of cosines.  
Apply the cosine-product identity:  
\[
\cos A\cos B=\frac12[\cos(A+B)+\cos(A-B)]
\]  
*Why:* addition of the two cosine-addition expansions isolates the product.  
\[
\cos 50^\circ\cos 10^\circ=\frac12[\cos 60^\circ+\cos 40^\circ]
\]  
**Final answer**  
\[
\frac12(\frac12+\cos 40^\circ)
\]  
*Reflection:* Numerical evaluation of one term is optional; the identity itself is already the required simplification.

**Example 3 — Convert a product that produces a negative sign**  
*Given:* \(\sin 70^\circ\sin 20^\circ\)  
*Find:* an expression without a product.  
Use the sine-product identity:  
\[
\sin A\sin B=\frac12[\cos(A-B)-\cos(A+B)]
\]  
*Why:* subtraction of the cosine-addition formulas produces the minus sign.  
\[
\sin 70^\circ\sin 20^\circ=\frac12[\cos 50^\circ-\cos 90^\circ]
\]  
**Final answer**  
\[
\frac12(\cos 50^\circ-0)=\frac12\cos 50^\circ
\]  
*Reflection:* The zero value of \(\cos 90^\circ\) is a special case that simplifies further; always keep the identity first before evaluating.

**Example 4 — Solve an equation using the identities**  
*Given:* \(\sin 5x\cos 3x=\frac12\sin 2x\)  
*Find:* all solutions in \([0,2\pi)\).  
Rewrite the left side:  
\[
\frac12[\sin(8x)+\sin(2x)]=\frac12\sin 2x
\]  
*Why:* apply the mixed-product identity.  
Multiply through by 2:  
\[
\sin 8x+\sin 2x=\sin 2x
\]  
Subtract \(\sin 2x\):  
\[
\sin 8x=0
\]  
Solutions: \(8x=k\pi\), \(x=k\pi/8\), \(k\in\mathbb{Z}\). Restrict to interval:  
**Final answer**  
\[
x=0,\frac{\pi}{8},\frac{2\pi}{8},\dots,\frac{15\pi}{8}
\]  
*Reflection:* The identity reduced the original equation to a single sine; the extra \(\sin 2x\) terms cancelled exactly.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Swapping the sign in the sine-product formula | Confusing addition versus subtraction order | Always derive from the pair of addition formulas before memorising |
| Forgetting the factor of ½        | Treating the identities as sum-to-product instead | Write the coefficient explicitly each time           |
| Using the wrong identity for mixed sine-cosine products | Overlooking that two mixed identities exist | Label the four identities distinctly (cos-cos, sin-sin, sin-cos, cos-sin) |
| Applying the formulas only to acute angles | Assuming trigonometric identities require positive acute arguments | Verify with a negative angle example immediately     |
| Losing track of which argument is A versus B | Symmetric appearance of the final formulas | Keep the original A and B labels until substitution is complete |
| Neglecting to check domains when solving equations | Solutions introduced by the identity may be extraneous | Substitute candidate solutions back into the original equation |
| Confusing product-to-sum with sum-to-product when integrating | Both sets contain similar sums and differences | Write “P→S” or “S→P” in the margin of each derivation |

## 7. The textbook-precise statement
For all real numbers \(A\) and \(B\),

\[
\begin{align*}
\sin A\cos B&=\frac12\bigl[\sin(A+B)+\sin(A-B)\bigr],\\
\cos A\sin B&=\frac12\bigl[\sin(A+B)-\sin(A-B)\bigr],\\
\cos A\cos B&=\frac12\bigl[\cos(A+B)+\cos(A-B)\bigr],\\
\sin A\sin B&=\frac12\bigl[\cos(A-B)-\cos(A+B)\bigr].
\end{align*}
\]

These identities appear as Theorem 3 in Stewart, *Calculus*, 9e, §7.2.

## 8. Visual — diagram or schematic

```text
          cos(A+B)          cos(A-B)
               +                 +
                \               /
                 \             /
                  \           /
                   \         /
                    \       /
                     \     /
                      \   /
                       \ /
                        X
                       / \
                      /   \
                     /     \
                    /       \
                   /         \
                  /           \
                 /             \
                /               \
               +                 +
          cos A cos B      sin A sin B   (scaled by 2)
```
The horizontal axis represents the linear combination that isolates each product; vertical distance encodes the coefficient ½ that appears in every formula.

## 9. The memory technique

1. **The hook** — Picture two sine waves multiplying as two spotlights whose overlapping beams produce a brighter central beam (sum) and a dimmer side beam (difference).  
2. **What to overlearn** — The four identities with the factor ½ in front of every right-hand side; the sign pattern for the sine-product case.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive any identity in 30 seconds by adding or subtracting the appropriate pair of angle-addition formulas.

## 10. What this unlocks
Mastery of product-to-sum formulas immediately enables compact integration of products of sines and cosines, the derivation of multiple-angle formulas, and the analytic treatment of amplitude modulation.  

- Integration techniques for \(\int\sin mx\cos nx\,dx\)  
- Fourier-series coefficient calculations  
- Trigonometric solution of linear differential equations with constant coefficients  
- Derivation of power-reduction formulas used in calculus

## 11. Self-check — five questions, no answers
1. Convert \(\cos 5\theta\sin 3\theta\) into a sum of sines.  
2. Show that \(\sin 40^\circ\sin 20^\circ=\frac12(\cos 20^\circ-\cos 60^\circ)\) without using a calculator.  
3. Solve \(\cos x\cos 2x=\frac12\cos 3x\) for \(x\in[0,2\pi)\).  
4. Explain why the identity for \(\sin A\sin B\) contains a minus sign while the identity for \(\cos A\cos B\) contains a plus sign.  
5. Derive the product-to-sum formula for \(\sin A\cos B\) starting from the sine-addition formulas; identify the exact algebraic step that introduces the factor of ½.