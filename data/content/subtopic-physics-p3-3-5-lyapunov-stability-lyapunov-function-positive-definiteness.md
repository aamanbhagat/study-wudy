## What it is
Lyapunov stability is a mathematical method used to prove that a dynamical system will return to an equilibrium point after a disturbance, without requiring you to actually solve the system's non-linear differential equations. It works by finding a scalar "energy-like" function—the Lyapunov function—that is strictly positive everywhere except at the equilibrium (positive definite), and proving that this function strictly decreases over time along all possible paths the system can take. 

## Why it matters
In aerospace Guidance, Navigation, and Control (GNC), the equations governing spacecraft attitude and rocket trajectories (like Euler's equations for rigid body dynamics) are highly non-linear. Linearizing these equations only proves stability for infinitesimally small disturbances. Lyapunov theory allows control engineers to design non-linear control laws (like thrust vectoring or reaction wheel commands) that guarantee a spacecraft will recover from massive, large-angle disturbances—such as a staging event, a docking collision, or severe atmospheric turbulence.

## When to study it
Do not attempt this until you have mastered:
1. **Ordinary Differential Equations:** Specifically, state-space representations ($\dot{\mathbf{x}} = f(\mathbf{x})$) and phase portraits.
2. **Multivariable Calculus:** Gradients, partial derivatives, and the multivariable chain rule.
3. **Linear Algebra:** Eigenvalues and positive definite matrices (e.g., understanding why $\mathbf{x}^T P \mathbf{x} > 0$ for all $\mathbf{x} \neq 0$). 

If you cannot confidently compute the time derivative of a scalar function of a vector $\mathbf{x}(t)$ using the chain rule, return to multivariable calculus immediately.

## How to study it (step by step)
1. **Master the definitions:** Write down the strict mathematical definitions of *positive definite*, *positive semi-definite*, *negative definite*, and *negative semi-definite* functions. 
2. **Derive the time derivative:** Understand how to take the time derivative of a scalar function $V(\mathbf{x})$ along the trajectories of a system $\dot{\mathbf{x}} = f(\mathbf{x})$. Do not just memorize it; derive it using the chain rule.
3. **Memorize Lyapunov's Direct Method:** State the theorem for both marginal stability and asymptotic stability from memory.
4. **Analyze quadratic forms:** Practice proving positive definiteness for quadratic functions of the form $V(\mathbf{x}) = \mathbf{x}^T P \mathbf{x}$. This is your default "guess" for a Lyapunov function.
5. **Work non-linear examples:** Solve 3-4 problems where you are given a 2D non-linear system, guess a simple quadratic Lyapunov function, and prove asymptotic stability by analyzing $\dot{V}$.
6. **Study the failure modes:** Understand that if your chosen $V(\mathbf{x})$ results in a $\dot{V}$ that is *not* negative definite, it does not mean the system is unstable. It merely means your guess was wrong. Finding a Lyapunov function is an art.

## Key ideas, with intuition

**1. Positive Definiteness (The Bowl)**
A scalar function $V(\mathbf{x})$ is positive definite around an origin $\mathbf{x}=0$ if $V(0) = 0$ and $V(\mathbf{x}) > 0$ for all $\mathbf{x} \neq 0$. 
*Intuition:* Imagine a bowl resting on a table. The only point touching the table is the very bottom (the equilibrium). Everywhere else, the bowl curves upwards into positive space. 

**2. The Derivative Along Trajectories (The Ball Rolling)**
We need to know how the "energy" $V$ changes over time as the system evolves according to its differential equations $\dot{\mathbf{x}} = f(\mathbf{x})$. Using the multivariable chain rule, the time derivative of $V$ is the dot product of its gradient and the system's velocity vector:
$$ \dot{V}(\mathbf{x}) = \sum_{i=1}^{n} \frac{\partial V}{\partial x_i} \dot{x}_i = \nabla V(\mathbf{x}) \cdot f(\mathbf{x}) $$
*Intuition:* This is the directional derivative of $V$ in the direction the system is naturally flowing. 

**3. Lyapunov's Direct Method**
If you have a positive definite function $V(\mathbf{x})$ (a bowl) and you prove that $\dot{V}(\mathbf{x}) < 0$ for all $\mathbf{x} \neq 0$ (negative definite), then the system's state is always moving "downhill." Because the bowl is bounded below by zero, the state *must* eventually come to rest at the origin. This guarantees **asymptotic stability**.

## Worked example
Consider the non-linear system:
$$ \dot{x}_1 = -x_1 + x_2^2 $$
$$ \dot{x}_2 = -x_1 x_2 - x_2 $$
Determine if the origin $(0,0)$ is asymptotically stable.

**Step 1: Propose a Lyapunov function.**
A standard quadratic form is the best starting point. Let:
$$ V(x_1, x_2) = \frac{1}{2}x_1^2 + \frac{1}{2}x_2^2 $$

**Step 2: Check positive definiteness.**
$V(0,0) = 0$. For any $(x_1, x_2) \neq (0,0)$, the sum of squares is strictly positive. $V$ is positive definite.

**Step 3: Compute $\dot{V}$ along the system trajectories.**
$$ \dot{V} = \frac{\partial V}{\partial x_1}\dot{x}_1 + \frac{\partial V}{\partial x_2}\dot{x}_2 $$
Substitute the partial derivatives ($\frac{\partial V}{\partial x_1} = x_1$, $\frac{\partial V}{\partial x_2} = x_2$) and the system equations:
$$ \dot{V} = x_1(-x_1 + x_2^2) + x_2(-x_1 x_2 - x_2) $$
Expand the terms:
$$ \dot{V} = -x_1^2 + x_1 x_2^2 - x_1 x_2^2 - x_2^2 $$
The non-linear terms cancel out perfectly:
$$ \dot{V} = -x_1^2 - x_2^2 $$

**Step 4: Check negative definiteness of $\dot{V}$.**
Since $-x_1^2 - x_2^2 < 0$ for all $(x_1, x_2) \neq (0,0)$, $\dot{V}$ is strictly negative definite. 

*Reflection:* Because $V$ is positive definite and $\dot{V}$ is negative definite, the origin is asymptotically stable. We proved this without ever integrating the complex non-linear ODEs.

## Diagrams

```text
          . - ~ ~ ~ - .
      . '               ' .     V(x) = C_3 (Highest Energy)
    .       . - ~ ~ - .     .
   .      .             .     . V(x) = C_2
  .      .      . - .     .     .
 .      .     .   +  .     .     .  + = Origin (0,0)
  .      .     ' - '      .     .   V(x) = C_1 (Lowest Energy)
   .      .      ^      .      .
    .       ' -  |  - '      .      Trajectory x(t)
      . '        |        ' .       crossing contours
          ' - ~  |  ~ - '           inward because V_dot < 0
                 |
                 x(t_0)
```
*Notice how the state trajectory $\mathbf{x}(t)$ must point inward, crossing the contour lines of $V(\mathbf{x})$ toward lower energy states. This geometric reality is what $\nabla V \cdot f(\mathbf{x}) < 0$ represents.*

## Memory technique — remember this forever
1. **The Visual Hook:** "The Energy Bowl." $V$ is the bowl, $\dot{V}$ is friction. If you drop a marble into a bowl ($V>0$) and there is friction draining its kinetic energy ($\dot{V}<0$), the marble has no choice but to stop at the bottom.
2. **Formulas to overlearn:**
   * $\dot{V}(\mathbf{x}) = \nabla V(\mathbf{x}) \cdot f(\mathbf{x})$
   * $V > 0$ and $\dot{V} < 0 \implies \text{Asymptotically Stable}$
3. **Spaced-repetition schedule:** Review this concept and re-derive the worked example at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the condition on $\dot{V}$, write out the total time derivative of $V(\mathbf{x}(t))$ using the chain rule: $\frac{d}{dt} V(\mathbf{x}(t)) = \frac{\partial V}{\partial \mathbf{x}} \frac{d\mathbf{x}}{dt}$. Substitute $\frac{d\mathbf{x}}{dt} = f(\mathbf{x})$ to get $\nabla V \cdot f(\mathbf{x})$. If this value is negative, energy is dissipating.

## Common mistakes
1. **Confusing $\dot{V} \le 0$ with asymptotic stability.** If $\dot{V}$ is only negative *semi-definite* (meaning it can be zero outside the origin), the system is merely *stable*. It won't blow up, but it might orbit the origin forever like a frictionless pendulum. You need $\dot{V} < 0$ for *asymptotic* stability.
2. **Giving up when a guessed $V$ fails.** If your chosen $V$ yields a $\dot{V}$ that is not negative definite, it does **not** mean the system is unstable. It means your guess was bad. You must try a different function.
3. **Ignoring radial unboundedness.** To prove *global* asymptotic stability (meaning it stabilizes from literally anywhere in the universe), you must also prove that $V(\mathbf{x}) \to \infty$ as $\|\mathbf{x}\| \to \infty$. 

## Self-check
1. Is $V(x_1, x_2) = (x_1 - x_2)^2$ positive definite? Why or why not?
2. For the 1D system $\dot{x} = -x^3$, prove asymptotic stability using the Lyapunov function $V(x) = \frac{1}{2}x^2$.
3. Suppose you have a linear system $\dot{\mathbf{x}} = A\mathbf{x}$. If you choose $V(\mathbf{x}) = \mathbf{x}^T P \mathbf{x}$ where $P$ is a symmetric positive definite matrix, derive the matrix equation that must hold for $\dot{V}$ to be strictly negative definite.