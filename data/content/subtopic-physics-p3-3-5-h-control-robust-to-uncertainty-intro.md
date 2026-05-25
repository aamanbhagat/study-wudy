## What it is
$H_\infty$ (H-infinity) control is a mathematical framework for synthesizing controllers that guarantee system stability and performance even when the mathematical model of the plant is inaccurate. It frames control design as a minimax optimization problem: you design a controller that minimizes the maximum possible amplification of worst-case disturbances and model uncertainties across all frequencies.

## Why it matters
In aerospace, your plant model is never perfect. Rockets lose mass dynamically, structural bending modes shift with temperature, and aerodynamic coefficients are approximations from wind tunnels. Classical control (like PID) or optimal control (like LQR) can become catastrophically unstable if the real vehicle deviates from the model. $H_\infty$ control is the industry standard for robust flight control—used in modern fighter jets and launch vehicles—because it mathematically guarantees the vehicle will not lose control as long as the physical reality stays within a bounded envelope of uncertainty.

## When to study it
Do not attempt $H_\infty$ synthesis until you have mastered:
1. **Linear Algebra:** Specifically Singular Value Decomposition (SVD).
2. **State-Space Control:** Multivariable systems ($\dot{x} = Ax + Bu$), controllability, and observability.
3. **Frequency Domain Analysis:** Bode plots, Nyquist stability criterion, and transfer function matrices.
4. **Basic Robustness:** The Sensitivity ($S$) and Complementary Sensitivity ($T$) functions.

If you do not intuitively understand why $S + T = I$, stop and review classical feedback loop shaping.

## How to study it (step by step)
1. **Understand the $H_\infty$ Norm:** Define it mathematically as the peak of the maximum singular value of a transfer function matrix over all frequencies.
2. **Master the Standard Configuration:** Draw the P-K block diagram. Learn to pack your physical plant, disturbances, and performance metrics into the Generalized Plant matrix $P$.
3. **Study the Fundamental Trade-off:** Prove to yourself that Sensitivity $S = (I+GK)^{-1}$ and Complementary Sensitivity $T = GK(I+GK)^{-1}$ sum to the identity matrix $I$. 
4. **Design Weighting Functions:** Practice shaping frequency weights. Use a low-pass filter $W_1$ to bound $S$ (demanding low-frequency tracking) and a high-pass filter $W_3$ to bound $T$ (demanding high-frequency robustness against unmodeled dynamics).
5. **Formulate the Mixed-Sensitivity Problem:** Set up the cost function $|| [W_1 S ; W_3 T]^T ||_\infty < 1$.
6. **Synthesize via Software:** The math to solve the Riccati equations for $H_\infty$ is tedious to do by hand. Use MATLAB (`hinfsyn`) or Python's `python-control` library to synthesize a controller for a simple 2nd-order system and plot the resulting singular values.

## Key ideas, with intuition

**The $H_\infty$ Norm**
For a stable transfer function matrix $G(s)$, the $H_\infty$ norm is the maximum energy gain from the input to the output. 
$$ ||G||_\infty = \sup_{\omega} \bar{\sigma}(G(j\omega)) $$
where $\bar{\sigma}$ is the maximum singular value. 
*Intuition:* If you look at a Bode magnitude plot, the $H_\infty$ norm is simply the highest peak of the curve. Bounding this norm bounds the worst-case scenario.

**The Minimax Game**
Think of nature as an adversary. Nature chooses a disturbance $w$ to maximize your tracking error $z$. You choose a controller $K$ to minimize it.
$$ \min_{K} \max_{w \neq 0} \frac{||z||_2}{||w||_2} $$
By minimizing the $H_\infty$ norm of the closed-loop system, you are minimizing the worst possible damage nature can do.

**Mixed Sensitivity Shaping**
You cannot make a system perfectly reject disturbances ($S=0$) and perfectly immune to sensor noise/uncertainty ($T=0$) simultaneously because $S + T = I$. 
Instead, we use frequency weights. We want $|S|$ small at low frequencies (where commands and wind gusts live) and $|T|$ small at high frequencies (where sensor noise and structural bending modes live). We enforce this by finding a $K$ such that:
$$ \left\| \begin{bmatrix} W_1 S \\ W_3 T \end{bmatrix} \right\|_\infty < 1 $$

## Worked example
**Problem:** We have an unstable rocket modeled as a 1st-order system $G(s) = \frac{1}{s-1}$. We want to design a proportional controller $K(s) = k$ to stabilize it and ensure the sensitivity $S(s)$ is heavily suppressed at low frequencies. We define our performance weight as $W_1(s) = \frac{10}{s+1}$. Find the minimum gain $k$ that satisfies the $H_\infty$ performance bound $||W_1 S||_\infty < 1$.

**Step 1: Formulate the Sensitivity Function**
$$ S(s) = \frac{1}{1 + G(s)K(s)} = \frac{1}{1 + \frac{k}{s-1}} = \frac{s-1}{s-1+k} $$
For internal stability, the closed-loop pole must be in the Left Half Plane. Root is at $s = 1-k$. Therefore, we require $k > 1$.

**Step 2: Apply the Weight**
We need to bound the weighted sensitivity:
$$ W_1(s) S(s) = \left( \frac{10}{s+1} \right) \left( \frac{s-1}{s-1+k} \right) $$

**Step 3: Evaluate the $H_\infty$ norm**
We need the maximum magnitude of this function over all frequencies $s = j\omega$ to be strictly less than 1.
$$ |W_1(j\omega) S(j\omega)|^2 = \frac{100 (\omega^2 + 1)}{(\omega^2 + 1)(\omega^2 + (k-1)^2)} = \frac{100}{\omega^2 + (k-1)^2} $$
Notice that the $(\omega^2+1)$ terms cancel out. The maximum value of this function occurs when the denominator is smallest, which is at $\omega = 0$ (DC).
$$ ||W_1 S||_\infty = \sqrt{\frac{100}{(k-1)^2}} = \frac{10}{k-1} $$

**Step 4: Solve for $k$**
$$ \frac{10}{k-1} < 1 \implies k - 1 > 10 \implies k > 11 $$

*Reflection:* By defining a strict $H_\infty$ bound ($||W_1 S||_\infty < 1$), we mathematically captured both the requirement for stability (overpowering the RHP pole at $+1$) and the requirement for performance (rejecting low-frequency disturbances by a factor of 10), yielding a direct constraint on our controller gain.

## Diagrams

The Standard Configuration (P-K form). Every $H_\infty$ problem is reduced to this exact topology before synthesis.

```text
      Disturbances/Noise                 Regulated Errors
      (w) +-----------------------+ (z)  (e.g., control effort, tracking error)
  ------->|                       |------->
          |   Generalized Plant   |
          |          (P)          |
      (u) |                       | (y)  Measurements
  +------>|                       |-------+
  |       +-----------------------+       |
  |                                       |
  |             +-----------+             |
  |             |           |             |
  +-------------|    K      |<------------+
  Control       |           |
  Inputs        +-----------+
```
*Note:* $P$ contains the physical plant $G$, but it *also* contains the frequency weights $W_1, W_2, W_3$ and the routing that defines $S$ and $T$. 

## Memory technique — remember this forever
1. **Mnemonic:** "$H_\infty$ is the **H**ighest peak of the Worst-case Wave." 
2. **Must-know formulas:**
   * $||G||_\infty = \sup_{\omega} \bar{\sigma}(G(j\omega))$
   * $S + T = I$
   * $|| [W_1 S ; W_3 T]^T ||_\infty < 1$
3. **Spaced-repetition schedule:** Review this concept and re-derive the worked example at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the setup, remember the physical reality: you have a disturbance $w$ and a noise $n$. Disturbance to output is $S$. Noise to output is $T$. You can't zero both out because $S+T=I$. Therefore, you *must* use frequency-dependent weights to push $S$ down at low frequencies and $T$ down at high frequencies.

## Common mistakes
1. **Forgetting the $S+T=I$ constraint:** Students often try to specify weights that demand perfect tracking (low $S$) and perfect noise rejection (low $T$) at the *same* frequency (usually the crossover region). The solver will fail. The weights must cross over gracefully.
2. **Confusing $H_2$ and $H_\infty$:** $H_2$ control (like LQR/LQG) minimizes the *average* energy (RMS) assuming white noise inputs. $H_\infty$ minimizes the absolute *worst-case* peak. Use $H_2$ for fuel efficiency; use $H_\infty$ to survive unmodeled physics.
3. **Over-weighting control effort:** If you make the penalty on control effort ($W_2$) too small, $H_\infty$ will synthesize a controller with massive, high-frequency gains that will instantly saturate your actuators in reality.

## Self-check
1. If a system's sensitivity function is $S(s) = \frac{s}{s+10}$, what is the exact $H_\infty$ norm of $S(s)$?
2. In the mixed-sensitivity problem, why must the robustness weight $W_3(s)$ typically act as a high-pass filter rather than a low-pass filter?
3. Using the standard P-K block diagram, if $P$ is partitioned into $\begin{bmatrix} P_{11} & P_{12} \\ P_{21} & P_{22} \end{bmatrix}$, write the closed-loop transfer function matrix from $w$ to $z$ (known as the Linear Fractional Transformation, $\mathcal{F}_l(P,K)$).