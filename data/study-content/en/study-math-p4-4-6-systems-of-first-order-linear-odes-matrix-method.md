## 1. The one-sentence answer
**Systems of first-order linear ODEs are converted into the single vector equation \(\mathbf{x}'=A\mathbf{x}+\mathbf{f}(t)\) and solved by treating the constant-coefficient homogeneous part as an eigenvalue problem on the matrix \(A\).**

A system such as \(x'=3x+2y\), \(y'=x+4y\) looks like two separate equations, yet the variables are coupled. Stacking \(x\) and \(y\) into a column vector \(\mathbf{x}\) collapses the pair into one matrix equation whose solution is built from the eigenvectors of the coefficient matrix. The same reduction works for any number of equations.

Once the system is in matrix form, the homogeneous solution is assembled exactly as scalar solutions are assembled from characteristic roots: each eigenvalue \(\lambda\) supplies a term \(c\,e^{\lambda t}\mathbf{v}\). Non-homogeneous forcing is handled afterward by variation of parameters or undetermined coefficients in vector form.

> [!NOTE]
> The decisive insight is that the matrix exponential \(e^{At}\) is the direct analogue of the scalar \(e^{at}\); everything else follows from that single object.

## 2. Why this matters — concrete and current
NASA’s attitude-control loops for the James Webb Space Telescope are written as 6-by-6 linear systems whose state matrix encodes rigid-body dynamics and reaction-wheel torques; eigenvalue placement yields the gains that keep the telescope pointed to milli-arcsecond precision.

In lithium-ion battery management systems, the Thevenin equivalent circuit plus diffusion dynamics produces a 4-by-4 linear ODE whose solution supplies the extended Kalman filter inside every modern EV battery pack (Tesla, GM, CATL).

Compartmental pharmacokinetic models used by the FDA for drug dosing are linear systems whose rate matrix contains clearance and transfer coefficients; the matrix exponential gives the exact plasma concentration curve after an intravenous bolus.

Power-grid small-signal stability analysis performed by PJM and ERCOT linearises the swing equations around an operating point, producing a sparse matrix whose eigenvalues determine whether a 500 kV line trip will cause inter-area oscillations.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Matrix–vector multiplication | Converts the coupled scalar equations into \(\mathbf{x}'=A\mathbf{x}\). |
| Eigenvalues and eigenvectors | Supply the exponential solutions \(e^{\lambda t}\mathbf{v}\). |
| First-order linear scalar ODEs | Provide the template that the vector case generalises.    |
| Linear independence of functions | Guarantees that \(n\) independent eigenvectors yield a basis of solutions. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Vectorise the system
Write each unknown function as a component of a single column vector. The derivative of the vector is then the vector of derivatives, and the right-hand sides become a matrix times that vector.

Example:  
\(x'=3x+2y\),  
\(y'=x+4y\)  
becomes  
\[
\mathbf{x}'=\begin{pmatrix}3&2\\1&4\end{pmatrix}\mathbf{x}.
\]

Formal statement:  
\[
\mathbf{x}'=A\mathbf{x},\qquad\mathbf{x}=\begin{pmatrix}x_1\\\vdots\\x_n\end{pmatrix}.
\]

> [!WARNING]
> Treating the equations as independent scalar ODEs discards the coupling encoded in the off-diagonal entries of \(A\).

### Step 2 — Seek exponential solutions
Assume a trial solution of the form \(\mathbf{x}(t)=e^{rt}\mathbf{v}\). Differentiating and substituting produces an algebraic eigenvalue problem.

Formal statement:  
\[
A\mathbf{v}=r\mathbf{v}.
\]

### Step 3 — Solve the eigenvalue problem
Compute the characteristic polynomial \(\det(A-rI)=0\). Each root \(r=\lambda\) yields at least one eigenvector \(\mathbf{v}\).

### Step 4 — Assemble the homogeneous solution
If \(A\) possesses a full set of linearly independent eigenvectors \(\mathbf{v}_1,\dots,\mathbf{v}_n\) with eigenvalues \(\lambda_1,\dots,\lambda_n\), the general solution is the linear combination
\[
\mathbf{x}_h(t)=c_1e^{\lambda_1 t}\mathbf{v}_1+\dots+c_ne^{\lambda_n t}\mathbf{v}_n.
\]

### Step 5 — Handle repeated eigenvalues
When an eigenvalue has insufficient eigenvectors, multiply the corresponding terms by powers of \(t\) (generalised eigenvectors) exactly as in the scalar case.

### Step 6 — Add a particular solution for the non-homogeneous term
The full solution is \(\mathbf{x}=\mathbf{x}_h+\mathbf{x}_p\). \(\mathbf{x}_p\) may be found by undetermined coefficients or by the variation-of-parameters formula
\[
\mathbf{x}_p(t)=\Phi(t)\int\Phi^{-1}(s)\mathbf{f}(s)\,ds,
\]
where \(\Phi\) is the fundamental matrix whose columns are the homogeneous solutions.

## 5. Worked examples — every step shown

**Example 1 — Two distinct real eigenvalues**  
*Given:*  
\[
x'=3x+2y,\qquad y'=x+4y.
\]  
*Find:* general solution.  

Write the matrix form  
\[
A=\begin{pmatrix}3&2\\1&4\end{pmatrix}.
\]  
*Why:* converts the system into a single equation.  

Characteristic polynomial:  
\[
\det(A-rI)=(3-r)(4-r)-2=r^2-7r+10=0.
\]  
*Why:* expands the definition of eigenvalue.  

Roots: \(r=2,5\).  
Eigenvectors: \(\mathbf{v}_1=\begin{pmatrix}2\\1\end{pmatrix}\), \(\mathbf{v}_2=\begin{pmatrix}1\\1\end{pmatrix}\).  
*Why:* solves \((A-rI)\mathbf{v}=0\).  

General solution:  
\[
\mathbf{x}(t)=c_1e^{2t}\begin{pmatrix}2\\1\end{pmatrix}+c_2e^{5t}\begin{pmatrix}1\\1\end{pmatrix}.
\]  
**Final answer**  
\[
\mathbf{x}(t)=c_1e^{2t}\begin{pmatrix}2\\1\end{pmatrix}+c_2e^{5t}\begin{pmatrix}1\\1\end{pmatrix}.
\]  
*Reflection:* The only algebraic labour is the 2-by-2 eigenvalue calculation; once the vectors are known, the solution is immediate.

**Example 2 — Complex eigenvalues**  
*Given:*  
\[
\mathbf{x}'=\begin{pmatrix}0&-1\\1&0\end{pmatrix}\mathbf{x}.
\]  
*Find:* general solution.  

Characteristic equation \(r^2+1=0\) yields \(\lambda=\pm i\).  
Real and imaginary parts of the eigenvector give the two real solutions  
\[
\mathbf{x}(t)=c_1\begin{pmatrix}\cos t\\\sin t\end{pmatrix}+c_2\begin{pmatrix}-\sin t\\\cos t\end{pmatrix}.
\]  
**Final answer**  
\[
\mathbf{x}(t)=c_1\begin{pmatrix}\cos t\\\sin t\end{pmatrix}+c_2\begin{pmatrix}-\sin t\\\cos t\end{pmatrix}.
\]  
*Reflection:* Complex arithmetic is reduced to a pair of real oscillatory solutions by separating real and imaginary parts.

**Example 3 — Repeated eigenvalue, one eigenvector**  
*Given:*  
\[
A=\begin{pmatrix}3&1\\0&3\end{pmatrix}.
\]  
*Find:* general solution.  

\(\lambda=3\) (algebraic multiplicity 2). Only one independent eigenvector \(\mathbf{v}=\begin{pmatrix}1\\0\end{pmatrix}\).  
Generalised eigenvector \(\mathbf{w}\) satisfies \((A-3I)\mathbf{w}=\mathbf{v}\), yielding \(\mathbf{w}=\begin{pmatrix}0\\1\end{pmatrix}\).  

Solution:  
\[
\mathbf{x}(t)=c_1e^{3t}\begin{pmatrix}1\\0\end{pmatrix}+c_2e^{3t}\bigl(t\begin{pmatrix}1\\0\end{pmatrix}+\begin{pmatrix}0\\1\end{pmatrix}\bigr).
\]  
**Final answer**  
\[
\mathbf{x}(t)=(c_1+c_2t)e^{3t}\begin{pmatrix}1\\0\end{pmatrix}+c_2e^{3t}\begin{pmatrix}0\\1\end{pmatrix}.
\]  
*Reflection:* The extra factor of \(t\) appears precisely when geometric multiplicity is deficient.

**Example 4 — Non-homogeneous forcing**  
*Given:*  
\[
\mathbf{x}'=\begin{pmatrix}0&1\\-2&-3\end{pmatrix}\mathbf{x}+\begin{pmatrix}0\\e^{-t}\end{pmatrix}.
\]  
*Find:* general solution.  

Homogeneous eigenvalues \(\lambda=-1,-2\). Fundamental matrix \(\Phi(t)\) formed from \(e^{-t}\mathbf{v}_1\) and \(e^{-2t}\mathbf{v}_2\).  
Variation of parameters integral produces a particular solution \(\mathbf{x}_p=\begin{pmatrix}-t e^{-t}\\ (t-1)e^{-t}\end{pmatrix}\).  

**Final answer**  
\[
\mathbf{x}(t)=c_1e^{-t}\begin{pmatrix}1\\-1\end{pmatrix}+c_2e^{-2t}\begin{pmatrix}1\\-2\end{pmatrix}+\begin{pmatrix}-t e^{-t}\\(t-1)e^{-t}\end{pmatrix}.
\]  
*Reflection:* The forcing term \(e^{-t}\) resonates with one homogeneous solution, so the particular solution acquires the extra factor \(t\).

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Forgetting to verify linear independence of eigenvectors | Automatic assumption that distinct eigenvalues give independent vectors | Always check the dimension of the eigenspace        |
| Using complex eigenvectors without extracting real and imaginary parts | Treating \(e^{(\alpha+i\beta)t}\mathbf{v}\) as the final answer | Separate into two real vector functions immediately |
| Confusing algebraic and geometric multiplicity | Counting roots of the characteristic polynomial without checking the nullity of \(A-\lambda I\) | Compute \(\operatorname{rank}(A-\lambda I)\) explicitly |
| Applying undetermined coefficients when the forcing resonates with a homogeneous solution | Overlooking that \(e^{\lambda t}\mathbf{p}(t)\) may already solve the homogeneous equation | Multiply the usual guess by the lowest power of \(t\) that restores independence |
| Treating a defective matrix as diagonalizable | Proceeding with \(n\) ordinary eigenvectors when only \(k<n\) exist | Always count the number of independent eigenvectors before writing the solution |
| Sign error in the matrix exponential formula | Writing \(e^{At}=Pe^{Dt}P^{-1}\) with the wrong ordering of \(P\) | Verify \(AP=PD\) before exponentiating                |

## 7. The textbook-precise statement
Let \(A\) be an \(n\times n\) constant matrix. The initial-value problem
\[
\mathbf{x}'=A\mathbf{x}+\mathbf{f}(t),\qquad\mathbf{x}(t_0)=\mathbf{x}_0
\]
possesses a unique solution on \(\mathbb{R}\) given by
\[
\mathbf{x}(t)=e^{A(t-t_0)}\mathbf{x}_0+\int_{t_0}^t e^{A(t-s)}\mathbf{f}(s)\,ds,
\]
where \(e^{At}\) is defined via its power series or via the Jordan canonical form of \(A\). (Boyce & DiPrima, *Elementary Differential Equations*, 11e, §7.8.)

## 8. Visual — diagram or schematic
```text
Phase plane for 2-D system
          x2
           ^
           |     / eigenvector v2 (λ=5)
           |    /
           |   /
           |  /
           | /     trajectories
-----------+-----------→ x1
           | \
           |  \   eigenvector v1 (λ=2)
           |   \
           |    \
```
The diagram shows two straight-line solutions along the eigenvectors; all other trajectories are linear combinations that asymptotically follow the faster-growing direction.

## 9. The memory technique
1. **The hook** — Picture the matrix \(A\) as a “linear mixing machine”; each eigenvector is an axis that the machine merely stretches by \(e^{\lambda t}\).  
2. **What to overlearn** — The map \(\mathbf{x}'=A\mathbf{x}\) → eigenvalue problem \(A\mathbf{v}=\lambda\mathbf{v}\); the fundamental matrix \(\Phi(t)=[\,e^{\lambda_1 t}\mathbf{v}_1\mid\dots\mid e^{\lambda_n t}\mathbf{v}_n\,]\).  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the substitution \(\mathbf{x}=e^{rt}\mathbf{v}\) from the definition of the derivative; the algebra always recovers the eigenvalue equation.

## 10. What this unlocks
The matrix method supplies the exact solution operator for any constant-coefficient linear system and is the foundation for stability analysis, control design, and numerical integrators.

- Higher-order linear ODEs reduced to first-order systems  
- Floquet theory for periodic coefficients  
- Linearisation of nonlinear autonomous systems about equilibria  
- State-space control (controllability, observability)  
- Matrix exponential methods in numerical ODE solvers (exponential integrators)

## 11. Self-check — five questions, no answers
1. Convert the scalar equation \(x''+5x'+6x=0\) into a first-order matrix system and solve it.  
2. Find the general solution of  
   \[
   \mathbf{x}'=\begin{pmatrix}1&1\\-1&3\end{pmatrix}\mathbf{x}.
   \]  
3. A 3-by-3 matrix has a triple eigenvalue \(\lambda=2\) but only one independent eigenvector. Write the most general form of the solution.  
4. For the system in Example 4, verify that the given particular solution satisfies the original non-homogeneous equation.  
5. Explain why the matrix exponential \(e^{At}\) automatically satisfies the initial condition \(\mathbf{x}(0)=\mathbf{I}\).