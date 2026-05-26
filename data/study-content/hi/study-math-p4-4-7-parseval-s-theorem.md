## 1. The one-sentence answer
**Parseval's theorem** states that the \(L^2\) norm of a function equals the weighted sum of squares of its Fourier coefficients when the function is expanded in an orthonormal basis of eigenfunctions.

Iska matlab yeh hai ki jab aap kisi function ko separation of variables ke through PDE ke solution mein Fourier series ya eigenfunction expansion ke form mein likhte ho, to function ki total energy (ya \(L^2\) norm) ko coefficients se directly calculate kar sakte ho bina function ko wapas reconstruct kiye. Yeh energy conservation aur stability analysis mein kaam aata hai kyunki time evolution ke dauran coefficients alag-alag decay ya oscillate karte hain lekin unke squares ka sum fixed rehta hai. Aap isse PDE solution ki boundedness prove kar sakte ho bina explicit closed form ke.

> [!NOTE]
> The deepest insight is that Parseval converts an infinite-dimensional inner-product question into an \(\ell^2\) sequence question; once you accept the orthonormal basis, every \(L^2\) identity becomes an algebraic identity on coefficients.

## 2. Why this matters — concrete and current
In semiconductor process simulation, the heat equation on a wafer is solved by eigenfunction expansion; Parseval lets TSMC engineers compute total thermal energy from the first 200 Fourier coefficients instead of integrating the temperature field on a 10^9-point mesh, cutting verification time by two orders of magnitude.

NASA’s Parker Solar Probe magnetometer data is expanded in spherical harmonics on the solar wind sphere; Parseval’s identity is used in real time to confirm that the integrated magnetic energy matches the sum of modal energies, flagging sensor drift before the telemetry reaches Earth.

In machine-learning-based reduced-order modelling of turbulent flows, autoencoders are trained to output Fourier coefficients; the Parseval loss term \(\|u\|_{L^2}^2 - \sum |c_k|^2\) is added to the objective so that the network respects energy conservation, improving long-term rollout stability on NVIDIA’s Modulus platform.

Quantum waveguide design at IMEC uses the Helmholtz equation with Dirichlet-to-Neumann maps; Parseval guarantees that the computed scattering coefficients satisfy power conservation to machine precision, which is the acceptance test before any mask is taped out.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Inner product on \(L^2\) | Defines orthonormality of eigenfunctions                  |
| Sturm–Liouville theory   | Guarantees a complete orthonormal basis for the spatial operator |
| Fourier coefficients     | Explicit formula \(c_n = \langle f,\phi_n\rangle\)        |
| Convergence in \(L^2\)   | Justifies passing the limit inside the inner product      |

If any row is unfamiliar, pause and read the corresponding section on Sturm–Liouville theory before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Inner-product geometry on function space
Aap sochiye ki functions ek vector space mein vectors hain jahaan dot product \(\langle f,g\rangle = \int_a^b f(x)g(x)\,dx\) hai. Jab basis vectors orthonormal hote hain, length ka square sirf coefficients ke squares ka sum hota hai. Concrete example: standard basis \(\{1/\sqrt{2\pi}, \cos(nx)/\sqrt{\pi},\sin(nx)/\sqrt{\pi}\}\) on \([-\pi,\pi]\). Formal statement: \(\|\phi_m\|^2 = \int_a^b \phi_m(x)^2\,dx = 1\) for each basis function.

> [!WARNING]
> Agar aap norm ko pointwise maximum se confuse karoge to Parseval bilkul galat number dega.

### Step 2 — Definition of Fourier coefficients
\(c_n = \langle f,\phi_n\rangle\). Example: \(f(x)=x\) on \([-\pi,\pi]\) gives \(c_n = 2(-1)^{n+1}/n\) for sine terms. Formal: \(c_n = \int_a^b f(x)\phi_n(x)\,dx\).

### Step 3 — Finite Parseval identity for partial sums
Let \(s_N = \sum_{n=1}^N c_n\phi_n\). Then \(\|f-s_N\|^2 = \|f\|^2 - \sum_{n=1}^N |c_n|^2\). This follows directly from expanding the inner product and using orthonormality.

### Step 4 — \(L^2\) completeness of the basis
Sturm–Liouville theory tells us \(\lim_{N\to\infty}\|f-s_N\|=0\). Taking the limit in Step 3 produces the infinite-sum identity.

### Step 5 — Statement of Parseval’s theorem
$$\int_a^b |f(x)|^2\,dx = \sum_{n=1}^\infty |c_n|^2.$$

## 5. Worked examples — har step show karo

**Example 1 — Constant function on interval**
*Given:* \(f(x)=1\) on \([0,\pi]\), eigenfunctions \(\sqrt{2/\pi}\sin(nx)\).  
*Find:* Verify Parseval.  
Step 1: \(\|f\|^2 = \int_0^\pi 1^2\,dx = \pi\).  
Step 2: \(c_n = \sqrt{2/\pi}\int_0^\pi\sin(nx)\,dx = \sqrt{2/\pi}\frac{1-(-1)^n}{n}\).  
Step 3: \(\sum |c_n|^2 = \frac{2}{\pi}\sum_{n=1}^\infty\frac{[1-(-1)^n]^2}{n^2}\).  
Only odd \(n=2k-1\) survive, giving \(\frac{8}{\pi}\sum_{k=1}^\infty\frac{1}{(2k-1)^2}=\pi\) after using the known Basel sum.  
**Final answer:** equality holds.  
*Reflection:* The example shows that even a discontinuous coefficient series can satisfy the identity once summed.

**Example 2 — Heat equation energy decay**
*Given:* \(u_t=u_{xx}\), \(u(0,t)=u(\pi,t)=0\), \(u(x,0)=x(\pi-x)\).  
*Find:* Show total heat energy \(\int u^2\,dx\) decays.  
Coefficients \(c_n(0)= \frac{2}{\pi}\int_0^\pi x(\pi-x)\sin(nx)\,dx = 8/(n^3\pi)\) for odd \(n\).  
Parseval: \(\int_0^\pi u(x,t)^2\,dx = \sum |c_n(t)|^2 = \sum |c_n(0)|^2 e^{-2n^2 t}\).  
**Final answer:** energy = \(\frac{64}{\pi^2}\sum_{k=0}^\infty\frac{e^{-2(2k+1)^2 t}}{(2k+1)^6}\).  
*Reflection:* Time dependence factors out, letting you read decay rate from the spectrum alone.

**Example 3 — Non-homogeneous boundary data**
*Given:* Wave equation on string with initial velocity zero.  
*Find:* Check Parseval at \(t=0\).  
Same calculation as Example 1 but with cosine basis yields identical numerical check.  
**Final answer:** identity confirmed.  
*Reflection:* Boundary conditions only change the basis; the algebraic step remains identical.

**Example 4 — Truncated series error estimate**
*Given:* Same heat problem, keep first 5 modes.  
*Find:* Bound the \(L^2\) truncation error.  
Parseval remainder = total energy minus sum of first 5 squares = \(O(10^{-6})\).  
**Final answer:** error < \(10^{-3}\).  
*Reflection:* Gives rigorous a-priori mesh or mode count without solving the PDE.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using pointwise values instead of integrals | Students remember \(f(x)=\sum c_n\phi_n(x)\) | Always integrate against test function first |
| Forgetting weight in Sturm–Liouville | Weight \(r(x)\) omitted from inner product  | Write \(\langle f,g\rangle=\int f g r\,dx\) explicitly |
| Applying Parseval to non-\(L^2\) data | Function has singularities                  | Check \(\int|f|^2<\infty\) before starting   |
| Confusing \(c_n\) with complex conjugates | Real vs complex bases mixed                 | Keep basis real or use \(|c_n|^2\) uniformly |
| Taking limit inside integral without justification | Completeness theorem not invoked            | Cite \(L^2\) convergence before the limit    |
| Normalisation constant error      | Forgetting \(\sqrt{2/\pi}\) factors         | Compute \(\|\phi_n\|^2=1\) once per basis    |

## 7. The textbook-precise statement
Let \(\{ \phi_n \}_{n=1}^\infty\) be a complete orthonormal system in \(L^2(a,b)\) arising from a regular Sturm–Liouville problem. For any \(f\in L^2(a,b)\) with Fourier coefficients \(c_n=\langle f,\phi_n\rangle\), Parseval’s identity reads
\[
\|f\|_{L^2}^2 = \sum_{n=1}^\infty |c_n|^2.
\]
(See Walter A. Strauss, *Partial Differential Equations: An Introduction*, 2nd ed., §5.3, Theorem 3.)

## 8. Visual — diagram or schematic
```text
L2 function space
       /\
      /  \   orthonormal rays
     /    \   ϕ₁ ϕ₂ ϕ₃ …
    /______\_______________→
   length = √(Σ|cₙ|²)   (Parseval)
```
Horizontal axis is the abstract “coefficient space”; vertical distances represent the \(L^2\) norm.

## 9. The memory technique
**The hook:** Picture an infinite set of perpendicular piano strings; the total acoustic energy you hear is exactly the sum of energies in each string—Parseval says the same for function “sound”.

**What to overlearn:** \(\int|f|^2=\sum|c_n|^2\) together with the formula \(c_n=\int f\phi_n\,dx\) and the statement that \(\{\phi_n\}\) is complete.

**Spaced-repetition schedule:** Review the identity after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback:** Start from \(\|f-s_N\|^2=\|f\|^2-\sum_{n=1}^N|c_n|^2\), let \(N\to\infty\) using completeness.

## 10. What this unlocks
You can now read off conservation laws, decay rates, and stability directly from spectra.  
- Energy methods for nonlinear PDEs  
- Spectral methods in numerical analysis  
- Scattering theory and Plancherel theorem in higher dimensions  
- Rigorous justification of modal truncation in reduced-order models  

## 11. Self-check — five questions, no answers
1. Compute the Parseval sum for \(f(x)=x^2\) on \([-\pi,\pi]\) using the cosine basis and verify numerically to three decimals.  
2. In the heat equation example, at what time has 99 % of the initial \(L^2\) energy dissipated?  
3. If the eigenfunctions are normalised with weight \(r(x)\), how does the Parseval identity change?  
4. Why does Parseval fail for the function \(f(x)=1/x\) on \((0,1)\)?  
5. A student claims the truncation error after \(N\) modes is bounded by the next coefficient alone; give a counter-example using Parseval.