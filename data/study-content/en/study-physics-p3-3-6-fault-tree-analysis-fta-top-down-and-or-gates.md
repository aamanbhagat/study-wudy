## 1. The one-sentence answer
**Fault tree analysis is a deductive, top-down Boolean model that expresses the conditions under which a single undesired top event occurs as a logical combination of lower-level failures connected exclusively by AND and OR gates.**

A fault tree begins with one clearly defined failure of interest—the top event—and works backward through successively more detailed causes. Each gate encodes an exact logical relationship: an OR gate fires if any input occurs, while an AND gate fires only when every input occurs simultaneously. The leaves of the tree are basic events whose probabilities or failure rates are either known from test data or treated as primitives.

Because the structure is strictly Boolean, any path from basic events to the top event can be reduced to a minimal set of combinations that are both necessary and sufficient to produce the failure. This reduction supplies both qualitative insight into critical failure modes and a quantitative expression for the top-event probability once numerical values are assigned to the leaves.

> [!NOTE]
> The decisive insight is that the tree never predicts when a failure will happen; it only enumerates the exact logical prerequisites that must be satisfied for the failure to be possible.

## 2. Why this matters — concrete and current
NASA’s Constellation program and the subsequent Artemis architecture used fault trees to certify the Orion spacecraft’s launch-abort system; every credible abort trigger was decomposed until the probability of an uncommanded abort fell below the allocated risk budget of 1 in 10 000.

SpaceX publicly released a simplified fault tree for the Falcon 9 first-stage grid-fin hydraulic system after the 2016 AMOS-6 anomaly; the tree revealed that a single helium check-valve failure, combined with an AND condition on propellant loading pressure, was sufficient to initiate the explosion.

The European Space Agency’s 2023 JUICE mission reliability report employed a 14-level fault tree for the spacecraft’s power-distribution unit; the top-event probability was shown to be dominated by a cut set containing three independent solar-array drive electronics failures joined by an AND gate.

In the James Webb Space Telescope post-launch anomaly review, the project reconstructed a fault tree for the sunshield deployment sequence; the analysis isolated an OR gate whose single input was a micro-switch contact resistance increase, allowing the team to close the investigation with a targeted hardware inspection rather than a full redesign.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Boolean algebra      | Every gate is a Boolean operator; reduction to minimal cut sets is algebraic simplification. |
| Elementary probability | Quantitative FTA replaces each gate with an algebraic expression in the probabilities of its inputs. |
| Set notation         | Minimal cut sets are minimal hitting sets; union and intersection symbols map directly onto OR and AND. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Choose the single undesired top event
State the system-level failure you wish to avoid in one unambiguous sentence.  
Example: “Spacecraft loses all electrical power during launch countdown.”  
No mathematics yet; the sentence merely fixes the boundary of the analysis.

> [!WARNING]
> If the top event is stated too broadly (“spacecraft fails”), the tree becomes unmanageably large and loses diagnostic value.

### Step 2 — Decompose immediately below the top event with one gate
Ask whether the top event occurs if *any* of several causes happen (OR) or only if *all* of several causes happen (AND).  
For the power-loss example the first gate is usually OR: loss occurs if battery bus shorts OR solar-array fails to deploy OR power-distribution unit faults.

### Step 3 — Continue the decomposition recursively
Replace each intermediate event with its own gate and inputs until every branch ends at a basic event whose failure mechanism is observable and whose probability can be estimated.

### Step 4 — Formalize the OR gate
An OR gate with inputs \(A_1, A_2, \dots, A_n\) is true exactly when at least one input is true. Its probability, assuming mutual exclusivity for the first approximation, is
\[
P(\text{OR}) = 1 - \prod_{i=1}^n (1 - P(A_i)).
\]

### Step 5 — Formalize the AND gate
An AND gate is true only when every input is true. Its probability is the product
\[
P(\text{AND}) = \prod_{i=1}^n P(A_i)
\]
when the inputs are independent.

### Step 6 — Reduce the tree to minimal cut sets
A cut set is any collection of basic events whose simultaneous occurrence guarantees the top event. A cut set is minimal when no proper subset still guarantees the top event. The collection of all minimal cut sets is the canonical Boolean representation of the fault tree.

### Step 7 — Write the top-event probability from the minimal cut sets
If the minimal cut sets are \(C_1, C_2, \dots, C_m\) and are treated as mutually exclusive,
\[
P(\text{Top}) = \sum_{j=1}^m P(C_j).
\]

## 5. Worked examples — every step shown

**Example 1 — Single OR gate**  
*Given:* Top event “loss of thrust vector control” occurs if either the gimbal actuator fails or the flight-computer command is lost.  
*Find:* Boolean expression and approximate probability.  

- Top = Actuator ∨ Computer  
  *Why:* The first decomposition uses an OR gate because either failure alone produces the top event.  
- \(P(\text{Top}) = 1 - (1 - P_A)(1 - P_C)\)  
  *Why:* Complement rule converts OR into product of complements.  

**\(1 - (1 - 0.001)(1 - 0.0005) = 0.0014995\)**

*Reflection:* The numerical result is only 0.05 % higher than simple addition, showing why engineers often approximate rare OR events by summing probabilities.

**Example 2 — Single AND gate**  
*Given:* Top event “tank rupture” requires both over-pressure *and* relief-valve stuck closed.  
*Find:* Expression.  

- Top = OverP ∧ Valve  
  *Why:* Both conditions must coexist.  
- \(P(\text{Top}) = P(\text{OverP}) \times P(\text{Valve})\)  
  *Why:* Independence assumption converts AND directly to multiplication.  

**\(0.002 \times 0.0001 = 2 \times 10^{-7}\)**

*Reflection:* The product is four orders of magnitude smaller than either input, illustrating why redundancy is powerful only when the AND condition is enforced.

**Example 3 — Mixed gates**  
*Given:* A simplified spacecraft power tree: Top = (Battery ∨ Solar) ∧ PDU, where PDU itself is an OR of two internal faults.  
*Find:* Minimal cut sets.  

- Expand: Top = (Battery ∨ Solar) ∧ (PDU1 ∨ PDU2)  
  *Why:* Distribute AND over OR.  
- Minimal cut sets: {Battery, PDU1}, {Battery, PDU2}, {Solar, PDU1}, {Solar, PDU2}  
  *Why:* Each pair is the smallest set that forces Top true.  

**Four minimal cut sets listed above.**

*Reflection:* The tree yields four distinct two-event cut sets; no single-event cut set exists, confirming the design is single-fault tolerant.

**Example 4 — Quantitative evaluation with three minimal cut sets**  
*Given:* Minimal cut sets \(C_1 = \{A,B\}\), \(C_2 = \{C\}\), \(C_3 = \{D,E,F\}\) with probabilities \(P_A=10^{-3}\), \(P_B=2\times10^{-3}\), \(P_C=5\times10^{-5}\), \(P_D=P_E=P_F=10^{-4}\).  
*Find:* Top-event probability, assuming rare-event approximation.  

- \(P(C_1) = 2\times10^{-6}\)  
  *Why:* Product under AND.  
- \(P(C_2) = 5\times10^{-5}\)  
  *Why:* Single event is already a cut set.  
- \(P(C_3) = 10^{-12}\)  
  *Why:* Three-event product.  
- \(P(\text{Top}) \approx 5.2\times10^{-5}\)  
  *Why:* Sum of cut-set probabilities under rare-event assumption.  

**\(5.2 \times 10^{-5}\)**

*Reflection:* The single-event cut set \(C_2\) dominates; design effort should first eliminate that singleton.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                                      |
|-----------------------------|---------------------------------------------|------------------------------------------------------|
| Treating dependent events as independent | Engineers copy textbook formulas without checking physical coupling | Perform a dependence audit before multiplying probabilities |
| Using OR for “both must occur” | Linguistic confusion between “or” in English and Boolean OR | Force the question: “Does the top event happen if only one input occurs?” |
| Stopping decomposition too early | Desire to keep the tree small               | Require every basic event to be measurable in test or inspection |
| Double-counting shared events | Same component appears under multiple branches | Use unique identifiers and gate the shared event once, then reference it |
| Ignoring common-cause failures | Tree structure hides simultaneous triggers | Add explicit common-cause gates or use beta-factor models |
| Reporting only the top probability | Management wants a single number            | Always publish the ranked list of minimal cut sets |
| Forgetting to update with new data | Tree frozen after preliminary design review | Schedule formal FTA revisions at each design milestone |

## 7. The textbook-precise statement
Fault tree analysis constructs a finite acyclic directed graph whose root is the top event \(T\) and whose internal nodes are Boolean gates \(\{\land, \lor\}\). The leaves are basic events \(B_i\) drawn from a set whose probabilities \(p_i\) are defined on a common probability space. The structure function \(\phi(\mathbf{x})\) maps each binary state vector \(\mathbf{x}\) of the basic events to the binary state of \(T\). The probability of the top event is
\[
P(T) = P(\phi(\mathbf{x})=1).
\]
When minimal cut sets \(C_j\) are obtained, the exact expression is the inclusion-exclusion expansion of the union of the cut-set events (NASA Fault Tree Handbook, NASA/SP-2009-569, §4.4).

## 8. Visual — diagram or schematic
```text
                 T (Loss of Spacecraft Power)
                           |
                         AND
                       /       \
                  Solar Bus     PDU
                     |           |
                    OR          OR
                 /     \      /     \
             Array   Battery  PDU1   PDU2
```
Label key: rectangles = basic events, circles with “&” = AND gate, circles with “≥1” = OR gate. The tree is read top-down; every path from a leaf to T must pass through the gates shown.

## 9. The memory technique
1. **The hook** — Picture a rocket on the pad; the only way it explodes is if *both* fuel and oxidizer valves open together (AND) *or* if the guidance computer issues a single wrong command (OR). Visualize the explosion as the single light bulb that lights only when the correct gate combination is satisfied.
2. **What to overlearn** — (a) OR probability complement formula, (b) AND probability product formula, (c) definition of a minimal cut set.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days after first study.
4. **First-principles fallback** — Re-derive the gate equations from the axioms \(P(A\lor B)=P(A)+P(B)-P(A\land B)\) and \(P(A\land B)=P(A)P(B)\) under independence.

## 10. What this unlocks
Mastery of AND/OR fault trees is the prerequisite for every subsequent technique in spacecraft risk assessment.  

- Minimal cut-set ranking feeds directly into Failure Modes, Effects, and Criticality Analysis (FMECA).  
- Quantitative FTA supplies the numerical inputs required by Probabilistic Risk Assessment (PRA) used in NASA NPR 8705.4.  
- The same Boolean structure reappears in model-based systems engineering tools (e.g., SysML fault propagations) and in machine-learning approaches that learn gate structures from telemetry.

## 11. Self-check — five questions, no answers
1. A top event is connected to two basic events through an OR gate; each basic event has probability 0.01. What is the exact top-event probability?  
2. Convert the following sentence into a fault-tree fragment: “The stage separates only if both pyro charges fire and the separation connector releases.”  
3. Identify the minimal cut sets of a tree whose top event is an AND of two OR gates, each OR having two inputs.  
4. A cut set contains three events whose probabilities are \(10^{-4}\), \(10^{-4}\), and \(10^{-5}\). Another cut set is a single event of probability \(10^{-6}\). Which cut set contributes more to top-event probability under the rare-event approximation?  
5. Explain why replacing an AND gate with an OR gate in a human-rated system almost always increases the calculated probability of loss of crew.