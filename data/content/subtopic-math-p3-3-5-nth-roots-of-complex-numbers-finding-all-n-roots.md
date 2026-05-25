## What it is
Finding the $n$th roots of a complex number means solving the equation $z^n = w$ for $z$, where $w$ is a known complex number and $n$ is a positive integer. Unlike the real number system—where a number might have one, two, or zero real roots—the Fundamental Theorem of Algebra guarantees that every non-zero complex number has exactly $n$ distinct complex roots. Geometrically, these roots form the vertices of a regular $n$-sided polygon centered at the origin of the complex plane.

## Why it matters
In aerospace and mechanical engineering, $n$th roots are essential for solving high-order linear differential equations that model mechanical vibrations, flutter in aircraft wings, and control system stability. In computer science, the $n$th roots of unity (the solutions to $z^n = 1$) form the mathematical backbone of the Fast Fourier Transform (FFT). The FFT is arguably the most important algorithm of the 20th century, used universally in signal processing, radar systems, and training large machine learning models on audio data.

## When to study it
You must already be completely fluent in:
1. Euler's formula: $e^{i\theta} = \cos\theta + i\sin\theta$.
2. Converting complex numbers between Cartesian ($a + bi$) and polar ($re^{i\theta}$) forms.
3. De Moivre's Theorem for integer powers.

If you cannot instantly graph $1 - i$ and write it as $\sqrt{2}e^{-i\pi/4}$ without looking up a formula, you are not ready. Go back and master polar form first.

## How to study it (step by step)
1. **Master the roots of unity:** Solve $z^n = 1$ for $n=2, 3, 4$ algebraically by factoring, then plot the solutions on the complex plane. Notice the geometric symmetry.
2. **Derive the general formula:** Let $z = r e^{i\theta}$ and $w = R e^{i\phi}$. Set $z^n = w$ and equate the magnitudes and arguments. Crucially, remember that angles repeat every $2\pi$. 
3. **Practice with arbitrary numbers:** Pick a number like $w = -8i$, find its 3rd roots using the polar method, and plot them.
4. **Verify by multiplication:** Take one of your calculated roots and raise it to the $n$th power algebraically to prove it equals your original $w$.
5. **Connect to polynomials:** Recognize that finding the $n$th roots of $w$ is identical to finding the roots of the polynomial $z^n - w = 0$.

## Key ideas, with intuition

**1. The Periodicity of the Argument (The Engine of Multiple Roots)**
In real numbers, $x^3 = 8$ has one solution ($x=2$) because real numbers only have one "location" on the number line. In complex numbers, angle is periodic. The number $w = R e^{i\phi}$ can also be written as $w = R e^{i(\phi + 2\pi k)}$ for any integer $k$. This periodicity is what generates multiple distinct roots when you divide the angle by $n$.

**2. Separation of Magnitude and Angle**
When you set $z^n = w$, you substitute polar forms:
$$(r e^{i\theta})^n = R e^{i(\phi + 2\pi k)}$$
$$r^n e^{in\theta} = R e^{i(\phi + 2\pi k)}$$
This splits into two independent real-number equations:
*   Magnitude: $r^n = R \implies r = \sqrt[n]{R}$ (the standard real positive root)
*   Angle: $n\theta = \phi + 2\pi k \implies \theta = \frac{\phi + 2\pi k}{n}$

**3. The "k" Cycle and Geometric Symmetry**
You evaluate the angle formula for $k = 0, 1, 2, \dots, n-1$. Why stop at $n-1$? Because when $k=n$, the angle becomes $\frac{\phi + 2\pi n}{n} = \frac{\phi}{n} + 2\pi$. This is the exact same angle as $k=0$. The roots cycle. Geometrically, this spaces $n$ roots perfectly evenly around a circle of radius $\sqrt[n]{R}$, separated by an angle of $\frac{2\pi}{n}$.

## Worked example
**Problem:** Find all 3rd roots of $w = -8$. Express them in Cartesian form.

**Step 1: Convert $w$ to polar form, including the $2\pi k$ periodicity.**
The number $-8$ lies on the negative real axis. Its magnitude is $8$ and its angle is $\pi$.
$$w = 8 e^{i(\pi + 2\pi k)}$$

**Step 2: Set up the equation $z^3 = w$.**
Let $z = r e^{i\theta}$.
$$r^3 e^{i3\theta} = 8 e^{i(\pi + 2\pi k)}$$

**Step 3: Solve for $r$ and $\theta$.**
Magnitude: $r^3 = 8 \implies r = 2$.
Angle: $3\theta = \pi + 2\pi k \implies \theta = \frac{\pi}{3} + \frac{2\pi k}{3}$.

**Step 4: Evaluate for $k = 0, 1, 2$.**
*   **$k=0$:** $\theta = \frac{\pi}{3}$.
    $$z_0 = 2 e^{i\pi/3} = 2\left(\cos\frac{\pi}{3} + i\sin\frac{\pi}{3}\right) = 2\left(\frac{1}{2} + i\frac{\sqrt{3}}{2}\right) = 1 + i\sqrt{3}$$
*   **$k=1$:** $\theta = \frac{\pi}{3} + \frac{2\pi}{3} = \pi$.
    $$z_1 = 2 e^{i\pi} = 2(-1 + i(0)) = -2$$
*   **$k=2$:** $\theta = \frac{\pi}{3} + \frac{4\pi}{3} = \frac{5\pi}{3}$.
    $$z_2 = 2 e^{i5\pi/3} = 2\left(\cos\frac{5\pi}{3} + i\sin\frac{5\pi}{3}\right) = 2\left(\frac{1}{2} - i\frac{\sqrt{3}}{2}\right) = 1 - i\sqrt{3}$$

*Reflection:* The roots have identical magnitudes ($r=2$) and are separated by exactly $\frac{2\pi}{3}$ radians ($120^\circ$). The real root ($-2$) is recovered, but the complex plane reveals the two hidden roots.

## Diagrams

Here is the geometric representation of the worked example (the 3rd roots of $-8$). They form an equilateral triangle inscribed in a circle of radius 2.

```text
                     Im
                      |
             z_0      |
       (-1+i√3) *     |
                 \    |
                  \   |
                   \  |
                    \ |
----------------------+---------------------- Re
                      |
      *               |
     z_1              |
    (-2)              |
                   /  |
                  /   |
                 /    |
       (-1-i√3) *     |
             z_2      |
                      |
```

## Memory technique — remember this forever
**1. The Visual Hook: "The Pizza Slicer"**
To find $n$ roots, imagine a pizza of radius $\sqrt[n]{R}$. The first cut is made at the starting angle $\frac{\phi}{n}$. Then, you slice the pizza into $n$ perfectly equal slices. The crust edges of those slices are your roots.

**2. The Must-Know Formula:**
$$z_k = \sqrt[n]{R} \exp\left(i\frac{\phi + 2\pi k}{n}\right) \quad \text{for } k = 0, 1, \dots, n-1$$

**3. Spaced-Repetition Schedule:**
Review this derivation and solve one $n$th root problem at intervals of: 1 day, 3 days, 7 days, 16 days, and 35 days.

**4. The First Principles Pathway:**
If you forget the formula, never guess. Rebuild it:
Write $z^n = w$.
Write $z = r e^{i\theta}$ and $w = R e^{i(\phi + 2\pi k)}$.
Equate them: $r^n e^{in\theta} = R e^{i(\phi + 2\pi k)}$.
Solve for $r$ and $\theta$.

## Common mistakes
*   **Dividing by $n$ before adding $2\pi k$:** Students often write $\frac{\phi}{n} + 2\pi k$. This is fatally wrong. The $2\pi k$ belongs to the original angle $\phi$, so it must be divided by $n$ as well: $\frac{\phi + 2\pi k}{n}$.
*   **Using degrees instead of radians:** While degrees work algebraically here, calculus with complex variables (like $e^{iz}$) strictly requires radians. Break the degree habit now.
*   **Going up to $k=n$:** There are exactly $n$ roots. Because you start counting at $k=0$, the last distinct root is at $k=n-1$. Evaluating $k=n$ is a waste of time; it just yields $z_0$ again.

## Self-check
1. Find the four 4th roots of $16$. Express them in Cartesian form.
2. Find the three 3rd roots of $i$. Express them in polar form.
3. Prove that the sum of the $n$th roots of unity (where $w=1$) is exactly $0$ for any integer $n \ge 2$. (Hint: Think about geometric series).