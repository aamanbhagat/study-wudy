## What it is
The root locus is a graphical method that reveals how the roots of a closed-loop system's characteristic equation (its poles) move through the complex plane as a single parameter—usually the controller gain, $K$—varies from zero to infinity. Evans' method provides a set of geometric rules to sketch these trajectories by hand, allowing you to bypass solving high-order polynomials for every possible value of $K$.

## Why it matters
In aerospace control, you must know if cranking up the gain on a pitch-rate controller will drive your vehicle unstable (pushing poles into the right-half plane). Root locus allows you to instantly visualize the trade-offs between response speed, damping ratio, and stability margins before writing any flight software. It is the bridge between abstract transfer functions and the physical transient response of a rocket or aircraft.

## When to study it
You must already be fluent in Laplace transforms, transfer functions (specifically open-loop poles and zeros), and block diagram algebra. You also need a rock-solid grasp of complex numbers and the characteristic equation of a closed-loop system. If you cannot instantly tell me why a pole in the right-half plane dictates physical instability, go back and review linear time-invariant (LTI) systems. Do not attempt Evans' method until you understand what a pole physically represents.

## How to study it (step by step)
1. **Master the foundation:** Write the closed-loop characteristic equation $1 + K L(s) = 0$ and rearrange it to $L(s) = -1/K$. 
2. **Derive the twin conditions:** From $L(s) = -1/K$, derive the Angle Condition and the Magnitude Condition. Realize that Evans' rules are just geometric shortcuts for the Angle Condition.
3. **Learn the start/end points:** Prove to yourself why the locus starts ($K=0$) at open-loop poles and ends ($K \to \infty$) at open-loop zeros.
4. **Master the real-axis rule:** Understand why a point on the real axis is only on the locus if an odd number of real poles/zeros lie to its right.
5. **Derive asymptotes:** Learn the formulas for the asymptote centroid ($\sigma_a$) and angles ($\theta_a$) for systems where poles outnumber zeros. 
6. **Calculate breakaway points:** Practice finding where roots collide and split by solving $\frac{dK}{ds} = 0$.
7. **Sketch manually:** Sketch 5 different systems by hand using these rules before you ever verify them with MATLAB or Python.

## Key ideas, with intuition

**1. The First Principle: $1 + K L(s) = 0$**
For a standard negative feedback loop with forward path $G(s)$, feedback $H(s)$, and gain $K$, the closed-loop transfer function is $\frac{KG(s)}{1 + K G(s)H(s)}$. 
The system poles are the roots of the denominator:
$$ 1 + K L(s) = 0 \implies L(s) = -\frac{1}{K} $$
where $L(s) = G(s)H(s)$ is the open-loop transfer function.

**2. The Angle Condition (The "Where")**
Because $K$ is a positive real number ($K > 0$), $-1/K$ is a negative real number. Therefore, for any complex number $s$ to be on the root locus, the phase angle of $L(s)$ must be exactly $180^\circ$ (or an odd multiple thereof):
$$ \angle L(s) = (2q + 1)180^\circ \quad \text{for } q = 0, \pm 1, \pm 2, \dots $$
*Intuition:* Every rule of Evans' method is just a geometric trick to find points in the complex plane where the angles from all open-loop poles and zeros sum to $180^\circ$.

**3. The Magnitude Condition (The "When")**
Once you find a point $s$ that satisfies the angle condition, you can find the exact gain $K$ that puts a closed-loop pole there by taking the magnitude:
$$ |L(s)| = \frac{1}{K} \implies K = \frac{1}{|L(s)|} $$

## Worked example
**System:** Sketch the root locus for $L(s) = \frac{1}{s(s+2)}$.

**Step 1: Start and End points**
Open-loop poles ($n=2$): $s = 0, -2$. 
Open-loop zeros ($m=0$): None. 
The locus starts at $0$ and $-2$. Because $n > m$, both branches must travel to infinity.

**Step 2: Real-axis locus**
Test points on the real axis. Between $0$ and $-2$, there is exactly one pole (at $s=0$) to the right. $1$ is odd, so the segment $[-2, 0]$ is on the locus.

**Step 3: Asymptotes**
Number of asymptotes = $n - m = 2$.
Angles: $\theta_a = \frac{(2q+1)180^\circ}{2} = 90^\circ, 270^\circ$.
Centroid: $\sigma_a = \frac{\sum \text{poles} - \sum \text{zeros}}{n - m} = \frac{(0 - 2) - 0}{2} = -1$.
The asymptotes are vertical lines intersecting the real axis at $-1$.

**Step 4: Breakaway points**
Rearrange characteristic equation for $K$:
$$ 1 + \frac{K}{s(s+2)} = 0 \implies K = -s^2 - 2s $$
Differentiate with respect to $s$ and set to zero:
$$ \frac{dK}{ds} = -2s - 2 = 0 \implies s = -1 $$
The roots collide at $s=-1$ and break away vertically.

*Reflection:* The rules perfectly map the physics. At $K=0$, the system is sluggish (pole at $0$). As $K$ increases, the roots move together, meeting at $s=-1$ (critically damped). Increasing $K$ further causes them to split vertically along $s = -1 \pm j\omega$; the system oscillates faster, but the real part stays at $-1$, meaning the exponential decay envelope (settling time) remains constant.

## Diagrams

```text
Root Locus for L(s) = 1 / (s(s+2))

       j\omega
          ^
          |
          |       ^
          |       | K -> infinity
          |       |
          |       |
----------X-------*-------X--------> \sigma (Real)
         -2       |      0
                  |
                  |
                  | K -> infinity
                  v
          |
          |
```
*Legend:* 
`X` = Open-loop poles (Start points, $K=0$)
`*` = Breakaway point ($s=-1$)
`^ / v` = Direction of locus as $K$ increases.

## Memory technique — remember this forever
1. **The Hook:** *"Poles are Pushy, Zeros are Zappers."* The locus is repelled by (starts at) open-loop poles and is attracted to (ends at) open-loop zeros.
2. **Must-know formulas:**
   * Centroid: $\sigma_a = \frac{\sum p_i - \sum z_i}{n - m}$
   * Asymptote Angles: $\theta_a = \frac{(2q+1)180^\circ}{n - m}$
   * Breakaway condition: $\frac{dK}{ds} = 0$
3. **Spaced-repetition schedule:** Review this material at 1 day, 3 days, 7 days, 16 days, and 35 days. Draw a new locus from a textbook each time.
4. **First principles pathway:** If you forget every sketching rule, write $1 + K L(s) = 0$. Extract $L(s) = -1/K$. The locus is simply the set of all $s$ where $\angle L(s) = 180^\circ$. You can derive the entire method from this single fact.

## Common mistakes
* **Miscalculating the centroid:** Students often plug the *number* of poles into the centroid formula instead of their *coordinate values*. (e.g., using $2$ instead of $-2$ for a pole at $s=-2$).
* **Failing the real-axis rule with complex poles:** Complex conjugate poles/zeros do *not* affect the real-axis rule. Their angles to any point on the real axis sum to $360^\circ$ (effectively $0^\circ$), cancelling each other out. Only count *real* poles/zeros to the right.
* **Assuming breakaway points are always midpoints:** Breakaway points are only exactly halfway between poles if there are no other poles or zeros pulling on the locus. Always use $\frac{dK}{ds} = 0$.

## Self-check
1. For $L(s) = \frac{1}{s(s+4)(s+8)}$, how many asymptotes are there, and at what angles do they head toward infinity?
2. Derive the exact breakaway point on the real axis for $L(s) = \frac{s+1}{s(s+3)}$. 
3. Prove geometrically, using the Angle Condition, why a point on the real axis with an *even* number of real poles/zeros to its right cannot be on the root locus.