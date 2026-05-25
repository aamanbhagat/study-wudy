## 1. What it is — in plain English

Imagine you have a garden hose, and water is flowing through it. If you measure the flow at any point along the hose, you'd expect to get the same amount of water passing by per second. This is like an electric current flowing through a wire – charges are physically moving.

Now, imagine there's a balloon stuck in the middle of your hose. Water flows into the balloon, making it expand, but no water flows *out* of the balloon at that instant. If you tried to measure the water flow *through* the balloon, you'd find zero, even though water is clearly moving *into* it. This is a problem for our simple "water flow" rule.

What's happening inside the balloon is that the *amount of water* inside it is changing, and this change is just as important as the actual flow through the hose. In electricity, James Clerk Maxwell realized something similar. He found that a *changing electric field* – like the electric field building up between the plates of a charging capacitor (our "balloon") – acts exactly like a real current, even though no physical charges are moving through that space. He called this the "displacement current."

So, displacement current isn't charges physically moving from one place to another. Instead, it's the "current" equivalent of a *changing electric field*. Just as moving charges create magnetic fields, a changing electric field also creates a magnetic field. It's Maxwell's brilliant insight that completed the picture of electromagnetism.

## 2. Why it matters — real-world applications

The displacement current is not just a theoretical fix; it's fundamental to almost all modern technology involving electromagnetism.

1.  **Wireless Communication (Radio, Wi-Fi, 5G):** This is perhaps the most direct and impactful application. Maxwell's addition predicted that a changing electric field generates a magnetic field, and a changing magnetic field (from Faraday's Law) generates an electric field. This self-sustaining dance of changing electric and magnetic fields forms **electromagnetic waves**. Radio waves, microwaves, light, X-rays – they are all electromagnetic waves. Without displacement current, there would be no theoretical basis for these waves, and thus no radio, television, cell phones, Wi-Fi, or satellite communication (crucial for aerospace telemetry and navigation).
2.  **Microwave Ovens and Radar Systems:** Microwave ovens work by generating high-frequency electromagnetic waves that cause water molecules in food to vibrate and heat up. Radar systems (used in aerospace for navigation, air traffic control, and in self-driving cars for obstacle detection) emit electromagnetic waves and detect their reflections. Both rely entirely on the existence and propagation of electromagnetic waves, which are a direct consequence of the displacement current.
3.  **Optical Fibers and Lasers:** Light itself is an electromagnetic wave. The ability to transmit data at incredibly high speeds through optical fibers, or to use lasers for precision cutting, medical procedures, or data storage, all stems from the understanding of light as an electromagnetic phenomenon, which Maxwell's equations (including displacement current) fully describe.
4.  **Magnetic Resonance Imaging (MRI):** While MRI primarily relies on nuclear magnetic resonance and strong static magnetic fields, the *dynamic* aspects of MRI, such as the radiofrequency pulses used to excite protons and the detection of their emitted signals, involve the generation and reception of electromagnetic waves. The interaction between changing magnetic fields and induced electric fields (and vice-versa, via displacement current) is at play in the sophisticated electromagnetic engineering of MRI scanners.

## 3. Prerequisites — what you must know first

Before diving deep into displacement current, ensure you have a solid grasp of these foundational concepts:

*   **Electric Field ($\vec{E}$):** The force per unit charge experienced by a test charge at a point in space.
*   **Magnetic Field ($\vec{B}$):** The force per unit current or moving charge at a point in space.
*   **Electric Current ($I$):** The flow of electric charge per unit time, usually through a conductor.
*   **Capacitors:** Devices that store electric charge and energy in an electric field, consisting typically of two conducting plates separated by an insulator.
*   **Ampere's Law (Original Form):** Relates the line integral of the magnetic field around a closed loop to the total current passing through any surface bounded by that loop.
*   **Gauss's Law for Electric Fields:** Relates the electric flux through a closed surface to the total charge enclosed within that surface.
*   **Faraday's Law of Induction:** States that a changing magnetic flux through a surface induces an electromotive force (and thus an electric field) around the boundary of that surface.
*   **Vector Calculus:**
    *   **Line Integral:** Integral along a curve (e.g., $\oint \vec{B} \cdot d\vec{l}$).
    *   **Surface Integral:** Integral over a surface (e.g., $\iint \vec{E} \cdot d\vec{A}$ for electric flux).
    *   **Divergence ($\nabla \cdot$):** Measures the outward flux of a vector field from an infinitesimal volume.
    *   **Curl ($\nabla \times$):** Measures the "rotation" or "circulation" of a vector field at a point.
*   **Continuity Equation for Charge:** Expresses the conservation of electric charge, stating that the rate of change of charge within a volume is equal to the net current flowing out of that volume.

## 4. The core idea — step by step

Let's build up the concept of displacement current, starting from the original Ampere's Law and revealing its inconsistency.

### Step 1: Ampere's Law (Original Form)

*   **Plain-English Statement:** The original Ampere's Law tells us that electric currents produce magnetic fields. Specifically, if you draw any closed loop, the "circulation" of the magnetic field around that loop is directly proportional to the total electric current *passing through* the surface bounded by that loop.
*   **Small Concrete Example:** Imagine a long, straight wire carrying a steady current $I$. If you draw a circular loop around this wire, the magnetic field lines will also be circles concentric with the wire. Ampere's Law allows you to calculate the strength of this magnetic field.
*   **Formal/Mathematical Version:**
    $$ \oint_C \vec{B} \cdot d\vec{l} = \mu_0 I_{enc} $$
    Here, $\oint_C$ denotes a line integral around a closed loop $C$, $\vec{B}$ is the magnetic field, $d\vec{l}$ is an infinitesimal segment of the loop, $\mu_0$ is the permeability of free space (a constant), and $I_{enc}$ is the total *conduction current* (actual moving charges) enclosed by the loop.
*   **What Could Go Wrong:** This law works perfectly for steady currents and closed current loops. However, it implicitly assumes that current is continuous and doesn't "start" or "stop" abruptly, which is where the problem arises.

### Step 2: The Problem with Ampere's Law — The Charging Capacitor

*   **Plain-English Statement:** Ampere's Law runs into trouble when current isn't continuous, like when a capacitor is charging. A capacitor has a gap between its plates where no charges physically flow. If we apply Ampere's Law around a wire leading to the capacitor, we get a magnetic field. But if we try to apply it *through* the capacitor gap, it seems to suggest no magnetic field, which is inconsistent.
*   **Small Concrete Example:** Consider a circuit where a current $I$ flows to charge a parallel-plate capacitor. Let's draw an Amperean loop $C$ around the wire *before* it reaches the capacitor plate. If we choose a flat surface $S_1$ bounded by $C$ (like a disc), the current $I$ passes through it. Ampere's Law gives $\oint_C \vec{B} \cdot d\vec{l} = \mu_0 I$.
    Now, consider a different surface $S_2$ bounded by the *same loop* $C$. This surface $S_2$ bulges out and passes *between* the capacitor plates. Through this surface $S_2$, there is *no conduction current* ($I_{enc}=0$), because charges cannot cross the gap. According to the original Ampere's Law, this would mean $\oint_C \vec{B} \cdot d\vec{l} = 0$.
    This is a contradiction! The line integral of $\vec{B}$ around $C$ must be unique, regardless of the surface chosen.
*   **Formal/Mathematical Version:**
    For surface $S_1$: $\oint_C \vec{B} \cdot d\vec{l} = \mu_0 I$
    For surface $S_2$: $\oint_C \vec{B} \cdot d\vec{l} = \mu_0 \cdot 0 = 0$
    This violates the consistency of the line integral, which must be independent of the choice of surface $S$ as long as it shares the same boundary $C$. This issue is related to the fact that the original Ampere's law implies $\nabla \cdot \vec{J} = 0$ (current continuity), which is not true for time-varying currents where charge can accumulate.
*   **What Could Go Wrong:** Forgetting that for a given closed loop, the line integral of $\vec{B}$ must yield the same result, regardless of which surface you choose to bound that loop. This is a fundamental property of vector calculus (Stokes' Theorem).

### Step 3: The "Missing Current" and Charge Conservation

*   **Plain-English Statement:** The problem isn't that current *disappears*; it's that charge is accumulating on the capacitor plates. The rate at which charge accumulates on a plate *is* the current flowing into it. This accumulation creates a changing electric field between the plates.
*   **Small Concrete Example:** As current $I$ flows into one plate of a capacitor, positive charge $Q$ builds up on it. The rate of change of this charge, $dQ/dt$, is exactly equal to the current $I$. This changing charge on the plates means the electric field $\vec{E}$ between the plates is also changing.
*   **Formal/Mathematical Version:**
    The current $I$ flowing into a capacitor plate is given by:
    $$ I = \frac{dQ}{dt} $$
    The electric field $\vec{E}$ between the plates of a parallel-plate capacitor (ignoring fringing effects) is $E = \frac{\sigma}{\epsilon_0} = \frac{Q}{A\epsilon_0}$, where $A$ is the plate area and $\sigma = Q/A$ is the surface charge density.
    Therefore, the charge $Q$ on the plate is $Q = E A \epsilon_0$.
    Substituting this into the current equation:
    $$ I = \frac{d}{dt} (E A \epsilon_0) $$
    $$ I = \epsilon_0 A \frac{dE}{dt} $$
*   **What Could Go Wrong:** Neglecting the fundamental principle of charge conservation, which dictates that charge cannot simply appear or disappear. Any current flowing into a region must either flow out or accumulate within that region.

### Step 4: Maxwell's Insight — A Changing Electric Field is Like a Current

*   **Plain-English Statement:** Maxwell realized that the rate of change of the electric field between the capacitor plates could *itself* act as a source of magnetic field, just like a real current. He proposed that this "displacement current" fills the gap where the conduction current stops.
*   **Small Concrete Example:** In our charging capacitor, the electric field $\vec{E}$ between the plates is increasing with time. Maxwell proposed that this *change* in $\vec{E}$ generates a magnetic field in the region between the plates, which would be consistent with the magnetic field generated by the conduction current in the wires.
*   **Formal/Mathematical Version:**
    From Step 3, we have $I = \epsilon_0 A \frac{dE}{dt}$.
    Recall that electric flux $\Phi_E$ through a surface is defined as $\Phi_E = \iint \vec{E} \cdot d\vec{A}$. For a parallel-plate capacitor, if we consider a surface between the plates of area $A$, and the electric field $\vec{E}$ is uniform and perpendicular to the surface, then $\Phi_E = E A$.
    So, we can rewrite the expression for current $I$ in terms of electric flux:
    $$ I = \epsilon_0 \frac{d(EA)}{dt} = \epsilon_0 \frac{d\Phi_E}{dt} $$
    Maxwell identified this quantity, $\epsilon_0 \frac{d\Phi_E}{dt}$, as the "displacement current."
*   **What Could Go Wrong:** Confusing the *cause* (changing E-field) with the *effect* (magnetic field generation). The displacement current is not a flow of charge, but a conceptual current that has the same magnetic effect as a real current.

### Step 5: Defining Displacement Current

*   **Plain-English Statement:** The displacement current ($I_D$) is defined as the rate of change of electric flux through a surface, multiplied by the permittivity of free space ($\epsilon_0$). It's a "fictitious" current in the sense that no actual charges move, but it has a very real magnetic effect.
*   **Small Concrete Example:** If the electric field between capacitor plates is changing at a rate of $10^6 \text{ V/(m s)}$ over an area of $0.01 \text{ m}^2$, the displacement current would be $I_D = (8.85 \times 10^{-12} \text{ F/m}) \times (0.01 \text{ m}^2) \times (10^6 \text{ V/(m s)}) \approx 8.85 \times 10^{-8} \text{ A}$. This "current" would generate a magnetic field.
*   **Formal/Mathematical Version:**
    $$ I_D = \epsilon_0 \frac{d\Phi_E}{dt} $$
    Where $\Phi_E = \iint_S \vec{E} \cdot d\vec{A}$ is the electric flux through a surface $S$.
*   **What Could Go Wrong:** Forgetting the constant $\epsilon_0$. This constant links the electric field to the displacement current, just as $\mu_0$ links current to the magnetic field.

### Step 6: The Ampere-Maxwell Law

*   **Plain-English Statement:** To fix the inconsistency, Maxwell added the displacement current term to Ampere's original law. The complete law, now called the Ampere-Maxwell Law, states that the circulation of the magnetic field around a loop is proportional to *both* the conduction current enclosed by the loop *and* the displacement current passing through any surface bounded by that loop.
*   **Small Concrete Example:** Going back to our charging capacitor. For surface $S_1$ (passing through the wire), $I_{enc}$ is the conduction current $I$, and $I_D$ is zero (because the electric field isn't changing significantly in the wire). So, $\oint_C \vec{B} \cdot d\vec{l} = \mu_0 I$.
    For surface $S_2$ (passing between the capacitor plates), $I_{enc}$ is zero (no conduction current), but $I_D = \epsilon_0 \frac{d\Phi_E}{dt}$ is non-zero (because the electric field is changing). And as we saw in Step 3, this $I_D$ is exactly equal to the conduction current $I$ flowing into the capacitor. So, $\oint_C \vec{B} \cdot d\vec{l} = \mu_0 (0 + I_D) = \mu_0 I$.
    The Ampere-Maxwell Law now gives a consistent result for both surfaces!
*   **Formal/Mathematical Version:**
    $$ \oint_C \vec{B} \cdot d\vec{l} = \mu_0 (I_{enc} + I_D) = \mu_0 I_{enc} + \mu_0 \epsilon_0 \frac{d\Phi_E}{dt} $$
    This is the integral form of the Ampere-Maxwell Law.
*   **What Could Go Wrong:** Only considering one type of current (conduction or displacement) when both might be present or relevant. It's the *sum* of both that matters.

### Step 7: Differential Form of the Ampere-Maxwell Law

*   **Plain-English Statement:** The integral form describes what happens over a finite loop and surface. The differential form describes what happens at a single point in space. It says that the "curl" (or rotational effect) of the magnetic field at a point is caused by both the conduction current density and the rate of change of the electric field at that same point.
*   **Formal/Mathematical Version:**
    Starting from the integral form and applying Stokes' Theorem ($\oint_C \vec{B} \cdot d\vec{l} = \iint_S (\nabla \times \vec{B}) \cdot d\vec{A}$) and using $I_{enc} = \iint_S \vec{J} \cdot d\vec{A}$ and $I_D = \epsilon_0 \frac{d}{dt} \iint_S \vec{E} \cdot d\vec{A} = \iint_S \left(\epsilon_0 \frac{\partial \vec{E}}{\partial t}\right) \cdot d\vec{A}$, we can equate the integrands:
    $$ \nabla \times \vec{B} = \mu_0 \vec{J} + \mu_0 \epsilon_0 \frac{\partial \vec{E}}{\partial t} $$
    Here, $\vec{J}$ is the conduction current density (current per unit area), and the term $\epsilon_0 \frac{\partial \vec{E}}{\partial t}$ is known as the **displacement current density** ($\vec{J}_D$).
*   **What Could Go Wrong:** Confusing the integral form (for macroscopic loops/surfaces) with the differential form (for points in space). Both describe the same physics but at different scales.

## 5. Worked examples — multiple, with every step shown

### Example 1: Calculating Displacement Current in a Capacitor

**Problem Statement:** A parallel-plate capacitor with circular plates of radius $R = 5 \text{ cm}$ is being charged by a current $I = 0.2 \text{ A}$. What is the displacement current $I_D$ between the plates? Assume the electric field is uniform between the plates and zero outside.

**Given:**
*   Radius of plates, $R = 5 \text{ cm} = 0.05 \text{ m}$
*   Conduction current, $I = 0.2 \text{ A}$

**Want:** Displacement current $I_D$.

**Solution:**

1.  **Understand the setup:** We have a charging capacitor. Current $I$ flows into one plate, and an equal current $I$ flows out of the other. Between the plates, there is no conduction current.
2.  **Apply charge conservation:** The rate at which charge accumulates on one plate is equal to the conduction current flowing into it.
    $$ I = \frac{dQ}{dt} $$
    *This step connects the conduction current in the wire to the charge accumulation on the capacitor plate.*
3.  **Relate charge to electric field:** For a parallel-plate capacitor, the charge $Q$ on a plate is related to the electric field $E$ between the plates by Gauss's Law: $Q = \epsilon_0 A E$, where $A$ is the area of the plates.
    $$ Q = \epsilon_0 A E $$
    *This formula tells us how much charge is stored for a given electric field, considering the plate area.*
4.  **Substitute Q into the current equation:**
    $$ I = \frac{d}{dt}(\epsilon_0 A E) $$
    *We're now expressing the conduction current in terms of the changing electric field.*
5.  **Factor out constants:** Since $\epsilon_0$ and the plate area $A$ are constant, we can pull them out of the derivative.
    $$ I = \epsilon_0 A \frac{dE}{dt} $$
    *This simplifies the expression, showing that current is proportional to the rate of change of the electric field.*
6.  **Recognize electric flux:** The electric flux $\Phi_E$ through the area $A$ between the plates is $\Phi_E = E A$ (since $\vec{E}$ is uniform and perpendicular to the plates).
    $$ I = \epsilon_0 \frac{d\Phi_E}{dt} $$
    *This step directly relates the conduction current to the rate of change of electric flux.*
7.  **Define displacement current:** By definition, the displacement current $I_D$ is given by:
    $$ I_D = \epsilon_0 \frac{d\Phi_E}{dt} $$
    *This is the formal definition of displacement current.*
8.  **Equate conduction and displacement current:** Comparing the last two steps, we see that for a charging capacitor, the conduction current $I$ in the wires is exactly equal to the displacement current $I_D$ between the plates.
    $$ I_D = I $$
9.  **Calculate the value:**
    $$ I_D = 0.2 \text{ A} $$

**Final Answer:**
$$ \boxed{I_D = 0.2 \text{ A}} $$

*Reflection:* This example highlights the crucial point that for a charging capacitor, the displacement current between the plates *completes the circuit* for the conduction current in the wires, ensuring consistency of Ampere's Law. The trick here is recognizing the direct equality between $I$ and $I_D$ in this specific scenario.

---

### Example 2: Magnetic Field Between Capacitor Plates

**Problem Statement:** A parallel-plate capacitor with circular plates of radius $R = 10 \text{ cm}$ is charging. The electric field between the plates is uniform and increasing at a rate of $\frac{dE}{dt} = 1.0 \times 10^6 \text{ V/(m s)}$. Find the magnitude of the magnetic field $\vec{B}$ at a point $r = 5 \text{ cm}$ from the central axis, *between* the plates.

**Given:**
*   Radius of plates, $R = 10 \text{ cm} = 0.1 \text{ m}$
*   Rate of change of electric field, $\frac{dE}{dt} = 1.0 \times 10^6 \text{ V/(m s)}$
*   Distance from axis, $r = 5 \text{ cm} = 0.05 \text{ m}$
*   Permittivity of free space, $\epsilon_0 = 8.854 \times 10^{-12} \text{ F/m}$
*   Permeability of free space, $\mu_0 = 4\pi \times 10^{-7} \text{ T m/A}$

**Want:** Magnetic field magnitude $B$ at $r = 0.05 \text{ m}$.

**Solution:**

1.  **Identify the relevant law:** Since we are looking for a magnetic field generated by a changing electric field, we need the Ampere-Maxwell Law. Between the plates, there is no conduction current ($\vec{J} = 0$).
    $$ \oint_C \vec{B} \cdot d\vec{l} = \mu_0 I_{enc} + \mu_0 \epsilon_0 \frac{d\Phi_E}{dt} $$
    Since $I_{enc} = 0$ between the plates:
    $$ \oint_C \vec{B} \cdot d\vec{l} = \mu_0 \epsilon_0 \frac{d\Phi_E}{dt} $$
    *This is the specific form of the Ampere-Maxwell law applicable to the region between the plates, where only displacement current is present.*
2.  **Choose an Amperean loop:** Due to the circular symmetry of the plates and the uniform electric field, the magnetic field lines will be concentric circles around the central axis. We choose a circular Amperean loop $C$ of radius $r$ centered on the axis, lying between the plates.
    *This choice simplifies the line integral $\oint \vec{B} \cdot d\vec{l}$ because $\vec{B}$ will be tangential and constant in magnitude along the loop.*
3.  **Evaluate the left side of Ampere-Maxwell Law:**
    $$ \oint_C \vec{B} \cdot d\vec{l} = B \cdot (2\pi r) $$
    *The line integral simplifies to $B$ times the circumference of the loop.*
4.  **Calculate the electric flux $\Phi_E$:** The electric field $\vec{E}$ is uniform and perpendicular to the surface of the Amperean loop. The surface $S$ bounded by our loop $C$ is a disk of radius $r$.
    $$ \Phi_E = \iint_S \vec{E} \cdot d\vec{A} = E \cdot (\text{Area of loop}) = E \cdot (\pi r^2) $$
    *Electric flux is simply the electric field magnitude times the area it passes through.*
5.  **Calculate the rate of change of electric flux:**
    $$ \frac{d\Phi_E}{dt} = \frac{d}{dt}(E \pi r^2) = \pi r^2 \frac{dE}{dt} $$
    *Since $r$ is constant for our chosen loop, only $E$ changes with time.*
6.  **Substitute into the Ampere-Maxwell Law:**
    $$ B (2\pi r) = \mu_0 \epsilon_0 \left(\pi r^2 \frac{dE}{dt}\right) $$
    *Now we have an equation with $B$ on one side and known quantities on the other.*
7.  **Solve for $B$:**
    $$ B = \frac{\mu_0 \epsilon_0 \pi r^2 \frac{dE}{dt}}{2\pi r} $$
    $$ B = \frac{\mu_0 \epsilon_0 r}{2} \frac{dE}{dt} $$
    *This gives us a formula for the magnetic field at any radius $r$ inside the capacitor plates.*
8.  **Plug in the given values:**
    $$ B = \frac{(4\pi \times 10^{-7} \text{ T m/A}) (8.854 \times 10^{-12} \text{ F/m}) (0.05 \text{ m})}{2} (1.0 \times 10^6 \text{ V/(m s)}) $$
    $$ B = (2\pi \times 10^{-7}) (8.854 \times 10^{-12}) (0.05) (1.0 \times 10^6) \text{ T} $$
    $$ B \approx 2.78 \times 10^{-12} \text{ T} $$

**Final Answer:**
$$ \boxed{B \approx 2.78 \times 10^{-12} \text{ T}} $$

*Reflection:* This example shows how a changing electric field *directly* generates a magnetic field. The key is to correctly identify that only the displacement current term contributes between the plates and to choose an appropriate Amperean loop and surface for calculation. It's also important to note that the magnetic field here is quite small, but it's real and fundamental.

---

### Example 3: Magnetic Field Outside a Charging Capacitor

**Problem Statement:** A parallel-plate capacitor with circular plates of radius $R = 10 \text{ cm}$ is charging with a constant current $I = 0.5 \text{ A}$. Calculate the magnetic field $\vec{B}$ at a point $r = 15 \text{ cm}$ from the central axis, *outside* the capacitor plates.

**Given:**
*   Radius of plates, $R = 10 \text{ cm} = 0.1 \text{ m}$
*   Conduction current, $I = 0.5 \text{ A}$
*   Distance from axis, $r = 15 \text{ cm} = 0.15 \text{ m}$
*   Permeability of free space, $\mu_0 = 4\pi \times 10^{-7} \text{ T m/A}$

**Want:** Magnetic field magnitude $B$ at $r = 0.15 \text{ m}$.

**Solution:**

1.  **Identify the relevant law:** We need the Ampere-Maxwell Law.
    $$ \oint_C \vec{B} \cdot d\vec{l} = \mu_0 I_{enc} + \mu_0 \epsilon_0 \frac{d\Phi_E}{dt} $$
    *This is the full form of the Ampere-Maxwell law, as we need to consider both conduction and displacement currents.*
2.  **Choose an Amperean loop:** Due to symmetry, the magnetic field lines will be concentric circles. We choose a circular Amperean loop $C$ of radius $r$ centered on the axis, *outside* the capacitor plates.
    *This choice simplifies the line integral.*
3.  **Evaluate the left side of Ampere-Maxwell Law:**
    $$ \oint_C \vec{B} \cdot d\vec{l} = B \cdot (2\pi r) $$
    *Same as before, $B$ times circumference.*
4.  **Consider the conduction current $I_{enc}$:** The Amperean loop of radius $r = 0.15 \text{ m}$ encloses the wire carrying current $I = 0.5 \text{ A}$. So,
    $$ I_{enc} = I = 0.5 \text{ A} $$
    *The full conduction current leading to the capacitor passes through the surface bounded by our loop.*
5.  **Consider the displacement current $I_D = \epsilon_0 \frac{d\Phi_E}{dt}$:**
    The surface $S$ bounded by our Amperean loop (a disk of radius $r$) extends *beyond* the capacitor plates. The electric field $\vec{E}$ exists *only* between the capacitor plates (within radius $R$). Therefore, the electric flux $\Phi_E$ through our chosen surface $S$ is only due to the electric field within the capacitor's area $A_{capacitor} = \pi R^2$.
    $$ \Phi_E = E \cdot (\text{Area of capacitor plate}) = E \cdot (\pi R^2) $$
    Now, we need to find $\frac{d\Phi_E}{dt}$. We know that for a charging capacitor, the conduction current $I$ is related to the rate of change of electric flux through the capacitor plates:
    $$ I = \epsilon_0 \frac{d\Phi_E}{dt} $$
    (This was established in Example 1, where $I_D = I$ for the capacitor region).
    So, the displacement current *effectively* passing through our Amperean loop (via the capacitor plates) is:
    $$ I_D = \epsilon_0 \frac{d\Phi_E}{dt} = I = 0.5 \text{ A} $$
    *This is the crucial step: the displacement current *between the plates* is equal to the conduction current in the wire. When our Amperean loop is outside the capacitor, it encloses the *entire* displacement current that would flow between the plates if we chose a surface that went through the gap.*
6.  **Substitute into the Ampere-Maxwell Law:**
    $$ B (2\pi r) = \mu_0 (I_{enc} + I_D) $$
    $$ B (2\pi r) = \mu_0 (I + I) $$
    $$ B (2\pi r) = \mu_0 (2I) $$
    *Wait! This is a common trap. The formulation $\mu_0 (I_{enc} + I_D)$ means the total effective current passing through the *surface bounded by the loop*. If the surface chosen passes through the wire *before* the capacitor, $I_{enc}$ is $I$ and $I_D$ is $0$. If the surface chosen passes *through* the capacitor, $I_{enc}$ is $0$ and $I_D$ is $I$. The Ampere-Maxwell law ensures consistency.
    For our loop *outside* the capacitor, we can choose a flat surface $S$ that cuts *through the wire* and *not* through the capacitor gap. In this case, the *entire* conduction current $I$ passes through $S$, and there is no changing electric field passing through this surface $S$ to create displacement current. So, $I_{enc} = I$ and $I_D = 0$.
    Alternatively, we could choose a surface $S'$ that passes through the capacitor gap. For this surface, $I_{enc} = 0$, but $I_D = I$.
    The result must be the same. Let's use the surface that passes through the wire (this is usually simpler for loops outside the capacitor).
    $$ B (2\pi r) = \mu_0 I $$
    *The magnetic field outside the capacitor is determined by the conduction current in the wire, just like for a continuous wire. The displacement current ensures that the field outside is consistent with the field inside.*
7.  **Solve for $B$:**
    $$ B = \frac{\mu_0 I}{2\pi r} $$
8.  **Plug in the given values:**
    $$ B = \frac{(4\pi \times 10^{-7} \text{ T m/A}) (0.5 \text{ A})}{2\pi (0.15 \text{ m})} $$
    $$ B = \frac{2 \times 10^{-7} \times 0.5}{0.15} \text{ T} $$
    $$ B = \frac{1 \times 10^{-7}}{0.15} \text{ T} $$
    $$ B \approx 6.67 \times 10^{-7} \text{ T} $$

**Final Answer:**
$$ \boxed{B \approx 6.67 \times 10^{-7} \text{ T}} $$

*Reflection:* This example is tricky because the choice of surface matters for *identifying* $I_{enc}$ and $I_D$, but the *total* current $(I_{enc} + I_D)$ must be consistent. For a loop outside the capacitor, it is often easiest to choose a surface that entirely encloses the conduction current in the wire *before* it reaches the capacitor, in which case $I_D$ through that surface is zero. The Ampere-Maxwell law *resolves* the problem of surface dependence, ensuring that the magnetic field outside the capacitor is the same as if the conduction current were continuous.

---

### Example 4: Consistency with the Continuity Equation

**Problem Statement:** Show that the Ampere-Maxwell Law in its differential form, $\nabla \times \vec{B} = \mu_0 \vec{J} + \mu_0 \epsilon_0 \frac{\partial \vec{E}}{\partial t}$, is consistent with the charge continuity equation, $\nabla \cdot \vec{J} = -\frac{\partial \rho}{\partial t}$. (Hint: Take the divergence of the Ampere-Maxwell Law).

**Given:**
*   Ampere-Maxwell Law (differential form): $\nabla \times \vec{B} = \mu_0 \vec{J} + \mu_0 \epsilon_0 \frac{\partial \vec{E}}{\partial t}$
*   Continuity Equation: $\nabla \cdot \vec{J} = -\frac{\partial \rho}{\partial t}$
*   Gauss's Law for Electric Fields (differential form): $\nabla \cdot \vec{E} = \frac{\rho}{\epsilon_0}$

**Want:** To show consistency.

**Solution:**

1.  **Start with the Ampere-Maxwell Law:**
    $$ \nabla \times \vec{B} = \mu_0 \vec{J} + \mu_0 \epsilon_0 \frac{\partial \vec{E}}{\partial t} $$
    *This is the equation we need to test for consistency.*
2.  **Take the divergence of both sides:** The divergence of the curl of any vector field is always zero ($\nabla \cdot (\nabla \times \vec{F}) = 0$).
    $$ \nabla \cdot (\nabla \times \vec{B}) = \nabla \cdot \left(\mu_0 \vec{J} + \mu_0 \epsilon_0 \frac{\partial \vec{E}}{\partial t}\right) $$
    *This is a standard vector calculus identity that simplifies the left side.*
3.  **Simplify the left side:**
    $$ 0 = \nabla \cdot \left(\mu_0 \vec{J} + \mu_0 \epsilon_0 \frac{\partial \vec{E}}{\partial t}\right) $$
    *The divergence of the curl is zero.*
4.  **Distribute the divergence operator on the right side:**
    $$ 0 = \mu_0 (\nabla \cdot \vec{J}) + \mu_0 \epsilon_0 \nabla \cdot \left(\frac{\partial \vec{E}}{\partial t}\right) $$
    *The divergence operator is linear.*
5.  **Interchange derivative order:** For well-behaved fields, the spatial and temporal derivatives can be interchanged: $\nabla \cdot \left(\frac{\partial \vec{E}}{\partial t}\right) = \frac{\partial}{\partial t} (\nabla \cdot \vec{E})$.
    $$ 0 = \mu_0 (\nabla \cdot \vec{J}) + \mu_0 \epsilon_0 \frac{\partial}{\partial t} (\nabla \cdot \vec{E}) $$
    *This step is crucial to link to Gauss's Law.*
6.  **Substitute Gauss's Law for Electric Fields:** From Gauss's Law in differential form, we know $\nabla \cdot \vec{E} = \frac{\rho}{\epsilon_0}$.
    $$ 0 = \mu_0 (\nabla \cdot \vec{J}) + \mu_0 \epsilon_0 \frac{\partial}{\partial t} \left(\frac{\rho}{\epsilon_0}\right) $$
    *We're now introducing the charge density $\rho$.*
7.  **Simplify the second term:** The $\epsilon_0$ terms cancel out.
    $$ 0 = \mu_0 (\nabla \cdot \vec{J}) + \mu_0 \frac{\partial \rho}{\partial t} $$
    *The equation is getting simpler.*
8.  **Divide by $\mu_0$ (since $\mu_0 \neq 0$):**
    $$ 0 = \nabla \cdot \vec{J} + \frac{\partial \rho}{\partial t} $$
    *This is the final step, revealing the continuity equation.*
9.  **Rearrange to match the continuity equation:**
    $$ \nabla \cdot \vec{J} = -\frac{\partial \rho}{\partial t} $$
    *This is exactly the charge continuity equation.*

**Final Answer:**
The derivation shows that starting from the Ampere-Maxwell Law and taking its divergence leads directly to the charge continuity equation. This demonstrates that **the Ampere-Maxwell Law is consistent with the principle of charge conservation.**

*Reflection:* This example is more theoretical but profoundly important. It shows that Maxwell's addition of the displacement current term was not just an ad-hoc fix but a necessary one to ensure that Ampere's Law (now the Ampere-Maxwell Law) is fundamentally consistent with charge conservation, one of the cornerstones of physics. Without the displacement current term, the original Ampere's Law would imply that charge is not conserved for time-varying fields.

## 6. Common mistakes and traps

1.  **Confusing Conduction Current ($\vec{J}$) with Displacement Current Density ($\vec{J}_D$):** Conduction current involves the physical movement of charges, while displacement current is due to a changing electric field, with no actual charge transport. They both contribute to magnetic fields but are fundamentally different phenomena.
2.  **Forgetting $\epsilon_0$ or $\mu_0$:** These fundamental constants are crucial for relating electric and magnetic fields and currents. Omitting them or using them incorrectly is a common error in calculations.
3.  **Incorrectly Identifying the Surface for Flux Calculation:** When using the integral form of Ampere-Maxwell's Law, the choice of the surface $S$ bounded by the Amperean loop $C$ is critical for determining $I_{enc}$ and $\Phi_E$. Students often forget that $I_{enc}$ is the conduction current *through the chosen surface*, and $\Phi_E$ is the electric flux *through the chosen surface*.
4.  **Applying Original Ampere's Law to Time-Varying Fields:** The original Ampere's Law ($\oint \vec{B} \cdot d\vec{l} = \mu_0 I_{enc}$) is only valid for steady currents. For any situation where electric fields are changing (e.g., charging capacitors, electromagnetic waves), the displacement current term *must* be included.
5.  **Sign Errors in Time Derivatives:** Pay close attention to the direction of electric field change and its impact on the sign of $d\Phi_E/dt$. An increasing electric field will have a positive derivative, while a decreasing field will have a negative one.
6.  **Assuming Displacement Current is Always Equal to Conduction Current:** While this is true for a simple charging capacitor (between the plates), it's not universally true. The total current in Ampere-Maxwell's law is the sum of conduction current *through the surface* and displacement current *through the surface*. Depending on the surface choice, one term might be zero while the other is non-zero, or both might contribute.

## 7. Textbook-precise explanation

The concept of displacement current was introduced by James Clerk Maxwell to resolve an inconsistency in Ampere's Law when applied to time-varying electric fields, specifically concerning the conservation of charge.

**Original Ampere's Law (Integral Form):**
$$ \oint_C \vec{B} \cdot d\vec{l} = \mu_0 I_{enc} $$
This law states that the line integral of the magnetic field $\vec{B}$ around any closed loop $C$ is proportional to the total conduction current $I_{enc}$ passing through any surface $S$ bounded by $C$.

**The Inconsistency:**
The original Ampere's Law, in its differential form (derived using Stokes' Theorem, $\nabla \times \vec{B} = \mu_0 \vec{J}$), implies that $\nabla \cdot (\nabla \times \vec{B}) = 0$. Therefore, $\nabla \cdot (\mu_0 \vec{J}) = 0$, which means $\nabla \cdot \vec{J} = 0$. This condition, $\nabla \cdot \vec{J} = 0$, is the continuity equation for steady currents, meaning that current is conserved and no charge accumulates or depletes at any point. However, for time-varying fields, the true continuity equation is $\nabla \cdot \vec{J} = -\frac{\partial \rho}{\partial t}$, where $\rho$ is the charge density. This equation allows for charge accumulation (e.g., on capacitor plates). The original Ampere's Law is thus inconsistent with charge conservation for non-steady currents.

**Maxwell's Addition — Displacement Current:**
To resolve this, Maxwell proposed adding a new term to Ampere's Law. He reasoned that a changing electric flux should also act as a source of magnetic field, analogous to how a changing magnetic flux induces an electric field (Faraday's Law).
From Gauss's Law for Electric Fields, $\nabla \cdot \vec{E} = \frac{\rho}{\epsilon_0}$. Taking the time derivative:
$$ \frac{\partial}{\partial t}(\nabla \cdot \vec{E}) = \frac{1}{\epsilon_0} \frac{\partial \rho}{\partial t} $$
Interchanging derivatives:
$$ \nabla \cdot \left(\frac{\partial \vec{E}}{\partial t}\right) = \frac{1}{\epsilon_0} \frac{\partial \rho}{\partial t} $$
From the continuity equation, $\frac{\partial \rho}{\partial t} = -\nabla \cdot \vec{J}$. Substituting this:
$$ \nabla \cdot \left(\frac{\partial \vec{E}}{\partial t}\right) = -\frac{1}{\epsilon_0} (\nabla \cdot \vec{J}) $$
Rearranging:
$$ \nabla \cdot \left(\vec{J} + \epsilon_0 \frac{\partial \vec{E}}{\partial t}\right) = 0 $$
This suggests that the total "current" density, $\vec{J}_{total} = \vec{J} + \epsilon_0 \frac{\partial \vec{E}}{\partial t}$, is divergenceless, thus satisfying the continuity equation for all cases. Maxwell identified the second term as the **displacement current density**:
$$ \vec{J}_D = \epsilon_0 \frac{\partial \vec{E}}{\partial t} $$
The total displacement current $I_D$ through a surface $S$ is the integral of this density:
$$ I_D = \iint_S \vec{J}_D \cdot d\vec{A} = \iint_S \left(\epsilon_0 \frac{\partial \vec{E}}{\partial t}\right) \cdot d\vec{A} = \epsilon_0 \frac{d}{dt} \iint_S \vec{E} \cdot d\vec{A} = \epsilon_0 \frac{d\Phi_E}{dt} $$

**Ampere-Maxwell Law (Integral Form):**
Including this displacement current term, Ampere's Law becomes:
$$ \oint_C \vec{B} \cdot d\vec{l} = \mu_0 I_{enc} + \mu_0 I_D $$
$$ \oint_C \vec{B} \cdot d\vec{l} = \mu_0 I_{enc} + \mu_0 \epsilon_0 \frac{d\Phi_E}{dt} $$

**Ampere-Maxwell Law (Differential Form):**
Applying Stokes' Theorem and replacing $I_{enc}$ with $\iint_S \vec{J} \cdot d\vec{A}$:
$$ \nabla \times \vec{B} = \mu_0 \vec{J} + \mu_0 \epsilon_0 \frac{\partial \vec{E}}{\partial t} $$
This is one of Maxwell's four fundamental equations of electromagnetism. It demonstrates that not only do conduction currents ($\vec{J}$) produce magnetic fields, but also time-varying electric fields ($\frac{\partial \vec{E}}{\partial t}$) produce magnetic fields. This critical addition completed the framework for electromagnetic theory, predicting the existence of electromagnetic waves.

*References:*
*   Griffiths, David J. *Introduction to Electrodynamics*. 4th ed., Pearson, 2013, Ch. 7.3.4.
*   Jackson, John David. *Classical Electrodynamics*. 3rd ed., Wiley, 1998, Ch. 6.3.
*   Purcell, Edward M., and David J. Morin. *Electricity and Magnetism*. 3rd ed., Cambridge University Press, 2013, Ch. 10.4.

## 8. ASCII diagrams

```text
       Charging Capacitor Circuit with Amperean Loops

                      +---------------------+
                      |                     |
                      |  _ _ _ _ _ _ _ _ _  |  <-- Wire
                      | |                   |
  Current I --------->| |  Amperean Loop C  |
                      | |                   |
                      | |_ _ _ _ _ _ _ _ _ _|
                      |          (S1)       |
                      |                     |
                      +---------------------+
                         |      |
                         |      |
                         |      |
                         |      |  <-- Conduction current I (J)
                         |      |
                         |      |
                         |      |
                 +-------+------+-------+
                 |       |      |       |
                 |       |      |       |  <-- Capacitor plates
                 |       |      |       |
                 |       |      |       |
                 +-------+------+-------+
                         |      |
                         |      |
                         |      |  <-- Region between plates
                         |      |      (changing E-field)
                         |      |      (Displacement current ID)
                         |      |
                         |      |
                         +------+
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                         |      |
                      (S2)         ^
                                   |
                                   |  <-- E-field (changing)
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
                                   |
