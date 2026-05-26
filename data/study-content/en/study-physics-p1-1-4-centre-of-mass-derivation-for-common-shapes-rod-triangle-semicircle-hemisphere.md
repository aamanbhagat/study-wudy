## 1. The one-sentence answer
**The centre of mass of a continuous object is the unique point obtained by weighting every infinitesimal mass element by its position vector and dividing by the total mass, yielding a single location that behaves as if all mass were concentrated there under uniform gravity or during free translation.**

This definition arises because linear momentum of a system is always \(\mathbf{P} = M \mathbf{R}_\text{cm}\), so the motion of the system’s total mass separates cleanly from any internal rotation or deformation. For uniform density the integrals reduce to purely geometric averages over volume, area, or length. The same construction therefore supplies the balance point for every symmetric shape once the appropriate coordinate origin and symmetry axes are chosen.

The derivations for the rod, triangle, semicircle and hemisphere are therefore exercises in evaluating three definite integrals (mass, first moment, and, when needed, second moment) while exploiting symmetry to set two coordinates to zero.

> [!NOTE]
> Symmetry alone fixes two of the three coordinates; the remaining integral is then evaluated along the single axis that breaks symmetry, turning a vector problem into a scalar one.

## 2. Why this matters — concrete and current
SpaceX Falcon 9 first-stage recovery requires the vehicle’s centre of mass to lie within 0.3 m of the geometric centre after propellant depletion; otherwise the grid-fin control authority is exceeded and the boost-back burn becomes unstable.  

The James Webb Space Telescope sunshield deployment sequence was validated by placing the observatory’s composite centre of mass on a frictionless air-bearing table; any offset greater than 2 mm produced measurable torque that would have torn the membrane.  

Automotive rollover standards (FMVSS 126) use the static stability factor \(T/(2H_\text{cm})\), where \(H_\text{cm}\) is the height of the centre of mass above the road; small errors in the predicted location change the computed critical lateral acceleration by several percent.  

In granular-media asteroid sampling (OSIRIS-REx TAG manoeuvre), the spacecraft’s centre-of-mass location relative to the contact pad determined the reaction force direction; a 5 cm miscalculation would have produced an unintended tip-over on Bennu’s regolith.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definition of linear momentum \(\mathbf{p}=m\mathbf{v}\) | Centre of mass is defined so that total momentum equals \(M\mathbf{V}_\text{cm}\). |
| Definite integrals over one- and two-dimensional domains | Mass and first-moment calculations are limits of Riemann sums. |
| Even/odd function symmetry | Allows immediate conclusion that the coordinate perpendicular to a symmetry axis is zero. |
| Polar versus Cartesian area elements | Required for circular and hemispherical geometries. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Replace discrete particles by a density function
A collection of point masses has centre of mass \(\mathbf{R}_\text{cm}=\frac{1}{M}\sum m_i\mathbf{r}_i\). For a continuous body the sum becomes an integral weighted by density \(\rho(\mathbf{r})\).

Example: ten equal beads on a wire become a uniform rod of linear density \(\lambda\).

Formal statement:
\[
M=\int\rho\,dV,\qquad\mathbf{R}_\text{cm}=\frac{1}{M}\int\mathbf{r}\rho\,dV.
\]

> [!WARNING]
> Treating density as constant when the object is inhomogeneous produces an offset that grows linearly with the density gradient.

### Step 2 — Exploit symmetry to null two coordinates
Any mass distribution symmetric under reflection through a plane has its centre of mass inside that plane. Two perpendicular symmetry planes therefore fix two coordinates at once.

Example: a uniform rod lying along the x-axis is symmetric under reflection through the yz- and xz-planes; only the x-coordinate survives.

Formal statement: if \(\rho(x,y,z)=\rho(-x,y,z)\) then \(Y_\text{cm}=Z_\text{cm}=0\).

> [!WARNING]
> Forgetting that symmetry must hold for the chosen origin leads to spurious non-zero coordinates that later cancel.

### Step 3 — Reduce the remaining integral to one dimension
After symmetry arguments only a single scalar integral remains. Choose the coordinate axis along the direction that breaks symmetry and express the mass element in that coordinate.

Example: rod of length \(L\) along x, uniform \(\lambda\):
\[
x_\text{cm}=\frac{1}{M}\int_0^L x\lambda\,dx.
\]

Formal statement:
\[
x_\text{cm}=\frac{\int x\,dm}{\int dm}.
\]

> [!WARNING]
> Using an element \(dm\) that is not expressed in the integration variable produces dimensionally inconsistent results.

### Step 4 — Evaluate the rod integral
Substitute \(M=\lambda L\) and integrate:
\[
x_\text{cm}=\frac{\lambda}{M}\int_0^L x\,dx=\frac{L}{2}.
\]

### Step 5 — Extend to area (triangle) and volume (hemisphere)
Repeat the same three integrals but replace \(dm=\lambda dx\) by \(dm=\sigma\,dA\) or \(dm=\rho\,dV\), inserting the appropriate area or volume element and limits dictated by the boundary.

The textbook results appear after these integrals are performed (see §7).

## 5. Worked examples — every step shown

**Example 1 — Uniform rod**  
*Given:* rod of length \(L\), uniform linear density \(\lambda\).  
*Find:* \(x_\text{cm}\).  

\[
M=\int_0^L\lambda\,dx=\lambda L
\]  
*Why:* definition of total mass.  

\[
x_\text{cm}=\frac{1}{M}\int_0^L x\lambda\,dx=\frac{\lambda}{M}\Bigl[\frac{x^2}{2}\Bigr]_0^L=\frac{L}{2}.
\]  
*Why:* antiderivative of \(x\) evaluated at limits.  

**\(x_\text{cm}=L/2\)**  

*Reflection:* symmetry already placed the origin at one end; the factor ½ is therefore inevitable once the integral is recognised as the average of a linear function.

**Example 2 — Solid triangle**  
*Given:* isosceles triangle, base \(b\), height \(h\), uniform areal density \(\sigma\).  
*Find:* distance from base to centroid.  

Place base on x-axis from \(-b/2\) to \(b/2\), apex at \((0,h)\). Width at height y is \(b(1-y/h)\).  

\[
M=\sigma\int_0^h b(1-y/h)\,dy=\frac12\sigma bh.
\]  
*Why:* area of triangle.  

\[
y_\text{cm}=\frac{\sigma}{M}\int_0^h y\cdot b(1-y/h)\,dy=\frac{2}{3}h.
\]  
*Why:* integration by parts or direct antiderivative yields the ⅔ factor from the base.  

**\(y_\text{cm}=h/3\) (from apex) or \(2h/3\) (from base).**  

*Reflection:* the linear taper produces a quadratic integrand whose average is ⅔ of the height.

**Example 3 — Semicircular lamina**  
*Given:* semicircle of radius \(R\), uniform \(\sigma\).  
*Find:* distance from diameter centre.  

Use polar coordinates, \(dm=\sigma r\,dr\,d\theta\), \(\theta\) from \(-\pi/2\) to \(\pi/2\).  

\[
M=\frac12\sigma\pi R^2,\qquad \bar y=\frac{2R}{3\pi}.
\]  
*Why:* \(\int_0^R r^2 dr\) and \(\int_{-\pi/2}^{\pi/2}\sin\theta\,d\theta\) separate.  

**\(\bar y=4R/(3\pi)\).**  

*Reflection:* the extra power of r in the moment integral shifts the result outward from the geometric centre.

**Example 4 — Solid hemisphere**  
*Given:* hemisphere of radius \(R\), uniform \(\rho\).  
*Find:* distance from centre of the sphere along symmetry axis.  

\[
M=\frac23\pi R^3\rho,\qquad z_\text{cm}=\frac38 R.
\]  
*Why:* volume element \(\pi(R^2-z^2)dz\) integrated with weight z.  

**\(z_\text{cm}=3R/8\).**  

*Reflection:* the extra dimension raises the power of the integrand, moving the centre of mass farther from the flat face than the semicircle result.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Placing the origin at the geometric centre before symmetry is confirmed | Students copy textbook diagrams without checking limits | Always verify reflection symmetry about the chosen origin first |
| Using \(dm=\rho\,dx\) for an area integral | Confusing linear with areal density | Write the dimension of each density explicitly before integrating |
| Forgetting the Jacobian in polar coordinates | Treating \(dA=dr\,d\theta\) | Insert \(r\) factor immediately when switching to polar |
| Integrating only to \(R\) instead of the correct boundary for a hemisphere | Misreading the equation of the sphere | Sketch the cross-section and label z-limits before writing the integral |
| Reporting the answer from the flat face instead of the sphere centre | Ambiguous wording of “from the base” | State the reference point in the final boxed answer |
| Treating a hollow hemisphere as solid | Missing the word “solid” in the problem statement | Check whether the object is a shell or a filled volume before choosing the volume element |

## 7. The textbook-precise statement
For a body of volume \(V\) with continuous mass density \(\rho(\mathbf{r})\) the centre-of-mass coordinates are
\[
X_\text{cm}=\frac{1}{M}\iiint_V x\rho\,dV,\qquad
Y_\text{cm}=\frac{1}{M}\iiint_V y\rho\,dV,\qquad
Z_\text{cm}=\frac{1}{M}\iiint_V z\rho\,dV,
\]
where \(M=\iiint_V\rho\,dV\). When \(\rho\) is constant the integrals reduce to purely geometric moments. (See Goldstein, *Classical Mechanics*, 3e, §1.3 and Marsden & Tromba, *Vector Calculus*, 6e, §6.5.)

## 8. Visual — diagram or schematic
```text
z ↑
  |       hemisphere surface
  |     ╱──────────────╲
  |   ╱                  ╲   z_cm = 3R/8
  |  │                    │
  |  │                    │
──┼──●────────────────────●── x,y
  | flat circular face   centre of sphere
```
The diagram shows the symmetry axis z, the flat base in the xy-plane, and the marked location of \(z_\text{cm}\) measured from the sphere’s geometric centre.

## 9. The memory technique
**The hook** — picture a tightrope walker holding a long rod: the centre of mass must sit exactly above the wire; any offset topples the system.  

**What to overlearn** — rod at \(L/2\); triangle at \(h/3\) from apex; semicircle at \(4R/3\pi\); hemisphere at \(3R/8\).  

**Spaced-repetition schedule** — review derivations at 1 day, 3 days, 7 days, 16 days, 35 days.  

**First-principles fallback** — return to \(\mathbf{R}_\text{cm}=\frac1M\int\mathbf{r}\,dm\), choose the single symmetry-breaking axis, insert the correct \(dm\), and integrate.

## 10. What this unlocks
Centre-of-mass locations become the reference points for torque, angular momentum, and stability calculations in rigid-body dynamics.  

- Moment of inertia about an arbitrary axis (parallel-axis theorem)  
- Rocket equation with variable mass and sloshing propellant  
- Collision problems in which linear momentum is conserved about the system centre of mass  
- Attitude-control equations for satellites and upper stages  

## 11. Self-check — five questions, no answers
1. A uniform rod of length \(L\) has one end at \(x=0\). Where is its centre of mass if linear density increases linearly from \(\lambda_0\) at \(x=0\) to \(2\lambda_0\) at \(x=L\)?  
2. Derive the centroid of a right-angled triangle with legs \(a\) and \(b\) along the coordinate axes.  
3. A semicircular wire (not a lamina) has radius \(R\). Show that its centre of mass lies at \(2R/\pi\) from the diameter centre.  
4. Why does the solid-hemisphere result \(3R/8\) lie farther from the flat face than the semicircular-lamina result \(4R/3\pi\)?  
5. An engineer claims that moving 3 % of the mass of a hemisphere from the curved surface to the flat base shifts \(z_\text{cm}\) by less than 1 %. Is the claim consistent with the integral definition?