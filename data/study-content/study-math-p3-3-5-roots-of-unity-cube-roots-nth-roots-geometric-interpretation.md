## 1. What it is — in plain English

Imagine you have a number, and you want to find other numbers that, when you multiply them by themselves a certain number of times, give you back the number 1. For instance, if you want numbers that, when squared (multiplied by themselves once), give 1, you'd easily think of 1 and -1. $1 \times 1 = 1$ and $(-1) \times (-1) = 1$. Simple enough.

Now, what if you wanted numbers that, when cubed (multiplied by themselves twice), give 1? You'd certainly think of 1 again ($1 \times 1 \times 1 = 1$). But are there others? What about when you raise them to the fourth power, or the fifth, or any "nth" power?

"Roots of unity" are simply *all* the numbers — including the complex ones you've been learning about — that satisfy this condition. They are the solutions to the equation $z^n = 1$, where $n$ is a positive whole number. It turns out there are always exactly $n$ such numbers, and most of them are complex numbers, not just real numbers like 1 or -1.

These special numbers all have a magnitude (or distance from the origin on a graph) of 1, and they are neatly spread out around a circle. Think of them like evenly spaced points on the edge of a clock face, but instead of hours, they represent these unique complex numbers that "unity" (the number 1) is made of when you take its roots.

## 2. Why it matters — real-world applications

The concept of roots of unity might seem abstract, but it underpins many critical technologies and scientific principles:

1.  **Digital Signal Processing (DSP) and the Fast Fourier Transform (FFT):** This is perhaps the most significant application. The FFT is an algorithm that efficiently breaks down a complex signal (like sound waves, radio signals, or images) into its constituent frequencies. It's used everywhere:
    *   **Audio processing:** MP3 compression, noise cancellation in headphones, music synthesizers.
    *   **Image processing:** JPEG compression, medical imaging (MRI, CT scans).
    *   **Telecommunications:** Modems, Wi-Fi, 5G networks use FFT for efficient data transmission and reception.
    *   **Company example:** Qualcomm designs chips that leverage FFT for mobile communications. MATLAB and Python's SciPy library provide highly optimized FFT implementations.

2.  **Electrical Engineering (AC Circuits and Power Systems):** In alternating current (AC) circuits, voltages and currents are often represented as complex numbers (phasors). Roots of unity are used to analyze polyphase power systems (like three-phase power used in industrial settings and power grids). They help in understanding phase shifts and balancing loads.
    *   **Example:** In a three-phase power system, the voltages are $120^\circ$ apart, which corresponds directly to the cube roots of unity (excluding 1 itself, but related to the angles $0, 2\pi/3, 4\pi/3$).

3.  **Quantum Mechanics and Quantum Computing:** In quantum mechanics, complex numbers are fundamental to describing wave functions, which dictate the probability of finding a particle in a certain state. Roots of unity appear in the mathematics of quantum gates and algorithms, particularly in quantum Fourier transforms, which are the quantum analogue of the classical FFT.
    *   **Example:** Shor's algorithm for factoring large numbers, a cornerstone of quantum computing, heavily relies on the quantum Fourier transform, which inherently uses roots of unity.

4.  **Cryptography and Error-Correcting Codes:** Roots of unity are used in advanced algebraic structures (like finite fields) that form the basis of modern cryptography (e.g., elliptic curve cryptography) and error-correcting codes (e.g., Reed-Solomon codes used in CDs, DVDs, and QR codes). These codes allow data to be transmitted reliably even with noise or corruption.

## 3. Prerequisites — what you must know first

Before diving deep into roots of unity, ensure you have a solid grasp of these foundational concepts:

*   **Complex Numbers (Basic Definition):** Understanding what $i$ is ($i^2 = -1$) and how to represent complex numbers in the standard form $z = a + bi$, where $a$ and $b$ are real numbers.
*   **Arithmetic of Complex Numbers:** How to add, subtract, multiply, and divide complex numbers in $a+bi$ form.
*   **Argand Diagram:** The ability to plot complex numbers as points in a 2D plane, with the real part on the x-axis and the imaginary part on the y-axis.
*   **Modulus of a Complex Number:** The distance of a complex number from the origin on the Argand diagram, denoted $|z| = \sqrt{a^2 + b^2}$.
*   **Argument of a Complex Number:** The angle (usually in radians) that the line connecting the origin to the complex number makes with the positive real axis, denoted $\arg(z)$ or $\theta$. You should be comfortable finding the principal argument (typically $-\pi < \theta \le \pi$).
*   **Polar Form of Complex Numbers:** Representing a complex number as $z = r(\cos\theta + i\sin\theta)$, where $r$ is the modulus and $\theta$ is the argument.
*   **Euler's Formula:** The profound identity $e^{i\theta} = \cos\theta + i\sin\theta$, which allows complex numbers to be written in exponential form $z = re^{i\theta}$.
*   **De Moivre's Theorem:** A crucial theorem stating that $(r(\cos\theta + i\sin\theta))^n = r^n(\cos(n\theta) + i\sin(n\theta))$, or $(re^{i\theta})^n = r^n e^{in\theta}$. This is central to finding powers and roots of complex numbers.
*   **Basic Algebra:** Solving polynomial equations, rules of exponents, and manipulating algebraic expressions.
*   **Trigonometry:** Knowledge of the unit circle, values of sine and cosine for common angles (e.g., $0, \pi/6, \pi/4, \pi/3, \pi/2$, etc.), and the periodic nature of trigonometric functions (e.g., $\cos(\theta) = \cos(\theta + 2\pi k)$).

## 4. The core idea — step by step

Let's break down the concept of roots of unity systematically. Our goal is to find all solutions to the equation $z^n = 1$.

### Step 1: Understand the definition of a "root of unity"

**Plain English:** We're looking for any number $z$ that, when multiplied by itself $n$ times, results in 1. The "unity" part refers to the number 1.

**Small concrete example:**
If $n=2$, we're looking for solutions to $z^2 = 1$.
If $n=3$, we're looking for solutions to $z^3 = 1$.

**Formal/Mathematical Version:**
The $n$-th roots of unity are the solutions to the polynomial equation:
$$z^n = 1$$
where $z$ is a complex number and $n$ is a positive integer.

**What could go wrong:** You might initially only think of real numbers like $1$ or $-1$. Remember that we are working in the domain of complex numbers, so there will likely be non-real solutions.

### Step 2: Express 1 in its general complex form

**Plain English:** The number 1 is just a point on the Argand diagram. We need to write it in a special way (polar or exponential form) that accounts for its periodic nature around the origin. The number 1 has a modulus of 1 and an argument of 0. However, because angles repeat every $2\pi$ radians, 1 can also be represented with arguments $2\pi, 4\pi, -2\pi$, and so on.

**Small concrete example:**
$1 = 1 \cdot (\cos(0) + i\sin(0))$
$1 = 1 \cdot (\cos(2\pi) + i\sin(2\pi))$
$1 = 1 \cdot (\cos(4\pi) + i\sin(4\pi))$
And generally, $1 = 1 \cdot (\cos(2\pi k) + i\sin(2\pi k))$ for any integer $k$.

**Formal/Mathematical Version:**
Using Euler's formula, $e^{i\theta} = \cos\theta + i\sin\theta$, we can write the number 1 (which has modulus $r=1$ and argument $\theta$) as:
$$1 = 1 \cdot e^{i(0 + 2\pi k)} = e^{i2\pi k}$$
where $k$ is any integer ($k \in \mathbb{Z}$). This is crucial because it captures all possible "angles" for the number 1.

**What could go wrong:** Forgetting the $2\pi k$ term is the most common mistake. If you only use $k=0$ (i.e., $1 = e^{i0}$), you will only find one root, not all $n$ of them.

### Step 3: Apply De Moivre's Theorem (or properties of exponents) to find $z$

**Plain English:** Now that we have $z^n = e^{i2\pi k}$, we need to "undo" the power of $n$. We do this by raising both sides to the power of $1/n$. De Moivre's Theorem tells us exactly how to handle powers of complex numbers in polar form.

**Small concrete example:**
If $z^3 = e^{i2\pi k}$, then $z = (e^{i2\pi k})^{1/3}$.
Using exponent rules, this becomes $z = e^{i(2\pi k)/3}$.

**Formal/Mathematical Version:**
Starting from $z^n = e^{i2\pi k}$, we take the $n$-th root of both sides:
$$z = (e^{i2\pi k})^{1/n}$$
By De Moivre's Theorem (or the property $(e^a)^b = e^{ab}$), this simplifies to:
$$z_k = e^{i \frac{2\pi k}{n}}$$
Expanding this back into trigonometric form:
$$z_k = \cos\left(\frac{2\pi k}{n}\right) + i\sin\left(\frac{2\pi k}{n}\right)$$
Here, the subscript $k$ indicates that each value of $k$ will give us a potentially different root.

**What could go wrong:** Incorrectly applying De Moivre's Theorem, for example, distributing the $1/n$ in a way that doesn't follow the rules of exponents. Or, forgetting that $k$ is still a variable that we need to choose specific values for.

### Step 4: Determine the distinct values of $k$

**Plain English:** Since $k$ can be any integer, it seems like we might get infinitely many roots. However, the trigonometric functions $\cos$ and $\sin$ are periodic. This means that after a certain number of $k$ values, the roots will start repeating. We need to find the specific range of $k$ values that give us *unique* roots.

**Small concrete example:**
For $n=3$, the formula is $z_k = e^{i \frac{2\pi k}{3}}$.
Let's try some $k$ values:
$k=0: z_0 = e^{i0} = 1$
$k=1: z_1 = e^{i \frac{2\pi}{3}}$
$k=2: z_2 = e^{i \frac{4\pi}{3}}$
$k=3: z_3 = e^{i \frac{6\pi}{3}} = e^{i2\pi} = e^{i0} = z_0$. This is a repeat!
$k=4: z_4 = e^{i \frac{8\pi}{3}} = e^{i (2\pi + \frac{2\pi}{3})} = e^{i \frac{2\pi}{3}} = z_1$. Another repeat!
So, for $n=3$, we only get 3 distinct roots for $k=0, 1, 2$.

**Formal/Mathematical Version:**
The $n$ distinct $n$-th roots of unity are obtained by using the values of $k$ from $0$ up to $n-1$:
$$k = 0, 1, 2, \dots, n-1$$
Any other integer value of $k$ will result in a root that is identical to one of these $n$ roots due to the $2\pi$ periodicity of the complex exponential function. For example, $e^{i \frac{2\pi (k+n)}{n}} = e^{i (\frac{2\pi k}{n} + 2\pi)} = e^{i \frac{2\pi k}{n}} \cdot e^{i2\pi} = e^{i \frac{2\pi k}{n}} \cdot 1 = e^{i \frac{2\pi k}{n}}$.

**What could go wrong:** Using $k=1, \dots, n$ instead of $k=0, \dots, n-1$. While this also gives $n$ roots, $k=0$ is often the simplest and represents the real root $z=1$. Or, using too many $k$ values and incorrectly thinking you've found more than $n$ distinct roots.

### Step 5: Calculate the roots and express them in desired form ($a+bi$)

**Plain English:** Once you have the formula for $z_k$ and the correct range for $k$, you just plug in each $k$ value and calculate the cosine and sine to get the complex number in its standard $a+bi$ form.

**Small concrete example:**
For $n=3$, we found $z_0, z_1, z_2$:
$z_0 = e^{i0} = \cos(0) + i\sin(0) = 1 + 0i = 1$
$z_1 = e^{i \frac{2\pi}{3}} = \cos\left(\frac{2\pi}{3}\right) + i\sin\left(\frac{2\pi}{3}\right) = -\frac{1}{2} + i\frac{\sqrt{3}}{2}$
$z_2 = e^{i \frac{4\pi}{3}} = \cos\left(\frac{4\pi}{3}\right) + i\sin\left(\frac{4\pi}{3}\right) = -\frac{1}{2} - i\frac{\sqrt{3}}{2}$
These are the three cube roots of unity.

**Formal/Mathematical Version:**
The $n$-th roots of unity are $z_k = \cos\left(\frac{2\pi k}{n}\right) + i\sin\left(\frac{2\pi k}{n}\right)$ for $k=0, 1, \dots, n-1$. Each of these values will be a complex number of the form $a+bi$.

**What could go wrong:** Making errors in evaluating trigonometric functions for specific angles. Ensure you are comfortable with the unit circle and special angle values.

### Step 6: Geometric Interpretation

**Plain English:** If you plot these $n$ roots on the Argand diagram, a beautiful pattern emerges. All of them lie exactly on the circle with radius 1 (the "unit circle"), centered at the origin. Furthermore, they are perfectly evenly spaced around this circle, forming the vertices of a regular $n$-sided polygon (an $n$-gon).

**Small concrete example:**
For $n=3$ (cube roots), the roots are $1$, $-\frac{1}{2} + i\frac{\sqrt{3}}{2}$, and $-\frac{1}{2} - i\frac{\sqrt{3}}{2}$.
Plotting these:
*   $1$ is at $(1,0)$.
*   $-\frac{1}{2} + i\frac{\sqrt{3}}{2}$ is at $(-0.5, 0.866)$.
*   $-\frac{1}{2} - i\frac{\sqrt{3}}{2}$ is at $(-0.5, -0.866)$.
These three points form an equilateral triangle inscribed in the unit circle. The angles between consecutive roots (measured from the origin) are $2\pi/3$ radians ($120^\circ$).

**Formal/Mathematical Version:**
The $n$-th roots of unity, $z_k = e^{i \frac{2\pi k}{n}}$, all have a modulus of 1 ($|z_k| = |e^{i \frac{2\pi k}{n}}| = 1$). This means they all lie on the unit circle in the complex plane. Their arguments are $\frac{2\pi k}{n}$. The difference in argument between consecutive roots is $\frac{2\pi (k+1)}{n} - \frac{2\pi k}{n} = \frac{2\pi}{n}$. This equal spacing means they form the vertices of a regular $n$-gon inscribed in the unit circle, with one vertex always at $(1,0)$ (for $k=0$).

**What could go wrong:** Misunderstanding "equally spaced." It refers to the angular separation, not necessarily the linear distance between points (though that is also equal for a regular polygon).

### Step 7: Properties of the Roots of Unity

**Plain English:** These roots have some neat properties when you combine them. For instance, if you add them all up, you almost always get zero. If you multiply them all together, you get either 1 or -1 depending on $n$.

**Small concrete example:**
For $n=3$, the roots are $1$, $-\frac{1}{2} + i\frac{\sqrt{3}}{2}$, and $-\frac{1}{2} - i\frac{\sqrt{3}}{2}$.
Sum: $1 + \left(-\frac{1}{2} + i\frac{\sqrt{3}}{2}\right) + \left(-\frac{1}{2} - i\frac{\sqrt{3}}{2}\right) = 1 - \frac{1}{2} - \frac{1}{2} + i\frac{\sqrt{3}}{2} - i\frac{\sqrt{3}}{2} = 0$.
This property holds for $n>1$.

**Formal/Mathematical Version:**
Let $\omega_k = z_k = e^{i \frac{2\pi k}{n}}$ for $k=0, 1, \dots, n-1$.
1.  **Sum of roots:** For $n > 1$, the sum of the $n$-th roots of unity is zero:
    $$\sum_{k=0}^{n-1} \omega_k = 0$$
    This can be proven by recognizing the sum as a geometric series $1 + \omega + \omega^2 + \dots + \omega^{n-1} = \frac{1-\omega^n}{1-\omega}$, where $\omega = e^{i2\pi/n}$. Since $\omega^n = (e^{i2\pi/n})^n = e^{i2\pi} = 1$, the numerator becomes $1-1=0$.
2.  **Product of roots:** The product of the $n$-th roots of unity is $(-1)^{n-1}$:
    $$\prod_{k=0}^{n-1} \omega_k = (-1)^{n-1}$$
    This comes from Vieta's formulas for the polynomial $z^n - 1 = 0$. The product of the roots of a monic polynomial $x^n + a_{n-1}x^{n-1} + \dots + a_1x + a_0 = 0$ is $(-1)^n a_0$. Here, $a_0 = -1$, so the product is $(-1)^n (-1) = (-1)^{n+1} = (-1)^{n-1}$.
3.  **Conjugate pairs:** For $k \ne 0$ and $k \ne n/2$ (if $n$ is even), the roots appear in conjugate pairs. That is, $\overline{\omega_k} = \omega_{n-k}$. For example, $\overline{e^{i\theta}} = e^{-i\theta}$. And $e^{i \frac{2\pi (n-k)}{n}} = e^{i (2\pi - \frac{2\pi k}{n})} = e^{-i \frac{2\pi k}{n}}$.

**What could go wrong:** Forgetting the condition $n>1$ for the sum of roots. If $n=1$, the only 1st root of unity is 1, and its sum is 1, not 0.

## 5. Worked examples — multiple, with every step shown

### Example 1: Find the cube roots of unity.

**Problem:** Find all solutions to $z^3 = 1$.

**Given:** The equation $z^3 = 1$. We want to find the complex numbers $z$ that satisfy this.
**What we want:** The three distinct cube roots of unity, expressed in $a+bi$ form.

**Solution:**

1.  **Express 1 in general polar/exponential form:**
    $$1 = e^{i(0 + 2\pi k)}$$
    $$1 = e^{i2\pi k}$$
    *Explanation:* We represent the number 1 in its exponential form, remembering that its argument can be any multiple of $2\pi$ radians ($0, 2\pi, 4\pi, \dots$). This $2\pi k$ term is crucial for finding all distinct roots.

2.  **Set up the equation with $z^n$:**
    $$z^3 = e^{i2\pi k}$$
    *Explanation:* We substitute the general form of 1 into our original equation.

3.  **Solve for $z$ by taking the $n$-th root (here, cube root):**
    $$z = (e^{i2\pi k})^{1/3}$$
    $$z_k = e^{i \frac{2\pi k}{3}}$$
    *Explanation:* We raise both sides to the power of $1/3$. By De Moivre's Theorem (or exponent rules for complex exponentials), the exponent $1/3$ multiplies the argument $2\pi k$. The subscript $k$ indicates that each integer value of $k$ will give a specific root.

4.  **Determine the distinct values of $k$:**
    Since $n=3$, we need $k=0, 1, 2$. These values will give us the three distinct roots.
    *Explanation:* For $n$-th roots, we use $k$ values from $0$ to $n-1$. Any other $k$ will produce a root identical to one of these.

5.  **Calculate each root for the determined $k$ values:**

    *   **For $k=0$:**
        $$z_0 = e^{i \frac{2\pi (0)}{3}} = e^{i0}$$
        $$z_0 = \cos(0) + i\sin(0)$$
        $$z_0 = 1 + 0i = 1$$
        *Explanation:* The first root, corresponding to $k=0$, is always 1.

    *   **For $k=1$:**
        $$z_1 = e^{i \frac{2\pi (1)}{3}} = e^{i \frac{2\pi}{3}}$$
        $$z_1 = \cos\left(\frac{2\pi}{3}\right) + i\sin\left(\frac{2\pi}{3}\right)$$
        $$z_1 = -\frac{1}{2} + i\frac{\sqrt{3}}{2}$$
        *Explanation:* For $k=1$, we calculate the cosine and sine of $2\pi/3$ radians ($120^\circ$).

    *   **For $k=2$:**
        $$z_2 = e^{i \frac{2\pi (2)}{3}} = e^{i \frac{4\pi}{3}}$$
        $$z_2 = \cos\left(\frac{4\pi}{3}\right) + i\sin\left(\frac{4\pi}{3}\right)$$
        $$z_2 = -\frac{1}{2} - i\frac{\sqrt{3}}{2}$$
        *Explanation:* For $k=2$, we calculate the cosine and sine of $4\pi/3$ radians ($240^\circ$).

**Final Answer:**
The cube roots of unity are:
$$ \boxed{1, \quad -\frac{1}{2} + i\frac{\sqrt{3}}{2}, \quad -\frac{1}{2} - i\frac{\sqrt{3}}{2}} $$

**Reflection:** This example is fundamental. The trickiest part for beginners is often remembering the $2\pi k$ and correctly evaluating the trigonometric functions for the resulting angles. Also, recognizing that $z_1$ and $z_2$ are complex conjugates is a good check.

---

### Example 2: Find the fourth roots of unity and sketch them on an Argand diagram.

**Problem:** Find all solutions to $z^4 = 1$ and illustrate their positions graphically.

**Given:** The equation $z^4 = 1$.
**What we want:** The four distinct fourth roots of unity in $a+bi$ form, and their geometric representation.

**Solution:**

1.  **Express 1 in general polar/exponential form:**
    $$1 = e^{i2\pi k}$$
    *Explanation:* Same as before, using the general form for 1.

2.  **Set up the equation with $z^n$:**
    $$z^4 = e^{i2\pi k}$$
    *Explanation:* Substitute the general form of 1 into the equation.

3.  **Solve for $z$ by taking the $n$-th root (here, fourth root):**
    $$z = (e^{i2\pi k})^{1/4}$$
    $$z_k = e^{i \frac{2\pi k}{4}}$$
    $$z_k = e^{i \frac{\pi k}{2}}$$
    *Explanation:* Raise both sides to the power of $1/4$ and simplify the argument.

4.  **Determine the distinct values of $k$:**
    Since $n=4$, we need $k=0, 1, 2, 3$.
    *Explanation:* We use $k$ values from $0$ to $n-1$.

5.  **Calculate each root for the determined $k$ values:**

    *   **For $k=0$:**
        $$z_0 = e^{i \frac{\pi (0)}{2}} = e^{i0}$$
        $$z_0 = \cos(0) + i\sin(0) = 1 + 0i = 1$$

    *   **For $k=1$:**
        $$z_1 = e^{i \frac{\pi (1)}{2}} = e^{i \frac{\pi}{2}}$$
        $$z_1 = \cos\left(\frac{\pi}{2}\right) + i\sin\left(\frac{\pi}{2}\right) = 0 + i(1) = i$$

    *   **For $k=2$:**
        $$z_2 = e^{i \frac{\pi (2)}{2}} = e^{i\pi}$$
        $$z_2 = \cos(\pi) + i\sin(\pi) = -1 + i(0) = -1$$

    *   **For $k=3$:**
        $$z_3 = e^{i \frac{\pi (3)}{2}} = e^{i \frac{3\pi}{2}}$$
        $$z_3 = \cos\left(\frac{3\pi}{2}\right) + i\sin\left(\frac{3\pi}{2}\right) = 0 + i(-1) = -i$$

**Final Answer (Roots):**
The fourth roots of unity are:
$$ \boxed{1, \quad i, \quad -1, \quad -i} $$

**Sketch on Argand Diagram:**
(See ASCII diagram section for a visual representation, but imagine these points)
*   $z_0 = 1$ is at $(1,0)$
*   $z_1 = i$ is at $(0,1)$
*   $z_2 = -1$ is at $(-1,0)$
*   $z_3 = -i$ is at $(0,-1)$
These points form the vertices of a square inscribed in the unit circle.

**Reflection:** This example demonstrates how roots of unity can include real and purely imaginary numbers. The geometric interpretation as a square is very clear here, with angles separated by $\pi/2$ radians ($90^\circ$).

---

### Example 3: Find the sixth roots of unity and express them in $a+bi$ form.

**Problem:** Determine all solutions to $z^6 = 1$ and write them in the form $a+bi$.

**Given:** The equation $z^6 = 1$.
**What we want:** The six distinct sixth roots of unity in $a+bi$ form.

**Solution:**

1.  **Express 1 in general polar/exponential form:**
    $$1 = e^{i2\pi k}$$

2.  **Set up the equation with $z^n$:**
    $$z^6 = e^{i2\pi k}$$

3.  **Solve for $z$ by taking the $n$-th root (here, sixth root):**
    $$z = (e^{i2\pi k})^{1/6}$$
    $$z_k = e^{i \frac{2\pi k}{6}}$$
    $$z_k = e^{i \frac{\pi k}{3}}$$
    *Explanation:* Simplify the argument $\frac{2\pi k}{6}$ to $\frac{\pi k}{3}$.

4.  **Determine the distinct values of $k$:**
    Since $n=6$, we need $k=0, 1, 2, 3, 4, 5$.

5.  **Calculate each root for the determined $k$ values:**

    *   **For $k=0$:**
        $$z_0 = e^{i \frac{\pi (0)}{3}} = e^{i0} = \cos(0) + i\sin(0) = 1 + 0i = 1$$

    *   **For $k=1$:**
        $$z_1 = e^{i \frac{\pi}{3}} = \cos\left(\frac{\pi}{3}\right) + i\sin\left(\frac{\pi}{3}\right) = \frac{1}{2} + i\frac{\sqrt{3}}{2}$$

    *   **For $k=2$:**
        $$z_2 = e^{i \frac{2\pi}{3}} = \cos\left(\frac{2\pi}{3}\right) + i\sin\left(\frac{2\pi}{3}\right) = -\frac{1}{2} + i\frac{\sqrt{3}}{2}$$

    *   **For $k=3$:**
        $$z_3 = e^{i \frac{3\pi}{3}} = e^{i\pi} = \cos(\pi) + i\sin(\pi) = -1 + 0i = -1$$

    *   **For $k=4$:**
        $$z_4 = e^{i \frac{4\pi}{3}} = \cos\left(\frac{4\pi}{3}\right) + i\sin\left(\frac{4\pi}{3}\right) = -\frac{1}{2} - i\frac{\sqrt{3}}{2}$$
        *Note:* This is the conjugate of $z_2$.

    *   **For $k=5$:**
        $$z_5 = e^{i \frac{5\pi}{3}} = \cos\left(\frac{5\pi}{3}\right) + i\sin\left(\frac{5\pi}{3}\right) = \frac{1}{2} - i\frac{\sqrt{3}}{2}$$
        *Note:* This is the conjugate of $z_1$.

**Final Answer:**
The sixth roots of unity are:
$$ \boxed{1, \quad \frac{1}{2} + i\frac{\sqrt{3}}{2}, \quad -\frac{1}{2} + i\frac{\sqrt{3}}{2}, \quad -1, \quad -\frac{1}{2} - i\frac{\sqrt{3}}{2}, \quad \frac{1}{2} - i\frac{\sqrt{3}}{2}} $$

**Reflection:** This example shows how the roots are symmetrically distributed. Notice the conjugate pairs ($z_1$ with $z_5$, $z_2$ with $z_4$). Also, $z_0=1$ and $z_3=-1$ are real roots. The angles are multiples of $\pi/3$ ($60^\circ$), forming a regular hexagon.

---

### Example 4: Let $\omega$ be a primitive $n$-th root of unity (i.e., $\omega = e^{i2\pi/n}$). Prove that the sum of the $n$-th roots of unity is zero for $n>1$.

**Problem:** Prove that $\sum_{k=0}^{n-1} z_k = 0$ for $n>1$, where $z_k$ are the $n$-th roots of unity.

**Given:** The $n$-th roots of unity are $z_k = e^{i \frac{2\pi k}{n}}$ for $k=0, 1, \dots, n-1$. We are also given that $n>1$.
**What we want:** To demonstrate that the sum of these roots is 0.

**Solution:**

1.  **Identify the roots in terms of a fundamental root:**
    Let $\omega = e^{i \frac{2\pi}{n}}$. This is often called the *principal* $n$-th root of unity.
    Then the $n$-th roots of unity can be written as:
    $z_0 = e^{i \frac{2\pi (0)}{n}} = e^{i0} = 1$
    $z_1 = e^{i \frac{2\pi (1)}{n}} = \omega$
    $z_2 = e^{i \frac{2\pi (2)}{n}} = (e^{i \frac{2\pi}{n}})^2 = \omega^2$
    ...
    $z_{n-1} = e^{i \frac{2\pi (n-1)}{n}} = (e^{i \frac{2\pi}{n}})^{n-1} = \omega^{n-1}$
    *Explanation:* We express all roots as powers of a single fundamental root, $\omega$. This transforms the sum into a familiar series.

2.  **Formulate the sum as a geometric series:**
    The sum of the $n$-th roots of unity is:
    $$S = z_0 + z_1 + z_2 + \dots + z_{n-1}$$
    $$S = 1 + \omega + \omega^2 + \dots + \omega^{n-1}$$
    *Explanation:* This is a geometric series with first term $a=1$, common ratio $r=\omega$, and $n$ terms.

3.  **Apply the formula for the sum of a geometric series:**
    The sum of a geometric series is given by $S_n = \frac{a(1-r^n)}{1-r}$, provided $r \ne 1$.
    In our case, $a=1$ and $r=\omega$.
    $$S = \frac{1(1-\omega^n)}{1-\omega}$$
    *Explanation:* We use the standard formula for the sum of a finite geometric series. Note the condition $r \ne 1$, which means $\omega \ne 1$. This is true for $n>1$, as $\omega = e^{i2\pi/n}$ will not be 1 if $n>1$.

4.  **Evaluate $\omega^n$:**
    $$\omega^n = \left(e^{i \frac{2\pi}{n}}\right)^n$$
    $$\omega^n = e^{i \frac{2\pi n}{n}}$$
    $$\omega^n = e^{i2\pi}$$
    $$\omega^n = \cos(2\pi) + i\sin(2\pi)$$
    $$\omega^n = 1 + 0i = 1$$
    *Explanation:* By definition, raising the $n$-th root of unity $\omega$ to the power of $n$ should give 1. This step formally confirms it.

5.  **Substitute $\omega^n = 1$ back into the sum formula:**
    $$S = \frac{1(1-1)}{1-\omega}$$
    $$S = \frac{0}{1-\omega}$$
    *Explanation:* Since the numerator becomes 0, the entire sum is 0, provided the denominator is not 0.

6.  **Confirm the denominator is non-zero:**
    The denominator is $1-\omega$.
    Since we are given $n>1$, $\omega = e^{i2\pi/n}$ is not equal to 1.
    Therefore, $1-\omega \ne 0$.
    *Explanation:* This confirms that the division by zero is not an issue, and the sum is indeed 0.

**Final Answer:**
Since $\omega^n = 1$ and $1-\omega \ne 0$ for $n>1$, the sum $S = \frac{0}{1-\omega} = 0$.
Thus, the sum of the $n$-th roots of unity is zero for $n>1$.
$$ \boxed{\sum_{k=0}^{n-1} z_k = 0 \quad \text{for } n>1} $$

**Reflection:** This example highlights a key property of roots of unity and demonstrates the power of representing them as a geometric series. It also reinforces the understanding of $\omega^n=1$ and the condition $n>1$.

## 6. Common mistakes and traps

1.  **Forgetting the $2\pi k$ term:** Many students forget to include $2\pi k$ in the argument of 1 when setting up the equation, leading them to find only one root (usually $z=1$) instead of all $n$ distinct roots.
    *   *Why it happens:* Overlooking the periodic nature of trigonometric functions and complex exponentials.

2.  **Incorrect range for $k$:** Using $k=1, 2, \dots, n$ instead of $k=0, 1, \dots, n-1$. While this also yields $n$ roots, $k=0$ typically gives the simplest root, $z=1$, and is standard practice. More importantly, using too many $k$ values (e.g., $k=0, \dots, n$) will result in repeating roots.
    *   *Why it happens:* Not fully understanding that $k$ cycles through $n$ unique values before repeating.

3.  **Errors in evaluating trigonometric functions:** Incorrectly calculating $\cos(\theta)$ or $\sin(\theta)$ for the arguments $\frac{2\pi k}{n}$. This often occurs for angles outside the first quadrant or for special angles where values like $\sqrt{3}/2$ or $1/2$ are involved.
    *   *Why it happens:* Weakness in unit circle knowledge or basic trigonometry.

4.  **Assuming all roots are real:** Forgetting that complex numbers are involved and mistakenly expecting only real solutions (like 1 and -1 for even $n$, or just 1 for odd $n$).
    *   *Why it happens:* Not fully embracing the complex number system and its implications for polynomial roots.

5.  **Confusing $z^n=1$ with $z^n=w$ (where $w \ne 1$):** While the method is similar, the specific properties (sum of roots is 0, product is $(-1)^{n-1}$) only apply to roots of unity. The general case $z^n=w$ requires finding the modulus and argument of $w$ first.
    *   *Why it happens:* Generalizing properties without checking the specific conditions.

6.  **Algebraic errors with De Moivre's Theorem:** Mistakes in applying the power rule, such as $(e^{i\theta})^n = e^{i\theta^n}$ instead of $e^{in\theta}$, or incorrect handling of fractions in the exponent.
    *   *Why it happens:* Lack of practice with exponent rules for complex numbers.

## 7. Textbook-precise explanation

The **$n$-th roots of unity** are defined as the $n$ distinct complex numbers $z$ that satisfy the equation $z^n = 1$, where $n$ is a positive integer.

To find these roots, we first express the number 1 in its general exponential form. Since 1 has a modulus of $r=1$ and its argument can be any integer multiple of $2\pi$ radians, we write:
$$1 = 1 \cdot e^{i(0 + 2\pi k)} = e^{i2\pi k}$$
for any integer $k \in \mathbb{Z}$.

Substituting this into the equation $z^n = 1$, we get:
$$z^n = e^{i2\pi k}$$
Taking the $n$-th root of both sides, and applying De Moivre's Theorem (or the properties of complex exponentials), we find the general form for the $n$-th roots of unity:
$$z_k = (e^{i2\pi k})^{1/n} = e^{i \frac{2\pi k}{n}}$$
These roots can also be expressed in polar (trigonometric) form as:
$$z_k = \cos\left(\frac{2\pi k}{n}\right) + i\sin\left(\frac{2\pi k}{n}\right)$$
The $n$ distinct roots are obtained by choosing $n$ consecutive integer values for $k$. By convention, we use $k = 0, 1, 2, \dots, n-1$. Any other integer value of $k$ will yield a root identical to one of these $n$ values due to the $2\pi$ periodicity of the complex exponential function.

**Geometric Interpretation:**
All $n$-th roots of unity lie on the unit circle in the complex plane (i.e., $|z_k|=1$ for all $k$). They are equally spaced around this circle, forming the vertices of a regular $n$-sided polygon (an $n$-gon) inscribed within the unit circle. One vertex of this $n$-gon is always at the point $(1,0)$ on the real axis, corresponding to $z_0 = 1$. The angular separation between consecutive roots is $\frac{2\pi}{n}$ radians.

**Properties:**
Let $\omega_k$ denote the $n$-th roots of unity.
1.  **Sum of roots:** For $n > 1$, the sum of the $n$-th roots of unity is zero:
    $$\sum_{k=0}^{n-1} \omega_k = 0$$
    This follows from the sum of a geometric series $1 + \omega + \omega^2 + \dots + \omega^{n-1} = \frac{1-\omega^n}{1-\omega}$, where $\omega = e^{i2\pi/n}$. Since $\omega^n=1$ for $n>1$, the numerator is zero.
2.  **Product of roots:** The product of the $n$-th roots of unity is $(-1)^{n-1}$:
    $$\prod_{k=0}^{n-1} \omega_k = (-1)^{n-1}$$
    This can be derived from Vieta's formulas applied to the polynomial $z^n - 1 = 0$.
3.  **Conjugate pairs:** For $n>2$, the non-real roots occur in conjugate pairs. That is, if $\omega_k$ is a root, then its conjugate $\overline{\omega_k}$ is also a root ($\omega_{n-k}$).

**Reference:** This explanation aligns with standard treatments found in textbooks on complex analysis or advanced calculus. For instance, see "Complex Variables and Applications" by Churchill and Brown, or "Calculus" by James Stewart, typically in chapters discussing complex numbers and De Moivre's Theorem. (e.g., Stewart, Calculus, 9e, §10.3).

## 8. ASCII diagrams

Here are ASCII diagrams illustrating the geometric interpretation of roots of unity on the Argand diagram (unit circle).

### Cube Roots of Unity ($n=3$)

These roots form an equilateral triangle.
$z_0 = 1$
$z_1 = -1/2 + i\sqrt{3}/2$
$z_2 = -1/2 - i\sqrt{3}/2$

```text
       Imaginary Axis (Im)
         ^
         |
         |    z1
         *
       /   \
      /     \
     /       \
  --+---------+----> Real Axis (Re)
 -1 |    O    | 1
     \       / z0
      \     /
       \   /
         *
         | z2
         |
```
*Description:* A unit circle centered at the origin. The points $z_0, z_1, z_2$ are located on this circle. $z_0$ is at $(1,0)$. $z_1$ is in the second quadrant, $120^\circ$ from $z_0$. $z_2$ is in the third quadrant, $240^\circ$ from $z_0$ (or $120^\circ$ from $z_1$). Connecting these points forms an equilateral triangle.

### Fourth Roots of Unity ($n=4$)

These roots form a square.
$z_0 = 1$
$z_1 = i$
$z_2 = -1$
$z_3 = -i$

```text
       Imaginary Axis (Im)
         ^
         | z1
         *
         |
  *------+------*----> Real Axis (Re)
 z2 -1   | O    1 z0
         |
         *
         | z3
```
*Description:* A unit circle centered at the origin. The points $z_0, z_1, z_2, z_3$ are located on this circle. $z_0$ is at $(1,0)$. $z_1$ is at $(0,1)$. $z_2$ is at $(-1,0)$. $z_3$ is at $(0,-1)$. Connecting these points forms a square.

### General $n$-th Roots of Unity

For any $n$, the roots will form a regular $n$-gon.
```text
       Imaginary Axis (Im)
         ^
         |  z_1
         *
       /   \
      /     \
     /       \
  --+---------+----> Real Axis (Re)
    |    O    | z_0 (always at 1)
     \       /
      \     /
       \   /
         *
         | z_{n-1}
```
*Description:* A unit circle centered at the origin. The first root, $z_0$, is always at $(1,0)$. The subsequent roots $z_1, z_2, \dots, z_{n-1}$ are arranged counter-clockwise, each separated by an angle of $2\pi/n$ radians from the previous one, forming a regular $n$-sided polygon inscribed within the unit circle.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Think of "Roots of **UNITY**" as points on the **UNIT** circle that are **EVENLY SPACED**.
    *   **U**nit Circle: Always on the circle of radius 1.
    *   **N**-gon: They form a regular polygon with $n$ sides.
    *   **I**ncrements of $2\pi/n$: The angle between each root is $2\pi/n$.
    *   **T**hrough $k=0, \dots, n-1$: This is the range for $k$.
    *   **Y**es, one is always 1: $z_0=1$ is always a root.

2.  **1-3 Formulas/Facts to Overlearn:**
    *   **The General Formula:** $z_k = e^{i \frac{2\pi k}{n}}$ for $k=0, 1, \dots, n-1$. This is the absolute core.
    *   **Geometric Visualization:** All roots lie on the unit circle and form a regular $n$-gon.
    *   **Sum of Roots:** For $n>1$, the sum of the $n$-th roots of unity is 0. ($\sum z_k = 0$)

3.  **Spaced-Repetition Schedule:**
    *   **Review 1:** After 1 day. Redo one example from scratch.
    *   **Review 2:** After 3 days. Try to derive the formula without looking.
    *   **Review 3:** After 7 days. Explain the geometric interpretation aloud to yourself.
    *   **Review 4:** After 16 days. Solve a new problem involving finding roots and one of their properties (e.g., sum or product).
    *   **Review 5:** After 35 days. Re-derive the sum of roots property.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the formula $z_k = e^{i \frac{2\pi k}{n}}$, you can always rebuild it:
    *   **Start with the definition:** $z^n = 1$.
    *   **Express 1 in general polar form:** Remember that 1 is $(1,0)$ on the Argand diagram, but angles repeat. So, $1 = \cos(2\pi k) + i\sin(2\pi k)$ (or $e^{i2\pi k}$). The $2\pi k$ is crucial!
    *   **Substitute and apply De Moivre's Theorem:** $z^n = e^{i2\pi k} \Rightarrow z = (e^{i2\pi k})^{1/n}$. De Moivre's (or exponent rules) tells you to multiply the exponents: $z = e^{i \frac{2\pi k}{n}}$.
    *   **Identify distinct roots:** Remember that $k$ takes values $0, 1, \dots, n-1$ to give the $n$ unique roots.

This pathway ensures that even if a specific formula slips your mind, you can reconstruct it logically from fundamental principles.

## 10. Connections — what this leads to

The concept of roots of unity is a fundamental building block in several advanced areas of mathematics and its applications:

1.  **Fourier Analysis (Discrete Fourier Transform - DFT and FFT):** The DFT, which transforms a sequence of data points from the time domain to the frequency domain, uses roots of unity extensively. The terms $e^{-i2\pi jk/N}$ in the DFT formula are precisely the $N$-th roots of unity. The Fast Fourier Transform (FFT) is an efficient algorithm for computing the DFT, and its efficiency directly stems from the properties and symmetries of roots of unity. This is critical in signal processing, image processing, and data compression.

2.  **Group Theory and Abstract Algebra:** The set of $n$-th roots of unity forms a cyclic group under multiplication, denoted $C_n$. This is one of the simplest and most important examples of a finite group. Understanding this group helps in studying more complex algebraic structures and their symmetries.

3.  **Galois Theory:** Roots of unity are central to understanding the solvability of polynomial equations by radicals. For example, the fact that fifth-degree (quintic) equations cannot generally be solved by radicals is a profound result of Galois theory, which heavily relies on the properties of roots of unity and their associated field extensions.

4.  **Number Theory:** Roots of unity are used in cyclotomic fields, which are extensions of the rational numbers obtained by adjoining roots of unity. These fields are crucial in modern number theory, particularly in areas like Fermat's Last Theorem and class field theory.

5.  **Complex Analysis:** Roots of unity appear in various contexts, such as series expansions, contour integration, and the theory of residues. They are special points on the unit circle that often simplify calculations or reveal deep properties of complex functions.

6.  **Polynomial Equations:** The ability to find roots of unity extends naturally to finding the roots of any complex number $w$ (i.e., solving $z^n = w$). This is a direct application of the same method, just starting with $w = |w|e^{i(\arg(w) + 2\pi k)}$. It allows us to find all $n$ roots of any complex number, not just 1.

## 11. Self-check questions

1.  Find all the square roots of unity and express them in $a+bi$ form.
2.  Determine the fifth roots of unity and write them in exponential form $e^{i\theta}$. Leave the arguments as fractions of $\pi$.
3.  Express the cube roots of unity in $a+bi$ form and verify that their sum is zero.
4.  Sketch the seventh roots of unity on an Argand diagram. Describe their positions relative to each other and the unit circle.
5.  If $\omega$ is a primitive $n$-th root of unity (i.e., $\omega = e^{i2\pi/n}$), prove that $1 + \omega + \omega^2 + \dots + \omega^{n-1} = 0$ for $n>1$. Explain why the condition $n>1$ is important.