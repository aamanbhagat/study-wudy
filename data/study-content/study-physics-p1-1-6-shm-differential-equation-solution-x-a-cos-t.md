## 1. What it is — in plain English

Imagine a child on a swing. They go back and forth, back and forth, in a smooth, predictable way. Or think about a weight hanging from a spring: pull it down and let it go, and it bounces up and down, up and down. This kind of regular, repeating motion is called Simple Harmonic Motion (SHM).

The equation $x = A \cos(\omega t + \phi)$ is like a perfect mathematical recipe for describing exactly where that child on the swing or that weight on the spring will be at any given moment. It tells you its position ($x$) as time ($t$) passes.

Let's break down the ingredients:
*   $x$: This is the position of the object at any specific time. It tells you how far it is from its central, "at rest" position.
*   $A$: This is the "Amplitude." It's the maximum distance the object ever moves away from its center. For the swing, it's how high it goes; for the spring, it's how far it stretches or compresses from its equilibrium.
*   $\omega$ (omega): This is the "Angular Frequency." It tells you how fast the oscillation is happening. A larger $\omega$ means it's swinging or bouncing faster.
*   $t$: This is "Time," the stopwatch reading since you started observing.
*   $\phi$ (phi): This is the "Phase Constant" or "Initial Phase." It tells you where the motion "starts" at time $t=0$. Did you release the swing from its highest point, or did you give it a push from the middle? This constant accounts for that initial condition.

So, in essence, this formula says that objects undergoing simple harmonic motion move in a way that follows a cosine wave pattern, with a specific maximum displacement ($A$), a specific speed of oscillation ($\omega$), and a specific starting point ($\phi$) when you begin counting time.

## 2. Why it matters — real-world applications

The simple harmonic motion equation, $x = A \cos(\omega t + \phi)$, is far more than just a theoretical curiosity; it's a foundational description for countless phenomena and technologies across physics and engineering. Understanding it is critical for anyone aiming to work with dynamic systems.

1.  **Precision Timing Devices (Clocks & Oscillators):** The most obvious application is in keeping time. Mechanical clocks (like grandfather clocks) use pendulums whose motion is approximated by SHM. More critically, quartz watches and nearly all modern electronics rely on tiny quartz crystals that vibrate at a very precise frequency. This vibration is a direct manifestation of SHM, where the crystal's physical properties determine its natural angular frequency ($\omega$). Companies like **Seiko** and **Rolex** (for mechanical watches) or **Intel** and **Apple** (for devices using quartz oscillators) depend on this principle for accurate timing.

2.  **Structural Engineering & Resonance:** Understanding SHM is vital for designing structures like bridges, buildings, and aircraft. Every structure has natural frequencies at which it prefers to vibrate. If an external force (like wind, seismic activity, or even marching soldiers) matches one of these natural frequencies, it can lead to resonance, where the amplitude of oscillation ($A$) grows dangerously large, potentially causing catastrophic failure. The infamous **Tacoma Narrows Bridge** collapse in 1940 is a classic example of resonance. Engineers at firms like **ARUP** or **Skidmore, Owings & Merrill (SOM)** meticulously analyze structural dynamics using SHM principles to prevent such disasters.

3.  **Aerospace & Control Systems:** In rocket science, understanding oscillations is crucial for stable flight. A rocket's control surfaces (fins, gimbals) need to dampen unwanted oscillations (like "pogo" oscillations caused by fuel sloshing or engine vibrations) rather than amplify them. The dynamics of a spacecraft's attitude (orientation) can often be modeled as SHM or damped SHM for small perturbations. Engineers at **SpaceX**, **NASA**, and **Blue Origin** use these equations to design robust control systems that keep rockets on course and prevent destructive vibrations during launch and orbit.

4.  **Electromagnetism & Waves (Radio/Light):** While the equation $x = A \cos(\omega t + \phi)$ directly describes mechanical motion, its form is identical to the equations describing electric and magnetic fields in electromagnetic waves (like radio waves, microwaves, light). Here, $x$ might represent the strength of the electric field, $A$ its maximum strength, and $\omega$ the wave's angular frequency. This is fundamental to how **Qualcomm** designs wireless communication chips, how **NVIDIA** designs GPUs (which process light), and how radio telescopes like the **ALMA Array** detect cosmic signals.

5.  **Seismology & Geophysics:** When an earthquake occurs, seismic waves travel through the Earth. Seismographs detect these ground motions, which are often oscillatory. Analyzing the frequency ($\omega$) and amplitude ($A$) of these oscillations helps geophysicists understand the earthquake's magnitude, locate its epicenter, and study Earth's internal structure. Companies involved in oil and gas exploration (e.g., **ExxonMobil**, **BP**) use similar principles to analyze seismic data for subsurface imaging.

## 3. Prerequisites — what you must know first

Before diving deep into the solution of the SHM differential equation, ensure you have a solid grasp of the following concepts. If any of these feel unfamiliar, pause and review them.

*   **Derivatives (Calculus I):** Understanding how to find the rate of change of a function. Specifically, you'll need to know derivatives of trigonometric functions and the chain rule.
    *   *Example:* $\frac{d}{dt}(t^n) = nt^{n-1}$, $\frac{d}{dt}(\cos(at)) = -a\sin(at)$.
*   **Second Derivatives (Calculus I):** The derivative of a derivative, representing the rate of change of the rate of change (acceleration).
    *   *Example:* If $x(t)$ is position, $\frac{dx}{dt}$ is velocity, and $\frac{d^2x}{dt^2}$ is acceleration.
*   **Trigonometric Functions (Pre-Calculus/Trigonometry):** Familiarity with sine, cosine, and tangent, their graphs, periodicity, and basic identities.
    *   *Example:* $\sin^2\theta + \cos^2\theta = 1$, understanding how to convert between sine and cosine using phase shifts.
*   **Basic Differential Equations (Calculus II/Differential Equations):** The idea of an equation involving a function and its derivatives, and what it means to "solve" such an equation (find the function that satisfies it).
    *   *Example:* $\frac{dy}{dx} = y$ has a solution $y = Ce^x$.
*   **Newton's Second Law of Motion (Physics I):** The relationship between force, mass, and acceleration.
    *   *Example:* $F = ma$.
*   **Hooke's Law (Physics I):** The force exerted by an ideal spring, proportional to its displacement from equilibrium.
    *   *Example:* $F = -kx$, where $k$ is the spring constant and $x$ is the displacement.
*   **Initial Conditions (Physics I/Calculus):** How to use specific values of position and velocity at a given time (usually $t=0$) to determine unknown constants in a general solution.
    *   *Example:* If $x(0) = x_0$ and $v(0) = v_0$.

## 4. The core idea — step by step

The core idea is to show that the function $x(t) = A \cos(\omega t + \phi)$ is indeed a solution to the differential equation that describes Simple Harmonic Motion. This isn't just about plugging in and checking; it's about understanding *why* this form of solution is chosen and what each part means.

### Step 1: Deriving the SHM Differential Equation

*   **Plain English:** Simple Harmonic Motion happens when the restoring force acting on an object is directly proportional to its displacement from equilibrium and always points back towards that equilibrium. Think of a spring: the more you stretch it, the harder it pulls back.
*   **Concrete Example:** A mass $m$ attached to an ideal spring with spring constant $k$. When the mass is displaced by a distance $x$ from its equilibrium position, the spring exerts a force $F = -kx$. The negative sign indicates that the force is always opposite to the displacement (it's a *restoring* force).
*   **Formal/Mathematical Version:**
    We start with Newton's Second Law:
    $$F = ma$$
    For an object moving along the x-axis, acceleration is the second derivative of position with respect to time: $a = \frac{d^2x}{dt^2}$.
    The restoring force for SHM is given by Hooke's Law:
    $$F = -kx$$
    Equating these two expressions for force:
    $$m \frac{d^2x}{dt^2} = -kx$$
    Rearranging this equation, we get the fundamental differential equation for Simple Harmonic Motion:
    $$\frac{d^2x}{dt^2} + \frac{k}{m}x = 0$$
    To simplify notation, we define $\omega^2 = \frac{k}{m}$. This $\omega$ is the angular frequency.
    So, the SHM differential equation is:
    $$\frac{d^2x}{dt^2} + \omega^2 x = 0$$
*   **What could go wrong:** Forgetting the negative sign in Hooke's Law or misinterpreting its meaning. This sign is crucial because it indicates a *restoring* force, which is what causes oscillation. If it were positive, the force would push the object *away* from equilibrium, leading to exponential growth, not oscillation.

### Step 2: Guessing the Solution Form

*   **Plain English:** We're looking for a function $x(t)$ whose second derivative is proportional to the negative of the original function. What kind of functions behave like this? Functions that oscillate! When you differentiate them twice, you get back something similar to what you started with, but with a sign change and a constant factor.
*   **Concrete Example:** Consider $\sin(t)$. Its first derivative is $\cos(t)$, and its second derivative is $-\sin(t)$. Similarly, for $\cos(t)$, its first derivative is $-\sin(t)$, and its second derivative is $-\cos(t)$. These are exactly the types of functions whose second derivatives are proportional to their negative selves.
*   **Formal/Mathematical Version:**
    We need a function $x(t)$ such that $\frac{d^2x}{dt^2} = -\omega^2 x$.
    Functions whose second derivatives are proportional to their negative selves are sinusoidal functions (sine and cosine).
    Therefore, we *propose* a solution of the form:
    $$x(t) = A \cos(\omega t + \phi)$$
    where $A$, $\omega$, and $\phi$ are constants that we need to define or determine.
*   **What could go wrong:** Arbitrarily picking a function without understanding *why* sinusoidal functions are appropriate. This isn't just a random guess; it's an educated guess based on the properties of derivatives.

### Step 3: Differentiating the Proposed Solution

*   **Plain English:** Now that we have a candidate solution, we need to calculate its first and second derivatives with respect to time. This is a direct application of calculus rules, specifically the chain rule.
*   **Concrete Example:** If $x(t) = 5 \cos(2t + \pi/4)$, then $\frac{dx}{dt} = -5 \cdot 2 \sin(2t + \pi/4) = -10 \sin(2t + \pi/4)$. And $\frac{d^2x}{dt^2} = -10 \cdot 2 \cos(2t + \pi/4) = -20 \cos(2t + \pi/4)$. Notice how the original function reappears, multiplied by a constant.
*   **Formal/Mathematical Version:**
    Given the proposed solution:
    $$x(t) = A \cos(\omega t + \phi)$$
    First derivative (velocity):
    $$\frac{dx}{dt} = \frac{d}{dt}[A \cos(\omega t + \phi)]$$
    Using the chain rule, $\frac{d}{du}(\cos u) = -\sin u$ and $\frac{du}{dt} = \omega$:
    $$\frac{dx}{dt} = -A\omega \sin(\omega t + \phi)$$
    Second derivative (acceleration):
    $$\frac{d^2x}{dt^2} = \frac{d}{dt}[-A\omega \sin(\omega t + \phi)]$$
    Using the chain rule, $\frac{d}{du}(\sin u) = \cos u$ and $\frac{du}{dt} = \omega$:
    $$\frac{d^2x}{dt^2} = -A\omega^2 \cos(\omega t + \phi)$$
*   **What could go wrong:** Common mistakes include forgetting the negative sign when differentiating cosine, or forgetting to multiply by $\omega$ (from the chain rule) for each differentiation. These are critical errors that will prevent the solution from verifying.

### Step 4: Verifying the Solution by Substitution

*   **Plain English:** We now take the second derivative we just calculated and plug it back into our original differential equation. If our proposed solution is correct, the equation should hold true, meaning both sides should be equal.
*   **Concrete Example:** If our differential equation was $\frac{d^2x}{dt^2} + 4x = 0$ and we proposed $x(t) = \cos(2t)$, then $\frac{d^2x}{dt^2} = -4\cos(2t)$. Plugging in: $-4\cos(2t) + 4(\cos(2t)) = 0$. This simplifies to $0=0$, so it works!
*   **Formal/Mathematical Version:**
    Substitute $x(t) = A \cos(\omega t + \phi)$ and $\frac{d^2x}{dt^2} = -A\omega^2 \cos(\omega t + \phi)$ into the SHM differential equation:
    $$\frac{d^2x}{dt^2} + \omega^2 x = 0$$
    $$[-A\omega^2 \cos(\omega t + \phi)] + \omega^2 [A \cos(\omega t + \phi)] = 0$$
    Factor out $A \cos(\omega t + \phi)$:
    $$A \cos(\omega t + \phi) (-\omega^2 + \omega^2) = 0$$
    $$A \cos(\omega t + \phi) (0) = 0$$
    $$0 = 0$$
    This equation is true for all values of $t$. This confirms that $x(t) = A \cos(\omega t + \phi)$ is indeed a valid solution to the Simple Harmonic Motion differential equation, provided that the $\omega$ in the solution matches the $\omega$ defined by $\omega^2 = k/m$.
*   **What could go wrong:** If the terms don't cancel out to $0=0$, it means there was an error in differentiation or substitution. Double-check all steps carefully.

### Step 5: Understanding the Parameters: A, $\omega$, $\phi$

*   **Plain English:** The solution $x = A \cos(\omega t + \phi)$ isn't just a single answer; it's a *family* of answers. The specific motion depends on the values of $A$, $\omega$, and $\phi$. These values are determined by the physical properties of the system and how the motion *starts*.
*   **Concrete Example:**
    *   **A (Amplitude):** If you pull a spring down 10 cm and release it, $A=10$ cm. If you pull it down 5 cm, $A=5$ cm. It's the maximum displacement.
    *   **$\omega$ (Angular Frequency):** For a given spring and mass, $\omega = \sqrt{k/m}$ is fixed. A stiffer spring (larger $k$) or smaller mass (smaller $m$) means a larger $\omega$, so faster oscillations.
    *   **$\phi$ (Phase Constant):** If you release the spring from its maximum positive displacement (e.g., $x=A$) at $t=0$, then $x(0) = A \cos(\phi) = A$, which means $\cos(\phi) = 1$, so $\phi=0$. If you release it from equilibrium ($x=0$) with a positive velocity at $t=0$, then $x(0) = A \cos(\phi) = 0$, so $\phi = \pm \pi/2$. We also need to consider the velocity at $t=0$ to choose the correct sign for $\phi$.
*   **Formal/Mathematical Version:**
    *   **Amplitude ($A$):** Represents the maximum displacement from the equilibrium position. It is always a positive scalar ($A \ge 0$). It is determined by the initial conditions (e.g., how far the object was displaced or how much energy was initially imparted).
    *   **Angular Frequency ($\omega$):** Defined by the physical properties of the system as $\omega = \sqrt{\frac{k}{m}}$ for a mass-spring system. It dictates how rapidly the oscillation occurs. Its unit is radians per second (rad/s). It is related to the natural frequency $f$ (in Hz) by $\omega = 2\pi f$ and to the period $T$ (in seconds) by $\omega = \frac{2\pi}{T}$.
    *   **Phase Constant ($\phi$):** Determines the initial state of the oscillation at $t=0$. It shifts the cosine wave horizontally. Its value (in radians) is determined by the specific initial conditions of position $x(0)$ and velocity $v(0)$.
        *   At $t=0$: $x(0) = A \cos(\phi)$
        *   Velocity at $t=0$: $v(0) = \frac{dx}{dt}\Big|_{t=0} = -A\omega \sin(\phi)$
        These two equations allow us to solve for $A$ and $\phi$. For example, dividing the second by the first (if $x(0) \ne 0$) gives $\frac{v(0)}{x(0)} = -\omega \tan(\phi)$, so $\tan(\phi) = -\frac{v(0)}{\omega x(0)}$. We must use $x(0)$ and $v(0)$ to correctly determine $\phi$ in the correct quadrant.
*   **What could go wrong:** Confusing $\omega$ with $f$ or $T$. Forgetting that $A$ and $\phi$ are determined by initial conditions, while $\omega$ is determined by the system's physical properties ($k, m$). Incorrectly solving for $\phi$ by only using $\cos(\phi)$ or $\sin(\phi)$ without considering both initial conditions to determine the correct quadrant.

### Step 6: The General Solution and Alternative Forms

*   **Plain English:** While we focused on $x = A \cos(\omega t + \phi)$, a sine function also works, or even a combination of both. All these forms are mathematically equivalent and just represent different ways of setting the "starting point" of the wave.
*   **Concrete Example:** $\cos(\theta)$ is just $\sin(\theta + \pi/2)$. So, a cosine wave is simply a sine wave shifted by a quarter cycle. This means if $x = A \sin(\omega t + \phi')$ is a solution, then $x = A \cos(\omega t + \phi)$ is also a solution, where $\phi = \phi' - \pi/2$.
*   **Formal/Mathematical Version:**
    The general solution to the SHM differential equation $\frac{d^2x}{dt^2} + \omega^2 x = 0$ can be written in several equivalent forms:
    1.  $$x(t) = A \cos(\omega t + \phi)$$
    2.  $$x(t) = B \sin(\omega t + \phi')$$
    3.  $$x(t) = C_1 \cos(\omega t) + C_2 \sin(\omega t)$$
    All these forms are mathematically equivalent. The constants $A, \phi$ (or $B, \phi'$ or $C_1, C_2$) are determined by the initial conditions. For instance, if you have $x(t) = C_1 \cos(\omega t) + C_2 \sin(\omega t)$, you can convert it to the $A \cos(\omega t + \phi)$ form using the trigonometric identity $C_1 \cos(\omega t) + C_2 \sin(\omega t) = \sqrt{C_1^2 + C_2^2} \cos(\omega t - \arctan(C_2/C_1))$. Here, $A = \sqrt{C_1^2 + C_2^2}$ and $\phi = -\arctan(C_2/C_1)$, paying attention to the quadrant.
*   **What could go wrong:** Believing that only the cosine form is correct. While often preferred for its initial condition interpretation (max displacement at $t=0$ if $\phi=0$), any of these forms are equally valid and can be interconverted.

## 5. Worked examples — multiple, with every step shown

### Example 1: Easy — Find position at a given time

**Problem:** A particle undergoes Simple Harmonic Motion described by the equation $x(t) = 0.25 \cos(4t + \pi/3)$ meters. Find its position at $t = \pi/8$ seconds.

**Given:**
*   Amplitude $A = 0.25$ m
*   Angular frequency $\omega = 4$ rad/s
*   Phase constant $\phi = \pi/3$ rad
*   Time $t = \pi/8$ s

**Wanted:** Position $x$ at $t = \pi/8$ s.

**Solution:**

1.  **Write down the given equation for position:**
    $$x(t) = A \cos(\omega t + \phi)$$
    This is the general form of the SHM solution.
    $$x(t) = 0.25 \cos(4t + \pi/3)$$
    This is the specific equation for this particle.

2.  **Substitute the given time $t = \pi/8$ into the equation:**
    $$x(\pi/8) = 0.25 \cos(4(\pi/8) + \pi/3)$$
    We are evaluating the position at the specified time.

3.  **Simplify the argument of the cosine function:**
    $$x(\pi/8) = 0.25 \cos(\pi/2 + \pi/3)$$
    First, multiply $4 \times \pi/8 = \pi/2$.

4.  **Add the angles inside the cosine function:**
    To add $\pi/2$ and $\pi/3$, find a common denominator, which is 6.
    $$\pi/2 = 3\pi/6$$
    $$\pi/3 = 2\pi/6$$
    So, $\pi/2 + \pi/3 = 3\pi/6 + 2\pi/6 = 5\pi/6$.
    $$x(\pi/8) = 0.25 \cos(5\pi/6)$$
    This simplifies the angle to a single value.

5.  **Evaluate the cosine function:**
    The angle $5\pi/6$ is in the second quadrant, where cosine is negative. The reference angle is $\pi/6$.
    $$\cos(5\pi/6) = -\cos(\pi/6) = -\frac{\sqrt{3}}{2}$$
    We use our knowledge of trigonometric values for standard angles.

6.  **Calculate the final position:**
    $$x(\pi/8) = 0.25 \left(-\frac{\sqrt{3}}{2}\right)$$
    $$x(\pi/8) = \frac{1}{4} \left(-\frac{\sqrt{3}}{2}\right)$$
    $$x(\pi/8) = -\frac{\sqrt{3}}{8}$$
    This is the numerical value for the position.

7.  **Provide the answer with units:**
    $$x(\pi/8) \approx -0.2165 \text{ m}$$
    We convert to a decimal for practical understanding and include units.

**Reflection:** This example was straightforward, primarily testing the ability to substitute values and perform basic trigonometric calculations. The trickiest part might be correctly evaluating the cosine of $5\pi/6$.

---

### Example 2: Medium — Determine $A$ and $\phi$ from initial conditions

**Problem:** An object undergoing SHM has a position $x(t) = A \cos(\omega t + \phi)$. At $t=0$, its position is $x(0) = 0.1$ m and its velocity is $v(0) = 0.3$ m/s. If the angular frequency is $\omega = 2$ rad/s, find the amplitude $A$ and the phase constant $\phi$.

**Given:**
*   $x(0) = 0.1$ m
*   $v(0) = 0.3$ m/s
*   $\omega = 2$ rad/s

**Wanted:** Amplitude $A$ and Phase Constant $\phi$.

**Solution:**

1.  **Write down the general position and velocity equations:**
    $$x(t) = A \cos(\omega t + \phi)$$
    This is the position equation.
    To find velocity, differentiate $x(t)$ with respect to $t$:
    $$v(t) = \frac{dx}{dt} = -A\omega \sin(\omega t + \phi)$$
    This is the velocity equation, obtained by applying the chain rule.

2.  **Apply the initial conditions at $t=0$:**
    For position:
    $$x(0) = A \cos(\omega(0) + \phi)$$
    $$x(0) = A \cos(\phi)$$
    Substitute the given value $x(0) = 0.1$:
    $$0.1 = A \cos(\phi) \quad \text{(Equation 1)}$$
    For velocity:
    $$v(0) = -A\omega \sin(\omega(0) + \phi)$$
    $$v(0) = -A\omega \sin(\phi)$$
    Substitute the given values $v(0) = 0.3$ and $\omega = 2$:
    $$0.3 = -A(2) \sin(\phi)$$
    $$0.3 = -2A \sin(\phi) \quad \text{(Equation 2)}$$
    We now have a system of two equations with two unknowns, $A$ and $\phi$.

3.  **Solve for $\phi$ using the ratio of the two equations:**
    Divide Equation 2 by Equation 1:
    $$\frac{0.3}{0.1} = \frac{-2A \sin(\phi)}{A \cos(\phi)}$$
    $$3 = -2 \frac{\sin(\phi)}{\cos(\phi)}$$
    $$3 = -2 \tan(\phi)$$
    $$\tan(\phi) = -\frac{3}{2} = -1.5$$
    Dividing eliminates $A$ and gives us an equation for $\tan(\phi)$.

4.  **Find the principal value of $\phi$ and determine the correct quadrant:**
    $$\phi = \arctan(-1.5)$$
    Using a calculator, $\arctan(-1.5) \approx -0.9828$ radians.
    Now, consider the signs of $\sin(\phi)$ and $\cos(\phi)$ from Equations 1 and 2:
    From Eq 1: $A \cos(\phi) = 0.1$. Since $A$ is always positive, $\cos(\phi)$ must be positive.
    From Eq 2: $-2A \sin(\phi) = 0.3$. Since $A$ is positive, $-2A$ is negative, so $\sin(\phi)$ must be negative.
    A positive cosine and negative sine mean $\phi$ is in the **fourth quadrant**.
    The value $-0.9828$ rad is indeed in the fourth quadrant. If the calculator gave a positive angle (e.g., in the second quadrant if $\tan$ was negative), we would need to add or subtract $\pi$ to get to the correct quadrant.
    So, $\phi \approx -0.9828$ radians.
    It's also common to express $\phi$ as a positive angle. Adding $2\pi$ to $-0.9828$ gives $\phi \approx 5.3004$ radians. Both are mathematically correct, but typically we choose the principal value or the smallest positive angle. Let's stick with the principal value for now.

5.  **Solve for $A$ using Equation 1 (or 2):**
    From Equation 1: $0.1 = A \cos(\phi)$
    $$A = \frac{0.1}{\cos(\phi)}$$
    $$A = \frac{0.1}{\cos(-0.9828)}$$
    $$A = \frac{0.1}{0.5547}$$
    $$A \approx 0.1803 \text{ m}$$
    We can also use the identity $A^2 = x(0)^2 + (v(0)/\omega)^2$:
    $$A = \sqrt{(0.1)^2 + (0.3/2)^2} = \sqrt{0.01 + (0.15)^2} = \sqrt{0.01 + 0.0225} = \sqrt{0.0325}$$
    $$A \approx 0.1803 \text{ m}$$
    This provides a good cross-check.

6.  **State the final answers:**
    $$\boxed{A \approx 0.1803 \text{ m}}$$
    $$\boxed{\phi \approx -0.9828 \text{ rad}}$$

**Reflection:** This example requires solving a system of two trigonometric equations. The crucial step is correctly determining the quadrant for $\phi$ by considering the signs of both $\sin(\phi)$ and $\cos(\phi)$ based on the initial conditions, rather than just relying on the $\arctan$ function directly.

---

### Example 3: Medium-Hard — Mass-spring system, find full solution

**Problem:** A 0.5 kg mass is attached to a spring with a spring constant of $k = 50$ N/m. The mass is pulled 10 cm from its equilibrium position and released from rest at $t=0$. Write the complete equation for its position $x(t)$.

**Given:**
*   Mass $m = 0.5$ kg
*   Spring constant $k = 50$ N/m
*   Initial position $x(0) = 10$ cm $= 0.1$ m
*   Initial velocity $v(0) = 0$ m/s (released from rest)

**Wanted:** The complete position equation $x(t) = A \cos(\omega t + \phi)$.

**Solution:**

1.  **Calculate the angular frequency $\omega$:**
    The angular frequency is determined by the system's physical properties:
    $$\omega = \sqrt{\frac{k}{m}}$$
    Substitute the given values for $k$ and $m$:
    $$\omega = \sqrt{\frac{50 \text{ N/m}}{0.5 \text{ kg}}}$$
    $$\omega = \sqrt{100 \text{ rad}^2/\text{s}^2}$$
    $$\omega = 10 \text{ rad/s}$$
    This is a fundamental property of the system.

2.  **Write down the general position and velocity equations:**
    $$x(t) = A \cos(\omega t + \phi)$$
    $$v(t) = -A\omega \sin(\omega t + \phi)$$
    These are the standard forms we will use.

3.  **Apply initial conditions at $t=0$ to find $A$ and $\phi$:**
    *   **For position $x(0)$:**
        $$x(0) = A \cos(\omega(0) + \phi)$$
        $$0.1 = A \cos(\phi) \quad \text{(Equation 1)}$$
        We substitute $x(0)=0.1$ and $t=0$.

    *   **For velocity $v(0)$:**
        $$v(0) = -A\omega \sin(\omega(0) + \phi)$$
        $$0 = -A(10) \sin(\phi)$$
        $$0 = -10A \sin(\phi) \quad \text{(Equation 2)}$$
        We substitute $v(0)=0$ and $\omega=10$.

4.  **Solve for $\phi$ from Equation 2:**
    Since $A$ cannot be zero (otherwise there's no motion), and $\omega=10 \ne 0$, the only way for Equation 2 to be true is if:
    $$\sin(\phi) = 0$$
    This implies $\phi$ could be $0, \pm\pi, \pm2\pi, \dots$.
    Now, use Equation 1:
    $$0.1 = A \cos(\phi)$$
    Since $0.1$ is positive and $A$ is positive, $\cos(\phi)$ must be positive.
    Out of the possible values for $\phi$ from $\sin(\phi)=0$, only $\phi=0$ (or $2\pi, -2\pi$, etc.) results in a positive $\cos(\phi)$ (specifically, $\cos(0)=1$).
    Therefore, $\phi = 0$ radians.
    We choose $\phi=0$ as the simplest and most common representation for this case.

5.  **Solve for $A$ using Equation 1 and the determined $\phi$:**
    $$0.1 = A \cos(0)$$
    $$0.1 = A(1)$$
    $$A = 0.1 \text{ m}$$
    Since the mass was released from its maximum displacement, the amplitude is simply that initial displacement.

6.  **Write the complete position equation $x(t)$:**
    Substitute the values for $A$, $\omega$, and $\phi$ into the general form:
    $$x(t) = A \cos(\omega t + \phi)$$
    $$x(t) = 0.1 \cos(10t + 0)$$
    $$\boxed{x(t) = 0.1 \cos(10t) \text{ m}}$$
    This is the final equation describing the motion.

**Reflection:** This example demonstrates how the physical properties of the system ($m, k$) determine $\omega$, and how the initial conditions ($x(0), v(0)$) determine $A$ and $\phi$. Releasing from rest at maximum displacement is a common initial condition that simplifies the phase constant to zero.

---

### Example 4: Hard — Find time when particle reaches a specific position

**Problem:** A particle oscillates with SHM according to $x(t) = 0.4 \sin(5t - \pi/6)$ meters. Find the first time $t > 0$ when the particle reaches $x = -0.2$ meters.

**Given:**
*   Position equation $x(t) = 0.4 \sin(5t - \pi/6)$ m
*   Target position $x = -0.2$ m

**Wanted:** The smallest $t > 0$ for which $x(t) = -0.2$ m.

**Solution:**

1.  **Set the position equation equal to the target position:**
    $$0.4 \sin(5t - \pi/6) = -0.2$$
    We are looking for the time $t$ when this condition is met.

2.  **Isolate the sine function:**
    $$\sin(5t - \pi/6) = \frac{-0.2}{0.4}$$
    $$\sin(5t - \pi/6) = -0.5$$
    This simplifies the trigonometric equation.

3.  **Find the general solutions for the angle:**
    Let $\theta = 5t - \pi/6$. We need to solve $\sin(\theta) = -0.5$.
    The angles where $\sin(\theta) = -0.5$ are in the third and fourth quadrants.
    The reference angle is $\pi/6$ (since $\sin(\pi/6) = 0.5$).
    *   In the third quadrant: $\theta_1 = \pi + \pi/6 = 7\pi/6$.
    *   In the fourth quadrant: $\theta_2 = 2\pi - \pi/6 = 11\pi/6$ (or $-\pi/6$).
    Including periodicity, the general solutions for $\theta$ are:
    $$\theta = 7\pi/6 + 2n\pi \quad \text{or} \quad \theta = 11\pi/6 + 2n\pi$$
    where $n$ is an integer ($0, \pm 1, \pm 2, \dots$).
    These are all possible values for the argument of the sine function.

4.  **Substitute back $\theta = 5t - \pi/6$ and solve for $t$:**
    *   **Case 1:** $5t - \pi/6 = 7\pi/6 + 2n\pi$
        $$5t = 7\pi/6 + \pi/6 + 2n\pi$$
        $$5t = 8\pi/6 + 2n\pi$$
        $$5t = 4\pi/3 + 2n\pi$$
        $$t = \frac{4\pi}{15} + \frac{2n\pi}{5} \quad \text{(Equation A)}$$

    *   **Case 2:** $5t - \pi/6 = 11\pi/6 + 2n\pi$
        $$5t = 11\pi/6 + \pi/6 + 2n\pi$$
        $$5t = 12\pi/6 + 2n\pi$$
        $$5t = 2\pi + 2n\pi$$
        $$5t = (2+2n)\pi$$
        $$t = \frac{(2+2n)\pi}{5} \quad \text{(Equation B)}$$
    We now have two sets of possible times.

5.  **Find the smallest $t > 0$ by testing values of $n$:**
    *   **For Equation A:** $t = \frac{4\pi}{15} + \frac{2n\pi}{5}$
        *   If $n=0$: $t = \frac{4\pi}{15} \approx \frac{4 \times 3.14159}{15} \approx 0.8378$ s
        *   If $n=1$: $t = \frac{4\pi}{15} + \frac{2\pi}{5} = \frac{4\pi}{15} + \frac{6\pi}{15} = \frac{10\pi}{15} = \frac{2\pi}{3} \approx 2.0944$ s
        *   If $n=-1$: $t = \frac{4\pi}{15} - \frac{2\pi}{5} = \frac{4\pi}{15} - \frac{6\pi}{15} = -\frac{2\pi}{15}$ (not $>0$)

    *   **For Equation B:** $t = \frac{(2+2n)\pi}{5}$
        *   If $n=0$: $t = \frac{2\pi}{5} \approx \frac{2 \times 3.14159}{5} \approx 1.2566$ s
        *   If $n=-1$: $t = \frac{(2-2)\pi}{5} = 0$ s (not $>0$, problem asks for $t>0$)
        *   If $n=-2$: $t = \frac{(2-4)\pi}{5} = -\frac{2\pi}{5}$ (not $>0$)

    Comparing the positive times: $0.8378$ s (from A, $n=0$) and $1.2566$ s (from B, $n=0$).
    The smallest positive time is $t = \frac{4\pi}{15}$ s.

6.  **State the final answer:**
    $$\boxed{t = \frac{4\pi}{15} \text{ s}}$$
    $$t \approx 0.8378 \text{ s}$$

**Reflection:** This example requires careful handling of the inverse trigonometric function, including finding all general solutions for the angle and then systematically checking for the smallest positive time. It's easy to miss one set of solutions or incorrectly choose the value of $n$.

## 6. Common mistakes and traps

1.  **Confusing $\omega$ with $f$ or $T$:**
    *   **Mistake:** Using $\omega$ in calculations where frequency $f$ (in Hz) or period $T$ (in seconds) is required, or vice-versa, without conversion.
    *   **Why it happens:** All three relate to how fast the oscillation occurs, but they have different units and definitions. $\omega$ (angular frequency, rad/s) is used directly in the SHM equation, while $f = \omega/(2\pi)$ (frequency, Hz) and $T = 1/f = 2\pi/\omega$ (period, s) are more intuitive for "cycles per second" or "seconds per cycle."
    *   **Correction:** Always remember the conversion factors: $\omega = 2\pi f = 2\pi/T$. Pay close attention to units given in the problem.

2.  **Incorrectly determining the phase constant $\phi$:**
    *   **Mistake:** Solving for $\phi$ using only $\cos(\phi)$ or $\sin(\phi)$ and not considering both initial conditions ($x(0)$ and $v(0)$) to determine the correct quadrant. For example, if $\cos(\phi) = -0.5$, $\phi$ could be $2\pi/3$ or $4\pi/3$. Which one is correct depends on the sign of $\sin(\phi)$, which comes from $v(0)$.
    *   **Why it happens:** Calculators often return only the principal value for $\arccos$ or $\arcsin$, which might not be in the correct quadrant for the physical situation.
    *   **Correction:** Use both $x(0) = A \cos(\phi)$ and $v(0) = -A\omega \sin(\phi)$ to deduce the signs of $\cos(\phi)$ and $\sin(\phi)$, respectively. Then, use the signs to place $\phi$ in the correct quadrant. The `atan2(y, x)` function (available in most programming languages) is designed to handle this correctly by taking both the sine and cosine components.

3.  **Sign errors in derivatives:**
    *   **Mistake:** Forgetting the negative sign when differentiating $\cos(u)$ to $-\sin(u)$, or when differentiating $\sin(u)$ to $\cos(u)$ but then accidentally adding an extra negative sign.
    *   **Why it happens:** Haste, or a lack of memorization/understanding of basic trigonometric derivatives.
    *   **Correction:** Drill basic derivatives: $\frac{d}{dx}(\sin x) = \cos x$, $\frac{d}{dx}(\cos x) = -\sin x$. Double-check the chain rule application (multiplying by $\omega$).

4.  **Mixing up radians and degrees:**
    *   **Mistake:** Performing calculations with angles in degrees when the trigonometric functions (especially in calculus) expect radians, or vice-versa. For example, $\cos(30)$ vs. $\cos(\pi/6)$.
    *   **Why it happens:** Calculators can be set to either mode, and problems sometimes implicitly assume radians. The angular frequency $\omega$ is always in radians/second.
    *   **Correction:** Always work in radians for SHM problems involving $\omega t$. Ensure your calculator is in radian mode for trigonometric functions unless explicitly told otherwise.

5.  **Assuming $A$ is always $x(0)$:**
    *   **Mistake:** Believing that the amplitude $A$ is simply the initial position $x(0)$. This is only true if the object is released from rest ($v(0)=0$) at $t=0$.
    *   **Why it happens:** This is a common special case, so students incorrectly generalize it.
    *   **Correction:** Remember that $A = \sqrt{x(0)^2 + (v(0)/\omega)^2}$. If $v(0) \ne 0$, then $A$ will be larger than $|x(0)|$.

6.  **Incorrectly handling the argument of the trigonometric function:**
    *   **Mistake:** Forgetting to apply the chain rule when differentiating $\cos(\omega t + \phi)$, or misinterpreting the entire term $(\omega t + \phi)$ as just an angle without considering its dependence on time.
    *   **Why it happens:** The argument is a composite function, and the chain rule is often overlooked or misapplied.
    *   **Correction:** Treat $(\omega t + \phi)$ as $u$, so $\frac{d}{dt} \cos(u) = -\sin(u) \frac{du}{dt}$. Here, $\frac{du}{dt} = \omega$.

## 7. Textbook-precise explanation

Simple Harmonic Motion (SHM) describes a specific type of oscillatory motion where the restoring force is directly proportional to the displacement from equilibrium and acts in the direction opposite to the displacement. This leads to a characteristic second-order linear ordinary differential equation.

Consider a particle of mass $m$ undergoing one-dimensional motion along the $x$-axis. If the net force acting on the particle is given by Hooke's Law, $F_x = -kx$, where $k$ is a positive spring constant and $x$ is the displacement from equilibrium, then by Newton's Second Law ($F_x = m a_x$), we have:

$$m \frac{d^2x}{dt^2} = -kx$$

Rearranging this equation yields the canonical differential equation for Simple Harmonic Motion:

$$\frac{d^2x}{dt^2} + \frac{k}{m}x = 0$$

To simplify, we define the angular frequency squared as $\omega^2 = \frac{k}{m}$. Note that $\omega$ must have units of $\text{rad/s}$ (or $\text{s}^{-1}$) for dimensional consistency. Substituting this into the differential equation gives:

$$\frac{d^2x}{dt^2} + \omega^2 x = 0 \quad (*)$$

This is a homogeneous second-order linear ordinary differential equation with constant coefficients. We seek a function $x(t)$ whose second derivative is proportional to its negative self. Sinusoidal functions possess this property.

A general solution to this differential equation can be expressed in several equivalent forms. One common and physically intuitive form is:

$$x(t) = A \cos(\omega t + \phi)$$

where:
*   $A$ is the **amplitude**, representing the maximum displacement from equilibrium. It is a non-negative constant ($A \ge 0$) determined by the initial conditions.
*   $\omega = \sqrt{k/m}$ is the **angular frequency** of the oscillation, determined by the physical properties of the system ($k$ and $m$). It has units of radians per second (rad/s). The period of oscillation is $T = 2\pi/\omega$, and the frequency is $f = \omega/(2\pi)$.
*   $t$ is time.
*   $\phi$ is the **phase constant** (or initial phase), an angle (in radians) that determines the initial state of the oscillation at $t=0$. It is also determined by the initial conditions.

To verify this solution, we take its first and second derivatives with respect to time:
$$v(t) = \frac{dx}{dt} = \frac{d}{dt}[A \cos(\omega t + \phi)] = -A\omega \sin(\omega t + \phi)$$
$$a(t) = \frac{d^2x}{dt^2} = \frac{d}{dt}[-A\omega \sin(\omega t + \phi)] = -A\omega^2 \cos(\omega t + \phi)$$

Substituting $x(t)$ and $\frac{d^2x}{dt^2}$ back into the differential equation $(*)$:
$$(-A\omega^2 \cos(\omega t + \phi)) + \omega^2 (A \cos(\omega t + \phi)) = 0$$
$$-A\omega^2 \cos(\omega t + \phi) + A\omega^2 \cos(\omega t + \phi) = 0$$
$$0 = 0$$
Since this identity holds for all $t$, the proposed function $x(t) = A \cos(\omega t + \phi)$ is indeed a valid solution to the Simple Harmonic Motion differential equation.

The constants $A$ and $\phi$ are uniquely determined by the initial conditions, typically the position $x_0$ and velocity $v_0$ at $t=0$:
$x(0) = x_0 \implies A \cos(\phi) = x_0$
$v(0) = v_0 \implies -A\omega \sin(\phi) = v_0$

From these, $A$ can be found as $A = \sqrt{x_0^2 + (v_0/\omega)^2}$, and $\phi$ can be found using $\tan(\phi) = -v_0/(\omega x_0)$, carefully considering the signs of $x_0$ and $v_0$ to place $\phi$ in the correct quadrant.

Another common form of the general solution is $x(t) = A \sin(\omega t + \phi')$, where $\phi'$ is a different phase constant related to $\phi$ by $\phi' = \phi + \pi/2$. A third form is $x(t) = C_1 \cos(\omega t) + C_2 \sin(\omega t)$, where $C_1 = A \cos(\phi)$ and $C_2 = -A \sin(\phi)$. All forms are mathematically equivalent and describe the same physical motion.

*Reference: Serway & Jewett, Physics for Scientists and Engineers, 10e, Chapter 15, §15.2-15.3*

## 8. ASCII diagrams

Here's an ASCII diagram representing a mass-spring system undergoing SHM.

```text
       Equilibrium Position (x=0)
       |
       |
       V
  +----|----+
  |         |
--|--[MASS]--|--  <-- Spring (unstretched/uncompressed at x=0)
  |         |
  +----|----+
       |
       |
       |      <-- Direction of motion (oscillating)
       |
       |  x=A (Max Positive Displacement)
       |  +---------------------+
       |  |                     |
       |  |                     |
       |  |                     |
       |  |                     |
       |  |                     |
       |  +---------------------+
       |  x=-A (Max Negative Displacement)
       |
       |
       |
       |
       |
       |
       |
       |
       |
       |
       |
       |
       |
       |
       +---------------------------------------------> x-axis (position)

```
**Description of the Figure:**
The diagram illustrates a horizontal mass-spring system.
*   **x-axis:** Represents the position of the mass, with the equilibrium position (where the spring is neither stretched nor compressed, and net force is zero) marked as $x=0$.
*   **Spring:** Shown attached to a wall on the left and the mass on the right.
*   **MASS:** The block undergoing oscillation.
*   **Equilibrium Position (x=0):** The central point around which the mass oscillates.
*   **x=A (Max Positive Displacement):** The farthest point the mass moves to the right from equilibrium. This is the positive amplitude.
*   **x=-A (Max Negative Displacement):** The farthest point the mass moves to the left from equilibrium. This is the negative amplitude.
*   **Direction of motion:** Indicated by a double-headed arrow, showing the mass oscillates back and forth between $x=A$ and $x=-A$.

This setup is ideal for visualizing the displacement $x(t)$ from the equilibrium position.

## 9. Memory technique — never forget this

### 1. Specific Mnemonic or Visual Hook

**Mnemonic:** "**A**ll **C**ats **O**ften **S**leep **P**eacefully" for the components of the equation $x = A \cos(\omega t + \phi)$.
*   **A** = Amplitude
*   **C** = Cosine (the function)
*   **O** = Omega (angular frequency)
*   **S** = Time (t)
*   **P** = Phi (phase constant)

**Visual Hook:** Imagine a **spring** attached to a **cat**. The cat is pulled back (Amplitude A) and released. It bounces back and forth. The **speed** of its bounce is determined by how "springy" the spring is and how "heavy" the cat is ($\omega = \sqrt{k/m}$). Where the cat **starts** its bounce (pulled back, pushed, or released from middle) determines its "peaceful" initial state ($\phi$). The "cosine" part is the smooth, wave-like motion of the cat.

### 2. The 1-3 Formulas/Facts They MUST Overlearn

1.  **The Position Equation:**
    $$x(t) = A \cos(\omega t + \phi)$$
    This is the fundamental solution. Memorize it perfectly.

2.  **The Angular Frequency:**
    $$\omega = \sqrt{\frac{k}{m}}$$
    This connects the system's physical properties ($k$ and $m$) to its oscillatory behavior ($\omega$).

3.  **The SHM Differential Equation:**
    $$\frac{d^2x}{dt^2} + \omega^2 x = 0$$
    This is the governing equation; if you forget the solution, you can always derive it from here.

### 3. Spaced-Repetition Schedule

To truly ingrain this knowledge, commit to the following review schedule:
*   **Day 1:** Immediately after this lesson.
*   **Day 3:** Review again.
*   **Day 7:** Review again.
*   **Day 16:** Review again.
*   **Day 35:** Final review for this cycle.
During each review, try to re-derive the solution and work through at least one example without looking at your notes.

### 4. The First-Principles Re-derivation Pathway

If you ever forget the formula $x = A \cos(\omega t + \phi)$, you can always rebuild it from fundamental principles:

1.  **Start with Hooke's Law:** The restoring force in SHM is $F = -kx$. (This defines the *nature* of SHM).
2.  **Apply Newton's Second Law:** $F = ma$. Since $a = \frac{d^2x}{dt^2}$, equate these: $m \frac{d^2x}{dt^2} = -kx$.
3.  **Form the Differential Equation:** Rearrange to $\frac{d^2x}{dt^2} + \frac{k}{m}x = 0$.
4.  **Define Angular Frequency:** Recognize that $\frac{k}{m}$ is a constant, so define $\omega^2 = \frac{k}{m}$, giving $\frac{d^2x}{dt^2} + \omega^2 x = 0$. (This is the characteristic SHM differential equation).
5.  **Guess a Solution Form:** Ask yourself: "What function, when differentiated twice, returns itself but with a negative sign and a constant factor?" The answer is sinusoidal functions (sine or cosine). Propose $x(t) = A \cos(\omega t + \phi)$. (Or $A \sin(\omega t + \phi')$, or $C_1 \cos(\omega t) + C_2 \sin(\omega t)$).
6.  **Differentiate Twice:**
    *   $v(t) = \frac{dx}{dt} = -A\omega \sin(\omega t + \phi)$
    *   $a(t) = \frac{d^2x}{dt^2} = -A\omega^2 \cos(\omega t + \phi)$
7.  **Substitute and Verify:** Plug $x(t)$ and $a(t)$ back into the differential equation $\frac{d^2x}{dt^2} + \omega^2 x = 0$. You'll find that $-A\omega^2 \cos(\omega t + \phi) + \omega^2 (A \cos(\omega t + \phi)) = 0$, which simplifies to $0=0$. This verifies the solution.
8.  **Understand the Constants:** Recall that $A$ and $\phi$ are determined by initial conditions ($x(0)$ and $v(0)$), while $\omega$ is determined by the system's properties ($k$ and $m$).

This pathway ensures that even if you forget the exact formula, you can reconstruct it logically from fundamental physical laws and mathematical properties.

## 10. Connections — what this leads to

Understanding the solution to the SHM differential equation is a cornerstone for many advanced topics in physics and engineering. It's not just an isolated concept; it's a fundamental building block.

1.  **Damped Oscillations:** The SHM solution assumes no energy loss. In reality, friction or air resistance always exist. This leads to *damped oscillations*, where the amplitude $A$ decreases over time. The differential equation gains a damping term ($-\gamma \frac{dx}{dt}$), and the solution becomes an exponentially decaying sinusoid, like $x(t) = A e^{-\beta t} \cos(\omega' t + \phi)$. This is critical for designing shock absorbers in cars or preventing excessive vibration in aircraft structures.

2.  **Forced Oscillations and Resonance:** What happens if you continuously push a swing? If the pushing frequency matches the swing's natural frequency ($\omega$), the amplitude can grow dramatically. This is *forced oscillation* and *resonance*. The differential equation gains an external driving force term ($F_0 \cos(\omega_d t)$). Understanding resonance is vital in structural engineering (avoiding bridge collapses), acoustics (designing musical instruments), and electrical engineering (tuning radio circuits).

3.  **Wave Equations:** The SHM equation describes the motion of a *single* particle. If you have many particles, each undergoing SHM and interacting with its neighbors, you get a *wave*. The wave equation (e.g., $\frac{\partial^2 y}{\partial t^2} = v^2 \frac{\partial^2 y}{\partial x^2}$) describes how these oscillations propagate through space. The solutions to wave equations are often sinusoidal functions, directly building on the SHM solution. This is fundamental to understanding sound, light, and seismic waves.

4.  **AC Circuits (RLC Circuits):** In electrical engineering, circuits containing resistors (R), inductors (L), and capacitors (C) can exhibit oscillatory behavior. The charge on a capacitor or current in an inductor in an RLC circuit follows a differential equation mathematically analogous to the SHM equation (or damped/forced SHM). Here, inductance $L$ is analogous to mass $m$, and $1/C$ (inverse capacitance) is analogous to spring constant $k$. This is crucial for designing filters, oscillators, and radio tuners.

5.  **Quantum Mechanics (Quantum Harmonic Oscillator):** One of the most important exactly solvable problems in quantum mechanics is the quantum harmonic oscillator. It describes the behavior of particles (like atoms in a molecule or quanta of light in a field) bound by a potential that resembles a spring. The solutions involve wave functions that are related to the classical SHM, demonstrating that even at the subatomic level, oscillatory behavior is fundamental. This is a cornerstone for understanding molecular vibrations, quantum field theory, and many other advanced quantum phenomena.

6.  **Signal Processing:** Many signals (audio, radio, images) can be decomposed into a sum of sinusoidal components (Fourier analysis). The ability to describe individual oscillations using $x = A \cos(\omega t + \phi)$ is the basis for understanding and manipulating these signals. This is critical in fields like telecommunications, medical imaging, and machine learning (e.g., in spectral analysis).

## 11. Self-check questions

1.  A mass-spring system has a spring constant $k = 200$ N/m and a mass $m = 2$ kg.
    a.  Calculate the angular frequency $\omega$.
    b.  If the mass is displaced by 0.15 m from equilibrium and given an initial velocity of 0.5 m/s towards the equilibrium, write down the complete equation for its position $x(t)$.

2.  A particle's motion is described by $x(t) = 0.3 \cos(5t - \pi/4)$ m.
    a.  What are the amplitude, angular frequency, and phase constant?
    b.  What is the particle's position and velocity at $t = \pi/10$ s?

3.  Prove that $x(t) = B \sin(\omega t + \phi')$ is also a valid solution to the SHM differential equation $\frac{d^2x}{dt^2} + \omega^2 x = 0$. Show all differentiation steps and substitution.

4.  An object undergoing SHM has a period of $T = 0.5$ s. At $t=0$, its position is $x(0) = -0.05$ m and its velocity is $v(0) = 0.6$ m/s. Determine the amplitude $A$ and phase constant $\phi$ for the equation $x(t) = A \cos(\omega t + \phi)$.

5.  Consider two particles undergoing SHM along the same line. Particle 1 is described by $x_1(t) = 0.2 \cos(3t)$ m. Particle 2 is described by $x_2(t) = 0.2 \sin(3t + \pi/2)$ m.
    a.  Are these particles moving in phase, out of phase, or is there a constant phase difference? If so, what is it?
    b.  At what time $t > 0$ do the two particles first have the same position?