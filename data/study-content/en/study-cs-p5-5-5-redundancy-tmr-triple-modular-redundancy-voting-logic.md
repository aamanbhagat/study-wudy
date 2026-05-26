## 1. The one-sentence answer
**Triple modular redundancy (TMR) is a fault-tolerance technique that runs three identical modules in parallel and uses majority voting to mask the failure of any single module.**

A single hardware or software module can produce an incorrect output because of a transient bit flip, permanent defect, or design error. Running three copies simultaneously creates three independent results. A voter circuit or routine then selects the value that appears at least twice; that value becomes the system output. The scheme therefore converts the failure of one module into a correct system-level result without requiring immediate repair or restart.

The approach works only when faults remain independent and the voter itself is reliable. When two modules fail in the same way, the voter propagates the error. TMR therefore improves reliability only inside a specific fault model and only when the voter is simpler or more robust than the modules it protects.

> [!NOTE]
> The decisive insight is that TMR does not detect or correct every fault; it merely masks the first fault by outvoting it, buying time for later recovery mechanisms.

## 2. Why this matters — concrete and current
NASA’s Space Shuttle flight computers used TMR on the primary avionics processors; any single processor failure was masked by the two remaining units until the next maintenance window. Modern Airbus A380 and A350 flight-control computers employ TMR variants on the command and monitor lanes to satisfy DAL-A certification requirements. Google’s TPU v2 and v3 chips incorporate TMR on the scalar core and systolic-array control logic to tolerate soft errors in large-scale machine-learning training runs. Automotive ISO 26262 ASIL-D controllers in Tesla’s Autopilot hardware version 3 run triple-redundant perception pipelines whose outputs are voted before actuation commands are issued. Radiation-hardened FPGA vendors such as Xilinx and Microchip ship TMR tool flows that automatically triplicate user logic and insert majority voters for satellite and particle-physics detector electronics.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Independent fault model  | TMR reliability equations assume failures in separate modules are uncorrelated. |
| Binary majority function | The voter must return the bit or value that appears at least twice. |
| Module reliability R(t)  | The probability that a single module produces a correct output at time t is the basic building block of TMR analysis. |

## 4. Building the idea — from intuition to formalism

### Step 1 — A single module is a single point of failure
Any physical device can produce an erroneous output.  
Example: a 32-bit adder with a stuck-at-1 fault on bit 17 yields a wrong sum on certain inputs.  
Formally, let module output \(M\) equal the correct result \(C\) with probability \(R\) and an incorrect result with probability \(1-R\).

> [!WARNING]
> Treating \(R\) as constant ignores wear-out and cosmic-ray effects that make \(R\) time-dependent.

### Step 2 — Two identical modules still leave ambiguity
With two modules the system sees either matching or conflicting outputs. A mismatch signals an error but supplies no correct value. TMR therefore adds a third copy.

### Step 3 — Three modules enable majority selection
Three independent results \(M_1, M_2, M_3\) are produced. The voter returns the value shared by at least two modules.  
The system output \(V\) satisfies
\[
V = \text{majority}(M_1,M_2,M_3).
\]

### Step 4 — Fault masking occurs when exactly one module errs
If only one module produces an incorrect value, the other two still agree on the correct result; the voter therefore emits the correct value. This is the core masking action of TMR.

### Step 5 — Reliability formula under perfect voter
Assume each module has reliability \(R\) and failures are statistically independent. The TMR system fails only when two or three modules fail. The complementary probability yields the classic expression
\[
R_{\text{TMR}} = 3R^2(1-R) + R^3 = 3R^2 - 2R^3.
\]

### Step 6 — Voter imperfection and coverage factor
Real voters can themselves fail. Let \(R_v\) be voter reliability and let \(C\) be the probability that a single fault is masked. The refined model becomes
\[
R_{\text{TMR}} = R_v \bigl(3R^2(1-R)C + R^3\bigr).
\]

### Step 7 — Textbook statement of TMR
A TMR system consists of three identical modules whose outputs feed a majority voter; under the single-fault assumption and perfect voter the system reliability is \(3R^2-2R^3\).

## 5. Worked examples — every step shown

**Example 1 — Simple bit vote**  
*Given:* Three modules output bits 1, 0, 1.  
*Find:* Voter result.  
The three values are examined pairwise. Modules 1 and 3 agree on 1; modules 1 and 2 differ; modules 2 and 3 differ. The value appearing twice is 1.  
**1**  
*Reflection:* The example isolates the combinatorial definition of majority; any implementation must count occurrences rather than compare pairs sequentially.

**Example 2 — One module faulty**  
*Given:* Correct result = 0xA5, modules produce 0xA5, 0xA5, 0x3C.  
*Find:* Voter output.  
Count frequency of each distinct word: 0xA5 appears twice, 0x3C appears once. The majority value 0xA5 is selected.  
**0xA5**  
*Reflection:* The voter never inspects internal state; it only compares final outputs.

**Example 3 — Reliability calculation**  
*Given:* Module reliability \(R=0.9\) at mission time \(t\).  
*Find:* \(R_{\text{TMR}}\).  
Substitute into the formula:
\[
R_{\text{TMR}} = 3(0.9)^2(0.1) + (0.9)^3 = 0.243 + 0.729 = 0.972.
\]
**0.972**  
*Reflection:* TMR raises reliability from 0.9 to 0.972, yet the gain shrinks rapidly once \(R\) falls below ~0.8.

**Example 4 — Two modules fail identically**  
*Given:* Two modules suffer the same design bug and output 0xFF while the third outputs the correct 0x00.  
*Find:* Voter result.  
All three outputs are examined; 0xFF appears twice. The voter therefore emits 0xFF.  
**0xFF**  
*Reflection:* TMR masks only independent faults; common-mode failures defeat the scheme.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Assuming voter is perfect         | Designer focuses only on the triplicate modules     | Model voter reliability separately and protect it with smaller TMR or hardened cells |
| Ignoring common-mode failures     | Identical software or clock distribution            | Apply design diversity or watchdogs across modules   |
| Using TMR on asynchronous outputs | Metastability or timing skew produces inconsistent samples | Synchronize outputs with a common clock before voting |
| Treating TMR as error correction  | TMR only masks; it does not locate or log the fault | Add separate error-reporting registers after the voter |
| Over-triplicating the voter       | Recursive application inflates area without gain    | Keep voter logic minimal and verify it by formal proof |
| Neglecting latency                | Voter adds combinational delay on critical path     | Pipeline the voter or accept one-cycle latency in timing analysis |
| Forgetting coverage factor \(C\)  | Transient faults may be overwritten before voting   | Measure \(C\) via fault-injection campaigns          |

## 7. The textbook-precise statement
A triple modular redundant system comprises three identical, statistically independent functional modules whose outputs are combined by a majority voter. Under the assumptions that (i) at most one module fails during the mission interval, (ii) module failures are independent, and (iii) the voter is perfect, the system reliability is given by
\[
R_{\text{TMR}}(t) = 3R(t)^2 - 2R(t)^3,
\]
where \(R(t)\) is the reliability of a single module. (Johnson, *Design and Analysis of Fault-Tolerant Digital Systems*, 1989, §4.2.)

## 8. Visual — diagram or schematic
```text
Module 1 ───┐
            │
Module 2 ───┼──► [ Majority Voter ] ──► System Output
            │
Module 3 ───┘
```
Each module receives identical inputs. The voter is a combinational block that implements the Boolean majority function on each output bit independently. All lines after the modules are assumed to be synchronized to the same clock edge.

## 9. The memory technique

1. **The hook** — Picture three identical soldiers walking in a line; when one is wounded the other two still carry the flag forward. The middle soldier is the voter who decides which direction the flag points.
2. **What to overlearn** — The reliability expression \(3R^2-2R^3\) and the fact that TMR masks only the first independent fault.
3. **Spaced-repetition schedule** — Review the formula and the soldier image after 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First-principles fallback** — Re-derive the reliability expression by enumerating the three mutually exclusive success cases (exactly two good modules or all three good) and adding their probabilities.

## 10. What this unlocks
TMR is the foundation for higher-order redundancy schemes and for hybrid fault-tolerant architectures used in safety-critical real-time systems.  
- N-modular redundancy (NMR) and dynamic reconfiguration  
- Byzantine fault tolerance in distributed embedded networks  
- Fault-injection testing methodologies and coverage metrics  
- Radiation-hardened synthesis flows in FPGA and ASIC design

## 11. Self-check — five questions, no answers
1. A TMR system has module reliability 0.95. Compute the TMR reliability assuming a perfect voter.  
2. Name one concrete mechanism that can produce a common-mode failure across all three TMR modules.  
3. Why does increasing the number of modules from three to five yield diminishing reliability returns once \(R>0.9\)?  
4. A designer replaces the majority voter with a bitwise XOR of all three outputs. What single-fault behaviour results?  
5. In a real-time control loop the TMR voter adds one clock cycle of latency. Under what scheduling condition does this latency violate a hard deadline?