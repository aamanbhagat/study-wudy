## 1. What it is — in plain English

Imagine you're pushing a heavy box across a floor. If you push with a steady, unchanging amount of effort (force) for a certain distance, the "work" you do is simply that steady effort multiplied by the distance you pushed. Easy, right?

But what if your effort isn't steady? What if you're pushing a spring? The more you compress it, the harder it pushes back, and the more effort *you* have to exert to compress it further. Or imagine pushing a car up a hill that gets steeper and steeper – the force you need to apply keeps increasing. In these situations, your pushing force isn't constant; it's *variable*.

When the force changes as you move, you can't just multiply a single force value by the total distance. Instead, you have to think about doing tiny, tiny bits of work over tiny, tiny distances. For each tiny step, the force is *almost* constant. Then, you add up all those tiny bits of work to find the total work done.

This "adding up tiny bits" is exactly what integration does in calculus. So, "work done by variable force — integration" simply means using calculus to sum up all the infinitesimal amounts of work done when the force you're applying isn't constant but changes along the path of motion.

## 2. Why it matters — real-world applications

Understanding work done by a variable force is crucial across many fields, from engineering to fundamental physics:

1.  **Rocket Science & Aerospace Engineering:** When a rocket engine fires, its thrust (force) can vary significantly with altitude, atmospheric pressure, and fuel consumption. To calculate the total work done by the engine to lift the rocket to a certain height or achieve a specific velocity, engineers must integrate the variable thrust force over the distance traveled. This is vital for trajectory planning, fuel efficiency, and payload capacity calculations for companies like SpaceX or NASA.

2.  **Springs and Elastic Systems:** Designing suspension systems for cars, aircraft landing gear, or even simple door hinges relies on understanding how springs and other elastic materials store and release energy. The force exerted by a spring changes linearly with its displacement (Hooke's Law, $F=kx$). Calculating the work done to compress or stretch a spring a certain amount requires integrating this variable force. This applies to companies like Boeing (landing gear) or manufacturers of automotive shock absorbers.

3.  **Gravitational Work for Satellites:** When launching a satellite into orbit or sending a probe to another planet, the gravitational force acting on the object changes significantly with distance from the central body. Earth's gravity weakens as you move further away ($F \propto 1/r^2$). To calculate the work done against gravity to lift a satellite from Earth's surface to geosynchronous orbit, or the work done *by* gravity as a probe falls towards Mars, one must integrate this variable gravitational force over the vast distances involved.

4.  **Fluid Dynamics and Pumping:** Consider pumping water out of a tank. As the water level drops, the amount of water remaining to be lifted decreases, and thus the force required to lift the *next* layer of water changes. Calculating the total work done to empty a tank, especially one with a complex shape (like a conical or spherical tank), involves integrating the force required to lift each infinitesimal layer of fluid against gravity. This is relevant in civil engineering, industrial processes, and even in designing fuel tanks for aircraft.

5.  **Material Science and Engineering:** When stretching or compressing materials beyond their elastic limit, the force-displacement relationship can become highly non-linear. Engineers studying stress-strain curves for new alloys or composite materials need to calculate the work done to deform these materials to understand their energy absorption capabilities or failure points. This often involves integrating complex, empirically derived force functions.

## 3. Prerequisites — what you must know first

Before diving deep into work done by variable forces, ensure you have a solid grasp of these foundational concepts:

*   **Scalar vs. Vector Quantities:** Understanding the difference between quantities that only have magnitude (scalar, like work, energy, mass) and those that have both magnitude and direction (vector, like force, displacement, velocity).
*   **Force:** The basic definition of force as a push or a pull, its units (Newtons, N), and Newton's laws of motion (especially $F=ma$).
*   **Displacement:** The change in position of an object, represented as a vector from the initial to the final point, and its units (meters, m).
*   **Work Done by Constant Force:** The definition $W = F \cdot d \cdot \cos(\theta)$, where $F$ is constant, $d$ is displacement, and $\theta$ is the angle between force and displacement. For force and displacement in the same direction, $W = Fd$.
*   **Basic Integration (Definite Integrals):** How to find the antiderivative of a function, apply the Fundamental Theorem of Calculus, and evaluate definite integrals with upper and lower limits. You should be comfortable with the power rule of integration ($\int x^n dx = \frac{x^{n+1}}{n+1} + C$).
*   **Dot Product:** How to calculate the dot product of two vectors, $\vec{A} \cdot \vec{B} = |\vec{A}||\vec{B}|\cos(\theta)$, and its significance in projecting one vector onto another. While often simplified to $F(x)dx$ in 1D problems, understanding the vector nature is key for generalization.

## 4. The core idea — step by step

Let's build up the concept of work done by a variable force using integration, step by step.

### Step 1: Review Work Done by a Constant Force

*   **Plain-English Statement:** If you apply a steady, unchanging push or pull (a constant force) on an object, and that object moves a certain distance in the direction of your push, the total effort (work) you've put in is simply the strength of your push multiplied by the distance it moved.
*   **Small Concrete Example:** You push a shopping cart with a constant force of $20 \text{ N}$ for a distance of $5 \text{ m}$. The work you do is $20 \text{ N} \times 5 \text{ m} = 100 \text{ Joules}$.
*   **Formal/Mathematical Version:** When a constant force $\vec{F}$ acts on an object, causing a displacement $\vec{d}$, the work $W$ done by the force is given by the dot product:
    $$W = \vec{F} \cdot \vec{d} = |\vec{F}||\vec{d}|\cos(\theta)$$
    If the force and displacement are in the same direction ($\theta = 0^\circ$), this simplifies to:
    $$W = Fd$$
*   **What Could Go Wrong:** Assuming the force is always constant. In many real-world scenarios, forces change.

### Step 2: The Problem with a Variable Force

*   **Plain-English Statement:** What if your push isn't steady? What if it gets stronger or weaker as the object moves? You can't just pick one force value and multiply it by the total distance, because the force was different at different points along the path.
*   **Small Concrete Example:** You're stretching a rubber band. The further you stretch it, the harder it pulls back, and the more force *you* need to apply to stretch it further. If you stretch it by $10 \text{ cm}$, the force at $1 \text{ cm}$ is much less than the force at $9 \text{ cm}$. Which force do you use for $W=Fd$? You can't use just one.
*   **Formal/Mathematical Version:** If the force $\vec{F}$ acting on an object is not constant but varies with its position $\vec{r}$, we denote it as $\vec{F}(\vec{r})$. In one dimension, if the force varies with position $x$, we write it as $F(x)$. In this case, the simple formula $W=Fd$ is inadequate because $F$ is not a single value.
*   **What Could Go Wrong:** Attempting to use an "average" force without knowing if the force function is linear. Even if it is linear, this is a shortcut that obscures the fundamental method.

### Step 3: Introduce Infinitesimal Work

*   **Plain-English Statement:** Since the force changes, let's break the total path of motion into extremely tiny, microscopic segments. Over each *tiny* segment, the force barely changes at all – it's practically constant for that minuscule distance. So, for each tiny step, we can calculate a tiny amount of work.
*   **Small Concrete Example:** Imagine stretching that rubber band from $0 \text{ cm}$ to $10 \text{ cm}$. Instead of thinking about the whole $10 \text{ cm}$, think about stretching it from $5.000 \text{ cm}$ to $5.001 \text{ cm}$. Over that $0.001 \text{ cm}$ distance, the force you apply is essentially constant. We can calculate the work done for *just that tiny bit*.
*   **Formal/Mathematical Version:** Consider an object moving along the x-axis from position $x$ to $x+dx$, where $dx$ is an infinitesimally small displacement. Over this tiny displacement $dx$, the variable force $F(x)$ can be considered approximately constant. The infinitesimal amount of work, $dW$, done by this force over this tiny displacement is:
    $$dW = F(x) dx$$
    This is essentially applying $W=Fd$ to an infinitesimally small displacement.
*   **What Could Go Wrong:** Confusing the infinitesimal work $dW$ with the total work $W$. Remember, $dW$ is just a tiny piece of the total.

### Step 4: Summing Infinitesimal Work (Integration)

*   **Plain-English Statement:** We've calculated all these tiny bits of work ($dW$) for all the tiny steps ($dx$) along the object's path. Now, to find the *total* work done over the entire distance, we just need to add up all these tiny bits. In calculus, the process of summing an infinite number of infinitesimal quantities is called integration.
*   **Small Concrete Example:** If you have a graph of force ($F$) on the y-axis versus position ($x$) on the x-axis, the work done for a constant force is just the area of a rectangle ($F \times d$). For a variable force, the graph is a curve. Each tiny $F(x)dx$ represents the area of a very thin rectangle under that curve. Integrating means finding the total area under the force-displacement curve between the starting and ending positions.
*   **Formal/Mathematical Version:** To find the total work $W$ done by the variable force $F(x)$ as the object moves from an initial position $x_1$ to a final position $x_2$, we sum up all the infinitesimal works $dW$ by integrating:
    $$W = \int_{x_1}^{x_2} dW = \int_{x_1}^{x_2} F(x) dx$$
    The limits of integration, $x_1$ and $x_2$, define the start and end points of the motion over which the work is being calculated.
*   **What Could Go Wrong:** Incorrectly setting the limits of integration ($x_1$ and $x_2$). These must correspond to the initial and final *positions*, not displacements.

### Step 5: Force as a Vector (General Case)

*   **Plain-English Statement:** So far, we've mostly considered situations where the force and the movement are along the same straight line. But what if the force is pushing at an angle, or the object is moving in a curved path? We still use the same idea of tiny steps, but now we need to consider the direction of both the force and the tiny movement.
*   **Small Concrete Example:** Imagine pulling a sled with a rope. The rope pulls upwards at an angle, but the sled moves horizontally. Only the horizontal component of your pulling force actually does work to move the sled forward. If the path curves, like a roller coaster, the force of the track on the car changes direction constantly.
*   **Formal/Mathematical Version:** In the most general case, where both the force $\vec{F}$ and the displacement $d\vec{r}$ are vectors and the path might be curved, the infinitesimal work $dW$ is given by the dot product of the force vector and the infinitesimal displacement vector:
    $$dW = \vec{F}(\vec{r}) \cdot d\vec{r}$$
    The total work done as the object moves along a path $C$ from point A to point B is a line integral:
    $$W = \int_C \vec{F}(\vec{r}) \cdot d\vec{r}$$
    For the purposes of this lesson, we will primarily focus on one-dimensional motion where $\vec{F}(x)$ is along the x-axis and $d\vec{r}$ is $dx\hat{i}$, which simplifies to $F(x)dx$. However, it's crucial to understand that the dot product is implicitly handled even in the 1D case if force and displacement are in the same direction. If they are opposite, $F(x)$ would often be negative, or the limits of integration would reflect the direction.
*   **What Could Go Wrong:** Forgetting the vector nature when moving to 2D or 3D problems, or incorrectly calculating the dot product. For 1D problems, ensure the sign of $F(x)$ correctly reflects its direction relative to increasing $x$.

## 5. Worked examples — multiple, with every step shown

### Example 1: Stretching a Spring from Equilibrium

**Problem:** A spring has a spring constant $k = 200 \text{ N/m}$. Calculate the work done to stretch the spring from its equilibrium position ($x=0$) to a displacement of $0.15 \text{ m}$.

**Given:**
*   Spring constant $k = 200 \text{ N/m}$
*   Initial position $x_1 = 0 \text{ m}$ (equilibrium)
*   Final position $x_2 = 0.15 \text{ m}$

**We want:** Total work done $W$.

**Solution:**

1.  **Identify the force function:** For a spring, the restoring force exerted *by* the spring is $F_{spring} = -kx$. However, the work done *by an external agent* (us, stretching the spring) is *against* this restoring force, so the applied force is $F_{applied}(x) = kx$.
    $$F(x) = kx$$
    *This is Hooke's Law, describing how the force required to stretch a spring increases linearly with displacement.*

2.  **Substitute the given spring constant:**
    $$F(x) = 200x$$
    *We replace $k$ with its numerical value to get the specific force function for this problem.*

3.  **Set up the integral for work:** The work done by a variable force is given by the integral of the force function with respect to displacement, from the initial to the final position.
    $$W = \int_{x_1}^{x_2} F(x) dx$$
    *This is the fundamental formula for work done by a variable force.*

4.  **Substitute the force function and limits of integration:**
    $$W = \int_{0}^{0.15} (200x) dx$$
    *We've plugged in $F(x) = 200x$, and our starting position $x_1 = 0$ and ending position $x_2 = 0.15$ for the integral limits.*

5.  **Perform the integration:** Use the power rule for integration, $\int x^n dx = \frac{x^{n+1}}{n+1}$.
    $$W = 200 \int_{0}^{0.15} x^1 dx$$
    $$W = 200 \left[ \frac{x^{1+1}}{1+1} \right]_{0}^{0.15}$$
    $$W = 200 \left[ \frac{x^2}{2} \right]_{0}^{0.15}$$
    *We integrate $x$ with respect to $x$, which gives $x^2/2$. The constant $200$ stays outside the integral.*

6.  **Evaluate the definite integral using the limits:** Substitute the upper limit, then subtract the result of substituting the lower limit.
    $$W = 200 \left( \frac{(0.15)^2}{2} - \frac{(0)^2}{2} \right)$$
    $$W = 200 \left( \frac{0.0225}{2} - 0 \right)$$
    $$W = 200 \left( 0.01125 \right)$$
    $$W = 2.25$$
    *We're applying the Fundamental Theorem of Calculus: $F(b) - F(a)$.*

7.  **State the final answer with units:**
    $$ \boxed{W = 2.25 \text{ J}} $$
    *Work is measured in Joules (J).*

**Reflection:** This was a straightforward application of Hooke's Law and basic integration. The "trick" here is remembering that the applied force is $kx$, not $-kx$, when calculating work done *by* an external agent.

---

### Example 2: Compressing a Spring from an Already Stretched Position

**Problem:** A spring with a spring constant $k = 500 \text{ N/m}$ is initially stretched by $0.05 \text{ m}$ from its equilibrium position. Calculate the work done *by an external agent* to further stretch it to $0.10 \text{ m}$ from equilibrium.

**Given:**
*   Spring constant $k = 500 \text{ N/m}$
*   Initial position $x_1 = 0.05 \text{ m}$
*   Final position $x_2 = 0.10 \text{ m}$

**We want:** Total work done $W$.

**Solution:**

1.  **Identify the force function:** As in Example 1, the applied force to stretch or compress a spring is $F(x) = kx$.
    $$F(x) = kx$$
    *The force function remains the same, as it describes the relationship between displacement and applied force for the spring.*

2.  **Substitute the given spring constant:**
    $$F(x) = 500x$$
    *Plug in the specific value of $k$ for this problem.*

3.  **Set up the integral for work:**
    $$W = \int_{x_1}^{x_2} F(x) dx$$
    *The general formula for work done by a variable force is used.*

4.  **Substitute the force function and new limits of integration:**
    $$W = \int_{0.05}^{0.10} (500x) dx$$
    *Crucially, the limits are now $x_1 = 0.05 \text{ m}$ and $x_2 = 0.10 \text{ m}$, reflecting the specific range of motion for which we want to calculate work.*

5.  **Perform the integration:**
    $$W = 500 \int_{0.05}^{0.10} x dx$$
    $$W = 500 \left[ \frac{x^2}{2} \right]_{0.05}^{0.10}$$
    *Integration proceeds identically to Example 1, as the integrand is the same.*

6.  **Evaluate the definite integral using the limits:**
    $$W = 500 \left( \frac{(0.10)^2}{2} - \frac{(0.05)^2}{2} \right)$$
    $$W = 500 \left( \frac{0.01}{2} - \frac{0.0025}{2} \right)$$
    $$W = 500 \left( 0.005 - 0.00125 \right)$$
    $$W = 500 \left( 0.00375 \right)$$
    $$W = 1.875$$
    *Careful calculation of the values at the upper and lower limits is essential.*

7.  **State the final answer with units:**
    $$ \boxed{W = 1.875 \text{ J}} $$
    *Units are Joules.*

**Reflection:** This example highlights the importance of correctly identifying the limits of integration. Even though the force function is the same, the starting and ending points of the motion drastically change the total work done. It's not just about the total displacement ($0.05 \text{ m}$), but *where* that displacement occurs on the force-displacement curve.

---

### Example 3: Work Done by a Non-Linear Force

**Problem:** A force acting on an object is given by the function $F(x) = (3x^2 - 2x + 5) \text{ N}$, where $x$ is in meters. Calculate the work done by this force as the object moves from $x_1 = 1 \text{ m}$ to $x_2 = 3 \text{ m}$.

**Given:**
*   Force function $F(x) = 3x^2 - 2x + 5 \text{ N}$
*   Initial position $x_1 = 1 \text{ m}$
*   Final position $x_2 = 3 \text{ m}$

**We want:** Total work done $W$.

**Solution:**

1.  **Identify the force function:** The problem directly provides the force as a function of position.
    $$F(x) = 3x^2 - 2x + 5$$
    *This is a polynomial function, meaning the force changes in a more complex way than a simple linear spring.*

2.  **Set up the integral for work:**
    $$W = \int_{x_1}^{x_2} F(x) dx$$
    *The fundamental formula for work remains the same.*

3.  **Substitute the force function and limits of integration:**
    $$W = \int_{1}^{3} (3x^2 - 2x + 5) dx$$
    *Plug in the specific force function and the given limits.*

4.  **Perform the integration term by term:** Use the power rule for each term.
    $$\int (3x^2 - 2x + 5) dx = \int 3x^2 dx - \int 2x dx + \int 5 dx$$
    $$= 3 \left( \frac{x^{2+1}}{2+1} \right) - 2 \left( \frac{x^{1+1}}{1+1} \right) + 5 \left( \frac{x^{0+1}}{0+1} \right)$$
    $$= 3 \left( \frac{x^3}{3} \right) - 2 \left( \frac{x^2}{2} \right) + 5x$$
    $$= x^3 - x^2 + 5x$$
    *Each term of the polynomial is integrated separately. Constants are carried along.*

5.  **Evaluate the definite integral using the limits:**
    $$W = \left[ x^3 - x^2 + 5x \right]_{1}^{3}$$
    $$W = \left( (3)^3 - (3)^2 + 5(3) \right) - \left( (1)^3 - (1)^2 + 5(1) \right)$$
    $$W = \left( 27 - 9 + 15 \right) - \left( 1 - 1 + 5 \right)$$
    $$W = \left( 33 \right) - \left( 5 \right)$$
    $$W = 28$$
    *Carefully substitute the upper limit and then the lower limit, remembering to subtract the latter from the former.*

6.  **State the final answer with units:**
    $$ \boxed{W = 28 \text{ J}} $$
    *Work is in Joules.*

**Reflection:** This example demonstrates integrating a more complex polynomial force function. The key is to apply the power rule of integration correctly to each term and be meticulous with the arithmetic during evaluation.

---

### Example 4: Work Done Against Gravity (Inverse Square Law)

**Problem:** Calculate the work done to lift a payload of mass $m = 1000 \text{ kg}$ from Earth's surface to an altitude of $h = 10^6 \text{ m}$ (1000 km). Assume Earth's radius $R_E = 6.37 \times 10^6 \text{ m}$ and gravitational constant $G = 6.67 \times 10^{-11} \text{ N m}^2/\text{kg}^2$. Earth's mass $M_E = 5.97 \times 10^{24} \text{ kg}$.

**Given:**
*   Payload mass $m = 1000 \text{ kg}$
*   Altitude $h = 10^6 \text{ m}$
*   Earth's radius $R_E = 6.37 \times 10^6 \text{ m}$
*   Gravitational constant $G = 6.67 \times 10^{-11} \text{ N m}^2/\text{kg}^2$
*   Earth's mass $M_E = 5.97 \times 10^{24} \text{ kg}$

**We want:** Total work done $W$.

**Solution:**

1.  **Identify the force function:** The gravitational force between Earth and the payload varies with the square of the distance from Earth's center. The force *by* gravity is attractive. The work done *to lift* the payload is against this gravitational force. Let $r$ be the distance from Earth's center.
    $$F(r) = \frac{G M_E m}{r^2}$$
    *This is Newton's Law of Universal Gravitation. The force decreases as the object moves further from Earth's center.*

2.  **Determine the limits of integration:**
    *   Initial position ($r_1$): At Earth's surface, the distance from the center is $R_E$.
        $$r_1 = R_E = 6.37 \times 10^6 \text{ m}$$
    *   Final position ($r_2$): At an altitude $h$ above the surface, the distance from the center is $R_E + h$.
        $$r_2 = R_E + h = 6.37 \times 10^6 \text{ m} + 10^6 \text{ m} = 7.37 \times 10^6 \text{ m}$$
    *We are integrating with respect to $r$, the distance from the center of the Earth.*

3.  **Set up the integral for work:**
    $$W = \int_{r_1}^{r_2} F(r) dr$$
    *The general work formula applies, with $F(r)$ and $dr$ instead of $F(x)$ and $dx$.*

4.  **Substitute the force function and limits of integration:**
    $$W = \int_{R_E}^{R_E+h} \frac{G M_E m}{r^2} dr$$
    *Plug in the gravitational force function and the calculated limits.*

5.  **Perform the integration:** The term $G M_E m$ is a constant, so it can be pulled out of the integral.
    $$W = G M_E m \int_{R_E}^{R_E+h} r^{-2} dr$$
    $$W = G M_E m \left[ \frac{r^{-2+1}}{-2+1} \right]_{R_E}^{R_E+h}$$
    $$W = G M_E m \left[ \frac{r^{-1}}{-1} \right]_{R_E}^{R_E+h}$$
    $$W = -G M_E m \left[ \frac{1}{r} \right]_{R_E}^{R_E+h}$$
    *Integration of $r^{-2}$ yields $-r^{-1}$ or $-1/r$.*

6.  **Evaluate the definite integral using the limits:**
    $$W = -G M_E m \left( \frac{1}{R_E+h} - \frac{1}{R_E} \right)$$
    $$W = G M_E m \left( \frac{1}{R_E} - \frac{1}{R_E+h} \right)$$
    *Distributing the negative sign simplifies the expression.*

7.  **Substitute numerical values and calculate:**
    $$W = (6.67 \times 10^{-11}) (5.97 \times 10^{24}) (1000) \left( \frac{1}{6.37 \times 10^6} - \frac{1}{7.37 \times 10^6} \right)$$
    $$W = (3.982 \times 10^{17}) \left( (1.5698 \times 10^{-7}) - (1.3568 \times 10^{-7}) \right)$$
    $$W = (3.982 \times 10^{17}) \left( 0.2130 \times 10^{-7} \right)$$
    $$W = (3.982 \times 10^{17}) (2.130 \times 10^{-8})$$
    $$W = 8.481 \times 10^9$$
    *Careful handling of scientific notation is critical here. Break it down into manageable parts.*

8.  **State the final answer with units:**
    $$ \boxed{W = 8.48 \times 10^9 \text{ J}} $$
    *The work done is a very large positive number, indicating significant energy is required to lift the payload against gravity.*

**Reflection:** This example is challenging due to the inverse square law force function and the large numbers involved. It's a direct application in rocket science. The key takeaways are recognizing the correct force function ($F \propto 1/r^2$), setting the limits of integration from the center of the Earth, and performing the integration of $r^{-2}$ correctly. The result is positive because we are calculating the work done *against* gravity.

## 6. Common mistakes and traps

Students often stumble on specific points when dealing with work done by variable forces. Be wary of these traps:

1.  **Incorrect Limits of Integration:** Forgetting that $x_1$ and $x_2$ in $\int_{x_1}^{x_2} F(x) dx$ represent the *initial and final positions* (absolute coordinates), not the total displacement. For instance, stretching a spring from $2 \text{ cm}$ to $5 \text{ cm}$ means limits $0.02 \text{ m}$ and $0.05 \text{ m}$, not $0 \text{ m}$ to $0.03 \text{ m}$.
2.  **Confusing Applied Force with Restoring Force:** For springs, the force *by* the spring is $F_{spring} = -kx$. The work done *by an external agent* to stretch or compress the spring is done *against* this force, so the applied force is $F_{applied} = +kx$. Using the wrong sign in the integral will lead to an incorrect sign for the work.
3.  **Using Average Force Incorrectly:** Only if the force varies linearly with displacement (like a spring under Hooke's Law) can you sometimes get away with $W = F_{avg} \cdot \Delta x$. For non-linear force functions, using a simple average force will give an incorrect result. Integration is the robust method.
4.  **Skipping the $dx$ (or $dr$) in the Integral:** While seemingly minor, omitting $dx$ is mathematically incorrect and can lead to conceptual errors. It represents the infinitesimal displacement over which the force $F(x)$ acts.
5.  **Units Errors:** Always ensure consistent units. If force is in Newtons and distance in meters, work will be in Joules. If a spring constant is given in $\text{N/cm}$, convert it to $\text{N/m}$ before calculations.
6.  **Algebraic/Calculus Errors:** Common mistakes include incorrect integration (e.g., power rule mistakes, forgetting the negative sign for $\int x^{-2} dx$), or arithmetic errors when evaluating the definite integral.

## 7. Textbook-precise explanation

In physics, work is formally defined as the energy transferred to or from an object by means of a force causing displacement. For a force that varies in magnitude and/or direction along a path, the work done is given by a line integral.

Consider an object moving along a path $C$ from an initial position $\vec{r}_1$ to a final position $\vec{r}_2$. If a variable force $\vec{F}(\vec{r})$ acts on the object, the infinitesimal work $dW$ done by the force over an infinitesimal displacement $d\vec{r}$ is given by the dot product:
$$dW = \vec{F}(\vec{r}) \cdot d\vec{r}$$
The total work $W$ done by the force along the path $C$ is the sum of all these infinitesimal works, which is obtained by integrating $dW$ along the path:
$$W = \int_C \vec{F}(\vec{r}) \cdot d\vec{r}$$
This is the most general definition of work.

For one-dimensional motion along the x-axis, where the force $\vec{F}$ is always directed along the x-axis and its magnitude depends only on the position $x$ (i.e., $\vec{F}(x) = F(x)\hat{i}$), and the infinitesimal displacement is $d\vec{r} = dx\hat{i}$, the dot product simplifies:
$$dW = (F(x)\hat{i}) \cdot (dx\hat{i}) = F(x)dx (\hat{i} \cdot \hat{i}) = F(x)dx$$
Thus, for one-dimensional motion from an initial position $x_1$ to a final position $x_2$, the total work done is:
$$W = \int_{x_1}^{x_2} F(x) dx$$
This integral represents the area under the force-displacement curve $F(x)$ between $x_1$ and $x_2$. If $F(x)$ is positive, work is done *by* the force; if $F(x)$ is negative, work is done *against* the force (or the force does negative work).

Forces for which the work done is independent of the path taken, depending only on the initial and final positions, are called **conservative forces** (e.g., gravity, spring force). For such forces, the work done can be related to a change in potential energy.

(Refer to "Serway & Jewett, Physics for Scientists and Engineers, 10th ed., Chapter 7" or "Halliday, Resnick, & Walker, Fundamentals of Physics, 11th ed., Chapter 7" for further details on work and energy.)

## 8. ASCII diagrams

```text
    Force (F)
      ^
      |     /|
      |    / |
      |   /  |  F(x)
      |  /   |
      | /    |
      |/_____|_______> Position (x)
      0   x   x+dx

Figure 1: Infinitesimal work (dW) as area under F-x curve.
The curve represents a variable force F(x). For a tiny displacement dx,
the force F(x) is approximately constant, forming a thin rectangle
with area dW = F(x)dx.


    Force (F)
      ^
      |       /
      |      /
      |     /
      |    /
      |   /
      |  /
      | /
      |/________________> Position (x)
      0  x_1   x_2

Figure 2: Total work (W) as the area under the F-x curve.
The total work done from position x_1 to x_2 is the entire shaded
area under the F(x) curve between these two points. This area is
calculated by the definite integral.


     | Equilibrium
     |    position
     V
<----|----O----->
     |    |
     |    x
     |    |
     |    F_applied = kx
     |    |
     |    V

Figure 3: Spring force and displacement.
'O' represents the equilibrium position (x=0).
'x' is the displacement from equilibrium.
'F_applied' is the external force needed to stretch the spring,
which is proportional to x (F=kx).
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **"Integral Is Summing Tiny Areas (under the F-x curve)."**
    *   Visualize a graph of Force (y-axis) vs. Displacement (x-axis). If the force is constant, it's a straight horizontal line, and work is a simple rectangle's area ($F \times d$). If the force is variable, it's a curve. Imagine slicing this curve into incredibly thin vertical strips. Each strip has a height $F(x)$ and a width $dx$. The area of each tiny strip is $F(x)dx$, which is your $dW$. Integration is simply adding up the areas of all these tiny strips to get the total area under the curve, which is the total work $W$.

2.  **Formulas/Facts to Overlearn:**
    *   **Work by constant force:** $W = Fd$ (when force and displacement are in the same direction).
    *   **Work by variable force (1D):** $W = \int_{x_1}^{x_2} F(x) dx$.
    *   **Spring force (applied):** $F(x) = kx$.
    *   **Gravitational force (inverse square):** $F(r) = \frac{GMm}{r^2}$.

3.  **Spaced-Repetition Schedule:**
    *   **Review 1:** After 1 day.
    *   **Review 2:** After 3 days.
    *   **Review 3:** After 7 days.
    *   **Review 4:** After 16 days.
    *   **Review 5:** After 35 days.
    *   For each review, quickly re-read sections 1, 4, 5, and 9. Try to recall the core idea and the main formula before looking.

4.  **First-Principles Re-derivation Pathway:**
    *   **Start with the simplest definition of work:** Work = Force $\times$ Distance ($W = Fd$).
    *   **Identify the problem:** This formula only works if Force ($F$) is constant. What if $F$ changes with position ($F(x)$)?
    *   **The "trick":** If $F$ changes, break the total distance into infinitesimally small segments ($dx$). Over such a tiny segment, $F(x)$ is essentially constant.
    *   **Calculate infinitesimal work:** For each tiny segment $dx$, the tiny amount of work done is $dW = F(x)dx$.
    *   **Sum the tiny works:** To get the total work over a larger distance (from $x_1$ to $x_2$), you must add up all these infinitesimal $dW$'s. The mathematical tool for summing an infinite number of infinitesimal quantities is the definite integral.
    *   **Derive the formula:** Therefore, $W = \int_{x_1}^{x_2} F(x) dx$. This pathway allows you to rebuild the formula from basic principles if you ever forget it.

## 10. Connections — what this leads to

Understanding work done by variable forces is a cornerstone concept that unlocks many advanced topics in physics and engineering:

*   **Potential Energy:** This concept is directly linked to potential energy. For conservative forces (like gravity or spring force), the work done by the force is equal to the negative change in potential energy ($W = -\Delta U$). Conversely, the work done *by an external agent* against a conservative force is equal to the change in potential energy ($W_{ext} = \Delta U$). This is how we derive the formulas for gravitational potential energy ($U_g = -\frac{GMm}{r}$ or $mgh$ near surface) and elastic potential energy ($U_s = \frac{1}{2}kx^2$).
*   **Work-Energy Theorem (for Variable Forces):** The Work-Energy Theorem states that the net work done on an object equals its change in kinetic energy ($W_{net} = \Delta K$). When the net force is variable, $W_{net}$ is calculated using $\int F_{net}(x) dx$. This theorem remains profoundly powerful even with variable forces.
*   **Conservation of Energy:** The principles of work and potential energy are fundamental to the law of conservation of mechanical energy ($E = K + U = \text{constant}$) and the broader conservation of energy, which includes non-conservative forces (where $W_{nc} = \Delta E_{mech}$).
*   **Power:** Power is the rate at which work is done ($P = dW/dt$). If work is done by a variable force, then power can also be variable ($P = F(x) \cdot v(x)$ in 1D, or $\vec{F} \cdot \vec{v}$ in general).
*   **Orbital Mechanics:** Calculating the energy required to launch satellites into orbit, change orbits, or escape a planet's gravitational pull relies heavily on integrating the variable gravitational force. This is critical for mission planning in astrophysics and aerospace engineering.
*   **Stress-Strain Relationships:** In material science, the work done to deform a material (e.g., stretching a metal rod) is represented by the area under its stress-strain curve. This work corresponds to the energy stored or dissipated within the material, which is crucial for understanding material properties like toughness and resilience.
*   **Thermodynamics:** In thermodynamics, the work done by or on a gas during expansion or compression is given by $W = \int P dV$, where pressure $P$ can be a variable function of volume $V$. This is a direct analogue to $\int F dx$.
*   **Electromagnetism:** The work done by an electric field on a charged particle is calculated by integrating the electric force over the particle's path, leading to concepts of electric potential and voltage.

## 11. Self-check questions

1.  A force acting on a particle is given by $F(x) = (6x - 2) \text{ N}$. Calculate the work done by this force as the particle moves from $x = 0 \text{ m}$ to $x = 4 \text{ m}$.
2.  A spring has a spring constant of $k = 400 \text{ N/m}$. How much work is required to compress the spring from $x = 0.02 \text{ m}$ to $x = 0.08 \text{ m}$ from its equilibrium position?
3.  The force required to pull an object through a fluid is given by $F(v) = Av + Bv^2$, where $A$ and $B$ are constants and $v$ is velocity. Explain why you cannot directly use the integral $\int F(v) dv$ to find the work done if the force depends on velocity. What would be the correct approach if the velocity itself varies with position ($v(x)$)?
4.  A force $F(x) = C/x^3$ acts on an object, where $C = 10 \text{ N m}^3$. Calculate the work done by this force as the object moves from $x = 1 \text{ m}$ to $x = \infty$. (This requires evaluating an improper integral.)
5.  Consider a vertical rope of length $L$ and mass $M$ hanging from a ceiling. How much work is done to pull the entire rope up to the ceiling, assuming the top end is already at the ceiling and you are pulling from the bottom? (Hint: Consider an infinitesimal segment of the rope at a distance $y$ from the ceiling and the force required to lift it.)