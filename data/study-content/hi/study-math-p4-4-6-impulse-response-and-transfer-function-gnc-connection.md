## 1. The one-sentence answer
**Impulse response** is the output of a linear time-invariant system governed by an ordinary differential equation when the input is a Dirac delta, and the **transfer function** is its Laplace transform; their connection to GNC lies in using these objects to predict and stabilize vehicle trajectories under impulsive corrections.

A linear ODE with constant coefficients converts an arbitrary forcing function into an output via convolution with the impulse response. Once you take the Laplace transform, the convolution becomes ordinary multiplication, so the transfer function directly maps input to output in the s-domain. In GNC pipelines this lets engineers replace lengthy time-domain simulations with algebraic gain and phase calculations before commands are sent to thrusters.

The same pair of objects appears whether you are steering a satellite or filtering sensor noise: the impulse response encodes the system memory, while the transfer function exposes poles that must lie in the left half-plane for stability.

> [!NOTE]
> The single deepest insight is that the impulse response is the Green’s function of the differential operator; everything else (convolution, transfer function, frequency response) follows mechanically from that fact.

## 2. Why this matters — concrete and current
SpaceX uses transfer-function models of the Falcon 9 second-stage attitude dynamics to design the impulsive correction burns that keep the vehicle on its GNC-computed trajectory; each burn is treated as a scaled delta input whose effect is propagated through the transfer function before the next guidance cycle.

NASA’s Artemis program models the Orion spacecraft’s reaction-control jets with impulse-response kernels so that the onboard GNC can predict propellant usage and attitude drift after every short pulse, allowing real-time replanning without solving the full nonlinear ODE on the flight computer.

In semiconductor manufacturing, ASML’s EUV lithography scanners employ transfer-function representations of the wafer-stage positioning loops; impulsive disturbances from floor vibrations are filtered through these functions to keep overlay errors below 1 nm.

Modern quadrotor autopilots (PX4, ArduPilot) linearize the rotational dynamics about hover, extract the impulse response of each axis, and then schedule PID gains by inspecting the resulting transfer-function poles; this is why a 50 ms motor pulse produces a predictable angular-velocity transient.

LIGO’s seismic isolation platforms treat ground motion as a stochastic input and use measured impulse responses to design feed-forward cancellation filters, ensuring that the 4 km arms remain locked during impulsive seismic events.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Dirac delta distribution | Acts as the canonical impulsive input that defines the impulse response |
| Laplace transform        | Converts convolution into multiplication, yielding the transfer function |
| Linear time-invariant ODEs | The mathematical setting in which superposition and convolution hold |
| Convolution integral     | Explicitly constructs the output from any input using the impulse response |
| Pole-zero analysis       | Determines stability and transient shape directly from the transfer function |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — The delta “lights up” the system memory
An LTI system forgets its past only through its own homogeneous dynamics. Applying an instantaneous unit impulse at t = 0 simply sets the initial state that the homogeneous solution then evolves from.  
Concrete example: for \(\ddot y + 3\dot y + 2y = \delta(t)\), the impulse instantly gives \(\dot y(0^+)=1\), after which the solution decays as the sum of two exponentials.  
Formal statement: the impulse response \(h(t)\) satisfies  
\[ L[h](t) = \delta(t),\qquad h(t)=0\text{ for }t<0, \]  
where \(L\) is the linear differential operator.  
> [!WARNING] Treating \(\delta(t)\) as an ordinary function will break the jump conditions on the highest derivative; always integrate across an infinitesimal interval around t = 0.

### Step 2 — Superposition builds the response to any input
Any continuous input \(u(t)\) can be viewed as a superposition of scaled and shifted deltas. Linearity then gives the output as the convolution  
\[ y(t) = \int_0^t h(\tau)u(t-\tau)\,d\tau. \]  
This is still an ODE solution; no transform has been used yet.

### Step 3 — Laplace transform turns convolution into multiplication
Taking the Laplace transform of both sides of the convolution equation yields  
\[ Y(s) = H(s)U(s), \]  
where \(H(s)=\mathcal{L}\{h(t)\}\) is the transfer function. All initial-condition terms are assumed zero for the forced response.

### Step 4 — Rational transfer functions come from constant-coefficient ODEs
For an nth-order equation the transfer function is always a ratio of two polynomials whose denominator is exactly the characteristic polynomial. Poles of \(H(s)\) are therefore the eigenvalues of the system matrix.

### Step 5 — GNC closes the loop with the same objects
A guidance command \(u(t)\) (often a train of impulses) passes through the plant transfer function \(H(s)\) to produce attitude or velocity. Feedback is designed so that the closed-loop poles remain in the open left half-plane, guaranteeing that residual errors after each impulse decay exponentially.

## 5. Worked examples — har step show karo

**Example 1 — First-order decay**  
*Given:* \(\dot y + y = \delta(t)\), \(y(0^-)=0\).  
*Find:* impulse response and transfer function.  
Integrate across [0^−,0^+]:  
\[ y(0^+)-y(0^-)+ \int y\,dt = 1 \implies y(0^+)=1. \]  
*Why:* the integral of y vanishes, leaving the jump in the derivative term.  
For t>0 the homogeneous solution is \(y(t)=e^{-t}\).  
Thus \(h(t)=e^{-t}u(t)\).  
Laplace: \(H(s)=\frac{1}{s+1}\).  
**\(h(t)=e^{-t}u(t)\), \(H(s)=\frac{1}{s+1}\)**  
*Reflection:* the single pole directly gives both the time constant and the stability margin used in GNC rate loops.

**Example 2 — Underdamped second order**  
*Given:* \(\ddot y + 0.2\dot y + y = \delta(t)\).  
*Find:* h(t).  
Characteristic roots: \(-0.1\pm j\sqrt{0.99}\).  
\(h(t)=e^{-0.1t}\frac{1}{\sqrt{0.99}}\sin(\sqrt{0.99}t)\).  
Transfer function: \(H(s)=\frac{1}{s^2+0.2s+1}\).  
**\(H(s)=\frac{1}{s^2+0.2s+1}\)**  
*Reflection:* oscillatory impulse response appears in flexible-body GNC models of solar arrays.

**Example 3 — Nonzero initial conditions**  
*Given:* same ODE as Example 1, but y(0)=2.  
The total solution is homogeneous part from initial condition plus forced part from input.  
**\(y(t)=2e^{-t}+e^{-t}u(t)\)** (for impulse at t=0).  
*Reflection:* transfer-function analysis assumes zero state; initial conditions must be added separately.

**Example 4 — Rectangular pulse approximation**  
*Given:* input u(t) that is 10 for 0.01 s (area = 0.1).  
Approximate as 0.1 δ(t). Output ≈ 0.1 h(t). Error vanishes as pulse width → 0 while area fixed.  
**Output amplitude scales exactly with impulse strength.**  
*Reflection:* real thruster firings are finite-width pulses; the approximation is valid when pulse duration ≪ system time constants.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting the unit step in h(t)  | Students write only the exponential                 | Always multiply by u(t) or restrict domain to t>0    |
| Confusing H(s) with Fourier transform | Both use frequency variables                        | Remember Laplace admits Re(s)>0; Fourier requires absolute integrability |
| Ignoring jump conditions          | Treating δ(t) as ordinary function                  | Integrate the ODE across an infinitesimal interval   |
| Applying transfer function with nonzero initial state | H(s) encodes only zero-state response               | Add homogeneous solution separately                  |
| Sign error in feedback            | Closed-loop formula written as 1+GH instead of 1−GH | Draw the sign of the feedback loop explicitly        |
| Using two-sided Laplace for causal systems | Two-sided transform hides causality                 | Always use one-sided Laplace with u(t) multiplier    |
| Pole-zero cancellation without checking controllability | Algebraically valid but physically meaningless      | Verify that cancelled pole is not excited by inputs  |

## 7. The textbook-precise statement
Let L be the constant-coefficient linear differential operator of order n. The impulse response h is the unique causal distribution satisfying L[h]=δ in the distributional sense. Its Laplace transform H(s) exists for Re(s) larger than the real part of any pole and satisfies  
\[ H(s) = \frac{b_m s^m + \cdots + b_0}{s^n + a_{n-1}s^{n-1} + \cdots + a_0}, \]  
where the denominator is the characteristic polynomial of L. (See Ogata, *Modern Control Engineering*, 5e, §3-4.)

## 8. Visual — diagram or schematic
```
t < 0          t = 0          t > 0
   ───────────●────────────▶
       0       | δ(t)        h(t) = decaying oscillation
               |
          LTI system (ODE)
               |
               ▼
           output y(t)
```
Horizontal axis is time; vertical jump at t=0 represents the instantaneous change in the highest derivative caused by δ(t).

## 9. The memory technique
1. **The hook** — picture a bell being struck once by a hammer (the delta); the ringing you hear is exactly the impulse response h(t).
2. **What to overlearn** — \(H(s)=\frac{1}{s^2+2ζω s+ω^2}\) for the standard second-order prototype and the fact that convolution becomes multiplication under Laplace.
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — start from the ODE, integrate across t=0 to obtain initial jumps, then solve the homogeneous equation for t>0.

## 10. What this unlocks
You can now design feedback compensators, predict settling time after impulsive maneuvers, and convert time-domain specifications into pole-placement problems.  
- Root-locus design  
- Nyquist stability criterion  
- State-space realization from H(s)  
- Kalman-filter covariance propagation for impulsive sensor updates  

## 11. Self-check — five questions, no answers
1. For \(\ddot y + 4y = \delta(t)\), compute h(t) and locate its poles.  
2. A rectangular force of width 0.001 s and height 1000 N acts on a mass-spring system; is the delta approximation acceptable?  
3. Why does a right-half-plane zero in H(s) not destroy closed-loop stability yet still limit performance?  
4. Given measured step response data, how would you numerically obtain an estimate of h(t)?  
5. In a GNC loop with plant H(s) and controller C(s), write the closed-loop transfer function from reference to output and state the condition on its poles.