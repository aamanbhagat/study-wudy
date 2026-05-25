## 1. What it is — in plain English

Imagine you have a special kind of spinning arrow, called a "complex number." This arrow has two properties: a length and a direction (or angle). When you multiply two of these arrows together, their lengths multiply, and their angles add up.

Now, what if you want to multiply the *same* arrow by itself many times? For example, if you want to square it, or cube it, or raise it to the power of ten? You could keep doing the multiplication step-by-step, adding the angle each time. But that would be tedious.

De Moivre's theorem is like a shortcut. It says that if you want to raise your spinning arrow (a complex number) to a certain power, say 'n', all you have to do is raise its length to that power 'n', and multiply its angle by 'n'. It's a neat trick to quickly figure out where your arrow ends up after being spun and stretched 'n' times.

So, instead of a complicated series of multiplications and angle additions, De Moivre's theorem gives you a direct way to find the final length and direction of your complex number after it's been raised to an integer power. It simplifies what seems like a complex operation into a very straightforward calculation involving just the length and the angle.

## 2. Why it matters — real-world applications

De Moivre's theorem, while seemingly abstract, is a foundational tool in many fields where oscillations, rotations, and waves are important.

1.  **Electrical Engineering (AC Circuits):** In alternating current (AC) circuits, voltages and currents are represented as complex numbers (phasors) because they have both magnitude (amplitude) and phase (timing relative to a reference). De Moivre's theorem helps simplify calculations involving impedance, power, and frequency responses, especially when dealing with non-linear components or when analyzing harmonic frequencies. For instance, understanding how a signal changes when passing through different circuit elements often involves raising complex numbers to powers related to frequency or time, which De Moivre's theorem streamlines. Companies like **Siemens** or **General Electric** use these principles in designing power grids, motors, and electronic devices.

2.  **Signal Processing and Fourier Analysis:** De Moivre's theorem is fundamental to understanding Fourier series and Fourier transforms. These mathematical tools break down complex signals (like sound waves, radio signals, or images) into their constituent simple sine and cosine waves. Each of these constituent waves can be represented by a complex exponential, and De Moivre's theorem helps in manipulating these exponentials to analyze frequency components, filter noise, or compress data. This is crucial for technologies ranging from **MP3 compression** and **Wi-Fi communication** to **medical imaging (MRI)** and **seismic data analysis** used by companies like **Schlumberger**.

3.  **Quantum Mechanics:** In quantum mechanics, the state of a particle is described by a wave function, which is inherently complex-valued. The time evolution of these wave functions often involves complex exponentials (Euler's formula, which is intimately linked to De Moivre's theorem). Calculating probabilities, understanding particle dynamics, and solving the Schrödinger equation frequently rely on the manipulation of complex numbers raised to powers, where De Moivre's theorem simplifies the process. This is at the heart of research at institutions like **CERN** or companies developing **quantum computing** technologies.

4.  **Computer Graphics and Robotics:** Rotations in 2D and 3D space can be elegantly represented using complex numbers (for 2D) or quaternions (an extension of complex numbers for 3D). De Moivre's theorem provides a concise way to calculate the result of multiple rotations or to rotate an object by a certain angle multiple times. This is used in animation software (e.g., **Blender**, **Autodesk Maya**), game engines (e.g., **Unity**, **Unreal Engine**), and in controlling robotic arms where precise rotational transformations are critical.

## 3. Prerequisites — what you must know first

Before diving into De Moivre's theorem, ensure you have a solid grasp of the following concepts:

*   **Complex Numbers:** Understanding what a complex number is ($a+bi$), its real and imaginary parts, and how to perform basic arithmetic (addition, subtraction, multiplication, division).
*   **Argand Diagram:** The ability to plot complex numbers as points or vectors in the complex plane, with the real axis horizontal and the imaginary axis vertical.
*   **Polar Form of Complex Numbers:** Expressing a complex number $z = x+iy$ in terms of its magnitude (or modulus) $r = |z| = \sqrt{x^2+y^2}$ and its argument (or angle) $\theta = \arg(z) = \arctan(y/x)$ (with careful attention to quadrants). This form is $z = r(\cos\theta + i\sin\theta)$.
*   **Trigonometric Identities:** Familiarity with fundamental identities, especially angle addition formulas like $\cos(A+B) = \cos A \cos B - \sin A \sin B$ and $\sin(A+B) = \sin A \cos B + \cos A \sin B$.
*   **Euler's Formula:** The relationship $e^{i\theta} = \cos\theta + i\sin\theta$. While not strictly necessary for the initial proof of De Moivre's, it provides a powerful and elegant alternative perspective and derivation.
*   **Mathematical Induction (for the proof):** The technique of proving a statement for all natural numbers by showing it holds for a base case (e.g., $n=1$) and then showing that if it holds for an arbitrary $k$, it also holds for $k+1$.

If any of these concepts are unfamiliar, pause and review them. De Moivre's theorem builds directly upon them.

## 4. The core idea — step by step

De Moivre's theorem fundamentally describes how powers of complex numbers behave when expressed in polar form. We'll build up to the full statement.

### Step 1: Complex Number Multiplication in Polar Form

**Plain-English Statement:** When you multiply two complex numbers, their lengths get multiplied, and their angles get added. It's like combining two "spin-and-stretch" operations: the total stretch is the product of individual stretches, and the total spin is the sum of individual spins.

**Small Concrete Example:**
Let $z_1$ have length 2 and angle $30^\circ$, and $z_2$ have length 3 and angle $45^\circ$.
Then $z_1 z_2$ will have length $2 \times 3 = 6$ and angle $30^\circ + 45^\circ = 75^\circ$.

**Formal/Mathematical Version:**
Let $z_1 = r_1(\cos\theta_1 + i\sin\theta_1)$ and $z_2 = r_2(\cos\theta_2 + i\sin\theta_2)$.
Their product is:
$$z_1 z_2 = r_1 r_2 (\cos\theta_1 + i\sin\theta_1)(\cos\theta_2 + i\sin\theta_2)$$
$$z_1 z_2 = r_1 r_2 [(\cos\theta_1 \cos\theta_2 - \sin\theta_1 \sin\theta_2) + i(\cos\theta_1 \sin\theta_2 + \sin\theta_1 \cos\theta_2)]$$
Using the angle addition formulas for sine and cosine:
$$z_1 z_2 = r_1 r_2 [\cos(\theta_1 + \theta_2) + i\sin(\theta_1 + \theta_2)]$$
This is often abbreviated using the "cis" notation: $z_1 z_2 = r_1 r_2 \text{cis}(\theta_1 + \theta_2)$.

**What Could Go Wrong:** Forgetting to multiply the magnitudes (lengths) or incorrectly adding the angles. Also, mixing up angle addition formulas (e.g., using $\cos(A+B) = \cos A \cos B + \sin A \sin B$ instead of the correct subtraction).

### Step 2: Raising a Complex Number to a Positive Integer Power

**Plain-English Statement:** If you multiply a complex number by itself 'n' times, its length will be multiplied by itself 'n' times (i.e., raised to the power 'n'), and its angle will be added to itself 'n' times (i.e., multiplied by 'n').

**Small Concrete Example:**
If a complex number $z$ has length 2 and angle $30^\circ$, then $z^3$ will have length $2^3 = 8$ and angle $3 \times 30^\circ = 90^\circ$.

**Formal/Mathematical Version:**
Let $z = r(\cos\theta + i\sin\theta)$.
Then:
$z^2 = z \cdot z = r \cdot r (\cos(\theta+\theta) + i\sin(\theta+\theta)) = r^2(\cos(2\theta) + i\sin(2\theta))$
$z^3 = z^2 \cdot z = r^2 \cdot r (\cos(2\theta+\theta) + i\sin(2\theta+\theta)) = r^3(\cos(3\theta) + i\sin(3\theta))$
By observing this pattern, we can generalize for any positive integer $n$:
$$z^n = [r(\cos\theta + i\sin\theta)]^n = r^n(\cos(n\theta) + i\sin(n\theta))$$

**What Could Go Wrong:** Forgetting to raise the modulus $r$ to the power $n$. Only applying the power to the angle is a common error.

### Step 3: De Moivre's Theorem for Positive Integers (The Core Statement)

**Plain-English Statement:** When a complex number with a length of 1 is raised to an integer power, its length remains 1, and only its angle changes by multiplying by that power.

**Small Concrete Example:**
If a complex number $z$ has length 1 and angle $45^\circ$ (i.e., $z = \cos 45^\circ + i\sin 45^\circ$), then $z^4$ will have length $1^4 = 1$ and angle $4 \times 45^\circ = 180^\circ$. So $z^4 = \cos 180^\circ + i\sin 180^\circ = -1$.

**Formal/Mathematical Version:**
This is a special case of Step 2 where $r=1$.
For any real number $\theta$ and any positive integer $n$:
$$(\cos\theta + i\sin\theta)^n = \cos(n\theta) + i\sin(n\theta)$$

**What Could Go Wrong:** Applying this simplified form when the modulus $r$ is *not* 1. Always check the modulus first.

### Step 4: Proof by Mathematical Induction (for $n \in \mathbb{Z}^+$)

**Plain-English Statement:** We prove this theorem for positive integers by showing it works for the simplest case (power of 1), and then showing that if it works for any power 'k', it *must* also work for the next power 'k+1'. This establishes a domino effect, proving it for all positive integer powers.

**Formal/Mathematical Version:**
Let $P(n)$ be the statement $(\cos\theta + i\sin\theta)^n = \cos(n\theta) + i\sin(n\theta)$.

**Base Case ($n=1$):**
$P(1)$ states $(\cos\theta + i\sin\theta)^1 = \cos(1\theta) + i\sin(1\theta)$.
This is clearly true: $\cos\theta + i\sin\theta = \cos\theta + i\sin\theta$.

**Inductive Hypothesis:**
Assume $P(k)$ is true for some positive integer $k$.
That is, assume $(\cos\theta + i\sin\theta)^k = \cos(k\theta) + i\sin(k\theta)$.

**Inductive Step ($n=k+1$):**
We need to show that $P(k+1)$ is true, i.e., $(\cos\theta + i\sin\theta)^{k+1} = \cos((k+1)\theta) + i\sin((k+1)\theta)$.
Consider the left-hand side (LHS) of $P(k+1)$:
$$(\cos\theta + i\sin\theta)^{k+1} = (\cos\theta + i\sin\theta)^k (\cos\theta + i\sin\theta)^1$$
By the inductive hypothesis, we can substitute for $(\cos\theta + i\sin\theta)^k$:
$$= (\cos(k\theta) + i\sin(k\theta)) (\cos\theta + i\sin\theta)$$
Now, using the complex multiplication rule from Step 1 (magnitudes multiply, angles add, here magnitudes are both 1):
$$= \cos(k\theta + \theta) + i\sin(k\theta + \theta)$$
$$= \cos((k+1)\theta) + i\sin((k+1)\theta)$$
This is the right-hand side (RHS) of $P(k+1)$.
Since $P(1)$ is true, and $P(k) \implies P(k+1)$, by the principle of mathematical induction, $P(n)$ is true for all positive integers $n$.

**What Could Go Wrong:** Errors in applying trigonometric identities during the inductive step, or misunderstanding the principle of induction itself.

### Step 5: Extension to Negative Integers

**Plain-English Statement:** The theorem also works for negative powers. A negative power means taking the reciprocal, which for a complex number with length 1, means its angle becomes negative. De Moivre's theorem handles this naturally by multiplying the angle by the negative power.

**Small Concrete Example:**
If $z = \cos 30^\circ + i\sin 30^\circ$, then $z^{-1}$ should be $\cos(-30^\circ) + i\sin(-30^\circ)$.
Using De Moivre's: $(\cos 30^\circ + i\sin 30^\circ)^{-1} = \cos(-1 \times 30^\circ) + i\sin(-1 \times 30^\circ) = \cos(-30^\circ) + i\sin(-30^\circ)$. This matches.

**Formal/Mathematical Version:**
Let $n$ be a negative integer. Then $n = -m$ for some positive integer $m$.
$$(\cos\theta + i\sin\theta)^n = (\cos\theta + i\sin\theta)^{-m}$$
$$= \frac{1}{(\cos\theta + i\sin\theta)^m}$$
By De Moivre's theorem for positive integers (Step 3):
$$= \frac{1}{\cos(m\theta) + i\sin(m\theta)}$$
To simplify this, we multiply the numerator and denominator by the conjugate of the denominator:
$$= \frac{1}{\cos(m\theta) + i\sin(m\theta)} \times \frac{\cos(m\theta) - i\sin(m\theta)}{\cos(m\theta) - i\sin(m\theta)}$$
$$= \frac{\cos(m\theta) - i\sin(m\theta)}{\cos^2(m\theta) + \sin^2(m\theta)}$$
Since $\cos^2(m\theta) + \sin^2(m\theta) = 1$:
$$= \cos(m\theta) - i\sin(m\theta)$$
Using the even/odd properties of cosine and sine ($\cos(-x) = \cos x$ and $\sin(-x) = -\sin x$):
$$= \cos(-m\theta) + i\sin(-m\theta)$$
Since $n=-m$, we have:
$$= \cos(n\theta) + i\sin(n\theta)$$
Thus, De Moivre's theorem holds for negative integers as well.

**What Could Go Wrong:** Errors in complex number division or conjugate multiplication, or incorrect application of even/odd trigonometric identities.

### Step 6: Extension to Zero Power

**Plain-English Statement:** Any non-zero number raised to the power of zero is 1. For complex numbers, this holds true. De Moivre's theorem also works, giving an angle of $0 \times \theta = 0$, which corresponds to the real number 1.

**Formal/Mathematical Version:**
For $n=0$:
$$(\cos\theta + i\sin\theta)^0 = 1$$
And De Moivre's formula gives:
$$\cos(0\theta) + i\sin(0\theta) = \cos(0) + i\sin(0) = 1 + i(0) = 1$$
So, the theorem holds for $n=0$.

**What Could Go Wrong:** Not remembering that $z^0=1$ for any non-zero complex number $z$.

### Step 7: General Statement of De Moivre's Theorem

**Plain-English Statement:** For any complex number, whether its length is 1 or not, and for any integer power (positive, negative, or zero), you raise the length to that power and multiply the angle by that power.

**Formal/Mathematical Version:**
For any complex number $z = r(\cos\theta + i\sin\theta)$ and any integer $n \in \mathbb{Z}$:
$$z^n = [r(\cos\theta + i\sin\theta)]^n = r^n(\cos(n\theta) + i\sin(n\theta))$$

**What Could Go Wrong:** This is the complete version. The main mistake is still forgetting to apply the power to the modulus $r$.

## 5. Worked examples — multiple, with every step shown

### Example 1: Raising to a positive integer power

**Problem:** Calculate $(1+i)^6$.

**What's given:** A complex number $z = 1+i$ and an integer power $n=6$.
**What we want:** The result of $z^6$ in rectangular form.

**Step-by-step Solution:**

1.  **Convert $z$ to polar form:**
    *   $z = 1+i$.
    *   Identify $x=1$ and $y=1$.
    *   Calculate the modulus $r$:
        $$r = |z| = \sqrt{x^2+y^2} = \sqrt{1^2+1^2} = \sqrt{1+1} = \sqrt{2}$$
        *We find the length of the complex number vector.*
    *   Calculate the argument $\theta$:
        *   Since $x>0$ and $y>0$, $z$ is in the first quadrant.
        *   $\tan\theta = \frac{y}{x} = \frac{1}{1} = 1$.
        *   $\theta = \arctan(1) = \frac{\pi}{4}$ radians (or $45^\circ$).
        *We find the angle the vector makes with the positive real axis.*
    *   So, $1+i = \sqrt{2}\left(\cos\frac{\pi}{4} + i\sin\frac{\pi}{4}\right)$.
        *This is the polar representation of the complex number.*

2.  **Apply De Moivre's Theorem:**
    *   We want to calculate $z^6 = \left[\sqrt{2}\left(\cos\frac{\pi}{4} + i\sin\frac{\pi}{4}\right)\right]^6$.
    *   According to De Moivre's theorem, $z^n = r^n(\cos(n\theta) + i\sin(n\theta))$.
    *   Here, $r=\sqrt{2}$, $\theta=\frac{\pi}{4}$, and $n=6$.
    *   So, $z^6 = (\sqrt{2})^6 \left(\cos\left(6 \cdot \frac{\pi}{4}\right) + i\sin\left(6 \cdot \frac{\pi}{4}\right)\right)$.
        *We raise the modulus to the power and multiply the angle by the power.*

3.  **Simplify the modulus and angle:**
    *   $(\sqrt{2})^6 = (2^{1/2})^6 = 2^{6/2} = 2^3 = 8$.
        *We calculate the new length.*
    *   $6 \cdot \frac{\pi}{4} = \frac{6\pi}{4} = \frac{3\pi}{2}$.
        *We calculate the new angle.*
    *   So, $z^6 = 8\left(\cos\frac{3\pi}{2} + i\sin\frac{3\pi}{2}\right)$.
        *This is the result in polar form.*

4.  **Convert back to rectangular form (if required):**
    *   $\cos\frac{3\pi}{2} = 0$.
    *   $\sin\frac{3\pi}{2} = -1$.
        *We evaluate the trigonometric functions for the new angle.*
    *   $z^6 = 8(0 + i(-1)) = 8(-i) = -8i$.
        *We multiply by the modulus to get the final rectangular form.*

**Final Answer:** $\boxed{-8i}$

**Reflection:** This example demonstrates the core application of De Moivre's theorem for positive integer powers. The trickiest part is often converting between rectangular and polar forms correctly, especially finding the argument $\theta$ in the right quadrant, and then evaluating the final trigonometric values.

### Example 2: Raising to a negative integer power

**Problem:** Calculate $(\sqrt{3}-i)^{-4}$.

**What's given:** A complex number $z = \sqrt{3}-i$ and an integer power $n=-4$.
**What we want:** The result of $z^{-4}$ in rectangular form.

**Step-by-step Solution:**

1.  **Convert $z$ to polar form:**
    *   $z = \sqrt{3}-i$.
    *   Identify $x=\sqrt{3}$ and $y=-1$.
    *   Calculate the modulus $r$:
        $$r = |z| = \sqrt{(\sqrt{3})^2+(-1)^2} = \sqrt{3+1} = \sqrt{4} = 2$$
        *We find the length of the complex number vector.*
    *   Calculate the argument $\theta$:
        *   Since $x>0$ and $y<0$, $z$ is in the fourth quadrant.
        *   $\tan\theta = \frac{y}{x} = \frac{-1}{\sqrt{3}}$.
        *   The reference angle is $\frac{\pi}{6}$ (or $30^\circ$).
        *   In the fourth quadrant, $\theta = 2\pi - \frac{\pi}{6} = \frac{11\pi}{6}$ (or $-\frac{\pi}{6}$). Using $-\frac{\pi}{6}$ is often simpler for De Moivre's.
        *We find the angle the vector makes with the positive real axis.*
    *   So, $\sqrt{3}-i = 2\left(\cos\left(-\frac{\pi}{6}\right) + i\sin\left(-\frac{\pi}{6}\right)\right)$.
        *This is the polar representation of the complex number.*

2.  **Apply De Moivre's Theorem:**
    *   We want to calculate $z^{-4} = \left[2\left(\cos\left(-\frac{\pi}{6}\right) + i\sin\left(-\frac{\pi}{6}\right)\right)\right]^{-4}$.
    *   Using $z^n = r^n(\cos(n\theta) + i\sin(n\theta))$ with $r=2$, $\theta=-\frac{\pi}{6}$, and $n=-4$.
    *   $z^{-4} = (2)^{-4} \left(\cos\left(-4 \cdot \left(-\frac{\pi}{6}\right)\right) + i\sin\left(-4 \cdot \left(-\frac{\pi}{6}\right)\right)\right)$.
        *We raise the modulus to the power and multiply the angle by the power.*

3.  **Simplify the modulus and angle:**
    *   $(2)^{-4} = \frac{1}{2^4} = \frac{1}{16}$.
        *We calculate the new length.*
    *   $-4 \cdot \left(-\frac{\pi}{6}\right) = \frac{4\pi}{6} = \frac{2\pi}{3}$.
        *We calculate the new angle. Note that multiplying two negative numbers yields a positive angle.*
    *   So, $z^{-4} = \frac{1}{16}\left(\cos\frac{2\pi}{3} + i\sin\frac{2\pi}{3}\right)$.
        *This is the result in polar form.*

4.  **Convert back to rectangular form:**
    *   $\cos\frac{2\pi}{3} = -\frac{1}{2}$.
    *   $\sin\frac{2\pi}{3} = \frac{\sqrt{3}}{2}$.
        *We evaluate the trigonometric functions for the new angle.*
    *   $z^{-4} = \frac{1}{16}\left(-\frac{1}{2} + i\frac{\sqrt{3}}{2}\right) = -\frac{1}{32} + i\frac{\sqrt{3}}{32}$.
        *We multiply by the modulus to get the final rectangular form.*

**Final Answer:** $\boxed{-\frac{1}{32} + i\frac{\sqrt{3}}{32}}$

**Reflection:** This example highlights the handling of negative powers and angles. It's crucial to correctly determine the quadrant for the initial angle and to handle the arithmetic of negative numbers in the exponent and angle multiplication.

### Example 3: Finding roots of a complex number (Roots of Unity application)

**Problem:** Find all cube roots of $8i$.

**What's given:** A complex number $w = 8i$ and we want to find its $n$-th roots, where $n=3$.
**What we want:** All $z$ such that $z^3 = 8i$.

**Step-by-step Solution:**

1.  **Convert $w$ to polar form:**
    *   $w = 8i$.
    *   Identify $x=0$ and $y=8$.
    *   Calculate the modulus $r$:
        $$r = |w| = \sqrt{0^2+8^2} = \sqrt{64} = 8$$
        *We find the length of the complex number vector.*
    *   Calculate the argument $\theta$:
        *   Since $w$ is purely imaginary and positive, it lies on the positive imaginary axis.
        *   $\theta = \frac{\pi}{2}$.
        *We find the angle the vector makes with the positive real axis.*
    *   So, $8i = 8\left(\cos\frac{\pi}{2} + i\sin\frac{\pi}{2}\right)$.
        *This is the polar representation of the number we're finding roots for.*

2.  **Set up the equation using De Moivre's Theorem:**
    *   Let $z = \rho(\cos\phi + i\sin\phi)$ be a cube root of $8i$.
    *   Then $z^3 = \rho^3(\cos(3\phi) + i\sin(3\phi))$.
        *This is De Moivre's theorem applied to the unknown root.*
    *   We need $z^3 = 8i$. So,
        $$\rho^3(\cos(3\phi) + i\sin(3\phi)) = 8\left(\cos\frac{\pi}{2} + i\sin\frac{\pi}{2}\right)$$
        *We equate the polar forms of $z^3$ and $8i$.*

3.  **Equate moduli and arguments:**
    *   Equating moduli: $\rho^3 = 8 \implies \rho = \sqrt[3]{8} = 2$.
        *The length of each root is the $n$-th root of the original number's length.*
    *   Equating arguments: $3\phi = \frac{\pi}{2} + 2k\pi$, where $k$ is an integer ($k=0, 1, 2$).
        *We must account for the periodic nature of trigonometric functions. Adding $2k\pi$ to the angle ensures we find all distinct roots. Since we're finding $n=3$ roots, we need $n$ distinct values for $k$.*
    *   Solve for $\phi$: $\phi = \frac{\frac{\pi}{2} + 2k\pi}{3} = \frac{\pi}{6} + \frac{2k\pi}{3}$.
        *This formula will give us the angles for each root.*

4.  **Calculate the distinct roots for $k=0, 1, 2$:**
    *   For $k=0$:
        *   $\phi_0 = \frac{\pi}{6} + \frac{2(0)\pi}{3} = \frac{\pi}{6}$.
        *   $z_0 = 2\left(\cos\frac{\pi}{6} + i\sin\frac{\pi}{6}\right) = 2\left(\frac{\sqrt{3}}{2} + i\frac{1}{2}\right) = \sqrt{3} + i$.
            *This is the first root.*
    *   For $k=1$:
        *   $\phi_1 = \frac{\pi}{6} + \frac{2(1)\pi}{3} = \frac{\pi}{6} + \frac{4\pi}{6} = \frac{5\pi}{6}$.
        *   $z_1 = 2\left(\cos\frac{5\pi}{6} + i\sin\frac{5\pi}{6}\right) = 2\left(-\frac{\sqrt{3}}{2} + i\frac{1}{2}\right) = -\sqrt{3} + i$.
            *This is the second root.*
    *   For $k=2$:
        *   $\phi_2 = \frac{\pi}{6} + \frac{2(2)\pi}{3} = \frac{\pi}{6} + \frac{8\pi}{6} = \frac{9\pi}{6} = \frac{3\pi}{2}$.
        *   $z_2 = 2\left(\cos\frac{3\pi}{2} + i\sin\frac{3\pi}{2}\right) = 2(0 + i(-1)) = -2i$.
            *This is the third root.*

**Final Answer:** The cube roots of $8i$ are $\boxed{\sqrt{3} + i}$, $\boxed{-\sqrt{3} + i}$, and $\boxed{-2i}$.

**Reflection:** This example demonstrates how De Moivre's theorem is extended to find roots of complex numbers. The critical step is remembering to add $2k\pi$ to the argument before dividing by $n$ to find all $n$ distinct roots. These roots are always equally spaced around a circle in the Argand diagram.

### Example 4: Deriving a trigonometric identity

**Problem:** Use De Moivre's theorem to express $\cos(3\theta)$ in terms of powers of $\cos\theta$ and $\sin\theta$.

**What's given:** The expression $\cos(3\theta)$.
**What we want:** An identity for $\cos(3\theta)$ using De Moivre's theorem.

**Step-by-step Solution:**

1.  **Apply De Moivre's Theorem for $n=3$:**
    *   We know that $(\cos\theta + i\sin\theta)^3 = \cos(3\theta) + i\sin(3\theta)$.
        *De Moivre's theorem directly relates powers of complex numbers to multiple angles.*

2.  **Expand the left-hand side using the binomial theorem:**
    *   $(A+B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$.
    *   Let $A = \cos\theta$ and $B = i\sin\theta$.
    *   $(\cos\theta + i\sin\theta)^3 = (\cos\theta)^3 + 3(\cos\theta)^2(i\sin\theta) + 3(\cos\theta)(i\sin\theta)^2 + (i\sin\theta)^3$.
        *We expand the complex number raised to the power 3.*

3.  **Simplify the terms, remembering $i^2=-1$ and $i^3=-i$:**
    *   $(\cos\theta)^3 = \cos^3\theta$.
    *   $3(\cos\theta)^2(i\sin\theta) = 3i\cos^2\theta\sin\theta$.
    *   $3(\cos\theta)(i\sin\theta)^2 = 3\cos\theta(i^2\sin^2\theta) = 3\cos\theta(-\sin^2\theta) = -3\cos\theta\sin^2\theta$.
    *   $(i\sin\theta)^3 = i^3\sin^3\theta = -i\sin^3\theta$.
        *We simplify each term, collecting real and imaginary parts.*

4.  **Combine the simplified terms:**
    *   $(\cos\theta + i\sin\theta)^3 = \cos^3\theta + 3i\cos^2\theta\sin\theta - 3\cos\theta\sin^2\theta - i\sin^3\theta$.
    *   Group the real and imaginary parts:
        $$(\cos^3\theta - 3\cos\theta\sin^2\theta) + i(3\cos^2\theta\sin\theta - \sin^3\theta)$$
        *This is the expanded form of the LHS, separated into its real and imaginary components.*

5.  **Equate the real parts:**
    *   From Step 1, we have $(\cos\theta + i\sin\theta)^3 = \cos(3\theta) + i\sin(3\theta)$.
    *   Equating the real parts from Step 1 and Step 4:
        $$\cos(3\theta) = \cos^3\theta - 3\cos\theta\sin^2\theta$$
        *The real part of the expanded form must equal the real part from De Moivre's theorem.*

6.  **(Optional) Express in terms of only $\cos\theta$:**
    *   Using the identity $\sin^2\theta = 1 - \cos^2\theta$:
        $$\cos(3\theta) = \cos^3\theta - 3\cos\theta(1 - \cos^2\theta)$$
        $$\cos(3\theta) = \cos^3\theta - 3\cos\theta + 3\cos^3\theta$$
        $$\cos(3\theta) = 4\cos^3\theta - 3\cos\theta$$
        *This is a common form of the identity.*

**Final Answer:** $\boxed{\cos(3\theta) = \cos^3\theta - 3\cos\theta\sin^2\theta}$ (or $\boxed{\cos(3\theta) = 4\cos^3\theta - 3\cos\theta}$)

**Reflection:** This example demonstrates a powerful application of De Moivre's theorem: deriving trigonometric identities for multiple angles. The key is to expand the complex number raised to a power using the binomial theorem and then equate the real (or imaginary) parts with the De Moivre's result. This method is systematic and less prone to errors than purely trigonometric manipulations.

## 6. Common mistakes and traps

1.  **Forgetting to raise the modulus to the power:** When using $z^n = r^n(\cos(n\theta) + i\sin(n\theta))$, students often only multiply the angle by $n$, neglecting to raise $r$ to the power $n$. This is especially true when $r=1$ in many textbook examples, leading to a false sense that $r^n$ is always 1.
2.  **Incorrectly determining the argument (angle) $\theta$:** The argument must be in the correct quadrant. Simply using $\arctan(y/x)$ can lead to errors if the complex number is in the second or third quadrant. Always sketch the complex number on an Argand diagram to verify the angle.
3.  **Not adding $2k\pi$ when finding roots:** When finding the $n$-th roots of a complex number, it's crucial to remember that the argument is periodic. The formula for the angles of the roots is $\phi_k = \frac{\theta + 2k\pi}{n}$, where $k$ ranges from $0$ to $n-1$. Missing the $2k\pi$ will result in only one root instead of $n$ distinct roots.
4.  **Using degrees instead of radians (or vice-versa) inconsistently:** While De Moivre's theorem works for both, it's easy to mix them up. Most advanced mathematics, especially when dealing with calculus or Euler's formula, uses radians. Stick to one unit throughout a problem.
5.  **Errors in trigonometric evaluation:** After applying De Moivre's theorem, you'll often need to evaluate $\cos(n\theta)$ and $\sin(n\theta)$. Mistakes here (e.g., wrong signs or values for standard angles) will lead to an incorrect final answer.
6.  **Confusing De Moivre's theorem with Euler's formula:** While closely related ($e^{i\theta} = \cos\theta + i\sin\theta$), they are distinct. De Moivre's theorem is about powers of complex numbers in polar form, while Euler's formula provides an exponential representation. However, Euler's formula provides a very quick derivation of De Moivre's: $(e^{i\theta})^n = e^{in\theta} \implies (\cos\theta + i\sin\theta)^n = \cos(n\theta) + i\sin(n\theta)$.

## 7. Textbook-precise explanation

**De Moivre's Theorem**

Let $z$ be a complex number. In polar form, $z$ can be expressed as $z = r(\cos\theta + i\sin\theta)$, where $r = |z|$ is the modulus of $z$ and $\theta = \arg(z)$ is the argument of $z$.

**Statement:**
For any complex number $z = r(\cos\theta + i\sin\theta)$ and any integer $n \in \mathbb{Z}$, De Moivre's Theorem states that:
$$z^n = [r(\cos\theta + i\sin\theta)]^n = r^n(\cos(n\theta) + i\sin(n\theta))$$

A special case, and often the most commonly cited form, occurs when $r=1$:
For any real number $\theta$ and any integer $n \in \mathbb{Z}$:
$$(\cos\theta + i\sin\theta)^n = \cos(n\theta) + i\sin(n\theta)$$

**Proof Sketch (for $n \in \mathbb{Z}^+$ by Induction):**
1.  **Base Case ($n=1$):** The statement is trivially true: $(\cos\theta + i\sin\theta)^1 = \cos(1\theta) + i\sin(1\theta)$.
2.  **Inductive Hypothesis:** Assume the statement holds for some positive integer $k$, i.e., $(\cos\theta + i\sin\theta)^k = \cos(k\theta) + i\sin(k\theta)$.
3.  **Inductive Step ($n=k+1$):**
    $(\cos\theta + i\sin\theta)^{k+1} = (\cos\theta + i\sin\theta)^k (\cos\theta + i\sin\theta)$
    Using the inductive hypothesis:
    $= (\cos(k\theta) + i\sin(k\theta)) (\cos\theta + i\sin\theta)$
    Multiplying complex numbers in polar form (magnitudes multiply, arguments add):
    $= \cos(k\theta + \theta) + i\sin(k\theta + \theta)$
    $= \cos((k+1)\theta) + i\sin((k+1)\theta)$
    Thus, the statement holds for $k+1$. By mathematical induction, the theorem is true for all positive integers $n$.

**Proof Sketch (for $n \in \mathbb{Z}^-$):**
Let $n = -m$ for some positive integer $m$.
$(\cos\theta + i\sin\theta)^n = (\cos\theta + i\sin\theta)^{-m} = \frac{1}{(\cos\theta + i\sin\theta)^m}$
By the positive integer case:
$= \frac{1}{\cos(m\theta) + i\sin(m\theta)}$
Multiplying by the conjugate:
$= \frac{\cos(m\theta) - i\sin(m\theta)}{\cos^2(m\theta) + \sin^2(m\theta)} = \cos(m\theta) - i\sin(m\theta)$
Using $\cos(-x) = \cos x$ and $\sin(-x) = -\sin x$:
$= \cos(-m\theta) + i\sin(-m\theta) = \cos(n\theta) + i\sin(n\theta)$
Thus, the theorem holds for negative integers. The case $n=0$ is trivial, as $z^0=1$ and $\cos(0\theta)+i\sin(0\theta)=1$.

**Reference:**
This theorem is a standard result in complex analysis and is covered in most pre-calculus, calculus, and introductory complex analysis textbooks. For example, see:
*   Stewart, James. *Calculus: Early Transcendentals*. 9th ed. Cengage Learning, 2021. (Often covered in the "Complex Numbers" appendix or early chapters.)
*   Churchill, Ruel V., and James W. Brown. *Complex Variables and Applications*. 9th ed. McGraw-Hill Education, 2014. (Chapter 1, "Complex Numbers," discusses De Moivre's formula and roots of complex numbers.)

## 8. ASCII diagrams

```text
       Imaginary Axis
             ^
             |
             |
             |  z^3 (r^3, 3θ)
             | /
             |/
             *-----------> Real Axis
            /|
           / |
          /  |
         *   |  z^2 (r^2, 2θ)
        /    |
       /     |
      *      |  z (r, θ)
     /       |
    /        |
   o---------+-----------------
 (0,0)       |

  Diagram: Powers of a Complex Number on the Argand Plane

Description:
- 'o' at the origin (0,0).
- 'z' is a complex number represented by a vector from the origin. It has a modulus 'r' (length) and an argument 'θ' (angle with the positive Real Axis).
- 'z^2' is another vector. Its length is r^2, and its angle is 2θ. It's further from the origin (if r > 1) and rotated further counter-clockwise.
- 'z^3' is yet another vector. Its length is r^3, and its angle is 3θ. It's even further from the origin (if r > 1) and rotated even more.

This diagram illustrates how De Moivre's theorem works visually: each successive integer power multiplies the angle by 'n' and raises the modulus to 'n'. If r=1, all powers lie on the unit circle, just at different angles.
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Think of "De Moivre's" as "De **M**ultiply **O**nly **I**n **V**ector **R**otation **E**quation's **S**tatement."
    The key is that the power `n` goes *inside* the angle, multiplying it, but *outside* the modulus, raising it to the power.
    Visually, imagine a complex number as a hand on a clock. Raising it to the power 'n' means the hand stretches by $r^n$ and spins 'n' times its original angle.

2.  **The 1-3 Formulas/Facts You MUST Overlearn:**
    *   **The Core Theorem:** For $z = r(\cos\theta + i\sin\theta)$, $z^n = r^n(\cos(n\theta) + i\sin(n\theta))$ for any integer $n$.
    *   **Unit Modulus Case:** $(\cos\theta + i\sin\theta)^n = \cos(n\theta) + i\sin(n\theta)$. (This is the most common form seen in proofs and derivations).
    *   **Roots of Unity General Form:** The $n$-th roots of $w = R(\cos\Phi + i\sin\Phi)$ are $z_k = \sqrt[n]{R}\left(\cos\left(\frac{\Phi + 2k\pi}{n}\right) + i\sin\left(\frac{\Phi + 2k\pi}{n}\right)\right)$ for $k=0, 1, \ldots, n-1$.

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review the statement, proof outline, and one simple example.
    *   **Day 3:** Review the theorem, try two examples (one positive power, one negative power).
    *   **Day 7:** Review the theorem, try a roots of unity problem.
    *   **Day 16:** Review the theorem, try deriving a trigonometric identity.
    *   **Day 35:** Review all aspects, including common pitfalls and the first-principles derivation.

4.  **The First-Principles Re-derivation Pathway:**
    If you ever forget De Moivre's theorem, you can always rebuild it from Euler's formula and basic exponent rules.
    *   **Start with Euler's Formula:** $e^{i\theta} = \cos\theta + i\sin\theta$.
    *   **Raise to the power $n$:** $(e^{i\theta})^n = e^{in\theta}$.
    *   **Apply Euler's Formula again to the RHS:** $e^{in\theta} = \cos(n\theta) + i\sin(n\theta)$.
    *   **Equate LHS and RHS:** $(\cos\theta + i\sin\theta)^n = \cos(n\theta) + i\sin(n\theta)$.
    This re-derivation is incredibly elegant and confirms the theorem for all real $n$ (not just integers), though the standard proof for integers uses induction. For the general complex number $z = r(\cos\theta + i\sin\theta)$, simply write $z = r e^{i\theta}$, then $z^n = (r e^{i\theta})^n = r^n (e^{i\theta})^n = r^n e^{in\theta} = r^n(\cos(n\theta) + i\sin(n\theta))$.

## 10. Connections — what this leads to

De Moivre's theorem is a cornerstone in complex analysis and has profound implications and connections to many advanced mathematical topics:

*   **Roots of Unity:** The most direct application is finding the $n$-th roots of any complex number, which leads to the concept of roots of unity (the $n$-th roots of 1). These roots form vertices of regular polygons inscribed in the unit circle and are fundamental in abstract algebra (group theory, field theory).
*   **Solving Polynomial Equations:** De Moivre's theorem allows us to find roots of complex numbers, which is crucial for solving polynomial equations, especially those with complex coefficients or roots. The Fundamental Theorem of Algebra states that a polynomial of degree $n$ has $n$ complex roots (counting multiplicity), and De Moivre's helps find them.
*   **Trigonometric Identities:** As shown in the examples, De Moivre's theorem provides a systematic way to derive multiple-angle formulas for sine and cosine (e.g., $\cos(n\theta)$ and $\sin(n\theta)$ in terms of powers of $\cos\theta$ and $\sin\theta$). This bypasses tedious algebraic manipulation of sum-product formulas.
*   **Euler's Formula and Complex Exponentials:** De Moivre's theorem is essentially a direct consequence of Euler's formula, $e^{i\theta} = \cos\theta + i\sin\theta$. Understanding this connection solidifies the concept of complex exponentials, which are ubiquitous in differential equations, quantum mechanics, and electrical engineering.
*   **Fourier Series and Transforms:** The representation of periodic functions as sums of sines and cosines (Fourier series) and non-periodic functions as integrals of sines and cosines (Fourier transforms) heavily relies on complex exponentials ($e^{in\theta}$), where De Moivre's theorem provides the geometric intuition for their behavior under powers. This is vital in signal processing, image analysis, and solving partial differential equations.
*   **Fractals (Mandelbrot Set):** The iterative process $z_{n+1} = z_n^2 + c$ that defines the Mandelbrot set involves squaring complex numbers. While not directly De Moivre's, the underlying principle of how complex number powers behave (magnitudes grow/shrink, angles double) is essential for understanding the dynamics that create such intricate fractal patterns.
*   **Linear Algebra and Rotations:** In higher dimensions, rotations can be represented by matrices. Complex numbers (and De Moivre's theorem) provide a 2D analogue for understanding rotations, which extends to quaternions for 3D rotations, crucial in computer graphics and robotics.

## 11. Self-check questions

1.  Calculate $(1-i\sqrt{3})^5$ and express your answer in rectangular form.
2.  Use De Moivre's theorem to find the value of $\left(\cos\left(\frac{\pi}{12}\right) + i\sin\left(\frac{\pi}{12}\right)\right)^8$. Express your answer in rectangular form.
3.  Find all fourth roots of $-16$. Express your answers in rectangular form.
4.  By considering $(\cos\theta + i\sin\theta)^4$, derive an expression for $\sin(4\theta)$ in terms of powers of $\sin\theta$ and $\cos\theta$.
5.  A complex number $z$ has $|z|=3$ and $\arg(z) = \frac{2\pi}{3}$. What is the argument of $z^{-2}$? What is the modulus of $z^{-2}$?