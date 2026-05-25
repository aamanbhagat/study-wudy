## 1. What it is — in plain English

Imagine you're trying to push a heavy box across a rough carpet. You push and push, and the box moves, but it feels like a lot of your effort just disappears, making you hot and leaving the carpet scuffed. When you stop pushing, the box quickly grinds to a halt.

Now imagine you're pushing that same box on a perfectly smooth, frictionless ice rink. A tiny push sends it gliding for a very long time. If you push it from point A to point B, and then from B back to A, it takes virtually no effort, and the box still has its initial energy (or close to it).

The forces at play on the carpet – like the "grinding" resistance that makes things hot – are what we call **non-conservative forces**. They're the forces that "steal" energy from a system, usually turning it into less useful forms like heat or sound. Unlike a conservative force (like gravity), where the energy you put in to lift an object is perfectly stored as potential energy and can be fully recovered, non-conservative forces cause a permanent loss of mechanical energy. The path you take matters: pushing a box in a zig-zag on carpet takes more effort (and loses more energy) than pushing it in a straight line.

The two most common non-conservative forces we deal with in physics are **friction** (the resistance between two surfaces rubbing together) and **air drag** (the resistance an object experiences when moving through a fluid like air or water). They both oppose motion and convert mechanical energy into other forms, primarily thermal energy.

## 2. Why it matters — real-world applications

Understanding non-conservative forces is absolutely crucial across many fields, especially in rocket science and engineering:

1.  **Aerospace Vehicle Design (Air Drag):** When designing rockets, airplanes, or re-entry vehicles, minimizing air drag is paramount.
    *   **Rocket Launch:** Every bit of drag means more fuel burned to achieve orbit. Engineers at SpaceX and NASA spend countless hours optimizing the aerodynamic shape of rockets (like the Falcon 9's fairing) to reduce this force, saving millions in fuel and increasing payload capacity.
    *   **Atmospheric Re-entry:** Conversely, drag is deliberately maximized and precisely controlled during atmospheric re-entry for spacecraft (e.g., Apollo capsules, Space Shuttle, Orion). The drag slows the vehicle down, converting its immense kinetic energy into heat, which is then managed by thermal protection systems (like ablative heat shields). Without this controlled drag, vehicles would either burn up or miss their landing targets.

2.  **Braking Systems (Friction):** Whether it's a car, a bicycle, or an aircraft, braking relies entirely on friction.
    *   **Automotive Safety:** Car brakes convert the kinetic energy of the moving vehicle into thermal energy through friction between brake pads and rotors, bringing the car to a stop. Engineers at companies like Brembo or Bosch design these systems for maximum efficiency, reliability, and heat dissipation, directly impacting passenger safety.
    *   **Aircraft Landing:** Aircraft landing gear also utilize powerful friction brakes, often carbon-carbon composites, to dissipate the massive kinetic energy of a landing jet. This is a critical safety system.

3.  **Machine Efficiency and Lubrication (Friction):** In almost any machine with moving parts, friction is present and reduces efficiency.
    *   **Industrial Machinery:** Gears, bearings, and pistons in engines (like those in a rocket's turbopumps) experience friction. Lubricants (oils, greases) are used to reduce this friction, minimizing energy loss as heat, reducing wear and tear, and extending the lifespan of components. This is a major area of research in mechanical engineering and materials science.
    *   **Robotics:** For robotic joints and actuators, minimizing friction ensures smoother, more precise movements and less energy consumption, which is vital for battery-powered systems or high-precision tasks.

4.  **Sporting Performance (Air Drag & Friction):** Athletes and designers constantly seek to minimize drag and optimize friction.
    *   **Cycling & Swimming:** Cyclists wear aerodynamic helmets and suits, and adopt specific body positions to reduce air drag. Swimmers wear specialized suits and shave their bodies to reduce drag in water. This directly translates to faster times.
    *   **Winter Sports:** Skiers apply waxes to their skis to reduce friction with snow, while curlers sweep the ice to momentarily reduce friction for their stones.

5.  **Wind Energy (Air Drag):** While often thought of as a hindrance, air drag is the very mechanism by which wind turbines generate electricity. The drag force of the wind on the turbine blades causes them to rotate, converting the kinetic energy of the wind into rotational mechanical energy, which then drives a generator. Understanding drag is key to optimizing blade design and turbine efficiency.

## 3. Prerequisites — what you must know first

Before diving deep into non-conservative forces, ensure you have a solid grasp of these foundational concepts:

*   **Work:** The transfer of energy by a force acting over a distance. Mathematically, $W = \vec{F} \cdot \Delta\vec{r}$ or $W = Fd \cos\theta$.
*   **Energy:** The capacity to do work.
    *   **Kinetic Energy ($K$):** Energy of motion, $K = \frac{1}{2}mv^2$.
    *   **Potential Energy ($U$):** Stored energy due to position or configuration.
        *   **Gravitational Potential Energy ($U_g$):** $U_g = mgh$.
        *   **Elastic Potential Energy ($U_s$):** $U_s = \frac{1}{2}kx^2$.
*   **Power:** The rate at which work is done or energy is transferred, $P = \frac{dW}{dt} = \vec{F} \cdot \vec{v}$.
*   **Conservative Forces:** Forces for which the work done is independent of the path taken and depends only on the initial and final positions (e.g., gravity, spring force).
*   **Conservation of Mechanical Energy:** In the absence of non-conservative forces, the total mechanical energy ($E_{mech} = K + U$) of a system remains constant.
*   **Newton's Laws of Motion:** Especially the Second Law ($\vec{F}_{net} = m\vec{a}$) for analyzing forces, and the Third Law (action-reaction pairs) for understanding interactions.
*   **Vectors:** Understanding how to represent forces and displacements as vectors, and how to perform dot products.
*   **Basic Calculus:** Specifically, the concept of integration for calculating work done by variable forces or over non-linear paths.

## 4. The core idea — step by step

Let's build up our understanding of non-conservative forces.

### Step 1: Recap Conservative Forces and Mechanical Energy

**Plain English:** Imagine a perfect system where energy never "leaks out." If you lift a ball, the effort you put in (work) is stored perfectly as gravitational potential energy. When the ball falls, that potential energy turns back into kinetic energy, and if it bounces perfectly, it goes right back up to its original height. The total amount of "useful" energy (kinetic + potential) stays the same. The path the ball takes doesn't matter for the *change* in its potential energy; only its starting and ending heights do.

**Small concrete example:** A pendulum swinging in a vacuum. If released from rest at a certain height, it will always return to that exact height on the other side. Its total mechanical energy ($K+U$) is constant throughout its swing.

**Formal/Mathematical Version:**
A force $\vec{F}$ is conservative if the work done by it on a particle moving between two points is independent of the path taken. Equivalently, the work done by a conservative force around any closed path is zero:
$$ \oint \vec{F}_C \cdot d\vec{r} = 0 $$
For conservative forces, we can define a potential energy $U$ such that the work done by the conservative force is the negative change in potential energy:
$$ W_C = -\Delta U $$
In a system where only conservative forces do work, the total mechanical energy $E_{mech} = K + U$ is conserved:
$$ \Delta E_{mech} = \Delta K + \Delta U = 0 \quad \text{or} \quad K_i + U_i = K_f + U_f $$

**What could go wrong:** Thinking that *all* forces that do work can be associated with a potential energy. Only conservative forces have a corresponding potential energy function. You cannot define a "friction potential energy."

### Step 2: Introducing Non-Conservative Forces

**Plain English:** Now, let's introduce reality. When you push that box on the carpet, or a parachutist falls through the air, energy *does* leak out. It doesn't just store up nicely as potential energy; it gets converted into less organized forms, primarily heat and sound. The amount of energy lost depends heavily on the path taken – a longer, more winding path on the carpet means more rubbing, more heat, and more "lost" mechanical energy. These are non-conservative forces.

**Small concrete example:** The pendulum swinging in the air. Due to air resistance, it will swing to a slightly lower height each time, eventually coming to rest. Its total mechanical energy decreases with each swing.

**Formal/Mathematical Version:**
A force $\vec{F}_{NC}$ is non-conservative if the work done by it depends on the path taken between two points. Consequently, the work done by a non-conservative force around a closed path is generally non-zero:
$$ \oint \vec{F}_{NC} \cdot d\vec{r} \neq 0 $$
The work done by non-conservative forces ($W_{NC}$) results in a change in the total mechanical energy of the system:
$$ W_{NC} = \Delta E_{mech} = (K_f + U_f) - (K_i + U_i) $$
This equation is a fundamental extension of the Work-Energy Theorem for systems where non-conservative forces are present. The "lost" mechanical energy is not destroyed but transformed into other forms, primarily internal energy (thermal energy) of the system and its surroundings.

**What could go wrong:** Forgetting that $W_{NC}$ can be positive or negative. For friction and air drag, they *always* oppose motion, so the work they do is always negative, meaning they *remove* mechanical energy from the system. Some non-conservative forces (like a rocket engine's thrust) can *add* mechanical energy to a system.

### Step 3: Friction

**Plain English:** Friction is the force that resists motion when two surfaces are in contact and try to slide past each other. It's what makes tires grip the road, but also what makes an engine wear out. When you slide a book across a table, friction slows it down and makes both the book and the table slightly warmer.

**Small concrete example:** Pushing a wooden block across a concrete floor. You feel resistance, and if you stop pushing, the block stops. The work you do against friction is converted into heat, warming the block and the floor at their contact point.

**Formal/Mathematical Version:**
There are two main types of friction:
*   **Static Friction ($f_s$):** Opposes the *initiation* of motion. $0 \le f_s \le \mu_s N$, where $\mu_s$ is the coefficient of static friction and $N$ is the normal force.
*   **Kinetic Friction ($f_k$):** Opposes *ongoing* motion between surfaces.
    $$ f_k = \mu_k N $$
    where $\mu_k$ is the coefficient of kinetic friction and $N$ is the normal force. Typically, $\mu_k < \mu_s$.
The work done by kinetic friction over a distance $d$ is always negative because the force of friction always acts opposite to the displacement:
$$ W_f = -f_k d = -\mu_k N d $$
If the normal force or friction coefficient varies, or the path is complex, this becomes an integral:
$$ W_f = \int \vec{f}_k \cdot d\vec{r} $$

**What could go wrong:**
1.  Confusing static and kinetic friction. Static friction *prevents* motion, kinetic friction *resists* motion. Work is only done by kinetic friction when there is displacement.
2.  Forgetting the negative sign for work done by friction, which always removes energy from the system.
3.  Assuming the normal force $N$ is always equal to $mg$. This is only true on a horizontal surface without other vertical forces. On an incline or with vertical pushes/pulls, $N$ will be different.

### Step 4: Air Drag (or Fluid Resistance)

**Plain English:** Air drag is the "push back" you feel when you move through air (or water). Stick your hand out of a car window, and you feel the air push against it. A skydiver falls, and the air pushes up, slowing them down. The faster you go, the harder the air pushes.

**Small concrete example:** A car driving on a highway. It needs to constantly burn fuel to overcome air resistance, which increases significantly with speed. This is why fuel efficiency drops dramatically at higher speeds.

**Formal/Mathematical Version:**
Air drag (or fluid resistance in general) is a complex force. For objects moving at relatively low speeds, drag can be proportional to velocity ($F_D \propto v$). However, for most objects moving through air at typical speeds (e.g., cars, rockets, falling objects), the drag force is approximately proportional to the square of the object's speed:
$$ F_D = \frac{1}{2} C \rho A v^2 $$
Where:
*   $C$ is the **drag coefficient**, a dimensionless number that depends on the shape of the object (e.g., a sphere has $C \approx 0.47$, a streamlined car might have $C \approx 0.25-0.35$).
*   $\rho$ (rho) is the **density of the fluid** (e.g., air, water).
*   $A$ is the **cross-sectional area** of the object perpendicular to the direction of motion.
*   $v$ is the **speed** of the object relative to the fluid.

The work done by air drag is also negative, as it always opposes the direction of motion:
$$ W_D = \int \vec{F}_D \cdot d\vec{r} $$
Since $F_D$ depends on $v$, and $v$ often changes, this integral can be challenging to solve analytically without simplifying assumptions (e.g., constant velocity, or small changes in velocity).

**What could go wrong:**
1.  Ignoring the $v^2$ dependence. This means drag becomes much more significant at higher speeds. Doubling speed quadruples drag force.
2.  Confusing drag with buoyancy. Buoyancy is an upward force due to displaced fluid, while drag is a resistive force due to motion through the fluid.
3.  Assuming a constant drag force. Unless the problem specifies it, drag is usually variable.

### Step 5: The Work-Energy Theorem with Non-Conservative Forces

**Plain English:** The Work-Energy Theorem tells us that the total work done on an object changes its kinetic energy. When non-conservative forces are involved, this means the "lost" or "gained" mechanical energy is exactly equal to the work done by those non-conservative forces. So, if you push a box (adding energy) and friction slows it down (removing energy), the net change in the box's speed (kinetic energy) is the sum of all those energy transfers.

**Small concrete example:** A roller coaster car goes down a hill. If there were no friction or air drag, its speed at the bottom would depend only on the height of the hill. But because of friction in the wheels and air drag, it will be moving slower than predicted by simple conservation of mechanical energy. The "missing" kinetic energy is equal to the work done by friction and drag.

**Formal/Mathematical Version:**
The general Work-Energy Theorem states that the net work done on an object equals its change in kinetic energy:
$$ W_{total} = \Delta K $$
The total work can be split into work done by conservative forces ($W_C$) and work done by non-conservative forces ($W_{NC}$):
$$ W_{total} = W_C + W_{NC} = \Delta K $$
Since $W_C = -\Delta U$, we can substitute this:
$$ -\Delta U + W_{NC} = \Delta K $$
Rearranging gives us the most useful form for non-conservative forces:
$$ W_{NC} = \Delta K + \Delta U $$
And since $\Delta K + \Delta U = \Delta E_{mech}$ (change in total mechanical energy), we have:
$$ W_{NC} = \Delta E_{mech} = E_{mech, f} - E_{mech, i} $$
This means the work done by non-conservative forces is precisely the change in the system's total mechanical energy. If $W_{NC}$ is negative (like for friction or drag), then $\Delta E_{mech}$ is negative, meaning mechanical energy is lost. If $W_{NC}$ is positive (like for thrust), then $\Delta E_{mech}$ is positive, meaning mechanical energy is gained.

**What could go wrong:**
1.  Forgetting to include *all* forces doing work when calculating $W_{total}$.
2.  Mixing up the signs: $W_C = -\Delta U$, but $W_{NC}$ can be positive or negative depending on whether the non-conservative force adds or removes energy. Friction and drag *always* remove energy, so their work is negative.

### Step 6: Energy Dissipation

**Plain English:** Where does the "lost" mechanical energy go? It doesn't vanish! It transforms into other forms, primarily thermal energy (heat). When you rub your hands together, they get warm – that's your mechanical work being converted into thermal energy by friction. The air around a fast-moving object also heats up due to drag. This transformation makes the energy less "useful" for mechanical work, but the total energy of the universe is still conserved.

**Small concrete example:** A meteor entering Earth's atmosphere. Its enormous kinetic energy is rapidly converted into thermal energy due due to extreme air drag, causing it to glow intensely and often burn up. This is a dramatic example of energy dissipation.

**Formal/Mathematical Version:**
The principle of conservation of energy states that energy cannot be created or destroyed, only transformed from one form to another. When non-conservative forces do work, mechanical energy ($E_{mech}$) is often converted into internal energy ($E_{int}$), which manifests as an increase in temperature of the interacting objects and their surroundings.
$$ W_{NC} = \Delta E_{mech} = -\Delta E_{int} $$
(The negative sign indicates that a decrease in mechanical energy corresponds to an increase in internal energy.)
More broadly, for an isolated system:
$$ \Delta E_{total} = \Delta K + \Delta U + \Delta E_{int} + \Delta E_{sound} + \dots = 0 $$
However, for practical problems involving friction and drag, we often simplify this to:
$$ W_{NC} = \Delta E_{mech} $$
and understand that this "lost" $E_{mech}$ is primarily converted to thermal energy.

**What could go wrong:** Thinking that energy is *destroyed* when mechanical energy is lost due to friction or drag. It's merely transformed into a less organized, less readily usable form (heat). This is a crucial distinction related to the First Law of Thermodynamics.

## 5. Worked examples — multiple, with every step shown

### Example 1: Horizontal Block with Friction (Easy)

**Problem:** A 2.0 kg block is pushed horizontally across a rough floor with a constant force of 10 N for a distance of 3.0 m. The coefficient of kinetic friction between the block and the floor is 0.30. Calculate the work done by friction and the change in the block's kinetic energy. Assume it starts from rest.

**Given:**
*   Mass of block, $m = 2.0 \text{ kg}$
*   Applied force, $F_{app} = 10 \text{ N}$
*   Distance, $d = 3.0 \text{ m}$
*   Coefficient of kinetic friction, $\mu_k = 0.30$
*   Initial velocity, $v_i = 0 \text{ m/s}$

**Want:**
*   Work done by friction, $W_f$
*   Change in kinetic energy, $\Delta K$

**Solution:**

**Step 1: Draw a Free-Body Diagram and identify forces.**
*   Applied force ($F_{app}$) to the right.
*   Kinetic friction ($f_k$) to the left.
*   Gravity ($mg$) downwards.
*   Normal force ($N$) upwards.

**Step 2: Calculate the normal force ($N$).**
Since the block is moving horizontally, there is no vertical acceleration.
$$ \sum F_y = 0 $$
$$ N - mg = 0 $$
$$ N = mg $$
$$ N = (2.0 \text{ kg})(9.8 \text{ m/s}^2) $$
$$ N = 19.6 \text{ N} $$
*   The normal force balances the gravitational force because the surface is horizontal and there are no other vertical forces.

**Step 3: Calculate the kinetic friction force ($f_k$).**
$$ f_k = \mu_k N $$
$$ f_k = (0.30)(19.6 \text{ N}) $$
$$ f_k = 5.88 \text{ N} $$
*   This is the magnitude of the force opposing the block's motion.

**Step 4: Calculate the work done by friction ($W_f$).**
Friction acts opposite to the displacement, so the angle between $\vec{f}_k$ and $\vec{d}$ is $180^\circ$.
$$ W_f = f_k d \cos(180^\circ) $$
$$ W_f = (5.88 \text{ N})(3.0 \text{ m})(-1) $$
$$ W_f = -17.64 \text{ J} $$
*   The negative sign correctly indicates that friction removes mechanical energy from the system.

**Step 5: Calculate the net force in the horizontal direction ($F_{net,x}$).**
$$ F_{net,x} = F_{app} - f_k $$
$$ F_{net,x} = 10 \text{ N} - 5.88 \text{ N} $$
$$ F_{net,x} = 4.12 \text{ N} $$
*   This is the unbalanced force that causes the block to accelerate.

**Step 6: Calculate the total work done on the block ($W_{total}$).**
$$ W_{total} = F_{net,x} d $$
$$ W_{total} = (4.12 \text{ N})(3.0 \text{ m}) $$
$$ W_{total} = 12.36 \text{ J} $$
*   Alternatively, $W_{total} = W_{app} + W_f = (10 \text{ N})(3.0 \text{ m}) + (-17.64 \text{ J}) = 30 \text{ J} - 17.64 \text{ J} = 12.36 \text{ J}$.

**Step 7: Calculate the change in kinetic energy ($\Delta K$).**
According to the Work-Energy Theorem, $W_{total} = \Delta K$.
$$ \Delta K = 12.36 \text{ J} $$
Since $v_i = 0$, $K_i = 0$. So, $K_f = 12.36 \text{ J}$.
*   The positive change in kinetic energy means the block is speeding up.

**Final Answer:**
The work done by friction is $\boxed{-17.6 \text{ J}}$.
The change in the block's kinetic energy is $\boxed{12.4 \text{ J}}$.

**Reflection:** This example highlights how friction does negative work, removing energy from the system. The net positive work done by the applied force minus friction results in an increase in the block's kinetic energy.

---

### Example 2: Block Sliding Down an Incline with Friction (Medium)

**Problem:** A 5.0 kg block starts from rest at the top of a 3.0 m long ramp inclined at $30^\circ$ to the horizontal. The coefficient of kinetic friction between the block and the ramp is 0.20. What is the speed of the block when it reaches the bottom of the ramp?

**Given:**
*   Mass of block, $m = 5.0 \text{ kg}$
*   Initial velocity, $v_i = 0 \text{ m/s}$ (starts from rest)
*   Length of ramp, $L = 3.0 \text{ m}$
*   Angle of inclination, $\theta = 30^\circ$
*   Coefficient of kinetic friction, $\mu_k = 0.20$

**Want:**
*   Final speed of the block, $v_f$

**Solution:**

**Step 1: Draw a Free-Body Diagram and define coordinate system.**
Choose x-axis parallel to the ramp (downwards), y-axis perpendicular to the ramp (upwards).
Forces:
*   Gravity ($mg$) vertically downwards. Resolve into components: $mg \sin\theta$ down the ramp, $mg \cos\theta$ perpendicular into the ramp.
*   Normal force ($N$) perpendicular to the ramp, upwards.
*   Kinetic friction ($f_k$) up the ramp (opposing motion).

**Step 2: Calculate the vertical height of the ramp ($h$).**
The vertical height is related to the length of the ramp by trigonometry:
$$ h = L \sin\theta $$
$$ h = (3.0 \text{ m}) \sin(30^\circ) $$
$$ h = (3.0 \text{ m})(0.5) $$
$$ h = 1.5 \text{ m} $$
*   This height is needed for gravitational potential energy calculations.

**Step 3: Calculate the normal force ($N$).**
In the y-direction (perpendicular to the ramp), there is no acceleration.
$$ \sum F_y = 0 $$
$$ N - mg \cos\theta = 0 $$
$$ N = mg \cos\theta $$
$$ N = (5.0 \text{ kg})(9.8 \text{ m/s}^2) \cos(30^\circ) $$
$$ N = (49 \text{ N})(0.866) $$
$$ N = 42.434 \text{ N} $$
*   Notice that $N$ is not equal to $mg$ because of the incline.

**Step 4: Calculate the kinetic friction force ($f_k$).**
$$ f_k = \mu_k N $$
$$ f_k = (0.20)(42.434 \text{ N}) $$
$$ f_k = 8.487 \text{ N} $$
*   This force acts up the ramp, opposite to the block's displacement.

**Step 5: Apply the Work-Energy Theorem with non-conservative forces.**
The relevant equation is $W_{NC} = \Delta E_{mech} = (K_f + U_f) - (K_i + U_i)$.
Here, the non-conservative force is friction.
*   $W_{NC} = W_f = -f_k L$ (friction acts opposite to displacement $L$).
*   $K_i = \frac{1}{2}mv_i^2 = 0$ (starts from rest).
*   $U_i = mgh$ (gravitational potential energy at the top, relative to the bottom).
*   $K_f = \frac{1}{2}mv_f^2$ (kinetic energy at the bottom).
*   $U_f = 0$ (gravitational potential energy at the bottom, our reference point).

Substitute these into the Work-Energy Theorem:
$$ -f_k L = \left(\frac{1}{2}mv_f^2 + 0\right) - (0 + mgh) $$
$$ -f_k L = \frac{1}{2}mv_f^2 - mgh $$
*   This equation shows that the work done by friction reduces the final kinetic energy compared to a frictionless case.

**Step 6: Solve for $v_f$.**
Rearrange the equation to solve for $v_f^2$:
$$ \frac{1}{2}mv_f^2 = mgh - f_k L $$
$$ v_f^2 = \frac{2(mgh - f_k L)}{m} $$
$$ v_f^2 = 2gh - \frac{2f_k L}{m} $$
Now plug in the values:
$$ v_f^2 = 2(9.8 \text{ m/s}^2)(1.5 \text{ m}) - \frac{2(8.487 \text{ N})(3.0 \text{ m})}{5.0 \text{ kg}} $$
$$ v_f^2 = 29.4 \text{ m}^2/\text{s}^2 - \frac{50.922 \text{ J}}{5.0 \text{ kg}} $$
$$ v_f^2 = 29.4 \text{ m}^2/\text{s}^2 - 10.1844 \text{ m}^2/\text{s}^2 $$
$$ v_f^2 = 19.2156 \text{ m}^2/\text{s}^2 $$
$$ v_f = \sqrt{19.2156 \text{ m}^2/\text{s}^2} $$
$$ v_f = 4.3835 \text{ m/s} $$

**Final Answer:**
The speed of the block at the bottom of the ramp is $\boxed{4.38 \text{ m/s}}$.

**Reflection:** This problem demonstrates how to use the extended Work-Energy Theorem when both potential energy changes and non-conservative work (friction) are present. It's crucial to correctly calculate the normal force on an incline and remember that friction's work is negative. If friction were zero, $v_f = \sqrt{2gh} = \sqrt{2 \times 9.8 \times 1.5} = \sqrt{29.4} \approx 5.42 \text{ m/s}$, which is indeed faster.

---

### Example 3: Terminal Velocity with Air Drag (Harder)

**Problem:** A skydiver with a mass of 70 kg jumps from an airplane. Assuming their effective cross-sectional area is $0.80 \text{ m}^2$ and the drag coefficient is $C = 1.0$, what is their terminal velocity? (Density of air $\rho = 1.225 \text{ kg/m}^3$). What is the work done by air drag if the skydiver falls 1000 m after reaching terminal velocity?

**Given:**
*   Mass of skydiver, $m = 70 \text{ kg}$
*   Cross-sectional area, $A = 0.80 \text{ m}^2$
*   Drag coefficient, $C = 1.0$
*   Density of air, $\rho = 1.225 \text{ kg/m}^3$
*   Distance fallen at terminal velocity, $d = 1000 \text{ m}$

**Want:**
*   Terminal velocity, $v_T$
*   Work done by air drag, $W_D$

**Solution:**

**Part 1: Calculate Terminal Velocity**

**Step 1: Understand terminal velocity.**
Terminal velocity is reached when the downward force of gravity is balanced by the upward force of air drag, resulting in zero net acceleration ($\sum F = 0$).

**Step 2: Set up the force balance equation.**
$$ \sum F_y = 0 $$
$$ F_D - mg = 0 $$
$$ F_D = mg $$
*   At terminal velocity, the drag force perfectly counteracts gravity.

**Step 3: Substitute the formula for air drag and solve for $v_T$.**
$$ \frac{1}{2} C \rho A v_T^2 = mg $$
$$ v_T^2 = \frac{2mg}{C \rho A} $$
$$ v_T = \sqrt{\frac{2mg}{C \rho A}} $$
*   Rearrange the drag equation to isolate $v_T$.

**Step 4: Plug in the values.**
$$ v_T = \sqrt{\frac{2(70 \text{ kg})(9.8 \text{ m/s}^2)}{(1.0)(1.225 \text{ kg/m}^3)(0.80 \text{ m}^2)}} $$
$$ v_T = \sqrt{\frac{1372 \text{ N}}{0.98 \text{ kg/m}}} $$
$$ v_T = \sqrt{1400 \text{ m}^2/\text{s}^2} $$
$$ v_T = 37.416 \text{ m/s} $$

**Final Answer (Part 1):**
The terminal velocity of the skydiver is $\boxed{37.4 \text{ m/s}}$.

**Part 2: Calculate Work Done by Air Drag**

**Step 5: Determine the drag force at terminal velocity.**
At terminal velocity, $F_D = mg$.
$$ F_D = (70 \text{ kg})(9.8 \text{ m/s}^2) $$
$$ F_D = 686 \text{ N} $$
*   Since the skydiver is at terminal velocity, the drag force is constant and equal to their weight.

**Step 6: Calculate the work done by air drag ($W_D$).**
The drag force acts opposite to the displacement (downwards). So, the angle is $180^\circ$.
$$ W_D = F_D d \cos(180^\circ) $$
$$ W_D = (686 \text{ N})(1000 \text{ m})(-1) $$
$$ W_D = -686,000 \text{ J} $$
$$ W_D = -686 \text{ kJ} $$
*   The work done by drag is negative, indicating energy removal from the system.

**Final Answer (Part 2):**
The work done by air drag is $\boxed{-686 \text{ kJ}}$.

**Reflection:** This example demonstrates the concept of terminal velocity, where drag becomes a constant force. It's important to remember that at terminal velocity, kinetic energy is constant, so the work done by gravity is entirely offset by the work done by drag, with both converting to thermal energy.

---

### Example 4: Car Braking (Challenging)

**Problem:** A 1500 kg car is traveling at 25 m/s (approx. 56 mph) when the driver slams on the brakes. The coefficient of kinetic friction between the tires and the road is 0.70. What is the minimum stopping distance? Assume the car is on a level road.

**Given:**
*   Mass of car, $m = 1500 \text{ kg}$
*   Initial speed, $v_i = 25 \text{ m/s}$
*   Final speed, $v_f = 0 \text{ m/s}$ (comes to a stop)
*   Coefficient of kinetic friction, $\mu_k = 0.70$

**Want:**
*   Stopping distance, $d$

**Solution:**

**Step 1: Identify the forces and apply the Work-Energy Theorem.**
The only force doing work to stop the car is kinetic friction. Gravity and normal force are perpendicular to displacement (or balance each other if there's no vertical motion).
We can use the Work-Energy Theorem: $W_{NC} = \Delta K$.
Here, $W_{NC}$ is the work done by friction, $W_f$.
$$ W_f = K_f - K_i $$
*   This approach is powerful because it directly relates the work done by friction to the change in the car's kinetic energy.

**Step 2: Calculate the initial and final kinetic energies.**
$$ K_i = \frac{1}{2}mv_i^2 $$
$$ K_i = \frac{1}{2}(1500 \text{ kg})(25 \text{ m/s})^2 $$
$$ K_i = \frac{1}{2}(1500 \text{ kg})(625 \text{ m}^2/\text{s}^2) $$
$$ K_i = 468,750 \text{ J} $$
$$ K_f = \frac{1}{2}mv_f^2 = \frac{1}{2}(1500 \text{ kg})(0 \text{ m/s})^2 = 0 \text{ J} $$
*   The car starts with a significant amount of kinetic energy and ends with none.

**Step 3: Calculate the normal force ($N$).**
Since the car is on a level road, the normal force balances gravity.
$$ N = mg $$
$$ N = (1500 \text{ kg})(9.8 \text{ m/s}^2) $$
$$ N = 14,700 \text{ N} $$
*   The normal force is crucial for determining the friction force.

**Step 4: Calculate the kinetic friction force ($f_k$).**
$$ f_k = \mu_k N $$
$$ f_k = (0.70)(14,700 \text{ N}) $$
$$ f_k = 10,290 \text{ N} $$
*   This is the constant braking force resisting the car's motion.

**Step 5: Express the work done by friction in terms of stopping distance ($d$).**
Friction acts opposite to the displacement.
$$ W_f = -f_k d $$
*   The negative sign is critical as friction removes energy.

**Step 6: Substitute into the Work-Energy Theorem and solve for $d$.**
$$ -f_k d = K_f - K_i $$
$$ -f_k d = 0 - K_i $$
$$ -f_k d = -K_i $$
$$ d = \frac{K_i}{f_k} $$
*   The negative signs cancel, as expected for a positive distance.

**Step 7: Plug in the calculated values.**
$$ d = \frac{468,750 \text{ J}}{10,290 \text{ N}} $$
$$ d = 45.55 \text{ m} $$

**Final Answer:**
The minimum stopping distance is $\boxed{45.6 \text{ m}}$.

**Reflection:** This problem is a classic application of the Work-Energy Theorem. It's "challenging" because it requires synthesizing multiple steps and understanding that friction does all the work to remove the car's kinetic energy. Notice how the mass of the car cancels out if you express $K_i$ as $\frac{1}{2}mv_i^2$ and $f_k$ as $\mu_k mg$, leading to $d = \frac{v_i^2}{2\mu_k g}$. This shows that stopping distance is independent of mass for a given $\mu_k$ and $v_i$, a common insight.

## 6. Common mistakes and traps

1.  **Confusing Static and Kinetic Friction:** Students often use the kinetic friction formula ($f_k = \mu_k N$) when static friction ($f_s \le \mu_s N$) should be considered, or vice-versa. Remember, work is only done by kinetic friction when there is actual sliding motion.
2.  **Incorrect Sign for Work Done by Friction/Drag:** Friction and drag always oppose motion, meaning the force vector is opposite to the displacement vector. Therefore, the work done by these forces is *always negative*, indicating a removal of mechanical energy from the system. Forgetting the negative sign will lead to incorrect energy balances.
3.  **Assuming Normal Force is Always $mg$:** The normal force ($N$) is only equal to $mg$ on a flat, horizontal surface with no other vertical forces. On inclined planes, $N = mg \cos\theta$. If there are additional vertical pushes or pulls, $N$ will change accordingly. Incorrectly calculating $N$ leads to an incorrect friction force.
4.  **Assuming Mechanical Energy is Always Conserved:** This is the most fundamental trap. The entire point of non-conservative forces is that they *break* the conservation of mechanical energy. Always check if friction, drag, or other non-conservative forces are present before applying $K_i + U_i = K_f + U_f$. Instead, use $W_{NC} = \Delta E_{mech}$.
5.  **Ignoring Velocity Dependence of Air Drag:** For many real-world scenarios, air drag is proportional to $v^2$. Treating it as a constant force (like friction often is over a short distance) when speed changes significantly will lead to inaccurate results. The work done by drag is often an integral.
6.  **Thinking Energy is Destroyed:** When mechanical energy is "lost" due to non-conservative forces, it is not destroyed. It is transformed into other forms, primarily thermal energy (heat), sound, or deformation. The total energy of the universe is always conserved (First Law of Thermodynamics).

## 7. Textbook-precise explanation

In a rigorous physics context, forces are categorized based on the path dependence of the work they perform.

A **conservative force** is a force for which the work done in moving a particle between two points is independent of the path taken. Equivalently, the work done by a conservative force around any closed loop is zero. For such forces, a potential energy function $U$ can be defined, such that the work done by the conservative force $W_C$ is given by $W_C = -\Delta U = U_i - U_f$. Examples include gravitational force and the ideal spring force.

A **non-conservative force**, conversely, is a force for which the work done in moving a particle between two points *does* depend on the path taken. Consequently, the work done by a non-conservative force around a closed loop is generally non-zero. These forces typically dissipate mechanical energy from a system, converting it into other forms, primarily internal (thermal) energy. Examples include kinetic friction, air drag (fluid resistance), and tension in an inelastic rope.

The **Generalized Work-Energy Theorem** states that the total work done on a particle by all forces (conservative and non-conservative) equals the change in its kinetic energy:
$$ W_{total} = W_C + W_{NC} = \Delta K $$
Substituting $W_C = -\Delta U$, we obtain:
$$ -\Delta U + W_{NC} = \Delta K $$
Rearranging this yields the fundamental relationship for systems experiencing non-conservative forces:
$$ W_{NC} = \Delta K + \Delta U $$
Since the change in total mechanical energy is defined as $\Delta E_{mech} = \Delta K + \Delta U$, this equation can be written as:
$$ W_{NC} = \Delta E_{mech} = E_{mech, f} - E_{mech, i} $$
Here, $E_{mech} = K + U$ represents the total mechanical energy of the system.
When non-conservative forces like friction or air drag act on a system, they typically do negative work ($W_{NC} < 0$), leading to a decrease in the system's total mechanical energy ($\Delta E_{mech} < 0$). This "lost" mechanical energy is not destroyed but is transformed into other forms, most commonly an increase in the internal energy (thermal energy) of the system and its surroundings, in accordance with the First Law of Thermodynamics.

For instance, **kinetic friction** ($f_k$) is a force that opposes the relative motion between two surfaces in contact. Its magnitude is given by $f_k = \mu_k N$, where $\mu_k$ is the coefficient of kinetic friction and $N$ is the normal force. The work done by kinetic friction over a displacement $d$ is $W_f = -f_k d$, assuming constant friction and displacement in the direction of motion.

**Air drag** (or fluid resistance) is a resistive force exerted by a fluid (like air or water) on an object moving through it. For objects at moderate to high speeds, the magnitude of the drag force ($F_D$) is often approximated by:
$$ F_D = \frac{1}{2} C \rho A v^2 $$
where $C$ is the dimensionless drag coefficient, $\rho$ is the fluid density, $A$ is the cross-sectional area perpendicular to the flow, and $v$ is the object's speed relative to the fluid. The work done by air drag is generally $W_D = \int \vec{F}_D \cdot d\vec{r}$, which is negative as $F_D$ opposes motion.

(Refer to "Physics for Scientists and Engineers" by Serway & Jewett, Chapter 7, or "Fundamentals of Physics" by Halliday, Resnick, & Walker, Chapter 8, for further details.)

## 8. ASCII diagrams

Here are a couple of ASCII diagrams to illustrate the forces involved with friction and air drag.

### Diagram 1: Block on an Inclined Plane with Friction

```text
       ^ Normal Force (N)
       |
       |
       |
       +------------------
      /| \
     / |  \  Friction (fk) (up the ramp)
    /  |   \
   /   |    \
  /    |     \
 /     |      \
+------+-------+ Block (mass m)
 \     | mg sin(theta) (down the ramp)
  \    |
   \   | mg cos(theta) (into the ramp)
    \  |
     \ |
      \|
       V Gravity (mg) (vertically down)

     ------------------------------------
           /  /  /  /  /  /  /  /  /  /
          ------------------------------------
          Ramp surface (angle theta with horizontal)

Description: A block on an inclined plane. The gravitational force (mg) is resolved into two components: one perpendicular to the ramp (mg cos(theta)) which is balanced by the normal force (N), and one parallel to the ramp (mg sin(theta)) which tends to pull the block down. The kinetic friction force (fk) acts up the ramp, opposing the motion.
```

### Diagram 2: Falling Object with Air Drag

```text
           ^ Air Drag (FD)
           |
           |
           |
           O  (Object falling)
           |
           |
           |
           V Gravity (mg)

Description: An object falling through the air. The gravitational force (mg) pulls it downwards. The air drag force (FD) acts upwards, opposing the downward motion. As the object speeds up, FD increases until it balances mg, at which point the object reaches terminal velocity.
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **"NON-CONSERVATIVE FORCES are ENERGY THIEVES!"** Visualize a mischievous little imp (friction or drag) constantly picking pockets or siphoning off energy from a perfectly balanced scale. It doesn't destroy the energy, it just converts it into something less useful, like heat, making the system "lose" its mechanical energy.
    *   **Path Dependence:** Imagine trying to walk across a room blindfolded. If the room is empty (conservative), you'll use the same energy to get from A to B regardless of how you wander. But if the room is full of sticky goo (non-conservative), a winding path will exhaust you much more than a straight one. The goo (friction/drag) makes the path matter.

2.  **Formulas/Facts to Overlearn:**
    *   **The Big One:** $W_{NC} = \Delta E_{mech} = (K_f + U_f) - (K_i + U_i)$
        *   This is the core equation that tells you how non-conservative forces affect mechanical energy.
    *   **Kinetic Friction:** $f_k = \mu_k N$ and $W_f = -f_k d$
        *   Magnitude and work done by friction. Remember the negative sign for work!
    *   **Air Drag (High Speed):** $F_D = \frac{1}{2} C \rho A v^2$
        *   The key factors affecting drag and its quadratic dependence on velocity.

3.  **Spaced-Repetition Schedule:**
    *   **1 Day:** Review this entire lesson. Try to explain the concepts in your own words without looking.
    *   **3 Days:** Rework the examples. Try to solve them from scratch.
    *   **7 Days:** Create your own simple problems involving friction and drag, and solve them.
    *   **16 Days:** Attempt more complex problems from a textbook or online resources. Focus on multi-step problems that combine conservative and non-conservative forces.
    *   **35 Days:** Re-explain the core ideas and derivations to someone else (or an imaginary audience). This active recall solidifies understanding.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the Work-Energy Theorem with non-conservative forces, you can rebuild it from Newton's Second Law:
    *   **Start with Newton's Second Law:** $\vec{F}_{net} = m\vec{a}$
    *   **Break down $\vec{F}_{net}$:** $\vec{F}_{net} = \vec{F}_C + \vec{F}_{NC}$ (sum of conservative and non-conservative forces)
    *   **Consider Work:** Work is $W = \int \vec{F} \cdot d\vec{r}$. So, $W_{total} = \int \vec{F}_{net} \cdot d\vec{r}$.
    *   **Relate Work to Kinetic Energy:** Recall that $W_{total} = \Delta K$. (This can be derived from $F=ma$, $a=dv/dt$, and $dr=v dt$, leading to $\int F dr = \int m (dv/dt) v dt = \int m v dv = \frac{1}{2}mv^2|_i^f = \Delta K$).
    *   **Combine:** $W_C + W_{NC} = \Delta K$.
    *   **Introduce Potential Energy:** Remember that for conservative forces, $W_C = -\Delta U$.
    *   **Substitute:** $-\Delta U + W_{NC} = \Delta K$.
    *   **Rearrange:** $W_{NC} = \Delta K + \Delta U = \Delta E_{mech}$.
    This pathway shows how the work-energy theorem is not just a formula, but a direct consequence of Newton's laws and the definitions of work and energy.

## 10. Connections — what this leads to

Understanding non-conservative forces is not an isolated topic; it's a gateway to deeper and more complex areas of physics and engineering:

*   **Thermodynamics:** The "lost" mechanical energy due to friction and drag is primarily converted into thermal energy. This directly connects to the First Law of Thermodynamics (conservation of energy) and the concept of entropy (the tendency for energy to disperse into less useful forms). This is crucial for understanding engine efficiency, heat engines, and refrigerators.
*   **Fluid Dynamics & Aerodynamics:** Air drag is a core concept in fluid dynamics. This lesson provides a basic model, but advanced studies delve into boundary layers, turbulence, compressible flow (supersonic/hypersonic drag), and computational fluid dynamics (CFD) for precise drag prediction in aerospace engineering.
*   **Heat Transfer:** The generation of heat due to friction (e.g., brakes, bearings) or drag (e.g., atmospheric re-entry) leads directly into the study of heat transfer mechanisms (conduction, convection, radiation). This is vital for designing thermal management systems in everything from electronics to spacecraft.
*   **Materials Science & Tribology:** Friction causes wear and tear on materials. The study of friction, lubrication, and wear is called tribology, a specialized field in materials science and mechanical engineering, essential for designing durable and efficient machines.
*   **Rocket Propulsion & Orbital Mechanics:** While rocket thrust *adds* mechanical energy (a non-conservative force), understanding drag is critical for launch trajectories (minimizing fuel consumption against drag) and re-entry (controlled deceleration and thermal management). Orbital mechanics, while often simplified to conservative forces, needs to account for tiny atmospheric drag effects on satellites in low Earth orbit.
*   **Control Systems & Damping:** Non-conservative forces like friction and drag provide damping, which is essential for stabilizing systems. For example, shock absorbers in cars use fluid resistance to dissipate energy and prevent excessive bouncing. Understanding these forces is key to designing stable and responsive control systems.
*   **Biomechanics & Sports Science:** Analyzing human movement, optimizing athletic performance, and designing sports equipment (e.g., aerodynamic cycling helmets, low-friction swimsuits) heavily rely on understanding and manipulating friction and drag.

## 11. Self-check questions

1.  A box is pushed across a horizontal floor. Initially, the box is at rest. It is pushed with a constant force of 20 N for 5 meters, and then the force is removed. The box slides for another 2 meters before coming to a stop. If the mass of the box is 4 kg, what is the coefficient of kinetic friction between the box and the floor?
2.  A 0.5 kg ball is dropped from a height of 10 m. It hits the ground and loses 30% of its mechanical energy due to air drag and inelastic collision with the ground. To what maximum height will the ball rebound?
3.  A car drives at a constant speed of 30 m/s on a level road. The engine provides 25 kW of power to maintain this speed. Assuming all engine power is used to overcome resistive forces, calculate the total resistive force (friction and air drag combined) acting on the car.
4.  A 100 kg space capsule re-enters Earth's atmosphere at an initial speed of 7000 m/s at an altitude where air density is constant. If the average drag coefficient is 1.5 and the effective cross-sectional area is $5.0 \text{ m}^2$, and the capsule slows down to 5000 m/s over a distance of 100 km, estimate the average air density over that segment of its trajectory. (Assume gravity's effect on speed is negligible over this short distance due to high speeds).
5.  A block of mass $m$ is released from rest at the top of a frictionless ramp of height $h$. It then slides horizontally across a rough surface with coefficient of kinetic friction $\mu_k$ for a distance $d$ before hitting a spring with spring constant $k$. The spring is compressed by a distance $x$ before the block momentarily stops. Derive an expression for the compression distance $x$ in terms of $m, g, h, \mu_k, d,$ and $k$.