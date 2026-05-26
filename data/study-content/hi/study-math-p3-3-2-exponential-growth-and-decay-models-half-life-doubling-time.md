## 1. The one-sentence answer
**Exponential growth and decay models describe quantities that change at a rate proportional to their current size, leading to the function \(N(t)=N_0e^{kt}\), where half-life is the fixed time for halving and doubling time is the fixed time for doubling.**

Yeh model tab use hota hai jab koi quantity (jaise atoms, population, ya money) apne aap mein se hi badhta ya ghat-ta hai proportionally. Agar growth positive hai toh quantity exponentially badhti hai; agar decay negative hai toh exponentially ghat-ti hai. Half-life aur doubling time dono \(\ln 2\) par depend karte hain kyunki dono mein factor 2 ya 1/2 aata hai.

Iska core idea yeh hai ki time interval fixed rehta hai har doubling ya halving ke liye, chahe quantity kitni bhi ho. Isliye continuous compounding aur radioactive processes dono ko ek hi formula se handle kiya ja sakta hai.

> [!NOTE]
> The single deepest insight is that the time to multiply or divide by any constant factor is always the same, because the differential equation \(N'=kN\) produces solutions where the logarithm of the quantity is linear in time.

## 2. Why this matters — concrete and current
In nuclear medicine, technetium-99m with a 6-hour half-life is used daily in SPECT scans at hospitals worldwide; doctors calculate remaining activity using the exact half-life formula to decide injection timing and patient safety margins.

Semiconductor firms such as TSMC and Intel rely on Moore’s-law doubling times of roughly 24 months for transistor density; process engineers plug measured doubling constants into yield models to forecast when a new node will become economically viable.

NASA’s Mars 2020 mission and subsequent sample-return planning use carbon-14 and other isotope decay chains with known half-lives to date Martian rock samples; the same exponential decay equations appear in the radiometric dating papers published by the Perseverance science team.

During the 2020–2022 COVID waves, epidemiologists at Imperial College and IHME fitted early exponential growth rates to case data and converted those rates into doubling times of 3–5 days to set hospital-bed and ventilator procurement targets for national governments.

In quantitative finance, continuous-time Black–Scholes models treat stock prices as exponential growth processes whose volatility parameter directly determines the expected doubling time of a call-option payoff; traders at Jane Street and Citadel recalibrate these doubling times intraday.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Derivative of \(e^x\)    | Produces the differential equation \(N'=kN\)              |
| Natural logarithm        | Inverts the exponential to solve for time or rate         |
| Solving separable ODEs   | Turns \(dN/N=k\,dt\) into the explicit solution \(N(t)\)  |
| Logarithm properties     | Converts multiplication by constants into addition of logs |

If any row above feels shaky, pause and review that single concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Rate proportional to size
A quantity changes so that its instantaneous rate equals a constant times itself.  
Concrete example: a bacterial colony of 1000 cells grows at 3 % of its current size every hour.  
Formal statement:  
\[
\frac{dN}{dt}=kN
\]  
> [!WARNING]  
> Treating the rate as constant instead of proportional produces linear growth and destroys the fixed doubling interval.

### Step 2 — Separate and integrate
Divide both sides by \(N\) and integrate with respect to time.  
\[
\int\frac{1}{N}\,dN=\int k\,dt
\]  
yields \(\ln|N|=kt+C\).  
> [!WARNING]  
> Forgetting the absolute value hides the fact that \(N\) must stay positive.

### Step 3 — Solve the constant
Apply initial condition \(N(0)=N_0\) to obtain \(C=\ln N_0\).  
Thus  
\[
N(t)=N_0e^{kt}
\]  
> [!WARNING]  
> Using base-10 exponent instead of \(e\) changes the numerical value of \(k\) and breaks later half-life formulas.

### Step 4 — Half-life derivation
Set \(N(t)=N_0/2\):  
\[
\frac12=e^{kT_{1/2}}\implies T_{1/2}=\frac{\ln2}{k}\quad(k<0)
\]  
> [!WARNING]  
> Using \(\log_{10}2\) instead of \(\ln2\) gives an off-by-factor answer.

### Step 5 — Doubling time derivation
Set \(N(t)=2N_0\):  
\[
T_2=\frac{\ln2}{k}\quad(k>0)
\]  
> [!WARNING]  
> Sign error on \(k\) swaps growth and decay formulas.

### Step 6 — Unified constant
Both times equal \(\frac{\ln2}{|k|}\). This single expression lets you move between growth and decay without rewriting equations.

### Step 7 — Continuous versus discrete
The continuous model \(e^{kt}\) is the limit of repeated multiplication by \((1+r\Delta t)\). Discrete compounding converges to it, so half-life formulas remain valid.

### Step 8 — Textbook-grade statement
If \(N'(t)=kN(t)\) with \(N(0)=N_0\), then \(N(t)=N_0e^{kt}\). The time for \(N\) to become \(cN_0\) is \(\frac1k\ln c\) when \(k\neq0\).

## 5. Worked examples — har step show karo

**Example 1 — Simple half-life calculation**  
*Given:* A radioactive sample has decay constant \(k=-0.132\) per day.  
*Find:* Half-life.  
Step 1: Write \(T_{1/2}=\frac{\ln2}{|k|}\).  
Step 2: Substitute numbers: \(\ln2\approx0.693147\).  
Step 3: Divide \(0.693147/0.132\approx5.25\).  
*Why* each step: formula comes from Step 4 above; absolute value removes sign; calculator gives precise value.  
**5.25 days**

*Reflection:* The arithmetic is trivial once the sign of \(k\) is handled correctly; the same pattern appears in every half-life problem.

**Example 2 — Amount left after several half-lives**  
*Given:* 80 g of iodine-131, half-life 8.02 days.  
*Find:* Mass after 24.06 days.  
Step 1: Number of half-lives = \(24.06/8.02=3\).  
Step 2: Each half-life multiplies by \(1/2\), so \(80\times(1/2)^3=10\).  
*Why* each step: 24.06 is exactly three half-lives; repeated halving is multiplication by \(1/2\).  
**10 g**

*Reflection:* Counting exact half-lives avoids solving the exponential every time.

**Example 3 — Find \(k\) from doubling time**  
*Given:* A population doubles every 35 minutes.  
*Find:* Growth constant \(k\).  
Step 1: \(T_2=35\) min, so \(k=\frac{\ln2}{35}\).  
Step 2: \(k\approx0.0198\) per minute.  
*Why* each step: direct inversion of the doubling formula; units stay consistent.  
**\(k\approx0.0198\) min\(^{-1}\)**

*Reflection:* The numerical value of \(k\) is rarely needed beyond the next calculation; keep it symbolic when possible.

**Example 4 — Mixed units and prediction**  
*Given:* 5 mg of a drug decays with half-life 4 h. How much remains after 10 h?  
Step 1: \(T_{1/2}=4\), so \(k=-\frac{\ln2}{4}\).  
Step 2: \(N(10)=5\exp\left(-\frac{\ln2}{4}\times10\right)\).  
Step 3: Simplify exponent: \(-\frac{10}{4}\ln2=-2.5\ln2\).  
Step 4: \(5\times e^{-2.5\ln2}=5\times2^{-2.5}=5\times\frac1{4\sqrt2}\approx0.8839\).  
*Why* each step: convert half-life to \(k\), substitute into \(N(t)\), use \(e^{\ln2}=2\) to simplify.  
**≈ 0.884 mg**

*Reflection:* The algebra collapses nicely once you replace \(e^{c\ln2}\) with a power of 2.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using \(\log_{10}2\) in formulas  | Calculator default or school log tables     | Always write \(\ln2\) explicitly             |
| Forgetting sign of \(k\)          | Growth and decay look symmetric             | Check whether quantity increases or decreases|
| Treating half-life as variable    | Confusing with mean lifetime                | Remember half-life is constant by definition |
| Mixing minutes and hours          | Time units inconsistent                     | Convert everything to one unit before substituting |
| Applying discrete formula to continuous model | Compound-interest habit                   | Verify the problem states “continuous” or “instantaneous rate” |
| Solving for \(t\) with base-10 log| Calculator muscle memory                    | Use natural log throughout or convert at end |
| Ignoring that \(N>0\) always      | Log of zero or negative undefined           | State domain \(N(t)>0\) at the start         |

## 7. The textbook-precise statement
Let \(N:[0,\infty)\to\mathbb{R}\) be differentiable and satisfy the initial-value problem
\[
N'(t)=kN(t),\qquad N(0)=N_0>0,
\]
where \(k\in\mathbb{R}\) is constant. Then
\[
N(t)=N_0e^{kt}\qquad\text{for all }t\geq0.
\]
The half-life (when \(k<0\)) is the unique positive number \(T_{1/2}\) such that \(N(T_{1/2})=N_0/2\), given explicitly by
\[
T_{1/2}=\frac{\ln2}{|k|}.
\]
The doubling time (when \(k>0\)) is likewise
\[
T_2=\frac{\ln2}{k}.
\]
(Stewart, *Calculus*, 9e, §3.4, Theorem 1 and subsequent discussion of exponential growth/decay.)

## 8. Visual — diagram or schematic
```
N
^
|          *
|         *
|        *
|       *
|      *
|     *
|    *
|   *
|  *
| *
|*
+-------------------> t
     T   2T   3T
   half-lives (decay) or doubling times (growth)
```
Curve is \(N_0e^{kt}\) with \(k<0\) (decay). Vertical dashed lines mark successive halvings at equal intervals \(T_{1/2}\). Horizontal asymptote is the t-axis.

## 9. The memory technique
1. **The hook** — Picture a single bacterium splitting every fixed interval; each split is a rung on a ladder whose height doubles at every step. The ladder rungs are spaced exactly \(\ln2/|k|\) apart.
2. **What to overlearn** — \(T_{1/2}=\frac{\ln2}{|k|}\), \(N(t)=N_0e^{kt}\), and \(\ln2\approx0.693\).
3. **Spaced-repetition schedule** — Review the three facts after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from \(N'=kN\), separate variables, integrate both sides, apply \(N(0)=N_0\), then set \(N=N_0/2\) and solve for \(t\).

## 10. What this unlocks
Mastery here lets you move directly into more advanced differential-equation models, continuous compounding in finance, and parameter estimation in data science.

- Logistic growth (adds carrying capacity)
- Carbon-dating and radiometric age calculations
- SIR epidemic models that begin with exponential growth phase
- Laplace transforms of exponential functions
- Maximum-likelihood estimation of decay rates from Poisson data

## 11. Self-check — five questions, no answers
1. A sample of 120 mg decays to 15 mg in 24 h. What is its half-life?  
2. Population doubles every 40 min. Write the explicit function if initial count is 500.  
3. Why does the half-life formula contain \(\ln2\) and not \(\log_{10}2\)?  
4. If \(k=-0.05\) h\(^{-1}\), how many hours until only 10 % remains?  
5. Identify the algebraic mistake: student wrote \(T_{1/2}=\frac{\log2}{k}\) with \(k>0\).