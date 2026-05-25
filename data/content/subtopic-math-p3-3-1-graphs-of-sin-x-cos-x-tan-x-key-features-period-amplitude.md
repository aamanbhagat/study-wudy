## What it is
The graphs of $\sin x$, $\cos x$, and $\tan x$ are visual representations of how the trigonometric ratios change as an angle $x$ increases. They map the continuous rotation of a point around a circle onto a flat, unrolled Cartesian coordinate system. This reveals repeating wave-like patterns defined by their maximum height (amplitude) and the horizontal length of one full cycle (period).

## Why it matters
These graphs are the fundamental building blocks of all periodic phenomena in the universe. In aerospace engineering and physics, they model orbital mechanics, electromagnetic waves, and mechanical vibrations. In computer science, Fourier analysis relies on combinations of these exact sine and cosine graphs to compress audio files, process radar signals, and train certain machine learning models on time-series data. 

## When to study it
You must already understand:
1. The unit circle (angles in radians, coordinates as $(\cos \theta, \sin \theta)$).
2. Basic right-triangle trigonometry (SOH CAH TOA).
3. Core function transformations (how $f(x)$ relates to $A \cdot f(Bx)$).
If you cannot instantly visualize where $\frac{\pi}{2}$ or $\pi$ is on the unit circle, stop and master that first.

## How to study it (step by step)
1. **Unroll the unit circle:** Plot $y = \sin x$ by evaluating the $y$-coordinate of the unit circle at $x = 0, \frac{\pi}{2}, \pi, \frac{3\pi}{2}, 2\pi$. Connect them with a smooth curve.
2. **Shift for cosine:** Repeat the process for $y = \cos x$ using the $x$-coordinate of the unit circle. Notice it is the exact same curve as sine, just shifted left by $\frac{\pi}{2}$.
3. **Divide for tangent:** Plot $y = \tan x$ by calculating $\frac{\sin x}{\cos x}$. Identify where $\cos x = 0$ to place your vertical asymptotes (walls the graph cannot cross).
4. **Manipulate amplitude:** Graph $y = 2\sin x$ and $y = \frac{1}{2}\sin x$. Observe how the multiplier outside the function stretches or compresses the wave vertically.
5. **Manipulate period:** Graph $y = \sin(2x)$ and $y = \sin(\frac{x}{2})$ by calculating where the cycle completes (e.g., set $2x = 2\pi$ and solve for $x$). Observe the horizontal compression or stretch.

## Key ideas, with intuition
**1. Amplitude ($A$)**
The maximum displacement from the center line. For $y = A \sin x$ or $y = A \cos x$, the amplitude is $|A|$. 
*Intuition:* This is how "loud" a sound wave is, or how far a pendulum swings from rest. 
*Note:* $\tan x$ has no amplitude because its graph shoots to infinity.

**2. Period ($T$)**
The horizontal length of one complete cycle. 
For $y = \sin(Bx)$ or $y = \cos(Bx)$, the period is:
$$T = \frac{2\pi}{|B|}$$
For $y = \tan(Bx)$, the base period is only $\pi$ (since tangent repeats every half-circle), so:
$$T = \frac{\pi}{|B|}$$
*Intuition:* This is how long it takes the point on the unit circle to complete one full lap. A larger $B$ means the angle is spinning faster, so the period (time for one lap) is shorter.

**3. Asymptotes of Tangent**
Because $\tan x = \frac{\sin x}{\cos x}$, the function is undefined whenever the denominator is zero. Since $\cos x = 0$ at $x = \pm\frac{\pi}{2}, \pm\frac{3\pi}{2}, \dots$, vertical asymptotes exist at these locations. The graph approaches $\pm\infty$ as it gets infinitely close to these lines.

## Worked example
**Problem:** Graph one full period of $y = -3 \cos(2x)$ and identify its amplitude and period.

**Step 1: Identify amplitude.** 
$A = |-3| = 3$. The amplitude is 3. The negative sign means the standard cosine graph is reflected across the $x$-axis (it will start at a trough instead of a peak).

**Step 2: Identify period.** 
The internal multiplier is $B = 2$. 
$$T = \frac{2\pi}{2} = \pi$$
One full wave fits between $x = 0$ and $x = \pi$.

**Step 3: Find key points.** 
Divide the period ($\pi$) into 4 equal intervals to find the peaks, troughs, and zero-crossings. The step size is $\frac{\pi}{4}$.
*   $x = 0$: $y = -3\cos(0) = -3$
*   $x = \frac{\pi}{4}$: $y = -3\cos(\frac{\pi}{2}) = 0$
*   $x = \frac{\pi}{2}$: $y = -3\cos(\pi) = 3$
*   $x = \frac{3\pi}{4}$: $y = -3\cos(\frac{3\pi}{2}) = 0$
*   $x = \pi$: $y = -3\cos(2\pi) = -3$

**Step 4: Plot.** 
Plot these five coordinates $(0,-3), (\frac{\pi}{4},0), (\frac{\pi}{2},3), (\frac{3\pi}{4},0), (\pi,-3)$ and connect them with a smooth, U-shaped curve.

*Reflection:* By extracting $A$ and $B$ first, we define the "bounding box" the wave fits into. Evaluating the quarter-period points guarantees we map the anatomy of the wave perfectly without guessing.

## Diagrams

```text
y = sin(x)
  1 |       *       
    |     *   *     
  0 |---*-------*-------*---> x
    | 0   pi/2  pi    3pi/2  2pi
 -1 |             *   *   
    |               *       

y = cos(x)
  1 |   *               *
    |     *           *
  0 |-------*-------*-------> x
    | 0   pi/2  pi  3pi/2 2pi
 -1 |         *   *
    |           *

y = tan(x)
    |  |   *   |       |
    |  |  *    |       |
  0 |-*|-------|-*-----|-> x
    |  | *     |       |
    |  |*      |       |
     -pi/2    pi/2   3pi/2
```

## Memory technique — remember this forever
1. **Visual Hook:** 
   * "**S**ine starts at the **S**ign" (the origin, $0$). 
   * "**C**osine starts at the **C**rown" (the peak, $1$). 
   * "Tangent is a **Tan line**" cutting diagonally across the asymptotes.
2. **Overlearn these formulas:** 
   * Sin/Cos Period: $T = \frac{2\pi}{|B|}$
   * Tan Period: $T = \frac{\pi}{|B|}$
3. **Spaced-repetition schedule:** Review these graphs and period formulas at 1 day, 3 days, 7 days, 16 days, and 35 days. Draw them from memory each time.
4. **First principles pathway:** If you forget the graphs, draw a unit circle. Pick an angle (e.g., $0, \frac{\pi}{2}, \pi$). The $y$-coordinate is your sine value. The $x$-coordinate is your cosine value. Plot those values on a grid. You have just rebuilt the graphs from scratch.

## Common mistakes
* **Confusing the period formulas:** Students frequently use $2\pi/B$ for tangent, or $\pi/B$ for sine/cosine. Tangent repeats twice as fast on the unit circle.
* **Negative amplitude:** Stating the amplitude of $y = -4\sin x$ is $-4$. Amplitude is a physical distance (height); it is always positive ($|-4| = 4$). The negative is just a reflection.
* **Drawing zig-zags:** Drawing sine and cosine as sharp triangles. The rate of change slows down at the peaks and troughs (the derivative is zero). They must be smooth, rounded curves.

## Self-check
1. What is the amplitude and period of $y = 5\sin(4\pi x)$?
2. Find the equations of the first two positive vertical asymptotes for $y = \tan(3x)$.
3. A weight on a spring oscillates from a maximum height of 10 cm to a minimum of 2 cm, completing a full cycle every 4 seconds. Write a cosine function $y = A \cos(Bx) + D$ to model its height over time $x$. *(Hint: Amplitude is half the total distance from max to min).*