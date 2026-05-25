## 1. What it is — in plain English

Imagine you have a simple toy car on a perfectly smooth, level table. You attach one end of a spring to the car and the other end to a fixed wall. If you pull the car a little bit away from the wall and then let go, what happens? The car will zoom back towards the wall, overshoot its original resting spot, slow down, stop, and then reverse direction, moving away from the wall. This back-and-forth motion, repeating over and over, is the essence of a spring-mass system.

At its heart, a spring-mass system is just a spring connected to an object (the "mass"). When you disturb this system from its natural resting position, the spring tries to pull or push the mass back to where it started. This "desire" of the spring to return to its original length is what causes the mass to move back and forth, or "oscillate."

Whether the spring is pulling the mass horizontally across a table or hanging it vertically from the ceiling, the core principle is the same: the spring exerts a force that depends on how much it's stretched or compressed, and this force drives the mass into a rhythmic, repeating motion. It's one of the most fundamental examples of something called "Simple Harmonic Motion," which is a fancy way of saying a very specific type of back-and-forth wiggle.

## 2. Why it matters — real-world applications

The simple spring-mass system is a foundational model in physics, explaining a vast array of phenomena and enabling critical engineering designs. Understanding it is key to grasping more complex oscillatory and wave behaviors.

1.  **Vehicle Suspension Systems:** Every car, truck, and motorcycle uses spring-mass systems (often combined with dampers, which we'll study later) to absorb shocks from the road. The vehicle body is the "mass," and the suspension springs connect it to the wheels. This system prevents road bumps from being fully transmitted to the passengers, ensuring a smooth ride. Companies like **Mercedes-Benz** and **Tesla** invest heavily in advanced suspension designs to optimize comfort and handling.
2.  **Seismic Design in Buildings and Bridges:** Engineers design structures to withstand earthquakes by modeling them as complex spring-mass systems. The building itself acts as a mass, and its structural elements (columns, beams) act as springs. Understanding the natural oscillation frequencies of a building helps engineers at firms like **ARUP** or **Skanska** design "base isolation" systems or tuned mass dampers to prevent resonance, where earthquake vibrations could amplify the building's sway and cause catastrophic failure.
3.  **Atomic and Molecular Vibrations:** At the microscopic level, atoms in a solid material are not static; they vibrate around their equilibrium positions. These vibrations can be modeled as tiny spring-mass systems, where the atoms are the masses and the interatomic forces act like springs. This understanding is crucial in materials science for predicting properties like specific heat, thermal expansion, and how materials interact with light, relevant in fields from **semiconductor manufacturing** to **drug discovery**.
4.  **Timing Mechanisms and Clocks:** Before the advent of quartz crystals, mechanical clocks relied on pendulums or balance wheels connected to springs (hairsprings) to keep time. These are essentially spring-mass systems designed to oscillate at a very precise, constant frequency. Even today, high-precision mechanical watches from companies like **Rolex** or **Patek Philippe** utilize meticulously crafted spring-mass escapement mechanisms for their timing accuracy.
5.  **Rocket Launch Dynamics:** During a rocket launch, the payload (e.g., a satellite) is often mounted on a flexible structure inside the fairing. The payload and its mounting system can behave like a spring-mass system. Understanding its natural frequencies is critical to avoid "pogo oscillation" – a dangerous self-excited vibration that can occur if the engine's thrust fluctuations resonate with the vehicle's structural modes. Engineers at **SpaceX** and **NASA** meticulously analyze these dynamics to ensure payload safety and structural integrity during the extreme forces of launch.

## 3. Prerequisites — what you must know first

Before diving into spring-mass systems, ensure you have a solid grasp of these fundamental concepts:

*   **Newton's Laws of Motion:** Especially the Second Law ($F=ma$), which states that the net force on an object is equal to its mass times its acceleration.
*   **Force:** A push or a pull, capable of causing a change in motion. You should understand its vector nature and units (Newtons, N).
*   **Displacement, Velocity, Acceleration:**
    *   **Displacement ($x$):** Change in position, a vector quantity.
    *   **Velocity ($v$):** Rate of change of displacement, $v = dx/dt$.
    *   **Acceleration ($a$):** Rate of change of velocity, $a = dv/dt = d^2x/dt^2$.
*   **Energy (Kinetic and Potential):**
    *   **Kinetic Energy ($KE$):** Energy of motion, $KE = \frac{1}{2}mv^2$.
    *   **Gravitational Potential Energy ($GPE$):** Energy due to position in a gravitational field, $GPE = mgh$.
    *   **Conservation of Mechanical Energy:** In the absence of non-conservative forces (like friction), the total mechanical energy ($KE + PE$) of a system remains constant.
*   **Basic Trigonometry:** Understanding sine, cosine, and their properties, especially how they describe periodic motion and phase shifts.
*   **Derivatives:** The ability to compute first and second derivatives of functions, particularly polynomial and trigonometric functions, as this is essential for relating position, velocity, and acceleration.
*   **Equilibrium:** A state where the net force on an object is zero, and it remains at rest or in constant velocity.

## 4. The core idea — step by step

Let's build up the understanding of a spring-mass system, starting with the fundamental force involved and progressing to its full dynamic behavior.

### Step 1: The Spring Force (Hooke's Law)

*   **Plain English:** Springs have a natural resting length. If you stretch a spring, it pulls back. If you compress it, it pushes back. The harder you stretch or compress it, the stronger this "restoring" force becomes.
*   **Small concrete example:** Imagine a Slinky. If it's at its natural length, it doesn't pull or push. Stretch it by 1 cm, and it pulls with a certain force. Stretch it by 2 cm, and it pulls with twice that force.
*   **Formal/mathematical version:** This relationship is known as Hooke's Law.
    $$F_s = -kx$$
    Where:
    *   $F_s$ is the spring force.
    *   $k$ is the spring constant, a measure of the spring's stiffness. A high $k$ means a stiff spring, a low $k$ means a soft spring. Its units are Newtons per meter (N/m).
    *   $x$ is the displacement (stretch or compression) of the spring from its equilibrium (natural) length.
    *   The negative sign indicates that the spring force is always a *restoring force*; it acts in the opposite direction to the displacement. If you stretch the spring ($x$ is positive), the force pulls it back (negative direction). If you compress it ($x$ is negative), the force pushes it out (positive direction).
*   **What could go wrong:** Forgetting the negative sign. Without it, the force would act *with* the displacement, causing the spring to stretch or compress indefinitely, which is physically impossible for a stable spring. Also, ensure $x$ is the displacement *from the natural length*, not from some arbitrary point.

### Step 2: Setting up the Horizontal Spring-Mass System

*   **Plain English:** We'll start with the simplest case: a mass sliding on a perfectly smooth (frictionless) horizontal surface, attached to a spring fixed to a wall. This setup isolates the spring force as the only horizontal force acting on the mass.
*   **Small concrete example:** A block of wood on an ice rink, tied to a spring. You pull the block 10 cm to the right and let go. It will slide back and forth.
*   **Formal/mathematical version:**
    1.  Define a coordinate system: Let the equilibrium position of the mass (where the spring is at its natural length and exerts no force) be $x=0$.
    2.  If the mass is displaced to position $x$, the spring exerts a force $F_s = -kx$.
    3.  Since the surface is frictionless, this is the *only* horizontal force acting on the mass.
    4.  Apply Newton's Second Law: $\sum F_x = ma_x$.
    $$F_s = ma$$
    $$-kx = ma$$
*   **What could go wrong:** Forgetting to define the equilibrium position as $x=0$. If $x=0$ is chosen elsewhere, the equation becomes more complex, even though the physics remains the same. Also, incorrectly including friction if the problem states it's frictionless.

### Step 3: The Equation of Motion (Horizontal)

*   **Plain English:** By combining Hooke's Law with Newton's Second Law, we get a mathematical description of how the mass's position changes over time. Since acceleration is the second derivative of position with respect to time, this will be a differential equation.
*   **Small concrete example:** If we know the mass and the spring constant, this equation tells us the "rules" for the block's movement. It's like the blueprint for its oscillation.
*   **Formal/mathematical version:**
    From Step 2, we have $-kx = ma$.
    Since $a = \frac{d^2x}{dt^2}$, we can write:
    $$m \frac{d^2x}{dt^2} = -kx$$
    Rearranging this into a standard form for a differential equation:
    $$\frac{d^2x}{dt^2} + \frac{k}{m}x = 0$$
    This is a second-order linear homogeneous differential equation with constant coefficients. It describes Simple Harmonic Motion (SHM).
*   **What could go wrong:** Algebraic errors when rearranging the equation. Not recognizing this as a differential equation whose solutions are trigonometric functions.

### Step 4: The Solution and Simple Harmonic Motion (Horizontal)

*   **Plain English:** The equation from Step 3 has a very specific type of solution: the mass will oscillate back and forth like a sine or cosine wave. This means its position, velocity, and acceleration will repeat predictably over time.
*   **Small concrete example:** The block on the ice rink will move back and forth, reaching the same maximum stretch and compression repeatedly, and passing through the equilibrium point with its maximum speed.
*   **Formal/mathematical version:** The general solution to the differential equation $\frac{d^2x}{dt^2} + \frac{k}{m}x = 0$ is:
    $$x(t) = A \cos(\omega t + \phi)$$
    Where:
    *   $x(t)$ is the position of the mass at time $t$.
    *   $A$ is the **amplitude**, the maximum displacement from the equilibrium position (always positive).
    *   $\omega$ (omega) is the **angular frequency**, which determines how fast the oscillation occurs. It's given by:
        $$\omega = \sqrt{\frac{k}{m}}$$
        Its units are radians per second (rad/s).
    *   $t$ is time.
    *   $\phi$ (phi) is the **phase constant** (or initial phase), which depends on the initial conditions (where the mass is and how fast it's moving at $t=0$). It's measured in radians.
    From $\omega$, we can also define:
    *   **Period ($T$):** The time it takes for one complete oscillation.
        $$T = \frac{2\pi}{\omega} = 2\pi \sqrt{\frac{m}{k}}$$
        Its units are seconds (s).
    *   **Frequency ($f$):** The number of oscillations per second.
        $$f = \frac{1}{T} = \frac{\omega}{2\pi} = \frac{1}{2\pi} \sqrt{\frac{k}{m}}$$
        Its units are Hertz (Hz), or cycles per second.
*   **What could go wrong:** Confusing angular frequency $\omega$ with ordinary frequency $f$. They are related by a factor of $2\pi$. Incorrectly determining the phase constant $\phi$ from initial conditions.

### Step 5: Energy in Simple Harmonic Motion (Horizontal)

*   **Plain English:** As the mass oscillates, its energy continuously transforms between two forms: kinetic energy (energy of motion) and elastic potential energy (energy stored in the spring). The total mechanical energy of the system remains constant, assuming no friction or air resistance.
*   **Small concrete example:** When the mass is momentarily stopped at its maximum stretch (amplitude $A$), all its energy is stored in the spring as potential energy. As it swings back through the equilibrium point ($x=0$), the spring is not stretched, so potential energy is zero, and all the energy is kinetic (the mass is moving fastest here).
*   **Formal/mathematical version:**
    The elastic potential energy stored in a spring stretched or compressed by $x$ is:
    $$U_s = \frac{1}{2}kx^2$$
    The kinetic energy of the mass $m$ moving with velocity $v$ is:
    $$K = \frac{1}{2}mv^2$$
    The total mechanical energy $E$ of the system is the sum of these two:
    $$E = K + U_s = \frac{1}{2}mv^2 + \frac{1}{2}kx^2$$
    Since energy is conserved, $E$ is constant. We can express this constant energy in terms of the amplitude $A$:
    At maximum displacement ($x=A$), the velocity $v=0$. So, $E = \frac{1}{2}kA^2$.
    At equilibrium ($x=0$), the velocity is maximum ($v=v_{max}$). So, $E = \frac{1}{2}mv_{max}^2$.
    Therefore,
    $$E = \frac{1}{2}kA^2 = \frac{1}{2}mv_{max}^2$$
    This implies $v_{max} = A\omega$. (You can verify this by taking the derivative of $x(t)$ to find $v(t) = -A\omega \sin(\omega t + \phi)$, and then finding its maximum magnitude).
*   **What could go wrong:** Forgetting that mechanical energy is conserved *only* if non-conservative forces (like friction) are absent. Confusing potential energy with kinetic energy at specific points in the oscillation.

### Step 6: The Vertical Spring-Mass System

*   **Plain English:** Now, consider hanging the mass from a spring vertically. Gravity will play a role. The spring will stretch under the weight of the mass to a new, lower equilibrium position. Oscillations will then occur around *this new equilibrium*, not the spring's natural length.
*   **Small concrete example:** Hang a spring from the ceiling. It has a natural length. Now attach a weight to it. The weight pulls the spring down until the upward spring force perfectly balances the downward gravitational force. This is the new resting position. If you then pull the weight further down and release it, it will oscillate up and down around this *new* resting position.
*   **Formal/mathematical version:**
    1.  Let $y=0$ be the position of the spring's natural length.
    2.  When the mass $m$ is attached, it stretches the spring by a distance $y_{eq}$ to reach a new equilibrium.
    3.  At this new equilibrium, the net force is zero. The upward spring force balances the downward gravitational force:
        $$F_s - mg = 0$$
        $$k y_{eq} - mg = 0$$
        $$y_{eq} = \frac{mg}{k}$$
    4.  Now, if the mass is displaced from this *new equilibrium* position, let its position be $y$. The total stretch of the spring will be $y$. The forces acting on the mass are:
        *   Spring force (upwards): $F_s = -k(y)$ (if we define positive $y$ downwards from natural length)
        *   Gravitational force (downwards): $mg$
        Let's be careful with direction. Let's define positive $y$ as downwards from the *natural length* of the spring.
        The net force on the mass is:
        $$F_{net} = mg - ky$$
        (The spring force is $ky$ upwards, so $-ky$ in the downward direction).
*   **What could go wrong:** Forgetting to account for gravity. Incorrectly identifying the new equilibrium position. Trying to use the natural length as the reference point for SHM directly, which complicates the equation.

### Step 7: Equation of Motion (Vertical)

*   **Plain English:** Although gravity is present, the vertical spring-mass system still undergoes Simple Harmonic Motion. The trick is to define a new coordinate system that makes the math simple again. If we measure displacement from the *new equilibrium position*, the equation of motion looks identical to the horizontal case.
*   **Small concrete example:** The vertical block still wiggles like a sine wave, but its center of oscillation is shifted downwards due to gravity.
*   **Formal/mathematical version:**
    Let $y'$ be the displacement of the mass *from its new equilibrium position*.
    So, $y = y_{eq} + y'$. (Where $y$ is displacement from natural length, and $y_{eq}$ is the equilibrium stretch).
    The total stretch of the spring is $y_{eq} + y'$.
    The net force (positive downwards) is:
    $$F_{net} = mg - k(y_{eq} + y')$$
    We know $y_{eq} = mg/k$, so $mg = ky_{eq}$. Substitute this:
    $$F_{net} = ky_{eq} - k(y_{eq} + y')$$
    $$F_{net} = ky_{eq} - ky_{eq} - ky'$$
    $$F_{net} = -ky'$$
    Now, apply Newton's Second Law: $F_{net} = ma$.
    The acceleration $a$ is the second derivative of $y$ with respect to time. Since $y = y_{eq} + y'$ and $y_{eq}$ is a constant, $a = \frac{d^2y}{dt^2} = \frac{d^2y'}{dt^2}$.
    So,
    $$m \frac{d^2y'}{dt^2} = -ky'$$
    Rearranging:
    $$\frac{d^2y'}{dt^2} + \frac{k}{m}y' = 0$$
    This is *exactly* the same form as the horizontal equation of motion! The angular frequency, period, and frequency are therefore the same: $\omega = \sqrt{k/m}$, $T = 2\pi\sqrt{m/k}$, $f = \frac{1}{2\pi}\sqrt{k/m}$. The only difference is that $y'$ now represents the displacement from the *new equilibrium position*.
*   **What could go wrong:** Not understanding that the angular frequency $\omega$ for a vertical spring-mass system is *independent* of gravity. Gravity only shifts the equilibrium position; it does not change the rate of oscillation.

## 5. Worked examples — multiple, with every step shown

### Example 1: Horizontal System — Basic Properties

**Problem:** A 0.5 kg mass is attached to a spring with a spring constant of 20 N/m. The system rests on a frictionless horizontal surface. The mass is pulled 10 cm from equilibrium and released.
a) Calculate the angular frequency of oscillation.
b) Calculate the period of oscillation.
c) Calculate the frequency of oscillation.

**Given:**
*   Mass $m = 0.5$ kg
*   Spring constant $k = 20$ N/m
*   Amplitude $A = 10$ cm $= 0.1$ m (This is initial displacement, so it's the amplitude)

**Want:**
a) Angular frequency $\omega$
b) Period $T$
c) Frequency $f$

**Solution:**

**a) Calculate the angular frequency of oscillation.**

1.  **Recall the formula for angular frequency:** For a spring-mass system, the angular frequency $\omega$ is given by the square root of the spring constant divided by the mass.
    $$\omega = \sqrt{\frac{k}{m}}$$
2.  **Substitute the given values:**
    $$\omega = \sqrt{\frac{20 \text{ N/m}}{0.5 \text{ kg}}}$$
3.  **Perform the calculation:**
    $$\omega = \sqrt{40 \text{ s}^{-2}}$$
    $$\omega \approx 6.32 \text{ rad/s}$$
    **Explanation:** The units N/m divided by kg simplifies to $(kg \cdot m/s^2)/m / kg = 1/s^2$, so the square root is $1/s$ or rad/s, which is correct for angular frequency.

**b) Calculate the period of oscillation.**

1.  **Recall the formula relating period and angular frequency:** The period $T$ is the time for one complete cycle, and it's $2\pi$ divided by the angular frequency.
    $$T = \frac{2\pi}{\omega}$$
2.  **Substitute the calculated angular frequency:**
    $$T = \frac{2\pi}{6.32 \text{ rad/s}}$$
3.  **Perform the calculation:**
    $$T \approx 0.994 \text{ s}$$
    **Explanation:** A period of approximately 1 second means the mass completes one full back-and-forth oscillation in roughly one second.

**c) Calculate the frequency of oscillation.**

1.  **Recall the formula relating frequency and period:** Frequency $f$ is the reciprocal of the period.
    $$f = \frac{1}{T}$$
2.  **Substitute the calculated period:**
    $$f = \frac{1}{0.994 \text{ s}}$$
3.  **Perform the calculation:**
    $$f \approx 1.006 \text{ Hz}$$
    **Explanation:** Since the period is almost 1 second, the frequency (cycles per second) is also almost 1 Hz.

**Final Answers:**
a) $\omega \approx \textbf{6.32 rad/s}$
b) $T \approx \textbf{0.994 s}$
c) $f \approx \textbf{1.006 Hz}$

**Reflection:** This example was straightforward, focusing on direct application of the fundamental formulas for $\omega$, $T$, and $f$. The main "trick" would be ensuring correct units and remembering the relationships between these three quantities.

---

### Example 2: Horizontal System — Finding the Equation of Motion

**Problem:** A 2.0 kg mass is attached to a spring with a spring constant of 18 N/m. It is placed on a frictionless horizontal surface. At $t=0$, the mass is at $x=0.2$ m and has an initial velocity of $v_0 = -0.6$ m/s (moving towards the equilibrium). Find the equation of motion $x(t)$ for the mass.

**Given:**
*   Mass $m = 2.0$ kg
*   Spring constant $k = 18$ N/m
*   Initial position $x(0) = x_0 = 0.2$ m
*   Initial velocity $v(0) = v_0 = -0.6$ m/s

**Want:**
*   Equation of motion $x(t) = A \cos(\omega t + \phi)$

**Solution:**

1.  **Calculate the angular frequency $\omega$:**
    *   The formula for angular frequency is $\omega = \sqrt{k/m}$.
    $$\omega = \sqrt{\frac{18 \text{ N/m}}{2.0 \text{ kg}}}$$
    $$\omega = \sqrt{9 \text{ s}^{-2}}$$
    $$\omega = 3 \text{ rad/s}$$
    **Explanation:** This is the first step because $\omega$ is a fundamental property of the spring-mass system itself, independent of initial conditions.

2.  **Write the general form of the solution:**
    *   The general solution for SHM is $x(t) = A \cos(\omega t + \phi)$.
    *   Substitute the calculated $\omega$:
    $$x(t) = A \cos(3t + \phi)$$
    **Explanation:** Now we need to find $A$ and $\phi$ using the initial conditions.

3.  **Use the initial position $x(0)$ to find $A$ and $\phi$:**
    *   At $t=0$, $x(0) = 0.2$ m.
    $$0.2 = A \cos(3 \cdot 0 + \phi)$$
    $$0.2 = A \cos(\phi) \quad (*)$$
    **Explanation:** This gives us one equation with two unknowns, $A$ and $\phi$. We need another equation.

4.  **Find the velocity function $v(t)$ by differentiating $x(t)$:**
    *   If $x(t) = A \cos(\omega t + \phi)$, then $v(t) = \frac{dx}{dt} = -A\omega \sin(\omega t + \phi)$.
    *   Substitute $\omega = 3$ rad/s:
    $$v(t) = -3A \sin(3t + \phi)$$
    **Explanation:** Velocity is the rate of change of position. The chain rule is used for differentiation.

5.  **Use the initial velocity $v(0)$ to find $A$ and $\phi$:**
    *   At $t=0$, $v(0) = -0.6$ m/s.
    $$-0.6 = -3A \sin(3 \cdot 0 + \phi)$$
    $$-0.6 = -3A \sin(\phi)$$
    $$0.2 = A \sin(\phi) \quad (**)$$
    **Explanation:** Now we have a second equation with $A$ and $\phi$.

6.  **Solve the system of equations for $A$ and $\phi$:**
    *   We have:
        $(*)\quad 0.2 = A \cos(\phi)$
        $(**)\quad 0.2 = A \sin(\phi)$
    *   Divide $(**)$ by $(*)$:
        $$\frac{A \sin(\phi)}{A \cos(\phi)} = \frac{0.2}{0.2}$$
        $$\tan(\phi) = 1$$
    *   The principal value for $\phi$ is $\pi/4$ radians (or $45^\circ$).
        $$\phi = \frac{\pi}{4} \text{ rad}$$
    *   Substitute $\phi$ back into either $(*)$ or $(**)$ to find $A$. Using $(*)$:
        $$0.2 = A \cos(\frac{\pi}{4})$$
        $$0.2 = A \left(\frac{\sqrt{2}}{2}\right)$$
        $$A = \frac{0.2 \times 2}{\sqrt{2}} = \frac{0.4}{\sqrt{2}} = \frac{0.4\sqrt{2}}{2} = 0.2\sqrt{2} \text{ m}$$
        $$A \approx 0.283 \text{ m}$$
    **Explanation:** We use trigonometric identities to solve for $A$ and $\phi$. Dividing the sine equation by the cosine equation allows us to find $\tan(\phi)$, and then $\phi$. Substituting $\phi$ back into one of the original equations then gives $A$.

7.  **Write the final equation of motion:**
    *   Substitute $A$, $\omega$, and $\phi$ into the general solution.
    $$x(t) = (0.2\sqrt{2}) \cos(3t + \frac{\pi}{4})$$
    $$x(t) \approx 0.283 \cos(3t + \frac{\pi}{4})$$
    **Explanation:** This equation completely describes the position of the mass at any given time $t$.

**Final Answer:**
The equation of motion is $\boxed{\mathbf{x(t) = 0.2\sqrt{2} \cos(3t + \frac{\pi}{4}) \text{ m}}}$

**Reflection:** This example was more challenging because it required using initial conditions to determine the amplitude and phase constant. A common mistake is to forget to differentiate the position function to get velocity, or to make errors in solving the trigonometric equations for $A$ and $\phi$. Remember that $\tan(\phi)=1$ has multiple solutions (e.g., $\pi/4$ and $5\pi/4$). We must check which quadrant $\phi$ is in by looking at the signs of $A\cos\phi$ and $A\sin\phi$. In this case, both are positive, so $\phi$ is in the first quadrant.

---

### Example 3: Vertical System — Equilibrium and Oscillation

**Problem:** A spring has a spring constant of $k = 150$ N/m. A 0.75 kg mass is hung from it, bringing the spring to a new equilibrium position.
a) How much does the spring stretch to reach this new equilibrium?
b) If the mass is then pulled down an additional 5 cm from this new equilibrium and released, what is the period of oscillation?
c) What is the maximum speed of the mass during oscillation?

**Given:**
*   Spring constant $k = 150$ N/m
*   Mass $m = 0.75$ kg
*   Acceleration due to gravity $g = 9.8$ m/s$^2$
*   Initial displacement from new equilibrium $A = 5$ cm $= 0.05$ m

**Want:**
a) Equilibrium stretch $y_{eq}$
b) Period $T$
c) Maximum speed $v_{max}$

**Solution:**

**a) How much does the spring stretch to reach this new equilibrium?**

1.  **Identify forces at equilibrium:** At the new equilibrium position, the upward spring force $F_s$ balances the downward gravitational force $mg$.
    $$F_s = mg$$
2.  **Apply Hooke's Law:** The spring force is $ky_{eq}$, where $y_{eq}$ is the stretch from the natural length.
    $$ky_{eq} = mg$$
3.  **Solve for $y_{eq}$:**
    $$y_{eq} = \frac{mg}{k}$$
4.  **Substitute values:**
    $$y_{eq} = \frac{(0.75 \text{ kg})(9.8 \text{ m/s}^2)}{150 \text{ N/m}}$$
    $$y_{eq} = \frac{7.35 \text{ N}}{150 \text{ N/m}}$$
    $$y_{eq} = 0.049 \text{ m}$$
    **Explanation:** This is a static equilibrium problem. The spring stretches until its upward force perfectly counteracts the weight of the mass.

**b) If the mass is then pulled down an additional 5 cm from this new equilibrium and released, what is the period of oscillation?**

1.  **Recognize the nature of oscillation:** Oscillations occur around the *new* equilibrium position. The angular frequency $\omega$ (and thus the period $T$) of a vertical spring-mass system is the same as a horizontal one, independent of gravity.
    $$\omega = \sqrt{\frac{k}{m}}$$
2.  **Calculate $\omega$:**
    $$\omega = \sqrt{\frac{150 \text{ N/m}}{0.75 \text{ kg}}}$$
    $$\omega = \sqrt{200 \text{ s}^{-2}}$$
    $$\omega \approx 14.14 \text{ rad/s}$$
3.  **Calculate the period $T$:**
    $$T = \frac{2\pi}{\omega}$$
    $$T = \frac{2\pi}{14.14 \text{ rad/s}}$$
    $$T \approx 0.444 \text{ s}$$
    **Explanation:** Gravity only shifts the equilibrium point; it doesn't change the "springiness" or "massiveness" of the system, which are the only factors determining the oscillation rate.

**c) What is the maximum speed of the mass during oscillation?**

1.  **Identify the amplitude:** The mass is pulled down an additional 5 cm from the new equilibrium and released. This initial displacement *from equilibrium* is the amplitude $A$.
    $$A = 0.05 \text{ m}$$
2.  **Recall the relationship between maximum speed, amplitude, and angular frequency:** The maximum speed $v_{max}$ occurs when the mass passes through the equilibrium position, and it's given by $A\omega$.
    $$v_{max} = A\omega$$
3.  **Substitute values:**
    $$v_{max} = (0.05 \text{ m})(14.14 \text{ rad/s})$$
    $$v_{max} \approx 0.707 \text{ m/s}$$
    **Explanation:** The amplitude is the maximum displacement, and the angular frequency tells us how fast the oscillation is. Their product gives the maximum speed.

**Final Answers:**
a) $y_{eq} \approx \textbf{0.049 m}$
b) $T \approx \textbf{0.444 s}$
c) $v_{max} \approx \textbf{0.707 m/s}$

**Reflection:** This example highlights the key difference for vertical systems: finding the new equilibrium. Once that's established, the oscillation properties ($\omega$, $T$, $f$, $v_{max}$) are calculated in the same way as for a horizontal system, as they depend only on $k$ and $m$. A common mistake is to try to include gravity in the $\omega$ calculation or to forget that the amplitude is the displacement *from the new equilibrium*.

---

### Example 4: Energy Conservation in a Horizontal System

**Problem:** A 0.3 kg mass is attached to a horizontal spring with $k=50$ N/m. The mass is pulled 8 cm from its equilibrium position and released from rest.
a) What is the total mechanical energy of the system?
b) What is the speed of the mass when it is 4 cm from equilibrium?
c) What is the maximum acceleration of the mass?

**Given:**
*   Mass $m = 0.3$ kg
*   Spring constant $k = 50$ N/m
*   Initial displacement (amplitude) $A = 8$ cm $= 0.08$ m
*   Initial velocity $v_0 = 0$ m/s (released from rest)

**Want:**
a) Total mechanical energy $E$
b) Speed $v$ when $x = 4$ cm $= 0.04$ m
c) Maximum acceleration $a_{max}$

**Solution:**

**a) What is the total mechanical energy of the system?**

1.  **Identify initial conditions for total energy:** The mass is released from rest at its maximum displacement ($x=A$). At this point, all the energy is elastic potential energy, and kinetic energy is zero.
    $$E = K + U_s$$
    $$E = \frac{1}{2}mv^2 + \frac{1}{2}kx^2$$
2.  **Substitute initial values ($v=0$, $x=A$):**
    $$E = \frac{1}{2}m(0)^2 + \frac{1}{2}kA^2$$
    $$E = \frac{1}{2}kA^2$$
3.  **Calculate the total energy:**
    $$E = \frac{1}{2}(50 \text{ N/m})(0.08 \text{ m})^2$$
    $$E = \frac{1}{2}(50)(0.0064) \text{ J}$$
    $$E = 25 \times 0.0064 \text{ J}$$
    $$E = 0.16 \text{ J}$$
    **Explanation:** Since the system is frictionless, mechanical energy is conserved. We can find the total energy at any point, but it's easiest at the maximum displacement where the velocity is zero.

**b) What is the speed of the mass when it is 4 cm from equilibrium?**

1.  **Apply conservation of mechanical energy:** The total energy $E$ found in part (a) remains constant throughout the oscillation. At any point $x$ with speed $v$, the total energy is $E = \frac{1}{2}mv^2 + \frac{1}{2}kx^2$.
    $$E = \frac{1}{2}mv^2 + \frac{1}{2}kx^2$$
2.  **Substitute known values ($E=0.16$ J, $m=0.3$ kg, $k=50$ N/m, $x=0.04$ m):**
    $$0.16 \text{ J} = \frac{1}{2}(0.3 \text{ kg})v^2 + \frac{1}{2}(50 \text{ N/m})(0.04 \text{ m})^2$$
3.  **Calculate the potential energy at $x=0.04$ m:**
    $$\frac{1}{2}(50)(0.04)^2 = 25 \times 0.0016 = 0.04 \text{ J}$$
4.  **Solve for $v^2$:**
    $$0.16 = 0.15 v^2 + 0.04$$
    $$0.16 - 0.04 = 0.15 v^2$$
    $$0.12 = 0.15 v^2$$
    $$v^2 = \frac{0.12}{0.15} = \frac{12}{15} = \frac{4}{5} = 0.8$$
5.  **Solve for $v$:**
    $$v = \sqrt{0.8} \text{ m/s}$$
    $$v \approx 0.894 \text{ m/s}$$
    **Explanation:** Energy conservation allows us to relate the system's state at one point (known total energy) to its state at another point (unknown velocity at a given position).

**c) What is the maximum acceleration of the mass?**

1.  **Recall Newton's Second Law:** $F_{net} = ma$. For a spring-mass system, $F_{net} = -kx$.
    $$ma = -kx$$
2.  **Determine where maximum acceleration occurs:** The acceleration is maximum when the force is maximum. The force is maximum when the displacement $x$ is maximum, which is at the amplitude $A$.
    $$a_{max} = \frac{-k A_{max}}{m}$$
    *Note: We are looking for the magnitude of max acceleration, so we can ignore the negative sign.*
    $$|a_{max}| = \frac{kA}{m}$$
3.  **Substitute values:**
    $$|a_{max}| = \frac{(50 \text{ N/m})(0.08 \text{ m})}{0.3 \text{ kg}}$$
    $$|a_{max}| = \frac{4 \text{ N}}{0.3 \text{ kg}}$$
    $$|a_{max}| \approx 13.33 \text{ m/s}^2$$
    **Explanation:** Maximum acceleration occurs at the points of maximum displacement (the turning points), where the spring force is strongest. This is directly from Newton's second law and Hooke's law. Alternatively, from $x(t) = A\cos(\omega t + \phi)$, $a(t) = -A\omega^2\cos(\omega t + \phi)$, so $a_{max} = A\omega^2$. We can verify this: $\omega^2 = k/m = 50/0.3 = 166.67$. $A\omega^2 = 0.08 \times 166.67 = 13.33$ m/s$^2$. The results match.

**Final Answers:**
a) $E = \textbf{0.16 J}$
b) $v \approx \textbf{0.894 m/s}$
c) $|a_{max}| \approx \textbf{13.33 m/s}^2$

**Reflection:** This example demonstrates the power of energy conservation in SHM. Instead of solving differential equations, we can often find speeds at various positions directly. It also reinforces the idea that maximum acceleration occurs at maximum displacement, and maximum speed occurs at equilibrium.

## 6. Common mistakes and traps

1.  **Forgetting the negative sign in Hooke's Law ($F_s = -kx$):** This is crucial. The negative sign signifies a *restoring* force, always acting opposite to the displacement. Omitting it implies the spring force *aids* the displacement, leading to runaway motion instead of oscillation.
2.  **Confusing angular frequency ($\omega$) with ordinary frequency ($f$) or period ($T$):** These are distinct but related. $\omega$ is in rad/s, $f$ is in Hz (cycles/s), and $T$ is in s. Remember $T = 1/f = 2\pi/\omega$. Using the wrong one in calculations will lead to incorrect results.
3.  **Incorrectly identifying the equilibrium position for vertical systems:** For a vertical spring-mass system, the oscillations occur around the new equilibrium position where the spring force balances gravity ($mg = ky_{eq}$). The spring's natural length is *not* the center of oscillation.
4.  **Not using the correct coordinate system for vertical systems:** When setting up the equation of motion, it's easiest to define displacement ($y'$) from the *new equilibrium position*. If you define it from the natural length, you must explicitly include both spring force and gravity in Newton's second law, and the equation will be $m\frac{d^2y}{dt^2} = mg - ky$, which simplifies to $m\frac{d^2y'}{dt^2} = -ky'$ after a coordinate transformation.
5.  **Ignoring units or using inconsistent units:** Always convert all quantities to a consistent system (e.g., SI units: kg, m, s, N) before plugging them into formulas. Forgetting to convert cm to m, or grams to kg, is a very common source of error.
6.  **Misapplying energy conservation:** Mechanical energy is conserved *only* if non-conservative forces (like friction or air resistance) are negligible. If friction is present, mechanical energy is *not* conserved, and some energy is dissipated as heat.

## 7. Textbook-precise explanation

A **spring-mass system** is a fundamental model in classical mechanics for understanding oscillatory motion. It consists of a mass $m$ attached to an ideal spring with a spring constant $k$. An ideal spring is massless, obeys Hooke's Law, and has no internal damping.

**Hooke's Law** states that the restoring force exerted by an ideal spring is directly proportional to its displacement from its equilibrium (natural) length, and acts in the opposite direction to the displacement. Mathematically, if $x$ is the displacement, the spring force $F_s$ is given by:
$$F_s = -kx$$
where $k$ is the spring constant, a positive scalar quantity representing the stiffness of the spring.

**Horizontal Spring-Mass System:**
Consider a mass $m$ attached to a spring, resting on a frictionless horizontal surface. Let $x=0$ be the equilibrium position where the spring is at its natural length. If the mass is displaced by $x$, the net force on the mass is solely the spring force. According to Newton's Second Law ($\sum F = ma$):
$$-kx = m \frac{d^2x}{dt^2}$$
Rearranging this, we obtain the **equation of motion**:
$$\frac{d^2x}{dt^2} + \frac{k}{m}x = 0$$
This is a second-order linear homogeneous differential equation, characteristic of **Simple Harmonic Motion (SHM)**. The general solution to this equation is:
$$x(t) = A \cos(\omega t + \phi)$$
where:
*   $A$ is the **amplitude**, the maximum displacement from equilibrium.
*   $\omega = \sqrt{\frac{k}{m}}$ is the **angular frequency** (in rad/s), which dictates the rate of oscillation.
*   $\phi$ is the **phase constant**, determined by the initial conditions ($x(0)$ and $v(0)$).
From the angular frequency, we can derive the **period** $T$ (time for one complete oscillation) and **frequency** $f$ (number of oscillations per second):
$$T = \frac{2\pi}{\omega} = 2\pi \sqrt{\frac{m}{k}}$$
$$f = \frac{1}{T} = \frac{\omega}{2\pi} = \frac{1}{2\pi} \sqrt{\frac{k}{m}}$$

**Energy in SHM:**
For a frictionless spring-mass system, mechanical energy $E$ is conserved. It consists of kinetic energy $K$ of the mass and elastic potential energy $U_s$ stored in the spring:
$$E = K + U_s = \frac{1}{2}mv^2 + \frac{1}{2}kx^2$$
At maximum displacement ($x=A$, $v=0$), $E = \frac{1}{2}kA^2$. At equilibrium ($x=0$, $v=v_{max}$), $E = \frac{1}{2}mv_{max}^2$. Thus, $v_{max} = A\omega$.

**Vertical Spring-Mass System:**
When a mass $m$ is suspended vertically from a spring, gravity must be considered. The spring stretches to a new equilibrium position $y_{eq}$ where the upward spring force balances the downward gravitational force:
$$ky_{eq} = mg \implies y_{eq} = \frac{mg}{k}$$
If we define a new coordinate $y'$ as the displacement from this new equilibrium position (positive downwards), the net force on the mass is:
$$F_{net} = mg - k(y_{eq} + y')$$
Substituting $mg = ky_{eq}$:
$$F_{net} = ky_{eq} - k(y_{eq} + y') = -ky'$$
Applying Newton's Second Law, $F_{net} = m \frac{d^2y'}{dt^2}$:
$$m \frac{d^2y'}{dt^2} = -ky'$$
This yields the same equation of motion as the horizontal case:
$$\frac{d^2y'}{dt^2} + \frac{k}{m}y' = 0$$
The angular frequency $\omega = \sqrt{k/m}$ and period $T = 2\pi\sqrt{m/k}$ for a vertical spring-mass system are identical to the horizontal case. Gravity only shifts the equilibrium position; it does not alter the frequency of oscillation.

*(References: Halliday, Resnick, Walker, "Fundamentals of Physics"; Serway and Jewett, "Physics for Scientists and Engineers"; Tipler and Mosca, "Physics for Scientists and Engineers")*

## 8. ASCII diagrams

```text
               Fixed Wall
                 |
                 |
                 |
               -----
              |     |
              |  W  |   <-- Wall anchor
              |     |
               -----
                 |
                 |
                 |
                 +--------------------------------------------------> +x (Displacement)
                 |
                 |  (Natural length of spring, no force)
                 |
                 |    Equilibrium (x=0)
                 |      |
                 |      |
                 |      |
                 |      |
                 +------+-------------------
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
                 |      |                 |
