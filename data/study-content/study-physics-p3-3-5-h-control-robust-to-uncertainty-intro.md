## 1. What it is — in plain English

Imagine you're trying to drive a very precise remote-controlled car. You want it to follow a perfect straight line. But there are problems: the road is bumpy, there's wind blowing it off course, and the car's motor isn't perfectly consistent – sometimes it gives a little more power, sometimes a little less, even if you tell it to do the exact same thing. These are all "uncertainties" and "disturbances."

Now, you could design a controller that works great on a perfectly smooth, windless road with a perfect car. But as soon as you hit the real world, it would probably crash. H∞ (pronounced "H-infinity") control is like designing a super-smart driver for that car who doesn't just aim for perfect performance in ideal conditions, but *specifically* tries to make sure the car stays on track even when things are at their absolute worst.

It's about being "robust" – tough and resilient – to all these unpredictable things. Instead of optimizing for the average day, H∞ control optimizes for the *worst possible day* you can imagine within certain limits. It asks, "What's the biggest wobble this car could ever experience due to wind or motor variations, no matter how they combine?" And then it tries to minimize that maximum possible wobble.

So, in essence, H∞ control is a method for designing controllers that guarantee a certain level of performance and stability *even when faced with significant uncertainties and disturbances* in the system or its environment, by focusing on limiting the "worst-case" amplification of these undesirable inputs.

## 2. Why it matters — real-world applications

H∞ control is crucial in situations where reliability and stability under uncertain conditions are paramount, especially in high-stakes fields like aerospace.

1.  **Aerospace Vehicle Control (e.g., SpaceX Falcon 9, Boeing 787):** Rocket launches and aircraft flights are inherently subject to many uncertainties: varying atmospheric density, wind gusts, changes in fuel mass (which alters the vehicle's inertia), engine thrust variations, and sensor noise. H∞ control is used to design robust flight control systems that maintain stability, track desired trajectories, and perform maneuvers reliably despite these ever-present disturbances. For instance, a Falcon 9's attitude control system needs to be robust enough to handle unexpected thrust vector misalignments or aerodynamic forces during ascent.

2.  **Satellite Attitude and Orbit Control (e.g., NASA's James Webb Space Telescope):** Satellites operate in a vacuum, but they still face disturbances like solar radiation pressure, gravitational perturbations from other celestial bodies, and internal momentum wheel imbalances. Precise pointing (attitude control) is critical for scientific instruments and communication. H∞ controllers can be designed to maintain exact pointing accuracy and orbital stability for years, even with degradation of thrusters or sensors over time, and without perfect knowledge of the satellite's exact mass distribution.

3.  **Robotics and Autonomous Systems (e.g., Boston Dynamics robots, autonomous vehicles):** Robots interacting with the real world encounter friction variations, unknown loads, sensor errors, and communication delays. H∞ control helps design robust motion controllers for robot arms, legs, or autonomous vehicles (like self-driving cars) to perform tasks reliably and safely. For example, an autonomous car's steering control needs to be robust to varying road grip, tire pressure, and sudden wind gusts to maintain lane keeping.

4.  **Active Noise and Vibration Control (e.g., high-end headphones, industrial machinery):** In applications like noise-canceling headphones or active suspension systems in luxury cars, H∞ control can be used to design filters that minimize the worst-case transmission of unwanted noise or vibrations. The system doesn't perfectly know the exact frequency or amplitude of the disturbance, but an H∞ controller can be designed to attenuate it effectively across a wide range of possibilities.

## 3. Prerequisites — what you must know first

Before diving deep into H∞ control, ensure you have a solid grasp of these fundamental concepts. If any are unfamiliar, pause and review them.

*   **Linear Systems Theory:** Understanding how to represent dynamic systems using linear differential equations, state-space models, and transfer functions.
*   **Control Theory Basics:** Core concepts like feedback control, open-loop vs. closed-loop systems, stability (BIBO stability, Lyapunov stability), performance metrics (overshoot, settling time, steady-state error), and the concept of poles and zeros.
*   **Matrix Algebra:** Operations on matrices (addition, multiplication, inversion), eigenvalues, eigenvectors, singular values, and matrix norms (especially spectral norm).
*   **Complex Analysis & Fourier/Laplace Transforms:** Ability to analyze system behavior in the frequency domain using $s$-plane (Laplace) and $j\omega$-axis (Fourier) representations, understanding frequency response.
*   **Norms (L2 and L∞):** Familiarity with different ways to measure the "size" of signals (e.g., energy for L2, peak value for L∞) and systems (e.g., gain for H2, worst-case gain for H∞).
*   **Optimization Theory (Basic):** A conceptual understanding of minimizing or maximizing a function, especially in the context of finding "optimal" solutions.

## 4. The core idea — step by step

Let's break down the core idea of H∞ control, building intuition piece by piece.

### Step 1: The Problem of Uncertainty

**Plain English:** Real-world systems are never perfectly predictable. There are always things we don't know exactly or can't control perfectly.

**Small Concrete Example:** Imagine a drone trying to hover. We command its motors to spin at a certain speed. But the actual thrust generated might be slightly different due to motor wear, battery voltage fluctuations, or even tiny manufacturing differences. Also, wind gusts push the drone around in unpredictable ways. These are "uncertainties" (like motor variations) and "disturbances" (like wind).

**Formal/Mathematical Version:** We often model a system as $P(s)$, its transfer function. But in reality, the true system might be $P(s) + \Delta(s)$, where $\Delta(s)$ represents model uncertainty. Additionally, there are external disturbances, $w(t)$, and sensor noise, $v(t)$, that inject unwanted signals into the system.

**What could go wrong:** If we design a controller assuming a perfect model and no disturbances, it might work beautifully in simulation but fail spectacularly in the real world. It's like building a house without considering earthquakes or hurricanes – it might look great until the first big storm hits.

### Step 2: Performance and Robustness

**Plain English:** We want our system to perform well (e.g., stay on target, respond quickly) *and* be stable, even when facing those uncertainties and disturbances. "Robustness" means the system maintains its desired properties despite these imperfections.

**Small Concrete Example:** Our drone should not only hover at a specific altitude (performance goal) but also *continue* to hover stably even when a strong wind gust hits it (robustness goal). If it oscillates wildly or crashes, it's not robust.

**Formal/Mathematical Version:** We define specific outputs, $z(t)$, that we want to keep small (e.g., tracking error, control effort). These are our "regulated outputs" or "performance outputs." We want to design a controller $K(s)$ such that the closed-loop system is stable and $z(t)$ remains small *for all possible bounded disturbances and uncertainties* within a specified range.

**What could go wrong:** Often, there's a trade-off. A controller designed for extremely high performance might be very sensitive to uncertainty, making it non-robust. Conversely, a very robust controller might be sluggish. Finding the right balance is key.

### Step 3: The "Worst-Case" Mindset

**Plain English:** Instead of trying to optimize for an average situation, H∞ control takes a pessimistic approach: it designs for the *worst possible combination* of disturbances and uncertainties. It asks, "What's the maximum possible negative impact these unpredictable elements could have, and how can I minimize that maximum?"

**Small Concrete Example:** Imagine designing a bridge. You don't just design it to withstand the average traffic load. You design it to withstand the *heaviest possible combination* of trucks, plus the strongest expected wind, plus a certain magnitude earthquake. H∞ control applies this same "design for the worst" philosophy to dynamic systems.

**Formal/Mathematical Version:** We are interested in the system's "gain" from disturbances to performance outputs. Specifically, we want to minimize the *peak* gain of this transfer function across all possible frequencies. This peak gain represents the maximum amplification of any disturbance signal.

**What could go wrong:** Being overly conservative. If the "worst-case" scenario is extremely unlikely or exaggerated, the resulting controller might be too stiff or expensive, sacrificing unnecessary performance for robustness that isn't truly needed.

### Step 4: Introducing the H∞ Norm

**Plain English:** The H∞ norm is a mathematical tool that quantifies this "worst-case amplification" of a system. For a dynamic system, it tells us the maximum possible "gain" or "amplification" that the system can apply to any input signal, considering all possible frequencies. It's like finding the loudest possible output from an amplifier, given any input signal within its operating range.

**Small Concrete Example:** If a sound amplifier has an H∞ norm of 20, it means that for *any* input sound signal, the output sound signal's "size" (e.g., peak amplitude or energy) will be at most 20 times the input's "size." If it's a filter, an H∞ norm of 0.1 means it attenuates all inputs by at least a factor of 10. For control, we want the H∞ norm from disturbances to errors to be small.

**Formal/Mathematical Version:** For a stable linear time-invariant (LTI) system with transfer function $G(s)$, its H∞ norm, denoted $\|G\|_{\infty}$, is defined as:

$$ \|G\|_{\infty} = \sup_{\omega} \bar{\sigma}(G(j\omega)) $$

Where:
*   $\sup_{\omega}$ means the "supremum" (the least upper bound or maximum value) over all frequencies $\omega \in \mathbb{R}$.
*   $G(j\omega)$ is the frequency response matrix of the system, obtained by substituting $s=j\omega$ into the transfer function matrix $G(s)$.
*   $\bar{\sigma}(M)$ denotes the maximum singular value of matrix $M$. The singular values of a matrix represent its principal gains or amplifications along different input directions. The maximum singular value tells us the maximum possible amplification a matrix can apply to any input vector.

So, the H∞ norm finds the largest possible amplification (maximum singular value) of the system's frequency response matrix across all possible input frequencies.

**What could go wrong:** Misinterpreting the H∞ norm as an average performance measure. It's a *peak* measure. A system could have a very low H∞ norm but still perform poorly at specific frequencies if those frequencies are not the worst-case. However, for robust control, we are specifically interested in limiting that peak.

### Step 5: The H∞ Control Problem

**Plain English:** The goal of H∞ control is to design a controller that makes the *closed-loop system's* H∞ norm (from disturbances to performance outputs) smaller than a certain desired value, often denoted $\gamma$ (gamma). We want to find a controller that makes the worst-case amplification of disturbances to our errors as small as possible.

**Small Concrete Example:** For our drone, we want to design a controller $K(s)$ such that the transfer function from wind gusts ($w$) to altitude error ($z$) has an H∞ norm less than, say, $\gamma = 0.1$ meters per (unit of wind strength). This means even the strongest possible wind gust (within design limits) will cause an altitude error of no more than 0.1 times its strength. We then try to find a controller that achieves the *smallest possible* $\gamma$.

**Formal/Mathematical Version:** Given a generalized plant $P(s)$ (which includes the system dynamics, disturbances, and performance outputs) and a controller $K(s)$, we form the closed-loop transfer function $T_{zw}(s)$ from the disturbance inputs $w$ to the regulated outputs $z$. The H∞ control problem is to find a stabilizing controller $K(s)$ such that:

$$ \|T_{zw}(s)\|_{\infty} < \gamma $$

for some prescribed $\gamma > 0$. The optimal H∞ control problem seeks to find a controller $K(s)$ that minimizes $\gamma$.

**What could go wrong:** It might not be possible to achieve a very small $\gamma$ due to fundamental limitations of the plant, or the controller required to achieve it might be too complex or impractical to implement (e.g., requiring very fast actuators or sensors).

### Step 6: The Standard Problem Formulation

**Plain English:** To solve the H∞ control problem mathematically, we need a standardized way to describe the system, disturbances, and performance goals. This involves creating a "generalized plant" that bundles everything except the controller into one big system.

**Small Concrete Example:** Instead of drawing separate boxes for the drone, wind, and error measurement, we put them all into one big "super-box" called the generalized plant. This super-box has two inputs (the actual control signal from our controller, and the external disturbances like wind) and two outputs (the signals our controller uses to make decisions, and the performance errors we want to minimize). Our controller then connects to this super-box.

**Formal/Mathematical Version:** The standard H∞ control problem considers a generalized plant $P(s)$ that has two sets of inputs and two sets of outputs:

*   **Inputs:**
    *   $w$: Exogenous inputs (disturbances, noise, reference signals).
    *   $u$: Control inputs (from the controller).
*   **Outputs:**
    *   $z$: Regulated outputs (performance outputs, errors we want to minimize).
    *   $y$: Measured outputs (signals fed back to the controller).

The generalized plant $P(s)$ can be partitioned as:
$$
P(s) = \begin{bmatrix} P_{11}(s) & P_{12}(s) \\ P_{21}(s) & P_{22}(s) \end{bmatrix}
$$
where:
*   $P_{11}(s)$: Transfer function from $w$ to $z$.
*   $P_{12}(s)$: Transfer function from $u$ to $z$.
*   $P_{21}(s)$: Transfer function from $w$ to $y$.
*   $P_{22}(s)$: Transfer function from $u$ to $y$ (this is often the plant we want to control).

The controller $K(s)$ takes $y$ as input and produces $u$ as output. The closed-loop transfer function from $w$ to $z$ is then given by the linear fractional transformation (LFT):

$$
T_{zw}(s) = P_{11}(s) + P_{12}(s) K(s) (I - P_{22}(s) K(s))^{-1} P_{21}(s)
$$

The H∞ control problem is to find a controller $K(s)$ that stabilizes the closed-loop system and minimizes $\|T_{zw}(s)\|_{\infty}$.

**What could go wrong:** Incorrectly partitioning $P(s)$ or defining the inputs/outputs. This is a crucial step; if the generalized plant is set up wrong, the resulting controller will not address the desired performance and robustness objectives.

## 5. Worked examples — multiple, with every step shown

Solving H∞ control problems fully involves sophisticated numerical algorithms (often based on solving Riccati equations), which are typically done using specialized software like MATLAB's Robust Control Toolbox. For an introductory lesson, we will focus on the *formulation* of the problem and the *interpretation* of the H∞ norm, rather than the full numerical solution of the controller.

---

### Example 1: Understanding the H∞ Norm for a Simple System

**Problem:** Consider a simple first-order system with the transfer function $G(s) = \frac{1}{s+a}$, where $a > 0$. Calculate its H∞ norm.

**Given:** System transfer function $G(s) = \frac{1}{s+a}$.
**Want:** The H∞ norm, $\|G\|_{\infty}$.

**Step 1: Substitute $s = j\omega$ to get the frequency response.**
$$
G(j\omega) = \frac{1}{j\omega + a}
$$
*Explanation:* The H∞ norm is defined in the frequency domain. We replace the Laplace variable $s$ with $j\omega$ to analyze the system's behavior across different frequencies.

**Step 2: Calculate the magnitude of the frequency response.**
$$
|G(j\omega)| = \left| \frac{1}{j\omega + a} \right| = \frac{|1|}{|j\omega + a|} = \frac{1}{\sqrt{\omega^2 + a^2}}
$$
*Explanation:* For a complex number $z = x + jy$, its magnitude is $|z| = \sqrt{x^2 + y^2}$. Here, the denominator $j\omega + a$ has a real part $a$ and an imaginary part $\omega$.

**Step 3: Find the supremum (maximum) of the magnitude over all frequencies $\omega \in \mathbb{R}$.**
We need to find the maximum value of $\frac{1}{\sqrt{\omega^2 + a^2}}$.
The denominator $\sqrt{\omega^2 + a^2}$ is minimized when $\omega^2$ is minimized, which occurs when $\omega = 0$.
At $\omega = 0$:
$$
|G(j0)| = \frac{1}{\sqrt{0^2 + a^2}} = \frac{1}{\sqrt{a^2}} = \frac{1}{a} \quad (\text{since } a > 0)
$$
As $|\omega| \to \infty$, $\sqrt{\omega^2 + a^2} \to \infty$, so $|G(j\omega)| \to 0$.
Thus, the maximum value of $|G(j\omega)|$ occurs at $\omega = 0$.

$$
\|G\|_{\infty} = \sup_{\omega} |G(j\omega)| = \frac{1}{a}
$$
*Explanation:* The H∞ norm is the peak gain of the system in the frequency domain. For this simple first-order low-pass filter, the maximum gain occurs at DC ($\omega=0$), where it acts as a simple amplifier with gain $1/a$.

**Final Answer:**
The H∞ norm of $G(s) = \frac{1}{s+a}$ is $\boxed{\frac{1}{a}}$.

*Reflection:* This example shows that for a stable system, the H∞ norm corresponds to the maximum magnitude of its frequency response. For a simple first-order system, this is straightforward to calculate and occurs at DC. It highlights that the H∞ norm quantifies the "worst-case" amplification for any sinusoidal input.

---

### Example 2: Formulating the Generalized Plant for a Simple Feedback System

**Problem:** Consider a standard unity feedback control system where the plant is $P(s)$, the controller is $K(s)$, and there is an additive disturbance $d$ at the plant input and measurement noise $n$ at the plant output. The control objective is to minimize the error $e = r - y$ (where $r$ is the reference input and $y$ is the plant output) and limit the control effort $u_c$. Formulate the generalized plant $P_{gen}(s)$ for an H∞ control problem where $w = \begin{bmatrix} r \\ d \\ n \end{bmatrix}$ are the exogenous inputs and $z = \begin{bmatrix} W_e e \\ W_u u_c \end{bmatrix}$ are the regulated outputs. $W_e$ and $W_u$ are scalar weighting functions.

**Given:**
*   Plant: $P(s)$
*   Controller: $K(s)$
*   Disturbances: $d$ (plant input disturbance), $n$ (measurement noise)
*   Reference: $r$
*   Control input: $u_c$
*   Plant output: $y$
*   Error: $e = r - y$
*   Regulated outputs: $z = \begin{bmatrix} W_e e \\ W_u u_c \end{bmatrix}$
*   Exogenous inputs: $w = \begin{bmatrix} r \\ d \\ n \end{bmatrix}$

**Want:** The generalized plant $P_{gen}(s)$ such that $z = P_{gen,11} w + P_{gen,12} u_c$ and $y_{meas} = P_{gen,21} w + P_{gen,22} u_c$.

**Step 1: Draw the block diagram and identify signals.**

```text
       r ----> (+)
                 ^
                 |
       d ----> (+) ----- u_c ----> |       | ----- y ----> (-) ----> e
                 |       |   P   |           ^       |
                 |       |       |           |       |
                 |       |-------|           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |
                 |                           |       |