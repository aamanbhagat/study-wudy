## 1. The one-sentence answer
**A second-order linear PDE is classified as elliptic, parabolic or hyperbolic by computing the discriminant \(B^2 - AC\) of its principal part, exactly as the same expression classifies conic sections.**

Yeh test aapko batata hai ki solution ka local behaviour kis tarah ka hoga: smooth aur steady (elliptic), diffusion-type spreading (parabolic), ya wave-like propagation with finite speed (hyperbolic).  

Pehle aap second-order terms ko \(A u_{xx} + 2B u_{xy} + C u_{yy}\) form mein likhte ho. Phir sirf in teeno coefficients se ek number nikalte ho. Sign of that number decides the type. Type badalne se boundary/initial conditions aur numerical schemes dono change ho jaate hain.

> [!NOTE]
> The single “aha” moment is this: the PDE type is a local, algebraic property of the coefficients at each point; it does not depend on the lower-order terms or on the domain shape.

## 2. Why this matters — concrete and current
In computational aerodynamics, ANSYS Fluent and NASA’s OVERFLOW code switch between elliptic (subsonic) and hyperbolic (supersonic) solvers by checking the sign of \(B^2 - AC\) at every cell; a wrong classification produces non-physical shocks.

Seismic imaging companies (Schlumberger, CGG) treat the acoustic wave equation as hyperbolic; the same code base uses the elliptic classification for the eikonal equation that computes first-arrival traveltimes, allowing one mesh to handle both migration and tomography.

In semiconductor process simulation, Synopsys TCAD solves the drift-diffusion system; the electrostatic Poisson equation is elliptic while the continuity equations become parabolic under bias, and the solver automatically selects multigrid versus time-stepping according to the discriminant.

Black-Scholes option pricing (used daily by Jane Street and Citadel) reduces to a parabolic PDE; if interest-rate models introduce a second spatial variable, the discriminant test immediately tells quants whether they now face an elliptic steady-state problem that needs different boundary data.

Climate models at ECMWF classify the horizontal momentum equations locally; regions where the discriminant changes sign mark the transition from balanced (elliptic) to gravity-wave (hyperbolic) regimes, triggering adaptive time-step controllers.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Second-order partial derivatives | The classification uses only the highest-order terms      |
| Linear PDE               | The test assumes the equation is linear in the unknown     |
| Change of variables      | Coordinate transformations preserve or flip the sign of the discriminant in a controlled way |
| Quadratic forms          | \(B^2 - AC\) is the determinant of the 2-by-2 coefficient matrix of second derivatives |

If any row above is unfamiliar, pause and review that single concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Reduce the PDE to its principal part
Aap second-order linear PDE ko dekhte ho aur sirf \(u_{xx}\), \(u_{xy}\), \(u_{yy}\) wale terms ko alag karte ho. Baaki terms (first-order, zeroth-order, right-hand side) type decide nahi karte.

Example: \(3u_{xx} - 4u_{xy} + 5u_{yy} + u_x = 0\) mein principal part \(3u_{xx} - 4u_{xy} + 5u_{yy}\) hai.

Formal statement: any second-order linear operator can be written
\[
L[u] = A u_{xx} + 2B u_{xy} + C u_{yy} + \text{lower-order terms}.
\]

> [!WARNING]
> Agar aap lower-order terms ko bhi discriminant mein ghusa doge to sign galat aa sakta hai.

### Step 2 — Form the quadratic symbol
Principal part ko ek quadratic form ki tarah dekho: \(A\xi^2 + 2B\xi\eta + C\eta^2\). Yeh woh polynomial hai jo Fourier symbol mein appear karta hai.

Example: upar wale PDE ke liye symbol \(3\xi^2 - 4\xi\eta + 5\eta^2\).

Formal statement: the principal symbol is the homogeneous quadratic polynomial
\[
\sigma(\xi,\eta) = A\xi^2 + 2B\xi\eta + C\eta^2.
\]

### Step 3 — Compute the discriminant of that quadratic
Discriminant \(\Delta = B^2 - AC\) nikaalte ho. Yeh wohi expression hai jo conic-section classification mein use hota hai.

Example: \(B = -2\), \(A = 3\), \(C = 5\) → \(\Delta = 4 - 15 = -11 < 0\).

Formal statement:
\[
\Delta(x,y) := B(x,y)^2 - A(x,y)C(x,y).
\]

### Step 4 — Read the sign
- \(\Delta < 0\) → elliptic (no real characteristics)
- \(\Delta = 0\) → parabolic (exactly one family of characteristics)
- \(\Delta > 0\) → hyperbolic (two distinct real families)

Example: \(-11 < 0\) ⇒ elliptic.

Formal statement: at each point the PDE is called elliptic, parabolic or hyperbolic according to the sign of \(\Delta\) at that point.

### Step 5 — Verify invariance under smooth coordinate changes
Agar aap new coordinates \(\xi = \xi(x,y)\), \(\eta = \eta(x,y)\) introduce karo (Jacobian non-zero), to \(\Delta\) ka sign preserve rehta hai. Isliye classification coordinate-independent hai.

Example: rotate by 45°; new \(A'\), \(B'\), \(C'\) nikalte ho aur dekhte ho \(\Delta'\) ka sign same hai.

Formal statement: under an invertible \(C^2\) change of independent variables the discriminant transforms by the square of the Jacobian determinant and therefore keeps its sign.

## 5. Worked examples — har step show karo

**Example 1 — Laplace equation**
- *Given:* \(u_{xx} + u_{yy} = 0\)
- *Find:* type
- \(A = 1\), \(B = 0\), \(C = 1\)
- \(\Delta = 0 - 1\cdot1 = -1 < 0\)
*Why:* only highest-order coefficients matter, lower terms absent.

**Final answer**  
**Elliptic**

*Reflection:* simplest case; shows that \(\Delta < 0\) matches our intuition of “steady-state” behaviour.

**Example 2 — Heat equation**
- *Given:* \(u_t = u_{xx}\)
- *Find:* type (treat \(t\) as \(y\))
- Rewrite: \(u_{xx} - u_t = 0\) → \(A = 1\), \(B = 0\), \(C = 0\)
- \(\Delta = 0 - 1\cdot0 = 0\)
*Why:* time derivative is first-order, so \(C = 0\).

**Final answer**  
**Parabolic**

*Reflection:* shows how a first-order time term produces the degenerate \(\Delta = 0\) case.

**Example 3 — Wave equation**
- *Given:* \(u_{tt} = c^2 u_{xx}\)
- *Find:* type
- Rewrite: \(c^2 u_{xx} - u_{tt} = 0\) → \(A = c^2\), \(B = 0\), \(C = -1\)
- \(\Delta = 0 - c^2(-1) = c^2 > 0\) (assuming \(c \neq 0\))
*Why:* opposite signs of second-derivative coefficients flip the sign of \(\Delta\).

**Final answer**  
**Hyperbolic**

*Reflection:* classic example where two real characteristic families (light cones) appear.

**Example 4 — Tricomi equation (variable type)**
- *Given:* \(u_{xx} + x u_{yy} = 0\)
- *Find:* type in \(x > 0\) and \(x < 0\)
- \(A = 1\), \(B = 0\), \(C = x\)
- \(\Delta = 0 - 1\cdot x = -x\)
- When \(x > 0\), \(\Delta < 0\) → elliptic; when \(x < 0\), \(\Delta > 0\) → hyperbolic.
*Why:* coefficient \(C\) changes sign, so type changes across \(x = 0\).

**Final answer**  
**Changes from elliptic to hyperbolic across the sonic line \(x = 0\)**

*Reflection:* real-world transonic flow; classification must be done pointwise.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Including lower-order terms in \(\Delta\) | Students copy the whole PDE                 | Isolate only \(A, B, C\) coefficients first  |
| Forgetting the factor 2 in \(2B\) | Notation confusion with conic sections      | Always write the PDE as \(A u_{xx} + 2B u_{xy} + C u_{yy}\) |
| Treating variable-coefficient PDE as single type | Global thinking instead of pointwise        | Evaluate \(\Delta(x,y)\) at each point       |
| Sign error when moving terms      | Moving \(u_{tt}\) changes sign of \(C\)     | Recalculate \(\Delta\) after every algebraic move |
| Applying test to first-order PDEs | Over-generalisation                         | Confirm order is exactly two before starting |
| Ignoring points where \(A = B = C = 0\) | Degenerate loci                           | Check that the principal symbol is not identically zero |
| Using non-smooth coordinate changes | Jacobian vanishes or discontinuous          | Verify transformation is \(C^2\) and invertible |

## 7. The textbook-precise statement
A second-order linear partial differential equation in two independent variables,
\[
A(x,y)u_{xx} + 2B(x,y)u_{xy} + C(x,y)u_{yy} + D(x,y)u_x + E(x,y)u_y + F(x,y)u = G(x,y),
\]
is said to be elliptic, parabolic or hyperbolic at a point \((x_0,y_0)\) according as the discriminant
\[
\Delta(x_0,y_0) = B(x_0,y_0)^2 - A(x_0,y_0)C(x_0,y_0)
\]
is negative, zero or positive, respectively, provided that not all of \(A,B,C\) vanish at that point. (Evans, *Partial Differential Equations*, 2e, §2.2; John, *Partial Differential Equations*, 4e, §1.4.)

## 8. Visual — diagram or schematic
```
ξ
 ^
 |     elliptic          hyperbolic
 |   (Δ < 0)            (Δ > 0)
 |      \               /
 |       \             /
 |        \           /
 |         \         /
 |          \       /
 | parabolic (Δ = 0) ----> η
```
Horizontal axis η, vertical ξ. The two lines are the characteristic directions that exist only when Δ > 0. Inside the wedge between them the equation is hyperbolic; outside it is elliptic; on the lines themselves it is parabolic.

## 9. The memory technique
1. **The hook** — picture a cone (elliptic), a parabola, and a hyperbola drawn on the plane; the same algebraic expression \(B^2 - AC\) decides which curve you get.
2. **What to overlearn** — \(\Delta = B^2 - AC\); sign table: <0 elliptic, =0 parabolic, >0 hyperbolic.
3. **Spaced-repetition schedule** — review the sign table after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — return to the quadratic symbol \(\sigma(\xi,\eta)\), compute its eigenvalues; if both same sign → elliptic, one zero → parabolic, opposite signs → hyperbolic.

## 10. What this unlocks
Once you can classify any second-order PDE you can choose the correct well-posed boundary or initial conditions and the right numerical method.

- Elliptic → boundary-value problems, maximum principle, multigrid
- Parabolic → initial-boundary-value problems, smoothing estimates, implicit time stepping
- Hyperbolic → characteristic initial-value problems, domain of dependence, explicit upwind schemes
- Next topics: method of characteristics, energy methods, Sobolev spaces, weak solutions

## 11. Self-check — five questions, no answers
1. Classify \(u_{xx} + 2u_{xy} + u_{yy} = 0\) at every point.
2. For the PDE \(y u_{xx} + x u_{yy} = 0\), find the curves across which the type changes.
3. Show that the Tricomi equation \(u_{xx} + x u_{yy} = 0\) is elliptic for \(x > 0\) and hyperbolic for \(x < 0\).
4. A student computed \(\Delta = B^2 - 4AC\); explain the mistake and give the correct expression.
5. After rotating coordinates by an angle whose tangent is 1, recompute \(\Delta\) for \(3u_{xx} - 4u_{xy} + 5u_{yy} = 0\) and verify the sign is unchanged.