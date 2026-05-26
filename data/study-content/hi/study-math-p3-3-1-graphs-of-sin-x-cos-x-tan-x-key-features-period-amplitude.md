## 1. The one-sentence answer
**The graphs of \(\sin x\), \(\cos x\), and \(\tan x\) are periodic functions whose shapes repeat after fixed intervals (period \(2\pi\) for sine and cosine, \(\pi\) for tangent) while amplitude fixes the peak height of \(\sin x\) and \(\cos x\)**.

Iska matlab yeh hai ki jab aap in functions ko plot karte hain, toh har ek apni wave ko ek fixed distance ke baad exactly repeat karta hai. Sine aur cosine dono ek smooth up-down motion banate hain jo zero se shuru hota hai (sine) ya maximum se (cosine), lekin dono ka maximum height exactly 1 hota hai jab coefficient 1 ho. Tangent alag hai kyunki uske graph mein vertical lines ke paas values infinity tak jaati hain aur har \(\pi\) distance par repeat hota hai.

Aap in graphs ko samajhna isliye zaroori hai kyunki yeh almost har advanced trigonometric identity aur differential equation ki foundation banate hain. Period aur amplitude ko alag-alag dekhna seekhna zaroori hai taaki jab aap \(a\sin(bx+c)\) jaise transformed versions dekho toh turant samajh aaye ki graph kaise stretch ya shift hoga.

> [!NOTE]
> Sabse badi aha yeh hai ki period sirf x-axis par repeat hone ki doori hai, amplitude sirf y-axis par height control karta hai—dono independent parameters hain.

## 2. Why this matters — concrete and current
In aerospace, NASA’s attitude control systems for satellites use real-time sine and cosine wave modelling to predict periodic torque disturbances caused by solar radiation pressure; the exact period \(2\pi\) helps engineers set sampling rates in their Kalman filters.

In semiconductor manufacturing, ASML’s extreme-ultraviolet lithography machines rely on precise phase-locked loops whose reference signals are generated from cosine waves; amplitude stability directly determines overlay accuracy below 1 nm.

In machine-learning hardware, Google’s TPU v4 clusters employ sinusoidal positional encodings whose period and amplitude are tuned so that attention layers can distinguish token positions separated by thousands of steps without numerical overflow.

In fundamental physics, LIGO’s gravitational-wave strain data is matched against templates that contain \(\sin(2\pi f t)\) and \(\cos(2\pi f t)\) chirps; any miscalculation of period immediately raises the false-alarm rate in the detection pipeline.

In audio engineering, Sony’s noise-cancelling headphones generate anti-phase cosine waves whose amplitude is adaptively matched to incoming cabin noise; period error produces audible beating artefacts.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Unit circle      | Sine and cosine are defined as y- and x-coordinates on the unit circle, giving immediate intuition for period and amplitude. |
| Radian measure   | All periods (\(2\pi\), \(\pi\)) are expressed in radians; degree thinking breaks the formulas. |
| Function domain & range | You must know where \(\tan x\) is undefined to locate its vertical asymptotes correctly. |
| Basic limits     | \(\lim_{x\to\pi/2}\tan x=\infty\) explains why the graph never crosses the asymptotes. |

Agar unit circle ya radian measure weak hai toh pehle woh revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the unit circle definition
Sine aur cosine ko unit circle par point ke coordinates ke roop mein socho. Jab angle \(x\) badhta hai, point ghoomta rehta hai aur coordinates regularly repeat hote hain.

Example: \(x=0\) par point (1,0) hai, isliye \(\cos0=1\), \(\sin0=0\). Jab \(x=\pi/2\) ho jaata hai, point (0,1) ban jaata hai.

Formal statement:
\[
\sin x = y\text{-coordinate of }(\cos x,\sin x)\text{ on unit circle}.
\]

> [!WARNING]
> Agar aap yahan degree aur radian mix kar doge toh period galat niklega aur saare graphs shift ho jaayenge.

### Step 2 — Observe one full rotation
Ek baar \(x\) ko \(0\) se \(2\pi\) tak le jaao. Point wapas apni starting position par aa jaata hai, isliye dono functions repeat hote hain.

Formal statement:
\[
\sin(x+2\pi)=\sin x,\qquad\cos(x+2\pi)=\cos x.
\]

### Step 3 — Measure amplitude
Sine aur cosine ke values hamesha \([-1,1]\) ke beech rehte hain. Isko amplitude kehte hain.

Formal statement:
\[
\text{Amplitude of }\sin x\text{ and }\cos x = 1.
\]

### Step 4 — Locate zeros and extrema
Sine zero hota hai \(x=k\pi\), maximum \(1\) at \(\pi/2+2k\pi\), minimum \(-1\) at \(3\pi/2+2k\pi\).

### Step 5 — Introduce tangent
\(\tan x=\sin x/\cos x\). Jab \(\cos x=0\) hota hai (odd multiples of \(\pi/2\)), function undefined ho jaata hai aur vertical asymptotes banti hain.

Formal statement:
\[
\tan(x+\pi)=\tan x,\qquad\text{period }=\pi.
\]

### Step 6 — Write the general transformed form
Ab aap dekh sakte hain ki \(y=a\sin(bx+c)+d\) mein amplitude \(|a|\), period \(2\pi/|b|\) hota hai.

### Step 7 — State domain and range precisely
- Domain of \(\sin x,\cos x\): \(\mathbb{R}\)
- Range: \([-1,1]\)
- Domain of \(\tan x\): \(\mathbb{R}\setminus\{\frac{\pi}{2}+k\pi\}\)
- Range: \(\mathbb{R}\)

### Step 8 — Textbook-grade closure
The functions \(\sin x\), \(\cos x\), and \(\tan x\) are continuous and differentiable on their domains, periodic with periods \(2\pi\), \(2\pi\), and \(\pi\) respectively, and bounded (except \(\tan x\)) with the amplitude of the first two equal to 1.

## 5. Worked examples — har step show karo

**Example 1 — Basic period identification**
*Given:* \(y=\sin x\)
*Find:* Period
Step 1: Unit circle se \(x=0\) se \(x=2\pi\) tak ek cycle complete hota hai.  
*Why:* Kyunki \(\sin(x+2\pi)=\sin x\) identity se prove hota hai.  
**Final answer** \(2\pi\)

*Reflection:* Yeh example isliye simple thi kyunki koi coefficient nahi tha; jab \(b\) aayega toh period \(2\pi/|b|\) ban jaayega.

**Example 2 — Amplitude from coefficient**
*Given:* \(y=3\cos x\)
*Find:* Amplitude
Step 1: \(\cos x\) ka range \([-1,1]\) hai.  
Step 2: Multiply by 3 stretches y-values to \([-3,3]\).  
*Why:* Scaling outside the function multiplies the range directly.  
**Final answer** amplitude = 3

*Reflection:* Students aksar amplitude ko period ke saath confuse karte hain; yeh example clearly alag karta hai.

**Example 3 — Locate asymptotes of tangent**
*Given:* \(y=\tan x\)
*Find:* First two positive vertical asymptotes
Step 1: \(\tan x\) undefined jab \(\cos x=0\), i.e., \(x=\frac{\pi}{2}+k\pi\).  
Step 2: \(k=0\) → \(\pi/2\); \(k=1\) → \(3\pi/2\).  
*Why:* Denominator zero hone par function infinity ki taraf jaata hai.  
**Final answer** \(x=\pi/2\), \(x=3\pi/2\)

*Reflection:* Asymptotes period \(\pi\) ke hisaab se har \(\pi\) mein ek baar aati hain.

**Example 4 — Combined period and amplitude**
*Given:* \(y=2\sin(3x)\)
*Find:* Period and amplitude
Step 1: Amplitude = coefficient of sine = 2.  
Step 2: Period = \(2\pi/|3|\) = \(2\pi/3\).  
*Why:* General formula \(2\pi/|b|\) apply kiya.  
**Final answer** amplitude 2, period \(2\pi/3\)

*Reflection:* Dono parameters ek saath maangne se student ko confirm hota hai ki woh independent hain.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using \(360^\circ\) instead of \(2\pi\) for period | Degree habit from school                    | Always convert to radians before applying formulas |
| Forgetting tan period is \(\pi\) not \(2\pi\) | Sine/cosine se analogy galat lagti hai     | Explicitly derive from \(\tan(x+\pi)=\tan x\) |
| Thinking amplitude of tan exists  | Graph unbounded dikhta hai                  | Recall range of tan is all real numbers      |
| Missing vertical shift in range   | Sirf amplitude dekhna                       | Range = \([d-|a|,d+|a|]\) likho pehle        |
| Plotting tan at \(x=\pi/2\)       | Calculator error ya oversight               | Domain check karo pehle, undefined points mark karo |
| Confusing leading coefficient with period | \(a\sin(bx)\) mein a aur b ko mix karna   | Period formula mein sirf b use karo          |
| Sketching sine starting from (0,1)| Cosine graph yaad ho jaata hai              | Zero check: sin 0 = 0, cos 0 = 1             |

## 7. The textbook-precise statement
The functions \(\sin:\mathbb{R}\to[-1,1]\) and \(\cos:\mathbb{R}\to[-1,1]\) are continuous, infinitely differentiable, and \(2\pi\)-periodic. The function \(\tan x=\sin x/\cos x\) is defined and continuous on \(\mathbb{R}\setminus\{\pi/2+k\pi\mid k\in\mathbb{Z}\}\) and is \(\pi\)-periodic. The amplitude of \(a\sin x\) and \(a\cos x\) is defined to be \(|a|\). (Thomas’ Calculus, 15th ed., §1.3–1.4)

## 8. Visual — diagram or schematic
```
y
^
|     .     .     .          sin x (solid)
|   .   . .   . .   .     
| .       .       .   .   
0---------+---------+---------+--> x
|         π/2       π       3π/2
|     cos x (dotted) starts at (0,1)
|
| tan x: vertical asymptotes at π/2, 3π/2, ...
```

## 9. The memory technique
**The hook** — Imagine a Ferris wheel: one full rotation (\(2\pi\)) brings every seat back to the same height (sine wave); the height of the wheel itself is the amplitude.

**What to overlearn** — Period of \(\sin x,\cos x = 2\pi\); period of \(\tan x = \pi\); amplitude of \(a\sin(bx) = |a|\).

**Spaced-repetition schedule** — Review graphs after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Unit circle se \(x\) badhao, coordinates note karo, repeat distance count karo; amplitude ke liye max-minus-min divide by 2.

## 10. What this unlocks
Yeh graphs aapko transformed trigonometric functions, Fourier series, differential equations, aur harmonic motion modelling ke liye taiyar karte hain.

- Graphing \(y=a\sin(bx+c)+d\)
- Solving \(\sin x = k\) graphically
- Understanding Fourier coefficients
- Simple harmonic motion equations
- AC circuit phasor diagrams

## 11. Self-check — five questions, no answers
1. Without plotting, state the period and amplitude of \(y=4\cos(5x)\).
2. At how many points in \([0,2\pi)\) does \(\tan x\) have vertical asymptotes?
3. If the amplitude of a sine wave doubles and its period halves, write the new function if the original was \(\sin x\).
4. Why can \(\tan x\) never have a defined amplitude?
5. A student claims the range of \(2\sin x+3\) is \([-2,2]\). Identify the mistake.