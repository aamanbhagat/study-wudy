## 1. What it is — in plain English

Imagine you have two fixed points, let's call them "focus 1" and "focus 2" (foci is the plural). Now, imagine a point moving around in such a way that if you measure its distance to focus 1 and its distance to focus 2, and then subtract one distance from the other, the *difference* always stays the same.

This special path that the moving point traces out is called a **hyperbola**. It looks like two separate, open curves that mirror each other, kind of like two giant, opposing parabolas.

The "difference of focal radii" simply means the result you get when you subtract the distance from a point on the hyperbola to one focus from its distance to the other focus. This value, we find, is always a specific constant number.

This constant difference is always equal to $2a$, where 'a' is a very important length related to the hyperbola's size and shape. Think of 'a' as half the distance between the two closest points on the hyperbola's two branches. So, no matter where you pick a point on the hyperbola, if you measure its distances to the two foci, their difference will always be $2a$.

## 2. Why it matters — real-world applications

The "difference of focal radii = 2a" property is not just a mathematical curiosity; it's the fundamental principle behind several crucial real-world technologies and natural phenomena.

1.  **LORAN (LOng RAnge Navigation) and GPS Augmentation:** Before GPS became ubiquitous, systems like LORAN (and its modern successors) used this hyperbolic property. A master radio station and several secondary stations would transmit synchronized radio pulses. A ship or aircraft would measure the *time difference of arrival (TDOA)* of these pulses from different pairs of stations. Since radio waves travel at a constant speed, a constant time difference corresponds to a constant *distance difference*. Each pair of stations defines a hyperbola on which the receiver must lie. By using two or more pairs of stations, the receiver's position is pinpointed at the intersection of these hyperbolas. Modern GPS systems use similar TDOA principles for high-precision augmentation.

2.  **Sound Ranging and Artillery Location:** Similar to LORAN, this property is used to locate the source of a sound, such as an enemy artillery piece. Multiple microphones are strategically placed. When a shell is fired, the sound reaches each microphone at a slightly different time. By analyzing the time differences of arrival at various microphone pairs, hyperbolas can be constructed, and their intersection reveals the origin of the sound. This technique has been used in warfare for over a century.

3.  **Astronomy and Spacecraft Trajectories:** Objects in space, such as comets or spacecraft performing "gravitational slingshots" around planets, can follow hyperbolic trajectories. If an object has enough speed to escape the gravitational pull of a celestial body, its path will be a hyperbola with the celestial body at one focus. This property is essential for mission planners at agencies like NASA or ESA to calculate and predict the paths of probes and satellites, ensuring they reach their destinations or achieve desired escape velocities.

4.  **Design of Optical Instruments (Hyperbolic Mirrors):** Hyperbolic mirrors are used in various optical systems, particularly in reflecting telescopes like the Cassegrain and Gregorian designs. A hyperbolic mirror has the property that light rays directed towards one focus are reflected *as if* they came from the other focus. This allows for compact telescope designs where light is efficiently redirected to a secondary mirror and then to an eyepiece or detector, reducing the overall length of the instrument while maintaining a long effective focal length.

## 3. Prerequisites — what you must know first

To fully grasp the "difference of focal radii = 2a" property, ensure you are comfortable with the following foundational concepts:

*   **Coordinate Geometry Basics:** Understanding how points are represented in a Cartesian coordinate system $(x,y)$, and the concepts of origin, axes, and quadrants.
*   **Distance Formula:** The ability to calculate the distance between two points $(x_1, y_1)$ and $(x_2, y_2)$ using the formula $d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$. This is absolutely fundamental, as focal radii are distances.
*   **Basic Algebra:** Proficiency in manipulating algebraic expressions, including squaring binomials, solving linear and quadratic equations, and working with square roots.
*   **Definition of a Hyperbola:** A general understanding of what a hyperbola is: its two separate branches, its center, vertices, foci, and asymptotes. You should know that it's one of the conic sections formed by intersecting a double cone with a plane.
*   **Ellipse Definition (for contrast):** While not strictly a prerequisite for *this* property, knowing that an ellipse is defined by the *sum* of focal radii being constant ($PF_1 + PF_2 = 2a$) provides a valuable comparative context and helps avoid confusion.

## 4. The core idea — step by step

Let's break down the "difference of focal radii = 2a" property piece by piece, building our understanding intuitively and then formally.

### Step 1: Understanding the Hyperbola's Distinctive Shape

**Plain English:** A hyperbola isn't a closed loop like a circle or an ellipse. It's made of two separate, mirror-image curves that open outwards. These two curves never meet. Each curve gets progressively straighter as it moves away from the center, approaching imaginary lines called asymptotes.

**Concrete Example:** Imagine two identical, giant "U" shapes facing away from each other, like two open clam shells. That's roughly what a hyperbola looks like.

**Formal/Mathematical Version:** A hyperbola is a conic section formed by the intersection of a plane with a double-napped cone, where the plane intersects both parts of the cone. It consists of two disconnected branches.

**What could go wrong:** Confusing the hyperbola with a parabola (which has only one focus and one directrix) or an ellipse (which is a single closed curve). Remember, two branches!

### Step 2: Introducing the Foci and Focal Radii

**Plain English:** Just like an ellipse, a hyperbola has two special internal points called **foci** (plural of focus). These points are key to its definition. For any point you pick on *either* of the hyperbola's two branches, the distance from that point to one focus is called a **focal radius**, and the distance to the other focus is also a focal radius.

**Concrete Example:** Let's say our two foci are $F_1$ and $F_2$. If you pick a point $P$ on the hyperbola, then $PF_1$ is the distance from $P$ to $F_1$, and $PF_2$ is the distance from $P$ to $F_2$. These are our focal radii.

**Formal/Mathematical Version:** Let the two foci be $F_1$ and $F_2$. For any point $P(x,y)$ on the hyperbola, the segments $PF_1$ and $PF_2$ are called the focal radii. Their lengths are given by the distance formula.

**What could go wrong:** Forgetting that there are *two* foci, or thinking they are on the curve itself (they are usually inside the "bend" of each branch, or between the branches for a vertical hyperbola).

### Step 3: The Constant Difference Property

**Plain English:** Here's the magic! If you pick *any* point $P$ on a hyperbola, calculate its distance to $F_1$ ($PF_1$) and its distance to $F_2$ ($PF_2$), and then subtract the smaller distance from the larger one, that result will *always* be the same number. It's a constant. This is the defining characteristic of a hyperbola.

**Concrete Example:** Imagine $F_1$ is at $(-5,0)$ and $F_2$ is at $(5,0)$. If you pick a point $P_1$ on the hyperbola and find $PF_1 = 12$ and $PF_2 = 6$, then their difference is $12-6=6$. If you pick another point $P_2$ on the hyperbola and find $PF_1 = 10$ and $PF_2 = 4$, their difference is also $10-4=6$. This constant difference is always 6 in this example.

**Formal/Mathematical Version:** For any point $P$ on a hyperbola with foci $F_1$ and $F_2$, the absolute difference of its distances to the foci is a constant value.
$$|PF_1 - PF_2| = \text{constant}$$

**What could go wrong:** Confusing this with the ellipse's property (where the *sum* of focal radii is constant). Also, forgetting the absolute value, as the point could be on either branch, meaning $PF_1$ could be greater than $PF_2$ or vice-versa.

### Step 4: Quantifying the Constant Difference as $2a$

**Plain English:** That constant difference we just talked about isn't just *any* number; it's always equal to $2a$. What's 'a'? 'a' is a specific length related to the hyperbola's main axis. If the hyperbola opens horizontally (left and right), 'a' is the distance from the center of the hyperbola to one of its **vertices** (the points where the hyperbola is closest to its center). The distance between the two vertices is $2a$. This $2a$ is called the length of the **transverse axis**.

**Concrete Example:** If the hyperbola's center is at the origin $(0,0)$ and its vertices are at $(-3,0)$ and $(3,0)$, then $a=3$. The distance between the vertices is $2a = 6$. So, for any point $P$ on this hyperbola, $|PF_1 - PF_2|$ will always be 6.

**Formal/Mathematical Version:** The constant difference is equal to $2a$, where $a$ is the distance from the center of the hyperbola to one of its vertices. The segment connecting the two vertices is called the transverse axis, and its length is $2a$.
$$|PF_1 - PF_2| = 2a$$
If $P$ is on the right branch of a horizontal hyperbola, $PF_1 - PF_2 = 2a$. If $P$ is on the left branch, $PF_2 - PF_1 = 2a$.

**What could go wrong:** Misidentifying 'a'. Remember, 'a' is always associated with the vertices and the transverse axis. In the standard equation, $a^2$ is under the positive term.

### Step 5: Visualizing the Property at a Vertex

**Plain English:** Let's pick a very specific point on the hyperbola to confirm this $2a$ idea: a vertex. Imagine a hyperbola centered at the origin, opening left and right. Its vertices are at $(a,0)$ and $(-a,0)$. Its foci are at $(c,0)$ and $(-c,0)$, where $c > a$.
Consider the right vertex, $V_2 = (a,0)$.
The distance from $V_2$ to $F_1$ (at $(-c,0)$) is $a - (-c) = a+c$.
The distance from $V_2$ to $F_2$ (at $(c,0)$) is $c - a$.
The difference is $(a+c) - (c-a) = a+c-c+a = 2a$.
This confirms that the constant difference *is* indeed $2a$.

**Concrete Example:** Let $a=3$ and $c=5$. Foci are at $(-5,0)$ and $(5,0)$. Vertices are at $(-3,0)$ and $(3,0)$.
Consider the vertex $V_2 = (3,0)$.
$PF_1$ (distance from $(3,0)$ to $(-5,0)$) = $\sqrt{(3 - (-5))^2 + (0-0)^2} = \sqrt{8^2} = 8$.
$PF_2$ (distance from $(3,0)$ to $(5,0)$) = $\sqrt{(3 - 5)^2 + (0-0)^2} = \sqrt{(-2)^2} = 2$.
$|PF_1 - PF_2| = |8 - 2| = 6$.
And $2a = 2(3) = 6$. It matches!

**Formal/Mathematical Version:** For a hyperbola centered at the origin with foci $F_1(-c,0)$ and $F_2(c,0)$ and vertices $V_1(-a,0)$ and $V_2(a,0)$:
At vertex $V_2(a,0)$:
$PF_1 = \text{distance}(V_2, F_1) = \sqrt{(a - (-c))^2 + (0-0)^2} = \sqrt{(a+c)^2} = a+c$ (since $a,c > 0$).
$PF_2 = \text{distance}(V_2, F_2) = \sqrt{(a - c)^2 + (0-0)^2} = \sqrt{(a-c)^2} = |a-c| = c-a$ (since $c > a$).
$|PF_1 - PF_2| = |(a+c) - (c-a)| = |a+c-c+a| = |2a| = 2a$.

**What could go wrong:** Forgetting that $c > a$ for a hyperbola, which is crucial for simplifying $|a-c|$ to $c-a$.

### Step 6: The Mathematical Formulation (Leading to the Equation)

**Plain English:** Now we take everything we've learned and write it down using coordinates and the distance formula. This is the starting point for deriving the standard equation of a hyperbola. We set up an equation where the difference of the distances from a generic point $(x,y)$ to the two foci equals $2a$.

**Concrete Example:** Let the foci be $F_1(-c,0)$ and $F_2(c,0)$. Let $P(x,y)$ be any point on the hyperbola.
The distance from $P$ to $F_1$ is $\sqrt{(x - (-c))^2 + (y-0)^2} = \sqrt{(x+c)^2 + y^2}$.
The distance from $P$ to $F_2$ is $\sqrt{(x - c)^2 + (y-0)^2} = \sqrt{(x-c)^2 + y^2}$.
So, the core equation is $\left|\sqrt{(x+c)^2 + y^2} - \sqrt{(x-c)^2 + y^2}\right| = 2a$.

**Formal/Mathematical Version:** For a hyperbola centered at the origin $(0,0)$ with foci $F_1(-c,0)$ and $F_2(c,0)$, and a point $P(x,y)$ on the hyperbola, the defining property is:
$$ \left| \sqrt{(x - (-c))^2 + (y-0)^2} - \sqrt{(x - c)^2 + (y-0)^2} \right| = 2a $$
$$ \left| \sqrt{(x+c)^2 + y^2} - \sqrt{(x-c)^2 + y^2} \right| = 2a $$
This can be written as:
$$ \sqrt{(x+c)^2 + y^2} - \sqrt{(x-c)^2 + y^2} = \pm 2a $$
The choice of $\pm$ depends on which branch the point $P(x,y)$ lies on.

**What could go wrong:** Algebraic errors when trying to simplify this equation. It involves isolating one radical, squaring both sides, simplifying, isolating the remaining radical, and squaring again. It's a common source of mistakes.

## 5. Worked examples — multiple, with every step shown

### Example 1: Verifying the property for a given point

**Problem:** A hyperbola has foci at $F_1(-5,0)$ and $F_2(5,0)$. If a point $P(4\sqrt{2}, 3)$ lies on the hyperbola, verify that the difference of its focal radii is $2a$, given that $a=4$.

**What's given:**
*   Foci: $F_1(-5,0)$, $F_2(5,0)$ (so $c=5$)
*   Point on hyperbola: $P(4\sqrt{2}, 3)$
*   Value of $a$: $a=4$

**What we want:** Verify $|PF_1 - PF_2| = 2a$.

**Solution:**

1.  **Calculate $PF_1$ (distance from $P$ to $F_1$):**
    $$PF_1 = \sqrt{(x_P - x_{F_1})^2 + (y_P - y_{F_1})^2}$$
    $$PF_1 = \sqrt{(4\sqrt{2} - (-5))^2 + (3 - 0)^2}$$
    *This is the distance formula applied to point P and focus F1.*
    $$PF_1 = \sqrt{(4\sqrt{2} + 5)^2 + 3^2}$$
    *Simplify the expression inside the square root.*
    $$PF_1 = \sqrt{((4\sqrt{2})^2 + 2(4\sqrt{2})(5) + 5^2) + 9}$$
    *Expand the squared term $(A+B)^2 = A^2 + 2AB + B^2$.*
    $$PF_1 = \sqrt{(16 \times 2 + 40\sqrt{2} + 25) + 9}$$
    *Calculate $(4\sqrt{2})^2 = 16 \times 2 = 32$.*
    $$PF_1 = \sqrt{32 + 40\sqrt{2} + 25 + 9}$$
    *Combine constant terms.*
    $$PF_1 = \sqrt{66 + 40\sqrt{2}}$$
    *This is the length of the first focal radius.*

2.  **Calculate $PF_2$ (distance from $P$ to $F_2$):**
    $$PF_2 = \sqrt{(x_P - x_{F_2})^2 + (y_P - y_{F_2})^2}$$
    *This is the distance formula applied to point P and focus F2.*
    $$PF_2 = \sqrt{(4\sqrt{2} - 5)^2 + (3 - 0)^2}$$
    *Simplify the expression inside the square root.*
    $$PF_2 = \sqrt{((4\sqrt{2})^2 - 2(4\sqrt{2})(5) + 5^2) + 9}$$
    *Expand the squared term $(A-B)^2 = A^2 - 2AB + B^2$.*
    $$PF_2 = \sqrt{(16 \times 2 - 40\sqrt{2} + 25) + 9}$$
    *Calculate $(4\sqrt{2})^2 = 16 \times 2 = 32$.*
    $$PF_2 = \sqrt{32 - 40\sqrt{2} + 25 + 9}$$
    *Combine constant terms.*
    $$PF_2 = \sqrt{66 - 40\sqrt{2}}$$
    *This is the length of the second focal radius.*

3.  **Calculate the difference $|PF_1 - PF_2|$:**
    We need to evaluate $\sqrt{66 + 40\sqrt{2}}$ and $\sqrt{66 - 40\sqrt{2}}$.
    Notice that $40\sqrt{2} = \sqrt{1600 \times 2} = \sqrt{3200}$.
    Also, $66^2 = 4356$.
    We can simplify nested radicals of the form $\sqrt{A \pm \sqrt{B}}$ if $A^2 - B$ is a perfect square. Here, $A=66$, $\sqrt{B}=40\sqrt{2}$. $A^2 - B = 66^2 - (40\sqrt{2})^2 = 4356 - 3200 = 1156 = 34^2$.
    Using the formula $\sqrt{A \pm \sqrt{B}} = \sqrt{\frac{A+\sqrt{A^2-B}}{2}} \pm \sqrt{\frac{A-\sqrt{A^2-B}}{2}}$:
    For $PF_1 = \sqrt{66 + \sqrt{3200}}$:
    $PF_1 = \sqrt{\frac{66+34}{2}} + \sqrt{\frac{66-34}{2}} = \sqrt{\frac{100}{2}} + \sqrt{\frac{32}{2}} = \sqrt{50} + \sqrt{16} = 5\sqrt{2} + 4$.
    *This simplifies the first focal radius.*
    For $PF_2 = \sqrt{66 - \sqrt{3200}}$:
    $PF_2 = \sqrt{\frac{66+34}{2}} - \sqrt{\frac{66-34}{2}} = \sqrt{\frac{100}{2}} - \sqrt{\frac{32}{2}} = \sqrt{50} - \sqrt{16} = 5\sqrt{2} - 4$.
    *This simplifies the second focal radius.*

    Now, calculate the difference:
    $|PF_1 - PF_2| = |(5\sqrt{2} + 4) - (5\sqrt{2} - 4)|$
    *Substitute the simplified radical expressions.*
    $|PF_1 - PF_2| = |5\sqrt{2} + 4 - 5\sqrt{2} + 4|$
    *Distribute the negative sign.*
    $|PF_1 - PF_2| = |8|$
    *Simplify the expression.*
    $|PF_1 - PF_2| = 8$
    *The absolute difference is 8.*

4.  **Compare with $2a$:**
    Given $a=4$, so $2a = 2 \times 4 = 8$.
    *Calculate the expected value of 2a.*

5.  **Conclusion:**
    Since $|PF_1 - PF_2| = 8$ and $2a = 8$, the property is verified.

**Reflection:** This example was tricky because it involved simplifying nested square roots. Recognizing the pattern for simplifying $\sqrt{A \pm \sqrt{B}}$ was key. It also highlighted the importance of careful algebraic expansion.

### Example 2: Finding a missing parameter using the property

**Problem:** A hyperbola has foci at $F_1(-6,0)$ and $F_2(6,0)$. A point $P(x,y)$ on the hyperbola has $PF_1 = 15$. If the constant difference of focal radii is 8, find $PF_2$ and the value of $a$.

**What's given:**
*   Foci: $F_1(-6,0)$, $F_2(6,0)$ (so $c=6$)
*   One focal radius: $PF_1 = 15$
*   Constant difference: $|PF_1 - PF_2| = 8$

**What we want:** $PF_2$ and $a$.

**Solution:**

1.  **Use the constant difference property to find $PF_2$:**
    We know $|PF_1 - PF_2| = 8$.
    *This is the defining property of the hyperbola.*
    Substitute $PF_1 = 15$:
    $|15 - PF_2| = 8$
    *Substitute the given value.*
    This means there are two possibilities for $(15 - PF_2)$:
    Case 1: $15 - PF_2 = 8$
    Case 2: $15 - PF_2 = -8$
    *The absolute value means the expression inside can be positive or negative 8.*

    Solve Case 1:
    $15 - PF_2 = 8$
    $PF_2 = 15 - 8$
    $PF_2 = 7$
    *Isolate PF2.*

    Solve Case 2:
    $15 - PF_2 = -8$
    $PF_2 = 15 + 8$
    $PF_2 = 23$
    *Isolate PF2.*

    Now, we need to determine which value of $PF_2$ is correct. We know that for any point on a hyperbola, the sum of the distances to the foci must be greater than the distance between the foci ($PF_1 + PF_2 > 2c$).
    The distance between the foci $2c = 2 \times 6 = 12$.
    *Recall that c is the distance from the center to a focus.*

    Check Case 1: $PF_1 + PF_2 = 15 + 7 = 22$.
    Since $22 > 12$, this is a valid possibility.

    Check Case 2: $PF_1 + PF_2 = 15 + 23 = 38$.
    Since $38 > 12$, this is also a valid possibility.

    However, for a point on a hyperbola, one focal radius must be significantly larger than the other. The point $P(x,y)$ is on one specific branch. If $P$ is on the right branch (closer to $F_2$), then $PF_2 < PF_1$, and $PF_1 - PF_2 = 2a$. If $P$ is on the left branch (closer to $F_1$), then $PF_1 < PF_2$, and $PF_2 - PF_1 = 2a$.
    In our problem, $PF_1=15$. If $PF_2=7$, then $PF_1 - PF_2 = 15 - 7 = 8$. This means the point is on the right branch.
    If $PF_2=23$, then $PF_2 - PF_1 = 23 - 15 = 8$. This means the point is on the left branch.
    Both values are mathematically possible for a point on *some* hyperbola with these foci and $2a=8$. The problem doesn't specify which branch. However, in typical problems, if $PF_1$ is given, $PF_2$ will be the value that results in a positive difference $PF_1 - PF_2 = 2a$ if $P$ is on the right branch, or $PF_2 - PF_1 = 2a$ if $P$ is on the left branch.
    Without knowing the coordinates of P, we cannot definitively say which branch it is on. However, if we assume the standard form where $F_1$ is $(-c,0)$ and $F_2$ is $(c,0)$, and $P$ is on the *right* branch, then $PF_1 > PF_2$.
    So, if $PF_1 = 15$, then $PF_2$ must be 7.
    **$PF_2 = 7$**
    *In general, the problem implies a single solution for PF2, which is determined by the branch the point lies on. Assuming $P$ is on the branch where $PF_1$ is the larger distance.*

2.  **Find the value of $a$:**
    We know that the constant difference of focal radii is $2a$.
    Given constant difference $= 8$.
    So, $2a = 8$.
    $a = \frac{8}{2}$
    $a = 4$
    *Divide by 2 to find a.*

**Final Answer:**
$PF_2 = \textbf{7}$
$a = \textbf{4}$

**Reflection:** The main trap here was handling the absolute value. Both $PF_2=7$ and $PF_2=23$ satisfy $|15 - PF_2| = 8$. The decision to choose $PF_2=7$ relies on the implicit assumption that $P$ is on the branch where $PF_1 > PF_2$ (i.e., the right branch, given $F_1$ is to the left of $F_2$). Without further information about the point's coordinates, we cannot strictly rule out $PF_2=23$. However, in most contexts, the problem intends for a single, specific answer.

### Example 3: Finding the equation of a hyperbola using the property

**Problem:** Find the equation of the hyperbola with foci at $F_1(-3,0)$ and $F_2(3,0)$, and whose constant difference of focal radii is 4.

**What's given:**
*   Foci: $F_1(-3,0)$, $F_2(3,0)$ (so $c=3$)
*   Constant difference of focal radii: $2a = 4$

**What we want:** The standard equation of the hyperbola.

**Solution:**

1.  **Determine 'a' from the constant difference:**
    We are given that the constant difference is $2a = 4$.
    *This is the direct application of the property.*
    Therefore, $a = \frac{4}{2} = 2$.
    *Solve for a.*

2.  **Determine 'c' from the foci:**
    The foci are at $(\pm c, 0)$. Given $F_1(-3,0)$ and $F_2(3,0)$, we have $c=3$.
    *Identify c from the given foci coordinates.*

3.  **Find 'b' using the relationship $c^2 = a^2 + b^2$:**
    For a hyperbola, the relationship between $a, b,$ and $c$ is $c^2 = a^2 + b^2$.
    *This is a fundamental relationship for hyperbolas.*
    Substitute $a=2$ and $c=3$:
    $3^2 = 2^2 + b^2$
    *Substitute the values of a and c.*
    $9 = 4 + b^2$
    *Calculate the squares.*
    $b^2 = 9 - 4$
    *Isolate b-squared.*
    $b^2 = 5$
    *Calculate the value.*
    So, $b = \sqrt{5}$.

4.  **Write the standard equation of the hyperbola:**
    Since the foci are on the x-axis ($(\pm c, 0)$), this is a horizontal hyperbola, centered at the origin $(0,0)$.
    *The location of the foci tells us the orientation of the transverse axis.*
    The standard form for a horizontal hyperbola centered at the origin is:
    $$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$$
    *Recall the standard form.*
    Substitute $a^2 = 2^2 = 4$ and $b^2 = 5$:
    $$\frac{x^2}{4} - \frac{y^2}{5} = 1$$
    *Substitute the calculated values of a-squared and b-squared.*

**Final Answer:**
The equation of the hyperbola is $\boxed{\frac{x^2}{4} - \frac{y^2}{5} = 1}$.

**Reflection:** This example demonstrates how the "difference of focal radii = 2a" property directly provides the value of 'a', which is crucial for constructing the hyperbola's equation. The relationship $c^2 = a^2 + b^2$ is then used to find 'b', completing the necessary parameters.

### Example 4: Using the property to find a coordinate

**Problem:** A hyperbola is centered at the origin with foci $F_1(-c,0)$ and $F_2(c,0)$. The constant difference of focal radii is $2a=10$. If $c= \sqrt{41}$, find the $y$-coordinate of a point $P(7, y)$ on the hyperbola.

**What's given:**
*   Center: $(0,0)$
*   Foci: $F_1(-c,0)$, $F_2(c,0)$
*   Constant difference: $2a=10$ (so $a=5$)
*   Value of $c$: $c=\sqrt{41}$
*   Point on hyperbola: $P(7, y)$

**What we want:** The $y$-coordinate of point $P$.

**Solution:**

1.  **Determine $a$ and $c$:**
    Given $2a=10$, so $a=5$.
    Given $c=\sqrt{41}$.
    *Extract a and c from the problem statement.*

2.  **Find $b^2$ using the relationship $c^2 = a^2 + b^2$:**
    $c^2 = a^2 + b^2$
    *This is the fundamental relationship for hyperbolas.*
    $(\sqrt{41})^2 = 5^2 + b^2$
    *Substitute the values of a and c.*
    $41 = 25 + b^2$
    *Calculate the squares.*
    $b^2 = 41 - 25$
    *Isolate b-squared.*
    $b^2 = 16$
    *Calculate the value.*

3.  **Write the standard equation of the hyperbola:**
    Since the foci are on the x-axis, it's a horizontal hyperbola centered at the origin.
    *The foci being on the x-axis means the transverse axis is horizontal.*
    The standard equation is:
    $$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$$
    *Recall the standard form.*
    Substitute $a^2 = 5^2 = 25$ and $b^2 = 16$:
    $$\frac{x^2}{25} - \frac{y^2}{16} = 1$$
    *Substitute the calculated values.*

4.  **Substitute the point $P(7,y)$ into the equation to find $y$:**
    The point $P(7,y)$ lies on the hyperbola, so its coordinates must satisfy the equation.
    $$\frac{7^2}{25} - \frac{y^2}{16} = 1$$
    *Substitute $x=7$ into the hyperbola's equation.*
    $$\frac{49}{25} - \frac{y^2}{16} = 1$$
    *Calculate $7^2$.*
    $$-\frac{y^2}{16} = 1 - \frac{49}{25}$$
    *Isolate the term with y-squared.*
    $$-\frac{y^2}{16} = \frac{25}{25} - \frac{49}{25}$$
    *Find a common denominator for the right side.*
    $$-\frac{y^2}{16} = -\frac{24}{25}$$
    *Perform the subtraction.*
    $$\frac{y^2}{16} = \frac{24}{25}$$
    *Multiply both sides by -1.*
    $$y^2 = \frac{24 \times 16}{25}$$
    *Multiply both sides by 16 to solve for y-squared.*
    $$y^2 = \frac{384}{25}$$
    *Calculate the numerator.*
    $$y = \pm\sqrt{\frac{384}{25}}$$
    *Take the square root of both sides.*
    $$y = \pm\frac{\sqrt{384}}{\sqrt{25}}$$
    *Separate the square root of the fraction.*
    $$y = \pm\frac{\sqrt{64 \times 6}}{5}$$
    *Simplify the square root in the numerator: $\sqrt{384} = \sqrt{64 \times 6} = 8\sqrt{6}$.*
    $$y = \pm\frac{8\sqrt{6}}{5}$$
    *Final simplified form for y.*

**Final Answer:**
The $y$-coordinate of the point $P(7,y)$ is $\boxed{\pm\frac{8\sqrt{6}}{5}}$.

**Reflection:** This example demonstrates how the "difference of focal radii = 2a" property (which gives us 'a') is used in conjunction with 'c' to build the full equation of the hyperbola. Once the equation is known, any point's missing coordinate can be found by substitution. The trickiest part was simplifying the radical at the end.

## 6. Common mistakes and traps

1.  **Confusing Hyperbola with Ellipse:** The most common mistake is to use the *sum* of focal radii instead of the *difference*. Remember: **Hyperbola = H-Difference** (the "H" helps remember "Hyperbola" and "Hyphen" for subtraction). **Ellipse = E-Sum** (the "E" helps remember "Ellipse" and "Equals Sum").
2.  **Forgetting the Absolute Value:** The property is $|PF_1 - PF_2| = 2a$. Students often write $PF_1 - PF_2 = 2a$. This is only true if $P$ is on the branch where $F_1$ is the further focus. If $P$ is on the other branch, then $PF_2 - PF_1 = 2a$. The absolute value ensures the constant difference is always positive, regardless of which branch $P$ is on.
3.  **Incorrectly Identifying 'a', 'b', and 'c':**
    *   **'a'** is the distance from the center to a vertex (half the transverse axis length). In the standard equation, $a^2$ is under the *positive* term.
    *   **'c'** is the distance from the center to a focus.
    *   **'b'** is related to the conjugate axis.
    The relationship $c^2 = a^2 + b^2$ is unique to hyperbolas (for ellipses, it's $a^2 = b^2 + c^2$ or $a^2 = b^2 + c^2$, where 'a' is always the semi-major axis). Mixing these up is a frequent source of error.
4.  **Algebraic Errors in Derivation/Verification:** When using the distance formula and setting up the equation $\sqrt{(x+c)^2+y^2} - \sqrt{(x-c)^2+y^2} = \pm 2a$, the subsequent algebraic steps (isolating a radical, squaring both sides, simplifying, repeating) are prone to sign errors, expansion mistakes (e.g., $(A+B)^2 \neq A^2+B^2$), and arithmetic blunders.
5.  **Assuming Center at Origin:** While many problems simplify by placing the hyperbola's center at $(0,0)$, it's crucial to remember that hyperbolas can be translated. If the center is $(h,k)$, the focal coordinates become $(h \pm c, k)$ or $(h, k \pm c)$, and the distance formulas must reflect this shift.
6.  **Misinterpreting $2a$ vs. $a^2$:** Be careful not to confuse the constant difference $2a$ with $a^2$ from the standard equation. For example, if $2a=6$, then $a=3$, and $a^2=9$.

## 7. Textbook-precise explanation

A **hyperbola** is formally defined as the locus of all points $P(x,y)$ in a plane such that the absolute difference of the distances from $P$ to two fixed points, called the **foci** ($F_1$ and $F_2$), is a positive constant. This constant difference is denoted as $2a$.

Let the foci be $F_1(-c,0)$ and $F_2(c,0)$ for a hyperbola centered at the origin with its transverse axis along the x-axis. Let $P(x,y)$ be any point on the hyperbola. The distances from $P$ to $F_1$ and $F_2$ are given by the distance formula:
$$ PF_1 = \sqrt{(x - (-c))^2 + (y-0)^2} = \sqrt{(x+c)^2 + y^2} $$
$$ PF_2 = \sqrt{(x - c)^2 + (y-0)^2} = \sqrt{(x-c)^2 + y^2} $$
According to the definition, the property is:
$$ |PF_1 - PF_2| = 2a $$
Substituting the distance formulas:
$$ \left| \sqrt{(x+c)^2 + y^2} - \sqrt{(x-c)^2 + y^2} \right| = 2a $$
This equation can be rewritten as:
$$ \sqrt{(x+c)^2 + y^2} - \sqrt{(x-c)^2 + y^2} = \pm 2a $$
To derive the standard equation of the hyperbola $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$, one would proceed by isolating one radical, squaring both sides, simplifying, isolating the remaining radical, and squaring again. After extensive algebraic manipulation, and introducing the relationship $b^2 = c^2 - a^2$ (or $c^2 = a^2 + b^2$), the equation simplifies to the standard form.

The parameter $a$ represents the distance from the center to each vertex. The vertices are the points where the hyperbola intersects its transverse axis. For a horizontal hyperbola centered at the origin, the vertices are $(\pm a, 0)$. The distance $2a$ is the length of the transverse axis. The parameter $c$ represents the distance from the center to each focus. The relationship $c^2 = a^2 + b^2$ is fundamental for hyperbolas, where $b$ is related to the length of the conjugate axis.

This definition and derivation are standard in precalculus and calculus textbooks. For example, see:
*   Stewart, James. *Calculus: Early Transcendentals*. 9th ed., Cengage Learning, 2021, Chapter 10 (Conic Sections).
*   Larson, Ron, and Bruce H. Edwards. *Calculus*. 11th ed., Cengage Learning, 2018, Chapter 10 (Conic Sections).
*   Zill, Dennis G., and Jacqueline M. Dewar. *Precalculus with Calculus Previews*. 6th ed., Jones & Bartlett Learning, 2017, Chapter 9 (Conic Sections).

## 8. ASCII diagrams

Here's a simplified ASCII diagram illustrating the key components of a horizontal hyperbola and the focal radii property.

```text
               |       /       \
               |      /         \
               |     /           \
               |    /             \
               |   /               \
               |  /                 \
               | /                   \
       F1------V1-------C-------V2-------F2
       (-c,0) (-a,0)   (0,0)   (a,0)   (c,0)
             / \                   / \
            /   \                 /   \
           /     \               /     \
          /       \             /       \
         /         \           /         \
        /           \         /           \
       /             \       /             \
      /               \     /               \
      |                 P(x,y)               |
      |                 / \                  |
      |                /   \                 |
      |               /     \                |
      |             PF1       PF2            |
      |                                      |

Legend:
C: Center (0,0)
F1, F2: Foci
V1, V2: Vertices
P(x,y): An arbitrary point on the hyperbola
PF1: Distance from P to F1 (focal radius)
PF2: Distance from P to F2 (focal radius)

The property: |PF1 - PF2| = 2a
```

**Description of the Figure:**
The diagram shows a hyperbola with its two branches opening horizontally. The center of the hyperbola is at the origin, labeled 'C'. The two foci, $F_1$ and $F_2$, are located on the x-axis at $(-c,0)$ and $(c,0)$ respectively, outside the vertices. The vertices, $V_1$ and $V_2$, are also on the x-axis, located at $(-a,0)$ and $(a,0)$ respectively, between the center and the foci. An arbitrary point $P(x,y)$ is shown on the right branch of the hyperbola. Lines are drawn from $P$ to each focus, representing the focal radii $PF_1$ and $PF_2$. The diagram illustrates that the difference in the lengths of these two lines, $|PF_1 - PF_2|$, is equal to $2a$, which is the distance between the two vertices ($V_1$ and $V_2$).

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **"Hyperbola Hates Harmony, it's all about the HUGE HOLE (difference)."** Think of the two branches of a hyperbola as two people who *disagree* strongly, so you measure their *difference*. The "H" in Hyperbola also reminds you of "Hyphen" for subtraction.
    *   **Visual:** Imagine a slingshot. The object being slung (or escaping a gravitational field) follows a hyperbolic path. The two "prongs" of the slingshot can be thought of as the foci. The path is defined by the *difference* in how "far" it feels from each prong.

2.  **Formulas/Facts to Overlearn:**
    1.  **Definition:** $|PF_1 - PF_2| = 2a$ (The absolute difference of focal radii is $2a$).
    2.  **Standard Equation (horizontal):** $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$ (Note the minus sign!).
    3.  **Relationship between $a, b, c$:** $c^2 = a^2 + b^2$ (Remember, for hyperbolas, $c$ is the largest value, so $c^2$ is the sum of the other two squares).

3.  **Spaced-Repetition Schedule:**
    *   Review this lesson today.
    *   Review again in **1 day**.
    *   Review again in **3 days**.
    *   Review again in **7 days**.
    *   Review again in **16 days**.
    *   Review again in **35 days**.
    (Each review should involve re-reading Section 4, doing a quick example, and recalling the key formulas.)

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the standard equation of a hyperbola or its relationship to $a, b, c$, you can always rebuild it from the fundamental definition:
    1.  **Start with the definition:** Let $P(x,y)$ be a point on the hyperbola, and $F_1(-c,0)$, $F_2(c,0)$ be the foci.
        $$ \left| \sqrt{(x+c)^2 + y^2} - \sqrt{(x-c)^2 + y^2} \right| = 2a $$
    2.  **Eliminate absolute value:**
        $$ \sqrt{(x+c)^2 + y^2} - \sqrt{(x-c)^2 + y^2} = \pm 2a $$
    3.  **Isolate one radical:** Move one radical term to the other side.
        $$ \sqrt{(x+c)^2 + y^2} = \pm 2a + \sqrt{(x-c)^2 + y^2} $$
    4.  **Square both sides:** This will eliminate one square root, but introduce a new radical term.
        $$ (x+c)^2 + y^2 = (\pm 2a + \sqrt{(x-c)^2 + y^2})^2 $$
        $$ x^2 + 2cx + c^2 + y^2 = 4a^2 \pm 4a\sqrt{(x-c)^2 + y^2} + (x-c)^2 + y^2 $$
        $$ x^2 + 2cx + c^2 + y^2 = 4a^2 \pm 4a\sqrt{(x-c)^2 + y^2} + x^2 - 2cx + c^2 + y^2 $$
    5.  **Simplify and isolate the remaining radical:** Cancel terms and rearrange to get the remaining radical by itself.
        $$ 4cx - 4a^2 = \pm 4a\sqrt{(x-c)^2 + y^2} $$
        $$ cx - a^2 = \pm a\sqrt{(x-c)^2 + y^2} $$
    6.  **Square both sides again:** This eliminates the last square root.
        $$ (cx - a^2)^2 = a^2((x-c)^2 + y^2) $$
        $$ c^2x^2 - 2a^2cx + a^4 = a^2(x^2 - 2cx + c^2 + y^2) $$
        $$ c^2x^2 - 2a^2cx + a^4 = a^2x^2 - 2a^2cx + a^2c^2 + a^2y^2 $$
    7.  **Rearrange and group terms:** Move all $x^2$ and $y^2$ terms to one side, constants to the other.
        $$ c^2x^2 - a^2x^2 - a^2y^2 = a^2c^2 - a^4 $$
        $$ x^2(c^2 - a^2) - a^2y^2 = a^2(c^2 - a^2) $$
    8.  **Introduce $b^2 = c^2 - a^2$:** Substitute this definition.
        $$ x^2b^2 - a^2y^2 = a^2b^2 $$
    9.  **Divide by $a^2b^2$ to get standard form:**
        $$ \frac{x^2b^2}{a^2b^2} - \frac{a^2y^2}{a^2b^2} = \frac{a^2b^2}{a^2b^2} $$
        $$ \frac{x^2}{a^2} - \frac{y^2}{b^2} = 1 $$
    This full derivation, though lengthy, ensures a deep understanding and provides a reliable way to reconstruct the formula if memory fails.

## 10. Connections — what this leads to

The "difference of focal radii = 2a" property is the cornerstone of understanding hyperbolas. Its implications and extensions connect to many other mathematical and scientific concepts:

1.  **Standard Equation of a Hyperbola:** As shown in the derivation pathway, this property is the direct starting point for deriving the standard algebraic equations of hyperbolas, both horizontal ($\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$) and vertical ($\frac{y^2}{a^2} - \frac{x^2}{b^2} = 1$). Without this defining property, these equations would seem arbitrary.
2.  **Asymptotes:** The parameters $a$ and $b$ (derived from $2a$ and $c^2 = a^2 + b^2$) directly determine the equations of the asymptotes of a hyperbola. These asymptotes, $y = \pm \frac{b}{a}x$ (for horizontal hyperbolas centered at the origin), define the behavior of the hyperbola's branches as they extend infinitely.
3.  **Eccentricity ($e$):** The eccentricity of a hyperbola, defined as $e = \frac{c}{a}$, is a measure of its "openness" or "flatness." Since $c > a$ for a hyperbola, $e > 1$. This value quantifies how much the hyperbola deviates from a pair of parallel lines (as $e \to 1$) or how wide its branches are (as $e \to \infty$). The focal radii property directly gives us $a$ and $c$, which are essential for calculating $e$.
4.  **Reflective Property of Hyperbolas:** Hyperbolas possess a unique reflective property: a ray of light (or sound) directed towards one focus will reflect off the hyperbola *as if it originated from the other focus*. This property is a direct consequence of the constant difference definition and is critical in the design of specialized optical instruments like Cassegrain telescopes and certain types of radar antennas.
5.  **Conic Sections in General:** Understanding the focal properties of hyperbolas (difference is constant) in contrast to ellipses (sum is constant) and parabolas (equidistant from focus and directrix) provides a unified view of all conic sections as loci defined by distances.
6.  **Relativity and Spacetime:** In special relativity, the geometry of spacetime can be described using hyperbolic functions and hyperbolic geometry. Events in spacetime can be categorized by their "spacetime interval," which can be positive, negative, or zero, corresponding to timelike, spacelike, or lightlike separations. These intervals are analogous to distances in Euclidean space, and their relationships often follow hyperbolic forms.
7.  **Differential Equations and Physics:** Hyperbolic functions (sinh, cosh, tanh) are solutions to certain types of differential equations that arise in physics, such as those describing the shape of hanging cables (catenaries) or wave propagation in some media. The underlying geometric properties of hyperbolas are intrinsically linked to these functions.

## 11. Self-check questions

1.  A hyperbola has foci at $F_1(-4,0)$ and $F_2(4,0)$. If a point $P$ on the hyperbola has $PF_1 = 10$, what are the two possible values for $PF_2$? If the point is on the right branch of the hyperbola, which value of $PF_2$ is correct?
2.  The vertices of a hyperbola are at $(\pm 3, 0)$ and its foci are at $(\pm 5, 0)$. What is the constant difference of the focal radii for any point on this hyperbola?
3.  Derive the value of $b^2$ for a hyperbola with foci $(\pm c, 0)$ and constant focal difference $2a$. Express $b^2$ in terms of $a$ and $c$.
4.  A hyperbola has the equation $\frac{x^2}{36} - \frac{y^2}{64} = 1$. What are the coordinates of its foci? For any point on this hyperbola, what is the value of $|PF_1 - PF_2|$?
5.  Consider a hyperbola centered at the origin with foci $F_1(0, -c)$ and $F_2(0, c)$. If a point $P(x,y)$ lies on this hyperbola, write down the equation that expresses the "difference of focal radii = 2a" property for this vertical hyperbola. Do not simplify to the standard equation, just write the distance formula expression.