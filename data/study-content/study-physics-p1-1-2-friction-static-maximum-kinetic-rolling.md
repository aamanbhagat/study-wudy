## 1. What it is — in plain English

Imagine you're trying to push a heavy box across the floor. You push a little, and nothing happens. You push harder, still nothing. Then, with a final big push, it suddenly slides! What was stopping it? That's friction.

Friction is simply a force that resists motion, or the *tendency* of motion, between two surfaces that are touching. When you try to slide one surface over another, friction acts in the opposite direction of that sliding motion (or intended motion). It's like an invisible "sticky" force that wants to keep things from moving or slow them down once they start.

Think about walking. Every step you take relies on friction between your shoes and the ground. Without it, you'd just slip and slide, like walking on ice! Similarly, when you brake a bicycle, friction between the brake pads and the wheel rim, and then between the tires and the road, is what brings you to a stop.

It's a contact force, meaning it only exists when two objects are physically touching. The "roughness" of the surfaces plays a big role – rougher surfaces generally have more friction than smooth ones. But it's more complex than just visible roughness; even seemingly smooth surfaces have microscopic bumps and valleys that interlock and resist sliding.

## 2. Why it matters — real-world applications

Friction is a fundamental force that impacts nearly every aspect of our physical world and engineering endeavors, often in critical ways.

1.  **Automotive and Aerospace Traction/Braking:** For a car to accelerate, the tires must push backward on the road, and the road pushes forward on the tires via static friction. This is the thrust that moves the car. Similarly, braking relies on kinetic friction between brake pads and rotors, and then static friction between tires and the road to slow the vehicle. In aerospace, this is crucial for aircraft landing gear, where friction helps slow down the plane on the runway. For rockets, while thrust is primarily from exhaust gases, the design of launch platforms and transport systems still involves friction.
2.  **Robotics and Manufacturing:** In robotics, precise control of movement often means understanding and compensating for friction in joints and actuators. For example, a robotic arm picking up a delicate object needs to apply just enough grip (friction) to hold it without crushing it. In manufacturing, friction is a double-edged sword: it's essential for processes like sanding, grinding, or using conveyor belts, but it also causes wear and tear on machinery, leading to energy loss and the need for lubrication and maintenance.
3.  **Everyday Life and Sports:** From the simple act of walking (static friction between shoes and ground) to holding a pen (static friction between fingers and pen), friction is indispensable. In sports, it's meticulously engineered: specialized shoe treads for basketball or rock climbing, textured grips on tennis rackets, or the precisely controlled friction between a bowling ball and the lane. Without friction, nothing would stay put, and nothing could be moved intentionally.

## 3. Prerequisites — what you must know first

Before diving deep into friction, ensure you have a solid grasp of these foundational concepts:

*   **Force:** A push or a pull, capable of causing a change in an object's motion. It is a vector quantity, possessing both magnitude and direction.
*   **Newton's Laws of Motion:**
    *   **First Law (Inertia):** An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.
    *   **Second Law ($F=ma$):** The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. The direction of the acceleration is in the direction of the net force.
    *   **Third Law (Action-Reaction):** For every action, there is an equal and opposite reaction.
*   **Free-Body Diagrams (FBDs):** A diagram showing all the forces acting *on* a single object, represented as vectors originating from the object's center of mass.
*   **Normal Force ($N$ or $F_N$):** The component of a contact force perpendicular to the surface that an object rests on or pushes against. It's the force that prevents objects from passing through surfaces.
*   **Vector Components and Resolution:** The ability to break down a vector (like a force) into its perpendicular components (e.g., x and y components) and to recombine components into a resultant vector.
*   **Net Force:** The vector sum of all forces acting on an object.

## 4. The core idea — step by step

Let's break down friction into its fundamental types and behaviors.

### Step 1: Friction as a Contact Force Opposing Relative Motion

*   **Plain English:** Whenever two surfaces touch, and there's an attempt to slide them past each other, a force called friction naturally arises. This force always tries to prevent or resist that sliding. It's a fundamental property of surfaces in contact.
*   **Concrete Example:** Place your hand flat on a table. Now, try to slide it forward. You feel a resistance pushing *backward* on your hand. That's friction. If you push your hand down harder onto the table (increasing the normal force), you'll notice it's harder to slide, meaning the friction force is stronger.
*   **Formal/Mathematical Version:** Friction is a contact force that acts parallel to the surfaces in contact, opposing the direction of relative motion or impending relative motion. We denote friction with $f$ or $F_f$. The direction is always crucial.
*   **What Could Go Wrong:** Confusing friction with the normal force. Normal force is perpendicular to the surface, while friction is parallel to the surface. They are both components of the total contact force between two surfaces, but they act in orthogonal directions.

### Step 2: Static Friction ($f_s$) — The "Holding Back" Force

*   **Plain English:** Static friction is the force that prevents an object from moving when you first try to push or pull it. It's a "self-adjusting" force. If you push a little, static friction pushes back a little. If you push harder, static friction pushes back harder, matching your effort, up to a certain limit. As long as the object isn't moving, the static friction force is exactly equal in magnitude and opposite in direction to the applied force component parallel to the surface.
*   **Concrete Example:** You try to push a heavy refrigerator. You apply a small force, say 10 N, but the fridge doesn't move. This means the static friction force acting on the fridge is also 10 N, opposing your push. If you push with 20 N and it still doesn't move, static friction has increased to 20 N. It "adapts" to match your applied force.
*   **Formal/Mathematical Version:** When an object is at rest and an external force $F_{app}$ is applied parallel to the surface, the static friction force $f_s$ acts to oppose this applied force.
    $$f_s = F_{app} \quad (\text{as long as the object remains at rest})$$
    This is true as long as $F_{app}$ does not exceed the maximum possible static friction.
*   **What Could Go Wrong:** Assuming static friction is always at its maximum value. This is a very common mistake. Static friction only exerts *as much force as needed* to prevent motion, up to its maximum.

### Step 3: Maximum Static Friction ($f_{s,max}$) — The Breaking Point

*   **Plain English:** Every pair of surfaces has a limit to how much static friction they can provide. This is the "breaking point." If you push an object with a force greater than this maximum static friction, the object will start to move. This maximum value depends on how "sticky" the surfaces are (represented by a coefficient) and how hard they are pressed together (the normal force).
*   **Concrete Example:** Continuing with the refrigerator. You push with 10 N (no movement, $f_s = 10$ N). You push with 20 N (no movement, $f_s = 20$ N). You push with 30 N, and the fridge *just barely* starts to slide. This means the maximum static friction for that fridge on that floor is approximately 30 N. Any force greater than 30 N will cause it to accelerate.
*   **Formal/Mathematical Version:** The maximum static friction force is directly proportional to the magnitude of the normal force $N$ pressing the two surfaces together. The constant of proportionality is called the coefficient of static friction, $\mu_s$.
    $$f_{s,max} = \mu_s N$$
    Therefore, for an object to remain at rest, the applied force $F_{app}$ must satisfy:
    $$F_{app} \le \mu_s N$$
    If $F_{app} > \mu_s N$, the object will accelerate.
*   **What Could Go Wrong:** Mixing up $\mu_s$ (coefficient of static friction) with $\mu_k$ (coefficient of kinetic friction). They are different values, and $\mu_s$ is almost always greater than $\mu_k$.

### Step 4: Kinetic Friction ($f_k$) — The "Sliding" Friction

*   **Plain English:** Once an object starts moving and is sliding across a surface, the friction force changes. This new force is called kinetic friction (or dynamic friction). It's generally *less* than the maximum static friction, which is why it often feels easier to keep something moving once you've started it than it was to initially get it going. Unlike static friction, kinetic friction is usually considered constant for a given pair of surfaces and normal force, regardless of how fast the object is sliding (within reasonable speeds).
*   **Concrete Example:** You pushed the refrigerator with 30 N to get it moving. Now that it's sliding, you might only need to push with, say, 25 N to keep it moving at a constant velocity. This 25 N is the kinetic friction force. If you push with more than 25 N, it will accelerate; if you push with less, it will slow down.
*   **Formal/Mathematical Version:** The kinetic friction force $f_k$ is also directly proportional to the magnitude of the normal force $N$. The constant of proportionality here is the coefficient of kinetic friction, $\mu_k$.
    $$f_k = \mu_k N$$
    This force acts opposite to the direction of motion.
*   **What Could Go Wrong:** Using the coefficient of static friction ($\mu_s$) when the object is already in motion. Always use $\mu_k$ for sliding objects. Also, assuming $f_k$ varies with speed; for most introductory physics, it's treated as constant.

### Step 5: Rolling Friction ($f_r$) — The "Wheel" Friction

*   **Plain English:** Rolling friction is the resistance that occurs when a round object (like a wheel or ball) rolls over a surface. It's generally much, much smaller than kinetic friction. This is why wheels are so useful – they convert sliding motion into rolling motion to drastically reduce friction and make movement much easier. It arises from the slight deformation of the rolling object and the surface it rolls on, creating a small "bump" that the object constantly has to roll over.
*   **Concrete Example:** Think about moving a heavy cart with wheels versus dragging the same cart without wheels. The wheeled cart is vastly easier to move because rolling friction is minimal compared to sliding friction. A car's tires experience rolling friction when moving normally; if the car skids, it's kinetic friction, which is much higher.
*   **Formal/Mathematical Version:** Rolling friction is often modeled as a force $f_r$ proportional to the normal force, similar to kinetic friction, but with a much smaller coefficient of rolling friction, $\mu_r$.
    $$f_r = \mu_r N$$
    However, sometimes it's described as a rolling resistance moment or a force proportional to the normal force and inversely proportional to the radius of the wheel, often called the "coefficient of rolling resistance" which has units of length. For our purposes, the $\mu_r N$ model is a good starting point to understand its behavior.
    Typically, $\mu_r \ll \mu_k \ll \mu_s$.
*   **What Could Go Wrong:** Confusing rolling friction with kinetic friction. While both are associated with motion, rolling friction is specific to rolling objects and is significantly smaller.

### Step 6: Factors Affecting Friction (and what doesn't)

*   **Plain English:** The amount of friction primarily depends on two things: the types of surfaces in contact (how "rough" or "sticky" they are) and how hard they are pressed together (the normal force). Surprisingly, the *area* of contact between the surfaces does *not* significantly affect the friction force, as long as the normal force remains the same.
*   **Concrete Example:**
    *   **Surface Types:** Sliding a wooden block on sandpaper will have much more friction than sliding the same block on a polished wooden floor. This is due to different coefficients of friction.
    *   **Normal Force:** Pushing down harder on a book while trying to slide it across a table increases the normal force, which in turn increases the friction, making it harder to slide.
    *   **Contact Area (Doesn't Affect):** If you slide a brick on its wide face versus sliding it on its narrow end, the friction force will be approximately the same, assuming the brick's weight (and thus the normal force) is unchanged. While the pressure changes, the actual microscopic contact points remain roughly the same total area, and the formula $\mu N$ accounts for this.
*   **Formal/Mathematical Version:** The coefficients of friction ($\mu_s, \mu_k, \mu_r$) are empirical values that characterize the interaction between two specific surfaces. They are dimensionless. The normal force $N$ is the other key factor. The independence of friction from contact area is an empirical observation that holds true over a wide range of conditions for solid surfaces.
*   **What Could Go Wrong:** Believing that a larger contact area means more friction. This is a very common misconception. While it might seem intuitive, the models of friction show that it's the normal force, not the area, that matters.

## 5. Worked examples — multiple, with every step shown

### Example 1: Starting and Maintaining Motion on a Horizontal Surface

**Problem Statement:** A 10 kg block rests on a horizontal floor. The coefficient of static friction between the block and the floor is $\mu_s = 0.5$, and the coefficient of kinetic friction is $\mu_k = 0.3$.
a) What is the minimum horizontal force required to *start* the block moving?
b) What horizontal force is required to keep the block moving at a *constant velocity*?
c) If a horizontal force of 60 N is applied, what is the acceleration of the block?

**Given:**
*   Mass of block, $m = 10 \text{ kg}$
*   Coefficient of static friction, $\mu_s = 0.5$
*   Coefficient of kinetic friction, $\mu_k = 0.3$
*   Acceleration due to gravity, $g = 9.8 \text{ m/s}^2$

**What we want:**
a) Minimum force to start moving ($F_{app,min}$)
b) Force to keep moving at constant velocity ($F_{app,const}$)
c) Acceleration ($a$) when $F_{app} = 60 \text{ N}$

---

**Part a) Minimum force to start the block moving**

1.  **Draw a Free-Body Diagram (FBD):**
    ```text
          ^ N
          |
    <-----|-----> F_app
     f_s  |
          v mg
    ```
    *   $mg$ (weight) acts downwards.
    *   $N$ (normal force) acts upwards.
    *   $F_{app}$ (applied force) acts horizontally to the right.
    *   $f_s$ (static friction) acts horizontally to the left, opposing $F_{app}$.

2.  **Apply Newton's 2nd Law in the vertical direction:** The block is not accelerating vertically, so the net vertical force is zero.
    $$\Sigma F_y = N - mg = 0$$
    $$N = mg$$
    *This step calculates the normal force, which is essential for determining friction.*

3.  **Calculate the normal force:**
    $$N = (10 \text{ kg})(9.8 \text{ m/s}^2)$$
    $$N = 98 \text{ N}$$
    *The normal force is equal to the weight because the surface is horizontal and there are no other vertical forces.*

4.  **Calculate the maximum static friction:** To *start* the block moving, the applied force must overcome the maximum static friction.
    $$f_{s,max} = \mu_s N$$
    *This is the formula for the maximum static friction, the "breaking point."*

5.  **Substitute values and calculate $f_{s,max}$:**
    $$f_{s,max} = (0.5)(98 \text{ N})$$
    $$f_{s,max} = 49 \text{ N}$$
    *This is the maximum force the static friction can provide.*

6.  **Determine the minimum applied force:** The minimum horizontal force required to start the block moving is equal to the maximum static friction.
    $$F_{app,min} = f_{s,max}$$
    $$F_{app,min} = 49 \text{ N}$$
    *If the applied force is less than this, the block won't move. If it's exactly this, it's on the verge of moving.*

    **Answer a) The minimum horizontal force required to start the block moving is $\boxed{49 \text{ N}}$.**

---

**Part b) Force required to keep the block moving at a constant velocity**

1.  **Draw a Free-Body Diagram (FBD):** (Similar to Part a, but now we have kinetic friction $f_k$)
    ```text
          ^ N
          |
    <-----|-----> F_app
     f_k  |
          v mg
    ```
    *   $mg$ (weight) acts downwards.
    *   $N$ (normal force) acts upwards.
    *   $F_{app}$ (applied force) acts horizontally to the right.
    *   $f_k$ (kinetic friction) acts horizontally to the left, opposing $F_{app}$.

2.  **Apply Newton's 2nd Law in the vertical direction:** The normal force is still $N = 98 \text{ N}$ (from Part a), as the vertical forces are unchanged.

3.  **Calculate the kinetic friction:** Since the block is moving, we use the coefficient of kinetic friction.
    $$f_k = \mu_k N$$
    *This is the formula for kinetic friction, which is constant once the object is sliding.*

4.  **Substitute values and calculate $f_k$:**
    $$f_k = (0.3)(98 \text{ N})$$
    $$f_k = 29.4 \text{ N}$$
    *Notice that kinetic friction (29.4 N) is less than maximum static friction (49 N).*

5.  **Apply Newton's 2nd Law in the horizontal direction for constant velocity:** "Constant velocity" means acceleration $a = 0$.
    $$\Sigma F_x = F_{app,const} - f_k = ma$$
    $$F_{app,const} - f_k = m(0)$$
    $$F_{app,const} = f_k$$
    *For constant velocity, the applied force must exactly balance the kinetic friction.*

6.  **Determine the applied force:**
    $$F_{app,const} = 29.4 \text{ N}$$

    **Answer b) The horizontal force required to keep the block moving at a constant velocity is $\boxed{29.4 \text{ N}}$.**

---

**Part c) Acceleration of the block if a horizontal force of 60 N is applied**

1.  **Compare applied force to maximum static friction:** We apply $F_{app} = 60 \text{ N}$. From Part a), $f_{s,max} = 49 \text{ N}$.
    Since $F_{app} (60 \text{ N}) > f_{s,max} (49 \text{ N})$, the block *will* move.
    *This is a crucial check. If $F_{app}$ were less than $f_{s,max}$, the block would remain at rest, and its acceleration would be zero.*

2.  **Identify the friction type:** Since the block is moving, kinetic friction acts on it. From Part b), $f_k = 29.4 \text{ N}$.

3.  **Apply Newton's 2nd Law in the horizontal direction:**
    $$\Sigma F_x = F_{app} - f_k = ma$$
    *The net force is the applied force minus the kinetic friction, and this net force causes acceleration.*

4.  **Substitute values and solve for acceleration ($a$):**
    $$60 \text{ N} - 29.4 \text{ N} = (10 \text{ kg}) a$$
    $$30.6 \text{ N} = (10 \text{ kg}) a$$
    $$a = \frac{30.6 \text{ N}}{10 \text{ kg}}$$
    $$a = 3.06 \text{ m/s}^2$$
    *The acceleration is in the direction of the net force, which is the direction of the applied force.*

    **Answer c) The acceleration of the block when a 60 N force is applied is $\boxed{3.06 \text{ m/s}^2}$.**

**Reflection:** This example highlights the key differences between static and kinetic friction. Static friction adjusts itself up to a maximum, while kinetic friction is relatively constant once motion begins. The critical first step is always to determine if the object will move by comparing the applied force to the maximum static friction.

---

### Example 2: Block on an Inclined Plane

**Problem Statement:** A 5 kg block is placed on an inclined plane that makes an angle of $30^\circ$ with the horizontal. The coefficient of static friction between the block and the incline is $\mu_s = 0.4$, and the coefficient of kinetic friction is $\mu_k = 0.2$.
a) Will the block slide down the incline on its own?
b) If it doesn't slide, what is the magnitude and direction of the static friction force acting on it?
c) If you gently tap the block to overcome static friction, what will be its acceleration down the incline?

**Given:**
*   Mass of block, $m = 5 \text{ kg}$
*   Angle of incline, $\theta = 30^\circ$
*   Coefficient of static friction, $\mu_s = 0.4$
*   Coefficient of kinetic friction, $\mu_k = 0.2$
*   Acceleration due to gravity, $g = 9.8 \text{ m/s}^2$

**What we want:**
a) Whether the block slides (Yes/No)
b) Static friction force ($f_s$) if it doesn't slide
c) Acceleration ($a$) if it slides

---

**Part a) Will the block slide down the incline on its own?**

1.  **Draw a Free-Body Diagram (FBD):** It's often helpful to tilt your coordinate system so the x-axis is parallel to the incline and the y-axis is perpendicular to it.
    ```text
             ^ N
             |
             |
             |  /
             | /
       f_s <--- Block
             /|
            / | mg cos(theta)
           /  |
          /   v
         /
        / mg sin(theta)
       v
    (mg)
    ```
    *   $mg$ (weight) acts vertically downwards.
    *   $N$ (normal force) acts perpendicular to the incline, upwards.
    *   $f_s$ (static friction) acts parallel to the incline, upwards (opposing potential downward motion).
    *   Resolve $mg$ into components: $mg \sin\theta$ (parallel to incline, downwards) and $mg \cos\theta$ (perpendicular to incline, downwards).

2.  **Apply Newton's 2nd Law in the perpendicular (y) direction:** The block is not accelerating perpendicular to the incline.
    $$\Sigma F_y = N - mg \cos\theta = 0$$
    $$N = mg \cos\theta$$
    *This step calculates the normal force, crucial for friction calculations on an incline.*

3.  **Calculate the normal force:**
    $$N = (5 \text{ kg})(9.8 \text{ m/s}^2)(\cos 30^\circ)$$
    $$N = (49 \text{ N})(0.866)$$
    $$N = 42.434 \text{ N}$$
    *The normal force is less than the full weight because the incline supports only a component of the weight.*

4.  **Calculate the component of gravity pulling the block down the incline:** This is the "applied force" trying to cause motion.
    $$F_{gravity,parallel} = mg \sin\theta$$
    $$F_{gravity,parallel} = (5 \text{ kg})(9.8 \text{ m/s}^2)(\sin 30^\circ)$$
    $$F_{gravity,parallel} = (49 \text{ N})(0.5)$$
    $$F_{gravity,parallel} = 24.5 \text{ N}$$
    *This is the force that would cause the block to slide if there were no friction.*

5.  **Calculate the maximum static friction force:** This is the maximum force that friction can provide to hold the block in place.
    $$f_{s,max} = \mu_s N$$
    $$f_{s,max} = (0.4)(42.434 \text{ N})$$
    $$f_{s,max} = 16.974 \text{ N}$$
    *This is the threshold friction force.*

6.  **Compare the downward gravitational force to maximum static friction:**
    Is $F_{gravity,parallel} > f_{s,max}$?
    Is $24.5 \text{ N} > 16.974 \text{ N}$? Yes.
    *Since the force trying to pull the block down is greater than the maximum static friction that can hold it back, the block *will* slide.*

    **Answer a) Yes, the block $\boxed{\text{will slide down the incline}}$ on its own.**

---

**Part b) If it doesn't slide, what is the magnitude and direction of the static friction force acting on it?**

*   Since the answer to Part a) is that the block *will* slide, this question is moot. If the block *hadn't* slid (e.g., if $F_{gravity,parallel} < f_{s,max}$), then the static friction force would have been exactly equal to $F_{gravity,parallel}$, opposing the downward motion. In that hypothetical case, $f_s = 24.5 \text{ N}$ (up the incline).

---

**Part c) If you gently tap the block to overcome static friction, what will be its acceleration down the incline?**

1.  **Identify the friction type:** Since the block is sliding, kinetic friction acts on it.

2.  **Calculate the kinetic friction force:**
    $$f_k = \mu_k N$$
    *We use the same normal force calculated in Part a).*
    $$f_k = (0.2)(42.434 \text{ N})$$
    $$f_k = 8.487 \text{ N}$$
    *Kinetic friction is less than static friction, as expected.*

3.  **Apply Newton's 2nd Law in the parallel (x) direction:** The net force down the incline causes acceleration.
    $$\Sigma F_x = F_{gravity,parallel} - f_k = ma$$
    *The downward component of gravity is the driving force, and kinetic friction opposes it.*

4.  **Substitute values and solve for acceleration ($a$):**
    $$24.5 \text{ N} - 8.487 \text{ N} = (5 \text{ kg}) a$$
    $$16.013 \text{ N} = (5 \text{ kg}) a$$
    $$a = \frac{16.013 \text{ N}}{5 \text{ kg}}$$
    $$a = 3.20 \text{ m/s}^2$$

    **Answer c) The acceleration of the block down the incline is $\boxed{3.20 \text{ m/s}^2}$.**

**Reflection:** This example demonstrates the importance of resolving forces into components, especially on inclined planes. It also reinforces the procedure for determining if an object will move and then calculating its acceleration if it does. The normal force is *not* simply $mg$ on an incline.

---

### Example 3: Two Blocks with Friction

**Problem Statement:** A 2 kg block (Block A) rests on top of a 5 kg block (Block B), which rests on a frictionless horizontal table. The coefficient of static friction between Block A and Block B is $\mu_s = 0.6$. The coefficient of kinetic friction between Block A and Block B is $\mu_k = 0.4$. A horizontal force $F$ is applied to Block B.
a) What is the maximum force $F$ that can be applied to Block B such that Block A does *not* slide relative to Block B?
b) If $F = 50 \text{ N}$, what is the acceleration of each block?

**Given:**
*   Mass of Block A, $m_A = 2 \text{ kg}$
*   Mass of Block B, $m_B = 5 \text{ kg}$
*   Coefficient of static friction (A on B), $\mu_s = 0.6$
*   Coefficient of kinetic friction (A on B), $\mu_k = 0.4$
*   Table is frictionless.
*   $g = 9.8 \text{ m/s}^2$

**What we want:**
a) Maximum $F$ for no relative sliding ($F_{max}$)
b) $a_A$ and $a_B$ when $F = 50 \text{ N}$

---

**Part a) Maximum force $F$ such that Block A does not slide relative to Block B**

1.  **Analyze the condition for no relative sliding:** If Block A does not slide relative to Block B, then both blocks move together with the same acceleration, $a_A = a_B = a$. The force that accelerates Block A is the static friction force exerted by Block B on Block A. This static friction force must not exceed its maximum value.

2.  **Draw FBD for Block A:**
    ```text
          ^ N_A (from B on A)
          |
     <----|-----> f_s (from B on A)
          |
          v m_A g
    ```
    *   $m_A g$ (weight of A) acts downwards.
    *   $N_A$ (normal force from B on A) acts upwards.
    *   $f_s$ (static friction from B on A) acts to the right, accelerating Block A. (If B accelerates right, A needs a force to the right to keep up).

3.  **Apply Newton's 2nd Law for Block A (vertical):**
    $$\Sigma F_{y,A} = N_A - m_A g = 0$$
    $$N_A = m_A g = (2 \text{ kg})(9.8 \text{ m/s}^2) = 19.6 \text{ N}$$
    *This normal force is crucial for the friction between A and B.*

4.  **Apply Newton's 2nd Law for Block A (horizontal):** The static friction force $f_s$ is the *only* horizontal force acting on Block A.
    $$\Sigma F_{x,A} = f_s = m_A a$$
    *This tells us that static friction is responsible for accelerating Block A.*

5.  **Determine the maximum static friction on Block A:** This is the maximum force Block B can exert on Block A without A slipping.
    $$f_{s,max} = \mu_s N_A$$
    $$f_{s,max} = (0.6)(19.6 \text{ N}) = 11.76 \text{ N}$$
    *This is the 'breaking point' for Block A relative to Block B.*

6.  **Find the maximum acceleration for Block A (and B) without slipping:** If $f_s$ reaches its maximum, then $a$ reaches its maximum.
    $$f_{s,max} = m_A a_{max}$$
    $$11.76 \text{ N} = (2 \text{ kg}) a_{max}$$
    $$a_{max} = \frac{11.76 \text{ N}}{2 \text{ kg}} = 5.88 \text{ m/s}^2$$
    *This is the maximum acceleration the system (A+B) can have before A slips.*

7.  **Draw FBD for Block B (with A on top, moving as one system):**
    ```text
          ^ N_B (from table on B)
          |
          |
          |  <----- f_s' (from A on B)
          |  -----> F (applied)
          |
          v m_B g
          ^ N_A' (from A on B)
          v m_A g (from A on B)
    ```
    *   $F$ (applied force) acts to the right.
    *   $f_s'$ (static friction from A on B) acts to the left (Newton's 3rd Law pair to $f_s$ on A).
    *   $N_B$ (normal force from table on B) acts upwards.
    *   $N_A'$ (normal force from A on B) acts downwards.
    *   $m_B g$ (weight of B) acts downwards.
    *   Note: The table is frictionless, so no friction force from the table.

8.  **Apply Newton's 2nd Law for Block B (horizontal):**
    $$\Sigma F_{x,B} = F - f_s' = m_B a$$
    *The net force on B is the applied force minus the friction from A.*

9.  **Relate $f_s'$ to $f_s$:** By Newton's 3rd Law, the friction force exerted by A on B ($f_s'$) is equal in magnitude and opposite in direction to the friction force exerted by B on A ($f_s$). So, $f_s' = f_s = m_A a$.

10. **Substitute $f_s'$ into Block B's equation and solve for $F_{max}$:** We are looking for the $F$ that produces $a_{max}$.
    $$F_{max} - f_{s,max}' = m_B a_{max}$$
    $$F_{max} - (11.76 \text{ N}) = (5 \text{ kg})(5.88 \text{ m/s}^2)$$
    $$F_{max} - 11.76 \text{ N} = 29.4 \text{ N}$$
    $$F_{max} = 29.4 \text{ N} + 11.76 \text{ N}$$
    $$F_{max} = 41.16 \text{ N}$$
    *This is the maximum force that can be applied to B without A slipping.*

    **Answer a) The maximum force $F$ that can be applied to Block B such that Block A does not slide relative to Block B is $\boxed{41.16 \text{ N}}$.**

---

**Part b) If $F = 50 \text{ N}$, what is the acceleration of each block?**

1.  **Check for slipping:** Since $F = 50 \text{ N}$ is greater than $F_{max} = 41.16 \text{ N}$ (from Part a), Block A *will* slide relative to Block B. This means we will have different accelerations for A and B, and kinetic friction will act between them.

2.  **Draw FBD for Block A (now with kinetic friction):**
    ```text
          ^ N_A
          |
     <----|-----> f_k (from B on A)
          |
          v m_A g
    ```
    *   $N_A = m_A g = 19.6 \text{ N}$ (from Part a).
    *   $f_k$ (kinetic friction from B on A) acts to the right, accelerating A.

3.  **Calculate the kinetic friction force on Block A:**
    $$f_k = \mu_k N_A$$
    $$f_k = (0.4)(19.6 \text{ N}) = 7.84 \text{ N}$$
    *This is the constant kinetic friction force acting on A once it slips.*

4.  **Apply Newton's 2nd Law for Block A (horizontal) to find $a_A$:**
    $$\Sigma F_{x,A} = f_k = m_A a_A$$
    $$7.84 \text{ N} = (2 \text{ kg}) a_A$$
    $$a_A = \frac{7.84 \text{ N}}{2 \text{ kg}} = 3.92 \text{ m/s}^2$$
    *Block A accelerates due to the kinetic friction from Block B.*

5.  **Draw FBD for Block B:**
    ```text
          ^ N_B
          |
          |
          |  <----- f_k' (from A on B)
          |  -----> F (applied = 50 N)
          |
          v m_B g
          ^ N_A' (from A on B)
          v m_A g (from A on B)
    ```
    *   $F = 50 \text{ N}$ acts to the right.
    *   $f_k'$ (kinetic friction from A on B) acts to the left. By Newton's 3rd Law, $f_k' = f_k = 7.84 \text{ N}$.

6.  **Apply Newton's 2nd Law for Block B (horizontal) to find $a_B$:**
    $$\Sigma F_{x,B} = F - f_k' = m_B a_B$$
    $$50 \text{ N} - 7.84 \text{ N} = (5 \text{ kg}) a_B$$
    $$42.16 \text{ N} = (5 \text{ kg}) a_B$$
    $$a_B = \frac{42.16 \text{ N}}{5 \text{ kg}} = 8.432 \text{ m/s}^2$$
    *Block B accelerates due to the applied force minus the kinetic friction from Block A.*

    **Answer b) When $F = 50 \text{ N}$, the acceleration of Block A is $\boxed{3.92 \text{ m/s}^2}$ and the acceleration of Block B is $\boxed{8.432 \text{ m/s}^2}$.**

**Reflection:** This example is complex because it involves two objects and the crucial decision of whether they move together or slide relative to each other. The key is to first determine the maximum static friction and the corresponding maximum acceleration for the "no-slip" condition. If the applied force exceeds this, then kinetic friction takes over, and the blocks will have different accelerations. Newton's Third Law is essential for handling the friction forces between the two blocks.

---

### Example 4: Car Braking (Rolling to Kinetic Friction)

**Problem Statement:** A 1500 kg car is traveling at $20 \text{ m/s}$ on a flat, dry road. The coefficient of static friction between the tires and the road is $\mu_s = 0.8$, and the coefficient of kinetic friction is $\mu_k = 0.6$.
a) What is the minimum stopping distance if the driver brakes such that the wheels *do not skid* (i.e., rolling without slipping)?
b) What is the stopping distance if the driver locks the wheels and the car *skids* to a stop?

**Given:**
*   Mass of car, $m = 1500 \text{ kg}$
*   Initial velocity, $v_0 = 20 \text{ m/s}$
*   Final velocity, $v_f = 0 \text{ m/s}$
*   Coefficient of static friction, $\mu_s = 0.8$
*   Coefficient of kinetic friction, $\mu_k = 0.6$
*   $g = 9.8 \text{ m/s}^2$

**What we want:**
a) Minimum stopping distance ($d_s$) without skidding
b) Stopping distance ($d_k$) with skidding

---

**Part a) Minimum stopping distance if the wheels do not skid (rolling without slipping)**

1.  **Analyze the friction type:** When wheels roll without slipping, the point of contact between the tire and the road is momentarily at rest. Therefore, the friction force involved in braking without skidding is *static friction*. The maximum static friction provides the maximum possible deceleration.

2.  **Draw FBD for the car:**
    ```text
          ^ N
          |
    <-----|----->
     f_s  |
          v mg
    ```
    *   $mg$ (weight) acts downwards.
    *   $N$ (normal force) acts upwards.
    *   $f_s$ (static friction) acts opposite to the direction of motion, causing deceleration.

3.  **Apply Newton's 2nd Law in the vertical direction:**
    $$\Sigma F_y = N - mg = 0$$
    $$N = mg = (1500 \text{ kg})(9.8 \text{ m/s}^2) = 14700 \text{ N}$$
    *The normal force is equal to the car's weight on a flat road.*

4.  **Calculate the maximum static friction force:** This force provides the maximum possible braking force without skidding.
    $$f_{s,max} = \mu_s N$$
    $$f_{s,max} = (0.8)(14700 \text{ N}) = 11760 \text{ N}$$
    *This is the maximum force the tires can exert to slow the car down without slipping.*

5.  **Apply Newton's 2nd Law in the horizontal direction to find maximum deceleration:** The friction force is the net force causing deceleration.
    $$\Sigma F_x = -f_{s,max} = ma_{max}$$
    $$-11760 \text{ N} = (1500 \text{ kg}) a_{max}$$
    $$a_{max} = \frac{-11760 \text{ N}}{1500 \text{ kg}} = -7.84 \text{ m/s}^2$$
    *The negative sign indicates deceleration (acceleration opposite to initial velocity).*

6.  **Use kinematics to find the stopping distance:** We have $v_0 = 20 \text{ m/s}$, $v_f = 0 \text{ m/s}$, and $a = -7.84 \text{ m/s}^2$. We want to find the distance $d_s$.
    Using the kinematic equation: $v_f^2 = v_0^2 + 2ad$
    $$(0 \text{ m/s})^2 = (20 \text{ m/s})^2 + 2(-7.84 \text{ m/s}^2)d_s$$
    $$0 = 400 \text{ m}^2/\text{s}^2 - (15.68 \text{ m/s}^2)d_s$$
    $$(15.68 \text{ m/s}^2)d_s = 400 \text{ m}^2/\text{s}^2$$
    $$d_s = \frac{400 \text{ m}^2/\text{s}^2}{15.68 \text{ m/s}^2}$$
    $$d_s = 25.51 \text{ m}$$

    **Answer a) The minimum stopping distance without skidding is $\boxed{25.51 \text{ m}}$.**

---

**Part b) Stopping distance if the driver locks the wheels and the car skids to a stop**

1.  **Analyze the friction type:** When the wheels are locked and the car skids, the tires are sliding over the road. Therefore, the friction force involved is *kinetic friction*.

2.  **Draw FBD for the car:** (Similar to Part a, but now with kinetic friction $f_k$)
    ```text
          ^ N
          |
    <-----|----->
     f_k  |
          v mg
    ```
    *   $N = 14700 \text{ N}$ (from Part a).

3.  **Calculate the kinetic friction force:**
    $$f_k = \mu_k N$$
    $$f_k = (0.6)(14700 \text{ N}) = 8820 \text{ N}$$
    *Notice that $f_k$ (8820 N) is less than $f_{s,max}$ (11760 N).*

4.  **Apply Newton's 2nd Law in the horizontal direction to find deceleration:**
    $$\Sigma F_x = -f_k = ma$$
    $$-8820 \text{ N} = (1500 \text{ kg}) a$$
    $$a = \frac{-8820 \text{ N}}{1500 \text{ kg}} = -5.88 \text{ m/s}^2$$
    *The deceleration is smaller when skidding.*

5.  **Use kinematics to find the stopping distance:** We have $v_0 = 20 \text{ m/s}$, $v_f = 0 \text{ m/s}$, and $a = -5.88 \text{ m/s}^2$. We want to find the distance $d_k$.
    Using the kinematic equation: $v_f^2 = v_0^2 + 2ad$
    $$(0 \text{ m/s})^2 = (20 \text{ m/s})^2 + 2(-5.88 \text{ m/s}^2)d_k$$
    $$0 = 400 \text{ m}^2/\text{s}^2 - (11.76 \text{ m/s}^2)d_k$$
    $$(11.76 \text{ m/s}^2)d_k = 400 \text{ m}^2/\text{s}^2$$
    $$d_k = \frac{400 \text{ m}^2/\text{s}^2}{11.76 \text{ m/s}^2}$$
    $$d_k = 34.01 \text{ m}$$

    **Answer b) The stopping distance if the car skids to a stop is $\boxed{34.01 \text{ m}}$.**

**Reflection:** This example vividly illustrates why anti-lock braking systems (ABS) are crucial in modern vehicles. Braking without skidding (using static friction) provides a shorter stopping distance because $\mu_s > \mu_k$. When you lock the wheels, you switch from the higher static friction to the lower kinetic friction, resulting in less deceleration and a longer stopping distance. This is a direct application of the difference between static and kinetic friction.

## 6. Common mistakes and traps

1.  **Always assuming $f_s = \mu_s N$:** This is the most frequent mistake. Remember, static friction is *self-adjusting* and only provides as much force as needed to prevent motion, up to its maximum value. $f_s = \mu_s N$ only holds true when the object is on the *verge* of moving.
2.  **Confusing $\mu_s$ and $\mu_k$:** Static friction ($\mu_s$) applies when there is no relative motion (or just impending motion), while kinetic friction ($\mu_k$) applies when there *is* relative motion (sliding). Always check the state of motion.
3.  **Incorrectly calculating the normal force ($N$):** On an inclined plane, or when there are additional vertical applied forces (e.g., pushing down on an object, or lifting it slightly), the normal force is *not* simply equal to $mg$. Always use $\Sigma F_y = 0$ (or $ma_y$) in the direction perpendicular to the surface to find $N$.
4.  **Forgetting friction opposes *relative* motion:** Friction acts opposite to the direction of motion *relative to the surface*. For a block being pushed right, friction acts left. For a car braking, friction acts opposite to the car's velocity. For a car accelerating, static friction acts in the direction of acceleration.
5.  **Believing friction depends on contact area:** It's counter-intuitive, but for most macroscopic solid objects, the friction force is largely independent of the apparent contact area. It depends on the normal force and the coefficients of friction.
6.  **Incorrectly applying Newton's 2nd Law with friction direction:** Ensure the friction force is always included in the correct direction (opposing motion or impending motion) in your $\Sigma F = ma$ equations. A common error is to subtract friction when it should be added (e.g., if it's the driving force, like in the two-block problem for the top block).

## 7. Textbook-precise explanation

Friction is an empirical force that arises when two surfaces are in contact and there is a tendency for relative motion (or actual relative motion) between them. It is a complex phenomenon rooted in the microscopic interactions between the asperities (roughness) of the surfaces and intermolecular attractive forces.

The macroscopic "laws of friction" are empirical generalizations, often attributed to Amontons and Coulomb, which describe the behavior of dry friction:

1.  **Direction:** The friction force always acts parallel to the contact surfaces and opposes the direction of relative motion or the impending relative motion.
2.  **Independence of apparent contact area:** For a given normal force, the magnitude of the friction force is approximately independent of the apparent area of contact between the surfaces.
3.  **Proportionality to normal force:** The magnitude of the friction force is directly proportional to the magnitude of the normal force pressing the surfaces together.

These laws lead to the mathematical models for static and kinetic friction:

*   **Static Friction ($f_s$):** When there is no relative motion between surfaces, the static friction force $f_s$ opposes the applied force that tends to cause motion. Its magnitude is variable and adjusts itself to be equal to the magnitude of the parallel component of the applied force, up to a maximum value.
    $$0 \le f_s \le f_{s,max}$$
    The maximum static friction force, $f_{s,max}$, is given by:
    $$f_{s,max} = \mu_s N$$
    where $\mu_s$ is the **coefficient of static friction**, a dimensionless empirical constant characteristic of the pair of surfaces, and $N$ is the magnitude of the normal force. If the applied force exceeds $f_{s,max}$, the object begins to slide.

*   **Kinetic Friction ($f_k$):** Once an object is in motion and sliding over a surface, the friction force acting on it is called kinetic friction $f_k$. Its magnitude is generally considered constant and is given by:
    $$f_k = \mu_k N$$
    where $\mu_k$ is the **coefficient of kinetic friction**, another dimensionless empirical constant, and $N$ is the normal force. Typically, $\mu_k < \mu_s$, which explains why it often takes more force to start an object moving than to keep it moving. Kinetic friction is largely independent of the relative speed between the surfaces (for reasonable speeds).

*   **Rolling Friction ($f_r$):** When an object rolls without slipping over a surface, the resistance to motion is called rolling friction (or rolling resistance). It is significantly smaller than kinetic friction and arises from the deformation of the rolling object and/or the surface, creating a small lever arm that resists motion. It can be modeled approximately as:
    $$f_r = \mu_r N$$
    where $\mu_r$ is the **coefficient of rolling friction**, which is typically much smaller than $\mu_k$ or $\mu_s$. More precisely, rolling resistance is often quantified by a coefficient of rolling resistance, $C_{rr}$, such that $F_r = C_{rr} N$, where $C_{rr}$ is dimensionless and equivalent to $\mu_r$.

(See, for example, *Physics for Scientists and Engineers* by Serway and Jewett, Chapter 5, or *Fundamentals of Physics* by Halliday, Resnick, and Walker, Chapter 6.)

## 8. ASCII diagrams

Here are a couple of ASCII diagrams to illustrate forces on a block with friction.

### Diagram 1: Block on a Horizontal Surface

This diagram shows a block on a flat surface with an applied force ($F_{app}$), gravity ($mg$), normal force ($N$), and friction ($f$).

```text
                  ^ N (Normal Force)
                  |
        f <-------|-------> F_app (Applied Force)
        (Friction)|
                  |
                  v mg (Weight/Gravity)
        +-----------------+
        |       Block     |
        +-----------------+
        ------------------- (Surface)
```

**Description:**
*   The block is resting on a horizontal surface.
*   $mg$ (weight) acts vertically downwards from the center of the block.
*   $N$ (normal force) acts vertically upwards from the surface, perpendicular to it, balancing the weight.
*   $F_{app}$ (applied force) acts horizontally, attempting to move the block to the right.
*   $f$ (friction force) acts horizontally to the left, opposing the applied force or the direction of motion.

### Diagram 2: Block on an Inclined Plane

This diagram shows a block on an inclined plane, with forces resolved into components parallel and perpendicular to the incline.

```text
                  ^  N (Normal Force)
                  | /
                  |/
                  |
                  |
         f <------|-------> mg sin(theta) (Gravity component parallel to incline)
         (Friction)|
                  |
                  v mg cos(theta) (Gravity component perpendicular to incline)
        +-----------------+
        |       Block     |
        +-----------------+
       /
      /
     / theta (Angle of incline)
    --------------------------
```

**Description:**
*   The block is on an inclined plane at an angle $\theta$ to the horizontal.
*   The coordinate system is tilted: x-axis parallel to the incline, y-axis perpendicular to it.
*   $mg$ (weight) acts vertically downwards (not explicitly shown as a single vector, but its components are).
*   $mg \cos\theta$ is the component of gravity perpendicular to the incline, acting downwards into the plane.
*   $N$ (normal force) acts perpendicular to the incline, upwards, balancing $mg \cos\theta$.
*   $mg \sin\theta$ is the component of gravity parallel to the incline, acting downwards along the plane, tending to cause motion.
*   $f$ (friction force) acts parallel to the incline, upwards, opposing the downward tendency of motion.

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **"Static is STUBBORN, Kinetic KEEPS GOING, Rolling RARELY RESISTS."**
    *   **Static ($f_s$):** Think of a "Sticker." It sticks until you peel it off (overcome $f_{s,max}$). It *adjusts* its stickiness to match your pull, but only up to a limit. When it's stuck, $f_s = F_{app}$.
    *   **Kinetic ($f_k$):** Think of a "Skater." Once they're moving, there's still some resistance, but it's usually less than the initial push-off. It's a *constant* drag once moving.
    *   **Rolling ($f_r$):** Think of a "Rollerblade." Super easy to move, very little resistance compared to sliding.

2.  **Formulas/Facts to Overlearn:**
    *   **$f_{s,max} = \mu_s N$**: The maximum static friction. This is the "breaking point."
    *   **$f_k = \mu_k N$**: The kinetic friction. This is the constant resistance when sliding.
    *   **$\mu_s > \mu_k$**: Static friction is always greater than (or equal to) kinetic friction for the same surfaces. This is why it's harder to start something moving than to keep it moving.
    *   **Friction opposes relative motion/tendency of motion**: Direction is key!

3.  **Spaced-Repetition Schedule:**
    *   **Day 1:** Review this lesson thoroughly. Work through the examples again without looking at the solutions.
    *   **Day 3:** Briefly review the key formulas, definitions, and the "Common Mistakes" section. Try one or two of the self-check questions.
    *   **Day 7:** Review the full lesson, focusing on the differences between the types of friction and how normal force is calculated in different scenarios (e.g., inclines).
    *   **Day 16:** Attempt all self-check questions. Re-derive the normal force and friction for an inclined plane from scratch.
    *   **Day 35:** Review the entire topic of Newton's Laws and Dynamics, ensuring friction is integrated seamlessly. Think about how friction interacts with other forces.

4.  **First-Principles Re-derivation Pathway:**
    Friction is largely an empirical model, meaning its fundamental equations ($f = \mu N$) are based on experimental observations rather than being derived from more fundamental principles like Newton's laws or conservation of energy. However, you can "re-derive" your understanding by focusing on the underlying physical reasoning:

    *   **Start with Contact:** Any friction requires two surfaces to be in contact.
    *   **Opposing Force:** Friction inherently *opposes* motion or the *tendency* of motion. This gives its direction.
    *   **Microscopic Interactions:** Imagine the microscopic bumps and valleys on surfaces. When you try to slide them, these asperities interlock. Also, at very close distances, intermolecular attractive forces (like Van der Waals forces) can act. These are the "first principles" of its existence.
    *   **Normal Force Dependence:** The harder you press the surfaces together (larger normal force), the more the asperities interlock, and the stronger the intermolecular bonds become. This explains the direct proportionality to $N$.
    *   **Coefficient of Friction:** The "roughness" or "stickiness" of the surfaces (the extent of interlocking and intermolecular forces) is quantified by the coefficient $\mu$. This is an empirical constant unique to each pair of surfaces.
    *   **Static vs. Kinetic:** When surfaces are at rest, the asperities can settle deeper and form more bonds, requiring more force to break them (higher $\mu_s$). Once sliding, these bonds are continuously breaking and reforming, often with less resistance (lower $\mu_k$). The "stick-slip" motion is a microscopic phenomenon.
    *   **Rolling vs. Sliding:** Rolling avoids continuous sliding of the entire contact area. Instead, it involves small deformations that create a slight "ramp" or "indentation" which the wheel must continually overcome, leading to much lower resistance.

    By building up from these conceptual points (contact, opposition, microscopic interactions, normal force, surface properties, and the difference between rest/motion/rolling), you can reconstruct the understanding of friction even if you forget the exact formulas.

## 10. Connections — what this leads to

Friction is a ubiquitous force that connects to almost every other area of physics and engineering. Understanding it is crucial for advancing to more complex topics:

*   **Work, Energy, and Power:** Friction is a non-conservative force. It does negative work on moving objects, converting mechanical energy into thermal energy (heat). This is fundamental to understanding energy dissipation in systems.
*   **Circular Motion:** Friction often provides the centripetal force necessary for objects to move in a circle, such as a car turning on a flat road or a satellite in orbit. Without sufficient static friction, a car would skid off the road.
*   **Rotational Dynamics & Torque:** Understanding rolling without slipping involves both translational and rotational motion. Friction provides the torque that causes wheels to rotate and the force that causes them to translate. The condition for rolling without slipping is a critical application.
*   **Fluid Dynamics (Viscosity):** While not "dry friction," viscosity in fluids is analogous to friction between layers of fluid or between a fluid and a solid surface. It's the fluid's resistance to flow and causes drag.
*   **Oscillations and Waves (Damping):** Friction often acts as a damping force in oscillating systems (like a pendulum or a spring-mass system), gradually reducing the amplitude of oscillations by dissipating energy.
*   **Machine Design and Tribology:** The study of friction, wear, and lubrication (tribology) is an entire field of engineering. It's critical for designing engines, bearings, gears, brakes, and any moving parts to optimize performance, efficiency, and lifespan.
*   **Aerospace Engineering:** Aerodynamic drag (a form of fluid friction) is a major consideration in aircraft and rocket design, affecting fuel efficiency and maximum speed. Friction in landing gear systems is also vital for safe braking and steering on runways.
*   **Materials Science:** The selection of materials for specific applications often depends on their frictional properties, wear resistance, and ability to be lubricated.

## 11. Self-check questions

1.  A 50 kg crate rests on a horizontal floor. The coefficient of static friction is 0.7, and the coefficient of kinetic friction is 0.5. If you push the crate with a horizontal force of 300 N, will it move? If so, what is its acceleration? If not, what is the magnitude of the friction force acting on it?
2.  A block is placed on a ramp. As the angle of the ramp is slowly increased, the block starts to slide when the angle reaches $35^\circ$. What is the coefficient of static friction between the block and the ramp?
3.  A 1200 kg car is traveling at $25 \text{ m/s}$. The driver applies the brakes, and the car skids to a stop in 40 meters. What is the coefficient of kinetic friction between the tires and the road?
4.  Two blocks are connected by a light string over a frictionless pulley. Block A (2 kg) is on a horizontal table, and Block B (3 kg) hangs vertically. The coefficient of kinetic friction between Block A and the table is 0.2. What is the acceleration of the system, and what is the tension in the string?
5.  A 4 kg block (Block C) is placed on a 10 kg block (Block D), which rests on a horizontal table. The coefficient of static friction between C and D is 0.8. The table is frictionless. A horizontal force $F$ is applied to Block D. What is the maximum acceleration of Block C, and what is the maximum force $F$ that can be applied to Block D without Block C slipping off?