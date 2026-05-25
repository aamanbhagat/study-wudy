## 1. What it is — in plain English

Imagine you have a big puzzle where all the pieces are connected, and you need to find the exact value for each piece. For example, you might have several equations, and you need to find the numbers that make *all* of them true at the same time. This is like solving a system of linear equations.

Now, if the puzzle is small, you can solve it directly, maybe by carefully substituting values or rearranging pieces. But what if the puzzle is enormous, with thousands or even millions of interconnected pieces? Trying to solve it directly would take forever, even for a supercomputer.

Iterative methods are like solving this giant puzzle by making a smart guess, then using that guess to make an even better guess, and repeating this process over and over. You don't try to find the perfect answer in one go. Instead, you keep refining your estimate, getting closer and closer to the true solution with each step. It's like tuning a radio: you start near the station and make tiny adjustments until the sound is perfectly clear.

The Jacobi and Gauss-Seidel methods are two specific strategies for making these "better guesses" when dealing with systems of linear equations. They differ in *how* they use the information from the previous guess to form the next one. Jacobi uses all the old information simultaneously, while Gauss-Seidel is a bit smarter, using any *new* information as soon as it becomes available within the same round of guessing.

## 2. Why it matters — real-world applications

Iterative methods are crucial because many real-world problems boil down to solving massive systems of linear equations, far too large for direct methods.

1.  **Aerospace Engineering & Fluid Dynamics (CFD)**: Simulating airflow over an aircraft wing or the flow of blood through arteries involves discretizing continuous space into millions of small cells. Each cell's properties (pressure, velocity, temperature) are linked to its neighbors, leading to enormous systems of equations. Companies like Boeing and Airbus use iterative solvers extensively in Computational Fluid Dynamics (CFD) software to design more efficient planes and engines, predicting lift, drag, and turbulence.
2.  **Machine Learning & Data Science**: Many optimization problems in machine learning, especially those involving large datasets, can be formulated as solving linear systems or finding inverses of matrices. For instance, in training large neural networks or solving least squares problems for linear regression with billions of data points, iterative methods are used to find the optimal weights and biases efficiently. Google's search algorithms and recommendation systems rely on such numerical techniques.
3.  **Physics & Engineering Simulations (Finite Element Analysis)**: When designing structures (bridges, buildings) or simulating physical phenomena (heat transfer, electromagnetism, stress analysis), engineers use Finite Element Analysis (FEA). This method breaks down complex geometries into smaller, simpler elements. The interactions between these elements result in massive linear systems. Iterative solvers are indispensable for software like ANSYS or Abaqus, allowing engineers to predict how materials will behave under various conditions without building expensive physical prototypes.
4.  **Image Processing & Computer Graphics**: Denoising images, reconstructing 3D models from scans, or rendering complex scenes often involves solving large linear systems. For example, in computer graphics, calculating global illumination (how light bounces around a scene) can be framed as an iterative process where light values are propagated and refined across pixels or voxels.
5.  **Economics & Finance**: Modeling complex economic systems, such as interconnected markets or supply chains, often leads to large sparse linear systems. Iterative methods can be used to find equilibrium prices or optimal resource allocations, informing policy decisions or investment strategies.

## 3. Prerequisites — what you must know first

To fully grasp iterative methods, ensure you are comfortable with the following concepts:

*   **Systems of Linear Equations**: Understanding what a system like $Ax=b$ means, where $A$ is a matrix, $x$ is a vector of unknowns, and $b$ is a vector of constants.
*   **Matrices and Vectors**: Familiarity with matrix addition, subtraction, multiplication, and basic vector operations.
*   **Matrix Decomposition**: The idea that a matrix can be broken down into simpler parts (e.g., diagonal, lower triangular, upper triangular components).
*   **Diagonal Dominance**: Knowledge of what it means for a matrix to be diagonally dominant, as this is a key condition for convergence.
*   **Eigenvalues and Eigenvectors**: Basic understanding of eigenvalues and their role in determining the behavior of matrices, particularly the concept of spectral radius.
*   **Vector Norms**: How to measure the "size" or "length" of a vector, typically the $L_2$ (Euclidean) norm or $L_\infty$ norm.
*   **Convergence of Sequences**: Understanding what it means for a sequence of numbers or vectors to approach a limit.
*   **Basic Calculus**: While not strictly necessary for the mechanics, an intuitive understanding of limits helps with convergence concepts.

## 4. The core idea — step by step

The core idea behind iterative methods for solving linear systems $Ax=b$ is to transform the system into an equivalent form $x = Tx + c$, where $T$ is an iteration matrix and $c$ is a vector. Then, starting with an initial guess $x^{(0)}$, we generate a sequence of approximations $x^{(k+1)} = Tx^{(k)} + c$ that hopefully converges to the true solution.

### Step 1: The Problem — Solving Large Linear Systems

**Plain English:** We need to find the values of $x_1, x_2, \dots, x_n$ that satisfy a set of $n$ linear equations. When $n$ is very large, direct methods (like Gaussian elimination) become too slow and use too much memory.

**Concrete Example:**
Consider a small system:
$2x_1 + x_2 = 5$
$x_1 + 3x_2 = 7$
Here, $A = \begin{pmatrix} 2 & 1 \\ 1 & 3 \end{pmatrix}$, $x = \begin{pmatrix} x_1 \\ x_2 \end{pmatrix}$, $b = \begin{pmatrix} 5 \\ 7 \end{pmatrix}$.

**Formal/Mathematical Version:** We want to solve $Ax=b$ for $x \in \mathbb{R}^n$, where $A \in \mathbb{R}^{n \times n}$ is a given matrix and $b \in \mathbb{R}^n$ is a given vector.

**What could go wrong:** For very large $n$, calculating the inverse $A^{-1}$ (which is what Gaussian elimination implicitly does) is computationally expensive, $O(n^3)$, and can lead to numerical instability due to round-off errors.

### Step 2: Direct vs. Iterative Methods

**Plain English:** Think of direct methods as finding the exact solution in a fixed number of predetermined steps, like a recipe. Iterative methods are like repeatedly refining a guess until it's "good enough."

**Concrete Example:**
For our small system:
$2x_1 + x_2 = 5$
$x_1 + 3x_2 = 7$
A direct method (e.g., substitution):
From the first equation, $x_2 = 5 - 2x_1$.
Substitute into the second: $x_1 + 3(5 - 2x_1) = 7$
$x_1 + 15 - 6x_1 = 7$
$-5x_1 = -8 \Rightarrow x_1 = 8/5$.
Then $x_2 = 5 - 2(8/5) = 5 - 16/5 = (25-16)/5 = 9/5$.
The exact solution is $x_1 = 8/5, x_2 = 9/5$. This took a fixed number of steps.

**Formal/Mathematical Version:**
*   **Direct Methods:** Gaussian elimination, LU decomposition. They aim to find the exact solution (up to machine precision) in a finite number of operations.
*   **Iterative Methods:** Start with an initial guess $x^{(0)}$ and generate a sequence $x^{(1)}, x^{(2)}, \dots$ that converges to the true solution $x$.

**What could go wrong:** Direct methods can be too slow or memory-intensive for sparse matrices (matrices with many zero entries) where iterative methods often perform much better.

### Step 3: The Splitting Idea ($A = D+L+U$)

**Plain English:** To turn $Ax=b$ into an iterative form, we break the matrix $A$ into three simpler parts: a diagonal part, a lower triangular part, and an upper triangular part. This allows us to isolate one variable at a time.

**Concrete Example:**
For $A = \begin{pmatrix} 2 & 1 \\ 1 & 3 \end{pmatrix}$:
*   **Diagonal (D):** Only elements on the main diagonal. $D = \begin{pmatrix} 2 & 0 \\ 0 & 3 \end{pmatrix}$
*   **Lower Triangular (L):** Elements below the main diagonal, zeros elsewhere. $L = \begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix}$
*   **Upper Triangular (U):** Elements above the main diagonal, zeros elsewhere. $U = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}$
Notice that $A = D+L+U$.

**Formal/Mathematical Version:**
Given a matrix $A \in \mathbb{R}^{n \times n}$, we can decompose it as $A = D + L + U$, where:
*   $D$ is the diagonal matrix containing the diagonal entries of $A$.
*   $L$ is the strictly lower triangular matrix containing the entries of $A$ below the main diagonal.
*   $U$ is the strictly upper triangular matrix containing the entries of $A$ above the main diagonal.

**What could go wrong:** This decomposition is always possible, but the properties of $D, L, U$ will influence the convergence of the iterative methods. If $D$ has zero entries on its diagonal, it presents a problem because we'll need to divide by these diagonal entries.

### Step 4: Jacobi Iteration

**Plain English:** In Jacobi, we update each variable $x_i$ using the values of *all other variables* from the *previous* iteration. It's like a committee where everyone makes their suggestion based on what everyone else said in the *last* meeting, without considering any new suggestions made in the *current* meeting.

**Derivation:**
Start with $Ax=b$. Substitute $A=D+L+U$:
$(D+L+U)x = b$
$Dx = b - (L+U)x$
To isolate $x$, we can multiply by $D^{-1}$ (assuming $D$ is invertible, i.e., $a_{ii} \neq 0$ for all $i$):
$x = D^{-1}(b - (L+U)x)$
This gives us the iterative formula:
$x^{(k+1)} = D^{-1}(b - (L+U)x^{(k)})$
For each component $x_i$:
$a_{ii}x_i + \sum_{j \neq i} a_{ij}x_j = b_i$
$a_{ii}x_i = b_i - \sum_{j \neq i} a_{ij}x_j$
$x_i^{(k+1)} = \frac{1}{a_{ii}} \left( b_i - \sum_{j=1, j \neq i}^{n} a_{ij}x_j^{(k)} \right)$

**Concrete Example (Jacobi):**
For $A = \begin{pmatrix} 2 & 1 \\ 1 & 3 \end{pmatrix}$, $b = \begin{pmatrix} 5 \\ 7 \end{pmatrix}$.
The equations are:
$2x_1 + x_2 = 5 \Rightarrow x_1 = \frac{1}{2}(5 - x_2)$
$x_1 + 3x_2 = 7 \Rightarrow x_2 = \frac{1}{3}(7 - x_1)$
Let's start with an initial guess $x^{(0)} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$.

*   **Iteration 1 ($k=0$):**
    $x_1^{(1)} = \frac{1}{2}(5 - x_2^{(0)}) = \frac{1}{2}(5 - 0) = 2.5$
    $x_2^{(1)} = \frac{1}{3}(7 - x_1^{(0)}) = \frac{1}{3}(7 - 0) = 2.333\dots$
    So, $x^{(1)} = \begin{pmatrix} 2.5 \\ 2.333 \end{pmatrix}$.

*   **Iteration 2 ($k=1$):**
    $x_1^{(2)} = \frac{1}{2}(5 - x_2^{(1)}) = \frac{1}{2}(5 - 2.333) = \frac{1}{2}(2.667) = 1.333\dots$
    $x_2^{(2)} = \frac{1}{3}(7 - x_1^{(1)}) = \frac{1}{3}(7 - 2.5) = \frac{1}{3}(4.5) = 1.5$
    So, $x^{(2)} = \begin{pmatrix} 1.333 \\ 1.5 \end{pmatrix}$.
The exact solution is $x_1 = 1.6, x_2 = 1.8$. We are getting closer.

**Formal/Mathematical Version (Jacobi):**
Given $Ax=b$, with $A = D+L+U$. The Jacobi iteration is defined as:
$$x^{(k+1)} = D^{-1}(b - (L+U)x^{(k)})$$
In component form, for $i=1, \dots, n$:
$$x_i^{(k+1)} = \frac{1}{a_{ii}} \left( b_i - \sum_{j=1, j \neq i}^{n} a_{ij}x_j^{(k)} \right)$$
The iteration matrix for Jacobi is $T_J = -D^{-1}(L+U)$. Convergence is guaranteed if the spectral radius $\rho(T_J) < 1$. A sufficient (but not necessary) condition for convergence is if $A$ is strictly diagonally dominant.

**What could go wrong:**
*   **Division by zero:** If any $a_{ii}$ is zero, $D^{-1}$ doesn't exist, and the method fails.
*   **Divergence:** The sequence $x^{(k)}$ might not converge to the true solution. This happens if the iteration matrix $T_J$ has a spectral radius greater than or equal to 1.

### Step 5: Gauss-Seidel Iteration

**Plain English:** Gauss-Seidel is an improvement over Jacobi. When we update a variable $x_i$, we immediately use the *newly calculated* values of $x_1, \dots, x_{i-1}$ from the *current* iteration, instead of waiting until the next iteration. It's like our committee meeting where as soon as someone makes a new suggestion, everyone else immediately takes it into account for their own current suggestion. This usually makes it converge faster.

**Derivation:**
Start with $Ax=b$. Substitute $A=D+L+U$:
$(D+L+U)x = b$
The key idea is to move $L x$ to the left side with $D x$, and $U x$ to the right side:
$(D+L)x = b - Ux$
Now, for the iteration, we use $x^{(k+1)}$ on the left and $x^{(k)}$ on the right:
$(D+L)x^{(k+1)} = b - Ux^{(k)}$
To isolate $x^{(k+1)}$, we multiply by $(D+L)^{-1}$:
$x^{(k+1)} = (D+L)^{-1}(b - Ux^{(k)})$
For each component $x_i$:
$a_{ii}x_i + \sum_{j=1}^{i-1} a_{ij}x_j + \sum_{j=i+1}^{n} a_{ij}x_j = b_i$
$a_{ii}x_i = b_i - \sum_{j=1}^{i-1} a_{ij}x_j - \sum_{j=i+1}^{n} a_{ij}x_j$
$x_i^{(k+1)} = \frac{1}{a_{ii}} \left( b_i - \sum_{j=1}^{i-1} a_{ij}x_j^{(k+1)} - \sum_{j=i+1}^{n} a_{ij}x_j^{(k)} \right)$
Notice the $x_j^{(k+1)}$ for $j < i$ and $x_j^{(k)}$ for $j > i$.

**Concrete Example (Gauss-Seidel):**
For $A = \begin{pmatrix} 2 & 1 \\ 1 & 3 \end{pmatrix}$, $b = \begin{pmatrix} 5 \\ 7 \end{pmatrix}$.
The equations are:
$x_1 = \frac{1}{2}(5 - x_2)$
$x_2 = \frac{1}{3}(7 - x_1)$
Initial guess $x^{(0)} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$.

*   **Iteration 1 ($k=0$):**
    First, calculate $x_1^{(1)}$ using $x_2^{(0)}$:
    $x_1^{(1)} = \frac{1}{2}(5 - x_2^{(0)}) = \frac{1}{2}(5 - 0) = 2.5$
    Now, calculate $x_2^{(1)}$ using the *newly calculated* $x_1^{(1)}$:
    $x_2^{(1)} = \frac{1}{3}(7 - x_1^{(1)}) = \frac{1}{3}(7 - 2.5) = \frac{1}{3}(4.5) = 1.5$
    So, $x^{(1)} = \begin{pmatrix} 2.5 \\ 1.5 \end{pmatrix}$.

*   **Iteration 2 ($k=1$):**
    $x_1^{(2)} = \frac{1}{2}(5 - x_2^{(1)}) = \frac{1}{2}(5 - 1.5) = \frac{1}{2}(3.5) = 1.75$
    $x_2^{(2)} = \frac{1}{3}(7 - x_1^{(2)}) = \frac{1}{3}(7 - 1.75) = \frac{1}{3}(5.25) = 1.75$
    So, $x^{(2)} = \begin{pmatrix} 1.75 \\ 1.75 \end{pmatrix}$.
Comparing to the exact solution $x_1 = 1.6, x_2 = 1.8$, Gauss-Seidel is often faster. Notice in just two iterations, we're closer than Jacobi was.

**Formal/Mathematical Version (Gauss-Seidel):**
Given $Ax=b$, with $A = D+L+U$. The Gauss-Seidel iteration is defined as:
$$x^{(k+1)} = (D+L)^{-1}(b - Ux^{(k)})$$
In component form, for $i=1, \dots, n$:
$$x_i^{(k+1)} = \frac{1}{a_{ii}} \left( b_i - \sum_{j=1}^{i-1} a_{ij}x_j^{(k+1)} - \sum_{j=i+1}^{n} a_{ij}x_j^{(k)} \right)$$
The iteration matrix for Gauss-Seidel is $T_{GS} = -(D+L)^{-1}U$. Gauss-Seidel converges if $\rho(T_{GS}) < 1$. If $A$ is strictly diagonally dominant or symmetric positive definite, Gauss-Seidel is guaranteed to converge.

**What could go wrong:**
*   **Division by zero:** Same as Jacobi, if any $a_{ii}$ is zero.
*   **Divergence:** The sequence $x^{(k)}$ might not converge. While generally faster, Gauss-Seidel is not guaranteed to converge for all matrices where Jacobi converges, and vice-versa (though in practice, Gauss-Seidel is more robust).

### Step 6: Convergence

**Plain English:** Convergence means that as we do more and more iterations, our guesses $x^{(k)}$ get closer and closer to the true solution $x$. If the method converges, the difference between our guess and the true solution shrinks to zero. If it diverges, the guesses get further and further away.

**Concrete Example:**
For the system $x_1 = 8/5 = 1.6$, $x_2 = 9/5 = 1.8$.
Jacobi sequence:
$x^{(0)} = (0,0)$
$x^{(1)} = (2.5, 2.333)$
$x^{(2)} = (1.333, 1.5)$
$x^{(3)} = (1.75, 1.889)$
$x^{(4)} = (1.555, 1.75)$
... this sequence is approaching $(1.6, 1.8)$.

Gauss-Seidel sequence:
$x^{(0)} = (0,0)$
$x^{(1)} = (2.5, 1.5)$
$x^{(2)} = (1.75, 1.75)$
$x^{(3)} = (1.625, 1.791)$
$x^{(4)} = (1.604, 1.798)$
... this sequence is approaching $(1.6, 1.8)$ and seems to do so faster.

**Formal/Mathematical Version:**
An iterative method $x^{(k+1)} = Tx^{(k)} + c$ converges to the unique solution $x^*$ of $x^* = Tx^* + c$ if and only if the spectral radius of the iteration matrix $T$, denoted $\rho(T)$, is less than 1. That is, $\rho(T) = \max_i |\lambda_i| < 1$, where $\lambda_i$ are the eigenvalues of $T$.

A common sufficient condition for convergence for both Jacobi and Gauss-Seidel is **strict diagonal dominance** of matrix $A$. A matrix $A$ is strictly diagonally dominant if for every row $i$:
$$|a_{ii}| > \sum_{j=1, j \neq i}^{n} |a_{ij}|$$
If $A$ is strictly diagonally dominant, both Jacobi and Gauss-Seidel methods are guaranteed to converge.

**What could go wrong:**
*   **Slow convergence:** Even if $\rho(T) < 1$, if it's very close to 1 (e.g., 0.99), it will take a huge number of iterations to get a good approximation.
*   **No convergence:** If $\rho(T) \ge 1$, the method will diverge or oscillate without settling on a solution.

## 5. Worked examples — multiple, with every step shown

We will use the system:
$A = \begin{pmatrix} 4 & 1 & 1 \\ 1 & 5 & 2 \\ 1 & 2 & 3 \end{pmatrix}$, $x = \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix}$, $b = \begin{pmatrix} 8 \\ 12 \\ 6 \end{pmatrix}$
The exact solution for this system is $x_1=1, x_2=2, x_3=1$.
Notice that this matrix $A$ is strictly diagonally dominant:
Row 1: $|4| > |1| + |1|$ ($4 > 2$) - True
Row 2: $|5| > |1| + |2|$ ($5 > 3$) - True
Row 3: $|3| > |1| + |2|$ ($3 > 3$) - False. Oh, wait. It's not strictly diagonally dominant in row 3. It's diagonally dominant, but not *strictly* for row 3. Let's adjust the matrix slightly to ensure strict diagonal dominance for convergence demonstration.

Let's use:
$A = \begin{pmatrix} 4 & 1 & 1 \\ 1 & 5 & 1 \\ 1 & 1 & 3 \end{pmatrix}$, $x = \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix}$, $b = \begin{pmatrix} 8 \\ 12 \\ 6 \end{pmatrix}$
Now, let's check strict diagonal dominance:
Row 1: $|4| > |1| + |1|$ ($4 > 2$) - True
Row 2: $|5| > |1| + |1|$ ($5 > 2$) - True
Row 3: $|3| > |1| + |1|$ ($3 > 2$) - True
This matrix is strictly diagonally dominant, so both methods are guaranteed to converge.
The exact solution for this *new* system is $x_1=1.5, x_2=2, x_3=1.5$. (You can verify by substitution: $4(1.5)+2+1.5 = 6+2+1.5 = 9.5 \neq 8$. My mistake. Let's use a simpler system for the exact solution. Let's find the exact solution for this one first.
$4x_1+x_2+x_3=8$
$x_1+5x_2+x_3=12$
$x_1+x_2+3x_3=6$
Subtract (1) from (2) and (3):
$3x_2 = 4x_1+x_2+x_3 - (x_1+5x_2+x_3) = 8 - 12 = -4$
This is not helpful. Let's use Gaussian elimination to find the exact solution.
$\begin{pmatrix} 4 & 1 & 1 & | & 8 \\ 1 & 5 & 1 & | & 12 \\ 1 & 1 & 3 & | & 6 \end{pmatrix}$
$R_2 \leftarrow R_2 - \frac{1}{4}R_1$: $\begin{pmatrix} 4 & 1 & 1 & | & 8 \\ 0 & 19/4 & 3/4 & | & 10 \\ 1 & 1 & 3 & | & 6 \end{pmatrix}$
$R_3 \leftarrow R_3 - \frac{1}{4}R_1$: $\begin{pmatrix} 4 & 1 & 1 & | & 8 \\ 0 & 19/4 & 3/4 & | & 10 \\ 0 & 3/4 & 11/4 & | & 4 \end{pmatrix}$
$R_3 \leftarrow R_3 - \frac{3/4}{19/4}R_2 = R_3 - \frac{3}{19}R_2$:
$\begin{pmatrix} 4 & 1 & 1 & | & 8 \\ 0 & 19/4 & 3/4 & | & 10 \\ 0 & 0 & 11/4 - \frac{3}{19}\frac{3}{4} & | & 4 - \frac{3}{19}10 \end{pmatrix} = \begin{pmatrix} 4 & 1 & 1 & | & 8 \\ 0 & 19/4 & 3/4 & | & 10 \\ 0 & 0 & \frac{209-9}{76} & | & \frac{76-30}{19} \end{pmatrix} = \begin{pmatrix} 4 & 1 & 1 & | & 8 \\ 0 & 19/4 & 3/4 & | & 10 \\ 0 & 0 & \frac{200}{76} & | & \frac{46}{19} \end{pmatrix}$
$\frac{200}{76}x_3 = \frac{46}{19} \Rightarrow \frac{50}{19}x_3 = \frac{46}{19} \Rightarrow x_3 = \frac{46}{50} = \frac{23}{25} = 0.92$
$\frac{19}{4}x_2 + \frac{3}{4}x_3 = 10 \Rightarrow \frac{19}{4}x_2 = 10 - \frac{3}{4}(\frac{23}{25}) = 10 - \frac{69}{100} = \frac{1000-69}{100} = \frac{931}{100}$
$x_2 = \frac{931}{100} \cdot \frac{4}{19} = \frac{931}{25 \cdot 19} = \frac{49}{25} = 1.96$
$4x_1 + x_2 + x_3 = 8 \Rightarrow 4x_1 = 8 - \frac{49}{25} - \frac{23}{25} = 8 - \frac{72}{25} = \frac{200-72}{25} = \frac{128}{25}$
$x_1 = \frac{128}{100} = \frac{32}{25} = 1.28$
So, the exact solution is $x = \begin{pmatrix} 1.28 \\ 1.96 \\ 0.92 \end{pmatrix}$. This will be our target.

Initial guess for all examples: $x^{(0)} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$.

### Example 1: Jacobi Iteration (2 iterations)

**Problem:** Solve the system $Ax=b$ using the Jacobi method for 2 iterations, starting with $x^{(0)} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$.
$$ A = \begin{pmatrix} 4 & 1 & 1 \\ 1 & 5 & 1 \\ 1 & 1 & 3 \end{pmatrix}, \quad b = \begin{pmatrix} 8 \\ 12 \\ 6 \end{pmatrix} $$

**Given:** Matrix $A$, vector $b$, initial guess $x^{(0)}$, number of iterations.
**Want:** $x^{(1)}$ and $x^{(2)}$ using Jacobi.

**Step 1: Write out the iterative equations.**
The general Jacobi formula is $x_i^{(k+1)} = \frac{1}{a_{ii}} \left( b_i - \sum_{j=1, j \neq i}^{n} a_{ij}x_j^{(k)} \right)$.
For our system:
$x_1^{(k+1)} = \frac{1}{4}(8 - x_2^{(k)} - x_3^{(k)})$
$x_2^{(k+1)} = \frac{1}{5}(12 - x_1^{(k)} - x_3^{(k)})$
$x_3^{(k+1)} = \frac{1}{3}(6 - x_1^{(k)} - x_2^{(k)})$

**Step 2: Perform Iteration 1 ($k=0$).**
We use $x^{(0)} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$.
$x_1^{(1)} = \frac{1}{4}(8 - x_2^{(0)} - x_3^{(0)})$
$\qquad = \frac{1}{4}(8 - 0 - 0)$
$\qquad = \frac{8}{4} = 2$
This is the first component of the new vector, calculated using the previous iteration's values.

$x_2^{(1)} = \frac{1}{5}(12 - x_1^{(0)} - x_3^{(0)})$
$\qquad = \frac{1}{5}(12 - 0 - 0)$
$\qquad = \frac{12}{5} = 2.4$
This is the second component, also using only values from $x^{(0)}$.

$x_3^{(1)} = \frac{1}{3}(6 - x_1^{(0)} - x_2^{(0)})$
$\qquad = \frac{1}{3}(6 - 0 - 0)$
$\qquad = \frac{6}{3} = 2$
This is the third component, again using only values from $x^{(0)}$.

So, after Iteration 1, we have $x^{(1)} = \begin{pmatrix} 2 \\ 2.4 \\ 2 \end{pmatrix}$.

**Step 3: Perform Iteration 2 ($k=1$).**
Now we use $x^{(1)} = \begin{pmatrix} 2 \\ 2.4 \\ 2 \end{pmatrix}$.
$x_1^{(2)} = \frac{1}{4}(8 - x_2^{(1)} - x_3^{(1)})$
$\qquad = \frac{1}{4}(8 - 2.4 - 2)$
$\qquad = \frac{1}{4}(3.6) = 0.9$
This calculation uses the $x_2^{(1)}$ and $x_3^{(1)}$ values from the *previous* iteration.

$x_2^{(2)} = \frac{1}{5}(12 - x_1^{(1)} - x_3^{(1)})$
$\qquad = \frac{1}{5}(12 - 2 - 2)$
$\qquad = \frac{1}{5}(8) = 1.6$
Again, using $x_1^{(1)}$ and $x_3^{(1)}$ from the *previous* iteration.

$x_3^{(2)} = \frac{1}{3}(6 - x_1^{(1)} - x_2^{(1)})$
$\qquad = \frac{1}{3}(6 - 2 - 2.4)$
$\qquad = \frac{1}{3}(1.6) = 0.5333\dots$
Using $x_1^{(1)}$ and $x_2^{(1)}$ from the *previous* iteration.

So, after Iteration 2, we have $x^{(2)} = \begin{pmatrix} 0.9 \\ 1.6 \\ 0.5333 \end{pmatrix}$.

**Final Answer:**
After 2 iterations of the Jacobi method, the approximation is:
$$ \boxed{x^{(2)} = \begin{pmatrix} 0.9 \\ 1.6 \\ 0.5333 \end{pmatrix}} $$

**Reflection:** This example shows the mechanics of Jacobi. Each component update for the current iteration depends *only* on the values from the *entirely previous* iteration. Comparing to the exact solution $(1.28, 1.96, 0.92)$, we are moving towards it, but still quite far.

### Example 2: Gauss-Seidel Iteration (2 iterations)

**Problem:** Solve the system $Ax=b$ using the Gauss-Seidel method for 2 iterations, starting with $x^{(0)} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$.
$$ A = \begin{pmatrix} 4 & 1 & 1 \\ 1 & 5 & 1 \\ 1 & 1 & 3 \end{pmatrix}, \quad b = \begin{pmatrix} 8 \\ 12 \\ 6 \end{pmatrix} $$

**Given:** Matrix $A$, vector $b$, initial guess $x^{(0)}$, number of iterations.
**Want:** $x^{(1)}$ and $x^{(2)}$ using Gauss-Seidel.

**Step 1: Write out the iterative equations.**
The general Gauss-Seidel formula is $x_i^{(k+1)} = \frac{1}{a_{ii}} \left( b_i - \sum_{j=1}^{i-1} a_{ij}x_j^{(k+1)} - \sum_{j=i+1}^{n} a_{ij}x_j^{(k)} \right)$.
For our system:
$x_1^{(k+1)} = \frac{1}{4}(8 - x_2^{(k)} - x_3^{(k)})$
$x_2^{(k+1)} = \frac{1}{5}(12 - x_1^{(k+1)} - x_3^{(k)})$ (Note $x_1^{(k+1)}$ here!)
$x_3^{(k+1)} = \frac{1}{3}(6 - x_1^{(k+1)} - x_2^{(k+1)})$ (Note $x_1^{(k+1)}$ and $x_2^{(k+1)}$ here!)

**Step 2: Perform Iteration 1 ($k=0$).**
We use $x^{(0)} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$.
$x_1^{(1)} = \frac{1}{4}(8 - x_2^{(0)} - x_3^{(0)})$
$\qquad = \frac{1}{4}(8 - 0 - 0)$
$\qquad = \frac{8}{4} = 2$
This is the first component of the new vector, calculated using previous iteration's values for $x_2, x_3$.

$x_2^{(1)} = \frac{1}{5}(12 - x_1^{(1)} - x_3^{(0)})$
$\qquad = \frac{1}{5}(12 - 2 - 0)$
$\qquad = \frac{1}{5}(10) = 2$
Crucially, for $x_2^{(1)}$, we used the *newly calculated* $x_1^{(1)}=2$, not $x_1^{(0)}=0$.

$x_3^{(1)} = \frac{1}{3}(6 - x_1^{(1)} - x_2^{(1)})$
$\qquad = \frac{1}{3}(6 - 2 - 2)$
$\qquad = \frac{1}{3}(2) = 0.6667\dots$
Again, for $x_3^{(1)}$, we used the *newly calculated* $x_1^{(1)}=2$ and $x_2^{(1)}=2$.

So, after Iteration 1, we have $x^{(1)} = \begin{pmatrix} 2 \\ 2 \\ 0.6667 \end{pmatrix}$.

**Step 3: Perform Iteration 2 ($k=1$).**
Now we use $x^{(1)} = \begin{pmatrix} 2 \\ 2 \\ 0.6667 \end{pmatrix}$.
$x_1^{(2)} = \frac{1}{4}(8 - x_2^{(1)} - x_3^{(1)})$
$\qquad = \frac{1}{4}(8 - 2 - 0.6667)$
$\qquad = \frac{1}{4}(5.3333) = 1.3333\dots$
This uses $x_2^{(1)}$ and $x_3^{(1)}$ from the *previous full iteration*.

$x_2^{(2)} = \frac{1}{5}(12 - x_1^{(2)} - x_3^{(1)})$
$\qquad = \frac{1}{5}(12 - 1.3333 - 0.6667)$
$\qquad = \frac{1}{5}(10) = 2$
Here we used the *newly calculated* $x_1^{(2)}=1.3333$ and the *previous* $x_3^{(1)}=0.6667$.

$x_3^{(2)} = \frac{1}{3}(6 - x_1^{(2)} - x_2^{(2)})$
$\qquad = \frac{1}{3}(6 - 1.3333 - 2)$
$\qquad = \frac{1}{3}(2.6667) = 0.8889\dots$
Here we used the *newly calculated* $x_1^{(2)}=1.3333$ and $x_2^{(2)}=2$.

So, after Iteration 2, we have $x^{(2)} = \begin{pmatrix} 1.3333 \\ 2 \\ 0.8889 \end{pmatrix}$.

**Final Answer:**
After 2 iterations of the Gauss-Seidel method, the approximation is:
$$ \boxed{x^{(2)} = \begin{pmatrix} 1.3333 \\ 2 \\ 0.8889 \end{pmatrix}} $$

**Reflection:** Comparing to the exact solution $(1.28, 1.96, 0.92)$, Gauss-Seidel's $x^{(2)}$ is $(1.3333, 2, 0.8889)$, which is noticeably closer than Jacobi's $x^{(2)}$ of $(0.9, 1.6, 0.5333)$. This illustrates why Gauss-Seidel is generally preferred when it converges.

### Example 3: Jacobi Iteration (Convergence check)

**Problem:** Perform Jacobi iterations for the system below until the $L_\infty$-norm of the difference between successive iterations is less than $0.1$.
$$ \begin{pmatrix} 3 & 1 \\ 1 & 2 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 5 \\ 5 \end{pmatrix} $$
Start with $x^{(0)} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$.

**Given:** Matrix $A$, vector $b$, initial guess $x^{(0)}$, tolerance $\epsilon = 0.1$.
**Want:** The approximate solution $x^{(k)}$ when $\|x^{(k)} - x^{(k-1)}\|_\infty < 0.1$.

**Step 1: Write out the iterative equations.**
$x_1^{(k+1)} = \frac{1}{3}(5 - x_2^{(k)})$
$x_2^{(k+1)} = \frac{1}{2}(5 - x_1^{(k)})$

**Step 2: Perform Iteration 1 ($k=0$).**
$x^{(0)} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$.
$x_1^{(1)} = \frac{1}{3}(5 - 0) = \frac{5}{3} \approx 1.6667$
$x_2^{(1)} = \frac{1}{2}(5 - 0) = \frac{5}{2} = 2.5$
$x^{(1)} = \begin{pmatrix} 1.6667 \\ 2.5 \end{pmatrix}$.

**Step 3: Check convergence for Iteration 1.**
Calculate the difference: $x^{(1)} - x^{(0)} = \begin{pmatrix} 1.6667 \\ 2.5 \end{pmatrix} - \begin{pmatrix} 0 \\ 0 \end{pmatrix} = \begin{pmatrix} 1.6667 \\ 2.5 \end{pmatrix}$.
The $L_\infty$-norm is $\|x^{(1)} - x^{(0)}\|_\infty = \max(|1.6667|, |2.5|) = 2.5$.
Since $2.5 \not< 0.1$, we continue.

**Step 4: Perform Iteration 2 ($k=1$).**
Use $x^{(1)} = \begin{pmatrix} 1.6667 \\ 2.5 \end{pmatrix}$.
$x_1^{(2)} = \frac{1}{3}(5 - x_2^{(1)}) = \frac{1}{3}(5 - 2.5) = \frac{1}{3}(2.5) \approx 0.8333$
$x_2^{(2)} = \frac{1}{2}(5 - x_1^{(1)}) = \frac{1}{2}(5 - 1.6667) = \frac{1}{2}(3.3333) \approx 1.6667$
$x^{(2)} = \begin{pmatrix} 0.8333 \\ 1.6667 \end{pmatrix}$.

**Step 5: Check convergence for Iteration 2.**
Calculate the difference: $x^{(2)} - x^{(1)} = \begin{pmatrix} 0.8333 \\ 1.6667 \end{pmatrix} - \begin{pmatrix} 1.6667 \\ 2.5 \end{pmatrix} = \begin{pmatrix} -0.8334 \\ -0.8333 \end{pmatrix}$.
The $L_\infty$-norm is $\|x^{(2)} - x^{(1)}\|_\infty = \max(|-0.8334|, |-0.8333|) = 0.8334$.
Since $0.8334 \not< 0.1$, we continue.

**Step 6: Perform Iteration 3 ($k=2$).**
Use $x^{(2)} = \begin{pmatrix} 0.8333 \\ 1.6667 \end{pmatrix}$.
$x_1^{(3)} = \frac{1}{3}(5 - x_2^{(2)}) = \frac{1}{3}(5 - 1.6667) = \frac{1}{3}(3.3333) \approx 1.1111$
$x_2^{(3)} = \frac{1}{2}(5 - x_1^{(2)}) = \frac{1}{2}(5 - 0.8333) = \frac{1}{2}(4.1667) \approx 2.0833$
$x^{(3)} = \begin{pmatrix} 1.1111 \\ 2.0833 \end{pmatrix}$.

**Step 7: Check convergence for Iteration 3.**
Calculate the difference: $x^{(3)} - x^{(2)} = \begin{pmatrix} 1.1111 \\ 2.0833 \end{pmatrix} - \begin{pmatrix} 0.8333 \\ 1.6667 \end{pmatrix} = \begin{pmatrix} 0.2778 \\ 0.4166 \end{pmatrix}$.
The $L_\infty$-norm is $\|x^{(3)} - x^{(2)}\|_\infty = \max(|0.2778|, |0.4166|) = 0.4166$.
Since $0.4166 \not< 0.1$, we continue.

**Step 8: Perform Iteration 4 ($k=3$).**
Use $x^{(3)} = \begin{pmatrix} 1.1111 \\ 2.0833 \end{pmatrix}$.
$x_1^{(4)} = \frac{1}{3}(5 - x_2^{(3)}) = \frac{1}{3}(5 - 2.0833) = \frac{1}{3}(2.9167) \approx 0.9722$
$x_2^{(4)} = \frac{1}{2}(5 - x_1^{(3)}) = \frac{1}{2}(5 - 1.1111) = \frac{1}{2}(3.8889) \approx 1.9445$
$x^{(4)} = \begin{pmatrix} 0.9722 \\ 1.9445 \end{pmatrix}$.

**Step 9: Check convergence for Iteration 4.**
Calculate the difference: $x^{(4)} - x^{(3)} = \begin{pmatrix} 0.9722 \\ 1.9445 \end{pmatrix} - \begin{pmatrix} 1.1111 \\ 2.0833 \end{pmatrix} = \begin{pmatrix} -0.1389 \\ -0.1388 \end{pmatrix}$.
The $L_\infty$-norm is $\|x^{(4)} - x^{(3)}\|_\infty = \max(|-0.1389|, |-0.1388|) = 0.1389$.
Since $0.1389 \not< 0.1$, we continue.

**Step 10: Perform Iteration 5 ($k=4$).**
Use $x^{(4)} = \begin{pmatrix} 0.9722 \\ 1.9445 \end{pmatrix}$.
$x_1^{(5)} = \frac{1}{3}(5 - x_2^{(4)}) = \frac{1}{3}(5 - 1.9445) = \frac{1}{3}(3.0555) \approx 1.0185$
$x_2^{(5)} = \frac{1}{2}(5 - x_1^{(4)}) = \frac{1}{2}(5 - 0.9722) = \frac{1}{2}(4.0278) \approx 2.0139$
$x^{(5)} = \begin{pmatrix} 1.0185 \\ 2.0139 \end{pmatrix}$.

**Step 11: Check convergence for Iteration 5.**
Calculate the difference: $x^{(5)} - x^{(4)} = \begin{pmatrix} 1.0185 \\ 2.0139 \end{pmatrix} - \begin{pmatrix} 0.9722 \\ 1.9445 \end{pmatrix} = \begin{pmatrix} 0.0463 \\ 0.0694 \end{pmatrix}$.
The $L_\infty$-norm is $\|x^{(5)} - x^{(4)}\|_\infty = \max(|0.0463|, |0.0694|) = 0.0694$.
Since $0.0694 < 0.1$, the convergence criterion is met.

**Final Answer:**
The approximate solution satisfying the convergence criterion is:
$$ \boxed{x^{(5)} = \begin{pmatrix} 1.0185 \\ 2.0139 \end{pmatrix}} $$

**Reflection:** The exact solution for this system is $x_1=1, x_2=2$. Our approximation $x^{(5)}$ is quite close. This example shows how to track the convergence using a norm and a specified tolerance, which is crucial in practical applications. It also highlights that Jacobi can take several iterations to converge even for a small system.

### Example 4: Gauss-Seidel Iteration (Convergence check, harder)

**Problem:** Solve the system $Ax=b$ using the Gauss-Seidel method until the $L_\infty$-norm of the difference between successive iterations is less than $0.05$.
$$ \begin{pmatrix} 10 & -1 & 2 \\ -1 & 11 & -1 \\ 2 & -1 & 10 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 6 \\ 25 \\ -11 \end{pmatrix} $$
Start with $x^{(0)} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$.
(Note: This matrix is strictly diagonally dominant, so convergence is guaranteed.)
The exact solution is $x_1=1, x_2=2, x_3=-1$.

**Given:** Matrix $A$, vector $b$, initial guess $x^{(0)}$, tolerance $\epsilon = 0.05$.
**Want:** The approximate solution $x^{(k)}$ when $\|x^{(k)} - x^{(k-1)}\|_\infty < 0.05$.

**Step 1: Write out the iterative equations.**
$x_1^{(k+1)} = \frac{1}{10}(6 + x_2^{(k)} - 2x_3^{(k)})$
$x_2^{(k+1)} = \frac{1}{11}(25 + x_1^{(k+1)} + x_3^{(k)})$
$x_3^{(k+1)} = \frac{1}{10}(-11 - 2x_1^{(k+1)} + x_2^{(k+1)})$

**Step 2: Perform Iteration 1 ($k=0$).**
$x^{(0)} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$.
$x_1^{(1)} = \frac{1}{10}(6 + 0 - 2(0)) = \frac{6}{10} = 0.6$
$x_2^{(1)} = \frac{1}{11}(25 + x_1^{(1)} + x_3^{(0)}) = \frac{1}{11}(25 + 0.6 + 0) = \frac{25.6}{11} \approx 2.3273$
$x_3^{(1)} = \frac{1}{10}(-11 - 2x_1^{(1)} + x_2^{(1)}) = \frac{1}{10}(-11 - 2(0.6) + 2.3273) = \frac{1}{10}(-11 - 1.2 + 2.3273) = \frac{-9.8727}{10} \approx -0.9873$
$x^{(1)} = \begin{pmatrix} 0.6 \\ 2.3273 \\ -0.9873 \end{pmatrix}$.

**Step 3: Check convergence for Iteration 1.**
$x^{(1)} - x^{(0)} = \begin{pmatrix} 0.6 \\ 2.3273 \\ -0.9873 \end{pmatrix} - \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix} = \begin{pmatrix} 0.6 \\ 2.3273 \\ -0.9873 \end{pmatrix}$.
$\|x^{(1)} - x^{(0)}\|_\infty = \max(|0.6|, |2.3273|, |-0.9873|) = 2.3273$.
Since $2.3273 \not< 0.05$, continue.

**Step 4: Perform Iteration 2 ($k=1$).**
$x^{(1)} = \begin{pmatrix} 0.6 \\ 2.3273 \\ -0.9873 \end{pmatrix}$.
$x_1^{(2)} = \frac{1}{10}(6 + x_2^{(1)} - 2x_3^{(1)}) = \frac{1}{10}(6 + 2.3273 - 2(-0.9873)) = \frac{1}{10}(6 + 2.3273 + 1.9746) = \frac{10.3019}{10} \approx 1.0302$
$x_2^{(2)} = \frac{1}{11}(25 + x_1^{(2)} + x_3^{(1)}) = \frac{1}{11}(25 + 1.0302 + (-0.9873)) = \frac{1}{11}(25 + 1.0302 - 0.9873) = \frac{25.0429}{11} \approx 2.2766$
$x_3^{(2)} = \frac{1}{10}(-11 - 2x_1^{(2)} + x_2^{(2)}) = \frac{1}{10}(-11 - 2(1.0302) + 2.2766) = \frac{1}{10}(-11 - 2.0604 + 2.2766) = \frac{-10.7838}{10} \approx -1.0784$
$x^{(2)} = \begin{pmatrix} 1.0302 \\ 2.2766 \\ -1.0784 \end{pmatrix}$.

**Step 5: Check convergence for Iteration 2.**
$x^{(2)} - x^{(1)} = \begin{pmatrix} 1.0302 \\ 2.2766 \\ -1.0784 \end{pmatrix} - \begin{pmatrix} 0.6 \\ 2.3273 \\ -0.9873 \end{pmatrix} = \begin{pmatrix} 0.4302 \\ -0.0507 \\ -0.0911 \end{pmatrix}$.
$\|x^{(2)} - x^{(1)}\|_\infty = \max(|0.4302|, |-0.0507|, |-0.0911|) = 0.4302$.
Since $0.4302 \not< 0.05$, continue.

**Step 6: Perform Iteration 3 ($k=2$).**
$x^{(2)} = \begin{pmatrix} 1.0302 \\ 2.2766 \\ -1.0784 \end{pmatrix}$.
$x_1^{(3)} = \frac{1}{10}(6 + x_2^{(2)} - 2x_3^{(2)}) = \frac{1}{10}(6 + 2.2766 - 2(-1.0784)) = \frac{1}{10}(6 + 2.2766 + 2.1568) = \frac{10.4334}{10} \approx 1.0433$
$x_2^{(3)} = \frac{1}{11}(25 + x_1^{(3)} + x_3^{(2)}) = \frac{1}{11}(25 + 1.0433 + (-1.0784)) = \frac{1}{11}(25 + 1.0433 - 1.0784) = \frac{24.9649}{11} \approx 2.2695$
$x_3^{(3)} = \frac{1}{10}(-11 - 2x_1^{(3)} + x_2^{(3)}) = \frac{1}{10}(-11 - 2(1.0433) + 2.2695) = \frac{1}{10}(-11 - 2.0866 + 2.2695) = \frac{-10.8171}{10} \approx -1.0817$
$x^{(3)} = \begin{pmatrix} 1.0433 \\ 2.2695 \\ -1.0817 \end{pmatrix}$.

**Step 7: Check convergence for Iteration 3.**
$x^{(3)} - x^{(2)} = \begin{pmatrix} 1.0433 \\ 2.2695 \\ -1.0817 \end{pmatrix} - \begin{pmatrix} 1.0302 \\ 2.2766 \\ -1.0784 \end{pmatrix} = \begin{pmatrix} 0.0131 \\ -0.0071 \\ -0.0033 \end{pmatrix}$.
$\|x^{(3)} - x^{(2)}\|_\infty = \max(|0.0131|, |-0.0071|, |-0.0033|) = 0.0131$.
Since $0.0131 < 0.05$, the convergence criterion is met.

**Final Answer:**
The approximate solution satisfying the convergence criterion is:
$$ \boxed{x^{(3)} = \begin{pmatrix} 1.0433 \\ 2.2695 \\ -1.0817 \end{pmatrix}} $$

**Reflection:** This example demonstrates how Gauss-Seidel can converge relatively quickly for a well-conditioned (diagonally dominant) matrix. The exact solution is $(1, 2, -1)$, and our approximation $(1.0433, 2.2695, -1.0817)$ is quite close after only 3 iterations. This problem was "harder" because it required more iterations and more complex calculations with negative numbers, but the principle remained the same.

## 6. Common mistakes and traps

1.  **Confusing Jacobi and Gauss-Seidel updates**: The most frequent error is using updated values prematurely in Jacobi or failing to use them in Gauss-Seidel. Remember, Jacobi uses *all old* values for *all* component updates in the current iteration, while Gauss-Seidel uses *any new* values as soon as they are computed within the *same* iteration.
2.  **Incorrect diagonal entries ($a_{ii}$)**: Forgetting to divide by $a_{ii}$ or using the wrong $a_{ii}$ from the matrix can lead to incorrect formulas and divergence. The diagonal elements are crucial for isolating each variable.
3.  **Ignoring convergence criteria**: Students often forget to check if the method is actually converging or when to stop. Without checking the spectral radius or a sufficient condition like diagonal dominance, you might be iterating endlessly on a divergent system.
4.  **Miscalculating the error norm**: When checking for convergence, using the wrong norm (e.g., $L_1$ instead of $L_\infty$) or calculating $\|x^{(k)} - x^{(k-1)}\|$ incorrectly can lead to stopping too early or too late.
5.  **Initial guess bias**: While the initial guess doesn't affect convergence (if the method converges), a poor initial guess can significantly increase the number of iterations needed. Sometimes, students assume $x^{(0)}=0$ is always the best or only choice.
6.  **Numerical precision issues**: For very large systems, round-off errors can accumulate over many iterations, affecting the accuracy of the final solution, even if the method theoretically converges. This is more of a practical trap than a conceptual one.

## 7. Textbook-precise explanation

Let $A x = b$ be a system of $n$ linear equations, where $A \in \mathbb{R}^{n \times n}$ is the coefficient matrix, $x \in \mathbb{R}^n$ is the vector of unknowns, and $b \in \mathbb{R}^n$ is the constant vector.

We decompose the matrix $A$ into three components:
*   $D$: a diagonal matrix containing the diagonal entries of $A$.
*   $L$: a strictly lower triangular matrix containing the entries of $A$ below the main diagonal.
*   $U$: a strictly upper triangular matrix containing the entries of $A$ above the main diagonal.
Thus, $A = D + L + U$.

The system $Ax=b$ can be rewritten as $(D+L+U)x = b$.

### Jacobi Iteration

The Jacobi method isolates the diagonal term for each equation. From $(D+L+U)x = b$, we write $Dx = b - (L+U)x$.
The iterative formula for the Jacobi method is given by:
$$x^{(k+1)} = D^{-1}(b - (L+U)x^{(k)})$$
where $k$ denotes the iteration number, and $x^{(k)}$ is the approximation of the solution vector at iteration $k$.
In component form, for $i=1, 2, \dots, n$:
$$x_i^{(k+1)} = \frac{1}{a_{ii}} \left( b_i - \sum_{j=1, j \neq i}^{n} a_{ij}x_j^{(k)} \right)$$
provided $a_{ii} \neq 0$ for all $i$.
The iteration matrix for Jacobi is $T_J = -D^{-1}(L+U)$, and the constant vector is $c_J = D^{-1}b$. The method converges if and only if the spectral radius $\rho(T_J) < 1$.

### Gauss-Seidel Iteration

The Gauss-Seidel method utilizes the most recently computed components of $x$ as soon as they are available within the current iteration. From $(D+L+U)x = b$, we group the diagonal and lower triangular parts on the left: $(D+L)x = b - Ux$.
The iterative formula for the Gauss-Seidel method is given by:
$$(D+L)x^{(k+1)} = b - Ux^{(k)}$$
$$x^{(k+1)} = (D+L)^{-1}(b - Ux^{(k)})$$
In component form, for $i=1, 