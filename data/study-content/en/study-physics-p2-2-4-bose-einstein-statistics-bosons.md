## 1. The one-sentence answer
**Bose-Einstein statistics give the average occupation number of a quantum state for indistinguishable bosons: \( n_i = \frac{1}{e^{(\varepsilon_i - \mu)/kT} - 1} \).**

Bosons are particles whose wave function remains unchanged under exchange; any number may therefore occupy one single-particle state. The counting of microstates therefore differs sharply from the classical or fermionic case: the multiplicity for \( n \) bosons in \( g \) states is the “stars and bars” expression \( \binom{n+g-1}{n} \). When this multiplicity is maximised subject to fixed total energy and particle number, the occupation number quoted above appears.

The minus sign in the denominator is decisive. It permits \( n_i \) to become arbitrarily large when \( \varepsilon_i \) approaches \( \mu \), opening the route to macroscopic occupation of the ground state—Bose-Einstein condensation.

> [!NOTE]
> The single fact that the exchange sign is positive (rather than negative) converts an exclusion principle into an occupation principle and thereby produces condensation, superfluidity, and the black-body spectrum.

## 2. Why this matters — concrete and current
Laser cooling and trapping of rubidium atoms at NIST and JILA produced the first gaseous Bose-Einstein condensate in 1995; the same statistics now govern the design of atom interferometers flown on sounding rockets and the International Space Station.

Photon gases inside semiconductor microcavities obey Bose-Einstein statistics; the resulting polariton condensates are the active medium in commercial coherent-light sources developed by companies such as Infinera for low-threshold photonic integrated circuits.

Helium-4, whose atoms are spin-zero bosons, remains a superfluid below 2.17 K; every quantitative model of the lambda transition begins from the ideal Bose gas and then adds interactions, exactly as formulated in the 1938 London theory still used by cryogenic engineers at CERN.

Dilute ultracold Bose gases serve as analogue simulators for quantum field theory; experiments at the University of Chicago and at the Max-Planck Institute for Quantum Optics have mapped the Berezinskii–Kosterlitz–Thouless transition, directly testing predictions that later appear in models of two-dimensional turbulence on aircraft wings.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Indistinguishability of identical particles | Determines whether the wave function is symmetric or antisymmetric and therefore which counting rule applies |
| Lagrange multipliers for constraints | Used to maximise entropy subject to fixed \( N \) and \( E \) |
| Density of states \( g(\varepsilon) \) | Converts the discrete sum over states into an integral needed for thermodynamic potentials |
| Chemical potential \( \mu \)   | Enters the distribution as the Lagrange multiplier for particle number; must satisfy \( \mu < \varepsilon_0 \) for bosons |

## 4. Building the idea — from intuition to formalism

### Step 1 — Exchange symmetry fixes the counting
Two identical bosons can occupy the same single-particle state; exchanging their labels leaves the many-body wave function unchanged. Consequently the number of distinct microstates for \( n \) bosons placed in \( g \) states is the combinations-with-repetition formula \( \binom{n+g-1}{n} \).

A concrete example: three bosons and two states yield four microstates—(3,0), (2,1), (1,2), (0,3)—rather than the eight that would appear for distinguishable particles.

The formal statement is
\[
W = \prod_i \frac{(n_i + g_i - 1)!}{n_i! (g_i - 1)!}.
\]

> [!WARNING]
> Treating the particles as distinguishable replaces the denominator \( n_i! \) with 1 and immediately produces Maxwell–Boltzmann statistics; the Bose correction is lost.

### Step 2 — Entropy from the multiplicity
Take the logarithm of \( W \) and apply Stirling’s approximation \( \ln N! \approx N\ln N - N \). The entropy becomes
\[
S = k \sum_i \bigl[(n_i + g_i)\ln(n_i + g_i) - n_i\ln n_i - g_i\ln g_i\bigr].
\]

### Step 3 — Maximisation with constraints
Introduce Lagrange multipliers \( \alpha \) and \( \beta \) for the constraints \( \sum n_i = N \) and \( \sum n_i\varepsilon_i = E \). Differentiate \( S/k - \alpha N - \beta E \) with respect to each \( n_i \) and set the derivative to zero:
\[
\ln\frac{n_i + g_i}{n_i} - \alpha - \beta\varepsilon_i = 0.
\]

### Step 4 — Solve for the mean occupation
Rearrange the stationarity condition:
\[
n_i = \frac{g_i}{e^{\alpha + \beta\varepsilon_i} - 1}.
\]
Thermodynamic identification gives \( \beta = 1/kT \) and \( \alpha = -\mu/kT \), so
\[
\langle n_i \rangle = \frac{1}{e^{(\varepsilon_i - \mu)/kT} - 1}.
\]

### Step 5 — Thermodynamic limit and condensation
When the total particle number is fixed, the chemical potential is bounded by \( \mu \le \varepsilon_0 \). Below a critical temperature the excited states cannot accommodate all particles; the excess occupies the ground state macroscopically. This is the textbook statement of Bose–Einstein condensation.

## 5. Worked examples — every step shown

**Example 1 — Two-state toy model**  
*Given:* Two single-particle states, \( \varepsilon_1 = 0 \), \( \varepsilon_2 = \varepsilon \), \( g_1 = g_2 = 1 \), \( N = 2 \), \( T \) such that \( kT = \varepsilon \).  
*Find:* \( \langle n_1 \rangle \) and \( \langle n_2 \rangle \).  

Set \( z = e^{\mu/kT} \). Normalisation \( N = \langle n_1 \rangle + \langle n_2 \rangle \) yields the quadratic equation \( z^2 + z(2 - e^{-\varepsilon/kT}) - 1 = 0 \).  
Solving gives \( z = \frac{-1 + \sqrt{5}}{2} \) at the chosen temperature.  
Thus \( \langle n_1 \rangle = \frac{z}{1-z} = \frac{1+\sqrt{5}}{2} \).  
**Final answer**  
\[ \langle n_1 \rangle = \frac{1+\sqrt{5}}{2},\quad \langle n_2 \rangle = 2 - \langle n_1 \rangle. \]  

*Reflection:* The quadratic appears because the states are coupled only through the global particle constraint; the same algebra generalises to any finite number of levels.

**Example 2 — Continuum density of states**  
*Given:* Three-dimensional free particles, \( g(\varepsilon) = \frac{V}{4\pi^2}\left(\frac{2m}{\hbar^2}\right)^{3/2}\varepsilon^{1/2} \).  
*Find:* The relation that determines \( \mu(T) \) for fixed \( N \).  

The integral \( N = \int_0^\infty \frac{g(\varepsilon)d\varepsilon}{z^{-1}e^{\varepsilon/kT}-1} \) must be solved for \( z(T) \). At high \( T \), \( z\ll 1 \) and the distribution reduces to the classical limit.  

**Final answer**  
\[ N = \frac{V}{\lambda^3}g_{3/2}(z),\quad\lambda = \sqrt{\frac{2\pi\hbar^2}{mkT}}. \]  

*Reflection:* The polylogarithm \( g_{3/2}(z) \) encodes the entire thermal depletion of excited states.

**Example 3 — Critical temperature for condensation**  
*Given:* The same density of states, \( z=1 \).  
*Find:* \( T_c \) at which \( \mu \) reaches zero.  

Set \( N = \frac{V}{\lambda_c^3}g_{3/2}(1) \).  
**Final answer**  
\[ T_c = \frac{2\pi\hbar^2}{mk}\left(\frac{N}{V\zeta(3/2)}\right)^{2/3}. \]  

*Reflection:* The numerical factor \( \zeta(3/2)\approx 2.612 \) is universal for any non-relativistic Bose gas in three dimensions.

**Example 4 — Ground-state fraction below \( T_c \)**  
*Given:* \( T < T_c \).  
*Find:* \( N_0/N \).  

All particles not in excited states reside in the condensate:  
\[ \frac{N_0}{N} = 1 - \left(\frac{T}{T_c}\right)^{3/2}. \]  
**Final answer**  
\[ \frac{N_0}{N} = 1 - \left(\frac{T}{T_c}\right)^{3/2}. \]  

*Reflection:* The \( 3/2 \) power is the direct signature of the three-dimensional density of states.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using \( +1 \) in the denominator for bosons | Confusion with Fermi–Dirac statistics | Write the sign explicitly from the multiplicity derivative each time |
| Allowing \( \mu > \varepsilon_0 \) | Forgetting that \( n_0 \) would become negative | Enforce \( \mu \le \varepsilon_0 \) and introduce \( N_0 \) by hand below \( T_c \) |
| Treating photons or phonons with fixed \( N \) | Chemical potential is zero for these species | Set \( \mu = 0 \) from the start and drop the particle-number constraint |
| Using the continuum integral above \( T_c \) without checking \( z<1 \) | The integral diverges at \( z=1 \) for \( d\le 2 \) | Always verify the convergence of the Bose functions before integrating |
| Forgetting that \( g_i \) may be greater than 1 | Degeneracy is absorbed into the density of states | Keep \( g_i \) explicit until the continuum limit is taken |
| Applying the distribution to fermions | Sign error in the original multiplicity | Re-derive the multiplicity from the symmetrised wave function before any calculation |
| Ignoring interactions when comparing with liquid helium | Ideal-gas model is only qualitative | Use the ideal result as the reference point, then add Bogoliubov corrections |

## 7. The textbook-precise statement
For a system of non-interacting bosons the grand potential is
\[
\Phi = kT\sum_i g_i\ln\bigl(1 - z e^{-\beta\varepsilon_i}\bigr),
\]
where \( z = e^{\beta\mu} \) and the sum is over all single-particle states. The average occupation of level \( i \) follows by differentiation:
\[
\langle n_i \rangle = z\frac{\partial}{\partial z}\ln\Xi = \frac{1}{z^{-1}e^{\beta\varepsilon_i}-1}.
\]
This is Theorem 5.3 in Pathria & Beale, *Statistical Mechanics*, 3rd ed., §5.3.

## 8. Visual — diagram or schematic
```text
Energy
  ↑
  │   excited states
  │   ────────────────────────────────  μ(T) < 0   (T > Tc)
  │
  │   ────────────────────────────────  μ=0        (T=Tc)
  │
  │   ════════════════════════════════  μ=0, N0>0  (T<Tc)
  │          ground state (macroscopic)
  └──────────────────────────────────────► T
```
Horizontal lines represent single-particle levels; the lowest level acquires macroscopic occupation only below \( T_c \).

## 9. The memory technique

1. **The hook** — Picture bosons as friendly commuters who happily pile into the same train carriage; fermions are commuters who refuse to share a seat.  
2. **What to overlearn** — The distribution formula itself, the bound \( \mu\le\varepsilon_0 \), and the relation \( T_c\propto n^{2/3} \).  
3. **Spaced-repetition schedule** — Review the distribution at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the multiplicity \( \binom{n+g-1}{n} \), take \( \ln W \), introduce two Lagrange multipliers, and differentiate.

## 10. What this unlocks
Bose–Einstein statistics are the gateway to superfluid hydrodynamics, the Bogoliubov–de Gennes equations, and the theory of anyonic statistics in two dimensions.

- Photon and phonon gases (black-body radiation, Debye theory)  
- Bogoliubov theory of weakly interacting condensates  
- Gross–Pitaevskii equation for inhomogeneous condensates  
- Berezinskii–Kosterlitz–Thouless transition in 2-D films  
- Quantum simulation of lattice gauge theories with ultracold bosons

## 11. Self-check — five questions, no answers
1. Derive the Bose distribution starting from the multiplicity \( W=\prod_i\binom{n_i+g_i-1}{n_i} \) and two Lagrange multipliers; state every approximation.  
2. For an ideal Bose gas in a 3-D harmonic trap, show that the critical temperature scales as \( N^{1/3} \) rather than \( N^{2/3} \).  
3. A system of bosons has a density of states \( g(\varepsilon)\propto\varepsilon^{d/2-1} \). For which dimensions does Bose condensation occur at finite temperature?  
4. Why does the chemical potential of a photon gas remain exactly zero at all temperatures, while that of massive bosons must approach zero from below?  
5. In an experiment the measured condensate fraction follows \( 1-(T/T_c)^{3/2} \) only approximately. Name the leading correction that must be added and the physical origin of that correction.