## What it is
Hamilton's equations are a reformulation of classical mechanics that replaces the second-order differential equations of Lagrangian mechanics with a set of first-order differential equations. Instead of describing a system's state by its generalized positions and velocities $(q, \dot{q})$, it uses generalized positions and momenta $(q, p)$. This framework describes the system's trajectory through a state space called "phase space."

## Why it matters
This formalism is the direct bridge from classical mechanics to quantum mechanics, where the Poisson brackets of Hamiltonian mechanics become the commutators of quantum operators. In statistical mechanics, phase space is the fundamental arena, and Liouville's theorem (which states that phase space volume is conserved) is derived directly from Hamilton's equations. In aerospace, optimal control theory (e.g., finding the most fuel-efficient trajectory to Mars) is often formulated in a Hamiltonian framework.

## When to study it
You must have a solid grasp of Lagrangian mechanics before starting this. Specifically, ensure you understand:
1.  **The Lagrangian:** $L = T - V$.
2.  **The Principle of Least Action:** $\delta S = \delta \int L \, dt = 0$.
3.  **The Euler-Lagrange Equations:** $\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_i}\right) - \frac{\partial L}{\partial q_i} = 0$.
4.  **Legendre Transformations:** While not strictly mandatory from mechanics, understanding this mathematical tool (often seen in thermodynamics) makes the transition from the Lagrangian to the Hamiltonian transparent. If you haven't seen it, we will derive what we need.

If these concepts are not yet solid, pause and review them.

## How to study it (step by step)
1.  **Define Generalized Momentum.** Start with a known Lagrangian $L(q_i, \dot{q}_i, t)$. The definition of the generalized momentum $p_i$ conjugate to the coordinate $q_i$ is $p_i \equiv \frac{\partial L}{\partial \dot{q}_i}$. For a simple system, this is just ordinary momentum, but for others (e.g., in polar coordinates or EM fields), it's more abstract.
2.  **Construct the Hamiltonian via Legendre Transform.** The Hamiltonian $H$ is defined as the Legendre transform of the Lagrangian with respect to the generalized velocities $\dot{q}_i$. The formula is $H(q_i, p_i, t) = \sum_i p_i \dot{q}_i - L(q_i, \dot{q}_i, t)$. Your goal is to express $H$ *only* as a function of $q_i$, $p_i$, and $t$. To do this, use the definition from step 1 to solve for each $\dot{q}_i$ in terms of $p_i$ and $q_i$, then substitute this into the expression for $H$.
3.  **Find the Total Differential of H.** Write out the total differential of the Hamiltonian definition: $dH = \sum_i \left( \frac{\partial H}{\partial q_i} dq_i + \frac{\partial H}{\partial p_i} dp_i \right) + \frac{\partial H}{\partial t} dt$.
4.  **Find the Total Differential of H (another way).** Now, take the differential of the *defining equation* from step 2: $H = \sum_i p_i \dot{q}_i - L$. Using the product rule, $dH = \sum_i (\dot{q}_i dp_i + p_i d\dot{q}_i) - dL$.
5.  **Substitute and Simplify.** Recall the total differential of the Lagrangian is $dL = \sum_i \left( \frac{\partial L}{\partial q_i} dq_i + \frac{\partial L}{\partial \dot{q}_i} d\dot{q}_i \right) + \frac{\partial L}{\partial t} dt$. Substitute this into the expression for $dH$ from step 4. Many terms will cancel, especially when you use the definition $p_i = \frac{\partial L}{\partial \dot{q}_i}$.
6.  **Use the Euler-Lagrange Equation.** The Euler-Lagrange equation states $\dot{p}_i = \frac{d}{dt}(\frac{\partial L}{\partial \dot{q}_i}) = \frac{\partial L}{\partial q_i}$. Substitute this into your simplified expression for $dH$.
7.  **Equate Coefficients.** You now have two expressions for $dH$ (from step 3 and from step 6). By comparing the coefficients of the $dq_i$ and $dp_i$ terms, you will derive Hamilton's equations of motion: $\dot{q}_i = \frac{\partial H}{\partial p_i}$ and $\dot{p}_i = -\frac{\partial H}{\partial q_i}$.

## Key ideas, with intuition
1.  **Phase Space is the "True" State Space.** In Lagrangian mechanics, you think about a path in configuration space (a space of all possible positions $q_i$). To know where the system is going next, you need its position *and* its velocity. Hamiltonian mechanics says this is clumsy. Instead, let's define a new space, **phase space**, whose coordinates are all the positions *and* all the momenta $(q_i, p_i)$. The complete state of the system is now a single point in this higher-dimensional space. The time evolution of the system is a single trajectory of this point through phase space.

2.  **The Hamiltonian is (usually) the Total Energy.** The definition of the Hamiltonian is $H = \sum p_i \dot{q}_i - L$. For a vast number of common physical systems (specifically, those where the coordinate transformations are time-independent and the potential energy is velocity-independent), this quantity simplifies to $H = T + V$, the total energy. This is a powerful shortcut for building the Hamiltonian, but do not mistake it for the fundamental definition. The Legendre transform is the definition.

3.  **Hamilton's Equations Define a "Flow" in Phase Space.**
    $$ \dot{q}_i = \frac{\partial H}{\partial p_i} \quad , \quad \dot{p}_i = -\frac{\partial H}{\partial q_i} $$
    Think of the Hamiltonian $H(q, p)$ as a landscape over the phase space plane. Hamilton's equations tell you how a state-point at $(q, p)$ will move. The velocity in the $q$ direction ($\dot{q}$) is given by the slope of the landscape in the $p$ direction. The velocity in the $p$ direction ($\dot{p}$) is given by the *negative* of the slope in the $q$ direction. This creates a "flow" or "vector field" on phase space, and the system's trajectory simply follows these flow lines. The minus sign is crucial and creates a rotational, non-dissipative flow.

## Worked example
**Problem:** Find the equations of motion for a 1D simple harmonic oscillator using the Hamiltonian formalism.

**Solution:**
1.  **Write the Lagrangian.** The system is a mass $m$ on a spring with constant $k$. The kinetic energy is $T = \frac{1}{2}m\dot{x}^2$ and the potential energy is $V = \frac{1}{2}kx^2$.
    $$ L = T - V = \frac{1}{2}m\dot{x}^2 - \frac{1}{2}kx^2 $$

2.  **Find the conjugate momentum.** There is one coordinate, $x$. The conjugate momentum $p$ is:
    $$ p = \frac{\partial L}{\partial \dot{x}} = \frac{\partial}{\partial \dot{x}}\left(\frac{1}{2}m\dot{x}^2 - \frac{1}{2}kx^2\right) = m\dot{x} $$

3.  **Construct the Hamiltonian.** First, solve for $\dot{x}$ in terms of $p$: $\dot{x} = p/m$. Now use the definition of $H$.
    $$ H = p\dot{x} - L = p\left(\frac{p}{m}\right) - \left(\frac{1}{2}m\left(\frac{p}{m}\right)^2 - \frac{1}{2}kx^2\right) $$
    $$ H = \frac{p^2}{m} - \left(\frac{p^2}{2m} - \frac{1}{2}kx^2\right) = \frac{p^2}{2m} + \frac{1}{2}kx^2 $$
    *Reflection:* Note that this is $T+V$, as expected for this simple system. We have successfully expressed $H$ as a function of $x$ and $p$ only.

4.  **Apply Hamilton's equations.**
    *   The first equation gives the time evolution of the position $x$:
        $$ \dot{x} = \frac{\partial H}{\partial p} = \frac{\partial}{\partial p}\left(\frac{p^2}{2m} + \frac{1}{2}kx^2\right) = \frac{p}{m} $$
        *Reflection:* This simply returns our definition of momentum, $p=m\dot{x}$. This is a valuable sanity check.

    *   The second equation gives the time evolution of the momentum $p$:
        $$ \dot{p} = -\frac{\partial H}{\partial x} = -\frac{\partial}{\partial x}\left(\frac{p^2}{2m} + \frac{1}{2}kx^2\right) = -kx $$
        *Reflection:* This is Newton's second law, $F = \dot{p}$, where the force is the spring force $F = -kx$.

5.  **Combine to get the familiar equation of motion.**
    Differentiate the $\dot{x}$ equation: $\ddot{x} = \dot{p}/m$. Substitute the expression for $\dot{p}$:
    $$ \ddot{x} = \frac{-kx}{m} \implies m\ddot{x} + kx = 0 $$
    This is the standard second-order ODE for a simple harmonic oscillator. The Hamiltonian method successfully decomposed it into two coupled first-order ODEs.

## Diagrams
This is the phase space portrait for the simple harmonic oscillator. The state of the system at any time is a point $(x, p)$ on the ellipse. As time progresses, the point travels clockwise around the ellipse. Each ellipse corresponds to a different, constant total energy $H$.

```text
       p (momentum)
       ^
       |
     ,/-\.
   ,'     `.
  /         \
 /           \
<-------------+-------------> x (position)
 \           /
  \         /
   `.     ,'
     `._,'
       |
```

## Memory technique — remember this forever
1.  **The Mnemonic Story: "Hamilton's Duality"**
    Think of the Hamiltonian $H$ as a powerful CEO. The state of the company is described by its assets (Position, $q$) and its cash flow (Momentum, $p$).
    - To find out how fast **Assets are changing** ($\dot{q}$), you must ask the CEO his opinion on **Cash Flow** ($\frac{\partial H}{\partial p}$).
    - To find out how fast **Cash Flow is changing** ($\dot{p}$), you must ask the CEO his opinion on **Assets** ($\frac{\partial H}{\partial q}$). But he's a shrewd, contrary leader, so you must take the **negative** of his answer ($-\frac{\partial H}{\partial q}$).

2.  **Must-Overlearn Formulas:**
    $$ H = \sum_i p_i \dot{q}_i - L $$
    $$ \dot{q}_i = \frac{\partial H}{\partial p_i} \quad , \quad \dot{p}_i = -\frac{\partial H}{\partial q_i} $$

3.  **Spaced Repetition Schedule:** Review this material and re-derive the main results from scratch at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget Hamilton's equations, you can always rebuild them.
    *   Start with the definition of $H$: $H(q, p, t) = p\dot{q} - L(q, \dot{q}, t)$.
    *   Write its total differential: $dH = \frac{\partial H}{\partial q}dq + \frac{\partial H}{\partial p}dp + \dots$.
    *   Also differentiate the definition: $dH = \dot{q}dp + p d\dot{q} - dL$.
    *   Expand $dL$ and substitute the definitions $p = \frac{\partial L}{\partial \dot{q}}$ and $\dot{p} = \frac{\partial L}{\partial q}$ (from Euler-Lagrange).
    *   Cancel terms and match coefficients of $dq$ and $dp$. The equations will emerge.

## Common mistakes
1.  **Forgetting the minus sign.** The most common error is writing $\dot{p}_i = \frac{\partial H}{\partial q_i}$. The minus sign is physically crucial; without it, systems would not oscillate but would accelerate exponentially.
2.  **Incorrectly constructing H.** Students often write down $H = p\dot{x} - L$ and then forget to substitute out the $\dot{x}$ term. The final expression for $H$ *must* be a function of positions and momenta, $H(q, p)$, not velocities.
3.  **Assuming $H = T+V$ is the definition.** This is only true under specific conditions. For a charged particle in a magnetic field, $H \neq T+V$. Always start from the Legendre transform definition, $H = p\dot{q} - L$, and check if it simplifies to $T+V$.

## Self-check
1.  Find the Hamiltonian and the corresponding equations of motion for a free particle in one dimension ($V=0$). What do the equations tell you?
2.  A simple pendulum consists of a mass $m$ at the end of a massless rod of length $l$. Using the angle $\theta$ as the generalized coordinate, find the Hamiltonian and Hamilton's equations of motion.
3.  A particle of mass $m$ and charge $e$ moves in an electromagnetic field. The Lagrangian is $L = \frac{1}{2}m|\vec{v}|^2 - e\phi + e\vec{v}\cdot\vec{A}$, where $\phi$ is the scalar potential and $\vec{A}$ is the vector potential. Find the generalized momentum $\vec{p}$ (note: it is not just $m\vec{v}$) and construct the Hamiltonian $H(\vec{r}, \vec{p})$.