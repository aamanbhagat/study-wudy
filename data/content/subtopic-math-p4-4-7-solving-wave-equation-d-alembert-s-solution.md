## What it is
D'Alembert's solution is an explicit formula that solves the one-dimensional wave equation, $u_{tt} = c^2 u_{xx}$, for an infinitely long string. It expresses the displacement $u(x,t)$ at any position $x$ and time $t$ as the superposition of two waves traveling in opposite directions. The shapes of these waves are determined entirely by the initial displacement and initial velocity of the string.

## Why it matters
This solution is the fundamental model for wave propagation, appearing everywhere from signal processing to structural mechanics. In aerospace, it helps analyze vibrations in aircraft components and the propagation of shock waves. In physics, it's the simplest analytical solution for describing how light, sound, or any other wave behaves, forming the basis for more complex theories in electromagnetism and acoustics.

## When to study it
Before tackling this, you must have a firm grasp of multivariable calculus, specifically partial derivatives and the multivariable chain rule. You should also be comfortable with basic ordinary differential equations (ODEs), including solving them by direct integration. Familiarity with the concept of a partial differential equation (PDE) and the physical setup of the wave equation is assumed.

## How to study it (step by step)
1.  **State the problem.** Write down the 1D wave equation for an infinite string with initial conditions:
    $$
    \begin{cases}
    u_{tt} = c^2 u_{xx}, & -\infty < x < \infty, t > 0 \\
    u(x,0) = f(x) & \text{(initial displacement)} \\
    u_t(x,0) = g(x) & \text{(initial velocity)}
    \end{cases}
    $$
2.  **Perform the key change of variables.** Introduce the characteristic coordinates $\xi = x + ct$ and $\eta = x - ct$. Use the multivariable chain rule to express $u_{tt}$ and $u_{xx}$ in terms of partial derivatives with respect to $\xi$ and $\eta$. This is the most crucial step; do not skip the algebra.
3.  **Derive the simplified PDE.** Show that in the new coordinate system, the wave equation becomes remarkably simple: $u_{\xi\eta} = 0$. This implies that the mixed partial derivative is zero.
4.  **Solve the simplified PDE.** Integrate $u_{\xi\eta} = 0$ with respect to $\eta$ to get $u_\xi = \phi(\xi)$, where $\phi$ is an arbitrary function of $\xi$. Then, integrate with respect to $\xi$ to get the general solution $u(\xi, \eta) = F(\xi) + G(\eta)$, where $F$ is an antiderivative of $\phi$ and $G$ is an arbitrary function of $\eta$.
5.  **Transform back to original coordinates.** Substitute $\xi = x+ct$ and $\eta = x-ct$ back into the general solution to get $u(x,t) = F(x+ct) + G(x-ct)$. Interpret $G(x+ct)$ as a wave traveling left and $F(x-ct)$ as a wave traveling right.
6.  **Apply the initial conditions.** Use $u(x,0) = f(x)$ and $u_t(x,0) = g(x)$ to create a system of two equations for the unknown functions $F$ and $G$. Solve this system to derive the final D'Alembert's formula.

## Key ideas, with intuition
1.  **Superposition of Traveling Waves:** The core idea is that any solution to the 1D wave equation can be broken down into two parts: one wave traveling left and one traveling right, without changing their shape.
    $$u(x,t) = \underbrace{F(x-ct)}_{\text{Right-moving wave}} + \underbrace{G(x+ct)}_{\text{Left-moving wave}}$$
    Think of $F(x-ct)$: as time $t$ increases, you need a larger $x$ to get the same value of the argument $x-ct$. This means the feature (e.g., a peak) of the function $F$ moves to the right. The opposite is true for $G(x+ct)$.

2.  **The Magic of Characteristic Coordinates:** The change of variables to $\xi = x+ct$ and $\eta = x-ct$ is not arbitrary. These are the "characteristic lines" of the PDE. Along these lines in the $x-t$ plane, the wave equation simplifies because information propagates along them. The transformation essentially "un-twists" the PDE into a form that can be solved by simple integration.

3.  **Domain of Dependence:** The value of the solution at a point $(x_0, t_0)$ does not depend on the initial conditions everywhere. It only depends on the initial values $f(x)$ and $g(x)$ within the interval $[x_0 - ct_0, x_0 + ct_0]$. This interval is the base of a triangle in the $x-t$ plane with its apex at $(x_0, t_0)$. Physically, this means that to know what happens at position $x_0$ at time $t_0$, you only need to consider the initial state of points from which a signal traveling at speed $c$ could have reached $x_0$ in time $t_0$.

## Worked example
Solve the wave equation $u_{tt} = 9u_{xx}$ with initial conditions $u(x,0) = \cos(x)$ and $u_t(x,0) = 0$.

**1. Identify parameters and functions.**
This is the Cauchy problem for the infinite string.
The wave speed squared is $c^2=9$, so $c=3$.
The initial displacement is $f(x) = \cos(x)$.
The initial velocity is $g(x) = 0$.

**2. Write down D'Alembert's formula.**
The general solution is:
$$u(x,t) = \frac{1}{2}[f(x-ct) + f(x+ct)] + \frac{1}{2c}\int_{x-ct}^{x+ct} g(s) ds$$

**3. Substitute the specific functions and parameters.**
$$u(x,t) = \frac{1}{2}[\cos(x-3t) + \cos(x+3t)] + \frac{1}{2(3)}\int_{x-3t}^{x+3t} 0 \, ds$$

**4. Simplify the expression.**
The integral term is zero.
$$u(x,t) = \frac{1}{2}[\cos(x-3t) + \cos(x+3t)]$$

**5. Use a trigonometric identity to simplify further (optional but good practice).**
Recall the sum-to-product identity: $\cos(A) + \cos(B) = 2\cos\left(\frac{A+B}{2}\right)\cos\left(\frac{A-B}{2}\right)$.
Let $A=x+3t$ and $B=x-3t$.
Then $\frac{A+B}{2} = \frac{2x}{2} = x$ and $\frac{A-B}{2} = \frac{6t}{2} = 3t$.
So,
$$u(x,t) = \frac{1}{2}[2\cos(x)\cos(3t)] = \cos(x)\cos(3t)$$

**Reflection:**
- Step 1 identified all the necessary pieces from the problem statement.
- Step 2 recalled the correct general formula, which is the core of the method.
- Step 3 correctly substituted our specific $f$, $g$, and $c$ into the formula. This is a direct application.
- Step 4 and 5 simplified the result. The zero initial velocity made the integral term vanish, simplifying the problem significantly. The final form, $\cos(x)\cos(3t)$, is a standing wave, which occurs when two identical waves travel in opposite directions. This makes physical sense: an initial cosine displacement, when released from rest, will oscillate in place.

## Diagrams

**Domain of Dependence:**
This diagram shows the $x-t$ plane. The value of the solution at point $P(x_0, t_0)$ is determined only by the initial data on the segment $[A, B]$ of the x-axis. The lines $AP$ and $BP$ are the characteristic lines $x+ct = \text{const}$ and $x-ct = \text{const}$.

```text
      t ^
        |
        |
        |      P(x_0, t_0)
        |     / \
        |    /   \
        |   /     \
        |  /       \
        | /         \
        +----------------------> x
          A         B
     (x_0-ct_0, 0) (x_0+ct_0, 0)
```

**Wave Splitting:**
This shows how an initial displacement $f(x)$ splits into two waves, each with half the amplitude, traveling in opposite directions.

```text
t=0:
      u ^
        |      f(x)
        |     /|\
        |    / | \
        |   /  |  \
        +--/---|---\-----------> x

t > 0:
      u ^
        |
        |    G(x+ct)         F(x-ct)
        |    <--/|\-->       <--/|\-->
        |      / | \           / | \
        +-----/--|--\---------/--|--\--> x
              (moving left) (moving right)
```

## Memory technique — remember this forever
1.  **Mnemonic Story:** Imagine a string is plucked ($f(x)$) and given an initial flick ($g(x)$). D'Alembert says the result is simple:
    - **"Half the pluck goes forward, half goes backward."** This is the $\frac{1}{2}[f(x-ct) + f(x+ct)]$ term.
    - **"Plus, you add up the 'kick' from all the points that could reach you."** This is the integral term. The kick $g(s)$ is integrated over the domain of dependence $[x-ct, x+ct]$. The $\frac{1}{2c}$ factor is a normalization constant you must memorize.

2.  **Formulas to Overlearn:**
    $$u(x,t) = \frac{1}{2}[f(x-ct) + f(x+ct)] + \frac{1}{2c}\int_{x-ct}^{x+ct} g(s) ds$$
    And the coordinate transformation that gets you there:
    $$\xi = x+ct, \quad \eta = x-ct$$

3.  **Spaced Repetition Schedule:**
    - Review this material and re-derive the formula from the coordinate change in **1 day**.
    - Solve a new problem in **3 days**.
    - Re-derive again from first principles in **7 days**.
    - Explain the "domain of dependence" to a wall in **16 days**.
    - Solve a hard problem with piecewise initial conditions in **35 days**.

4.  **First Principles Pathway:** If you forget the formula, remember the coordinate change: $\xi = x+ct, \eta = x-ct$.
    - Use the chain rule to transform $u_{tt} = c^2 u_{xx}$ into $u_{\xi\eta} = 0$.
    - Integrate twice to get $u(\xi, \eta) = F(\xi) + G(\eta)$.
    - Substitute back: $u(x,t) = F(x-ct) + G(x+ct)$.
    - Re-solve for $F$ and $G$ using the initial conditions $u(x,0) = f(x)$ and $u_t(x,0) = g(x)$. This will always regenerate the full formula.

## Common mistakes
1.  **Forgetting the $\frac{1}{2c}$ factor.** The integral term representing the initial velocity must be scaled by $1/(2c)$. The displacement term has no such scaling factor (other than $1/2$).
2.  **Incorrectly applying the chain rule for $u_t(x,0)$.** When applying the initial velocity condition to $u(x,t) = F(x-ct) + G(x+ct)$, the chain rule yields $u_t(x,t) = -cF'(x-ct) + cG'(x+ct)$. A common mistake is to forget the factors of $-c$ and $c$.
3.  **Mishandling piecewise functions.** When $f(x)$ or $g(x)$ are defined piecewise (e.g., a triangular pluck), the arguments $x-ct$ and $x+ct$ may fall into different definition regions. You must carefully evaluate $f(x-ct)$ and $f(x+ct)$ based on the values of $x$ and $t$.
4.  **Mixing up the dummy variable of integration.** The integral is with respect to a dummy variable, say $s$, as in $\int g(s) ds$. Do not confuse it with $x$ or $t$.

## Self-check
1.  Solve $u_{tt} = 4u_{xx}$ with $u(x,0) = e^{-x^2}$ and $u_t(x,0) = 0$. What is the physical interpretation of the solution?
2.  Solve $u_{tt} = c^2 u_{xx}$ with $u(x,0) = 0$ and $u_t(x,0) = \sin(x)$. What does the string's motion look like at $x=0$?
3.  A string with wave speed $c=1$ is given an initial displacement $u(x,0) = 0$ and an initial velocity $u_t(x,0)$ which is $1$ for $|x| \le 1$ and $0$ otherwise (a "hammer blow"). Find the displacement $u(x,t)$ for $t>1$. Describe the shape of the string.