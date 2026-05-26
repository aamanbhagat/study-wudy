## 1. The one-sentence answer
**Euler's formula asserts that \(e^{i\theta}=\cos\theta+i\sin\theta\) for every real \(\theta\).**

The equality arises because the power series that defines the exponential function, when evaluated at a purely imaginary number, splits cleanly into two real series that are already known to be the Taylor expansions of cosine and sine. The only algebraic ingredient required is the rule \(i^2=-1\), which cycles the powers of \(i\) through the four values \(1,i,-1,-i\) and thereby separates the series into real and imaginary parts.

Once the separation is performed, the remaining coefficients match the Taylor coefficients of \(\cos\theta\) and \(\sin\theta\) term by term. The identity therefore holds wherever the three series converge, which is everywhere on the real line.

> [!NOTE]
> The single algebraic fact \(i^2=-1\) is enough to turn an abstract exponential into the geometry of the unit circle.

## 2. Why this matters — concrete and current
In modern phased-array radar systems, such as those used by SpaceX’s Starlink satellites, beam steering is performed by multiplying a carrier wave by \(e^{i\theta}\) where \(\theta\) encodes the required phase shift; the formula converts the abstract multiplier into an immediate pair of amplitude weights \(\cos\theta\) and \(\sin\theta\) that are applied to in-phase and quadrature modulators.

Inside the FFT cores of every smartphone’s baseband processor, the Cooley–Tukey algorithm repeatedly evaluates twiddle factors \(e^{2\pi i k/N}\). Hardware designers replace each complex exponential with a single lookup of cosine and sine, cutting multiplier count by half and saving both power and silicon area.

Quantum-control firmware on IBM’s superconducting processors applies microwave pulses whose envelope is shaped by \(e^{i\omega t}\). Calibration routines rely on the formula to translate intended rotation angles directly into the voltages delivered to the arbitrary-waveform generators.

In inertial-navigation units inside Boeing 787 aircraft, the strapdown algorithm integrates angular velocity by exponentiating a small rotation vector \(\boldsymbol{\omega}\Delta t\). The exponential map is evaluated with the same formula, converting the vector into an exact unit quaternion without trigonometric function calls at every micro-step.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Taylor series at 0       | Supplies the unique power-series definitions of \(e^x\), \(\sin x\), and \(\cos x\) |
| Arithmetic of \(i\)      | The relation \(i^2=-1\) produces the four-cycle that separates real and imaginary parts |
| Radius of convergence    | Guarantees that all three series converge for every real \(\theta\) |

## 4. Building the idea — from intuition to formalism

### Step 1 — The exponential series is defined everywhere
The function \(e^z\) is introduced by its power series; the series converges for every complex number, so it certainly converges for every purely imaginary argument \(i\theta\).

**Concrete example.**  
When \(\theta=0\), the series reduces to the single term 1, which equals \(e^0\).

$$
e^z=\sum_{n=0}^\infty\frac{z^n}{n!}
$$

> [!WARNING]
> If the series were assumed to converge only for real \(z\), the entire substitution would be illegitimate.

### Step 2 — Substitute the imaginary argument
Replace \(z\) by \(i\theta\).

$$
e^{i\theta}=\sum_{n=0}^\infty\frac{(i\theta)^n}{n!}
$$

### Step 3 — Expand the powers of \(i\)
The powers of \(i\) repeat every four steps: \(i^0=1\), \(i^1=i\), \(i^2=-1\), \(i^3=-i\), \(i^4=1\), and so on. Split the sum into even and odd indices.

### Step 4 — Separate real and imaginary parts
Even terms (\(n=2k\)) are real; odd terms (\(n=2k+1\)) are imaginary. Factor out the appropriate powers of \(\theta\).

$$
e^{i\theta}=\sum_{k=0}^\infty\frac{(-1)^k\theta^{2k}}{(2k)!}+i\sum_{k=0}^\infty\frac{(-1)^k\theta^{2k+1}}{(2k+1)!}
$$

> [!WARNING]
> Forgetting to alternate the sign when \(i^{2k}=-1\) produces an incorrect series that does not match cosine.

### Step 5 — Recognize the Taylor series of cosine and sine
The first sum is exactly the Taylor series of \(\cos\theta\); the second is the Taylor series of \(\sin\theta\).

### Step 6 — Write the compact statement
The separated series are therefore identical to \(\cos\theta+i\sin\theta\).

$$
e^{i\theta}=\cos\theta+i\sin\theta
$$

## 5. Worked examples — every step shown

**Example 1 — Zero angle**  
*Given:* \(\theta=0\).  
*Find:* \(e^{i\cdot0}\).  

Substitute into the series:  
$$
e^{0}=\sum_{n=0}^\infty\frac{0^n}{n!}=1.
$$  
*Why:* Every term with positive \(n\) vanishes.  

Recognize \(\cos0=1\) and \(\sin0=0\):  
$$
\cos0+i\sin0=1+i\cdot0=1.
$$  
**1**  

*Reflection:* The trivial case confirms that both sides agree at the origin; it also shows that the constant term is handled correctly.

**Example 2 — Right angle**  
*Given:* \(\theta=\pi/2\).  
*Find:* \(e^{i\pi/2}\).  

Even part:  
$$
\sum_{k=0}^\infty\frac{(-1)^k(\pi/2)^{2k}}{(2k)!}=0
$$  
(only the \(k=0\) term survives and equals 1, but higher terms cancel in the cosine series at \(\pi/2\)).  

Odd part:  
$$
\sum_{k=0}^\infty\frac{(-1)^k(\pi/2)^{2k+1}}{(2k+1)!}=1.
$$  
*Why:* The series for sine at \(\pi/2\) equals 1.  

Thus  
$$
e^{i\pi/2}=0+i\cdot1=i.
$$  
**i**  

*Reflection:* The calculation isolates the imaginary unit itself and verifies the sign pattern produced by \(i^{2k+1}\).

**Example 3 — Straight angle**  
*Given:* \(\theta=\pi\).  
*Find:* \(e^{i\pi}\).  

Both series become the familiar alternating expansions: cosine yields \(-1\), sine yields 0.  
**-1**  

*Reflection:* The result \(e^{i\pi}=-1\) is the seed of Euler’s identity; any sign error in the even powers would have produced \(+1\).

**Example 4 — Arbitrary symbolic angle**  
*Given:* symbolic \(\theta\).  
*Find:* the general identity.  

Write the exponential series, replace \(i^n\) by its four-cycle values, regroup, and match coefficients with the known Taylor series of cosine and sine. The equality follows term by term.  
**e^{i\theta}=\cos\theta+i\sin\theta**  

*Reflection:* The symbolic case demonstrates that the proof never uses a special property of any particular angle.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating \(i\) as a real variable | Forgetting \(i\) is not on the number line  | Always replace \(i^2\) by \(-1\) explicitly  |
| Sign error in even powers         | Miscounting the exponent when \(i^{2k}=-1\) | Write the first four powers of \(i\) as a table before regrouping |
| Confusing radius of convergence   | Believing complex series converge only inside a disk | Recall that the exponential series has infinite radius |
| Differentiating under the sum without justification | Assuming term-by-term differentiation is automatic | Verify uniform convergence on compact sets first |
| Writing \(\sin(i\theta)\) instead of \(\sin\theta\) | Mixing the argument of sine with the imaginary unit | Keep \(\theta\) real and outside the trigonometric function |
| Dropping the factorial in the denominator | Copying the geometric series by mistake     | Re-derive the coefficient \(\frac{1}{n!}\) from the differential equation each time |
| Assuming the formula defines a new function | Treating Euler’s formula as a definition rather than a theorem | Always begin from the three independent Taylor series |

## 7. The textbook-precise statement
Let \(\theta\in\mathbb{R}\). The functions \(e^z\), \(\cos\theta\), and \(\sin\theta\) are defined by their Taylor series about the origin. Then
$$
e^{i\theta}=\sum_{n=0}^\infty\frac{(i\theta)^n}{n!}=\cos\theta+i\sin\theta.
$$
(The identity extends by analytic continuation to all complex \(\theta\), but the real case is sufficient for the present development.) See Rudin, *Principles of Mathematical Analysis*, 3rd ed., Theorem 8.8 and Exercise 8.22.

## 8. Visual — diagram or schematic
```text
Imaginary axis
      ^
      |     e^{iθ} = cosθ + i sinθ
      |        ↗
      |       /|
      |      / |
      |     /  |
      |    /   | sinθ
      |   /    |
      |  /     |
      | /      |
------+---------> Real axis
      |   cosθ
```
The point \((\cos\theta,\sin\theta)\) lies on the unit circle; multiplying by the complex number \(e^{i\theta}\) rotates any vector counterclockwise by angle \(\theta\).

## 9. The memory technique
1. **The hook** — Picture the letter “e” wearing a tiny propeller that spins exactly once when the angle reaches \(2\pi\); the propeller’s height is cosine and its sideways tilt is sine.
2. **What to overlearn** — The four-cycle \(i^0=1\), \(i^1=i\), \(i^2=-1\), \(i^3=-i\); the two series for \(\cos\theta\) and \(\sin\theta\); the compact statement \(e^{i\theta}=\cos\theta+i\sin\theta\).
3. **Spaced-repetition schedule** — Review the four-cycle and the compact statement after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Re-expand the exponential series, replace each power of \(i\) by its cycle value, and regroup even and odd terms.

## 10. What this unlocks
Euler’s formula is the gateway from elementary complex arithmetic to the full power of complex analysis and its applications in physics and engineering.

- De Moivre’s theorem and multiple-angle formulas follow by raising both sides to integer powers.
- Fourier series and the Fourier transform are obtained by integrating \(e^{i n x}\) against a function.
- The exponential map on the Lie algebra \(\mathfrak{so}(2)\) yields rotations in the plane.
- Phasor notation in AC circuit theory replaces every sinusoid by a complex exponential whose real part is taken at the end of the calculation.

## 11. Self-check — five questions, no answers
1. Write the Taylor series for \(e^{i\theta}\) up to order 5 and separate the real and imaginary parts explicitly.
2. Using only the series definition, prove that \(\frac{d}{d\theta}e^{i\theta}=i e^{i\theta}\).
3. Evaluate \(e^{i 3\pi/2}\) both by the formula and by direct substitution into the series; confirm numerical agreement to four decimal places.
4. Identify the precise step at which the assumption that \(\theta\) is real is used; what would change if \(\theta\) were allowed to be complex?
5. Suppose a student claims that \(e^{i\theta}=\cos(i\theta)+i\sin(i\theta)\). Produce a concrete numerical counter-example that refutes the claim.