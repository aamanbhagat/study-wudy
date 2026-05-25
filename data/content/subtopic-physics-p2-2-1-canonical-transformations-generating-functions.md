## What it is
A canonical transformation is a change of coordinates in phase space—from $(q, p)$ to $(Q, P)$—that preserves the fundamental structure of Hamilton's equations. A generating function, $F$, is a scalar function that provides the explicit algebraic mapping between the old and new coordinates and momenta, ensuring the transformation is canonical.

## Why it matters
Canonical transformations are the primary tool for simplifying complex dynamical systems. In celestial mechanics, they are used to systematically remove periodic perturbations from orbital calculations (e.g., the Delaunay variables for the Kepler problem). In control theory for spacecraft, they help transform attitude dynamics into simpler forms, making it easier to design stable control laws. This framework is also the direct classical precursor to the mathematical structure of quantum mechanics, where canonical transformations are analogous to unitary transformations.

## When to study it
You must have a firm grasp of the following before proceeding. If not, pause and review.
1.  **Lagrangian Mechanics:** Generalized coordinates ($q_i$), velocities ($\dot{q}_i$), and the Euler-Lagrange equations.
2.  **Hamiltonian Mechanics:** The Legendre transformation from the Lagrangian to the Hamiltonian, phase space $(q, p)$, Hamilton's equations ($\dot{q} = \partial H / \partial p$, $\dot{p} = -\partial H / \partial q$), and Poisson brackets.
3.  **Calculus of Variations:** Specifically, Hamilton's Principle of Stationary Action, $\delta S = \delta \int L \, dt = 0$.

## How to study it (step by step)
1.  **Start with the "Why":** Write down Hamilton's equations for the old coordinates $(q,p)$ and the new coordinates $(Q,P)$. The goal is to find a transformation $(q,p) \to (Q,P)$ such that the new equations have the same form: $\dot{Q} = \partial K / \partial P$ and $\dot{P} = -\partial K / \partial Q$, for some new Hamiltonian $K$. This invariance is the definition of a canonical transformation.
2.  **Use the Action Principle:** Recall Hamilton's Principle states that the action integral is stationary: $\delta \int_{t_1}^{t_2} (p\dot{q} - H(q,p,t)) \, dt = 0$. For the transformation to be canonical, the new variables must also satisfy this principle: $\delta \int_{t_1}^{t_2} (P\dot{Q} - K(Q,P,t)) \, dt = 0$.
3.  **Connect the two principles:** For both principles to hold simultaneously, the integrands can differ by at most the total time derivative of an arbitrary function, $F$. Why? Because the integral of a total time derivative depends only on the endpoints, and the variation $\delta$ is defined to be zero at the endpoints. So, $\delta \int (dF/dt) \, dt = \delta(F_2 - F_1) = 0$.
4.  **Derive the core relation:** Set the integrands equal, up to this total derivative: $p\dot{q} - H = \lambda(P\dot{Q} - K) + \frac{dF}{dt}$. The scale factor $\lambda$ must be 1 to preserve phase space volume (Liouville's theorem), though we won't prove that here. This leaves the fundamental equation: $p\dot{q} - H = P\dot{Q} - K + \frac{dF}{dt}$.
5.  **Derive the four types of generating functions:** The function $F$ can depend on a mix of old and new variables. By choosing different independent variables for $F$, we get four types of generating functions.
    *   **Type 1: $F_1(q, Q, t)$:** Rearrange the core relation to $dF_1 = p\,dq - P\,dQ + (K-H)\,dt$. From the definition of a total differential, immediately read off the transformation equations: $p = \frac{\partial F_1}{\partial q}$, $P = -\frac{\partial F_1}{\partial Q}$, and $K = H + \frac{\partial F_1}{\partial t}$.
    *   **Type 2: $F_2(q, P, t)$:** Use a Legendre transformation. Define $F_2(q, P, t) = F_1(q, Q, t) + PQ$. Then $dF_2 = dF_1 + P\,dQ + Q\,dP$. Substitute $dF_1$ from the previous step to get $dF_2 = p\,dq + Q\,dP + (K-H)\,dt$. Read off the new rules: $p = \frac{\partial F_2}{\partial q}$, $Q = \frac{\partial F_2}{\partial P}$, and $K = H + \frac{\partial F_2}{\partial t}$. This is the most common type.
6.  **Solve a problem:** Take the simple harmonic oscillator with $H = \frac{1}{2m}(p^2 + m^2\omega^2q^2)$. Use a generating function of type $F_2$ to find a transformation that makes the new Hamiltonian $K$ a function of only the new momentum $P$. This will render the dynamics trivial.

## Key ideas, with intuition
1.  **Invariance is the Goal:** A canonical transformation is a change of coordinates for phase space that is "legal" in the Hamiltonian world. The legality test is simple: do Hamilton's equations look the same in the new coordinates? If yes, the transformation is canonical. It's like rotating axes in Euclidean space; the physics doesn't change, just your description of it.
2.  **The Action is the Source of Truth:** The Principle of Stationary Action is the bedrock. If two different coordinate systems both satisfy it, they are physically equivalent. The condition that their Lagrangians (or more precisely, the terms $p\dot{q}-H$) differ only by a total time derivative is the most general way to ensure this.
    $$ \mathcal{L}_1 = p\dot{q} - H \quad , \quad \mathcal{L}_2 = P\dot{Q} - K $$
    $$ \mathcal{L}_1 = \mathcal{L}_2 + \frac{dF}{dt} \implies \delta \int \mathcal{L}_1 dt = \delta \int \mathcal{L}_2 dt $$
3.  **Generating Functions are the "Recipe":** The generating function $F$ is not just an abstract entity; it's the concrete recipe for getting from $(q,p)$ to $(Q,P)$. Its partial derivatives give you the explicit transformation equations. Think of it as a bridge connecting the old world $(q,p)$ to the new world $(Q,P)$.
4.  **The Four Types are Just Legendre Transforms:** Don't be intimidated by the four types ($F_1, F_2, F_3, F_4$). They are all related by Legendre transformations. You choose which one to use based on convenience—specifically, which variables (old or new, coordinate or momentum) you want to use as the independent variables for your bridge function.
    $$ F_2(q, P) = F_1(q, Q) + PQ $$
    $$ F_3(p, Q) = F_1(q, Q) - pq $$
    $$ F_4(p, P) = F_1(q, Q) - pq + PQ $$

## Worked example
**Problem:** For a simple harmonic oscillator with Hamiltonian $H = \frac{1}{2m}(p^2 + m^2\omega^2q^2)$, find a canonical transformation such that the new Hamiltonian $K$ depends only on the new momentum $P$. Solve for the motion in the new coordinates.

**Solution:**
1.  **Goal:** We want $K = K(P)$. This means Hamilton's new equations will be $\dot{Q} = \partial K / \partial P = \text{const} \equiv \nu$ and $\dot{P} = -\partial K / \partial Q = 0$. This implies $P$ is a constant of motion and $Q$ increases linearly with time. This simplifies the problem immensely.

2.  **Choose a Generating Function:** We'll use a type-2 function, $F_2(q, P)$. The transformation equations are:
    $$ p = \frac{\partial F_2}{\partial q} \quad , \quad Q = \frac{\partial F_2}{\partial P} $$
    And the new Hamiltonian is $K = H$. (We assume $F_2$ has no explicit time dependence, so $\partial F_2 / \partial t = 0$).

3.  **Construct the Transformation:** Let's try a specific form for $F_2$ that looks promising. A common choice for oscillatory problems is $F_2(q, P) = \frac{1}{2} m\omega q^2 \cot(Q)$. Wait, this relates $q$ and $Q$. We want to relate $q$ and $P$. Let's try again. We need to substitute $p$ and $q$ in $H$ with functions of $Q$ and $P$. Let's use the transformation equations to guide us.
    From $p = \partial F_2 / \partial q$, we can substitute this into the Hamiltonian equation $H(q, p) = K(P)$.
    $$ K(P) = \frac{1}{2m}\left( \left(\frac{\partial F_2}{\partial q}\right)^2 + m^2\omega^2q^2 \right) $$
    This is a version of the Hamilton-Jacobi equation. We need to solve for $F_2$.
    $$ \frac{\partial F_2}{\partial q} = \sqrt{2mK(P) - m^2\omega^2q^2} $$
    Integrate with respect to $q$:
    $$ F_2(q, P) = \int \sqrt{2mK - m^2\omega^2q^2} \, dq $$
    This integral is standard. Let $q = \sqrt{2K/(m\omega^2)} \sin\theta$. The integral yields:
    $$ F_2(q, P) = \frac{K}{\omega} \left( \arcsin\left(q\sqrt{\frac{m\omega^2}{2K}}\right) + q\sqrt{\frac{m\omega^2}{2K}} \sqrt{1 - \frac{m\omega^2q^2}{2K}} \right) $$
    This is too complicated. There must be a simpler way. Let's work backwards from a known simplifying transformation.

    **Let's restart the example with a more direct approach.**
    **Problem (Revised):** Show that the transformation defined by the generating function $F_1(q, Q) = \frac{1}{2}m\omega q^2 \cot(Q)$ makes the dynamics of the simple harmonic oscillator trivial.

    **Solution:**
    1.  **State the Generating Function and Type:** We are given a type-1 generating function, $F_1(q, Q) = \frac{1}{2}m\omega q^2 \cot(Q)$.
    2.  **Find the Transformation Equations:** For $F_1(q, Q)$, the relations are:
        $$ p = \frac{\partial F_1}{\partial q} = m\omega q \cot(Q) $$
        $$ P = -\frac{\partial F_1}{\partial Q} = - \frac{1}{2}m\omega q^2 (-\csc^2(Q)) = \frac{1}{2}m\omega q^2 \csc^2(Q) $$
    3.  **Invert the equations to express old variables in terms of new:**
        From the first equation, $\cot(Q) = p / (m\omega q)$.
        From the second equation, $q^2 = \frac{2P}{m\omega \csc^2(Q)} = \frac{2P}{m\omega} \sin^2(Q)$.
        So, $q = \sqrt{\frac{2P}{m\omega}} \sin(Q)$.
        Substitute this $q$ back into the first equation: $p = m\omega \left(\sqrt{\frac{2P}{m\omega}} \sin(Q)\right) \cot(Q) = \sqrt{2Pm\omega} \cos(Q)$.
    4.  **Find the New Hamiltonian K:** Since $F_1$ does not depend explicitly on time, $K=H$. Substitute the expressions for $q$ and $p$ into the original Hamiltonian $H = \frac{p^2}{2m} + \frac{1}{2}m\omega^2q^2$.
        $$ K = \frac{(\sqrt{2Pm\omega} \cos(Q))^2}{2m} + \frac{1}{2}m\omega^2 \left(\sqrt{\frac{2P}{m\omega}} \sin(Q)\right)^2 $$
        $$ K = \frac{2Pm\omega \cos^2(Q)}{2m} + \frac{1}{2}m\omega^2 \left(\frac{2P}{m\omega}\right) \sin^2(Q) $$
        $$ K = P\omega \cos^2(Q) + P\omega \sin^2(Q) = P\omega(\cos^2(Q) + \sin^2(Q)) $$
        $$ K = \omega P $$
    5.  **Solve the new dynamics:** The new Hamiltonian is $K(P) = \omega P$. Hamilton's equations are:
        $$ \dot{P} = -\frac{\partial K}{\partial Q} = 0 \implies P(t) = P_0 \quad (\text{constant}) $$
        $$ \dot{Q} = \frac{\partial K}{\partial P} = \omega \implies Q(t) = \omega t + Q_0 $$
    6.  **Reflect:** The generating function successfully transformed the interacting $(q,p)$ dynamics into a trivial system where the new momentum $P$ is the constant energy (up to a factor of $\omega$) and the new coordinate $Q$ is the phase angle, which evolves linearly in time. This is the power of the method: find the right coordinates, and the problem becomes trivial.

## Diagrams
A canonical transformation is a mapping of phase space onto itself that preserves the structure of Hamilton's equations. It can be thought of as a distortion of the phase space grid.

```text
       p
       ^
       |
       |
       .--->(Q=const)
       |  /
       | /
       v/ (P=const)
(q,p) plane  |/
-------+-------> q
       |
       |
       |
```
The original Cartesian grid of $(q, p)$ is mapped to a new, often curvilinear, grid of $(Q, P)$. The dynamics are simpler to describe in this new grid.

## Memory technique — remember this forever
1.  **The Story:** Imagine you are a brilliant cryptographer (the Physicist) trying to decode an enemy's complex signal (the Hamiltonian system). The signal is written in a difficult code $(q,p)$. You design a "codebook" (the Generating Function $F$) that translates the enemy's signal into a simple, repeating message $(Q,P)$, like "THE-SUN-IS-HOT". The codebook works by linking letters in the old code to letters in the new one via specific rules (the partial derivatives). The magic is that the *rules of grammar* (Hamilton's Equations) are the same in both languages.

2.  **Must-Know Formulas:** Overlearn these for the most common type, $F_2(q, P, t)$. The others follow by Legendre transformation.
    $$ p = \frac{\partial F_2}{\partial q} \quad , \quad Q = \frac{\partial F_2}{\partial P} \quad , \quad K = H + \frac{\partial F_2}{\partial t} $$

3.  **Spaced Repetition Schedule:** Review these formulas and the "Source of Truth" derivation now. Then again in **1 day**, **3 days**, **7 days**, **16 days**, and **35 days**. Do a different practice problem each time.

4.  **First Principles Pathway:** If you forget everything, rebuild it from Hamilton's Principle.
    *   Start with the two action integrals: $\delta \int (p\dot{q} - H) dt = 0$ and $\delta \int (P\dot{Q} - K) dt = 0$.
    *   Argue that their integrands must differ by a total time derivative of a function $F$: $p\dot{q} - H = P\dot{Q} - K + \frac{dF}{dt}$.
    *   Rewrite as $dF = p\,dq - P\,dQ - (H-K)dt$ (assuming $\dot{q}dt=dq$, etc.).
    *   Choose your independent variables for $F$. For $F=F_1(q, Q, t)$, this expression is already the total differential $dF_1 = \frac{\partial F_1}{\partial q}dq + \frac{\partial F_1}{\partial Q}dQ + \frac{\partial F_1}{\partial t}dt$.
    *   Match the coefficients of $dq$, $dQ$, and $dt$ to get the transformation rules for $F_1$. To get $F_2$, just define $F_2 = F_1 + PQ$ and proceed.

## Common mistakes
1.  **Sign Errors:** The relations for $P$ from $F_1$ and $q$ from $F_3$ have a minus sign ($P = -\partial F_1/\partial Q$). Forgetting this is the most common algebraic mistake.
2.  **Mixing up Derivatives:** Confusing $p = \partial F_2/\partial q$ with $p = \partial F_1/\partial q$. Each of the four types has its own unique set of partial derivative relations. Always write them down before you start a problem.
3.  **Assuming $K=H$:** The new Hamiltonian $K$ is equal to the old one $H$ *only if* the generating function does not explicitly depend on time ($ \partial F / \partial t = 0$). If it does, you must include the extra term: $K = H + \partial F / \partial t$.
4.  **Not Inverting Correctly:** After finding relations like $p=p(q,Q)$ and $P=P(q,Q)$ from $F_1$, you often need to do some algebra to find $q=q(Q,P)$ and $p=p(Q,P)$. This step can be tricky and is a frequent source of error.

## Self-check
1.  Consider the transformation $Q = p$ and $P = -q$. Is this transformation canonical? (Hint: Check if Hamilton's equations hold, or check the Poisson Bracket $\{Q, P\}_{q,p}$).
2.  A generating function is given by $F_2(q, P) = qP$. What transformation does this generate? What is the physical meaning of this transformation?
3.  Find a time-dependent generating function $F(q, P, t)$ for a free particle ($H = p^2/2m$) that transforms the Hamiltonian to $K=0$. What do the resulting $Q(t)$ and $P(t)$ represent?