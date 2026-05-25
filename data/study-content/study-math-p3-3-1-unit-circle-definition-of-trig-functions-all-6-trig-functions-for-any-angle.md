## 1. What it is — in plain English

Imagine you have a special kind of ruler, but instead of measuring straight lines, it measures angles. This ruler isn't flat; it's a perfect circle with its center right at the origin (the point (0,0)) of a graph. And here's the trick: this circle has a radius of exactly 1 unit. We call this the "unit circle."

Now, picture an arm starting at the positive x-axis and rotating counter-clockwise around the center of this circle. As this arm rotates, its tip traces out points on the circle. For any angle this arm makes, the coordinates (x, y) of its tip on the circle tell us everything we need to know about the trigonometric functions for that angle.

Specifically, the x-coordinate of that point on the unit circle is the cosine of the angle, and the y-coordinate is the sine of the angle. From these two, we can figure out all the other trigonometric values like tangent, secant, cosecant, and cotangent. It's a universal way to define these functions for *any* angle, not just the acute angles you might have seen in right triangles.

## 2. Why it matters — real-world applications

The unit circle definition of trigonometric functions is not just an abstract mathematical concept; it's a fundamental tool that underpins many real-world applications, especially those involving periodic motion, waves, and rotations.

1.  **Aerospace Engineering & Navigation:** When designing flight paths for aircraft or trajectories for satellites, engineers constantly use trigonometry. The unit circle allows them to model and calculate the precise position and orientation of objects moving in circular or elliptical paths. For instance, determining the exact altitude and horizontal distance of a satellite in orbit at any given moment involves projecting its path onto coordinate axes, which is directly analogous to finding the (x, y) coordinates on a unit circle. Companies like SpaceX and NASA rely heavily on these principles for mission planning, trajectory correction, and antenna pointing.

2.  **Physics — Oscillations and Waves:** Almost every periodic phenomenon in physics, from the swing of a pendulum to the vibration of a guitar string, and from the propagation of light waves to the behavior of quantum particles, can be described using sine and cosine functions. The unit circle provides the geometric intuition and the mathematical framework to understand why these functions describe "wave-like" behavior and how they repeat over time. For example, a simple harmonic oscillator (like a mass on a spring) can have its position, velocity, and acceleration described by sine and cosine functions, which directly map to the coordinates of a point moving around a unit circle over time.

3.  **Computer Graphics & Robotics:** In video games, animation, and robotics, objects need to be rotated, translated, and scaled. The unit circle is crucial for representing rotations. When a character in a game turns, or a robotic arm moves to grasp an object, the software uses trigonometric functions to calculate the new coordinates of its parts. A rotation matrix, a fundamental concept in 3D graphics, is built upon sine and cosine values derived from angles, which are inherently linked to the unit circle. Pixar Animation Studios, for example, uses these mathematical principles extensively to animate characters and environments realistically.

4.  **Signal Processing & Machine Learning:** Many signals, such as audio, radio waves, or even financial market data, exhibit periodic components. Techniques like Fourier Analysis, which is vital in signal processing (e.g., noise reduction, audio compression in MP3s) and increasingly in machine learning (e.g., for analyzing time-series data or image processing), decompose complex signals into sums of simpler sine and cosine waves. The unit circle helps visualize how these individual waves combine and how their phases and frequencies relate, allowing algorithms to extract meaningful patterns from raw data.

## 3. Prerequisites — what you must know first

Before diving deep into the unit circle definition, ensure you have a solid grasp of these foundational concepts:

*   **Cartesian Coordinate System:** Understanding how to plot points $(x, y)$ on a two-dimensional grid, identifying the x-axis, y-axis, and the origin $(0,0)$.
*   **Basic Trigonometry (SOH CAH TOA):** Knowing the definitions of sine, cosine, and tangent for acute angles in a right-angled triangle (Opposite/Hypotenuse, Adjacent/Hypotenuse, Opposite/Adjacent).
*   **Pythagorean Theorem:** The relationship $a^2 + b^2 = c^2$ for the sides of a right triangle, where $c$ is the hypotenuse.
*   **Circles (Equation of a Circle):** The standard equation of a circle centered at the origin, $x^2 + y^2 = r^2$, where $r$ is the radius.
*   **Angles (Degrees and Radians):** How angles are measured, the relationship between degrees ($360^\circ$) and radians ($2\pi$ radians for a full circle), and how to convert between them.
*   **Similar Triangles:** Understanding that if two triangles have the same angles, their corresponding sides are proportional.
*   **Reciprocal:** Knowing that the reciprocal of a number $k$ is $1/k$.

## 4. The core idea — step by step

The unit circle provides a powerful and consistent way to define the six trigonometric functions for *any* angle, extending beyond the limitations of right triangles. Let's build this understanding step-by-step.

### ### Step 1: The Unit Circle

**Plain-English Statement:** Imagine a perfect circle drawn on a graph paper, centered exactly where the x and y axes cross (the origin). This circle is special because its radius is exactly 1 unit long.

**Concrete Example:** If you start at the center $(0,0)$ and walk straight out to any point on the edge of this circle, you will have walked exactly 1 unit.

**Formal/Mathematical Version:** A **unit circle** is a circle centered at the origin $(0,0)$ with a radius $r=1$. Its equation is given by:
$$x^2 + y^2 = 1^2$$
or simply
$$x^2 + y^2 = 1$$

**What could go wrong:** Students often forget the radius is 1, which is crucial. If the radius were different, the coordinates wouldn't directly give sine and cosine.

### ### Step 2: Angles in Standard Position

**Plain-English Statement:** To measure an angle on our unit circle, we always start in the same place: a line segment (called the "initial side") lying along the positive x-axis. Then, we rotate another line segment (called the "terminal side") around the origin. If we rotate counter-clockwise, the angle is positive; if we rotate clockwise, it's negative.

**Concrete Example:**
*   An angle of $30^\circ$ means rotating counter-clockwise $30^\circ$ from the positive x-axis.
*   An angle of $270^\circ$ means rotating counter-clockwise three-quarters of the way around the circle.
*   An angle of $-45^\circ$ means rotating clockwise $45^\circ$ from the positive x-axis.

**Formal/Mathematical Version:** An angle $\theta$ is in **standard position** if its vertex is at the origin $(0,0)$ and its initial side lies along the positive x-axis. The terminal side is formed by rotating counter-clockwise for positive angles and clockwise for negative angles.

**What could go wrong:** Confusing positive and negative rotation directions, or not starting the angle measurement from the positive x-axis.

### ### Step 3: The Point P(x,y) on the Unit Circle

**Plain-English Statement:** As our rotating "arm" (the terminal side) sweeps out an angle, its very tip lands on a specific point on the edge of the unit circle. We call this point $P$, and like any point on a graph, it has an x-coordinate and a y-coordinate, written as $(x, y)$.

**Concrete Example:** If you rotate $90^\circ$ counter-clockwise, the arm points straight up along the positive y-axis. The tip of the arm lands on the point $(0,1)$ on the unit circle.

**Formal/Mathematical Version:** For any angle $\theta$ in standard position, its terminal side intersects the unit circle at a unique point $P(x,y)$.

**What could go wrong:** Forgetting that this point *must* lie on the unit circle, meaning its distance from the origin is 1.

### ### Step 4: Defining Cosine and Sine

**Plain-English Statement:** This is the heart of the unit circle definition! For any angle $\theta$, the x-coordinate of the point $P(x,y)$ on the unit circle is the cosine of that angle, and the y-coordinate is the sine of that angle.

**Concrete Example:**
*   If the terminal side of an angle $\theta$ hits the unit circle at $P(\frac{\sqrt{3}}{2}, \frac{1}{2})$, then $\cos \theta = \frac{\sqrt{3}}{2}$ and $\sin \theta = \frac{1}{2}$. (This is for $\theta = 30^\circ$).
*   If the point is $P(-1, 0)$ (for $\theta = 180^\circ$), then $\cos 180^\circ = -1$ and $\sin 180^\circ = 0$.

**Formal/Mathematical Version:** Let $\theta$ be an angle in standard position, and let $P(x,y)$ be the point where the terminal side of $\theta$ intersects the unit circle. Then:
$$\cos \theta = x$$
$$\sin \theta = y$$

**What could go wrong:** Mixing up which coordinate corresponds to sine and which to cosine. A common mnemonic is "x comes before y, so cosine comes before sine" or "cosine is like the x-axis, sine is like the y-axis."

### ### Step 5: Extending to All Quadrants and Beyond

**Plain-English Statement:** The beauty of this definition is that it works for *any* angle, not just angles inside a right triangle (which are always between $0^\circ$ and $90^\circ$). If the angle goes into Quadrant II, III, or IV, or even wraps around the circle multiple times, the coordinates $(x,y)$ still tell us the sine and cosine, and their signs (positive or negative) will naturally reflect the quadrant.

**Concrete Example:**
*   For $\theta = 120^\circ$ (Quadrant II), the point is $P(-\frac{1}{2}, \frac{\sqrt{3}}{2})$. Here, $\cos 120^\circ = -\frac{1}{2}$ (negative x) and $\sin 120^\circ = \frac{\sqrt{3}}{2}$ (positive y).
*   For $\theta = 225^\circ$ (Quadrant III), the point is $P(-\frac{\sqrt{2}}{2}, -\frac{\sqrt{2}}{2})$. Here, $\cos 225^\circ = -\frac{\sqrt{2}}{2}$ and $\sin 225^\circ = -\frac{\sqrt{2}}{2}$. Both are negative, as expected in QIII.

**Formal/Mathematical Version:** The definitions $\cos \theta = x$ and $\sin \theta = y$ hold true for all real numbers $\theta$, including angles greater than $360^\circ$ (or $2\pi$ radians) and negative angles. The signs of $x$ and $y$ (and thus $\cos \theta$ and $\sin \theta$) depend on the quadrant in which the terminal side of $\theta$ lies.

**What could go wrong:** Forgetting to consider the sign of the coordinates based on the quadrant. This is a very common source of error. (All Students Take Calculus: A-All positive in Q1, S-Sine positive in Q2, T-Tangent positive in Q3, C-Cosine positive in Q4).

### ### Step 6: Defining Tangent

**Plain-English Statement:** Remember that tangent in a right triangle was Opposite/Adjacent? On the unit circle, Opposite is the y-coordinate (sine) and Adjacent is the x-coordinate (cosine). So, tangent is simply the y-coordinate divided by the x-coordinate.

**Concrete Example:**
*   For $\theta = 30^\circ$, $P(\frac{\sqrt{3}}{2}, \frac{1}{2})$. $\tan 30^\circ = \frac{1/2}{\sqrt{3}/2} = \frac{1}{\sqrt{3}} = \frac{\sqrt{3}}{3}$.
*   For $\theta = 180^\circ$, $P(-1, 0)$. $\tan 180^\circ = \frac{0}{-1} = 0$.

**Formal/Mathematical Version:** For any angle $\theta$ in standard position, with $P(x,y)$ on the unit circle:
$$\tan \theta = \frac{y}{x}$$
provided that $x \neq 0$.

**What could go wrong:** Forgetting that tangent is undefined when $x=0$. This happens when the terminal side is along the positive or negative y-axis (i.e., at $90^\circ$, $270^\circ$, etc.).

### ### Step 7: Defining Reciprocal Functions (Cosecant, Secant, Cotangent)

**Plain-English Statement:** The other three trigonometric functions are simply the reciprocals of sine, cosine, and tangent. Cosecant is 1/sine, secant is 1/cosine, and cotangent is 1/tangent.

**Concrete Example:**
*   If $\sin \theta = 1/2$, then $\csc \theta = 1/(1/2) = 2$.
*   If $\cos \theta = -\sqrt{3}/2$, then $\sec \theta = 1/(-\sqrt{3}/2) = -2/\sqrt{3} = -2\sqrt{3}/3$.
*   If $\tan \theta = 1$, then $\cot \theta = 1/1 = 1$.

**Formal/Mathematical Version:** For any angle $\theta$ in standard position, with $P(x,y)$ on the unit circle:
$$\csc \theta = \frac{1}{y} \quad \text{provided } y \neq 0$$
$$\sec \theta = \frac{1}{x} \quad \text{provided } x \neq 0$$
$$\cot \theta = \frac{x}{y} \quad \text{provided } y \neq 0$$

**What could go wrong:** Forgetting which reciprocal goes with which function (e.g., confusing $\csc$ with $\sec$). Also, forgetting that these functions are undefined when their denominators are zero.

## 5. Worked examples — multiple, with every step shown

Let's put these definitions into practice with several examples.

### Example 1: Find all 6 trigonometric functions for $\theta = 0$ radians ($0^\circ$).

**Problem:** Determine the values of $\sin 0$, $\cos 0$, $\tan 0$, $\csc 0$, $\sec 0$, and $\cot 0$.

**Given:** Angle $\theta = 0$ radians.
**Want:** All six trigonometric function values.

**Step-by-step solution:**

1.  **Identify the point P(x,y) on the unit circle:**
    *   When $\theta = 0$, the terminal side lies along the positive x-axis.
    *   The point where this terminal side intersects the unit circle ($x^2 + y^2 = 1$) is $(1,0)$.
    *   So, we have $x=1$ and $y=0$.
    *   *Explanation:* The initial position of the terminal side is along the positive x-axis. For an angle of 0, there is no rotation, so the terminal side remains exactly there. The point on the unit circle at the positive x-axis is $(1,0)$.

2.  **Calculate sine and cosine:**
    *   $\sin \theta = y$
    *   $\sin 0 = 0$
    *   $\cos \theta = x$
    *   $\cos 0 = 1$
    *   *Explanation:* By definition, the y-coordinate of the point on the unit circle is the sine, and the x-coordinate is the cosine.

3.  **Calculate tangent:**
    *   $\tan \theta = \frac{y}{x}$
    *   $\tan 0 = \frac{0}{1}$
    *   $\tan 0 = 0$
    *   *Explanation:* Tangent is the ratio of the y-coordinate to the x-coordinate.

4.  **Calculate cosecant (reciprocal of sine):**
    *   $\csc \theta = \frac{1}{y}$
    *   $\csc 0 = \frac{1}{0}$
    *   $\csc 0$ is undefined.
    *   *Explanation:* Cosecant is the reciprocal of sine. Since $\sin 0 = 0$, its reciprocal involves division by zero, which is undefined.

5.  **Calculate secant (reciprocal of cosine):**
    *   $\sec \theta = \frac{1}{x}$
    *   $\sec 0 = \frac{1}{1}$
    *   $\sec 0 = 1$
    *   *Explanation:* Secant is the reciprocal of cosine. Since $\cos 0 = 1$, its reciprocal is also 1.

6.  **Calculate cotangent (reciprocal of tangent):**
    *   $\cot \theta = \frac{x}{y}$
    *   $\cot 0 = \frac{1}{0}$
    *   $\cot 0$ is undefined.
    *   *Explanation:* Cotangent is the reciprocal of tangent (or x/y). Since $y=0$, its value is undefined due to division by zero.

**Final Answer:**
$\boxed{\sin 0 = 0}$
$\boxed{\cos 0 = 1}$
$\boxed{\tan 0 = 0}$
$\boxed{\csc 0 = \text{undefined}}$
$\boxed{\sec 0 = 1}$
$\boxed{\cot 0 = \text{undefined}}$

**Reflection:** This example highlights how the unit circle naturally handles angles where some functions might be undefined, as it directly involves coordinates that can be zero.

---

### Example 2: Find all 6 trigonometric functions for $\theta = 150^\circ$.

**Problem:** Determine the values of $\sin 150^\circ$, $\cos 150^\circ$, $\tan 150^\circ$, $\csc 150^\circ$, $\sec 150^\circ$, and $\cot 150^\circ$.

**Given:** Angle $\theta = 150^\circ$.
**Want:** All six trigonometric function values.

**Step-by-step solution:**

1.  **Identify the quadrant and reference angle:**
    *   $150^\circ$ is in Quadrant II (between $90^\circ$ and $180^\circ$).
    *   The reference angle $\alpha$ is the acute angle formed by the terminal side and the x-axis. For QII, $\alpha = 180^\circ - \theta = 180^\circ - 150^\circ = 30^\circ$.
    *   *Explanation:* Knowing the quadrant helps determine the signs of x and y. The reference angle allows us to use familiar $30^\circ-60^\circ-90^\circ$ triangle ratios.

2.  **Find the (x,y) coordinates for the reference angle in Q1:**
    *   For $30^\circ$ in Q1, the point on the unit circle is $(\cos 30^\circ, \sin 30^\circ) = (\frac{\sqrt{3}}{2}, \frac{1}{2})$.
    *   *Explanation:* We use our knowledge of common angles.

3.  **Adjust coordinates for the actual angle's quadrant:**
    *   In Quadrant II, the x-coordinate is negative, and the y-coordinate is positive.
    *   So, for $\theta = 150^\circ$, the point $P(x,y)$ on the unit circle is $(-\frac{\sqrt{3}}{2}, \frac{1}{2})$.
    *   Here, $x = -\frac{\sqrt{3}}{2}$ and $y = \frac{1}{2}$.
    *   *Explanation:* The absolute values of the coordinates are determined by the reference angle, but the signs are determined by the quadrant.

4.  **Calculate sine and cosine:**
    *   $\sin 150^\circ = y = \frac{1}{2}$
    *   $\cos 150^\circ = x = -\frac{\sqrt{3}}{2}$
    *   *Explanation:* Direct application of the unit circle definition.

5.  **Calculate tangent:**
    *   $\tan 150^\circ = \frac{y}{x} = \frac{1/2}{-\sqrt{3}/2}$
    *   $\tan 150^\circ = -\frac{1}{\sqrt{3}} = -\frac{\sqrt{3}}{3}$
    *   *Explanation:* Tangent is the ratio of y to x. Simplify the fraction and rationalize the denominator.

6.  **Calculate cosecant (reciprocal of sine):**
    *   $\csc 150^\circ = \frac{1}{y} = \frac{1}{1/2}$
    *   $\csc 150^\circ = 2$
    *   *Explanation:* Reciprocal of sine.

7.  **Calculate secant (reciprocal of cosine):**
    *   $\sec 150^\circ = \frac{1}{x} = \frac{1}{-\sqrt{3}/2}$
    *   $\sec 150^\circ = -\frac{2}{\sqrt{3}} = -\frac{2\sqrt{3}}{3}$
    *   *Explanation:* Reciprocal of cosine. Rationalize the denominator.

8.  **Calculate cotangent (reciprocal of tangent):**
    *   $\cot 150^\circ = \frac{x}{y} = \frac{-\sqrt{3}/2}{1/2}$
    *   $\cot 150^\circ = -\sqrt{3}$
    *   *Explanation:* Reciprocal of tangent (or x/y).

**Final Answer:**
$\boxed{\sin 150^\circ = \frac{1}{2}}$
$\boxed{\cos 150^\circ = -\frac{\sqrt{3}}{2}}$
$\boxed{\tan 150^\circ = -\frac{\sqrt{3}}{3}}$
$\boxed{\csc 150^\circ = 2}$
$\boxed{\sec 150^\circ = -\frac{2\sqrt{3}}{3}}$
$\boxed{\cot 150^\circ = -\sqrt{3}}$

**Reflection:** This example demonstrates the importance of determining the correct signs for x and y based on the quadrant, even when using reference angles.

---

### Example 3: Find all 6 trigonometric functions for $\theta = \frac{3\pi}{2}$ radians.

**Problem:** Determine the values of $\sin (\frac{3\pi}{2})$, $\cos (\frac{3\pi}{2})$, $\tan (\frac{3\pi}{2})$, $\csc (\frac{3\pi}{2})$, $\sec (\frac{3\pi}{2})$, and $\cot (\frac{3\pi}{2})$.

**Given:** Angle $\theta = \frac{3\pi}{2}$ radians.
**Want:** All six trigonometric function values.

**Step-by-step solution:**

1.  **Convert to degrees (optional, for visualization) and identify the position:**
    *   $\frac{3\pi}{2}$ radians is equivalent to $\frac{3 \times 180^\circ}{2} = 270^\circ$.
    *   An angle of $270^\circ$ means the terminal side points straight down along the negative y-axis. This is a quadrantal angle.
    *   *Explanation:* Converting to degrees can sometimes make it easier to visualize the position on the unit circle for students more familiar with degrees. Quadrantal angles are those whose terminal side lies on an axis.

2.  **Identify the point P(x,y) on the unit circle:**
    *   The point where the terminal side intersects the unit circle ($x^2 + y^2 = 1$) at $270^\circ$ is $(0,-1)$.
    *   So, we have $x=0$ and $y=-1$.
    *   *Explanation:* At $270^\circ$, the point is directly below the origin on the unit circle.

3.  **Calculate sine and cosine:**
    *   $\sin (\frac{3\pi}{2}) = y = -1$
    *   $\cos (\frac{3\pi}{2}) = x = 0$
    *   *Explanation:* Direct application of the unit circle definition.

4.  **Calculate tangent:**
    *   $\tan (\frac{3\pi}{2}) = \frac{y}{x} = \frac{-1}{0}$
    *   $\tan (\frac{3\pi}{2})$ is undefined.
    *   *Explanation:* Division by zero means the tangent is undefined. This occurs when the x-coordinate is zero.

5.  **Calculate cosecant (reciprocal of sine):**
    *   $\csc (\frac{3\pi}{2}) = \frac{1}{y} = \frac{1}{-1}$
    *   $\csc (\frac{3\pi}{2}) = -1$
    *   *Explanation:* Reciprocal of sine.

6.  **Calculate secant (reciprocal of cosine):**
    *   $\sec (\frac{3\pi}{2}) = \frac{1}{x} = \frac{1}{0}$
    *   $\sec (\frac{3\pi}{2})$ is undefined.
    *   *Explanation:* Reciprocal of cosine. Division by zero means the secant is undefined.

7.  **Calculate cotangent (reciprocal of tangent):**
    *   $\cot (\frac{3\pi}{2}) = \frac{x}{y} = \frac{0}{-1}$
    *   $\cot (\frac{3\pi}{2}) = 0$
    *   *Explanation:* Reciprocal of tangent (or x/y). Here, x is 0, so the cotangent is 0.

**Final Answer:**
$\boxed{\sin (\frac{3\pi}{2}) = -1}$
$\boxed{\cos (\frac{3\pi}{2}) = 0}$
$\boxed{\tan (\frac{3\pi}{2}) = \text{undefined}}$
$\boxed{\csc (\frac{3\pi}{2}) = -1}$
$\boxed{\sec (\frac{3\pi}{2}) = \text{undefined}}$
$\boxed{\cot (\frac{3\pi}{2}) = 0}$

**Reflection:** This example reinforces how to handle quadrantal angles and highlights cases where trigonometric functions become undefined due to division by zero.

---

### Example 4: Given $\sin \theta = -3/5$ and $\theta$ is in Quadrant III, find all 6 trigonometric functions.

**Problem:** Given $\sin \theta = -3/5$ and $\theta$ is in QIII, determine the values of $\sin \theta$, $\cos \theta$, $\tan \theta$, $\csc \theta$, $\sec \theta$, and $\cot \theta$.

**Given:** $\sin \theta = -3/5$, $\theta$ is in Quadrant III.
**Want:** All six trigonometric function values.

**Step-by-step solution:**

1.  **Use the definition of sine to find the y-coordinate:**
    *   From the unit circle definition, $\sin \theta = y$.
    *   So, $y = -3/5$.
    *   *Explanation:* The sine value directly gives us the y-coordinate of the point on the unit circle.

2.  **Use the unit circle equation to find the x-coordinate:**
    *   The equation of the unit circle is $x^2 + y^2 = 1$.
    *   Substitute the value of $y$: $x^2 + (-3/5)^2 = 1$.
    *   $x^2 + \frac{9}{25} = 1$.
    *   $x^2 = 1 - \frac{9}{25}$.
    *   $x^2 = \frac{25}{25} - \frac{9}{25}$.
    *   $x^2 = \frac{16}{25}$.
    *   $x = \pm\sqrt{\frac{16}{25}}$.
    *   $x = \pm\frac{4}{5}$.
    *   *Explanation:* The Pythagorean identity (derived from the unit circle equation) allows us to find the missing coordinate.

3.  **Determine the sign of the x-coordinate based on the quadrant:**
    *   We are given that $\theta$ is in Quadrant III.
    *   In Quadrant III, both x-coordinates and y-coordinates are negative.
    *   Therefore, $x = -\frac{4}{5}$.
    *   *Explanation:* This is a critical step. The square root gives two possibilities, but the quadrant information resolves the ambiguity.

4.  **Identify the point P(x,y):**
    *   The point on the unit circle is $P(-\frac{4}{5}, -\frac{3}{5})$.
    *   So, $x = -\frac{4}{5}$ and $y = -\frac{3}{5}$.
    *   *Explanation:* Now we have both coordinates, which are the foundation for all other trig functions.

5.  **Calculate sine and cosine:**
    *   $\sin \theta = y = -\frac{3}{5}$ (given)
    *   $\cos \theta = x = -\frac{4}{5}$
    *   *Explanation:* Cosine is the x-coordinate.

6.  **Calculate tangent:**
    *   $\tan \theta = \frac{y}{x} = \frac{-3/5}{-4/5}$
    *   $\tan \theta = \frac{3}{4}$
    *   *Explanation:* Tangent is y/x. The negative signs cancel, which is expected for QIII where tangent is positive.

7.  **Calculate cosecant (reciprocal of sine):**
    *   $\csc \theta = \frac{1}{y} = \frac{1}{-3/5}$
    *   $\csc \theta = -\frac{5}{3}$
    *   *Explanation:* Reciprocal of sine.

8.  **Calculate secant (reciprocal of cosine):**
    *   $\sec \theta = \frac{1}{x} = \frac{1}{-4/5}$
    *   $\sec \theta = -\frac{5}{4}$
    *   *Explanation:* Reciprocal of cosine.

9.  **Calculate cotangent (reciprocal of tangent):**
    *   $\cot \theta = \frac{x}{y} = \frac{-4/5}{-3/5}$
    *   $\cot \theta = \frac{4}{3}$
    *   *Explanation:* Reciprocal of tangent (or x/y).

**Final Answer:**
$\boxed{\sin \theta = -\frac{3}{5}}$
$\boxed{\cos \theta = -\frac{4}{5}}$
$\boxed{\tan \theta = \frac{3}{4}}$
$\boxed{\csc \theta = -\frac{5}{3}}$
$\boxed{\sec \theta = -\frac{5}{4}}$
$\boxed{\cot \theta = \frac{4}{3}}$

**Reflection:** This example demonstrates how to use one given trigonometric value and quadrant information to find all other values, leveraging the unit circle equation ($x^2+y^2=1$) and the definitions of the functions. The quadrant is crucial for determining the correct sign of the unknown coordinate.

## 6. Common mistakes and traps

Students often stumble on particular aspects when working with the unit circle definition. Be mindful of these common traps:

1.  **Forgetting the radius is 1:** Many problems involve a point $(x,y)$ on a circle *not* of radius 1. In such cases, $\cos \theta = x/r$ and $\sin \theta = y/r$. Forgetting to divide by $r$ when $r \neq 1$ is a common error.
2.  **Mixing up x and y for cos and sin:** Consistently associating the x-coordinate with cosine and the y-coordinate with sine is crucial. Students sometimes swap them, especially under pressure.
3.  **Sign errors in different quadrants:** Incorrectly applying the signs of x and y based on the quadrant is a very frequent mistake. Remember:
    *   Q1: x+, y+ (All positive)
    *   Q2: x-, y+ (Sine positive)
    *   Q3: x-, y- (Tangent positive)
    *   Q4: x+, y- (Cosine positive)
4.  **Division by zero for reciprocal functions:** Forgetting that $\tan \theta$, $\sec \theta$, $\csc \theta$, or $\cot \theta$ can be undefined when their denominators ($x$ or $y$) are zero. This happens at quadrantal angles ($0, \pi/2, \pi, 3\pi/2$, etc.).
5.  **Incorrectly using reference angles:** While reference angles are helpful, they only give the *magnitude* of the coordinates. The *sign* must still be determined by the actual angle's quadrant.
6.  **Confusing positive and negative angles:** A negative angle means clockwise rotation. This changes the terminal side's position and thus the (x,y) coordinates and their signs. For example, $\theta = -45^\circ$ is in Q4, while $\theta = 45^\circ$ is in Q1.

## 7. Textbook-precise explanation

The unit circle provides a rigorous and generalized definition for the six trigonometric functions, extending their domain beyond acute angles in right triangles to all real numbers.

Let $C$ be the unit circle defined by the equation $x^2 + y^2 = 1$ in the Cartesian coordinate plane, centered at the origin $O(0,0)$.

Consider an angle $\theta$ in standard position. This means its vertex is at the origin, and its initial side coincides with the positive x-axis. The terminal side of $\theta$ is formed by rotating the initial side counter-clockwise for positive $\theta$ and clockwise for negative $\theta$.

Let $P(x,y)$ be the unique point where the terminal side of the angle $\theta$ intersects the unit circle $C$.

The six trigonometric functions of $\theta$ are then defined as follows:

1.  **Sine:** The sine of $\theta$, denoted $\sin \theta$, is the y-coordinate of the point $P(x,y)$.
    $$\sin \theta = y$$
    Domain: $(-\infty, \infty)$
    Range: $[-1, 1]$

2.  **Cosine:** The cosine of $\theta$, denoted $\cos \theta$, is the x-coordinate of the point $P(x,y)$.
    $$\cos \theta = x$$
    Domain: $(-\infty, \infty)$
    Range: $[-1, 1]$

3.  **Tangent:** The tangent of $\theta$, denoted $\tan \theta$, is the ratio of the y-coordinate to the x-coordinate of $P(x,y)$.
    $$\tan \theta = \frac{y}{x}$$
    Domain: All real numbers $\theta$ such that $x \neq 0$ (i.e., $\theta \neq \frac{\pi}{2} + n\pi$ for any integer $n$).
    Range: $(-\infty, \infty)$

4.  **Cosecant:** The cosecant of $\theta$, denoted $\csc \theta$, is the reciprocal of the sine of $\theta$.
    $$\csc \theta = \frac{1}{y}$$
    Domain: All real numbers $\theta$ such that $y \neq 0$ (i.e., $\theta \neq n\pi$ for any integer $n$).
    Range: $(-\infty, -1] \cup [1, \infty)$

5.  **Secant:** The secant of $\theta$, denoted $\sec \theta$, is the reciprocal of the cosine of $\theta$.
    $$\sec \theta = \frac{1}{x}$$
    Domain: All real numbers $\theta$ such that $x \neq 0$ (i.e., $\theta \neq \frac{\pi}{2} + n\pi$ for any integer $n$).
    Range: $(-\infty, -1] \cup [1, \infty)$

6.  **Cotangent:** The cotangent of $\theta$, denoted $\cot \theta$, is the reciprocal of the tangent of $\theta$.
    $$\cot \theta = \frac{x}{y}$$
    Domain: All real numbers $\theta$ such that $y \neq 0$ (i.e., $\theta \neq n\pi$ for any integer $n$).
    Range: $(-\infty, \infty)$

From the equation of the unit circle, $x^2 + y^2 = 1$, it immediately follows that:
$$\cos^2 \theta + \sin^2 \theta = 1$$
This is the fundamental Pythagorean Identity, which holds for all real numbers $\theta$.

This definition is standard in precalculus and calculus textbooks. For instance, see *Stewart, Calculus: Early Transcendentals, 9e, §1.3* or *Thomas' Calculus, 14e, §1.5*.

## 8. ASCII diagrams

Here's a representation of the unit circle with an angle $\theta$ in standard position, showing the point P(x,y) and its relation to sine and cosine.

```text
       Y-axis
         ^
         |
         |    P(x,y)
         |   /|
         |  / | y = sin(theta)
         | /  |
         |/___|
         O-----X-axis
        (0,0)  x = cos(theta)
         |
         |
         |
         +-------------------
         | Unit Circle: x^2 + y^2 = 1
         | Radius = 1
```

**Description of the Figure:**
The diagram shows a Cartesian coordinate system with the origin O(0,0). A unit circle (radius 1) is centered at the origin. An angle $\theta$ is drawn in standard position: its initial side lies along the positive x-axis, and its terminal side rotates counter-clockwise. The terminal side intersects the unit circle at point P(x,y). A perpendicular line is dropped from P to the x-axis, forming a right-angled triangle in the first quadrant. In this triangle:
*   The hypotenuse is the radius of the unit circle, which has a length of 1.
*   The horizontal side (adjacent to $\theta$) has a length of $x$.
*   The vertical side (opposite to $\theta$) has a length of $y$.
According to the unit circle definition, the x-coordinate of P is $\cos \theta$, and the y-coordinate of P is $\sin \theta$.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic / Visual Hook:**
    *   **"Cos-X, Sin-Y"**: This is the most fundamental connection. Cosine is always the x-coordinate, Sine is always the y-coordinate. Imagine an "X" for "coSine" and a "Y" for "Sine".
    *   **"The Unit Circle is a Coordinate Map for Angles"**: Visualize the unit circle as a giant compass or a clock face where every angle points to a specific (x,y) address. That address *is* the cosine and sine of the angle.
    *   **"ASTC Rule for Signs"**: "All Students Take Calculus" or "Add Sugar To Coffee" (starting from Q1 and going counter-clockwise).
        *   **A**ll (Q1): All functions are positive.
        *   **S**ine (Q2): Sine and its reciprocal (cosecant) are positive.
        *   **T**angent (Q3): Tangent and its reciprocal (cotangent) are positive.
        *   **C**osine (Q4): Cosine and its reciprocal (secant) are positive.

2.  **Formulas/Facts to Overlearn:**
    *   **The fundamental definitions:** $x = \cos \theta$, $y = \sin \theta$. This is the absolute core.
    *   **The Pythagorean Identity:** $\sin^2 \theta + \cos^2 \theta = 1$. This comes directly from $x^2 + y^2 = 1$.
    *   **Tangent in terms of sine and cosine:** $\tan \theta = \frac{\sin \theta}{\cos \theta}$.
    *   **Reciprocal definitions:**
        *   $\csc \theta = \frac{1}{\sin \theta}$
        *   $\sec \theta = \frac{1}{\cos \theta}$
        *   $\cot \theta = \frac{1}{\tan \theta} = \frac{\cos \theta}{\sin \theta}$

3.  **Spaced-Repetition Schedule:** To truly embed this knowledge, review it consistently:
    *   **1 Day:** After this lesson, briefly review the core definitions and the ASTC rule.
    *   **3 Days:** Practice 2-3 problems, focusing on different quadrants and quadrantal angles.
    *   **7 Days:** Review all definitions and try to derive them from scratch. Work on 2-3 more challenging problems.
    *   **16 Days:** Attempt a comprehensive set of problems covering all aspects, including those where functions are undefined.
    *   **35 Days:** Revisit the entire topic, focusing on how it connects to other concepts (e.g., graphing, identities).

4.  **First-Principles Re-derivation Pathway:** If you ever forget the unit circle definitions, you can rebuild them from basic right-triangle trigonometry:
    1.  **Start with a right triangle in Quadrant I:** Draw a right triangle with an acute angle $\theta$. Label the opposite side $y'$, the adjacent side $x'$, and the hypotenuse $r'$.
    2.  **Recall SOH CAH TOA:**
        *   $\sin \theta = \frac{\text{Opposite}}{\text{Hypotenuse}} = \frac{y'}{r'}$
        *   $\cos \theta = \frac{\text{Adjacent}}{\text{Hypotenuse}} = \frac{x'}{r'}$
    3.  **Scale to a unit circle:** Imagine this triangle is scaled down (or up) so that its hypotenuse $r'$ becomes 1. When $r'=1$, the new opposite side is $y = y'/r'$ and the new adjacent side is $x = x'/r'$.
    4.  **Connect to coordinates:** If the hypotenuse is 1, then the point where the hypotenuse meets the terminal side is $(x,y)$.
    5.  **Substitute:**
        *   $\sin \theta = \frac{y}{1} = y$
        *   $\cos \theta = \frac{x}{1} = x$
    6.  **Generalize:** Realize that this geometric interpretation (x and y coordinates) works regardless of which quadrant the terminal side falls into, as long as you account for the signs of x and y based on the quadrant. The "hypotenuse" (radius) is always positive 1.

## 10. Connections — what this leads to

The unit circle definition of trigonometric functions is a cornerstone of advanced mathematics. Mastering it unlocks a vast array of subsequent topics:

*   **Graphing Trigonometric Functions:** Understanding how sine and cosine values cycle between -1 and 1 as the angle increases allows you to visualize and draw the graphs of $y = \sin x$ and $y = \cos x$, and subsequently understand amplitude, period, phase shift, and vertical shift for all trigonometric functions.
*   **Trigonometric Identities:** The unit circle definition is the basis for deriving and understanding almost all trigonometric identities, especially the Pythagorean identities ($\sin^2 \theta + \cos^2 \theta = 1$) and sum/difference formulas.
*   **Inverse Trigonometric Functions:** Since trigonometric functions are periodic, their inverses require restricted domains. The unit circle helps visualize these restrictions and why, for example, $\arcsin x$ only returns values in $[-\pi/2, \pi/2]$.
*   **Polar Coordinates:** The (x,y) coordinates on the unit circle are directly related to polar coordinates $(r, \theta)$, where for the unit circle, $r=1$, so $x = \cos \theta$ and $y = \sin \theta$. This connection is fundamental for describing points and curves in a different coordinate system.
*   **Complex Numbers (Euler's Formula):** The unit circle is central to understanding complex numbers in polar form ($z = r(\cos \theta + i \sin \theta)$) and the profoundly important Euler's Formula ($e^{i\theta} = \cos \theta + i \sin \theta$). This links exponential functions to trigonometry and geometry.
*   **Vectors:** Trigonometric functions are used extensively in vector decomposition (breaking a vector into its x and y components using $\vec{v}_x = |\vec{v}|\cos \theta$ and $\vec{v}_y = |\vec{v}|\sin \theta$) and rotation of vectors.
*   **Calculus of Trigonometric Functions:** The derivatives and integrals of trigonometric functions (e.g., $\frac{d}{dx}(\sin x) = \cos x$) are derived and understood based on their continuous behavior as defined by the unit circle. Limits involving trigonometric functions also rely on this fundamental understanding.
*   **Differential Equations:** Many differential equations, especially those modeling oscillations and waves, have trigonometric functions as solutions.

## 11. Self-check questions

1.  What are the coordinates $(x,y)$ on the unit circle for an angle of $\theta = \frac{5\pi}{6}$ radians? Use these coordinates to find the value of $\tan(\frac{5\pi}{6})$.
2.  An angle $\phi$ has its terminal side intersecting the unit circle at the point $P(-\frac{5}{13}, -\frac{12}{13})$. Find the values of $\sin \phi$, $\cos \phi$, and $\sec \phi$.
3.  For what angles $\theta$ (in radians, $0 \le \theta < 2\pi$) is the function $\csc \theta$ undefined? Explain your reasoning using the unit circle definition.
4.  If $\cos \theta = \frac{1}{2}$ and $\theta$ is in Quadrant IV, find the exact values of all six trigonometric functions for $\theta$.
5.  Consider an angle $\alpha = -3\pi$ radians.
    a) In which quadrant does the terminal side of $\alpha$ lie?
    b) What are the coordinates $(x,y)$ on the unit circle for this angle?
    c) Determine the values of $\sin \alpha$, $\tan \alpha$, and $\cot \alpha$.