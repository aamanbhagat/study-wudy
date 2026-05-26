## 1. The one-sentence answer
**The position of a particle in simple harmonic motion is given by \(x(t)=A\cos(\omega t+\phi)\), the general solution to the second-order differential equation \(\frac{d^2x}{dt^2}+\omega^2x=0\).**

This equation arises whenever a restoring force is proportional to displacement. The cosine form encodes both the amplitude of the swing and the timing of the motion through the phase constant \(\phi\). Because the second derivative of cosine is again a negative cosine, the functional form automatically satisfies the original force law at every instant.

Any linear combination of sine and cosine works equally well; the single-cosine expression simply absorbs the two arbitrary constants into \(A\) and \(\phi\). The frequency \(\omega\) is fixed by the physical parameters of the system (mass and spring constant, length and gravity, etc.) and is independent of amplitude.

> [!NOTE]
> The solution is not an approximation; it is exact for any amplitude provided the restoring force remains strictly linear.

## 2. Why this matters — concrete and current
LIGO’s mirror suspensions are engineered as pendulums whose transverse motion is simple harmonic at \(\approx 0.7\) Hz; the exact solution \(x(t)=A\cos(\omega t+\phi)\) is used to subtract seismic noise from the strain data in real time.

In SpaceX Falcon 9, the Merlin engine’s propellant feed lines contain tuned spring-mass absorbers whose natural frequencies are set by the same \(\omega=\sqrt{k/m}\) that appears in the differential equation; flight telemetry is filtered with the analytic solution to detect anomalous oscillations before they grow.

Semiconductor lithography stages from ASML employ voice-coil actuators whose position servos are designed around the closed-form SHM trajectory so that residual vibration after a move settles with a known envelope \(A e^{-\gamma t}\cos(\omega t+\phi)\).

Atomic force microscopes model the cantilever tip as a driven harmonic oscillator; the phase lag \(\phi\) between drive and response directly yields the tip-sample force gradient via the same solution.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| First and second derivatives of sine and cosine | Direct substitution verifies that \(x=A\cos(\omega t+\phi)\) satisfies the differential equation |
| Linear homogeneous differential equations with constant coefficients | Guarantees that the characteristic equation yields purely imaginary roots and therefore oscillatory solutions |
| Initial conditions fixing two arbitrary constants | Determines the specific values of \(A\) and \(\phi\) from position and velocity at \(t=0\) |

## 4. Building the idea — from intuition to formalism

### Step 1 — Force implies acceleration
A restoring force proportional to displacement produces \(F=-kx\). Newton’s second law then converts force directly into acceleration: \(m\frac{d^2x}{dt^2}=-kx\).

A mass on a spring displaced 2 cm from equilibrium experiences a force exactly twice as large as when displaced 1 cm; the ratio \(F/x\) is constant.

\[
m\frac{d^2x}{dt^2}+kx=0
\]

> [!WARNING]
> Treating the force as constant instead of linear produces uniform acceleration, not oscillation.

### Step 2 — Normalize to standard form
Divide through by mass to obtain
\[
\frac{d^2x}{dt^2}+\frac{k}{m}x=0.
\]
Define \(\omega^2=k/m\), yielding the canonical SHM equation
\[
\frac{d^2x}{dt^2}+\omega^2x=0.
\]

### Step 3 — Assume an exponential trial solution
Insert the trial form \(x=e^{rt}\) into the differential equation. The result is the characteristic equation \(r^2+\omega^2=0\), whose roots are \(r=\pm i\omega\).

### Step 4 — Convert complex exponentials to real trigonometric functions
Euler’s formula gives the two independent real solutions \(\cos(\omega t)\) and \(\sin(\omega t)\). Their linear combination is
\[
x(t)=A\cos(\omega t)+B\sin(\omega t).
\]

### Step 5 — Rewrite in amplitude-phase form
Apply the trigonometric identity \(A\cos\theta+B\sin\theta=R\cos(\theta-\phi)\) with \(R=\sqrt{A^2+B^2}\) and \(\tan\phi=B/A\). This produces the textbook expression
\[
x(t)=A\cos(\omega t+\phi).
\]

## 5. Worked examples — every step shown

**Example 1 — Zero initial velocity**
*Given:* \(x(0)=3\) cm, \(v(0)=0\), \(\omega=2\) rad s\(^{-1}\).  
*Find:* \(x(t)\).

Assume \(x(t)=A\cos(\omega t+\phi)\).  
Differentiate: \(v(t)=-A\omega\sin(\omega t+\phi)\).  
Apply \(x(0)=3\): \(A\cos\phi=3\).  
Apply \(v(0)=0\): \(-A\omega\sin\phi=0\) \(\Rightarrow\sin\phi=0\) \(\Rightarrow\phi=0\).  
Thus \(A=3\).  
**\(x(t)=3\cos(2t)\) cm**

*Reflection:* The phase vanished because velocity was zero at maximum displacement; this pattern appears in every release-from-rest problem.

**Example 2 — Non-zero initial velocity**
*Given:* \(x(0)=0\), \(v(0)=4\) cm s\(^{-1}\), \(\omega=2\) rad s\(^{-1}\).  
*Find:* \(x(t)\).

\(A\cos\phi=0\) \(\Rightarrow\phi=\pi/2\).  
\(-A\omega\sin\phi=4\). Substituting \(\phi=\pi/2\) yields \(A= -2\).  
Equivalently, \(x(t)=-2\sin(2t)\) or \(x(t)=2\cos(2t+\pi/2)\).  
**\(x(t)=2\cos(2t+\pi/2)\) cm**

*Reflection:* The amplitude is now fixed by velocity; the two constants are always supplied by the pair of initial conditions.

**Example 3 — Arbitrary phase**
*Given:* \(x(0)=1\), \(v(0)=-3\), \(\omega=\sqrt{2}\).  
*Find:* \(A\) and \(\phi\).

\(A\cos\phi=1\).  
\(-A\sqrt{2}\sin\phi=-3\) \(\Rightarrow A\sin\phi=3/\sqrt{2}\).  
Square and add: \(A^2=1+(9/2)=11/2\) \(\Rightarrow A=\sqrt{11/2}\).  
\(\phi=\arctan(3/\sqrt{2})\).  
**\(x(t)=\sqrt{11/2}\cos(\sqrt{2}t+\phi)\)**

*Reflection:* Numerical evaluation of \(\phi\) is unnecessary until a plot is required; the symbolic form already satisfies the differential equation.

**Example 4 — Energy route to amplitude**
*Given:* Total energy \(E=5\) J, mass \(m=0.5\) kg, \(k=8\) N m\(^{-1}\).  
*Find:* \(A\).

\(\omega=\sqrt{k/m}=4\) rad s\(^{-1}\).  
Maximum potential energy equals total energy: \(\frac12kA^2=5\) \(\Rightarrow A=\sqrt{10/k}= \sqrt{1.25}\) m.  
**\(A=\sqrt{5/4}\) m**

*Reflection:* Energy supplies only the amplitude; phase still requires an initial condition.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Writing \(x=A\cos(\omega t)\) without \(\phi\) | Forgetting that two constants are required for a second-order equation | Always retain the phase or the equivalent sine term until initial conditions are applied |
| Confusing \(\omega\) with \(f\) | Using \(2\pi f\) only in final numerical work | Keep \(\omega\) symbolic until the last line; insert \(2\pi\) only when converting to hertz |
| Sign error in velocity | Differentiating \(\cos(\omega t+\phi)\) yields an extra minus sign | Write \(v=-A\omega\sin(\omega t+\phi)\) explicitly before substituting \(t=0\) |
| Treating \(\phi\) as time-dependent | Misreading the phase as a variable instead of a constant | Remember \(\phi\) is fixed by initial conditions and never changes with \(t\) |
| Using \(\omega=\sqrt{k/m}\) for a pendulum | Applying the spring-mass formula indiscriminately | Derive \(\omega=\sqrt{g/l}\) separately for each physical system |
| Forgetting units of \(\phi\) | Treating phase as dimensionless when it is an angle | Always express \(\phi\) in radians unless degrees are explicitly requested |

## 7. The textbook-precise statement
The general solution of the initial-value problem
\[
\frac{d^2x}{dt^2}+\omega^2x=0,\qquad x(0)=x_0,\quad\dot x(0)=v_0
\]
is
\[
x(t)=A\cos(\omega t+\phi),
\]
where
\[
A=\sqrt{x_0^2+(v_0/\omega)^2},\qquad\phi=\atantwo(-v_0/\omega,x_0).
\]
This is Theorem 3 in Chapter 3 of A. P. French, *Vibrations and Waves* (1971).

## 8. Visual — diagram or schematic
```text
x
^
|          .--.          .--.
|        .'    '.      .'    '.
|      .'        '.  .'        '.
|-----A-----------A-----------A----> t
|    / \         / \         / \
|   /   \       /   \       /   \
|  /     \     /     \     /     \
| /       \   /       \   /       \
|/         \ /         \ /         \
0          φ/ω        2π/ω + φ/ω   4π/ω + φ/ω
```
Horizontal axis: time in units of \(1/\omega\). Vertical axis: displacement. The curve is a pure cosine of amplitude \(A\) shifted left by phase \(\phi/\omega\).

## 9. The memory technique
1. **The hook** — Picture a clock hand whose shadow on a wall traces exactly \(A\cos(\omega t+\phi)\); the phase \(\phi\) is simply the starting angle of the hand at \(t=0\).
2. **What to overlearn** — \(\omega=\sqrt{k/m}\) (or \(\sqrt{g/l}\)), \(A=\sqrt{x_0^2+(v_0/\omega)^2}\), and the derivative pair \(v=-A\omega\sin(\omega t+\phi)\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the characteristic equation \(r^2+\omega^2=0\) from Newton’s law and convert the complex roots to the cosine form via Euler’s formula.

## 10. What this unlocks
Mastery of the undamped solution is the necessary foundation for every subsequent model in the oscillations sequence.

- Energy conservation and virial theorem applied to SHM
- Damped harmonic oscillator and the transition from under-damped to over-damped regimes
- Driven oscillator and resonance curves
- Normal modes of coupled oscillators
- Small-angle approximations in orbital mechanics and rigid-body rotation

## 11. Self-check — five questions, no answers
1. A 0.2 kg mass on a 50 N m\(^{-1}\) spring is released from rest at \(x=0.05\) m. Write the explicit function \(x(t)\).
2. Show that if \(x(t)=A\cos(\omega t+\phi)\) then the acceleration is always opposite in sign to the displacement and proportional to it.
3. The initial conditions \(x(0)=0\), \(v(0)=0\) are given for a system known to obey the SHM equation. What must be true of the motion?
4. A student writes \(x(t)=A\cos(\omega t+\phi t)\). Identify the error and the differential equation this expression actually satisfies.
5. Derive the amplitude \(A\) directly from the total mechanical energy without using initial conditions on position or velocity.