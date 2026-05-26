## 1. The one-sentence answer
**Mass, centre of mass, and moments of inertia are obtained by integrating a density function and its first- and second-moment weighted versions over a region in two or three dimensions.**

A thin plate (lamina) with varying density \(\rho(x,y)\) has total mass equal to the double integral of \(\rho\) over its area. Shifting each mass element by its distance from a chosen axis produces the first moments; dividing those moments by the total mass locates the balance point called the centre of mass. Squaring the distances instead yields the second moments that quantify resistance to rotation.

The same pattern lifts directly to solids: replace the double integral by a triple integral, and the three coordinates of the centre of mass and the six independent moments of inertia follow at once. All of these quantities are therefore instances of weighted averages expressed through multiple integrals.

> [!NOTE]
> The centre of mass is the *balance point*, not the geometric centroid; the two coincide only when density is constant.

## 2. Why this matters — concrete and current
SpaceX computes the centre of mass and principal moments of inertia of each Falcon 9 stage in real time so that the guidance algorithm can command gimbal angles that keep thrust aligned with the instantaneous mass distribution during ascent.

Semiconductor foundries use finite-element models whose mass and inertia tensors determine vibrational modes of wafer-handling robots; a 0.1 mm shift in predicted centre of mass can produce particle contamination that costs millions per lot.

In protein crystallography, the moments of inertia of a macromolecule about its principal axes are calculated from atomic densities obtained by X-ray diffraction; these tensors enter the rotation-function search that solves the phase problem for structures such as the SARS-CoV-2 spike protein.

Modern game engines (Unreal Engine 5) maintain per-frame inertia tensors for every rigid body so that torque integration produces stable stacking of thousands of objects without visible jitter.

Climate models integrate mass and centre-of-mass motion of ice shelves over Greenland; the resulting inertia changes feed into predictions of Earth’s rotational axis drift at the millimetre level.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Double and triple integrals | All quantities are defined by integration over regions in \(\mathbb{R}^2\) or \(\mathbb{R}^3\). |
| Polar and cylindrical coordinates | Most symmetric laminas and solids are easiest in these systems. |
| First-moment definition in one variable | The multivariable case is the direct extension of \(\bar{x} = \frac{1}{m}\int x\,dm\). |
| Continuous density functions | Mass is no longer length or area once \(\rho\) varies. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Mass as accumulated density
Imagine a wire whose thickness varies along its length. At each point the linear density \(\rho(x)\) tells how much mass sits in an infinitesimal slice. Adding every slice gives the total mass.

For a concrete wire on \([0,1]\) with \(\rho(x)=x+1\), the mass is \(\int_0^1(x+1)\,dx=1.5\).

Formally,
\[
m=\int_C\rho\,ds.
\]

> [!WARNING]
> Treating \(\rho\) as constant when it is not produces an incorrect total mass that cannot be rescued by later corrections.

### Step 2 — First moments locate the balance point
Each mass element \(dm\) at position \(x\) contributes a moment \(x\,dm\) about the origin. Summing and normalising by total mass yields the centre coordinate.

For the same wire the first moment about the origin is \(\int_0^1 x(x+1)\,dx=5/6\), so \(\bar{x}=(5/6)/1.5=5/9\).

Formally,
\[
M_y=\int_C x\rho\,ds,\qquad\bar{x}=M_y/m.
\]

### Step 3 — Extension to a lamina
A flat plate occupies a region \(D\subset\mathbb{R}^2\). Replace the line integral by a double integral; the two first moments become
\[
M_y=\iint_D x\rho(x,y)\,dA,\qquad M_x=\iint_D y\rho(x,y)\,dA.
\]
The centre of mass is then \((\bar{x},\bar{y})=(M_y/m,M_x/m)\).

### Step 4 — Second moments measure rotational resistance
Replace the lever arm by its square. The moment of inertia about the \(z\)-axis (perpendicular to the plate) is
\[
I_z=\iint_D(x^2+y^2)\rho(x,y)\,dA.
\]
Parallel-axis and perpendicular-axis theorems follow at once from this definition.

### Step 5 — Three-dimensional solids
For a solid \(E\subset\mathbb{R}^3\) the mass and moments become triple integrals:
\[
m=\iiint_E\rho\,dV,\qquad I_{xx}=\iiint_E(y^2+z^2)\rho\,dV,
\]
and likewise for the other five independent components of the inertia tensor.

### Step 6 — Variable limits and symmetry
When density or region boundaries break symmetry, the integrals must be written with explicit limits or changed to polar/cylindrical coordinates; symmetry arguments that set certain moments to zero remain valid only after verifying that both \(\rho\) and the domain are symmetric.

### Step 7 — Textbook statement
The definitions above are precisely the statements appearing in standard references once the region and density are given.

## 5. Worked examples — every step shown

**Example 1 — Uniform triangular lamina**  
*Given:* Equilateral triangle of side 2, constant density \(\rho=1\), vertices at \((0,0),(2,0),(1,\sqrt{3})\).  
*Find:* Mass and centre of mass.  

Mass:
\[
m=\iint_D 1\,dA=\text{area}=\sqrt{3}.
\]
*Why:* Density is identically 1, so mass equals area.  

First moment about \(y\):
\[
M_y=\iint_D x\,dA.
\]
By symmetry about \(x=1\) the integral equals \(1\times\sqrt{3}\).  
Thus \(\bar{x}=1\), and likewise \(\bar{y}=\sqrt{3}/3\).  

**Final answer**  
\[
m=\sqrt{3},\qquad(\bar{x},\bar{y})=(1,\sqrt{3}/3).
\]

*Reflection:* Symmetry reduced two integrals to inspection; the same device works for any centrally symmetric uniform body.

**Example 2 — Linear density variation**  
*Given:* Rectangle \([0,1]\times[0,1]\), \(\rho(x,y)=x+y\).  
*Find:* Mass.  

\[
m=\int_0^1\int_0^1(x+y)\,dx\,dy=\int_0^1\Bigl[\tfrac12 x^2+yx\Bigr]_0^1 dy=\int_0^1(\tfrac12+y)\,dy=\tfrac56.
\]
*Why:* Inner integral treats \(y\) as constant; outer integral finishes the accumulation.

**Final answer**  
\[
m=\frac56.
\]

*Reflection:* Order of integration is interchangeable because the integrand is continuous.

**Example 3 — Moment of inertia of a disk**  
*Given:* Disk of radius \(a\), constant density 1.  
*Find:* \(I_z\) about centre.  

Switch to polar:
\[
I_z=\int_0^{2\pi}\int_0^a r^2\cdot r\,dr\,d\theta=2\pi\cdot\frac{a^4}{4}=\frac{\pi a^4}{2}.
\]
*Why:* \(x^2+y^2=r^2\) and \(dA=r\,dr\,d\theta\).

**Final answer**  
\[
I_z=\frac{\pi a^4}{2}.
\]

*Reflection:* Polar coordinates convert the quadratic integrand into a simple power of \(r\).

**Example 4 — Solid hemisphere**  
*Given:* Hemisphere \(x^2+y^2+z^2\le a^2\), \(z\ge0\), density 1.  
*Find:* Centre of mass \(\bar{z}\).  

By symmetry \(\bar{x}=\bar{y}=0\). Mass \(m=\frac23\pi a^3\).  
\[
M_{xy}=\iiint_E z\,dV=\int_0^{2\pi}\int_0^a\int_0^{\sqrt{a^2-r^2}}z\cdot r\,dz\,dr\,d\theta=\frac{\pi a^4}{4}.
\]
Thus
\[
\bar{z}=\frac{3}{8}a.
\]

**Final answer**  
\[
(\bar{x},\bar{y},\bar{z})=(0,0,\frac38 a).
\]

*Reflection:* The upper limit of the \(z\)-integral is the hemisphere equation; forgetting the factor of \(r\) in cylindrical volume would ruin the arithmetic.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using geometric centroid for non-uniform density | Confuses first-moment weighting with area alone | Always keep \(\rho\) inside the integrand for moments |
| Forgetting the Jacobian in polar coordinates | Treats \(dA\) as \(dr\,d\theta\) | Insert \(r\) explicitly before integrating |
| Computing \(I_z\) about the wrong origin | Parallel-axis theorem applied after integration | Decide the reference point before writing the integral |
| Assuming symmetry when density breaks it | Visual symmetry overrides algebraic check | Verify \(\rho(x,y)=\rho(-x,y)\) on the actual domain |
| Mixing mass units with inertia units | Dimensional analysis omitted | Track \(\mathrm{kg}\cdot\mathrm{m}^2\) for every \(I\) |
| Incorrect limits when region is not rectangular | Projecting bounds incorrectly | Sketch the region and project onto each axis in turn |
| Neglecting the factor of 2 when using perpendicular-axis theorem | Forgetting \(I_z=I_x+I_y\) | Write the three moments together and verify consistency |

## 7. The textbook-precise statement
Let \(D\subset\mathbb{R}^2\) be a bounded region and let \(\rho:D\to[0,\infty)\) be continuous. The mass, first moments and moments of inertia of the lamina are
\[
m=\iint_D\rho\,dA,\qquad
M_y=\iint_D x\rho\,dA,\qquad
I_z=\iint_D(x^2+y^2)\rho\,dA.
\]
The centre of mass is \((\bar{x},\bar{y})=(M_y/m,M_x/m)\) provided \(m>0\). The identical statements hold in three dimensions with triple integrals (Stewart, *Calculus*, 9e, §15.5–15.6).

## 8. Visual — diagram or schematic
```text
y
↑
|          C=(x̄,ȳ)
|         •
|        / \
|       /   \
|      /  D  \
|     /_______\
|    0         x
```
Region \(D\) bounded by a closed curve; centre of mass marked inside. Axes labelled; no numerical scale required because the diagram is schematic.

## 9. The memory technique
1. **The hook** — Picture a tiny weight at every point; the centre of mass is the single point where a pencil balances the whole collection, while the moment of inertia is the sum of each weight times the square of its distance from the pivot.
2. **What to overlearn** — \(m=\iiint\rho\,dV\), \(\bar{x}=M_y/m\), \(I_z=\iiint(x^2+y^2)\rho\,dV\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Return to the definition “mass element \(dm=\rho\,dV\)” and rebuild each integral from the single-variable prototype \(\int x\,dm\).

## 10. What this unlocks
These integral definitions supply the mass and inertia tensors required by rigid-body dynamics, orbital mechanics, and finite-element stress analysis. They reappear when the divergence theorem converts volume integrals of moments into surface integrals, when Lagrange’s equations are written for continuous systems, and when the inertia tensor is diagonalised to obtain principal axes.

- Parallel-axis theorem for composite bodies
- Euler’s equations for rigid-body rotation
- Rayleigh–Ritz method in variational mechanics
- Tensor transformation laws under orthogonal change of frame

## 11. Self-check — five questions, no answers
1. A semicircular lamina of radius \(a\) has density proportional to distance from the diameter. Compute its mass and the coordinate \(\bar{y}\).

2. Show that the moment of inertia of a uniform disk about a diameter equals half its moment about the central axis perpendicular to the plane.

3. A solid cube of side length 2 centred at the origin has density \(\rho=x^2+y^2+z^2\). Write (but do not evaluate) the six independent components of the inertia tensor about the origin.

4. Explain why the centre of mass of any body lies inside the convex hull of the body, even when density is negative in some regions (provided total mass remains positive).

5. A thin wire follows the helix \(\mathbf{r}(t)=(\cos t,\sin t,t)\), \(0\le t\le 2\pi\), with constant density. Compute its centre of mass by a single line integral; then verify that the result lies on the axis of the helix.