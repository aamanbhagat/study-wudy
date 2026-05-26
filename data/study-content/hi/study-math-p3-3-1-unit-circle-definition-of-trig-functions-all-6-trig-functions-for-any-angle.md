## 1. The one-sentence answer

**Unit circle definition se aap kisi bhi real angle θ ke liye sabhi six trigonometric functions — sine, cosine, tangent, cotangent, secant aur cosecant — ko geometrically define kar sakte ho.**

Pehle aap ek radius-1 wala circle origin par draw karte ho. Phir angle θ ko positive x-axis se anticlockwise measure karte ho. Jis point par ray circle ko intersect karti hai, us point ke coordinates (x, y) directly sine aur cosine dete hain. Baaki functions in coordinates se ratios ke through ban jaate hain.

Yeh approach degree ya radian ki koi bhi value handle karti hai, negative angles aur angles jo 360° se bade hain unko bhi cover karti hai, kyunki circle periodic hai.

> [!NOTE]
> Sabse bada "aha" yeh hai ki trigonometric functions ab sirf right-triangle ratios nahi rahte — woh circle ke coordinates ban jaate hain, jo unko real line par kisi bhi θ ke liye continuous aur defined bana deta hai.

## 2. Why this matters — concrete and current

In aerospace, SpaceX Falcon 9 ke guidance algorithms unit-circle based rotation matrices use karte hain taaki thrust vector ko real-time mein kisi bhi angle par orient kiya ja sake bina triangle approximations ke.

Modern GPU shaders (NVIDIA CUDA cores par) trigonometric functions ko unit-circle definition se evaluate karte hain jab 3D rotations handle karte hain, jaise video games mein camera movement ya ray-tracing mein.

In semiconductor manufacturing, ASML ke EUV lithography machines angle-dependent interference patterns calculate karne ke liye unit-circle sine aur cosine values use karte hain sub-nanometer precision ke liye.

Fundamental physics mein, quantum mechanics ke Bloch sphere par qubit states ko represent karne ke liye exactly yahi unit-circle parametrization lagti hai, jaise IBM Quantum aur Google Quantum AI papers mein dikhaaya gaya hai.

Signal processing mein, OFDM modulation (5G base stations mein) carrier waves ke phase ko unit-circle coordinates se track karta hai taaki frequency offset correct kiya ja sake.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Cartesian coordinates    | Unit circle par point (x, y) directly sine aur cosine deta hai |
| Radian measure           | Angles ko real numbers ke saath link karta hai jo circle ke arc length se match kare |
| Periodic behaviour       | 2π ke baad values repeat hoti hain, jo kisi bhi angle ko reduce karne mein madad karti hai |
| Ratio definition         | Tangent, secant etc. sine aur cosine ke ratios se derive hote hain |

Agar aap radian measure ya basic coordinates comfortable nahi ho to pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Draw the unit circle and place the angle
Aap origin par radius 1 wala circle lete ho aur positive x-axis se ek ray anticlockwise θ angle par draw karte ho. Yeh ray circle ko ek unique point par touch karti hai.

Concrete example: θ = 90° = π/2 radian par point (0, 1) milta hai.

Formal statement: Let \(C\) be the circle \(x^2 + y^2 = 1\). For any real \(\theta\), the ray from origin at angle \(\theta\) intersects \(C\) at point \(P(\cos\theta, \sin\theta)\).

> [!WARNING]
> Agar aap angle ko clockwise lete ho bina sign change kiye to signs galat ho jaayenge aur saare functions flip ho jaayenge.

### Step 2 — Define sine and cosine via coordinates
P ke y-coordinate ko \(\sin\theta\) aur x-coordinate ko \(\cos\theta\) define karte ho. Yeh definition triangle se independent hai.

Formal statement: \(\sin\theta = y_P\), \(\cos\theta = x_P\) where \(P\) is the intersection point.

### Step 3 — Define tangent as ratio
\(\tan\theta = \frac{\sin\theta}{\cos\theta}\) jab \(\cos\theta \neq 0\).

Yeh x-axis se ray ki slope ke barabar bhi hota hai.

### Step 4 — Define the reciprocal functions
\(\cot\theta = \frac{1}{\tan\theta}\), \(\sec\theta = \frac{1}{\cos\theta}\), \(\csc\theta = \frac{1}{\sin\theta}\), with appropriate domains.

### Step 5 — Handle all quadrants via signs
Har quadrant mein x aur y ke signs decide karte hain kaunsa function positive ya negative hoga. Pehla quadrant dono positive, doosra sin positive, etc.

### Step 6 — Extend to any real angle
\(\theta + 2\pi k\) ke liye values repeat hoti hain kyunki circle periodic hai. Negative angles clockwise jaate hain.

Formal textbook-grade definition: For \(\theta \in \mathbb{R}\), let \(P = (\cos\theta, \sin\theta)\) be the point on the unit circle at angle \(\theta\) measured from positive x-axis. Then \(\tan\theta = \frac{\sin\theta}{\cos\theta}\) (where defined), and the three reciprocal functions follow similarly.

## 5. Worked examples — har step show karo

**Example 1 — 30° angle in first quadrant**
*Given:* \(\theta = \frac{\pi}{6}\)
*Find:* All six functions

Step 1: Unit circle par 30° par point \(\left(\frac{\sqrt{3}}{2}, \frac{1}{2}\right)\) hota hai.  
*Why:* Known 30-60-90 triangle ratios scaled to radius 1.

\(\sin\frac{\pi}{6} = \frac{1}{2}\), \(\cos\frac{\pi}{6} = \frac{\sqrt{3}}{2}\)

\(\tan\frac{\pi}{6} = \frac{1/\!2}{\sqrt{3}/\!2} = \frac{1}{\sqrt{3}}\)

\(\cot\frac{\pi}{6} = \sqrt{3}\), \(\sec\frac{\pi}{6} = \frac{2}{\sqrt{3}}\), \(\csc\frac{\pi}{6} = 2\)

**Final answer**  
\(\sin = \frac12\), \(\cos = \frac{\sqrt3}{2}\), \(\tan = \frac1{\sqrt3}\), \(\cot = \sqrt3\), \(\sec = \frac2{\sqrt3}\), \(\csc = 2\)

*Reflection:* Yeh basic case hai; signs positive hain kyunki first quadrant.

**Example 2 — 150° in second quadrant**
*Given:* \(\theta = \frac{5\pi}{6}\)
*Find:* All six

Step 1: 180° – 30° = reference angle 30°, x negative, y positive.  
*Why:* Quadrant rule apply karte hain.

\(\sin\frac{5\pi}{6} = \frac12\), \(\cos\frac{5\pi}{6} = -\frac{\sqrt3}{2}\)

\(\tan = -\frac1{\sqrt3}\), \(\cot = -\sqrt3\), \(\sec = -\frac2{\sqrt3}\), \(\csc = 2\)

**Final answer**  
\(\sin = \frac12\), \(\cos = -\frac{\sqrt3}{2}\), \(\tan = -\frac1{\sqrt3}\), \(\cot = -\sqrt3\), \(\sec = -\frac2{\sqrt3}\), \(\csc = 2\)

*Reflection:* Sign change sirf cosine family mein aaya.

**Example 3 — 210° in third quadrant**
*Given:* \(\theta = \frac{7\pi}{6}\)
*Find:* All six

Reference angle 30°, dono x aur y negative.  
\(\sin = -\frac12\), \(\cos = -\frac{\sqrt3}{2}\), \(\tan = \frac1{\sqrt3}\), \(\cot = \sqrt3\), \(\sec = -\frac2{\sqrt3}\), \(\csc = -2\)

**Final answer**  
\(\sin = -\frac12\), \(\cos = -\frac{\sqrt3}{2}\), \(\tan = \frac1{\sqrt3}\), \(\cot = \sqrt3\), \(\sec = -\frac2{\sqrt3}\), \(\csc = -2\)

*Reflection:* Tangent positive kyunki dono negative ka ratio positive.

**Example 4 — 390° = 30° + 360°**
*Given:* \(\theta = \frac{13\pi}{6}\)
*Find:* All six

390° – 360° = 30°, values same as Example 1.

**Final answer**  
Same as Example 1.

*Reflection:* Periodicity reduce kar deti hai har angle ko [0, 2π) range mein.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting sign in quadrant 2/3   | Students sirf positive triangle yaad rakhte hain | Har quadrant ke liye sign chart bana lo     |
| tan(90°) ko undefined bolna bhoolna | 90° par cos = 0 hota hai                    | Domain check karo pehle                       |
| 2π se badi angles ko alag treat karna | Sochte hain naye values aayenge             | Always mod 2π karo pehle                      |
| sec aur csc ko sin/cos ke reciprocal ke jagah inverse samajhna | Notation confusion                          | "sec = 1/cos" explicitly likho                |
| Negative angles ke signs galat    | Clockwise direction bhool jaate hain        | Negative θ ko clockwise movement samjho     |

## 7. The textbook-precise statement

For any real number \(\theta\), let \(P = (x, y)\) be the point where the terminal side of the angle \(\theta\) (in standard position) intersects the unit circle \(x^2 + y^2 = 1\). Define  
\[
\sin\theta = y, \quad \cos\theta = x, \quad \tan\theta = \frac{y}{x} \ (x \neq 0),
\]  
and the reciprocal functions  
\[
\csc\theta = \frac{1}{y} \ (y \neq 0), \quad \sec\theta = \frac{1}{x} \ (x \neq 0), \quad \cot\theta = \frac{x}{y} \ (y \neq 0).
\]  
This definition appears in Stewart, *Calculus*, 9e, §1.3.

## 8. Visual — diagram or schematic

```
          y
          |
     (-√2/2, √2/2)   |   (√2/2, √2/2)
          \          |          /
           \   Q2    |   Q1    /
            \        |        /
             \_______|_______/____ x
             /       |       \
            /   Q3   |   Q4   \
           /         |         \
     (-√2/2,-√2/2)   |   (√2/2,-√2/2)
          |
```
Unit circle with quadrants labelled and example point for 135° shown.

## 9. The memory technique

**The hook**  
Imagine walking on a glowing unit circle; your height above x-axis is sin, distance along x-axis is cos.

**What to overlearn**  
- \(\sin^2\theta + \cos^2\theta = 1\)  
- Signs per quadrant: All +, sin+, tan+, cos+  
- Period 2π for sin/cos, π for tan

**Spaced-repetition schedule**  
Review after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Agar bhool jaao to unit circle redraw karo, coordinates nikaalo, ratios banao.

## 10. What this unlocks

Yeh foundation advanced identities, derivatives of trig functions, aur Fourier series ke liye zaroori hai.

- Trigonometric identities (Pythagorean, angle-addition)
- Calculus of trig functions
- Complex numbers aur Euler’s formula
- Periodic signal analysis

## 11. Self-check — five questions, no answers

1. 225° par sabhi six functions calculate karo.
2. Kyun hai \(\tan(\pi/2)\) undefined? Unit circle se explain karo.
3. \(\theta = 5\pi/3\) ke liye cos positive kyun hai? Quadrant rule se batao.
4. Ek angle do jahaan secant negative ho lekin cosecant positive.
5. 750° ko equivalent [0, 2π) angle mein reduce karke uska sine nikaalo.