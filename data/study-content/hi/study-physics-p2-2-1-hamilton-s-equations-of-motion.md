## 1. The one-sentence answer
**Hamilton's equations of motion** replace the second-order Euler-Lagrange equations with a symmetric first-order pair that evolves coordinates \(q_i\) and momenta \(p_i\) on phase space using the Hamiltonian \(H(q,p,t)\).

Iska matlab yeh hai ki aap ek system ko uske total energy ke through describe karte ho, jahaan position aur momentum dono ko alag-alag variables maana jaata hai. Lagrangian mein aap sirf kinetic minus potential dekhte the, lekin yahaan aap ek function banate ho jo directly energy ko represent karta hai aur uske partial derivatives se velocities aur forces nikal jaate hain. Yeh symmetry phase space mein flow ko bahut saaf dikhaata hai aur conservation laws ko turant dikhaata hai.

Aap jab bhi time-independent constraints aur conservative forces ke saath kaam kar rahe ho, Hamilton's formalism aapko symplectic geometry aur canonical transformations ki taraf le jaata hai bina extra calculation ke.

> [!NOTE]
> Sabse badi "aha" yeh hai ki \(H\) agar time pe explicitly depend nahi karta, toh \(H\) khud conserved quantity ban jaata hai — matlab total energy constant rehti hai bina extra theorem lagaye.

## 2. Why this matters — concrete and current
SpaceX Starship ke re-entry guidance mein onboard computers Hamilton's equations use karte hain taaki 6-DOF rigid-body dynamics ko real-time integrate kar sakein; phase-space variables se fuel-optimal trajectories seedha nikalti hain.

LIGO-Virgo collaboration ke gravitational-wave parameter estimation pipelines mein binary black-hole inspirals ke liye Hamiltonian formulation of post-Newtonian dynamics chalti hai; isse likelihood evaluations mein 30-40% speed-up milta hai kyunki \(\dot{p}\) equations directly energy gradients dete hain.

Semiconductor quantum-dot qubit control mein, circuit-QED Hamiltonians ko time-dependent Hamilton's equations se evolve kiya jaata hai taaki pulse shapes optimize ho sakein; IBM Quantum aur Rigetti ke calibration routines isi formalism pe based hain.

ESA's JUICE mission Jupiter Icy Moons Explorer ke trajectory design mein, patched-conic approximations ke andar canonical transformations use hote hain jo Hamilton's equations se derive hote hain; yeh mission planners ko multiple gravity assists ko analytically handle karne dete hain.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Lagrangian \(L(q,\dot{q},t)\) | Hamiltonian \(H = p\dot{q} - L\) define karne ke liye zaroori hai |
| Generalized coordinates \(q_i\) aur momenta \(p_i = \partial L/\partial\dot{q}_i\) | Phase-space variables banane aur Legendre transform ke liye |
| Euler-Lagrange equations | Unko first-order pair mein convert karne ka motivation samajhne ke liye |
| Total time derivative along trajectories | Energy conservation proof aur \(\dot{H}\) nikaalne ke liye |

Agar aap upar ke teeno concepts comfortably nahi handle kar paa rahe, toh pehle Lagrangian mechanics revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — From velocities to momenta
Aap pehle Lagrangian se momenta define karte ho kyunki velocity ko directly energy se link karna mushkil hota hai. Ek concrete example: 1D harmonic oscillator \(L = \frac12 m\dot{x}^2 - \frac12 kx^2\) mein \(p = m\dot{x}\) hota hai. Formally, \(p_i \equiv \frac{\partial L}{\partial\dot{q}_i}\).

> [!WARNING]
> Agar aap yahaan \(p_i\) ko sirf \(m\dot{q}_i\) maan lete ho bina partial derivative liye, toh curved coordinates ya velocity-dependent potentials mein equations galat ho jaayenge.

### Step 2 — Legendre transform se Hamiltonian banana
Ab aap \(H(q,p,t) = p_i\dot{q}_i - L(q,\dot{q},t)\) define karte ho, jahaan \(\dot{q}_i\) ko \(p\) ke terms mein solve karna padta hai. Harmonic oscillator ke liye yeh \(H = \frac{p^2}{2m} + \frac12 kx^2\) deta hai.

> [!WARNING]
> Agar transform invertible nahi hai (non-standard kinetic terms), toh \(H\) multi-valued ho sakta hai aur formalism toot jaata hai.

### Step 3 — Total time derivative of H
Aap \(dH/dt\) likhte ho aur usme \(\dot{q}\) aur \(\dot{p}\) ke coefficients ko zero karne ki koshish karte ho. Iska natija \(\dot{q}_i = \partial H/\partial p_i\) aur \(\dot{p}_i = -\partial H/\partial q_i\) ban jaata hai.

### Step 4 — Equations of motion as first-order system
Dono equations ko saath likho: \(\dot{q}_i = \partial H/\partial p_i\), \(\dot{p}_i = -\partial H/\partial q_i\). Yeh pair automatically symplectic structure preserve karti hai.

### Step 5 — Time-independent case mein energy conservation
Agar \(H\) explicitly \(t\) pe depend nahi karta, toh \(\frac{dH}{dt} = 0\) ho jaata hai. Yeh step textbook-grade statement tak le jaata hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple harmonic oscillator**
*Given:* \(L = \frac12 m\dot{x}^2 - \frac12 kx^2\)
*Find:* Hamilton's equations
Pehle \(p = \partial L/\partial\dot{x} = m\dot{x}\). Phir \(H = p\dot{x} - L = p^2/(2m) + (1/2)kx^2\). Ab \(\partial H/\partial p = p/m\) aur \(\partial H/\partial x = kx\), isliye equations \(\dot{x} = p/m\), \(\dot{p} = -kx\).
*Why* yeh step: Legendre transform energy ko phase space mein daalta hai.
**Final answer**
\(\dot{x} = p/m\), \(\dot{p} = -kx\)

*Reflection:* Yeh example trivial lagta hai lekin yeh dikhata hai ki second-order equation \(\ddot{x} = -(k/m)x\) automatically first-order pair mein split ho jaata hai.

**Example 2 — Particle in central potential**
*Given:* \(L = \frac12 m(\dot{r}^2 + r^2\dot{\theta}^2) - V(r)\)
*Find:* Hamilton's equations
\(p_r = m\dot{r}\), \(p_\theta = m r^2 \dot{\theta}\). \(H = p_r^2/(2m) + p_\theta^2/(2m r^2) + V(r)\). Equations: \(\dot{r} = p_r/m\), \(\dot{p}_r = p_\theta^2/(m r^3) - V'(r)\), \(\dot{\theta} = p_\theta/(m r^2)\), \(\dot{p}_\theta = 0\).
*Why* yeh step: Angular momentum conservation turant dikhta hai.
**Final answer**
\(\dot{p}_\theta = 0\) (angular momentum conserved)

*Reflection:* Central force problems mein yeh formalism angular momentum ko canonical momentum ki tarah treat karta hai.

**Example 3 — Time-dependent driven oscillator**
*Given:* \(H = p^2/(2m) + (1/2)m\omega^2(t)x^2 - f(t)x\)
*Find:* Equations
\(\dot{x} = p/m\), \(\dot{p} = -m\omega^2(t)x + f(t)\).
*Why* yeh step: Explicit time dependence energy ko non-conserved banata hai.
**Final answer**
\(\dot{p} = -m\omega^2(t)x + f(t)\)

*Reflection:* Driven systems mein \(dH/dt = \partial H/\partial t\) directly power input deta hai.

**Example 4 — Relativistic free particle (advanced)**
*Given:* \(H = \sqrt{p^2c^2 + m^2c^4}\)
*Find:* Equations
\(\dot{x} = pc^2/H\), \(\dot{p} = 0\).
*Why* yeh step: Velocity \(\partial H/\partial p\) automatically \(v < c\) enforce karti hai.
**Final answer**
\(\dot{x} = pc^2/H\)

*Reflection:* Relativistic case dikhata hai ki Hamiltonian formalism non-quadratic kinetic terms ko bhi handle karta hai.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| \(p = m\dot{q}\) blindly use karna | Non-Cartesian coordinates ya magnetic fields mein galat | Hamesha \(p = \partial L/\partial\dot{q}\) se shuru karo |
| \(H\) ko total energy maan lena jab time-dependent terms hon | \(\partial H/\partial t \neq 0\) hota hai | Check karo ki \(H\) explicitly \(t\) pe depend karta hai ya nahi |
| Cyclic coordinates bhool jaana | \(\partial H/\partial q_i = 0\) ka matlab \(p_i\) constant hai | Pehle cyclic variables identify karo |
| Sign error in \(\dot{p} = -\partial H/\partial q\) | Force negative gradient hota hai, sign flip bhool jaate hain | Derivation mein \(dH/dt\) step dobara likho |
| Non-canonical transformations use karna | Poisson brackets preserve nahi hote | Transformation pehle check karo ki \(\{Q,P\} = 1\) |

## 7. The textbook-precise statement
Let \(Q\) be a configuration manifold with local coordinates \(q^i\). Let \(L: TQ \times \mathbb{R} \to \mathbb{R}\) be a regular Lagrangian. Define the Legendre transform \(\mathbb{F}L: TQ \to T^*Q\) by \(p_i = \partial L/\partial\dot{q}^i\). The Hamiltonian \(H: T^*Q \times \mathbb{R} \to \mathbb{R}\) is \(H = p_i\dot{q}^i - L\) expressed in terms of \((q,p)\). Then Hamilton's equations read
\[
\dot{q}^i = \frac{\partial H}{\partial p_i},\qquad \dot{p}_i = -\frac{\partial H}{\partial q^i}.
\]
If \(H\) is independent of \(t\), then \(H\) is constant along solutions. (Goldstein, *Classical Mechanics*, 3e, §8.1)

## 8. Visual — diagram or schematic
```text
Phase space (q,p)
p ^
  |     flow lines
  |   ↗     ↗
  |  /     /
  | /     /
  |/     /
q |-----→ q-axis
```
Horizontal axis generalized coordinate \(q\), vertical axis conjugate momentum \(p\). Arrows show the vector field \((\partial H/\partial p, -\partial H/\partial q)\); closed curves represent constant-\(H\) orbits for time-independent systems.

## 9. The memory technique
1. **The hook** — Imagine a tiny clockwork toy whose hands are \(q\) and whose spring tension is \(p\); the Hamiltonian tells exactly how fast each hand must turn.
2. **What to overlearn** — \(\dot{q}_i = \partial H/\partial p_i\), \(\dot{p}_i = -\partial H/\partial q_i\), and “\(H\) independent of \(t\) ⇒ energy conserved”.
3. **Spaced-repetition schedule** — Review the two equations after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Agar equations yaad na rahein toh Legendre transform \(H = p\dot{q}-L\) likho, phir \(dH/dt\) expand karo aur coefficients zero kar do.

## 10. What this unlocks
Hamilton's equations aapko symplectic integrators, canonical perturbation theory, action-angle variables aur Liouville's theorem tak le jaate hain.

- Poisson bracket formalism
- Generating functions for canonical transformations
- Hamilton-Jacobi equation
- Phase-space volume preservation (Liouville)
- Adiabatic invariants in slowly varying systems

## 11. Self-check — five questions, no answers
1. Ek 2D isotropic harmonic oscillator ke liye Hamilton's equations likho aur dikhao ki angular momentum conserved hai.
2. Agar \(H = p^2/2m + V(q) + f(t)q\), toh \(dH/dt\) kya hoga?
3. Cyclic coordinate hone par \(\dot{p}_i\) kya hota hai? Ek example do.
4. Legendre transform invertible nahi hone par kya problem aati hai?
5. Relativistic free particle ke \(H = \sqrt{p^2c^2+m^2c^4}\) se \(\dot{x}\) nikaal kar verify karo ki \(|\dot{x}| < c\).