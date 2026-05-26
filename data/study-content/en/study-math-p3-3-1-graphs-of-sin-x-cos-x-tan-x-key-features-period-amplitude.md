## 1. The one-sentence answer
**The graphs of \(\sin x\), \(\cos x\), and \(\tan x\) are the unique continuous functions obtained by projecting uniform circular motion onto the coordinate axes, each completely characterized by its period and amplitude.**

These three functions arise directly from the unit circle. As a point travels counterclockwise at constant speed, its vertical coordinate traces \(\sin x\), its horizontal coordinate traces \(\cos x\), and their ratio traces \(\tan x\). Because the motion repeats exactly after one full revolution, the functions repeat; the length of that revolution fixes the period, while the radius of the circle fixes the amplitude.

The resulting curves are not arbitrary. They are the only solutions (up to scaling and phase shift) to the differential equation \(y'' + y = 0\) that satisfy the initial conditions defining sine and cosine. This uniqueness makes them the canonical models for every repeating linear oscillation.

> [!NOTE]
> Once you see that period and amplitude are read straight off the unit-circle geometry, every later transformation (stretching, shifting, adding constants) becomes a direct geometric operation rather than a list of rules to memorize.

## 2. Why this matters — concrete and current
In semiconductor timing analysis, engineers at TSMC use Fourier expansions built on \(\sin\) and \(\cos\) to predict clock jitter at 3 nm nodes; an error of 0.01 in amplitude modeling produces picosecond timing violations that scrap entire wafers.

Spacecraft attitude control at JPL relies on the exact period \(2\pi\) of \(\sin\) and \(\cos\) when propagating quaternions for the Europa Clipper mission; a single missed cycle in the rotation matrix produces trajectory errors measured in hundreds of kilometres after a five-year cruise.

Audio codecs in every smartphone (Apple’s AAC implementation) decompose sound into sinusoidal components whose amplitudes are quantized; incorrect handling of the \(\tan x\) asymptotes near \(\pi/2\) creates audible clicks at high frequencies.

In machine-learning feature engineering, periodic positional encodings in transformer models (Vaswani et al., 2017) are constructed from \(\sin(2^k x)\) and \(\cos(2^k x)\); the period choice directly controls how far the model can extrapolate sequence length without retraining.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Radian measure       | Period is expressed in radians; degrees hide the factor \(2\pi\). |
| Unit-circle definition of sine and cosine | Supplies the geometric origin of both period and amplitude. |
| Definition of tangent as ratio | Reveals why \(\tan x\) has period \(\pi\) and vertical asymptotes. |
| Function periodicity | Formal language needed to state “\(f(x+T)=f(x)\) for all \(x\)”. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Uniform circular motion projects to sine and cosine
A point moving counterclockwise around the unit circle at angular speed 1 radian per unit time has coordinates \((\cos x, \sin x)\).  
Example: at \(x=0\) the point is at \((1,0)\); at \(x=\pi/2\) it is at \((0,1)\).  
Formal statement:  
\[
\cos x = \text{adjacent side}, \quad \sin x = \text{opposite side}
\]  
on the unit circle.  
> [!WARNING] Treating the input as degrees instead of radians shifts every zero and extremum by the factor \(\pi/180\).

### Step 2 — Period emerges from one full revolution
After travelling distance \(2\pi\), the point returns to its starting position, so both coordinates repeat.  
Example: \(\sin(x+2\pi)=\sin x\) holds for every real \(x\).  
Formal statement: the fundamental period \(T\) satisfies  
\[
T = 2\pi \quad \text{for both } \sin x \text{ and } \cos x.
\]  
> [!WARNING] Using \(T=360\) works only in degree mode and breaks every later calculus identity.

### Step 3 — Amplitude is the maximum distance from the midline
On the unit circle the vertical and horizontal excursions never exceed 1, so the amplitude is exactly 1.  
Example: the highest value of \(\sin x\) is 1, the lowest is −1.  
Formal statement:  
\[
|\sin x| \le 1, \quad |\cos x| \le 1
\]  
with equality attained.  
> [!WARNING] Confusing amplitude with the coefficient in front of the function (e.g., \(2\sin x\)) leads to scaling errors when the function is later transformed.

### Step 4 — Tangent is the ratio and therefore repeats twice as often
Because \(\tan x = \sin x / \cos x\), the function repeats every time the point has advanced only half a revolution.  
Example: \(\tan(x+\pi)=\tan x\).  
Formal statement: the fundamental period of \(\tan x\) is \(\pi\).  
> [!WARNING] Treating \(\tan x\) as having period \(2\pi\) misses the sign change that cancels in the ratio.

### Step 5 — Asymptotes appear where cosine vanishes
At odd multiples of \(\pi/2\), \(\cos x = 0\), so \(\tan x\) is undefined and the graph approaches vertical lines.  
Formal statement: vertical asymptotes occur at  
\[
x = \frac{\pi}{2} + k\pi, \quad k \in \mathbb{Z}.
\]  
> [!WARNING] Plotting a finite value at these points violates the definition of the function.

### Step 6 — Range statements complete the graphs
\(\sin x\) and \(\cos x\) fill \([-1,1]\); \(\tan x\) fills \(\mathbb{R}\). These ranges follow directly from the definitions above and are attained infinitely often because of periodicity.

## 5. Worked examples — every step shown

**Example 1 — Locate the first positive zero of cosine**  
*Given:* \(y = \cos x\).  
*Find:* smallest \(x>0\) where \(y=0\).  
Step 1: \(\cos x = 0\) when the point lies on the y-axis.  
*Why:* that is the geometric definition.  
Step 2: First such angle after 0 is \(\pi/2\).  
*Why:* quarter-circle arc length.  
**\(\pi/2\)**

*Reflection:* The answer is read directly from the circle; algebraic solution of \(\cos x = 0\) yields the same value only after the period is known.

**Example 2 — State period and amplitude of \(\sin x\)**  
*Given:* \(y = \sin x\).  
*Find:* period and amplitude.  
Step 1: Identify the generating circle radius = 1.  
*Why:* unit-circle definition fixes amplitude.  
Step 2: Full return occurs after \(2\pi\).  
*Why:* circumference of unit circle.  
**Period \(2\pi\), amplitude 1**

*Reflection:* Both quantities are geometric invariants; changing units would rescale them.

**Example 3 — Identify an asymptote of tangent**  
*Given:* \(y = \tan x\).  
*Find:* the asymptote immediately after \(x=0\).  
Step 1: Denominator zero when \(\cos x = 0\).  
*Why:* definition of tangent.  
Step 2: First positive solution is \(\pi/2\).  
*Why:* same as Example 1.  
**Vertical asymptote at \(x = \pi/2\)**

*Reflection:* Asymptotes are inherited from cosine zeros, not memorized separately.

**Example 4 — Compare periods of \(\sin(x/2)\) and \(\tan x\)**  
*Given:* two functions.  
*Find:* which has smaller fundamental period.  
Step 1: Period of \(\sin(bx)\) is \(2\pi/|b|\).  
*Why:* solve \(\sin(b(x+T)) = \sin(bx)\) for smallest positive \(T\).  
Step 2: For \(\sin(x/2)\), \(b=1/2\), period \(4\pi\).  
Step 3: Period of \(\tan x\) is \(\pi\).  
*Why:* ratio identity halves the sine/cosine period.  
**\(\tan x\) has the smaller period**

*Reflection:* The factor \(1/2\) stretches the sine wave; tangent’s built-in halving always wins.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using 360° for period             | Habit from secondary-school degree mode     | Always convert to radians before graphing    |
| Confusing amplitude with peak-to-peak | Misreading “height” language                | Amplitude = distance from midline to peak    |
| Plotting \(\tan(\pi/2)\) as a large number | Calculator returns huge finite value        | Insert open circle or state “undefined”      |
| Believing \(\sin x\) and \(\cos x\) have different periods | Visual inspection of shifted graphs         | Prove algebraically \(\sin(x+2\pi)=\sin x\)  |
| Forgetting range of \(\tan x\) is all reals | Seeing only one branch                      | Note that every real value is attained in \((-\pi/2,\pi/2)\) |
| Shifting by \(\pi\) instead of \(2\pi\) for cosine | Over-generalising tangent rule              | Check \(\cos(x+\pi)=-\cos x\), not equal     |
| Treating period of \(\sin(2x)\) as still \(2\pi\) | Missing the coefficient inside the argument | Apply \(T=2\pi/|b|\) formula mechanically    |

## 7. The textbook-precise statement
Let \(f:\mathbb{R}\to\mathbb{R}\). Then \(f\) is **periodic with period \(T>0\)** if \(f(x+T)=f(x)\) for all \(x\) and no smaller positive number satisfies the identity. The **fundamental period** is the infimum of all such \(T\). The **amplitude** of a periodic function is half the difference between its supremum and infimum when those are finite.

The functions \(\sin x\) and \(\cos x\) each have fundamental period \(2\pi\) and amplitude 1; \(\tan x\) has fundamental period \(\pi\) and is unbounded. (Stewart, *Calculus*, 9e, §1.4 and §3.4.)

## 8. Visual — diagram or schematic
```text
y
1 |   .     .     .     .     .     .
  |  / \   / \   / \   / \   / \   /
  | /   \ /   \ /   \ /   \ /   \ /
0 |/     \     \     \     \     \
  |\     /     /     /     /     /
  | \   / \   / \   / \   / \   /
-1 |  \ /   \ /   \ /   \ /   \ /
  +----+----+----+----+----+----+----> x
   0   π/2  π   3π/2  2π  5π/2  3π
       ↑sin x zeros          ↑repeat
       cos x max/min
```
Vertical dashed lines at odd multiples of \(\pi/2\) mark \(\tan x\) asymptotes; the sine wave crosses zero at every integer multiple of \(\pi\), cosine at every odd multiple of \(\pi/2\).

## 9. The memory technique
**The hook**  
Picture a single runner on a circular track of radius 1: every full lap (distance \(2\pi\)) the shadow on the wall repeats its height exactly—sine is that shadow.

**What to overlearn**  
- Period of \(\sin x\), \(\cos x\): exactly \(2\pi\).  
- Period of \(\tan x\): exactly \(\pi\).  
- Amplitude of both sine and cosine on the unit circle: exactly 1.

**Spaced-repetition schedule**  
Review the three periods at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

**First-principles fallback**  
Re-derive the period by solving \(f(x+T)=f(x)\) using the angle-addition formulas and the smallest positive \(T\).

## 10. What this unlocks
Mastery of these three base graphs supplies the reference curves for every subsequent transformation and for the definitions of the inverse trigonometric functions.  

- Phase shifts and amplitude scalings become visual translations and stretches.  
- Fourier series are linear combinations of these exact shapes.  
- Differential equations \(y'' + \omega^2 y = 0\) have solutions built directly from \(\sin(\omega x)\) and \(\cos(\omega x)\).  
- Stability analysis of linear oscillators reduces to locating zeros and extrema of these functions.

## 11. Self-check — five questions, no answers
1. Without a calculator, state the exact x-coordinates of the first three positive zeros of \(\cos x\).

2. A function \(g(x)=\sin(bx)\) has fundamental period \(4\pi\). Determine the positive constant \(b\).

3. Sketch, on the same axes, one full period of both \(\sin x\) and \(\tan x\), labelling all intercepts and asymptotes.

4. Explain why replacing every occurrence of \(x\) by \(x+\pi\) leaves \(\tan x\) unchanged but multiplies \(\sin x\) by −1.

5. A certain periodic signal has amplitude 3 and repeats every \(3\pi/2\). Which of \(\sin x\), \(\cos x\), or \(\tan x\) could possibly be the underlying shape after scaling and shifting? Justify in one sentence.