## 1. What it is — in plain English

Imagine you have a string, and at the end of the string, you tie a small weight, like a rock. Now, hold the other end of the string still and pull the rock a little bit to the side, then let it go. What happens? The rock swings back and forth, right? This setup, a weight (or "bob") swinging on a string, is what we call a "simple pendulum."

The cool thing about a simple pendulum is how it swings. If you don't pull it too far to the side, it always takes pretty much the same amount of time to complete one full swing, no matter how high or low it goes (as long as it's not super high). This consistent time for one full swing is called its "period."

This lesson is about understanding *why* it swings like that and, most importantly, how we can predict exactly how long one full swing (the period) will take using a simple formula: $T = 2\pi\sqrt{L/g}$. This formula connects the swing time ($T$) to the length of the string ($L$) and the strength of gravity ($g$). We'll also learn about a crucial trick called the "small angle approximation" that makes this formula work.

Think of it like a metronome for music or the pendulum in an old grandfather clock. They swing with a very regular, predictable rhythm. The simple pendulum is the fundamental physics model that explains this rhythm, and the formula $T = 2\pi\sqrt{L/g}$ is its heartbeat.

## 2. Why it matters — real-world applications

The simple pendulum, and the principles governing its motion, are far more than just a classroom exercise. They underpin a surprising number of real-world technologies and natural phenomena:

1.  **Timekeeping and Clocks:** The most direct and historically significant application. Pendulum clocks, invented by Christiaan Huygens in the 17th century, were the most accurate timekeeping devices for centuries. The regular, predictable period ($T$) of a pendulum, especially one designed to swing with a period of exactly one second, made them ideal for precise time measurement. Modern atomic clocks don't use pendulums, but the concept of a stable, resonant frequency for timekeeping originates here.
2.  **Seismographs:** Devices used to detect and record earthquakes often utilize the principle of a pendulum. A heavy mass suspended by a spring or wire (acting like a pendulum) tends to remain stationary due to its inertia, even as the ground beneath it shakes. The relative motion between the stationary mass and the moving ground is then recorded, providing data on seismic waves. This is a crucial tool for understanding plate tectonics and earthquake prediction.
3.  **Gravimeters:** These instruments measure local variations in the acceleration due to gravity ($g$). Since the period of a pendulum is inversely proportional to the square root of $g$ ($T \propto 1/\sqrt{g}$), a precisely measured pendulum can be used to detect tiny changes in $g$. This is vital in geophysics for mapping underground structures, prospecting for oil and minerals, and even tracking changes in ice sheet mass.
4.  **Metronomes and Musical Instruments:** Metronomes, used by musicians to maintain a steady tempo, are essentially adjustable pendulums. By changing the effective length (or the position of a sliding weight), the period of the pendulum (and thus the tempo) can be altered. Some musical instruments, like certain types of chimes, also rely on oscillatory principles related to pendulums.
5.  **Aerospace Engineering (Attitude Control & Stabilization):** While not a simple pendulum directly, the principles of pendular motion are crucial for understanding stability in aerospace. For instance, the concept of a "gravity gradient" stabilization system for satellites uses long booms to create a stable orientation, effectively making the satellite behave like an inverted pendulum in orbit, using the Earth's gravity gradient to keep one side pointed down. Understanding oscillatory stability is fundamental for designing stable aircraft and spacecraft.

## 3. Prerequisites — what you must know first

To fully grasp the simple pendulum derivation, you should be comfortable with the following concepts:

*   **Newton's Laws of Motion:** Especially Newton's Second Law, $F=ma$, which relates force, mass, and acceleration.
*   **Vector Decomposition:** How to break down a force or acceleration vector into its perpendicular components (e.g., using sine and cosine).
*   **Torque:** The rotational equivalent of force, defined as $\tau = rF\sin\theta$ or $\tau = r \times F$. It's crucial for understanding rotational motion.
*   **Angular Displacement, Velocity, and Acceleration:** The rotational counterparts to linear displacement, velocity, and acceleration ($\theta$, $\omega$, $\alpha$).
*   **Simple Harmonic Motion (SHM):** Oscillatory motion where the restoring force is directly proportional to the displacement and acts in the opposite direction ($F = -kx$). Its defining equation is $a = -\omega^2 x$.
*   **Differential Equations (Basic Understanding):** Specifically, recognizing the form of the SHM differential equation ($d^2x/dt^2 = -\omega^2 x$) and knowing its general solution.
*   **Small Angle Approximation:** The approximation that for small angles $\theta$ (in radians), $\sin\theta \approx \theta$ and $\cos\theta \approx 1$. This is absolutely critical for the derivation.
*   **Calculus (Derivatives):** Understanding how to take derivatives with respect to time to relate position, velocity, and acceleration.
*   **Radians:** Angles must be expressed in radians for the small angle approximation and most physics equations involving rotational motion.

If any of these feel unfamiliar, pause here and review them. They are foundational.

## 4. The core idea — step by step

Let's break down the simple pendulum and its period derivation into manageable steps.

### Step 1: Define the Simple Pendulum System

*   **Plain-English Statement:** We're talking about the simplest possible swinging setup: a tiny, heavy object (a "point mass" or "bob") attached to a string that has no weight and doesn't stretch. It swings back and forth under the influence of gravity.
*   **Concrete Example:** Imagine a small, dense metal ball tied to a very thin, strong fishing line. The line is fixed at one end, and the ball swings freely.
*   **Formal/Mathematical Version:**
    *   A point mass $m$ (the bob).
    *   A massless, inextensible string of length $L$.
    *   Fixed pivot point.
    *   Motion is confined to a vertical plane.
    *   No air resistance or friction at the pivot.
*   **What could go wrong:** If the mass isn't a point mass (e.g., a large sphere), or the string has mass, or it stretches, the "simple pendulum" model breaks down, and the analysis becomes more complex (it becomes a "physical pendulum").

### Step 2: Identify Forces and Set Up the Coordinate System

*   **Plain-English Statement:** When the pendulum swings, two main forces are acting on the bob: gravity pulling it straight down, and the tension in the string pulling it towards the pivot. We'll use angles to describe its position.
*   **Concrete Example:** When the ball is pulled to the side, gravity pulls it down. The string prevents it from falling straight down, so it swings in an arc.
*   **Formal/Mathematical Version:**
    *   Let $\theta$ be the angular displacement from the vertical equilibrium position.
    *   Forces acting on the bob:
        *   Gravitational force: $F_g = mg$, acting vertically downwards.
        *   Tension force: $T_{string}$, acting along the string towards the pivot.
    *   We resolve the gravitational force into two components:
        *   One component along the string, $mg\cos\theta$, which is balanced by the tension (no acceleration along the string).
        *   One component tangential to the arc of motion, $mg\sin\theta$, which is the *restoring force* that pulls the pendulum back towards equilibrium.
    *   It's often easier to analyze this using torque. The torque due to gravity about the pivot point is what causes the angular acceleration. The tension force acts through the pivot, so it produces no torque.
    *   Torque $\tau = r F \sin\phi$, where $r=L$ and $F=mg$. The angle $\phi$ between $\vec{L}$ (position vector from pivot to mass) and $\vec{F_g}$ (gravity vector) is $\theta$.
    *   So, $\tau = -L (mg \sin\theta)$. The negative sign indicates that the torque acts to *restore* the pendulum to $\theta=0$.
*   **What could go wrong:** Misidentifying the angle for the force components or the torque calculation. Remember, the restoring force (or torque) always tries to bring the system back to equilibrium.

### Step 3: Apply Newton's Second Law for Rotational Motion

*   **Plain-English Statement:** Just like a force makes an object accelerate, a torque makes an object *rotationally* accelerate. We'll relate the torque we just found to the bob's rotational inertia and its angular acceleration.
*   **Concrete Example:** When you push a merry-go-round (apply a torque), it starts spinning (angular acceleration). The harder you push, the faster it accelerates.
*   **Formal/Mathematical Version:**
    *   Newton's Second Law for rotational motion states $\tau = I\alpha$, where $I$ is the moment of inertia and $\alpha$ is the angular acceleration.
    *   For a point mass $m$ at a distance $L$ from the pivot, the moment of inertia is $I = mL^2$.
    *   Angular acceleration $\alpha$ is the second derivative of angular displacement with respect to time: $\alpha = \frac{d^2\theta}{dt^2}$.
    *   Equating the torque from Step 2 with $I\alpha$:
        $$-mgL\sin\theta = mL^2 \frac{d^2\theta}{dt^2}$$
*   **What could go wrong:** Using linear $F=ma$ instead of rotational $\tau=I\alpha$, or using the wrong moment of inertia. For a simple pendulum (point mass), $I=mL^2$ is correct.

### Step 4: Introduce the Small Angle Approximation

*   **Plain-English Statement:** The equation we have ($ -mgL\sin\theta = mL^2 \frac{d^2\theta}{dt^2}$) is hard to solve directly. But if the swing is small (meaning $\theta$ is small), we can use a mathematical trick: $\sin\theta$ is almost the same as $\theta$ itself (when $\theta$ is in radians). This simplifies the equation greatly.
*   **Concrete Example:** If you open a door just a tiny crack, the distance the edge of the door moves is almost exactly the angle (in radians) times the width of the door. If you open it wide, this approximation doesn't work.
*   **Formal/Mathematical Version:**
    *   For small angles $\theta$ (typically less than about 10-15 degrees or 0.17-0.26 radians), we use the Taylor series expansion for $\sin\theta$:
        $$\sin\theta = \theta - \frac{\theta^3}{3!} + \frac{\theta^5}{5!} - \dots$$
    *   For small $\theta$, the higher-order terms ($\theta^3$, $\theta^5$, etc.) become very small, so we can approximate:
        $$\sin\theta \approx \theta$$
    *   Substitute this into our equation from Step 3:
        $$-mgL\theta = mL^2 \frac{d^2\theta}{dt^2}$$
*   **What could go wrong:** Forgetting to state the approximation, or applying it when the angle is *not* small. The entire derivation of $T=2\pi\sqrt{L/g}$ relies on this approximation.

### Step 5: Simplify and Recognize the SHM Equation

*   **Plain-English Statement:** Now we have a much simpler equation. If we rearrange it, we'll see it's exactly the same form as the equation for Simple Harmonic Motion (SHM), which we already know how to solve.
*   **Concrete Example:** It's like having a complex recipe and then realizing a key ingredient can be swapped for a simpler one, making the whole cooking process much easier and leading to a known dish.
*   **Formal/Mathematical Version:**
    *   Cancel $m$ and one $L$ from both sides:
        $$-g\theta = L \frac{d^2\theta}{dt^2}$$
    *   Rearrange to the standard form of the SHM differential equation:
        $$\frac{d^2\theta}{dt^2} = -\frac{g}{L}\theta$$
    *   Recall the general SHM equation for displacement $x$:
        $$\frac{d^2x}{dt^2} = -\omega^2 x$$
    *   By comparing these two equations, we can see that for the simple pendulum (under small angle approximation), the angular frequency squared is:
        $$\omega^2 = \frac{g}{L}$$
        Therefore, the angular frequency is:
        $$\omega = \sqrt{\frac{g}{L}}$$
*   **What could go wrong:** Algebraic errors during simplification, or failing to recognize the SHM form. This step is the bridge from Newton's laws to the periodic motion.

### Step 6: Derive the Period Equation

*   **Plain-English Statement:** We know how the angular frequency ($\omega$) relates to the time it takes for one full cycle (the period, $T$). Using that relationship, we can finally get our formula for the pendulum's period.
*   **Concrete Example:** If a wheel spins at 10 radians per second ($\omega$), and we know a full circle is $2\pi$ radians, then it takes $2\pi/10$ seconds for one full spin (period $T$).
*   **Formal/Mathematical Version:**
    *   The relationship between angular frequency $\omega$ and period $T$ is:
        $$\omega = \frac{2\pi}{T}$$
    *   Substitute the expression for $\omega$ we found in Step 5:
        $$\sqrt{\frac{g}{L}} = \frac{2\pi}{T}$$
    *   Now, solve for $T$:
        $$T = \frac{2\pi}{\sqrt{g/L}}$$
        $$T = 2\pi \sqrt{\frac{L}{g}}$$
*   **What could go wrong:** Mixing up $\omega$ and $T$, or making algebraic errors when rearranging the final equation. Units are also crucial: $L$ in meters, $g$ in m/s$^2$, so $T$ will be in seconds.

## 5. Worked examples — multiple, with every step shown

Let's put this into practice with several examples.

### Example 1 (Easy): Basic Period Calculation

**Problem:** A simple pendulum has a length of 0.8 meters. What is its period of oscillation? Assume $g = 9.81 \text{ m/s}^2$.

**Identify:**
*   Given: Length $L = 0.8 \text{ m}$, acceleration due to gravity $g = 9.81 \text{ m/s}^2$.
*   Want: Period $T$.

**Solution:**

1.  **State the formula for the period of a simple pendulum:**
    $$T = 2\pi \sqrt{\frac{L}{g}}$$
    This is the formula we derived, valid for small angles.

2.  **Substitute the given values into the formula:**
    $$T = 2\pi \sqrt{\frac{0.8 \text{ m}}{9.81 \text{ m/s}^2}}$$
    We replace $L$ with 0.8 and $g$ with 9.81. Ensure units are consistent (meters and m/s$^2$).

3.  **Calculate the value inside the square root:**
    $$T = 2\pi \sqrt{0.0815494 \text{ s}^2}$$
    Dividing 0.8 by 9.81 gives approximately 0.0815494. Notice the units cancel to s$^2$, which is good because we're taking the square root to get seconds.

4.  **Take the square root:**
    $$T = 2\pi (0.285568 \text{ s})$$
    The square root of 0.0815494 is approximately 0.285568.

5.  **Multiply by $2\pi$:**
    $$T \approx 2 \times 3.14159 \times 0.285568 \text{ s}$$
    $$T \approx 1.794 \text{ s}$$
    Performing the final multiplication gives the period.

**Final Answer:**
$$ \boxed{T \approx 1.79 \text{ s}} $$

**Reflection:** This was a direct application of the formula. The key is to correctly substitute values and perform the calculations in the right order. Ensure your calculator is in "radian" mode if you were ever to deal with $\sin\theta$ directly, but for this formula, it's just arithmetic.

### Example 2 (Medium): Finding Length from Period

**Problem:** A grandfather clock's pendulum is designed to have a period of exactly 2.00 seconds (a "seconds pendulum"). What must be the length of its pendulum? Assume $g = 9.81 \text{ m/s}^2$.

**Identify:**
*   Given: Period $T = 2.00 \text{ s}$, acceleration due to gravity $g = 9.81 \text{ m/s}^2$.
*   Want: Length $L$.

**Solution:**

1.  **Start with the period formula:**
    $$T = 2\pi \sqrt{\frac{L}{g}}$$
    This is our starting point, as it relates $T$, $L$, and $g$.

2.  **Isolate the square root term by dividing by $2\pi$:**
    $$\frac{T}{2\pi} = \sqrt{\frac{L}{g}}$$
    We want to solve for $L$, so we need to get $L$ out of the square root and the fraction.

3.  **Square both sides of the equation to remove the square root:**
    $$\left(\frac{T}{2\pi}\right)^2 = \frac{L}{g}$$
    Squaring both sides is a common algebraic technique to remove a square root.

4.  **Multiply both sides by $g$ to solve for $L$:**
    $$L = g \left(\frac{T}{2\pi}\right)^2$$
    This is the rearranged formula to find $L$.

5.  **Substitute the given values into the rearranged formula:**
    $$L = 9.81 \text{ m/s}^2 \left(\frac{2.00 \text{ s}}{2\pi}\right)^2$$
    Substitute $T=2.00$ and $g=9.81$.

6.  **Calculate the term inside the parenthesis:**
    $$L = 9.81 \text{ m/s}^2 \left(\frac{2.00}{6.283185}\right)^2$$
    $$L = 9.81 \text{ m/s}^2 (0.3183099)^2$$
    First, divide 2.00 by $2\pi$.

7.  **Square the result:**
    $$L = 9.81 \text{ m/s}^2 (0.101321 \text{ s}^2)$$
    Squaring 0.3183099 gives approximately 0.101321. Notice that s$^2$ appears from squaring the (s) unit.

8.  **Perform the final multiplication:**
    $$L \approx 0.9936 \text{ m}$$
    Multiplying by 9.81 gives the length. The s$^2$ units cancel, leaving meters.

**Final Answer:**
$$ \boxed{L \approx 0.994 \text{ m}} $$

**Reflection:** This example required algebraic manipulation of the formula before substituting values. It's a good practice to rearrange the formula for the desired variable first, then plug in numbers. This reduces the chance of calculation errors. Notice that a "seconds pendulum" is almost exactly 1 meter long.

### Example 3 (Harder): Comparing Pendulums on Different Planets

**Problem:** A simple pendulum has a period of 1.50 seconds on Earth ($g_{Earth} = 9.81 \text{ m/s}^2$). If this same pendulum were transported to the Moon, where the acceleration due to gravity is approximately $1/6$th that of Earth ($g_{Moon} = g_{Earth}/6$), what would its period be on the Moon?

**Identify:**
*   Given: $T_{Earth} = 1.50 \text{ s}$, $g_{Earth} = 9.81 \text{ m/s}^2$, $g_{Moon} = g_{Earth}/6$.
*   Want: $T_{Moon}$.
*   Implicit: The length $L$ of the pendulum remains constant.

**Solution:**

1.  **Write the period formula for Earth:**
    $$T_{Earth} = 2\pi \sqrt{\frac{L}{g_{Earth}}}$$
    This relates the known period on Earth to the unknown length $L$ and known $g_{Earth}$.

2.  **Write the period formula for the Moon:**
    $$T_{Moon} = 2\pi \sqrt{\frac{L}{g_{Moon}}}$$
    This is what we want to find. Notice $L$ is the same.

3.  **Express $g_{Moon}$ in terms of $g_{Earth}$:**
    $$g_{Moon} = \frac{g_{Earth}}{6}$$
    This is given in the problem.

4.  **Substitute $g_{Moon}$ into the Moon's period formula:**
    $$T_{Moon} = 2\pi \sqrt{\frac{L}{g_{Earth}/6}}$$
    $$T_{Moon} = 2\pi \sqrt{\frac{6L}{g_{Earth}}}$$
    Dividing by a fraction is the same as multiplying by its reciprocal.

5.  **Rearrange the expression for $T_{Moon}$ to relate it to $T_{Earth}$:**
    $$T_{Moon} = 2\pi \sqrt{6} \sqrt{\frac{L}{g_{Earth}}}$$
    We can pull the constant $\sqrt{6}$ out of the square root.

6.  **Recognize the term for $T_{Earth}$:**
    $$T_{Moon} = \sqrt{6} \left(2\pi \sqrt{\frac{L}{g_{Earth}}}\right)$$
    The term in the parenthesis is exactly $T_{Earth}$.

7.  **Substitute $T_{Earth}$ into the equation:**
    $$T_{Moon} = \sqrt{6} \times T_{Earth}$$
    This is a powerful shortcut! The period on the Moon is simply $\sqrt{6}$ times the period on Earth.

8.  **Substitute the given value for $T_{Earth}$ and calculate:**
    $$T_{Moon} = \sqrt{6} \times 1.50 \text{ s}$$
    $$T_{Moon} \approx 2.44949 \times 1.50 \text{ s}$$
    $$T_{Moon} \approx 3.6742 \text{ s}$$
    Calculate $\sqrt{6}$ and then multiply by 1.50.

**Final Answer:**
$$ \boxed{T_{Moon} \approx 3.67 \text{ s}} $$

**Reflection:** This problem could be solved by first calculating $L$ on Earth, then using that $L$ to calculate $T_{Moon}$. However, the method shown above, which involves ratios and recognizing common terms, is more elegant and less prone to rounding errors. It highlights the *proportionality* of the period to $1/\sqrt{g}$. This is a common strategy in physics: look for relationships between quantities rather than calculating intermediate values unnecessarily.

### Example 4 (Advanced): Impact of Small Angle Approximation

**Problem:** A simple pendulum of length 1.00 m is released from an initial angle of $\theta_0 = 5^\circ$.
a) Calculate its period using the small angle approximation formula.
b) If the pendulum were released from $\theta_0 = 60^\circ$, explain why the small angle approximation formula would give an inaccurate result. (No calculation needed for b, just explanation.)
Assume $g = 9.81 \text{ m/s}^2$.

**Identify:**
*   Given: $L = 1.00 \text{ m}$, $g = 9.81 \text{ m/s}^2$.
*   Part a: $\theta_0 = 5^\circ$. Want $T$.
*   Part b: $\theta_0 = 60^\circ$. Want explanation for inaccuracy.

**Solution:**

**Part a) Period for $\theta_0 = 5^\circ$:**

1.  **State the formula for the period of a simple pendulum (small angle approximation):**
    $$T = 2\pi \sqrt{\frac{L}{g}}$$
    This formula is appropriate because $5^\circ$ is generally considered a "small angle."

2.  **Substitute the given values into the formula:**
    $$T = 2\pi \sqrt{\frac{1.00 \text{ m}}{9.81 \text{ m/s}^2}}$$
    We substitute $L=1.00$ and $g=9.81$.

3.  **Calculate the value inside the square root:**
    $$T = 2\pi \sqrt{0.1019368 \text{ s}^2}$$
    Dividing 1.00 by 9.81 gives approximately 0.1019368.

4.  **Take the square root:**
    $$T = 2\pi (0.319275 \text{ s})$$
    The square root of 0.1019368 is approximately 0.319275.

5.  **Multiply by $2\pi$:**
    $$T \approx 2 \times 3.14159 \times 0.319275 \text{ s}$$
    $$T \approx 2.006 \text{ s}$$
    Performing the final multiplication gives the period.

**Final Answer (Part a):**
$$ \boxed{T \approx 2.01 \text{ s}} $$

**Part b) Explanation for $\theta_0 = 60^\circ$ inaccuracy:**

The small angle approximation relies on the mathematical simplification that $\sin\theta \approx \theta$ when $\theta$ is expressed in radians. Let's compare the values for $60^\circ$:

*   First, convert $60^\circ$ to radians: $60^\circ \times \frac{\pi}{180^\circ} = \frac{\pi}{3} \text{ radians} \approx 1.047 \text{ radians}$.
*   Now, compare $\sin\theta$ and $\theta$:
    *   $\sin(60^\circ) = \sin(\pi/3) = \frac{\sqrt{3}}{2} \approx 0.866$
    *   $\theta \text{ (in radians)} \approx 1.047$

As you can see, $0.866$ is significantly different from $1.047$. The approximation $\sin\theta \approx \theta$ is no longer valid. When this approximation breaks down, the differential equation for the pendulum's motion is no longer that of Simple Harmonic Motion. Instead, it becomes a more complex non-linear differential equation. The actual period for large angles is *longer* than what the small angle approximation formula predicts because the restoring force ($mg\sin\theta$) is effectively weaker than the approximated force ($mg\theta$) for a given displacement. Therefore, the pendulum spends more time at the extremes of its swing, resulting in a longer period.

**Reflection:** This example highlights the crucial condition for the validity of the period formula. It's not a universal formula for *any* pendulum swing; it's specific to small oscillations. Understanding the limitations of the approximation is as important as knowing the formula itself.

## 6. Common mistakes and traps

1.  **Forgetting the Small Angle Approximation:** The most common mistake. The formula $T = 2\pi\sqrt{L/g}$ is *only* valid for small angles ($\theta \lesssim 15^\circ$ or $0.26 \text{ rad}$). Without this approximation, the pendulum's motion is not SHM.
2.  **Using Degrees Instead of Radians:** When working with the small angle approximation ($\sin\theta \approx \theta$), $\theta$ *must* be in radians. While the final formula $T = 2\pi\sqrt{L/g}$ doesn't explicitly use $\theta$, the derivation relies on $\theta$ being in radians.
3.  **Incorrectly Identifying $L$:** $L$ is the length from the pivot point to the *center of mass* of the pendulum bob. For a simple pendulum, the bob is assumed to be a point mass, so it's just the string length. For a physical pendulum, this is more complex.
4.  **Mixing Up $g$ and $G$:** $g$ is the acceleration due to gravity (approximately $9.81 \text{ m/s}^2$ on Earth). $G$ is the universal gravitational constant ($6.67 \times 10^{-11} \text{ N m}^2/\text{kg}^2$). They are distinct.
5.  **Algebraic Errors in Rearranging:** When solving for $L$ or $g$, students often make mistakes like forgetting to square $2\pi$ or taking the square root of only part of the expression. Always isolate the square root term *before* squaring.
6.  **Ignoring Units:** Not tracking units throughout the calculation can lead to nonsensical answers. $L$ must be in meters, $g$ in m/s$^2$, for $T$ to be in seconds.

## 7. Textbook-precise explanation

The motion of a simple pendulum, defined as a point mass $m$ suspended by a massless, inextensible string of length $L$ from a frictionless pivot, can be described by applying Newton's Second Law for rotational motion.

Let $\theta$ be the angular displacement of the pendulum from the vertical equilibrium position. The forces acting on the mass $m$ are the tension $T_{string}$ in the string, directed towards the pivot, and the gravitational force $mg$, directed vertically downwards.

Considering torques about the pivot point, the tension force produces no torque as its line of action passes through the pivot. The gravitational force $mg$ produces a torque $\tau$. The component of gravity perpendicular to the string is $mg\sin\theta$. The lever arm is $L$. Therefore, the restoring torque is:
$$\tau = -L(mg\sin\theta)$$
The negative sign indicates that the torque acts in the opposite direction to the angular displacement $\theta$, always attempting to restore the pendulum to equilibrium ($\theta=0$).

According to Newton's Second Law for rotation, $\tau = I\alpha$, where $I$ is the moment of inertia and $\alpha$ is the angular acceleration. For a point mass $m$ at a distance $L$ from the pivot, $I = mL^2$. The angular acceleration $\alpha$ is given by $\frac{d^2\theta}{dt^2}$.
Thus, we have:
$$-mgL\sin\theta = mL^2 \frac{d^2\theta}{dt^2}$$
Dividing both sides by $mL^2$ and rearranging, we obtain the differential equation of motion:
$$\frac{d^2\theta}{dt^2} + \frac{g}{L}\sin\theta = 0$$
This is a non-linear second-order differential equation, and its exact solution involves elliptic integrals, indicating that the motion is not strictly Simple Harmonic Motion (SHM) for arbitrary angles.

However, for small angular displacements, we can employ the small angle approximation. The Taylor series expansion for $\sin\theta$ around $\theta=0$ is $\sin\theta = \theta - \frac{\theta^3}{3!} + \frac{\theta^5}{5!} - \dots$. For sufficiently small angles (typically $\theta \lesssim 15^\circ$ or $0.26 \text{ rad}$), the higher-order terms become negligible, and we can approximate $\sin\theta \approx \theta$ (where $\theta$ is in radians).

Applying this approximation to the differential equation:
$$\frac{d^2\theta}{dt^2} + \frac{g}{L}\theta = 0$$
or
$$\frac{d^2\theta}{dt^2} = -\left(\frac{g}{L}\right)\theta$$
This is the standard form of the differential equation for Simple Harmonic Motion, $ \frac{d^2x}{dt^2} = -\omega^2 x $, where $x$ is the displacement and $\omega$ is the angular frequency. By direct comparison, we identify the angular frequency squared for the simple pendulum as:
$$\omega^2 = \frac{g}{L}$$
Therefore, the angular frequency is:
$$\omega = \sqrt{\frac{g}{L}}$$
The period $T$ of oscillation for SHM is related to the angular frequency by $T = \frac{2\pi}{\omega}$. Substituting the expression for $\omega$:
$$T = \frac{2\pi}{\sqrt{g/L}}$$
$$T = 2\pi \sqrt{\frac{L}{g}}$$
This formula gives the period of a simple pendulum under the small angle approximation. It demonstrates that the period is independent of the mass of the bob and the amplitude of oscillation (for small angles), depending only on the length of the string and the local acceleration due to gravity.

(Refer to: Serway & Jewett, Physics for Scientists and Engineers with Modern Physics, 10e, Chapter 15; Halliday, Resnick, & Walker, Fundamentals of Physics, 11e, Chapter 15)

## 8. ASCII diagrams

```text
       Pivot (P)
        |
        | L (length of string)
        |
        |
        |
        O  <-- Bob (mass m)
       /|\
      / | \
     /  |  \
    /   |   \
   /    |    \
  /     |     \
 /      |      \
---------|--------> x (horizontal displacement)
         |
         |  (Equilibrium position)
         |
         V (Direction of gravity, mg)

Diagram 1: Simple Pendulum at rest (equilibrium)

----------------------------------------------------

       Pivot (P)
        |
        | \
        |  \
        |   \ L
        |    \
        |     \
        |      O  <-- Bob (mass m)
        |       \
        |        \
        |         \
        |          \
        |           \
        |            \
        |             \
        |              \
        |               \
        V---------------O' (Displaced position)
          \            /
           \          /
            \        /
             \      /
              \    /
               \  /
                \/
             mg (total gravity force)
             |
             | Component along string (mg cosθ)
             |
             | Component tangential (mg sinθ)
             V

Diagram 2: Simple Pendulum displaced by angle θ

          Pivot (P)
           |
           |
           |
           |
           |-------> Tension (T_string)
           |      /
           |     /
           |    /
           |   / θ
           |  /
           | /
           O  <-- Bob (m)
          /|\
         / | \
        /  |  \
       /   |   \
      /    |    \
     /     |     \
    /      |      \
   |       |       |
   |       |       | mg (Gravity)
   |       |       |
   |       V       |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |
   |               |