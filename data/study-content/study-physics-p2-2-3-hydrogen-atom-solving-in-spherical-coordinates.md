## 1. What it is — in plain English

Imagine the simplest atom possible: Hydrogen. It's like a tiny, tiny solar system with just two members – a single proton at the center (the "sun") and a single electron orbiting it (the "planet"). But there's a huge twist: this isn't a classical solar system where the electron follows a neat, predictable path. Instead, the electron behaves like a fuzzy cloud, and we can only talk about the *probability* of finding it in certain places.

"Solving the hydrogen atom" means figuring out exactly what these fuzzy clouds look like, how much energy the electron has in each cloud shape, and what rules govern these shapes and energies. It's like writing down the complete instruction manual for how the electron behaves around the proton, under the strange rules of quantum mechanics.

"In spherical coordinates" just means we're using a specific mathematical language to describe these shapes. Instead of using x, y, and z (which are great for describing a rectangular room), we use a distance from the center (like the radius of a sphere) and two angles (like latitude and longitude on Earth). This makes perfect sense because the hydrogen atom's proton is a central point, and the electron's "cloud" naturally spreads out around it in a somewhat spherical way. It's the most natural coordinate system for a problem with a central force.

## 2. Why it matters — real-world applications

Understanding the hydrogen atom is the bedrock of modern physics and chemistry. It's the simplest system that exhibits quantum mechanical behavior, and its solution provides the fundamental framework for understanding all other atoms and molecules.

1.  **Spectroscopy and Light Sources:** The specific energies calculated for the hydrogen atom explain why atoms emit and absorb light only at very particular, discrete wavelengths (colors). This principle is crucial for:
    *   **LEDs and Lasers:** We engineer materials (like gallium nitride for blue LEDs) where electrons jump between specific energy levels to emit light of a desired color.
    *   **Astronomy:** By analyzing the light from distant stars and galaxies, astronomers can identify the chemical elements present and even measure their velocity (via Doppler shift), all based on the unique spectral "fingerprints" of atoms like hydrogen.
    *   **Atomic Clocks:** The incredibly precise energy transitions in atoms like Cesium (which are understood through principles derived from the hydrogen atom solution) form the basis of atomic clocks, essential for GPS and global communication networks.

2.  **Quantum Computing:** The idea of discrete energy levels and quantum states, first rigorously demonstrated with the hydrogen atom, is foundational to quantum computing. Qubits, the basic units of quantum information, rely on manipulating these quantum states (e.g., electron spin states or energy levels) in controlled ways. Understanding how these states arise and interact is crucial for designing and operating quantum computers.

3.  **Material Science and Chemistry:** The electron "clouds" (orbitals) derived from solving the hydrogen atom determine how atoms bond together to form molecules and solids.
    *   **Predicting Molecular Shapes:** The shapes of orbitals (s, p, d, f) dictate the geometry of molecules, which in turn determines their chemical properties, reactivity, and function (e.g., drug design, polymer synthesis).
    *   **Semiconductors:** The electronic band structure of materials, which governs their electrical conductivity and forms the basis of all modern electronics, is built upon the quantum mechanical understanding of electron behavior in atomic orbitals.

4.  **Medical Imaging (MRI):** Magnetic Resonance Imaging (MRI) exploits the quantum property of "spin" in atomic nuclei, particularly hydrogen nuclei (protons) in water molecules within the body. By placing a patient in a strong magnetic field and applying radio waves, the hydrogen nuclei can be excited to higher energy states. When they relax, they emit signals that are detected and used to create detailed images of soft tissues. The underlying physics of these energy states is directly related to the quantum mechanical description of atomic particles.

## 3. Prerequisites — what you must know first

To fully grasp the "Hydrogen atom — solving in spherical coordinates," ensure you have a solid understanding of these concepts:

*   **Classical Mechanics:** Newton's laws of motion, kinetic energy ($K = \frac{1}{2}mv^2$), potential energy ($V$), conservative forces, and the concept of angular momentum ($\mathbf{L} = \mathbf{r} \times \mathbf{p}$).
*   **Electromagnetism:** Coulomb's Law for the force between charged particles ($F = k \frac{q_1 q_2}{r^2}$) and the associated electric potential energy ($V(r) = \frac{kq_1 q_2}{r}$).
*   **Introductory Quantum Mechanics:**
    *   **Planck's constant ($h$ or $\hbar$):** The fundamental constant relating energy to frequency and momentum to wavelength.
    *   **Wave-particle duality:** The concept that particles can exhibit wave-like properties and vice-versa.
    *   **Schrödinger Equation (Time-Independent):** The central equation of non-relativistic quantum mechanics, $H\Psi = E\Psi$, where $H$ is the Hamiltonian operator, $\Psi$ is the wavefunction, and $E$ is the energy eigenvalue.
    *   **Operators, Eigenvalues, Eigenfunctions:** Understanding that physical observables are represented by operators, and measurements yield eigenvalues (specific values) corresponding to eigenfunctions (specific states).
    *   **Quantization:** The idea that certain physical quantities (like energy, angular momentum) can only take on discrete values.
    *   **Uncertainty Principle:** The fundamental limit on the precision with which certain pairs of physical properties of a particle (e.g., position and momentum) can be known simultaneously.
*   **Multivariable Calculus:**
    *   **Partial Derivatives:** Derivatives with respect to one variable while holding others constant.
    *   **Multiple Integrals:** Integrals over multiple dimensions (e.g., volume integrals).
    *   **Ordinary and Partial Differential Equations:** Methods for solving equations involving derivatives.
    *   **Separation of Variables:** A technique for solving partial differential equations by assuming the solution can be written as a product of functions, each depending on a single variable.
*   **Linear Algebra (Conceptual):** The idea of eigenvalue problems, where a transformation (operator) acts on a vector (function) to produce a scaled version of the same vector (eigenvalue times eigenfunction).
*   **Spherical Coordinates:**
    *   **Coordinate Transformation:** How to convert between Cartesian $(x,y,z)$ and spherical $(r, \theta, \phi)$ coordinates.
    *   **Volume Element:** $dV = r^2 \sin\theta \, dr \, d\theta \, d\phi$.
    *   **Laplacian Operator in Spherical Coordinates:** The form of $\nabla^2$ in spherical coordinates, which is essential for the Schrödinger equation.
*   **Special Functions (Awareness):** Recognition of Legendre polynomials, associated Legendre functions, and Laguerre polynomials as common solutions to differential equations arising from problems with spherical symmetry.

## 4. The core idea — step by step

The core idea is to apply the time-independent Schrödinger equation to the hydrogen atom, recognizing its spherical symmetry, and then systematically break down the complex 3D problem into simpler 1D problems using a technique called separation of variables.

### Step 1: Define the Hydrogen Atom and its Hamiltonian

*   **Plain English:** We're dealing with a single electron attracted to a single proton. The "energy bookkeeper" (Hamiltonian) for this system includes the electron's kinetic energy and its electrical potential energy due to the proton.
*   **Concrete Example:** Imagine an electron moving around a proton. Its total energy is the sum of its motion energy and the energy stored in the electric field between them.
*   **Formal/Mathematical Version:**
    The time-independent Schrödinger Equation is $H\Psi = E\Psi$.
    For the hydrogen atom, the Hamiltonian operator $H$ is given by:
    $$H = -\frac{\hbar^2}{2\mu}\nabla^2 + V(r)$$
    where:
    *   $\hbar$ is the reduced Planck constant.
    *   $\mu$ is the reduced mass of the electron-proton system (approximately the electron mass, $m_e$, since the proton is much heavier).
    *   $\nabla^2$ is the Laplacian operator, representing the kinetic energy.
    *   $V(r)$ is the Coulomb potential energy, which depends only on the distance $r$ between the electron and the proton:
        $$V(r) = -\frac{e^2}{4\pi\epsilon_0 r}$$
        (Here, $e$ is the elementary charge, and $\epsilon_0$ is the permittivity of free space. We'll often use $k_e = \frac{1}{4\pi\epsilon_0}$ for simplicity, so $V(r) = -\frac{k_e e^2}{r}$.)
*   **What could go wrong:** Forgetting the negative sign in the potential energy (it's an attractive force) or using the classical kinetic energy expression instead of its quantum operator form ($\nabla^2$).

### Step 2: Choose the Right Coordinate System

*   **Plain English:** Since the proton is at the center and the electron's potential energy only depends on its distance from the proton, the problem has spherical symmetry. Using spherical coordinates (distance $r$, polar angle $\theta$, azimuthal angle $\phi$) makes the math much simpler than using Cartesian coordinates ($x, y, z$).
*   **Concrete Example:** Trying to describe the surface of a ball using x, y, z coordinates is awkward; using radius and two angles is natural. The electron cloud around a nucleus is like a fuzzy ball.
*   **Formal/Mathematical Version:**
    The Laplacian operator $\nabla^2$ in spherical coordinates $(r, \theta, \phi)$ is:
    $$\nabla^2 = \frac{1}{r^2}\frac{\partial}{\partial r}\left(r^2\frac{\partial}{\partial r}\right) + \frac{1}{r^2\sin\theta}\frac{\partial}{\partial\theta}\left(\sin\theta\frac{\partial}{\partial\theta}\right) + \frac{1}{r^2\sin^2\theta}\frac{\partial^2}{\partial\phi^2}$$
    Substituting this into the Schrödinger equation, along with $V(r)$, gives the full equation we need to solve:
    $$-\frac{\hbar^2}{2\mu}\left[\frac{1}{r^2}\frac{\partial}{\partial r}\left(r^2\frac{\partial\Psi}{\partial r}\right) + \frac{1}{r^2\sin\theta}\frac{\partial}{\partial\theta}\left(\sin\theta\frac{\partial\Psi}{\partial\theta}\right) + \frac{1}{r^2\sin^2\theta}\frac{\partial^2\Psi}{\partial\phi^2}\right] - \frac{e^2}{4\pi\epsilon_0 r}\Psi = E\Psi$$
*   **What could go wrong:** Using the Cartesian Laplacian; making errors in the spherical coordinate transformation.

### Step 3: Separate Variables

*   **Plain English:** The electron's wavefunction $\Psi(r, \theta, \phi)$ describes its probability distribution in 3D space. Because the potential only depends on $r$, we can assume the solution can be broken down into three independent parts: one that depends only on $r$, one only on $\theta$, and one only on $\phi$. This turns one big, complicated partial differential equation into three smaller, more manageable ordinary differential equations.
*   **Concrete Example:** If you have a function $f(x,y,z) = X(x)Y(y)Z(z)$, you can separate the variables. We're doing the same for the quantum wavefunction.
*   **Formal/Mathematical Version:**
    We propose a solution of the form:
    $$\Psi(r, \theta, \phi) = R(r)\Theta(\theta)\Phi(\phi)$$
    Substitute this into the Schrödinger equation and divide by $R\Theta\Phi$:
    $$-\frac{\hbar^2}{2\mu}\left[\frac{1}{R r^2}\frac{d}{d r}\left(r^2\frac{dR}{d r}\right) + \frac{1}{\Theta r^2\sin\theta}\frac{d}{d\theta}\left(\sin\theta\frac{d\Theta}{d\theta}\right) + \frac{1}{\Phi r^2\sin^2\theta}\frac{d^2\Phi}{d\phi^2}\right] - \frac{e^2}{4\pi\epsilon_0 r} = E$$
    Multiply by $2\mu r^2/\hbar^2$ and rearrange terms. The $\phi$ part can be isolated:
    $$\frac{1}{\Phi}\frac{d^2\Phi}{d\phi^2} = -m_l^2$$
    This is the azimuthal equation. The constant $-m_l^2$ arises because the left side depends only on $\phi$, and the rest of the equation depends only on $r$ and $\theta$. For them to be equal, both sides must be equal to a constant.
*   **What could go wrong:** Incorrectly separating terms or making algebraic errors during the rearrangement. Not understanding why a separation constant must be introduced.

### Step 4: Solve the Angular Equations (Azimuthal and Polar)

*   **Plain English:** The angular parts of the wavefunction describe the *shape* of the electron cloud – how it's distributed around the nucleus. Solving these equations gives us specific allowed shapes.
*   **Concrete Example:** The "s" orbital is spherical, "p" orbitals are dumbbell-shaped, "d" orbitals have more complex cloverleaf shapes. These shapes come directly from the solutions to the angular equations.
*   **Formal/Mathematical Version:**
    **a) Azimuthal Equation ($\Phi(\phi)$):**
    $$\frac{d^2\Phi}{d\phi^2} = -m_l^2\Phi$$
    The solutions are of the form $\Phi(\phi) = A e^{im_l\phi}$. For $\Phi(\phi)$ to be single-valued (i.e., $\Phi(\phi) = \Phi(\phi + 2\pi)$), $m_l$ must be an integer: $m_l = 0, \pm 1, \pm 2, \ldots$. This is the **magnetic quantum number**.
    **b) Polar Equation ($\Theta(\theta)$):**
    After isolating the $\theta$ term and setting it equal to another separation constant, we get:
    $$\frac{1}{\sin\theta}\frac{d}{d\theta}\left(\sin\theta\frac{d\Theta}{d\theta}\right) - \frac{m_l^2}{\sin^2\theta}\Theta = -l(l+1)\Theta$$
    This is the associated Legendre equation. Its well-behaved, finite solutions exist only when $l$ is a non-negative integer, and $l \ge |m_l|$. These solutions are the associated Legendre functions $P_l^{|m_l|}(\cos\theta)$. $l$ is the **orbital angular momentum quantum number**.
    The product $\Theta(\theta)\Phi(\phi)$ forms the **spherical harmonics** $Y_{l,m_l}(\theta, \phi)$.
*   **What could go wrong:** Forgetting the boundary condition for $\Phi$ (periodicity) which quantizes $m_l$; not knowing that the associated Legendre equation only has physical solutions for integer $l$ and specific relationships between $l$ and $m_l$.

### Step 5: Solve the Radial Equation

*   **Plain English:** The radial part $R(r)$ describes how the electron's probability changes with distance from the nucleus. It tells us how "spread out" the electron cloud is.
*   **Concrete Example:** The 1s orbital is dense near the nucleus and falls off exponentially. The 2s orbital has a node (a region of zero probability) further out. This radial behavior is captured by $R(r)$.
*   **Formal/Mathematical Version:**
    After separating the angular parts, the remaining equation for $R(r)$ is:
    $$-\frac{\hbar^2}{2\mu}\frac{1}{r^2}\frac{d}{d r}\left(r^2\frac{dR}{d r}\right) + \left[\frac{\hbar^2 l(l+1)}{2\mu r^2} - \frac{e^2}{4\pi\epsilon_0 r}\right]R = ER$$
    This is the radial equation. The term $\frac{\hbar^2 l(l+1)}{2\mu r^2}$ is an "effective potential" term, arising from angular momentum (centrifugal barrier).
    Solving this equation is complex, typically involving a series solution and asymptotic analysis. Regular, finite solutions exist only when $E$ takes specific discrete values. These energy eigenvalues are:
    $$E_n = -\frac{\mu e^4}{8\epsilon_0^2 h^2 n^2} = -\frac{13.6 \text{ eV}}{n^2}$$
    where $n$ is the **principal quantum number**, a positive integer $n=1, 2, 3, \ldots$. Crucially, $n$ must be greater than $l$ (i.e., $n > l$). The solutions for $R(r)$ involve associated Laguerre polynomials.
*   **What could go wrong:** Misinterpreting the effective potential; struggling with the mathematical complexity of the radial equation.

### Step 6: Identify the Quantum Numbers

*   **Plain English:** The solutions to the Schrödinger equation for the hydrogen atom are not arbitrary. They only exist for specific, quantized values, which we describe using a set of integer "quantum numbers." These numbers uniquely define each allowed state (orbital) of the electron.
*   **Concrete Example:** Think of a specific address for an electron: $n=1, l=0, m_l=0$ is the "1s" orbital; $n=2, l=1, m_l=0$ is one of the "2p" orbitals.
*   **Formal/Mathematical Version:**
    The three quantum numbers that naturally emerge are:
    *   **Principal Quantum Number ($n$):** $n = 1, 2, 3, \ldots$ (positive integers). Determines the electron's energy and the overall size of the orbital. $E_n \propto -1/n^2$.
    *   **Orbital Angular Momentum Quantum Number ($l$):** $l = 0, 1, 2, \ldots, n-1$. Determines the magnitude of the electron's orbital angular momentum ($|\mathbf{L}| = \hbar\sqrt{l(l+1)}$) and the shape of the orbital.
    *   **Magnetic Quantum Number ($m_l$):** $m_l = -l, -l+1, \ldots, 0, \ldots, l-1, l$. Determines the orientation of the orbital angular momentum vector in space (its projection along a chosen axis, usually z-axis, $L_z = m_l\hbar$).
*   **What could go wrong:** Forgetting the allowed ranges and relationships between the quantum numbers (e.g., $l < n$, $|m_l| \le l$).

### Step 7: Construct the Wavefunctions and Energies

*   **Plain English:** Putting all the pieces together, we get a complete description of each possible electron state in the hydrogen atom. Each state has a unique energy and a unique spatial distribution.
*   **Concrete Example:** The "1s" orbital wavefunction is spherically symmetric and has the lowest energy. The "2p" orbitals are dumbbell-shaped and have higher energy.
*   **Formal/Mathematical Version:**
    The complete time-independent wavefunction for a hydrogen atom electron in a specific state $(n, l, m_l)$ is:
    $$\Psi_{n,l,m_l}(r, \theta, \phi) = R_{n,l}(r) Y_{l,m_l}(\theta, \phi)$$
    where $R_{n,l}(r)$ are the radial wavefunctions (involving Laguerre polynomials) and $Y_{l,m_l}(\theta, \phi)$ are the spherical harmonics (involving associated Legendre functions and complex exponentials).
    The allowed energy levels are given solely by the principal quantum number $n$:
    $$E_n = -\frac{\mu e^4}{8\epsilon_0^2 h^2 n^2}$$
    These solutions are called **atomic orbitals**. The square of the wavefunction, $|\Psi_{n,l,m_l}(r, \theta, \phi)|^2$, gives the probability density of finding the electron at a given point in space.
*   **What could go wrong:** Confusing the wavefunction $\Psi$ with the probability density $|\Psi|^2$; not understanding that the energy only depends on $n$ (for a pure hydrogen atom, neglecting relativistic effects, spin-orbit coupling, etc.).

## 5. Worked examples — multiple, with every step shown

### Example 1 (Easy): Setting up the Schrödinger Equation

**Problem:** Write down the time-independent Schrödinger equation for the hydrogen atom in spherical coordinates, identifying each term. Assume the nucleus is fixed at the origin.

**Given:**
*   Hydrogen atom: one electron, one proton.
*   Electron mass $\mu \approx m_e$.
*   Coulomb potential $V(r) = -\frac{e^2}{4\pi\epsilon_0 r}$.
*   Spherical coordinates $(r, \theta, \phi)$.

**Wanted:** The full time-independent Schrödinger equation.

**Solution:**

1.  **Start with the general time-independent Schrödinger equation:**
    $$H\Psi = E\Psi$$
    This is the fundamental equation relating the total energy operator (Hamiltonian $H$) to the wavefunction $\Psi$ and the total energy $E$.

2.  **Write down the Hamiltonian operator $H$ for a single particle in a potential $V$:**
    $$H = -\frac{\hbar^2}{2\mu}\nabla^2 + V$$
    The first term ($-\frac{\hbar^2}{2\mu}\nabla^2$) represents the kinetic energy operator. The second term ($V$) represents the potential energy operator. $\mu$ is the reduced mass of the system.

3.  **Substitute the specific potential energy for the hydrogen atom:**
    $$V(r) = -\frac{e^2}{4\pi\epsilon_0 r}$$
    This is the attractive Coulomb potential between the electron (charge $-e$) and the proton (charge $+e$). It only depends on the radial distance $r$, which is key for using spherical coordinates.

4.  **Substitute the Laplacian operator $\nabla^2$ in spherical coordinates:**
    $$\nabla^2 = \frac{1}{r^2}\frac{\partial}{\partial r}\left(r^2\frac{\partial}{\partial r}\right) + \frac{1}{r^2\sin\theta}\frac{\partial}{\partial\theta}\left(\sin\theta\frac{\partial}{\partial\theta}\right) + \frac{1}{r^2\sin^2\theta}\frac{\partial^2}{\partial\phi^2}$$
    This is the expression for the kinetic energy part of the Hamiltonian, adapted for the spherical coordinate system.

5.  **Combine all parts into the full Schrödinger equation:**
    $$-\frac{\hbar^2}{2\mu}\left[\frac{1}{r^2}\frac{\partial}{\partial r}\left(r^2\frac{\partial\Psi}{\partial r}\right) + \frac{1}{r^2\sin\theta}\frac{\partial}{\partial\theta}\left(\sin\theta\frac{\partial\Psi}{\partial\theta}\right) + \frac{1}{r^2\sin^2\theta}\frac{\partial^2\Psi}{\partial\phi^2}\right] - \frac{e^2}{4\pi\epsilon_0 r}\Psi = E\Psi$$
    This is the complete time-independent Schrödinger equation for the hydrogen atom in spherical coordinates. Each term acts on the wavefunction $\Psi(r, \theta, \phi)$.

    **Final Answer:**
    $$ \boxed{-\frac{\hbar^2}{2\mu}\left[\frac{1}{r^2}\frac{\partial}{\partial r}\left(r^2\frac{\partial\Psi}{\partial r}\right) + \frac{1}{r^2\sin\theta}\frac{\partial}{\partial\theta}\left(\sin\theta\frac{\partial\Psi}{\partial\theta}\right) + \frac{1}{r^2\sin^2\theta}\frac{\partial^2\Psi}{\partial\phi^2}\right] - \frac{e^2}{4\pi\epsilon_0 r}\Psi = E\Psi} $$

**Reflection:** This example emphasizes the importance of knowing the general form of the Schrödinger equation, the specific potential for the problem, and the correct form of the kinetic energy operator (Laplacian) in the chosen coordinate system. The main pitfall is often just writing down the correct Laplacian.

### Example 2 (Medium): Deriving the Azimuthal Quantum Number

**Problem:** Show how the requirement for the azimuthal wavefunction $\Phi(\phi)$ to be single-valued leads to the quantization of the magnetic quantum number $m_l$.

**Given:**
*   The separated azimuthal equation: $\frac{1}{\Phi}\frac{d^2\Phi}{d\phi^2} = -m_l^2$.
*   The solution form $\Phi(\phi) = A e^{im_l\phi}$.
*   The physical requirement that the wavefunction must be single-valued.

**Wanted:** Proof that $m_l$ must be an integer.

**Solution:**

1.  **Start with the azimuthal differential equation:**
    $$\frac{d^2\Phi}{d\phi^2} = -m_l^2\Phi$$
    This equation describes the behavior of the wavefunction as we rotate around the z-axis.

2.  **State the general solution:**
    $$\Phi(\phi) = A e^{im_l\phi}$$
    where $A$ is a normalization constant. This is a standard solution for a second-order linear differential equation of this form.

3.  **Apply the single-valuedness boundary condition:**
    A physical wavefunction must be single-valued, meaning that if you rotate by $2\pi$ (a full circle) around the z-axis, you must return to the exact same value of the wavefunction. Mathematically, this means:
    $$\Phi(\phi) = \Phi(\phi + 2\pi)$$
    This is a crucial physical constraint for any valid quantum mechanical solution.

4.  **Substitute the solution into the boundary condition:**
    $$A e^{im_l\phi} = A e^{im_l(\phi + 2\pi)}$$
    We are equating the wavefunction at angle $\phi$ to its value at angle $\phi + 2\pi$.

5.  **Simplify the equation:**
    $$e^{im_l\phi} = e^{im_l\phi} e^{im_l 2\pi}$$
    Divide both sides by $e^{im_l\phi}$ (assuming $A \neq 0$ and $e^{im_l\phi} \neq 0$):
    $$1 = e^{im_l 2\pi}$$
    This condition ensures that the wavefunction is periodic with a period of $2\pi$.

6.  **Use Euler's formula ($e^{ix} = \cos x + i\sin x$):**
    $$1 = \cos(2\pi m_l) + i\sin(2\pi m_l)$$
    For this complex equation to hold, the real part must be 1 and the imaginary part must be 0.

7.  **Solve for $m_l$:**
    *   For the imaginary part to be zero: $\sin(2\pi m_l) = 0$. This implies that $2\pi m_l$ must be an integer multiple of $\pi$. So, $2\pi m_l = k\pi$, where $k$ is an integer. This simplifies to $2m_l = k$, or $m_l = k/2$.
    *   For the real part to be one: $\cos(2\pi m_l) = 1$. This implies that $2\pi m_l$ must be an integer multiple of $2\pi$. So, $2\pi m_l = 2k'\pi$, where $k'$ is an integer. This simplifies to $m_l = k'$.

    Combining both conditions, $m_l$ must be an integer. If $m_l$ were a half-integer (e.g., $1/2$), $\cos(2\pi \cdot 1/2) = \cos(\pi) = -1$, which violates the condition. Therefore, $m_l$ must be an integer.

    **Final Answer:**
    The requirement that $\Psi(\phi) = \Psi(\phi+2\pi)$ necessitates that $e^{im_l 2\pi} = 1$. This condition is satisfied if and only if $2\pi m_l$ is an integer multiple of $2\pi$, which means $m_l$ must be an integer:
    $$ \boxed{m_l = 0, \pm 1, \pm 2, \ldots} $$

**Reflection:** This example highlights how fundamental physical requirements (like single-valuedness) directly lead to the quantization of physical quantities. It's a key step in understanding why quantum numbers are integers.

### Example 3 (Harder): Verifying a 1s Wavefunction Property

**Problem:** The normalized radial wavefunction for the 1s state of hydrogen is $R_{1,0}(r) = \frac{2}{a_0^{3/2}} e^{-r/a_0}$, where $a_0$ is the Bohr radius ($a_0 = \frac{4\pi\epsilon_0\hbar^2}{\mu e^2}$). Show that this wavefunction has its maximum probability density at $r=0$.

**Given:**
*   $R_{1,0}(r) = \frac{2}{a_0^{3/2}} e^{-r/a_0}$.
*   The general form of the wavefunction for $l=0$ (s-states) is spherically symmetric, so $Y_{0,0}(\theta, \phi)$ is a constant. Thus, $|\Psi_{1,0,0}(r, \theta, \phi)|^2 \propto |R_{1,0}(r)|^2$.
*   The radial probability density is $P(r) = r^2 |R_{n,l}(r)|^2$.

**Wanted:** Show that $P(r)$ for the 1s state has its maximum at $r=0$. (Correction: The question asks for maximum probability *density* at $r=0$. This is often a point of confusion. The *radial probability density* $P(r) = r^2|R(r)|^2$ is zero at $r=0$, but the *volume probability density* $|\Psi|^2$ is maximum at $r=0$. Let's clarify and show the latter.)

**Correction to Problem Statement:** Show that the *volume probability density* $|\Psi_{1,0,0}(r, \theta, \phi)|^2$ for the 1s state of hydrogen has its maximum at $r=0$.

**Solution:**

1.  **Identify the full wavefunction for the 1s state:**
    For the 1s state, $n=1, l=0, m_l=0$.
    The full wavefunction is $\Psi_{1,0,0}(r, \theta, \phi) = R_{1,0}(r) Y_{0,0}(\theta, \phi)$.
    The spherical harmonic $Y_{0,0}(\theta, \phi)$ is a constant, specifically $Y_{0,0}(\theta, \phi) = \frac{1}{\sqrt{4\pi}}$.
    So, $\Psi_{1,0,0}(r, \theta, \phi) = \frac{2}{a_0^{3/2}} e^{-r/a_0} \cdot \frac{1}{\sqrt{4\pi}}$.

2.  **Calculate the volume probability density:**
    The volume probability density is $|\Psi_{1,0,0}(r, \theta, \phi)|^2$.
    $$|\Psi_{1,0,0}(r, \theta, \phi)|^2 = \left(\frac{2}{a_0^{3/2}} e^{-r/a_0} \cdot \frac{1}{\sqrt{4\pi}}\right)^2$$
    $$|\Psi_{1,0,0}(r, \theta, \phi)|^2 = \frac{4}{a_0^3} e^{-2r/a_0} \cdot \frac{1}{4\pi}$$
    $$|\Psi_{1,0,0}(r, \theta, \phi)|^2 = \frac{1}{\pi a_0^3} e^{-2r/a_0}$$
    Let's call this probability density function $\rho(r) = \frac{1}{\pi a_0^3} e^{-2r/a_0}$.

3.  **Find the maximum of the probability density function:**
    To find the maximum of $\rho(r)$, we need to find where its derivative with respect to $r$ is zero, and check the second derivative or boundary conditions.
    First, calculate the derivative $\frac{d\rho}{dr}$:
    $$\frac{d\rho}{dr} = \frac{1}{\pi a_0^3} \frac{d}{dr}(e^{-2r/a_0})$$
    $$\frac{d\rho}{dr} = \frac{1}{\pi a_0^3} \left(-\frac{2}{a_0} e^{-2r/a_0}\right)$$
    $$\frac{d\rho}{dr} = -\frac{2}{\pi a_0^4} e^{-2r/a_0}$$

4.  **Set the derivative to zero to find critical points:**
    $$-\frac{2}{\pi a_0^4} e^{-2r/a_0} = 0$$
    The exponential function $e^{-2r/a_0}$ is never zero for any finite $r$. The prefactor $-\frac{2}{\pi a_0^4}$ is also non-zero.
    This means that $\frac{d\rho}{dr}$ is *never* zero for $r > 0$.
    Furthermore, since $e^{-2r/a_0}$ is always positive, $\frac{d\rho}{dr}$ is always negative for $r > 0$. This implies that $\rho(r)$ is a monotonically *decreasing* function of $r$.

5.  **Evaluate $\rho(r)$ at its boundaries:**
    Since $\rho(r)$ is always decreasing for $r > 0$, its maximum must occur at the smallest possible value of $r$, which is $r=0$.
    Let's evaluate $\rho(r)$ at $r=0$:
    $$\rho(0) = \frac{1}{\pi a_0^3} e^{-2(0)/a_0} = \frac{1}{\pi a_0^3} e^0 = \frac{1}{\pi a_0^3}$$
    As $r \to \infty$, $\rho(r) \to 0$.

    **Final Answer:**
    The volume probability density for the 1s state is $\rho(r) = \frac{1}{\pi a_0^3} e^{-2r/a_0}$. Since $\frac{d\rho}{dr} = -\frac{2}{\pi a_0^4} e^{-2r/a_0}$ is always negative for $r \ge 0$, the function $\rho(r)$ is monotonically decreasing. Therefore, its maximum value occurs at the smallest possible radial distance, $r=0$.
    $$ \boxed{\text{The volume probability density } |\Psi_{1,0,0}(r, \theta, \phi)|^2 \text{ is maximum at } r=0.} $$

**Reflection:** This example highlights a common point of confusion: the difference between *volume probability density* ($|\Psi|^2$) and *radial probability density* ($P(r) = r^2|\Psi|^2$). For s-states ($l=0$), the electron is most likely to be *at the nucleus* in terms of volume probability density. However, the *radial probability density* $P(r)$ (the probability of finding the electron in a spherical shell of thickness $dr$ at radius $r$) is zero at $r=0$ because the $r^2$ factor dominates, and it peaks at $r=a_0$ for the 1s state. This problem specifically asked for the volume probability density, which indeed peaks at $r=0$.

### Example 4 (Conceptual/Application): Degeneracy of Energy Levels

**Problem:** Explain the degeneracy of energy levels in the hydrogen atom. Specifically, for a given principal quantum number $n$, how many distinct states (orbitals) have the same energy $E_n$?

**Given:**
*   Energy levels $E_n = -\frac{13.6 \text{ eV}}{n^2}$ depend only on $n$.
*   Quantum numbers and their ranges:
    *   $n = 1, 2, 3, \ldots$
    *   $l = 0, 1, \ldots, n-1$
    *   $m_l = -l, -l+1, \ldots, l-1, l$

**Wanted:** The total number of degenerate states for a given $n$.

**Solution:**

1.  **Understand Degeneracy:**
    Degeneracy in quantum mechanics means that two or more distinct quantum states have the exact same energy eigenvalue. For the hydrogen atom, the energy $E_n$ depends *only* on the principal quantum number $n$. This means that all states with the same $n$ value, regardless of their $l$ or $m_l$ values, will have the same energy.

2.  **Count states for a given $n$ by summing over $l$ values:**
    For a fixed $n$, the possible values for $l$ range from $0$ up to $n-1$.
    $$l = 0, 1, 2, \ldots, n-1$$

3.  **Count states for a given $l$ by summing over $m_l$ values:**
    For each specific value of $l$, the possible values for $m_l$ range from $-l$ to $+l$. The number of $m_l$ values for a given $l$ is $2l+1$.
    For example:
    *   If $l=0$, $m_l=0$ (1 state).
    *   If $l=1$, $m_l=-1, 0, 1$ (3 states).
    *   If $l=2$, $m_l=-2, -1, 0, 1, 2$ (5 states).

4.  **Sum the number of $m_l$ states for all allowed $l$ values for a given $n$:**
    The total degeneracy for a principal quantum number $n$ is the sum of $(2l+1)$ for all allowed $l$ values:
    $$N_n = \sum_{l=0}^{n-1} (2l+1)$$

5.  **Calculate the sum:**
    Let's expand the sum:
    $$N_n = (2(0)+1) + (2(1)+1) + (2(2)+1) + \ldots + (2(n-1)+1)$$
    $$N_n = 1 + 3 + 5 + \ldots + (2n-1)$$
    This is the sum of the first $n$ odd numbers. The sum of the first $k$ odd numbers is $k^2$. In this case, we are summing $n$ terms.
    So, $N_n = n^2$.

    Alternatively, we can use the sum formula:
    $$N_n = \sum_{l=0}^{n-1} (2l+1) = 2\sum_{l=0}^{n-1} l + \sum_{l=0}^{n-1} 1$$
    The sum of the first $k$ integers (from 0 to $k-1$) is $\frac{(k-1)k}{2}$. Here, $k=n$. So $\sum_{l=0}^{n-1} l = \frac{(n-1)n}{2}$.
    The sum of $1$ for $n$ terms is $n$.
    $$N_n = 2\left(\frac{(n-1)n}{2}\right) + n$$
    $$N_n = n(n-1) + n$$
    $$N_n = n^2 - n + n$$
    $$N_n = n^2$$

    **Final Answer:**
    For a given principal quantum number $n$, the energy level $E_n$ is degenerate, and there are $n^2$ distinct states (orbitals) that share this same energy.
    $$ \boxed{\text{The degeneracy of the } n\text{-th energy level in the hydrogen atom is } n^2.} $$

**Reflection:** This example demonstrates how the quantum numbers $l$ and $m_l$ contribute to the degeneracy of energy levels. This $n^2$ degeneracy is specific to the pure hydrogen atom (or any single-electron ion) and arises because the potential energy only depends on $r$. When external fields (like magnetic fields) or electron-electron interactions (in multi-electron atoms) are introduced, this degeneracy is typically lifted, leading to phenomena like the Zeeman effect.

## 6. Common mistakes and traps

1.  **Confusing Wavefunction with Probability Density:** Students often mix up $\Psi(r, \theta, \phi)$ with $|\Psi(r, \theta, \phi)|^2$. The wavefunction itself is a complex probability amplitude; its square magnitude is the probability density (probability per unit volume). Similarly, confusing $|\Psi|^2$ with the radial probability density $P(r) = r^2|\Psi|^2$.
2.  **Incorrectly Applying Boundary Conditions:** Forgetting that $\Phi(\phi)$ must be single-valued (leading to integer $m_l$) or that solutions must be finite everywhere (which quantizes $l$ and $n$). These boundary conditions are the physical reasons for quantization.
3.  **Errors in the Laplacian Operator:** Using the Cartesian Laplacian instead of the spherical Laplacian, or making algebraic errors when writing out the spherical Laplacian. This is a fundamental step that, if incorrect, propagates through the entire solution.
4.  **Misunderstanding the Role of Separation Constants:** Not realizing that the separation constants (like $-m_l^2$ and $-l(l+1)$) are not arbitrary but are directly related to conserved quantities (like angular momentum) and arise from the mathematical requirement to separate variables.
5.  **Forgetting the Relationships Between Quantum Numbers:** The constraints $l < n$ and $|m_l| \le l$ are critical. Violating these leads to non-physical solutions.
6.  **Visualizing Orbitals as Classical Paths:** While "orbital" sounds like "orbit," quantum orbitals are probability distributions, not fixed paths. The electron doesn't "orbit" in the classical sense; it exists as a cloud.
7.  **Ignoring the Reduced Mass:** Although often approximated as the electron mass, the true mass to use in the Schrödinger equation for a two-body problem like hydrogen is the reduced mass $\mu = \frac{m_e m_p}{m_e + m_p}$. Forgetting this is a minor error for hydrogen but can be significant for other systems.

## 7. Textbook-precise explanation

The quantum mechanical description of the hydrogen atom begins with the time-independent Schrödinger equation, $H\Psi = E\Psi$, where $H$ is the Hamiltonian operator, $\Psi$ is the wavefunction, and $E$ is the total energy. The hydrogen atom consists of a proton (charge $+e$) and an electron (charge $-e$), interacting via the Coulomb potential. Treating the proton as a fixed point charge at the origin (a valid approximation due to its much larger mass), the Hamiltonian for the electron is:

$$H = -\frac{\hbar^2}{2\mu}\nabla^2 - \frac{e^2}{4\pi\epsilon_0 r}$$

Here, $\mu$ is the reduced mass of the electron-proton system, and $r$ is the distance between them. Due to the spherical symmetry of the Coulomb potential $V(r) = -\frac{e^2}{4\pi\epsilon_0 r}$, it is natural and mathematically advantageous to solve this equation in spherical coordinates $(r, \theta, \phi)$. The Laplacian operator $\nabla^2$ in spherical coordinates is given by:

$$\nabla^2 = \frac{1}{r^2}\frac{\partial}{\partial r}\left(r^2\frac{\partial}{\partial r}\right) + \frac{1}{r^2\sin\theta}\frac{\partial}{\partial\theta}\left(\sin\theta\frac{\partial}{\partial\theta}\right) + \frac{1}{r^2\sin^2\theta}\frac{\partial^2}{\partial\phi^2}$$

Substituting this into the Schrödinger equation yields a partial differential equation in three variables. This equation is solved using the method of **separation of variables**, by assuming the wavefunction can be written as a product of three independent functions:

$$\Psi(r, \theta, \phi) = R(r)\Theta(\theta)\Phi(\phi)$$

Upon substitution and algebraic manipulation, the Schrödinger equation separates into three ordinary differential equations:

1.  **Azimuthal Equation (for $\Phi(\phi)$):**
    $$\frac{d^2\Phi}{d\phi^2} + m_l^2\Phi = 0$$
    The constant $m_l^2$ arises from the separation. For the solution $\Phi(\phi) = A e^{im_l\phi}$ to be single-valued (i.e., $\Phi(\phi) = \Phi(\phi+2\pi)$), $m_l$ must be an integer: $m_l = 0, \pm 1, \pm 2, \ldots$. This is the **magnetic quantum number**, which quantizes the z-component of angular momentum, $L_z = m_l\hbar$.

2.  **Polar Equation (for $\Theta(\theta)$):**
    $$\frac{1}{\sin\theta}\frac{d}{d\theta}\left(\sin\theta\frac{d\Theta}{d\theta}\right) - \frac{m_l^2}{\sin^2\theta}\Theta + l(l+1)\Theta = 0$$
    This is the associated Legendre equation. Well-behaved, finite solutions exist only when $l$ is a non-negative integer, and $|m_l| \le l$. These solutions are the **associated Legendre functions** $P_l^{|m_l|}(\cos\theta)$. The constant $l(l+1)$ is related to the square of the total orbital angular momentum, $|\mathbf{L}|^2 = \hbar^2 l(l+1)$. $l$ is the **orbital angular momentum quantum number**. The product $Y_{l,m_l}(\theta, \phi) = \Theta(\theta)\Phi(\phi)$ forms the **spherical harmonics**, which describe the angular shape of the electron's probability distribution.

3.  **Radial Equation (for $R(r)$):**
    $$-\frac{\hbar^2}{2\mu}\frac{1}{r^2}\frac{d}{d r}\left(r^2\frac{dR}{d r}\right) + \left[\frac{\hbar^2 l(l+1)}{2\mu r^2} - \frac{e^2}{4\pi\epsilon_0 r}\right]R = ER$$
    This equation describes the radial behavior of the wavefunction. The term $\frac{\hbar^2 l(l+1)}{2\mu r^2}$ acts as a centrifugal potential barrier. Regular, physically acceptable solutions (finite and normalized) exist only for specific discrete energy eigenvalues $E_n$ and when $n$ is a positive integer $n=1, 2, 3, \ldots$, with the condition $n > l$. The solutions $R_{n,l}(r)$ involve **associated Laguerre polynomials**. $n$ is the **principal quantum number**.

The allowed energy levels are given by:
$$E_n = -\frac{\mu e^4}{8\epsilon_0^2 h^2 n^2} = -\frac{13.6 \text{ eV}}{n^2}$$
These energies depend solely on the principal quantum number $n$.

The complete, normalized wavefunctions, known as **atomic orbitals**, are given by:
$$\Psi_{n,l,m_l}(r, \theta, \phi) = R_{n,l}(r) Y_{l,m_l}(\theta, \phi)$$
These wavefunctions are uniquely specified by the three quantum numbers $(n, l, m_l)$, with the following allowed ranges:
*   $n = 1, 2, 3, \ldots$
*   $l = 0, 1, 2, \ldots, n-1$
*   $m_l = -l, -l+1, \ldots, 0, \ldots, l-1, l$

This rigorous solution provides the foundation for understanding atomic structure, spectroscopy, and chemical bonding.

**(References: Griffiths, *Introduction to Quantum Mechanics*, 3rd ed., Chapter 4; Liboff, *Introductory Quantum Mechanics*, 4th ed., Chapter 8; Shankar, *Principles of Quantum Mechanics*, 2nd ed., Chapter 13.)**

## 8. ASCII diagrams

```text
       Z-axis (Lz direction)
       ^
       |
       |
       |  . Electron (e-) at (r, theta, phi)
       | /
       |/ theta (polar angle from Z-axis)
       O------- r ---------> Y-axis
      /| \
     / |  \ phi (azimuthal angle from X-axis in XY-plane)
    /  |   \
   X-axis (in XY-plane)
   
   Figure 1: Spherical Coordinates for the Hydrogen Atom.
             The proton (p+) is at the origin O.
```

```text
       Z
       |
       |
       *----*----*  (r = 0, a_0, 2a_0, ...)
       |    |    |
       |    |    |
       Y----*----X
            |
            |
            Z
   
   Figure 2: 1s Orbital (l=0, m_l=0).
             Spherically symmetric electron cloud.
             Highest probability density at r=0.
             (Imagine a fuzzy sphere, densest at the center).
```

```text
       Z
       |  /
       | /
       |/
       *-----*-----*
      /|     |     |\
     / |     |     | \
    /  |     |     |  \
   Y---*-----*-----*---X
    \  |     |     |  /
     \ |     |     | /
      \|     |     |/
       *-----*-----*
       | \   |   / |
       |  \  |  /  |
       |   \ | /   |
       Z    \|/    Z
   
   Figure 3: 2pz Orbital (l=1, m_l=0).
             Dumbbell-shaped electron cloud along the Z-axis.
             A nodal plane (zero probability) exists in the XY-plane.
             (Imagine two lobes, one above and one below the XY plane).
```

## 9. Memory technique — never forget this

1.  **Mnemonic/Visual Hook:**
    *   **"Naughty Little Monkeys"** helps remember the order and relationship of the three main quantum numbers: **N** (principal, $n$), **L** (orbital angular momentum, $l$), **M** (magnetic, $m_l$).
    *   **Visualize a "Quantum Onion":** The hydrogen atom's energy levels are like layers of an onion ($n$). Within each layer, there are different "shapes" ($l$, like spherical, dumbbell, cloverleaf). And each shape can be oriented in different ways in space ($m_l$). The proton is the tiny seed at the center.

2.  **Formulas/Facts to Overlearn:**
    *   **Time-Independent Schrödinger Equation (in general form):** $H\Psi = E\Psi$ (or $-\frac{\hbar^2}{2\mu}\nabla^2\Psi + V\Psi = E\Psi$). This is the starting point for *any* quantum problem.
    *   **Hydrogen Atom Energy Levels:** $E_n = -\frac{13.6 \text{ eV}}{n^2}$. This is the most crucial output of solving the hydrogen atom.
    *   **Relationships between Quantum Numbers:**
        *   $n = 1, 2, 3, \ldots$
        *   $l = 0, 1, \ldots, n-1$
        *   $m_l = -l, \ldots, 0, \ldots, l$
        These rules dictate the structure of all atoms.

3.  **Spaced-Repetition Schedule:**
    *   **Today (Day 0):** Initial learning and practice.
    *   **Day 1:** Review the core idea, definitions, and the $n,l,m_l$ relationships.
    *   **Day 3:** Rework one example, review the physical meaning of each quantum number.
    *   **Day 7:** Sketch the derivation pathway, recall the energy formula, and list common mistakes.
    *   **Day 16:** Attempt to re-derive the qualitative steps of separation of variables and the origin of quantization.
    *   **Day 35:** Summarize the entire topic from memory, including applications and connections.

4.  **First-Principles Re-derivation Pathway:**
    If you forget a specific formula or detail, you can always rebuild your understanding by following these steps:
    1.  **Start with the general Time-Independent Schrödinger Equation:** $H\Psi = E\Psi$.
    2.  **Define the Hamiltonian for Hydrogen:** Kinetic energy operator (Laplacian) + Coulomb potential.
    3.  **Recognize Spherical Symmetry:** The potential $V(r)$ only depends on $r$, so spherical coordinates are natural. Write down the Laplacian in spherical coordinates.
    4.  **Apply Separation of Variables:** Assume $\Psi(r, \theta, \phi) = R(r)\Theta(\theta)\Phi(\phi)$. Substitute and rearrange to separate into three ODEs.
    5.  **Solve the Azimuthal Equation:** $\frac{d^2\Phi}{d\phi^2} = -m_l^2\Phi$. Impose the single-valuedness condition $\Phi(\phi) = \Phi(\phi+2\pi)$ to show that $m_l$ must be an integer.
    6.  **Solve the Polar Equation:** Identify it as the associated Legendre equation. Recall that physical solutions require $l$ to be an integer and $|m_l| \le l$.
    7.  **Solve the Radial Equation:** Recognize its form and the effective potential term. Recall that physical solutions require $n$ to be an integer and $n > l$, and these lead to quantized energy levels $E_n$.
    8.  **Assemble the Quantum Numbers and Wavefunctions:** Combine $R_{n,l}(r)$ and $Y_{l,m_l}(\theta, \phi)$ to form $\Psi_{n,l,m_l}$.

## 10. Connections — what this leads to

Solving the hydrogen atom in spherical coordinates is not just an exercise; it's the gateway to understanding a vast array of physical and chemical phenomena:

*   **Multi-electron Atoms:** While direct analytical solutions are impossible, the hydrogen atom orbitals form the basis for approximating multi-electron atoms. Techniques like perturbation theory, variational methods (e.g., Hartree-Fock method), and density functional theory build upon the understanding of single-electron orbitals to describe more complex atoms.
*   **Atomic Spectroscopy:** The discrete energy levels $E_n$ explain the line spectra of atoms. Understanding selection rules (which transitions between states are allowed, e.g., $\Delta l = \pm 1$) is crucial for interpreting spectra and designing lasers.
*   **Fine Structure and Hyperfine Structure:** The basic hydrogen solution predicts energy levels based only on $n$. More advanced treatments (relativistic effects, spin-orbit coupling) introduce small corrections that split these levels further, leading to fine structure. Interactions with the nuclear magnetic moment lead to hyperfine structure.
*   **Zeeman Effect:** The degeneracy of $m_l$ states is lifted when an external magnetic field is applied, causing spectral lines to split. This phenomenon, explained by the interaction of the electron's orbital angular momentum with the magnetic field, directly validates the quantization of $m_l$.
*   **Chemical Bonding:** The shapes and energies of atomic orbitals (s, p, d, f) are fundamental to understanding how atoms combine to form molecules. Concepts like hybridization (e.g., $sp^3$ orbitals in methane) and molecular orbital theory are direct extensions of atomic orbital theory.
*   **Lasers and Masers:** The principle of stimulated emission, which underpins laser operation, relies on electrons transitioning between specific, well-defined energy levels, precisely those predicted by solving the Schrödinger equation for atoms.
*   **Solid-State Physics:** The behavior of electrons in crystalline solids (leading to conductors, semiconductors, and insulators) is understood by considering how atomic orbitals combine to form energy bands.
*   **Quantum Field Theory:** Even in advanced theories like Quantum Electrodynamics (QED), the hydrogen atom solution serves as a crucial "bound state" solution, where the electron and proton are treated as interacting fields.

## 11. Self-check questions

1.  Explain why spherical coordinates are the most appropriate coordinate system for solving the hydrogen atom problem, despite Cartesian coordinates being generally applicable.
2.  What physical requirement leads to the quantization of the magnetic quantum number $m_l$? How does this requirement mathematically constrain $m_l$?
3.  For $n=3$, list all possible combinations of $l$ and $m_l$ quantum numbers. How many degenerate states are there for $n=3$?
4.  The radial probability density for the 1s state is $P(r) = r^2|R_{1,0}(r)|^2$. Explain why $P(r)$ is zero at $r=0$, even though the volume probability density $|\Psi_{1,0,0}(r, \theta, \phi)|^2$ is maximum at $r=0$.
5.  If we were to solve for a Helium ion (He$^+$), which has one electron and a nucleus with charge $+2e$, how would the energy levels $E_n$ and the Bohr radius $a_0$ be modified compared to the hydrogen atom?