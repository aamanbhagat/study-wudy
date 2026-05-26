## 1. The one-sentence answer
**Gravitational field intensity** at a distance \(r\) from a point mass \(M\) is the gravitational force per unit mass and equals \(g = GM/r^2\), directed toward the mass.

Yeh formula Newton ke law of universal gravitation se directly aati hai. Force \(F = GMm/r^2\) hoti hai kisi test mass \(m\) par. Jab aap force ko mass se divide karte ho to field intensity milti hai jo mass \(m\) par depend nahi karti. Iska matlab yeh hai ki har object, chahe uska mass kitna bhi ho, same acceleration experience karega us field mein.

Aap isko ek vector field ki tarah soch sakte ho jisme har point par ek arrow hota hai jo direction aur strength batata hai. Rocket trajectories calculate karte waqt yeh field value continuously change hoti rehti hai altitude ke saath.

> [!NOTE]
> The “aha” moment yeh hai ki \(g\) actually acceleration hai, lekin isko field intensity kehte hain kyunki yeh space ke har point par define hota hai bina kisi test mass ke.

## 2. Why this matters — concrete and current
ISRO ke Chandrayaan-3 mission mein descent trajectory calculate karte waqt lunar gravitational field \(g = GM/r^2\) ko real-time update kiya gaya tha taaki Vikram lander ka throttle curve sahi rahe. 

SpaceX Starship re-entry simulations mein Earth ke varying gravitational field ko \(GM/r^2\) model karke atmospheric skip trajectories design ki jaati hain; bina iske heat shield ka heat load galat predict hota.

GPS satellite constellation mein relativistic time dilation correction ke saath Newtonian gravitational field intensity bhi account ki jaati hai taaki orbital radius \(r\) se derived \(g\) value clock drift ko sahi kare.

Neutron star merger events (LIGO detections) mein initial inspiral phase mein gravitational field intensity \(GM/r^2\) ka scaling hi gravitational wave frequency evolution determine karti hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Newton’s second law  | Field intensity = force per unit mass, directly from \(F = ma\) |
| Inverse-square law   | Gravitational force already follows \(1/r^2\), so field bhi follow karti hai |
| Vector vs scalar     | Direction toward center must be tracked for any trajectory calculation |
| Point-mass idealization | Real bodies ko center-of-mass point mass treat karna zaroori hai jab \(r\) radius se kaafi bada ho |

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from force law
Newton ka law kehta hai do masses ke beech force \(F = G M m / r^2\) hoti hai. Jab aap is force ko sirf test mass \(m\) se divide kar dete ho to aapko ek quantity milti hai jo \(m\) par depend nahi karti. Iska naam gravitational field intensity \(g\) hai.

Concrete example: Earth surface par \(M = 5.97 \times 10^{24}\) kg aur \(r = 6.37 \times 10^6\) m lene par \(g \approx 9.8\) m/s² nikalti hai bina kisi object ke mass jaane.

Formal statement:
$$g = \frac{GM}{r^2} \hat{r}$$

> [!WARNING]
> Agar aap force aur field ko alag-alag treat nahi karte to aap galti se \(g\) ko mass-dependent samajh baithoge, jo orbital mechanics mein sab calculations ko tod deta hai.

### Step 2 — Direction as inward radial unit vector
Field hamesha attracting hota hai, isliye direction \(-\hat{r}\) (center ki taraf) hoti hai. Magnitude alag se calculate hoti hai.

### Step 3 — Superposition for multiple masses
Agar kai masses hain to total field vector sum hota hai. Har mass apna \(GM_i/r_i^2\) vector contribute karti hai.

### Step 4 — Spherical symmetry and Gauss’s law for gravity
Bahut badi bodies ke liye jab aap surface ke bahar jaate ho to poora mass center par concentrated maana ja sakta hai. Gauss’s law yeh justify karti hai.

### Step 5 — Differential form and potential link
Field intensity gradient of gravitational potential se related hoti hai:
$$g = -\nabla V, \quad V = -\frac{GM}{r}$$

Textbook-grade statement tak pahunchne ke liye yeh step zaroori hai.

## 5. Worked examples — har step show karo

**Example 1 — Surface gravity of Mars**
*Given:* \(M_\text{Mars} = 6.42 \times 10^{23}\) kg, \(R_\text{Mars} = 3.39 \times 10^6\) m, \(G = 6.67430 \times 10^{-11}\) m³ kg⁻¹ s⁻².  
*Find:* \(g\) at surface.  

Step 1: \(r = R_\text{Mars}\) choose karo.  
Step 2: \(GM = 6.67430 \times 10^{-11} \times 6.42 \times 10^{23} = 4.285 \times 10^{13}\).  
Step 3: \(r^2 = (3.39 \times 10^6)^2 = 1.149 \times 10^{13}\).  
Step 4: \(g = 4.285 \times 10^{13} / 1.149 \times 10^{13} = 3.73\) m/s².  
**3.73 m/s²**

*Reflection:* Simple substitution thi; trick yeh hai ki radius ko hi distance maana jaaye jab surface par ho.

**Example 2 — Field at 500 km altitude above Earth**
*Given:* Earth values as above, altitude = 500 km.  
*Find:* \(g\).  

\(r = 6.37 \times 10^6 + 5 \times 10^5 = 6.87 \times 10^6\) m.  
\(r^2 = 4.72 \times 10^{13}\).  
\(GM = 3.986 \times 10^{14}\).  
\(g = 3.986 \times 10^{14} / 4.72 \times 10^{13} = 8.44\) m/s².  
**8.44 m/s²**

*Reflection:* Altitude add karna zaroori hai; log aksar surface radius hi use karte rehte hain.

**Example 3 — Vector field at a point between Earth and Moon**
*Given:* Distance Earth-Moon = \(3.84 \times 10^8\) m, point 3.0 × 10⁸ m from Earth.  
*Find:* Net \(g\).

Earth contribution: \(g_E = GM_E / r_E^2 = 3.986 \times 10^{14} / (3.0 \times 10^8)^2 = 4.43 \times 10^{-3}\) m/s² (toward Earth).  
Moon contribution: \(g_M = GM_M / r_M^2 = 4.90 \times 10^{12} / (8.4 \times 10^7)^2 = 6.94 \times 10^{-4}\) m/s² (toward Moon).  
Net = \(g_E - g_M = 3.74 \times 10^{-3}\) m/s² toward Earth.  
**3.74 × 10⁻³ m/s² toward Earth**

*Reflection:* Direction signs handle karna padta hai; scalar calculation se vector result nahi milega.

**Example 4 — Escape velocity link**
*Given:* Derive escape velocity from \(g = GM/r^2\).  
*Find:* \(v_\text{esc}\).

Energy conservation: \(\frac{1}{2}mv^2 = GMm/r\).  
Substitute \(GM = g r^2\): \(v = \sqrt{2gr}\).  
**\(v = \sqrt{2gr}\)**

*Reflection:* Field intensity se potential energy tak jaana padta hai; sirf magnitude se kaam nahi banta.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using surface radius even at altitude | Habit of plugging “r = R” without thinking | Always write \(r = R + h\) explicitly        |
| Treating g as scalar in 3-D problems | 2-D problems mein direction miss ho jaati hai | Draw radial unit vector every time           |
| Forgetting superposition          | Single-body problems se over-generalization | List every mass and add vectorially          |
| Confusing field with force        | Both have same \(1/r^2\) dependence         | Repeat “field = force / test mass” aloud     |
| Using G in wrong units            | Mixed unit systems                          | Keep SI units until final numerical answer   |
| Ignoring that g is local          | Thinking g constant everywhere              | Write \(g(r)\) not just g                    |

## 7. The textbook-precise statement
The gravitational field \(\mathbf{g}(\mathbf{r})\) due to a point mass \(M\) located at the origin is defined as the gravitational force per unit mass experienced by a test particle of negligible mass at position \(\mathbf{r}\). Under the assumptions that (i) the test mass does not affect the source, (ii) \(r\) is measured from the center of mass, and (iii) we remain outside the source body, the field is
\[
\mathbf{g}(\mathbf{r}) = -\frac{GM}{r^2}\hat{\mathbf{r}},
\]
where \(\hat{\mathbf{r}} = \mathbf{r}/r\). (Taylor, *Classical Mechanics*, 2005, §4.3).

## 8. Visual — diagram or schematic
```
          Moon
           o
           |  r_M
           |
Earth      |------x------> test point
  o--------|
     r_E
```
Horizontal line: Earth center at left, test point at distance r_E from Earth and r_M from Moon. Arrows show g_E leftward, g_M rightward; net arrow length = |g_E − g_M|.

## 9. The memory technique
1. **The hook** — Imagine a giant invisible “sucking straw” from the center of the planet whose strength drops exactly as 1 over distance squared; the straw’s suck per kilogram is g.
2. **What to overlearn** — \(g = GM/r^2\) (vector form with minus sign) and \(GM_\ Earth = 3.986 \times 10^{14}\) m³ s⁻².
3. **Spaced-repetition schedule** — Review formula + one worked example after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from \(F = GMm/r^2\), divide both sides by m, replace F/m with g.

## 10. What this unlocks
Yeh formula seedha orbital period, escape velocity, and two-body reduced mass problems kholta hai.

- Kepler’s third law derivation
- Hohmann transfer orbit Δv calculations
- Tidal force estimates (difference of g across an extended body)
- Gravitational potential energy \(U = -GMm/r\)

## 11. Self-check — five questions, no answers
1. Calculate g at 1000 km above Earth’s surface using only G, M_E, R_E.
2. A point lies on the line joining Earth and Sun where net gravitational field is zero. Is that point closer to Earth or Sun? Why?
3. Two identical masses are placed at distance 2d apart. At the midpoint, what is the net field? At what distance from one mass does the field become zero?
4. If Earth’s radius were halved while keeping mass constant, by what factor would surface g change?
5. In a uniform spherical shell, show using superposition that g = 0 everywhere inside.