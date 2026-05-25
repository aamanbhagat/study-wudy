## What it is
The derivatives of the six inverse trigonometric functions ($\arcsin x$, $\arccos x$, $\arctan x$, $\text{arccsc} x$, $\text{arcsec} x$, $\text{arccot} x$) represent the instantaneous rate of change of an angle with respect to a given ratio of sides in a right triangle. Remarkably, these derivatives are entirely algebraic—they contain no trigonometric functions, bridging transcendental geometry with rational and radical algebraic expressions.

## Why it matters
You will use these constantly in Calculus II to evaluate integrals; recognizing that $\frac{1}{1+x^2}$ is the derivative of $\arctan x$ is mandatory for solving advanced differential equations. In aerospace and physics, these derivatives appear in kinematics and control systems. For example, if a tracking radar measures a target's position $x(t)$, the radar's required rotational velocity is the time derivative of the gimbal angle $\theta(t) = \arctan(x(t)/h)$. 

## When to study it
Do not attempt this until you have achieved absolute fluency in:
1. **Implicit differentiation.**
2. **The Chain Rule.**
3. **Pythagorean trigonometric identities** (specifically $\sin^2 \theta + \cos^2 \theta = 1$ and $1 + \tan^2 \theta = \sec^2 \theta$).
4. **Domain and range restrictions** of inverse trigonometric functions (to make them bijective). 

If you cannot instantly recall the derivative of $\tan x$ or the implicit derivative of $\sin y = x$, go back and master those first.

## How to study it (step by step)
1. **Review restrictions:** Write out the domain and range for $y = \arcsin x$, $y = \arccos x$, and $y = \arctan x$. You cannot differentiate what is not properly defined.
2. **Derive $\arcsin x$:** Set $y = \arcsin x$, rewrite as $\sin y = x$, and use implicit differentiation. Draw a right triangle to convert the resulting $\cos y$ back into terms of $x$.
3. **Derive $\arctan x$:** Repeat the implicit differentiation process for $y = \arctan x$, utilizing the $1 + \tan^2 y = \sec^2 y$ identity.
4. **Derive $\text{arcsec} x$:** Repeat the process. Pay special attention to why the absolute value $|x|$ appears in the denominator (hint: look at the slope of the secant graph).
5. **Establish the "Co" rule:** Derive $\arccos x$, $\text{arccot} x$, and $\text{arccsc} x$. Observe that they are simply the negative versions of their non-co counterparts.
6. **Apply the Chain Rule:** Practice differentiating composite functions like $y = \arctan(x^2)$ or $y = \arcsin(e^x)$.

## Key ideas, with intuition

**1. Implicit Differentiation is the Engine**
We do not know how to differentiate $y = \arcsin x$ directly. But by applying the inverse function, we get $x = \sin y$. We *do* know how to differentiate this implicitly with respect to $x$:
$$1 = \cos y \cdot \frac{dy}{dx}$$
$$\frac{dy}{dx} = \frac{1}{\cos y}$$

**2. Right Triangle Geometry is the Bridge**
The expression $\frac{1}{\cos y}$ is useless if we want our derivative in terms of $x$. Since $\sin y = \frac{x}{1} = \frac{\text{opposite}}{\text{hypotenuse}}$, we can construct a right triangle. By the Pythagorean theorem, the adjacent side is $\sqrt{1 - x^2}$. Therefore, $\cos y = \frac{\text{adjacent}}{\text{hypotenuse}} = \sqrt{1 - x^2}$. Substituting this back eliminates the trigonometry entirely.

**3. The "Co" Symmetry**
Because $\arcsin x + \arccos x = \frac{\pi}{2}$ for all $x \in [-1, 1]$, taking the derivative of both sides yields:
$$\frac{d}{dx}(\arcsin x) + \frac{d}{dx}(\arccos x) = 0$$
Thus, the derivative of any "co" inverse function is just the negative of its pair. 

## Worked example
**Task:** Derive the derivative of $y = \arctan x$ from first principles.

**Step 1: Invert the function.**
$$y = \arctan x \implies \tan y = x$$

**Step 2: Differentiate implicitly with respect to $x$.**
$$\frac{d}{dx}(\tan y) = \frac{d}{dx}(x)$$
$$\sec^2 y \cdot \frac{dy}{dx} = 1$$

**Step 3: Isolate $\frac{dy}{dx}$.**
$$\frac{dy}{dx} = \frac{1}{\sec^2 y}$$

**Step 4: Convert back to $x$ using identities.**
We know the Pythagorean identity: $\sec^2 y = 1 + \tan^2 y$.
Since $\tan y = x$, we substitute $x$ into the identity:
$$\sec^2 y = 1 + x^2$$

**Step 5: Final substitution.**
$$\frac{dy}{dx} = \frac{1}{1 + x^2}$$

*Reflection:* This worked because we transformed an unknown derivative into a known one ($\tan y$), and then used a fundamental trigonometric identity linking $\sec y$ and $\tan y$ to smoothly return to the algebraic variable $x$.

## Diagrams

To visualize how we convert trig functions of $y$ back to $x$, we use a reference right triangle. Here is the triangle for $y = \arcsin x \implies \sin y = \frac{x}{1}$.

```text
         /|
        / |
       /  |
    1 /   | x (Opposite)
     /    |
    /     |
   / y    |
  /-------|
   sqrt(1-x^2)
   (Adjacent)
```
From this diagram, if you need $\cos y$, you simply read it off as $\frac{\text{Adjacent}}{\text{Hypotenuse}} = \frac{\sqrt{1-x^2}}{1}$.

## Memory technique — remember this forever

**1. The Hook: "S-T-S" (Sin, Tan, Sec)**
*   **S**in has the root on the bottom: $\sqrt{1-x^2}$.
*   **T**an stands on solid ground (no root): $1+x^2$.
*   **S**ec has the guard outside the root: $|x|\sqrt{x^2-1}$.
*   The "Co" functions ($\arccos, \text{arccot}, \text{arccsc}$) simply slap a negative sign on the numerator.

**2. The Formulas to Overlearn**
$$ \frac{d}{dx}(\arcsin x) = \frac{1}{\sqrt{1-x^2}} $$
$$ \frac{d}{dx}(\arctan x) = \frac{1}{1+x^2} $$
$$ \frac{d}{dx}(\text{arcsec} x) = \frac{1}{|x|\sqrt{x^2-1}} $$

**3. Spaced-Repetition Schedule**
Review these derivations and formulas at: Day 1, Day 3, Day 7, Day 16, Day 35.

**4. The First Principles Pathway**
If you forget the formulas, you can *always* recover them in 30 seconds:
$y = f^{-1}(x) \implies f(y) = x \implies f'(y) \cdot y' = 1 \implies y' = \frac{1}{f'(y)}$. 
Then draw the right triangle to convert $y$ back to $x$.

## Common mistakes
*   **Forgetting the Chain Rule:** When differentiating $\arcsin(u)$, students often write $\frac{1}{\sqrt{1-u^2}}$ and stop. It must be $\frac{1}{\sqrt{1-u^2}} \cdot \frac{du}{dx}$.
*   **Swapping the subtraction order:** Confusing $\sqrt{1-x^2}$ (for $\arcsin$) with $\sqrt{x^2-1}$ (for $\text{arcsec}$). Remember that the domain of $\arcsin x$ is $[-1, 1]$, so $1-x^2$ ensures the value inside the root is positive.
*   **Dropping the absolute value:** Writing the derivative of $\text{arcsec} x$ as $\frac{1}{x\sqrt{x^2-1}}$. The slope of $\text{arcsec} x$ is strictly positive across its defined domain, so the $x$ outside the radical must be forced positive using $|x|$.

## Self-check
1. Differentiate $f(x) = \arcsin(e^{2x})$. 
2. Derive the derivative of $y = \text{arcsec}(x)$ from first principles. Explicitly explain why the absolute value $|x|$ is required based on the range of the $\text{arcsec}$ function.
3. Find the equation of the tangent line to the curve $y = x \arctan(x)$ at the point where $x = 1$.