## What it is
Linear Quadratic Gaussian (LQG) control is the ultimate optimal control framework for linear systems operating in messy, real-world environments. It combines a Linear Quadratic Regulator (LQR), which calculates the optimal control inputs assuming perfect knowledge of the system state, with a Kalman Filter, which optimally estimates that state from noisy sensor measurements. The mathematical glue holding them together is the Separation Principle, which guarantees you can design the controller and the estimator completely independently without losing overall system optimality.

## Why it matters
LQG is the backbone of modern aerospace control, used to stabilize everything from satellite attitudes to rocket trajectories where sensors are noisy and wind gusts are unpredictable. In the broader curriculum, it bridges deterministic optimal control and stochastic estimation, serving as the foundational baseline against which advanced nonlinear or robust controllers (like $H_\infty$ or Model Predictive Control) are compared.

## When to study it
You must deeply understand:
1. State-Space Representation ($\dot{x} = Ax + Bu$).
2. The Linear Quadratic Regulator (LQR) and how to solve the continuous Algebraic Riccati Equation (CARE).
3. The Kalman Filter and its error covariance update equations.
4. Basic probability (Gaussian distributions, covariance matrices).

If you cannot derive the LQR cost function or explain the Kalman gain update step, stop here. Go back and master those first.

## How to study it (step by step)
1. **Define the stochastic plant:** Write down the state-space equations including process noise $w$ and measurement noise $v$.
2. **Review LQR:** Write the deterministic state feedback law $u = -K_c x$ and its associated Algebraic Riccati Equation.
3. **Review the Kalman Filter:** Write the state estimate dynamics $\dot{\hat{x}}$ and the filter Algebraic Riccati Equation.
4. **Couple the system:** Substitute the state estimate $\hat{x}$ into the LQR control law to get $u = -K_c \hat{x}$.
5. **Define the error:** Formulate the estimation error $e = x - \hat{x}$ and derive its dynamics $\dot{e}$.
6. **Build the augmented matrix:** Create the block-matrix system combining the true state $x$ and the estimation error $e$.
7. **Prove the Separation Principle:** Analyze the eigenvalues of this augmented system matrix to prove the control and filter poles do not interact.

## Key ideas, with intuition

**1. The Stochastic System**
Real systems are subjected to physical disturbances (process noise $w$, like wind gusts) and imperfect sensors (measurement noise $v$, like static).
$$ \dot{x} = Ax + Bu + w $$
$$ y = Cx + v $$
We assume $w$ and $v$ are zero-mean Gaussian white noise processes with covariance matrices $W$ and $V$, respectively.

**2. The Separation Principle**
You want to minimize the expected value of a quadratic cost function:
$$ J = \mathbb{E} \left[ \int_0^\infty (x^T Q x + u^T R u) dt \right] $$
Intuition suggests that because your state estimate is uncertain, you should use a more conservative control law than standard LQR. The Separation Principle proves this intuition *wrong*. The optimal control $u$ is exactly the deterministic LQR gain $K_c$ multiplied by the optimal Kalman estimate $\hat{x}$:
$$ u = -K_c \hat{x} $$
You design $K_c$ pretending you have perfect sensors. You design the Kalman gain $K_f$ pretending you aren't doing optimal control. Combining them yields the globally optimal LQG controller.

**3. The Error Dynamics**
Define the estimation error as $e = x - \hat{x}$. The magic of the Separation Principle relies on the fact that the dynamics of $e$ are completely decoupled from the control input $u$. The estimator's error doesn't care what the controller is doing.

## Worked example
Let's prove the Separation Principle for stability by analyzing the closed-loop eigenvalues of the LQG system. We will ignore the noise terms ($w, v$) here, as noise affects the state variance, not the deterministic location of the system poles.

**Step 1: Write the true dynamics and estimator dynamics.**
True plant:
$$ \dot{x} = Ax + Bu $$
Kalman Filter (estimator):
$$ \dot{\hat{x}} = A\hat{x} + Bu + K_f(y - C\hat{x}) $$
Since $y = Cx$, we can rewrite the filter as:
$$ \dot{\hat{x}} = A\hat{x} + Bu + K_f C(x - \hat{x}) $$

**Step 2: Apply the control law.**
The LQG control law is $u = -K_c \hat{x}$.

**Step 3: Derive the error dynamics.**
Let $e = x - \hat{x}$. Differentiate it:
$$ \dot{e} = \dot{x} - \dot{\hat{x}} $$
$$ \dot{e} = (Ax + Bu) - (A\hat{x} + Bu + K_f C e) $$
Notice the $Bu$ terms cancel out perfectly!
$$ \dot{e} = A(x - \hat{x}) - K_f C e = (A - K_f C)e $$

**Step 4: Rewrite the state dynamics in terms of $x$ and $e$.**
Substitute $u = -K_c \hat{x}$ into the true plant. Since $\hat{x} = x - e$:
$$ \dot{x} = Ax - BK_c(x - e) = (A - BK_c)x + BK_c e $$

**Step 5: Form the augmented block-matrix.**
Combine the equations for $\dot{x}$ and $\dot{e}$:
$$ \begin{bmatrix} \dot{x} \\ \dot{e} \end{bmatrix} = \begin{bmatrix} A - BK_c & BK_c \\ 0 & A - K_f C \end{bmatrix} \begin{bmatrix} x \\ e \end{bmatrix} $$

**Reflection:**
Look at the augmented system matrix. It is block upper-triangular. A fundamental property of linear algebra is that the eigenvalues of a block upper-triangular matrix are simply the union of the eigenvalues of its diagonal blocks. Therefore, the closed-loop poles of the LQG system are exactly the LQR poles (eigenvalues of $A - BK_c$) and the Kalman Filter poles (eigenvalues of $A - K_f C$). Designing one does not shift the poles of the other.

## Diagrams

```text
                      +-----------+  Process Noise (w)
                      |           |       |
                      v           |       v
                  +-------+       |  +---------+
Reference = 0 --->|  LQR  |---u---+->|  Plant  |----+---> True State (x)
                  | Gain  |          +---------+    |
                  | (-Kc) |               |         |
                  +-------+               |y        +---> Sensor Noise (v)
                      ^                   v
                      |              +---------+
                      +---- \hat{x} -| Kalman  |
                                     | Filter  |
                                     +---------+
```

## Memory technique — remember this forever

**1. The Story: Brain and Brawn**
Think of LQG as a strict division of labor. The Kalman Filter is the "Brain" (figuring out where you are). The LQR is the "Brawn" (firing the thrusters). The Separation Principle is the strict HR policy: the Brain and the Brawn never attend meetings together. They do their jobs perfectly in isolation, and the company (the system) runs optimally.

**2. The Must-Know Formulas**
*   The LQG Control Law: $u = -K_c \hat{x}$
*   The Error Dynamics: $\dot{e} = (A - K_f C)e$
*   The Block Determinant: $|sI - A_{cl}| = |sI - (A-BK_c)| \cdot |sI - (A-K_fC)|$

**3. Spaced-Repetition Schedule**
Review this derivation and the block matrix formulation at: 1 day, 3 days, 7 days, 16 days, and 35 days.

**4. First Principles Pathway**
If you forget the proof, always start by defining the error $e = x - \hat{x}$. Substitute the control $u = -K_c \hat{x}$ into $\dot{x}$, and derive $\dot{e}$. The cancellation of $Bu$ in the $\dot{e}$ equation is the linchpin that forces the zero into the bottom-left of the block matrix, proving the Separation Principle.

## Common mistakes

1. **Assuming the Separation Principle holds for nonlinear systems.** It absolutely does not. If you pair an Extended Kalman Filter (EKF) with a nonlinear optimal controller, there is zero mathematical guarantee that the resulting system is globally optimal or even stable.
2. **Ignoring the loss of robustness.** Pure LQR has guaranteed, infinite gain margins and 60-degree phase margins. The moment you add an observer (Kalman Filter) to create LQG, those guarantees vanish. An LQG controller can be arbitrarily fragile to plant uncertainties (see: Doyle's 1978 paper, "Guaranteed Margins for LQG Regulators").
3. **Tuning $Q$ and $R$ for the filter.** $Q$ and $R$ are for the LQR cost function. The Kalman filter requires the actual noise covariance matrices $W$ and $V$. Do not mix up the control penalties with the physical noise statistics.

## Self-check

1. What are the two independent Algebraic Riccati Equations that must be solved to implement an LQG controller, and what matrices do they output?
2. Prove mathematically why the estimation error dynamics $\dot{e}$ are completely independent of the control matrix $B$ and the control gain $K_c$.
3. Suppose your plant has unmodeled dynamics, meaning the true system matrix is $A_{true}$, but your Kalman Filter uses a slightly different matrix $A_{model}$. Does the Separation Principle still hold? Walk through the block matrix derivation to justify your answer.