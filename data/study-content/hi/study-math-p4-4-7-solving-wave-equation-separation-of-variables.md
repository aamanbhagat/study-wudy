## 1. The one-sentence answer
**Separation of variables solves the wave equation by writing the solution as a product \(u(x,t)=X(x)T(t)\) that splits the PDE into two ordinary differential equations.**

Aap wave equation \(u_{tt}=c^2u_{xx}\) ko directly nahi solve kar sakte kyunki yeh ek coupled partial differential equation hai. Jab aap product form assume karte ho, derivatives alag ho jaate hain aur aapko ek constant se do independent ODEs mil jaate hain. In ODEs ko boundary conditions ke saath solve karke eigenfunctions milte hain, aur unka linear combination initial conditions satisfy karta hai.

Yeh technique sirf linear homogeneous PDEs par kaam karti hai jahaan boundaries rectangular hain. Ek baar modes mil jaayein to superposition se full solution ban jaata hai.

> [!NOTE]
> The single most important insight is that the separation constant turns the PDE into a Sturm-Liouville eigenvalue problem whose eigenfunctions automatically satisfy the boundary conditions and form an orthogonal basis for the initial data.

## 2. Why this matters — concrete and current
Guitar and piano string synthesis in digital audio workstations (Ableton, Yamaha) uses separation of variables to generate realistic harmonics in real time; each mode’s frequency and decay is computed from the separated spatial eigenvalue problem.

Seismic imaging companies such as Schlumberger and CGG model acoustic wave propagation through layered earth using separation of variables on simplified 1-D and 2-D wave equations before feeding the modal expansion into full-waveform inversion algorithms.

NASA’s Parker Solar Probe data analysis employs separated modal solutions of the wave equation to reconstruct transverse oscillations of the solar wind magnetic field lines observed by the FIELDS instrument.

Fiber-optic communication systems designed by Corning and Nokia Bell Labs rely on modal decomposition (exactly the separated solutions) to predict dispersion and modal coupling in multimode fibers carrying 400 Gbps channels.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Second-order linear ODEs | After separation you obtain two constant-coefficient ODEs whose characteristic equations must be solved exactly |
| Homogeneous boundary conditions | They force the spatial eigenvalue problem; non-homogeneous conditions break the separation |
| Superposition principle  | The wave equation is linear, so any sum of separated solutions is again a solution |
| Inner-product orthogonality | Eigenfunctions of the Sturm-Liouville problem are orthogonal, allowing Fourier coefficients to be computed by integrals |

## 4. Building the idea — from intuition to formalism

### Step 1 — Assume a product solution
Aap sochte ho ki agar boundary conditions x aur t mein alag hain to shayad solution bhi product ke form mein ho. Concrete example: fixed-end string par \(u(0,t)=u(L,t)=0\) suggest karta hai \(X(0)=X(L)=0\). Formal statement: let \(u(x,t)=X(x)T(t)\).  
> [!WARNING]
> Agar product form solution space ko miss kare (jaise traveling waves) to aap incomplete basis paa sakte ho.

### Step 2 — Substitute into the PDE
Plug \(u=X(x)T(t)\) into \(u_{tt}=c^2u_{xx}\). Derivatives become \(XT''=c^2X''T\). Divide both sides by \(XT\) (assuming nonzero) to reach \(\frac{T''}{c^2T}=\frac{X''}{X}\).  
> [!WARNING]
> Division by zero ya sign error yahaan kiya to aap galat separation constant choose kar loge.

### Step 3 — Introduce the separation constant
Dono sides constant hain, isliye \(\frac{X''}{X}=-\lambda\) aur \(\frac{T''}{c^2T}=-\lambda\). Yahan \(\lambda\) eigenvalue hai.  
> [!WARNING]
> Galat sign (positive \(\lambda\)) exponential solutions deta hai jo bounded boundaries par zero nahi ho sakte.

### Step 4 — Solve the spatial eigenvalue problem
\(X''+\lambda X=0\) with \(X(0)=X(L)=0\) gives \(\lambda_n=(n\pi/L)^2\), \(X_n=\sin(n\pi x/L)\).  
> [!WARNING]
> Forgetting to apply both boundary conditions produces non-zero solutions at the ends.

### Step 5 — Solve the temporal ODE
Har \(\lambda_n\) ke liye \(T_n''+c^2\lambda_n T_n=0\) gives \(T_n=A_n\cos(\omega_n t)+B_n\sin(\omega_n t)\) with \(\omega_n=c n\pi/L\).  
> [!WARNING]
> Initial velocity zero maanne se \(B_n\) term galti se zero kar dete ho.

### Step 6 — Form the general superposition
Full solution \(u(x,t)=\sum_{n=1}^\infty\sin(n\pi x/L)[A_n\cos(\omega_n t)+B_n\sin(\omega_n t)]\). Coefficients Fourier se nikalte hain.  
> [!WARNING]
> Series convergence ke liye initial data ki smoothness zaroori hai; warna Gibbs phenomenon dikhega.

### Step 7 — Determine coefficients from initial conditions
\(u(x,0)=f(x)\) deta hai \(A_n\), \(u_t(x,0)=g(x)\) deta hai \(B_n\). Orthogonality se integrals ban jaate hain.

## 5. Worked examples — har step show karo

**Example 1 — Zero initial velocity, plucked string**  
*Given:* \(u_{tt}=4u_{xx}\), \(0<x<1\), \(t>0\), \(u(0,t)=u(1,t)=0\), \(u(x,0)=\sin(2\pi x)\), \(u_t(x,0)=0\).  
*Find:* \(u(x,t)\).  
Step 1: Assume \(u=X(x)T(t)\).  
*Why:* Product form boundaries ko alag karta hai.  
Step 2: \(\frac{T''}{4T}=\frac{X''}{X}=-\lambda\).  
*Why:* Variables separate ho jaate hain.  
Step 3: \(X''+\lambda X=0\), \(X(0)=X(1)=0\) \(\Rightarrow\) \(\lambda=4\pi^2\), \(X=\sin(2\pi x)\).  
*Why:* Eigenvalue problem solve kiya.  
Step 4: \(T''+16\pi^2 T=0\) \(\Rightarrow\) \(T=A\cos(4\pi t)+B\sin(4\pi t)\).  
*Why:* Temporal frequency nikal gaya.  
Step 5: \(u(x,t)=\sin(2\pi x)[A\cos(4\pi t)+B\sin(4\pi t)]\).  
Initial velocity zero \(\Rightarrow B=0\), \(u(x,0)=\sin(2\pi x)\) \(\Rightarrow A=1\).  
**Final answer**  
\[u(x,t)=\sin(2\pi x)\cos(4\pi t)\]  
*Reflection:* Single-mode case trivial tha; yeh dikhaata hai ki eigenfunction already initial condition ke saath match kar sakta hai.

**Example 2 — Plucked string with triangular initial shape**  
*Given:* Same PDE and BCs, \(u(x,0)=x(1-x)\), \(u_t(x,0)=0\).  
*Find:* Full series solution.  
Fourier sine coefficients:  
\[A_n=2\int_0^1 x(1-x)\sin(n\pi x)\,dx= \frac{2(1-(-1)^n)}{n^3\pi^3}.\]  
*Why:* Orthogonality se coefficient formula seedha milta hai.  
**Final answer**  
\[u(x,t)=\sum_{n=1,3,5,\dots}\frac{4}{n^3\pi^3}\sin(n\pi x)\cos(2n\pi t)\]  
*Reflection:* Infinite series chahiye jab initial data eigenfunctions ka linear combination na ho.

**Example 3 — Non-zero initial velocity**  
*Given:* Same domain, \(u(x,0)=0\), \(u_t(x,0)=\sin(\pi x)\).  
\(B_n\) coefficients nikalte hain velocity se:  
\[B_n=\frac{2}{c n\pi}\int_0^1 g(x)\sin(n\pi x)\,dx.\]  
**Final answer**  
\[u(x,t)=\frac{1}{n\pi}\sin(\pi x)\sin(2\pi t)\quad(n=1\text{ term only}).\]  
*Reflection:* Velocity initial condition \(B_n\) ko control karti hai.

**Example 4 — Different wave speed and length**  
*Given:* \(u_{tt}=9u_{xx}\), \(0<x=\pi\), \(u(x,0)=x(\pi-x)\), \(u_t=0\).  
Eigenvalues \(\lambda_n=n^2\), \(\omega_n=3n\). Coefficients recalculation ke baad series form same rehta hai.  
**Final answer**  
\[u(x,t)=\sum_{n=1}^\infty\frac{8}{n^3}\sin(nx)\cos(3nt).\]  
*Reflection:* Length aur speed change only eigenvalues aur frequencies ko scale karte hain.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Wrong sign of separation constant | Students fear negative eigenvalues          | Always choose sign jo bounded solutions de   |
| Forgetting both boundary conditions | One condition laga ke sochte hain kaam ho gaya | Dono ends par explicitly \(X(0)=X(L)=0\) lagao |
| Missing the \(n=0\) term          | \(\lambda=0\) trivial lagta hai             | Check karo ki \(\lambda=0\) solution zero deta hai ya nahi |
| Division by \(XT\) without checking | Zero solution miss ho jaati hai             | Assume \(X,T\neq0\) aur separately verify karo |
| Using cosine series for sine BCs  | Confusion between Dirichlet/Neumann         | BCs ke hisaab se eigenfunctions choose karo  |
| Incorrect Fourier coefficient formula | Orthogonality integral galat likha         | Norm squared \(\int_0^L\sin^2=\frac L2\) yaad rakho |

## 7. The textbook-precise statement
Let \(c>0\) and \(L>0\). Consider the initial-boundary-value problem
\[
u_{tt}=c^2u_{xx},\quad 0<x<L,\ t>0,
\]
\[
u(0,t)=u(L,t)=0,\quad t>0,
\]
\[
u(x,0)=f(x),\quad u_t(x,0)=g(x),\quad 0<x<L,
\]
where \(f\in C^2[0,L]\) satisfies \(f(0)=f(L)=0\) and \(g\in C[0,L]\). The separated solutions \(X_n(x)T_n(t)\) with \(X_n(x)=\sin(n\pi x/L)\) and \(T_n(t)=A_n\cos(c n\pi t/L)+B_n\sin(c n\pi t/L)\) yield the formal series solution
\[
u(x,t)=\sum_{n=1}^\infty\sin(n\pi x/L)\bigl[A_n\cos(\omega_n t)+B_n\sin(\omega_n t)\bigr],
\]
where \(\omega_n=c n\pi/L\) and the coefficients are given by the Fourier sine formulas
\[
A_n=\frac{2}{L}\int_0^L f(x)\sin(n\pi x)\,dx,\qquad B_n=\frac{2}{c n\pi}\int_0^L g(x)\sin(n\pi x)\,dx.
\]
(See Strauss, *Partial Differential Equations*, 2e, §5.3.)

## 8. Visual — diagram or schematic
```text
x=0                          x=L
 |-----------------------------|
 |   sin(πx/L)                 |   mode n=1  (half-wave)
 |   sin(2πx/L)                |   mode n=2  (full-wave)
 |   sin(3πx/L)                |   mode n=3
t→
```
Horizontal axis length L, vertical axis time; each sine curve shows spatial shape of one eigenfunction that oscillates in time at its own frequency.

## 9. The memory technique
1. **The hook** — Picture two dancers X and T holding a rope; when they move independently the rope’s shape stays a pure sine wave whose frequency is fixed by X’s nodes.  
2. **What to overlearn** — \(\lambda_n=(n\pi/L)^2\), \(\omega_n=c\sqrt{\lambda_n}\), and the coefficient integral factor \(2/L\).  
3. **Spaced-repetition schedule** — Review the three formulas after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Agar formula bhool jaao to wapas PDE mein \(u=XT\) daal ke \(\frac{T''}{c^2T}=\frac{X''}{X}\) likho aur boundary conditions se \(\lambda\) nikaal lo.

## 10. What this unlocks
Separation of variables directly generalizes to the heat equation, Laplace’s equation in rectangles, and any linear homogeneous PDE whose coefficients allow product solutions.  
- It supplies the eigenfunction basis needed for Sturm-Liouville theory.  
- It is the first step toward understanding Fourier series convergence in Sobolev spaces.  
- It prepares the ground for Duhamel’s principle and eigenfunction expansions of forced problems.

## 11. Self-check — five questions, no answers
1. Derive the separated ODEs for the wave equation on \([0,\pi]\) with Neumann conditions \(u_x(0,t)=u_x(\pi,t)=0\).  
2. Compute the first three coefficients \(A_n\) when \(f(x)=x\) on \([0,1]\) and Dirichlet ends.  
3. What happens to the solution if the initial displacement contains a component exactly at a node of every eigenfunction?  
4. Identify the algebraic mistake that produces a growing exponential in time.  
5. For the wave equation with \(c=2\), \(L=3\), write the temporal frequency of the fifth mode.