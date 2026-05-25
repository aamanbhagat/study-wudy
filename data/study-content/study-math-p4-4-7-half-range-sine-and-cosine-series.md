## 1. What it is — in plain English

Imagine you have a drawing, but you've only made half of it – say, the right side. You want to complete the drawing, but you have two main choices for how to do it.

**Choice 1: Mirror Image.** You could simply take your existing half and perfectly mirror it to create the left side. If your original drawing was a mountain range sloping up, the mirrored part would be a mountain range sloping down, making a symmetrical shape. This is like creating an "even" extension of your function. When you then describe this full, mirrored drawing using a special mathematical tool called a Fourier series, you'll find it only needs "cosine" components. This is what we call a **half-range cosine series**.

**Choice 2: Anti-Mirror Image.** Alternatively, you could mirror your drawing, but then also flip it upside down. If your original mountain range sloped up, the mirrored and flipped part would also slope up, but from the bottom, creating an "S" shape. This is like creating an "odd" extension of your function. When you describe this full, anti-mirrored drawing with a Fourier series, it will only need "sine" components. This is called a **half-range sine series**.

In essence, "half-range sine and cosine series" are special types of Fourier series used when a function is only defined over *half* of a typical interval (like from 0 to L, instead of -L to L). We cleverly extend this function to the full interval in an even or odd way, which then guarantees that its Fourier series will contain *only* cosine terms (for even extensions) or *only* sine terms (for odd extensions). This is incredibly useful for solving many real-world problems.

## 2. Why it matters — real-world applications

Half-range sine and cosine series are not just mathematical curiosities; they are powerful tools for modeling and solving problems across science and engineering, especially when dealing with physical systems confined to a specific region.

1.  **Heat Conduction in a Rod:** Imagine a metal rod of length $L$. If one end is perfectly insulated (no heat can flow in or out), and the other end is kept at a fixed temperature or also insulated, these boundary conditions naturally lead to either a half-range sine or cosine series when solving the heat equation. For example, a rod with both ends insulated often involves a cosine series for its temperature distribution, as the derivative (heat flux) is zero at the boundaries, which aligns with the properties of even functions. Conversely, a rod with both ends held at zero temperature (e.g., immersed in ice baths) typically uses a sine series. This is fundamental in material science and thermal engineering.

2.  **Vibrations of a String or Beam:** Consider a guitar string fixed at both ends, or a cantilever beam fixed at one end and free at the other. The displacement of such a vibrating object can often be described using half-range series. If a string is plucked and fixed at $x=0$ and $x=L$, its displacement modes are sine functions. However, if a beam is fixed at $x=0$ and free at $x=L$, its displacement might involve a combination that can be analyzed using half-range series, particularly when considering the specific boundary conditions (e.g., zero displacement and zero slope at the fixed end). This is crucial in structural engineering and acoustics.

3.  **Signal Processing (One-Sided Signals):** In electrical engineering and signal processing, you might encounter signals that are naturally defined only for positive time, $t \ge 0$, or over a finite duration. When you want to analyze the frequency content of such a signal using Fourier analysis, you can employ half-range series. By creating an appropriate even or odd extension, you can ensure that the resulting frequency spectrum has the desired symmetry or properties, simplifying analysis or allowing for specific filtering techniques. For instance, analyzing the transient response of a circuit after a switch is flipped often involves functions defined only for $t>0$.

4.  **Quantum Mechanics (Particle in a Box):** In quantum mechanics, the behavior of a particle confined to a one-dimensional "box" (an interval $[0, L]$ where the potential energy is infinite outside) is described by wave functions. The solutions to the Schrödinger equation for this system are precisely the eigenfunctions $\sin(n\pi x/L)$, which are the basis for the half-range sine series. The energy levels and probability distributions of the particle are directly derived from these sine functions, demonstrating how fundamental these series are to understanding the microscopic world.

## 3. Prerequisites — what you must know first

Before diving deep into half-range sine and cosine series, ensure you have a solid grasp of the following foundational concepts. If any of these feel unfamiliar, pause and review them thoroughly.

*   **Fourier Series:** The ability to represent a periodic function $f(x)$ on an interval $[-L, L]$ (or $[0, 2L]$) as an infinite sum of sines and cosines. You should know the general formulas for the Fourier coefficients $a_0, a_n, b_n$.
    *   $f(x) = \frac{a_0}{2} + \sum_{n=1}^\infty \left[ a_n \cos\left(\frac{n\pi x}{L}\right) + b_n \sin\left(\frac{n\pi x}{L}\right) \right]$
    *   $a_0 = \frac{1}{L} \int_{-L}^L f(x) dx$
    *   $a_n = \frac{1}{L} \int_{-L}^L f(x) \cos\left(\frac{n\pi x}{L}\right) dx$
    *   $b_n = \frac{1}{L} \int_{-L}^L f(x) \sin\left(\frac{n\pi x}{L}\right) dx$
*   **Even and Odd Functions:**
    *   **Even Function:** $f(-x) = f(x)$ for all $x$. (Symmetric about the y-axis, e.g., $\cos(x)$, $x^2$).
    *   **Odd Function:** $f(-x) = -f(x)$ for all $x$. (Symmetric about the origin, e.g., $\sin(x)$, $x^3$).
    *   **Properties:**
        *   Integral of an odd function over a symmetric interval $[-L, L]$ is 0: $\int_{-L}^L f_{odd}(x) dx = 0$.
        *   Integral of an even function over a symmetric interval $[-L, L]$ is twice the integral over $[0, L]$: $\int_{-L}^L f_{even}(x) dx = 2 \int_0^L f_{even}(x) dx$.
        *   Product of two even functions is even.
        *   Product of two odd functions is even.
        *   Product of an even and an odd function is odd.
*   **Periodic Functions:** A function $f(x)$ is periodic with period $P$ if $f(x+P) = f(x)$ for all $x$. Fourier series represent periodic functions.
*   **Orthogonality of Sine and Cosine:** The integral properties that allow us to isolate Fourier coefficients. For integers $m, n \ge 1$:
    *   $\int_{-L}^L \cos\left(\frac{m\pi x}{L}\right) \cos\left(\frac{n\pi x}{L}\right) dx = \begin{cases} L & m=n \\ 0 & m \ne n \end{cases}$ (and similar for $\sin \cdot \sin$)
    *   $\int_{-L}^L \sin\left(\frac{m\pi x}{L}\right) \cos\left(\frac{n\pi x}{L}\right) dx = 0$
*   **Integration by Parts:** The fundamental technique for evaluating integrals of products of functions, often needed to calculate Fourier coefficients.
    *   $\int u \, dv = uv - \int v \, du$
*   **Partial Differential Equations (PDEs) Basics:** An understanding of what PDEs are, the concept of boundary conditions, and how Fourier series are used in methods like separation of variables to solve PDEs.

## 4. The core idea — step by step

Let's break down the concept of half-range sine and cosine series into manageable steps, building intuition along the way.

### Step 1: The Problem: Function on a Half-Interval

*   **Plain English:** We're given a function, $f(x)$, but it's only defined over a specific positive interval, say from $x=0$ to $x=L$. We want to represent this function using a Fourier series, but the standard Fourier series formulas require the function to be defined over a symmetric interval like $[-L, L]$.

*   **Small Concrete Example:** Consider the function $f(x) = x$ defined only for $0 \le x \le \pi$. We want to find a Fourier series that equals $x$ on this interval.

*   **Formal/Mathematical Version:** Given $f(x)$ defined on the interval $[0, L]$.

*   **What could go wrong:** Assuming the function $f(x)$ has some inherent behavior outside of $[0, L]$. It doesn't. We get to choose how to extend it.

### Step 2: The Goal: A Fourier Series with Only Sines or Only Cosines

*   **Plain English:** We want to find a Fourier series that matches $f(x)$ on $[0, L]$. Specifically, we want to achieve this using *only* cosine terms (and a constant term) or *only* sine terms. Why? Because sometimes the physics of a problem (like boundary conditions in a PDE) naturally leads to solutions involving only one type of trigonometric function.

*   **Small Concrete Example:** For $f(x)=x$ on $[0, \pi]$, we might want to find a series of the form $A_0 + \sum A_n \cos(nx)$ that equals $x$ on $[0, \pi]$, or a series of the form $\sum B_n \sin(nx)$ that equals $x$ on $[0, \pi]$.

*   **Formal/Mathematical Version:** Find a series of the form $f(x) \sim \frac{a_0}{2} + \sum_{n=1}^\infty a_n \cos\left(\frac{n\pi x}{L}\right)$ (half-range cosine series) or $f(x) \sim \sum_{n=1}^\infty b_n \sin\left(\frac{n\pi x}{L}\right)$ (half-range sine series) that represents $f(x)$ for $x \in [0, L]$.

*   **What could go wrong:** Trying to force a function to be represented by *both* sines and cosines when the problem specifically asks for a half-range series. Remember, you can choose *either* a sine series *or* a cosine series for a given $f(x)$ on $[0,L]$. They will be different series but will both represent $f(x)$ on the original interval.

### Step 3: The Trick: Even and Odd Extensions

*   **Plain English:** To get *only* cosine terms or *only* sine terms in a Fourier series, we use a clever trick. We "invent" what the function does on the interval $[-L, 0]$ in a very specific way:
    *   **For a cosine series:** We extend $f(x)$ to be an **even function** over the full interval $[-L, L]$. This means we mirror the function across the y-axis.
    *   **For a sine series:** We extend $f(x)$ to be an **odd function** over the full interval $[-L, L]$. This means we mirror the function across the y-axis *and then* flip it vertically.

*   **Small Concrete Example:** For $f(x)=x$ on $[0, \pi]$:
    *   **Even extension ($f_e(x)$):** We define $f_e(x)$ such that $f_e(x) = f(x)$ for $x \in [0, \pi]$ and $f_e(x) = f(-x)$ for $x \in [-\pi, 0]$. Since $f(x)=x$, then $f(-x)=-x$. So, for $x \in [-\pi, 0]$, $f_e(x) = -x$. This results in $f_e(x) = |x|$ for $x \in [-\pi, \pi]$.
    *   **Odd extension ($f_o(x)$):** We define $f_o(x)$ such that $f_o(x) = f(x)$ for $x \in [0, \pi]$ and $f_o(x) = -f(-x)$ for $x \in [-\pi, 0]$. Since $f(x)=x$, then $f(-x)=-x$. So, for $x \in [-\pi, 0]$, $f_o(x) = -(-x) = x$. This results in $f_o(x) = x$ for $x \in [-\pi, \pi]$.

*   **Formal/Mathematical Version:**
    *   **Even Extension ($f_e(x)$):**
        $$f_e(x) = \begin{cases} f(x) & 0 \le x \le L \\ f(-x) & -L \le x < 0 \end{cases}$$
        This function $f_e(x)$ is defined on $[-L, L]$ and is an even function.
    *   **Odd Extension ($f_o(x)$):**
        $$f_o(x) = \begin{cases} f(x) & 0 < x \le L \\ -f(-x) & -L \le x < 0 \\ 0 & x=0 \text{ (if } f(0) \ne 0 \text{ to maintain oddness)} \end{cases}$$
        This function $f_o(x)$ is defined on $[-L, L]$ and is an odd function. Note: If $f(0) \ne 0$, the odd extension will have a jump discontinuity at $x=0$. For an odd function, $f(0)$ must be $0$. If $f(0) \ne 0$, we typically define $f_o(0)=0$.

*   **What could go wrong:** Incorrectly defining the extension. Forgetting the negative sign for the odd extension, or mistakenly using $f(-x)$ instead of $-f(-x)$ for the odd extension. Forgetting that $f(0)$ must be 0 for a continuous odd extension.

### Step 4: Full Fourier Series of the Extension

*   **Plain English:** Now that we have an extended function ($f_e(x)$ or $f_o(x)$) defined on the full symmetric interval $[-L, L]$, we can find its standard Fourier series. The magic happens here:
    *   If we used the **even extension** ($f_e(x)$), its Fourier series will *only* contain cosine terms (and the constant $a_0$ term). All sine coefficients ($b_n$) will be zero because $f_e(x) \sin(n\pi x/L)$ is an odd function, and its integral over $[-L, L]$ is zero.
    *   If we used the **odd extension** ($f_o(x)$), its Fourier series will *only* contain sine terms. All cosine coefficients ($a_n$, including $a_0$) will be zero because $f_o(x)$ is odd, and $f_o(x) \cos(n\pi x/L)$ is an odd function, so its integral over $[-L, L]$ is zero.

*   **Small Concrete Example:**
    *   For $f_e(x) = |x|$ on $[-\pi, \pi]$, we'd calculate its Fourier series. Since $|x|$ is even, we know $b_n=0$. We'd only need to calculate $a_0$ and $a_n$.
    *   For $f_o(x) = x$ on $[-\pi, \pi]$, we'd calculate its Fourier series. Since $x$ is odd, we know $a_0=0$ and $a_n=0$. We'd only need to calculate $b_n$.

*   **Formal/Mathematical Version:**
    *   **For the Half-Range Cosine Series (using $f_e(x)$):**
        Since $f_e(x)$ is even, $b_n = 0$. The coefficients $a_0$ and $a_n$ are calculated using the standard formulas, but because $f_e(x)$ is even, we can simplify the integral limits:
        $$a_0 = \frac{1}{L} \int_{-L}^L f_e(x) dx = \frac{2}{L} \int_0^L f_e(x) dx = \frac{2}{L} \int_0^L f(x) dx$$
        $$a_n = \frac{1}{L} \int_{-L}^L f_e(x) \cos\left(\frac{n\pi x}{L}\right) dx = \frac{2}{L} \int_0^L f_e(x) \cos\left(\frac{n\pi x}{L}\right) dx = \frac{2}{L} \int_0^L f(x) \cos\left(\frac{n\pi x}{L}\right) dx$$
        So the half-range cosine series for $f(x)$ on $[0, L]$ is:
        $$f(x) \sim \frac{a_0}{2} + \sum_{n=1}^\infty a_n \cos\left(\frac{n\pi x}{L}\right)$$
    *   **For the Half-Range Sine Series (using $f_o(x)$):**
        Since $f_o(x)$ is odd, $a_0 = 0$ and $a_n = 0$. The coefficients $b_n$ are calculated using the standard formula, simplified because $f_o(x)$ is odd:
        $$b_n = \frac{1}{L} \int_{-L}^L f_o(x) \sin\left(\frac{n\pi x}{L}\right) dx = \frac{2}{L} \int_0^L f_o(x) \sin\left(\frac{n\pi x}{L}\right) dx = \frac{2}{L} \int_0^L f(x) \sin\left(\frac{n\pi x}{L}\right) dx$$
        So the half-range sine series for $f(x)$ on $[0, L]$ is:
        $$f(x) \sim \sum_{n=1}^\infty b_n \sin\left(\frac{n\pi x}{L}\right)$$

*   **What could go wrong:** Forgetting the factor of $2/L$ (instead of $1/L$) when integrating from $0$ to $L$. This is a common algebraic error. Also, forgetting the $a_0/2$ term for the cosine series.

### Step 5: The Half-Range Series

*   **Plain English:** The Fourier series we just found for the *extended* function ($f_e(x)$ or $f_o(x)$) will perfectly match our *original* function $f(x)$ on the interval $[0, L]$. This is because, by definition, $f_e(x) = f(x)$ and $f_o(x) = f(x)$ for $x \in [0, L]$. So, we have successfully represented $f(x)$ using only sines or only cosines on its original half-interval.

*   **Formal/Mathematical Version:**
    *   The half-range cosine series of $f(x)$ on $[0, L]$ is given by:
        $$f(x) = \frac{a_0}{2} + \sum_{n=1}^\infty a_n \cos\left(\frac{n\pi x}{L}\right)$$
        where $a_0 = \frac{2}{L} \int_0^L f(x) dx$ and $a_n = \frac{2}{L} \int_0^L f(x) \cos\left(\frac{n\pi x}{L}\right) dx$.
    *   The half-range sine series of $f(x)$ on $[0, L]$ is given by:
        $$f(x) = \sum_{n=1}^\infty b_n \sin\left(\frac{n\pi x}{L}\right)$$
        where $b_n = \frac{2}{L} \int_0^L f(x) \sin\left(\frac{n\pi x}{L}\right) dx$.
    These series converge to $f(x)$ at points of continuity within $(0, L)$. At points of discontinuity, they converge to the average of the left and right limits. At the endpoints $x=0$ and $x=L$, the convergence depends on the specific series and extension.

*   **What could go wrong:** Forgetting that the series only represents $f(x)$ on the *original* interval $[0, L]$. Outside this interval, the series represents the periodic extension of $f_e(x)$ or $f_o(x)$, not necessarily $f(x)$.

## 5. Worked examples — multiple, with every step shown

We will work through four examples, demonstrating both half-range sine and cosine series for different types of functions.

### Example 1: Half-range series for $f(x) = 1$ on $[0, \pi]$

**Problem:** Find the half-range sine series and the half-range cosine series for the function $f(x) = 1$ on the interval $[0, \pi]$.

**Given:** $f(x) = 1$ for $0 \le x \le \pi$.
**Want:**
1.  Half-range sine series.
2.  Half-range cosine series.

Here, $L = \pi$.

#### Part 1: Half-range sine series

**Step 1: Identify the formula for $b_n$.**
The formula for the coefficients of a half-range sine series is:
$$b_n = \frac{2}{L} \int_0^L f(x) \sin\left(\frac{n\pi x}{L}\right) dx$$
*This is the standard formula for sine series coefficients, adapted for the half-interval $[0, L]$ by using a factor of $2/L$ and integrating from $0$ to $L$.*

**Step 2: Substitute $f(x)$ and $L$.**
Substitute $f(x) = 1$ and $L = \pi$ into the formula:
$$b_n = \frac{2}{\pi} \int_0^\pi (1) \sin\left(\frac{n\pi x}{\pi}\right) dx$$
$$b_n = \frac{2}{\pi} \int_0^\pi \sin(nx) dx$$
*We simplify the argument of the sine function and the integrand.*

**Step 3: Evaluate the integral.**
$$b_n = \frac{2}{\pi} \left[ -\frac{\cos(nx)}{n} \right]_0^\pi$$
*The integral of $\sin(ax)$ is $-\frac{\cos(ax)}{a}$. Here $a=n$.*

**Step 4: Apply the limits of integration.**
$$b_n = \frac{2}{\pi} \left( -\frac{\cos(n\pi)}{n} - \left(-\frac{\cos(0)}{n}\right) \right)$$
$$b_n = \frac{2}{\pi} \left( -\frac{\cos(n\pi)}{n} + \frac{1}{n} \right)$$
*We substitute the upper limit ($\pi$) and lower limit ($0$) into the antiderivative and subtract.*
*Recall that $\cos(n\pi) = (-1)^n$ and $\cos(0) = 1$.*

**Step 5: Simplify the expression for $b_n$.**
$$b_n = \frac{2}{\pi n} (1 - \cos(n\pi))$$
$$b_n = \frac{2}{\pi n} (1 - (-1)^n)$$
*We factor out $\frac{1}{n}$ and substitute the value of $\cos(n\pi)$.*

**Step 6: Analyze $b_n$ for even and odd $n$.**
*   If $n$ is even, $n=2k$ for some integer $k \ge 1$:
    $b_n = \frac{2}{\pi n} (1 - (-1)^{2k}) = \frac{2}{\pi n} (1 - 1) = 0$
*   If $n$ is odd, $n=2k-1$ for some integer $k \ge 1$:
    $b_n = \frac{2}{\pi n} (1 - (-1)^{2k-1}) = \frac{2}{\pi n} (1 - (-1)) = \frac{2}{\pi n} (2) = \frac{4}{\pi n}$
*This step helps to write the series more concisely by only including non-zero terms.*

**Step 7: Write the half-range sine series.**
$$f(x) = \sum_{n=1}^\infty b_n \sin(nx)$$
Since $b_n = 0$ for even $n$, we only sum over odd $n$:
$$f(x) = \sum_{k=1}^\infty \frac{4}{\pi (2k-1)} \sin((2k-1)x)$$
$$f(x) = \frac{4}{\pi} \left( \sin(x) + \frac{1}{3}\sin(3x) + \frac{1}{5}\sin(5x) + \dots \right)$$

**Final Answer (Half-range sine series):**
$$ \boxed{f(x) = \frac{4}{\pi} \sum_{k=1}^\infty \frac{\sin((2k-1)x)}{2k-1} \quad \text{for } 0 \le x \le \pi} $$

*Reflection:* This example shows that even a simple constant function can be represented by an infinite sum of sines. The series converges to 1 for $x \in (0, \pi)$, and to 0 at $x=0$ and $x=\pi$ (where all sine terms are zero), which is the average of the function and its odd extension at those points (if we consider the odd extension $f_o(x)$ which is $1$ for $(0,\pi)$ and $-1$ for $(-\pi,0)$).

#### Part 2: Half-range cosine series

**Step 1: Identify the formulas for $a_0$ and $a_n$.**
The formulas for the coefficients of a half-range cosine series are:
$$a_0 = \frac{2}{L} \int_0^L f(x) dx$$
$$a_n = \frac{2}{L} \int_0^L f(x) \cos\left(\frac{n\pi x}{L}\right) dx$$
*These are the standard formulas for cosine series coefficients, adapted for the half-interval $[0, L]$ by using a factor of $2/L$ and integrating from $0$ to $L$.*

**Step 2: Substitute $f(x)$ and $L$ for $a_0$.**
Substitute $f(x) = 1$ and $L = \pi$:
$$a_0 = \frac{2}{\pi} \int_0^\pi (1) dx$$
*We set up the integral for the constant term.*

**Step 3: Evaluate the integral for $a_0$.**
$$a_0 = \frac{2}{\pi} [x]_0^\pi$$
$$a_0 = \frac{2}{\pi} (\pi - 0) = 2$$
*The integral is straightforward.*

**Step 4: Substitute $f(x)$ and $L$ for $a_n$.**
Substitute $f(x) = 1$ and $L = \pi$:
$$a_n = \frac{2}{\pi} \int_0^\pi (1) \cos\left(\frac{n\pi x}{\pi}\right) dx$$
$$a_n = \frac{2}{\pi} \int_0^\pi \cos(nx) dx$$
*We set up the integral for the cosine coefficients.*

**Step 5: Evaluate the integral for $a_n$.**
$$a_n = \frac{2}{\pi} \left[ \frac{\sin(nx)}{n} \right]_0^\pi$$
*The integral of $\cos(ax)$ is $\frac{\sin(ax)}{a}$. Here $a=n$.*

**Step 6: Apply the limits of integration for $a_n$.**
$$a_n = \frac{2}{\pi} \left( \frac{\sin(n\pi)}{n} - \frac{\sin(0)}{n} \right)$$
*Recall that $\sin(n\pi) = 0$ for any integer $n$, and $\sin(0) = 0$.*

**Step 7: Simplify the expression for $a_n$.**
$$a_n = \frac{2}{\pi} (0 - 0) = 0 \quad \text{for } n \ge 1$$
*All cosine coefficients for $n \ge 1$ are zero.*

**Step 8: Write the half-range cosine series.**
$$f(x) = \frac{a_0}{2} + \sum_{n=1}^\infty a_n \cos(nx)$$
Substitute $a_0 = 2$ and $a_n = 0$ for $n \ge 1$:
$$f(x) = \frac{2}{2} + \sum_{n=1}^\infty (0) \cos(nx)$$
$$f(x) = 1$$

**Final Answer (Half-range cosine series):**
$$ \boxed{f(x) = 1 \quad \text{for } 0 \le x \le \pi} $$

*Reflection:* This result makes perfect sense. Since $f(x)=1$ is already an even function (if extended to $f_e(x)=1$ for all $x$), its Fourier cosine series should simply be the constant itself. This is the simplest possible cosine series, showing that sometimes the series is finite.

---

### Example 2: Half-range series for $f(x) = x$ on $[0, L]$

**Problem:** Find the half-range sine series and the half-range cosine series for the function $f(x) = x$ on the interval $[0, L]$.

**Given:** $f(x) = x$ for $0 \le x \le L$.
**Want:**
1.  Half-range sine series.
2.  Half-range cosine series.

#### Part 1: Half-range sine series

**Step 1: Identify the formula for $b_n$.**
$$b_n = \frac{2}{L} \int_0^L f(x) \sin\left(\frac{n\pi x}{L}\right) dx$$
*This is the standard formula for sine series coefficients.*

**Step 2: Substitute $f(x)$.**
$$b_n = \frac{2}{L} \int_0^L x \sin\left(\frac{n\pi x}{L}\right) dx$$
*We replace $f(x)$ with $x$. This integral requires integration by parts.*

**Step 3: Perform integration by parts.**
Let $u = x$ and $dv = \sin\left(\frac{n\pi x}{L}\right) dx$.
Then $du = dx$ and $v = \int \sin\left(\frac{n\pi x}{L}\right) dx = -\frac{L}{n\pi} \cos\left(\frac{n\pi x}{L}\right)$.
Using $\int u \, dv = uv - \int v \, du$:
$$ \int_0^L x \sin\left(\frac{n\pi x}{L}\right) dx = \left[ x \left(-\frac{L}{n\pi} \cos\left(\frac{n\pi x}{L}\right)\right) \right]_0^L - \int_0^L \left(-\frac{L}{n\pi} \cos\left(\frac{n\pi x}{L}\right)\right) dx $$
$$ = \left[ -\frac{Lx}{n\pi} \cos\left(\frac{n\pi x}{L}\right) \right]_0^L + \frac{L}{n\pi} \int_0^L \cos\left(\frac{n\pi x}{L}\right) dx $$
*We carefully apply the integration by parts formula.*

**Step 4: Evaluate the terms.**
$$ \left[ -\frac{Lx}{n\pi} \cos\left(\frac{n\pi x}{L}\right) \right]_0^L = \left( -\frac{L(L)}{n\pi} \cos\left(\frac{n\pi L}{L}\right) \right) - \left( -\frac{L(0)}{n\pi} \cos(0) \right) $$
$$ = -\frac{L^2}{n\pi} \cos(n\pi) - 0 = -\frac{L^2}{n\pi} (-1)^n $$
*We substitute the limits. The lower limit term is zero because of the $x$ factor.*

$$ \frac{L}{n\pi} \int_0^L \cos\left(\frac{n\pi x}{L}\right) dx = \frac{L}{n\pi} \left[ \frac{L}{n\pi} \sin\left(\frac{n\pi x}{L}\right) \right]_0^L $$
$$ = \frac{L^2}{(n\pi)^2} \left( \sin\left(\frac{n\pi L}{L}\right) - \sin(0) \right) $$
$$ = \frac{L^2}{(n\pi)^2} (\sin(n\pi) - 0) = \frac{L^2}{(n\pi)^2} (0) = 0 $$
*The integral of cosine evaluates to zero at the limits because $\sin(n\pi)=0$ and $\sin(0)=0$.*

**Step 5: Combine the results for the integral.**
$$ \int_0^L x \sin\left(\frac{n\pi x}{L}\right) dx = -\frac{L^2}{n\pi} (-1)^n $$
*We sum the results from Step 4.*

**Step 6: Calculate $b_n$.**
$$b_n = \frac{2}{L} \left( -\frac{L^2}{n\pi} (-1)^n \right)$$
$$b_n = -\frac{2L}{n\pi} (-1)^n = \frac{2L}{n\pi} (-1)^{n+1}$$
*We multiply by the $2/L$ factor.*

**Step 7: Write the half-range sine series.**
$$f(x) = \sum_{n=1}^\infty b_n \sin\left(\frac{n\pi x}{L}\right)$$
$$f(x) = \sum_{n=1}^\infty \frac{2L}{n\pi} (-1)^{n+1} \sin\left(\frac{n\pi x}{L}\right)$$
$$f(x) = \frac{2L}{\pi} \left( \sin\left(\frac{\pi x}{L}\right) - \frac{1}{2}\sin\left(\frac{2\pi x}{L}\right) + \frac{1}{3}\sin\left(\frac{3\pi x}{L}\right) - \dots \right)$$

**Final Answer (Half-range sine series):**
$$ \boxed{f(x) = \frac{2L}{\pi} \sum_{n=1}^\infty \frac{(-1)^{n+1}}{n} \sin\left(\frac{n\pi x}{L}\right) \quad \text{for } 0 \le x \le L} $$

*Reflection:* This is a classic result for the function $f(x)=x$. The series converges to $x$ for $x \in (0, L)$. At $x=0$ and $x=L$, the series converges to 0, which is the value of the odd extension at these points.

#### Part 2: Half-range cosine series

**Step 1: Identify the formulas for $a_0$ and $a_n$.**
$$a_0 = \frac{2}{L} \int_0^L f(x) dx$$
$$a_n = \frac{2}{L} \int_0^L f(x) \cos\left(\frac{n\pi x}{L}\right) dx$$
*These are the standard formulas for cosine series coefficients.*

**Step 2: Substitute $f(x)$ for $a_0$.**
$$a_0 = \frac{2}{L} \int_0^L x \, dx$$
*We replace $f(x)$ with $x$.*

**Step 3: Evaluate the integral for $a_0$.**
$$a_0 = \frac{2}{L} \left[ \frac{x^2}{2} \right]_0^L$$
$$a_0 = \frac{2}{L} \left( \frac{L^2}{2} - 0 \right) = \frac{2}{L} \frac{L^2}{2} = L$$
*A simple power rule integration.*

**Step 4: Substitute $f(x)$ for $a_n$.**
$$a_n = \frac{2}{L} \int_0^L x \cos\left(\frac{n\pi x}{L}\right) dx$$
*This integral also requires integration by parts.*

**Step 5: Perform integration by parts.**
Let $u = x$ and $dv = \cos\left(\frac{n\pi x}{L}\right) dx$.
Then $du = dx$ and $v = \int \cos\left(\frac{n\pi x}{L}\right) dx = \frac{L}{n\pi} \sin\left(\frac{n\pi x}{L}\right)$.
Using $\int u \, dv = uv - \int v \, du$:
$$ \int_0^L x \cos\left(\frac{n\pi x}{L}\right) dx = \left[ x \left(\frac{L}{n\pi} \sin\left(\frac{n\pi x}{L}\right)\right) \right]_0^L - \int_0^L \frac{L}{n\pi} \sin\left(\frac{n\pi x}{L}\right) dx $$
$$ = \left[ \frac{Lx}{n\pi} \sin\left(\frac{n\pi x}{L}\right) \right]_0^L - \frac{L}{n\pi} \int_0^L \sin\left(\frac{n\pi x}{L}\right) dx $$
*We carefully apply the integration by parts formula.*

**Step 6: Evaluate the terms.**
$$ \left[ \frac{Lx}{n\pi} \sin\left(\frac{n\pi x}{L}\right) \right]_0^L = \left( \frac{L(L)}{n\pi} \sin\left(\frac{n\pi L}{L}\right) \right) - \left( \frac{L(0)}{n\pi} \sin(0) \right) $$
$$ = \frac{L^2}{n\pi} \sin(n\pi) - 0 = \frac{L^2}{n\pi} (0) = 0 $$
*The first term evaluates to zero at both limits because $\sin(n\pi)=0$ and $\sin(0)=0$.*

$$ -\frac{L}{n\pi} \int_0^L \sin\left(\frac{n\pi x}{L}\right) dx = -\frac{L}{n\pi} \left[ -\frac{L}{n\pi} \cos\left(\frac{n\pi x}{L}\right) \right]_0^L $$
$$ = \frac{L^2}{(n\pi)^2} \left[ \cos\left(\frac{n\pi x}{L}\right) \right]_0^L $$
$$ = \frac{L^2}{(n\pi)^2} \left( \cos\left(\frac{n\pi L}{L}\right) - \cos(0) \right) $$
$$ = \frac{L^2}{(n\pi)^2} (\cos(n\pi) - 1) = \frac{L^2}{(n\pi)^2} ((-1)^n - 1) $$
*We evaluate the second integral and apply the limits.*

**Step 7: Combine the results for the integral.**
$$ \int_0^L x \cos\left(\frac{n\pi x}{L}\right) dx = \frac{L^2}{(n\pi)^2} ((-1)^n - 1) $$
*We sum the results from Step 6.*

**Step 8: Calculate $a_n$.**
$$a_n = \frac{2}{L} \left( \frac{L^2}{(n\pi)^2} ((-1)^n - 1) \right)$$
$$a_n = \frac{2L}{(n\pi)^2} ((-1)^n - 1)$$
*We multiply by the $2/L$ factor.*

**Step 9: Analyze $a_n$ for even and odd $n$.**
*   If $n$ is even, $n=2k$ for some integer $k \ge 1$:
    $a_n = \frac{2L}{(n\pi)^2} ((-1)^{2k} - 1) = \frac{2L}{(n\pi)^2} (1 - 1) = 0$
*   If $n$ is odd, $n=2k-1$ for some integer $k \ge 1$:
    $a_n = \frac{2L}{(n\pi)^2} ((-1)^{2k-1} - 1) = \frac{2L}{(n\pi)^2} (-1 - 1) = \frac{2L}{(n\pi)^2} (-2) = -\frac{4L}{(n\pi)^2}$
*This step helps to write the series more concisely by only including non-zero terms.*

**Step 10: Write the half-range cosine series.**
$$f(x) = \frac{a_0}{2} + \sum_{n=1}^\infty a_n \cos\left(\frac{n\pi x}{L}\right)$$
Substitute $a_0 = L$ and the values for $a_n$:
$$f(x) = \frac{L}{2} + \sum_{k=1}^\infty -\frac{4L}{((2k-1)\pi)^2} \cos\left(\frac{(2k-1)\pi x}{L}\right)$$
$$f(x) = \frac{L}{2} - \frac{4L}{\pi^2} \sum_{k=1}^\infty \frac{1}{(2k-1)^2} \cos\left(\frac{(2k-1)\pi x}{L}\right)$$
$$f(x) = \frac{L}{2} - \frac{4L}{\pi^2} \left( \cos\left(\frac{\pi x}{L}\right) + \frac{1}{9}\cos\left(\frac{3\pi x}{L}\right) + \frac{1}{25}\cos\left(\frac{5\pi x}{L}\right) + \dots \right)$$

**Final Answer (Half-range cosine series):**
$$ \boxed{f(x) = \frac{L}{2} - \frac{4L}{\pi^2} \sum_{k=1}^\infty \frac{1}{(2k-1)^2} \cos\left(\frac{(2k-1)\pi x}{L}\right) \quad \text{for } 0 \le x \le L} $$

*Reflection:* This series converges to $x$ for $x \in [0, L]$. Notice the $1/n^2$ decay of coefficients, which is faster than the $1/n$ decay for the sine series. This indicates better convergence (smoother function). Indeed, the even extension of $f(x)=x$ is $f_e(x)=|x|$, which is continuous but not differentiable at $x=0$, leading to $1/n^2$ convergence. The odd extension $f_o(x)=x$ is continuous and differentiable over $[-L,L]$, resulting in faster convergence for its coefficients, but the point $x=0$ is a discontinuity for the periodic extension of $f_o(x)$ if $f(0) \ne 0$, which is not the case here. However, the periodic extension of $f_o(x)$ has jump discontinuities at $x=L, -L, 2L, \dots$, leading to $1/n$ convergence.

---

### Example 3: Half-range cosine series for $f(x) = x^2$ on $[0, \pi]$

**Problem:** Find the half-range cosine series for the function $f(x) = x^2$ on the interval $[0, \pi]$.

**Given:** $f(x) = x^2$ for $0 \le x \le \pi$.
**Want:** Half-range cosine series.

Here, $L = \pi$.

**Step 1: Identify the formulas for $a_0$ and $a_n$.**
$$a_0 = \frac{2}{L} \int_0^L f(x) dx$$
$$a_n = \frac{2}{L} \int_0^L f(x) \cos\left(\frac{n\pi x}{L}\right) dx$$
*These are the standard formulas for cosine series coefficients.*

**Step 2: Substitute $f(x)$ and $L$ for $a_0$.**
$$a_0 = \frac{2}{\pi} \int_0^\pi x^2 \, dx$$
*We set up the integral for the constant term.*

**Step 3: Evaluate the integral for $a_0$.**
$$a_0 = \frac{2}{\pi} \left[ \frac{x^3}{3} \right]_0^\pi$$
$$a_0 = \frac{2}{\pi} \left( \frac{\pi^3}{3} - 0 \right) = \frac{2\pi^2}{3}$$
*A simple power rule integration.*

**Step 4: Substitute $f(x)$ and $L$ for $a_n$.**
$$a_n = \frac{2}{\pi} \int_0^\pi x^2 \cos(nx) dx$$
*This integral requires integration by parts twice.*

**Step 5: Perform integration by parts (first time).**
Let $u = x^2$ and $dv = \cos(nx) dx$.
Then $du = 2x \, dx$ and $v = \frac{1}{n} \sin(nx)$.
$$ \int_0^\pi x^2 \cos(nx) dx = \left[ x^2 \frac{1}{n} \sin(nx) \right]_0^\pi - \int_0^\pi \frac{1}{n} \sin(nx) (2x) dx $$
$$ = \left[ \frac{x^2}{n} \sin(nx) \right]_0^\pi - \frac{2}{n} \int_0^\pi x \sin(nx) dx $$
*The first term evaluates to zero at both limits because $\sin(n\pi)=0$ and $\sin(0)=0$.*
$$ = 0 - \frac{2}{n} \int_0^\pi x \sin(nx) dx $$

**Step 6: Perform integration by parts (second time) for $\int x \sin(nx) dx$.**
Let $u = x$ and $dv = \sin(nx) dx$.
Then $du = dx$ and $v = -\frac{1}{n} \cos(nx)$.
$$ \int_0^\pi x \sin(nx) dx = \left[ x \left(-\frac{1}{n} \cos(nx)\right) \right]_0^\pi - \int_0^\pi \left(-\frac{1}{n} \cos(nx)\right) dx $$
$$ = \left[ -\frac{x}{n} \cos(nx) \right]_0^\pi + \frac{1}{n} \int_0^\pi \cos(nx) dx $$
*Evaluate the first term:*
$$ \left[ -\frac{x}{n} \cos(nx) \right]_0^\pi = \left(-\frac{\pi}{n} \cos(n\pi)\right) - \left(-\frac{0}{n} \cos(0)\right) $$
$$ = -\frac{\pi}{n} (-1)^n - 0 = -\frac{\pi}{n} (-1)^n $$
*Evaluate the second integral:*
$$ \frac{1}{n} \int_0^\pi \cos(nx) dx = \frac{1}{n} \left[ \frac{1}{n} \sin(nx) \right]_0^\pi $$
$$ = \frac{1}{n^2} (\sin(n\pi) - \sin(0)) = \frac{1}{n^2} (0 - 0) = 0 $$
*So, $\int_0^\pi x \sin(nx) dx = -\frac{\pi}{n} (-1)^n$.*

**Step 7: Substitute back into the expression for $\int x^2 \cos(nx) dx$.**
From Step 5: $\int_0^\pi x^2 \cos(nx) dx = -\frac{2}{n} \int_0^\pi x \sin(nx) dx$
$$ = -\frac{2}{n} \left( -\frac{\pi}{n} (-1)^n \right) = \frac{2\pi}{n^2} (-1)^n $$
*We combine the results of the two integration by parts steps.*

**Step 8: Calculate $a_n$.**
$$a_n = \frac{2}{\pi} \left( \frac{2\pi}{n^2} (-1)^n \right)$$
$$a_n = \frac{4}{n^2} (-1)^n$$
*This formula is valid for $n \ge 1$.*

**Step 9: Write the half-range cosine series.**
$$f(x) = \frac{a_0}{2} + \sum_{n=1}^\infty a_n \cos(nx)$$
Substitute $a_0 = \frac{2\pi^2}{3}$ and $a_n = \frac{4}{n^2} (-1)^n$:
$$f(x) = \frac{1}{2} \left(\frac{2\pi^2}{3}\right) + \sum_{n=1}^\infty \frac{4}{n^2} (-1)^n \cos(nx)$$
$$f(x) = \frac{\pi^2}{3} + 4 \sum_{n=1}^\infty \frac{(-1)^n}{n^2} \cos(nx)$$
$$f(x) = \frac{\pi^2}{3} + 4 \left( -\cos(x) + \frac{1}{4}\cos(2x) - \frac{1}{9}\cos(3x) + \dots \right)$$

**Final Answer (Half-range cosine series):**
$$ \boxed{f(x) = \frac{\pi^2}{3} + 4 \sum_{n=1}^\infty \frac{(-1)^n}{n^2} \cos(nx) \quad \text{for } 0 \le x \le \pi} $$

*Reflection:* The coefficients decay as $1/n^2$. This is expected because the even extension of $f(x)=x^2$ on $[-\pi, \pi]$ is $f_e(x)=x^2$, which is continuous and has a continuous first derivative at $x=0$ (since $f_e'(x)=2x$ and $f_e'(0)=0$). This generally leads to faster convergence than $1/n$.

---

### Example 4: Half-range sine series for a piecewise function on $[0, L]$

**Problem:** Find the half-range sine series for the function $f(x) = \begin{cases} x & 0 \le x \le L/2 \\ L-x & L/2 < x \le L \end{cases}$ on the interval $[0, L]$.

**Given:** $f(x) = \begin{cases} x & 0 \le x \le L/2 \\ L-x & L/2 < x \le L \end{cases}$.
**Want:** Half-range sine series.

**Step 1: Identify the formula for $b_n$.**
$$b_n = \frac{2}{L} \int_0^L f(x) \sin\left(\frac{n\pi x}{L}\right) dx$$
*This is the standard formula for sine series coefficients.*

**Step 2: Split the integral due to the piecewise definition of $f(x)$.**
$$b_n = \frac{2}{L} \left[ \int_0^{L/2} x \sin\left(\frac{n\pi x}{L}\right) dx + \int_{L/2}^L (L-x) \sin\left(\frac{n\pi x}{L}\right) dx \right]$$
*We break the integral into two parts, corresponding to the two definitions of $f(x)$.*

**Step 3: Evaluate the first integral $\int_0^{L/2} x \sin\left(\frac{n\pi x}{L}\right) dx$.**
Using integration by parts ($u=x$, $dv=\sin(\frac{n\pi x}{L})dx$), we found earlier that $\int x \sin(ax) dx = -\frac{x}{a}\cos(ax) + \frac{1}{a^2}\sin(ax)$. Here $a = \frac{n\pi}{L}$.
$$ \int_0^{L/2} x \sin\left(\frac{n\pi x}{L}\right) dx = \left[ -\frac{L}{n\pi} x \cos\left(\frac{n\pi x}{L}\right) + \left(\frac{L}{n\pi}\right)^2 \sin\left(\frac{n\pi x}{L}\right) \right]_0^{L/2} $$
$$ = \left( -\frac{L}{n\pi} \frac{L}{2} \cos\left(\frac{n\pi (L/2)}{L}\right) + \frac{L^2}{(n\pi)^2} \sin\left(\frac{n\pi (L/2)}{L}\right) \right) - (0 + 0) $$
$$ = -\frac{L^2}{2n\pi} \cos\left(\frac{n\pi}{2}\right) + \frac{L^2}{(n\pi)^2} \sin\left(\frac{n\pi}{2}\right) $$
*We apply the limits and simplify. The lower limit evaluates to zero.*

**Step 4: Evaluate the second integral $\int_{L/2}^L (L-x) \sin\left(\frac{n\pi x}{L}\right) dx$.**
Let $u = L-x$ and $dv = \sin\left(\frac{n\pi x}{L}\right) dx$.
Then $du = -dx$ and $v = -\frac{L}{n\pi} \cos\left(\frac{n\pi x}{L}\right)$.
$$ \int_{L/2}^L (L-x) \sin\left(\frac{n\pi x}{L}\right) dx = \left[ (L-x) \left(-\frac{L}{n\pi} \cos\left(\frac{n\pi x}{L}\right)\right) \right]_{L/2}^L - \int_{L/2}^L \left(-\frac{L}{n\pi} \cos\left(\frac{n\pi x}{L}\right)\right) (-dx) $$
$$ = \left[ -\frac{L(L-x)}{n\pi} \cos\left(\frac{n\pi x}{L}\right) \right]_{L/2}^L - \frac{L}{n\pi} \int_{L/2}^L \cos\left(\frac{n\pi x}{L}\right) dx $$
*Evaluate the first term:*
$$ \left( -\frac{L(L-L)}{n\pi} \cos(n\pi) \right) - \left( -\frac{L(L-L/2)}{n\pi} \cos\left(\frac{n\pi}{2}\right) \right) $$
$$ = 0 - \left( -\frac{L(L/2)}{n\pi} \cos\left(\frac{n\pi}{2}\right) \right) = \frac{L^2}{2n\pi} \cos\left(\frac{n\pi}{2}\right) $$
*Evaluate the second integral:*
$$ -\frac{L}{n\pi} \left[ \frac{L}{n\pi} \sin\left(\frac{n\pi x}{L}\right) \right]_{L/2}^L $$
$$ = -\frac{L^2}{(n\pi)^2} \left( \sin\left(\frac{n\pi L}{L}\right) - \sin\left(\frac{n\pi (L/2)}{L}\right) \right) $$
$$ = -\frac{L^2}{(n\pi)^2} \left( \sin(n\pi) - \sin\left(\frac{n\pi}{2}\right) \right) $$
$$ = -\frac{L^2}{(n\pi)^2} \left( 0 - \sin\left(\frac{n\pi}{2}\right) \right) = \frac{L^2}{(n\pi)^2} \sin\left(\frac{n\pi}{2}\right) $$

**Step 5: Combine the results for the second integral.**
$$ \int_{L/2}^L (L-x) \sin\left(\frac{n\pi x}{L}\right) dx = \frac{L^2}{2n\pi} \cos\left(\frac{n\pi}{2}\right) + \frac{L^2}{(n\pi)^2} \sin\left(\frac{n\pi}{2}\right) $$

**Step 6: Combine the results of both integrals for $b_n$.**
$$b_n = \frac{2}{L} \left[ \left( -\frac{L^2}{2n\pi} \cos\left(\frac{n\pi}{2}\right) + \frac{L^2}{(n\pi)^2} \sin\left(\frac{n\pi}{2}\right) \right) + \left( \frac{L^2}{2n\pi} \cos\left(\frac{n\pi}{2}\right) + \frac{L^2}{(n\pi)^2} \sin\left(\frac{n\pi}{2}\right) \right) \right]$$
$$b_n = \frac{2}{L} \left[ \frac{2L^2}{(n\pi)^2} \sin\left(\frac{n\pi}{2}\right) \right]$$
$$b_n = \frac{4L}{(n\pi)^2} \sin\left(\frac{n\pi}{2}\right)$$
*The cosine terms cancel out, simplifying the expression significantly.*

**Step 7: Analyze $b_n$ based on $n$.**
*   If $n$ is even, $n=2k$: $\sin\left(\frac{2k\pi}{2}\right) = \sin(k\pi) = 0$. So $b_n = 0$.
*   If $n$ is odd, $n=2k-1$: $\sin\left(\frac{(2k-1)\pi}{2}\right) = (-1)^{k-1}$.
    *   For $n=1$ ($k=1$): $\sin(\pi/2) = 1$. $b_1 = \frac{4L}{\pi^2}(1)$.
    *   For $n=3$ ($k=2$): $\sin(3\pi/2) = -1$. $b_3 = \frac{4L}{(3\pi)^2}(-1)$.
    *   