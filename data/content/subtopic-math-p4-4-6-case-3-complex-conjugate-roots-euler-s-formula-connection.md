## What it is
This is the method for solving a second-order linear homogeneous ordinary differential equation (ODE) with constant coefficients, specifically when its characteristic equation yields a pair of complex conjugate roots. We use Euler's formula to transform the resulting complex exponential solutions into a more intuitive, real-valued solution involving sine and cosine functions.

## Why it matters
This case is the mathematical foundation for describing all simple harmonic motion and oscillations. In physics and aerospace, this models damped spring-mass systems, RLC circuits, pendulum motion, and the vibrations of aircraft wings (flutter analysis). In machine learning, it appears in the analysis of certain optimization algorithms and recurrent neural networks that exhibit oscillatory behavior.

## When to study it
You must be proficient with the following before proceeding:
1.  **Second-Order Linear Homogeneous ODEs:** The general form $ay'' + by' + cy = 0$ and the purpose of the characteristic equation $ar^2 + br + c = 0$.
2.  **Cases 1 & 2:** Solving the characteristic equation for distinct real roots and repeated real roots.
3.  **Complex Numbers:** Arithmetic, the meaning of real and imaginary parts, and the complex plane.
4.  **Euler's Formula:** A solid understanding of the identity $e^{i\theta} = \cos\theta + i\sin\theta$. If this is not immediate, pause and review its derivation from Taylor series.

## How to study it (step by step)
1.  **Start with the assumption.** For an ODE $ay''+by'+cy=0$, we assume a solution of the form $y(t) = e^{rt}$. This leads to the characteristic equation $ar^2+br+c=0$.
2.  **Solve for complex roots.** Use the quadratic formula. When the discriminant $b^2-4ac$ is negative, the roots will be a complex conjugate pair, which we write as $r = \alpha \pm i\beta$.
3.  **Write the complex solutions.** The two fundamental solutions are $y_1(t) = e^{(\alpha+i\beta)t}$ and $y_2(t) = e^{(\alpha-i\beta)t}$. The general solution is a linear combination: $y(t) = c_1 e^{(\alpha+i\beta)t} + c_2 e^{(\alpha-i\beta)t}$. This is mathematically correct, but physically opaque and difficult to use with real-world initial conditions.
4.  **Apply Euler's Formula.** Use exponent rules to split the solution: $y_1(t) = e^{\alpha t} e^{i\beta t}$. Now apply Euler's formula: $y_1(t) = e^{\alpha t}(\cos(\beta t) + i\sin(\beta t))$. Do the same for $y_2(t)$, noting that $\cos(-\beta t) = \cos(\beta t)$ and $\sin(-\beta t) = -\sin(\beta t)$.
5.  **Use superposition to find real solutions.** The principle of superposition states that any linear combination of solutions is also a solution. We can combine our complex solutions $y_1$ and $y_2$ in a clever way to eliminate the imaginary parts.
    *   Construct a new solution $Y_1 = \frac{1}{2}(y_1 + y_2) = e^{\alpha t}\cos(\beta t)$.
    *   Construct another new solution $Y_2 = \frac{1}{2i}(y_1 - y_2) = e^{\alpha t}\sin(\beta t)$.
6.  **Form the general real solution.** $Y_1$ and $Y_2$ are two linearly independent, real-valued solutions. The general solution is their linear combination: $y(t) = C_1 e^{\alpha t}\cos(\beta t) + C_2 e^{\alpha t}\sin(\beta t)$, which is commonly written as $y(t) = e^{\alpha t}(C_1\cos(\beta t) + C_2\sin(\beta t))$.

## Key ideas, with intuition
1.  **Exponentials are the "natural" solutions.** The function $e^{rt}$ is its own derivative (up to a constant), which is why it is the fundamental building block for solutions to linear ODEs with constant coefficients. This doesn't change just because $r$ is complex.
2.  **Euler's formula is the bridge from rotation to oscillation.** In the complex plane, $e^{i\theta}$ represents a point on the unit circle at angle $\theta$. As $\theta$ (or time $t$) increases, this point rotates. The projection of this rotating point onto the real axis is $\cos(\theta)$, and its projection onto the imaginary axis is $\sin(\theta)$. Euler's formula, $e^{i\theta} = \cos\theta + i\sin\theta$, makes this connection explicit. Complex roots in your characteristic equation signal that the underlying process involves rotation, which we observe as oscillation.
3.  **The real and imaginary parts of the root have distinct physical meanings.** For a root $r = \alpha \pm i\beta$:
    $$ r = \underbrace{\alpha}_{\text{Damping/Growth}} \pm i \underbrace{\beta}_{\text{Frequency}} $$
    *   The real part, $\alpha$, controls the amplitude. If $\alpha < 0$, the amplitude decays exponentially (damped oscillation). If $\alpha > 0$, it grows exponentially (unstable oscillation). If $\alpha = 0$, the amplitude is constant (pure oscillation).
    *   The imaginary part, $\beta$, controls the frequency. It determines how fast the system oscillates. Higher $\beta$ means faster oscillations.

## Worked example
Solve the initial value problem: $y'' + 6y' + 13y = 0$, with $y(0)=1$ and $y'(0)=5$.

**Step 1: Form the characteristic equation.**
Assume a solution $y(t) = e^{rt}$. Substituting into the ODE gives:
$$ r^2e^{rt} + 6re^{rt} + 13e^{rt} = 0 $$
$$ r^2 + 6r + 13 = 0 $$

**Step 2: Solve for the roots.**
The discriminant is $b^2 - 4ac = 6^2 - 4(1)(13) = 36 - 52 = -16$. Since it's negative, we expect complex roots.
$$ r = \frac{-b \pm \sqrt{b^2-4ac}}{2a} = \frac{-6 \pm \sqrt{-16}}{2(1)} = \frac{-6 \pm 4i}{2} = -3 \pm 2i $$

**Step 3: Identify $\alpha$ and $\beta$ and write the general solution.**
The roots are of the form $\alpha \pm i\beta$. By comparison, $\alpha = -3$ and $\beta = 2$.
The general solution is $y(t) = e^{\alpha t}(C_1\cos(\beta t) + C_2\sin(\beta t))$.
$$ y(t) = e^{-3t}(C_1\cos(2t) + C_2\sin(2t)) $$

**Step 4: Apply initial conditions to find $C_1$ and $C_2$.**
First, use $y(0)=1$:
$$ 1 = e^{-3(0)}(C_1\cos(0) + C_2\sin(0)) = 1 \cdot (C_1 \cdot 1 + C_2 \cdot 0) \implies C_1 = 1 $$
Next, find the derivative $y'(t)$ using the product rule and chain rule:
$$ y'(t) = -3e^{-3t}(C_1\cos(2t) + C_2\sin(2t)) + e^{-3t}(-2C_1\sin(2t) + 2C_2\cos(2t)) $$
Now, use $y'(0)=5$ and our known value $C_1=1$:
$$ 5 = -3e^0(1\cos(0) + C_2\sin(0)) + e^0(-2(1)\sin(0) + 2C_2\cos(0)) $$
$$ 5 = -3(1) + (2C_2) \implies 8 = 2C_2 \implies C_2 = 4 $$

**Step 5: Write the final solution.**
Substitute the constants back into the general solution:
$$ y(t) = e^{-3t}(\cos(2t) + 4\sin(2t)) $$

**Reflection:** The characteristic equation gave complex roots, immediately telling us the system oscillates. The real part $\alpha=-3$ led to the $e^{-3t}$ term, indicating the oscillations are damped and decay to zero. The imaginary part $\beta=2$ set the frequency of oscillation. The initial conditions determined the specific amplitude and phase of this particular damped oscillation.

## Diagrams

This diagram shows the behavior of a solution with $\alpha < 0$, like the one in the worked example. It's a damped oscillation.

```text
       y(t)
        ^
        |
   1.0 -|- - - - - - - - - - - - - - - - - - - - -> y = e^(at) (envelope)
        |  .''.
        | /    \
        |/      \
  ------/--------'.----------------------------------> t
       ,'          \        /
      /             \      /
     /               '.  .'
-1.0 -|- - - - - - - - -.'- - - - - - - - - - - -> y = -e^(at) (envelope)
        |
```
The solution $y(t)$ oscillates between the two exponential envelopes defined by $e^{\alpha t}$ and $-e^{\alpha t}$. The real part of the root, $\alpha$, governs the decay rate of this envelope. The imaginary part, $\beta$, governs the frequency of the wave within the envelope.

## Memory technique — remember this forever
1.  **The Mnemonic:** "Alpha-Beta, Decay-and-Wave".
    *   **Alpha ($\alpha$)** is the **A**ttenuator (or **A**mplifier). It's the real part, and it controls the exponential decay or growth.
    *   **Beta ($\beta$)** is the **B**eat. It's the imaginary part, and it sets the frequency of the wave (cosine and sine).

2.  **Formulas to Overlearn:**
    *   For $ay'' + by' + cy = 0$, the characteristic equation is $ar^2 + br + c = 0$.
    *   Euler's Formula: $e^{i\theta} = \cos\theta + i\sin\theta$.
    *   If roots are $r = \alpha \pm i\beta$, the general solution is $y(t) = e^{\alpha t}(C_1\cos(\beta t) + C_2\sin(\beta t))$.

3.  **Spaced Repetition Schedule:** Review this material and solve one problem at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget the final solution form, rebuild it.
    *   The solutions must be $y(t) = e^{rt}$.
    *   Your roots are $r_1 = \alpha+i\beta$ and $r_2 = \alpha-i\beta$.
    *   The first solution is $y_1 = e^{(\alpha+i\beta)t} = e^{\alpha t}e^{i\beta t}$.
    *   Apply Euler's formula: $y_1 = e^{\alpha t}(\cos(\beta t) + i\sin(\beta t))$.
    *   This is a complex-valued solution to a real-valued ODE. A key theorem states that the real and imaginary parts of this solution must *also* be solutions.
    *   Real part: $e^{\alpha t}\cos(\beta t)$. Imaginary part: $e^{\alpha t}\sin(\beta t)$.
    *   These are your two linearly independent real solutions. The general solution is their linear combination. You have just re-derived the formula.

## Common mistakes
1.  **Dropping the exponential.** Forgetting the $e^{\alpha t}$ term when $\alpha \ne 0$. The solution is not just sines and cosines unless the motion is undamped ($\alpha=0$).
2.  **Swapping $\alpha$ and $\beta$.** Writing $e^{\beta t}(\dots \cos(\alpha t) \dots)$. Remember: Alpha is the Attenuator (in the exponential), Beta is the Beat (in the trig functions).
3.  **Sign errors on $\beta$.** The root is $\alpha \pm i\beta$. You only need the positive value of $\beta$ for the solution, i.e., $\cos(\beta t)$, not $\cos(-\beta t)$. The conjugate root is already accounted for in the general form.
4.  **Incorrectly applying the product rule.** When finding $y'(t)$ to solve for initial conditions, remember that both the exponential term and the trigonometric term depend on $t$. You must use the product rule.

## Self-check
Do not solve now. Use these to test your recall later.
1.  Find the general solution for $y'' + 100y = 0$. What is $\alpha$ in this case and what does it imply?
2.  Find the general solution for $y'' + 2y' + 10y = 0$. Describe the expected physical behavior of the system.
3.  Solve the initial value problem: $y'' - 4y' + 5y = 0$, with $y(0) = 2$ and $y'(0) = 5$. Is this system stable or unstable? Why?