## What it is
The SMART framework is a rigorous set of criteria used to define engineering requirements. It ensures that every constraint and objective placed on a spacecraft system is **S**pecific (unambiguous), **M**easurable (quantifiable with units), **A**chievable (physically and financially possible), **R**elevant (traceable to mission goals), and **T**estable (verifiable through established methods).

## Why it matters
In aerospace engineering, vague requirements lead to catastrophic mission failures or massive cost overruns (e.g., the Mars Climate Orbiter disaster caused by unit ambiguity). Because spacecraft are built by distributed teams of specialists, SMART requirements act as the mathematical and legal contract between subsystems. In any hard engineering or ML discipline, translating a fuzzy human desire ("make the rocket fast" or "make the AI safe") into a quantifiable, verifiable constraint is the first step of actual engineering.

## When to study it
You must study this after mastering basic physics (Newtonian mechanics, thermodynamics, orbital mechanics) and introductory systems engineering. If you do not understand physical units, material properties, or basic conservation laws, you cannot determine if a requirement is *Measurable* or *Achievable*. 

## How to study it (step by step)
1. **Define the Mission Objective:** Start with the top-level "why." (e.g., "Image the Earth's surface").
2. **Draft a Raw Requirement:** Write down what the system needs to do in plain English.
3. **Quantify (Measurable & Specific):** Assign hard numbers, tolerances, and SI units to the raw requirement. 
4. **Run the Physics Check (Achievable):** Use first-principles math (e.g., orbital mechanics, thermodynamics) to prove the numbers do not violate the laws of physics or current technology limits.
5. **Trace it (Relevant):** Draw a direct line from this specific requirement back to the top-level mission objective. If it doesn't serve the objective, delete it.
6. **Assign Verification (Testable):** Determine exactly *how* you will prove the built hardware meets this requirement using the IADT matrix (Inspection, Analysis, Demonstration, Test).

## Key ideas, with intuition

**1. Specific & Measurable (The Language of Math)**
Engineering requirements use the word **"shall"** to denote a binding constraint. They must contain scalars, units, and operating conditions. 
*Bad:* "The structure shall be light." 
*Good:* "The primary structure mass shall be $m \le 150 \text{ kg}$."

**2. Achievable (Bounded by Physics)**
A requirement is only achievable if it obeys physical laws. You cannot write a requirement for a single-stage chemical rocket to have a $\Delta v$ of $50 \text{ km/s}$. The Tsiolkovsky rocket equation dictates:
$$ \Delta v = I_{sp} g_0 \ln\left(\frac{m_0}{m_f}\right) $$
To achieve that $\Delta v$ with chemical propellants ($I_{sp} \approx 450 \text{ s}$), the mass ratio $m_0/m_f$ would be physically impossible to build. Requirements must respect the math.

**3. Relevant (Traceability)**
Every requirement must have a "parent." This prevents "gold-plating"—adding cool but unnecessary features. If a requirement dictates a specific telemetry bandwidth, it must trace up to a requirement about data generation rates, which traces up to the mission science objectives.

**4. Testable (The IADT Framework)**
If you cannot prove a requirement was met, it is not a requirement. Testability in aerospace relies on four methods:
*   **I**nspection: Visual check (e.g., "Shall have no sharp edges").
*   **A**nalysis: Mathematical modeling (e.g., "Shall survive a micrometeoroid impact of energy $E = \frac{1}{2}mv^2$").
*   **D**emonstration: Operating the system (e.g., "Shall deploy solar panels").
*   **T**est: Measuring performance against a standard (e.g., "Shall maintain internal temperature at $T = 293 \pm 5 \text{ K}$ under vacuum").

## Worked example
**Raw, flawed requirement:** "The satellite's star tracker must be highly accurate and not draw too much power."

**Step 1: Critique against SMART**
*   *Specific:* Fails. "Highly accurate" and "too much" mean nothing.
*   *Measurable:* Fails. No units, no numbers.
*   *Achievable:* Unknown, because it's unquantified.
*   *Relevant:* Assumed relevant for attitude determination, but poorly stated.
*   *Testable:* Fails. You cannot test "highly accurate."

**Step 2: Rewrite into SMART requirements**
Break compound requirements ("and") into separate statements.

*Requirement 1 (Accuracy):* "The star tracker shall provide 3-axis attitude knowledge with an accuracy of $\le 5 \text{ arcseconds}$ (3$\sigma$) at an update rate of $\ge 10 \text{ Hz}$."
*Requirement 2 (Power):* "The star tracker shall consume $P \le 4.5 \text{ W}$ of orbit-average power during nominal operations."

**Reflection:**
We separated the constraints. We defined accuracy using a specific statistical bound ($3\sigma$) and angular units ($\text{arcseconds}$). We bounded the power with a strict inequality ($\le 4.5 \text{ W}$) and specified the operating condition ("nominal operations"). These can now be verified via *Test* (measuring power draw) and *Analysis/Test* (calculating attitude accuracy on a night-sky simulator).

## Diagrams

```text
REQUIREMENTS TRACEABILITY TREE (RELEVANCE)

[Level 1: Mission Objective]
"Provide continuous global broadband internet."
          |
          v
[Level 2: System Requirement]
"The constellation shall provide a minimum data 
 downlink rate of 100 Gbps per satellite."
          |
          +-------------------------+
          |                         |
          v                         v
[Level 3: Subsystem Req]    [Level 3: Subsystem Req]
POWER:                      COMMUNICATIONS:
"The solar array shall      "The Ka-band transmitter
generate P >= 5 kW at       shall operate at a center 
End of Life (EOL)."         frequency of f = 28 GHz."
```
*Notice how Level 3 physical constraints (Power, Frequency) are strictly Relevant to achieving the Level 2 data rate, which fulfills the Level 1 Mission.*

## Memory technique — remember this forever

**1. The "Hostile Contractor" First-Principle Rule**
If you forget the acronym, use this mental model: *Assume you are handing your requirement to a lazy, hostile contractor who wants to take your money and deliver a useless piece of hardware.* 
If your requirement is "make it fast," they will drop it out of an airplane, point to its terminal velocity, and demand payment. To prevent this, you are forced to write requirements that are Specific, Measurable, Achievable, Relevant, and Testable.

**2. Facts to Overlearn**
*   **"Shall"** = Binding Requirement. **"Should"** = Goal. Never mix them.
*   **IADT** = Inspection, Analysis, Demonstration, Test. Every requirement must map to one of these.
*   No compound requirements. One "shall" per sentence.

**3. Spaced-Repetition Schedule**
Review the SMART criteria and the Hostile Contractor Rule at: 1 day, 3 days, 7 days, 16 days, and 35 days.

## Common mistakes
*   **Specifying the *Design* instead of the *Requirement*:** Writing "The structure shall be made of Aluminum 6061-T6" instead of "The structure shall have a yield strength $\sigma_y \ge 270 \text{ MPa}$." Tell the engineers *what* it must withstand, not *how* to build it.
*   **Compound Requirements:** Using the word "and". If a requirement says "shall weigh $<10 \text{ kg}$ and draw $<5 \text{ W}$", and the hardware weighs $9 \text{ kg}$ but draws $6 \text{ W}$, the whole requirement fails. Split them up.
*   **Unbounded Environments:** Writing "shall operate flawlessly in space." Space is not one environment. You must specify: "shall operate in a thermal environment of $-40^\circ\text{C}$ to $+85^\circ\text{C}$ in a vacuum of $10^{-5} \text{ Torr}$."

## Self-check
1. Identify the SMART failures in this requirement: "The thermal control system shall keep the batteries warm during the eclipse phase and be highly reliable."
2. Rewrite the following design specification into a proper performance requirement: "The satellite shall use a 1-meter parabolic dish antenna to send data to Earth."
3. A systems engineer writes: "The cubesat propulsion system shall provide a thrust of $F = 10 \text{ kN}$." Given that a standard 1U cubesat has a mass of $\approx 1.3 \text{ kg}$, use $F = ma$ to explain which specific letter of the SMART framework this violates and why.