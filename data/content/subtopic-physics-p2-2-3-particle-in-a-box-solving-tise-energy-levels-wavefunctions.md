## What it is
The "particle in a box," or infinite potential well, is the simplest non-trivial model in quantum mechanics. It describes a single particle confined to a one-dimensional region of space from which it cannot escape. Solving this model reveals that the particle's energy can only take on specific, discrete values—a phenomenon called quantization.

## Why it matters
This model is the "hello, world" of quantum mechanics, introducing the core concepts of quantized energy levels and wavefunctions. It serves as a first approximation for electrons confined in quantum dots (used in displays and solar cells), electrons in conjugated molecules, and even neutrons in a nucleus. Understanding it is fundamental to grasping more complex quantum systems like the hydrogen atom.

## When to study it
You must be comfortable with second-order ordinary differential equations (ODEs), particularly of the form $y'' + k^2y = 0$. You should also understand the basics of complex numbers, integration, and the physical meaning of potential energy $V(x)$. A conceptual understanding of the de Broglie hypothesis ($p = h/\lambda$) is helpful but not strictly required, as we will derive its consequences.

## How to study it (step by step)
1.  **Define the Potential:** Write down the mathematical form of the potential energy $V(x)$ for an infinite square well of length $L$. Draw it. Understand why $V(x) = \infty$ outside the box means the particle can never be found there.
2.  **Write the TISE:** Write the Time-Independent Schrödinger Equation (TISE) for the regions inside and outside the box. Realize that for the region outside the box, the only possible solution is $\psi(x) = 0$.
3.  **Solve the TISE Inside:** Inside the box, $V(x)=0$. Solve the resulting second-order ODE, $ -\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2} = E\psi(x) $. The general solution will involve sines and cosines.
4.  **Apply Boundary Conditions:** The wavefunction $\psi(x)$ must be continuous. Since $\psi(x)=0$ at the edges of the box ($x=0$ and $x=L$), apply these conditions ($\psi(0)=0$ and $\psi(L)=0$) to your general solution. This step is what forces the energy $E$ to be quantized.
5.  **Normalize the Wavefunction:** The total probability of finding the particle *somewhere* in the box must be 1. This means the integral of the probability density, $|\psi(x)|^2$, over the length of the box must equal 1. Use this condition, $\int_0^L |\psi(x)|^2 dx = 1$, to find the constant multiplier (the normalization constant) for your wavefunction.
6.  **Analyze the Results:** Examine the final expressions for the allowed energy levels $E_n$ and the wavefunctions $\psi_n(x)$. Plot the first three wavefunctions and their corresponding probability densities $|\psi_n(x)|^2$. Note the relationship between the energy, the quantum number $n$, and the number of nodes in the wavefunction.

## Key ideas, with intuition
1.  **Confinement leads to Quantization.** A free particle can have any energy. But by trapping it in a box, we impose strict boundary conditions: the wavefunction must go to zero at the walls. This is like pinning down a guitar string at both ends; only specific standing wave patterns (harmonics) are allowed. These allowed "modes" are the quantized energy states.

2.  **The Schrödinger Equation is an Eigenvalue Equation.** The TISE has the form $\hat{H}\psi = E\psi$. Here, $\hat{H}$ is the Hamiltonian operator (representing the total energy), $\psi$ is the wavefunction (the "eigenstate"), and $E$ is a number (the "eigenvalue," representing the energy value). For a given system, only certain states $\psi_n$ and corresponding energies $E_n$ will satisfy this equation.

3.  **Energy Levels Grow as $n^2$.** The allowed energies are not evenly spaced. They follow the pattern $E_n = n^2 E_1$, where $E_1$ is the lowest possible energy (the "ground state" energy). This quadratic spacing is a hallmark of the infinite square well.
    $$
    E_n = \frac{n^2 \pi^2 \hbar^2}{2mL^2} \quad \text{for } n = 1, 2, 3, ...
    $$
    Notice that $n$ cannot be zero, as that would imply $\psi(x)=0$ everywhere, meaning no particle exists. The lowest possible energy, $E_1$, is non-zero. This is the "zero-point energy," a direct consequence of the Heisenberg Uncertainty Principle.

4.  **The Wavefunction is a Probability Amplitude.** The wavefunction $\psi_n(x)$ itself is not directly observable. Its square, $|\psi_n(x)|^2$, gives the probability density of finding the particle at position $x$. For the $n=2$ state, the probability of finding the particle in the exact center of the box is zero, even though it can be found on either side. This is deeply non-classical.
    $$
    \psi_n(x) = \sqrt{\frac{2}{L}} \sin\left(\frac{n\pi x}{L}\right)
    $$

## Worked example
**Problem:** For a particle in the ground state ($n=1$) of an infinite square well of length $L$, what is the probability of finding it in the left third of the box (i.e., in the region $0 \le x \le L/3$)?

**Solution:**
1.  **Identify the state and probability density.**
    The ground state corresponds to $n=1$. The wavefunction is $\psi_1(x) = \sqrt{\frac{2}{L}}\sin\left(\frac{\pi x}{L}\right)$.
    The probability density is $P(x) = |\psi_1(x)|^2 = \frac{2}{L}\sin^2\left(\frac{\pi x}{L}\right)$.

2.  **Set up the integral.**
    The probability of finding the particle in a region is the integral of the probability density over that region. We want to find the probability $P(0 \le x \le L/3)$.
    $$
    P = \int_0^{L/3} |\psi_1(x)|^2 dx = \int_0^{L/3} \frac{2}{L}\sin^2\left(\frac{\pi x}{L}\right) dx
    $$

3.  **Solve the integral.**
    We use the trigonometric identity $\sin^2(\theta) = \frac{1}{2}(1 - \cos(2\theta))$.
    Let $\theta = \frac{\pi x}{L}$. Then $2\theta = \frac{2\pi x}{L}$.
    $$
    P = \frac{2}{L} \int_0^{L/3} \frac{1}{2}\left(1 - \cos\left(\frac{2\pi x}{L}\right)\right) dx
    $$
    $$
    P = \frac{1}{L} \left[ x - \frac{L}{2\pi}\sin\left(\frac{2\pi x}{L}\right) \right]_0^{L/3}
    $$

4.  **Evaluate the limits.**
    $$
    P = \frac{1}{L} \left[ \left(\frac{L}{3} - \frac{L}{2\pi}\sin\left(\frac{2\pi (L/3)}{L}\right)\right) - \left(0 - \frac{L}{2\pi}\sin(0)\right) \right]
    $$
    $$
    P = \frac{1}{L} \left[ \frac{L}{3} - \frac{L}{2\pi}\sin\left(\frac{2\pi}{3}\right) \right]
    $$
    Since $\sin(2\pi/3) = \sqrt{3}/2$:
    $$
    P = \frac{1}{L} \left[ \frac{L}{3} - \frac{L}{2\pi}\frac{\sqrt{3}}{2} \right] = \frac{1}{3} - \frac{\sqrt{3}}{4\pi}
    $$

5.  **Final Answer.**
    The probability is $P \approx 0.3333 - 0.1378 \approx 0.1955$. So there is approximately a 19.6% chance of finding the ground-state particle in the first third of the box.

**Reflection:** Each step was necessary. We identified the correct mathematical object ($\psi_1$ and its square), used the definition of probability in quantum mechanics (the integral of the density), performed the calculus correctly (using a standard identity), and evaluated the result. The answer is a pure number, as a probability must be.

## Diagrams
The potential well $V(x)$:
```text
      V(x)
        ^
        |
  ∞     +-----------------+     ∞
        |                 |
        |                 |
   V=0  |.................|
        +---------------------------> x
        0                 L
```

The first three wavefunctions $\psi_n(x)$ and probability densities $|\psi_n(x)|^2$:
```text
   n=3        ^ Psi(x)             ^ |Psi(x)|^2
              |  /\  /\  /\        |   __  __  __
              | /  \/  \/  \       |  /  \/  \/  \
              +---------------->   +---------------->
              |/  /\  /\  \       |
              |  \/  \/  \/        |

   n=2        ^ Psi(x)             ^ |Psi(x)|^2
              |    /\              |    __    __
              |   /  \             |   /  \  /  \
              +---------------->   +---------------->
              |  /    \            |
              | /      \/          |

   n=1        ^ Psi(x)             ^ |Psi(x)|^2
              |      _             |      _
              |     / \            |     / \
              |    /   \           |    /   \
              +---------------->   +---------------->
              0     L/2     L      0     L/2     L
```

## Memory technique — remember this forever
1.  **The Story:** Think of a **guitar string** of length $L$ pinned at both ends. The allowed vibrations are standing waves. The fundamental frequency ($n=1$) is one "hump". The first overtone ($n=2$) has two "humps". The $n$-th harmonic has $n$ "humps". The energy of the particle is like the "energy" of the vibration—more humps (higher frequency) means higher energy. The wavefunction $\psi_n(x)$ *is* the shape of that standing wave.

2.  **Must-Know Formulas:**
    $$
    E_n = \frac{n^2 \pi^2 \hbar^2}{2mL^2} \quad (n=1, 2, 3, ...)
    $$
    $$
    \psi_n(x) = \sqrt{\frac{2}{L}} \sin\left(\frac{n\pi x}{L}\right) \quad (0 \le x \le L)
    $$

3.  **Spaced Repetition:** Review this material and re-derive the results from scratch at these intervals: **1 day, 3 days, 7 days, 16 days, 35 days.**

4.  **First Principles Pathway:** If you forget everything, remember this sequence:
    *   Start with the TISE: $-\frac{\hbar^2}{2m}\psi'' + V\psi = E\psi$.
    *   Inside the box, $V=0$, so $\psi'' = -k^2\psi$ where $k^2 = \frac{2mE}{\hbar^2}$.
    *   The general solution is $\psi(x) = A\sin(kx) + B\cos(kx)$.
    *   Apply boundary condition $\psi(0)=0 \implies B=0$.
    *   Apply boundary condition $\psi(L)=0 \implies A\sin(kL)=0 \implies kL = n\pi$.
    *   Substitute $k$ back into the energy equation: $(\frac{n\pi}{L})^2 = \frac{2mE_n}{\hbar^2}$. Solve for $E_n$.
    *   Find $A$ by normalizing: $\int_0^L A^2\sin^2(\frac{n\pi x}{L})dx = 1$.

## Common mistakes
1.  **The $n=0$ Trap:** Assuming the ground state is $n=0$. For the infinite well, $n$ must be a positive integer ($1, 2, 3, ...$). If $n=0$, then $\psi(x)=0$ everywhere, which means there is no particle. The lowest possible energy is $E_1$.
2.  **Forgetting to Normalize:** Finding the wavefunction as $\psi(x) = \sin(n\pi x/L)$ and then forgetting the normalization constant $A=\sqrt{2/L}$. Probabilities calculated with an unnormalized wavefunction will be incorrect.
3.  **Confusing Wavefunction and Probability:** Stating that the particle is most likely to be found where $\psi(x)$ is maximum. The probability is given by $|\psi(x)|^2$. For states where $\psi(x)$ is negative, this is a critical distinction.
4.  **Units Mismatch in Energy:** Using $h$ instead of $\hbar$ ($h / 2\pi$) in the energy formula. This is a frequent and frustrating calculation error. The argument of the sine must be dimensionless, and the energy units must be Joules. Check your units.

## Self-check
1.  An electron is in an infinite potential well of width $L = 0.2$ nm. Calculate the energy of the $n=4$ state in electron-volts (eV).
2.  For the $n=2$ state, at what position(s) inside the box is the probability of finding the particle at a maximum? At what position(s) is it zero?
3.  Show explicitly by integration that the wavefunctions for the $n=1$ and $n=2$ states are orthogonal. That is, prove that $\int_0^L \psi_1^*(x)\psi_2(x) dx = 0$. What is the physical significance of this result?