## 1. The one-sentence answer
**De Moivre’s theorem states that raising a complex number written in polar form to the nth power simply multiplies its modulus by itself n times and multiplies its argument by n.**

A complex number z = x + yi can be rewritten as r(cos θ + i sin θ), where r is the distance from the origin and θ is the angle that distance makes with the positive real axis. When two such numbers are multiplied, their moduli multiply and their arguments add; repeating this multiplication n times therefore yields exactly the stated rule. The same relation also works backwards to extract roots. The underlying reason is geometric: each multiplication is a scaling plus a rotation, and n multiplications compose into a single scaling by r^n and a single rotation by nθ.

> [!NOTE]
> The theorem converts exponentiation, which is algebraically awkward in rectangular form, into ordinary arithmetic on the two polar coordinates; every subsequent application (roots, trigonometric identities, rotations) follows from this single translation.

## 2. Why this matters — concrete and current
In phased-array radar and 5G beam-forming, engineers at companies such as Ericsson and Qualcomm compute the n-th powers of complex exponentials to steer antenna arrays; De Moivre’s theorem supplies the closed-form phase increments without iterating matrix multiplications.

In computer graphics and game engines (Unity, Unreal), rotating a 2-D vector by an angle θ is performed by multiplying the corresponding complex number by (cos θ + i sin θ); repeated rotations are obtained instantly via the theorem rather than by composing rotation matrices.

In quantum computing, single-qubit phase gates are powers of e^{iφ}; simulators and compilers at IBM and Google apply De Moivre’s identity to evaluate long products of these gates exactly, avoiding floating-point accumulation error.

In electrical-engineering circuit analysis, the steady-state response of an RLC network driven by cos(ωt) is found by raising the complex impedance to the first power and taking the real part; higher harmonics require higher powers that the theorem evaluates directly.

In the Fast Fourier Transform kernels inside NVIDIA’s cuFFT library, twiddle factors are successive powers of a primitive root of unity; the theorem lets the library pre-compute these powers with only two real multiplications per step.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Polar form r(cos θ + i sin θ)  | The theorem is stated and proved only in polar coordinates |
| Trigonometric angle-addition formulas | Required to multiply two polar complex numbers            |
| Mathematical induction         | The cleanest rigorous proof proceeds by induction on n    |

If any row is unfamiliar, master it before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Every complex number has a length and a direction
Any point (x, y) in the plane can be described by how far it lies from the origin and the angle its ray makes with the positive x-axis.  
Example: the number 3 + 4i has length 5 and angle arctan(4/3).  
Formally,  
$$z = x + yi = r(\cos\theta + i\sin\theta),\qquad r = \sqrt{x^2 + y^2},\quad\theta = \arg(z).$$

> [!WARNING]
> If you forget that θ is defined only up to multiples of 2π, later roots will appear to be missing.

### Step 2 — Multiplication adds angles and multiplies lengths
Let z₁ = r₁(cos θ₁ + i sin θ₁) and z₂ = r₂(cos θ₂ + i sin θ₂). Their product is obtained by expanding and using the cosine and sine addition formulas.  
Example: (cos 30° + i sin 30°)(cos 60° + i sin 60°) = cos 90° + i sin 90°.  
Formally,  
$$z_1z_2 = r_1r_2\bigl(\cos(\theta_1+\theta_2)+i\sin(\theta_1+\theta_2)\bigr).$$

> [!WARNING]
> Using rectangular multiplication instead hides the angle-addition pattern and leads to pages of algebra for higher powers.

### Step 3 — Squaring is the first repeated multiplication
Apply the multiplication rule to a number with itself:  
$$[r(\cos\theta + i\sin\theta)]^2 = r^2(\cos 2\theta + i\sin 2\theta).$$

> [!WARNING]
> Students sometimes replace 2θ by θ + θ but then forget to double the modulus as well.

### Step 4 — The pattern for any positive integer power
Repeating the multiplication n times produces the obvious generalisation  
$$[r(\cos\theta + i\sin\theta)]^n = r^n(\cos n\theta + i\sin n\theta).$$

### Step 5 — Rigorous proof by induction
Base case n = 1 is immediate. Assume true for k; then  
$$z^{k+1} = z^k\cdot z = r^k(\cos k\theta + i\sin k\theta)\cdot r(\cos\theta + i\sin\theta) = r^{k+1}(\cos(k+1)\theta + i\sin(k+1)\theta).$$  
By induction the formula holds for all positive integers n. This is the textbook statement of De Moivre’s theorem.

## 5. Worked examples — every step shown

**Example 1 — Square a simple complex number**  
*Given:* z = 1 + i.  
*Find:* z² in rectangular form.  
Write z in polar form: r = √2, θ = π/4.  
Apply De Moivre:  
$$z^2 = (\sqrt{2})^2\bigl(\cos(\pi/2) + i\sin(\pi/2)\bigr) = 2(0 + i\cdot 1) = 2i.$$  
*Why:* modulus squared, argument doubled.  
**2i**  
*Reflection:* The example is easy yet already shows that the imaginary axis is reached by a 90° rotation; the same logic scales to any angle.

**Example 2 — Higher power**  
*Given:* z = √3 + i.  
*Find:* z⁴.  
r = 2, θ = π/6.  
$$z^4 = 2^4\bigl(\cos(2\pi/3) + i\sin(2\pi/3)\bigr) = 16\bigl(-\tfrac12 + i\tfrac{\sqrt{3}}{2}\bigr) = -8 + 8\sqrt{3}i.$$  
*Why:* 4 × (π/6) = 2π/3, cosine and sine evaluated at that angle.  
**-8 + 8√3 i**  
*Reflection:* The only arithmetic required after polar conversion is multiplication of the modulus and the angle; rectangular arithmetic would have been far longer.

**Example 3 — Negative exponent (reciprocal)**  
*Given:* z = cos(π/3) + i sin(π/3).  
*Find:* z^{-1}.  
De Moivre for n = –1 gives modulus 1 and angle –π/3:  
$$z^{-1} = \cos(-\pi/3) + i\sin(-\pi/3) = \tfrac12 - i\tfrac{\sqrt{3}}{2}.$$  
*Why:* negative exponent negates the argument while leaving modulus 1.  
**½ – i√3/2**  
*Reflection:* The theorem extends immediately to negative integers once the reciprocal rule is accepted.

**Example 4 — Trigonometric identity extraction**  
*Given:* cos 5θ.  
*Find:* a polynomial in cos θ.  
Expand (cos θ + i sin θ)⁵ by binomial theorem or De Moivre, equate real parts:  
$$\cos 5\theta = 16\cos^5\theta - 20\cos^3\theta + 5\cos\theta.$$  
*Why:* imaginary parts cancel, leaving the multiple-angle formula.  
**16c⁵ – 20c³ + 5c** (c = cos θ)  
*Reflection:* Every multiple-angle identity is a direct corollary; once De Moivre is known, these identities need not be memorised separately.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using degrees in one factor and radians in another | Calculator mode forgotten                   | Always convert to radians before applying the theorem |
| Forgetting that θ and θ + 2kπ represent the same angle | Roots appear “missing”                      | Write the general argument θ + 2kπ before taking roots |
| Applying the formula to n = 0 without checking | 0^0 undefined                               | State the theorem only for integer n ≥ 1 or n ≤ –1   |
| Confusing |z^n| with |z|^n when z is not on the unit circle | Modulus and argument treated as interchangeable   | Always square the modulus separately               |
| Writing cis(nθ) when θ itself contains π | Algebraic slip                              | Keep the symbol θ symbolic until the final substitution |
| Assuming the theorem works for non-integer n without branch cuts | Complex log multivalued                     | Restrict to integer exponents until logarithms are studied |
| Losing the factor r^n when r ≠ 1  | Implicit unit-modulus assumption            | Write r explicitly in every line of working          |

## 7. The textbook-precise statement
Let z = r(cos θ + i sin θ) be a nonzero complex number, where r > 0 and θ ∈ ℝ. Then for every integer n ≥ 0,
$$z^n = r^n\bigl(\cos(n\theta) + i\sin(n\theta)\bigr).$$
For negative integers the same formula holds with the reciprocal. (Ahlfors, *Complex Analysis*, 3rd ed., §2.3.)

## 8. Visual — diagram or schematic
```text
Im
 ^
 |     * (r cos nθ, r sin nθ)   <-- after n multiplications
 |    /
 |   /  angle = nθ
 |  /
 | /  angle = θ
 |/_______________> Re
     original ray at angle θ, length r
```
Each multiplication rotates the ray by θ and stretches it by r; after n steps the total rotation is nθ and the total stretch is r^n.

## 9. The memory technique

1. **The hook**  
   Picture a clock hand of length r. Every “tick” multiplies the length by r and advances the hand by angle θ. After n ticks the hand has length r^n and points at nθ — exactly De Moivre’s action.

2. **What to overlearn**  
   - z^n = r^n (cos nθ + i sin nθ) for integer n.  
   - The two-line induction proof.  
   - The geometric meaning: scaling by r and rotation by θ commute and compose by addition of angles.

3. **Spaced-repetition schedule**  
   Review at 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback**  
   Re-derive the multiplication rule from the cosine-addition formulas, then run the induction step; the theorem reappears in under two minutes.

## 10. What this unlocks
De Moivre’s theorem is the gateway to the full theory of roots of unity, cyclotomic polynomials, and the factorisation of z^n – 1. It also supplies the quickest route to multiple-angle formulas used in integration and Fourier analysis, and it is the prototype for the exponential form e^{iθ} that appears in differential equations and quantum mechanics.

- nth roots of complex numbers  
- Primitive roots of unity and the cyclotomic field  
- Discrete Fourier transform matrix entries  
- Chebyshev polynomials via the real part of z^n

## 11. Self-check — five questions, no answers
1. Convert –1 – i to polar form and compute (–1 – i)^6 without expanding binomial coefficients.  
2. Prove by induction that [r(cos θ + i sin θ)]^n satisfies the theorem for all positive integers n.  
3. Find all three cube roots of 8i and plot them on an Argand diagram.  
4. Use De Moivre to derive a formula for sin 6θ in powers of sin θ; verify numerically for θ = π/12.  
5. A rotation by 1° is applied 360 times. Show that the composition is the identity, and explain what goes wrong if the angle is stored in degrees inside a floating-point loop that never uses De Moivre.