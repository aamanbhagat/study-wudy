## What it is
Drift velocity ($v_d$) is the slow, average velocity of charge carriers (like electrons) in a material due to an external electric field, superimposed on their much faster, random thermal motion. Mobility ($\mu$) quantifies how easily these carriers move, defined as the ratio of drift velocity to the electric field strength. Conductivity ($\sigma$) is the macroscopic measure of a material's ability to conduct electric current, relating the current density ($J$) to the electric field ($E$).

## Why it matters
These concepts form the microscopic basis of Ohm's Law and are fundamental to understanding why materials are conductors, insulators, or semiconductors. In aerospace engineering, precise knowledge of conductivity is critical for designing avionics wiring, managing thermal loads in power systems, and protecting aircraft from lightning strikes. In solid-state physics and computer science, controlling carrier mobility and conductivity is the entire basis of transistors and integrated circuits.

## When to study it
You must have a solid grasp of these prerequisites. If you are not confident with them, review them first.
1.  **Classical Mechanics:** Newton's Second Law ($F=ma$) and basic kinematics (equations of motion under constant acceleration).
2.  **Electrostatics:** The definition of an electric field ($E$) and the force it exerts on a point charge ($F=qE$).
3.  **Basic Calculus:** Understanding of averages and simple integration/differentiation.

## How to study it (step by step)
1.  **Model a single electron:** Imagine a free electron in a vacuum with an electric field $E$. Use $F=ma$ to write its equation of motion. Note that its velocity would increase without bound, which is unphysical in a real material.
2.  **Introduce collisions (The Drude Model):** Now, place the electron in a crystal lattice. It accelerates due to the $E$-field, then collides with an ion, losing its accumulated velocity and starting over. Define the mean free time, $\tau$, as the average time between these collisions.
3.  **Derive drift velocity ($v_d$):** Calculate the average velocity gained by an electron during the time $\tau$. This terminal average velocity is the drift velocity. You should find it is directly proportional to both $E$ and $\tau$.
4.  **Define mobility ($\mu$):** From your expression for $v_d$, factor out the electric field $E$. The remaining term, which encapsulates the properties of the charge carrier and the material, is the mobility, $\mu$. So, $v_d = \mu E$.
5.  **Connect velocity to current density ($J$):** Consider a segment of wire with $n$ charge carriers per unit volume, each with charge $q$, moving at drift velocity $v_d$. Derive the expression for current density, $J$ (current per unit area), which should be $J = nqv_d$.
6.  **Derive conductivity ($\sigma$):** Substitute your expression for $v_d$ into the equation for $J$. You will see that $J$ is directly proportional to $E$. This proportionality constant is the conductivity, $\sigma$. This gives you the microscopic form of Ohm's Law: $J = \sigma E$.

## Key ideas, with intuition
1.  **Drunken Walk with a Purpose:** An electron in a metal is like a person stumbling through a dense, random crowd. Its thermal velocity is huge (~$10^6$ m/s), causing it to dart around randomly and collide constantly. An external electric field is like a gentle, persistent slope on the ground. The person still stumbles randomly, but on average, they drift slowly downhill. This slow downhill drift is the drift velocity (~$10^{-4}$ m/s), and it's what creates the net flow of charge (current).

2.  **Collisions Create Resistance:** Without collisions, electrons in an electric field would accelerate indefinitely ($F=ma$). Collisions with the lattice ions act like a drag force, preventing this runaway acceleration. The more frequent the collisions (smaller $\tau$), the greater the "drag," the lower the drift velocity for a given field, and thus the lower the conductivity (higher resistivity). This is why resistance increases with temperature: hotter ions vibrate more, making collisions more likely.

3.  **The Micro-to-Macro Bridge:** This topic is a perfect example of connecting single-particle physics to bulk material properties. The chain of logic is the key takeaway.
    $$
    \text{Force on one electron} \xrightarrow{F=ma, \text{add collisions}} \underbrace{v_d = \frac{q\tau}{m} E}_{\text{Single Particle}} \xrightarrow{J=nqv_d} \underbrace{J = \left(\frac{nq^2\tau}{m}\right) E}_{\text{Bulk Material}}
    $$
    This shows how the conductivity, $\sigma = \frac{nq^2\tau}{m}$, depends directly on microscopic quantities: carrier density ($n$), charge ($q$), mass ($m$), and mean free time ($\tau$).

## Worked example
**Problem:** Copper has a mobile electron density of $n = 8.47 \times 10^{28} \, \text{m}^{-3}$ and a conductivity of $\sigma = 5.96 \times 10^7 \, (\Omega \cdot \text{m})^{-1}$. A standard 12-gauge copper wire with a cross-sectional area of $A = 3.31 \, \text{mm}^2$ carries a current of $I = 10.0 \, \text{A}$. Find (a) the current density $J$, (b) the electric field $E$ in the wire, and (c) the drift velocity $v_d$ of the electrons.

**Solution:**

**(a) Find the current density $J$.**
Current density is defined as current per unit area, $J = I/A$. First, convert the area to SI units.
$$ A = 3.31 \, \text{mm}^2 \times \left(\frac{1 \, \text{m}}{1000 \, \text{mm}}\right)^2 = 3.31 \times 10^{-6} \, \text{m}^2 $$
Now, calculate $J$.
$$ J = \frac{I}{A} = \frac{10.0 \, \text{A}}{3.31 \times 10^{-6} \, \text{m}^2} = 3.02 \times 10^6 \, \text{A/m}^2 $$

*Reflection:* This step is a direct application of the definition of current density. The key is careful unit conversion.

**(b) Find the electric field $E$.**
We use the microscopic form of Ohm's Law, $J = \sigma E$. We can rearrange to solve for $E$.
$$ E = \frac{J}{\sigma} = \frac{3.02 \times 10^6 \, \text{A/m}^2}{5.96 \times 10^7 \, (\Omega \cdot \text{m})^{-1}} = 0.0507 \, \text{V/m} $$

*Reflection:* This shows the direct link between the current we force through a wire and the internal electric field required to sustain it, mediated by the material's conductivity. Note how small the E-field is inside a good conductor.

**(c) Find the drift velocity $v_d$.**
We use the relationship $J = nqv_d$. The charge carrier is the electron, so $q = e = 1.602 \times 10^{-19} \, \text{C}$.
$$ v_d = \frac{J}{nq} = \frac{3.02 \times 10^6 \, \text{A/m}^2}{(8.47 \times 10^{28} \, \text{m}^{-3})(1.602 \times 10^{-19} \, \text{C})} $$
$$ v_d = \frac{3.02 \times 10^6}{1.357 \times 10^{10}} \, \text{m/s} = 2.23 \times 10^{-4} \, \text{m/s} \approx 0.22 \, \text{mm/s} $$

*Reflection:* This result is crucial for intuition. The electrons that constitute a 10 Amp current are drifting slower than a snail. The signal propagates near the speed of light because the *field* does, and all electrons in the wire start drifting almost simultaneously, not because one electron travels from the switch to the bulb.

## Diagrams
Here is a model of an electron's path inside a conductor. The first diagram shows only random thermal motion. The second shows the effect of an applied electric field.

```text
(1) No E-field: Random thermal motion
                                  .
                                 /
                                *---.
                               /     \
                              .       *
                             /       /
                            *-------.

(2) With E-field applied to the right (E -->):
    (Note: electron has negative charge, so it drifts LEFT)

          <-- Net Drift <--
                                  .
                                 /
                                *---.
                               /     \
                              .       *
                             /       /
                            *-------.
                           /
                          *

E-field Direction: -------------------------------->
Electron Drift:    <---------------------------------
```

## Memory technique — remember this forever
1.  **The Mnemonic Story:** Think of a **Pinball Machine**.
    -   The **electrons** are the steel balls.
    -   Their high **thermal velocity** is the ball bouncing around chaotically at high speed off the bumpers.
    -   The **lattice ions** are the bumpers.
    -   The **electric field** is the slight **downward tilt** of the entire machine.
    -   The ball still bounces around like crazy, but on average, it drifts slowly towards the flippers. This slow, net downward speed is the **drift velocity**.
    -   **Conductivity** is like how "smooth" the bumpers are. Smoother bumpers (fewer collisions) mean the ball drifts downhill faster for the same tilt.

2.  **Must-Overlearn Formulas:**
    $$ J = n q v_d $$
    $$ J = \sigma E $$

3.  **Spaced Repetition Schedule:** Review your derivations and these key ideas in **1 day, 3 days, 7 days, 16 days, and 35 days**. Do not just read them. Re-derive them from a blank sheet of paper.

4.  **First Principles Pathway:** If you forget everything, rebuild it from $F=ma$.
    -   Force on an electron: $F = (-e)E$.
    -   Acceleration between collisions: $a = F/m_e = -eE/m_e$.
    -   Average velocity gained (drift velocity): $v_d \approx a \tau = -eE\tau/m_e$.
    -   Current density from moving charges: $J = n(-e)v_d$.
    -   Substitute $v_d$: $J = n(-e)\left(\frac{-eE\tau}{m_e}\right) = \left(\frac{ne^2\tau}{m_e}\right)E$.
    -   You have just re-derived $J=\sigma E$ and the formula for conductivity $\sigma = \frac{ne^2\tau}{m_e}$.

## Common mistakes
1.  **Confusing Thermal Velocity and Drift Velocity:** Students often forget that $v_d$ is extremely slow, while the actual speed of electrons between collisions is enormous. The current is due to the slow, collective drift, not the high individual speed.
2.  **Sign Errors:** Remember that current is conventionally defined as the flow of *positive* charge. Electrons have negative charge ($q=-e$), so they drift in the direction *opposite* to the electric field. $v_d$ and $E$ are antiparallel for electrons.
3.  **Treating $V=IR$ as Fundamental:** Ohm's law is a phenomenological result for bulk materials. The more fundamental physical law is $J = \sigma E$, which holds at a point within a material. You should always think in terms of $J$ and $E$ first.

## Self-check
1.  If you increase the temperature of a copper wire, what happens to the mean free time $\tau$ between collisions? Based on the formula for conductivity $\sigma$, how does the wire's conductivity change?
2.  A silver wire with a diameter of 1.0 mm carries a current of 1.5 A. Given that silver has a free electron density of $5.86 \times 10^{28} \, \text{m}^{-3}$, what is the drift velocity of the electrons?
3.  Material A and Material B have the same charge carrier density ($n$) and the carriers have the same mass ($m$) and charge ($q$). However, the mobility of carriers in Material A is twice that of Material B ($\mu_A = 2\mu_B$). If the same electric field is applied to both, which material will have a higher current density, and by what factor? Justify your answer starting from the definition of mobility.