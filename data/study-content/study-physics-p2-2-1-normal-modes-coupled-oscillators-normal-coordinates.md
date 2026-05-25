## 1. What it is — in plain English

Imagine you have a couple of swings, and they're not just hanging there independently; maybe there's a spring connecting them, or they're part of the same playground structure. If one kid starts swinging, it'll likely make the other swing move a little too, and vice versa. Their motions are "coupled" – they influence each other. It gets messy quickly, with both swings wobbling in complicated ways.

Now, here's the cool part: even though their individual motions look chaotic, there are usually a few *special* ways they can swing together. In these special ways, each swing still moves back and forth, but the *pattern* of their combined motion is perfectly simple and regular. One such pattern might be both swings moving exactly in sync, reaching their highest points at the same time. Another pattern might be them moving exactly opposite each other, one going forward while the other goes backward.

These special, simple, independent patterns of oscillation are called **normal modes**. When a system is oscillating in a normal mode, it moves at a single, specific frequency, and all its parts move in perfect harmony relative to each other. The "normal coordinates" are simply a way to describe the system's overall motion by breaking it down into these independent, simple normal modes, rather than trying to track the complicated individual movements of each part.

## 2. Why it matters — real-world applications

Understanding normal modes is crucial across many fields because complex systems often behave like coupled oscillators.

1.  **Aerospace Engineering & Structural Dynamics:** When designing rockets, aircraft, or even skyscrapers, engineers must analyze how these structures vibrate. If the natural frequency of an external force (like engine vibrations, wind gusts, or even the sloshing of fuel in tanks) matches one of the structure's normal mode frequencies, it can lead to **resonance**, causing dangerously large oscillations that can tear the structure apart (e.g., the infamous Tacoma Narrows Bridge collapse was a dramatic example of aeroelastic flutter, a complex form of coupled oscillation). Companies like **SpaceX** and **Boeing** extensively use modal analysis to ensure the structural integrity and stability of their vehicles.
2.  **Molecular Physics & Spectroscopy:** Molecules are essentially collections of atoms connected by "spring-like" chemical bonds. These atoms can vibrate in complex ways. Normal mode analysis allows physicists and chemists to predict and understand the specific vibrational patterns (stretching, bending, rocking) and their associated frequencies for molecules. This is fundamental to **infrared (IR) and Raman spectroscopy**, techniques used to identify substances and study molecular structure by observing which frequencies of light they absorb or scatter.
3.  **Electrical Engineering:** Coupled LC circuits (inductor-capacitor circuits) with mutual inductance behave exactly like mechanical coupled oscillators. Understanding their normal modes helps engineers design filters, resonant circuits, and understand signal propagation in complex networks. For instance, in radio frequency (RF) engineering, tuning circuits often involve coupled resonators.
4.  **Seismology & Civil Engineering:** Buildings are complex structures with many degrees of freedom. When an earthquake hits, the ground motion excites various vibrational modes in the building. Civil engineers use normal mode analysis to predict how a building will sway and deform during an earthquake, informing the design of earthquake-resistant structures.

## 3. Prerequisites — what you must know first

To fully grasp normal modes and normal coordinates, you should be comfortable with the following concepts. If any of these feel unfamiliar, pause and review them first.

*   **Newtonian Mechanics:** The fundamental laws of motion ($F=ma$), concepts of force, mass, acceleration, and equilibrium.
*   **Simple Harmonic Motion (SHM):** Understanding oscillations, displacement, velocity, acceleration, angular frequency ($\omega$), phase, and the differential equation for SHM ($\ddot{x} + \omega^2 x = 0$).
*   **Differential Equations:** Solving second-order linear homogeneous differential equations with constant coefficients.
*   **Linear Algebra:**
    *   **Matrices:** Matrix multiplication, addition, determinants.
    *   **Eigenvalues and Eigenvectors:** What they are, how to find them for a given matrix. This is absolutely central to the normal mode problem.
    *   **Diagonalization:** Understanding how a matrix can be transformed into a diagonal form using its eigenvectors.
*   **Lagrangian Mechanics (Highly Recommended but not strictly mandatory for the core math):** Familiarity with generalized coordinates, kinetic energy ($T$), potential energy ($V$), and the Euler-Lagrange equations. While normal modes can be derived from Newton's laws, the Lagrangian approach often simplifies setting up the equations of motion for complex systems.

## 4. The core idea — step by step

Let's build the concept of normal modes and normal coordinates from the ground up, using a classic example: two masses connected by springs.

### Step 1: Set up the Equations of Motion for the Coupled System

*   **Plain English:** We start by describing the physical setup and writing down the equations that govern the motion of each part of the system. Imagine two identical masses, $m_1$ and $m_2$, on a frictionless horizontal surface. They are connected to fixed walls by springs with stiffness $k_1$ and $k_3$, respectively, and to each other by a spring with stiffness $k_2$. Let $x_1$ and $x_2$ be the displacements of $m_1$ and $m_2$ from their equilibrium positions.

*   **Small Concrete Example:** Consider $m_1 = m_2 = m$ and $k_1 = k_2 = k_3 = k$.
    *   For mass $m_1$: The spring $k_1$ pulls it back with force $-k x_1$. The spring $k_2$ exerts a force that depends on the *relative* displacement $(x_2 - x_1)$. If $x_2 > x_1$, $k_2$ is stretched, pulling $m_1$ to the right (positive force). If $x_2 < x_1$, $k_2$ is compressed, pushing $m_1$ to the left (negative force). So, the force from $k_2$ on $m_1$ is $+k(x_2 - x_1)$.
    *   For mass $m_2$: The spring $k_3$ pulls it back with force $-k x_2$. The spring $k_2$ exerts a force that depends on the relative displacement $(x_1 - x_2)$. If $x_1 > x_2$, $k_2$ is compressed, pushing $m_2$ to the right (positive force). If $x_1 < x_2$, $k_2$ is stretched, pulling $m_2$ to the left (negative force). So, the force from $k_2$ on $m_2$ is $+k(x_1 - x_2)$.

*   **Formal/Mathematical Version:** Using Newton's second law ($F=ma$):
    $$m_1 \ddot{x}_1 = -k_1 x_1 + k_2 (x_2 - x_1)$$
    $$m_2 \ddot{x}_2 = -k_3 x_2 + k_2 (x_1 - x_2)$$
    Rearranging these into a standard form:
    $$m_1 \ddot{x}_1 + (k_1 + k_2) x_1 - k_2 x_2 = 0$$
    $$m_2 \ddot{x}_2 - k_2 x_1 + (k_2 + k_3) x_2 = 0$$
    For our simple example ($m_1=m_2=m$, $k_1=k_2=k_3=k$):
    $$m \ddot{x}_1 + 2k x_1 - k x_2 = 0$$
    $$m \ddot{x}_2 - k x_1 + 2k x_2 = 0$$

*   **What could go wrong:** Incorrectly assigning signs to the forces from the springs. Remember that spring forces are restoring forces, always trying to bring the system back to equilibrium. For the middle spring, the force on $m_1$ is $k_2(x_2-x_1)$ and on $m_2$ is $k_2(x_1-x_2)$.

### Step 2: Assume a Sinusoidal Solution

*   **Plain English:** For systems undergoing oscillations, we often guess that the solution will be some form of sine or cosine wave. If the system is oscillating in a "pure" normal mode, all parts of the system will oscillate at the *same* frequency, just with different amplitudes and phases.

*   **Small Concrete Example:** For our two-mass system, we assume:
    $$x_1(t) = A_1 e^{i\omega t}$$
    $$x_2(t) = A_2 e^{i\omega t}$$
    Here, $A_1$ and $A_2$ are constant amplitudes (which can be complex to include phase, but for now we can think of them as real ratios), and $\omega$ is the angular frequency of oscillation. The exponential form $e^{i\omega t}$ is mathematically convenient; we can take the real part at the end.

*   **Formal/Mathematical Version:**
    Substitute these assumed solutions into the equations of motion.
    $\ddot{x}_1 = -\omega^2 A_1 e^{i\omega t}$
    $\ddot{x}_2 = -\omega^2 A_2 e^{i\omega t}$

    For the simplified example:
    $$m(-\omega^2 A_1 e^{i\omega t}) + 2k A_1 e^{i\omega t} - k A_2 e^{i\omega t} = 0$$
    $$m(-\omega^2 A_2 e^{i\omega t}) - k A_1 e^{i\omega t} + 2k A_2 e^{i\omega t} = 0$$
    Since $e^{i\omega t}$ is never zero, we can divide it out:
    $$-m\omega^2 A_1 + 2k A_1 - k A_2 = 0$$
    $$-m\omega^2 A_2 - k A_1 + 2k A_2 = 0$$

*   **What could go wrong:** Assuming different frequencies for different parts of the system *within the same normal mode*. In a normal mode, *all* parts oscillate at the *same* frequency.

### Step 3: Formulate the Eigenvalue Problem

*   **Plain English:** The equations from Step 2 can be written in a compact matrix form. This matrix equation will only have non-trivial solutions (i.e., $A_1$ and $A_2$ are not both zero) for specific values of $\omega^2$. This is precisely the definition of an eigenvalue problem from linear algebra.

*   **Small Concrete Example:** Rearrange the equations from Step 2:
    $$(2k - m\omega^2) A_1 - k A_2 = 0$$
    $$-k A_1 + (2k - m\omega^2) A_2 = 0$$
    This can be written in matrix form:
    $$\begin{pmatrix} 2k - m\omega^2 & -k \\ -k & 2k - m\omega^2 \end{pmatrix} \begin{pmatrix} A_1 \\ A_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$

*   **Formal/Mathematical Version:** In general, for an $N$-degree-of-freedom system, the equations of motion can be written as:
    $$M \ddot{\mathbf{x}} + K \mathbf{x} = \mathbf{0}$$
    where $\mathbf{x}$ is a vector of displacements, $M$ is the **mass matrix** (usually diagonal, containing the masses), and $K$ is the **stiffness matrix** (containing the spring constants and their arrangements).
    Substituting $\mathbf{x}(t) = \mathbf{A} e^{i\omega t}$ where $\mathbf{A} = \begin{pmatrix} A_1 \\ A_2 \\ \vdots \end{pmatrix}$:
    $$M (-\omega^2 \mathbf{A} e^{i\omega t}) + K (\mathbf{A} e^{i\omega t}) = \mathbf{0}$$
    $$(K - \omega^2 M) \mathbf{A} = \mathbf{0}$$
    This is a homogeneous system of linear equations. For non-trivial solutions (i.e., $\mathbf{A} \neq \mathbf{0}$), the determinant of the coefficient matrix must be zero:
    $$\det(K - \omega^2 M) = 0$$
    This is the **characteristic equation**. The values of $\omega^2$ that satisfy this equation are the eigenvalues, and the corresponding amplitude vectors $\mathbf{A}$ are the eigenvectors.

*   **What could go wrong:** Errors in constructing the $M$ and $K$ matrices, especially for more complex systems. Pay attention to the signs and positions of elements.

### Step 4: Find the Normal Frequencies (Eigenvalues)

*   **Plain English:** Solve the characteristic equation for $\omega^2$. The solutions are the squares of the "normal frequencies" at which the system can oscillate in its pure, independent normal modes.

*   **Small Concrete Example:** For our matrix:
    $$\det \begin{pmatrix} 2k - m\omega^2 & -k \\ -k & 2k - m\omega^2 \end{pmatrix} = 0$$
    $$(2k - m\omega^2)(2k - m\omega^2) - (-k)(-k) = 0$$
    $$(2k - m\omega^2)^2 - k^2 = 0$$
    Take the square root of both sides:
    $$2k - m\omega^2 = \pm k$$
    Case 1: $2k - m\omega^2 = k \implies m\omega^2 = k \implies \omega^2 = k/m$
    Case 2: $2k - m\omega^2 = -k \implies m\omega^2 = 3k \implies \omega^2 = 3k/m$

    So, the normal frequencies are:
    $$\omega_1 = \sqrt{k/m}$$
    $$\omega_2 = \sqrt{3k/m}$$

*   **Formal/Mathematical Version:** The roots of the characteristic polynomial $\det(K - \omega^2 M) = 0$ give the allowed values for $\omega^2$. For an $N$-degree-of-freedom system, there will be $N$ such values (though some may be repeated or zero). These are the normal frequencies squared.

*   **What could go wrong:** Algebraic errors in solving the determinant. Forgetting that $\omega^2$ must be positive for real oscillations (negative $\omega^2$ would imply exponential growth/decay, not oscillation).

### Step 5: Find the Normal Modes (Eigenvectors)

*   **Plain English:** For each normal frequency we just found, we go back to the matrix equation and find the specific ratios of amplitudes ($A_1/A_2$, etc.) that correspond to that frequency. These amplitude ratios define the "shape" or "pattern" of each normal mode.

*   **Small Concrete Example:**
    *   **For $\omega_1^2 = k/m$:** Substitute this back into the matrix equation:
        $$(2k - m(k/m)) A_1 - k A_2 = 0$$
        $$(2k - k) A_1 - k A_2 = 0$$
        $$k A_1 - k A_2 = 0 \implies A_1 = A_2$$
        So, for $\omega_1$, the masses move in phase with equal amplitudes. The eigenvector (normal mode vector) is $\mathbf{A}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$ (or any scalar multiple, e.g., $\begin{pmatrix} C \\ C \end{pmatrix}$). This is the **symmetric mode**.

    *   **For $\omega_2^2 = 3k/m$:** Substitute this back into the matrix equation:
        $$(2k - m(3k/m)) A_1 - k A_2 = 0$$
        $$(2k - 3k) A_1 - k A_2 = 0$$
        $$-k A_1 - k A_2 = 0 \implies A_1 = -A_2$$
        So, for $\omega_2$, the masses move 180 degrees out of phase with equal amplitudes. The eigenvector is $\mathbf{A}_2 = \begin{pmatrix} 1 \\ -1 \end{pmatrix}$ (or any scalar multiple). This is the **antisymmetric mode**.

*   **Formal/Mathematical Version:** For each eigenvalue $\omega_j^2$, solve the system $(K - \omega_j^2 M) \mathbf{A}_j = \mathbf{0}$ for the corresponding eigenvector $\mathbf{A}_j$. Each $\mathbf{A}_j$ represents a normal mode, describing the relative amplitudes and phases of all parts of the system when it oscillates at frequency $\omega_j$. We typically normalize these eigenvectors for convenience, but their ratios are what truly define the mode.

*   **What could go wrong:** Algebraic errors when solving for the amplitude ratios. Not understanding that the eigenvectors define *relative* amplitudes, so scaling them by a constant doesn't change the mode's physical pattern.

### Step 6: Introduce Normal Coordinates

*   **Plain English:** The physical coordinates ($x_1, x_2$) are "coupled" because their equations of motion depend on each other. We can invent a new set of coordinates, called "normal coordinates," where each coordinate only depends on *one* normal mode and oscillates independently at its own normal frequency. This effectively "decouples" the system.

*   **Small Concrete Example:** For our two-mass system, the normal modes are $\mathbf{A}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$ and $\mathbf{A}_2 = \begin{pmatrix} 1 \\ -1 \end{pmatrix}$.
    We can define normal coordinates $\eta_1$ and $\eta_2$ as linear combinations of $x_1$ and $x_2$.
    Let's try:
    $\eta_1 = x_1 + x_2$ (This corresponds to the symmetric mode where $x_1$ and $x_2$ move together)
    $\eta_2 = x_1 - x_2$ (This corresponds to the antisymmetric mode where $x_1$ and $x_2$ move opposite)

    We can express $x_1, x_2$ in terms of $\eta_1, \eta_2$:
    $x_1 = \frac{1}{2}(\eta_1 + \eta_2)$
    $x_2 = \frac{1}{2}(\eta_1 - \eta_2)$

    If we substitute these into the original equations of motion (from Step 1), after some algebra, we would find:
    $\ddot{\eta}_1 + \omega_1^2 \eta_1 = 0$
    $\ddot{\eta}_2 + \omega_2^2 \eta_2 = 0$
    These are two completely independent SHM equations!

*   **Formal/Mathematical Version:** We form a transformation matrix $P$ whose columns are the normal mode eigenvectors.
    $$P = \begin{pmatrix} \mathbf{A}_1 & \mathbf{A}_2 & \cdots & \mathbf{A}_N \end{pmatrix}$$
    Then, we define the transformation from physical coordinates $\mathbf{x}$ to normal coordinates $\mathbf{\eta}$ as:
    $$\mathbf{x} = P \mathbf{\eta}$$
    This means $\mathbf{\eta} = P^{-1} \mathbf{x}$.
    When this transformation is applied to the general equations of motion $M \ddot{\mathbf{x}} + K \mathbf{x} = \mathbf{0}$, the equations in normal coordinates become:
    $$\ddot{\eta}_j + \omega_j^2 \eta_j = 0$$
    for each normal coordinate $\eta_j$. This is a set of $N$ uncoupled simple harmonic oscillator equations. The normal coordinates effectively "diagonalize" the system's equations of motion.

*   **What could go wrong:** Incorrectly constructing the transformation matrix $P$ or its inverse. Not understanding that the normal coordinates are abstract mathematical constructs that simplify the problem, not necessarily directly measurable physical quantities (though they can be interpreted physically).

### Step 7: Construct the General Solution

*   **Plain English:** Since the normal modes are independent, the most general motion of the coupled system is simply a combination (a superposition) of all its normal modes. Any complex, coupled motion can be seen as multiple normal modes oscillating simultaneously, each at its own frequency and with its own amplitude and phase.

*   **Small Concrete Example:** The general solution for the normal coordinates are:
    $\eta_1(t) = C_1 \cos(\omega_1 t + \phi_1)$
    $\eta_2(t) = C_2 \cos(\omega_2 t + \phi_2)$
    where $C_1, C_2, \phi_1, \phi_2$ are constants determined by initial conditions.
    To get back to the physical coordinates, we use the transformation:
    $x_1(t) = \frac{1}{2}(\eta_1(t) + \eta_2(t)) = \frac{1}{2} C_1 \cos(\omega_1 t + \phi_1) + \frac{1}{2} C_2 \cos(\omega_2 t + \phi_2)$
    $x_2(t) = \frac{1}{2}(\eta_1(t) - \eta_2(t)) = \frac{1}{2} C_1 \cos(\omega_1 t + \phi_1) - \frac{1}{2} C_2 \cos(\omega_2 t + \phi_2)$
    Notice that each physical coordinate is a sum of oscillations at *all* normal frequencies.

*   **Formal/Mathematical Version:** The general solution for the normal coordinates is:
    $$\eta_j(t) = C_j \cos(\omega_j t) + D_j \sin(\omega_j t)$$
    or equivalently,
    $$\eta_j(t) = E_j \cos(\omega_j t + \phi_j)$$
    where $C_j, D_j$ (or $E_j, \phi_j$) are constants determined by the $2N$ initial conditions (initial positions and velocities of all $N$ components).
    To find the general solution for the physical coordinates $\mathbf{x}(t)$, we transform back:
    $$\mathbf{x}(t) = P \mathbf{\eta}(t) = \sum_{j=1}^N \mathbf{A}_j \eta_j(t)$$
    $$\mathbf{x}(t) = \sum_{j=1}^N \mathbf{A}_j (C_j \cos(\omega_j t) + D_j \sin(\omega_j t))$$
    This shows that the motion of any part of the system is a superposition of all the normal modes, each oscillating at its own normal frequency.

*   **What could go wrong:** Forgetting the superposition principle. Incorrectly applying initial conditions to find the constants.

## 5. Worked examples — multiple, with every step shown

### Example 1: Two Identical Masses, Three Identical Springs

**Problem Statement:** Two identical masses $m$ are connected by three identical springs $k$ in a line, as shown in the ASCII diagram below. The ends of the outer springs are fixed. Find the normal frequencies and normal modes of oscillation.

```text
Fixed Wall --k-- m1 --k-- m2 --k-- Fixed Wall
             (x=0)  (x1)   (x2)    (L)
```

**Given:**
*   Masses: $m_1 = m_2 = m$
*   Spring constants: $k_1 = k_2 = k_3 = k$
*   Displacements: $x_1, x_2$ from equilibrium.

**We want:**
*   Normal frequencies ($\omega_j$)
*   Normal modes (eigenvectors $\mathbf{A}_j$)

**Solution:**

1.  **Set up Equations of Motion (EOMs):**
    *   For mass $m_1$:
        The left spring ($k_1$) pulls it with $-k x_1$.
        The middle spring ($k_2$) pulls it with $+k (x_2 - x_1)$.
        $$m \ddot{x}_1 = -k x_1 + k (x_2 - x_1)$$
        $$m \ddot{x}_1 + 2k x_1 - k x_2 = 0$$
        *Explanation:* We apply Newton's second law ($F=ma$). The force from the left spring is $-kx_1$ because $x_1$ is displacement from equilibrium, so if $x_1>0$, it pulls left. The force from the middle spring depends on its stretch/compression: if $x_2 > x_1$, it's stretched, pulling $m_1$ right ($+k(x_2-x_1)$).

    *   For mass $m_2$:
        The middle spring ($k_2$) pulls it with $+k (x_1 - x_2)$.
        The right spring ($k_3$) pulls it with $-k x_2$.
        $$m \ddot{x}_2 = k (x_1 - x_2) - k x_2$$
        $$m \ddot{x}_2 - k x_1 + 2k x_2 = 0$$
        *Explanation:* Similarly for $m_2$. The force from the middle spring is $+k(x_1-x_2)$ because if $x_1 > x_2$, it's compressed, pushing $m_2$ right. The right spring pulls left if $x_2>0$.

2.  **Assume Sinusoidal Solutions:**
    Let $x_1(t) = A_1 e^{i\omega t}$ and $x_2(t) = A_2 e^{i\omega t}$.
    Then $\ddot{x}_1 = -\omega^2 A_1 e^{i\omega t}$ and $\ddot{x}_2 = -\omega^2 A_2 e^{i\omega t}$.
    *Explanation:* This is our standard guess for oscillatory motion. We're looking for solutions where all parts oscillate at a single frequency $\omega$.

    Substitute into EOMs and divide by $e^{i\omega t}$:
    $$-m\omega^2 A_1 + 2k A_1 - k A_2 = 0$$
    $$-m\omega^2 A_2 - k A_1 + 2k A_2 = 0$$
    *Explanation:* This simplifies the differential equations into algebraic equations involving the amplitudes $A_1, A_2$ and the unknown frequency $\omega$.

3.  **Formulate the Eigenvalue Problem (Matrix Form):**
    Rearrange the equations:
    $$(2k - m\omega^2) A_1 - k A_2 = 0$$
    $$-k A_1 + (2k - m\omega^2) A_2 = 0$$
    In matrix form:
    $$\begin{pmatrix} 2k - m\omega^2 & -k \\ -k & 2k - m\omega^2 \end{pmatrix} \begin{pmatrix} A_1 \\ A_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
    *Explanation:* This is the form $(K - \omega^2 M)\mathbf{A} = \mathbf{0}$. The matrix on the left is the dynamic matrix, and its determinant must be zero for non-trivial solutions for $A_1, A_2$.

4.  **Find Normal Frequencies (Eigenvalues):**
    Set the determinant of the coefficient matrix to zero:
    $$\det \begin{pmatrix} 2k - m\omega^2 & -k \\ -k & 2k - m\omega^2 \end{pmatrix} = 0$$
    $$(2k - m\omega^2)(2k - m\omega^2) - (-k)(-k) = 0$$
    $$(2k - m\omega^2)^2 - k^2 = 0$$
    *Explanation:* This is the characteristic equation. We solve for $\omega^2$.

    Take the square root of both sides:
    $$2k - m\omega^2 = \pm k$$
    *Explanation:* This is a common algebraic shortcut for $(X)^2 - Y^2 = 0 \implies X = \pm Y$.

    *   **Case 1: $2k - m\omega^2 = k$**
        $$m\omega^2 = k$$
        $$\omega_1^2 = \frac{k}{m}$$
        $$\mathbf{\omega_1 = \sqrt{\frac{k}{m}}}$$

    *   **Case 2: $2k - m\omega^2 = -k$**
        $$m\omega^2 = 3k$$
        $$\omega_2^2 = \frac{3k}{m}$$
        $$\mathbf{\omega_2 = \sqrt{\frac{3k}{m}}}$$
    *Explanation:* These are the two normal frequencies. The system can oscillate stably at either of these frequencies.

5.  **Find Normal Modes (Eigenvectors):**
    *   **For $\omega_1^2 = k/m$:** Substitute this back into the matrix equation:
        $$(2k - m(k/m)) A_1 - k A_2 = 0$$
        $$(2k - k) A_1 - k A_2 = 0$$
        $$k A_1 - k A_2 = 0 \implies A_1 = A_2$$
        The normal mode vector is $\mathbf{A}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$ (or any non-zero multiple).
        *Explanation:* We found the relationship between $A_1$ and $A_2$ for this specific frequency. Since $A_1=A_2$, the masses move in the same direction with the same amplitude. This is the **symmetric mode**.

    *   **For $\omega_2^2 = 3k/m$:** Substitute this back into the matrix equation:
        $$(2k - m(3k/m)) A_1 - k A_2 = 0$$
        $$(2k - 3k) A_1 - k A_2 = 0$$
        $$-k A_1 - k A_2 = 0 \implies A_1 = -A_2$$
        The normal mode vector is $\mathbf{A}_2 = \begin{pmatrix} 1 \\ -1 \end{pmatrix}$ (or any non-zero multiple).
        *Explanation:* For this frequency, the masses move in opposite directions with the same amplitude. This is the **antisymmetric mode**.

**Final Answer:**
The normal frequencies are $\boxed{\omega_1 = \sqrt{\frac{k}{m}}}$ and $\boxed{\omega_2 = \sqrt{\frac{3k}{m}}}$.
The corresponding normal modes are $\boxed{\mathbf{A}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}}$ (symmetric mode) and $\boxed{\mathbf{A}_2 = \begin{pmatrix} 1 \\ -1 \end{pmatrix}}$ (antisymmetric mode).

**Reflection:** This example is fundamental. The trickiest part is often setting up the EOMs correctly with the right signs. Once in matrix form, the eigenvalue problem is a standard linear algebra procedure. The physical interpretation of the modes (in-phase vs. out-of-phase) is intuitive for this simple system.

---

### Example 2: Two Different Masses, Three Identical Springs

**Problem Statement:** Consider the same setup as Example 1, but now $m_1 = m$ and $m_2 = 2m$. All spring constants are $k$. Find the normal frequencies and normal modes.

**Given:**
*   Masses: $m_1 = m$, $m_2 = 2m$
*   Spring constants: $k_1 = k_2 = k_3 = k$
*   Displacements: $x_1, x_2$ from equilibrium.

**We want:**
*   Normal frequencies ($\omega_j$)
*   Normal modes (eigenvectors $\mathbf{A}_j$)

**Solution:**

1.  **Set up Equations of Motion (EOMs):**
    The force equations are the same as in Example 1, but with different masses.
    *   For mass $m_1 = m$:
        $$m \ddot{x}_1 = -k x_1 + k (x_2 - x_1)$$
        $$m \ddot{x}_1 + 2k x_1 - k x_2 = 0$$

    *   For mass $m_2 = 2m$:
        $$2m \ddot{x}_2 = k (x_1 - x_2) - k x_2$$
        $$2m \ddot{x}_2 - k x_1 + 2k x_2 = 0$$
    *Explanation:* The physics of the forces is unchanged, only the mass in $F=ma$ is different for the second equation.

2.  **Assume Sinusoidal Solutions:**
    Let $x_1(t) = A_1 e^{i\omega t}$ and $x_2(t) = A_2 e^{i\omega t}$.
    Substitute and divide by $e^{i\omega t}$:
    $$-m\omega^2 A_1 + 2k A_1 - k A_2 = 0$$
    $$-2m\omega^2 A_2 - k A_1 + 2k A_2 = 0$$
    *Explanation:* Same as before, converting ODEs to algebraic equations.

3.  **Formulate the Eigenvalue Problem (Matrix Form):**
    Rearrange:
    $$(2k - m\omega^2) A_1 - k A_2 = 0$$
    $$-k A_1 + (2k - 2m\omega^2) A_2 = 0$$
    In matrix form:
    $$\begin{pmatrix} 2k - m\omega^2 & -k \\ -k & 2k - 2m\omega^2 \end{pmatrix} \begin{pmatrix} A_1 \\ A_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
    *Explanation:* The mass matrix $M = \begin{pmatrix} m & 0 \\ 0 & 2m \end{pmatrix}$ is now not proportional to the identity matrix, making the $(K - \omega^2 M)$ matrix slightly more complex.

4.  **Find Normal Frequencies (Eigenvalues):**
    Set the determinant to zero:
    $$\det \begin{pmatrix} 2k - m\omega^2 & -k \\ -k & 2k - 2m\omega^2 \end{pmatrix} = 0$$
    $$(2k - m\omega^2)(2k - 2m\omega^2) - (-k)(-k) = 0$$
    $$4k^2 - 4km\omega^2 - 2km\omega^2 + 2m^2\omega^4 - k^2 = 0$$
    $$2m^2\omega^4 - 6km\omega^2 + 3k^2 = 0$$
    *Explanation:* This is a quadratic equation in $\omega^2$. We will use the quadratic formula. Let $X = \omega^2$.
    $$2m^2 X^2 - 6km X + 3k^2 = 0$$

    Using the quadratic formula $X = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$:
    $$X = \frac{6km \pm \sqrt{(-6km)^2 - 4(2m^2)(3k^2)}}{2(2m^2)}$$
    $$X = \frac{6km \pm \sqrt{36k^2m^2 - 24k^2m^2}}{4m^2}$$
    $$X = \frac{6km \pm \sqrt{12k^2m^2}}{4m^2}$$
    $$X = \frac{6km \pm 2km\sqrt{3}}{4m^2}$$
    $$X = \frac{3k \pm k\sqrt{3}}{2m}$$
    *Explanation:* The algebra is more involved due to the different masses. Careful application of the quadratic formula is key.

    So, the normal frequencies squared are:
    $$\omega_1^2 = \frac{k}{m} \left( \frac{3 - \sqrt{3}}{2} \right)$$
    $$\omega_2^2 = \frac{k}{m} \left( \frac{3 + \sqrt{3}}{2} \right)$$
    And the normal frequencies are:
    $$\mathbf{\omega_1 = \sqrt{\frac{k}{m} \left( \frac{3 - \sqrt{3}}{2} \right)}}$$
    $$\mathbf{\omega_2 = \sqrt{\frac{k}{m} \left( \frac{3 + \sqrt{3}}{2} \right)}}$$

5.  **Find Normal Modes (Eigenvectors):**
    *   **For $\omega_1^2 = \frac{k}{m} \left( \frac{3 - \sqrt{3}}{2} \right)$:**
        Substitute into the first equation: $(2k - m\omega_1^2) A_1 - k A_2 = 0$
        $$ \left( 2k - m \frac{k}{m} \left( \frac{3 - \sqrt{3}}{2} \right) \right) A_1 - k A_2 = 0 $$
        $$ \left( 2k - k \frac{3 - \sqrt{3}}{2} \right) A_1 - k A_2 = 0 $$
        $$ \left( \frac{4k - 3k + k\sqrt{3}}{2} \right) A_1 - k A_2 = 0 $$
        $$ \left( \frac{k + k\sqrt{3}}{2} \right) A_1 = k A_2 $$
        $$ A_2 = \frac{1 + \sqrt{3}}{2} A_1 $$
        The normal mode vector is $\mathbf{A}_1 = \begin{pmatrix} 1 \\ \frac{1 + \sqrt{3}}{2} \end{pmatrix}$.
        *Explanation:* The amplitude ratio is no longer simply $\pm 1$. The heavier mass (m2) will have a larger amplitude for the lower frequency mode.

    *   **For $\omega_2^2 = \frac{k}{m} \left( \frac{3 + \sqrt{3}}{2} \right)$:**
        Substitute into the first equation: $(2k - m\omega_2^2) A_1 - k A_2 = 0$
        $$ \left( 2k - m \frac{k}{m} \left( \frac{3 + \sqrt{3}}{2} \right) \right) A_1 - k A_2 = 0 $$
        $$ \left( 2k - k \frac{3 + \sqrt{3}}{2} \right) A_1 - k A_2 = 0 $$
        $$ \left( \frac{4k - 3k - k\sqrt{3}}{2} \right) A_1 - k A_2 = 0 $$
        $$ \left( \frac{k - k\sqrt{3}}{2} \right) A_1 = k A_2 $$
        $$ A_2 = \frac{1 - \sqrt{3}}{2} A_1 $$
        The normal mode vector is $\mathbf{A}_2 = \begin{pmatrix} 1 \\ \frac{1 - \sqrt{3}}{2} \end{pmatrix}$.
        *Explanation:* For the higher frequency mode, the amplitudes are again different, and they are out of phase (since $1-\sqrt{3}$ is negative). The heavier mass (m2) will have a smaller amplitude in this higher frequency, out-of-phase mode, which makes physical sense as it's harder to accelerate.

**Final Answer:**
The normal frequencies are $\boxed{\omega_1 = \sqrt{\frac{k}{m} \left( \frac{3 - \sqrt{3}}{2} \right)}}$ and $\boxed{\omega_2 = \sqrt{\frac{k}{m} \left( \frac{3 + \sqrt{3}}{2} \right)}}$.
The corresponding normal modes are $\boxed{\mathbf{A}_1 = \begin{pmatrix} 1 \\ \frac{1 + \sqrt{3}}{2} \end{pmatrix}}$ and $\boxed{\mathbf{A}_2 = \begin{pmatrix} 1 \\ \frac{1 - \sqrt{3}}{2} \end{pmatrix}}$.

**Reflection:** This example highlights how asymmetry (different masses) complicates the mathematics. The normal modes are no longer simple symmetric/antisymmetric with equal amplitudes, but still represent specific, independent patterns of motion. The algebra for solving the quadratic equation and substituting back can be tedious, requiring careful attention to detail.

---

### Example 3: Double Pendulum (Small Oscillations)

**Problem Statement:** A double pendulum consists of two point masses $m_1$ and $m_2$ suspended by rigid massless rods of lengths $l_1$ and $l_2$. The first rod is pivoted at the top, and the second rod is pivoted at the bottom of the first rod. Assuming small oscillations, find the normal frequencies and normal modes. For simplicity, let $m_1 = m_2 = m$ and $l_1 = l_2 = l$.

**Given:**
*   Masses: $m_1 = m_2 = m$
*   Lengths: $l_1 = l_2 = l$
*   Small angles: $\theta_1, \theta_2$ (displacements from vertical).

**We want:**
*   Normal frequencies ($\omega_j$)
*   Normal modes (eigenvectors $\mathbf{A}_j$)

**Solution:**

This problem is best tackled using Lagrangian mechanics due to the constraints and generalized coordinates.

1.  **Set up the Lagrangian:**
    *   **Coordinates:** We use generalized coordinates $\theta_1$ and $\theta_2$, the angles each rod makes with the vertical.
    *   **Positions:**
        $x_1 = l \sin\theta_1$
        $y_1 = -l \cos\theta_1$
        $x_2 = l \sin\theta_1 + l \sin\theta_2$
        $y_2 = -l \cos\theta_1 - l \cos\theta_2$
    *   **Velocities:**
        $\dot{x}_1 = l \dot{\theta}_1 \cos\theta_1$
        $\dot{y}_1 = l \dot{\theta}_1 \sin\theta_1$
        $\dot{x}_2 = l \dot{\theta}_1 \cos\theta_1 + l \dot{\theta}_2 \cos\theta_2$
        $\dot{y}_2 = l \dot{\theta}_1 \sin\theta_1 + l \dot{\theta}_2 \sin\theta_2$
    *   **Kinetic Energy ($T$):**
        $T = \frac{1}{2} m_1 (\dot{x}_1^2 + \dot{y}_1^2) + \frac{1}{2} m_2 (\dot{x}_2^2 + \dot{y}_2^2)$
        For small angles, $\sin\theta \approx \theta$, $\cos\theta \approx 1 - \theta^2/2$, so $\dot{x}_1 \approx l \dot{\theta}_1$, $\dot{y}_1 \approx l \dot{\theta}_1 \theta_1$.
        Keeping only terms up to quadratic in $\dot{\theta}$ and $\theta$ (for small oscillations):
        $\dot{x}_1^2 + \dot{y}_1^2 \approx (l \dot{\theta}_1)^2 (1^2 + \theta_1^2) \approx l^2 \dot{\theta}_1^2$
        $\dot{x}_2^2 + \dot{y}_2^2 \approx (l \dot{\theta}_1 + l \dot{\theta}_2)^2$ (since $\cos \theta \approx 1$)
        $T \approx \frac{1}{2} m (l^2 \dot{\theta}_1^2) + \frac{1}{2} m (l^2 (\dot{\theta}_1 + \dot{\theta}_2)^2)$
        $$T = \frac{1}{2} m l^2 \dot{\theta}_1^2 + \frac{1}{2} m l^2 (\dot{\theta}_1^2 + 2\dot{\theta}_1\dot{\theta}_2 + \dot{\theta}_2^2)$$
        $$T = \frac{1}{2} m l^2 (2\dot{\theta}_1^2 + 2\dot{\theta}_1\dot{\theta}_2 + \dot{\theta}_2^2)$$
        *Explanation:* We compute the kinetic energy for each mass and sum them. The small angle approximation simplifies the expressions significantly, allowing us to only keep terms up to quadratic order in velocities.

    *   **Potential Energy ($V$):** (Taking pivot point as $y=0$)
        $V = m_1 g y_1 + m_2 g y_2$
        $V = -m g l \cos\theta_1 - m g (l \cos\theta_1 + l \cos\theta_2)$
        For small angles, $\cos\theta \approx 1 - \theta^2/2$.
        $V \approx -m g l (1 - \theta_1^2/2) - m g l (1 - \theta_1^2/2 + 1 - \theta_2^2/2)$
        $V \approx -2mgl + \frac{1}{2} mgl \theta_1^2 + \frac{1}{2} mgl (\theta_1^2 + \theta_2^2)$ (ignoring constant $-2mgl$ as it doesn't affect EOMs)
        $$V = \frac{1}{2} mgl (2\theta_1^2 + \theta_2^2)$$
        *Explanation:* Potential energy is due to gravity. We use the small angle approximation for $\cos\theta$ and drop constant terms.

    *   **Lagrangian:** $L = T - V$
        $$L = \frac{1}{2} m l^2 (2\dot{\theta}_1^2 + 2\dot{\theta}_1\dot{\theta}_2 + \dot{\theta}_2^2) - \frac{1}{2} mgl (2\theta_1^2 + \theta_2^2)$$

2.  **Derive Equations of Motion (Euler-Lagrange):**
    *   For $\theta_1$:
        $$\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{\theta}_1}\right) - \frac{\partial L}{\partial \theta_1} = 0$$
        $\frac{\partial L}{\partial \dot{\theta}_1} = m l^2 (2\dot{\theta}_1 + \dot{\theta}_2)$
        $\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{\theta}_1}\right) = m l^2 (2\ddot{\theta}_1 + \ddot{\theta}_2)$
        $\frac{\partial L}{\partial \theta_1} = -mgl (2\theta_1)$
        $$m l^2 (2\ddot{\theta}_1 + \ddot{\theta}_2) + 2mgl \theta_1 = 0$$
        $$l (2\ddot{\theta}_1 + \ddot{\theta}_2) + 2g \theta_1 = 0 \quad (1)$$

    *   For $\theta_2$:
        $$\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{\theta}_2}\right) - \frac{\partial L}{\partial \theta_2} = 0$$
        $\frac{\partial L}{\partial \dot{\theta}_2} = m l^2 (\dot{\theta}_1 + \dot{\theta}_2)$
        $\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{\theta}_2}\right) = m l^2 (\ddot{\theta}_1 + \ddot{\theta}_2)$
        $\frac{\partial L}{\partial \theta_2} = -mgl \theta_2$
        $$m l^2 (\ddot{\theta}_1 + \ddot{\theta}_2) + mgl \theta_2 = 0$$
        $$l (\ddot{\theta}_1 + \ddot{\theta}_2) + g \theta_2 = 0 \quad (2)$$
    *Explanation:* The Euler-Lagrange equations provide a systematic way to get the EOMs in generalized coordinates.

3.  **Assume Sinusoidal Solutions:**
    Let $\theta_1(t) = A_1 e^{i\omega t}$ and $\theta_2(t) = A_2 e^{i\omega t}$.
    Then $\ddot{\theta}_1 = -\omega^2 A_1 e^{i\omega t}$ and $\ddot{\theta}_2 = -\omega^2 A_2 e^{i\omega t}$.
    Substitute and divide by $e^{i\omega t}$:
    From (1): $l (-2\omega^2 A_1 - \omega^2 A_2) + 2g A_1 = 0 \implies (2g - 2l\omega^2) A_1 - l\omega^2 A_2 = 0$
    From (2): $l (-\omega^2 A_1 - \omega^2 A_2) + g A_2 = 0 \implies -l\omega^2 A_1 + (g - l\omega^2) A_2 = 0$
    *Explanation:* Standard substitution to turn ODEs into algebraic equations.

4.  **Formulate the Eigenvalue Problem (Matrix Form):**
    $$\begin{pmatrix} 2g - 2l\omega^2 & -l\omega^2 \\ -l\omega^2 & g - l\omega^2 \end{pmatrix} \begin{pmatrix} A_1 \\ A_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$
    *Explanation:* This is the $(K - \omega^2 M)\mathbf{A} = \mathbf{0}$ form, where $K$ and $M$ are derived from the second derivatives of $V$ and $T$ respectively.

5.  **Find Normal Frequencies (Eigenvalues):**
    Set the determinant to zero:
    $$(2g - 2l\omega^2)(g - l\omega^2) - (-l\omega^2)(-l\omega^2) = 0$$
    $$2g^2 - 2gl\omega^2 - 2gl\omega^2 + 2l^2\omega^4 - l^2\omega^4 = 0$$
    $$l^2\omega^4 - 4gl\omega^2 + 2g^2 = 0$$
    *Explanation:* This is a quadratic equation in $\omega^2$. Let $X = \omega^2$.
    $$l^2 X^2 - 4gl X + 2g^2 = 0$$
    Using the quadratic formula:
    $$X = \frac{4gl \pm \sqrt{(-4gl)^2 - 4(l^2)(2g^2)}}{2l^2}$$
    $$X = \frac{4gl \pm \sqrt{16g^2l^2 - 8g^2l^2}}{2l^2}$$
    $$X = \frac{4gl \pm \sqrt{8g^2l^2}}{2l^2}$$
    $$X = \frac{4gl \pm 2gl\sqrt{2}}{2l^2}$$
    $$X = \frac{g}{l} (2 \pm \sqrt{2})$$
    *Explanation:* Careful application of the quadratic formula.

    So, the normal frequencies squared are:
    $$\omega_1^2 = \frac{g}{l} (2 - \sqrt{2})$$
    $$\omega_2^2 = \frac{g}{l} (2 + \sqrt{2})$$
    And the normal frequencies are:
    $$\mathbf{\omega_1 = \sqrt{\frac{g}{l} (2 - \sqrt{2})}}$$
    $$\mathbf{\omega_2 = \sqrt{\frac{g}{l} (2 + \sqrt{2})}}$$

6.  **Find Normal Modes (Eigenvectors):**
    *   **For $\omega_1^2 = \frac{g}{l} (2 - \sqrt{2})$:**
        Substitute into the second equation: $-l\omega_1^2 A_1 + (g - l\omega_1^2) A_2 = 0$
        $$-l \frac{g}{l} (2 - \sqrt{2}) A_1 + (g - l \frac{g}{l} (2 - \sqrt{2})) A_2 = 0$$
        $$-g (2 - \sqrt{2}) A_1 + (g - g(2 - \sqrt{2})) A_2 = 0$$
        $$-g (2 - \sqrt{2}) A_1 + (g - 2g + g\sqrt{2}) A_2 = 0$$
        $$-g (2 - \sqrt{2}) A_1 + (-g + g\sqrt{2}) A_2 = 0$$
        $$(2 - \sqrt{2}) A_1 = (\sqrt{2} - 1) A_2$$
        $$A_2 = \frac{2 - \sqrt{2}}{\sqrt{2} - 1} A_1 = \frac{\sqrt{2}(\sqrt{2} - 1)}{\sqrt{2} - 1} A_1 = \sqrt{2} A_1$$
        The normal mode vector is $\mathbf{A}_1 = \begin{pmatrix} 1 \\ \sqrt{2} \end{pmatrix}$.
        *Explanation:* In the lower frequency mode, the lower pendulum (angle $\theta_2$) has a larger amplitude than the upper pendulum (angle $\theta_1$). They oscillate in phase.

    *   **For $\omega_2^2 = \frac{g}{l} (2 + \sqrt{2})$:**
        Substitute into the second equation: $-l\omega_2^2 A_1 + (g - l\omega_2^2) A_2 = 0$
        $$-l \frac{g}{l} (2 + \sqrt{2}) A_1 + (g - l \frac{g}{l} (2 + \sqrt{2})) A_2 = 0$$
        $$-g (2 + \sqrt{2}) A_1 + (g - g(2 + \sqrt{2})) A_2 = 0$$
        $$-g (2 + \sqrt{2}) A_1 + (g - 2g - g\sqrt{2}) A_2 = 0$$
        $$-g (2 + \sqrt{2}) A_1 + (-g - g\sqrt{2}) A_2 = 0$$
        $$(2 + \sqrt{2}) A_1 = -(1 + \sqrt{2}) A_2$$
        $$A_2 = -\frac{2 + \sqrt{2}}{1 + \sqrt{2}} A_1 = -\frac{\sqrt{2}(\sqrt{2} + 1)}{1 + \sqrt{2}} A_1 = -\sqrt{2} A_1$$
        The normal mode vector is $\mathbf{A}_2 = \begin{pmatrix} 1 \\ -\sqrt{2} \end{pmatrix}$.
        *Explanation:* In the higher frequency mode, the lower pendulum has a larger amplitude than the upper pendulum, and they oscillate 180 degrees out of phase.

**Final Answer:**
The normal frequencies are $\boxed{\omega_1 = \sqrt{\frac{g}{l} (2 - \sqrt{2})}}$ and $\boxed{\omega_2 = \sqrt{\frac{g}{l} (2 + \sqrt{2})}}$.
The corresponding normal modes are $\boxed{\mathbf{A}_1 = \begin{pmatrix} 1 \\ \sqrt{2} \end{pmatrix}}$ (in-phase) and $\boxed{\mathbf{A}_2 = \begin{pmatrix} 1 \\ -\sqrt{2} \end{pmatrix}}$ (out-of-phase).

**Reflection:** This example demonstrates the power of Lagrangian mechanics for setting up the EOMs in complex systems. The small angle approximation is crucial for linearizing the system, which is a prerequisite for the eigenvalue problem approach. The algebra for the eigenvalues and eigenvectors is more involved but follows the same principles. The physical interpretation of the modes is that the lower pendulum always has a larger swing, and they can be in-phase (lower frequency) or out-of-phase (higher frequency).

---

### Example 4: Coupled LC Circuit

**Problem Statement:** Consider two identical LC circuits, each with inductance $L$ and capacitance $C$. They are coupled by a mutual inductance $M$. Find the normal frequencies of oscillation for the currents in the loops. Assume the loops are driven by a voltage source that is then removed, allowing free oscillation.

```text
Loop 1:  --L1-- --C1--
         |    |
         M    (mutual inductance)
         |    |
Loop 2:  --L2-- --C2--
```
(More precisely, imagine two loops, each with an L and C, and the inductors are placed close enough to have mutual inductance M. Let $L_1=L_2=L$, $C_1=C_2=C$.)

**Given:**
*   Inductances: $L_1 = L_2 = L$
*   Capacitances: $C_1 = C_2 = C$
*   Mutual Inductance: $M$
*   Charges: $q_1, q_2$ on capacitors.

**We want:**
*   Normal frequencies ($\omega_j$)

**Solution:**

1.  **Set up Equations of Motion (Kirchhoff's Voltage Law):**
    The voltage drop across an inductor is $L \frac{dI}{dt}$. For mutual inductance, a changing current in one loop induces a voltage in the other: $M \frac{dI_j}{dt}$. The voltage drop across a capacitor is $q/C$.
    Let $I_1 = \dot{q}_1$ and $I_2 = \dot{q}_2$ be the currents in the loops.
    *   For Loop 1:
        $$L \frac{dI_1}{dt} + M \frac{dI_2}{dt} + \frac{q_1}{C} = 0$$
        $$L \ddot{q}_1 + M \ddot{q}_2 + \frac{1}{C} q_1 = 0$$
        *Explanation:* Sum of voltage drops around the loop is zero. The $M \ddot{q}_2$ term represents the induced voltage from the second loop.

    *   For Loop 2:
        $$L \frac{dI_2}{dt} + M \frac{dI_1}{dt} + \frac{q_2}{C} = 0$$
        $$L \ddot{q}_2 + M \ddot{q}_1 + \frac{1}{C} q_2 =