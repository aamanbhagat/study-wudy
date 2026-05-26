## 1. The one-sentence answer
**Quantum numbers n, l, mₗ, mₛ are the four integers that completely label each allowed stationary state of an electron in a hydrogen-like atom.**

These four numbers arise because the time-independent Schrödinger equation in three dimensions separates into radial and angular parts, each yielding a quantization condition. The principal number n fixes the energy; the orbital number l fixes the magnitude of angular momentum; mₗ fixes its projection along a chosen axis; and mₛ fixes the projection of the electron’s intrinsic spin. Together they enumerate every distinct solution of the wave equation that satisfies the boundary condition that the wave function remain square-integrable.

The labels are not arbitrary tags. Each number is forced by requiring single-valuedness of the wave function under a 2π rotation or by requiring the radial function to vanish at infinity. Change any one number and you obtain a physically different probability density and a different energy (except for the accidental degeneracy in pure 1/r potentials).

> [!NOTE]
> The four quantum numbers are not “properties an electron carries”; they are the eigenvalues that select one unique solution from the infinite-dimensional Hilbert space of the Coulomb problem.

## 2. Why this matters — concrete and current
Atomic clocks aboard GPS satellites use the hyperfine transition in cesium-133 whose frequency is fixed by the same quantum numbers that label the ground state; any misassignment of mₛ would shift the clock rate by parts in 10¹⁵ and produce meter-level positioning errors.

In semiconductor device physics, the effective-mass approximation for electrons in silicon conduction-band minima is labeled by the same n-like envelope quantum number; Intel and TSMC engineers rely on these labels when designing the 2 nm node gate stacks that will fly in future reusable launch vehicles.

Quantum-dot single-photon sources for satellite-to-ground quantum key distribution (Chinese Micius mission follow-ons) require precise control of the exciton’s l = 1 bright state; the mₗ = ±1 sublevels determine the polarization of the emitted photon.

X-ray photoelectron spectroscopy of thermal-protection tiles on re-entry vehicles identifies oxidation states through core-level binding energies that shift according to the principal quantum number n of the ejected electron.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Time-independent Schrödinger equation in spherical coordinates | The separation into R(r)Y(θ,φ) produces the four quantum numbers directly. |
| Angular-momentum operator algebra [L², L_z] = 0 | Eigenvalues of L² and L_z are ħ²l(l+1) and ħmₗ; without this algebra the allowed values of l and mₗ cannot be derived. |
| Pauli exclusion principle | Two electrons may occupy the same spatial orbital only if mₛ differs; the fourth quantum number is required by antisymmetry of the fermionic wave function. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Radial nodes and the principal quantum number n
A bound-state wave function must vanish at infinity and be normalizable. For the Coulomb potential the radial equation admits solutions only when an integer n appears in the termination condition of the associated Laguerre series.

Example: the ground state has zero radial nodes and n = 1.  
Formal statement:
$$
E_n = -\frac{13.6\,\text{eV}}{n^2},\qquad n=1,2,3,\dots
$$
> [!WARNING]
> Treating n as a continuous variable destroys normalizability; the series diverges.

### Step 2 — Angular momentum magnitude and the azimuthal quantum number l
After separation, the θ equation is the associated Legendre equation. Single-valuedness under φ → φ + 2π forces the separation constant to be l(l+1) with l an integer.

Example: l = 0 gives a spherically symmetric s orbital.  
Formal statement:
$$
L^2 Y_{lm} = \hbar^2 l(l+1)Y_{lm},\qquad l=0,1,\dots,n-1
$$

### Step 3 — Projection along a laboratory axis and the magnetic quantum number mₗ
The φ equation is elementary: periodicity again quantizes the eigenvalue of L_z.

Example: for l = 1 the three possibilities are mₗ = −1,0,+1 (p_x, p_z, p_y orbitals after linear combination).  
Formal statement:
$$
L_z Y_{lm} = \hbar m_l Y_{lm},\qquad m_l=-l,-l+1,\dots,+l
$$

### Step 4 — Intrinsic spin and the spin quantum number mₛ
The electron possesses an additional two-valued degree of freedom required by the Dirac equation and by the Stern–Gerlach experiment. No classical orbital motion produces it.

Formal statement:
$$
S_z\chi_{m_s}=\hbar m_s\chi_{m_s},\qquad m_s=\pm\frac12
$$

### Step 5 — The complete set of commuting observables
The four operators H, L², L_z, S_z commute and therefore possess a common eigenbasis labeled uniquely by the quartet (n,l,mₗ,mₛ). This is the textbook statement of the hydrogen-atom solution.

## 5. Worked examples — every step shown

**Example 1 — Allowed values for n = 2**  
*Given:* n = 2.  
*Find:* all possible (l, mₗ, mₛ).  
Step 1: l runs from 0 to n−1 → l = 0,1.  
*Why:* termination condition of radial series.  
Step 2: for l = 0, mₗ = 0 only.  
*Why:* |mₗ| ≤ l.  
Step 3: for l = 1, mₗ = −1,0,+1.  
Step 4: each spatial state admits two spin orientations.  
**All eight states:** (2,0,0,±½), (2,1,−1,±½), (2,1,0,±½), (2,1,+1,±½).

**Example 2 — Energy degeneracy**  
*Given:* n = 3.  
*Find:* number of distinct states with the same energy.  
Count:  n² = 9 orbital states × 2 spins = 18 microstates.  
*Why:* energy depends only on n for pure Coulomb potential.

**Example 3 — Spectroscopic notation**  
*Given:* an electron with l = 2, mₗ = −1.  
*Find:* term symbol letter.  
l = 0 → s, 1 → p, 2 → d.  
Result: 3d electron (n is still free).

**Example 4 — Pauli blocking in helium**  
*Given:* both electrons in n = 1.  
*Find:* allowed spin configuration.  
Only mₗ = 0 for l = 0; therefore mₛ must be opposite → singlet state ¹S₀.  
Parallel spins would require different spatial orbitals, raising the energy.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Allowing l ≥ n | Students remember “l < n” as an inequality but forget the upper bound is n−1. | Always write the closed interval 0 ≤ l ≤ n−1 before listing values. |
| Treating mₛ as an orbital quantum number | Confusion between spin and orbital angular momentum. | Keep two separate columns when tabulating: orbital (n,l,mₗ) and spin (mₛ). |
| Forgetting degeneracy lifting in external fields | In zero field all mₗ share the same energy; students assume this persists. | Add the Zeeman term explicitly when B ≠ 0. |
| Sign error in mₗ range | Counting from −l to +l inclusive is easy to off-by-one. | Count: 2l+1 possibilities. |
| Assuming n can be zero | Bohr model intuition collides with Laguerre polynomials. | n starts at 1 because the radial node count is n−l−1 ≥ 0. |
| Confusing mₗ with ml in molecules | Different conventions in diatomic spectroscopy. | Stay inside atomic notation until the molecule is introduced. |
| Neglecting that mₛ = ±½ are eigenvalues, not vectors | Students draw arrows of length ½. | Emphasize projection only; the spin vector length is √(3/4)ħ. |

## 7. The textbook-precise statement
For the Hamiltonian H = p²/2m − Ze²/r the spectrum is labeled by the simultaneous eigenfunctions of {H, L², L_z, S_z}:

$$
\psi_{nlm_lm_s}(r,\theta,\phi) = R_{nl}(r)Y_l^{m_l}(\theta,\phi)\chi_{m_s}
$$

with
$$
n=1,2,\dots;\quad l=0,1,\dots,n-1;\quad m_l=-l,\dots,l;\quad m_s=\pm\frac12.
$$
Energy eigenvalues depend only on n:
$$
E_n = -\frac{\mu Z^2e^4}{2\hbar^2n^2}.
\]
(Bransden & Joachain, *Physics of Atoms and Molecules*, 2e, §2.3.)

## 8. Visual — diagram or schematic
```text
n = 3
├── l = 0  (s)          mₗ = 0
│                     mₛ = ±½   → 2 states
├── l = 1  (p)          mₗ = −1,0,+1
│                     mₛ = ±½   → 6 states
└── l = 2  (d)          mₗ = −2..+2
                      mₛ = ±½   → 10 states
Total for n = 3: 18 states
```
Each branch is an independent eigenstate of the four commuting operators.

## 9. The memory technique

1. **The hook** — Picture a hotel with floors numbered n; each floor has corridors shaped by l (round, figure-8, clover…); rooms along the corridor numbered mₗ; every room has two bunks labeled mₛ = “up” or “down”.
2. **What to overlearn** — The range rules: l = 0…n−1, |mₗ| ≤ l, mₛ = ±½; and the degeneracy n² × 2.
3. **Spaced-repetition schedule** — 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive the allowed l from the termination of the series solution of the radial equation; re-derive mₗ from e^{imₗφ} single-valuedness.

## 10. What this unlocks
These labels are the starting point for the periodic table, term symbols, selection rules Δl = ±1, Δmₗ = 0,±1, and the entire machinery of atomic spectroscopy. Next topics that rest directly on them are: multi-electron atoms and Hartree–Fock, fine structure and spin–orbit coupling, Zeeman and Stark effects, and the addition of angular momenta (Clebsch–Gordan coefficients).

## 11. Self-check — five questions, no answers
1. List every allowed set of quantum numbers for an electron with n = 4.  
2. How many states share the energy E₄ in hydrogen? In helium?  
3. An electron has l = 3; what are the possible values of mₗ and how many different mₛ choices exist for each?  
4. In a weak magnetic field the mₗ = +1 and mₗ = −1 states split symmetrically about mₗ = 0. Why does mₛ still produce an additional twofold degeneracy at this level of approximation?  
5. Suppose the radial wave function for a hypothetical potential never terminates unless n > l + 2. How would the degeneracy pattern for a given n change?