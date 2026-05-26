## 1. The one-sentence answer
**Normal modes are the independent synchronous oscillation patterns of a linearly coupled system, and normal coordinates are the linear combinations of the original displacements that reduce the coupled equations to a set of independent harmonic oscillators.**

A system of masses linked by springs does not vibrate arbitrarily. When released from rest after a small displacement, every mass eventually moves at one of a discrete set of frequencies. At each such frequency the entire collection of masses traces out a fixed spatial pattern that repeats in time; these patterns are the normal modes.

The original coordinates (the individual positions of the masses) mix the modes together, producing coupled differential equations. A change of variables to new coordinates, each aligned with a single mode, removes every cross term. The equations then become a collection of independent simple-harmonic-oscillator equations whose solutions are immediate.

> [!NOTE]
> The decisive insight is that the normal coordinates diagonalize the quadratic forms for kinetic and potential energy simultaneously; once that is achieved, the dynamics factor into independent oscillators whose frequencies are the square roots of the eigenvalues of the resulting matrix problem.

## 2. Why this matters — concrete and current
In the design of the Falcon 9 first-stage octoweb, SpaceX engineers compute the normal modes of the propellant tanks and interstage structure to ensure that combustion instabilities and aerodynamic buffeting do not excite resonant frequencies near 15–25 Hz. Modal analysis performed with finite-element software supplies the required stiffening ribs and tuned-mass dampers.

JWST’s sunshield deployment relies on the normal-mode spectrum of the five-layer membrane stack. NASA’s 2017 modal survey identified a 0.8 Hz “drumhead” mode that would have produced destructive torques on the primary mirror during sunshield tensioning; the tensioning schedule was altered to avoid that frequency.

Vibration isolation platforms on LIGO’s test-mass suspension use normal-coordinate controllers to decouple longitudinal, pitch, and yaw degrees of freedom. The 2015 Livingston detector achieved 10 dB of isolation at 10 Hz by feeding back on the normal modes rather than the raw shadow-sensor signals.

In semiconductor lithography, ASML’s EUV scanners employ active vibration cancellation on the reticle and wafer stages. The control firmware is written in the normal-coordinate basis so that each of the six rigid-body modes can be servoed independently at kilohertz bandwidths, reducing overlay error below 1 nm.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                                                 |
|--------------------------------|--------------------------------------------------------------------------------------|
| Lagrangian mechanics           | Supplies the quadratic forms \(T\) and \(V\) whose simultaneous diagonalization yields normal coordinates. |
| Linear algebra (eigenvalues)   | The frequencies and mode shapes are the eigenvalues and eigenvectors of the matrix \(\mathbf{M}^{-1}\mathbf{K}\). |
| Small-oscillation approximation| Guarantees that the potential is quadratic, so the equations remain linear and normal modes exist. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Two masses reveal the coupling
Two identical masses \(m\) connected by three identical springs of constant \(k\) feel forces that depend on the difference of their displacements. The resulting equations contain cross terms \(x_1 - x_2\), so each mass’s motion immediately affects the other.

Consider the concrete case \(x_2 = 0\); the first mass feels an extra restoring force from the middle spring. The equations are therefore coupled.

The formal statement is the pair of coupled ODEs
\[
m\ddot{x}_1 = -2kx_1 + kx_2, \qquad m\ddot{x}_2 = -2kx_2 + kx_1.
\]

> [!WARNING]
> Treating the masses as independent (setting the middle spring constant to zero) removes the coupling but also eliminates the higher-frequency mode that actually exists in the physical system.

### Step 2 — Assume synchronous motion
Assume every coordinate oscillates at the same (unknown) frequency \(\omega\):
\[
x_j(t) = a_j e^{i\omega t}.
\]
Substitution converts the differential equations into an algebraic eigenvalue problem whose nontrivial solutions exist only for specific \(\omega\).

### Step 3 — Matrix form
Collecting amplitudes into a vector \(\mathbf{a}\) yields
\[
(-\omega^2\mathbf{M} + \mathbf{K})\mathbf{a} = 0,
\]
where \(\mathbf{M}\) is the mass matrix and \(\mathbf{K}\) the stiffness matrix. Nontrivial solutions require
\[
\det(\mathbf{K} - \omega^2\mathbf{M}) = 0.
\]

### Step 4 — Normal frequencies from the characteristic equation
For the two-mass example the determinant condition produces the quadratic
\[
m^2\omega^4 - 6km\omega^2 + 8k^2 = 0,
\]
with roots \(\omega^2 = 2k/m\) and \(\omega^2 = 4k/m\).

### Step 5 — Normal modes from the null space
For each \(\omega_r^2\) solve \((\mathbf{K} - \omega_r^2\mathbf{M})\mathbf{a}^{(r)} = 0\). The resulting vectors \(\mathbf{a}^{(r)}\) are the mode shapes. For the two-mass system they are \((1,1)\) (in-phase) and \((1,-1)\) (out-of-phase).

### Step 6 — Normal coordinates via orthogonal transformation
Form the matrix \(\mathbf{P}\) whose columns are the mass-normalized eigenvectors. The change of variables
\[
\mathbf{x} = \mathbf{P}\boldsymbol{\eta}
\]
decouples the Lagrangian into
\[
L = \frac12\sum_r(\dot\eta_r^2 - \omega_r^2\eta_r^2).
\]
Each \(\eta_r\) is a normal coordinate.

### Step 7 — Textbook statement of the result
Any system whose Lagrangian is a positive-definite quadratic form in coordinates and velocities can be diagonalized by a linear transformation to normal coordinates; the resulting equations are independent simple-harmonic oscillators whose squared frequencies are the eigenvalues of the generalized problem \(\mathbf{K}\mathbf{a} = \omega^2\mathbf{M}\mathbf{a}\).

## 5. Worked examples — every step shown

**Example 1 — Symmetric two-mass system**  
*Given:* Two masses \(m\), springs \(k, k, k\).  
*Find:* normal frequencies and coordinates.  

Equations of motion:
\[
m\ddot{x}_1 + 2kx_1 - kx_2 = 0, \quad m\ddot{x}_2 + 2kx_2 - kx_1 = 0.
\]
*Why:* Newton’s second law applied to each free-body diagram.  

Assume \(x_j = a_j e^{i\omega t}\). Matrix equation:
\[
\begin{pmatrix}2k - m\omega^2 & -k \\ -k & 2k - m\omega^2\end{pmatrix}\begin{pmatrix}a_1\\a_2\end{pmatrix}=0.
\]
*Why:* Substitution converts derivatives to multiplication by \(-\omega^2\).  

Characteristic equation yields \(\omega^2 = 2k/m, 4k/m\).  
Eigenvectors (mass-normalized): \(\mathbf{a}^{(1)} = (1/\sqrt{2},1/\sqrt{2})\), \(\mathbf{a}^{(2)} = (1/\sqrt{2},-1/\sqrt{2})\).  
Normal coordinates:
\[
\eta_1 = \frac{x_1+x_2}{\sqrt{2}}, \quad \eta_2 = \frac{x_1-x_2}{\sqrt{2}}.
\]
**Final answer**  
\(\omega_1=\sqrt{2k/m}\), \(\omega_2=2\sqrt{k/m}\), with the coordinates above.  

*Reflection:* The symmetry forced the modes to be purely symmetric or antisymmetric; any deviation from equal masses immediately mixes the eigenvectors.

**Example 2 — Unequal masses**  
*Given:* \(m_1=m\), \(m_2=2m\), springs \(k,k,k\).  
*Find:* frequencies.  

Mass matrix \(\mathbf{M}=\operatorname{diag}(m,2m)\). Stiffness matrix remains \(\mathbf{K}=\begin{pmatrix}2k&-k\\-k&2k\end{pmatrix}\).  
Generalized eigenvalue problem solved numerically gives \(\omega^2 \approx 0.845k/m\) and \(3.155k/m\).  
Normal coordinates are linear combinations weighted by the eigenvectors.  

**Final answer**  
\(\omega_1 \approx 0.919\sqrt{k/m}\), \(\omega_2 \approx 1.776\sqrt{k/m}\).  

*Reflection:* Loss of symmetry means the mode shapes are no longer purely in- or out-of-phase; both masses move in every mode.

**Example 3 — Three identical masses in a line**  
Yields three frequencies \(\sqrt{2-\sqrt{2}} \sqrt{k/m}\), \(\sqrt{2}\sqrt{k/m}\), \(\sqrt{2+\sqrt{2}}\sqrt{k/m}\) and sinusoidal mode shapes \(\sin(jr\pi/4)\) for \(r=1,2,3\).

**Example 4 — Normal coordinates from Lagrangian**  
Write \(T\) and \(V\) in matrix form, solve the generalized eigenvalue problem, and substitute \(\mathbf{x}=\mathbf{P}\boldsymbol{\eta}\) to obtain the diagonal Lagrangian.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Forgetting mass matrix weighting  | Treating eigenvectors of \(\mathbf{K}\) alone       | Always solve the generalized problem with \(\mathbf{M}\). |
| Normalizing to unity instead of mass-weighted | Convenience of ordinary eigenvectors | Enforce \(\mathbf{a}^{(r)T}\mathbf{M}\mathbf{a}^{(s)}=\delta_{rs}\). |
| Missing the zero-frequency rigid-body mode | Translational invariance of free system             | Check that \(\omega=0\) appears when total force is zero. |
| Assuming orthogonality in Euclidean inner product | Modes are orthogonal only w.r.t. \(\mathbf{M}\)     | Use the mass inner product for all inner products.   |
| Sign error in mode shape          | Arbitrary overall phase in eigenvectors             | Fix the sign by requiring the first nonzero component positive. |
| Overcounting degenerate modes     | Repeated eigenvalues require full eigenspace        | Compute geometric multiplicity before assigning coordinates. |
| Ignoring constraints              | Imposing fixed ends without reducing degrees of freedom | Reduce the coordinate set first, then build \(\mathbf{K}\). |

## 7. The textbook-precise statement
Let \(L = T - V\) where both \(T\) and \(V\) are positive-definite quadratic forms on an \(n\)-dimensional configuration manifold. There exists an invertible linear transformation \(\mathbf{x} = \mathbf{P}\boldsymbol{\eta}\) such that
\[
L = \frac12\sum_{r=1}^n(\dot\eta_r^2 - \omega_r^2\eta_r^2),
\]
where the squared frequencies \(\omega_r^2\) are the roots of the characteristic equation \(\det(\mathbf{K}-\omega^2\mathbf{M})=0\). (Goldstein, *Classical Mechanics*, 3rd ed., §6.5.)

## 8. Visual — diagram or schematic
```text
Fixed wall          Mass 1          Mass 2          Fixed wall
   |                  m               m                |
   === k === spring === k === spring === k === spring ===
   x=0               x1              x2              x=3L
```
Horizontal axis labelled with equilibrium positions 0, L, 2L, 3L. Arrows above each mass indicate possible displacements \(x_1(t)\), \(x_2(t)\). Three springs shown with identical spring constant \(k\).

## 9. The memory technique
1. **The hook** — Picture the coupled masses as dancers on a stage; a normal mode is the single choreography in which every dancer moves in exact synchrony to one shared metronome beat.
2. **What to overlearn** — The transformation \(\mathbf{x}=\mathbf{P}\boldsymbol{\eta}\) diagonalizes both \(\mathbf{M}\) and \(\mathbf{K}\); frequencies satisfy \(\det(\mathbf{K}-\omega^2\mathbf{M})=0\); normal coordinates are mass-orthonormal.
3. **Spaced-repetition schedule** — Review the two-mass eigenvalue problem at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Return to the Lagrangian, form the matrices \(\mathbf{M}\) and \(\mathbf{K}\), solve the generalized eigenvalue problem, and construct \(\boldsymbol{\eta}\) from the eigenvectors.

## 10. What this unlocks
Normal-mode analysis supplies the language for every subsequent treatment of small vibrations in analytical mechanics.  

- Linear stability of equilibria in Hamiltonian systems  
- Modal decomposition of continuous systems (strings, beams, membranes)  
- Canonical transformations to action-angle variables  
- Response functions and Green’s functions for driven oscillators  
- Quantum mechanics of coupled oscillators and phonon modes in solids  

## 11. Self-check — five questions, no answers
1. For two equal masses on three equal springs, derive the ratio of the two normal frequencies without solving the full characteristic equation.  
2. Show that the normal coordinates of the symmetric two-mass system are orthogonal with respect to the mass matrix.  
3. A third identical mass is added between the two existing masses. How many new normal frequencies appear, and why?  
4. If the middle spring constant is doubled while the outer springs remain unchanged, which normal frequency changes more and why?  
5. Construct an explicit counter-example in which the eigenvectors of \(\mathbf{K}\) alone are not orthogonal with respect to the kinetic-energy inner product.