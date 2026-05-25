## 1. What it is — in plain English

Imagine water flowing through a garden hose. If you squeeze the end of the hose, making the opening smaller, what happens? The water shoots out much faster, right? But what about the pressure *inside* the hose just before the squeeze? It actually drops a bit.

Bernoulli's equation is a fancy way of saying that for a smoothly flowing fluid, like water or air, there's a trade-off between its speed, its pressure, and its height. If the fluid speeds up, its pressure tends to go down. If it slows down, its pressure tends to go up. And if it goes higher, its pressure also tends to go down because gravity has more "pull" on it.

Think of it like this: the fluid has a certain amount of "energy" per unit volume. This energy can be in the form of pressure (pushing energy), kinetic energy (movement energy), or potential energy (height energy). Bernoulli's equation states that if you add up these three types of energy for any bit of fluid moving along a smooth path, that total sum stays constant, as long as there's no friction or external pumps adding energy.

So, in simple terms, it tells us how the pressure, speed, and height of a fluid are related to each other as it flows. It's a statement of energy conservation specifically tailored for fluids.

## 2. Why it matters — real-world applications

Bernoulli's equation is one of the most fundamental principles in fluid mechanics, with widespread applications across engineering and physics.

1.  **Aerospace (Aircraft Lift):** This is perhaps the most famous application. The curved shape of an airplane wing (an airfoil) causes air to flow faster over the top surface than the bottom. According to Bernoulli's principle, this higher speed above the wing results in lower pressure compared to the slower-moving air below the wing. This pressure difference creates an upward force, known as lift, which allows aircraft to fly. Companies like Boeing and Airbus design their wings meticulously based on these principles.

2.  **Rocket Science (Nozzle Design):** While compressible flow (which requires more advanced equations than simple Bernoulli) is crucial for rocket nozzles, the underlying principle of converting pressure energy into kinetic energy (velocity) is the same. In a de Laval nozzle, the narrowing and then widening shape accelerates the exhaust gases to supersonic speeds, generating thrust. Understanding how pressure and velocity trade off is key to maximizing rocket engine efficiency.

3.  **Flow Measurement (Venturi Meters and Pitot Tubes):** In industries ranging from chemical processing to HVAC, accurately measuring fluid flow rates is critical. A Venturi meter uses a constricted section in a pipe. As fluid flows through the constriction, its velocity increases, and its pressure drops. By measuring this pressure drop, engineers can calculate the flow rate. Pitot tubes, used on aircraft (e.g., by instrument manufacturers like Collins Aerospace) and in wind tunnels, measure airspeed by comparing static pressure to stagnation pressure (where the air is brought to rest). Both rely directly on Bernoulli's equation.

4.  **Hydraulics and Plumbing (Pipe Flow):** When designing water supply systems, irrigation networks, or even complex industrial piping (e.g., for oil and gas companies like ExxonMobil), engineers use Bernoulli's equation to predict pressure changes, flow rates, and the required pump power to move fluids through pipes of varying diameters and elevations. It helps ensure efficient and reliable fluid transport.

## 3. Prerequisites — what you must know first

Before diving into the derivation of Bernoulli's equation, ensure you have a solid grasp of the following concepts. If any are unfamiliar, pause and review them.

*   **Newton's Second Law ($F=ma$):** The fundamental principle that the net force acting on an object is equal to the product of its mass and acceleration. This is the starting point of our derivation.
*   **Work-Energy Theorem:** The work done on an object by all forces equals the change in its kinetic energy. While we'll derive from $F=ma$, Bernoulli's equation is essentially a statement of energy conservation, so understanding this theorem provides valuable context.
*   **Conservation of Energy:** In a closed system, energy cannot be created or destroyed, only transformed from one form to another. Bernoulli's equation is a specific application of this principle to fluid flow.
*   **Calculus (Derivatives and Integrals):** We will be dealing with continuously changing quantities (like pressure, velocity, height) along a path, requiring the use of derivatives (e.g., $\frac{dP}{ds}$) and integrals ($\int \dots ds$).
*   **Fluid Properties:**
    *   **Density ($\rho$):** Mass per unit volume of a fluid. Assumed constant for incompressible flow.
    *   **Pressure ($P$):** Force exerted per unit area by a fluid.
    *   **Velocity ($v$):** Speed and direction of fluid particles.
*   **Streamline:** An imaginary line in a fluid flow field that is everywhere tangent to the velocity vector of the fluid particles. It represents the path a massless fluid particle would follow. Our derivation is valid *along* a streamline.
*   **Incompressible Flow:** A flow in which the density of the fluid remains constant. This is a key assumption for the standard form of Bernoulli's equation.
*   **Inviscid Flow:** A flow in which the effects of viscosity (internal friction) are negligible. Another key assumption.
*   **Steady Flow:** A flow in which the fluid properties (velocity, pressure, density) at any point in space do not change with time.

## 4. The core idea — step by step

We will derive Bernoulli's equation by applying Newton's Second Law, $F=ma$, to a small, imaginary parcel of fluid moving along a streamline. This approach directly links the forces acting on the fluid to its resulting acceleration.

### Step 1: Define a Fluid Element and its Motion

**Plain-English Statement:** Imagine a tiny, sausage-shaped blob of fluid moving along a specific path (a streamline). We need to describe its size, mass, and how its properties change as it moves.

**Small Concrete Example:** Picture a single drop of water in a river. We're going to focus on that one drop and how the forces around it push it faster or slower, or up and down.

**Formal/Mathematical Version:**
Consider an infinitesimally small fluid element of mass $dm$ and volume $dV = dA \cdot ds$, where $dA$ is its cross-sectional area perpendicular to the streamline, and $ds$ is its length along the streamline.
The density of the fluid is $\rho$, so $dm = \rho dV = \rho dA ds$.
The velocity of this element is $v$, which changes along the streamline. We are tracking its motion along the $s$-direction (the streamline direction).

**What could go wrong:** Forgetting that $ds$ is an *infinitesimal* length, meaning we're looking at changes over extremely small distances. Also, assuming $dA$ is constant along the streamline, which isn't always true for a single streamline (but we'll consider it small enough that pressure acts uniformly over it).

### Step 2: Identify Forces Acting on the Fluid Element

**Plain-English Statement:** What pushes or pulls on our tiny fluid blob? There are two main types of forces: pressure from the surrounding fluid pushing on its ends, and gravity pulling it downwards.

**Small Concrete Example:** If you squeeze a tube of toothpaste, the pressure at the back pushes the paste forward. Gravity always pulls things down, including toothpaste.

**Formal/Mathematical Version:**
The forces acting on the fluid element are:
1.  **Pressure Forces:**
    *   On the upstream face (at position $s$): The pressure is $P$. The force is $P \cdot dA$ in the direction of flow.
    *   On the downstream face (at position $s+ds$): The pressure is $P + dP$. The force is $(P+dP) \cdot dA$ *opposite* to the direction of flow.
    *   Net pressure force in the $s$-direction: $F_P = P \cdot dA - (P+dP) \cdot dA = -dP \cdot dA$.
2.  **Gravitational Force:**
    *   The weight of the fluid element is $dm \cdot g = \rho \cdot dA \cdot ds \cdot g$.
    *   The component of this force along the streamline depends on the angle the streamline makes with the vertical. Let $z$ be the vertical height. The change in height along the streamline is $dz$. The component of gravity *opposing* the flow along the streamline is $-dm \cdot g \cdot \sin \theta$, where $\sin \theta = \frac{dz}{ds}$.
    *   So, $F_g = -dm \cdot g \cdot \frac{dz}{ds} = -\rho \cdot dA \cdot ds \cdot g \cdot \frac{dz}{ds} = -\rho g dA dz$.

**What could go wrong:** Getting the signs wrong for forces. Pressure acts *inward* on a surface, so the force on the downstream face acts backward. Gravity always acts down, so its component along an upward-sloping streamline will oppose the flow.

### Step 3: Apply Newton's Second Law Along the Streamline

**Plain-English Statement:** Now we sum up all the forces acting on our fluid blob in the direction it's moving and set that equal to its mass times its acceleration.

**Small Concrete Example:** If you push a toy car with a certain force, and friction pushes back, the net force determines how quickly the car speeds up or slows down.

**Formal/Mathematical Version:**
The net force $F_{net}$ acting on the fluid element along the streamline ($s$-direction) is the sum of the pressure forces and the gravitational force component:
$F_{net} = F_P + F_g = -dP \cdot dA - \rho g dA dz$

According to Newton's Second Law, $F_{net} = dm \cdot a_s$, where $a_s$ is the acceleration of the fluid element along the streamline.
So, $-dP \cdot dA - \rho g dA dz = dm \cdot a_s$

**What could go wrong:** Forgetting to include all relevant forces, especially gravity if the height changes.

### Step 4: Express Acceleration Along the Streamline

**Plain-English Statement:** How do we describe the acceleration of our fluid blob as it moves along its path? It's not just how its speed changes over time, but how its speed changes *as it moves from one point to another* along the streamline.

**Small Concrete Example:** If a car speeds up from 30 mph to 60 mph over a certain distance, its acceleration can be thought of in terms of how its speed changes with distance, multiplied by its current speed.

**Formal/Mathematical Version:**
For steady flow, the velocity $v$ at a point depends only on its position $s$ along the streamline, not explicitly on time $t$. However, a fluid element *experiences* acceleration as it moves to different positions where the velocity is different.
The acceleration $a_s$ of a fluid particle along a streamline is given by the material derivative (or substantial derivative) for steady flow:
$a_s = \frac{dv}{dt} = \frac{\partial v}{\partial t} + v \frac{\partial v}{\partial s}$
Since the flow is steady, $\frac{\partial v}{\partial t} = 0$.
Therefore, $a_s = v \frac{dv}{ds}$.

**What could go wrong:** Confusing the total derivative $\frac{dv}{dt}$ with the partial derivative $\frac{\partial v}{\partial t}$. For steady flow, the local change in velocity is zero, but the convective change (as the particle moves to a new location with a different velocity) is not.

### Step 5: Substitute and Simplify the Equation of Motion

**Plain-English Statement:** Now we plug the acceleration expression and the mass of the fluid blob into our Newton's Second Law equation and do some algebraic clean-up.

**Small Concrete Example:** If you know the net force on the car and its acceleration formula, you can combine them to find a relationship between force, speed, and distance.

**Formal/Mathematical Version:**
Substitute $dm = \rho dA ds$ and $a_s = v \frac{dv}{ds}$ into the equation from Step 3:
$-dP \cdot dA - \rho g dA dz = (\rho dA ds) \cdot (v \frac{dv}{ds})$

Now, divide the entire equation by $dA$:
$-dP - \rho g dz = \rho ds \cdot (v \frac{dv}{ds})$

Cancel $ds$ on the right side:
$-dP - \rho g dz = \rho v dv$

Rearrange the terms to group differentials:
$dP + \rho v dv + \rho g dz = 0$

**What could go wrong:** Algebraic errors, especially with signs. Forgetting to divide by $dA$ or incorrectly canceling $ds$.

### Step 6: Integrate Along the Streamline

**Plain-English Statement:** We have an equation that describes the changes over an *infinitesimal* distance. To get a useful equation for the *entire* streamline (or a significant portion of it), we need to add up all these tiny changes. This is what integration does.

**Small Concrete Example:** If you know how the speed of the car changes over every tiny segment of its path, you can integrate that to find the total change in speed (or kinetic energy) over a longer distance.

**Formal/Mathematical Version:**
Integrate the equation $dP + \rho v dv + \rho g dz = 0$ along a streamline from an initial point (1) to a final point (2).
$\int_1^2 dP + \int_1^2 \rho v dv + \int_1^2 \rho g dz = \int_1^2 0$

Assuming the fluid is **incompressible** ($\rho = \text{constant}$) and **inviscid** (no energy loss due to friction), and the flow is **steady**:
$\int_1^2 dP = P_2 - P_1$
$\int_1^2 \rho v dv = \rho \int_1^2 v dv = \rho \left[ \frac{1}{2}v^2 \right]_1^2 = \frac{1}{2}\rho v_2^2 - \frac{1}{2}\rho v_1^2$
$\int_1^2 \rho g dz = \rho g \int_1^2 dz = \rho g [z]_1^2 = \rho g z_2 - \rho g z_1$

Summing these integrated terms:
$(P_2 - P_1) + (\frac{1}{2}\rho v_2^2 - \frac{1}{2}\rho v_1^2) + (\rho g z_2 - \rho g z_1) = 0$

**What could go wrong:** Forgetting the assumptions of incompressible, inviscid, and steady flow. These assumptions are critical for treating $\rho$ as constant and for the integration to be straightforward.

### Step 7: Arrive at Bernoulli's Equation

**Plain-English Statement:** After all that math, we can rearrange the terms to get the famous equation, which tells us that the sum of pressure, kinetic energy term, and potential energy term is constant along a streamline.

**Small Concrete Example:** It's like saying: your money in your wallet + your money in the bank + your money under the mattress = your total wealth. If you move money between these places, the total stays the same.

**Formal/Mathematical Version:**
Rearrange the equation from Step 6 by grouping terms for point 1 and point 2:
$P_2 + \frac{1}{2}\rho v_2^2 + \rho g z_2 = P_1 + \frac{1}{2}\rho v_1^2 + \rho g z_1$

This means that for any two points (1 and 2) along a streamline in an incompressible, inviscid, steady flow:
$$P + \frac{1}{2}\rho v^2 + \rho g z = \text{constant}$$
This is Bernoulli's equation. Each term has units of pressure (Force/Area) or energy per unit volume (Energy/Volume), which are equivalent.

*   $P$: Static pressure
*   $\frac{1}{2}\rho v^2$: Dynamic pressure (related to kinetic energy)
*   $\rho g z$: Hydrostatic pressure (related to potential energy)

**What could go wrong:** Misinterpreting the "constant." It's constant *along a given streamline*, but it might be a different constant for a different streamline. Also, forgetting the crucial assumptions under which this equation is valid.

## 5. Worked examples — multiple, with every step shown

### Example 1: Horizontal Pipe with Changing Diameter

**Problem Statement:** Water flows steadily through a horizontal pipe. At point 1, the pipe diameter is 10 cm, the velocity is 2 m/s, and the pressure is 200 kPa. At point 2, the pipe diameter is 5 cm. Assuming ideal fluid conditions (incompressible, inviscid), calculate the pressure at point 2. The density of water is $1000 \text{ kg/m}^3$.

**Given:**
*   $D_1 = 10 \text{ cm} = 0.10 \text{ m}$
*   $v_1 = 2 \text{ m/s}$
*   $P_1 = 200 \text{ kPa} = 200,000 \text{ Pa}$
*   $D_2 = 5 \text{ cm} = 0.05 \text{ m}$
*   $\rho = 1000 \text{ kg/m}^3$
*   Pipe is horizontal, so $z_1 = z_2$.

**Want:** $P_2$

**Solution:**

1.  **Identify the governing equation:**
    Since the flow is steady, incompressible, and inviscid, we can use Bernoulli's equation between points 1 and 2 along a streamline.
    $$P_1 + \frac{1}{2}\rho v_1^2 + \rho g z_1 = P_2 + \frac{1}{2}\rho v_2^2 + \rho g z_2$$

2.  **Simplify for horizontal flow:**
    The pipe is horizontal, so $z_1 = z_2$. The $\rho g z$ terms cancel out.
    $$P_1 + \frac{1}{2}\rho v_1^2 = P_2 + \frac{1}{2}\rho v_2^2$$
    *This simplification is valid because there's no change in potential energy due to height.*

3.  **Find the velocity at point 2 ($v_2$) using the Continuity Equation:**
    The mass flow rate must be conserved. For incompressible flow, volume flow rate is conserved: $A_1 v_1 = A_2 v_2$.
    First, calculate the cross-sectional areas:
    $A_1 = \pi \left(\frac{D_1}{2}\right)^2 = \pi \left(\frac{0.10 \text{ m}}{2}\right)^2 = \pi (0.05 \text{ m})^2 = 0.0025\pi \text{ m}^2$
    $A_2 = \pi \left(\frac{D_2}{2}\right)^2 = \pi \left(\frac{0.05 \text{ m}}{2}\right)^2 = \pi (0.025 \text{ m})^2 = 0.000625\pi \text{ m}^2$

    Now, apply continuity:
    $v_2 = v_1 \frac{A_1}{A_2} = (2 \text{ m/s}) \frac{0.0025\pi \text{ m}^2}{0.000625\pi \text{ m}^2}$
    $v_2 = (2 \text{ m/s}) \cdot 4 = 8 \text{ m/s}$
    *We use the continuity equation to find the unknown velocity because mass must be conserved. As the pipe narrows, the fluid must speed up.*

4.  **Substitute known values into the simplified Bernoulli equation and solve for $P_2$:**
    $P_2 = P_1 + \frac{1}{2}\rho v_1^2 - \frac{1}{2}\rho v_2^2$
    $P_2 = P_1 + \frac{1}{2}\rho (v_1^2 - v_2^2)$
    $P_2 = 200,000 \text{ Pa} + \frac{1}{2}(1000 \text{ kg/m}^3) ((2 \text{ m/s})^2 - (8 \text{ m/s})^2)$
    $P_2 = 200,000 \text{ Pa} + 500 \text{ kg/m}^3 (4 \text{ m}^2/\text{s}^2 - 64 \text{ m}^2/\text{s}^2)$
    $P_2 = 200,000 \text{ Pa} + 500 \text{ kg/m}^3 (-60 \text{ m}^2/\text{s}^2)$
    $P_2 = 200,000 \text{ Pa} - 30,000 \text{ Pa}$
    $P_2 = 170,000 \text{ Pa}$

5.  **Convert to kPa:**
    $P_2 = 170 \text{ kPa}$
    *The pressure drops as the fluid speeds up, which is consistent with Bernoulli's principle.*

**Final Answer:**
$\boxed{\mathbf{P_2 = 170 \text{ kPa}}}$

**Reflection:** This example highlights the inverse relationship between velocity and pressure in a horizontal flow. A common mistake is to forget to use the continuity equation to find the unknown velocity before applying Bernoulli's equation. Also, ensuring consistent units (Pascals, meters, kilograms) is crucial.

### Example 2: Torricelli's Law (Fluid Eflux from a Tank)

**Problem Statement:** A large open tank is filled with water to a height of 5 meters. A small hole is made at the bottom of the tank, 0.5 meters above the ground. Calculate the velocity of the water exiting the hole. Assume the tank is large enough that the water level drops very slowly. The density of water is $1000 \text{ kg/m}^3$, and $g = 9.81 \text{ m/s}^2$.

**Given:**
*   Height of water surface from ground: $H = 5 \text{ m}$
*   Height of the hole from ground: $h = 0.5 \text{ m}$
*   $\rho = 1000 \text{ kg/m}^3$
*   $g = 9.81 \text{ m/s}^2$
*   Tank is open to atmosphere.
*   Hole is open to atmosphere.

**Want:** $v_{exit}$ (velocity of water exiting the hole)

**Solution:**

1.  **Define points for Bernoulli's equation:**
    *   Point 1: On the surface of the water inside the tank.
    *   Point 2: Just outside the exit hole.

2.  **Apply Bernoulli's equation between points 1 and 2:**
    $$P_1 + \frac{1}{2}\rho v_1^2 + \rho g z_1 = P_2 + \frac{1}{2}\rho v_2^2 + \rho g z_2$$

3.  **Identify knowns and make assumptions:**
    *   **$P_1$:** The water surface is open to the atmosphere, so $P_1 = P_{atm}$.
    *   **$v_1$:** The tank is large, so the water level drops very slowly. We can approximate $v_1 \approx 0$.
    *   **$z_1$:** We can set our reference height ($z=0$) at the ground. So, $z_1 = H = 5 \text{ m}$.
    *   **$P_2$:** The water exits into the atmosphere, so $P_2 = P_{atm}$.
    *   **$v_2$:** This is $v_{exit}$, what we want to find.
    *   **$z_2$:** The height of the hole from the ground, $z_2 = h = 0.5 \text{ m}$.

4.  **Substitute these into Bernoulli's equation:**
    $$P_{atm} + \frac{1}{2}\rho (0)^2 + \rho g H = P_{atm} + \frac{1}{2}\rho v_{exit}^2 + \rho g h$$
    *We set $v_1=0$ because the tank is large, meaning the surface velocity is negligible. Both points are exposed to atmospheric pressure, so $P_1=P_2=P_{atm}$.*

5.  **Simplify the equation:**
    The $P_{atm}$ terms cancel out from both sides. The $\frac{1}{2}\rho (0)^2$ term is zero.
    $$\rho g H = \frac{1}{2}\rho v_{exit}^2 + \rho g h$$
    *Since both sides have $\rho$, we can divide by $\rho$ to simplify further.*

6.  **Solve for $v_{exit}$:**
    Divide by $\rho$:
    $$g H = \frac{1}{2} v_{exit}^2 + g h$$
    Rearrange to isolate $v_{exit}^2$:
    $$\frac{1}{2} v_{exit}^2 = g H - g h$$
    $$v_{exit}^2 = 2 g (H - h)$$
    $$v_{exit} = \sqrt{2 g (H - h)}$$
    *This is Torricelli's Law, a special case of Bernoulli's equation.*

7.  **Calculate the numerical value:**
    $v_{exit} = \sqrt{2 \cdot (9.81 \text{ m/s}^2) \cdot (5 \text{ m} - 0.5 \text{ m})}$
    $v_{exit} = \sqrt{2 \cdot (9.81 \text{ m/s}^2) \cdot (4.5 \text{ m})}$
    $v_{exit} = \sqrt{88.29 \text{ m}^2/\text{s}^2}$
    $v_{exit} \approx 9.396 \text{ m/s}$

**Final Answer:**
$\boxed{\mathbf{v_{exit} \approx 9.40 \text{ m/s}}}$

**Reflection:** This example demonstrates how Bernoulli's equation can be used to derive specific laws like Torricelli's Law. The key steps were careful selection of points, correct identification of pressures (atmospheric), and recognizing when velocities can be approximated as zero. The height difference $(H-h)$ represents the effective "head" of water driving the flow.

### Example 3: Venturi Meter (Flow Rate Measurement)

**Problem Statement:** A Venturi meter is used to measure the flow rate of gasoline ($\rho = 720 \text{ kg/m}^3$) through a horizontal pipe. The pipe has a diameter of 15 cm, and the throat (narrowest section) has a diameter of 7.5 cm. A pressure gauge shows a pressure difference of 50 kPa between the pipe and the throat. Calculate the volume flow rate of gasoline.

**Given:**
*   $\rho = 720 \text{ kg/m}^3$
*   $D_1 = 15 \text{ cm} = 0.15 \text{ m}$ (pipe diameter)
*   $D_2 = 7.5 \text{ cm} = 0.075 \text{ m}$ (throat diameter)
*   $\Delta P = P_1 - P_2 = 50 \text{ kPa} = 50,000 \text{ Pa}$
*   Horizontal pipe, so $z_1 = z_2$.

**Want:** Volume flow rate $Q$

**Solution:**

1.  **Calculate cross-sectional areas:**
    $A_1 = \pi \left(\frac{D_1}{2}\right)^2 = \pi \left(\frac{0.15 \text{ m}}{2}\right)^2 = \pi (0.075 \text{ m})^2 = 0.005625\pi \text{ m}^2$
    $A_2 = \pi \left(\frac{D_2}{2}\right)^2 = \pi \left(\frac{0.075 \text{ m}}{2}\right)^2 = \pi (0.0375 \text{ m})^2 = 0.00140625\pi \text{ m}^2$
    *These areas relate the velocities in the pipe and throat.*

2.  **Apply Bernoulli's equation between point 1 (pipe) and point 2 (throat):**
    Since the pipe is horizontal, $z_1 = z_2$.
    $$P_1 + \frac{1}{2}\rho v_1^2 = P_2 + \frac{1}{2}\rho v_2^2$$
    Rearrange to use the given pressure difference:
    $$P_1 - P_2 = \frac{1}{2}\rho v_2^2 - \frac{1}{2}\rho v_1^2$$
    $$\Delta P = \frac{1}{2}\rho (v_2^2 - v_1^2)$$
    *This equation relates the pressure drop to the change in kinetic energy.*

3.  **Apply the Continuity Equation:**
    Volume flow rate $Q = A_1 v_1 = A_2 v_2$.
    We can express $v_1$ in terms of $v_2$:
    $v_1 = v_2 \frac{A_2}{A_1}$
    *We need to relate the two velocities to solve the system of equations.*

4.  **Substitute $v_1$ into the Bernoulli equation:**
    $$\Delta P = \frac{1}{2}\rho \left(v_2^2 - \left(v_2 \frac{A_2}{A_1}\right)^2\right)$$
    $$\Delta P = \frac{1}{2}\rho v_2^2 \left(1 - \left(\frac{A_2}{A_1}\right)^2\right)$$
    *This combines the two fundamental equations into one, allowing us to solve for $v_2$.*

5.  **Solve for $v_2$:**
    $$v_2^2 = \frac{2 \Delta P}{\rho \left(1 - \left(\frac{A_2}{A_1}\right)^2\right)}$$
    $$v_2 = \sqrt{\frac{2 \Delta P}{\rho \left(1 - \left(\frac{A_2}{A_1}\right)^2\right)}}$$

    First, calculate the ratio $\frac{A_2}{A_1}$:
    $\frac{A_2}{A_1} = \frac{0.00140625\pi}{0.005625\pi} = \frac{1}{4}$
    So, $\left(\frac{A_2}{A_1}\right)^2 = \left(\frac{1}{4}\right)^2 = \frac{1}{16}$

    Now, substitute values:
    $v_2 = \sqrt{\frac{2 \cdot 50,000 \text{ Pa}}{720 \text{ kg/m}^3 \left(1 - \frac{1}{16}\right)}}$
    $v_2 = \sqrt{\frac{100,000}{720 \cdot \frac{15}{16}}}$
    $v_2 = \sqrt{\frac{100,000}{675}}$
    $v_2 = \sqrt{148.148...}$
    $v_2 \approx 12.17 \text{ m/s}$
    *This is the velocity in the throat.*

6.  **Calculate the volume flow rate $Q$:**
    $Q = A_2 v_2$
    $Q = (0.00140625\pi \text{ m}^2) \cdot (12.17 \text{ m/s})$
    $Q \approx 0.004418 \cdot 12.17 \text{ m}^3/\text{s}$
    $Q \approx 0.0537 \text{ m}^3/\text{s}$

**Final Answer:**
$\boxed{\mathbf{Q \approx 0.0537 \text{ m}^3/\text{s}}}$

**Reflection:** This problem is more involved as it requires combining Bernoulli's equation with the continuity equation. It's a classic application for flow measurement devices. A common trap is to forget to square the area ratio in the denominator or to make algebraic errors when isolating $v_2$.

### Example 4: Siphon from a Tank

**Problem Statement:** A siphon is used to drain water from a large open tank. The water level in the tank is 3 m above the ground. The siphon tube has a uniform diameter. The highest point of the siphon (point B) is 4.5 m above the ground. The outlet of the siphon (point C) is 1 m above the ground. Assuming ideal flow conditions (incompressible, inviscid, steady) and that the tank is large, calculate:
    a) The velocity of water exiting the siphon at point C.
    b) The pressure at the highest point of the siphon (point B).
Take $P_{atm} = 101,325 \text{ Pa}$, $\rho_{water} = 1000 \text{ kg/m}^3$, $g = 9.81 \text{ m/s}^2$.

**Given:**
*   $z_A = 3 \text{ m}$ (water surface in tank, point A)
*   $z_B = 4.5 \text{ m}$ (highest point of siphon, point B)
*   $z_C = 1 \text{ m}$ (siphon outlet, point C)
*   $P_A = P_{atm}$ (open tank)
*   $P_C = P_{atm}$ (open outlet)
*   $v_A \approx 0$ (large tank)
*   Siphon tube has uniform diameter, so $v_B = v_C$.

**Want:** a) $v_C$ and b) $P_B$

**Solution (Part a): Velocity at the outlet ($v_C$)**

1.  **Define points for Bernoulli's equation:**
    *   Point A: Water surface in the tank.
    *   Point C: Siphon outlet.

2.  **Apply Bernoulli's equation between A and C:**
    $$P_A + \frac{1}{2}\rho v_A^2 + \rho g z_A = P_C + \frac{1}{2}\rho v_C^2 + \rho g z_C$$

3.  **Substitute knowns and simplify:**
    $P_{atm} + \frac{1}{2}\rho (0)^2 + \rho g z_A = P_{atm} + \frac{1}{2}\rho v_C^2 + \rho g z_C$
    $\rho g z_A = \frac{1}{2}\rho v_C^2 + \rho g z_C$
    *Atmospheric pressures cancel, and $v_A$ is negligible.*

4.  **Solve for $v_C$:**
    Divide by $\rho$:
    $g z_A = \frac{1}{2} v_C^2 + g z_C$
    $\frac{1}{2} v_C^2 = g z_A - g z_C$
    $v_C^2 = 2 g (z_A - z_C)$
    $v_C = \sqrt{2 g (z_A - z_C)}$
    *This is again Torricelli's Law, as the flow is driven by the height difference between the free surface and the outlet.*

5.  **Calculate the numerical value for $v_C$:**
    $v_C = \sqrt{2 \cdot (9.81 \text{ m/s}^2) \cdot (3 \text{ m} - 1 \text{ m})}$
    $v_C = \sqrt{2 \cdot (9.81 \text{ m/s}^2) \cdot (2 \text{ m})}$
    $v_C = \sqrt{39.24 \text{ m}^2/\text{s}^2}$
    $v_C \approx 6.264 \text{ m/s}$

**Final Answer (Part a):**
$\boxed{\mathbf{v_C \approx 6.26 \text{ m/s}}}$

**Solution (Part b): Pressure at the highest point ($P_B$)**

1.  **Define points for Bernoulli's equation:**
    *   Point A: Water surface in the tank.
    *   Point B: Highest point of the siphon.

2.  **Apply Bernoulli's equation between A and B:**
    $$P_A + \frac{1}{2}\rho v_A^2 + \rho g z_A = P_B + \frac{1}{2}\rho v_B^2 + \rho g z_B$$

3.  **Substitute knowns and simplify:**
    $P_{atm} + \frac{1}{2}\rho (0)^2 + \rho g z_A = P_B + \frac{1}{2}\rho v_B^2 + \rho g z_B$
    $P_{atm} + \rho g z_A = P_B + \frac{1}{2}\rho v_B^2 + \rho g z_B$
    *Again, $P_A=P_{atm}$ and $v_A \approx 0$.*

4.  **Determine $v_B$:**
    Since the siphon tube has a uniform diameter, the velocity throughout the tube is constant. Therefore, $v_B = v_C$.
    From part (a), $v_B = v_C \approx 6.264 \text{ m/s}$.
    *The continuity equation ($A_B v_B = A_C v_C$) simplifies to $v_B = v_C$ because $A_B = A_C$ for a uniform tube.*

5.  **Solve for $P_B$:**
    $P_B = P_{atm} + \rho g z_A - \frac{1}{2}\rho v_B^2 - \rho g z_B$
    $P_B = P_{atm} + \rho g (z_A - z_B) - \frac{1}{2}\rho v_B^2$

6.  **Calculate the numerical value for $P_B$:**
    $P_B = 101,325 \text{ Pa} + (1000 \text{ kg/m}^3)(9.81 \text{ m/s}^2)(3 \text{ m} - 4.5 \text{ m}) - \frac{1}{2}(1000 \text{ kg/m}^3)(6.264 \text{ m/s})^2$
    $P_B = 101,325 \text{ Pa} + (9810 \text{ N/m}^3)(-1.5 \text{ m}) - 500 \text{ kg/m}^3 (39.24 \text{ m}^2/\text{s}^2)$
    $P_B = 101,325 \text{ Pa} - 14,715 \text{ Pa} - 19,620 \text{ Pa}$
    $P_B = 66,990 \text{ Pa}$

**Final Answer (Part b):**
$\boxed{\mathbf{P_B \approx 67.0 \text{ kPa}}}$

**Reflection:** This example demonstrates how to apply Bernoulli's equation to different pairs of points along the same streamline. It also shows that pressure can drop significantly at higher points in a flow system, potentially leading to cavitation if it drops below the vapor pressure of the fluid. The use of the continuity equation ($v_B=v_C$) was crucial.

## 6. Common mistakes and traps

1.  **Applying Bernoulli's equation across different streamlines:** The derivation from $F=ma$ is strictly *along a streamline*. You cannot generally apply it between two points on different streamlines unless specific conditions (like irrotational flow) are met, which are beyond the scope of the basic derivation.
2.  **Forgetting the $\rho g z$ term (potential energy):** Students often simplify Bernoulli's equation to just $P + \frac{1}{2}\rho v^2 = \text{constant}$ for horizontal flow. This is correct for horizontal flow, but if there's a height change, the $\rho g z$ term *must* be included.
3.  **Incorrectly assuming $P_{gauge}$ vs. $P_{absolute}$:** Ensure consistency. If you use gauge pressure at one point, you must use gauge pressure at the other, or convert everything to absolute pressure. When dealing with open surfaces or outlets to atmosphere, $P_{atm}$ cancels out if both points are open to the same atmosphere.
4.  **Inconsistent units:** Mixing kPa with Pa, cm with m, or using different units for density or gravity will lead to incorrect results. Always convert everything to a consistent system (e.g., SI units: Pa, m, kg, s).
5.  **Ignoring the assumptions:** Bernoulli's equation is powerful but relies on idealizations: **incompressible** (density constant), **inviscid** (no friction), **steady** (no change with time), and **along a streamline**. Applying it where these assumptions are strongly violated (e.g., turbulent flow, highly viscous fluids, compressible gases, sudden pipe expansions/contractions with significant energy losses) will yield inaccurate results.
6.  **Confusing "static pressure" with "total pressure":** $P$ in Bernoulli's equation is the static pressure. The term $P + \frac{1}{2}\rho v^2$ is sometimes called the total pressure or stagnation pressure (if $v$ is brought to zero). It's important to distinguish between these.

## 7. Textbook-precise explanation

Bernoulli's equation is a fundamental principle in fluid dynamics that relates the pressure, velocity, and elevation of a fluid along a streamline. It is derived from Newton's Second Law ($F=ma$) applied to an infinitesimal fluid element moving steadily along a streamline, under the crucial assumptions of incompressible and inviscid flow.

Consider a fluid element of mass $dm = \rho dA ds$ moving along a streamline, where $\rho$ is the constant fluid density, $dA$ is the cross-sectional area, and $ds$ is the infinitesimal length along the streamline. The forces acting on this element in the direction of the streamline are:

1.  **Net Pressure Force:** $F_P = P dA - (P+dP) dA = -dP dA$. This arises from the pressure difference across the element.
2.  **Gravitational Force Component:** $F_g = -dm \cdot g \sin\theta = -(\rho dA ds) g \frac{dz}{ds} = -\rho g dA dz$. Here, $\theta$ is the angle the streamline makes with the horizontal, and $dz$ is the change in elevation corresponding to $ds$.

Applying Newton's Second Law, $F_{net} = dm \cdot a_s$:
$$-dP dA - \rho g dA dz = (\rho dA ds) a_s$$

For steady flow, the acceleration of a fluid particle along a streamline is given by the convective acceleration term: $a_s = v \frac{dv}{ds}$.
Substituting this into the equation and dividing by $dA$:
$$-dP - \rho g dz = \rho ds \left(v \frac{dv}{ds}\right)$$
$$-dP - \rho g dz = \rho v dv$$

Rearranging the terms yields:
$$dP + \rho v dv + \rho g dz = 0$$

Integrating this differential equation along a streamline from an upstream point (1) to a downstream point (2), and assuming $\rho$ and $g$ are constant (due to incompressibility and constant gravity):
$$\int_1^2 dP + \int_1^2 \rho v dv + \int_1^2 \rho g dz = \int_1^2 0$$
$$(P_2 - P_1) + \frac{1}{2}\rho (v_2^2 - v_1^2) + \rho g (z_2 - z_1) = 0$$

Rearranging to group terms for each point:
$$P_1 + \frac{1}{2}\rho v_1^2 + \rho g z_1 = P_2 + \frac{1}{2}\rho v_2^2 + \rho g z_2$$

This leads to the statement that the sum of the static pressure, dynamic pressure, and hydrostatic pressure is constant along a streamline:
$$P + \frac{1}{2}\rho v^2 + \rho g z = \text{constant}$$

**Assumptions for this form of Bernoulli's Equation:**
1.  **Steady flow:** Fluid properties at any point do not change with time.
2.  **Incompressible flow:** The fluid density ($\rho$) is constant.
3.  **Inviscid flow:** Viscous effects (friction) are negligible.
4.  **Flow along a streamline:** The equation applies only to points on the same streamline.
5.  **No external work or heat transfer:** No pumps, turbines, or heat exchangers add or remove energy.

This equation is a statement of the conservation of mechanical energy per unit volume for an ideal fluid. Each term has units of pressure (Pa or N/m$^2$) or energy per unit volume (J/m$^3$).

*   $P$: Static pressure
*   $\frac{1}{2}\rho v^2$: Dynamic pressure
*   $\rho g z$: Hydrostatic pressure

**References:**
*   Munson, B. R., Young, D. F., & Okiishi, T. H. (2009). *Fundamentals of Fluid Mechanics* (6th ed.). John Wiley & Sons. (Chapter 3)
*   Fox, R. W., McDonald, A. T., & Pritchard, P. J. (2011). *Introduction to Fluid Mechanics* (8th ed.). John Wiley & Sons. (Chapter 3)

## 8. ASCII diagrams

Here's an ASCII diagram illustrating a fluid element along a streamline, showing the forces and parameters used in the derivation.

```text
                                        ^ z (elevation)
                                        |
                                        |
                                        |
                                        |
                                        |
                                        |
                                        +-----> streamline direction (s)

                                            P + dP
                                            <--
                                      +-----+-----+
                                     /      |      \
                                    /       |       \
                                   /        | dA     \
                                  /         |         \
                                 +----------+----------+
                         P ----> |          |          |
                                 +----------+----------+
                                  \         |         /
                                   \        |        /
                                    \       |       /
                                     \      |      /
                                      +-----+-----+
                                            |
                                            | ds (length of element)
                                            |
                                            V
                                          dm*g (weight acting downwards)

       Fluid element at position 's' along a streamline.
       - P: Pressure at the upstream face.
       - P+dP: Pressure at the downstream face.
       - dA: Cross-sectional area of the element.
       - ds: Length of the element along the streamline.
       - dm*g: Gravitational force (weight) acting on the element.
       - dz: Change in elevation over length ds.
```

This diagram shows a fluid element, slightly wedge-shaped to represent a streamline's curvature, though for the derivation we simplify $dA$ to be constant over $ds$. The key is to visualize the pressure forces acting on the faces and the gravitational force acting on the mass of the element. The streamline direction 's' indicates the path of the fluid particle, and 'z' is the vertical elevation. The pressure forces are shown acting perpendicular to the faces, but their net effect is along the streamline. The gravitational force acts vertically downwards, and its component along the streamline is what we consider.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    Think of "P.V.G." as a fixed total "score" for a fluid particle.
    *   **P**ressure (Static)
    *   **V**elocity (Dynamic, $\frac{1}{2}\rho v^2$)
    *   **G**ravity (Potential, $\rho g z$)
    Imagine a fluid particle as a juggler. It has three balls: Pressure, Velocity, and Gravity. As the juggler moves along a path, the height of each ball might change, but the total height (their sum) stays constant. If one ball drops, another must rise to keep the total the same.

2.  **Formulas/Facts to Overlearn:**
    *   **Bernoulli's Equation:** $P + \frac{1}{2}\rho v^2 + \rho g z = \text{constant}$
    *   **Key Assumptions (in order of importance for typical problems):**
        1.  **Along a Streamline** (or irrotational flow)
        2.  **Incompressible** ($\rho$ constant)
        3.  **Inviscid** (no friction/viscosity)
        4.  **Steady** (no change with time)

3.  **Spaced-Repetition Schedule:**
    *   Review the derivation and formula:
        *   **1 Day** after initial learning
        *   **3 Days** later
        *   **7 Days** later
        *   **16 Days** later
        *   **35 Days** later
    Each review should include mentally (or actually) re-deriving the equation from first principles and working through one or two examples.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the formula, you can always rebuild it from its foundations:
    1.  **Start with Newton's Second Law:** $F_{net} = dm \cdot a_s$
    2.  **Identify forces on a fluid element along a streamline:**
        *   Pressure forces: $-dP \cdot dA$
        *   Gravitational force component: $-\rho g dA dz$
    3.  **Express acceleration for steady flow:** $a_s = v \frac{dv}{ds}$
    4.  **Substitute and simplify:** Combine forces and acceleration, divide by $dA$, cancel $ds$. This leads to $dP + \rho v dv + \rho g dz = 0$.
    5.  **Integrate:** Integrate the differential equation, assuming $\rho$ is constant. This yields the final form: $P + \frac{1}{2}\rho v^2 + \rho g z = \text{constant}$.

## 10. Connections — what this leads to

Bernoulli's equation is a cornerstone of fluid mechanics and serves as a gateway to understanding many more complex phenomena and advanced topics:

*   **Aerodynamics and Hydrodynamics:** It's the basis for understanding lift generation over airfoils, drag reduction, and the design of propellers and hydrofoils. While simplified, it provides the fundamental intuition.
*   **Flow Measurement Devices:** As seen in examples, Bernoulli's equation is directly applied in the design and operation of Venturi meters, orifice plates, and Pitot tubes, which are critical for measuring flow rates and velocities in various industries.
*   **Hydraulic Systems:** It forms the foundation for analyzing flow in pipes, pumps, and turbines. More advanced analyses (e.g., accounting for friction losses using the Extended Bernoulli Equation or Energy Equation) build upon this core principle.
*   **Cavitation:** Understanding that pressure drops with increasing velocity (and/or height) helps explain cavitation, a phenomenon where vapor bubbles form in a liquid due to extremely low pressures, which can damage machinery like pumps and ship propellers.
*   **Navier-Stokes Equations:** Bernoulli's equation is a highly simplified integral of the more general Euler equations (inviscid flow) and, in turn, the Navier-Stokes equations (viscous flow). It represents a special case where many terms simplify out, providing an intuitive entry point to these more complex partial differential equations.
*   **Compressible Flow:** For gases at high speeds (where density changes significantly), Bernoulli's equation needs to be modified (e.g., using the compressible Bernoulli equation or energy equation for compressible flow), but the underlying principle of energy conservation remains. It helps set the stage for understanding phenomena like choked flow in nozzles.
*   **Turbomachinery:** The principles of pressure-velocity trade-offs are fundamental to the design of compressors, turbines, and pumps in rocket engines, jet engines, and power generation.

## 11. Self-check questions

1.  A horizontal pipe narrows from a diameter of 20 cm to 10 cm. Water flows through the larger section at 1.5 m/s with a pressure of 150 kPa. What is the velocity and pressure in the narrower section? (Assume ideal fluid, $\rho = 1000 \text{ kg/m}^3$).
2.  Water flows from a faucet at a height of 2 m above the ground. The faucet has a diameter of 1.5 cm, and the water exits at a velocity of 5 m/s. What is the pressure inside the pipe just before the faucet? (Assume ideal fluid, $P_{atm} = 101,325 \text{ Pa}$).
3.  Explain, in your own words, why the "inviscid" assumption is crucial for the standard form of Bernoulli's equation. What happens if viscosity is significant?
4.  During the derivation of Bernoulli's equation from $F=ma$, at what step does the "steady flow" assumption become explicitly used? What term does it simplify?
5.  Consider a scenario where a fluid flows vertically upwards through a pipe of constant diameter. If the velocity remains constant, describe how the pressure changes as the fluid moves to a higher elevation, and justify your answer using Bernoulli's equation.