## 1. The one-sentence answer
**The sum-to-product formulas are four trigonometric identities that rewrite the sum or difference of two sine or cosine values as a product involving the average and half-difference of the angles.**

These identities arise directly from the angle-addition formulas by a symmetric substitution that treats the two angles as a pair rather than as independent quantities. The resulting expressions replace an additive combination with a multiplicative one, which often simplifies algebraic manipulation or reveals hidden structure in an equation. Because the formulas preserve equality for all real angles, they function as exact rewriting rules rather than approximations.

The underlying mechanism is the same in every case: introduce new variables for the sum and difference of the original angles, apply the addition formulas, and solve back for the original sum or difference.

> [!NOTE]
> The decisive “aha” is that every sum-to-product identity is simply the addition formula evaluated at the midpoint angle and the deviation angle; once this substitution is seen, the four formulas become inevitable rather than arbitrary.

## 2. Why this matters — concrete and current
In radio-frequency engineering, sum-to-product identities convert the superposition of two closely spaced carriers into an explicit carrier modulated by a slow envelope; Qualcomm’s mmWave beam-forming chips rely on this reduction when calibrating phase-array side-lobe cancellation.

In gravitational-wave data analysis, LIGO matches filtered detector output against template banks; the identities collapse the sum of two sinusoidal chirps into a product whose amplitude and phase can be matched analytically, cutting the computational cost of the matched-filter stage by roughly a factor of two.

In semiconductor lithography, ASML’s EUV scanners use coherent multiple-beam interference to print sub-5 nm features; the intensity pattern on the wafer is governed by cos A + cos B terms that are rewritten via the identities to locate nulls and peaks without numerical summation.

In musical acoustics, the beats heard when two tuning forks differ by a few hertz are described by the product 2 sin((A+B)/2) cos((A-B)/2); piano technicians use the zero crossings of the cosine factor to count beats per second and set equal temperament intervals.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Sine and cosine addition formulas | The sum-to-product identities are obtained by substituting the addition formulas at specially chosen angles. |
| Even/odd properties of sine and cosine | Sign changes when arguments are swapped must be tracked exactly. |
| Algebraic substitution and solving linear systems | The derivation introduces auxiliary variables that must be eliminated. |

If any row is unfamiliar, master it before proceeding.

## 4. Building the idea — from intuition to formalism

### Step 1 — View the sum as a symmetric pair
Any two angles A and B can be replaced by their average and their deviation without loss of information.  
Concrete example: let A = 50° and B = 30°; the average is 40° and the deviation is 10°.  
Formal statement:  
$$
\alpha = \frac{A+B}{2},\qquad \beta = \frac{A-B}{2}.
$$
> [!WARNING]
> Reversing the definition of β produces an overall sign error that propagates through every subsequent identity.

### Step 2 — Express A and B in terms of α and β
Solving the linear system yields A = α + β and B = α − β.  
This step is purely algebraic and holds for any real α, β.

### Step 3 — Substitute into the cosine addition formula
Write cos(A) + cos(B) using the known identity cos X + cos Y = 2 cos((X+Y)/2) cos((X−Y)/2) is what we are deriving, so instead start from the addition formula for cos(α+β) and cos(α−β):  
$$
\cos(\alpha+\beta) + \cos(\alpha-\beta) = 2\cos\alpha\cos\beta.
$$
The left-hand side is exactly cos A + cos B.

### Step 4 — Obtain the first sum-to-product identity
Dividing by the constant factor 2 immediately gives  
$$
\cos A + \cos B = 2\cos\alpha\cos\beta = 2\cos\left(\frac{A+B}{2}\right)\cos\left(\frac{A-B}{2}\right).
$$

### Step 5 — Repeat for the remaining three combinations
Apply the same substitution to sin(α+β) + sin(α−β), sin(α+β) − sin(α−β), and cos(α+β) − cos(α−β). Each produces one of the four classical identities after accounting for the even/odd character of sine and cosine.

### Step 6 — State all four formulas together
The complete set is therefore  
$$
\begin{align*}
\sin A + \sin B &= 2\sin\alpha\cos\beta,\\
\sin A - \sin B &= 2\cos\alpha\sin\beta,\\
\cos A + \cos B &= 2\cos\alpha\cos\beta,\\
\cos A - \cos B &= -2\sin\alpha\sin\beta.
\end{align*}
$$

## 5. Worked examples — every step shown

**Example 1 — Convert a simple sum**  
*Given:* sin 75° + sin 15°.  
*Find:* an equivalent product.  

Step: Identify α = (75°+15°)/2 = 45°, β = (75°−15°)/2 = 30°.  
*Why:* Definition from Step 1.  

Step: Apply the first identity:  
$$
\sin 75^\circ + \sin 15^\circ = 2\sin 45^\circ\cos 30^\circ.
$$
*Why:* Direct substitution of the derived formula.  

Step: Evaluate the right-hand side:  
$$
2\cdot\frac{\sqrt{2}}{2}\cdot\frac{\sqrt{3}}{2} = \frac{\sqrt{6}}{2}.
$$
**Final answer**  
$$
\frac{\sqrt{6}}{2}
$$

*Reflection:* The angles were chosen so that α and β are standard values; the same algebra works for arbitrary angles.

**Example 2 — Handle a difference of cosines**  
*Given:* cos 100° − cos 20°.  
*Find:* product form.  

Step: α = 60°, β = 40°.  
*Why:* Same definitions.  

Step: Insert into the fourth identity:  
$$
\cos 100^\circ - \cos 20^\circ = -2\sin 60^\circ\sin 40^\circ.
$$
*Why:* The minus sign on the right-hand side is required by the oddness of sine.  

Step: Simplify:  
$$
-2\cdot\frac{\sqrt{3}}{2}\cdot\sin 40^\circ = -\sqrt{3}\sin 40^\circ.
$$
**Final answer**  
$$
-\sqrt{3}\sin 40^\circ
$$

*Reflection:* The overall negative sign is frequently omitted by beginners; it arises automatically once the identity is applied verbatim.

**Example 3 — Prove an equation**  
*Given:* Verify sin 3θ + sin θ = 2 sin 2θ cos θ.  
*Find:* Confirm equality.  

Step: Left-hand side with A = 3θ, B = θ gives α = 2θ, β = θ.  
*Why:* Substitution.  

Step: Identity yields 2 sin 2θ cos θ, which matches the right-hand side.  
**Final answer**  
Identity holds for all θ.

*Reflection:* The verification is instantaneous once the correct identity is recognized.

**Example 4 — Simplify an expression containing multiple angles**  
*Given:* cos 50° + cos 70° + cos 80° + cos 40°.  
*Find:* closed form.  

Step: Group first pair: cos 50° + cos 70° = 2 cos 60° cos(−10°) = cos 10°.  
*Why:* Second identity with sign absorbed by evenness of cosine.  

Step: Remaining pair: cos 80° + cos 40° = 2 cos 60° cos 20° = cos 20°.  
*Why:* Same identity.  

Step: Sum the results: cos 10° + cos 20° = 2 cos 15° cos(−5°) = 2 cos 15° cos 5°.  
**Final answer**  
$$
2\cos 15^\circ\cos 5^\circ
$$

*Reflection:* Pairing reduces four terms to two applications of the same identity; the method scales to any even number of terms.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting the minus sign in cos A − cos B | The identity is the only one carrying an explicit minus; students copy the plus version by rote. | Write all four identities on a single reference card and check the sign column first. |
| Swapping α and β definitions | Both are averages, but β carries the difference; interchanging them flips every sine term. | Always label α as the sum average and β as the difference average before substituting. |
| Applying the formulas to tangent or cotangent directly | The identities exist only for sine and cosine; tangent sums require an extra division step. | Convert tan expressions to sin/cos ratios before using sum-to-product rules. |
| Assuming the formulas hold only for acute angles | The derivation uses only the addition formulas, which are valid for all real numbers. | Test with one obtuse and one negative angle immediately after memorization. |
| Losing track of 2β when solving equations | After rewriting, β appears inside an argument; students treat β as a constant. | Keep the original variables visible until the final simplification. |
| Confusing product-to-sum with sum-to-product when integrating | The two families are inverses; integration usually prefers the product form. | Label each identity family explicitly in your notes. |
| Division by zero when α = 90° + 180°k | The identities remain true, but intermediate steps may contain undefined expressions. | Verify continuity by taking limits rather than plugging singular values. |

## 7. The textbook-precise statement
Let A, B ∈ ℝ. Then the following identities hold:  
$$
\begin{align*}
\sin A + \sin B &= 2\sin\left(\frac{A+B}{2}\right)\cos\left(\frac{A-B}{2}\right),\\
\sin A - \sin B &= 2\cos\left(\frac{A+B}{2}\right)\sin\left(\frac{A-B}{2}\right),\\
\cos A + \cos B &= 2\cos\left(\frac{A+B}{2}\right)\cos\left(\frac{A-B}{2}\right),\\
\cos A - \cos B &= -2\sin\left(\frac{A+B}{2}\right)\sin\left(\frac{A-B}{2}\right).
\end{align*}
$$
(Stewart, *Calculus*, 9e, §3.4, identities 17–20.)

## 8. Visual — diagram or schematic
```text
          α+β
           /\
          /  \
         /    \
        A      B
         \    /
          \  /
           \/
           α-β

α = (A+B)/2   (mid-angle)
β = (A-B)/2   (half-spread)
```
The diagram shows two rays at angles A and B measured from the positive x-axis; their angular midpoint is α and half the angular separation is β. All four sum-to-product identities are statements about the projections of unit vectors lying along these rays.

## 9. The memory technique

1. **The hook** — Picture two tuning forks whose frequencies differ by a few hertz; the loudness swells and fades exactly as the cosine factor in the first identity oscillates, while the average pitch is carried by the sine factor.  
2. **What to overlearn** — The four right-hand sides together with the precise placement of the minus sign in the cosine-difference formula.  
3. **Spaced-repetition schedule** — Review the four identities at 1 day, 3 days, 7 days, 16 days, and 35 days after first mastery.  
4. **First-principles fallback** — Re-derive any forgotten identity in under sixty seconds by introducing α and β, writing the two addition formulas for sine or cosine, and adding or subtracting them.

## 10. What this unlocks
Mastery of these identities removes the last obstacle to solving linear trigonometric equations that arise in Fourier series, in the method of stationary phase, and in the analysis of coupled oscillators.  

- Product-to-sum formulas (the converse family)  
- Dirichlet kernel in Fourier analysis  
- Phase-shift identities used in AC circuit theory  
- Linear differential equations with constant coefficients whose characteristic roots lie on the unit circle  

## 11. Self-check — five questions, no answers
1. Convert sin 110° − sin 40° into a product and evaluate numerically to four decimals.  
2. Prove that cos 5θ + cos 3θ = 2 cos 4θ cos θ for every real θ.  
3. Simplify the expression cos(x+y) + cos(x−y) without expanding the original addition formulas.  
4. Find all real solutions of the equation sin 3x + sin x = 0.  
5. A student writes cos A − cos B = 2 sin((A+B)/2) sin((A−B)/2). Identify the precise error and supply the corrected identity.