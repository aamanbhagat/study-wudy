## What it is
Optimal staging is the process of distributing a rocket's total required velocity change ($\Delta V$) among its multiple stages to maximize the final payload mass. For the common case where all stages have the same specific impulse ($I_{sp}$) and structural efficiency, the optimal solution is to make the mass ratio of every stage identical. This results in each stage contributing an equal amount of $\Delta V$.

## Why it matters
This principle is the bedrock of multi-stage launch vehicle design, from Falcon 9 to the Space Launch System. Getting staging wrong means wasting millions of dollars on a rocket that either can't reach its target orbit or carries less payload than it could. Understanding this optimization is the first step toward designing efficient, real-world vehicles where stages have different performance characteristics.

## When to study it
You must have a firm grasp of the **Tsiolkovsky Rocket Equation**. You should also be comfortable with the definitions of **mass ratio ($MR$)**, **payload ratio ($\lambda$)**, and **structural ratio ($\epsilon$)**. The derivation from first principles requires differential calculus, specifically constrained optimization using **Lagrange multipliers**.

## How to study it (step by step)
1.  **Review the Rocket Equation**: Write down the Tsiolkovsky Rocket Equation, $\Delta V = c \ln(MR)$, where $c = I_{sp} \cdot g_0$ is the effective exhaust velocity and $MR = m_0/m_f$ is the mass ratio. Convince yourself that for a two-stage rocket, the total $\Delta V$ is $\Delta V_{total} = \Delta V_1 + \Delta V_2$.
2.  **Define the System**: For a two-stage rocket, write the total initial mass $m_{0,1}$ in terms of its parts: propellant, structure, and payload. Remember that the "payload" of the first stage ($m_{p,1}$) is the entire initial mass of the second stage ($m_{0,2}$). The final payload is $m_p$.
3.  **Frame the Optimization Problem**: The goal is to maximize the final payload mass $m_p$ for a given total initial mass $m_{0,1}$ and a fixed total $\Delta V_{total}$. This is equivalent to minimizing $m_{0,1}$ for a fixed $m_p$ and $\Delta V_{total}$. We will solve for the distribution of $\Delta V$ between the stages ($\Delta V_1$ and $\Delta V_2$) that achieves this.
4.  **Derive the Condition**: Use the method of Lagrange multipliers to minimize the total mass ratio, $MR_{total} = m_{0,1}/m_p$, subject to the constraint $\Delta V_1 + \Delta V_2 = \Delta V_{total}$. Assume identical stage characteristics ($c_1 = c_2 = c$ and $\epsilon_1 = \epsilon_2 = \epsilon$). The derivation will show that the minimum occurs when $\Delta V_1 = \Delta V_2$, which implies $MR_1 = MR_2$.
5.  **Generalize**: Extend the logic from two stages to $N$ stages. For $N$ identical stages, the optimal distribution is $\Delta V_i = \Delta V_{total} / N$, leading to the mass ratio for each stage being $MR_i = e^{\Delta V_{total} / (N \cdot c)}$.
6.  **Solve a Problem**: Use the formulas derived to solve a numerical problem, such as the one in the worked example below. Compare the payload fraction for the optimal case versus a deliberately non-optimal case (e.g., $\Delta V_1 = 3$ km/s, $\Delta V_2 = 6$ km/s) to see the difference.

## Key ideas, with intuition
1.  **Diminishing Returns**: The rocket equation has a natural logarithm, $\Delta V \propto \ln(MR)$. This means each additional kilogram of propellant buys you less $\Delta V$ than the one before it, because you must also accelerate that new propellant. Staging is the fundamental solution to this problem.
2.  **Shedding Dead Weight**: The purpose of staging is to discard useless mass—empty tanks and engines—so that subsequent stages don't have to waste energy accelerating it. This dramatically improves the mass ratio for the upper stages.
3.  **The "Fair Share" Principle**: When all your stages are equally efficient (same $I_{sp}$), it's intuitively optimal for them to do an equal amount of work. The math shows that "equal work" in this context means providing the same $\Delta V$. This, in turn, requires them to have the same mass ratio. If one stage does more work, it suffers more from the law of diminishing returns, making the overall system less efficient.
    $$ \Delta V_{total} = \sum_{i=1}^{N} \Delta V_i = \sum_{i=1}^{N} c_i \ln(MR_i) $$
    For $c_1=c_2=...=c_N$, the optimum is found when $\Delta V_1 = \Delta V_2 = ... = \Delta V_N$.

## Worked example
A two-stage launch vehicle must provide a total $\Delta V$ of $9.0$ km/s to reach orbit. Both stages use engines with an $I_{sp}$ of $450$ s and have a structural ratio $\epsilon$ of $0.10$. Determine the optimal mass ratio for each stage and the overall payload ratio of the vehicle.

**1. Calculate Exhaust Velocity**
The effective exhaust velocity $c$ is constant for both stages.
$$ c = I_{sp} \cdot g_0 = 450 \, \text{s} \cdot 9.81 \, \text{m/s}^2 \approx 4414.5 \, \text{m/s} = 4.4145 \, \text{km/s} $$
*This step converts the performance metric $I_{sp}$ into a velocity, which is the natural unit for the rocket equation.*

**2. Distribute $\Delta V$**
Since both stages have the same $I_{sp}$, the optimal distribution is an equal $\Delta V$ per stage.
$$ \Delta V_1 = \Delta V_2 = \frac{\Delta V_{total}}{N} = \frac{9.0 \, \text{km/s}}{2} = 4.5 \, \text{km/s} $$
*This is the core principle of optimal staging for identical stages: divide the work equally.*

**3. Calculate Per-Stage Mass Ratio**
Use the Tsiolkovsky Rocket Equation for a single stage to find the required mass ratio, $MR$.
$$ MR = e^{\Delta V_{stage} / c} = e^{4.5 / 4.4145} \approx e^{1.019} \approx 2.77 $$
So, $MR_1 = MR_2 = 2.77$.
*This tells us how much mass each stage must shed (as propellant) relative to its initial mass to achieve its required $\Delta V$.*

**4. Calculate Per-Stage Payload Ratio**
The payload ratio of a single stage, $\lambda_i = m_{p,i}/m_{0,i}$, relates its mass ratio ($MR_i$) and structural ratio ($\epsilon_i$). The formula is:
$$ \lambda_i = \frac{MR_i - \frac{MR_i - 1}{1-\epsilon_i}}{MR_i} = \frac{1 - \epsilon_i MR_i}{MR_i(1-\epsilon_i)} $$
Let's use a more intuitive form derived from $MR = \frac{m_0}{m_f} = \frac{m_p+m_s+m_{prop}}{m_p+m_s}$ and $\epsilon = \frac{m_s}{m_s+m_{prop}}$.
From $\epsilon$, we get $m_s+m_{prop} = m_s/\epsilon$.
$m_0 = m_p + m_s/\epsilon$.
$m_f = m_p + m_s$.
$MR = \frac{m_p + m_s/\epsilon}{m_p+m_s}$. Rearranging for $m_p/m_s$ gives $\frac{m_p}{m_s} = \frac{1 - MR}{MR\epsilon - 1/\epsilon}$. This is getting messy.
Let's use the standard formula relating these quantities:
$$ MR = \frac{1+\lambda}{\epsilon+\lambda} $$
Rearranging for $\lambda$:
$$ \lambda = \frac{1 - MR \cdot \epsilon}{MR - 1} $$
Plugging in our values:
$$ \lambda_{stage} = \frac{1 - (2.77)(0.10)}{2.77 - 1} = \frac{1 - 0.277}{1.77} = \frac{0.723}{1.77} \approx 0.4085 $$
*This calculates the efficiency of a single stage: for every 100 kg of stage mass, 40.85 kg is payload for that stage.*

**5. Calculate Overall Payload Ratio**
The overall payload ratio is the product of the individual stage payload ratios.
$$ \lambda_{total} = \lambda_1 \cdot \lambda_2 = (\lambda_{stage})^2 = (0.4085)^2 \approx 0.167 $$
The final payload is approximately 16.7% of the total liftoff mass.
*This final step combines the performance of each stage to find the vehicle's end-to-end efficiency.*

## Diagrams
A two-stage rocket showing mass components:

```text
      ^
      |  Payload
+-------------+
|    m_p      |
+-------------+ --+
|   m_s2      |   |
|-------------|   | m_02 (Stage 2)
|   m_prop2   |   |
+-------------+ --+
|   m_s1      |   |
|-------------|   | m_01 (Total Vehicle)
|   m_prop1   |   |
+-------------+ --+
      |
     Thrust
```

## Memory technique — remember this forever
1.  **The Story**: "Fair Share Staging". Imagine a team of identical twin movers carrying a piano up a long flight of stairs. The most efficient method is for each twin to carry it an equal number of floors. If one tries to carry it further, they get disproportionately tired (diminishing returns), making the total effort harder than it needed to be. *Identical stages do identical work ($\Delta V$).*
2.  **Must-Know Formulas**:
    $$ \Delta V_{total} = \sum_{i=1}^{N} \Delta V_i $$
    $$ \text{For identical stages: } \Delta V_i = \frac{\Delta V_{total}}{N} $$
    $$ MR_i = e^{\Delta V_i / c} $$
3.  **Spaced Repetition**: Review this concept and re-derive the result at 1 day, 3 days, 7 days, 16 days, and 35 days.
4.  **First Principles Pathway**: If you forget the result, remember you are **minimizing initial mass for a fixed payload and $\Delta V$**. This is a constrained optimization problem. The variables are the individual $\Delta V_i$. The constraint is $\sum \Delta V_i = \Delta V_{total}$. Formulate the Lagrangian and solve $\nabla L = 0$. The result $\Delta V_1 = \Delta V_2 = ...$ will emerge directly from the calculus, assuming identical $c_i$ and $\epsilon_i$.

## Common mistakes
1.  **Assuming Equal $\Delta V$ is Always Optimal**: This is only true for stages with identical performance ($I_{sp}$) and structural ratios ($\epsilon$). If an upper stage is more efficient (higher $I_{sp}$), it should be tasked with providing a larger share of the total $\Delta V$.
2.  **Confusing Stage Payload with Final Payload**: The "payload" of the first stage ($m_{p,1}$) is the entire mass of the second stage ($m_{0,2}$). The "payload" of the second stage ($m_{p,2}$) is the final payload ($m_p$) that reaches the destination.
3.  **Algebraic Errors in the Payload Ratio Formula**: The relationship between $MR$, $\epsilon$, and $\lambda$ is messy and easy to mis-derive or misremember. Always double-check it or derive it from the fundamental definitions: $MR = m_0/m_f$ and $\epsilon = m_s/(m_s+m_{prop})$.

## Self-check
1.  A three-stage rocket uses identical stages, each with an $I_{sp}$ of 320 s. The mission requires a total $\Delta V$ of 12 km/s. What is the required mass ratio for each stage?
2.  For the rocket in the previous question, if the structural ratio $\epsilon$ of each stage is 0.12, what is the overall payload ratio of the vehicle (i.e., final payload mass / total initial mass)?
3.  Consider a two-stage rocket where the first stage is a powerful kerosene engine ($I_{sp} \approx 310$ s) and the second stage is an efficient vacuum-optimized hydrogen engine ($I_{sp} \approx 460$ s). To maximize payload for a given total $\Delta V$, should the first stage provide more than, less than, or exactly half of the total $\Delta V$? Justify your answer conceptually.