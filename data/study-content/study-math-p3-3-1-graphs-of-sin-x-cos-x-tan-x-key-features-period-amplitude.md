## 1. What it is — in plain English

Imagine you have a magic pen that can draw a picture of how something changes over time or as another quantity varies. That picture is called a graph. In mathematics, we often use graphs to visualize functions, which are like rules that tell you how one number is related to another.

Now, think about the sine, cosine, and tangent functions. These are special rules that relate an angle to certain ratios in a right-angled triangle, or more generally, to coordinates on a circle. When we talk about the "graphs of sin x, cos x, tan x," we're simply drawing a picture of how the value of sine, cosine, or tangent changes as the angle 'x' changes.

For sine and cosine, these graphs look like smooth, continuous waves, endlessly repeating up and down. Think of a rollercoaster track that never ends, or a perfectly calm ocean wave. The tangent graph is a bit different; it looks like a series of S-shaped curves that shoot off to infinity and then reappear from negative infinity, also repeating. These graphs are fundamental because they describe patterns that show up everywhere in the natural world.

## 2. Why it matters — real-world applications

The graphs of trigonometric functions are not just abstract mathematical constructs; they are the language of periodicity and oscillation, found throughout science and engineering. Understanding their features is crucial for modeling and predicting real-world phenomena.

1.  **Electrical Engineering (AC Circuits):** The flow of Alternating Current (AC) electricity, which powers our homes and cities, is fundamentally sinusoidal. The voltage and current in an AC circuit oscillate over time, following the shape of a sine or cosine wave. Engineers use these graphs to design power grids, analyze circuit behavior, and ensure the stable delivery of electricity. Companies like Siemens and General Electric heavily rely on this understanding for their power generation and distribution systems.

2.  **Physics (Waves and Oscillations):** From sound waves traveling through the air, to light waves, to the vibrations of a spring or the swing of a pendulum, many physical phenomena exhibit periodic motion. These can all be modeled using sine and cosine functions. For instance, seismologists use sinusoidal models to understand earthquake waves, and physicists use them to describe the behavior of particles in quantum mechanics. Aerospace engineers use these principles to analyze vibrations in aircraft structures.

3.  **Computer Graphics and Animation:** To create realistic movement, wave effects (like water surfaces or flapping flags), or smooth transitions in animations, computer graphics artists and programmers frequently employ trigonometric functions. The periodic nature of sine and cosine allows for the creation of seamless looping animations and natural-looking oscillations, crucial in video games, film special effects (e.g., Pixar, Industrial Light & Magic), and virtual reality.

4.  **Biology and Medicine:** Many biological rhythms are periodic. For example, heartbeats (as seen on an ECG), brain waves (EEG), and even population cycles of certain species can be approximated and analyzed using trigonometric functions. This helps medical professionals diagnose conditions and researchers understand ecological dynamics.

5.  **Signal Processing and Telecommunications:** When you listen to music, make a phone call, or use Wi-Fi, the information is transmitted as waves. Signal processing involves breaking down complex signals into their fundamental sine and cosine components (Fourier analysis), filtering out noise, and reconstructing the original signal. This is critical for technologies developed by companies like Qualcomm for mobile communication and NVIDIA for digital signal processing.

## 3. Prerequisites — what you must know first

Before diving into the graphs of trigonometric functions, ensure you have a solid grasp of the following concepts. If any of these feel unfamiliar, pause and review them thoroughly.

*   **Basic Algebra & Functions:**
    *   **Variables and Equations:** Understanding how variables represent unknown quantities and how to manipulate equations.
    *   **Coordinate Plane:** Familiarity with the x-axis, y-axis, origin, and plotting points $(x, y)$.
    *   **Functions:** The concept of a function $y = f(x)$, where each input $x$ has exactly one output $y$.
    *   **Domain and Range:** What inputs are allowed (domain) and what outputs are possible (range) for a function.
*   **Unit Circle Definition of Trigonometric Functions:**
    *   **Angles in Standard Position:** How angles are measured counter-clockwise from the positive x-axis.
    *   **Unit Circle:** A circle with radius 1 centered at the origin.
    *   **Definition of $\sin \theta$, $\cos \theta$, $\tan \theta$:** For a point $(x,y)$ on the unit circle corresponding to an angle $\theta$, $\cos \theta = x$, $\sin \theta = y$, and $\tan \theta = y/x$.
*   **Special Angles:**
    *   Knowing the exact values of sine, cosine, and tangent for common angles like $0, \pi/6, \pi/4, \pi/3, \pi/2, \pi, 3\pi/2, 2\pi$ (or $0^\circ, 30^\circ, 45^\circ, 60^\circ, 90^\circ, 180^\circ, 270^\circ, 360^\circ$).
*   **Radians:**
    *   Understanding radians as an alternative unit for measuring angles, and how to convert between degrees and radians ($\pi \text{ radians} = 180^\circ$). All graphing in advanced mathematics uses radians for the x-axis.

## 4. The core idea — step by step

Let's build the intuition for the graphs of sine, cosine, and tangent functions from the ground up, starting with their definition on the unit circle.

### Step 1: Connecting the Unit Circle to Graphing

**Plain English:** Imagine a point moving around a circle of radius 1, starting from the point $(1,0)$. As this point moves, its height above the x-axis changes, and its horizontal distance from the y-axis changes. We're going to make a graph where the horizontal axis represents the angle the point has traveled, and the vertical axis represents either its height (for sine) or its horizontal distance (for cosine).

**Concrete Example:**
Consider a point $P(x,y)$ on the unit circle.
*   When the angle is $0$ radians (starting point), $P$ is at $(1,0)$. Its height is $0$, its horizontal distance is $1$.
*   When the angle is $\pi/2$ radians (90 degrees), $P$ is at $(0,1)$. Its height is $1$, its horizontal distance is $0$.
*   When the angle is $\pi$ radians (180 degrees), $P$ is at $(-1,0)$. Its height is $0$, its horizontal distance is $-1$.
*   When the angle is $3\pi/2$ radians (270 degrees), $P$ is at $(0,-1)$. Its height is $-1$, its horizontal distance is $0$.
*   When the angle is $2\pi$ radians (360 degrees), $P$ is back at $(1,0)$. Its height is $0$, its horizontal distance is $1$.

**Formal/Mathematical Version:**
For an angle $\theta$ measured counter-clockwise from the positive x-axis, let $(x,y)$ be the coordinates of the point where the terminal side of the angle intersects the unit circle.
The trigonometric functions are defined as:
$$ \sin \theta = y $$
$$ \cos \theta = x $$
$$ \tan \theta = \frac{y}{x}, \quad x \neq 0 $$
When we graph these functions, the x-axis of our graph will represent the angle $\theta$ (usually denoted as $x$ in the function $y=f(x)$), and the y-axis will represent the value of $\sin x$, $\cos x$, or $\tan x$.

**What could go wrong:** Students often confuse which coordinate corresponds to sine and which to cosine. Remember: "x-coordinate is cosine" and "y-coordinate is sine" (alphabetical order for x,y and c,s doesn't work, so a mnemonic might be "vertical is sine, horizontal is cosine").

### Step 2: Graphing $y = \sin x$

**Plain English:** We're plotting the vertical position (height) of a point on the unit circle as we sweep through different angles. Start at angle 0, the height is 0. As the angle increases to $\pi/2$, the height goes up to 1. Then as the angle goes to $\pi$, the height comes back down to 0. From $\pi$ to $3\pi/2$, the height goes down to -1. Finally, from $3\pi/2$ to $2\pi$, it comes back up to 0. This completes one full cycle.

**Concrete Example:** Let's plot some key points for $y = \sin x$:
| $x$ (angle) | Point on Unit Circle $(x_c, y_c)$ | $y = \sin x$ |
| :---------- | :-------------------------------- | :----------- |
| $0$         | $(1,0)$                           | $0$          |
| $\pi/2$     | $(0,1)$                           | $1$          |
| $\pi$       | $(-1,0)$                          | $0$          |
| $3\pi/2$    | $(0,-1)$                          | $-1$         |
| $2\pi$      | $(1,0)$                           | $0$          |

If we plot these points and connect them with a smooth curve, we get the characteristic wave shape. Since going beyond $2\pi$ or below $0$ on the unit circle just repeats the same positions, the graph of $y = \sin x$ also repeats this wave pattern indefinitely in both directions.

**Formal/Mathematical Version:**
The function is $f(x) = \sin x$.
Its graph is a continuous wave that passes through the origin $(0,0)$.
Key points in one cycle $[0, 2\pi]$:
$$ (0,0), (\pi/2, 1), (\pi, 0), (3\pi/2, -1), (2\pi, 0) $$

**What could go wrong:** Students might draw sharp corners at the peaks and troughs instead of smooth curves, or assume the function stops after $2\pi$. Remember it's a continuous, smooth wave.

### Step 3: Key Features of $y = \sin x$

**Plain English:** These are the important characteristics that define the sine wave.
*   **Period:** How long it takes for the wave to complete one full cycle and start repeating itself.
*   **Amplitude:** How "tall" the wave is, measured from its center line to its peak (or trough).
*   **Domain:** All the possible input angles 'x'.
*   **Range:** All the possible output values 'y' (the heights).
*   **Intercepts:** Where the graph crosses the x-axis or y-axis.
*   **Symmetry:** Whether the graph looks the same if you flip it over an axis or rotate it around the origin.

**Concrete Example:**
Looking at the points from Step 2:
*   The pattern of values $0, 1, 0, -1, 0$ repeats every $2\pi$ radians.
*   The maximum value is $1$ and the minimum is $-1$. The center line is $y=0$.

**Formal/Mathematical Version:**
*   **Period:** The smallest positive value $P$ such that $f(x+P) = f(x)$ for all $x$. For $y = \sin x$, the period is $2\pi$.
    $$ \sin(x+2\pi) = \sin x $$
*   **Amplitude:** Half the distance between the maximum and minimum values. For $y = \sin x$, the maximum is $1$ and the minimum is $-1$.
    $$ \text{Amplitude} = \frac{1 - (-1)}{2} = \frac{2}{2} = 1 $$
*   **Domain:** The set of all real numbers.
    $$ D = (-\infty, \infty) $$
*   **Range:** The set of all real numbers between -1 and 1, inclusive.
    $$ R = [-1, 1] $$
*   **x-intercepts:** Occur where $\sin x = 0$. This happens at integer multiples of $\pi$.
    $$ x = n\pi, \quad \text{where } n \text{ is an integer} $$
*   **y-intercept:** Occurs where $x=0$.
    $$ y = \sin(0) = 0 \Rightarrow (0,0) $$
*   **Symmetry:** $\sin(-x) = -\sin x$. This means $y = \sin x$ is an **odd function**, symmetric with respect to the origin.

**What could go wrong:** Confusing the definition of amplitude (half the total height) or incorrectly stating the period as $\pi$ instead of $2\pi$.

### Step 4: Graphing $y = \cos x$

**Plain English:** Similar to sine, but this time we're plotting the horizontal position of the point on the unit circle. Start at angle 0, the horizontal position is 1. As the angle increases to $\pi/2$, the horizontal position goes to 0. Then as the angle goes to $\pi$, it goes to -1. From $\pi$ to $3\pi/2$, it comes back up to 0. Finally, from $3\pi/2$ to $2\pi$, it goes back to 1. This also completes one full cycle. Notice that this looks exactly like the sine wave, but shifted!

**Concrete Example:** Let's plot some key points for $y = \cos x$:
| $x$ (angle) | Point on Unit Circle $(x_c, y_c)$ | $y = \cos x$ |
| :---------- | :-------------------------------- | :----------- |
| $0$         | $(1,0)$                           | $1$          |
| $\pi/2$     | $(0,1)$                           | $0$          |
| $\pi$       | $(-1,0)$                          | $-1$         |
| $3\pi/2$    | $(0,-1)$                          | $0$          |
| $2\pi$      | $(1,0)$                           | $1$          |

Plotting these points and connecting them smoothly gives the cosine wave. It's essentially the sine wave shifted left by $\pi/2$.

**Formal/Mathematical Version:**
The function is $f(x) = \cos x$.
Its graph is a continuous wave that passes through $(0,1)$.
Key points in one cycle $[0, 2\pi]$:
$$ (0,1), (\pi/2, 0), (\pi, -1), (3\pi/2, 0), (2\pi, 1) $$
This relationship between sine and cosine graphs is called a **phase shift**: $\cos x = \sin(x + \pi/2)$.

**What could go wrong:** Drawing the cosine graph starting at $(0,0)$ like sine, or not recognizing its similarity to sine.

### Step 5: Key Features of $y = \cos x$

**Plain English:** The cosine wave shares many features with the sine wave, like its period and amplitude, but its starting point and symmetry are different.

**Concrete Example:**
*   The pattern of values $1, 0, -1, 0, 1$ repeats every $2\pi$ radians.
*   The maximum value is $1$ and the minimum is $-1$.

**Formal/Mathematical Version:**
*   **Period:** $2\pi$.
    $$ \cos(x+2\pi) = \cos x $$
*   **Amplitude:** $1$.
    $$ \text{Amplitude} = \frac{1 - (-1)}{2} = 1 $$
*   **Domain:** The set of all real numbers.
    $$ D = (-\infty, \infty) $$
*   **Range:** The set of all real numbers between -1 and 1, inclusive.
    $$ R = [-1, 1] $$
*   **x-intercepts:** Occur where $\cos x = 0$. This happens at odd multiples of $\pi/2$.
    $$ x = \frac{\pi}{2} + n\pi = (2n+1)\frac{\pi}{2}, \quad \text{where } n \text{ is an integer} $$
*   **y-intercept:** Occurs where $x=0$.
    $$ y = \cos(0) = 1 \Rightarrow (0,1) $$
*   **Symmetry:** $\cos(-x) = \cos x$. This means $y = \cos x$ is an **even function**, symmetric with respect to the y-axis.

**What could go wrong:** Incorrectly identifying x-intercepts or confusing the symmetry type.

### Step 6: Graphing $y = \tan x$

**Plain English:** The tangent function is different. It's defined as the ratio of height to horizontal distance ($y/x$) on the unit circle. What happens when the horizontal distance ($x$) is zero? Division by zero! This means tangent is undefined at those angles, and the graph will have vertical lines called **asymptotes** where it shoots off to positive or negative infinity.

**Concrete Example:** Let's plot some key points for $y = \tan x$:
| $x$ (angle) | Point on Unit Circle $(x_c, y_c)$ | $y = \tan x = y_c/x_c$ |
| :---------- | :-------------------------------- | :--------------------- |
| $0$         | $(1,0)$                           | $0/1 = 0$              |
| $\pi/4$     | $(\sqrt{2}/2, \sqrt{2}/2)$        | $(\sqrt{2}/2)/(\sqrt{2}/2) = 1$ |
| $\pi/2$     | $(0,1)$                           | $1/0 = \text{Undefined}$ (Vertical Asymptote) |
| $3\pi/4$    | $(-\sqrt{2}/2, \sqrt{2}/2)$       | $(\sqrt{2}/2)/(-\sqrt{2}/2) = -1$ |
| $\pi$       | $(-1,0)$                          | $0/(-1) = 0$           |
| $5\pi/4$    | $(-\sqrt{2}/2, -\sqrt{2}/2)$      | $(- \sqrt{2}/2)/(-\sqrt{2}/2) = 1$ |
| $3\pi/2$    | $(0,-1)$                          | $-1/0 = \text{Undefined}$ (Vertical Asymptote) |
| $7\pi/4$    | $(\sqrt{2}/2, -\sqrt{2}/2)$       | $(-\sqrt{2}/2)/(\sqrt{2}/2) = -1$ |
| $2\pi$      | $(1,0)$                           | $0/1 = 0$              |

Notice that the pattern of values $0, 1, \text{undefined}, -1, 0$ repeats every $\pi$ radians, not $2\pi$.

**Formal/Mathematical Version:**
The function is $f(x) = \tan x = \frac{\sin x}{\cos x}$.
The graph consists of disconnected branches, each resembling an elongated 'S' shape.
Key points in one cycle $(-\pi/2, \pi/2)$:
$$ (-\pi/4, -1), (0,0), (\pi/4, 1) $$
Vertical asymptotes occur where $\cos x = 0$.

**What could go wrong:** Forgetting that tangent is undefined where cosine is zero, or drawing a continuous wave like sine/cosine.

### Step 7: Key Features of $y = \tan x$

**Plain English:** The tangent graph has a shorter repeating cycle than sine and cosine, no 'amplitude' in the same sense, and crucial vertical lines where it's undefined.

**Concrete Example:**
*   The pattern of values $0, 1, \text{undefined}, -1, 0$ repeats every $\pi$ radians.
*   The function goes to positive infinity near $\pi/2$ from the left, and negative infinity near $\pi/2$ from the right.

**Formal/Mathematical Version:**
*   **Period:** $\pi$.
    $$ \tan(x+\pi) = \tan x $$
*   **Amplitude:** Not defined, as the function extends to $\pm\infty$.
*   **Domain:** All real numbers except where $\cos x = 0$.
    $$ D = \{x \mid x \neq \frac{\pi}{2} + n\pi, \text{ where } n \text{ is an integer}\} $$
*   **Range:** The set of all real numbers.
    $$ R = (-\infty, \infty) $$
*   **x-intercepts:** Occur where $\sin x = 0$. This happens at integer multiples of $\pi$.
    $$ x = n\pi, \quad \text{where } n \text{ is an integer} $$
*   **y-intercept:** Occurs where $x=0$.
    $$ y = \tan(0) = 0 \Rightarrow (0,0) $$
*   **Symmetry:** $\tan(-x) = -\tan x$. This means $y = \tan x$ is an **odd function**, symmetric with respect to the origin.
*   **Vertical Asymptotes:** Occur at values of $x$ where the function is undefined (i.e., where $\cos x = 0$).
    $$ x = \frac{\pi}{2} + n\pi, \quad \text{where } n \text{ is an integer} $$

**What could go wrong:** Stating an amplitude for tangent, or incorrectly identifying its period as $2\pi$. Missing the vertical asymptotes is a very common error.

## 5. Worked examples — multiple, with every step shown

Let's walk through some examples to solidify your understanding of these graphs and their key features.

### Example 1: Sketching $y = \sin x$ over two periods and identifying its key features.

**Problem:** Sketch the graph of $y = \sin x$ for $x \in [-2\pi, 2\pi]$ and identify its period, amplitude, domain, and range.

**Given:** The function $y = \sin x$.
**Want:** A sketch of the graph over $[-2\pi, 2\pi]$ and its period, amplitude, domain, and range.

**Step 1: Determine key points for one period.**
We know one full cycle of $\sin x$ occurs from $0$ to $2\pi$.
The key points are:
*   At $x=0$, $y=\sin(0)=0$. (Starting point)
*   At $x=\pi/2$, $y=\sin(\pi/2)=1$. (Maximum)
*   At $x=\pi$, $y=\sin(\pi)=0$. (Mid-point)
*   At $x=3\pi/2$, $y=\sin(3\pi/2)=-1$. (Minimum)
*   At $x=2\pi$, $y=\sin(2\pi)=0$. (End of cycle)
*This step identifies the critical points (intercepts, max, min) that define the shape of one cycle.*

**Step 2: Extend the pattern to cover the desired interval.**
Since the period is $2\pi$, the pattern from $[0, 2\pi]$ will repeat.
For the interval $[-2\pi, 0]$:
*   At $x=-\pi/2$, $y=\sin(-\pi/2)=-1$. (Minimum)
*   At $x=-\pi$, $y=\sin(-\pi)=0$. (Mid-point)
*   At $x=-3\pi/2$, $y=\sin(-3\pi/2)=1$. (Maximum)
*   At $x=-2\pi$, $y=\sin(-2\pi)=0$. (Start of cycle)
*We use the periodic nature of the function to find points outside the initial $0$ to $2\pi$ range.*

**Step 3: Plot the points and draw a smooth curve.**
Plot the points identified in Steps 1 and 2:
$(-2\pi, 0), (-3\pi/2, 1), (-\pi, 0), (-\pi/2, -1), (0, 0), (\pi/2, 1), (\pi, 0), (3\pi/2, -1), (2\pi, 0)$.
Connect them with a smooth, continuous wave.
*Visualizing the graph by plotting these points helps to ensure the correct shape and flow.*

**Step 4: Identify the key features.**
*   **Period:** The graph completes one full oscillation every $2\pi$ units.
    $$ \text{Period} = 2\pi $$
*   **Amplitude:** The maximum value is $1$, and the minimum value is $-1$. The amplitude is half the difference.
    $$ \text{Amplitude} = \frac{\text{Max} - \text{Min}}{2} = \frac{1 - (-1)}{2} = \frac{2}{2} = 1 $$
*   **Domain:** Sine is defined for all real numbers.
    $$ \text{Domain} = (-\infty, \infty) $$
*   **Range:** The output values of sine always lie between -1 and 1, inclusive.
    $$ \text{Range} = [-1, 1] $$
*This step systematically lists the required characteristics directly from the function's definition and graph.*

**Final Answer:**
The sketch of $y = \sin x$ for $x \in [-2\pi, 2\pi]$ is a smooth wave passing through the origin, reaching a maximum of 1 and a minimum of -1.
The key features are:
*   **Period:** $2\pi$
*   **Amplitude:** $1$
*   **Domain:** $(-\infty, \infty)$
*   **Range:** $[-1, 1]$

**Reflection:** This example highlights the importance of understanding the unit circle to derive key points, and then using the concept of periodicity to extend the graph. The smooth, continuous nature of the sine wave is crucial.

### Example 2: Sketching $y = \cos x$ over one period and identifying its key features.

**Problem:** Sketch one full cycle of the graph $y = \cos x$ starting from $x=0$, and state its period, amplitude, domain, and range.

**Given:** The function $y = \cos x$.
**Want:** A sketch of one cycle starting from $x=0$ and its period, amplitude, domain, and range.

**Step 1: Determine key points for one period starting at $x=0$.**
One full cycle of $\cos x$ occurs from $0$ to $2\pi$.
The key points are:
*   At $x=0$, $y=\cos(0)=1$. (Starting maximum)
*   At $x=\pi/2$, $y=\cos(\pi/2)=0$. (Mid-point, x-intercept)
*   At $x=\pi$, $y=\cos(\pi)=-1$. (Minimum)
*   At $x=3\pi/2$, $y=\cos(3\pi/2)=0$. (Mid-point, x-intercept)
*   At $x=2\pi$, $y=\cos(2\pi)=1$. (End of cycle, back to maximum)
*These points define the characteristic "bucket" shape of the cosine wave's first cycle.*

**Step 2: Plot the points and draw a smooth curve.**
Plot the points: $(0, 1), (\pi/2, 0), (\pi, -1), (3\pi/2, 0), (2\pi, 1)$.
Connect them with a smooth, continuous curve.
*Ensuring the curve is smooth and passes through these points correctly is vital for an accurate sketch.*

**Step 3: Identify the key features.**
*   **Period:** The graph completes one full oscillation every $2\pi$ units.
    $$ \text{Period} = 2\pi $$
*   **Amplitude:** The maximum value is $1$, and the minimum value is $-1$.
    $$ \text{Amplitude} = \frac{1 - (-1)}{2} = 1 $$
*   **Domain:** Cosine is defined for all real numbers.
    $$ \text{Domain} = (-\infty, \infty) $$
*   **Range:** The output values of cosine always lie between -1 and 1, inclusive.
    $$ \text{Range} = [-1, 1] $$
*These features are directly derived from the standard definition of the cosine function.*

**Final Answer:**
The sketch of one full cycle of $y = \cos x$ starting from $x=0$ is a smooth wave that begins at its maximum, goes down to its minimum, and returns to its maximum.
The key features are:
*   **Period:** $2\pi$
*   **Amplitude:** $1$
*   **Domain:** $(-\infty, \infty)$
*   **Range:** $[-1, 1]$

**Reflection:** This example reinforces that cosine starts at its maximum (for $x=0$) unlike sine which starts at the origin. The amplitude and period remain the same as sine.

### Example 3: Sketching $y = \tan x$ over two periods and identifying its key features.

**Problem:** Sketch the graph of $y = \tan x$ for $x \in (-\pi, \pi)$ and identify its period, domain, range, and vertical asymptotes.

**Given:** The function $y = \tan x$.
**Want:** A sketch of the graph over $(-\pi, \pi)$ and its period, domain, range, and vertical asymptotes.

**Step 1: Identify vertical asymptotes.**
The function $y = \tan x = \frac{\sin x}{\cos x}$ is undefined when $\cos x = 0$.
Within the interval $(-\pi, \pi)$, $\cos x = 0$ at $x = -\pi/2$ and $x = \pi/2$.
These are our vertical asymptotes.
*Understanding where the denominator is zero is critical for identifying asymptotes of rational functions, including tangent.*

**Step 2: Determine key points for one period.**
The period of $\tan x$ is $\pi$. A convenient cycle to consider is $(-\pi/2, \pi/2)$.
*   As $x \to -\pi/2^+$, $y \to -\infty$. (Approaching asymptote from the right)
*   At $x=-\pi/4$, $y=\tan(-\pi/4)=-1$.
*   At $x=0$, $y=\tan(0)=0$. (Origin, x-intercept)
*   At $x=\pi/4$, $y=\tan(\pi/4)=1$.
*   As $x \to \pi/2^-$, $y \to \infty$. (Approaching asymptote from the left)
*These points and limits help define the characteristic 'S' shape between asymptotes.*

**Step 3: Extend the pattern to cover the desired interval.**
The interval $(-\pi, \pi)$ includes two full periods.
The cycle from $(-\pi/2, \pi/2)$ is one period.
The next cycle to the left would be from $(-3\pi/2, -\pi/2)$, but we only need up to $-\pi$.
So, we need the section from $x=-\pi$ to $x=-\pi/2$.
*   At $x=-\pi$, $y=\tan(-\pi)=0$. (x-intercept)
*   As $x \to -\pi/2^-$, $y \to \infty$. (Approaching asymptote from the left)
And the section from $x=\pi/2$ to $x=\pi$.
*   As $x \to \pi/2^+$, $y \to -\infty$. (Approaching asymptote from the right)
*   At $x=\pi$, $y=\tan(\pi)=0$. (x-intercept)
*We use the periodicity of $\tan x$ to plot points in the adjacent segments, remembering the asymptotes.*

**Step 4: Plot the points, draw the smooth curves, and indicate asymptotes.**
Draw vertical dashed lines at $x = -\pi/2$ and $x = \pi/2$.
Plot the points and connect them with smooth S-shaped curves that approach the asymptotes.
*   The curve from $-\pi$ to $-\pi/2$ starts at $(-\pi, 0)$, goes up towards $x=-\pi/2$.
*   The curve from $-\pi/2$ to $\pi/2$ passes through $(-\pi/4, -1)$, $(0,0)$, $(\pi/4, 1)$.
*   The curve from $\pi/2$ to $\pi$ starts from $x=\pi/2$ (from below) and goes up to $(\pi, 0)$.
*Careful drawing of the asymptotic behavior is crucial for the tangent graph.*

**Step 5: Identify the key features.**
*   **Period:** The graph completes one full oscillation every $\pi$ units.
    $$ \text{Period} = \pi $$
*   **Domain:** All real numbers except where $\cos x = 0$.
    $$ \text{Domain} = \{x \mid x \neq \frac{\pi}{2} + n\pi, \text{ where } n \text{ is an integer}\} $$
*   **Range:** All real numbers, as it extends infinitely in both positive and negative y-directions.
    $$ \text{Range} = (-\infty, \infty) $$
*   **Vertical Asymptotes:** Occur where $\cos x = 0$.
    $$ x = \frac{\pi}{2} + n\pi, \quad \text{where } n \text{ is an integer} $$
*These features are characteristic of the tangent function and must be explicitly stated.*

**Final Answer:**
The sketch of $y = \tan x$ for $x \in (-\pi, \pi)$ shows two full S-shaped cycles, separated by vertical asymptotes.
The key features are:
*   **Period:** $\pi$
*   **Domain:** $\{x \mid x \neq \frac{\pi}{2} + n\pi, n \in \mathbb{Z}\}$
*   **Range:** $(-\infty, \infty)$
*   **Vertical Asymptotes:** $x = \frac{\pi}{2} + n\pi$, for $n \in \mathbb{Z}$ (specifically $x = -\pi/2$ and $x = \pi/2$ in the given interval).

**Reflection:** The primary challenge with tangent graphs is correctly identifying and drawing the vertical asymptotes and understanding that there is no amplitude, as the range is infinite. The period being $\pi$ instead of $2\pi$ is also a common point of confusion.

### Example 4: Comparing the maximum values, minimum values, and y-intercepts of $y = \sin x$, $y = \cos x$, and $y = \tan x$.

**Problem:** For the functions $y = \sin x$, $y = \cos x$, and $y = \tan x$, compare their maximum values, minimum values, and y-intercepts.

**Given:** The three trigonometric functions.
**Want:** A comparison of their maximum values, minimum values, and y-intercepts.

**Step 1: Analyze $y = \sin x$.**
*   **Maximum Value:** From the unit circle definition ($y$-coordinate) and the graph, the highest point $\sin x$ reaches is $1$.
    $$ \max(\sin x) = 1 $$
*   **Minimum Value:** The lowest point $\sin x$ reaches is $-1$.
    $$ \min(\sin x) = -1 $$
*   **y-intercept:** When $x=0$, $y=\sin(0)=0$. So the y-intercept is $(0,0)$.
    $$ y\text{-intercept of } \sin x \text{ is } (0,0) $$
*This step recalls the established features of the sine function.*

**Step 2: Analyze $y = \cos x$.**
*   **Maximum Value:** From the unit circle definition ($x$-coordinate) and the graph, the highest point $\cos x$ reaches is $1$.
    $$ \max(\cos x) = 1 $$
*   **Minimum Value:** The lowest point $\cos x$ reaches is $-1$.
    $$ \min(\cos x) = -1 $$
*   **y-intercept:** When $x=0$, $y=\cos(0)=1$. So the y-intercept is $(0,1)$.
    $$ y\text{-intercept of } \cos x \text{ is } (0,1) $$
*This step recalls the established features of the cosine function.*

**Step 3: Analyze $y = \tan x$.**
*   **Maximum Value:** The graph of $\tan x$ extends infinitely upwards, so there is no finite maximum value.
    $$ \max(\tan x) = \text{undefined (approaches } \infty) $$
*   **Minimum Value:** The graph of $\tan x$ extends infinitely downwards, so there is no finite minimum value.
    $$ \min(\tan x) = \text{undefined (approaches } -\infty) $$
*   **y-intercept:** When $x=0$, $y=\tan(0)=0$. So the y-intercept is $(0,0)$.
    $$ y\text{-intercept of } \tan x \text{ is } (0,0) $$
*This step recalls the established features of the tangent function, noting its infinite range.*

**Step 4: Compare the results.**
*   **Maximum Values:** $\sin x$ and $\cos x$ both have a maximum value of $1$. $\tan x$ has no maximum value.
*   **Minimum Values:** $\sin x$ and $\cos x$ both have a minimum value of $-1$. $\tan x$ has no minimum value.
*   **y-intercepts:** $\sin x$ and $\tan x$ both have a y-intercept at $(0,0)$. $\cos x$ has a y-intercept at $(0,1)$.
*This step synthesizes the individual findings into a comparative summary.*

**Final Answer:**
Here is a comparison of the maximum values, minimum values, and y-intercepts for the three functions:
| Feature       | $y = \sin x$ | $y = \cos x$ | $y = \tan x$           |
| :------------ | :----------- | :----------- | :--------------------- |
| Maximum Value | $1$          | $1$          | Undefined ($\infty$)   |
| Minimum Value | $-1$         | $-1$         | Undefined ($-\infty$)  |
| Y-intercept   | $(0,0)$      | $(0,1)$      | $(0,0)$                |

**Reflection:** This comparison highlights the fundamental differences between the bounded (sine, cosine) and unbounded (tangent) nature of the trigonometric functions. It also emphasizes the distinct starting points of their graphs.

## 6. Common mistakes and traps

Students frequently fall into specific traps when dealing with the graphs of trigonometric functions. Being aware of these can help you avoid them.

1.  **Confusing Sine and Cosine Starting Points:** Many students mix up which graph starts at $(0,0)$ and which starts at $(0,1)$.
    *   *Why it happens:* Both are waves with the same period and amplitude, so their appearance is very similar.
    *   *Correction:* Remember "Sine starts at the origin" (S for Start, S for Sine) and "Cosine starts at the peak/ceiling" (C for Cosine, C for Ceiling).

2.  **Incorrect Period for Tangent:** Assuming the period of $y = \tan x$ is $2\pi$ like sine and cosine.
    *   *Why it happens:* The $2\pi$ period is ingrained from sine and cosine, and students forget that $\tan(x+\pi) = \tan x$.
    *   *Correction:* Always recall that $\tan x = \sin x / \cos x$. Since $\cos x$ repeats its zero values every $\pi$ radians (e.g., at $\pi/2, 3\pi/2$), the tangent function itself must repeat its full pattern every $\pi$ radians.

3.  **Forgetting Vertical Asymptotes for Tangent:** Drawing $y = \tan x$ as a continuous wave without any breaks.
    *   *Why it happens:* Students are used to sine and cosine being continuous and forget that tangent is a ratio where the denominator can be zero.
    *   *Correction:* Identify where $\cos x = 0$ (i.e., $x = \pi/2, 3\pi/2, -\pi/2, \dots$) and draw dashed vertical lines at these points, indicating where the function is undefined.

4.  **Incorrect Range for Sine/Cosine:** Stating the range as $(-\infty, \infty)$ for sine or cosine.
    *   *Why it happens:* Some students mistakenly apply the unbounded range of polynomial functions or tangent to sine and cosine.
    *   *Correction:* The unit circle definition clearly shows that $x$ and $y$ coordinates on a unit circle (radius 1) can only vary between -1 and 1.

5.  **Defining Amplitude for Tangent:** Attempting to find an amplitude for $y = \tan x$.
    *   *Why it happens:* Amplitude is a key feature of sine and cosine, so students try to apply it universally.
    *   *Correction:* Amplitude is defined as half the distance between max and min. Since $\tan x$ extends to $\pm\infty$, it has no finite maximum or minimum, and thus no defined amplitude.

6.  **Drawing Sharp Peaks/Troughs for Sine/Cosine:** Sketching the waves with pointy tops and bottoms instead of smooth curves.
    *   *Why it happens:* A rush to sketch, or not fully appreciating the continuous differentiability of sine and cosine functions.
    *   *Correction:* The sine and cosine functions are smooth and continuous, meaning their graphs should have rounded, not pointed, turning points.

## 7. Textbook-precise explanation

The graphs of the basic trigonometric functions $y = \sin x$, $y = \cos x$, and $y = \tan x$ are visual representations of their functional behavior, highlighting their periodic nature, domains, ranges, and other essential characteristics. These functions are defined for real numbers $x$ (representing angles in radians).

**1. The Sine Function:**
The function $f(x) = \sin x$ maps a real number $x$ to the y-coordinate of a point on the unit circle corresponding to an angle of $x$ radians.
*   **Domain:** The set of all real numbers, $D = (-\infty, \infty)$.
*   **Range:** The interval $[-1, 1]$, indicating that $-1 \le \sin x \le 1$ for all $x$.
*   **Periodicity:** $\sin(x+2\pi) = \sin x$. The function is periodic with a fundamental period of $P=2\pi$.
*   **Amplitude:** The amplitude is $A = \frac{\max(\sin x) - \min(\sin x)}{2} = \frac{1 - (-1)}{2} = 1$.
*   **Intercepts:**
    *   x-intercepts: $x = n\pi$, for any integer $n$.
    *   y-intercept: $(0,0)$, since $\sin(0) = 0$.
*   **Symmetry:** $\sin(-x) = -\sin x$. The function is an odd function, symmetric with respect to the origin.
*   **Graph:** A continuous, smooth wave oscillating between $y=-1$ and $y=1$. It starts at $(0,0)$, increases to a maximum at $x=\pi/2$, decreases to $0$ at $x=\pi$, reaches a minimum at $x=3\pi/2$, and returns to $0$ at $x=2\pi$, completing one cycle.

**2. The Cosine Function:**
The function $f(x) = \cos x$ maps a real number $x$ to the x-coordinate of a point on the unit circle corresponding to an angle of $x$ radians.
*   **Domain:** The set of all real numbers, $D = (-\infty, \infty)$.
*   **Range:** The interval $[-1, 1]$, indicating that $-1 \le \cos x \le 1$ for all $x$.
*   **Periodicity:** $\cos(x+2\pi) = \cos x$. The function is periodic with a fundamental period of $P=2\pi$.
*   **Amplitude:** The amplitude is $A = \frac{\max(\cos x) - \min(\cos x)}{2} = \frac{1 - (-1)}{2} = 1$.
*   **Intercepts:**
    *   x-intercepts: $x = \frac{\pi}{2} + n\pi = (2n+1)\frac{\pi}{2}$, for any integer $n$.
    *   y-intercept: $(0,1)$, since $\cos(0) = 1$.
*   **Symmetry:** $\cos(-x) = \cos x$. The function is an even function, symmetric with respect to the y-axis.
*   **Graph:** A continuous, smooth wave oscillating between $y=-1$ and $y=1$. It starts at $(0,1)$ (a maximum), decreases to $0$ at $x=\pi/2$, reaches a minimum at $x=\pi$, increases to $0$ at $x=3\pi/2$, and returns to a maximum at $x=2\pi$, completing one cycle. The graph of $y=\cos x$ is a horizontal translation of $y=\sin x$ by $\pi/2$ units to the left, i.e., $\cos x = \sin(x+\pi/2)$.

**3. The Tangent Function:**
The function $f(x) = \tan x$ is defined as the ratio $\frac{\sin x}{\cos x}$.
*   **Domain:** The set of all real numbers $x$ for which $\cos x \neq 0$. Thus, $D = \{x \mid x \neq \frac{\pi}{2} + n\pi, \text{ where } n \text{ is an integer}\}$.
*   **Range:** The set of all real numbers, $R = (-\infty, \infty)$.
*   **Periodicity:** $\tan(x+\pi) = \tan x$. The function is periodic with a fundamental period of $P=\pi$.
*   **Amplitude:** Not defined, as the range is unbounded.
*   **Intercepts:**
    *   x-intercepts: $x = n\pi$, for any integer $n$.
    *   y-intercept: $(0,0)$, since $\tan(0) = 0$.
*   **Symmetry:** $\tan(-x) = -\tan x$. The function is an odd function, symmetric with respect to the origin.
*   **Vertical Asymptotes:** Occur at values of $x$ where $\cos x = 0$, i.e., $x = \frac{\pi}{2} + n\pi$, for any integer $n$.
*   **Graph:** A discontinuous graph consisting of infinitely many distinct, S-shaped branches. Each branch is centered around an x-intercept and extends from $-\infty$ to $\infty$, approaching vertical asymptotes as $x$ approaches odd multiples of $\pi/2$.

*Reference: Stewart, J. (2020). Calculus: Early Transcendentals (9th ed.). Cengage Learning. Chapter 1.5, "Exponential Functions", and Chapter 1.6, "Inverse Functions and Logarithms" (for general function properties), and specifically Chapter 1.3, "New Functions from Old Functions" (for transformations, which build on these base graphs).* (Correction: The reference should be for Chapter 1.3 or 1.4, "Trigonometric Functions" in most Calculus textbooks, not exponential/logarithms.)
*Reference: Stewart, J. (2020). Calculus: Early Transcendentals (9th ed.). Cengage Learning. Chapter 1.4, "Trigonometric Functions" or Larson, R., & Edwards, B. H. (2017). Calculus (11th ed.). Cengage Learning. Chapter 1.6, "Trigonometric Functions."*

## 8. ASCII diagrams

```text
Graph of y = sin x

      |
    1 + .               .               .
      |   .           .   .           .
      |     .       .       .       .
------0-----------.-----------.-----------.-----------X
      |   -2pi    -pi     0     pi    2pi   3pi
      |     .       .       .       .
      |   .           .   .           .
   -1 + .               .               .
      |
      Y

Key Points:
(0,0), (pi/2, 1), (pi, 0), (3pi/2, -1), (2pi, 0)
Max at pi/2 + 2n*pi
Min at 3pi/2 + 2n*pi
x-intercepts at n*pi
y-intercept at (0,0)
Period: 2pi
Amplitude: 1


Graph of y = cos x

      |
    1 + .-----------.-----------.-----------.
      |           .   .           .   .
      |         .       .           .
------0-------.---------------.---------------.-------X
      |   -2pi    -pi     0     pi    2pi   3pi
      |       .       .       .       .
      |     .           .   .           .
   -1 +   .               .               .
      |
      Y

Key Points:
(0,1), (pi/2, 0), (pi, -1), (3pi/2, 0), (2pi, 1)
Max at 2n*pi
Min at pi + 2n*pi
x-intercepts at pi/2 + n*pi
y-intercept at (0,1)
Period: 2pi
Amplitude: 1


Graph of y = tan x

      |           |           |           |
      |           |           |           |
      |           |           |           |  /
    2 +           |           |           | /
      |           |           |           |/
    1 +           |     .     |     .     /
      |           |   .       |   .       |
------0-----------.-----------.-----------.-----------X
      | -3pi/2  -pi   -pi/2   0   pi/2    pi   3pi/2
      |           | .         | .         |
   -1 +           .           .           |
      |         / |         / |         / |
   -2 +       /   |       /   |       /   |
      |     /     |     /     |     /     |
      |   /       |   /       |   /       |
      |           |           |           |
      Y

Vertical Asymptotes at x = ... -3pi/2, -pi/2, pi/2, 3pi/2 ...
Key Points (one cycle centered at origin):
(-pi/4, -1), (0,0), (pi/4, 1)
x-intercepts at n*pi
y-intercept at (0,0)
Period: pi
Amplitude: Undefined
Range: (-infinity, infinity)
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **Sine:** "Sine starts at the **S**tart (origin) and goes **S**kyward first." Visualize a gentle wave starting at $(0,0)$ and immediately rising.
    *   **Cosine:** "Cosine starts at the **C**eiling (maximum) at $x=0$." Visualize a wave starting at $(0,1)$ and immediately dipping down.
    *   **Tangent:** "Tangent is a **T**ower (asymptote) jumper." Visualize it as a series of S-shaped curves that start from negative infinity, pass through an x-intercept, and shoot up to positive infinity, only to reappear from negative infinity at the next asymptote. The "towers" are at $\pm \pi/2, \pm 3\pi/2$, etc.

2.  **1-3 Formulas/Facts They MUST Overlearn:**
    1.  **Sine & Cosine Period/Amplitude/Range:** Both have a period of $2\pi$, amplitude of $1$, and range of $[-1, 1]$.
    2.  **Tangent Period/Asymptotes/Range:** Period of $\pi$, vertical asymptotes at $x = \frac{\pi}{2} + n\pi$, and range of $(-\infty, \infty)$.
    3.  **Starting Points:** $\sin(0)=0$, $\cos(0)=1$, $\tan(0)=0$.

3.  **Spaced-Repetition Schedule:**
    *   **Review 1:** After 1 day. Sketch all three graphs from memory.
    *   **Review 2:** After 3 days. List all key features (period, amplitude, domain, range, intercepts, asymptotes, symmetry) for each function without looking.
    *   **Review 3:** After 7 days. Re-derive the key points for one cycle of each graph using the unit circle.
    *   **Review 4:** After 16 days. Explain the differences between the three graphs to an imaginary student.
    *   **Review 5:** After 35 days. Solve problems involving identifying features from slightly transformed graphs (e.g., $y=2\sin x$).

4.  **First-Principles Re-derivation Pathway:**
    If you ever forget the graph or its features, always return to the **Unit Circle Definition**:
    1.  **Draw a Unit Circle:** A circle of radius 1 centered at the origin.
    2.  **Trace a Point:** Imagine a point $P(x_c, y_c)$ moving counter-clockwise around the circle, starting from $(1,0)$.
    3.  **Plot Key Angles:** Identify the coordinates $(x_c, y_c)$ for angles $0, \pi/2, \pi, 3\pi/2, 2\pi$.
    4.  **Derive Sine:** The $y$-coordinate ($y_c$) is $\sin x$. Plot $(x, y_c)$ for these angles.
    5.  **Derive Cosine:** The $x$-coordinate ($x_c$) is $\cos x$. Plot $(x, x_c)$ for these angles.
    6.  **Derive Tangent:** The ratio $y_c/x_c$ is $\tan x$. Plot $(x, y_c/x_c)$ for these angles. Pay close attention to where $x_c=0$ (asymptotes).
    This process will always allow you to rebuild the graphs and their fundamental properties.

## 10. Connections — what this leads to

Understanding the basic graphs of sine, cosine, and tangent is foundational for a vast array of advanced mathematical and scientific concepts.

1.  **Transformations of Trigonometric Functions:** This is the immediate next step. You will learn how to shift, stretch, compress, and reflect these base graphs to model more complex periodic phenomena. This involves understanding parameters like $A$ (amplitude change), $B$ (period change), $C$ (phase shift), and $D$ (vertical shift) in functions like $y = A \sin(Bx - C) + D$.

2.  **Solving Trigonometric Equations and Inequalities:** The graphs provide a visual understanding of *why* there are multiple solutions to equations like $\sin x = 0.5$ or $\cos x < 0$. You can see the points of intersection or the intervals where the condition is met.

3.  **Harmonic Motion and Wave Equations:** In physics, any system exhibiting simple harmonic motion (like a mass on a spring, a pendulum, or an oscillating electric current) is described by sinusoidal functions. The graphs allow for visualization of displacement, velocity, and acceleration over time.

4.  **Fourier Series:** This advanced topic, crucial in signal processing, electrical engineering, and quantum mechanics, states that *any* periodic function (even non-sinusoidal ones) can be expressed as an infinite sum of sine and cosine waves of different frequencies and amplitudes. The basic graphs are the building blocks of Fourier series.

5.  **Calculus of Trigonometric Functions:** When you study derivatives and integrals, you'll learn how to find the rate of change and the area under the curves of $\sin x$, $\cos x$, and $\tan x$. The geometric interpretation of these operations directly relates to the shape of their graphs. For example, the derivative of $\sin x$ is $\cos x$, which can be visualized as the slope of the sine curve following the cosine curve.

6.  **Polar Coordinates and Complex Numbers:** Trigonometric functions are integral to understanding polar coordinate systems and the geometric interpretation of complex numbers (Euler's formula: $e^{i\theta} = \cos\theta + i\sin\theta$).

7.  **Differential Equations:** Many differential equations that model oscillatory behavior (e.g., in engineering, biology, economics) have solutions involving sine and cosine functions.

## 11. Self-check questions

1.  For the function $y = \sin x$, state its amplitude, period, and the coordinates of its y-intercept.
2.  Describe two fundamental differences between the graph of $y = \cos x$ and the graph of $y = \tan x$.
3.  Sketch one full cycle of the graph of $y = \tan x$ that passes through the origin. Clearly label any x-intercepts and vertical asymptotes within your sketch.
4.  A function has a maximum value of 1, a minimum value of -1, and its graph passes through $(0,1)$. Which of the three basic trigonometric functions ($y=\sin x$, $y=\cos x$, or $y=\tan x$) is it most likely to be, and why?
5.  Explain, using the unit circle definition, why the domain of $y = \tan x$ is restricted, while the domains of $y = \sin x$ and $y = \cos x$ are all real numbers.