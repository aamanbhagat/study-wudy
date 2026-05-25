## What it is
Parametric differentiation is a method for finding the slope and concavity of a curve when its $x$ and $y$ coordinates are not linked directly, but are instead defined separately by a third independent variable, or "parameter" (usually time $t$ or angle $\theta$). Instead of differentiating $y = f(x)$, you differentiate $x = f(t)$ and $y = g(t)$ with respect to $t$, and combine them to find $\frac{dy}{dx}$ and $\frac{d^2y}{dx^2}$.

## Why it matters
In aerospace engineering and physics, objects rarely move in paths easily described by $y = f(x)$. A rocket's trajectory is parameterized by time: we know its horizontal position $x(t)$ and altitude $y(t)$ at any given second. Parametric differentiation allows you to calculate the rocket's instantaneous flight angle (the first derivative) and the aerodynamic load caused by the path's curvature (the second derivative) without ever needing to solve for an explicit, often impossible, $y(x)$ equation.

## When to study it
You must have a flawless grasp of:
1. The Chain Rule.
2. Quotient and Product rules.
3. Standard derivatives (polynomials, exponentials, trigonometric functions).
If you cannot confidently apply the chain rule in Leibniz notation ($\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$), do not attempt parametric differentiation yet. Go back and fix your foundation.

## How to study it (step by step)
1. **Master the first derivative:** Write down the chain rule linking $y$, $x$, and $t$. Algebraically isolate $\frac{dy}{dx}$ to prove to yourself that $\frac{dy}{dx} = \frac{dy/dt}{dx/dt}$.
2. **Verify with geometry:** Take a circle parameterized by $x = \cos t$ and $y = \sin t$. Calculate $\frac{dy}{dx}$. Check that at $t = \pi/2$ (the top of the circle), the slope is indeed $0$.
3. **Derive the second derivative:** Treat $\frac{dy}{dx}$ as a brand new function, let's call it $y'$. Apply the exact same logic from Step 1 to find $\frac{d(y')}{dx}$. 
4. **Practice simplification:** Solve 3 problems calculating $\frac{d^2y}{dx^2}$. Force yourself to simplify the first derivative $\frac{dy}{dx}$ as much as possible *before* taking the second derivative to avoid horrific quotient rule algebra.
5. **Analyze concavity:** Use your second derivative results to find the intervals of $t$ where a parametric curve is concave up or concave down.

## Key ideas, with intuition

**1. The Rates Ratio (First Derivative)**
If $y$ is changing 10 times faster than $t$, and $x$ is changing 2 times faster than $t$, then $y$ is changing 5 times faster than $x$. This is the intuition behind the formula:
$$ \frac{dy}{dx} = \frac{\frac{dy}{dt}}{\frac{dx}{dt}} $$
Provided $\frac{dx}{dt} \neq 0$.

**2. The Second Derivative is a Rate of a Rate**
The second derivative $\frac{d^2y}{dx^2}$ asks: "How fast is the *slope* changing as *x* changes?" It does NOT ask how fast the slope changes as *t* changes. 
Let $y' = \frac{dy}{dx}$. We want $\frac{dy'}{dx}$. By the exact same logic as the first derivative:
$$ \frac{d^2y}{dx^2} = \frac{d}{dx}(y') = \frac{\frac{dy'}{dt}}{\frac{dx}{dt}} $$

**3. The Fatal Trap**
The most intuitive guess for the second derivative is $\frac{y''(t)}{x''(t)}$. This is completely, hopelessly wrong. The curvature of a path depends on the interplay between the velocity and acceleration vectors, not just a ratio of accelerations.

## Worked example
Let $x = t^2$ and $y = t^3 - 3t$. Find $\frac{dy}{dx}$ and $\frac{d^2y}{dx^2}$.

**Step 1: Find the $t$-derivatives.**
$$ \frac{dx}{dt} = 2t $$
$$ \frac{dy}{dt} = 3t^2 - 3 $$

**Step 2: Find $\frac{dy}{dx}$.**
$$ \frac{dy}{dx} = \frac{\frac{dy}{dt}}{\frac{dx}{dt}} = \frac{3t^2 - 3}{2t} $$
*Crucial intermediate step: Simplify this before moving on!*
$$ \frac{dy}{dx} = \frac{3}{2}t - \frac{3}{2}t^{-1} $$

**Step 3: Differentiate $\frac{dy}{dx}$ with respect to $t$.**
$$ \frac{d}{dt}\left(\frac{dy}{dx}\right) = \frac{d}{dt}\left(\frac{3}{2}t - \frac{3}{2}t^{-1}\right) = \frac{3}{2} + \frac{3}{2}t^{-2} $$

**Step 4: Divide by $\frac{dx}{dt}$ to find $\frac{d^2y}{dx^2}$.**
$$ \frac{d^2y}{dx^2} = \frac{\frac{3}{2} + \frac{3}{2t^2}}{2t} = \frac{\frac{3t^2 + 3}{2t^2}}{2t} = \frac{3t^2 + 3}{4t^3} $$

*Reflection:* Simplifying $\frac{dy}{dx}$ in Step 2 into a polynomial-like form saved us from having to use the quotient rule in Step 3. Always divide out the denominator if it's a single term.

## Diagrams

```text
       y
       ^
       |          Path of particle
       |             . . . .
       |           .         .
       |          .           .
       |         .             .  <-- At time t
       |        /|            
       |   dy  / |               
       |      /  |               
       |     /___|               
       |       dx                
       |                         
       +----------------------------> x

Tangent vector slope = dy/dx.
Notice that as t advances by a tiny amount dt:
The particle moves horizontally by dx = (dx/dt) * dt
The particle moves vertically by dy = (dy/dt) * dt
Therefore, slope = dy / dx = (dy/dt) / (dx/dt).
```

## Memory technique — remember this forever

1. **The Mnemonic:** *"Derivative of the top, over dx/dt."* 
Whenever you need a derivative with respect to $x$ (whether it's the 1st, 2nd, or 3rd derivative), you take the time-derivative of whatever you just found, and **pay the toll**: divide by $\frac{dx}{dt}$.
2. **The Formulas to Overlearn:**
   $$ \frac{dy}{dx} = \frac{\dot{y}}{\dot{x}} $$
   $$ \frac{d^2y}{dx^2} = \frac{\frac{d}{dt}\left(\frac{dy}{dx}\right)}{\dot{x}} $$
   *(Note: Newton's dot notation $\dot{x}$ means $\frac{dx}{dt}$).*
3. **Spaced-repetition schedule:** Review this concept and re-derive the formulas at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget the formula, start with the Chain Rule: $\frac{dy}{dt} = \frac{dy}{dx} \cdot \frac{dx}{dt}$. Divide both sides by $\frac{dx}{dt}$ to get the first derivative. To get the second, replace $y$ with $y'$ in that exact same Chain Rule equation.

## Common mistakes
1. **The "Ratio of Second Derivatives" Trap:** Calculating $\frac{d^2y}{dx^2}$ as $\frac{y''(t)}{x''(t)}$. This will fail every time.
2. **Forgetting to "Pay the Toll":** Students successfully find $\frac{d}{dt}\left(\frac{dy}{dx}\right)$ but forget to divide that result by $\frac{dx}{dt}$. This leaves you with $\frac{d}{dt}(y')$, not $\frac{d}{dx}(y')$.
3. **Algebraic Masochism:** Failing to simplify $\frac{dy}{dx}$ before taking the next derivative. If $\frac{dy}{dx} = \frac{\sin t}{\cos t}$, change it to $\tan t$ before differentiating again. 

## Self-check
1. Find $\frac{dy}{dx}$ for a particle moving according to $x = e^t$, $y = \sin(t)$.
2. Calculate the second derivative $\frac{d^2y}{dx^2}$ for the cycloid defined by $x = \theta - \sin\theta$, $y = 1 - \cos\theta$. 
3. Prove that the ellipse defined by $x = a\cos t, y = b\sin t$ (where $a, b > 0$) is always concave down in the first quadrant ($0 < t < \pi/2$).