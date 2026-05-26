## 1. The one-sentence answer
**In simple harmonic motion the speed at any displacement x is exactly v = ω√(A² − x²) because the motion is a projection of uniform circular motion and total energy is conserved.**

Position follows x = A cos(ωt + ϕ). Differentiating once with respect to time gives velocity; the trigonometric identity sin²θ + cos²θ = 1 then removes the time variable and produces the square-root expression. Acceleration follows from a second derivative and equals −ω²x, always directed toward the mean position. The formula therefore encodes both the kinematic constraint and the energy balance of the oscillator.

Aap dekh sakte hain ki jab particle extreme position par hota hai (x = ±A) to v = 0 hota hai, aur mean position par (x = 0) velocity maximum ωA hoti hai. Yeh result seedha energy se bhi nikal sakta hai: ½mv² + ½k x² = ½k A².

> [!NOTE]
> The single “aha” moment is that time disappears from the v-x relation; the oscillator’s speed depends only on how far it is from equilibrium, not on the clock.

## 2. Why this matters — concrete and current
In LIGO’s mirror suspensions, the velocity formula predicts the exact speed of 40 kg test masses at any point in their 0.4 Hz pendulum motion, allowing seismic isolation loops to be tuned so that residual velocity stays below 10^{-11} m s^{-1}.

SpaceX’s Falcon 9 first-stage grid fins use the same relation to model the oscillatory bending modes of the 70 m tall booster after landing; the ω√(A² − x²) term sets the peak structural loads that the carbon-fiber legs must survive.

In superconducting qubit readout, the mechanical resonance of a 5 GHz nanomechanical beam is monitored through its velocity-dependent Doppler shift; the expression lets engineers convert measured sideband amplitudes directly into displacement amplitude A without time-resolved sampling.

Gravitational-wave detectors and precision optomechanics both rely on this relation to convert observed photocurrent spectra into physical displacement spectra.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Derivative of cos and sin| To obtain v = dx/dt and a = dv/dt from x(t)               |
| Chain rule               | Required when differentiating √(A² − x²) or cos(ωt)       |
| Trigonometric identity sin²θ + cos²θ = 1 | Eliminates explicit time from the v-x relation     |
| Energy conservation (½kx² + ½mv² = constant) | Provides an independent route to the same formula |

Agar aap inme se koi bhi weak feel karte hain, to pause karke unhe pehle revise kar lijiye.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with the defining equation of SHM
Position is written as x(t) = A cos(ωt). Yeh equation already assumes restoring force F = −kx, jo Newton’s second law se differential equation x'' + ω²x = 0 deta hai.

Concrete example: mass-spring system jisme A = 0.1 m, ω = 2 rad s^{-1}. At t = 0, x = 0.1 m.

Formal statement:  
$$x(t)=A\cos(\omega t+\phi)$$

> [!WARNING]
> Agar aap sign of ϕ galat lete hain to velocity ka sign ulta aa sakta hai; direction matter karti hai.

### Step 2 — Differentiate once to obtain velocity
dx/dt = −Aω sin(ωt + ϕ). Iska matlab velocity amplitude Aω hai aur phase quadrature mein hai position ke saath.

Example: same numbers, t = π/(4ω), sin term = 1/√2, v = −0.141 m s^{-1}.

Formal:  
$$v(t)=-A\omega\sin(\omega t+\phi)$$

### Step 3 — Eliminate time using Pythagorean identity
Square and add:  
(v/(Aω))² + (x/A)² = 1  
⇒ v = ±ω√(A² − x²)

Example: x = 0.05 m, A = 0.1 m, ω = 2 ⇒ v = ±0.173 m s^{-1}. Sign direction par depend karta hai.

Formal:  
$$v=\pm\omega\sqrt{A^2-x^2}$$

> [!WARNING]
> Sign bhoolna common error hai; velocity direction decide karne ke liye hamesha velocity-time graph ya phase check karo.

### Step 4 — Differentiate velocity to reach acceleration
a = dv/dt = −Aω² cos(ωt + ϕ) = −ω²x. Acceleration mean position ki taraf hoti hai aur magnitude displacement ke proportional.

Formal:  
$$a=-\omega^2x$$

### Step 5 — Energy route (independent check)
Total energy E = ½kA² constant.  
½mv² + ½kx² = ½kA²  
v = ±ω√(A² − x²) (kyunki ω² = k/m). Dono methods same result dete hain.

### Step 6 — Textbook-grade statement
Velocity and acceleration in SHM are therefore  
$$v=\pm\omega\sqrt{A^2-x^2},\qquad a=-\omega^2x$$  
with the sign of v determined by the direction of motion.

## 5. Worked examples — har step show karo

**Example 1 — Maximum speed**  
*Given:* A = 5 cm, ω = 10 rad s^{-1}, x = 0.  
*Find:* v.  
Step: plug into formula → v = 10√(0.0025 − 0) = 0.5 m s^{-1}.  
*Why:* x = 0 par sqrt term maximum hota hai.  
**0.5 m s^{-1}**

*Reflection:* Sabse simple case; sign positive liya kyunki motion rightward maana.

**Example 2 — Speed at half amplitude**  
*Given:* A = 4 cm, ω = 5 rad s^{-1}, x = 2 cm.  
Step 1: A² − x² = 0.0016 − 0.0004 = 0.0012.  
Step 2: √0.0012 ≈ 0.03464.  
Step 3: v = 5 × 0.03464 = 0.1732 m s^{-1}.  
*Why:* x = A/2 par v = ωA√(3)/2 hota hai.  
**0.173 m s^{-1}**

*Reflection:* Numerical value check kiya identity se bhi.

**Example 3 — Find ω from observed speed**  
*Given:* A = 0.2 m, x = 0.1 m, v = 1.5 m s^{-1}.  
Step: 1.5 = ω√(0.04 − 0.01) ⇒ ω = 1.5/√0.03 ≈ 8.66 rad s^{-1}.  
*Why:* Square both sides to solve for ω.  
**ω ≈ 8.66 rad s^{-1}**

*Reflection:* Real experiment mein measured v se ω nikaalna common task hai.

**Example 4 — Acceleration at arbitrary point**  
*Given:* x = 3 cm, ω = 4 rad s^{-1}.  
a = −ω²x = −16 × 0.03 = −0.48 m s^{-2}.  
*Why:* Negative sign direction batata hai.  
**-0.48 m s^{-2}**

*Reflection:* Acceleration formula independent of velocity formula, lekin dono ek hi ω share karte hain.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting ± sign                 | Students treat v as scalar                  | Always state direction or use phase          |
| Writing v = ω(A − x)              | Linear approximation se confusion           | Square-root form yaad rakho                    |
| Using a = −ωx instead of −ω²x     | Dimensional mistake                         | Check units: ω²x has m s^{-2}                |
| Missing that ω = √(k/m)           | Energy route skip kar dete hain             | Dono derivations cross-check karo            |
| Confusing amplitude A with x      | Notation slip                               | A ko capital aur fixed rakhna seekho         |
| Ignoring that formula valid only for SHM | Over-generalisation                       | Condition F ∝ −x ya x'' + ω²x = 0 verify karo |

## 7. The textbook-precise statement
In one dimension, any particle whose position satisfies the differential equation  
$$\frac{d^2x}{dt^2}+\omega^2x=0$$  
possesses the first integral  
$$v=\pm\omega\sqrt{A^2-x^2},$$  
where A is fixed by initial conditions and the sign is chosen according to the sense of motion. Acceleration is obtained by further differentiation:  
$$a=-\omega^2x.$$  
(See AP French, *Vibrations and Waves*, 1st ed., §4-3.)

## 8. Visual — diagram or schematic
```
      v (up)
       ^
       |     . (A,0)   phase circle
       |    / \
       |   /   \
x<---- |  /     \ ---> x
       | /       \
       |/         \
       +-----------+---> t or θ
      (0,-ωA)     (0,ωA)
```
Horizontal axis displacement x, vertical axis velocity v. Curve is the ellipse v²/ω² + x² = A². Extreme points labelled.

## 9. The memory technique
1. **The hook** — Imagine a bicycle wheel rotating at constant ω; the shadow’s speed on the wall is exactly ω times the remaining “height” √(A² − x²).  
2. **What to overlearn** — v = ±ω√(A² − x²) and a = −ω²x (both signs and the square).  
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Agar formula bhool jaaye to x = A cos(ωt) se start karke do derivatives lo aur identity apply karo.

## 10. What this unlocks
Yeh result aapko energy methods, phase-space portraits, aur driven damped oscillators samajhne ke liye ready karta hai.

- Damped harmonic oscillator ka transient solution
- Resonance curves aur power absorption
- Small-angle pendulum aur physical pendulum periods
- Coupled oscillators ke normal modes

## 11. Self-check — five questions, no answers
1. A = 10 cm, ω = 20 rad s^{-1}, x = 6 cm par speed kitni hai?  
2. Velocity aur acceleration dono zero ho sakte hain kya? Kab?  
3. Agar aap x = A sin(ωt) use karte ho to v-x formula mein kya change aata hai?  
4. Ek student ne v = ω(A − x) likha. Unit check karke galti pakdo.  
5. Derive a = −ω²x starting from v = ω√(A² − x²) without using time.