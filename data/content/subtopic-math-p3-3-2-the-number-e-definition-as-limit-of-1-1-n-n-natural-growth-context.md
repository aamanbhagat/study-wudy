## What it is
The number $e \approx 2.71828$ is the fundamental mathematical constant representing continuous growth. It is defined as the absolute maximum yield you can achieve when a 100% growth rate is divided into infinitely many, infinitely small compounding steps: $\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n$.

## Why it matters
The number $e$ is the bedrock of calculus and differential equations because it forms the only function ($e^x$) whose rate of growth perfectly matches its current size. In aerospace, the Tsiolkovsky rocket equation relies on $e$ to calculate the delta-v required for orbital maneuvers. In physics, it dictates the continuous nature of radioactive decay, atmospheric pressure gradients, and discharging capacitors. 

## When to study it
You must already have a rock-solid grasp of basic exponent rules (e.g., $x^a x^b = x^{a+b}$ and $(x^a)^b = x^{ab}$) and the discrete compound interest formula. You also need an intuitive understanding of limits—specifically, how to evaluate what happens to a function as a variable approaches infinity. If you do not understand how discrete compounding works, go back and master that first.

## How to study it (step by step)
1. **Brute-force the limit:** Grab a calculator. Evaluate $\left(1 + \frac{1}{n}\right)^n$ for $n = 1, 10, 100, 1000, 100000$. Watch the output approach the asymptote of $2.71828...$ rather than blowing up to infinity. 
2. **Master the standard definition:** Write down the formal limit definition of $e$. Understand why the $1/n$ (the shrinking interest rate per period) and the $n$ (the growing number of periods) are in a tug-of-war.
3. **Derive the continuous growth formula:** Start with the discrete compound interest formula $A = P\left(1 + \frac{r}{n}\right)^{nt}$. Use algebraic substitution to transform this into $A = Pe^{rt}$. (See the Worked Example below).
4. **Graph the exponentials:** Plot $y = 2^x$, $y = 3^x$, and $y = e^x$. Notice that $e^x$ is the unique curve that crosses the y-axis at $(0,1)$ with a slope of exactly $1$.

## Key ideas, with intuition

**The Bank of Continuous Growth**
Imagine a bank offering 100% annual interest on a $1 deposit. 
* Compounded once a year: $1 \times (1 + 1)^1 = \$2.00$
* Compounded monthly: $1 \times (1 + \frac{1}{12})^{12} \approx \$2.61$
* Compounded daily: $1 \times (1 + \frac{1}{365})^{365} \approx \$2.71$

As the compounding frequency $n$ approaches infinity, the return does not go to infinity. The shrinking size of each payout perfectly balances the infinite number of payouts. It hits a strict mathematical speed limit: $e$.

**The Formal Limit**
$$e = \lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n$$
This is the mathematical translation of "100% growth, compounded continuously."

**The Universal Continuous Growth Model**
By scaling the limit, we get the universal formula for continuous growth or decay:
$$A(t) = A_0 e^{rt}$$
Where $A_0$ is the initial amount, $r$ is the continuous rate (positive for growth, negative for decay), and $t$ is time. Nature does not wait for the end of a month to compound; bacterial growth and radioactive decay happen continuously, hence they are modeled by $e$.

## Worked example
**Task:** Derive the continuous growth formula $A = Pe^{rt}$ from the discrete compound interest formula $A = P\left(1 + \frac{r}{n}\right)^{nt}$.

**Step 1: State the discrete formula.**
$$A = P\left(1 + \frac{r}{n}\right)^{nt}$$
Here, $r$ is the annual rate, $n$ is the number of compounding periods per year, and $t$ is the number of years.

**Step 2: Introduce a substitution variable to isolate the definition of $e$.**
Let $m = \frac{n}{r}$. 
Notice that as $n \to \infty$ (continuous compounding), $m \to \infty$ as well.
Rearranging our substitution gives $n = mr$.

**Step 3: Substitute $m$ into the original equation.**
$$A = P\left(1 + \frac{1}{m}\right)^{(mr)t}$$

**Step 4: Use exponent rules to group the terms.**
Since $x^{ab} = (x^a)^b$, we can rewrite the exponent:
$$A = P\left[ \left(1 + \frac{1}{m}\right)^m \right]^{rt}$$

**Step 5: Apply the limit as $m \to \infty$.**
We know that $\lim_{m \to \infty} \left(1 + \frac{1}{m}\right)^m = e$. 
Substituting $e$ into the bracket yields:
$$A = P e^{rt}$$

*Reflection:* This derivation proves that continuous growth at *any* rate $r$ simply scales the exponent of $e$. The substitution $m = n/r$ is the critical algebraic trick that forces the expression inside the brackets to perfectly match the strict definition of $e$.

## Diagrams

```text
  Yield ($)
    ^
  3 | - - - - - - - - - - - - - - - - - - - - y = e ≈ 2.718
    |                           .  .  .  .  .
    |             .  .  .  .
    |       .  .
  2 |  .  .
    |
    +---|-----|-----|-----|-----|-----|-----> Compounding 
        1     2     3     4     5    ...  ∞   Periods (n)
```
*Notice how rapidly the curve flattens. The jump from $n=1$ to $n=2$ is massive, but as $n \to \infty$, the gains become infinitesimally small, bounding the maximum yield at $e$.*

## Memory technique — remember this forever
**The Hook:** "$e$ is the universal speed limit of compound interest."
**The Value:** To remember $e \approx 2.718281828$, remember "2.7" followed by Andrew Jackson's election year (1828) twice. 

**Overlearn these facts:**
1. $e = \lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n$
2. Continuous growth formula: $A = P e^{rt}$

**Spaced Repetition Schedule:**
Review this derivation and the value of $e$ at these intervals: 1 day, 3 days, 7 days, 16 days, 35 days. 

**First Principles Pathway:**
If you forget $A = Pe^{rt}$, you can always rebuild it. Start with $A = P(1 + \text{rate})^{\text{time}}$. Break the rate into infinite slices ($r/n$) and multiply the time by those slices ($nt$). Apply the limit as $n \to \infty$.

## Common mistakes
* **Treating $e$ as a variable:** $e$ is a constant number, exactly like $\pi$. You cannot solve for $e$.
* **Confusing $1^\infty$ as simply $1$:** Students often look at $\lim_{n \to \infty} (1 + 1/n)^n$, assume $1/n$ becomes $0$, and conclude the answer is $1^\infty = 1$. This is an indeterminate form; the base grows slightly larger than $1$ while the exponent pulls it toward infinity, meeting in the middle at $e$.
* **Using discrete formulas for natural phenomena:** Using $A = P(1-r)^t$ for radioactive decay instead of $A = Pe^{-rt}$. Nature does not compound annually.

## Self-check
1. Calculate the exact difference in yield between a 100% interest rate compounded daily ($n=365$) versus compounded continuously on a $100 principal over 1 year.
2. Using the substitution method from the worked example, prove that $\lim_{n \to \infty} \left(1 + \frac{3}{n}\right)^n = e^3$.
3. If a population of bacteria grows continuously such that its population doubles every 10 hours, what is its exact continuous growth rate $r$? (Leave your answer in terms of the natural logarithm, $\ln$).