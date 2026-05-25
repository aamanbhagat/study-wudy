## What it is
A double integral, $\iint_R f(x,y) \,dA$, calculates the signed volume under the surface $z=f(x,y)$ over a region $R$ in the $xy$-plane. Fubini's theorem is the powerful result that allows us to compute this double integral by performing two successive single-variable integrations, called an iterated integral. For a rectangular region, the theorem guarantees that the order in which we perform these integrations does not change the final answer.

## Why it matters
This concept is the foundation for integration in higher dimensions. In physics, it's used to calculate the mass, center of mass, or moment of inertia of a flat plate (a lamina) with variable density. In aerospace engineering, you use it to find the total force on a surface, like a wing or control flap, by integrating a variable pressure distribution over its area.

## When to study it
You must have a solid grasp of single-variable definite and indefinite integrals, including the Fundamental Theorem of Calculus. You should also be comfortable with partial differentiation, as you will need to perform "partial integration"—integrating with respect to one variable while treating others as constants. An understanding of functions of two variables, $f(x,y)$, as surfaces in 3D space is also essential.

## How to study it (step by step)
1.  **Revisit Riemann Sums:** Recall that a single integral $\int_a^b g(x) dx$ is the limit of a Riemann sum that adds up areas of thin rectangles. Write this down and draw it.
2.  **Build the 2D Analogy:** Conceptualize the double integral $\iint_R f(x,y) \,dA$ as the limit of a double Riemann sum. You are now adding up the volumes of tall, thin rectangular prisms that stand on a grid in the $xy$-plane and reach up to the surface $z=f(x,y)$. The volume of each prism is $f(x_i, y_j) \Delta A$, where $\Delta A = \Delta x \Delta y$.
3.  **The Slicing Intuition:** The core idea of Fubini's theorem is computing volume by slicing. Imagine a loaf of bread. You can find its volume by finding the area of one slice, $A$, and then integrating that area along the length of the loaf.
4.  **Derive the First Iterated Integral:** Fix a value of $x$. The slice of the volume at that $x$ is a 2D region whose area is given by a single-variable integral with respect to $y$. Let's call this area $A(x) = \int_c^d f(x,y) \,dy$. To get the total volume, we must "add up" (integrate) the areas of these slices as $x$ varies from $a$ to $b$. This gives $V = \int_a^b A(x) \,dx = \int_a^b \left( \int_c^d f(x,y) \,dy \right) dx$.
5.  **Derive the Second Iterated Integral:** Now, do it the other way. Fix a value of $y$. The slice of the volume at that $y$ has an area $A(y) = \int_a^b f(x,y) \,dx$. To get the total volume, integrate these areas as $y$ varies from $c$ to $d$. This gives $V = \int_c^d A(y) \,dy = \int_c^d \left( \int_a^b f(x,y) \,dx \right) dy$.
6.  **Synthesize:** Fubini's theorem states that if $f(x,y)$ is continuous on the rectangle $R=[a,b] \times [c,d]$, then both slicing methods yield the same volume, and this volume is the value of the double integral.
7.  **Practice:** Calculate $\iint_R xy^2 \,dA$ over $R=[0,1]\times[0,2]$ using both orders of integration. Verify you get the same numerical answer. This will make the abstract theorem concrete.

## Key ideas, with intuition
1.  **Double Integral is Volume:** The expression $\iint_R f(x,y) \,dA$ represents the net volume between the surface $z=f(x,y)$ and the rectangular region $R$ in the $xy$-plane. If $f(x,y)$ is positive, this is a literal volume. If $f(x,y)$ is negative, it's the negative of the volume.

2.  **Iterated Integral is Volume by Slicing:** An iterated integral like $\int_a^b \int_c^d f(x,y) \,dy\,dx$ is a computational procedure. The inner integral, $\int_c^d f(x,y) \,dy$, computes the area of a cross-section for a fixed $x$. The outer integral, $\int_a^b \dots \,dx$, sums up the volumes of these cross-sectional slabs.

3.  **Fubini's Theorem: Order of Slicing is Your Choice:** For rectangular domains, the genius of Fubini's theorem is that it converts a conceptually difficult 2D integration problem into two sequential, and much easier, 1D integration problems. You have the freedom to choose the order of slicing ($dy\,dx$ or $dx\,dy$), and you should choose whichever makes the inner integral simpler to compute.
    $$ \iint_R f(x,y) \,dA = \underbrace{\int_a^b \left( \int_c^d f(x,y) \,dy \right) dx}_{\text{Slicing parallel to yz-plane}} = \underbrace{\int_c^d \left( \int_a^b f(x,y) \,dx \right) dy}_{\text{Slicing parallel to xz-plane}} $$

## Worked example
Calculate $\iint_R (x + 3y^2) \,dA$ where $R = [0,2] \times [1,3]$.

**Step 1: Set up the iterated integral.**
Fubini's theorem allows us to choose the order. Let's choose to integrate with respect to $y$ first, then $x$. The region $R$ is defined by $0 \le x \le 2$ and $1 \le y \le 3$. The integral becomes:
$$ I = \int_0^2 \int_1^3 (x + 3y^2) \,dy\,dx $$

**Step 2: Evaluate the inner integral.**
We integrate with respect to $y$, treating $x$ as a constant.
$$ \int_1^3 (x + 3y^2) \,dy = \left[ xy + y^3 \right]_{y=1}^{y=3} $$
Now, apply the Fundamental Theorem of Calculus using the $y$ bounds:
$$ = (x(3) + (3)^3) - (x(1) + (1)^3) $$
$$ = (3x + 27) - (x + 1) = 2x + 26 $$
*Reflection: The result of the inner definite integral is a function of the remaining variable, $x$, which is exactly what we expect. It represents the area of a cross-section at a given $x$.*

**Step 3: Evaluate the outer integral.**
Substitute the result from Step 2 into the outer integral.
$$ I = \int_0^2 (2x + 26) \,dx $$
This is a standard single-variable integral.
$$ I = \left[ x^2 + 26x \right]_{x=0}^{x=2} $$
Apply the Fundamental Theorem of Calculus using the $x$ bounds:
$$ = ((2)^2 + 26(2)) - ((0)^2 + 26(0)) $$
$$ = (4 + 52) - 0 = 56 $$
*Reflection: The final answer is a scalar value, representing the net volume under the surface. Each step was a straightforward application of single-variable calculus, which is the entire point of this method.*

To be certain, you could compute $\int_1^3 \int_0^2 (x + 3y^2) \,dx\,dy$ and verify you also get 56.

## Diagrams
A diagram showing the domain of integration in the $xy$-plane.

```text
      ^ y
      |
    3 +---------+
      |         |
      |    R    |
      |         |
    1 +---------+
      |
 -----+---------+------> x
      0         2
```

A diagram illustrating the "slicing" method for the order $\int \int \dots dy \, dx$.

```text
          ^ z
          |
          |         , - ~ ~ ~ - ,
          |     , '   z=f(x,y)    ' ,
          |   ,       (Surface)       ,
          |  ,                         ,
          | ,                           ,
          |/____________________________|________> y
         /|           |                |
        / | A(x)      |                |
       /  |(slice)    |                |
      /   |           |                |
     /    |___________|________________|
    x     c           y                d
```
This diagram shows the 3D volume. For a fixed value of $x$, the shaded slice represents the area $A(x) = \int_c^d f(x,y) \,dy$. The outer integral then sums these areas along the $x$-axis from $a$ to $b$.

## Memory technique — remember this forever
1.  **Mnemonic:** "Fubini's Freedom of Order." For rectangular domains, you have the *freedom* to choose the integration order. Think of it like calculating the number of seats in a rectangular auditorium. You can count the seats in one row and multiply by the number of rows, OR you can count the seats in one column and multiply by the number of columns. The answer is the same.

2.  **Formulas to Overlearn:** For $R = [a,b] \times [c,d]$ and a continuous function $f(x,y)$:
    $$ \iint_R f(x,y) \,dA = \int_a^b \int_c^d f(x,y) \,dy\,dx = \int_c^d \int_a^b f(x,y) \,dx\,dy $$
    Pay close attention: the bounds on the integral sign MUST match the differential. The bounds $[c,d]$ go with $dy$, and $[a,b]$ go with $dx$.

3.  **Spaced Repetition Schedule:** Review this topic and re-work an example at **1 day, 3 days, 7 days, 16 days, and 35 days**. This will lock it into long-term memory.

4.  **First Principles Pathway:** If you forget the formula, rebuild it from the "volume by slicing" concept.
    *   Volume $V$ is the integral of cross-sectional area: $V = \int_a^b A(x) \,dx$.
    *   What is the cross-sectional area $A(x)$ at a fixed $x$? It's the area under the curve $z=f(x,y)$ where $y$ is the variable.
    *   So, $A(x) = \int_c^d f(x,y) \,dy$.
    *   Substitute the second equation into the first: $V = \int_a^b \left( \int_c^d f(x,y) \,dy \right) dx$. You have just re-derived Fubini's theorem for one order.

## Common mistakes
1.  **Mismatched Bounds and Differentials:** Writing $\int_a^b \int_c^d f(x,y) \,dx\,dy$. The outer integral is with respect to $y$, but uses the $x$-bounds ($a,b$). The inner differential $dx$ must correspond to the inner bounds, and the outer to the outer.
2.  **Forgetting to Treat Variables as Constant:** When computing the inner integral $\int_c^d x^2y \,dy$, a common error is to integrate $x^2$ to $\frac{x^3}{3}$. This is wrong. Since you are integrating with respect to $y$, $x^2$ is treated as a constant. The correct antiderivative is $x^2 \frac{y^2}{2}$.
3.  **Stopping Prematurely:** Calculating the inner integral to get a function (e.g., $2x+26$ in the example) and stopping there. A definite double integral over a region must evaluate to a single number. You must complete the outer integral.

## Self-check
1.  Calculate $\iint_R (4x^3 + 6xy^2) \,dA$ over the region $R = [1,2] \times [0,3]$.
2.  One order of integration for $\iint_R y \sin(xy) \,dA$ over $R = [0, \pi] \times [0,1]$ is significantly easier than the other. Identify which order is easier and compute the integral.
3.  Find the volume of the solid in the first octant (where $x,y,z \ge 0$) bounded by the coordinate planes and the plane $z = 9 - x - 2y$. First, determine the rectangular base of this solid on the $xy$-plane before setting up the integral.