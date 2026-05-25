## 1. What it is — in plain English

Imagine you're driving a car, and you turn the steering wheel a little bit. You expect the car to turn smoothly, maybe correct itself a bit, and then go in the new direction. That's a stable system. Now imagine you turn the wheel, and the car starts wobbling wildly, spinning out of control, or even flipping over. That's an unstable system.

In rocket science, we build complex systems like autopilots for rockets or satellites. These systems constantly take information (like the rocket's current tilt or speed), decide what to do (like fire a thruster), and then observe the result. This continuous loop of sensing, deciding, and acting is called a "feedback system."

The Nyquist stability criterion is like a special "pre-flight check" for these feedback systems. It's a clever mathematical trick that lets engineers predict if their rocket's autopilot will fly smoothly or spin out of control, all *before* they even build or test the physical system. It does this by drawing a special map, and then seeing if a particular "bad point" on that map gets circled.

This "bad point" is $(-1, 0)$ on a complex plane. If the map of our system's behavior "encircles" this point in a particular way, it's a warning sign: the system is unstable and will likely go haywire. If it doesn't, or encircles it in the "right" way, then the system is stable and will behave predictably.

## 2. Why it matters — real-world applications

The Nyquist stability criterion is a cornerstone of control system design, providing a powerful graphical tool to assess the stability of feedback systems. Its applications span numerous critical engineering domains:

1.  **Aerospace Engineering (Rocket & Aircraft Control):** This is perhaps its most direct and critical application. Autopilots for rockets (like SpaceX's Falcon 9 or NASA's SLS) and aircraft (like Boeing's 787 or Airbus's A350) rely heavily on stable control loops for attitude, altitude, and thrust vectoring. Nyquist analysis helps engineers ensure that small deviations don't lead to uncontrollable oscillations or divergence, which would result in catastrophic failure. It's used to design robust controllers that maintain stability across various flight conditions and uncertainties.

2.  **Robotics and Automation:** From industrial robotic arms (e.g., those by KUKA or FANUC) performing precision tasks to autonomous vehicles (like Waymo cars or Boston Dynamics robots), stability is paramount. A robot arm must move smoothly and stop precisely without overshooting or oscillating. Nyquist plots help design the feedback controllers that govern motor speeds, joint angles, and end-effector positions, preventing jerky movements, vibrations, or runaway behavior.

3.  **Power Systems and Grid Stability:** Modern electrical grids are massive, interconnected feedback systems. Maintaining stable voltage and frequency across a vast network, especially with the integration of renewable energy sources (solar, wind) and smart grid technologies, is a monumental control challenge. Nyquist analysis can be applied to models of power generators, transmission lines, and load controllers to ensure that local disturbances don't propagate into widespread blackouts or grid instability.

4.  **Electronics and Signal Processing:** High-performance amplifiers, active filters, and oscillators in electronic circuits are all feedback systems. For instance, an operational amplifier (op-amp) configured with feedback can become unstable and oscillate if not designed correctly. Nyquist analysis helps engineers determine the maximum gain or specific component values that can be used while maintaining stable operation, ensuring clear signal amplification without unwanted ringing or self-oscillation.

## 3. Prerequisites — what you must know first

Before diving deep into the Nyquist stability criterion, ensure you have a solid grasp of these foundational concepts:

*   **Complex Numbers:** Understanding real and imaginary parts, magnitude, phase, polar form ($re^{j\theta}$), and basic arithmetic operations (addition, multiplication, division).
*   **Laplace Transforms:** The ability to transform time-domain functions into the s-domain, understand the complex variable $s = \sigma + j\omega$, and work with transfer functions $G(s)$.
*   **Poles and Zeros:** Knowing that poles are values of $s$ where the transfer function $G(s)$ goes to infinity, and zeros are values where $G(s)$ goes to zero. Understanding their locations in the s-plane (left-half plane (LHP), right-half plane (RHP), imaginary axis) and their implications for system response.
*   **Feedback Control Systems:** Familiarity with open-loop and closed-loop systems, the concept of feedback, block diagrams, and the characteristic equation of a closed-loop system ($1 + G(s)H(s) = 0$).
*   **Frequency Response:** How a system responds to sinusoidal inputs of varying frequencies. This includes understanding magnitude and phase responses, and familiarity with Bode plots (gain and phase plots vs. frequency). The Nyquist plot is essentially a polar plot of frequency response.
*   **Conformal Mapping:** The idea that a complex function $F(s)$ maps points and contours from the s-plane to a new plane (the $F(s)$-plane) while preserving angles.
*   **Cauchy's Argument Principle:** This is the mathematical bedrock of the Nyquist criterion. It states that for a complex function $F(s)$ and a closed contour $\Gamma_s$ in the s-plane, the number of encirclements $N$ of the origin by the mapped contour $\Gamma_F$ in the $F(s)$-plane is given by $N = Z - P$, where $Z$ is the number of zeros of $F(s)$ inside $\Gamma_s$ and $P$ is the number of poles of $F(s)$ inside $\Gamma_s$. (The direction of encirclement matters: counter-clockwise is usually positive).

## 4. The core idea — step by step

The Nyquist stability criterion provides a graphical method to determine the stability of a closed-loop control system from its open-loop transfer function $G(s)H(s)$. It cleverly uses the Argument Principle to count the number of unstable closed-loop poles.

### Step 1: The Problem — Closed-Loop Stability from Open-Loop Data

*   **Plain English:** We have a system (like a rocket's engine control) that uses feedback. We can easily measure or calculate its "open-loop" behavior (what it does without the feedback loop closed). But what we really care about is its "closed-loop" behavior (what it does when the feedback is active). How can we tell if the closed-loop system will be stable just by looking at the open-loop behavior?
*   **Small Concrete Example:** Imagine you're designing an autopilot. You know how the thrusters respond to a command (open-loop). You want to know if, when you connect the sensors and the computer to form a full autopilot, the rocket will fly straight or tumble.
*   **Formal/Mathematical Version:** A closed-loop system's stability is determined by the locations of the roots of its characteristic equation:
    $$1 + G(s)H(s) = 0$$
    These roots are the closed-loop poles. If any closed-loop pole lies in the Right-Half Plane (RHP) of the s-plane (i.e., has a positive real part), the system is unstable. We want to find the number of RHP roots of $1 + G(s)H(s) = 0$.
*   **What could go wrong:** Directly finding the roots of $1 + G(s)H(s) = 0$ can be algebraically complex for high-order systems. We need a simpler, graphical method.

### Step 2: The Nyquist Contour — Mapping the "Bad" Region

*   **Plain English:** To check for unstable poles, we need to examine the "bad" region of the s-plane, which is the Right-Half Plane (RHP). We draw a special, very large closed path, called the Nyquist contour, that completely encloses the entire RHP. We then see what this path looks like when mapped by our system's transfer function.
*   **Small Concrete Example:** Think of the RHP as a forbidden zone. The Nyquist contour is a fence built around this zone. We're going to use this fence to count how many "bad guys" (unstable poles) are inside.
*   **Formal/Mathematical Version:** The Nyquist contour $\Gamma_s$ is a large semicircle in the s-plane with radius $R \to \infty$. It consists of:
    1.  The imaginary axis: $s = j\omega$ for $\omega$ from $0^+$ to $\infty$.
    2.  An arc of infinite radius: $s = Re^{j\theta}$ for $\theta$ from $\pi/2$ to $-\pi/2$ as $R \to \infty$.
    3.  The imaginary axis: $s = j\omega$ for $\omega$ from $-\infty$ to $0^-$.
    4.  Small semicircular indentations around any poles of $G(s)H(s)$ that lie on the imaginary axis (e.g., at $s=0$ or $s=\pm j\omega_0$). These indentations have radius $\epsilon \to 0$.
*   **What could go wrong:** Forgetting to indent around poles on the imaginary axis will lead to incorrect results, as the Argument Principle requires the contour not to pass through any poles or zeros of the function being mapped.

### Step 3: Cauchy's Argument Principle — Counting Encirclements

*   **Plain English:** This is the mathematical engine behind Nyquist. It says: if you draw a closed loop in one plane, and then map that loop using a complex function to another plane, the number of times the mapped loop circles the origin in the second plane tells you how many "special points" (zeros minus poles) of the function were inside your original loop.
*   **Small Concrete Example:** Imagine drawing a circle around a magnet on a table. If you then use a compass to trace out the magnetic field as you move the compass around that circle, the number of times the compass needle spins 360 degrees tells you if there's a magnet inside the circle, and how many.
*   **Formal/Mathematical Version:** For a function $F(s)$ and a closed contour $\Gamma_s$ that does not pass through any poles or zeros of $F(s)$, the number of encirclements $N$ of the origin by the mapped contour $\Gamma_F$ in the $F(s)$-plane is given by:
    $$N = Z - P$$
    where $Z$ is the number of zeros of $F(s)$ inside $\Gamma_s$, and $P$ is the number of poles of $F(s)$ inside $\Gamma_s$. Encirclements are counted positively for counter-clockwise rotations.
*   **What could go wrong:** Miscounting encirclements (e.g., confusing clockwise with counter-clockwise) or forgetting the $Z-P$ order will lead to incorrect stability conclusions.

### Step 4: Connecting to Closed-Loop Stability — The Critical Point

*   **Plain English:** We want to find the zeros of $1 + G(s)H(s)$. These are the closed-loop poles. Instead of looking for where $1 + G(s)H(s)$ maps to the origin, which is hard to visualize, we can look for where $G(s)H(s)$ maps to a specific "critical point."
*   **Small Concrete Example:** If you want to know when $X+Y=0$, it's the same as knowing when $X = -Y$. So, if we want to know when $1 + G(s)H(s) = 0$, it's the same as knowing when $G(s)H(s) = -1$. This means that encirclements of the origin by $1 + G(s)H(s)$ are equivalent to encirclements of the point $(-1, 0)$ by $G(s)H(s)$.
*   **Formal/Mathematical Version:** We apply Cauchy's Argument Principle to the function $F(s) = 1 + G(s)H(s)$. The zeros of $F(s)$ are the closed-loop poles, and the poles of $F(s)$ are the open-loop poles of $G(s)H(s)$.
    So, $N = Z_{CL} - P_{OL}$, where $Z_{CL}$ are closed-loop RHP poles and $P_{OL}$ are open-loop RHP poles.
    The contour $\Gamma_F$ is the mapping of the Nyquist contour by $F(s)$. However, plotting $F(s) = 1 + G(s)H(s)$ means simply shifting the plot of $G(s)H(s)$ by 1 unit to the right. Therefore, encirclements of the origin by $F(s)$ are equivalent to encirclements of the point $(-1, 0)$ by $G(s)H(s)$.
*   **What could go wrong:** Confusing the origin with the critical point $(-1, 0)$ is a common error. Always remember we are plotting $G(s)H(s)$ and checking for encirclements of $(-1, 0)$.

### Step 5: The Nyquist Stability Criterion — The Final Rule

*   **Plain English:** Here's the rule: Count how many "bad" (RHP) poles your open-loop system already has ($P_{OL}$). Then, draw the special map (the Nyquist plot) of your open-loop system. Count how many times this map circles the critical point $(-1, 0)$ in the counter-clockwise direction ($N$). For your closed-loop system to be stable, the number of encirclements ($N$) must exactly cancel out the number of initial bad poles ($P_{OL}$). If it doesn't, you have unstable closed-loop poles.
*   **Small Concrete Example:** If your open-loop system has 1 pole in the RHP ($P_{OL}=1$), then for the closed-loop system to be stable, its Nyquist plot must encircle $(-1, 0)$ *once* in the *counter-clockwise* direction ($N=1$). If $P_{OL}=0$, then $N$ must be $0$.
*   **Formal/Mathematical Version:** The Nyquist Stability Criterion states that for a closed-loop system to be stable, the number of zeros of $1 + G(s)H(s)$ in the RHP ($Z_{CL}$) must be zero. Using Cauchy's Argument Principle, $N = Z_{CL} - P_{OL}$, where $N$ is the number of counter-clockwise encirclements of $(-1, 0)$ by the Nyquist plot of $G(s)H(s)$, and $P_{OL}$ is the number of poles of $G(s)H(s)$ in the RHP.
    Therefore, for stability ($Z_{CL}=0$), we must have:
    $$N = P_{OL}$$
    If $N \neq P_{OL}$, then $Z_{CL} \neq 0$, meaning there are unstable closed-loop poles, and the system is unstable.
*   **What could go wrong:** Incorrectly determining $P_{OL}$ (the number of open-loop RHP poles) or miscounting $N$ (the number of counter-clockwise encirclements of -1) are the most frequent sources of error. Remember to count poles on the imaginary axis correctly during the contour construction, but they are not counted in $P_{OL}$ unless the contour is specifically modified to include them (which it isn't for $P_{OL}$).

## 5. Worked examples — multiple, with every step shown

### Example 1: Simple Stable System

**Problem:** Determine the stability of the closed-loop system with the open-loop transfer function $G(s)H(s) = \frac{1}{s+1}$.

**Given:** Open-loop transfer function $G(s)H(s) = \frac{1}{s+1}$.
**Want:** Determine if the closed-loop system is stable using the Nyquist criterion.

**Step 1: Identify open-loop poles in the RHP ($P_{OL}$).**
The poles of $G(s)H(s)$ are the roots of the denominator: $s+1=0 \implies s=-1$.
This pole is at $s=-1$, which is in the Left-Half Plane (LHP).
Therefore, the number of open-loop poles in the RHP is $P_{OL} = 0$.

**Step 2: Construct the Nyquist contour and analyze its mapping.**
The Nyquist contour $\Gamma_s$ encloses the entire RHP. Since there are no poles on the imaginary axis, no indentations are needed.

*   **Segment 1: $s = j\omega$ for $\omega \in [0, \infty)$**
    Substitute $s=j\omega$ into $G(s)H(s)$:
    $$G(j\omega)H(j\omega) = \frac{1}{j\omega+1}$$
    To plot this, we find its magnitude and phase:
    $$|G(j\omega)H(j\omega)| = \frac{|1|}{|j\omega+1|} = \frac{1}{\sqrt{\omega^2+1}}$$
    $$\angle G(j\omega)H(j\omega) = \angle(1) - \angle(j\omega+1) = 0 - \arctan(\omega/1) = -\arctan(\omega)$$
    Let's evaluate at key points:
    - As $\omega \to 0^+$:
        $|G(j\omega)H(j\omega)| \to \frac{1}{\sqrt{0+1}} = 1$
        $\angle G(j\omega)H(j\omega) \to -\arctan(0) = 0^\circ$
        So, the plot starts at $(1, 0)$ in the $G(s)H(s)$ plane.
    - As $\omega \to \infty$:
        $|G(j\omega)H(j\omega)| \to \frac{1}{\sqrt{\infty+1}} = 0$
        $\angle G(j\omega)H(j\omega) \to -\arctan(\infty) = -90^\circ$
        So, the plot approaches the origin along the negative imaginary axis.

*   **Segment 2: $s = Re^{j\theta}$ for $R \to \infty$, $\theta \in [\pi/2, -\pi/2]$**
    As $R \to \infty$, $|s| \to \infty$.
    $$G(s)H(s) = \frac{1}{s+1} \approx \frac{1}{s}$$
    As $s \to \infty$, $G(s)H(s) \to 0$. The entire large semicircle maps to the origin in the $G(s)H(s)$ plane.

*   **Segment 3: $s = j\omega$ for $\omega \in [-\infty, 0)$**
    This segment is the complex conjugate of Segment 1. The plot for negative $\omega$ will be the mirror image of the plot for positive $\omega$ across the real axis.
    It starts from the origin (at $-90^\circ$ from Segment 1), goes to $(1, 0)$ (at $0^\circ$).

**Step 3: Plot the Nyquist contour in the $G(s)H(s)$ plane.**
The plot starts at $(1,0)$, moves clockwise towards the origin, reaching it at $-90^\circ$. Then, its mirror image continues from the origin at $90^\circ$ and moves counter-clockwise back to $(1,0)$. The large semicircle maps to the origin.

```text
       ^ Im
       |
       |
       +------o (1,0)  <-- start (omega=0)
       |     /
       |    /
       |   /
       |  /
       | /
<------o-----> Re
      / \
     /   \
    /     \
   /       \
  o---------o (Origin) <-- end (omega=inf)
       |
       |
```
The plot does not enclose the point $(-1, 0)$.

**Step 4: Count the number of encirclements ($N$) of $(-1, 0)$.**
From the plot, the point $(-1, 0)$ is not encircled by the Nyquist contour.
Therefore, $N = 0$.

**Step 5: Apply the Nyquist Stability Criterion ($N = P_{OL}$).**
We have $P_{OL} = 0$ and $N = 0$.
Since $N = P_{OL}$ ($0 = 0$), the closed-loop system is stable.

**Final Answer:** The closed-loop system with $G(s)H(s) = \frac{1}{s+1}$ is **stable**.

**Reflection:** This was an easy example because there were no open-loop RHP poles and no poles on the imaginary axis, simplifying the contour. The Nyquist plot was a simple curve that stayed far from the critical point.

---

### Example 2: System with a pole at the origin (requires indentation)

**Problem:** Determine the stability of the closed-loop system with the open-loop transfer function $G(s)H(s) = \frac{1}{s(s+1)}$.

**Given:** Open-loop transfer function $G(s)H(s) = \frac{1}{s(s+1)}$.
**Want:** Determine if the closed-loop system is stable using the Nyquist criterion.

**Step 1: Identify open-loop poles in the RHP ($P_{OL}$).**
The poles of $G(s)H(s)$ are the roots of $s(s+1)=0 \implies s=0, s=-1$.
The pole at $s=0$ is on the imaginary axis. The pole at $s=-1$ is in the LHP.
Therefore, the number of open-loop poles in the RHP is $P_{OL} = 0$.

**Step 2: Construct the Nyquist contour and analyze its mapping.**
The Nyquist contour $\Gamma_s$ encloses the entire RHP. Since there is a pole at $s=0$ (on the imaginary axis), we need to indent around it.

*   **Segment 1: Small semicircle around $s=0$ ($s = \epsilon e^{j\phi}$ for $\epsilon \to 0$, $\phi \in [-\pi/2, \pi/2]$)**
    Let $s = \epsilon e^{j\phi}$. As $\epsilon \to 0$, $G(s)H(s) \approx \frac{1}{\epsilon e^{j\phi}(1)} = \frac{1}{\epsilon} e^{-j\phi}$.
    - As $\phi$ goes from $-\pi/2$ to $\pi/2$ (clockwise around the origin in the s-plane):
        - At $\phi = -\pi/2$ (just below origin): $G(s)H(s) \approx \frac{1}{\epsilon} e^{j\pi/2}$ (large magnitude, $+90^\circ$)
        - At $\phi = 0$ (real axis): $G(s)H(s) \approx \frac{1}{\epsilon} e^{j0}$ (large magnitude, $0^\circ$)
        - At $\phi = \pi/2$ (just above origin): $G(s)H(s) \approx \frac{1}{\epsilon} e^{-j\pi/2}$ (large magnitude, $-90^\circ$)
    This segment maps to a large semicircle in the $G(s)H(s)$ plane, with infinite radius, sweeping from $+90^\circ$ to $-90^\circ$ in a clockwise direction.

*   **Segment 2: $s = j\omega$ for $\omega \in [0^+, \infty)$**
    Substitute $s=j\omega$ into $G(s)H(s)$:
    $$G(j\omega)H(j\omega) = \frac{1}{j\omega(j\omega+1)} = \frac{1}{-\omega^2+j\omega}$$
    Multiply by conjugate:
    $$G(j\omega)H(j\omega) = \frac{1}{-\omega^2+j\omega} \times \frac{-\omega^2-j\omega}{-\omega^2-j\omega} = \frac{-\omega^2-j\omega}{\omega^4+\omega^2} = \frac{-1}{\omega^2+1} - j\frac{1}{\omega(\omega^2+1)}$$
    Let's evaluate at key points:
    - As $\omega \to 0^+$ (just above origin):
        $G(j\omega)H(j\omega) \approx \frac{1}{j\omega(1)} = \frac{1}{j\omega} = -j\frac{1}{\omega}$.
        This corresponds to a point with large negative imaginary part, approaching $-\infty$ along the negative imaginary axis. This matches the end of Segment 1 (which was at $-90^\circ$).
    - As $\omega \to \infty$:
        $|G(j\omega)H(j\omega)| \to \frac{1}{|j\omega|^2} = \frac{1}{\omega^2} \to 0$
        $\angle G(j\omega)H(j\omega) = \angle(1) - \angle(j\omega) - \angle(j\omega+1) = 0 - 90^\circ - 90^\circ = -180^\circ$
        So, the plot approaches the origin from the negative real axis.

*   **Segment 3: $s = Re^{j\theta}$ for $R \to \infty$, $\theta \in [\pi/2, -\pi/2]$**
    As $R \to \infty$, $|s| \to \infty$.
    $$G(s)H(s) = \frac{1}{s(s+1)} \approx \frac{1}{s^2}$$
    As $s \to \infty$, $G(s)H(s) \to 0$. The entire large semicircle maps to the origin in the $G(s)H(s)$ plane.

*   **Segment 4: $s = j\omega$ for $\omega \in [-\infty, 0^-)$**
    This segment is the complex conjugate of Segment 2. The plot for negative $\omega$ will be the mirror image of the plot for positive $\omega$ across the real axis.
    It starts from the origin (at $-180^\circ$ from Segment 2), then moves along the positive imaginary axis to $+\infty$ (at $90^\circ$). This matches the start of Segment 1.

**Step 3: Plot the Nyquist contour in the $G(s)H(s)$ plane.**
The plot starts as a large clockwise semicircle from $90^\circ$ to $-90^\circ$ (due to indentation). From $-90^\circ$, it moves up from $-\infty$ along the negative imaginary axis, crosses the real axis at some point (where the imaginary part is zero, which happens when $\omega \to \infty$ for this function, so it approaches 0), and then approaches the origin from $-180^\circ$. The mirror image then completes the loop.

```text
           ^ Im
           |
           |
           o (from indentation, large positive Im)
          / \
         /   \
        |     |
        |     |
        |     |
        |     |
  <-----X-----o-----> Re
       (-1,0) |
              |
              |
              |
              |
             \ /
              o (from indentation, large negative Im)
```
The plot starts at large positive imaginary values, moves clockwise through large positive real values, then large negative imaginary values (this is the indentation around the origin). Then, from large negative imaginary values, it traces the curve for $s=j\omega$, moving towards the origin and approaching it from the negative real axis. The overall plot does not encircle the point $(-1, 0)$.

**Step 4: Count the number of encirclements ($N$) of $(-1, 0)$.**
From the plot, the critical point $(-1, 0)$ is not encircled.
Therefore, $N = 0$.

**Step 5: Apply the Nyquist Stability Criterion ($N = P_{OL}$).**
We have $P_{OL} = 0$ and $N = 0$.
Since $N = P_{OL}$ ($0 = 0$), the closed-loop system is stable.

**Final Answer:** The closed-loop system with $G(s)H(s) = \frac{1}{s(s+1)}$ is **stable**.

**Reflection:** The key challenge here was correctly handling the pole at the origin with an indentation. The indentation creates a large semicircle in the $G(s)H(s)$ plane, which significantly impacts the overall shape of the Nyquist plot. It's crucial to correctly determine the direction of this large arc.

---

### Example 3: Unstable System (with RHP open-loop pole)

**Problem:** Determine the stability of the closed-loop system with the open-loop transfer function $G(s)H(s) = \frac{10}{(s-1)(s+2)}$.

**Given:** Open-loop transfer function $G(s)H(s) = \frac{10}{(s-1)(s+2)}$.
**Want:** Determine if the closed-loop system is stable using the Nyquist criterion.

**Step 1: Identify open-loop poles in the RHP ($P_{OL}$).**
The poles are the roots of $(s-1)(s+2)=0 \implies s=1, s=-2$.
The pole at $s=1$ is in the Right-Half Plane (RHP). The pole at $s=-2$ is in the LHP.
Therefore, the number of open-loop poles in the RHP is $P_{OL} = 1$.
For stability, we require $N = P_{OL} = 1$ (one counter-clockwise encirclement of -1).

**Step 2: Construct the Nyquist contour and analyze its mapping.**
No poles on the imaginary axis, so no indentations.

*   **Segment 1: $s = j\omega$ for $\omega \in [0, \infty)$**
    Substitute $s=j\omega$:
    $$G(j\omega)H(j\omega) = \frac{10}{(j\omega-1)(j\omega+2)} = \frac{10}{(-\omega^2 + j\omega - 2j\omega - 2)} = \frac{10}{(-\omega^2 - 2 - j\omega)}$$
    $$G(j\omega)H(j\omega) = \frac{10}{(-\omega^2 - 2 - j\omega)} \times \frac{(-\omega^2 - 2 + j\omega)}{(-\omega^2 - 2 + j\omega)} = \frac{10(-\omega^2 - 2 + j\omega)}{(\omega^2+2)^2 + \omega^2}$$
    Let's evaluate at key points:
    - As $\omega \to 0^+$:
        $G(j\omega)H(j\omega) = \frac{10}{(-1)(2)} = \frac{10}{-2} = -5$.
        So, the plot starts at $(-5, 0)$ on the real axis.
    - Find where it crosses the real axis again (if ever). This happens when the imaginary part is zero.
        The imaginary part is $\frac{10\omega}{(\omega^2+2)^2 + \omega^2}$. This is zero only if $\omega=0$ (which we already used) or $\omega \to \infty$. So it doesn't cross the real axis for $\omega > 0$.
    - As $\omega \to \infty$:
        $|G(j\omega)H(j\omega)| \approx \frac{10}{|j\omega|^2} = \frac{10}{\omega^2} \to 0$
        $\angle G(j\omega)H(j\omega) = \angle(10) - \angle(j\omega-1) - \angle(j\omega+2)$
        As $\omega \to \infty$: $0 - 90^\circ - 90^\circ = -180^\circ$.
        So, the plot approaches the origin along the negative real axis.

*   **Segment 2: $s = Re^{j\theta}$ for $R \to \infty$, $\theta \in [\pi/2, -\pi/2]$**
    As $R \to \infty$, $G(s)H(s) \approx \frac{10}{s^2} \to 0$. The large semicircle maps to the origin.

*   **Segment 3: $s = j\omega$ for $\omega \in [-\infty, 0)$**
    This is the complex conjugate of Segment 1. It starts from the origin along the negative real axis and moves to $(-5, 0)$.

**Step 3: Plot the Nyquist contour in the $G(s)H(s)$ plane.**
The plot starts at $(-5, 0)$, moves into the third quadrant (negative real, negative imaginary), approaches the origin from $-180^\circ$. Its mirror image starts from the origin (at $180^\circ$), moves into the second quadrant (negative real, positive imaginary), and finishes at $(-5, 0)$. The overall plot is a closed loop starting and ending at $(-5,0)$.

```text
       ^ Im
       |
       |     * (-1,0)
       |   /   \
       |  /     \
       o-o-------o-----> Re
       ^ \       /
       |  \     /
       |   \   /
       |    o
       |
```
The plot starts at $(-5,0)$, goes down into the 3rd quadrant, approaches origin from $-180^\circ$. The return path from $-\infty$ to $0^-$ is the mirror image, from origin ($180^\circ$) up into the 2nd quadrant, back to $(-5,0)$. The critical point $(-1,0)$ is *inside* this loop.

**Step 4: Count the number of encirclements ($N$) of $(-1, 0)$.**
The plot starts at $(-5,0)$, goes into the lower half-plane, then to the origin. The full contour (including the negative $\omega$ part) makes one *clockwise* encirclement of the origin.
A clockwise encirclement corresponds to $N = -1$.

**Step 5: Apply the Nyquist Stability Criterion ($N = P_{OL}$).**
We have $P_{OL} = 1$ and $N = -1$.
Since $N \neq P_{OL}$ ($-1 \neq 1$), the closed-loop system is unstable.
Specifically, $Z_{CL} = P_{OL} - N = 1 - (-1) = 2$. This means there are 2 closed-loop poles in the RHP.

**Final Answer:** The closed-loop system with $G(s)H(s) = \frac{10}{(s-1)(s+2)}$ is **unstable**.

**Reflection:** This example highlights the importance of correctly identifying $P_{OL}$ and the direction of encirclements. A clockwise encirclement means a negative $N$, which in this case, confirms instability as $N$ does not match $P_{OL}$. The system's open-loop instability ($s=1$) was not "cancelled out" by the feedback in the right way.

---

### Example 4: System with multiple poles at the origin

**Problem:** Determine the stability of the closed-loop system with the open-loop transfer function $G(s)H(s) = \frac{1}{s^2}$.

**Given:** Open-loop transfer function $G(s)H(s) = \frac{1}{s^2}$.
**Want:** Determine if the closed-loop system is stable using the Nyquist criterion.

**Step 1: Identify open-loop poles in the RHP ($P_{OL}$).**
The poles are the roots of $s^2=0 \implies s=0$ (a pole of multiplicity 2).
Both poles are at $s=0$, which is on the imaginary axis.
Therefore, $P_{OL} = 0$.
For stability, we require $N = P_{OL} = 0$ (no encirclements of -1).

**Step 2: Construct the Nyquist contour and analyze its mapping.**
Since there are poles at $s=0$, we need to indent around them.

*   **Segment 1: Small semicircle around $s=0$ ($s = \epsilon e^{j\phi}$ for $\epsilon \to 0$, $\phi \in [-\pi/2, \pi/2]$)**
    Let $s = \epsilon e^{j\phi}$. As $\epsilon \to 0$, $G(s)H(s) = \frac{1}{(\epsilon e^{j\phi})^2} = \frac{1}{\epsilon^2} e^{-j2\phi}$.
    - As $\phi$ goes from $-\pi/2$ to $\pi/2$ (clockwise around the origin in the s-plane):
        - At $\phi = -\pi/2$: $G(s)H(s) \approx \frac{1}{\epsilon^2} e^{j\pi}$ (large magnitude, $-180^\circ$)
        - At $\phi = 0$: $G(s)H(s) \approx \frac{1}{\epsilon^2} e^{j0}$ (large magnitude, $0^\circ$)
        - At $\phi = \pi/2$: $G(s)H(s) \approx \frac{1}{\epsilon^2} e^{-j\pi}$ (large magnitude, $-180^\circ$)
    This segment maps to a large semicircle in the $G(s)H(s)$ plane, with infinite radius, sweeping from $-180^\circ$ (via $0^\circ$) to $-180^\circ$ again, effectively making one full clockwise rotation.

*   **Segment 2: $s = j\omega$ for $\omega \in [0^+, \infty)$**
    Substitute $s=j\omega$:
    $$G(j\omega)H(j\omega) = \frac{1}{(j\omega)^2} = \frac{1}{-\omega^2} = -\frac{1}{\omega^2}$$
    - As $\omega \to 0^+$: $G(j\omega)H(j\omega) \to -\infty$. (Approaches from $-180^\circ$, matching end of Segment 1).
    - As $\omega \to \infty$: $G(j\omega)H(j\omega) \to 0$. (Approaches from $-180^\circ$).
    This segment maps to the negative real axis, starting from $-\infty$ and moving towards the origin.

*   **Segment 3: $s = Re^{j\theta}$ for $R \to \infty$, $\theta \in [\pi/2, -\pi/2]$**
    As $R \to \infty$, $G(s)H(s) = \frac{1}{s^2} \to 0$. The large semicircle maps to the origin.

*   **Segment 4: $s = j\omega$ for $\omega \in [-\infty, 0^-)$**
    This is the complex conjugate of Segment 2. For negative $\omega$, $(j\omega)^2 = -\omega^2$, so $G(j\omega)H(j\omega)$ is still $-\frac{1}{\omega^2}$.
    This segment also maps to the negative real axis, starting from $-\infty$ and moving towards the origin.

**Step 3: Plot the Nyquist contour in the $G(s)H(s)$ plane.**
The plot starts with the indentation, which is a large clockwise semicircle from $-180^\circ$ (via $0^\circ$) back to $-180^\circ$. This is one full clockwise encirclement.
Then, from $-\infty$ on the real axis, the $j\omega$ segment moves along the negative real axis to the origin. The mirror image also moves from $-\infty$ to the origin along the negative real axis.

```text
       ^ Im
       |
       |
       |
       |     * (-1,0)
       |    / \
       |   /   \
       |  /     \
   <---o-o-------o-----> Re
       ^ \       /
       |  \     /
       |   \   /
       |    o
       |
```
The large clockwise arc from the indentation means the plot starts at a very large negative real value, sweeps through positive real values, then back to very large negative real values. This already encircles $(-1,0)$ once clockwise. Then the $j\omega$ segments trace from $-\infty$ to $0$ along the negative real axis, effectively closing the loop.

**Step 4: Count the number of encirclements ($N$) of $(-1, 0)$.**
The indentation alone causes one full clockwise encirclement of the origin. Since $G(s)H(s)$ starts at $-180^\circ$ (real axis, very negative), goes through $0^\circ$ (real axis, very positive), and returns to $-180^\circ$ (real axis, very negative), it makes one clockwise revolution.
Thus, $N = -1$.

**Step 5: Apply the Nyquist Stability Criterion ($N = P_{OL}$).**
We have $P_{OL} = 0$ and $N = -1$.
Since $N \neq P_{OL}$ ($-1 \neq 0$), the closed-loop system is unstable.
Specifically, $Z_{CL} = P_{OL} - N = 0 - (-1) = 1$. This means there is 1 closed-loop pole in the RHP.

**Final Answer:** The closed-loop system with $G(s)H(s) = \frac{1}{s^2}$ is **unstable**.

**Reflection:** This example shows that even if $P_{OL}=0$, the system can still be unstable if the Nyquist plot encircles $(-1,0)$ (in this case, clockwise). The double pole at the origin leads to a $-180^\circ$ phase shift at high frequencies, which is a common cause of instability. The indentation mapping can be tricky to visualize correctly.

## 6. Common mistakes and traps

1.  **Incorrectly identifying $P_{OL}$:** $P_{OL}$ refers *only* to the poles of the *open-loop* transfer function $G(s)H(s)$ that are located in the *Right-Half Plane (RHP)*. Poles on the imaginary axis are *not* counted in $P_{OL}$.
2.  **Forgetting or mis-mapping indentations:** If $G(s)H(s)$ has poles on the imaginary axis (e.g., at $s=0$ or $s=\pm j\omega_c$), the Nyquist contour must be indented around them. Failing to do so or incorrectly mapping these small semicircles into the $G(s)H(s)$ plane will lead to an incorrect Nyquist plot and thus an incorrect count of encirclements.
3.  **Confusing clockwise and counter-clockwise encirclements:** The Argument Principle defines counter-clockwise as positive. Some textbooks define $N$ as the number of *clockwise* encirclements, which would flip the sign in $N = Z - P$. Always be consistent with your chosen convention (e.g., $N = P_{OL}$ for counter-clockwise, or $N = -P_{OL}$ for clockwise).
4.  **Misinterpreting the critical point:** The Nyquist criterion checks encirclements of the point $(-1, 0)$ in the $G(s)H(s)$ plane, *not* the origin. This is a direct consequence of analyzing $1 + G(s)H(s) = 0$.
5.  **Incorrectly mapping the infinite semicircle:** For most practical systems (strictly proper transfer functions, where the degree of the denominator is greater than the degree of the numerator), the large semicircle of the Nyquist contour maps to the origin in the $G(s)H(s)$ plane. However, if the system is not strictly proper (e.g., degree of numerator $\geq$ degree of denominator), this segment might map to a point other than the origin, or even a large arc.
6.  **Graphical interpretation errors:** Sketching the Nyquist plot accurately requires careful evaluation of $G(j\omega)H(j\omega)$ at $\omega=0$, $\omega \to \infty$, and where the plot crosses the real and imaginary axes. A rough sketch can easily lead to miscounting encirclements.

## 7. Textbook-precise explanation

The Nyquist stability criterion is a powerful tool in control theory, derived from Cauchy's Argument Principle in complex analysis. It provides a graphical method to determine the stability of a closed-loop system from its open-loop transfer function.

Let the open-loop transfer function be $L(s) = G(s)H(s)$. The characteristic equation of the closed-loop system is given by:
$$1 + L(s) = 0$$
The roots of this characteristic equation are the closed-loop poles. For the closed-loop system to be stable, all these roots (closed-loop poles) must lie in the Left-Half Plane (LHP) of the s-plane.

Consider the function $F(s) = 1 + L(s)$. The zeros of $F(s)$ are the closed-loop poles, and the poles of $F(s)$ are the open-loop poles of $L(s)$.
Let $\Gamma_s$ be the Nyquist contour in the s-plane. This contour is a large D-shaped path that encloses the entire Right-Half Plane (RHP). It consists of:
1.  The imaginary axis, $s = j\omega$, from $\omega=0^+$ to $\omega=\infty$.
2.  A large semicircle of radius $R \to \infty$, $s = Re^{j\theta}$, where $\theta$ varies from $\pi/2$ to $-\pi/2$.
3.  The imaginary axis, $s = j\omega$, from $\omega=\infty$ to $\omega=0^-$.
4.  Small semicircular indentations of radius $\epsilon \to 0$ around any poles of $L(s)$ that lie on the imaginary axis (e.g., at $s=0$ or $s=\pm j\omega_0$). These indentations ensure that $\Gamma_s$ does not pass through any poles of $F(s)$.

According to **Cauchy's Argument Principle** (e.g., *Churchill & Brown, Complex Variables and Applications, 9e, §7.1*), if a function $F(s)$ is analytic inside and on a simple closed contour $\Gamma_s$, except for a finite number of poles inside $\Gamma_s$, then the number of encirclements $N$ of the origin by the mapping $F(\Gamma_s)$ in the $F(s)$-plane is given by:
$$N = Z - P$$
where $Z$ is the number of zeros of $F(s)$ inside $\Gamma_s$ and $P$ is the number of poles of $F(s)$ inside $\Gamma_s$. Encirclements are counted positively for counter-clockwise rotations.

Applying this to $F(s) = 1 + L(s)$:
*   $Z$ represents the number of zeros of $1 + L(s)$ inside the Nyquist contour, which are the closed-loop poles in the RHP ($Z_{CL}$).
*   $P$ represents the number of poles of $1 + L(s)$ inside the Nyquist contour, which are the open-loop poles of $L(s)$ in the RHP ($P_{OL}$).
*   $N$ represents the number of counter-clockwise encirclements of the origin by the plot of $1 + L(s)$.

Thus, the Argument Principle for our system becomes:
$$N = Z_{CL} - P_{OL}$$
For the closed-loop system to be stable, we require $Z_{CL} = 0$ (no closed-loop poles in the RHP). Substituting this into the equation, we get the **Nyquist Stability Criterion**:
$$N = P_{OL}$$
where $N$ is the number of counter-clockwise encirclements of the critical point $(-1, 0)$ by the Nyquist plot of $L(s) = G(s)H(s)$, and $P_{OL}$ is the number of poles of the open-loop transfer function $G(s)H(s)$ in the Right-Half Plane.

**Interpretation:**
*   If $N = P_{OL}$, the closed-loop system is stable.
*   If $N \neq P_{OL}$, the closed-loop system is unstable, and the number of unstable closed-loop poles is $Z_{CL} = P_{OL} - N$.

The Nyquist plot of $L(s)$ is the mapping of the Nyquist contour $\Gamma_s$ from the s-plane to the $L(s)$-plane. Encirclements of the origin by $1+L(s)$ are equivalent to encirclements of the point $(-1,0)$ by $L(s)$, because $1+L(s) = 0 \implies L(s) = -1$.

(Refer to *Ogata, Modern Control Engineering, 5e, Chapter 6* or *Dorf & Bishop, Modern Control Systems, 13e, Chapter 8* for detailed derivations and examples.)

## 8. ASCII diagrams

### 1. The Nyquist Contour in the s-plane

This diagram shows the "D-shaped" Nyquist contour in the complex s-plane. It encloses the entire Right-Half Plane (RHP). The small indentations around the origin indicate how to handle poles on the imaginary axis.

```text
       ^ Im(s)
       |
       |     +--------------------+
       |     |                    |
       |     |                    |
       |     |                    |
       |     |                    |
       |     |                    |
       |     |                    |
       |     |                    |
       |   C1|                    | C2 (R -> inf)
       o-----X--------------------o-----> Re(s)
       |   | |                    |
       |   | |                    |
       |   | |                    |
       |   | |                    |
       |   C3|                    | C4 (R -> inf)
       |     |                    |
       |     |                    |
       |     |                    |
       |     +--------------------+
       |
       V

Legend:
  o : Origin (s=0)
  X : Pole on imaginary axis (e.g., s=jω_0 or s=0)
  C1: Imaginary axis (ω from 0+ to inf)
  C2: Large semicircle (R -> inf, θ from π/2 to -π/2)
  C3: Imaginary axis (ω from -inf to 0-)
  C4: Small semicircle indentation around pole X (ε -> 0)
      (Example shows indentation around origin. If a pole is at +jω_0,
       the indentation would be a small semicircle around +jω_0.)
```

### 2. A Nyquist Plot in the G(s)H(s) plane (showing encirclement)

This diagram illustrates a typical Nyquist plot in the $G(s)H(s)$ plane, along with the critical point $(-1, 0)$. The plot for $\omega > 0$ is shown, and the full plot is completed by its mirror image for $\omega < 0$.

```text
       ^ Im(G(s)H(s))
       |
       |        /
       |       /
       |      /
       |     /
       |    /
       |   /
       |  /
       | /
------o-X---------------------> Re(G(s)H(s))
      |/
      o (-1,0)  <-- Critical Point
      |\
      | \
      |  \
      |   \
      |    \
      |     \
      |      \
      |       \
      V

Legend:
  o (-1,0) : The critical point.
  X        : The Nyquist plot of G(s)H(s) for ω > 0.
             (The full plot includes the mirror image for ω < 0,
             which would complete the loop shown here.)
             In this example, the plot encircles (-1,0) once
             in the counter-clockwise direction.
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    *   **"Naughty Pussycats Zapping!"**
        *   **N** (Naughty): Number of counter-clockwise **N**circlements of -1.
        *   **P** (Pussycats): Number of **P**oles of the **open-loop** system in the RHP.
        *   **Z** (Zapping): Number of **Z**eros of the **closed-loop** system in the RHP (which we want to be zero for stability).
    *   The core equation is $N = P - Z$. For stability, we want $Z=0$, so $N=P$.
    *   **Visual:** Imagine the critical point $(-1,0)$ as a "mouse hole" in the complex plane. The Nyquist plot is a "cat" tracing a path. If the cat goes around the mouse hole in a *counter-clockwise* direction, it's a "good" encirclement that might "cancel out" existing unstable open-loop poles. If it goes clockwise, it's a "bad" encirclement, possibly *adding* instability.

2.  **Formulas/Facts to Overlearn:**
    *   **The Nyquist Criterion:** $N = P_{OL}$ (for stability, where $N$ is counter-clockwise encirclements of $(-1,0)$ and $P_{OL}$ is open-loop RHP poles).
    *   **The Critical Point:** Always $(-1, 0)$.
    *   **The Nyquist Contour:** A D-shaped path enclosing the RHP, with indentations for poles on the imaginary axis.
    *   **Mapping:** The Nyquist plot is $G(s)H(s)$ evaluated along this contour.

3.  **Spaced Repetition Schedule:**
    *   Review this lesson:
        *   **1 day** from now
        *   **3 days** from now
        *   **7 days** from now
        *   **16 days** from now
        *   **35 days** from now
    *   Actively re-derive the criterion and work through examples each time.

4.  **First-Principles Re-derivation Pathway:**
    *   **Start with Closed-Loop Stability:** The system is stable if all roots of the characteristic equation $1 + G(s)H(s) = 0$ are in the LHP.
    *   **Define $F(s)$:** Let $F(s) = 1 + G(s)H(s)$. We want to find the number of RHP zeros of $F(s)$.
    *   **Apply Cauchy's Argument Principle:** For a closed contour $\Gamma_s$ (the Nyquist contour) in the s-plane, the number of encirclements $N$ of the origin by the mapped contour $F(\Gamma_s)$ is $N = Z_F - P_F$.
    *   **Relate to $G(s)H(s)$:**
        *   $Z_F$ are the RHP zeros of $1 + G(s)H(s)$, which are the RHP closed-loop poles ($Z_{CL}$).
        *   $P_F$ are the RHP poles of $1 + G(s)H(s)$, which are the RHP open-loop poles of $G(s)H(s)$ ($P_{OL}$).
        *   Encirclements of the origin by $1 + G(s)H(s)$ are equivalent to encirclements of $(-1, 0)$ by $G(s)H(s)$.
    *   **Substitute and Conclude:** So, $N = Z_{CL} - P_{OL}$. For stability, $Z_{CL}=0$, which implies $N = P_{OL}$.

## 10. Connections — what this leads to

The Nyquist stability criterion is a foundational concept that opens doors to several advanced topics in control systems and related fields:

1.  **Gain and Phase Margins:** These critical stability metrics are directly read from the Nyquist plot. Gain margin indicates how much the system gain can be increased before instability, and phase margin indicates how much phase lag can be introduced. They quantify the "distance" of the Nyquist plot from the critical point $(-1, 0)$, providing a measure of *relative stability* and robustness.
2.  **Robust Control:** Understanding Nyquist stability is essential for designing robust controllers that maintain performance and stability despite uncertainties in the system model or external disturbances. Nyquist plots help visualize how variations in system parameters affect stability margins.
3.  **Root Locus Analysis:** While different, Root Locus also analyzes closed-loop pole locations based on open-loop parameters (typically a gain $K$). Nyquist provides a complementary frequency-domain perspective, and both are often used together for comprehensive analysis.
4.  **PID Controller Tuning:** The insights gained from Nyquist plots (especially about gain and phase margins) are invaluable for tuning Proportional-Integral-Derivative (PID) controllers, which are ubiquitous in industrial control.
5.  **Multivariable Control Systems:** For systems with multiple inputs and multiple outputs (MIMO), extensions of the Nyquist criterion (like the Characteristic Locus method or the Generalized Nyquist criterion) are used to assess stability, although these are significantly more complex.
6.  **Adaptive Control and Optimal Control:** In these advanced fields, the fundamental understanding of stability provided by Nyquist is crucial. While these methods often use state-space representations, the underlying principles of ensuring closed-loop stability remain paramount, and frequency-domain insights can still be valuable.
7.  **System Identification:** After identifying a system's model from experimental data, Nyquist analysis can be used to validate the stability of the identified model and to design appropriate controllers.

## 11. Self-check questions

1.  A control system has an open-loop transfer function $G(s)H(s) = \frac{K}{s(s+2)}$. Sketch the Nyquist plot for this system for $K=1$. Determine $P_{OL}$ and $N$. Is the closed-loop system stable?
2.  Consider an open-loop system with $G(s)H(s) = \frac{10}{(s+1)(s-2)}$. How many poles of $G(s)H(s)$ are in the RHP? If the Nyquist plot of $G(s)H(s)$ encircles the point $(-1,0)$ once in the clockwise direction, is the closed-loop system stable? Justify your answer using the Nyquist criterion.
3.  For a given $G(s)H(s)$, the Nyquist plot starts at $(5,0)$ for $\omega=0$, crosses the negative real axis at $(-2,0)$ as $\omega$ increases, and then approaches the origin from $-180^\circ$. If $P_{OL}=0$, what can you say about the stability of the closed-loop system?
4.  Explain why the Nyquist criterion checks for encirclements of $(-1,0)$ in the $G(s)H(s)$ plane, rather than the origin. What is the significance of clockwise versus counter-clockwise encirclements?
5.  A system's open-loop transfer function is $G(s)H(s) = \frac{K(s+1)}{s^2(s+3)}$. Describe the segments of the Nyquist contour required for analysis. How would the indentation around the origin affect the Nyquist plot in the $G(s)H(s)$ plane? For what range of $K$ (if any) would this system be stable? (You don't need to calculate the exact range, but explain the general approach using the Nyquist criterion.)