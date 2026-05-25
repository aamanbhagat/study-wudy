## 1. What it is — in plain English

Imagine you have a flat, rectangular carpet lying on the floor. Now, imagine a bumpy surface, like a mountain range or a wavy blanket, hovering above this carpet. A "double integral over a rectangle" is simply a mathematical way to calculate the *volume* of the space between that bumpy surface and the flat carpet below it.

Think of it like this: A regular integral (the kind you learned in single-variable calculus) helps you find the *area* under a curve on a 2D graph. You're essentially adding up infinitely many tiny lines. A double integral extends this idea to 3D. Instead of adding up lines, you're adding up infinitely many tiny *columns* or "sticks" of volume, each standing on a tiny square patch of the carpet, reaching up to the bumpy surface.

"Fubini's theorem" is a very helpful rule that tells us *how* we can calculate this volume. It says that for nice, well-behaved surfaces over a simple rectangular carpet, it doesn't matter if you slice the volume up first in one direction (say, parallel to the x-axis) and then sum those slices, or if you slice it up in the other direction (parallel to the y-axis) and then sum those. You'll get the exact same total volume either way. It's like cutting a rectangular cake: you can slice it lengthwise first, then crosswise, or vice-versa; you still end up with the same amount of cake.

So, in essence, a double integral gives you the volume under a surface, and Fubini's theorem gives you the flexibility to choose the easiest way to calculate it by doing two single integrals, one after the other.

## 2. Why it matters — real-world applications

Double integrals over rectangles, and Fubini's theorem in particular, are fundamental tools across many scientific and engineering disciplines. They allow us to sum up quantities that vary continuously over a 2D area.

1.  **Physics and Engineering — Mass and Center of Mass:** Imagine designing a thin, flat metal plate that isn't uniformly dense – perhaps it's thicker or made of a heavier alloy in some spots. To calculate the total *mass* of this plate, you'd define a density function $\rho(x,y)$ that tells you the density at any point $(x,y)$ on the plate. If the plate is rectangular, a double integral $\iint_R \rho(x,y) dA$ gives you its total mass. Furthermore, finding the *center of mass* (the balancing point) of such a plate, crucial for stability in designs from circuit boards to aircraft wings, also relies on double integrals. For example, aerospace engineers at **Boeing** or **Airbus** use these calculations to ensure the stability and balance of aircraft components.

2.  **Machine Learning and Statistics — Probability Calculations:** In probability theory, if you have two continuous random variables (e.g., a person's height and weight), their joint behavior can be described by a joint probability density function, $f(x,y)$. If you want to find the probability that both variables fall within specific ranges (e.g., height between 1.7m and 1.8m, and weight between 70kg and 80kg), and these ranges form a rectangular region in the $xy$-plane, you would use a double integral $\iint_R f(x,y) dA$. This is vital for tasks like anomaly detection or predicting outcomes in fields like finance or medical diagnostics, where **Google's DeepMind** or **IBM Watson Health** might use such models.

3.  **Computer Graphics and Image Processing — Light and Color Intensity:** When rendering realistic scenes in computer graphics, calculating how much light falls on a particular rectangular patch of a surface (like a wall or a screen) involves integrating light intensity functions over that area. The total illumination, or even the average color of a region, can be found using double integrals. This is critical for companies like **Pixar** or **NVIDIA** in creating lifelike animations and high-performance graphics cards, ensuring accurate lighting and shading.

4.  **Fluid Dynamics and Aerodynamics — Pressure and Force Distribution:** When a fluid (like air or water) flows over a flat, rectangular surface (e.g., a hydrofoil or a simple wing section), the pressure exerted by the fluid can vary across the surface, described by a pressure function $P(x,y)$. To find the total force exerted by the fluid on that surface, which is crucial for calculating lift or drag, engineers would perform a double integral $\iint_R P(x,y) dA$. This is fundamental in the design of ships, aircraft, and wind turbines by companies like **GE Aviation** or **Siemens Gamesa**.

## 3. Prerequisites — what you must know first

Before diving deep into double integrals, ensure you have a solid grasp of the following concepts from single-variable calculus and basic multivariable functions:

*   **Single-variable integration:** The concept of an antiderivative, indefinite integrals, definite integrals, the Fundamental Theorem of Calculus, and techniques of integration (substitution, integration by parts). You should be comfortable calculating $\int_a^b f(x) dx$.
*   **Riemann Sums (1D):** Understanding how a definite integral is defined as the limit of a sum of areas of rectangles. This intuition extends directly to 2D.
*   **Functions of two variables:** How to represent and visualize a function $z = f(x,y)$ in 3D space, understanding that it describes a surface.
*   **Partial derivatives:** The ability to differentiate a multivariable function with respect to one variable while treating the others as constants. This skill is analogous to partial integration, which you'll perform in double integrals.
*   **Rectangular coordinates:** Familiarity with defining points $(x,y)$ and regions in the $xy$-plane, particularly how to describe a rectangle using inequalities like $a \le x \le b$ and $c \le y \le d$.

If any of these feel shaky, it's highly recommended to review them before proceeding, as they form the foundational building blocks for understanding double integrals.

## 4. The core idea — step by step

Let's break down the concept of double integrals over rectangles and Fubini's theorem into manageable steps, building from familiar territory.

### Step 1: Recap Single Integrals for Area

**Plain-English Statement:** Remember how a definite integral $\int_a^b f(x) dx$ helps us find the area under a curve $y=f(x)$ from $x=a$ to $x=b$? It's like summing up the areas of infinitely many super-thin vertical rectangles.

**Small Concrete Example:** If you want to find the area under the curve $y=x^2$ from $x=0$ to $x=2$, you calculate $\int_0^2 x^2 dx$.
$$ \int_0^2 x^2 dx = \left[ \frac{x^3}{3} \right]_0^2 = \frac{2^3}{3} - \frac{0^3}{3} = \frac{8}{3} $$
This gives you the exact area value.

**Formal/Mathematical Version:**
The definite integral of a continuous function $f(x)$ over $[a,b]$ is defined as the limit of Riemann sums:
$$ \int_a^b f(x) dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \Delta x $$
where $\Delta x = (b-a)/n$ and $x_i^*$ is a sample point in the $i$-th subinterval.

**What could go wrong:** Forgetting that $\int f(x) dx$ represents an accumulation or sum of values $f(x)$ multiplied by tiny changes in $x$. The geometric interpretation as "area" is crucial for intuition.

### Step 2: Extending to Volume - The Idea of a Double Integral

**Plain-English Statement:** Now, instead of a curve $y=f(x)$ on a 2D plane, imagine a surface $z=f(x,y)$ floating above a flat, rectangular region in the $xy$-plane. A double integral is designed to find the *volume* between this surface and the $xy$-plane over that rectangular region. Think of it as stacking tiny, thin rectangular columns (like very thin building blocks) on the $xy$-plane, where each column's base is a tiny square area and its height is given by $f(x,y)$. We then sum the volumes of all these tiny columns.

**Small Concrete Example:** Consider the surface $z = f(x,y) = 4 - x - y$ over the rectangular region $R = [0,2] \times [0,1]$. This region means $0 \le x \le 2$ and $0 \le y \le 1$. We want to find the volume under this plane segment. We'd denote this as $\iint_R (4-x-y) dA$.

**Formal/Mathematical Version:**
Let $f(x,y)$ be a continuous function defined on a rectangular region $R = [a,b] \times [c,d]$. We divide $R$ into $mn$ smaller rectangles $R_{ij}$ with area $\Delta A = \Delta x \Delta y$. We choose a sample point $(x_{ij}^*, y_{ij}^*)$ in each $R_{ij}$. The double integral of $f$ over $R$ is defined as the limit of the double Riemann sum:
$$ \iint_R f(x,y) dA = \lim_{m,n \to \infty} \sum_{i=1}^m \sum_{j=1}^n f(x_{ij}^*, y_{ij}^*) \Delta A $$
Here, $f(x_{ij}^*, y_{ij}^*)$ is the height of a tiny column, and $\Delta A$ is its base area. Their product is the volume of one tiny column.

**What could go wrong:** Not understanding that $\Delta A$ represents a small *area* element ($dx dy$ or $dy dx$ in the limit), and $f(x,y)$ represents the *height*. The product $f(x,y) \Delta A$ is a tiny volume.

### Step 3: Iterated Integrals - The Slicing Method

**Plain-English Statement:** The Riemann sum definition is great for understanding, but not practical for calculation. Just as we used antiderivatives for single integrals, we need a computational method for double integrals. This is where "iterated integrals" come in. The idea is to break down the 3D volume problem into two 2D area problems. We can imagine slicing the 3D volume with planes. If we slice parallel to the $yz$-plane (meaning we fix an $x$ value), each slice gives us a 2D cross-section. The area of this cross-section can be found with a single integral with respect to $y$. Then, we integrate these areas along the $x$-axis to get the total volume.

**Small Concrete Example:** To calculate $\iint_R (4-x-y) dA$ over $R = [0,2] \times [0,1]$:
Let's choose to integrate with respect to $y$ first, then $x$.
1.  **Inner integral (with respect to $y$):** Imagine we fix $x$ at some value. We are looking at a slice of the surface above the line segment from $(x,0)$ to $(x,1)$ in the $xy$-plane. The area of this 2D slice, $A(x)$, is given by $\int_0^1 (4-x-y) dy$. In this integral, $x$ is treated as a constant.
    $$ \int_0^1 (4-x-y) dy = \left[ 4y - xy - \frac{y^2}{2} \right]_0^1 = (4(1) - x(1) - \frac{1^2}{2}) - (0) = 4 - x - \frac{1}{2} = \frac{7}{2} - x $$
    This $A(x)$ is the area of a cross-section at a fixed $x$.
2.  **Outer integral (with respect to $x$):** Now, we sum up all these cross-sectional areas $A(x)$ as $x$ varies from $0$ to $2$.
    $$ \int_0^2 \left( \frac{7}{2} - x \right) dx = \left[ \frac{7}{2}x - \frac{x^2}{2} \right]_0^2 = \left( \frac{7}{2}(2) - \frac{2^2}{2} \right) - (0) = 7 - \frac{4}{2} = 7 - 2 = 5 $$
    So, the total volume is 5 cubic units.

**Formal/Mathematical Version:**
The double integral can be evaluated as an iterated integral:
$$ \iint_R f(x,y) dA = \int_a^b \left( \int_c^d f(x,y) dy \right) dx $$
Here, the inner integral $\int_c^d f(x,y) dy$ is performed first, treating $x$ as a constant. Its result is a function of $x$. Then, the outer integral $\int_a^b (\dots) dx$ is performed on this result.

**What could go wrong:** Confusing which variable is being integrated and which is being treated as a constant in the inner integral. Incorrectly applying the limits of integration for the inner integral.

### Step 4: Fubini's Theorem - The Order Doesn't Matter (for continuous functions on rectangles)

**Plain-English Statement:** Fubini's theorem is the "cake-cutting" rule. It says that for a continuous function $f(x,y)$ over a rectangular region $R$, you can compute the double integral by integrating with respect to $y$ first, then $x$, OR by integrating with respect to $x$ first, then $y$. The result will be the same. This is incredibly powerful because sometimes one order of integration is much easier to compute than the other.

**Small Concrete Example:** Using the same example $f(x,y) = 4 - x - y$ over $R = [0,2] \times [0,1]$.
In Step 3, we did $\int_0^2 \int_0^1 (4-x-y) dy dx$ and got 5.
Now, let's use Fubini's theorem and switch the order: $\int_0^1 \int_0^2 (4-x-y) dx dy$.
1.  **Inner integral (with respect to $x$):** Treat $y$ as a constant.
    $$ \int_0^2 (4-x-y) dx = \left[ 4x - \frac{x^2}{2} - yx \right]_0^2 = (4(2) - \frac{2^2}{2} - y(2)) - (0) = 8 - 2 - 2y = 6 - 2y $$
2.  **Outer integral (with respect to $y$):**
    $$ \int_0^1 (6-2y) dy = \left[ 6y - y^2 \right]_0^1 = (6(1) - 1^2) - (0) = 6 - 1 = 5 $$
    As expected, we get the same result, 5.

**Formal/Mathematical Version:**
If $f(x,y)$ is continuous on the rectangular region $R = [a,b] \times [c,d]$, then
$$ \iint_R f(x,y) dA = \int_a^b \int_c^d f(x,y) dy dx = \int_c^d \int_a^b f(x,y) dx dy $$
A slightly more general version exists for functions that are not necessarily continuous but are "integrable" (e.g., bounded functions with a finite number of discontinuities), but for our purposes, continuity is the key condition to remember.

**What could go wrong:** Applying Fubini's theorem when the region of integration is *not* a rectangle, or when the function $f(x,y)$ is *not* continuous over the region. In such cases, the order of integration *can* matter, or the integral might not even exist. However, for most introductory problems, continuity and rectangular regions are assumed.

### Step 5: Practical Calculation Steps

**Plain-English Statement:** To actually calculate a double integral over a rectangle, you just follow a routine: pick an order of integration, do the inside integral first (treating the "other" variable as a constant), then do the outside integral.

**Small Concrete Example:** Let's integrate $f(x,y) = xy^2$ over $R = [1,2] \times [0,1]$.
1.  **Choose an order:** Let's go with $dx dy$.
2.  **Perform the inner integral (with respect to $x$):** Treat $y$ as a constant.
    $$ \int_1^2 xy^2 dx = y^2 \int_1^2 x dx = y^2 \left[ \frac{x^2}{2} \right]_1^2 = y^2 \left( \frac{2^2}{2} - \frac{1^2}{2} \right) = y^2 \left( \frac{4}{2} - \frac{1}{2} \right) = y^2 \left( \frac{3}{2} \right) = \frac{3}{2}y^2 $$
3.  **Perform the outer integral (with respect to $y$):**
    $$ \int_0^1 \frac{3}{2}y^2 dy = \frac{3}{2} \int_0^1 y^2 dy = \frac{3}{2} \left[ \frac{y^3}{3} \right]_0^1 = \frac{3}{2} \left( \frac{1^3}{3} - \frac{0^3}{3} \right) = \frac{3}{2} \left( \frac{1}{3} \right) = \frac{1}{2} $$
    The volume is $1/2$.

**Formal/Mathematical Version:** (No new formal version, just applying the previous steps.)

**What could go wrong:** Algebraic mistakes, especially in substitution of limits. Forgetting to treat the "constant" variable correctly (e.g., integrating $y^2$ with respect to $x$ as if it were $x^2$).

## 5. Worked examples — multiple, with every step shown

Here are several fully worked examples, demonstrating the application of double integrals and Fubini's theorem.

### Example 1: Constant Function

**Problem:** Evaluate the double integral $\iint_R 5 \, dA$ over the rectangular region $R = [1, 3] \times [2, 4]$.

**Given:**
*   Function: $f(x,y) = 5$
*   Region: $R = \{(x,y) \mid 1 \le x \le 3, 2 \le y \le 4\}$

**We want:** The value of the double integral, which represents the volume of a rectangular box.

**Solution:**

We can choose either order of integration by Fubini's Theorem. Let's choose $dy \, dx$.

$$ \iint_R 5 \, dA = \int_1^3 \int_2^4 5 \, dy \, dx $$

**Step 1: Perform the inner integral with respect to $y$.**
In this step, we treat $x$ as a constant (though there's no $x$ here, so it's simpler). We integrate $5$ with respect to $y$ from $y=2$ to $y=4$.
$$ \int_2^4 5 \, dy = [5y]_2^4 $$
*This is the antiderivative of 5 with respect to y, evaluated from y=2 to y=4.*
$$ = (5 \cdot 4) - (5 \cdot 2) $$
*Substitute the upper limit (4) and the lower limit (2) into the antiderivative and subtract.*
$$ = 20 - 10 $$
*Perform the subtraction.*
$$ = 10 $$
*This value, 10, represents the area of a cross-section (a rectangle of height 5 and width 2) for any fixed x.*

**Step 2: Perform the outer integral with respect to $x$.**
Now we integrate the result from Step 1 (which is 10) with respect to $x$ from $x=1$ to $x=3$.
$$ \int_1^3 10 \, dx = [10x]_1^3 $$
*This is the antiderivative of 10 with respect to x, evaluated from x=1 to x=3.*
$$ = (10 \cdot 3) - (10 \cdot 1) $$
*Substitute the upper limit (3) and the lower limit (1) into the antiderivative and subtract.*
$$ = 30 - 10 $$
*Perform the subtraction.*
$$ = 20 $$
*This is the final value of the double integral.*

The final answer is $\boxed{20}$.

**Reflection:** This example is straightforward because the function is a constant. Geometrically, it represents the volume of a rectangular box with base dimensions $(3-1)=2$ and $(4-2)=2$, and height $5$. The volume is $2 \times 2 \times 5 = 20$. This confirms our calculation and helps build intuition for what double integrals represent.

---

### Example 2: Product Function

**Problem:** Evaluate $\iint_R xy^2 \, dA$ where $R = [0, 1] \times [0, 2]$.

**Given:**
*   Function: $f(x,y) = xy^2$
*   Region: $R = \{(x,y) \mid 0 \le x \le 1, 0 \le y \le 2\}$

**We want:** The value of the double integral.

**Solution:**

Let's evaluate this using both orders of integration to demonstrate Fubini's Theorem.

**Order 1: $\int_0^1 \int_0^2 xy^2 \, dy \, dx$**

**Step 1: Perform the inner integral with respect to $y$.**
We integrate $xy^2$ with respect to $y$ from $y=0$ to $y=2$. Treat $x$ as a constant.
$$ \int_0^2 xy^2 \, dy = x \int_0^2 y^2 \, dy $$
*Since x is a constant with respect to y, we can pull it out of the integral.*
$$ = x \left[ \frac{y^3}{3} \right]_0^2 $$
*Find the antiderivative of $y^2$ with respect to $y$, which is $y^3/3$. Evaluate it at the limits.*
$$ = x \left( \frac{2^3}{3} - \frac{0^3}{3} \right) $$
*Substitute the upper limit (2) and the lower limit (0) for y.*
$$ = x \left( \frac{8}{3} - 0 \right) $$
*Simplify the expression.*
$$ = \frac{8}{3}x $$
*This is a function of x, representing the area of a slice at a fixed x.*

**Step 2: Perform the outer integral with respect to $x$.**
Now we integrate the result from Step 1 ($\frac{8}{3}x$) with respect to $x$ from $x=0$ to $x=1$.
$$ \int_0^1 \frac{8}{3}x \, dx = \frac{8}{3} \int_0^1 x \, dx $$
*Pull out the constant $8/3$.*
$$ = \frac{8}{3} \left[ \frac{x^2}{2} \right]_0^1 $$
*Find the antiderivative of $x$ with respect to $x$, which is $x^2/2$. Evaluate it at the limits.*
$$ = \frac{8}{3} \left( \frac{1^2}{2} - \frac{0^2}{2} \right) $$
*Substitute the upper limit (1) and the lower limit (0) for x.*
$$ = \frac{8}{3} \left( \frac{1}{2} - 0 \right) $$
*Simplify the expression.*
$$ = \frac{8}{3} \cdot \frac{1}{2} $$
*Multiply the fractions.*
$$ = \frac{4}{3} $$

**Order 2: $\int_0^2 \int_0^1 xy^2 \, dx \, dy$**

**Step 1: Perform the inner integral with respect to $x$.**
We integrate $xy^2$ with respect to $x$ from $x=0$ to $x=1$. Treat $y$ as a constant.
$$ \int_0^1 xy^2 \, dx = y^2 \int_0^1 x \, dx $$
*Since $y^2$ is a constant with respect to x, we can pull it out of the integral.*
$$ = y^2 \left[ \frac{x^2}{2} \right]_0^1 $$
*Find the antiderivative of $x$ with respect to $x$, which is $x^2/2$. Evaluate it at the limits.*
$$ = y^2 \left( \frac{1^2}{2} - \frac{0^2}{2} \right) $$
*Substitute the upper limit (1) and the lower limit (0) for x.*
$$ = y^2 \left( \frac{1}{2} - 0 \right) $$
*Simplify the expression.*
$$ = \frac{1}{2}y^2 $$
*This is a function of y, representing the area of a slice at a fixed y.*

**Step 2: Perform the outer integral with respect to $y$.**
Now we integrate the result from Step 1 ($\frac{1}{2}y^2$) with respect to $y$ from $y=0$ to $y=2$.
$$ \int_0^2 \frac{1}{2}y^2 \, dy = \frac{1}{2} \int_0^2 y^2 \, dy $$
*Pull out the constant $1/2$.*
$$ = \frac{1}{2} \left[ \frac{y^3}{3} \right]_0^2 $$
*Find the antiderivative of $y^2$ with respect to $y$, which is $y^3/3$. Evaluate it at the limits.*
$$ = \frac{1}{2} \left( \frac{2^3}{3} - \frac{0^3}{3} \right) $$
*Substitute the upper limit (2) and the lower limit (0) for y.*
$$ = \frac{1}{2} \left( \frac{8}{3} - 0 \right) $$
*Simplify the expression.*
$$ = \frac{1}{2} \cdot \frac{8}{3} $$
*Multiply the fractions.*
$$ = \frac{4}{3} $$

The final answer is $\boxed{\frac{4}{3}}$.

**Reflection:** This example explicitly shows Fubini's theorem in action. Both orders of integration yield the same result, confirming the theorem. The function $f(x,y)=xy^2$ is separable ($g(x)h(y)$), which often makes both orders equally easy.

---

### Example 3: Exponential Function

**Problem:** Evaluate $\iint_R y e^{xy} \, dA$ over the region $R = [0, 1] \times [0, 1]$.

**Given:**
*   Function: $f(x,y) = y e^{xy}$
*   Region: $R = \{(x,y) \mid 0 \le x \le 1, 0 \le y \le 1\}$

**We want:** The value of the double integral.

**Solution:**

This problem highlights the strategic choice of integration order.

**Consider Order 1: $\int_0^1 \int_0^1 y e^{xy} \, dy \, dx$**
The inner integral would be $\int_0^1 y e^{xy} \, dy$. This requires integration by parts because we have a product of $y$ and $e^{xy}$, where $y$ is the variable of integration. This is doable but more complex.

**Consider Order 2: $\int_0^1 \int_0^1 y e^{xy} \, dx \, dy$**
The inner integral is $\int_0^1 y e^{xy} \, dx$. Here, $y$ is treated as a constant. This looks promising because the derivative of $xy$ with respect to $x$ is $y$.

Let's proceed with Order 2, as it simplifies the inner integral.

**Step 1: Perform the inner integral with respect to $x$.**
We integrate $y e^{xy}$ with respect to $x$ from $x=0$ to $x=1$. Treat $y$ as a constant.
$$ \int_0^1 y e^{xy} \, dx $$
*Notice that $y$ is the derivative of $xy$ with respect to $x$ (if $y$ is constant). This suggests a simple substitution or direct recognition of the antiderivative.*
Let $u = xy$. Then $du = y \, dx$.
$$ = \int_{x=0}^{x=1} e^u \, du $$
*The integral of $e^u$ with respect to $u$ is $e^u$.*
$$ = [e^{xy}]_{x=0}^{x=1} $$
*Substitute back $u=xy$. Now evaluate this antiderivative at the limits for $x$.*
$$ = (e^{1 \cdot y}) - (e^{0 \cdot y}) $$
*Substitute $x=1$ and $x=0$ into the expression.*
$$ = e^y - e^0 $$
*Simplify, remembering that $e^0 = 1$.*
$$ = e^y - 1 $$
*This is a function of y, representing the area of a slice at a fixed y.*

**Step 2: Perform the outer integral with respect to $y$.**
Now we integrate the result from Step 1 ($e^y - 1$) with respect to $y$ from $y=0$ to $y=1$.
$$ \int_0^1 (e^y - 1) \, dy = \left[ e^y - y \right]_0^1 $$
*Find the antiderivative of $e^y$ (which is $e^y$) and $-1$ (which is $-y$). Evaluate at the limits.*
$$ = (e^1 - 1) - (e^0 - 0) $$
*Substitute the upper limit (1) and the lower limit (0) for y.*
$$ = (e - 1) - (1 - 0) $$
*Simplify the expression.*
$$ = e - 1 - 1 $$
*Combine the constants.*
$$ = e - 2 $$

The final answer is $\boxed{e - 2}$.

**Reflection:** This example demonstrates the power of Fubini's theorem in simplifying calculations. Choosing the order $dx dy$ avoided integration by parts, which would have been necessary for the $dy dx$ order. Always consider which variable makes the inner integral simpler when applying Fubini's theorem.

---

### Example 4: Trigonometric Function

**Problem:** Evaluate $\iint_R x \sin(xy) \, dA$ over the region $R = [0, 1] \times [0, \pi/2]$.

**Given:**
*   Function: $f(x,y) = x \sin(xy)$
*   Region: $R = \{(x,y) \mid 0 \le x \le 1, 0 \le y \le \pi/2\}$

**We want:** The value of the double integral.

**Solution:**

Again, let's consider the order of integration carefully.

**Consider Order 1: $\int_0^1 \int_0^{\pi/2} x \sin(xy) \, dy \, dx$**
The inner integral would be $\int_0^{\pi/2} x \sin(xy) \, dy$. Here, $x$ is treated as a constant. This looks promising because the derivative of $xy$ with respect to $y$ is $x$.

**Consider Order 2: $\int_0^{\pi/2} \int_0^1 x \sin(xy) \, dx \, dy$**
The inner integral would be $\int_0^1 x \sin(xy) \, dx$. Here, $y$ is treated as a constant. This would require integration by parts (specifically, $u=x$, $dv=\sin(xy)dx$), which is more involved.

Let's proceed with Order 1.

**Step 1: Perform the inner integral with respect to $y$.**
We integrate $x \sin(xy)$ with respect to $y$ from $y=0$ to $y=\pi/2$. Treat $x$ as a constant.
$$ \int_0^{\pi/2} x \sin(xy) \, dy $$
*Let $u = xy$. Then $du = x \, dy$. The integral becomes $\int \sin(u) du$.*
*The antiderivative of $\sin(u)$ is $-\cos(u)$.*
$$ = [-\cos(xy)]_{y=0}^{y=\pi/2} $$
*Substitute back $u=xy$. Now evaluate this antiderivative at the limits for $y$.*
$$ = (-\cos(x \cdot \frac{\pi}{2})) - (-\cos(x \cdot 0)) $$
*Substitute $y=\pi/2$ and $y=0$ into the expression.*
$$ = -\cos\left(\frac{\pi x}{2}\right) - (-\cos(0)) $$
*Simplify, remembering that $\cos(0) = 1$.*
$$ = -\cos\left(\frac{\pi x}{2}\right) + 1 $$
*This is a function of x, representing the area of a slice at a fixed x.*

**Step 2: Perform the outer integral with respect to $x$.**
Now we integrate the result from Step 1 ($1 - \cos(\frac{\pi x}{2})$) with respect to $x$ from $x=0$ to $x=1$.
$$ \int_0^1 \left(1 - \cos\left(\frac{\pi x}{2}\right)\right) \, dx $$
*Integrate term by term.*
$$ = \left[ x - \frac{\sin\left(\frac{\pi x}{2}\right)}{\frac{\pi}{2}} \right]_0^1 $$
*The antiderivative of $1$ is $x$. For $-\cos(kx)$, the antiderivative is $-\frac{1}{k}\sin(kx)$. Here $k=\pi/2$.*
$$ = \left[ x - \frac{2}{\pi}\sin\left(\frac{\pi x}{2}\right) \right]_0^1 $$
*Rewrite the fraction for clarity.*
$$ = \left( 1 - \frac{2}{\pi}\sin\left(\frac{\pi \cdot 1}{2}\right) \right) - \left( 0 - \frac{2}{\pi}\sin\left(\frac{\pi \cdot 0}{2}\right) \right) $$
*Substitute the upper limit (1) and the lower limit (0) for x.*
$$ = \left( 1 - \frac{2}{\pi}\sin\left(\frac{\pi}{2}\right) \right) - \left( 0 - \frac{2}{\pi}\sin(0) \right) $$
*Simplify, remembering that $\sin(\pi/2) = 1$ and $\sin(0) = 0$.*
$$ = \left( 1 - \frac{2}{\pi}(1) \right) - (0 - 0) $$
*Perform the arithmetic.*
$$ = 1 - \frac{2}{\pi} $$

The final answer is $\boxed{1 - \frac{2}{\pi}}$.

**Reflection:** Similar to the previous example, choosing the order of integration wisely ($dy \, dx$) significantly simplified the calculation by avoiding integration by parts. This is a common theme in multivariable calculus: the setup of the integral (limits and order) is often as important as the integration itself.

## 6. Common mistakes and traps

Students often encounter specific pitfalls when first learning double integrals over rectangles. Being aware of these can help you avoid them:

1.  **Incorrect Limits of Integration:** Even for rectangles, it's easy to mix up which limits belong to which variable. Always draw the region if unsure. For $R=[a,b] \times [c,d]$, if you integrate $dy \, dx$, $y$ goes from $c$ to $d$, and $x$ goes from $a$ to $b$.
2.  **Treating the "Constant" Variable Incorrectly:** In the inner integral, the outer variable *must* be treated as a constant. Forgetting this leads to incorrect antiderivatives (e.g., integrating $x^2y$ with respect to $y$ and getting $x^3y/3$ instead of $x^2y^2/2$).
3.  **Algebraic Errors in Substitution:** After finding the antiderivative for the inner integral, you substitute the limits. This step is prone to arithmetic and sign errors, especially with complex expressions or trigonometric functions.
4.  **Forgetting the Differential ($dx$ or $dy$):** In iterated integrals, it's crucial to write both differentials, e.g., $\int \int f(x,y) \, dy \, dx$. Omitting them can lead to confusion about the order of integration and is mathematically imprecise.
5.  **Applying Fubini's Theorem Outside its Conditions:** While this lesson focuses on rectangles, students sometimes prematurely apply Fubini's theorem (swapping integration order) to non-rectangular regions where the limits of integration for the inner integral depend on the outer variable. For such regions, the limits must also be swapped and correctly adjusted, which is a more advanced topic.
6.  **Confusing Partial Integration with Partial Differentiation:** While the process of treating one variable as a constant is similar, remember that integration is the reverse of differentiation. Don't mix up the rules for finding antiderivatives with those for finding derivatives.

## 7. Textbook-precise explanation

Let $f(x,y)$ be a function defined on a closed rectangular region $R = [a,b] \times [c,d]$ in the $xy$-plane. This region consists of all points $(x,y)$ such that $a \le x \le b$ and $c \le y \le d$.

**Definition of the Double Integral:**
To define the double integral of $f$ over $R$, we first partition the rectangle $R$ into smaller subrectangles. Let $P_x = \{x_0, x_1, \dots, x_m\}$ be a partition of $[a,b]$ and $P_y = \{y_0, y_1, \dots, y_n\}$ be a partition of $[c,d]$. These partitions divide $R$ into $mn$ subrectangles $R_{ij} = [x_{i-1}, x_i] \times [y_{j-1}, y_j]$, each with area $\Delta A_{ij} = \Delta x_i \Delta y_j$, where $\Delta x_i = x_i - x_{i-1}$ and $\Delta y_j = y_j - y_{j-1}$.
For each subrectangle $R_{ij}$, we choose an arbitrary sample point $(x_{ij}^*, y_{ij}^*)$. The Riemann sum for $f$ over $R$ is given by:
$$ \sum_{i=1}^m \sum_{j=1}^n f(x_{ij}^*, y_{ij}^*) \Delta A_{ij} $$
If the limit of these Riemann sums exists as the mesh size of the partitions (the maximum diagonal length of the subrectangles) approaches zero, then $f$ is said to be integrable over $R$, and the double integral of $f$ over $R$ is defined as:
$$ \iint_R f(x,y) dA = \lim_{\|\Delta\| \to 0} \sum_{i=1}^m \sum_{j=1}^n f(x_{ij}^*, y_{ij}^*) \Delta A_{ij} $$
where $\|\Delta\|$ denotes the mesh size.

**Fubini's Theorem (for Rectangular Regions):**
Fubini's Theorem provides a practical method for evaluating double integrals as iterated single integrals.
**Theorem:** If $f(x,y)$ is a continuous function on the rectangular region $R = [a,b] \times [c,d]$, then the double integral can be evaluated by either of the two iterated integrals:
$$ \iint_R f(x,y) dA = \int_a^b \left( \int_c^d f(x,y) dy \right) dx $$
or
$$ \iint_R f(x,y) dA = \int_c^d \left( \int_a^b f(x,y) dx \right) dy $$
Furthermore, if $f(x,y) = g(x)h(y)$ (i.e., $f$ is a product of a function of $x$ only and a function of $y$ only), then the double integral can be separated into a product of two single integrals:
$$ \iint_R g(x)h(y) dA = \left( \int_a^b g(x) dx \right) \left( \int_c^d h(y) dy \right) $$

**Reference:** This definition and theorem are standard in multivariable calculus textbooks. For instance, see **Stewart, Calculus, Early Transcendentals, 9th Edition, Chapter 15.1 (Double Integrals over Rectangles) and 15.2 (Iterated Integrals)**.

## 8. ASCII diagrams

Here are some ASCII diagrams to help visualize the concepts.

```text
       Z
       |   /
       |  /
       | /
       +------------------ Surface z = f(x,y)
      /| /|
     / |/ |
    /  +--+---- R = [a,b] x [c,d] in XY-plane
   /  /|  |
  /  / |  |
 +--+--+--+----- Y (y-axis)
 |  |  |  |
 |  |  |  |
 +--+--+--+----- X (x-axis)
(0,0,0)

  Figure 1: Visualizing the volume under a surface f(x,y)
            over a rectangular region R in the XY-plane.
            The double integral computes this volume.

  -------------------------------------------------------------

  Rectangular Region R in the XY-plane:

  Y-axis
  ^
  |
d +-------------------+
  |                   |
  |                   |  R = [a,b] x [c,d]
  |                   |
c +-------------------+
  +---a-----------b---> X-axis

  Figure 2: The rectangular domain of integration R.
            The limits for x are from 'a' to 'b'.
            The limits for y are from 'c' to 'd'.

  -------------------------------------------------------------

  Slicing for Iterated Integral (dy dx order):

  Y-axis
  ^
  |
d +-------------------+
  |       |           |
  |       |           |  <-- Inner integral: ∫ f(x,y) dy
  |       |           |      (for a fixed x, sum along y)
c +-------|-----------+
  +---a---x-----------b---> X-axis
          ^
          |
          Fixed x-value. This slice gives an area A(x).

  Then, the outer integral ∫ A(x) dx sums these areas from x=a to x=b.

  -------------------------------------------------------------

  Slicing for Iterated Integral (dx dy order):

  Y-axis
  ^
  |
d +-------------------+
  |-------------------|  <-- Inner integral: ∫ f(x,y) dx
  |-------------------|      (for a fixed y, sum along x)
  |-------------------|
c +-------------------+
  +---a-----------b---> X-axis
  ^   ^           ^
  |   |           |
  Fixed y-value. This slice gives an an area A(y).

  Then, the outer integral ∫ A(y) dy sums these areas from y=c to y=d.
```

## 9. Memory technique — never forget this

1.  **Mnemonic / Visual Hook:** Think of **Fubini's Famous Funnel Cake**. Imagine a delicious, irregularly shaped funnel cake (your surface $z=f(x,y)$) sitting on a rectangular serving tray (your region $R$). Fubini's theorem tells you that no matter how you slice the cake – whether you cut it into strips lengthwise first and then cut those strips, or cut it into strips crosswise first and then cut those – you'll always end up with the same total amount of cake. The *order* of slicing doesn't change the total volume (or deliciousness!).

2.  **Formulas/Facts to Overlearn:**
    *   The conceptual meaning: $\iint_R f(x,y) dA$ represents the **volume** under the surface $z=f(x,y)$ and above the region $R$ in the $xy$-plane (when $f(x,y) \ge 0$). More generally, it's the "signed volume" or a generalized sum of $f(x,y)$ over $R$.
    *   **Fubini's Theorem (for continuous functions on rectangles):**
        $$ \iint_R f(x,y) dA = \int_a^b \int_c^d f(x,y) dy dx = \int_c^d \int_a^b f(x,y) dx dy $$
        This is the core computational tool. Remember the conditions: $f$ must be continuous, and $R$ must be a rectangle $[a,b] \times [c,d]$.

3.  **Spaced-Repetition Schedule:**
    *   **1 Day:** Review the definition and Fubini's Theorem. Redo Example 2.
    *   **3 Days:** Redo Example 3 and try to articulate *why* one order was easier.
    *   **7 Days:** Attempt one of the self-check questions. Briefly re-derive the concept from Riemann sums.
    *   **16 Days:** Work through another self-check question. Explain the "Funnel Cake" analogy to yourself or a peer.
    *   **35 Days:** Review all key formulas. Try to explain Fubini's theorem and its importance to someone who has never heard of it.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget Fubini's theorem or its meaning, you can always rebuild it from first principles:
    *   **Start with the Riemann Sum for a single integral:** $\int_a^b f(x) dx = \lim \sum f(x_i^*) \Delta x$. This is the sum of areas of 1D rectangles (lines).
    *   **Extend to the Riemann Sum for a double integral:** $\iint_R f(x,y) dA = \lim \sum \sum f(x_{ij}^*, y_{ij}^*) \Delta A$. This is the sum of volumes of 3D columns. $\Delta A = \Delta x \Delta y$.
    *   **Connect to Iterated Integrals:** Imagine fixing $x$. Then, $\sum f(x, y_j^*) \Delta y$ is like a 1D Riemann sum for a slice at that $x$. In the limit, this becomes $\int_c^d f(x,y) dy$, which gives you the area $A(x)$ of that slice.
    *   **Sum the Slices:** Now, you have a function $A(x)$. To get the total volume, you sum these areas $A(x)$ over all $x$ from $a$ to $b$: $\int_a^b A(x) dx$.
    *   **Combine:** This leads directly to $\int_a^b \left( \int_c^d f(x,y) dy \right) dx$.
    *   **Symmetry for Fubini:** Since the choice of slicing first along $x$ or first along $y$ is arbitrary for a continuous surface over a rectangle, the other order of integration $\int_c^d \left( \int_a^b f(x,y) dx \right) dy$ must yield the same result. This is the essence of Fubini's theorem.

## 10. Connections — what this leads to

Understanding double integrals over rectangles and Fubini's theorem is a cornerstone for almost all subsequent topics in multivariable calculus and related fields. It directly unlocks:

1.  **Double Integrals over General Regions:** The immediate next step is to extend integration from simple rectangles to more complex 2D regions (e.g., circles, triangles, regions bounded by curves). Fubini's theorem still applies, but the limits of integration for the inner integral will no longer be constants; they will be functions of the outer variable. This requires careful sketching of the region and determining the correct "bounds."
2.  **Triple Integrals:** Just as double integrals extend single integrals to 2D regions (volumes), triple integrals extend them to 3D regions (hypervolumes, or more practically, mass/charge/temperature distribution within a 3D object). The principle of iterated integration (Fubini's theorem) applies directly, allowing you to compute $\iiint_E f(x,y,z) dV$ as three nested single integrals.
3.  **Change of Variables in Multiple Integrals:** When integrating over non-rectangular regions, or when the integrand is simpler in a different coordinate system, you'll learn techniques like polar, cylindrical, and spherical coordinates. These transformations involve a Jacobian determinant, which accounts for the change in the area (or volume) element, $dA$.
4.  **Surface Area:** Double integrals are used to calculate the surface area of a 3D surface $z=f(x,y)$ lying above a region $R$ in the $xy$-plane.
5.  **Applications in Physics and Engineering:** Beyond mass and center of mass, double integrals are used to calculate moments of inertia, fluid flow rates, electrostatic potential, and work done by a variable force field over a surface.
6.  **Vector Calculus:** The concepts of line integrals, surface integrals, and fundamental theorems like Green's Theorem, Stokes' Theorem, and the Divergence Theorem all build upon the foundation of multivariable integration. These theorems relate different types of integrals and are central to understanding electromagnetism, fluid dynamics, and other advanced physics.
7.  **Probability and Statistics:** As mentioned, double integrals are crucial for working with joint probability density functions for continuous random variables, calculating probabilities over 2D regions, and computing expected values.

## 11. Self-check questions

These questions are designed to test your understanding, ranging from conceptual recall to applying the techniques. Do not look up the answers until you have genuinely attempted them.

1.  **Conceptual Understanding:** Explain in your own words what $\iint_R f(x,y) dA$ represents when $f(x,y)$ is always positive over the region $R$. How does this differ conceptually from $\int_a^b f(x) dx$?
2.  **Fubini's Theorem Conditions:** For what types of functions $f(x,y)$ and regions $R$ does Fubini's theorem guarantee that the order of integration does not matter? Give an example of a situation where Fubini's theorem might *not* apply.
3.  **Basic Calculation:** Evaluate the double integral $\iint_R (x^2 + y) \, dA$ over the region $R = [0, 1] \times [1, 2]$. Try both orders of integration to verify Fubini's theorem.
4.  **Strategic Order Choice:** Evaluate $\iint_R y \cos(xy) \, dA$ over the region $R = [0, \pi/2] \times [0, 1]$. Which order of integration ($dx dy$ or $dy dx$) would you choose and why? Show all steps for your chosen order.
5.  **Separable Function:** Evaluate $\iint_R e^x \sin(y) \, dA$ over the region $R = [0, \ln 2] \times [0, \pi/2]$. Explain how the special form of the integrand simplifies the calculation.