## What it is
Related rates problems involve finding a rate of change for one quantity by using its relationship to other quantities whose rates of change are known. All quantities are changing with respect to a common independent variable, usually time. The core task is to find an equation that connects the quantities and then use implicit differentiation to connect their rates.

## Why it matters
This isn't just a textbook exercise; it's a model for understanding any dynamic system where variables are interconnected. In aerospace, it's used to calculate the rate of change of a rocket's angle of elevation as seen from a tracking station, given its velocity. In physics, it describes everything from the rate of expansion of a shockwave to the changing magnetic flux in a generator.

## When to study it
Before tackling this, you must have mastered the following:
*   **The Chain Rule:** This is the engine that drives the entire process. You must understand $\frac{dy}{dt} = \frac{dy}{dx} \frac{dx}{dt}$ fluently.
*   **Implicit Differentiation:** You need to be comfortable differentiating an equation with respect to a variable that isn't explicitly present, typically time ($t$). For example, differentiating $x^2 + y^2 = 25$ with respect to $t$.
*   **Basic Geometric Formulas:** You must know formulas for area (circles, triangles), volume (spheres, cones, cylinders), the Pythagorean theorem, and basic trigonometric relationships (SOH CAH TOA).

If any of these are weak, pause and review them. You will not succeed here without them.

## How to study it (step by step)
1.  **Isolate the core mechanic.** Take the equation for the volume of a sphere, $V = \frac{4}{3}\pi r^3$. Assume both $V$ and $r$ are functions of time, $V(t)$ and $r(t)$. Differentiate the entire equation with respect to $t$. Pay close attention to how the chain rule produces $\frac{dV}{dt}$ and $\frac{dr}{dt}$. Do this until the step $\frac{d}{dt}(r^3) = 3r^2 \frac{dr}{dt}$ is automatic.
2.  **Memorize a procedural algorithm.** Write down and commit to memory a fixed procedure. A good one is: (1) Draw a diagram and label quantities. (2) List all known and unknown variables and their rates. (3) Write the "relating equation" that connects the variables. (4) Differentiate this equation with respect to time. (5) Substitute all known values for the specific instant in question. (6) Solve for the unknown rate.
3.  **Solve the ladder problem.** Find a standard "ladder sliding down a wall" problem. Apply your 6-step algorithm precisely. This problem uses the Pythagorean theorem ($x^2+y^2=L^2$) and is the canonical introduction. Pay attention to the negative sign for the rate of the sliding ladder.
4.  **Solve the shadow problem.** Find a "person walking away from a streetlight" problem. This introduces a new layer: similar triangles. You must use this geometric property to eliminate a variable from your relating equation *before* you differentiate. This is a critical technique.
5.  **Solve the cone problem.** Find an "inverted conical tank being filled with water" problem. This also uses similar triangles but applies it to volume. It is often considered one of the harder archetypes.
6.  **Check units.** Go back to each problem you solved. Write out the units for every quantity. For the ladder problem, you might have $\frac{dx}{dt}$ in ft/s, $x$ in ft, $y$ in ft. Does the final rate $\frac{dy}{dt}$ come out in ft/s? If not, you made an algebraic error. This is a simple, powerful way to catch mistakes.

## Key ideas, with intuition
1.  **Variables are secretly functions of time.** The most important mental shift is to see every variable in the problem—radius $r$, height $h$, distance $x$—not as a static number, but as a function of time: $r(t)$, $h(t)$, $x(t)$. Their rates of change are their derivatives with respect to time: $\frac{dr}{dt}$, $\frac{dh}{dt}$, $\frac{dx}{dt}$.
2.  **The relating equation is a "snapshot" formula.** An equation like $V = \pi r^2 h$ (volume of a cylinder) describes the state of the system at *any single moment in time*. It's a static, geometric truth. It holds whether the cylinder is filling, emptying, or staying the same.
3.  **Differentiation brings the system to life.** When we differentiate the static relating equation with respect to time, we are moving from a snapshot to a video. The chain rule is the mathematical tool that introduces the rates of change and shows how they are connected. It's the bridge from the static geometry to the dynamic system.
    $$
    \text{If } A = \pi r^2 \quad \text{(a static, geometric fact)}
    $$
    $$
    \text{Then } \frac{d}{dt}[A] = \frac{d}{dt}[\pi r^2] \implies \frac{dA}{dt} = 2\pi r \cdot \frac{dr}{dt} \quad \text{(a dynamic relationship between rates)}
    $$

## Worked example
**Problem:** Air is being pumped into a spherical balloon at a rate of $100 \text{ cm}^3/\text{s}$. How fast is the radius of the balloon increasing when the diameter is $50 \text{ cm}$?

**Step 1: Diagram and Labels**
(A simple sphere is sufficient to visualize. We can label the radius $r$ and note the volume $V$ is changing.)

**Step 2: List Knowns and Unknowns**
*   The rate of change of volume is given: $\frac{dV}{dt} = 100 \text{ cm}^3/\text{s}$.
*   We want to find the rate of change of the radius: $\frac{dr}{dt} = ?$.
*   This is for the specific instant when the diameter is $50 \text{ cm}$, which means the radius is $r = 25 \text{ cm}$.

**Step 3: Write the Relating Equation**
The quantities are volume ($V$) and radius ($r$) of a sphere. The geometric equation that relates them is:
$$
V = \frac{4}{3}\pi r^3
$$

**Step 4: Differentiate with Respect to Time ($t$)**
We apply $\frac{d}{dt}$ to both sides of the equation. Remember that both $V$ and $r$ are functions of $t$.
$$
\frac{d}{dt}(V) = \frac{d}{dt}\left(\frac{4}{3}\pi r^3\right)
$$
The left side is simple. For the right side, $\frac{4}{3}\pi$ is a constant, and we use the chain rule on $r^3$.
$$
\frac{dV}{dt} = \frac{4}{3}\pi \cdot (3r^2) \cdot \frac{dr}{dt}
$$
Simplifying gives the relationship between the rates:
$$
\frac{dV}{dt} = 4\pi r^2 \frac{dr}{dt}
$$

**Step 5: Substitute Knowns**
Now, and only now, we substitute the values for the specific instant we care about: $\frac{dV}{dt} = 100$ and $r = 25$.
$$
100 = 4\pi (25)^2 \frac{dr}{dt}
$$

**Step 6: Solve for the Unknown Rate**
$$
100 = 4\pi (625) \frac{dr}{dt}
$$
$$
100 = 2500\pi \frac{dr}{dt}
$$
$$
\frac{dr}{dt} = \frac{100}{2500\pi} = \frac{1}{25\pi} \text{ cm/s}
$$

**Reflection:** Each step was distinct. We established the static geometry ($V = \frac{4}{3}\pi r^3$), used calculus to find the dynamic relationship between rates ($\frac{dV}{dt} = 4\pi r^2 \frac{dr}{dt}$), and only then used the specific values for the moment of interest to find the numerical answer.

## Diagrams
Here is a diagram for the classic ladder problem, where a ladder of length $L$ slides down a wall.

```text
      |
      | y(t)
      *
     /|\
    / | \
 L /  |  \
  /   |   \
 /    |    \
*-----|----->
  x(t)

Wall ^
     |
     +------> Ground
```
*   `y(t)` is the height of the ladder on the wall. Since it's sliding down, $\frac{dy}{dt}$ will be negative.
*   `x(t)` is the distance of the base of the ladder from the wall. If it's pulled away, $\frac{dx}{dt}$ is positive.
*   `L` is the length of the ladder, which is constant. So, $\frac{dL}{dt} = 0$.
*   The relating equation is the Pythagorean theorem: $x(t)^2 + y(t)^2 = L^2$.

## Memory technique — remember this forever
1.  **Mnemonic:** Use the acronym **DRESS** to structure your solution.
    *   **D**iagram: Draw the situation.
    *   **R**ates: List all known and unknown rates ($\frac{d?}{dt}$).
    *   **E**quation: Write the equation relating the variables (geometry).
    *   **S**ubstitute... **NO!** **D**erive: Differentiate with respect to time ($t$). This pause is crucial.
    *   **S**ubstitute & **S**olve: NOW plug in the numbers and solve.

2.  **Must-know formulas:**
    *   $\frac{d}{dt}[f(x)] = f'(x) \cdot \frac{dx}{dt}$ (The Chain Rule applied to this context)
    *   $\frac{d}{dt}[x^n] = nx^{n-1} \frac{dx}{dt}$ (The power rule version you will use constantly)

3.  **Spaced repetition:** Review this topic by solving one new problem on this schedule: Day 1, Day 3, Day 7, Day 16, Day 35.

4.  **First principles pathway:** If you are ever lost, rebuild from this logic:
    *   What quantities are changing? What quantities are constant?
    *   Find a geometric formula that relates them, ignoring the changes for a moment (e.g., $A=\pi r^2$, $x^2+y^2=L^2$). This is your "relating equation."
    *   A "rate" is a derivative with respect to time. So, differentiate your entire relating equation with respect to time, $t$.
    *   Remember that every variable is a function of $t$, so the chain rule will always apply, producing a $\frac{d(\text{variable})}{dt}$ term for each.

## Common mistakes
1.  **Substituting before differentiating.** Plugging a value like $r=25$ into $V = \frac{4}{3}\pi r^3$ *before* taking the derivative. This turns the variable $r$ into a constant, making its derivative zero, which destroys the entire problem. Differentiate the general formula first.
2.  **Forgetting the chain rule.** The most frequent error is writing $\frac{d}{dt}(r^2) = 2r$. This is false. Since $r$ is a function of $t$, the correct derivative is $2r \frac{dr}{dt}$.
3.  **Ignoring decreasing quantities.** If a length, volume, or angle is decreasing, its rate of change is negative. If a ladder slides *down* a wall, its height $y$ is decreasing, so $\frac{dy}{dt}$ must be a negative number. Forgetting this will give you a sign error in your final answer.
4.  **Not simplifying variables.** In problems involving cones or similar triangles, you often have an equation with too many variables (e.g., $V = \frac{1}{3}\pi r^2 h$ with rates for $V, r, h$). You must use the geometry of the problem (e.g., the fixed ratio of $r/h$ in a cone) to express one variable in terms of another, thereby eliminating it from the equation *before* you differentiate.

## Self-check
1.  The area of a circle is increasing at a rate of $1 \text{ cm}^2/\text{s}$. How fast is the radius increasing when the area is $49\pi \text{ cm}^2$?
2.  Two cars start from the same point. One travels south at 60 mi/h, and the other travels west at 25 mi/h. At what rate is the distance between the cars increasing two hours later?
3.  A camera on the ground is 3000 feet from a rocket launch pad. The rocket rises vertically. Find the rate of change of the camera's elevation angle when the rocket is 4000 feet high and moving at 880 ft/s.