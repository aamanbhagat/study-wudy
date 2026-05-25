## What it is
A convex set is a collection of points where the straight line segment connecting any two points in the set is entirely contained within the set. A convex function is a function whose graph has a "bowl" shape, meaning the line segment connecting any two points on the graph lies on or above the graph itself.

## Why it matters
Convexity is the property that makes optimization problems computationally tractable. For a convex optimization problem, any locally optimal solution is also a globally optimal solution, which eliminates the immense difficulty of getting stuck in suboptimal solutions. This is fundamental to machine learning (e.g., training Support Vector Machines, logistic regression), control theory (e.g., finding the optimal fuel burn for a trajectory correction maneuver), and signal processing.

## When to study it
You must have a firm grasp of the following prerequisites. If you are not fluent in these, pause and review them first.
1.  **Linear Algebra:** Vector spaces, linear combinations, dot products, matrix operations, eigenvalues, and positive semi-definite matrices.
2.  **Multivariable Calculus:** Gradients and Hessian matrices.
3.  **Set Theory:** Basic notation for sets ($x \in C$), unions, and intersections.

## How to study it (step by step)
1.  **Draw it.** On paper, draw a filled-in circle, a square, and a triangle. In each, pick two random points and draw a line between them. Now draw a star shape or a crescent moon. Find two points where the line segment connecting them leaves the set. This is the visual core of a convex set.
2.  **Formalize it.** Write down the definition of a convex combination: $z = \theta x + (1-\theta)y$ for $\theta \in [0,1]$. Understand that this is a parameterization of the line segment between points $x$ and $y$. A set $C$ is convex if for any $x, y \in C$, every possible convex combination $z$ is also in $C$.
3.  **Connect to functions.** Draw the graph of $f(x) = x^2$. Pick two points on the graph, $(x_1, f(x_1))$ and $(x_2, f(x_2))$. Draw the line segment (the "chord") connecting them. Observe that the chord is always above the function's graph between those two points. Do the same for $f(x)=x^3$ and see how this property fails.
4.  **Formalize the function definition.** Write down Jensen's inequality: $f(\theta x + (1-\theta)y) \le \theta f(x) + (1-\theta)f(y)$ for $\theta \in [0,1]$. The left side is the function evaluated on the line segment in the domain. The right side is the corresponding point on the chord connecting the points on the graph. This inequality is the algebraic statement of "the function is below the chord."
5.  **Learn the calculus test.** For a twice-differentiable function of one variable, $f(x)$ is convex if and only if $f''(x) \ge 0$ for all $x$ in its domain. For a multivariable function $f(\mathbf{x})$, it is convex if and only if its Hessian matrix $\nabla^2 f(\mathbf{x})$ is positive semi-definite for all $\mathbf{x}$. This is the most common practical test.

## Key ideas, with intuition
1.  **The Line Segment is King.** The entire concept of convexity is a rigorous generalization of "does the line segment between two points stay where it's supposed to?" For a set, it stays inside the set. For a function, the chord (a line segment in the function's output space) stays above the function's graph.

2.  **Convex Combination as a Weighted Average.** The expression $\theta x + (1-\theta)y$ for $\theta \in [0,1]$ is a weighted average of the points $x$ and $y$. When $\theta=1$, you get $x$. When $\theta=0$, you get $y$. When $\theta=0.5$, you get the midpoint. All values of $\theta$ between 0 and 1 trace out the line segment.
    $$ \text{Convex Set } C: \quad \forall x,y \in C, \theta \in [0,1] \implies \theta x + (1-\theta)y \in C $$

3.  **Jensen's Inequality: Function vs. Chord.** This is the formal definition of a convex function. It compares the function's value at an intermediate point to the value of the straight line between the endpoints.
    $$ f(\underbrace{\theta x + (1-\theta)y}_{\text{point in domain}}) \le \underbrace{\theta f(x) + (1-\theta)f(y)}_{\text{point on chord}} $$
    The function's curve "bows down" below the straight-line chord.

4.  **The Hessian Encodes Curvature.** For multivariable functions, the gradient $\nabla f$ points uphill. The Hessian matrix $\nabla^2 f$ tells you how the gradient is changing—it describes the function's local curvature. The condition that the Hessian is positive semi-definite ($\mathbf{v}^T (\nabla^2 f) \mathbf{v} \ge 0$ for all vectors $\mathbf{v}$) is the multivariable analogue of $f''(x) \ge 0$. It means the function is curving upwards (or is flat) in every direction.

## Worked example
**Problem:** Prove that the function $f(x) = ax^2 + bx + c$ for $a \ge 0$ is a convex function using both the definition (Jensen's inequality) and the second-derivative test.

**Method 1: Second-Derivative Test**
This is the direct approach for differentiable functions.
1.  Calculate the first derivative: $f'(x) = 2ax + b$.
2.  Calculate the second derivative: $f''(x) = 2a$.
3.  Check the condition: For $f$ to be convex, we need $f''(x) \ge 0$ for all $x$. Since $f''(x) = 2a$, this condition is met if and only if $a \ge 0$.
*Reflection:* This test is computationally efficient. It directly checks the curvature of the function.

**Method 2: Jensen's Inequality (First Principles)**
This is more fundamental and does not require differentiability. We must show $f(\theta x + (1-\theta)y) \le \theta f(x) + (1-\theta)f(y)$ for $\theta \in [0,1]$.
1.  **Evaluate the left-hand side (LHS):**
    $f(\theta x + (1-\theta)y) = a(\theta x + (1-\theta)y)^2 + b(\theta x + (1-\theta)y) + c$
    $= a(\theta^2 x^2 + 2\theta(1-\theta)xy + (1-\theta)^2 y^2) + b\theta x + b(1-\theta)y + c$
2.  **Evaluate the right-hand side (RHS):**
    $\theta f(x) + (1-\theta)f(y) = \theta(ax^2+bx+c) + (1-\theta)(ay^2+by+c)$
    $= a\theta x^2 + b\theta x + c\theta + a(1-\theta)y^2 + b(1-\theta)y + c(1-\theta)$
    $= a(\theta x^2 + (1-\theta)y^2) + b(\theta x + (1-\theta)y) + c(\theta + 1 - \theta)$
    $= a(\theta x^2 + y^2 - \theta y^2) + b(\theta x + (1-\theta)y) + c$
3.  **Show LHS $\le$ RHS.** We need to show:
    $a(\theta^2 x^2 + 2\theta(1-\theta)xy + (1-\theta)^2 y^2) \le a(\theta x^2 + (1-\theta)y^2)$
    The terms with $b$ and $c$ are identical and cancel out. Since $a \ge 0$, we can divide by $a$ (if $a>0$) without changing the inequality.
    $\theta^2 x^2 + 2\theta(1-\theta)xy + (1-\theta)^2 y^2 \le \theta x^2 + (1-\theta)y^2$
    Move all terms to the RHS:
    $0 \le (\theta x^2 - \theta^2 x^2) - 2\theta(1-\theta)xy + ((1-\theta)y^2 - (1-\theta)^2 y^2)$
    $0 \le \theta(1-\theta)x^2 - 2\theta(1-\theta)xy + (1-\theta)(1-(1-\theta))y^2$
    $0 \le \theta(1-\theta)x^2 - 2\theta(1-\theta)xy + \theta(1-\theta)y^2$
    Since $\theta \in [0,1]$, $\theta(1-\theta) \ge 0$. We can factor it out:
    $0 \le \theta(1-\theta) (x^2 - 2xy + y^2)$
    $0 \le \theta(1-\theta) (x-y)^2$
4.  **Conclusion:** The term $(x-y)^2$ is always $\ge 0$. The term $\theta(1-\theta)$ is $\ge 0$ for $\theta \in [0,1]$. The product of non-negative numbers is non-negative, so the inequality holds.
*Reflection:* This derivation from first principles is more algebraic work, but it reveals the core structure. The inequality holds because the quadratic form $(x-y)^2$ is always non-negative.

## Diagrams
A convex set vs. a non-convex set:
```text
      CONVEX SET (e.g., ellipse)            NON-CONVEX SET (e.g., star)

        *************                           *
       *             *                         / \
      *       x<----->y *                       /   \
     *        .       .  *                     *--x  *
     *         .     .   *                      \ . /
      *         .   .   *                       \./
       *           .   *                         * .
        *************                           / . \
                                               /   . \
                                              *----y--*
Line segment x-y is entirely inside.       Line segment x-y leaves the set.
```

A convex function:
```text
f(x)
 ^
 |
 |       o  <-- (y, f(y))
 |      / .
 |     /   . <-- Chord is ON or ABOVE the graph
 |    /     .
 |   o-------x---------------------> x
 |  /  .   (theta*x + (1-theta)*y, f(...) )
 | / .
 |o <-- (x, f(x))
 |
 +------------------------------------>
```

## Memory technique — remember this forever
1.  **Visual Hook:** "A convex function is a bowl that holds water." The graph of the function is the bowl. The "water level" is the straight line segment between any two points. For a convex function, the bowl is always beneath the water level. A convex set is a "blob" that contains any straight path between two points within it; there are no "inward dents" or "holes."

2.  **Must-know formulas:** Overlearn these until they are automatic.
    *   **Convex Set C:** $\forall x, y \in C, \forall \theta \in [0,1] \implies \theta x + (1-\theta)y \in C$
    *   **Convex Function f:** $\forall x, y \in \text{dom}(f), \forall \theta \in [0,1] \implies f(\theta x + (1-\theta)y) \le \theta f(x) + (1-\theta)f(y)$
    *   **Second-Order Condition:** $\nabla^2 f(x) \succeq 0$ (The Hessian is positive semi-definite).

3.  **Spaced Repetition Schedule:** Review these definitions and the worked example at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, remember the picture of the line segment. The algebraic expression $\theta x + (1-\theta)y$ for $\theta \in [0,1]$ is just how you write "the line segment between x and y" in the language of vectors. From that single geometric idea, you can re-derive both the definition for sets and for functions (Jensen's inequality).

## Common mistakes
1.  **Confusing Convex and Concave:** A function $f$ is concave if $-f$ is convex. Geometrically, it's an "upside-down bowl." The inequality in Jensen's definition is flipped: $f(\dots) \ge \dots$.
2.  **The Crescent Moon Mistake:** A crescent shape looks "curved," but it is not a convex set. You can easily pick two points (e.g., at the tips of the crescent) whose connecting line segment goes outside the set. You must apply the line segment test rigorously.
3.  **Forgetting $\theta \in [0,1]$:** The definitions hinge on this constraint. If you allow $\theta$ to be any real number, you are describing the entire line passing through $x$ and $y$, not just the segment between them.
4.  **Local vs. Global Hessian:** The condition $\nabla^2 f(x) \succeq 0$ must hold for *all* $x$ in the domain of the function for $f$ to be convex. If it only holds at a single point, that tells you about the local curvature there, but not about global convexity.

## Self-check
1.  Is the set of points $(x,y)$ in $\mathbb{R}^2$ defined by the inequality $x^2 + 4y^2 \le 1$ (a filled ellipse) a convex set? Justify your answer using the line segment test idea, either geometrically or algebraically.
2.  Prove that if $C_1$ and $C_2$ are both convex sets, then their intersection $C_1 \cap C_2$ is also a convex set.
3.  Consider the function $f(x, y) = x^2 + 2xy + y^2$. Is this function convex, concave, or neither? Justify your answer using the Hessian matrix. Now consider $g(x,y) = x^2 - y^2$. What about it?