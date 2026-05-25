## 1. What it is — in plain English

Imagine you have a special kind of number called a "complex number." Unlike the numbers you're used to (like 3, -5, or 1/2), complex numbers have two parts: a regular part and an "imaginary" part. You can think of them as points on a 2D plane, not just on a line.

Now, imagine you have a function that takes one of these complex numbers as input and spits out another complex number as output. We call this a "complex function." Just like some regular functions are "smooth" (meaning you can draw them without lifting your pencil and they don't have sharp corners), some complex functions are also "smooth" in a very special way.

When a complex function is "smooth" in this specific way, we call it "analytic" (or sometimes "holomorphic"). This "smoothness" is much stronger than just being smooth in the normal 2D sense; it means the function behaves incredibly nicely, almost as if it were a function of a single variable, even though it lives in two dimensions. The "Cauchy-Riemann equations" are like a secret code or a special test that tells us if a complex function has this super-smooth, "analytic" property. If a complex function passes this test, it unlocks a whole world of powerful mathematical tools.

## 2. Why it matters — real-world applications

The concept of analytic functions and the Cauchy-Riemann equations are fundamental to complex analysis, a field with surprisingly broad and deep applications across science and engineering.

1.  **Fluid Dynamics and Aerodynamics:** Analytic functions are crucial for modeling "potential flow" in fluids, which describes the motion of incompressible, irrotational, inviscid fluids. The real and imaginary parts of an analytic function can represent the velocity potential and stream function, respectively. This allows engineers at companies like **Boeing** or **Airbus** to analyze airflow around airfoils (like airplane wings) and design more efficient aircraft, predict lift and drag, and understand fluid behavior without needing to solve the full, complex Navier-Stokes equations in certain idealized scenarios.

2.  **Electrical Engineering and Signal Processing:** In the analysis of alternating current (AC) circuits, complex numbers are used extensively to represent voltages and currents (phasors). Analytic functions provide a powerful framework for understanding and designing filters, analyzing stability of systems, and processing signals. For instance, the Laplace transform and Fourier transform, which are cornerstones of signal processing and control theory (used by companies like **Qualcomm** for wireless communication or **Texas Instruments** for chip design), rely heavily on concepts from complex analysis, including contour integration around poles and zeros of analytic functions.

3.  **Quantum Mechanics:** In quantum mechanics, wave functions often involve complex numbers. The mathematical framework for solving many problems in quantum field theory and understanding the behavior of particles at a fundamental level frequently utilizes complex analysis. For example, calculating scattering amplitudes or understanding the properties of propagators often involves contour integration techniques over complex planes, where the analyticity of functions is a key assumption that simplifies calculations immensely. This is fundamental to research at institutions like **CERN** or in theoretical physics departments worldwide.

4.  **Image Processing and Computer Graphics (Conformal Mapping):** A special property of analytic functions is that they preserve angles (they are "conformal"). This property is incredibly useful in transforming complex shapes and images while maintaining local geometry. For example, in cartography, conformal maps are used to project the spherical Earth onto a flat map while preserving local shapes. In computer graphics, conformal mappings can be used for texture mapping, mesh generation, or creating visually appealing distortions, allowing companies like **Pixar** or **Adobe** to develop sophisticated tools for artists and designers.

5.  **Heat Conduction and Electrostatics:** In 2D problems involving steady-state heat conduction or electrostatics, the temperature distribution or electric potential can often be described by harmonic functions. The real and imaginary parts of any analytic function are harmonic functions. This connection allows engineers and physicists to solve complex boundary value problems in these fields using the powerful tools of complex analysis.

## 3. Prerequisites — what you must know first

To truly grasp the concepts of analytic functions and the Cauchy-Riemann equations, you need a solid foundation in several areas of mathematics. If any of these feel unfamiliar, pause and review them before proceeding.

*   **Complex Numbers (Arithmetic and Geometry):**
    *   **Definition:** Understanding $z = x + iy$, where $i = \sqrt{-1}$.
    *   **Operations:** Addition, subtraction, multiplication, division of complex numbers.
    *   **Conjugate:** $\bar{z} = x - iy$.
    *   **Modulus:** $|z| = \sqrt{x^2 + y^2}$.
    *   **Polar Form:** $z = r(\cos \theta + i \sin \theta)$.
    *   **Euler's Formula:** $e^{i\theta} = \cos \theta + i \sin \theta$, leading to $z = re^{i\theta}$.
    *   **Geometric Interpretation:** Representing complex numbers as points or vectors in the complex plane.

*   **Multivariable Calculus (Partial Derivatives, Limits, Continuity):**
    *   **Functions of Multiple Variables:** Understanding $f(x,y)$ and its domain/range.
    *   **Limits and Continuity:** The formal definition of limits for functions of two variables, and what it means for a function to be continuous at a point or in a region.
    *   **Partial Derivatives:** How to calculate $\frac{\partial f}{\partial x}$ and $\frac{\partial f}{\partial y}$ for a function $f(x,y)$.
    *   **Differentiability in $\mathbb{R}^2$:** Understanding what it means for a function $f(x,y)$ to be differentiable in the multivariable sense (existence of a linear approximation).

*   **Real Analysis (Limits, Continuity, Differentiability):**
    *   **Formal Definition of a Limit:** $\lim_{x \to a} f(x) = L$ if for every $\epsilon > 0$ there exists a $\delta > 0$ such that if $0 < |x-a| < \delta$, then $|f(x)-L| < \epsilon$.
    *   **Continuity:** A function is continuous if its limit equals its value at that point.
    *   **Differentiability:** The definition of the derivative $f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$. Understanding that differentiability implies continuity.

## 4. The core idea — step by step

Let's break down the journey from complex functions to analytic functions and the role of the Cauchy-Riemann equations.

### ### Step 1: Complex Functions

**Plain English:** Just like you're used to functions that take a real number (like $x$) and give you another real number (like $f(x) = x^2$), a complex function takes a complex number (let's call it $z$) and gives you another complex number (let's call it $f(z)$). Since complex numbers have a real part and an imaginary part, a complex function essentially takes two real numbers as input (the real and imaginary parts of $z$) and produces two real numbers as output (the real and imaginary parts of $f(z)$).

**Small concrete example showing what it means:**
Let $z = x + iy$, where $x$ is the real part and $y$ is the imaginary part.
Consider the function $f(z) = z^2$.
If we plug in $z = 1 + 2i$:
$f(1+2i) = (1+2i)^2 = 1^2 + 2(1)(2i) + (2i)^2 = 1 + 4i + 4i^2 = 1 + 4i - 4 = -3 + 4i$.
So, $f(z)$ took $z=1+2i$ and gave us $f(z)=-3+4i$.

We can also express $f(z)$ in terms of $x$ and $y$:
$f(z) = (x+iy)^2 = x^2 + 2ixy + (iy)^2 = x^2 + 2ixy - y^2 = (x^2 - y^2) + i(2xy)$.
Here, the real part of $f(z)$ is $u(x,y) = x^2 - y^2$, and the imaginary part is $v(x,y) = 2xy$.
So, any complex function $f(z)$ can always be written as $f(z) = u(x,y) + iv(x,y)$, where $u$ and $v$ are real-valued functions of two real variables $x$ and $y$.

**The formal/mathematical version:**
A complex function $f$ is a mapping $f: D \to \mathbb{C}$, where $D$ is a subset of the complex plane $\mathbb{C}$.
For any $z = x+iy \in D$, $f(z)$ can be uniquely written as:
$$ f(z) = u(x,y) + iv(x,y) $$
where $u(x,y) = \text{Re}(f(z))$ and $v(x,y) = \text{Im}(f(z))$ are real-valued functions of the real variables $x$ and $y$.

**What could go wrong:** Students often confuse $f(z)$ with a function of two variables $f(x,y)$. While $f(z)$ can be *expressed* using $u(x,y)$ and $v(x,y)$, the fundamental idea of a complex function is that $z$ is a single complex input, not two independent real inputs. The special relationship between $u$ and $v$ is what makes complex functions unique.

### ### Step 2: Differentiability in the Complex Plane

**Plain English:** For a regular function $f(x)$ in real calculus, differentiability means that at any point, you can find a unique, well-defined tangent line that closely approximates the function. The "slope" of this tangent line is the derivative. For a complex function $f(z)$, differentiability means something similar: at a given point $z_0$, the function must have a unique "complex slope" or derivative, regardless of the direction you approach $z_0$ from in the complex plane. This is a much stronger condition than just being differentiable as a function from $\mathbb{R}^2$ to $\mathbb{R}^2$.

**Small concrete example showing what it means:**
Consider $f(z) = z^2$.
Let's try to calculate its derivative at $z_0$ using the definition:
$f'(z_0) = \lim_{z \to z_0} \frac{f(z) - f(z_0)}{z - z_0} = \lim_{z \to z_0} \frac{z^2 - z_0^2}{z - z_0} = \lim_{z \to z_0} \frac{(z-z_0)(z+z_0)}{z - z_0} = \lim_{z \to z_0} (z+z_0) = 2z_0$.
The limit exists and is $2z_0$, regardless of how $z$ approaches $z_0$. So, $f(z)=z^2$ is differentiable.

Now consider $f(z) = \bar{z}$ (the complex conjugate).
Let's try to calculate its derivative at $z_0$:
$f'(z_0) = \lim_{z \to z_0} \frac{\bar{z} - \bar{z_0}}{z - z_0}$.
Let $z - z_0 = \Delta z = \Delta x + i\Delta y$. Then $\bar{z} - \bar{z_0} = \overline{\Delta z} = \Delta x - i\Delta y$.
So the limit becomes $\lim_{\Delta z \to 0} \frac{\Delta x - i\Delta y}{\Delta x + i\Delta y}$.
Let's approach $z_0$ (so $\Delta z \to 0$) along two different paths:
1.  **Along the real axis:** $\Delta y = 0$, so $\Delta z = \Delta x$.
    The limit becomes $\lim_{\Delta x \to 0} \frac{\Delta x}{\Delta x} = 1$.
2.  **Along the imaginary axis:** $\Delta x = 0$, so $\Delta z = i\Delta y$.
    The limit becomes $\lim_{\Delta y \to 0} \frac{-i\Delta y}{i\Delta y} = -1$.
Since the limit depends on the path of approach (1 vs -1), $f(z) = \bar{z}$ is not differentiable at any point.

**The formal/mathematical version:**
A complex function $f(z)$ is said to be **differentiable** at a point $z_0 \in \mathbb{C}$ if the limit
$$ f'(z_0) = \lim_{z \to z_0} \frac{f(z) - f(z_0)}{z - z_0} $$
exists and is finite. This limit must be unique, meaning it must be the same regardless of the path $z$ takes to approach $z_0$.

**What could go wrong:** A common mistake is to assume that if $u(x,y)$ and $v(x,y)$ (the real and imaginary parts of $f(z)$) are differentiable as real functions of two variables, then $f(z)$ is necessarily complex differentiable. This is incorrect. Complex differentiability is a much stronger condition because the limit must be independent of the *complex* direction of approach.

### ### Step 3: The Cauchy-Riemann Equations (Necessity)

**Plain English:** The Cauchy-Riemann equations are two simple equations that act as a necessary test for complex differentiability. If a complex function is differentiable at a point, its real and imaginary parts ($u$ and $v$) *must* satisfy these two equations at that point. Think of them as a filter: if a function doesn't satisfy these equations, it definitely isn't complex differentiable.

**Small concrete example showing what it means:**
Let's use our earlier example, $f(z) = z^2 = (x^2 - y^2) + i(2xy)$.
Here, $u(x,y) = x^2 - y^2$ and $v(x,y) = 2xy$.
Let's calculate their partial derivatives:
$\frac{\partial u}{\partial x} = \frac{\partial}{\partial x}(x^2 - y^2) = 2x$
$\frac{\partial u}{\partial y} = \frac{\partial}{\partial y}(x^2 - y^2) = -2y$
$\frac{\partial v}{\partial x} = \frac{\partial}{\partial x}(2xy) = 2y$
$\frac{\partial v}{\partial y} = \frac{\partial}{\partial y}(2xy) = 2x$

Now, let's check the Cauchy-Riemann equations:
1.  Is $\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}$?
    $2x = 2x$. Yes, this holds.
2.  Is $\frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}$?
    $-2y = -(2y)$. Yes, this also holds.
Since both equations hold for all $x,y$, $f(z)=z^2$ passes the Cauchy-Riemann test everywhere. This aligns with our earlier finding that it is differentiable.

Now, let's revisit $f(z) = \bar{z} = x - iy$.
Here, $u(x,y) = x$ and $v(x,y) = -y$.
Partial derivatives:
$\frac{\partial u}{\partial x} = 1$
$\frac{\partial u}{\partial y} = 0$
$\frac{\partial v}{\partial x} = 0$
$\frac{\partial v}{\partial y} = -1$

Check Cauchy-Riemann equations:
1.  Is $\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}$?
    $1 = -1$. No, this does not hold.
2.  Is $\frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}$?
    $0 = -(0)$. Yes, this holds.
Since the first equation fails, $f(z)=\bar{z}$ does not satisfy the Cauchy-Riemann equations, which means it cannot be complex differentiable. This also aligns with our earlier finding.

**The formal/mathematical version:**
Let $f(z) = u(x,y) + iv(x,y)$ be a complex function. If $f(z)$ is differentiable at a point $z_0 = x_0 + iy_0$, then the first-order partial derivatives of $u$ and $v$ exist at $(x_0, y_0)$ and satisfy the **Cauchy-Riemann equations**:
$$ \frac{\partial u}{\partial x}(x_0, y_0) = \frac{\partial v}{\partial y}(x_0, y_0) $$
$$ \frac{\partial u}{\partial y}(x_0, y_0) = -\frac{\partial v}{\partial x}(x_0, y_0) $$

**What could go wrong:** A common error is forgetting the negative sign in the second Cauchy-Riemann equation ($\frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}$). This sign is critical and comes directly from the requirement that the complex derivative must be independent of the path of approach.

### ### Step 4: Analytic Functions

**Plain English:** An "analytic function" (also called a "holomorphic function") is a complex function that is differentiable not just at a single point, but throughout an entire open region around that point. These are the "well-behaved" functions of complex analysis. They are incredibly smooth, infinitely differentiable, and can be represented by power series. This property is what makes complex analysis so powerful and elegant.

**Small concrete example showing what it means:**
Our function $f(z) = z^2$ was found to be differentiable at *any* point $z_0$. Since it's differentiable everywhere in the complex plane (which is an open region), $f(z)=z^2$ is an analytic function.
Similarly, any polynomial in $z$, like $f(z) = 3z^4 - 2z + 7$, is analytic everywhere.
The function $f(z) = \frac{1}{z}$ is differentiable at any point $z \neq 0$. So, it's analytic in any open region that does not contain $z=0$. It's not analytic on the entire complex plane because it fails at $z=0$.
Our function $f(z) = \bar{z}$ is not differentiable anywhere, so it is certainly not analytic anywhere.

**The formal/mathematical version:**
A complex function $f$ is said to be **analytic** (or **holomorphic**) in an open set $D \subset \mathbb{C}$ if it is differentiable at every point in $D$.
If a function is analytic in the entire complex plane $\mathbb{C}$, it is called an **entire function**.

**What could go wrong:** Students sometimes confuse differentiability at a single point with analyticity. Analyticity requires differentiability in an *open neighborhood* around a point. A function can be differentiable at one isolated point without being analytic there. (Such examples are rare and pathological, but it's important to understand the distinction).

### ### Step 5: The Cauchy-Riemann Equations (Sufficiency)

**Plain English:** We've seen that if a function is complex differentiable, it *must* satisfy the Cauchy-Riemann equations. The amazing thing is that the reverse is almost true: if the Cauchy-Riemann equations are satisfied *and* the partial derivatives of $u$ and $v$ are continuous, then the function *is* complex differentiable (and thus analytic in that region). This gives us a practical way to check for analyticity without using the limit definition directly.

**Small concrete example showing what it means:**
Let's re-examine $f(z) = z^2 = (x^2 - y^2) + i(2xy)$.
We found:
$\frac{\partial u}{\partial x} = 2x$
$\frac{\partial u}{\partial y} = -2y$
$\frac{\partial v}{\partial x} = 2y$
$\frac{\partial v}{\partial y} = 2x$
The Cauchy-Riemann equations were satisfied: $2x=2x$ and $-2y=-(2y)$.
Now, let's check the continuity of these partial derivatives.
$2x$, $-2y$, $2y$, $2x$ are all simple polynomials in $x$ and $y$. Polynomials are continuous everywhere.
Since the Cauchy-Riemann equations hold everywhere and all partial derivatives are continuous everywhere, $f(z) = z^2$ is analytic everywhere in the complex plane.

**The formal/mathematical version:**
Let $f(z) = u(x,y) + iv(x,y)$ be a complex function defined in an open set $D$. If the first-order partial derivatives $\frac{\partial u}{\partial x}, \frac{\partial u}{\partial y}, \frac{\partial v}{\partial x}, \frac{\partial v}{\partial y}$ exist and are continuous at every point in $D$, and satisfy the Cauchy-Riemann equations:
$$ \frac{\partial u}{\partial x} = \frac{\partial v}{\partial y} \quad \text{and} \quad \frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x} $$
at every point in $D$, then $f(z)$ is analytic (holomorphic) in $D$.

**What could go wrong:** The most frequent mistake here is to forget the "continuity of partial derivatives" condition. While the Cauchy-Riemann equations are necessary for differentiability, they are only sufficient if the partial derivatives are also continuous. There are pathological examples where the CR equations hold, but the partial derivatives are not continuous, and the function is not complex differentiable.

## 5. Worked examples — multiple, with every step shown

### Example 1: Show that $f(z) = z^3$ is an analytic function.

**Problem:** Determine if the function $f(z) = z^3$ is analytic.

**Given:** The complex function $f(z) = z^3$.
**Want:** To show that $f(z)$ is analytic, which means showing it satisfies the Cauchy-Riemann equations and its partial derivatives are continuous.

**Step-by-step solution:**

1.  **Express $f(z)$ in terms of $u(x,y)$ and $v(x,y)$:**
    We know $z = x + iy$.
    $f(z) = (x+iy)^3$
    $= x^3 + 3x^2(iy) + 3x(iy)^2 + (iy)^3$
    $= x^3 + 3ix^2y + 3x(-y^2) + i^3y^3$
    $= x^3 + 3ix^2y - 3xy^2 - iy^3$
    $= (x^3 - 3xy^2) + i(3x^2y - y^3)$

    *Explanation:* We substitute $z=x+iy$ into the function and expand it algebraically, then group the real and imaginary terms. This allows us to identify $u(x,y)$ and $v(x,y)$.

    So, $u(x,y) = x^3 - 3xy^2$ and $v(x,y) = 3x^2y - y^3$.

2.  **Calculate the first-order partial derivatives of $u$ and $v$:**
    $\frac{\partial u}{\partial x} = \frac{\partial}{\partial x}(x^3 - 3xy^2) = 3x^2 - 3y^2$
    $\frac{\partial u}{\partial y} = \frac{\partial}{\partial y}(x^3 - 3xy^2) = -6xy$
    $\frac{\partial v}{\partial x} = \frac{\partial}{\partial x}(3x^2y - y^3) = 6xy$
    $\frac{\partial v}{\partial y} = \frac{\partial}{\partial y}(3x^2y - y^3) = 3x^2 - 3y^2$

    *Explanation:* We compute the partial derivatives with respect to $x$ and $y$ for both $u$ and $v$. Remember that when differentiating with respect to $x$, $y$ is treated as a constant, and vice versa.

3.  **Check the Cauchy-Riemann equations:**
    *   **First equation:** Is $\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}$?
        $3x^2 - 3y^2 = 3x^2 - 3y^2$. Yes, this holds for all $x,y \in \mathbb{R}$.
    *   **Second equation:** Is $\frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}$?
        $-6xy = -(6xy)$. Yes, this holds for all $x,y \in \mathbb{R}$.

    *Explanation:* We compare the calculated partial derivatives against the two Cauchy-Riemann equations. If both equations hold for all $x,y$ in the domain, we proceed to check continuity.

4.  **Check the continuity of the partial derivatives:**
    The partial derivatives are:
    $\frac{\partial u}{\partial x} = 3x^2 - 3y^2$ (a polynomial, continuous everywhere)
    $\frac{\partial u}{\partial y} = -6xy$ (a polynomial, continuous everywhere)
    $\frac{\partial v}{\partial x} = 6xy$ (a polynomial, continuous everywhere)
    $\frac{\partial v}{\partial y} = 3x^2 - 3y^2$ (a polynomial, continuous everywhere)

    All first-order partial derivatives are polynomials in $x$ and $y$, which are continuous for all real numbers $x$ and $y$.

    *Explanation:* For the Cauchy-Riemann equations to guarantee analyticity, the partial derivatives must also be continuous. Polynomials are always continuous, so this condition is met.

5.  **Conclusion:**
    Since the Cauchy-Riemann equations are satisfied for all $z \in \mathbb{C}$ and all first-order partial derivatives of $u$ and $v$ are continuous for all $z \in \mathbb{C}$, the function $f(z) = z^3$ is analytic everywhere in the complex plane (i.e., it is an entire function).

    *Explanation:* Because both conditions (CR equations and continuity of partials) are met, we can confidently conclude that the function is analytic.

**Final Answer:** $\boxed{f(z) = z^3 \text{ is an analytic function.}}$

**Reflection:** This example was straightforward because polynomial functions are inherently well-behaved. The expansion of $(x+iy)^3$ can be a source of algebraic error, but the partial differentiation and CR equation checks are routine.

---

### Example 2: Show that $f(z) = \text{Re}(z)$ is not an analytic function.

**Problem:** Determine if the function $f(z) = \text{Re}(z)$ is analytic.

**Given:** The complex function $f(z) = \text{Re}(z)$.
**Want:** To show that $f(z)$ is not analytic by checking the Cauchy-Riemann equations.

**Step-by-step solution:**

1.  **Express $f(z)$ in terms of $u(x,y)$ and $v(x,y)$:**
    We know $z = x + iy$.
    $f(z) = \text{Re}(z) = x$.
    We can write this as $f(z) = x + i(0)$.

    *Explanation:* The real part of $z$ is $x$, and the imaginary part is $y$. So, the function $f(z) = \text{Re}(z)$ means that the output complex number has a real part equal to $x$ and an imaginary part of $0$.

    So, $u(x,y) = x$ and $v(x,y) = 0$.

2.  **Calculate the first-order partial derivatives of $u$ and $v$:**
    $\frac{\partial u}{\partial x} = \frac{\partial}{\partial x}(x) = 1$
    $\frac{\partial u}{\partial y} = \frac{\partial}{\partial y}(x) = 0$
    $\frac{\partial v}{\partial x} = \frac{\partial}{\partial x}(0) = 0$
    $\frac{\partial v}{\partial y} = \frac{\partial}{\partial y}(0) = 0$

    *Explanation:* These are simple partial derivatives of constant or linear functions.

3.  **Check the Cauchy-Riemann equations:**
    *   **First equation:** Is $\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}$?
        $1 = 0$. No, this is false.
    *   **Second equation:** Is $\frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}$?
        $0 = -(0)$. Yes, this holds for all $x,y \in \mathbb{R}$.

    *Explanation:* We compare the partial derivatives. Even though the second equation holds, the first one fails. For a function to be analytic, *both* Cauchy-Riemann equations must be satisfied.

4.  **Conclusion:**
    Since the first Cauchy-Riemann equation ($\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}$) is not satisfied at any point in the complex plane, the function $f(z) = \text{Re}(z)$ is not differentiable at any point, and therefore cannot be analytic anywhere.

    *Explanation:* The failure of even one CR equation is sufficient to conclude non-analyticity. We don't even need to check the continuity of partial derivatives in this case, as the CR equations themselves fail.

**Final Answer:** $\boxed{f(z) = \text{Re}(z) \text{ is not an analytic function.}}$

**Reflection:** This example highlights that even seemingly simple functions in terms of $z$ might not be analytic. It reinforces the strictness of complex differentiability compared to real differentiability.

---

### Example 3: Show that $f(z) = e^z$ is an analytic function.

**Problem:** Determine if the function $f(z) = e^z$ is analytic.

**Given:** The complex function $f(z) = e^z$.
**Want:** To show that $f(z)$ is analytic.

**Step-by-step solution:**

1.  **Express $f(z)$ in terms of $u(x,y)$ and $v(x,y)$:**
    We know $z = x + iy$.
    Using properties of exponents and Euler's formula:
    $f(z) = e^{x+iy} = e^x e^{iy} = e^x (\cos y + i \sin y)$
    $= e^x \cos y + i(e^x \sin y)$

    *Explanation:* We use the property $e^{a+b} = e^a e^b$ and Euler's formula $e^{iy} = \cos y + i \sin y$ to separate the real and imaginary parts of $f(z)$.

    So, $u(x,y) = e^x \cos y$ and $v(x,y) = e^x \sin y$.

2.  **Calculate the first-order partial derivatives of $u$ and $v$:**
    $\frac{\partial u}{\partial x} = \frac{\partial}{\partial x}(e^x \cos y) = e^x \cos y$
    $\frac{\partial u}{\partial y} = \frac{\partial}{\partial y}(e^x \cos y) = -e^x \sin y$
    $\frac{\partial v}{\partial x} = \frac{\partial}{\partial x}(e^x \sin y) = e^x \sin y$
    $\frac{\partial v}{\partial y} = \frac{\partial}{\partial y}(e^x \sin y) = e^x \cos y$

    *Explanation:* We differentiate $u$ and $v$ with respect to $x$ and $y$. Remember that $e^x$ is treated as a constant when differentiating with respect to $y$, and $\cos y / \sin y$ are treated as constants when differentiating with respect to $x$.

3.  **Check the Cauchy-Riemann equations:**
    *   **First equation:** Is $\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}$?
        $e^x \cos y = e^x \cos y$. Yes, this holds for all $x,y \in \mathbb{R}$.
    *   **Second equation:** Is $\frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}$?
        $-e^x \sin y = -(e^x \sin y)$. Yes, this holds for all $x,y \in \mathbb{R}$.

    *Explanation:* Both Cauchy-Riemann equations are satisfied identically for all real $x$ and $y$.

4.  **Check the continuity of the partial derivatives:**
    The partial derivatives are:
    $\frac{\partial u}{\partial x} = e^x \cos y$
    $\frac{\partial u}{\partial y} = -e^x \sin y$
    $\frac{\partial v}{\partial x} = e^x \sin y$
    $\frac{\partial v}{\partial y} = e^x \cos y$

    Exponential functions ($e^x$), sine functions ($\sin y$), and cosine functions ($\cos y$) are continuous everywhere. Products of continuous functions are continuous. Therefore, all first-order partial derivatives are continuous for all $x,y \in \mathbb{R}$.

    *Explanation:* The functions $e^x$, $\cos y$, and $\sin y$ are fundamental continuous functions, so their combinations will also be continuous.

5.  **Conclusion:**
    Since the Cauchy-Riemann equations are satisfied for all $z \in \mathbb{C}$ and all first-order partial derivatives of $u$ and $v$ are continuous for all $z \in \mathbb{C}$, the function $f(z) = e^z$ is analytic everywhere in the complex plane.

**Final Answer:** $\boxed{f(z) = e^z \text{ is an analytic function.}}$

**Reflection:** This example demonstrates the analyticity of a fundamental complex exponential function. It highlights the importance of Euler's formula in separating the real and imaginary parts.

---

### Example 4: Determine where $f(z) = z \text{Re}(z)$ is differentiable and analytic.

**Problem:** For the function $f(z) = z \text{Re}(z)$, determine the points where it is differentiable and the regions where it is analytic.

**Given:** The complex function $f(z) = z \text{Re}(z)$.
**Want:** Points of differentiability and regions of analyticity.

**Step-by-step solution:**

1.  **Express $f(z)$ in terms of $u(x,y)$ and $v(x,y)$:**
    We know $z = x + iy$ and $\text{Re}(z) = x$.
    $f(z) = (x+iy)x = x^2 + ixy$.

    *Explanation:* Substitute $z=x+iy$ and $\text{Re}(z)=x$ into the function and simplify to identify the real and imaginary parts.

    So, $u(x,y) = x^2$ and $v(x,y) = xy$.

2.  **Calculate the first-order partial derivatives of $u$ and $v$:**
    $\frac{\partial u}{\partial x} = \frac{\partial}{\partial x}(x^2) = 2x$
    $\frac{\partial u}{\partial y} = \frac{\partial}{\partial y}(x^2) = 0$
    $\frac{\partial v}{\partial x} = \frac{\partial}{\partial x}(xy) = y$
    $\frac{\partial v}{\partial y} = \frac{\partial}{\partial y}(xy) = x$

    *Explanation:* Compute the partial derivatives for $u$ and $v$.

3.  **Check the Cauchy-Riemann equations:**
    *   **First equation:** Is $\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}$?
        $2x = x$. This equation holds *only if* $x=0$.
    *   **Second equation:** Is $\frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}$?
        $0 = -(y)$. This equation holds *only if* $y=0$.

    *Explanation:* We set up the CR equations. Notice that they do not hold for all $x,y$. Instead, they impose conditions on $x$ and $y$.

4.  **Determine points of differentiability:**
    The Cauchy-Riemann equations are satisfied simultaneously only when $x=0$ *and* $y=0$. This means the CR equations hold only at the point $z = 0+i0 = 0$.
    Now, we check the continuity of the partial derivatives at this point.
    $\frac{\partial u}{\partial x} = 2x$, $\frac{\partial u}{\partial y} = 0$, $\frac{\partial v}{\partial x} = y$, $\frac{\partial v}{\partial y} = x$.
    All these partial derivatives are polynomials in $x$ and $y$, so they are continuous everywhere in $\mathbb{C}$, including at $z=0$.
    Since the CR equations are satisfied *and* the partial derivatives are continuous at $z=0$, the function $f(z) = z \text{Re}(z)$ is differentiable *only* at $z=0$.

    *Explanation:* The CR equations are necessary for differentiability. If they only hold at a single point, then the function can only be differentiable at that point (provided the partials are continuous there).

5.  **Determine regions of analyticity:**
    For a function to be analytic in an open set $D$, it must be differentiable at *every* point in $D$.
    In this case, $f(z)$ is differentiable only at the single point $z=0$. An open set must contain an entire neighborhood around each of its points. Since $f(z)$ is not differentiable in any open neighborhood around $z=0$ (it's only differentiable *at* $z=0$), it cannot be analytic in any open set.
    Therefore, $f(z) = z \text{Re}(z)$ is nowhere analytic.

    *Explanation:* Analyticity is a stronger condition than differentiability at a point. It requires differentiability in an *open region*. A single point does not constitute an open region.

**Final Answer:**
$\boxed{f(z) = z \text{Re}(z) \text{ is differentiable only at } z=0 \text{ and is nowhere analytic.}}$

**Reflection:** This example is tricky because the CR equations are satisfied at a single point, but not in a region. This highlights the crucial distinction between differentiability at a point and analyticity in an open set. It's a common trap for students to confuse these two concepts.

## 6. Common mistakes and traps

1.  **Forgetting the continuity condition for sufficiency:** Many students remember the Cauchy-Riemann equations but forget that for them to *guarantee* analyticity (or complex differentiability), the first-order partial derivatives of $u$ and $v$ must also be continuous. Without this, the CR equations are only necessary, not sufficient.
2.  **Incorrectly identifying $u(x,y)$ and $v(x,y)$:** When converting $f(z)$ to $u(x,y) + iv(x,y)$, students sometimes make algebraic errors, especially with terms like $i^2 = -1$ or when dealing with complex exponentials/trigonometric functions.
3.  **Algebraic errors in partial differentiation:** Simple mistakes in calculating partial derivatives (e.g., treating $y$ as a variable instead of a constant when differentiating with respect to $x$) can lead to incorrect CR checks.
4.  **Forgetting the negative sign in the second CR equation:** The Cauchy-Riemann equations are $\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}$ and $\frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}$. Missing the negative sign in the second equation is a very common error.
5.  **Assuming real differentiability implies complex differentiability:** A function $f(z) = u(x,y) + iv(x,y)$ can have $u$ and $v$ be differentiable as real functions of two variables, but $f(z)$ still not be complex differentiable. Complex differentiability is a much stricter condition due to the path independence requirement for the limit.
6.  **Confusing differentiability at a point with analyticity in a region:** As seen in Example 4, a function can be differentiable at an isolated point (like $z=0$) but not in any open neighborhood around that point. Such a function is differentiable at that point but *nowhere analytic*. Analyticity requires differentiability throughout an *open set*.

## 7. Textbook-precise explanation

Let $f: D \to \mathbb{C}$ be a complex function defined on an open set $D \subset \mathbb{C}$. We can express $f(z)$ in terms of its real and imaginary parts as $f(z) = u(x,y) + iv(x,y)$, where $z = x+iy$ and $u, v$ are real-valued functions of two real variables $x$ and $y$.

**Definition (Complex Differentiability):**
A complex function $f(z)$ is said to be **complex differentiable** at a point $z_0 \in D$ if the limit
$$ f'(z_0) = \lim_{z \to z_0} \frac{f(z) - f(z_0)}{z - z_0} $$
exists and is finite. The value $f'(z_0)$ is called the derivative of $f$ at $z_0$. Crucially, this limit must be independent of the path along which $z$ approaches $z_0$.

**Theorem (Cauchy-Riemann Equations - Necessity):**
If a complex function $f(z) = u(x,y) + iv(x,y)$ is complex differentiable at a point $z_0 = x_0 + iy_0$, then the first-order partial derivatives of $u$ and $v$ with respect to $x$ and $y$ exist at $(x_0, y_0)$, and they satisfy the **Cauchy-Riemann equations**:
$$ \frac{\partial u}{\partial x}(x_0, y_0) = \frac{\partial v}{\partial y}(x_0, y_0) $$
$$ \frac{\partial u}{\partial y}(x_0, y_0) = -\frac{\partial v}{\partial x}(x_0, y_0) $$
Furthermore, the derivative $f'(z_0)$ can be expressed in terms of these partial derivatives as:
$$ f'(z_0) = \frac{\partial u}{\partial x}(x_0, y_0) + i \frac{\partial v}{\partial x}(x_0, y_0) $$
or equivalently:
$$ f'(z_0) = \frac{\partial v}{\partial y}(x_0, y_0) - i \frac{\partial u}{\partial y}(x_0, y_0) $$

**Theorem (Cauchy-Riemann Equations - Sufficiency):**
Let $f(z) = u(x,y) + iv(x,y)$ be a complex function defined in an open set $D$. If the first-order partial derivatives $\frac{\partial u}{\partial x}, \frac{\partial u}{\partial y}, \frac{\partial v}{\partial x}, \frac{\partial v}{\partial y}$ exist at every point in $D$, are continuous throughout $D$, and satisfy the Cauchy-Riemann equations at every point in $D$:
$$ \frac{\partial u}{\partial x} = \frac{\partial v}{\partial y} \quad \text{and} \quad \frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x} $$
then $f(z)$ is complex differentiable at every point in $D$.

**Definition (Analytic/Holomorphic Function):**
A complex function $f(z)$ is said to be **analytic** (or **holomorphic**) in an open set $D \subset \mathbb{C}$ if it is complex differentiable at every point in $D$. If a function is analytic in the entire complex plane $\mathbb{C}$, it is called an **entire function**.

**Reference:**
These definitions and theorems are standard in complex analysis texts. For a rigorous treatment, refer to:
*   **Churchill, R. V., & Brown, J. W. (2014). *Complex Variables and Applications* (9th ed.). McGraw-Hill Education.** (Chapter 2, Sections 18-22)
*   **Ahlfors, L. V. (1979). *Complex Analysis* (3rd ed.). McGraw-Hill.** (Chapter 2, Section 2.1)

## 8. ASCII diagrams

```text
       Complex Plane (Domain)             Complex Plane (Codomain)
             y                                    v
             ^                                    ^
             |                                    |
             . z = x + iy   -------- f -------->  . f(z) = u + iv
             |                                    |
    ---------+---------> x               ---------+---------> u
             |                                    |
             |                                    |

    This diagram illustrates a complex function f(z) mapping a point z
    in the complex domain (x,y plane) to a point f(z) in the complex codomain
    (u,v plane). The real part of f(z) is u(x,y) and the imaginary part is v(x,y).
    The Cauchy-Riemann equations relate the partial derivatives of u and v,
    which are functions of x and y.

    To visualize the complex differentiability limit:
    Consider a point z0 in the complex plane.
    To calculate f'(z0), we take the limit:
          f(z) - f(z0)
    lim  --------------
    z->z0   z - z0

    This limit must be the same regardless of the path z takes to approach z0.
    Common paths for derivation:
    1. Horizontal path: z approaches z0 along a line parallel to the real axis.
       Here, z = x + iy0, so z - z0 = (x - x0).
       y is constant.

    2. Vertical path: z approaches z0 along a line parallel to the imaginary axis.
       Here, z = x0 + iy, so z - z0 = i(y - y0).
       x is constant.

    These two paths are used to derive the Cauchy-Riemann equations.
    If the limit exists, the result from path 1 must equal the result from path 2.
```

## 9. Memory technique — never forget this

1.  **Specific mnemonic or visual hook:**
    For the Cauchy-Riemann equations, remember "U-X, V-Y, U-Y, minus V-X".
    Write it down:
    $U_x = V_y$
    $U_y = -V_x$
    Visualize a cross-stitch pattern or a "Z" shape: $u_x$ goes to $v_y$ (straight across), and $u_y$ goes to $v_x$ (diagonal), but with a minus sign. The "minus" is crucial.

2.  **The 1-3 formulas/facts they MUST overlearn:**
    *   **Definition of complex differentiability:**
        $$ f'(z_0) = \lim_{z \to z_0} \frac{f(z) - f(z_0)}{z - z_0} $$
        (Emphasize: limit must be path-independent.)
    *   **Cauchy-Riemann Equations:**
        $$ \frac{\partial u}{\partial x} = \frac{\partial v}{\partial y} $$
        $$ \frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x} $$
    *   **Sufficiency Condition:** CR equations + *continuity of partial derivatives* $\implies$ analyticity.

3.  **A spaced-repetition schedule:**
    *   **Day 1:** Immediately after this lesson, review the core ideas, definitions, and worked examples.
    *   **Day 3:** Review again. Try to re-derive the CR equations from scratch.
    *   **Day 7:** Review. Work through a few new problems.
    *   **Day 16:** Review. Focus on the "what could go wrong" scenarios.
    *   **Day 35:** Final review. Connect this topic to subsequent concepts in complex analysis.

4.  **The first-principles re-derivation pathway:**
    If you ever forget the Cauchy-Riemann equations, you can always re-derive them from the definition of complex differentiability:
    1.  Start with the definition: $f'(z_0) = \lim_{\Delta z \to 0} \frac{f(z_0 + \Delta z) - f(z_0)}{\Delta z}$.
    2.  Let $f(z) = u(x,y) + iv(x,y)$ and $\Delta z = \Delta x + i\Delta y$.
    3.  **Approach along the real axis:** Let $\Delta y = 0$, so $\Delta z = \Delta x$.
        $$ f'(z_0) = \lim_{\Delta x \to 0} \frac{u(x_0+\Delta x, y_0) + iv(x_0+\Delta x, y_0) - [u(x_0, y_0) + iv(x_0, y_0)]}{\Delta x} $$
        $$ = \lim_{\Delta x \to 0} \left( \frac{u(x_0+\Delta x, y_0) - u(x_0, y_0)}{\Delta x} + i \frac{v(x_0+\Delta x, y_0) - v(x_0, y_0)}{\Delta x} \right) $$
        $$ = \frac{\partial u}{\partial x}(x_0, y_0) + i \frac{\partial v}{\partial x}(x_0, y_0) $$
    4.  **Approach along the imaginary axis:** Let $\Delta x = 0$, so $\Delta z = i\Delta y$.
        $$ f'(z_0) = \lim_{\Delta y \to 0} \frac{u(x_0, y_0+\Delta y) + iv(x_0, y_0+\Delta y) - [u(x_0, y_0) + iv(x_0, y_0)]}{i\Delta y} $$
        $$ = \lim_{\Delta y \to 0} \left( \frac{u(x_0, y_0+\Delta y) - u(x_0, y_0)}{i\Delta y} + i \frac{v(x_0, y_0+\Delta y) - v(x_0, y_0)}{i\Delta y} \right) $$
        $$ = \frac{1}{i} \frac{\partial u}{\partial y}(x_0, y_0) + \frac{\partial v}{\partial y}(x_0, y_0) $$
        Since $\frac{1}{i} = \frac{-i}{i(-i)} = -i$, this becomes:
        $$ = \frac{\partial v}{\partial y}(x_0, y_0) - i \frac{\partial u}{\partial y}(x_0, y_0) $$
    5.  **Equate the two expressions for $f'(z_0)$:** Since the limit must be unique, the results from both paths must be equal:
        $$ \frac{\partial u}{\partial x} + i \frac{\partial v}{\partial x} = \frac{\partial v}{\partial y} - i \frac{\partial u}{\partial y} $$
    6.  **Equate real and imaginary parts:**
        Real parts: $\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}$
        Imaginary parts: $\frac{\partial v}{\partial x} = -\frac{\partial u}{\partial y}$ (or $\frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}$)
    This re-derivation solidifies the understanding and ensures you can always reconstruct the equations.

## 10. Connections — what this leads to

Understanding analytic functions and the Cauchy-Riemann equations is the bedrock of complex analysis. They unlock a cascade of powerful theorems and concepts:

*   **Harmonic Functions and Harmonic Conjugates:** The real and imaginary parts ($u$ and $v$) of an analytic function are always harmonic functions (i.e., they satisfy Laplace's equation: $\nabla^2 \phi = 0$). This connection is vital in physics and engineering for solving problems in electrostatics, fluid flow, and heat conduction. If $u$ is given, $v$ is its harmonic conjugate, and vice versa.
*   **Conformal Mappings:** Analytic functions that have a non-zero derivative are "conformal," meaning they preserve angles between intersecting curves. This property is used extensively in geometry, cartography, and engineering for transforming complex domains into simpler ones, making problems easier to solve (e.g., mapping an airfoil shape to a circle).
*   **Cauchy's Integral Theorem and Formula:** These are perhaps the most profound results in complex analysis, stating that for an analytic function, the integral around a closed loop is zero, and the value of the function at any interior point can be determined by its values on the boundary. These theorems are fundamental for evaluating complex integrals and understanding the global behavior of analytic functions.
*   **Taylor and Laurent Series:** Analytic functions can be represented by power series (Taylor series) within their domain of analyticity, similar to real functions. Furthermore, functions that are not analytic at certain isolated points (singularities) can be represented by Laurent series, which include negative powers of $(z-z_0)$, allowing us to analyze their behavior near these singularities.
*   **Residue Theorem:** This theorem, built upon Laurent series, provides a powerful method for evaluating complex contour integrals, which in turn are used to solve many real-world integrals, perform inverse Laplace and Fourier transforms, and analyze poles of functions.
*   **Maximum Modulus Principle:** This principle states that a non-constant analytic function attains its maximum modulus on the boundary of any bounded domain, not in its interior. This has implications for understanding stability and bounds in various applications.
*   **Entire Functions and Meromorphic Functions:** Analytic functions that are differentiable everywhere in the complex plane are called entire functions (e.g., $e^z$, polynomials). Functions that are analytic everywhere except for isolated poles are called meromorphic functions. These classifications are crucial for understanding the global structure and properties of complex functions.

## 11. Self-check questions

1.  Consider the function $f(z) = (x^2 + y^2) + i(2xy)$. Is this function analytic? Justify your answer using the Cauchy-Riemann equations.
2.  Let $f(z) = u(x,y) + iv(x,y)$ be an analytic function. If $u(x,y) = x^2 - y^2 + x$, find its harmonic conjugate $v(x,y)$.
3.  Explain why the function $f(z) = |z|^2$ is not analytic anywhere, despite being differentiable at $z=0$.
4.  For what values of $a, b, c, d$ is the function $f(z) = (ax+by) + i(cx+dy)$ an analytic function?
5.  Prove that if $f(z)$ is analytic in a domain $D$ and $|f(z)|$ is constant in $D$, then $f(z)$ must be constant in $D$. (Hint: Use the Cauchy-Riemann equations and the expression for $|f(z)|^2$).