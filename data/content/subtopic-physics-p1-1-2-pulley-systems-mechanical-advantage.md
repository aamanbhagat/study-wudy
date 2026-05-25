## What it is
A pulley system is a mechanism composed of one or more wheels (pulleys) and a rope or cable, designed to lift or move heavy objects. Mechanical advantage is the factor by which the system multiplies the input force; a mechanical advantage of 2 means you can lift a 100 N weight by pulling with only 50 N of force.

## Why it matters
This concept is a direct, tangible application of vector addition and Newton's laws. In aerospace, complex pulley and winch systems are used in ground support equipment to precisely lift and position rocket stages and satellites. Understanding the trade-off between force and distance is a foundational concept in mechanical engineering and robotics, including the design of robotic arms and actuators.

## When to study it
You must have a solid grasp of these prerequisites before proceeding:
1.  **Newton's Laws:** Specifically, the second law ($\sum \vec{F} = m\vec{a}$) and the condition for static equilibrium ($\sum \vec{F} = 0$).
2.  **Free-Body Diagrams (FBDs):** You must be able to isolate an object, identify all forces acting on it, and draw them correctly.
3.  **Tension:** You must understand that for an ideal (massless, inextensible) rope, the tension is constant along its entire length.

If you are not confident with these, pause and review them. We will build directly upon them.

## How to study it (step by step)
1.  **Analyze a single fixed pulley.** Draw the FBD for a hanging mass. See that the tension in the rope equals the weight of the mass. The force you pull with equals the tension. Conclude that the mechanical advantage is 1. The only benefit is changing the direction of the force.
2.  **Analyze a single movable pulley.** Draw the FBD for the pulley and the attached mass (treat them as one system). The load (weight) pulls down. Two segments of the same rope pull up. Apply $\sum F_y = 0$ to find that the tension in each rope segment is half the weight. Since you only pull on one end of the rope, your input force is half the load. Derive that the mechanical advantage is 2.
3.  **Derive the work-energy trade-off.** For the single movable pulley, to lift the mass by a height $h$, both supporting rope segments must shorten by $h$. This means you must pull a total length of rope $L = 2h$. The work you do is $W_{in} = F_{in} \cdot L = (\frac{mg}{2}) \cdot (2h) = mgh$. The work done on the load is $W_{out} = F_{out} \cdot h = (mg) \cdot h$. Note that $W_{in} = W_{out}$, demonstrating conservation of energy. You trade pulling with less force for pulling over a greater distance.
4.  **Generalize the pattern.** Analyze a system with one fixed and two movable pulleys. Notice that the number of rope segments directly supporting the load determines the mechanical advantage. This leads to the "counting ropes" shortcut.
5.  **Solve problems.** Work through 3-5 problems of increasing complexity. Start with simple systems and move to compound ones. For each, first use the "counting ropes" shortcut to predict the answer, then verify it rigorously using FBDs and Newton's laws.

## Key ideas, with intuition
1.  **Tension is the great equalizer.** In a single, continuous, ideal rope, the tension is the same everywhere. If you pull on one end with a force $T$, the rope pulls on everything it's attached to with that same force $T$.
2.  **Movable pulleys share the load.** The core of mechanical advantage comes from having multiple rope segments pulling up on the load. If a load of weight $W$ is supported by $N$ vertical rope segments, each segment only needs to carry a tension of $T = W/N$ (in equilibrium). Since your input force $F_{in}$ is equal to the tension $T$ in the single rope you are pulling, you get a significant advantage.
    $$ \sum F_y = T_1 + T_2 + ... + T_N - W = 0 $$
    If all tensions are from the same rope, $T_1 = T_2 = ... = T_N = T$.
    $$ NT - W = 0 \implies T = \frac{W}{N} $$
    The mechanical advantage is the ratio of Load to Effort: $MA = \frac{W}{T} = N$.
3.  **There is no free lunch (Conservation of Energy).** You cannot create energy. The work done to lift the load must equal the work you put into the system (ideally). Work is force times distance, $W = Fd$. If you decrease the force you apply ($F_{in}$), you must increase the distance you pull the rope ($d_{in}$) proportionally.
    $$ W_{in} = W_{out} \implies F_{in} d_{in} = F_{out} d_{out} $$
    $$ \frac{F_{out}}{F_{in}} = \frac{d_{in}}{d_{out}} = MA $$
    A mechanical advantage of $N$ means you must pull $N$ meters of rope to lift the load by 1 meter.

## Worked example
**Problem:** A crate of mass $m = 100 \text{ kg}$ is lifted using the pulley system shown below. Assuming the pulleys and rope are massless and frictionless, what is the force $F_a$ required to hold the crate in equilibrium? What is the Ideal Mechanical Advantage (IMA)?

```text
      +--------------+   <-- Ceiling
      |              |
      |             /
     (P1)          /  <-- Rope pulled with force Fa
      |           /
      |          /
      T1        / T3
      |        /
     (P2)------+
      |
      T2
      |
   +-----+
   |  m  |  <-- Crate (100 kg)
   +-----+
      |
      V W = mg
```

**Solution:**

1.  **Identify the Goal.** We need to find the applied force $F_a$ and the IMA. We are in equilibrium, so $\sum \vec{F} = 0$.

2.  **Isolate the System and Draw FBDs.** The key is to isolate the movable pulley (P2) and the mass $m$ as a single system.
    *   The downward force is the weight of the crate: $W = mg = (100 \text{ kg})(9.8 \text{ m/s}^2) = 980 \text{ N}$.
    *   The upward forces are from the two rope segments pulling on the movable pulley P2. Let's call their tensions $T_1$ and $T_2$.

    ```text
    FBD for movable pulley (P2) and mass (m):

          ^ T1      ^ T2
          |         |
         (P2)------+
          |
          |
          V W = 980 N
    ```

3.  **Apply Physical Principles.**
    *   The entire system uses one continuous rope. Therefore, the tension is the same everywhere in the rope. The force you apply, $F_a$, determines this tension. So, $F_a = T$.
    *   The tensions $T_1$ and $T_2$ are just parts of this same rope. So, $T_1 = T_2 = T$.
    *   The fixed pulley (P1) only changes the direction of the force. The tension in the rope segment you pull ($T_3$ in the first diagram) is the same as $T_1$ and $T_2$. Thus, $F_a = T_1 = T_2 = T$.

4.  **Solve the Equations.** Apply Newton's First Law (equilibrium) to the FBD of the movable pulley and mass.
    $$ \sum F_y = 0 $$
    $$ T_1 + T_2 - W = 0 $$
    Substitute $T_1 = T_2 = F_a$:
    $$ F_a + F_a - W = 0 $$
    $$ 2F_a = W $$
    $$ F_a = \frac{W}{2} = \frac{980 \text{ N}}{2} = 490 \text{ N} $$
    The force required is 490 N.

5.  **Calculate Mechanical Advantage.**
    The Ideal Mechanical Advantage (IMA) is the ratio of the load force to the effort force.
    $$ IMA = \frac{F_{out}}{F_{in}} = \frac{W}{F_a} = \frac{980 \text{ N}}{490 \text{ N}} = 2 $$
    The IMA is 2.

**Reflection:**
*   Step 1 defined our target variables.
*   Step 2 (FBD) was crucial. It visually translated the physical situation into a solvable physics problem.
*   Step 3 applied the core concept: tension is constant in a single rope. This allowed us to relate all upward forces to the single applied force $F_a$.
*   Step 4 was the direct mathematical application of the equilibrium condition.
*   Step 5 used the definition of IMA to find the force multiplication factor. Notice the IMA is simply the number of rope segments supporting the load, which is a reliable shortcut.

## Diagrams

**System 1: Single Fixed Pulley (IMA = 1)**
Changes direction of force, no mechanical advantage.

```text
      +--------------+
      |
     (P)
    /   \
   /     \
  T       T
 /         \
V F_pull    V W = mg
```

**System 2: Single Movable Pulley (IMA = 2)**
Halves the required force.

```text
      +--------------+
      |             /
      |            /
      T           / ^ F_pull = T
      |          /
     (P)--------+
      |
      T
      |
      V W = mg
```

## Memory technique — remember this forever
1.  **Visual Hook:** "Count the supporting ropes." Look at the movable pulley or the object being lifted. Count how many strands of rope are pulling *up* on it. This number is your ideal mechanical advantage. Do not count the rope you are pulling down on (unless it first goes around a pulley on the load).
2.  **Formulas to Overlearn:**
    *   Ideal Mechanical Advantage: $IMA = \frac{F_{load}}{F_{effort}}$
    *   The Shortcut: $IMA = N$ (where $N$ is the number of rope segments directly supporting the load).
    *   Work Conservation: $F_{effort} \cdot d_{effort} = F_{load} \cdot d_{load}$
3.  **Spaced Repetition Schedule:** Review this mini-lesson and solve one new pulley problem on this schedule:
    *   In 24 hours.
    *   In 3 days.
    *   In 7 days.
    *   In 16 days.
    *   In 35 days.
4.  **First Principles Pathway:** If you forget everything, you can always rebuild it.
    *   Draw a Free-Body Diagram for the load and for each movable pulley.
    *   Write down the $\sum \vec{F} = m\vec{a}$ equation for each FBD (use $\vec{a}=0$ for equilibrium).
    *   Use the rule: "Tension is constant along a single continuous rope."
    *   Solve the resulting system of algebraic equations.

## Common mistakes
1.  **Miscounting supporting ropes.** Students often count the final rope segment they are pulling on, even if it's not directly supporting the load. Only count segments that pull *up* on the movable block.
2.  **Incorrect Free-Body Diagrams.** Forgetting a tension force or drawing its direction incorrectly. Be meticulous: isolate the object, then draw every single force acting *on* it.
3.  **Confusing Mass and Weight.** The load force is weight ($W=mg$), not mass ($m$). Always convert kilograms to Newtons before starting.
4.  **Ignoring the Work-Distance Trade-off.** Forgetting that a lower force must be applied over a proportionally longer distance. A question might ask "how much rope must be pulled?" which requires using $d_{in} = IMA \cdot d_{out}$.

## Self-check
1.  A 50 kg engine is lifted with a single movable pulley. What is the ideal effort force required to hold it steady? How much rope must you pull to lift the engine by 2 meters?
2.  Analyze the system below. What is its Ideal Mechanical Advantage? If the mass $m$ is 120 kg, what is the tension in the rope attached to the ceiling?
    ```text
          +--------------+   <-- Ceiling
          |
         (P1) fixed
        /   \
       /     \
      /       \
     (P2) mov  (P3) mov
      \       /
       \     /
        \   /
       +-----+
       |  m  |
       +-----+
    ```
    (Assume the pull is from the rope coming off P3)
3.  A pulley system has an IMA of 5. It is used to lift a 200 kg payload. However, due to friction in the pulleys, the actual force required is 500 N. What is the efficiency of this system? (Efficiency is defined as $\frac{\text{Actual Mechanical Advantage}}{\text{Ideal Mechanical Advantage}}$).