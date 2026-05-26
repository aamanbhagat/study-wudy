## 1. The one-sentence answer
**A complex number \(z = a + bi\) with \(a, b \in \mathbb{R}\) has real part \(a\) and imaginary part \(b\), extracted by the linear projections \(\operatorname{Re}(z) = a\) and \(\operatorname{Im}(z) = b\).**

Any complex number is an ordered pair of real numbers packaged together with the rule \(i^2 = -1\). The first coordinate of that pair is called the real part; the second is called the imaginary part. These two real numbers completely determine the complex number, just as two coordinates determine a point in the plane. Because addition and scalar multiplication act componentwise, the real and imaginary parts behave like independent coordinates under these operations.

The symbols \(\operatorname{Re}\) and \(\operatorname{Im}\) are therefore not arbitrary labels; they are the unique real-valued functions that recover the two coordinates from the single symbol \(z\). Once these functions are defined, every algebraic identity involving complex numbers can be rewritten as two separate real-number identities, one for each part.

> [!NOTE]
> The imaginary part is the real coefficient \(b\), never the term \(bi\); forgetting this produces sign errors the moment \(i\) is factored out.

## 2. Why this matters — concrete and current
In electrical engineering, impedance of an AC circuit is the complex number \(R + Xi\). The real part \(R\) is resistance; the imaginary part \(X\) is reactance. Power companies and chip designers at Texas Instruments extract these parts to compute average power dissipation without simulating every oscillation.

In quantum mechanics, the state vector of a qubit on IBM’s superconducting hardware is \(\alpha + \beta i\). Measurement probabilities are \(|\alpha|^2\) and \(|\beta|^2\), so the real and imaginary parts must be read out to high precision after each gate; calibration routines at IBM Quantum explicitly separate them to correct phase errors.

In machine-learning accelerators, NVIDIA’s cuFFT library performs Fourier transforms on signals by treating each frequency bin as a complex number. The real and imaginary parts correspond to cosine and sine amplitudes; separating them allows the same hardware kernels to compute both convolution and spectral filtering.

In aerospace guidance, the rotation of a spacecraft attitude quaternion is represented by a unit complex number when restricted to planar motion. JPL’s Deep Space Network extracts the real and imaginary parts after each phase-locked loop update to obtain instantaneous rotation angle and angular velocity.

In semiconductor metrology, ASML’s EUV scanners model wavefront aberrations as complex-valued Zernike polynomials. The real and imaginary parts of each coefficient are fitted separately to interferometric data, enabling sub-nanometer overlay corrections on every wafer.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Real numbers and field axioms | Supply the coefficients \(a\) and \(b\) and guarantee uniqueness of the decomposition |
| Definition of \(i\) with \(i^2 = -1\) | Distinguishes the imaginary direction from the real direction |
| Ordered-pair representation of \(\mathbb{C}\) | Makes the projection onto each coordinate a well-defined function |

## 4. Building the idea — from intuition to formalism

### Step 1 — Every complex number is an ordered pair of reals
A complex number is not a single mysterious quantity; it is two ordinary real numbers written side by side.  
Example: the symbol \(3 + 4i\) stands for the ordered pair \((3, 4)\).  
Formally, \(\mathbb{C} = \mathbb{R} \times \mathbb{R}\) with the operations \((a,b) + (c,d) = (a+c, b+d)\) and \((a,b)\cdot(c,d) = (ac-bd, ad+bc)\).  
> [!WARNING] Treating \(3 + 4i\) as one indivisible atom prevents you from using componentwise arithmetic later.

### Step 2 — The two coordinates receive distinct names
The first coordinate is called the real part; the second is called the imaginary part.  
Example: for the pair \((3,4)\), the real part is 3 and the imaginary part is 4.  
Formally, if \(z = (a,b)\), then \(\operatorname{Re}(z) := a\) and \(\operatorname{Im}(z) := b\).  
> [!WARNING] Writing \(\operatorname{Im}(z) = 4i\) instead of 4 immediately breaks every subsequent formula that expects a real number.

### Step 3 — The decomposition \(z = \operatorname{Re}(z) + i \operatorname{Im}(z)\) is unique
Suppose \(z = a + bi = c + di\). Then \((a-c) + (b-d)i = 0\), so both real coefficients vanish by linear independence of 1 and \(i\).  
Example: if \(5 + 2i = x + yi\), then necessarily \(x = 5\) and \(y = 2\).  
Formally, the map \(z \mapsto (\operatorname{Re}(z), \operatorname{Im}(z))\) is a bijection.  
> [!WARNING] Assuming two different pairs could represent the same \(z\) leads to contradictions with the field axioms.

### Step 4 — Real and imaginary parts are linear projections
Because addition and real-scalar multiplication act separately on each coordinate, both \(\operatorname{Re}\) and \(\operatorname{Im}\) are linear maps from \(\mathbb{C}\) to \(\mathbb{R}\).  
Example: \(\operatorname{Re}((2+3i) + (4- i)) = \operatorname{Re}(6+2i) = 6 = 2+4\).  
Formally, \(\operatorname{Re}(\alpha z + w) = \alpha\operatorname{Re}(z) + \operatorname{Re}(w)\) for \(\alpha \in \mathbb{R}\).  
> [!WARNING] Extending linearity to complex scalars fails; \(\operatorname{Re}(i z) = -\operatorname{Im}(z)\), not \(i\operatorname{Re}(z)\).

### Step 5 — The textbook definition
For any \(z \in \mathbb{C}\), there exist unique real numbers \(\operatorname{Re}(z)\) and \(\operatorname{Im}(z)\) such that \(z = \operatorname{Re}(z) + i \operatorname{Im}(z)\).

## 5. Worked examples — every step shown

**Example 1 — Direct identification**  
*Given:* \(z = -7 + 5i\).  
*Find:* \(\operatorname{Re}(z)\) and \(\operatorname{Im}(z)\).  
Write \(z = a + bi\) and match coefficients: \(a = -7\), \(b = 5\).  
*Why* The definition states that the coefficient of 1 is the real part and the coefficient of \(i\) is the imaginary part.  
**\(\operatorname{Re}(z) = -7\), \(\operatorname{Im}(z) = 5\)**  
*Reflection* The example is trivial, yet it forces explicit recognition that the imaginary part is the real number multiplying \(i\).

**Example 2 — After addition**  
*Given:* \(z_1 = 2 - 3i\), \(z_2 = 4 + 7i\).  
*Find:* \(\operatorname{Re}(z_1 + z_2)\) and \(\operatorname{Im}(z_1 + z_2)\).  
Add componentwise: \((2+4) + (-3+7)i = 6 + 4i\).  
*Why* Addition in \(\mathbb{C}\) is defined coordinatewise, so the real part of the sum equals the sum of the real parts.  
**\(\operatorname{Re}(z_1 + z_2) = 6\), \(\operatorname{Im}(z_1 + z_2) = 4\)**  
*Reflection* Linearity of Re and Im is used implicitly; the same result follows from applying the functions after addition.

**Example 3 — After multiplication by \(i\)**  
*Given:* \(z = 3 + 4i\).  
*Find:* \(\operatorname{Re}(i z)\) and \(\operatorname{Im}(i z)\).  
Compute \(i z = i(3 + 4i) = 3i + 4i^2 = -4 + 3i\).  
*Why* The rule \(i^2 = -1\) converts the product into standard form so the coefficients can be read off.  
**\(\operatorname{Re}(i z) = -4\), \(\operatorname{Im}(i z) = 3\)**  
*Reflection* Multiplication by \(i\) rotates the pair \((3,4)\) to \((-4,3)\); the parts swap and one sign flips.

**Example 4 — Solving an equation**  
*Given:* Find all real \(x, y\) such that \((x + yi)(1 + 2i) = 5 - i\).  
*Find:* The values of \(x\) and \(y\).  
Expand: \(x + 2xi + yi + 2yi^2 = (x - 2y) + (2x + y)i = 5 - i\).  
Equate parts: \(x - 2y = 5\) and \(2x + y = -1\).  
Solve the linear system: multiply second equation by 2 and add to first to obtain \(5x = 3\), hence \(x = 3/5\), \(y = -1 - 6/5 = -11/5\).  
*Why* Equality of complex numbers means equality of both real and imaginary parts.  
**\(x = 3/5\), \(y = -11/5\)**  
*Reflection* The system is always solvable because multiplication by a nonzero complex number is bijective on \(\mathbb{R}^2\).

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Writing \(\operatorname{Im}(z) = bi\) | Confusing the term with its coefficient | Always state “the imaginary part is the real number \(b\)” |
| Assuming \(\operatorname{Re}(z_1 z_2) = \operatorname{Re}(z_1)\operatorname{Re}(z_2)\) | Over-generalising real-number multiplication | Expand the product and collect terms each time |
| Treating \(\operatorname{Re}\) as \(\mathbb{C}\)-linear | Forgetting that \(i\) rotates the plane | Remember \(\operatorname{Re}(i z) = -\operatorname{Im}(z)\) |
| Forgetting uniqueness when solving \(a + bi = c + di\) | Thinking complex equations have “degrees of freedom” | Immediately equate both parts; the system is determined |
| Using \(\operatorname{Im}(z)\) inside a real formula without checking units | Treating the imaginary part as carrying an \(i\) | Strip the \(i\) before inserting into real expressions |
| Confusing \(\operatorname{Re}(1/z)\) with \(1/\operatorname{Re}(z)\) | Algebraic reflex from real numbers | Rationalise: \(\operatorname{Re}(1/z) = \operatorname{Re}(\bar z)/|z|^2\) |
| Sign error after multiplication by \(i\) | Rotating clockwise instead of counterclockwise | Always compute \(i(a + bi) = -b + ai\) explicitly |

## 7. The textbook-precise statement
Let \(\mathbb{C}\) be the field of complex numbers. For each \(z \in \mathbb{C}\) there exist unique real numbers \(\operatorname{Re}(z)\) and \(\operatorname{Im}(z)\) such that \(z = \operatorname{Re}(z) + i \operatorname{Im}(z)\). The functions \(\operatorname{Re},\operatorname{Im}:\mathbb{C}\to\mathbb{R}\) are the unique field homomorphisms from \(\mathbb{C}\) onto \(\mathbb{R}\) that fix \(\mathbb{R}\) pointwise and satisfy \(\operatorname{Im}(i)=1\). (Ahlfors, *Complex Analysis*, 3rd ed., §1.1.)

## 8. Visual — diagram or schematic
```text
Imaginary axis
      ^
      |     * z = a + bi
      |    /|
      |   / |
   b  |  /  |
      | /   |
      |/    |
------+-----+------> Real axis
      |     a
```
The point \(z\) is located at Cartesian coordinates \((a,b)\). The horizontal arrow extracts the real part \(a\); the vertical arrow extracts the imaginary part \(b\).

## 9. The memory technique

1. **The hook** — Picture the complex plane as a city grid: avenues run east-west (real) and streets run north-south (imaginary). The address of \(z\) is “Avenue \(a\), Street \(b\)”; Re reads the avenue number, Im reads the street number.
2. **What to overlearn** — \(z = \operatorname{Re}(z) + i\operatorname{Im}(z)\); both Re and Im return real numbers; \(\operatorname{Re}(i z) = -\operatorname{Im}(z)\).
3. **Spaced-repetition schedule** — Review the definition after 1 day, again after 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Rebuild by writing \(z = x + yi\) with \(x,y\in\mathbb{R}\), then declare \(\operatorname{Re}(z):=x\) and \(\operatorname{Im}(z):=y\).

## 10. What this unlocks
Once real and imaginary parts are second nature, every subsequent operation—conjugation, modulus, argument, polar form, De Moivre’s theorem, analytic functions—factors into separate real statements about these two coordinates.

- Conjugate: \(\overline{a+bi}=a-bi\)
- Modulus: \(|z|=\sqrt{\operatorname{Re}(z)^2+\operatorname{Im}(z)^2}\)
- Argument: \(\tan\theta=\operatorname{Im}(z)/\operatorname{Re}(z)\)
- Cauchy–Riemann equations in complex analysis
- Real and imaginary parts of holomorphic functions are harmonic

## 11. Self-check — five questions, no answers
1. If \(z = 2 - 5i\), compute \(\operatorname{Re}(z^2)\) without first expanding \(z^2\).
2. Find all real \(x,y\) such that \(\operatorname{Re}((x+yi)^2) = \operatorname{Im}((x+yi)^2)\).
3. Prove that \(\operatorname{Re}(z w) = \operatorname{Re}(z)\operatorname{Re}(w) - \operatorname{Im}(z)\operatorname{Im}(w)\).
4. Suppose \(\operatorname{Re}(z) = \operatorname{Im}(z)\). What geometric locus does \(z\) trace in the plane?
5. Let \(z = a + bi\) with \(a,b > 0\). Which quadrant does \(i z\) occupy, and how are its real and imaginary parts related to those of \(z\)?