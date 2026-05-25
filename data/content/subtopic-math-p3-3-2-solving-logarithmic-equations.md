## What it is
Solving a logarithmic equation means finding the unknown variable that is trapped inside the argument of a logarithm. You achieve this by using the algebraic properties of logarithms to condense the equation, and then applying exponential functions to "free" the variable.

## Why it matters
In rocket science, the Tsiolkovsky rocket equation $\Delta v = v_e \ln\left(\frac{m_0}{m_f}\right)$ dictates how much velocity a rocket can gain. If you know the required $\Delta v$ and want to find the necessary fuel mass, you must solve a logarithmic equation. In computer science, determining the maximum input size an $O(N \log N)$ algorithm can handle in a given time requires solving for $N$ inside a log. 

## When to study it
You must already be fluent in:
1. Basic algebra (isolating variables, solving quadratics).
2. The definition of a logarithm: $\log_b(x) = y \iff b^y = x$.
3. Logarithmic properties: the product rule, quotient rule, and power rule. 
If you cannot confidently simplify $\log_2(8x) - \log_2(x^2)$ into a single logarithm, stop here and review log properties first.

## How to study it (step by step)
1. **Master the conversion loop:** Spend 20 minutes writing out equations like $\log_3(x) = 4$ and converting them directly to $3^4 = x$. Do this until it is muscle memory.
2. **Practice condensing:** Take equations with multiple logarithms on one side and practice combining them into a single logarithm using the product and quotient rules. 
3. **Exponentiate both sides:** Treat both sides of the equation as exponents of a chosen base. Practice the cancellation property: $b^{\log_b(x)} = x$. 
4. **Hunt the extraneous:** Spend 30 minutes solving equations that result in quadratics. Force yourself to plug every solution back into the *original* equation to check if it forces a logarithm to evaluate a negative number.
5. **Mix and match:** Solve systems where logs have different bases by applying the change-of-base formula first.

## Key ideas, with intuition

**1. The Fundamental Loop (The Escape Hatch)**
A logarithm is just a question: "Base $b$ to what power equals $x$?" 
$$ \log_b(x) = y \implies b^y = x $$
This is your primary tool for freeing $x$. Once you have a single log equal to a number, you use this definition to convert the equation into a standard algebraic form.

**2. Condense Before You Escape**
You cannot easily apply the fundamental loop if your equation looks like $\log(x) + \log(x-1) = 2$. You must first compress it into a single logarithm using $\log(a) + \log(b) = \log(ab)$. 
$$ \log(x(x-1)) = 2 $$
Only then can you escape the log.

**3. The Inverse Operation (Exponentiation)**
If you have $\ln(x) = 5$, you can "exponentiate" both sides using base $e$. 
$$ e^{\ln(x)} = e^5 $$
Because $e^x$ and $\ln(x)$ are inverse functions, they annihilate each other, leaving $x = e^5$. This is the formal algebraic justification for the "Fundamental Loop".

**4. The Domain Trap**
Logarithms are only defined for strictly positive arguments. The domain of $\log_b(x)$ is $x > 0$. When you combine logs (e.g., $\log(x) + \log(x-1) = \log(x^2-x)$), you artificially expand the domain. The condensed form might accept $x = -2$, but the original separated logs will not. You must always check your final answers against the original domains.

## Worked example

**Solve for $x$:** 
$$ \log_2(x) + \log_2(x-3) = 2 $$

**Step 1: Condense the logarithms.**
Using the product rule $\log_b(m) + \log_b(n) = \log_b(mn)$:
$$ \log_2(x(x-3)) = 2 $$

**Step 2: Exponentiate to remove the logarithm.**
Convert using the fundamental definition of logarithms ($b^y = x$), or exponentiate both sides with base 2:
$$ 2^{\log_2(x^2-3x)} = 2^2 $$
$$ x^2 - 3x = 4 $$

**Step 3: Solve the resulting algebraic equation.**
This is a standard quadratic. Set it to zero:
$$ x^2 - 3x - 4 = 0 $$
$$ (x-4)(x+1) = 0 $$
Possible solutions: $x = 4$ and $x = -1$.

**Step 4: Check for extraneous solutions.**
Substitute $x = 4$ into the *original* equation:
$\log_2(4) + \log_2(4-3) = 2 + \log_2(1) = 2 + 0 = 2$. (Valid).

Substitute $x = -1$ into the *original* equation:
$\log_2(-1) + \log_2(-1-3) = \text{undefined}$. (Invalid).

**Final Answer:** $x = 4$.

*Reflection:* Condensing the log allowed us to isolate the argument. However, multiplying $x$ and $(x-3)$ created a quadratic that "forgot" the original numbers had to be positive. Checking the domain is not optional; it is a structural requirement of the math.

## Diagrams

The domain trap visualized. Notice how the original functions have vertical asymptotes preventing them from crossing into negative territory.

```text
      y
      ^
      |                      y = log_2(x)
  2   + - - - - - - - - - - - - - - -* (4, 2)
      |                            /
  1   +                          /
      |                        /
--+---+---+---+---+---+---+---+---> x
 -1   0   1   2   3   4   5   6
      |   |       |
 -1   +   |       |          y = log_2(x-3)
      |   |       |        /
 -2   +   |       |      /
      |   |       |    /
          |       |  /
      Asymptote   Asymptote
      at x=0      at x=3
```
Because $\log_2(x-3)$ has an asymptote at $x=3$, the valid domain for the entire equation is strictly $x > 3$. The false algebraic solution $x = -1$ lies entirely outside this region.

## Memory technique — remember this forever

1. **The Mnemonic:** "The Base carries the Answer to make the Argument." 
   Imagine the base $b$ sliding under the opposite side of the equation, lifting it up into an exponent, leaving the argument behind. 
   $\log_b(\text{Argument}) = \text{Answer} \implies b^{\text{Answer}} = \text{Argument}$.
2. **Must overlearn:** 
   * $\log_b(x) = y \iff b^y = x$
   * Argument MUST BE $> 0$.
3. **Spaced-repetition schedule:** Review this concept and solve one quadratic-yielding log equation at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget how to solve $\log_b(x) = y$, remember that a logarithm is literally just a missing exponent. "To what power must I raise $b$ to get $x$?" The answer is $y$. Therefore, $b$ raised to the $y$ must be $x$.

## Common mistakes

* **The Fake Distributive Law:** Assuming $\log(x + y) = \log(x) + \log(y)$. This is violently false. Logarithms do not distribute over addition. You cannot split or combine added arguments.
* **Ignoring Extraneous Solutions:** Stopping at $x = -1$ and $x = 4$ and boxing both as the answer. You will lose points, and if you are building a control system, it will crash.
* **Exponentiating Term-by-Term:** Given $\log(x) + \log(y) = 2$, a student might write $10^{\log(x)} + 10^{\log(y)} = 10^2$, yielding $x + y = 100$. This is illegal. You must exponentiate the *entire side*: $10^{\log(x) + \log(y)} = 10^2$, which yields $x \cdot y = 100$.

## Self-check

1. Solve for $x$: $\ln(3x - 2) = 4$. 
2. Solve for $x$: $\log_{10}(x) + \log_{10}(x - 21) = 2$.
3. Solve for $x$: $\log_2(x+2) - \log_2(x-1) = 3$.