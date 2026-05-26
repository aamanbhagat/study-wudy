## 1. The one-sentence answer
**Complex-number arithmetic is performed by treating the real and imaginary parts separately in rectangular form or by multiplying moduli and adding arguments in polar form.**

Rectangular form writes every complex number as \(a + bi\) where \(a, b \in \mathbb{R}\). Addition and subtraction act independently on the two components exactly as vector addition does on the plane. Multiplication and division remain possible in rectangular form but produce messier algebra; the same operations become single multiplications or divisions once the numbers are rewritten in polar form \(r(\cos\theta + i\sin\theta)\).

Polar form therefore separates magnitude from direction. The magnitude scales under multiplication and division while the direction rotates; this geometric separation is invisible in rectangular coordinates yet follows directly from the definitions of modulus and argument.

> [!NOTE]
> The decisive insight is that addition is linear in each coordinate while multiplication is linear in the logarithm; switching representations simply chooses the coordinate system in which the chosen operation becomes linear.

## 2. Why this matters — concrete and current
In aerospace guidance, the European Space Agency’s Rosetta mission used complex multiplication in polar form to compose successive attitude rotations of the spacecraft without accumulating rounding errors in the quaternion representation.

Modern 5G baseband chips from Qualcomm perform thousands of complex multiplications per symbol in the FFT engine; the polar-form shortcut reduces each multiplication to one real multiply and one angle add, cutting power draw measurably on every handset.

In quantum-circuit simulation, Google’s Cirq and IBM’s Qiskit represent single-qubit gates as complex \(2\times2\) matrices; matrix multiplication is executed in rectangular form while global phase factors are stripped using polar-form division, preserving numerical stability across millions of gates.

Semiconductor yield analysis at TSMC models small-signal AC behaviour with complex impedances; converting measured S-parameters to polar form lets engineers add phase shifts from transmission lines by simple argument addition before converting back for time-domain simulation.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Real-number arithmetic   | All rectangular operations reduce to ordinary \(+\), \(-\), \(\times\), \(\div\) on reals. |
| Pythagorean distance     | Modulus \(r = \sqrt{a^2 + b^2}\) is Euclidean length in the plane. |
| Trigonometric definitions| Argument \(\theta = \tan^{-1}(b/a)\) (with quadrant correction) converts rectangular to polar. |
| Exponential notation     | \(re^{i\theta}\) is compact shorthand for polar form and obeys the usual exponent laws. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Separate real and imaginary parts
A complex number is an ordered pair of reals. Addition therefore adds corresponding components.

Example: \((3 + 4i) + (1 - 2i) = 4 + 2i\).

Formally,
\[
(a + bi) + (c + di) = (a + c) + (b + d)i.
\]

> [!WARNING]
> Treating \(i\) as a variable and “collecting like terms” works only because \(i\) is linearly independent of 1 over \(\mathbb{R}\); forgetting independence produces sign errors when \(i^2 = -1\) appears later.

### Step 2 — Subtraction mirrors addition
Replace the second number by its negative:
\[
(a + bi) - (c + di) = (a - c) + (b - d)i.
\]

### Step 3 — Multiplication stays rectangular but expands
Distribute term by term and replace \(i^2\) by \(-1\):
\[
(a + bi)(c + di) = (ac - bd) + (ad + bc)i.
\]

### Step 4 — Division requires a conjugate
Multiply numerator and denominator by the conjugate of the denominator:
\[
\frac{a + bi}{c + di} = \frac{(a + bi)(c - di)}{c^2 + d^2}.
\]

### Step 5 — Polar multiplication multiplies moduli, adds arguments
Write \(z_1 = r_1 e^{i\theta_1}\), \(z_2 = r_2 e^{i\theta_2}\). Then
\[
z_1 z_2 = r_1 r_2 e^{i(\theta_1 + \theta_2)}.
\]

### Step 6 — Polar division divides moduli, subtracts arguments
\[
\frac{z_1}{z_2} = \frac{r_1}{r_2} e^{i(\theta_1 - \theta_2)}, \quad z_2 \neq 0.
\]

### Step 7 — Conversion formulas close the loop
\[
r = |z| = \sqrt{a^2 + b^2}, \quad \theta = \arg(z) = \atantwo(b,a),
\]
\[
a = r\cos\theta, \quad b = r\sin\theta.
\]

## 5. Worked examples — every step shown

**Example 1 — Simple rectangular addition**  
*Given:* \(z_1 = 2 + 3i\), \(z_2 = -1 + 5i\).  
*Find:* \(z_1 + z_2\).  

\[
z_1 + z_2 = (2 + (-1)) + (3 + 5)i = 1 + 8i
\]
*Why:* add real parts, add imaginary parts independently.  

**1 + 8i**

*Reflection:* The operation is component-wise; the only possible error is an arithmetic slip in one coordinate.

**Example 2 — Rectangular multiplication**  
*Given:* \(z_1 = 3 + 2i\), \(z_2 = 1 - i\).  
*Find:* \(z_1 z_2\).  

\[
(3)(1) + (3)(-i) + (2i)(1) + (2i)(-i) = 3 - 3i + 2i - 2i^2 = 3 - i + 2 = 5 - i
\]
*Why:* expand, replace \(i^2\) by \(-1\), combine like terms.  

**5 - i**

*Reflection:* The cross terms produce the rotation; forgetting the sign change on \(i^2\) is the common slip.

**Example 3 — Polar multiplication after conversion**  
*Given:* \(z_1 = 1 + i\), \(z_2 = \sqrt{3} + i\).  
*Find:* \(z_1 z_2\) in polar form.  

First convert:  
\[
|z_1| = \sqrt{2},\quad \arg(z_1) = \pi/4; \quad |z_2| = 2,\quad \arg(z_2) = \pi/6.
\]
Multiply:  
\[
|z_1 z_2| = \sqrt{2}\cdot 2 = 2\sqrt{2},\quad \arg(z_1 z_2) = \pi/4 + \pi/6 = 5\pi/12.
\]
Result: \(2\sqrt{2} e^{i 5\pi/12}\).

*Reflection:* Angle addition replaces four real multiplications; the price is the initial conversion cost.

**Example 4 — Division in rectangular form with conjugate**  
*Given:* \(z_1 = 4 + 2i\), \(z_2 = 1 + i\).  
*Find:* \(z_1 / z_2\).  

Multiply by conjugate:  
\[
\frac{4 + 2i}{1 + i} \cdot \frac{1 - i}{1 - i} = \frac{(4 - 2i) + (2i - 2i^2)}{1 + 1} = \frac{4 - 2i + 2i + 2}{2} = \frac{6}{2} + 0i = 3.
\]
*Why:* denominator becomes real; numerator simplifies after \(i^2 = -1\).

**3**

*Reflection:* The result is real, revealing that the arguments differed by zero after division.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                                      |
|-------------------------------------|---------------------------------------------|------------------------------------------------------|
| Forgetting quadrant correction in \(\arg\) | \(\tan^{-1}(b/a)\) ignores signs            | Always use \(\atantwo(b,a)\) or draw the point       |
| Sign error on \(i^2\) in multiplication | Mental carry-over from real algebra         | Replace \(i^2\) immediately after distribution       |
| Division by zero in polar form      | Modulus of denominator omitted              | Check \(r_2 \neq 0\) before subtracting arguments    |
| Mixing rectangular and polar mid-calculation | Switching forms without converting both numbers | Convert completely or stay in one form               |
| Losing the factor \(1/(c^2 + d^2)\) in rectangular division | Treating conjugate multiplication as final step | Always divide by the real denominator after conjugation |
| Assuming \(\arg(z_1 z_2) = \arg(z_1) + \arg(z_2)\) without principal-value adjustment | Arguments are defined modulo \(2\pi\)       | Reduce final argument to \((-\pi,\pi]\)              |
| Treating \(0\) as having undefined argument | Edge case at origin                         | Declare division by zero explicitly when \(r_2 = 0\) |

## 7. The textbook-precise statement
Let \(z_1 = a + bi\) and \(z_2 = c + di\) with \(a,b,c,d \in \mathbb{R}\). Then addition, subtraction, multiplication and division are given by the four displayed identities in Step 1–4 above. Equivalently, if \(z_k = r_k e^{i\theta_k}\) with \(r_k \ge 0\) and \(\theta_k \in (-\pi,\pi]\), multiplication and division obey the polar rules of Steps 5–6 provided \(r_2 \ne 0\) for division. (Ahlfors, *Complex Analysis*, 3rd ed., §1.1–1.2.)

## 8. Visual — diagram or schematic
```text
Imaginary
   ^
   |     (a,b)  · z = a+bi
   |        /
   |       / r
   |      /
   |     /
   |    /
   +------------------> Real
        (r,0)
```
Horizontal axis = real part, vertical axis = imaginary part. Polar radius \(r\) is Euclidean distance from origin; argument \(\theta\) is angle from positive real axis (counter-clockwise positive).

## 9. The memory technique
1. **The hook** — Picture multiplication as “stretch then spin”: the modulus stretches the arrow, the argument spins it.
2. **What to overlearn** — The four rectangular formulas and the two polar rules; also the conversion pair \(r = \sqrt{a^2+b^2}\), \(\theta = \atantwo(b,a)\).
3. **Spaced-repetition schedule** — Review the six operation formulas at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive rectangular multiplication by expanding \((a+bi)(c+di)\) and substituting \(i^2=-1\); re-derive polar multiplication from the exponential addition formula \(e^{i\alpha}e^{i\beta}=e^{i(\alpha+\beta)}\).

## 10. What this unlocks
Mastery of these operations is the prerequisite for every subsequent technique in complex analysis.  
- De Moivre’s theorem and integer powers  
- Extraction of nth roots via polar division by n  
- Exponential and logarithmic functions on \(\mathbb{C}\)  
- Cauchy–Riemann equations and analyticity tests  
- Contour integration and residue calculus  

## 11. Self-check — five questions, no answers
1. Compute \((2-3i)(2+3i)\) in rectangular form and verify the result is real.  
2. Convert \(-\sqrt{3}+i\) to polar form, then multiply by \(2e^{i\pi/3}\) and convert the product back to rectangular form.  
3. Without calculating, decide whether \((1+i)^4\) is positive real, negative real, or purely imaginary.  
4. Find the exact rectangular value of \(\frac{1}{1+i} + \frac{1}{1-i}\).  
5. A student computes \(\arg((1+i)(1-i)) = \arg(1+i) + \arg(1-i) = \pi/4 + (-\pi/4) = 0\), yet the product is 2 (positive real). Identify the hidden assumption that made the argument arithmetic appear to work.