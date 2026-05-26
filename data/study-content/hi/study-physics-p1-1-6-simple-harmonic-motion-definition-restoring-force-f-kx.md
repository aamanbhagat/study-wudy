## 1. The one-sentence answer
**Simple harmonic motion** is the motion that occurs when a restoring force exactly equal to \(F = -kx\) acts on a body, producing sinusoidal oscillation about an equilibrium point.

Iska matlab yeh hai ki jab koi object equilibrium position se displace hota hai, to uspe ek force lagta hai jo usey wapas khinchta hai, aur yeh force displacement ke directly proportional hota hai lekin opposite direction mein. Is force law ki wajah se acceleration bhi displacement ke proportional hoti hai, jo differential equation \(\frac{d^2x}{dt^2} + \omega^2 x = 0\) ki taraf le jaati hai. Solution hamesha \(x(t) = A \cos(\omega t + \phi)\) ya equivalent sine form mein aata hai.

Aap is force law ko samajh lijiye to oscillations ke almost saare real cases (springs, pendulums at small angles, molecular vibrations) ek hi mathematical framework mein aa jaate hain.

> [!NOTE]
> The single deepest insight is that the negative sign in \(F = -kx\) guarantees the force always points toward equilibrium; without it the motion would be exponential runaway, not oscillation.

## 2. Why this matters — concrete and current
SpaceX uses linear spring-mass models based on \(F = -kx\) to damp pogo oscillations in Falcon 9 propellant feed lines; the same differential equation appears in their flight software to predict thrust oscillation frequencies.

In LIGO’s seismic isolation platforms, fused-silica blades obey Hooke’s law at the heart of the quadruple pendulum suspension; any deviation from linear \(F = -kx\) would inject noise into the 10^{-19} m strain measurement.

Semiconductor lithography scanners from ASML employ voice-coil actuators whose force is deliberately kept in the linear regime \(F = -kx\) so that the reticle stage executes pure harmonic trajectories at kilohertz scan frequencies without harmonic distortion.

Molecular dynamics packages such as GROMACS model covalent bonds as harmonic springs with \(F = -kx\); the resulting vibrational frequencies match infrared spectra only when the constant \(k\) is extracted from the curvature of the ab-initio potential at equilibrium.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Newton’s second law  | Converts force law into acceleration: \(F = ma\)          |
| Derivative           | Defines instantaneous velocity and acceleration           |
| Linear differential equations | The equation \(\ddot{x} + \omega^2 x = 0\) must be solved |

If any of these three ideas feel shaky, pause and review them first; otherwise the algebra in later steps will not click.

## 4. Building the idea — from intuition to formalism

### Step 1 — Equilibrium and displacement
Equilibrium tab hota hai jab net force zero ho. Jab aap object ko thoda hatate ho, displacement \(x\) ban jaata hai.  
Example: ek spring natural length par hang kiya hai; mass lagane ke baad naya equilibrium mil jaata hai.  
Formal: \(x = 0\) at equilibrium.  
> [!WARNING] Agar aap equilibrium ko galat define karoge to \(x\) ka zero point shift ho jaayega aur pura \(F = -kx\) equation galat ho jaayega.

### Step 2 — Restoring force direction
Force hamesha wapas equilibrium ki taraf hona chahiye. Isliye negative sign lagta hai.  
Example: agar \(x > 0\) (right side), force left taraf hona chahiye, yani negative.  
Formal: \(F_x = -kx\).  
> [!WARNING] Positive sign laga doge to force aur door le jaayega aur motion unstable ho jaayegi.

### Step 3 — Link to acceleration
Newton’s law lagao: \(ma = -kx\).  
Example: mass 0.5 kg, \(k = 200\) N/m, \(x = 0.1\) m → \(a = -40\) m/s².  
Formal: \(m \ddot{x} + kx = 0\).  
> [!WARNING] Mass ko zero maan liya to equation hi collapse ho jaati hai; finite mass zaroori hai.

### Step 4 — Angular frequency definition
\(\omega^2 = k/m\) define karte hain.  
Example: upar wale numbers se \(\omega = 20\) rad/s.  
Formal: \(\ddot{x} + \omega^2 x = 0\).  
> [!WARNING] \(\omega\) ko frequency \(f\) se confuse mat karna; \(\omega = 2\pi f\).

### Step 5 — General solution
Differential equation ka solution \(x(t) = A\cos(\omega t + \phi)\) hota hai.  
Formal: \(x(t) = A\cos(\omega t + \phi)\), with \(A, \phi\) set by initial conditions.  
> [!WARNING] Agar initial velocity zero na ho to phase \(\phi\) zero mat maan lena.

## 5. Worked examples — har step show karo

**Example 1 — Horizontal spring, release from rest**  
*Given:* \(m = 0.2\) kg, \(k = 50\) N/m, \(x(0) = 0.05\) m, \(v(0) = 0\).  
*Find:* position at \(t = 0.1\) s.  
Step 1: \(\omega = \sqrt{k/m} = \sqrt{250} \approx 15.81\) rad/s.  
*Why:* \(\omega\) nikaalna zaroori hai kyunki yeh time dependence decide karta hai.  
Step 2: \(\phi = 0\) kyunki velocity zero hai.  
*Why:* cosine maximum par shuru hoti hai jab phase zero.  
Step 3: \(x(0.1) = 0.05\cos(15.81 \times 0.1)\).  
**Final answer**  
\(x(0.1) \approx 0.0387\) m.  
*Reflection:* Simple release case; generalises directly to any initial displacement with zero velocity.

**Example 2 — Vertical spring, initial push**  
*Given:* \(m = 0.5\) kg, \(k = 200\) N/m, equilibrium already shifted, \(x(0) = 0\), \(v(0) = 1.2\) m/s downward.  
*Find:* amplitude.  
Step 1: \(\omega = 20\) rad/s.  
*Why:* amplitude energy se nikalti hai, velocity maximum par amplitude \(\times\omega\) hoti hai.  
Step 2: \(A = v_{\max}/\omega = 1.2/20 = 0.06\) m.  
**Final answer**  
\(A = 0.06\) m.  
*Reflection:* Vertical case reduces to horizontal once equilibrium shift is absorbed into coordinate.

**Example 3 — Find time to reach half amplitude**  
*Given:* same parameters as Example 1.  
*Find:* smallest \(t > 0\) where \(|x| = 0.025\) m.  
Step 1: \(0.025 = 0.05\cos(\omega t)\).  
*Why:* divide both sides by amplitude to get cosine argument.  
Step 2: \(\omega t = \pi/3\), \(t = \pi/(3\omega) \approx 0.066\) s.  
**Final answer**  
\(t \approx 0.066\) s.  
*Reflection:* Shows phase angle directly gives timing information.

**Example 4 — Energy check**  
*Given:* \(A = 0.05\) m, \(k = 50\) N/m.  
*Find:* total energy.  
Step 1: \(E = \frac12 k A^2\).  
*Why:* maximum potential energy equals total energy in SHM.  
Step 2: \(E = 0.5 \times 50 \times (0.05)^2 = 0.0625\) J.  
**Final answer**  
\(E = 0.0625\) J.  
*Reflection:* Energy route often faster than solving differential equation when only amplitude is asked.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                                      |
|-------------------------------------|---------------------------------------------|------------------------------------------------------|
| Forgetting the minus sign           | Students think “force proportional to x”    | Always draw displacement arrow and force arrow      |
| Using \(x\) from unstretched end    | Equilibrium shift ignored                   | Redefine origin at new equilibrium before writing equation |
| Confusing \(\omega\) with \(f\)     | Both called “frequency” in casual talk      | Write units: rad/s vs Hz                             |
| Assuming motion stops at equilibrium| Intuition from damped systems               | Check velocity is maximum at \(x=0\)                 |
| Taking \(k\) negative               | Sign error in Hooke’s law                   | Verify \(k\) from slope of \(F\) vs \(x\) graph      |
| Ignoring that solution is only for small \(x\) | Real springs become nonlinear at large stretch | State the linearity assumption explicitly            |

## 7. The textbook-precise statement
A system executes simple harmonic motion if and only if the force acting on the particle is of the form \(F_x = -kx\) where \(k > 0\) is constant. Under this force law Newton’s second law yields the linear homogeneous differential equation
\[
m\frac{d^2x}{dt^2} + kx = 0,
\]
whose general solution on the real line is
\[
x(t) = A\cos(\omega t + \phi),\qquad\omega = \sqrt{k/m},
\]
provided the motion remains within the linear regime of the restoring force. (Taylor, *Classical Mechanics*, 2005, §5.1)

## 8. Visual — diagram or schematic
```
x-axis: equilibrium at 0
       |<-- A -->|
      /|\       /|\
     / | \     / | \
    /  |  \   /  |  \
   /   |   \ /   |   \
--|----|----|----|----|--> t
  -T/4  0   T/4  T/2
Position x(t) = A cos(ωt) starts at +A, crosses zero with max speed, reaches -A.
Force arrow always points toward x=0 and length proportional to |x|.
```

## 9. The memory technique

1. **The hook** — Picture a rubber band tied to a fixed wall and your finger; the harder you pull away, the harder it yanks back — exactly the negative sign.
2. **What to overlearn** — \(F = -kx\), \(\omega = \sqrt{k/m}\), \(x(t) = A\cos(\omega t + \phi)\).
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from Newton’s law, substitute \(F = -kx\), divide by \(m\) to reach \(\ddot{x} + \omega^2 x = 0\), guess sinusoidal solution and verify.

## 10. What this unlocks
Once you own \(F = -kx\) you can immediately analyse small-amplitude pendulum motion, LC-circuit oscillations, and normal modes of coupled oscillators.

- Linearised pendulum equation \(\ddot{\theta} + (g/l)\theta = 0\)
- Energy methods for amplitude-period independence
- Superposition principle for driven and damped cases
- Normal-mode analysis in multi-mass systems

## 11. Self-check — five questions, no answers
1. A 300 g mass stretches a spring 4 cm at equilibrium. If displaced 2 cm further and released, what is the period?
2. Show that average kinetic energy equals average potential energy over one period in SHM.
3. A student writes \(F = +kx\); what qualitative behaviour does the resulting equation predict and why is it unphysical for a spring?
4. Given \(x(t) = 0.1\cos(10t + \pi/6)\), find velocity at the instant when displacement is zero.
5. Two springs of constants \(k\) and \(2k\) are attached in series to a mass \(m\); derive the new angular frequency.