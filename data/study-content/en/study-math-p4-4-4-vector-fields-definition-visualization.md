## 1. The one-sentence answer

**A vector field on a domain \(D\) is a function that assigns a vector to every point of \(D\).**

In ordinary single-variable calculus a function takes a number and returns a number; here the input is a point in the plane or in space and the output is a directed arrow whose length and direction both matter. The simplest mental picture is wind: at every location on a map you draw an arrow whose length shows speed and whose direction shows where the air is moving. Once you accept that each point carries its own independent vector, every later construction—line integrals, flux, curl, divergence—follows by treating those arrows as raw material.

The same idea scales without change from two dimensions to three or more; only the number of components in each vector increases. The arrows may represent velocity, force, electric field, or any other quantity that has both size and direction at each location.

> [!NOTE]
> The decisive shift is from “one vector for the whole region” to “a separate vector living at each individual point”; once that local assignment is clear, visualization and calculation become mechanical.

## 2. Why this matters — concrete and current

NASA’s Earth Science Division uses global wind vector fields derived from scatterometer satellites to initialize hurricane track models; each grid point carries a two-dimensional velocity vector updated every six hours.

Semiconductor manufacturers solve Poisson’s equation for electrostatic potential inside transistors and then recover the electric field as the negative gradient; the resulting three-dimensional vector field determines electron trajectories and leakage current.

Modern diffusion MRI reconstructs white-matter tracts by fitting a vector field of water-diffusion directions at every voxel; tractography algorithms integrate that field to produce the fiber bundles visible in neurosurgical planning software.

Aerodynamic design at Boeing relies on Reynolds-averaged Navier–Stokes solvers that output velocity vector fields over an entire aircraft surface; pressure gradients and lift are then computed directly from those fields.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Cartesian vectors and components | Vector fields are assembled component-wise.               |
| Functions of several variables | The input is a point \((x,y)\) or \((x,y,z)\).            |
| Parametric curves              | Streamlines are curves whose tangent matches the field.   |
| Partial derivatives            | Needed later for divergence and curl, but not for definition. |

## 4. Building the idea — from intuition to formalism

### Step 1 — From scalar output to vector output
A scalar function returns a single number; a vector field returns an ordered tuple that we interpret as an arrow.  
Example: temperature at a point is a scalar; wind velocity at the same point is a vector.  
Formally, replace the codomain \(\mathbb{R}\) by \(\mathbb{R}^n\).

> [!WARNING]
> Treating the output as a single number instead of a tuple collapses direction information and makes every subsequent operation undefined.

### Step 2 — Domain is a set of points, not an interval
The input is any point \((x,y)\) inside a region \(D\subset\mathbb{R}^2\) (or \(\mathbb{R}^3\)).  
Concrete case: let \(D\) be the unit disk; at each \((x,y)\) inside it we will later attach a vector.

### Step 3 — Component functions
Write the vector at \((x,y)\) as \(\langle P(x,y),Q(x,y)\rangle\).  
Each of \(P\) and \(Q\) is an ordinary scalar function of two variables.  
Thus the field is completely determined once its two (or three) component functions are given.

### Step 4 — Notation
The standard shorthand is \(\mathbf{F}(x,y)=P(x,y)\mathbf{i}+Q(x,y)\mathbf{j}\).  
In three dimensions a third component \(R(x,y,z)\) appears.

### Step 5 — Geometric representation
At a sample point \((x_0,y_0)\) draw the arrow whose tail sits at \((x_0,y_0)\) and whose head is displaced by the vector \(\langle P(x_0,y_0),Q(x_0,y_0)\rangle\).  
Scale the arrow length proportionally to \(\|\mathbf{F}\|\) or normalize when only direction matters.

### Step 6 — Formal definition
Let \(D\subset\mathbb{R}^n\) be open. A **vector field** on \(D\) is a continuous map \(\mathbf{F}:D\to\mathbb{R}^n\).

## 5. Worked examples — every step shown

**Example 1 — Constant field**  
*Given:* \(\mathbf{F}(x,y)=\langle 3,1\rangle\) everywhere.  
*Find:* Vectors at \((0,0)\) and \((1,2)\).  
Step 1: The component functions are the constants \(P=3\), \(Q=1\).  
*Why:* No dependence on \((x,y)\) appears.  
Step 2: At \((0,0)\) the vector is \(\langle 3,1\rangle\).  
*Why:* Direct substitution.  
Step 3: At \((1,2)\) the vector is again \(\langle 3,1\rangle\).  
*Why:* Constants ignore coordinates.  
**Final answer**  
\(\mathbf{F}(0,0)=\langle 3,1\rangle\), \(\mathbf{F}(1,2)=\langle 3,1\rangle\).

*Reflection:* Constant fields produce identical parallel arrows; any variation must come from non-constant components.

**Example 2 — Radial field**  
*Given:* \(\mathbf{F}(x,y)=\langle x,y\rangle\).  
*Find:* Vectors at four points on the unit circle.  
Step 1: \(P=x\), \(Q=y\).  
*Why:* Read components directly from the given expression.  
Step 2: At \((1,0)\) we obtain \(\langle 1,0\rangle\).  
*Why:* Substitute coordinates.  
Step 3: At \((0,1)\) we obtain \(\langle 0,1\rangle\).  
Step 4: At \((-1,0)\) we obtain \(\langle -1,0\rangle\).  
Step 5: At \((0,-1)\) we obtain \(\langle 0,-1\rangle\).  
**Final answer**  
Arrows point outward, length 1 at each listed point.

*Reflection:* The field is everywhere normal to circles centered at the origin; magnitude equals distance from origin.

**Example 3 — Identify components from description**  
*Given:* “At each point the vector equals twice the position vector rotated 90° counterclockwise.”  
*Find:* Component functions.  
Step 1: Position vector \(\langle x,y\rangle\).  
*Why:* Standard identification.  
Step 2: 90° counterclockwise rotation yields \(\langle -y,x\rangle\).  
*Why:* Rotation matrix applied to \(\langle x,y\rangle\).  
Step 3: Multiply by 2: \(\langle -2y,2x\rangle\).  
**Final answer**  
\(P=-2y\), \(Q=2x\).

*Reflection:* Algebraic manipulation of vectors precedes writing the field formula.

**Example 4 — Three-dimensional field**  
*Given:* \(\mathbf{F}(x,y,z)=\langle yz,xz,xy\rangle\).  
*Find:* Vector at \((1,2,3)\).  
Step 1: Substitute into each component.  
*Why:* Direct evaluation.  
Step 2: \(P=2\cdot3=6\), \(Q=1\cdot3=3\), \(R=1\cdot2=2\).  
**Final answer**  
\(\mathbf{F}(1,2,3)=\langle 6,3,2\rangle\).

*Reflection:* The procedure is identical in higher dimensions; only the number of components grows.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                | How to avoid it                              |
|-----------------------------------|-----------------------------------------------|----------------------------------------------|
| Drawing arrows with tails not at the point | Habit from free-vector diagrams               | Always place tail exactly at the evaluation point |
| Writing \(\mathbf{F}(x,y)\) as a single expression without components | Confusing with scalar functions               | Explicitly list \(P\), \(Q\), \(R\)           |
| Treating a vector field as a curve | Mixing parametric representations with fields | Remember: field gives one vector per point, curve gives one point per parameter |
| Forgetting that magnitude is part of the data | Focusing only on direction                    | Compute \(\|\mathbf{F}\|\) at sample points   |
| Using the same symbol for position and vector | Notation collision                            | Distinguish \(\mathbf{r}\) from \(\mathbf{F}(\mathbf{r})\) |
| Assuming the field is defined at every point in \(\mathbb{R}^n\) | Overlooking singularities (e.g., \(1/r^2\))   | Check the stated domain before plotting      |
| Scaling arrows inconsistently when sketching | Visual clutter                                | Choose a uniform scale factor once per figure |

## 7. The textbook-precise statement

Let \(D\) be an open subset of \(\mathbb{R}^n\). A **vector field** on \(D\) is a continuous function \(\mathbf{F}:D\to\mathbb{R}^n\). In coordinates,
\[
\mathbf{F}(x_1,\dots,x_n)=\bigl(P_1(x_1,\dots,x_n),\dots,P_n(x_1,\dots,x_n)\bigr),
\]
where each \(P_i\) is continuous on \(D\). (Stewart, *Calculus*, 9e, §16.1.)

## 8. Visual — diagram or schematic

```text
y
↑
|     →     →     →
|        ↗   ↗   ↗
|     →    →    →
|        ↗   ↗   ↗
|     →    →    →
+--------------------→ x
```
Each arrow’s tail sits at a lattice point; length and direction are determined by \(\mathbf{F}(x,y)=\langle y,-x\rangle/10\) (scaled for visibility). Horizontal spacing = 1, vertical spacing = 1.

## 9. The memory technique

**The hook**  
Picture a field of wheat: every stalk is an arrow rooted at its own spot; wind bends each stalk independently.

**What to overlearn**  
- \(\mathbf{F}(x,y)=P(x,y)\mathbf{i}+Q(x,y)\mathbf{j}\)  
- Domain \(D\) must be stated; components must be continuous on \(D\).

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Rebuild by (i) choosing any point, (ii) writing the vector you want there, (iii) letting the coordinates of the point become the arguments of the component functions.

## 10. What this unlocks

Vector fields are the raw data for every integral theorem in multivariable calculus.  
- Line integrals \(\int_C\mathbf{F}\cdot d\mathbf{r}\) measure work along a path.  
- Surface integrals of flux \(\iint_S\mathbf{F}\cdot d\mathbf{S}\) quantify net flow.  
- The operators \(\nabla\cdot\mathbf{F}\) and \(\nabla\times\mathbf{F}\) are defined pointwise on the field.  
- Green’s, Stokes’, and the Divergence theorems relate these integrals to properties of the field inside regions.

## 11. Self-check — five questions, no answers

1. Write the component functions of the vector field that at each point equals the position vector rotated 90° clockwise and scaled by the distance to the origin.  
2. Sketch the vector field \(\mathbf{F}(x,y)=\langle 1,x\rangle\) on the square \([-1,1]\times[-1,1]\) using at least nine arrows.  
3. Does the expression \(\mathbf{F}(x,y)=\langle x/y,y/x\rangle\) define a vector field on the entire plane? Explain.  
4. A velocity field for rigid-body rotation about the z-axis is \(\mathbf{F}(x,y,z)=\langle -y,x,0\rangle\). Compute \(\mathbf{F}\) at the four points \((\pm1,0,0)\) and \((0,\pm1,0)\).  
5. Suppose two different pairs of component functions agree at every point of a domain; must the vector fields be identical? Why or why not?