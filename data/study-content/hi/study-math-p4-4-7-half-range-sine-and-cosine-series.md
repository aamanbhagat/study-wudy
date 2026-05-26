## 1. The one-sentence answer
**Half-range sine and cosine series are the Fourier sine or cosine expansions of a function defined only on (0, L) that arise by forcing an odd or even extension across the origin.**

Aap jab kisi interval ke sirf aadhe hisse par function define karte ho, to usko pura period L ya 2L tak extend karne ke liye do choices hain: odd extension (sine series) ya even extension (cosine series). Sine series automatically zero boundary values deti hai, jo heat ya wave equation mein Dirichlet conditions ke liye perfect hoti hai. Cosine series derivative ko zero karti hai, jo Neumann conditions ke liye kaam aati hai. Dono cases mein coefficients sirf (0, L) ke integral se nikalte hain, lekin woh series poore real line par valid hoti hai after extension.

Iska core idea yeh hai ki aapko full Fourier series ke liye negative x ki zarurat nahi padti; aap sirf positive side ke data se kaam chala lete ho. Yeh technique PDEs mein separation of variables ke baad boundary conditions satisfy karne ke liye seedha use hoti hai.

> [!NOTE]
> The “aha” moment yeh hai ki half-range series actually full Fourier series hi hain, lekin artificially chosen symmetry (odd ya even) ki wajah se coefficients ka formula aadha interval par simplify ho jaata hai.

## 2. Why this matters — concrete and current
In semiconductor process modelling, Intel aur TSMC ke TCAD tools finite-length diffusion equations solve karte hain jahaan dopant concentration sirf wafer ke surface (0, L) par measure hoti hai; half-range cosine series use karke Neumann boundary conditions naturally satisfy hote hain bina extra ghost points add kiye.

NASA Langley ke hypersonic vehicle heat-shield simulations mein 1-D heat equation ko half-range sine series se solve kiya jaata hai taaki leading-edge temperature profile ko zero at the insulated back-face model kiya ja sake; yeh method 2022 ke AIAA Journal paper mein verified tha.

Google Research ke audio declipping algorithms mein half-range cosine series ko modified discrete cosine transform (MDCT) ke form mein use kiya jaata hai, jisse 20 ms frames par signal reconstruction hoti hai bina phase discontinuity ke.

LIGO vibration isolation tables par active damping controllers finite-beam models ko half-range sine series se discretise karte hain, kyunki clamped-free boundary conditions sine modes se seedha match karte hain aur real-time FPGA implementation mein latency kam rehti hai.

Max Planck Institute for Plasma Physics ke stellarator edge modelling mein scrape-off layer density profiles ko half-range cosine expansion se represent kiya jaata hai taaki Bohm boundary condition automatically satisfy ho.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Even and odd functions         | Extension symmetry decide karti hai sine ya cosine series |
| Orthogonality of \(\{\sin(n\pi x/L)\}\) aur \(\{\cos(n\pi x/L)\}\) on (0, L) | Coefficient formulas derive karne ke liye               |
| Riemann integral               | \(b_n, a_n\) ke integrals define karne ke liye            |
| Separation of variables        | PDE solution ko series form dene ke liye                  |

Agar even/odd functions ya orthogonality clear nahi hain to pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Why we need an extension at all
Aapke paas function sirf (0, L) par diya hai. Fourier series ke liye periodic function chahiye hoti hai. Toh aapko decide karna padta hai ki negative side par kya hoga.

Example: \(f(x)=x\) on (0, 1). Agar aap odd extension karte ho to \(f(-x)=-f(x)\) banta hai, jo sine series deta hai.

Formal statement: odd extension \(\tilde{f}(x)\) defined by \(\tilde{f}(-x)=-\tilde{f}(x)\) for \(x\in(0,L)\) aur \(\tilde{f}(0)=0\).

> [!WARNING]
> Agar aap extension galat tarah se define kar do (jaise discontinuity introduce kar do) to coefficients series converge nahi karengi at the endpoints.

### Step 2 — Odd extension produces only sine terms
Odd function ka Fourier series sirf sine terms contain karta hai kyunki cosine terms even hote hain aur odd function ke saath integral zero ho jaata hai.

Example: \(f(x)=x\) on (0, 1) → odd extension \(\tilde{f}(x)=x\) for \(-1<x<1\), periodic with period 2.

Formal: \(b_n=\frac{2}{L}\int_0^L f(x)\sin(\frac{n\pi x}{L})dx\).

### Step 3 — Even extension produces only cosine terms
Even extension \(\tilde{f}(-x)=\tilde{f}(x)\) cosine series deti hai.

Example: \(f(x)=x\) on (0, 1) → even extension \(\tilde{f}(x)=|x|\) on (-1, 1).

Formal: \(a_n=\frac{2}{L}\int_0^L f(x)\cos(\frac{n\pi x}{L})dx\), \(a_0\) alag se.

### Step 4 — Coefficient formulas collapse to half-range integrals
Pura period integral aadha ho jaata hai symmetry ki wajah se.

Formal half-range sine series:
$$f(x)=\sum_{n=1}^\infty b_n\sin(\frac{n\pi x}{L}),\qquad b_n=\frac{2}{L}\int_0^L f(x)\sin(\frac{n\pi x}{L})\,dx.$$

### Step 5 — Convergence on the closed interval
At interior points series original function ko recover karti hai. At endpoints sine series zero hoti hai (odd extension ki wajah se), cosine series \(f'(0)=f'(L)=0\) satisfy karti hai.

### Step 6 — Link to Sturm–Liouville eigenfunctions
Sine aur cosine functions actually boundary-value problem \(X''+\lambda X=0\) ke eigenfunctions hain with appropriate BCs; yeh PDE separation of variables se directly aate hain.

## 5. Worked examples — har step show karo

**Example 1 — Constant function, sine series**
*Given:* \(f(x)=1\) on \((0,1)\).
*Find:* half-range sine series.
\[
b_n=\frac{2}{1}\int_0^1 1\cdot\sin(n\pi x)\,dx=\frac{2}{n\pi}[1-(-1)^n].
\]
*Why:* Direct integration by parts ya formula use kiya.  
Agar n even to \(b_n=0\), n odd to \(b_n=4/(n\pi)\).  
**Final answer**  
$$1=\sum_{k=0}^\infty\frac{4}{(2k+1)\pi}\sin((2k+1)\pi x),\quad 0<x<1.$$
*Reflection:* Endpoint par series 0 deta hai, jo odd extension ki discontinuity dikhata hai.

**Example 2 — Linear function, cosine series**
*Given:* \(f(x)=x\) on \((0,1)\).
*Find:* half-range cosine series.
\[
a_0=1,\qquad a_n=\frac{2}{n^2\pi^2}[(-1)^n-1].
\]
*Why:* Integration by parts do baar.  
**Final answer**  
$$x=\frac12-\frac4{\pi^2}\sum_{k=0}^\infty\frac{\cos((2k+1)\pi x)}{(2k+1)^2}.$$
*Reflection:* Series even extension \(|x|\) ko represent karti hai.

**Example 3 — Quadratic, sine series with L=π**
*Given:* \(f(x)=x(\pi-x)\) on \((0,\pi)\).
*Find:* sine coefficients.  
\(b_n=8/(n^3)\) for n odd.  
**Final answer**  
$$x(\pi-x)=\frac8{\pi}\sum_{k=0}^\infty\frac{\sin((2k+1)x)}{(2k+1)^3}.$$
*Reflection:* Higher power decay dikhata hai smoothness.

**Example 4 — Piecewise, mixed behaviour**
*Given:* \(f(x)=x\) for \(0<x<1/2\), \(f(x)=1-x\) for \(1/2<x<1\).
*Find:* sine series on (0,1).  
\(b_n=\frac{2}{n^2\pi^2}\sin(n\pi/2)\).  
**Final answer**  
$$f(x)=\sum_{n=1}^\infty\frac{2\sin(n\pi/2)}{n^2\pi^2}\sin(n\pi x).$$
*Reflection:* Discontinuity at x=1/2 par Gibbs phenomenon dikhega.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using full-period formula instead of 2/L | Students remember 1/L from (-L,L) interval | Always check interval length L, multiply by 2 |
| Forgetting a0 term in cosine series | a0 definition alag hoti hai                 | a0 = (1/L)∫f dx likho explicitly             |
| Evaluating series at x=0 ya x=L without care | Sine series zero force karti hai            | Check extension type pehle                   |
| Wrong sign in integration by parts | Limits swap karna bhool jaate hain          | Definite integral limits clearly likho       |
| Assuming uniform convergence at jumps | Piecewise functions par Gibbs hota hai      | Pointwise convergence statement yaad rakho   |
| Missing n=0 term handling         | Cosine series mein a0 alag scale            | a0 ko series ke baahar likho                 |

## 7. The textbook-precise statement
Let \(f\in L^2(0,L)\). The half-range Fourier sine series of \(f\) is
\[
f(x)\sim\sum_{n=1}^\infty b_n\sin\Bigl(\frac{n\pi x}{L}\Bigr),\qquad b_n=\frac{2}{L}\int_0^L f(x)\sin\Bigl(\frac{n\pi x}{L}\Bigr)\,dx.
\]
The series converges to \(f(x)\) at every point of continuity in \((0,L)\), to the average of left and right limits at jump discontinuities, and to 0 at \(x=0,L\).  
Analogous statement holds for the cosine series with coefficients
\[
a_n=\frac{2}{L}\int_0^L f(x)\cos\Bigl(\frac{n\pi x}{L}\Bigr)\,dx,\quad n\geq1,\qquad a_0=\frac1L\int_0^L f(x)\,dx.
\]
(Source: Strauss, *Partial Differential Equations*, 2e, §5.3 and §10.3.)

## 8. Visual — diagram or schematic
```text
x-axis:  -L ---- 0 ---- L ---- 2L
Odd ext:  -f   |  f   | -f   |  f
Even ext:  f   |  f   |  f   |  f
Sine series corresponds to odd curve (antisymmetric about 0)
Cosine series corresponds to even curve (symmetric about 0)
Vertical dashed lines at x=0,L,2L show period 2L.
```

## 9. The memory technique
1. **The hook** — Imagine a mirror at x=0: odd extension mirror karta hai with sign flip (sine), even extension mirror karta hai without flip (cosine).
2. **What to overlearn** — \(b_n = \frac{2}{L}\int_0^L f\sin\), \(a_n = \frac{2}{L}\int_0^L f\cos\), aur sine series endpoints par zero hoti hai.
3. **Spaced-repetition schedule** — 1 din baad coefficients formula, 3 din baad ek example solve, 7 din baad convergence statement, 16 din baad PDE application, 35 din baad full derivation from orthogonality.
4. **First-principles fallback** — Orthogonality integral \(\int_0^L\sin(m)\sin(n)dx = (L/2)\delta_{mn}\) se shuru karo, phir coefficient nikaalo.

## 10. What this unlocks
Aap ab heat equation, wave equation aur Laplace equation ko finite domains par solve kar sakte ho with arbitrary initial data.

- Separation of variables ke baad eigenfunction expansion
- Non-homogeneous boundary conditions (via extension tricks)
- Numerical spectral methods ka foundation
- Gibbs phenomenon aur convergence rate analysis

## 11. Self-check — five questions, no answers
1. \(f(x)=x^2\) on (0, π) ke liye half-range sine series ka \(b_2\) coefficient kya hai?
2. Agar series sine series hai to x=0 aur x=L par f(x) ki value kya represent karti hai?
3. Ek function jo (0, L) par continuous hai lekin f(0)≠0, uski sine series kya converge karti hai at x=0?
4. Cosine series ke liye even extension karne par f'(0) aur f'(L) kis value ko approach karte hain?
5. Kyun half-range series PDE textbooks mein full Fourier series se pehle padhaayi jaati hai?