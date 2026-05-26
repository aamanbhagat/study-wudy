## 1. The one-sentence answer
**Parametric forms of conics** replace the implicit Cartesian equation of each conic with a pair of equations \(x = x(t)\), \(y = y(t)\) that automatically satisfy the conic for every real (or angular) value of the parameter \(t\).

Aap already jaante ho ki ek circle \(x^2 + y^2 = r^2\) ko satisfy karne wale points ko ek single angle \(\theta\) se describe kar sakte hain. Wahi idea extend hoti hai ellipse, parabola aur hyperbola tak. Har conic ke liye ek parameter choose karte hain jo geometry ke natural symmetry ko capture kare — angle for closed curves, eccentric angle ya hyperbolic functions for open curves. Result ek pair of functions hota hai jo direct plotting, arc-length aur tangent calculations ko dramatically simplify kar deta hai.

Iska matlab yeh hai ki aap ab \(t\) ko freely vary karke points generate kar sakte ho bina kisi square-root ya implicit solving ke. Yeh representation projective geometry aur differential geometry dono mein natural language ban jaati hai.

> [!NOTE]
> The single deepest insight is that every non-degenerate conic is the image of the unit circle under an affine transformation; therefore one parametric template (cosine–sine) plus linear stretching and shearing produces the parametric equations of all other conics.

## 2. Why this matters — concrete and current
In orbital mechanics, SpaceX’s Starlink constellation propagation routines use the parametric form of an ellipse (with eccentric anomaly as parameter) to compute satellite positions at microsecond intervals without repeatedly solving Kepler’s equation numerically.

Semiconductor mask writers at ASML employ parabolic parametric equations to drive electron-beam deflection coils when writing the curved features of extreme-ultraviolet lithography reticles; the quadratic parameter \(t\) maps linearly to deflection voltage, eliminating real-time square-root hardware.

Computer-vision libraries inside Meta’s SLAM pipelines represent hyperbolic mirror surfaces of catadioptric cameras via the parametric equations \(x = a\sec t\), \(y = b\tan t\); this lets the undistortion map be evaluated with only two trigonometric calls per pixel.

In particle-accelerator lattice design at CERN, the hyperbolic parametric equations of the beam envelope (using rapidity as parameter) allow symplectic integrators to preserve phase-space volume exactly over millions of turns.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Pythagorean identity     | Generates the parameterisation of the unit circle         |
| Linear transformations   | Stretch and shear the circle into ellipse or hyperbola    |
| Trigonometric identities | Convert between parametric and Cartesian forms            |
| Domain and range         | Decide legal intervals for \(t\) on each conic            |

Agar aap inme se koi bhi weak feel karte ho, pause karke unhe pehle revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the unit circle
Aap already jaante ho ki \((\cos\theta,\sin\theta)\) hamesha \(x^2+y^2=1\) par pada hai. Isko ek concrete example se dekho: \(\theta=\pi/4\) deta hai point \((\frac{\sqrt{2}}{2},\frac{\sqrt{2}}{2})\). Formal statement:
\[
x=\cos\theta,\qquad y=\sin\theta,\qquad\theta\in[0,2\pi).
\]
> [!WARNING]
> Agar aap \(\theta\) ko sirf \([0,\pi]\) tak limit kar do to pura circle nahi milega — lower half miss ho jaayegi.

### Step 2 — Stretch into an ellipse
Linear map \(x\leftarrow ax\), \(y\leftarrow by\) circle ko ellipse mein badal deta hai. Concrete: \(a=3\), \(b=1\) deta hai \(x=3\cos\theta\), \(y=\sin\theta\). Formal:
\[
\frac{x^2}{a^2}+\frac{y^2}{b^2}=1\qquad\Rightarrow\qquad x=a\cos\theta,\quad y=b\sin\theta.
\]

### Step 3 — Rotate the parameter for the parabola
Parabola ko ek projective view se dekho: ek circle ko line tak project karo. Resulting parameter \(t\) quadratic terms deta hai. Concrete: \(x=at^2\), \(y=2at\) satisfies \(y^2=4ax\). Formal:
\[
x=at^2,\qquad y=2at,\qquad t\in\mathbb{R}.
\]

### Step 4 — Use secant–tangent for the hyperbola
Hyperbola ke do branches hain; secant aur tangent dono branches cover karte hain. Concrete: \(a=1\), \(b=1\) deta hai \(x=\sec\theta\), \(y=\tan\theta\). Formal:
\[
\frac{x^2}{a^2}-\frac{y^2}{b^2}=1\qquad\Rightarrow\qquad x=a\sec\theta,\quad y=b\tan\theta,\quad\theta\in(-\pi/2,\pi/2).
\]

### Step 5 — Hyperbolic functions as an alternative
Hyperbolic identity \(\cosh^2 t-\sinh^2 t=1\) directly deta hai second standard form. Formal:
\[
x=a\cosh t,\qquad y=b\sinh t,\qquad t\in\mathbb{R}.
\]

### Step 6 — Unify via rational quadratic parametrisation
Projective geometry mein har conic ek rational quadratic Bézier curve hoti hai. Yeh form computer graphics mein use hoti hai lekin abhi ke liye trigonometric/hyperbolic forms kaafi hain.

## 5. Worked examples — har step show karo

**Example 1 — Unit circle point at 60°**
*Given:* \(\theta=60^\circ\).
*Find:* \((x,y)\).
\[
x=\cos 60^\circ=0.5,\qquad y=\sin 60^\circ=\frac{\sqrt{3}}{2}.
\]
*Why:* Direct substitution of the defining parameter into the parametric template.
**Final answer**
**(0.5, √3/2)**

*Reflection:* Trivial case; shows that the parameter is simply the polar angle.

**Example 2 — Ellipse point with eccentric angle 30°**
*Given:* \(a=4\), \(b=2\), \(\theta=\pi/6\).
*Find:* \((x,y)\).
\[
x=4\cos(\pi/6)=4\cdot\frac{\sqrt{3}}{2}=2\sqrt{3},\qquad y=2\sin(\pi/6)=2\cdot\frac12=1.
\]
*Why:* Scaling factors \(a\) and \(b\) multiply the unit-circle coordinates.
**Final answer**
**(2√3, 1)**

*Reflection:* Shows how the same angle \(\theta\) produces different arc speeds along major and minor axes.

**Example 3 — Parabola point at parameter t=3**
*Given:* \(a=1\), \(t=3\).
*Find:* \((x,y)\).
\[
x=1\cdot9=9,\qquad y=2\cdot1\cdot3=6.
\]
*Why:* Quadratic and linear dependence on \(t\) automatically satisfies \(y^2=4ax\).
**Final answer**
**(9, 6)**

*Reflection:* Negative \(t\) gives the lower half; \(t=0\) is the vertex.

**Example 4 — Hyperbola right branch at θ=π/3**
*Given:* \(a=2\), \(b=3\), \(\theta=\pi/3\).
*Find:* \((x,y)\).
\[
x=2\sec(\pi/3)=2\cdot2=4,\qquad y=3\tan(\pi/3)=3\sqrt{3}.
\]
*Why:* Secant >1 guarantees the point lies outside the asymptotes.
**Final answer**
**(4, 3√3)**

*Reflection:* The same angle interval covers only one branch; the left branch needs \(\theta\) shifted by \(\pi\).

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------|------------------------------------------------------|
| Using \(\theta\) outside valid range for hyperbola | Students copy ellipse range blindly           | Restrict \(\theta\in(-\pi/2,\pi/2)\)                 |
| Forgetting the factor 2 in parabola y=2at | Confusing focal length  a with latus rectum   | Memorise y=2at from derivative at vertex             |
| Mixing sec/tan with cos/sin for hyperbola | Over-generalising circle identities           | Always verify \(\frac{x^2}{a^2}-\frac{y^2}{b^2}=1\)  |
| Treating t as arc length          | Parameter is not normalised                   | Compute arc-length integral separately               |
| Sign error when t is negative     | Parabola opens only one way                   | Plot a few negative t values explicitly              |
| Using degrees instead of radians in calculators | Calculator mode mismatch                      | Always switch to radian mode before evaluating       |

## 7. The textbook-precise statement
A non-degenerate conic section in the Euclidean plane admits the following parametric representations (Thomas’ Calculus, 15th ed., §10.5):

- Ellipse: \(x=a\cos t\), \(y=b\sin t\), \(t\in[0,2\pi)\), \(a>b>0\).
- Parabola: \(x=at^2\), \(y=2at\), \(t\in\mathbb{R}\), \(a>0\).
- Hyperbola (right/left branches): \(x=a\sec t\), \(y=b\tan t\), \(t\in(-\pi/2,\pi/2)\), \(a,b>0\).

Each parametrisation is obtained by composing an affine transformation with the standard trigonometric parametrisation of the unit circle or by using the defining hyperbolic identity.

## 8. Visual — diagram or schematic
```
          y
          ^
          |      hyperbola
     b*tan|    /        \
          |   /          \
          |  /            \
          | /              \
   vertex |/________________\______ x
          |      parabola     a*sec
          |
   ellipse|
      (a cos, b sin) circle inside
```

Axes labelled; ellipse is the bounded oval, parabola the U-shape touching at origin, hyperbola the two branches opening left-right.

## 9. The memory technique

1. **The hook** — Picture a rubber stamp of the unit circle; stretching it vertically gives an ellipse, tilting it gives a rotated ellipse, slicing it with a plane gives the parabola and hyperbola.
2. **What to overlearn** — \(x=a\cos t\), \(y=b\sin t\) (ellipse); \(x=at^2\), \(y=2at\) (parabola); \(x=a\sec t\), \(y=b\tan t\) (hyperbola).
3. **Spaced-repetition schedule** — Review the three canonical pairs at 1 day, 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — Start from the Cartesian equation, substitute the guessed parameter, and verify the identity (Pythagorean or hyperbolic) holds identically.

## 10. What this unlocks
Parametric forms let you compute tangent vectors, arc length and curvature by ordinary differentiation instead of implicit differentiation. Next you can move to:

- Envelopes and caustic curves of conics
- Rational quadratic Bézier representation used in CAD
- Polar reciprocity and pole-polar relations
- Differential geometry of space curves that lie on quadrics

## 11. Self-check — five questions, no answers
1. Write the parametric equations of the ellipse \(\frac{x^2}{9}+\frac{y^2}{4}=1\) and locate the point at eccentric angle \(2\pi/3\).
2. Show that the parametric point \((at^2,2at)\) always satisfies the parabola focus-directrix property.
3. For the hyperbola \(\frac{x^2}{4}-\frac{y^2}{9}=1\), find the range of \(t\) that covers only the left branch when using secant–tangent form.
4. Differentiate the parametric equations of the ellipse and obtain the slope \(\frac{dy}{dx}\) at an arbitrary point; compare with implicit differentiation.
5. A student claims that \(x=\cosh t\), \(y=\sinh t\) represents the unit circle. Identify the mistake and correct it.