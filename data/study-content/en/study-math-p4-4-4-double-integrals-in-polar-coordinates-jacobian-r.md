## 1. The one-sentence answer
**Double integrals in polar coordinates replace the Cartesian area element \(dx\,dy\) with the scaled element \(r\,dr\,d\theta\) because the Jacobian determinant of the polar-to-Cartesian transformation equals \(r\).**

In Cartesian coordinates the infinitesimal rectangle \(dx\) by \(dy\) has area exactly \(dx\,dy\). When the same region is described by radius and angle, the corresponding infinitesimal patch is a curved “rectangle” whose sides stretch with distance from the origin; one side grows like \(dr\) while the other grows like \(r\,d\theta\). Their product therefore contains an extra factor of \(r\).

That extra factor is not inserted by hand; it emerges automatically once the change-of-variables theorem is applied to the map \((r,\theta)\mapsto(x,y)\). The absolute value of the determinant of the derivative matrix of this map is precisely \(r\).

> [!NOTE]
> The single number \(r\) encodes how much the coordinate grid is stretched at each point; forgetting it is equivalent to pretending every polar patch has the same area as a Cartesian square of side \(dr\).

## 2. Why this matters — concrete and current
NASA’s Perseverance rover uses polar-coordinate double integrals to compute the total solar energy incident on its tilted panels as a function of Martian latitude and season; the \(r\) factor converts the angular field-of-view into actual power collected.

In semiconductor lithography, ASML’s scanners model the intensity distribution of extreme-ultraviolet light across a circular wafer; the integral that predicts dose variation is performed in polar coordinates so that the radially increasing pixel area is correctly weighted by the Jacobian \(r\).

Climate scientists at NOAA integrate precipitation rate over the Arctic cap in polar coordinates; omitting \(r\) would understate total freshwater input to the North Atlantic by roughly 30 % near the pole.

Machine-learning researchers training generative models on fisheye-camera data reparameterize the image likelihood integral in polar coordinates; the Jacobian \(r\) appears in the training loss and prevents the model from overweighting the dense central pixels.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Double integrals over rectangles in Cartesian coordinates | The polar integral is obtained by transforming an existing Cartesian integral. |
| Polar coordinate definitions \(x=r\cos\theta\), \(y=r\sin\theta\) | These supply the explicit change-of-variable functions. |
| Determinant of a \(2\times2\) matrix | The Jacobian factor is exactly this determinant evaluated on the transformation. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Area patches are not uniform in polar coordinates
A small rectangle \(dr\) by \(d\theta\) near the origin covers far less physical area than the same \(dr\) by \(d\theta\) at large radius.  
Example: at \(r=1\) the arc length is \(d\theta\); at \(r=2\) the arc length is \(2d\theta\).  
Formal statement: infinitesimal area \(\approx r\,dr\,d\theta\).  
> [!WARNING] Treating every angular wedge as having constant width leads to systematic underestimation of integrals over large disks.

### Step 2 — The transformation map
Define the map \(T:(r,\theta)\mapsto(x,y)\) by  
\[
T(r,\theta)=(r\cos\theta,\,r\sin\theta).
\]
Its derivative matrix (Jacobian matrix) is
\[
DT=\begin{pmatrix}\cos\theta & -r\sin\theta\\\sin\theta & r\cos\theta\end{pmatrix}.
\]

### Step 3 — Compute the determinant
\[
\det(DT)=r\cos^2\theta+r\sin^2\theta=r.
\]
Absolute value \(|\det(DT)|=r\) (since \(r\ge0\)).

### Step 4 — Invoke the change-of-variables theorem
If \(T\) is one-to-one and continuously differentiable on an open set containing the region, then
\[
\iint_R f(x,y)\,dx\,dy=\iint_{T^{-1}(R)}f(T(r,\theta))\,|\det(DT)|\,dr\,d\theta.
\]
Substituting the determinant yields the polar formula.

### Step 5 — State the final textbook result
\[
\iint_D f(x,y)\,dA=\int_{\alpha}^{\beta}\int_{a(\theta)}^{b(\theta)}f(r\cos\theta,r\sin\theta)\,r\,dr\,d\theta.
\]

## 5. Worked examples — every step shown

**Example 1 — Unit disk, constant function**  
*Given:* \(f(x,y)=1\), \(D=\{(x,y):x^2+y^2\le1\}\).  
*Find:* area of \(D\).  
Step 1: switch to polar limits \(\theta:0\to2\pi\), \(r:0\to1\).  
*Why:* the disk is described exactly by these bounds.  
Step 2: integrand becomes \(1\cdot r\).  
*Why:* Jacobian supplies the extra \(r\).  
Step 3: \(\int_0^{2\pi}\int_0^1 r\,dr\,d\theta=2\pi\cdot\frac12=\pi\).  
**\(\pi\)**  
*Reflection:* the constant function isolates the Jacobian; any missing \(r\) would give \(2\pi\) instead of \(\pi\).

**Example 2 — Average distance from origin inside unit disk**  
*Given:* \(f(x,y)=\sqrt{x^2+y^2}\).  
*Find:* \(\frac1{\text{area}}\iint_D f\,dA\).  
Step 1: \(\iint_D r\cdot r\,dr\,d\theta=\int_0^{2\pi}\int_0^1 r^2\,dr\,d\theta=\frac{2\pi}3\).  
*Why:* \(f=r\) and Jacobian another \(r\).  
Step 2: divide by area \(\pi\) yields \(\frac23\).  
**\(\frac23\)**  
*Reflection:* two powers of \(r\) appear; confusing which is which is a common slip.

**Example 3 — Integral over annular sector**  
*Given:* \(f(x,y)=x\), region \(1\le r\le2\), \(\pi/4\le\theta\le\pi/2\).  
*Find:* \(\iint x\,dA\).  
Step 1: \(x=r\cos\theta\), integrand \(r\cos\theta\cdot r=r^2\cos\theta\).  
*Why:* Jacobian multiplies.  
Step 2: \(\int_{\pi/4}^{\pi/2}\int_1^2 r^2\cos\theta\,dr\,d\theta=\frac13(8-1)\cdot\frac{\sqrt2}2=\frac{7\sqrt2}6\).  
**\(\dfrac{7\sqrt2}6\)**  
*Reflection:* limits are constants, yet the integrand still carries the full \(r\) factor.

**Example 4 — Non-constant radial limit**  
*Given:* \(f=1\), region inside cardioid \(r=1+\cos\theta\).  
*Find:* area.  
Step 1: \(\int_0^{2\pi}\int_0^{1+\cos\theta} r\,dr\,d\theta=\frac12\int_0^{2\pi}(1+\cos\theta)^2\,d\theta=\frac{3\pi}2\).  
**\(\dfrac{3\pi}2\)**  
*Reflection:* variable upper limit tests whether the student remembers to keep the Jacobian inside the inner integral.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Forgetting the factor \(r\) entirely | Treating polar patches as rectangles        | Always write the area element as \(r\,dr\,d\theta\) before integrating |
| Using \(r\) only once when \(f\) already contains \(r\) | Confusing the function value with the Jacobian | Keep two separate \(r\) symbols until substitution   |
| Integrating \(r\) with respect to \(\theta\) first | Order-of-integration habit from Cartesian   | Perform the \(r\) integral first when the Jacobian is present |
| Using \(\theta\) limits that cross the origin incorrectly | Forgetting polar coordinates are singular at \(r=0\) | Check that the map \(T\) is one-to-one on the interior |
| Dropping absolute value on Jacobian | Assuming \(r>0\) everywhere                 | Verify domain excludes the origin or note \(r\ge0\)  |
| Converting only the integrand, not the limits | Mechanical substitution without geometry    | Sketch the region in both coordinate systems first   |
| Using \(dr\,d\theta\) after a substitution back to Cartesian | Losing track of which variables are active  | Rename dummy variables immediately after change      |

## 7. The textbook-precise statement
Let \(D\) be a region in the \(xy\)-plane and let \(T(r,\theta)=(r\cos\theta,r\sin\theta)\) be continuously differentiable and one-to-one on an open set containing the closure of a region \(G\) in the \(r\theta\)-plane, with \(T(G)=D\) and \(\det DT\neq0\) on the interior of \(G\). Then
\[
\iint_D f(x,y)\,dA=\iint_G f(r\cos\theta,r\sin\theta)\,r\,dr\,d\theta
\]
provided the integrals exist (Stewart, *Calculus*, 9e, §15.4, Theorem 3).

## 8. Visual — diagram or schematic
```text
          θ
           ↑
           |     r+dr
        arc length = (r+dr) dθ
     ------------------+
    /                   \
   /   polar patch       \   dr
  /                       \
 /  area ≈ r dr dθ         \
+---------------------------+  ----> r
        arc length = r dθ
```
The diagram shows two concentric arcs separated by radial distance \(dr\). The inner arc has length \(r\,d\theta\), the outer \((r+dr)\,d\theta\). The patch they bound has area that expands linearly with \(r\).

## 9. The memory technique
1. **The hook** — picture a folding fan: each thin slice widens as it moves outward; the extra width is exactly the factor \(r\).
2. **What to overlearn** — the area element is always \(r\,dr\,d\theta\); the Jacobian determinant equals \(r\); limits must be expressed in \(r\) and \(\theta\).
3. **Spaced-repetition schedule** — review the derivation at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.
4. **First-principles fallback** — recompute \(\det DT\) from the partial-derivative matrix of \(x=r\cos\theta\), \(y=r\sin\theta\).

## 10. What this unlocks
Mastery of the polar Jacobian immediately permits integration over any region whose boundary is naturally described by radius and angle, and supplies the template for every later curvilinear coordinate system.

- Triple integrals in spherical coordinates (Jacobian \(r^2\sin\phi\))
- Change-of-variables theorem in \(\mathbb{R}^n\)
- Surface integrals on surfaces of revolution
- Fourier–Bessel series and Hankel transforms

## 11. Self-check — five questions, no answers
1. Compute \(\iint_D(x^2+y^2)\,dA\) where \(D\) is the disk of radius 3 centered at the origin, using polar coordinates.
2. Without evaluating, explain why \(\iint_D 1\,dA\) over the unit disk yields \(\pi\) only after the factor \(r\) is included.
3. A student writes \(\int_0^{2\pi}\int_0^1 f(r\cos\theta,r\sin\theta)\,dr\,d\theta\). Identify the error and its geometric meaning.
4. Derive the Jacobian determinant of the map \((r,\theta)\mapsto(x,y)\) from first principles using partial derivatives.
5. Sketch the region \(0\le\theta\le\pi/2\), \(0\le r\le\sin\theta\) and set up (but do not evaluate) the integral of \(f(x,y)=y\) over that region in polar coordinates.