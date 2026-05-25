## 1. What it is — in plain English

Imagine you have a big, crinkly blanket spread out on the floor. This blanket isn't perfectly flat; it has hills and valleys. Now, imagine you place a hula hoop on top of this blanket. The hula hoop outlines a specific, limited area on the blanket.

"Absolute extrema on closed bounded regions" is simply about finding the very highest point (the absolute maximum) and the very lowest point (the absolute minimum) *within the area enclosed by that hula hoop*. We don't care about the hills and valleys outside the hoop, only the ones *inside* it, including the fabric directly underneath the hoop itself.

The "closed" part means that the boundary line (like the hula hoop) is included in the area we're considering. The "bounded" part means the area is finite – it doesn't stretch out forever in any direction. So, we're looking for the absolute highest and lowest spots on a specific, contained piece of a possibly much larger, uneven surface.

This is a fundamental problem: given a function that describes some quantity (like altitude, temperature, cost, or profit) and a specific, well-defined domain (like a map section, a temperature-controlled room, or a production limit), where within that domain does the quantity reach its highest and lowest values?

## 2. Why it matters — real-world applications

Finding absolute extrema on closed bounded regions is not just an academic exercise; it's a powerful tool with widespread applications in science, engineering, and economics.

1.  **Aerospace Engineering (Design Optimization):** Aircraft designers constantly seek to optimize the performance of components. For instance, they might want to maximize the lift-to-drag ratio of a wing or minimize the stress on a structural beam. The design variables (e.g., wing chord, thickness, camber) are often subject to manufacturing constraints (e.g., maximum size, material limits), which define a closed and bounded region in the design space. Finding the absolute maximum lift-to-drag ratio within these constraints directly leads to more fuel-efficient and safer aircraft. Companies like Boeing and Airbus use such optimization techniques extensively.

2.  **Machine Learning (Hyperparameter Tuning):** In machine learning, models have hyperparameters (e.g., learning rate, regularization strength, number of layers in a neural network) that need to be chosen to achieve the best performance (e.g., lowest error rate, highest accuracy). The "loss function" quantifies the error of the model. Often, the search space for these hyperparameters is a closed and bounded region (e.g., learning rate between 0.001 and 0.1, regularization strength between 0 and 1). Finding the absolute minimum of the loss function within this hyperparameter space is crucial for training effective models used by companies like Google (for search algorithms), Facebook (for recommendation systems), and NVIDIA (for AI hardware optimization).

3.  **Physics and Engineering (Thermal Distribution/Material Science):** Consider a metal plate with varying temperatures across its surface, described by a function $T(x,y)$. If this plate is a specific size and shape (a closed and bounded region), engineers might need to find the absolute hottest and coldest spots on it. This is critical for designing cooling systems, preventing material fatigue, or ensuring components operate within safe temperature limits. For example, Intel might need to find the maximum temperature on a new CPU design to ensure it doesn't overheat, or NASA might need to find the minimum temperature on a satellite component in deep space.

4.  **Economics and Business (Profit Maximization/Cost Minimization):** A company's profit function $P(x,y,z)$ might depend on the production levels of different goods ($x,y,z$). There are always constraints: limited raw materials, labor hours, or market demand, which define a closed and bounded region for $x,y,z$. Businesses strive to find the absolute maximum profit within these operational constraints. Similarly, they might want to find the absolute minimum cost for producing a certain output. Financial institutions and manufacturing companies regularly employ such optimization to make strategic decisions.

## 3. Prerequisites — what you must know first

Before diving into absolute extrema on closed bounded regions, ensure you have a solid grasp of the following concepts. If any of these feel unfamiliar, pause and review them.

*   **Single-Variable Calculus Extrema:** The ability to find local and absolute maxima and minima of a function of a single variable $f(x)$ on a closed interval $[a,b]$. This involves finding critical points (where $f'(x)=0$ or $f'(x)$ is undefined) and evaluating $f(x)$ at these critical points and the endpoints $a$ and $b$.
*   **Partial Derivatives:** How to compute first-order partial derivatives, $\frac{\partial f}{\partial x}$ and $\frac{\partial f}{\partial y}$, for a multivariable function $f(x,y)$.
*   **Critical Points for Multivariable Functions:** Understanding that critical points for $f(x,y)$ are points where the gradient vector $\nabla f(x,y) = \langle \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y} \rangle$ is the zero vector $\langle 0,0 \rangle$, or where one or both partial derivatives are undefined.
*   **Continuity of Multivariable Functions:** Knowing what it means for a function $f(x,y)$ to be continuous on a region. Roughly, this means the function has no jumps, holes, or asymptotes within that region. Polynomials, exponentials, sines, and cosines are continuous everywhere.
*   **Closed and Bounded Sets (Topology Basics):**
    *   **Closed Set:** A set that contains all its boundary points. For example, a disk $x^2+y^2 \le R^2$ is closed because it includes the circle $x^2+y^2=R^2$. An open disk $x^2+y^2 < R^2$ is not closed. A rectangle including its edges is closed.
    *   **Bounded Set:** A set that can be contained within some finite "box" or "ball." For example, a disk or a square is bounded. The entire $xy$-plane is not bounded.
*   **Parameterization of Curves:** The ability to represent a curve (e.g., a line segment, a circle, a parabola) in the $xy$-plane using a single parameter, typically $t$. For example, a line segment from $(x_0, y_0)$ to $(x_1, y_1)$ can be parameterized as $x(t) = x_0 + (x_1-x_0)t$, $y(t) = y_0 + (y_1-y_0)t$ for $0 \le t \le 1$.

## 4. The core idea — step by step

The process for finding the absolute extrema of a continuous function on a closed and bounded region is a systematic application of ideas from single-variable calculus, extended to multiple dimensions. The core idea is that the absolute maximum and minimum values *must* occur either at a critical point *inside* the region or at a point *on its boundary*.

### Step 1: Understand the Problem Setup and the Extreme Value Theorem

*   **Plain English Statement:** We're given a function $f(x,y)$ (like altitude on a map) and a specific, well-defined area $D$ (like a park boundary on that map). Our goal is to find the absolute highest and lowest points of the "altitude" only within that park boundary, including its perimeter. The good news is that if our "altitude" function is smooth (continuous) and our "park" is a nice, contained area (closed and bounded), then we are guaranteed that such highest and lowest points *do* exist. We just need to find them.

*   **Small Concrete Example:** Consider the function $f(x,y) = x^2 + y^2$, which describes a paraboloid (a bowl shape). Let our region $D$ be the unit disk: $x^2 + y^2 \le 1$. This disk is closed (includes its boundary circle) and bounded (it's finite). The function $f(x,y)$ is continuous (it's a polynomial). So, we are guaranteed that an absolute maximum and minimum exist somewhere within or on this disk.

*   **Formal/Mathematical Version:**
    Let $f: D \to \mathbb{R}$ be a function of two variables, where $D \subset \mathbb{R}^2$ is a closed and bounded set.
    **Extreme Value Theorem (Multivariable Version):** If $f$ is continuous on a closed and bounded set $D$, then $f$ attains an absolute maximum value $f(\mathbf{x}_1)$ and an absolute minimum value $f(\mathbf{x}_2)$ at some points $\mathbf{x}_1, \mathbf{x}_2 \in D$.

*   **What Could Go Wrong:** Forgetting to check if the function is continuous or if the region is closed and bounded. If these conditions aren't met, the absolute extrema might not exist. For example, $f(x,y) = 1/(x^2+y^2)$ on the disk $x^2+y^2 \le 1$ *excluding* the origin. This region is not closed (it's missing the origin, which is a boundary point). The function is also not continuous at the origin. In this case, there is no absolute maximum as $f(x,y)$ approaches infinity near $(0,0)$.

### Step 2: Find Critical Points in the Interior of the Region

*   **Plain English Statement:** Our first step is to look for potential "peaks" and "valleys" *inside* our park boundary, not on the edges yet. These are the spots where the surface is locally flat, meaning the slope in every direction is zero.

*   **Small Concrete Example:** Let's use $f(x,y) = x^2 + y^2 - 2x - 4y$ on the square region $D = [0,3] \times [0,3]$.
    To find critical points, we compute the partial derivatives and set them to zero:
    $\frac{\partial f}{\partial x} = 2x - 2$
    $\frac{\partial f}{\partial y} = 2y - 4$
    Setting them to zero:
    $2x - 2 = 0 \Rightarrow x = 1$
    $2y - 4 = 0 \Rightarrow y = 2$
    So, the critical point is $(1,2)$.
    Now, we check if this point is *inside* our region $D$. The region is $0 \le x \le 3$ and $0 \le y \le 3$. Since $0 < 1 < 3$ and $0 < 2 < 3$, the point $(1,2)$ *is* in the interior of $D$.
    We evaluate the function at this point: $f(1,2) = (1)^2 + (2)^2 - 2(1) - 4(2) = 1 + 4 - 2 - 8 = -5$. This is a candidate for the absolute minimum.

*   **Formal/Mathematical Version:**
    1.  Compute the first-order partial derivatives $\frac{\partial f}{\partial x}$ and $\frac{\partial f}{\partial y}$.
    2.  Set both partial derivatives to zero and solve the resulting system of equations:
        $$ \frac{\partial f}{\partial x}(x,y) = 0 $$
        $$ \frac{\partial f}{\partial y}(x,y) = 0 $$
    3.  Identify any points $(x,y)$ where one or both partial derivatives are undefined.
    4.  For each critical point found, check if it lies strictly *within* the interior of the region $D$ (i.e., not on the boundary).
    5.  Evaluate $f(x,y)$ at all critical points that are in the interior of $D$. These values are candidates for absolute extrema.

*   **What Could Go Wrong:** Forgetting to check if a critical point actually lies *within* the specified region. If a critical point is outside the region, it's irrelevant for finding extrema *on that region*.

### Step 3: Analyze the Boundary of the Region

*   **Plain English Statement:** The absolute highest or lowest points might not be inside the region; they could be right on the edge, like the highest point on the rim of a bowl. So, we need to "walk" along the entire boundary of our region and find the highest and lowest points *on that boundary*. This usually involves breaking the boundary into several pieces (like the four sides of a square or the arc of a circle) and analyzing each piece separately using single-variable calculus.

*   **Small Concrete Example:** Continuing with $f(x,y) = x^2 + y^2 - 2x - 4y$ on the square region $D = [0,3] \times [0,3]$. The boundary consists of four line segments:
    *   **Segment 1 (Bottom edge):** $y=0$, for $0 \le x \le 3$.
        Substitute $y=0$ into $f(x,y)$: $g_1(x) = f(x,0) = x^2 + (0)^2 - 2x - 4(0) = x^2 - 2x$.
        Now we have a single-variable problem: find extrema of $g_1(x)$ on $[0,3]$.
        $g_1'(x) = 2x - 2$. Set $g_1'(x)=0 \Rightarrow x=1$. This is in $[0,3]$.
        Candidate points for this segment: $(1,0)$.
        Also, check the endpoints of the segment: $(0,0)$ and $(3,0)$.
        Evaluate $f$ at these points: $f(1,0) = 1^2 - 2(1) = -1$. $f(0,0)=0$. $f(3,0)=3^2-2(3)=3$.

    *   **Segment 2 (Right edge):** $x=3$, for $0 \le y \le 3$.
        Substitute $x=3$ into $f(x,y)$: $g_2(y) = f(3,y) = (3)^2 + y^2 - 2(3) - 4y = 9 + y^2 - 6 - 4y = y^2 - 4y + 3$.
        $g_2'(y) = 2y - 4$. Set $g_2'(y)=0 \Rightarrow y=2$. This is in $[0,3]$.
        Candidate points: $(3,2)$.
        Endpoints: $(3,0)$ (already checked) and $(3,3)$.
        Evaluate $f$ at these points: $f(3,2) = 3^2+2^2-2(3)-4(2) = 9+4-6-8 = -1$. $f(3,3) = 3^2+3^2-2(3)-4(3) = 9+9-6-12 = 0$.

    *   **Segment 3 (Top edge):** $y=3$, for $0 \le x \le 3$.
        $g_3(x) = f(x,3) = x^2 + (3)^2 - 2x - 4(3) = x^2 - 2x + 9 - 12 = x^2 - 2x - 3$.
        $g_3'(x) = 2x - 2$. Set $g_3'(x)=0 \Rightarrow x=1$. This is in $[0,3]$.
        Candidate points: $(1,3)$.
        Endpoints: $(0,3)$ and $(3,3)$ (already checked).
        Evaluate $f$ at these points: $f(1,3) = 1^2-2(1)-3 = 1-2-3 = -4$. $f(0,3) = 0^2-2(0)-3 = -3$.

    *   **Segment 4 (Left edge):** $x=0$, for $0 \le y \le 3$.
        $g_4(y) = f(0,y) = (0)^2 + y^2 - 2(0) - 4y = y^2 - 4y$.
        $g_4'(y) = 2y - 4$. Set $g_4'(y)=0 \Rightarrow y=2$. This is in $[0,3]$.
        Candidate points: $(0,2)$.
        Endpoints: $(0,0)$ (already checked) and $(0,3)$ (already checked).
        Evaluate $f$ at these points: $f(0,2) = 0^2+2^2-2(0)-4(2) = 4-8 = -4$.

*   **Formal/Mathematical Version:**
    1.  Divide the boundary $\partial D$ into a finite number of smooth curves or segments.
    2.  For each segment, parameterize it using a single variable (e.g., $x(t), y(t)$ for $a \le t \le b$, or by substituting one variable in terms of the other, like $y=g(x)$).
    3.  Substitute the parameterization into $f(x,y)$ to obtain a single-variable function, say $h(t) = f(x(t), y(t))$.
    4.  Find the absolute extrema of $h(t)$ on its closed interval $[a,b]$ using single-variable calculus techniques:
        *   Find critical points of $h(t)$ (where $h'(t)=0$ or $h'(t)$ is undefined).
        *   Evaluate $h(t)$ at these critical points and at the endpoints $t=a$ and $t=b$.
    5.  Convert these $t$-values back to $(x,y)$ coordinates and evaluate $f(x,y)$ at these points. These are additional candidates for absolute extrema.
    *Note: The corner points of the region will be evaluated multiple times as they are endpoints of different segments. This is fine; just collect their $f$-values once.*

*   **What Could Go Wrong:** Incorrectly parameterizing a boundary segment, forgetting to check the endpoints of the parameterized interval, or making algebraic errors in the single-variable optimization step. Missing an entire segment of the boundary is also a common and fatal mistake.

### Step 4: Compare All Candidate Values

*   **Plain English Statement:** Now we have a list of function values from all the "important" points: the critical points inside the region and all the critical points and endpoints along the boundary. All we need to do is look at this list and pick out the biggest number (that's our absolute maximum) and the smallest number (that's our absolute minimum).

*   **Small Concrete Example:**
    From Step 2 (interior critical point): $f(1,2) = -5$.
    From Step 3 (boundary points):
    $f(0,0) = 0$
    $f(3,0) = 3$
    $f(1,0) = -1$
    $f(3,2) = -1$
    $f(3,3) = 0$
    $f(1,3) = -4$
    $f(0,3) = -3$
    $f(0,2) = -4$

    List all candidate values: $\{-5, 0, 3, -1, -1, 0, -4, -3, -4\}$.
    The largest value in this list is $3$.
    The smallest value in this list is $-5$.

    So, the absolute maximum of $f(x,y)$ on $D$ is $3$ (at $(3,0)$) and the absolute minimum is $-5$ (at $(1,2)$).

*   **Formal/Mathematical Version:**
    1.  Collect all the function values obtained from Step 2 (interior critical points) and Step 3 (extrema on the boundary segments).
    2.  The largest value in this collection is the absolute maximum value of $f$ on $D$.
    3.  The smallest value in this collection is the absolute minimum value of $f$ on $D$.
    4.  State the points $(x,y)$ where these extrema occur.

*   **What Could Go Wrong:** Forgetting to evaluate $f$ at *all* candidate points, or making simple arithmetic errors when comparing values.

## 5. Worked examples — multiple, with every step shown

Here are several examples demonstrating the full procedure, from easy to more challenging.

### Example 1: Simple Disk Region

**Problem:** Find the absolute maximum and minimum values of the function $f(x,y) = x^2 + y^2 - 2x$ on the closed disk $D = \{(x,y) \mid x^2 + y^2 \le 4\}$.

**1. Identify what's given and what we want:**
*   Given function: $f(x,y) = x^2 + y^2 - 2x$. This is a polynomial, so it's continuous everywhere.
*   Given region: $D$ is the disk of radius 2 centered at the origin, including its boundary. This is a closed and bounded region.
*   We want: The absolute maximum and minimum values of $f$ on $D$.

**2. Find critical points in the interior of $D$:**
*   **Step 2.1: Compute partial derivatives.**
    $$ \frac{\partial f}{\partial x} = \frac{\partial}{\partial x}(x^2 + y^2 - 2x) = 2x - 2 $$
    $$ \frac{\partial f}{\partial y} = \frac{\partial}{\partial y}(x^2 + y^2 - 2x) = 2y $$
*   **Step 2.2: Set partial derivatives to zero and solve.**
    $$ 2x - 2 = 0 \implies 2x = 2 \implies x = 1 $$
    $$ 2y = 0 \implies y = 0 $$
    The only critical point is $(1,0)$.
*   **Step 2.3: Check if the critical point is in the interior of $D$.**
    The interior of $D$ is $x^2 + y^2 < 4$.
    For $(1,0)$: $1^2 + 0^2 = 1$. Since $1 < 4$, the point $(1,0)$ is indeed in the interior of $D$.
*   **Step 2.4: Evaluate $f$ at the critical point.**
    $$ f(1,0) = (1)^2 + (0)^2 - 2(1) = 1 + 0 - 2 = -1 $$
    This is our first candidate value.

**3. Analyze the boundary of $D$:**
The boundary of $D$ is the circle $x^2 + y^2 = 4$.
*   **Step 3.1: Parameterize the boundary.**
    We can use polar coordinates: $x = 2\cos\theta$, $y = 2\sin\theta$ for $0 \le \theta \le 2\pi$.
*   **Step 3.2: Substitute the parameterization into $f(x,y)$.**
    $$ g(\theta) = f(2\cos\theta, 2\sin\theta) = (2\cos\theta)^2 + (2\sin\theta)^2 - 2(2\cos\theta) $$
    $$ g(\theta) = 4\cos^2\theta + 4\sin^2\theta - 4\cos\theta $$
    Using the identity $\cos^2\theta + \sin^2\theta = 1$:
    $$ g(\theta) = 4(1) - 4\cos\theta = 4 - 4\cos\theta $$
*   **Step 3.3: Find extrema of $g(\theta)$ on $[0, 2\pi]$ using single-variable calculus.**
    Compute $g'(\theta)$:
    $$ g'(\theta) = \frac{d}{d\theta}(4 - 4\cos\theta) = 4\sin\theta $$
    Set $g'(\theta) = 0$:
    $$ 4\sin\theta = 0 \implies \sin\theta = 0 $$
    On the interval $[0, 2\pi]$, $\sin\theta = 0$ when $\theta = 0, \pi, 2\pi$.
*   **Step 3.4: Evaluate $f$ at these boundary points (and endpoints of the parameterization).**
    The endpoints $\theta=0$ and $\theta=2\pi$ correspond to the same point on the circle.
    *   For $\theta = 0$:
        $x = 2\cos(0) = 2(1) = 2$
        $y = 2\sin(0) = 2(0) = 0$
        Point: $(2,0)$.
        $f(2,0) = (2)^2 + (0)^2 - 2(2) = 4 + 0 - 4 = 0$.
    *   For $\theta = \pi$:
        $x = 2\cos(\pi) = 2(-1) = -2$
        $y = 2\sin(\pi) = 2(0) = 0$
        Point: $(-2,0)$.
        $f(-2,0) = (-2)^2 + (0)^2 - 2(-2) = 4 + 0 + 4 = 8$.

**4. Compare all candidate values:**
Our candidate values for $f(x,y)$ are:
*   From interior critical point: $f(1,0) = -1$.
*   From boundary critical points: $f(2,0) = 0$, $f(-2,0) = 8$.

Comparing $\{-1, 0, 8\}$:
*   The absolute maximum value is $8$.
*   The absolute minimum value is $-1$.

**Final Answer:**
The absolute maximum value of $f(x,y)$ on the disk $D$ is $\mathbf{8}$ at the point $(-2,0)$.
The absolute minimum value of $f(x,y)$ on the disk $D$ is $\mathbf{-1}$ at the point $(1,0)$.

**Reflection:** This example was relatively easy because the interior critical point was simple to find and the circular boundary allowed for a straightforward parameterization that simplified the function significantly. The maximum occurred on the boundary, while the minimum occurred in the interior.

---

### Example 2: Square Region

**Problem:** Find the absolute maximum and minimum values of $f(x,y) = x^2 + y^2 - 2x - 4y$ on the square region $D = \{(x,y) \mid 0 \le x \le 3, 0 \le y \le 3\}$.

**1. Identify what's given and what we want:**
*   Given function: $f(x,y) = x^2 + y^2 - 2x - 4y$. Continuous everywhere.
*   Given region: $D$ is a square with vertices $(0,0), (3,0), (3,3), (0,3)$. This is a closed and bounded region.
*   We want: Absolute max and min values of $f$ on $D$.

**2. Find critical points in the interior of $D$:**
*   **Step 2.1: Compute partial derivatives.**
    $$ \frac{\partial f}{\partial x} = 2x - 2 $$
    $$ \frac{\partial f}{\partial y} = 2y - 4 $$
*   **Step 2.2: Set partial derivatives to zero and solve.**
    $$ 2x - 2 = 0 \implies x = 1 $$
    $$ 2y - 4 = 0 \implies y = 2 $$
    The critical point is $(1,2)$.
*   **Step 2.3: Check if the critical point is in the interior of $D$.**
    The interior of $D$ is $0 < x < 3$ and $0 < y < 3$.
    For $(1,2)$: $0 < 1 < 3$ and $0 < 2 < 3$. So, $(1,2)$ is in the interior.
*   **Step 2.4: Evaluate $f$ at the critical point.**
    $$ f(1,2) = (1)^2 + (2)^2 - 2(1) - 4(2) = 1 + 4 - 2 - 8 = -5 $$
    This is a candidate value.

**3. Analyze the boundary of $D$:**
The boundary consists of four line segments.

*   **Segment 1: Bottom edge ($y=0$, $0 \le x \le 3$)**
    *   **Step 3.1: Parameterize (substitute).**
        Let $g_1(x) = f(x,0) = x^2 + (0)^2 - 2x - 4(0) = x^2 - 2x$.
    *   **Step 3.2: Find extrema of $g_1(x)$ on $[0,3]$.**
        $g_1'(x) = 2x - 2$.
        Set $g_1'(x) = 0 \implies 2x - 2 = 0 \implies x = 1$.
        This $x=1$ is in the interval $[0,3]$.
    *   **Step 3.3: Evaluate $f$ at critical points and endpoints of the segment.**
        Points to check: $(1,0)$, and endpoints $(0,0), (3,0)$.
        $$ f(1,0) = (1)^2 + (0)^2 - 2(1) - 4(0) = 1 - 2 = -1 $$
        $$ f(0,0) = (0)^2 + (0)^2 - 2(0) - 4(0) = 0 $$
        $$ f(3,0) = (3)^2 + (0)^2 - 2(3) - 4(0) = 9 - 6 = 3 $$

*   **Segment 2: Right edge ($x=3$, $0 \le y \le 3$)**
    *   **Step 3.1: Parameterize (substitute).**
        Let $g_2(y) = f(3,y) = (3)^2 + y^2 - 2(3) - 4y = 9 + y^2 - 6 - 4y = y^2 - 4y + 3$.
    *   **Step 3.2: Find extrema of $g_2(y)$ on $[0,3]$.**
        $g_2'(y) = 2y - 4$.
        Set $g_2'(y) = 0 \implies 2y - 4 = 0 \implies y = 2$.
        This $y=2$ is in the interval $[0,3]$.
    *   **Step 3.3: Evaluate $f$ at critical points and endpoints of the segment.**
        Points to check: $(3,2)$, and endpoints $(3,0)$ (already checked), $(3,3)$.
        $$ f(3,2) = (3)^2 + (2)^2 - 2(3) - 4(2) = 9 + 4 - 6 - 8 = -1 $$
        $$ f(3,3) = (3)^2 + (3)^2 - 2(3) - 4(3) = 9 + 9 - 6 - 12 = 0 $$

*   **Segment 3: Top edge ($y=3$, $0 \le x \le 3$)**
    *   **Step 3.1: Parameterize (substitute).**
        Let $g_3(x) = f(x,3) = x^2 + (3)^2 - 2x - 4(3) = x^2 + 9 - 2x - 12 = x^2 - 2x - 3$.
    *   **Step 3.2: Find extrema of $g_3(x)$ on $[0,3]$.**
        $g_3'(x) = 2x - 2$.
        Set $g_3'(x) = 0 \implies 2x - 2 = 0 \implies x = 1$.
        This $x=1$ is in the interval $[0,3]$.
    *   **Step 3.3: Evaluate $f$ at critical points and endpoints of the segment.**
        Points to check: $(1,3)$, and endpoints $(0,3), (3,3)$ (already checked).
        $$ f(1,3) = (1)^2 + (3)^2 - 2(1) - 4(3) = 1 + 9 - 2 - 12 = -4 $$
        $$ f(0,3) = (0)^2 + (3)^2 - 2(0) - 4(3) = 9 - 12 = -3 $$

*   **Segment 4: Left edge ($x=0$, $0 \le y \le 3$)**
    *   **Step 3.1: Parameterize (substitute).**
        Let $g_4(y) = f(0,y) = (0)^2 + y^2 - 2(0) - 4y = y^2 - 4y$.
    *   **Step 3.2: Find extrema of $g_4(y)$ on $[0,3]$.**
        $g_4'(y) = 2y - 4$.
        Set $g_4'(y) = 0 \implies 2y - 4 = 0 \implies y = 2$.
        This $y=2$ is in the interval $[0,3]$.
    *   **Step 3.3: Evaluate $f$ at critical points and endpoints of the segment.**
        Points to check: $(0,2)$, and endpoints $(0,0)$ (already checked), $(0,3)$ (already checked).
        $$ f(0,2) = (0)^2 + (2)^2 - 2(0) - 4(2) = 4 - 8 = -4 $$

**4. Compare all candidate values:**
Collect all unique function values found:
*   Interior: $f(1,2) = -5$
*   Boundary: $f(1,0) = -1$, $f(0,0) = 0$, $f(3,0) = 3$, $f(3,2) = -1$, $f(3,3) = 0$, $f(1,3) = -4$, $f(0,3) = -3$, $f(0,2) = -4$.

The list of candidate values is: $\{-5, -1, 0, 3, -4, -3\}$.
*   The largest value is $3$.
*   The smallest value is $-5$.

**Final Answer:**
The absolute maximum value of $f(x,y)$ on the square region $D$ is $\mathbf{3}$ at the point $(3,0)$.
The absolute minimum value of $f(x,y)$ on the square region $D$ is $\mathbf{-5}$ at the point $(1,2)$.

**Reflection:** This example demonstrates the full procedure for a polygonal region. It's crucial to systematically analyze each boundary segment and remember to check the endpoints of each segment, which correspond to the corners of the square. Notice that the absolute minimum occurred in the interior, while the absolute maximum occurred on the boundary.

---

### Example 3: Triangular Region

**Problem:** Find the absolute maximum and minimum values of $f(x,y) = xy$ on the triangular region $D$ with vertices $(0,0), (2,0), (0,4)$.

**1. Identify what's given and what we want:**
*   Given function: $f(x,y) = xy$. Continuous everywhere.
*   Given region: $D$ is a triangle with vertices $(0,0), (2,0), (0,4)$. This is a closed and bounded region.
*   We want: Absolute max and min values of $f$ on $D$.

**2. Find critical points in the interior of $D$:**
*   **Step 2.1: Compute partial derivatives.**
    $$ \frac{\partial f}{\partial x} = y $$
    $$ \frac{\partial f}{\partial y} = x $$
*   **Step 2.2: Set partial derivatives to zero and solve.**
    $$ y = 0 $$
    $$ x = 0 $$
    The only critical point is $(0,0)$.
*   **Step 2.3: Check if the critical point is in the interior of $D$.**
    The point $(0,0)$ is a vertex of the triangle, meaning it's on the boundary, not strictly in the interior.
*   **Step 2.4: Evaluate $f$ at the critical point (if it were in the interior).**
    Since $(0,0)$ is on the boundary, we'll include it in our boundary analysis. For now, there are no interior critical points to add to our candidate list.

**3. Analyze the boundary of $D$:**
The boundary consists of three line segments connecting the vertices.

*   **Segment 1: From $(0,0)$ to $(2,0)$ (x-axis)**
    *   **Step 3.1: Parameterize.**
        $y=0$, for $0 \le x \le 2$.
        Let $g_1(x) = f(x,0) = x \cdot 0 = 0$.
    *   **Step 3.2: Find extrema of $g_1(x)$ on $[0,2]$.**
        $g_1'(x) = 0$. This means $g_1(x)$ is constant.
    *   **Step 3.3: Evaluate $f$ at critical points and endpoints.**
        All points on this segment give $f(x,0)=0$.
        Points to check: $(0,0)$ and $(2,0)$.
        $$ f(0,0) = 0 $$
        $$ f(2,0) = 0 $$

*   **Segment 2: From $(0,0)$ to $(0,4)$ (y-axis)**
    *   **Step 3.1: Parameterize.**
        $x=0$, for $0 \le y \le 4$.
        Let $g_2(y) = f(0,y) = 0 \cdot y = 0$.
    *   **Step 3.2: Find extrema of $g_2(y)$ on $[0,4]$.**
        $g_2'(y) = 0$. This means $g_2(y)$ is constant.
    *   **Step 3.3: Evaluate $f$ at critical points and endpoints.**
        All points on this segment give $f(0,y)=0$.
        Points to check: $(0,0)$ (already checked) and $(0,4)$.
        $$ f(0,4) = 0 $$

*   **Segment 3: From $(2,0)$ to $(0,4)$**
    *   **Step 3.1: Parameterize.**
        First, find the equation of the line passing through $(2,0)$ and $(0,4)$.
        Slope $m = \frac{4-0}{0-2} = \frac{4}{-2} = -2$.
        Using point-slope form with $(0,4)$: $y - 4 = -2(x - 0) \implies y = -2x + 4$.
        This segment is $y = -2x+4$ for $0 \le x \le 2$.
        Let $g_3(x) = f(x, -2x+4) = x(-2x+4) = -2x^2 + 4x$.
    *   **Step 3.2: Find extrema of $g_3(x)$ on $[0,2]$.**
        $g_3'(x) = -4x + 4$.
        Set $g_3'(x) = 0 \implies -4x + 4 = 0 \implies 4x = 4 \implies x = 1$.
        This $x=1$ is in the interval $[0,2]$.
    *   **Step 3.3: Evaluate $f$ at critical points and endpoints.**
        When $x=1$, $y = -2(1)+4 = 2$. So, the critical point is $(1,2)$.
        Endpoints are $(2,0)$ (already checked) and $(0,4)$ (already checked).
        $$ f(1,2) = (1)(2) = 2 $$

**4. Compare all candidate values:**
Collect all unique function values found:
*   Interior: None.
*   Boundary: $f(0,0)=0$, $f(2,0)=0$, $f(0,4)=0$, $f(1,2)=2$.

The list of candidate values is: $\{0, 2\}$.
*   The largest value is $2$.
*   The smallest value is $0$.

**Final Answer:**
The absolute maximum value of $f(x,y)$ on the triangular region $D$ is $\mathbf{2}$ at the point $(1,2)$.
The absolute minimum value of $f(x,y)$ on the triangular region $D$ is $\mathbf{0}$ at any point on the segments connecting $(0,0)$ to $(2,0)$ or $(0,0)$ to $(0,4)$.

**Reflection:** This example highlights that the critical point might be on the boundary, not strictly in the interior. Also, the absolute minimum can occur at multiple points along an entire segment, not just a single point. This is crucial to note.

---

### Example 4: Region Bounded by a Parabola and a Line

**Problem:** Find the absolute maximum and minimum values of $f(x,y) = x^2y$ on the region $D$ bounded by $y=x^2$ and $y=4$.

**1. Identify what's given and what we want:**
*   Given function: $f(x,y) = x^2y$. Continuous everywhere.
*   Given region: $D$ is bounded by the parabola $y=x^2$ and the horizontal line $y=4$.
    First, find the intersection points of $y=x^2$ and $y=4$:
    $x^2 = 4 \implies x = \pm 2$. So, the intersection points are $(-2,4)$ and $(2,4)$.
    The region $D$ is the area between the parabola $y=x^2$ and the line $y=4$, for $-2 \le x \le 2$. This is a closed and bounded region.
*   We want: Absolute max and min values of $f$ on $D$.

**2. Find critical points in the interior of $D$:**
*   **Step 2.1: Compute partial derivatives.**
    $$ \frac{\partial f}{\partial x} = \frac{\partial}{\partial x}(x^2y) = 2xy $$
    $$ \frac{\partial f}{\partial y} = \frac{\partial}{\partial y}(x^2y) = x^2 $$
*   **Step 2.2: Set partial derivatives to zero and solve.**
    $$ 2xy = 0 $$
    $$ x^2 = 0 $$
    From $x^2=0$, we get $x=0$.
    Substitute $x=0$ into the first equation: $2(0)y = 0 \implies 0 = 0$. This means any point $(0,y)$ is a critical point as long as $x=0$.
    So, all points on the y-axis, $(0,y)$, are critical points for $f(x,y)=x^2y$.
*   **Step 2.3: Check if the critical points are in the interior of $D$.**
    The region $D$ is defined by $x^2 \le y \le 4$ and $-2 \le x \le 2$.
    For the critical points $(0,y)$:
    We need $0^2 \le y \le 4$, which means $0 \le y \le 4$.
    Points $(0,y)$ for $0 < y < 4$ are in the interior of $D$.
    Points $(0,0)$ and $(0,4)$ are on the boundary.
*   **Step 2.4: Evaluate $f$ at the interior critical points.**
    For any critical point $(0,y)$ where $0 < y < 4$:
    $$ f(0,y) = (0)^2y = 0 $$
    So, all interior critical points give a function value of $0$. This is a candidate value.

**3. Analyze the boundary of $D$:**
The boundary consists of two segments: the parabola $y=x^2$ and the line $y=4$.

*   **Segment 1: The parabola $y=x^2$ for $-2 \le x \le 2$.**
    *   **Step 3.1: Parameterize (substitute).**
        Let $g_1(x) = f(x, x^2) = x^2(x^2) = x^4$.
    *   **Step 3.2: Find extrema of $g_1(x)$ on $[-2,2]$.**
        $g_1'(x) = 4x^3$.
        Set $g_1'(x) = 0 \implies 4x^3 = 0 \implies x = 0$.
        This $x=0$ is in the interval $[-2,2]$.
    *   **Step 3.3: Evaluate $f$ at critical points and endpoints of the segment.**
        When $x=0$, $y=0^2=0$. Point: $(0,0)$.
        Endpoints: $x=-2$ and $x=2$.
        When $x=-2$, $y=(-2)^2=4$. Point: $(-2,4)$.
        When $x=2$, $y=(2)^2=4$. Point: $(2,4)$.
        $$ f(0,0) = (0)^2(0) = 0 $$
        $$ f(-2,4) = (-2)^2(4) = 4 \cdot 4 = 16 $$
        $$ f(2,4) = (2)^2(4) = 4 \cdot 4 = 16 $$

*   **Segment 2: The line $y=4$ for $-2 \le x \le 2$.**
    *   **Step 3.1: Parameterize (substitute).**
        Let $g_2(x) = f(x, 4) = x^2(4) = 4x^2$.
    *   **Step 3.2: Find extrema of $g_2(x)$ on $[-2,2]$.**
        $g_2'(x) = 8x$.
        Set $g_2'(x) = 0 \implies 8x = 0 \implies x = 0$.
        This $x=0$ is in the interval $[-2,2]$.
    *   **Step 3.3: Evaluate $f$ at critical points and endpoints of the segment.**
        When $x=0$, $y=4$. Point: $(0,4)$.
        Endpoints: $x=-2$ and $x=2$.
        When $x=-2$, $y=4$. Point: $(-2,4)$ (already checked).
        When $x=2$, $y=4$. Point: $(2,4)$ (already checked).
        $$ f(0,4) = (0)^2(4) = 0 $$

**4. Compare all candidate values:**
Collect all unique function values found:
*   Interior: $f(0,y) = 0$ for $0 < y < 4$. So, $0$ is a candidate.
*   Boundary: $f(0,0) = 0$, $f(-2,4) = 16$, $f(2,4) = 16$, $f(0,4) = 0$.

The list of candidate values is: $\{0, 16\}$.
*   The largest value is $16$.
*   The smallest value is $0$.

**Final Answer:**
The absolute maximum value of $f(x,y)$ on the region $D$ is $\mathbf{16}$ at the points $(-2,4)$ and $(2,4)$.
The absolute minimum value of $f(x,y)$ on the region $D$ is $\mathbf{0}$ at any point on the y-axis segment connecting $(0,0)$ to $(0,4)$ (i.e., $(0,y)$ for $0 \le y \le 4$).

**Reflection:** This example presented a critical point that was actually a line segment (the y-axis) within the domain. It's important to recognize when $\nabla f = \mathbf{0}$ for an infinite set of points. The boundary analysis was similar to previous examples, but the function behaved differently on the parabolic segment versus the linear segment. The minimum occurred along a line segment within the region, and the maximum occurred at the corners of the region.

## 6. Common mistakes and traps

Students often fall into specific traps when finding absolute extrema. Being aware of these can save a lot of frustration.

1.  **Forgetting to check if interior critical points are *in* the region:** A critical point found by setting partial derivatives to zero is only relevant if it actually lies within the interior of the specified domain $D$. If it's outside $D$ or on its boundary, it should not be included in the interior candidate list (though it might be discovered again during boundary analysis).
2.  **Missing parts of the boundary:** For regions with multiple segments (like squares or triangles), students sometimes analyze only one or two segments and forget others. Ensure you account for the *entire* boundary.
3.  **Not checking endpoints of parameterized boundary segments:** When you reduce a boundary segment to a single-variable function on an interval $[a,b]$, you must remember to check the function's value at $t=a$ and $t=b$, in addition to any critical points within $(a,b)$. These endpoints correspond to the "corners" of your region.
4.  **Algebraic errors in partial derivatives or solving systems of equations:** A small arithmetic mistake early on can propagate and lead to incorrect critical points and ultimately wrong answers. Double-check your derivatives and algebra.
5.  **Forgetting to evaluate $f$ at all candidate points:** The final step is to compare the *values* of $f$ at all candidate points. It's easy to find the points $(x,y)$ but forget to plug them back into the original $f(x,y)$ function.
6.  **Confusing local extrema with absolute extrema:** The second derivative test helps classify local maxima, minima, and saddle points. However, for absolute extrema on closed bounded regions, we don't *need* the second derivative test. We just collect all candidate values and compare them directly. The second derivative test is for local behavior, not global.

## 7. Textbook-precise explanation

The procedure for finding absolute extrema of a continuous function on a closed and bounded region is a direct application of the Multivariable Extreme Value Theorem.

Let $D$ be a closed and bounded set in $\mathbb{R}^2$ (or $\mathbb{R}^n$). Let $f: D \to \mathbb{R}$ be a function that is continuous on $D$.

**Multivariable Extreme Value Theorem:** If $f$ is continuous on a closed and bounded set $D$, then $f$ attains an absolute maximum value $f(\mathbf{x}_1)$ and an absolute minimum value $f(\mathbf{x}_2)$ at some points $\mathbf{x}_1, \mathbf{x}_2 \in D$.

The absolute extrema must occur either at a critical point in the interior of $D$ or at a point on the boundary $\partial D$.

**Procedure to find absolute extrema:**

1.  **Identify Critical Points in the Interior:**
    *   Compute the first-order partial derivatives of $f$, $\frac{\partial f}{\partial x}$ and $\frac{\partial f}{\partial y}$.
    *   Find all points $(x,y)$ in the interior of $D$ (i.e., not on $\partial D$) where $\nabla f(x,y) = \langle \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y} \rangle = \mathbf{0}$, or where one or both partial derivatives are undefined. These are the critical points.
    *   Evaluate $f(x,y)$ at each of these critical points. Store these values as candidates.

2.  **Analyze the Boundary:**
    *   The boundary $\partial D$ is a closed curve (or set of curves). Parameterize each segment of the boundary. For a segment defined by $y=g(x)$ for $a \le x \le b$, substitute $y=g(x)$ into $f(x,y)$ to obtain a single-variable function $h(x) = f(x, g(x))$. For a segment parameterized by $x(t), y(t)$ for $t \in [a,b]$, form $h(t) = f(x(t), y(t))$.
    *   For each such single-variable function $h(u)$ on a closed interval $[a,b]$ (where $u$ is $x$ or $t$), find its absolute extrema by:
        *   Computing $h'(u)$ and finding critical points where $h'(u)=0$ or $h'(u)$ is undefined.
        *   Evaluating $h(u)$ at these critical points and at the endpoints $u=a$ and $u=b$.
    *   Convert these points back to $(x,y)$ coordinates (if necessary) and evaluate $f(x,y)$ at them. Store these values as candidates.
    *   *Note:* Corner points of the region (where boundary segments meet) will naturally be included as endpoints of the parameterized segments.

3.  **Compare Candidate Values:**
    *   Collect all the function values obtained from Step 1 (interior critical points) and Step 2 (boundary points).
    *   The largest value in this collection is the absolute maximum value of $f$ on $D$.
    *   The smallest value in this collection is the absolute minimum value of $f$ on $D$.

This systematic approach, as outlined in texts like *Calculus* by James Stewart (e.g., Chapter 14.7, "Maximum and Minimum Values"), guarantees that all potential locations for absolute extrema are considered.

## 8. ASCII diagrams

Here are a couple of ASCII diagrams to visualize the concepts of a region, interior points, and boundary points.

### Diagram 1: Square Region with Interior Critical Point

This diagram shows a square region $D$ in the $xy$-plane. The interior is the shaded area, and the boundary is the solid line. A critical point $C_1$ is located in the interior.

```text
       y
       ^
       |
     3 +-------+ (3,3)
       |       |
       |  .C1  |  <-- Critical point (1,2) in the interior
       |       |
       |       |
     0 +-------+------> x
       (0,0)   3
```

*   **Description:** The region $D$ is a square defined by $0 \le x \le 3$ and $0 \le y \le 3$.
*   The interior of $D$ is the set of points $(x,y)$ such that $0 < x < 3$ and $0 < y < 3$. The point $C_1 = (1,2)$ is an example of an interior point where a critical point might occur.
*   The boundary $\partial D$ consists of the four line segments:
    *   $y=0, 0 \le x \le 3$ (bottom edge)
    *   $x=3, 0 \le y \le 3$ (right edge)
    *   $y=3, 0 \le x \le 3$ (top edge)
    *   $x=0, 0 \le y \le 3$ (left edge)
*   The corners $(0,0), (3,0), (3,3), (0,3)$ are part of the boundary.

### Diagram 2: Region Bounded by a Parabola and a Line

This diagram illustrates the region from Example 4, bounded by $y=x^2$ and $y=4$.

```text
       y
       ^
     4 +-----------------+  <-- Line y=4
       |   *           * |
       |    *         *  |
       |     *       *   |
       |      *     *    |
       |       *   *     |
       |        * *      |
     0 +--------*--------+------> x
              (0,0)
     -2       0       2
```

*   **Description:** The region $D$ is enclosed by the parabola $y=x^2$ and the horizontal line $y=4$.
*   The intersection points of the parabola and the line are $(-2,4)$ and $(2,4)$.
*   The boundary $\partial D$ consists of two parts:
    *   The parabolic arc $y=x^2$ for $-2 \le x \le 2$.
    *   The line segment $y=4$ for $-2 \le x \le 2$.
*   The interior of $D$ is the set of points $(x,y)$ such that $x^2 < y < 4$ and $-2 < x < 2$.
*   In Example 4, the critical points $(0,y)$ for $0 < y < 4$ lie along the y-axis, which is within the interior of this region.

## 9. Memory technique — never forget this

To master finding absolute extrema on closed bounded regions, you need a reliable method to recall the steps.

1.  **Specific Mnemonic/Visual Hook:**
    *   **Mnemonic:** "ICE-BOX" or "ICE-B"
        *   **I**nterior: Find critical points *inside* the region.
        *   **C**ritical points: These are where $\nabla f = \mathbf{0}$ or is undefined.
        *   **E**dges: Analyze the *boundary* (edges) of the region.
        *   **B**oundary: Treat each boundary segment as a single-variable problem.
        *   **OX** (or just B): Compare all values from the Interior and Boundary to find the absolute **OX**trema.
    *   **Visual Hook:** Imagine a "cookie cutter" placed on a crumpled piece of paper.
        *   The "crumpled paper" is your function $f(x,y)$.
        *   The "cookie cutter" is your closed and bounded region $D$.
        *   The "ICE-B" strategy means you first poke around *inside* the cookie cutter (Interior critical points). Then, you trace *along the very edge* of the cookie cutter (Boundary analysis). Finally, you compare all the high and low points you found, both inside and on the edge, to pick the absolute highest and lowest.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    1.  **Extreme Value Theorem (Multivariable):** If $f$ is continuous on a closed and bounded set $D$, then absolute max/min exist. (This is the foundation; if it doesn't apply, the problem is different).
    2.  **Interior Critical Points:** $\nabla f(x,y) = \langle \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y} \rangle = \mathbf{0}$ (or undefined).
    3.  **Boundary Reduction:** The boundary analysis always reduces to a single-variable calculus problem on a closed interval.

3.  **Spaced-Repetition Schedule:**
    *   Review the entire procedure:
        *   **1 Day** after initial learning.
        *   **3 Days** after the first review.
        *   **7 Days** after the second review.
        *   **16 Days** after the third review.
        *   **35 Days** after the fourth review.
    *   Practice at least one example each time you review.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the exact steps, always come back to these two fundamental ideas:
    *   **Where do extrema occur?** For a smooth function, local extrema (peaks and valleys) occur where all slopes are zero – this is the meaning of $\nabla f = \mathbf{0}$. These are your interior critical points.
    *   **What about the edges?** If the function keeps increasing or decreasing right up to a boundary, the absolute extremum might be *on* that boundary. Since the boundary is a lower-dimensional object (a curve in 2D), we can analyze the function's behavior along it using single-variable calculus.
    *   **Combining these:** The absolute extrema must be *either* at a "flat spot" inside *or* at the highest/lowest point along the enclosing "fence." This logic directly reconstructs the three-step process: (1) interior critical points, (2) boundary analysis, (3) comparison.

## 10. Connections — what this leads to

Understanding absolute extrema