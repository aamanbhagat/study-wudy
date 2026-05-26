## 1. The one-sentence answer
**The particle in a box is the exactly solvable model in which a particle of mass \(m\) is confined by infinite walls to a one-dimensional interval of length \(L\), yielding quantized energies \(E_n = n^2 \pi^2 \hbar^2 / (2 m L^2)\) and standing-wave eigenfunctions that vanish at the boundaries.**

Inside the box the potential is zero, so the time-independent Schrödinger equation reduces to the free-particle Helmholtz equation whose general solution is a linear combination of sines and cosines. The requirement that the wave function be continuous and zero at both walls forces the wave number to take only discrete values \(k_n = n \pi / L\), which immediately discretizes the allowed energies. Outside the box the wave function is identically zero because an infinite potential cannot be overcome by any finite kinetic energy.

The resulting spectrum is the simplest demonstration that energy quantization is a direct geometric consequence of boundary conditions rather than an extra postulate. The wave functions are standing waves whose nodes increase with quantum number \(n\), exactly as the harmonics of a vibrating string.

> [!NOTE]
> The quantization is not imposed by hand; it is the only way a smooth function can satisfy \(\psi(0)=\psi(L)=0\) while obeying the second-order differential equation inside the interval.

## 2. Why this matters — concrete and current
Quantum-well infrared photodetectors used in missile-warning satellites (Northrop Grumman’s AN/AAR-54) rely on intersubband transitions whose energies are set by the same particle-in-a-box formula with finite but high barriers; designers tune well width to place the first excited state at the desired infrared wavelength.

In quantum-dot light-emitting diodes now entering commercial micro-displays (Samsung’s QD-OLED panels), the emission wavelength is shifted by changing the physical diameter of the dots; the shift follows the \(1/L^2\) dependence derived for the infinite well, allowing pixel-level color control without chemical changes to the semiconductor.

Trapped-ion quantum processors (IonQ and Honeywell) use the ground-state wave function of a harmonic trap approximated locally as a box to calculate motional sideband couplings; the overlap integrals that determine gate fidelity are evaluated with the same sinusoidal basis obtained from the particle-in-a-box solution.

Scanning-tunneling-microscopy images of electrons confined to artificial “quantum corrals” on Cu(111) surfaces (IBM Almaden experiments) are fitted directly to particle-in-a-box wave functions, confirming that the measured standing-wave patterns match the nodal structure predicted by the model.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Time-independent Schrödinger equation | Supplies the differential equation whose solutions are the stationary states inside the box. |
| Boundary conditions for wave functions | Forces \(\psi=0\) at the walls, converting a continuous spectrum into discrete eigenvalues. |
| Second-order linear ODEs with constant coefficients | The free-particle TISE is solved by guessing exponential or trigonometric trial solutions. |
| Normalization of wave functions | Ensures \(\int|\psi|^2 dx=1\) so probabilities are well-defined. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Define the infinite square well
The potential is zero between \(x=0\) and \(x=L\) and infinite elsewhere. Any particle with finite energy is therefore strictly confined; the wave function must vanish identically outside \([0,L]\).

A concrete example is an electron trapped between two atomically sharp potential barriers 1 nm apart. Formally,
$$V(x)=\begin{cases}0 & 0<x<L\\\infty & \text{otherwise.}\end{cases}$$

> [!WARNING]
> If the walls are placed at \(-L/2\) and \(+L/2\) instead, the wave functions change from sines to cosines or vice versa; the energies remain identical but the functional form must be re-derived.

### Step 2 — Write the TISE inside the box
Inside the well \(V=0\), so the TISE collapses to
$$-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2}=E\psi.$$
This is an eigenvalue problem for the second-derivative operator.

### Step 3 — Solve the differential equation
Rearrange to
$$\frac{d^2\psi}{dx^2}=-k^2\psi,\qquad k^2=\frac{2mE}{\hbar^2}.$$
The general solution is the linear combination
$$\psi(x)=A\sin(kx)+B\cos(kx).$$

### Step 4 — Apply boundary conditions
Continuity and the infinite walls require \(\psi(0)=\psi(L)=0\). The condition at \(x=0\) forces \(B=0\). The condition at \(x=L\) forces \(\sin(kL)=0\), hence
$$k_n=\frac{n\pi}{L},\qquad n=1,2,3,\dots$$

### Step 5 — Obtain the energy eigenvalues
Substitute the allowed \(k_n\) back into the definition of \(k\):
$$E_n=\frac{n^2\pi^2\hbar^2}{2mL^2}.$$
Energy is therefore quantized; only discrete values are permitted.

### Step 6 — Normalize the wave functions
Impose \(\int_0^L|\psi_n|^2 dx=1\) to find
$$A=\sqrt{\frac{2}{L}},$$
yielding the normalized eigenfunctions
$$\psi_n(x)=\sqrt{\frac{2}{L}}\sin\left(\frac{n\pi x}{L}\right).$$

### Step 7 — Verify orthogonality and completeness
The set \(\{\psi_n\}\) is orthonormal on \([0,L]\) and forms a complete basis for any function that vanishes at the endpoints, allowing expansion of arbitrary initial wave packets.

## 5. Worked examples — every step shown

**Example 1 — Ground-state energy for an electron**
*Given:* \(L=1\) nm, \(m=m_e=9.109\times10^{-31}\) kg.  
*Find:* \(E_1\).

Convert \(L=10^{-9}\) m.  
$$k_1=\frac{\pi}{10^{-9}}=3.1416\times10^9\,\text{m}^{-1}.$$  
*Why:* Direct substitution of \(n=1\) into the allowed wave numbers.  
$$E_1=\frac{\hbar^2 k_1^2}{2m}.$$  
*Why:* Definition of \(k^2=2mE/\hbar^2\) solved for \(E\).  
Numerically, \(E_1=0.376\) eV.  
**\(E_1=0.376\) eV**

*Reflection:* The calculation shows how even a 1 nm box already produces electron-volt energies, the scale of atomic physics.

**Example 2 — First two wave functions**
*Given:* \(L=2a_0\).  
*Find:* \(\psi_1(x)\) and \(\psi_2(x)\).

Normalization prefactor \(\sqrt{2/L}=\sqrt{1/a_0}\).  
\(\psi_1(x)=\sqrt{1/a_0}\sin(\pi x/(2a_0))\).  
*Why:* \(n=1\) in the general formula.  
\(\psi_2(x)=\sqrt{1/a_0}\sin(\pi x/a_0)\).  
*Why:* \(n=2\) inserts an extra node at \(x=a_0\).  
**\(\psi_1=\sqrt{1/a_0}\sin(\pi x/2a_0)\), \(\psi_2=\sqrt{1/a_0}\sin(\pi x/a_0)\)**

*Reflection:* The node count equals \(n-1\), a pattern that generalizes to all higher states.

**Example 3 — Expectation value of energy**
*Given:* \(\psi(x,0)=\sqrt{2/L}\sin(\pi x/L)\).  
*Find:* \(\langle E\rangle\).

The initial state is exactly \(\psi_1\), an energy eigenstate.  
Therefore \(\langle E\rangle=E_1\).  
*Why:* Eigenstates satisfy \(\hat{H}\psi=E\psi\), so the expectation value collapses to the eigenvalue.  
**\(\langle E\rangle=E_1\)**

*Reflection:* When the wave function is already an eigenfunction, no integral is required.

**Example 4 — Superposition and time evolution**
*Given:* \(\psi(x,0)=\frac{1}{\sqrt{2}}(\psi_1+\psi_2)\).  
*Find:* \(\psi(x,t)\).

Each component acquires its own phase factor:  
$$\psi(x,t)=\frac{1}{\sqrt{2}}\Bigl(\psi_1 e^{-iE_1 t/\hbar}+\psi_2 e^{-iE_2 t/\hbar}\Bigr).$$  
*Why:* Time-dependent Schrödinger equation multiplies each energy eigenfunction by \(e^{-iEt/\hbar}\).  
Probability density oscillates at frequency \((E_2-E_1)/h\).  
**\(\psi(x,t)\) as written above**

*Reflection:* Superpositions produce measurable time-dependent interference even though each stationary state is static.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Placing walls at \(-L/2\) and \(+L/2\) without shifting the sine argument | Students copy the \(0\) to \(L\) formulas verbatim | Rederive boundary conditions for the new interval each time. |
| Forgetting that \(n=0\) is not allowed | \(\sin(0\cdot x)=0\) satisfies the equation but is the trivial null function | Check normalization; \(n=0\) yields zero probability everywhere. |
| Using \(\cos(kx)\) for the \(0\)–\(L\) well | The cosine satisfies \(\psi(0)\neq0\) | Enforce \(\psi(0)=0\) first; the cosine coefficient must vanish. |
| Confusing \(E_n\) with classical kinetic energy \(p^2/2m\) for continuous \(p\) | Classical thinking allows any momentum | Emphasize that boundary conditions quantize \(k\) before energy is computed. |
| Omitting normalization when computing probabilities | Normalization constant cancels in ratios but not in absolute probabilities | Always normalize before calculating expectation values or probabilities. |
| Assuming the wave function penetrates infinite walls | Misremembering finite-well behavior | Infinite \(V\) forces \(\psi=0\) identically outside; no exponential tail exists. |
| Using \(n\) starting at zero in the energy formula | Algebraic slip when counting nodes | Verify that \(n=1\) produces the lowest non-zero energy. |

## 7. The textbook-precise statement
For the infinite square well \(V(x)=0\) for \(0<x<L\) and \(V=\infty\) elsewhere, the stationary states of the time-independent Schrödinger equation are
$$\psi_n(x)=\sqrt{\frac{2}{L}}\sin\left(\frac{n\pi x}{L}\right),\qquad E_n=\frac{n^2\pi^2\hbar^2}{2mL^2},\quad n=1,2,3,\dots$$
with \(\psi_n=0\) outside \([0,L]\). The set \(\{\psi_n\}\) is orthonormal and complete on \([0,L]\). (Griffiths, *Introduction to Quantum Mechanics*, 2nd ed., §2.2.)

## 8. Visual — diagram or schematic
```text
V(x)
  ∞ |                 | ∞
    |                 |
    |  ψ₃ ~ sin(3πx/L) |  node-node-node
    |   /\/\  /\  /\   |
    |  /    \/  \/  \  |
    | ψ₂ ~ sin(2πx/L)  |  node-node
    |   /\    /\       |
    |  /  \  /  \      |
    | ψ₁ ~ sin(πx/L)   |  node
    | /    \/    \     |
────┴──────────────────┴──── x
    0                  L
```
The diagram shows the infinite walls, the first three eigenfunctions, and the increasing number of nodes.

## 9. The memory technique
**The hook** — Picture a guitar string clamped at both ends; only certain wavelengths fit exactly, producing the musical harmonics. The particle-in-a-box wave functions are the quantum version of those standing waves.

**What to overlearn** — \(E_n \propto n^2/L^2\), the functional form \(\sqrt{2/L}\sin(n\pi x/L)\), and the fact that \(n\) begins at 1.

**Spaced-repetition schedule** — Review the energy formula after 1 day, redraw the first three wave functions after 3 days, solve a new boundary-value problem after 7 days, derive the normalization after 16 days, and reconstruct the entire solution from the TISE after 35 days.

**First-principles fallback** — Start from the TISE with \(V=0\), guess \(\sin(kx)\) and \(\cos(kx)\), apply \(\psi(0)=\psi(L)=0\), extract \(k_n\), then \(E_n\).

## 10. What this unlocks
This model supplies the orthonormal basis used for perturbation theory, the finite square well, and the Kronig–Penney model of solid-state band structure. It also introduces the concept of zero-point energy that appears in quantum harmonic oscillators and in the Lamb shift.

- Finite square well and tunneling
- Delta-function potential scattering
- Quantum harmonic oscillator via ladder operators
- Angular momentum and the hydrogen atom radial equation
- Time-dependent perturbation theory for absorption

## 11. Self-check — five questions, no answers
1. An electron is confined to a 0.5 nm box. Compute the energy difference between the \(n=2\) and \(n=1\) states in eV.

2. Show that the expectation value \(\langle x\rangle\) vanishes for every stationary state \(\psi_n\) of the infinite well.

3. A particle starts in the superposition \(\frac{1}{\sqrt{2}}(\psi_1+\psi_3)\). At what time is the probability density again identical to its initial form?

4. If the right wall is suddenly moved to \(2L\), which original eigenstate has the largest overlap with the new ground state?

5. Identify the error: a student claims that \(\psi(x)=x(L-x)\) satisfies the boundary conditions and must therefore be an eigenfunction.