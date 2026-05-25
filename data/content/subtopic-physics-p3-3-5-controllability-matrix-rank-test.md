## What it is
The controllability matrix rank test is a mathematical binary check to determine if a dynamic system can be driven from any initial state to any desired final state in a finite amount of time. You construct a specific matrix using the system's dynamics and input matrices, and if this matrix has full row rank, the system is fully controllable.

## Why it matters
In aerospace engineering, you must know if your actuators (thrusters, reaction wheels, control surfaces) can actually command all degrees of freedom of your vehicle. If a spacecraft's dynamics are uncontrollable, no algorithm—whether classic PID or advanced Model Predictive Control—can force the vehicle into the desired state. It is the ultimate "sanity check" before designing a GNC system. 

## When to study it
Do not attempt this until you have mastered:
1. Linear Algebra: Matrix multiplication, linear independence, column space (span), and matrix rank.
2. State-Space Representation: Modeling continuous systems as $\dot{x} = Ax + Bu$.
If you cannot confidently find the rank of a non-square matrix or explain what a state vector $x$ is, go back and review those topics first.

## How to study it (step by step)
1. **Write the state-space model:** Identify your state matrix $A$ ($n \times n$) and your input matrix $B$ ($n \times m$). Here, $n$ is the number of states and $m$ is the number of inputs.
2. **Understand the direct input:** The column space of $B$ represents the states you can change directly and instantly with your actuators.
3. **Propagate the input:** Multiply $A$ by $B$ to get $AB$. This represents the states you can change indirectly, by letting the system dynamics "carry" your direct input into other states.
4. **Construct the matrix:** Assemble the block matrix $\mathcal{C} = \begin{bmatrix} B & AB & A^2B & \dots & A^{n-1}B \end{bmatrix}$. 
5. **Check the rank:** Calculate the rank of $\mathcal{C}$. If $\text{rank}(\mathcal{C}) = n$, the system is controllable.
6. **Apply Cayley-Hamilton:** Understand why we stop at $A^{n-1}B$. The Cayley-Hamilton theorem proves that $A^n$ is a linear combination of lower powers of $A$. Any terms beyond $A^{n-1}B$ add no new linearly independent columns.

## Key ideas, with intuition
**1. The State-Space Equation**
A linear time-invariant (LTI) system is defined as:
$$ \dot{x} = Ax + Bu $$
Where $x \in \mathbb{R}^n$ is the state vector, and $u \in \mathbb{R}^m$ is the control input.

**2. The Controllability Matrix**
The controllability matrix $\mathcal{C}$ is defined as:
$$ \mathcal{C} = \begin{bmatrix} B & AB & A^2B & \dots & A^{n-1}B \end{bmatrix} $$
This matrix has dimensions $n \times (nm)$. 

**3. The Intuition of Span**
Imagine a satellite. $B$ represents the axes your thrusters point along. If you fire a thruster, you move along $B$. But what if you need to move in a direction orthogonal to $B$? 
The matrix $A$ defines how states bleed into one another over time (e.g., acceleration integrates into velocity, velocity into position). Therefore, $AB$ represents how your thruster input ($B$) couples into *other* states via the system's natural dynamics ($A$). $A^2B$ is the next layer of coupling, and so on. 
If the combined span of all these vectors covers your entire $n$-dimensional state space, you can reach any state. 

**4. The Rank Test**
A matrix's rank is the number of linearly independent rows or columns. For the span of $\mathcal{C}$ to cover $\mathbb{R}^n$, it must have $n$ linearly independent columns. Therefore, the system is controllable if and only if:
$$ \text{rank}(\mathcal{C}) = n $$

## Worked example
Consider a 1D rocket in deep space. We control its thrust (force), which directly changes velocity. Velocity changes position. 
Let $x_1$ be position and $x_2$ be velocity. The input $u$ is acceleration.
$$ \dot{x}_1 = x_2 $$
$$ \dot{x}_2 = u $$

**Step 1: Formulate $A$ and $B$.**
$$ \begin{bmatrix} \dot{x}_1 \\ \dot{x}_2 \end{bmatrix} = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} + \begin{bmatrix} 0 \\ 1 \end{bmatrix} u $$
Here, $n=2$. $A = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}$, $B = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$.

**Step 2: Calculate $AB$.**
$$ AB = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix} \begin{bmatrix} 0 \\ 1 \end{bmatrix} = \begin{bmatrix} 1 \\ 0 \end{bmatrix} $$

**Step 3: Construct $\mathcal{C}$.**
Since $n=2$, we stop at $A^{2-1}B = AB$.
$$ \mathcal{C} = \begin{bmatrix} B & AB \end{bmatrix} = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} $$

**Step 4: Rank test.**
The determinant of $\mathcal{C}$ is $(0)(0) - (1)(1) = -1$. Because the determinant is non-zero, the columns are linearly independent. 
$$ \text{rank}(\mathcal{C}) = 2 = n $$
*Reflection:* The system is controllable. We only have direct control over velocity ($B$), but because velocity naturally integrates into position ($AB$), we can control the entire 2D state space over time.

## Diagrams
```text
State Space (x1, x2) Plane
      
      x2 (Velocity)
      ^
      |
      |   B = [0, 1]^T
      |   (Direct actuator authority)
      |
      +---------------------> x1 (Position)
      |   AB = [1, 0]^T
      |   (Authority gained via dynamics A)
      |
```
*Notice how $B$ and $AB$ are orthogonal in this example. Together, they form a basis for the entire 2D plane. You can reach any coordinate $(x_1, x_2)$ by combining them.*

## Memory technique — remember this forever
1. **Mnemonic:** "To control a **BAB**y, you need **B**, **AB**, **A**-squared-**B**..."
2. **Must-overlearn facts:** 
   * $\mathcal{C} = [B, AB, A^2B, \dots, A^{n-1}B]$
   * Controllable $\iff \text{rank}(\mathcal{C}) = n$.
3. **Spaced-repetition schedule:** Review this derivation at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First principles pathway:** If you forget the matrix, look at the solution to the LTI system: 
   $x(t) = e^{At}x(0) + \int_0^t e^{A(t-\tau)} B u(\tau) d\tau$. 
   Taylor expand the matrix exponential $e^{A(t-\tau)} = I + A(t-\tau) + \frac{1}{2}A^2(t-\tau)^2 + \dots$ 
   Distribute the $B$. The terms inside the integral are exactly $B$, $AB$, $A^2B$, etc. If these vectors don't span $\mathbb{R}^n$, the integral can never reach certain regions of the state space, no matter what $u(\tau)$ is.

## Common mistakes
1. **Stopping at $A^n B$ instead of $A^{n-1}B$:** Remember, the sequence starts with $A^0 B$ (which is just $B$). To get $n$ terms, you must stop at $n-1$.
2. **Assuming $\mathcal{C}$ is always square:** If you have multiple inputs ($m > 1$), $B$ is an $n \times m$ matrix. $\mathcal{C}$ will be $n \times (nm)$, which is wide. You are checking for full *row* rank ($\text{rank} = n$).
3. **Confusing Controllability with Stability:** A system can be wildly unstable (eigenvalues of $A$ in the right-half plane) but perfectly controllable (like balancing a rocket on its thrust vector). 

## Self-check
1. Given $A = \begin{bmatrix} 2 & 0 \\ 0 & 3 \end{bmatrix}$ and $B = \begin{bmatrix} 1 \\ 0 \end{bmatrix}$, construct $\mathcal{C}$ and determine if the system is controllable.
2. If a system has $n=4$ states and $m=2$ inputs, what are the exact dimensions of its controllability matrix $\mathcal{C}$?
3. If a system is uncontrollable, the controllability matrix has a left null space. Physically, what does a vector in the left null space of $\mathcal{C}$ represent regarding the spacecraft's states?