## 1. The one-sentence answer
**Forced oscillations occur when a periodic external force oscillating at driving frequency \(\omega_d\) is applied to a damped harmonic oscillator, so that after transients decay the system vibrates exactly at \(\omega_d\) with amplitude and phase fixed by the mismatch between \(\omega_d\) and the natural frequency \(\omega_0\).**

An undriven oscillator rings at its own natural frequency set by mass and stiffness. When an external force repeatedly pushes and pulls at a chosen rate \(\omega_d\), the system eventually forgets its own frequency and locks to the driving rate. The size of the resulting motion grows or shrinks according to how close \(\omega_d\) lies to \(\omega_0\); at exact match the amplitude peaks and the displacement lags the force by 90°.

The driving frequency therefore acts as an external clock that dictates both the rhythm and the steady-state energy of the motion. Changing \(\omega_d\) while keeping everything else fixed sweeps the system through regimes of small response, resonant build-up, and again small response.

> [!NOTE]
> The oscillator does not choose its frequency; the driver does. Resonance is simply the frequency at which the driver can most efficiently feed energy into the system before damping removes it.

## 2. Why this matters — concrete and current
In liquid-propellant rocket engines, the combustion chamber and feed lines form acoustic cavities whose natural frequencies must be detuned from the driving frequencies produced by injector or pump pulsations; SpaceX’s Merlin engines use tuned cavities and baffles precisely to keep driving frequencies away from the 1–5 kHz band where pressure oscillations grow exponentially.

Seismic isolation tables in LIGO gravitational-wave detectors are actively driven at frequencies between 0.1 Hz and 10 Hz by voice-coil actuators; control engineers deliberately place the driving frequency well below the table’s suspension resonance so that the optical platform remains inertial while the ground moves.

In semiconductor lithography, piezo-driven wafer stages execute repetitive scans at frequencies up to several hundred hertz; the stage servo must avoid the structural resonances of the lens column, which would otherwise imprint periodic placement errors on every die.

Bridge cables and aircraft wings experience vortex-induced vibrations whose driving frequency is set by wind speed; the Tacoma Narrows and modern cable-stayed bridges incorporate tuned mass dampers whose natural frequencies are deliberately offset from the expected vortex-shedding frequencies.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Simple harmonic motion   | Supplies the restoring force \(-kx\) and natural frequency \(\omega_0 = \sqrt{k/m}\). |
| Linear damping force \(-b v\) | Introduces energy loss that prevents infinite amplitude at resonance. |
| First-order linear ODEs  | The driven damped oscillator is solved by converting Newton’s law into a non-homogeneous linear ODE whose particular solution oscillates at \(\omega_d\). |

## 4. Building the idea — from intuition to formalism

### Step 1 — External force imposes its own rhythm
A mass on a spring left alone oscillates at \(\omega_0\). An external force \(F(t) = F_0 \cos(\omega_d t)\) repeatedly injects momentum at a rate chosen by the experimenter. After any initial transient dies, the mass must move at exactly \(\omega_d\); otherwise the force and displacement would steadily drift out of phase and no steady energy balance could exist.

Concrete example: push a child on a swing once per second; after a few cycles the swing returns to you once per second regardless of its natural period.

Formal statement: the steady-state solution must be of the form \(x(t) = A \cos(\omega_d t + \phi)\).

> [!WARNING]
> Assuming the long-term motion occurs at \(\omega_0\) instead of \(\omega_d\) produces a solution that fails to satisfy the differential equation for all future time.

### Step 2 — Write Newton’s second law with the driving term
Include inertia, damping, restoring force and external drive:
\[
m \ddot{x} + b \dot{x} + k x = F_0 \cos(\omega_d t).
\]
Divide by \(m\):
\[
\ddot{x} + 2\beta \dot{x} + \omega_0^2 x = \frac{F_0}{m} \cos(\omega_d t),
\]
where \(\beta = b/(2m)\) and \(\omega_0^2 = k/m\).

> [!WARNING]
> Omitting the damping term makes the amplitude diverge at \(\omega_d = \omega_0\), contradicting every laboratory observation.

### Step 3 — Assume a particular solution at the driving frequency
Because the right-hand side is sinusoidal at \(\omega_d\), seek a particular solution
\[
x_p(t) = D \cos(\omega_d t) + E \sin(\omega_d t).
\]
Substitute into the ODE, collect coefficients of \(\cos(\omega_d t)\) and \(\sin(\omega_d t)\), and solve the resulting 2×2 algebraic system for \(D\) and \(E\).

### Step 4 — Express amplitude and phase
The steady-state amplitude is
\[
A(\omega_d) = \frac{F_0/m}{\sqrt{(\omega_0^2 - \omega_d^2)^2 + (2\beta\omega_d)^2}},
\]
and the phase lag \(\delta\) obeys
\[
\tan\delta = \frac{2\beta\omega_d}{\omega_0^2 - \omega_d^2}.
\]
Both expressions are obtained by converting \(D\) and \(E\) to polar form.

> [!WARNING]
> Using \(\omega_d\) in the numerator instead of \(\omega_0\) inverts the low-frequency limit and yields an incorrect static displacement.

### Step 5 — Identify resonance conditions
Maximum amplitude occurs at
\[
\omega_d = \sqrt{\omega_0^2 - 2\beta^2}
\]
(velocity resonance at exactly \(\omega_d = \omega_0\)). The phase passes through 90° at \(\omega_d = \omega_0\).

This is the textbook result for a linearly driven, damped harmonic oscillator.

## 5. Worked examples — every step shown

**Example 1 — Static limit**  
*Given:* \(m = 1\) kg, \(k = 100\) N m\(^{-1}\), \(b = 0\), \(F_0 = 10\) N, \(\omega_d \to 0\).  
*Find:* steady-state displacement.  

Newton’s law reduces to \(kx = F_0\).  
*Why:* all time derivatives vanish.  
Thus \(x = F_0/k = 0.1\) m.  
**Final answer: 0.1 m**  
*Reflection:* At vanishing drive frequency the system behaves like a spring scale; damping is irrelevant.

**Example 2 — Undamped resonance**  
*Given:* same parameters, \(\omega_d = 10\) rad s\(^{-1}\), \(b = 0\).  
*Find:* amplitude after long time.  

The denominator vanishes, so amplitude grows linearly with time: \(x(t) = (F_0/(2m\omega_0))t\sin(\omega_0 t)\).  
*Why:* energy is continuously added with no removal mechanism.  
**Final answer: unbounded linear growth**  
*Reflection:* Real systems always possess some damping; the ideal undamped case is a mathematical warning flag.

**Example 3 — Phase at resonance**  
*Given:* \(\omega_d = \omega_0\), finite \(\beta\).  
*Find:* phase difference.  

Substitute into the tangent expression: \(\tan\delta = \infty\), hence \(\delta = 90^\circ\).  
*Why:* the velocity is then in phase with the force, maximising power transfer.  
**Final answer: 90° lag**  
*Reflection:* Displacement quadrature with force is the universal signature of resonance in second-order systems.

**Example 4 — High-frequency roll-off**  
*Given:* \(\omega_d \gg \omega_0\), arbitrary damping.  
*Find:* asymptotic amplitude.  

\(A \approx F_0/(m\omega_d^2)\).  
*Why:* inertia dominates; the mass barely moves before the force reverses.  
**Final answer: \(A \propto 1/\omega_d^2\)**  
*Reflection:* The \(1/\omega_d^2\) decay is geometry-independent and appears in every driven oscillator from MEMS to galactic disks.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Confusing transient frequency with driving frequency | Initial conditions excite the homogeneous solution at \(\omega_0\). | Wait several damping times \(1/\beta\) before measuring frequency. |
| Placing resonance at \(\omega_d = \omega_0\) for amplitude | The exact maximum shifts by \(\sqrt{\omega_0^2 - 2\beta^2}\). | Use the full amplitude formula rather than the undamped mnemonic. |
| Forgetting that phase is frequency-dependent | Students treat phase as constant. | Plot or derive \(\delta(\omega_d)\) before numerical work. |
| Using peak velocity instead of peak displacement for power | Power is \(F\cdot v\); maximum power occurs at velocity resonance. | Distinguish amplitude resonance from power resonance explicitly. |
| Ignoring that \(\omega_d\) appears in both numerator and denominator of the ODE | Algebraic slips when dividing by \(m\). | Always non-dimensionalise first: divide the entire equation by \(m\). |
| Assuming the steady state exists for \(\beta = 0\) and \(\omega_d = \omega_0\) | The particular solution becomes secular. | Add infinitesimal damping or switch to the growing solution. |
| Sign error in the phase lag definition | Cosine versus sine driving term conventions differ. | Fix the driving term as \(\cos(\omega_d t)\) and keep the lag positive by definition. |

## 7. The textbook-precise statement
For the driven damped harmonic oscillator
\[
m\ddot{x}+b\dot{x}+kx=F_0\cos(\omega_d t),
\]
with \(\beta=b/(2m)>0\), every solution approaches the unique periodic particular solution
\[
x(t)=A(\omega_d)\cos(\omega_d t-\delta(\omega_d))
\]
where
\[
A(\omega_d)=\frac{F_0/m}{\sqrt{(\omega_0^2-\omega_d^2)^2+(2\beta\omega_d)^2}},\qquad\tan\delta=\frac{2\beta\omega_d}{\omega_0^2-\omega_d^2},
\]
and \(\delta\) lies between 0 and \(\pi\). (Taylor, *Classical Mechanics*, 2005, §5.6.)

## 8. Visual — diagram or schematic
```text
          Force F₀ cos(ω_d t)
                │
                ▼
   ┌────────────┴────────────┐
   │          mass m         │
   │   x(t) = A cos(ω_d t - δ)│
   └────────────┬────────────┘
                │
     spring k   │   damper b
     ─/\/\/\/   │   ───/\/\/──
                │
               ═══ ground
ω_d → 0          ω_d = ω₀          ω_d → ∞
A ≈ F₀/k       A maximum        A ≈ F₀/(m ω_d²)
δ ≈ 0°         δ = 90°          δ ≈ 180°
```

## 9. The memory technique

1. **The hook** — picture a swing being pushed by a metronome; the metronome sets the only rhythm that survives after friction has erased the swing’s memory.  
2. **What to overlearn** — the amplitude denominator \((\omega_0^2 - \omega_d^2)^2 + (2\beta\omega_d)^2\) and the fact that steady-state frequency equals \(\omega_d\) exactly.  
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — begin from \(F=ma\), insert \(F_\text{drive}\), assume \(x_p \propto \cos(\omega_d t - \delta)\), equate coefficients.

## 10. What this unlocks
Mastery of driving frequency lets you analyse any linear system whose input is periodic: vibration isolation, phase-locked loops, AC circuits, and parametric amplifiers.  

- Next: resonance curves and quality factor \(Q\).  
- Next: coupled driven oscillators and normal-mode splitting.  
- Next: Fourier decomposition of arbitrary periodic drives.  
- Next: control-theory transfer functions \(H(i\omega_d)\).

## 11. Self-check — five questions, no answers
1. A swing with natural period 2 s is driven at exactly 2 s; after transients die, what is the period of the motion?  
2. Write the steady-state displacement for \(F(t)=F_0\sin(\omega_d t)\) and show that its amplitude is identical to the cosine-drive case.  
3. At what driving frequency is the average power delivered by the force maximum? Derive it from \(P=Fv\).  
4. If damping \(\beta\) is doubled while \(F_0\) and \(\omega_d\) are held fixed, does the amplitude at resonance halve? Explain quantitatively.  
5. A structure has an unwanted resonance at 50 Hz. You may change either mass or stiffness by 10 %. Which change moves the resonance farther from a 60 Hz driving line, and why?