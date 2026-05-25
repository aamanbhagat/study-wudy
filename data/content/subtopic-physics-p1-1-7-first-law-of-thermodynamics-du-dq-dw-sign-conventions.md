## What it is
The first law of thermodynamics is a statement of the conservation of energy for a thermodynamic system. It states that the change in a system's internal energy, $dU$, is equal to the heat added to the system, $dQ$, minus the work done by the system, $dW$. This law connects the macroscopic concepts of heat and work to the microscopic internal energy of the system.

## Why it matters
This law is the fundamental energy balance equation for any engine or power-generating system. In rocket science, it governs how the chemical energy released as heat during combustion is converted into the mechanical work of expelling exhaust gases at high velocity, generating thrust. In computer science, understanding energy transformations is crucial for designing energy-efficient processors, as every logical operation ultimately dissipates heat, a process constrained by this law.

## When to study it
Before tackling this, you must have a solid grasp of:
1.  **Basic Calculus:** Specifically, the concept of differentials ($dx, dy$) and definite integrals ($\int_{a}^{b} f(x) dx$).
2.  **Mechanical Work:** The definition of work as $W = \int \vec{F} \cdot d\vec{s}$.
3.  **Energy Conservation:** The principle that energy cannot be created or destroyed, only transformed from one form to another.
4.  **System and Surroundings:** The ability to define a boundary around an object of study (the "system") and everything else (the "surroundings").

If you are not comfortable with these, review them first. Proceeding without them will lead to confusion.

## How to study it (step by step)
1.  **Define the System:** Draw a box. Label the inside "System" and the outside "Surroundings." All energy transfers happen across the boundary of this box. This is your mental model for every problem.
2.  **Define Internal Energy, $U$:** Recognize that a system (e.g., a gas in a box) has internal energy. This is the sum of all the microscopic kinetic and potential energies of its constituent particles. $U$ is a *state function*—it depends only on the system's current state (e.g., its temperature and pressure), not on how it got there.
3.  **Define Heat, $Q$:** Understand heat as energy transferred across the system boundary due to a temperature difference. It is energy *in transit*. By convention, $dQ > 0$ when heat flows *into* the system.
4.  **Define Work, $W$:** Understand work as energy transferred across the boundary by mechanical means. For a gas expanding against a piston, derive the expression for work. If a gas at pressure $P$ expands and moves a piston of area $A$ by a distance $ds$, the force is $F=PA$. The infinitesimal work done is $dW = F ds = (PA)ds = P(A ds)$. Since $A ds$ is the infinitesimal change in volume $dV$, we have $dW = P dV$. By convention, $dW > 0$ when work is done *by* the system (e.g., it expands).
5.  **Assemble the Law:** Combine these concepts using conservation of energy. The change in the system's internal energy ($dU$) must equal the net energy that entered it. Energy enters as heat ($dQ$) and leaves as work ($dW$). Therefore, $dU = dQ - dW$.
6.  **Drill the Sign Convention:** Create a table for yourself.
    | Quantity | Positive (+) meaning         | Negative (-) meaning          |
    | :------- | :--------------------------- | :---------------------------- |
    | $dQ$     | Heat added *to* the system   | Heat removed *from* the system|
    | $dW$     | Work done *by* the system    | Work done *on* the system     |
    | $dU$     | Internal energy *increases*  | Internal energy *decreases*   |
7.  **Solve Problems:** Apply the law to the four basic processes:
    *   **Isochoric (constant volume):** $dV=0 \implies dW=0 \implies dU=dQ$.
    *   **Isobaric (constant pressure):** $W = P \Delta V$.
    *   **Isothermal (constant temperature):** For an ideal gas, $U$ depends only on $T$, so $dU=0 \implies dQ=dW$.
    *   **Adiabatic (no heat transfer):** $dQ=0 \implies dU = -dW$.

## Key ideas, with intuition
1.  **It's just an energy budget.** Think of the system's internal energy $U$ as a bank account. Heat added ($dQ$) is a deposit. Work done by the system ($dW$) is an expenditure. The change in your balance ($dU$) is deposits minus expenditures: $dU = dQ - dW$.
2.  **The signs are from the system's perspective.** Everything is defined relative to the system. Does the system *gain* heat? $dQ$ is positive. Does the system *do* work (spend energy)? $dW$ is positive. This is the standard convention in physics and engineering. Be aware that some chemistry texts define $W$ as work done *on* the system, which flips the sign. We will not use that convention.
3.  **Work is expansion.** The primary way a simple thermodynamic system does work is by expanding. If a gas expands ($dV > 0$), it pushes on its surroundings, doing work, so $dW = P dV$ is positive. If it is compressed ($dV < 0$), the surroundings do work on it, and $dW$ is negative.
4.  **State vs. Process Functions.** Internal energy $U$ is a *state function*. Its value depends only on the current state (T, P, V) of the system. Heat $Q$ and Work $W$ are *process functions* or *path functions*. They describe the energy transferred *during* a process and depend on the specific path taken between states. This is why we write $dU$ (an exact differential) but $dQ$ and $dW$ (inexact differentials, sometimes written $\delta Q$ and $\delta W$)—the amount of heat and work depend on the journey, but the change in internal energy only depends on the start and end points.

## Worked example
**Problem:** A cylinder contains a gas sealed by a piston. The gas is heated, causing it to expand at a constant pressure of $200 \text{ kPa}$. The piston moves, and the volume of the gas increases from $0.001 \text{ m}^3$ to $0.003 \text{ m}^3$. During this process, $1000 \text{ J}$ of heat is added to the gas. What is the change in the internal energy of the gas?

**Solution:**
1.  **Identify the given information:**
    *   Constant pressure, $P = 200 \text{ kPa} = 200 \times 10^3 \text{ Pa}$.
    *   Initial volume, $V_1 = 0.001 \text{ m}^3$.
    *   Final volume, $V_2 = 0.003 \text{ m}^3$.
    *   Heat added to the system, $Q = +1000 \text{ J}$. The sign is positive because heat is *added to* the system.

2.  **State the goal:** Find the change in internal energy, $\Delta U$.

3.  **Write down the relevant formula:** The first law of thermodynamics in its integrated form is $\Delta U = Q - W$.

4.  **Calculate the work done, $W$:** The process occurs at constant pressure, so the work done *by* the system is $W = \int_{V_1}^{V_2} P dV = P \int_{V_1}^{V_2} dV = P(V_2 - V_1)$.
    *   $W = (200 \times 10^3 \text{ Pa}) \times (0.003 \text{ m}^3 - 0.001 \text{ m}^3)$
    *   $W = (2 \times 10^5 \text{ Pa}) \times (0.002 \text{ m}^3)$
    *   $W = 400 \text{ Pa} \cdot \text{m}^3 = 400 \text{ J}$.
    *   The sign is positive, which makes sense because the gas expanded ($V_2 > V_1$), doing work on its surroundings.

5.  **Calculate $\Delta U$ using the first law:**
    *   $\Delta U = Q - W$
    *   $\Delta U = 1000 \text{ J} - 400 \text{ J}$
    *   $\Delta U = 600 \text{ J}$.

**Reflection:**
*   Step 1 organized the data and established the sign of $Q$.
*   Step 4 correctly identified that for a constant-pressure (isobaric) process, the work integral simplifies to $P\Delta V$. We calculated the work done *by* the system.
*   Step 5 substituted the values for $Q$ and $W$ into the first law, respecting the signs, to find the final answer. The system gained 1000 J of heat but spent 400 J on work, so its internal energy increased by the remaining 600 J.

## Diagrams
A piston-cylinder system illustrating the sign conventions.

```text
      SURROUNDINGS
  <--------------------->
      +-------------+
      |             |
      |   SYSTEM    | ----> dQ > 0 (Heat IN)
      |   (Gas)     |
      |             |
      |-------------|
      |   Piston    | ----> dW = P dV > 0 (Work OUT, expansion)
      +-------------+         |
            ^                 V
            |___________Expansion_________>
```

## Memory technique — remember this forever
1.  **The Mnemonic Story: "The Selfish System"**
    *   Your system is a self-centered entity. Its only goal is to increase its internal energy, $U$.
    *   Heat added to it ($dQ$) is like getting paid. It's positive, it increases the system's wealth.
    *   Work it does on the outside world ($dW$) is like spending money. It's an expense, a loss of energy from the system's perspective. So we *subtract* it.
    *   The change in its internal wealth is its income minus its expenses: $dU = dQ - dW$.

2.  **Must-Memorize Formulas:**
    *   $dU = dQ - dW$ (The First Law)
    *   $dW = P dV$ (Work of expansion/compression for a simple system)

3.  **Spaced Repetition Schedule:**
    *   Review this entire lesson tomorrow (1 day).
    *   Then again in 3 days.
    *   Then in 7 days.
    *   Then in 16 days.
    *   Finally, in 35 days. Actively recall the mnemonic and re-derive the work formula each time.

4.  **First Principles Pathway:** If you forget the formula, rebuild it from the most fundamental concept: **Conservation of Energy**.
    *   Start with: `Change in System Energy = Energy In - Energy Out`.
    *   Identify the two ways energy can cross the boundary: Heat ($Q$) and Work ($W$).
    *   Define the signs from the system's perspective:
        *   `Energy In` is heat added, $Q_{in}$.
        *   `Energy Out` is heat lost, $Q_{out}$, AND work done by the system, $W_{by}$.
    *   So, $\Delta U = Q_{in} - Q_{out} - W_{by}$.
    *   Let the net heat be $Q = Q_{in} - Q_{out}$. Let the work done by the system be $W = W_{by}$.
    *   This gives $\Delta U = Q - W$. You have re-derived it.

## Common mistakes
1.  **Mixing up sign conventions.** This is the #1 error. Many chemistry courses use $dU = dQ + dW$, where $W$ is work done *on* the system. This is mathematically equivalent, but you *must* be consistent. For physics and engineering, always use $dU = dQ - dW$ where $W$ is work done *by* the system.
2.  **Assuming $\Delta U = Q$.** This is only true if no work is done ($W=0$), which happens in a constant-volume (isochoric) process. In general, some of the heat added can be used to do work.
3.  **Using $W = P\Delta V$ incorrectly.** This formula is only valid for a process at *constant pressure*. If the pressure changes during the process, you must evaluate the integral $W = \int P dV$.

## Self-check
1.  A system undergoes a process where it is compressed, and at the same time, heat is removed from it. What are the signs of $dW$, $dQ$, and (if possible to determine) $dU$?
2.  $500 \text{ J}$ of heat are added to a gas held in a rigid, sealed container. What is the change in the internal energy of the gas?
3.  A perfectly insulated cylinder is compressed, doing $200 \text{ J}$ of work on the gas inside. What is the change in the internal energy of the gas? What happens to its temperature?