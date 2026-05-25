## 1. What it is — in plain English

Imagine you pluck a guitar string. What happens? A wiggle, or a "wave," travels along the string. Or, if you drop a pebble into a still pond, ripples spread outwards. These are examples of waves. The "wave equation" is a mathematical formula that describes how these kinds of waves move and change over time. It's like the rulebook for waves.

Now, imagine you want to predict exactly what the guitar string will look like at any future moment, given how you initially plucked it (its starting shape) and how fast it was moving at the start. That's a tricky problem, because the shape at one point affects the shape at its neighbors, and everything changes over time.

D'Alembert's solution is a remarkably elegant formula that tells you exactly that. It's a specific, direct way to solve the wave equation for a simple, one-dimensional wave (like on a string) without having to go through complicated steps every time. It essentially says that any wave on a string can be thought of as two identical waves, one traveling to the right and one traveling to the left, which then add up to create the total observed wave.

So, in short, D'Alembert's solution is a clever mathematical trick that gives us a direct formula to predict the exact shape and position of a one-dimensional wave at any future time, based only on its initial shape and initial velocity. It simplifies a complex problem into a straightforward calculation involving those initial conditions.

## 2. Why it matters — real-world applications

D'Alembert's solution, and the wave equation it solves, are fundamental to understanding how disturbances propagate through various media. Its simplicity and directness make it a powerful tool for initial analysis and as a building block for more complex wave phenomena.

1.  **Acoustic Engineering & Musical Instruments**: When you design a guitar, piano, or any string instrument, understanding how vibrations travel along the strings is paramount. D'Alembert's solution directly models the displacement of a vibrating string given its initial plucking (displacement) and striking (velocity). This informs string tension, material choice, and instrument body design to achieve desired sounds. For instance, companies like **Fender** or **Steinway & Sons** implicitly rely on these principles to ensure their instruments produce rich, sustained tones.
2.  **Seismology**: While earthquake waves are complex 3D phenomena, the fundamental principles of wave propagation, including the idea of waves traveling in different directions and superimposing, are rooted in the wave equation. D'Alembert's solution provides a foundational understanding of how seismic waves (P-waves and S-waves) propagate through the Earth's crust, helping geophysicists at organizations like the **USGS** interpret seismograph data to locate epicenters and understand geological structures.
3.  **Optics and Electromagnetism (simplified models)**: Light is an electromagnetic wave. While full electromagnetic waves are described by Maxwell's equations (a set of coupled PDEs), in certain simplified scenarios, particularly in one dimension or for specific components of the electric/magnetic field, the wave equation emerges. D'Alembert's solution offers an intuitive way to understand how light pulses travel through optical fibers or free space, which is crucial for telecommunications companies like **Verizon** or **AT&T** when designing high-speed fiber optic networks.
4.  **Aerospace Engineering (Supersonic Flow)**: In aerodynamics, particularly when dealing with supersonic flight, disturbances in air pressure propagate as sound waves. The linearized equations for compressible flow often simplify to wave equations. Understanding how these pressure waves (shock waves, expansion waves) propagate is critical for designing aircraft like the **Concorde** (historically) or current military jets, minimizing drag, and managing sonic booms. D'Alembert's solution provides a basic framework for understanding these propagation patterns.

## 3. Prerequisites — what you must know first

Before diving into D'Alembert's solution, ensure you have a solid grasp of the following concepts:

*   **Partial Derivatives**: How to differentiate a function with respect to one variable while treating others as constants. Essential for understanding the wave equation itself.
*   **Chain Rule (for multiple variables)**: How to differentiate a composite function where the inner functions depend on multiple variables. Absolutely crucial for the change of variables method in D'Alembert's derivation.
*   **Second-Order Partial Differential Equations (PDEs)**: Familiarity with the general form and concept of PDEs involving second derivatives. The wave equation is a specific type of second-order linear PDE.
*   **Initial Value Problems (IVPs)**: Understanding that a differential equation often requires initial conditions (e.g., initial position, initial velocity) to yield a unique solution.
*   **Integration (definite and indefinite)**: How to find antiderivatives and evaluate definite integrals. Required for applying initial conditions and constructing the final solution.
*   **Fundamental Theorem of Calculus**: The relationship between differentiation and integration, particularly how $\int_a^b F'(x) dx = F(b) - F(a)$. Used in the derivation of the final form of D'Alembert's solution.
*   **Arbitrary Functions of Integration**: When integrating a partial derivative, the "constant of integration" can be an arbitrary function of the other variables. This is key to solving $u_{\xi\eta}=0$.

## 4. The core idea — step by step

The core idea behind D'Alembert's solution is to transform the wave equation from its original coordinate system $(x,t)$ into a new coordinate system $(\xi, \eta)$ where it becomes much simpler to solve. This simplification reveals the traveling wave nature of the solution.

We are solving the one-dimensional wave equation:
$$u_{tt} = c^2 u_{xx}$$
with initial conditions:
$$u(x,0) = f(x) \quad (\text{initial displacement})$$
$$u_t(x,0) = g(x) \quad (\text{initial velocity})$$
where $u(x,t)$ is the displacement of the wave at position $x$ and time $t$, and $c$ is the wave speed.

### Step 1: Introduce new characteristic coordinates

**Plain-English Statement:** Instead of looking at the wave's position and time separately, let's think about "paths" that waves naturally follow. Imagine a point moving along the string. If it's moving with the wave to the right, its position $x$ increases at a rate of $c$, so $x - ct$ stays constant. If it's moving with the wave to the left, $x$ decreases at a rate of $c$, so $x + ct$ stays constant. These "constant values" are our new coordinates.

**Small Concrete Example:** If a wave crest is at $x=0$ at $t=0$ and moves right at $c=1$ m/s, at $t=1$s it's at $x=1$m. For this crest, $x-ct = 0-1(0) = 0$ and $x-ct = 1-1(1) = 0$. So $x-ct$ is constant for this right-moving feature. Similarly for a left-moving feature, $x+ct$ would be constant.

**Formal/Mathematical Version:** We define new independent variables $\xi$ (xi) and $\eta$ (eta) as:
$$\xi = x - ct$$
$$\eta = x + ct$$

**What could go wrong:** Forgetting the sign convention or which variable corresponds to which direction. $\xi = x-ct$ is associated with waves moving to the right (positive $x$ direction), and $\eta = x+ct$ is associated with waves moving to the left (negative $x$ direction). The speed $c$ is a positive constant.

### Step 2: Transform the partial derivatives using the Chain Rule

**Plain-English Statement:** Our wave equation is written in terms of derivatives with respect to $x$ and $t$. Since we've decided to use new coordinates $\xi$ and $\eta$, we need to rewrite all those derivatives. The Chain Rule is our tool for this, telling us how changes in $x$ and $t$ relate to changes in $\xi$ and $\eta$.

**Small Concrete Example:** If $u$ depends on $x$ and $t$, and $x$ and $t$ depend on $\xi$ and $\eta$ (which is effectively what we're doing by defining $\xi$ and $\eta$ in terms of $x$ and $t$), then differentiating $u$ with respect to $x$ means we have to account for how $x$ affects $\xi$ and $\eta$, and how $\xi$ and $\eta$ affect $u$.

**Formal/Mathematical Version:**
We use the chain rule to express $u_x, u_t, u_{xx}, u_{tt}$ in terms of $\xi$ and $\eta$ derivatives.
First, the first derivatives:
$$u_x = \frac{\partial u}{\partial \xi} \frac{\partial \xi}{\partial x} + \frac{\partial u}{\partial \eta} \frac{\partial \eta}{\partial x} = u_\xi (1) + u_\eta (1) = u_\xi + u_\eta$$
$$u_t = \frac{\partial u}{\partial \xi} \frac{\partial \xi}{\partial t} + \frac{\partial u}{\partial \eta} \frac{\partial \eta}{\partial t} = u_\xi (-c) + u_\eta (c) = c(u_\eta - u_\xi)$$

Next, the second derivatives:
$$u_{xx} = \frac{\partial}{\partial x} (u_\xi + u_\eta) = \frac{\partial}{\partial \xi} (u_\xi + u_\eta) \frac{\partial \xi}{\partial x} + \frac{\partial}{\partial \eta} (u_\xi + u_\eta) \frac{\partial \eta}{\partial x}$$
$$u_{xx} = (u_{\xi\xi} + u_{\eta\xi})(1) + (u_{\xi\eta} + u_{\eta\eta})(1) = u_{\xi\xi} + 2u_{\xi\eta} + u_{\eta\eta}$$
(assuming $u_{\xi\eta} = u_{\eta\xi}$ which is true for sufficiently smooth functions).

$$u_{tt} = \frac{\partial}{\partial t} (c(u_\eta - u_\xi)) = c \left( \frac{\partial}{\partial t} u_\eta - \frac{\partial}{\partial t} u_\xi \right)$$
$$u_{tt} = c \left[ \left( \frac{\partial u_\eta}{\partial \xi} \frac{\partial \xi}{\partial t} + \frac{\partial u_\eta}{\partial \eta} \frac{\partial \eta}{\partial t} \right) - \left( \frac{\partial u_\xi}{\partial \xi} \frac{\partial \xi}{\partial t} + \frac{\partial u_\xi}{\partial \eta} \frac{\partial \eta}{\partial t} \right) \right]$$
$$u_{tt} = c \left[ (u_{\eta\xi}(-c) + u_{\eta\eta}(c)) - (u_{\xi\xi}(-c) + u_{\xi\eta}(c)) \right]$$
$$u_{tt} = c \left[ -c u_{\eta\xi} + c u_{\eta\eta} + c u_{\xi\xi} - c u_{\xi\eta} \right]$$
$$u_{tt} = c^2 (u_{\xi\xi} - 2u_{\xi\eta} + u_{\eta\eta})$$

**What could go wrong:** Errors in applying the chain rule, especially with signs or missing terms when differentiating the second time. It's easy to forget that $u_\xi$ and $u_\eta$ are themselves functions of $\xi$ and $\eta$.

### Step 3: Substitute into the wave equation and simplify

**Plain-English Statement:** Now that we've translated all the derivatives into our new $\xi, \eta$ language, we can plug them back into the original wave equation. Miraculously, a lot of terms cancel out, leaving us with a much simpler equation.

**Small Concrete Example:** Imagine you have a complicated algebraic equation like $(A+B)^2 - (A-B)^2 = 4AB$. If you substitute $A=x^2$ and $B=y^2$, it still looks complicated. But if you substitute $A=u_\xi$ and $B=u_\eta$, and then plug into the wave equation, you'll see a lot of terms cancel.

**Formal/Mathematical Version:** Substitute the expressions for $u_{tt}$ and $u_{xx}$ into $u_{tt} = c^2 u_{xx}$:
$$c^2 (u_{\xi\xi} - 2u_{\xi\eta} + u_{\eta\eta}) = c^2 (u_{\xi\xi} + 2u_{\xi\eta} + u_{\eta\eta})$$
Divide both sides by $c^2$ (assuming $c \neq 0$):
$$u_{\xi\xi} - 2u_{\xi\eta} + u_{\eta\eta} = u_{\xi\xi} + 2u_{\xi\eta} + u_{\eta\eta}$$
Subtract $u_{\xi\xi}$ and $u_{\eta\eta}$ from both sides:
$$-2u_{\xi\eta} = 2u_{\xi\eta}$$
$$4u_{\xi\eta} = 0$$
$$u_{\xi\eta} = 0$$

**What could go wrong:** Algebraic errors during the cancellation. It's crucial to be precise with signs.

### Step 4: Solve the simplified PDE

**Plain-English Statement:** The new equation, $u_{\xi\eta} = 0$, is incredibly simple. It means that if you differentiate $u$ first with respect to $\eta$, and then with respect to $\xi$, you get zero. This implies that the function $u$ must be a sum of two functions: one that only depends on $\xi$, and another that only depends on $\eta$.

**Small Concrete Example:** If $\frac{d^2y}{dx^2} = 0$, then $y = Ax+B$. Here, we have partial derivatives. If $u_{xy}=0$, then $u(x,y) = F(x) + G(y)$.

**Formal/Mathematical Version:**
The equation $u_{\xi\eta} = 0$ can be written as $\frac{\partial}{\partial \eta} \left( \frac{\partial u}{\partial \xi} \right) = 0$.
Integrating with respect to $\eta$:
$$\frac{\partial u}{\partial \xi} = G(\xi)$$
where $G(\xi)$ is an arbitrary function of $\xi$ (it's a "constant" with respect to $\eta$).
Now, integrate with respect to $\xi$:
$$u(\xi, \eta) = \int G(\xi) d\xi + H(\eta)$$
Let $F(\xi) = \int G(\xi) d\xi$. Then the general solution in $(\xi, \eta)$ coordinates is:
$$u(\xi, \eta) = F(\xi) + H(\eta)$$
where $F$ and $H$ are arbitrary differentiable functions.

**What could go wrong:** Forgetting that the "constants of integration" for partial derivatives are actually arbitrary functions of the other variables, not just constant numbers.

### Step 5: Transform back to original coordinates

**Plain-English Statement:** We found our general solution in terms of $\xi$ and $\eta$. Now, we just need to substitute back our original definitions of $\xi$ and $\eta$ in terms of $x$ and $t$ to get the solution in our original coordinates.

**Small Concrete Example:** If you found $y = A\xi + B\eta$ and you know $\xi = x-ct$ and $\eta = x+ct$, then $y = A(x-ct) + B(x+ct)$.

**Formal/Mathematical Version:**
Substitute $\xi = x - ct$ and $\eta = x + ct$ back into $u(\xi, \eta) = F(\xi) + H(\eta)$:
$$u(x,t) = F(x - ct) + H(x + ct)$$
This is the general solution to the one-dimensional wave equation. $F(x-ct)$ represents a wave traveling to the right at speed $c$, and $H(x+ct)$ represents a wave traveling to the left at speed $c$.

**What could go wrong:** Simply stopping here and thinking you've solved the problem. This is the general solution, but we still need to use the initial conditions to find the specific functions $F$ and $H$.

### Step 6: Apply initial conditions to find F and H

**Plain-English Statement:** The general solution $F(x-ct) + H(x+ct)$ describes *any* wave. To find *our specific* wave (the one from the guitar string we plucked), we need to use the information about its starting shape and initial speed. This will give us equations to figure out exactly what the functions $F$ and $H$ must be.

**Small Concrete Example:** If you know $y=Ax+B$ and $y(0)=5, y'(0)=2$, you can find $A$ and $B$. Here, we have functions $F$ and $H$, and initial *functions* $f(x)$ and $g(x)$.

**Formal/Mathematical Version:**
We have two initial conditions:
1.  $u(x,0) = f(x)$
2.  $u_t(x,0) = g(x)$

From the general solution $u(x,t) = F(x - ct) + H(x + ct)$:
Applying condition 1 (set $t=0$):
$$u(x,0) = F(x) + H(x) = f(x) \quad (*)$$

Now, we need $u_t(x,t)$. Differentiate $u(x,t)$ with respect to $t$ using the chain rule:
$$u_t(x,t) = \frac{\partial}{\partial t} F(x-ct) + \frac{\partial}{\partial t} H(x+ct)$$
$$u_t(x,t) = F'(x-ct) \cdot (-c) + H'(x+ct) \cdot (c)$$
$$u_t(x,t) = c(H'(x+ct) - F'(x-ct))$$
Applying condition 2 (set $t=0$):
$$u_t(x,0) = c(H'(x) - F'(x)) = g(x)$$
$$H'(x) - F'(x) = \frac{1}{c} g(x) \quad (**)$$

Now we have a system of two equations for $F(x)$ and $H(x)$:
1.  $F(x) + H(x) = f(x)$
2.  $H'(x) - F'(x) = \frac{1}{c} g(x)$

Differentiate equation (1) with respect to $x$:
$$F'(x) + H'(x) = f'(x) \quad (***)$$

Add $(**)$ and $(***)$:
$$(H'(x) - F'(x)) + (F'(x) + H'(x)) = \frac{1}{c} g(x) + f'(x)$$
$$2H'(x) = f'(x) + \frac{1}{c} g(x)$$
Integrate with respect to $x$:
$$H(x) = \frac{1}{2} f(x) + \frac{1}{2c} \int_0^x g(s) ds + K_1$$
(We use a definite integral from $0$ to $x$ for convenience, the lower limit choice will cancel out later).

Subtract $(**)$ from $(***)$:
$$(F'(x) + H'(x)) - (H'(x) - F'(x)) = f'(x) - \frac{1}{c} g(x)$$
$$2F'(x) = f'(x) - \frac{1}{c} g(x)$$
Integrate with respect to $x$:
$$F(x) = \frac{1}{2} f(x) - \frac{1}{2c} \int_0^x g(s) ds + K_2$$

Substitute $F(x-ct)$ and $H(x+ct)$ back into $u(x,t) = F(x-ct) + H(x+ct)$:
$$u(x,t) = \left( \frac{1}{2} f(x-ct) - \frac{1}{2c} \int_0^{x-ct} g(s) ds + K_2 \right) + \left( \frac{1}{2} f(x+ct) + \frac{1}{2c} \int_0^{x+ct} g(s) ds + K_1 \right)$$
$$u(x,t) = \frac{1}{2} [f(x-ct) + f(x+ct)] + \frac{1}{2c} \left[ \int_0^{x+ct} g(s) ds - \int_0^{x-ct} g(s) ds \right] + (K_1+K_2)$$
From equation $(*)$, we know $F(x) + H(x) = f(x)$. Substituting our expressions for $F(x)$ and $H(x)$:
$$\left( \frac{1}{2} f(x) - \frac{1}{2c} \int_0^x g(s) ds + K_2 \right) + \left( \frac{1}{2} f(x) + \frac{1}{2c} \int_0^x g(s) ds + K_1 \right) = f(x)$$
$$f(x) + K_1 + K_2 = f(x)$$
This implies $K_1 + K_2 = 0$. So the constants cancel out.

The final D'Alembert's solution is:
$$u(x,t) = \frac{1}{2} [f(x-ct) + f(x+ct)] + \frac{1}{2c} \int_{x-ct}^{x+ct} g(s) ds$$

**What could go wrong:** Errors in solving the system of ODEs for $F(x)$ and $H(x)$, especially signs or integration constants. Forgetting the Fundamental Theorem of Calculus when combining the integrals.

## 5. Worked examples — multiple, with every step shown

We will use the D'Alembert's solution formula:
$$u(x,t) = \frac{1}{2} [f(x-ct) + f(x+ct)] + \frac{1}{2c} \int_{x-ct}^{x+ct} g(s) ds$$
where $u(x,0) = f(x)$ and $u_t(x,0) = g(x)$.

### Example 1: Initial displacement, zero initial velocity

**Problem:** Solve the wave equation $u_{tt} = 4 u_{xx}$ for $-\infty < x < \infty$, $t > 0$, with initial conditions:
$$u(x,0) = e^{-x^2}$$
$$u_t(x,0) = 0$$

**Identify what's given and what we want:**
*   Wave equation: $u_{tt} = c^2 u_{xx}$, so $c^2 = 4 \Rightarrow c = 2$.
*   Initial displacement function: $f(x) = e^{-x^2}$.
*   Initial velocity function: $g(x) = 0$.
*   We want to find $u(x,t)$.

**Show every algebraic / logical step:**

1.  **Identify $c$, $f(x)$, and $g(x)$ from the problem statement.**
    *   From $u_{tt} = 4 u_{xx}$, we have $c^2 = 4$, so $c = 2$.
    *   From $u(x,0) = e^{-x^2}$, we have $f(x) = e^{-x^2}$.
    *   From $u_t(x,0) = 0$, we have $g(x) = 0$.

2.  **Substitute these into D'Alembert's solution formula.**
    $$u(x,t) = \frac{1}{2} [f(x-ct) + f(x+ct)] + \frac{1}{2c} \int_{x-ct}^{x+ct} g(s) ds$$
    Since $g(x) = 0$, the integral term becomes zero.
    $$u(x,t) = \frac{1}{2} [f(x-ct) + f(x+ct)] + \frac{1}{2c} \int_{x-ct}^{x+ct} 0 \, ds$$
    *Explanation: The initial velocity is zero, meaning the wave starts from rest. Therefore, the part of the solution related to initial velocity vanishes.*

3.  **Simplify the integral term.**
    $$u(x,t) = \frac{1}{2} [f(x-ct) + f(x+ct)] + 0$$
    $$u(x,t) = \frac{1}{2} [f(x-ct) + f(x+ct)]$$
    *Explanation: The integral of zero is zero, so the second term disappears.*

4.  **Substitute $f(x) = e^{-x^2}$ and $c=2$ into the simplified formula.**
    $$f(x-ct) = f(x-2t) = e^{-(x-2t)^2}$$
    $$f(x+ct) = f(x+2t) = e^{-(x+2t)^2}$$
    *Explanation: We replace the argument of the function $f$ with $x-ct$ and $x+ct$ respectively, using the identified wave speed $c=2$.*

5.  **Write down the final solution.**
    $$u(x,t) = \frac{1}{2} [e^{-(x-2t)^2} + e^{-(x+2t)^2}]$$

**Final Answer:**
$$ \boxed{u(x,t) = \frac{1}{2} [e^{-(x-2t)^2} + e^{-(x+2t)^2}]} $$

**Reflection:** This example was straightforward because the initial velocity was zero, simplifying the integral term. It clearly shows how the initial shape $f(x)$ splits into two identical waves traveling in opposite directions. The $1/2$ factor means each traveling wave carries half of the initial amplitude.

### Example 2: Zero initial displacement, non-zero initial velocity

**Problem:** Solve the wave equation $u_{tt} = 9 u_{xx}$ for $-\infty < x < \infty$, $t > 0$, with initial conditions:
$$u(x,0) = 0$$
$$u_t(x,0) = \sin(x)$$

**Identify what's given and what we want:**
*   Wave equation: $u_{tt} = c^2 u_{xx}$, so $c^2 = 9 \Rightarrow c = 3$.
*   Initial displacement function: $f(x) = 0$.
*   Initial velocity function: $g(x) = \sin(x)$.
*   We want to find $u(x,t)$.

**Show every algebraic / logical step:**

1.  **Identify $c$, $f(x)$, and $g(x)$ from the problem statement.**
    *   From $u_{tt} = 9 u_{xx}$, we have $c^2 = 9$, so $c = 3$.
    *   From $u(x,0) = 0$, we have $f(x) = 0$.
    *   From $u_t(x,0) = \sin(x)$, we have $g(x) = \sin(x)$.

2.  **Substitute these into D'Alembert's solution formula.**
    $$u(x,t) = \frac{1}{2} [f(x-ct) + f(x+ct)] + \frac{1}{2c} \int_{x-ct}^{x+ct} g(s) ds$$
    Since $f(x) = 0$, the first term becomes zero.
    $$u(x,t) = \frac{1}{2} [0 + 0] + \frac{1}{2c} \int_{x-ct}^{x+ct} g(s) ds$$
    *Explanation: The initial displacement is zero, meaning the wave starts from a flat position. Therefore, the part of the solution related to initial displacement vanishes.*

3.  **Simplify the first term.**
    $$u(x,t) = \frac{1}{2c} \int_{x-ct}^{x+ct} g(s) ds$$
    *Explanation: The first term is zero.*

4.  **Substitute $g(s) = \sin(s)$ and $c=3$ into the integral.**
    $$u(x,t) = \frac{1}{2(3)} \int_{x-3t}^{x+3t} \sin(s) ds$$
    $$u(x,t) = \frac{1}{6} \int_{x-3t}^{x+3t} \sin(s) ds$$
    *Explanation: We replace $c$ with its value $3$ and $g(s)$ with $\sin(s)$ inside the integral.*

5.  **Evaluate the definite integral.**
    The antiderivative of $\sin(s)$ is $-\cos(s)$.
    $$\int_{x-3t}^{x+3t} \sin(s) ds = [-\cos(s)]_{x-3t}^{x+3t}$$
    $$= -\cos(x+3t) - (-\cos(x-3t))$$
    $$= -\cos(x+3t) + \cos(x-3t)$$
    *Explanation: We apply the Fundamental Theorem of Calculus: $\int_a^b F'(s) ds = F(b) - F(a)$. Here, $F(s) = -\cos(s)$.*

6.  **Substitute the result of the integral back into the solution.**
    $$u(x,t) = \frac{1}{6} [\cos(x-3t) - \cos(x+3t)]$$
    *Explanation: We combine the constant factor with the evaluated integral.*

7.  **Optionally, use a trigonometric identity for further simplification (difference of cosines).**
    Recall $\cos A - \cos B = -2 \sin\left(\frac{A+B}{2}\right) \sin\left(\frac{A-B}{2}\right)$.
    Let $A = x-3t$ and $B = x+3t$.
    $\frac{A+B}{2} = \frac{(x-3t) + (x+3t)}{2} = \frac{2x}{2} = x$
    $\frac{A-B}{2} = \frac{(x-3t) - (x+3t)}{2} = \frac{-6t}{2} = -3t$
    So, $\cos(x-3t) - \cos(x+3t) = -2 \sin(x) \sin(-3t) = -2 \sin(x) (-\sin(3t)) = 2 \sin(x) \sin(3t)$.
    $$u(x,t) = \frac{1}{6} [2 \sin(x) \sin(3t)]$$
    $$u(x,t) = \frac{1}{3} \sin(x) \sin(3t)$$
    *Explanation: This step is not strictly necessary for the solution but often provides a more compact and insightful form, showing the separation of variables for this specific case.*

**Final Answer:**
$$ \boxed{u(x,t) = \frac{1}{3} \sin(x) \sin(3t)} $$

**Reflection:** This example highlights the role of the initial velocity in generating the wave. The solution shows that the wave's shape is a product of a spatial function $\sin(x)$ and a temporal function $\sin(3t)$, which is a common form for standing waves. The trigonometric identity helps reveal this structure.

### Example 3: Both non-zero initial conditions

**Problem:** Solve the wave equation $u_{tt} = u_{xx}$ for $-\infty < x < \infty$, $t > 0$, with initial conditions:
$$u(x,0) = \cos(x)$$
$$u_t(x,0) = x$$

**Identify what's given and what we want:**
*   Wave equation: $u_{tt} = c^2 u_{xx}$, so $c^2 = 1 \Rightarrow c = 1$.
*   Initial displacement function: $f(x) = \cos(x)$.
*   Initial velocity function: $g(x) = x$.
*   We want to find $u(x,t)$.

**Show every algebraic / logical step:**

1.  **Identify $c$, $f(x)$, and $g(x)$ from the problem statement.**
    *   From $u_{tt} = u_{xx}$, we have $c^2 = 1$, so $c = 1$.
    *   From $u(x,0) = \cos(x)$, we have $f(x) = \cos(x)$.
    *   From $u_t(x,0) = x$, we have $g(x) = x$.

2.  **Substitute these into D'Alembert's solution formula.**
    $$u(x,t) = \frac{1}{2} [f(x-ct) + f(x+ct)] + \frac{1}{2c} \int_{x-ct}^{x+ct} g(s) ds$$
    $$u(x,t) = \frac{1}{2} [\cos(x-1t) + \cos(x+1t)] + \frac{1}{2(1)} \int_{x-1t}^{x+1t} s \, ds$$
    $$u(x,t) = \frac{1}{2} [\cos(x-t) + \cos(x+t)] + \frac{1}{2} \int_{x-t}^{x+t} s \, ds$$
    *Explanation: We replace $c$ with $1$, $f(x)$ with $\cos(x)$, and $g(s)$ with $s$ in the formula.*

3.  **Evaluate the first term (displacement part).**
    Use the trigonometric identity $\cos A + \cos B = 2 \cos\left(\frac{A+B}{2}\right) \cos\left(\frac{A-B}{2}\right)$.
    Let $A = x-t$ and $B = x+t$.
    $\frac{A+B}{2} = \frac{(x-t) + (x+t)}{2} = \frac{2x}{2} = x$
    $\frac{A-B}{2} = \frac{(x-t) - (x+t)}{2} = \frac{-2t}{2} = -t$
    So, $\cos(x-t) + \cos(x+t) = 2 \cos(x) \cos(-t) = 2 \cos(x) \cos(t)$ (since $\cos$ is an even function).
    The first term becomes: $\frac{1}{2} [2 \cos(x) \cos(t)] = \cos(x) \cos(t)$.
    *Explanation: Simplifying the sum of two cosine terms makes the solution more compact.*

4.  **Evaluate the second term (velocity part - the integral).**
    The antiderivative of $s$ is $\frac{s^2}{2}$.
    $$\int_{x-t}^{x+t} s \, ds = \left[\frac{s^2}{2}\right]_{x-t}^{x+t}$$
    $$= \frac{(x+t)^2}{2} - \frac{(x-t)^2}{2}$$
    $$= \frac{1}{2} [(x+t)^2 - (x-t)^2]$$
    $$= \frac{1}{2} [(x^2 + 2xt + t^2) - (x^2 - 2xt + t^2)]$$
    $$= \frac{1}{2} [x^2 + 2xt + t^2 - x^2 + 2xt - t^2]$$
    $$= \frac{1}{2} [4xt]$$
    $$= 2xt$$
    *Explanation: Evaluate the definite integral using the Fundamental Theorem of Calculus and simplify the algebraic expression.*

5.  **Combine the results from steps 3 and 4.**
    The second term in the D'Alembert's formula also has a $1/2c$ factor, which is $1/2$ here.
    So, the second term is $\frac{1}{2} (2xt) = xt$.
    Therefore, $u(x,t) = \cos(x) \cos(t) + xt$.
    *Explanation: Add the simplified displacement term and the simplified velocity term.*

**Final Answer:**
$$ \boxed{u(x,t) = \cos(x) \cos(t) + xt} $$

**Reflection:** This example shows how both initial displacement and initial velocity contribute to the final wave solution. The solution is simply the sum of the solutions obtained from each initial condition separately (due to linearity of the wave equation). The algebraic simplification of the integral term is a common step.

### Example 4: Piecewise initial displacement, zero initial velocity

**Problem:** Solve the wave equation $u_{tt} = u_{xx}$ for $-\infty < x < \infty$, $t > 0$, with initial conditions:
$$u(x,0) = f(x) = \begin{cases} 1 & \text{if } -1 \le x \le 1 \\ 0 & \text{otherwise} \end{cases}$$
$$u_t(x,0) = 0$$

**Identify what's given and what we want:**
*   Wave equation: $u_{tt} = c^2 u_{xx}$, so $c^2 = 1 \Rightarrow c = 1$.
*   Initial displacement function: $f(x)$ is a rectangular pulse.
*   Initial velocity function: $g(x) = 0$.
*   We want to find $u(x,t)$.

**Show every algebraic / logical step:**

1.  **Identify $c$, $f(x)$, and $g(x)$ from the problem statement.**
    *   From $u_{tt} = u_{xx}$, we have $c^2 = 1$, so $c = 1$.
    *   $f(x)$ is the given piecewise function.
    *   From $u_t(x,0) = 0$, we have $g(x) = 0$.

2.  **Substitute these into D'Alembert's solution formula.**
    $$u(x,t) = \frac{1}{2} [f(x-ct) + f(x+ct)] + \frac{1}{2c} \int_{x-ct}^{x+ct} g(s) ds$$
    Since $g(x) = 0$, the integral term is zero.
    $$u(x,t) = \frac{1}{2} [f(x-t) + f(x+t)]$$
    *Explanation: The initial velocity is zero, simplifying the solution to only the displacement part with $c=1$.*

3.  **Analyze the terms $f(x-t)$ and $f(x+t)$ based on the definition of $f(x)$.**
    The function $f(s)$ is $1$ when $-1 \le s \le 1$, and $0$ otherwise.
    *   The term $f(x-t)$ represents a pulse traveling to the right. It is $1$ when $-1 \le x-t \le 1$, which means $t-1 \le x \le t+1$. Otherwise, it's $0$.
    *   The term $f(x+t)$ represents a pulse traveling to the left. It is $1$ when $-1 \le x+t \le 1$, which means $-t-1 \le x \le -t+1$. Otherwise, it's $0$.
    *Explanation: We apply the definition of the piecewise function $f$ to its arguments $x-t$ and $x+t$. The conditions on $x$ for the function to be non-zero define the "support" of the traveling pulses.*

4.  **Combine these two terms to form $u(x,t)$.**
    We need to consider different regions of $x$ and $t$.
    Let $f_R(x,t) = f(x-t)$ and $f_L(x,t) = f(x+t)$.
    $$u(x,t) = \frac{1}{2} [f_R(x,t) + f_L(x,t)]$$

    *   **Case 1: $t=0$**
        $u(x,0) = \frac{1}{2}[f(x) + f(x)] = f(x)$. This matches the initial condition.
    *   **Case 2: $0 < t < 1$** (The pulses are still overlapping)
        The right-moving pulse $f(x-t)$ is $1$ for $t-1 \le x \le t+1$.
        The left-moving pulse $f(x+t)$ is $1$ for $-t-1 \le x \le -t+1$.
        *   If $x \in [-1-t, 1-t)$ (left part of $f_L$): $f_L=1, f_R=0 \Rightarrow u(x,t) = 1/2$.
        *   If $x \in [1-t, -1+t]$ (overlap region): $f_L=1, f_R=1 \Rightarrow u(x,t) = 1$. (This region exists only if $1-t < -1+t \Rightarrow 2 < 2t \Rightarrow t > 1$, so this region does *not* exist for $t<1$. My interval definitions are wrong here. Let's be more precise.)

    Let's define the intervals for $f_R$ and $f_L$:
    $I_R = [t-1, t+1]$
    $I_L = [-t-1, -t+1]$

    For $0 \le t < 1$:
    *   If $x \in I_L$ and $x \notin I_R$: $u(x,t) = \frac{1}{2}(0+1) = \frac{1}{2}$
        This is for $x \in [-t-1, -t+1]$ and $x < t-1$. Since $t-1 < -t+1$ (as $2t < 2 \Rightarrow t < 1$), this means $x \in [-t-1, t-1)$.
    *   If $x \in I_R$ and $x \notin I_L$: $u(x,t) = \frac{1}{2}(1+0) = \frac{1}{2}$
        This is for $x \in [t-1, t+1]$ and $x > -t+1$. Since $-t+1 < t+1$, this means $x \in (-t+1, t+1]$.
    *   If $x \in I_L \cap I_R$: $u(x,t) = \frac{1}{2}(1+1) = 1$
        This is for $x \in [t-1, -t+1]$. This interval is non-empty only if $t-1 \le -t+1 \Rightarrow 2t \le 2 \Rightarrow t \le 1$.
        So for $0 \le t \le 1$, the overlap is $[t-1, -t+1]$.
    *   Otherwise: $u(x,t) = 0$.

    Let's summarize for $0 \le t \le 1$:
    $$u(x,t) = \begin{cases} 1/2 & \text{if } x \in [-t-1, t-1) \text{ or } x \in (-t+1, t+1] \\ 1 & \text{if } x \in [t-1, -t+1] \\ 0 & \text{otherwise} \end{cases}$$
    This describes the initial square pulse splitting into two half-height pulses, which move apart. The central part remains at height 1 until $t=1$.

    *   **Case 3: $t > 1$** (The pulses have separated)
        The right-moving pulse $f(x-t)$ is $1$ for $t-1 \le x \le t+1$.
        The left-moving pulse $f(x+t)$ is $1$ for $-t-1 \le x \le -t+1$.
        In this case, $t-1 > -t+1$ (since $2t > 2 \Rightarrow t > 1$), so the intervals $I_R$ and $I_L$ are disjoint.
        Therefore, there is no overlap region where both are 1.
        $$u(x,t) = \begin{cases} 1/2 & \text{if } t-1 \le x \le t+1 \\ 1/2 & \text{if } -t-1 \le x \le -t+1 \\ 0 & \text{otherwise} \end{cases}$$
        *Explanation: For $t>1$, the two pulses have completely separated, each having half the original height.*

**Final Answer:**
$$ \boxed{u(x,t) = \begin{cases} 1 & \text{if } t-1 \le x \le -t+1 \quad (\text{for } 0 \le t \le 1) \\ 1/2 & \text{if } x \in [-t-1, t-1) \text{ or } x \in (-t+1, t+1] \quad (\text{for } 0 \le t \le 1) \\ 1/2 & \text{if } t-1 \le x \le t+1 \text{ or } -t-1 \le x \le -t+1 \quad (\text{for } t > 1) \\ 0 & \text{otherwise} \end{cases}} $$

**Reflection:** This example is tricky because of the piecewise nature of $f(x)$. It requires careful consideration of the intervals where $f(x-t)$ and $f(x+t)$ are non-zero, and how these intervals overlap (or don't overlap) as time progresses. It vividly demonstrates the physical phenomenon of a single pulse splitting into two half-height pulses traveling in opposite directions.

## 6. Common mistakes and traps

1.  **Incorrectly identifying $c$**: Students sometimes forget that $c^2$ is the coefficient of $u_{xx}$, so $c$ is its square root. Forgetting to take the square root or using the wrong value of $c$ will lead to incorrect traveling wave speeds and integral limits.
2.  **Sign errors in $x-ct$ or $x+ct$**: Mixing up which term corresponds to the right-moving or left-moving wave, or incorrectly applying the chain rule when deriving $u_{tt}$ and $u_{xx}$ in the $\xi, \eta$ coordinates.
3.  **Errors in evaluating the definite integral**: Especially with complex $g(x)$ functions or when the limits $x-ct$ and $x+ct$ are involved. Forgetting the minus sign for $\int \sin(s)ds = -\cos(s)$ is a common one.
4.  **Forgetting the $1/2$ or $1/(2c)$ factors**: The D'Alembert's formula has specific coefficients for each term. Omitting them or placing them incorrectly is a frequent algebraic error.
5.  **Not fully simplifying the solution**: Leaving the solution in terms of $\frac{1}{2c} [F(x+ct) - F(x-ct)]$ instead of explicitly evaluating the integral and simplifying, especially using trigonometric identities.
6.  **Misinterpreting piecewise functions**: When $f(x)$ or $g(x)$ are piecewise, determining the regions where $f(x-ct)$, $f(x+ct)$, or the integrand $g(s)$ are non-zero requires careful attention to inequalities, leading to complex case analyses as seen in Example 4.

## 7. Textbook-precise explanation

The D'Alembert's solution provides the explicit solution to the initial value problem for the one-dimensional homogeneous wave equation on an infinite domain.

Consider the one-dimensional wave equation:
$$u_{tt} = c^2 u_{xx} \quad \text{for } -\infty < x < \infty, t > 0$$
with initial conditions:
$$u(x,0) = f(x)$$
$$u_t(x,0) = g(x)$$
where $f(x)$ represents the initial displacement and $g(x)$ represents the initial velocity of the wave. We assume $f(x) \in C^2(\mathbb{R})$ and $g(x) \in C^1(\mathbb{R})$ for the solution to be classical ($u \in C^2$).

**Derivation using Characteristic Coordinates:**

1.  **Change of Variables**: Introduce new independent variables (characteristic coordinates):
    $$\xi = x - ct$$
    $$\eta = x + ct$$
    These transform the $(x,t)$ coordinate system into a system aligned with the directions of wave propagation.

2.  **Transformation of Derivatives**: Using the chain rule, the partial derivatives with respect to $x$ and $t$ are transformed:
    $$\frac{\partial}{\partial x} = \frac{\partial \xi}{\partial x} \frac{\partial}{\partial \xi} + \frac{\partial \eta}{\partial \eta} \frac{\partial}{\partial \eta} = \frac{\partial}{\partial \xi} + \frac{\partial}{\partial \eta}$$
    $$\frac{\partial}{\partial t} = \frac{\partial \xi}{\partial t} \frac{\partial}{\partial \xi} + \frac{\partial \eta}{\partial t} \frac{\partial}{\partial \eta} = -c \frac{\partial}{\partial \xi} + c \frac{\partial}{\partial \eta}$$
    Applying these operators twice to $u(x,t) = U(\xi, \eta)$:
    $$u_{xx} = (\frac{\partial}{\partial \xi} + \frac{\partial}{\partial \eta}) (\frac{\partial u}{\partial \xi} + \frac{\partial u}{\partial \eta}) = u_{\xi\xi} + 2u_{\xi\eta} + u_{\eta\eta}$$
    $$u_{tt} = (-c \frac{\partial}{\partial \xi} + c \frac{\partial}{\partial \eta}) (-c \frac{\partial u}{\partial \xi} + c \frac{\partial u}{\partial \eta}) = c^2 (u_{\xi\xi} - 2u_{\xi\eta} + u_{\eta\eta})$$

3.  **Substitution into Wave Equation**: Substitute $u_{xx}$ and $u_{tt}$ into $u_{tt} = c^2 u_{xx}$:
    $$c^2 (u_{\xi\xi} - 2u_{\xi\eta} + u_{\eta\eta}) = c^2 (u_{\xi\xi} + 2u_{\xi\eta} + u_{\eta\eta})$$
    Assuming $c \neq 0$, we can divide by $c^2$:
    $$u_{\xi\xi} - 2u_{\xi\eta} + u_{\eta\eta} = u_{\xi\xi} + 2u_{\xi\eta} + u_{\eta\eta}$$
    This simplifies to:
    $$4u_{\xi\eta} = 0 \implies u_{\xi\eta} = 0$$

4.  **Integration of Simplified PDE**: The equation $u_{\xi\eta} = 0$ implies that $\frac{\partial}{\partial \eta} \left( \frac{\partial u}{\partial \xi} \right) = 0$.
    Integrating with respect to $\eta$, we get $\frac{\partial u}{\partial \xi} = G(\xi)$, where $G(\xi)$ is an arbitrary function of $\xi$.
    Integrating with respect to $\xi$, we get $u(\xi, \eta) = \int G(\xi) d\xi + H(\eta)$.
    Let $F(\xi) = \int G(\xi) d\xi$. Then the general solution is:
    $$u(\xi, \eta) = F(\xi) + H(\eta)$$
    where $F$ and $H$ are arbitrary $C^2$ functions.

5.  **Return to Original Coordinates**: Substituting back $\xi = x - ct$ and $\eta = x + ct$:
    $$u(x,t) = F(x - ct) + H(x + ct)$$
    This is the general solution to the one-dimensional wave equation, representing the superposition of a right-traveling wave $F(x-ct)$ and a left-traveling wave $H(x+ct)$.

6.  **Application of Initial Conditions**: We use the initial conditions $u(x,0) = f(x)$ and $u_t(x,0) = g(x)$ to determine $F$ and $H$.
    From $u(x,0) = f(x)$:
    $$F(x) + H