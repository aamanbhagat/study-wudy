## What it is
The principle of conservation of mechanical energy states that for an isolated system where work is done only by conservative forces (like gravity or ideal springs), the total mechanical energy remains constant. Mechanical energy is the sum of the kinetic energy (energy of motion) and potential energy (stored energy of position). In essence, energy can change form between kinetic and potential, but the total amount is unchanged.

## Why it matters
This principle is a cornerstone of physics, simplifying problems that would be difficult to solve with Newton's laws alone. In aerospace, it's used to calculate satellite orbits and spacecraft trajectories, where gravitational potential energy is constantly converted into kinetic energy and back. In computer science, the concept of a conservative field is fundamental to understanding path-independent integrals and certain optimization problems in machine learning, where the "energy landscape" of a loss function is explored.

## When to study it
Before tackling this derivation, you must have a firm grasp of the following prerequisites:
1.  **Work-Energy Theorem:** The net work done on an object equals its change in kinetic energy ($W_{net} = \Delta K$).
2.  **Definitions of Work and Kinetic Energy:** $W = \int \vec{F} \cdot d\vec{r}$ and $K = \frac{1}{2}mv^2$.
3.  **Conservative vs. Non-Conservative Forces:** Understand that work done by a conservative force (e.g., gravity) is path-independent and recoverable, while work done by a non-conservative force (e.g., friction) is path-dependent and dissipates energy.
4.  **Definition of Potential Energy:** The change in potential energy, $\Delta U$, associated with a conservative force $\vec{F}_c$ is defined as the negative of the work done by that force: $\Delta U = -W_c = -\int \vec{F}_c \cdot d\vec{r}$.

If these concepts are not solid, pause and review them first.

## How to study it (step by step)
1.  **Start with the foundation:** Write down the Work-Energy Theorem, $W_{net} = \Delta K$. State in words what it means: "The total work from all forces changes an object's kinetic energy."
2.  **Decompose the net work:** The net force, $\vec{F}_{net}$, can be split into the sum of all conservative forces ($\sum \vec{F}_c$) and all non-conservative forces ($\sum \vec{F}_{nc}$). Therefore, the net work can also be split: $W_{net} = W_c + W_{nc}$.
3.  **Substitute and define:** Replace $W_{net}$ in the Work-Energy Theorem with this decomposition: $W_c + W_{nc} = \Delta K$. Now, use the definition of potential energy to replace the conservative work term: $W_c = -\Delta U$. The equation becomes $-\Delta U + W_{nc} = \Delta K$.
4.  **Rearrange the equation:** Move all energy terms to one side. $\Delta K = K_f - K_i$ and $\Delta U = U_f - U_i$. So, $-\left(U_f - U_i\right) + W_{nc} = K_f - K_i$. Rearranging gives $K_i + U_i + W_{nc} = K_f + U_f$. This is the full Work-Energy Principle.
5.  **Apply the special condition:** The principle of *conservation* of mechanical energy applies only when non-conservative forces do no work, i.e., $W_{nc} = 0$. Set this term to zero in the equation from the previous step.
6.  **State the final result:** You are left with $K_i + U_i = K_f + U_f$. Define the total mechanical energy as $E = K + U$. The equation becomes $E_i = E_f$, which is the statement of conservation of mechanical energy.
7.  **Solve a simple problem:** Use this final equation to find the final speed of a ball dropped from a height $h$, starting from rest. Let the ground be $U=0$. Initial state: $K_i=0, U_i=mgh$. Final state: $K_f=\frac{1}{2}mv_f^2, U_f=0$. Apply $E_i=E_f$ to solve for $v_f$.

## Key ideas, with intuition
1.  **The Work-Energy Theorem is the universal law.** $W_{net} = \Delta K$ is always true. The conservation of mechanical energy is a *special case* of this, not a separate law. It arises when we can give a special name ("potential energy") to some of the work being done.
2.  **Potential energy is just "pre-calculated work".** We define potential energy for conservative forces because the work they do only depends on the start and end points, not the path. This allows us to "bank" the work. For gravity, lifting a book by $h$ means gravity does $-mgh$ of work. We bank this as $+mgh$ of potential energy, which can be cashed in later as kinetic energy.
    $$ \Delta U_{grav} = U_f - U_i = -W_{grav} $$
3.  **The derivation is just bookkeeping.** We start with the total change in kinetic energy ($W_{net} = \Delta K$). Then we split the "work budget" into two columns: reversible transactions (conservative work, $W_c$) and irreversible transactions (non-conservative work, $W_{nc}$). We just give the reversible part a new name, $-\Delta U$, and rearrange the ledger.
    $$ \underbrace{W_c + W_{nc}}_{W_{net}} = \Delta K \implies W_{nc} = \Delta K - W_c \implies W_{nc} = \Delta K + \Delta U $$
    If there are no irreversible transactions ($W_{nc}=0$), then the change in kinetic plus the change in potential is zero: $\Delta K + \Delta U = 0$, which means $\Delta(K+U) = 0$, so $K+U$ is constant.

## Worked example
**Problem:** A 0.5 kg cart starts from rest at the top of a frictionless ramp of height $h=1.25$ m. What is its speed at the bottom of the ramp?

**Solution:**
1.  **Identify the system and forces.** The system is the cart and the Earth. The forces acting on the cart are gravity (conservative) and the normal force from the ramp (non-conservative).
2.  **Check for non-conservative work.** The normal force is always perpendicular to the direction of motion ($d\vec{r}$). Since work is $W = \int \vec{F} \cdot d\vec{r}$, and the dot product of perpendicular vectors is zero, the normal force does no work. Friction is explicitly stated to be zero. Therefore, $W_{nc} = 0$, and mechanical energy is conserved.
3.  **Define initial and final states.**
    *   Initial state (i): At the top of the ramp. $h_i = 1.25$ m, $v_i = 0$ m/s.
    *   Final state (f): At the bottom of the ramp. $h_f = 0$ m (we define this as our zero-point for potential energy), $v_f = ?$.
4.  **Write the conservation of energy equation.**
    $$ K_i + U_i = K_f + U_f $$
5.  **Substitute expressions for each term.**
    *   $K_i = \frac{1}{2}mv_i^2 = \frac{1}{2}(0.5 \text{ kg})(0 \text{ m/s})^2 = 0$ J.
    *   $U_i = mgh_i = (0.5 \text{ kg})(9.8 \text{ m/s}^2)(1.25 \text{ m}) = 6.125$ J.
    *   $K_f = \frac{1}{2}mv_f^2$.
    *   $U_f = mgh_f = (0.5 \text{ kg})(9.8 \text{ m/s}^2)(0 \text{ m}) = 0$ J.
6.  **Plug the values into the conservation equation and solve.**
    $$ 0 \text{ J} + 6.125 \text{ J} = \frac{1}{2}(0.5 \text{ kg})v_f^2 + 0 \text{ J} $$
    $$ 6.125 = 0.25 v_f^2 $$
    $$ v_f^2 = \frac{6.125}{0.25} = 24.5 $$
    $$ v_f = \sqrt{24.5} \approx 4.95 \text{ m/s} $$

**Reflection:** Each step was a direct application of the derived principle. We established that energy was conserved (Step 2), which allowed us to use the simplified equation (Step 4). Then it was a matter of defining our states and substituting the formulas for K and U. This scalar calculation avoided dealing with vectors, angles, and acceleration down the ramp, which would have been required using kinematics.

## Diagrams
```text
      (i) Initial State
      v_i = 0
       +
      /|\
     / |
    /  | h = 1.25 m
   /   |
  /____|
 /     |\
+------+ (f) Final State, h_f = 0
 v_f = ?   U_f = 0
```

## Memory technique — remember this forever
1.  **The Story: The Energy Bank Account.**
    Your system has a total balance, $E$. This balance is split between a "checking account" for spending on motion (Kinetic Energy, $K$) and a "savings account" for stored value (Potential Energy, $U$). A conservative force like gravity is just an internal bank transfer: money moves from savings to checking ($U \to K$) as a ball falls, or from checking to savings ($K \to U$) as you throw it up. The total balance $E=K+U$ doesn't change. Non-conservative work, $W_{nc}$, is an external transaction: friction is a "service fee" that withdraws money from the system, while a rocket engine is a "deposit" that adds money. Conservation of mechanical energy is the special case where there are *no external transactions* ($W_{nc}=0$).

2.  **Formulas to overlearn:**
    *   $W_{net} = \Delta K$ (The absolute foundation: Work-Energy Theorem)
    *   $K_i + U_i + W_{nc} = K_f + U_f$ (The full ledger: Work-Energy Principle)
    *   $K_i + U_i = K_f + U_f$ (The special case: Conservation of Mechanical Energy)

3.  **Spaced Repetition Schedule:**
    Review this derivation and solve one related problem at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, rebuild it.
    *   Start with Newton's Second Law: $\vec{F}_{net} = m\vec{a}$.
    *   Integrate both sides with respect to position: $\int \vec{F}_{net} \cdot d\vec{r} = \int m\vec{a} \cdot d\vec{r}$.
    *   The left side is the definition of $W_{net}$. The right side becomes $\Delta K$. This gives you the Work-Energy Theorem: $W_{net} = \Delta K$.
    *   Split the net force: $\vec{F}_{net} = \vec{F}_c + \vec{F}_{nc}$.
    *   This splits the work: $W_{net} = W_c + W_{nc}$.
    *   Substitute this into the theorem: $W_c + W_{nc} = \Delta K$.
    *   Use the definition of potential energy, $W_c = -\Delta U$.
    *   You have now re-derived the full principle: $-\Delta U + W_{nc} = \Delta K$.

## Common mistakes
1.  **Assuming conservation when it doesn't apply:** Students often forget to check for non-conservative forces like friction or air resistance. If $W_{nc} \neq 0$, you must use the full Work-Energy Principle ($K_i + U_i + W_{nc} = K_f + U_f$), not the conservation equation.
2.  **Sign errors with Potential Energy:** The change in potential energy is the *negative* of the work done by the conservative force ($\Delta U = -W_c$). When gravity does positive work (an object falls), its potential energy *decreases*. Getting this sign wrong is a frequent error.
3.  **Inconsistent Zero-Point:** You can set the zero-point for potential energy ($U=0$) anywhere you like (e.g., the ground, the tabletop, the initial height). But once you choose it, you must use it consistently for both your initial and final states.

## Self-check
1.  A simple pendulum of length $L$ with a bob of mass $m$ is pulled back to an angle $\theta$ from the vertical and released from rest. Using conservation of energy, find its speed when it reaches the lowest point of its swing.
2.  A 1 kg block is launched up a 30-degree ramp with an initial speed of 10 m/s. It travels 5 m along the ramp before coming to a stop. Calculate the work done by friction.
3.  A satellite of mass $m$ is in a circular orbit of radius $r$ around a planet of mass $M$. Use the Work-Energy Theorem to explain why its speed is constant. Then, derive an expression for the satellite's total mechanical energy ($K+U_g$) in terms of $G$, $M$, $m$, and $r$. (Recall that for gravity, $U_g = -G\frac{Mm}{r}$).