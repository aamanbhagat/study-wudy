## 1. The one-sentence answer
**Damped oscillations classify the solutions of the linear second-order differential equation** \(\ddot{x} + 2\gamma\dot{x} + \omega_0^2 x = 0\) **according to whether the damping coefficient \(\gamma\) lies below, equal to, or above the natural frequency \(\omega_0\)**.

The equation arises whenever a restoring force proportional to displacement competes with a frictional force proportional to velocity. When friction is weak, the system still crosses its equilibrium repeatedly while the amplitude shrinks exponentially; the motion looks like a sine wave whose envelope decays. When friction is strong, the system approaches equilibrium monotonically, never crossing it. Exactly at the boundary the return is the fastest possible without oscillation.

The three regimes therefore correspond to qualitatively different transient behaviors that engineers and physicists must distinguish to predict or control how a system settles after a disturbance.

> [!NOTE]
> The transition between regimes is controlled by a single dimensionless ratio \(\gamma/\omega_0\); once this ratio is known, the entire future evolution is fixed up to two constants set by initial conditions.

## 2. Why this matters — concrete and current
In the design of the James Webb Space Telescope’s sunshield deployment dampers, critically damped hydraulic dashpots were chosen so that each boom would reach its final position in minimum time without overshoot that could tear the delicate membrane.

Automotive semi-active suspension systems from ZF and Bosch continuously adjust damping ratio in real time; crossing from underdamped to overdamped behavior changes both ride comfort and tire-road contact force, quantities measured on proving grounds with accelerometers sampling at 1 kHz.

LIGO’s mirror suspensions operate deep in the underdamped regime so that thermal noise peaks remain narrow; the ring-down time of each pendulum mode directly sets the low-frequency sensitivity floor reported in the 2015 discovery paper.

In semiconductor lithography stages, voice-coil actuators driving reticle stages are tuned near critical damping so that step-and-settle times drop below 5 ms; any residual oscillation at the nanometer level ruins overlay precision.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Hooke’s law force \(F = -kx\) | Supplies the \(\omega_0^2 x\) term that drives oscillation. |
| Linear drag force \(F = -b v\) | Supplies the first-derivative term that removes energy. |
| Characteristic equation of a linear ODE | Converts the differential equation into an algebraic equation whose roots determine the solution form. |
| Complex exponentials | Provide the most compact way to write oscillatory solutions when roots are complex conjugates. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Write the force balance
A mass on a spring feels a restoring force \(-kx\) and a drag force \(-b\dot{x}\). Newton’s second law therefore reads
\[
m\ddot{x} + b\dot{x} + kx = 0.
\]
Divide through by \(m\) and define \(\omega_0^2 = k/m\), \(\gamma = b/(2m)\) to obtain the standard form
\[
\ddot{x} + 2\gamma\dot{x} + \omega_0^2 x = 0.
\]

> [!WARNING]
> Forgetting the factor of 2 in the definition of \(\gamma\) produces every subsequent frequency formula off by a square root of 2.

### Step 2 — Assume an exponential trial solution
Because the equation is linear and homogeneous with constant coefficients, try \(x(t) = e^{rt}\). Substitution yields the characteristic equation
\[
r^2 + 2\gamma r + \omega_0^2 = 0.
\]
The two roots are
\[
r_{\pm} = -\gamma \pm \sqrt{\gamma^2 - \omega_0^2}.
\]

### Step 3 — Discriminant decides the qualitative behavior
The sign of the discriminant \(D = \gamma^2 - \omega_0^2\) fixes the nature of the roots:
- \(D < 0\): complex conjugate pair,
- \(D = 0\): repeated real root,
- \(D > 0\): two distinct real roots.

### Step 4 — Underdamped case (\(\gamma < \omega_0\))
Roots are \(-\gamma \pm i\omega_1\) where \(\omega_1 = \sqrt{\omega_0^2 - \gamma^2}\). The general real solution is therefore
\[
x(t) = e^{-\gamma t}(A\cos\omega_1 t + B\sin\omega_1 t).
\]
The motion oscillates at reduced frequency \(\omega_1\) while amplitude decays as \(e^{-\gamma t}\).

### Step 5 — Critically damped case (\(\gamma = \omega_0\))
Repeated root \(r = -\gamma\). The general solution acquires a linear factor:
\[
x(t) = (A + Bt)e^{-\gamma t}.
\]
This is the fastest non-oscillatory return to equilibrium.

### Step 6 — Overdamped case (\(\gamma > \omega_0\))
Two real roots \(r_\pm = -\gamma \pm \sqrt{\gamma^2 - \omega_0^2}\), both negative. The solution is a sum of two decaying exponentials:
\[
x(t) = A e^{r_+ t} + B e^{r_- t}.
\]
No zero crossings occur after \(t = 0\) for generic initial conditions.

### Step 7 — Textbook statement of the result
The three cases above exhaust the possible behaviors of the damped harmonic oscillator; they are named underdamped, critically damped, and overdamped, respectively.

## 5. Worked examples — every step shown

**Example 1 — Simple underdamped identification**  
*Given:* \(m = 1\) kg, \(k = 4\) N m\(^{-1}\), \(b = 0.5\) kg s\(^{-1}\).  
*Find:* regime and angular frequency of oscillation.  

Divide by \(m\): \(\ddot{x} + 0.5\dot{x} + 4x = 0\), so \(\gamma = 0.25\) s\(^{-1}\), \(\omega_0 = 2\) s\(^{-1}\).  
Compare: \(0.25 < 2\), underdamped.  
\(\omega_1 = \sqrt{4 - 0.0625} = \sqrt{3.9375} \approx 1.984\) s\(^{-1}\).  

**\(\omega_1 \approx 1.984\) rad s\(^{-1}\)**

*Reflection:* The only arithmetic step that can fail is forgetting to halve \(b\) when computing \(\gamma\); once that definition is correct, regime assignment is immediate.

**Example 2 — Critical damping boundary**  
*Given:* \(\omega_0 = 5\) rad s\(^{-1}\). Find the exact damping coefficient \(\gamma\) that produces critical damping.  

Set \(\gamma = \omega_0 = 5\) s\(^{-1}\).  
The solution form changes from oscillatory to \((A + Bt)e^{-5t}\).

**\(\gamma = 5\) s\(^{-1}\)**

*Reflection:* Critical damping is a knife-edge condition; any mismeasurement of \(b\) or \(m\) pushes the system into one of the other two regimes.

**Example 3 — Overdamped decay constants**  
*Given:* \(\gamma = 3\) s\(^{-1}\), \(\omega_0 = 2\) s\(^{-1}\).  
*Find:* the two decay rates.  

\(r_\pm = -3 \pm \sqrt{9-4} = -3 \pm \sqrt{5}\).  
\(r_+ \approx -0.764\), \(r_- \approx -5.236\).

**\(r_+ = -3 + \sqrt{5}\), \(r_- = -3 - \sqrt{5}\)**

*Reflection:* Both exponents are negative, guaranteeing decay; the slower pole \(r_+\) dominates late-time behavior.

**Example 4 — Full solution with initial conditions**  
*Given:* underdamped system with \(\gamma = 0.1\) s\(^{-1}\), \(\omega_0 = 1\) s\(^{-1}\), \(x(0) = 1\) m, \(\dot{x}(0) = 0\).  
*Find:* \(x(t)\).  

\(\omega_1 = \sqrt{1 - 0.01} = \sqrt{0.99}\).  
General solution: \(x(t) = e^{-0.1t}(A\cos\omega_1 t + B\sin\omega_1 t)\).  
\(x(0) = A = 1\).  
Differentiate and set \(\dot{x}(0) = 0\): \(-0.1A + \omega_1 B = 0 \implies B = 0.1/\omega_1\).  

**\(x(t) = e^{-0.1t}\Bigl(\cos\omega_1 t + \frac{0.1}{\omega_1}\sin\omega_1 t\Bigr)\)**

*Reflection:* Initial velocity zero forces the sine coefficient to cancel the derivative contribution of the cosine term at \(t=0\).

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using \(\gamma = b/m\) instead of \(b/(2m)\) | Textbook conventions differ by a factor of two | Always recompute \(\gamma\) from the standard form before comparing with \(\omega_0\) |
| Confusing \(\omega_1\) with \(\omega_0\) after damping is added | The symbol \(\omega\) is overloaded | Write \(\omega_1\) explicitly whenever the damped frequency appears |
| Claiming an overdamped system still “oscillates slowly” | Roots are both real, yet the language of “ringing” lingers | Check the discriminant first; real roots forbid zeros of \(x(t)\) for \(t>0\) |
| Treating critical damping as the minimum-energy-loss case | Intuition suggests “just enough friction” | Critical damping actually maximizes energy loss rate without oscillation; energy loss continues in all regimes |
| Forgetting that critical damping solution contains a \(t e^{-\gamma t}\) term | Students default to pure exponential | When discriminant is exactly zero, the second independent solution must be multiplied by \(t\) |
| Numerical round-off pushing a near-critical case across the boundary | Floating-point comparison with \(\gamma = \omega_0\) | Compare \((\gamma - \omega_0)^2\) with machine epsilon times \(\omega_0^2\) |
| Applying initial conditions before identifying the regime | Algebraic form changes with regime | Identify regime from discriminant before writing the general solution |

## 7. The textbook-precise statement
Let \(\gamma, \omega_0 > 0\). The initial-value problem
\[
\ddot{x} + 2\gamma\dot{x} + \omega_0^2 x = 0, \quad x(0)=x_0,\ \dot{x}(0)=v_0
\]
possesses a unique \(C^2\) solution on \([0,\infty)\). Define the discriminant \(D = \gamma^2 - \omega_0^2\).  
- If \(D < 0\), the solution is underdamped and given by the expression in Step 4.  
- If \(D = 0\), the solution is critically damped and given by the expression in Step 5.  
- If \(D > 0\), the solution is overdamped and given by the expression in Step 6.  
(See Taylor, *Classical Mechanics*, 2005, §5.6.)

## 8. Visual — diagram or schematic
```text
x(t)
 ^
 |   underdamped: decaying sinusoid
 |  /\/\  /\  /\   \
 | /    \/  \/  \   \
 |/              \   \
 +-------------------→ t
 |   critically: (A+Bt)exp
 |    \
 |     \___
 |
 |   overdamped: fast + slow exponential
 |    \     \
 |     \     \____
 +-------------------→ t
```
Horizontal axis is time; vertical axis is displacement. The three curves share the same \(\omega_0\) and initial conditions but differ only in \(\gamma\).

## 9. The memory technique

**The hook**  
Picture three parachutes leaving an airplane at the same instant: one flutters (underdamped), one falls straight and fastest without swinging (critical), one falls like a rock (overdamped).

**What to overlearn**  
1. \(\gamma = b/(2m)\), \(\omega_0 = \sqrt{k/m}\).  
2. Discriminant test: \(\gamma \lessgtr \omega_0\).  
3. The three canonical solution forms.

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

**First-principles fallback**  
Start from Newton’s law, divide by mass, form the characteristic equation, examine the sign of its discriminant; the algebraic cases follow automatically.

## 10. What this unlocks
Mastery of the three damping regimes supplies the language and the explicit solutions needed for every subsequent linear oscillator problem that includes dissipation.

- Driven damped oscillator and resonance curves  
- Coupled oscillators with damping  
- Normal-mode analysis of continuous systems (strings, beams)  
- Control-theory pole placement for second-order plants  
- Quantum Brownian motion and the Caldeira–Leggett model  

## 11. Self-check — five questions, no answers
1. A mass-spring system has \(\omega_0 = 10\) rad s\(^{-1}\). What value of \(\gamma\) produces exactly one zero crossing after release from rest?  
2. Show that the energy of an underdamped oscillator decays as \(e^{-2\gamma t}\) on average, independent of the oscillatory part.  
3. For fixed \(\omega_0\) and initial conditions, prove that the critically damped trajectory reaches within 1 % of equilibrium faster than any overdamped trajectory.  
4. Two sensors report different damping ratios for the same physical damper; one reads \(\gamma/\omega_0 = 0.99\), the other 1.01. Which measurement is more likely to be correct if the observed motion shows a single overshoot?  
5. Write the exact condition on initial velocity that makes an overdamped system cross equilibrium exactly once.