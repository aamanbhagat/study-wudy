## What it is
Trigonometric substitution is a technique for evaluating integrals containing radical expressions like $\sqrt{a^2-x^2}$, $\sqrt{a^2+x^2}$, or $\sqrt{x^2-a^2}$. We perform a change of variables from $x$ to an angle $\theta$, using a substitution that leverages Pythagorean identities to eliminate the square root, creating a simpler trigonometric integral.

## Why it matters
This technique is fundamental for solving problems where geometry is described algebraically. In orbital mechanics, calculating the time it takes for a satellite to travel between two points on an elliptical orbit involves an integral of this form. In electromagnetism, finding the electric field of a finite line of charge requires solving an integral that simplifies directly with trigonometric substitution.

## When to study it
Before tackling this, you must have mastery of the following:
1.  **Basic Integration:** Including the power rule, substitution rule ($u$-sub), and integrals of standard trigonometric functions ($\sin x$, $\sec^2 x$, $\sec x \tan x$, etc.).
2.  **Pythagorean Identities:** You must know $ \sin^2\theta + \cos^2\theta = 1 $, $ \tan^2\theta + 1 = \sec^2\theta $, and $ 1 + \cot^2\theta = \csc^2\theta $ without hesitation.
3.  **Inverse Trigonometric Functions:** You must understand their definitions, domains, ranges, and derivatives. For example, knowing that $\frac{d}{dx}\arcsin(x) = \frac{1}{\sqrt{1-x^2}}$ is essential context.

If any of these are weak, pause and review them now. This technique builds directly upon them.

## How to study it (step by step)
1.  **Derive the substitutions.** For each form ($\sqrt{a^2-x^2}$, $\sqrt{a^2+x^2}$, $\sqrt{x^2-a^2}$), draw a right-angle triangle. Label the sides with $a$, $x$, and the radical expression in a way that makes the Pythagorean theorem hold true. From this triangle, derive the correct substitution ($x = a\sin\theta$, etc.) and the expression for the radical.
2.  **Master the mechanics.** Work through one simple, solved example of each of the three cases. Focus only on the mechanical steps: substitute for $x$, calculate $dx$, simplify the radical, integrate with respect to $\theta$, and substitute back to $x$. Do not move on until you can replicate these steps.
3.  **Focus on the back-substitution.** The hardest part is converting the result from $\theta$ back to $x$. For each problem you solve, redraw the reference triangle from step 1. Use it to write expressions for $\sin\theta$, $\cos\theta$, etc., in terms of $x$ and $a$. This is the crucial final step.
4.  **Integrate definite integrals.** Find two examples of definite integrals requiring trig substitution. The key new step is converting the bounds of integration from $x$-values to $\theta$-values. This often simplifies the problem, as you won't need to substitute back to $x$ at the end.
5.  **Practice problem identification.** Look at a mixed list of 10-15 integrals. For each one, simply identify *which* substitution you would use and write it down. Do not solve them. The goal is to make the pattern recognition automatic.

## Key ideas, with intuition
1.  **The Goal: Eliminate the Square Root.** The entire purpose of this method is to transform an expression trapped under a square root into something free. The expressions $\sqrt{a^2-x^2}$, $\sqrt{a^2+x^2}$, and $\sqrt{x^2-a^2}$ look like parts of the Pythagorean theorem, $c^2 = a^2 + b^2$. This is not a coincidence; we are exploiting that geometric relationship.

2.  **The Engine: Pythagorean Identities.** The substitutions are specifically chosen to create a Pythagorean identity.
    - For $\sqrt{a^2 - x^2}$, we let $x=a\sin\theta$. This gives:
    $$ \sqrt{a^2 - (a\sin\theta)^2} = \sqrt{a^2(1-\sin^2\theta)} = \sqrt{a^2\cos^2\theta} = a\cos\theta $$
    The radical is gone. The other two substitutions work identically with the other two Pythagorean identities.

3.  **The Map: The Reference Triangle.** The substitution moves us from the "world of $x$" to the "world of $\theta$". After integrating, we have an answer in terms of $\theta$, but the original problem was about $x$. The reference triangle is the map that lets us translate back. If we used $x = a\sin\theta$, then $\sin\theta = x/a$. We draw a triangle that represents this relationship to find expressions for any other trig function of $\theta$ we might need.

## Worked example
Evaluate the integral:
$$ \int \frac{dx}{x^2\sqrt{4-x^2}} $$

**Step 1: Identify the form and choose the substitution.**
The integral contains the term $\sqrt{4-x^2}$, which is of the form $\sqrt{a^2-x^2}$ with $a=2$. This suggests the substitution $x = a\sin\theta = 2\sin\theta$.

**Step 2: Compute $dx$ and substitute all parts.**
If $x = 2\sin\theta$, then $dx = 2\cos\theta \, d\theta$.
Now we substitute $x$, $dx$, and the radical into the integral:
-   $x^2 = (2\sin\theta)^2 = 4\sin^2\theta$
-   $\sqrt{4-x^2} = \sqrt{4 - 4\sin^2\theta} = \sqrt{4(1-\sin^2\theta)} = \sqrt{4\cos^2\theta} = 2\cos\theta$
The integral becomes:
$$ \int \frac{2\cos\theta \, d\theta}{(4\sin^2\theta)(2\cos\theta)} $$

**Step 3: Simplify and integrate in the $\theta$-domain.**
The $2\cos\theta$ terms cancel out.
$$ \int \frac{1}{4\sin^2\theta} \, d\theta = \frac{1}{4} \int \csc^2\theta \, d\theta $$
This is a standard integral:
$$ \frac{1}{4} (-\cot\theta) + C = -\frac{1}{4}\cot\theta + C $$

**Step 4: Convert back to the $x$-domain using a reference triangle.**
Our substitution was $x = 2\sin\theta$, which means $\sin\theta = \frac{x}{2}$. We can draw a right triangle where the side opposite $\theta$ is $x$ and the hypotenuse is $2$.
By the Pythagorean theorem, the adjacent side is $\sqrt{2^2 - x^2} = \sqrt{4-x^2}$.

From this triangle, we can find $\cot\theta$:
$$ \cot\theta = \frac{\text{adjacent}}{\text{opposite}} = \frac{\sqrt{4-x^2}}{x} $$

**Step 5: Write the final answer.**
Substitute the expression for $\cot\theta$ back into our result from Step 3.
$$ -\frac{1}{4} \left( \frac{\sqrt{4-x^2}}{x} \right) + C = -\frac{\sqrt{4-x^2}}{4x} + C $$

*Reflection:* The substitution in Step 1 was chosen precisely because it would interact with the number 4 to create the identity $1-\sin^2\theta$ in Step 2. This simplification was the key that unlocked the integral. The reference triangle in Step 4 was not an afterthought; it was the necessary tool to translate our answer back to the original variable.

## Diagrams
Here is the reference triangle for the worked example, based on the substitution $\sin\theta = x/2$:

```text
      /|
     / |
    /  |
   /   |
  2    | x (opposite)
 /     |
/      |
-------+
 \_θ_/
  sqrt(4-x^2) (adjacent)
```

This diagram encodes the relationship between $x$ and $\theta$. From it, we can read any trigonometric function of $\theta$ in terms of $x$.

## Memory technique — remember this forever
1.  **The Mnemonic:** Look at the form inside the square root.
    -   **S**um of squares ($a^2+x^2$): Use **T**angent ($x=a\tan\theta$). (Think: "Sum" and "Tan" don't share letters, they are the odd one out).
    -   **D**ifference of squares ($a^2-x^2$ or $x^2-a^2$):
        -   If the variable is **S**econd ($a^2-x^2$): Use **S**ine ($x=a\sin\theta$).
        -   If the variable is first ($x^2-a^2$): Use **S**ecant ($x=a\sec\theta$).

2.  **Formulas to Overlearn:**
    | Form in Integral | Substitution | Resulting Identity Used |
    | :--- | :--- | :--- |
    | $\sqrt{a^2 - x^2}$ | $x = a\sin\theta$ | $a^2(1-\sin^2\theta) = a^2\cos^2\theta$ |
    | $\sqrt{a^2 + x^2}$ | $x = a\tan\theta$ | $a^2(1+\tan^2\theta) = a^2\sec^2\theta$ |
    | $\sqrt{x^2 - a^2}$ | $x = a\sec\theta$ | $a^2(\sec^2\theta-1) = a^2\tan^2\theta$ |

3.  **Spaced Repetition Schedule:** Review this material and work one problem of each type at these intervals: 1 day from now, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget which substitution to use, derive it from a right triangle. For $\sqrt{a^2-x^2}$, the terms $a$ and $x$ must be two sides of a right triangle with the third side being the radical. Since $a^2$ is the positive term, $a$ must be the hypotenuse. Place $x$ as the opposite side to angle $\theta$. By SOHCAHTOA, $\sin\theta = \frac{\text{opposite}}{\text{hypotenuse}} = \frac{x}{a}$. This gives you $x=a\sin\theta$. You can rebuild all three cases this way.

## Common mistakes
1.  **Forgetting $dx$.** When you substitute $x=a\sin\theta$, you cannot just replace $dx$ with $d\theta$. You must calculate the differential: $dx = a\cos\theta \, d\theta$. Forgetting this will make your integral incorrect.
2.  **Incorrect bounds for definite integrals.** If you are evaluating $\int_a^b$, the bounds $a$ and $b$ are $x$-values. You must convert them to $\theta$-values before integrating. For $x=2\sin\theta$, if an $x$-bound is $1$, the $\theta$-bound is $\arcsin(1/2) = \pi/6$. Do not reuse the $x$-bounds with the $\theta$ integral.
3.  **Mixing variables.** Your final answer must be entirely in terms of $x$ (unless it's a definite integral that you evaluated using $\theta$-bounds). An answer like "$\frac{\theta}{2} - \frac{\sqrt{a^2-x^2}}{x} + C$" is wrong because it contains both $\theta$ and $x$. Use the reference triangle to convert all terms back to $x$.

## Self-check
Do not solve completely. First, identify the form, state the substitution for $x$ and the expression for $dx$. Then, proceed to solve.
1.  $$ \int \frac{x^3}{\sqrt{x^2+9}} \, dx $$
2.  $$ \int_2^4 \frac{\sqrt{x^2-4}}{x} \, dx $$
3.  $$ \int \frac{1}{(x^2-6x+13)^{3/2}} \, dx \quad (\text{Hint: Complete the square first.}) $$