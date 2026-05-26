## 1. The one-sentence answer
**The Hamiltonian is the Legendre transform of the Lagrangian that converts the dynamics from velocity-based coordinates to momentum-based coordinates via the exact relation \(H = \sum_i p_i \dot{q}_i - L\).**

Iska matlab yeh hai ki jab aapke paas Lagrangian \(L(q, \dot{q}, t)\) hota hai, to aap velocities \(\dot{q}_i\) ko conjugate momenta \(p_i = \partial L / \partial \dot{q}_i\) se replace karke ek new function banate ho jo ab position aur momentum par depend karta hai. Yeh transformation energy-like quantity deta hai jab time-independent constraints hon.

Aap isko is tarah soch sakte ho: Lagrangian kinetic minus potential energy hota hai aur velocities ko input leta hai, lekin Hamiltonian total energy ko momentum ke through express karta hai, jo phase space mein trajectories draw karne ke liye natural hota hai.

> [!NOTE]
> The single most important “aha” is that \(H\) equals the total energy \(T + V\) only when the Lagrangian is quadratic in velocities and scleronomic; otherwise \(H\) is simply the Legendre transform and need not equal mechanical energy.

## 2. Why this matters — concrete and current
SpaceX uses Hamiltonian formulations inside their trajectory-optimization software for Falcon 9 booster return-to-launch-site guidance; the primer vector theory of Lawden is rewritten as a Hamiltonian boundary-value problem so that the costate equations become \(\dot{p} = -\partial H / \partial q\).

ISRO’s interplanetary mission design teams (Mangalyaan-2 trajectory planning) employ Pontryagin’s minimum principle, whose core object is the control Hamiltonian; switching curves for finite-thrust arcs are obtained by inspecting the switching function derived from \(H\).

In superconducting quantum circuits at Google Quantum AI, the Hamiltonian of a transmon qubit array is obtained via Legendre transform of the circuit Lagrangian; this lets engineers read off the interaction terms \(p_i p_j / C_{ij}\) directly in the charge basis.

Semiconductor foundries modelling MEMS resonators for timing chips convert the Euler-Lagrange equations of the elastic diaphragm into Hamiltonian form so that symplectic integrators can be used for long-term phase-noise prediction without artificial damping.

ESA’s JUICE mission navigation team propagates the six-dimensional phase-space state of the spacecraft around Ganymede using Hamiltonian Monte Carlo sampling to quantify gravitational-parameter uncertainties.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Lagrangian \(L = T - V\) | Starting point; Hamiltonian is defined from it            |
| Generalised coordinates \(q_i\) and velocities \(\dot{q}_i\) | Required to define momenta and perform the transform      |
| Partial derivatives      | Both the definition of \(p_i\) and the transform itself   |
| Total vs partial time derivative | Needed to prove \(\frac{dH}{dt} = -\frac{\partial L}{\partial t}\) |

Agar aapko Lagrangian mechanics ya partial derivatives comfortable nahi hain, to pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — From velocities to momenta
Aap Lagrangian ko velocities ke through jaante ho. Conjugate momentum define karte hain taaki har velocity ko ek “dual” variable mil jaaye.

Example: 1-D free particle ke liye \(L = \frac12 m \dot{x}^2\), momentum \(p = m\dot{x}\).

Formal statement:
\[
p_i \equiv \frac{\partial L}{\partial \dot{q}_i}
\]

> [!WARNING]
> Agar aap \(p_i\) ko galat define karoge (e.g., velocity ke saath multiply karke), to pura transform inconsistent ho jaayega aur Hamilton’s equations galat energy conservation denge.

### Step 2 — The differential of the Lagrangian
Lagrangian ka total differential likho:
\[
dL = \sum_i \frac{\partial L}{\partial q_i} dq_i + \sum_i \frac{\partial L}{\partial \dot{q}_i} d\dot{q}_i + \frac{\partial L}{\partial t} dt
\]
Right-hand side mein \(\frac{\partial L}{\partial \dot{q}_i} = p_i\) daal do.

### Step 3 — Construct the differential of \(H\)
Ab \(H \equiv \sum p_i \dot{q}_i - L\) define karo aur uska differential lo. \(p_i d\dot{q}_i\) terms cancel ho jaate hain.

Formal result:
\[
dH = \sum_i \dot{q}_i dp_i - \sum_i \frac{\partial L}{\partial q_i} dq_i - \frac{\partial L}{\partial t} dt
\]

### Step 4 — Read off Hamilton’s equations
Compare coefficients of \(dq_i\) and \(dp_i\):
\[
\dot{q}_i = \frac{\partial H}{\partial p_i}, \qquad \dot{p}_i = -\frac{\partial H}{\partial q_i}
\]

### Step 5 — Time evolution of \(H\)
Agar \(L\) explicitly time par depend nahi karta, to \(H\) conserved rehta hai.

### Step 6 — Textbook-grade definition
The Hamiltonian is the function on the cotangent bundle obtained by the fibre-wise Legendre transform of the Lagrangian.

## 5. Worked examples — har step show karo

**Example 1 — Simple harmonic oscillator**
*Given:* \(L = \frac12 m \dot{x}^2 - \frac12 k x^2\)
*Find:* \(H(x,p)\)

Step 1: \(p = \partial L / \partial \dot{x} = m \dot{x}\)
Step 2: Solve for velocity: \(\dot{x} = p/m\)
Step 3: \(H = p \dot{x} - L = p(p/m) - (\frac12 m (p/m)^2 - \frac12 k x^2) = p^2/(2m) + \frac12 k x^2\)

*Why* each move: momentum definition se velocity nikaali, phir direct substitution ki.

**Final answer**
\[H = \frac{p^2}{2m} + \frac12 k x^2\]

*Reflection:* Quadratic Lagrangian ki wajah se \(H\) exactly total energy ban gaya; yeh general nahi hota.

**Example 2 — Relativistic free particle**
*Given:* \(L = -m c^2 \sqrt{1 - v^2/c^2}\)
*Find:* \(H\)

\(p = \gamma m v\), invert to \(v = pc^2/E\), substitute to obtain \(H = \sqrt{p^2 c^2 + m^2 c^4}\).

*Why:* Legendre transform relativistic energy-momentum relation deta hai.

**Final answer**
\[H = \sqrt{(pc)^2 + (mc^2)^2}\]

*Reflection:* Even though \(L\) velocity mein quadratic nahi, \(H\) still equals total relativistic energy.

**Example 3 — Central force in polar coordinates**
*Given:* \(L = \frac12 m(\dot{r}^2 + r^2 \dot{\theta}^2) - V(r)\)
*Find:* \(H(r,\theta,p_r,p_\theta)\)

\(p_r = m\dot{r}\), \(p_\theta = m r^2 \dot{\theta}\)
\[
H = \frac{p_r^2}{2m} + \frac{p_\theta^2}{2m r^2} + V(r)
\]

*Why:* Angular momentum term \(p_\theta^2/2mr^2\) effective potential banata hai.

**Final answer**
\[H = \frac{p_r^2}{2m} + \frac{p_\theta^2}{2m r^2} + V(r)\]

*Reflection:* Conserved \(p_\theta\) se orbit equation seedha mil jaata hai.

**Example 4 — Time-dependent driven oscillator**
*Given:* \(L = \frac12 m \dot{x}^2 - \frac12 k x^2 + f(t)x\)
*Find:* \(H\) and \(\frac{dH}{dt}\)

\(H = p^2/2m + \frac12 k x^2 - f(t)x\)
\[
\frac{dH}{dt} = -\frac{\partial L}{\partial t} = -f'(t)x
\]

*Why:* Explicit time dependence ki wajah se energy conserved nahi.

**Final answer**
\[H = \frac{p^2}{2m} + \frac12 k x^2 - f(t)x, \quad \frac{dH}{dt} = - \dot{f}(t)x\]

*Reflection:* Hamiltonian ab mechanical energy se alag hai; yeh trap bahut common hai.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming \(H \equiv T + V\) always | Textbooks mostly show quadratic cases | Check whether \(L\) is homogeneous quadratic in \(\dot{q}\); if not, compute \(H\) explicitly |
| Forgetting to express \(\dot{q}\) in terms of \(p\) | Students leave \(\dot{q}\) in final \(H\) | Always solve the momentum definition for velocity before substitution |
| Sign error in \(\dot{p} = -\partial H/\partial q\) | Confusing with Euler-Lagrange sign | Remember the minus sign comes from the differential \(dH\) |
| Treating time-dependent \(L\) as energy-conserving | Over-generalising “energy is conserved” | Compute \(\partial L/\partial t\) explicitly; if nonzero, \(H\) changes |
| Using Cartesian momenta in curvilinear coordinates | Ignoring that \(p_i = \partial L/\partial \dot{q}_i\) already contains metric factors | Always recompute \(p_i\) from the chosen generalised coordinates |
| Ignoring that \(H\) is defined on phase space | Thinking \(H(q,\dot{q})\) is fine | Replace all velocities by momenta before calling the function Hamiltonian |

## 7. The textbook-precise statement
The Hamiltonian function associated with a Lagrangian \(L(q,\dot{q},t)\) that is convex in the velocities is the Legendre transform
\[
H(q,p,t) = \sum_{i=1}^n p_i \dot{q}_i(q,p,t) - L(q,\dot{q}(q,p,t),t),
\]
where the velocities are obtained by inverting the map \(p_i = \partial L/\partial \dot{q}_i\). Provided the Hessian \(\partial^2 L/\partial \dot{q}_i \partial \dot{q}_j\) is positive definite, Hamilton’s equations read
\[
\dot{q}_i = \frac{\partial H}{\partial p_i},\qquad \dot{p}_i = -\frac{\partial H}{\partial q_i}.
\]
(Goldstein, Poole & Safko, *Classical Mechanics*, 3rd ed., §8.1)

## 8. Visual — diagram or schematic
```
q-axis
 ^
 |     H=const curves
 |    .----------------.
 |   /                  \
 |  /     phase-space    \
 | /       orbit          \
 |/________________________\______> p-axis
     closed level set of H
```
Horizontal axis = momentum \(p\), vertical axis = coordinate \(q\). Closed curves are level sets of constant \(H\); motion follows these curves because \(\dot{q} = \partial H/\partial p\) and \(\dot{p} = -\partial H/\partial q\) are tangent to them.

## 9. The memory technique
1. **The hook** — Picture a mirror (Legendre transform) that reflects the velocity axis into the momentum axis; whatever lands on the mirror is \(H\).
2. **What to overlearn** — Definition \(H = \sum p_i\dot{q}_i - L\) and the two Hamilton equations with the minus sign.
3. **Spaced-repetition schedule** — Review definition after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from \(dL\), insert \(p_i = \partial L/\partial\dot{q}_i\), rearrange to obtain \(dH\), read off the partial derivatives.

## 10. What this unlocks
Aap ab symplectic integrators, Hamilton-Jacobi theory, action-angle variables, and optimal-control primer-vector methods padh sakte ho.

- Canonical transformations
- Liouville’s theorem on phase-space volume
- Hamilton-Jacobi equation for separable systems
- Pontryagin maximum principle in rocket guidance

## 11. Self-check — five questions, no answers
1. For the Lagrangian \(L = \frac12 m(\dot{x}^2 - \omega^2 x^2) + x f(t)\), write the Hamiltonian and compute \(\frac{dH}{dt}\).
2. A particle moves in a magnetic field; Lagrangian contains vector potential. Show that the resulting Hamiltonian is \(\frac1{2m}(p - qA)^2 + V\).
3. Why does the Hamiltonian of a free relativistic particle equal its total energy while that of a non-relativistic free particle also equals total energy, yet the two expressions look different?
4. In polar coordinates, the term \(p_\theta^2/(2mr^2)\) appears in \(H\). What physical quantity does \(p_\theta\) represent and why is the term positive?
5. Suppose \(L\) depends explicitly on time. Construct a concrete numerical counter-example where \(H\) is not conserved and verify by direct differentiation.