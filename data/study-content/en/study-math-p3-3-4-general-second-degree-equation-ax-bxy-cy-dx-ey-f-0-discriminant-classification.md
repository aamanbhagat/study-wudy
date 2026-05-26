## 1. The one-sentence answer
**The sign of the discriminant \(B^2-4AC\) in the equation \(Ax^2+Bxy+Cy^2+Dx+Ey+F=0\) determines whether the curve is an ellipse, parabola or hyperbola, after separate verification that the conic is non-degenerate.**

The equation collects every possible quadratic curve in the plane into one algebraic object. The quadratic terms alone decide the global shape because they dominate at large distances; the linear and constant terms merely translate or scale the curve without changing its type. The cross term \(Bxy\) tilts the axes, yet a rotation can always remove it, and the quantity \(B^2-4AC\) remains unchanged under that rotation. Consequently the sign of this single combination classifies the curve.

Degenerate cases arise when the quadratic form factors or the whole expression factors into linear terms; these produce points, lines or nothing, but the same discriminant still governs the underlying type before degeneracy is checked.

> [!NOTE]
> The classification is decided entirely by the quadratic part; translation and rotation never alter the sign of \(B^2-4AC\).

## 2. Why this matters — concrete and current
In orbital mechanics, SpaceX’s trajectory-planning software fits radar and GPS data to the general conic equation; the discriminant instantly tells the guidance computer whether the vehicle is on an elliptical transfer orbit, a parabolic escape trajectory or a hyperbolic fly-by, allowing the same fitting routine to serve every mission profile without separate code branches.

Semiconductor mask writers at ASML use the same test when approximating curved features on photomasks. An elliptical fit (negative discriminant) receives a different optical-proximity-correction algorithm from a hyperbolic assist feature (positive discriminant), reducing edge-placement error below 1 nm.

In machine-learning pipelines that fit implicit surfaces to point clouds (for example, NVIDIA’s Instant-NGP), the discriminant supplies an immediate shape prior before expensive nonlinear optimisation begins, cutting training time on LiDAR scenes by discarding impossible hyperbolic fits for roughly spherical objects.

Radio astronomers at the Event Horizon Telescope collaboration classify the projected shape of photon rings around black holes by fitting the same equation to visibility data; the sign distinguishes the expected nearly circular silhouette from any hyperbolic distortion that would indicate calibration error.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Matrix of quadratic form | The discriminant is (up to sign) the determinant of the 2-by-2 matrix of second-degree coefficients. |
| Rotation of axes         | The cross term \(Bxy\) is removed by a rotation whose angle satisfies \(\cot 2\theta = (A-C)/B\). |
| Translation of axes      | Linear terms \(Dx+Ey\) are removed by completing the square or shifting the origin. |
| Factorisation of quadratics | Degenerate cases are detected by checking whether the full conic factors into linear factors. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Collect every quadratic curve
Any curve whose points satisfy a polynomial equation of total degree two must be written with six coefficients.  
Example: \(x^2 + y^2 = 1\) (circle), \(xy = 1\) (hyperbola rotated 45°), \(y = x^2\) (parabola) all fit the single template \(Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0\).  
The formal statement is simply the six-parameter family  
\[
Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0.
\]
> [!WARNING] Treating the six coefficients as independent without noticing that scaling the entire equation leaves the curve unchanged leads to redundant representations.

### Step 2 — Isolate the quadratic part
At large distances the quadratic terms dominate. Their 2-by-2 symmetric matrix  
\[
\begin{pmatrix} A & B/2 \\ B/2 & C \end{pmatrix}
\]  
determines the asymptotic shape. The linear and constant terms only shift the centre.

### Step 3 — Remove the tilt by rotation
The angle that diagonalises the matrix satisfies \(\cot 2\theta = (A-C)/B\). After rotation the new coefficients \(A'\) and \(C'\) satisfy  
\[
A' + C' = A + C, \qquad A'C' = AC - (B/2)^2.
\]  
Hence the combination \(B^2 - 4AC\) is invariant.

### Step 4 — Read the eigenvalues
The eigenvalues \(\lambda_1, \lambda_2\) of the matrix are the new \(A'\) and \(C'\). Their product is \((4AC - B^2)/4\), so the sign of \(B^2 - 4AC\) tells whether the eigenvalues have the same sign (ellipse), opposite signs (hyperbola) or one zero eigenvalue (parabola).

### Step 5 — Translate to standard position
After rotation, complete the square or shift the origin to remove linear terms. The resulting canonical form is one of  
\[
\frac{x'^2}{a^2} + \frac{y'^2}{b^2} = 1, \quad y' = x'^2/(4p), \quad \frac{x'^2}{a^2} - \frac{y'^2}{b^2} = 1.
\]

### Step 6 — Check degeneracy separately
If the conic factors into a pair of linear factors, or collapses to a point or the empty set, the curve is degenerate even though the discriminant still reports the correct underlying type.

### Step 7 — State the classification rule
The textbook statement follows at once:  
\[
B^2 - 4AC 
\begin{cases}
< 0 & \text{ellipse (or circle, point, empty set)}, \\
= 0 & \text{parabola (or degenerate)}, \\
> 0 & \text{hyperbola (or two intersecting lines)}.
\end{cases}
\]

## 5. Worked examples — every step shown

**Example 1 — Circle**  
*Given:* \(x^2 + y^2 - 1 = 0\).  
*Find:* type via discriminant.  
\(A=1\), \(B=0\), \(C=1\), so \(B^2-4AC=0-4= -4 < 0\).  
*Why* the coefficients are read directly from the given equation.  
Final classification: ellipse (in fact a circle).  
**Answer** ellipse (non-degenerate).

*Reflection* No cross term appears; the test still applies unchanged.

**Example 2 — Rotated hyperbola**  
*Given:* \(xy - 1 = 0\).  
*Find:* type.  
\(A=0\), \(B=1\), \(C=0\), discriminant \(1-0=1>0\).  
*Why* the single cross term produces a positive discriminant.  
**Answer** hyperbola.

*Reflection* Rotation by 45° turns the equation into \(\frac{X^2}{2}-\frac{Y^2}{2}=1\).

**Example 3 — Parabola with linear terms**  
*Given:* \(y = x^2\), rewritten as \(x^2 - y = 0\).  
*Find:* type.  
\(A=1\), \(B=0\), \(C=0\), discriminant \(0-0=0\).  
*Why* one of \(A,C\) vanishes after the axes are already aligned.  
**Answer** parabola.

*Reflection* Translation would be needed only if linear \(x\) term were present.

**Example 4 — Degenerate case**  
*Given:* \(x^2 - y^2 = 0\).  
*Find:* type and degeneracy.  
Discriminant \(0-4(1)(-1)=4>0\), suggesting hyperbola, yet \(x^2-y^2=(x-y)(x+y)=0\) factors into two lines.  
*Why* factorisation check follows the discriminant test.  
**Answer** degenerate hyperbola (pair of lines).

*Reflection* The discriminant correctly flags the type; degeneracy is an extra algebraic test.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting to test degeneracy     | The discriminant classifies the quadratic form only | After computing the sign, attempt to factor or compute the full 3-by-3 determinant |
| Treating \(B^2-4AC=0\) as always a non-degenerate parabola | Many textbooks omit the degenerate subcase          | Solve the system of partial derivatives; a repeated root signals degeneracy |
| Sign error when \(A=C\)           | The formula \(B^2-4AC\) is misremembered as \(B^2-4A^2\) | Always compute \(4AC\) first, then subtract from \(B^2\) |
| Assuming the curve exists         | Empty ellipses satisfy the same discriminant        | After translation, check whether the constant term has the correct sign relative to the quadratic terms |
| Scaling the equation changes coefficients | All six coefficients may be multiplied by any nonzero constant | Normalise by dividing through by a convenient coefficient before computing the discriminant |
| Confusing the invariant with the full determinant | The 3-by-3 conic matrix determinant detects degeneracy, not type | Keep the 2-by-2 quadratic discriminant separate from the 3-by-3 degeneracy test |

## 7. The textbook-precise statement
Let \(Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0\) be a real conic section. The quantity \(\Delta = B^2 - 4AC\) is invariant under orthogonal transformations of the plane. The curve is  
- an ellipse (including circle, single point or empty) when \(\Delta < 0\),  
- a parabola (including degenerate cases) when \(\Delta = 0\),  
- a hyperbola (including two intersecting lines) when \(\Delta > 0\),  
provided the full conic is non-degenerate, i.e., the determinant of the associated 3-by-3 matrix  
\[
\begin{pmatrix}
A & B/2 & D/2 \\
B/2 & C & E/2 \\
D/2 & E/2 & F
\end{pmatrix}
\]  
is nonzero. (See Apostol, *Calculus*, Vol. II, 2nd ed., §14.8.)

## 8. Visual — diagram or schematic
```text
          B²-4AC < 0          B²-4AC = 0          B²-4AC > 0
               ellipse             parabola            hyperbola
                 ( )                 y = x²            x² - y² = 1
               /   \                /                  /   \
              /     \              /                  /     \
             circle   point      degenerate          two lines
```

The horizontal axis represents increasing values of the discriminant; each sketch is already in canonical position after rotation and translation.

## 9. The memory technique
**The hook**  
Picture the quadratic form as a saddle, bowl or cylinder: a saddle (hyperbola) has opposite-sign curvatures, a bowl (ellipse) has same-sign curvatures, and a cylinder (parabola) has one zero curvature; the discriminant simply counts the number of negative eigenvalues.

**What to overlearn**  
1. \(B^2-4AC\) is the sole classifier.  
2. The 3-by-3 determinant must be checked for degeneracy.  
3. The trace \(A+C\) is invariant but does not classify type.

**Spaced-repetition schedule**  
Review the sign table after 1 day, again after 3 days, 7 days, 16 days and 35 days, each time recomputing the discriminant on a fresh example.

**First-principles fallback**  
Diagonalise the 2-by-2 matrix of quadratic coefficients; the product of eigenvalues has the opposite sign of \(B^2-4AC\); read the type from the signs.

## 10. What this unlocks
Mastery of the discriminant lets you move immediately to reduction of the general conic to canonical form, to the study of confocal conics, and to the projective classification of conics over the real projective plane. It also supplies the algebraic engine behind the classification of quadric surfaces in three dimensions and the recognition of elliptic and hyperbolic PDEs.

- Reduction to standard form by rotation and translation  
- Polar equations of conics and focus-directrix definitions  
- Dual conics and envelope problems  
- Quadric surfaces via the analogous 3-by-3 matrix signature  
- Classification of second-order linear PDEs (elliptic/parabolic/hyperbolic)

## 11. Self-check — five questions, no answers
1. Compute \(B^2-4AC\) for \(2x^2 - 3xy + 5y^2 - x + 7 = 0\) and state the type before degeneracy testing.  
2. Show that the equation \(x^2 + 2xy + y^2 - 1 = 0\) represents a degenerate parabola and factor it completely.  
3. After a rotation that eliminates the \(xy\) term, an equation becomes \(3X^2 - 2Y^2 + DX + EY + F = 0\). What was the original value of \(B^2-4AC\)?  
4. Give an example of a non-degenerate ellipse whose coefficients satisfy \(A = C\) and \(B \neq 0\).  
5. Explain why the curve \(x^2 + y^2 + 1 = 0\) is empty yet still classified by the discriminant as an ellipse.