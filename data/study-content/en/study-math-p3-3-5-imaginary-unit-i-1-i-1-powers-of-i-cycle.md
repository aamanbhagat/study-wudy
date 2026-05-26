## 1. The one-sentence answer
**The imaginary unit \(i\) is the number satisfying \(i^2 = -1\), which extends the real numbers so that every quadratic equation has solutions, and its successive powers repeat every four steps: \(i, -1, -i, 1\).**

Negative numbers have no square root inside the reals because the square of any real is nonnegative. Defining a new symbol \(i\) whose square equals \(-1\) removes this barrier while obeying the usual rules of arithmetic. Once \(i\) exists, every integer power of \(i\) lands on one of only four values, because multiplying by \(i\) rotates the previous result by 90 degrees on the number line extended into a plane.

The pattern appears immediately: \(i^1 = i\), \(i^2 = -1\), \(i^3 = -i\), \(i^4 = 1\), and then the sequence repeats. This four-cycle is not an extra fact; it follows directly from the single relation \(i^2 = -1\) together with the associative and commutative laws of multiplication.

> [!NOTE]
> The cycle length four is the direct algebraic consequence of \(i^4 = (i^2)^2 = (-1)^2 = 1\); remembering the relation \(i^2 = -1\) is therefore sufficient to recover every higher power.

## 2. Why this matters — concrete and current
In electrical engineering, alternating-current circuit analysis relies on phasors whose voltages and currents are represented as complex numbers; the factor \(i\) encodes the 90-degree phase shift between voltage across a capacitor and current through it, allowing companies such as Texas Instruments to design filters and oscillators that run at gigahertz frequencies.

Quantum mechanics represents the state of a qubit as a complex vector whose coefficients involve powers of \(i\); the time-evolution operator \(e^{-iHt/\hbar}\) produces the oscillatory probabilities measured at IBM Quantum and Google Quantum AI laboratories.

Signal-processing algorithms inside every smartphone use the Fast Fourier Transform, whose twiddle factors are successive powers of \(i\) or roots of unity derived from them; Qualcomm’s modem chips therefore depend on the four-cycle property to keep computational cost linear rather than quadratic.

Fractal geometry and dynamical systems generate the Mandelbrot set by iterating \(z_{n+1} = z_n^2 + c\) in the complex plane; the same iteration appears in stability analysis of control systems at NASA’s Jet Propulsion Laboratory when designing trajectories that remain bounded under small perturbations.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Negative numbers     | The equation \(x^2 + 1 = 0\) forces us to take the square root of a negative. |
| Laws of exponents    | Powers such as \(i^n\) are built by repeated multiplication; the rule \((ab)^c = a^c b^c\) must hold. |
| Solving quadratics   | The quadratic formula produces \(\sqrt{-1}\) precisely when the discriminant is negative. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Negative numbers lack square roots inside the reals
No real number squared equals \(-1\), because the square of any real is nonnegative.  
Example: Suppose \(x^2 = -1\). Then \(x^2 + 1 = 0\), yet the left side is always at least 1 for real \(x\).  
Formal statement: There is no \(x \in \mathbb{R}\) such that \(x^2 = -1\).

> [!WARNING]
> Treating \(\sqrt{-1}\) as an ordinary real number immediately produces contradictions such as \(1 = -1\) after squaring both sides of invalid identities.

### Step 2 — Introduce a new symbol whose square is defined to be −1
We enlarge the number system by declaring the existence of an object \(i\) that satisfies the equation by fiat.  
Example: Set \(i^2 := -1\).  
Formal statement:  
\[
i^2 = -1.
\]

> [!WARNING]
> The symbol \(i\) is not a variable; it is a constant, so expressions such as \(2i\) mean the real multiple 2 times this constant, not a product of two variables.

### Step 3 — Verify that the new symbol obeys the field axioms
Addition and multiplication of expressions \(a + bi\) are defined componentwise using the rule \(i^2 = -1\) to reduce higher powers.  
Example: \((1 + 2i)(3 + 4i) = 3 + 4i + 6i + 8i^2 = 3 + 10i - 8 = -5 + 10i\).  
Formal statement: The set \(\mathbb{C} = \{a + bi \mid a,b \in \mathbb{R}\}\) with the usual addition and the multiplication rule above forms a field.

### Step 4 — Compute the first four powers explicitly
Successive multiplication by \(i\) yields:  
\[
i^1 = i, \quad i^2 = -1, \quad i^3 = i^2 \cdot i = -i, \quad i^4 = i^2 \cdot i^2 = (-1)^2 = 1.
\]

> [!WARNING]
> Students sometimes replace \(i^4\) with \((i^2)^2 = 1\) correctly but then incorrectly assume the cycle restarts at \(i^5 = i\) without recomputing; the equality \(i^5 = i^4 \cdot i = 1 \cdot i = i\) must be written each time.

### Step 5 — Prove the powers are periodic with period 4
For any integer \(n \geq 0\), write \(n = 4k + r\) where \(r \in \{0,1,2,3\}\). Then  
\[
i^n = i^{4k+r} = (i^4)^k \cdot i^r = 1^k \cdot i^r = i^r.
\]
Thus the only possible values are \(1, i, -1, -i\).

## 5. Worked examples — every step shown

**Example 1 — Direct evaluation of a low power**  
*Given:* Compute \(i^7\).  
*Find:* The simplified value.  
Step 1: \(7 = 4\cdot1 + 3\), so \(i^7 = i^{4+3} = (i^4)\cdot i^3\).  
*Why:* The division algorithm supplies the remainder 3.  
Step 2: \(i^4 = 1\), therefore \(i^7 = 1 \cdot i^3 = i^3\).  
*Why:* The defining relation \(i^4 = 1\) collapses every multiple of 4.  
Step 3: \(i^3 = -i\).  
*Why:* \(i^3 = i^2 \cdot i = (-1)\cdot i = -i\).  

**\( -i \)**

*Reflection:* The reduction modulo 4 is mechanical once the cycle is accepted; the only algebraic content is the single identity \(i^2 = -1\).

**Example 2 — Negative exponent**  
*Given:* Simplify \(i^{-3}\).  
*Find:* The value in the set \(\{1,i,-1,-i\}\).  
Step 1: \(i^{-3} = 1/i^3\).  
*Why:* Negative exponents are reciprocals.  
Step 2: \(i^3 = -i\), so \(1/i^3 = 1/(-i)\).  
*Why:* Direct substitution from the cycle.  
Step 3: Multiply numerator and denominator by \(i\): \(1/(-i) \cdot i/i = i/(-i\cdot i) = i/(-i^2) = i/1 = i\).  
*Why:* \(i^2 = -1\) converts the denominator into a real number.  

**\( i \)**

*Reflection:* The same four values appear for negative exponents because \(i^{-1} = -i\) and the cycle continues backward.

**Example 3 — Polynomial evaluation**  
*Given:* Let \(p(z) = z^2 + 2z + 2\). Evaluate \(p(1+i)\).  
*Find:* The complex number result.  
Step 1: \((1+i)^2 = 1 + 2i + i^2 = 1 + 2i - 1 = 2i\).  
*Why:* Expand the binomial and replace \(i^2\) by \(-1\).  
Step 2: \(2(1+i) = 2 + 2i\).  
*Why:* Distribute the real coefficient.  
Step 3: Sum: \(2i + 2 + 2i + 2 = 4 + 4i\).  
*Why:* Combine like terms.  

**\( 4 + 4i \)**

*Reflection:* Every occurrence of \(i^2\) is replaced immediately; the arithmetic never leaves the ring \(\mathbb{Z}[i]\).

**Example 4 — Solving a quadratic**  
*Given:* Solve \(x^2 + 4x + 5 = 0\).  
*Find:* Both roots in \(\mathbb{C}\).  
Step 1: Quadratic formula: \(x = \frac{-4 \pm \sqrt{16 - 20}}{2} = \frac{-4 \pm \sqrt{-4}}{2}\).  
*Why:* Discriminant is negative, forcing \(i\).  
Step 2: \(\sqrt{-4} = \sqrt{4\cdot(-1)} = 2i\).  
*Why:* Factor out the positive square and attach \(i\).  
Step 3: \(x = \frac{-4 \pm 2i}{2} = -2 \pm i\).  
*Why:* Divide each term by 2.  

**\( -2 + i,\quad -2 - i \)**

*Reflection:* The appearance of \(\pm i\) is the algebraic signature that the roots are complex conjugates.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                                      |
|-----------------------------|---------------------------------------------|------------------------------------------------------|
| Writing \(i = \sqrt{-1}\) without qualification | Square-root symbol is multi-valued on negatives | Always begin from the defining equation \(i^2 = -1\). |
| Believing the cycle is length 2 | Confusing \(i^2 = -1\) with \(i^4 = 1\) too early | Compute \(i^3\) explicitly each time until automatic. |
| Treating \(i\) as a variable | Notation \(i\) looks like an index          | Replace every \(i\) by the constant symbol mentally. |
| Forgetting \(i^0 = 1\)      | Zero exponent feels different               | Note \(i^0 = (i^4)^0 = 1^0 = 1\).                    |
| Sign error on \(i^3\)       | Multiplication by negative is easy to drop  | Always write \(i^3 = i^2 \cdot i = (-1)i = -i\).     |
| Computing \(i^{4k+ r}\) for \(r \ge 4\) | Remainder not reduced                       | Apply the division algorithm first.                  |
| Assuming \(\sqrt{i^2} = i\) | Square-root function is not linear          | Reduce to \(i^2 = -1\) before taking roots.          |

## 7. The textbook-precise statement
Let \(i\) denote an element adjoined to \(\mathbb{R}\) satisfying the relation \(i^2 + 1 = 0\). The powers of \(i\) satisfy  
\[
i^n = 
\begin{cases}
1  & n \equiv 0 \pmod{4}, \\
i  & n \equiv 1 \pmod{4}, \\
-1 & n \equiv 2 \pmod{4}, \\
-i & n \equiv 3 \pmod{4}.
\end{cases}
\]
This periodicity follows at once from the minimal polynomial \(x^2 + 1\) and the division algorithm in \(\mathbb{Z}\). (See Stewart, *Precalculus*, 10e, §3.5, “Complex Numbers”.)

## 8. Visual — diagram or schematic
```text
          i
          ^
          |
   -1 <---o---> 1     (real axis)
          |
          v
         -i
```
Labelled axes: horizontal real line, vertical imaginary line. Arrows indicate multiplication by \(i\) rotates 90° counterclockwise: \(1 \mapsto i \mapsto -1 \mapsto -i \mapsto 1\).

## 9. The memory technique

**The hook**  
Picture a clock whose only numbers are the four values 1, \(i\), −1, −i; each multiplication by \(i\) advances the hand one quarter turn.

**What to overlearn**  
- The defining equation \(i^2 = -1\).  
- The four values and their order: \(i^0=1\), \(i^1=i\), \(i^2=-1\), \(i^3=-i\).

**Spaced-repetition schedule**  
Review the cycle at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

**First-principles fallback**  
If the cycle is forgotten, recompute four successive multiplications starting from \(i^2 = -1\): \(i^3 = i^2\cdot i = -i\), \(i^4 = i^3\cdot i = -i^2 = 1\).

## 10. What this unlocks
Mastery of the imaginary unit and its four-cycle supplies the arithmetic engine for every later construction in complex analysis.  

- Euler’s formula \(e^{i\theta} = \cos\theta + i\sin\theta\) is proved by comparing power series whose coefficients involve the same cycle.  
- Roots of unity and the cyclotomic polynomials rest on the equation \(z^4 = 1\).  
- The complex exponential map and polar form both rely on multiplication by \(i\) being rotation.  
- Linear algebra over \(\mathbb{C}\) and the spectral theorem for normal operators inherit the same arithmetic.

## 11. Self-check — five questions, no answers
1. Compute \(i^{13}\) and justify each reduction step.  
2. Without using the cycle table, derive the value of \(i^{-5}\) from \(i^2 = -1\) alone.  
3. Show that \(i^{4k+2} = -1\) for every integer \(k \geq 0\).  
4. A student claims \(i^6 = i^2\). Identify the precise algebraic error.  
5. Solve \(x^2 + x + 1 = 0\) over \(\mathbb{C}\) and express both roots using only the symbols \(i\) and real numbers.