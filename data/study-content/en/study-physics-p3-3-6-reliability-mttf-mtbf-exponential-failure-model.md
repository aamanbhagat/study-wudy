## 1. The one-sentence answer
**The exponential failure model states that a system’s reliability decays as \(R(t)=e^{-\lambda t}\) when the instantaneous failure rate \(\lambda\) remains constant, so that MTTF (or MTBF for repairable units) equals exactly \(1/\lambda\).**

A component either fails or survives at any instant. When engineers observe that the chance of failure per hour stays the same no matter how long the part has already run, the mathematics forces the survival probability to shrink exponentially. This single assumption converts a constant hazard rate into a clean, memoryless lifetime distribution whose mean is simply the reciprocal of that rate.

The model therefore supplies two numbers that dominate spacecraft reliability budgets: MTTF for non-repairable items such as a solid rocket motor, and MTBF for repairable subsystems such as an attitude-control reaction wheel that can be swapped or reset. Because the exponential form is analytically tractable, it also yields the probability that an entire spacecraft will still be operating after a five-year mission without any integration of complicated integrals.

> [!NOTE]
> The memoryless property is the deepest feature: knowing a component has already survived 10 000 hours tells you nothing about its future; its remaining life is still drawn from the identical exponential distribution.

## 2. Why this matters — concrete and current
SpaceX publishes fleet-wide MTBF figures for Merlin engines exceeding 10 000 s of cumulative hot-fire time; these numbers are derived directly from the exponential model to set the probability of loss-of-mission below 1 % for each Falcon 9 flight.

NASA’s Jet Propulsion Laboratory used the same model to size the two-year primary mission of the Perseverance rover; the calculated MTTF of the MMRTG power source determined the allowable depth-of-discharge strategy for the rover’s batteries.

In the Starlink constellation, each satellite’s reaction-wheel MTBF of roughly 50 000 h governs the required on-orbit spare density; OneWeb and Amazon Kuiper employ identical calculations to size their replenishment manifests.

Semiconductor suppliers such as Texas Instruments quote FIT rates (failures in 10⁹ h) for rad-hard FPGAs; these FIT values are converted to \(\lambda\) and then to MTTF so that constellation operators can decide whether triple modular redundancy is required inside each satellite’s flight computer.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Probability density function | MTTF is the expectation of the lifetime random variable   |
| Survival function \(R(t)\)   | Reliability is defined as the complement of the CDF       |
| Constant hazard rate         | The sole assumption that produces the exponential form    |
| Definite integral from 0 to ∞ | Required to evaluate the mean lifetime                    |

## 4. Building the idea — from intuition to formalism

### Step 1 — Constant failure rate
Engineers measure that a part fails at the same average rate whether it is brand-new or already aged.  
Example: a gyroscope shows one failure per 50 000 h both in the first month and after three years on orbit.  
Formally, the hazard function is defined as  
\[
\lambda(t)=\frac{f(t)}{R(t)}=\text{constant}=\lambda.
\]
> [!WARNING]
> If \(\lambda\) actually increases with time (wear-out), using a constant \(\lambda\) underestimates late-life failures.

### Step 2 — Differential equation for survival
Because \(\lambda=-R'(t)/R(t)\), the constant-rate assumption yields the ODE  
\[
\frac{dR}{dt}=-\lambda R.
\]
Solving with \(R(0)=1\) produces  
\[
R(t)=e^{-\lambda t}.
\]

### Step 3 — Probability density
The failure density is the negative derivative of reliability:  
\[
f(t)=\lambda e^{-\lambda t},\qquad t\geq0.
\]

### Step 4 — Mean lifetime for non-repairable items
MTTF is the expected value  
\[
\text{MTTF}=\int_0^\infty t\lambda e^{-\lambda t}\,dt= \frac{1}{\lambda}.
\]

### Step 5 — Distinction for repairable items
When a failed unit is restored to “as-good-as-new” condition, the same mathematics governs the mean time between successive failures, now called MTBF; the numerical value remains \(1/\lambda\).

### Step 6 — Memoryless property
\[
P(T>t+s\mid T>s)=P(T>t)=e^{-\lambda t}.
\]
No other continuous distribution possesses this property.

### Step 7 — Textbook arrival
The exponential failure model is completely specified by the single parameter \(\lambda>0\), with reliability, density, MTTF/MTBF, and memoryless property all following directly from the constant-hazard assumption.

## 5. Worked examples — every step shown

**Example 1 — Gyroscope MTTF**  
*Given:* A star-tracker gyro exhibits \(\lambda=2\times10^{-5}\) h\(^{-1}\).  
*Find:* MTTF and the probability it survives 50 000 h.  
Step 1: MTTF \(=1/\lambda=50\,000\) h.  
*Why:* Direct reciprocal definition.  
Step 2: \(R(50\,000)=e^{-2\times10^{-5}\times50\,000}=e^{-1}\approx0.3679\).  
*Why:* Exponential survival function.  
**\(50\,000\) h, \(0.3679\)**

*Reflection:* The arithmetic is trivial once \(\lambda\) is known; the modelling decision to treat \(\lambda\) as constant is what requires engineering judgment.

**Example 2 — Redundant pair**  
*Given:* Two identical units, each with \(\lambda=10^{-4}\) h\(^{-1}\), arranged so the system fails only when both fail.  
*Find:* System MTTF.  
Step 1: System reliability \(R_s(t)=(1-e^{-\lambda t})^2+2e^{-\lambda t}(1-e^{-\lambda t})=2e^{-\lambda t}-e^{-2\lambda t}\).  
*Why:* Complement of both failed.  
Step 2: MTTF \(=\int_0^\infty R_s(t)\,dt=1.5/\lambda=15\,000\) h.  
*Why:* Integral of survival equals expectation.  
**\(15\,000\) h**

*Reflection:* Redundancy stretches the mean by the factor 1.5, not by 2, because the second unit still ages while the first is operating.

**Example 3 — Mission success probability**  
*Given:* A 10-year mission and component MTBF = 30 years.  
*Find:* Probability of no failure.  
Step 1: \(\lambda=1/30\) yr\(^{-1}\).  
*Why:* Reciprocal converts MTBF to rate.  
Step 2: \(R(10)=e^{-10/30}=e^{-1/3}\approx0.7165\).  
**\(0.7165\)**

*Reflection:* The calculation assumes the unit is non-repairable; any maintenance would change the model.

**Example 4 — Mixed repairable and non-repairable**  
*Given:* A spacecraft bus with MTBF = 15 yr (repairable via software reset) and a battery with MTTF = 8 yr.  
*Find:* Probability the combined system survives 5 yr without bus reset or battery failure.  
Step 1: Bus success \(e^{-5/15}\), battery success \(e^{-5/8}\).  
*Why:* Independent exponential events multiply.  
Step 2: Product \(\approx0.7165\times0.5353\approx0.383\).  
**\(0.383\)**

*Reflection:* The product rule holds only under statistical independence, a common but non-trivial assumption.

## 6. Common traps and how to avoid them

| Trap                                | Why it happens                              | How to avoid it                                      |
|-------------------------------------|---------------------------------------------|------------------------------------------------------|
| Using MTBF for non-repairable parts | Confusion between repair cycles and one-shot lifetime | Check whether restoration to as-new condition is possible |
| Treating \(\lambda\) as constant when wear-out dominates | Data collected only in early life           | Plot cumulative failures versus time; test for increasing hazard |
| Adding failure rates of series elements without checking independence | Implicit assumption that failures are disjoint | Verify physical coupling (thermal, vibration)        |
| Quoting MTTF in hours when mission is in years | Unit mismatch hides three-order-of-magnitude errors | Always convert units before numerical comparison     |
| Ignoring that exponential predicts zero wear-out | Mathematical memorylessness contradicts real fatigue | Use Weibull or other distributions when physics indicates aging |
| Confusing MTBF with “guaranteed life” | MTBF is an average, not a minimum           | Report both median life and MTTF                     |
| Applying the model to software without restarts | Software failures are rarely constant-rate  | Model software reliability with separate non-homogeneous Poisson processes |

## 7. The textbook-precise statement
Let \(T\) be a continuous non-negative random variable. If the hazard rate \(\lambda(t)=\lambda\) (constant), then  
\[
R(t)=P(T>t)=e^{-\lambda t},\qquad f(t)=\lambda e^{-\lambda t},\qquad t\geq0,
\]  
and  
\[
E[T]=\int_0^\infty R(t)\,dt=\frac1\lambda.
\]  
When the item is restored to as-new condition after each failure, the same quantity is called MTBF. (See Elsayed, *Reliability Engineering*, 2e, §3.2.)

## 8. Visual — diagram or schematic

```text
R(t)
1.0 |*
    |  \
    |   \   R(t)=e^{-\lambda t}
    |    \_______________
    |                    \
0   -----------------------> t
    0      1/λ      2/λ
```
The curve starts at 1, decays with constant negative slope at t=0 equal to \(-\lambda\), and asymptotically approaches zero. The area under the entire curve equals MTTF = \(1/\lambda\).

## 9. The memory technique

1. **The hook** — Picture a radioactive atom: it has no memory of how long it has already existed; its probability of decaying in the next second is fixed. The exponential part is identical.
2. **What to overlearn** — \(R(t)=e^{-\lambda t}\), MTTF = \(1/\lambda\), memoryless property.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from the definition of constant hazard, solve the resulting ODE for \(R(t)\), integrate to obtain the mean.

## 10. What this unlocks
Mastery of the exponential model supplies the quantitative foundation for redundancy allocation, spare-parts provisioning, and probabilistic risk assessment. It directly precedes study of the Weibull distribution for wear-out, Markov reliability block diagrams, and Bayesian updating of failure rates from flight telemetry.

- Weibull and other lifetime distributions  
- Reliability block diagrams and fault trees  
- Accelerated life testing and Arrhenius acceleration factors  
- Monte-Carlo mission success simulation  

## 11. Self-check — five questions, no answers
1. A component has \(\lambda=5\times10^{-6}\) h\(^{-1}\). Compute both MTTF in years and the probability it survives exactly one year.  
2. Two independent exponential units have rates \(\lambda_1\) and \(\lambda_2\). Derive the MTTF of a series configuration and of a parallel configuration.  
3. Explain why adding the MTBFs of two repairable units in series is incorrect.  
4. A data set of failure times shows a clear increasing hazard after 20 000 h. Which modelling assumption is violated and what distribution should replace the exponential?  
5. Given only the statement “MTBF = 10 000 h,” list three distinct pieces of information still missing before the number can be used for a five-year deep-space mission.