## What it is
The centre of mass (CM) of a system of particles is a specific point that moves as if all the system's mass were concentrated there and all external forces were applied at that point. The acceleration of this point, $\vec{a}_{\text{CM}}$, is determined *only* by the net external force acting on the system, $\vec{F}_{\text{net, ext}}$, and the total mass of the system, $M_{\text{tot}}$. Internal forces between particles within the system have no effect on the motion of the centre of mass.

## Why it matters
This principle is fundamental to analyzing complex systems. In rocket science, it allows us to treat a tumbling, vibrating spacecraft as a single point mass for orbital calculations, because the internal vibrations and crew movements don't alter the craft's trajectory. In collision physics, it explains why the centre of mass of shrapnel from an explosion continues on the same path the object was on before it exploded (ignoring air resistance).

## When to study it
You must have a solid grasp of these prerequisites:
*   **Newton's Laws of Motion:** Specifically, the second law ($\vec{F}_{\text{net}} = m\vec{a}$) for a single particle and the third law (action-reaction pairs).
*   **Vectors:** Position, velocity, and acceleration vectors ($\vec{r}, \vec{v}, \vec{a}$).
*   **Calculus:** Time derivatives, particularly $\vec{v} = d\vec{r}/dt$ and $\vec{a} = d\vec{v}/dt$.
*   **Definition of Centre of Mass:** You should already be able to calculate the position of the centre of mass for a system of discrete particles: $\vec{R}_{\text{CM}} = \frac{1}{M_{\text{tot}}} \sum_{i} m_i \vec{r}_i$.

If you are not confident with all of these, pause and review them first.

## How to study it (step by step)
1.  **Derive Velocity of CM:** Start with the definition of the position of the centre of mass, $\vec{R}_{\text{CM}}$. Differentiate it with respect to time to find the velocity of the centre of mass, $\vec{V}_{\text{CM}}$. Notice how it relates to the total momentum of the system.
2.  **Derive Acceleration of CM:** Differentiate $\vec{V}_{\text{CM}}$ with respect to time to find the acceleration of the centre of mass, $\vec{a}_{\text{CM}}$. Your result should involve the sum of individual particle accelerations.
3.  **Introduce Forces:** Use Newton's Second Law ($\vec{F}_i = m_i \vec{a}_i$) to substitute the acceleration term in your expression for $\vec{a}_{\text{CM}}$ with the net force on each particle.
4.  **Separate Internal and External Forces:** For each particle $i$, the net force $\vec{F}_i$ is the vector sum of external forces ($\vec{F}_{i, \text{ext}}$) and internal forces from all other particles $j$ ($\vec{F}_{ij}$). Rewrite your sum to reflect this.
5.  **Apply Newton's Third Law:** Use Newton's Third Law ($\vec{F}_{ij} = -\vec{F}_{ji}$) to show that the sum of all internal forces is exactly zero. This is the critical step. The entire principle hinges on this cancellation.
6.  **Solve a Classic Problem:** Work through the "exploding projectile" problem. A shell is fired, and at the peak of its trajectory, it explodes into three pieces. Calculate the position of the centre of mass one second after the explosion. This will solidify the concept that internal forces (the explosion) don't matter to the CM's path.

## Key ideas, with intuition
1.  **The System as a Single Particle:** The most powerful intuition is to stop thinking about the individual parts and visualize the entire system as a single, abstract point particle located at the centre of mass. This "super-particle" has a mass equal to the total mass of the system. Its motion is governed by one simple rule.

2.  **Internal Forces are a Zero-Sum Game:** Imagine two astronauts pushing off each other in space. Astronaut A pushes on B, and B pushes back on A. These are internal forces to the A-B system. From Newton's Third Law, the forces are equal and opposite: $\vec{F}_{AB} = -\vec{F}_{BA}$. When you sum all forces *within* the system, every push has a corresponding equal and opposite push. They all cancel out perfectly. The net internal force is always zero.
    $$ \sum_{i} \sum_{j \neq i} \vec{F}_{ij} = 0 $$
    This is why you can't lift yourself by pulling on your own bootstraps. The force you exert on your boots is an internal force to the you-and-your-boots system, and it's cancelled by the force your boots exert on you.

3.  **Only Outsiders Can Change the Path:** Because internal forces cancel, the only thing that can accelerate the system's centre of mass is an external force—a push or pull from outside the system. Gravity from a planet, air resistance, a rocket engine firing (by expelling mass)—these are external. An internal explosion is not. This leads to the master equation:
    $$ \vec{F}_{\text{net, ext}} = M_{\text{tot}} \vec{a}_{\text{CM}} $$
    This looks just like Newton's second law for a single particle, but it applies to a system of any complexity.

## Worked example
**Problem:** A 1 kg projectile is fired from the ground with an initial velocity of $100 \text{ m/s}$ at an angle of $53.1^\circ$ above the horizontal. At the peak of its trajectory, it explodes into two fragments. Fragment A, with mass $m_A = 0.4 \text{ kg}$, is observed to have zero velocity just after the explosion and falls straight down. Where does the second fragment, B, land? (Neglect air resistance, use $g=10 \text{ m/s}^2$).

**Solution:**

1.  **Analyze the CM motion:** The only external force on the projectile-fragments system is gravity. The explosion is an internal force. Therefore, the centre of mass of the system *must* continue to follow the original parabolic trajectory as if no explosion occurred.

2.  **Calculate the original trajectory:**
    *   Initial velocity components: $v_{0x} = 100 \cos(53.1^\circ) = 60 \text{ m/s}$, $v_{0y} = 100 \sin(53.1^\circ) = 80 \text{ m/s}$.
    *   Time to reach the peak: At the peak, $v_y = 0$. Using $v_y = v_{0y} - gt$, we get $0 = 80 - 10t$, so $t_{\text{peak}} = 8 \text{ s}$.
    *   Total flight time for the CM (if no explosion): The full parabola is symmetric, so $t_{\text{flight}} = 2 \times t_{\text{peak}} = 16 \text{ s}$.
    *   Range of the CM: $R = v_{0x} \times t_{\text{flight}} = 60 \text{ m/s} \times 16 \text{ s} = 960 \text{ m}$.
    *   This means the centre of mass of the two fragments will land at $x = 960 \text{ m}$.

3.  **Locate Fragment A:** Fragment A falls vertically from the peak. The peak's horizontal position is $x_{\text{peak}} = v_{0x} \times t_{\text{peak}} = 60 \text{ m/s} \times 8 \text{ s} = 480 \text{ m}$. So, fragment A lands at $x_A = 480 \text{ m}$.

4.  **Use the definition of CM to find Fragment B:** Let the landing position of fragment B be $x_B$. The final position of the centre of mass is given by:
    $$ X_{\text{CM}} = \frac{m_A x_A + m_B x_B}{m_A + m_B} $$
    We know $M_{\text{tot}} = 1 \text{ kg}$ and $m_A = 0.4 \text{ kg}$, so $m_B = 0.6 \text{ kg}$. We also know $X_{\text{CM}} = 960 \text{ m}$ and $x_A = 480 \text{ m}$.
    $$ 960 = \frac{(0.4)(480) + (0.6)x_B}{1} $$
    $$ 960 = 192 + 0.6 x_B $$
    $$ 768 = 0.6 x_B $$
    $$ x_B = \frac{768}{0.6} = 1280 \text{ m} $$

**Reflection:**
*   Step 1 worked because we correctly identified gravity as the *only* external force.
*   Step 2 correctly predicted the landing spot of the CM by ignoring the complex internal explosion.
*   Steps 3 & 4 used the definition of the centre of mass to relate the known final positions of the CM and one fragment to find the unknown position of the other. This shows how the principle simplifies a seemingly chaotic event.

## Diagrams
```text
Diagram 1: Trajectory without explosion

      ^ y
      |
      |         ********
      |      ***        ***
      |    **              **
      |   *                  *
      |  *                    *
      | *                      *
      +--------------------------------------> x
    O (origin)                       R (range)


Diagram 2: Trajectory with explosion at peak (P)

      ^ y
      |
      |         --- P ---      (CM path)
      |      ***    |    ***
      |    **       | (A)   ** (B)
      |   *         |         *
      |  *          |          *
      | *           |           *
      +--------------------------------------> x
    O           x_A          X_CM      x_B
    
    (A) = path of fragment A (falls vertically)
    (B) = path of fragment B (thrown forward)
    --- = path of Centre of Mass (unaffected)
```

## Memory technique — remember this forever
1.  **The Mnemonic/Story:** Think of the system as a single, indestructible "ghost particle" at the centre of mass. The particles in the system are just its internal parts, like the organs of a body. The particles can thrash around, explode, and fly apart, but the ghost particle's path is smooth and predictable, dictated only by external forces like gravity. The internal chaos is irrelevant to the ghost's journey.

2.  **Formulas to Overlearn:**
    *   Position of CM: $\vec{R}_{\text{CM}} = \frac{1}{M_{\text{tot}}} \sum_{i} m_i \vec{r}_i$
    *   Equation of Motion for CM: $\vec{F}_{\text{net, ext}} = M_{\text{tot}} \vec{a}_{\text{CM}}$

3.  **Spaced Repetition Schedule:** Review this entire mini-lesson and re-derive the main result at:
    *   1 day
    *   3 days
    *   7 days
    *   16 days
    *   35 days

4.  **First Principles Pathway:** If you forget $\vec{F}_{\text{net, ext}} = M_{\text{tot}} \vec{a}_{\text{CM}}$, rebuild it:
    *   Start with the definition: $\vec{R}_{\text{CM}} = \frac{\sum m_i \vec{r}_i}{M_{\text{tot}}}$.
    *   Differentiate twice w.r.t. time: $M_{\text{tot}} \frac{d^2\vec{R}_{\text{CM}}}{dt^2} = \sum m_i \frac{d^2\vec{r}_i}{dt^2}$.
    *   This is $M_{\text{tot}} \vec{a}_{\text{CM}} = \sum m_i \vec{a}_i$.
    *   Use Newton's 2nd Law: $m_i \vec{a}_i = \vec{F}_i$, so $M_{\text{tot}} \vec{a}_{\text{CM}} = \sum \vec{F}_i$.
    *   The total force on particle $i$ is $\vec{F}_i = \vec{F}_{i, \text{ext}} + \sum_{j \neq i} \vec{F}_{ij}$.
    *   Substitute and sum: $M_{\text{tot}} \vec{a}_{\text{CM}} = \sum_i \vec{F}_{i, \text{ext}} + \sum_i \sum_{j \neq i} \vec{F}_{ij}$.
    *   The double summation of internal forces is zero by Newton's 3rd Law.
    *   You are left with $M_{\text{tot}} \vec{a}_{\text{CM}} = \sum_i \vec{F}_{i, \text{ext}} = \vec{F}_{\text{net, ext}}$.

## Common mistakes
*   **Including internal forces:** Incorrectly adding the force of an explosion or a spring release to the $\vec{F}_{\text{net, ext}}$ term. Remember, these forces are internal and always cancel out for the system as a whole.
*   **Confusing CM motion with particle motion:** Believing that if the CM is stationary, all particles must be stationary. This is false; the particles can be moving in opposite directions such that their mass-weighted velocities sum to zero.
*   **Misidentifying the system:** Forgetting to include all relevant objects in the system. If a person walks on a boat, the system is {person + boat}. The force between the person's feet and the boat is internal. The external force is the drag from the water. If you only consider the person, the force from the boat is external. The choice of system is critical.

## Self-check
1.  An astronaut is floating motionless in space, far from any gravitational source. She throws a wrench to her right. Describe the motion of her body and the motion of the {astronaut + wrench} centre of mass immediately after the throw.
2.  A 2 kg block and a 3 kg block are on a frictionless horizontal surface. A constant horizontal force of 10 N is applied to the 2 kg block. What is the acceleration of the centre of mass of the two-block system?
3.  A flatcar of mass $M$ is at rest on a frictionless rail. A person of mass $m$ is standing at one end. The person walks to the other end of the flatcar, a distance $L$ relative to the car. How far has the centre of mass of the {person + flatcar} system moved? How far has the flatcar moved relative to the ground?