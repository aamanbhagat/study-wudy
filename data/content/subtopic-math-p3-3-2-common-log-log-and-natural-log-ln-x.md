## What it is
Logarithms are the inverse operations of exponentiation, answering the question: "To what power must we raise the base to get a specific number?" The common logarithm, written as $\log_{10} x$ (or simply $\log x$ in engineering), uses a base of $10$. The natural logarithm, written as $\ln x$, uses the base of Euler's number, $e \approx 2.71828$. 

## Why it matters
Common logarithms are the backbone of engineering scales that must compress massive ranges of values into manageable numbers, such as the decibel scale for acoustics or the Richter scale for earthquakes. The natural logarithm is the native language of calculus and physics; it governs continuous growth, radioactive decay, and the Tsiolkovsky rocket equation ($\Delta v = v_e \ln(m_0/m_f)$), which dictates the exact mass of propellant a spacecraft requires to achieve orbit.

## When to study it
Do not attempt this until you have mastered:
1. Basic exponent rules ($a^b \cdot a^c = a^{b+c}$, $(a^b)^c = a^{bc}$).
2. The concept of inverse functions ($f(f^{-1}(x)) = x$).
3. The general definition of a logarithm: $\log_b x = y \iff b^y = x$.
If you do not know what $e$ is—specifically its definition as the limit of continuous compounding, $\lim_{n \to \infty} (1 + \frac{1}{n})^n$—go back and learn that first.

## How to study it (step by step)
1. **Map the common log:** Write out the powers of 10 from $10^{-3}$ to $10^3$. Next to each, write its $\log_{10}$ equivalent to build an intuition that $\log_{10}$ simply "counts the zeroes" or extracts the order of magnitude.
2. **Visualize the inverse:** Graph $y = 10^x$ and $y = \log_{10} x$ on the same Cartesian plane. Draw the line $y = x$ and verify they are perfect reflections of one another. Repeat this for $y = e^x$ and $y = \ln x$.
3. **Master the translation:** Write down 5 exponential equations (e.g., $e^3 \approx 20.08$) and translate them into logarithmic form ($\ln 20.08 \approx 3$).
4. **Derive the Change of Base:** Start with $y = \log_{10} x$. Rewrite it as an exponential equation ($10^y = x$). Take the natural log ($\ln$) of both sides, and isolate $y$. You have just proved how to convert between bases.
5. **Solve for exponents:** Practice solving 5 algebraic equations where the unknown variable is trapped in the exponent (e.g., $5e^{2t} = 100$). Use the natural log as a crowbar to bring the exponent down.

## Key ideas, with intuition

**1. The Order of Magnitude Extractor**
The common log strips away the precision of a number and tells you its scale. If $\log_{10} x = 4.3$, you immediately know $x$ is between $10^4$ and $10^5$. It is a digit-counter.

**2. The "Time to Grow" Calculator**
If $e$ represents the maximum continuous growth rate of a system, $\ln x$ tells you the *time* needed to reach a specific amount $x$ under continuous 100% growth. If $e^t = x$, then $t = \ln x$. 

**3. The Notation Trap**
In high school math and engineering, $\log x$ without a base implies $\log_{10} x$. In advanced mathematics, theoretical computer science, and physics, $\log x$ almost universally implies the natural log, $\ln x$. Always verify the convention of the textbook you are reading.

**4. The Universal Base**
You do not need a $\log_{10}$ button and an $\ln$ button. They are scalar multiples of each other. Because $10^y = x$ implies $y \ln 10 = \ln x$, we get the Change of Base formula:
$$ \log_{10} x = \frac{\ln x}{\ln 10} $$

## Worked example
**Problem:** Solve for $x$ exactly: $10^{2x-1} = 5e^x$.

**Step 1:** The variable $x$ is trapped in exponents with different bases. Take the natural log of both sides to bring them down.
$$ \ln(10^{2x-1}) = \ln(5e^x) $$

**Step 2:** Apply logarithm rules. On the left, use the power rule ($\ln(a^b) = b \ln a$). On the right, use the product rule ($\ln(ab) = \ln a + \ln b$).
$$ (2x - 1)\ln 10 = \ln 5 + \ln(e^x) $$

**Step 3:** Simplify. By definition, $\ln(e^x) = x$.
$$ 2x \ln 10 - \ln 10 = \ln 5 + x $$

**Step 4:** This is now a standard linear equation. Group all terms containing $x$ on one side.
$$ 2x \ln 10 - x = \ln 5 + \ln 10 $$

**Step 5:** Factor out $x$ and isolate it. Note that $\ln 5 + \ln 10 = \ln 50$.
$$ x(2\ln 10 - 1) = \ln 50 $$
$$ x = \frac{\ln 50}{2\ln 10 - 1} $$

*Reflection:* Taking the natural log of both sides is the universal tool for solving exponential equations. Once the variables are out of the exponents, the problem reduces to basic algebra. We treat $\ln 10$ and $\ln 50$ simply as constant numbers.

## Diagrams

The graph below shows the relationship between an exponential function and its natural logarithm. Notice the reflection across the line $y=x$. 

```text
      y
      ^ 
      |       y = e^x
  8 - |      /
      |     /      y = x
      |    /      /
  4 - |   /     /
      |  /    /
      | |   /          y = ln x
  1 - | + /          .  .  .  .
      |//      . '
------/---+---------------------> x
     //   1    4       8
    //.
   |/
```
*Note: The domain of $\ln x$ is strictly $x > 0$. It has a vertical asymptote at $x = 0$.*

## Memory technique — remember this forever

1. **The Mnemonic:** "Nature uses $e$ ($\ln$), Engineers use 10 ($\log$)." 
2. **The Core Facts to Overlearn:**
   * Inverse property: $e^{\ln x} = x$ and $\ln(e^x) = x$
   * Change of base: $\log_b x = \frac{\ln x}{\ln b}$
   * $\ln(1) = 0$ and $\log_{10}(1) = 0$ (Any non-zero base to the power of 0 is 1).
3. **Spaced-repetition schedule:** Review these facts and the worked example derivation at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the log rules (like addition becoming multiplication), rebuild them from exponent rules. 
   Let $A = e^a$ and $B = e^b$. 
   Multiply them: $A \cdot B = e^a \cdot e^b = e^{a+b}$. 
   Take the natural log of both sides: $\ln(A \cdot B) = a + b$. 
   Substitute $a$ and $b$ back: $\ln(A \cdot B) = \ln A + \ln B$.

## Common mistakes
* **Distributing logarithms over addition:** Writing $\ln(x + y) = \ln x + \ln y$. This is fatally wrong. Logarithms distribute over *multiplication*, converting it to addition. There is no simple rule for $\ln(x + y)$.
* **Thinking $\ln x < 0$ means $x$ is negative:** The output of a logarithm can be negative (e.g., $\ln(0.5) \approx -0.693$), which just means the base must be raised to a negative power (a fraction). However, you cannot take the logarithm of a negative number or zero; the *input* $x$ must be strictly positive.
* **Blind calculator usage:** Pressing the `log` button when a physics formula requires the natural log. `log` on a TI-84 is base 10. `ln` is base $e$.

## Self-check
1. Evaluate without a calculator: $\log_{10}(0.01)$ and $\ln(e^{-4})$.
2. Solve for $t$ exactly: $200 = 50 e^{0.02t}$.
3. Prove that $\log_{10} x = \frac{1}{\ln 10} \ln x$ starting *only* from the definition $y = \log_{10} x \iff 10^y = x$. Do not use the pre-packaged change of base formula.