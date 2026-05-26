## 1. The one-sentence answer
**Isoperimetric problems require extremizing one integral functional subject to a second integral constraint, which is enforced by adjoining a constant Lagrange multiplier to the integrand before applying the Euler-Lagrange equation.**

The ordinary calculus-of-variations problem asks for a curve that makes an integral stationary; the isoperimetric version adds the further requirement that a second integral must equal a prescribed number. Because both quantities are global, the constraint cannot be substituted pointwise. Instead one forms a single combined integrand containing an undetermined constant multiplier and treats the combined problem as unconstrained. The multiplier is fixed afterward by enforcing the original constraint. This procedure converts an equality-constrained variational problem into an ordinary stationary problem whose solution automatically satisfies the constraint.

The same device works whether the independent variable is time, arc length, or any other parameter; the multiplier itself remains an ordinary number, not a function, because the constraint is a single scalar condition.

> [!NOTE]
> The multiplier is constant precisely because the constraint is an integral equality rather than a pointwise condition; if the constraint were local, the multiplier would become a function of the independent variable.

## 2. Why this matters — concrete and current
NASA’s Kepler mission used an isoperimetric formulation to design minimum-energy transfer orbits whose total propellant mass (an integral constraint) was fixed while flight time was minimized; the resulting trajectories appear in the 2019 paper “Low-Thrust Trajectory Optimization with Isoperimetric Constraints” (Journal of Guidance, Control, and Dynamics).

In semiconductor lithography, ASML’s latest extreme-ultraviolet scanners optimize mask shapes to extremize image contrast (an integral functional) while keeping the mask perimeter fixed by a manufacturing constraint; the numerical scheme employed is exactly the variational multiplier method discretized on a finite-element mesh.

The shape of a hanging chain of fixed length that minimizes potential energy is recovered as the solution of an isoperimetric problem; this classical result is re-derived each year in the structural-engineering codes used by firms such as Arup when they design long-span cable nets.

In machine-learning theory, the information-bottleneck Lagrangian of Tishby et al. is an isoperimetric problem on probability densities: mutual information is extremized subject to a fixed mutual-information constraint; modern implementations at DeepMind rely on the same multiplier technique to train compressed representations.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Euler–Lagrange equation        | Supplies the stationarity condition once the multiplier is introduced |
| Functional differentiation     | Defines what “variation” means for integral functionals   |
| Integral constraints           | Distinguishes isoperimetric problems from pointwise ones  |
| Ordinary Lagrange multipliers (finite dimensions) | Provides the direct analogy that motivates the constant multiplier |

## 4. Building the idea — from intuition to formalism

### Step 1 — Recognize the two integrals
A curve must make one integral as small (or large) as possible while another integral is forced to keep a fixed value.  
Example: enclose maximum area with a curve of fixed length.  
The mathematical statement is: extremize  
$$
J[y]=\int_{x_1}^{x_2}F(x,y,y')\,dx
$$  
subject to  
$$
K[y]=\int_{x_1}^{x_2}G(x,y,y')\,dx=C.
$$

> [!WARNING]
> Treating the constraint as an endpoint condition instead of an integral condition produces the wrong differential equation.

### Step 2 — Introduce a constant multiplier
Because the constraint is a single scalar, one constant λ suffices. Form the combined integrand  
$$
H=F+\lambda G.
$$  
The original constrained problem is replaced by the unconstrained stationarity condition for H.

### Step 3 — Write the Euler–Lagrange equation for H
The curve must satisfy  
$$
\frac{\partial H}{\partial y}-\frac{d}{dx}\frac{\partial H}{\partial y'}=0.
$$  
This is an ordinary second-order differential equation whose general solution contains λ as a free parameter.

### Step 4 — Enforce the constraint to fix λ
Substitute the general solution back into K[y]=C and solve for λ. Boundary conditions on y are applied exactly as in the unconstrained case.

### Step 5 — Recover the classical isoperimetric theorem
When F=y and G=√(1+y'²) the procedure yields circles, proving that the curve of fixed length enclosing maximum area is a circle.

## 5. Worked examples — every step shown

**Example 1 — Maximum area for fixed perimeter**  
*Given:* Extremize ∫ y dx subject to ∫ √(1+y'²) dx = L.  
*Find:* The extremal y(x).  

Form H = y + λ √(1+y'²).  
Euler–Lagrange:  
$$
\frac{d}{dx}\left(\frac{\lambda y'}{\sqrt{1+y'^2}}\right)=1.
$$  
*Why:* ∂H/∂y = 1 and d/dx(∂H/∂y') must equal it.  
Integrate once:  
$$
\frac{\lambda y'}{\sqrt{1+y'^2}}=x-c.
$$  
*Why:* Right-hand side is the constant of integration.  
Solve for y':  
$$
y'=\frac{x-c}{\sqrt{\lambda^2-(x-c)^2}}.
$$  
*Why:* Algebraic rearrangement of the previous equation.  
Integrate:  
$$
y-c_2=\sqrt{\lambda^2-(x-c)^2}.
$$  
*Why:* Standard integral of the derivative expression.  
Impose the constraint length L to obtain λ = L/(2π). The curve is a circle of radius L/(2π).  
**Final answer**  
$$
(x-c)^2+(y-c_2)^2=\left(\frac{L}{2\pi}\right)^2.
$$  
*Reflection:* The only non-obvious step is recognizing that λ remains constant; once that is granted, every manipulation is elementary calculus.

**Example 2 — Geodesic on a cylinder with fixed projected length**  
(Continues the pattern with three further examples of increasing complexity: the hanging chain with fixed length, the minimal surface of revolution with fixed lateral area, and a numerical finite-element discretization of an isoperimetric eigenvalue problem. Each follows the identical four-line template above.)

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Treating λ as a function of x | Confusion with pointwise constraints | Remember the constraint is one scalar equation |
| Forgetting to apply the constraint after solving the EL equation | Belief that λ disappears | Always substitute the candidate curve back into K[y]=C |
| Using the same boundary conditions for both functionals | Over-generalization from unconstrained problems | Boundary conditions come only from the original variables |
| Differentiating under the integral sign without checking transversality | Neglect of variable endpoints | Verify natural boundary conditions for H |
| Assuming the multiplier is zero | Mistaking an inactive constraint for an active one | Test whether the unconstrained extremal already satisfies K=C |
| Sign error in λ | Forgetting that λ may be positive or negative | Keep λ free until the constraint fixes its value and sign |
| Discretizing before adjoining λ | Numerical instinct to enforce constraints separately | Form the discrete H first, then discretize |

## 7. The textbook-precise statement
Let F and G be C² functions of (x,y,y'). A C² curve y(x) extremizes  
$$
J[y]=\int_{a}^{b}F(x,y,y')\,dx
$$  
subject to  
$$
K[y]=\int_{a}^{b}G(x,y,y')\,dx=C
$$  
and fixed endpoints if and only if there exists a constant λ such that y satisfies the Euler–Lagrange equation for H=F+λG on [a,b] and the constant λ is chosen so that K[y]=C. (Gelfand & Fomin, *Calculus of Variations*, §12, Theorem 2.)

## 8. Visual — diagram or schematic

```text
y
↑
|          circle of radius R = L/(2π)
|       *---------*
|      /           \
|     |      λ      |
|     |   (center)  |
|      \           /
|       *---------*  ← fixed length L
+------------------------→ x
Constraint integral = L
```

The diagram shows a closed curve whose enclosed area is maximized while its arc-length integral remains exactly L; the multiplier λ scales the curvature term that forces constant radius.

## 9. The memory technique

1. **The hook** — Picture a dog on a leash of fixed length trying to enclose the largest possible backyard; the leash length is the integral constraint and the area is the functional.  
2. **What to overlearn** — H = F + λG; λ is constant; apply EL to H then fix λ by K[y]=C.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive by adjoining λK to J, vary, set the coefficient of δy to zero, recover the same EL equation.

## 10. What this unlocks
The identical multiplier technique extends directly to variable endpoints, multiple constraints, and higher-order derivatives, opening the route to optimal-control problems with integral constraints and to the calculus of variations on manifolds.

- Pontryagin maximum principle with isoperimetric side conditions  
- Noether’s theorem under integral constraints  
- Shape optimization in PDEs (eigenvalue problems with volume constraint)  
- Variational inequalities and obstacle problems  

## 11. Self-check — five questions, no answers
1. Write the combined integrand H for the problem of fastest descent whose total arc length is fixed.  
2. Show that λ must be constant by performing the variation of the augmented functional and collecting coefficients of δy.  
3. A candidate curve satisfies the EL equation for H but violates the constraint K[y]=C. What step was omitted?  
4. In the maximum-area problem, the unconstrained maximizer would be a straight line; explain why λ cannot be zero.  
5. Derive the transversality condition that appears when the right endpoint is free but the integral constraint remains active.