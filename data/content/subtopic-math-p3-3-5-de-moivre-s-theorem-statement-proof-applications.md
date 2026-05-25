## What it is
De Moivre's theorem is a foundational formula linking complex numbers and trigonometry. It states that raising a complex number in polar form to an integer power is mathematically equivalent to raising its magnitude to that power and multiplying its angle by that power. It provides a massive computational shortcut for exponentiating complex numbers and extracting their roots.

## Why it matters
This theorem is the engine behind solving linear differential equations with constant coefficients, which model everything from damped harmonic oscillators in physics to control systems in rocket flight. It also forms the foundation of the Fast Fourier Transform (FFT), an algorithm essential for signal processing in aerospace telemetry, radar systems, and machine learning. 

## When to study it
You must already be fluent in:
1. Basic complex arithmetic (addition, multiplication, division).
2. The polar form of complex numbers: $z = r(\cos \theta + i \sin \theta)$.
3. Trigonometric addition identities, specifically $\cos(A+B)$ and $\sin(A+B)$. 

If you cannot instantly recall or derive the angle sum identities, stop and master them now. They are the structural beams of this theorem's proof.

## How to study it (step by step)
1. Write down the statement of the theorem for positive integers.
2. Prove the theorem for $n=2$ using standard algebraic expansion and trigonometric addition identities.
3. Generalize the proof to all positive integers using mathematical induction.
4. Extend the proof to negative integers using the laws of exponents and complex conjugates.
5. Apply the theorem in reverse (using fractional powers) to find the $n$-th roots of a complex number, taking care to account for the periodicity of sine and cosine.
6. Use the theorem alongside the Binomial Theorem to express multiple-angle trigonometric functions (like $\cos(4\theta)$) entirely in terms of powers of $\cos(\theta)$ and $\sin(\theta)$.

## Key ideas, with intuition

**1. The Formal Statement**
For any real number $\theta$ and any integer $n$:
$$ (\cos \theta + i \sin \theta)^n = \cos(n\theta) + i \sin(n\theta) $$
For a general complex number $z = r(\cos \theta + i \sin \theta)$, this scales as:
$$ z^n = r^n (\cos(n\theta) + i \sin(n\theta)) $$

**2. Geometric Intuition**
Multiplying two complex numbers multiplies their magnitudes and adds their angles. Exponentiation is simply repeated multiplication. Therefore, raising a complex number to the $n$-th power geometrically means scaling its length by $r^n$ and rotating the vector by $\theta$, $n$ times in a row.

**3. The Proof Engine (Induction)**
The theorem is proven for integers via mathematical induction. The base case ($n=1$) is trivial. The inductive step assumes $(\cos \theta + i \sin \theta)^k = \cos(k\theta) + i \sin(k\theta)$. Multiplying both sides by $(\cos \theta + i \sin \theta)$ yields:
$$ (\cos(k\theta) + i \sin(k\theta))(\cos \theta + i \sin \theta) $$
Expanding this creates real and imaginary groupings that perfectly match the identities for $\cos(k\theta + \theta)$ and $\sin(k\theta + \theta)$.

**4. Fractional Powers and Roots**
To find the $n$-th roots of a complex number, we use $1/n$ as the power. Because angles on the complex plane repeat every $2\pi$ radians, a single complex number has infinitely many valid angle representations: $\theta + 2\pi k$. When we divide the angle by $n$, these previously identical angles split into $n$ distinct points spaced evenly around a circle.

## Worked example
**Problem:** Find all cube roots of $-8i$.

**Step 1: Convert the target to polar form.**
The number $-8i$ lies on the negative imaginary axis. Its magnitude is $r = 8$. Its angle is $\theta = \frac{3\pi}{2}$.
To capture all roots, we add the periodic term $2\pi k$ to the angle:
$$ z = 8 \left( \cos\left(\frac{3\pi}{2} + 2\pi k\right) + i \sin\left(\frac{3\pi}{2} + 2\pi k\right) \right) $$

**Step 2: Apply De Moivre's theorem for $n = 1/3$.**
$$ z^{1/3} = 8^{1/3} \left( \cos\left(\frac{\frac{3\pi}{2} + 2\pi k}{3}\right) + i \sin\left(\frac{\frac{3\pi}{2} + 2\pi k}{3}\right) \right) $$
$$ z^{1/3} = 2 \left( \cos\left(\frac{\pi}{2} + \frac{2\pi k}{3}\right) + i \sin\left(\frac{\pi}{2} + \frac{2\pi k}{3}\right) \right) $$

**Step 3: Evaluate for $k = 0, 1, 2$.**
*   **$k=0$:** $2(\cos(\frac{\pi}{2}) + i \sin(\frac{\pi}{2})) = 2(0 + i(1)) = 2i$
*   **$k=1$:** $2(\cos(\frac{\pi}{2} + \frac{2\pi}{3}) + i \sin(\frac{\pi}{2} + \frac{2\pi}{3})) = 2(\cos(\frac{7\pi}{6}) + i \sin(\frac{7\pi}{6})) = 2(-\frac{\sqrt{3}}{2} - i\frac{1}{2}) = -\sqrt{3} - i$
*   **$k=2$:** $2(\cos(\frac{\pi}{2} + \frac{4\pi}{3}) + i \sin(\frac{\pi}{2} + \frac{4\pi}{3})) = 2(\cos(\frac{11\pi}{6}) + i \sin(\frac{11\pi}{6})) = 2(\frac{\sqrt{3}}{2} - i\frac{1}{2}) = \sqrt{3} - i$

*Reflection:* Converting to polar form turned a difficult algebraic root problem into simple division of angles. Adding $2\pi k$ before dividing ensured we did not miss the two other roots, which form an equilateral triangle on the complex plane.

## Diagrams

```text
The Cube Roots of -8i
Complex Plane

          Im
          |
   z_0=2i * 
          |
          |
----------+---------- Re
          |
          |
 *        |        *
z_1       |       z_2
(-\sqrt{3}-i)   (\sqrt{3}-i)

All roots lie on a circle of radius r=2.
They are separated by exactly 120 degrees (2pi/3 radians).
```

## Memory technique — remember this forever
1. **The Hook:** "Exponents drop down to multiply." Visualize the power $n$ physically falling from the superscript position to land right next to the angle $\theta$.
2. **Formulas to overlearn:** 
   $$ (\text{cis } \theta)^n = \text{cis}(n\theta) $$ 
   *(Note: $\text{cis } \theta$ is shorthand for $\cos \theta + i \sin \theta$)*
3. **Spaced-repetition schedule:** Review at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget De Moivre's theorem, invoke Euler's formula: $e^{i\theta} = \cos \theta + i \sin \theta$. 
   Using standard exponent rules: $(e^{i\theta})^n = e^{i(n\theta)}$. 
   Expand the result back into trig form: $e^{i(n\theta)} = \cos(n\theta) + i \sin(n\theta)$. 

## Common mistakes
1. **Forgetting $2\pi k$ when finding roots:** Students often just divide the principal angle by $n$, finding only one root and missing the other $n-1$ roots. Always add $2\pi k$ *before* dividing by $n$.
2. **Applying it to rectangular form:** Assuming $(x+iy)^n = x^n + i y^n$. This is a fatal algebraic error. You must convert to polar form first.
3. **Quadrant errors in setup:** Calculating the initial angle $\theta$ using $\arctan(y/x)$ without checking which quadrant the complex number is in. For example, $-1-i$ and $1+i$ both yield $\arctan(1)$, but they are in opposite quadrants.

## Self-check
1. Use De Moivre's theorem to calculate $(1 - i)^8$ and express the final answer in rectangular form.
2. Express $\cos(3\theta)$ entirely in terms of $\cos(\theta)$ by applying De Moivre's theorem and expanding $(\cos \theta + i \sin \theta)^3$ using the Binomial Theorem.
3. Find the five 5th roots of $1$. Prove algebraically and geometrically that the sum of these five roots is exactly zero.