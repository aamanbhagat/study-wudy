## 1. The one-sentence answer
**The six trigonometric functions possess explicit derivatives that follow directly from the known limits of sine and cosine together with the quotient and chain rules.**

Sine and cosine are the foundational pair. Their derivatives arise from the geometry of the unit circle and the two standard limits \(\lim_{h\to 0}\frac{\sin h}{h}=1\) and \(\lim_{h\to 0}\frac{1-\cos h}{h}=0\). Once these two results are established, every remaining trigonometric derivative is obtained by rewriting the function as a quotient or product and differentiating algebraically.

The pattern that emerges is economical: each derivative is a product or square of the original functions, with a sign that alternates according to whether the function is “direct” or “reciprocal.” This economy lets one compute derivatives of any combination of trigonometric expressions without returning to first principles.

> [!NOTE]
> The entire table of six derivatives collapses to two seed facts—\((\sin x)'=\cos x\) and \((\cos x)'=-\sin x\)—once the algebraic identities among the functions are used systematically.

## 2. Why this matters — concrete and current
In orbital mechanics, the two-body problem is routinely expressed in polar coordinates whose radial and angular accelerations contain derivatives of sine and cosine; SpaceX’s guidance algorithms evaluate these derivatives thousands of times per second during ascent.

In semiconductor lithography, the intensity pattern produced by a diffraction grating is a sum of complex exponentials whose real and imaginary parts are sines and cosines; ASML’s wavefront metrology software differentiates these expressions to locate the precise focal plane.

In machine-learning libraries, the back-propagation step for sinusoidal positional encodings used in transformers requires the derivative of sine; the PyTorch and JAX implementations therefore embed the six trigonometric derivatives at the C++ level for speed.

In rigid-body dynamics simulators for robotics, the rotation matrices that appear in the equations of motion are built from sines and cosines; MuJoCo’s constraint solver repeatedly differentiates these matrices to obtain Jacobians.

In radio astronomy, the fringe-visibility function measured by an interferometer array is a cosine transform of sky brightness; the CLEAN algorithm’s gradient step uses the derivative of cosine to update image pixels.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Limit definition of derivative | Supplies the starting point for \(\sin\) and \(\cos\)     |
| Standard limits \(\lim\frac{\sin h}{h}=1\), \(\lim\frac{1-\cos h}{h}=0\) | Seed results from which all six derivatives follow        |
| Quotient rule            | Required for \(\tan\), \(\cot\), \(\sec\), \(\csc\)       |
| Pythagorean identities   | Convert squared terms into the forms that appear in answers |
| Chain rule               | Needed when the argument is a composite function          |

## 4. Building the idea — from intuition to formalism

### Step 1 — Geometric seed for sine
On the unit circle the vertical coordinate is \(\sin\theta\). A small angular increment \(h\) produces a vertical change whose ratio to \(h\) approaches the horizontal coordinate \(\cos\theta\) as \(h\to 0\).

For \(\theta=\pi/3\), numerical checks show \(\frac{\sin(\pi/3+h)-\sin(\pi/3)}{h}\) converging to \(\sqrt{3}/2=\cos(\pi/3)\).

\[
\lim_{h\to 0}\frac{\sin(\theta+h)-\sin\theta}{h}=\cos\theta
\]

> [!WARNING]
> Replacing the difference quotient by the derivative of the argument alone yields the wrong sign and misses the cosine factor entirely.

### Step 2 — Geometric seed for cosine
The same small arc lowers the horizontal coordinate. The corresponding difference quotient converges to \(-\sin\theta\).

At \(\theta=0\), the ratio \(\frac{\cos h-1}{h}\) approaches 0, matching \(-\sin 0\).

\[
\lim_{h\to 0}\frac{\cos(\theta+h)-\cos\theta}{h}=-\sin\theta
\]

> [!WARNING]
> Forgetting the minus sign is the most common algebraic slip when first writing the cosine derivative.

### Step 3 — Tangent via quotient rule
Write \(\tan x=\sin x/\cos x\). Apply the quotient rule and replace the resulting numerator by the Pythagorean identity.

\[
(\tan x)'=\frac{\cos^2 x+\sin^2 x}{\cos^2 x}=\sec^2 x
\]

> [!WARNING]
> Omitting the denominator \(\cos^2 x\) after simplification produces an expression that cannot be evaluated at multiples of \(\pi/2\).

### Step 4 — Cotangent by symmetry
Replace every occurrence of sine by cosine and cosine by negative sine; the sign flips once more.

\[
(\cot x)'=-\csc^2 x
\]

### Step 5 — Secant via reciprocal rule
Write \(\sec x=(\cos x)^{-1}\). The chain rule immediately supplies the factor \(\sec x\tan x\).

\[
(\sec x)'=\sec x\tan x
\]

### Step 6 — Cosecant by the same reciprocal logic
The extra minus sign appears automatically.

\[
(\csc x)'=-\csc x\cot x
\]

### Step 7 — Unified statement
All six derivatives are therefore completely determined by the two seed limits together with algebraic identities.

## 5. Worked examples — every step shown

**Example 1 — Direct sine derivative**  
*Given:* \(f(x)=\sin x\) at \(x=\pi/6\).  
*Find:* \(f'(x)\).  

Apply the limit definition:  
\[
f'(x)=\lim_{h\to 0}\frac{\sin(x+h)-\sin x}{h}.
\]  
*Why:* This is the definition of the derivative.  

Use the angle-addition formula and the known limit:  
\[
f'(x)=\cos x\cdot\lim_{h\to 0}\frac{\sin h}{h}+\sin x\cdot\lim_{h\to 0}\frac{\cos h-1}{h}=\cos x.
\]  
*Why:* The first limit equals 1 and the second equals 0.  

**\(\boldsymbol{f'(x)=\cos x}\)**

*Reflection:* The example isolates the single seed result; every later derivative builds on this line.

**Example 2 — Tangent at a concrete point**  
*Given:* \(g(x)=\tan x\) at \(x=\pi/4\).  
*Find:* \(g'(x)\).  

Rewrite \(g(x)=\sin x/\cos x\) and apply the quotient rule:  
\[
g'(x)=\frac{\cos x\cdot\cos x-\sin x\cdot(-\sin x)}{\cos^2 x}=\frac{\cos^2 x+\sin^2 x}{\cos^2 x}.
\]  
*Why:* Numerator simplification uses the Pythagorean identity.  

The fraction collapses to \(\sec^2 x\).  
*Why:* \(\cos^2 x+\sin^2 x=1\).  

**\(\boldsymbol{g'(x)=\sec^2 x}\)**

*Reflection:* The identity step is the only non-mechanical move; it must be performed before any numerical substitution.

**Example 3 — Composite secant**  
*Given:* \(h(x)=\sec(3x)\).  
*Find:* \(h'(x)\).  

Chain rule on the outer reciprocal:  
\[
h'(x)=\sec(3x)\tan(3x)\cdot 3.
\]  
*Why:* The inner derivative supplies the extra factor of 3.  

**\(\boldsymbol{h'(x)=3\sec(3x)\tan(3x)}\)**

*Reflection:* The pattern \(\sec\tan\) is preserved; only the chain-rule multiplier changes.

**Example 4 — Mixed function**  
*Given:* \(k(x)=\frac{\sin x}{1+\cos x}\).  
*Find:* \(k'(x)\).  

Quotient rule yields  
\[
k'(x)=\frac{\cos x(1+\cos x)-\sin x(-\sin x)}{(1+\cos x)^2}=\frac{\cos x+\cos^2 x+\sin^2 x}{(1+\cos x)^2}.
\]  
*Why:* \(\cos^2 x+\sin^2 x=1\) again.  

The numerator simplifies to \(1+\cos x\), cancelling one factor in the denominator.  

**\(\boldsymbol{k'(x)=\frac{1}{1+\cos x}}\)**

*Reflection:* Cancellation after differentiation is common; it rewards keeping expressions factored until the end.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Sign error on cosine or cosecant  | Recalling “the other function” without the minus    | Always attach the sign to the function name itself   |
| Writing \(\tan'=\cot^2\)          | Confusing reciprocal with derivative                | Memorise that tangent’s derivative is a square of secant |
| Forgetting chain-rule factor      | Treating the argument as a dummy variable           | Write the inner derivative explicitly every time     |
| Domain oversight at odd multiples of \(\pi/2\) | Derivative formulas remain valid only where original function is defined | State the open intervals of validity before differentiating |
| Mixing degree and radian mode     | Calculator or software silently uses degrees        | Convert every angle argument to radians before any limit |
| Over-simplifying before differentiation | Cancelling factors that vanish at isolated points   | Differentiate first, simplify second                 |
| Applying quotient rule to secant  | Treating secant as a quotient instead of reciprocal | Prefer the reciprocal (or chain) rule for speed      |

## 7. The textbook-precise statement
Let \(f\) be any one of the six trigonometric functions. Then \(f\) is differentiable at every point of its natural domain, and its derivative is given by the corresponding entry in the table below (Stewart, *Calculus*, 9e, §3.4, Theorem 3):

\[
\begin{align*}
\frac{d}{dx}\sin x&=\cos x,\\
\frac{d}{dx}\cos x&=-\sin x,\\
\frac{d}{dx}\tan x&=\sec^2 x,\\
\frac{d}{dx}\cot x&=-\csc^2 x,\\
\frac{d}{dx}\sec x&=\sec x\tan x,\\
\frac{d}{dx}\csc x&=-\csc x\cot x.
\end{align*}
\]

Each identity holds on every open interval throughout which the function on the left is defined.

## 8. Visual — diagram or schematic

```text
Unit circle, angle θ in standard position
          (0,1)
           |
(-1,0)-----O----- (1,0)
           |
          (0,-1)

Tangent line at (cos θ, sin θ) has slope = cos θ / sin θ? No:
Slope of radius vector is tan θ; perpendicular tangent has slope -cot θ.
Derivative of sin is the horizontal projection cos θ.
Derivative of cos is the negative vertical projection -sin θ.
```

The diagram shows the unit circle with a radius at angle θ. The vertical rise per radian equals the x-coordinate (cos θ); the horizontal retreat per radian equals the negative y-coordinate (−sin θ). All six derivatives are algebraic consequences of these two projections.

## 9. The memory technique

**The hook**  
Picture a clock whose second hand is the sine wave; the minute hand is its derivative, cosine, always a quarter-cycle ahead. Reciprocal functions carry a minus sign because they point “inward” on the same clock.

**What to overlearn**  
- \((\sin)'=\cos\), \((\cos)'=-\sin\)  
- \(\tan'=\sec^2\), \(\cot'=-\csc^2\)  
- \(\sec'=\sec\tan\), \(\csc'=-\csc\cot\)

**Spaced-repetition schedule**  
Review the six-line table at 1 day, 3 days, 7 days, 16 days, and 35 days after first mastery.

**First-principles fallback**  
Return to the two standard limits, rewrite the target function via sine and cosine, then apply quotient or chain rule; the identities finish the algebra.

## 10. What this unlocks
Mastery of these six derivatives permits immediate differentiation of any expression built from trigonometric functions, which is presupposed by integration techniques, Taylor series, differential equations, and Fourier analysis.

- Integration of rational functions of sine and cosine (Weierstrass substitution)  
- Derivatives of inverse trigonometric functions  
- Linear differential equations with constant coefficients whose characteristic equations involve sine and cosine  
- Linearisation of pendulum and small-angle approximations in physics  
- Automatic differentiation layers inside neural-network frameworks that contain sinusoidal activations

## 11. Self-check — five questions, no answers
1. Compute the derivative of \(\sin x\cos x\) two different ways and verify they agree.  
2. Find \(\frac{d}{dx}\csc(2x)\) and state the largest open intervals on which the answer is valid.  
3. A student claims \((\tan x)'=\cot x\). Identify the precise algebraic mistake and correct it.  
4. Differentiate \(\frac{1+\sin x}{1-\sin x}\) and simplify the result to a single trigonometric function.  
5. Using only the definitions of sine and cosine as power series, derive the derivative of \(\sin x\) without appealing to geometry or standard limits.