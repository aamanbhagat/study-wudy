## 1. The one-sentence answer
**A function of several variables maps each point in a multidimensional domain to a single real value, with its graph forming a surface or hypersurface in higher-dimensional space and its level sets revealing constant-value contours.**

A function \(f(x,y)\) takes an ordered pair of real numbers and returns one real number. Its graph therefore lives in three-dimensional space rather than the familiar two-dimensional plane of single-variable calculus. The same idea extends immediately to three or more input variables, though the resulting graph can no longer be drawn on paper.

Level curves and level surfaces supply the practical substitute for the missing dimensions. Instead of plotting height, one draws the curves or surfaces on which the function keeps the same value. These slices encode the entire behavior of \(f\) without ever leaving the plane or three-space that we can visualize.

> [!NOTE]
> The decisive insight is that level sets convert an invisible height dimension into visible geometry: every contour map you have ever seen is simply the graph of a function of two variables drawn via its level curves.

## 2. Why this matters — concrete and current
In computational fluid dynamics, Boeing and Airbus solve the Navier–Stokes equations on three-dimensional grids; pressure and velocity are scalar and vector fields whose level surfaces locate shock waves and stagnation points that determine wing performance.

Machine-learning loss landscapes are functions of millions of variables; level sets of the loss surface guide gradient-descent trajectories, and companies such as OpenAI visualize two-dimensional slices of these surfaces to diagnose training failures.

In semiconductor process control, the thickness of deposited thin films is a function of position on a wafer; level curves of constant thickness are inspected by metrology tools at TSMC and Intel to decide whether a wafer must be reworked.

Seismic imaging companies such as Schlumberger reconstruct subsurface density as a function of three spatial coordinates; level surfaces of constant density delineate oil reservoirs and are the direct output of full-waveform inversion algorithms.

Climate models at NASA GISS treat surface temperature as a function of latitude, longitude and time; level curves of constant temperature anomaly are published each month to communicate the spatial footprint of global warming.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Cartesian plane and 3-space | Supplies the ambient space in which graphs live           |
| Function notation \(f(x)\) | The single-variable case is the direct ancestor           |
| Square roots and domains | Determines where a multivariable function is defined      |
| Contours on topographic maps | Immediate physical model of level curves                  |

## 4. Building the idea — from intuition to formalism

### Step 1 — From one input to two
A single-variable function \(f(x)\) produces a curve in the plane. Replacing the single input by an ordered pair \((x,y)\) forces the output to be plotted above a point in the plane, generating a surface.

Example: \(f(x,y)=x^2+y^2\) returns the squared distance from the origin. At \((1,2)\) the value is 5, so the graph contains the point \((1,2,5)\).

Formal statement:  
$$f:\mathbb{R}^2\to\mathbb{R},\qquad (x,y)\mapsto x^2+y^2.$$

> [!WARNING]
> Treating \((x,y)\) as a single “variable” instead of an ordered pair immediately breaks every subsequent definition of partial derivative or directional derivative.

### Step 2 — The graph in \(\mathbb{R}^3\)
The graph is the set of all points whose third coordinate equals the function value.

Formal statement:  
$$\operatorname{Graph}(f)=\{(x,y,z)\in\mathbb{R}^3:z=f(x,y)\}.$$

### Step 3 — Level curves for two variables
A level curve is the set of all \((x,y)\) where \(f(x,y)\) equals a fixed constant \(c\).

Formal statement:  
$$L_c=\{(x,y)\in D(f):f(x,y)=c\}.$$

### Step 4 — Level surfaces for three variables
When the domain is three-dimensional, the constant set becomes a surface.

Formal statement:  
$$S_c=\{(x,y,z)\in D(f):f(x,y,z)=c\}.$$

### Step 5 — Domain restrictions
Both the graph and the level sets are defined only on the domain of \(f\). Points outside the domain produce neither graph points nor level-set points.

### Step 6 — Textbook definition
A function of \(n\) variables is a rule that assigns to each ordered \(n\)-tuple in a subset \(D\subset\mathbb{R}^n\) a unique real number. Its graph is the subset of \(\mathbb{R}^{n+1}\) consisting of all \((x_1,\dots,x_n,f(\mathbf{x}))\). Level sets are the pre-images \(f^{-1}(c)\).

## 5. Worked examples — every step shown

**Example 1 — Paraboloid graph**  
*Given:* \(f(x,y)=x^2+y^2\).  
*Find:* Three points on the graph and the equation of the level curve for \(c=4\).

- Substitute \((1,0)\): \(f(1,0)=1\), so \((1,0,1)\) lies on the graph.  
  *Why:* Direct evaluation of the defining rule.  
- Substitute \((0,2)\): \(f(0,2)=4\), so \((0,2,4)\) lies on the graph.  
  *Why:* Same rule.  
- Level curve: \(x^2+y^2=4\).  
  *Why:* Set \(f(x,y)=c\) and solve.  

**Final answer**  
Points: \((1,0,1)\), \((0,2,4)\), \((-1,1,2)\); level curve \(x^2+y^2=4\).

*Reflection:* The algebraic step of setting the function equal to \(c\) is identical for every later example; only the number of variables changes.

**Example 2 — Linear level curves**  
*Given:* \(f(x,y)=2x-3y\).  
*Find:* Level curve for \(c=6\).

- Write \(2x-3y=6\).  
  *Why:* Definition of level set.  
- Solve for \(y\): \(y=\frac{2}{3}x-2\).  
  *Why:* Isolate one variable to recognize the line.  

**Final answer**  
The level “curve” is the straight line \(2x-3y=6\).

*Reflection:* Linear functions produce level sets that are hyperplanes; this pattern generalizes to any dimension.

**Example 3 — Level surface**  
*Given:* \(f(x,y,z)=x^2+y^2+z^2\).  
*Find:* Level surface for \(c=9\).

- Set \(x^2+y^2+z^2=9\).  
  *Why:* Definition of level set in three variables.  

**Final answer**  
The sphere of radius 3 centered at the origin.

*Reflection:* The same quadratic form that gave circles in two variables now gives spheres; dimension of the level set is one less than the domain dimension.

**Example 4 — Restricted domain**  
*Given:* \(f(x,y)=\sqrt{1-x^2-y^2}\).  
*Find:* Domain and a level curve inside it.

- Domain: \(1-x^2-y^2\geq0\), i.e., the closed unit disk.  
  *Why:* Argument of square root must be nonnegative.  
- Level curve for \(c=0.5\): \(1-x^2-y^2=0.25\), so \(x^2+y^2=0.75\).  
  *Why:* Solve inside the domain.  

**Final answer**  
Domain = unit disk; level curve = circle of radius \(\sqrt{3}/2\).

*Reflection:* Forgetting the domain produces extraneous points that do not belong to any graph or level set.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Plotting \((x,y,f(x,y))\) outside the domain | Automatic substitution without checking     | Always state \(D(f)\) first                  |
| Confusing level curve with graph  | Both involve the equation \(f=c\)           | Remember level curve lives in the domain plane |
| Treating \(f(x,y,z)=c\) as a surface in 4-D | Miscounting dimensions                      | Count: level set dimension = domain dimension − 1 |
| Drawing contours that cross       | Forgetting single-valuedness                | Verify each \((x,y)\) maps to only one height |
| Ignoring sign changes             | Assuming level sets look the same for \(\pm c\) | Compute both positive and negative levels    |
| Using Cartesian axes for spherical symmetry | Convenience over geometry                   | Switch to cylindrical or spherical coordinates when symmetry suggests it |
| Forgetting that level sets may be empty | Solving \(f=c\) with no real solutions      | Check range before drawing                   |

## 7. The textbook-precise statement
Let \(D\subset\mathbb{R}^n\) be a set and let \(f:D\to\mathbb{R}\). The **graph** of \(f\) is the subset  
$$\Gamma(f)=\{(\mathbf{x},f(\mathbf{x}))\in\mathbb{R}^{n+1}:\mathbf{x}\in D\}.$$  
For each \(c\in\mathbb{R}\) the **level set** of value \(c\) is the pre-image  
$$f^{-1}(c)=\{\mathbf{x}\in D:f(\mathbf{x})=c\}.$$  
When \(n=2\) the level set is called a **level curve**; when \(n=3\) it is called a **level surface**. (See Stewart, *Calculus*, 9e, §14.1.)

## 8. Visual — diagram or schematic
```text
          z
          |
          |   /‾‾‾‾‾\
          |  /       \
          | /  f=4    \
          |/           \
     -----+-------------+----- y
         /|              \
        / |  f=1          \
       /  |                 \
      /   |                  \
     x    |
Level curves projected onto xy-plane:
  Circle radius 1 (c=1), circle radius 2 (c=4)
```
The vertical axis is height \(z=f(x,y)\). Horizontal slices at constant \(z=c\) intersect the surface in circles that are then drawn flat in the \(xy\)-plane as level curves.

## 9. The memory technique

**The hook**  
Picture a mountain whose height is \(f(x,y)\). Slicing the mountain horizontally at height \(c\) yields a closed curve; that curve, dropped onto the map, is the level curve for \(c\).

**What to overlearn**  
- Graph equation: \(z=f(x,y)\).  
- Level-curve equation: \(f(x,y)=c\).  
- Dimension rule: level-set dimension = domain dimension minus one.

**Spaced-repetition schedule**  
Review the three equations above at 1 day, 3 days, 7 days, 16 days, and 35 days.

**First-principles fallback**  
If the definitions blur, return to the single-variable case: replace the horizontal axis by the plane \(\mathbb{R}^2\) and repeat the sentence “height equals function value.”

## 10. What this unlocks
Graphs and level sets are the geometric language in which all subsequent multivariable concepts are stated. Partial derivatives measure slope on the graph; the gradient vector is perpendicular to every level curve or surface; contour integration, Lagrange multipliers, and flux integrals all operate directly on these sets.

- Partial derivatives and the tangent plane  
- Gradient and directional derivatives  
- Lagrange multipliers on level surfaces  
- Flux integrals through level surfaces  
- Implicit-function theorem via level sets  

## 11. Self-check — five questions, no answers
1. Write the domain of \(f(x,y)=\ln(x^2+y^2-1)\) and sketch its level curve for \(c=0\).

2. Does the function \(f(x,y)=x^2-y^2\) have a level curve that is a pair of intersecting lines? If so, give the value of \(c\).

3. A temperature function \(T(x,y,z)\) has level surface \(T=37\) that is a sphere of radius 2. What is the dimension of the set of points where \(T=37.5\)?

4. Explain why the level curves of \(f(x,y)=e^{x+y}\) can never intersect.

5. Construct a function of three variables whose level surface for \(c=1\) is the cylinder \(x^2+y^2=1\).