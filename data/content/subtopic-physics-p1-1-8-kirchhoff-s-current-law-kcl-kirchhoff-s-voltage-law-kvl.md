## What it is
Kirchhoff's laws are two fundamental principles for analyzing electrical circuits, derived from conservation laws. The Current Law (KCL) states that the total current entering a junction must equal the total current leaving it. The Voltage Law (KVL) states that the sum of all voltage drops and rises around any closed loop in a circuit must be zero.

## Why it matters
These laws are the bedrock of all circuit analysis, from simple resistor networks to the complex integrated circuits in flight computers and guidance systems. In aerospace, they are essential for designing avionics, power distribution systems for satellites, and sensor interfaces. In computer science, understanding these principles is key to designing the physical hardware that runs software, and they form an analogy for flow-based algorithms.

## When to study it
You must have a solid grasp of the following concepts before proceeding:
*   **Voltage (V):** Electric potential difference, the work done per unit charge.
*   **Current (I):** The rate of flow of electric charge.
*   **Resistance (R):** A material's opposition to current flow.
*   **Ohm's Law:** The relationship $V = IR$ for a resistor.
*   **Basic Circuit Elements:** What a voltage source, resistor, and wire are, and their schematic symbols.

If any of these are weak, review them first. We build directly on them.

## How to study it (step by step)
1.  **Master the KCL concept.** Draw a single junction (a "node") with 4-5 wires connected. Assign arbitrary current directions and values to all but one wire. Use KCL to solve for the unknown current. Do this 5 times with different numbers.
2.  **Derive KCL from first principles.** Write down the definition of current, $I = dQ/dt$. Consider a node as a point with no volume to store charge. Argue that the net rate of charge accumulation at the node must be zero. This directly implies $\sum I_{in} = \sum I_{out}$.
3.  **Master the KVL concept.** Draw a single circuit loop with a battery and two resistors. Trace the loop starting from the negative terminal of the battery. Assign a voltage rise across the battery and voltage drops across the resistors. Show that the rise must equal the sum of the drops.
4.  **Derive KVL from first principles.** Recall that the static electric field $\vec{E}$ is a conservative field. This means the work done moving a charge around a closed path is zero. Write this as the line integral $\oint \vec{E} \cdot d\vec{l} = 0$. Since voltage is defined as $V = -\int \vec{E} \cdot d\vec{l}$, this integral directly implies $\sum V_k = 0$ around a closed loop.
5.  **Solve a single-loop circuit.** Use KVL and Ohm's Law ($V=IR$) to find the current in a simple series circuit. Pay close attention to the signs of the voltage drops.
6.  **Solve a two-loop circuit.** This is the synthesis step. You will need to define current variables, apply KCL at a node to relate them, and then apply KVL to two different loops. This will generate a system of linear equations that you must solve.

## Key ideas, with intuition
1.  **KCL is Conservation of Charge.** A node in a circuit is just a point where wires meet. It cannot create, destroy, or store charge. Therefore, whatever amount of charge flows into the node per second (current) must be the exact same amount that flows out per second. Think of it like water pipes connected at a junction: you can't have more water flowing in than flowing out, or the junction would explode.
    $$ \sum_{\text{node}} I = 0 $$
    By convention, we treat currents entering the node as positive and currents leaving as negative (or vice-versa, as long as you are consistent).

2.  **KVL is Conservation of Energy.** Voltage is a measure of electric potential energy per unit charge. Imagine walking around a closed mountain trail. You might go up some hills (gaining potential energy) and down some valleys (losing potential energy), but when you return to your exact starting point, your net change in altitude is zero. In a circuit loop, a battery is like a ski lift (a voltage *rise*), and a resistor is like a ski slope (a voltage *drop*). The sum of all the "lifts" must equal the sum of all the "drops" for you to end up back where you started.
    $$ \sum_{\text{loop}} V = 0 $$

3.  **Sign Convention is Not Optional.** This is the most critical and error-prone part. To apply KVL, you must be rigorous:
    *   First, *assume* a direction for the current in each loop (e.g., clockwise). Don't worry if you're wrong; the math will yield a negative sign.
    *   When traversing your loop in your chosen direction:
        *   If you cross a resistor *in the same direction* as the assumed current, it's a voltage **drop** ($-IR$). The current flows from high potential to low potential.
        *   If you cross a resistor *against* the assumed current, it's a voltage **rise** ($+IR$).
        *   If you cross a voltage source from its $-$ to its $+$ terminal, it's a voltage **rise** ($+V$).
        *   If you cross a voltage source from its $+$ to its $-$ terminal, it's a voltage **drop** ($-V$).

## Worked example
Find the current $I_2$ flowing through resistor $R_2$ in the circuit below.
Let $V_s = 10 \text{ V}$, $R_1 = 2 \, \Omega$, $R_2 = 3 \, \Omega$, and $R_3 = 5 \, \Omega$.

### Diagram
```text
      R1=2
   +----/\/\----+----/\/\----+
   |            |      R3=5  |
 Vs=10V ^       | R2=3 ^     |
   |    | I1    |      | I3  |
   - ---+-------+------------+
        |  I2   |
        A       B
```

### Steps
1.  **Identify nodes and loops.** We have two main nodes, A and B. We have two inner loops (left and right) and one outer loop. We only need two loops to solve this. Let's call the left loop Loop 1 and the right loop Loop 2.

2.  **Assign current variables and directions.** Let's assume $I_1$ flows from the source and splits at node A. Let $I_2$ flow down through $R_2$ and $I_3$ flow right through $R_3$. This seems intuitive.

3.  **Apply KCL at a node.** At node A, current $I_1$ enters, and currents $I_2$ and $I_3$ leave.
    $$ \text{KCL at Node A: } \quad I_1 - I_2 - I_3 = 0 \quad \implies \quad I_1 = I_2 + I_3 \quad \text{(Eq. 1)} $$

4.  **Apply KVL to the loops.** We need two more equations. We'll trace both loops clockwise.
    *   **Loop 1 (left loop: Vs -> R1 -> R2 -> Vs):**
        *   Start at the bottom-left corner, go up.
        *   Cross $V_s$ from $-$ to $+$: voltage rise of $+10$.
        *   Cross $R_1$ in the direction of $I_1$: voltage drop of $-I_1 R_1 = -2I_1$.
        *   Cross $R_2$ in the direction of $I_2$: voltage drop of $-I_2 R_2 = -3I_2$.
        *   Return to start. The sum is zero.
        $$ \text{KVL for Loop 1: } \quad 10 - 2I_1 - 3I_2 = 0 \quad \text{(Eq. 2)} $$
    *   **Loop 2 (right loop: R2 -> R3 -> R2):**
        *   Start at node A, go down.
        *   Cross $R_2$ in the direction of $I_2$: voltage drop of $-I_2 R_2 = -3I_2$.
        *   Go right, then up. Cross $R_3$ *against* the direction of $I_3$: voltage rise of $+I_3 R_3 = +5I_3$.
        *   Return to start. The sum is zero.
        $$ \text{KVL for Loop 2: } \quad -3I_2 + 5I_3 = 0 \quad \implies \quad 5I_3 = 3I_2 \quad \implies \quad I_3 = \frac{3}{5}I_2 \quad \text{(Eq. 3)} $$

5.  **Solve the system of equations.** We have 3 equations and 3 unknowns ($I_1, I_2, I_3$). We want to find $I_2$.
    *   Substitute Eq. 3 into Eq. 1:
        $$ I_1 = I_2 + \left(\frac{3}{5}I_2\right) = \frac{8}{5}I_2 $$
    *   Now substitute this expression for $I_1$ into Eq. 2:
        $$ 10 - 2\left(\frac{8}{5}I_2\right) - 3I_2 = 0 $$
    *   Solve for $I_2$:
        $$ 10 - \frac{16}{5}I_2 - 3I_2 = 0 $$
        $$ 10 = \frac{16}{5}I_2 + \frac{15}{5}I_2 $$
        $$ 10 = \frac{31}{5}I_2 $$
        $$ I_2 = \frac{50}{31} \approx 1.61 \text{ A} $$

### Reflection
Each step was necessary. KCL gave us the relationship between the currents. KVL gave us the energy constraints for two independent paths. Solving the system was pure algebra. The result is positive, meaning our initial assumed direction for $I_2$ (downwards) was correct.

## Diagrams
**KCL at a Node:**
```text
        I1 |
           |
           v
I4 <---- (NODE) ----> I2
           ^
           |
        I3 |

KCL: I1 + I3 = I2 + I4
 or  I1 - I2 + I3 - I4 = 0
```

**KVL for a Loop (and sign convention):**
```text
      R1
   +--/\/\--+
   |        |
Vs ^        v I
   |        |
   +--/\/\--+
      R2

Loop direction: clockwise
KVL: +Vs - I*R1 - I*R2 = 0
```

## Memory technique — remember this forever
1.  **Mnemonic:**
    *   **KCL: Kirchhoff's Current Law** is for **C**onnections (nodes). Think of a **C**rowded junction. "What comes in must go out."
    *   **KVL: Kirchhoff's Voltage Law** is for **V**oyages (loops). Think of taking a round trip **V**oyage. "You end up where you started."

2.  **Formulas to overlearn:**
    *   KCL: $\sum_{k=1}^{n} I_k = 0$ (at a node, currents in = currents out)
    *   KVL: $\sum_{k=1}^{n} V_k = 0$ (around a closed loop)

3.  **Spaced Repetition Schedule:**
    *   Review these laws and solve one new problem in **1 day**.
    *   Review again in **3 days**.
    *   Review again in **7 days**.
    *   Review again in **16 days**.
    *   Review again in **35 days**.

4.  **First Principles Pathway:**
    *   If you forget KCL, remember **Conservation of Charge**. A point cannot store charge, so the rate of charge in must equal the rate of charge out. $I_{in} = I_{out}$.
    *   If you forget KVL, remember **Conservation of Energy**. The electrostatic field is conservative. The work to move a charge around a closed loop is zero. $\oint \vec{E} \cdot d\vec{l} = 0$. This means the net potential change must be zero.

## Common mistakes
1.  **KVL Sign Errors:** The most common mistake. Forgetting to subtract for a voltage drop ($-IR$) or adding when you should subtract. Be slow, be methodical, follow the convention perfectly.
2.  **"Ghost" Loops:** Applying KVL to a path that isn't a closed loop. You must start and end at the exact same point.
3.  **Incorrect KCL Application:** Summing currents that don't all meet at a single, identical node.
4.  **Algebraic Errors:** After correctly setting up the KCL/KVL equations, simple mistakes in solving the system of equations are frequent. Double-check your algebra.

## Self-check
1.  Four wires meet at a node. Current $I_1 = 3 \text{ A}$ and $I_2 = 5 \text{ A}$ flow into the node. Current $I_3 = 4 \text{ A}$ flows out. What is the magnitude and direction of the fourth current, $I_4$?
2.  A $12 \text{ V}$ battery is connected in series to a $2 \, \Omega$ resistor and a $4 \, \Omega$ resistor. What is the voltage drop across the $4 \, \Omega$ resistor?
3.  Consider the worked example circuit. Replace the $R_3$ resistor with a second voltage source, $V_2 = 5 \text{ V}$, with its positive terminal connected to node B. Calculate the new current $I_2$ through the central resistor $R_2$.