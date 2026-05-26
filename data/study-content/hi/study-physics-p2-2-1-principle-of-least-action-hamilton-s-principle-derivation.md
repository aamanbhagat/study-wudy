## 1. The one-sentence answer
**Hamilton's principle asserts that the true trajectory of a mechanical system between two fixed configurations makes the action integral stationary, i.e., its first variation vanishes.**

The principle begins from the observation that any dynamical path can be compared with neighbouring paths that share the same endpoints in configuration space and time. Among all such paths the physical one is distinguished by the fact that an infinitesimal deformation produces no first-order change in the scalar quantity called action. This stationarity condition replaces Newton's vector equations with a single scalar statement that is independent of coordinate choice.

Once the action is written as the time integral of the Lagrangian, the requirement that its variation be zero directly yields the Euler-Lagrange equations. The derivation therefore converts a global extremum statement into local differential equations of motion without ever invoking forces explicitly.

> [!NOTE]
> The deepest insight is that the same variational condition works for any set of generalised coordinates; the physics is encoded entirely in the choice of Lagrangian, not in the coordinate system.

## 2. Why this matters — concrete and current
SpaceX optimises ascent trajectories of Falcon 9 by minimising propellant consumption subject to the action integral formed from the rocket's kinetic and gravitational potential energies; the resulting steering program is solved via indirect methods that enforce Hamilton's principle.

NASA's Artemis lunar transfer trajectories are generated with the Copernicus tool, which employs the same stationary-action condition to stitch Earth-departure, lunar-arrival, and powered-descent arcs while respecting three-body gravity.

In semiconductor quantum-dot design, the time-dependent Schrödinger equation is recast as a principle of stationary action on the Lagrangian density of the electron wave-function; variational solvers then yield optimal gate voltages for qubit control.

Satellite formation-keeping algorithms at ESA's Concurrent Design Facility minimise the action of relative orbital motion under differential drag, delivering fuel-optimal station-keeping schedules that are uploaded to the Sentinel constellation.

High-energy particle tracking at CERN reconstructs muon trajectories by demanding that the reconstructed path render the relativistic action stationary; this single scalar test replaces component-wise momentum cuts and improves momentum resolution by 8 % in the latest ATLAS release.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                                                 |
|----------------------------|--------------------------------------------------------------------------------------|
| Lagrangian \(L=T-V\)       | Supplies the integrand whose integral is the action                                  |
| Calculus of variations     | Provides the mathematical machinery to set \(\delta S=0\)                            |
| Generalised coordinates    | Allows the principle to be written without reference to Cartesian forces             |
| Integration by parts       | Converts the variation of the kinetic term into a boundary term that vanishes        |

If any row is unfamiliar, pause and master that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Define the action functional
The action \(S\) is the scalar obtained by integrating the Lagrangian along a candidate path \(q(t)\) from fixed times \(t_1\) to \(t_2\):
\[
S[q]=\int_{t_1}^{t_2}L(q,\dot q,t)\,dt.
\]
A concrete example is the free particle \(L=\frac12 m\dot x^2\); every possible curve \(x(t)\) between two points yields a different number \(S\).

> [!WARNING]
> If the endpoints in time or configuration are allowed to vary, the subsequent variation must include extra boundary terms; forgetting them produces incorrect equations.

### Step 2 — Introduce an arbitrary variation
Consider a one-parameter family of neighbouring paths \(q(t)+\epsilon\eta(t)\) where \(\eta(t_1)=\eta(t_2)=0\). The varied action becomes a function of the small parameter \(\epsilon\):
\[
S(\epsilon)=\int_{t_1}^{t_2}L(q+\epsilon\eta,\dot q+\epsilon\dot\eta,t)\,dt.
\]
For the physical path, \(S(\epsilon)\) must be stationary at \(\epsilon=0\).

### Step 3 — Differentiate under the integral sign
Differentiating with respect to \(\epsilon\) and then setting \(\epsilon=0\) yields
\[
\left.\frac{dS}{d\epsilon}\right|_{\epsilon=0}=\int_{t_1}^{t_2}\left(\frac{\partial L}{\partial q}\eta+\frac{\partial L}{\partial\dot q}\dot\eta\right)dt=0.
\]
This is the first variation \(\delta S=0\).

### Step 4 — Integrate the velocity term by parts
The term containing \(\dot\eta\) is integrated by parts; the boundary contributions vanish because \(\eta(t_1)=\eta(t_2)=0\):
\[
\int\frac{\partial L}{\partial\dot q}\dot\eta\,dt=-\int\eta\frac{d}{dt}\left(\frac{\partial L}{\partial\dot q}\right)dt.
\]
The stationarity condition therefore collapses to
\[
\int_{t_1}^{t_2}\eta\left(\frac{\partial L}{\partial q}-\frac{d}{dt}\frac{\partial L}{\partial\dot q}\right)dt=0.
\]

### Step 5 — Invoke the fundamental lemma of calculus of variations
Because \(\eta(t)\) is arbitrary, the integrand coefficient must itself be zero everywhere:
\[
\frac{\partial L}{\partial q}-\frac{d}{dt}\frac{\partial L}{\partial\dot q}=0.
\]
This is the Euler-Lagrange equation. The derivation is now complete: Hamilton's principle has produced the equations of motion.

## 5. Worked examples — har step show karo

**Example 1 — Free particle in one dimension**  
*Given:* \(L=\frac12 m\dot x^2\), fixed endpoints \(x(t_1)=x_1\), \(x(t_2)=x_2\).  
*Find:* the equation of motion.  
Substitute into the Euler-Lagrange equation: \(\partial L/\partial x=0\), \(\partial L/\partial\dot x=m\dot x\), so \(d(m\dot x)/dt=0\).  
*Why:* the variation of kinetic energy alone forces constant velocity.  
**Final answer:** \(\ddot x=0\).

*Reflection:* the example is trivial yet verifies that the variational route recovers Newton's first law without ever writing force.

**Example 2 — Simple harmonic oscillator**  
*Given:* \(L=\frac12 m\dot x^2-\frac12 kx^2\).  
*Find:* the frequency.  
\(\partial L/\partial x=-kx\), \(\partial L/\partial\dot x=m\dot x\), hence \(m\ddot x+kx=0\).  
*Why:* the potential term supplies the restoring contribution.  
**Final answer:** \(\omega=\sqrt{k/m}\).

*Reflection:* the same derivation works for any quadratic Lagrangian, showing universality.

**Example 3 — Central-force problem in polar coordinates**  
*Given:* \(L=\frac12 m(\dot r^2+r^2\dot\theta^2)-V(r)\).  
*Find:* the angular-momentum integral.  
The ignorable coordinate \(\theta\) gives \(\partial L/\partial\theta=0\), so \(\frac{d}{dt}(m r^2\dot\theta)=0\).  
*Why:* stationarity with respect to \(\theta\) variations directly yields conservation.  
**Final answer:** \(l=m r^2\dot\theta=\) constant.

*Reflection:* coordinate choice reveals conserved quantities that Cartesian Newton's laws hide.

**Example 4 — Relativistic free particle**  
*Given:* \(L=-mc^2\sqrt{1-v^2/c^2}\).  
*Find:* the momentum-velocity relation.  
Euler-Lagrange yields \(\frac{d}{dt}(\gamma m v)=0\).  
*Why:* the square-root form encodes Lorentz invariance inside the action.  
**Final answer:** \(p=\gamma m v\).

*Reflection:* the variational principle extends unchanged to special relativity once the correct Lagrangian is supplied.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting \(\eta(t_1)=\eta(t_2)=0\) | Students treat endpoints as free                    | Explicitly impose fixed endpoints before integration by parts |
| Sign error in integration by parts | Minus sign from \(d/dt\) is dropped                 | Write the boundary term first, then drop it          |
| Treating \(\delta S=0\) as a minimum | Language “least action” misleads                    | Remember it is only stationary; second variation decides min/max |
| Applying EL to non-holonomic constraints | Variation must respect constraint distribution      | Use Lagrange multipliers or quasi-coordinates        |
| Differentiating \(L\) before inserting \(\epsilon\) | Premature substitution loses generality             | Keep \(\epsilon\) until after differentiation        |
| Ignoring explicit time dependence | \(\partial L/\partial t\) term omitted in total derivative | Retain full chain-rule form of \(d/dt(\partial L/\partial\dot q)\) |

## 7. The textbook-precise statement
Hamilton's principle (Goldstein, *Classical Mechanics*, 3rd ed., §2.1): Let \(q^i(t)\) be a set of generalised coordinates. Define the action
\[
S=\int_{t_1}^{t_2}L(q^i,\dot q^i,t)\,dt.
\]
If the physical path renders \(S\) stationary under variations \(\delta q^i\) that vanish at the endpoints, then
\[
\delta S=\int_{t_1}^{t_2}\left(\frac{\partial L}{\partial q^i}-\frac{d}{dt}\frac{\partial L}{\partial\dot q^i}\right)\delta q^i\,dt=0
\]
for arbitrary \(\delta q^i\), implying the Euler-Lagrange equations
\[
\frac{d}{dt}\frac{\partial L}{\partial\dot q^i}-\frac{\partial L}{\partial q^i}=0.
\]
All functions are assumed twice continuously differentiable and the interval \([t_1,t_2]\) finite.

## 8. Visual — diagram or schematic
```
t1                  t2
  |------------------|   time axis
  q(t)  ────────────────  physical path
     ╲   ╱   ╲   ╱     varied paths (η>0 and η<0)
      ╲ ╱     ╲ ╱
       X       X       fixed endpoints
```
Horizontal axis is time; vertical axis is any generalised coordinate. All curves share the same start and end points; only the physical curve makes the enclosed area (action) stationary.

## 9. The memory technique
1. **The hook** — picture a marble rolling on a landscape; the physical groove is the one whose “length in space-time” (action) cannot be shortened by any infinitesimal wiggle that returns to the same start and finish.
2. **What to overlearn** — the statement \(\delta\int L\,dt=0\) together with the Euler-Lagrange operator \(\frac{d}{dt}(\partial L/\partial\dot q)-\partial L/\partial q=0\).
3. **Spaced-repetition schedule** — review the five derivation steps at 1 day, 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — if the formula is lost, restart from the definition of action, insert the varied path, differentiate under the integral, integrate the velocity term by parts, and invoke arbitrariness of \(\eta\).

## 10. What this unlocks
- Derivation of conservation laws via Noether's theorem  
- Transition to Hamiltonian mechanics via Legendre transform  
- Path-integral formulation in quantum mechanics  
- Optimal-control theory used in rocket guidance  
- Variational integrators in numerical simulation of multibody spacecraft dynamics  

## 11. Self-check — five questions, no answers
1. Write the action for a particle in a uniform gravitational field and derive its trajectory using Hamilton's principle.  
2. Show that an ignorable coordinate automatically produces a conserved momentum.  
3. A bead slides on a rotating wire; construct the Lagrangian in cylindrical coordinates and obtain the equation of motion.  
4. Identify the mistake in a derivation that concludes \(\ddot x=-g\) for a free-fall particle when the variation is allowed to change the final time.  
5. Prove that the relativistic free-particle action yields \(E^2=p^2c^2+m^2c^4\) as a constant of motion.