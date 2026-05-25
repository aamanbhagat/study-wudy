## What it is
The Laplace Transform properties are operational rules that allow you to find the transform of a modified function (e.g., scaled, shifted, or multiplied by an exponential) based on the known transform of the original function. These properties—linearity, shifting, and scaling—are shortcuts that bypass the need to re-compute the defining integral for every new function. They are the grammar of the Laplace domain.

## Why it matters
These properties are the engine that makes the Laplace Transform useful for solving Ordinary Differential Equations (ODEs). Linearity allows us to transform an entire ODE term by term. The shift theorems are critical for handling systems with exponential decay/growth (e.g., damped oscillators in a rocket's guidance system) and for modeling discontinuous inputs, like a rocket engine firing at a specific time $t=a$.

## When to study it
You must be fluent with the definition of the Laplace Transform, $\mathcal{L}\{f(t)\} = \int_0^\infty e^{-st} f(t) \, dt$. You should have already derived and memorized the transforms of elementary functions: $1, t^n, e^{at}, \sin(kt), \cos(kt)$. A solid grasp of integral calculus, especially integration by parts and change of variables, is non-negotiable.

## How to study it (step by step)
1.  **Derive Linearity:** Start with the definition $\mathcal{L}\{af(t) + bg(t)\} = \int_0^\infty e^{-st} (af(t) + bg(t)) \, dt$. Use the linearity property of the integral itself to split it into two terms and pull out the constants $a$ and $b$. This should take 5 minutes and prove to yourself why this property holds.
2.  **Derive the First Shift Theorem:** Substitute $e^{at}f(t)$ into the Laplace integral. Combine the exponential terms to see $e^{-(s-a)t}$. Recognize that this is the definition of the Laplace transform of $f(t)$, but with $s$ replaced by $(s-a)$.
3.  **Derive the Second Shift Theorem:** This is the most subtle. First, understand the Heaviside step function, $u(t-a)$. Write the integral for $\mathcal{L}\{f(t-a)u(t-a)\}$. Note that the integrand is zero for $t<a$. Change the lower limit of integration from $0$ to $a$. Now, perform a change of variables: let $\tau = t-a$. Rewrite the entire integral in terms of $\tau$ and see the $e^{-as}F(s)$ structure emerge.
4.  **Derive the Scaling Property:** Compute $\mathcal{L}\{f(at)\}$ from the integral definition. Use the substitution $\tau = at$ and carefully change the differential $dt$ and the limits of integration. The result $\frac{1}{a}F(s/a)$ will fall out directly.
5.  **Solve Targeted Problems:** For each property, solve 3-4 problems that use *only* that property. For example: for the first shift theorem, find $\mathcal{L}\{e^{2t}t^2\}$, $\mathcal{L}\{e^{-t}\sin(4t)\}$, etc. This builds muscle memory for the algebraic pattern of each rule.
6.  **Solve Combined Problems:** Find the transform of functions like $g(t) = e^{-3t}\cos(2(t-1))u(t-1)$. This requires applying multiple rules in sequence and forces you to think about the correct order of operations.

## Key ideas, with intuition
1.  **Linearity:** The transform of a sum is the sum of the transforms. This is a direct consequence of integration being a linear operator. It's what allows us to transform an entire differential equation like $ay'' + by' + cy = g(t)$ into an algebraic equation.
    $$ \mathcal{L}\{af(t) + bg(t)\} = a\mathcal{L}\{f(t)\} + b\mathcal{L}\{g(t)\} = aF(s) + bG(s) $$

2.  **First Shift Theorem (s-shift):** Multiplying a time-domain signal $f(t)$ by an exponential $e^{at}$ corresponds to shifting its transform in the s-domain. Think of $s$ as related to frequency. Multiplying by $e^{at}$ introduces exponential growth or decay, which fundamentally shifts the frequency characteristics of the signal.
    $$ \mathcal{L}\{e^{at}f(t)\} = F(s-a) $$
    Intuition: If $F(s)$ has a peak at $s_0$, representing a dominant frequency/decay rate, then the damped/amplified signal $e^{at}f(t)$ will have a corresponding peak at $s_0+a$. The transform shifts to follow the new decay rate.

3.  **Second Shift Theorem (t-shift):** Delaying a signal in time by $a$ units (and ensuring it's zero before then) corresponds to multiplying its transform by a complex exponential (a phase factor) $e^{-as}$. The magnitude of the frequency components $|F(s)|$ doesn't change, only their phase.
    $$ \mathcal{L}\{f(t-a)u(t-a)\} = e^{-as}F(s) $$
    Intuition: A rocket engine firing at $t=5$ seconds instead of $t=0$ produces the same physical event, just later. The "what" (the frequency content, $F(s)$) is the same, but the "when" is different, captured by the delay factor $e^{-as}$.

4.  **Scaling:** Compressing a signal in time by a factor of $a$ (making it happen faster) causes its frequency spectrum to expand by a factor of $a$ and decrease in amplitude.
    $$ \mathcal{L}\{f(at)\} = \frac{1}{a}F\left(\frac{s}{a}\right) $$
    Intuition: To represent a faster event, you need higher frequency components. Think of playing an audio file at 2x speed: the pitch (frequency) goes up. This is the time-frequency uncertainty principle in action.

## Worked example
Find the Laplace Transform of the function $g(t)$ defined by a rectangular pulse:
$g(t) = \begin{cases} 2 & 1 \le t < 3 \\ 0 & \text{otherwise} \end{cases}$

**Step 1: Express $g(t)$ using Heaviside functions.**
A pulse that turns on at $t=1$ and off at $t=3$ can be written as the difference of two step functions. The amplitude is 2.
$g(t) = 2[u(t-1) - u(t-3)]$

**Step 2: Apply the linearity property.**
The transform of a sum/difference is the sum/difference of the transforms.
$\mathcal{L}\{g(t)\} = \mathcal{L}\{2u(t-1) - 2u(t-3)\} = 2\mathcal{L}\{u(t-1)\} - 2\mathcal{L}\{u(t-3)\}$

**Step 3: Apply the Second Shift Theorem.**
The theorem states $\mathcal{L}\{f(t-a)u(t-a)\} = e^{-as}F(s)$.
For the term $\mathcal{L}\{u(t-1)\}$, our function is the constant function $f(t)=1$, delayed by $a=1$. The transform of $f(t)=1$ is $F(s) = 1/s$.
So, $\mathcal{L}\{1 \cdot u(t-1)\} = e^{-1s} F(s) = \frac{e^{-s}}{s}$.

For the term $\mathcal{L}\{u(t-3)\}$, our function is again $f(t)=1$, but delayed by $a=3$.
So, $\mathcal{L}\{1 \cdot u(t-3)\} = e^{-3s} F(s) = \frac{e^{-3s}}{s}$.

**Step 4: Combine the results.**
Substitute the results from Step 3 back into the expression from Step 2.
$G(s) = 2\left(\frac{e^{-s}}{s}\right) - 2\left(\frac{e^{-3s}}{s}\right) = \frac{2(e^{-s} - e^{-3s})}{s}$

**Reflection:**
- Step 1 was crucial; rewriting the piecewise function using Heaviside functions is the standard technique to make it suitable for transformation.
- Step 2 used linearity to break a complex problem into two simpler, identical problems.
- Step 3 applied the t-shift theorem, correctly identifying $f(t)=1$ as the function being shifted in both cases.
- Step 4 was simple algebraic combination. This demonstrates how a discontinuous function in the time domain becomes a continuous function in the s-domain, multiplied by exponentials that encode the timing information.

## Diagrams

**First Shift Theorem (s-shift):** Multiplication by $e^{at}$ in the time domain shifts the transform in the s-domain.

```text
       | F(s)                     | F(s-a)
       |                          |
   ^   |  .                       |      .
   |   | . .                      |     . .
 F(s)  |.   .                     |    .   .
   |   +-------|> s               |   +-------|> s
       0    s_0                    0    s_0   s_0+a
```

**Second Shift Theorem (t-shift):** Delaying a function in the time domain multiplies its transform by a phase factor $e^{-as}$.

```text
       f(t)                        f(t-a)u(t-a)
       .                           
      . .                          
     .   .                         
    +-------|> t                  +-------|> t
    0                            0       a
```
The shape of the function is identical, but it starts at $t=a$ instead of $t=0$. The transform $F(s)$ captures the shape, and the $e^{-as}$ factor captures the delay.

## Memory technique — remember this forever
1.  **Mnemonic/Story:** Imagine the time domain ($t$) is your "workshop" and the frequency domain ($s$) is your "blueprint".
    -   **s-shift:** Multiplying by $e^{at}$ in the workshop (adding damping/growth) is like changing a fundamental parameter on the blueprint. You grab the whole design and slide it: `s -> s-a`.
    -   **t-shift:** Delaying work in the workshop ($t \to t-a$) doesn't change the design itself, it just adds a note to the blueprint: "Start building at time $a$". This note is the factor $e^{-as}$.

2.  **Must-Overlearn Formulas:**
    -   First Shift: $\mathcal{L}\{e^{at}f(t)\} = F(s-a)$
    -   Second Shift: $\mathcal{L}\{f(t-a)u(t-a)\} = e^{-as}F(s)$

3.  **Spaced Repetition Schedule:**
    -   Day 1: Re-derive both shift theorems from the integral definition.
    -   Day 3: Solve one problem using each theorem.
    -   Day 7: Explain the intuitive difference between the two theorems to a rubber duck.
    -   Day 16: Find the transform of a function requiring both theorems.
    -   Day 35: Write down the two key formulas from memory. If you can't, re-derive them.

4.  **First Principles Pathway:** If you forget a property, start with the definition: $\mathcal{L}\{g(t)\} = \int_0^\infty e^{-st} g(t) \, dt$.
    -   For s-shift, let $g(t) = e^{at}f(t)$. Combine the exponentials.
    -   For t-shift, let $g(t) = f(t-a)u(t-a)$. Change the lower limit of the integral to $a$, then substitute $\tau = t-a$.
    -   For scaling, let $g(t) = f(at)$. Substitute $\tau = at$.
    All properties are just consequences of a substitution in the defining integral.

## Common mistakes
1.  **Confusing the Shift Theorems:** Applying a shift $F(s-a)$ when a time delay is involved, or multiplying by $e^{-as}$ for an exponential multiplication. Remember: exponential in time ($e^{at}$) $\implies$ shift in s. Shift in time ($t-a$) $\implies$ exponential in s ($e^{-as}$).
2.  **Forgetting the Heaviside Function:** The second shift theorem applies to $f(t-a)u(t-a)$, not just $f(t-a)$. The function must be zero for $t<a$. Applying it to a function that wasn't zero before the shift will give the wrong answer.
3.  **Applying the Second Shift Theorem to an Unshifted Function:** Students often try to compute $\mathcal{L}\{f(t)u(t-a)\}$ as $e^{-as}F(s)$. This is incorrect. The argument of the function $f$ must also be shifted: $f(t-a)$. You often need to perform algebraic manipulation like $f(t) = f((t-a)+a)$ to get it into the right form.
4.  **Scaling Factor Errors:** Forgetting the $\frac{1}{a}$ pre-factor in the scaling theorem $\mathcal{L}\{f(at)\} = \frac{1}{a}F(s/a)$.

## Self-check
1.  Find the Laplace transform of $f(t) = 4t^3 - 2\cos(5t)$.
2.  Using the First Shift Theorem and the known transform of $\sin(kt)$, find $\mathcal{L}\{e^{-3t}\sin(2t)\}$.
3.  Find the Laplace transform of the function $f(t)$ defined as $f(t)=0$ for $t<2$ and $f(t) = (t-2)e^{-4(t-2)}$ for $t \ge 2$. (Hint: This combines two properties).