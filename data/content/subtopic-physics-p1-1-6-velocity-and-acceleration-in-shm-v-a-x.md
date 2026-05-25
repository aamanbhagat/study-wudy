## What it is
In Simple Harmonic Motion (SHM), the velocity $v$ of an oscillating object is not constant. This formula, $v = \pm \omega\sqrt{A^2 - x^2}$, gives the object's instantaneous velocity as a function of its position $x$, where $A$ is the amplitude (maximum displacement) and $\omega$ is the angular frequency. It tells you how fast the object is moving at any point in its path, without needing to know the time.

## Why it matters
This relationship is fundamental to understanding any system that oscillates, which is most of them. In aerospace, it's crucial for analyzing and damping vibrations in rocket structures and control systems to prevent catastrophic failure. In computer science, oscillators are the heart of clock circuits that time every operation in a CPU, and understanding their dynamics is key to high-frequency computing.

## When to study it
Before tackling this, you must have a firm grasp of the following:
1.  **Definition of SHM**: The equation of motion $x(t) = A \cos(\omega t + \phi)$.
2.  **Calculus**: The derivatives of sine and cosine functions. Specifically, $\frac{d}{dt}\cos(u) = -\sin(u) \cdot \frac{du}{dt}$ and $\frac{d}{dt}\sin(u) = \cos(u) \cdot \frac{du}{dt}$.
3.  **Trigonometric Identities**: The Pythagorean identity, $\sin^2(\theta) + \cos^2(\theta) = 1$.
If you are not solid on these, master them first. There are no shortcuts.

## How to study it (step by step)
1.  **Start from First Principles**: Write down the equation for position in SHM, assuming phase $\phi=0$ for simplicity: $x(t) = A \cos(\omega t)$. Internalize that this describes an object oscillating between $x=-A$ and $x=+A$.
2.  **Derive Velocity with Calculus**: Velocity is the rate of change of position, $v = \frac{dx}{dt}$. Differentiate the position equation with respect to time.
    $$ v(t) = \frac{d}{dt} [A \cos(\omega t)] = -A\omega \sin(\omega t) $$
3.  **Derive Acceleration with Calculus**: Acceleration is the rate of change of velocity, $a = \frac{dv}{dt}$. Differentiate the velocity equation.
    $$ a(t) = \frac{d}{dt} [-A\omega \sin(\omega t)] = -A\omega^2 \cos(\omega t) $$
    Notice that since $x = A \cos(\omega t)$, we can write $a = -\omega^2 x$. This is the fundamental definition of SHM.
4.  **Eliminate Time**: Your goal is to relate $v$ and $x$ directly. You have two equations: $x(t)$ and $v(t)$. Isolate the trigonometric terms:
    $$ \cos(\omega t) = \frac{x}{A} $$
    $$ \sin(\omega t) = -\frac{v}{A\omega} $$
5.  **Use the Pythagorean Identity**: Substitute these into $\cos^2(\omega t) + \sin^2(\omega t) = 1$.
    $$ \left(\frac{x}{A}\right)^2 + \left(-\frac{v}{A\omega}\right)^2 = 1 $$
6.  **Solve for v**: Now, algebraically isolate $v$.
    $$ \frac{x^2}{A^2} + \frac{v^2}{A^2\omega^2} = 1 $$
    $$ \frac{v^2}{A^2\omega^2} = 1 - \frac{x^2}{A^2} = \frac{A^2 - x^2}{A^2} $$
    $$ v^2 = A^2\omega^2 \left(\frac{A^2 - x^2}{A^2}\right) = \omega^2(A^2 - x^2) $$
    $$ v = \pm \omega\sqrt{A^2 - x^2} $$
    This is the result. The $\pm$ indicates that at any position $x$ (other than the endpoints), the object could be moving in either the positive or negative direction.

## Key ideas, with intuition
1.  **Velocity is maximum at the center.** At the equilibrium position, $x=0$. Plugging this into the formula gives $v = \pm \omega\sqrt{A^2 - 0^2} = \pm \omega A$. This is the maximum speed, $v_{max}$. Intuitively, the restoring force has been accelerating the object towards the center, and at the center, the force is zero, so it's "coasting" at top speed before it starts to slow down.

2.  **Velocity is zero at the endpoints.** At the maximum displacements, $x = \pm A$. The formula gives $v = \pm \omega\sqrt{A^2 - A^2} = 0$. This is obvious: the object must momentarily stop to reverse its direction.

3.  **This is an energy conservation statement in disguise.** The total energy of a spring-mass system is $E = \frac{1}{2}mv^2 + \frac{1}{2}kx^2$. For a system in SHM, we know $\omega^2 = k/m$. The total energy is constant and equals the maximum potential energy, $E = \frac{1}{2}kA^2$.
    $$ \frac{1}{2}mv^2 + \frac{1}{2}kx^2 = \frac{1}{2}kA^2 $$
    $$ mv^2 = k(A^2 - x^2) $$
    $$ v^2 = \frac{k}{m}(A^2 - x^2) = \omega^2(A^2 - x^2) $$
    $$ v = \pm \omega\sqrt{A^2 - x^2} $$
    The formula is a direct consequence of energy being conserved as it converts between kinetic and potential forms.

## Worked example
**Problem**: An instrument package on a rocket test sled undergoes SHM with an amplitude of $A = 0.5$ m and an angular frequency of $\omega = 10$ rad/s. What is its speed when it is at position $x = 0.3$ m?

**Solution**:
1.  **Identify the knowns**:
    *   Amplitude, $A = 0.5$ m
    *   Angular frequency, $\omega = 10$ rad/s
    *   Position, $x = 0.3$ m
2.  **Identify the unknown**:
    *   Speed, $|v|$
3.  **Select the appropriate formula**: The problem relates position to velocity, so we use the time-independent formula.
    $$ v = \pm \omega\sqrt{A^2 - x^2} $$
4.  **Substitute the values**:
    $$ v = \pm 10 \sqrt{(0.5)^2 - (0.3)^2} $$
5.  **Calculate the terms inside the square root**:
    $$ v = \pm 10 \sqrt{0.25 - 0.09} $$
    $$ v = \pm 10 \sqrt{0.16} $$
6.  **Compute the final result**:
    $$ v = \pm 10 (0.4) $$
    $$ v = \pm 4.0 \text{ m/s} $$
The speed is the magnitude of the velocity, so the speed is $4.0$ m/s.

**Reflection**: This was a direct application of the formula. Step 1 and 2 ensured we knew what we had and what we needed. Step 3 selected the correct tool. The remaining steps were careful algebraic manipulation. The $\pm$ sign reminds us that the package has this speed twice in its cycle: once moving away from the center and once moving towards it.

## Diagrams
Here is a mass on a horizontal spring, illustrating the key variables.

```text
Equilibrium position (x=0)
<--|--------------------|--------------------|--> x-axis
   |                    |                    |
  -A                    0                   +A

An arbitrary position x:
   |              ******                  |
<--|--------------|MASS|------------------|-->
   |              ******                  |
   |              <-----> x                |
   |              ------> v                |

At the endpoint +A:
   |                                  ******
<--|----------------------------------|MASS|-->
   |                                  ******
   |              <------------------------> A
   |              v=0, a=-a_max           |
```

The relationship $v^2 = \omega^2(A^2 - x^2)$ can be rewritten as $\frac{v^2}{(A\omega)^2} + \frac{x^2}{A^2} = 1$. This is the equation of an ellipse. A plot of velocity versus position (a phase space diagram) shows this clearly.

```text
        ^ v (velocity)
        |
 v_max  + . . . . . . . . .
        | .               .
        |:                 :
--------+-------------------+--------> x (position)
 -A     |:                 :|    +A
        | .               .
-v_max  + . . . . . . . . .
        |
```

## Memory technique — remember this forever
1.  **The Pythagorean Hook**: Look at the formula $v = \omega\sqrt{A^2 - x^2}$. The term $\sqrt{A^2 - x^2}$ is the form of one leg of a right triangle with hypotenuse $A$ and other leg $x$. This is not a coincidence. In the "reference circle" model of SHM, the position $x$ is the projection of a point on the x-axis, the amplitude $A$ is the radius of the circle, and the vertical component of the point's tangential velocity gives the SHM velocity. That vertical component is proportional to $\sqrt{A^2-x^2}$ by the Pythagorean theorem. **Picture a right triangle inside a circle with hypotenuse A and base x. The height is what determines velocity.**

2.  **Must-Memorize Formulas**:
    $$ x(t) = A \cos(\omega t + \phi) $$
    $$ v = \pm \omega\sqrt{A^2 - x^2} $$
    $$ a = -\omega^2 x $$

3.  **Spaced Repetition Schedule**: Review and re-derive these formulas from scratch at these intervals:
    *   1 day from now.
    *   3 days from now.
    *   7 days from now.
    *   16 days from now.
    *   35 days from now.
    Actively recall, don't just read.

4.  **First Principles Pathway**: If you forget $v = \pm \omega\sqrt{A^2 - x^2}$, rebuild it.
    *   Start with $x = A \cos(\omega t)$.
    *   Differentiate to get $v = -A\omega \sin(\omega t)$.
    *   Use the identity $\sin^2(\theta)+\cos^2(\theta)=1$.
    *   Isolate $\cos(\omega t) = x/A$ and $\sin(\omega t) = -v/(A\omega)$.
    *   Substitute and solve for $v$. This path is foolproof.

## Common mistakes
1.  **Forgetting the $\pm$ sign**: Velocity is a vector; it has direction. At any given position $x$ (except the endpoints), the object can be moving left or right. The formula gives you the speed if you ignore the sign, but velocity requires it.
2.  **Units Mismatch**: $\omega$ must be in radians per second, not Hertz ($f$). Remember $\omega = 2\pi f$. If you are given frequency in Hz, convert it first.
3.  **Algebraic Errors**: Errors with squares and square roots are common. When calculating $A^2 - x^2$, ensure you square each term *before* subtracting. A common mistake is $(A-x)^2$ which is wrong.
4.  **Assuming $v_{max}$ is always $A\omega$**: This is the *magnitude* of the maximum velocity. The maximum velocity could be $+A\omega$ or $-A\omega$ depending on the initial conditions (phase).

## Self-check
1.  A pendulum bob swings with an amplitude of $10$ cm and a period of $2.0$ s. What is its maximum speed? What is its speed when it is $5.0$ cm from its equilibrium position?
2.  An object in SHM has a maximum speed of $5.0$ m/s and a maximum acceleration of $20.0$ m/s$^2$. What is the amplitude of the motion?
3.  At what position (as a fraction of amplitude $A$) is the kinetic energy of an object in SHM equal to its potential energy?