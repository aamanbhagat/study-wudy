## What it is
The laws of logarithms are algebraic rules that allow you to combine multiple logarithmic terms into a single expression, or expand a single logarithm into multiple terms. Because logarithms are the inverse operations of exponentiation, these laws are the exact mathematical mirrors of the laws of exponents, translating multiplication into addition, division into subtraction, and exponentiation into multiplication.

## Why it matters
You cannot solve advanced exponential equations without these laws. In rocket science, the Tsiolkovsky rocket equation relies on logarithms to relate $\Delta v$ to mass ratios; manipulating it requires the quotient rule. In computer science, analyzing the time complexity of algorithms (like Merge Sort) requires the power and product rules to simplify terms like $\log_2(n^2)$ into $2\log_2(n)$. In physics, these laws allow us to plot power-law relationships ($y = ax^k$) on log-log graphs, turning curves into straight lines that are easy to analyze empirically.

## When to study it
You must have absolute mastery of two things before touching this:
1. The laws of exponents: $a^m a^n = a^{m+n}$, $\frac{a^m}{a^n} = a^{m-n}$, and $(a^m)^n = a^{mn}$.
2. The fundamental definition of a logarithm: $y = \log_b(x) \iff b^y = x$. 

If you cannot instantly translate an exponential equation into a logarithmic one and vice versa, stop. Go back and drill the definition of a logarithm. 

## How to study it (step by step)
1. Write down the three core exponent rules on the left side of a page.
2. For each rule, define two variables, $M = b^x$ and $N = b^y$, and write their equivalent logarithmic forms side-by-side.
3. Derive the Product Rule by multiplying $M$ and $N$, applying the exponent rule, and converting the result back to a logarithm.
4. Derive the Quotient Rule by dividing $M$ by $N$, applying the exponent rule, and converting back.
5. Derive the Power Rule by raising $M$ to the power of $k$, applying the exponent rule, and converting back.
6. Practice "expanding": take a complex single logarithm like $\log_b\left(\frac{x^2 y}{z}\right)$ and split it into individual terms.
7. Practice "condensing": take an expression like $2\log_b(x) + \log_b(y) - \log_b(z)$ and compress it into a single logarithm.

## Key ideas, with intuition
**Idea 1: Logarithms are literally just exponents.** 
When you evaluate $\log_b(x)$, you are asking, "What exponent do I raise $b$ to, to get $x$?" Therefore, when you add logarithms, you are adding exponents. When do we add exponents? When we multiply bases. 

**Idea 2: The Product Rule**
$$ \log_b(MN) = \log_b(M) + \log_b(N) $$
*Intuition:* The exponent required to produce $M$ times $N$ is the sum of the exponent required to produce $M$ and the exponent required to produce $N$.

**Idea 3: The Quotient Rule**
$$ \log_b\left(\frac{M}{N}\right) = \log_b(M) - \log_b(N) $$
*Intuition:* The exponent required to produce $M$ divided by $N$ is the difference between their respective exponents.

**Idea 4: The Power Rule**
$$ \log_b(M^k) = k \log_b(M) $$
*Intuition:* If you multiply $M$ by itself $k$ times, you add its exponent to itself $k$ times. Repeated addition is multiplication.

## Worked example
**Problem:** Prove the Product Rule: $\log_b(MN) = \log_b(M) + \log_b(N)$ from first principles.

**Step 1: Define variables in logarithmic form.**
Let $x = \log_b(M)$ and let $y = \log_b(N)$.

**Step 2: Translate to exponential form.**
By the definition of a logarithm:
$$b^x = M$$
$$b^y = N$$

**Step 3: Perform the operation inside the target logarithm (Multiplication).**
Multiply $M$ and $N$:
$$MN = b^x \cdot b^y$$

**Step 4: Apply the law of exponents.**
$$MN = b^{x+y}$$

**Step 5: Translate back to logarithmic form.**
If $b$ raised to the power of $(x+y)$ equals $MN$, then by definition:
$$\log_b(MN) = x + y$$

**Step 6: Substitute the original definitions of $x$ and $y$.**
$$\log_b(MN) = \log_b(M) + \log_b(N)$$

*Reflection:* The proof is a translation exercise. We leave "log land" to enter "exponent land," use the familiar exponent rule to combine terms, and then translate the result back into "log land."

## Diagrams
Logarithms act as a mathematical "step-down" transformer for operations. They map higher-order operations in their domain to lower-order operations in their range.

```text
    DOMAIN (Inside the Log)                 RANGE (Outside the Log)
    =======================                 =======================
    
    Exponentiation: M^k         ------>     Multiplication: k * log(M)
          |                                       |
          v                                       v
    Multiplication: M * N       ------>     Addition: log(M) + log(N)
          |                                       |
          v                                       v
    Division: M / N             ------>     Subtraction: log(M) - log(N)

```

## Memory technique — remember this forever
1. **The Hook:** "Logs downgrade operations." Think of the operations as a hierarchy: Exponentiation > Multiplication/Division > Addition/Subtraction. Passing an expression through a logarithm shifts its internal operation one level down the hierarchy.
2. **The 3 Formulas to Overlearn:**
   * $\log_b(MN) = \log_b(M) + \log_b(N)$
   * $\log_b(M/N) = \log_b(M) - \log_b(N)$
   * $\log_b(M^k) = k \log_b(M)$
3. **Spaced-repetition schedule:** Review these proofs and formulas at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **The "First Principles" Pathway:** If you ever forget if $\log(a+b)$ is a rule, try to prove it. Set $x = \log_b(a)$ and $y = \log_b(b)$. Then $a = b^x$ and $b = b^y$. What is $a+b$? It is $b^x + b^y$. There is no exponent rule to simplify $b^x + b^y$. Therefore, there is no logarithm rule for $\log(a+b)$. You can rebuild the true laws anytime by converting to exponents, applying exponent rules, and converting back.

## Common mistakes
* **The Distributive Trap:** Assuming $\log_b(M + N) = \log_b(M) + \log_b(N)$. Logarithms do *not* distribute over addition. $\log_b(M+N)$ cannot be simplified.
* **The Quotient Trap:** Confusing the log of a quotient with the quotient of two logs. $\log_b\left(\frac{M}{N}\right)$ is $\log_b(M) - \log_b(N)$. It is absolutely **not** $\frac{\log_b(M)}{\log_b(N)}$. (The latter is used in the Change of Base formula).
* **The Power Trap:** Assuming $(\log_b M)^k = k \log_b(M)$. The power rule only applies when the *argument* $M$ is raised to the power $k$, not when the entire logarithm is raised to the power $k$.

## Self-check
1. Expand the following expression completely into individual logarithms: $\log_2\left(\frac{8x^3}{\sqrt{y}}\right)$.
2. Prove the Quotient Rule ($\log_b(M/N) = \log_b(M) - \log_b(N)$) from first principles, showing every step.
3. Solve for $x$ by first condensing the logarithms: $2\log_3(x) - \log_3(x-2) = 2$.