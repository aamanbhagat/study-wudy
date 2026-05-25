## What it is
Iterative methods solve a system of linear equations $A\mathbf{x}=\mathbf{b}$ by starting with an initial guess, $\mathbf{x}^{(0)}$, and generating a sequence of improving approximate solutions $\mathbf{x}^{(1)}, \mathbf{x}^{(2)}, \dots$. Unlike direct methods (like Gaussian elimination) which find the exact solution in a finite number of steps, iterative methods converge towards the solution and are stopped when the approximation is "good enough".

## Why it matters
These methods are the backbone for solving the massive, sparse systems of equations that arise in physics and engineering simulations. For example, finite element analysis (FEA) for structural mechanics in rockets or computational fluid dynamics (CFD) for aerodynamics involves matrices with millions of rows, where most entries are zero. Direct methods are computationally infeasible, but iterative methods like Jacobi or Gauss-Seidel (and their more advanced successors) are highly efficient.

## When to study it
You must have a solid grasp of core linear algebra. Specifically, be fluent with:
*   Matrix-vector multiplication and addition.
*   Matrix inversion.
*   The concepts of eigenvalues and eigenvectors.
*   The definition of a matrix norm and vector norm.
*   Decomposition of a matrix into diagonal, lower-triangular, and upper-triangular parts.

If these are not second nature, pause and review them.

## How to study it (step by step)
1.  **Start from the core idea.** Take a simple system like $4x_1 - x_2 = 1$ and $-x_1 + 3x_2 = 5$. Rewrite it to isolate each variable: $x_1 = (1 + x_2)/4$ and $x_2 = (5 + x_1)/3$. Start with a guess $(x_1, x_2) = (0,0)$ and plug it into the right-hand side. Calculate the new values. Repeat. Observe if you are approaching a stable solution. This is the essence of iteration.
2.  **Formalize the Jacobi Method.** Derive the general form by decomposing the matrix $A$ into $A = D + L + U$, where $D$ is the diagonal, $L$ is the strictly lower triangle, and $U$ is the strictly upper triangle. Start from $A\mathbf{x}=\mathbf{b}$, substitute the decomposition, and derive the Jacobi iteration formula: $\mathbf{x}^{(k+1)} = D^{-1}(\mathbf{b} - (L+U)\mathbf{x}^{(k)})$.
3.  **Formalize the Gauss-Seidel Method.** Use the same decomposition $A = D+L+U$. This time, when solving for $x_i^{(k+1)}$, assume you have already computed $x_1^{(k+1)}, \dots, x_{i-1}^{(k+1)}$ in the current step. Derive the matrix form: $\mathbf{x}^{(k+1)} = (D+L)^{-1}(\mathbf{b} - U\mathbf{x}^{(k)})$. Understand why this is often faster.
4.  **Understand Convergence.** Define what it means for the sequence of vectors $\mathbf{x}^{(k)}$ to converge. This means the error vector $\mathbf{e}^{(k)} = \mathbf{x}^{(k)} - \mathbf{x}_{\text{true}}$ must go to zero as $k \to \infty$.
5.  **Study the Convergence Criteria.** Derive the error update rule: $\mathbf{e}^{(k+1)} = T \mathbf{e}^{(k)}$, where $T$ is the iteration matrix ($T_J = D^{-1}(L+U)$ for Jacobi). This shows that the method converges if and only if the spectral radius $\rho(T) = \max_i |\lambda_i|$ is less than 1.
6.  **Connect to a simpler condition.** Prove that if a matrix $A$ is *strictly diagonally dominant*, both Jacobi and Gauss-Seidel methods are guaranteed to converge. This is a very useful practical check.
7.  **Implement both algorithms.** Code Jacobi and Gauss-Seidel in Python/Julia/MATLAB. Test them on a small, strictly diagonally dominant system and verify that they converge to the known solution. Compare their rates of convergence.

## Key ideas, with intuition
1.  **Fixed-Point Iteration:** The core idea is to transform the equation $A\mathbf{x}=\mathbf{b}$ into an equivalent *fixed-point* form $\mathbf{x} = T\mathbf{x} + \mathbf{c}$. A solution $\mathbf{x}$ is a "fixed point" because if you plug it into the right side, you get the same $\mathbf{x}$ back. We find this point by just iterating: $\mathbf{x}^{(k+1)} = T\mathbf{x}^{(k)} + \mathbf{c}$.

2.  **Matrix Splitting:** We create the fixed-point form by splitting the matrix $A$. The equation $A\mathbf{x}=\mathbf{b}$ is rewritten as $(M-N)\mathbf{x}=\mathbf{b}$, which becomes $M\mathbf{x} = N\mathbf{x} + \mathbf{b}$, and finally $\mathbf{x} = M^{-1}N\mathbf{x} + M^{-1}\mathbf{b}$. The choice of the split $A=M-N$ determines the method. For this to be useful, $M$ must be easy to invert (e.g., diagonal or triangular).
    *   **Jacobi:** $M=D$, $N=-(L+U)$
    *   **Gauss-Seidel:** $M=D+L$, $N=-U$

3.  **Jacobi is Parallel, Gauss-Seidel is Serial:** Think of calculating the components of the next vector $\mathbf{x}^{(k+1)}$.
    *   **Jacobi:** To calculate *every* component of $\mathbf{x}^{(k+1)}$, you only use components from the *previous* vector, $\mathbf{x}^{(k)}$. You can imagine calculating all the new components simultaneously on parallel processors.
    *   **Gauss-Seidel:** To calculate $x_i^{(k+1)}$, you use the components $x_1^{(k+1)}, \dots, x_{i-1}^{(k+1)}$ that you *just computed* in the same iteration, and the remaining components $x_{i+1}^{(k)}, \dots, x_{n}^{(k)}$ from the previous iteration. It uses the newest information available, which is why it usually converges faster.

4.  **Convergence is about Shrinking Error:** The iteration matrix $T$ acts on the error vector at each step: $\mathbf{e}^{(k+1)} = T\mathbf{e}^{(k)}$. For the error to vanish, $T$ must be a "contraction mapping." The condition for this is that its *spectral radius* $\rho(T)$, the magnitude of its largest eigenvalue, must be less than 1. If $\rho(T) < 1$, each multiplication by $T$ shrinks the error vector, driving it to zero. If $\rho(T) > 1$, the error grows and the method diverges.

5.  **Diagonal Dominance is a Stability Guarantee:** A matrix is strictly diagonally dominant if for every row, the absolute value of the diagonal element is greater than the sum of the absolute values of all other elements in that row.
    $$ |a_{ii}| > \sum_{j \neq i} |a_{ij}| \quad \text{for all } i $$
    This condition guarantees that the diagonal part $D$ is "strong" enough to control the iteration, ensuring $\rho(T) < 1$. It's a simple check that avoids calculating eigenvalues.

## Worked example
Solve the system $A\mathbf{x}=\mathbf{b}$ using Jacobi and Gauss-Seidel, where:
$$ A = \begin{pmatrix} 4 & -1 \\ -1 & 3 \end{pmatrix}, \quad \mathbf{b} = \begin{pmatrix} 7 \\ 5 \end{pmatrix} $$
The exact solution is $\mathbf{x} = [2, 3]^T$. Let's start with the initial guess $\mathbf{x}^{(0)} = [0, 0]^T$.

The system is:
$4x_1 - x_2 = 7$
$-x_1 + 3x_2 = 5$

First, check for convergence: The matrix is strictly diagonally dominant since $|4| > |-1|$ and $|3| > |-1|$. Convergence is guaranteed.

**1. Jacobi Method**
Rewrite for iteration:
$x_1^{(k+1)} = \frac{1}{4}(7 + x_2^{(k)})$
$x_2^{(k+1)} = \frac{1}{3}(5 + x_1^{(k)})$

*   **Iteration 1 (k=0):**
    $x_1^{(1)} = \frac{1}{4}(7 + x_2^{(0)}) = \frac{1}{4}(7 + 0) = 1.75$
    $x_2^{(1)} = \frac{1}{3}(5 + x_1^{(0)}) = \frac{1}{3}(5 + 0) \approx 1.6667$
    So, $\mathbf{x}^{(1)} = [1.75, 1.6667]^T$.

*   **Iteration 2 (k=1):**
    $x_1^{(2)} = \frac{1}{4}(7 + x_2^{(1)}) = \frac{1}{4}(7 + 1.6667) \approx 2.1667$
    $x_2^{(2)} = \frac{1}{3}(5 + x_1^{(1)}) = \frac{1}{3}(5 + 1.75) \approx 2.25$
    So, $\mathbf{x}^{(2)} = [2.1667, 2.25]^T$.

The sequence is approaching the true solution $[2, 3]^T$.

**2. Gauss-Seidel Method**
Rewrite for iteration, noting the use of updated values:
$x_1^{(k+1)} = \frac{1}{4}(7 + x_2^{(k)})$
$x_2^{(k+1)} = \frac{1}{3}(5 + x_1^{(k+1)})$  <-- Note the use of the *new* $x_1$

*   **Iteration 1 (k=0):**
    $x_1^{(1)} = \frac{1}{4}(7 + x_2^{(0)}) = \frac{1}{4}(7 + 0) = 1.75$
    $x_2^{(1)} = \frac{1}{3}(5 + x_1^{(1)}) = \frac{1}{3}(5 + 1.75) \approx 2.25$
    So, $\mathbf{x}^{(1)} = [1.75, 2.25]^T$.

*   **Iteration 2 (k=1):**
    $x_1^{(2)} = \frac{1}{4}(7 + x_2^{(1)}) = \frac{1}{4}(7 + 2.25) = 2.3125$
    $x_2^{(2)} = \frac{1}{3}(5 + x_1^{(2)}) = \frac{1}{3}(5 + 2.3125) \approx 2.4375$
    So, $\mathbf{x}^{(2)} = [2.3125, 2.4375]^T$.

**Reflection:**
Compare $\mathbf{x}^{(1)}$ from both methods. Gauss-Seidel's first iteration is already closer to the final solution for the $x_2$ component. This is typical; by using the most up-to-date information, Gauss-Seidel often converges faster than Jacobi. Each step was a direct application of the derived iterative formulas.

## Diagrams
Here is how the data flows in one iteration to compute $\mathbf{x}^{(k+1)} = [x_1^{(k+1)}, x_2^{(k+1)}]^T$.

**Jacobi Method (Parallel Updates)**
All inputs come from the previous iteration, $\mathbf{x}^{(k)}$.

```text
      x_1^(k) -------> [ Calc x_1^(k+1) ]
       |
       `----------.
                  |
      x_2^(k) ----|---> [ Calc x_2^(k+1) ]
                  `---> [ Calc x_1^(k+1) ]
```

**Gauss-Seidel Method (Serial/Sequential Updates)**
The calculation of $x_2^{(k+1)}$ immediately uses the newly computed $x_1^{(k+1)}$.

```text
                  .--------------------.
                  |                    |
      x_2^(k) ---> [ Calc x_1^(k+1) ] --'--> [ Calc x_2^(k+1) ]
                        ^      |
                        |      | new x_1^(k+1) is used immediately
      x_1^(k) (unused)--'      `-------------------------------->
      for x_2 calc
```

## Memory technique — remember this forever
1.  **The Story:**
    *   **Jacobi:** Imagine a team of analysts (one for each variable $x_i$). At 9 AM, they all get yesterday's closing prices ($\mathbf{x}^{(k)}$). They each work independently all day to calculate today's new price forecast ($x_i^{(k+1)}$). At 5 PM, they all submit their forecasts at the same time. No one saw anyone else's work until the next morning. It's a "batch" update.
    *   **Gauss-Seidel:** This is a fast-paced assembly line. The first worker ($x_1$) builds a component and immediately passes it to the second worker ($x_2$). The second worker uses that brand-new component, not the one from yesterday. It's a "live" or "greedy" update. **G**auss-**S**eidel is **G**reedy and **S**equential.

2.  **Formulas to Overlearn:**
    *   Jacobi: $\mathbf{x}^{(k+1)} = D^{-1}(\mathbf{b} - (L+U)\mathbf{x}^{(k)})$
    *   Gauss-Seidel: $\mathbf{x}^{(k+1)} = (D+L)^{-1}(\mathbf{b} - U\mathbf{x}^{(k)})$
    *   Convergence Condition: $\rho(T) < 1$ (The spectral radius of the iteration matrix must be less than one).

3.  **Spaced Repetition Schedule:** Review these formulas and the story.
    *   Tomorrow (1 day)
    *   In 3 days
    *   In 7 days
    *   In 16 days
    *   In 35 days

4.  **First Principles Pathway:** If you forget the formulas, rebuild them.
    *   Start with $A\mathbf{x} = \mathbf{b}$.
    *   Write the key decomposition: $A = D + L + U$.
    *   Substitute: $(D+L+U)\mathbf{x} = \mathbf{b}$.
    *   Now, decide what to isolate. The "next" iterate $\mathbf{x}^{(k+1)}$ is on the left, the "current" iterate $\mathbf{x}^{(k)}$ is on the right.
    *   For Jacobi, only the diagonal term stays on the left:
        $D\mathbf{x}^{(k+1)} = \mathbf{b} - (L+U)\mathbf{x}^{(k)}$
    *   For Gauss-Seidel, the diagonal and lower-triangular parts stay on the left (because we use new values as they are computed "down the rows"):
        $(D+L)\mathbf{x}^{(k+1)} = \mathbf{b} - U\mathbf{x}^{(k)}$
    *   Invert the matrix on the left to get the final formula.

## Common mistakes
*   **Assuming convergence:** Never start iterating without first checking for strict diagonal dominance or having another reason to believe the method will converge. Your code might run forever or produce `NaN`.
*   **Mixing up the matrices:** A common error is to write the Gauss-Seidel update as $(D+L)^{-1}(\mathbf{b} - (L+U)\mathbf{x}^{(k)})$. Remember, in G-S, the $L$ part is used for the *new* iterate, so it moves to the left side of the equation, leaving only $U$ on the right.
*   **Off-by-one implementation error:** When coding Gauss-Seidel, accidentally using `x[i-1][k]` instead of the just-updated `x[i-1][k+1]` in the inner loop. This turns the algorithm back into Jacobi.
*   **Thinking diagonal dominance is necessary:** It is a *sufficient* condition, not a *necessary* one. A system can fail the test but still converge. The spectral radius condition $\rho(T)<1$ is the true, necessary and sufficient condition.

## Self-check
1.  Consider the system:
    $2x_1 + x_2 = 4$
    $x_1 + 3x_2 = 7$
    Write out the component-wise update rules ($x_1^{(k+1)} = \dots$, $x_2^{(k+1)} = \dots$) for the Jacobi method.

2.  For the system:
    $$ A = \begin{pmatrix} 10 & -1 & 2 \\ 1 & 10 & -1 \\ 2 & 3 & 10 \end{pmatrix}, \quad \mathbf{b} = \begin{pmatrix} 6 \\ 25 \\ -11 \end{pmatrix} $$
    Is the matrix strictly diagonally dominant? Starting with $\mathbf{x}^{(0)} = [0,0,0]^T$, compute $\mathbf{x}^{(1)}$ using the Gauss-Seidel method.

3.  Let $A = \begin{pmatrix} 1 & a \\ a & 1 \end{pmatrix}$. Find the Jacobi iteration matrix $T_J$. For what values of $a \in \mathbb{R}$ will the Jacobi method converge for this system? (Hint: Find the eigenvalues of $T_J$ and enforce the spectral radius condition).