## What it is
Solving a system of linear equations using matrix inversion means translating multiple equations into a single matrix equation $A\mathbf{x} = \mathbf{b}$, and then isolating the variable vector $\mathbf{x}$ by multiplying both sides by the inverse of the coefficient matrix, $A^{-1}$. It is the linear algebra equivalent of solving the scalar equation $ax = b$ by calculating $x = a^{-1}b$.

## Why it matters
In physics and rocket science, this is how we solve for multiple unknown forces in static equilibrium or calculate orbital trajectories from sensor data. In computer science, specifically machine learning, matrix inversion is the backbone of finding optimal weights in linear regression (the Normal Equation). It transforms an iterative, algebraic guessing game into a direct, one-shot calculation that computers can execute instantly.

## When to study it
You must already understand:
1. Matrix multiplication (dot products of rows and columns).
2. The Identity matrix ($I$).
3. How to calculate the determinant ($\det(A)$) and the inverse ($A^{-1}$) of a $2 \times 2$ matrix.
4. How to translate a system of linear equations into the matrix form $A\mathbf{x} = \mathbf{b}$.

If you cannot reliably invert a $2 \times 2$ matrix or multiply a matrix by a vector, stop here. Go back and master those mechanics first.

## How to study it (step by step)
1. **Translate:** Write out a simple $2 \times 2$ system of linear equations and convert it into the matrix form $A\mathbf{x} = \mathbf{b}$.
2. **Derive the logic:** Write out the algebraic proof that isolates $\mathbf{x}$. Left-multiply both sides by $A^{-1}$, showing that $A^{-1}A\mathbf{x} = I\mathbf{x} = \mathbf{x}$, leading to $\mathbf{x} = A^{-1}\mathbf{b}$.
3. **Check the determinant:** Calculate the determinant of $A$. If $\det(A) = 0$, stop immediately. The matrix is not invertible, meaning the system either has no solutions (parallel lines) or infinite solutions (the same line).
4. **Find the inverse:** Calculate $A^{-1}$ using the standard $2 \times 2$ formula.
5. **Execute:** Multiply $A^{-1}$ by the constant vector $\mathbf{b}$ to find the solution vector $\mathbf{x}$.
6. **Verify:** Plug your resulting $x$ and $y$ values back into the original algebraic equations to prove they work.

## Key ideas, with intuition
**1. The Matrix as a Transformation Machine**
Think of matrix $A$ as a machine that transforms an input vector $\mathbf{x}$ into an output vector $\mathbf{b}$. You know the output ($\mathbf{b}$) and you know the machine ($A$). You want to find the input ($\mathbf{x}$).

**2. The Inverse as the "Undo" Button**
$A^{-1}$ is the machine that runs in reverse. If you feed it $\mathbf{b}$, it spits out the original $\mathbf{x}$. 

**3. Left-Multiplication is Mandatory**
Matrix multiplication is not commutative ($AB \neq BA$). To cancel out $A$ in the equation $A\mathbf{x} = \mathbf{b}$, you must multiply by $A^{-1}$ on the *left* side of both sides of the equation.
$$A\mathbf{x} = \mathbf{b}$$
$$A^{-1}(A\mathbf{x}) = A^{-1}\mathbf{b}$$
$$(A^{-1}A)\mathbf{x} = A^{-1}\mathbf{b}$$
$$I\mathbf{x} = A^{-1}\mathbf{b}$$
$$\mathbf{x} = A^{-1}\mathbf{b}$$

**4. The Determinant as a Volume/Scaling Factor**
If $\det(A) = 0$, the transformation squishes 2D space into a 1D line (or a point). You cannot "unsquish" a line back into a plane uniquely because information has been destroyed. This is the geometric reason why $A^{-1}$ does not exist when $\det(A) = 0$.

## Worked example
Solve the following system using matrix inversion:
$2x + 3y = 8$
$x - 4y = -7$

**Step 1: Convert to matrix form $A\mathbf{x} = \mathbf{b}$**
$$ \begin{pmatrix} 2 & 3 \\ 1 & -4 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 8 \\ -7 \end{pmatrix} $$

**Step 2: Find the determinant of $A$**
$$\det(A) = (2)(-4) - (3)(1) = -8 - 3 = -11$$
Since $\det(A) \neq 0$, an inverse exists.

**Step 3: Find $A^{-1}$**
$$ A^{-1} = \frac{1}{-11} \begin{pmatrix} -4 & -3 \\ -1 & 2 \end{pmatrix} $$

**Step 4: Left-multiply $\mathbf{b}$ by $A^{-1}$ ($\mathbf{x} = A^{-1}\mathbf{b}$)**
$$ \begin{pmatrix} x \\ y \end{pmatrix} = -\frac{1}{11} \begin{pmatrix} -4 & -3 \\ -1 & 2 \end{pmatrix} \begin{pmatrix} 8 \\ -7 \end{pmatrix} $$
$$ \begin{pmatrix} x \\ y \end{pmatrix} = -\frac{1}{11} \begin{pmatrix} (-4)(8) + (-3)(-7) \\ (-1)(8) + (2)(-7) \end{pmatrix} $$
$$ \begin{pmatrix} x \\ y \end{pmatrix} = -\frac{1}{11} \begin{pmatrix} -32 + 21 \\ -8 - 14 \end{pmatrix} $$
$$ \begin{pmatrix} x \\ y \end{pmatrix} = -\frac{1}{11} \begin{pmatrix} -11 \\ -22 \end{pmatrix} = \begin{pmatrix} 1 \\ 2 \end{pmatrix} $$

*Reflection:* By treating the system as a single matrix equation, we isolated the variable vector in one algebraic sweep. The solution is $x = 1, y = 2$.

## Diagrams
```text
The Parallel Between Scalar Algebra and Matrix Algebra

      SCALAR WORLD                   MATRIX WORLD
      ------------                   ------------
Equation:      ax = b                A*x = b

The "Undo":    (1/a)*ax = (1/a)*b    A⁻¹ * A*x = A⁻¹ * b

Identity:      1 * x = b/a           I * x = A⁻¹ * b

Solution:      x = b/a               x = A⁻¹ * b

CRITICAL DIFFERENCE: 
In scalar math, b*(1/a) is fine. 
In matrix math, b * A⁻¹ is a dimensional mismatch and mathematically invalid. 
A⁻¹ MUST attack the lock from the LEFT.
```

## Memory technique — remember this forever
1. **The Visual Hook:** Think of $A$ as a padlock attached to the *left* side of your variable $\mathbf{x}$. To unlock it, you must insert the key ($A^{-1}$) directly into the padlock from the *left*.
2. **Formulas to overlearn:** 
   * The derivation: $\mathbf{x} = A^{-1}\mathbf{b}$
   * The $2 \times 2$ inverse: $A^{-1} = \frac{1}{ad-bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$
3. **Spaced-repetition schedule:** Review this derivation and solve one $2 \times 2$ system from scratch at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget the final formula, write $A\mathbf{x} = \mathbf{b}$. Ask yourself: "How do I turn $A$ into $I$?" Multiply by $A^{-1}$. "Where?" On the left. Do it to both sides. The result $\mathbf{x} = A^{-1}\mathbf{b}$ emerges naturally.

## Common mistakes
1. **Right-multiplication:** Writing $\mathbf{x} = \mathbf{b}A^{-1}$. Matrix multiplication is not commutative. A $2 \times 1$ vector cannot be multiplied by a $2 \times 2$ matrix in that order. The dimensions do not match.
2. **Forgetting to swap elements/signs in the inverse:** For a $2 \times 2$ matrix, you must swap the main diagonal elements ($a$ and $d$) and flip the signs of the off-diagonal elements ($b$ and $c$). Students frequently mix these up.
3. **Ignoring the determinant scalar:** Forgetting to multiply the final matrix by $\frac{1}{\det(A)}$.

## Self-check
1. Solve the system $3x + y = 5$ and $2x - y = 0$ using matrix inversion.
2. A system $A\mathbf{x} = \mathbf{b}$ has the coefficient matrix $A = \begin{pmatrix} 4 & 2 \\ 2 & 1 \end{pmatrix}$. What happens when you try to solve this using matrix inversion, and what does this mean geometrically for the two lines?
3. Prove that if $A$ and $B$ are invertible matrices, the solution to the system $AB\mathbf{x} = \mathbf{c}$ is $\mathbf{x} = B^{-1}A^{-1}\mathbf{c}$. (Hint: Remember the sock-and-shoe rule for inverses).