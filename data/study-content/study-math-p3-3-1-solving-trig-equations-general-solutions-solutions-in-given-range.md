## 1. What it is — in plain English

Imagine you have a secret code, and part of the code tells you that "the sine of a certain angle is exactly 0.5". Your job is to figure out what that angle could be. That's essentially what "solving trigonometric equations" is all about.

A trigonometric equation is just like a regular algebra equation, but instead of solving for a plain 'x', you're solving for an angle (let's call it $\theta$) that's inside a trigonometric function like $\sin(\theta)$, $\cos(\theta)$, or $\tan(\theta)$. For example, $2\sin(\theta) - 1 = 0$ is a trigonometric equation.

When we talk about "general solutions," we mean *all* possible angles that satisfy the equation. Because trigonometric functions are periodic (they repeat their values over and over, like a wave), there are usually infinitely many angles that will work. For instance, if $\sin(\theta) = 0.5$, then $\theta$ could be 30 degrees, or 150 degrees, or 30 degrees plus 360 degrees (which is 390 degrees), and so on.

However, sometimes you don't need *all* possible angles. You might only be interested in angles within a specific range, like "find all solutions between 0 and 360 degrees." This is called finding "solutions in a given range." It's like asking for all the cities with a population over a million, but only those located in North America. We first find all possible cities, then filter them by location.

## 2. Why it matters — real-world applications

Solving trigonometric equations is not just an academic exercise; it's a fundamental skill with wide-ranging applications across science, engineering, and technology. Here are a few concrete examples:

1.  **Physics — Wave Phenomena and Oscillations:** Any phenomenon that behaves like a wave or an oscillation can be described using trigonometric functions. This includes sound waves, light waves, alternating current (AC) electricity, and mechanical vibrations (like a pendulum swinging or a spring bouncing). Solving trig equations allows engineers to determine specific times when a wave reaches a certain amplitude, or when an oscillating system reaches a particular position or velocity. For instance, in designing a bridge, engineers might solve equations to find when vibrations could lead to destructive resonance.

2.  **Aerospace Engineering — Orbital Mechanics and Navigation:** When launching satellites or planning interplanetary missions, understanding the periodic motion of celestial bodies is crucial. Orbital paths are often modeled using trigonometric functions. Solving these equations helps calculate when a satellite will be at a specific altitude, or when two spacecraft will be in the correct relative positions for a rendezvous. Companies like SpaceX and NASA rely heavily on these calculations for mission planning, trajectory correction, and attitude control (orienting the spacecraft).

3.  **Electrical Engineering — AC Circuits and Signal Processing:** Electrical engineers use trigonometry to analyze alternating current (AC) circuits, where voltage and current vary sinusoidally over time. Solving trig equations helps them determine phase differences between voltage and current, calculate peak values, or find specific times when a circuit component experiences a certain voltage or current. In signal processing, techniques like Fourier analysis (which heavily relies on trigonometric functions) break down complex signals into simpler sine and cosine waves. Solving equations helps identify critical frequencies or components of a signal, essential for technologies from cell phones to medical imaging.

4.  **Computer Graphics and Robotics — Rotations and Inverse Kinematics:** In 3D computer graphics (used in video games, animation, and CAD software), objects are rotated using trigonometric principles. Robotics also uses trigonometry for "inverse kinematics," which involves calculating the joint angles required for a robot arm to reach a desired position and orientation in space. Solving trig equations is fundamental to making characters move realistically in games or enabling a robot to pick up an object precisely.

## 3. Prerequisites — what you must know first

Before diving into solving trigonometric equations, ensure you have a solid grasp of the following concepts. If any of these feel unfamiliar, pause and review them.

*   **Basic Algebra:** The ability to manipulate equations, isolate variables, solve linear equations (e.g., $2x+3=7$) and quadratic equations (e.g., $x^2-5x+6=0$ using factoring, quadratic formula, or completing the square).
*   **Definition of Trigonometric Functions:** Understanding $\sin(\theta)$, $\cos(\theta)$, and $\tan(\theta)$ in terms of ratios of sides in a right-angled triangle (SOH CAH TOA), and more importantly, their definitions on the Unit Circle (x-coordinate for cosine, y-coordinate for sine, y/x for tangent).
*   **The Unit Circle:** A deep understanding of how angles are measured (both positive and negative, clockwise and counter-clockwise) and how the coordinates of points on the unit circle relate to $\sin(\theta)$ and $\cos(\theta)$.
*   **Special Angles:** Knowing the exact values of $\sin$, $\cos$, and $\tan$ for common angles like $0^\circ, 30^\circ, 45^\circ, 60^\circ, 90^\circ$ (and their radian equivalents: $0, \pi/6, \pi/4, \pi/3, \pi/2$) and their multiples in all four quadrants.
*   **Radian Measure:** Comfortably working with angles in radians, converting between degrees and radians.
*   **Periodicity of Trigonometric Functions:** Knowing that $\sin(\theta)$ and $\cos(\theta)$ repeat every $2\pi$ radians ($360^\circ$), and $\tan(\theta)$ repeats every $\pi$ radians ($180^\circ$).
*   **Inverse Trigonometric Functions:** Understanding $\arcsin(x)$, $\arccos(x)$, and $\arctan(x)$ (also written as $\sin^{-1}(x)$, $\cos^{-1}(x)$, $\tan^{-1}(x)$) and their principal value ranges. For example, $\arcsin(x)$ gives an angle in $[-\pi/2, \pi/2]$.
*   **CAST Rule (or Quadrant Analysis):** The ability to determine the sign (positive or negative) of $\sin(\theta)$, $\cos(\theta)$, and $\tan(\theta)$ in each of the four quadrants, and to find all angles in one revolution that have a specific trigonometric value.
*   **Basic Trigonometric Identities:** Especially the Pythagorean identity $\sin^2(\theta) + \cos^2(\theta) = 1$, and reciprocal identities (e.g., $\sec(\theta) = 1/\cos(\theta)$). More complex identities (sum/difference, double angle) might be needed for harder problems.

## 4. The core idea — step by step

Solving trigonometric equations systematically involves several key steps. We'll build this process from the ground up.

### Step 1: Isolate the trigonometric function

**Plain English:** Your first goal is to get the trigonometric function (like $\sin(\theta)$ or $\cos(\theta)$) all by itself on one side of the equation, just as you would isolate 'x' in a simple algebraic equation. Think of $\sin(\theta)$ as a single variable for now.

**Small concrete example:**
If you have the equation $2\sin(\theta) - \sqrt{3} = 0$, you want to get $\sin(\theta)$ alone.
$2\sin(\theta) = \sqrt{3}$
$\sin(\theta) = \frac{\sqrt{3}}{2}$

**Formal/mathematical version:**
Given an equation $f(\text{trig}(\theta)) = C$, use algebraic manipulation to transform it into the form:
$$ \text{trig}(\theta) = K $$
where $\text{trig}(\theta)$ is one of $\sin(\theta)$, $\cos(\theta)$, or $\tan(\theta)$, and $K$ is a constant.

**What could go wrong:**
Common algebraic errors like incorrect addition/subtraction, multiplication/division, or issues with squaring/square roots. Be careful not to divide by a variable expression that could be zero, which might lose solutions. For instance, don't divide by $\sin(\theta)$ if $\sin(\theta)$ could be 0.

### Step 2: Find the principal value (reference angle)

**Plain English:** Once you have the trig function isolated, you need to find *one* basic angle that satisfies this condition. This is often called the "principal value" or "reference angle." You usually use the inverse trigonometric function on your calculator (or your knowledge of special angles) to find this. When using inverse functions, calculators typically give an angle in a specific range (e.g., $\arcsin$ gives angles in $[-\pi/2, \pi/2]$). This initial angle is usually in the first or fourth quadrant.

**Small concrete example:**
From $\sin(\theta) = \frac{\sqrt{3}}{2}$, we ask: "What angle has a sine of $\frac{\sqrt{3}}{2}$?"
Using our knowledge of special angles (or $\arcsin$ on a calculator):
$\theta_{ref} = \arcsin\left(\frac{\sqrt{3}}{2}\right) = \frac{\pi}{3}$ radians (or $60^\circ$).

**Formal/mathematical version:**
For $\text{trig}(\theta) = K$, find the principal value $\alpha$ such that $\text{trig}(\alpha) = K$.
This is typically $\alpha = \text{trig}^{-1}(K)$. Make sure to consider the sign of $K$ and the range of the inverse function.
For $\sin(\theta) = K$, $\alpha = \arcsin(K)$.
For $\cos(\theta) = K$, $\alpha = \arccos(K)$.
For $\tan(\theta) = K$, $\alpha = \arctan(K)$.

**What could go wrong:**
- Using a calculator in the wrong mode (degrees vs. radians).
- Not knowing the special angle values, leading to calculator dependence.
- Forgetting that $\arcsin(K)$ and $\arctan(K)$ only give angles in Quadrants I and IV, and $\arccos(K)$ gives angles in Quadrants I and II. These are just *one* of the possible angles.

### Step 3: Determine all angles in one period using quadrant analysis (CAST rule or Unit Circle)

**Plain English:** Trigonometric functions are positive or negative in different quadrants. Since we found one angle in Step 2, we need to find any *other* angles within a single full cycle ($0$ to $2\pi$ or $0^\circ$ to $360^\circ$) that have the same trigonometric value. You use the sign of $K$ and the CAST rule (or unit circle intuition) to identify the relevant quadrants.

**Small concrete example:**
We have $\sin(\theta) = \frac{\sqrt{3}}{2}$. Since $\frac{\sqrt{3}}{2}$ is positive, $\sin(\theta)$ is positive in Quadrant I and Quadrant II.
Our reference angle from Step 2 is $\theta_{ref} = \frac{\pi}{3}$ (in Q1).
- In Q1: $\theta_1 = \theta_{ref} = \frac{\pi}{3}$.
- In Q2: The angle is $\pi - \theta_{ref} = \pi - \frac{\pi}{3} = \frac{2\pi}{3}$.
So, in one period $[0, 2\pi)$, the solutions are $\frac{\pi}{3}$ and $\frac{2\pi}{3}$.

**Formal/mathematical version:**
Based on the sign of $K$ and the function $\text{trig}(\theta)$:
- **For $\sin(\theta) = K$:**
    - If $K > 0$, solutions are in Q1 and Q2: $\alpha$ and $\pi - \alpha$.
    - If $K < 0$, solutions are in Q3 and Q4: $\pi + \alpha_{ref}$ and $2\pi - \alpha_{ref}$ (where $\alpha_{ref}$ is the positive reference angle from Q1). Or, if using $\arcsin(K)$ directly, then $\alpha$ and $\pi - \alpha$.
- **For $\cos(\theta) = K$:**
    - If $K > 0$, solutions are in Q1 and Q4: $\alpha$ and $2\pi - \alpha$.
    - If $K < 0$, solutions are in Q2 and Q3: $\pi - \alpha_{ref}$ and $\pi + \alpha_{ref}$. Or, if using $\arccos(K)$ directly, then $\alpha$ and $2\pi - \alpha$.
- **For $\tan(\theta) = K$:**
    - If $K > 0$, solutions are in Q1 and Q3: $\alpha$ and $\pi + \alpha$.
    - If $K < 0$, solutions are in Q2 and Q4: $\pi - \alpha_{ref}$ and $2\pi - \alpha_{ref}$. Or, if using $\arctan(K)$ directly, then $\alpha$ and $\pi + \alpha$.
(Note: For $\tan(\theta)$, the second solution $\pi+\alpha$ is simply $\alpha$ shifted by its period, $\pi$. So we often just write one general solution for tan.)

**What could go wrong:**
- Forgetting one of the solutions in the cycle.
- Incorrectly applying the CAST rule or quadrant logic. For example, for $\sin(\theta) = -1/2$, the reference angle is $\pi/6$, but the solutions are in Q3 and Q4, so $\pi + \pi/6$ and $2\pi - \pi/6$.
- Confusing degrees and radians.

### Step 4: Write the general solution using periodicity

**Plain English:** Since trigonometric functions repeat, every solution you found in Step 3 will have infinitely many counterparts by adding or subtracting full periods. This is where we introduce an integer $k$ (or $n$) to represent "any integer multiple of the period."

**Small concrete example:**
For $\sin(\theta) = \frac{\sqrt{3}}{2}$, we found solutions $\frac{\pi}{3}$ and $\frac{2\pi}{3}$ in one cycle.
Since $\sin(\theta)$ has a period of $2\pi$, we add $2\pi k$ to each solution:
$\theta = \frac{\pi}{3} + 2\pi k$, where $k \in \mathbb{Z}$ (meaning $k$ can be $..., -2, -1, 0, 1, 2, ...$)
$\theta = \frac{2\pi}{3} + 2\pi k$, where $k \in \mathbb{Z}$

**Formal/mathematical version:**
Let $\theta_1, \theta_2, ..., \theta_m$ be the distinct solutions found in one period $[0, P)$, where $P$ is the period of the function ($2\pi$ for $\sin$ and $\cos$, $\pi$ for $\tan$).
The general solutions are:
$$ \theta = \theta_i + Pk \quad \text{for each } i=1, ..., m, \text{ where } k \in \mathbb{Z} $$
More compactly:
- **For $\sin(\theta) = K$ (or $\sin(\theta) = \sin(\alpha)$):**
  $$ \theta = n\pi + (-1)^n \alpha, \quad n \in \mathbb{Z} $$
  (This combines both $\alpha + 2\pi k$ and $(\pi - \alpha) + 2\pi k$ into one elegant formula.)
  Alternatively, and often more intuitively:
  $$ \theta = \alpha + 2\pi k \quad \text{and} \quad \theta = (\pi - \alpha) + 2\pi k, \quad k \in \mathbb{Z} $$
- **For $\cos(\theta) = K$ (or $\cos(\theta) = \cos(\alpha)$):**
  $$ \theta = 2n\pi \pm \alpha, \quad n \in \mathbb{Z} $$
- **For $\tan(\theta) = K$ (or $\tan(\theta) = \tan(\alpha)$):**
  $$ \theta = n\pi + \alpha, \quad n \in \mathbb{Z} $$
  (Note: $\tan(\theta)$ has a period of $\pi$, so we add $\pi k$.)

**What could go wrong:**
- Using $2\pi k$ for $\tan(\theta)$ equations (it should be $\pi k$).
- Using $\pi k$ for $\sin(\theta)$ or $\cos(\theta)$ equations (it should be $2\pi k$).
- Forgetting to state that $k \in \mathbb{Z}$.

### Step 5: (If required) Find solutions in a given range

**Plain English:** If the problem asks for solutions only within a specific interval (e.g., $[0, 2\pi]$, or $[-180^\circ, 180^\circ]$), you take the general solutions from Step 4 and plug in different integer values for $k$ (e.g., $k=0, 1, -1, 2, -2, ...$) to find which resulting angles fall within the specified range.

**Small concrete example:**
Find solutions for $\sin(\theta) = \frac{\sqrt{3}}{2}$ in the range $[0, 2\pi]$.
Our general solutions are:
$\theta = \frac{\pi}{3} + 2\pi k$
$\theta = \frac{2\pi}{3} + 2\pi k$

Let's test values for $k$:
- For $k=0$:
    $\theta = \frac{\pi}{3} + 2\pi(0) = \frac{\pi}{3}$ (This is in $[0, 2\pi]$)
    $\theta = \frac{2\pi}{3} + 2\pi(0) = \frac{2\pi}{3}$ (This is in $[0, 2\pi]$)
- For $k=1$:
    $\theta = \frac{\pi}{3} + 2\pi(1) = \frac{7\pi}{3}$ (This is NOT in $[0, 2\pi]$)
    $\theta = \frac{2\pi}{3} + 2\pi(1) = \frac{8\pi}{3}$ (This is NOT in $[0, 2\pi]$)
- For $k=-1$:
    $\theta = \frac{\pi}{3} + 2\pi(-1) = -\frac{5\pi}{3}$ (This is NOT in $[0, 2\pi]$)
    $\theta = \frac{2\pi}{3} + 2\pi(-1) = -\frac{4\pi}{3}$ (This is NOT in $[0, 2\pi]$)

So, the solutions in the range $[0, 2\pi]$ are $\frac{\pi}{3}$ and $\frac{2\pi}{3}$.

**Formal/mathematical version:**
For each general solution $\theta = \alpha + Pk$, solve the inequality $L \le \alpha + Pk \le R$ for $k$, where $[L, R]$ is the given range.
For example, $L \le \alpha + Pk \implies \frac{L-\alpha}{P} \le k$.
And $\alpha + Pk \le R \implies k \le \frac{R-\alpha}{P}$.
This gives a range of integers for $k$. Test these integer values.

**What could go wrong:**
- Missing solutions by not testing enough $k$ values (e.g., only $k=0, 1$).
- Including solutions that are outside the specified range.
- Incorrectly handling boundary conditions (e.g., whether the range is inclusive or exclusive, like $[0, 2\pi]$ vs. $[0, 2\pi)$).

## 5. Worked examples — multiple, with every step shown

Here are several worked examples, ranging from simple to more complex, demonstrating each step of the process.

### Example 1: Basic Sine Equation in a Range

**Problem:** Solve $\sin(x) = \frac{1}{2}$ for $x \in [0, 2\pi]$.

**Given:** The equation $\sin(x) = \frac{1}{2}$ and the range $[0, 2\pi]$.
**Want:** All values of $x$ in the given range that satisfy the equation.

**Step 1: Isolate the trigonometric function.**
The trigonometric function is already isolated:
$$ \sin(x) = \frac{1}{2} $$
*Explanation:* The equation is in the desired form, so no algebraic manipulation is needed here.

**Step 2: Find the principal value (reference angle).**
We ask: "What angle has a sine of $\frac{1}{2}$?"
$$ x_{ref} = \arcsin\left(\frac{1}{2}\right) = \frac{\pi}{6} $$
*Explanation:* We use the inverse sine function to find the basic acute angle whose sine is $1/2$. This is a common special angle, $\pi/6$ radians (or $30^\circ$).

**Step 3: Determine all angles in one period using quadrant analysis.**
Since $\sin(x)$ is positive ($1/2$), the solutions lie in Quadrant I and Quadrant II.
*   **Quadrant I:** The angle is the reference angle itself.
    $$ x_1 = \frac{\pi}{6} $$
    *Explanation:* In Quadrant I, the angle is simply the reference angle.
*   **Quadrant II:** The angle is $\pi$ minus the reference angle.
    $$ x_2 = \pi - \frac{\pi}{6} = \frac{6\pi}{6} - \frac{\pi}{6} = \frac{5\pi}{6} $$
    *Explanation:* In Quadrant II, the angle symmetric to the reference angle with respect to the y-axis is found by subtracting the reference angle from $\pi$.
So, in one period $[0, 2\pi)$, the solutions are $\frac{\pi}{6}$ and $\frac{5\pi}{6}$.

**Step 4: Write the general solution using periodicity.**
The period of $\sin(x)$ is $2\pi$. We add $2\pi k$ to each solution.
$$ x = \frac{\pi}{6} + 2\pi k, \quad k \in \mathbb{Z} $$
$$ x = \frac{5\pi}{6} + 2\pi k, \quad k \in \mathbb{Z} $$
*Explanation:* These formulas represent all possible angles that satisfy the equation, accounting for the periodic nature of the sine function.

**Step 5: Find solutions in the given range $[0, 2\pi]$.**
We test integer values for $k$.
*   For $k=0$:
    $$ x = \frac{\pi}{6} + 2\pi(0) = \frac{\pi}{6} $$
    $$ x = \frac{5\pi}{6} + 2\pi(0) = \frac{5\pi}{6} $$
    *Explanation:* Both $\pi/6$ and $5\pi/6$ are within the range $[0, 2\pi]$.
*   For $k=1$:
    $$ x = \frac{\pi}{6} + 2\pi(1) = \frac{\pi}{6} + \frac{12\pi}{6} = \frac{13\pi}{6} $$
    $$ x = \frac{5\pi}{6} + 2\pi(1) = \frac{5\pi}{6} + \frac{12\pi}{6} = \frac{17\pi}{6} $$
    *Explanation:* Both $\frac{13\pi}{6}$ and $\frac{17\pi}{6}$ are greater than $2\pi$, so they are outside the range.
*   For $k=-1$:
    $$ x = \frac{\pi}{6} + 2\pi(-1) = \frac{\pi}{6} - \frac{12\pi}{6} = -\frac{11\pi}{6} $$
    $$ x = \frac{5\pi}{6} + 2\pi(-1) = \frac{5\pi}{6} - \frac{12\pi}{6} = -\frac{7\pi}{6} $$
    *Explanation:* Both $-\frac{11\pi}{6}$ and $-\frac{7\pi}{6}$ are less than $0$, so they are outside the range.

The solutions in the range $[0, 2\pi]$ are:
$$ \boxed{x = \frac{\pi}{6}, \frac{5\pi}{6}} $$

**Reflection:** This example was straightforward because the trig function was already isolated and involved a special angle. The main challenge was correctly identifying both solutions within the first period using quadrant knowledge.

---

### Example 2: Cosine Equation with General Solution

**Problem:** Find the general solution for $2\cos(x) + \sqrt{2} = 0$.

**Given:** The equation $2\cos(x) + \sqrt{2} = 0$.
**Want:** The general solution for $x$.

**Step 1: Isolate the trigonometric function.**
$$ 2\cos(x) + \sqrt{2} = 0 $$
Subtract $\sqrt{2}$ from both sides:
$$ 2\cos(x) = -\sqrt{2} $$
Divide by 2:
$$ \cos(x) = -\frac{\sqrt{2}}{2} $$
*Explanation:* We perform standard algebraic operations to get $\cos(x)$ by itself.

**Step 2: Find the principal value (reference angle).**
We first consider the positive value: $\cos(x_{ref}) = \frac{\sqrt{2}}{2}$.
$$ x_{ref} = \arccos\left(\frac{\sqrt{2}}{2}\right) = \frac{\pi}{4} $$
*Explanation:* We find the acute angle whose cosine is $\frac{\sqrt{2}}{2}$. This is $\pi/4$ (or $45^\circ$).

**Step 3: Determine all angles in one period using quadrant analysis.**
Since $\cos(x)$ is negative ($-\frac{\sqrt{2}}{2}$), the solutions lie in Quadrant II and Quadrant III.
*   **Quadrant II:** The angle is $\pi$ minus the reference angle.
    $$ x_1 = \pi - \frac{\pi}{4} = \frac{4\pi}{4} - \frac{\pi}{4} = \frac{3\pi}{4} $$
    *Explanation:* In Quadrant II, cosine is negative. The angle symmetric to $\pi/4$ with respect to the y-axis is $\pi - \pi/4$.
*   **Quadrant III:** The angle is $\pi$ plus the reference angle.
    $$ x_2 = \pi + \frac{\pi}{4} = \frac{4\pi}{4} + \frac{\pi}{4} = \frac{5\pi}{4} $$
    *Explanation:* In Quadrant III, cosine is also negative. The angle symmetric to $\pi/4$ with respect to the origin is $\pi + \pi/4$.
So, in one period $[0, 2\pi)$, the solutions are $\frac{3\pi}{4}$ and $\frac{5\pi}{4}$.

**Step 4: Write the general solution using periodicity.**
The period of $\cos(x)$ is $2\pi$. We add $2\pi k$ to each solution.
$$ x = \frac{3\pi}{4} + 2\pi k, \quad k \in \mathbb{Z} $$
$$ x = \frac{5\pi}{4} + 2\pi k, \quad k \in \mathbb{Z} $$
Alternatively, using the compact form $\theta = 2n\pi \pm \alpha$:
Here, $\alpha = \frac{3\pi}{4}$. The other solution $\frac{5\pi}{4}$ can be written as $2\pi - \frac{3\pi}{4}$.
So, we can write:
$$ \boxed{x = 2\pi k \pm \frac{3\pi}{4}, \quad k \in \mathbb{Z}} $$
*Explanation:* This compact form is often preferred for cosine solutions because $\frac{5\pi}{4}$ is equivalent to $-\frac{3\pi}{4}$ in terms of cosine's symmetry around the x-axis, shifted by $2\pi$.

**Reflection:** This example introduced a negative value for the trigonometric function, requiring careful application of the CAST rule. It also demonstrated the compact general solution form for cosine.

---

### Example 3: Tangent Equation with a Quadratic Form

**Problem:** Solve $\tan^2(x) - 3 = 0$ for $x \in [-2\pi, 2\pi]$.

**Given:** The equation $\tan^2(x) - 3 = 0$ and the range $[-2\pi, 2\pi]$.
**Want:** All values of $x$ in the given range that satisfy the equation.

**Step 1: Isolate the trigonometric function.**
$$ \tan^2(x) - 3 = 0 $$
Add 3 to both sides:
$$ \tan^2(x) = 3 $$
Take the square root of both sides. Remember to include both positive and negative roots!
$$ \tan(x) = \pm\sqrt{3} $$
*Explanation:* This equation is quadratic in form. We treat $\tan(x)$ as a variable, solve for $\tan(x)$, and remember the $\pm$ when taking the square root. This splits the problem into two separate cases.

**Case 1: $\tan(x) = \sqrt{3}$**

**Step 2 (Case 1): Find the principal value.**
$$ x_{ref} = \arctan(\sqrt{3}) = \frac{\pi}{3} $$
*Explanation:* The acute angle whose tangent is $\sqrt{3}$ is $\pi/3$.

**Step 3 (Case 1): Determine all angles in one period.**
Since $\tan(x)$ is positive, solutions are in Quadrant I and Quadrant III.
*   **Quadrant I:** $x_1 = \frac{\pi}{3}$
*   **Quadrant III:** $x_2 = \pi + \frac{\pi}{3} = \frac{4\pi}{3}$
*Explanation:* Tangent is positive in Q1 and Q3.

**Step 4 (Case 1): Write the general solution.**
The period of $\tan(x)$ is $\pi$.
$$ x = \frac{\pi}{3} + \pi k, \quad k \in \mathbb{Z} $$
*Explanation:* For tangent, the general solution can be written compactly because $\pi + \alpha$ is simply $\alpha$ shifted by one period.

**Case 2: $\tan(x) = -\sqrt{3}$**

**Step 2 (Case 2): Find the principal value (reference angle).**
We consider the positive value for the reference angle: $x_{ref} = \arctan(\sqrt{3}) = \frac{\pi}{3}$.
*Explanation:* The reference angle is always acute and positive.

**Step 3 (Case 2): Determine all angles in one period.**
Since $\tan(x)$ is negative, solutions are in Quadrant II and Quadrant IV.
*   **Quadrant II:** $x_3 = \pi - \frac{\pi}{3} = \frac{2\pi}{3}$
*   **Quadrant IV:** $x_4 = 2\pi - \frac{\pi}{3} = \frac{5\pi}{3}$
*Explanation:* Tangent is negative in Q2 and Q4.

**Step 4 (Case 2): Write the general solution.**
The period of $\tan(x)$ is $\pi$.
$$ x = \frac{2\pi}{3} + \pi k, \quad k \in \mathbb{Z} $$
*Explanation:* Again, using the compact form for tangent.

**Step 5: Find solutions in the given range $[-2\pi, 2\pi]$.**

**For $x = \frac{\pi}{3} + \pi k$:**
*   $k=0: x = \frac{\pi}{3}$
*   $k=1: x = \frac{\pi}{3} + \pi = \frac{4\pi}{3}$
*   $k=-1: x = \frac{\pi}{3} - \pi = -\frac{2\pi}{3}$
*   $k=-2: x = \frac{\pi}{3} - 2\pi = -\frac{5\pi}{3}$
*   (For $k=2$, $x = \frac{7\pi}{3} > 2\pi$. For $k=-3$, $x = -\frac{8\pi}{3} < -2\pi$.)

**For $x = \frac{2\pi}{3} + \pi k$:**
*   $k=0: x = \frac{2\pi}{3}$
*   $k=1: x = \frac{2\pi}{3} + \pi = \frac{5\pi}{3}$
*   $k=-1: x = \frac{2\pi}{3} - \pi = -\frac{\pi}{3}$
*   $k=-2: x = \frac{2\pi}{3} - 2\pi = -\frac{4\pi}{3}$
*   (For $k=2$, $x = \frac{8\pi}{3} > 2\pi$. For $k=-3$, $x = -\frac{7\pi}{3} < -2\pi$.)

Combining all solutions in the range $[-2\pi, 2\pi]$ and ordering them:
$$ \boxed{x = -\frac{5\pi}{3}, -\frac{4\pi}{3}, -\frac{2\pi}{3}, -\frac{\pi}{3}, \frac{\pi}{3}, \frac{2\pi}{3}, \frac{4\pi}{3}, \frac{5\pi}{3}} $$

**Reflection:** This example involved a quadratic form, leading to two separate cases for $\tan(x)$. It also required careful enumeration of solutions over a wider range, including negative values. The key was remembering $\pm$ for square roots and the $\pi$ periodicity of tangent.

---

### Example 4: Equation with a Transformed Argument

**Problem:** Find all solutions for $\sin(2x) = -\frac{1}{2}$ in the interval $[0, 2\pi]$.

**Given:** The equation $\sin(2x) = -\frac{1}{2}$ and the range $[0, 2\pi]$.
**Want:** All values of $x$ in the given range that satisfy the equation.

**Step 1: Isolate the trigonometric function.**
The trigonometric function is already isolated:
$$ \sin(2x) = -\frac{1}{2} $$
*Explanation:* No algebraic steps are needed for isolation.

**Step 2: Find the principal value (reference angle).**
Let $u = 2x$. We solve $\sin(u) = -\frac{1}{2}$.
First, find the reference angle for $\sin(u) = \frac{1}{2}$:
$$ u_{ref} = \arcsin\left(\frac{1}{2}\right) = \frac{\pi}{6} $$
*Explanation:* We introduce a substitution to simplify the problem temporarily. We find the acute angle whose sine is $1/2$.

**Step 3: Determine all angles for $u$ in one period using quadrant analysis.**
Since $\sin(u)$ is negative, solutions for $u$ lie in Quadrant III and Quadrant IV.
*   **Quadrant III:** $u_1 = \pi + u_{ref} = \pi + \frac{\pi}{6} = \frac{7\pi}{6}$
*   **Quadrant IV:** $u_2 = 2\pi - u_{ref} = 2\pi - \frac{\pi}{6} = \frac{11\pi}{6}$
*Explanation:* We apply the CAST rule to find the angles in the standard $0$ to $2\pi$ range for $u$.

**Step 4: Write the general solution for $u$ using periodicity.**
The period of $\sin(u)$ is $2\pi$.
$$ u = \frac{7\pi}{6} + 2\pi k, \quad k \in \mathbb{Z} $$
$$ u = \frac{11\pi}{6} + 2\pi k, \quad k \in \mathbb{Z} $$
*Explanation:* These are the general solutions for our substituted variable $u$.

**Step 5: Substitute back and find general solutions for $x$.**
Now, replace $u$ with $2x$:
$$ 2x = \frac{7\pi}{6} + 2\pi k $$
$$ 2x = \frac{11\pi}{6} + 2\pi k $$
Divide both equations by 2 to solve for $x$:
$$ x = \frac{7\pi}{12} + \pi k, \quad k \in \mathbb{Z} $$
$$ x = \frac{11\pi}{12} + \pi k, \quad k \in \mathbb{Z} $$
*Explanation:* This is a crucial step. Dividing the entire expression by 2 means the period for $x$ is now $\pi$ (since $2\pi k / 2 = \pi k$).

**Step 6: Find solutions for $x$ in the given range $[0, 2\pi]$.**
We test integer values for $k$.

**For $x = \frac{7\pi}{12} + \pi k$:**
*   $k=0: x = \frac{7\pi}{12}$ (in range)
*   $k=1: x = \frac{7\pi}{12} + \pi = \frac{7\pi}{12} + \frac{12\pi}{12} = \frac{19\pi}{12}$ (in range)
*   $k=2: x = \frac{7\pi}{12} + 2\pi = \frac{31\pi}{12}$ (out of range, $ > 2\pi$)
*   $k=-1: x = \frac{7\pi}{12} - \pi = -\frac{5\pi}{12}$ (out of range, $ < 0$)

**For $x = \frac{11\pi}{12} + \pi k$:**
*   $k=0: x = \frac{11\pi}{12}$ (in range)
*   $k=1: x = \frac{11\pi}{12} + \pi = \frac{11\pi}{12} + \frac{12\pi}{12} = \frac{23\pi}{12}$ (in range)
*   $k=2: x = \frac{11\pi}{12} + 2\pi = \frac{35\pi}{12}$ (out of range, $ > 2\pi$)
*   $k=-1: x = \frac{11\pi}{12} - \pi = -\frac{\pi}{12}$ (out of range, $ < 0$)

Combining all solutions in the range $[0, 2\pi]$ and ordering them:
$$ \boxed{x = \frac{7\pi}{12}, \frac{11\pi}{12}, \frac{19\pi}{12}, \frac{23\pi}{12}} $$

**Reflection:** The key trick here was the transformed argument ($2x$). We first solved for the argument ($u=2x$), found its general solutions, and *then* divided by 2 to find $x$. This also changed the effective period of $x$ to $\pi$, meaning we found *four* solutions in the $[0, 2\pi]$ range instead of the usual two for $\sin(x)=K$.

---

### Example 5: Quadratic in form, requiring an identity

**Problem:** Solve $2\sin^2(\theta) - \cos(\theta) - 1 = 0$ for $\theta \in [0^\circ, 360^\circ]$.

**Given:** The equation $2\sin^2(\theta) - \cos(\theta) - 1 = 0$ and the range $[0^\circ, 360^\circ]$.
**Want:** All values of $\theta$ in the given range that satisfy the equation.

**Step 1: Simplify using identities and make it a single trigonometric function.**
The equation has both $\sin^2(\theta)$ and $\cos(\theta)$. To solve a quadratic-like equation, it's best to have only one type of trigonometric function. We know the Pythagorean identity $\sin^2(\theta) + \cos^2(\theta) = 1$, so $\sin^2(\theta) = 1 - \cos^2(\theta)$.
Substitute this into the equation:
$$ 2(1 - \cos^2(\theta)) - \cos(\theta) - 1 = 0 $$
Distribute the 2:
$$ 2 - 2\cos^2(\theta) - \cos(\theta) - 1 = 0 $$
Combine constant terms:
$$ -2\cos^2(\theta) - \cos(\theta) + 1 = 0 $$
Multiply by $-1$ to make the leading term positive (optional, but often cleaner):
$$ 2\cos^2(\theta) + \cos(\theta) - 1 = 0 $$
*Explanation:* This is a crucial step for equations involving mixed trigonometric functions or powers. We used the Pythagorean identity to convert $\sin^2(\theta)$ into an expression involving $\cos^2(\theta)$, resulting in a quadratic equation in terms of $\cos(\theta)$.

**Step 2: Solve the quadratic equation for $\cos(\theta)$.**
Let $y = \cos(\theta)$. The equation becomes:
$$ 2y^2 + y - 1 = 0 $$
We can factor this quadratic:
$$ (2y - 1)(y + 1) = 0 $$
This gives two possible solutions for $y$:
$$ 2y - 1 = 0 \implies 2y = 1 \implies y = \frac{1}{2} $$
$$ y + 1 = 0 \implies y = -1 $$
Substitute back $\cos(\theta)$ for $y$:
$$ \cos(\theta) = \frac{1}{2} \quad \text{or} \quad \cos(\theta) = -1 $$
*Explanation:* We treat $\cos(\theta)$ as a variable and solve the quadratic equation. Factoring is usually the quickest method if possible; otherwise, the quadratic formula can be used. This leads to two separate trigonometric equations to solve.

**Case 1: $\cos(\theta) = \frac{1}{2}$**

**Step 3 (Case 1): Find the principal value (reference angle).**
$$ \theta_{ref} = \arccos\left(\frac{1}{2}\right) = 60^\circ $$
*Explanation:* The acute angle whose cosine is $1/2$ is $60^\circ$.

**Step 4 (Case 1): Determine all angles in one period ($0^\circ$ to $360^\circ$).**
Since $\cos(\theta)$ is positive, solutions are in Quadrant I and Quadrant IV.
*   **Quadrant I:** $\theta_1 = 60^\circ$
*   **Quadrant IV:** $\theta_2 = 360^\circ - 60^\circ = 300^\circ$
*Explanation:* Cosine is positive in Q1 and Q4.

**Case 2: $\cos(\theta) = -1$**

**Step 3 (Case 2): Find the principal value (reference angle).**
This is a special case on the unit circle. $\cos(\theta) = -1$ occurs when the x-coordinate is -1.
*Explanation:* For values like $0, \pm 1$, it's often easier to visualize directly on the unit circle rather than relying on $\arccos$.

**Step 4 (Case 2): Determine all angles in one period ($0^\circ$ to $360^\circ$).**
On the unit circle, $\cos(\theta) = -1$ at $\theta = 180^\circ$.
*   $\theta_3 = 180^\circ$
*Explanation:* This is a unique solution in the $0^\circ$ to $360^\circ$ range.

**Step 5: Combine all solutions and check against the given range.**
The given range is $[0^\circ, 360^\circ]$. All the solutions we found are within this range.
The solutions are $60^\circ, 300^\circ, 180^\circ$.

Ordering them:
$$ \boxed{\theta = 60^\circ, 180^\circ, 300^\circ} $$

**Reflection:** This was a multi-step problem. It required using a trigonometric identity to transform the equation into a quadratic form involving a single trigonometric function. Then, solving the quadratic yielded two separate basic trigonometric equations, each of which had to be solved for angles in the specified range.

## 6. Common mistakes and traps

Students often stumble on specific points when solving trigonometric equations. Being aware of these common traps can help you avoid them.

1.  **Forgetting the second solution (or more):** This is the most frequent error. After finding the principal value (e.g., $\arcsin(1/2) = \pi/6$), students often forget that there's another angle in the first period (e.g., $\pi - \pi/6 = 5\pi/6$) that also satisfies the equation. Always use the CAST rule or unit circle to find *all* solutions in one period.
2.  **Incorrect periodicity:**
    *   Using $2\pi k$ (or $360^\circ k$) for $\tan(x)$: The period of $\tan(x)$ is $\pi$ (or $180^\circ$), so the general solution should be $\alpha + \pi k$.
    *   Using $\pi k$ (or $180^\circ k$) for $\sin(x)$ or $\cos(x)$: The period for $\sin(x)$ and $\cos(x)$ is $2\pi$ (or $360^\circ$), so the general solution should be $\alpha + 2\pi k$.
3.  **Algebraic errors:** Simple mistakes like incorrect distribution, sign errors when moving terms, or incorrect factoring of quadratic equations.
4.  **Dividing by a trigonometric function:** If you have an equation like $\sin(x)\cos(x) = \sin(x)$, do *not* divide by $\sin(x)$ to get $\cos(x) = 1$. If $\sin(x)=0$, you would lose valid solutions. Instead, rearrange and factor: $\sin(x)\cos(x) - \sin(x) = 0 \implies \sin(x)(\cos(x)-1) = 0$. This gives $\sin(x)=0$ *or* $\cos(x)=1$.
5.  **Sign errors with reference angles:** When $\text{trig}(\theta)$ is negative, students sometimes use the negative value directly in $\arcsin$ or $\arctan$ and then struggle to adjust the angle to the correct quadrant. It's often safer to find the positive reference angle first and then use quadrant rules. For example, for $\sin(x) = -1/2$, find $\arcsin(1/2) = \pi/6$, then place it in Q3 and Q4.
6.  **Incorrectly handling transformed arguments:** For equations like $\sin(2x) = K$, remember to solve for $2x$ first, find *its* general solutions, and *then* divide by 2 (or whatever coefficient) to get $x$. This also changes the effective period for $x$.
7.  **Missing solutions in a given range:** After finding general solutions, it's crucial to systematically test enough integer values of $k$ (positive, negative, and zero) to ensure all solutions within the specified range are found. Don't stop too early.
8.  **Forgetting domain restrictions:** For $\tan(x)$, remember that $x \ne \pi/2 + \pi k$. While most problems won't yield these as solutions, it's good to be aware of the underlying domain.

## 7. Textbook-precise explanation

A trigonometric equation is an equation that involves one or more trigonometric functions of a variable. The process of solving such equations involves isolating the trigonometric function, identifying angles within a fundamental period that satisfy the equation, and then extending these solutions to the entire domain using the periodicity of the functions.

Let $\alpha$ denote the principal value (or reference angle) obtained from an inverse trigonometric function. The general solutions for the basic trigonometric equations are given as follows, where $n \in \mathbb{Z}$ (the set of all integers):

1.  **For $\sin(\theta) = k$, where $-1 \le k \le 1$:**
    Let $\alpha = \arcsin(k)$, where $-\pi/2 \le \alpha \le \pi/2$.
    The general solutions are:
    $$ \theta = n\pi + (-1)^n \alpha $$
    Alternatively, and often more intuitively for application:
    $$ \theta = 2n\pi + \alpha \quad \text{and} \quad \theta = 2n\pi + (\pi - \alpha) $$
    This accounts for solutions in Quadrant I/IV (from $\alpha$) and Quadrant II/III (from $\pi-\alpha$, adjusted for sign).

2.  **For $\cos(\theta) = k$, where $-1 \le k \le 1$:**
    Let $\alpha = \arccos(k)$, where $0 \le \alpha \le \pi$.
    The general solutions are:
    $$ \theta = 2n\pi \pm \alpha $$
    This accounts for solutions in Quadrant I/II (from $\alpha$) and Quadrant IV/III (from $2\pi-\alpha$, which is equivalent to $-\alpha$ in terms of symmetry).

3.  **For $\tan(\theta) = k$, where $k \in \mathbb{R}$:**
    Let $\alpha = \arctan(k)$, where $-\pi/2 < \alpha < \pi/2$.
    The general solutions are:
    $$ \theta = n\pi + \alpha $$
    This accounts for solutions in Quadrant I/IV (from $\alpha$) and Quadrant III/II (from $\pi+\alpha$, which is simply $\alpha$ shifted by the period $\pi$).

When solving equations involving multiple trigonometric functions or powers (e.g., $2\sin^2(\theta) - \cos(\theta) - 1 = 0$), trigonometric identities (such as $\sin^2(\theta) + \cos^2(\theta) = 1$) are frequently used to transform the equation into a form involving a single trigonometric function or a factorable expression. The resulting algebraic equation (often quadratic) is then solved for the trigonometric function, leading to one or more basic trigonometric equations.

To find solutions within a specific interval $[L, R]$, one must substitute integer values for $n$ into the general solutions and select only those angles that fall within the given range. For equations with transformed arguments (e.g., $\sin(a\theta + b) = k$), it is imperative to solve for the argument ($u = a\theta + b$) first, find its general solutions, and then solve for $\theta$. The period of the solutions for $\theta$ will be altered by the coefficient $a$.

*(Refer to: Stewart, J. (2021). *Calculus: Early Transcendentals* (9th ed.). Cengage Learning. Chapter 1, Section 1.5 "Trigonometric Functions" and related exercises. Or, a comprehensive Precalculus textbook like "Precalculus: Mathematics for Calculus" by Stewart, Redlin, and Watson.)*

## 8. ASCII diagrams

Here's an ASCII diagram illustrating the Unit Circle, which is fundamental to understanding solutions in different quadrants and periodicity.

```text
               Y
               |
               |
       Q2      |      Q1
   (-x, +y)    |   (+x, +y)
   sin +       |   sin +
   cos -       |   cos +
   tan -       |   tan +
---------------|------------------ X
       Q3      |      Q4
   (-x, -y)    |   (+x, -y)
   sin -       |   sin -
   cos -       |   cos +
   tan +       |   tan -
               |
               |

   Key points on the Unit Circle (in radians):
   (1,0) at 0, 2pi (0 degrees, 360 degrees)
   (0,1) at pi/2 (90 degrees)
   (-1,0) at pi (180 degrees)
   (0,-1) at 3pi/2 (270 degrees)

   CAST Rule for positive trig functions:
   C: Cosine is positive in Quadrant IV
   A: All functions are positive in Quadrant I
   S: Sine is positive in Quadrant II
   T: Tangent is positive in Quadrant III
```

This diagram helps visualize where sine, cosine, and tangent are positive or negative, which is crucial for finding all solutions within a single period. For example, if $\sin(\theta)$ is positive, the solutions will be in Q1 and Q2. If $\cos(\theta)$ is negative, solutions are in Q2 and Q3.

## 9. Memory technique — never forget this

1.  **Specific mnemonic/visual hook:**
    *   **CAST Rule:** "All Students Take Calculus" (starting from Q1 and moving counter-clockwise) helps you remember which functions are positive in which quadrant.
        *   **A**ll (Q1)
        *   **S**ine (Q2)
        *   **T**angent (Q3)
        *   **C**osine (Q4)
    *   **Visualizing General Solutions:** For sine and cosine, think of the wave graph. If $\sin(x) = k$, draw a horizontal line at $y=k$. You'll see two points in each $2\pi$ cycle. For $\tan(x)=k$, draw a horizontal line. You'll see one point in each $\pi$ cycle, and the next one is just $\pi$ away.
    *   **The "Two-Step" for arguments:** When you have something like $\sin(2x) = K$, remember the "Solve for $u$, then solve for $x$" mantra. First, pretend it's $\sin(u)=K$, get all $u$ solutions, *then* substitute $u=2x$ and divide by 2. This prevents errors with periodicity.

2.  **The 1-3 formulas/facts they MUST overlearn:**
    1.  **General Solution for Sine:** If $\sin(\theta) = \sin(\alpha)$, then $\theta = n\pi + (-1)^n \alpha$, for $n \in \mathbb{Z}$. (Or the two-part form: $\theta = 2n\pi + \alpha$ and $\theta = 2n\pi + (\pi - \alpha)$).
    2.  **General Solution for Cosine:** If $\cos(\theta) = \cos(\alpha)$, then $\theta = 2n\pi \pm \alpha$, for $n \in \mathbb{Z}$.
    3.  **General Solution for Tangent:** If $\tan(\theta) = \tan(\alpha)$, then $\theta = n\pi + \alpha$, for $n \in \mathbb{Z}$.
    *   Crucially, also remember the periods: $2\pi$ for $\sin, \cos$; $\pi$ for $\tan$.

3.  **Spaced-repetition schedule:**
    To embed these concepts and formulas into long-term memory, follow this schedule:
    *   **Review 1:** 1 day after initial learning.
    *   **Review 2:** 3 days after Review 1.
    *   **Review 3:** 7 days after Review 2.
    *   **Review 4:** 16 days after Review 3.
    *   **Review 5:** 35 days after Review 4.
    During each review, re-derive the general solution formulas from first principles (see below) and work through 2-3 varied practice problems.

4.  **The first-principles re-derivation pathway:**
    If you ever forget the exact general solution formulas, you can always rebuild them from the unit circle and the concept of periodicity:
    *   **Step 1: Find the principal value ($\alpha$).** Use your calculator's inverse trig function (or special angles) to get one angle, usually in Q1 or Q4 (for $\sin, \tan$) or Q1 or Q2 (for $\cos$).
    *   **Step 2: Use the Unit Circle and CAST rule to find the *other* solution in one period.**
        *   For $\sin(\theta) = K$: If $\alpha$ is in Q1/Q4, the other solution is in Q2/Q3, found by $\pi - \alpha$.
        *   For $\cos(\theta) = K$: If $\alpha$ is in Q1/Q2, the other solution is in Q4/Q3, found by $2\pi - \alpha$ (or $-\alpha$).
        *   For $\tan(\theta) = K$: If $\alpha$ is in Q1/Q4, the other solution is in Q3/Q2, found by $\pi + \alpha$.
    *   **Step 3: Add the appropriate period ($2\pi k$ or $\pi k$) to *each* distinct solution found in Step 2.**
        *   For $\sin(\theta)$: $\alpha + 2\pi k$ and $(\pi - \alpha) + 2\pi k$.
        *   For $\cos(\theta)$: $\alpha + 2\pi k$ and $(2\pi - \alpha) + 2\pi k$ (which simplifies to $\pm \alpha + 2\pi k$).
        *   For $\tan(\theta)$: $\alpha + \pi k$ (since $\pi + \alpha$ is just $\alpha$ shifted by one period).
    This re-derivation process reinforces understanding and makes you resilient to forgetting specific formulas.

## 10. Connections — what this leads to

Solving trigonometric equations is a foundational skill that unlocks numerous advanced topics in mathematics, physics, and engineering. Mastering this subtopic prepares you for:

*   **Calculus:**
    *   **Derivatives and Integrals of Trigonometric Functions:** Solving trig equations is essential when finding critical points (where the derivative is zero) or points of inflection (where the second derivative is zero) for functions involving sine, cosine, etc., to perform optimization or curve sketching.
    *   **Related Rates and Optimization:** Many real-world problems in calculus involve trigonometric relationships, and solving trig equations is often a step in finding maximums, minimums, or specific rates of change.
*   **Differential Equations:** Trigonometric functions are fundamental to solving many types of differential equations, especially those modeling oscillatory or periodic phenomena (e.g., simple harmonic motion, damped oscillations). The solutions to these differential equations often involve solving trigonometric equations for specific constants or initial conditions.
*   **Physics:**
    *   **Waves and Optics:** Understanding wave interference, diffraction, and resonance explicitly requires solving trigonometric equations to determine angles, wavelengths, or frequencies.
    *   **Quantum Mechanics:** Wave functions in quantum mechanics are often expressed using trigonometric or complex exponential functions, and solving for specific states or probabilities can involve trigonometric equations.
    *   **AC Circuits:** Analyzing the phase relationships between voltage and current in alternating current circuits relies heavily on solving trigonometric equations.
*   **Engineering:**
    *   **Signal Processing:** Fourier series and Fourier transforms decompose complex signals into sums of sines and cosines. Solving trigonometric equations is crucial