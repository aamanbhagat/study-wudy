## 1. What it is — in plain English

Imagine you're blowing up a spherical balloon. As you add air, the balloon gets bigger. What's changing? Its volume is increasing, and so is its radius. These two quantities, volume and radius, are *related*. Because they're related, the rate at which the volume changes is also related to the rate at which the radius changes. That's the core idea of "related rates."

In simple terms, related rates problems are about figuring out how fast one thing is changing, given how fast another, related thing is changing. It's like observing a domino effect: if you know how quickly the first domino falls, and you understand how it's connected to the next, you can figure out how quickly the last one will fall.

We're looking at situations where several quantities are linked by some formula (like the volume of a sphere, or the Pythagorean theorem), and all these quantities are changing over time. Our goal is to use the relationships between the quantities to find a relationship between their *rates of change*. This involves using the tools of calculus, specifically differentiation with respect to time.

## 2. Why it matters — real-world applications

The ability to relate rates of change is fundamental across many scientific and engineering disciplines. Understanding how different aspects of a system evolve simultaneously is crucial for design, prediction, and control.

1.  **Aerospace Engineering & Rocketry:** When a rocket launches, its altitude changes, its fuel mass decreases, and its velocity increases. Engineers use related rates to model how the rate of fuel consumption affects the rate of altitude gain or acceleration. For instance, knowing the rate at which fuel is expended (e.g., kg/s) allows them to calculate the rate of change of the rocket's total mass, which then impacts its acceleration via Newton's second law ($F=ma$). This is vital for calculating trajectories and ensuring safe orbital insertion.
2.  **Medical Imaging & Diagnostics:** In medical fields, related rates can describe how the size of a tumor changes over time, or how the concentration of a drug in a patient's bloodstream changes after administration. For example, if a doctor observes the rate at which the diameter of a spherical tumor is growing (e.g., mm/month), related rates can be used to determine the rate at which the tumor's volume is increasing, which might inform treatment decisions.
3.  **Fluid Dynamics & Environmental Science:** Calculating the rate at which water flows into or out of a reservoir, or how quickly an oil spill is spreading, are classic related rates problems. If you know the rate at which water is being pumped into a conical tank, related rates allows you to determine how fast the water level is rising, which is critical for flood control or managing water resources. Similarly, understanding the rate of spread of a pollutant helps in containment strategies.
4.  **Robotics & Computer Vision (e.g., in Self-Driving Cars):** Related rates are implicitly used in algorithms for object tracking and prediction. If a car's camera system detects a pedestrian moving across its path, the system continuously estimates the pedestrian's position and velocity. By relating the change in the pedestrian's perceived size or angular position in the camera's field of view to their actual distance and speed, the car can predict potential collision courses and adjust its own speed or trajectory. This involves relating rates of change of angles and distances.
5.  **Manufacturing & Quality Control:** In manufacturing processes, understanding how the rate of change of one dimension of a product affects its volume or surface area is important for quality control. For example, if a spherical ball bearing is being manufactured, and there's a slight variation in the rate of change of its radius during production, related rates can predict the corresponding rate of change in its volume, allowing for real-time adjustments to maintain product specifications.

## 3. Prerequisites — what you must know first

Before diving deep into related rates, ensure you have a solid grasp of the following concepts. If any of these feel unfamiliar, pause and review them thoroughly.

*   **Functions:** The concept of a function $y = f(x)$, where one quantity depends on another. In related rates, quantities are often functions of time, e.g., $A(t)$, $V(t)$, $x(t)$.
*   **Derivatives:** The definition of a derivative as an instantaneous rate of change. You should understand what $dy/dx$ represents.
*   **Differentiation Rules:**
    *   **Power Rule:** $\frac{d}{dx}(x^n) = nx^{n-1}$.
    *   **Product Rule:** $\frac{d}{dx}(f(x)g(x)) = f'(x)g(x) + f(x)g'(x)$.
    *   **Quotient Rule:** $\frac{d}{dx}\left(\frac{f(x)}{g(x)}\right) = \frac{f'(x)g(x) - f(x)g'(x)}{[g(x)]^2}$.
    *   **Chain Rule:** $\frac{d}{dx}(f(g(x))) = f'(g(x))g'(x)$. This is absolutely critical for related rates, as we will be differentiating with respect to time ($t$) when our quantities are functions of $t$. For example, $\frac{d}{dt}(r^2) = 2r \frac{dr}{dt}$, where $r$ is a function of $t$.
*   **Implicit Differentiation:** The technique of differentiating an equation containing two or more variables (e.g., $x^2 + y^2 = 25$) with respect to a third variable (e.g., $t$), treating $x$ and $y$ as functions of $t$. This is the mathematical engine of related rates.
*   **Geometric Formulas:** A strong recall of common area, volume, and distance formulas:
    *   Area of a circle: $A = \pi r^2$
    *   Volume of a sphere: $V = \frac{4}{3}\pi r^3$
    *   Volume of a cone: $V = \frac{1}{3}\pi r^2 h$
    *   Volume of a cylinder: $V = \pi r^2 h$
    *   Pythagorean Theorem: $a^2 + b^2 = c^2$
    *   Formulas for similar triangles.
*   **Algebra:** Proficiency in manipulating and solving equations.
*   **Problem Solving:** The ability to read a word problem, identify the given information, and determine what needs to be found.

## 4. The core idea — step by step

The process of solving related rates problems is systematic. Each step builds upon the previous one, guiding you from a descriptive problem to a precise mathematical solution.

### Step 1: Identify the changing quantities and their rates.

*   **Plain-English Statement:** Begin by carefully reading the problem to understand what objects are involved, what measurements are changing, and what rates of change are given or asked for. Assign variables to these changing quantities.
*   **Small Concrete Example:** If a problem states, "A balloon is being inflated at a rate of $10 \text{ cm}^3/\text{s}$," you identify "volume" as a changing quantity and its rate of change as $10 \text{ cm}^3/\text{s}$. If it asks, "How fast is its radius increasing?", you identify "radius" as another changing quantity and its rate of change as the unknown you need to find.
*   **Formal/Mathematical Version:** Let $V$ be the volume and $r$ be the radius. Both $V$ and $r$ are functions of time, $t$. The given rate is $\frac{dV}{dt} = 10 \text{ cm}^3/\text{s}$. The unknown rate is $\frac{dr}{dt}$.
*   **What Could Go Wrong:** You might confuse a quantity with its rate (e.g., thinking "radius" is $dr/dt$ instead of $r$). Or, you might overlook a quantity that is changing, assuming it's constant.

### Step 2: Draw a diagram and label it.

*   **Plain-English Statement:** Sketch a clear diagram that represents the situation described in the problem. Label all the relevant quantities. It's crucial to label quantities that are changing with variables (e.g., $x$, $y$, $h$, $r$) and quantities that are constant with their numerical values.
*   **Small Concrete Example:** For a ladder sliding down a wall, draw a right triangle. Label the distance from the wall to the base of the ladder as $x$, the height of the top of the ladder on the wall as $y$, and the length of the ladder as $L$.
*   **Formal/Mathematical Version:**
    ```text
           |
           | y(t)
           |
           *------
          /|     |
         / |     | L (constant)
        /  |     |
       /   |     |
      *----*------
       x(t)
    ```
    Here, $x(t)$ and $y(t)$ are variables because they change over time. $L$ is a constant.
*   **What Could Go Wrong:** Drawing an inaccurate diagram that doesn't correctly represent the geometric relationships. Labeling a quantity with a numerical value *before* differentiation if that quantity is actually changing (this is a common trap we'll discuss later).

### Step 3: Write down an equation relating the quantities.

*   **Plain-English Statement:** Find a mathematical formula or equation that connects the variables you identified in Step 1 and labeled in Step 2. This equation should hold true at any moment in time during the process. Often, this will be a geometric formula (area, volume, Pythagorean theorem, similar triangles) or a physical law.
*   **Small Concrete Example:** For the ladder problem, the relationship between $x$, $y$, and $L$ (the length of the ladder) is given by the Pythagorean theorem: $x^2 + y^2 = L^2$.
*   **Formal/Mathematical Version:** $x(t)^2 + y(t)^2 = L^2$. Notice how we explicitly acknowledge that $x$ and $y$ are functions of $t$.
*   **What Could Go Wrong:** Choosing the wrong formula or an equation that doesn't involve *all* the relevant changing quantities and constants. Sometimes, you might need two equations (e.g., for similar triangles, one to relate $r$ and $h$, and another for volume).

### Step 4: Differentiate the equation with respect to time ($t$).

*   **Plain-English Statement:** This is where calculus comes in. Take the equation you found in Step 3 and differentiate *both sides* with respect to time, $t$. Remember that most of your variables (like $x$, $y$, $r$, $V$) are implicitly functions of $t$, so you'll need to use the Chain Rule.
*   **Small Concrete Example:** Differentiating $x^2 + y^2 = L^2$ with respect to $t$:
    $$ \frac{d}{dt}(x^2) + \frac{d}{dt}(y^2) = \frac{d}{dt}(L^2) $$
    Using the Chain Rule:
    $$ 2x \frac{dx}{dt} + 2y \frac{dy}{dt} = 0 $$
    (Since $L$ is a constant, $L^2$ is also a constant, and its derivative is $0$.)
*   **Formal/Mathematical Version:** If you have an equation $F(x(t), y(t), \dots) = C$, then differentiate implicitly with respect to $t$:
    $$ \frac{\partial F}{\partial x} \frac{dx}{dt} + \frac{\partial F}{\partial y} \frac{dy}{dt} + \dots = 0 $$
    (This is a more advanced multivariable perspective, but the Chain Rule handles it for single-variable functions). The key is $\frac{d}{dt}(f(u(t))) = f'(u(t)) \frac{du}{dt}$.
*   **What Could Go Wrong:** Forgetting the Chain Rule for terms like $x^2$ (differentiating it as $2x$ instead of $2x \frac{dx}{dt}$). Treating a variable as a constant (and its derivative as zero) when it is actually changing. This is the most common and crucial mistake.

### Step 5: Substitute known values and solve for the unknown rate.

*   **Plain-English Statement:** Now that you have an equation relating the rates of change, plug in all the numerical values that are given in the problem *at the specific instant of interest*. Be careful to use the values of the quantities themselves ($x, y, r$) and their rates ($dx/dt, dy/dt, dr/dt$) correctly. Then, solve the resulting algebraic equation for the unknown rate.
*   **Small Concrete Example:** If the ladder is $10 \text{ ft}$ long ($L=10$), its base is $6 \text{ ft}$ from the wall ($x=6$), and it's sliding away at $1 \text{ ft/s}$ ($\frac{dx}{dt}=1$). We need to find $\frac{dy}{dt}$.
    First, find $y$ at this instant: $6^2 + y^2 = 10^2 \implies 36 + y^2 = 100 \implies y^2 = 64 \implies y=8 \text{ ft}$.
    Now substitute into the differentiated equation:
    $$ 2(6)(1) + 2(8)\frac{dy}{dt} = 0 $$
    $$ 12 + 16\frac{dy}{dt} = 0 $$
    $$ 16\frac{dy}{dt} = -12 $$
    $$ \frac{dy}{dt} = -\frac{12}{16} = -\frac{3}{4} \text{ ft/s} $$
*   **Formal/Mathematical Version:** You'll have an equation of the form $A \frac{dx}{dt} + B \frac{dy}{dt} + \dots = C$. Substitute the known values for $A, B, C, \frac{dx}{dt}, \dots$ and solve for the single remaining unknown derivative.
*   **What Could Go Wrong:** Substituting numerical values *before* differentiating. This is a critical error because if a variable is changing, treating it as a constant prematurely will result in its derivative being zero, which is incorrect. Forgetting to find an intermediate value (like $y$ in the example) necessary for substitution.

### Step 6: State the answer with units.

*   **Plain-English Statement:** Clearly write down your final answer, including the correct units. The units for a rate of change will always be "units of quantity per units of time" (e.g., cm/s, ft$^3$/min, rad/s). Also, consider if the sign of your answer makes sense (e.g., a negative rate usually means a decrease).
*   **Small Concrete Example:** The top of the ladder is sliding down the wall at a rate of $0.75 \text{ ft/s}$. The negative sign indicates it's decreasing in height.
*   **Formal/Mathematical Version:** $\frac{dy}{dt} = -0.75 \text{ ft/s}$.
*   **What Could Go Wrong:** Omitting units, using incorrect units, or not interpreting the sign of the rate correctly.

## 5. Worked examples — multiple, with every step shown

Let's walk through several examples, from straightforward to more complex, applying the steps outlined above.

### Example 1: The Sliding Ladder

**Problem:** A ladder $13 \text{ ft}$ long is leaning against a vertical wall. The base of the ladder is pulled away from the wall at a rate of $0.5 \text{ ft/s}$. How fast is the top of the ladder sliding down the wall when the base is $5 \text{ ft}$ from the wall?

**Given:**
*   Length of the ladder, $L = 13 \text{ ft}$ (constant).
*   Rate at which the base is pulled away from the wall, $\frac{dx}{dt} = 0.5 \text{ ft/s}$.
*   Instant of interest: when the base is $x = 5 \text{ ft}$ from the wall.

**Want:**
*   Rate at which the top of the ladder is sliding down the wall, $\frac{dy}{dt}$.

**Solution:**

1.  **Identify changing quantities and rates:**
    *   $x$: distance of the base from the wall (changing).
    *   $y$: height of the top of the ladder on the wall (changing).
    *   $\frac{dx}{dt}$: rate of change of $x$ (given as $0.5 \text{ ft/s}$).
    *   $\frac{dy}{dt}$: rate of change of $y$ (what we want to find).

2.  **Draw a diagram and label it:**
    Let $x$ be the horizontal distance from the wall to the base of the ladder, and $y$ be the vertical distance from the ground to the top of the ladder. The ladder itself forms the hypotenuse of a right triangle.

    ```text
           /|
          / |
         /  | y(t)
        /   |
       /    |
      /     |
     /______|
       x(t)
    ```
    The length of the ladder is $L=13 \text{ ft}$.

3.  **Write down an equation relating the quantities:**
    Since it's a right triangle, we use the Pythagorean theorem:
    $$ x^2 + y^2 = L^2 $$
    *Explanation:* This equation describes the relationship between the sides of the right triangle formed by the ladder, the wall, and the ground, and it holds true at all times.

4.  **Differentiate the equation with respect to time ($t$):**
    We differentiate both sides of the equation $x^2 + y^2 = L^2$ with respect to $t$. Remember that $x$ and $y$ are functions of $t$, so we must use the Chain Rule. $L$ is a constant, so its derivative is $0$.
    $$ \frac{d}{dt}(x^2) + \frac{d}{dt}(y^2) = \frac{d}{dt}(L^2) $$
    $$ 2x \frac{dx}{dt} + 2y \frac{dy}{dt} = 0 $$
    *Explanation:* The Chain Rule states that $\frac{d}{dt}(f(u(t))) = f'(u(t)) \frac{du}{dt}$. So, $\frac{d}{dt}(x^2)$ becomes $2x \cdot \frac{dx}{dt}$, and $\frac{d}{dt}(y^2)$ becomes $2y \cdot \frac{dy}{dt}$. The derivative of a constant ($L^2$) is zero.

5.  **Substitute known values and solve for the unknown rate:**
    We need to find $y$ at the instant when $x=5 \text{ ft}$. Using the Pythagorean theorem:
    $$ (5)^2 + y^2 = (13)^2 $$
    $$ 25 + y^2 = 169 $$
    $$ y^2 = 169 - 25 $$
    $$ y^2 = 144 $$
    $$ y = 12 \text{ ft} $$
    *Explanation:* We must find the value of $y$ at the specific moment ($x=5$) before substituting into the differentiated equation. If we substituted $x=5$ into the original equation before differentiating, we would treat $x$ as a constant, which is incorrect.

    Now, substitute $x=5$, $y=12$, and $\frac{dx}{dt}=0.5$ into the differentiated equation:
    $$ 2(5)(0.5) + 2(12)\frac{dy}{dt} = 0 $$
    $$ 5 + 24\frac{dy}{dt} = 0 $$
    $$ 24\frac{dy}{dt} = -5 $$
    $$ \frac{dy}{dt} = -\frac{5}{24} $$
    *Explanation:* We've plugged in all the known values at the specific instant. The equation now has only one unknown, $\frac{dy}{dt}$, which we can solve for algebraically.

6.  **State the answer with units:**
    $$ \frac{dy}{dt} = -\frac{5}{24} \text{ ft/s} \approx -0.208 \text{ ft/s} $$
    The top of the ladder is sliding down the wall at a rate of $\frac{5}{24} \text{ ft/s}$. The negative sign indicates that the height $y$ is decreasing.

    **Reflection:** This problem was relatively straightforward because the geometric relationship (Pythagorean theorem) was direct, and the values for $x$ and $y$ at the instant of interest were easily found. The main trick was remembering to use the Chain Rule and finding the instantaneous value of $y$.

---

### Example 2: Water Draining from a Conical Tank

**Problem:** A water tank has the shape of an inverted circular cone with a base radius of $2 \text{ m}$ and a height of $4 \text{ m}$. If water is being pumped out of the tank at a rate of $2 \text{ m}^3/\text{min}$, find the rate at which the water level is falling when the water is $3 \text{ m}$ deep.

**Given:**
*   Cone radius, $R = 2 \text{ m}$ (constant).
*   Cone height, $H = 4 \text{ m}$ (constant).
*   Rate of water being pumped out, $\frac{dV}{dt} = -2 \text{ m}^3/\text{min}$ (negative because volume is decreasing).
*   Instant of interest: when water depth $h = 3 \text{ m}$.

**Want:**
*   Rate at which the water level is falling, $\frac{dh}{dt}$.

**Solution:**

1.  **Identify changing quantities and rates:**
    *   $V$: volume of water in the cone (changing).
    *   $h$: height (depth) of the water (changing).
    *   $r$: radius of the water surface (changing).
    *   $\frac{dV}{dt}$: rate of change of volume (given as $-2 \text{ m}^3/\text{min}$).
    *   $\frac{dh}{dt}$: rate of change of height (what we want to find).

2.  **Draw a diagram and label it:**
    Draw an inverted cone. Label the overall cone's radius $R$ and height $H$. Inside, draw the water level, labeling its radius $r$ and height $h$.

    ```text
            /\
           /  \
          /    \
         /      \
        /________\  <-- Base of cone (R=2m)
        \        /
         \      /
          \____/   <-- Water surface (r)
           |    |
           |    | h(t)
           |    |
           |    |
           ------
             r(t)
    ```
    The overall cone has $R=2 \text{ m}$ and $H=4 \text{ m}$. The water level has radius $r$ and height $h$.

3.  **Write down an equation relating the quantities:**
    The volume of a cone is $V = \frac{1}{3}\pi r^2 h$.
    *Explanation:* This formula relates the volume of water to its radius and height. However, we have two changing variables, $r$ and $h$, but we only want to find $\frac{dh}{dt}$. We need to express $r$ in terms of $h$ (or vice versa) using similar triangles.

    From the diagram, the large cone and the cone formed by the water are similar triangles.
    $$ \frac{r}{h} = \frac{R}{H} $$
    $$ \frac{r}{h} = \frac{2}{4} $$
    $$ r = \frac{1}{2}h $$
    *Explanation:* This step is crucial. By using similar triangles, we establish a relationship between $r$ and $h$. This allows us to reduce the number of variables in our volume equation from two ($r$ and $h$) to one ($h$), making differentiation simpler.

    Now substitute $r = \frac{1}{2}h$ into the volume formula:
    $$ V = \frac{1}{3}\pi \left(\frac{1}{2}h\right)^2 h $$
    $$ V = \frac{1}{3}\pi \left(\frac{1}{4}h^2\right) h $$
    $$ V = \frac{1}{12}\pi h^3 $$
    *Explanation:* This simplified volume equation now relates $V$ directly to $h$, which is the variable whose rate of change we are interested in.

4.  **Differentiate the equation with respect to time ($t$):**
    Differentiate $V = \frac{1}{12}\pi h^3$ with respect to $t$.
    $$ \frac{dV}{dt} = \frac{d}{dt}\left(\frac{1}{12}\pi h^3\right) $$
    $$ \frac{dV}{dt} = \frac{1}{12}\pi \left(3h^2 \frac{dh}{dt}\right) $$
    $$ \frac{dV}{dt} = \frac{1}{4}\pi h^2 \frac{dh}{dt} $$
    *Explanation:* Again, the Chain Rule is applied to $h^3$, resulting in $3h^2 \frac{dh}{dt}$. $\frac{1}{12}\pi$ is a constant multiplier.

5.  **Substitute known values and solve for the unknown rate:**
    We are given $\frac{dV}{dt} = -2 \text{ m}^3/\text{min}$ and we are interested in the instant when $h = 3 \text{ m}$.
    $$ -2 = \frac{1}{4}\pi (3)^2 \frac{dh}{dt} $$
    $$ -2 = \frac{1}{4}\pi (9) \frac{dh}{dt} $$
    $$ -2 = \frac{9\pi}{4} \frac{dh}{dt} $$
    Now, solve for $\frac{dh}{dt}$:
    $$ \frac{dh}{dt} = -2 \cdot \frac{4}{9\pi} $$
    $$ \frac{dh}{dt} = -\frac{8}{9\pi} $$
    *Explanation:* All numerical values for the specific instant are substituted. The equation is then solved for the desired unknown rate.

6.  **State the answer with units:**
    $$ \frac{dh}{dt} = -\frac{8}{9\pi} \text{ m/min} \approx -0.283 \text{ m/min} $$
    The water level is falling at a rate of $\frac{8}{9\pi} \text{ m/min}$. The negative sign confirms that the height is decreasing.

    **Reflection:** This problem was trickier due to the need for similar triangles to relate $r$ and $h$. Failing to do this would leave two changing variables ($r$ and $h$) in the volume equation, making direct differentiation for $\frac{dh}{dt}$ impossible without knowing $\frac{dr}{dt}$. The negative sign for $\frac{dV}{dt}$ was also important to correctly indicate water being pumped *out*.

---

### Example 3: The Expanding Shadow

**Problem:** A man $6 \text{ ft}$ tall walks away from a lamppost that is $15 \text{ ft}$ high. If he walks at a speed of $3 \text{ ft/s}$, how fast is the tip of his shadow moving when he is $10 \text{ ft}$ from the lamppost?

**Given:**
*   Height of man, $H_m = 6 \text{ ft}$ (constant).
*   Height of lamppost, $H_L = 15 \text{ ft}$ (constant).
*   Man's speed, $\frac{dx}{dt} = 3 \text{ ft/s}$ (where $x$ is the distance from the lamppost to the man).
*   Instant of interest: when the man is $x = 10 \text{ ft}$ from the lamppost.

**Want:**
*   Rate at which the tip of his shadow is moving, $\frac{dy}{dt}$ (where $y$ is the distance from the lamppost to the tip of the shadow).

**Solution:**

1.  **Identify changing quantities and rates:**
    *   $x$: distance from the lamppost to the man (changing).
    *   $s$: length of the man's shadow (changing).
    *   $y$: distance from the lamppost to the tip of the shadow (changing). Note that $y = x+s$.
    *   $\frac{dx}{dt}$: man's speed (given as $3 \text{ ft/s}$).
    *   $\frac{dy}{dt}$: rate of change of the shadow's tip position (what we want to find).

2.  **Draw a diagram and label it:**
    Draw a vertical lamppost and a shorter vertical man. The light source is at the top of the lamppost. The shadow is formed on the ground. This creates two similar right triangles.

    ```text
    L (lamppost)
    |
    | H_L = 15 ft
    |
    |
    *----------------* S (shadow tip)
    | \            /
    |  \          /
    |   \        /
    |    \      /
    |     \    /
    |      \  /
    |       \/ M (man)
    |       *
    |       | H_m = 6 ft
    |       |
    |_______|_______
    A       x       s
    ```
    Let $x$ be the distance from the lamppost to the man.
    Let $s$ be the length of the man's shadow.
    Let $y$ be the distance from the lamppost to the tip of the shadow. So, $y = x+s$.

3.  **Write down an equation relating the quantities:**
    We have two similar right triangles:
    1.  The large triangle formed by the lamppost, the ground, and the line to the shadow tip.
    2.  The small triangle formed by the man, the ground (his shadow), and the line to the shadow tip.

    By similar triangles:
    $$ \frac{\text{Height of lamppost}}{\text{Distance from lamppost to shadow tip}} = \frac{\text{Height of man}}{\text{Distance from man to shadow tip}} $$
    $$ \frac{H_L}{y} = \frac{H_m}{s} $$
    Substituting the known constant heights:
    $$ \frac{15}{y} = \frac{6}{s} $$
    We also know $y = x+s$. So, $s = y-x$. Substitute this into the similar triangles equation:
    $$ \frac{15}{y} = \frac{6}{y-x} $$
    Now, cross-multiply to get a direct relationship between $x$ and $y$:
    $$ 15(y-x) = 6y $$
    $$ 15y - 15x = 6y $$
    $$ 9y = 15x $$
    $$ y = \frac{15}{9}x $$
    $$ y = \frac{5}{3}x $$
    *Explanation:* Similar triangles are the key here. We set up a proportion to relate the heights and bases of the two triangles. Then, we used the geometric relationship $y=x+s$ to eliminate $s$, resulting in a single equation relating $y$ and $x$. This is important because we know $\frac{dx}{dt}$ and want $\frac{dy}{dt}$.

4.  **Differentiate the equation with respect to time ($t$):**
    Differentiate $y = \frac{5}{3}x$ with respect to $t$:
    $$ \frac{d}{dt}(y) = \frac{d}{dt}\left(\frac{5}{3}x\right) $$
    $$ \frac{dy}{dt} = \frac{5}{3}\frac{dx}{dt} $$
    *Explanation:* Both $y$ and $x$ are functions of $t$. The derivative of $y$ with respect to $t$ is $\frac{dy}{dt}$, and the derivative of $\frac{5}{3}x$ with respect to $t$ is $\frac{5}{3}\frac{dx}{dt}$ (since $\frac{5}{3}$ is a constant multiplier).

5.  **Substitute known values and solve for the unknown rate:**
    We are given $\frac{dx}{dt} = 3 \text{ ft/s}$.
    $$ \frac{dy}{dt} = \frac{5}{3}(3) $$
    $$ \frac{dy}{dt} = 5 $$
    *Explanation:* We substitute the given rate $\frac{dx}{dt}$ directly into the differentiated equation. Notice that the specific distance $x=10 \text{ ft}$ was not needed in this final calculation, because the relationship between $\frac{dy}{dt}$ and $\frac{dx}{dt}$ turned out to be constant.

6.  **State the answer with units:**
    $$ \frac{dy}{dt} = 5 \text{ ft/s} $$
    The tip of the man's shadow is moving at a rate of $5 \text{ ft/s}$.

    **Reflection:** This problem highlights the power of simplifying the relationship between variables *before* differentiation. By expressing $y$ directly in terms of $x$, the differentiation became trivial. The specific distance $x=10 \text{ ft}$ was a distractor in this particular problem, which can be tricky if one feels compelled to use all given numbers.

---

### Example 4: Airplane and Radar Station

**Problem:** An airplane flies horizontally at an altitude of $1 \text{ mile}$ and at a speed of $500 \text{ mi/hr}$. A radar station is located directly below the flight path. Find the rate at which the distance from the plane to the station is increasing when the plane is $2 \text{ miles}$ away from the station.

**Given:**
*   Altitude of the plane, $H = 1 \text{ mile}$ (constant).
*   Speed of the plane, $\frac{dx}{dt} = 500 \text{ mi/hr}$ (where $x$ is the horizontal distance from the point directly above the radar station to the plane).
*   Instant of interest: when the distance from the plane to the station, $s = 2 \text{ miles}$.

**Want:**
*   Rate at which the distance from the plane to the station is increasing, $\frac{ds}{dt}$.

**Solution:**

1.  **Identify changing quantities and rates:**
    *   $x$: horizontal distance of the plane from the point directly above the radar station (changing).
    *   $s$: direct distance from the plane to the radar station (changing).
    *   $H$: altitude of the plane (constant, $1 \text{ mile}$).
    *   $\frac{dx}{dt}$: plane's horizontal speed (given as $500 \text{ mi/hr}$).
    *   $\frac{ds}{dt}$: rate of change of the direct distance (what we want to find).

2.  **Draw a diagram and label it:**
    Imagine a right triangle where the altitude is one leg, the horizontal distance is the other leg, and the direct distance to the plane is the hypotenuse.

    ```text
           Plane *
                 | \
                 |  \
           H = 1 |   \ s(t)
                 |    \
                 |     \
                 *------* Radar Station
                 x(t)
    ```
    The height $H=1 \text{ mile}$ is constant. $x(t)$ is the horizontal distance, and $s(t)$ is the direct distance.

3.  **Write down an equation relating the quantities:**
    Using the Pythagorean theorem:
    $$ x^2 + H^2 = s^2 $$
    Substituting the constant altitude $H=1$:
    $$ x^2 + 1^2 = s^2 $$
    $$ x^2 + 1 = s^2 $$
    *Explanation:* This equation relates the three distances involved in the right triangle. Since $H$ is constant, we substitute its value directly.

4.  **Differentiate the equation with respect to time ($t$):**
    Differentiate $x^2 + 1 = s^2$ with respect to $t$:
    $$ \frac{d}{dt}(x^2) + \frac{d}{dt}(1) = \frac{d}{dt}(s^2) $$
    $$ 2x \frac{dx}{dt} + 0 = 2s \frac{ds}{dt} $$
    $$ 2x \frac{dx}{dt} = 2s \frac{ds}{dt} $$
    We can simplify by dividing by 2:
    $$ x \frac{dx}{dt} = s \frac{ds}{dt} $$
    *Explanation:* Apply the Chain Rule for $x^2$ and $s^2$. The derivative of the constant $1$ is $0$.

5.  **Substitute known values and solve for the unknown rate:**
    We are given $H=1$, $\frac{dx}{dt} = 500 \text{ mi/hr}$, and we are interested in the instant when $s = 2 \text{ miles}$.
    First, we need to find $x$ at this instant using the Pythagorean theorem:
    $$ x^2 + 1^2 = s^2 $$
    $$ x^2 + 1 = 2^2 $$
    $$ x^2 + 1 = 4 $$
    $$ x^2 = 3 $$
    $$ x = \sqrt{3} \text{ miles} $$
    *Explanation:* Just like in the ladder problem, we need to find the value of $x$ at the specific instant before substituting it into the differentiated equation.

    Now, substitute $x=\sqrt{3}$, $s=2$, and $\frac{dx}{dt}=500$ into the differentiated equation:
    $$ (\sqrt{3})(500) = (2)\frac{ds}{dt} $$
    $$ 500\sqrt{3} = 2\frac{ds}{dt} $$
    $$ \frac{ds}{dt} = \frac{500\sqrt{3}}{2} $$
    $$ \frac{ds}{dt} = 250\sqrt{3} $$
    *Explanation:* All known values at the specific instant are substituted, and the equation is solved for $\frac{ds}{dt}$.

6.  **State the answer with units:**
    $$ \frac{ds}{dt} = 250\sqrt{3} \text{ mi/hr} \approx 433.01 \text{ mi/hr} $$
    The distance from the plane to the radar station is increasing at a rate of $250\sqrt{3} \text{ mi/hr}$.

    **Reflection:** This problem is similar in structure to the ladder problem, reinforcing the use of the Pythagorean theorem and the need to find an instantaneous value ($x$) before final substitution. It also shows that the rate of change of the hypotenuse is not simply the sum of the rates of the legs, but rather a more complex relationship derived through differentiation.

## 6. Common mistakes and traps

Students often stumble on related rates problems due to a few recurring errors. Being aware of these pitfalls can help you avoid them.

1.  **Substituting numerical values too early:** This is the *most common* mistake. If a quantity is changing, you *must* represent it with a variable and differentiate *before* plugging in its specific value at a given instant. If you substitute a number for a changing variable before differentiating, its derivative will incorrectly become zero.
    *   *Example:* In the ladder problem, if you substitute $x=5$ into $x^2+y^2=L^2$ *before* differentiating, you'd get $25+y^2=L^2$, which implies $y$ is constant (so $\frac{dy}{dt}=0$), which is wrong.

2.  **Forgetting the Chain Rule:** When differentiating terms like $x^2$, $r^3$, or $\sin(\theta)$ with respect to time $t$, you must remember that $x$, $r$, and $\theta$ are functions of $t$. So, $\frac{d}{dt}(x^2) = 2x \frac{dx}{dt}$, not just $2x$. Similarly, $\frac{d}{dt}(r^3) = 3r^2 \frac{dr}{dt}$ and $\frac{d}{dt}(\sin(\theta)) = \cos(\theta) \frac{d\theta}{dt}$.

3.  **Incorrect geometric formulas or relationships:** Using the wrong formula for area, volume, or misapplying similar triangles can lead to a completely incorrect starting equation. Always double-check your geometric setup.

4.  **Units inconsistency:** Mixing units (e.g., cm and m, or seconds and minutes) without conversion will lead to incorrect numerical answers. Ensure all quantities and rates are expressed in consistent units throughout the problem.

5.  **Misinterpreting the question or the sign of the rate:**
    *   Ensure you are solving for the *specific* rate asked for.
    *   Rates of decrease should be represented by negative values (e.g., water draining out, distance decreasing). If your calculation yields a negative rate for something that should be increasing, or vice-versa, recheck your setup.

6.  **Algebraic errors:** After differentiation, the problem often reduces to a simple algebraic equation. Careless arithmetic or algebraic manipulation can lead to incorrect final answers.

## 7. Textbook-precise explanation

Related rates problems are a direct application of the Chain Rule in the context of implicit differentiation. The fundamental principle is that if several quantities are related by an equation, and these quantities are all functions of a common independent variable (typically time, $t$), then their rates of change are also related.

Let $Q_1, Q_2, \dots, Q_n$ be quantities that are functions of time $t$, i.e., $Q_i = Q_i(t)$. Suppose these quantities are related by an equation $F(Q_1, Q_2, \dots, Q_n) = C$, where $C$ is a constant, or more generally, $F(Q_1, Q_2, \dots, Q_n) = G(Q_k)$ for some $k$.

To find the relationship between their rates of change, we differentiate the entire equation with respect to $t$. By the Chain Rule, for any differentiable function $f(u(t))$, its derivative with respect to $t$ is $\frac{d}{dt}[f(u(t))] = f'(u(t)) \frac{du}{dt}$. Applying this principle to each term in the relating equation, we obtain an equation involving the rates of change $\frac{dQ_1}{dt}, \frac{dQ_2}{dt}, \dots, \frac{dQ_n}{dt}$.

For example, if two quantities $x$ and $y$ are related by the equation $x^2 + y^2 = 25$, and both $x$ and $y$ are functions of time $t$, then differentiating implicitly with respect to $t$ yields:
$$ \frac{d}{dt}(x^2) + \frac{d}{dt}(y^2) = \frac{d}{dt}(25) $$
Applying the Chain Rule:
$$ 2x \frac{dx}{dt} + 2y \frac{dy}{dt} = 0 $$
This equation now directly relates the rates of change $\frac{dx}{dt}$ and $\frac{dy}{dt}$. Given the values of $x, y,$ and one of the rates at a specific instant, the other rate can be determined.

The general procedure involves:
1.  Identifying all variables and rates of change.
2.  Establishing a geometric or physical relationship between the variables.
3.  Differentiating this relationship implicitly with respect to time $t$, utilizing the Chain Rule for any variable that is a function of $t$.
4.  Substituting known values of variables and rates at the specific instant of interest.
5.  Solving the resulting algebraic equation for the unknown rate.

This methodology is standard in single-variable calculus textbooks. For instance, see Chapter 3, Section 9 ("Related Rates") in *Calculus: Early Transcendentals* by James Stewart (9th Edition), or Chapter 4, Section 1 ("Related Rates") in *Thomas' Calculus* (14th Edition).

## 8. ASCII diagrams

Here are a couple of ASCII diagrams to help visualize common related rates scenarios.

### Diagram 1: Ladder Sliding Down a Wall

This diagram illustrates the classic ladder problem, forming a right triangle with the ground and the wall.

```text
       Wall
         |
         |
         | y(t)  <-- Height of the top of the ladder on the wall
         |
         |
         *----------- Ladder (length L, constant)
        /|
       / |
      /  |
     /   |
    /____|
   Ground
     x(t)  <-- Distance of the base of the ladder from the wall
```
*   `L`: Length of the ladder (constant).
*   `x(t)`: Horizontal distance of the ladder's base from the wall, changing with time.
*   `y(t)`: Vertical height of the ladder's top on the wall, changing with time.
*   The relationship is $x(t)^2 + y(t)^2 = L^2$.

### Diagram 2: Conical Tank Filling/Draining Water

This diagram shows an inverted cone, with water inside forming a smaller, similar cone.

```text
            /\
           /  \
          /    \
         /      \
        /________\  <-- Top of the conical tank (Radius R, Height H)
        \        /
         \      /
          \____/   <-- Water surface (radius r(t))
           |    |
           |    | h(t)  <-- Water depth (height)
           |    |
           |    |
           ------
             r(t)
```
*   `R`: Radius of the entire cone (constant).
*   `H`: Height of the entire cone (constant).
*   `r(t)`: Radius of the water surface, changing with time.
*   `h(t)`: Height (depth) of the water, changing with time.
*   The volume of water is $V(t) = \frac{1}{3}\pi r(t)^2 h(t)$.
*   Due to similar triangles, $\frac{r(t)}{h(t)} = \frac{R}{H}$ (constant ratio), allowing $r$ to be expressed in terms of $h$ (or vice-versa).

## 9. Memory technique — never forget this

To master related rates and ensure you never forget the systematic approach, use this mnemonic and focus on these core elements.

1.  **Specific Mnemonic / Visual Hook:**
    The steps can be remembered with the acronym **DRAW-EQUATE-DIFFERENTIATE-SUBSTITUTE-SOLVE (DEDSS)**.
    *   **D**raw: Always start with a clear, labeled diagram. Visualize the problem.
    *   **E**quate: Find the fundamental equation relating the quantities.
    *   **D**ifferentiate: Implicitly differentiate the equation with respect to time ($t$), applying the Chain Rule rigorously.
    *   **S**ubstitute: Plug in the known numerical values *at the specific instant of interest* (after differentiation!).
    *   **S**olve: Algebraically solve for the unknown rate.

    Visually, imagine a "DEDSS" stamp that you apply to every related rates problem. The "DEDSS" process ensures you don't skip crucial steps or make common errors.

2.  **The 1-3 Formulas/Facts They MUST Overlearn:**
    *   **The Chain Rule:** This is the mathematical engine. For any quantity $Q$ that is a function of time $t$, $\frac{d}{dt}(Q^n) = nQ^{n-1} \frac{dQ}{dt}$. More generally, $\frac{d}{dt}(f(Q(t))) = f'(Q(t)) \frac{dQ}{dt}$. If you forget this, you cannot do related rates.
    *   **Implicit Differentiation:** The technique of differentiating every term in an equation with respect to $t$, treating all variables as functions of $t$.
    *   **Pythagorean Theorem & Similar Triangles:** These are the most common geometric relationships. Be able to recall them instantly and apply them to set up your initial equation.

3.  **Spaced-Repetition Schedule:**
    To embed this process deeply into your long-term memory, practice related rates problems according to this schedule:
    *   **Day 1:** Complete this lesson and work through the examples. Try the self-check questions.
    *   **Day 3:** Review the DEDSS steps and re-solve one or two examples from memory.
    *   **Day 7:** Attempt a new set of 2-3 related rates problems (e.g., from your textbook).
    *   **Day 16:** Review the core idea and solve a challenging related rates problem.
    *   **Day 35:** Briefly review the DEDSS steps and the common pitfalls. Solve one complex problem to ensure retention.

4.  **First-Principles Re-derivation Pathway:**
    If you ever completely forget the DEDSS steps or feel lost, remember this fundamental idea:
    *   **Everything changes over time.** If a quantity $X$ is changing, it's a function of time, $X(t)$. Its rate of change is $\frac{dX}{dt}$.
    *   **Quantities are related by some equation.** Find this equation from the problem description (geometry, physics, etc.). Let's say it's $F(X, Y) = C$.
    *   **How do the rates relate?** To find how the rates relate, you need to see how the *change* in $X$ affects the *change* in $Y$ *over time*. This is precisely what differentiation with respect to time does.
    *   Therefore, the logical step is to differentiate the relating equation $F(X(t), Y(t)) = C$ with respect to $t$. This will naturally lead you to apply the Chain Rule to terms involving $X$ and $Y$, giving you an equation connecting $\frac{dX}{dt}$ and $\frac{dY}{dt}$.
    *   Once you have this equation of rates, you just substitute the specific values given for the *instant of interest* and solve.
    This pathway helps you reconstruct the entire method from the logical necessity of how changing quantities relate.

## 10. Connections — what this leads to

Related rates problems are a foundational application of differential calculus and serve as a bridge to several more advanced topics in mathematics, physics, and engineering.

1.  **Optimization Problems:** Related rates deal with how quantities change, while optimization problems deal with finding the maximum or minimum values of quantities. Both rely heavily on setting up equations and differentiating them. Often, an optimization problem involves finding the rate of change of a quantity (which is zero at a max/min) or how to adjust rates to achieve an optimal state.
2.  **Differential Equations:** At its heart, a related rates problem is solving a simple differential equation. The equation relating the rates of change (e.g., $2x \frac{dx}{dt} + 2y \frac{dy}{dt} = 0$) is a type of differential equation. This understanding is crucial for studying more complex differential equations that model population growth, radioactive decay, circuit behavior, and much more.
3.  **Kinematics and Dynamics (Physics):** Related rates are directly applicable to problems in classical mechanics. Calculating velocities, accelerations, and forces often involves relating rates of change of position, momentum, and energy. For example, the rate of change of kinetic energy with respect to time is related to power.
4.  **Multivariable Calculus:** The concept extends naturally to functions of multiple variables. In multivariable calculus, you'll encounter partial derivatives and the multivariable Chain Rule, which allows you to relate rates of change when quantities depend on multiple independent variables (e.g., temperature changing with position and time).
5.  **Numerical Methods for Differential Equations:** Many real-world differential equations cannot be solved analytically. Related rates provides intuition for how numerical methods (like Euler's method or Runge-Kutta methods) approximate solutions by stepping through small changes in time.
6.  **Control Systems Engineering:** In control systems, engineers design systems to maintain desired states or trajectories. This often involves sensing rates of change (e.g., speed, temperature change) and using those rates to adjust control inputs (e.g., throttle, heating element power) to achieve a target rate or value. Related rates helps model the dynamic behavior of such systems.

## 11. Self-check questions

Here are five questions of escalating difficulty to test your understanding of related rates. Do not look for answers; strive to solve them entirely on your own.

1.  **Easy:** The radius of a circle is increasing at a rate of $2 \text{ cm/s}$. How fast is the area of the circle increasing when the radius is $10 \text{ cm}$?

2.  **Medium:** A spherical snowball is melting in such a way that its surface area is decreasing at a rate of $1 \text{ cm}^2/\text{min}$. How fast is the radius decreasing when the diameter is $10 \text{ cm}$? (Hint: Surface area of a sphere $A = 4\pi r^2$, Volume of a sphere $V = \frac{4}{3}\pi r^3$).

3.  **Medium-Hard:** A water trough is $10 \text{ m}$ long and has a cross-section in the shape of an isosceles trapezoid. The bottom width is $0.5 \text{ m}$, the top width is $1.5 \text{ m}$, and the height is $1 \text{ m}$. If water is being pumped into the trough at a rate of $0.2 \text{ m}^3/\text{min}$, how fast is the water level rising when the water is $0.75 \text{ m}$ deep? (Hint: The area of a trapezoid is $A = \frac{1}{2}(b_1 + b_2)h$).

4.  **Hard:** A street light is mounted at the top of a $15 \text{ ft}$ pole. A man $6 \text{ ft}$ tall walks away from the pole at a speed of $5 \text{ ft/s}$ along a straight path. How fast is the *length* of his shadow increasing when he is $20 \text{ ft}$ from the pole?

5.  **Challenging:** Two cars approach an intersection. One car is traveling east at $40 \text{ mi/hr}$ and is currently $3 \text{ miles}$ west of the intersection. The other car is traveling north at $30 \text{ mi/hr}$ and is currently $4 \text{ miles}$ south of the intersection. At what rate is the distance between the cars changing at this instant?