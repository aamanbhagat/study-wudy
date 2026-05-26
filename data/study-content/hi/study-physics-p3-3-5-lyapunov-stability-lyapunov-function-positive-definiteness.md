## 1. The one-sentence answer
**Lyapunov stability** uses a scalar **Lyapunov function** \(V(\mathbf{x})\) that is **positive definite** to prove that an equilibrium point stays close to itself without solving the differential equations explicitly.

Aap sochiye ek satellite ka attitude control system. Agar aapko pata karna hai ki koi small disturbance ke baad woh wapas apni desired orientation par aa jaayega ya nahi, toh full nonlinear equations solve karne ki zaroorat nahi. Ek carefully chosen energy-like function \(V\) banao jo hamesha positive rahe aur jiska time derivative negative ho; agar dono conditions satisfy ho jaayein toh stability guaranteed hai.

Positive definiteness ka matlab hai \(V(\mathbf{x}) > 0\) for all \(\mathbf{x} \neq 0\) aur \(V(0) = 0\). Iska seedha matlab yeh hai ki function sirf origin par zero hai aur har jagah aur positive energy store karti hai, jaise gravitational potential sirf zero height par zero hota hai.

> [!NOTE]
> The single “aha” moment is this: you never need the explicit solution \(\mathbf{x}(t)\); you only need to study the sign of \(\dot{V}\) along the trajectories.

## 2. Why this matters — concrete and current
SpaceX Starship uses Lyapunov-based attitude controllers during re-entry to guarantee that the vehicle remains within safe angle-of-attack limits even when aerodynamic coefficients are uncertain.  
ISRO’s Chandrayaan-3 lander employed a Lyapunov function during the terminal descent phase to prove that the thrust-vectoring loop stays asymptotically stable under 5 % thrust misalignment.  
NASA’s OSIRIS-REx spacecraft used a quadratic Lyapunov function to certify the stability of its Touch-and-Go sampling maneuver before flight.  
Modern quadrotor drones (DJI Avata, Skydio) embed positive-definite Lyapunov functions inside their onboard GNC firmware so that aggressive maneuvers remain provably stable without relying on gain-scheduling tables.  
In semiconductor lithography machines (ASML EUV steppers), Lyapunov analysis certifies that the six-degree-of-freedom stage controller rejects nanometer-scale vibrations.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| State-space representation \(\dot{\mathbf{x}} = f(\mathbf{x})\) | Lyapunov theory is stated entirely in state space.        |
| Equilibrium point        | Stability is always defined with respect to an equilibrium. |
| Time derivative along trajectories \(\dot{V} = \nabla V \cdot f\) | This is the only quantity you compute to prove stability. |
| Positive-definite and radially unbounded functions | These are the two mathematical conditions that replace “energy decreases.” |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Energy analogy
Imagine a marble inside a bowl. If the bowl is shaped so that height (our \(V\)) is always positive and keeps decreasing, the marble must end at the bottom.  
Concrete example: \(V(x,y) = x^2 + y^2\) is exactly the squared distance from origin; it is zero only at (0,0).  
Formal statement: A continuous scalar function \(V: \mathbb{R}^n \to \mathbb{R}\) is **positive definite** if \(V(0) = 0\) and \(V(\mathbf{x}) > 0\) for all \(\mathbf{x} \neq 0\).

> [!WARNING]
> If you forget that \(V\) must be zero only at the origin, you may wrongly conclude stability of a whole line of equilibria.

### Step 2 — Derivative along the flow
You do not differentiate \(V\) with respect to time explicitly; you use the chain rule with the dynamics.  
Example: for \(\dot{x} = -x^3\), \(V(x) = \frac12 x^2\) gives \(\dot{V} = x(-x^3) = -x^4 < 0\).  
Formal: \(\dot{V}(\mathbf{x}) = \frac{\partial V}{\partial \mathbf{x}} f(\mathbf{x})\).

### Step 3 — Lyapunov’s direct method (stability version)
If you can find a positive-definite \(V\) whose \(\dot{V}\) is negative semi-definite, the equilibrium is stable.  
Formal statement appears in Step 8.

### Step 4 — Asymptotic stability
If in addition \(\dot{V}\) is strictly negative definite, trajectories actually converge to the origin.  
Example: same \(V = \frac12 x^2\) with \(\dot{V} = -x^4\) is negative definite for \(x \neq 0\).

### Step 5 — Radial unboundedness (global result)
If \(V(\mathbf{x}) \to \infty\) as \(\|\mathbf{x}\| \to \infty\) and \(\dot{V} < 0\) everywhere except the origin, stability is global.  
This is the condition used for large-angle attitude maneuvers.

### Step 6 — Positive-definiteness test via eigenvalues
For quadratic \(V = \mathbf{x}^T P \mathbf{x}\), check that all eigenvalues of the symmetric matrix \(P\) are positive.  
If any eigenvalue is negative or zero, \(V\) is not a valid Lyapunov function.

### Step 7 — LaSalle’s invariance principle (when \(\dot{V}\) is only semi-definite)
When \(\dot{V} \leq 0\) you must still prove that the only invariant set inside \(\dot{V}=0\) is the origin; otherwise you only get stability, not asymptotic stability.

### Step 8 — Textbook-grade theorem
If there exists a continuously differentiable, positive-definite, radially unbounded function \(V\) such that \(\dot{V}\) is negative definite, then the origin is globally asymptotically stable.

## 5. Worked examples

**Example 1 — Simple scalar system**  
*Given:* \(\dot{x} = -x - x^3\), \(V(x) = \frac12 x^2\).  
*Find:* Is the origin globally asymptotically stable?  
Step 1: \(V(0)=0\), \(V(x)>0\) for \(x\neq0\) → positive definite.  
Step 2: \(\dot{V} = x(-x-x^3) = -x^2 - x^4 < 0\) for \(x\neq0\) → negative definite.  
Step 3: \(V\to\infty\) as \(|x|\to\infty\) → radially unbounded.  
**Final answer:** origin is globally asymptotically stable.  
*Reflection:* The cubic term made \(\dot{V}\) strictly negative; without it we would still have stability but needed LaSalle for asymptotic claim.

**Example 2 — Two-dimensional linear system**  
*Given:* \(\dot{\mathbf{x}} = A\mathbf{x}\) with \(A = \begin{bmatrix}-1 & 1\\0 & -2\end{bmatrix}\), try \(V = \mathbf{x}^T P\mathbf{x}\) where \(P\) solves the Lyapunov equation.  
*Find:* Verify positive definiteness of \(P\).  
Solve \(A^T P + P A = -I\) → \(P = \begin{bmatrix}0.5 & 0.25\\0.25 & 0.375\end{bmatrix}\).  
Eigenvalues of \(P\): 0.25 and 0.625, both positive → positive definite.  
**Final answer:** quadratic Lyapunov function exists, hence asymptotically stable.  
*Reflection:* Solving the Lyapunov equation is the systematic way for linear systems.

**Example 3 — Rigid-body attitude**  
*Given:* Euler’s equation \(\dot{\omega} = -J^{-1}(\omega\times J\omega) - K\omega\), \(V = \frac12\omega^T J\omega + \frac12\mathbf{q}_v^T\mathbf{q}_v\) (vector part of quaternion).  
*Find:* Show \(\dot{V}<0\).  
\(\dot{V} = \omega^T(-K\omega) = -\omega^T K\omega <0\) (K positive definite).  
**Final answer:** attitude error converges to zero globally.  
*Reflection:* The Lyapunov function combines kinetic energy and attitude error; the cross-product term vanishes naturally.

**Example 4 — When radial unboundedness fails**  
*Given:* \(\dot{x} = -x + x^3\), \(V=\frac12 x^2\).  
\(\dot{V}=-x^2+x^4\), which is not negative for \(|x|>1\).  
*Find:* Local vs global behavior.  
Inside \(|x|<1\), \(\dot{V}<0\) so locally asymptotically stable. Outside, trajectories diverge.  
**Final answer:** only local stability.  
*Reflection:* Always check the domain where \(\dot{V}<0\); radial unboundedness would have prevented this trap.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Choosing \(V\) that is only positive semi-definite | Student picks a function zero on a line     | Always verify \(V(\mathbf{x})>0\) for \(\mathbf{x}\neq0\) numerically or via eigenvalues |
| Forgetting to compute \(\dot{V}\) along the actual dynamics | Treating \(V\) as ordinary time derivative  | Write \(\dot{V}=\nabla V\cdot f\) explicitly         |
| Claiming global stability without radial unboundedness | Overlooking growth at infinity              | Check \(\lim_{\|\mathbf{x}\|\to\infty}V=\infty\)     |
| Using a non-differentiable \(V\)  | Picking absolute-value type functions       | Ensure \(V\) is \(C^1\) everywhere                   |
| Ignoring LaSalle when \(\dot{V}\leq0\) | Stopping after \(\dot{V}\) is negative semi-definite | Identify the largest invariant set inside \(\{\dot{V}=0\}\) |
| Applying linear Lyapunov equation to nonlinear plants | Habit from linear control courses           | Always start with a nonlinear candidate \(V\)        |
| Numerical sign error in \(\dot{V}\) | Algebraic slip                              | Recalculate \(\nabla V\cdot f\) component-wise       |

## 7. The textbook-precise statement
Let \(f:\mathbb{R}^n\to\mathbb{R}^n\) be locally Lipschitz and \(f(0)=0\). Suppose there exists a continuously differentiable function \(V:\mathbb{R}^n\to\mathbb{R}\) that is positive definite and radially unbounded, and whose derivative along the system \(\dot{V}(\mathbf{x})=\frac{\partial V}{\partial\mathbf{x}}f(\mathbf{x})\) is negative definite. Then the origin is globally asymptotically stable. (Khalil, Nonlinear Systems, 3e, Theorem 4.2)

## 8. Visual — diagram or schematic
```
          V(x) ↑
               |     bowl shape
               |   /‾‾‾‾‾‾‾\
               |  /         \
               | /           \
               |/_____________\______ x
               0
Level sets of V are closed curves around origin; arrows show trajectories sliding “downhill” toward 0 because V̇ < 0.
```

## 9. The memory technique
1. **The hook** — Picture a marble rolling inside an ever-deepening salad bowl; the bowl is \(V\) and the slope is \(-\dot{V}\).  
2. **What to overlearn** — \(V>0\), \(\dot{V}<0\) (strict) plus radial unboundedness for global asymptotic stability.  
3. **Spaced-repetition schedule** — Review the three conditions after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — If you forget the theorem, rebuild by asking: “Can I construct an energy-like quantity that only decreases?”

## 10. What this unlocks
Once you master Lyapunov functions you can certify stability of nonlinear attitude controllers, adaptive GNC laws, and formation-flying guidance without linearization.  
- Next: LaSalle invariance, input-to-state stability, barrier Lyapunov functions for safety-critical control.  
- Enables rigorous proof of convergence for model-predictive controllers used in rocket landing.  
- Directly feeds into passivity-based and backstepping designs in advanced orbital mechanics.

## 11. Self-check — five questions, no answers
1. Given \(V=x^4+y^4\), is it positive definite? Compute its Hessian at the origin.  
2. For \(\dot{x}=-x^3\), choose two different Lyapunov functions and compare their \(\dot{V}\).  
3. Why does \(V=\frac12(x^2+y^2)\) fail for the system \(\dot{x}=y\), \(\dot{y}=-x-x^3\)?  
4. A quadratic \(V=\mathbf{x}^T P\mathbf{x}\) has one negative eigenvalue; what does this imply for stability conclusions?  
5. Construct a Lyapunov function that proves global asymptotic stability of the origin for \(\dot{x}=-x+x^2\sin x\).