## 1. The one-sentence answer
**The SUVAT equations are the exact integrals of constant acceleration.**

Constant acceleration means velocity changes linearly with time, so its integral (displacement) must be quadratic; performing those two successive integrations on \(a = \frac{dv}{dt}\) and \(v = \frac{ds}{dt}\) produces every SUVAT relation without approximation or guesswork.  

The first integration gives velocity as a linear function of time. The second integration gives position as a quadratic function of time. Eliminating the parameter \(t\) between those two results yields the remaining two independent equations. All five standard SUVAT formulae are therefore direct consequences of the definition of the derivative applied twice under the single assumption that \(a\) is constant.

> [!NOTE]
> The entire set collapses to two elementary antiderivatives once acceleration is recognised as the second derivative of position; memorising the five equations is unnecessary once the integration steps are automatic.

## 2. Why this matters — concrete and current
SpaceX’s Falcon 9 first-stage boost-back burn uses a constant-thrust profile that produces nearly constant acceleration in the body frame; flight software integrates the same two antiderivatives in real time to predict touchdown velocity and trigger the final landing burn.  

NASA’s Artemis I trajectory team solved the same integrals analytically to generate the initial coasting arc after trans-lunar injection, then switched to numerical integration only when third-body gravity perturbed the constant-acceleration assumption.  

Semiconductor step-and-scan lithography stages maintain accelerations of order 10 g with jerk limited to < 1000 m s⁻³; control engineers derive exact position, velocity and settling-time bounds from the SUVAT integrals before any feedback loop is closed.  

Inertial measurement units inside modern smartphones apply the identical double integration to accelerometer data during each 5 ms sample interval to produce dead-reckoning estimates when GNSS is unavailable, exactly as the calculus derivation prescribes.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Derivative as instantaneous rate of change | Acceleration is defined as \(a = \frac{dv}{dt}\), the starting point of every derivation. |
| Antiderivative (indefinite integral) | Reverses the derivative to recover velocity from acceleration and position from velocity. |
| Definite integral with limits | Converts the constants of integration into physically meaningful initial conditions \(u\) and \(s_0\). |
| Chain rule (optional but useful) | Allows elimination of time between \(v(t)\) and \(s(t)\) to obtain the \(v^2 = u^2 + 2as\) form. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Acceleration is the derivative of velocity
Acceleration tells you how fast velocity itself is changing at any instant.  
A car whose speedometer reads 20 m s⁻¹ and is increasing by 3 m s⁻² has \(a = 3\) m s⁻² at that moment.  
$$a = \frac{dv}{dt}.$$  
> [!WARNING]
> Treating \(a\) as “change in speed over change in time” instead of the instantaneous derivative produces only average values and breaks every later integration.

### Step 2 — Velocity is the derivative of position
Velocity is the instantaneous rate at which position changes.  
If a rocket’s altitude is rising at 1500 m s⁻¹, then \(\frac{ds}{dt} = 1500\) m s⁻¹.  
$$v = \frac{ds}{dt}.$$  
> [!WARNING]
> Confusing average velocity with instantaneous velocity here makes the subsequent displacement integral incorrect by an arbitrary constant.

### Step 3 — First integration: recover velocity from constant acceleration
Separate variables and integrate both sides with respect to time, inserting the initial condition \(v(0) = u\):  
$$\int_u^v dv = \int_0^t a\, dt.$$  
$$v - u = at \implies v = u + at.$$  
> [!WARNING]
> Forgetting to apply the lower limit \(v = u\) at \(t = 0\) leaves an undetermined constant that later ruins every displacement calculation.

### Step 4 — Second integration: recover position from velocity
Substitute the expression for \(v(t)\) into \(\frac{ds}{dt}\) and integrate again:  
$$\int_{s_0}^s ds = \int_0^t (u + at)\, dt.$$  
$$s - s_0 = ut + \frac12 at^2.$$  
Setting \(s_0 = 0\) yields the familiar form \(s = ut + \frac12 at^2\).

### Step 5 — Eliminate time to obtain the remaining relations
Solve \(v = u + at\) for \(t\) and substitute into the displacement equation, or integrate \(v\, dv = a\, ds\) directly:  
$$v^2 = u^2 + 2as.$$  
The full set of five SUVAT equations now follows by algebraic rearrangement under the single hypothesis that \(a\) is constant.

## 5. Worked examples — every step shown

**Example 1 — Constant acceleration from rest**  
*Given:* \(u = 0\), \(a = 9.8\) m s⁻², \(t = 5\) s.  
*Find:* final velocity and displacement.  
Step 1: \(v = u + at = 0 + 9.8 \times 5 = 49\) m s⁻¹.  
*Why:* direct substitution into the first integral result.  
Step 2: \(s = ut + \frac12 at^2 = 0 + \frac12 \times 9.8 \times 25 = 122.5\) m.  
*Why:* second integral evaluated with the same limits.  
**\(v = 49\) m s⁻¹, \(s = 122.5\) m**  

*Reflection:* The example is trivial once the integrals are accepted; the only algebraic risk is forgetting the factor of ½.

**Example 2 — Unknown time**  
*Given:* \(u = 30\) m s⁻¹, \(a = -4\) m s⁻², \(s = 100\) m.  
*Find:* time to reach that displacement.  
Use \(s = ut + \frac12 at^2\):  
\(100 = 30t + \frac12 (-4)t^2\)  
\(2t^2 - 60t + 200 = 0\)  
\(t^2 - 30t + 100 = 0\)  
\(t = 15 \pm \sqrt{125}\) s.  
**\(t = 15 \pm 5\sqrt{5}\) s**  

*Reflection:* Quadratic solutions appear because displacement is quadratic in time; both roots are physically admissible until boundary conditions are added.

**Example 3 — Final velocity without time**  
*Given:* \(u = 100\) m s⁻¹, \(a = 2\) m s⁻², \(s = 400\) m.  
*Find:* \(v\).  
Apply \(v^2 = u^2 + 2as\):  
\(v^2 = 100^2 + 2 \times 2 \times 400 = 11600\)  
\(v = \sqrt{11600} = 20\sqrt{29}\) m s⁻¹.  
**\(v = 20\sqrt{29}\) m s⁻¹**  

*Reflection:* The chain-rule identity \(a = v\frac{dv}{ds}\) bypasses time entirely and is the fastest route when \(t\) is absent.

**Example 4 — Two-stage acceleration profile**  
*Given:* first 3 s at \(a = 5\) m s⁻² from rest, then 2 s at \(a = -3\) m s⁻².  
*Find:* final velocity and total displacement.  
Stage 1: \(v_1 = 0 + 5 \times 3 = 15\) m s⁻¹, \(s_1 = \frac12 \times 5 \times 9 = 22.5\) m.  
Stage 2: \(v_f = 15 + (-3) \times 2 = 9\) m s⁻¹,  
\(s_2 = 15 \times 2 + \frac12 (-3) \times 4 = 24\) m.  
Total \(s = 46.5\) m.  
**\(v_f = 9\) m s⁻¹, \(s = 46.5\) m**  

*Reflection:* Each constant-acceleration segment is integrated separately; continuity of velocity at the switch instant supplies the new “initial” value for the next integral.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using average velocity in place of instantaneous velocity | Students remember “distance = speed × time” from constant-speed problems | Always begin from the derivative definitions before integrating. |
| Forgetting the constant of integration | Treating indefinite integrals as definite without limits | Insert the initial conditions \(v(0)=u\) and \(s(0)=s_0\) on every integration. |
| Sign errors with direction | Treating acceleration as always positive | Keep a consistent sign convention for the chosen positive direction throughout. |
| Applying SUVAT when acceleration is not constant | Over-generalising the derived formulae | Verify \(a =\) constant before using any integrated result. |
| Solving for \(t\) and discarding a valid root | Quadratic equations naturally produce two solutions | Check both roots against the physical interval of motion. |
| Confusing \(s\) with path length | Using the scalar magnitude instead of the vector displacement | Remember \(s\) is the net change in position along the chosen axis. |
| Mixing units inside one equation | Inserting km h⁻¹ and m s⁻² together | Convert every quantity to a single coherent unit set before substitution. |

## 7. The textbook-precise statement
Let acceleration \(a\) be constant on a time interval containing \(t=0\). Then the velocity and position functions satisfying the initial conditions \(v(0)=u\), \(s(0)=s_0\) are given by  
$$v(t)=u+at,\qquad s(t)=s_0+ut+\frac12at^2.$$  
Elimination of \(t\) yields the additional relation  
$$v^2=u^2+2a(s-s_0).$$  
These are the unique solutions of the initial-value problem \(\frac{d^2s}{dt^2}=a=\) constant (Stewart, *Calculus*, 9e, §3.4, Theorem 3).

## 8. Visual — diagram or schematic
```text
t
▲
│          v(t) = u + at
│         ╱
│        ╱  slope = a
│       ╱
│      ╱
│     ╱
│    ╱
│   ╱
│  ╱
│ ╱
└──────────────────────► t
   0          t

s
▲
│               s(t) = ut + ½at²   (parabola)
│            ╱
│         ╱
│      ╱   vertex at t=0 if u=0
│   ╱
│╱
└──────────────────────► t
```
The upper graph is the integral of constant \(a\); its slope is \(a\) and its intercept is \(u\). The lower graph is the integral of the upper graph; its curvature is constant and equal to \(a\).

## 9. The memory technique

1. **The hook** — Picture two stacked graphs: a straight line (velocity) whose slope is acceleration, and the area under that line becoming the curved position graph. The area is literally the integral that produces the ½at² term.  
2. **What to overlearn** — \(v=u+at\) and \(s=ut+\frac12 at^2\) (the two direct integrals); the elimination step that produces \(v^2=u^2+2as\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by writing \(a=\frac{dv}{dt}\), separating variables, integrating twice while inserting the initial conditions at each step.

## 10. What this unlocks
Mastery of the constant-acceleration integrals supplies the exact closed-form solutions used in every subsequent treatment of variable acceleration, orbital mechanics, and optimal-control problems in rocketry.  

- Variable-acceleration motion via numerical integration or power-series methods  
- Projectile motion in two dimensions (independent SUVAT equations per axis)  
- Rocket equation derivations that begin from \(F=ma\) with time-varying mass  
- Linear-motion segments inside piecewise trajectory optimisers (e.g., SpaceX boost-back profiles)  
- Kalman-filter prediction steps that propagate state with the same linear-in-time velocity and quadratic-in-time position updates

## 11. Self-check — five questions, no answers
1. Starting from \(a=\frac{dv}{dt}=\) constant, derive \(v^2=u^2+2as\) without ever introducing the variable \(t\).  
2. A particle moves with \(a=+2\) m s⁻² for 4 s then \(a=-2\) m s⁻² for 3 s. If \(u=0\), compute final velocity and net displacement.  
3. Explain why the quadratic displacement equation can yield two mathematically valid times for a given position, and state the physical test that selects the correct root.  
4. An object passes \(x=0\) at \(t=0\) with velocity \(u>0\) and constant acceleration \(a<0\). Write the exact time at which it returns to \(x=0\) and prove it is independent of the value of \(a\) (provided \(a\neq0\)).  
5. Identify the single assumption that would be violated if the SUVAT set were applied to the motion of a relativistic particle whose speed approaches \(c\).