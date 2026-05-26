## 1. The one-sentence answer
**Algebraic operations on complex numbers let you add, subtract, multiply and divide them either by treating them as vectors in the plane (rectangular form) or by using magnitude and angle (polar form).**

Rectangular form writes every complex number as \(z = a + bi\) where \(a\) and \(b\) are real. Addition and subtraction simply combine the real parts and the imaginary parts separately. Multiplication uses the distributive law and replaces every \(i^2\) with \(-1\). Division requires multiplying numerator and denominator by the conjugate so the denominator becomes real.

Polar form writes the same number as \(z = r(\cos\theta + i\sin\theta)\) or \(re^{i\theta}\). Here multiplication becomes scaling the moduli and adding the arguments; division becomes dividing the moduli and subtracting the arguments. The two representations are equivalent; you choose the one that makes the arithmetic shortest.

> [!NOTE]
> The single deepest insight is that multiplication in polar form is just a scaling plus a rotation; this geometric fact turns every algebraic identity into a statement about lengths and angles.

## 2. Why this matters — concrete and current
In RF engineering, Qualcomm’s 5G modems represent every baseband sample as a complex number in polar form so that phase-shift keying reduces to a single complex multiplication per symbol.  

In MRI machines, Siemens and GE scanners store k-space data as complex values; the FFT that reconstructs the image performs millions of complex multiplications and additions every second, all executed in polar-rectangular conversions inside the DSP pipeline.  

In computer graphics, every rotation of a 2-D sprite inside Unity or Unreal is performed by multiplying the vertex coordinates (treated as complex numbers) by \(e^{i\theta}\); the polar multiplication replaces four real multiplications and two additions with two multiplications and one addition.  

In quantum computing, IBM’s Qiskit represents single-qubit gates as \(2\times2\) complex matrices; composing two gates is matrix multiplication of complex entries, which the compiler optimises by converting to polar form before multiplying moduli and adding phases.  

In control theory, NASA’s attitude-determination algorithms for satellites track the orientation quaternion as a complex number on the unit circle; polar division instantly yields the corrective rotation angle needed to null the error.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Real-number arithmetic   | All coefficients and moduli are real numbers              |
| Pythagorean theorem      | Modulus \(r = \sqrt{a^2+b^2}\) comes directly from it     |
| Trigonometric identities | Conversion formulas use \(\cos\theta = a/r\), \(\sin\theta = b/r\) |
| Laws of exponents        | \(e^{i(\theta_1+\theta_2)} = e^{i\theta_1}e^{i\theta_2}\) underpins polar multiplication |

If any row above feels shaky, pause and review that single concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Rectangular addition and subtraction
Treat the real and imaginary parts as two independent real numbers.  
Example: \((3+4i)+(5-2i)=8+2i\).  
Formal rule:  
$$(a+bi)+(c+di)=(a+c)+(b+d)i.$$  
> [!WARNING]  
> Forgetting to distribute the minus sign when subtracting produces the single most common sign error.

### Step 2 — Rectangular multiplication
Expand using distributivity and replace \(i^2\) by \(-1\).  
Example: \((3+4i)(5-2i)=15-6i+20i-8i^2=23+14i\).  
Formal rule:  
$$(a+bi)(c+di)=(ac-bd)+(ad+bc)i.$$  
> [!WARNING]  
> Losing the minus sign in the real part (\(ac-bd\)) is the usual algebraic slip.

### Step 3 — Rectangular division via conjugate
Multiply numerator and denominator by the conjugate of the denominator so the new denominator is real.  
Formal rule:  
$$\frac{a+bi}{c+di}=\frac{(a+bi)(c-di)}{c^2+d^2}.$$  
> [!WARNING]  
> Division by zero occurs exactly when both \(c\) and \(d\) are zero; students sometimes forget to check this.

### Step 4 — Conversion from rectangular to polar
Compute modulus \(r=\sqrt{a^2+b^2}\) and argument \(\theta=\atantwo(b,a)\).  
Formal:  
$$a+bi=r(\cos\theta+i\sin\theta),\qquad r>0.$$  
> [!WARNING]  
> The two-argument arctangent must be used; a plain \(\arctan(b/a)\) loses quadrant information.

### Step 5 — Polar multiplication and division
Multiply moduli and add (or subtract) arguments:  
$$r_1(\cos\theta_1+i\sin\theta_1)\cdot r_2(\cos\theta_2+i\sin\theta_2)=r_1r_2(\cos(\theta_1+\theta_2)+i\sin(\theta_1+\theta_2)).$$  
Division is analogous.  
> [!WARNING]  
> Adding angles in degrees when one number is in radians produces nonsense; always keep units consistent.

### Step 6 — Conversion back from polar to rectangular
Apply cosine and sine to recover the real and imaginary parts:  
$$r(\cos\theta+i\sin\theta)=r\cos\theta+ri\sin\theta.$$  
This closes the loop between the two forms.

### Step 7 — Textbook-grade statement
A complex number \(z\) may be written \(z=x+yi\) or \(z=re^{i\theta}\) with \(r=|z|\) and \(\theta=\arg z\). The field operations are uniquely determined by the usual rules of real arithmetic together with \(i^2=-1\) in rectangular form, or by  
$$r_1e^{i\theta_1}\cdot r_2e^{i\theta_2}=r_1r_2e^{i(\theta_1+\theta_2)}$$  
in polar form.

## 5. Worked examples — har step show karo

**Example 1 — Simple rectangular addition**  
*Given:* \(z_1=2+3i\), \(z_2=4-5i\).  
*Find:* \(z_1+z_2\).  
Add real parts: \(2+4=6\). Add imaginary parts: \(3+(-5)=-2\).  
*Why*: Parts are independent.  
**Final answer** \(6-2i\).

**Example 2 — Rectangular multiplication**  
*Given:* \(z_1=1+i\), \(z_2=2-3i\).  
*Find:* \(z_1z_2\).  
Real part: \(1\cdot2-1\cdot(-3)=2+3=5\). Imaginary part: \(1\cdot(-3)+1\cdot2=-3+2=-1\).  
*Why*: Distribute and apply \(i^2=-1\).  
**Final answer** \(5-i\).

**Example 3 — Rectangular division**  
*Given:* \(z=\frac{3+6i}{1-i}\).  
*Find:* Quotient.  
Multiply numerator and denominator by conjugate \(1+i\):  
Numerator \((3+6i)(1+i)=3+3i+6i+6i^2=3+9i-6=-3+9i\).  
Denominator \(1+1=2\).  
Divide: \(-3/2+9/2i\).  
*Why*: Conjugate makes denominator real.  
**Final answer** \(-\frac{3}{2}+\frac{9}{2}i\).

**Example 4 — Polar multiplication after conversion**  
*Given:* \(z_1=1+i\), \(z_2=-1+i\).  
*Find:* \(z_1z_2\) using polar form.  
\(r_1=\sqrt{2}\), \(\theta_1=\pi/4\); \(r_2=\sqrt{2}\), \(\theta_2=3\pi/4\).  
Product modulus \(\sqrt{2}\cdot\sqrt{2}=2\), argument \(\pi/4+3\pi/4=\pi\).  
**Final answer** \(2(\cos\pi+i\sin\pi)=-2\).

*Reflection*: The last example shows how polar form collapses four real multiplications into two plus an angle addition.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using \(\arctan(b/a)\) instead of \(\atantwo\) | Forgetting quadrant                         | Always call the two-argument arctangent      |
| Losing the minus sign in \(ac-bd\) | Distributivity slip                         | Write the formula explicitly each time       |
| Adding angles in mixed units      | One angle in degrees, one in radians        | Convert to same unit before operating        |
| Dividing by zero                  | Not checking denominator modulus            | Compute \(|c+di|\) first                     |
| Forgetting to multiply both parts by conjugate | Rushing the division step                 | Write the conjugate multiplication line      |
| Rounding \(r\) too early          | Premature decimal approximation             | Keep exact radical form until final answer   |
| Confusing \(\arg(z_1/z_2)\) with \(\arg z_1-\arg z_2\) when \(z_2\) is negative | Branch-cut issues                         | Draw the vectors on the plane first          |

## 7. The textbook-precise statement
A complex number may be expressed in rectangular form \(z=x+yi\) or polar form \(z=re^{i\theta}\) where \(r=|z|=\sqrt{x^2+y^2}\) and \(\theta=\arg z\). The four arithmetic operations are defined by the field axioms together with the relation \(i^2=-1\). In polar form they reduce to  
$$(r_1e^{i\theta_1})(r_2e^{i\theta_2})=r_1r_2e^{i(\theta_1+\theta_2)},\qquad\frac{r_1e^{i\theta_1}}{r_2e^{i\theta_2}}=\frac{r_1}{r_2}e^{i(\theta_1-\theta_2)}$$  
provided \(r_2\neq0\). (Churchill & Brown, *Complex Variables and Applications*, 9e, §1.3–1.4.)

## 8. Visual — diagram or schematic
```
Imaginary
   ^
   |     (r,θ)  · z = r(cosθ + i sinθ)
   |        /
   |      / θ
   |    /
   +--/---------→ Real
      0
```
The point \(z\) lies at distance \(r\) from origin at angle \(\theta\) measured counterclockwise from positive real axis.

## 9. The memory technique

1. **The hook** — Picture multiplication as “stretch then twist”: the modulus stretches the arrow, the argument twists it.  
2. **What to overlearn** — The two polar rules: moduli multiply/divide, arguments add/subtract.  
3. **Spaced-repetition schedule** — Review the polar multiplication formula after 1 day, 3 days, 7 days, 16 days and 35 days.  
4. **First-principles fallback** — If you forget the formula, convert both numbers to rectangular, multiply with \(i^2=-1\), then convert the result back to polar; the pattern immediately reappears.

## 10. What this unlocks
Once these operations are fluent you can move directly into De Moivre’s theorem, roots of unity, and the complex exponential form that underpins Fourier analysis.

- Next topic: powers and roots via De Moivre  
- Subsequent: Euler’s formula and series expansions  
- Later: analytic functions and Cauchy–Riemann equations  

## 11. Self-check — five questions, no answers
1. Compute \((2-3i)(4+5i)\) in rectangular form.  
2. Convert \(-\sqrt{3}+i\) to polar form with argument in \((-\pi,\pi]\).  
3. Evaluate \(\frac{1+i}{1-i}\) and express the answer with positive real part.  
4. Without calculating the rectangular product, find the modulus of \((3+4i)(5-12i)\).  
5. A student claims that \(\arg(z_1/z_2)=\arg z_1/\arg z_2\); construct a concrete counter-example with two non-real numbers.