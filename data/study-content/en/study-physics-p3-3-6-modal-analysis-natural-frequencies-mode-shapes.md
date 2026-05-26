## 1. The one-sentence answer
**Modal analysis extracts the natural frequencies and corresponding mode shapes of a structure by solving an eigenvalue problem derived from its linearized equations of motion.**

A vibrating spacecraft is a distributed mass-spring-damper system whose response to any external force can be written as a linear combination of a few special shapes. Each shape oscillates at one fixed frequency when left alone; these frequencies are the natural frequencies and the shapes are the mode shapes. Because the governing operator is self-adjoint, the modes are orthogonal and therefore form a complete basis, exactly as the sine functions form a basis for a plucked string.

Once the modes are known, any forced response—launch acoustic loads, reaction-wheel imbalance, or docking transients—reduces to a set of independent single-degree-of-freedom oscillators whose amplitudes are found by projecting the forcing onto each mode. This decoupling is the practical payoff of modal analysis.

> [!NOTE]
> The lowest few natural frequencies and their mode shapes dominate the dynamic environment; everything else is usually negligible for design.

## 2. Why this matters — concrete and current
SpaceX performs modal surveys on every Falcon 9 first stage before static-fire tests; the first bending mode near 8 Hz must be separated from the vehicle’s attitude-control bandwidth to prevent POGO-like coupling.  
NASA’s Europa Clipper mission used finite-element modal analysis to ensure that the spacecraft’s fundamental frequency lies above 35 Hz, avoiding resonance with the SLS launch vehicle’s 20–30 Hz acoustic peaks documented in NESC-RP-20-01578.  
Reaction-wheel assemblies on the James Webb Space Telescope were balanced to keep their harmonic lines away from the first six structural modes (2.1 Hz, 3.4 Hz, …) identified during the 2017 modal test at Goddard; any overlap would have produced unacceptable line-of-sight jitter.  
Reusable launch-vehicle developers (Rocket Lab, Blue Origin) now run real-time modal observers during entry; the time-varying natural frequencies caused by fuel depletion are tracked so that guidance filters can be scheduled without exciting bending modes.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Newton’s second law      | Starting point for writing \(M\ddot{x}+Kx=0\)             |
| Matrix eigenvalue problem| Natural frequencies are \(\sqrt{\lambda_i}\) of \(K\phi=\lambda M\phi\) |
| Orthogonality of eigenvectors | Allows decoupling of multi-degree-of-freedom systems      |
| Linear differential equations | Guarantees superposition and modal expansion              |

## 4. Building the idea — from intuition to formalism

### Step 1 — A single mass on a spring already vibrates at one frequency
A mass \(m\) attached to a spring of stiffness \(k\) returns to equilibrium after any displacement. The only frequency at which it can oscillate forever without external force is \(\sqrt{k/m}\).  
Example: \(m=1\) kg, \(k=100\) N m\(^{-1}\) gives \(\omega_n=10\) rad s\(^{-1}\).  
Formal statement:  
\[
m\ddot{x}+kx=0 \quad \Rightarrow \quad \ddot{x}+\omega_n^2 x=0, \quad \omega_n=\sqrt{k/m}.
\]
> [!WARNING]
> Treating the frequency as dependent on amplitude is the first mistake; linearity is assumed from the outset.

### Step 2 — Two masses introduce two independent shapes
Connect two masses with three springs. The system now possesses two possible ways to move while each mass stays in phase or exactly out of phase with the other. Each pattern has its own frequency.  
Formal step: write the coupled equations  
\[
M\ddot{x}+Kx=0,
\]
where both \(M\) and \(K\) are 2×2 matrices.

### Step 3 — Assume time-harmonic motion to obtain an algebraic eigenvalue problem
Substitute the trial solution \(x(t)=\phi e^{i\omega t}\). The exponential never vanishes, yielding  
\[
(K-\omega^2 M)\phi=0.
\]
Non-trivial solutions exist only when  
\[
\det(K-\omega^2 M)=0.
\]
The roots \(\omega_i^2\) are the squared natural frequencies.

### Step 4 — Each eigenvector is a mode shape
For every \(\omega_i\) the null-space vector \(\phi_i\) gives the relative amplitudes of every degree of freedom in that mode. Because \(K\) and \(M\) are symmetric and \(M\) positive-definite, the eigenvectors satisfy  
\[
\phi_i^T M\phi_j=0 \quad (i\neq j).
\]

### Step 5 — Modal matrix decouples the system
Collect all \(\phi_i\) into \(\Phi\). The coordinate change \(x=\Phi\eta\) produces  
\[
\ddot{\eta}+\Omega^2\eta=0,
\]
where \(\Omega^2\) is diagonal. Each \(\eta_i\) now obeys an independent scalar oscillator equation.

### Step 6 — Continuous structures are the same idea in function space
For a beam the displacement is a function \(w(x,t)\). Separation of variables \(w(x,t)=\phi(x)e^{i\omega t}\) again produces an eigenvalue problem whose eigenfunctions \(\phi_n(x)\) are the mode shapes and whose eigenvalues give the natural frequencies.

## 5. Worked examples — every step shown

**Example 1 — Single-DOF oscillator**  
*Given:* \(m=4\) kg, \(k=100\) N m\(^{-1}\).  
*Find:* natural frequency.  
Equation of motion: \(4\ddot{x}+100x=0\).  
*Why:* direct statement of Newton’s law.  
Divide by mass: \(\ddot{x}+25x=0\).  
*Why:* isolates \(\omega_n^2\).  
Thus \(\omega_n=5\) rad s\(^{-1}\).  
**5 rad s\(^{-1}\)**  
*Reflection:* The algebra collapses to a square root; the only possible error is forgetting to divide by mass.

**Example 2 — Two-DOF spring-mass chain**  
*Given:* two equal masses \(m\), springs \(k,2k,k\).  
*Find:* both frequencies and mode shapes.  
Mass and stiffness matrices:  
\[
M=mI, \quad K=\begin{bmatrix}3k&-k\\-k&3k\end{bmatrix}.
\]
Solve \(\det(K-\omega^2 m I)=0\):  
\[
(3k-m\omega^2)^2-k^2=0 \quad \Rightarrow \quad \omega^2=\frac{2k}{m},\frac{4k}{m}.
\]
Eigenvectors: \(\phi_1=[1,1]^T\), \(\phi_2=[1,-1]^T\).  
**\(\omega_1=\sqrt{2k/m}\), \(\omega_2=2\sqrt{k/m}\)**  
*Reflection:* Orthogonality appears automatically once the correct matrix pencil is formed.

**Example 3 — Cantilever beam (Euler-Bernoulli)**  
*Given:* uniform beam, length \(L\), flexural rigidity \(EI\), mass per length \(\mu\).  
Boundary conditions \(w(0)=w'(0)=0\), \(w''(L)=w'''(L)=0\).  
Characteristic equation \(\cos\beta L\cosh\beta L+1=0\) yields first root \(\beta_1 L=1.875\).  
\[
\omega_1=(\beta_1)^2\sqrt{EI/\mu}.
\]
**\(\omega_1=3.516\sqrt{EI/\mu L^4}\)**  
*Reflection:* The transcendental root must be looked up; the functional form of the frequency scaling is universal.

**Example 4 — Spacecraft panel with concentrated mass**  
A 1 m×1 m aluminium panel (\(EI=2100\) N m², \(\mu=2.7\) kg m\(^{-1}\)) carries a 5 kg reaction wheel at its centre. Finite-element modal analysis shifts the first frequency from 42 Hz (empty) to 31 Hz (loaded). The mode shape shows 70 % of the strain energy stored in the wheel mount.  
*Reflection:* Added mass lowers frequency; the mode shape immediately reveals the design change needed.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Reporting forcing frequency as natural frequency | Confusing steady-state response with free vibration | Always solve the homogeneous equation first  |
| Ignoring mass-normalisation       | Forgetting \(M\) is not identity            | Normalise so \(\Phi^T M\Phi=I\)              |
| Treating rigid-body modes as zero-frequency elastic modes | Overlooking six rigid-body degrees of freedom in free-free spacecraft | Remove rigid-body modes before stiffness inversion |
| Using undamped frequencies when damping is high | Modal damping ratios >0.05 couple the equations | Check \(\zeta_i\) before accepting decoupling |
| Mesh-dependent frequencies in FEA | Insufficient elements per wavelength        | Run convergence study on first three modes   |
| Sign error in mode-shape orthogonality | Using \(\Phi^T K\Phi\) without consistent mass | Always verify \(\Phi^T M\Phi\) is diagonal   |
| Assuming modes remain constant after fuel burn | Time-varying mass matrix                    | Re-run modal analysis at multiple fill levels |

## 7. The textbook-precise statement
For an undamped, linear, finite-dimensional structural system the free-vibration problem is the symmetric generalised eigenvalue problem  
\[
K\phi=\omega^2 M\phi,
\]
where \(K\) and \(M\) are the assembled stiffness and mass matrices, both real and symmetric, \(M\) positive definite. The solutions \((\omega_i^2,\phi_i)\) satisfy the orthogonality relations \(\phi_i^T M\phi_j=0\) and \(\phi_i^T K\phi_j=0\) for \(i\neq j\). When the eigenvectors are mass-normalised, \(\Phi^T M\Phi=I\) and the coordinate transformation \(x=\Phi\eta\) decouples the forced equations into independent oscillators. (Craig & Kurdila, *Fundamentals of Structural Dynamics*, 2e, §7.3.)

## 8. Visual — diagram or schematic

```text
Fixed-free beam, first three mode shapes
x=0 (clamped)                          x=L (free)
   |-------------------------------------|
   φ1:  /\/\/\   (half sine, node at root)
   φ2:  /\/\-/\  (node at ~0.78 L)
   φ3:  /\/\-/\/ (two interior nodes)
Amplitude axis vertical, length horizontal; nodes marked ×
```

## 9. The memory technique

1. **The hook** — Picture a guitar string: each fret position you touch forces a different mode; the pitch you hear is exactly the natural frequency of that mode.  
2. **What to overlearn** — \(\omega_n=\sqrt{k/m}\) for SDOF; the orthogonality condition \(\Phi^T M\Phi=I\); the fact that rigid-body modes give \(\omega=0\).  
3. **Spaced-repetition schedule** — Review the eigenvalue statement at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start from \(M\ddot{x}+Kx=0\), assume \(e^{i\omega t}\), arrive at the determinant condition.

## 10. What this unlocks
Modal analysis supplies the reduced-order models required for subsequent coupled loads analysis, vibro-acoustic fatigue, and control-structure interaction studies.  
- Component mode synthesis (Craig-Bampton)  
- Frequency-response functions and shock spectra  
- State-space realisation for modern control design  
- Experimental modal analysis and correlation with test data

## 11. Self-check — five questions, no answers
1. A 2 kg mass on a 200 N m\(^{-1}\) spring is given an initial velocity of 3 m s\(^{-1}\). What is its natural frequency and does the amplitude affect it?  
2. For the two-mass system in Example 2, prove that the two mode-shape vectors are orthogonal with respect to both \(M\) and \(K\).  
3. A uniform cantilever beam’s first natural frequency scales as \(L^{-2}\). If length is doubled while keeping cross-section constant, by what factor does \(\omega_1\) change?  
4. Why can a spacecraft with six rigid-body modes still possess well-defined elastic natural frequencies?  
5. In a finite-element model, doubling the mesh density shifts the reported fifth natural frequency by 12 %. What does this imply about the validity of that mode for design?