## 1. What it is — in plain English

Imagine you have a drawing of a shape on a piece of clear plastic. Function transformations are like moving, resizing, or flipping that drawing without changing the fundamental shape itself. You're not drawing a *new* shape; you're just taking your existing shape and putting it somewhere else, making it bigger or smaller, or turning it upside down.

In mathematics, the "drawing" is the graph of a function. A function takes an input number, does something to it, and gives you an output number. When you plot all possible input-output pairs, you get a curve or a line – that's the graph.

Transformations let us take a basic function, like $y = x^2$ (which makes a U-shape called a parabola), and easily figure out what $y = (x-3)^2 + 5$ looks like. Instead of calculating a whole new set of points, we just take the original U-shape, slide it to the right, and then slide it up.

So, it's a shortcut! Instead of starting from scratch every time we encounter a slightly different version of a known function, we learn rules to quickly adjust its graph based on how its formula has changed. These adjustments include sliding it up/down or left/right (shifts), making it taller/shorter or wider/narrower (stretches/compressions), or flipping it over (reflections).

## 2. Why it matters — real-world applications

Understanding function transformations is not just an academic exercise; it's a fundamental tool used across various scientific and engineering disciplines.

1.  **Aerospace Engineering & Physics (Trajectory Modeling):** When designing the trajectory of a rocket, missile, or satellite, engineers often start with a basic parabolic path (influenced by gravity) or an elliptical orbit. Transformations allow them to adjust this basic path to account for launch angles, initial velocities, and desired landing/orbit points. For example, if $y = -gt^2/2 + v_0t$ describes vertical motion, adding a constant shifts the starting height, and changing $v_0$ effectively stretches or compresses the curve.
2.  **Computer Graphics & Animation (Game Development, Movie VFX):** Every time a character moves, an object rotates, or a scene zooms in/out in a video game or an animated movie, transformations are at play. The underlying mathematical models for 3D objects are represented by functions. Shifting an object changes its position, scaling it makes it larger or smaller, and reflections can create mirror images or handle symmetry. These operations are directly implemented using matrices, which are mathematical representations of transformations.
3.  **Signal Processing & Acoustics (Audio Engineering):** When you adjust the volume (amplitude) or pitch (frequency) of an audio signal, you are applying transformations. Increasing the volume is a vertical stretch of the sound wave function. Changing the pitch involves horizontal compression or stretching of the wave. Filters used to remove noise or enhance certain frequencies also rely on transforming the signal's mathematical representation.
4.  **Machine Learning & Data Science (Feature Engineering):** In machine learning, raw data often needs to be "transformed" before it can be effectively used by algorithms. For instance, data might be scaled (stretched/compressed) to fit within a certain range (e.g., 0 to 1) to prevent features with larger values from dominating the learning process. Logarithmic transformations (a type of non-linear transformation related to stretching) are often used to reduce skewness in data distributions, making them more amenable to linear models.

## 3. Prerequisites — what you must know first

Before diving into function transformations, ensure you have a solid grasp of these foundational concepts:

*   **Functions (Basic Definition):** What a function is (a rule that assigns each input exactly one output), how to evaluate $f(x)$ for a given $x$, and the difference between independent and dependent variables.
*   **Graphing Basic Functions:** How to plot points and sketch the graphs of fundamental functions like linear functions ($y=mx+b$), quadratic functions ($y=x^2$), absolute value functions ($y=|x|$), and square root functions ($y=\sqrt{x}$).
*   **Coordinate Plane:** Understanding the x-axis, y-axis, origin, and how to locate points $(x,y)$ in a two-dimensional Cartesian coordinate system.
*   **Algebraic Manipulation:** Basic skills in solving equations, isolating variables, and working with parentheses and coefficients.
*   **Domain and Range:** What the domain (set of all possible input values) and range (set of all possible output values) of a function are. Transformations can sometimes affect these.

## 4. The core idea — step by step

Let's explore the different types of transformations, using a generic function $y = f(x)$ as our starting point. We'll see how changes to the formula $f(x)$ affect its graph.

### Step 1: Vertical Shifts (Up and Down)

**Plain-English Statement:** If you add or subtract a number *outside* the function's main operation, the entire graph moves straight up or straight down.

**Small Concrete Example:**
Consider the basic function $f(x) = x^2$. Its graph is a parabola opening upwards, with its lowest point (vertex) at $(0,0)$.
If we look at $g(x) = x^2 + 3$, every output value of $f(x)$ is simply increased by 3. So, the point $(0,0)$ on $f(x)$ becomes $(0,3)$ on $g(x)$. The point $(1,1)$ on $f(x)$ becomes $(1,4)$ on $g(x)$. The entire parabola shifts up by 3 units.
If we look at $h(x) = x^2 - 2$, every output value of $f(x)$ is decreased by 2. The entire parabola shifts down by 2 units.

**Formal/Mathematical Version:**
Given a function $y = f(x)$ and a positive constant $c$:
*   The graph of $y = f(x) + c$ is the graph of $f(x)$ shifted **up** by $c$ units.
*   The graph of $y = f(x) - c$ is the graph of $f(x)$ shifted **down** by $c$ units.

**What could go wrong:** Students sometimes confuse vertical shifts with horizontal shifts, especially when the constant is negative. Remember, if the constant is *added or subtracted to the entire output* $f(x)$, it's a vertical shift.

### Step 2: Horizontal Shifts (Left and Right)

**Plain-English Statement:** If you add or subtract a number *inside* the function's main operation (directly to the input variable $x$), the entire graph moves horizontally – left or right. This is often counter-intuitive: adding a number moves it left, and subtracting a number moves it right. Think of it as "X is a liar."

**Small Concrete Example:**
Again, let's use $f(x) = x^2$.
Consider $g(x) = (x - 3)^2$. To get the same output as $f(x)$ at $x=0$ (which is $0^2=0$), we now need $x-3=0$, meaning $x=3$. So, the vertex shifts from $x=0$ to $x=3$. The entire parabola shifts **right** by 3 units.
Consider $h(x) = (x + 2)^2$. To get the same output as $f(x)$ at $x=0$, we now need $x+2=0$, meaning $x=-2$. The vertex shifts from $x=0$ to $x=-2$. The entire parabola shifts **left** by 2 units.

**Formal/Mathematical Version:**
Given a function $y = f(x)$ and a positive constant $c$:
*   The graph of $y = f(x - c)$ is the graph of $f(x)$ shifted **right** by $c$ units.
*   The graph of $y = f(x + c)$ is the graph of $f(x)$ shifted **left** by $c$ units.

**What could go wrong:** The most common mistake here is getting the direction wrong. "Minus shifts right, plus shifts left." This happens because you need a *larger* $x$ value to get the same *effective input* to the function if you're subtracting $c$, and a *smaller* $x$ value if you're adding $c$.

### Step 3: Vertical Stretches and Compressions

**Plain-English Statement:** If you multiply the *entire function's output* by a number (a coefficient outside $f(x)$), you're stretching or squishing the graph vertically. If the number is greater than 1, it stretches it (makes it taller). If the number is between 0 and 1, it compresses it (makes it shorter).

**Small Concrete Example:**
Let $f(x) = x^2$.
Consider $g(x) = 2x^2$. For any $x$, the output of $g(x)$ is twice the output of $f(x)$. So, the point $(1,1)$ on $f(x)$ becomes $(1,2)$ on $g(x)$. The point $(2,4)$ on $f(x)$ becomes $(2,8)$ on $g(x)$. The parabola becomes "skinnier" or "taller" – it's stretched vertically by a factor of 2.
Consider $h(x) = \frac{1}{2}x^2$. For any $x$, the output of $h(x)$ is half the output of $f(x)$. The point $(1,1)$ on $f(x)$ becomes $(1, 0.5)$ on $h(x)$. The parabola becomes "wider" or "shorter" – it's compressed vertically by a factor of $\frac{1}{2}$.

**Formal/Mathematical Version:**
Given a function $y = f(x)$ and a positive constant $a$:
*   If $a > 1$, the graph of $y = a \cdot f(x)$ is the graph of $f(x)$ stretched **vertically** by a factor of $a$.
*   If $0 < a < 1$, the graph of $y = a \cdot f(x)$ is the graph of $f(x)$ compressed **vertically** by a factor of $a$.

**What could go wrong:** Students might confuse vertical stretches/compressions with horizontal ones. Remember, if the multiplier is *outside* the function, affecting the $y$-value, it's vertical.

### Step 4: Horizontal Stretches and Compressions

**Plain-English Statement:** If you multiply the *input variable $x$* by a number (a coefficient inside $f(x)$), you're stretching or squishing the graph horizontally. This is another counter-intuitive one, similar to horizontal shifts: if the number is greater than 1, it *compresses* it (makes it narrower). If the number is between 0 and 1, it *stretches* it (makes it wider). "X is a liar" applies here too!

**Small Concrete Example:**
Let $f(x) = x^2$.
Consider $g(x) = (2x)^2$. To get the same output as $f(x)$ at $x=1$ (which is $1^2=1$), we now need $2x=1$, meaning $x=\frac{1}{2}$. So, the point $(1,1)$ on $f(x)$ corresponds to $(\frac{1}{2},1)$ on $g(x)$. The parabola becomes "skinnier" or "narrower" – it's compressed **horizontally** by a factor of $\frac{1}{2}$.
Consider $h(x) = (\frac{1}{2}x)^2$. To get the same output as $f(x)$ at $x=1$, we now need $\frac{1}{2}x=1$, meaning $x=2$. So, the point $(1,1)$ on $f(x)$ corresponds to $(2,1)$ on $h(x)$. The parabola becomes "wider" or "flatter" – it's stretched **horizontally** by a factor of $2$.

**Formal/Mathematical Version:**
Given a function $y = f(x)$ and a positive constant $b$:
*   If $b > 1$, the graph of $y = f(bx)$ is the graph of $f(x)$ compressed **horizontally** by a factor of $\frac{1}{b}$.
*   If $0 < b < 1$, the graph of $y = f(bx)$ is the graph of $f(x)$ stretched **horizontally** by a factor of $\frac{1}{b}$.

**What could go wrong:** The "X is a liar" rule is crucial here. A multiplier $b$ inside the function causes a stretch/compression by a factor of $1/b$. Also, if there's an expression like $f(bx+c)$, you *must* factor out $b$ first: $f(b(x+c/b))$. The horizontal shift is then $c/b$.

### Step 5: Reflections across the x-axis

**Plain-English Statement:** If you put a negative sign *in front of the entire function's output*, the graph flips upside down, like a mirror image across the x-axis.

**Small Concrete Example:**
Let $f(x) = x^2$. The graph opens upwards.
Consider $g(x) = -x^2$. For any $x$, the output of $g(x)$ is the negative of the output of $f(x)$. So, the point $(1,1)$ on $f(x)$ becomes $(1,-1)$ on $g(x)$. The point $(2,4)$ on $f(x)$ becomes $(2,-4)$ on $g(x)$. The parabola now opens downwards.

**Formal/Mathematical Version:**
Given a function $y = f(x)$:
*   The graph of $y = -f(x)$ is the graph of $f(x)$ reflected across the **x-axis**.

**What could go wrong:** This is generally straightforward. The key is that the negative sign applies to the *entire* output of $f(x)$.

### Step 6: Reflections across the y-axis

**Plain-English Statement:** If you put a negative sign *inside the function's input* (directly to $x$), the graph flips sideways, like a mirror image across the y-axis.

**Small Concrete Example:**
Let $f(x) = \sqrt{x}$. The graph starts at $(0,0)$ and goes to the right.
Consider $g(x) = \sqrt{-x}$. For $g(x)$ to be defined, $-x$ must be non-negative, which means $x$ must be non-positive ($x \le 0$). So, the graph starts at $(0,0)$ and goes to the left. The point $(1,1)$ on $f(x)$ corresponds to the point $(-1,1)$ on $g(x)$. The graph is reflected across the y-axis.

**Formal/Mathematical Version:**
Given a function $y = f(x)$:
*   The graph of $y = f(-x)$ is the graph of $f(x)$ reflected across the **y-axis**.

**What could go wrong:** This transformation is often less intuitive than x-axis reflection. Remember, $f(-x)$ means you're plugging in the negative of your $x$-value. So, what happened at $x=2$ on $f(x)$ now happens at $x=-2$ on $f(-x)$.

### Step 7: Combining Transformations (Order Matters!)

**Plain-English Statement:** When you have multiple transformations, the order in which you apply them matters, just like in algebra (PEMDAS). A good rule of thumb is to apply stretches, compressions, and reflections *first*, and then apply shifts. Think of it as: "Scale and Reflect, then Shift."

**Formal/Mathematical Version:**
To transform $y = f(x)$ into $y = a \cdot f(b(x-h)) + k$:
1.  **Horizontal Transformations (inside $f$):**
    *   Apply horizontal stretch/compression by factor $1/|b|$ (and reflection across y-axis if $b<0$).
    *   Apply horizontal shift by $h$ units (right if $h>0$, left if $h<0$).
2.  **Vertical Transformations (outside $f$):**
    *   Apply vertical stretch/compression by factor $|a|$ (and reflection across x-axis if $a<0$).
    *   Apply vertical shift by $k$ units (up if $k>0$, down if $k<0$).

**Important Note on Horizontal Transformations:** If your function is in the form $y = f(bx+c)+k$, you *must* factor out $b$ from the $x$ term first to correctly identify the horizontal shift: $y = f(b(x + c/b)) + k$. Here, the horizontal shift is $-c/b$.

**What could go wrong:** Applying shifts before stretches/reflections is a very common error. For example, $y = 2x^2+1$ (stretch by 2, then shift up by 1) is different from $y = 2(x^2+1)$ (shift up by 1, then stretch by 2). In the first case, $y=2x^2+1$, the point $(0,0)$ becomes $(0,1)$. In the second case, $y=2x^2+2$, the point $(0,0)$ becomes $(0,2)$.

## 5. Worked examples — multiple, with every step shown

Let's illustrate these transformations with concrete examples. We will start with a known parent function and apply transformations step-by-step.

### Example 1: Simple Vertical Shift

**Problem:** Describe the transformations and sketch the graph of $g(x) = x^2 - 4$ starting from the parent function $f(x) = x^2$.

**What's given:** Parent function $f(x) = x^2$. Transformed function $g(x) = x^2 - 4$.
**What we want:** Describe transformations and sketch $g(x)$.

**Step-by-step solution:**

1.  **Identify the parent function:** The base function is $f(x) = x^2$.
    *   *Explanation:* This is the simplest form of the quadratic function, a parabola opening upwards with its vertex at the origin $(0,0)$.
2.  **Compare $g(x)$ to $f(x)$:** We see that $g(x) = f(x) - 4$.
    *   *Explanation:* A constant is being subtracted *outside* the function's core operation ($x^2$). This indicates a vertical shift.
3.  **Determine the type and direction of transformation:** Since a positive constant (4) is subtracted from $f(x)$, this is a vertical shift downwards.
    *   *Explanation:* As per Step 1 of the core idea, $f(x) - c$ shifts the graph down by $c$ units. Here, $c=4$.
4.  **Describe the transformation:** The graph of $g(x) = x^2 - 4$ is the graph of $f(x) = x^2$ shifted **down by 4 units**.
    *   *Explanation:* This is the complete description of the transformation.
5.  **Sketch the graph:**
    *   Start with the graph of $f(x) = x^2$. Key points: $(0,0), (1,1), (-1,1), (2,4), (-2,4)$.
    *   Shift each of these points down by 4 units.
        *   $(0,0) \rightarrow (0,-4)$
        *   $(1,1) \rightarrow (1,-3)$
        *   $(-1,1) \rightarrow (-1,-3)$
        *   $(2,4) \rightarrow (2,0)$
        *   $(-2,4) \rightarrow (-2,0)$
    *   Draw the new parabola through these shifted points.

**Reflection:** This example highlights the direct relationship between adding/subtracting a constant outside the function and vertical shifts. It's the most straightforward transformation.

---

### Example 2: Horizontal Shift and Vertical Stretch

**Problem:** Describe the transformations and sketch the graph of $h(x) = 3(x+2)^2$ starting from the parent function $f(x) = x^2$.

**What's given:** Parent function $f(x) = x^2$. Transformed function $h(x) = 3(x+2)^2$.
**What we want:** Describe transformations and sketch $h(x)$.

**Step-by-step solution:**

1.  **Identify the parent function:** The base function is $f(x) = x^2$.
    *   *Explanation:* This is our reference parabola.
2.  **Identify transformations in order (Scale/Reflect then Shift):**
    *   **Inside the function (horizontal transformations):** We see $(x+2)$. This affects the input $x$.
        *   *Explanation:* This corresponds to $f(x+c)$ form, indicating a horizontal shift. Since it's $x+2$, it's a shift to the left.
    *   **Outside the function (vertical transformations):** We see a multiplier of $3$ in front of $(x+2)^2$.
        *   *Explanation:* This corresponds to $a \cdot f(x)$ form, indicating a vertical stretch. Since $a=3 > 1$, it's a stretch.
3.  **Describe the transformations in the correct order:**
    *   **Transformation 1 (Horizontal Shift):** The graph of $f(x) = x^2$ is shifted **left by 2 units** to get $y = (x+2)^2$.
        *   *Explanation:* As per Step 2 of the core idea, $f(x+c)$ shifts left by $c$ units. Here, $c=2$.
    *   **Transformation 2 (Vertical Stretch):** The resulting graph $y = (x+2)^2$ is then stretched **vertically by a factor of 3** to get $h(x) = 3(x+2)^2$.
        *   *Explanation:* As per Step 3 of the core idea, $a \cdot f(x)$ stretches vertically by a factor of $a$. Here, $a=3$.
4.  **Sketch the graph:**
    *   Start with $f(x) = x^2$. Key points: $(0,0), (1,1), (-1,1), (2,4), (-2,4)$.
    *   Apply the horizontal shift (left by 2):
        *   $(0,0) \rightarrow (-2,0)$
        *   $(1,1) \rightarrow (-1,1)$
        *   $(-1,1) \rightarrow (-3,1)$
        *   $(2,4) \rightarrow (0,4)$
        *   $(-2,4) \rightarrow (-4,4)$
        This gives us the graph of $y = (x+2)^2$.
    *   Now, apply the vertical stretch (multiply y-coordinates by 3) to these new points:
        *   $(-2,0) \rightarrow (-2, 0 \cdot 3) = (-2,0)$
        *   $(-1,1) \rightarrow (-1, 1 \cdot 3) = (-1,3)$
        *   $(-3,1) \rightarrow (-3, 1 \cdot 3) = (-3,3)$
        *   $(0,4) \rightarrow (0, 4 \cdot 3) = (0,12)$
        *   $(-4,4) \rightarrow (-4, 4 \cdot 3) = (-4,12)$
    *   Draw the final parabola through these points. The vertex is at $(-2,0)$, and it opens upwards, much narrower than $f(x)$.

**Reflection:** This example demonstrates the importance of applying transformations in the correct order: horizontal shifts and vertical stretches. The vertex moves, and the curve becomes steeper.

---

### Example 3: Multiple Transformations including Reflection

**Problem:** Describe the transformations and sketch the graph of $k(x) = - (x-1)^3 + 2$ starting from the parent function $f(x) = x^3$.

**What's given:** Parent function $f(x) = x^3$. Transformed function $k(x) = - (x-1)^3 + 2$.
**What we want:** Describe transformations and sketch $k(x)$.

**Step-by-step solution:**

1.  **Identify the parent function:** The base function is $f(x) = x^3$.
    *   *Explanation:* This is the cubic function, which passes through $(0,0)$, $(1,1)$, and $(-1,-1)$.
2.  **Identify transformations in order (Scale/Reflect then Shift):**
    *   **Inside the function (horizontal transformation):** We see $(x-1)$.
        *   *Explanation:* This is a horizontal shift.
    *   **Outside the function (vertical transformations):** We see a negative sign in front of $(x-1)^3$ and a $+2$ at the end.
        *   *Explanation:* The negative sign indicates a reflection. The $+2$ indicates a vertical shift.
3.  **Describe the transformations in the correct order:**
    *   **Transformation 1 (Horizontal Shift):** The graph of $f(x) = x^3$ is shifted **right by 1 unit** to get $y = (x-1)^3$.
        *   *Explanation:* As per Step 2 of the core idea, $f(x-c)$ shifts right by $c$ units. Here, $c=1$.
    *   **Transformation 2 (Reflection across x-axis):** The resulting graph $y = (x-1)^3$ is then reflected across the **x-axis** to get $y = -(x-1)^3$.
        *   *Explanation:* As per Step 5 of the core idea, $-f(x)$ reflects the graph across the x-axis.
    *   **Transformation 3 (Vertical Shift):** Finally, the graph $y = -(x-1)^3$ is shifted **up by 2 units** to get $k(x) = -(x-1)^3 + 2$.
        *   *Explanation:* As per Step 1 of the core idea, $f(x)+c$ shifts the graph up by $c$ units. Here, $c=2$.
4.  **Sketch the graph:**
    *   Start with $f(x) = x^3$. Key points: $(0,0), (1,1), (-1,-1), (2,8), (-2,-8)$.
    *   Apply horizontal shift (right by 1):
        *   $(0,0) \rightarrow (1,0)$
        *   $(1,1) \rightarrow (2,1)$
        *   $(-1,-1) \rightarrow (0,-1)$
        *   $(2,8) \rightarrow (3,8)$
        *   $(-2,-8) \rightarrow (-1,-8)$
        This gives $y=(x-1)^3$.
    *   Apply reflection across x-axis (multiply y-coordinates by -1):
        *   $(1,0) \rightarrow (1,0)$
        *   $(2,1) \rightarrow (2,-1)$
        *   $(0,-1) \rightarrow (0,1)$
        *   $(3,8) \rightarrow (3,-8)$
        *   $(-1,-8) \rightarrow (-1,8)$
        This gives $y=-(x-1)^3$.
    *   Apply vertical shift (up by 2):
        *   $(1,0) \rightarrow (1,2)$
        *   $(2,-1) \rightarrow (2,1)$
        *   $(0,1) \rightarrow (0,3)$
        *   $(3,-8) \rightarrow (3,-6)$
        *   $(-1,8) \rightarrow (-1,10)$
    *   Draw the final curve through these points. The "center" of the cubic function is now at $(1,2)$, and it goes down to the right and up to the left.

**Reflection:** This example demonstrates how reflections flip the orientation of the graph and reinforces the order of operations for multiple transformations. The "pivot" point of the cubic curve shifts from $(0,0)$ to $(1,2)$.

---

### Example 4: All Types, including Horizontal Stretch/Compression with Factoring

**Problem:** Describe the transformations and sketch the graph of $m(x) = -2\sqrt{3x+6} - 1$ starting from the parent function $f(x) = \sqrt{x}$.

**What's given:** Parent function $f(x) = \sqrt{x}$. Transformed function $m(x) = -2\sqrt{3x+6} - 1$.
**What we want:** Describe transformations and sketch $m(x)$.

**Step-by-step solution:**

1.  **Identify the parent function:** The base function is $f(x) = \sqrt{x}$.
    *   *Explanation:* This is the square root function, defined for $x \ge 0$, starting at $(0,0)$ and increasing to the right.
2.  **Rewrite the function to factor out the horizontal scaling factor:**
    $m(x) = -2\sqrt{3(x+2)} - 1$
    *   *Explanation:* This is a crucial step! To correctly identify horizontal stretch/compression and horizontal shift, any coefficient of $x$ *inside* the function must be factored out. Here, $3x+6$ becomes $3(x+2)$. This reveals the true horizontal shift.
3.  **Identify transformations in order (Scale/Reflect then Shift):**
    *   **Inside the function (horizontal transformations):** We have $3(x+2)$.
        *   *Explanation:* The $3$ indicates a horizontal compression. The $(x+2)$ indicates a horizontal shift.
    *   **Outside the function (vertical transformations):** We have $-2$ multiplying the square root, and a $-1$ at the end.
        *   *Explanation:* The negative sign indicates a reflection. The $2$ indicates a vertical stretch. The $-1$ indicates a vertical shift.
4.  **Describe the transformations in the correct order (apply horizontal first, then vertical; within each, scale/reflect then shift):**
    *   **Transformation 1 (Horizontal Compression):** The graph of $f(x) = \sqrt{x}$ is compressed **horizontally by a factor of $\frac{1}{3}$** to get $y = \sqrt{3x}$.
        *   *Explanation:* As per Step 4 of the core idea, $f(bx)$ compresses horizontally by $1/b$. Here, $b=3$.
    *   **Transformation 2 (Horizontal Shift):** The resulting graph $y = \sqrt{3x}$ is then shifted **left by 2 units** to get $y = \sqrt{3(x+2)}$.
        *   *Explanation:* As per Step 2 of the core idea, $f(x+c)$ shifts left by $c$ units. Here, $c=2$.
    *   **Transformation 3 (Vertical Stretch):** The resulting graph $y = \sqrt{3(x+2)}$ is then stretched **vertically by a factor of 2** to get $y = 2\sqrt{3(x+2)}$.
        *   *Explanation:* As per Step 3 of the core idea, $a \cdot f(x)$ stretches vertically by $a$. Here, $a=2$.
    *   **Transformation 4 (Reflection across x-axis):** The graph $y = 2\sqrt{3(x+2)}$ is then reflected across the **x-axis** to get $y = -2\sqrt{3(x+2)}$.
        *   *Explanation:* As per Step 5 of the core idea, $-f(x)$ reflects across the x-axis.
    *   **Transformation 5 (Vertical Shift):** Finally, the graph $y = -2\sqrt{3(x+2)}$ is shifted **down by 1 unit** to get $m(x) = -2\sqrt{3(x+2)} - 1$.
        *   *Explanation:* As per Step 1 of the core idea, $f(x)-c$ shifts down by $c$ units. Here, $c=1$.
5.  **Sketch the graph:**
    *   Start with $f(x) = \sqrt{x}$. Key points: $(0,0), (1,1), (4,2), (9,3)$.
    *   Apply horizontal compression by $1/3$ (divide x-coordinates by 3):
        *   $(0,0) \rightarrow (0,0)$
        *   $(1,1) \rightarrow (1/3,1)$
        *   $(4,2) \rightarrow (4/3,2)$
        *   $(9,3) \rightarrow (3,3)$
        This gives $y=\sqrt{3x}$.
    *   Apply horizontal shift left by 2 (subtract 2 from x-coordinates):
        *   $(0,0) \rightarrow (-2,0)$
        *   $(1/3,1) \rightarrow (-5/3,1)$
        *   $(4/3,2) \rightarrow (-2/3,2)$
        *   $(3,3) \rightarrow (1,3)$
        This gives $y=\sqrt{3(x+2)}$.
    *   Apply vertical stretch by 2 (multiply y-coordinates by 2):
        *   $(-2,0) \rightarrow (-2,0)$
        *   $(-5/3,1) \rightarrow (-5/3,2)$
        *   $(-2/3,2) \rightarrow (-2/3,4)$
        *   $(1,3) \rightarrow (1,6)$
        This gives $y=2\sqrt{3(x+2)}$.
    *   Apply reflection across x-axis (multiply y-coordinates by -1):
        *   $(-2,0) \rightarrow (-2,0)$
        *   $(-5/3,2) \rightarrow (-5/3,-2)$
        *   $(-2/3,4) \rightarrow (-2/3,-4)$
        *   $(1,6) \rightarrow (1,-6)$
        This gives $y=-2\sqrt{3(x+2)}$.
    *   Apply vertical shift down by 1 (subtract 1 from y-coordinates):
        *   $(-2,0) \rightarrow (-2,-1)$
        *   $(-5/3,-2) \rightarrow (-5/3,-3)$
        *   $(-2/3,-4) \rightarrow (-2/3,-5)$
        *   $(1,-6) \rightarrow (1,-7)$
    *   Draw the final curve starting at $(-2,-1)$, going downwards and to the right, becoming steeper.

**Reflection:** This example is comprehensive, involving all types of transformations. The critical step is factoring out the coefficient of $x$ *before* determining the horizontal shift. This ensures the correct order and magnitude of horizontal transformations. The starting point of the square root function is transformed from $(0,0)$ to $(-2,-1)$.

## 6. Common mistakes and traps

1.  **Incorrect Direction of Horizontal Shifts:** Students often think $f(x+c)$ shifts right and $f(x-c)$ shifts left. The opposite is true: $f(x+c)$ shifts left, $f(x-c)$ shifts right. Remember: "X is a liar."
2.  **Incorrect Factor for Horizontal Stretches/Compressions:** For $f(bx)$, students often think $b$ means a stretch by $b$. It's actually a stretch/compression by a factor of $1/b$. If $b=2$, it's a compression by $1/2$. If $b=1/2$, it's a stretch by $2$. Again: "X is a liar."
3.  **Order of Operations (Stretches/Reflections vs. Shifts):** Applying shifts before stretches/compressions/reflections is a common error. Always apply scaling (stretches/compressions) and reflections first, then shifts. For example, $2x^2+1$ means stretch by 2, then shift up by 1. It's *not* shift up by 1, then stretch by 2 (which would be $2(x^2+1) = 2x^2+2$).
4.  **Not Factoring for Combined Horizontal Transformations:** When you have $f(bx+c)$, students often incorrectly identify the horizontal shift as $c$. You *must* factor out $b$ first: $f(b(x+c/b))$. The actual horizontal shift is then $-c/b$.
5.  **Confusing Vertical and Horizontal Effects:** A number *outside* $f(x)$ (e.g., $a \cdot f(x)$ or $f(x)+k$) affects the $y$-values and thus causes vertical changes. A number *inside* $f(x)$ (e.g., $f(bx)$ or $f(x-h)$) affects the $x$-values and thus causes horizontal changes.
6.  **Misinterpreting Negative Signs:** A negative sign outside the function ($-f(x)$) is a reflection across the x-axis. A negative sign inside the function ($f(-x)$) is a reflection across the y-axis. Don't mix them up!

## 7. Textbook-precise explanation

Let $f$ be a function. For any positive real numbers $a, b, h, k$:

1.  **Vertical Shifts:**
    *   The graph of $y = f(x) + k$ is the graph of $f(x)$ shifted **upward** by $k$ units.
    *   The graph of $y = f(x) - k$ is the graph of $f(x)$ shifted **downward** by $k$ units.

2.  **Horizontal Shifts:**
    *   The graph of $y = f(x - h)$ is the graph of $f(x)$ shifted **to the right** by $h$ units.
    *   The graph of $y = f(x + h)$ is the graph of $f(x)$ shifted **to the left** by $h$ units.

3.  **Vertical Stretches and Compressions:**
    *   If $a > 1$, the graph of $y = a \cdot f(x)$ is the graph of $f(x)$ stretched **vertically** by a factor of $a$.
    *   If $0 < a < 1$, the graph of $y = a \cdot f(x)$ is the graph of $f(x)$ compressed **vertically** by a factor of $a$.

4.  **Horizontal Stretches and Compressions:**
    *   If $b > 1$, the graph of $y = f(bx)$ is the graph of $f(x)$ compressed **horizontally** by a factor of $\frac{1}{b}$.
    *   If $0 < b < 1$, the graph of $y = f(bx)$ is the graph of $f(x)$ stretched **horizontally** by a factor of $\frac{1}{b}$.

5.  **Reflections:**
    *   The graph of $y = -f(x)$ is the graph of $f(x)$ reflected across the **x-axis**.
    *   The graph of $y = f(-x)$ is the graph of $f(x)$ reflected across the **y-axis**.

**Combined Transformations:**
When multiple transformations are applied, they are generally applied in the following order:
1.  Horizontal stretches/compressions and reflections (due to $b$ and $f(-x)$).
2.  Horizontal shifts (due to $h$).
3.  Vertical stretches/compressions and reflections (due to $a$ and $-f(x)$).
4.  Vertical shifts (due to $k$).

This sequence can be summarized by considering a general transformed function $y = a \cdot f(b(x-h)) + k$. Here, $a$ accounts for vertical stretch/compression and x-axis reflection, $b$ accounts for horizontal stretch/compression and y-axis reflection, $h$ for horizontal shift, and $k$ for vertical shift. Note that for horizontal transformations, any term $bx+c$ must be rewritten as $b(x+c/b)$ to correctly identify $h = -c/b$.

(Refer to "Stewart, Calculus, 9e, §1.3" or "Larson, Calculus, 11e, §1.5" for similar discussions on transformations of functions.)

## 8. ASCII diagrams

Let's visualize a simple parabola $y=x^2$ and a transformed version $y=(x-2)^2+1$.

```text
       ^ y
       |
       |     f(x) = x^2
       |     .
      10 .   .
       |   .   .
       8   .   .
       | .       .
       6 .         .
       | .           .
       4 + - - - - * - - - - + - - - g(x) = (x-2)^2+1
       | .       .   .       .
       2 .     .       .   .   .
       | .   .           .   .   .
       0 + . . . . . . . . . . . . . . > x
       | -4  -2  0   2   4   6   8
       |
       -2
       |
```

**Description of the figure:**
The diagram shows a Cartesian coordinate plane with the x-axis and y-axis.
1.  The parent function $f(x) = x^2$ is represented by the lower, wider parabola. Its vertex is at the origin $(0,0)$. Key points include $(0,0)$, $(\pm 1, 1)$, $(\pm 2, 4)$, $(\pm 3, 9)$.
2.  The transformed function $g(x) = (x-2)^2+1$ is represented by the upper, narrower parabola. Its vertex is at $(2,1)$.
    *   This graph is obtained by taking $f(x)=x^2$:
        *   Shifting it **right by 2 units** (due to $x-2$ inside the function). The vertex moves from $(0,0)$ to $(2,0)$.
        *   Shifting it **up by 1 unit** (due to $+1$ outside the function). The vertex moves from $(2,0)$ to $(2,1)$.
    *   The shape of the parabola remains the same, only its position changes.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **"O.U.T.S.I.D.E. affects Y, I.N.S.I.D.E. affects X, but X is a Liar!"**
        *   **O.U.T.S.I.D.E. (Vertical changes):** Operations *outside* $f(x)$ (like $f(x)+k$, $a \cdot f(x)$, $-f(x)$) affect the Y-values (vertical shifts, stretches, reflections across X-axis) and behave intuitively (add means up, multiply by >1 means taller).
        *   **I.N.S.I.D.E. (Horizontal changes):** Operations *inside* $f(x)$ (like $f(x-h)$, $f(bx)$, $f(-x)$) affect the X-values (horizontal shifts, stretches, reflections across Y-axis).
        *   **X is a Liar!:** For horizontal changes, the signs and magnitudes are counter-intuitive.
            *   $f(x-h)$ shifts *right* (not left).
            *   $f(x+h)$ shifts *left* (not right).
            *   $f(bx)$ with $b>1$ *compresses* horizontally (not stretches).
            *   $f(bx)$ with $0<b<1$ *stretches* horizontally (not compresses).

2.  **1-3 Formulas/Facts to Overlearn:**
    *   **General Form:** $y = a \cdot f(b(x-h)) + k$
        *   $a$: Vertical stretch/compression (by factor $|a|$). If $a<0$, reflect across x-axis.
        *   $b$: Horizontal stretch/compression (by factor $1/|b|$). If $b<0$, reflect across y-axis.
        *   $h$: Horizontal shift (right if $h>0$, left if $h<0$).
        *   $k$: Vertical shift (up if $k>0$, down if $k<0$).
    *   **Order of Operations:** Apply scaling/reflections (from $a$ and $b$) first, then shifts (from $h$ and $k$). Remember to factor $b$ out of $bx+c$ to get $b(x+c/b)$.
    *   **"X is a Liar" Rule:** For horizontal transformations (inside $f$), operations seem to do the opposite of what you'd expect.

3.  **Spaced Repetition Schedule:**
    *   **Day 1:** Immediately after this lesson.
    *   **Day 3:** Review the main rules and try a few more practice problems.
    *   **Day 7:** Review the rules, focusing on the "X is a liar" aspects and order of operations.
    *   **Day 16:** Attempt a complex problem involving all transformations.
    *   **Day 35:** Revisit the general form and try to explain each parameter's effect without looking at notes.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the rules, go back to basics:
    *   **Choose a simple parent function:** $f(x) = x^2$ or $f(x) = |x|$ are excellent choices because their key points are easy to track.
    *   **Pick a few key points:** For $f(x)=x^2$, use $(0,0), (1,1), (2,4)$.
    *   **Apply one transformation at a time and manually calculate new points:**
        *   **Example: $y = (x-3)^2$ (Horizontal Shift):**
            *   To get $y=0$ (like $x^2$ at $x=0$), what $x$ do you need? $x-3=0 \implies x=3$. So $(0,0)$ shifts to $(3,0)$.
            *   To get $y=1$ (like $x^2$ at $x=1$), what $x$ do you need? $x-3=1 \implies x=4$. So $(1,1)$ shifts to $(4,1)$.
            *   Notice the points moved right. This confirms $x-h$ shifts right.
        *   **Example: $y = (2x)^2$ (Horizontal Compression):**
            *   To get $y=1$ (like $x^2$ at $x=1$), what $x$ do you need? $2x=1 \implies x=1/2$. So $(1,1)$ shifts to $(1/2,1)$.
            *   To get $y=4$ (like $x^2$ at $x=2$), what $x$ do you need? $2x=2 \implies x=1$. So $(2,4)$ shifts to $(1,4)$.
            *   Notice the points moved closer to the y-axis. This confirms $bx$ with $b>1$ compresses.
    *   By doing this for each type of transformation, you can re-derive the rules and rebuild your intuition.

## 10. Connections — what this leads to

Understanding function transformations is a cornerstone for many advanced mathematical concepts:

*   **Graphing Complex Functions:** It allows you to quickly sketch the graphs of almost any function, provided you know the graph of its parent function. This is critical for understanding function behavior, domain/range, and asymptotes.
*   **Trigonometric Functions:** Transformations are essential for graphing sine, cosine, and tangent waves, where they represent amplitude, period, phase shift, and vertical shift, which are critical in physics (waves, oscillations) and engineering (signal processing).
*   **Conic Sections:** The equations of circles, ellipses, parabolas, and hyperbolas can be seen as transformations of simpler forms centered at the origin.
*   **Linear Algebra (Matrix Transformations):** In higher mathematics, transformations (like rotations, scaling, shearing, translations) are formalized using matrices. This is fundamental to computer graphics, robotics, and data analysis.
*   **Calculus:** Understanding how transformations affect a function's graph helps in visualizing derivatives (slopes) and integrals (areas) of transformed functions. For example, a horizontal shift doesn't change the shape, so the derivative's shape will also be shifted.
*   **Differential Equations:** Solutions to differential equations often involve basic functions that are then transformed to fit initial conditions or boundary values.
*   **Statistics and Data Analysis:** Data normalization and standardization techniques (e.g., z-scores, min-max scaling) are forms of linear transformations applied to data distributions.
*   **Complex Analysis:** Transformations in the complex plane (e.g., Mobius transformations) play a crucial role in understanding geometric properties of complex functions.

## 11. Self-check questions

1.  Describe the transformations required to obtain the graph of $g(x) = |x+5| - 3$ from the parent function $f(x) = |x|$.
2.  Given the parent function $f(x) = \sqrt{x}$, write the equation of the function $h(x)$ that is stretched vertically by a factor of 4, reflected across the x-axis, and shifted right by 1 unit.
3.  Describe the sequence of transformations to go from $f(x) = x^3$ to $k(x) = -(2x-4)^3 + 7$. Be careful with the horizontal transformations.
4.  A function $f(x)$ has a local maximum at $(-2, 5)$ and a local minimum at $(3, -1)$. If $g(x) = -f(x+1)+2$, what are the coordinates of the local maximum and local minimum of $g(x)$?
5.  Consider the function $f(x) = \frac{1}{x}$. Describe the transformations and write the equation of a function $g(x)$ that has a vertical asymptote at $x=4$ and a horizontal asymptote at $y=-2$.