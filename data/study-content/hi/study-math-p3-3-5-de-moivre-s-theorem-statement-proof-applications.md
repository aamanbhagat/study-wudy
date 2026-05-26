## 1. The one-sentence answer
**De Moivre's theorem states that raising a complex number in polar form to any integer power is achieved simply by multiplying its argument by that power while raising its modulus to the same power.**

Iska core idea yeh hai ki jab aap ek complex number ko \(re^{i\theta}\) form mein likhte ho, toh uska \(n\)-th power \(r^n e^{i n\theta}\) ban jaata hai. Yeh conversion trigonometric identities se aata hai aur aapko powers, roots, aur periodic behaviour ko geometrically samajhne deta hai bina algebra ke messy expansions ke. Aap isse ek baar polar form mein convert karte ho, power apply karte ho, aur wapas rectangular form mein aa sakte ho jab zaroorat pade.

Yeh theorem complex numbers ko rotation aur scaling ke tools mein badal deta hai. Har multiplication ek rotation aur scaling represent karti hai, isliye repeated multiplication sirf angle ko multiply karne ka kaam ban jaati hai.

> [!NOTE]
> The single "aha" moment yeh hai ki multiplication in the complex plane is rotation; therefore exponentiation becomes repeated rotation, which De Moivre collapses into one multiplication of the angle.

## 2. Why this matters — concrete and current
In NVIDIA's cuFFT library used for real-time signal processing on GPUs, De Moivre's theorem supplies the fast angle-multiplication step inside every butterfly operation of the FFT, letting engineers compute frequency spectra of radar returns in milliseconds.

In quantum computing, the rotation gates on IBM's superconducting qubits are implemented by applying \(e^{i\theta}\) factors; De Moivre's rule lets compiler writers pre-compute high powers of these unit-modulus operators without numerical instability.

Satellite attitude-control software at ISRO and NASA JPL models successive small rotations of reaction wheels as multiplication by \(e^{i n\theta}\); the theorem reduces thousands of matrix multiplications to a single angle scaling before each control cycle.

In power-system analysis, Siemens PTI's PSS/E package computes symmetrical-component phasors for fault studies by extracting cube roots of unity; De Moivre supplies the three explicit 120-degree roots without solving cubic equations numerically.

In computer-graphics engines such as Unreal Engine 5, skeletal animation bone rotations are accumulated via unit quaternions whose powers are evaluated with De Moivre, guaranteeing constant angular speed without gimbal lock.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Polar form \(re^{i\theta}\) | The theorem is stated and proved only after a complex number is written in this form. |
| Trigonometric angle-addition formulas | The inductive step expands \(\cos(n\theta)\) and \(\sin(n\theta)\) using these identities. |
| Mathematical induction   | The standard proof proceeds by induction on the positive integer exponent. |
| Modulus and argument properties | You must know \(|z_1 z_2| = |z_1||z_2|\) and \(\arg(z_1 z_2) = \arg z_1 + \arg z_2\) to justify the polar multiplication rule. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Write the complex number in polar form
Aap pehle \(z = x + iy\) ko \(r(\cos\theta + i\sin\theta)\) mein convert karte ho, jahaan \(r = |z|\) aur \(\theta = \arg z\). Yeh step zaroori hai kyunki theorem sirf is form mein clean dikhta hai.

Example: \(z = 3 + 4i\) becomes \(5(\cos\alpha + i\sin\alpha)\) where \(\tan\alpha = 4/3\).

Formal statement: Any nonzero complex number satisfies \(z = r(\cos\theta + i\sin\theta)\) with \(r > 0\).

> [!WARNING]
> If you forget to reduce \(\theta\) to the principal range \((-\pi,\pi]\), later roots will appear in the wrong quadrant.

### Step 2 — Multiply two numbers in polar form
Jab do complex numbers multiply hote hain, unke moduli multiply hote hain aur arguments add hote hain. Yeh geometric rotation ka direct translation hai.

Example: \(2(\cos 30^\circ + i\sin 30^\circ)\) times \(3(\cos 40^\circ + i\sin 40^\circ)\) gives \(6(\cos 70^\circ + i\sin 70^\circ)\).

Formal rule: \(r_1(\cos\theta_1 + i\sin\theta_1) \cdot r_2(\cos\theta_2 + i\sin\theta_2) = r_1 r_2(\cos(\theta_1+\theta_2) + i\sin(\theta_1+\theta_2))\).

### Step 3 — Extend to a positive integer power by induction
Base case \(n=1\) trivial hai. Assume the formula holds for \(n=k\); multiply both sides by another copy of the number to reach \(n=k+1\).

Formal inductive step uses the angle-addition formulas for cosine and sine.

### Step 4 — Handle negative exponents
Agar \(n\) negative hai toh \(z^n = 1/z^{-n}\). Kyunki \(|z| = r\) aur argument negative ho jaata hai, formula \(r^n(\cos(n\theta) + i\sin(n\theta))\) with negative \(n\) automatically satisfy karta hai.

### Step 5 — Obtain the \(n\)th roots
Set \(w^n = z\) aur solve for \(w\). Modulus becomes \(r^{1/n}\) aur arguments become \(\frac{\theta + 2k\pi}{n}\) for \(k = 0,1,\dots,n-1\).

### Step 6 — Textbook-grade statement
For any integer \(n \geq 0\) and real \(\theta\),
\[
[\,r(\cos\theta + i\sin\theta)\,]^n = r^n(\cos(n\theta) + i\sin(n\theta)).
\]
The formula also holds for negative integers when \(r \neq 0\).

## 5. Worked examples — har step show karo

**Example 1 — Positive integer power**
*Given:* \(z = 1 + i\), find \(z^4\).
*Find:* Express the result in rectangular form.

Convert: \(r = \sqrt{2}\), \(\theta = \pi/4\).
Apply theorem: \((\sqrt{2})^4(\cos\pi + i\sin\pi) = 4(-1 + 0i) = -4\).

*Why* each move: modulus power first because multiplication rule multiplies moduli; angle multiplied by 4 because arguments add on each multiplication.

**Final answer**
**-4**

*Reflection:* The example is easy because the angle is a standard multiple of \(\pi/4\); it shows the theorem collapses four multiplications into one line.

**Example 2 — Negative exponent**
*Given:* \(z = 2(\cos 60^\circ + i\sin 60^\circ)\), find \(z^{-3}\).
*Find:* Rectangular form.

\(2^{-3}(\cos(-180^\circ) + i\sin(-180^\circ)) = \frac18(-1 + 0i) = -1/8\).

*Why:* Negative exponent flips the sign of the angle and takes the reciprocal of the modulus.

**Final answer**
**-1/8**

*Reflection:* Students often forget the sign change on the angle; this example forces that check.

**Example 3 — Cube roots of unity**
*Given:* Solve \(w^3 = 1\).
*Find:* All three roots in polar form.

\(r=1\), \(\theta=0\); roots are \(1\), \(\omega = \cos(2\pi/3) + i\sin(2\pi/3)\), \(\omega^2 = \cos(4\pi/3) + i\sin(4\pi/3)\).

*Why:* Add \(2k\pi\) inside the argument before dividing by 3, for \(k=0,1,2\).

**Final answer**
**1, \(\omega\), \(\omega^2\)**

*Reflection:* The three roots lie equally spaced on the unit circle; the theorem directly supplies their angular separation.

**Example 4 — Non-principal root**
*Given:* Find the three cube roots of \(8i\).
*Find:* All roots in rectangular form.

\(8i = 8(\cos(\pi/2) + i\sin(\pi/2))\), modulus root = 2, arguments = \((\pi/2 + 2k\pi)/3\), \(k=0,1,2\).

Yields \(2(\cos 30^\circ + i\sin 30^\circ)\), \(2(\cos 150^\circ + i\sin 150^\circ)\), \(2(\cos 270^\circ + i\sin 270^\circ)\).

Convert last root: \(2(0 - i) = -2i\).

**Final answer**
**\(\sqrt{3}+i\), \(-\sqrt{3}+i\), \(-2i\)**

*Reflection:* The example mixes a non-unit modulus with multiple branches, training both modulus scaling and argument periodicity.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting \(2k\pi\) when taking roots | Students treat argument as single-valued    | Always write \(\theta + 2k\pi\) before dividing |
| Using degrees inside trig functions after conversion | Calculator mode mismatch                    | Convert to radians or keep consistent degree mode |
| Raising modulus to \(1/n\) incorrectly for negative numbers | Confusing \(r^{1/n}\) with even-root rules  | Remember modulus is always positive          |
| Losing the sign of a negative exponent on the angle | Sign flip feels counter-intuitive           | Write \(n = -m\) and replace \(\theta\) by \(-\theta\) explicitly |
| Reporting only the principal root | Habit from real-number roots                | List all \(n\) distinct roots                |
| Adding arguments without reducing modulo \(2\pi\) | Intermediate angles become huge             | Reduce modulo \(2\pi\) after each addition   |
| Confusing \(\cos n\theta\) with \(n\cos\theta\) | Algebraic pattern matching error            | Keep the parentheses in the statement        |

## 7. The textbook-precise statement
Let \(z = r(\cos\theta + i\sin\theta)\) where \(r \geq 0\) and \(\theta \in \mathbb{R}\). Then for every integer \(n\),
\[
z^n = r^n\bigl(\cos(n\theta) + i\sin(n\theta)\bigr).
\]
When \(n < 0\) we require \(r > 0\). The \(n\) distinct \(n\)th roots of a nonzero \(z\) are
\[
\sqrt[n]{r}\Bigl(\cos\frac{\theta + 2k\pi}{n} + i\sin\frac{\theta + 2k\pi}{n}\Bigr),\qquad k=0,1,\dots,n-1.
\]
(Source: Brown & Churchill, *Complex Variables and Applications*, 9e, §7.)

## 8. Visual — diagram or schematic
```
Unit circle, origin O
          120°
     ω   /  
        /    
       /  θ=0
1 ----O---- -1
       \    
        \   
     ω²   240°
```
Three cube roots of unity equally spaced at 0°, 120°, 240°; each multiplication by \(\omega\) rotates the previous root by 120°.

## 9. The memory technique
1. **The hook** — Picture a bicycle wheel whose spokes are painted at angle \(\theta\); raising to the \(n\)th power spins the wheel \(n\) times faster while stretching its radius to \(r^n\).
2. **What to overlearn** — The exact statement \([r(\cos\theta + i\sin\theta)]^n = r^n(\cos n\theta + i\sin n\theta)\) and the \(2k\pi\) offset for roots.
3. **Spaced-repetition schedule** — Review the statement after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by writing the number in polar form, multiplying once, and applying mathematical induction using the cosine/sine addition formulas.

## 10. What this unlocks
De Moivre's theorem is the gateway to all subsequent work with roots of unity, cyclotomic polynomials, and discrete Fourier transforms.

- nth roots of unity and their minimal polynomials
- Fast Fourier transform butterfly diagrams
- Representation theory of cyclic groups
- Phasor arithmetic in AC circuit analysis
- Quantum gate exponentiation and Bloch-sphere rotations

## 11. Self-check — five questions, no answers
1. Convert \( -1 + i\sqrt{3} \) to polar form and compute its seventh power using De Moivre.
2. How many distinct cube roots does \( -8 \) have, and what is their angular spacing?
3. Prove by induction that \((\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta\) for positive integers \(n\).
4. A student computes the square roots of \(i\) and obtains only one answer; identify the missing root and the step that was skipped.
5. In the expression \( [2(\cos 20^\circ + i\sin 20^\circ)]^5 \), the angle becomes 100°; explain why adding 360° before multiplying by 5 would give an identical complex number.