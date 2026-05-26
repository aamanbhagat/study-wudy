## 1. The one-sentence answer
**SMART requirements are statements that define spacecraft performance, interfaces, and constraints so each attribute is Specific, Measurable, Achievable, Relevant, and Testable.**

A requirement that fails any of these five attributes leaves engineers with an ambiguous target. “The structure shall be strong” cannot be verified on a test stand or in a finite-element model; the same sentence rewritten as “The primary structure shall sustain a 5 g axial load with a minimum factor of safety of 1.4 under qualification testing per NASA-STD-8739.4” can be checked with numbers, dates, and pass/fail criteria. The five SMART filters therefore convert mission intent into engineering contracts that survive reviews, supplier hand-offs, and flight.

When all requirements satisfy SMART, the verification matrix becomes a simple lookup table rather than an argument. Traceability from each requirement to a test procedure, a model, or an inspection record is automatic. The spacecraft that flies is then demonstrably the spacecraft that was specified.

> [!NOTE]
> The decisive “aha” is that SMART is not a writing style; it is a verification contract. If a requirement cannot be tested, it is not yet a requirement.

## 2. Why this matters — concrete and current
NASA’s Mars Sample Return campaign uses SMART requirements to allocate mass, power, and contamination budgets between the Perseverance rover, the Sample Retrieval Lander, and the Earth Return Orbiter; each interface requirement carries a numeric tolerance and a verification method so that three separate contractors can proceed in parallel without interface mismatches.

SpaceX’s Starship propellant-tank requirements are written with explicit burst-pressure margins and thermal-cycle counts that map directly onto the automated weld-inspection and proof-test sequence performed on the factory floor; this allows rapid iteration while still satisfying FAA launch-license safety cases.

The James Webb Space Telescope’s thermal-stability requirement (“wavefront error contribution from the primary-mirror backplane shall not exceed 23 nm RMS after 14 K cool-down”) was verified by a single cryogenic test at Johnson Space Center; the numeric value and the test protocol were fixed years earlier, eliminating post-test disputes about whether the hardware met specification.

ESA’s Solar Orbiter heat-shield requirements included a measurable solar-absorptance limit of ≤0.14 after 10 000 h of UV exposure; the value drove the selection of a specific coating and a ground-test campaign whose results were accepted by the launch-authority review board without reinterpretation.

## 3. Mental prerequisites

| Concept | Why you need it here |
|---------|----------------------|
| Mission objectives and top-level functions | SMART requirements are derived from these; without them relevance cannot be judged |
| Basic verification methods (test, analysis, inspection, demonstration) | Every SMART requirement must name its verification method |
| Interface-control documents and mass/power budgets | Provide the numeric boundaries that make a requirement measurable and achievable |
| Factor-of-safety conventions (e.g., NASA-STD-8739.4) | Supply the acceptance thresholds required for testability |

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with the mission need, not the hardware
A spacecraft exists to deliver a measurable effect (data, velocity increment, sample return). The requirement must therefore name that effect.

Example: “Return 500 g of Martian regolith to Earth by 2031.”

Formal statement:  
$$R_0:\text{Return mass } m_r \ge 500\,\text{g to Earth landing site by calendar year } 2031.$$

> [!WARNING]
> If the sentence names a component (“use a 3 m antenna”) before the needed function is stated, relevance and testability are already lost.

### Step 2 — Make the attribute Specific
Replace vague adjectives with the exact physical quantity and its location or condition.

Formal statement:  
$$R_1:\text{Return mass } m_r \text{ measured at Earth landing site after terminal sterilization, } m_r \ge 500\,\text{g}.$$

### Step 3 — Attach a Measurement scale and tolerance
A number without units or uncertainty cannot be compared with test data.

Formal statement:  
$$R_2: m_r \ge 500 \pm 5\,\text{g (3}\sigma\text{)} \text{ at 1 atm, 293 K}.$$

### Step 4 — Verify Achievability against known physics and budgets
Check that the allocated resource (mass, power, schedule) lies inside the envelope of existing technology or credible extrapolation.

Example check: current sample-acquisition systems deliver 400 g; margin exists if drill energy budget is increased by 15 %. If the check fails, the requirement is rewritten, not kept as a wish.

### Step 5 — Confirm Relevance to mission success criteria
Trace the requirement upward to a mission objective. If removal of the requirement still satisfies the mission, it is not relevant and should be deleted.

### Step 6 — Define the Test or verification method explicitly
State the standard, the environment, the pass/fail limit, and the data product.

Formal statement:  
$$R_3: \text{Verification by test per NASA-STD-8739.4, para. 4.2.3; sample mass measured on calibrated scale (uncertainty <1 g) after 10 thermal cycles between 150 K and 300 K}.$$

### Step 7 — Close the loop with a unique identifier and parent/child traceability
Each requirement receives an identifier (e.g., SYS-REQ-047) that appears in the verification matrix and the requirements database.

### Step 8 — Textbook statement of the result
A requirement set is SMART if and only if every member satisfies the five predicates above and is recorded with bidirectional traceability to mission objectives and verification procedures.

## 5. Worked examples — every step shown

**Example 1 — Mass of returned sample**  
*Given:* Mission objective: return at least 500 g of Martian material.  
*Find:* A SMART requirement.  
Step 1: Identify quantity → mass at Earth landing site.  
*Why:* Prevents confusion with mass at launch.  
Step 2: Add tolerance and conditions → \( m_r \ge 500 \pm 5 \) g at 293 K, 1 atm.  
*Why:* Enables direct comparison with scale reading.  
Step 3: Name verification → test on calibrated balance after sterilization.  
*Why:* Converts the number into a pass/fail datum.  
**Final answer**  
SYS-REQ-001: Returned sample mass \( m_r \ge 500 \pm 5 \) g (3σ) measured at Earth landing site after terminal sterilization, verified by test per NASA-STD-8739.4.  

*Reflection:* The original phrase “enough sample” contained no number; once the number and verification method were added, the requirement became usable by three different contractors.

**Example 2 — Solar-array power at end of life**  
*Given:* 5-year mission, 1.5 AU aphelion.  
*Find:* SMART power requirement.  
Step 1: Quantity → electrical power delivered to spacecraft bus at 1.5 AU after 5 years.  
Step 2: Add margin → \( P_{\text{EOL}} \ge 1200 \) W at 1.5 AU, AM0 spectrum, 28 °C cell temperature.  
Step 3: Verification → analysis validated by 5-year UV/particle test on coupon.  
**Final answer**  
SYS-REQ-014: Spacecraft bus power at EOL \( P_{\text{EOL}} \ge 1200 \) W under 1.5 AU AM0 illumination after 5 years, verified by analysis correlated to test.  

*Reflection:* Temperature and spectrum were added because “power” alone is ambiguous at different operating points.

**Example 3 — Structural factor of safety**  
*Given:* Primary structure must survive launch loads.  
*Find:* SMART structural requirement.  
Step 1: Quantity → axial yield margin.  
Step 2: Numeric limit → factor of safety ≥ 1.4 on yield for qualification loads.  
Step 3: Verification → static load test to 1.4 × limit load, no permanent set > 0.2 %.  
**Final answer**  
STR-REQ-022: Primary structure factor of safety on yield ≥ 1.4 under qualification loads, verified by test with strain-gauge data.  

*Reflection:* The phrase “strong enough” was replaced by a number and a test protocol that can be executed on a hydraulic table.

**Example 4 — Thermal interface temperature**  
*Given:* Avionics box must remain within part ratings.  
*Find:* SMART interface requirement.  
Step 1: Quantity → maximum base-plate temperature.  
Step 2: Limit and condition → \( T_{\max} \le 50^\circ \)C at 1.0 AU, 1200 W dissipation, beginning of life.  
Step 3: Verification → thermal-balance test in vacuum chamber with solar simulator.  
**Final answer**  
THM-REQ-031: Avionics base-plate temperature \( T \le 50^\circ \)C under 1.0 AU, 1200 W dissipation, verified by thermal-balance test.  

*Reflection:* The original “keep it cool” supplied neither a number nor the environmental conditions needed for the test.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| “Shall be lightweight” | Desire to keep options open | Replace with numeric mass allocation plus verification method |
| Requirement hidden inside a rationale | Author treats explanation as the requirement | Move rationale to “Rationale” field; keep only the verifiable clause |
| Verification method omitted | Assumption that “obvious” test exists | Force every requirement to name one of: test, analysis, inspection, demonstration |
| Multiple “shalls” in one sentence | Attempt to save database rows | Split into separate requirements, each with its own identifier |
| “Shall survive launch” without load spectra | Loads are defined elsewhere | Reference the controlling ICD or load document with revision letter |
| Achievability never checked | Schedule pressure | Require a short feasibility calculation before requirement is baselined |
| Relevance lost after mission change | No upward trace | Maintain bidirectional links to mission objectives; delete orphans at each baseline review |

## 7. The textbook-precise statement
A requirement \( R \) is SMART if it satisfies the conjunction of five predicates:

- Specific: \( R \) denotes a single, unambiguous physical quantity or interface.  
- Measurable: \( R \) contains a numeric value, tolerance, and reference conditions.  
- Achievable: \( R \) lies inside the feasible set defined by physics, technology, and allocated budgets.  
- Relevant: \( R \) is necessary and sufficient for at least one mission objective.  
- Testable: there exists a documented verification procedure whose outcome maps to a binary or quantitative pass/fail decision.

Reference: NASA Systems Engineering Handbook, NASA/SP-2016-6105 Rev 2, §4.2.2 “Requirements Definition”.

## 8. Visual — diagram or schematic
```text
Mission Objective
      │
      ▼
[Specific]──►[Measurable]──►[Achievable]──►[Relevant]──►[Testable]
      │            │              │            │            │
      ▼            ▼              ▼            ▼            ▼
   Quantity     Value+Units   Feasibility   Trace to     Verification
   & Location   & Tolerance   Check         Objective    Method
      │            │              │            │            │
      └────────────┴──────────────┴────────────┴────────────┘
                              │
                              ▼
                    Baselines Requirement
                    (ID, Owner, Verification Matrix)
```

## 9. The memory technique
1. **The hook** — Picture a five-rung ladder leaning against a rocket; each rung is labeled S-M-A-R-T. If any rung is missing the ladder collapses and the rocket never leaves the pad.

2. **What to overlearn** — The five words in order and the single sentence “If it cannot be tested, it is not a requirement.”

3. **Spaced-repetition schedule** — Review the five definitions at 1 day, 3 days, 7 days, 16 days, and 35 days after first study; each review must include rewriting one bad requirement into SMART form.

4. **First-principles fallback** — Re-derive from the verification matrix: start with the test or analysis that will be performed, then work backward to the single numeric statement that makes that procedure decisive.

## 10. What this unlocks
SMART requirements are the input to requirements management databases, verification planning, interface control, and risk management. Once mastered, the student can proceed directly to requirements allocation and decomposition, failure modes and effects analysis (FMEA), and the construction of a verification compliance matrix that satisfies launch-license authorities.

- Requirements flow-down and allocation  
- Verification and validation planning  
- Model-based systems engineering (MBSE) requirement objects  
- Configuration management baselines  
- Safety and mission assurance audits  

## 11. Self-check — five questions, no answers
1. Convert the sentence “The spacecraft shall be reliable” into a SMART requirement for a 5-year GEO mission; state the verification method.

2. A requirement states “Solar-array power shall be 2 kW.” Identify which SMART attribute is missing and rewrite the sentence to correct it.

3. Given a requirement that traces to no mission objective, what single action must be taken during the next baseline review?

4. An engineer proposes verifying a structural load requirement solely by finite-element analysis. Under what precise conditions is this acceptable under the SMART definition?

5. A requirement contains two independent numeric limits joined by “and.” Explain the database and verification consequences and the corrective action required.