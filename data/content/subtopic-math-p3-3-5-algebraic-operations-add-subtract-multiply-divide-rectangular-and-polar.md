## What it is
Algebraic operations on complex numbers are the rules for combining 2D numbers. In rectangular form ($z = a + bi$), you treat them as standard binomials where the imaginary unit squared is negative one ($i^2 = -1$). In polar form ($z = r e^{i\theta}$), you treat them as magnitudes and angles, which elegantly simplifies multiplication and division.

## Why it matters
In physics and aerospace, complex numbers are the native language of oscillations, AC circuits, and control systems. Multiplying by a complex number is the mathematically purest way to rotate a vector in 2D space. This exact principle extends to quaternions (4D complex numbers), which are used to calculate 3D spacecraft attitude and prevent gimbal lock in orbital mechanics and drone flight controllers.

## When to study it
Do not attempt this until you have mastered:
1. Basic polynomial algebra (expanding binomials via FOIL).
2. Right-triangle trigonometry (sine, cosine, tangent).
3. The unit circle and radian measure.
4. The definition of the imaginary unit $i = \sqrt{-1}$.
If you cannot comfortably convert standard Cartesian coordinates $(x, y)$ to polar coordinates $(r, \theta)$, review that geometry first.

## How to study it (step by step)
1. **Master rectangular addition and subtraction:** Treat real and imaginary parts as separate, unmixable components (like $x$ and $y$ variables). Group and sum them.
2. **Master rectangular multiplication:** Expand $(a+bi)(c+di)$ using standard binomial distribution. Immediately substitute $i^2 = -1$ and combine the resulting real terms.
3. **Understand the complex conjugate:** Define $\bar{z} = a - bi$. Prove to yourself that $z\bar{z} = a^2 + b^2$. Notice that the result is strictly real.
4. **Master rectangular division:** To divide $\frac{z_1}{z_2}$, multiply both the numerator and the denominator by the complex conjugate of the denominator ($\bar{z}_2$). This forces the denominator to become a real number, allowing you to split the fraction.
5. **Translate to polar form:** Convert $a+bi$ to $r e^{i\theta}$ using $r = \sqrt{a^2+b^2}$ and $\theta = \arctan(b/a)$. *Always draw the quadrant to verify $\theta$.*
6. **Master polar multiplication and division:** Multiply magnitudes and add angles for multiplication. Divide magnitudes and subtract angles for division.

## Key ideas, with intuition

**Addition is Translation (Use Rectangular)**
When you add $z_1 + z_2$, you are placing the vectors tip-to-tail in the complex plane. Rectangular form is built for this. Trying to add in polar form is a nightmare of trigonometry; do not do it.

**Multiplication is Rotation and Scaling (Use Polar)**
When you multiply a number by $r e^{i\theta}$, you are doing two geometric actions: stretching the original number's length by a factor of $r$, and rotating it counter-clockwise by an angle of $\theta$. 
$$ (r_1 e^{i\theta_1}) \cdot (r_2 e^{i\theta_2}) = (r_1 r_2) e^{i(\theta_1 + \theta_2)} $$

**Division is the Reverse (Use Polar)**
Division simply reverses the process: you shrink (divide magnitudes) and rotate clockwise (subtract angles).
$$ \frac{r_1 e^{i\theta_1}}{r_2 e^{i\theta_2}} = \left(\frac{r_1}{r_2}\right) e^{i(\theta_1 - \theta_2)} $$

## Worked example
Let $z_1 = 1 + i\sqrt{3}$ and $z_2 = \sqrt{3} + i$. 
Calculate $\frac{z_1}{z_2}$ in rectangular form, then verify it in polar form.

**Method 1: Rectangular Form**
$$ \frac{1 + i\sqrt{3}}{\sqrt{3} + i} $$
Multiply numerator and denominator by the conjugate of the denominator, $\sqrt{3} - i$:
$$ \frac{(1 + i\sqrt{3})(\sqrt{3} - i)}{(\sqrt{3} + i)(\sqrt{3} - i)} $$
Expand the numerator:
$$ \sqrt{3} - i + 3i - i^2\sqrt{3} $$
Substitute $i^2 = -1$:
$$ \sqrt{3} + 2i + \sqrt{3} = 2\sqrt{3} + 2i $$
Expand the denominator:
$$ (\sqrt{3})^2 - (i)^2 = 3 - (-1) = 4 $$
Divide:
$$ \frac{2\sqrt{3} + 2i}{4} = \frac{\sqrt{3}}{2} + \frac{1}{2}i $$

**Method 2: Polar Form**
Convert $z_1$: $r_1 = \sqrt{1^2 + (\sqrt{3})^2} = 2$. $\theta_1 = \arctan(\sqrt{3}/1) = \pi/3$. So, $z_1 = 2e^{i\pi/3}$.
Convert $z_2$: $r_2 = \sqrt{(\sqrt{3})^2 + 1^2} = 2$. $\theta_2 = \arctan(1/\sqrt{3}) = \pi/6$. So, $z_2 = 2e^{i\pi/6}$.
Divide:
$$ \frac{2e^{i\pi/3}}{2e^{i\pi/6}} = \left(\frac{2}{2}\right) e^{i(\pi/3 - \pi/6)} = 1e^{i\pi/6} $$
Convert back to rectangular to verify:
$$ 1\left(\cos\frac{\pi}{6} + i\sin\frac{\pi}{6}\right) = \frac{\sqrt{3}}{2} + \frac{1}{2}i $$

*Reflection:* Rectangular division required algebraic brute force to clear the imaginary denominator. Polar division was effortless because exponents naturally handle rotation.

## Diagrams

```text
ADDITION (Rectangular)             MULTIPLICATION (Polar)
   Im                                Im
   |      z1+z2 (3+4i)               |       z1*z2 (rotate & scale)
  4|       /                         |      /
   |      /                          |     /
  2|    z1(1+2i)                     |    z2 (angle a2)
   |    /|                           |   /
   |   / |z2(2+2i)                   |  /  z1 (angle a1)
   |  /  |                           | /) a2
___|/____|_______ Re              ___|/_)_a1_____ Re
   0  1  3                           0
```

## Memory technique — remember this forever
1. **The Hook:** *"Rectangular for the grid, Polar for the spin."* Use rectangular for adding/subtracting (moving on the grid). Use polar for multiplying/dividing (spinning and stretching).
2. **Overlearn these two facts:**
   * $z\bar{z} = a^2 + b^2$ (The conjugate clears the imaginary part).
   * $i^2 = -1$ (The engine of rectangular multiplication).
3. **Spaced Repetition:** Review this material at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days. Solve one rectangular division and one polar multiplication per session.
4. **First Principles Pathway:** If you forget the polar rules, rely on standard exponent algebra. Because $z = r e^{i\theta}$, multiplying $z_1 z_2$ is just $(r_1 e^{i\theta_1})(r_2 e^{i\theta_2})$. By basic middle-school exponent laws, $x^A x^B = x^{A+B}$, so the $e$ terms simply add their exponents: $e^{i\theta_1} e^{i\theta_2} = e^{i(\theta_1 + \theta_2)}$. You do not need to memorize a new rule; it is just exponent algebra.

## Common mistakes
* **Quadrant Errors in $\arctan$:** Calculating the angle for $z = -1 - i$ as $\arctan(-1/-1) = \arctan(1) = \pi/4$. This is wrong. The point $(-1, -1)$ is in the third quadrant. The correct angle is $5\pi/4$ (or $-3\pi/4$). Always sketch the point.
* **Sign Errors in Multiplication:** Expanding $(a+bi)(c+di)$ and writing the last term as $+bdi^2$, then forgetting to flip the sign to $-bd$.
* **Adding in Polar:** Attempting to add $2e^{i\pi/2} + 3e^{i\pi}$ by adding magnitudes and angles. This is mathematically fictional. Convert to rectangular first.

## Self-check
1. Evaluate $(4 - 3i) - (1 + 2i)$ and $(4 - 3i)(1 + 2i)$ in rectangular form.
2. Divide $\frac{2 + 5i}{3 - i}$ by using the complex conjugate.
3. Convert $z = -1 + i\sqrt{3}$ to polar form. Use polar multiplication to calculate $z^4$, then convert your final answer back to rectangular form.