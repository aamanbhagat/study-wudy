## What it is
The equation $x(t) = A \cos(\omega t + \phi)$ is the general solution to the second-order differential equation that defines Simple Harmonic Motion (SHM). It describes the position $x$ of an oscillating object at any time $t$, using its amplitude $A$, angular frequency $\omega$, and phase constant $\phi$. This solution tells us that any system whose acceleration is proportional to and opposite its displacement must oscillate sinusoidally.

## Why it matters
This exact mathematical form appears everywhere. In aerospace, it describes the fundamental vibration modes of a rocket's structure or the sloshing of fuel in its tanks. In control systems, it models the oscillations that can arise from feedback loops, which must be damped for stability. In physics, it is the basis for understanding all waves, from sound and light to the wave functions of quantum mechanics.

## When to study it
Before tackling this, you must have a firm grasp of the following:
1.  **Newton's Second Law:** $F_{net} = ma$. Specifically, you must understand that acceleration $a$ is the second time derivative of position, $a = \frac{d^2x}{dt^2}$.
2.  **Hooke's Law:** The restoring force of a spring is $F_s = -kx$.
3.  **Calculus:** You must be able to differentiate trigonometric functions (sine and cosine) twice with respect to a variable.
4.  **Differential Equations:** You should know what a second-order linear homogeneous differential equation is. You do not need a general theory of solving them yet, as we will use a "guess and check" method, but you must understand the goal: to find a function $x(t)$ that satisfies the equation for all time.

If any of these are weak, pause and review them. Do not proceed with a shaky foundation.

## How to study it (step by step)
1.  **Derive the Equation of Motion.** Start with a physical system: a mass $m$ on a frictionless horizontal surface, attached to a spring with constant $k$. Apply Newton's Second Law ($F=ma$) and Hooke's Law ($F=-kx$). Equate them to get $m \frac{d^2x}{dt^2} = -kx$.
2.  **Standardize the Equation.** Rearrange the equation into the canonical form for SHM: $\frac{d^2x}{dt^2} + \frac{k}{m} x = 0$. Define the angular frequency $\omega = \sqrt{k/m}$, so the equation becomes $\frac{d^2x}{dt^2} + \omega^2 x = 0$. This is the differential equation for SHM.
3.  **Propose a Solution.** We need a function $x(t)$ whose second derivative is the negative of the original function, times a constant. The cosine function is a candidate. Propose the general form $x(t) = A \cos(\omega t + \phi)$.
4.  **Verify the Solution.** Differentiate your proposed solution twice.
    *   First derivative (velocity): $v(t) = \frac{dx}{dt} = -A\omega \sin(\omega t + \phi)$.
    *   Second derivative (acceleration): $a(t) = \frac{d^2x}{dt^2} = -A\omega^2 \cos(\omega t + \phi)$.
5.  **Substitute Back.** Substitute $x(t)$ and its second derivative into the standardized equation from Step 2.
    *   $(-A\omega^2 \cos(\omega t + \phi)) + \omega^2 (A \cos(\omega t + \phi)) = 0$.
    *   This is $0=0$. The equation holds for all $t$. Your proposed solution works.
6.  **Interpret the Constants.** Understand what $A$, $\omega$, and $\phi$ mean physically.
    *   $A$: Amplitude. The maximum displacement from equilibrium. Determined by initial energy/conditions.
    *   $\omega$: Angular Frequency. How rapidly the oscillation occurs, in radians per second. Determined by the system's physical properties ($k$ and $m$).
    *   $\phi$: Phase Constant. The starting position in the cycle at $t=0$. Determined by initial conditions.

## Key ideas, with intuition
1.  **The defining relationship of SHM is $a \propto -x$.** The differential equation $\frac{d^2x}{dt^2} = -\omega^2 x$ is the formal statement of this. The acceleration is always directed towards the equilibrium point ($x=0$) and is strongest when the displacement is largest. Imagine pulling a spring: the farther you pull it, the harder it pulls back.
2.  **The solution must "recycle" itself after two derivatives.** We need a function whose shape is maintained but inverted after differentiating twice. Sine and cosine are the unique functions with this property. $\frac{d}{dt}(\cos(t)) = -\sin(t)$, and $\frac{d}{dt}(-\sin(t)) = -\cos(t)$. The form of the function is recovered, with a negative sign. This is why the solution *must* be sinusoidal.
3.  **Initial conditions determine the specific oscillation.** The system's physics ($k$ and $m$) set the *frequency* $\omega$. But the *amplitude* $A$ and *phase* $\phi$ are set by how you start the motion. Releasing the mass from a large displacement gives a large $A$. Giving it an initial push at $t=0$ changes $\phi$.
    $$x(0) = A \cos(\phi)$$
    $$v(0) = -A\omega \sin(\phi)$$
    These two equations at $t=0$ uniquely determine the two unknowns, $A$ and $\phi$.

## Worked example
**Problem:** A 2 kg mass is attached to a spring with a spring constant of 200 N/m. The mass is pulled to a position of $x = 0.1$ m and released from rest at $t=0$. Find the equation of motion $x(t)$.

**Solution:**

1.  **Identify the goal.** We need to find $A$, $\omega$, and $\phi$ for the solution $x(t) = A \cos(\omega t + \phi)$.

2.  **Calculate the angular frequency $\omega$.** This depends only on the system's physical properties, $m$ and $k$.
    $$ \omega = \sqrt{\frac{k}{m}} = \sqrt{\frac{200 \text{ N/m}}{2 \text{ kg}}} = \sqrt{100 \text{ s}^{-2}} = 10 \text{ rad/s} $$
    *Reflection: This step connects the abstract $\omega$ to the concrete physical system.*

3.  **Use the initial conditions to find $A$ and $\phi$.** The initial conditions are given at $t=0$:
    *   Position: $x(0) = 0.1$ m
    *   Velocity: $v(0) = 0$ m/s (since it was "released from rest")

4.  **Apply the initial position.** Substitute $t=0$ and $x(0)=0.1$ into the position equation:
    $$ x(t) = A \cos(\omega t + \phi) $$
    $$ 0.1 = A \cos(10 \cdot 0 + \phi) \implies 0.1 = A \cos(\phi) $$
    *Reflection: This gives us one equation with two unknowns, $A$ and $\phi$. We need another.*

5.  **Apply the initial velocity.** First, find the general velocity equation by differentiating $x(t)$:
    $$ v(t) = \frac{dx}{dt} = -A\omega \sin(\omega t + \phi) $$
    Now substitute $t=0$ and $v(0)=0$:
    $$ 0 = -A(10) \sin(10 \cdot 0 + \phi) \implies 0 = -10A \sin(\phi) $$
    Since $A$ cannot be zero (there is an oscillation), we must have $\sin(\phi) = 0$. This implies $\phi = 0$ or $\phi = \pi$.
    *Reflection: This second condition constrains $\phi$. Now we can solve for $A$.*

6.  **Solve for the constants.**
    *   From Step 5, if $\phi=0$, then from Step 4, $0.1 = A \cos(0) = A \cdot 1 \implies A = 0.1$ m.
    *   If we had chosen $\phi=\pi$, then $0.1 = A \cos(\pi) = -A$, which would give $A=-0.1$ m. Amplitude $A$ is defined as positive, so we discard this. Thus, $\phi=0$ and $A=0.1$ m.
    *Reflection: We used both initial conditions to uniquely determine both constants.*

7.  **Write the final equation of motion.** Substitute the determined constants back into the general solution:
    $$ x(t) = 0.1 \cos(10t) $$
    The units (meters for position, seconds for time) are implied.

## Diagrams
This diagram shows the solution $x(t) = A \cos(\omega t + \phi)$ for a phase $\phi=0$ and a negative phase $\phi = -\pi/2$ (which is a sine wave).

```text
       x(t)
        ^
        |
      A + . . . . . . . . . . . . . . . . . . . . . . . . .
        | .           .           .           .           .
        | .         .   .         .         .   .         .
        | .       .       .       .       .       .       .
--------|- .-----.---------O---------O---------.-----.-----> t
   -A/|φ|< .   .           .       .           .   .       .
      v |   . .             . . .             . . .
        |     . . . . . . . . . . . . . . . . . .
     -A +       ^             ^             ^
        |       T/2           T            3T/2
        |
        | Key:
        | O = x(t) for φ = 0 (cosine)
        | . = x(t) for φ = -π/2 (sine)
        | A = Amplitude
        | T = Period = 2π/ω
        | |φ| = Magnitude of phase shift
```

## Memory technique — remember this forever
1.  **The Story:** Think of the SHM equation, $\ddot{x} = -\omega^2 x$, as a "law of stubbornness." An object's acceleration ($\ddot{x}$) is always trying to pull it back home ($x=0$), and its pull is proportional to how far away it is ($x$). The minus sign is the "stubbornness" — it always pulls opposite to the displacement. The solution, $A\cos(\omega t + \phi)$, is the graceful, repeating dance that results from this simple, stubborn law.

2.  **Must Overlearn:**
    *   The DE: $\frac{d^2x}{dt^2} + \omega^2 x = 0$
    *   The Solution: $x(t) = A \cos(\omega t + \phi)$
    *   Angular Frequency (mass-spring): $\omega = \sqrt{k/m}$

3.  **Spaced Repetition:** Review this material from scratch (re-derive, re-solve the example) on this schedule:
    *   Tomorrow (Day 1)
    *   In 3 days
    *   In 7 days
    *   In 16 days
    *   In 35 days

4.  **First Principles Pathway:** If you forget everything, rebuild it.
    *   Start with physics: $F=ma$ and $F=-kx$.
    *   Combine them: $m\frac{d^2x}{dt^2} = -kx$.
    *   Rearrange: $\frac{d^2x}{dt^2} = -(\frac{k}{m})x$. This is the core relationship.
    *   Ask: "What function, when differentiated twice, gives itself back with a negative constant?" The answer is sine or cosine.
    *   Write down the most general form: $x(t) = A \cos(\text{something} \cdot t + \text{something else})$. You can then re-derive the details.

## Common mistakes
1.  **Units Mismatch:** Using frequency $f$ (in Hz) instead of angular frequency $\omega$ (in rad/s) in the equation. Always remember $\omega = 2\pi f$. Your calculator must be in radians when evaluating the cosine term.
2.  **Phase Constant Sign Errors:** When solving for $\phi$ from initial conditions, there are often two possible values (e.g., $\phi$ and $-\phi$ might give the same $\cos(\phi)$). You *must* use the initial velocity's sign to pick the correct one. The sign of $v(0) \propto -\sin(\phi)$ resolves the ambiguity.
3.  **Forgetting $\omega$ in the Derivative:** When differentiating $A \cos(\omega t + \phi)$ to get velocity, a common mistake is to forget the factor of $\omega$ from the chain rule, writing $-A \sin(\omega t + \phi)$ instead of $-A\omega \sin(\omega t + \phi)$.

## Self-check
1.  Show explicitly that $x(t) = B \sin(\omega t + \delta)$ is also a valid general solution to the SHM differential equation. How are the constants $B$ and $\delta$ related to $A$ and $\phi$?
2.  A pendulum in a grandfather clock has a period of 2.0 s. Assuming it undergoes SHM, what is its angular frequency $\omega$? If the maximum swing (amplitude) is 5 cm from the center, write the equation for its position $x(t)$, assuming it starts at its maximum positive displacement at $t=0$.
3.  A 0.5 kg mass on a spring is described by the equation $x(t) = 0.2 \cos(8t - \pi/4)$. What is the spring constant $k$? What are the position and velocity of the mass at $t=0$? What is the maximum speed of the mass during its oscillation?