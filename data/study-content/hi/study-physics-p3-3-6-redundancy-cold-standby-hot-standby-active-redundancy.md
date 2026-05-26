## 1. The one-sentence answer
**Redundancy** is the deliberate duplication of critical spacecraft functions so that a single failure does not end the mission; the three main flavours differ only in how quickly and how expensively the backup is brought online.

Cold standby keeps the spare unit completely powered down until needed, saving mass and power but requiring seconds to minutes of switch-over. Hot standby keeps the spare powered and thermally conditioned so that handover occurs in milliseconds, at the cost of continuous power draw. Active redundancy runs two or more identical units in parallel at all times; any one can fail without interrupting the output because the remaining units already share the load.

> [!NOTE]
> The decisive insight is that reliability is bought with resources (mass, power, complexity); the three redundancy types simply trade those resources against the time-to-recover after a fault.

## 2. Why this matters — concrete and current
NASA’s Europa Clipper carries two identical RAD750 flight computers in cold-standby configuration; only one is powered during cruise, yet either can assume control within 30 s if the primary suffers a radiation-induced upset.

SpaceX’s Starlink satellites use hot-standby reaction-wheel controllers: three wheels run at 50 % torque each; if one fails, the remaining two instantly redistribute torque without attitude loss, allowing the constellation to maintain sub-arc-second pointing for laser links.

The James Webb Space Telescope’s fine-guidance sensor electronics employ active triple modular redundancy; all three channels vote on every sample, so a single SEU is masked in real time without any reconfiguration command from the ground.

ISRO’s Chandrayaan-2 orbiter lost its lander because the primary propulsion valve stuck; post-flight analysis showed that a cold-standby parallel valve path existed on paper but was never implemented to save 1.8 kg—an explicit reminder that the decision between redundancy types is always a mass-reliability trade.

ESA’s Solar Orbiter runs its star-tracker processors in hot-standby pairs; the 0.8 W overhead is accepted because a tracker outage during a 7 km s⁻¹ perihelion pass would destroy weeks of science data.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Reliability function \(R(t)\) | Quantifies probability that a unit survives until time \(t\); the entire redundancy calculation rests on it. |
| Failure rate \(\lambda\) (constant) | Allows exponential models \(R(t)=e^{-\lambda t}\); used to derive closed-form expressions for each redundancy type. |
| Series/parallel reliability block diagrams | Visual language for combining multiple units; directly maps to cold, hot and active topologies. |
| Mean Time To Repair (MTTR) | Determines how long a standby unit stays offline; distinguishes cold from hot standby quantitatively. |

If any row is unfamiliar, pause and review basic reliability engineering before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Single-string reliability baseline
A spacecraft subsystem with one string has reliability exactly equal to the unit reliability: \(R_{\text{single}}(t)=R(t)\).  
Example: a star tracker with \(\lambda=5\times10^{-6}\) h⁻¹ after 10 000 h has \(R=0.951\).  
Formal statement:  
$$R_{\text{single}}(t)=e^{-\lambda t}.$$  
> [!WARNING] Treating the single string as “good enough” hides the mission-ending risk; one latent defect or radiation hit ends the function.

### Step 2 — Cold-standby model (perfect switch, zero dormant failure)
The spare unit accrues no failures while off. After primary failure the spare is switched on and must survive the remaining mission time.  
Example: primary fails at 6000 h; spare then runs for 4000 h.  
Formal reliability for two-unit cold standby:  
$$R_{\text{cold}}(t)=e^{-\lambda t}(1+\lambda t).$$  
> [!WARNING] The formula assumes the switch itself never fails and the dormant unit does not degrade; both assumptions are optimistic in real hardware.

### Step 3 — Hot-standby model (identical failure rate, instantaneous switch)
Both units run from t=0, but only one is in control. Failure of the primary is instantly covered by the spare.  
Formal expression becomes identical to active parallel redundancy when switch time is zero:  
$$R_{\text{hot}}(t)=1-(1-e^{-\lambda t})^2.$$  
> [!WARNING] Continuous operation of the spare doubles power and may accelerate wear-out mechanisms not captured by the constant-\(\lambda\) model.

### Step 4 — Active redundancy (load-sharing or voting)
All units operate simultaneously; output is correct as long as at least one unit functions. For two identical units:  
$$R_{\text{active}}(t)=1-(1-e^{-\lambda t})^2.$$  
When three units vote (TMR), majority logic masks single failures:  
$$R_{\text{TMR}}(t)=3e^{-2\lambda t}-2e^{-3\lambda t}.$$  
> [!WARNING] Common-cause failures (EMI, radiation burst) violate the independence assumption and can collapse all three channels at once.

### Step 5 — General k-out-of-n formulation
Any of the above topologies is a special case of the binomial reliability expression. For a system that needs at least k units out of n identical units to function:  
$$R_{k|n}(t)=\sum_{i=k}^{n}\binom{n}{i}R^i(t)[1-R(t)]^{n-i}.$$  
This single equation recovers cold, hot and active cases by appropriate choice of k and n and by adjusting the effective \(R(t)\) for each unit.

## 5. Worked examples — har step show karo

**Example 1 — Cold-standby two-unit calculation**  
*Given:* \(\lambda=2\times10^{-5}\) h⁻¹, mission time \(t=5000\) h.  
*Find:* \(R_{\text{cold}}(5000)\).  
Step 1: compute single-unit reliability \(R=e^{-0.1}=0.9048\).  
Step 2: plug into cold-standby formula \(R_{\text{cold}}=0.9048\times(1+0.1)=0.9953\).  
*Why* each step: exponential gives survival probability; the extra term \(\lambda t\) accounts for the spare’s contribution after switch.  
**Final answer**  
**0.9953**

*Reflection:* The 9 % gain over single-string shows why cold standby is attractive when mass is tight.

**Example 2 — Hot-standby versus active**  
*Given:* same \(\lambda\) and \(t\).  
*Find:* \(R_{\text{hot}}(5000)\).  
Step 1: \(R=0.9048\).  
Step 2: \(R_{\text{hot}}=1-(1-0.9048)^2=0.9909\).  
*Why:* both units age from t=0, so the expression is the complement of both failing.  
**Final answer**  
**0.9909**

*Reflection:* Slightly lower than cold standby because the spare also consumes life; power cost is the real penalty.

**Example 3 — TMR active redundancy**  
*Given:* three identical units, \(\lambda=2\times10^{-5}\) h⁻¹, \(t=5000\) h.  
*Find:* \(R_{\text{TMR}}\).  
Step 1: \(R=0.9048\).  
Step 2: \(R_{\text{TMR}}=3R^2-2R^3=0.9990\).  
*Why:* the polynomial counts the three ways exactly one fails and masks it.  
**Final answer**  
**0.9990**

*Reflection:* TMR gives the highest reliability at the price of triple power and voting circuitry.

**Example 4 — k-out-of-n generalisation**  
*Given:* need at least 2 out of 3 units, same parameters.  
*Find:* \(R_{2|3}\).  
Step 1: use binomial sum.  
Step 2: \(R_{2|3}=3R^2(1-R)+R^3=0.9953\).  
*Why:* adds the cases of exactly two and all three surviving.  
**Final answer**  
**0.9953**

*Reflection:* Matches cold-standby number coincidentally; the formula lets you compare any architecture on one page.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Assuming switch reliability = 1 | Designers forget the relay or cross-strap can fail | Include switch failure rate in the RBD or add a third “switch” block |
| Using same \(\lambda\) for cold and hot units | Dormant failure rates are lower; hot units may run hotter | Apply derating factor 0.1–0.3 to \(\lambda_{\text{cold}}\) |
| Ignoring common-cause failures in TMR | Radiation or EMI hits all channels simultaneously | Perform common-cause analysis (beta-factor model) and add diversity |
| Forgetting MTTR in availability calculations | Reliability and availability are conflated | Compute steady-state availability \(A=\text{MTBF}/(\text{MTBF}+\text{MTTR})\) separately |
| Over-specifying redundancy early | Mass budget forces later removal of spares | Run Monte-Carlo trade studies before PDR |
| Treating software as perfectly redundant | Identical code contains identical bugs | Apply N-version programming or dissimilar backups |
| Neglecting power and thermal budgets | Hot and active modes double dissipation | Close the power/thermal loop before freezing redundancy architecture |

## 7. The textbook-precise statement
A system is said to possess redundancy of type \(\mathcal{T}\) if its reliability block diagram contains at least one additional path that can deliver the required function after the failure of any single component, where \(\mathcal{T}\in\{\text{cold standby, hot standby, active}\}\).  

Let each component have constant failure rate \(\lambda\) and reliability \(R(t)=e^{-\lambda t}\). Then:  
- Cold standby (perfect switch, zero dormant failures): \(R_{\text{cold}}(t)=e^{-\lambda t}(1+\lambda t)\).  
- Hot standby or 1-out-of-2 active: \(R_{\text{hot}}(t)=1-(1-e^{-\lambda t})^2\).  
- Active 2-out-of-3 (majority vote): \(R_{2|3}(t)=3e^{-2\lambda t}-2e^{-3\lambda t}\).  

All expressions assume statistical independence of failures and perfect fault detection and isolation unless otherwise stated. (Wertz & Larson, *Space Mission Analysis and Design*, 3rd ed., §11.4, 1999.)

## 8. Visual — diagram or schematic
```text
          Primary          Switch          Output
            [U1]  ───────► [SW]  ───────► [F]
               │               ▲
               │ cold/hot      │
               ▼               │
            [U2]  (standby)    │
Active: both U1 & U2 powered, SW replaced by voter
```
Labelled axes: horizontal time line, vertical reliability 0–1; U1 and U2 curves shown for each mode.

## 9. The memory technique
1. **The hook** — Picture three rooms: “Cold” room is dark and frozen (unit sleeps), “Hot” room has a pilot light on (unit idles), “Active” room has three people talking at once (all working).
2. **What to overlearn** — The three closed-form equations above and the inequality \(R_{\text{cold}} > R_{\text{hot}} > R_{\text{single}}\) at any finite \(t\).
3. **Spaced-repetition schedule** — Review equations after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from the binomial probability that at least one unit survives; adjust the effective mission time each unit experiences according to its standby mode.

## 10. What this unlocks
Mastery of these three redundancy classes lets you evaluate any spacecraft subsystem trade study, size solar arrays and batteries correctly, and write fault-management requirements that survive FMECA reviews.

- Next topics: Fault Detection, Isolation and Recovery (FDIR) state machines; reliability block diagram software (e.g., ReliaSoft, Isograph); radiation-hardened parts selection; probabilistic risk assessment (PRA) for human-rated vehicles.
- Techniques unlocked: Monte-Carlo simulation of redundancy architectures, k-out-of-n optimisation under mass constraints, common-cause failure modelling with beta factors.

## 11. Self-check — five questions, no answers
1. A two-unit cold-standby system has \(\lambda=10^{-4}\) h⁻¹. At what mission time does its reliability first drop below 0.99?  
2. Why does hot-standby reliability equal active parallel reliability when switch time approaches zero?  
3. Draw the reliability block diagram for a 2-out-of-3 TMR system that also includes a single-point-failure voter.  
4. A satellite designer claims “our cold-spare computer adds zero power”. Identify the hidden assumption and the risk it creates.  
5. Using the general k-out-of-n formula, compute the reliability of a 3-out-of-4 active architecture at \(t=10^4\) h when each unit has \(R=0.95\).