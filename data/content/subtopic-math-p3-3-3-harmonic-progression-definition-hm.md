## What it is
A sequence of numbers forms a harmonic progression (HP) if taking the reciprocal of every term creates an arithmetic progression (AP). The "harmonic mean" (HM) is a specific type of average used when dealing with rates, ratios, or parallel systems; it is the reciprocal of the arithmetic mean of the reciprocals of your dataset.

## Why it matters
In physics and aerospace, the harmonic mean governs systems working in parallel. If you have two parallel resistors in a circuit, or two valves draining a fuel tank simultaneously, their combined effective rate is half their harmonic mean. In kinematics, it calculates average speeds over equal distances. In machine learning, the F1-score (used to evaluate classification models) is the harmonic mean of precision and recall, strictly penalizing a model if either metric drops near zero. 

## When to study it
You must have absolute mastery over Arithmetic Progressions (AP). You need to know how to find the common difference $d$, formulate the $n$-th term $a_n = a + (n-1)d$, and manipulate algebraic fractions. If you are fuzzy on APs, stop here and review them. You cannot build an HP without a rock-solid AP foundation.

## How to study it (step by step)
1. **Define the mapping:** Write out a simple AP (e.g., $2, 4, 6, 8$). Invert it to form an HP ($\frac{1}{2}, \frac{1}{4}, \frac{1}{6}, \frac{1}{8}$). Observe how the HP terms get closer together as $n$ increases.
2. **Derive the $n$-th term:** Learn to find the $n$-th term of an HP not by memorizing a new formula, but by mapping the sequence to an AP, finding the AP's $n$-th term, and mapping back.
3. **Derive the Harmonic Mean:** Set three terms $a, H, b$ in HP. Convert them to an AP, and use the common difference to solve for $H$ algebraically. 
4. **Prove the classic inequality:** Prove that for any two positive real numbers, the Arithmetic Mean $\ge$ Geometric Mean $\ge$ Harmonic Mean ($AM \ge GM \ge HM$). 
5. **Solve kinematics problems:** Calculate average velocities over equal distances using the HM to build physical intuition.

## Key ideas, with intuition

**The Reciprocal Rule**
Harmonic progressions are non-linear. There is no general, closed-form formula for the sum of a harmonic progression (in fact, the harmonic series $\sum \frac{1}{n}$ diverges to infinity). To solve *any* HP problem, immediately convert it to an AP. Solve the problem in the linear "AP space," and invert your final answer.

**The $n$-th term**
If an HP is defined as $h_1, h_2, h_3, \dots$, the underlying AP is $\frac{1}{h_1}, \frac{1}{h_2}, \frac{1}{h_3}, \dots$. The $n$-th term of the HP is simply the reciprocal of the $n$-th term of the AP:
$$ h_n = \frac{1}{\frac{1}{h_1} + (n-1)d} $$
where $d = \frac{1}{h_2} - \frac{1}{h_1}$.

**The Harmonic Mean (HM)**
If $a, H, b$ are in HP, then $H$ is the harmonic mean of $a$ and $b$. Unlike the arithmetic mean, which sits exactly in the middle of two numbers, the harmonic mean biases heavily toward the *smaller* number. If you drive a rover to a sample site at 10 km/h and return at 30 km/h, your average speed is not 20 km/h. You spent three times as long driving at the slower speed. Your true average speed is the harmonic mean: 15 km/h.

## Worked example
**Problem:** Find the 10th term of the harmonic progression: $6, 4, 3, \dots$

**Step 1: Convert to AP.** 
Take the reciprocals of the terms to find the underlying AP: 
$$ \frac{1}{6}, \frac{1}{4}, \frac{1}{3}, \dots $$

**Step 2: Find the common difference $d$.**
$$ d = \frac{1}{4} - \frac{1}{6} = \frac{3}{12} - \frac{2}{12} = \frac{1}{12} $$
*Verification:* $\frac{1}{3} - \frac{1}{4} = \frac{4}{12} - \frac{3}{12} = \frac{1}{12}$. The mapping holds.

**Step 3: Find the 10th term of the AP.**
Using $A_n = A_1 + (n-1)d$:
$$ A_{10} = \frac{1}{6} + (10-1)\left(\frac{1}{12}\right) $$
$$ A_{10} = \frac{2}{12} + \frac{9}{12} = \frac{11}{12} $$

**Step 4: Invert to find the 10th term of the HP.**
$$ h_{10} = \frac{12}{11} $$

*Reflection:* By mapping the non-linear HP space into the linear AP space, we bypass the need for complex fractional sequences. We use simple linear formulas to find arbitrary terms, then map back to reality.

## Diagrams

The "Crossed Ladders" geometry perfectly visualizes the Harmonic Mean. If two poles of heights $a$ and $b$ stand vertically, and lines are drawn from the top of each to the base of the other, the height $h$ of their intersection is exactly half the harmonic mean of $a$ and $b$.

```text
y
|
a *
|  \
|   \       * b
|    \     /|
|     \   / |
|      \ /  |
|       *   |
|       |h  |
|       |   |
|_______|___|_____ x
```
$$ h = \frac{ab}{a+b} \implies HM = 2h = \frac{2ab}{a+b} $$
Notice geometrically that if $a$ is very small, the intersection $h$ is forced to be small, regardless of how massive $b$ is. The harmonic mean is anchored by the worst-performing component.

## Memory technique — remember this forever

1. **The Hook:** "Harmonic is for Rates and Weights." If a problem involves speeds over equal distances, parallel work, or F1-scores, you need the Harmonic Mean.
2. **Formulas to overlearn:**
   * The Harmonic Mean of two numbers: $$ HM = \frac{2ab}{a+b} $$
   * The Inequality: $$ AM \ge GM \ge HM $$
3. **Spaced-repetition schedule:** Review this concept and re-derive the HM formula at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **The First Principles Pathway:** If you forget the formula $H = \frac{2ab}{a+b}$, rebuild it. 
   * Let $a, H, b$ be in HP.
   * Therefore, $\frac{1}{a}, \frac{1}{H}, \frac{1}{b}$ are in AP.
   * The common difference is the same: $\frac{1}{H} - \frac{1}{a} = \frac{1}{b} - \frac{1}{H}$.
   * Move $H$ to one side: $\frac{2}{H} = \frac{1}{a} + \frac{1}{b}$.
   * Find a common denominator: $\frac{2}{H} = \frac{a+b}{ab}$.
   * Invert and multiply: $H = \frac{2ab}{a+b}$.

## Common mistakes
* **Trying to sum an HP:** Students waste time looking for an $S_n$ formula for harmonic progressions. It does not exist in closed form. 
* **Forgetting the final inversion:** Students will correctly convert to an AP, find the $n$-th term of the AP, and write that down as the final answer, forgetting to take the reciprocal to get back to the HP.
* **Averaging rates with the Arithmetic Mean:** If a rocket ascends at Mach 2 and descends at Mach 4, the average speed is *not* Mach 3. It is Mach 2.66.

## Self-check
1. If the 3rd term of an HP is $\frac{1}{7}$ and the 7th term is $\frac{1}{15}$, what is the 10th term?
2. If $a, b, c$ are in HP, prove algebraically that $b = \frac{2ac}{a+c}$.
3. A spacecraft travels from Earth to Mars at velocity $v_1$, and returns from Mars to Earth at velocity $v_2$. Assume the distance $D$ is constant. Prove using fundamental kinematics ($t = \frac{D}{v}$) that the average velocity for the entire trip is exactly the harmonic mean of $v_1$ and $v_2$.