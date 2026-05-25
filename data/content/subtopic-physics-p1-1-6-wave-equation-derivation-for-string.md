## What it is
The wave equation for a string is a fundamental law of physics expressed as a partial differential equation. It describes how the displacement of any point on a vibrating string changes over time and space. It states that the local curvature of the string is directly proportional to its local acceleration.

## Why it matters
This specific derivation is the prototype for understanding how wave equations arise in nearly every field of physics and engineering. The same mathematical form describes light waves (electromagnetism), sound waves (acoustics), and even the probability waves of quantum mechanics. In aerospace, it's crucial for analyzing vibrations in structures (aeroelasticity), which can lead to catastrophic failure if not understood.

## When to study it
Before tackling this derivation, you must have a solid grasp of the following:
*   **Newton's Second Law:** $F_{net} = ma$.
*   **Calculus:** Partial derivatives. You must be comfortable with what $\frac{\partial y}{\partial x}$ and $\frac{\partial^2 y}{\partial x^2}$ represent physically (slope and curvature, respectively).
*   **Trigonometry:** The small-angle approximation, where for a small angle $\theta$ (in radians), $\sin(\theta) \approx \tan(\theta) \approx \theta$.
*   **Basic Physics Concepts:** Tension ($T$) and linear mass density ($\mu$).

If any of these are weak, pause and review them first. The derivation is impossible without them.

## How to study it (step by step)
1.  **Isolate the System:** Draw a diagram of a taut string. Zoom in on an infinitesimally small segment of the string, from horizontal position $x$ to $x+dx$.
2.  **Draw a Free-Body Diagram:** Identify all forces acting on this tiny segment. We assume the displacement $y$ is small, so we only consider the tension forces acting tangentially at each end. We neglect gravity.
3.  **Apply Newton's Second Law:** Write down $F_{net} = ma$ for the segment. Crucially, we only care about motion in the vertical ($y$) direction, as there is no horizontal motion. So, we write $\sum F_y = m a_y$.
4.  **Express Forces Geometrically:** Express the vertical components of the tension forces using the angles, $\theta_1$ and $\theta_2$, that the string makes with the horizontal at each end of the segment.
5.  **Connect Geometry to Calculus:** Use the small-angle approximation ($\sin\theta \approx \tan\theta$) and the definition of the derivative ($\tan\theta = \frac{\partial y}{\partial x}$, the slope) to rewrite the net force in terms of the string's slope at $x$ and $x+dx$.
6.  **Express Mass and Acceleration:** Write the mass of the segment as $m = \mu \, dx$, where $\mu$ is the linear mass density. Write the vertical acceleration as $a_y = \frac{\partial^2 y}{\partial t^2}$.
7.  **Assemble and Simplify:** Substitute the expressions from steps 5 and 6 into the equation from step 3. Simplify the resulting expression to arrive at the final wave equation.

## Key ideas, with intuition
1.  **Restoring Force from Curvature:** A wave propagates because segments of the string pull on each other. Imagine a segment that is curved upwards (like a smile). The tension from the left side pulls down and left, while the tension from the right side pulls down and right. The horizontal pulls cancel, but there is a net *downward* force. The more curved the string, the larger this net force. The mathematical measure of curvature is the second spatial derivative, $\frac{\partial^2 y}{\partial x^2}$.
    $$ F_{net, y} \propto \text{Curvature} \propto \frac{\partial^2 y}{\partial x^2} $$
2.  **Inertia Resists Acceleration:** The segment resists this restoring force because it has mass (inertia). The mass of our tiny segment is $m = \mu \, dx$. Newton's second law tells us that the force causes acceleration, $a_y = \frac{\partial^2 y}{\partial t^2}$.
3.  **Tension Sets the Scale:** The actual magnitude of the restoring force depends on how taut the string is. A tight string (high tension $T$) will snap back to equilibrium much faster than a loose one. Therefore, the tension $T$ is the constant of proportionality that connects the curvature to the force.
    $$ F_{net, y} = T \left( (\text{slope at } x+dx) - (\text{slope at } x) \right) $$
    This "difference in slope" is the heart of the second derivative.

Putting it all together: The tension $T$ times the curvature $\frac{\partial^2 y}{\partial x^2}$ provides the force that causes a mass of density $\mu$ to accelerate by $\frac{\partial^2 y}{\partial t^2}$.

## Worked example
**Derive the 1D wave equation for a small-amplitude transverse wave on a string with tension $T$ and linear mass density $\mu$.**

**Step 1: Isolate a segment**
Consider a small segment of the string of length $ds$ between horizontal positions $x$ and $x+dx$. Its vertical displacement is $y(x,t)$.

**Step 2: Free-Body Diagram and Newton's Law**
The forces are the tension vectors $T_1$ and $T_2$ acting tangentially at the ends. We assume the tension magnitude $T$ is constant along the string. The net vertical force is:
$$ \sum F_y = T_2 \sin(\theta_2) - T_1 \sin(\theta_1) $$
Since $T_1 = T_2 = T$:
$$ \sum F_y = T(\sin(\theta_2) - \sin(\theta_1)) $$
By Newton's Second Law, $\sum F_y = m a_y$.

**Step 3: Small-Angle Approximation**
For small displacements, the angles $\theta_1$ and $\theta_2$ are small. Thus, we can use the approximation $\sin(\theta) \approx \tan(\theta)$.
$$ \sum F_y \approx T(\tan(\theta_2) - \tan(\theta_1)) $$

**Step 4: Connect to Derivatives**
The tangent of the angle is the slope of the string, $\tan(\theta) = \frac{\partial y}{\partial x}$. So, $\tan(\theta_1)$ is the slope at $x$, and $\tan(\theta_2)$ is the slope at $x+dx$.
$$ \sum F_y \approx T \left( \left. \frac{\partial y}{\partial x} \right|_{x+dx} - \left. \frac{\partial y}{\partial x} \right|_{x} \right) $$
The term in the parenthesis is the definition of the second derivative multiplied by $dx$. A more formal way is to recognize this as the first two terms of a Taylor expansion of the slope: $\left. \frac{\partial y}{\partial x} \right|_{x+dx} \approx \left. \frac{\partial y}{\partial x} \right|_{x} + \frac{\partial^2 y}{\partial x^2} dx$.
Substituting this in gives:
$$ \sum F_y \approx T \left( \frac{\partial^2 y}{\partial x^2} dx \right) $$

**Step 5: Mass and Acceleration**
The mass of the segment is its linear density times its length. For small angles, the segment length $ds \approx dx$, so $m = \mu \, dx$.
The acceleration in the y-direction is $a_y = \frac{\partial^2 y}{\partial t^2}$.

**Step 6: Assemble the Equation**
Now, substitute everything into $\sum F_y = m a_y$:
$$ T \frac{\partial^2 y}{\partial x^2} dx = (\mu \, dx) \frac{\partial^2 y}{\partial t^2} $$
Cancel the $dx$ from both sides and rearrange to get the standard form:
$$ \frac{\partial^2 y}{\partial x^2} = \frac{\mu}{T} \frac{\partial^2 y}{\partial t^2} $$

**Reflection:** Each step translated a physical concept into a mathematical one. Step 3 (small-angle approximation) was the key simplification. Step 4 (recognizing the derivative) was the key calculus insight. The final result beautifully connects the string's physical properties ($\mu, T$) to its dynamic behavior.

## Diagrams
```text
        y ^
          |
          |                 / T2
          |               /
          |             / @(theta_2)
          |------------ds-------------
          |          /
          | T1     /
          |   \  @ (theta_1)
          |    \
          +-----------------------------------> x
          0        x             x+dx
```
**Figure 1:** A small segment `ds` of a vibrating string. The tension vectors `T1` and `T2` are tangent to the curve. The angles `theta_1` and `theta_2` are made with the horizontal. The vertical displacement is `y(x,t)`.

## Memory technique — remember this forever
1.  **Story/Mnemonic:** "The **Second Curvature** of **Space** is proportional to the **Second Acceleration** of **Time**." The word "second" reminds you of the second derivatives. "Curvature of Space" maps to $\frac{\partial^2 y}{\partial x^2}$. "Acceleration of Time" maps to $\frac{\partial^2 y}{\partial t^2}$. The constant that links them is $1/v^2$.

2.  **Must-learn formulas:**
    *   The canonical wave equation:
        $$ \frac{\partial^2 y}{\partial x^2} = \frac{1}{v^2} \frac{\partial^2 y}{\partial t^2} $$
    *   The wave speed derived from physical properties:
        $$ v = \sqrt{\frac{T}{\mu}} $$

3.  **Spaced repetition schedule:** Review this derivation and these formulas at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First principles pathway:** If you forget everything, rebuild it from Newton's Second Law.
    *   Start with $F_y = ma_y$ for a tiny string segment.
    *   Force: $F_y$ is the difference in vertical components of tension: $T(\sin\theta_2 - \sin\theta_1)$.
    *   Approximation: Use $\sin\theta \approx \tan\theta = \text{slope} = \frac{\partial y}{\partial x}$.
    *   Calculus: The difference in slope is related to the second derivative: $T \frac{\partial^2 y}{\partial x^2} dx$.
    *   Mass & Acceleration: $m = \mu dx$ and $a_y = \frac{\partial^2 y}{\partial t^2}$.
    *   Equate and solve. This path is indestructible.

## Common mistakes
1.  **Sign Errors in Forces:** Defining the vertical forces incorrectly. The force at $x$ (angle $\theta_1$) pulls down relative to the segment's curve, while the force at $x+dx$ (angle $\theta_2$) pulls up. The net force is $T\sin\theta_2 - T\sin\theta_1$. Getting this backwards flips the sign of the equation.
2.  **Forgetting to Use Partial Derivatives:** The displacement $y$ is a function of two variables, $y(x,t)$. Using ordinary derivatives $d/dx$ is incorrect and will cause confusion.
3.  **Assuming $ds = dx$ Carelessly:** This is only valid under the small-angle approximation. For large amplitudes, $ds = \sqrt{dx^2 + dy^2} = dx \sqrt{1 + (\frac{\partial y}{\partial x})^2}$, which leads to a much harder non-linear equation.
4.  **Confusing the two sides:** Mixing up which side gets the time derivative and which gets the space derivative. Remember the mnemonic: Curvature in *space* causes acceleration in *time*.

## Self-check
1.  A steel cable with linear mass density $\mu = 2$ kg/m is under a tension of $T=800$ N. What is the speed of a transverse wave on this cable?
2.  Redo the derivation, but for a longitudinal wave in a spring (a Slinky). The displacement is now $x(i,t)$ for the $i$-th coil, tension is replaced by the spring constant $k$, and linear density is replaced by mass per coil $m$. What physical properties determine the wave speed?
3.  The standard 1D wave equation is "second order in time". What would a wave equation that is "first order in time", like $\frac{\partial \psi}{\partial t} = D \frac{\partial^2 \psi}{\partial x^2}$, describe? (This is the diffusion/heat equation). How would you expect its solutions to behave differently from vibrating string solutions?