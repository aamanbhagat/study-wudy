## What it is
Thermodynamic work is the energy transferred from a system (like a gas in a cylinder) to its surroundings, or vice versa, due to a change in volume. Specifically, we will derive the formula for the work done by a gas during expansion or on a gas during compression for four key processes: constant pressure (isobaric), constant volume (isochoric), constant temperature (isothermal), and no heat exchange (adiabatic).

## Why it matters
These derivations are the foundation of engine analysis. The power stroke in your car's engine is an adiabatic expansion, and the exhaust stroke is isobaric. For rocketry, analyzing the expansion of hot gas in a nozzle—which is modeled as an adiabatic process—is critical for calculating thrust and specific impulse.

## When to study it
You must be comfortable with these prerequisites. If not, master them first.
1.  **Differential and Integral Calculus:** Specifically, the concept of an integral as the area under a curve and how to evaluate definite integrals of simple functions like $f(x) = k$ and $f(x) = 1/x$.
2.  **The Ideal Gas Law:** You must know and understand $PV = nRT$.
3.  **Mechanical Work:** The definition of mechanical work as $W = \int \vec{F} \cdot d\vec{s}$.

## How to study it (step by step)
1.  **First Principles:** Start with a cylinder of cross-sectional area $A$ containing a gas at pressure $P$, pushing a piston a small distance $dx$. Derive the fundamental expression for a small amount of work, $dW = P dV$. Understand why this is the starting point for everything.
2.  **Isobaric Case:** Assume pressure $P$ is constant. Integrate $dW = P dV$ from an initial volume $V_1$ to a final volume $V_2$. This is the simplest case.
3.  **Isochoric Case:** Assume volume $V$ is constant. What does this imply for $dV$? Use the fundamental expression from step 1 to find the work done. This should be trivial.
4.  **Isothermal Case:** Assume temperature $T$ is constant. Use the ideal gas law to express pressure $P$ as a function of volume $V$ (i.e., $P(V) = nRT/V$). Substitute this into the integral $W = \int P dV$ and solve it.
5.  **Adiabatic Case:** This is the most complex. Start with the adiabatic relation $PV^\gamma = C$, where $C$ is a constant and $\gamma$ is the heat capacity ratio. Express $P$ as a function of $V$ (i.e., $P(V) = C/V^\gamma$), substitute into the work integral, and solve.
6.  **Visualize:** Draw all four processes starting from the same initial point $(V_1, P_1)$ on a P-V diagram. Compare the areas under each curve to visually understand which process yields the most work for a given expansion.

## Key ideas, with intuition
1.  **Work is an Area on a P-V Diagram.** This is the central intuition. The integral $W = \int_{V_1}^{V_2} P dV$ literally means "the area under the Pressure-Volume curve from volume $V_1$ to $V_2$." If a gas expands, it "pushes" the universe out of the way, performing work. The bigger the pressure it maintains during that expansion, the more work it does.
2.  **The Master Equation:** All derivations start from the same place. Consider a piston with area $A$. The force it exerts is $F = P_{ext} A$. If it moves a tiny distance $ds$, the work done is $dW = F ds = (P_{ext} A) ds$. Since $A \cdot ds$ is the change in volume $dV$, we get:
    $$
    dW = P_{ext} dV
    $$
    For a slow, reversible (quasi-static) process, the internal pressure $P$ of the gas is always in equilibrium with the external pressure $P_{ext}$, so we can simplify to $dW = P dV$. This is our starting point.
3.  **Work is Path-Dependent.** The amount of work done to get from state 1 to state 2 depends on the *path* taken on the P-V diagram. Expanding isothermally from $V_1$ to $V_2$ does a different amount of work than expanding adiabatically between the same two volumes, because the curves (the paths) are different. This is unlike internal energy or temperature, which are *state functions* that only depend on the start and end points.

## Worked example
**Problem:** One mole of an ideal gas expands isothermally at a constant temperature of $T = 300 \, \text{K}$ from an initial volume of $V_1 = 0.01 \, \text{m}^3$ to a final volume of $V_2 = 0.02 \, \text{m}^3$. Calculate the work done by the gas. Use $R = 8.314 \, \text{J/(mol·K)}$.

**Solution:**
1.  **State the first principle.** The work done $W$ by a gas is given by the integral of pressure with respect to volume.
    $$
    W = \int_{V_1}^{V_2} P dV
    $$
2.  **Identify the process.** The process is isothermal, meaning temperature $T$ is constant. For an ideal gas, this means we can use the ideal gas law to relate $P$ and $V$.
    $$
    PV = nRT
    $$
3.  **Express P as a function of V.** To perform the integration, we need the integrand $P$ to be a function of the integration variable $V$.
    $$
    P(V) = \frac{nRT}{V}
    $$
4.  **Substitute and set up the definite integral.** Place the expression for $P(V)$ into the work integral with the given limits.
    $$
    W = \int_{V_1}^{V_2} \frac{nRT}{V} dV
    $$
5.  **Solve the integral.** Since $n$, $R$, and $T$ are constants for this process, they can be pulled outside the integral.
    $$
    W = nRT \int_{V_1}^{V_2} \frac{1}{V} dV
    $$
    The integral of $1/V$ is $\ln(V)$.
    $$
    W = nRT \left[ \ln(V) \right]_{V_1}^{V_2} = nRT (\ln(V_2) - \ln(V_1))
    $$
    Using the logarithm property $\ln(a) - \ln(b) = \ln(a/b)$:
    $$
    W = nRT \ln\left(\frac{V_2}{V_1}\right)
    $$
6.  **Substitute numerical values.**
    $$
    W = (1 \, \text{mol}) \left(8.314 \, \frac{\text{J}}{\text{mol·K}}\right) (300 \, \text{K}) \ln\left(\frac{0.02 \, \text{m}^3}{0.01 \, \text{m}^3}\right)
    $$
    $$
    W = (2494.2) \ln(2) \approx (2494.2)(0.693) \approx 1729 \, \text{J}
    $$

**Reflection:** Each step followed a logical chain. We started with the universal definition of thermodynamic work (Step 1). The key was identifying the correct relationship between P and V for an isothermal process using the ideal gas law (Steps 2 & 3). This allowed us to perform the integration (Steps 4 & 5) and find the specific formula for this case, which we then evaluated (Step 6).

## Diagrams
Here is a P-V diagram showing the four common processes starting from an initial state $(V_1, P_1)$. The work done in each case is the area under the corresponding curve.

```text
      P (Pressure)
      ^
      |
  P1 -+ . . . . . . . (1) . . . . . . . . . . .
      | .`           / | \           ` .
      |  `.         /  |  \ Isothermal  `. Adiabatic
      |    `.      /   |   \ (T=const)   `. (Q=0)
      |      `.   /    |    ` .            `.
      |        ` /     |       ` .           ` .
      | Isochoric \    |          ` .           ` .
      | (V=const)  \   |             ` .           ` .
      |             \  +------------------. (2) Isobaric (P=const)
      |              ` . . . . . . . . . .` .
      |
      +-------------------------------------------> V (Volume)
                  V1
```
Notice the adiabatic curve is steeper than the isothermal curve. For an expansion to the same final volume, the isothermal process does more work than the adiabatic one because the pressure stays higher (heat is added to maintain temperature). The isobaric process does the most work, and the isochoric process does zero work.

## Memory technique — remember this forever
1.  **The Story:** Work is "Pushing against pressure over a volume." The formula $W = \int P dV$ captures this perfectly. Imagine a tiny piston movement $dV$. The work done is the pressure $P$ you pushed against times that small volume change. The integral $\int$ just sums up all these tiny pushes.
2.  **Must-Know Formulas:** Overlearn these until they are automatic.
    -   **Fundamental Definition:** $W = \int_{V_1}^{V_2} P dV$ (Work done *by* the system)
    -   **Isobaric (P=C):** $W = P(V_2 - V_1)$
    -   **Isothermal (T=C, Ideal Gas):** $W = nRT \ln(V_2/V_1)$
3.  **Spaced Repetition Schedule:**
    -   Review this entire lesson and re-derive the formulas in **1 day**.
    -   Do a practice problem for each process in **3 days**.
    -   Re-derive the adiabatic formula from scratch in **7 days**.
    -   Explain the P-V diagram to a friend (or a rubber duck) in **16 days**.
    -   Do a mixed-process problem (e.g., a full cycle) in **35 days**.
4.  **First Principles Pathway:** If you forget everything, remember this:
    -   Work is $W = \int P dV$.
    -   Ask: "What is the constraint on this process?"
    -   If Isobaric, $P$ is a constant, pull it out of the integral.
    -   If Isochoric, $V$ is constant, so $dV=0$, so $W=0$.
    -   If Isothermal, $T$ is constant. Use $P=nRT/V$ to substitute for $P$.
    -   If Adiabatic, $Q=0$. Use $PV^\gamma = \text{const}$ to substitute for $P$.
    You can rebuild every formula from just $W = \int P dV$ and the process definition.

## Common mistakes
1.  **Sign Convention Errors:** In physics (and this lesson), we define $W$ as the work done *by* the system on the surroundings. Thus, for an expansion ($V_2 > V_1$), $W$ is positive. For a compression ($V_2 < V_1$), $W$ is negative. Be aware that chemistry often uses the opposite convention. Stick to one and be consistent.
2.  **Applying Formulas Blindly:** A student might use $W = P(V_2 - V_1)$ for a process where pressure is clearly changing. Always check the conditions. The reason we have different formulas is that the relationship between $P$ and $V$ is different for each process.
3.  **Mixing up Isothermal and Adiabatic:** An adiabatic expansion does less work than an isothermal one between the same volumes because the gas cools down as it expands (its internal energy is used to do the work), so its pressure drops more quickly. Don't use the isothermal formula for an adiabatic process, or vice-versa. Look at the diagram to cement this.

## Self-check
1.  A gas expands at a constant pressure of $200 \, \text{kPa}$ from $1.5 \, \text{L}$ to $4.0 \, \text{L}$. How much work is done by the gas? (Watch your units).
2.  Two identical cylinders are filled with the same amount of ideal gas at the same initial state $(P_1, V_1)$. Cylinder A expands to volume $V_2$ isothermally. Cylinder B expands to the same volume $V_2$ adiabatically. Which cylinder does more work? Justify your answer by referencing the P-V diagram and the physical reason for the pressure difference.
3.  A system undergoes a three-stage process: (A) an isobaric compression from $(P_0, 2V_0)$ to $(P_0, V_0)$, then (B) an isochoric heating from $(P_0, V_0)$ to $(2P_0, V_0)$, and finally (C) it returns to the initial state via a path where pressure is a linear function of volume. Find the total work done *by* the system over the entire cycle.