## 1. What it is — in plain English

Imagine you have a calculator with a "sine" button. You put in an angle, say 30 degrees, press "sine", and out pops a number, 0.5. The sine function takes an angle and gives you a ratio (like a measurement of a side relative to another side in a right triangle).

Now, what if you wanted to go the other way? What if you knew the ratio was 0.5, and you wanted to find out what angle produced that ratio? That's where inverse trigonometric functions come in. They are like the "undo" buttons for sine, cosine, and tangent.

So, instead of asking "What is the sine of 30 degrees?", you're asking "What angle has a sine of 0.5?". The answer is 30 degrees (or $\pi/6$ radians). This "undoing" function is called "arcsin" (pronounced "arc-sine") or sometimes "inverse sine".

In simple terms, an inverse trigonometric function takes a *ratio* as its input and gives you an *angle* as its output. It's asking: "What angle gives me this specific trigonometric ratio?"

## 2. Why it matters — real-world applications

Inverse trigonometric functions are not just abstract mathematical concepts; they are fundamental tools used across various scientific and engineering disciplines. They allow us to determine angles when we know the ratios of sides, which is crucial in many real-world scenarios.

1.  **Robotics and Animation (Inverse Kinematics):** In robotics, an engineer might need to know what angles the joints of a robotic arm must be set to so that the end-effector (the "hand") reaches a specific point in space. This is called inverse kinematics. Similarly, in computer animation for movies or video games, animators use inverse kinematics to pose characters naturally. For example, if a character's hand needs to grasp an object, inverse trig functions help calculate the exact elbow and shoulder joint angles required.

2.  **Navigation and Surveying (GPS and Mapping):** When determining positions or bearings, surveyors and GPS systems often use inverse trigonometric functions. If you know the distances between points (e.g., using satellite signals) and want to find the angle of elevation or the bearing to a landmark, you'll use functions like `arctan`. For instance, calculating the angle of descent for an aircraft or the angle of a land plot boundary relies heavily on these functions.

3.  **Physics and Engineering (Projectile Motion, Wave Analysis):**
    *   **Projectile Motion:** When launching a projectile (like a rocket or a ball), if you know the initial velocity and want to hit a target at a certain distance, you might need to find the launch angle. Inverse trig functions are essential for solving such problems.
    *   **Wave Analysis:** In fields like acoustics or electrical engineering, when analyzing wave phenomena (sound waves, electromagnetic waves), inverse trig functions can be used to determine the phase shift or frequency of a wave given its amplitude and time-dependent behavior. For example, analyzing the phase difference between voltage and current in an AC circuit often involves `arctan`.

4.  **Computer Graphics and Game Development:** Beyond animation, inverse trig functions are used extensively in 3D graphics for tasks like camera control, object rotation, and collision detection. For example, to make a camera "look at" a specific target point in a 3D scene, the angles of rotation around the x, y, and z axes (often called Euler angles) are calculated using inverse trigonometric functions based on the relative positions of the camera and the target.

## 3. Prerequisites — what you must know first

Before diving deep into inverse trigonometric functions, ensure you have a solid grasp of the following concepts:

*   **Functions:** Understanding what a function is (a rule that assigns each input exactly one output), its notation ($f(x)$), and how to read function graphs.
*   **Inverse Functions:** Knowing what an inverse function *does* (reverses the input and output of the original function), the concept of a one-to-one function, and how to test for it (horizontal line test).
*   **Domain and Range:** Being able to identify the set of all possible input values (domain) and output values (range) for a given function.
*   **Trigonometric Functions (Sine, Cosine, Tangent):** A thorough understanding of their definitions (SOH CAH TOA, unit circle), their values for common angles (e.g., $0, \pi/6, \pi/4, \pi/3, \pi/2$), and their behavior.
*   **Unit Circle:** Familiarity with the unit circle, how angles are measured (radians and degrees), and how it relates to the signs and values of sine, cosine, and tangent in all four quadrants.
*   **Graphs of Trigonometric Functions:** Knowing the characteristic shapes of $y = \sin(x)$, $y = \cos(x)$, and $y = \tan(x)$, including their periodicity, amplitude, and asymptotes.
*   **Algebraic Manipulation:** Proficiency in solving equations and rearranging expressions.

## 4. The core idea — step by step

Let's build up the concept of inverse trigonometric functions carefully, step by step.

### Step 1: The Problem with Inverting Periodic Functions

**Plain English:** Imagine a function that repeats its output values over and over again. If you try to reverse it, one output value from the original function would correspond to *many* different input values. An inverse function, by definition, must give only *one* output for each input.

**Concrete Example:** Consider the function $y = \sin(x)$.
If you ask "What angle $x$ has $\sin(x) = 1/2$?", you'll find many answers:
$x = \pi/6$ (or $30^\circ$)
$x = 5\pi/6$ (or $150^\circ$)
$x = 13\pi/6$ (or $390^\circ$)
$x = -7\pi/6$ (or $-210^\circ$)
...and so on, infinitely many solutions.

**Formal/Mathematical Version:** A function $f$ has an inverse $f^{-1}$ if and only if $f$ is **one-to-one**. A function is one-to-one if every distinct input maps to a distinct output. Graphically, this means it passes the **horizontal line test** (any horizontal line intersects the graph at most once).

The graphs of $y = \sin(x)$, $y = \cos(x)$, and $y = \tan(x)$ clearly fail the horizontal line test because they are periodic.
$$ \begin{array}{c} \text{Graph of } y = \sin(x) \\ \text{It clearly fails the horizontal line test.} \end{array} $$
```text
      ^ y
      |   /\
      |  /  \
------|--+----+-------> x
      | /    \
      |/      \
      +--------+--------+--------+--------+
    -2π      -π       0        π        2π
```

**What could go wrong:** If we tried to define an inverse function directly from the full sine function, $\sin^{-1}(1/2)$ would have to output infinitely many values, which violates the definition of a function. A function must have a unique output for each input.

### Step 2: Restricting the Domain to Make it One-to-One

**Plain English:** To create a proper inverse function, we must "chop off" parts of the original trigonometric function's graph so that the remaining piece *is* one-to-one. We choose a specific, continuous segment of the graph that covers all possible output ratios exactly once. This chosen segment is called the "principal branch."

**Concrete Example:** For $y = \sin(x)$, we need to select a portion of its domain where it goes from its minimum value of $-1$ to its maximum value of $1$ exactly once. The universally accepted choice is the interval from $-\pi/2$ to $\pi/2$ (or $-90^\circ$ to $90^\circ$). In this interval, $\sin(x)$ is always increasing, so it passes the horizontal line test.

**Formal/Mathematical Version:**
*   For $y = \sin(x)$, we restrict the domain to $x \in [-\pi/2, \pi/2]$. On this interval, the range of $\sin(x)$ is $[-1, 1]$, and it is one-to-one.
*   For $y = \cos(x)$, we restrict the domain to $x \in [0, \pi]$. On this interval, the range of $\cos(x)$ is $[-1, 1]$, and it is one-to-one.
*   For $y = \tan(x)$, we restrict the domain to $x \in (-\pi/2, \pi/2)$. On this interval, the range of $\tan(x)$ is $(-\infty, \infty)$, and it is one-to-one. Note the open interval because $\tan(x)$ is undefined at $\pm \pi/2$.

**What could go wrong:** If we chose a different interval (e.g., $[0, \pi]$ for sine), the function would not be one-to-one (e.g., $\sin(\pi/6) = 1/2$ and $\sin(5\pi/6) = 1/2$ are both in this interval), and therefore its inverse wouldn't be a function. The chosen intervals are standard and ensure that the inverse functions are well-defined and cover all possible output ratios.

### Step 3: Defining Arcsin (Inverse Sine)

**Plain English:** The arcsin function, denoted $\arcsin(x)$ or $\sin^{-1}(x)$, answers the question: "What angle, between $-\pi/2$ and $\pi/2$ (inclusive), has a sine of $x$?" The input $x$ must be a ratio between $-1$ and $1$.

**Concrete Example:**
*   $\arcsin(1/2) = \pi/6$ (because $\sin(\pi/6) = 1/2$ and $\pi/6$ is in $[-\pi/2, \pi/2]$).
*   $\arcsin(-1) = -\pi/2$ (because $\sin(-\pi/2) = -1$ and $-\pi/2$ is in $[-\pi/2, \pi/2]$).
*   $\arcsin(0) = 0$ (because $\sin(0) = 0$ and $0$ is in $[-\pi/2, \pi/2]$).

**Formal/Mathematical Version:**
The inverse sine function, denoted $\arcsin(x)$ or $\sin^{-1}(x)$, is defined as:
$y = \arcsin(x) \quad \iff \quad x = \sin(y)$
**Domain:** $[-1, 1]$ (This is the range of the restricted $\sin(x)$).
**Range:** $[-\pi/2, \pi/2]$ (This is the domain of the restricted $\sin(x)$).

**Graph:** The graph of $y = \arcsin(x)$ is obtained by reflecting the graph of $y = \sin(x)$ (restricted to $[-\pi/2, \pi/2]$) across the line $y=x$. It starts at $(-1, -\pi/2)$, passes through $(0,0)$, and ends at $(1, \pi/2)$. It's an increasing function.

**What could go wrong:**
*   Trying to find $\arcsin(2)$ or $\arcsin(-1.5)$. These are undefined because the input $x$ must be between $-1$ and $1$.
*   Giving an angle outside the range $[-\pi/2, \pi/2]$. For example, $\arcsin(1/2)$ is $\pi/6$, not $5\pi/6$, even though $\sin(5\pi/6) = 1/2$. The range restriction is crucial for a unique output.

### Step 4: Defining Arccos (Inverse Cosine)

**Plain English:** The arccos function, denoted $\arccos(x)$ or $\cos^{-1}(x)$, answers the question: "What angle, between $0$ and $\pi$ (inclusive), has a cosine of $x$?" The input $x$ must be a ratio between $-1$ and $1$.

**Concrete Example:**
*   $\arccos(1/2) = \pi/3$ (because $\cos(\pi/3) = 1/2$ and $\pi/3$ is in $[0, \pi]$).
*   $\arccos(-1/2) = 2\pi/3$ (because $\cos(2\pi/3) = -1/2$ and $2\pi/3$ is in $[0, \pi]$).
*   $\arccos(0) = \pi/2$ (because $\cos(\pi/2) = 0$ and $\pi/2$ is in $[0, \pi]$).

**Formal/Mathematical Version:**
The inverse cosine function, denoted $\arccos(x)$ or $\cos^{-1}(x)$, is defined as:
$y = \arccos(x) \quad \iff \quad x = \cos(y)$
**Domain:** $[-1, 1]$ (This is the range of the restricted $\cos(x)$).
**Range:** $[0, \pi]$ (This is the domain of the restricted $\cos(x)$).

**Graph:** The graph of $y = \arccos(x)$ is obtained by reflecting the graph of $y = \cos(x)$ (restricted to $[0, \pi]$) across the line $y=x$. It starts at $(-1, \pi)$, passes through $(0, \pi/2)$, and ends at $(1, 0)$. It's a decreasing function.

**What could go wrong:**
*   Trying to find $\arccos(1.1)$ or $\arccos(-3)$. Undefined, as $x$ must be in $[-1, 1]$.
*   Giving an angle outside the range $[0, \pi]$. For example, $\arccos(-1/2)$ is $2\pi/3$, not $-2\pi/3$, even though $\cos(-2\pi/3) = -1/2$. The range restriction is crucial. Notice that the range for arccos is different from arcsin.

### Step 5: Defining Arctan (Inverse Tangent)

**Plain English:** The arctan function, denoted $\arctan(x)$ or $\tan^{-1}(x)$, answers the question: "What angle, strictly between $-\pi/2$ and $\pi/2$, has a tangent of $x$?" The input $x$ can be any real number.

**Concrete Example:**
*   $\arctan(1) = \pi/4$ (because $\tan(\pi/4) = 1$ and $\pi/4$ is in $(-\pi/2, \pi/2)$).
*   $\arctan(-\sqrt{3}) = -\pi/3$ (because $\tan(-\pi/3) = -\sqrt{3}$ and $-\pi/3$ is in $(-\pi/2, \pi/2)$).
*   $\arctan(0) = 0$ (because $\tan(0) = 0$ and $0$ is in $(-\pi/2, \pi/2)$).

**Formal/Mathematical Version:**
The inverse tangent function, denoted $\arctan(x)$ or $\tan^{-1}(x)$, is defined as:
$y = \arctan(x) \quad \iff \quad x = \tan(y)$
**Domain:** $(-\infty, \infty)$ (This is the range of the restricted $\tan(x)$).
**Range:** $(-\pi/2, \pi/2)$ (This is the domain of the restricted $\tan(x)$). Note the open interval due to vertical asymptotes of $\tan(x)$.

**Graph:** The graph of $y = \arctan(x)$ is obtained by reflecting the graph of $y = \tan(x)$ (restricted to $(-\pi/2, \pi/2)$) across the line $y=x$. It has horizontal asymptotes at $y = -\pi/2$ and $y = \pi/2$. It's an increasing function.

**What could go wrong:**
*   Giving an angle equal to $\pi/2$ or $-\pi/2$. These are not in the range of arctan. The range is *strictly* between $-\pi/2$ and $\pi/2$.
*   Confusing the range of arctan with arccos. Arctan's range is the same as arcsin's, but it's an open interval.

### Step 6: Notation and Common Pitfalls

**Plain English:** There are two common ways to write inverse trig functions: $\arcsin(x)$ and $\sin^{-1}(x)$. Both mean the same thing. However, be very careful with the $\sin^{-1}(x)$ notation! It does *not* mean $1/\sin(x)$. If you want to write $1/\sin(x)$, you should write $(\sin(x))^{-1}$ or $\csc(x)$. Also, remember that angles are usually in radians unless degrees are explicitly stated.

**Formal/Mathematical Version:**
*   $\sin^{-1}(x)$ is the inverse function of $\sin(x)$.
*   $(\sin(x))^{-1} = \frac{1}{\sin(x)} = \csc(x)$. These are different.
*   The same applies to $\cos^{-1}(x) \neq (\cos(x))^{-1} = \sec(x)$ and $\tan^{-1}(x) \neq (\tan(x))^{-1} = \cot(x)$.
*   Unless specified, assume angles are in radians.

**What could go wrong:** Misinterpreting $\sin^{-1}(x)$ as the reciprocal function is a very common and critical error. Always clarify notation if unsure.

## 5. Worked examples — multiple, with every step shown

### Example 1: Evaluate $\arcsin(\sqrt{3}/2)$

**Problem:** Find the value of $\arcsin(\sqrt{3}/2)$.

**Given:** The ratio is $\sqrt{3}/2$. We want the angle whose sine is $\sqrt{3}/2$.
**Goal:** Find $y$ such that $y = \arcsin(\sqrt{3}/2)$.

**Step-by-step Solution:**

1.  $$y = \arcsin\left(\frac{\sqrt{3}}{2}\right)$$
    This is the problem statement. We are looking for an angle $y$.

2.  $$ \sin(y) = \frac{\sqrt{3}}{2} $$
    By the definition of the inverse sine function, this means that the sine of the angle $y$ is $\sqrt{3}/2$.

3.  $$ \text{And } y \in \left[-\frac{\pi}{2}, \frac{\pi}{2}\right] $$
    We also know that the range of $\arcsin(x)$ is $[-\pi/2, \pi/2]$. This is a crucial constraint.

4.  $$ \text{Recall common trigonometric values.} $$
    From memory or the unit circle, we know that $\sin(\pi/3) = \sqrt{3}/2$.

5.  $$ \text{Check if } \pi/3 \text{ is in the restricted range.} $$
    The angle $\pi/3$ is approximately $1.047$ radians. The interval $[-\pi/2, \pi/2]$ is approximately $[-1.571, 1.571]$ radians. Since $\pi/3$ falls within this interval, it is a valid solution.

6.  $$ y = \frac{\pi}{3} $$
    Therefore, the angle whose sine is $\sqrt{3}/2$ and that lies in the principal range is $\pi/3$.

**Final Answer:** $\boxed{\frac{\pi}{3}}$

**Reflection:** This example was straightforward because $\sqrt{3}/2$ is a common positive ratio, and the angle $\pi/3$ lies directly in the first quadrant, which is part of the principal range of arcsin. The key is remembering the restricted range.

---

### Example 2: Evaluate $\arccos(-1/2)$

**Problem:** Find the value of $\arccos(-1/2)$.

**Given:** The ratio is $-1/2$. We want the angle whose cosine is $-1/2$.
**Goal:** Find $y$ such that $y = \arccos(-1/2)$.

**Step-by-step Solution:**

1.  $$y = \arccos\left(-\frac{1}{2}\right)$$
    This is the problem statement. We are looking for an angle $y$.

2.  $$ \cos(y) = -\frac{1}{2} $$
    By the definition of the inverse cosine function, this means that the cosine of the angle $y$ is $-1/2$.

3.  $$ \text{And } y \in [0, \pi] $$
    We also know that the range of $\arccos(x)$ is $[0, \pi]$. This constraint is vital.

4.  $$ \text{First, consider the positive value: } \cos(y') = \frac{1}{2} $$
    We know that $\cos(\pi/3) = 1/2$. This angle $\pi/3$ is in Quadrant I.

5.  $$ \text{Now consider the negative value and the restricted range.} $$
    Since $\cos(y)$ is negative, the angle $y$ must be in Quadrant II or Quadrant III. However, the range of $\arccos(x)$ is $[0, \pi]$, which covers Quadrants I and II. Therefore, our angle $y$ must be in Quadrant II.

6.  $$ \text{Find the angle in Quadrant II with a reference angle of } \pi/3. $$
    In Quadrant II, an angle with a reference angle of $\pi/3$ is $\pi - \pi/3$.
    $$ y = \pi - \frac{\pi}{3} = \frac{3\pi}{3} - \frac{\pi}{3} = \frac{2\pi}{3} $$

7.  $$ \text{Check if } 2\pi/3 \text{ is in the restricted range.} $$
    The angle $2\pi/3$ is approximately $2.094$ radians. The interval $[0, \pi]$ is approximately $[0, 3.142]$ radians. Since $2\pi/3$ falls within this interval, it is a valid solution.

**Final Answer:** $\boxed{\frac{2\pi}{3}}$

**Reflection:** This example highlights the importance of the restricted range for arccos. A common mistake would be to think of $-\pi/3$ (which has $\cos(-\pi/3)=1/2$, not $-1/2$) or an angle in Q4 (e.g., $-\pi/3$ has $\cos(-\pi/3) = 1/2$, not $-1/2$). We need an angle in $[0, \pi]$ where cosine is negative, which is Quadrant II.

---

### Example 3: Evaluate $\arctan(-\sqrt{3})$

**Problem:** Find the value of $\arctan(-\sqrt{3})$.

**Given:** The ratio is $-\sqrt{3}$. We want the angle whose tangent is $-\sqrt{3}$.
**Goal:** Find $y$ such that $y = \arctan(-\sqrt{3})$.

**Step-by-step Solution:**

1.  $$y = \arctan(-\sqrt{3})$$
    This is the problem statement. We are looking for an angle $y$.

2.  $$ \tan(y) = -\sqrt{3} $$
    By the definition of the inverse tangent function, this means that the tangent of the angle $y$ is $-\sqrt{3}$.

3.  $$ \text{And } y \in \left(-\frac{\pi}{2}, \frac{\pi}{2}\right) $$
    We also know that the range of $\arctan(x)$ is $(-\pi/2, \pi/2)$. This is a crucial constraint.

4.  $$ \text{First, consider the positive value: } \tan(y') = \sqrt{3} $$
    From memory or the unit circle, we know that $\tan(\pi/3) = \sqrt{3}$. This angle $\pi/3$ is in Quadrant I.

5.  $$ \text{Now consider the negative value and the restricted range.} $$
    Since $\tan(y)$ is negative, the angle $y$ must be in Quadrant II or Quadrant IV. However, the range of $\arctan(x)$ is $(-\pi/2, \pi/2)$, which covers Quadrant I and Quadrant IV. Therefore, our angle $y$ must be in Quadrant IV.

6.  $$ \text{Find the angle in Quadrant IV with a reference angle of } \pi/3. $$
    To get an angle in Quadrant IV within the range $(-\pi/2, \pi/2)$, we use the negative reference angle.
    $$ y = -\frac{\pi}{3} $$

7.  $$ \text{Check if } -\pi/3 \text{ is in the restricted range.} $$
    The angle $-\pi/3$ is approximately $-1.047$ radians. The interval $(-\pi/2, \pi/2)$ is approximately $(-1.571, 1.571)$ radians. Since $-\pi/3$ falls within this interval, it is a valid solution.

**Final Answer:** $\boxed{-\frac{\pi}{3}}$

**Reflection:** Similar to arcsin, arctan's range is centered around zero, covering Quadrant I and Quadrant IV. For negative inputs, the output angle will be negative, representing an angle in Quadrant IV.

---

### Example 4: Evaluate $\sin(\arccos(3/5))$

**Problem:** Find the value of $\sin(\arccos(3/5))$.

**Given:** We have a composition of functions. The inner function is $\arccos(3/5)$, which represents an angle. The outer function is $\sin$, which takes that angle and gives a ratio.
**Goal:** Find the sine of the angle whose cosine is $3/5$.

**Step-by-step Solution:**

1.  $$ \text{Let } \theta = \arccos\left(\frac{3}{5}\right) $$
    We define $\theta$ to be the angle that the inverse cosine function outputs. This helps simplify the problem.

2.  $$ \cos(\theta) = \frac{3}{5} $$
    By the definition of arccos, if $\theta = \arccos(3/5)$, then $\cos(\theta) = 3/5$.

3.  $$ \text{And } \theta \in [0, \pi] $$
    The range of $\arccos(x)$ is $[0, \pi]$. Since $\cos(\theta) = 3/5$ is positive, $\theta$ must be in Quadrant I (where cosine is positive and angles are between $0$ and $\pi/2$).

4.  $$ \text{We want to find } \sin(\theta) $$
    The original problem asks for $\sin(\arccos(3/5))$, which we've now rephrased as $\sin(\theta)$.

5.  $$ \text{Use a right triangle to visualize } \theta. $$
    Since $\theta$ is in Quadrant I, we can construct a right triangle where $\cos(\theta) = \frac{\text{adjacent}}{\text{hypotenuse}} = \frac{3}{5}$.
    Let the adjacent side be 3 and the hypotenuse be 5.

    ```text
          /|
         / |
        /  |  y (opposite)
       /   |
      /____|
     θ   3 (adjacent)
    ```

6.  $$ \text{Find the opposite side using the Pythagorean theorem.} $$
    Let the opposite side be $y$.
    $$ 3^2 + y^2 = 5^2 $$
    $$ 9 + y^2 = 25 $$
    $$ y^2 = 16 $$
    $$ y = \sqrt{16} = 4 $$
    (We take the positive root because $\theta$ is in Quadrant I, so sine is positive).

7.  $$ \text{Now find } \sin(\theta). $$
    From the triangle, $\sin(\theta) = \frac{\text{opposite}}{\text{hypotenuse}} = \frac{4}{5}$.

8.  $$ \text{Substitute back to the original problem.} $$
    Since $\sin(\theta) = 4/5$ and $\theta = \arccos(3/5)$, then $\sin(\arccos(3/5)) = 4/5$.

**Final Answer:** $\boxed{\frac{4}{5}}$

**Reflection:** This example demonstrates how to handle compositions of trigonometric and inverse trigonometric functions. The key is to let the inverse trig function represent an angle, use its definition and range to place it in the correct quadrant, and then use a right triangle (or trigonometric identities) to find the value of the outer trigonometric function.

---

### Example 5: Find the domain and range of $f(x) = 2 \arcsin(x-1) + \frac{\pi}{2}$

**Problem:** Determine the domain and range of the function $f(x) = 2 \arcsin(x-1) + \frac{\pi}{2}$.

**Given:** The function $f(x) = 2 \arcsin(x-1) + \frac{\pi}{2}$.
**Goal:** Find the domain and range of $f(x)$.

**Step-by-step Solution:**

**Part A: Finding the Domain**

1.  $$ \text{Recall the domain of the basic arcsin function.} $$
    The domain of $g(u) = \arcsin(u)$ is $[-1, 1]$. This means the input to the arcsin function must be between $-1$ and $1$, inclusive.

2.  $$ \text{Identify the input to the arcsin function in } f(x). $$
    In our function $f(x) = 2 \arcsin(x-1) + \frac{\pi}{2}$, the input to $\arcsin$ is $(x-1)$.

3.  $$ \text{Set up the inequality for the input.} $$
    For $f(x)$ to be defined, we must have:
    $$ -1 \le x-1 \le 1 $$

4.  $$ \text{Solve the inequality for } x. $$
    Add 1 to all parts of the inequality:
    $$ -1 + 1 \le x-1 + 1 \le 1 + 1 $$
    $$ 0 \le x \le 2 $$

5.  $$ \text{State the domain of } f(x). $$
    The domain of $f(x)$ is $[0, 2]$.

**Part B: Finding the Range**

1.  $$ \text{Recall the range of the basic arcsin function.} $$
    The range of $g(u) = \arcsin(u)$ is $[-\pi/2, \pi/2]$. This means that the output of $\arcsin(x-1)$ will be an angle $y$ such that:
    $$ -\frac{\pi}{2} \le \arcsin(x-1) \le \frac{\pi}{2} $$

2.  $$ \text{Apply the transformations to the range.} $$
    The function $f(x)$ involves two transformations: multiplication by 2 and addition of $\pi/2$. We apply these to the inequality for the range of $\arcsin(x-1)$.

3.  $$ \text{First, multiply by 2.} $$
    Multiply all parts of the inequality by 2:
    $$ 2 \left(-\frac{\pi}{2}\right) \le 2 \arcsin(x-1) \le 2 \left(\frac{\pi}{2}\right) $$
    $$ -\pi \le 2 \arcsin(x-1) \le \pi $$

4.  $$ \text{Next, add } \pi/2. $$
    Add $\pi/2$ to all parts of the inequality:
    $$ -\pi + \frac{\pi}{2} \le 2 \arcsin(x-1) + \frac{\pi}{2} \le \pi + \frac{\pi}{2} $$
    $$ -\frac{2\pi}{2} + \frac{\pi}{2} \le f(x) \le \frac{2\pi}{2} + \frac{\pi}{2} $$
    $$ -\frac{\pi}{2} \le f(x) \le \frac{3\pi}{2} $$

5.  $$ \text{State the range of } f(x). $$
    The range of $f(x)$ is $[-\pi/2, 3\pi/2]$.

**Final Answer:**
**Domain:** $\boxed{[0, 2]}$
**Range:** $\boxed{\left[-\frac{\pi}{2}, \frac{3\pi}{2}\right]}$

**Reflection:** This example demonstrates how transformations (shifting and stretching/compressing) affect the domain and range of inverse trigonometric functions. The domain is affected by the transformation inside the inverse trig function, while the range is affected by transformations outside it. Always start with the base function's domain/range and apply transformations step-by-step.

## 6. Common mistakes and traps

1.  **Forgetting Restricted Ranges:** This is the most common and critical mistake. Students often forget that the output of $\arcsin(x)$ must be in $[-\pi/2, \pi/2]$, $\arccos(x)$ in $[0, \pi]$, and $\arctan(x)$ in $(-\pi/2, \pi/2)$. Forgetting these leads to incorrect angles, especially with negative inputs.
    *   *Why it happens:* Over-reliance on the full unit circle without remembering the "principal value" restriction.

2.  **Confusing $\sin^{-1}(x)$ with $1/\sin(x)$:** As discussed, $\sin^{-1}(x)$ means $\arcsin(x)$, not $\csc(x)$. This notation can be very misleading.
    *   *Why it happens:* The exponent notation $f^{-1}(x)$ for inverse functions looks similar to $x^{-1} = 1/x$.

3.  **Incorrectly Handling Negative Inputs for Arccos:** When evaluating $\arccos(-x)$, students sometimes incorrectly place the angle in Quadrant IV (e.g., $-\pi/3$ for $\arccos(-1/2)$). The range for arccos is $[0, \pi]$, meaning the angle for a negative input must be in Quadrant II.
    *   *Why it happens:* A natural tendency to use negative angles for negative values, similar to arcsin/arctan, without considering arccos's unique range.

4.  **Ignoring Domain Restrictions for Arcsin/Arccos:** Trying to calculate $\arcsin(1.5)$ or $\arccos(-2)$ will result in an undefined value. The input $x$ for arcsin and arccos must always be in $[-1, 1]$.
    *   *Why it happens:* Forgetting that the input to inverse trig functions is a *ratio*, which cannot exceed 1 or be less than -1 for sine and cosine.

5.  **Assuming All Inverse Trig Functions Have the Same Range:** While arcsin and arctan have similar ranges (centered around 0), arccos has a different range (from 0 to $\pi$). Mixing these up leads to incorrect answers.
    *   *Why it happens:* A lack of careful distinction between the definitions of the principal branches for each function.

6.  **Incorrectly Evaluating $\arctan(\text{undefined})$:** The tangent function is undefined at $\pm \pi/2$. However, $\arctan(x)$ is defined for all real numbers $x$. As $x$ approaches infinity, $\arctan(x)$ approaches $\pi/2$. Students sometimes incorrectly assume $\arctan(\infty)$ is undefined or assign it a value like $\pi/2$ without understanding it's a limit.
    *   *Why it happens:* Confusing the behavior of the original function's asymptotes with the inverse function's range limits.

## 7. Textbook-precise explanation

The inverse trigonometric functions are defined by restricting the domains of the standard trigonometric functions to make them one-to-one, thereby allowing for a unique inverse. These restricted domains are known as the principal branches.

1.  **Inverse Sine Function (Arcsin):**
    The function $f(x) = \sin(x)$ has an inverse if its domain is restricted to $[-\pi/2, \pi/2]$. On this interval, $f(x)$ is one-to-one and its range is $[-1, 1]$.
    The **inverse sine function**, denoted $\arcsin(x)$ or $\sin^{-1}(x)$, is defined as:
    $y = \arcsin(x) \quad \iff \quad \sin(y) = x$
    **Domain:** $[-1, 1]$
    **Range:** $[-\pi/2, \pi/2]$
    The graph of $y = \arcsin(x)$ is symmetric with respect to the origin (it is an odd function).

2.  **Inverse Cosine Function (Arccos):**
    The function $f(x) = \cos(x)$ has an inverse if its domain is restricted to $[0, \pi]$. On this interval, $f(x)$ is one-to-one and its range is $[-1, 1]$.
    The **inverse cosine function**, denoted $\arccos(x)$ or $\cos^{-1}(x)$, is defined as:
    $y = \arccos(x) \quad \iff \quad \cos(y) = x$
    **Domain:** $[-1, 1]$
    **Range:** $[0, \pi]$
    The graph of $y = \arccos(x)$ has no simple symmetry.

3.  **Inverse Tangent Function (Arctan):**
    The function $f(x) = \tan(x)$ has an inverse if its domain is restricted to $(-\pi/2, \pi/2)$. On this interval, $f(x)$ is one-to-one and its range is $(-\infty, \infty)$.
    The **inverse tangent function**, denoted $\arctan(x)$ or $\tan^{-1}(x)$, is defined as:
    $y = \arctan(x) \quad \iff \quad \tan(y) = x$
    **Domain:** $(-\infty, \infty)$
    **Range:** $(-\pi/2, \pi/2)$
    The graph of $y = \arctan(x)$ is symmetric with respect to the origin (it is an odd function) and has horizontal asymptotes at $y = -\pi/2$ and $y = \pi/2$.

**Note on Notation:** While $\sin^{-1}(x)$ is commonly used, the notation $\arcsin(x)$ is often preferred to avoid confusion with the reciprocal function $(\sin(x))^{-1} = \csc(x)$.

**Reference:** These definitions are standard in any university-level calculus textbook. For example, see:
*   Stewart, James. *Calculus: Early Transcendentals*. 9th ed., Cengage Learning, 2021, §1.5 (Inverse Functions) and §1.6 (Inverse Trigonometric Functions).
*   Larson, Ron, and Bruce Edwards. *Calculus*. 11th ed., Cengage Learning, 2018, §5.6 (Inverse Trigonometric Functions).

## 8. ASCII diagrams

Here's an ASCII representation of the restricted sine function and its inverse.

**1. Restricted Sine Function: $y = \sin(x)$ for $x \in [-\pi/2, \pi/2]$**
(This portion is one-to-one)

```text
       ^ y
       |
     1 +       .
       |     /
       |    /
       |   /
-------+--+---------> x
    -π/2 | /   π/2
       |/
       +
     -1
```
*   The x-axis represents angles from $-\pi/2$ to $\pi/2$.
*   The y-axis represents sine ratios from $-1$ to $1$.
*   The function starts at $(-\pi/2, -1)$, passes through $(0,0)$, and ends at $(\pi/2, 1)$.

**2. Inverse Sine Function: $y = \arcsin(x)$ for $x \in [-1, 1]$**
(This is the reflection of the restricted sine graph across the line $y=x$)

```text
       ^ y
     π/2 +  .
         | /
         |/
---------+---------+--> x
       -1|0|1
        /|
       / |
      .  |
   -π/2  +
```
*   The x-axis represents ratios from $-1$ to $1$.
*   The y-axis represents angles from $-\pi/2$ to $\pi/2$.
*   The function starts at $(-1, -\pi/2)$, passes through $(0,0)$, and ends at $(1, \pi/2)$.

**Visualizing other graphs:**
*   **Arccos(x):** Imagine the graph of $y=\cos(x)$ restricted to $x \in [0, \pi]$. It starts at $(0,1)$, goes through $(\pi/2,0)$, and ends at $(\pi,-1)$. Reflect this across $y=x$. The graph of $y=\arccos(x)$ will start at $(1,0)$, go through $(0,\pi/2)$, and end at $(-1,\pi)$. It will be a decreasing curve.
*   **Arctan(x):** Imagine the graph of $y=\tan(x)$ restricted to $x \in (-\pi/2, \pi/2)$. It has vertical asymptotes at $x=\pm \pi/2$. Reflect this across $y=x$. The graph of $y=\arctan(x)$ will have horizontal asymptotes at $y=\pm \pi/2$. It will be an increasing curve, passing through $(0,0)$, extending infinitely in the x-direction.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **"ARC-STAR"** for the ranges:
        *   **A**rcsin: **R**ange is **C**entered at 0, goes from **S**tart to **T**op (and bottom) $\implies [-\pi/2, \pi/2]$
        *   **A**rccos: **R**ange is **C**entered at $\pi/2$, goes from **S**tart to **T**op (positive angles only) $\implies [0, \pi]$
        *   **A**rctan: **R**ange is **C**entered at 0, goes from **S**tart to **T**op (and bottom), but **A**symptotically $\implies (-\pi/2, \pi/2)$
    *   **Visual:** Think of a vertical line for arcsin/arctan range (Q1 & Q4, or just Q1 & Q4), and a horizontal line for arccos range (Q1 & Q2).

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **Ranges are paramount:**
        *   $\text{Range}(\arcsin) = [-\pi/2, \pi/2]$
        *   $\text{Range}(\arccos) = [0, \pi]$
        *   $\text{Range}(\arctan) = (-\pi/2, \pi/2)$
    *   **Domain of arcsin/arccos is $[-1, 1]$.**
    *   **$\sin^{-1}(x) \neq 1/\sin(x)$.** (And similar for cos and tan).

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review this entire lesson. Work through the examples again.
    *   **Day 3:** Re-read the "Core Idea" and "Common Mistakes" sections. Redo one example of each type (arcsin, arccos, arctan, composition, domain/range).
    *   **Day 7:** Write down the domains and ranges for all three inverse trig functions from memory. Sketch their general graphs.
    *   **Day 16:** Attempt 2-3 new, challenging problems involving inverse trig functions, especially compositions or transformations.
    *   **Day 35:** Explain the concept of restricted domains for inverse trig functions to an imaginary friend or rubber duck. What would happen if we didn't restrict them?

4.  **First-Principles Re-derivation Pathway:**
    If you forget the range of an inverse trig function, you can always reconstruct it:
    *   **Start with the original trig function's graph:** Draw $y=\sin(x)$, $y=\cos(x)$, $y=\tan(x)$.
    *   **Apply the horizontal line test:** See why they are not one-to-one.
    *   **Identify the "best" principal branch:**
        *   For $\sin(x)$: Where does it go from $-1$ to $1$ exactly once, starting from $0$ and extending symmetrically? That's $[-\pi/2, \pi/2]$.
        *   For $\cos(x)$: Where does it go from $1$ to $-1$ exactly once, starting from $0$? That's $[0, \pi]$.
        *   For $\tan(x)$: Where does it cover $(-\infty, \infty)$ exactly once, starting from $0$ and extending symmetrically? That's $(-\pi/2, \pi/2)$.
    *   **Swap Domain and Range:** The restricted domain of the original function becomes the range of the inverse function. The range of the original function becomes the domain of the inverse function. This process allows you to rebuild the definitions from scratch.

## 10. Connections — what this leads to

Understanding inverse trigonometric functions is a foundational skill that unlocks numerous advanced topics in mathematics and its applications:

1.  **Calculus of Inverse Trigonometric Functions:**
    *   **Derivatives:** You will learn how to find the derivatives of $\arcsin(x)$, $\arccos(x)$, and $\arctan(x)$, which are crucial for optimization problems and related rates.
    *   **Integrals:** The derivatives of inverse trig functions lead directly to important integral forms. Many integrals result in inverse trig functions, such as $\int \frac{1}{\sqrt{1-x^2}} dx = \arcsin(x) + C$ and $\int \frac{1}{1+x^2} dx = \arctan(x) + C$. These are fundamental in integration techniques.

2.  **Solving Trigonometric Equations:** Inverse trig functions provide the principal solutions to trigonometric equations. You then use the periodicity of the original trig functions to find all possible solutions.

3.  **Trigonometric Identities:** You'll encounter identities involving inverse trig functions, such as $\arcsin(x) + \arccos(x) = \pi/2$, and learn how to simplify complex expressions or prove new identities.

4.  **Complex Numbers:** Inverse trigonometric functions are used in converting between rectangular and polar forms of complex numbers, especially when dealing with the argument (angle) of a complex number.

5.  **Differential Equations:** Solutions to certain types of differential equations, particularly those arising in physics and engineering, often involve inverse trigonometric functions.

6.  **Vector Calculus and Geometry:** Calculating angles between vectors, lines, or planes in 2D and 3D space frequently involves dot products and inverse trigonometric functions. For example, the angle $\theta$ between two vectors $\mathbf{u}$ and $\mathbf{v}$ is given by $\theta = \arccos\left(\frac{\mathbf{u} \cdot \mathbf{v}}{||\mathbf{u}|| \cdot ||\mathbf{v}||}\right)$.

7.  **Fourier Analysis and Signal Processing:** While often involving standard trig functions, understanding how angles relate to ratios is crucial in analyzing periodic signals and their components.

## 11. Self-check questions

1.  What is the exact value of $\arcsin(-1/2)$?
2.  Find the exact value of $\tan(\arccos(5/13))$.
3.  Determine the domain and range of the function $g(x) = 3 \arctan(2x) - \pi$.
4.  Explain, in your own words, why the domain of $\cos(x)$ must be restricted to $[0, \pi]$ to define $\arccos(x)$ as a function. What would happen if the domain was restricted to $[-\pi/2, \pi/2]$ instead?
5.  Solve for $x$: $2 \arcsin(x) = \pi/3$.