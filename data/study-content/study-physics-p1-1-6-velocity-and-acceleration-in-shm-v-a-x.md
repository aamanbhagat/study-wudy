## 1. What it is — in plain English

Imagine a simple toy car attached to a spring, sliding back and forth on a frictionless table. This back-and-forth motion, where it keeps returning to a central point, is called Simple Harmonic Motion (SHM). When the car is exactly in the middle (its "equilibrium position"), it's moving the fastest. As it glides towards one end, it slows down, momentarily stops, and then speeds up again as it rushes back to the middle.

Now, think about its *velocity* (how fast it's going and in what direction) and its *acceleration* (how quickly its velocity is changing). When the car is at the very ends of its path, it stops for an instant, so its velocity is zero. But right at that moment, the spring is stretched or compressed the most, pulling it back with maximum force, meaning its *acceleration* is at its peak.

Conversely, when the car zips through the middle, its velocity is at its maximum. But at this exact point, the spring is neither stretched nor compressed, so there's no force pulling it, and its *acceleration* is zero. The formulas we're studying today, especially $v = \omega\sqrt{A^2-x^2}$, simply give us a way to calculate exactly how fast that car is moving at *any* specific point ($x$) in its journey, given its maximum stretch ($A$) and how quickly it oscillates ($\omega$).

In essence, these equations describe the "speed profile" and "force profile" of anything undergoing this fundamental type of rhythmic motion. They tell us that the speed is highest in the middle and zero at the edges, while the force (and thus acceleration) is highest at the edges and zero in the middle.

## 2. Why it matters — real-world applications

Understanding velocity and acceleration in Simple Harmonic Motion is not just an academic exercise; it's fundamental to analyzing and designing countless systems across various fields, especially in physics and engineering.

1.  **Aerospace Engineering & Rocket Science**:
    *   **Vibration Analysis**: Rocket engines, especially turbopumps, experience intense vibrations. Components within satellites and spacecraft also oscillate. Engineers use SHM principles to predict the velocity and acceleration of these vibrations, ensuring parts don't resonate destructively or fatigue prematurely. For example, during launch, the payload experiences specific vibration profiles; knowing the peak accelerations helps design structures that can withstand these stresses. Companies like SpaceX and Blue Origin meticulously model these dynamics.
    *   **Guidance and Control Systems**: Inertial Measurement Units (IMUs) in rockets and satellites often use micro-electromechanical systems (MEMS) accelerometers, which are essentially tiny masses on springs. Their displacement, velocity, and acceleration are measured to determine the vehicle's orientation and motion.

2.  **Seismology and Earthquake Engineering**:
    *   **Building Design**: When an earthquake strikes, buildings oscillate. Civil engineers use SHM models to predict the maximum velocity and acceleration experienced by different parts of a structure. This information is crucial for designing earthquake-resistant buildings that can sway without collapsing, ensuring they can absorb and dissipate seismic energy. The natural frequency of a building (related to $\omega$) is a critical parameter.
    *   **Seismographs**: These instruments, used to detect and record earthquakes, often rely on an inertial mass (a pendulum or spring-mass system) whose relative motion (displacement, velocity, acceleration) is measured.

3.  **Medical Imaging and Diagnostics**:
    *   **Ultrasound**: Medical ultrasound devices generate sound waves (oscillations) that travel through tissue. The velocity and acceleration of these waves as they reflect off different structures are used to create images. Understanding the underlying SHM allows for precise control of wave generation and interpretation of the reflected signals.
    *   **MRI Scanners**: While more complex, the principles of oscillating magnetic fields and the response of atomic nuclei (which can be modeled as tiny oscillating dipoles) underpin Magnetic Resonance Imaging. The rates of change (velocity, acceleration) of these fields and responses are key to image formation.

4.  **Acoustics and Music**:
    *   **Musical Instruments**: The vibration of guitar strings, drumheads, and air columns in wind instruments are all forms of SHM (or combinations thereof). The velocity and acceleration of these vibrations determine the sound produced—its pitch, timbre, and loudness. Engineers design instruments by carefully controlling these oscillatory properties.
    *   **Speaker Design**: Loudspeakers work by a diaphragm oscillating back and forth, creating sound waves. The velocity and acceleration of this diaphragm must be precisely controlled to reproduce sound accurately across different frequencies.

## 3. Prerequisites — what you must know first

Before diving deep into the velocity and acceleration of SHM, ensure you have a solid grasp of these foundational concepts:

*   **Simple Harmonic Motion (SHM)**: The definition of SHM as oscillatory motion where the restoring force is directly proportional to the displacement from equilibrium and acts in the opposite direction ($F = -kx$).
*   **Equilibrium Position**: The central point where the net force on the oscillating object is zero.
*   **Displacement ($x$)**: The instantaneous position of the oscillating object relative to its equilibrium position.
*   **Amplitude ($A$)**: The maximum displacement from the equilibrium position. It's the furthest the object moves from the center.
*   **Period ($T$)**: The time it takes for one complete oscillation (one full cycle).
*   **Frequency ($f$)**: The number of complete oscillations per unit time ($f = 1/T$).
*   **Angular Frequency ($\omega$)**: A measure of how "fast" the oscillation occurs, related to frequency by $\omega = 2\pi f = 2\pi/T$. Its units are radians per second.
*   **Phase Constant ($\phi$)**: An initial angle that determines the starting position of the oscillation at $t=0$.
*   **Basic Calculus — Derivatives**: The concept of a derivative as the instantaneous rate of change. Specifically, knowing how to differentiate trigonometric functions (e.g., $\frac{d}{dt}(\cos(kt)) = -k\sin(kt)$ and $\frac{d}{dt}(\sin(kt)) = k\cos(kt)$) and the chain rule.
*   **Trigonometric Identities**: Primarily the Pythagorean identity: $\sin^2\theta + \cos^2\theta = 1$.
*   **Pythagorean Theorem**: For right-angled triangles ($a^2 + b^2 = c^2$), which underlies the trigonometric identity.
*   **Conservation of Mechanical Energy (Optional but helpful)**: The idea that in an ideal system, kinetic energy plus potential energy remains constant ($E_{total} = K + U$). This provides an alternative, insightful way to derive the velocity formula.

## 4. The core idea — step by step

The core idea is to understand how the position, velocity, and acceleration of an object undergoing SHM are interconnected and how they change over time and with respect to each other. We'll start from the most fundamental description of SHM and derive the relationships.

### Step 1: Starting with Displacement in SHM

*   **Plain-English Statement**: For any object in Simple Harmonic Motion, its position (or displacement) from the center point can be described by a smooth, repeating wave pattern, like a cosine or sine wave. We typically choose a cosine function if the motion starts at its maximum displacement at time $t=0$.

*   **Small Concrete Example**: Imagine a mass on a spring pulled out to its maximum stretch of 5 cm and then released. Its position as it oscillates will follow a cosine curve.

*   **Formal/Mathematical Version**: The general equation for displacement $x(t)$ as a function of time $t$ for SHM is:
    $$x(t) = A \cos(\omega t + \phi)$$
    Where:
    *   $x(t)$ is the displacement from equilibrium at time $t$.
    *   $A$ is the amplitude (maximum displacement).
    *   $\omega$ is the angular frequency.
    *   $\phi$ is the phase constant, determining the initial position at $t=0$.
    *   If the object is released from $x=+A$ at $t=0$, then $\phi=0$, and $x(t) = A \cos(\omega t)$. If released from $x=0$ moving in the positive direction, $\phi = -\pi/2$, and $x(t) = A \sin(\omega t)$. We'll usually assume $\phi=0$ for simplicity in derivations, but remember it's there.

*   **What Could Go Wrong**: Forgetting what each symbol means, or incorrectly assuming $\phi=0$ when the problem specifies a different starting condition. Always check the initial conditions.

### Step 2: Deriving Velocity from Displacement

*   **Plain-English Statement**: Velocity is simply how fast the displacement is changing with respect to time. If you know the formula for position, you can find the formula for velocity by taking its derivative with respect to time.

*   **Small Concrete Example**: If your position changes from 10 meters to 20 meters in 2 seconds, your average velocity is 5 meters per second. For SHM, we need the *instantaneous* velocity, which calculus provides.

*   **Formal/Mathematical Version**: To find the velocity $v(t)$, we differentiate the displacement function $x(t)$ with respect to time $t$:
    $$v(t) = \frac{dx}{dt}$$
    Given $x(t) = A \cos(\omega t + \phi)$, we apply the chain rule:
    $$\frac{dx}{dt} = \frac{d}{dt} [A \cos(\omega t + \phi)]$$
    $$v(t) = -A\omega \sin(\omega t + \phi)$$
    The maximum speed, $v_{max}$, occurs when $\sin(\omega t + \phi) = \pm 1$, so $v_{max} = A\omega$.

*   **What Could Go Wrong**: Forgetting the negative sign that comes from differentiating $\cos(\theta)$ to $-\sin(\theta)$. Forgetting the $\omega$ factor that comes out due to the chain rule (differentiating $\omega t + \phi$).

### Step 3: Relating Velocity to Displacement (The Key Formula)

*   **Plain-English Statement**: Often, we don't care *when* an object in SHM is at a certain point, but rather *how fast* it's moving *at that point*. This means we want velocity as a function of displacement ($x$), not time ($t$). We can achieve this by using a trigonometric identity to eliminate the time variable.

*   **Small Concrete Example**: Imagine you see a pendulum bob at a certain height. You want to know its speed *at that height*, without needing a stopwatch.

*   **Formal/Mathematical Version**: We have:
    1.  $x(t) = A \cos(\omega t + \phi) \quad \implies \cos(\omega t + \phi) = \frac{x}{A}$
    2.  $v(t) = -A\omega \sin(\omega t + \phi) \quad \implies \sin(\omega t + \phi) = -\frac{v}{A\omega}$

    Now, we use the fundamental trigonometric identity $\sin^2\theta + \cos^2\theta = 1$. Let $\theta = (\omega t + \phi)$:
    $$\left(-\frac{v}{A\omega}\right)^2 + \left(\frac{x}{A}\right)^2 = 1$$
    $$\frac{v^2}{A^2\omega^2} + \frac{x^2}{A^2} = 1$$
    Now, we solve for $v$:
    $$\frac{v^2}{A^2\omega^2} = 1 - \frac{x^2}{A^2}$$
    $$\frac{v^2}{A^2\omega^2} = \frac{A^2 - x^2}{A^2}$$
    $$v^2 = \omega^2 (A^2 - x^2)$$
    Taking the square root of both sides:
    $$v = \pm \omega \sqrt{A^2 - x^2}$$
    This is the crucial formula. The $\pm$ sign indicates the direction of motion: positive if moving in the positive $x$ direction, negative if moving in the negative $x$ direction. The speed (magnitude of velocity) is $|v| = \omega \sqrt{A^2 - x^2}$.

*   **What Could Go Wrong**: Algebraic errors when rearranging the equation. Forgetting the $\pm$ sign, which indicates that for any given displacement $x$ (other than $x=\pm A$), the object could be moving in either direction. Not recognizing that $v_{max}$ occurs when $x=0$, giving $v_{max} = \omega \sqrt{A^2 - 0^2} = \omega A$.

### Step 4: Deriving Acceleration from Velocity

*   **Plain-English Statement**: Acceleration is how fast the velocity is changing with respect to time. Just as we derived velocity from displacement, we can derive acceleration from velocity by taking its derivative.

*   **Small Concrete Example**: If a car's speed is increasing, it has positive acceleration. If it's slowing down, it has negative acceleration (deceleration). For SHM, acceleration is constantly changing, even reversing direction.

*   **Formal/Mathematical Version**: To find the acceleration $a(t)$, we differentiate the velocity function $v(t)$ with respect to time $t$:
    $$a(t) = \frac{dv}{dt}$$
    Given $v(t) = -A\omega \sin(\omega t + \phi)$, we apply the chain rule again:
    $$\frac{dv}{dt} = \frac{d}{dt} [-A\omega \sin(\omega t + \phi)]$$
    $$a(t) = -A\omega^2 \cos(\omega t + \phi)$$
    The maximum acceleration, $a_{max}$, occurs when $\cos(\omega t + \phi) = \pm 1$, so $a_{max} = A\omega^2$.

*   **What Could Go Wrong**: Forgetting the $\omega$ factor again from the chain rule, resulting in $\omega^2$. Sign errors (differentiating $-\sin(\theta)$ gives $-\cos(\theta)$).

### Step 5: Relating Acceleration to Displacement

*   **Plain-English Statement**: This is a defining characteristic of SHM: the acceleration is always directly proportional to the displacement from equilibrium and always points in the opposite direction. This is essentially a restatement of Hooke's Law ($F=-kx$) combined with Newton's Second Law ($F=ma$).

*   **Small Concrete Example**: When the spring is stretched far ($x$ is large positive), it pulls back hard (large negative acceleration). When it's compressed far ($x$ is large negative), it pushes back hard (large positive acceleration). When it's in the middle ($x=0$), there's no force, so no acceleration.

*   **Formal/Mathematical Version**: We have the acceleration function:
    $$a(t) = -A\omega^2 \cos(\omega t + \phi)$$
    From Step 1, we know that $x(t) = A \cos(\omega t + \phi)$.
    We can substitute $x(t)$ directly into the acceleration equation:
    $$a(t) = -\omega^2 [A \cos(\omega t + \phi)]$$
    $$a(t) = -\omega^2 x(t)$$
    This is the defining equation for SHM. The negative sign signifies that the acceleration is always directed opposite to the displacement. If $x$ is positive, $a$ is negative (pulling towards equilibrium). If $x$ is negative, $a$ is positive (pushing towards equilibrium).

*   **What Could Go Wrong**: Forgetting the negative sign. Misinterpreting the meaning of the negative sign (it means "restoring," not just "slowing down").

### Step 6: Understanding the Physical Significance of Signs and Magnitudes

*   **Plain-English Statement**: The signs in our formulas tell us direction. The magnitudes tell us how strong the effect is. Velocity is positive when moving right, negative when moving left. Acceleration is positive when the net force is right, negative when the net force is left. In SHM, velocity is maximum at the center and zero at the ends, while acceleration is maximum at the ends and zero at the center.

*   **Small Concrete Example**: If our spring-mass system is moving right ($v>0$) but is past equilibrium ($x>0$), the spring is pulling left ($a<0$), causing it to slow down. If it's moving left ($v<0$) and is to the left of equilibrium ($x<0$), the spring is pushing right ($a>0$), causing it to slow down (or speed up if it's moving towards equilibrium).

*   **Formal/Mathematical Version**:
    *   **Velocity**: $v = \pm \omega \sqrt{A^2 - x^2}$
        *   At $x=0$ (equilibrium): $v = \pm \omega \sqrt{A^2 - 0^2} = \pm A\omega$. This is the maximum speed.
        *   At $x=\pm A$ (maximum displacement): $v = \pm \omega \sqrt{A^2 - A^2} = 0$. Velocity is zero at the turning points.
    *   **Acceleration**: $a = -\omega^2 x$
        *   At $x=0$ (equilibrium): $a = -\omega^2 (0) = 0$. Acceleration is zero at equilibrium.
        *   At $x=+A$: $a = -\omega^2 A$. This is maximum negative acceleration.
        *   At $x=-A$: $a = -\omega^2 (-A) = +\omega^2 A$. This is maximum positive acceleration.
    The relationship between $x$, $v$, and $a$ is a phase shift:
    *   $x(t) = A \cos(\omega t + \phi)$
    *   $v(t) = -A\omega \sin(\omega t + \phi) = A\omega \cos(\omega t + \phi + \pi/2)$ (velocity leads displacement by $\pi/2$ or 90 degrees)
    *   $a(t) = -A\omega^2 \cos(\omega t + \phi) = A\omega^2 \cos(\omega t + \phi + \pi)$ (acceleration leads displacement by $\pi$ or 180 degrees, meaning it's always opposite)

*   **What Could Go Wrong**: Not understanding the phase relationships, or thinking that maximum velocity implies maximum acceleration (they are actually out of phase by 90 degrees).

## 5. Worked examples — multiple, with every step shown

### Example 1: Basic Velocity Calculation at Equilibrium

**Problem Statement**: A mass attached to a spring oscillates with an amplitude of $A = 0.15 \text{ m}$ and an angular frequency of $\omega = 5.0 \text{ rad/s}$. What is the magnitude of its velocity when it passes through the equilibrium position ($x=0$)?

**Given**:
*   Amplitude, $A = 0.15 \text{ m}$
*   Angular frequency, $\omega = 5.0 \text{ rad/s}$
*   Displacement, $x = 0 \text{ m}$ (equilibrium position)

**Wanted**: Magnitude of velocity, $|v|$.

**Solution**:

1.  **Recall the velocity formula for SHM**:
    $$v = \pm \omega \sqrt{A^2 - x^2}$$
    This formula allows us to calculate the velocity at any given displacement $x$.

2.  **Substitute the given values into the formula**:
    $$v = \pm (5.0 \text{ rad/s}) \sqrt{(0.15 \text{ m})^2 - (0 \text{ m})^2}$$
    We are plugging in the numerical values for $\omega$, $A$, and $x$.

3.  **Simplify the expression inside the square root**:
    $$v = \pm (5.0 \text{ rad/s}) \sqrt{0.0225 \text{ m}^2 - 0 \text{ m}^2}$$
    $$(0.15)^2 = 0.0225$$

4.  **Further simplify the square root**:
    $$v = \pm (5.0 \text{ rad/s}) \sqrt{0.0225 \text{ m}^2}$$
    $$v = \pm (5.0 \text{ rad/s}) (0.15 \text{ m})$$
    The square root of $0.0225$ is $0.15$.

5.  **Calculate the final velocity**:
    $$v = \pm 0.75 \text{ m/s}$$
    Multiplying the angular frequency by the amplitude gives the maximum speed.

6.  **State the magnitude of velocity**:
    The problem asks for the *magnitude* of the velocity, so we take the positive value.
    $$|v| = \mathbf{0.75 \text{ m/s}}$$
    This is the maximum speed of the oscillating mass.

**Reflection**: This example was straightforward because we calculated the velocity at the equilibrium position ($x=0$), which simplifies the square root term significantly ($A^2 - 0^2 = A^2$). It reinforces that maximum speed occurs at equilibrium.

---

### Example 2: Velocity and Acceleration at a Specific Displacement

**Problem Statement**: A particle undergoes SHM with an amplitude of $A = 0.20 \text{ m}$ and a period of $T = 1.5 \text{ s}$. Find its velocity and acceleration when its displacement is $x = 0.10 \text{ m}$.

**Given**:
*   Amplitude, $A = 0.20 \text{ m}$
*   Period, $T = 1.5 \text{ s}$
*   Displacement, $x = 0.10 \text{ m}$

**Wanted**: Velocity, $v$, and acceleration, $a$, at $x=0.10 \text{ m}$.

**Solution**:

**Part A: Calculate Angular Frequency ($\omega$) first**

1.  **Recall the relationship between period and angular frequency**:
    $$\omega = \frac{2\pi}{T}$$
    Angular frequency is needed for both velocity and acceleration calculations.

2.  **Substitute the given period**:
    $$\omega = \frac{2\pi}{1.5 \text{ s}}$$
    Plugging in the value for $T$.

3.  **Calculate $\omega$**:
    $$\omega \approx 4.1888 \text{ rad/s}$$
    Using $\pi \approx 3.14159$. Keep extra decimal places for intermediate calculations to maintain precision.

**Part B: Calculate Velocity ($v$)**

1.  **Recall the velocity formula for SHM**:
    $$v = \pm \omega \sqrt{A^2 - x^2}$$
    This is the formula to find velocity at a given displacement.

2.  **Substitute the calculated $\omega$ and given $A$ and $x$**:
    $$v = \pm (4.1888 \text{ rad/s}) \sqrt{(0.20 \text{ m})^2 - (0.10 \text{ m})^2}$$
    Plugging in the values.

3.  **Calculate the squares inside the square root**:
    $$v = \pm (4.1888 \text{ rad/s}) \sqrt{0.0400 \text{ m}^2 - 0.0100 \text{ m}^2}$$
    $$(0.20)^2 = 0.0400$$
    $$(0.10)^2 = 0.0100$$

4.  **Subtract the terms inside the square root**:
    $$v = \pm (4.1888 \text{ rad/s}) \sqrt{0.0300 \text{ m}^2}$$
    $$0.0400 - 0.0100 = 0.0300$$

5.  **Calculate the square root**:
    $$v = \pm (4.1888 \text{ rad/s}) (0.173205 \text{ m})$$
    $$\sqrt{0.0300} \approx 0.173205$$

6.  **Multiply to find the velocity**:
    $$v \approx \pm 0.725 \text{ m/s}$$
    Multiplying the two values.

7.  **Final Answer for Velocity**:
    $$v = \mathbf{\pm 0.73 \text{ m/s (to 2 significant figures)}}$$
    The $\pm$ sign indicates the particle can be moving in either direction at this displacement.

**Part C: Calculate Acceleration ($a$)**

1.  **Recall the acceleration formula for SHM**:
    $$a = -\omega^2 x$$
    This formula directly relates acceleration to displacement and angular frequency.

2.  **Substitute the calculated $\omega$ and given $x$**:
    $$a = -(4.1888 \text{ rad/s})^2 (0.10 \text{ m})$$
    Plugging in the values.

3.  **Square the angular frequency**:
    $$a = -(17.546 \text{ rad}^2/\text{s}^2) (0.10 \text{ m})$$
    $$(4.1888)^2 \approx 17.546$$

4.  **Multiply to find the acceleration**:
    $$a = -1.7546 \text{ m/s}^2$$
    Multiplying the squared angular frequency by the displacement.

5.  **Final Answer for Acceleration**:
    $$a = \mathbf{-1.75 \text{ m/s}^2 \text{ (to 3 significant figures)}}$$
    The negative sign indicates that the acceleration is directed towards the equilibrium position (opposite to the positive displacement $x$).

**Reflection**: This example required an initial step to calculate $\omega$ from $T$, a common scenario. It also highlighted the importance of retaining precision in intermediate calculations and correctly interpreting the $\pm$ sign for velocity and the negative sign for acceleration.

---

### Example 3: Maximum Velocity and Acceleration for a Spring-Mass System

**Problem Statement**: A $0.50 \text{ kg}$ mass is attached to a spring with a spring constant of $k = 200 \text{ N/m}$. The mass is pulled $10 \text{ cm}$ from its equilibrium position and released. Determine the maximum speed of the mass and its maximum acceleration.

**Given**:
*   Mass, $m = 0.50 \text{ kg}$
*   Spring constant, $k = 200 \text{ N/m}$
*   Amplitude, $A = 10 \text{ cm} = 0.10 \text{ m}$ (since it's pulled and released from this point)

**Wanted**: Maximum speed ($v_{max}$) and maximum acceleration ($a_{max}$).

**Solution**:

**Part A: Calculate Angular Frequency ($\omega$) first**

1.  **Recall the formula for angular frequency of a spring-mass system**:
    $$\omega = \sqrt{\frac{k}{m}}$$
    This is specific to a mass on a spring, relating the system's physical properties to its oscillation rate.

2.  **Substitute the given values for $k$ and $m$**:
    $$\omega = \sqrt{\frac{200 \text{ N/m}}{0.50 \text{ kg}}}$$
    Plugging in the values.

3.  **Calculate the value inside the square root**:
    $$\omega = \sqrt{400 \text{ s}^{-2}}$$
    $$200 / 0.50 = 400$$
    The units $\text{N/m} \cdot 1/\text{kg} = (\text{kg} \cdot \text{m/s}^2)/\text{m} \cdot 1/\text{kg} = 1/\text{s}^2$.

4.  **Calculate $\omega$**:
    $$\omega = 20 \text{ rad/s}$$
    The square root of 400 is 20.

**Part B: Calculate Maximum Speed ($v_{max}$)**

1.  **Recall the formula for maximum speed in SHM**:
    $$v_{max} = A\omega$$
    Maximum speed occurs when $x=0$, simplifying $v = \omega \sqrt{A^2 - 0^2} = \omega A$.

2.  **Substitute the given $A$ and calculated $\omega$**:
    $$v_{max} = (0.10 \text{ m}) (20 \text{ rad/s})$$
    Plugging in the values.

3.  **Calculate $v_{max}$**:
    $$v_{max} = 2.0 \text{ m/s}$$
    Multiplying the amplitude by the angular frequency.

4.  **Final Answer for Maximum Speed**:
    $$v_{max} = \mathbf{2.0 \text{ m/s}}$$

**Part C: Calculate Maximum Acceleration ($a_{max}$)**

1.  **Recall the formula for maximum acceleration in SHM**:
    $$a_{max} = A\omega^2$$
    Maximum acceleration occurs at $x=\pm A$, simplifying $a = -\omega^2 (\pm A) = \mp A\omega^2$. We are interested in the magnitude.

2.  **Substitute the given $A$ and calculated $\omega$**:
    $$a_{max} = (0.10 \text{ m}) (20 \text{ rad/s})^2$$
    Plugging in the values.

3.  **Square the angular frequency**:
    $$a_{max} = (0.10 \text{ m}) (400 \text{ rad}^2/\text{s}^2)$$
    $$(20)^2 = 400$$

4.  **Calculate $a_{max}$**:
    $$a_{max} = 40 \text{ m/s}^2$$
    Multiplying the amplitude by the squared angular frequency.

5.  **Final Answer for Maximum Acceleration**:
    $$a_{max} = \mathbf{40 \text{ m/s}^2}$$

**Reflection**: This example introduced the calculation of angular frequency from physical properties ($k$ and $m$), which is a common first step in many SHM problems. It also clearly distinguished between calculating velocity/acceleration at a specific point versus finding their maximum values.

---

### Example 4: Finding Angular Frequency from Velocity at a Specific Displacement, then Acceleration

**Problem Statement**: An object in SHM has an amplitude of $A = 0.080 \text{ m}$. When its displacement from equilibrium is $x = 0.040 \text{ m}$, its speed is $v = 0.30 \text{ m/s}$.
a) Determine the angular frequency ($\omega$) of the oscillation.
b) What is the acceleration of the object at this specific displacement ($x = 0.040 \text{ m}$)?

**Given**:
*   Amplitude, $A = 0.080 \text{ m}$
*   Displacement, $x = 0.040 \text{ m}$
*   Speed (magnitude of velocity), $|v| = 0.30 \text{ m/s}$ at $x=0.040 \text{ m}$

**Wanted**:
a) Angular frequency, $\omega$.
b) Acceleration, $a$, at $x=0.040 \text{ m}$.

**Solution**:

**Part A: Determine Angular Frequency ($\omega$)**

1.  **Recall the velocity formula for SHM**:
    $$v = \pm \omega \sqrt{A^2 - x^2}$$
    We have $v$, $A$, and $x$, and we need to solve for $\omega$. We can use the magnitude of velocity, so we'll drop the $\pm$ for now.

2.  **Substitute the given values into the formula**:
    $$0.30 \text{ m/s} = \omega \sqrt{(0.080 \text{ m})^2 - (0.040 \text{ m})^2}$$
    Plugging in the numerical values.

3.  **Calculate the squares inside the square root**:
    $$0.30 \text{ m/s} = \omega \sqrt{0.0064 \text{ m}^2 - 0.0016 \text{ m}^2}$$
    $$(0.080)^2 = 0.0064$$
    $$(0.040)^2 = 0.0016$$

4.  **Subtract the terms inside the square root**:
    $$0.30 \text{ m/s} = \omega \sqrt{0.0048 \text{ m}^2}$$
    $$0.0064 - 0.0016 = 0.0048$$

5.  **Calculate the square root**:
    $$0.30 \text{ m/s} = \omega (0.06928 \text{ m})$$
    $$\sqrt{0.0048} \approx 0.06928$$

6.  **Solve for $\omega$**:
    $$\omega = \frac{0.30 \text{ m/s}}{0.06928 \text{ m}}$$
    Isolate $\omega$ by dividing both sides by $0.06928 \text{ m}$.

7.  **Calculate $\omega$**:
    $$\omega \approx 4.330 \text{ rad/s}$$

8.  **Final Answer for Angular Frequency**:
    $$\omega = \mathbf{4.3 \text{ rad/s (to 2 significant figures)}}$$

**Part B: Determine Acceleration ($a$) at $x = 0.040 \text{ m}$**

1.  **Recall the acceleration formula for SHM**:
    $$a = -\omega^2 x$$
    This formula directly relates acceleration to displacement and angular frequency.

2.  **Substitute the calculated $\omega$ and given $x$**:
    $$a = -(4.330 \text{ rad/s})^2 (0.040 \text{ m})$$
    Plugging in the values. Use the more precise value of $\omega$ from the previous step for accuracy.

3.  **Square the angular frequency**:
    $$a = -(18.74 \text{ rad}^2/\text{s}^2) (0.040 \text{ m})$$
    $$(4.330)^2 \approx 18.74$$

4.  **Multiply to find the acceleration**:
    $$a = -0.7496 \text{ m/s}^2$$
    Multiplying the squared angular frequency by the displacement.

5.  **Final Answer for Acceleration**:
    $$a = \mathbf{-0.75 \text{ m/s}^2 \text{ (to 2 significant figures)}}$$
    The negative sign indicates that the acceleration is directed towards the equilibrium position.

**Reflection**: This example demonstrates working backward to find $\omega$ when velocity, amplitude, and displacement are known. It then uses this derived $\omega$ to calculate acceleration, showing the interconnectedness of these SHM parameters. It also highlights the importance of using enough precision in intermediate steps.

## 6. Common mistakes and traps

1.  **Forgetting the $\pm$ sign for velocity**: The formula $v = \pm \omega \sqrt{A^2 - x^2}$ yields two possible velocities (same magnitude, opposite directions) for any given displacement $x$ (unless $x=\pm A$). Forgetting this implies the object only moves in one direction, which is incorrect for oscillation.
2.  **Confusing $x$ with $A$**: $A$ is the *maximum* displacement (amplitude), while $x$ is the *instantaneous* displacement. Students sometimes use $A$ where $x$ should be, or vice-versa, especially in the $\sqrt{A^2-x^2}$ term.
3.  **Using frequency ($f$) instead of angular frequency ($\omega$)**: The formulas $v = \omega \sqrt{A^2 - x^2}$ and $a = -\omega^2 x$ explicitly use angular frequency $\omega$ (in rad/s), not linear frequency $f$ (in Hz). Remember $\omega = 2\pi f$.
4.  **Sign errors in acceleration ($a = -\omega^2 x$)**: The negative sign is crucial; it signifies that the acceleration is always directed *opposite* to the displacement, acting as a restoring force. Omitting it implies acceleration is in the *same* direction as displacement, which would lead to runaway motion, not oscillation.
5.  **Incorrect units**: Always check units. Displacement and amplitude should be in meters (m), time in seconds (s), angular frequency in radians per second (rad/s), velocity in meters per second (m/s), and acceleration in meters per second squared (m/s$^2$).
6.  **Applying the formulas when motion isn't SHM**: These specific formulas are only valid for *Simple* Harmonic Motion. If the restoring force isn't perfectly linear ($F \propto -x$), or if there's significant damping or driving forces, these equations are approximations or entirely inapplicable.

## 7. Textbook-precise explanation

Simple Harmonic Motion (SHM) is a special type of periodic motion where the restoring force is directly proportional to the displacement from the equilibrium position and acts in the opposite direction. This condition is mathematically expressed by Hooke's Law, $F = -kx$, where $k$ is the spring constant. By Newton's Second Law, $F=ma$, we can write $ma = -kx$. Dividing by mass $m$, we obtain the differential equation characteristic of SHM:

$$\frac{d^2x}{dt^2} = -\frac{k}{m}x$$

Defining the angular frequency $\omega = \sqrt{k/m}$, this equation becomes:

$$\frac{d^2x}{dt^2} = -\omega^2 x$$

This second-order linear ordinary differential equation has a general solution for displacement $x(t)$ given by:

$$x(t) = A \cos(\omega t + \phi)$$

where $A$ is the amplitude (maximum displacement), $\omega$ is the angular frequency, and $\phi$ is the phase constant, determined by the initial conditions of the motion.

To find the instantaneous velocity $v(t)$, we differentiate $x(t)$ with respect to time:

$$v(t) = \frac{dx}{dt} = \frac{d}{dt}[A \cos(\omega t + \phi)]$$
$$v(t) = -A\omega \sin(\omega t + \phi)$$

To express velocity as a function of displacement $x$, we utilize the trigonometric identity $\sin^2\theta + \cos^2\theta = 1$. From $x(t)$, we have $\cos(\omega t + \phi) = x/A$. From $v(t)$, we have $\sin(\omega t + \phi) = -v/(A\omega)$. Substituting these into the identity:

$$\left(-\frac{v}{A\omega}\right)^2 + \left(\frac{x}{A}\right)^2 = 1$$
$$\frac{v^2}{A^2\omega^2} + \frac{x^2}{A^2} = 1$$
Multiplying by $A^2\omega^2$:
$$v^2 + \omega^2 x^2 = A^2\omega^2$$
$$v^2 = A^2\omega^2 - \omega^2 x^2$$
$$v^2 = \omega^2 (A^2 - x^2)$$
Taking the square root, we obtain the instantaneous velocity as a function of displacement:

$$v = \pm \omega \sqrt{A^2 - x^2}$$

The $\pm$ sign indicates that for a given displacement $x$, the object can be moving in either the positive or negative direction. The maximum speed, $v_{max}$, occurs at $x=0$, yielding $v_{max} = A\omega$.

To find the instantaneous acceleration $a(t)$, we differentiate $v(t)$ with respect to time:

$$a(t) = \frac{dv}{dt} = \frac{d}{dt}[-A\omega \sin(\omega t + \phi)]$$
$$a(t) = -A\omega^2 \cos(\omega t + \phi)$$

Recognizing that $x(t) = A \cos(\omega t + \phi)$, we can substitute $x(t)$ into the acceleration equation:

$$a(t) = -\omega^2 x(t)$$

This confirms that acceleration in SHM is directly proportional to the negative of the displacement, which is the defining characteristic we started with. The maximum acceleration, $a_{max}$, occurs at $x=\pm A$, yielding $a_{max} = A\omega^2$.

These derivations are standard in introductory physics texts. For example, see:
*   **Resnick, Halliday, Krane, *Physics, Vol 1*, 5th Ed., Chapter 15, "Oscillations"**
*   **Serway & Jewett, *Physics for Scientists and Engineers*, 9th Ed., Chapter 15, "Oscillatory Motion"**

## 8. ASCII diagrams

Here's a diagram illustrating a horizontal spring-mass system in SHM, showing displacement, velocity, and acceleration at key points.

```text
                                       <-- A -->
                                       <-- x -->
                                       
Equilibrium Position (x=0)
       |-------------------------------------------------------|
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |-------------------------------------------------------|
       |             |             |             |             |
       -A            -x            0             +x            +A
    (Left End)     (Mid-Left)  (Equil.)     (Mid-Right)    (Right End)

Scenario 1: Object at +A (Right End, momentarily stopped)
       |-------------------------------------------------------|
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |-------------------------------------------------------|
       -A            -x            0             +x            +A
                                                               [M]
                                                                v = 0
                                                                a = -ω²A (Max negative, pulling left)


Scenario 2: Object at 0 (Equilibrium, moving right)
       |-------------------------------------------------------|
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |-------------------------------------------------------|
       -A            -x            0             +x            +A
                                  [M]
                                  v = +Aω (Max positive, moving right)
                                  a = 0


Scenario 3: Object at -A (Left End, momentarily stopped)
       |-------------------------------------------------------|
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |-------------------------------------------------------|
       -A            -x            0             +x            +A
      [M]
       v = 0
       a = +ω²A (Max positive, pushing right)


Scenario 4: Object at +x (Mid-Right, moving left)
       |-------------------------------------------------------|
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |                                                       |
       |-------------------------------------------------------|
       -A            -x            0             +x            +A
                                                  [M]
                                                  v = -ω√(A²-x²) (Negative, moving left)
                                                  a = -ω²x (Negative, pulling left)
```

**Description for Redrawing**:
Imagine a horizontal line representing the path of a mass (M) attached to a spring, sliding without friction. The center of this line is the equilibrium position ($x=0$). The furthest points the mass reaches are $+A$ (maximum positive displacement) and $-A$ (maximum negative displacement).

1.  **At $x = +A$ (Right End)**: The mass is momentarily at rest, so its velocity ($v$) is $0$. The spring is maximally stretched, pulling the mass strongly towards the left. Thus, acceleration ($a$) is maximum negative, $a = -\omega^2 A$.
2.  **At $x = 0$ (Equilibrium Position)**: The mass is moving at its fastest speed. If moving right, $v = +A\omega$. If moving left, $v = -A\omega$. At this point, the spring is neither stretched nor compressed, so the net force is zero, and thus acceleration ($a$) is $0$.
3.  **At $x = -A$ (Left End)**: The mass is momentarily at rest, so its velocity ($v$) is $0$. The spring is maximally compressed, pushing the mass strongly towards the right. Thus, acceleration ($a$) is maximum positive, $a = +\omega^2 A$.
4.  **At an intermediate position $x$ (e.g., between $0$ and $+A$)**: The mass has a non-zero velocity, $v = \pm \omega \sqrt{A^2 - x^2}$. If $x$ is positive, the spring is stretched, pulling it left, so acceleration is negative, $a = -\omega^2 x$. The magnitude of velocity is less than $A\omega$, and the magnitude of acceleration is less than $A\omega^2$.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook**:
    *   **"V for Velocity, X for eXtreme"**: Velocity is *eXtreme* (maximum) at $x=0$ (equilibrium) and *zero* at the *eXtreme* ends ($x=\pm A$).
    *   **"A for Acceleration, A for Amplitude"**: Acceleration is *maximum* at the *Amplitude* positions ($x=\pm A$) and *zero* at $x=0$.
    *   **"Opposite Signs, Opposite Directions"**: In $a = -\omega^2 x$, the negative sign means acceleration is always trying to pull/push the object back to equilibrium, opposite to its displacement. If you're pulled right, you're displaced left.

2.  **Formulas/Facts to Overlearn**:
    *   **Displacement**: $x(t) = A \cos(\omega t + \phi)$ (or sine)
    *   **Velocity (position-dependent)**: $v = \pm \omega \sqrt{A^2 - x^2}$
    *   **Acceleration (position-dependent)**: $a = -\omega^2 x$
    *   **Maximum Speed**: $v_{max} = A\omega$ (occurs at $x=0$)
    *   **Maximum Acceleration**: $a_{max} = A\omega^2$ (occurs at $x=\pm A$)
    *   **Angular Frequency**: $\omega = 2\pi f = 2\pi/T$ (and for spring-mass: $\omega = \sqrt{k/m}$)

3.  **Spaced-Repetition Schedule**:
    *   **Day 1**: Review the derivations and formulas immediately after this lesson. Work through Example 1 and 2 again without looking at the solutions.
    *   **Day 3**: Review the core formulas and their physical meaning. Try to re-derive $v = \pm \omega \sqrt{A^2 - x^2}$ from $x(t)$. Work through Example 3.
    *   **Day 7**: Review all formulas. Mentally trace the relationship between $x, v, a$ at different points in the oscillation. Work through Example 4.
    *   **Day 16**: Attempt to write down all key formulas and their derivations from memory. Check against notes.
    *   **Day 35**: Revisit the concepts, derivations, and common mistakes. Ensure you can explain them clearly and concisely.

4.  **First-Principles Re-derivation Pathway**:
    If you ever forget the formulas, you can always rebuild them from the fundamental definition of SHM and calculus:

    1.  **Start with the definition of SHM**: The restoring force is proportional to displacement, $F = -kx$.
    2.  **Apply Newton's Second Law**: $F=ma \implies ma = -kx$.
    3.  **Express acceleration as a second derivative**: $m \frac{d^2x}{dt^2} = -kx$.
    4.  **Define angular frequency**: Let $\omega^2 = k/m$. This gives the defining differential equation: $\frac{d^2x}{dt^2} = -\omega^2 x$.
    5.  **Recall/Guess the solution for $x(t)$**: The solution to this differential equation is a sinusoidal function, $x(t) = A \cos(\omega t + \phi)$. (If you forget this, think about what function, when differentiated twice, gives back itself with a negative sign and a constant factor).
    6.  **Derive $v(t)$**: Differentiate $x(t)$ with respect to time: $v(t) = \frac{dx}{dt} = -A\omega \sin(\omega t + \phi)$.
    7.  **Derive $a(t)$**: Differentiate $v(t)$ with respect to time: $a(t) = \frac{dv}{dt} = -A\omega^2 \cos(\omega t + \phi)$.
    8.  **Relate $a(t)$ to $x(t)$**: Substitute $x(t)$ into $a(t)$ to get $a = -\omega^2 x$.
    9.  **Relate $v(t)$ to $x(t)$**: Use the trigonometric identity $\sin^2\theta + \cos^2\theta = 1$.
        *   From $x(t)$, get $\cos(\omega t + \phi) = x/A$.
        *   From $v(t)$, get $\sin(\omega t + \phi) = -v/(A\omega)$.
        *   Substitute these into the identity and solve for $v$: $v = \pm \omega \sqrt{A^2 - x^2}$.

    This pathway ensures that even if a specific formula slips your mind, you can reconstruct it logically.

## 10. Connections — what this leads to

Understanding velocity and acceleration in SHM is a cornerstone concept that unlocks many advanced topics in physics and engineering:

1.  **Damped Oscillations**: Real-world oscillations always lose energy due to friction or air resistance. This leads to *damped* SHM, where the amplitude decreases over time. The equations for velocity and acceleration become more complex, involving exponential decay terms.
2.  **Forced Oscillations and Resonance**: When an external periodic force acts on an oscillating system, it's called *forced* oscillation. If the driving frequency matches the system's natural frequency ($\omega$), resonance occurs, leading to dangerously large amplitudes, velocities, and accelerations. This is critical in structural engineering (bridges, buildings) and aerospace (engine vibrations).
3.  **Wave Equations**: SHM is the fundamental building block of waves. A wave can be thought of as many tiny particles undergoing SHM, with a phase difference between adjacent particles. The velocity and acceleration of these individual oscillating particles are described by these SHM principles, which then extend to the propagation velocity and acceleration of the wave itself. This applies to sound waves, light waves, and even quantum mechanical wave functions.
4.  **Quantum Harmonic Oscillator**: In quantum mechanics, the simple harmonic oscillator is one of the few exactly solvable models and is crucial for understanding molecular vibrations, lattice vibrations (phonons), and the quantization of electromagnetic fields (photons). The energy levels and behavior are directly analogous to the classical SHM, but with quantum constraints.
5.  **Orbital Mechanics (Small Oscillations)**: For small perturbations around stable equilibrium points (e.g., a spacecraft slightly off its stable orbit, or a planet perturbed by a small asteroid), the resulting motion can often be approximated as SHM. The concepts of natural frequency, velocity, and acceleration are vital for analyzing orbital stability.
6.  **AC Circuits (RLC Circuits)**: The behavior of alternating current (AC) circuits containing resistors (R), inductors (L), and capacitors (C) is mathematically analogous to damped, forced SHM. Current and voltage oscillate sinusoidally, and concepts like phase, amplitude, angular frequency, and resonance are directly transferable.
7.  **Fourier Analysis**: Any complex periodic motion can be decomposed into a sum of simple harmonic motions of different frequencies and amplitudes. Understanding SHM's velocity and acceleration is essential for analyzing these component waves in fields like signal processing, image compression, and quantum mechanics.
8.  **Mechanical Vibrations in Engineering**: From designing car suspension systems to preventing structural failure in bridges or aircraft wings, engineers constantly apply SHM principles to predict and mitigate vibrations.

## 11. Self-check questions

1.  A pendulum oscillates with an angular frequency of $2.5 \text{ rad/s}$ and an amplitude of $0.30 \text{ m}$. What is the magnitude of its velocity when its displacement is $0.15 \text{ m}$?
2.  An object in SHM has a maximum speed of $1.2 \text{ m/s}$ and a maximum acceleration of $4.8 \text{ m/s}^2$. What are its amplitude ($A$) and angular frequency ($\omega$)?
3.  A $0.2 \text{ kg}$ mass is attached to a spring and undergoes SHM with a period of $0.80 \text{ s}$. If its maximum displacement is $5.0 \text{ cm}$, find its speed when it is $2.5 \text{ cm}$ from equilibrium and its acceleration at that point.
4.  Derive the velocity formula $v = \pm \omega \sqrt{A^2 - x^2}$ starting from the general displacement equation $x(t) = A \sin(\omega t + \phi)$, showing all steps and trigonometric identities used.
5.  Consider a particle moving in a circle with constant angular speed $\omega$. Show that the projection of its position onto a diameter (which is SHM) has a velocity and acceleration consistent with the SHM formulas derived in this lesson.