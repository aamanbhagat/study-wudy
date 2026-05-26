## 1. The one-sentence answer
**The average value of a continuous function \(f\) on a closed interval \([a,b]\) is the constant \(c = \frac{1}{b-a}\int_a^b f(x)\,dx\) that produces a rectangle of identical area.**

Think of a varying quantity such as temperature over a day. The integral accumulates the total “amount” of temperature across time; dividing by the length of the interval spreads that total evenly, yielding a single representative height. This construction works because the integral itself is already the limit of sums of heights times widths, so scaling by the reciprocal of total width simply normalizes the accumulated quantity back to an average height.

The same idea appears whenever one replaces a complicated varying signal by a single number that preserves total effect: net displacement, total charge, or accumulated error.

> [!NOTE]
> The average value is not the same as the arithmetic mean of the function’s maximum and minimum; it weights every value by how long the function lingers near that value.

## 2. Why this matters — concrete and current
In orbital mechanics, NASA’s trajectory-design software computes the time-averaged thrust of a variable-thrust ion engine over a transfer arc; the resulting scalar multiplies burn duration to give the exact \(\Delta v\) budget used by the Psyche mission planners.

Semiconductor thermal modeling at Intel uses the spatial average of temperature along a die trace to predict electromigration lifetime; the integral is taken over the physical length of the interconnect and divided by that length before being fed into the Black equation.

In machine-learning training loops, the validation loss reported after an epoch is precisely the average value of the per-sample loss function over the validation set; the integral is replaced by a finite sum, yet the normalization factor remains the measure of the domain.

Meteorologists at the European Centre for Medium-Range Weather Forecasts publish “average 2-meter temperature” for climate bulletins; each grid cell average is obtained by integrating the forecast temperature field over the cell area and dividing by cell area, exactly the continuous definition applied to discrete data.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definite integral        | Supplies the accumulated “total” that must be normalized  |
| Continuity on \([a,b]\)  | Guarantees the integral exists and the average is attained |
| Limit of Riemann sums    | Justifies replacing discrete averages by an integral      |
| Interval length \(b-a\)  | The normalizing factor that converts total to average     |

## 4. Building the idea — from intuition to formalism

### Step 1 — Discrete average as total divided by count
A list of numbers has average equal to their sum divided by how many numbers there are.  
Example: the numbers 3, 7, 2 average to \((3+7+2)/3 = 4\).  
Formally, \(\frac{1}{n}\sum_{i=1}^n y_i\).  
> [!WARNING]  
> Treating the average as the midpoint of the range instead of the normalized sum produces the wrong value whenever the data are not uniformly spaced.

### Step 2 — Replace the list by sampled function values
Partition \([a,b]\) into \(n\) subintervals of width \(\Delta x = (b-a)/n\). Sample \(f\) at the right endpoint \(x_i^*\) of each subinterval to obtain the list \(f(x_1^*),\dots,f(x_n^*)\).  
The discrete average is then \(\frac{1}{n}\sum_{i=1}^n f(x_i^*)\).  
> [!WARNING]  
> Using unequal \(\Delta x\) without weighting each term by its own width destroys the limiting integral.

### Step 3 — Multiply and divide by \(\Delta x\)
Rewrite the sum:  
\[
\frac{1}{n}\sum_{i=1}^n f(x_i^*) = \frac{1}{b-a}\sum_{i=1}^n f(x_i^*)\Delta x.
\]
The numerator is now a Riemann sum for \(\int_a^b f(x)\,dx\).  
> [!WARNING]  
> Forgetting the outer factor \(1/(b-a)\) leaves the integral itself, which grows with interval length and is not an average.

### Step 4 — Take the limit
As \(n\to\infty\) and \(\Delta x\to 0\), the Riemann sum converges to the definite integral, yielding  
\[
\frac{1}{b-a}\int_a^b f(x)\,dx.
\]
This is the definition of the average value of \(f\) on \([a,b]\).

### Step 5 — Geometric interpretation
The integral equals the net signed area under the graph. Multiplying that area by \(1/(b-a)\) produces the height of the rectangle whose base is \([a,b]\) and whose area matches the net area under the curve.

### Step 6 — Mean Value Theorem for Integrals (optional but immediate consequence)
If \(f\) is continuous on \([a,b]\), there exists at least one \(c\in[a,b]\) such that  
\[
f(c) = \frac{1}{b-a}\int_a^b f(x)\,dx.
\]
Thus the average value is actually attained by the function.

## 5. Worked examples — every step shown

**Example 1 — Linear function**  
*Given:* \(f(x)=x\) on \([0,2]\).  
*Find:* average value.  
\[
\int_0^2 x\,dx = \Bigl[\frac12 x^2\Bigr]_0^2 = 2.
\]  
*Why:* antiderivative evaluated at endpoints.  
Divide by length:  
\[
\frac{1}{2-0}\cdot 2 = 1.
\]  
**1**  
*Reflection:* The result equals the midpoint of the interval, as expected for a straight line.

**Example 2 — Quadratic**  
*Given:* \(f(x)=x^2\) on \([0,3]\).  
*Find:* average value.  
\[
\int_0^3 x^2\,dx = \Bigl[\frac13 x^3\Bigr]_0^3 = 9.
\]  
*Why:* power rule.  
\[
\frac{1}{3}\cdot 9 = 3.
\]  
**3**  
*Reflection:* The average lies above the midpoint value because the parabola spends more “time” at larger heights.

**Example 3 — Trigonometric**  
*Given:* \(f(x)=\sin x\) on \([0,\pi]\).  
*Find:* average value.  
\[
\int_0^\pi\sin x\,dx = [-\cos x]_0^\pi = 2.
\]  
*Why:* antiderivative of sine.  
\[
\frac{1}{\pi}\cdot 2 = \frac{2}{\pi}.
\]  
**\(\frac{2}{\pi}\)**  
*Reflection:* Symmetry about \(\pi/2\) makes the average positive even though sine changes sign outside this interval.

**Example 4 — Rational function with singularity outside interval**  
*Given:* \(f(x)=\frac{1}{x}\) on \([1,2]\).  
*Find:* average value.  
\[
\int_1^2\frac1x\,dx = [\ln|x|]_1^2 = \ln 2.
\]  
*Why:* fundamental theorem applies since \(1/x\) is continuous on \([1,2]\).  
\[
\frac{1}{2-1}\ln 2 = \ln 2.
\]  
**\(\ln 2\)**  
*Reflection:* The average equals the integral itself only because the interval length is 1; changing the interval immediately changes the numerical value.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                                      |
|-------------------------------------|---------------------------------------------|------------------------------------------------------|
| Reporting the integral without dividing by \(b-a\) | Confusing total accumulation with average   | Always write the factor \(1/(b-a)\) first            |
| Using \(\frac{f(a)+f(b)}{2}\)       | Thinking of linear interpolation            | Compute the integral explicitly                      |
| Forgetting units of the independent variable | Treating \(x\) as dimensionless             | Keep track of whether \(x\) is time, length, etc.    |
| Applying the formula to a discontinuous function without checking | Assuming every function has an average      | Verify continuity on the closed interval first       |
| Evaluating the antiderivative at the wrong limits | Sign error or swapped endpoints             | Sketch the interval and label \(a\) and \(b\) visibly |
| Confusing average value with average rate of change | Both involve division by \(b-a\)            | Distinguish “height” from “slope”                    |
| Using a midpoint Riemann sum as the final answer | Stopping one step too early                 | Always pass to the definite integral                 |

## 7. The textbook-precise statement
Let \(f\) be continuous on the closed interval \([a,b]\). The **average value** of \(f\) on \([a,b]\) is  
\[
\frac{1}{b-a}\int_a^b f(x)\,dx.
\]
By the Mean Value Theorem for Integrals there exists \(c\in[a,b]\) such that \(f(c)\) equals the average value. (Stewart, *Calculus*, 9e, §5.5, Theorem 3.)

## 8. Visual — diagram or schematic
```text
y
↑
|          ╭──────────────╮   ← height = average value
|         /|              |
|        / |   area A     |   rectangle area = A
|       /  |              |
|      /   |              |
|     f(x) |              |
|    /     |              |
|___/______|______________→ x
    a      c              b
```
The curve \(y=f(x)\) lies above or below the horizontal line at height \(c = \frac{1}{b-a}\int_a^b f(x)\,dx\); the signed areas between the curve and the line cancel so that the rectangle exactly matches the net area under the curve.

## 9. The memory technique

1. **The hook** — Picture a wavy river of water whose total volume is fixed; the average depth is the height of a straight rectangular canal that carries exactly the same volume in the same length.
2. **What to overlearn** — The formula \(\frac{1}{b-a}\int_a^b f(x)\,dx\) and the fact that continuity guarantees the value is attained.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by writing the discrete average, inserting \(\Delta x\), taking the limit, and dividing by interval length.

## 10. What this unlocks
The average-value concept is the direct bridge to the Mean Value Theorem for Integrals and to the statement of the Fundamental Theorem of Calculus in terms of accumulated change. It reappears in arc-length formulas (average speed), work calculations (average force), probability (expected value as integral average), Fourier coefficients (constant term is the average value), and numerical quadrature error estimates.

- Next: Mean Value Theorem for Integrals  
- Later: First and Second Moments, Expected Value  
- Applications: Arc length, Surface area, Probability density functions  

## 11. Self-check — five questions, no answers
1. Compute the average value of \(f(x)=e^x\) on \([0,1]\).  
2. A car’s velocity is \(v(t)=t^2\) m/s for \(0\le t\le 3\). What constant velocity over the same interval yields identical displacement?  
3. True or false: the average value of a positive continuous function on \([a,b]\) always lies between its minimum and maximum on that interval.  
4. If the average value of \(f\) on \([0,2]\) is 5 and on \([2,3]\) is 7, what is the average value on \([0,3]\)?  
5. Construct a continuous function on \([0,1]\) whose average value equals 0 yet the function itself is never zero.