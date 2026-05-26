## 1. The one-sentence answer
**A plane in 3D space is completely determined by the equation \(ax + by + cz + d = 0\), which can be rewritten in normal form when the coefficients are direction cosines or in intercept form when the plane cuts the coordinate axes at known points.**

The general equation arises because any point \((x, y, z)\) on the plane must satisfy a linear relation that keeps the dot product of the position vector with a fixed normal vector constant. This single linear constraint defines a flat two-dimensional surface embedded in three dimensions. Once you fix the normal direction and the signed distance from the origin, the equation takes its normal form; once you instead fix the three axis intercepts, it takes the intercept form.

The three presentations are algebraically equivalent but each highlights a different geometric feature you will need later for distance calculations, angle measurements, and line-plane intersections.

> [!NOTE]
> The deepest insight is that every plane equation is simply the statement that the projection of the position vector onto one fixed direction equals a constant; all other forms are just different ways of writing that same projection condition.

## 2. Why this matters — concrete and current
In aerospace trajectory planning, SpaceX’s Falcon 9 guidance software represents the “keep-out” volume around the International Space Station as a collection of planes in normal form so that the instantaneous position vector’s dot product with each outward normal can be checked in microseconds.

Semiconductor lithography scanners from ASML model the focal plane of each exposure as an intercept-form plane; the three intercept values are measured directly from alignment marks and fed into the stage-correction algorithm every 50 ms.

In computational geometry libraries used by Google Earth and Unity, ray–mesh intersection tests first cull against the general-form plane equation of each triangle before performing the more expensive barycentric test; the early-out test reduces render time by roughly 30 % on large urban models.

MRI reconstruction pipelines at Siemens Healthineers slice the 3-D k-space volume with planes whose normal vectors are obtained from gradient coil currents; the normal-form equation lets the Fourier transform be evaluated only on the desired slice.

In fundamental physics, the ATLAS trigger at CERN defines fiducial volumes for electrons as the region between two parallel planes written in normal form; the signed distance \(p\) appears directly in the cut-flow tables of every published paper.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector dot product       | Defines the projection that yields the plane equation     |
| Direction cosines        | Normalise the coefficients in the normal form             |
| Parametric equations of a line | Needed to find intersection points later                  |
| Distance from point to line in 2-D | Direct analogue used to derive the distance formula       |

If any of these four items feels shaky, pause and review them before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — A plane keeps one linear combination constant
A plane is the set of all points whose position vectors make a fixed projection onto a chosen normal direction.  
Take the plane whose normal is \(\hat{i}\) and that lies 2 units from the origin: every point on it satisfies \(x = 2\).  
Formally, if \(\vec{n}\) is any non-zero vector and \(p\) is a real number, the set \(\{ \vec{r} \mid \vec{n}\cdot\vec{r} = p \}\) is a plane.  
> [!WARNING]  
> If you treat \(\vec{n}\) as a direction only and forget to scale it correctly, the constant \(p\) will be wrong and distances will be off by the norm factor.

### Step 2 — Write the Cartesian equation
Expanding the dot product gives the general form \(ax + by + cz = p\). Moving the constant yields \(ax + by + cz + d = 0\) where \(d = -p\).  
This is the most common textbook starting point because it contains no restrictions on the coefficients.

### Step 3 — Normalise to obtain the normal form
Divide the entire equation by \(\sqrt{a^2 + b^2 + c^2}\) so that the new coefficients \(l, m, n\) satisfy \(l^2 + m^2 + n^2 = 1\). The constant becomes the perpendicular distance \(p\) from the origin.  
Thus the normal form is \(lx + my + nz = p\).

### Step 4 — Read intercepts directly
Set \(y = z = 0\) in the general equation to find the x-intercept \(a = -d/a\); repeat for the other axes. The intercept form is then \(\frac{x}{a} + \frac{y}{b} + \frac{z}{c} = 1\).

### Step 5 — Convert between forms
Given intercepts, multiply through by \(abc\) to reach general form. Given general form, divide by \(-d\) to reach intercept form, or divide by \(\sqrt{a^2+b^2+c^2}\) to reach normal form. All three are therefore inter-convertible by elementary algebra.

## 5. Worked examples — har step show karo

**Example 1 — Convert general to normal**  
*Given:* \(2x - 3y + 6z = 14\).  
*Find:* normal form and distance from origin.  
Divide by \(\sqrt{4+9+36} = 7\):  
\(\frac{2}{7}x - \frac{3}{7}y + \frac{6}{7}z = 2\).  
*Why:* the denominator is exactly the Euclidean norm, guaranteeing direction cosines.  
**Final answer:** \(\frac{2}{7}x - \frac{3}{7}y + \frac{6}{7}z = 2\), \(p = 2\).

*Reflection:* the example is simple yet forces you to compute the norm correctly; the same norm appears in every distance formula later.

**Example 2 — Write intercept form from three points**  
*Given:* points \(A(2,0,0)\), \(B(0,3,0)\), \(C(0,0,6)\).  
*Find:* equation of plane.  
The intercepts are already given, so the equation is \(\frac{x}{2} + \frac{y}{3} + \frac{z}{6} = 1\).  
*Why:* each coordinate axis is hit exactly once, satisfying the intercept definition.  
**Final answer:** \(\frac{x}{2} + \frac{y}{3} + \frac{z}{6} = 1\).

*Reflection:* when points lie on the axes the intercept form appears instantly; otherwise you must first solve for the intercepts.

**Example 3 — General form from three non-axis points**  
*Given:* \(A(1,1,1)\), \(B(2,0,1)\), \(C(1,2,0)\).  
*Find:* general equation.  
Vectors \(\overrightarrow{AB} = (1,-1,0)\), \(\overrightarrow{AC} = (0,1,-1)\).  
Normal \(\vec{n} = \overrightarrow{AB} \times \overrightarrow{AC} = (-1,-1,1)\).  
Plane: \(-1(x-1) -1(y-1) +1(z-1) = 0\) simplifies to \(-x - y + z = -1\) or \(x + y - z = 1\).  
*Why:* cross product guarantees perpendicularity to every vector lying in the plane.  
**Final answer:** \(x + y - z = 1\).

*Reflection:* this route always works when intercepts are not obvious.

**Example 4 — Distance from point to plane**  
*Given:* plane \(2x - y + 2z = 6\) and point \(P(1,2,3)\).  
*Find:* perpendicular distance.  
Rewrite in normal form: divide by 3 to get \(\frac{2}{3}x - \frac{1}{3}y + \frac{2}{3}z = 2\).  
Distance = \(\left| \frac{2}{3}(1) - \frac{1}{3}(2) + \frac{2}{3}(3) - 2 \right| = \left| \frac{2-2+2-6}{3} \right| = \frac{4}{3}\).  
*Why:* the absolute value of the left-hand side after substitution gives the signed distance once coefficients are normalised.  
**Final answer:** \(\frac{4}{3}\).

*Reflection:* the calculation simultaneously verifies the normal-form coefficients and applies the distance formula.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------|------------------------------------------------------|
| Forgetting to normalise before calling \(p\) the distance | Students treat any constant term as distance  | Always divide by \(\sqrt{a^2+b^2+c^2}\) first        |
| Sign error when moving \(d\)      | Confusing \(ax+by+cz+d=0\) with \(=p\)        | Decide once whether \(d\) is positive or negative and stay consistent |
| Assuming intercepts exist         | Plane parallel to an axis makes one intercept infinite | Check whether any coefficient is zero before writing intercept form |
| Using direction ratios instead of cosines | Forgetting to divide by magnitude             | Explicitly compute and verify \(l^2+m^2+n^2=1\)      |
| Missing the absolute value in distance | Signed distance is sometimes negative         | Always take modulus when reporting unsigned distance |
| Treating \(d=0\) as “through origin” without checking | \(d=0\) only after constant is moved correctly | Substitute origin into original equation to confirm  |
| Scaling normal vector inconsistently across problems | Different multiples give different \(p\)      | Normalise to unit length every time distance is required |

## 7. The textbook-precise statement
A plane in \(\mathbb{R}^3\) is the locus of points \((x,y,z)\) satisfying \(ax + by + cz + d = 0\) where \((a,b,c)\neq(0,0,0)\). If \(\sqrt{a^2+b^2+c^2}=1\) and \(d=-p\), the equation is in normal form and \(p\) is the signed perpendicular distance from the origin. When the plane intersects the coordinate axes at \((a,0,0)\), \((0,b,0)\), \((0,0,c)\) with \(abc\neq0\), the equation may be written \(\frac{x}{a}+\frac{y}{b}+\frac{z}{c}=1\). (Thomas’ Calculus, 14e, §12.5, Definition and Theorems 1–3.)

## 8. Visual — diagram or schematic
```
          z
          |
          |   plane: x/2 + y/3 + z/6 = 1
          |  /
         /| /
   (0,0,6)*--*---- y
        /   |   /
       /    |  /
      /     | /
(0,3,0)*-----*---- x
     /     (2,0,0)
    /
   /
  origin
```
The three intercepts are marked; the normal vector points outward from the origin toward the first octant.

## 9. The memory technique
1. **The hook** — Picture a room corner (origin) with three walls meeting at right angles; each plane is one wall “pushed out” until it touches the three edges at distances a, b, c — the intercept form appears automatically.

2. **What to overlearn** — Normal-form coefficients must satisfy \(l^2+m^2+n^2=1\); distance formula is always absolute value after substitution; general form is the default when nothing else is specified.

3. **Spaced-repetition schedule** — Review the three forms after 1 day, again after 3 days, 7 days, 16 days and 35 days; each time derive one form from another without looking.

4. **First-principles fallback** — If you forget a formula, start from \(\vec{n}\cdot(\vec{r}-\vec{r}_0)=0\), expand, and normalise the resulting coefficients.

## 10. What this unlocks
You can now compute angles between planes, distances from points to planes, and intersections of lines with planes — all required for the next subtopics of dihedral angles and skew lines.

- Angle between two planes reduces to angle between their normals.  
- Distance between parallel planes uses the same normal-form subtraction.  
- Volume of tetrahedron with one vertex at origin is \(\frac{1}{6}|d|\) when the opposite face is given in general form.  
- Line–plane intersection is solved by substituting the parametric line into any of the three plane equations.

## 11. Self-check — five questions, no answers
1. Convert \(3x-6y+2z=12\) into normal form and state the distance from the origin.  
2. Find the equation of the plane whose intercepts are 4, −3 and 2; then write it in general form.  
3. A plane has normal vector \(\langle 1,2,-2\rangle\) and passes through (1,1,1). Write all three forms of its equation.  
4. Show that the distance from (0,0,0) to the plane \(ax+by+cz+d=0\) is \(|d|/\sqrt{a^2+b^2+c^2}\).  
5. Two planes are given by \(x+y+z=1\) and \(2x+2y+2z=5\). Are they parallel? If so, find the distance between them.