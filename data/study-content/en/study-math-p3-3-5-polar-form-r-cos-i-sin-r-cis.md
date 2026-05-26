## 1. The one-sentence answer
**A complex number \(z = x + iy\) can be rewritten in polar form as \(z = r(\cos\theta + i\sin\theta)\), where \(r = |z|\) is the distance from the origin and \(\theta = \arg(z)\) is the angle from the positive real axis.**

This representation separates magnitude from direction. On the Argand plane every point sits at a unique distance \(r\) from zero; once that distance is fixed, the only remaining information is the direction in which the point lies, which trigonometry records through the cosine and sine of a single angle. The expression therefore converts the rectangular pair \((x, y)\) into the geometrically natural pair \((r, \theta)\).

The shorthand \(r\cdot\text{cis}\theta\) is simply an abbreviation that bundles the trigonometric pair; it does not change the underlying object.

> [!NOTE]
> The polar form makes multiplication and division of complex numbers into ordinary arithmetic on the moduli and addition or subtraction of the arguments; that single fact drives most later applications.

## 2. Why this matters — concrete and current
In aerospace guidance, the European Space Agency’s Rosetta mission used polar-form multiplication of quaternion increments to rotate the spacecraft’s attitude without accumulating rounding error in rectangular coordinates.  

Semiconductor designers at TSMC employ polar representations inside phase-locked-loop simulators; the magnitude tracks amplitude noise while the argument tracks jitter, allowing separate optimisation loops that rectangular coordinates entangle.  

Machine-learning libraries such as PyTorch implement complex-valued convolutions for MRI reconstruction; the polar form lets the network learn gain and phase-shift filters independently, improving signal-to-noise ratios on clinical scanners.  

In fundamental physics, the quantum-mechanical wave function of a free particle is routinely written \(re^{i\theta}\); the polar description isolates probability density \(r^2\) from local momentum \(\hbar\nabla\theta\), clarifying interference patterns observed at facilities such as Fermilab.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Cartesian plane          | Supplies the coordinates \(x\) and \(y\) that become \(r\cos\theta\) and \(r\sin\theta\). |
| Pythagorean distance     | Defines the modulus \(r = \sqrt{x^2 + y^2}\).             |
| Trigonometric definitions of sine and cosine | Convert the coordinates back from the angle \(\theta\).   |
| Radian measure           | Ensures the derivative identities and Euler’s formula hold without extra constants. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Locate the number on the plane
Every complex number \(z = x + iy\) corresponds to a unique point \((x, y)\) whose distance from the origin is fixed and whose direction is fixed.  
Example: \(3 + 4i\) sits at the point \((3, 4)\).  
Formally, the Argand diagram is the Euclidean plane \(\mathbb{R}^2\) with the vertical axis labelled “imaginary”.

> [!WARNING]
> Treating the imaginary axis as interchangeable with the real axis will invert the sign of every argument.

### Step 2 — Extract the modulus
The distance from the origin to \((x, y)\) is the non-negative real number \(r = \sqrt{x^2 + y^2}\).  
For \(3 + 4i\), \(r = 5\).  
Mathematically,
\[
r = |z| = \sqrt{x^2 + y^2}.
\]

> [!WARNING]
> Forgetting the absolute-value convention allows negative “moduli”, which break multiplication rules later.

### Step 3 — Extract the argument
The angle \(\theta\) between the positive real axis and the ray from the origin to \((x, y)\) satisfies
\[
\cos\theta = \frac{x}{r}, \quad \sin\theta = \frac{y}{r}.
\]
For the point \((3, 4)\), \(\theta = \arctan(4/3)\).  
Thus \(\theta = \arg(z)\).

> [!WARNING]
> Using \(\arctan(y/x)\) without quadrant correction yields arguments off by \(\pi\) in half the plane.

### Step 4 — Re-express the coordinates
Substitute the trigonometric relations back into the rectangular form:
\[
x = r\cos\theta, \quad y = r\sin\theta.
\]
Hence
\[
z = r\cos\theta + i r\sin\theta.
\]

### Step 5 — Factor out the modulus
The common factor \(r\) yields the compact polar expression
\[
z = r(\cos\theta + i\sin\theta).
\]

### Step 6 — Introduce the cis abbreviation
The notation \(\operatorname{cis}\theta := \cos\theta + i\sin\theta\) is defined purely for brevity, giving the final textbook shorthand
\[
z = r\cdot\operatorname{cis}\theta.
\]

## 5. Worked examples — every step shown

**Example 1 — Convert a simple rectangular number**  
*Given:* \(z = -1 + i\sqrt{3}\).  
*Find:* Polar form with \(r > 0\) and principal argument \(\theta \in (-\pi, \pi]\).  

- Compute modulus: \(r = \sqrt{(-1)^2 + (\sqrt{3})^2} = \sqrt{4} = 2\).  
  *Why:* Direct application of the distance formula.  
- Compute argument: \(\tan\theta = \sqrt{3}/(-1) = -\sqrt{3}\); point lies in quadrant II, so \(\theta = 2\pi/3\).  
  *Why:* Reference angle \(\pi/3\) adjusted by quadrant.  
- Assemble: \(z = 2(\cos(2\pi/3) + i\sin(2\pi/3))\).  

**Final answer**  
\[ \mathbf{2(\cos(2\pi/3) + i\sin(2\pi/3))} \]  

*Reflection:* The quadrant check is the only non-mechanical step; once mastered it generalises to every conversion.

**Example 2 — Convert from polar back to rectangular**  
*Given:* \(z = 5\operatorname{cis}(-\pi/6)\).  
*Find:* \(x + iy\).  

- Expand: \(x = 5\cos(-\pi/6) = 5\cdot\sqrt{3}/2\), \(y = 5\sin(-\pi/6) = -5/2\).  
  *Why:* Definition of cis.  
- Write rectangular form.  

**Final answer**  
\[ \mathbf{\dfrac{5\sqrt{3}}{2} - \dfrac{5}{2}i} \]  

*Reflection:* Negative angles simply flip the sign of the imaginary part; the arithmetic remains identical.

**Example 3 — Multiply two polar numbers**  
*Given:* \(z_1 = 2\operatorname{cis}(\pi/3)\), \(z_2 = 3\operatorname{cis}(\pi/4)\).  
*Find:* \(z_1 z_2\) in polar form.  

- Multiply moduli: \(r = 2\cdot3 = 6\).  
  *Why:* \(|z_1 z_2| = |z_1||z_2|\).  
- Add arguments: \(\theta = \pi/3 + \pi/4 = 7\pi/12\).  
  *Why:* \(\arg(z_1 z_2) = \arg(z_1) + \arg(z_2)\).  
- Result: \(6\operatorname{cis}(7\pi/12)\).  

**Final answer**  
\[ \mathbf{6\operatorname{cis}(7\pi/12)} \]  

*Reflection:* Polar multiplication replaces two multiplications and a subtraction with one multiplication and one addition.

**Example 4 — Find square roots**  
*Given:* Solve \(w^2 = 16i\).  
*Find:* Both roots in polar form.  

- Write right-hand side: \(16i = 16\operatorname{cis}(\pi/2)\).  
  *Why:* \(i = \operatorname{cis}(\pi/2)\).  
- Take square root of modulus: \(\sqrt{16} = 4\).  
- Halve argument and add period: \(\theta = \pi/4\) and \(\theta = \pi/4 + \pi\).  
- Roots: \(4\operatorname{cis}(\pi/4)\) and \(4\operatorname{cis}(5\pi/4)\).  

**Final answer**  
\[ \mathbf{4\operatorname{cis}(\pi/4),\quad 4\operatorname{cis}(5\pi/4)} \]  

*Reflection:* The period \(2\pi\) must be included before halving; omitting it loses one root.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using \(\arctan(y/x)\) blindly    | Ignores quadrant information                | Always test signs of \(x\) and \(y\) first   |
| Reporting negative \(r\)          | Confuses directed distance with modulus     | Enforce \(r \ge 0\) by definition            |
| Mixing degrees and radians        | Calculator default differs from mathematical convention | Explicitly set calculator to radians         |
| Forgetting principal-value interval | Multiple angles represent the same ray      | Restrict final \(\theta\) to \((-\pi,\pi]\)  |
| Writing \(\operatorname{cis}\theta\) without \(r\) | Treats the abbreviation as a full number    | Always attach the modulus explicitly         |
| Assuming \(\arg(z_1 z_2) = \arg(z_1) + \arg(z_2)\) without \(2\pi k\) adjustment | Branch cuts can shift by \(2\pi\)           | Verify result lies in chosen interval        |
| Confusing \(\operatorname{cis}\) with \(e^{i\theta}\) prematurely | Notation introduced before Euler’s formula  | Keep the trigonometric definition until later |

## 7. The textbook-precise statement
Let \(z = x + iy\) with \(x, y \in \mathbb{R}\). Define the modulus \(r = |z| = \sqrt{x^2 + y^2}\) and an argument \(\theta\) satisfying \(\cos\theta = x/r\), \(\sin\theta = y/r\) whenever \(r > 0\). Then
\[
z = r(\cos\theta + i\sin\theta) = r\cdot\operatorname{cis}\theta.
\]
Any other valid argument differs from \(\theta\) by an integer multiple of \(2\pi\). (See Stewart, *Calculus*, 9e, §3.4, or Churchill & Brown, *Complex Variables and Applications*, 9e, §1.4.)

## 8. Visual — diagram or schematic
```text
          Im
           ^
           |     * P(x,y)
           |    /|
           |   / |  r
           |  /  |
           | /   |
           |/ θ  |
    -------+-----------→ Re
           0
```
Point \(P\) has Cartesian coordinates \((x, y)\). The line segment from origin to \(P\) has length \(r\). The angle between the positive real axis and segment \(OP\) is \(\theta\).

## 9. The memory technique

1. **The hook**  
   Picture a ruler (\(r\)) pointing like a clock hand at angle \(\theta\); the tip of the ruler lands exactly on the complex number. The letters “cis” are the first letters of the two trig functions that give the coordinates of the tip.

2. **What to overlearn**  
   - \(r = |z|\) and \(\theta = \arg(z)\)  
   - \(z = r(\cos\theta + i\sin\theta)\)  
   - Modulus multiplies, argument adds under multiplication

3. **Spaced-repetition schedule**  
   Review at 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback**  
   Re-derive from Pythagoras: \(r^2 = x^2 + y^2\), then divide by \(r\) to obtain the cosine and sine ratios.

## 10. What this unlocks
Polar form is the gateway to efficient arithmetic in the complex plane. It immediately yields De Moivre’s theorem for powers and roots, the factorisation of polynomials over \(\mathbb{C}\), and the representation of rotations in physics and engineering. Subsequent topics that rest directly on it include:  
- multiplication and division of complex numbers,  
- finding \(n\)th roots via argument division,  
- exponential form \(re^{i\theta}\) and Euler’s formula,  
- Fourier-series coefficients written as inner products with cisines.

## 11. Self-check — five questions, no answers
1. Convert \(-\sqrt{3} - i\) to polar form with principal argument.  
2. Multiply \(2\operatorname{cis}(5\pi/6)\) by \(3\operatorname{cis}(-\pi/3)\) and express the result in rectangular form.  
3. Find the three cube roots of \(8i\) in polar form.  
4. Explain why \(\arg(z_1/z_2) = \arg(z_1) - \arg(z_2)\) holds only up to multiples of \(2\pi\).  
5. A student writes \(r = -2\) for the modulus of \(-1 - i\). Identify the conceptual error and correct it.