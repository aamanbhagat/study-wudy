## What it is
The Net Change Theorem states that the definite integral of a rate of change gives the total net change. If $F'(x)$ is the rate of change of some quantity $F(x)$, then integrating that rate from $x=a$ to $x=b$ tells you the net change in $F(x)$ from $a$ to $b$. This is a direct application and re-interpretation of the Fundamental Theorem of Calculus, Part 2.

## Why it matters
This theorem is the bridge between instantaneous rates and accumulated quantities, a cornerstone of physical modeling. In rocket science, you integrate the variable mass flow rate of propellant to find the total mass expelled, which is essential for the Tsiolkovsky rocket equation. In physics, you integrate acceleration to find the change in velocity, and integrate velocity to find the net change in position (displacement).

## When to study it
You must be fluent with the following prerequisites. If not, master them first.
*   **Derivatives:** You must understand the derivative $f'(x)$ as the instantaneous rate of change of the function $f(x)$.
*   **Antiderivatives:** You must be able to find the general antiderivative of a function.
*   **The Definite Integral:** You must understand the definite integral $\int_a^b f(x) \, dx$ as the signed area under the curve of $f(x)$ from $x=a$ to $x=b$.
*   **The Fundamental Theorem of Calculus, Part 2 (FTC2):** You must know and be able to use the formula $\int_a^b f(x) \, dx = F(b) - F(a)$, where $F'(x) = f(x)$. The Net Change Theorem is FTC2 viewed through a physical lens.

## How to study it (step by step)
1.  **Re-read the FTC2.** Write down the Fundamental Theorem of Calculus, Part 2: $\int_a^b F'(x) \, dx = F(b) - F(a)$. Verbally state what each part means: "The definite integral of the derivative (the rate of change) from $a$ to $b$ equals the value of the original function at $b$ minus its value at $a$."
2.  **Translate into words.** The term $F(b) - F(a)$ is, by definition, the *net change* in the quantity $F$ as $x$ changes from $a$ to $b$. The term $F'(x)$ is the *rate of change* of $F$. So, the theorem literally says: $\text{Integral of rate of change} = \text{Net change}$.
3.  **Apply to motion.** Let $s(t)$ be the position of an object at time $t$. Its rate of change is velocity, $v(t) = s'(t)$. Substitute these into the FTC2 formula: $\int_a^b v(t) \, dt = s(b) - s(a)$. This reads: the integral of velocity from time $a$ to time $b$ is the object's final position minus its initial position—its displacement.
4.  **Solve a basic physics problem.** A particle's velocity is $v(t) = 2t$ m/s. Find its displacement from $t=1$ to $t=3$. Solution: Displacement = $\int_1^3 2t \, dt = [t^2]_1^3 = 3^2 - 1^2 = 8$ meters.
5.  **Distinguish Net Change from Total Amount.** Consider a particle with velocity $v(t) = 2t - 4$ m/s from $t=0$ to $t=4$.
    *   Calculate the **displacement (net change)**: $\int_0^4 (2t-4) \, dt = [t^2 - 4t]_0^4 = (16-16) - (0) = 0$ m. The particle ended where it started.
    *   Calculate the **total distance traveled**. This requires integrating the speed, $|v(t)|$. The velocity is negative for $t<2$ and positive for $t>2$. So, distance = $\int_0^4 |2t-4| \, dt = \int_0^2 -(2t-4) \, dt + \int_2^4 (2t-4) \, dt = [4t-t^2]_0^2 + [t^2-4t]_2^4 = (8-4) + ((16-16)-(4-8)) = 4 + 4 = 8$ m.
6.  **Generalize.** For any quantity $Q(t)$ with a rate of change $Q'(t) = r(t)$, the net change from $t=a$ to $t=b$ is $\int_a^b r(t) \, dt$. The final amount is $Q(b) = Q(a) + \int_a^b r(t) \, dt$, where $Q(a)$ is the initial amount.

## Key ideas, with intuition
1.  **The Integral is a Sum of Infinite Tiny Changes.**
    The core idea of integration is summing up infinitesimal pieces. The expression $F'(x) \, dx$ represents a tiny change in the quantity $F$. It's the rate of change ($F'(x)$) multiplied by a tiny step in $x$ ($dx$). The integral $\int_a^b F'(x) \, dx$ simply sums all these tiny changes from $a$ to $b$ to get the total net change.

2.  **FTC2 Provides the Master Shortcut.**
    Instead of actually performing an infinite summation (a Riemann sum), the Fundamental Theorem of Calculus gives us a spectacular shortcut. To find the sum of all the tiny changes, we only need to know the value of the quantity at the start and end points.
    $$
    \underbrace{\int_a^b F'(x) \, dx}_{\text{Sum of all tiny changes}} = \underbrace{F(b) - F(a)}_{\text{Final amount - Initial amount}}
    $$

3.  **Net Change vs. Total Change: The Critical Distinction.**
    The definite integral calculates *signed* area. Areas below the axis are negative. This is why it yields *net* change. If a rocket's velocity is positive (going up) and then negative (falling down), integrating $v(t)$ gives its final height minus its initial height (displacement). To find the total distance it traveled up and down, you must integrate its speed, $|v(t)|$, which makes all contributions positive.
    *   **Net Change:** $\int_a^b \text{rate} \, dt$
    *   **Total Change (Accumulation):** $\int_a^b |\text{rate}| \, dt$

## Worked example
**Problem:** A rocket motor burns propellant. The rate of mass ejection is given by $\dot{m}(t) = 200 - 2t$ kg/s for the first 20 seconds of flight ($0 \le t \le 20$). If the rocket initially contains 10,000 kg of propellant, how much propellant remains after 20 seconds?

**Solution:**
1.  **Identify the rate and the quantity.**
    The rate of change is the mass ejection rate, $\dot{m}(t) = 200 - 2t$ kg/s.
    The quantity is the mass of propellant, let's call it $M(t)$. So, $M'(t) = -\dot{m}(t)$ because the rocket's propellant mass is *decreasing*. Thus, the rate of change of propellant mass is $M'(t) = -(200-2t) = 2t-200$.

2.  **Set up the integral for net change.**
    We want to find the net change in propellant mass from $t=0$ to $t=20$.
    Net Change = $M(20) - M(0) = \int_0^{20} M'(t) \, dt = \int_0^{20} (2t - 200) \, dt$.

3.  **Evaluate the integral.**
    First, find the antiderivative of $2t - 200$.
    Antiderivative = $t^2 - 200t$.
    Now, apply the FTC2:
    $$
    [t^2 - 200t]_0^{20} = (20^2 - 200 \cdot 20) - (0^2 - 200 \cdot 0)
    $$
    $$
    = (400 - 4000) - 0 = -3600 \text{ kg}
    $$
    The net change is -3600 kg. This means 3600 kg of propellant was consumed.

4.  **Answer the final question.**
    The question asks for the propellant *remaining*.
    Remaining Mass = Initial Mass + Net Change
    $M(20) = M(0) + (M(20) - M(0))$
    $M(20) = 10000 \text{ kg} + (-3600 \text{ kg}) = 6400 \text{ kg}$.

**Reflection:**
*   Step 1 correctly identified the given function as a rate and related it to the quantity of interest, including the crucial negative sign.
*   Step 2 applied the Net Change Theorem directly to set up the definite integral.
*   Step 3 executed the mechanics of integration using the FTC2.
*   Step 4 used the result of the integration (the net change) to find the final state, which required knowing the initial state. This is a common pattern.

## Diagrams
Here is a diagram illustrating displacement (net change) versus total distance. Consider a velocity function $v(t)$ that is positive then negative.

```text
      v(t)
        ^
        |
   +    |     /
   +    |    /
  Area  |   /
   A1   |  /
   +    | /
--------+----------------> t
        | \       /
   -    |  \     /
  Area  |   \   /
   A2   |    \ /
   -    |

Displacement (Net Change) = Area A1 + Area A2  (where A2 is negative)
Total Distance Traveled   = Area A1 + |Area A2| (where we make A2 positive)
```

## Memory technique — remember this forever
1.  **Mnemonic:** "**I**ntegrating a **R**ate **G**ives **N**et **C**hange." (IRGNC). Or, more intuitively: "To find the pile, integrate the rate." Imagine water flowing into a bathtub. The flow rate is $r(t)$ (liters/sec). The total net change in the amount of water in the tub from time $a$ to time $b$ is the integral of that flow rate, $\int_a^b r(t) dt$.

2.  **Must-Know Formulas:**
    $$
    \int_a^b F'(x) \, dx = F(b) - F(a)
    $$
    $$
    \text{Final Amount} = \text{Initial Amount} + \int_{\text{start}}^{\text{end}} (\text{Rate of Change}) \, dt
    $$

3.  **Spaced Repetition Schedule:** Review this concept and re-do the worked example at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.** Set calendar reminders.

4.  **First Principles Pathway:** If you forget everything, rebuild it from the **Fundamental Theorem of Calculus, Part 2**.
    *   Start with $\int_a^b f(x) \, dx = F(b) - F(a)$, where $F'(x) = f(x)$.
    *   Think: "What does $f(x)$ represent?" It's the derivative of $F(x)$, so it's the *rate of change* of $F(x)$.
    *   Think: "What does $F(b) - F(a)$ represent?" It's the final value of the quantity minus the initial value. That is the definition of *net change*.
    *   Conclusion: The integral of a rate of change equals the net change. You have just re-derived the theorem.

## Common mistakes
1.  **Confusing Displacement and Distance.** The most common error. Calculating $\int_a^b v(t) \, dt$ for displacement when asked for total distance traveled. For distance, you must identify where $v(t) < 0$ and integrate $|v(t)|$, which often means splitting the integral into multiple parts.
2.  **Forgetting the Initial Condition.** The integral $\int_a^b F'(t) \, dt$ gives you the *change* in $F$, not the final value $F(b)$. To find the final value, you must add the initial value: $F(b) = F(a) + \text{change}$.
3.  **Sign Errors.** Misinterpreting rates. If water is *draining* from a tank at rate $r(t)$, the rate of change of the volume $V(t)$ is $V'(t) = -r(t)$. Forgetting this negative sign is a frequent mistake.

## Self-check
1.  A particle's velocity is given by $v(t) = 4t^3 - 2t$ cm/s. What is its displacement on the time interval $t \in [1, 2]$?
2.  The population of a bacterial colony grows at a rate of $P'(t) = 100e^{0.5t}$ bacteria per hour. If the initial population at $t=0$ is 500, what is the population at $t=4$?
3.  An object is launched vertically. Its velocity is $v(t) = 50 - 9.8t$ m/s. Calculate its displacement and its total distance traveled during the first 10 seconds. Use your results to find its maximum height above the starting point.