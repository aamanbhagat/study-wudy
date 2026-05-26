## 1. The one-sentence answer
**The discriminant \(B^2 - 4AC\) of the general second-degree equation \(Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0\) tells you whether the curve is an ellipse, parabola or hyperbola (or one of their degenerate cases).**

Aap is equation ko plane mein ek conic section ke general form ke roop mein dekhte ho. Isme \(x^2\), \(y^2\) aur \(xy\) terms hain jo curve ko define karte hain. Jab aap coordinate system ko rotate karte ho taaki \(xy\) term gayab ho jaaye, tab sirf \(B^2 - 4AC\) hi decide karta hai ki new coefficients ka sign pattern kaisa hoga. Isliye yeh quantity invariant rehti hai aur classification deta hai.

Yeh discriminant actually matrix of quadratic form ka determinant se juda hai. Agar aap isko zero ke against compare karte ho to aap turant bata sakte ho ki curve closed (ellipse), open one-sided (parabola) ya two-branched (hyperbola) hai.

> [!NOTE]
> The single “aha” moment is this: rotation removes the \(xy\) term but leaves the sign of \(B^2 - 4AC\) unchanged; therefore the sign alone classifies the conic without ever finding the angle of rotation.

## 2. Why this matters — concrete and current
In orbital mechanics, SpaceX and NASA trajectory teams classify the path of a spacecraft as elliptic (closed orbit), parabolic (escape) or hyperbolic (fly-by) by feeding the two-body energy equation into this exact discriminant test before running Lambert solvers.

In semiconductor mask design, ASML’s computational lithography software fits measured wafer contours to general quadrics; the discriminant quickly flags whether a printed feature will be an isolated ellipse, a bridging parabola or a splitting hyperbola, allowing real-time correction of EUV dose maps.

In robotics, Boston Dynamics’ motion planners fit LiDAR point clouds to quadratic surfaces for obstacle modelling; the discriminant decides whether a fitted surface is an enclosing ellipsoid (safe zone) or a hyperbolic saddle (narrow passage) before feeding the result to the convex optimisation layer.

In general-relativity numerics, the Einstein Toolkit classifies apparent horizons by treating the marginally trapped surface equation as a second-degree form; the sign of the discriminant distinguishes elliptic (compact horizon) from hyperbolic (unstable) solutions during binary black-hole mergers.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Matrix of quadratic form | The expression \(B^2-4AC\) is \(-4\) times the determinant of the \(2\times2\) matrix \(\begin{pmatrix}A&B/2\\B/2&C\end{pmatrix}\). |
| Rotation of axes         | You must know that a rotation matrix \(Q\) satisfies \(\det(Q)=1\), so the discriminant sign is preserved. |
| Translation invariance   | Linear terms \(Dx+Ey\) can be removed by completing the square; they never affect \(B^2-4AC\). |

## 4. Building the idea — from intuition to formalism

### Step 1 — Quadratic form without linear terms
Aap pehle sirf \(Ax^2 + Bxy + Cy^2 = 0\) ko dekho. Yeh homogeneous equation origin ke through lines ya conics deta hai.  
Example: \(x^2 + xy + y^2 = 0\) gives only the trivial solution \((0,0)\).  
Formal statement: the associated symmetric matrix is \(\begin{pmatrix}A & B/2 \\ B/2 & C\end{pmatrix}\).  
> [!WARNING] Agar aap \(B/2\) ki jagah galti se \(B\) likh do to determinant sign flip ho jaayega aur classification ulta padhega.

### Step 2 — Effect of rotation
Aap coordinate system ko \(\theta\) angle se rotate karte ho jisse new \(x'y'\) coordinates mein \(B'\) term zero ho jaaye. Tan(2θ) formula se \(\cot 2\theta = (A-C)/B\) aata hai.  
Example: \(xy=1\) ko 45° rotate karne par \(x'^2 - y'^2 = 2\) ban jaata hai.  
Formal: after rotation the new coefficients satisfy \(A'+C' = A+C\) and \(A'C' = (4AC-B^2)/4\).  
> [!WARNING] Agar aap rotation ke baad bhi \(B'\) ko zero maanne mein galti karo to discriminant zero dikhne lagega jabki curve hyperbola ho.

### Step 3 — Invariance of the discriminant
\(B^2-4AC\) rotation ke neeche constant rehta hai kyunki yeh matrix determinant ka multiple hai aur det(Q)=1.  
Example: dono original aur rotated equations ka \(B^2-4AC\) same number deta hai.  
Formal: \(\Delta = B^2-4AC\) is an invariant of the orthogonal group SO(2).  
> [!WARNING] Translation se \(\Delta\) change nahi hota lekin agar aap scale factor daal do to \(\Delta\) scale ho jaata hai; isliye sign hi reliable hai.

### Step 4 — Adding linear and constant terms
Linear terms sirf centre ko shift karte hain. Aap unhe complete-the-square ya partial derivatives se hata sakte ho.  
Example: \(x^2 + 2xy + y^2 - 2x + 2y + 1 = 0\) ko \((x+y-1)^2=0\) mein badla ja sakta hai.  
Formal: the full classification uses both \(\Delta\) and the 3×3 determinant of the conic matrix.  
> [!WARNING] Agar degenerate case (pair of lines) ko ignore karo to aap ek hyperbola ki jagah do intersecting lines ko bhi hyperbola bol baithoge.

### Step 5 — Final classification table
\(\Delta < 0\) → ellipse (non-degenerate agar extra determinant non-zero ho),  
\(\Delta = 0\) → parabola,  
\(\Delta > 0\) → hyperbola.

## 5. Worked examples — har step show karo

**Example 1 — Simple ellipse test**  
*Given:* \(3x^2 + 2xy + 3y^2 - 2x - 2y + 1 = 0\)  
*Find:* conic type via discriminant.  
Compute \(A=3\), \(B=2\), \(C=3\).  
\(\Delta = 2^2 - 4\cdot3\cdot3 = 4-36=-32<0\).  
*Why:* direct substitution of coefficients into the invariant.  
**Final answer: ellipse (non-degenerate)**  
*Reflection:* linear terms were present but ignored for classification; only \(\Delta\) mattered.

**Example 2 — Parabola**  
*Given:* \(y^2 - 4x = 0\)  
*Find:* type.  
\(A=0\), \(B=0\), \(C=1\).  
\(\Delta = 0-4\cdot0\cdot1=0\).  
*Why:* missing \(x^2\) and \(xy\) forces \(\Delta=0\).  
**Final answer: parabola**  
*Reflection:* this is already in standard form; discriminant confirms instantly.

**Example 3 — Hyperbola with xy term**  
*Given:* \(xy - 1 = 0\)  
*Find:* type.  
\(A=0\), \(B=1\), \(C=0\).  
\(\Delta = 1-0=1>0\).  
*Why:* cross term alone produces positive discriminant.  
**Final answer: hyperbola**  
*Reflection:* after 45° rotation it becomes difference of squares, matching the sign.

**Example 4 — Degenerate case**  
*Given:* \(x^2 - y^2 = 0\)  
*Find:* type and degeneracy.  
\(A=1\), \(B=0\), \(C=-1\).  
\(\Delta = 0-4(1)(-1)=4>0\) (hyperbola sign) yet the 3×3 determinant vanishes.  
*Why:* factors into \((x-y)(x+y)=0\), two lines.  
**Final answer: degenerate hyperbola (pair of lines)**  
*Reflection:* always check the full 3×3 determinant when \(\Delta>0\) to catch degeneracy.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                                      | How to avoid it                                      |
|-------------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting to halve B in the matrix | Students write det\(\begin{pmatrix}A&B\\B&C\end{pmatrix}\) | Always remember the off-diagonal entries are \(B/2\) |
| Treating every \(\Delta=0\) as non-degenerate parabola | Equation can factor into parallel lines             | Compute the 3×3 conic determinant as extra check     |
| Sign error when \(C\) is negative   | Hyperbola looks like ellipse if sign misread        | Write \(\Delta = B^2-4AC\) explicitly before comparing |
| Ignoring scale of coefficients      | Multiplying equation by 2 changes numerical value but not sign | Compare only the sign of \(\Delta\)                  |
| Applying classification before removing \(xy\) term | Rotation not performed, so \(B\) still present      | Compute \(\Delta\) directly; no need to rotate       |
| Confusing point ellipse with empty set | Both give \(\Delta<0\)                              | Check the constant term after translation            |

## 7. The textbook-precise statement
Let \(Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0\) be a real conic. Define the discriminant \(\Delta = B^2 - 4AC\). The conic is  
- a non-degenerate ellipse if \(\Delta < 0\) and the determinant of the associated 3×3 matrix is non-zero,  
- a non-degenerate parabola if \(\Delta = 0\) and the 3×3 determinant is non-zero,  
- a non-degenerate hyperbola if \(\Delta > 0\) and the 3×3 determinant is non-zero.  
Degenerate cases occur precisely when the 3×3 determinant vanishes. (Reference: Stewart, *Calculus*, 9e, §10.5, “Classifying Conics by the Discriminant”.)

## 8. Visual — diagram or schematic
```
          B²-4AC < 0          B²-4AC = 0          B²-4AC > 0
               ellipse            parabola            hyperbola
          (closed oval)       (U-shape opening)   (two opposite branches)
   Δ<0 ----------------- Δ=0 ----------------- Δ>0
```

## 9. The memory technique
1. **The hook** — Picture a see-saw: when the cross-term “B” is large enough to tip the balance past 4AC, the curve splits into two branches (hyperbola); when it cannot tip, the curve stays closed (ellipse).  
2. **What to overlearn** — \(\Delta = B^2-4AC\); sign rules: <0 ellipse, =0 parabola, >0 hyperbola.  
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by rotating axes using \(\cot 2\theta = (A-C)/B\) and verify that new \(A'C'\) product equals \((4AC-B^2)/4\).

## 10. What this unlocks
Aap ab partial differential equations, quadratic forms in multivariable calculus, and projective geometry ke conic pencils ko classify kar sakte ho.  
- Next: reduction of conics to canonical form via orthogonal diagonalisation.  
- Next: pole-polar relations in projective planes.  
- Next: envelope of families of conics in algebraic geometry.

## 11. Self-check — five questions, no answers
1. Compute \(\Delta\) for \(2x^2 - 3xy + 5y^2 - x + y - 7 = 0\) and state the type.  
2. Why does translation never change \(\Delta\)?  
3. Give an equation where \(\Delta > 0\) yet the curve is two intersecting lines.  
4. After rotating \(xy = 1\) by 45°, what is the new equation and does its discriminant match?  
5. A student claims “\(\Delta = 0\) always means a parabola”; construct a counter-example and explain the mistake.