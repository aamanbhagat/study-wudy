## 1. The one-sentence answer
**The change-of-variables theorem states that an integral over a region in the xy-plane equals the integral of the same function composed with the inverse transformation, multiplied by the absolute value of the Jacobian determinant of that transformation, evaluated over the corresponding region in the uv-plane.**

In one variable the factor is simply the absolute value of the derivative, which stretches or compresses intervals. In two or more variables the analogous stretching factor is a determinant that accounts for how the transformation distorts areas (or volumes) at each point; the determinant automatically incorporates both the local magnification and any rotation or shear.

The absolute value is required because area is positive regardless of whether the transformation reverses orientation. Once the Jacobian is computed, the new integral is written entirely in the new variables and the original region is replaced by its image, after which ordinary single-variable techniques or symmetry can be applied.

> [!NOTE]
> The Jacobian determinant is not an extra multiplier added after the fact; it is the precise local scaling factor that makes the equality of the two integrals hold, and it reduces to the familiar |r| factor when the transformation is polar coordinates.

## 2. Why this matters — concrete and current
In aerospace trajectory design, NASA’s General Mission Analysis Tool rewrites six-dimensional state integrals over position-velocity space into Delaunay or equinoctial orbital elements; the Jacobian supplies the exact volume distortion that converts probability densities of launch errors into collision probabilities with debris.

Semiconductor process simulation packages such as Synopsys Sentaurus solve Poisson equations on warped meshes that follow crystal lattices; the change-of-variables step maps the physical device geometry onto a rectangular computational domain, and the Jacobian determinant appears inside every finite-volume flux evaluation to preserve charge conservation.

In machine-learning research on normalizing flows, the change-of-variables formula is applied at every layer of a diffeomorphic network; the log-absolute-Jacobian term is added to the loss so that the model learns an explicit probability density on high-dimensional data manifolds, enabling exact likelihood training on ImageNet-scale image distributions.

Geophysical fluid dynamics codes at NOAA’s Geophysical Fluid Dynamics Laboratory transform integrals over spherical shells into terrain-following sigma coordinates; the Jacobian determinant corrects the vertical stretching induced by mountain ranges, ensuring that total mass and energy are conserved to machine precision in century-long climate runs.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Partial derivatives | The Jacobian matrix is assembled from all first partial derivatives of the coordinate functions. |
| Determinant of a 2-by-2 matrix | The local area scaling factor is exactly this determinant. |
| Double integrals over regions | The theorem equates two double integrals; familiarity with limits and Fubini’s theorem is assumed. |
| Inverse functions and one-to-one mappings | The transformation must be locally invertible so that each point in the new region corresponds to exactly one point in the old region. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Local linear approximation
A smooth map near any point behaves like its tangent linear map. The tangent map is represented by the Jacobian matrix of first partial derivatives; this matrix tells how an infinitesimal rectangle in the uv-plane is sent to a parallelogram in the xy-plane.

Consider the map \(x = u + v\), \(y = u - v\). At the origin the Jacobian matrix is \(\begin{pmatrix}1&1\\1&-1\end{pmatrix}\). An infinitesimal square of side \(\Delta u = \Delta v = h\) is carried to a parallelogram whose area is \(2h^2\).

The formal statement is that the differential map is
\[
d\mathbf{r} = J\, d\mathbf{u},
\]
where \(J\) is the Jacobian matrix.

> [!WARNING]
> Treating the map as constant over a finite rectangle instead of only infinitesimally produces an error whose size is governed by the second derivatives; the integral limit must be taken after the linear approximation.

### Step 2 — Area scaling by the determinant
The area of the image parallelogram equals the absolute value of the determinant of the Jacobian matrix times the area of the original rectangle.

For the preceding map the determinant equals \(-2\), so the absolute value is 2. Hence \(dx\,dy = 2\,du\,dv\).

In symbols,
\[
\left|\det J(u,v)\right|\,du\,dv
\]
replaces the Euclidean area element.

### Step 3 — Orientation and absolute value
If the determinant is negative the map reverses orientation; the image parallelogram is traversed clockwise when the original rectangle is traversed counterclockwise. Because area is unsigned, the absolute value is taken.

### Step 4 — Partition and Riemann sums
Divide the uv-region into small rectangles, apply the linear approximation on each, sum the contributions, and pass to the limit. The resulting Riemann sum converges to the integral containing the Jacobian factor.

### Step 5 — Global statement via the inverse map
When the transformation \(\mathbf{r}(u,v)\) is one-to-one and continuously differentiable with non-vanishing Jacobian on a region \(D^*\), the change-of-variables formula reads
\[
\iint_D f(x,y)\,dx\,dy = \iint_{D^*} f(x(u,v),y(u,v))\,|\det J(u,v)|\,du\,dv.
\]
This is the textbook theorem.

## 5. Worked examples — every step shown

**Example 1 — Linear map**
*Given:* Evaluate \(\iint_D (x+y)\,dx\,dy\) where \(D\) is the unit square and the change of variables is \(x=u+v\), \(y=u-v\), \(0\le u\le1\), \(0\le v\le1\).

*Find:* The transformed integral and its value.

Compute the Jacobian matrix:
\[
J = \begin{pmatrix} \partial x/\partial u & \partial x/\partial v \\ \partial y/\partial u & \partial y/\partial v \end{pmatrix} = \begin{pmatrix}1&1\\1&-1\end{pmatrix}.
\]
*Why:* Each entry is the indicated partial derivative.

Its determinant is \(1\cdot(-1)-1\cdot1=-2\), absolute value 2.
*Why:* The determinant formula for a 2-by-2 matrix.

The integrand becomes \((u+v)+(u-v)=2u\). The transformed integral is therefore
\[
\int_0^1\int_0^1 2u\cdot2\,du\,dv=4\int_0^1 u\,du=2.
\]
**Final answer:** 2

*Reflection:* The map stretches every area by exactly 2; the constant factor emerges directly from the determinant and commutes with the integration.

**Example 2 — Polar coordinates**
*Given:* The unit disk integral \(\iint_{x^2+y^2\le1} e^{-(x^2+y^2)}\,dx\,dy\).

*Find:* Value after polar change \(x=r\cos\theta\), \(y=r\sin\theta\).

Jacobian matrix:
\[
J=\begin{pmatrix}-\sin\theta&r\cos\theta\\\cos\theta&r\sin\theta\end{pmatrix},\qquad\det J=r.
\]
*Why:* Standard trigonometric differentiation.

Absolute value \(|r|=r\) (since \(r\ge0\)). Integrand becomes \(e^{-r^2}\). Region: \(0\le r\le1\), \(0\le\theta\le2\pi\).

Integral:
\[
\int_0^{2\pi}\int_0^1 e^{-r^2}r\,dr\,d\theta=2\pi\cdot\frac12(1-e^{-1})=\pi(1-e^{-1}).
\]
**Final answer:** \(\pi(1-1/e)\)

*Reflection:* The extra \(r\) is not inserted by hand; it is the Jacobian determinant evaluated for this particular parametrization.

**Example 3 — Parabolic coordinates**
*Given:* Region bounded by \(y=x^2\), \(y=4\), \(x=0\), transformed by \(x=uv\), \(y=u^2-v^2\).

*Find:* The image region and Jacobian factor.

Solve for limits: \(u^2-v^2=4\) and \(u^2-v^2=x^2\) together with \(x=uv\ge0\). The Jacobian determinant evaluates to \(2u(u^2+v^2)\). The absolute value supplies the measure factor.

**Final answer:** integral becomes \(\int\int f(uv,u^2-v^2)\cdot|2u(u^2+v^2)|\,du\,dv\) over the appropriate rectangle in uv.

*Reflection:* Non-orthogonal coordinates produce a position-dependent Jacobian; the factor must be kept inside the integral.

**Example 4 — Three-dimensional spherical coordinates**
*Given:* Unit-ball integral of 1.

*Find:* Volume via \(\rho,\phi,\theta\).

Jacobian determinant equals \(\rho^2\sin\phi\). Integration limits \(0\le\rho\le1\), \(0\le\phi\le\pi\), \(0\le\theta\le2\pi\) yield
\[
\int_0^{2\pi}\int_0^\pi\int_0^1\rho^2\sin\phi\,d\rho\,d\phi\,d\theta=\frac43\pi.
\]
**Final answer:** \(\frac43\pi\)

*Reflection:* The same principle extends verbatim to any dimension; only the explicit determinant changes.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting the absolute value | Students remember “Jacobian” but drop the sign check. | Always compute det J first, then take |det J|. |
| Using the Jacobian of the inverse map | Confusion between forward and inverse transformations. | Decide which variables are independent; differentiate those functions. |
| Evaluating the Jacobian at the wrong point | Substituting numerical values before forming the determinant. | Keep symbols until det J is fully expanded. |
| Ignoring vanishing Jacobian loci | The map folds or flattens; local invertibility fails. | Verify det J ≠ 0 throughout the open region before applying the theorem. |
| Mixing dx dy order with du dv order | The determinant changes sign under row swap. | Consistently differentiate x and y with respect to the new variables in the same order. |
| Applying the formula to non-injective maps | Global overlap produces double-counting. | Split the domain into injective pieces or restrict the range. |
| Treating the Jacobian as constant when it is not | Linear-map intuition misapplied to nonlinear maps. | Retain the full function |det J(u,v)| inside the integrand. |

## 7. The textbook-precise statement
Let \(D\subset\mathbb{R}^2\) be a bounded region whose boundary has measure zero. Suppose \(\mathbf{T}:D^*\to D\) is a continuously differentiable bijection with continuously differentiable inverse, and \(\det J_{\mathbf{T}}(u,v)\ne0\) for all \((u,v)\in D^*\). Then for any continuous \(f:D\to\mathbb{R}\),
\[
\iint_D f(x,y)\,dx\,dy=\iint_{D^*}f(\mathbf{T}(u,v))\,|\det J_{\mathbf{T}}(u,v)|\,du\,dv.
\]
(See Stewart, *Calculus*, 9e, §15.9, Theorem 3.)

## 8. Visual — diagram or schematic
```text
uv-plane rectangle          Jacobian map T          xy-plane image
(0,0)----(1,0)              linear approx           parallelogram
 |         |                 det J = -2              vertices:
 |         |                                        T(0,0)=(0,0)
(0,1)----(1,1)               area factor 2          T(1,0)=(1,1)
                                                    T(0,1)=(1,-1)
                                                    T(1,1)=(2,0)
```
Each small rectangle of area \(du\,dv\) is sent to a parallelogram whose signed area is \(\det J\,du\,dv\).

## 9. The memory technique

**The hook**  
Picture a tiny square stamp on the uv-plane being pressed through a fun-house mirror (the map T) that turns it into a skewed parallelogram; the area multiplier is written on the mirror as the determinant.

**What to overlearn**  
- \(\det J=\frac{\partial(x,y)}{\partial(u,v)}\) expands to the 2-by-2 determinant of partials.  
- Always insert the absolute value.  
- The formula reduces exactly to the polar factor \(r\) when \(x=r\cos\theta\), \(y=r\sin\theta\).

**Spaced-repetition schedule**  
Review the definition and polar case after 1 day, the full theorem statement after 3 days, a non-orthogonal example after 7 days, a three-variable spherical case after 16 days, and a full proof sketch after 35 days.

**First-principles fallback**  
Re-derive the linear case by computing the area of the image parallelogram from two edge vectors, recognize that this area is the determinant, then pass to the limit via Riemann sums.

## 10. What this unlocks
Mastery of the general Jacobian permits immediate transition to surface integrals, differential forms, and the change-of-variables theorems that underlie Stokes’ and divergence theorems. It also supplies the analytic engine behind coordinate transformations in Hamiltonian mechanics, finite-element mesh adaptation, and normalizing-flow density estimation.

- Surface integrals on parametrized manifolds  
- Pullbacks of differential forms  
- Liouville’s theorem in classical mechanics  
- MCMC proposals on manifolds  

## 11. Self-check — five questions, no answers
1. Compute the Jacobian determinant of the map \(x=u^2-v^2\), \(y=2uv\) and state where it vanishes.  
2. Transform the integral \(\iint_R xy\,dx\,dy\) over the unit disk using the map in question 1; identify the new region.  
3. A map has Jacobian determinant identically equal to −1. What does this imply about areas and orientation?  
4. Why does the change-of-variables formula fail if the map is not one-to-one on the interior of the domain?  
5. Derive the volume element in cylindrical coordinates from the general three-dimensional Jacobian formula.