## 1. The one-sentence answer
**Safety-critical standards such as DO-178C, IEC 61508 and ISO 26262 are prescriptive, auditable frameworks that force software development processes in embedded systems to achieve a quantified probability of failure commensurate with the severity of harm the system can cause.**

These frameworks begin from the observation that software in aircraft, industrial machinery and automobiles can directly kill or injure people. They therefore replace ad-hoc coding practices with a chain of evidence: hazard analysis determines the worst credible outcome, that outcome maps to a discrete safety level, and each safety level dictates the depth of requirements traceability, testing coverage, configuration management and independent review required before certification authorities will accept the software.

The result is not a guarantee of zero defects; it is an explicit, documented argument that the residual risk has been reduced below an accepted threshold, supported by artefacts that an external assessor can examine.

> [!NOTE]
> The single most important insight is that these standards certify the *development process and its evidence*, not the finished code itself; a perfect program produced without the required artefacts still fails certification.

## 2. Why this matters — concrete and current
Boeing’s 737 MAX flight-control software was required to satisfy DO-178C Design Assurance Level A or B; the absence of complete requirements traceability and independence in certain modules contributed to the grounding and subsequent regulatory scrutiny.

Automotive suppliers developing electric-steering and autonomous-emergency-braking controllers must demonstrate ISO 26262 ASIL D compliance; Tesla’s 2023 recall of 2 million vehicles for Autopilot software updates was driven in part by the need to show that hazard-analysis artefacts and verification coverage met the standard.

Industrial robot manufacturers selling collaborative arms into European factories must certify the safety PLC and motion-control firmware to IEC 61508 SIL 3; failure to produce the mandated fault-insertion test reports blocks CE marking and market access.

Medical-device ventilators and infusion pumps fall under IEC 62304, which explicitly references IEC 61508 techniques; the 2021 FDA guidance on “Software as a Medical Device” now requires the same safety-case structure for cloud-connected algorithms that adjust drug delivery.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| Hazard and risk          | Every standard begins by identifying what harm is possible and how likely it is.     |
| Requirements traceability| Evidence must link each hazard to a requirement, to code, to verification results.   |
| Failure-rate quantification | Safety levels are defined by target probabilities (e.g., 10⁻⁹ per flight hour).     |
| Configuration management | All artefacts must be uniquely identified and change-controlled for audit.           |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the credible harm
Plain-English claim: Begin by enumerating every way the system could injure a person or damage property, then rank each scenario by severity.  
Concrete example: An aircraft pitch-trim runaway can produce unrecoverable nose-down attitude; severity is “catastrophic”.  
Formal statement:  
$$ \text{Severity}(h) \in \{\text{Catastrophic, Hazardous, Major, Minor, No effect}\} $$  
> [!WARNING]
> Under-estimating severity by one level immediately relaxes every downstream requirement; regulators will reject the entire safety case.

### Step 2 — Map severity to a discrete safety level
Plain-English claim: Each standard supplies a table that converts severity plus exposure and controllability into a single integer safety level.  
Concrete example: Catastrophic failure in an aircraft maps to DO-178C DAL A.  
Formal statement:  
$$ \text{Level} = f(\text{Severity}, \text{Exposure}, \text{Controllability}) $$  
> [!WARNING]
> Treating the mapping as optional or “engineering judgment” violates the standard’s normative text.

### Step 3 — Derive process objectives from the safety level
Plain-English claim: Higher levels require more rigorous objectives: 100 % MC/DC coverage, formal methods, or independence between developer and verifier.  
Formal statement:  
$$ \text{Objectives}(\text{Level}) = \{\text{traceability depth}, \text{coverage metric}, \text{independence}\} $$  
> [!WARNING]
> Satisfying only the coding rules while skipping traceability leaves the safety case incomplete.

### Step 4 — Produce and maintain the evidence artefacts
Plain-English claim: Every objective must be supported by a dated, version-controlled document or tool output that an auditor can retrieve.  
Formal statement:  
$$ \text{Evidence set} = \{R, D, C, V, CM\} $$  
where \(R\) = requirements, \(D\) = design, \(C\) = code, \(V\) = verification, \(CM\) = configuration management.  
> [!WARNING]
> Post-certification changes without re-running the full evidence chain invalidate the approval.

### Step 5 — Submit the safety case for certification
Plain-English claim: The collected artefacts constitute an argument that residual risk is below the regulatory threshold; certification authorities either accept or reject the argument.  
Formal statement:  
$$ \text{Certification} \iff \text{Assessor accepts SafetyCase}(\text{Evidence set}) $$  
This is the textbook endpoint of the standards.

## 5. Worked examples — every step shown

**Example 1 — Simple brake-light controller**  
*Given:* A rear brake-light module can fail to illuminate.  
*Find:* Applicable ISO 26262 level.  
Severity = Major (rear-end collision possible). Exposure = E4 (almost every drive). Controllability = C2 (driver can still brake).  
Step 1: Hazard = “no brake indication”.  
Step 2: Table lookup yields ASIL B.  
Step 3: Requires 100 % statement coverage and traceability to software units.  
**ASIL B**

*Reflection:* The example is easy because exposure and controllability are high; the trap is forgetting exposure when severity alone feels low.

**Example 2 — Aircraft flap asymmetry monitor**  
*Given:* Loss of flap symmetry can produce roll > 60°.  
*Find:* DO-178C DAL.  
Severity = Catastrophic.  
Step 1–2: DAL A.  
Step 3: Requires MC/DC, formal review of every requirement, and independence.  
**DAL A**

*Reflection:* One severity jump forces an order-of-magnitude increase in verification effort.

**Example 3 — Industrial press controller**  
*Given:* Unexpected press actuation can crush an operator.  
*Find:* IEC 61508 SIL.  
Severity = Catastrophic, PFH target < 10⁻⁸.  
Step 2 yields SIL 3.  
Step 3 demands fault-insertion testing and proven-in-use data.  
**SIL 3**

*Reflection:* Quantitative probability target appears; qualitative process alone is insufficient.

**Example 4 — Automotive steer-by-wire with fallback**  
*Given:* Primary motor fails; mechanical backup exists.  
*Find:* ASIL decomposition.  
Original ASIL D can be decomposed into two ASIL B(D) lanes if independence is shown.  
Step 4: Evidence must now include freedom-from-interference analysis.  
**ASIL B(D) + ASIL B(D)**

*Reflection:* Decomposition is powerful but requires extra independence evidence that many teams overlook.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Treating standards as coding style guides | Developers focus on “no goto” rules only   | Map every coding rule back to its originating safety level objective |
| Skipping tool qualification       | “Our compiler has never crashed”            | Perform or reference IEC 61508-3 Table A.3 qualification |
| Changing requirements after baseline without impact analysis | Schedule pressure                           | Enforce a formal change-control board with re-verification checklist |
| Assuming COTS library is “safe”   | Library passed unit tests in another project | Re-qualify or wrap with additional safety monitors   |
| Confusing SIL/DAL/ASIL numeric values | Different standards use different scales   | Always state the standard name with the level        |
| Incomplete traceability matrix    | Requirements written in natural language    | Use a requirements tool that exports unique IDs and verification links |
| Post-certification patches without re-certification | “It’s just a bug fix”                       | Re-run the full safety-case delta analysis           |

## 7. The textbook-precise statement
DO-178C (RTCA, 2011) defines five Design Assurance Levels (A–E) whose objectives are enumerated in Annex A tables; satisfaction of all objectives at the assigned level, together with a completed traceability matrix and configuration index, constitutes the software accomplishment summary acceptable to certification authorities. IEC 61508-3:2010 specifies safety integrity levels SIL 1–4 for software, requiring that the probability of dangerous failure per hour (PFH) lie below 10⁻⁵, 10⁻⁶, 10⁻⁷ or 10⁻⁸ respectively, achieved through a combination of systematic capability and probabilistic hardware evidence. ISO 26262-6:2018 defines Automotive Safety Integrity Levels ASIL A–D with analogous process tables and permits ASIL decomposition when independence is demonstrated. (Reference: DO-178C §1.4; IEC 61508-3 §7.4.4; ISO 26262-6 §9.)

## 8. Visual — diagram or schematic
```text
Hazard Analysis
      │
      ▼
Severity × Exposure × Controllability
      │
      ▼
Safety Level (DAL A / SIL 3 / ASIL D)
      │
      ├─► Process Objectives (traceability, coverage, independence)
      │
      ▼
Evidence Artefacts (R, D, C, V, CM)
      │
      ▼
Safety Case → Certification Authority
```
Each downward arrow represents a mandatory mapping that must be documented and auditable.

## 9. The memory technique
1. **The hook** — Picture a three-legged stool labelled “Severity–Process–Evidence”; if any leg is missing the stool collapses and certification fails.
2. **What to overlearn** — The four PFH targets for SIL 1–4; the five DAL letters and their catastrophic-to-no-effect mapping; the phrase “certify the process, not the code”.
3. **Spaced-repetition schedule** — Review the three standards’ level tables at 1 day, 3 days, 7 days, 16 days and 35 days after first study.
4. **First-principles fallback** — Re-derive the required level by listing the single worst credible accident, assigning its severity, then consulting the normative mapping table of the relevant standard.

## 10. What this unlocks
Mastery of these standards lets you design certifiable real-time schedulers, fault-tolerant communication stacks and safety monitors that satisfy regulatory gates in avionics, automotive and industrial domains. It directly precedes topics such as formal verification with model checkers, worst-case execution-time analysis under DO-178C, and safety-case construction with GSN notation.

## 11. Self-check — five questions, no answers
1. An automotive lane-keeping system can cause a head-on collision at highway speed. Which single ISO 26262 parameter most strongly drives the resulting ASIL?
2. A DO-178C DAL A project delivers 100 % statement coverage but only 92 % MC/DC coverage. Which objective is violated and why?
3. IEC 61508 SIL 3 requires a maximum PFH of what value? Show the exponent.
4. You inherit a C library used in a previous SIL 2 system. Which additional activity is mandatory before reuse at SIL 3?
5. A change to a single requirement after certification is proposed. List the minimal set of artefacts that must be regenerated to preserve the safety case.