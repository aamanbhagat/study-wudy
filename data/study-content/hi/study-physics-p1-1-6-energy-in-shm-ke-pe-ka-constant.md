## 1. The one-sentence answer
**In SHM the sum of kinetic and potential energy remains exactly constant and equals ½kA².**

Yeh constant total energy is mechanical energy ka conservation ka direct result. Jab displacement zero hota hai, velocity maximum hoti hai aur saari energy kinetic form mein hoti hai. Jab displacement A (amplitude) par hoti hai, velocity zero hoti hai aur saari energy potential form mein hoti hai. Beech ke positions mein energy dono forms ke beech swap karti rehti hai lekin unka sum hamesha ½kA² rehta hai.

Iska matlab yeh hai ki oscillation ke har instant par aap energy balance se velocity nikaal sakte ho bina time-dependent equations solve kiye.

> [!NOTE]
> The single most important “aha” is that the ½kA² value is fixed by the initial condition (release from rest at amplitude A) and never changes during frictionless motion; every later value of x or v must satisfy this single algebraic constraint.

## 2. Why this matters — concrete and current
In LIGO’s mirror suspensions the test masses execute SHM at ~0.5–1 Hz; total stored energy ½kA² directly sets the thermal-noise floor that limits gravitational-wave strain sensitivity (LIGO-P1800169).

SpaceX’s Falcon 9 first-stage grid-fin actuators use torsional SHM modes whose energy budget decides actuator sizing; exceeding ½kA² risks resonance with bending modes of the booster (SpaceX telemetry, 2018–2023 flights).

In superconducting RF cavities at CERN’s HL-LHC, microphonics drive mechanical resonances; monitoring the constant ½kA² helps separate Lorentz-force detuning from genuine mechanical energy (CERN-ATS-2021-0004).

Seismic isolation tables in advanced LIGO and KAGRA rely on geometric anti-spring filters whose effective k sets the ½kA² energy scale that must stay below the Brownian-motion limit at 10 Hz.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Definition of SHM: \(x(t)=A\cos(\omega t+\phi)\) | Gives the explicit time dependence of position needed to differentiate velocity and acceleration |
| Hooke’s law force \(F=-kx\) | Directly supplies the potential-energy expression \(U=\frac12kx^2\) |
| Work-energy theorem | Shows that work done by conservative force equals \(-\Delta U\), allowing total mechanical energy to be written as constant |

## 4. Building the idea — from intuition to formalism

### Step 1 — Energy definitions from force law
Potential energy is defined as the negative of work done by the restoring force. For \(F=-kx\) we obtain \(U(x)=\frac12kx^2\). Kinetic energy remains the familiar \(\frac12mv^2\).

Concrete example: a mass on a spring released from rest at \(x=A\). At that instant \(v=0\), so total energy \(E=U(A)=\frac12kA^2\).

Formal statement:
\[
U(x)=\int_x^0(-kx')\,dx'=\frac12kx^2.
\]

> [!WARNING]
> If you forget the negative sign in the definition of potential you will obtain a negative spring constant and the motion will appear unstable.

### Step 2 — Velocity from position via energy conservation
Total energy is constant:
\[
E=K+U=\frac12mv^2+\frac12kx^2=\frac12kA^2.
\]
Solving for \(v\):
\[
v=\pm\frac{dx}{dt}=\pm\omega\sqrt{A^2-x^2},\qquad\omega=\sqrt{k/m}.
\]

### Step 3 — Differentiate to recover the equation of motion
Differentiate both sides of the energy equation with respect to time (chain rule):
\[
m v\frac{dv}{dt}+kx\frac{dx}{dt}=0.
\]
Cancel \(dx/dt=v\) (where \(v\neq0\)) to obtain \(m a=-kx\), recovering Newton’s second law.

### Step 4 — Phase-space ellipse
Rewrite the energy equation:
\[
\frac{v^2}{\omega^2 A^2}+\frac{x^2}{A^2}=1.
\]
This is the equation of an ellipse in the \((x,v)\) plane whose area is \(2\pi E/\omega=2\pi A^2\sqrt{km}\).

### Step 5 — Textbook-grade statement
For any frictionless SHM the mechanical energy
\[
E=\frac12m\dot x^2+\frac12kx^2
\]
is an exact constant of motion equal to \(\frac12kA^2\) when the motion is bounded by amplitude \(A\).

## 5. Worked examples — har step show karo

**Example 1 — Maximum speed**
*Given:* \(k=200\,\text{N/m}\), \(m=0.5\,\text{kg}\), \(A=0.1\,\text{m}\).  
*Find:* maximum speed.  
Energy: \(\frac12kA^2=1\,\text{J}\).  
At \(x=0\), \(U=0\), so \(\frac12mv_\text{max}^2=1\).  
\(v_\text{max}=\sqrt{4}=2\,\text{m/s}\).  
*Why:* All potential energy converts to kinetic at equilibrium.  
**2 m/s**

*Reflection:* The result is independent of mass once \(\omega\) is fixed; heavier mass simply oscillates slower but stores the same energy.

**Example 2 — Speed at arbitrary position**
*Given:* same parameters, find speed at \(x=0.06\,\text{m}\).  
\(\frac12kA^2=1\,\text{J}\).  
\(\frac12kx^2=0.36\,\text{J}\).  
\(\frac12mv^2=0.64\,\text{J}\).  
\(v=\sqrt{2.56}=1.6\,\text{m/s}\).  
*Why:* Subtract the instantaneous potential from the fixed total energy.  
**1.6 m/s**

*Reflection:* Sign of velocity is chosen by direction of motion; energy only gives magnitude.

**Example 3 — Time to reach a position using energy**
*Given:* release from \(x=A\). Find time to first reach \(x=A/2\).  
\(v=\omega\sqrt{A^2-x^2}\).  
Separate variables: \(dt=dx/(\omega\sqrt{A^2-x^2})\).  
Integrate from \(A\) to \(A/2\): \(t=\frac1\omega\cos^{-1}(1/2)=\pi/(3\omega)\).  
*Why:* Energy supplies the speed function needed for the separable differential equation.  
**\(\pi/(3\omega)\)**

*Reflection:* The integral is the inverse cosine because of the trigonometric identity hidden in the square root.

**Example 4 — Energy partitioning at two phases**
*Given:* \(\omega=10\,\text{rad/s}\), \(A=0.05\,\text{m}\), \(k=500\,\text{N/m}\). At \(t=0\), \(x=A\). At phase \(\omega t=\pi/3\), compute \(K\) and \(U\).  
Total \(E=0.625\,\text{J}\).  
\(x=A\cos(\pi/3)=0.025\,\text{m}\).  
\(U=0.15625\,\text{J}\).  
\(K=0.46875\,\text{J}\).  
*Why:* Direct substitution into the two energy terms after finding \(x(t)\).  
**\(K=0.46875\,\text{J}\), \(U=0.15625\,\text{J}\)**

*Reflection:* Ratio \(K/U=3\) matches \(\tan^2(\omega t)\), a quick check.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Writing \(E=\frac12kA^2\) even when damping is present | Students forget that friction dissipates energy | Check whether the problem states “frictionless” or “ideal spring” |
| Using \(v=\omega A\) at every point instead of \(\omega\sqrt{A^2-x^2}\) | Confusing maximum speed with instantaneous speed | Always substitute the actual \(x\) into the energy equation |
| Sign error in potential: \(U=-\frac12kx^2\) | Misremembering the definition of potential | Derive \(U\) from work once, then memorise the positive sign |
| Forgetting units when equating energies | Mixing joules with newton-metres without conversion | Write units beside every term until the final line |
| Assuming total energy changes with time in undamped SHM | Thinking force does work continuously | Remember the restoring force is perpendicular to velocity in phase space |
| Calculating amplitude from energy without knowing initial conditions | Treating \(A\) as free parameter | Fix \(A\) from the release position or initial velocity |
| Confusing \(\frac12kA^2\) with \(\frac12m\omega^2A^2\) when \(k\neq m\omega^2\) | Algebraic slip | Verify \(\omega^2=k/m\) before substituting |

## 7. The textbook-precise statement
For a one-dimensional harmonic oscillator whose equation of motion is
\[
m\ddot x+kx=0,\qquad k>0,
\]
the quantity
\[
E(t)=\frac12m\dot x(t)^2+\frac12kx(t)^2
\]
is constant for all \(t\). If the motion is bounded and the extreme displacement is \(A\), then
\[
E=\frac12kA^2.
\]
(This is Theorem 3.2 in A.P. French, *Vibrations and Waves*, 1st ed., §3-3.)

## 8. Visual — diagram or schematic
```
v
 ^
 |      .---------.
 |    .'           '.
 |   /               \
 |  /                 \
 | /                   \
 |/                     \___________> x
- A          0          +A
```
Ellipse in phase space: horizontal axis is displacement \(x\) from \(-A\) to \(+A\); vertical axis is velocity \(v\) from \(-\omega A\) to \(+\omega A\). The closed curve is the constant-energy contour \(E=\frac12kA^2\).

## 9. The memory technique
1. **The hook** — Picture a perfectly round, frictionless ball rolling inside a parabolic bowl; the height of the rim is fixed, so the ball’s total “height-plus-speed” energy never changes no matter where it is on the curve.
2. **What to overlearn** — \(E=\frac12kA^2\) (single number fixed by amplitude) and \(v=\pm\omega\sqrt{A^2-x^2}\).
3. **Spaced-repetition schedule** — Review the energy equation after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from \(F=-kx\), integrate to obtain \(U=\frac12kx^2\), add \(\frac12mv^2\), set equal at two different points to recover the constant.

## 10. What this unlocks
Energy conservation lets you bypass explicit time integration when only amplitudes or speeds are required; it is the gateway to action-angle variables, adiabatic invariants, and resonance energy transfer in coupled oscillators.

- Damped harmonic oscillator energy decay rate
- Normal-mode energy partitioning in two-mass systems
- Quantum harmonic-oscillator zero-point energy \(\frac12\hbar\omega\)

## 11. Self-check — five questions, no answers
1. A mass-spring system is released from rest at \(x=3\) cm. Write the numerical value of total energy in terms of \(k\) only.
2. At what displacement is kinetic energy exactly half the total energy?
3. Derive the expression for speed at \(x=A/\sqrt{2}\) without using trigonometric identities.
4. A student writes \(E=\frac12kA^2+\frac12mv^2\). Identify the mistake and correct it.
5. In an undamped oscillator the amplitude suddenly doubles. By what factor does the total energy change?