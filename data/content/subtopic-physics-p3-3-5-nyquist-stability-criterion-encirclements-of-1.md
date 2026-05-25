## What it is
The Nyquist stability criterion is a graphical method used to determine if a closed-loop feedback system is stable by analyzing the frequency response of its open-loop transfer function. Instead of factoring complex polynomials to find system roots, you plot the open-loop system's behavior as frequency sweeps from zero to infinity, and simply count how many times that plot wraps around the specific point $-1 + j0$ on the complex plane.

## Why it matters
In aerospace engineering, systems often contain pure time delays (e.g., sensor processing lag or propellant transport delay). Traditional root-locus methods fail or become infinitely complex when dealing with time delays ($e^{-sT}$), but the Nyquist criterion handles them naturally. It also provides immediate visual metrics for robustness—Gain Margin and Phase Margin—which tell a GNC engineer exactly how much unmodeled aerodynamic variation or structural flexing a rocket can endure before the flight computer drives the vehicle into an unstable, destructive oscillation.

## When to study it
Do not attempt this until you have mastered:
1. Complex numbers (polar and rectangular forms, Euler's formula).
2. Laplace transforms and Transfer Functions.
3. The difference between open-loop ($L(s)$) and closed-loop ($T(s) = \frac{L(s)}{1+L(s)}$) systems.
4. Bode plots.
If you do not understand Cauchy's Argument Principle from complex analysis, you will have to memorize the core theorem. Learn Cauchy's principle if you want the rigorous mathematical foundation.

## How to study it (step by step)
1. **Understand the Nyquist Contour:** Draw a D-shaped contour in the $s$-plane that encloses the entire Right-Half Plane (RHP). This contour goes up the imaginary axis from $-j\infty$ to $+j\infty$, and sweeps an infinite semicircle to the right.
2. **Review Cauchy's Argument Principle:** Understand that mapping this contour through a complex function $F(s)$ results in a new plot that encircles the origin $N$ times, where $N = Z - P$ (Zeros minus Poles of $F(s)$ inside the contour).
3. **Shift the Origin:** Substitute $F(s) = 1 + L(s)$. Realize that encircling the origin with $1 + L(s)$ is geometrically identical to encircling the point $-1 + j0$ with $L(s)$.
4. **Master the Equation:** Learn $Z = N + P$. Define your sign convention strictly: Clockwise encirclements are positive.
5. **Sketching Practice:** Take $L(s) = \frac{1}{s+a}$. Evaluate $L(j\omega)$ for $\omega = 0$, $\omega \to \infty$, and find the real/imaginary axis crossings. Sketch the curve.
6. **Mirroring:** The contour from $-j\infty$ to $0$ is just the complex conjugate of the contour from $0$ to $+j\infty$. Reflect your sketch across the real axis to complete the plot.

## Key ideas, with intuition

**The Stability Problem**
A closed-loop system with open-loop transfer function $L(s)$ has the closed-loop transfer function:
$$ T(s) = \frac{L(s)}{1 + L(s)} $$
For the system to be stable, $T(s)$ must have no poles in the Right-Half Plane (RHP). The poles of $T(s)$ are the roots (zeros) of the characteristic equation:
$$ 1 + L(s) = 0 $$
Finding these roots analytically is often impossible. We need a way to count how many zeros of $1 + L(s)$ exist in the RHP. Let's call this number $Z$. For stability, we demand $Z = 0$.

**Cauchy's Argument Principle**
If you have a function $F(s)$ and map a closed contour through it, the number of clockwise encirclements ($N$) the resulting plot makes around the origin is equal to the number of zeros ($Z$) minus the number of poles ($P$) of $F(s)$ enclosed by the contour:
$$ N = Z - P $$

**The -1 Shift**
Let $F(s) = 1 + L(s)$. 
* $Z$ is the number of RHP zeros of $1 + L(s)$. These are our unstable closed-loop poles.
* $P$ is the number of RHP poles of $1 + L(s)$. Note that the poles of $1 + L(s)$ are identical to the poles of $L(s)$. These are our unstable *open-loop* poles, which we usually already know.

Instead of plotting $1 + L(s)$ and counting encirclements of the origin ($0 + j0$), we plot $L(s)$ and count encirclements of $-1 + j0$. The math is identical. 

Rearranging Cauchy gives us the Nyquist Criterion:
$$ Z = N + P $$
To achieve closed-loop stability ($Z = 0$), the Nyquist plot of $L(s)$ must encircle $-1$ exactly $-P$ times. If $P=0$ (open-loop stable), it must not encircle $-1$ at all. If $P=1$, it must encircle $-1$ exactly once *counter-clockwise* ($N = -1$).

## Worked example
**Problem:** Determine the range of gain $K > 0$ for which the closed-loop system is stable, given the open-loop transfer function:
$$ L(s) = \frac{K}{s - 1} $$

**Step 1: Identify open-loop RHP poles ($P$).**
The denominator is $s - 1$, so there is a pole at $s = +1$. This is in the RHP.
Therefore, $P = 1$.

**Step 2: Evaluate $L(j\omega)$ along the positive imaginary axis.**
Substitute $s = j\omega$:
$$ L(j\omega) = \frac{K}{j\omega - 1} = \frac{K(-1 - j\omega)}{(-1 + j\omega)(-1 - j\omega)} = \frac{-K}{1 + \omega^2} - j\frac{K\omega}{1 + \omega^2} $$

**Step 3: Find key points.**
* At $\omega = 0$: $L(j0) = -K + j0$.
* As $\omega \to \infty$: $L(j\infty) \to 0 - j0$.
The plot starts at $-K$ on the real axis and moves into the bottom-left quadrant, ending at the origin.

**Step 4: Mirror for negative frequencies.**
The plot for $\omega$ from $-\infty$ to $0$ is the complex conjugate. It starts at the origin, moves through the top-left quadrant, and ends at $-K$. The full plot is a circle centered at $-K/2$ with radius $K/2$.

**Step 5: Apply Nyquist Criterion.**
We need closed-loop stability ($Z = 0$).
$$ Z = N + P \implies 0 = N + 1 \implies N = -1 $$
We need exactly one *counter-clockwise* encirclement of $-1 + j0$. 
For our circle (which passes through $0$ and $-K$) to enclose $-1$, the point $-K$ must lie to the left of $-1$.
$$ -K < -1 \implies K > 1 $$
*Reflection:* An open-loop unstable system ($P=1$) requires a high enough feedback gain ($K>1$) to "pull" the pole into the left-half plane. The Nyquist plot visualizes this mathematically requirement perfectly.

## Diagrams

```text
THE S-PLANE (Nyquist Contour)        THE L(s)-PLANE (Nyquist Plot)
      Im                                   Im
      ^                                    ^
      |                                    |  (w < 0 half)
   +jR|..._                                |      _..._
      |    `-.                             |    .'     `.
      |       \                            |   /         \
      |        |                           |  |           |
------|--------|-----> Re            -K  -1|  |     0     |-----> Re
      |        |                     x---x-|--+-----------o
      |       /                            |  |           |
      |    .-`                             |   \         /
   -jR|---`                                |    `._   _.`
      |                                    |       `+`
                                              (w > 0 half)
Contour encloses entire RHP.         Plot for L(s) = K/(s-1) with K > 1.
                                     Notice it encircles -1 once CCW.
```

## Memory technique — remember this forever
1. **Mnemonic:** **Z**ombies **N**eed **P**oles. $Z = N + P$. 
   * **Z** = Zeros (Unstable closed-loop poles — the bad guys).
   * **N** = Number of Clockwise encirclements.
   * **P** = Poles (Unstable open-loop poles — what you start with).
2. **Sign Convention:** **C**lockwise is **P**ositive (CP). Counter-clockwise is negative.
3. **Spaced-repetition schedule:** Review this concept and re-derive the worked example at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget $Z = N + P$, remember Cauchy: mapping $F(s)$ counts (Zeros enclosed) - (Poles enclosed). Let $F(s) = 1 + L(s)$. Encirclements of $0$ by $1+L(s)$ equal encirclements of $-1$ by $L(s)$.

## Common mistakes
1. **Flipping the sign of N:** Students often forget whether clockwise is positive or negative. Stick strictly to Clockwise = Positive. If the plot goes counter-clockwise around $-1$, $N$ is negative.
2. **Confusing open-loop and closed-loop poles:** $P$ is the number of unstable *open-loop* poles. $Z$ is the number of unstable *closed-loop* poles. Do not mix them up.
3. **Forgetting the $\omega = -\infty$ to $0$ segment:** Evaluating $L(j\omega)$ for positive frequencies only gives you half the plot. You must mirror it across the real axis to get the closed contour required to count encirclements.

## Self-check
1. If your open-loop system $L(s)$ has 2 poles in the RHP, how many times and in what direction must the Nyquist plot encircle $-1$ for the closed-loop system to be stable?
2. Sketch the Nyquist plot of $L(s) = \frac{1}{(s+2)^2}$. Does it encircle $-1$? What does this imply about its closed-loop stability?
3. How does adding a pure time delay $e^{-sT}$ alter the phase of $L(j\omega)$ as $\omega \to \infty$, and what does this geometrically do to the Nyquist plot?