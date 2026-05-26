## 1. The one-sentence answer
**Differentiability in multiple variables** means the function can be locally approximated by a linear map so that the error vanishes faster than the distance to the point.

Iska matlab yeh hai ki ek multivariable function \(f: \mathbb{R}^n \to \mathbb{R}^m\) point \(a\) par differentiable tab hoti hai jab uska behaviour us point ke aas-paas ek linear transformation se control ho jaaye. Single-variable case mein sirf ek derivative hoti thi; yahan ek Jacobian matrix hoti hai jo sab directions ko ek saath handle karti hai. Agar yeh linear approximation exist karti hai to partial derivatives automatically exist karte hain, lekin sirf partial derivatives hone se differentiability guarantee nahi hoti.

> [!NOTE]
> The single most important “aha” is that existence of all partial derivatives is necessary but never sufficient; the true definition demands the remainder term to be \(o(\|h\|)\) uniformly in every direction.

## 2. Why this matters — concrete and current
In aerospace trajectory planning, NASA’s Artemis program uses differentiable gravity models of the Earth-Moon system so that gradient-based optimisers can compute fuel-optimal transfers without discontinuities.

In semiconductor process simulation, Synopsys TCAD tools rely on differentiable doping profiles; the Jacobian of the drift-diffusion equations must exist for Newton solvers to converge inside each mesh cell.

Modern transformer training at OpenAI and Google DeepMind depends on automatic differentiation through attention layers; without multivariable differentiability of the softmax and matrix-multiplication maps, back-propagation would produce incorrect gradients.

In general relativity, the linearised Einstein equations around a Schwarzschild background require the metric perturbation to be differentiable so that the Lichnerowicz operator remains elliptic and well-posed.

Climate models at ECMWF employ differentiable moisture-convergence schemes; the resulting Jacobian is used inside 4D-Var data assimilation to update initial conditions every six hours.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Limit of a vector-valued function | The very definition is a limit statement in \(\mathbb{R}^n\). |
| Linear transformations and matrices | The best linear approximation is precisely the derivative map. |
| Norms and continuity     | We must control \(\|R(h)\| / \|h\|\) where \(R\) is the remainder. |
| Partial derivatives      | They supply candidate entries for the Jacobian matrix.    |

Agar aap inme se koi bhi weak feel karte hain, to pehle unhe solid kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — From single-variable tangent line to tangent plane
Plain Hinglish claim: single variable mein derivative ek slope deta tha; do variables mein slope ki jagah ek entire plane chahiye jo surface ko touch kare.

Concrete example: \(f(x,y)=x^2+y^2\) at (0,0). The tangent plane is simply the xy-plane z=0.

Formal statement: the candidate linear map is \(L(h,k)=f_x(a,b)h+f_y(a,b)k\).

> [!WARNING]
> Agar aap sirf partial derivatives likh kar ruk jaate ho bina limit check kiye, to non-differentiable functions (jaise \(f(x,y)=|x|+|y|\)) ko galti se differentiable maan baithoge.

### Step 2 — The precise limit definition
The function is differentiable at \(a\) if
\[
\lim_{h\to 0}\frac{\|f(a+h)-f(a)-Df(a)(h)\|}{\|h\|}=0.
\]
Yeh limit vector norm mein liya jaata hai aur har possible direction \(h\) ke liye zero hona chahiye.

### Step 3 — Existence of the candidate linear map
Agar partial derivatives exist in a neighbourhood and are continuous at \(a\), then \(Df(a)\) automatically exists and equals the Jacobian matrix. Continuity of partials is a convenient sufficient condition, not necessary.

### Step 4 — The Jacobian matrix
\[
Df(a)=\begin{pmatrix}
\frac{\partial f_1}{\partial x_1} & \cdots & \frac{\partial f_1}{\partial x_n}\\
\vdots & \ddots & \vdots\\
\frac{\partial f_m}{\partial x_1} & \cdots & \frac{\partial f_m}{\partial x_n}
\end{pmatrix}(a)
\]

### Step 5 — Remainder term must be little-o of \|h\|
Write \(f(a+h)=f(a)+Df(a)h+R(h)\) with \(\|R(h)\|=o(\|h\|)\). Agar yeh o(\|h\|) condition fail ho, function differentiable nahi.

### Step 6 — Textbook-grade definition
A function \(f:\mathbb{R}^n\to\mathbb{R}^m\) is differentiable at \(a\) if there exists a linear map \(L:\mathbb{R}^n\to\mathbb{R}^m\) such that the above limit equals zero; that unique map \(L\) is called \(Df(a)\).

## 5. Worked examples — har step show karo

**Example 1 — Simple linear function**  
*Given:* \(f(x,y)=3x-2y+5\) at (1,2).  
*Find:* Is it differentiable?  
Step 1: partial derivatives \(f_x=3\), \(f_y=-2\) constant, hence continuous.  
Step 2: Jacobian row vector \([3,-2]\).  
Step 3: remainder \(R(h,k)=0\), so \(\|R\|/\|(h,k)\|=0\).  
**Final answer:** differentiable with \(Df(1,2)=[3,-2]\).  
*Reflection:* linear functions are always differentiable everywhere; the example shows the definition is trivially satisfied.

**Example 2 — Quadratic bowl**  
*Given:* \(f(x,y)=x^2+y^2\) at (0,0).  
*Find:* Differentiability.  
Partial derivatives: \(f_x=2x\), \(f_y=2y\). Jacobian at origin is zero matrix.  
Remainder: \(f(h,k)-f(0,0)-0=h^2+k^2\), so \(\frac{h^2+k^2}{\sqrt{h^2+k^2}}=\sqrt{h^2+k^2}\to0\).  
**Final answer:** differentiable, \(Df(0,0)=0\).  
*Reflection:* even though the graph is curved, the curvature is quadratic hence o(\|h\|).

**Example 3 — Classic counter-example**  
*Given:* \(f(x,y)=\frac{xy}{x^2+y^2}\) for \((x,y)\ne(0,0)\), \(f(0,0)=0\).  
*Find:* differentiable at origin?  
Partials exist and equal zero at origin. Along y=mx, limit of remainder is nonzero in some directions.  
**Final answer:** not differentiable at (0,0).  
*Reflection:* partials exist but the limit fails; this is the most common trap.

**Example 4 — Composition**  
*Given:* \(f(x,y)=e^{x+y}\) at (0,0).  
Chain rule gives Jacobian row \([e^{x+y},e^{x+y}]\) evaluated at origin = [1,1]. Remainder analysis via Taylor shows o(\|h\|).  
**Final answer:** differentiable with \(Df(0,0)=[1,1]\).  
*Reflection:* exponential is smooth, hence differentiable in any number of variables.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming existence of partials implies differentiability | Students remember single-variable theorem and forget the uniform limit requirement | Always verify the o(\|h\|) definition or check continuity of partials |
| Using directional derivatives only | Directional derivatives can exist in every direction yet the linear map may not be consistent | Compute the full Jacobian and test the limit along all paths |
| Forgetting that the Jacobian must be the same linear map in every direction | Different paths give different “slopes” | Fix the candidate matrix first, then test the single limit |
| Confusing continuity with differentiability | Continuous functions need not be differentiable | Check the stronger o(\|h\|) condition |
| Neglecting higher-dimensional codomain | Students treat only scalar-valued functions | Remember the definition works verbatim for \(\mathbb{R}^m\) |
| Division by zero in polar substitution | When switching to polar, r=0 is excluded but students forget the limit as r→0 | Keep r>0 and take limit explicitly |
| Assuming C^1 is necessary | Over-reliance on the sufficient condition | Recall that mere existence of differentiable partials (not necessarily continuous) can still work |

## 7. The textbook-precise statement
A function \(f:U\subset\mathbb{R}^n\to\mathbb{R}^m\), where \(U\) is open, is said to be differentiable at a point \(a\in U\) if there exists a linear transformation \(Df(a):\mathbb{R}^n\to\mathbb{R}^m\) such that
\[
\lim_{h\to0}\frac{\|f(a+h)-f(a)-Df(a)(h)\|}{\|h\|}=0.
\]
When this holds, the linear map \(Df(a)\) is unique and its matrix representation with respect to the standard bases is the Jacobian matrix whose entries are the first partial derivatives of the component functions of \(f\). (See Rudin, *Principles of Mathematical Analysis*, 3e, Theorem 9.21.)

## 8. Visual — diagram or schematic
```
          z
          |
          |   tangent plane
         /|\
        / | \
       /  |  \   surface z=f(x,y)
      /   *   \
     /_________\_____ y
    /
   /
  x
```
Point * marks (a,b,f(a,b)). The plane touches the surface at that single point and the vertical gap between plane and surface shrinks faster than the horizontal distance to *.

## 9. The memory technique
1. **The hook** — Picture a surfboard (the tangent plane) perfectly balanced on a single point of a wave (the surface); any wobble means the board is not the true tangent and the function is not differentiable.
2. **What to overlearn** — The exact limit definition and the fact that continuous partial derivatives guarantee differentiability.
3. **Spaced-repetition schedule** — Review definition after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from the single-variable definition, replace the scalar h by a vector h, replace the number f'(a) by a matrix, and enforce the remainder condition in the chosen norm.

## 10. What this unlocks
Once differentiability is solid, the entire chain rule, inverse-function theorem, implicit-function theorem, and Taylor expansion in several variables become available.

- Chain rule for vector-valued maps
- Mean-value inequality in \(\mathbb{R}^n\)
- Inverse and implicit function theorems
- Higher-order derivatives and Hessian tests for extrema
- Differential forms and Stokes’ theorem foundations

## 11. Self-check — five questions, no answers
1. Give an example of a function whose partial derivatives exist everywhere yet the function is nowhere differentiable.
2. Compute the Jacobian of \(f(x,y,z)= (x^2+y^2, e^z)\) at (1,0,0) and verify the definition directly.
3. Show that \(f(x,y)= (x^3+y^3)^{1/3}\) is not differentiable at (0,0) even though all directional derivatives exist.
4. If all first partial derivatives exist and are continuous in a neighbourhood of a, prove differentiability at a.
5. Construct a function that is differentiable exactly on the unit circle and nowhere else.