## 1. The one-sentence answer
**When the characteristic equation of a second-order linear homogeneous ODE with constant coefficients yields a pair of complex conjugate roots \(\alpha \pm \beta i\), the two linearly independent real solutions are obtained by taking the real and imaginary parts of the complex exponential solution via Euler’s formula.**

The characteristic equation arises after substituting the trial solution \(y = e^{rx}\) into an equation such as \(y'' + p y' + q y = 0\). For real coefficients the roots must appear in conjugate pairs whenever they are not real. Each complex root supplies a solution of the form \(e^{(\alpha + \beta i)x}\), but this expression is formally complex. Euler’s identity converts the imaginary exponential into ordinary sine and cosine, automatically producing two real functions that satisfy the original differential equation.

The same pair of functions can be written in amplitude-phase form, \(C e^{\alpha x} \cos(\beta x - \phi)\), revealing that the motion is an oscillation whose amplitude grows or decays exponentially according to the sign of \(\alpha\).

> [!NOTE]
> The single complex exponential \(e^{(\alpha + \beta i)x}\) simultaneously encodes both the exponential envelope and the sinusoidal oscillation; Euler’s formula merely separates these two physical effects into the familiar real functions we measure in the laboratory.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 attitude-control loops contain lightly damped second-order modes whose closed-loop poles lie off the real axis; the complex-root solution predicts the exact frequency and settling envelope observed in telemetry during boost-back burns.  

In semiconductor radio-frequency design, the small-signal model of a quartz-crystal oscillator is a linear ODE whose characteristic roots are a complex conjugate pair near the imaginary axis; the resulting \(\sin\) and \(\cos\) terms give the precise start-up transient that determines phase-noise performance in 5G base-station chips.  

The quantum harmonic oscillator, the starting point for every quantum-field-theory calculation at facilities such as CERN, reduces to an ODE whose solutions are exactly the complex-root case with \(\alpha = 0\); the real and imaginary parts become the position-space wave functions whose squares yield measurable probability densities.  

Structural engineers at Arup use the same solution form to predict wind-induced sway of supertall towers such as the Shanghai Tower; the damping ratio \(\zeta = \alpha / \sqrt{\alpha^2 + \beta^2}\) extracted from the roots directly sets the size of the tuned-mass damper installed at the top.  

Modern reinforcement-learning agents that control continuous-time dynamical systems (for example, OpenAI’s humanoid locomotion policies) internally integrate the identical linear ODE when they linearise around limit cycles; the complex eigenvalues govern the oscillatory recovery behaviour that must remain stable.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| Characteristic equation        | Converts the ODE into an algebraic equation whose roots dictate the form of solutions |
| Linear independence            | Guarantees that the two real functions obtained from one complex root span the solution space |
| Euler’s formula                | Supplies the explicit bridge from complex exponentials to real trigonometric functions |
| Real and imaginary parts       | Must be extracted to obtain physically measurable real-valued solutions              |

## 4. Building the idea — from intuition to formalism

### Step 1 — The trial solution still works for complex roots
Assume a solution of the exponential form even when \(r\) is allowed to be complex; the algebra of differentiation remains identical.  
Example: \(y'' - 2y' + 5y = 0\) yields \(r^2 - 2r + 5 = 0\), so \(r = 1 \pm 2i\).  
The formal statement is that if \(r\) satisfies the characteristic equation then \(y = e^{rx}\) satisfies the ODE.  
> [!WARNING]  
> Treating the complex exponential as “not allowed” forces an unnecessary detour through undetermined coefficients or reduction of order.

### Step 2 — Complex solutions come in conjugate pairs
Because the coefficients are real, if \(e^{(\alpha + \beta i)x}\) is a solution then its conjugate is also a solution.  
Example: both \(e^{(1+2i)x}\) and \(e^{(1-2i)x}\) satisfy the equation above.  
Formally: \(\overline{L[y]} = L[\overline{y}]\) for any real-coefficient linear operator \(L\).

### Step 3 — Euler’s formula splits the complex exponential
Write \(e^{(\alpha + \beta i)x} = e^{\alpha x} e^{i\beta x} = e^{\alpha x}(\cos\beta x + i\sin\beta x)\).  
The real and imaginary parts each satisfy the ODE by linearity.  
Thus two real solutions appear: \(e^{\alpha x}\cos\beta x\) and \(e^{\alpha x}\sin\beta x\).

### Step 4 — Linear independence is immediate
The Wronskian of \(e^{\alpha x}\cos\beta x\) and \(e^{\alpha x}\sin\beta x\) equals \(\beta e^{2\alpha x} \neq 0\).  
Hence they form a fundamental set.

### Step 5 — The general real solution
Any real linear combination of the two real parts gives the complete real solution:  
\[
y(x) = e^{\alpha x}(A\cos\beta x + B\sin\beta x).
\]
This is the textbook statement for Case 3.

## 5. Worked examples — every step shown

**Example 1 — Pure imaginary roots**  
*Given:* \(y'' + 4y = 0\).  
*Find:* general real solution.  
Characteristic equation: \(r^2 + 4 = 0 \implies r = \pm 2i\).  
Thus \(\alpha = 0\), \(\beta = 2\).  
By Step 5 the solution is  
\[
y = A\cos 2x + B\sin 2x.
\]  
**Final answer**  
\[ y = A\cos 2x + B\sin 2x \]  

*Reflection:* Zero real part produces undamped oscillation; the same pattern appears whenever energy is conserved.

**Example 2 — Damped oscillation**  
*Given:* \(y'' + 2y' + 5y = 0\).  
*Find:* general solution.  
Roots: \(r = -1 \pm 2i\).  
Hence \(\alpha = -1\), \(\beta = 2\).  
\[
y = e^{-x}(A\cos 2x + B\sin 2x).
\]  
**Final answer**  
\[ y = e^{-x}(A\cos 2x + B\sin 2x) \]  

*Reflection:* The factor \(e^{-x}\) forces decay regardless of the oscillatory part.

**Example 3 — Initial-value problem**  
*Given:* \(y'' - 4y' + 13y = 0\), \(y(0)=2\), \(y'(0)=1\).  
*Find:* particular solution.  
Roots: \(r = 2 \pm 3i\).  
General solution: \(y = e^{2x}(A\cos 3x + B\sin 3x)\).  
\(y(0)=A=2\).  
Differentiate: \(y' = 2e^{2x}(2\cos 3x - 3\sin 3x) + \dots\) (full algebra yields \(B=-1\)).  
**Final answer**  
\[ y = e^{2x}(2\cos 3x - \sin 3x) \]  

*Reflection:* Initial conditions fix the two arbitrary constants exactly as in the real-root cases.

**Example 4 — Amplitude-phase form**  
*Given:* \(y = e^{-0.1x}(3\cos 4x + 4\sin 4x)\).  
*Find:* single-amplitude expression.  
\(R = \sqrt{3^2+4^2}=5\), \(\phi = \tan^{-1}(4/3)\).  
\[
y = 5e^{-0.1x}\cos(4x - \phi).
\]  
**Final answer**  
\[ y = 5e^{-0.1x}\cos(4x - \phi) \]  

*Reflection:* The phase shift absorbs the relative weighting of sine and cosine; useful for comparing with experimental phase data.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting the exponential factor   | Students treat all complex roots as pure imaginary  | Always identify both \(\alpha\) and \(\beta\) first  |
| Using only one complex solution     | Overlooking that two real functions are required    | Explicitly extract Re and Im parts                   |
| Sign error in \(\alpha\)            | Characteristic polynomial written with wrong signs  | Double-check the constant term against the ODE       |
| Confusing \(\beta\) with frequency  | Missing the factor of \(2\pi\) in Hertz             | Keep \(\beta\) in rad/unit time until conversion     |
| Wronskian zero when \(\beta=0\)     | Roots actually real and repeated                    | Verify discriminant before invoking Case 3           |
| Applying the formula to non-constant coefficients | Formula derived only for constant-coefficient case | Confirm coefficients are constant before proceeding  |
| Losing the factor of \(i\) in differentiation | Treating \(i\beta\) as ordinary multiplication     | Keep \(i\) explicit until Euler’s formula is applied |

## 7. The textbook-precise statement
Let \(L[y] = y'' + p y' + q y\) with \(p,q\in\mathbb{R}\). Suppose the characteristic equation \(r^2 + p r + q = 0\) has roots \(\alpha \pm \beta i\) where \(\beta > 0\). Then the functions  
\[
y_1(x) = e^{\alpha x}\cos\beta x, \qquad y_2(x) = e^{\alpha x}\sin\beta x
\]  
form a fundamental set of real solutions on \(\mathbb{R}\). The general real solution is any linear combination of \(y_1\) and \(y_2\). (Boyce & DiPrima, *Elementary Differential Equations*, 11e, §3.4, Theorem 3.4.3.)

## 8. Visual — diagram or schematic
```text
Complex plane
          Im
           |
      β    |     • (α, β)
           |    /
    -------+---/---+---- Re
           |  /    α
      -β   | •
           |
```
Label: conjugate pair symmetric about real axis; real part \(\alpha\) sets growth/decay, imaginary part \(\beta\) sets angular frequency.

## 9. The memory technique
1. **The hook** — Picture a spiral staircase whose radius grows or shrinks exponentially while you ascend at constant angular speed; the shadow on the wall traces \(\cos\) and \(\sin\) modulated by the radius \(e^{\alpha x}\).  
2. **What to overlearn** — The pair \(e^{\alpha x}\cos\beta x\), \(e^{\alpha x}\sin\beta x\); the mapping \(\alpha \pm \beta i \mapsto\) those two functions.  
3. **Spaced-repetition schedule** — Review the mapping at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from \(e^{(\alpha+\beta i)x}\) by writing out Euler’s formula and separating real and imaginary parts.

## 10. What this unlocks
Mastery of this case supplies the oscillatory building block for every subsequent linear system that possesses natural frequencies.  

- Higher-order constant-coefficient ODEs (repeated complex roots)  
- Forced oscillators and resonance (Method of undetermined coefficients with \(\sin/\cos\))  
- Laplace-transform inversion for complex poles  
- Qualitative theory of planar linear systems (spiral sinks and sources)  
- Fourier-series solutions of PDEs on bounded domains  

## 11. Self-check — five questions, no answers
1. Write the general real solution for \(y'' + 6y' + 25y = 0\).  
2. For which values of \(\alpha\) does the solution \(e^{\alpha x}\cos x\) decay to zero as \(x\to\infty\)?  
3. Show that \(y_1 = e^{x}\cos 2x\) and \(y_2 = e^{x}\sin 2x\) are linearly independent by computing their Wronskian.  
4. An engineer measures a decaying sinusoid whose envelope is \(e^{-0.3t}\) and whose period is \(0.5\pi\). What are the characteristic roots?  
5. Why does the formula fail if the original ODE has a non-constant coefficient such as \(x y'' + y' + y = 0\)?