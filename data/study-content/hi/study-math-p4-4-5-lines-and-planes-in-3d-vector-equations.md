## 1. The one-sentence answer
**A line or plane in 3D is completely described by a single point together with one or more direction vectors, giving the vector equation \(\mathbf{r}=\mathbf{r}_0+t\mathbf{d}\) for a line and \(\mathbf{r}=\mathbf{r}_0+s\mathbf{u}+t\mathbf{v}\) for a plane.**

Iska matlab yeh hai ki aapko sirf ek anchor point aur direction(s) chahiye; baaki sab parametric scaling se ban jaata hai. Position vector \(\mathbf{r}\) har allowed point ko sweep karta hai jab scalars \(t,s\) vary karte hain. Is approach se aap algebraic equations ki bajaye geometry ko directly vector space ke andar handle kar sakte ho.

> [!NOTE]
> The single most important “aha” is that both lines and planes are affine subspaces: they are translates of linear subspaces, so their equations always contain a constant vector \(\mathbf{r}_0\) that shifts the origin.

## 2. Why this matters — concrete and current
In aerospace trajectory planning, SpaceX uses vector equations of lines to generate instantaneous thrust directions for Falcon 9 boost-back burns; the direction vector \(\mathbf{d}\) is updated every 100 ms from telemetry.

In semiconductor lithography, ASML’s EUV scanners model the focal plane of the reticle as a plane whose normal vector must stay within 0.1 mrad of the optical axis; any deviation is corrected by solving the plane equation in real time.

In robotics, Boston Dynamics’ Atlas robot represents each limb segment as a line segment whose parametric equation feeds directly into the inverse-kinematics solver, allowing collision checks against planar surfaces such as stairs.

In cryo-EM structure determination at laboratories such as the MRC Laboratory of Molecular Biology, 3-D reconstruction begins by fitting planes to local patches of particle images; the normal vectors become the initial orientation estimates before refinement.

In computational geometry libraries used by NVIDIA, ray–plane intersection tests (core of OptiX) are written exactly as the vector equation of the plane set to zero, enabling hardware-accelerated visibility computations for real-time rendering.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Vector addition & scalar multiplication | To build the parametric expressions \(\mathbf{r}_0 + t\mathbf{d}\) |
| Dot product              | To obtain the normal-vector form of a plane               |
| Linear independence      | To guarantee that two direction vectors truly span a plane|
| Solving 2×2 and 3×3 linear systems | To find intersection points of lines and planes           |

Agar aap inme se koi bhi concept shaky feel kar rahe ho, pause karke Linear Algebra ke corresponding section pehle complete kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — A point plus one free scalar gives a line
Ek fixed point \(\mathbf{r}_0\) se shuru karo aur ek direction vector \(\mathbf{d}\) lo; jab scalar \(t\) badlega, point us direction mein slide karega.  
Example: \(\mathbf{r}_0=(1,0,0)\), \(\mathbf{d}=(0,1,0)\) → points (1,t,0) banenge.  
Formal statement:  
$$ \mathbf{r}(t)=\mathbf{r}_0+t\mathbf{d},\qquad t\in\mathbb{R}. $$  
> [!WARNING] Agar \(\mathbf{d}=\mathbf{0}\) ho to equation sirf ek point deta hai; line nahi banti.

### Step 2 — Two independent directions give a plane
Ab do linearly independent vectors \(\mathbf{u},\mathbf{v}\) lo. Unke linear combinations ek plane span karte hain, lekin origin shift karna padta hai.  
Formal statement:  
$$ \mathbf{r}(s,t)=\mathbf{r}_0+s\mathbf{u}+t\mathbf{v},\qquad s,t\in\mathbb{R}. $$

### Step 3 — Normal vector form via dot product
Plane ke har point \(\mathbf{r}\) ke liye \((\mathbf{r}-\mathbf{r}_0)\) plane ke andar lie karta hai, isliye normal \(\mathbf{n}\) se perpendicular hona chahiye.  
$$ \mathbf{n}\cdot(\mathbf{r}-\mathbf{r}_0)=0. $$

### Step 4 — Converting between parametric and Cartesian forms
Parametric equations se direction vectors nikaal kar cross product se normal nikaal sakte ho, aur vice-versa.  
Agar plane \(ax+by+cz=d\) diya ho to normal \(\mathbf{n}=(a,b,c)\) hota hai.

### Step 5 — Intersection conditions
Line-plane intersection ke liye parametric line ko plane equation mein daal kar scalar solve karo. Agar denominator zero ho to line parallel hai plane ke.

### Step 6 — Two planes intersect in a line (when not parallel)
Dono planes ke normals linearly independent hone chahiye; intersection line ka direction vector un normals ka cross product hota hai.

### Step 7 — Textbook-grade vector equation of a line through two points
Diye gaye points \(\mathbf{P}\) aur \(\mathbf{Q}\) ke liye direction \(\mathbf{d}=\mathbf{Q}-\mathbf{P}\), isliye  
$$ \mathbf{r}=\mathbf{P}+t(\mathbf{Q}-\mathbf{P}). $$

## 5. Worked examples — har step show karo

**Example 1 — Line through two points**  
*Given:* Points \(A=(1,2,3)\) aur \(B=(4,0,6)\).  
*Find:* Vector equation of the line.  
Step 1: Direction vector \(\mathbf{d}=B-A=(3,-2,3)\) calculate karo.  
*Why:* Subtracting position vectors gives the required direction.  
Step 2: Parametric form likho \(\mathbf{r}=(1,2,3)+t(3,-2,3)\).  
**Final answer**  
$$\mathbf{r}=(1,2,3)+t(3,-2,3).$$  
*Reflection:* Simple subtraction trick works for any two distinct points; generalises directly to higher dimensions.

**Example 2 — Plane through three points**  
*Given:* \(P_1=(0,0,0)\), \(P_2=(1,0,0)\), \(P_3=(0,1,0)\).  
*Find:* Vector equation.  
Step 1: Vectors \(\mathbf{u}=P_2-P_1=(1,0,0)\), \(\mathbf{v}=P_3-P_1=(0,1,0)\).  
*Why:* These two vectors lie inside the plane.  
Step 2: Check linear independence (cross product nonzero).  
Step 3: Write \(\mathbf{r}=s(1,0,0)+t(0,1,0)\).  
**Final answer**  
$$\mathbf{r}=s\mathbf{i}+t\mathbf{j}.$$  
*Reflection:* Origin already on plane, so constant term vanished; always verify independence first.

**Example 3 — Normal form from parametric**  
*Given:* Plane \(\mathbf{r}=(1,1,1)+s(2,0,1)+t(0,3,1)\).  
*Find:* Cartesian equation.  
Step 1: Normal \(\mathbf{n}=(2,0,1)\times(0,3,1)=( -3,-2,6 )\).  
*Why:* Cross product yields vector perpendicular to both directions.  
Step 2: Plug into dot-product equation: \(-3(x-1)-2(y-1)+6(z-1)=0\).  
**Final answer**  
$$-3x-2y+6z= -1.$$  
*Reflection:* Sign of normal can be flipped; equation remains equivalent.

**Example 4 — Line-plane intersection**  
*Given:* Line \(\mathbf{r}=(0,0,0)+t(1,1,1)\) aur plane \(x+y+z=3\).  
*Find:* Intersection point.  
Step 1: Substitute: \(t+t+t=3\) → \(3t=3\).  
*Why:* Dot product of direction with normal gives denominator.  
Step 2: \(t=1\), point \((1,1,1)\).  
**Final answer**  
Intersection at \((1,1,1)\).  
*Reflection:* When \(3t=3\) has unique solution, line pierces plane at one point.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Taking \(\mathbf{d}=\mathbf{0}\) for a line | Forgetting that direction must be nonzero   | Always verify \(\|\mathbf{d}\|>0\)           |
| Using two parallel vectors for a plane | Students pick collinear directions          | Compute cross product; must be nonzero       |
| Forgetting the constant term \(\mathbf{r}_0\) | Treating everything as subspaces through origin | Always anchor with one known point           |
| Division by zero in intersection  | Parallel case ignored                       | Check \(\mathbf{d}\cdot\mathbf{n}=0\) first  |
| Sign errors in normal vector      | Cross-product order swapped                 | Keep consistent ordering or flip both sides  |
| Assuming unique intersection when two planes given | Missing parallel or coincident cases        | Compare normals and constant terms separately|
| Writing parametric equations without parameter domain | Implicitly restricting \(t\) to positive    | State \(t\in\mathbb{R}\) explicitly          |

## 7. The textbook-precise statement
A line in \(\mathbb{R}^3\) is the set  
$$\{\mathbf{r}_0+t\mathbf{d}\mid t\in\mathbb{R}\}$$  
where \(\mathbf{r}_0\in\mathbb{R}^3\) and \(\mathbf{d}\neq\mathbf{0}\).  

A plane is the set  
$$\{\mathbf{r}_0+s\mathbf{u}+t\mathbf{v}\mid s,t\in\mathbb{R}\}$$  
where \(\mathbf{u},\mathbf{v}\) are linearly independent. Equivalently, if \(\mathbf{n}\neq\mathbf{0}\), the plane may be written  
$$\{\mathbf{r}\mid\mathbf{n}\cdot(\mathbf{r}-\mathbf{r}_0)=0\}.$$  

(See Strang, *Introduction to Linear Algebra*, 5e, §2.5, “Parametric equations of lines and planes”.)

## 8. Visual — diagram or schematic
```
z
↑
|     plane: r = r0 + s u + t v
|    /
|   /  normal n
|  /↗
| /  
|/____→ y
r0 ---- line: r = r0 + t d
   \
    \
     x
```
Axes labelled; line shown as dashed arrow from r0 along d; plane shown as parallelogram spanned by u and v with normal arrow n.

## 9. The memory technique

**The hook**  
Picture a kite (plane) whose tail (line) is tied at a single point r0; the kite can slide along two strings (u and v) while the tail stretches in one direction (d).

**What to overlearn**  
1. \(\mathbf{r}=\mathbf{r}_0+t\mathbf{d}\) (line)  
2. \(\mathbf{n}\cdot(\mathbf{r}-\mathbf{r}_0)=0\) (plane)  
3. Direction of intersection line = \(\mathbf{n}_1\times\mathbf{n}_2\)

**Spaced-repetition schedule**  
Review after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Agar formula bhool jaaye to: (i) pick any point on the object, (ii) collect all allowed displacement vectors, (iii) write linear combinations with free scalars.

## 10. What this unlocks
Mastery of these equations lets you move directly into distance formulas, orthogonal projections, least-squares fitting of planes to point clouds, and the full machinery of affine geometry used in computer graphics and robotics.

- Ray–triangle intersection tests in rendering pipelines  
- Singular-value decomposition for best-fit planes  
- Homogeneous coordinates and projective transformations  
- Linear programming feasible regions in 3-D  

## 11. Self-check — five questions, no answers
1. Write the vector equation of the line passing through (2,−1,4) and parallel to (1,1,1).  
2. Find the Cartesian equation of the plane containing (0,0,0), (2,1,0) and (0,3,1).  
3. Determine whether the line \(\mathbf{r}=(1,2,3)+t(1,0,1)\) lies inside the plane \(x+z=4\).  
4. Compute the line of intersection of the planes \(x+y+z=1\) and \(x-y+z=2\).  
5. Given three points, show that the two direction vectors you form are linearly independent if and only if the three points are not collinear.