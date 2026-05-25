## What it is
The sum, difference, and constant multiple rules are the mathematical guarantees that you can break complex derivatives into simpler, isolated pieces. They state that the derivative of a sum of functions is the sum of their individual derivatives, and that constant multipliers can be factored out of the derivative operator. Together, they prove that differentiation is a linear operation.

## Why it matters
These rules form the bedrock of linearity, a property heavily exploited in physics, engineering, and computer science. In rocket science, when calculating the total acceleration of a spacecraft subject to multiple forces (thrust, gravity, drag), you can differentiate the position contributions of each force independently and sum them. In machine learning, these rules allow us to compute the gradient of a massive loss function by simply summing the gradients of the errors from individual data points. 

## When to study it
You must already understand:
1. The formal limit definition of the derivative: $f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$
2. Basic limit laws (specifically, that the limit of a sum is the sum of the limits).
3. The power rule for basic polynomials ($\frac{d}{dx}[x^n] = nx^{n-1}$).

If you cannot confidently evaluate the limit definition for a simple function like $f(x) = x^2$, do not proceed. Go back and master limits.

## How to study it (step by step)
1. Write down the limit definition of the derivative for a combined function $F(x) = f(x) + g(x)$.
2. Algebraically manipulate the limit to separate the $f$ terms from the $g$ terms, proving the sum rule from first principles.
3. Repeat this derivation for $F(x) = c \cdot f(x)$ to prove the constant multiple rule.
4. Combine the sum and constant multiple rules (by setting $c = -1$) to prove the difference rule.
5. Practice applying these rules to polynomials (e.g., $3x^2 + 5x - 7$) step-by-step, explicitly writing out the operator $\frac{d}{dx}$ for each term.
6. Transition to calculating polynomial derivatives mentally, recognizing that these rules allow you to differentiate term-by-term instantly.

## Key ideas, with intuition

**1. Differentiation is a Linear Operator**
The derivative operator $\frac{d}{dx}$ acts on functions linearly. This means it distributes over addition and ignores scalar multiplication. It treats a complex polynomial not as a single tangled mess, but as a collection of independent terms.

**2. The Constant Multiple Rule**
$$ \frac{d}{dx} [c f(x)] = c \frac{d}{dx} [f(x)] $$
*Intuition:* If you scale a mountain to be exactly twice as tall ($c=2$) without changing its width, every slope on that mountain becomes twice as steep. The rate of change scales identically to the function itself.

**3. The Sum Rule**
$$ \frac{d}{dx} [f(x) + g(x)] = \frac{d}{dx} [f(x)] + \frac{d}{dx} [g(x)] $$
*Intuition:* If you are walking on a moving airport walkway ($f$) while walking forward yourself ($g$), your total velocity (derivative of position) is simply the sum of the walkway's velocity and your walking velocity.

**4. The Difference Rule**
$$ \frac{d}{dx} [f(x) - g(x)] = \frac{d}{dx} [f(x)] - \frac{d}{dx} [g(x)] $$
*Intuition:* This is not a new rule. It is simply the sum rule combined with the constant multiple rule where $c = -1$. 

## Worked example
Find the derivative of $P(x) = 4x^3 - 2x^2 + 7x - 5$.

$$ \frac{d}{dx}[P(x)] = \frac{d}{dx}[4x^3 - 2x^2 + 7x - 5] $$

**Step 1:** Apply the sum and difference rules to separate the terms.
$$ = \frac{d}{dx}[4x^3] - \frac{d}{dx}[2x^2] + \frac{d}{dx}[7x] - \frac{d}{dx}[5] $$

**Step 2:** Apply the constant multiple rule to pull constants outside the derivative operator.
$$ = 4\frac{d}{dx}[x^3] - 2\frac{d}{dx}[x^2] + 7\frac{d}{dx}[x] - \frac{d}{dx}[5] $$

**Step 3:** Evaluate the basic derivatives using the power rule and the fact that the derivative of a constant is zero.
$$ = 4(3x^2) - 2(2x) + 7(1) - 0 $$

**Step 4:** Simplify.
$$ = 12x^2 - 4x + 7 $$

*Reflection:* By breaking the complex polynomial into individual power functions, we reduced a daunting limit problem into a sequence of trivial algebraic operations. The linearity rules are what make the power rule practically useful.

## Diagrams
This diagram illustrates the Sum Rule. Notice how the vertical change (slope) of the combined function $h(x)$ is exactly the sum of the slopes of $f(x)$ and $g(x)$.

```text
  y
  ^
9 |       / h(x) = f(x)+g(x) = 3x (slope = 3)
  |      /
  |     /
  |    /  / f(x) = 2x (slope = 2)
  |   /  /
  |  /  /
3 | /  /  / g(x) = x (slope = 1)
  |/  /  /
  +--/--/-----------> x
  0    1    2    3
```

## Memory technique — remember this forever

1. **The Hook:** "Derivatives distribute." Treat the operator $\frac{d}{dx}$ like a multiplier that distributes across plus and minus signs, and passes right through constants. 
2. **Formulas to overlearn:**
   $$ \frac{d}{dx}[f(x) \pm g(x)] = f'(x) \pm g'(x) $$
   $$ \frac{d}{dx}[cf(x)] = c f'(x) $$
3. **Spaced-repetition schedule:** Review the derivations and these formulas at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you ever doubt the rule, rebuild it from the limit definition. For the sum rule:
   $$ \lim_{h \to 0} \frac{[f(x+h)+g(x+h)] - [f(x)+g(x)]}{h} $$
   Rearrange the numerator to group the $f$ terms and $g$ terms:
   $$ \lim_{h \to 0} \left( \frac{f(x+h)-f(x)}{h} + \frac{g(x+h)-g(x)}{h} \right) $$
   Apply the limit law for sums, and you have $f'(x) + g'(x)$.

## Common mistakes

1. **Applying these rules to multiplication or division:** Assuming $\frac{d}{dx}[f(x)g(x)] = f'(x)g'(x)$. This is catastrophically wrong. Linearity only applies to sums and scalar multiples. Multiplying functions requires the Product Rule.
2. **Treating variables as constants:** Pulling an $x$ out of the derivative operator like a constant. $\frac{d}{dx}[x \cdot f(x)] \neq x \frac{d}{dx}[f(x)]$. Only true constants (scalars) can bypass the derivative operator.
3. **Losing track of negative signs:** When subtracting a function that itself has multiple terms, students often forget to distribute the negative sign to every term before differentiating.

## Self-check

1. Calculate the derivative of $f(x) = 7x^4 - 3x^2 + \pi x - \sqrt{2}$. (Hint: Treat $\pi$ and $\sqrt{2}$ with the exact same rules as integer constants).
2. Prove the constant multiple rule $\frac{d}{dx}[cf(x)] = c f'(x)$ using the formal limit definition of the derivative. 
3. Suppose $h(x) = a f(x) + b g(x)$ where $a$ and $b$ are constants. If $f'(2) = 3$, $g'(2) = -1$, and $h'(2) = 10$, write an equation relating $a$ and $b$.