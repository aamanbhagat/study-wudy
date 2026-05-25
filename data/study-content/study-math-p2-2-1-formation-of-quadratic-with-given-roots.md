## 1. What it is — in plain English

Imagine you're solving a puzzle, and someone tells you the answers but doesn't show you the original puzzle. Your job is to work backward and figure out what the original puzzle was. In mathematics, a "quadratic equation" is a specific type of puzzle, usually looking something like $x^2 + 5x + 6 = 0$. The "answers" to this puzzle are called its "roots" (or solutions).

So, "formation of a quadratic with given roots" simply means: if I give you the solutions (the roots) to a quadratic equation, can you build the original quadratic equation that those solutions came from? It's like being given that $x=2$ and $x=3$ are the solutions, and you need to figure out that the original equation was $x^2 - 5x + 6 = 0$.

Think of it as reverse engineering. When you solve a quadratic equation, you break it down into simpler pieces (factors) and then find the roots. This topic is about starting with those roots and putting the pieces back together to reconstruct the original quadratic equation.

It's a fundamental skill that reinforces your understanding of how quadratic equations are structured and how their solutions relate directly to their form.

## 2. Why it matters — real-world applications

Understanding how to form a quadratic equation from its roots might seem abstract, but it's a powerful tool with applications across many fields:

1.  **Physics and Engineering (Projectile Motion):** Imagine launching a rocket or throwing a ball. Its path through the air often follows a parabolic trajectory, which can be described by a quadratic equation. If you know two points where the object lands or reaches a specific height (these could be thought of as "roots" or x-intercepts if we adjust the coordinate system), engineers can use this information to determine the exact quadratic equation describing its flight path. This allows them to predict maximum height, range, and other critical parameters for designing everything from missile trajectories to water fountains.

2.  **Computer Graphics and Animation:** In computer-aided design (CAD) and animation, complex curves and shapes are often built from simpler mathematical functions, including parabolas. If a designer needs a curve to pass through specific points on a screen (e.g., to define the outline of a character's arm or a car's body), knowing how to construct a quadratic (or higher-order polynomial) that has those points as "roots" (or specific values for $x$) is crucial. This allows for smooth, predictable, and mathematically precise rendering of objects.

3.  **Optimization Problems in Economics and Business:** Many real-world scenarios involve optimizing something – maximizing profit, minimizing cost, or finding the ideal production level. Often, the relationship between variables (like price and demand, or production volume and cost) can be approximated by a quadratic function. If market analysis or experimental data provides "break-even" points (where profit is zero, or cost equals revenue), these points act like roots. Businesses can then form the quadratic profit/cost function to understand how changes in price or production affect their bottom line and find the optimal operating point.

4.  **Signal Processing and Antenna Design:** Parabolic shapes are used in satellite dishes and radar antennas because of their unique reflective properties: all incoming parallel rays reflect to a single focal point. If engineers need to design an antenna that focuses signals from specific directions (which can be represented as "roots" in a simplified 2D cross-section), they can use this technique to derive the precise quadratic equation that defines the parabolic curve. This ensures efficient signal collection and transmission.

## 3. Prerequisites — what you must know first

Before diving into forming quadratic equations, ensure you have a solid grasp of these fundamental concepts:

*   **What a Quadratic Equation Is:** An equation of the form $ax^2 + bx + c = 0$, where $a, b, c$ are numbers and $a \neq 0$.
*   **What "Roots" (or Solutions) Are:** The values of the variable (usually $x$) that make the quadratic equation true; graphically, these are the x-intercepts where the parabola crosses the x-axis.
*   **Factoring Simple Quadratics:** The ability to break down a quadratic expression into a product of two linear factors, e.g., $x^2 - 5x + 6 = (x-2)(x-3)$.
*   **The Zero Product Property:** If the product of two or more factors is zero, then at least one of the factors must be zero; i.e., if $A \cdot B = 0$, then $A=0$ or $B=0$.
*   **Basic Algebraic Manipulation:** Skills like expanding expressions (e.g., using FOIL for $(x+a)(x+b)$), distributing terms, and combining like terms.
*   **Understanding of Coefficients:** Knowing what $a, b, c$ represent in $ax^2 + bx + c = 0$.

## 4. The core idea — step by step

Let's break down the process of forming a quadratic equation from its roots. We'll explore two primary methods: the "Factor Method" and the "Sum and Product Method."

### Step 1: Understand the Zero Product Property (The Foundation)

*   **Plain-English Statement:** If you have two numbers or expressions multiplied together, and their total result is zero, then one of those numbers or expressions *must* have been zero to begin with. There's no other way to multiply two non-zero things and get zero.
*   **Small Concrete Example:** If I tell you $(x-5)(x+2) = 0$, then you immediately know that either $x-5$ must equal $0$ (meaning $x=5$) OR $x+2$ must equal $0$ (meaning $x=-2$). These are the roots.
*   **Formal/Mathematical Version:** For any real numbers or expressions $A$ and $B$, if $A \cdot B = 0$, then $A=0$ or $B=0$.
*   **What Could Go Wrong:** Students sometimes forget this property *only* applies when the product is equal to zero. If $(x-5)(x+2) = 7$, you cannot say $x-5=7$ or $x+2=7$.

### Step 2: Turn Roots into Factors (Reverse Zero Product Property)

*   **Plain-English Statement:** If you know a number is a root (a solution) of an equation, you can work backward using the Zero Product Property to figure out what a factor of that equation must have been. If $x=r$ is a root, it means that $x-r$ must have been one of the parts that was set to zero.
*   **Small Concrete Example:**
    *   If $x=5$ is a root, it means $x-5=0$. So, $(x-5)$ is a factor.
    *   If $x=-2$ is a root, it means $x+2=0$. So, $(x+2)$ is a factor.
*   **Formal/Mathematical Version:** If $x=r_1$ and $x=r_2$ are the roots of a quadratic equation, then $(x-r_1)$ and $(x-r_2)$ are linear factors of the quadratic expression.
*   **What Could Go Wrong:** The most common mistake here is a sign error. If a root is $x=3$, the factor is $(x-3)$, not $(x+3)$. If a root is $x=-4$, the factor is $(x-(-4))$, which simplifies to $(x+4)$, not $(x-4)$. Always remember: $x - (\text{the root})$.

### Step 3: Multiply the Factors to Form the Quadratic Expression (The Factor Method)

*   **Plain-English Statement:** Once you have the individual factors from the roots, you multiply them together. This "rebuilds" the quadratic expression that would have been factored in the first place.
*   **Small Concrete Example:** If the factors are $(x-5)$ and $(x+2)$, we multiply them:
    $$(x-5)(x+2) = x(x+2) - 5(x+2)$$
    $$= x^2 + 2x - 5x - 10$$
    $$= x^2 - 3x - 10$$
*   **Formal/Mathematical Version:** Given roots $r_1$ and $r_2$, the quadratic expression (with a leading coefficient of 1) is $(x-r_1)(x-r_2) = x^2 - r_1x - r_2x + r_1r_2 = x^2 - (r_1+r_2)x + r_1r_2$.
*   **What Could Go Wrong:** Algebraic errors during the multiplication process (often called FOIL for binomials: First, Outer, Inner, Last). Forgetting to distribute correctly or making sign errors in the combined terms.

### Step 4: Set the Expression to Zero (Forming the Equation)

*   **Plain-English Statement:** A quadratic *equation* always has an equals sign, usually setting the expression to zero. Since we started by assuming the factors led to zero (from the Zero Product Property), we finish by putting the "equals zero" back.
*   **Small Concrete Example:** From Step 3, we got the expression $x^2 - 3x - 10$. To make it an equation, we simply write:
    $$x^2 - 3x - 10 = 0$$
*   **Formal/Mathematical Version:** The quadratic equation with roots $r_1$ and $r_2$ (and leading coefficient $a=1$) is $(x-r_1)(x-r_2) = 0$, which expands to $x^2 - (r_1+r_2)x + r_1r_2 = 0$.
*   **What Could Go Wrong:** Forgetting the "$=0$" part. An expression like $x^2 - 3x - 10$ is not an equation; it's just a polynomial.

### Step 5 (Generalization): Account for a Leading Coefficient 'a'

*   **Plain-English Statement:** Our constructed quadratic $x^2 - 3x - 10 = 0$ has a "1" in front of the $x^2$. But what if the original quadratic was, say, $2x^2 - 6x - 20 = 0$? This equation also has roots $x=5$ and $x=-2$. Any non-zero number multiplied by the entire quadratic expression will still result in the same roots. So, we often write $a(x-r_1)(x-r_2) = 0$ to represent *any* quadratic with those roots.
*   **Small Concrete Example:** If roots are $x=5$ and $x=-2$, a general form is $a(x-5)(x+2)=0$. If we're told the quadratic passes through a point, say $(1, -12)$, we can substitute $x=1, y=-12$ to find $a$:
    $$-12 = a(1-5)(1+2)$$
    $$-12 = a(-4)(3)$$
    $$-12 = -12a$$
    $$a = 1$$
    In this case, $a=1$, so the equation is $x^2 - 3x - 10 = 0$. If $a$ had been $2$, the equation would be $2(x^2 - 3x - 10) = 0$, or $2x^2 - 6x - 20 = 0$.
*   **Formal/Mathematical Version:** A general quadratic equation with roots $r_1$ and $r_2$ is given by $a(x-r_1)(x-r_2) = 0$, where $a$ is any non-zero real number.
*   **What Could Go Wrong:** Assuming $a$ is always 1. If the problem asks for "a quadratic equation" it's usually fine to assume $a=1$. If it asks for "the quadratic equation" and provides additional information (like a point it passes through), you must find $a$.

### Step 6 (Alternative Method): Using Sum and Product of Roots (Vieta's Formulas)

*   **Plain-English Statement:** There's a clever shortcut! If you have a quadratic equation in the standard form $x^2 + Bx + C = 0$ (where the coefficient of $x^2$ is 1), there's a direct relationship between its roots and its coefficients. The sum of the roots is equal to the negative of the $x$-coefficient ($-B$), and the product of the roots is equal to the constant term ($C$). This means we can directly substitute the sum and product of our given roots into this template.
*   **Small Concrete Example:** Let roots be $r_1=5$ and $r_2=-2$.
    *   Sum of roots: $r_1+r_2 = 5 + (-2) = 3$.
    *   Product of roots: $r_1 \cdot r_2 = 5 \cdot (-2) = -10$.
    *   Using the template $x^2 - (\text{Sum})x + (\text{Product}) = 0$:
        $$x^2 - (3)x + (-10) = 0$$
        $$x^2 - 3x - 10 = 0$$
    This matches the result from the Factor Method!
*   **Formal/Mathematical Version:** For a monic quadratic equation $x^2 + Bx + C = 0$ with roots $r_1$ and $r_2$:
    $$r_1 + r_2 = -B$$
    $$r_1 r_2 = C$$
    Therefore, the quadratic equation can be written as $x^2 - (r_1+r_2)x + (r_1r_2) = 0$. If there's a leading coefficient $a$, it becomes $a[x^2 - (r_1+r_2)x + (r_1r_2)] = 0$.
*   **What Could Go Wrong:** The most common mistake is the sign for the sum of roots. Remember it's $x^2 - (\text{SUM})x + (\text{PRODUCT}) = 0$. The sum itself might be negative, making the middle term positive (e.g., if sum is -5, then $-(-5)x = +5x$).

## 5. Worked examples — multiple, with every step shown

Here are several examples demonstrating both methods and handling different types of roots.

### Example 1: Simple Integer Roots

**Problem:** Form a quadratic equation whose roots are $x=2$ and $x=5$.

**Given:** Roots $r_1=2$, $r_2=5$.
**Want:** A quadratic equation $ax^2 + bx + c = 0$. We'll assume $a=1$ for simplicity unless specified otherwise.

**Method 1: Factor Method**

1.  **Identify factors from roots:**
    *   If $x=2$ is a root, then $x-2=0$. So, $(x-2)$ is a factor.
    *   If $x=5$ is a root, then $x-5=0$. So, $(x-5)$ is a factor.
    *   *Explanation:* We apply the reverse of the Zero Product Property. If $x$ is a root, then subtracting that root from $x$ must result in zero, forming a linear factor.

2.  **Multiply the factors:**
    $$(x-2)(x-5) = 0$$
    *   *Explanation:* The product of the factors must equal zero, as per the Zero Product Property, which is how we find the roots in the first place.

3.  **Expand the expression (using FOIL):**
    $$x \cdot x + x \cdot (-5) + (-2) \cdot x + (-2) \cdot (-5) = 0$$
    $$x^2 - 5x - 2x + 10 = 0$$
    *   *Explanation:* We distribute each term in the first parenthesis to each term in the second parenthesis to expand the product. "FOIL" is a mnemonic for First, Outer, Inner, Last terms.

4.  **Combine like terms:**
    $$x^2 - 7x + 10 = 0$$
    *   *Explanation:* We simplify the expression by adding or subtracting terms that have the same variable and exponent (e.g., $-5x$ and $-2x$).

**Method 2: Sum and Product Method**

1.  **Calculate the sum of the roots:**
    $$r_1 + r_2 = 2 + 5 = 7$$
    *   *Explanation:* We add the given roots together.

2.  **Calculate the product of the roots:**
    $$r_1 \cdot r_2 = 2 \cdot 5 = 10$$
    *   *Explanation:* We multiply the given roots together.

3.  **Substitute into the standard form $x^2 - (\text{Sum})x + (\text{Product}) = 0$:**
    $$x^2 - (7)x + (10) = 0$$
    $$x^2 - 7x + 10 = 0$$
    *   *Explanation:* This formula (derived from Vieta's formulas) directly relates the sum and product of roots to the coefficients of a monic quadratic equation. The coefficient of $x$ is the negative of the sum, and the constant term is the product.

**Final Answer:** The quadratic equation is $\boxed{x^2 - 7x + 10 = 0}$.

*Reflection:* This was a straightforward example with positive integer roots, making both methods easy to apply and verify. It highlights the direct relationship between roots and factors, and roots and coefficients.

---

### Example 2: Roots with Negative Values

**Problem:** Construct a quadratic equation with roots $x=-3$ and $x=4$.

**Given:** Roots $r_1=-3$, $r_2=4$.
**Want:** A quadratic equation $ax^2 + bx + c = 0$. Assume $a=1$.

**Method 1: Factor Method**

1.  **Identify factors from roots:**
    *   If $x=-3$ is a root, then $x-(-3)=0 \implies x+3=0$. So, $(x+3)$ is a factor.
    *   If $x=4$ is a root, then $x-4=0$. So, $(x-4)$ is a factor.
    *   *Explanation:* Remember to correctly handle the negative sign for the root when forming the factor. $x - (\text{negative root})$ becomes $x + (\text{positive number})$.

2.  **Multiply the factors:**
    $$(x+3)(x-4) = 0$$
    *   *Explanation:* The product of these factors must be zero.

3.  **Expand the expression (using FOIL):**
    $$x \cdot x + x \cdot (-4) + 3 \cdot x + 3 \cdot (-4) = 0$$
    $$x^2 - 4x + 3x - 12 = 0$$
    *   *Explanation:* Perform the multiplication carefully, paying attention to signs.

4.  **Combine like terms:**
    $$x^2 - x - 12 = 0$$
    *   *Explanation:* Simplify the expression.

**Method 2: Sum and Product Method**

1.  **Calculate the sum of the roots:**
    $$r_1 + r_2 = -3 + 4 = 1$$
    *   *Explanation:* Add the roots.

2.  **Calculate the product of the roots:**
    $$r_1 \cdot r_2 = (-3) \cdot (4) = -12$$
    *   *Explanation:* Multiply the roots.

3.  **Substitute into the standard form $x^2 - (\text{Sum})x + (\text{Product}) = 0$:**
    $$x^2 - (1)x + (-12) = 0$$
    $$x^2 - x - 12 = 0$$
    *   *Explanation:* Substitute the calculated sum and product into the formula. Be careful with the negative sign for the $x$ term: it's minus the sum.

**Final Answer:** The quadratic equation is $\boxed{x^2 - x - 12 = 0}$.

*Reflection:* This example highlights the importance of careful sign handling, especially when converting negative roots to factors or when dealing with the "negative of the sum" in the second method.

---

### Example 3: Fractional Roots

**Problem:** Find a quadratic equation with roots $x=\frac{1}{2}$ and $x=-\frac{3}{4}$. The equation should have integer coefficients.

**Given:** Roots $r_1=\frac{1}{2}$, $r_2=-\frac{3}{4}$.
**Want:** A quadratic equation $ax^2 + bx + c = 0$ where $a, b, c$ are integers.

**Method 1: Factor Method**

1.  **Identify factors from roots:**
    *   If $x=\frac{1}{2}$ is a root, then $x-\frac{1}{2}=0$. To get an integer coefficient, we can multiply the entire factor by 2: $2(x-\frac{1}{2}) = 2x-1$. So, $(2x-1)$ is a factor.
    *   If $x=-\frac{3}{4}$ is a root, then $x-(-\frac{3}{4})=0 \implies x+\frac{3}{4}=0$. To get an integer coefficient, we can multiply the entire factor by 4: $4(x+\frac{3}{4}) = 4x+3$. So, $(4x+3)$ is a factor.
    *   *Explanation:* When roots are fractions, it's often convenient to clear the denominators within the factors to ensure integer coefficients in the final quadratic. If $x=p/q$, then $qx-p=0$ is a factor.

2.  **Multiply the factors:**
    $$(2x-1)(4x+3) = 0$$
    *   *Explanation:* The product of these integer-coefficient factors will yield a quadratic with integer coefficients.

3.  **Expand the expression (using FOIL):**
    $$(2x)(4x) + (2x)(3) + (-1)(4x) + (-1)(3) = 0$$
    $$8x^2 + 6x - 4x - 3 = 0$$
    *   *Explanation:* Perform the multiplication.

4.  **Combine like terms:**
    $$8x^2 + 2x - 3 = 0$$
    *   *Explanation:* Simplify the expression. All coefficients are integers.

**Method 2: Sum and Product Method**

1.  **Calculate the sum of the roots:**
    $$r_1 + r_2 = \frac{1}{2} + \left(-\frac{3}{4}\right) = \frac{2}{4} - \frac{3}{4} = -\frac{1}{4}$$
    *   *Explanation:* Find a common denominator to add the fractions.

2.  **Calculate the product of the roots:**
    $$r_1 \cdot r_2 = \left(\frac{1}{2}\right) \cdot \left(-\frac{3}{4}\right) = -\frac{3}{8}$$
    *   *Explanation:* Multiply the fractions.

3.  **Substitute into the standard form $x^2 - (\text{Sum})x + (\text{Product}) = 0$:**
    $$x^2 - \left(-\frac{1}{4}\right)x + \left(-\frac{3}{8}\right) = 0$$
    $$x^2 + \frac{1}{4}x - \frac{3}{8} = 0$$
    *   *Explanation:* Substitute the calculated values. Note the double negative for the $x$ term.

4.  **Clear the denominators to get integer coefficients:**
    *   The least common multiple (LCM) of the denominators (1, 4, 8) is 8.
    *   Multiply the entire equation by 8:
        $$8 \cdot \left(x^2 + \frac{1}{4}x - \frac{3}{8}\right) = 8 \cdot 0$$
        $$8x^2 + 8 \cdot \frac{1}{4}x - 8 \cdot \frac{3}{8} = 0$$
        $$8x^2 + 2x - 3 = 0$$
    *   *Explanation:* Multiplying the entire equation by a non-zero constant does not change its roots. We choose the LCM of the denominators to eliminate all fractions and obtain integer coefficients.

**Final Answer:** The quadratic equation with integer coefficients is $\boxed{8x^2 + 2x - 3 = 0}$.

*Reflection:* Fractional roots require careful arithmetic with fractions. The factor method allows you to clear denominators earlier, while the sum and product method requires clearing them at the end. Both are valid.

---

### Example 4: Irrational Roots (Conjugate Pair)

**Problem:** Form a quadratic equation with roots $x=3+\sqrt{2}$ and $x=3-\sqrt{2}$.

**Given:** Roots $r_1=3+\sqrt{2}$, $r_2=3-\sqrt{2}$.
**Want:** A quadratic equation $ax^2 + bx + c = 0$. Assume $a=1$.

**Method 1: Factor Method (More tedious for irrational roots, but possible)**

1.  **Identify factors from roots:**
    *   $x - (3+\sqrt{2}) = 0 \implies (x-3-\sqrt{2})$
    *   $x - (3-\sqrt{2}) = 0 \implies (x-3+\sqrt{2})$
    *   *Explanation:* Form the factors by subtracting each root from $x$.

2.  **Multiply the factors:**
    $$(x-3-\sqrt{2})(x-3+\sqrt{2}) = 0$$
    *   *Explanation:* This is a product of two trinomials. It's helpful to group terms to see a difference of squares pattern. Let $A = (x-3)$ and $B = \sqrt{2}$. Then the expression is $(A-B)(A+B)$.

3.  **Expand the expression (using Difference of Squares):**
    $$( (x-3) - \sqrt{2} ) ( (x-3) + \sqrt{2} ) = 0$$
    $$(x-3)^2 - (\sqrt{2})^2 = 0$$
    *   *Explanation:* Recognize the pattern $(A-B)(A+B) = A^2 - B^2$. Here, $A=(x-3)$ and $B=\sqrt{2}$. This simplifies the multiplication significantly.

4.  **Expand $(x-3)^2$ and simplify $(\sqrt{2})^2$:**
    $$(x^2 - 6x + 9) - 2 = 0$$
    *   *Explanation:* $(x-3)^2 = x^2 - 2(x)(3) + 3^2 = x^2 - 6x + 9$. And $(\sqrt{2})^2 = 2$.

5.  **Combine constant terms:**
    $$x^2 - 6x + 7 = 0$$
    *   *Explanation:* $9-2=7$.

**Method 2: Sum and Product Method (Often preferred for conjugate roots)**

1.  **Calculate the sum of the roots:**
    $$r_1 + r_2 = (3+\sqrt{2}) + (3-\sqrt{2})$$
    $$= 3 + \sqrt{2} + 3 - \sqrt{2}$$
    $$= 3+3 = 6$$
    *   *Explanation:* When adding conjugate irrationals, the irrational parts cancel out, leaving a rational sum.

2.  **Calculate the product of the roots:**
    $$r_1 \cdot r_2 = (3+\sqrt{2})(3-\sqrt{2})$$
    *   *Explanation:* This is a difference of squares pattern $(A+B)(A-B) = A^2 - B^2$.

3.  **Apply difference of squares formula:**
    $$= 3^2 - (\sqrt{2})^2$$
    $$= 9 - 2$$
    $$= 7$$
    *   *Explanation:* The product of conjugate irrationals is always rational.

4.  **Substitute into the standard form $x^2 - (\text{Sum})x + (\text{Product}) = 0$:**
    $$x^2 - (6)x + (7) = 0$$
    $$x^2 - 6x + 7 = 0$$
    *   *Explanation:* Substitute the calculated sum and product.

**Final Answer:** The quadratic equation is $\boxed{x^2 - 6x + 7 = 0}$.

*Reflection:* This example demonstrates that for irrational (or complex) conjugate roots, the sum and product method is typically much faster and less prone to errors because the irrational (or imaginary) parts cancel out, leading directly to integer coefficients. The factor method is still possible but requires careful recognition of the difference of squares.

---

### Example 5: Roots with a Specified Leading Coefficient

**Problem:** Find a quadratic equation with roots $x=1$ and $x=-6$, and whose leading coefficient (the coefficient of $x^2$) is 3.

**Given:** Roots $r_1=1$, $r_2=-6$. Leading coefficient $a=3$.
**Want:** A quadratic equation $ax^2 + bx + c = 0$ where $a=3$.

**Method 1: Factor Method (incorporating 'a')**

1.  **Identify factors from roots:**
    *   If $x=1$ is a root, then $(x-1)$ is a factor.
    *   If $x=-6$ is a root, then $(x+6)$ is a factor.
    *   *Explanation:* Convert roots to factors.

2.  **Form the general quadratic equation with 'a':**
    $$a(x-r_1)(x-r_2) = 0$$
    *   *Explanation:* The general form includes a leading coefficient $a$.

3.  **Substitute the given roots and $a=3$:**
    $$3(x-1)(x+6) = 0$$
    *   *Explanation:* Plug in the values for $a$, $r_1$, and $r_2$.

4.  **Expand the factors first:**
    $$3(x \cdot x + x \cdot 6 - 1 \cdot x - 1 \cdot 6) = 0$$
    $$3(x^2 + 6x - x - 6) = 0$$
    $$3(x^2 + 5x - 6) = 0$$
    *   *Explanation:* It's usually easier to multiply the binomials first, then distribute the leading coefficient.

5.  **Distribute the leading coefficient:**
    $$3x^2 + 3(5x) - 3(6) = 0$$
    $$3x^2 + 15x - 18 = 0$$
    *   *Explanation:* Multiply each term inside the parenthesis by the leading coefficient.

**Method 2: Sum and Product Method (incorporating 'a')**

1.  **Calculate the sum of the roots:**
    $$r_1 + r_2 = 1 + (-6) = -5$$
    *   *Explanation:* Add the roots.

2.  **Calculate the product of the roots:**
    $$r_1 \cdot r_2 = (1) \cdot (-6) = -6$$
    *   *Explanation:* Multiply the roots.

3.  **Form the monic quadratic ($a=1$) using $x^2 - (\text{Sum})x + (\text{Product}) = 0$:**
    $$x^2 - (-5)x + (-6) = 0$$
    $$x^2 + 5x - 6 = 0$$
    *   *Explanation:* Use the standard formula for $a=1$.

4.  **Multiply the entire equation by the given leading coefficient $a=3$:**
    $$3(x^2 + 5x - 6) = 3(0)$$
    $$3x^2 + 15x - 18 = 0$$
    *   *Explanation:* Multiplying the entire equation by a non-zero constant does not change its roots. This applies the specified leading coefficient.

**Final Answer:** The quadratic equation is $\boxed{3x^2 + 15x - 18 = 0}$.

*Reflection:* This example shows how to incorporate a specific leading coefficient. Both methods are equally effective; the key is to remember to multiply the entire base quadratic (with $a=1$) by the specified $a$ value.

## 6. Common mistakes and traps

1.  **Sign Errors in Factors:** The most frequent mistake is incorrectly forming the factors from the roots. If $x=r$ is a root, the factor is $(x-r)$, not $(x+r)$. For example, if a root is $-5$, the factor is $(x-(-5)) = (x+5)$.
2.  **Algebraic Errors During Expansion:** Mistakes in multiplying binomials (FOIL method) are common. This includes incorrect distribution, sign errors, or miscombining like terms (e.g., $x^2 - 5x - 2x + 10$ becoming $x^2 - 3x + 10$ instead of $x^2 - 7x + 10$).
3.  **Forgetting to Set to Zero:** An expression (like $x^2 - 7x + 10$) is not an equation. A quadratic *equation* must be set equal to something, typically zero, as in $x^2 - 7x + 10 = 0$.
4.  **Incorrectly Applying Vieta's Formulas (Sum and Product Method):**
    *   **Sign of the middle term:** Students often forget that the coefficient of the $x$ term is the *negative* of the sum of the roots: $x^2 - (\text{sum})x + (\text{product}) = 0$. If the sum is, say, $-3$, then the middle term becomes $-(-3)x = +3x$.
    *   **Not for non-monic quadratics:** The direct formula $x^2 - (\text{sum})x + (\text{product}) = 0$ only works when the leading coefficient ($a$) is 1. If $a \neq 1$, you must either use $a[x^2 - (\text{sum})x + (\text{product})] = 0$ or remember that $ax^2+bx+c=0$ has roots where $r_1+r_2 = -b/a$ and $r_1r_2 = c/a$.
5.  **Not Clearing Denominators (for fractional roots):** If the problem asks for a quadratic equation with *integer coefficients*, and your initial result has fractions (e.g., from the sum/product method), you must multiply the entire equation by the least common multiple of the denominators to clear them.
6.  **Ignoring the Leading Coefficient 'a':** If the problem specifies a leading coefficient (e.g., "a quadratic with roots 2 and 3, and a leading coefficient of 5"), forgetting to multiply the entire quadratic expression by that coefficient will yield an incorrect answer.

## 7. Textbook-precise explanation

A **quadratic equation** is a polynomial equation of the second degree, typically expressed in the standard form $ax^2 + bx + c = 0$, where $a, b, c$ are real numbers and $a \neq 0$. The values of $x$ that satisfy this equation are called its **roots** or **solutions**.

The formation of a quadratic equation from its given roots relies fundamentally on the **Zero Product Property**. This property states that if the product of two or more factors is zero, then at least one of the factors must be zero. Formally, for real numbers $A$ and $B$, if $A \cdot B = 0$, then $A=0$ or $B=0$.

Given two roots, $r_1$ and $r_2$, a quadratic equation can be formed by two primary methods:

**Method 1: The Factor Method**
If $r_1$ and $r_2$ are the roots of a quadratic equation, then by the Zero Product Property, it must be true that $(x-r_1)=0$ and $(x-r_2)=0$. Consequently, the quadratic equation can be expressed as the product of these linear factors:
$$ (x-r_1)(x-r_2) = 0 $$
Expanding this product yields the standard form:
$$ x^2 - r_1x - r_2x + r_1r_2 = 0 $$
$$ x^2 - (r_1+r_2)x + r_1r_2 = 0 $$
This form assumes a leading coefficient $a=1$. For a general quadratic with any non-zero leading coefficient $a$, the equation is:
$$ a(x-r_1)(x-r_2) = 0 $$
$$ a[x^2 - (r_1+r_2)x + r_1r_2] = 0 $$

**Method 2: The Sum and Product of Roots Method (Vieta's Formulas)**
For a monic quadratic equation $x^2 + Bx + C = 0$ (where the leading coefficient is 1) with roots $r_1$ and $r_2$, there exist direct relationships between the roots and the coefficients $B$ and $C$. These relationships are known as Vieta's formulas for quadratic equations:
1.  The sum of the roots is equal to the negative of the coefficient of $x$:
    $$ r_1 + r_2 = -B $$
2.  The product of the roots is equal to the constant term:
    $$ r_1 r_2 = C $$
Substituting these relationships back into the monic quadratic form $x^2 + Bx + C = 0$, we get:
$$ x^2 - (r_1+r_2)x + (r_1r_2) = 0 $$
For a general quadratic equation $ax^2 + bx + c = 0$, dividing by $a$ (since $a \neq 0$) yields $x^2 + \frac{b}{a}x + \frac{c}{a} = 0$. Comparing this to the monic form, we can see that:
$$ r_1 + r_2 = -\frac{b}{a} $$
$$ r_1 r_2 = \frac{c}{a} $$
Therefore, if given roots $r_1$ and $r_2$ and a leading coefficient $a$, the quadratic equation can be constructed as:
$$ a \left[ x^2 - (r_1+r_2)x + (r_1r_2) \right] = 0 $$

This rigorous approach ensures that any quadratic equation derived from given roots will indeed have those roots as its solutions.

*References: Stewart, Precalculus: Mathematics for Calculus, 7th Ed., Chapter 2.5; Larson, Algebra and Trigonometry, 10th Ed., Chapter 2.4.*

## 8. ASCII diagrams

Here's a diagram illustrating the roots of a quadratic equation as the x-intercepts of its parabolic graph.

```text
       ^ y
       |
       |     * (vertex)
       |    / \
       |   /   \
-------+--*-----*------> x
       |  r1    r2
       |
       |
       |
```

**Description of the Figure:**
The diagram above shows a Cartesian coordinate system with an x-axis (horizontal) and a y-axis (vertical). A parabola, which is the graph of a quadratic function $y = ax^2+bx+c$, is drawn opening upwards. The points where the parabola intersects the x-axis are labeled $r_1$ and $r_2$. These points, $(r_1, 0)$ and $(r_2, 0)$, represent the roots (or solutions) of the quadratic equation $ax^2+bx+c=0$. At these specific x-values, the y-value of the function is zero. The highest or lowest point of the parabola is called the vertex, indicated by a '*'.

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Think of it as "Roots -> Factors -> FOIL -> Equation."
    *   **R**oots: The starting points.
    *   **F**actors: Turn each root $r$ into a factor $(x-r)$. Imagine roots are like puzzle pieces, and factors are the outlines of those pieces.
    *   **F**OIL (or Sum & Product): Multiply the factors back together. This is like assembling the puzzle pieces.
    *   **E**quation: Set the assembled expression equal to zero. This is the finished puzzle.

    For the Sum and Product method, remember "S for Sum, P for Product." The equation is $x^2 - (\text{S})x + (\text{P}) = 0$. Notice the minus sign before the sum! Imagine "S" is a snake, and it hisses (negative sound) before it strikes.

2.  **Formulas/Facts to Overlearn:**
    You absolutely MUST commit these two forms to memory:
    1.  **The Factor Form:** $a(x-r_1)(x-r_2) = 0$
    2.  **The Sum and Product Form (for $a=1$):** $x^2 - (\text{Sum of roots})x + (\text{Product of roots}) = 0$

    These two formulas are the workhorses of this topic. Practice writing them down until they are second nature.

3.  **Spaced-Repetition Schedule:**
    To embed this knowledge deeply, actively recall and practice this concept:
    *   **Day 1:** After completing this lesson, do the self-check questions.
    *   **Day 3:** Review the core idea and worked examples. Try to re-derive the formulas.
    *   **Day 7:** Solve 2-3 new problems without looking at your notes.
    *   **Day 16:** Explain the concept aloud to an imaginary student or a peer.
    *   **Day 35:** Attempt a challenging problem that combines this with other concepts (e.g., finding roots first, then forming a new quadratic).

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the formulas, you can always rebuild them from the ground up using the Zero Product Property:
    *   **Start with the definition of roots:** If $r_1$ and $r_2$ are roots, it means that when $x$ takes these values, the quadratic equation is true.
    *   **Turn roots into simple equations:**
        If $x=r_1$, then $x-r_1=0$.
        If $x=r_2$, then $x-r_2=0$.
    *   **Apply the Zero Product Property in reverse:** If two expressions are individually equal to zero, their product must also be zero.
        So, $(x-r_1)(x-r_2)=0$.
    *   **Expand the product:** Use FOIL (First, Outer, Inner, Last) or general distribution.
        $x \cdot x + x \cdot (-r_2) + (-r_1) \cdot x + (-r_1) \cdot (-r_2) = 0$
        $x^2 - r_2x - r_1x + r_1r_2 = 0$
    *   **Factor out $x$ from the middle terms:**
        $x^2 - (r_1+r_2)x + r_1r_2 = 0$.
    *   **Recognize the sum and product:** You'll see that the coefficient of $x$ is the negative of the sum of the roots, and the constant term is the product of the roots. This re-derives the second formula.
    *   **Generalize with 'a':** Remember that multiplying the entire equation by any non-zero constant $a$ does not change the roots. So, $a(x-r_1)(x-r_2)=0$ is the most general form.

## 10. Connections — what this leads to

Mastering the formation of quadratic equations from roots is a foundational skill that unlocks several more advanced topics in mathematics:

1.  **Solving Higher-Degree Polynomials:** The idea of converting roots into factors and multiplying them extends directly to cubic, quartic, and higher-degree polynomials. If you know the roots of a polynomial, you can always write it in factored form: $P(x) = a(x-r_1)(x-r_2)...(x-r_n)$.
2.  **Complex Numbers and Conjugate Pairs:** When a quadratic equation has complex roots (e.g., $3+2i$), these roots always appear in conjugate pairs (e.g., $3-2i$). Understanding how to form a quadratic from these roots shows why the coefficients of such quadratics are always real numbers, as the imaginary parts cancel out in the sum and product.
3.  **Rational Root Theorem:** This theorem helps find potential rational roots of a polynomial. Once a rational root is found, it can be factored out, reducing the degree of the polynomial, making it easier to find the remaining roots (which might then be used to form a quadratic factor).
4.  **Polynomial Interpolation:** Given a set of points, polynomial interpolation is the process of finding a polynomial whose graph passes through all those points. While this topic often uses methods like Lagrange interpolation, the underlying principle of constructing a polynomial from its "roots" (or specific x-values) is related.
5.  **Graphing Parabolas:** Knowing the roots of a quadratic equation immediately tells you the x-intercepts of its parabolic graph. This is crucial for sketching the graph and understanding its behavior.
6.  **Calculus and Optimization:** In calculus, finding the roots of the derivative of a function (which is often a quadratic) helps locate critical points for optimization problems (finding maximums or minimums). Understanding the structure of these quadratic equations is vital.
7.  **Algebraic Structures and Field Theory:** At a much higher level, the relationship between roots and coefficients (Vieta's formulas) is a cornerstone of Galois theory, which studies the symmetries of polynomial equations and their roots within abstract algebraic structures.

## 11. Self-check questions

1.  Form a quadratic equation whose roots are $x=6$ and $x=-1$.
2.  What is a quadratic equation with roots $x=-5$ and $x=0$?
3.  Construct a quadratic equation with integer coefficients that has roots $x=\frac{2}{3}$ and $x=-\frac{1}{4}$.
4.  Find a quadratic equation with roots $x=2+\sqrt{3}$ and $x=2-\sqrt{3}$.
5.  A quadratic equation has roots $x=3$ and $x=-2$. If the parabola representing this equation passes through the point $(1, -12)$, what is the specific quadratic equation?