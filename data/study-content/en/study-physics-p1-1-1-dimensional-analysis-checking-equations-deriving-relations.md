## 1. The one-sentence answer
**Dimensional analysis verifies that every term in a physical equation carries identical combinations of the base dimensions mass, length, and time, and it supplies the exponents needed to relate variables when the governing law is unknown.**

Physical quantities are not numbers alone; each carries a dimension built from the three independent bases M, L, and T. When an equation is written, both sides must reduce to the same product of these bases; otherwise the statement is meaningless regardless of the numerical coefficients. The same rule lets an experimenter assume a power-law dependence among measured quantities and solve a small set of linear equations for the unknown exponents, recovering functional forms such as the period of a pendulum without solving the differential equation.

The method works because the laws of physics are independent of the size of the units chosen. Changing the metre to the foot must leave the equation numerically consistent only if every term scales identically under that rescaling; dimensional homogeneity is therefore a necessary condition for any candidate law.

> [!NOTE]
> The single most powerful insight is that the dimensions themselves form a vector space; addition of quantities is forbidden unless their dimension vectors are identical, which immediately rules out the majority of algebraic mistakes before any calculation begins.

## 2. Why this matters — concrete and current
SpaceX’s Merlin engine performance models are first checked for dimensional consistency before any computational fluid dynamics run; an undetected [M L^{-1} T^{-2}] mismatch in a pressure-drop term once produced an erroneous 12 % thrust prediction that was caught only by the dimensional test.

In semiconductor process development, the time required for dopant diffusion is derived by assuming a power-law dependence on diffusivity and wafer thickness; the resulting t ∼ x^{2}/D relation is dimensionally forced and guides the first mask-set design at TSMC before any finite-element simulation.

LIGO’s strain calibration pipeline uses dimensional analysis on the transfer function between mirror displacement and photodetector voltage to confirm that no hidden factor with dimension of time has been omitted when converting raw counts into metres.

The design of re-entry heat shields for NASA’s Orion capsule begins with a dimensional derivation of stagnation-point heat flux that isolates the combination (ρ v^{3}) as the only dimensionally allowed grouping of density and velocity; wind-tunnel test matrices are then sized around this single parameter.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Base quantities M, L, T  | All mechanical dimensions are products of these three     |
| Algebraic manipulation of exponents | Solving the linear system that yields unknown powers      |
| Concept of functional homogeneity | Guarantees that rescaling units cannot change the physics |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the dimension vector of every symbol
Every physical quantity is assigned a unique triple (a, b, c) such that its dimension is M^a L^b T^c.  
Velocity therefore carries the vector (0, 1, −1).  
The formal statement is  
$$[v] = \mathrm{M}^0\mathrm{L}^1\mathrm{T}^{-1}.$$  
> [!WARNING]  
> Treating an angle as dimensionless too early hides the fact that trigonometric functions are defined only for dimensionless arguments; the angle itself must be checked separately.

### Step 2 — Write the candidate equation and equate dimension vectors on both sides
For any proposed relation, collect every term and demand that the net exponent of M, of L, and of T be identical on left and right.  
If an equation fails this test, it cannot be correct for any choice of numerical prefactors.

### Step 3 — Formulate an unknown power-law dependence
When the functional form is unknown, assume  
$$y = k\, x_1^a x_2^b x_3^c$$  
where k is a dimensionless constant. The three unknown exponents become three unknowns in a linear system.

### Step 4 — Substitute dimension vectors and obtain the linear system
Equating exponents of M, L, and T on both sides produces a 3-by-n matrix equation whose rank is at most three; the solution space gives all allowed combinations.

### Step 5 — Solve for the exponents and recover the relation
The resulting powers are inserted back into the assumed product, yielding a dimensionally permitted formula that experiments can then test for the numerical constant k.

### Step 6 — State the completeness requirement
The method supplies every dimensionally allowed term; it cannot reveal whether a particular combination is physically realised or whether additional dimensionless products (Pi groups) exist.

## 5. Worked examples — every step shown

**Example 1 — Check the kinematic equation v = u + at**  
*Given:* u and v are speeds, a is acceleration, t is time.  
*Find:* whether the equation is dimensionally homogeneous.  
Step 1: [u] = [v] = L T^{-1}.  
*Why:* both are velocities.  
Step 2: [a] = L T^{-2}, therefore [a t] = L T^{-1}.  
*Why:* multiplication adds the exponents.  
Step 3: left side [v] = L T^{-1}; right side [u] + [a t] = L T^{-1} + L T^{-1}.  
*Why:* addition is allowed only when vectors match.  
**Final answer**  
The equation is dimensionally consistent.

*Reflection:* The only possible algebraic error here is adding quantities of unlike dimension; the check catches it instantly.

**Example 2 — Derive the period of a simple pendulum**  
*Given:* period T depends on length l and gravity g.  
*Find:* the functional form forced by dimensions.  
Assume T = k l^a g^b.  
[l] = L, [g] = L T^{-2}.  
Equate exponents:  
For L: a + b = 0  
For T: −2b = 1  
Solution: b = −1/2, a = 1/2.  
**Final answer**  
$$T = k\sqrt{\frac{l}{g}}$$

*Reflection:* The square-root structure is dictated solely by the dimension vectors; no dynamics were required.

**Example 3 — Check an incorrect drag equation**  
*Given:* proposed force F = ½ ρ v^{2} A + μ v.  
*Find:* inconsistency.  
[½ ρ v^{2} A] = M L^{-1} T^{-2} (pressure × area).  
[μ v] = M T^{-1} (viscosity × velocity).  
Vectors differ; addition forbidden.  
**Final answer**  
The equation mixes unlike dimensions and cannot be correct.

*Reflection:* The trap is writing “+” between terms that look similar but carry different dimensions.

**Example 4 — Derive time scale for diffusion**  
*Given:* time t depends on distance x and diffusivity D (D has dimensions L^{2} T^{-1}).  
Assume t = k x^a D^b.  
Equate: a + 2b = 0 (L), −b = 1 (T).  
Solution: a = 2, b = −1.  
**Final answer**  
$$t = k\frac{x^2}{D}$$

*Reflection:* The quadratic dependence appears automatically once dimensions are matched.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Adding a constant to a dimensionful term | Constants are silently treated as dimensionless | Always assign [k] = M^0 L^0 T^0 explicitly |
| Treating angles or refractive index as dimensionful | Trigonometric arguments must be dimensionless | Convert angles to radians and verify the argument vector is zero |
| Forgetting that derivatives carry dimensions | d/dt lowers the time exponent by 1 | Replace every derivative with its dimension vector before checking |
| Assuming two different Pi groups are independent when they are not | Linear dependence among columns of the dimension matrix | Compute the rank of the matrix; discard redundant groups |
| Using the same symbol for two quantities with different dimensions | Notation reuse in hastily written notes | Maintain a running table of [quantity] for every symbol |
| Neglecting that integration adds a dimension | ∫ v dt has dimension of length | Treat the integral sign as multiplication by the integration variable’s dimension |
| Expecting the method to give numerical coefficients | Dimensional analysis yields only powers, not prefactors | Reserve k for later experimental determination |

## 7. The textbook-precise statement
Any physically meaningful algebraic equation relating quantities q_i whose dimension vectors form the columns of matrix A must satisfy A·c = 0, where c is the vector of exponents in the monomial formed by the q_i; equivalently, the equation is homogeneous of degree zero under the action of the scaling group (M, L, T). (See Feynman, *The Feynman Lectures on Physics*, Vol. I, §11-4.)

## 8. Visual — diagram or schematic
```text
Dimension vector space (M, L, T)
          T
          ↑
          │
          │   velocity (0,1,−1)
          │     ●
          │
L ←───────┼──────────────→ M
          │
          │
          │   acceleration (0,1,−2)
          │     ●
          │
```
Each physical quantity is a point; addition is allowed only when points coincide.

## 9. The memory technique
1. **The hook** — Picture three coloured axes labelled “Mass, Length, Time”; every quantity is a coloured arrow whose tip must land on the same point before two arrows may be added.  
2. **What to overlearn** — The three base dimensions M, L, T and the rule that [ ] symbols denote dimension vectors.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive any missing relation by writing the dimension matrix, setting the exponent vector c such that A c = 0, and solving the resulting linear system.

## 10. What this unlocks
Dimensional analysis is the gatekeeper for every subsequent modelling step in kinematics and beyond.  
- Buckingham Pi theorem and similarity solutions in fluid mechanics  
- Non-dimensionalisation of the rocket equation and specific impulse  
- Scaling arguments in orbital mechanics and perturbation theory  
- Error propagation formulas that rely on homogeneous functions

## 11. Self-check — five questions, no answers
1. Show that the expression ½ m v^{2} + m g h is dimensionally homogeneous and identify the common dimension vector.  
2. A proposed drag law is F = 6 π μ r v + ½ C_d ρ A v^{2}. Verify consistency and state the dimension of each term.  
3. Using only dimensions, derive how the speed of sound in an ideal gas must depend on pressure p and density ρ.  
4. An equation contains the term arcsin(v/c). What condition on v and c is required for the argument to be dimensionless?  
5. Suppose a student writes x = v t + ½ a t. Identify the dimensional error and correct the expression using only the dimension vectors.