## 1. What it is — in plain English

Imagine you have a super tiny, invisible particle – let's say, an electron – trapped inside a perfectly straight, incredibly small hallway. This hallway has perfectly rigid, impenetrable walls at each end. In our everyday world, if you threw a ball into such a hallway, it could bounce around with any speed and any energy you gave it.

But in the quantum world, things are weird. When a particle is trapped in such a small space, it can't just have *any* energy. It can only exist at very specific, discrete energy levels, like steps on a ladder. It can't be in between the steps.

This "particle in a box" is a simplified model. The "box" represents a region where the particle is completely free to move, but outside this region, it's absolutely forbidden to exist. It's an ideal scenario to help us understand how quantum mechanics works for confined particles.

So, in short, it's a fundamental quantum mechanics problem that shows us how confining a particle to a small space forces its energy to be quantized, meaning it can only take on specific, allowed values.

## 2. Why it matters — real-world applications

The "particle in a box" model, despite its simplicity, is incredibly powerful and forms the foundation for understanding many real-world phenomena and technologies:

1.  **Quantum Dots (Nanotechnology):** These are tiny semiconductor nanocrystals, often just a few nanometers in size. Electrons and "holes" (missing electrons) inside these dots are confined in all three dimensions, much like a 3D particle in a box. The size of the quantum dot dictates the allowed energy levels, which in turn determines the color of light they emit. This principle is used in high-end **QLED TVs** (Samsung, TCL), advanced **solar cells**, and even in **biological imaging** where different sized quantum dots glow with different colors.

2.  **Electronic Band Theory in Semiconductors:** When atoms come together to form a solid, their electron energy levels, which are discrete in individual atoms, broaden into "bands." The particle in a box model helps us understand the fundamental idea of energy gaps and allowed energy states within these bands. This is crucial for designing and understanding **transistors**, **diodes**, and other components that power all modern electronics, from your smartphone (Apple, Qualcomm) to supercomputers.

3.  **Spectroscopy of Conjugated Molecules:** Organic molecules with alternating single and double bonds (like beta-carotene, which gives carrots their orange color) have electrons that are delocalized over a significant length. These electrons can be modeled as particles in a 1D box. The length of the "box" (the conjugated system) determines the energy levels and thus the wavelengths of light the molecule absorbs or emits. This explains why longer conjugated systems absorb longer wavelengths, leading to different colors in dyes and pigments.

4.  **Quantum Wells, Wires, and Dots (Semiconductor Engineering):** These are structures created by layering different semiconductor materials to confine electrons to 2D planes (wells), 1D lines (wires), or 0D points (dots). The particle in a box model is the starting point for designing and analyzing these structures, which are used in **laser diodes** (e.g., in Blu-ray players, fiber optics), **high-electron-mobility transistors (HEMTs)**, and advanced photodetectors.

## 3. Prerequisites — what you must know first

To fully grasp the "Particle in a box" concept, ensure you have a solid understanding of the following:

*   **Classical Mechanics:** Basic concepts of kinetic energy ($K = \frac{1}{2}mv^2$), potential energy ($V(x)$), and the conservation of energy.
*   **Calculus I & II:** Derivatives (especially second derivatives), definite and indefinite integrals, trigonometric identities, and integration techniques (e.g., integration by substitution, integration of $\sin^2 x$).
*   **Differential Equations (Introductory):** How to solve second-order linear homogeneous differential equations with constant coefficients, particularly those of the form $\frac{d^2y}{dx^2} = -k^2y$.
*   **Complex Numbers:** Understanding the imaginary unit $i = \sqrt{-1}$, complex exponentials, and Euler's formula ($e^{ix} = \cos x + i \sin x$).
*   **Basic Quantum Mechanics Concepts (Conceptual):** Wave-particle duality (that particles can behave like waves), the idea of a wavefunction ($\psi$), and the probabilistic interpretation of quantum mechanics ($|\psi|^2$ as probability density).
*   **Fundamental Constants:** Familiarity with Planck's constant ($h$) and reduced Planck's constant ($\hbar = h/2\pi$).

## 4. The core idea — step by step

Let's break down the "Particle in a box" problem, building it up piece by piece.

### Step 1: The Setup - Defining the Box

*   **Plain English:** Imagine a tiny particle, like an electron, that is perfectly free to move back and forth along a straight line, say from $x=0$ to $x=L$. But it's trapped! There are invisible, impenetrable walls at $x=0$ and $x=L$. It cannot ever go beyond these walls. Inside the box, there are no forces acting on it, so its potential energy is zero. At the walls, the potential energy is infinite, meaning it would take an infinite amount of energy for the particle to cross them.

*   **Small Concrete Example:** Think of a tiny, perfectly frictionless ball bearing rolling inside a perfectly smooth, perfectly rigid pipe capped at both ends. The ball can move freely inside, but it can't escape.

*   **Formal/Mathematical Version:** We define the potential energy function $V(x)$ for a 1D box of length $L$:
    $$V(x) = \begin{cases} 0 & 0 \le x \le L \\ \infty & x < 0 \text{ or } x > L \end{cases}$$
    This means the particle experiences no potential energy (is "free") inside the box, and an infinite potential energy outside, effectively confining it.

*   **What Could Go Wrong:** It's crucial not to confuse this "infinite potential well" with a "finite potential well," which you might encounter later. In a finite well, the potential outside the box is large but not infinite, allowing for a small probability of the particle existing outside the box (quantum tunneling). Here, the probability outside is strictly zero.

### Step 2: Schrödinger's Equation - The Master Equation

*   **Plain English:** Just like Newton's laws describe how objects move in the classical world, the Schrödinger equation describes how quantum particles behave. Since the potential energy in our box doesn't change with time, we use the Time-Independent Schrödinger Equation (TISE). This equation will help us find the allowed energy values and the "wavefunctions" (which describe the probability of finding the particle at different locations).

*   **Small Concrete Example:** If you want to know how a spring-mass system moves, you'd use Hooke's Law and Newton's Second Law. For a quantum particle, you use the Schrödinger equation.

*   **Formal/Mathematical Version:** For a 1D system, the Time-Independent Schrödinger Equation is:
    $$-\frac{\hbar^2}{2m}\frac{d^2\psi(x)}{dx^2} + V(x)\psi(x) = E\psi(x)$$
    Where:
    *   $\hbar$ (h-bar) is the reduced Planck constant ($\hbar = h/2\pi$).
    *   $m$ is the mass of the particle.
    *   $\psi(x)$ (psi) is the wavefunction, a complex-valued function of position $x$.
    *   $V(x)$ is the potential energy function (which we defined in Step 1).
    *   $E$ is the energy of the particle.
    *   $\frac{d^2\psi(x)}{dx^2}$ is the second derivative of the wavefunction with respect to $x$.

*   **What Could Go Wrong:** Forgetting the constants like $\hbar^2$ or $2m$, or mixing up the TISE with the Time-Dependent Schrödinger Equation (TDSE), which includes a time derivative and describes how the wavefunction evolves over time. For the particle in a box, we are looking for stationary states, so TISE is appropriate.

### Step 3: Solving Inside the Box

*   **Plain English:** Inside our box (between $x=0$ and $x=L$), the particle is free, meaning its potential energy $V(x)$ is zero. This simplifies the Schrödinger equation significantly, turning it into a type of differential equation that we know how to solve.

*   **Small Concrete Example:** If you're solving an equation like $2x + 0 = 10$, removing the "0" term makes it $2x = 10$, which is much easier. Similarly, setting $V(x)=0$ simplifies the TISE.

*   **Formal/Mathematical Version:**
    For $0 \le x \le L$, $V(x) = 0$. So the TISE becomes:
    $$-\frac{\hbar^2}{2m}\frac{d^2\psi(x)}{dx^2} + (0)\psi(x) = E\psi(x)$$
    $$-\frac{\hbar^2}{2m}\frac{d^2\psi(x)}{dx^2} = E\psi(x)$$
    Rearranging this to a standard form for a second-order differential equation:
    $$\frac{d^2\psi(x)}{dx^2} = -\frac{2mE}{\hbar^2}\psi(x)$$
    Let's define a constant $k^2 = \frac{2mE}{\hbar^2}$. Since $E$ must be positive (a particle cannot have negative kinetic energy if $V=0$), $k^2$ is positive, and $k$ is a real number.
    $$\frac{d^2\psi(x)}{dx^2} = -k^2\psi(x)$$
    This is a well-known differential equation whose general solution is a linear combination of sine and cosine functions:
    $$\psi(x) = A \sin(kx) + B \cos(kx)$$
    Where $A$ and $B$ are arbitrary constants determined by boundary conditions.

*   **What Could Go Wrong:** Incorrectly solving the differential equation. For example, if $k^2$ were negative, the solutions would be exponential ($e^{kx}$ and $e^{-kx}$), but here $E$ must be positive, so $k^2$ is positive. Also, don't forget the general form includes both sine and cosine terms initially.

### Step 4: Boundary Conditions - The Walls' Rules

*   **Plain English:** Since the walls of the box are impenetrable (infinite potential), the particle has absolutely zero probability of being found *in* or *beyond* the walls. This means the wavefunction, $\psi(x)$, must be zero at the edges of the box, i.e., at $x=0$ and $x=L$. These are called "boundary conditions" and they are crucial for finding the specific solutions.

*   **Small Concrete Example:** Imagine a vibrating guitar string. It's fixed at both ends, so its displacement (analogous to the wavefunction) must be zero at those fixed points.

*   **Formal/Mathematical Version:**
    We apply the boundary conditions to our general solution $\psi(x) = A \sin(kx) + B \cos(kx)$:
    1.  At $x=0$: $\psi(0) = 0$
        $$A \sin(k \cdot 0) + B \cos(k \cdot 0) = 0$$
        $$A \cdot 0 + B \cdot 1 = 0$$
        $$B = 0$$
        This immediately simplifies our wavefunction to $\psi(x) = A \sin(kx)$.

    2.  At $x=L$: $\psi(L) = 0$
        $$A \sin(kL) = 0$$
        Since $A$ cannot be zero (if $A=0$, then $\psi(x)=0$ everywhere, meaning there's no particle in the box, which is trivial), the $\sin(kL)$ term must be zero.
        For $\sin(kL)$ to be zero, its argument $kL$ must be an integer multiple of $\pi$:
        $$kL = n\pi$$
        Where $n$ is an integer.
        $$n = 1, 2, 3, \ldots$$
        Note: $n$ cannot be $0$, because if $n=0$, then $k=0$, which implies $E=0$ (from $k^2 = \frac{2mE}{\hbar^2}$). If $E=0$, then $\psi(x)=A \sin(0) = 0$, again meaning no particle. Negative integers for $n$ ($n=-1, -2, \ldots$) would just give wavefunctions identical to positive $n$ (e.g., $\sin(-x) = -\sin(x)$, which is physically the same state, just multiplied by $-1$). So we only consider positive integers.

*   **What Could Go Wrong:** Forgetting to apply *both* boundary conditions, or incorrectly concluding that $A=0$. Also, it's a common mistake to include $n=0$, which leads to a non-physical solution.

### Step 5: Quantization of Energy - Discrete Levels

*   **Plain English:** The boundary conditions from Step 4 are incredibly important. They forced $kL$ to be specific values ($n\pi$). Since $k$ is directly related to the particle's energy $E$, this means the energy itself can only take on specific, discrete values. This is the hallmark of quantum mechanics for confined particles – energy is "quantized."

*   **Small Concrete Example:** Think of a staircase. You can stand on the first step, the second step, but you can't float halfway between steps. Quantum energy levels are like those steps.

*   **Formal/Mathematical Version:**
    From Step 4, we have $k = \frac{n\pi}{L}$ for $n = 1, 2, 3, \ldots$.
    From Step 3, we defined $k^2 = \frac{2mE}{\hbar^2}$.
    Now, we can substitute the expression for $k$ into the energy equation:
    $$E = \frac{\hbar^2 k^2}{2m}$$
    $$E_n = \frac{\hbar^2 \left(\frac{n\pi}{L}\right)^2}{2m}$$
    $$E_n = \frac{n^2\pi^2\hbar^2}{2mL^2}$$
    This is the formula for the allowed energy levels of a particle in a 1D box. Each integer $n$ corresponds to a specific energy level $E_n$.
    *   $n=1$ gives the **ground state energy** ($E_1$), the lowest possible energy the particle can have.
    *   $n=2$ gives the **first excited state energy** ($E_2$), and so on.

*   **What Could Go Wrong:** Not squaring $n$ or $L$ in the final formula, or forgetting the constants $\pi^2\hbar^2/(2m)$. Also, using $n=0$ would result in $E_0=0$, which is not allowed for a particle in a box (it would mean the particle doesn't exist).

### Step 6: Wavefunctions - The Particle's "Shape"

*   **Plain English:** For each allowed energy level $E_n$, there's a corresponding wavefunction, $\psi_n(x)$. This wavefunction doesn't tell us the exact position of the particle, but rather its "probability amplitude." The square of the absolute value of the wavefunction, $|\psi_n(x)|^2$, gives us the probability density of finding the particle at a particular location $x$.

*   **Small Concrete Example:** If you shake a jump rope, it forms specific patterns (modes of vibration). These patterns are analogous to the wavefunctions, and the likelihood of finding a segment of the rope at a certain height is like the probability density.

*   **Formal/Mathematical Version:**
    We found in Step 4 that $\psi(x) = A \sin(kx)$ and $k = \frac{n\pi}{L}$.
    Substituting $k$:
    $$\psi_n(x) = A \sin\left(\frac{n\pi x}{L}\right)$$
    Here, $A$ is still an unknown constant. We need one more step to find it.

*   **What Could Go Wrong:** Confusing the wavefunction $\psi(x)$ with the probability density $|\psi(x)|^2$. Remember, $\psi(x)$ can be complex or negative, but probability density must always be real and non-negative.

### Step 7: Normalization - Making Probabilities Make Sense

*   **Plain English:** The particle *must* be somewhere inside the box. Therefore, if we sum up all the probabilities of finding the particle at every possible location within the box, the total must equal 1 (or 100%). This process of finding the constant $A$ that makes the total probability 1 is called "normalization."

*   **Small Concrete Example:** If you have a bag of marbles, the probability of picking *a* marble (any marble) is 1. If you list all possible marbles and their individual probabilities, they must add up to 1.

*   **Formal/Mathematical Version:**
    The probability density is $|\psi_n(x)|^2$. For a particle in a 1D box, the normalization condition is:
    $$\int_0^L |\psi_n(x)|^2 dx = 1$$
    Substituting $\psi_n(x) = A \sin\left(\frac{n\pi x}{L}\right)$:
    $$\int_0^L A^2 \sin^2\left(\frac{n\pi x}{L}\right) dx = 1$$
    $$A^2 \int_0^L \sin^2\left(\frac{n\pi x}{L}\right) dx = 1$$
    To solve this integral, we use the trigonometric identity $\sin^2\theta = \frac{1 - \cos(2\theta)}{2}$.
    Let $\theta = \frac{n\pi x}{L}$. Then $2\theta = \frac{2n\pi x}{L}$.
    $$A^2 \int_0^L \frac{1 - \cos\left(\frac{2n\pi x}{L}\right)}{2} dx = 1$$
    $$A^2 \left[ \frac{1}{2}x - \frac{L}{4n\pi}\sin\left(\frac{2n\pi x}{L}\right) \right]_0^L = 1$$
    Evaluating the integral at the limits:
    $$A^2 \left[ \left(\frac{1}{2}L - \frac{L}{4n\pi}\sin\left(\frac{2n\pi L}{L}\right)\right) - \left(0 - \frac{L}{4n\pi}\sin(0)\right) \right] = 1$$
    Since $\sin(2n\pi) = 0$ for any integer $n$, and $\sin(0)=0$:
    $$A^2 \left[ \frac{L}{2} - 0 - 0 \right] = 1$$
    $$A^2 \frac{L}{2} = 1$$
    $$A^2 = \frac{2}{L}$$
    $$A = \sqrt{\frac{2}{L}}$$
    (We choose the positive root for $A$ by convention).

    So, the complete, normalized wavefunctions for a particle in a 1D box are:
    $$\psi_n(x) = \sqrt{\frac{2}{L}} \sin\left(\frac{n\pi x}{L}\right)$$
    for $n = 1, 2, 3, \ldots$.

*   **What Could Go Wrong:** Forgetting the normalization step entirely, or making an error in the integration of $\sin^2 x$. This step is crucial because without it, the wavefunction doesn't have a direct probabilistic interpretation.

## 5. Worked examples — multiple, with every step shown

We will use the following constants where needed:
*   Reduced Planck constant: $\hbar = 1.054 \times 10^{-34} \text{ J}\cdot\text{s}$
*   Electron mass: $m_e = 9.109 \times 10^{-31} \text{ kg}$
*   Elementary charge: $e = 1.602 \times 10^{-19} \text{ C}$
*   Conversion: $1 \text{ eV} = 1.602 \times 10^{-19} \text{ J}$
*   Conversion: $1 \text{ nm} = 10^{-9} \text{ m}$

### Example 1 (Easy): Ground State Energy and Wavefunction

**Problem:** An electron is confined to a one-dimensional box of length $L = 0.5 \text{ nm}$. Calculate the ground state energy and write down the normalized ground state wavefunction.

**Given:**
*   Particle: Electron ($m = m_e = 9.109 \times 10^{-31} \text{ kg}$)
*   Box length: $L = 0.5 \text{ nm} = 0.5 \times 10^{-9} \text{ m}$
*   State: Ground state ($n=1$)

**Want:**
*   Ground state energy ($E_1$)
*   Normalized ground state wavefunction ($\psi_1(x)$)

**Solution:**

1.  **Recall the formula for energy levels:**
    $$E_n = \frac{n^2\pi^2\hbar^2}{2mL^2}$$
    *This formula was derived in Step 5 and gives the allowed energy values.*

2.  **Substitute values for the ground state ($n=1$):**
    $$E_1 = \frac{(1)^2 \cdot \pi^2 \cdot (1.054 \times 10^{-34} \text{ J}\cdot\text{s})^2}{2 \cdot (9.109 \times 10^{-31} \text{ kg}) \cdot (0.5 \times 10^{-9} \text{ m})^2}$$
    *We plug in $n=1$ for the ground state and the given values for $\hbar$, $m_e$, and $L$.*

3.  **Calculate the numerical value:**
    $$E_1 = \frac{1 \cdot (9.8696) \cdot (1.1109 \times 10^{-68} \text{ J}^2\text{s}^2)}{2 \cdot (9.109 \times 10^{-31} \text{ kg}) \cdot (0.25 \times 10^{-18} \text{ m}^2)}$$
    $$E_1 = \frac{1.0967 \times 10^{-67}}{4.5545 \times 10^{-49}} \text{ J}$$
    $$E_1 = 2.406 \times 10^{-19} \text{ J}$$
    *Perform the multiplication and division carefully, paying attention to exponents.*

4.  **Convert energy to electronvolts (eV) for convenience:**
    $$E_1 = 2.406 \times 10^{-19} \text{ J} \cdot \frac{1 \text{ eV}}{1.602 \times 10^{-19} \text{ J}}$$
    $$E_1 = 1.502 \text{ eV}$$
    *Electronvolts are a common unit for energies at the atomic scale.*

5.  **Recall the formula for normalized wavefunctions:**
    $$\psi_n(x) = \sqrt{\frac{2}{L}} \sin\left(\frac{n\pi x}{L}\right)$$
    *This formula was derived in Step 7 and describes the probability amplitude.*

6.  **Substitute values for the ground state ($n=1$):**
    $$\psi_1(x) = \sqrt{\frac{2}{0.5 \times 10^{-9} \text{ m}}} \sin\left(\frac{1\pi x}{0.5 \times 10^{-9} \text{ m}}\right)$$
    *Plug in $n=1$ and the given $L$.*

7.  **Simplify the expression:**
    $$\psi_1(x) = \sqrt{4 \times 10^9 \text{ m}^{-1}} \sin\left(\frac{\pi x}{0.5 \times 10^{-9} \text{ m}}\right)$$
    $$\psi_1(x) = (6.32 \times 10^4 \text{ m}^{-1/2}) \sin\left((2\pi \times 10^9 \text{ m}^{-1}) x\right)$$
    *Calculate the square root and simplify the argument of the sine function.*

**Final Answer:**
The ground state energy is $\boxed{E_1 = 2.406 \times 10^{-19} \text{ J} \text{ (or } 1.502 \text{ eV})}$.
The normalized ground state wavefunction is $\boxed{\psi_1(x) = \sqrt{\frac{2}{0.5 \times 10^{-9} \text{ m}}} \sin\left(\frac{\pi x}{0.5 \times 10^{-9} \text{ m}}\right)}$.

**Reflection:** This example was straightforward, primarily involving direct application of the derived formulas. The main trick is careful calculation with scientific notation and unit conversion. The energy value (1.5 eV) is typical for electronic transitions in semiconductors, highlighting the relevance of this simple model.

### Example 2 (Medium): Probability Calculation

**Problem:** A particle in a 1D box of length $L$ is in the $n=3$ state. Calculate the probability of finding the particle between $x=0$ and $x=L/3$.

**Given:**
*   State: $n=3$
*   Box length: $L$
*   Region of interest: $0 \le x \le L/3$

**Want:**
*   Probability $P(0 \le x \le L/3)$

**Solution:**

1.  **Recall the normalized wavefunction for state $n$:**
    $$\psi_n(x) = \sqrt{\frac{2}{L}} \sin\left(\frac{n\pi x}{L}\right)$$
    *This is the result from Step 7.*

2.  **Write down the wavefunction for $n=3$:**
    $$\psi_3(x) = \sqrt{\frac{2}{L}} \sin\left(\frac{3\pi x}{L}\right)$$
    *Substitute $n=3$ into the general formula.*

3.  **Recall the formula for probability:**
    The probability of finding the particle in a region from $a$ to $b$ is given by the integral of the probability density over that region:
    $$P(a \le x \le b) = \int_a^b |\psi(x)|^2 dx$$
    *The probability density $|\psi(x)|^2$ tells us the likelihood of finding the particle at a specific point.*

4.  **Set up the integral for the given region:**
    $$P(0 \le x \le L/3) = \int_0^{L/3} \left|\sqrt{\frac{2}{L}} \sin\left(\frac{3\pi x}{L}\right)\right|^2 dx$$
    $$P = \int_0^{L/3} \frac{2}{L} \sin^2\left(\frac{3\pi x}{L}\right) dx$$
    *Square the wavefunction to get the probability density. The constant $2/L$ comes out of the integral.*

5.  **Use the trigonometric identity $\sin^2\theta = \frac{1 - \cos(2\theta)}{2}$:**
    Let $\theta = \frac{3\pi x}{L}$. Then $2\theta = \frac{6\pi x}{L}$.
    $$P = \frac{2}{L} \int_0^{L/3} \frac{1 - \cos\left(\frac{6\pi x}{L}\right)}{2} dx$$
    $$P = \frac{1}{L} \int_0^{L/3} \left(1 - \cos\left(\frac{6\pi x}{L}\right)\right) dx$$
    *This identity simplifies the integral, making it solvable.*

6.  **Perform the integration:**
    $$P = \frac{1}{L} \left[ x - \frac{L}{6\pi}\sin\left(\frac{6\pi x}{L}\right) \right]_0^{L/3}$$
    *Integrate term by term. The integral of $1$ is $x$. The integral of $\cos(ax)$ is $\frac{1}{a}\sin(ax)$. Here $a = \frac{6\pi}{L}$.*

7.  **Evaluate the definite integral at the limits:**
    $$P = \frac{1}{L} \left[ \left(\frac{L}{3} - \frac{L}{6\pi}\sin\left(\frac{6\pi (L/3)}{L}\right)\right) - \left(0 - \frac{L}{6\pi}\sin(0)\right) \right]$$
    $$P = \frac{1}{L} \left[ \frac{L}{3} - \frac{L}{6\pi}\sin(2\pi) - 0 + 0 \right]$$
    *Substitute the upper limit ($L/3$) and lower limit ($0$). Remember $\sin(2\pi)=0$ and $\sin(0)=0$.*

8.  **Simplify to find the probability:**
    $$P = \frac{1}{L} \left[ \frac{L}{3} - 0 \right]$$
    $$P = \frac{1}{L} \cdot \frac{L}{3}$$
    $$P = \frac{1}{3}$$
    *The $L$ terms cancel out, leaving a simple fraction.*

**Final Answer:**
The probability of finding the particle between $x=0$ and $x=L/3$ in the $n=3$ state is $\boxed{1/3}$.

**Reflection:** This example required applying the normalization condition and performing a definite integral. The key was correctly using the trigonometric identity for $\sin^2\theta$ and carefully evaluating the limits. The result of $1/3$ is intuitive because the $n=3$ wavefunction has three "lobes" or regions of high probability, and $L/3$ covers one of these regions.

### Example 3 (Harder): Energy Difference and Wavelength of Emitted Photon

**Problem:** An electron is confined to a 1D potential well of length $L = 0.2 \text{ nm}$.
a) Calculate the energy of the first two allowed energy levels ($E_1$ and $E_2$).
b) Calculate the wavelength of a photon emitted if the electron transitions from the $n=2$ state to the $n=1$ state.

**Given:**
*   Particle: Electron ($m = m_e = 9.109 \times 10^{-31} \text{ kg}$)
*   Box length: $L = 0.2 \text{ nm} = 0.2 \times 10^{-9} \text{ m}$
*   Transition: $n=2$ to $n=1$

**Want:**
*   $E_1$ and $E_2$
*   Wavelength ($\lambda$) of emitted photon

**Solution:**

**Part a) Calculate $E_1$ and $E_2$:**

1.  **Recall the formula for energy levels:**
    $$E_n = \frac{n^2\pi^2\hbar^2}{2mL^2}$$
    *This is our fundamental energy quantization formula.*

2.  **Calculate $E_1$ (ground state, $n=1$):**
    $$E_1 = \frac{(1)^2 \cdot \pi^2 \cdot (1.054 \times 10^{-34} \text{ J}\cdot\text{s})^2}{2 \cdot (9.109 \times 10^{-31} \text{ kg}) \cdot (0.2 \times 10^{-9} \text{ m})^2}$$
    $$E_1 = \frac{1 \cdot (9.8696) \cdot (1.1109 \times 10^{-68} \text{ J}^2\text{s}^2)}{2 \cdot (9.109 \times 10^{-31} \text{ kg}) \cdot (0.04 \times 10^{-18} \text{ m}^2)}$$
    $$E_1 = \frac{1.0967 \times 10^{-67}}{7.2872 \times 10^{-50}} \text{ J}$$
    $$E_1 = 1.505 \times 10^{-18} \text{ J}$$
    *Substitute $n=1$ and calculate carefully.*

3.  **Convert $E_1$ to eV:**
    $$E_1 = 1.505 \times 10^{-18} \text{ J} \cdot \frac{1 \text{ eV}}{1.602 \times 10^{-19} \text{ J}}$$
    $$E_1 = 9.39 \text{ eV}$$
    *Standard practice for atomic energies.*

4.  **Calculate $E_2$ (first excited state, $n=2$):**
    We can use the fact that $E_n = n^2 E_1$.
    $$E_2 = (2)^2 E_1 = 4 E_1$$
    $$E_2 = 4 \cdot (1.505 \times 10^{-18} \text{ J})$$
    $$E_2 = 6.020 \times 10^{-18} \text{ J}$$
    *This shortcut saves calculation time and reduces error propagation.*

5.  **Convert $E_2$ to eV:**
    $$E_2 = 4 \cdot (9.39 \text{ eV})$$
    $$E_2 = 37.56 \text{ eV}$$
    *Again, converting to eV for clarity.*

**Part b) Calculate the wavelength of the emitted photon:**

1.  **Determine the energy difference for the transition:**
    When an electron transitions from a higher energy state ($E_2$) to a lower energy state ($E_1$), it emits a photon with energy equal to the energy difference between the states.
    $$\Delta E = E_2 - E_1$$
    $$\Delta E = (6.020 \times 10^{-18} \text{ J}) - (1.505 \times 10^{-18} \text{ J})$$
    $$\Delta E = 4.515 \times 10^{-18} \text{ J}$$
    *The energy of the emitted photon is exactly the difference between the energy levels.*

2.  **Recall the relationship between photon energy and wavelength:**
    The energy of a photon ($E_{photon}$) is given by $E_{photon} = hf = \frac{hc}{\lambda}$, where $h$ is Planck's constant, $c$ is the speed of light, and $\lambda$ is the wavelength.
    Since $\hbar = h/(2\pi)$, then $h = 2\pi\hbar$.
    $$E_{photon} = \frac{2\pi\hbar c}{\lambda}$$
    *This is a fundamental relationship in quantum mechanics and optics.*

3.  **Solve for $\lambda$:**
    $$\lambda = \frac{2\pi\hbar c}{\Delta E}$$
    *Rearranging the photon energy formula to find wavelength.*
    Using $c = 3.00 \times 10^8 \text{ m/s}$ and $\hbar = 1.054 \times 10^{-34} \text{ J}\cdot\text{s}$:
    $$\lambda = \frac{2\pi \cdot (1.054 \times 10^{-34} \text{ J}\cdot\text{s}) \cdot (3.00 \times 10^8 \text{ m/s})}{4.515 \times 10^{-18} \text{ J}}$$
    $$\lambda = \frac{1.986 \times 10^{-25} \text{ J}\cdot\text{m}}{4.515 \times 10^{-18} \text{ J}}$$
    $$\lambda = 4.398 \times 10^{-8} \text{ m}$$
    *Plug in the values and calculate. Note that Joules cancel out, leaving meters.*

4.  **Convert $\lambda$ to nanometers (nm):**
    $$\lambda = 4.398 \times 10^{-8} \text{ m} \cdot \frac{1 \text{ nm}}{10^{-9} \text{ m}}$$
    $$\lambda = 43.98 \text{ nm}$$
    *Nanometers are a more convenient unit for wavelengths in the UV/visible range.*

**Final Answer:**
a) The energy of the first two allowed energy levels are $\boxed{E_1 = 1.505 \times 10^{-18} \text{ J} \text{ (or } 9.39 \text{ eV})}$ and $\boxed{E_2 = 6.020 \times 10^{-18} \text{ J} \text{ (or } 37.56 \text{ eV})}$.
b) The wavelength of the emitted photon is $\boxed{\lambda = 43.98 \text{ nm}}$.

**Reflection:** This example combined calculating energy levels with understanding photon emission. The "harder" aspect came from the multi-part nature and the need to recall the photon energy-wavelength relationship. Recognizing that $E_n = n^2 E_1$ is a useful shortcut. The resulting wavelength (43.98 nm) is in the ultraviolet range, which is typical for electronic transitions in small quantum systems.

### Example 4 (Application-oriented): Effect of Box Length on Energy

**Problem:** A proton is confined in a 1D box. If the length of the box is $L_A$, its ground state energy is $E_A$. If the length of the box is increased to $L_B = 2L_A$, what is the new ground state energy $E_B$ in terms of $E_A$?

**Given:**
*   Particle: Proton (mass $m_p$)
*   Initial box length: $L_A$
*   Initial ground state energy: $E_A$
*   New box length: $L_B = 2L_A$
*   State: Ground state ($n=1$)

**Want:**
*   New ground state energy ($E_B$) in terms of $E_A$.

**Solution:**

1.  **Recall the formula for energy levels:**
    $$E_n = \frac{n^2\pi^2\hbar^2}{2mL^2}$$
    *This is our starting point for energy calculations.*

2.  **Write the expression for the initial ground state energy $E_A$ ($n=1$):**
    $$E_A = \frac{(1)^2\pi^2\hbar^2}{2m_p L_A^2}$$
    $$E_A = \frac{\pi^2\hbar^2}{2m_p L_A^2}$$
    *Substitute $n=1$ and $L=L_A$.*

3.  **Write the expression for the new ground state energy $E_B$ ($n=1$):**
    The new box length is $L_B = 2L_A$.
    $$E_B = \frac{(1)^2\pi^2\hbar^2}{2m_p L_B^2}$$
    $$E_B = \frac{\pi^2\hbar^2}{2m_p (2L_A)^2}$$
    *Substitute $n=1$ and $L=L_B = 2L_A$.*

4.  **Simplify the expression for $E_B$:**
    $$E_B = \frac{\pi^2\hbar^2}{2m_p (4L_A^2)}$$
    $$E_B = \frac{1}{4} \left(\frac{\pi^2\hbar^2}{2m_p L_A^2}\right)$$
    *Carefully square the term $(2L_A)$ to get $4L_A^2$. Then factor out the constant $1/4$.*

5.  **Substitute $E_A$ into the expression for $E_B$:**
    We recognize that the term in the parenthesis is exactly $E_A$ from step 2.
    $$E_B = \frac{1}{4} E_A$$
    *This shows the direct relationship between the new and old energies.*

**Final Answer:**
The new ground state energy is $\boxed{E_B = \frac{1}{4} E_A}$.

**Reflection:** This example demonstrates the inverse square relationship between energy and box length ($E_n \propto 1/L^2$). Doubling the box length reduces the energy by a factor of four. This is an important conceptual understanding: greater confinement leads to higher energy, and less confinement leads to lower energy. This principle is fundamental in understanding quantum wells and quantum dots, where changing the size directly tunes the electronic properties.

## 6. Common mistakes and traps

1.  **Forgetting Boundary Conditions:** A frequent error is to neglect applying $\psi(0)=0$ and $\psi(L)=0$. Without these, you cannot determine the constants $A$ and $B$ in the general solution, nor can you derive the quantization of energy. This is the cornerstone of the solution.
2.  **Incorrectly Solving the Differential Equation:** Some students might assume exponential solutions ($e^{kx}, e^{-kx}$) instead of sinusoidal ones ($\sin(kx), \cos(kx)$) if they forget that $E$ (and thus $k^2$) must be positive inside the box.
3.  **Including $n=0$ in Energy Levels:** If $n=0$, then $E_0=0$. This implies a particle with zero energy and zero wavefunction ($\psi_0(x)=0$), meaning there is no particle in the box. $n$ must always be a positive integer ($1, 2, 3, \ldots$).
4.  **Normalization Errors:** Incorrectly performing the integral $\int \sin^2 x \, dx$ or forgetting to square the wavefunction before integrating ($|\psi(x)|^2$). The normalization constant $\sqrt{2/L}$ is essential for the probabilistic interpretation.
5.  **Units and Constants Confusion:** Mixing up Planck's constant $h$ with reduced Planck's constant $\hbar$, or using incorrect values for fundamental constants like electron mass ($m_e$) or the speed of light ($c$). Pay close attention to units (Joules vs. eV) and powers of ten in scientific notation.
6.  **Confusing Wavefunction with Probability Density:** $\psi(x)$ is the wavefunction, which can be negative or even complex. $|\psi(x)|^2$ is the probability *density*, which must always be real and non-negative. It's easy to forget to square the wavefunction when calculating probabilities.

## 7. Textbook-precise explanation

The one-dimensional infinite potential well, commonly known as the "particle in a box," is a foundational model in quantum mechanics used to illustrate the quantization of energy for a confined particle.

Consider a particle of mass $m$ constrained to move along the x-axis within a region $0 \le x \le L$. The potential energy $V(x)$ is defined as:
$$V(x) = \begin{cases} 0 & 0 \le x \le L \\ \infty & x < 0 \text{ or } x > L \end{cases}$$
The behavior of the particle is governed by the time-independent Schrödinger equation (TISE):
$$-\frac{\hbar^2}{2m}\frac{d^2\psi(x)}{dx^2} + V(x)\psi(x) = E\psi(x)$$
where $\hbar$ is the reduced Planck constant, $\psi(x)$ is the wavefunction, and $E$ is the total energy of the particle.

**Region I ($x < 0$) and Region III ($x > L$):**
In these regions, $V(x) = \infty$. For the Schrödinger equation to hold and for the product $V(x)\psi(x)$ to remain finite, the wavefunction $\psi(x)$ must be identically zero:
$$\psi(x) = 0 \quad \text{for } x < 0 \text{ and } x > L$$
This implies that the particle has zero probability of being found outside the box.

**Region II ($0 \le x \le L$):**
In this region, $V(x) = 0$. The TISE simplifies to:
$$-\frac{\hbar^2}{2m}\frac{d^2\psi(x)}{dx^2} = E\psi(x)$$
Rearranging, we get a second-order linear homogeneous differential equation:
$$\frac{d^2\psi(x)}{dx^2} + \frac{2mE}{\hbar^2}\psi(x) = 0$$
Let $k^2 = \frac{2mE}{\hbar^2}$. Since $E$ must be positive (as $V=0$ inside the box, the total energy is purely kinetic, $E=K > 0$), $k$ is a real, positive constant. The equation becomes:
$$\frac{d^2\psi(x)}{dx^2} + k^2\psi(x) = 0$$
The general solution to this differential equation is:
$$\psi(x) = A \sin(kx) + B \cos(kx)$$
where $A$ and $B$ are arbitrary constants.

**Boundary Conditions:**
For the wavefunction to be continuous (a physical requirement for well-behaved wavefunctions), it must satisfy the boundary conditions at the edges of the box:
1.  $\psi(0) = 0$:
    $$A \sin(0) + B \cos(0) = 0 \implies B \cdot 1 = 0 \implies B = 0$$
    Thus, the wavefunction simplifies to $\psi(x) = A \sin(kx)$.
2.  $\psi(L) = 0$:
    $$A \sin(kL) = 0$$
    Since $A \ne 0$ (otherwise $\psi(x)$ would be zero everywhere, implying no particle), we must have $\sin(kL) = 0$. This condition is satisfied when $kL$ is an integer multiple of $\pi$:
    $$kL = n\pi \quad \text{for } n = 1, 2, 3, \ldots$$
    The integer $n$ is known as the principal quantum number. $n=0$ is excluded because it would lead to $k=0$, which implies $E=0$ and $\psi(x)=0$, a trivial solution representing the absence of the particle. Negative integers for $n$ yield redundant solutions (e.g., $\sin(-n\pi x/L) = -\sin(n\pi x/L)$, which represents the same physical state).

**Energy Eigenvalues (Quantization of Energy):**
From the boundary condition, $k = \frac{n\pi}{L}$. Substituting this back into the definition of $k^2$:
$$\frac{2mE_n}{\hbar^2} = \left(\frac{n\pi}{L}\right)^2$$
Solving for $E_n$:
$$E_n = \frac{n^2\pi^2\hbar^2}{2mL^2}$$
These are the allowed energy levels, or **eigenvalues**, of the particle. The energy is quantized, meaning it can only take on discrete values determined by the integer $n$. The lowest possible energy, the ground state, occurs for $n=1$.

**Wavefunctions (Eigenfunctions):**
Substituting $k = \frac{n\pi}{L}$ back into $\psi(x) = A \sin(kx)$, we get the unnormalized wavefunctions:
$$\psi_n(x) = A \sin\left(\frac{n\pi x}{L}\right)$$
These are the **eigenfunctions** corresponding to the energy eigenvalues $E_n$.

**Normalization:**
The constant $A$ is determined by the normalization condition, which states that the total probability of finding the particle somewhere in the box must be 1:
$$\int_{-\infty}^{\infty} |\psi_n(x)|^2 dx = 1$$
Since $\psi_n(x)=0$ outside the box, this integral reduces to:
$$\int_0^L A^2 \sin^2\left(\frac{n\pi x}{L}\right) dx = 1$$
Using the trigonometric identity $\sin^2\theta = \frac{1 - \cos(2\theta)}{2}$:
$$A^2 \int_0^L \frac{1 - \cos\left(\frac{2n\pi x}{L}\right)}{2} dx = 1$$
$$A^2 \left[ \frac{x}{2} - \frac{L}{4n\pi}\sin\left(\frac{2n\pi x}{L}\right) \right]_0^L = 1$$
Evaluating at the limits:
$$A^2 \left[ \left(\frac{L}{2} - \frac{L}{4n\pi}\sin(2n\pi)\right) - (0 - 0) \right] = 1$$
Since $\sin(2n\pi)=0$ for integer $n$:
$$A^2 \frac{L}{2} = 1 \implies A = \sqrt{\frac{2}{L}}$$
Thus, the complete, normalized wavefunctions are:
$$\psi_n(x) = \sqrt{\frac{2}{L}} \sin\left(\frac{n\pi x}{L}\right) \quad \text{for } n = 1, 2, 3, \ldots$$

These wavefunctions are orthogonal and form a complete set, meaning any arbitrary wavefunction within the box can be expressed as a linear combination of these eigenfunctions.

**References:**
*   Griffiths, D. J. (2018). *Introduction to Quantum Mechanics* (3rd ed.). Cambridge University Press. Chapter 2, Section 2.2.
*   Shankar, R. (1994). *Principles of Quantum Mechanics* (2nd ed.). Plenum Press. Chapter 4, Section 4.1.

## 8. ASCII diagrams

```text
       V(x) ^
            |
            |   +-------------------+   +-------------------
            |   |                   |   |
            |   |                   |   |
            |   |                   |   |
            |   |                   |   |
            |   |                   |   |
            |   |                   |   |
            |   |                   |   |
            |   |                   |   |
            |   |                   |   |
            |   |                   |   |
            |   |                   |   |
            |   |                   |   |
            +---+-------------------+---+-------------------> x
            0                       L

      Figure 1: Infinite Potential Well (Particle in a 1D Box)
      The potential V(x) is zero inside the box (0 <= x <= L)
      and infinite outside the box (x < 0 or x > L).
```

```text
       Psi(x) ^
              |
      E3 -----|-------------------
              |   /\      /\      /\
              |  /  \    /  \    /  \
              | /    \  /    \  /    \
              |/      \/      \/      \
              +---------------------------> x
              |
      E2 -----|   /\          /\
              |  /  \        /  \
              | /    \      /    \
              |/      \    /      \
              +---------------------------> x
              |
      E1 -----|   /\
              |  /  \
              | /    \
              |/      \
              +---------------------------> x
              0        L/2       L

      Figure 2: First three normalized wavefunctions (Psi_n(x))
      and their corresponding energy levels (E_n).
      Note that Psi_n(x) must be zero at the boundaries (x=0 and x=L).
      E_n increases with n^2.
```

```text
       |Psi(x)|^2 ^
                 |
      E3 ---------|-------------------
                 |  /\      /\      /\
                 | /  \    /  \    /  \
                 |/    \  /    \  /    \
                 +---------------------------> x
                 |
      E2 ---------|   /\          /\
                 |  /  \        /  \
                 | /    \      /    \
                 |/      \    /      \
                 +---------------------------> x
                 |
      E1 ---------|   /\
                 |  /  \
                 | /    \
                 |/      \
                 +---------------------------> x
                 0        L/2       L

      Figure 3: First three probability densities (|Psi_n(x)|^2).
      This shows the relative likelihood of finding the particle at
      a given position x. Note that for n=2, the probability of
      finding the particle at x=L/2 is zero.
```

## 9. Memory technique — never forget this

1.  **Specific Mnemonic/Visual Hook:**
    *   **"Schrödinger's Box: Walls Quantize Energy, Waves Just Can't Stop."**
        *   **Walls:** Reminds you of the infinite potential and the crucial boundary conditions ($\psi(0)=0, \psi(L)=0$).
        *   **Quantize Energy:** Directly states the key outcome – discrete energy levels.
        *   **Waves Just Can't Stop:** Visualizes the wavefunctions (like standing waves on a string) that must fit perfectly into the box, meaning they can't just stop anywhere; they have to end at zero at the walls. This visual helps remember the sine function and the $n\pi/L$ condition.

2.  **Formulas/Facts to Overlearn:**
    *   **Time-Independent Schrödinger Equation (TISE):**
        $$-\frac{\hbar^2}{2m}\frac{d^2\psi(x)}{dx^2} + V(x)\psi(x) = E\psi(x)$$
        This is the starting point for almost everything in non-relativistic quantum mechanics.
    *   **Energy Levels for Particle in a Box:**
        $$E_n = \frac{n^2\pi^2\hbar^2}{2mL^2} \quad \text{for } n = 1, 2, 3, \ldots$$
        This is the most important result, showing energy quantization and dependence on $n$, $m$, and $L$.
    *   **Normalized Wavefunctions for Particle in a Box:**
        $$\psi_n(x) = \sqrt{\frac{2}{L}} \sin\left(\frac{n\pi x}{L}\right) \quad \text{for } n = 1, 2, 3, \ldots$$
        These are the "shapes" of the particle's quantum states, essential for calculating probabilities.

3.  **Spaced-Repetition Schedule:**
    *   **1 Day:** Review the derivation and key formulas. Do one easy problem.
    *   **3 Days:** Review the concepts, common mistakes, and do one medium problem.
    *   **7 Days:** Review all aspects, focusing on the "why it matters" and connections. Do one hard problem.
    *   **16 Days:** Attempt a full re-derivation from scratch without notes.
    *   **35 Days:** Explain the concept to an imaginary peer, covering all sections.

4.  **First-Principles Re-derivation Pathway:**
    If you forget the formulas, you can always rebuild them by following these steps:
    1.  **Start with TISE:** Write down the Time-Independent Schrödinger Equation.
    2.  **