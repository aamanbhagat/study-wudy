## 1. The one-sentence answer
**Solving the hydrogen atom in spherical coordinates means separating the time-independent Schrödinger equation into radial and angular parts using the spherical symmetry of the Coulomb potential, which yields quantized energy levels and wavefunctions labelled by quantum numbers n, l, m.**

The hydrogen atom consists of one proton and one electron whose interaction is purely radial, so Cartesian coordinates create unnecessary coupling between variables. Spherical coordinates exploit the 1/r potential directly, letting the Laplacian split into a radial derivative piece and an angular piece that is exactly the squared angular-momentum operator. After separation of variables the angular equation produces spherical harmonics while the radial equation produces associated Laguerre polynomials; the boundary condition that the wavefunction remain normalizable forces the energy to take only discrete negative values E_n = −13.6 eV / n².

This procedure is the first exact analytic solution of a realistic three-dimensional quantum system and therefore serves as the foundation for all multi-electron atoms and for the quantum treatment of any central-force problem.

> [!NOTE]
> The single deepest insight is that the same three numbers (n, l, m) that label the mathematical solutions also label the measurable angular momentum and its z-component; quantization is not imposed by hand but emerges automatically from square-integrability.

## 2. Why this matters — concrete and current
In quantum-computing hardware the hyperfine structure of the hydrogen atom (derived from the same radial wavefunctions) sets the frequency standard for superconducting qubit calibration at companies such as IBM Quantum and Rigetti.  

Atomic clocks flown on GPS satellites use the 1S–2S two-photon transition whose matrix element is computed from the exact hydrogen radial integrals; any error in the spherical solution propagates directly into meter-level positioning errors.  

Stellar spectroscopy codes at ESO and NASA fit observed Balmer and Lyman series lines using the same n, l selection rules obtained from spherical-harmonic angular integrals; abundance determinations of hydrogen in exoplanet atmospheres rest on these calculations.  

Semiconductor donor-impurity states in silicon and GaAs are modelled as screened hydrogen atoms; the effective Bohr radius and binding energy come from the identical radial equation with a dielectric constant inserted, guiding the design of shallow-impurity qubits at Intel and HRL Laboratories.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Time-independent Schrödinger equation | Supplies the eigenvalue problem whose solutions are stationary states of the atom.   |
| Laplacian in spherical coordinates | Converts the kinetic-energy operator into a form separable in r, θ, φ.               |
| Separation of variables  | Reduces the PDE to three ordinary differential equations, one for each coordinate.   |
| Angular-momentum commutation relations | Explain why L² and L_z share common eigenfunctions with the Hamiltonian.             |
| Regular singular points and Frobenius series | Required to solve the radial ODE and obtain the quantization condition on energy.    |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Exploit spherical symmetry
The Coulomb potential depends only on distance from the nucleus, so the Hamiltonian commutes with all rotations. This immediately tells us that energy eigenstates can be chosen as simultaneous eigenstates of L² and L_z.  
Concrete example: an electron at 1 Å from the proton feels the same potential regardless of direction, therefore the probability density need not prefer any particular Cartesian axis.  
Formal statement: [H, L_i] = 0 for i = x, y, z.  
> [!WARNING]  
> Treating the potential as non-central at this stage destroys the commutation relations and forces an intractable three-dimensional numerical problem.

### Step 2 — Write the Schrödinger equation in spherical coordinates
The Laplacian in spherical coordinates separates into a radial second-derivative term plus (1/r²) times the angular operator. Substituting V(r) = −e²/(4πε₀r) yields  
$$
-\frac{\hbar^2}{2m}\left(\frac{1}{r^2}\frac{\partial}{\partial r}r^2\frac{\partial}{\partial r}+\frac{1}{r^2}\Lambda^2\right)\psi-\frac{e^2}{4\pi\epsilon_0 r}\psi=E\psi,
$$  
where Λ² is the angular part of the Laplacian.  
> [!WARNING]  
> Forgetting the r² weighting in the radial measure produces an incorrect radial equation that fails to be self-adjoint.

### Step 3 — Separate variables
Assume ψ(r,θ,φ) = R(r)Y(θ,φ). Substituting and dividing by R Y / r² isolates a purely angular piece equal to a separation constant −ℓ(ℓ+1). The angular equation becomes the eigenvalue problem for the spherical Laplacian.  
> [!WARNING]  
> Choosing the wrong sign for the separation constant yields exponentially growing solutions that cannot be normalized on the sphere.

### Step 4 — Solve the angular equation
The θ, φ equation with periodic boundary conditions in φ and regularity at the poles produces the spherical harmonics Y_ℓ^m(θ,φ) with eigenvalues ℓ(ℓ+1)ħ² and mħ, ℓ = 0,1,2,… and m = −ℓ … +ℓ.  
> [!WARNING]  
> Allowing ℓ to be non-integer destroys single-valuedness under φ → φ + 2π.

### Step 5 — Reduce the radial equation
After inserting the angular eigenvalue the radial function u(r) = r R(r) obeys  
$$
-\frac{\hbar^2}{2m}u''+\left[-\frac{e^2}{4\pi\epsilon_0 r}+\frac{\hbar^2\ell(\ell+1)}{2mr^2}\right]u=Eu.
$$  
A change of variable ρ = 2κr with κ = √(−2mE)/ħ converts this into the associated Laguerre equation.  
> [!WARNING]  
> Omitting the centrifugal term ℓ(ℓ+1) produces the wrong effective potential and incorrect degeneracy pattern.

### Step 6 — Apply boundary conditions and quantize
Normalizability at infinity forces the series solution to terminate, which occurs only when the energy satisfies E_n = −(m e⁴)/(2 ħ² (4πε₀)² n²) with n > ℓ. The radial wavefunctions are R_{nℓ}(r) ∝ ρ^ℓ e^{−ρ/2} L_{n−ℓ−1}^{2ℓ+1}(ρ).  
> [!WARNING]  
> Accepting a non-terminating series produces an exponentially growing tail that makes the L² norm diverge.

## 5. Worked examples

**Example 1 — Ground-state wavefunction**  
*Given:* ℓ = 0, n = 1.  
*Find:* R_{10}(r).  
The radial equation reduces to the simple exponential decay. After normalization ∫|R|² r² dr = 1 we obtain R_{10}(r) = 2(a₀)^{−3/2} e^{−r/a₀}.  
*Why:* The associated Laguerre polynomial of order zero is unity, leaving only the exponential factor.  
**Final answer**  
$$R_{10}(r)=2a_0^{-3/2}e^{-r/a_0}$$  
*Reflection:* This is the only state with zero nodes; any mistake in the normalization constant immediately violates probability conservation.

**Example 2 — First excited radial function**  
*Given:* n = 2, ℓ = 0.  
*Find:* R_{20}(r).  
The Laguerre polynomial L_1^1(ρ) = 2 − ρ supplies one radial node. After inserting κ = 1/(2a₀) and normalizing, R_{20}(r) = (1/√2) a₀^{−3/2} (1 − ρ/2) e^{−ρ/2}.  
*Why:* Termination at degree n−ℓ−1 = 1 fixes the polynomial degree.  
**Final answer**  
$$R_{20}(r)=\frac{1}{\sqrt{2}}a_0^{-3/2}(1-\rho/2)e^{-\rho/2}$$  
*Reflection:* The extra node illustrates how higher n states oscillate more inside the classical turning point.

**Example 3 — Angular normalization check**  
*Given:* Y_1^0(θ,φ) = √(3/4π) cos θ.  
*Find:* ∫|Y_1^0|² dΩ.  
Direct integration over φ from 0 to 2π and θ from 0 to π yields exactly 1.  
*Why:* The constant √(3/4π) is fixed by the orthogonality of Legendre polynomials.  
**Final answer**  
integral = 1  
*Reflection:* Any omitted factor of sin θ in the measure produces an incorrect norm.

**Example 4 — Energy degeneracy**  
*Given:* n = 3.  
*Find:* number of distinct (ℓ,m) states.  
ℓ runs from 0 to 2; for each ℓ there are 2ℓ+1 values of m. Summing gives 1 + 3 + 5 = 9 states, all sharing the same energy E_3.  
*Why:* The radial equation depends on n only through the termination condition; ℓ enters merely as a parameter.  
**Final answer**  
9-fold degeneracy  
*Reflection:* This degeneracy is lifted once relativistic or spin-orbit corrections are added.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Using Cartesian Laplacian         | Habit from introductory electrostatics              | Always rewrite ∇² in spherical form before separating |
| Forgetting r² in volume element   | Confusing R(r) with the probability density         | Integrate |R(r)|² r² dr and keep the weight explicit   |
| Allowing ℓ to be negative         | Overlooking that L² eigenvalue is ℓ(ℓ+1)            | Enforce ℓ ≥ 0 from the start of the angular solution |
| Missing the centrifugal barrier   | Treating the effective potential as purely Coulomb  | Retain the +ℓ(ℓ+1)ħ²/(2mr²) term in every radial step |
| Normalizing only the angular part | Thinking Y_ℓ^m already includes radial normalization| Normalize R(r) separately with weight r²             |
| Confusing n with principal quantum number too early | Using textbook formulas before derivation         | Derive the relation n = ℓ + k + 1 from series termination first |

## 7. The textbook-precise statement
In Griffiths, *Introduction to Quantum Mechanics*, 2e, §4.1–4.3 the time-independent Schrödinger equation for the Coulomb Hamiltonian H = p²/2m − e²/(4πε₀r) is solved in spherical coordinates by writing ψ(r,θ,φ) = R(r) Y_ℓ^m(θ,φ). The angular eigenvalue problem yields Y_ℓ^m with eigenvalues ħ²ℓ(ℓ+1) and ħ m. The radial equation is transformed via ρ = 2r √(−2mE)/ħ into the associated Laguerre equation whose regular, normalizable solutions exist if and only if E_n = −(m e⁴)/(2 ħ² (4πε₀)² n²) for positive integers n > ℓ. The resulting eigenfunctions are R_{nℓ}(r) = N ρ^ℓ e^{−ρ/2} L_{n−ℓ−1}^{2ℓ+1}(ρ) with N chosen so that ∫_0^∞ |R_{nℓ}(r)|² r² dr = 1.

## 8. Visual

```text
          z
          |
          |  θ
          | /
          |/
----------+---------- y
         /|
        / |  φ
       /  |
      x   r (radial)
```
Spherical coordinates: r ≥ 0, 0 ≤ θ ≤ π, 0 ≤ φ < 2π. The polar angle θ is measured from the positive z-axis; the azimuthal angle φ lies in the xy-plane.

## 9. The memory technique

**The hook**  
Picture the electron cloud as an onion whose layers are labelled by n; each layer is further divided into ℓ “orange slices” whose orientation is fixed by m.

**What to overlearn**  
E_n = −13.6 eV / n², ℓ ≤ n−1, m = −ℓ … ℓ, and the explicit functional form of R_{10}(r).

**Spaced-repetition schedule**  
Review the energy formula after 1 day, re-derive the radial termination condition after 3 days, solve one new (n,ℓ) radial function after 7 days, and compute a dipole matrix element after 16 and 35 days.

**First-principles fallback**  
If the formula for E_n is forgotten, return to the series termination condition: the coefficient of ρ^{k+1} must vanish, which forces κ = 1/(n a₀) and thereby recovers the energy.

## 10. What this unlocks
Mastery of the hydrogen solution lets you immediately write the wavefunctions for any central-potential problem once the effective radial potential is known.  

- Fine-structure corrections and the Lamb shift in hydrogen  
- Helium atom variational calculations  
- Quantum-defect theory for alkali atoms  
- Selection rules for electric-dipole transitions via angular integrals of Y_ℓ^m  
- Scattering phase shifts in partial-wave analysis

## 11. Self-check — five questions, no answers
1. Starting from the separated radial equation, show that the ground-state energy is exactly −13.6 eV when the Bohr radius is defined as a₀ = 4πε₀ ħ² / (m e²).  
2. For n = 4, list all allowed (ℓ,m) pairs and state the degeneracy.  
3. Demonstrate that the radial probability density for the 2p state (ℓ = 1) peaks at r = 4a₀.  
4. Identify the step where an incorrect choice of separation constant would produce non-normalizable angular functions.  
5. Using the explicit form of R_{21}(r), compute the expectation value ⟨r⟩ and verify it equals 5a₀.