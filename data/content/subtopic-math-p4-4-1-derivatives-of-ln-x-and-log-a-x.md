## What it is
The derivative of a logarithmic function measures its instantaneous rate of change. For the natural logarithm, the derivative of $\ln(x)$ is simply $\frac{1}{x}$. For a logarithm of an arbitrary base $a$, $\log_a(x)$, the derivative is $\frac{1}{x \ln(a)}$, which includes a constant scaling factor to account for the non-natural base. 

## Why it matters
You will use this constantly. In rocket science, the Tsiolkovsky rocket equation relies on integrating $\frac{1}{m}$ with respect to mass, yielding a natural logarithm that dictates the delta-v of your spacecraft. In machine learning, the derivative of the logarithm is the core of minimizing cross-entropy loss in classification neural networks. In physics, any system exhibiting exponential decay (like radioactive isotopes or RC circuits) is linearized using logarithms, and studying their rates of change requires this derivative.

## When to study it
Do not attempt this until you have mastered:
1. The limit definition of the derivative.
2. The derivative of the exponential function $e^x$.
3. The Chain Rule.
4. Implicit differentiation.
5. Logarithm properties (product, quotient, and power rules).

If you are shaky on implicit differentiation or log rules, stop and review them now. You cannot memorize your way through Calculus.

## How to study it (step by step)
1. **Master the implicit derivation:** Write $y = \ln(x)$. Rewrite it as $e^y = x$. Differentiate both sides implicitly with respect to $x$ to find $\frac{dy}{dx}$. (Takes 5 minutes).
2. **Master the change of base:** Write $\log_a(x) = \frac{\ln(x)}{\ln(a)}$. Use the constant multiple rule and your result from step 1 to find the derivative. (Takes 5 minutes).
3. **Combine with the Chain Rule:** Write out the formula for $\frac{d}{dx} \ln(f(x))$. Prove to yourself that it equals $\frac{f'(x)}{f(x)}$. (Takes 10 minutes).
4. **Simplify before differentiating:** Take a complex expression like $\ln\left(\frac{x^2 \sin(x)}{\sqrt{x+1}}\right)$. Expand it using log rules *before* taking the derivative. Compare the time it takes to do this versus using the quotient/product rules inside the log. (Takes 15 minutes).
5. **Drill:** Solve 10-15 varied problems mixing $\ln(x)$, $\log_a(x)$, and the chain, product, and quotient rules.

## Key ideas, with intuition

**1. The elegance of the natural logarithm**
The function $y = \ln(x)$ asks: "To what power must I raise $e$ to get $x$?" As $x$ grows large, you have to increase the exponent less and less to keep up. This means the slope of $\ln(x)$ is always positive but strictly decreasing. The exact rate of this decrease is perfectly inversely proportional to $x$. Hence, $y' = \frac{1}{x}$. 

**2. The implicit proof (The "Why")**
You already know $\frac{d}{dx} e^x = e^x$. Because $e^x$ and $\ln(x)$ are inverse functions, we can exploit this:
$$y = \ln(x)$$
$$e^y = x$$
Take the derivative of both sides with respect to $x$. Remember $y$ is a function of $x$, so we use the chain rule on the left:
$$e^y \cdot \frac{dy}{dx} = 1$$
$$\frac{dy}{dx} = \frac{1}{e^y}$$
Substitute $x$ back in for $e^y$:
$$\frac{dy}{dx} = \frac{1}{x}$$

**3. Other bases are just scaled natural logs**
Do not memorize a separate, disconnected rule for $\log_a(x)$. Use the change of base formula: $\log_a(x) = \frac{1}{\ln(a)} \cdot \ln(x)$. Since $\frac{1}{\ln(a)}$ is just a constant, it passes straight through the derivative:
$$\frac{d}{dx} \log_a(x) = \frac{1}{\ln(a)} \cdot \frac{d}{dx} \ln(x) = \frac{1}{x \ln(a)}$$

**4. The Logarithmic Chain Rule**
When you take the derivative of $\ln(f(x))$, the argument drops to the denominator, and its derivative pops up in the numerator:
$$\frac{d}{dx} \ln(f(x)) = \frac{1}{f(x)} \cdot f'(x) = \frac{f'(x)}{f(x)}$$

## Worked example
**Problem:** Find the derivative of $y = \log_{10}(\cos(x^2))$.

**Step 1: Rewrite using the change of base formula.**
$$y = \frac{\ln(\cos(x^2))}{\ln(10)}$$
*Reflection: Removing the base-10 logarithm immediately prevents formula confusion. $\frac{1}{\ln(10)}$ is just a constant multiplier.*

**Step 2: Differentiate the outer natural log function.**
$$\frac{dy}{dx} = \frac{1}{\ln(10)} \cdot \frac{1}{\cos(x^2)} \cdot \frac{d}{dx} (\cos(x^2))$$
*Reflection: The derivative of $\ln(\text{stuff})$ is $\frac{1}{\text{stuff}}$ times the derivative of the stuff (Chain Rule).*

**Step 3: Differentiate the cosine function.**
$$\frac{dy}{dx} = \frac{1}{\ln(10)} \cdot \frac{1}{\cos(x^2)} \cdot (-\sin(x^2)) \cdot \frac{d}{dx} (x^2)$$
*Reflection: The derivative of $\cos(\text{stuff})$ is $-\sin(\text{stuff})$ times the derivative of the stuff (Chain Rule again).*

**Step 4: Differentiate the polynomial and simplify.**
$$\frac{dy}{dx} = \frac{1}{\ln(10)} \cdot \frac{-\sin(x^2)}{\cos(x^2)} \cdot (2x)$$
$$\frac{dy}{dx} = -\frac{2x \tan(x^2)}{\ln(10)}$$
*Reflection: Recognizing $\frac{\sin}{\cos} = \tan$ cleans up the final answer.*

## Diagrams

```text
      y
      ^ 
    2 |                       *  y = ln(x)
      |                  *       Slope = 1/x
    1 |             *            At x=e, slope = 1/e
      |         *  / tangent line
      |       *  /   y - 1 = (1/e)(x - e)
____0_|_____*__/_________________> x
      |   *   1    2    e    4
   -1 | *
      |*
   -2 |
```
*Notice how the curve flattens out as $x$ increases. At $x=1$, the slope is $1/1 = 1$. At $x=e \approx 2.718$, the slope is $1/e \approx 0.36$. The tangent line becomes progressively less steep, perfectly matching the graph of $y = 1/x$ for $x > 0$.*

## Memory technique — remember this forever
1. **The Visual Hook:** "Natural log drops the argument to the basement." When you see $\frac{d}{dx} \ln(\text{box})$, immediately draw a fraction line and put the $\text{box}$ in the denominator. Then put the derivative of the $\text{box}$ in the numerator.
2. **Must Overlearn:** 
   * $$\frac{d}{dx} \ln(x) = \frac{1}{x}$$
   * $$\frac{d}{dx} \log_a(x) = \frac{1}{x \ln(a)}$$
3. **Spaced Repetition Schedule:** Review these derivations and formulas in 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you blank on a test, write $y = \ln(x)$, convert to $e^y = x$, and use implicit differentiation. You will recover the formula in 15 seconds.

## Common mistakes
* **Forgetting the Chain Rule:** Students write $\frac{d}{dx} \ln(x^2 + 1) = \frac{1}{x^2 + 1}$. This is wrong. You must multiply by the derivative of the inside: $\frac{2x}{x^2 + 1}$.
* **Misplacing the $\ln(a)$ scaling factor:** For $\log_a(x)$, students sometimes multiply by $\ln(a)$ instead of dividing by it. Remember that $e^x$ *multiplies* by $\ln(a)$ (i.e., $a^x \ln(a)$), so logarithms, being inverses, *divide* by $\ln(a)$.
* **Not expanding logarithms first:** Attempting to differentiate $y = \ln\left(\frac{x^3}{(x+2)^5}\right)$ directly using the quotient rule inside the chain rule is a nightmare. Always use log properties first: $y = 3\ln(x) - 5\ln(x+2)$, making the derivative a trivial $\frac{3}{x} - \frac{5}{x+2}$.

## Self-check
1. Find the derivative of $f(x) = \ln(5x^3)$. (Hint: Try expanding it with log rules first, then try the chain rule. Do they match?)
2. Find the derivative of $g(x) = x^2 \log_2(x)$.
3. Use implicit differentiation on $y = x^x$ by taking the natural logarithm of both sides first, then find $\frac{dy}{dx}$. (This is called logarithmic differentiation).