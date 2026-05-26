## 1. The one-sentence answer
**Safety-critical standards such as DO-178C, IEC 61508 and ISO 26262 are formal documents that prescribe processes, objectives and evidence required to show that embedded software in life-critical systems will not cause unacceptable harm.**

DO-178C focuses on airborne software used in aircraft. It defines five Design Assurance Levels (DAL A to E) where DAL A demands the highest rigour because a failure can cause catastrophic loss of the aircraft. IEC 61508 is the parent functional-safety standard that introduces Safety Integrity Levels (SIL 1–4) and applies to any electrical, electronic or programmable system. ISO 26262 adapts the same ideas for road vehicles and uses Automotive Safety Integrity Levels (ASIL A–D) together with ASIL QM for non-safety functions.

These standards do not dictate algorithms or code style; they dictate how you plan, develop, verify and document every artefact so that residual risk stays below a quantified threshold. The central idea is that higher integrity levels require exponentially more independent review, testing and traceability.

> [!NOTE]
> The single most important insight is that the standards treat process evidence, not just test results, as the primary proof of safety; passing all tests is never enough without the documented chain of objectives and reviews.

## 2. Why this matters — concrete and current
Boeing 787 flight-control software and Airbus A350 flight-control software were both developed under DO-178C DAL A; every requirement, test case and review record is archived for certification by EASA and FAA.

Tesla Autopilot and Mobileye EyeQ systems follow ISO 26262 ASIL D for the braking and steering paths; the standard forces explicit freedom-from-interference arguments between ASIL-D and QM code running on the same SoC.

IEC 61508 SIL 3 is applied to the reactor protection systems at the ITER fusion experiment; any programmable logic that can initiate a scram must demonstrate that the probability of dangerous failure per hour is below 10^-7.

Siemens Healthineers MRI gradient-amplifier controllers are certified to IEC 61508 SIL 2; a single undetected software fault could produce hazardous magnetic fields, so the standard requires diverse monitoring channels and formal failure-mode analysis.

Infineon Aurix TC3xx microcontrollers used in automotive ECUs carry ISO 26262 ASIL D certificates; the hardware safety features (lockstep cores, ECC, MPU) are only usable after the software team satisfies the corresponding software-process objectives.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Requirements traceability | Every safety objective must be linked to code and tests   |
| Failure Mode and Effects Analysis (FMEA) | Standards require systematic identification of hazardous failures |
| Independence in verification | Higher integrity levels demand reviewers who did not write the code |
| Configuration management | All artefacts must be uniquely identified and change-controlled |

If any of these four concepts are unfamiliar, pause and study them first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the hazard and its severity
You begin by listing every possible harm the system can cause and classifying its worst credible outcome.  
Example: in an aircraft flight-control computer the hazard “uncommanded elevator deflection” can produce loss of aircraft; this is Catastrophic.  
Formally:  
$$Severity \in \{\text{Catastrophic, Hazardous, Major, Minor, No Safety Effect}\}.$$  
> [!WARNING] If you under-classify severity, the entire downstream assurance level collapses and certification is rejected.

### Step 2 — Map severity to an integrity level
Each standard supplies a table that converts severity plus exposure and controllability into a required integrity level.  
Example: Catastrophic + probable exposure in an aircraft maps to DAL A under DO-178C.  
Formal statement:  
$$IntegrityLevel = f(Severity, Exposure, Controllability).$$  
> [!WARNING] Using the wrong column of the mapping table (for example confusing “exposure” with “failure rate”) produces an incorrect level.

### Step 3 — Select the development lifecycle and objectives
Higher levels impose more objectives (DO-178C Table A-1 to A-10). DAL A requires 72 objectives; DAL C requires only 32.  
Example: DAL A demands formal verification of all requirements; DAL C accepts reviews.  
> [!WARNING] Omitting even one objective at the chosen level voids the entire certification credit.

### Step 4 — Establish bidirectional traceability
Every requirement, design element, code module and test case must be traceable in both directions.  
Formal:  
$$\forall r \in Requirements \;\exists\; c \in Code, t \in Tests : trace(r,c) \land trace(c,t) \land trace(t,r).$$  
> [!WARNING] Tool-generated traceability that is never manually reviewed frequently contains circular or missing links.

### Step 5 — Perform verification with independence
Test execution, review and analysis must be performed by persons or tools whose independence matches the integrity level.  
> [!WARNING] Using the same engineer for both implementation and verification at DAL A/B or ASIL C/D is an immediate audit failure.

### Step 6 — Produce the safety case and obtain certification
All evidence is assembled into a safety case that argues “the system is acceptably safe because all objectives have been met and residual risk is below threshold”. An independent certification authority audits the case.

## 5. Worked examples

**Example 1 — Simple severity classification**  
*Given:* An automotive steering-angle sensor software can produce an erroneous 30° command.  
*Find:* ASIL level assuming probable exposure and difficult controllability.  
Step 1: Severity = S3 (life-threatening injury).  
Step 2: Exposure = E3 (medium probability).  
Step 3: Controllability = C2 (difficult).  
Result per ISO 26262 table: **ASIL C**.  
*Why each step:* Severity comes from injury scale; exposure and controllability are taken directly from the standard’s definitions.

**Example 2 — Objective count**  
*Given:* DO-178C DAL B project.  
*Find:* Minimum number of objectives that must be satisfied.  
From DO-178C Table A-1: DAL B requires 69 objectives.  
**Answer: 69**  
*Reflection:* The number is not arbitrary; it reflects the additional independence and documentation required compared with DAL C.

**Example 3 — Traceability check**  
*Given:* 47 high-level requirements, 112 low-level requirements, 210 source files.  
*Find:* Minimum number of trace links needed for full bidirectional coverage.  
Each high-level requirement must link to at least one low-level requirement and each low-level requirement to at least one source file and one test. Minimum links = 47 + 112 + 210 = **369** directed links.  
*Why:* The formula counts every required direction once.

**Example 4 — Independence violation**  
*Given:* A SIL 3 function is reviewed by the same engineer who wrote the code.  
*Find:* Consequence under IEC 61508.  
The standard requires that verification of SIL 3 software be performed by an independent person or organisation. The evidence is invalid; recertification with independent review is mandatory.  
**Answer: Evidence rejected.**

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating “tested” as “safe”       | Confusion between testing and assurance     | Always map every test to an explicit objective |
| Copy-paste of DAL A evidence into DAL C project | Desire to reuse documents                   | Re-evaluate every objective for the actual level |
| Missing tool qualification        | Assuming compiler or code generator needs no qualification | Apply DO-330 or ISO 26262-8 clause 11        |
| One-way traceability only         | Tool produces forward links automatically   | Manually verify reverse links exist          |
| Ignoring freedom-from-interference | Mixed ASIL QM and ASIL D code on same MCU   | Perform interference analysis at architecture stage |
| Late creation of safety case      | Viewed as paperwork at the end              | Maintain living safety case from day one     |
| Underestimating independence cost | Management pressure to reduce headcount     | Budget independent reviewers in the project plan |

## 7. The textbook-precise statement
RTCA DO-178C, “Software Considerations in Airborne Systems and Equipment Certification”, Section 1.4 states: “The software level is determined by the system safety assessment process and is based on the failure condition category of the most severe failure condition that the software could cause or contribute to.” The five software levels (A–E) are defined such that Level A software must satisfy all objectives in Annex A tables with independence where indicated. IEC 61508-3:2010, Clause 7.4.2 similarly requires that the software safety integrity level (SIL) be derived from the hardware safety integrity level and that the software lifecycle be commensurate with that SIL.

## 8. Visual — diagram or schematic
```
Hazard → Severity → Exposure → Controllability
          ↓
   Integrity Level (DAL / SIL / ASIL)
          ↓
Objectives (Table A-x) → Development → Verification (independence)
          ↓
Traceability Matrix → Safety Case → Certification
```

## 9. The memory technique
1. **The hook** — Picture three traffic lights on an aircraft wing: red (DO-178C DAL A), amber (IEC 61508 SIL 3), green (ISO 26262 ASIL D). The colour tells you how many independent eyes must watch every line of code.
2. **What to overlearn** — DAL A = 72 objectives, SIL 4 = PFD < 10^-8 /h, ASIL D = ASIL D.
3. **Spaced-repetition schedule** — Review the mapping tables at 1 day, 3 days, 7 days, 16 days and 35 days after first study.
4. **First-principles fallback** — If you forget the level, restart from the hazard: list the worst credible accident, read the severity column, then follow the standard’s table row by row.

## 10. What this unlocks
Mastery of these standards lets you design certifiable real-time schedulers, write MISRA-compliant device drivers, and produce the artefacts required for type certification.  
- Next topics: DO-331 model-based development supplement, ISO 26262-6 software implementation, and formal methods under DO-333.  
- You can now evaluate commercial RTOSes for certification credit and estimate verification effort for a given integrity level.

## 11. Self-check — five questions, no answers
1. An aircraft system has a failure condition classified “Hazardous”. Which DAL is required if the software can cause or contribute to that condition?  
2. Under IEC 61508, what is the maximum allowable probability of dangerous failure per hour for SIL 2?  
3. Why does ISO 26262 require a freedom-from-interference argument when ASIL D and QM software share the same microcontroller?  
4. A project claims DAL B compliance yet the reviewer who performed requirement reviews also wrote 40 % of the code. Which objective is violated?  
5. Given 120 high-level requirements and only 95 traced test cases, what is the minimum number of additional trace links needed for complete coverage?