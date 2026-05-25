## What it is
The directional derivative of a multivariable function $f$ at a point $P$ is the instantaneous rate of change of the function at that point, as measured along a specific direction vector $\hat{\mathbf{u}}$. It generalizes the concept of partial derivatives, which are simply directional derivatives along the coordinate axes. In essence, it answers the question: "If I'm standing at point $P$ on a surface, how steep is it in this exact direction?"

## Why it matters
This concept is fundamental to optimization and physics. In machine learning, the gradient descent algorithm works by repeatedly calculating the gradient (the direction of *steepest* ascent) and moving in the opposite direction to minimize a cost function. In aerospace and physics, it's used to find the rate of change of a field (like temperature or pressure) as a probe or vehicle moves through it, or to determine the path of steepest ascent/descent on a topographical map.

## When to study it
You must be proficient with the following before proceeding:
1.  **Single-variable calculus:** The limit definition of a derivative, $\lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$.
2.  **Partial derivatives:** How to compute $\frac{\partial f}{\partial x}$ and $\frac{\partial f}{\partial y}$ for a function $f(x,y)$.
3.  **Vector algebra:** Specifically, vector addition, scalar multiplication, the dot product, and how to find the magnitude of a vector to create a unit vector.
4.  **The Gradient:** You must know that the gradient of $f(x,y)$ is the vector $\nabla f = \left\langle \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y} \right\rangle$.

If any of these are weak, review them first. The computational formula for the directional derivative depends directly on the gradient and the dot product.

## How to study it (step by step)
1.  **Revisit the first principles of derivatives.** Write down the limit definition of the derivative for a single-variable function $f(x)$. See that it measures the rate of change by taking a small step $h$ in the positive x-direction.
2.  **Connect to partial derivatives.** Recognize that the partial derivative $\frac{\partial f}{\partial x}$ is just the directional derivative in the direction of the unit vector $\hat{\mathbf{i}} = \langle 1, 0 \rangle$. Write out its limit definition: $\frac{\partial f}{\partial x} = \lim_{h \to 0} \frac{f(x+h, y) - f(x,y)}{h}$. See that this is a step of size $h$ purely in the x-direction.
3.  **Generalize to an arbitrary direction.** Now, instead of stepping along an axis, take a small step of size $h$ in the direction of an arbitrary *unit* vector $\hat{\mathbf{u}} = \langle u_x, u_y \rangle$. The starting point is $P=(x_0, y_0)$ and the new point is $P+h\hat{\mathbf{u}} = (x_0+hu_x, y_0+hu_y)$. Formulate the general limit definition of the directional derivative, $D_{\hat{\mathbf{u}}}f(P)$.
4.  **Derive the computational formula.** The limit definition is cumbersome. We derive a better way. Define a line through $P$ in the direction $\hat{\mathbf{u}}$ as $\mathbf{r}(t) = P + t\hat{\mathbf{u}}$. The value of the function along this line is a single-variable function $g(t) = f(\mathbf{r}(t))$. The directional derivative is simply $g'(0)$. Use the multivariable chain rule to find $g'(t)$, which is $\nabla f(\mathbf{r}(t)) \cdot \mathbf{r}'(t)$. Evaluate this at $t=0$ to arrive at the formula $D_{\hat{\mathbf{u}}}f(P) = \nabla f(P) \cdot \hat{\mathbf{u}}$.
5.  **Solve computational problems.** Use the formula $\nabla f \cdot \hat{\mathbf{u}}$ on 3-4 practice problems. Start with a polynomial function, then try one with exponentials or trig functions. Crucially, in at least one problem, start with a direction vector $\mathbf{v}$ that is *not* a unit vector and practice normalizing it to $\hat{\mathbf{u}} = \frac{\mathbf{v}}{\|\mathbf{v}\|}$ before proceeding.

## Key ideas, with intuition
1.  **Partial derivatives are just shadows.** The partial derivatives $\frac{\partial f}{\partial x}$ and $\frac{\partial f}{\partial y}$ are special cases of the directional derivative in the directions $\hat{\mathbf{i}}$ and $\hat{\mathbf{j}}$. The directional derivative unifies these into a single concept that works for any direction.

2.  **The gradient points to the peak.** The gradient vector $\nabla f$ points in the direction of the *steepest* possible ascent from a point. Its magnitude, $\|\nabla f\|$, is the value of that steepest possible slope. Every other directional derivative at that point will have a smaller magnitude (or be negative if it's a direction of descent).

3.  **The dot product projects the steepness.** The formula $D_{\hat{\mathbf{u}}}f = \nabla f \cdot \hat{\mathbf{u}}$ has a deep geometric meaning. Recall that $\mathbf{a} \cdot \mathbf{b} = \|\mathbf{a}\| \|\mathbf{b}\| \cos\theta$. Since $\hat{\mathbf{u}}$ is a unit vector, $\|\hat{\mathbf{u}}\|=1$, so:
    $$ D_{\hat{\mathbf{u}}}f = \|\nabla f\| \cos\theta $$
    This says the directional derivative is the *projection* of the gradient vector (the direction of maximum steepness) onto your chosen direction $\hat{\mathbf{u}}$. If you choose to go in the same direction as the gradient ($\theta=0$), $\cos\theta=1$ and you get the maximum slope, $\|\nabla f\|$. If you choose to walk at a right angle to the gradient ($\theta = \pi/2$), $\cos\theta=0$ and the slope is zero—you are walking along a contour line (level curve) of the function.

## Worked example
Find the directional derivative of the function $f(x,y) = x^2 \sin(2y)$ at the point $P(1, \pi/2)$ in the direction of the vector $\mathbf{v} = \langle 3, -4 \rangle$.

**Step 1: Compute the gradient vector, $\nabla f$.**
The partial derivatives are:
$$ \frac{\partial f}{\partial x} = 2x \sin(2y) $$
$$ \frac{\partial f}{\partial y} = x^2 \cos(2y) \cdot 2 = 2x^2 \cos(2y) $$
So, the gradient vector is $\nabla f(x,y) = \langle 2x \sin(2y), 2x^2 \cos(2y) \rangle$.

**Step 2: Evaluate the gradient at the point $P(1, \pi/2)$.**
Substitute $x=1$ and $y=\pi/2$ into the gradient vector:
$$ \nabla f(1, \pi/2) = \langle 2(1) \sin(2 \cdot \pi/2), 2(1)^2 \cos(2 \cdot \pi/2) \rangle $$
$$ \nabla f(1, \pi/2) = \langle 2 \sin(\pi), 2 \cos(\pi) \rangle = \langle 2(0), 2(-1) \rangle = \langle 0, -2 \rangle $$

**Step 3: Normalize the direction vector $\mathbf{v}$ to get the unit vector $\hat{\mathbf{u}}$.**
The given direction vector is $\mathbf{v} = \langle 3, -4 \rangle$. Its magnitude is:
$$ \|\mathbf{v}\| = \sqrt{3^2 + (-4)^2} = \sqrt{9 + 16} = \sqrt{25} = 5 $$
The unit vector is $\hat{\mathbf{u}} = \frac{\mathbf{v}}{\|\mathbf{v}\|} = \frac{\langle 3, -4 \rangle}{5} = \langle \frac{3}{5}, -\frac{4}{5} \rangle$.

**Step 4: Compute the dot product $\nabla f(P) \cdot \hat{\mathbf{u}}$.**
$$ D_{\hat{\mathbf{u}}}f(1, \pi/2) = \nabla f(1, \pi/2) \cdot \hat{\mathbf{u}} $$
$$ = \langle 0, -2 \rangle \cdot \langle \frac{3}{5}, -\frac{4}{5} \rangle $$
$$ = (0)\left(\frac{3}{5}\right) + (-2)\left(-\frac{4}{5}\right) = 0 + \frac{8}{5} = \frac{8}{5} $$

**Reflection:** Each step was necessary. Step 1 found the general formula for the direction of steepest ascent everywhere. Step 2 localized that to our specific point. Step 3 is critical; the directional derivative is defined with respect to a *unit* direction, so we scaled our given vector. Step 4 projected the gradient at the point onto our desired direction to find the slope in that specific direction. The result, $8/5$, is the rate of change of $f$ at $(1, \pi/2)$ as we move towards $\langle 3, -4 \rangle$.

## Diagrams
This diagram illustrates the relationship between the gradient $\nabla f$ and the unit direction vector $\hat{\mathbf{u}}$ at a point $P$. The directional derivative is the projection of $\nabla f$ onto $\hat{\mathbf{u}}$.

```text
       y
       ^
       |
       |         /
       |        /
       |       / | |nabla f| cos(theta)
       |      /  v
       |     /------------> nabla f (steepest ascent)
       |    /    .
       |   /     .
       |  /theta .
       | /) .....
       +P----------> u_hat (your direction)
       |
       +-------------------> x
```

## Memory technique — remember this forever
1.  **Mnemonic Story:** You are a hiker on a mountain represented by the surface $z=f(x,y)$. The **gradient ($\nabla f$)** is a magical compass on the ground that always points in the direction of the steepest way up the mountain from where you are standing. You want to walk in a different direction, given by your own compass, **$\hat{\mathbf{u}}$**. The **directional derivative ($D_{\hat{\mathbf{u}}}f$)** is the slope you will actually experience. To find it, you take the "steepest possible slope" vector ($\nabla f$) and find its shadow (dot product) in the direction you want to walk ($\hat{\mathbf{u}}$).

2.  **Formulas to Overlearn:**
    *   Computational Formula: $D_{\hat{\mathbf{u}}}f = \nabla f \cdot \hat{\mathbf{u}}$
    *   Gradient Definition: $\nabla f = \left\langle \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}, \dots \right\rangle$
    *   Unit Vector: $\hat{\mathbf{u}} = \frac{\mathbf{v}}{\|\mathbf{v}\|}$

3.  **Spaced Repetition Schedule:** Review this topic from scratch (re-deriving the main formula and doing one problem) at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.**

4.  **First Principles Pathway:** If you forget the formula, rebuild it.
    *   The directional derivative is the rate of change along a line.
    *   Parameterize the line: $\mathbf{r}(t) = \text{point} + t \cdot \text{direction} = P + t\hat{\mathbf{u}}$.
    *   Create a single-variable function for the value of $f$ along this line: $g(t) = f(\mathbf{r}(t))$.
    *   The rate of change at the point $P$ (which is at $t=0$) is just $g'(0)$.
    *   Use the multivariable chain rule: $g'(t) = \nabla f(\mathbf{r}(t)) \cdot \mathbf{r}'(t)$.
    *   Since $\mathbf{r}'(t) = \hat{\mathbf{u}}$, we have $g'(t) = \nabla f(P+t\hat{\mathbf{u}}) \cdot \hat{\mathbf{u}}$.
    *   Evaluate at $t=0$: $g'(0) = \nabla f(P) \cdot \hat{\mathbf{u}}$. The formula is recovered.

## Common mistakes
1.  **Forgetting to use a unit vector.** The most common error is to compute $\nabla f \cdot \mathbf{v}$ instead of $\nabla f \cdot \hat{\mathbf{u}}$. The magnitude of the direction vector scales the result incorrectly. Always normalize.
2.  **Confusing the gradient and the directional derivative.** The gradient $\nabla f$ is a *vector* that points in a direction. The directional derivative $D_{\hat{\mathbf{u}}}f$ is a *scalar* (a number) that represents a rate of change/slope.
3.  **Mixing up the vector $\mathbf{v}$ and the point $P$.** Students sometimes try to take a dot product with the position vector of the point. Remember: the dot product is between the *gradient vector* and the *direction vector*. The point $P$ is where you *evaluate* the gradient.

## Self-check
1.  Find the directional derivative of $f(x,y) = 3x^2 - 2y^3$ at the point $(-1, 2)$ in the direction of the vector $\mathbf{v} = \langle 1, 1 \rangle$.
2.  For the function $f(x,y,z) = z \ln(x^2+y^2)$ at the point $P(1,0,3)$:
    a. In which direction is the function increasing most rapidly?
    b. What is the rate of change in that direction?
3.  Find a unit vector $\hat{\mathbf{u}}$ that is orthogonal to the gradient of $f(x,y) = \cos(x)e^y$ at the point $P(\pi/2, 0)$. What is the value of $D_{\hat{\mathbf{u}}}f(P)$? What does this mean geometrically?