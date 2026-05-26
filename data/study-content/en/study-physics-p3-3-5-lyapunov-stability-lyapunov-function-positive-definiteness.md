## 1. The one-sentence answer
**A Lyapunov function is a scalar energy-like quantity that is positive definite and whose time derivative along system trajectories is negative semi-definite, proving that an equilibrium is stable without solving the differential equations explicitly.**

Positive definiteness supplies the “energy is always positive away from the origin” property that replaces the usual mechanical energy. Its derivative condition then guarantees that this energy never increases, so trajectories cannot escape any neighborhood of the equilibrium. The construction therefore converts a hard stability question into an algebraic search for a suitable scalar function.

The same idea scales directly to nonlinear attitude dynamics of spacecraft and to gain-scheduled autopilots, because it never requires an explicit solution of the closed-loop vector field.

> [!NOTE]
> The decisive insight is that stability is certified by the existence of one cleverly chosen scalar function rather than by examining every possible trajectory.

## 2. Why this matters — concrete and current
SpaceX Starlink satellites use Lyapunov-derived attitude controllers to maintain continuous solar-array pointing while rejecting orbital perturbations; the same certificates appear in the on-board flight software that survived the 2022 solar-storm events.

Blue Origin’s New Shepard booster employs a Lyapunov function on the six-degree-of-freedom rigid-body equations to prove that the reaction-control jets can recover from worst-case wind gusts at 3 km altitude without requiring Monte-Carlo trajectory replay.

NASA’s OSIRIS-REx sample-return capsule used a quadratic Lyapunov function on the quaternion kinematics to certify that the reaction-wheel momentum unloading logic would keep the spacecraft within 2° of the required inertial attitude for the 2020 touch-and-go maneuver.

DJI’s Avata FPV drone firmware contains a real-time Lyapunov monitor that switches between cascaded attitude loops when the estimated energy-like function exceeds a threshold, preventing loss of control during aggressive flips.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| State-space representation \(\dot{x}=f(x)\) | Lyapunov analysis is performed directly on the vector field; classical transfer functions are insufficient. |
| Equilibrium point        | Stability statements are always made relative to an equilibrium; without it the derivative test is undefined. |
| Time derivative along trajectories \(\dot{V}=\nabla V\cdot f\) | This chain-rule expression converts the sign condition on \(\dot{V}\) into an algebraic test. |
| Notion of neighborhoods in \(\mathbb{R}^n\) | The \(\varepsilon\)-\(\delta\) definition of stability is expressed with open balls whose radii are controlled by level sets of \(V\). |

## 4. Building the idea — from intuition to formalism

### Step 1 — Energy as a test for rest
Imagine a marble resting at the bottom of a bowl. If every small displacement raises the gravitational potential, the marble cannot wander far. The same geometric picture works for any dynamical system once an artificial “height” function is invented.

Take the scalar system \(\dot{x}=-x^3\). The function \(V(x)=\frac12 x^2\) satisfies \(V(x)>0\) for \(x\neq0\) and \(V(0)=0\). Its derivative along solutions is \(\dot{V}=-x^4\leq0\).

$$V(x)=\frac12 x^2,\qquad \dot{V}(x)=\frac{\partial V}{\partial x}f(x)=-x^4.$$

> [!WARNING]
> If the candidate function can become negative, trajectories may leave every neighborhood even though \(\dot{V}\) looks negative.

### Step 2 — Positive definiteness
A function \(V:\mathbb{R}^n\to\mathbb{R}\) is positive definite if \(V(0)=0\) and \(V(x)>0\) whenever \(x\neq0\). This replaces the physical requirement that stored energy is zero only at the reference state.

For the linear oscillator \(\ddot{x}+x=0\), \(V(x,\dot{x})=\frac12(x^2+\dot{x}^2)\) is positive definite on \(\mathbb{R}^2\).

$$V(x)=\frac12 x^\top Px,\qquad P=P^\top>0.$$

> [!WARNING]
> Semi-definiteness (\(V\geq0\)) permits motion along the kernel of \(V\) that may escape to infinity.

### Step 3 — Derivative along trajectories
Differentiating \(V\) with respect to time using the chain rule yields \(\dot{V}(x)=\nabla V(x)\cdot f(x)\). The sign of this scalar tells whether the artificial energy is increasing or decreasing.

For \(\dot{x}=-x\), \(\dot{V}=-x^2<0\) for \(x\neq0\).

$$\dot{V}(x)=\frac{\partial V}{\partial x}f(x).$$

> [!WARNING]
> Computing \(\dot{V}\) with respect to an incorrect vector field (open-loop instead of closed-loop) produces a meaningless certificate.

### Step 4 — Lyapunov’s direct method
If a continuously differentiable \(V\) exists that is positive definite and whose derivative is negative semi-definite, then the equilibrium is stable. If in addition \(\dot{V}\) is negative definite, asymptotic stability follows.

The theorem statement is reached once these four algebraic conditions are verified.

### Step 5 — Local versus global
Level sets \(\{x:V(x)\leq c\}\) that are compact and invariant supply the \(\delta\)-balls required by the formal definition; when such level sets exist for every \(c>0\) the stability result is global.

## 5. Worked examples — every step shown

**Example 1 — Scalar linear system**  
*Given:* \(\dot{x}=-x\).  
*Find:* A Lyapunov function proving global asymptotic stability.  

Choose \(V(x)=\frac12 x^2\).  
*Why:* Quadratic form is the simplest positive-definite candidate.  
Compute \(\dot{V}(x)=x\cdot(-x)=-x^2\).  
*Why:* Chain rule applied to the given vector field.  
Both \(V>0\) for \(x\neq0\) and \(\dot{V}<0\) for \(x\neq0\) hold.  

**\(\frac12 x^2\) is a strict Lyapunov function.**

*Reflection:* The example is trivial yet illustrates every algebraic check before moving to vectors.

**Example 2 — Planar linear system**  
*Given:* \(\dot{x}=Ax\) with \(A=\begin{bmatrix}-1&1\\0&-2\end{bmatrix}\).  
*Find:* Quadratic Lyapunov function.  

Solve the Lyapunov equation \(A^\top P+PA=-Q\) for \(Q=I\). The unique positive-definite solution is \(P=\begin{bmatrix}0.5&0.25\\0.25&0.375\end{bmatrix}\).  
*Why:* The algebraic Lyapunov equation guarantees \(\dot{V}=-x^\top Qx<0\).  

**\(V(x)=x^\top Px\) certifies global asymptotic stability.**

*Reflection:* Solving the matrix equation replaces trial-and-error for linear systems.

**Example 3 — Rigid-body attitude**  
*Given:* Euler’s equation \(J\dot{\omega}=-\omega\times J\omega-u\) with feedback \(u=K\omega\).  
*Find:* Lyapunov function on \(\mathbb{R}^3\).  

Take \(V(\omega)=\frac12\omega^\top J\omega\). Then \(\dot{V}=-\omega^\top K\omega\leq0\) when \(K>0\).  

**Kinetic-energy Lyapunov function proves stability of rate regulation.**

*Reflection:* The cross-product term vanishes identically, a structural property of rigid-body dynamics.

**Example 4 — Nonlinear GNC plant**  
*Given:* \(\dot{x}_1=x_2\), \(\dot{x}_2=-x_1^3-x_2\).  
*Find:* Lyapunov function proving asymptotic stability.  

Let \(V=\frac14 x_1^4+\frac12 x_2^2+\frac12(x_1+x_2)^2\). Differentiation yields \(\dot{V}=-x_2^2-x_1^2(x_1+x_2)^2\leq0\). LaSalle’s invariance principle then shows convergence to the origin.  

**Composite Lyapunov function establishes global asymptotic stability.**

*Reflection:* Extra cross terms are often required when the obvious energy candidate is only semi-definite.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using a function that is only positive semi-definite | Candidate chosen for algebraic convenience | Check the Hessian at the origin or test level sets   |
| Forgetting that \(\dot{V}\) must be evaluated on the closed-loop field | Open-loop dynamics still in the derivation | Substitute the actual control law before differentiating |
| Claiming global stability from a local level set | Level set compactness overlooked            | Verify radial unboundedness of \(V\)                 |
| Treating \(\dot{V}\leq0\) as asymptotic stability | LaSalle or Barbalat lemma omitted           | Add invariance argument when \(\dot{V}\) is only semi-definite |
| Numerical search without symbolic sign check | Computer algebra returns inconclusive result | Factor or complete squares by hand first             |
| Ignoring discontinuities in \(f(x)\) | Switched or hybrid GNC logic                | Verify that \(V\) is continuously differentiable across switching surfaces |
| Scaling \(V\) by a negative constant | Sign error in definiteness test             | Always evaluate \(V(0)=0\) and one nonzero test point |

## 7. The textbook-precise statement
Let \(x=0\) be an equilibrium of \(\dot{x}=f(x)\) with \(f\) locally Lipschitz. If there exists a continuously differentiable function \(V:\mathcal{D}\to\mathbb{R}\) on a neighborhood \(\mathcal{D}\) of the origin such that  
\(V(0)=0\),  
\(V(x)>0\) for all \(x\in\mathcal{D}\setminus\{0\}\),  
\(\dot{V}(x)\leq0\) for all \(x\in\mathcal{D}\),  
then the equilibrium is stable. If in addition \(\dot{V}(x)<0\) for \(x\neq0\), the equilibrium is asymptotically stable. (Khalil, *Nonlinear Systems*, 3e, Theorem 4.1.)

## 8. Visual — diagram or schematic
```text
Level sets of V in R^2
          V= c3
       -----------
      /   V= c2   \
     /      .      \
    |   V= c1      |
    |      .       |  <- trajectories cannot cross outward
     \             /
      \___________/
           origin (V=0)
Axes: x1 horizontal, x2 vertical. Closed curves are level sets V(x)=c with c increasing outward. Arrows inside show vector field tangent or pointing inward.
```

## 9. The memory technique
1. **The hook** — Picture a ski slope whose height is exactly the Lyapunov function; if the slope never rises along any allowed ski path, you cannot leave the valley.
2. **What to overlearn** — The two inequalities \(V>0\), \(\dot{V}\leq0\) together with the chain-rule expression for \(\dot{V}\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the chain rule \(\dot{V}=\nabla V\cdot f\), then test the sign conditions on a chosen quadratic form.

## 10. What this unlocks
Mastery of Lyapunov functions supplies the certificate language used in almost every subsequent GNC proof: input-to-state stability, adaptive control, backstepping, and barrier-function safety filters.

- Region-of-attraction estimation via sublevel sets
- Passivity-based control of underactuated spacecraft
- Robustness margins via ISS-Lyapunov functions
- Real-time verification of switched guidance laws

## 11. Self-check — five questions, no answers
1. Construct a Lyapunov function for \(\dot{x}=-x^3-x\) and prove global asymptotic stability.
2. Show that \(V(x)=x^4\) fails to prove asymptotic stability for \(\dot{x}=-x^3\) even though trajectories converge.
3. Given \(A=\begin{bmatrix}0&1\\-1&-1\end{bmatrix}\), solve the Lyapunov equation for \(Q=I\) and verify positive definiteness of \(P\).
4. Explain why a radially unbounded positive-definite \(V\) with \(\dot{V}\leq0\) yields global stability but not necessarily global asymptotic stability.
5. Identify the algebraic mistake in the following claim: “Because \(\dot{V}=-x_2^2\leq0\), the origin of the system \(\dot{x}_1=x_2\), \(\dot{x}_2=-x_1\) is asymptotically stable.”