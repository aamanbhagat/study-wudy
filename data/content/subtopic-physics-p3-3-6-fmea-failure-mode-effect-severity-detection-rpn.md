## What it is
Failure Mode and Effects Analysis (FMEA) is a systematic, bottom-up engineering methodology used to identify every possible way a system can break (Failure Mode), evaluate the consequences of that breakage (Effect), and prioritize fixes. It quantifies qualitative risks using a standardized scoring system for Severity ($S$), Occurrence ($O$), and Detection ($D$), which are multiplied together to yield a Risk Priority Number ($RPN$). 

## Why it matters
In aerospace, you cannot send a technician to fix a broken valve once a spacecraft is in orbit. FMEA forces engineers to design out single points of failure before hardware is ever cut. It is the backbone of reliability engineering and fault-tolerant design. Later in your curriculum, FMEA feeds directly into Fault Tree Analysis (FTA) and informs the training of machine learning anomaly-detection algorithms, which monitor the telemetry of the precise failure modes you identified.

## When to study it
You must already understand:
1. **Systems Engineering Fundamentals:** Functional block diagrams and system boundary definitions.
2. **Basic Probability:** Independent vs. dependent events.
3. **Spacecraft Subsystems:** A working knowledge of propulsion, avionics, thermal, and power systems (you need to know what hardware does before you can analyze how it breaks).
If you cannot draw a functional block diagram of a basic bipropellant propulsion system, go back and learn that first. You cannot analyze a system you do not understand.

## How to study it (step by step)
1. **Define the system boundaries:** Pick a specific subsystem (e.g., Reaction Control System). List every component.
2. **Determine Failure Modes:** For one component, list how it fails (e.g., "valve stuck open", "valve stuck closed", "external leak").
3. **Trace the Effect:** Determine the local effect (on the subsystem) and the global effect (on the mission).
4. **Assign Severity ($S$) and Occurrence ($O$):** Rate $S$ from 1 (negligible) to 10 (loss of vehicle/life). Rate $O$ from 1 (highly unlikely) to 10 (inevitable).
5. **Assign Detection ($D$):** Rate $D$ from 1 (certain to detect before launch/operation) to 10 (impossible to detect). 
6. **Calculate RPN:** Multiply the scores. Sort your list by descending RPN to find your most critical vulnerabilities.
7. **Design Mitigations:** Propose engineering changes to lower $O$ or $D$, then recalculate the RPN.

## Key ideas, with intuition

**1. The Risk Priority Number (RPN) Equation**
Risk is fundamentally the product of consequence and probability. FMEA formalizes this as:
$$RPN = S \times O \times D$$
Where $S$, $O$, and $D$ are integers from $1$ to $10$. The maximum RPN is $1000$; the minimum is $1$. High RPNs dictate where engineering budget and mass should be spent to add redundancy.

**2. The Counter-Intuitive Detection ($D$) Scale**
A high Detection score means a *high probability of failure going undetected*. 
* $D=1$: The system has a sensor that will definitively flag the flaw during ground testing.
* $D=10$: The flaw is completely invisible until it destroys the spacecraft in orbit.

**3. Severity ($S$) is usually immutable**
Once a component fails, the severity of its effect is fixed by the mission architecture. If a main engine fails to ignite, the mission is lost ($S=10$). You generally cannot lower $S$ without fundamentally changing the mission. Therefore, engineering mitigations focus almost entirely on lowering $O$ (using higher-quality parts, adding redundancy) or lowering $D$ (adding sensors, better pre-flight testing).

**4. Mode vs. Cause vs. Effect**
* **Cause:** Why it happened (e.g., particulate contamination).
* **Mode:** How it presents (e.g., valve stuck open).
* **Effect:** The consequence (e.g., uncontrolled spin, loss of mission).

## Worked example
**System:** Spacecraft Reaction Control System (RCS) Thruster.
**Component:** Solenoid isolation valve.

**Step 1: Identify Failure Mode**
Valve stuck open.

**Step 2: Identify Effect**
Continuous firing of thruster. Local effect: propellant depletion. Global effect: uncontrolled spacecraft spin, loss of solar panel pointing, loss of mission.

**Step 3: Assign Scores (Pre-Mitigation)**
*   **Severity ($S$):** $10$ (Loss of mission).
*   **Occurrence ($O$):** $4$ (Occasional failure based on historical solenoid data).
*   **Detection ($D$):** $7$ (Hard to detect a sticky valve during standard electrical checkouts without flowing live propellant).

**Step 4: Calculate RPN**
$$RPN = 10 \times 4 \times 7 = 280$$

**Step 5: Mitigation and Re-evaluation**
*Action:* Add a second solenoid valve in series. Add a pressure transducer between them to verify closure during ground tests.
*   **New $S$:** $10$ (If both fail open, mission is still lost).
*   **New $O$:** $2$ (Probability of *both* valves failing open simultaneously is vastly lower).
*   **New $D$:** $3$ (Pressure transducer makes it easy to detect a single leaky valve during ground test).
*   **New RPN:** $$RPN = 10 \times 2 \times 3 = 60$$

*Reflection:* The mitigation successfully reduced the RPN from 280 to 60 by attacking the probability of occurrence (redundancy) and the ability to detect the flaw (sensor addition). 

## Diagrams

```text
+-------------------------------------------------------------------------+
|                       FMEA LOGICAL FLOW                                 |
+-------------------------------------------------------------------------+

[CAUSE] --------> [FAILURE MODE] --------> [EFFECT]
(Contamination)   (Valve stuck open)       (Loss of Mission)
                        |                        |
                        v                        v
                    Occurrence (O)          Severity (S)
                    Score: 1-10             Score: 1-10
                        |                        |
                        +----------+-------------+
                                   |
                                   v
[TESTING/SENSORS] ----> Detection (D)
(Ground check)          Score: 1-10 (10 = blind)
                                   |
                                   v
                           RPN = S * O * D
                           (Prioritize > 100)
                                   |
                                   v
                            [MITIGATION]
                           (Redundancy/Sensors)
```

## Memory technique — remember this forever
1. **Mnemonic:** **S**ad **O**striches **D**ie. (Severity, Occurrence, Detection).
2. **Must-know formula:** $$RPN = S \times O \times D$$
3. **Spaced-repetition schedule:** Review this logic at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First principles pathway:** If you forget the RPN components, derive it from standard risk theory: $Risk = Consequence \times Probability$. 
   * Consequence maps to **Severity**.
   * Probability of a catastrophic failure is the probability it *happens* AND the probability you *miss it*. 
   * $P(Happens)$ maps to **Occurrence**. 
   * $P(Missed)$ maps to **Detection**.

## Common mistakes
1. **Inverting the Detection Scale:** Students often assign $D=10$ to systems with excellent sensors. Remember: High $D$ means high risk. $10$ means undetectable.
2. **Confusing Cause and Mode:** Writing "vibration" as a failure mode. Vibration is a *cause*. The mode is "fatigue fracture of mounting bracket." FMEA analyzes modes.
3. **Lowering Severity via Redundancy:** Students add a backup computer and lower the Severity score from 10 to 4. This is wrong. The severity of a total computer failure remains 10. The backup computer lowers the *Occurrence* of a total system failure.

## Self-check
1. If a failure mode has an RPN of 90 ($S=9, O=2, D=5$) and you add a highly sensitive pre-flight diagnostic test, which variable changes, and what happens to the RPN?
2. A structural strut holds the primary payload. If it snaps, the payload falls off. The strut is a solid piece of titanium with no moving parts. Assign estimated $S$, $O$, and $D$ values and justify them. 
3. Prove logically why an FMEA cannot effectively capture the risk of two simultaneous, unrelated component failures (e.g., a software glitch occurring at the exact moment a micrometeoroid hits a radiator). What analysis tool should be used instead?