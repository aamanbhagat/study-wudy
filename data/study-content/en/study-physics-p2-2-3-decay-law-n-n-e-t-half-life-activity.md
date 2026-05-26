## 1. The one-sentence answer
**Radioactive decay follows the statistical law that the number of undecayed nuclei decreases exponentially as \(N = N_0 e^{-\lambda t}\), where \(\lambda\) is the decay constant, because each nucleus decays independently with constant probability per unit time.**

This relation arises from the fact that the probability a given nucleus decays in a short interval is fixed and independent of its age or of how many other nuclei remain. Consequently the instantaneous rate of change is proportional to the number present, producing an exponential solution rather than a linear or polynomial one. Half-life and activity are direct, measurable consequences of the same exponential: half-life is the fixed interval in which \(N\) halves, and activity is simply \(\lambda N\).

The same mathematics governs any process in which the survival probability per unit time is constant, whether the entities are atomic nuclei, excited atoms, or even certain financial or biological populations.

> [!NOTE]
> The exponential form is not an approximation; it is exact for a large ensemble of identical, independent, memoryless decay events.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover and the upcoming Dragonfly mission to Titan both carry Multi-Mission Radioisotope Thermoelectric Generators whose plutonium-238 fuel decays with a precisely known 87.7-year half-life; mission planners use the decay law to predict power output years after launch.

In clinical nuclear medicine, fluorine-18 FDG for PET scans has a 109.8-minute half-life; hospitals must solve the decay equation in real time to calculate the activity remaining between cyclotron production and patient injection, directly affecting dose calibration and scheduling.

Carbon-14 dating laboratories determine the age of archaeological samples by measuring residual activity and inverting \(N = N_0 e^{-\lambda t}\) with \(\lambda = \ln 2 / 5730\) yr, a technique now cross-validated against tree-ring and ice-core chronologies.

Particle-physics experiments at the LHC measure lifetimes of B mesons (order 10^{-12} s) by fitting exponential decay curves to vertex-displaced tracks; any deviation from pure exponential would signal new physics beyond the Standard Model.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Exponential function     | The solution of the governing differential equation is exactly \(e^{-\lambda t}\). |
| Derivative of \(e^{kt}\) | Required to convert the rate equation into a differential equation. |
| Probability per unit time| The constant \(\lambda\) is defined as the decay probability per nucleus per unit time. |
| Logarithms               | Needed to solve for time when \(N\) or activity is given. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Constant probability per nucleus
Each radioactive nucleus has a fixed, small probability \(\lambda \Delta t\) of decaying in any short interval \(\Delta t\), regardless of how long it has already existed.  
Example: if \(\lambda = 0.01\) s^{-1}, then in 0.1 s a given nucleus has probability 0.001 of decaying.  
Formally, the survival probability in \(\Delta t\) is \(1 - \lambda \Delta t\).  
> [!WARNING]
> Treating \(\lambda\) as depending on the number of nuclei or on time violates the memoryless premise and yields a wrong differential equation.

### Step 2 — Rate proportional to number present
Because decays are independent, the expected number decaying in \(\Delta t\) is \(\lambda N \Delta t\).  
Thus \(\Delta N = -\lambda N \Delta t\).  
Dividing by \(\Delta t\) and taking the limit produces the differential equation \(\frac{dN}{dt} = -\lambda N\).

### Step 3 — Solving the differential equation
Separate variables: \(\frac{dN}{N} = -\lambda dt\).  
Integrate both sides from \(t=0\) (\(N=N_0\)) to arbitrary \(t\): \(\int_{N_0}^{N} \frac{dN'}{N'} = -\lambda \int_0^t dt'\).  
This yields \(\ln(N/N_0) = -\lambda t\), hence \(N = N_0 e^{-\lambda t}\).

### Step 4 — Half-life definition
Set \(N = N_0/2\): \(1/2 = e^{-\lambda T_{1/2}}\).  
Take natural log: \(\ln 2 = \lambda T_{1/2}\), so \(T_{1/2} = \ln 2 / \lambda\).

### Step 5 — Activity
Activity \(A\) is defined as the decay rate \(|dN/dt|\).  
From the differential equation, \(A = \lambda N = \lambda N_0 e^{-\lambda t}\).  
Activity therefore follows the identical exponential law.

## 5. Worked examples — every step shown

**Example 1 — Simple remaining nuclei**  
*Given:* \(N_0 = 10^{12}\) nuclei of a nuclide with \(\lambda = 0.693\) day^{-1}.  
*Find:* \(N\) after 2 days.  
Start with the defining equation:  
\(N = N_0 e^{-\lambda t}\).  
*Why:* Direct substitution of the integrated solution.  
Insert values: \(\lambda t = 0.693 \times 2 = 1.386\).  
\(e^{-1.386} = 1/4\) (because \(1.386 = 2\ln 2\)).  
Thus \(N = 10^{12} \times 1/4 = 2.5 \times 10^{11}\).  
**\(N = 2.5 \times 10^{11}\)**  
*Reflection:* The factor-of-four drop occurs because exactly two half-lives have elapsed.

**Example 2 — Half-life from decay constant**  
*Given:* \(\lambda = 0.025\) yr^{-1}.  
*Find:* \(T_{1/2}\).  
Use the relation derived in Step 4:  
\(T_{1/2} = \ln 2 / \lambda\).  
*Why:* Setting \(N = N_0/2\) forces the exponent to \(-\ln 2\).  
\(\ln 2 \approx 0.693147\), so \(T_{1/2} = 0.693147 / 0.025 = 27.726\) yr.  
**\(T_{1/2} = 27.73\) yr**  
*Reflection:* The numerical value of \(\ln 2\) must be kept precise when half-lives are used in dating.

**Example 3 — Activity at later time**  
*Given:* \(A_0 = 3.7 \times 10^{10}\) Bq, \(T_{1/2} = 8.02\) days.  
*Find:* Activity after 24 days.  
First convert half-life to decay constant: \(\lambda = \ln 2 / 8.02 \approx 0.0864\) day^{-1}.  
Activity obeys the same exponential: \(A = A_0 e^{-\lambda t}\).  
\(\lambda t = 0.0864 \times 24 = 2.074\).  
\(e^{-2.074} \approx 0.126\).  
\(A = 3.7 \times 10^{10} \times 0.126 = 4.66 \times 10^9\) Bq.  
**\(A = 4.66 \times 10^9\) Bq**  
*Reflection:* Activity and number of nuclei always decay together; only the proportionality constant differs.

**Example 4 — Time to reach given activity**  
*Given:* Initial activity 500 MBq, desired activity 50 MBq, \(T_{1/2} = 6.0\) h.  
*Find:* Elapsed time.  
\(\lambda = \ln 2 / 6 \approx 0.1155\) h^{-1}.  
\(50 = 500 \times e^{-\lambda t}\).  
\(0.1 = e^{-\lambda t}\).  
\(-\lambda t = \ln 0.1 = -2.3026\).  
\(t = 2.3026 / 0.1155 \approx 19.94\) h.  
**\(t \approx 19.94\) h**  
*Reflection:* Taking the natural log converts the exponential back to linear time; the ratio 10 corresponds to \(\ln 10 \approx 2.303\) half-lives scaled by \(\ln 2\).

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Using \(T_{1/2} = 1/\lambda\)     | Confusing mean life with half-life          | Always write \(T_{1/2} = \ln 2 / \lambda\)           |
| Treating activity as constant     | Forgetting activity itself decays           | Compute \(A(t)\) explicitly each time                |
| Mixing units of \(\lambda\) and \(t\) | Sloppy unit conversion                   | Convert everything to seconds or consistent base units before substituting |
| Assuming \(N\) can be fractional for small samples | Applying continuum formula to few nuclei | Use Poisson statistics when \(N \lesssim 100\)       |
| Reversing the sign of the exponent| Intuitive “growth” reflex                   | Remember the minus sign encodes loss                  |
| Using base-10 logs without conversion | Calculator habit                           | Convert via \(\ln x = 2.302585 \log_{10} x\)         |
| Ignoring that \(\lambda\) is constant only for a given nuclide | Extrapolating across isotopes            | Verify the nuclide identity before using a tabulated \(\lambda\) |

## 7. The textbook-precise statement
Let \(N(t)\) be the number of radioactive nuclei of a single species at time \(t\). If each nucleus decays independently with constant probability \(\lambda\) per unit time, then \(N(t)\) satisfies the first-order linear ODE
\[
\frac{dN}{dt} = -\lambda N, \quad N(0) = N_0.
\]
The unique solution is
\[
N(t) = N_0 e^{-\lambda t}.
\]
The half-life is \(T_{1/2} = \frac{\ln 2}{\lambda}\). The activity is \(A(t) = \lambda N(t)\).  
(Krane, *Introductory Nuclear Physics*, 2e, §6.2)

## 8. Visual — diagram or schematic
```text
N
^
|   N0
|    *
|     \
|      \   N0/2
|       *--------
|        \
|         \
|          *   N0/4
|           \
|            \
+-------------*---> t
  0   T1/2  2 T1/2
```
Horizontal axis: time in units of half-life. Vertical axis: number of nuclei (logarithmic spacing shown). The curve is a pure exponential; each interval of length \(T_{1/2}\) halves the ordinate.

## 9. The memory technique
1. **The hook** — Picture a vast crowd of identical, impatient soldiers; every second each soldier flips a coin and disappears if it lands heads. The crowd thins exactly as \(e^{-\lambda t}\).
2. **What to overlearn** — \(N = N_0 e^{-\lambda t}\), \(T_{1/2} = \ln 2 / \lambda\), \(A = \lambda N\).
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Begin from the statement “probability per unit time is constant,” form \(\Delta N = -\lambda N \Delta t\), convert to \(\frac{dN}{dt} = -\lambda N\), separate variables and integrate.

## 10. What this unlocks
Mastery of the single-species decay law is the necessary foundation for every subsequent treatment of radioactive processes.  
- Multi-step decay chains (Bateman equations)  
- Secular equilibrium in parent–daughter systems  
- Radiometric dating techniques beyond carbon-14  
- Reactor kinetics and burn-up calculations  
- Radiation-detector dead-time corrections  

## 11. Self-check — five questions, no answers
1. A sample contains \(8 \times 10^{10}\) nuclei with \(\lambda = 0.01\) s^{-1}. After how many seconds will exactly \(10^{10}\) nuclei remain?  
2. Derive the numerical factor that converts half-life into mean lifetime without looking up the value of \(\ln 2\).  
3. Activity of a pure sample is measured as 1200 Bq at \(t=0\) and 300 Bq at \(t=4\) h. What is the half-life?  
4. Explain why the exponential law would fail for a sample containing only five nuclei; quantify the error.  
5. Two isotopes have identical half-lives but different atomic masses. At the same initial number of nuclei, which has the higher initial activity and why?