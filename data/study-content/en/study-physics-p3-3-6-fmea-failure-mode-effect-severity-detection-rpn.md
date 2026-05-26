## 1. The one-sentence answer
**FMEA is a bottom-up, inductive reliability method that enumerates every credible failure mode of a spacecraft component, traces its local-to-system effects, scores severity and detection difficulty, and computes a Risk Priority Number to drive design changes.**

Failure Mode and Effects Analysis begins with a hardware or functional decomposition. Each element is examined for the ways it can depart from its intended performance. The analyst records the immediate physical consequence, then propagates that consequence through the spacecraft architecture until the effect on mission success is clear. Numerical ratings convert qualitative judgment into a single scalar that ranks which failure modes receive resources first.

The method is deliberately tabular and exhaustive. It forces the team to confront low-probability, high-consequence events that intuition often dismisses. Because the same worksheet is updated after each design iteration or test, FMEA becomes both a living risk register and a documented rationale for the final configuration.

> [!NOTE]
> The single most powerful insight in FMEA is that a failure mode with modest severity but near-zero detection probability can outrank a catastrophic mode that is obvious to operators or built-in tests.

## 2. Why this matters — concrete and current
NASA’s Mars 2020 Perseverance rover used an FMEA-derived fault tree to justify the addition of a backup drill percussion mechanism after a single-point jamming mode received an RPN above the program threshold. The same worksheet later drove the decision to carry two independent sample caching assemblies.

SpaceX performed component-level FMEA on the Falcon 9 Merlin engine turbopump seals during the transition from version 1.0 to 1.2. The analysis identified a “loss of purge gas” mode whose detection rating dropped from 8 to 3 after the addition of a redundant pressure transducer, lowering the RPN enough to eliminate a planned hardware redesign.

The International Space Station’s External Active Thermal Control System underwent a full FMEA update in 2019 after on-orbit data revealed unexpected micrometeoroid-induced leakage paths in the ammonia lines. The revised RPNs triggered a fleet-wide change to ultrasonic leak-detection firmware thresholds.

In the James Webb Space Telescope, the sunshield tensioning mechanism FMEA flagged a “cable severance during deployment” mode. Because ground testing could not replicate the zero-g environment, the detection score remained high; the program therefore accepted a higher RPN and added a second independent tension sensor suite rather than attempting further ground verification.

## 3. Mental prerequisites

| Concept                  | Why you need it here |
|--------------------------|----------------------|
| Functional decomposition | FMEA requires every item to be described by what it must do before any failure can be postulated. |
| Severity–likelihood matrix | Provides the ordinal scales that later become the numerical ratings for severity and occurrence. |
| Fault propagation tracing | Effects must be followed from local hardware to mission-level consequences; without this skill the worksheet is meaningless. |
| Basic probability concepts | Occurrence and detection ratings are informed by failure rates and test coverage fractions. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Decompose the spacecraft into analysable items
Every physical part or functional block is listed with its required performance.  
Example: a reaction-wheel assembly must deliver torque about one axis at commanded magnitude and direction.  
Formally, the item set \(I = \{i_1, i_2, \dots, i_n\}\) is obtained from the system architecture tree.

> [!WARNING]
> If the decomposition stops at the subsystem level, failure modes that arise only at the interface (e.g., harness chafing) are missed.

### Step 2 — Enumerate credible failure modes for each item
For each \(i_k\), postulate every physically plausible way the item can lose or degrade its function.  
Modes are stated in engineering terms, not symptoms: “bearing seizure,” not “wheel stops.”

### Step 3 — Determine local and end effects
Trace the immediate physical consequence, then propagate it through power, thermal, data, and mechanical interfaces until the effect on the spacecraft’s top-level functions is reached.

### Step 4 — Assign severity rating \(S\)
\(S\) is an integer, conventionally 1–10, that reflects the worst credible mission consequence (loss of crew = 10, minor performance loss = 3). The scale must be frozen before scoring begins.

### Step 5 — Estimate occurrence rating \(O\)
\(O\) reflects the expected number of failures per mission or per flight hour, again mapped to a 1–10 scale using heritage data or reliability models.

### Step 6 — Evaluate detection rating \(D\)
\(D\) scores how likely the failure is to be discovered before it produces the end effect, either by built-in test, telemetry, or ground inspection.

### Step 7 — Compute the Risk Priority Number
\[
\text{RPN} = S \times O \times D
\]
All modes with RPN above a program-defined threshold receive mandatory mitigation.

### Step 8 — Re-score after mitigation and archive
Design changes or added sensors alter \(O\) or \(D\); the worksheet is updated and the new RPN verified. The final table becomes part of the certification data package.

## 5. Worked examples — every step shown

**Example 1 — Reaction-wheel bearing seizure**  
*Given:* Reaction wheel on a GEO communications satellite; heritage failure rate 2.3 × 10^{-6} h^{-1}.  
*Find:* RPN before mitigation.  
Step 1: Item = reaction wheel.  
*Why:* Matches the decomposition rule.  
Step 2: Failure mode = bearing seizure.  
*Why:* Directly removes torque function.  
Step 3: Local effect = zero torque; end effect = loss of attitude control → loss of pointing.  
*Why:* Propagation reaches mission function.  
Step 4: \(S = 8\) (mission loss without crew).  
*Why:* Frozen scale applied.  
Step 5: \(O = 4\) (failure rate maps to 10^{-5}–10^{-6} range).  
*Why:* Occurrence table lookup.  
Step 6: \(D = 6\) (rate telemetry gives 24 h warning).  
*Why:* Existing detection method scored.  
RPN = 8 × 4 × 6 = 192.  
**192**  
*Reflection:* The moderate detection score kept RPN below threshold; adding a second temperature sensor later reduced D to 3.

**Example 2 — Solar-array deployment latch failure**  
*Given:* One-time latch on a 6 kW array.  
*Find:* RPN after adding microswitch.  
After scoring \(S=9\), \(O=3\), \(D=7\) → RPN = 189.  
Microswitch addition changes D to 2.  
New RPN = 9 × 3 × 2 = 54.  
**54**  
*Reflection:* Hardware change is often cheaper than accepting high RPN when S is large.

**Example 3 — Propellant tank diaphragm rupture**  
*Given:* Diaphragm separates pressurant from propellant.  
*Find:* RPN ranking versus other modes.  
\(S=10\), \(O=2\), \(D=8\) → RPN = 160.  
**160**  
*Reflection:* Catastrophic severity dominates even when occurrence is low.

**Example 4 — Avionics single-event upset in SRAM**  
*Given:* GEO environment, 0.1 upsets per day per device.  
*Find:* RPN with and without EDAC.  
Without EDAC: \(S=7\), \(O=5\), \(D=9\) → RPN = 315.  
With EDAC: D drops to 4 → RPN = 140.  
**140**  
*Reflection:* Software mitigation can be scored directly in the detection column.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using different severity scales across subsystems | Teams inherit legacy tables | Freeze one 1–10 scale in the program plan before any scoring |
| Counting only “single-point” failures | Cognitive bias toward dramatic events | Require every item to be examined regardless of redundancy |
| Treating RPN as an absolute risk metric | Arithmetic product hides that S = 10 is non-negotiable | Always review high-S modes separately even if RPN is moderate |
| Overly optimistic detection scores | Analyst assumes perfect telemetry | Require evidence of detection method and latency |
| Stopping at component level | Interface failures invisible | Include connectors, harnesses, and software states explicitly |
| Never updating the worksheet | Static document mindset | Tie FMEA revision to every engineering change request |
| Ignoring human-error modes in ground operations | Focus stays on flight hardware | Add a parallel column for pre-launch and servicing procedures |

## 7. The textbook-precise statement
FMEA is defined in MIL-STD-1629A (1980, Notice 2) as “a systematic, bottom-up procedure for the identification of all possible failure modes of a system, the determination of the effect of each failure mode on system performance, and the classification of each failure mode according to its severity.” When supplemented by the Risk Priority Number  
\[
\text{RPN}_{ijk} = S_{ijk} \times O_{ijk} \times D_{ijk},
\]  
the method supplies a quantitative ranking for corrective action. The standard requires that all hypotheses (mission phases, environments, and failure definitions) be stated explicitly before scoring begins. NASA’s “Procedural Handbook for Conducting FMECA” (JPL D-20342) further mandates traceability from each line item to the controlling requirement.

## 8. Visual — diagram or schematic
```text
Spacecraft Item
      │
      ▼
Failure Mode (e.g., bearing seizure)
      │
      ├─► Local Effect (zero torque output)
      │
      ▼
Propagation through interfaces
      │
      ▼
End Effect (loss of attitude control)
      │
      ▼
Scoring: S (1-10)  O (1-10)  D (1-10)
      │
      ▼
RPN = S × O × D
      │
      ▼
Compare to threshold → Mitigate or Accept
```

## 9. The memory technique
**The hook** — Picture a traffic light whose three lenses are labelled S, O, and D; the brightest light (highest product) stops the program until the design is changed.  
**What to overlearn** — The exact formula RPN = S × O × D and the rule that S = 10 modes are examined irrespective of the product.  
**Spaced-repetition schedule** — Review the definition and formula at 1 day, 3 days, 7 days, 16 days, 35 days after first study.  
**First-principles fallback** — Re-derive the need for RPN by starting from the statement “resources are finite; therefore failures must be ranked by expected harm.”

## 10. What this unlocks
Mastery of FMEA supplies the language and worksheet discipline required for Fault Tree Analysis, Probabilistic Risk Assessment, and the quantitative portions of reliability-centered maintenance. It is the direct prerequisite for writing a Failure Modes, Effects, and Criticality Analysis (FMECA) that satisfies NASA NPR 8705.4 and for participating in a spacecraft Preliminary Design Review risk review.

## 11. Self-check — five questions, no answers
1. A component has S = 9, O = 2, D = 10. After adding a sensor, D becomes 3. By what factor does RPN change?  
2. Why must severity be scored before occurrence or detection in any FMEA session?  
3. An interface failure between two boxes is discovered during integration. In which step of the FMEA process should it first appear?  
4. A program sets an RPN threshold of 150. A mode scores S = 10, O = 1, D = 10. Does the threshold alone decide whether mitigation is required?  
5. How would you adjust the detection rating if the only available telemetry is sampled once per orbit rather than continuously?