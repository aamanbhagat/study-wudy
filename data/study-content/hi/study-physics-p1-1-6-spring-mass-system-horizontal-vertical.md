## 1. The one-sentence answer

**A spring-mass system is a mass attached to a spring that executes simple harmonic motion when displaced from equilibrium, with identical frequency in both horizontal and vertical orientations once the vertical equilibrium shift is accounted for.**

Horizontal setup mein spring ek frictionless surface par mass ko hold karti hai. Jab aap mass ko thoda stretch ya compress karte ho, restoring force seedha displacement ke opposite direction mein kaam karti hai, isliye acceleration proportional hota hai −x ke. Vertical case mein gravity ek constant force add karti hai jo sirf equilibrium position ko nayi jagah shift karti hai; oscillation frequency waahi rehti hai kyunki net restoring force ab bhi −kx jaisi hoti hai naye equilibrium ke around.

Aap dekhoge ki dono cases mein equation of motion ek hi form ki hoti hai: \( m \ddot{x} = -kx \). Isliye period \( T = 2\pi\sqrt{m/k} \) dono mein same nikalta hai.

> [!NOTE]
> Sabse badi aha yeh hai ki vertical mein gravity equilibrium ko badalti hai lekin frequency ko bilkul affect nahi karti — yeh symmetry differential equation mein chhupi hoti hai.

## 2. Why this matters — concrete and current

SpaceX Falcon 9 landing legs ke andar hydraulic spring-damper systems payload vibrations ko absorb karte hain; horizontal aur vertical modes dono ko alag-alag tune kiya jata hai taaki rocket structure safe rahe re-entry ke time.

LIGO gravitational wave detectors mein test masses ko quadruple pendulum aur maraging-steel springs se isolate kiya jata hai. Vertical aur horizontal resonance frequencies ko precisely match kiya jata hai taaki seismic noise 10 Hz ke neeche 10^{-19} m level tak suppress ho sake.

Atomic Force Microscopes (Bruker aur Park Systems) ke cantilever springs vertical direction mein surface forces measure karte hain; horizontal modes ko damp karke tip-sample contact stable rakha jata hai nanoscale imaging ke liye.

Satellite reaction wheels aur cryocoolers ke mounting structures mein spring-mass isolators use hote hain. ISRO aur NASA dono hi vertical launch vibrations aur horizontal attitude-control torques ko alag-alag frequency bands mein filter karte hain.

Seismic isolation platforms (Minus K Technology) jo gravitational experiments mein use hote hain, negative-stiffness springs ke saath vertical aur horizontal resonance ko 0.5 Hz tak le jaate hain; yeh principle seedha simple spring-mass model se aata hai.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Hooke's law \( F = -kx \) | Restoring force ka linear dependence displacement par yahi se aata hai |
| Newton's second law      | \( F = ma \) ko differential equation mein convert karne ke liye |
| Equilibrium condition    | Vertical case mein gravity aur spring force ko balance karna padta hai |
| Linear differential equations | Solution form \( x(t) = A\cos(\omega t + \phi) \) yahin se nikalti hai |

Agar upar ke concepts comfortable nahi hain to pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Horizontal force balance
Horizontal frictionless surface par spring ka ek end fixed hai aur doosra end mass \( m \) se juda hai. Displacement \( x \) positive right ki taraf maana jata hai. Jab mass right ki taraf jaati hai spring stretch hoti hai aur left ki taraf force lagti hai.

Concrete example: \( k = 200 \) N/m aur \( m = 0.5 \) kg. Agar \( x = +0.1 \) m ho to force \( -20 \) N hoga.

Formal statement:  
$$ F_x = -kx \implies m\ddot{x} = -kx $$

> [!WARNING]
> Agar friction ko zero assume na kiya jaaye to damping term aa jaayega aur solution exponential decay ke saath hoga; model toot jaayega.

### Step 2 — Writing the equation of motion
Newton’s law seedha lagao: net force mass times acceleration. Isse second-order linear ODE banti hai.

$$ m\ddot{x} + kx = 0 $$

### Step 3 — Characteristic equation and frequency
Assume solution \( x = e^{rt} \). Characteristic equation \( mr^2 + k = 0 \) deta hai \( r = \pm i\omega \) jahaan \( \omega = \sqrt{k/m} \).

### Step 4 — General solution for horizontal case
$$ x(t) = A\cos(\omega t) + B\sin(\omega t) $$
ya phase form mein \( x(t) = C\cos(\omega t + \phi) \).

### Step 5 — Vertical equilibrium shift
Vertical mein gravity \( mg \) downward lagti hai. Naya equilibrium \( x_0 = mg/k \) par hota hai jahaan spring force \( kx_0 \) upar ki taraf mg ko cancel karti hai.

### Step 6 — Equation around new equilibrium
Let \( y = x - x_0 \). Tab equation ban jaati hai  
$$ m\ddot{y} + ky = 0 $$  
jo horizontal wali hi equation hai. Isliye frequency same rehti hai.

### Step 7 — Textbook-grade statement
Dono orientations mein angular frequency \( \omega = \sqrt{k/m} \) hoti hai jab friction aur damping neglect kiye jaayein.

## 5. Worked examples — har step show karo

**Example 1 — Horizontal period calculation**  
*Given:* \( m = 0.25 \) kg, \( k = 100 \) N/m, initial displacement 3 cm, released from rest.  
*Find:* Time period and amplitude.  

Pehle \( \omega = \sqrt{k/m} = \sqrt{400} = 20 \) rad/s.  
\( T = 2\pi/\omega = \pi/10 \) s.  
Amplitude 0.03 m kyunki velocity zero thi extreme par.  
**Final answer:** \( T = 0.314 \) s, amplitude = 0.03 m.  

*Reflection:* Seedha formula plug-in tha; yeh case sabse simple hai lekin frequency-mass inverse relation clear karta hai.

**Example 2 — Vertical equilibrium position**  
*Given:* \( m = 2 \) kg, \( k = 400 \) N/m, g = 9.8 m/s².  
*Find:* New equilibrium stretch.  

\( x_0 = mg/k = 19.6/400 = 0.049 \) m.  
**Final answer:** 4.9 cm downward.  

*Reflection:* Gravity sirf shift karti hai; oscillation ke liye yeh zero nahi hoti.

**Example 3 — Vertical oscillation with initial velocity**  
*Given:* Mass 0.5 kg, spring constant 50 N/m, pulled 5 cm below new equilibrium aur upward velocity 0.2 m/s di.  
*Find:* Equation of motion.  

\( \omega = \sqrt{100} = 10 \) rad/s.  
\( x(t) = 0.05\cos(10t) + 0.02\sin(10t) \) (y measured from new equilibrium).  
**Final answer:** \( y(t) = 0.05\cos(10t) + 0.02\sin(10t) \) m.  

*Reflection:* Phase constants initial conditions se nikalte hain; yeh step aksar calculation error ka source hota hai.

**Example 4 — Energy conservation check**  
*Given:* Horizontal system, amplitude 4 cm, \( k = 200 \) N/m.  
*Find:* Maximum speed.  

Total energy \( \frac12 kA^2 = 0.16 \) J.  
Maximum kinetic energy same hoti hai, isliye \( v_\max = A\omega = 0.04\times20 = 0.8 \) m/s.  
**Final answer:** 0.8 m/s.  

*Reflection:* Energy method frequency nikaalne ka shortcut deta hai jab boundary conditions complicated hon.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Vertical mein \( \omega = \sqrt{k/m - g} \) likhna | Gravity ko galat jagah equation mein daalna | Sirf displacement new equilibrium se measure karo |
| Amplitude ko equilibrium shift ke saath add karna | Physical stretch aur oscillation amplitude ko mix karna | Do alag variables rakho: \( x_0 \) aur A     |
| Friction zero na maanna lekin damping term bhool jaana | Real springs mein thoda drag hota hai       | Problem statement carefully padho            |
| Phase constant galat calculate karna | Sine aur cosine initial conditions mix karna | Velocity aur position dono equations likho   |
| Mass-spring frequency ko pendulum frequency se compare karna | dono alag physical mechanisms hain         | Formula alag alag yaad rakho                 |
| Vertical mein time period change hone ka sochna | Intuition gravity badalti hai              | Equation derive karke check karo             |

## 7. The textbook-precise statement

In the absence of damping and for motion in a uniform gravitational field, the equation governing a mass-spring system is \( m\ddot{x} + kx = 0 \) when measured from the equilibrium position (horizontal or vertical). The general solution is \( x(t) = A\cos(\sqrt{k/m}\,t) + B\sin(\sqrt{k/m}\,t) \). For the vertical orientation the static equilibrium extension \( \delta = mg/k \) merely shifts the origin; the frequency remains \( \sqrt{k/m} \). (Taylor, *Classical Mechanics*, 2005, §5.2)

## 8. Visual — diagram or schematic

```
Horizontal:
Wall ----[spring k]----[mass m]  → x positive right
          equilibrium at x=0

Vertical:
Ceiling ----[spring k]----[mass m]
                         ↓ x positive down
               new eq at x = mg/k
```

## 9. The memory technique

**The hook** — Imagine a mass on a spring jaise lift mein khade ho; lift ruk jaaye to aap upar-neeche hote ho lekin “effective gravity” badalne se frequency nahi badalti.

**What to overlearn** — \( \omega = \sqrt{k/m} \) aur \( T = 2\pi\sqrt{m/k} \) dono orientations ke liye; vertical shift \( mg/k \) sirf reference point hai.

**Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.

**First-principles fallback** — Agar formula bhool jaaye to Newton’s law likho, \( F = -kx \) (ya \( -k y \) naye equilibrium se), phir \( \ddot{y} + \omega^2 y = 0 \) solve karo.

## 10. What this unlocks

Yeh model aage ke har oscillatory system ka foundation hai.

- Simple pendulum small-angle approximation
- Physical pendulum aur compound pendulum
- Coupled oscillators aur normal modes
- Driven damped harmonic oscillator (resonance)
- Wave equation derivation on a string

## 11. Self-check — five questions, no answers

1. Ek horizontal spring-mass system mein agar mass double kar di jaaye to period kitna badlega?
2. Vertical case mein agar g = 0 ho jaaye (free space) to equilibrium position kya hogi aur frequency kya rahegi?
3. Agar initial velocity aur displacement dono diye hon to phase constant nikaalne ka step-by-step tareeka kya hai?
4. Kyun real springs mein measured frequency thodi kam hoti hai theoretical value se?
5. Agar ek student vertical displacement ko fixed end se measure kare instead of new equilibrium se, equation mein extra term kya aa jaayega?