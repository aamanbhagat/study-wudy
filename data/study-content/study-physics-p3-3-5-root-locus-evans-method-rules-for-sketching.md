## 1. What it is — in plain English

Imagine you're trying to control something, like the throttle of a rocket engine or the steering of a drone. You have a "control knob" – let's call it the "gain" – that determines how strongly your control system reacts. If you turn the knob too low, the system might be sluggish; too high, and it might start shaking violently or even fly out of control.

The "Root Locus" is like a special map that shows you exactly how the rocket's behavior (specifically, its stability and responsiveness) changes as you turn that control knob from zero all the way up to a very high value. It plots the "roots" of the system's characteristic equation – which are basically the system's fundamental modes of response, like its natural frequencies or damping – on a graph called the complex plane.

Each path on this map shows where one of these fundamental modes moves. By looking at this map, you can instantly see if increasing the gain will make your rocket stable, unstable, oscillate, or become more responsive. It's a powerful visual tool for engineers to predict and design control systems without having to test every single knob setting.

## 2. Why it matters — real-world applications

The Root Locus method is a cornerstone of control system design, providing invaluable insights into system stability and performance. Its applications are widespread and critical:

1.  **Aerospace Control Systems (e.g., SpaceX Falcon 9, Boeing 787):** Engineers use root locus to design autopilots, thrust vectoring systems, and flight control surfaces. For a rocket like the Falcon 9, the Root Locus helps determine the optimal gain settings for its gimbaled engines to maintain stability during ascent, ensuring it doesn't tumble. For an aircraft, it helps design control laws that prevent phenomena like wing flutter or unstable phugoid modes, ensuring smooth and safe flight across different operating conditions. It's crucial for understanding how the system reacts to disturbances and ensuring it returns to a stable state.

2.  **Robotics and Automation (e.g., Boston Dynamics Spot, Industrial Robotic Arms):** In robotics, precise control of joint movements and end-effector positioning is paramount. Root locus helps in tuning the proportional, integral, and derivative (PID) gains for motor controllers. For instance, controlling the leg movements of a robot like Spot requires careful gain selection to ensure stability while walking on uneven terrain, preventing oscillations or sluggish responses that could lead to falls. Industrial robotic arms use it to ensure precise, fast, and stable movements for tasks like assembly or welding.

3.  **Automotive Systems (e.g., Tesla Autopilot, ABS Brakes):** Modern cars are packed with control systems. Root locus is used in designing cruise control systems to maintain a constant speed, active suspension systems to improve ride comfort and handling, and anti-lock braking systems (ABS) to prevent wheel lock-up during hard braking. For ABS, the method helps determine the optimal control gains to modulate brake pressure effectively, maximizing braking force without losing traction, a critical safety feature.

4.  **Chemical Process Control (e.g., Oil Refineries, Pharmaceutical Plants):** In complex industrial processes, maintaining precise temperatures, pressures, flow rates, and chemical concentrations is vital for product quality and safety. Root locus helps engineers design control loops for these variables. For example, in an oil refinery, controlling the temperature of a distillation column is critical. Root locus can guide the selection of controller gains to ensure the temperature quickly settles to the desired setpoint without dangerous overshoots or sustained oscillations.

5.  **Power Systems (e.g., Smart Grids, Wind Turbines):** Maintaining grid stability and ensuring reliable power delivery is a huge challenge. Root locus is applied to design controllers for generators, voltage regulators, and frequency stabilization systems. For large wind turbines, it's used to design pitch control systems that adjust the blade angle to optimize power generation while preventing mechanical stresses and ensuring the turbine remains stable under varying wind conditions.

## 3. Prerequisites — what you must know first

To truly grasp the Root Locus method, you need a solid foundation in several core concepts from linear systems and control theory. If any of these feel unfamiliar, it's highly recommended to pause and review them first.

*   **Complex Numbers:** Understanding the complex plane, real and imaginary parts, complex conjugate pairs, and basic arithmetic operations with complex numbers. The "roots" we plot live on this plane.
*   **Laplace Transforms:** The ability to transform time-domain functions into the s-domain (complex frequency domain) and vice-versa. This is essential for analyzing linear time-invariant (LTI) systems.
*   **Transfer Functions:** A mathematical representation of the relationship between the input and output of a linear system in the s-domain. You must be comfortable with deriving, manipulating, and interpreting transfer functions, often denoted as $G(s)$ or $H(s)$.
*   **Poles and Zeros of a Transfer Function:** Understanding that poles are the roots of the denominator polynomial (where the transfer function goes to infinity) and zeros are the roots of the numerator polynomial (where the transfer function goes to zero). These are the fundamental building blocks of a root locus plot.
*   **Feedback Control Systems:** Knowledge of open-loop and closed-loop systems, block diagrams, and how to derive the closed-loop transfer function for a unity or non-unity feedback system. The root locus specifically plots the poles of the *closed-loop* system.
*   **System Stability (Routh-Hurwitz Criterion):** The concept that a system is stable if and only if all its closed-loop poles lie in the left-half of the complex s-plane (LHP). Poles in the right-half plane (RHP) indicate instability, while poles on the imaginary axis indicate marginal stability (sustained oscillations). The root locus helps visualize this movement.
*   **Basic Calculus:** Derivatives (for finding breakaway/break-in points) and limits (for understanding asymptotic behavior).

## 4. The core idea — step by step

The Root Locus method, often called Evans' method, provides a graphical way to determine the locations of the closed-loop poles as a single parameter (usually a gain $K$) varies from $0$ to $\infty$. This visual representation is incredibly powerful for understanding system stability and transient response.

Let's break down the core idea and the rules for sketching it.

### Step 1: The Characteristic Equation of a Closed-Loop System

*   **Plain English:** Every feedback control system has a "heartbeat" equation that defines its fundamental behavior. This equation, when set to zero, gives us the "roots" (or poles) that determine how the system will react to inputs and disturbances. The Root Locus method is all about finding where these roots move as we change a specific tuning parameter, usually a gain $K$.

*   **Small Concrete Example:** Consider a simple unity feedback system where the open-loop transfer function is $G(s) = \frac{K}{s(s+1)}$. The feedback path $H(s)=1$. The closed-loop transfer function is given by $\frac{Y(s)}{R(s)} = \frac{G(s)}{1+G(s)H(s)}$. The denominator of this closed-loop transfer function, set to zero, is the characteristic equation.
    $$1 + G(s)H(s) = 0$$
    Substituting $G(s)$ and $H(s)$:
    $$1 + \frac{K}{s(s+1)} \cdot 1 = 0$$
    $$s(s+1) + K = 0$$
    $$s^2 + s + K = 0$$
    This is our characteristic equation. The roots of this quadratic equation are the closed-loop poles, and they will change as $K$ changes.

*   **Formal/Mathematical Version:** For a standard unity feedback system with open-loop transfer function $G(s)$ and feedback transfer function $H(s)$, the closed-loop transfer function is given by:
    $$T(s) = \frac{G(s)}{1 + G(s)H(s)}$$
    The characteristic equation, whose roots are the closed-loop poles, is:
    $$1 + G(s)H(s) = 0$$
    We typically write $G(s)H(s)$ as $L(s)$, the loop transfer function. So, $1 + L(s) = 0$.
    Often, the gain $K$ is explicitly factored out: $L(s) = K \frac{N(s)}{D(s)}$, where $N(s)$ contains the open-loop zeros and $D(s)$ contains the open-loop poles.
    So, the characteristic equation becomes:
    $$1 + K \frac{N(s)}{D(s)} = 0$$
    $$D(s) + K N(s) = 0$$

*   **What could go wrong:** Students sometimes confuse the poles of $G(s)H(s)$ (open-loop poles) with the roots of $1 + G(s)H(s) = 0$ (closed-loop poles). The Root Locus plots the *closed-loop* poles. Also, ensure the characteristic equation is always in the form $1 + K \cdot \text{(rational function)} = 0$ before applying the rules. If it's $1 + \frac{1}{K} \cdot \text{(rational function)} = 0$, you're sketching for $1/K$ and not $K$.

### Step 2: The Angle and Magnitude Conditions

The characteristic equation $1 + K L(s) = 0$ can be rewritten as $L(s) = -1/K$. Since $K$ is a positive real number ($K \ge 0$), $-1/K$ is a negative real number. This leads to two fundamental conditions that *must* be satisfied by any point $s$ on the root locus:

*   **Plain English:** Imagine you're standing on a point $s$ in the complex plane. To be on the root locus, two things must be true about the open-loop transfer function $L(s)$ at that point:
    1.  **Angle Condition:** If you draw lines from all the open-loop poles and zeros to your point $s$, the sum of the angles from the zeros minus the sum of the angles from the poles must be an odd multiple of $\pi$ (180 degrees). This tells you *where* the locus can exist.
    2.  **Magnitude Condition:** The magnitude (length) of $L(s)$ at your point $s$ must be equal to $1/K$. This tells you *what value of $K$* corresponds to that point on the locus.

*   **Small Concrete Example:** Let $L(s) = \frac{K(s+2)}{s(s+1)}$. We want to check if $s = -1.5$ is on the root locus.
    The open-loop poles are at $p_1=0, p_2=-1$. The open-loop zero is at $z_1=-2$.
    For $s=-1.5$:
    Angle from $p_1=0$ to $s=-1.5$ is $\pi$ (or $180^\circ$).
    Angle from $p_2=-1$ to $s=-1.5$ is $\pi$ (or $180^\circ$).
    Angle from $z_1=-2$ to $s=-1.5$ is $0$ (or $0^\circ$).
    Sum of zero angles - sum of pole angles = $0 - (\pi + \pi) = -2\pi$. This is an *even* multiple of $\pi$. So, $s=-1.5$ is *not* on the root locus.
    (We will see later that segments of the real axis are on the locus if there's an odd number of poles and zeros to their right).

*   **Formal/Mathematical Version:**
    Given $L(s) = K \frac{\prod_{i=1}^{m}(s-z_i)}{\prod_{j=1}^{n}(s-p_j)}$, where $z_i$ are the zeros and $p_j$ are the poles.
    The characteristic equation is $1 + K L(s) = 0$, or $L(s) = -1/K$.
    1.  **Angle Condition:**
        $$\angle L(s) = \sum_{i=1}^{m} \angle (s-z_i) - \sum_{j=1}^{n} \angle (s-p_j) = (2k+1)\pi \quad \text{for } k=0, \pm 1, \pm 2, \dots$$
    2.  **Magnitude Condition:**
        $$|L(s)| = \frac{K \prod_{i=1}^{m} |s-z_i|}{\prod_{j=1}^{n} |s-p_j|} = 1$$
        From this, we can find $K$ for any point $s$ on the locus:
        $$K = \frac{\prod_{j=1}^{n} |s-p_j|}{\prod_{i=1}^{m} |s-z_i|}$$

*   **What could go wrong:** Forgetting that $k$ can be negative or positive, leading to incorrect angles. Most importantly, understanding that the angle condition *defines* the shape of the locus, while the magnitude condition *assigns $K$ values* to points on that shape.

### Step 3: Rules for Sketching the Root Locus (Evans' Method)

These rules, derived from the angle and magnitude conditions, allow us to quickly sketch the root locus without explicitly testing every point.

#### Rule 1: Number of Branches

*   **Plain English:** Each open-loop pole starts a "path" or "branch" on our map. Each path eventually ends at an open-loop zero or goes off to infinity.

*   **Small Concrete Example:** If $L(s) = \frac{K(s+2)}{s(s+1)(s+3)}$, there are 3 open-loop poles ($0, -1, -3$) and 1 open-loop zero ($-2$). So there will be 3 branches on the root locus.

*   **Formal/Mathematical Version:** The number of branches of the root locus is equal to the number of open-loop poles, $n$. Each branch starts at an open-loop pole ($K=0$) and ends at an open-loop zero ($K=\infty$) or at infinity ($K=\infty$).

*   **What could go wrong:** Confusing the number of poles with the number of zeros. The number of branches is always equal to the number of poles.

#### Rule 2: Starting and Ending Points

*   **Plain English:** When the control knob is at zero ($K=0$), the system's behavior is entirely determined by its natural characteristics, so the paths start exactly where the open-loop poles are. As you crank the knob up to maximum ($K \rightarrow \infty$), the paths either go towards the system's "anti-poles" (zeros) or fly off into the distance.

*   **Small Concrete Example:** For $L(s) = \frac{K}{s(s+1)}$, the branches start at $s=0$ and $s=-1$ (the open-loop poles). Since there are no finite zeros, both branches will go to infinity as $K \rightarrow \infty$.

*   **Formal/Mathematical Version:**
    *   For $K=0$, the roots of $D(s) + K N(s) = 0$ are the roots of $D(s)=0$, which are the open-loop poles. Thus, the root locus branches *start* at the open-loop poles.
    *   For $K \rightarrow \infty$, the roots of $D(s) + K N(s) = 0$ approach the roots of $N(s)=0$ (the open-loop zeros) or tend towards infinity. Thus, the root locus branches *end* at the open-loop zeros or at infinity. There are $m$ branches ending at finite zeros and $n-m$ branches ending at infinity.

*   **What could go wrong:** Incorrectly identifying open-loop poles and zeros from $L(s)$. Remember, poles are roots of the denominator, zeros are roots of the numerator.

#### Rule 3: Symmetry

*   **Plain English:** Because real-world systems are described by equations with real coefficients, if a path goes into the top half of our map (where imaginary numbers live), there must always be a mirror image path in the bottom half. Complex roots always come in pairs.

*   **Small Concrete Example:** If a root locus branch goes from $s=0$ to $s = -0.5 + j1$, there must be another branch that goes from $s=0$ to $s = -0.5 - j1$.

*   **Formal/Mathematical Version:** The root locus is always symmetric with respect to the real axis. This is because the coefficients of the characteristic polynomial $D(s) + K N(s) = 0$ are real, so any complex roots must appear as conjugate pairs.

*   **What could go wrong:** Sketching a branch in the upper half-plane without its corresponding mirror image in the lower half-plane.

#### Rule 4: Real Axis Segments

*   **Plain English:** You can quickly tell which parts of the horizontal (real) axis are part of the root locus. Pick any point on the real axis. If, to its right, there's an *odd* number of open-loop poles and zeros combined, then that point *is* on the root locus.

*   **Small Concrete Example:** Let $L(s) = \frac{K(s+2)}{s(s+1)(s+3)}$. Poles at $0, -1, -3$. Zero at $-2$.
    *   To the right of $s=0$: No poles/zeros. Count = 0 (even). Not on locus.
    *   Between $s=0$ and $s=-1$: Pole at $0$. Count = 1 (odd). On locus.
    *   Between $s=-1$ and $s=-2$: Pole at $0$, pole at $-1$. Count = 2 (even). Not on locus.
    *   Between $s=-2$ and $s=-3$: Pole at $0$, pole at $-1$, zero at $-2$. Count = 3 (odd). On locus.
    *   To the left of $s=-3$: Pole at $0$, pole at $-1$, zero at $-2$, pole at $-3$. Count = 4 (even). Not on locus.
    So, the real axis segments are $[-1, 0]$ and $[-3, -2]$.

*   **Formal/Mathematical Version:** A point on the real axis lies on the root locus if and only if the sum of the number of open-loop poles and open-loop zeros to the right of that point is an odd integer. This is a direct consequence of the angle condition, as angles from real poles/zeros to a real point are either $0$ or $\pi$.

*   **What could go wrong:** Miscounting poles/zeros to the right, or forgetting to check *all* segments of the real axis.

#### Rule 5: Asymptotes

*   **Plain English:** If there are more poles than zeros, some paths will fly off to infinity. These paths don't just wander randomly; they follow straight lines called asymptotes. We need to find how many of these lines there are, what angles they make with the real axis, and where they all meet on the real axis.

*   **Small Concrete Example:** For $L(s) = \frac{K}{s(s+1)}$, $n=2$ poles, $m=0$ zeros.
    *   Number of asymptotes: $n-m = 2-0 = 2$.
    *   Centroid: $\sigma_a = \frac{(0 + (-1)) - (0)}{2-0} = \frac{-1}{2} = -0.5$.
    *   Angles: For $k=0, 1$:
        $\phi_0 = \frac{(2(0)+1)\pi}{2} = \frac{\pi}{2} = 90^\circ$.
        $\phi_1 = \frac{(2(1)+1)\pi}{2} = \frac{3\pi}{2} = 270^\circ$ (or $-90^\circ$).
    So, two asymptotes meet at $s=-0.5$, one going straight up, one straight down.

*   **Formal/Mathematical Version:**
    If $n > m$ (more poles than zeros), then $n-m$ branches of the root locus go to infinity along straight-line asymptotes.
    1.  **Number of Asymptotes:** $N_a = n-m$.
    2.  **Centroid of Asymptotes ($\sigma_a$):** The point on the real axis where the asymptotes intersect.
        $$\sigma_a = \frac{\sum_{j=1}^{n} p_j - \sum_{i=1}^{m} z_i}{n-m}$$
    3.  **Angles of Asymptotes ($\phi_a$):**
        $$\phi_a = \frac{(2k+1)\pi}{n-m} \quad \text{for } k=0, 1, \dots, n-m-1$$
        (where $\pi$ is in radians, or $180^\circ$ in degrees).

*   **What could go wrong:** Calculation errors in summing poles/zeros or in the denominator $(n-m)$. Forgetting to calculate all $n-m$ angles.

#### Rule 6: Breakaway and Break-in Points

*   **Plain English:** Sometimes, two paths on the real axis will collide, leave the real axis, and enter the complex plane (breakaway point). Or, two paths from the complex plane might merge and re-enter the real axis (break-in point). These points always occur where the gain $K$ is at a local maximum or minimum along the real axis.

*   **Small Concrete Example:** For $L(s) = \frac{K}{s(s+1)}$, we have $s^2+s+K=0$, so $K = -(s^2+s)$.
    $\frac{dK}{ds} = -(2s+1) = 0 \implies s = -0.5$.
    This is a breakaway point. Since the real axis segment is $[-1, 0]$, $s=-0.5$ is on the locus, and the two poles will break away from the real axis at this point.

*   **Formal/Mathematical Version:** Breakaway and break-in points occur where $\frac{dK}{ds} = 0$.
    From $1 + K L(s) = 0$, we have $K = -\frac{1}{L(s)}$.
    So, $K = -\frac{D(s)}{N(s)}$.
    To find breakaway/break-in points, differentiate $K$ with respect to $s$ and set it to zero:
    $$\frac{d}{ds} \left( \frac{D(s)}{N(s)} \right) = 0$$
    This simplifies to $N(s) D'(s) - D(s) N'(s) = 0$.
    Only those solutions $s$ that lie on a valid real axis segment of the root locus are true breakaway/break-in points.

*   **What could go wrong:** Algebraic errors in differentiation. Forgetting to check if the calculated points actually lie on a valid real axis segment. A point calculated by $\frac{dK}{ds}=0$ but not on a real axis segment is not a valid breakaway/break-in point.

#### Rule 7: Angle of Departure and Arrival

*   **Plain English:** If a system has complex open-loop poles or zeros, the paths will start or end at these points. We need to know the precise angle at which they leave (departure) or arrive (arrival) at these complex locations. This helps us accurately draw the initial or final direction of the branches.

*   **Small Concrete Example:** Suppose $L(s) = \frac{K}{s(s^2+2s+2)}$. Poles at $0, -1+j1, -1-j1$.
    To find the angle of departure from $p_1 = -1+j1$:
    Use the angle condition: $\sum \angle(s-z_i) - \sum \angle(s-p_j) = (2k+1)\pi$.
    Let $\theta_d$ be the angle of departure from $p_1$.
    $\angle(s-p_1)$ will be $\theta_d$.
    Angles from other poles to $p_1$:
    $\angle(p_1 - p_2) = \angle((-1+j1) - (-1-j1)) = \angle(j2) = \pi/2$.
    $\angle(p_1 - p_3) = \angle((-1+j1) - 0) = \angle(-1+j1) = 3\pi/4$.
    Since there are no zeros:
    $0 - (\theta_d + \angle(p_1 - p_2) + \angle(p_1 - p_3)) = (2k+1)\pi$
    $0 - (\theta_d + \pi/2 + 3\pi/4) = (2k+1)\pi$
    $\theta_d = -(2k+1)\pi - \pi/2 - 3\pi/4 = -(2k+1)\pi - 5\pi/4$.
    For $k=-1$: $\theta_d = -(-1)\pi - 5\pi/4 = \pi - 5\pi/4 = -\pi/4$ (or $315^\circ$).
    This is the angle at which the locus departs from $p_1 = -1+j1$.

*   **Formal/Mathematical Version:**
    *   **Angle of Departure ($\theta_d$):** For a complex open-loop pole $p_j$:
        $$\theta_d = (2k+1)\pi - \sum_{i=1, i \ne j}^{n} \angle(p_j - p_i) + \sum_{i=1}^{m} \angle(p_j - z_i)$$
        (where the angles are measured from the *other* poles/zeros to the complex pole $p_j$).
    *   **Angle of Arrival ($\theta_a$):** For a complex open-loop zero $z_i$:
        $$\theta_a = (2k+1)\pi + \sum_{j=1}^{n} \angle(z_i - p_j) - \sum_{k=1, k \ne i}^{m} \angle(z_i - z_k)$$
        (where the angles are measured from the poles/other zeros to the complex zero $z_i$).
    Choose $k$ to get an angle between $0$ and $2\pi$ (or $-180^\circ$ and $180^\circ$).

*   **What could go wrong:** Incorrectly calculating the angles between complex numbers. Forgetting to sum *all* other poles and zeros. Confusing departure with arrival formulas.

#### Rule 8: J-axis Crossings (Imaginary Axis Crossings)

*   **Plain English:** Sometimes, a root locus branch might cross the imaginary axis. This is a critical point because it marks the boundary between stability (left-half plane) and instability (right-half plane). We need to find the exact frequency where this crossing happens and the value of $K$ at that point.

*   **Small Concrete Example:** For $L(s) = \frac{K}{s(s+1)(s+2)}$, the characteristic equation is $s(s+1)(s+2) + K = 0$, which is $s^3 + 3s^2 + 2s + K = 0$.
    To find j-axis crossings, substitute $s = j\omega$:
    $(j\omega)^3 + 3(j\omega)^2 + 2(j\omega) + K = 0$
    $-j\omega^3 - 3\omega^2 + j2\omega + K = 0$
    Rearrange into real and imaginary parts:
    $(-3\omega^2 + K) + j(-\omega^3 + 2\omega) = 0$
    For this to be zero, both real and imaginary parts must be zero.
    Imaginary part: $-\omega^3 + 2\omega = 0 \implies -\omega(\omega^2 - 2) = 0$.
    So, $\omega = 0$ or $\omega = \pm \sqrt{2}$.
    If $\omega = 0$, then from the real part, $K = 0$. This is just the starting point at $s=0$.
    If $\omega = \pm \sqrt{2}$, then from the real part:
    $-3(\sqrt{2})^2 + K = 0 \implies -3(2) + K = 0 \implies K = 6$.
    So, the locus crosses the j-axis at $s = \pm j\sqrt{2}$ when $K=6$.

*   **Formal/Mathematical Version:** To find the points where the root locus crosses the imaginary axis (j-axis), substitute $s = j\omega$ into the characteristic equation $D(s) + K N(s) = 0$.
    Then, separate the equation into its real and imaginary parts. Set both parts equal to zero.
    Solve the resulting two equations for $\omega$ (the crossing frequency) and $K$ (the gain at crossing).
    Alternatively, the Routh-Hurwitz stability criterion can be used. Construct the Routh array for the characteristic polynomial. The system is marginally stable (crosses the j-axis) when a row of zeros appears in the Routh array, or when a row has a zero in the first column and the system is stable for a range of K values. The auxiliary equation formed from the row above the zero row will give the frequencies of oscillation, and the conditions for the row of zeros will give the gain $K$.

*   **What could go wrong:** Algebraic errors when substituting $s=j\omega$ or solving the resulting equations. Misinterpreting the Routh-Hurwitz criterion.

## 5. Worked examples — multiple, with every step shown

Let's apply these rules to sketch several root loci.

### Example 1: Simple System with Two Poles

**Problem:** Sketch the root locus for the system with open-loop transfer function $L(s) = \frac{K}{s(s+2)}$.

**Given:** $L(s) = \frac{K}{s(s+2)}$. We want to sketch the root locus for $K \ge 0$.
**Want:** A sketch of the closed-loop pole locations as $K$ varies.

**Solution:**

1.  **Characteristic Equation:**
    $$1 + \frac{K}{s(s+2)} = 0$$
    $$s(s+2) + K = 0$$
    $$s^2 + 2s + K = 0$$
    *Explanation:* This is the equation whose roots (closed-loop poles) we are tracking.

2.  **Identify Open-Loop Poles and Zeros:**
    From $L(s) = \frac{K}{s(s+2)} = \frac{K}{(s-0)(s-(-2))}$:
    Open-loop poles: $p_1 = 0$, $p_2 = -2$.
    Open-loop zeros: None ($m=0$).
    Number of poles ($n=2$), number of zeros ($m=0$).
    *Explanation:* These are the starting points for the root locus branches and determine the system's basic structure.

3.  **Number of Branches (Rule 1):**
    $n = 2$, so there are **2 branches**.
    *Explanation:* Each pole gives rise to one branch of the locus.

4.  **Starting and Ending Points (Rule 2):**
    Branches start at $p_1=0$ and $p_2=-2$ (for $K=0$).
    Since $m=0$, both branches end at infinity (for $K \rightarrow \infty$).
    *Explanation:* $K=0$ means the system is open-loop, so poles are at open-loop pole locations. As $K$ increases, poles move towards zeros or infinity.

5.  **Symmetry (Rule 3):**
    The root locus will be **symmetric about the real axis**.
    *Explanation:* All coefficients in the characteristic equation are real, so complex roots must appear in conjugate pairs.

6.  **Real Axis Segments (Rule 4):**
    Poles at $0, -2$.
    *   Test point $s=1$ (to the right of $0$): 0 poles/zeros to its right (even). Not on locus.
    *   Test point $s=-1$ (between $0$ and $-2$): 1 pole ($0$) to its right (odd). **On locus**.
    *   Test point $s=-3$ (to the left of $-2$): 2 poles ($0, -2$) to its right (even). Not on locus.
    So, the real axis segment is **$[-2, 0]$**.
    *Explanation:* This rule quickly identifies which parts of the real axis are part of the locus.

7.  **Asymptotes (Rule 5):**
    *   Number of asymptotes: $n-m = 2-0 = 2$.
    *   Centroid ($\sigma_a$):
        $$\sigma_a = \frac{\sum p_j - \sum z_i}{n-m} = \frac{(0 + (-2)) - 0}{2-0} = \frac{-2}{2} = \mathbf{-1}$$
    *   Angles ($\phi_a$): For $k=0, 1$:
        $$\phi_a = \frac{(2k+1)\pi}{n-m}$$
        For $k=0: \phi_0 = \frac{(1)\pi}{2} = \frac{\pi}{2} = \mathbf{90^\circ}$$
        For $k=1: \phi_1 = \frac{(3)\pi}{2} = \frac{3\pi}{2} = \mathbf{270^\circ \text{ (or } -90^\circ)}$$
    *Explanation:* Since the branches go to infinity, they must follow these straight lines.

8.  **Breakaway/Break-in Points (Rule 6):**
    From the characteristic equation $s^2 + 2s + K = 0$, we have $K = -(s^2+2s)$.
    Differentiate $K$ with respect to $s$ and set to zero:
    $$\frac{dK}{ds} = -(2s+2) = 0$$
    $$2s+2 = 0 \implies s = \mathbf{-1}$$
    This point $s=-1$ lies on the real axis segment $[-2, 0]$, so it is a valid breakaway point.
    *Explanation:* At this point, the two real poles collide and move into the complex plane.

9.  **J-axis Crossings (Rule 8):**
    Substitute $s=j\omega$ into the characteristic equation $s^2 + 2s + K = 0$:
    $$(j\omega)^2 + 2(j\omega) + K = 0$$
    $$-\omega^2 + j2\omega + K = 0$$
    Rearrange: $(K - \omega^2) + j(2\omega) = 0$.
    Set imaginary part to zero: $2\omega = 0 \implies \omega = 0$.
    Set real part to zero: $K - \omega^2 = 0 \implies K - 0^2 = 0 \implies K = 0$.
    This means the only "crossing" is at the origin ($s=0$) when $K=0$, which is just a starting pole. There are **no non-trivial j-axis crossings**.
    *Explanation:* This confirms the system remains stable for all positive $K$ values, as the locus does not cross into the RHP.

**Sketch:**
The two poles start at $0$ and $-2$. They move towards each other on the real axis segment $[-2, 0]$. They meet at the breakaway point $s=-1$. From $s=-1$, they break away from the real axis and move upwards and downwards along the asymptotes at $\pm 90^\circ$, which are centered at $s=-1$. The locus remains entirely in the LHP.

**Reflection:** This was a simple example with only two poles and no zeros. The locus is straightforward: two poles on the real axis move towards each other, break away, and follow vertical asymptotes. The system is stable for all $K>0$.

---

### Example 2: System with Two Poles and One Zero

**Problem:** Sketch the root locus for the system with open-loop transfer function $L(s) = \frac{K(s+1)}{s(s+2)}$.

**Given:** $L(s) = \frac{K(s+1)}{s(s+2)}$.
**Want:** A sketch of the closed-loop pole locations.

**Solution:**

1.  **Characteristic Equation:**
    $$1 + \frac{K(s+1)}{s(s+2)} = 0$$
    $$s(s+2) + K(s+1) = 0$$
    $$s^2 + 2s + Ks + K = 0$$
    $$s^2 + (2+K)s + K = 0$$
    *Explanation:* This equation defines the closed-loop poles.

2.  **Identify Open-Loop Poles and Zeros:**
    From $L(s) = \frac{K(s+1)}{s(s+2)} = \frac{K(s-(-1))}{(s-0)(s-(-2))}$:
    Open-loop poles: $p_1 = 0$, $p_2 = -2$.
    Open-loop zeros: $z_1 = -1$.
    Number of poles ($n=2$), number of zeros ($m=1$).
    *Explanation:* These are the fixed points that guide the root locus.

3.  **Number of Branches (Rule 1):**
    $n = 2$, so there are **2 branches**.
    *Explanation:* Two poles mean two paths.

4.  **Starting and Ending Points (Rule 2):**
    Branches start at $p_1=0$ and $p_2=-2$ (for $K=0$).
    One branch ends at $z_1=-1$ (for $K \rightarrow \infty$).
    The other branch ends at infinity (for $K \rightarrow \infty$) since $n-m = 2-1 = 1$.
    *Explanation:* One pole goes to the finite zero, the other goes to infinity.

5.  **Symmetry (Rule 3):**
    The root locus will be **symmetric about the real axis**.
    *Explanation:* Standard for real-coefficient systems.

6.  **Real Axis Segments (Rule 4):**
    Poles at $0, -2$. Zero at $-1$.
    *   Test point $s=1$ (to the right of $0$): 0 poles/zeros to its right (even). Not on locus.
    *   Test point $s=-0.5$ (between $0$ and $-1$): 1 pole ($0$) to its right (odd). **On locus**.
    *   Test point $s=-1.5$ (between $-1$ and $-2$): 1 pole ($0$), 1 zero ($-1$) to its right. Total 2 (even). Not on locus.
    *   Test point $s=-3$ (to the left of $-2$): 1 pole ($0$), 1 zero ($-1$), 1 pole ($-2$) to its right. Total 3 (odd). **On locus**.
    So, the real axis segments are **$[-1, 0]$** and **$(-\infty, -2]$**.
    *Explanation:* This immediately tells us where the locus exists on the real axis.

7.  **Asymptotes (Rule 5):**
    *   Number of asymptotes: $n-m = 2-1 = 1$.
    *   Centroid ($\sigma_a$):
        $$\sigma_a = \frac{\sum p_j - \sum z_i}{n-m} = \frac{(0 + (-2)) - (-1)}{2-1} = \frac{-2 + 1}{1} = \mathbf{-1}$$
    *   Angles ($\phi_a$): For $k=0$:
        $$\phi_0 = \frac{(2(0)+1)\pi}{1} = \pi = \mathbf{180^\circ}$$
    *Explanation:* One branch goes to infinity, following a single asymptote along the negative real axis.

8.  **Breakaway/Break-in Points (Rule 6):**
    From the characteristic equation $s^2 + (2+K)s + K = 0$, solve for $K$:
    $K(s+1) = -(s^2+2s)$
    $$K = -\frac{s^2+2s}{s+1}$$
    Differentiate $K$ with respect to $s$ and set to zero:
    $$\frac{dK}{ds} = -\frac{(2s+2)(s+1) - (s^2+2s)(1)}{(s+1)^2} = 0$$
    The numerator must be zero:
    $$(2s+2)(s+1) - (s^2+2s) = 0$$
    $$2(s+1)^2 - s(s+2) = 0$$
    $$2(s^2+2s+1) - s^2-2s = 0$$
    $$2s^2+4s+2 - s^2-2s = 0$$
    $$s^2 + 2s + 2 = 0$$
    Using the quadratic formula $s = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$:
    $$s = \frac{-2 \pm \sqrt{2^2 - 4(1)(2)}}{2(1)} = \frac{-2 \pm \sqrt{4-8}}{2} = \frac{-2 \pm \sqrt{-4}}{2} = \frac{-2 \pm j2}{2} = \mathbf{-1 \pm j1}$$
    These points are complex. They are NOT on the real axis segments we identified ($[-1, 0]$ and $(-\infty, -2]$). Therefore, there are **no real-axis breakaway or break-in points**.
    *Explanation:* This means the branches never leave or re-enter the real axis in this system. The poles move along the real axis segments and then one goes to the zero, the other to infinity along the asymptote.

9.  **J-axis Crossings (Rule 8):**
    Substitute $s=j\omega$ into the characteristic equation $s^2 + (2+K)s + K = 0$:
    $$(j\omega)^2 + (2+K)(j\omega) + K = 0$$
    $$-\omega^2 + j(2+K)\omega + K = 0$$
    Rearrange: $(K - \omega^2) + j((2+K)\omega) = 0$.
    Set imaginary part to zero: $(2+K)\omega = 0$.
    Since $K \ge 0$, $2+K$ is never zero. Thus, $\omega = 0$.
    Set real part to zero: $K - \omega^2 = 0 \implies K - 0^2 = 0 \implies K = 0$.
    Again, this means the only "crossing" is at the origin ($s=0$) when $K=0$. There are **no non-trivial j-axis crossings**.
    *Explanation:* The system is stable for all $K>0$.

**Sketch:**
One pole starts at $s=0$ and moves left towards $s=-1$. The other pole starts at $s=-2$ and moves left towards $-\infty$. The pole starting at $s=0$ reaches $s=-1$ as $K \rightarrow \infty$ (since $s=-1$ is a zero). The pole starting at $s=-2$ moves left along the real axis towards $-\infty$, following the asymptote at $180^\circ$ centered at $-1$. The locus remains entirely on the real axis and in the LHP.

**Reflection:** This example shows how a zero "attracts" a root locus branch. The absence of breakaway points means the locus never enters the complex plane. The system is stable for all $K>0$.

---

### Example 3: System with Complex Conjugate Poles

**Problem:** Sketch the root locus for the system with open-loop transfer function $L(s) = \frac{K}{s(s^2+2s+2)}$.

**Given:** $L(s) = \frac{K}{s(s^2+2s+2)}$.
**Want:** A sketch of the closed-loop pole locations.

**Solution:**

1.  **Characteristic Equation:**
    $$1 + \frac{K}{s(s^2+2s+2)} = 0$$
    $$s(s^2+2s+2) + K = 0$$
    $$s^3 + 2s^2 + 2s + K = 0$$
    *Explanation:* The cubic characteristic equation indicates three closed-loop poles.

2.  **Identify Open-Loop Poles and Zeros:**
    Denominator: $s(s^2+2s+2)$.
    One pole at $s=0$.
    For $s^2+2s+2=0$, use quadratic formula: $s = \frac{-2 \pm \sqrt{2^2 - 4(1)(2)}}{2} = \frac{-2 \pm \sqrt{4-8}}{2} = \frac{-2 \pm \sqrt{-4}}{2} = \frac{-2 \pm j2}{2} = -1 \pm j1$.
    Open-loop poles: $p_1 = 0$, $p_2 = -1+j1$, $p_3 = -1-j1$.
    Open-loop zeros: None ($m=0$).
    Number of poles ($n=3$), number of zeros ($m=0$).
    *Explanation:* We have one real pole and a complex conjugate pair of poles.

3.  **Number of Branches (Rule 1):**
    $n = 3$, so there are **3 branches**.
    *Explanation:* Three poles, three paths.

4.  **Starting and Ending Points (Rule 2):**
    Branches start at $p_1=0$, $p_2=-1+j1$, $p_3=-1-j1$ (for $K=0$).
    Since $m=0$, all 3 branches end at infinity (for $K \rightarrow \infty$).
    *Explanation:* No finite zeros means all poles eventually go to infinity.

5.  **Symmetry (Rule 3):**
    The root locus will be **symmetric about the real axis**.
    *Explanation:* Complex poles always come in conjugate pairs, ensuring symmetry.

6.  **Real Axis Segments (Rule 4):**
    Poles at $0, -1+j1, -1-j1$.
    *   Test point $s=1$ (to the right of $0$): 0 poles/zeros to its right (even). Not on locus.
    *   Test point $s=-0.5$ (to the left of $0$): 1 pole ($0$) to its right (odd). **On locus**.
    *   Test point $s=-2$ (to the left of all poles): 3 poles ($0, -1+j1, -1-j1$) to its right (odd). **On locus**.
    So, the real axis segment is **$(-\infty, 0]$**.
    *Explanation:* The real axis segment extends from the real pole at the origin to negative infinity.

7.  **Asymptotes (Rule 5):**
    *   Number of asymptotes: $n-m = 3-0 = 3$.
    *   Centroid ($\sigma_a$):
        $$\sigma_a = \frac{\sum p_j - \sum z_i}{n-m} = \frac{(0 + (-1+j1) + (-1-j1)) - 0}{3-0} = \frac{-2}{3} = \mathbf{-2/3}$$
    *   Angles ($\phi_a$): For $k=0, 1, 2$:
        $$\phi_a = \frac{(2k+1)\pi}{n-m}$$
        For $k=0: \phi_0 = \frac{\pi}{3} = \mathbf{60^\circ}$$
        For $k=1: \phi_1 = \frac{3\pi}{3} = \pi = \mathbf{180^\circ}$$
        For $k=2: \phi_2 = \frac{5\pi}{3} = \mathbf{300^\circ \text{ (or } -60^\circ)}$$
    *Explanation:* Three branches go to infinity, following these three asymptotes.

8.  **Breakaway/Break-in Points (Rule 6):**
    From $s^3 + 2s^2 + 2s + K = 0$, we have $K = -(s^3 + 2s^2 + 2s)$.
    Differentiate $K$ with respect to $s$ and set to zero:
    $$\frac{dK}{ds} = -(3s^2 + 4s + 2) = 0$$
    $$3s^2 + 4s + 2 = 0$$
    Using the quadratic formula: $s = \frac{-4 \pm \sqrt{4^2 - 4(3)(2)}}{2(3)} = \frac{-4 \pm \sqrt{16-24}}{6} = \frac{-4 \pm \sqrt{-8}}{6} = \frac{-4 \pm j2\sqrt{2}}{6} = \mathbf{-2/3 \pm j\sqrt{2}/3}$$
    These are complex points. They are NOT on the real axis segment $(-\infty, 0]$. Therefore, there are **no real-axis breakaway or break-in points**.
    *Explanation:* This means the real pole at $s=0$ moves directly towards $-\infty$ along the real axis.

9.  **Angle of Departure (Rule 7):**
    We need to find the angle of departure from the complex pole $p_2 = -1+j1$.
    Use the angle condition: $\angle L(s) = \sum \angle(s-z_i) - \sum \angle(s-p_j) = (2k+1)\pi$.
    Let $\theta_d$ be the angle of departure from $p_2$.
    The other poles are $p_1=0$ and $p_3=-1-j1$.
    Angle from $p_1=0$ to $p_2=-1+j1$: $\angle(-1+j1) = 135^\circ$.
    Angle from $p_3=-1-j1$ to $p_2=-1+j1$: $\angle((-1+j1) - (-1-j1)) = \angle(j2) = 90^\circ$.
    Since there are no zeros ($m=0$):
    $0 - (\theta_d + \angle(p_2-p_1) + \angle(p_2-p_3)) = (2k+1)\pi$
    $0 - (\theta_d + 135^\circ + 90^\circ) = (2k+1)180^\circ$
    $\theta_d = -(2k+1)180^\circ - 225^\circ$.
    Let $k=-1$: $\theta_d = -(-1)180^\circ - 225^\circ = 180^\circ - 225^\circ = \mathbf{-45^\circ}$.
    By symmetry, the angle of departure from $p_3 = -1-j1$ is $+45^\circ$.
    *Explanation:* This tells us the initial direction the branches take from the complex poles.

10. **J-axis Crossings (Rule 8):**
    Substitute $s=j\omega$ into the characteristic equation $s^3 + 2s^2 + 2s + K = 0$:
    $$(j\omega)^3 + 2(j\omega)^2 + 2(j\omega) + K = 0$$
    $$-j\omega^3 - 2\omega^2 + j2\omega + K = 0$$
    Rearrange: $(K - 2\omega^2) + j(2\omega - \omega^3) = 0$.
    Set imaginary part to zero: $2\omega - \omega^3 = 0 \implies \omega(2 - \omega^2) = 0$.
    So, $\omega = 0$ or $\omega = \pm \sqrt{2}$.
    If $\omega = 0$: Real part $K - 0 = 0 \implies K = 0$. (This is the pole at the origin).
    If $\omega = \pm \sqrt{2}$: Real part $K - 2(\sqrt{2})^2 = 0 \implies K - 2(2) = 0 \implies K = \mathbf{4}$.
    So, the root locus crosses the j-axis at $s = \pm j\sqrt{2}$ when $K=4$.
    *Explanation:* This is a critical stability point. For $K<4$, the system is stable. For $K>4$, it becomes unstable.

**Sketch:**
One branch starts at $s=0$ and moves along the negative real axis towards $-\infty$, eventually following the $180^\circ$ asymptote. The other two branches start at the complex poles $-1 \pm j1$. They depart at $\mp 45^\circ$ respectively. They move towards the j-axis, crossing it at $\pm j\sqrt{2}$ when $K=4$. After crossing, they continue into the RHP, eventually approaching the $\pm 60^\circ$ asymptotes centered at $-2/3$.

**Reflection:** This example highlights the importance of angle of departure for complex poles and the j-axis crossing calculation for determining the stability limit ($K_{crit}$). The system is stable only for a finite range of $K$.

---

### Example 4: System with Non-Unity Feedback and Multiple Zeros

**Problem:** Sketch the root locus for the system with open-loop transfer function $G(s) = \frac{K}{s(s+2)}$ and feedback $H(s) = s+1$.

**Given:** $G(s) = \frac{K}{s(s+2)}$, $H(s) = s+1$.
**Want:** A sketch of the closed-loop pole locations.

**Solution:**

1.  **Form the Loop Transfer Function $L(s) = G(s)H(s)$:**
    $$L(s) = \frac{K}{s(s+2)} \cdot (s+1) = \frac{K(s+1)}{s(s+2)}$$
    *Explanation:* The root locus rules apply to the loop transfer function $L(s) = G(s)H(s)$.

2.  **Characteristic Equation:**
    $$1 + L(s) = 0$$
    $$1 + \frac{K(s+1)}{s(s+2)} = 0$$
    $$s(s+2) + K(s+1) = 0$$
    $$s^2 + 2s + Ks + K = 0$$
    $$s^2 + (2+K)s + K = 0$$
    *Explanation:* This is the same characteristic equation as Example 2. This shows that the root locus depends only on $G(s)H(s)$, not on whether the feedback is unity or not, as long as $K$ is factored out.

3.  **Identify Open-Loop Poles and Zeros:**
    From $L(s) = \frac{K(s+1)}{s(s+2)}$:
    Open-loop poles: $p_1 = 0$, $p_2 = -2$.
    Open-loop zeros: $z_1 = -1$.
    Number of poles ($n=2$), number of zeros ($m=1$).
    *Explanation:* Same as Example 2.

4.  **Number of Branches (Rule 1):**
    $n = 2$, so there are **2 branches**.

5.  **Starting and Ending Points (Rule 2):**
    Branches start at $p_1=0$ and $p_2=-2$ (for $K=0$).
    One branch ends at $z_1=-1$ (for $K \rightarrow \infty$).
    The other branch ends at infinity (for $K \rightarrow \infty$).

6.  **Symmetry (Rule 3):**
    The root locus will be **symmetric about the real axis**.

7.  **Real Axis Segments (Rule 4):**
    Poles at $0, -2$. Zero at $-1$.
    *   Segment $[-1, 0]$ is on the locus.
    *   Segment $(-\infty, -2]$ is on the locus.
    *Explanation:* Same as Example 2.

8.  **Asymptotes (Rule 5):**
    *   Number of asymptotes: $n-m = 2-1 = 1$.
    *   Centroid ($\sigma_a$):
        $$\sigma_a = \frac{(0 + (-2)) - (-1)}{2-1} = \mathbf{-1}$$
    *   Angles ($\phi_a$): $\phi_0 = \mathbf{180^\circ}$.
    *Explanation:* Same as Example 2.

9.  **Breakaway/Break-in Points (Rule 6):**
    From $K = -\frac{s^2+2s}{s+1}$, we found $\frac{dK}{ds}=0$ at $s = -1 \pm j1$.
    These are complex points and not on the real axis segments. So, there are **no real-axis breakaway or break-in points**.
    *Explanation:* Same as Example 2.

10. **J-axis Crossings (Rule 8):**
    From Example 2, substituting $s=j\omega$ into $s^2 + (2+K)s + K = 0$ yields $\omega=0, K=0$.
    So, there are **no non-trivial j-axis crossings**.
    *Explanation:* Same as Example 2.

**Sketch:**
The sketch for this system is identical to Example 2. One pole starts at $s=0$ and moves left to $s=-1$ (the zero). The other pole starts at $s=-2$ and moves left along the real axis towards $-\infty$, following the $180^\circ$ asymptote centered at $-1$. The locus remains entirely on the real axis and in the LHP.

**Reflection:** This example demonstrates that the root locus sketching rules apply directly to the loop transfer function $L(s) = G(s)H(s)$, regardless of the specific block diagram configuration (unity or non-unity feedback). The presence of the zero at $-1$ pulls one of the branches towards it, preventing the poles from moving into the complex plane. The system is stable for all $K>0$.

## 6. Common mistakes and traps

1.  **Incorrect Characteristic Equation Form:** Not ensuring the characteristic equation is in the form $1 + K L(s) = 0$, where $K$ is a scalar gain. Forgetting to factor $K$ out, or having $1/K$ instead of $K$.
2.  **Misidentifying Open-Loop Poles and Zeros:** Confusing the roots of the numerator with the roots of the denominator, or making algebraic errors when factoring the polynomials.
3.  **Errors in Real Axis Segment Rule:** Incorrectly counting the number of poles and zeros to the right of a test point on the real axis. Remember, it's the *total* count of poles *and* zeros.
4.  **Asymptote Calculation Errors:** Mistakes in summing poles/zeros for the centroid, or using incorrect values for $k$ in the angle formula $\frac{(2k+1)\pi}{n-m}$. Forgetting that $n-m$ is the number of asymptotes.
5.  **Breakaway/Break-in Point Misinterpretation:** Calculating points where $\frac{dK}{ds}=0$ but failing to check if these points actually lie on a valid real axis segment of the root locus. Complex roots of $\frac{dK}{ds}=0$ are not real-axis breakaway/break-in points.
6.  **J-axis Crossing Errors:** Algebraic mistakes when substituting $s=j\omega$ and separating into real and imaginary parts, or errors in solving the resulting system of equations for $\omega$ and $K$.
7.  **Ignoring Symmetry:** Sketching a root locus that is not symmetric about the real axis when complex poles/zeros are involved.
8.  **Angle of Departure/Arrival Calculation:** Incorrectly calculating angles between complex numbers, or misapplying the formula (e.g., forgetting to sum angles from *all other* poles and zeros).

## 7. Textbook-precise explanation

The **Root Locus** is a graphical method that shows the trajectories of the closed-loop poles of a feedback control system in the complex $s$-plane as a specific system parameter (typically the open-loop gain $K$) is varied from $0$ to $\infty$. This method, primarily developed by W.R. Evans, is based on the angle and magnitude conditions derived from the system's characteristic equation.

Consider a single-loop feedback system with an open-loop transfer function $L(s) = G(s)H(s)$. The characteristic equation of the closed-loop system is given by:
$$1 + L(s) = 0$$
Let $L(s)$ be expressed as $L(s) = K \frac{N(s)}{D(s)}$, where $N(s)$ is the numerator polynomial (whose roots are the open-loop zeros $z_i$) and $D(s)$ is the denominator polynomial (whose roots are the open-loop poles $p_j$). The gain $K$ is a real, non-negative parameter ($K \ge 0$).

Thus, the characteristic equation is:
$$1 + K \frac{\prod_{i=1}^{m}(s-z_i)}{\prod_{j=1}^{n}(s-p_j)} = 0$$
This equation can be rewritten as $K \frac{N(s)}{D(s)} = -1$. For a point $s$ to be on the root locus, it must satisfy two conditions:

1.  **Angle Condition:**
    $$\angle \left( K \frac{N(s)}{D(s)} \right) = \angle(-1)$$
    Since $K>0$, $\angle K = 0$. Therefore,
    $$\angle N(s) - \angle D(s) = (2k+1)\pi \quad \text{for } k=0, \pm 1, \pm 2, \dots$$
    $$\sum_{i=1}^{m} \angle(s-z_i) - \sum_{j=1}^{n} \angle(s-p_j) = (2k+1)\pi$$
    This condition determines the geometric shape of the root locus.

2.  **Magnitude Condition:**
    $$\left| K \frac{N