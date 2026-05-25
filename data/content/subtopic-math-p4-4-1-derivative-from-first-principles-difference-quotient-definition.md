## What it is
The derivative from first principles is the exact mathematical translation of "instantaneous rate of change." It calculates the exact slope of a curve at a single point by taking the limit of the slope of a secant line (a line connecting two points on the curve) as the horizontal distance between those two points shrinks to exactly zero. 

## Why it matters
This is the bedrock of all continuous change. In physics and rocket science, this definition is how you transition from knowing a rocket's position over time to knowing its instantaneous velocity and acceleration. In machine learning, it forms the basis of gradient descent, allowing algorithms to minimize error by finding the exact slope of a high-dimensional loss function. Without this limit definition, calculus does not exist.

## When to study it
Do not attempt this until you have mastered:
1. **Function notation:** You must be able to confidently evaluate $f(x+h)$ without making algebraic errors.
2. **Algebraic manipulation:** Expanding binomials $(x+h)^2$ and $(x+h)^3$, rationalizing numerators with conjugates, and finding common denominators.
3. **Limits:** You must understand how to evaluate limits as a variable approaches zero, specifically how to resolve the $\frac{0}{0}$ indeterminate form via factoring.

## How to study it (step by step)
1. **Draw the geometry:** Sketch a curve. Pick a point $x$ and a second point $x+h$. Draw the secant line between them. Write out the standard algebra slope formula $m = \frac{y_2 - y_1}{x_2 - x_1}$ using these coordinates.
2. **Apply the limit:** Add the $\lim_{h \to 0}$ operator to your slope formula. Understand that this transforms an *average* rate of change into an *instantaneous* rate of change.
3. **Master polynomial expansion:** Practice expanding the difference quotient for $f(x) = x^2$ and $f(x) = x^3$. Observe that every term without an $h$ in the numerator will cancel out.
4. **Master radicals:** Practice the difference quotient for $f(x) = \sqrt{x}$. Multiply the numerator and denominator by the conjugate of the numerator to clear the $h$.
5. **Master rationals:** Practice the difference quotient for $f(x) = \frac{1}{x}$. Find a common denominator for the top terms to clear the complex fraction.
6. **Connect algebra to limits:** Recognize that the entire goal of the algebra in steps 3-5 is to factor an $h$ out of the numerator so you can cancel the $h$ in the denominator, destroying the $\frac{0}{0}$ division-by-zero trap.

## Key ideas, with intuition

**1. The Secant Line (Average Rate of Change)**
Slope is simply "rise over run". If you start at an x-coordinate $x$ and move to a new x-coordinate $x+h$, your run is $h$. 
The y-coordinates are $f(x)$ and $f(x+h)$. Therefore, the rise is $f(x+h) - f(x)$. 
The slope of this secant line is the **difference quotient**:
$$m_{\text{secant}} = \frac{f(x+h) - f(x)}{h}$$

**2. The Tangent Line (Instantaneous Rate of Change)**
We want the slope at exactly *one* point, $x$. But if we plug $h=0$ into the difference quotient, we get $\frac{0}{0}$, which is undefined. We cannot set $h$ to 0, but we can ask what happens as $h$ *approaches* 0. We apply the limit to find the derivative, denoted as $f'(x)$:
$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

**3. The Algebraic Game**
Because plugging in $h=0$ yields $\frac{0}{0}$, the difference quotient is always an indeterminate form. The "game" of first principles is to algebraically manipulate the numerator until you can factor out an $h$. Once you have $h \cdot (\text{stuff})$ in the numerator, you cancel it with the $h$ in the denominator. Only then can you safely evaluate the limit by letting $h = 0$.

## Worked example
Find the derivative of $f(x) = x^2 - 3x$ from first principles.

**Step 1: State the definition.**
$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

**Step 2: Substitute the function into the definition.**
$$f'(x) = \lim_{h \to 0} \frac{[(x+h)^2 - 3(x+h)] - [x^2 - 3x]}{h}$$

**Step 3: Expand the numerator.**
$$f'(x) = \lim_{h \to 0} \frac{[x^2 + 2xh + h^2 - 3x - 3h] - x^2 + 3x}{h}$$

**Step 4: Cancel terms in the numerator.**
Notice that $x^2$ and $-x^2$ cancel, and $-3x$ and $+3x$ cancel. Every term from the original $f(x)$ must cancel.
$$f'(x) = \lim_{h \to 0} \frac{2xh + h^2 - 3h}{h}$$

**Step 5: Factor out $h$ from the numerator.**
$$f'(x) = \lim_{h \to 0} \frac{h(2x + h - 3)}{h}$$

**Step 6: Cancel the $h$ and evaluate the limit.**
$$f'(x) = \lim_{h \to 0} (2x + h - 3)$$
Now, substitute $h = 0$:
$$f'(x) = 2x + 0 - 3 = 2x - 3$$

*Reflection:* The process worked because expanding the binomials allowed the non-$h$ terms to annihilate each other. Factoring out $h$ resolved the $\frac{0}{0}$ singularity, allowing us to evaluate the limit directly.

## Diagrams

```text
      y |                                     
        |                                     
f(x+h) -| - - - - - - - - - - - - - * (x+h, f(x+h))
        |                         / |         
        |                       /   |         
        |                     /     | Rise = f(x+h) - f(x)
        |     Secant Line   /       |         
        |                 /         |         
  f(x) -| - - - - - - - * - - - - - -         
        |             / |           |         
        |           /   |  Run = h  |         
        |         /     |           |         
        |       /       |           |         
        |     /         |           |         
        +---------------------------------------- x
                        x          x+h        

As h -> 0, the point (x+h) slides down the curve toward x.
The Secant Line rotates and becomes the Tangent Line at x.
```

## Memory technique — remember this forever
1. **The Hook:** "Rise over run, but the run runs away to zero." Visualize zooming into the curve until it looks like a straight line.
2. **Must Overlearn:** 
   $$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$
3. **Spaced-repetition schedule:** Write the definition and derive $f'(x)$ for $x^2$ and $\sqrt{x}$ from memory at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the formula, draw a graph. Write the standard slope formula $m = \frac{y_2 - y_1}{x_2 - x_1}$. Set your two points as $(x, f(x))$ and $(x+h, f(x+h))$. Substitute them into the slope formula, simplify the denominator to $h$, and slap $\lim_{h \to 0}$ on the front. 

## Common mistakes
1. **Botching the function evaluation:** For $f(x) = x^2$, writing $f(x+h)$ as $x^2 + h$ instead of $(x+h)^2$. The $+h$ happens *inside* the function's argument, not at the end of the expression.
2. **Failing to distribute the negative:** When subtracting $f(x)$ in the numerator, writing $- x^2 - 3x$ instead of $-(x^2 - 3x) = -x^2 + 3x$. Use brackets.
3. **Dropping the limit notation early:** Writing expressions without $\lim_{h \to 0}$ before you have actually substituted $h=0$. This is mathematically false; the expression without the limit is just the secant slope, not the derivative.

## Self-check
1. Use first principles to find the derivative of the linear function $f(x) = 4x + 5$. (Consider geometrically why the answer makes sense).
2. Use first principles to find the derivative of the quadratic function $f(x) = 2x^2 - x + 3$.
3. Use first principles to find the derivative of the rational function $f(x) = \frac{1}{x+2}$.