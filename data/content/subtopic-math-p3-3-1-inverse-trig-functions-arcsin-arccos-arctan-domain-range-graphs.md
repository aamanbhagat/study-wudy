## What it is
Inverse trigonometric functions—such as $\arcsin(x)$, $\arccos(x)$, and $\arctan(x)$—are mathematical operations that "undo" standard trigonometric functions. While standard trig functions take an angle and return a ratio of side lengths, inverse trig functions take a ratio and return a specific angle. Because standard trig functions are periodic, their domains must be strictly restricted before they can be inverted, ensuring the resulting inverse is a true function with a single, unambiguous output.

## Why it matters
You cannot solve for an unknown angle without these functions. In physics and aerospace, you will use them constantly to resolve vectors—such as finding the launch angle of a projectile, the inclination of an orbit, or the phase angle in an AC circuit. In calculus, the derivatives of inverse trig functions yield purely algebraic rational functions, forming the foundation for integrating many complex expressions you will encounter in differential equations.

## When to study it
Do not touch this until you have absolute mastery of:
1. The standard trigonometric functions ($\sin$, $\cos$, $\tan$).
2. The unit circle and radian measure.
3. The concept of inverse functions, specifically the horizontal line test and the necessity of domain restriction. 
If you do not understand why $f(x) = x^2$ requires a domain restriction of $x \ge 0$ to have an inverse, go back and review function inverses first.

## How to study it (step by step)
1. **Apply the horizontal line test:** Graph $y = \sin(x)$. Observe that it fails the horizontal line test infinitely many times. 
2. **Restrict the domains:** Find the most "central" interval on the x-axis where $\sin(x)$, $\cos(x)$, and $\tan(x)$ cover all their possible y-values exactly once without repeating. 
3. **Swap variables:** For each restricted function, swap the domain and range to find the domain and range of its inverse.
4. **Graph by reflection:** Sketch the inverse graphs by reflecting the restricted standard graphs across the line $y = x$.
5. **Evaluate exactly:** Use the unit circle to evaluate expressions like $\arccos(-\sqrt{3}/2)$ without a calculator. 
6. **Compose functions:** Practice evaluating nested functions, such as $\sin(\arccos(x))$, by drawing reference right triangles.

## Key ideas, with intuition

**1. The Necessity of Domain Restriction**
A function must have exactly one output for a given input. Since $\sin(0) = 0$ and $\sin(\pi) = 0$, asking "what angle has a sine of 0?" has infinite answers. To define the function $y = \arcsin(x)$, we restrict $y = \sin(x)$ to the interval $[-\pi/2, \pi/2]$. This captures every value from $-1$ to $1$ exactly once.

**2. Domain and Range Swapping**
If a function $f$ maps domain $A$ to range $B$, its inverse $f^{-1}$ maps domain $B$ to range $A$. 
*   **$\arcsin(x)$**: Domain $[-1, 1]$, Range $[-\pi/2, \pi/2]$
*   **$\arccos(x)$**: Domain $[-1, 1]$, Range $[0, \pi]$
*   **$\arctan(x)$**: Domain $(-\infty, \infty)$, Range $(-\pi/2, \pi/2)$

**3. The Principal Value**
The output of an inverse trig function is called the "principal value." It is simply the angle that lives within the restricted range. For example, even though $\cos(7\pi/4) = \sqrt{2}/2$, $\arccos(\sqrt{2}/2) = \pi/4$, because $7\pi/4$ falls outside the restricted range of $[0, \pi]$.

## Worked example
**Problem:** Evaluate exactly: $\tan(\arcsin(-3/5))$.

**Step 1: Define the angle.**
Let $\theta = \arcsin(-3/5)$. 
By definition, this means $\sin(\theta) = -3/5$ and $\theta$ must be in the range $[-\pi/2, \pi/2]$. 

**Step 2: Locate the quadrant.**
Since $\sin(\theta)$ is negative and $\theta \in [-\pi/2, \pi/2]$, $\theta$ must lie in Quadrant IV.

**Step 3: Draw a reference triangle.**
In Quadrant IV, draw a right triangle against the x-axis. 
The sine is $\frac{\text{opposite}}{\text{hypotenuse}}$, so set the opposite side to $-3$ and the hypotenuse to $5$.
Use the Pythagorean theorem to find the adjacent side (x):
$$x^2 + (-3)^2 = 5^2 \implies x^2 + 9 = 25 \implies x^2 = 16 \implies x = 4$$
(x is positive because we are in Quadrant IV).

**Step 4: Evaluate the outer function.**
We need $\tan(\theta)$. 
$$\tan(\theta) = \frac{\text{opposite}}{\text{adjacent}} = \frac{-3}{4}$$

*Reflection:* By defining the inner inverse trig function as an angle $\theta$ and drawing its geometric representation in the correct quadrant, we bypassed messy algebraic formulas entirely.

## Diagrams

The most crucial visualization is where the principal values live on the unit circle.

```text
       ARCCOS RANGE [0, pi]
             y
             |
      Q II   |   Q I
             |
  -----------+----------- x
             |
      Q III  |   Q IV
             |
             
  ARCSIN & ARCTAN RANGE [-pi/2, pi/2]
  (Right side of the y-axis)
```

Graph of $y = \arctan(x)$:
Notice how the vertical asymptotes of $\tan(x)$ at $x = \pm \pi/2$ become horizontal asymptotes for $\arctan(x)$.

```text
       y
       |
  pi/2 + - - - - - - - - - - - - (Horizontal Asymptote)
       |                   .  *
       |               . *
       |             *
       |           *
-------+-----------*----------- x
       |         *
       |       * .
       |   * .
 -pi/2 + - - - - - - - - - - - - (Horizontal Asymptote)
       |
```

## Memory technique — remember this forever
**1. The Mnemonic:** 
"Sine and Tan are Right, Cosine is Top."
*   $\arcsin$ and $\arctan$ live on the **Right** half of the unit circle (Quadrants I and IV: $[-\pi/2, \pi/2]$).
*   $\arccos$ lives on the **Top** half of the unit circle (Quadrants I and II: $[0, \pi]$).

**2. Must Overlearn:**
*   $\arcsin(x)$ Range: $[-\pi/2, \pi/2]$
*   $\arccos(x)$ Range: $[0, \pi]$
*   $\arctan(x)$ Range: $(-\pi/2, \pi/2)$ (Note the open brackets—tangent is undefined at the poles).

**3. Spaced Repetition Schedule:**
Review these ranges and the worked example above at 1 day, 3 days, 7 days, 16 days, and 35 days. 

**4. First Principles Pathway:**
If you forget the ranges, sketch the standard graph (e.g., $y = \cos(x)$). Start at $x = 0$ and trace to the right. Stop when the graph is about to turn around and fail the horizontal line test. For cosine, you start at $y=1$ ($x=0$) and hit $y=-1$ at $x=\pi$. That interval $[0, \pi]$ is your restricted domain, which becomes the range of the inverse.

## Common mistakes
1. **Assuming $\arcsin(\sin(x)) = x$ universally.** 
   This is only true if $x$ is in the restricted range $[-\pi/2, \pi/2]$. For example, $\arcsin(\sin(\pi)) = \arcsin(0) = 0$, not $\pi$. 
2. **Confusing inverse notation with reciprocal notation.** 
   $\sin^{-1}(x)$ means $\arcsin(x)$. It does **not** mean $\frac{1}{\sin(x)}$, which is $\csc(x)$. Use the "arc" prefix to avoid this ambiguity entirely.
3. **Dropping negative signs in Quadrant IV.** 
   When evaluating $\arcsin(-1/2)$, the answer is $-\pi/6$. Students often incorrectly write $11\pi/6$. While coterminal, $11\pi/6$ is outside the strict range of $[-\pi/2, \pi/2]$.

## Self-check
1. Evaluate exactly: $\arccos(\cos(4\pi/3))$.
2. Find the exact algebraic expression for $\sin(\arctan(x))$. (Hint: draw a triangle with opposite side $x$ and adjacent side $1$).
3. Sketch the graph of $y = \frac{\pi}{2} - \arcsin(x/2)$. State its domain and range.