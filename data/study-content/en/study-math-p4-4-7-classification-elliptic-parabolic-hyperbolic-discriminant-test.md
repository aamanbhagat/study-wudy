## 1. The one-sentence answer
**Second-order linear partial differential equations are classified as elliptic, parabolic, or hyperbolic according to the sign of the discriminant \(b^2-4ac\) formed from the coefficients of the second-derivative terms.**

This rule arises because the principal part of any such PDE is a quadratic form in the two independent variables, and quadratic forms are classified by the same algebraic invariant that distinguishes ellipses, parabolas, and hyperbolas. The sign of the discriminant is unchanged under smooth changes of coordinates, so it genuinely labels the intrinsic character of the equation. Solutions therefore inherit qualitatively different properties: elliptic equations enforce boundary-value problems with maximum principles, parabolic equations describe irreversible diffusion with smoothing, and hyperbolic equations support finite-speed propagation along real characteristics.

The classification therefore decides which analytic tools, numerical schemes, and physical interpretations are admissible before any solution is attempted.

> [!NOTE]
> The single algebraic quantity \(b^2-4ac\) simultaneously encodes the geometry of the characteristic curves and the well-posedness class of the initial-boundary-value problem.

## 2. Why this matters — concrete and current
In computational aerodynamics, the Euler equations for steady transonic flow are locally elliptic in subsonic pockets and hyperbolic in supersonic regions; the discriminant test is evaluated cell-by-cell inside NASA’s OVERFLOW solver to switch between central and upwind discretizations automatically.  

Seismic migration codes used by Shell and Schlumberger treat the acoustic wave equation as hyperbolic; the same code base switches to elliptic solvers when the frequency-domain Helmholtz form is solved for full-waveform inversion.  

The Black–Scholes equation for option pricing is parabolic; quantitative desks at Jane Street and Citadel rely on the discriminant test to confirm that the PDE remains parabolic after coordinate changes that incorporate stochastic volatility, guaranteeing well-posedness of the final-value problem.  

In semiconductor process modeling, Synopsys TCAD tools solve the steady-state Poisson equation for electrostatic potential inside transistors; the elliptic classification licenses the use of multigrid solvers whose convergence proofs rest on the maximum principle that holds only for elliptic operators.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Second-order linear PDE in two variables | Supplies the exact algebraic object whose coefficients enter the discriminant |
| Chain rule for partial derivatives | Required when changing independent variables to reach canonical form |
| Quadratic forms and their invariants | Explains why \(b^2-4ac\) is unchanged under coordinate transformations |
| Characteristic curves of first-order PDEs | Provides the geometric meaning of real versus complex characteristics |

## 4. Building the idea — from intuition to formalism

### Step 1 — Write the general second-order operator
Any linear second-order PDE in two independent variables \(x,y\) begins with the principal part
\[
a(x,y)u_{xx}+b(x,y)u_{xy}+c(x,y)u_{yy}.
\]
Lower-order terms do not affect the classification.

### Step 2 — Compare with the algebraic classification of conics
The algebraic curve \(a\xi^2+b\xi\eta+c\eta^2=1\) is an ellipse, parabola, or hyperbola according to the sign of \(b^2-4ac\). The same quadratic expression appears when the PDE is written in matrix form
\[
\begin{pmatrix} u_x & u_y \end{pmatrix}
\begin{pmatrix} a & b/2 \\ b/2 & c \end{pmatrix}
\begin{pmatrix} u_x \\ u_y \end{pmatrix}.
\]

### Step 3 — Perform a linear change of independent variables
Introduce new coordinates \(\xi=\xi(x,y)\), \(\eta=\eta(x,y)\) with non-vanishing Jacobian. The chain rule transforms the coefficient matrix by congruence; the determinant of the transformed matrix is multiplied by the square of the Jacobian, preserving the sign of its determinant \(ac-b^2/4\).

### Step 4 — Compute the invariant discriminant
The quantity
\[
\Delta=b^2-4ac
\]
is therefore unchanged in sign. Its value at each point decides the local type:
- \(\Delta>0\) hyperbolic,
- \(\Delta=0\) parabolic,
- \(\Delta<0\) elliptic.

### Step 5 — Reach canonical form by completing the square or diagonalization
When \(\Delta>0\) two real characteristic directions exist and the PDE reduces to \(u_{\xi\eta}=\dots\); when \(\Delta=0\) a single family of characteristics yields \(u_{\eta\eta}=\dots\); when \(\Delta<0\) no real characteristics exist and the canonical form is \(u_{\xi\xi}+u_{\eta\eta}=\dots\).

### Step 6 — State the classification theorem
The local type of the PDE at a point is completely determined by the sign of \(\Delta\) evaluated at that point.

> [!WARNING]
> Treating lower-order coefficients as part of the discriminant produces an incorrect type; only the three second-order coefficients matter.

## 5. Worked examples — every step shown

**Example 1 — The wave equation**  
*Given:* \(u_{tt}-c^2u_{xx}=0\).  
*Find:* type at every point.  
Rewrite coefficients: \(a=-c^2\), \(b=0\), \(c=1\) (independent variables \(x,t\)).  
Compute \(\Delta=0-4(-c^2)(1)=4c^2>0\).  
**Hyperbolic.**  
*Reflection:* The calculation is immediate once the principal part is isolated; the same result holds after any smooth re-labeling of coordinates.

**Example 2 — The heat equation**  
*Given:* \(u_t-u_{xx}=0\).  
*Find:* type.  
Here \(a=-1\), \(b=0\), \(c=0\) (variables \(x,t\)).  
\(\Delta=0-4(-1)(0)=0\).  
**Parabolic.**  
*Reflection:* Vanishing of the second time derivative forces the discriminant to zero regardless of scaling.

**Example 3 — Laplace’s equation**  
*Given:* \(u_{xx}+u_{yy}=0\).  
*Find:* type.  
\(a=1\), \(b=0\), \(c=1\).  
\(\Delta=0-4(1)(1)=-4<0\).  
**Elliptic.**  
*Reflection:* The two equal positive signs produce a negative discriminant, licensing the maximum principle.

**Example 4 — Variable-coefficient Tricomi equation**  
*Given:* \(u_{xx}+x u_{yy}=0\).  
*Find:* type in the half-planes \(x>0\) and \(x<0\).  
\(a=1\), \(b=0\), \(c=x\).  
\(\Delta=0-4(1)(x)=-4x\).  
When \(x>0\), \(\Delta<0\) (elliptic); when \(x<0\), \(\Delta>0\) (hyperbolic).  
**Mixed type across \(x=0\).**  
*Reflection:* The zero set of the discriminant locates the sonic line where the equation changes type.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Including first-order coefficients in \(\Delta\) | Confusion between principal symbol and full operator | Extract only the three second-derivative coefficients before computing |
| Forgetting that \(\Delta\) may change sign | Treating the PDE as globally of one type | Evaluate \(\Delta(x,y)\) at each point of the domain |
| Sign error when the equation is written with opposite orientation | Multiplication of the entire PDE by −1 reverses all three signs yet leaves \(\Delta\) sign unchanged | Verify \(\Delta\) after any overall multiplication |
| Applying the test to quasilinear equations without freezing coefficients | Belief that nonlinearity invalidates the test | Freeze highest-order coefficients at a background solution and classify the resulting linear operator |
| Confusing the discriminant with the determinant of the coefficient matrix | Notation \(ac-b^2/4\) versus \(b^2-4ac\) | Always compute \(b^2-4ac\) explicitly |
| Using the test on systems rather than scalar equations | Over-generalization from the scalar case | Restrict the discriminant test to scalar second-order operators |
| Ignoring points where \(a=b=c=0\) | Degenerate loci where the order effectively drops | Check that the quadratic form is non-trivial before classifying |

## 7. The textbook-precise statement
Let
\[
Lu=a(x,y)u_{xx}+b(x,y)u_{xy}+c(x,y)u_{yy}+d(x,y)u_x+e(x,y)u_y+f(x,y)u=g(x,y)
\]
be a linear second-order PDE with coefficients continuous in a domain \(\Omega\subset\mathbb{R}^2\). At each point \((x_0,y_0)\in\Omega\) the equation is said to be  
- hyperbolic if \(b(x_0,y_0)^2-4a(x_0,y_0)c(x_0,y_0)>0\),  
- parabolic if \(b(x_0,y_0)^2-4a(x_0,y_0)c(x_0,y_0)=0\),  
- elliptic if \(b(x_0,y_0)^2-4a(x_0,y_0)c(x_0,y_0)<0\),  
provided not all of \(a,b,c\) vanish simultaneously. (Evans, *Partial Differential Equations*, 2e, §2.2.)

## 8. Visual — diagram or schematic
```text
          η
           ↑
           │     elliptic   (Δ<0)   two complex chars
           │   ╱───────────────╲
           │  ╱                 ╲
    ξ ←────┼──────────────────────→  hyperbolic (Δ>0)
           │  ╲     real chars   ╱   two distinct real chars
           │   ╲───────────────╱
           │     parabolic (Δ=0)  repeated real char
           ↓
```
Horizontal axis \(\xi\), vertical axis \(\eta\); the three regions are separated by the parabola \(\Delta=0\).

## 9. The memory technique

1. **The hook**  
   Picture the conic sections drawn on the plane of independent variables: an ellipse (closed, bounded) for elliptic PDEs, a parabola (exactly one direction at infinity) for parabolic PDEs, and a hyperbola (two asymptotic directions) for hyperbolic PDEs.

2. **What to overlearn**  
   - \(\Delta=b^2-4ac\)  
   - sign table: \(>0\) hyperbolic, \(=0\) parabolic, \(<0\) elliptic  
   - lower-order terms never enter \(\Delta\)

3. **Spaced-repetition schedule**  
   Review at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

4. **First-principles fallback**  
   Return to the quadratic form, perform the change-of-variable calculation that shows \(\Delta\) is multiplied only by the square of the Jacobian, then read off the sign.

## 10. What this unlocks
The classification immediately determines admissible boundary conditions, the direction of information propagation, and the choice of numerical method. It is the prerequisite for the study of characteristics, energy methods, maximum principles, and the well-posedness theory of initial-boundary-value problems.

- Canonical reduction to normal forms  
- Method of characteristics for hyperbolic equations  
- Maximum principle for elliptic and parabolic operators  
- Energy estimates and uniqueness proofs  
- Finite-difference and finite-element stability analysis

## 11. Self-check — five questions, no answers
1. Compute the type of \(x u_{xx}+u_{yy}=0\) at the points \((1,0)\) and \((-1,0)\).  
2. Show that multiplication of the entire PDE by a nowhere-zero function leaves the classification unchanged.  
3. For the PDE \(u_{xx}+2u_{xy}+u_{yy}=0\), find new coordinates in which the equation becomes \(v_{\xi\xi}=0\) and verify that \(\Delta=0\) throughout.  
4. A student claims the PDE \(u_{xx}-u_{yy}+u_x=0\) is elliptic because of the first-order term; explain the error.  
5. Construct a scalar second-order PDE whose type changes from elliptic to hyperbolic across the curve \(y=x^2\).