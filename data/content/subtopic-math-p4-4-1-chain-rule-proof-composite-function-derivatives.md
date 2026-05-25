## What it is
The chain rule is a formula to compute the derivative of a composite function—a function nested inside another function. It states that the instantaneous rate of change of the entire system is the product of the rates of change of its nested components.

## Why it matters
The chain rule is the engine of modern applied mathematics. In deep learning, the "backpropagation" algorithm used to train neural networks is literally just the chain rule applied to millions of nested variables. In physics and aerospace, you rarely have a direct equation relating the variable you want (e.g., rocket altitude) to the variable you control (e.g., fuel valve angle); the chain rule lets you link intermediate rates of change (altitude to thrust, thrust to mass flow, mass flow to valve angle) to find the total derivative.

## When to study it
You must already be fluent in:
1. Function composition (evaluating $f(g(x))$).
2. The limit definition of the derivative.
3. Basic derivative rules (power rule, trigonometric derivatives, exponential derivatives).
If you cannot instantly compute the derivative of $x^4$ or $\sin(x)$, go back and master the basic rules first.

## How to study it (step by step)
1. **Decompose functions:** Take 10 composite functions and break them into their $f(u)$ and $g(x)$ components. Do not take derivatives yet. Just practice identifying the "outside" and "inside" functions.
2. **Master the Leibniz notation:** Write the rule as $\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$. Understand intuitively why the "fractions" appear to cancel (even though they are limits, not fractions).
3. **Study the proof:** Walk through the limit derivation. Understand the assumption being made (that $\Delta u \neq 0$) and how advanced calculus fixes this edge case.
4. **Practice two-layer compositions:** Compute derivatives for functions like $\cos(x^2)$ or $e^{3x}$.
5. **Extend to $N$-layers:** Apply the rule repeatedly to functions like $\sin^3(e^{5x})$. Treat it as a recursive algorithm.

## Key ideas, with intuition

**Idea 1: Rates of change multiply**
If a bicycle travels 3 times as fast as a person walking ($du/dx = 3$), and a car travels 4 times as fast as the bicycle ($dy/du = 4$), the car travels $4 \times 3 = 12$ times as fast as the walking person. Rates of nested dependencies multiply.

**Idea 2: The Formula**
In Newton/Lagrange notation, the derivative of $f(g(x))$ is:
$$ \frac{d}{dx} [f(g(x))] = f'(g(x)) \cdot g'(x) $$
Notice that the outside derivative $f'$ is evaluated at the *inside function* $g(x)$, not at $x$. 

In Leibniz notation, if $y = f(u)$ and $u = g(x)$:
$$ \frac{dy}{dx} = \frac{dy}{du} \frac{du}{dx} $$

**Idea 3: The Proof (from first principles)**
Let $y = f(g(x))$. Let $u = g(x)$ and let $\Delta u = g(x + \Delta x) - g(x)$.
By the definition of the derivative:
$$ \frac{dy}{dx} = \lim_{\Delta x \to 0} \frac{\Delta y}{\Delta x} $$
Multiply the numerator and denominator by $\Delta u$:
$$ \frac{dy}{dx} = \lim_{\Delta x \to 0} \left( \frac{\Delta y}{\Delta u} \cdot \frac{\Delta u}{\Delta x} \right) $$
Because $g(x)$ is differentiable, it is continuous, so as $\Delta x \to 0$, $\Delta u \to 0$. We can split the limit:
$$ \frac{dy}{dx} = \left( \lim_{\Delta u \to 0} \frac{\Delta y}{\Delta u} \right) \cdot \left( \lim_{\Delta x \to 0} \frac{\Delta u}{\Delta x} \right) = \frac{dy}{du} \cdot \frac{du}{dx} $$
*(Note for the rigorous student: This proof assumes $\Delta u \neq 0$ as $\Delta x \to 0$. To handle cases where $g(x)$ oscillates and $\Delta u = 0$, mathematicians use Carathéodory's formulation, defining a continuous error function. But the algebraic intuition above is the core mechanism.)*

## Worked example
**Problem:** Find the derivative of $y = \sin(x^3 + 2x)$.

**Step 1: Identify the inside and outside functions.**
Let the inside function be $u = x^3 + 2x$.
Let the outside function be $y = \sin(u)$.

**Step 2: Differentiate each part.**
The derivative of the outside with respect to $u$ is:
$$ \frac{dy}{du} = \cos(u) $$
The derivative of the inside with respect to $x$ is:
$$ \frac{du}{dx} = 3x^2 + 2 $$

**Step 3: Multiply them together (Chain Rule).**
$$ \frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx} $$
$$ \frac{dy}{dx} = \cos(u) \cdot (3x^2 + 2) $$

**Step 4: Substitute $x$ back in for $u$.**
$$ \frac{dy}{dx} = \cos(x^3 + 2x) \cdot (3x^2 + 2) $$

*Reflection:* We didn't change the argument of the cosine. The outside function's derivative evaluated *at the inside function* ensures we are scaling the rate correctly at the exact local point $u$.

## Diagrams

Think of the chain rule as a sequence of scaling transformations. A small change $\Delta x$ is scaled by $g'(x)$ to produce $\Delta u$. That $\Delta u$ is then scaled by $f'(u)$ to produce $\Delta y$.

```text
       Δx                 Δu                 Δy
 [ Input x ] -----> [ Variable u ] -----> [ Output y ]
             g'(x)                  f'(u)
          (multiplier)           (multiplier)

Total Multiplier from x to y = f'(u) * g'(x)
```

## Memory technique — remember this forever
1. **The Mnemonic:** "Peel the onion." To find the derivative, you peel the outermost layer, take its derivative (leaving the inside completely untouched), and then multiply by the derivative of the next layer inside.
2. **Must Overlearn:** 
   $$ [f(g(x))]' = f'(g(x))g'(x) $$
3. **Spaced-repetition schedule:** Review this concept and do 3 practice problems at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget the rule, write $\frac{\Delta y}{\Delta x}$. Force the intermediate variable $u$ into the equation by multiplying by $\frac{\Delta u}{\Delta u}$. Separate into two fractions and take the limit as $\Delta x \to 0$.

## Common mistakes
1. **Differentiating the inside and outside simultaneously:** Students often write the derivative of $\sin(x^2)$ as $\cos(2x)$. This is fatally wrong. You must leave the inside alone when differentiating the outside: $\cos(x^2) \cdot 2x$.
2. **Forgetting the chain rule entirely on powers:** When students see $y = \sin^2(x)$, they often write $2\sin(x)$ or $2\cos(x)$. Rewrite it as $y = (\sin(x))^2$ to clearly see the outside function is $u^2$ and the inside is $\sin(x)$. The correct derivative is $2(\sin(x))^1 \cdot \cos(x)$.
3. **Plugging the derivative into the derivative:** Writing $f'(g'(x))$. The outside derivative $f'$ must be evaluated at $g(x)$, not $g'(x)$.

## Self-check
1. Find the derivative of $y = e^{4x}$.
2. Find the derivative of $y = \sqrt{\cos(x^2)}$. (Hint: This is a 3-layer onion. Peel three times).
3. Using the product rule $(uv)' = u'v + uv'$ and the chain rule, prove the quotient rule for $\frac{f(x)}{g(x)}$ by rewriting it as $f(x) \cdot (g(x))^{-1}$.