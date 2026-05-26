## 1. The one-sentence answer

**Change of variables using the general Jacobian replaces the area element \(dx\,dy\) in a double integral by the absolute value of the Jacobian determinant times the new area element \(du\,dv\).**

Iska matlab yeh hai ki jab aap ek integral ko naye coordinates mein likhna chahte ho, to sirf substitution nahi kaafi hoti. Aapko ek extra factor chahiye jo bataaye ki naye coordinates purane area ko kitna stretch ya compress kar rahe hain. Yeh factor Jacobian determinant se aata hai aur woh locally har point par linear approximation deta hai.

Agar transformation smooth aur invertible hai, to integral ka value same rehta hai lekin computation asaan ho jaati hai. Lekin yeh factor galat sign ya zero ke paas behave karne par poora result barbaad kar sakta hai.

> [!NOTE]
> Sabse badi “aha” yeh hai ki Jacobian determinant ek local scaling factor hai — woh ek chhote parallelogram ko kitna bada karta hai, uska ratio deta hai. Global geometry nahi, sirf infinitesimal stretch matter karti hai.

## 2. Why this matters — concrete and current

NASA’s Mars 2020 rover trajectory calculations use change-of-variable integrals over ellipsoidal gravity fields; the Jacobian converts spherical launch coordinates into Cartesian velocity space so Monte-Carlo error ellipsoids can be integrated accurately.

In semiconductor process simulation, Synopsys TCAD tools map dopant diffusion equations from Cartesian masks onto warped wafer coordinates after thermal stress; the Jacobian determinant corrects the concentration integrals that decide threshold voltage.

Modern diffusion-model training in generative AI (Stable Diffusion 3 technical report, 2024) employs probability-flow ODEs whose likelihood computation requires the log-determinant of the Jacobian of the velocity field at every denoising step.

Climate models at ECMWF transform spectral spherical harmonics back to reduced Gaussian grids; the Jacobian of the latitude-longitude mapping ensures mass conservation when integrating precipitation over irregular polar cells.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Partial derivatives | Jacobian matrix entries hain |
| Determinant of 2×2 matrix | Area scaling factor deta hai |
| Invertibility & \(C^1\) smoothness | Theorem ki hypotheses hain |
| Double integrals in Cartesian coordinates | Starting point jahaan se change karna hai |
| Chain rule for multivariable functions | Proof mein derivative composition aati hai |

Agar partial derivatives ya 2×2 determinant weak hain, to pehle unhe solid karo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Local linear approximation
Aapko pata hai ki ek differentiable function ko chhote scale par uska derivative linearly approximate karta hai. Multivariable case mein yeh linear map ek matrix hoti hai — Jacobian matrix.

Example: mapping \(x = u^2 - v^2\), \(y = 2uv\) ke paas \((u,v) = (1,0)\) par linear approximation \(dx = 2u\,du - 2v\,dv\), \(dy = 2v\,du + 2u\,dv\) hoti hai.

Formal statement: transformation \(\mathbf{T}(u,v) = (x(u,v), y(u,v))\) differentiable ho to
\[
d\mathbf{T} = \begin{pmatrix} x_u & x_v \\ y_u & y_v \end{pmatrix} \begin{pmatrix} du \\ dv \end{pmatrix}.
\]

> [!WARNING]
> Agar aap yahan matrix ko sirf “partial derivatives ki list” samajh kar determinant bhool jaayein, to area scaling zero ya negative aa sakti hai.

### Step 2 — Area scaling by determinant
Linear map ek parallelogram ko kitna area deta hai, yeh uske determinant ka absolute value hota hai.

Example: matrix \(\begin{pmatrix} 2 & 0 \\ 0 & 3 \end{pmatrix}\) ek unit square ko area 6 ke rectangle mein badal deti hai.

Formal: 2-D linear map \(A\) ke liye area scaling factor \(|\det A|\) hai.

### Step 3 — Assembling the Jacobian matrix
Dono partial columns ko side-by-side rakh do.

\[
J = \frac{\partial(x,y)}{\partial(u,v)} = \begin{pmatrix} \frac{\partial x}{\partial u} & \frac{\partial x}{\partial v} \\ \frac{\partial y}{\partial u} & \frac{\partial y}{\partial v} \end{pmatrix}.
\]

### Step 4 — Absolute value for orientation
Agar mapping orientation reverse karti hai (det negative), integral ka sign galat ho jaayega. Isliye \(|\det J|\) use karte hain.

### Step 5 — Measure change in the integral
Chhote rectangle \(du\,dv\) ka image area \(|\det J|\,du\,dv\) ban jaata hai. Isliye
\[
\iint_R f(x,y)\,dx\,dy = \iint_S f(x(u,v),y(u,v)) \left|\frac{\partial(x,y)}{\partial(u,v)}\right| du\,dv.
\]

### Step 6 — Rigorous hypotheses
\(\mathbf{T}\) ek-to-one, \(C^1\), aur \(J \neq 0\) hona chahiye almost everywhere. Yeh Stewart Calculus, 9e, §15.9 mein full theorem hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple linear stretch**
*Given:* \(x = 2u\), \(y = 3v\), region \(0 \leq u,v \leq 1\), integrand \(f(x,y) = x+y\).
*Find:* \(\iint f(x,y)\,dx\,dy\).

Pehle Jacobian matrix likho:
\[
J = \begin{pmatrix} 2 & 0 \\ 0 & 3 \end{pmatrix}, \quad \det J = 6, \quad |J| = 6.
\]
*Why:* har column independent stretch deta hai.

Naya integral:
\[
\int_0^1 \int_0^1 (2u+3v)\cdot 6\,du\,dv = 6 \Bigl[\,u^2 + \tfrac{3}{2}v^2\,\Bigr]_0^1 = 15.
\]
**15**

*Reflection:* linear case mein Jacobian constant hota hai, isliye bahar aa jaata hai.

**Example 2 — Polar coordinates**
*Given:* \(x = r\cos\theta\), \(y = r\sin\theta\).
*Find:* Jacobian.

\[
J = \begin{pmatrix} \cos\theta & -r\sin\theta \\ \sin\theta & r\cos\theta \end{pmatrix}, \quad \det J = r.
\]
*Why:* column 2 mein r factor aata hai radius scaling se.

**Example 3 — Hyperbolic map**
*Given:* \(x = u^2 - v^2\), \(y = 2uv\), integrate \(f=1\) over quarter unit disk mapped from \(u \geq |v|\), \(u^2+v^2 \leq 1\).
*Find:* area.

Jacobian:
\[
\det J = 4(u^2 + v^2).
\]
*Why:* yeh exactly \(4r^2\) ban jaata hai polar-like scaling.

Area = \(\iint 4(u^2+v^2)\,du\,dv = \pi/2\).

**\(\pi/2\)**

*Reflection:* nonlinear map par bhi local scaling kaam karti hai.

**Example 4 — Region with vanishing Jacobian**
*Given:* \(x = u^3\), \(y = v^3\), unit square.
*Find:* integral of 1.

\(\det J = 9u^2 v^2\), zero at axes par. Mapping one-to-one nahi, area zero ho jaati hai. Result galat aata hai agar blindly apply karein.

**Warning case — do not integrate directly**

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting absolute value | Negative det orientation reverse karta hai | Hamesha \(|\det J|\) likho |
| Jacobian zero at boundary | Mapping folds ya flattens | Check \(\det J \neq 0\) inside open region |
| Wrong order of variables | \(\partial(x,y)/\partial(u,v)\) vs inverse | Column variables consistently rakho |
| Region limits not transformed | Limits abhi bhi purane coordinates mein | Sketch both regions pehle |
| Assuming global invertibility | Local Jacobian zero nahi matlab global one-to-one | Check injectivity separately |
| Missing chain-rule terms | Partial derivatives galat calculate | Symbolic software se verify karo ek baar |
| Treating Jacobian as scalar | Matrix determinant bhool jaate hain | 2×2 determinant formula yaad rakho |

## 7. The textbook-precise statement

Let \(T: S \to R\) be a \(C^1\) transformation that is one-to-one except possibly on a set of measure zero, where \(S\) and \(R\) are regions in \(\mathbb{R}^2\). Suppose the Jacobian determinant \(\partial(x,y)/\partial(u,v)\) is continuous and never zero on the interior of \(S\). Then for every continuous function \(f\) on \(R\),
\[
\iint_R f(x,y)\,dx\,dy = \iint_S f(x(u,v),y(u,v))\left|\frac{\partial(x,y)}{\partial(u,v)}\right|\,du\,dv.
\]
(Stewart, *Calculus*, 9e, §15.9, Theorem 3).

## 8. Visual — diagram or schematic

```text
v
↑
|   S (uv-plane)
|  +------+  
|  |      |   T
|  |      | ------>  R (xy-plane)
|  +------+         parallelogram image
+---------------→ u
      det(J) stretches area
```

Horizontal lines of constant v map to curves in xy-plane; vertical lines of constant u map to transverse curves. The small rectangle du×dv becomes a parallelogram whose area is exactly |det J| du dv.

## 9. The memory technique

**The hook** — Imagine a rubber sheet stamped with a tiny square grid; when you pull it into the new coordinates, each square grows or shrinks by exactly the factor |det J|. Picture the square “popping” into a parallelogram whose area multiplier is the Jacobian.

**What to overlearn** — Formula \(\det J = x_u y_v - x_v y_u\) and the absolute-value rule; also that polar Jacobian is simply \(r\).

**Spaced-repetition schedule** — Review the determinant formula after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — Linear map ke area scaling = |det| yaad na ho to do column vectors ka cross-product length nikaal lo; wohi det hota hai.

## 10. What this unlocks

Aap ab line integrals, surface integrals, vector calculus theorems (Green, Stokes, Divergence) aur probability density transformations samajh sakte hain.

- Change to spherical/cylindrical coordinates in triple integrals
- MCMC sampling in statistics (Jacobian of proposal map)
- General curvilinear coordinates in PDEs
- Differential forms and pullbacks in differential geometry

## 11. Self-check — five questions, no answers

1. Compute the Jacobian determinant of \(x = e^u \cos v\), \(y = e^u \sin v\) and simplify.

2. A map has \(\det J = 0\) along a curve inside the domain. Does the change-of-variable theorem still hold?

3. Transform \(\iint_D (x^2 + y^2)\,dx\,dy\) where \(D\) is the unit disk using the map in Example 2; evaluate both sides.

4. Why must we take the absolute value of the Jacobian even though area is positive?

5. Given two different valid coordinate changes for the same region, show that the final integral value remains identical.