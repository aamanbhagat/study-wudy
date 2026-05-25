## What it is
The Linear Quadratic Regulator (LQR) is an automated, mathematically optimal method for finding the feedback controller of a dynamic system. It calculates the control inputs that drive a system's states to zero while minimizing a specific "cost"—a quadratic function that balances how fast the system reaches its target against how much energy the actuators use to get there.

## Why it matters
LQR is the workhorse of modern multivariable control. In aerospace, you do not manually tune individual Proportional-Integral-Derivative (PID) loops for a rocket's thrust vector control or a satellite's reaction wheels. Instead, you define the physical limits of your actuators (control cost) and the desired precision of your states (error cost). The LQR algorithm then yields a mathematically guaranteed optimal and stable control matrix, effortlessly handling complex, coupled, multi-input multi-output (MIMO) systems. 

## When to study it
Do not attempt LQR until you possess a rigorous understanding of:
1. State-space representation of linear systems ($\dot{x} = Ax + Bu$).
2. Linear algebra, specifically matrix multiplication, transposes, eigenvalues, and positive definite matrices.
3. Lyapunov stability (the concept of an "energy" function decaying over time).
If you cannot define a positive definite matrix, stop and review linear algebra.

## How to study it (step by step)
1. **Define the physics:** Write your system in state-space form: $\dot{x} = Ax + Bu$.
2. **Define the cost:** Construct the cost function $J$ using weighting matrices $Q$ (state penalty) and $R$ (control penalty). 
3. **Understand the cost-to-go:** Recognize that the optimal cost from any state $x$ to the origin is a quadratic function $V(x) = x^T P x$, where $P$ is an unknown positive definite matrix.
4. **Solve the ARE:** Write down the Algebraic Riccati Equation (ARE) and solve it for $P$. For scalar systems, this is a simple quadratic equation. For matrices, you will use software (like MATLAB's `lqr` or Python's `scipy.linalg.solve_continuous_are`).
5. **Extract the gain:** Calculate the optimal feedback matrix $K = R^{-1}B^TP$.
6. **Simulate the closed loop:** Apply the control law $u = -Kx$ to your system, yielding the closed-loop dynamics $\dot{x} = (A - BK)x$. Verify its eigenvalues have negative real parts.

## Key ideas, with intuition

**1. The Cost Function ($J$)**
LQR minimizes the infinite-horizon cost function:
$$J = \int_{0}^{\infty} \left( x^T Q x + u^T R u \right) dt$$
*   $x^T Q x$ penalizes state errors. If $Q$ is large, the math will aggressively drive the state $x$ to zero.
*   $u^T R u$ penalizes actuator effort. If $R$ is large, the math will limit the control input $u$, accepting a slower response to save fuel or avoid saturating motors.

**2. The Cost-to-Go and Matrix $P$**
The minimum cost to drive the system to zero from a current state $x(t)$ is given by $x^T P x$. $P$ is a symmetric, positive definite matrix that acts as a translator between your chosen penalties ($Q, R$) and the system's natural dynamics ($A, B$).

**3. The Algebraic Riccati Equation (ARE)**
To find $P$, we solve the continuous-time ARE:
$$A^T P + P A - P B R^{-1} B^T P + Q = 0$$
This equation balances the natural divergence of the system ($A^T P + P A$) against the control authority ($P B R^{-1} B^T P$) and the state penalty ($Q$). 

**4. The Optimal Gain ($K$)**
Once $P$ is found, the optimal control law is a simple proportional feedback:
$$u = -K x \quad \text{where} \quad K = R^{-1} B^T P$$
Notice that if $R$ is small (cheap control), $R^{-1}$ is large, leading to a high-gain controller $K$.

## Worked example
Let us stabilize an unstable scalar system (e.g., a simplified rocket balancing like an inverted pendulum):
$$\dot{x} = 2x + u$$
Here, $A = 2$ and $B = 1$. The system is open-loop unstable (eigenvalue is $+2$).

**Step 1: Choose weights**
Let the state penalty $Q = 5$ and the control penalty $R = 1$.

**Step 2: Set up the ARE**
For a scalar system, matrices become scalars, and transposes disappear:
$$2AP - P B R^{-1} B P + Q = 0$$
Substitute the values:
$$2(2)P - P(1)(1^{-1})(1)P + 5 = 0$$
$$4P - P^2 + 5 = 0$$

**Step 3: Solve for P**
Rearrange into a standard quadratic equation:
$$P^2 - 4P - 5 = 0$$
$$(P - 5)(P + 1) = 0$$
The roots are $P = 5$ and $P = -1$. Because $P$ must be positive definite (or strictly positive for a scalar), we select $P = 5$.

**Step 4: Calculate the optimal gain K**
$$K = R^{-1} B P = (1^{-1})(1)(5) = 5$$

**Step 5: Verify closed-loop stability**
Substitute $u = -Kx = -5x$ into the plant:
$$\dot{x} = 2x - 5x = -3x$$
The closed-loop eigenvalue is $-3$. The system is now stable, and this specific eigenvalue optimally balances the $Q$ and $R$ we chose.

## Diagrams

```text
                      +-----------------------------------+
                      |                                   |
           +---+      |       Plant: \dot{x} = Ax + Bu    |      +---+
Reference  |   |  u   |                                   |  x   |   |
  (0) ---->| - |----->|  +---+     +---+     +---+        |----->| I |----> Output
           |   |      |  | B |---->| + |---->|int|--+--+  |      |   |
           +---+      |  +---+     |   |     +---+  |  |  |      +---+
             ^        |            +---+            |  |  |
             |        |              ^              |  |  |
             |        |      +---+   |              |  |  |
             |        |      | A |<--+--------------+  |  |
             |        |      +---+                     |  |
             |        +--------------------------------+  |
             |                                            |
             |                  +---+                     |
             +------------------| K |<--------------------+
                Optimal Gain    +---+
                K = R^{-1}B^TP
```

## Memory technique — remember this forever

1. **The Mnemonic:** "Q is for Quality of the state; R is for Restriction on the control." 
2. **The Core Formulas to overlearn:**
   * Cost: $J = \int (x^T Q x + u^T R u) dt$
   * ARE: $A^T P + P A - P B R^{-1} B^T P + Q = 0$
   * Gain: $K = R^{-1} B^T P$
3. **Spaced-repetition schedule:** Write the ARE and Gain equations from memory on day 1, day 3, day 7, day 16, and day 35. 
4. **First principles pathway:** If you forget the ARE, derive it using a Lyapunov function $V(x) = x^T P x$. 
   Take the derivative: $\dot{V} = \dot{x}^T P x + x^T P \dot{x}$. 
   Substitute $\dot{x} = Ax + Bu$. 
   To minimize $J$, we force $\dot{V} = -(x^T Q x + u^T R u)$. 
   Substitute $u = -Kx$ and minimize with respect to $u$. The algebraic grouping of terms that must equal zero to satisfy this is exactly the ARE.

## Common mistakes
1. **Setting $R$ too close to zero:** Students often want perfect state tracking and set $R \approx 0$. This mathematically demands infinite control energy, yielding a massive gain $K$ that immediately saturates physical actuators, causing instability.
2. **Choosing the wrong root for $P$:** The ARE is quadratic and has multiple roots. You must *always* select the root that makes $P$ positive definite. A negative $P$ implies a negative "cost-to-go," which is physically meaningless and yields an unstable controller.
3. **Ignoring matrix dimensions:** $Q$ must be $n \times n$ (where $n$ is the number of states). $R$ must be $m \times m$ (where $m$ is the number of inputs). $P$ will be $n \times n$, and $K$ will be $m \times n$. 

## Self-check
1. If you increase all values in the $R$ matrix by a factor of 100, what physically happens to the control effort and the system's settling time?
2. Calculate the optimal gain $K$ for the scalar system $\dot{x} = -x + 2u$ with $Q=3$ and $R=1$. (Hint: The open-loop system is already stable, but LQR will make it faster).
3. Look at the ARE. Why does the term $P B R^{-1} B^T P$ have a negative sign, and what does it represent regarding the system's energy?