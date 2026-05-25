## What it is
The polar form of a complex number expresses it as a distance from the origin ($r$) and an angle from the positive real axis ($\theta$), rather than as a set of horizontal and vertical grid coordinates. Instead of writing a complex number as $z = x + iy$, you write it as $z = r(\cos\theta + i\sin\theta)$, which is frequently abbreviated as $z = r\text{cis}\theta$. 

## Why it matters
In rectangular form ($x+iy$), adding complex numbers is easy, but multiplying them is an algebraic chore. In polar form, multiplication becomes a simple geometric operation: you multiply the magnitudes and add the angles. This makes calculating high powers and roots of complex numbers trivial. Furthermore, this form is the direct stepping stone to Euler's formula ($e^{i\theta}$), which is the mathematical engine behind signal processing (Fourier transforms), quantum mechanics, and analyzing the stability of aerospace control systems.

## When to study it
You must already be fluent in:
1. Basic complex arithmetic ($z = x + iy$, $i^2 = -1$).
2. The Pythagorean theorem.
3. Right-triangle trigonometry (SOH CAH TOA, the unit circle, and measuring angles in radians).
4. Inverse trigonometric functions (specifically $\arctan$). 

If you cannot easily find the angle of the 2D vector $(-1, 1)$ without a calculator, review the unit circle before proceeding.

## How to study it (step by step)
1. **Draw the geometry:** Plot a generic point $z = x + iy$ in the first quadrant of the complex plane. Draw a line from the origin to $z$ (label it $r$) and mark the angle with the positive real axis (label it $\theta$).
2. **Derive the components:** Using right-triangle trigonometry, write equations for $x$ and $y$ in terms of $r$ and $\theta$. 
3. **Substitute and factor:** Plug your expressions for $x$ and $y$ back into $z = x + iy$, and factor out $r$ to yield the polar form.
4. **Drill conversions (Rectangular to Polar):** Pick 4 complex numbers, one in each quadrant (e.g., $1+i$, $-1+i$, $-1-i$, $1-i$). Convert them all to polar form. Pay strict attention to the angle.
5. **Drill conversions (Polar to Rectangular):** Pick 3 polar numbers (e.g., $4\text{cis}(\pi/3)$) and evaluate the sine and cosine to convert them back to $x+iy$.
6. **Prove the multiplication rule:** Write out $z_1 = r_1(\cos\theta_1 + i\sin\theta_1)$ and $z_2 = r_2(\cos\theta_2 + i\sin\theta_2)$. Multiply them algebraically, group the real and imaginary parts, and use trigonometric angle-addition identities to prove that $z_1 z_2 = r_1 r_2 \text{cis}(\theta_1 + \theta_2)$.

## Key ideas, with intuition
**1. The Modulus ($r$)**
The modulus is the absolute distance from the origin to the complex number. It is strictly real and non-negative. By the Pythagorean theorem:
$$r = |z| = \sqrt{x^2 + y^2}$$

**2. The Argument ($\theta$)**
The argument is the angle of rotation from the positive real axis. Using trigonometry, $\tan\theta = \frac{y}{x}$. However, $\arctan(y/x)$ only returns angles in the 1st and 4th quadrants. You must manually adjust the angle by adding $\pi$ if the complex number lies in the 2nd or 3rd quadrant. 

**3. The Substitution**
If you know $r$ and $\theta$, the real part $x$ is the adjacent side of the triangle, and the imaginary part $y$ is the opposite side. 
$$x = r\cos\theta$$
$$y = r\sin\theta$$
Substituting these into $z = x + iy$ gives:
$$z = (r\cos\theta) + i(r\sin\theta) = r(\cos\theta + i\sin\theta)$$

## Worked example
**Task:** Convert $z = -1 + i\sqrt{3}$ to polar form.

**Step 1: Find the modulus $r$.**
$$r = \sqrt{(-1)^2 + (\sqrt{3})^2}$$
$$r = \sqrt{1 + 3} = \sqrt{4} = 2$$
*Why it works:* The Pythagorean theorem calculates the hypotenuse of the triangle formed by the real and imaginary components.

**Step 2: Find the reference angle.**
$$\tan\alpha = \left|\frac{\sqrt{3}}{-1}\right| = \sqrt{3}$$
$$\alpha = \frac{\pi}{3}$$
*Why it works:* We temporarily ignore the negative sign to find the sharp angle the vector makes with the x-axis.

**Step 3: Determine the true argument $\theta$.**
The real part ($-1$) is negative, and the imaginary part ($\sqrt{3}$) is positive. This places $z$ in Quadrant II. 
$$\theta = \pi - \frac{\pi}{3} = \frac{2\pi}{3}$$
*Why it works:* We rotate a full half-circle ($\pi$) and back up by our reference angle ($\alpha$) to land in the correct quadrant.

**Step 4: Write the final polar form.**
$$z = 2\left(\cos\frac{2\pi}{3} + i\sin\frac{2\pi}{3}\right) = 2\text{cis}\left(\frac{2\pi}{3}\right)$$
*Why it works:* We simply plug $r$ and $\theta$ into the standard polar template.

## Diagrams

```text
      Im (Imaginary Axis)
      |
      |       z = x + iy
      |      /| = r cis(θ)
      |   r / |
      |    /  | y = r sin(θ)
      |   /   |
      |  / θ  |
------|-------+-------- Re (Real Axis)
      |   x = r cos(θ)
      |
```

## Memory technique — remember this forever
1. **The Visual Hook:** The word "cis" literally spells out the formula in order: **c**osine, **i**, **s**ine. $r \cdot \text{cis}(\theta) \implies r(\cos\theta + i\sin\theta)$.
2. **Formulas to overlearn:**
   * $r = \sqrt{x^2 + y^2}$
   * $\theta = \text{atan2}(y, x)$ *(always check your quadrant!)*
   * $z = r\text{cis}\theta$
3. **Spaced-repetition schedule:** Review this derivation and do one conversion problem on day 1, day 3, day 7, day 16, and day 35.
4. **First principles pathway:** If you forget the formula, draw a right triangle on the complex plane. Label the horizontal side $x$, the vertical side $iy$, the hypotenuse $r$, and the angle $\theta$. Read SOH CAH TOA directly off the triangle to reconstruct $x = r\cos\theta$ and $y = r\sin\theta$.

## Common mistakes
* **Blindly trusting the calculator for $\theta$:** If you type $\arctan(-1/-1)$ into a calculator to find the angle for $z = -1 - i$, it will output $\pi/4$ (Quadrant I). But $-1-i$ is in Quadrant III. You must manually add $\pi$ to get $5\pi/4$.
* **Forgetting the $i$:** Writing $r(\cos\theta + \sin\theta)$ instead of $r(\cos\theta + i\sin\theta)$. The sine term *must* be multiplied by $i$ because it represents the vertical (imaginary) axis.
* **Using degrees instead of radians:** While degrees work algebraically here, calculus and Euler's formula strictly require radians. Force yourself to use radians now.

## Self-check
1. Convert $z = -3 - 3i$ to polar form.
2. Using the trigonometric identities $\cos(A+B) = \cos A\cos B - \sin A\sin B$ and $\sin(A+B) = \sin A\cos B + \cos A\sin B$, rigorously prove that $\text{cis}(\theta_1) \cdot \text{cis}(\theta_2) = \text{cis}(\theta_1 + \theta_2)$.
3. If $z = 2\text{cis}(\pi/6)$, what is the polar form of $\frac{1}{z}$? *(Hint: write $1$ in polar form first).*