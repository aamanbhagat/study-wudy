## 1. The one-sentence answer
**A spring-mass system executes simple harmonic motion about its equilibrium position with angular frequency \(\sqrt{k/m}\), whether the spring lies horizontally or hangs vertically.**

In the horizontal case the restoring force arises solely from the spring. Displacement from the unstretched length produces an acceleration proportional to that displacement and directed toward the origin, yielding sinusoidal position-versus-time behavior. The period depends only on mass and spring constant.

In the vertical case gravity shifts the equilibrium point downward by \(mg/k\), but the net restoring force for any additional displacement remains \(-k x\). Consequently the motion around the new equilibrium is identical to the horizontal case.

> [!NOTE]
> Gravity changes where the mass hangs still, yet it does not change the frequency or the mathematical form of the oscillation; the effective force constant is still \(k\).

## 2. Why this matters — concrete and current
Spacecraft reaction-wheel isolation platforms at JAXA and NASA use vertical spring-mass assemblies to decouple micro-vibrations from sensitive star trackers; the identical frequency formula derived here sets the mount stiffness so that wheel harmonics fall outside the control bandwidth.

Atomic-force-microscope cantilevers are modeled as vertical spring-mass systems; calibration routines at Bruker and Oxford Instruments extract the spring constant \(k\) from the measured thermal vibration spectrum using the equipartition result \(\frac12 k\langle x^2\rangle=\frac12 k_B T\).

Seismic isolation tables in LIGO’s vacuum chambers rest on maraging-steel blade springs whose vertical resonance is tuned below 1 Hz; the horizontal–vertical equivalence proven in this lesson lets engineers treat both degrees of freedom with the same transfer-function mathematics.

Molecular-dynamics packages such as GROMACS represent covalent bonds as Hookean springs; the normal-mode frequencies extracted from the Hessian matrix are precisely the \(\sqrt{k/m}\) values of the elementary spring-mass system, scaled to atomic masses.

Automotive valve-train design at Bosch employs vertical spring-mass models to predict surge resonances; the same equilibrium-shift analysis determines preload so that the valve never loses contact with the cam.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Newton’s second law  | Converts force balance into the differential equation of motion |
| Hooke’s law          | Supplies the linear restoring force \(-kx\)               |
| Equilibrium          | Identifies the point about which oscillation occurs       |
| Taylor expansion (first order) | Justifies why any smooth restoring force behaves like a spring near equilibrium |

## 4. Building the idea — from intuition to formalism

### Step 1 — Force from a stretched spring
A spring that is stretched or compressed by \(x\) exerts a force proportional to \(x\) and opposite in direction.  
Example: a spring with \(k=200\,\mathrm{N\,m^{-1}}\) stretched 0.05 m pushes back with 10 N.  
Formal statement:
\[
F=-kx.
\]
> [!WARNING]
> Reversing the sign turns the force into an amplifier instead of a restoring agent and produces exponential runaway rather than oscillation.

### Step 2 — Horizontal free-body diagram
Mount the spring on a frictionless horizontal track; attach mass \(m\). The only horizontal force is \(-kx\). Newton’s second law therefore reads
\[
m\ddot x=-kx.
\]
> [!WARNING]
> Omitting the minus sign here yields the wrong differential equation whose solutions grow instead of oscillate.

### Step 3 — Equation of motion and its solution
Rearrange to the standard harmonic-oscillator form
\[
\ddot x+\omega^2 x=0,\qquad\omega=\sqrt{k/m}.
\]
The general solution is
\[
x(t)=A\cos(\omega t+\phi).
\]
> [!WARNING]
> Treating \(\omega\) as \(k/m\) rather than its square root produces periods that are dimensionally inconsistent.

### Step 4 — Vertical free-body diagram at equilibrium
Hang the same spring and mass. At the new rest position the spring is stretched by \(\delta=mg/k\), so
\[
k\delta=mg.
\]
> [!WARNING]
> Forgetting to include gravity when writing the force balance leads to an incorrect equilibrium length and therefore an incorrect zero of potential.

### Step 5 — Displacement from the vertical equilibrium
Let \(y\) be measured downward from the new equilibrium. The net force is
\[
F=-k(y+\delta)+mg=-ky,
\]
because \(k\delta=mg\). The equation of motion is again
\[
m\ddot y=-ky,
\]
identical to the horizontal case.  
> [!WARNING]
> Measuring displacement from the unstretched end instead of from equilibrium mixes a constant term into the differential equation and destroys the pure sinusoidal solution.

### Step 6 — Period and frequency
Both geometries therefore share the same period
\[
T=2\pi\sqrt{m/k}.
\]
All subsequent dynamical quantities—velocity amplitude, energy partitioning—follow identically once this period is known.

## 5. Worked examples — every step shown

**Example 1 — Horizontal period**  
*Given:* \(m=0.5\,\mathrm{kg}\), \(k=50\,\mathrm{N\,m^{-1}}\).  
*Find:* oscillation period.  
\[
\omega=\sqrt{\frac{k}{m}}=\sqrt{\frac{50}{0.5}}=10\,\mathrm{rad\,s^{-1}}.
\]  
*Why:* direct substitution of the definition.  
\[
T=\frac{2\pi}{\omega}=0.628\,\mathrm{s}.
\]  
**0.628 s**  
*Reflection:* Only \(m\) and \(k\) appear; initial conditions affect amplitude but not period.

**Example 2 — Vertical equilibrium stretch**  
*Given:* same spring and mass, now vertical, \(g=9.8\,\mathrm{m\,s^{-2}}\).  
*Find:* stretch at equilibrium.  
\[
\delta=\frac{mg}{k}=\frac{0.5\times9.8}{50}=0.098\,\mathrm{m}.
\]  
**0.098 m**  
*Reflection:* Gravity sets the static offset; dynamic motion is measured from this offset.

**Example 3 — Amplitude after release from vertical stretch**  
*Given:* mass pulled additional 0.02 m below equilibrium and released.  
*Find:* maximum speed.  
Energy conservation:
\[
\frac12 kA^2=\frac12 mv_{\max}^2.
\]  
\[
v_{\max}=A\omega=0.02\times10=0.2\,\mathrm{m\,s^{-1}}.
\]  
**0.2 m s^{-1}**  
*Reflection:* The equilibrium shift cancels between kinetic and potential terms, leaving the same relation used horizontally.

**Example 4 — Effective mass on unknown spring**  
*Given:* vertical spring stretches 0.15 m under 1.2 kg; system then oscillates at 1.8 Hz.  
*Find:* implied \(g\).  
First
\[
k=\frac{1.2\times9.8}{0.15}=78.4\,\mathrm{N\,m^{-1}}.
\]  
*Why:* static equilibrium definition.  
Frequency check:
\[
f=\frac12\pi\sqrt{k/m}=1.29\,\mathrm{Hz}.
\]  
Discrepancy with stated 1.8 Hz signals either measurement error or additional effective mass.  
*Reflection:* Cross-validation between static and dynamic data exposes hidden variables.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using unstretched length as \(x=0\) in vertical case | Students forget gravity shifts equilibrium | Always redefine the origin at the static equilibrium before writing \(F=-kx\) |
| Writing \(\omega=k/m\) | Square-root omitted in haste | Memorize \(\omega^2=k/m\) first; take square root only at the end |
| Sign error in force law | Intuitive “force pushes back” translated with wrong coordinate direction | Fix coordinate axis, then apply \(F=-kx\) consistently |
| Treating period as amplitude-dependent | Confusion with nonlinear pendulums | Verify linearity of restoring force; period independent of amplitude only for Hookean springs |
| Ignoring that kinetic energy is measured relative to the moving equilibrium | Equilibrium itself is at rest, yet students subtract a fictitious velocity | Velocity is \(dy/dt\) where \(y\) is displacement from equilibrium; equilibrium velocity is zero |
| Confusing \(k\) with Young’s modulus | Different symbols in materials science | Keep \(k\) strictly as force per unit length for the macroscopic spring |
| Applying energy formulas before subtracting gravitational potential shift | Gravitational term appears to change total energy | Show explicitly that \(mg\delta\) is constant and drops out of \(\Delta U\) |

## 7. The textbook-precise statement
For a mass \(m\) attached to a massless spring of constant \(k\), the equation of motion about any equilibrium point is
\[
m\ddot x + kx = 0,
\]
provided the only forces are the spring force and a constant gravitational field. The general solution is
\[
x(t)=A\cos(\omega t+\phi),\qquad\omega=\sqrt{k/m}.
\]
The equilibrium condition itself is \(kx_{\mathrm{eq}}=mg\) (vertical) or \(x_{\mathrm{eq}}=0\) (horizontal). (Taylor, *Classical Mechanics*, 2005, §5.2.)

## 8. Visual — diagram or schematic
```text
Horizontal
Wall ----[spring k]----[mass m]--------> x
          unstretched length L0
          equilibrium at x=0

Vertical
 Ceiling ----[spring k]----[mass m]
                         |
                         v  y positive downward
Equilibrium: stretch δ = mg/k
Oscillation variable: y measured from this point
```

## 9. The memory technique
1. **The hook** — Picture the mass “surfing” on an invisible cosine wave whose wavelength is fixed by \(\sqrt{m/k}\); gravity merely moves the beach but leaves the wave unchanged.
2. **What to overlearn** — \(\omega=\sqrt{k/m}\), \(T=2\pi\sqrt{m/k}\), and the statement that vertical equilibrium shift does not alter \(\omega\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the force balance from Newton’s second law, locate equilibrium, then subtract the constant force; the linear term \(-kx\) remains.

## 10. What this unlocks
The horizontal–vertical equivalence supplies the prototype for every subsequent linear oscillator.  
- Small-angle pendulum  
- Physical pendulum and compound pendulum  
- LC-circuit isomorphism  
- Normal modes of coupled oscillators  
- Driven and damped harmonic oscillator (next phase)

## 11. Self-check — five questions, no answers
1. A 250 g mass stretches a vertical spring 4.0 cm at equilibrium. What is the oscillation period after a small additional displacement?  
2. Derive the effective spring constant of two identical springs attached end-to-end versus side-by-side for a horizontal mass.  
3. A student measures the period of a vertical spring-mass system, then tilts the entire apparatus 30° from vertical. Predict the new period without calculation.  
4. Show that the time-averaged kinetic and potential energies are equal for any amplitude in both geometries.  
5. A vertical spring-mass system is released from rest at twice the equilibrium stretch. At what fraction of the amplitude does the acceleration first reach its maximum value?