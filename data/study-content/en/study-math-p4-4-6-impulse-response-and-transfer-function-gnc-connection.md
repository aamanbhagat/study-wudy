## 1. The one-sentence answer
**The impulse response of a linear time-invariant system governed by an ordinary differential equation is the unique solution forced by a Dirac delta input, and its Laplace transform is precisely the transfer function that maps inputs to outputs in the s-domain.**

An ordinary differential equation with constant coefficients encodes how a system evolves under external forcing. When that forcing is an idealized instantaneous kick—the Dirac delta—the resulting output trajectory is the impulse response. Because the underlying operator is linear and time-invariant, every possible input can be assembled from scaled and shifted deltas; the output is then assembled from the same scalings and shifts of the impulse response via convolution.

The Laplace transform converts the convolution into ordinary multiplication. Consequently the transformed impulse response becomes a rational function of s—the transfer function—whose poles and zeros reveal stability, bandwidth, and transient behavior without ever returning to the time domain.

> [!NOTE]
> The transfer function is not an arbitrary algebraic object; it is the Laplace transform of the impulse response, so every property visible in one domain has an exact counterpart in the other.

## 2. Why this matters — concrete and current
SpaceX uses transfer-function models derived from the second-order rotational dynamics of Falcon 9 to design the instantaneous impulse commands sent to the grid-fin actuators during boost-back burns; the same models predict how a single 50 ms thruster pulse propagates into attitude error.

In semiconductor lithography, ASML’s TWINSCAN scanners model the wafer-stage positioning loop as a sixth-order linear ODE; the impulse response to a single encoder glitch determines the 2 nm overlay budget, and the corresponding transfer function supplies the notch filters implemented on the real-time controller.

Modern reinforcement-learning papers on continuous-time control (e.g., “DeepMind’s DM Control Suite”) replace black-box simulators with the analytic impulse response of a linearised cart-pole ODE so that policy gradients can be computed exactly via the transfer-function representation.

Radio astronomers at the Event Horizon Telescope correlate voltage time series across global baselines; each antenna’s receiver chain is characterised by its measured impulse response, whose Laplace transform yields the frequency-dependent gain used to calibrate the final image.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Linear constant-coefficient ODEs | The system must be LTI for superposition and time-invariance to produce a single impulse response that works for all inputs. |
| Dirac delta distribution | The canonical “instantaneous” input whose sifting property isolates the impulse response. |
| Laplace transform        | Converts the convolution representation into algebraic multiplication, yielding the transfer function. |
| Convolution              | The unique way to reconstruct the forced response from the impulse response under LTI assumptions. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Linear time-invariant ODEs
A linear constant-coefficient ODE describes any system whose future evolution depends linearly on its present state and on an external forcing function.  
Example: \( m\ddot y + c\dot y + ky = u(t) \).  
Formal statement:  
\[
a_n y^{(n)} + \cdots + a_0 y = u(t), \qquad a_i \in \mathbb{R}.
\]
> [!WARNING]
> If the coefficients are allowed to vary with time, the impulse response measured at one instant will not predict behaviour at another instant.

### Step 2 — The Dirac delta as test input
The Dirac delta \(\delta(t)\) is the distributional limit of a sequence of unit-area pulses whose width tends to zero.  
It satisfies \(\int_{-\infty}^{\infty} \delta(t)\phi(t)\,dt = \phi(0)\) for any test function \(\phi\).  
Formal statement: the forcing \(u(t)=\delta(t)\) produces the impulse response \(h(t)\).

### Step 3 — Existence and uniqueness of the impulse response
Under the standard existence-uniqueness theorem for linear ODEs with smooth coefficients, the initial-value problem with zero state at \(t=0^-\) admits a unique solution when \(u=\delta\).  
This solution \(h(t)\) is causal: \(h(t)=0\) for \(t<0\).

### Step 4 — Convolution representation
Any input \(u(t)\) may be written  
\[
u(t)=\int_{-\infty}^{\infty} u(\tau)\delta(t-\tau)\,d\tau.
\]
Linearity and time-invariance then give the forced response  
\[
y(t)=\int_{-\infty}^{\infty} u(\tau)h(t-\tau)\,d\tau = (u*h)(t).
\]

### Step 5 — Laplace transform of the convolution
The Laplace transform turns convolution into multiplication:  
\[
\mathcal{L}\{u*h\}=U(s)H(s),
\]
where \(H(s)=\mathcal{L}\{h(t)\}\).  
Hence the algebraic relation \(Y(s)=H(s)U(s)\) defines the transfer function.

### Step 6 — Explicit construction from the ODE
Take the Laplace transform of the ODE with zero initial conditions:  
\[
(a_n s^n+\cdots+a_0)Y(s)=U(s)\implies H(s)=\frac{1}{a_n s^n+\cdots+a_0}.
\]
The same rational function is obtained by transforming the impulse response \(h(t)\).

### Step 7 — GNC interpretation
In guidance, navigation and control the transfer function \(H(s)\) is the plant model inserted into every frequency-domain design technique (Bode, Nyquist, root locus). An impulse from a thruster or a sensor glitch is exactly the input whose effect is read off the inverse Laplace transform of \(H(s)\).

## 5. Worked examples — every step shown

**Example 1 — First-order decay**  
*Given:* \(\dot y + y = u(t)\), zero state at \(t=0^-\).  
*Find:* \(h(t)\) and \(H(s)\).  

Take Laplace transform:  
\[
sY+Y=U\implies H(s)=\frac{1}{s+1}.
\]
Inverse Laplace:  
\[
h(t)=e^{-t}\mathbf{1}(t).
\]
**\(h(t)=e^{-t}\mathbf{1}(t)\), \(H(s)=\frac{1}{s+1}\)**  
*Reflection:* The pole location directly sets the exponential decay rate; missing the unit step would violate causality.

**Example 2 — Undamped harmonic oscillator**  
*Given:* \(\ddot y + y = \delta(t)\), \(y(0^-)=\dot y(0^-)=0\).  
*Find:* \(h(t)\).  

Laplace: \(H(s)=\frac{1}{s^2+1}\).  
Inverse:  
\[
h(t)=\sin t\cdot\mathbf{1}(t).
\]
**\(h(t)=\sin t\cdot\mathbf{1}(t)\)**  
*Reflection:* The imaginary poles produce sustained oscillation; any damping term would move them into the left half-plane.

**Example 3 — Step response via integration of impulse response**  
*Given:* The system of Example 1.  
*Find:* response to unit step.  

By convolution:  
\[
y(t)=\int_0^t e^{-\tau}\,d\tau=1-e^{-t}.
\]
*Why:* The step equals the integral of the delta; integration and convolution commute.  
**\(y(t)=1-e^{-t}\)**  
*Reflection:* Verifies that the transfer-function route \(Y(s)=H(s)/s\) yields the identical result.

**Example 4 — Second-order system with numerator**  
*Given:* \(\ddot y + 3\dot y + 2y = \dot u + u\).  
*Find:* \(H(s)\) and \(h(t)\).  

Laplace (zero ICs):  
\[
(s^2+3s+2)Y=(s+1)U\implies H(s)=\frac{s+1}{(s+1)(s+2)}=\frac{1}{s+2}.
\]
Thus \(h(t)=e^{-2t}\mathbf{1}(t)\).  
**\(H(s)=\frac{1}{s+2}\), \(h(t)=e^{-2t}\mathbf{1}(t)\)**  
*Reflection:* Pole-zero cancellation is visible only after writing the transfer function; it is invisible in the original ODE.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Treating \(\delta(t)\) as an ordinary function | The delta is a distribution, not a pointwise value | Always integrate against a test function first       |
| Forgetting initial conditions when taking Laplace | Zero-state assumption is implicit but crucial       | Explicitly set \(y(0^-)=\dot y(0^-)=0\)              |
| Confusing impulse response with step response | Both are “standard” test signals                    | Remember \(h(t)=\frac{d}{dt}g(t)\) where \(g\) is the step response |
| Ignoring causality                | Transfer functions may be written for non-causal filters | Enforce \(\operatorname{Re}s>\sigma\) ROC includes right half-plane |
| Canceling poles and zeros without checking controllability | Algebraic cancellation hides uncontrollable modes   | Verify minimality of the realisation before cancelling |
| Using two-sided Laplace for causal systems | Region of convergence is misidentified              | Always state the ROC when writing \(H(s)\)           |
| Applying frequency response \(H(j\omega)\) to unstable poles | Formula still holds analytically but has no physical steady state | Check all poles lie in open left half-plane first    |

## 7. The textbook-precise statement
Let \(L\) be the constant-coefficient differential operator  
\[
L[y]:=a_n y^{(n)}+\cdots+a_0 y.
\]
The **impulse response** is the unique causal distribution \(h\) satisfying \(L[h]=\delta\) in the sense of distributions with support in \([0,\infty)\). Its Laplace transform  
\[
H(s)=\int_0^\infty h(t)e^{-st}\,dt
\]
(ROC \(\operatorname{Re}s>\sigma\)) is the **transfer function**. Then for any admissible input \(u\) the unique causal solution of \(L[y]=u\) is given by \(y=h*u\). (See R. Curtain & H. Zwart, *Introduction to Infinite-Dimensional Linear Systems Theory*, Springer 1995, §2.2.)

## 8. Visual — diagram or schematic
```text
Time domain                  s-domain
u(t) ──► [ h(t) ] ──► y(t)    U(s) ──► [ H(s) ] ──► Y(s)
          ▲                           ▲
          │ convolution               │ multiplication
          └───────────────────────────┘
```
Horizontal axis labelled \(t\) (or \(s\)); vertical arrows show the mapping; the lower double arrow emphasises that convolution becomes multiplication under the Laplace transform.

## 9. The memory technique

1. **The hook** — Picture a cricket bat struck by a single instantaneous tap of a hammer; the ringing you feel in your hands is exactly \(h(t)\). The transfer function is the “ringing signature” written in the frequency language of the Laplace transform.

2. **What to overlearn** — \(H(s)=\mathcal{L}\{h(t)\}\), \(Y(s)=H(s)U(s)\), and the fact that every LTI ODE yields a rational \(H(s)\) whose denominator is the characteristic polynomial.

3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.

4. **First-principles fallback** — Start from the ODE, set \(u=\delta\), take Laplace with zero initial conditions, read off \(H(s)\), invert to recover \(h(t)\).

## 10. What this unlocks
Mastery of impulse response and transfer function lets you move fluidly between time-domain simulation and frequency-domain design, the daily currency of control engineering.

- Root-locus and Nyquist stability criteria  
- State-space realisation theory (controllability, observability)  
- Discretisation and digital filter design  
- Optimal control via the matrix exponential and its Laplace transform  

## 11. Self-check — five questions, no answers
1. For the system \(\ddot y+2\dot y+2y=\delta(t)\), compute both \(h(t)\) and \(H(s)\) and verify they are Laplace-transform pairs.

2. A transfer function \(H(s)=\frac{s-1}{s+2}\) is claimed to be the Laplace transform of a causal impulse response. Is the claim consistent? Why or why not?

3. Show that the step response \(g(t)\) satisfies \(\dot g(t)=h(t)\) almost everywhere; state the precise distributional correction at \(t=0\).

4. An aircraft pitch dynamics model yields \(H(s)=\frac{1.5}{s(s+3)}\). A single 0.1 s elevator doublet (approximated as an impulse of strength 0.15) occurs at \(t=10\) s. Write the explicit expression for the resulting pitch angle for \(t>10\).

5. Two distinct ODEs are known to possess identical transfer functions after pole-zero cancellation. Construct a concrete numerical example and explain which modes are hidden from input-output experiments.