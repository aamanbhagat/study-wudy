## What it is
A radical equation contains a variable locked inside a root, such as $\sqrt{x-3} = 5$. To solve it, you isolate the radical on one side of the equals sign and raise both sides to the corresponding power (e.g., squaring both sides for a square root). However, this process can generate "extraneous solutions"—fake mathematical answers that solve the squared equation but fail when plugged back into the original equation.

## Why it matters
Radical equations appear constantly in physics and engineering. You will use them to calculate orbital velocities ($v = \sqrt{GM/r}$), pendulum periods ($T = 2\pi\sqrt{L/g}$), and relativistic time dilation ($\gamma = 1/\sqrt{1 - v^2/c^2}$). Understanding extraneous solutions is your first rigorous lesson in how mathematical operations can fundamentally alter the domain of an equation. In aerospace engineering, blindly accepting an extraneous solution could mean feeding your flight computer a trajectory that requires negative mass or imaginary time.

## When to study it
You must already be fluent in:
1. Solving linear and quadratic equations (specifically factoring and using the quadratic formula).
2. Expanding binomials, i.e., $(a+b)^2 = a^2 + 2ab + b^2$.
3. The definition of the principal square root. 

If you cannot confidently solve $x^2 - x - 2 = 0$, or if you think $(x+3)^2 = x^2 + 9$, stop and master quadratics and polynomial expansion first.

## How to study it (step by step)
1. **Isolate:** Move terms so that one radical is completely alone on one side of the equals sign.
2. **Eliminate:** Square both sides of the equation. (If it is a cube root, cube both sides).
3. **Expand cleanly:** If the other side is a binomial, expand it properly using $(a+b)^2 = a^2 + 2ab + b^2$. Do not distribute the square incorrectly.
4. **Solve:** The radical is now gone. Solve the resulting linear or quadratic equation.
5. **Check (Mandatory):** Plug every proposed solution back into the *original, unaltered* equation. Discard any that result in a false statement.
6. **Iterate:** If the original equation had two radicals, isolating and squaring one will leave a new radical in the cross-term. Isolate this new radical and square both sides a second time.

## Key ideas, with intuition

**1. Squaring destroys information (The Sign)**
If $A = B$, then it is absolutely true that $A^2 = B^2$. 
But if $A^2 = B^2$, it does *not* guarantee $A = B$. It only guarantees $A = B$ OR $A = -B$. 
For example, $3 \neq -3$, but $(3)^2 = (-3)^2$. When you square an equation to eliminate a radical, the math forgets whether the original terms were positive or negative. You are inadvertently asking the math to find solutions for your equation *and* its negative counterpart.

**2. The Principal Root Restriction**
By definition, the symbol $\sqrt{x}$ refers to the *principal* (non-negative) square root. Therefore, an equation like $\sqrt{x} = -5$ has no real solutions. If you blindly square both sides, you get $x = 25$. This is an extraneous solution. The math gave you the answer to $-\sqrt{x} = -5$.

**3. The Formal Logic**
$$ \sqrt{f(x)} = g(x) \implies f(x) = [g(x)]^2 $$
Notice the implication arrow $\implies$ only goes to the right. The solution set of the right-hand equation is a *superset* of the left-hand equation. You must filter the superset to find the true solutions.

## Worked example
**Solve:** $x = \sqrt{x+2}$

**Step 1: Isolate.** 
The radical is already isolated on the right.

**Step 2: Square both sides.**
$$ (x)^2 = (\sqrt{x+2})^2 $$
$$ x^2 = x + 2 $$

**Step 3: Solve the resulting quadratic.**
$$ x^2 - x - 2 = 0 $$
$$ (x-2)(x+1) = 0 $$
Proposed solutions: $x = 2$ and $x = -1$.

**Step 4: Check for extraneous solutions.**
Plug $x = 2$ into the *original* equation:
$$ 2 = \sqrt{2+2} \implies 2 = \sqrt{4} \implies 2 = 2 \quad \text{(Valid!)} $$

Plug $x = -1$ into the *original* equation:
$$ -1 = \sqrt{-1+2} \implies -1 = \sqrt{1} \implies -1 = 1 \quad \text{(False!)} $$

**Final Answer:** $x = 2$. 
*Reflection:* The step where we squared both sides summoned a "ghost" equation: $x = -\sqrt{x+2}$. The extraneous solution $x = -1$ is the valid solution to that ghost equation.

## Diagrams
When you square $\sqrt{x+2} = x$, you are geometrically combining the graph of the true radical with its negative "ghost" branch, creating a full sideways parabola $x+2 = y^2$. The intersection on the ghost branch is your extraneous solution.

```text
      y
      ^
    3 |           / y = x
      |          /
    2 |         * (2, 2)  <-- True Solution
      |    ____/
    1 | __/   /
      |/     /
------|-----+----+----+----> x
   -2 | -1 / 1    2    3
      |   * (-1, -1) <-- Extraneous Solution
   -1 |  / \____
      | /       \____
   -2 |/              y = -sqrt(x+2)
      |               (The "Ghost" branch created by squaring)
```

## Memory technique — remember this forever
**The Hook:** "Squaring summons a ghost."
Whenever you square both sides of an equation, visualize summoning a dark, mirror-universe version of your equation. You must "exorcise" the ghost at the end of the problem by checking your answers.

**Facts to overlearn:**
1. $\sqrt{x} \ge 0$ ALWAYS.
2. $(a+b)^2 = a^2 + 2ab + b^2$. (Never $a^2 + b^2$).
3. Checking answers is not optional; it is a structural requirement of the algorithm.

**Spaced-repetition schedule:**
Review this concept and solve one practice problem at intervals of 1 day, 3 days, 7 days, 16 days, and 35 days.

**First principles pathway:**
If you forget why extraneous solutions exist, write down $x = 5$. Square both sides to get $x^2 = 25$. Solve it to get $x = 5$ or $x = -5$. You started with one truth, squared it, and generated a lie ($x = -5$). Squaring is a one-way street.

## Common mistakes
1. **Skipping the check:** Students treat checking their work as a "good habit for tests" rather than a mandatory mathematical step. In radical equations, the math *will* lie to you. You must check.
2. **The Freshman's Dream:** Incorrectly squaring a binomial. If you have $\sqrt{x} = x - 2$, squaring both sides yields $x = x^2 - 4x + 4$. Students frequently and disastrously write $x = x^2 + 4$.
3. **Squaring before isolating:** If you have $\sqrt{x} + 2 = x$ and square both sides immediately, you get $(\sqrt{x} + 2)^2 = x^2$, which expands to $x + 4\sqrt{x} + 4 = x^2$. You haven't eliminated the radical; you've made a bigger mess. Always isolate first.

## Self-check
1. Solve for $x$: $\sqrt{3x+1} = 4$
2. Solve for $x$: $x - \sqrt{x+11} = 1$
3. Solve for $x$: $\sqrt{2x+3} - \sqrt{x+1} = 1$ *(Hint: Isolate one radical, square, isolate the remaining radical, square again).*