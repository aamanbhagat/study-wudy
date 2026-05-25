## What it is
The Law of Sines is a geometric theorem relating the side lengths of any triangle to the sines of their opposite angles. It states that the ratio of a side length to the sine of its opposite angle is identical for all three sides of a given triangle. This allows you to solve for unknown sides or angles when you have partial information about a non-right triangle.

## Why it matters
In physics and aerospace, you rarely deal with perfect right triangles. The Law of Sines is essential for resolving non-orthogonal force vectors, calculating relative velocities, and determining distances via triangulation (such as finding a rocket's altitude using two separate ground tracking stations). It is the mathematical bridge between the angles you can measure and the physical distances you need to know.

## When to study it
You must be completely fluent in right-triangle trigonometry (SOH CAH TOA) and basic algebraic manipulation. You also need to know the unit circle property that $\sin(180^\circ - \theta) = \sin(\theta)$. This specific trigonometric identity is the root cause of the "ambiguous case." If you do not have these concepts locked down, stop and review them first.

## How to study it (step by step)
1. **Derive the law:** Draw a general, non-right triangle. Drop an altitude from one vertex to the opposite side. Use basic right-triangle trigonometry to write two different equations for the height of that altitude, then set them equal.
2. **Memorize the proportionality:** Write down the final formula and lock in the visual pattern: sides are always paired with the angle directly across from them.
3. **Solve a standard case:** Create a triangle where you know two angles and one side (AAS or ASA). Use the law to find the remaining sides.
4. **Draw the ambiguous case (SSA):** Draw a triangle where you know two sides and a non-included angle. Visualize the unknown side swinging like a pendulum to see how it might intersect the base at two different points.
5. **Solve a two-solution SSA case:** Calculate the acute angle using $\arcsin$. Immediately calculate its supplement ($180^\circ - \theta$) and verify that both angles can form a valid triangle.
6. **Solve a zero-solution SSA case:** Set up a triangle where the opposite side is too short to reach the base. Observe how the algebra catches this physical impossibility (you will get $\sin \theta > 1$).

## Key ideas, with intuition

**1. The Formal Law**
For any triangle with angles $A, B, C$ and opposite sides $a, b, c$:
$$ \frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} $$

**2. Derivation from First Principles**
Any triangle can be split into two right triangles. Drop an altitude $h$ from angle $C$ down to side $c$. 
Looking at the left right-triangle, $\sin A = \frac{h}{b}$, which means $h = b \sin A$.
Looking at the right right-triangle, $\sin B = \frac{h}{a}$, which means $h = a \sin B$.
Because both expressions equal $h$, we can equate them:
$$ b \sin A = a \sin B $$
Divide both sides by $\sin A \sin B$ to get:
$$ \frac{a}{\sin A} = \frac{b}{\sin B} $$

**3. The Ambiguous Case (SSA)**
When you are given Side-Side-Angle (e.g., $a, b,$ and $A$), you are fixing an angle ($A$), an adjacent side ($b$), and a dangling side ($a$) opposite the angle. 
Because the angle between $a$ and $b$ is *not* fixed, side $a$ acts like a swinging pendulum. If $a$ is longer than the altitude $h$ but shorter than $b$, it will strike the unknown base in *two* valid locations. 
Algebraically, this manifests because $\sin(\theta) = \sin(180^\circ - \theta)$. When you use your calculator to find $\arcsin(x)$, it only returns the acute angle. You must manually check if the obtuse angle ($180^\circ - \text{acute}$) also forms a valid triangle.

## Worked example
**Problem:** You are given a triangle with angle $A = 30^\circ$, side $b = 10$, and side $a = 7$. Find all possible values for angle $B$.

**Step 1: Set up the Law of Sines.**
$$ \frac{7}{\sin 30^\circ} = \frac{10}{\sin B} $$

**Step 2: Isolate $\sin B$.**
$$ \sin B = \frac{10 \sin 30^\circ}{7} $$
Since $\sin 30^\circ = 0.5$:
$$ \sin B = \frac{5}{7} \approx 0.714 $$

**Step 3: Find the primary (acute) angle, $B_1$.**
$$ B_1 = \arcsin\left(\frac{5}{7}\right) \approx 45.58^\circ $$

**Step 4: Find the secondary (obtuse) angle, $B_2$.**
Because $\sin(\theta) = \sin(180^\circ - \theta)$:
$$ B_2 = 180^\circ - 45.58^\circ = 134.42^\circ $$

**Step 5: Check validity for both cases.**
A triangle's angles must sum to $180^\circ$. 
For $B_1$: $A + B_1 = 30^\circ + 45.58^\circ = 75.58^\circ < 180^\circ$. (Valid)
For $B_2$: $A + B_2 = 30^\circ + 134.42^\circ = 164.42^\circ < 180^\circ$. (Valid)

*Reflection:* The algebra naturally produced a sine value between 0 and 1, meaning at least one angle exists. Because we were given SSA, we had to manually check the supplementary angle. Both angle sums were under $180^\circ$, proving two distinct triangles can be built with these exact starting parameters.

## Diagrams

```text
The Ambiguous Case (SSA)

                  C
                 /|\
                / | \   <-- Side 'a' (length 7) can swing 
           b=10/  |  \      to two different positions.
              /  h|   \
             /    |    \
            /_____|_____\_______
           A=30°  B2    B1

- If 'a' stops at B1, you get an acute angle for B.
- If 'a' swings inward to B2, you get an obtuse angle for B.
- The altitude 'h' is the shortest possible length 'a' could be 
  to form exactly one right triangle (h = 10 * sin(30°) = 5).
```

## Memory technique — remember this forever
1. **The Hook:** "Opposites attract." The Law of Sines strictly pairs a side with the angle staring directly at it across the triangle. 
2. **The Formulas to Overlearn:** 
   * $$ \frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} $$
   * **The Ambiguous Check:** $B_{obtuse} = 180^\circ - B_{acute}$
3. **Spaced Repetition Schedule:** Review this derivation and the ambiguous check at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget the formula, draw a triangle, drop an altitude $h$, and write $h$ in terms of sine for both left and right halves. Set the two $h$ equations equal to each other.

## Common mistakes
* **Blindly trusting the calculator:** Calculators only return the acute angle for $\arcsin$. If you have an SSA setup, you *must* manually calculate $180^\circ - \theta$ and check if it fits inside a triangle.
* **Assuming the obtuse angle is always valid:** If $A = 60^\circ$ and your calculator gives $B_1 = 70^\circ$, then $B_2 = 110^\circ$. But $A + B_2 = 60^\circ + 110^\circ = 170^\circ$. This leaves only $10^\circ$ for angle $C$, so it is valid. However, if $A = 80^\circ$, then $A + B_2 = 190^\circ$, which is impossible. You must check the sum.
* **Using the wrong mode:** Doing trig in radians when your angles are in degrees, or vice versa. Always check your calculator mode.

## Self-check
1. Given a triangle with $A = 40^\circ$, $B = 60^\circ$, and $a = 12$, find side $b$. 
2. Given $A = 50^\circ$, $b = 20$, and $a = 10$, attempt to solve for angle $B$. What happens algebraically, and what does this mean physically?
3. (Elite) Draw a triangle inscribed inside a circle of radius $R$. By drawing a diameter through one vertex and using the properties of inscribed angles, prove that $\frac{a}{\sin A} = 2R$.