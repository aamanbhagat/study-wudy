## 1. The one-sentence answer
**Lagrange points L1–L5 are the five equilibrium solutions of the circular restricted three-body problem (CR3BP) where the net force (gravity plus centrifugal) vanishes in the co-rotating frame, so a massless third body stays fixed relative to the two primaries.**

In the rotating frame the two massive bodies sit still on the x-axis while a test particle feels both gravitational accelerations and the fictitious centrifugal term. Setting the gradient of the effective potential to zero yields exactly five algebraic solutions: three collinear points L1, L2, L3 that lie on the line joining the primaries, and two equilateral points L4 and L5 that form 60° triangles with them. Linearising the equations of motion about each point and examining the eigenvalues of the Jacobian tells us which of these equilibria are stable.

> [!NOTE]
> The single deepest insight is that stability is decided entirely by the mass parameter \(\mu\): only L4 and L5 can be linearly stable, and only when \(\mu < \mu_c \approx 0.0385\).

## 2. Why this matters — concrete and current
NASA’s James Webb Space Telescope sits at the Sun–Earth L2 point, 1.5 million km anti-sunward, where the combined gravitational and centrifugal forces keep it in a halo orbit with almost no station-keeping fuel.  
ESA’s Gaia mission and the forthcoming Euclid telescope also operate at Sun–Earth L2; their Lissajous orbits exploit the same equilibrium so that the Sun, Earth and spacecraft remain collinear, simplifying thermal and communications design.  
The Lucy mission will visit the Sun–Jupiter L4 and L5 Trojan asteroids; these bodies are trapped at the stable equilateral points and have remained there for 4.5 billion years.  
Several commercial lunar-gateway concepts place a crewed station at Earth–Moon L2 so that continuous line-of-sight to both Earth and the lunar far side is maintained with minimal propellant.  
In stellar dynamics, the stability boundary \(\mu_c\) derived from the CR3BP governs whether planets can share a stable orbit with a binary star, directly affecting habitability models for circumbinary planets such as Kepler-16b.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Rotating reference frames | All five points are equilibria only in the synodic frame rotating with the primaries |
| Effective potential      | Equilibrium condition is \(\nabla U = 0\); stability follows from the Hessian of \(U\) |
| Linearised ODEs & eigenvalues | Small displacements obey \(\dot{\mathbf{x}} = A\mathbf{x}\); eigenvalues of \(A\) decide stability |
| Mass parameter \(\mu\)   | Normalised mass ratio that collapses the entire family of solutions to a single parameter |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Effective potential in the synodic frame
In the frame rotating with angular velocity \(n = 1\) (normalised units), the test particle feels gravity from both primaries plus a centrifugal term. The scalar effective potential is
\[
U(x,y) = \frac{1}{2}(x^2 + y^2) + \frac{1-\mu}{r_1} + \frac{\mu}{r_2}.
\]
Equilibrium points satisfy \(\partial U/\partial x = 0\), \(\partial U/\partial y = 0\).

### Step 2 — Normalised equations of motion
With distances scaled so that the primary separation is 1 and \(G(m_1+m_2)=1\), the acceleration equations become
\[
\ddot{x}-2\dot{y} = \frac{\partial U}{\partial x}, \qquad \ddot{y}+2\dot{x} = \frac{\partial U}{\partial y}.
\]
The Coriolis terms \(-2\dot{y}\) and \(+2\dot{x}\) appear because the frame itself is rotating.

> [!WARNING]
> Forgetting the factor of 2 in the Coriolis acceleration produces eigenvalues whose real parts have the wrong sign and therefore the wrong stability conclusion.

### Step 3 — Collinear points L1, L2, L3
Setting \(y=0\) reduces the equilibrium condition to a quintic equation in \(x\). The three real roots inside the intervals \((-\infty,-1)\), \((-1,0)\) and \((0,1)\) correspond to L3, L1 and L2 respectively. No closed algebraic form exists; the roots are found numerically to arbitrary precision.

### Step 4 — Equilateral points L4 and L5
Substituting the ansatz \(r_1 = r_2 = 1\) immediately yields the two solutions
\[
(x,y) = \Bigl(\frac12-\mu,\ \pm\frac{\sqrt{3}}{2}\Bigr).
\]
These are the only equilibria off the x-axis.

### Step 5 — Linearisation and the state matrix
Shift origin to an equilibrium \((x_0,y_0)\) and let \(\xi = x-x_0\), \(\eta = y-y_0\). The linear system is
\[
\begin{pmatrix}\dot{\xi}\\\dot{\eta}\\\ddot{\xi}\\\ddot{\eta}\end{pmatrix}
= A
\begin{pmatrix}\xi\\\eta\\\dot{\xi}\\\dot{\eta}\end{pmatrix},
\quad
A = 
\begin{pmatrix}
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 \\
U_{xx} & U_{xy} & 0 & 2 \\
U_{yx} & U_{yy} & -2 & 0
\end{pmatrix}.
\]
The eigenvalues of \(A\) determine stability.

### Step 6 — Characteristic equation and Routh’s criterion
The characteristic polynomial factors into a biquadratic whose roots are purely imaginary only when
\[
U_{xx}U_{yy}-U_{xy}^2 > 0 \quad\text{and}\quad 1+U_{xx}+U_{yy}>0.
\]
Evaluating the second derivatives at L4/L5 recovers the classical stability limit \(\mu < (1-\sqrt{69}/9)/2 \approx 0.03852\).

## 5. Worked examples — har step show karo

**Example 1 — Locate Sun–Earth L2**  
*Given:* \(\mu = 3.003\times10^{-6}\).  
*Find:* \(x\) coordinate of L2 to six decimals.  
The quintic \(x^5-(3-\mu)x^4+\dots=0\) is solved numerically; the root slightly larger than 1 is \(x=1.010034\).  
*Why:* Newton iteration converges in four steps once a starting guess \(x>1\) is supplied.  
**1.010034**

*Reflection:* The offset 0.010034 AU is exactly where JWST is placed.

**Example 2 — Verify L4 coordinates**  
*Given:* \(\mu=0.3\).  
*Find:* \((x,y)\) of L4.  
Direct substitution yields \(x=0.5-0.3=0.2\), \(y=\sqrt{3}/2\approx0.866025\).  
*Why:* The distance condition \(r_1=r_2=1\) forces the equilateral geometry.  
**0.200000, 0.866025**

*Reflection:* Coordinates are independent of any further approximation.

**Example 3 — Eigenvalues at Sun–Earth L1**  
*Given:* \(\mu=3\times10^{-6}\), equilibrium \(x\approx0.99\).  
*Find:* eigenvalues of \(A\).  
Hessian entries evaluate to \(U_{xx}\approx8.0\), \(U_{yy}\approx-3.0\); the characteristic equation \(\lambda^4+2\lambda^2-8=0\) yields one real positive root \(\lambda\approx1.86\).  
*Why:* Positive real eigenvalue implies saddle instability.  
**One positive real eigenvalue → unstable**

*Reflection:* All three collinear points are always unstable.

**Example 4 — Stability boundary for \(\mu=0.04\)**  
*Given:* \(\mu=0.04 > \mu_c\).  
*Find:* sign of eigenvalues at L4.  
Routh discriminant becomes negative; a pair of eigenvalues acquires positive real part.  
*Why:* The Hopf bifurcation at \(\mu_c\) turns the centre into a saddle-focus.  
**L4 unstable for \(\mu=0.04\)**

*Reflection:* Jupiter’s Trojans remain safe because \(\mu_\text{Jupiter}\approx0.001< \mu_c\).

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Omitting Coriolis factor of 2     | Confusing inertial and rotating accelerations       | Always write the full velocity-dependent terms first |
| Treating L4/L5 as always stable   | Ignoring the critical mass ratio \(\mu_c\)          | Check \(\mu < 0.03852\) before claiming stability    |
| Solving the quintic analytically  | No closed-form roots exist                          | Use numerical root finders and verify to 10 decimals |
| Forgetting normalisation \(n=1\)  | Units become inconsistent                           | Set \(G(m_1+m_2)=1\) and separation = 1 from the start |
| Linearising about the wrong origin| Shifting coordinates after instead of before        | Translate the state vector before forming matrix \(A\) |
| Sign error in \(U_{xy}\)          | Partial derivative slip                             | Compute all four second derivatives symbolically once |

## 7. The textbook-precise statement
In the circular restricted three-body problem the equations of motion in the synodic frame admit exactly five equilibrium solutions. Three of these solutions lie on the line joining the primaries and are always linearly unstable. The remaining two solutions form equilateral triangles with the primaries and are linearly stable if and only if the mass parameter satisfies
\[
\mu < \frac{1}{2}\Bigl(1-\sqrt{\frac{69}{9}}\Bigr)\approx0.0385209.
\]
(See Murray & Dermott, *Solar System Dynamics*, Cambridge University Press, 1999, §3.3–3.4.)

## 8. Visual — diagram or schematic
```
          L4
         /  \
        /    \
       M2-----M1-----L1-----L2
        \    /
         \  /
          L5
```
M1 (larger mass) at \((-\mu,0)\), M2 at \((1-\mu,0)\). L1 lies between them, L2 beyond M2, L3 beyond M1. L4 and L5 sit at 60° above and below the x-axis.

## 9. The memory technique
1. **The hook** — Picture five tiny marbles balanced on a spinning turntable between two heavy bowling balls; only the two “side” marbles at 60° stay put without falling.  
2. **What to overlearn** — The stability limit \(\mu_c \approx 0.0385\) and the fact that only L4/L5 can be stable.  
3. **Spaced-repetition schedule** — Review the five locations at 1 day, eigenvalues at 3 days, \(\mu_c\) derivation at 7 days, full linearisation at 16 days, and a Trojan asteroid example at 35 days.  
4. **First-principles fallback** — Re-derive the effective potential \(U\), set its gradient to zero, then form the 4×4 state matrix and inspect its eigenvalues.

## 10. What this unlocks
- Halo-orbit design and station-keeping budgets for libration-point missions.  
- Trojan and Hilda asteroid families in the Solar System.  
- Transit-orbit and weak-stability-boundary trajectories used by low-thrust missions.  
- Extension to the elliptic restricted problem and to four-body “butterfly” orbits.  
- Linear stability analysis techniques that transfer directly to any autonomous Hamiltonian system.

## 11. Self-check — five questions, no answers
1. In normalised units, what is the exact coordinate pair of the Sun–Earth L4 point when \(\mu=3\times10^{-6}\)?  
2. Show that the characteristic equation at any collinear point always possesses at least one positive real root.  
3. For the Earth–Moon system (\(\mu\approx0.0123\)), is L5 linearly stable? Compute the eigenvalues to confirm.  
4. A student forgets the Coriolis term; what spurious conclusion does she reach about L1 stability?  
5. Derive the quintic equation satisfied by the x-coordinate of L2 starting from \(\partial U/\partial x=0\).