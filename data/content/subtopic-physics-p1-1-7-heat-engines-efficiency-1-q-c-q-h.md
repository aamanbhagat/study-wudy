## What it is
A heat engine is a device that converts thermal energy into mechanical work by operating in a cycle. Its thermal efficiency, denoted by $\eta$ (eta), is the ratio of the net work it performs to the heat energy it absorbs from a high-temperature source. This ratio quantifies how effectively the engine transforms the heat it consumes into useful output.

## Why it matters
The efficiency of heat engines is a cornerstone of power generation and propulsion. Jet engines, internal combustion engines, and steam turbines in nuclear or fossil fuel power plants are all heat engines; their efficiency dictates fuel consumption and economic viability. Understanding this limit is also crucial in computer science, as Landauer's principle sets a thermodynamic lower bound on the energy required for computation, treating information erasure as a process with unavoidable heat dissipation.

## When to study it
Before tackling this, you must have a firm grasp of the following prerequisites. If any are shaky, review them first.
- **First Law of Thermodynamics:** You must understand $\Delta U = Q - W$, where $U$ is internal energy, $Q$ is net heat added to the system, and $W$ is net work done by the system.
- **Thermodynamic Processes:** You should know what isothermal (constant temperature), isobaric (constant pressure), isochoric (constant volume), and adiabatic (no heat exchange) processes are.
- **P-V Diagrams:** You must be able to interpret pressure-volume diagrams and understand that the area enclosed by a cyclic process represents the net work done, $W$.
- **Heat and Temperature:** A clear distinction between heat as energy in transit ($Q$) and temperature as a measure of average kinetic energy ($T$).

## How to study it (step by step)
1.  **Define the System:** Draw the standard heat engine diagram (see below). Identify the three key components: the hot reservoir at temperature $T_H$, the cold reservoir at temperature $T_C$, and the "working substance" (e.g., a gas) that undergoes the cycle.
2.  **Trace the Energy Flow:** Verbally and mathematically describe the energy transfers in one cycle. Heat $Q_H$ flows from the hot reservoir *into* the engine. The engine performs net work $W$. Waste heat $Q_C$ is exhausted *from* the engine into the cold reservoir.
3.  **Apply the First Law to a Cycle:** For any complete cycle, the working substance returns to its initial state. This means its internal energy does not change, so $\Delta U = 0$. Apply the First Law: $\Delta U = Q_{net} - W = 0$. Therefore, the net work done by the engine must equal the net heat absorbed: $W = Q_{net}$.
4.  **Define Net Heat:** The net heat $Q_{net}$ is the heat that comes in minus the heat that goes out. By convention, $Q_H$ is positive (heat added to the system) and $Q_C$ is positive (representing the *magnitude* of heat rejected). So, $Q_{net} = Q_H - Q_C$.
5.  **Derive the Efficiency Formula:** Efficiency is always defined as "what you get" divided by "what you paid for". We get useful work $W$. We paid for it by supplying heat $Q_H$.
    $$ \eta = \frac{\text{Benefit}}{\text{Cost}} = \frac{W}{Q_H} $$
    Now substitute the results from steps 3 and 4: $W = Q_H - Q_C$.
    $$ \eta = \frac{Q_H - Q_C}{Q_H} = \frac{Q_H}{Q_H} - \frac{Q_C}{Q_H} = 1 - \frac{Q_C}{Q_H} $$
6.  **Solve Problems:** Find two simple problems online or in a textbook. In the first, you are given $Q_H$ and $Q_C$; calculate $W$ and $\eta$. In the second, you are given $\eta$ and $W$; calculate $Q_H$ and $Q_C$. This solidifies the algebraic relationships.

## Key ideas, with intuition
1.  **There is no free lunch (First Law of Thermodynamics):** Energy is conserved. The heat you put in ($Q_H$) cannot vanish. It must be accounted for. It can either become useful work ($W$) or be dumped as waste heat ($Q_C$). This gives the fundamental energy balance for any heat engine operating in a cycle:
    $$ Q_H = W + Q_C $$
    This is just a rearrangement of $W = Q_H - Q_C$. It's the most intuitive form: Input = Useful Output + Wasted Output.

2.  **Efficiency is Benefit over Cost:** This is the universal definition of efficiency in physics and engineering. For a heat engine, the goal (benefit) is to get work done. The resource you expend (cost) is the fuel burned to supply heat from the hot reservoir.
    $$ \eta = \frac{W}{Q_H} $$
    An efficiency of $\eta = 0.4$ means that for every 100 Joules of heat energy you supply, you only get 40 Joules of useful mechanical work. The other 60 Joules are dumped as waste heat.

3.  **You can't even break even (Second Law of Thermodynamics):** It is impossible to build a heat engine that is 100% efficient. You *must* reject some waste heat to a cold reservoir ($Q_C > 0$). If you could make $Q_C=0$, you would have $\eta = 1 - 0/Q_H = 1$. This is forbidden by the Second Law of Thermodynamics. The need to "dump" heat is a fundamental feature of reality, not just an engineering imperfection like friction.

## Worked example
**Problem:** A jet engine takes in 120 kJ of thermal energy from the combustion of fuel and performs 42 kJ of net work in each cycle. It exhausts the remaining heat into the atmosphere. Calculate the waste heat per cycle and the thermal efficiency of the engine.

**Solution:**
1.  **Identify the given quantities:**
    - Heat absorbed from the hot reservoir: $Q_H = 120 \text{ kJ}$
    - Net work done by the engine: $W = 42 \text{ kJ}$

2.  **Apply the energy conservation principle (First Law) for a cycle:**
    The total energy input must equal the total energy output.
    $$ Q_H = W + Q_C $$
    We need to find the waste heat, $Q_C$.

3.  **Solve for the unknown, $Q_C$:**
    Rearrange the equation:
    $$ Q_C = Q_H - W $$
    Substitute the values:
    $$ Q_C = 120 \text{ kJ} - 42 \text{ kJ} = 78 \text{ kJ} $$
    So, 78 kJ of heat is exhausted to the atmosphere per cycle.

4.  **Calculate the thermal efficiency, $\eta$:**
    Use the fundamental definition of efficiency.
    $$ \eta = \frac{W}{Q_H} $$
    Substitute the values:
    $$ \eta = \frac{42 \text{ kJ}}{120 \text{ kJ}} = 0.35 $$
    The efficiency can also be expressed as a percentage: $\eta = 35\%$.

**Reflection:**
- Step 3 worked because the First Law of Thermodynamics dictates that energy must be conserved. The work done and the heat exhausted *must* sum to the heat taken in.
- Step 4 worked because the definition of efficiency is a simple ratio of the desired output (work) to the required input (heat). We used the primary definition $\eta = W/Q_H$, but we could have used the derived form as a check: $\eta = 1 - Q_C/Q_H = 1 - 78/120 = 1 - 0.65 = 0.35$. The results match.

## Diagrams
This is an energy flow diagram for a generic heat engine.

```text
       Hot Reservoir (T_H)
              |
              |
              v  Q_H (Heat In)
        +-----------+
        |           |
        |  Engine   | ----> W (Work Out)
        |           |
        +-----------+
              |
              |
              v  Q_C (Heat Out / Waste)
              |
       Cold Reservoir (T_C)
```

## Memory technique — remember this forever
1.  **The Story:** Imagine a "Heat Tax". You are given `$Q_H` from the "Hot Source Bank". To do any useful work `$W`, you are forced by the laws of physics to pay a "Waste Heat Tax" of `$Q_C` to the "Cold Universe Treasury". Your efficiency is what you got to keep (`$W`) divided by what you started with (`$Q_H`). The tax itself is `$Q_C`, and the tax *rate* is `$Q_C / Q_H$`. Your efficiency is simply 1 minus the tax rate: $\eta = 1 - Q_C/Q_H$.

2.  **Must-Know Formulas:** Overlearn these until they are automatic.
    - Energy Balance: $Q_H = W + Q_C$
    - Efficiency Definition: $\eta = \frac{W}{Q_H}$
    - Efficiency Derived Form: $\eta = 1 - \frac{Q_C}{Q_H}$

3.  **Spaced Repetition Schedule:** Review this topic and re-derive the formulas at these intervals:
    - 24 hours
    - 3 days
    - 7 days
    - 16 days
    - 35 days

4.  **First Principles Pathway:** If you forget everything, rebuild it.
    - Start with the definition: Efficiency is "what you get out" divided by "what you pay for". $\eta = W/Q_H$.
    - Invoke conservation of energy for a cycle ($\Delta U = 0$): The net work done must equal the net heat transfer. $W = Q_{net}$.
    - Define net heat: Heat in minus heat out. $Q_{net} = Q_H - Q_C$.
    - Substitute: $\eta = \frac{Q_H - Q_C}{Q_H} = 1 - \frac{Q_C}{Q_H}$. You have just re-derived it from scratch.

## Common mistakes
1.  **Denominator Error:** Using $W$ or $Q_C$ in the denominator of the efficiency formula. The cost is always $Q_H$, the heat you *must supply*. Efficiency is $\eta = W/Q_H$, not $W/Q_C$ or any other combination.
2.  **Sign Errors:** The formula $\eta = 1 - Q_C/Q_H$ assumes $Q_H$ and $Q_C$ are the positive *magnitudes* of the heat flows. If you are using a strict sign convention where heat out is negative, the energy balance is $W = Q_H + Q_C$ (where $Q_C$ would be a negative number), which can be confusing. Stick to magnitudes for the efficiency formula.
3.  **Assuming 100% Efficiency is Possible:** Never assume $Q_C$ can be zero. A common trick question is "An engineer proposes an engine that takes in 100 J of heat and does 100 J of work. What is wrong with this proposal?" The answer is that it violates the Second Law of Thermodynamics because it requires $Q_C=0$.

## Self-check
1.  A power plant generates 500 MW of work. To do this, it must discard 800 MW of waste heat into a nearby river. What is the thermal efficiency of the plant?
2.  An experimental engine has a theoretical efficiency of 60% ($\eta=0.6$). If the engine is to produce 30 kJ of work per cycle, how much heat must it absorb from the hot reservoir, and how much must it reject to the cold reservoir?
3.  Consider two engines. Engine A has an efficiency of $\eta_A = 0.4$. Engine B takes in the same amount of heat ($Q_{H,B} = Q_{H,A}$) but rejects only half the waste heat of Engine A ($Q_{C,B} = 0.5 \cdot Q_{C,A}$). What is the efficiency of Engine B, $\eta_B$? Explain in one sentence why increasing the temperature difference between the hot and cold reservoirs generally improves efficiency, referencing the terms in your calculation.