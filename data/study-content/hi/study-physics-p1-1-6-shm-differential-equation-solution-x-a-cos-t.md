## 1. The one-sentence answer
**The general solution of the simple harmonic motion differential equation \(\frac{d^2x}{dt^2} + \omega^2 x = 0\) is \(x(t) = A \cos(\omega t + \phi)\), where \(A\) sets amplitude and \(\phi\) sets the starting phase.**

Yeh equation tab banta hai jab kisi particle par restoring force directly displacement ke proportional ho, jaise spring-mass system mein. Differential equation ko solve karne ke liye hum assume karte hain ki solution ek sinusoidal function hoga kyunki uska second derivative khud usi function ka negative multiple hota hai. Isse amplitude \(A\) aur phase \(\phi\) dono free parameters ban jaate hain jo initial conditions se fix hote hain.

Aap dekh sakte hain ki \(\omega\) yahan natural frequency hai jo system ke physical properties (jaise \(k/m\)) se aati hai, lekin \(A\) aur \(\phi\) kinematics decide karte hain. Iska matlab yeh hai ki ek hi differential equation ke alag-alag initial displacements aur velocities ke liye alag-alag \(A\) aur \(\phi\) milenge, lekin shape hamesha cosine (ya sine) hi rahega.

> [!NOTE]
> Sabse badi aha yeh hai ki ek second-order linear differential equation ke exactly do arbitrary constants hote hain, aur \(A\) aur \(\phi\) unhi do constants ko physically meaningful tarike se represent karte hain.

## 2. Why this matters — concrete and current
ISRO ke PSLV aur GSLV rockets mein liquid propellant slosh ko model karne ke liye SHM differential equation ka yahi solution use hota hai tank walls ke vibration amplitude predict karne ke liye.  
SpaceX Starship ke propellant management simulations mein bhi yahi form use karke ullage motors ke firing schedule decide kiye jaate hain jab vehicle microgravity mein hota hai.  
Semiconductor lithography machines (ASML ke EUV scanners) ke vibration isolation platforms ko design karte waqt yeh solution exact resonance frequencies nikaalne mein lagta hai taaki sub-nanometer overlay accuracy mile.  
LIGO gravitational wave detectors ke mirror suspension systems mein thermal noise ko SHM solution se hi calculate kiya jaata hai, jisse 10^{-19} m ke displacement sensitivity achieve hoti hai.  
Quantum computing mein trapped-ion qubits ke motional modes ko bhi isi differential equation ke solutions se describe kiya jaata hai jab laser cooling ke baad residual oscillation bachti hai.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Newton's second law      | Force \(\to\) acceleration link deta hai jo differential equation banata hai |
| Chain rule for derivatives | Sinusoidal function ke derivatives nikaalne ke liye zaroori hai |
| Linear homogeneous DE    | Solution space ki dimension aur general form samajhne ke liye |
| Initial conditions       | \(A\) aur \(\phi\) fix karne ke liye dono constants chahiye |

Agar aapko second derivative ya linear differential equation ka basic idea nahi hai to pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Restoring force produces acceleration proportional to displacement
Jab displacement \(x\) badhta hai to force \(-kx\) usko wapas khichta hai. Newton's law likhne par acceleration seedha \(x\) ke proportional ban jaata hai.  
Example: spring constant \(k = 100\) N/m, mass \(m = 1\) kg, \(x = 0.1\) m par force \(-10\) N hai, isliye acceleration \(-10\) m/s².  
Formal statement: \(m \frac{d^2x}{dt^2} = -kx\).  
> [!WARNING]
> Sign galat karne se equation \(\frac{d^2x}{dt^2} - \omega^2 x = 0\) ban jaayega aur solution exponential hoga, jo oscillation nahi dikhata.

### Step 2 — Rewrite as standard second-order linear equation
Dono taraf \(m\) divide karke \(\omega^2 = k/m\) define karo. Ab equation sirf \(\omega\) par depend karti hai.  
Example: upar wale numbers se \(\omega = 10\) rad/s.  
Formal: \(\frac{d^2x}{dt^2} + \omega^2 x = 0\).

### Step 3 — Guess a sinusoidal trial solution
Second derivative khud function ka negative multiple lauta sake, isliye \(x = A \cos(\omega t + \phi)\) try karo.  
Example: \(\phi = 0\), \(A = 1\), \(\omega = 1\) par \(x = \cos t\), second derivative \(-\cos t\) hoti hai.  
Formal trial: \(x(t) = A \cos(\omega t + \phi)\).

### Step 4 — Compute the second derivative
Pehle derivative: \(-\ A \omega \sin(\omega t + \phi)\).  
Doosri derivative: \(-\ A \omega^2 \cos(\omega t + \phi)\).  
Yeh exactly \(-\omega^2 x\) ban jaati hai.

### Step 5 — Plug back and verify identity
Second derivative + \(\omega^2 x = 0\) identically satisfy hoti hai. Isliye yeh function solution hai.  
Formal verification: \(\frac{d^2x}{dt^2} + \omega^2 x = -A\omega^2\cos(\omega t + \phi) + \omega^2 A\cos(\omega t + \phi) = 0\).

### Step 6 — Fix constants from initial conditions
\(x(0) = x_0\) aur \(v(0) = v_0\) se \(A\) aur \(\phi\) nikaalte hain.  
Formal: \(A = \sqrt{x_0^2 + (v_0/\omega)^2}\), \(\phi = \atantwo(-v_0/\omega, x_0)\).

## 5. Worked examples — har step show karo

**Example 1 — Basic spring release from rest**  
*Given:* \(k = 36\) N/m, \(m = 1\) kg, \(x(0) = 0.5\) m, \(v(0) = 0\).  
*Find:* \(x(t)\).  
Step 1: \(\omega^2 = 36/1 = 36\), \(\omega = 6\).  
Step 2: \(x(t) = A \cos(6t + \phi)\).  
Step 3: \(x(0) = A \cos\phi = 0.5\).  
Step 4: \(v(t) = -6A\sin(6t + \phi)\), \(v(0) = -6A\sin\phi = 0\) \(\Rightarrow \sin\phi = 0\) \(\Rightarrow \phi = 0\).  
Step 5: \(A = 0.5\).  
**\(x(t) = 0.5 \cos(6t)\)**  
*Reflection:* Zero velocity ne phase zero fix kiya; yeh sabse simple case hai.

**Example 2 — Release with initial velocity**  
*Given:* Same system, \(x(0) = 0\), \(v(0) = 3\) m/s.  
*Find:* \(x(t)\).  
Step 1: \(\omega = 6\).  
Step 2: \(x(0) = A\cos\phi = 0\).  
Step 3: \(v(0) = -6A\sin\phi = 3\) \(\Rightarrow A\sin\phi = -0.5\).  
Step 4: \(A = 0.5\), \(\phi = -\pi/2\).  
**\(x(t) = 0.5 \cos(6t - \pi/2) = 0.5 \sin(6t)\)**  
*Reflection:* Phase shift velocity ko accommodate karti hai bina amplitude badlaaye.

**Example 3 — Arbitrary phase from two initial values**  
*Given:* \(x(0) = 0.3\) m, \(v(0) = -4\) m/s, \(\omega = 5\).  
*Find:* \(A\) aur \(\phi\).  
Step 1: \(A\cos\phi = 0.3\).  
Step 2: \(-5A\sin\phi = -4\) \(\Rightarrow A\sin\phi = 0.8\).  
Step 3: \(A = \sqrt{0.3^2 + 0.8^2} = \sqrt{0.73}\).  
Step 4: \(\phi = \atantwo(-0.8, 0.3)\).  
**\(x(t) = \sqrt{0.73}\cos(5t + \phi)\) with \(\phi \approx -1.212\) rad**  
*Reflection:* dono initial conditions se amplitude aur phase dono nikalte hain.

**Example 4 — Energy method cross-check**  
*Given:* \(A = 2\) cm, \(\omega = 10\) rad/s. Total energy \(E = \frac12 m\omega^2 A^2\).  
*Find:* maximum velocity.  
Step 1: \(v_{\max} = \omega A = 0.2\) m/s.  
Step 2: Energy conservation se bhi yahi milta hai.  
**\(v_{\max} = 0.2\) m/s**  
*Reflection:* Energy route amplitude se velocity nikaalne ka shortcut deta hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Sign error in restoring force     | Students often write \(+kx\) instead of \(-kx\) | Force direction physically socho pehle       |
| Forgetting two constants          | Equation second-order hai, lekin ek hi constant daal dete hain | Hamesha \(A\) aur \(\phi\) dono solve karo   |
| Using \(\sin\) ya \(\cos\) blindly| Phase choice arbitrary lagti hai            | \(\atantwo\) function se consistent raho     |
| \(\omega\) ko frequency samajhna  | \(\omega\) radian frequency hai, Hz nahi    | Unit check karo: rad/s                       |
| Initial velocity derivative galat | Sign miss kar dete hain                     | \(v = dx/dt\) likh ke derivative lo          |
| Amplitude negative lena           | Phase adjust karne ki bajaye A negative karte hain | \(A > 0\) rakho, phase se adjust karo        |

## 7. The textbook-precise statement
The equation \(\ddot{x} + \omega^2 x = 0\) is a second-order linear homogeneous ordinary differential equation with constant coefficients. Its characteristic equation \(r^2 + \omega^2 = 0\) yields roots \(\pm i\omega\). Therefore the general solution on \(\mathbb{R}\) is \(x(t) = A\cos(\omega t + \phi)\) where \(A \ge 0\) and \(\phi \in \mathbb{R}\) are arbitrary constants fixed by initial data. (See Arnold, *Ordinary Differential Equations*, 3e, §3.1, or Taylor, *Classical Mechanics*, §5.2.)

## 8. Visual — diagram or schematic
```
x
^
|     .--.     .--.     .--.
|    /    \   /    \   /    \
|   /      \ /      \ /      \
|  /        X        X        \
| /        / \      / \        \
|/        /   \    /   \        \
0--------/-----\--/-----\--------> t
         φ      A      period T=2π/ω
```
Horizontal axis time, vertical displacement. Curve ek pure cosine wave hai amplitude \(A\), phase offset \(\phi\), aur period \(2\pi/\omega\).

## 9. The memory technique
1. **The hook** — Socho ek pendulum bob jo ek hi frequency par hamesha ghumta rahe; uske x-projection ko camera se record karo to woh exactly \(A\cos(\omega t + \phi)\) ban jaata hai.  
2. **What to overlearn** — \(\frac{d^2x}{dt^2} + \omega^2 x = 0\) aur uska solution \(x = A\cos(\omega t + \phi)\).  
3. **Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.  
4. **First-principles fallback** — Agar formula bhool jaaye to force se \(F = -kx\) likho, Newton se differential equation banao, phir trial solution \(A\cos(\omega t + \phi)\) daal ke verify karo.

## 10. What this unlocks
Yeh solution aapko superposition, beats, driven oscillators, aur normal modes samajhne ka seed deta hai.  
- Damped harmonic oscillator (next subtopic)  
- Forced oscillation aur resonance curves  
- Coupled oscillators aur normal-mode analysis  
- Small-angle pendulum aur physical pendulum periods  
- Quantum harmonic oscillator wavefunctions ka classical limit

## 11. Self-check — five questions, no answers
1. Ek mass-spring system ke liye \(\omega = \sqrt{k/m}\) kaise derive hoti hai?  
2. Agar \(x(0) = A\) aur \(v(0) = 0\) ho to \(\phi\) kya hoga?  
3. Kyun second derivative negative sign laati hai jo oscillation allow karti hai?  
4. Agar aap \(\sin(\omega t + \phi)\) use karo to \(A\) aur \(\phi\) mein kya farak padta hai?  
5. Ek student ne \(x = -A\cos(\omega t + \phi)\) likha; yeh galat kyun hai ya sahi hai?