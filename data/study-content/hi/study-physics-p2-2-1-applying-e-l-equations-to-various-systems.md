## 1. The one-sentence answer
**Applying E-L equations to various systems means deriving the equations of motion for any mechanical system by writing the Lagrangian \(L = T - V\) in generalized coordinates and then solving the Euler-Lagrange equation for each coordinate.**

Iska matlab yeh hai ki aap pehle system ki kinetic energy \(T\) aur potential energy \(V\) ko generalized coordinates mein express karte ho. Phir har coordinate \(q_i\) ke liye \(\frac{d}{dt}(\frac{\partial L}{\partial \dot{q}_i}) - \frac{\partial L}{\partial q_i} = 0\) likh kar motion ke differential equations nikaalte ho. Yeh approach Newton ke laws se zyada powerful hai kyunki constraints aur symmetries naturally handle ho jaate hain.

Aapko yeh tab use karna chahiye jab coordinates non-Cartesian hon ya multiple particles coupled hon. Ek baar Lagrangian ban jaaye, baaki ka kaam almost mechanical ho jaata hai.

> [!NOTE]
> The deepest insight is that the same two-line Euler-Lagrange equation works for a free particle, a rocket nozzle gimbal, or a satellite constellation; only the expression inside \(L\) changes.

## 2. Why this matters — concrete and current
SpaceX uses Lagrangian mechanics to generate real-time attitude equations for Falcon 9 stage separation when the vehicle has time-varying mass and multiple gimbaling engines.  
JAXA’s Hayabusa2 mission team applied E-L equations in generalized coordinates to plan the MINERVA-II rover deployment trajectories on Ryugu, where the effective potential included both gravitational and centrifugal terms in the rotating asteroid frame.  
Boston Dynamics derives closed-form dynamics for Atlas and Spot robots by writing a single Lagrangian for the entire kinematic tree; the resulting E-L equations feed directly into their model-predictive controller at 1 kHz.  
In semiconductor lithography, ASML models the 6-degree-of-freedom motion of the wafer stage as a constrained Lagrangian system so that reaction forces on the metrology frame can be cancelled to sub-nanometer precision.  
LIGO’s seismic isolation platforms are tuned by solving the E-L equations for a seven-stage pendulum chain; the resulting transfer functions determine the exact notch frequencies needed to suppress Newtonian noise below 10 Hz.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Generalized coordinates  | Allows you to embed constraints automatically into \(L\)  |
| Kinetic energy \(T\)     | Must be expressed as a quadratic form in the \(\dot{q}_i\)|
| Potential energy \(V\)   | Usually depends only on positions; gives the forces       |
| Partial derivatives      | Core operation inside every E-L equation                  |
| Total time derivative    | Required when \(\frac{\partial L}{\partial \dot{q}_i}\) is itself time-dependent |

If any row is missing, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Choose generalized coordinates
Aap coordinates aise chuno ki saare holonomic constraints automatically satisfy ho jaayein.  
Example: double pendulum ke liye do angles \(\theta_1, \theta_2\) lo, lengths fixed rakhne ki zaroorat nahi.  
Formal statement: let \(q_1,\dots,q_n\) be a minimal set such that every allowed configuration is labelled uniquely by a point in \(\mathbb{R}^n\).  
> [!WARNING]  
> Using more coordinates than degrees of freedom forces you to add Lagrange multipliers later; the equations become unnecessarily stiff.

### Step 2 — Write kinetic energy \(T(q,\dot{q})\)
\(T\) hamesha velocities ka quadratic function hota hai. Cartesian velocities ko chain rule se \(\dot{q}_i\) mein badlo.  
Example: simple pendulum, \(T = \frac12 m (l\dot\theta)^2\).  
Formal: \(T = \frac12 \sum_{i,j} m_{ij}(q)\dot{q}_i\dot{q}_j\).

### Step 3 — Write potential energy \(V(q)\)
\(V\) sirf positions par depend karta hai (velocity-independent forces).  
Example: pendulum, \(V = -mgl\cos\theta\).  
Formal: \(L = T(q,\dot{q}) - V(q)\).

### Step 4 — Form the Lagrangian and compute the partials
Har \(q_k\) ke liye \(\frac{\partial L}{\partial q_k}\) aur \(\frac{\partial L}{\partial \dot{q}_k}\) nikaalo.  
Formal step: \(\frac{\partial L}{\partial \dot{q}_k} = \sum_j m_{kj}(q)\dot{q}_j\).

### Step 5 — Apply the Euler-Lagrange operator
\(\frac{d}{dt}(\frac{\partial L}{\partial \dot{q}_k}) - \frac{\partial L}{\partial q_k} = 0\) likho.  
Agar \(m_{kj}\) time-dependent hai to extra terms aate hain.

### Step 6 — Simplify and obtain second-order ODEs
Resulting equations ko normal form mein laao: \(\ddot{q} = f(q,\dot{q})\).  
Yeh equations numerically integrate karne ke liye ready hote hain.

### Step 7 — Check conserved quantities (optional but powerful)
Agar \(L\) kisi \(q_k\) mein explicit dependence nahi rakhta, to \(\frac{\partial L}{\partial \dot{q}_k}\) constant hota hai (momentum conservation).

## 5. Worked examples — har step show karo

**Example 1 — Free particle in Cartesian coordinates**  
*Given:* \(T = \frac12 m(\dot x^2 + \dot y^2)\), \(V = 0\).  
*Find:* equations of motion.  
Step: \(L = T\).  
\(\frac{\partial L}{\partial x} = 0\), \(\frac{\partial L}{\partial \dot x} = m\dot x\).  
\(\frac{d}{dt}(m\dot x) = 0 \implies m\ddot x = 0\).  
**Final answer:** \(\ddot x = 0\), \(\ddot y = 0\).  
*Reflection:* trivial case shows that E-L reproduces Newton’s first law; the same machinery scales to any system.

**Example 2 — 1-D harmonic oscillator**  
*Given:* \(T = \frac12 m\dot x^2\), \(V = \frac12 kx^2\).  
*Find:* EOM.  
\(L = \frac12 m\dot x^2 - \frac12 kx^2\).  
\(\frac{\partial L}{\partial x} = -kx\), \(\frac{\partial L}{\partial \dot x} = m\dot x\).  
\(\frac{d}{dt}(m\dot x) + kx = 0\).  
**Final answer:** \(\ddot x + \frac{k}{m}x = 0\).  
*Reflection:* frequency \(\omega = \sqrt{k/m}\) emerges naturally without guessing restoring force.

**Example 3 — Simple pendulum**  
*Given:* length \(l\) fixed, angle \(\theta\).  
*Find:* EOM.  
\(T = \frac12 m l^2 \dot\theta^2\), \(V = -m g l \cos\theta\).  
\(L = \frac12 m l^2 \dot\theta^2 + m g l \cos\theta\).  
\(\frac{\partial L}{\partial \theta} = -m g l \sin\theta\), \(\frac{\partial L}{\partial \dot\theta} = m l^2 \dot\theta\).  
\(\frac{d}{dt}(m l^2 \dot\theta) + m g l \sin\theta = 0\).  
**Final answer:** \(\ddot\theta + \frac{g}{l}\sin\theta = 0\).  
*Reflection:* small-angle linearization gives SHM; full nonlinear equation is already in the E-L output.

**Example 4 — Planar central-force problem**  
*Given:* \(V(r)\), polar coordinates \(r,\phi\).  
*Find:* radial and angular equations.  
\(T = \frac12 m(\dot r^2 + r^2\dot\phi^2)\).  
\(L = T - V(r)\).  
For \(\phi\): \(\frac{d}{dt}(m r^2 \dot\phi) = 0 \implies l = m r^2 \dot\phi\) (angular momentum conserved).  
For \(r\): \(m\ddot r - m r \dot\phi^2 + V'(r) = 0\).  
Substitute \(\dot\phi = l/(m r^2)\):  
**Final answer:** \(m\ddot r - \frac{l^2}{m r^3} + V'(r) = 0\).  
*Reflection:* effective potential \(V_{\rm eff} = V(r) + l^2/(2m r^2)\) appears automatically.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                              |
|-------------------------------------|---------------------------------------------|----------------------------------------------|
| Using Cartesian coordinates when constraint exists | Habit from Newton’s laws                    | Always count degrees of freedom first        |
| Sign error in \(V\)                 | Confusing force = −∇V with energy sign      | Write \(F = −\partial V/\partial q\) explicitly before forming \(L\) |
| Forgetting chain rule in \(\frac{d}{dt}(\partial L/\partial\dot q)\) | \(m_{ij}(q)\) depends on time through \(q(t)\) | Expand the total derivative fully            |
| Treating non-holonomic constraints as holonomic | Missing velocity-dependent constraints      | Use Lagrange multipliers or quasi-coordinates |
| Omitting Coriolis terms in rotating frames | Not including time-dependent coordinate transformation | Add fictitious potentials or transform velocities correctly |

## 7. The textbook-precise statement
Let \(Q = \{q^1,\dots,q^n\}\) be a set of generalized coordinates on the configuration manifold \(M\). Let \(L:T M\to\mathbb{R}\) be a smooth function (the Lagrangian). The Euler-Lagrange equations are
\[
\frac{d}{dt}\left(\frac{\partial L}{\partial\dot q^k}\right) - \frac{\partial L}{\partial q^k} = 0,\qquad k=1,\dots,n.
\]
If \(L\) is regular (Hessian \(\partial^2 L/\partial\dot q^i\partial\dot q^j\) invertible), these equations define a unique second-order vector field on \(TM\). (Goldstein, *Classical Mechanics*, 3e, §2.4)

## 8. Visual — diagram or schematic
```
          θ
       \  |
        \ |
         \|
          O------ r (variable length possible)
         / \
        /   \
       m     (bob)
```
Horizontal axis: inertial frame x; vertical: y downward. Angle \(\theta\) measured from downward vertical. Coordinates used: \((r,\theta)\). All velocities obtained by \(\dot x = \dot r\sin\theta + r\dot\theta\cos\theta\), \(\dot y = \dot r\cos\theta - r\dot\theta\sin\theta\).

## 9. The memory technique
1. **The hook** — Imagine the Lagrangian as a “movie script” that the system follows to minimize total “cost”; E-L is the director’s instruction set for each actor (coordinate).
2. **What to overlearn** — \(L=T-V\), the single line \(\frac{d}{dt}(\partial L/\partial\dot q_i)-\partial L/\partial q_i=0\), and the statement “if \(\partial L/\partial q_i=0\) then \(p_i\) is conserved”.
3. **Spaced-repetition schedule** — Review the four worked examples after 1 day, 3 days, 7 days, 16 days and 35 days.
4. **First-principles fallback** — If you forget the formula, start from \(\delta S=0\) where \(S=\int L\,dt\), integrate by parts, and set the coefficient of each \(\delta q_i\) to zero; the E-L equation reappears.

## 10. What this unlocks
You can now move to Hamiltonian mechanics, symplectic integrators, and Noether’s theorem without ever writing Newton’s laws again.  
- Hamiltonian formulation and phase-space geometry  
- Routh reduction for cyclic coordinates  
- Linearized stability analysis around equilibria  
- Optimal control via Pontryagin’s minimum principle (rocket guidance)  
- Derivation of effective field theories in molecular dynamics

## 11. Self-check — five questions, no answers
1. Write the Lagrangian for a bead on a rotating hoop and obtain the E-L equation for the polar angle.  
2. A particle moves in a central potential \(V(r)= -k/r\); show that the orbit equation can be obtained from the radial E-L equation alone.  
3. Identify the conserved quantity when the Lagrangian of a two-body system is invariant under simultaneous rotation of both position vectors.  
4. A student writes the pendulum Lagrangian as \(L = \frac12 m l^2 \dot\theta^2 - m g l \theta\); what physical error has occurred and how does it affect small-angle motion?  
5. For the variable-mass rocket equation, explain why the standard E-L form must be modified and what extra term appears.