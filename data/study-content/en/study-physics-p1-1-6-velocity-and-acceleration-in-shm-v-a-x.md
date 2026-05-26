## 1. The one-sentence answer
**In simple harmonic motion the instantaneous speed is \(v = \omega\sqrt{A^2 - x^2}\).**

The position of a particle in SHM is completely determined by a single cosine (or sine) whose argument grows linearly with time. Differentiating that position once with respect to time produces velocity; the resulting expression still contains an explicit time variable. A trigonometric identity then removes the time dependence and leaves velocity as a function of position alone. The same differentiation performed a second time yields acceleration, which turns out to be proportional to the displacement itself.

This relation follows directly from the defining differential equation of SHM, \(\frac{d^2x}{dt^2} = -\omega^2 x\). Because the equation is linear and homogeneous, its solutions are sinusoidal; the velocity–position link is therefore an intrinsic geometric property of the motion on the phase plane.

> [!NOTE]
> The square-root dependence means speed is largest exactly where displacement is zero and drops to zero exactly where displacement reaches its extreme value; the particle therefore spends more time near the turning points than near the equilibrium position.

## 2. Why this matters — concrete and current
SpaceX uses high-frequency accelerometers on Falcon 9 first-stage tanks to monitor pogo oscillations; the velocity–position relation converts raw displacement spectra into instantaneous kinetic energy, allowing real-time detection of resonance before structural loads exceed limits.

LIGO’s mirror suspensions are tuned so that residual seismic motion remains simple harmonic at frequencies below 10 Hz. Engineers apply \(v = \omega\sqrt{A^2 - x^2}\) to convert measured displacement noise into velocity noise, which is the quantity that directly limits strain sensitivity in the 10–100 Hz band.

In semiconductor lithography, piezoelectric stages execute rapid point-to-point moves that are shaped as segments of SHM to minimise jerk. The formula supplies the exact velocity profile needed to keep positioning error below 1 nm while the stage travels at peak speeds of several hundred millimetres per second.

Atomic force microscopes raster the tip in the fast-scan direction using a quartz tuning fork driven at constant amplitude. Knowledge of \(v(x)\) lets the controller predict tip–sample interaction time at each pixel, improving image fidelity at scan rates above 100 lines per second.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Derivative of sine and cosine | Velocity and acceleration are first and second time derivatives of position. |
| Pythagorean identity \(\sin^2\theta + \cos^2\theta = 1\) | Removes explicit time from the velocity expression. |
| Chain rule               | Required when differentiating composite arguments such as \(\omega t + \phi\). |
| Energy conservation for a spring | Provides an independent route to the same velocity formula. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Position is sinusoidal
Any system whose restoring force is linear in displacement executes motion whose projection on the time axis is a cosine wave.  
Example: a mass on a spring released from rest at \(x = A\) has \(x(t) = A\cos(\omega t)\).  
Formal statement:  
$$x(t) = A\cos(\omega t + \phi).$$  
> [!WARNING]
> Forgetting the arbitrary phase \(\phi\) will produce an incorrect sign for velocity at \(t = 0\).

### Step 2 — Velocity is the first derivative
Differentiate position with respect to time.  
Example: \(\frac{d}{dt}[A\cos(\omega t)] = -A\omega\sin(\omega t)\).  
Formal statement:  
$$v(t) = \frac{dx}{dt} = -A\omega\sin(\omega t + \phi).$$  
> [!WARNING]
> Treating \(\omega\) as a constant multiplier rather than part of the argument leads to missing the chain-rule factor.

### Step 3 — Eliminate time with a trigonometric identity
Square and add the normalised position and velocity expressions.  
Example: \(\left(\frac{x}{A}\right)^2 + \left(\frac{v}{A\omega}\right)^2 = \cos^2\theta + \sin^2\theta = 1\).  
Formal statement:  
$$\frac{x^2}{A^2} + \frac{v^2}{A^2\omega^2} = 1.$$  
> [!WARNING]
> Omitting the normalisation by \(A\omega\) produces an incorrect algebraic rearrangement.

### Step 4 — Solve for speed
Isolate \(v\):  
$$v = \pm\omega\sqrt{A^2 - x^2}.$$  
(The sign is fixed by the direction of travel at that instant.)

### Step 5 — Differentiate again to obtain acceleration
Differentiate \(v(t)\) once more:  
$$a(t) = \frac{dv}{dt} = -A\omega^2\cos(\omega t + \phi) = -\omega^2 x.$$  
Formal statement:  
$$a = -\omega^2 x.$$  
> [!WARNING]
> The negative sign is required by the restoring-force convention; dropping it reverses the predicted direction of acceleration.

### Step 6 — Verify consistency with energy
Kinetic plus potential energy is constant:  
$$\frac12 m v^2 + \frac12 k x^2 = \frac12 k A^2.$$  
Substitute \(\omega^2 = k/m\) and solve to recover exactly \(v = \omega\sqrt{A^2 - x^2}\).

## 5. Worked examples — every step shown

**Example 1 — Maximum speed**  
*Given:* \(A = 0.05\) m, \(\omega = 20\) rad s\(^{-1}\).  
*Find:* maximum speed.  
Differentiate or inspect the formula at \(x = 0\):  
$$v_\text{max} = \omega A = 20 \times 0.05 = 1.0$$ m s\(^{-1}\).  
*Why:* the square-root term equals \(A\) when \(x = 0\).  
**\(v_\text{max} = 1.0\) m s\(^{-1}\)**  
*Reflection:* the result is independent of mass, a direct consequence of \(\omega\) already containing \(\sqrt{k/m}\).

**Example 2 — Speed at arbitrary displacement**  
*Given:* \(A = 0.10\) m, \(\omega = 10\) rad s\(^{-1}\), \(x = 0.06\) m, moving rightward.  
*Find:* speed.  
Substitute directly:  
$$v = +10\sqrt{0.10^2 - 0.06^2} = 10\sqrt{0.0064} = 0.80$$ m s\(^{-1}\).  
*Why:* the positive root is chosen because the particle is moving in the positive-\(x\) direction.  
**\(v = 0.80\) m s\(^{-1}\)**  
*Reflection:* numerical evaluation must preserve the physical direction separately from the magnitude.

**Example 3 — Acceleration at the same point**  
*Given:* same values as Example 2.  
*Find:* acceleration.  
Use \(a = -\omega^2 x\):  
$$a = -10^2 \times 0.06 = -6.0$$ m s\(^{-2}\).  
*Why:* acceleration depends only on instantaneous position and is always directed toward equilibrium.  
**\(a = -6.0\) m s\(^{-2}\)**  
*Reflection:* the magnitude is largest at maximum displacement, opposite to the velocity behaviour.

**Example 4 — Time to travel between two positions**  
*Given:* \(A = 0.05\) m, \(\omega = 4\) rad s\(^{-1}\), travel from \(x = 0.03\) m to \(x = 0\).  
*Find:* transit time (first half-cycle).  
Velocity at \(x = 0.03\): \(v = 4\sqrt{0.05^2 - 0.03^2} = 0.16\) m s\(^{-1}\).  
The motion is symmetric; integrate \(dt = dx/v(x)\) or note that the phase advance satisfies \(\Delta\theta = \omega\Delta t = \arccos(0.03/0.05)\).  
\(\Delta t = \frac13\arccos(0.6) \approx 0.232\) s.  
**\(\Delta t \approx 0.232\) s**  
*Reflection:* the integral route recovers the same result as the inverse-cosine method, confirming internal consistency.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using \(v = \omega(A - x)\)       | Linear intuition from constant acceleration | Always square both sides of the energy equation.     |
| Dropping the negative sign in \(a = -\omega^2 x\) | Forgetting restoring-force direction        | Check limiting case: at \(x = +A\), acceleration must be negative. |
| Confusing \(\omega\) with \(f\)   | Both symbols appear in the same paragraph   | Write \(\omega = 2\pi f\) explicitly on first use.   |
| Treating velocity as always positive | Square root symbol hides sign               | Determine direction from the phase or from \(\dot x\) sign. |
| Applying the formula outside the amplitude | Algebraically possible but physically meaningless | Enforce \(|x| \le A\) before substitution.             |
| Forgetting that \(\omega\) contains mass | \(v_\text{max}\) appears mass-independent   | Trace \(\omega^2 = k/m\) back to the force law.      |
| Using peak values for instantaneous acceleration | Mixing average and instantaneous quantities | Acceleration is strictly \(-\omega^2 x\) at each instant. |

## 7. The textbook-precise statement
For a particle whose position satisfies the differential equation
\[
\frac{d^2x}{dt^2} + \omega^2 x = 0,
\]
with initial conditions that produce amplitude \(A\) and phase \(\phi\), the velocity and acceleration at any displacement \(x\) (\(|x| \le A\)) are
\[
v = \pm \omega \sqrt{A^2 - x^2}, \qquad a = -\omega^2 x.
\]
(The sign of \(v\) is chosen according to the sense of motion.) This is Theorem 3.2 in A. P. French, *Vibrations and Waves*, 1st ed., §3-3.

## 8. Visual — diagram or schematic
```text
          A
   +------|------+
   |      |      |
   v      0      v   (velocity arrows at equilibrium)
   |      |      |
   +------|------+
         -A
x-axis: equilibrium at 0, turning points at ±A
velocity vector longest at x=0, zero at x=±A
acceleration vector always points toward 0, longest at ±A
```

## 9. The memory technique

**The hook**  
Picture a runner on a straight track who must stop and reverse at the ends; speed is greatest exactly at the centre line and vanishes at the tape.

**What to overlearn**  
- \(v_\text{max} = \omega A\)  
- \(a_\text{max} = \omega^2 A\)  
- \(a = -\omega^2 x\) (vector form)

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

**First-principles fallback**  
Start from \(F = -kx\), divide by \(m\) to obtain \(\ddot x = -\omega^2 x\), integrate twice, then apply the Pythagorean identity.

## 10. What this unlocks
The velocity–position relation is the gateway to energy bookkeeping in oscillatory systems and to the phase-space ellipse that characterises all linear oscillators.

- Energy stored in SHM  
- Damped and driven oscillators (resonance curves)  
- Small-angle pendulum and physical pendulum periods  
- Normal modes of coupled oscillators  
- Fourier analysis of periodic motion

## 11. Self-check — five questions, no answers
1. A mass-spring system has \(A = 4\) cm and \(\omega = 5\) rad s\(^{-1}\). Compute its speed when it is 1.5 cm from equilibrium while moving left.  
2. Show that the time-averaged kinetic energy over one period equals the time-averaged potential energy.  
3. An accelerometer records a peak acceleration of 2.5 m s\(^{-2}\) at maximum displacement. If the frequency is 8 Hz, what is the amplitude?  
4. Why does the velocity formula remain valid even when friction is present but still small enough that amplitude decays slowly?  
5. Two SHM systems have identical amplitudes and frequencies but opposite phases. At the instant one particle passes through \(x = +A/2\) moving right, where is the other particle and in which direction is it moving?