## What it is
The Hamiltonian, $H$, is a function representing the total energy of a system. It is derived from the Lagrangian, $L$, through a mathematical procedure called a Legendre transformation. This process re-expresses the system's dynamics in terms of generalized coordinates and their corresponding generalized momenta ($q_i, p_i$), instead of the Lagrangian's coordinates and velocities ($q_i, \dot{q}_i$).

## Why it matters
The Hamiltonian formulation is the bedrock of modern physics and advanced engineering. In quantum mechanics, observables like energy are replaced by operators, and the Hamiltonian operator governs the time evolution of the quantum state. In aerospace, Hamiltonian methods are central to optimal control theory, used to find the most fuel-efficient trajectories for spacecraft. In machine learning, Hamiltonian Monte Carlo is a state-of-the-art algorithm for sampling from complex probability distributions, enabling robust Bayesian inference.

## When to study it
Before tackling the Hamiltonian, you must have a firm grasp of Lagrangian mechanics. Specifically, you need to be fluent with:
- **Generalized coordinates ($q_i$) and velocities ($\dot{q}_i$)**.
- **The Lagrangian definition:** $L = T - V$.
- **The Euler-Lagrange equations:** $\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_i}\right) - \frac{\partial L}{\partial q_i} = 0$.
- **The concept of a Legendre Transformation**, at least at a procedural level.

If you are not comfortable deriving and solving the Euler-Lagrange equations for systems like a simple pendulum or Atwood machine, review that material first.

## How to study it (step by step)
1.  **Master the Prerequisite Calculation:** Take the Lagrangian for a 1D simple harmonic oscillator, $L = \frac{1}{2}m\dot{x}^2 - \frac{1}{2}kx^2$. Calculate the generalized momentum $p_x = \frac{\partial L}{\partial \dot{x}}$. This step is the gateway from the Lagrangian to the Hamiltonian world.
2.  **Perform the Transformation:** Use the definition $H = p_x \dot{x} - L$. Your task is to eliminate $\dot{x}$ completely. First, solve the expression from step 1 for $\dot{x}$ in terms of $p_x$. Then, substitute this and the original $L$ into the definition of $H$. Simplify until $H$ is a function only of $x$ and $p_x$.
3.  **Connect to Energy:** For the harmonic oscillator, compare your final expression for $H$ with the total energy $E = T + V$. You should find they are identical. Understand *why* this is the case for this system (it's because the coordinate transformations are time-independent and the potential is velocity-independent).
4.  **Derive Hamilton's Equations:** This is a crucial theoretical step. Start with the definition $H(q, p) = p\dot{q} - L(q, \dot{q})$ (for one dimension). Take the total differential $dH$. Separately, use the chain rule to find $dH = \frac{\partial H}{\partial q}dq + \frac{\partial H}{\partial p}dp$. By comparing the two expressions for $dH$ and using the Euler-Lagrange equation, derive the two fundamental equations of motion: $\dot{q} = \frac{\partial H}{\partial p}$ and $\dot{p} = -\frac{\partial H}{\partial q}$.
5.  **Solve with the New Equations:** Use Hamilton's equations that you just derived to solve for the motion of the simple harmonic oscillator. You should get the same familiar equation of motion, $\ddot{x} + \omega^2 x = 0$. This confirms the new formalism reproduces known physics.

## Key ideas, with intuition
1.  **A Change of Perspective:** Lagrangian mechanics operates in *configuration space*, whose axes are the generalized coordinates $q_i$. The state is described by a point ($q_i$) and a direction ($\dot{q}_i$). Hamiltonian mechanics operates in a richer space called *phase space*, whose axes are the coordinates $q_i$ and the momenta $p_i$. The entire state of the system—position and momentum—is captured by a single point in phase space. The laws of physics then describe the trajectory of this point.

2.  **The Legendre Transform as an Information Repackager:** Imagine you have a curve $y=f(x)$. You can describe this curve by listing all the points $(x, f(x))$. Alternatively, you can describe it by listing the slope $m$ of the tangent line at each point, and where that tangent line intercepts the y-axis, $b$. The Legendre transform is the machine that converts from the $(x,y)$ description to the $(m,b)$ description. In mechanics, the Lagrangian $L(q, \dot{q})$ is the original function. The "slope" with respect to velocity is the momentum, $p = \frac{\partial L}{\partial \dot{q}}$. The Hamiltonian is the new function, $H(q, p)$, which contains all the same physical information as $L$, just repackaged. The definition $H = \sum p_i \dot{q}_i - L$ is the precise formula for this repackaging.

3.  **The Hamiltonian as Total Energy (Usually):** For most systems you'll encounter initially, the Hamiltonian $H$ is numerically equal to the total energy $T+V$.
    $$H = T + V$$
    This is a consequence, not a definition. The definition is always:
    $$H = \sum_{i} p_i \dot{q}_i - L$$
    This distinction is critical for systems involving magnetic fields or rotating reference frames, where $H \neq T+V$. Always derive $H$ from its definition.

## Worked example
**Problem:** Find the Hamiltonian for a particle of mass $m$ constrained to move on the surface of a sphere of radius $R$. The potential energy is $V=0$.

**Step 1: Define coordinates and find the Lagrangian, $L$.**
We use spherical coordinates with $r=R$ (constant). The generalized coordinates are $q_1 = \theta$ and $q_2 = \phi$.
The velocity in Cartesian coordinates is related to spherical coordinates by:
$\dot{x} = R(\dot{\theta}\cos\theta\cos\phi - \dot{\phi}\sin\theta\sin\phi)$
$\dot{y} = R(\dot{\theta}\cos\theta\sin\phi + \dot{\phi}\sin\theta\cos\phi)$
$\dot{z} = -R\dot{\theta}\sin\theta$
The kinetic energy is $T = \frac{1}{2}m(\dot{x}^2 + \dot{y}^2 + \dot{z}^2)$. After substitution and simplification (using $\sin^2\alpha + \cos^2\alpha = 1$), this becomes:
$$T = \frac{1}{2}mR^2(\dot{\theta}^2 + \dot{\phi}^2\sin^2\theta)$$
Since $V=0$, the Lagrangian is $L = T - V$:
$$L = \frac{1}{2}mR^2(\dot{\theta}^2 + \dot{\phi}^2\sin^2\theta)$$

**Step 2: Find the generalized momenta, $p_i = \frac{\partial L}{\partial \dot{q}_i}$.**
$$p_\theta = \frac{\partial L}{\partial \dot{\theta}} = mR^2\dot{\theta}$$
$$p_\phi = \frac{\partial L}{\partial \dot{\phi}} = mR^2\dot{\phi}\sin^2\theta$$

**Step 3: Invert the momentum expressions to solve for the velocities, $\dot{q}_i$.**
$$\dot{\theta} = \frac{p_\theta}{mR^2}$$
$$\dot{\phi} = \frac{p_\phi}{mR^2\sin^2\theta}$$

**Step 4: Substitute into the definition of the Hamiltonian, $H = \sum p_i \dot{q}_i - L$.**
$$H = p_\theta \dot{\theta} + p_\phi \dot{\phi} - L$$
Substitute the expressions for $\dot{\theta}$, $\dot{\phi}$, and $L$:
$$H = p_\theta \left(\frac{p_\theta}{mR^2}\right) + p_\phi \left(\frac{p_\phi}{mR^2\sin^2\theta}\right) - \frac{1}{2}mR^2\left(\left(\frac{p_\theta}{mR^2}\right)^2 + \left(\frac{p_\phi}{mR^2\sin^2\theta}\right)^2\sin^2\theta\right)$$

**Step 5: Simplify to get the final Hamiltonian, $H(q, p)$.**
$$H = \frac{p_\theta^2}{mR^2} + \frac{p_\phi^2}{mR^2\sin^2\theta} - \frac{1}{2}mR^2\left(\frac{p_\theta^2}{m^2R^4} + \frac{p_\phi^2}{m^2R^4\sin^4\theta}\sin^2\theta\right)$$
$$H = \frac{p_\theta^2}{mR^2} + \frac{p_\phi^2}{mR^2\sin^2\theta} - \left(\frac{p_\theta^2}{2mR^2} + \frac{p_\phi^2}{2mR^2\sin^2\theta}\right)$$
$$H = \frac{1}{2mR^2}\left(p_\theta^2 + \frac{p_\phi^2}{\sin^2\theta}\right)$$

**Reflection:** Each step was a necessary mechanical process. Step 1 set up the problem in the Lagrangian framework. Step 2 calculated the new momentum variables. Step 3 was crucial algebra to prepare for the substitution, ensuring we could eliminate the old velocity variables. Step 4 applied the definition of $H$. Step 5 cleaned up the algebra. Notice the final expression for $H$ is just the kinetic energy $T$, expressed in terms of momenta, which makes sense as $V=0$.

## Diagrams
A phase space portrait for a 1D simple harmonic oscillator. The state of the system is a point $(x, p_x)$. As time progresses, this point traces an ellipse, returning to its starting state each period.

```text
        ^ p_x (momentum)
        |
    , - ~ ~ ~ - ,
  /               \
 |                 |  <-- Constant Energy Trajectory (H=E)
 |        .        |      System evolves clockwise.
  \               /
    ' - . _ _ _ . '
        |
--------+----------------> x (position)
        |
```

## Memory technique — remember this forever
1.  **Mnemonic:** Think of the Hamiltonian as the system's "net worth." The term $\sum p_i \dot{q}_i$ is the "gross income" (momentum times velocity). The Lagrangian $L=T-V$ is the "operating cost." The Hamiltonian is what's left: **H**amiltonian = **I**ncome - **C**ost.
    $$H = (\sum p_i \dot{q}_i) - L$$

2.  **Must Overlearn Formulas:** Burn these into your memory. Do not paraphrase.
    -   **Definition of H:** $$H(q, p, t) = \sum_{i} p_i \dot{q}_i - L(q, \dot{q}, t)$$
    -   **Definition of p:** $$p_i = \frac{\partial L}{\partial \dot{q}_i}$$
    -   **Hamilton's Equations:** $$\dot{q}_i = \frac{\partial H}{\partial p_i}, \quad \dot{p}_i = -\frac{\partial H}{\partial q_i}$$

3.  **Spaced Repetition Schedule:** Write these three formulas and the worked example of the spherical pendulum on a flashcard. Review it on this schedule:
    -   Tomorrow (1 day)
    -   In 3 days
    -   In 7 days
    -   In 16 days
    -   In 35 days

4.  **First Principles Pathway:** If you forget the definition of $H$, rebuild it from the Legendre transform.
    -   Start with the Lagrangian $L(q, \dot{q})$.
    -   You want a new function $H$ that depends on $p$ instead of $\dot{q}$.
    -   Define the new variable: $p = \frac{\partial L}{\partial \dot{q}}$.
    -   The general form of the transform is $g(m) = mx - f(x)$.
    -   By analogy, $H(p) = p\dot{q} - L(\dot{q})$. Sum over all coordinates $i$.

## Common mistakes
1.  **Leaving $\dot{q}_i$ in the Final Hamiltonian:** The Hamiltonian $H$ must be a function of coordinates, momenta, and time, $H(q_i, p_i, t)$, ONLY. If you have any $\dot{q}_i$ terms left at the end, you have made a mistake, usually by forgetting to substitute for it using the inverted momentum expression.
2.  **Assuming $H = T+V$ by Default:** This is a shortcut that often works, but it is not the definition. For a particle in a magnetic field, or in a non-inertial frame, this will be false. Always begin with $H = \sum p_i \dot{q}_i - L$.
3.  **Sign Error in Hamilton's Equations:** It is very easy to forget the minus sign in $\dot{p}_i = -\frac{\partial H}{\partial q_i}$. This sign is fundamental and ensures energy conservation and correct dynamics. Double-check it every time. The position equation has a plus, the momentum equation has a minus.

## Self-check
1.  A particle of mass $m$ moves in one dimension under the influence of a potential $V(x) = \frac{1}{4}ax^4$. Find the Lagrangian, the generalized momentum, and the Hamiltonian.
2.  A particle of mass $m$ is subject to a central force with potential $V(r)$. Using plane polar coordinates $(r, \theta)$, find the Hamiltonian for the system. Use Hamilton's equations to show that the angular momentum $p_\theta$ is conserved.
3.  A charged particle (charge $q$, mass $m$) moves in a uniform, static magnetic field $\vec{B} = B_0 \hat{k}$. The Lagrangian is $L = \frac{1}{2}m|\dot{\vec{r}}|^2 + q\dot{\vec{r}}\cdot\vec{A}$, where the vector potential is $\vec{A} = \frac{B_0}{2}(-y\hat{i} + x\hat{j})$. Find the Hamiltonian of the system. Is it equal to the kinetic energy?