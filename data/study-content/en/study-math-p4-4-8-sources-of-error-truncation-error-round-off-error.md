## 1. The one-sentence answer
**Truncation error arises from replacing an exact mathematical procedure by a finite approximation, while round-off error arises from the finite precision with which numbers are stored and arithmetic is performed inside a computer.**

Truncation error is deterministic and shrinks when the approximation is refined—for instance, by taking more terms in a series or using a smaller step size. Round-off error is stochastic in character and grows when more arithmetic operations are executed or when numbers of very different magnitude are added. Both errors are always present simultaneously in any practical calculation; the observed total error is their sum.

The central task of numerical analysis is therefore not to eliminate either source but to balance them so that the total error remains below a prescribed tolerance. When the discretization parameter (step size, mesh width, polynomial degree) is driven to zero, truncation error vanishes while round-off error eventually dominates; the optimal parameter choice occurs at their crossover.

> [!NOTE]
> The minimal total error is never zero; it occurs at a finite discretization scale whose location depends on machine epsilon and on the smoothness of the underlying function.

## 2. Why this matters — concrete and current
In the design of the James Webb Space Telescope’s attitude-control system, finite-difference approximations to derivatives of star-tracker quaternions must remain accurate to roughly 10^{-10} rad; truncation error from a first-order difference and round-off accumulated across 10^5 floating-point operations per control cycle were balanced by choosing a step size near 2^{-26}.

Modern transformer training runs at FP16 precision on clusters of 10^4 GPUs; each matrix multiplication introduces round-off on the order of 2^{-11} per entry, while gradient clipping and learning-rate schedules implicitly control the truncation error of the stochastic-gradient estimator. The interplay determines whether the loss surface is navigated to a flat minimum or is corrupted by noise amplification.

Semiconductor foundries use electromagnetic solvers based on the finite-element method to predict parasitic capacitance at the 3 nm node. The mesh size controls truncation of the Maxwell equations; round-off in the resulting sparse linear solve limits the reliable extraction of femtofarad-level differences that decide timing closure.

Global climate models integrate the primitive equations with spectral or finite-volume schemes whose time-step truncation must be kept below the uncertainty of cloud-parameterization sub-models. Round-off accumulated over 10^9 time steps on 64-bit hardware sets a practical floor on the reproducibility of decadal forecasts.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Floating-point representation  | Supplies the machine epsilon that bounds round-off        |
| Taylor expansion with remainder| Gives an explicit expression for truncation error         |
| Norms and limits               | Allow precise statements that truncation → 0 while round-off does not |
| Big-O notation                 | Concise language for asymptotic statements of both errors |

## 4. Building the idea — from intuition to formalism

### Step 1 — Error is the difference between exact and computed quantities
Any numerical procedure replaces an exact mathematical object \(x\) by a computed surrogate \(\hat{x}\). The absolute error is simply the difference \(e = x - \hat{x}\).  
Example: the exact value \(\pi\) approximated by 3.1416 yields \(e \approx 0.000007346\ldots\).  
\[
e = x - \hat{x}.
\]
> [!WARNING] Treating the computed value as exact hides the fact that every subsequent operation inherits this initial discrepancy.

### Step 2 — Truncation error is produced by deliberate simplification of an infinite process
An infinite series, integral, or differential operator is replaced by a finite number of arithmetic operations. The missing tail constitutes truncation error.  
Example: \(\sin x = x - x^3/6 + R_5(x)\) where \(|R_5(x)|\) is the first omitted term.  
\[
T_n(x) = f(x) - P_n(x),
\]
where \(P_n\) is the degree-\(n\) Taylor polynomial.  
> [!WARNING] Confusing truncation error with round-off leads to the false belief that merely using higher precision will always reduce total error.

### Step 3 — Round-off error is produced by finite-precision storage and arithmetic
Each real number is replaced by the nearest floating-point number whose mantissa contains only \(t\) bits. Subsequent arithmetic obeys the model \(\mathrm{fl}(a \oplus b) = (a \oplus b)(1 + \delta)\) with \(|\delta| \le u\), where \(u = 2^{-t}\) is unit round-off.  
Example: storing 1/3 in binary64 yields an error of order \(2^{-53}\).  
\[
|\mathrm{fl}(x) - x| \le u |x|.
\]
> [!WARNING] Assuming exact arithmetic when counting operations produces an underestimate of total error that grows with problem size.

### Step 4 — The two errors interact through the discretization parameter
Let \(h\) be a step size. Truncation error typically behaves as \(O(h^p)\) for some \(p > 0\), while round-off error behaves as \(O(u/h)\) because smaller \(h\) requires more additions. Their sum therefore possesses a minimum at a finite \(h^*\).  
\[
E(h) = C h^p + K \frac{u}{h}.
\]
> [!WARNING] Driving \(h \to 0\) without regard to \(u\) produces an increase rather than a decrease in observed error.

### Step 5 — The textbook distinction follows at once
Truncation error is independent of the floating-point format and vanishes with refinement; round-off error is independent of the mathematical approximation and is bounded below by a positive multiple of machine epsilon. The total error is their sum; optimal algorithm design balances the two contributions.

## 5. Worked examples — every step shown

**Example 1 — Forward-difference truncation**  
*Given:* \(f(x) = \sin x\) at \(x = 0.5\), exact derivative \(f'(0.5) \approx 0.87758256189\).  
*Find:* truncation error of the forward difference with \(h = 0.1\).  
Compute \(\frac{f(0.6) - f(0.5)}{0.1}\).  
\[
\frac{\sin 0.6 - \sin 0.5}{0.1} \approx 0.85252452206.
\]
*Why:* subtract the two function values, divide by \(h\).  
Error = \(0.87758256189 - 0.85252452206 = 0.02505803983\).  
**0.025058**  
*Reflection:* the observed error matches the leading Taylor term \(\frac12 h f''(\xi)\).

**Example 2 — Round-off in subtraction**  
*Given:* \(x = 1 + 2^{-52}\), \(y = 1\) in binary64.  
*Find:* computed difference.  
\[
\mathrm{fl}(x) - y = 2^{-52} \quad\text{(exact in this case)},
\]
but adding a further \(2^{-53}\) produces catastrophic cancellation.  
**\(2^{-53}\)**  
*Reflection:* loss of all leading digits shows why \(u\) must be respected.

**Example 3 — Combined error in numerical differentiation**  
*Given:* same \(f\) and \(x\), vary \(h = 10^{-k}\).  
*Find:* \(h\) minimizing total error.  
Tabulate forward-difference error for \(k = 1 \dots 16\); the minimum occurs near \(h \approx 10^{-8}\).  
**\(h \approx \sqrt{u}\)**  
*Reflection:* the square-root scaling is the concrete realization of Step 4.

**Example 4 — Accumulated round-off in summation**  
*Given:* sum of \(10^6\) terms each equal to \(10^{-8}\) in binary64.  
*Find:* absolute error relative to exact sum \(0.01\).  
Recursive summation yields an error of order \(10^6 \times u \times 10^{-8} \approx 2^{-53}\).  
**\(1.11 \times 10^{-16}\)**  
*Reflection:* the error grows with the number of additions, not with the magnitude of the summand.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using \(h\) smaller than \(\sqrt{u}\) | Belief that smaller step always improves accuracy | Stop at the empirically observed minimum error |
| Ignoring guard digits in subtraction | Cancellation magnifies relative round-off   | Use compensated summation or higher precision |
| Treating measured error as pure truncation | Round-off already dominates                 | Perform the same computation in two precisions |
| Assuming floating-point addition is associative | Compiler or hardware re-association         | Insert parentheses or use Kahan summation    |
| Forgetting that constants in \(O(h^p)\) contain derivatives | Overly optimistic truncation estimates      | Bound the next derivative explicitly         |
| Reporting only absolute error     | Relative error may be meaningless for tiny values | Always report both norms                     |
| Extrapolating convergence past machine epsilon | Truncation model ceases to hold             | Monitor the residual in a higher-precision run |

## 7. The textbook-precise statement
Let \(f\) be \(p+1\) times continuously differentiable on an interval containing \(x\) and \(x+h\). The forward-difference operator satisfies
\[
f'(x) - \frac{f(x+h)-f(x)}{h} = -\frac{h}{2}f''(\xi)
\]
for some \(\xi \in (x,x+h)\). In floating-point arithmetic the computed difference obeys the model
\[
\left|\mathrm{fl}\Bigl(\frac{\mathrm{fl}(f(x+h))-\mathrm{fl}(f(x))}{h}\Bigr) - \frac{f(x+h)-f(x)}{h}\Bigr| \le \frac{2u}{h}\max(|f(x)|,|f(x+h)|) + O(u).
\]
Hence the total error is bounded by a term of order \(h\) plus a term of order \(u/h\). (Burden & Faires, *Numerical Analysis*, 10e, §4.1.)

## 8. Visual — diagram or schematic
```text
Error
 ^
 |                  total error E(h)
 |               /\
 |              /  \ 
 |   round-off /    \ truncation
 |         O(u/h)     \  O(h^p)
 |           /         \
 |          /           \
 +---------+-------------+---> h (log scale)
          h*          large h
```
The curve is the sum of a decreasing truncation branch and an increasing round-off branch; the minimum lies at their intersection \(h^*\).

## 9. The memory technique
**The hook** — picture a balance scale: one pan holds a shrinking truncation weight, the other an expanding round-off weight; the pointer reads total error and is lowest when the pans are equal.

**What to overlearn** — \(u \approx 2^{-53}\) for binary64; total error \(\sim C h^p + K u/h\); optimal \(h \sim u^{1/(p+1)}\).

**Spaced-repetition schedule** — review the balance picture after 1 day, recompute a numerical example after 3 days, derive the optimal \(h\) after 7 days, state the textbook bound after 16 days, and reconstruct the entire argument from Taylor’s theorem after 35 days.

**First-principles fallback** — begin with the definition of the derivative, insert the Taylor remainder, replace every arithmetic operation by its floating-point model, collect powers of \(h\) and \(u\).

## 10. What this unlocks
Mastery of truncation versus round-off supplies the quantitative language needed to analyse stability, convergence rates, and conditioning of every subsequent numerical algorithm.  

- Choice of step-size controllers in ODE solvers  
- Mixed-precision algorithms in dense linear algebra  
- A posteriori error estimators in finite-element methods  
- Backward-error analysis for eigenvalue problems  

## 11. Self-check — five questions, no answers
1. Compute the forward-difference approximation to \(f'(1)\) for \(f(x)=\ln x\) with \(h=10^{-8}\) in double precision; compare with the exact derivative.  
2. For the same problem, produce a log-log plot of observed error versus \(h\) over \([10^{-1},10^{-16}]\) and locate the minimum.  
3. Show that the central-difference formula has truncation error \(O(h^2)\) while its round-off term remains \(O(u/h)\); predict the new optimal \(h\).  
4. In summing \(n\) positive numbers of roughly equal magnitude, derive an upper bound on accumulated round-off that is independent of summation order.  
5. A colleague claims that “using quadruple precision removes all error.” Construct a concrete counter-example in which truncation error still dominates.