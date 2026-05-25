## What it is
Standard Proportional Navigation (PN) assumes an interceptor and target are operating in a gravity-free vacuum. Augmented Proportional Navigation (APN) with gravity compensation modifies the baseline PN guidance law by injecting a specific mathematical term to account for the predictable pull of gravity. Instead of waiting for gravity to drag the interceptor off its collision triangle and then correcting the resulting error, APN anticipates the gravitational drop and commands extra acceleration to cancel it out optimally.

## Why it matters
In the real world, endo-atmospheric missiles (like the Patriot or AIM-9X) and planetary landers do not fly in vacuums. If an interceptor uses standard PN in a gravity field, gravity acts as a continuous disturbance. The interceptor will "sag" below the target, causing a continuous Line-of-Sight (LOS) rate error. The interceptor will attempt to correct this late in the flight, requiring a massive, inefficient acceleration spike just before intercept—often exceeding the vehicle's structural or aerodynamic limits. APN prevents this late-game saturation.

## When to study it
You must already possess a rock-solid understanding of:
1. Kinematics of relative motion and rotating reference frames.
2. The small-angle approximations used in guidance.
3. Standard Proportional Navigation ($a_c = N V_c \dot{\lambda}$).
4. The concept of Zero-Effort Miss (ZEM). 
If you cannot derive standard PN from the ZEM formulation, stop here and review optimal control for basic PN.

## How to study it (step by step)
1. **Define the coordinate system:** Set up a 1D axis perpendicular to the initial Line-of-Sight (LOS). Let this be the $z$-axis.
2. **Write the relative acceleration equation:** Include the target acceleration ($a_T$), the interceptor's commanded aerodynamic acceleration ($a_c$), and the component of gravity acting perpendicular to the LOS ($g_n$). 
3. **Formulate the Zero-Effort Miss (ZEM):** Write the kinematic equation for where the interceptor will end up at time $t_{go}$ if it issues zero aerodynamic commands ($a_c = 0$).
4. **Apply the optimal control law:** Use the established relationship that optimal commanded acceleration is proportional to ZEM divided by the square of time-to-go: $a_c = \frac{N}{t_{go}^2} \text{ZEM}$.
5. **Separate the terms:** Break the resulting equation into the standard PN term (dependent on LOS rate) and the APN gravity compensation term.

## Key ideas, with intuition
**1. Zero-Effort Miss (ZEM) is the core of modern guidance.**
ZEM is the distance by which you will miss the target if you turn off your engines and fins right now. For a non-accelerating target in a vacuum, $ZEM = z + \dot{z}t_{go}$. 

**2. Gravity is just a "ghost target" accelerating away from you.**
If gravity pulls the interceptor downward with acceleration $g_n$ (perpendicular to the LOS), the relative kinematic acceleration between target and interceptor is $\ddot{z}_{rel} = a_T - (a_c - g_n)$. If we do nothing ($a_c = 0$), gravity causes the interceptor to fall away from the collision triangle. The new ZEM becomes:
$$ZEM = z + \dot{z}t_{go} + \frac{1}{2}g_n t_{go}^2$$
*(Assuming the target is supported by the ground and not falling. If both are in freefall, relative gravity is zero).*

**3. The Optimal APN Law**
Optimal control dictates that to minimize the integral of acceleration squared (saving energy), you must command:
$$a_c = \frac{N}{t_{go}^2} ZEM$$
Substitute our gravity-adjusted ZEM into this law:
$$a_c = \frac{N}{t_{go}^2} \left( z + \dot{z}t_{go} \right) + \frac{N}{t_{go}^2} \left( \frac{1}{2}g_n t_{go}^2 \right)$$
Recognizing that $\frac{z + \dot{z}t_{go}}{t_{go}^2} = V_c \dot{\lambda}$ (where $V_c$ is closing velocity and $\dot{\lambda}$ is LOS rate), we get:
$$a_c = N V_c \dot{\lambda} + \frac{N}{2}g_n$$

**Intuition check:** Notice the factor of $\frac{N}{2}$. If your navigation constant $N=3$, you do not just command $1g$ to cancel gravity. You command $1.5g$. Why? Because optimal control "lofts" the trajectory slightly to minimize total maneuver effort over the entire flight, rather than just statically fighting gravity at every instant.

## Worked example
**Scenario:** A missile is flying horizontally to strike a stationary ground target. The closing velocity $V_c = 1000 \text{ m/s}$. The navigation constant $N = 3$. The LOS is exactly horizontal, meaning gravity ($g = 9.81 \text{ m/s}^2$) acts entirely perpendicular to the LOS. The missile is perfectly on a collision triangle, so $\dot{\lambda} = 0$.

**Question:** What is the commanded acceleration $a_c$?

**Step 1: Identify the components.**
*   Standard PN term: $N V_c \dot{\lambda} = 3 \times 1000 \times 0 = 0$.
*   Gravity normal to LOS: $g_n = 9.81 \text{ m/s}^2$.

**Step 2: Apply the APN gravity compensation formula.**
$$a_c = N V_c \dot{\lambda} + \frac{N}{2} g_n$$
$$a_c = 0 + \frac{3}{2} (9.81)$$
$$a_c = 14.715 \text{ m/s}^2$$

**Reflection:** Even though the missile is perfectly on course ($\dot{\lambda} = 0$), it commands $1.5g$ upwards. If it only commanded $1g$, it would maintain a flat trajectory. By commanding $1.5g$, it deliberately lofts upward early in the flight. As time progresses, this lofting creates a negative LOS rate, which the standard PN term will eventually fight against, resulting in a smooth, energy-efficient curve that arrives at the target with zero acceleration effort at the exact moment of intercept.

## Diagrams

```text
                      Target (Stationary)
                      [T]
                       |
                       |
                       |  Line of Sight (LOS)
                       |  Angle λ
                       |
                      /
                     /
                    /
                   /
                 [M] Interceptor
                  |
                  | Gravity (g)
                  v

Vector Decomposition at Interceptor [M]:

       / LOS
      /
    [M] ---> g_parallel (does not affect ZEM directly)
     |
     |
     v  g_normal = g * cos(λ)
```
*Note: The compensation term $\frac{N}{2}g_n$ only applies to the component of gravity perpendicular to the LOS. The parallel component merely affects closing velocity $V_c$, which is handled naturally by the $V_c$ term in the standard PN equation.*

## Memory technique — remember this forever
1. **The Mnemonic:** "Gravity is a Ghost Target." Treat gravity pulling you down exactly as if the target is accelerating up. 
2. **The Formulas to Overlearn:**
   * $ZEM_{APN} = ZEM_{PN} \pm \frac{1}{2}a_{disturbance}t_{go}^2$
   * $a_c = N V_c \dot{\lambda} + \frac{N}{2}a_{disturbance}$
3. **Spaced Repetition Schedule:** Review this derivation at 1 day, 3 days, 7 days, 16 days, and 35 days. Write out the ZEM-to-Command derivation blindly.
4. **First Principles Pathway:** If you forget the $\frac{N}{2}$ factor, remember: $a_c$ scales with $ZEM / t_{go}^2$. The kinematic formula for distance under constant acceleration has a $\frac{1}{2}$ in it ($\frac{1}{2}at^2$). When you divide $\frac{1}{2}at^2$ by $t^2$, the $\frac{1}{2}$ survives. Multiply by $N$, and you get $\frac{N}{2}$.

## Common mistakes
1. **Static 1g Cancellation:** Students often assume gravity compensation means just adding $1g$ (or $g \cos \lambda$) to the command. This is called *Gravity Bias*, a suboptimal hack. True APN derived from optimal control requires the $\frac{N}{2}$ multiplier.
2. **Applying compensation to the wrong axis:** Gravity pulls down in the inertial frame. Guidance commands are executed perpendicular to the LOS. You must project the gravity vector onto the axis normal to the LOS ($g \cos \lambda$).
3. **Double-counting in space:** If both the interceptor and target are in orbital freefall (e.g., ASAT weapons), they are in the same gravity field. Relative gravitational acceleration is effectively zero. Do not apply gravity compensation here.

## Self-check
1. Calculate the APN command for an interceptor where $N=4$, $V_c=1000 \text{ m/s}$, $\dot{\lambda}=0.01 \text{ rad/s}$, and gravity ($9.8 \text{ m/s}^2$) is acting exactly perpendicular to the LOS.
2. Prove mathematically that if an engineer sets the navigation constant $N=2$, the optimal gravity compensation happens to exactly equal static $1g$ cancellation. 
3. An interceptor is in a steep dive, meaning the LOS angle is -80 degrees from the horizontal. How does the magnitude of the gravity compensation term compare to when the interceptor was flying horizontally?