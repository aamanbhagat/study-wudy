## 1. The one-sentence answer
**Damped oscillations occur when a restoring force and a velocity-dependent friction term act together on a mass, so the motion is governed by the linear differential equation \( m \ddot{x} + b \dot{x} + k x = 0 \); the three regimes (underdamped, critically damped, overdamped) are fixed by the sign of the discriminant \( b^2 - 4mk \).**

The equation is the same second-order linear ODE you already know from simple harmonic motion, except the first-derivative term \( b \dot{x} \) now removes energy. Because the ODE is linear and has constant coefficients, its solutions are completely determined by the roots of the characteristic equation \( m r^2 + b r + k = 0 \). Those roots are real and distinct, real and repeated, or complex conjugates according to whether \( b^2 - 4mk \) is positive, zero, or negative; each case produces a qualitatively different time history.

The three regimes therefore label three different ways a system can return to equilibrium after being displaced: it can ring while slowly losing amplitude, it can return in the shortest possible time without ever crossing equilibrium, or it can creep back without oscillating at all.

> [!NOTE]
> The single number that decides the entire qualitative behaviour is the dimensionless damping ratio \( \zeta = b / (2\sqrt{mk}) \); once you know whether \( \zeta < 1 \), \( \zeta = 1 \) or \( \zeta > 1 \), you already know which functional form the solution must take.

## 2. Why this matters — concrete and current
In automotive active suspension systems, magnetorheological dampers are tuned so that each wheel is close to critical damping; this choice is made by Bose and by Mercedes-Benz so that a 1500 kg car returns to ride height in roughly 50 ms after a pothole without the tyre losing contact.  

LIGO’s 40 kg fused-silica test masses are suspended as underdamped pendulums with \( \zeta \approx 10^{-7} \); the ring-down time is deliberately kept longer than 100 s so that thermal noise does not mask the 10^{-19} m gravitational-wave strain.  

In the Falcon 9 first-stage recovery, the grid-fin hydraulic actuators are overdamped so that any commanded deflection reaches its set-point monotonically; an underdamped fin would oscillate and could produce a divergent roll moment during re-entry.  

Semiconductor steppers manufactured by ASML use critically damped piezo stages to move a 300 mm wafer; any overshoot would misalign the 13.5 nm EUV pattern by more than the allowed 1 nm overlay budget.  

Seismic isolation tables in the Virgo interferometer combine an underdamped pneumatic spring (low-frequency isolation) with an overdamped voice-coil damper (high-frequency roll-off) so that the residual motion at 10 Hz stays below 10^{-13} m/√Hz.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Simple-harmonic motion   | Supplies the restoring term \( -kx \) and the natural frequency \( \omega_0 \) |
| Linear homogeneous ODEs with constant coefficients | The entire solution procedure rests on the characteristic equation |
| Exponential and trigonometric identities | Final expressions for underdamped motion combine both      |

If any row is unfamiliar, pause and review that concept first; the rest of the lesson assumes these three.

## 4. Building the idea — from intuition to formalism

### Step 1 — Add friction to the harmonic oscillator
Friction that is proportional to velocity removes energy at a rate \( b v^2 \). The force balance therefore becomes \( m \ddot{x} = -kx - b \dot{x} \).  
Concrete example: a 200 g mass on a 50 N m^{-1} spring inside thick silicone oil feels an extra drag force of roughly 2 N when moving at 0.1 m s^{-1}.  
Formal statement:  
$$ m \ddot{x} + b \dot{x} + k x = 0. $$  
> [!WARNING]
> If you forget the sign of the damping term you will obtain exponentially growing solutions that violate energy conservation.

### Step 2 — Form the characteristic equation
Assume a trial solution \( x = e^{rt} \). Substituting yields the algebraic equation \( m r^2 + b r + k = 0 \).  
The two roots are  
$$ r_{\pm} = \frac{-b \pm \sqrt{b^2 - 4mk}}{2m}. $$  
> [!WARNING]
> Treating the square root as always real will hide the oscillatory solutions that appear when the argument is negative.

### Step 3 — Classify the roots by the discriminant
Define \( \Delta = b^2 - 4mk \).  
- \( \Delta < 0 \) → complex roots → underdamped  
- \( \Delta = 0 \) → repeated real root → critically damped  
- \( \Delta > 0 \) → two distinct real roots → overdamped  

### Step 4 — Write the general solution for each case
Underdamped (\( \zeta < 1 \)):  
$$ x(t) = e^{-\gamma t} (A \cos \omega_d t + B \sin \omega_d t), \quad \gamma = b/(2m),\quad \omega_d = \sqrt{\omega_0^2 - \gamma^2}. $$  
Critically damped (\( \zeta = 1 \)):  
$$ x(t) = (A + B t) e^{-\gamma t}. $$  
Overdamped (\( \zeta > 1 \)):  
$$ x(t) = A e^{r_+ t} + B e^{r_- t}, \quad r_\pm = -\gamma \pm \sqrt{\gamma^2 - \omega_0^2}. $$  

### Step 5 — Apply initial conditions to fix A and B
Because each solution contains two arbitrary constants, any pair \( (x(0), \dot{x}(0)) \) determines a unique motion. This step is purely algebraic and identical for all three regimes.

## 5. Worked examples — har step show karo

**Example 1 — Underdamped decay**  
*Given:* \( m = 1 \) kg, \( k = 100 \) N m^{-1}, \( b = 2 \) kg s^{-1}, \( x(0) = 0.1 \) m, \( \dot{x}(0) = 0 \).  
*Find:* \( x(t) \).  
Step 1: \( \omega_0 = 10 \) rad s^{-1}, \( \gamma = 1 \) s^{-1}.  
Step 2: \( \Delta = 4 - 400 = -396 < 0 \), therefore underdamped.  
Step 3: \( \omega_d = \sqrt{100 - 1} \approx 9.95 \) rad s^{-1}.  
Step 4: \( x(t) = e^{-t} (A \cos 9.95 t + B \sin 9.95 t) \).  
Step 5: \( x(0) = A = 0.1 \); \( \dot{x}(0) = -A + 9.95 B = 0 \) gives \( B \approx 0.01005 \).  
**Final answer**  
$$ x(t) = e^{-t} (0.1 \cos 9.95 t + 0.01005 \sin 9.95 t). $$  
*Reflection:* The envelope \( e^{-t} \) is fixed solely by \( \gamma \); the frequency shift is only 0.5 % because damping is light.

**Example 2 — Critical damping**  
*Given:* same \( m,k \) but \( b = 20 \) kg s^{-1}.  
*Find:* \( x(t) \) for same initial conditions.  
Step 1: \( \gamma = 10 \) s^{-1}, \( \Delta = 0 \).  
Step 2: \( x(t) = (A + Bt) e^{-10 t} \).  
Step 3: \( A = 0.1 \), \( -10 A + B = 0 \) → \( B = 1 \).  
**Final answer**  
$$ x(t) = (0.1 + t) e^{-10 t}. $$  
*Reflection:* The linear factor \( t \) appears only when roots coincide; it still decays because the exponential wins.

**Example 3 — Overdamped return**  
*Given:* \( b = 40 \) kg s^{-1}.  
*Find:* \( x(t) \).  
Step 1: \( r_\pm = -20 \pm \sqrt{400 - 100} = -20 \pm \sqrt{300} \approx -20 \pm 17.32 \).  
Step 2: \( x(t) = A e^{-2.68 t} + B e^{-37.32 t} \).  
Step 3: \( A + B = 0.1 \), \( -2.68 A - 37.32 B = 0 \) → \( A \approx 0.1077 \), \( B \approx -0.0077 \).  
**Final answer**  
$$ x(t) \approx 0.1077 e^{-2.68 t} - 0.0077 e^{-37.32 t}. $$  
*Reflection:* The fast transient vanishes in < 0.1 s; the slow pole governs the final approach.

**Example 4 — Compare settling times**  
Using the three solutions above, compute the time when \( |x(t)| \) first drops below 1 % of its initial value. Underdamped: ~4.6 s (after several oscillations); critically damped: 0.51 s; overdamped: 1.7 s. Critical damping is fastest without overshoot.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Writing \( \omega_d = \omega_0 \) when \( \zeta > 0 \) | Forgetting that damping lowers frequency    | Always compute \( \sqrt{\omega_0^2 - \gamma^2} \) |
| Treating critical damping as “no motion” | Misreading the repeated-root solution       | Remember the \( t e^{-\gamma t} \) term      |
| Sign error in \( \gamma \)        | Confusing force direction                   | Check that energy \( \frac12 m v^2 + \frac12 k x^2 \) decreases |
| Using \( \zeta > 1 \) formula for underdamped initial conditions | Copy-paste from previous problem            | Re-classify \( \Delta \) before writing x(t) |
| Ignoring units of b               | b has units kg s^{-1}                       | Verify \( b / 2m \) has units of frequency   |

## 7. The textbook-precise statement
Taylor, *Classical Mechanics*, 1e, §5.6 states:  
“Let the equation of motion be \( \ddot{x} + 2\beta \dot{x} + \omega_0^2 x = 0 \). The nature of the solution is determined by the dimensionless parameter \( \beta / \omega_0 \). If \( \beta < \omega_0 \) the motion is underdamped and the solution is \( x(t) = A e^{-\beta t} \cos(\omega_1 t - \phi) \) with \( \omega_1 = \sqrt{\omega_0^2 - \beta^2} \). If \( \beta = \omega_0 \) the motion is critically damped and \( x(t) = (A + Bt) e^{-\beta t} \). If \( \beta > \omega_0 \) the motion is overdamped and \( x(t) = A e^{r_1 t} + B e^{r_2 t} \) where \( r_{1,2} = -\beta \pm \sqrt{\beta^2 - \omega_0^2} \).”

## 8. Visual — diagram or schematic
```
x(t)
 ^   underdamped: decaying sinusoid
 |  /\   /\   /\   /\
 | /  \ /  \ /  \ /  \
 |/    V    V    V    \____ envelope e^{-γt}
 |
 |  critically damped: (A+Bt)e^{-γt}  (fastest monotonic)
 |   overdamped: sum of two decaying exponentials (slower monotonic)
 +--------------------------------------→ t
```

## 9. The memory technique
1. **The hook** — Picture a door closer: underdamped = door slams and bounces; critically damped = door shuts smoothly in one motion; overdamped = door creeps shut like molasses.  
2. **What to overlearn** — The three conditions on \( \zeta = b/(2\sqrt{mk}) \); the three functional forms; the fact that critical damping gives the shortest return time without overshoot.  
3. **Spaced-repetition schedule** — Review the discriminant table after 1 day, solve one example after 3 days, derive the underdamped frequency after 7 days, teach the three regimes to someone else after 16 days, and re-derive the energy-loss argument after 35 days.  
4. **First-principles fallback** — Start from \( m \ddot{x} + b \dot{x} + k x = 0 \), form the characteristic equation, evaluate the sign of \( b^2 - 4mk \), and write the corresponding basis functions.

## 10. What this unlocks
Damped-oscillator solutions are the building blocks for every linear driven system that follows.  
- Resonance curves with finite width appear only after damping is introduced.  
- Coupled oscillators with damping produce normal-mode decay rates used in vibration absorbers.  
- Wave equations on a string with air resistance or on a transmission line with resistance both reduce locally to the same damped-oscillator ODE.  
- Control-theory root-locus plots are drawn directly from the same characteristic equation.

## 11. Self-check — five questions, no answers
1. For \( m = 0.5 \) kg, \( k = 200 \) N m^{-1}, what value of \( b \) produces critical damping?  
2. A lightly damped oscillator has amplitude that drops by a factor of e after 50 cycles; estimate \( \zeta \).  
3. Why does the overdamped solution never cross the equilibrium line more than once?  
4. Show that the critically damped solution can be obtained as the limit of the underdamped solution when \( \omega_d \to 0 \).  
5. In the expression \( x(t) = e^{-\gamma t}(A\cos\omega_d t + B\sin\omega_d t) \), which term supplies the phase shift when initial velocity is non-zero?