## What it is
The V-model is a graphical framework for managing complex engineering projects, representing the system lifecycle as a "V". The downward left leg represents the decomposition of high-level goals into detailed component specifications; the upward right leg represents the physical integration and testing of those components back into a complete system. Requirements traceability is the unbroken chain of logic linking every single bolt, line of code, or test procedure back to a top-level mission objective, ensuring nothing is built without a purpose and no purpose goes unfulfilled.

## Why it matters
In aerospace, a single missing requirement or untested edge case destroys multi-million dollar spacecraft (e.g., the Mars Climate Orbiter failure due to mixed units). You will use this framework to design everything from orbital mechanics software to physical rocket engine test stands. It is the rigorous scaffolding that ensures your mathematical models and physics equations actually translate into working, reliable hardware.

## When to study it
You must already understand basic physics (mechanics, thermodynamics) to grasp physical constraints, and have an introductory understanding of spacecraft architecture (knowing what subsystems like propulsion, power, and thermal actually do). If you do not know the difference between a system, a subsystem, and a component, review spacecraft architecture first.

## How to study it (step by step)
1. Draw the V-model from memory. Label the left side (decomposition) and right side (integration/verification). Draw horizontal arrows linking the left and right sides.
2. Write a top-level mission requirement for a hypothetical mission (e.g., "The rover shall survive the lunar night").
3. Decompose that top-level requirement into two distinct subsystem-level requirements (e.g., one for thermal, one for power).
4. Decompose one of those subsystem requirements into a specific, measurable component specification (e.g., battery capacity in Watt-hours).
5. Map a verification test to each level on the right side of the V-model.
6. Create a Traceability Matrix (a simple table) linking the top-level requirement down to the component spec, and horizontally to the verification test.

## Key ideas, with intuition

**The "Shall" Statement**
Requirements are legally binding engineering contracts. They must be unambiguous, verifiable, and use the word "shall" (mandatory) rather than "should" (optional). 
Format: `[System] shall [function] under [condition] with [performance metric].`

**Decomposition (The Left Leg)**
Decomposition is the process of moving from "What do we need?" to "How will we build it?". Mathematically, if $R_0$ is a top-level requirement, it is partitioned into a set of lower-level sub-requirements $\{r_1, r_2, ..., r_n\}$. The fundamental axiom of systems engineering is that satisfying all $r_i$ guarantees the satisfaction of $R_0$:
$$ R_0 = \bigcap_{i=1}^{n} r_i $$
If this intersection does not fully cover $R_0$, your decomposition is incomplete.

**Verification vs. Validation (The Right Leg)**
*   **Verification:** "Did we build the system right?" (Does the hardware meet the mathematical specifications written on the left side of the V?)
*   **Validation:** "Did we build the right system?" (Does the final integrated system actually solve the customer's real-world problem?)

**Traceability (Bidirectional)**
Traceability is a bijective mapping function. 
*   *Forward traceability* ensures every requirement maps to a physical component and a test. 
*   *Backward traceability* ensures every component maps back to a top-level requirement. If a component lacks backward traceability, it is "gold-plating"—unnecessary mass and complexity that must be deleted.

## Worked example
**Scenario:** Designing a cubesat communication system.

**Step 1: Top-level requirement (Level 0 - System)**
"The satellite shall transmit telemetry to the ground station at a minimum data rate of $1 \text{ Mbps}$."

**Step 2: Decomposition (Level 1 - Subsystem)**
To achieve this, we rely on the physics of the RF link budget. The received power $P_{rx}$ must exceed a threshold. The link equation is:
$$ P_{rx} = P_{tx} + G_{tx} + G_{rx} - L_{fs} $$
Where $P_{tx}$ is transmitter power, $G_{tx}$ is satellite antenna gain, $G_{rx}$ is ground gain, and $L_{fs}$ is free-space loss. Because $G_{rx}$ and $L_{fs}$ are fixed by the mission geometry and ground station, we decompose the $1 \text{ Mbps}$ requirement into two subsystem specs to satisfy $P_{rx}$:
1. "The RF transmitter shall output a minimum of $5 \text{ W}$ of RF power ($P_{tx}$)."
2. "The satellite antenna shall have a minimum gain of $3 \text{ dBi}$ ($G_{tx}$)."

**Step 3: Verification (Right side of V)**
We must verify the antenna requirement. 
Test: Place the antenna in an anechoic chamber and measure its radiation pattern to verify $G_{tx} \ge 3 \text{ dBi}$.

**Reflection:** By explicitly linking the $1 \text{ Mbps}$ system requirement to the $3 \text{ dBi}$ antenna gain via the link budget equation, we guarantee that testing the antenna in the chamber mathematically verifies a piece of the top-level mission. No testing effort is wasted.

## Diagrams

```text
       DECOMPOSITION & DEFINITION                 INTEGRATION & VERIFICATION
       (What are we building?)                    (Did we build it right?)
       
Level 0: Concept of Operations  \                      /  System Validation
                                 \                    /
Level 1: System Requirements      \------------------/    System Verification (Flight Test)
                                   \                /
Level 2: Subsystem Requirements     \--------------/      Subsystem Verification (Hot Fire)
                                     \            /
Level 3: Component Specifications     \----------/        Component Verification (Bench Test)
                                       \        /
                                        \      /
                                      Implementation
                                    (Build the hardware)

Note: Horizontal dashed lines represent Traceability. The test on the right 
verifies the specific requirement written on the left.
```

## Memory technique — remember this forever
1. **Mnemonic:** The V stands for **V**erifying (bottom-up) against the **V**ision (top-down).
2. **The Traceability Rule:** "No orphans, no aliens." 
   * *Orphans:* Requirements with no parent (fails backward traceability).
   * *Aliens:* Components/features that sneaked in without a requirement (gold-plating).
3. **Overlearn these facts:**
   * Verification = "Built it right" (Matches spec).
   * Validation = "Built the right thing" (Solves the problem).
4. **Spaced-repetition schedule:** Review this concept at 1 day, 3 days, 7 days, 16 days, and 35 days.
5. **First principles pathway:** If you forget how to decompose, return to the intersection principle: $R_0 = \bigcap_{i=1}^{n} r_i$. Ask yourself: "If I prove $r_1, r_2, ... r_n$ are true, does physics dictate that $R_0$ must be true?" If no, you are missing a requirement.

## Common mistakes
* **Design-constraining requirements:** Writing *how* to do something rather than *what* must be done. (e.g., "The rover shall use lithium-ion batteries" instead of "The rover shall store $500 \text{ Wh}$ of energy"). This kills engineering creativity.
* **Ambiguous language:** Using words like "fast", "lightweight", or "robust". Physics does not care about adjectives; it cares about numbers.
* **Testing at the wrong level:** Trying to verify a system-level requirement (like orbital thermal stability) using only a component-level test (like testing a single thermistor).

## Self-check
1. Identify the two major flaws in this requirement: "The structural frame should be made of lightweight aluminum to survive a $5g$ launch load."
2. If a star tracker is added to a satellite to improve pointing, but it cannot be traced back to a top-level mission requirement, what specific Systems Engineering principle has been violated and what is the physical consequence for the spacecraft?
3. Map the verification of a thruster's specific impulse ($I_{sp}$) to its corresponding position on the V-model. What level of requirement does this verify, and what higher-level requirement might it trace back to?