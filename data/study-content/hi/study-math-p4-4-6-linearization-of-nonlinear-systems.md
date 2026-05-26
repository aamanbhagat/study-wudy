## 1. The one-sentence answer
**Linearization of nonlinear systems** matlab ek nonlinear ODE \(\dot{x}=f(x)\) ko uske equilibrium point ke kareeb ek linear system \(\dot{x}=Df(x_0)x\) se replace karna taaki local dynamics ko eigenvalues aur eigenvectors se samajha ja sake.

Yeh technique isliye kaam karti hai kyunki har smooth nonlinear function ko uske critical point par Taylor expand karke linear term liya ja sakta hai. Higher-order terms chhote displacements ke liye negligible ho jaate hain, isliye local phase portrait linear system jaisa dikhta hai. Aap sirf woh region dekhte ho jahaan approximation valid rehti hai.

Agar equilibrium hyperbolic hai (koi eigenvalue zero real part nahi rakhta), toh linear system ka topological behaviour nonlinear system ke bilkul paas match karta hai. Yeh Hartman–Grobman theorem ka core hai.

> [!NOTE]
> Sabse badi aha yeh hai ki ek nonlinear system ka local stability sirf uske Jacobian ke eigenvalues se decide ho jaati hai — bina poora nonlinear equation solve kiye.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 ke landing algorithm mein nonlinear rigid-body dynamics ko har time-step par linearize karke MPC controller design kiya jaata hai; bina iske real-time thrust vectoring impossible hota.

Neural ODE models (Chen et al., NeurIPS 2018) mein backpropagation ke liye adjoint sensitivity equations linearize kiye jaate hain taaki memory-efficient training ho sake.

Power-grid operators (PJM Interconnection) transient stability analysis mein swing equations ko linearize karke small-signal stability margins nikaalte hain; ek single unstable eigenvalue blackout ka risk dikha deta hai.

Lotka–Volterra predator–prey model mein carrying-capacity nonlinearity ko linearize karke bifurcation curves predict ki jaati hain, jo actual lynx–hare data ke oscillations se match karti hain.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Equilibrium point    | Linearization sirf wahi kiya ja sakta hai jahaan \(f(x_0)=0\) |
| Jacobian matrix      | Local linear approximation ka coefficient matrix yahi hai |
| Eigenvalues          | Linear system ki stability aur oscillation type yahi decide karte hain |
| Taylor expansion     | Nonlinear function ko linear term tak todne ka formal tool |
| Hyperbolic equilibrium | Sirf in points par linearization topologically faithful hoti hai |

Agar Jacobian ya eigenvalues abhi weak hain toh pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Locate the equilibrium
Nonlinear system \(\dot{x}=f(x)\) mein sabse pehle woh points dhoondho jahaan velocity zero hai, yani \(f(x_0)=0\). In points par system ruk jaata hai.

Example: \(\dot{x}=x-x^3\) ke liye \(x_0=0\) ek equilibrium hai.

Formal statement: \(x_0\in\mathbb{R}^n\) ek equilibrium hai agar \(f(x_0)=0\).

> [!WARNING]
> Agar aap galat equilibrium choose karoge toh pura Jacobian matrix galat banega aur stability conclusion ulta aa jaayega.

### Step 2 — Shift coordinates to the equilibrium
Naya variable \(y=x-x_0\) introduce karo taaki equilibrium origin par aa jaaye. Ab equation \( \dot{y}=f(y+x_0) \) ban jaati hai.

Example: upar wale case mein \(y=x\), kyunki \(x_0=0\).

Formal statement: Translation \(y=x-x_0\) ke baad nayi right-hand side \(g(y)=f(y+x_0)\) satisfy karti hai \(g(0)=0\).

### Step 3 — Taylor expand around the new origin
Smooth \(g\) ke liye \(g(y)=Dg(0)y + \frac12 D^2g(0)(y,y)+\cdots\) likho. Linearization mein sirf pehla term rakho.

Example: \(g(y)=y-y^3\) → \(Dg(0)=1\), isliye linear part \(\dot{y}=y\).

Formal statement: Linearized system \(\dot{y}=A y\) jahaan \(A=Dg(0)\), the Jacobian matrix evaluated at equilibrium.

### Step 4 — Compute the Jacobian matrix explicitly
Agar \(f=(f_1,\dots,f_n)\), toh \(A_{ij}=\partial f_i/\partial x_j\) evaluated at \(x_0\).

Example 2D: \(\dot{x}=x-y^2\), \(\dot{y}=-y+x^2\) at (0,0) gives \(A=\begin{pmatrix}1&0\\0&-1\end{pmatrix}\).

### Step 5 — Analyse the linear system via eigenvalues
Matrix \(A\) ke eigenvalues nikaalo. Real parts negative → asymptotically stable; positive → unstable; zero real part → center ya degenerate case.

Formal statement (local version of Hartman–Grobman): Agar \(A\) hyperbolic hai, toh nonlinear flow topologically conjugate hai linear flow ke paas equilibrium ke.

## 5. Worked examples — har step show karo

**Example 1 — Scalar cubic**
*Given:* \(\dot{x}=x-x^3\)
*Find:* Linearization at \(x=0\) and its stability.
Step 1: \(f(0)=0\), equilibrium confirmed.  
*Why:* Direct substitution se pata chalta hai ki velocity zero hai.  
Step 2: Already at origin.  
Step 3: \(f'(x)=1-3x^2\), so \(A=f'(0)=1\).  
*Why:* Derivative sirf linear coefficient deta hai.  
Linear system: \(\dot{y}=y\).  
**Final answer**  
Unstable node (eigenvalue +1).  
*Reflection:* 1D case mein sign of \(f'(x_0)\) hi stability decide karta hai; higher terms sirf global behaviour badalte hain.

**Example 2 — Simple 2D saddle**
*Given:* \(\dot{x}=x+y^2\), \(\dot{y}=-y+x^2\) at (0,0)  
*Find:* Jacobian and type.  
Jacobian \(A=\begin{pmatrix}1&0\\0&-1\end{pmatrix}\).  
Eigenvalues +1, −1.  
**Final answer**  
Hyperbolic saddle.  
*Reflection:* Off-diagonal terms zero hone se eigenvectors axis-aligned dikhte hain; nonlinearity sirf higher-order distortion karti hai.

**Example 3 — Stable spiral**
*Given:* Van der Pol linearised form \(\dot{x}=y\), \(\dot{y}=-x-0.1y\) at origin.  
Jacobian \(A=\begin{pmatrix}0&1\\-1&-0.1\end{pmatrix}\).  
Characteristic equation \(\lambda^2+0.1\lambda+1=0\), roots \(-0.05\pm i\sqrt{0.9975}\).  
**Final answer**  
Stable spiral (negative real parts).  
*Reflection:* Damping term \(-0.1y\) hi real part negative banata hai; bina uske pure center hota.

**Example 4 — Non-hyperbolic case**
*Given:* \(\dot{x}=-x^3\)  
Jacobian at 0 is \(A=0\).  
Eigenvalue zero → linearization inconclusive.  
**Final answer**  
Need centre-manifold ya Lyapunov function.  
*Reflection:* Jab eigenvalue zero real part rakhe, linear picture local topology nahi pakad paata.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Jacobian galat point par evaluate karna | Equilibrium shift bhool jaana               | Hamesha pehle \(f(x_0)=0\) verify karo       |
| Non-hyperbolic case mein stability claim karna | Zero real-part eigenvalues ignore karna     | Eigenvalues check karo; agar zero hai toh higher-order analysis karo |
| Nonlinear terms ko neglect kar dena globally | Local approximation ko globally samajhna    | Clearly likho “near \(x_0\)”                 |
| Complex eigenvalues ke real part bhool jaana | Sirf imaginary part dekhna                  | Real part sign pe focus karo                 |
| Coordinate shift mat karna  | Origin par Jacobian nahi milta              | Hamesha \(y=x-x_0\) substitution karo        |

## 7. The textbook-precise statement
Let \(f:\mathbb{R}^n\to\mathbb{R}^n\) be \(C^1\). Suppose \(x_0\) is an equilibrium, i.e., \(f(x_0)=0\). Let \(A=Df(x_0)\). If \(A\) has no eigenvalue with zero real part, then there exists a neighbourhood \(U\) of \(x_0\) and a homeomorphism \(H:U\to V\) mapping orbits of \(\dot{x}=f(x)\) in \(U\) to orbits of \(\dot{y}=Ay\) in \(V\), preserving time orientation. (Strogatz, *Nonlinear Dynamics and Chaos*, 2e, §6.3, Theorem 6.3.1, local Hartman–Grobman statement.)

## 8. Visual — diagram or schematic
```
Phase plane near saddle (linear vs nonlinear)

  y ^          nonlinear orbit bends outward
    |        /
    |   \   /   linear stable manifold (y-axis)
    |    \ /
    +-----*-----→ x   (unstable manifold x-axis)
    |    / \
    |   /   \
    |  /
```
Linear rays straight hain; nonlinear curves unke paas hi tangent rehti hain.

## 9. The memory technique
1. **The hook** — Imagine zooming into a crumpled bedsheet with a microscope; near any flat point the sheet looks like an inclined plane (the tangent = Jacobian).
2. **What to overlearn** — Jacobian \(A=Df(x_0)\), hyperbolic condition (no \(\operatorname{Re}\lambda=0\)), and sign of real parts decide stability.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Agar matrix bhool jaaye toh Taylor series likho \(f(x_0+y)=f(x_0)+Df(x_0)y+\cdots\), zero term hatao, linear term rakh lo.

## 10. What this unlocks
Linearization ke baad aap local stability, bifurcations, centre-manifold reduction aur normal-form calculations kar sakte ho.

- Next: Hopf bifurcation detection
- Centre-manifold theorem
- Lyapunov-function construction near equilibria
- Numerical continuation software (AUTO, MATCONT) ka foundation

## 11. Self-check — five questions, no answers
1. \(\dot{x}=x^2\) ke equilibrium par Jacobian kya hai aur kyun inconclusive hai?
2. 2D system \(\dot{x}=-x+y^2\), \(\dot{y}=-y\) ka origin par type batao.
3. Agar ek eigenvalue zero real part rakhe toh linearization kis cheez ki guarantee nahi deti?
4. Predator–prey model mein positive equilibrium ke Jacobian ke trace aur determinant se stability kaise nikaalte hain?
5. Hartman–Grobman theorem kis condition par fail ho jaata hai? Ek counter-example socho.