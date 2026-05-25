## What it is
Solving for the hydrogen atom means finding the allowed energy levels (eigenvalues) and corresponding wavefunctions (eigenfunctions) of its single electron by solving the time-independent Schrödinger equation. We use spherical coordinates $(r, \theta, \phi)$ because the Coulomb potential binding the electron to the proton depends only on the radial distance $r$, making the problem's symmetry spherical. This simplifies the mathematics immensely compared to a Cartesian $(x,y,z)$ approach.

## Why it matters
This solution is the foundation of atomic physics and quantum chemistry, explaining the structure of the periodic table through the quantum numbers $n, l, m_l$ that emerge from the solution. For aerospace, understanding these quantized energy levels is crucial for spectroscopy—analyzing the light from stars and planetary atmospheres to determine their chemical composition and physical state. The principles of separation of variables in a spherically symmetric potential are also fundamental to solving problems in gravitation and electromagnetism.

## When to study it
Before tackling this, you must have a firm grasp of the following. If not, master them first.
1.  **The Time-Independent Schrödinger Equation (TISE):** $H\psi = E\psi$, where $H$ is the Hamiltonian operator.
2.  **Partial Differential Equations:** Specifically, the method of separation of variables.
3.  **Spherical Coordinate System:** You must be fluent in the coordinates $(r, \theta, \phi)$ and the form of the Laplacian operator, $\nabla^2$, in these coordinates.
4.  **Quantum Operators and Eigenvalues:** The concept that physical observables are represented by operators, and their measured values are the eigenvalues of those operators.

## How to study it (step by step)
1.  **Set up the Equation:** Write the full TISE for the hydrogen atom. The potential is the Coulomb potential, $V(r) = -\frac{e^2}{4\pi\epsilon_0 r}$. The Hamiltonian is $H = -\frac{\hbar^2}{2\mu}\nabla^2 + V(r)$, where $\mu$ is the reduced mass of the electron-proton system.
2.  **Separate Variables:** Assume the wavefunction can be written as a product of three functions, each of a single variable: $\Psi(r, \theta, \phi) = R(r)\Theta(\theta)\Phi(\phi)$. Substitute this into the TISE and divide by $\Psi$.
3.  **Solve the Azimuthal ($\phi$) Equation:** Isolate the terms depending only on $\phi$. This yields a simple ODE: $\frac{d^2\Phi}{d\phi^2} = -m_l^2 \Phi$. The solution is $\Phi(\phi) = e^{im_l\phi}$, where the boundary condition $\Phi(\phi+2\pi) = \Phi(\phi)$ quantizes $m_l$ to be an integer. This is the **magnetic quantum number**.
4.  **Solve the Polar ($\theta$) Equation:** Isolate the terms depending on $\theta$. This gives the associated Legendre equation. Its solutions are the associated Legendre polynomials, $P_l^{|m_l|}(\cos\theta)$, which are only well-behaved (non-infinite) if $l$ is an integer and $|m_l| \le l$. This introduces the **orbital angular momentum quantum number**, $l$. The combined angular solutions $\Theta(\theta)\Phi(\phi)$ are called the spherical harmonics, $Y_{lm_l}(\theta, \phi)$.
5.  **Solve the Radial ($r$) Equation:** The remaining terms give the radial equation for $R(r)$. This is the most complex step. The solution involves the associated Laguerre polynomials, and the requirement that $R(r)$ be normalizable (i.e., vanish as $r \to \infty$) quantizes the energy $E$ and introduces the **principal quantum number**, $n$, where $n$ must be an integer and $n > l$.
6.  **Assemble the Full Solution:** Combine the radial and angular solutions to get the full wavefunction $\Psi_{n,l,m_l}(r, \theta, \phi) = R_{nl}(r)Y_{lm_l}(\theta, \phi)$. The energy eigenvalues depend only on $n$: $E_n = -\frac{\mu e^4}{2(4\pi\epsilon_0)^2\hbar^2 n^2}$.

## Key ideas, with intuition
1.  **Symmetry Dictates Coordinates:** The Coulomb potential $V(r)$ is the same in all directions; it only cares about distance. Trying to describe this sphere of potential with flat Cartesian planes is clumsy. Spherical coordinates align perfectly with the problem's nature, turning a complex 3D PDE into three manageable 1D ODEs.
2.  **Separation of Variables as "Passing the Buck":** Imagine the full Schrödinger equation as a complex responsibility. We split it by assuming $\Psi = R\Theta\Phi$. The equation is rearranged so that one side depends only on $\phi$ and the other on $r$ and $\theta$. Since they must be equal for *all* values of the variables, they must both equal a constant. We've "passed the buck" of complexity into a constant, $m_l^2$, and created a simpler equation for $\Phi$. This process is repeated to separate $\theta$ from $r$.
    $$ \underbrace{f(r, \theta)}_{\text{depends on r, }\theta} = \underbrace{g(\phi)}_{\text{depends on }\phi} \implies f(r, \theta) = g(\phi) = \text{Constant} $$
3.  **Quantization from Boundary Conditions:** Nature requires wavefunctions to be physically sensible. They can't be infinite, and they must be single-valued (a particle can't have two probabilities of being at the same point). These physical constraints—the boundary conditions—act as filters. For the $\phi$ equation, $\Phi(\phi) = \Phi(\phi+2\pi)$ forces $m_l$ to be an integer. For the $\theta$ and $r$ equations, requiring the solutions to not blow up at $\theta=\pi$ or $r=\infty$ forces $l$ and $n$ to be integers with specific relationships ($n > l \ge |m_l|$). Quantization is not an assumption; it is a direct consequence of the wave nature of matter in a bound system.

## Worked example
Let's find the ground state wavefunction of the hydrogen atom, which corresponds to $n=1, l=0, m_l=0$. We denote this state as $\Psi_{100}$.

1.  **Start with the general solution form:** $\Psi_{n,l,m_l}(r, \theta, \phi) = R_{nl}(r)Y_{lm_l}(\theta, \phi)$.

2.  **Find the angular part, $Y_{00}(\theta, \phi)$:**
    The spherical harmonics $Y_{lm_l}$ are tabulated functions. For $l=0, m_l=0$, the function is a constant, chosen for normalization.
    $$ Y_{00}(\theta, \phi) = \frac{1}{\sqrt{4\pi}} $$
    *Intuition:* $l=0$ means zero angular momentum. The probability distribution should be spherically symmetric, with no dependence on $\theta$ or $\phi$, which this constant value provides.

3.  **Find the radial part, $R_{10}(r)$:**
    The radial equation for $n=1, l=0$ is a specific ODE whose solution is known. The normalized solution is:
    $$ R_{10}(r) = 2 \left(\frac{1}{a_0}\right)^{3/2} e^{-r/a_0} $$
    where $a_0 = \frac{4\pi\epsilon_0\hbar^2}{\mu e^2}$ is the Bohr radius, approximately $0.529$ Å.

4.  **Combine them to get the full wavefunction:**
    $$ \Psi_{100}(r, \theta, \phi) = R_{10}(r) Y_{00}(\theta, \phi) = \left( 2 \left(\frac{1}{a_0}\right)^{3/2} e^{-r/a_0} \right) \left( \frac{1}{\sqrt{4\pi}} \right) $$
    $$ \Psi_{100}(r, \theta, \phi) = \frac{1}{\sqrt{\pi a_0^3}} e^{-r/a_0} $$

*Reflection:* Each step involved looking up or solving for a piece of the separated solution ($R$ and $Y$) corresponding to the specific quantum numbers ($n=1, l=0, m_l=0$). The angular part was trivial because $l=0$ implies perfect spherical symmetry. The radial part is a decaying exponential, showing the electron is most likely to be found near the nucleus. The final step is simple multiplication.

## Diagrams
```text
      z
      |
      |   /
      |  /
      | /
      |/  P(r, θ, φ)
      *---------
     /|\      /
    / | \    /
   /  |  \  /
  /  r|   \/
 /    |   /
*-----|--/------> y
 \    | /
  \   |/ φ
   \  *
    \ |/
     x
```
This diagram shows the spherical coordinate system.
-   $r$: The radial distance from the origin to point P.
-   $\theta$ (theta): The polar angle, measured down from the positive z-axis. $0 \le \theta \le \pi$.
-   $\phi$ (phi): The azimuthal angle, measured from the positive x-axis in the xy-plane. $0 \le \phi < 2\pi$.

## Memory technique — remember this forever
1.  **The Story:** Imagine you're solving a 3D puzzle of an atom. You solve it from the outside in. First, you walk around the equator (the $\phi$ dimension), then you walk from pole to pole (the $\theta$ dimension), and finally, you dig from the center outwards (the $r$ dimension). The solution order of the equations is the reverse of alphabetical order: $\Phi(\phi)$, then $\Theta(\theta)$, then $R(r)$. Each step introduces a new quantum number constraint: $m_l$, then $l$, then $n$.

2.  **Must Overlearn Formulas:**
    *   **Energy Levels:** The energy only depends on $n$.
        $$ E_n = -\frac{E_R}{n^2}, \quad \text{where } E_R \approx 13.6 \text{ eV is the Rydberg energy.} $$
    *   **Quantum Number Rules:**
        $$ n = 1, 2, 3, ... $$
        $$ l = 0, 1, 2, ..., (n-1) $$
        $$ m_l = -l, -l+1, ..., 0, ..., l-1, l $$

3.  **Spaced Repetition Schedule:** Review this material and re-derive the main results at: 1 day, 3 days, 7 days, 16 days, 35 days.

4.  **First Principles Pathway:** If you forget everything, rebuild it from the TISE.
    $H\Psi = E\Psi \implies \left(-\frac{\hbar^2}{2\mu}\nabla^2 - \frac{e^2}{4\pi\epsilon_0 r}\right)\Psi = E\Psi$.
    Write $\nabla^2$ in spherical coordinates. Assume $\Psi(r, \theta, \phi) = R(r)\Theta(\theta)\Phi(\phi)$. Substitute and divide by $\Psi$. The variables will separate, giving you three ODEs. The boundary conditions on the solutions to these ODEs will force the quantum numbers to appear.

## Common mistakes
1.  **Forgetting the Jacobian ($r^2 \sin\theta$):** When normalizing the wavefunction, the volume element is $d\tau = r^2 \sin\theta \, dr \, d\theta \, d\phi$, not just $dr \, d\theta \, d\phi$. Forgetting the $r^2$ term is a very common error in calculating expectation values for the radius.
2.  **Incorrect Quantum Number Ranges:** A frequent mistake is to allow $l=n$ or $|m_l| > l$. The rule is strict: $n$ is a ceiling for $l+1$, and $l$ is a ceiling for $|m_l|$. For $n=2$, $l$ can only be 0 or 1. If $l=1$, $m_l$ can only be -1, 0, or 1.
3.  **Confusing Reduced Mass ($\mu$) with Electron Mass ($m_e$):** For hydrogen, $\mu = \frac{m_e m_p}{m_e + m_p} \approx 0.9995 m_e$. Using $m_e$ is a good approximation, but for high-precision work or for other systems like positronium (an electron-positron bound state), using the reduced mass is essential.

## Self-check
1.  An electron in a hydrogen atom is in the $n=4$ state. What are all the possible values for its orbital ($l$) and magnetic ($m_l$) quantum numbers?
2.  The probability of finding the electron is proportional to $|\Psi|^2$. For the ground state $\Psi_{100}$, on which of the coordinates $(r, \theta, \phi)$ does this probability density actually depend? What does this imply about the shape of the ground state orbital?
3.  The radial part of the Schrödinger equation can be written to include an "effective potential," $V_{\text{eff}}(r) = V(r) + \frac{\hbar^2 l(l+1)}{2\mu r^2}$. What is the physical origin of the second term, known as the "centrifugal barrier"? Why is it zero for $l=0$ states?