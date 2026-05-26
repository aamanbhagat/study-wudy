## 1. The one-sentence answer
**Quantum tunneling is the penetration of a particle’s wave function into and through a classically forbidden region, with a nonzero transmission coefficient \(T\) giving the probability current that emerges on the far side.**

A particle with energy \(E\) incident on a potential barrier of height \(V_0 > E\) has zero probability of crossing in classical mechanics. In quantum mechanics the wave function does not terminate abruptly at the classical turning point; it decays exponentially inside the barrier yet remains finite at the exit face, allowing a transmitted wave of smaller amplitude.

The transmission coefficient \(T\) is obtained by solving the time-independent Schrödinger equation in three spatial regions (before, inside, and after the barrier), enforcing continuity of both \(\psi\) and \(\psi'\) at each interface, and forming the ratio of transmitted to incident probability current. For a rectangular barrier of width \(L\) in the limit \(\kappa L \gg 1\), where \(\kappa = \sqrt{2m(V_0-E)}/\hbar\), this ratio simplifies to an exponentially small but nonzero value.

> [!NOTE]
> The decisive insight is that the wave function is never required to be zero inside a finite barrier; only its second derivative is constrained by the local value of \(V(x)-E\). That single fact converts an impossible classical crossing into a measurable quantum probability.

## 2. Why this matters — concrete and current
Scanning tunneling microscopes, invented by Binnig and Rohrer at IBM Zürich in 1981, map surfaces at atomic resolution by measuring the exponential dependence of tunneling current on tip–sample separation; the same principle now underpins atomic-scale lithography tools used by semiconductor foundries.

Alpha decay rates of heavy nuclei are quantitatively predicted by the Gamow factor, an instance of tunneling through the Coulomb barrier; measured half-lives of \(^{238}\)U and \(^{232}\)Th match the calculated transmission coefficients to within a few percent.

Josephson tunnel junctions, fabricated by Hypres and other superconducting electronics firms, rely on macroscopic tunneling of Cooper pairs; these junctions form the basis of the voltage standards maintained by NIST and are candidate qubits in Google’s and IBM’s quantum processors.

In inertial-confinement fusion experiments at the National Ignition Facility, the tunneling probability of deuterium nuclei through the Coulomb barrier at keV temperatures contributes to the reaction rate that must be modeled for target design.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Time-independent Schrödinger equation | Supplies the differential equation solved in each region of constant potential. |
| Continuity of \(\psi\) and \(\psi'\) | Boundary conditions that determine the eight unknown coefficients (four regions yield four coefficients after discarding the unphysical growing exponential). |
| Probability current \(J\) | Defines the incident and transmitted fluxes whose ratio is \(T\). |
| Exponential decay length \(\kappa^{-1}\) | Sets the scale of penetration inside the barrier and the functional form of \(T\). |

## 4. Building the idea — from intuition to formalism

### Step 1 — Classical prohibition versus wave penetration
Classically a particle with \(E < V_0\) reflects perfectly at the barrier face. Quantum mechanically the wave function penetrates a finite distance.  
Concrete example: an electron with 5 eV kinetic energy meets a 10 eV step; classically it stops, yet its wave function decays over roughly 0.1 nm.  
Formal statement: inside the barrier the solution is \(\psi(x) = A e^{-\kappa x} + B e^{\kappa x}\) with \(\kappa = \sqrt{2m(V_0-E)}/\hbar > 0\).  
> [!WARNING]  
> Treating \(\psi\) as identically zero inside the barrier erases the transmitted amplitude and yields the false result \(T=0\).

### Step 2 — Three-region division of space
Divide the axis into left (\(x<0\)), barrier (\(0<x<L\)), and right (\(x>L\)) domains, each with constant potential. Write the general solution in each domain.  
Formal statement:  
Region I (\(x<0\)): \(\psi_I = A e^{ikx} + B e^{-ikx}\), \(k=\sqrt{2mE}/\hbar\).  
Region II (\(0<x<L\)): \(\psi_{II} = C e^{-\kappa x} + D e^{\kappa x}\).  
Region III (\(x>L\)): \(\psi_{III} = F e^{ikx}\).  
> [!WARNING]  
> Omitting the reflected wave \(B\) in Region I prevents satisfaction of boundary conditions at \(x=0\).

### Step 3 — Boundary matching at the two interfaces
Require \(\psi\) and \(\psi'\) continuous at \(x=0\) and at \(x=L\). This produces four linear equations for the five unknown amplitudes.  
Formal statement: the matching matrix at each interface is  
\[
\begin{pmatrix}
\psi \\
\psi'
\end{pmatrix}
\text{continuous}.
\]

### Step 4 — Definition of transmission coefficient
The transmission coefficient is the ratio of transmitted to incident probability current. Because the wave numbers are identical on both sides, \(T = |F/A|^2\).  
Formal statement:  
\[
T = \frac{|F|^2}{|A|^2}.
\]

### Step 5 — Exact algebraic solution for rectangular barrier
Solving the linear system yields the closed-form expression  
\[
T = \left[1 + \frac{V_0^2 \sinh^2(\kappa L)}{4E(V_0-E)}\right]^{-1}.
\]

### Step 6 — Thick-barrier approximation
When \(\kappa L \gg 1\), \(\sinh(\kappa L)\approx\frac12 e^{\kappa L}\), giving the textbook exponential result  
\[
T \approx 16 \frac{E}{V_0}\left(1-\frac{E}{V_0}\right) e^{-2\kappa L}.
\]
This is the result every subsequent calculation builds upon.

## 5. Worked examples — every step shown

**Example 1 — 5 eV electron, 10 eV rectangular barrier, \(L=0.1\) nm**  
*Given:* \(E=5\) eV, \(V_0=10\) eV, \(L=0.1\) nm, electron mass \(m\).  
*Find:* \(T\).  
Compute \(\kappa = \sqrt{2m(V_0-E)}/\hbar \approx 5.12\times10^9\) m\(^{-1}\).  
Then \(2\kappa L \approx 1.024\).  
Use exact formula: \(\sinh(1.024)\approx1.20\), so denominator \(=1+ (25)(1.44)/(4\cdot5\cdot5)=1+1.8=2.8\).  
Thus \(T\approx0.36\).  
**Final answer:** \(T \approx 0.36\)  
*Reflection:* The modest value of \(\kappa L\) shows that the exponential suppression is not yet dominant; the prefactor must be retained.

**Example 2 — Same barrier but \(L=1\) nm**  
\(2\kappa L \approx 10.24\).  
\(\sinh(10.24)\approx1.4\times10^4\).  
Denominator \(\approx 1 + 1.26\times10^5\), so \(T\approx 8\times10^{-6}\).  
**Final answer:** \(T \approx 8\times10^{-6}\)  
*Reflection:* Increasing width by a factor of ten drops \(T\) by five orders of magnitude—direct illustration of exponential sensitivity.

**Example 3 — Alpha particle, Coulomb barrier approximated as rectangular**  
*Given:* \(E=4.2\) MeV, effective \(V_0=20\) MeV, \(L=30\) fm.  
\(\kappa \approx 4.3\) fm\(^{-1}\), \(2\kappa L \approx 260\).  
\(T \approx 16\times(4.2/20)(1-4.2/20) e^{-260} \approx 10^{-110}\).  
**Final answer:** \(T \approx 10^{-110}\)  
*Reflection:* The astronomically small number is rescued by the enormous number of collision attempts per second inside the nucleus.

**Example 4 — Derive the prefactor 16 from matching conditions**  
At both interfaces the four continuity equations are written in matrix form. In the limit \(\kappa\gg k\) the determinant evaluation produces exactly the factor \(16E(V_0-E)/V_0^2\).  
**Final answer:** prefactor \(=16E(V_0-E)/V_0^2\)  
*Reflection:* The algebraic origin of the prefactor is the impedance mismatch between oscillatory and exponential regions.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Setting \(T=0\) for any \(E<V_0\) | Classical intuition overrides wave-function continuity | Always solve the Schrödinger equation before declaring a probability zero. |
| Forgetting the reflected wave in Region I | Symmetry arguments misapplied to asymmetric barriers | Retain both \(A\) and \(B\) until boundary conditions are applied. |
| Using \(T=|F/A|^2\) when \(k\) differs on two sides | Probability current contains velocity factor | Insert the correct prefactor \(k_\text{trans}/k_\text{inc}\) when wave numbers differ. |
| Approximating \(\sinh(\kappa L)\approx e^{\kappa L}/2\) for \(\kappa L<3\) | Over-eager use of asymptotic formula | Check numerical value of \(\kappa L\) before dropping the second exponential term. |
| Confusing \(\kappa\) with \(k\) | Notation collision between oscillatory and decay constants | Adopt distinct symbols and verify dimensions at each step. |
| Ignoring evanescent growth term \(D e^{\kappa x}\) | Belief that “it blows up” | Keep \(D\) until matching at the right interface forces its magnitude. |
| Treating \(T\) as energy-independent transmission probability | Misreading the definition of scattering cross-section | Remember \(T(E)\) is a function; plot or tabulate it. |

## 7. The textbook-precise statement
For a particle of mass \(m\) incident from the left on the rectangular potential  
\[
V(x)=\begin{cases}
0 & x<0,\\
V_0 & 0\le x\le L,\\
0 & x>L,
\end{cases}
\]  
with \(E<V_0\), the transmission coefficient is exactly  
\[
T=\left[1+\frac{V_0^2\sinh^2(\kappa L)}{4E(V_0-E)}\right]^{-1},\qquad\kappa=\frac{\sqrt{2m(V_0-E)}}{\hbar}.
\]  
(Griffiths, *Introduction to Quantum Mechanics*, 2nd ed., §2.5, Eq. 2.109.)

## 8. Visual — diagram or schematic
```text
V(x)
 ^
V0 |       +-------------------+
   |       |                   |
   |       |   Region II       |
E  |-------|                   |------->
   |  Region I                 Region III
   |   (oscillatory)   (evanescent)   (oscillatory)
   +-------+-------------------+------->
        0                   L       x
\psi ~  A e^{ikx} + B e^{-ikx}   C e^{-\kappa x} + D e^{\kappa x}   F e^{ikx}
```
The diagram shows the three spatial regions, the abrupt potential steps, the oscillatory incident-plus-reflected wave on the left, the exponentially decaying (and growing) solution inside, and the transmitted traveling wave on the right.

## 9. The memory technique
1. **The hook** — picture a marble rolling toward a wall; the marble’s “ghost” leaks through the bricks and re-forms on the far side, its intensity fading as \(e^{-2\kappa L}\).
2. **What to overlearn** — \(\kappa=\sqrt{2m(V_0-E)}/\hbar\), the exact rectangular-barrier formula, and the thick-barrier limit \(T\propto e^{-2\kappa L}\).
3. **Spaced-repetition schedule** — review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — re-derive by writing the three wave-function pieces, imposing four continuity conditions, and extracting \(|F/A|^2\).

## 10. What this unlocks
Mastery of the rectangular-barrier transmission coefficient supplies the calculational template for arbitrary barriers via the WKB approximation, for resonant tunneling in double-barrier structures, and for the theory of field emission and scanning tunneling microscopy.  

- Next: WKB tunneling integral  
- Next: resonant tunneling diodes  
- Next: alpha-decay lifetime formula  
- Next: Josephson junction current–phase relation  

## 11. Self-check — five questions, no answers
1. For fixed \(V_0\) and \(L\), how does \(T\) scale with particle mass \(m\) in the thick-barrier limit?  
2. A barrier is made twice as high and half as wide while keeping \(\kappa L\) constant. Does \(T\) remain the same?  
3. Identify the step in the derivation where the assumption \(E<V_0\) is first used.  
4. An experimentalist measures \(T=10^{-6}\) for 5 eV electrons through a 1 nm barrier. Infer the barrier height within 10 %.  
5. Why does the exact expression for \(T\) never exceed unity, and where would a calculation that produced \(T>1\) have gone wrong?