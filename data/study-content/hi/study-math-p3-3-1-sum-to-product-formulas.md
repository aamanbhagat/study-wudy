## 1. The one-sentence answer

**Sum-to-product formulas rewrite the sum or difference of two sine or cosine terms as a product of two simpler trigonometric functions.**  

These identities arise directly from the angle-addition formulas by introducing new variables that represent the average and half-difference of the original angles. Once you treat the sum and difference as separate quantities, the addition formulas collapse into compact product expressions that remove the need to expand every term separately.  

In practice this conversion turns awkward linear combinations into factorable forms, which makes solving equations or simplifying integrals far cleaner. The four core identities cover every combination of sine and cosine, so you never need to memorise extra cases.  

> [!NOTE]
> The deepest insight is that addition and subtraction in the argument become multiplication after the change of variables; the half-angle factors act like a coordinate rotation that diagonalises the original sum.

## 2. Why this matters — concrete and current

In phased-array radar systems built by Raytheon, engineers combine signals from hundreds of antenna elements. Sum-to-product identities convert the total field into a product of a slowly varying envelope and a rapidly oscillating carrier, allowing real-time beam steering calculations without expanding thousands of sine terms.  

During LIGO’s gravitational-wave detections, the strain signal is the sum of two orthogonal polarisations. Analysts apply these formulas to factor the combined waveform before matched filtering, reducing computational load inside the PyCBC pipeline by roughly 30 %.  

In semiconductor lithography tools from ASML, multiple laser beams interfere on the wafer. The intensity pattern is a sum of cosines; converting to products lets process engineers predict null locations analytically instead of running full electromagnetic simulations for every mask iteration.  

Audio plugins from Universal Audio use the identities inside their equaliser algorithms. Summing neighbouring filter bands becomes a product of a gain term and a cosine modulator, cutting the number of multiplications per sample on embedded DSP chips.  

In orbital mechanics, NASA’s GMAT software expands the disturbing function of third-body perturbations. Sum-to-product steps collapse resonant terms involving mean anomalies, revealing stable orbits without numerical Fourier analysis at every time step.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Angle-addition formulas    | They are the only starting point that produces the sums   |
| Basic sine/cosine symmetry | Needed to recognise which identity applies to each sign   |
| Linear substitution        | Lets you replace A+B and A−B with new variables cleanly   |

If any row above feels shaky, pause and review that single concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Begin with the addition formulas you already know
Start from the two addition identities you trust:  
$$ \sin(x+y)=\sin x\cos y+\cos x\sin y $$  
$$ \cos(x+y)=\cos x\cos y-\sin x\sin y $$  
These are the only raw material required.  

> [!WARNING]
> If you replace the addition formulas with memorized product-to-sum tables instead, the derivation becomes circular and you lose the ability to reconstruct the identities under pressure.

### Step 2 — Introduce sum and difference angles
Define two new quantities that capture the “average” and “spread”:  
Let  
$$ \alpha=\frac{A+B}{2},\qquad \beta=\frac{A-B}{2} $$  
Then the original angles become  
$$ A=\alpha+\beta,\qquad B=\alpha-\beta $$  
This substitution turns every sum \(A+B\) into \(2\alpha\) and every difference \(A-B\) into \(2\beta\).

### Step 3 — Substitute into the sine addition formula
Replace \(x\) and \(y\) in the sine addition formula:  
$$ \sin A+\sin B=\sin(\alpha+\beta)+\sin(\alpha-\beta) $$  
Expand both terms using the addition formula and collect like terms. The cross terms cancel, leaving  
$$ 2\sin\alpha\cos\beta $$  
which is exactly  
$$ \sin A+\sin B=2\sin\left(\frac{A+B}{2}\right)\cos\left(\frac{A-B}{2}\right) $$

### Step 4 — Repeat the substitution for the remaining three cases
Apply the identical substitution to \(\sin A-\sin B\), \(\cos A+\cos B\), and \(\cos A-\cos B\). Each time the cross terms either cancel or pick up a minus sign, producing the four standard identities. No new trigonometric facts are introduced; only algebra is used.

### Step 5 — Verify the sign pattern once
Notice that the minus sign appears only when the original functions have opposite signs and the outer function is cosine. This single rule replaces the need to memorise four separate sign tables.

### Step 6 — State the complete set formally
After the substitutions are performed, the four identities stand as textbook statements ready for direct use.

## 5. Worked examples — har step show karo

**Example 1 — Convert a simple sum**  
*Given:* \(\sin 75^\circ+\sin 15^\circ\)  
*Find:* its product form.  
Apply the sine-sum identity directly:  
$$ \sin 75^\circ+\sin 15^\circ=2\sin\left(\frac{90^\circ}{2}\right)\cos\left(\frac{60^\circ}{2}\right)=2\sin 45^\circ\cos 30^\circ $$  
*Why:* The arguments 75° and 15° already supply the average and half-difference.  
**Final answer:** \(\sqrt{2}\cdot\frac{\sqrt{3}}{2}=\frac{\sqrt{6}}{2}\)  

*Reflection:* The example is easy because the angles are symmetric; the same pattern appears whenever angles add to 90°.

**Example 2 — Handle a difference of cosines**  
*Given:* \(\cos 100^\circ-\cos 20^\circ\)  
*Find:* product form.  
Use the cosine-difference identity:  
$$ \cos 100^\circ-\cos 20^\circ=-2\sin\left(\frac{120^\circ}{2}\right)\sin\left(\frac{80^\circ}{2}\right)=-2\sin 60^\circ\sin 40^\circ $$  
*Why:* The outer minus sign forces the negative sine factor.  
**Final answer:** \(-\sqrt{3}\sin 40^\circ\)  

*Reflection:* Students often forget the minus; writing the identity with the explicit negative sign prevents that slip.

**Example 3 — Simplify an expression before solving an equation**  
*Given:* Solve \(\sin 3\theta+\sin\theta=0\) for \(\theta\in[0,\pi)\).  
Factor with the sine-sum formula:  
$$ 2\sin 2\theta\cos\theta=0 $$  
Hence \(\sin 2\theta=0\) or \(\cos\theta=0\).  
*Why:* The product form immediately separates the equation into two solvable cases.  
**Final answer:** \(\theta=\frac{\pi}{4},\frac{\pi}{2},\frac{3\pi}{4}\)  

*Reflection:* Without the identity the equation would require the sum-to-product conversion anyway; doing it first shortens every later algebraic step.

**Example 4 — Nested application with three angles**  
*Given:* \(\sin x+\sin y+\sin z\) where \(x+y+z=0\).  
Rewrite the first two terms:  
$$ 2\sin\left(\frac{x+y}{2}\right)\cos\left(\frac{x-y}{2}\right)+\sin(-x-y) $$  
Because \(z=-(x+y)\), the last term becomes \(-\sin(x+y)\). After another round of identities the expression collapses to zero.  
*Why:* The condition \(x+y+z=0\) forces the average angle to cancel with the third term.  
**Final answer:** 0 (identity holds for any such triple).  

*Reflection:* The example shows how the formulas chain together when an auxiliary linear relation is present.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting the minus in cos A − cos B | Students copy the plus version by habit     | Write the four identities side-by-side once and underline the single negative sign |
| Using degrees inside half-angle arguments | Calculator mode mismatch                    | Convert everything to radians before substituting or keep degree symbol explicit |
| Swapping A and B without checking sign | The half-difference changes sign            | Always compute (A+B)/2 first, then (A−B)/2   |
| Applying the formula to tan A + tan B | Identity exists only for sin and cos        | Verify the left-hand side contains only sine or cosine before starting |
| Losing the factor of 2            | Arithmetic slip when halving angles         | Factor out the 2 immediately after substitution |
| Using the identity on inverse trig functions | Domain restrictions ignored                 | Confirm both original angles lie in the common domain of the chosen identity |

## 7. The textbook-precise statement

Let \(A,B\in\mathbb{R}\). Then the following identities hold:  
\[
\sin A+\sin B=2\sin\left(\frac{A+B}{2}\right)\cos\left(\frac{A-B}{2}\right),
\]  
\[
\sin A-\sin B=2\cos\left(\frac{A+B}{2}\right)\sin\left(\frac{A-B}{2}\right),
\]  
\[
\cos A+\cos B=2\cos\left(\frac{A+B}{2}\right)\cos\left(\frac{A-B}{2}\right),
\]  
\[
\cos A-\cos B=-2\sin\left(\frac{A+B}{2}\right)\sin\left(\frac{A-B}{2}\right).
\]  
These equalities are identities; they are true for all real \(A\) and \(B\). (Stewart, *Precalculus*, 8e, §5.3)

## 8. Visual — diagram or schematic

```text
          sin A          sin B
            ^              ^
            |   +          |
            |  / \         |
            | /   \        |
------------+-----+--------+--> angle
         A-B/2   (A+B)/2
            β        α
Product form: 2 sin α cos β
```
The diagram shows two sine lobes centred at α+β and α−β; their vertical sum factors into an amplitude 2 cos β modulated by the carrier sin α.

## 9. The memory technique

**The hook** — Picture two waves meeting at a point; their combined height is the product of a slow “average wave” and a fast “difference envelope.”  

**What to overlearn** — The four identities exactly as written in section 7, plus the single rule that only cos A − cos B carries a leading minus.  

**Spaced-repetition schedule** — Review the four identities at 1 day, 3 days, 7 days, 16 days, and 35 days.  

**First-principles fallback** — Return to the angle-addition formulas, introduce α and β, and repeat the four substitutions; the algebra always yields the same product forms.

## 10. What this unlocks

Mastery of these formulas lets you move instantly between linear combinations and factored products, which is required for solving trigonometric equations, evaluating definite integrals that contain sums of sines, and simplifying Fourier-series coefficients.  

- Product-to-sum formulas (the inverse direction)  
- Linear combination of sinusoids into a single sine or cosine  
- Resonance conditions in differential equations  
- Dirichlet kernel in Fourier analysis  

## 11. Self-check — five questions, no answers

1. Convert \(\cos 50^\circ+\cos 10^\circ\) into a product and evaluate numerically.  
2. Solve \(\sin 5\theta-\sin 3\theta=0\) for \(\theta\) in \([0,2\pi)\).  
3. Show that \(\sin(x+y)+\sin(x-y)=2\sin x\cos y\) without using any sum-to-product table.  
4. Identify the error: a student wrote \(\cos A-\cos B=2\sin(\frac{A+B}{2})\sin(\frac{A-B}{2})\). What is the correct version and why?  
5. Given \(\sin A+\sin B=0.8\) and \(\cos A+\cos B=0.6\), find the value of \(\cos(A-B)\) without finding A or B individually.