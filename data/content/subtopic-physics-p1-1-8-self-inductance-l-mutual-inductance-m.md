## What it is
Inductance is a property of an electrical circuit that describes its opposition to a change in current. Self-inductance ($L$) is a circuit's tendency to oppose a change in its *own* current, while mutual inductance ($M$) is the effect where a changing current in one circuit induces a voltage in a *second, nearby* circuit. It is the electrical analogue of mass or inertia.

## Why it matters
Inductors are fundamental components in electronics for filtering signals, storing energy, and creating oscillators. In aerospace, they are critical in DC-DC converters that regulate power for satellite subsystems. Transformers, which are essential for power transmission and are based entirely on mutual inductance, are used to step voltages up or down in spacecraft power systems.

## When to study it
You must have a solid grasp of these prerequisites before tackling inductance:
*   **Magnetic Fields:** Specifically, how to calculate the B-field from a current using Ampere's Law (e.g., for a solenoid, toroid).
*   **Magnetic Flux:** The concept of magnetic flux, $\Phi_B = \int \vec{B} \cdot d\vec{A}$.
*   **Faraday's Law of Induction:** The formula for induced EMF, $\mathcal{E} = -N \frac{d\Phi_B}{dt}$.
*   **Lenz's Law:** The physical meaning of the negative sign in Faraday's Law—that the induced effect opposes its cause.

If these are not fresh in your mind, review them first.

## How to study it (step by step)
1.  **Re-derive Faraday's Law.** Start from the experimental observation that a changing magnetic flux induces an electromotive force (EMF, or voltage). Write down $\mathcal{E} \propto -\frac{d\Phi_B}{dt}$ and understand that the proportionality constant is set to 1 in SI units. Add the $N$ for $N$ turns in a coil: $\mathcal{E} = -N \frac{d\Phi_B}{dt}$.
2.  **Define Self-Inductance.** Argue from first principles. A current $I$ in a coil creates a magnetic field $\vec{B}$. The magnitude of $\vec{B}$ is everywhere proportional to $I$. The magnetic flux $\Phi_B$ through the coil is the integral of $\vec{B}$, so $\Phi_B \propto I$. For a coil with $N$ turns, the total "flux linkage" is $N\Phi_B$. We define the proportionality constant, self-inductance $L$, such that $N\Phi_B = LI$.
3.  **Connect Faraday's Law and the Definition of L.** Substitute the definition from step 2 into the law from step 1.
    $$ \mathcal{E} = - \frac{d(N\Phi_B)}{dt} = - \frac{d(LI)}{dt} $$
    Since $L$ is a constant of geometry, this becomes the fundamental equation for an inductor:
    $$ \mathcal{E}_L = -L \frac{dI}{dt} $$
4.  **Derive L for a Solenoid.** This is the canonical example. Use Ampere's law to find $B = \mu_0 n I$ inside a long solenoid (where $n$ is turns/length). Calculate flux through one turn: $\Phi_B = BA = (\mu_0 n I)A$. Use the definition $L = N\Phi_B/I$ to find $L = \mu_0 n^2 A \ell$, where $N=n\ell$. See that $L$ depends only on geometry ($n, A, \ell$) and material properties ($\mu_0$).
5.  **Extend to Mutual Inductance.** Now consider two coils. Current $I_1$ in coil 1 creates a flux $\Phi_{21}$ through coil 2. Define mutual inductance $M_{21}$ via the flux linkage: $N_2 \Phi_{21} = M_{21} I_1$.
6.  **Find the Induced EMF.** Apply Faraday's Law to coil 2. The EMF induced in coil 2 by the changing current in coil 1 is $\mathcal{E}_2 = -N_2 \frac{d\Phi_{21}}{dt} = - \frac{d(M_{21}I_1)}{dt} = -M_{21}\frac{dI_1}{dt}$. It can be proven that $M_{21} = M_{12}$, so we just call it $M$.

## Key ideas, with intuition
1.  **Inductance is Electrical Inertia.** Mass resists a change in velocity ($F = m \frac{dv}{dt}$). Inductance resists a change in current ($\mathcal{E} = -L \frac{dI}{dt}$). A large inductor acts like a heavy flywheel; it's hard to get the current started, and once it's going, the inductor tries to keep it flowing. A sudden attempt to stop the current (e.g., opening a switch) will generate a very large voltage spike.

2.  **Inductance is a Geometric Property.** Inductance does not depend on the current flowing through a component or the voltage across it. It is determined entirely by the physical shape, size, number of turns, and the magnetic material (permeability $\mu$) of the component.
    $$ L = \frac{N\Phi_B}{I} $$
    Since $\Phi_B$ is proportional to $I$, the current always cancels out in this definition, leaving only geometric terms.

3.  **The "Back EMF" and Lenz's Law.** The negative sign in $\mathcal{E}_L = -L \frac{dI}{dt}$ is Lenz's Law. The induced EMF always *opposes* the change that created it.
    *   If current is *increasing* ($\frac{dI}{dt} > 0$), $\mathcal{E}_L$ is negative, meaning it pushes against the direction of current flow.
    *   If current is *decreasing* ($\frac{dI}{dt} < 0$), $\mathcal{E}_L$ is positive, meaning it pushes in the same direction as the current, trying to prop it up.

4.  **Mutual Inductance is Magnetic "Crosstalk".** Think of two circuits that are not physically connected. If they are close enough, the magnetic field from one can permeate the other. A changing current in the first circuit creates a changing magnetic field, which in turn induces an EMF in the second circuit. This is the principle of every transformer.

## Worked example
**Problem:** A long solenoid with radius $r_1$ and $n_1$ turns per unit length has a current $I_1(t)$. A smaller coil of $N_2$ total turns and radius $r_2 < r_1$ is placed coaxially inside the solenoid over a length $\ell$. Find the mutual inductance $M$ between them.

**Solution:**
1.  **Assume a current $I_1$ in the source coil (the solenoid).** Our goal is to find the flux it produces in the second coil and relate that to $I_1$.

2.  **Find the magnetic field from the source.** Inside a long solenoid, the magnetic field $\vec{B_1}$ is uniform and given by Ampere's Law:
    $$ B_1 = \mu_0 n_1 I_1 $$
    This field is directed along the axis of the solenoid. Outside the solenoid, $B_1 \approx 0$.

3.  **Calculate the flux through the receiving coil (the inner coil).** The flux through a single turn of the inner coil is $\Phi_{21} = \int \vec{B_1} \cdot d\vec{A_2}$. Since $\vec{B_1}$ is uniform over the area of the inner coil and parallel to its area vector, this simplifies. The area is that of the inner coil, $A_2 = \pi r_2^2$.
    $$ \Phi_{21} = B_1 A_2 = (\mu_0 n_1 I_1)(\pi r_2^2) $$

4.  **Apply the definition of mutual inductance.** The definition is $M = \frac{N_2 \Phi_{21}}{I_1}$, where $N_2 \Phi_{21}$ is the total flux linkage in the second coil.
    $$ M = \frac{N_2 (\mu_0 n_1 I_1 \pi r_2^2)}{I_1} $$

5.  **Simplify.** The current $I_1$ cancels, as it must.
    $$ M = \mu_0 n_1 N_2 \pi r_2^2 $$

**Reflection:** Each step followed a logical chain. We started with a cause (current $I_1$), calculated its effect (field $B_1$, then flux $\Phi_{21}$), and then used the definition of $M$ to find the constant of proportionality between the cause ($I_1$) and the linked effect ($N_2\Phi_{21}$). The result depends only on the geometry of the arrangement.

## Diagrams
A diagram of self-inductance in a solenoid:
```text
      <-- B-field -->
  IIIIIIIIIIIIIIIIIIIIIII
 /  /  /  /  /  /  /  /  / \
(  (  (  (  (  (  (  (  (  )  Current I(t) -->
 \  \  \  \  \  \  \  \  \ /
  IIIIIIIIIIIIIIIIIIIIIII
      <------------------
      Induced EMF, E_L
      (opposes change in I)
```
A diagram of mutual inductance between two coils:
```text
      Coil 1 (Source)              Coil 2 (Receiver)

  IIIIIIIIII                     IIIIII
 /  /  /  /  \ B-field lines   /  /  / \
(  (  (  (  ( ---------------->(  (  (  )
 \  \  \  \  /                 \  \  \ /
  IIIIIIIIII                     IIIIII
      ^
      |
  Current I_1(t)             Induced EMF E_2
  (changing)
```

## Memory technique — remember this forever
1.  **The Story:** Inductance is **Inertia**. A heavy train (high $L$) is hard to get moving ($\mathcal{E}$ opposes startup) and hard to stop ($\mathcal{E}$ creates a spark to keep current flowing). Mutual inductance is like two parallel tracks: the wind from the first accelerating train (changing $I_1$) pushes on the second train (induces $\mathcal{E}_2$).

2.  **Overlearn these formulas:**
    *   $\mathcal{E}_L = -L \frac{dI}{dt}$ (The physics: voltage from changing current)
    *   $L = \frac{N\Phi_B}{I}$ (The definition: geometry relates flux to current)

3.  **Spaced Repetition Schedule:**
    *   Review these ideas and re-derive the solenoid example in **1 day**.
    *   Do it again in **3 days**.
    *   Again in **7 days**.
    *   Again in **16 days**.
    *   Final lock-in review at **35 days**.

4.  **First Principles Pathway:** If you forget everything, rebuild from **Faraday's Law**.
    *   Start with $\mathcal{E} = -N \frac{d\Phi_B}{dt}$.
    *   Remember that the magnetic field is created by the current, so $B \propto I$.
    *   Flux is the integral of $B$, so $\Phi_B \propto I$.
    *   Define the constant of proportionality that depends on geometry as $L/N$, so $\Phi_B = (L/N)I$.
    *   Substitute back into Faraday's Law: $\mathcal{E} = -N \frac{d}{dt}\left(\frac{L}{N}I\right) = -L\frac{dI}{dt}$. You have just re-derived the fundamental inductor equation.

## Common mistakes
1.  **Confusing $L$ and $\mathcal{E}_L$.** $L$ is a fixed property of a device, measured in Henries (H). $\mathcal{E}_L$ is the voltage that appears *only when the current is changing*. With a steady DC current, $\frac{dI}{dt}=0$ and $\mathcal{E}_L=0$.
2.  **Ignoring the Minus Sign.** The negative sign is Lenz's Law and it is physically crucial. It determines the polarity of the induced voltage, which is essential for analyzing any circuit containing an inductor (like RL or RLC circuits).
3.  **Using the Wrong Area for Mutual Inductance.** When calculating the flux from a large coil passing through a smaller coil, you must use the area of the *smaller* coil. The magnetic field may exist over a larger region, but you only care about the flux that is actually "caught" by the receiving coil.

## Self-check
1.  A 50 mH inductor has a current flowing through it given by $I(t) = 2.0 \sin(100t)$ Amperes. What is the expression for the EMF induced across it as a function of time?
2.  Derive the self-inductance of a toroid with a rectangular cross-section of inner radius $a$, outer radius $b$, height $h$, and $N$ total turns.
3.  Consider two small, identical, circular wire loops of radius $r$. They are placed parallel to each other on the same axis, separated by a distance $z$, where $z \gg r$. Find an approximate expression for their mutual inductance $M$. (Hint: Treat one loop as a magnetic dipole).