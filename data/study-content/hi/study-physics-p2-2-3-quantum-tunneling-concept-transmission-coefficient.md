## 1. The one-sentence answer
**Quantum tunneling** is the phenomenon in which a particle has a non-zero probability of crossing a potential barrier even when its total energy lies below the barrier height.

Aap sochiye ek classical particle ko ek wall ke saamne, jiski kinetic energy wall ki height se kam hai — woh wall ko kabhi nahi cross karega. Quantum mechanics mein wave function exponentially decay karti hai barrier ke andar lekin zero nahi hoti, isliye barrier ke doosri taraf finite probability milti hai. Yeh probability transmission coefficient \(T\) ke through quantify hoti hai.

Iska matlab yeh hai ki subatomic particles (electrons, protons, alpha particles) classically forbidden regions mein penetrate kar sakte hain. Barrier ki width aur height jitni kam hogi, utni zyada tunneling probability badhegi.

> [!NOTE]
> The single most important “aha” is that the wave function does not abruptly become zero at a classical turning point; it decays smoothly, leaving a tail on the far side that carries probability current.

## 2. Why this matters — concrete and current
Scanning tunneling microscopes (STM) at companies like IBM and Oxford Instruments rely on electron tunneling current between a sharp tip and a surface; the exponential dependence of \(T\) on tip-sample distance gives atomic resolution.

In aerospace, alpha decay of radioisotopes inside plutonium-238 RTGs (used on Voyager, Curiosity, and Perseverance rovers) occurs solely via tunneling; without it the power source would be impossible.

Flash-memory cells in Samsung and TSMC 3D-NAND chips use Fowler-Nordheim tunneling to move electrons through thin oxide barriers; the transmission coefficient directly sets program/erase speed and retention time.

Nuclear fusion in the Sun’s core proceeds at temperatures where protons classically lack energy to overcome Coulomb repulsion; tunneling raises the fusion rate by many orders of magnitude, enabling stellar nucleosynthesis models used by NASA’s heliophysics missions.

Quantum-dot tunnel diodes developed by Raytheon and MIT Lincoln Lab exploit negative differential resistance arising from resonant tunneling; these devices appear in high-frequency oscillators for 6G and radar systems.

## 3. Mental prerequisites

| Concept              | Why you need it here                                                                 |
|----------------------|--------------------------------------------------------------------------------------|
| Time-independent Schrödinger equation | Supplies the differential equation whose solutions inside and outside the barrier must be matched. |
| Wave function continuity and differentiability | Boundary conditions that determine the coefficients of incident, reflected, and transmitted waves. |
| Probability current density | Defines transmission coefficient \(T\) as the ratio of transmitted to incident probability current. |
| Exponential decay of evanescent waves | Gives the functional form of the wave function inside a classically forbidden region. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Classical prohibition versus quantum allowance
Classically, total energy \(E < V_0\) means kinetic energy would be negative inside the barrier, which is impossible. Quantum mechanically the wave function is allowed to be non-zero wherever the potential is finite.

Consider a rectangular barrier of height \(V_0\) and width \(L\). An electron with \(E < V_0\) incident from the left still has a wave function that penetrates the barrier region.

Formally, inside the barrier the Schrödinger equation yields
\[
\frac{d^2\psi}{dx^2} = \kappa^2\psi, \quad \kappa = \sqrt{2m(V_0-E)}/\hbar.
\]
The general solution is \(\psi(x) = Ae^{\kappa x} + Be^{-\kappa x}\).

> [!WARNING]
> If you set \(\psi = 0\) inside the barrier by hand, the transmission coefficient collapses to zero and all subsequent matching conditions become meaningless.

### Step 2 — Matching wave function and derivative at boundaries
Continuity of \(\psi\) and \(\psi'\) at \(x=0\) and \(x=L\) produces four linear equations relating the five amplitudes (incident, reflected, inside barrier coefficients, transmitted).

After algebra the transmitted amplitude \(F\) satisfies
\[
\frac{F}{A} = \left[ \cosh(\kappa L) + \frac{i}{2}\left(\frac{\kappa}{k}-\frac{k}{\kappa}\right)\sinh(\kappa L) \right]^{-1},
\]
where \(k = \sqrt{2mE}/\hbar\).

### Step 3 — Definition of transmission coefficient
Transmission coefficient \(T\) is the ratio of transmitted to incident probability current:
\[
T = \frac{|F|^2}{|A|^2}.
\]
For a thick barrier (\(\kappa L \gg 1\)) this simplifies to the familiar exponential
\[
T \approx 16\frac{E}{V_0}\left(1-\frac{E}{V_0}\right)e^{-2\kappa L}.
\]

### Step 4 — WKB generalization for arbitrary barriers
For a smoothly varying potential the same exponential dependence appears in the WKB approximation:
\[
T \approx \exp\left(-2\int_{x_1}^{x_2}\sqrt{2m(V(x)-E)}\,dx/\hbar\right),
\]
where \(x_1,x_2\) are classical turning points.

### Step 5 — Rectangular barrier exact result
The exact expression (valid for all \(\kappa L\)) is
\[
T = \left[1 + \frac{V_0^2}{4E(V_0-E)}\sinh^2(\kappa L)\right]^{-1}.
\]
In the thick-barrier limit it recovers the WKB form, confirming consistency.

## 5. Worked examples — har step show karo

**Example 1 — Rectangular barrier, thick limit**  
*Given:* Electron, \(E=2\) eV, \(V_0=4\) eV, \(L=0.5\) nm.  
*Find:* Approximate \(T\).  
Step 1: \(\kappa = \sqrt{2m(V_0-E)}/\hbar \approx 5.12\times10^9\) m\(^{-1}\).  
Step 2: \(2\kappa L \approx 5.12\).  
Step 3: Prefactor \(\approx 1\), hence \(T\approx e^{-5.12}\).  
**Final answer** \(\boldsymbol{T \approx 5.9\times10^{-3}}\).  
*Reflection:* The example isolates the exponential factor; any error in \(\kappa\) calculation immediately ruins the order of magnitude.

**Example 2 — Same barrier, exact formula**  
*Given:* Same numbers.  
*Find:* Exact \(T\).  
Step 1: Compute \(\sinh(\kappa L)\approx 82.4\).  
Step 2: Insert into exact formula: denominator \(\approx 1 + (4)\times(82.4)^2 \approx 2.7\times10^4\).  
**Final answer** \(\boldsymbol{T \approx 3.7\times10^{-5}}\).  
*Reflection:* Exact result is two orders smaller than the simple exponential because the prefactor was ignored.

**Example 3 — Alpha decay estimate**  
*Given:* \(^{238}\)U, \(E=4.2\) MeV, barrier height 30 MeV, width 30 fm.  
*Find:* Order-of-magnitude \(T\).  
\(\kappa\approx 4.3\) fm\(^{-1}\), \(2\kappa L\approx 260\), \(T\sim e^{-260}\).  
**Final answer** \(\boldsymbol{T \sim 10^{-113}}\).  
*Reflection:* Shows why half-lives span geological timescales.

**Example 4 — STM tip displacement**  
*Given:* Work function 4 eV, tip moves 0.1 nm farther.  
*Find:* Change in \(T\).  
\(\Delta(2\kappa L)\approx 2\times\sqrt{2m\phi}/\hbar\times0.1\) nm \(\approx 2.0\).  
\(T\) drops by factor \(e^{-2}\approx0.135\).  
**Final answer** \(\boldsymbol{T_\text{new}=0.135\,T_\text{old}}\).  
*Reflection:* Exponential sensitivity explains atomic-scale vertical resolution.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Setting \(\psi=0\) inside barrier | Classical intuition overrides wave equation | Always solve Schrödinger equation in every region where \(V\) is finite |
| Forgetting prefactor \(16E(V_0-E)/V_0^2\) | Students remember only the exponential | Write the full approximate formula before taking limits |
| Using \(k\) instead of \(\kappa\) for decay | Notation confusion between oscillatory and evanescent regions | Explicitly label \(\kappa=\sqrt{2m(V-E)}/\hbar\) each time |
| Applying WKB when barrier is thin | WKB assumes slow variation and thick barrier | Check \(\kappa L\gg1\) before using exponential approximation |
| Ignoring units when computing \(\kappa\) | Mixing eV with joules or nm with m | Convert every energy and length to SI before evaluating square roots |
| Treating \(T\) as probability for a single particle | Probability current ratio is an ensemble concept | Remember \(T\) gives transmission probability per incident particle |

## 7. The textbook-precise statement
Griffiths, *Introduction to Quantum Mechanics*, 2e, §2.5 states: Consider a particle of mass \(m\) and energy \(E < V_0\) incident on a rectangular barrier \(V(x)=V_0\) for \(0<x<L\) and zero elsewhere. The transmission probability is exactly
\[
T=\left[1+\frac{V_0^2\sinh^2(\kappa L)}{4E(V_0-E)}\right]^{-1},\qquad\kappa=\frac{\sqrt{2m(V_0-E)}}{\hbar},
\]
provided the wave function satisfies continuity of \(\psi\) and \(\psi'\) at the boundaries and the probability current is evaluated in the asymptotic regions.

## 8. Visual — diagram or schematic
```
x = -∞          0               L             +∞
    |-------------|---------------|-------------|
    ψ = Ae^{ikx}  |  ψ = Ce^{κx}  |  ψ = Fe^{ikx}
       + Be^{-ikx}|     + De^{-κx}|   (transmitted)
    incident+refl |   evanescent  |   transmitted
    E < V0 inside barrier (height V0)
```

## 9. The memory technique
1. **The hook** — Picture a ghost walking through a wall; the wall is the barrier, the ghost’s faint outline on the other side is the exponentially small tail of the wave function.
2. **What to overlearn** — \(\kappa=\sqrt{2m(V-E)}/\hbar\) and the statement \(T\sim e^{-2\kappa L}\) for thick barriers.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days after first study.
4. **First-principles fallback** — Start from the time-independent Schrödinger equation, derive the sign of the second derivative inside the barrier, obtain the exponential solutions, then apply current-ratio definition of \(T\).

## 10. What this unlocks
Mastery of tunneling lets you proceed to alpha decay rates, field-emission theory, tunnel diodes, and scanning-probe techniques. It is also the gateway to more advanced methods such as instantons in quantum field theory and non-perturbative transport in mesoscopic physics.

- Resonant tunneling through double barriers
- WKB quantization for bound states in non-analytic potentials
- Landauer formalism for conductance in nanoscale devices
- Fusion cross-section calculations in stellar interiors

## 11. Self-check — five questions, no answers
1. For a fixed barrier height and width, how does \(T\) scale with particle mass?
2. Derive the condition under which the exact rectangular-barrier formula reduces to the simple exponential form.
3. An STM tip moves 0.05 nm closer; by what factor does the tunneling current increase (work function 4.5 eV)?
4. Identify the step in the derivation where probability current rather than \(|\psi|^2\) must be used and explain why.
5. A student obtains \(T>1\) for a thin barrier; which assumption in the calculation is violated?