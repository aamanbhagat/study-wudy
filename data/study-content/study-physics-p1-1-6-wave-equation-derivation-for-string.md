## 1. What it is — in plain English

Imagine you pluck a guitar string. What happens? A ripple, or a wave, travels along the string. The "wave equation" is like the ultimate rulebook that describes *exactly* how that ripple moves. It tells you where every tiny piece of the string will be at any moment in time, given its starting position and how it's moving.

Think of it as a mathematical "snapshot machine" for waves. If you give it the properties of the string (like how tight it is and how heavy it is), it can predict how fast the wave will travel and what shape it will take as it moves. It's a fundamental recipe for any kind of wave that spreads out in space and changes over time.

For a string, this equation specifically relates how quickly a point on the string accelerates up and down (its vertical acceleration) to how much its shape is curving at that point. It's a differential equation because it talks about rates of change (derivatives) rather than just static positions.

## 2. Why it matters — real-world applications

The wave equation is one of the most important equations in all of physics, extending far beyond just vibrating strings. Understanding its derivation for a simple string provides a foundational understanding that applies to countless phenomena:

1.  **Musical Instruments & Acoustics:** The most direct application is in understanding how stringed instruments (guitars, pianos, violins) produce sound. Engineers use the wave equation to design strings with specific tensions and densities to achieve desired pitches and timbres. This knowledge is crucial for companies like Fender or Steinway in optimizing instrument performance.
2.  **Seismology & Earthquake Prediction:** Earthquake waves (seismic waves) travel through the Earth's crust. While the Earth is not a simple string, the underlying principles of wave propagation described by the wave equation are fundamental to understanding how these waves travel, reflect, and refract. Geologists and seismologists use variations of the wave equation to model earthquake behavior, locate epicenters, and even explore for oil and gas.
3.  **Electromagnetism & Wireless Communication:** Light, radio waves, microwaves, X-rays – all of these are electromagnetic waves. James Clerk Maxwell derived a set of equations that, when combined, produce a wave equation for electric and magnetic fields. This is the bedrock of all wireless communication, from your smartphone's Wi-Fi to satellite communication and radar. Companies like Qualcomm, SpaceX, and NASA heavily rely on this understanding.
4.  **Quantum Mechanics:** At the subatomic level, particles like electrons exhibit wave-like properties. The Schrödinger equation, a cornerstone of quantum mechanics, is a form of the wave equation (albeit a more complex, probabilistic one). This is critical for understanding the behavior of materials, developing new technologies like lasers, and even designing advanced computer chips.
5.  **Aerospace Engineering (Vibration Analysis):** In rocket science and aerospace, controlling vibrations is paramount. Structures like rocket bodies, aircraft wings, and satellite panels can experience unwanted oscillations. Engineers use wave equations to model how vibrations propagate through these structures, helping them design damping systems and ensure structural integrity during launch and flight. This directly impacts the safety and performance of vehicles from companies like Boeing, Lockheed Martin, and Blue Origin.

## 3. Prerequisites — what you must know first

Before diving into the derivation, ensure you have a solid grasp of these concepts:

*   **Newton's Second Law ($F=ma$):** The fundamental principle that the net force acting on an object is equal to its mass times its acceleration.
*   **Calculus (Derivatives):** Understanding of derivatives as rates of change. Specifically, how to find the slope of a tangent line ($\frac{dy}{dx}$) and the rate of change of a rate of change (second derivatives, $\frac{d^2y}{dx^2}$ and $\frac{d^2y}{dt^2}$).
*   **Partial Derivatives:** The concept that a function can depend on multiple variables (e.g., position $x$ and time $t$), and a partial derivative means taking the derivative with respect to one variable while treating others as constants.
*   **Small Angle Approximation:** For small angles $\theta$ (in radians), $\sin \theta \approx \theta$ and $\tan \theta \approx \theta$. Also, $\cos \theta \approx 1$. This is crucial for simplifying the equations.
*   **Trigonometry:** Basic understanding of sine, cosine, and tangent, especially in the context of resolving forces into components.
*   **Tension:** The pulling force transmitted axially through a string, cable, or similar continuous object.
*   **Linear Mass Density ($\mu$):** The mass per unit length of a string, usually denoted by $\mu$ (mu). $\mu = \frac{m}{L}$.

## 4. The core idea — step by step

The goal is to derive an equation that describes the vertical displacement $y$ of any point on the string at position $x$ and time $t$. We'll denote this function as $y(x, t)$.

### Step 1: Define the System and Make Assumptions

**Plain English:** Imagine a perfectly flexible, uniform string that's stretched tightly between two points. When it vibrates, it only moves up and down (vertically), and its horizontal position doesn't change much. We're looking at a tiny, tiny piece of this string.

**Concrete Example:** Think of a single strand of a guitar string. It's thin, uniform, and under tension. When you pluck it, it wiggles up and down, but it doesn't really stretch horizontally or move sideways.

**Formal/Mathematical Version:**
*   Consider a string of length $L$ stretched along the x-axis.
*   Let $y(x,t)$ be the transverse (vertical) displacement of a point at position $x$ at time $t$.
*   **Assumptions:**
    1.  The string is perfectly flexible (offers no resistance to bending).
    2.  The string is uniform (linear mass density $\mu$ is constant).
    3.  The tension $T$ in the string is constant and large compared to the weight of the string segment.
    4.  Displacements $y(x,t)$ are small compared to the length of the string, and the slope $\frac{\partial y}{\partial x}$ is small. This means the string remains nearly horizontal.
    5.  Motion is purely transverse (vertical). Horizontal motion is negligible.

**What could go wrong:** If any of these assumptions are violated (e.g., a very thick, stiff rope; large displacements; significant horizontal motion), our derived equation won't accurately describe the wave's behavior. For instance, large displacements would mean the tension isn't constant, and the small angle approximations would break down.

### Step 2: Isolate an Infinitesimal Segment of the String

**Plain English:** We can't analyze the whole string at once. Let's pick out a tiny, tiny segment of the string, so small that we can treat it almost like a point, but still having a length. This segment is located between $x$ and $x + \Delta x$.

**Concrete Example:** If the string is 1 meter long, we're looking at a piece that's maybe 0.0001 meters long, somewhere in the middle.

**Formal/Mathematical Version:**
Consider a small segment of the string of length $\Delta s$ located between $x$ and $x + \Delta x$.
The mass of this segment is $\Delta m = \mu \Delta s$.
Since displacements are small, $\Delta s \approx \Delta x$. So, $\Delta m \approx \mu \Delta x$.

**What could go wrong:** If $\Delta x$ is not infinitesimally small, our approximations for derivatives (which rely on limits as $\Delta x \to 0$) won't be accurate.

### Step 3: Analyze Forces Acting on the Segment

**Plain English:** What forces are pulling on this tiny piece of string? Only the tension from the rest of the string on either side. Gravity is usually ignored because the tension is assumed to be much larger.

**Concrete Example:** Imagine holding a piece of string taut. The tension from your left hand pulls one way, and the tension from your right hand pulls the other way.

**Formal/Mathematical Version:**
The tension $T$ acts tangentially along the string at each end of the segment.
Let $T_1$ be the tension force at $x$ and $T_2$ be the tension force at $x + \Delta x$.
Due to our assumption of small displacements, the magnitude of the tension $T$ is approximately constant throughout the string. So, $|T_1| = |T_2| = T$.
However, the *direction* of the tension changes because the string is curved.

**What could go wrong:** Forgetting that tension is a vector, meaning its direction matters even if its magnitude is constant. If gravity were significant, we'd need to include an additional downward force.

### Step 4: Resolve Forces into Components

**Plain English:** The tension pulls along the curved string. We need to break this pulling force into two parts: one pulling horizontally and one pulling vertically. Since the string only moves vertically, we're most interested in the vertical forces.

**Concrete Example:** If you pull a rope at an angle, part of your pull lifts it up, and part pulls it sideways.

**Formal/Mathematical Version:**
Let $\theta_1$ be the angle the string makes with the horizontal at $x$, and $\theta_2$ be the angle at $x + \Delta x$.
The tension force at $x$ has components:
*   Horizontal: $F_{x1} = -T \cos \theta_1$ (negative because it pulls to the left)
*   Vertical: $F_{y1} = -T \sin \theta_1$ (negative if $\theta_1$ is below horizontal, positive if above)

The tension force at $x + \Delta x$ has components:
*   Horizontal: $F_{x2} = T \cos \theta_2$ (positive because it pulls to the right)
*   Vertical: $F_{y2} = T \sin \theta_2$ (positive if $\theta_2$ is above horizontal)

**What could go wrong:** Incorrectly assigning signs to the force components, or mixing up sine and cosine for the horizontal/vertical components.

### Step 5: Apply Newton's Second Law to Vertical Motion

**Plain English:** The net vertical force on our tiny string segment will cause it to accelerate up or down. This is just $F=ma$ applied to the vertical direction.

**Concrete Example:** If the net upward pull on a piece of string is strong, that piece will accelerate upwards quickly.

**Formal/Mathematical Version:**
The net vertical force on the segment is $F_y = F_{y2} + F_{y1} = T \sin \theta_2 - T \sin \theta_1$.
According to Newton's Second Law, $F_y = \Delta m \cdot a_y$.
Here, $a_y$ is the vertical acceleration of the segment, which is $\frac{\partial^2 y}{\partial t^2}$.
So, $T \sin \theta_2 - T \sin \theta_1 = (\mu \Delta x) \frac{\partial^2 y}{\partial t^2}$.

**What could go wrong:** Forgetting to use partial derivatives for acceleration, as $y$ depends on both $x$ and $t$. Using the total mass of the string instead of the mass of the segment.

### Step 6: Use the Small Angle Approximation

**Plain English:** Because we assumed the string's displacement is small and its slope is gentle, the angles $\theta_1$ and $\theta_2$ are very small. For very small angles, the sine of the angle is almost equal to the angle itself (in radians), and also almost equal to the tangent of the angle.

**Concrete Example:** If an angle is 0.1 radians (about 5.7 degrees), $\sin(0.1) \approx 0.0998$ and $\tan(0.1) \approx 0.1003$. Both are very close to 0.1.

**Formal/Mathematical Version:**
For small angles, $\sin \theta \approx \tan \theta$.
Also, the tangent of the angle a curve makes with the x-axis is given by its derivative $\frac{\partial y}{\partial x}$.
So, $\sin \theta_1 \approx \tan \theta_1 = \left(\frac{\partial y}{\partial x}\right)_{x}$
And $\sin \theta_2 \approx \tan \theta_2 = \left(\frac{\partial y}{\partial x}\right)_{x+\Delta x}$

Substituting these into our force equation:
$T \left[ \left(\frac{\partial y}{\partial x}\right)_{x+\Delta x} - \left(\frac{\partial y}{\partial x}\right)_{x} \right] = \mu \Delta x \frac{\partial^2 y}{\partial t^2}$.

**What could go wrong:** Forgetting the small angle approximation, or incorrectly using $\cos \theta \approx 1$ for the vertical components (which would make them zero). The small angle approximation is *critical* for simplifying the equation to the standard wave equation form.

### Step 7: Introduce the Definition of the Second Partial Derivative

**Plain English:** We have a difference in slopes over a small distance $\Delta x$. This looks a lot like the definition of a derivative! Specifically, it looks like the derivative of the slope, which is the second derivative of the displacement.

**Concrete Example:** If you have a function $f(x)$, its derivative is approximately $\frac{f(x+\Delta x) - f(x)}{\Delta x}$. Here, our "function" is the slope $\frac{\partial y}{\partial x}$.

**Formal/Mathematical Version:**
Recall the definition of a derivative:
$\frac{df}{dx} = \lim_{\Delta x \to 0} \frac{f(x+\Delta x) - f(x)}{\Delta x}$

In our case, $f(x) = \frac{\partial y}{\partial x}$. So, as $\Delta x \to 0$:
$\frac{\partial}{\partial x} \left(\frac{\partial y}{\partial x}\right) = \frac{\partial^2 y}{\partial x^2} \approx \frac{\left(\frac{\partial y}{\partial x}\right)_{x+\Delta x} - \left(\frac{\partial y}{\partial x}\right)_{x}}{\Delta x}$

Rearranging this, we get:
$\left(\frac{\partial y}{\partial x}\right)_{x+\Delta x} - \left(\frac{\partial y}{\partial x}\right)_{x} \approx \frac{\partial^2 y}{\partial x^2} \Delta x$

**What could go wrong:** Not recognizing this as the definition of a second partial derivative, or confusing it with a time derivative.

### Step 8: Substitute and Simplify to the Wave Equation

**Plain English:** Now we put all the pieces together. We replace the difference in slopes in our force equation with the second spatial derivative. Then, we rearrange the terms to get the final, elegant wave equation.

**Concrete Example:** It's like having different ingredients (Newton's law, small angles, calculus definitions) and finally combining them into the finished dish (the wave equation).

**Formal/Mathematical Version:**
Substitute the result from Step 7 into the equation from Step 6:
$T \left[ \frac{\partial^2 y}{\partial x^2} \Delta x \right] = \mu \Delta x \frac{\partial^2 y}{\partial t^2}$

Notice that $\Delta x$ appears on both sides. We can cancel it out:
$T \frac{\partial^2 y}{\partial x^2} = \mu \frac{\partial^2 y}{\partial t^2}$

Finally, rearrange to the standard form of the wave equation:
$$ \frac{\partial^2 y}{\partial t^2} = \frac{T}{\mu} \frac{\partial^2 y}{\partial x^2} $$

**What could go wrong:** Algebraic errors during rearrangement, or failing to cancel $\Delta x$.

### Step 9: Identify the Wave Speed

**Plain English:** The term $\frac{T}{\mu}$ in the equation looks like a constant. It turns out this constant is directly related to how fast the wave travels along the string.

**Concrete Example:** A tighter string (larger $T$) or a lighter string (smaller $\mu$) will make waves travel faster, just like a stiffer spring makes things oscillate faster.

**Formal/Mathematical Version:**
The general form of the one-dimensional wave equation is:
$$ \frac{\partial^2 y}{\partial t^2} = v^2 \frac{\partial^2 y}{\partial x^2} $$
By comparing this to our derived equation, we can identify that the square of the wave speed $v$ is:
$$ v^2 = \frac{T}{\mu} $$
Therefore, the speed of a transverse wave on a string is:
$$ v = \sqrt{\frac{T}{\mu}} $$
where $T$ is the tension in the string and $\mu$ is its linear mass density.

**What could go wrong:** Forgetting to take the square root when finding $v$, or mixing up the units of $T$ and $\mu$.

## 5. Worked examples — multiple, with every step shown

### Example 1: Identifying Components of the Wave Equation

**Problem:** A wave on a string is described by the equation $\frac{\partial^2 y}{\partial t^2} = 100 \frac{\partial^2 y}{\partial x^2}$. If the tension in the string is $25 \, \text{N}$, what is the linear mass density of the string?

**Given:**
*   Wave equation: $\frac{\partial^2 y}{\partial t^2} = 100 \frac{\partial^2 y}{\partial x^2}$
*   Tension $T = 25 \, \text{N}$
**Want:** Linear mass density $\mu$

**Solution:**

1.  **Recall the standard form of the wave equation:**
    $$ \frac{\partial^2 y}{\partial t^2} = v^2 \frac{\partial^2 y}{\partial x^2} $$
    *This is the general form we derived, where $v$ is the wave speed.*

2.  **Compare the given equation with the standard form:**
    By direct comparison, we can see that $v^2 = 100$.
    *We are matching the coefficient of the second spatial derivative to $v^2$.*

3.  **Determine the wave speed $v$:**
    $$ v^2 = 100 $$
    $$ v = \sqrt{100} = 10 \, \frac{\text{m}}{\text{s}} $$
    *Taking the square root gives us the speed of the wave.*

4.  **Recall the formula for wave speed in terms of tension and linear mass density:**
    $$ v = \sqrt{\frac{T}{\mu}} $$
    *This formula was derived directly from Newton's second law and the string properties.*

5.  **Substitute the known values into the wave speed formula:**
    $$ 10 = \sqrt{\frac{25}{\mu}} $$
    *We now have an equation with only one unknown, $\mu$.*

6.  **Solve for $\mu$:**
    Square both sides:
    $$ 10^2 = \frac{25}{\mu} $$
    $$ 100 = \frac{25}{\mu} $$
    *This eliminates the square root, making $\mu$ easier to isolate.*

    Multiply both sides by $\mu$:
    $$ 100 \mu = 25 $$
    *Bringing $\mu$ out of the denominator.*

    Divide by 100:
    $$ \mu = \frac{25}{100} $$
    $$ \mu = 0.25 \, \frac{\text{kg}}{\text{m}} $$
    *Performing the final calculation to get the value of $\mu$.*

**Final Answer:**
$$ \boxed{\mu = 0.25 \, \frac{\text{kg}}{\text{m}}} $$

**Reflection:** This example highlights how to extract information directly from the wave equation and relate it to the physical properties of the string. The key was recognizing the $v^2$ term.

---

### Example 2: Verifying a Proposed Solution to the Wave Equation

**Problem:** Show that the function $y(x,t) = A \sin(kx - \omega t)$ is a solution to the wave equation $\frac{\partial^2 y}{\partial t^2} = v^2 \frac{\partial^2 y}{\partial x^2}$, provided that $v = \omega/k$.

**Given:**
*   Proposed solution: $y(x,t) = A \sin(kx - \omega t)$
*   Wave equation: $\frac{\partial^2 y}{\partial t^2} = v^2 \frac{\partial^2 y}{\partial x^2}$
*   Condition: $v = \omega/k$ (where $k$ is the wave number and $\omega$ is the angular frequency)

**Want:** To show that the given $y(x,t)$ satisfies the wave equation under the given condition.

**Solution:**

1.  **Calculate the first partial derivative of $y$ with respect to $t$:**
    $$ \frac{\partial y}{\partial t} = \frac{\partial}{\partial t} [A \sin(kx - \omega t)] $$
    Using the chain rule, treating $kx$ as a constant:
    $$ \frac{\partial y}{\partial t} = A \cos(kx - \omega t) \cdot (-\omega) $$
    $$ \frac{\partial y}{\partial t} = -A\omega \cos(kx - \omega t) $$
    *The derivative of $\sin(u)$ is $\cos(u) \frac{du}{dt}$. Here $u = kx - \omega t$, so $\frac{du}{dt} = -\omega$.*

2.  **Calculate the second partial derivative of $y$ with respect to $t$:**
    $$ \frac{\partial^2 y}{\partial t^2} = \frac{\partial}{\partial t} [-A\omega \cos(kx - \omega t)] $$
    Using the chain rule again, treating $kx$ as a constant:
    $$ \frac{\partial^2 y}{\partial t^2} = -A\omega (-\sin(kx - \omega t)) \cdot (-\omega) $$
    $$ \frac{\partial^2 y}{\partial t^2} = -A\omega^2 \sin(kx - \omega t) $$
    *The derivative of $\cos(u)$ is $-\sin(u) \frac{du}{dt}$. The two negative signs from $-\cos$ and $-\omega$ cancel, then another $-\omega$ from the chain rule makes it negative again.*

3.  **Calculate the first partial derivative of $y$ with respect to $x$:**
    $$ \frac{\partial y}{\partial x} = \frac{\partial}{\partial x} [A \sin(kx - \omega t)] $$
    Using the chain rule, treating $\omega t$ as a constant:
    $$ \frac{\partial y}{\partial x} = A \cos(kx - \omega t) \cdot (k) $$
    $$ \frac{\partial y}{\partial x} = Ak \cos(kx - \omega t) $$
    *The derivative of $\sin(u)$ is $\cos(u) \frac{du}{dx}$. Here $u = kx - \omega t$, so $\frac{du}{dx} = k$.*

4.  **Calculate the second partial derivative of $y$ with respect to $x$:**
    $$ \frac{\partial^2 y}{\partial x^2} = \frac{\partial}{\partial x} [Ak \cos(kx - \omega t)] $$
    Using the chain rule again, treating $\omega t$ as a constant:
    $$ \frac{\partial^2 y}{\partial x^2} = Ak (-\sin(kx - \omega t)) \cdot (k) $$
    $$ \frac{\partial^2 y}{\partial x^2} = -Ak^2 \sin(kx - \omega t) $$
    *The derivative of $\cos(u)$ is $-\sin(u) \frac{du}{dx}$. The $k$ from the chain rule multiplies the existing $k$.*

5.  **Substitute the second derivatives into the wave equation:**
    The wave equation is $\frac{\partial^2 y}{\partial t^2} = v^2 \frac{\partial^2 y}{\partial x^2}$.
    Substitute the results from steps 2 and 4:
    $$ -A\omega^2 \sin(kx - \omega t) = v^2 [-Ak^2 \sin(kx - \omega t)] $$
    *We are checking if the left side equals the right side.*

6.  **Simplify and apply the given condition:**
    Divide both sides by $-A \sin(kx - \omega t)$ (assuming $A \neq 0$ and $\sin(kx - \omega t) \neq 0$ for a general solution):
    $$ \omega^2 = v^2 k^2 $$
    *This simplifies the equation significantly.*

    Rearrange to solve for $v^2$:
    $$ v^2 = \frac{\omega^2}{k^2} $$
    $$ v = \sqrt{\frac{\omega^2}{k^2}} = \frac{\omega}{k} $$
    *This shows that the wave equation is satisfied if $v = \omega/k$, which is the given condition.*

**Final Answer:**
We have shown that $y(x,t) = A \sin(kx - \omega t)$ satisfies the wave equation if $v = \omega/k$. This is a fundamental relationship for sinusoidal waves.

**Reflection:** This example demonstrates the power of partial derivatives in verifying solutions to differential equations. It also reinforces the crucial relationship between wave speed, angular frequency, and wave number. The "trick" is careful application of the chain rule.

---

### Example 3: Calculating Wave Speed from String Properties

**Problem:** A steel string with a length of $0.8 \, \text{m}$ and a mass of $2 \, \text{g}$ is stretched with a tension of $200 \, \text{N}$. Calculate the speed of transverse waves on this string.

**Given:**
*   Length $L = 0.8 \, \text{m}$
*   Mass $m = 2 \, \text{g}$
*   Tension $T = 200 \, \text{N}$
**Want:** Wave speed $v$

**Solution:**

1.  **Convert mass to kilograms:**
    The mass is given in grams, but the SI unit for mass is kilograms.
    $$ m = 2 \, \text{g} = 2 \times 10^{-3} \, \text{kg} = 0.002 \, \text{kg} $$
    *Consistent units are essential for correct calculations.*

2.  **Calculate the linear mass density ($\mu$) of the string:**
    Linear mass density is mass per unit length.
    $$ \mu = \frac{m}{L} $$
    $$ \mu = \frac{0.002 \, \text{kg}}{0.8 \, \text{m}} $$
    $$ \mu = 0.0025 \, \frac{\text{kg}}{\text{m}} $$
    *This is a property of the string itself, independent of the wave.*

3.  **Recall the formula for the speed of a transverse wave on a string:**
    $$ v = \sqrt{\frac{T}{\mu}} $$
    *This formula directly relates the wave speed to the string's physical properties.*

4.  **Substitute the calculated $\mu$ and given $T$ into the formula:**
    $$ v = \sqrt{\frac{200 \, \text{N}}{0.0025 \, \frac{\text{kg}}{\text{m}}}} $$
    *Now we just need to perform the arithmetic.*

5.  **Calculate the wave speed:**
    $$ v = \sqrt{80000} $$
    $$ v \approx 282.84 \, \frac{\text{m}}{\text{s}} $$
    *Performing the division and then the square root.*

**Final Answer:**
$$ \boxed{v \approx 283 \, \frac{\text{m}}{\text{s}}} $$

**Reflection:** This example emphasizes the importance of unit conversion and correctly calculating the linear mass density before applying the wave speed formula. It's a direct application of the derived relationship.

---

### Example 4: Deducing String Properties from Wave Information

**Problem:** A transverse wave travels along a string at a speed of $150 \, \text{m/s}$. The string has a linear mass density of $0.005 \, \text{kg/m}$. If the string is $1.2 \, \text{m}$ long, what is the total mass of the string and what is the tension in the string?

**Given:**
*   Wave speed $v = 150 \, \text{m/s}$
*   Linear mass density $\mu = 0.005 \, \text{kg/m}$
*   Length $L = 1.2 \, \text{m}$
**Want:** Total mass $m$ and Tension $T$

**Solution:**

**Part 1: Calculate the total mass of the string.**

1.  **Recall the definition of linear mass density:**
    $$ \mu = \frac{m}{L} $$
    *This relates mass, length, and linear mass density.*

2.  **Rearrange the formula to solve for $m$:**
    $$ m = \mu \cdot L $$
    *Isolating the unknown variable, mass.*

3.  **Substitute the given values for $\mu$ and $L$:**
    $$ m = (0.005 \, \frac{\text{kg}}{\text{m}}) \cdot (1.2 \, \text{m}) $$
    *Plugging in the numbers.*

4.  **Calculate the total mass $m$:**
    $$ m = 0.006 \, \text{kg} $$
    *Performing the multiplication.*

**Part 2: Calculate the tension in the string.**

1.  **Recall the formula for the speed of a transverse wave on a string:**
    $$ v = \sqrt{\frac{T}{\mu}} $$
    *This formula connects wave speed, tension, and linear mass density.*

2.  **Rearrange the formula to solve for $T$:**
    Square both sides:
    $$ v^2 = \frac{T}{\mu} $$
    *This removes the square root, making $T$ easier to isolate.*

    Multiply both sides by $\mu$:
    $$ T = v^2 \mu $$
    *Isolating the unknown variable, tension.*

3.  **Substitute the given values for $v$ and $\mu$:**
    $$ T = (150 \, \frac{\text{m}}{\text{s}})^2 \cdot (0.005 \, \frac{\text{kg}}{\text{m}}) $$
    *Plugging in the numbers.*

4.  **Calculate the tension $T$:**
    $$ T = (22500 \, \frac{\text{m}^2}{\text{s}^2}) \cdot (0.005 \, \frac{\text{kg}}{\text{m}}) $$
    $$ T = 112.5 \, \text{N} $$
    *Performing the squaring and then the multiplication. Note that $\frac{\text{kg} \cdot \text{m}^2/\text{s}^2}{\text{m}} = \text{kg} \cdot \text{m}/\text{s}^2 = \text{N}$.*

**Final Answers:**
$$ \boxed{m = 0.006 \, \text{kg}} $$
$$ \boxed{T = 112.5 \, \text{N}} $$

**Reflection:** This example shows how to work backward from wave properties to deduce the physical characteristics of the string. It requires manipulating the formulas, reinforcing the understanding of their interrelationships.

## 6. Common mistakes and traps

1.  **Confusing Partial and Ordinary Derivatives:** Students sometimes use $\frac{d^2y}{dt^2}$ instead of $\frac{\partial^2y}{\partial t^2}$. Remember $y$ is a function of *both* $x$ and $t$, so partial derivatives are necessary.
2.  **Incorrect Small Angle Approximation:** Assuming $\sin \theta \approx \theta$ and $\tan \theta \approx \theta$ is crucial, but some might incorrectly use $\cos \theta \approx \theta$ or $\sin \theta \approx 1$. The approximation $\cos \theta \approx 1$ is used for horizontal forces, implying negligible horizontal acceleration, not for vertical force components.
3.  **Mixing Up Horizontal and Vertical Force Components:** Incorrectly using cosine for vertical forces or sine for horizontal forces, or misapplying signs. Always draw a free-body diagram to visualize the components.
4.  **Forgetting Linear Mass Density ($\mu$):** Using total mass $m$ instead of linear mass density $\mu = m/L$ in Newton's Second Law for the infinitesimal segment. The acceleration applies to a *mass element*, not the whole string.
5.  **Algebraic Errors in Rearrangement:** Simple mistakes like failing to cancel $\Delta x$ or incorrectly rearranging $v^2 = T/\mu$ to solve for $T$ or $\mu$.
6.  **Ignoring Assumptions:** Forgetting that the derivation relies on several key assumptions (small displacement, uniform string, constant tension, no gravity). The derived equation is an approximation that works well under these conditions.

## 7. Textbook-precise explanation

The one-dimensional wave equation for a transverse wave on a flexible string can be rigorously derived by applying Newton's Second Law to an infinitesimal segment of the string.

Consider a small segment of a string of length $dx$ and linear mass density $\mu$ (mass per unit length). Let the string be stretched along the x-axis, and its transverse displacement be $y(x,t)$. The segment is located between $x$ and $x+dx$.

1.  **Forces on the segment:** Tension $T$ acts tangentially along the string at both ends of the segment. Due to the string's curvature, the direction of tension changes. Let $\theta(x,t)$ be the angle the string makes with the horizontal at point $x$.
    *   At $x$: The tension $T_1$ acts at an angle $\theta(x)$. Its vertical component is $-T \sin \theta(x)$.
    *   At $x+dx$: The tension $T_2$ acts at an angle $\theta(x+dx)$. Its vertical component is $T \sin \theta(x+dx)$.
    *   We assume the magnitude of tension $T$ is constant throughout the string, and horizontal motion is negligible, meaning horizontal forces balance: $T \cos \theta(x+dx) - T \cos \theta(x) \approx 0$, which implies $\cos \theta(x) \approx \cos \theta(x+dx) \approx 1$ for small angles.

2.  **Net vertical force:** The net vertical force $dF_y$ on the segment is the sum of the vertical components of tension:
    $$ dF_y = T \sin \theta(x+dx) - T \sin \theta(x) $$

3.  **Small angle approximation:** For small displacements, the slope of the string is small, so the angles $\theta$ are small. Thus, we can use the approximation $\sin \theta \approx \tan \theta$. Also, the tangent of the angle is the partial derivative of displacement with respect to position: $\tan \theta = \frac{\partial y}{\partial x}$.
    Substituting this into the force equation:
    $$ dF_y = T \left[ \left(\frac{\partial y}{\partial x}\right)_{x+dx} - \left(\frac{\partial y}{\partial x}\right)_{x} \right] $$

4.  **Newton's Second Law:** The mass of the segment is $dm = \mu \, dx$. The vertical acceleration of the segment is $a_y = \frac{\partial^2 y}{\partial t^2}$.
    According to Newton's Second Law, $dF_y = dm \cdot a_y$:
    $$ T \left[ \left(\frac{\partial y}{\partial x}\right)_{x+dx} - \left(\frac{\partial y}{\partial x}\right)_{x} \right] = (\mu \, dx) \frac{\partial^2 y}{\partial t^2} $$

5.  **Second partial derivative:** Divide by $dx$:
    $$ T \frac{\left(\frac{\partial y}{\partial x}\right)_{x+dx} - \left(\frac{\partial y}{\partial x}\right)_{x}}{dx} = \mu \frac{\partial^2 y}{\partial t^2} $$
    In the limit as $dx \to 0$, the left side becomes the definition of the second partial derivative of $y$ with respect to $x$:
    $$ \lim_{dx \to 0} \frac{\left(\frac{\partial y}{\partial x}\right)_{x+dx} - \left(\frac{\partial y}{\partial x}\right)_{x}}{dx} = \frac{\partial}{\partial x}\left(\frac{\partial y}{\partial x}\right) = \frac{\partial^2 y}{\partial x^2} $$

6.  **The Wave Equation:** Substituting this back, we obtain:
    $$ T \frac{\partial^2 y}{\partial x^2} = \mu \frac{\partial^2 y}{\partial t^2} $$
    Rearranging into the standard form:
    $$ \frac{\partial^2 y}{\partial t^2} = \left(\frac{T}{\mu}\right) \frac{\partial^2 y}{\partial x^2} $$
    This is the one-dimensional wave equation. By comparison with the general form $\frac{\partial^2 y}{\partial t^2} = v^2 \frac{\partial^2 y}{\partial x^2}$, we identify the wave speed $v$ as:
    $$ v = \sqrt{\frac{T}{\mu}} $$

This derivation assumes small transverse displacements, constant tension, uniform string, and negligible gravitational forces. These are standard assumptions for introductory treatments of waves on strings.

(Adapted from Young & Freedman, *University Physics with Modern Physics*, 15th ed., Chapter 15, Section 15.3; Halliday, Resnick, & Walker, *Fundamentals of Physics*, 11th ed., Chapter 15, Section 15-4.)

## 8. ASCII diagrams

```text
       y ^
         |
         |         /------- T2 sin(theta2)
         |        /
         |       /
         |      /
         |     /
         |    /
         |   /
         |  /
         | /
         |/  theta2
         +------------------- x
         | \
         |  \  theta1
         |   \
         |    \
         |     \
         |      \
         |       \
         |        \------- T1 sin(theta1)
         |
         |
         |
         +-------------------
         x         x+dx

  <---------------- dx ---------------->

  Description: A small segment of a string, shown curved due to a wave.
  The segment extends from x to x+dx.
  At point x, the tension force T1 acts downwards and to the left, making an angle
  theta1 with the horizontal. Its vertical component is T1 sin(theta1).
  At point x+dx, the tension force T2 acts upwards and to the right, making an angle
  theta2 with the horizontal. Its vertical component is T2 sin(theta2).
  The y-axis represents the transverse displacement, and the x-axis represents the
  position along the string. The curve represents y(x,t).
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    Imagine a **T**ight string, made of **M**ud, forming a **V**ery fast wave.
    This helps remember the wave speed formula: $v = \sqrt{\frac{T}{\mu}}$.
    (Tension over Mu, square rooted, gives Velocity).
    For the equation itself, think: "Acceleration in time (left side) is proportional to curvature in space (right side)." The constant of proportionality is $v^2$.

2.  **Formulas/Facts to Overlearn:**
    *   The 1D Wave Equation: $$ \frac{\partial^2 y}{\partial t^2} = v^2 \frac{\partial^2 y}{\partial x^2} $$
    *   Wave Speed on a String: $$ v = \sqrt{\frac{T}{\mu}} $$
    *   The Small Angle Approximation: $\sin \theta \approx \tan \theta \approx \theta$ (for small $\theta$ in radians).

3.  **Spaced-Repetition Schedule:**
    *   Review this lesson today (Day 0).
    *   Review again in **1 day**.
    *   Review again in **3 days**.
    *   Review again in **7 days**.
    *   Review again in **16 days**.
    *   Review again in **35 days**.
    During each review, try to re-derive the equation from scratch.

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the wave equation or its derivation, you can always rebuild it by following these core steps:
    1.  **Start with Newton's Second Law:** Focus on a tiny segment of the string ($dx$). The net vertical force on this segment equals its mass ($\mu dx$) times its vertical acceleration ($\frac{\partial^2 y}{\partial t^2}$).
    2.  **Analyze Tension Forces:** Identify the tension forces acting on the ends of the segment. Remember tension acts tangentially.
    3.  **Resolve Vertically:** Break the tension forces into vertical components using sine.
    4.  **Apply Small Angle Approximation:** Replace $\sin \theta$ with $\tan \theta$, and then $\tan \theta$ with $\frac{\partial y}{\partial x}$.
    5.  **Recognize Second Derivative:** The difference in slopes over $dx$ is the definition of the second spatial derivative $\frac{\partial^2 y}{\partial x^2}$.
    6.  **Substitute and Simplify:** Combine everything, cancel $dx$, and rearrange to get the final wave equation and the formula for wave speed.

## 10. Connections — what this leads to

Understanding the derivation of the wave equation for a string is a crucial stepping stone to many advanced topics in physics and engineering:

*   **Standing Waves and Harmonics:** This equation is used to derive the conditions for standing waves on a string, which explains harmonics, overtones, and the fundamental frequencies of musical instruments. This leads into the study of resonance.
*   **Acoustics:** The principles extend to sound waves (longitudinal waves) in air and other media, requiring a similar wave equation but with different physical parameters (bulk modulus and density).
*   **Electromagnetic Waves:** Maxwell's equations, when combined, yield a wave equation for electric and magnetic fields that is mathematically identical in form to the string wave equation. This reveals that light is an electromagnetic wave and sets the foundation for all optics and radio communication.
*   **Quantum Mechanics:** The time-dependent Schrödinger equation, which describes the wave-like behavior of particles, is a more complex form of a wave equation. Its solutions (wave functions) predict the probability of finding a particle in a given state.
*   **Fluid Dynamics:** Waves on water surfaces, tsunamis, and other fluid phenomena are often modeled using variations of the wave equation.
*   **Elasticity and Material Science:** Understanding how vibrations propagate through solid materials is critical in designing structures (bridges, buildings, aircraft) to withstand stresses and avoid resonant failures. This involves wave equations for different types of elastic waves.
*   **Signal Processing:** The mathematical structure of the wave equation is fundamental to understanding how signals propagate in cables, optical fibers, and even neural networks (in a more abstract sense).

## 11. Self-check questions

1.  Explain in your own words why the small angle approximation is essential for deriving the simple linear wave equation for a string. What would happen if displacements were large?
2.  A student attempts to derive the wave equation but forgets to include the linear mass density ($\mu$). What term would be missing or incorrect in their final equation, and how would this affect their calculation of wave speed?
3.  Consider a string segment. If the tension at both ends were perfectly horizontal (i.e., no curve), what would be the net vertical force on the segment according to the derivation steps? What does this imply about its vertical acceleration?
4.  Given a string under tension $T$ and linear mass density $\mu$. If you double the tension, how does the wave speed change? If you double the linear mass density (keeping tension constant), how does the wave speed change? Justify your answers mathematically.
5.  Imagine a wave equation for a different medium is given as $\frac{\partial^2 y}{\partial t^2} = \frac{B}{\rho} \frac{\partial^2 y}{\partial x^2}$, where $B$ is a "stiffness" parameter and $\rho$ is the density. What is the formula for the wave speed in this medium? If you wanted to increase the wave speed, would you want a "stiffer" or "softer" medium, and a "denser" or "lighter" medium?