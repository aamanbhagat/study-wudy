## 1. What it is — in plain English

Imagine you're trying to find a hidden treasure on a map. But instead of one clue, you have several clues, and they all have to be true at the same exact location. For example, "the treasure is exactly 5 miles from the old oak tree" AND "the treasure is exactly 3 miles from the river bend." Finding the treasure means finding a single spot that satisfies *all* these conditions simultaneously.

Newton's method in $n$ dimensions is like a super-smart treasure hunter for these kinds of problems. It's a numerical technique that helps us find the specific values for multiple unknown variables that make a whole set of equations true at the same time. These equations are "nonlinear," meaning they aren't simple straight lines or planes; they can be curvy and complex.

How does it work? You start with an educated guess for where the treasure might be. Then, the method looks at the "local landscape" around your guess – it figures out how each clue changes if you move a tiny bit in any direction. Using this local information, it calculates a much better guess, telling you which way to move and by how much to get closer to satisfying all the clues.

You repeat this process: guess, analyze local landscape, make a better guess. Each new guess gets you closer and closer to the true solution, until you're practically right on top of the treasure. It's an iterative refinement process, like zooming in on a map until you pinpoint the exact spot.

## 2. Why it matters — real-world applications

Solving systems of nonlinear equations is fundamental across science and engineering. Newton's method, or variations of it, underpins many advanced computational tasks.

1.  **Robotics and Animation (Inverse Kinematics):** Imagine a robotic arm with multiple joints, or an animated character's limb. You want the end effector (the hand of the robot, or the character's fingertip) to reach a specific point in space. The equations describing the arm's configuration (joint angles) are highly nonlinear. Inverse kinematics is the problem of finding the joint angles that achieve a desired end-effector position and orientation. Newton's method is often used to solve these complex systems, allowing robots to perform tasks and animated characters to move realistically.

2.  **Machine Learning (Optimization):** While gradient descent and its variants are more common for training neural networks, the *idea* of Newton's method is crucial in optimization. Newton's method can be used to find the minimum of a function by finding the roots of its gradient (where the gradient is zero). In specific contexts, such as optimizing smaller, well-behaved models or as a component within more complex optimization algorithms, Newton-like methods are employed to quickly converge to optimal parameters by taking into account the curvature of the loss function (via the Hessian matrix, which is analogous to the Jacobian of the gradient vector).

3.  **Aerospace Engineering (Trajectory Optimization and Structural Analysis):** Designing aircraft or spacecraft involves solving intricate nonlinear systems. For instance, optimizing a rocket's trajectory to minimize fuel consumption while meeting specific orbital insertion parameters involves nonlinear dynamics. Similarly, simulating the behavior of complex structures under various loads (e.g., stress analysis on an aircraft wing) often leads to large systems of nonlinear equations that must be solved numerically, with Newton's method providing a robust solution strategy.

4.  **Circuit Simulation (Electrical Engineering):** Analyzing complex electronic circuits, especially those containing nonlinear components like transistors and diodes, requires solving systems of nonlinear algebraic equations. Software like SPICE (Simulation Program with Integrated Circuit Emphasis) uses iterative methods, often based on Newton's method, to find the DC operating points or transient responses of these circuits. This is critical for designing and verifying integrated circuits and electronic systems.

## 3. Prerequisites — what you must know first

Before diving into Newton's method in $n$ dimensions, ensure you have a solid grasp of these foundational concepts:

*   **Single-Variable Newton's Method:** Understanding how Newton's method works for a single equation $f(x)=0$ in one variable, including the geometric interpretation of tangent lines and the iterative formula $x_{k+1} = x_k - f(x_k)/f'(x_k)$.
*   **Partial Derivatives:** How to differentiate a multivariable function with respect to one variable, treating others as constants.
*   **Gradient Vector:** The vector of all first-order partial derivatives of a scalar-valued function $\nabla f = (\frac{\partial f}{\partial x_1}, \dots, \frac{\partial f}{\partial x_n})$.
*   **Vector-Valued Functions:** Functions that take multiple inputs and produce multiple outputs, i.e., $\mathbf{F}: \mathbb{R}^n \to \mathbb{R}^m$.
*   **Jacobian Matrix:** The matrix of all first-order partial derivatives of a vector-valued function. For $\mathbf{F}: \mathbb{R}^n \to \mathbb{R}^n$, the Jacobian $J(\mathbf{x})$ is an $n \times n$ matrix where $J_{ij} = \frac{\partial F_i}{\partial x_j}$.
*   **Multivariable Taylor Series Expansion:** Specifically, the first-order Taylor expansion for a vector-valued function around a point. This is the cornerstone of deriving the method.
*   **Matrix Algebra:** How to perform matrix-vector multiplication, matrix inversion, and solve systems of linear equations of the form $A\mathbf{x} = \mathbf{b}$. This is crucial because each step of Newton's method involves solving such a system.

## 4. The core idea — step by step

Let's break down Newton's method for nonlinear systems into understandable steps.

### Step 1: The Problem Statement

*   **Plain English:** We are looking for a specific set of numbers (let's call them $x_1, x_2, \dots, x_n$) that, when plugged into a collection of $n$ equations, make *all* those equations equal to zero simultaneously. Think of it as finding the "common root" for a system of equations.
*   **Small Concrete Example:** Suppose we have two equations with two variables, $x$ and $y$:
    1.  $x^2 + y^2 - 4 = 0$ (a circle)
    2.  $e^x - y - 1 = 0$ (an exponential curve)
    We want to find the $(x, y)$ coordinates where these two curves intersect.
*   **Formal/Mathematical Version:** We want to find a vector $\mathbf{x}^* \in \mathbb{R}^n$ such that $\mathbf{F}(\mathbf{x}^*) = \mathbf{0}$, where $\mathbf{F}$ is a vector-valued function $\mathbf{F}: \mathbb{R}^n \to \mathbb{R}^n$.
    Here, $\mathbf{F}(\mathbf{x})$ is a column vector of $n$ functions:
    $$ \mathbf{F}(\mathbf{x}) = \begin{pmatrix} F_1(x_1, x_2, \dots, x_n) \\ F_2(x_1, x_2, \dots, x_n) \\ \vdots \\ F_n(x_1, x_2, \dots, x_n) \end{pmatrix} $$
    And $\mathbf{0}$ is the zero vector:
    $$ \mathbf{0} = \begin{pmatrix} 0 \\ 0 \\ \vdots \\ 0 \end{pmatrix} $$
    For our example:
    $$ \mathbf{x} = \begin{pmatrix} x \\ y \end{pmatrix}, \quad \mathbf{F}(\mathbf{x}) = \begin{pmatrix} x^2 + y^2 - 4 \\ e^x - y - 1 \end{pmatrix} $$
*   **What could go wrong:** Such a solution $\mathbf{x}^*$ might not exist, or there might be multiple solutions. Newton's method typically finds one solution, depending on the initial guess.

### Step 2: Recall Single-Variable Newton's Method (The Intuition)

*   **Plain English:** For a single equation $f(x)=0$, we start with a guess $x_k$. We draw the tangent line to the curve $y=f(x)$ at $x_k$. The point where this tangent line crosses the x-axis gives us our next, hopefully better, guess $x_{k+1}$. We repeat this.
*   **Small Concrete Example:** To find $\sqrt{2}$ (i.e., solve $x^2 - 2 = 0$), if $x_k=1$, $f(1)=-1$, $f'(1)=2$. The tangent line is $y - (-1) = 2(x - 1)$, or $y = 2x - 3$. Setting $y=0$ gives $0 = 2x - 3 \implies x = 3/2 = 1.5$. So $x_{k+1}=1.5$.
*   **Formal/Mathematical Version:** The formula is $x_{k+1} = x_k - \frac{f(x_k)}{f'(x_k)}$. This formula comes directly from the Taylor expansion $f(x_k + \Delta x) \approx f(x_k) + f'(x_k)\Delta x$. Setting $f(x_k + \Delta x) = 0$ gives $f(x_k) + f'(x_k)\Delta x = 0$, so $\Delta x = -f(x_k)/f'(x_k)$. Then $x_{k+1} = x_k + \Delta x$.
*   **What could go wrong:** If $f'(x_k)$ is zero or very close to zero, the tangent line is horizontal or nearly horizontal, leading to division by zero or a very large jump, potentially causing divergence.

### Step 3: Generalizing to Multiple Variables (Taylor Expansion)

*   **Plain English:** We can't draw a simple tangent line for multiple dimensions. Instead, we use the multivariable equivalent of a tangent line: a linear approximation (a tangent hyperplane) of our vector-valued function $\mathbf{F}(\mathbf{x})$ around our current guess $\mathbf{x}_k$. This linear approximation tells us how $\mathbf{F}(\mathbf{x})$ changes as we move a little bit away from $\mathbf{x}_k$.
*   **Small Concrete Example:** For our system $\mathbf{F}(\mathbf{x}) = \begin{pmatrix} F_1(x, y) \\ F_2(x, y) \end{pmatrix}$, if we're at a point $\mathbf{x}_k = (x_k, y_k)$, we want to approximate $\mathbf{F}(x_k + \Delta x, y_k + \Delta y)$. The linear approximation will involve the partial derivatives of $F_1$ and $F_2$ with respect to $x$ and $y$.
*   **Formal/Mathematical Version:** The first-order Taylor expansion for a vector-valued function $\mathbf{F}(\mathbf{x})$ around a point $\mathbf{x}_k$ is:
    $$ \mathbf{F}(\mathbf{x}_k + \Delta \mathbf{x}) \approx \mathbf{F}(\mathbf{x}_k) + J(\mathbf{x}_k) \Delta \mathbf{x} $$
    Here:
    *   $\mathbf{x}_k$ is our current guess (a vector).
    *   $\Delta \mathbf{x}$ is the correction vector we want to find, such that $\mathbf{x}_{k+1} = \mathbf{x}_k + \Delta \mathbf{x}$.
    *   $J(\mathbf{x}_k)$ is the **Jacobian matrix** of $\mathbf{F}$ evaluated at $\mathbf{x}_k$. The Jacobian matrix contains all the first-order partial derivatives:
        $$ J(\mathbf{x}) = \begin{pmatrix} \frac{\partial F_1}{\partial x_1} & \frac{\partial F_1}{\partial x_2} & \dots & \frac{\partial F_1}{\partial x_n} \\ \frac{\partial F_2}{\partial x_1} & \frac{\partial F_2}{\partial x_2} & \dots & \frac{\partial F_2}{\partial x_n} \\ \vdots & \vdots & \ddots & \vdots \\ \frac{\partial F_n}{\partial x_1} & \frac{\partial F_n}{\partial x_2} & \dots & \frac{\partial F_n}{\partial x_n} \end{pmatrix} $$
    For our example $\mathbf{F}(\mathbf{x}) = \begin{pmatrix} x^2 + y^2 - 4 \\ e^x - y - 1 \end{pmatrix}$:
    $$ J(\mathbf{x}) = \begin{pmatrix} \frac{\partial}{\partial x}(x^2+y^2-4) & \frac{\partial}{\partial y}(x^2+y^2-4) \\ \frac{\partial}{\partial x}(e^x-y-1) & \frac{\partial}{\partial y}(e^x-y-1) \end{pmatrix} = \begin{pmatrix} 2x & 2y \\ e^x & -1 \end{pmatrix} $$
*   **What could go wrong:** This is an *approximation*. It's only accurate when $\Delta \mathbf{x}$ is small, meaning our current guess $\mathbf{x}_k$ must be reasonably close to the actual root $\mathbf{x}^*$ for the method to work well.

### Step 4: Setting the Approximation to Zero

*   **Plain English:** Just like in the single-variable case where we set the tangent line to zero to find the next guess, we now set our linear approximation of $\mathbf{F}(\mathbf{x})$ to zero. This allows us to calculate the correction vector $\Delta \mathbf{x}$ that would make the *approximated* $\mathbf{F}(\mathbf{x})$ equal to zero.
*   **Small Concrete Example:** Using the linear approximation from Step 3, we want to find $\Delta \mathbf{x}$ such that $\mathbf{F}(\mathbf{x}_k) + J(\mathbf{x}_k) \Delta \mathbf{x} = \mathbf{0}$.
*   **Formal/Mathematical Version:** We set the right-hand side of the Taylor expansion to $\mathbf{0}$:
    $$ \mathbf{F}(\mathbf{x}_k) + J(\mathbf{x}_k) \Delta \mathbf{x} = \mathbf{0} $$
    Rearranging this equation to solve for $\Delta \mathbf{x}$ gives us a system of linear equations:
    $$ J(\mathbf{x}_k) \Delta \mathbf{x} = -\mathbf{F}(\mathbf{x}_k) $$
    This is a standard linear system of the form $A\mathbf{z} = \mathbf{b}$, where $A = J(\mathbf{x}_k)$, $\mathbf{z} = \Delta \mathbf{x}$, and $\mathbf{b} = -\mathbf{F}(\mathbf{x}_k)$.
*   **What could go wrong:** If the Jacobian matrix $J(\mathbf{x}_k)$ is singular (i.e., its determinant is zero, or it's not invertible) at any point during the iteration, this linear system cannot be solved uniquely for $\Delta \mathbf{x}$. This often happens if the problem is ill-posed or if the current guess is at a critical point of one of the component functions.

### Step 5: Calculating the Next Guess

*   **Plain English:** Once we've set up the linear system in Step 4, we solve it to find the correction vector $\Delta \mathbf{x}$. This $\Delta \mathbf{x}$ tells us how much to adjust each of our variables ($x_1, x_2, \dots, x_n$) from our current guess $\mathbf{x}_k$. We then add this correction to our current guess to get the new, improved guess $\mathbf{x}_{k+1}$.
*   **Small Concrete Example:** If we solve $J(\mathbf{x}_k) \Delta \mathbf{x} = -\mathbf{F}(\mathbf{x}_k)$ and find $\Delta \mathbf{x} = \begin{pmatrix} \Delta x \\ \Delta y \end{pmatrix}$, then our next guess will be $\mathbf{x}_{k+1} = \begin{pmatrix} x_k + \Delta x \\ y_k + \Delta y \end{pmatrix}$.
*   **Formal/Mathematical Version:** To solve $J(\mathbf{x}_k) \Delta \mathbf{x} = -\mathbf{F}(\mathbf{x}_k)$, we typically use numerical methods for linear systems (like LU decomposition or Gaussian elimination) rather than explicitly computing the inverse, especially for large systems. However, conceptually, we can write:
    $$ \Delta \mathbf{x} = -J(\mathbf{x}_k)^{-1} \mathbf{F}(\mathbf{x}_k) $$
    Then, the next iterate is:
    $$ \mathbf{x}_{k+1} = \mathbf{x}_k + \Delta \mathbf{x} $$
    or, substituting $\Delta \mathbf{x}$:
    $$ \mathbf{x}_{k+1} = \mathbf{x}_k - J(\mathbf{x}_k)^{-1} \mathbf{F}(\mathbf{x}_k) $$
    This is the core iterative formula for Newton's method in $n$ dimensions.
*   **What could go wrong:** Explicitly calculating the inverse $J(\mathbf{x}_k)^{-1}$ can be computationally expensive for very large systems ($O(n^3)$ operations). More efficient methods solve the linear system directly without computing the inverse.

### Step 6: Iteration and Convergence

*   **Plain English:** We repeat Steps 4 and 5, using the new guess $\mathbf{x}_{k+1}$ as the starting point for the next iteration. We keep doing this until our guesses stop changing much (meaning we're very close to a root) or until the value of $\mathbf{F}(\mathbf{x})$ is very close to zero (meaning all equations are almost satisfied).
*   **Small Concrete Example:**
    1.  Start with $\mathbf{x}_0$.
    2.  Calculate $\mathbf{F}(\mathbf{x}_0)$ and $J(\mathbf{x}_0)$.
    3.  Solve $J(\mathbf{x}_0) \Delta \mathbf{x}_0 = -\mathbf{F}(\mathbf{x}_0)$ for $\Delta \mathbf{x}_0$.
    4.  Set $\mathbf{x}_1 = \mathbf{x}_0 + \Delta \mathbf{x}_0$.
    5.  Check if $\|\Delta \mathbf{x}_0\|$ is small enough, or if $\|\mathbf{F}(\mathbf{x}_1)\|$ is small enough. If not, set $\mathbf{x}_k = \mathbf{x}_1$ and go back to step 2.
*   **Formal/Mathematical Version:** The iteration continues for $k = 0, 1, 2, \dots$ until a convergence criterion is met. Common criteria include:
    *   $\|\mathbf{x}_{k+1} - \mathbf{x}_k\| < \epsilon$ (the change in the solution vector is small)
    *   $\|\Delta \mathbf{x}_k\| < \epsilon$ (same as above, as $\Delta \mathbf{x}_k = \mathbf{x}_{k+1} - \mathbf{x}_k$)
    *   $\|\mathbf{F}(\mathbf{x}_{k+1})\| < \epsilon$ (the function values are close to zero)
    where $\epsilon$ is a small tolerance value (e.g., $10^{-6}$). The norm $\|\cdot\|$ can be any vector norm (e.g., Euclidean norm).
*   **What could go wrong:**
    *   **Divergence:** The sequence of guesses $\mathbf{x}_k$ might move further and further away from any root. This often happens with a poor initial guess $\mathbf{x}_0$.
    *   **Oscillation:** The guesses might bounce back and forth without settling on a solution.
    *   **Convergence to a different root:** If there are multiple solutions, the method will converge to the one closest to the initial guess (if it converges at all).
    *   **Slow convergence:** While Newton's method is known for quadratic convergence (meaning the number of correct digits roughly doubles each iteration *when close to the root*), if the initial guess is far or the Jacobian is nearly singular near the root, convergence can be slow or fail.

## 5. Worked examples — multiple, with every step shown

Let's work through some examples to solidify the process.

### Example 1: 2D System (Easy)

**Problem Statement:** Find the roots of the system:
$$ F_1(x, y) = x^2 + y^2 - 4 = 0 $$
$$ F_2(x, y) = e^x - y - 1 = 0 $$
Use an initial guess $\mathbf{x}_0 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$. Perform two iterations.

**What's Given:**
*   $\mathbf{F}(\mathbf{x}) = \begin{pmatrix} x^2 + y^2 - 4 \\ e^x - y - 1 \end{pmatrix}$
*   Initial guess $\mathbf{x}_0 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$

**What We Want:** $\mathbf{x}_1$ and $\mathbf{x}_2$.

**Step 1: Calculate the Jacobian Matrix $J(\mathbf{x})$**
We need the partial derivatives of $F_1$ and $F_2$:
$$ J(\mathbf{x}) = \begin{pmatrix} \frac{\partial F_1}{\partial x} & \frac{\partial F_1}{\partial y} \\ \frac{\partial F_2}{\partial x} & \frac{\partial F_2}{\partial y} \end{pmatrix} $$
$$ \frac{\partial F_1}{\partial x} = \frac{\partial}{\partial x}(x^2 + y^2 - 4) = 2x $$
$$ \frac{\partial F_1}{\partial y} = \frac{\partial}{\partial y}(x^2 + y^2 - 4) = 2y $$
$$ \frac{\partial F_2}{\partial x} = \frac{\partial}{\partial x}(e^x - y - 1) = e^x $$
$$ \frac{\partial F_2}{\partial y} = \frac{\partial}{\partial y}(e^x - y - 1) = -1 $$
So, the Jacobian matrix is:
$$ J(\mathbf{x}) = \begin{pmatrix} 2x & 2y \\ e^x & -1 \end{pmatrix} $$
*Explanation: This matrix captures how each function changes with respect to each variable at any given point $(x,y)$.*

---

**Iteration 1 (k=0):**

**Step 1.1: Evaluate $\mathbf{F}(\mathbf{x}_0)$ and $J(\mathbf{x}_0)$**
Given $\mathbf{x}_0 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$:
$$ \mathbf{F}(\mathbf{x}_0) = \begin{pmatrix} (1)^2 + (1)^2 - 4 \\ e^{(1)} - (1) - 1 \end{pmatrix} = \begin{pmatrix} 1 + 1 - 4 \\ e - 2 \end{pmatrix} = \begin{pmatrix} -2 \\ e - 2 \end{pmatrix} \approx \begin{pmatrix} -2 \\ 0.71828 \end{pmatrix} $$
*Explanation: We plug our initial guess into the original system of equations to see how far off we are from zero.*

$$ J(\mathbf{x}_0) = \begin{pmatrix} 2(1) & 2(1) \\ e^{(1)} & -1 \end{pmatrix} = \begin{pmatrix} 2 & 2 \\ e & -1 \end{pmatrix} \approx \begin{pmatrix} 2 & 2 \\ 2.71828 & -1 \end{pmatrix} $$
*Explanation: We plug our initial guess into the Jacobian matrix to get the specific linear approximation at this point.*

**Step 1.2: Solve the linear system $J(\mathbf{x}_0) \Delta \mathbf{x}_0 = -\mathbf{F}(\mathbf{x}_0)$**
Let $\Delta \mathbf{x}_0 = \begin{pmatrix} \Delta x_0 \\ \Delta y_0 \end{pmatrix}$. The system is:
$$ \begin{pmatrix} 2 & 2 \\ e & -1 \end{pmatrix} \begin{pmatrix} \Delta x_0 \\ \Delta y_0 \end{pmatrix} = - \begin{pmatrix} -2 \\ e - 2 \end{pmatrix} = \begin{pmatrix} 2 \\ -(e - 2) \end{pmatrix} = \begin{pmatrix} 2 \\ 2 - e \end{pmatrix} $$
We can solve this using Cramer's rule or substitution.
From the first equation: $2 \Delta x_0 + 2 \Delta y_0 = 2 \implies \Delta x_0 + \Delta y_0 = 1 \implies \Delta y_0 = 1 - \Delta x_0$.
Substitute into the second equation:
$e \Delta x_0 - \Delta y_0 = 2 - e$
$e \Delta x_0 - (1 - \Delta x_0) = 2 - e$
$e \Delta x_0 - 1 + \Delta x_0 = 2 - e$
$(e+1) \Delta x_0 = 3 - e$
$$ \Delta x_0 = \frac{3 - e}{e + 1} \approx \frac{3 - 2.71828}{2.71828 + 1} = \frac{0.28172}{3.71828} \approx 0.07577 $$
Now find $\Delta y_0$:
$$ \Delta y_0 = 1 - \Delta x_0 = 1 - \frac{3 - e}{e + 1} = \frac{e + 1 - (3 - e)}{e + 1} = \frac{2e - 2}{e + 1} \approx \frac{2(2.71828) - 2}{3.71828} = \frac{3.43656}{3.71828} \approx 0.92423 $$
So, $\Delta \mathbf{x}_0 \approx \begin{pmatrix} 0.07577 \\ 0.92423 \end{pmatrix}$.
*Explanation: We are solving a system of linear equations to find the "step" or "correction" vector that will move us towards the root.*

**Step 1.3: Calculate the next guess $\mathbf{x}_1 = \mathbf{x}_0 + \Delta \mathbf{x}_0$**
$$ \mathbf{x}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix} + \begin{pmatrix} 0.07577 \\ 0.92423 \end{pmatrix} = \begin{pmatrix} 1.07577 \\ 1.92423 \end{pmatrix} $$
*Explanation: We add the calculated correction to our previous guess to get our new, hopefully better, guess.*

---

**Iteration 2 (k=1):**

**Step 2.1: Evaluate $\mathbf{F}(\mathbf{x}_1)$ and $J(\mathbf{x}_1)$**
Using $\mathbf{x}_1 = \begin{pmatrix} 1.07577 \\ 1.92423 \end{pmatrix}$:
$$ F_1(\mathbf{x}_1) = (1.07577)^2 + (1.92423)^2 - 4 \approx 1.1573 + 3.7037 - 4 = 0.8610 $$
$$ F_2(\mathbf{x}_1) = e^{1.07577} - 1.92423 - 1 \approx 2.9320 - 1.92423 - 1 = 0.00777 $$
$$ \mathbf{F}(\mathbf{x}_1) \approx \begin{pmatrix} 0.8610 \\ 0.00777 \end{pmatrix} $$
*Explanation: We check the function values at the new guess. They are closer to zero than before, indicating progress.*

$$ J(\mathbf{x}_1) = \begin{pmatrix} 2(1.07577) & 2(1.92423) \\ e^{1.07577} & -1 \end{pmatrix} = \begin{pmatrix} 2.15154 & 3.84846 \\ 2.9320 & -1 \end{pmatrix} $$
*Explanation: We update the Jacobian matrix with the new guess.*

**Step 2.2: Solve the linear system $J(\mathbf{x}_1) \Delta \mathbf{x}_1 = -\mathbf{F}(\mathbf{x}_1)$**
$$ \begin{pmatrix} 2.15154 & 3.84846 \\ 2.9320 & -1 \end{pmatrix} \begin{pmatrix} \Delta x_1 \\ \Delta y_1 \end{pmatrix} = - \begin{pmatrix} 0.8610 \\ 0.00777 \end{pmatrix} = \begin{pmatrix} -0.8610 \\ -0.00777 \end{pmatrix} $$
Solving this system (e.g., using a calculator or linear algebra solver):
$\Delta x_1 \approx -0.00947$
$\Delta y_1 \approx -0.21855$
So, $\Delta \mathbf{x}_1 \approx \begin{pmatrix} -0.00947 \\ -0.21855 \end{pmatrix}$.
*Explanation: Calculate the next step to further refine the solution.*

**Step 2.3: Calculate the next guess $\mathbf{x}_2 = \mathbf{x}_1 + \Delta \mathbf{x}_1$**
$$ \mathbf{x}_2 = \begin{pmatrix} 1.07577 \\ 1.92423 \end{pmatrix} + \begin{pmatrix} -0.00947 \\ -0.21855 \end{pmatrix} = \begin{pmatrix} 1.06630 \\ 1.70568 \end{pmatrix} $$
*Explanation: Update the guess again.*

After two iterations, our approximation for the root is $\mathbf{x}_2 = \begin{pmatrix} 1.06630 \\ 1.70568 \end{pmatrix}$.
Let's check $\mathbf{F}(\mathbf{x}_2)$:
$F_1(\mathbf{x}_2) = (1.06630)^2 + (1.70568)^2 - 4 \approx 1.1370 + 2.9093 - 4 = 0.0463$
$F_2(\mathbf{x}_2) = e^{1.06630} - 1.70568 - 1 \approx 2.9046 - 1.70568 - 1 = 0.19892$
The values are getting closer to zero. The true root is approximately $(1.066, 1.905)$. My calculation for $F_2(\mathbf{x}_2)$ seems off, let's recheck the calculation of $\Delta y_1$.
Using a calculator for the linear system:
$2.15154 \Delta x_1 + 3.84846 \Delta y_1 = -0.8610$
$2.9320 \Delta x_1 - \Delta y_1 = -0.00777$
From second eq: $\Delta y_1 = 2.9320 \Delta x_1 + 0.00777$.
Substitute into first: $2.15154 \Delta x_1 + 3.84846 (2.9320 \Delta x_1 + 0.00777) = -0.8610$
$2.15154 \Delta x_1 + 11.2891 \Delta x_1 + 0.0299 = -0.8610$
$13.44064 \Delta x_1 = -0.8909$
$\Delta x_1 \approx -0.06628$
$\Delta y_1 = 2.9320 (-0.06628) + 0.00777 = -0.19445 + 0.00777 = -0.18668$
So, $\Delta \mathbf{x}_1 \approx \begin{pmatrix} -0.06628 \\ -0.18668 \end{pmatrix}$.

Recalculate $\mathbf{x}_2$:
$$ \mathbf{x}_2 = \begin{pmatrix} 1.07577 \\ 1.92423 \end{pmatrix} + \begin{pmatrix} -0.06628 \\ -0.18668 \end{pmatrix} = \begin{pmatrix} 1.00949 \\ 1.73755 \end{pmatrix} $$
Let's check $\mathbf{F}(\mathbf{x}_2)$ with this new $\mathbf{x}_2$:
$F_1(\mathbf{x}_2) = (1.00949)^2 + (1.73755)^2 - 4 \approx 1.01907 + 3.01908 - 4 = 0.03815$
$F_2(\mathbf{x}_2) = e^{1.00949} - 1.73755 - 1 \approx 2.74418 - 1.73755 - 1 = 0.00663$
This looks much better!

**Final Answer for Example 1 (after 2 iterations):**
$$ \boxed{\mathbf{x}_2 \approx \begin{pmatrix} 1.00949 \\ 1.73755 \end{pmatrix}} $$
**Reflection:** The initial guess was somewhat far from the actual root, but the method made good progress. The calculations highlight the importance of careful arithmetic or using computational tools for solving the linear system at each step.

### Example 2: 2D System with Trigonometric Functions (Medium)

**Problem Statement:** Find the roots of the system:
$$ F_1(x, y) = \sin(x) + \cos(y) - 1 = 0 $$
$$ F_2(x, y) = x^2 - y^2 - 1 = 0 $$
Use an initial guess $\mathbf{x}_0 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$. Perform one iteration.

**What's Given:**
*   $\mathbf{F}(\mathbf{x}) = \begin{pmatrix} \sin(x) + \cos(y) - 1 \\ x^2 - y^2 - 1 \end{pmatrix}$
*   Initial guess $\mathbf{x}_0 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$

**What We Want:** $\mathbf{x}_1$.

**Step 1: Calculate the Jacobian Matrix $J(\mathbf{x})$**
$$ \frac{\partial F_1}{\partial x} = \cos(x) $$
$$ \frac{\partial F_1}{\partial y} = -\sin(y) $$
$$ \frac{\partial F_2}{\partial x} = 2x $$
$$ \frac{\partial F_2}{\partial y} = -2y $$
So, the Jacobian matrix is:
$$ J(\mathbf{x}) = \begin{pmatrix} \cos(x) & -\sin(y) \\ 2x & -2y \end{pmatrix} $$

---

**Iteration 1 (k=0):**

**Step 1.1: Evaluate $\mathbf{F}(\mathbf{x}_0)$ and $J(\mathbf{x}_0)$**
Given $\mathbf{x}_0 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$:
$$ \mathbf{F}(\mathbf{x}_0) = \begin{pmatrix} \sin(1) + \cos(0) - 1 \\ (1)^2 - (0)^2 - 1 \end{pmatrix} = \begin{pmatrix} \sin(1) + 1 - 1 \\ 1 - 0 - 1 \end{pmatrix} = \begin{pmatrix} \sin(1) \\ 0 \end{pmatrix} \approx \begin{pmatrix} 0.8415 \\ 0 \end{pmatrix} $$
*Explanation: Evaluate the functions at the initial guess.*

$$ J(\mathbf{x}_0) = \begin{pmatrix} \cos(1) & -\sin(0) \\ 2(1) & -2(0) \end{pmatrix} = \begin{pmatrix} \cos(1) & 0 \\ 2 & 0 \end{pmatrix} \approx \begin{pmatrix} 0.5403 & 0 \\ 2 & 0 \end{pmatrix} $$
*Explanation: Evaluate the Jacobian at the initial guess.*

**Step 1.2: Solve the linear system $J(\mathbf{x}_0) \Delta \mathbf{x}_0 = -\mathbf{F}(\mathbf{x}_0)$**
$$ \begin{pmatrix} \cos(1) & 0 \\ 2 & 0 \end{pmatrix} \begin{pmatrix} \Delta x_0 \\ \Delta y_0 \end{pmatrix} = - \begin{pmatrix} \sin(1) \\ 0 \end{pmatrix} = \begin{pmatrix} -\sin(1) \\ 0 \end{pmatrix} $$
From the first equation: $\cos(1) \Delta x_0 = -\sin(1) \implies \Delta x_0 = -\frac{\sin(1)}{\cos(1)} = -\tan(1) \approx -1.5574$.
From the second equation: $2 \Delta x_0 + 0 \Delta y_0 = 0 \implies 2 \Delta x_0 = 0 \implies \Delta x_0 = 0$.
*Explanation: We encountered a problem! The system gives contradictory values for $\Delta x_0$. This means the Jacobian matrix $J(\mathbf{x}_0)$ is singular.*
Determinant of $J(\mathbf{x}_0)$ is $(\cos(1))(0) - (0)(2) = 0$.
Since the determinant is 0, $J(\mathbf{x}_0)$ is singular, and the system $J(\mathbf{x}_0) \Delta \mathbf{x}_0 = -\mathbf{F}(\mathbf{x}_0)$ either has no unique solution or no solution at all. In this case, $\mathbf{F}(\mathbf{x}_0) = \begin{pmatrix} \sin(1) \\ 0 \end{pmatrix}$. The second equation of the linear system is $2\Delta x_0 = 0$, which means $\Delta x_0 = 0$. But the first equation is $\cos(1) \Delta x_0 = -\sin(1)$. If $\Delta x_0 = 0$, then $0 = -\sin(1)$, which is false since $\sin(1) \neq 0$. Therefore, **no solution exists for $\Delta \mathbf{x}_0$ at this point.**

**Final Answer for Example 2:**
Newton's method **fails** to proceed from $\mathbf{x}_0 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ because the Jacobian matrix $J(\mathbf{x}_0)$ is singular.
**Reflection:** This example demonstrates a critical "what could go wrong" scenario. A singular Jacobian means the linear approximation at that point is degenerate (e.g., in 2D, the tangent planes are parallel or one collapses), and it cannot provide a unique direction to the root. This highlights the importance of checking the Jacobian's invertibility. A different initial guess might lead to convergence.

### Example 3: 3D System (Harder)

**Problem Statement:** Find the roots of the system:
$$ F_1(x, y, z) = x^2 + y^2 + z^2 - 1 = 0 $$
$$ F_2(x, y, z) = x + y + z - 1 = 0 $$
$$ F_3(x, y, z) = xy + yz + zx - 0.2 = 0 $$
Use an initial guess $\mathbf{x}_0 = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$. Perform one iteration.

**What's Given:**
*   $\mathbf{F}(\mathbf{x}) = \begin{pmatrix} x^2 + y^2 + z^2 - 1 \\ x + y + z - 1 \\ xy + yz + zx - 0.2 \end{pmatrix}$
*   Initial guess $\mathbf{x}_0 = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$

**What We Want:** $\mathbf{x}_1$.

**Step 1: Calculate the Jacobian Matrix $J(\mathbf{x})$**
$$ J(\mathbf{x}) = \begin{pmatrix} \frac{\partial F_1}{\partial x} & \frac{\partial F_1}{\partial y} & \frac{\partial F_1}{\partial z} \\ \frac{\partial F_2}{\partial x} & \frac{\partial F_2}{\partial y} & \frac{\partial F_2}{\partial z} \\ \frac{\partial F_3}{\partial x} & \frac{\partial F_3}{\partial y} & \frac{\partial F_3}{\partial z} \end{pmatrix} $$
$$ \frac{\partial F_1}{\partial x} = 2x, \quad \frac{\partial F_1}{\partial y} = 2y, \quad \frac{\partial F_1}{\partial z} = 2z $$
$$ \frac{\partial F_2}{\partial x} = 1, \quad \frac{\partial F_2}{\partial y} = 1, \quad \frac{\partial F_2}{\partial z} = 1 $$
$$ \frac{\partial F_3}{\partial x} = y + z, \quad \frac{\partial F_3}{\partial y} = x + z, \quad \frac{\partial F_3}{\partial z} = x + y $$
So, the Jacobian matrix is:
$$ J(\mathbf{x}) = \begin{pmatrix} 2x & 2y & 2z \\ 1 & 1 & 1 \\ y+z & x+z & x+y \end{pmatrix} $$

---

**Iteration 1 (k=0):**

**Step 1.1: Evaluate $\mathbf{F}(\mathbf{x}_0)$ and $J(\mathbf{x}_0)$**
Given $\mathbf{x}_0 = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$:
$$ F_1(\mathbf{x}_0) = (1)^2 + (0)^2 + (0)^2 - 1 = 1 - 1 = 0 $$
$$ F_2(\mathbf{x}_0) = 1 + 0 + 0 - 1 = 0 $$
$$ F_3(\mathbf{x}_0) = (1)(0) + (0)(0) + (0)(1) - 0.2 = -0.2 $$
$$ \mathbf{F}(\mathbf{x}_0) = \begin{pmatrix} 0 \\ 0 \\ -0.2 \end{pmatrix} $$
*Explanation: Our initial guess already satisfies the first two equations, but not the third.*

$$ J(\mathbf{x}_0) = \begin{pmatrix} 2(1) & 2(0) & 2(0) \\ 1 & 1 & 1 \\ 0+0 & 1+0 & 1+0 \end{pmatrix} = \begin{pmatrix} 2 & 0 & 0 \\ 1 & 1 & 1 \\ 0 & 1 & 1 \end{pmatrix} $$
*Explanation: Evaluate the Jacobian at the initial guess.*

**Step 1.2: Solve the linear system $J(\mathbf{x}_0) \Delta \mathbf{x}_0 = -\mathbf{F}(\mathbf{x}_0)$**
Let $\Delta \mathbf{x}_0 = \begin{pmatrix} \Delta x_0 \\ \Delta y_0 \\ \Delta z_0 \end{pmatrix}$. The system is:
$$ \begin{pmatrix} 2 & 0 & 0 \\ 1 & 1 & 1 \\ 0 & 1 & 1 \end{pmatrix} \begin{pmatrix} \Delta x_0 \\ \Delta y_0 \\ \Delta z_0 \end{pmatrix} = - \begin{pmatrix} 0 \\ 0 \\ -0.2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0.2 \end{pmatrix} $$
From the first equation: $2 \Delta x_0 = 0 \implies \Delta x_0 = 0$.
From the second equation: $\Delta x_0 + \Delta y_0 + \Delta z_0 = 0$. Since $\Delta x_0 = 0$, we have $\Delta y_0 + \Delta z_0 = 0$.
From the third equation: $\Delta y_0 + \Delta z_0 = 0.2$.
*Explanation: We again have a problem! The second and third equations are contradictory: $\Delta y_0 + \Delta z_0$ cannot be both $0$ and $0.2$ simultaneously.*
Let's check the determinant of $J(\mathbf{x}_0)$:
$\det(J(\mathbf{x}_0)) = 2 \cdot \det \begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix} - 0 \cdot \dots + 0 \cdot \dots = 2 \cdot (1 \cdot 1 - 1 \cdot 1) = 2 \cdot (0) = 0$.
Since the determinant is 0, $J(\mathbf{x}_0)$ is singular. **No solution exists for $\Delta \mathbf{x}_0$ at this point.**

**Final Answer for Example 3:**
Newton's method **fails** to proceed from $\mathbf{x}_0 = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$ because the Jacobian matrix $J(\mathbf{x}_0)$ is singular.
**Reflection:** This example further emphasizes the issue of a singular Jacobian. Even if some equations are satisfied by the initial guess, if the local linear approximation is degenerate, Newton's method cannot find a unique direction for improvement. This system has multiple solutions, for example, $(1, 0, 0)$ and permutations are roots for $F_1$ and $F_2$, but not $F_3$. A better initial guess, like $(0.5, 0.5, 0.5)$, might lead to convergence.

### Example 4: 2D System - Successful Convergence (More involved)

**Problem Statement:** Find the roots of the system:
$$ F_1(x, y) = x^2 + xy - 10 = 0 $$
$$ F_2(x, y) = y + 3xy^2 - 57 = 0 $$
Use an initial guess $\mathbf{x}_0 = \begin{pmatrix} 1.5 \\ 3.5 \end{pmatrix}$. Perform two iterations.

**What's Given:**
*   $\mathbf{F}(\mathbf{x}) = \begin{pmatrix} x^2 + xy - 10 \\ y + 3xy^2 - 57 \end{pmatrix}$
*   Initial guess $\mathbf{x}_0 = \begin{pmatrix} 1.5 \\ 3.5 \end{pmatrix}$

**What We Want:** $\mathbf{x}_1$ and $\mathbf{x}_2$.

**Step 1: Calculate the Jacobian Matrix $J(\mathbf{x})$**
$$ \frac{\partial F_1}{\partial x} = 2x + y $$
$$ \frac{\partial F_1}{\partial y} = x $$
$$ \frac{\partial F_2}{\partial x} = 3y^2 $$
$$ \frac{\partial F_2}{\partial y} = 1 + 6xy $$
So, the Jacobian matrix is:
$$ J(\mathbf{x}) = \begin{pmatrix} 2x+y & x \\ 3y^2 & 1+6xy \end{pmatrix} $$

---

**Iteration 1 (k=0):**

**Step 1.1: Evaluate $\mathbf{F}(\mathbf{x}_0)$ and $J(\mathbf{x}_0)$**
Given $\mathbf{x}_0 = \begin{pmatrix} 1.5 \\ 3.5 \end{pmatrix}$:
$$ F_1(\mathbf{x}_0) = (1.5)^2 + (1.5)(3.5) - 10 = 2.25 + 5.25 - 10 = -2.5 $$
$$ F_2(\mathbf{x}_0) = 3.5 + 3(1.5)(3.5)^2 - 57 = 3.5 + 3(1.5)(12.25) - 57 = 3.5 + 55.125 - 57 = 1.625 $$
$$ \mathbf{F}(\mathbf{x}_0) = \begin{pmatrix} -2.5 \\ 1.625 \end{pmatrix} $$

$$ J(\mathbf{x}_0) = \begin{pmatrix} 2(1.5)+3.5 & 1.5 \\ 3(3.5)^2 & 1+6(1.5)(3.5) \end{pmatrix} = \begin{pmatrix} 3+3.5 & 1.5 \\ 3(12.25) & 1+6(5.25) \end{pmatrix} = \begin{pmatrix} 6.5 & 1.5 \\ 36.75 & 1+31.5 \end{pmatrix} = \begin{pmatrix} 6.5 & 1.5 \\ 36.75 & 32.5 \end{pmatrix} $$

**Step 1.2: Solve the linear system $J(\mathbf{x}_0) \Delta \mathbf{x}_0 = -\mathbf{F}(\mathbf{x}_0)$**
$$ \begin{pmatrix} 6.5 & 1.5 \\ 36.75 & 32.5 \end{pmatrix} \begin{pmatrix} \Delta x_0 \\ \Delta y_0 \end{pmatrix} = - \begin{pmatrix} -2.5 \\ 1.625 \end{pmatrix} = \begin{pmatrix} 2.5 \\ -1.625 \end{pmatrix} $$
Using a linear system solver (e.g., matrix inversion):
$\det(J(\mathbf{x}_0)) = (6.5)(32.5) - (1.5)(36.75) = 211.25 - 55.125 = 156.125$. (Non-singular, good!)
$J(\mathbf{x}_0)^{-1} = \frac{1}{156.125} \begin{pmatrix} 32.5 & -1.5 \\ -36.75 & 6.5 \end{pmatrix}$
$$ \Delta \mathbf{x}_0 = J(\mathbf{x}_0)^{-1} \begin{pmatrix} 2.5 \\ -1.625 \end{pmatrix} = \frac{1}{156.125} \begin{pmatrix} 32.5 & -1.5 \\ -36.75 & 6.5 \end{pmatrix} \begin{pmatrix} 2.5 \\ -1.625 \end{pmatrix} $$
$$ \Delta \mathbf{x}_0 = \frac{1}{156.125} \begin{pmatrix} (32.5)(2.5) + (-1.5)(-1.625) \\ (-36.75)(2.5) + (6.5)(-1.625) \end{pmatrix} = \frac{1}{156.125} \begin{pmatrix} 81.25 + 2.4375 \\ -91.875 - 10.5625 \end{pmatrix} $$
$$ \Delta \mathbf{x}_0 = \frac{1}{156.125} \begin{pmatrix} 83.6875 \\ -102.4375 \end{pmatrix} \approx \begin{pmatrix} 0.5360 \\ -0.6561 \end{pmatrix} $$

**Step 1.3: Calculate the next guess $\mathbf{x}_1 = \mathbf{x}_0 + \Delta \mathbf{x}_0$}
$$ \mathbf{x}_1 = \begin{pmatrix} 1.5 \\ 3.5 \end{pmatrix} + \begin{pmatrix} 0.5360 \\ -0.6561 \end{pmatrix} = \begin{pmatrix} 2.0360 \\ 2.8439 \end{pmatrix} $$

---

**Iteration 2 (k=1):**

**Step 2.1: Evaluate $\mathbf{F}(\mathbf{x}_1)$ and $J(\mathbf{x}_1)$**
Using $\mathbf{x}_1 = \begin{pmatrix} 2.0360 \\ 2.8439 \end{pmatrix}$:
$$ F_1(\mathbf{x}_1) = (2.0360)^2 + (2.0360)(2.8439) - 10 \approx 4.1452 + 5.7909 - 10 = -0.0639 $$
$$ F_2(\mathbf{x}_1) = 2.8439 + 3(2.0360)(2.8439)^2 - 57 \approx 2.8439 + 3(2.0360)(8.0877) - 57 = 2.8439 + 49.3361 - 57 = -4.8199 $$
$$ \mathbf{F}(\mathbf{x}_1) \approx \begin{pmatrix} -0.0639 \\ -4.8199 \end{pmatrix} $$

$$ J(\mathbf{x}_1) = \begin{pmatrix} 2(2.0360)+2.8439 & 2.0360 \\ 3(2.8439)^2 & 1+6(2.0360)(2.8439) \end{pmatrix} = \begin{pmatrix} 4.0720+2.8439 & 2.0360 \\ 3(8.0877) & 1+6(5.7909) \end{pmatrix} $$
$$ J(\mathbf{x}_1) = \begin{pmatrix} 6.9159 & 2.0360 \\ 24.2631 & 1+34.7454 \end{pmatrix} = \begin{pmatrix} 6.9159 & 2.0360 \\ 24.2631 & 35.7454 \end{pmatrix} $$

**Step 2.2: Solve the linear system $J(\mathbf{x}_1) \Delta \mathbf{x}_1 = -\mathbf{F}(\mathbf{x}_1)$**
$$ \begin{pmatrix} 6.9159 & 2.0360 \\ 24.2631 & 35.7454 \end{pmatrix} \begin{pmatrix} \Delta x_1 \\ \Delta y_1 \end{pmatrix} = - \begin{pmatrix} -0.0639 \\ -4.8199 \end{pmatrix} = \begin{pmatrix} 0.0639 \\ 4.8199 \end{pmatrix} $$
Using a linear system solver:
$\Delta x_1 \approx -0.0384$
$\Delta y_1 \approx 0.1627$
So, $\Delta \mathbf{x}_1 \approx \begin{pmatrix} -0.0384 \\ 0.1627 \end{pmatrix}$.

**Step 2.3: Calculate the next guess $\mathbf{x}_2 = \mathbf{x}_1 + \Delta \mathbf{x}_1$}
$$ \mathbf{x}_2 = \begin{pmatrix} 2.0360 \\ 2.8439 \end{pmatrix} + \begin{pmatrix} -0.0384 \\ 0.1627 \end{pmatrix} = \begin{pmatrix} 1.9976 \\ 3.0066 \end{pmatrix} $$

Let's check $\mathbf{F}(\mathbf{x}_2)$ with this new $\mathbf{x}_2$:
$F_1(\mathbf{x}_2) = (1.9976)^2 + (1.9976)(3.0066) - 10 \approx 3.9904 + 6.0041 - 10 = -0.0055$
$F_2(\mathbf{x}_2) = 3.0066 + 3(1.9976)(3.0066)^2 - 57 \approx 3.0066 + 3(1.9976)(9.0396) - 57 = 3.0066 + 54.1206 - 57 = 0.1272$
The values are much closer to zero. The true root is $(2, 3)$.

**Final Answer for Example 4 (after 2 iterations):**
$$ \boxed{\mathbf{x}_2 \approx \begin{pmatrix} 1.9976 \\ 3.0066 \end{pmatrix}} $$
**Reflection:** This example shows successful convergence. The function values are approaching zero, and the iterates are approaching the known root $(2,3)$. The arithmetic is tedious by hand, emphasizing the need for computational tools for practical applications.

## 6. Common mistakes and traps

1.  **Incorrect Jacobian Calculation:** This is perhaps the most frequent and debilitating error. A single mistake in a partial derivative will lead to an incorrect Jacobian, causing the method to diverge or converge to the wrong solution. Double-check every partial derivative.
2.  **Mistaking $J(\mathbf{x}_k)^{-1}$ for matrix division:** While the formula $\mathbf{x}_{k+1} = \mathbf{x}_k - J(\mathbf{x}_k)^{-1} \mathbf{F}(\mathbf{x}_k)$ uses an inverse, in practice, you *solve the linear system* $J(\mathbf{x}_k) \Delta \mathbf{x}_k = -\mathbf{F}(\mathbf{x}_k)$ for $\Delta \mathbf{x}_k$, then update $\mathbf{x}_{k+1} = \mathbf{x}_k + \Delta \mathbf{x}_k$. Explicitly calculating the inverse is computationally inefficient and numerically unstable for large systems.
3.  **Poor Initial Guess:** Newton's method is a local method. If the initial guess $\mathbf{x}_0$ is too far from a root, the linear approximation might be inaccurate, leading to divergence, oscillation, or convergence to a different,