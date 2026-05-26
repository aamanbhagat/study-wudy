## 1. The one-sentence answer
**Exponential growth and decay models are continuous functions of the form \( y = y_0 e^{kt} \) in which the instantaneous rate of change is proportional to the current value, producing a constant half-life for decay (\( k < 0 \)) and a constant doubling time for growth (\( k > 0 \)).**

A quantity whose rate of change is always a fixed fraction of its present size cannot increase or decrease by fixed additive amounts; the increments themselves must grow or shrink. This forces the solution into an exponential. Once the model is written, the time required for the quantity to halve (or double) is obtained by solving \( y_0 e^{kT} = y_0/2 \) (or \( 2y_0 \)) for the single unknown \( T \), which turns out to be independent of the starting value.

The same constant \( T \) therefore governs every successive halving or doubling, giving the process its characteristic geometric rhythm.

> [!NOTE]
> The half-life (or doubling time) is the single number that completely characterises the speed of the process; once it is known, every future or past value can be read off by counting multiples of that interval.

## 2. Why this matters — concrete and current
Carbon-14 dating laboratories at the University of Oxford and ETH Zürich determine the age of archaeological specimens by measuring the remaining fraction of \( ^{14}\text{C} \) and applying its 5730-year half-life directly to the exponential decay equation.

Pharmaceutical companies model the clearance of drugs such as vancomycin from the bloodstream; the 6-to-8-hour half-life dictates dosing intervals that keep plasma concentration above the minimum inhibitory level for bacteria.

Intel and TSMC track transistor density on successive process nodes; Moore’s empirical observation of doubling every 24 months remains the planning baseline for multi-billion-dollar fabrication facilities.

Nuclear engineers at ITER calculate tritium breeding ratios inside the blanket modules by treating neutron-induced production and radioactive decay as competing exponential terms whose net growth constant must stay positive.

Ecologists at the Woods Hole Oceanographic Institution forecast harmful algal blooms by fitting measured cell counts to an exponential growth model whose doubling time, often 12–24 hours under nutrient-rich conditions, determines when coastal monitoring must be intensified.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Functions and function notation | To write \( y(t) \) and evaluate it at specific times     |
| Laws of exponents        | To manipulate \( e^{k(t+T)} = e^{kt} \cdot e^{kT} \)      |
| Solving exponential equations | To isolate the time variable after substituting half or double values |
| Basic algebra            | To rearrange \( y_0 e^{kT} = y_0/2 \) into \( T = \frac{\ln(1/2)}{k} \) |

## 4. Building the idea — from intuition to formalism

### Step 1 — Rate proportional to size
A population or mass changes at a speed that is always some fixed percentage of its current size.  
Example: A bacterial colony of 1000 cells grows at 5 % of its present size each hour, so the absolute growth is 50 cells when the colony is 1000 but 100 cells once it reaches 2000.  
The differential equation is  
\[ \frac{dy}{dt} = k y. \]  
> [!WARNING]  
> Treating the rate as constant (additive growth) produces a straight line instead of the correct curve; the model then fails as soon as the quantity changes appreciably.

### Step 2 — Separation and integration
Separate variables and integrate both sides:  
\[ \int \frac{dy}{y} = \int k\, dt \]  
yielding  
\[ \ln |y| = kt + C. \]  
Exponentiate to obtain the general solution  
\[ y = y_0 e^{kt}. \]

### Step 3 — Sign of \( k \) distinguishes growth from decay
When \( k > 0 \) the function increases without bound; when \( k < 0 \) it approaches zero asymptotically.  
The numerical value \( |k| \) fixes the speed of either process.

### Step 4 — Half-life definition
For decay (\( k < 0 \)), the half-life \( T_{1/2} \) satisfies \( y(T_{1/2}) = y_0/2 \):  
\[ y_0 e^{k T_{1/2}} = \frac{y_0}{2} \implies T_{1/2} = \frac{\ln 2}{|k|}. \]  
The same interval halves the quantity again from any new starting point.

### Step 5 — Doubling time definition
For growth (\( k > 0 \)), the doubling time \( T_2 \) satisfies \( y(T_2) = 2y_0 \):  
\[ T_2 = \frac{\ln 2}{k}. \]  
It is numerically identical to the half-life formula but with positive \( k \).

### Step 6 — Textbook statement
Any solution of \( dy/dt = ky \) can be rewritten  
\[ y(t) = y_0 \cdot 2^{\pm t/T}, \]  
where the sign is chosen according to growth or decay and \( T \) is the measured half-life or doubling time.

## 5. Worked examples — every step shown

**Example 1 — Simple half-life calculation**  
*Given:* \( y = 80 e^{-0.00012 t} \) grams of a radioactive isotope, \( t \) in years.  
*Find:* the half-life.  
Step: set \( 80 e^{-0.00012 T} = 40 \).  
*Why:* definition of half-life.  
Step: divide by 80 to obtain \( e^{-0.00012 T} = 1/2 \).  
*Why:* isolate the exponential.  
Step: take natural log: \( -0.00012 T = \ln(1/2) \).  
*Why:* logarithm undoes the exponential.  
Step: solve: \( T = \frac{\ln 2}{0.00012} \approx 5776 \) years.  
**5776 years**  
*Reflection:* The arithmetic is direct once the equation is set to half the initial value; the same \( T \) works from any later mass.

**Example 2 — Find remaining mass after several half-lives**  
*Given:* 120 g of carbon-14, half-life 5730 y.  
*Find:* mass after 17 190 y.  
Step: note \( 17\,190 = 3 \times 5730 \).  
*Why:* integer multiples of half-life.  
Step: three halvings reduce mass by \( 2^3 = 8 \).  
*Why:* each half-life multiplies by \( 1/2 \).  
**15 g**  
*Reflection:* Counting half-lives replaces explicit exponentiation when time is an exact multiple.

**Example 3 — Doubling time from continuous rate**  
*Given:* A population grows at continuous rate \( k = 0.028 \) per year.  
*Find:* doubling time.  
Step: solve \( e^{0.028 T} = 2 \).  
*Why:* definition of doubling.  
Step: \( T = \ln 2 / 0.028 \approx 24.76 \) y.  
**24.76 years**  
*Reflection:* The formula \( T = \ln 2 / k \) is the growth counterpart of the half-life formula.

**Example 4 — Backwards in time**  
*Given:* 12 g of isotope remains; original sample was 96 g; half-life 8 h.  
*Find:* elapsed time.  
Step: \( 96 \cdot 2^{-t/8} = 12 \).  
*Why:* express decay with half-life base.  
Step: \( 2^{-t/8} = 1/8 = 2^{-3} \).  
*Why:* equate powers of 2.  
Step: \( -t/8 = -3 \implies t = 24 \) h.  
**24 hours**  
*Reflection:* The same relation works backwards; negative exponents simply count half-lives into the past.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Using \( \log_{10} \) instead of \( \ln \) when solving for \( T \) | Calculator default base feels familiar | Always convert via \( \ln x = \log_{10} x / \log_{10} e \) or use natural-log key |
| Forgetting that half-life is independent of starting amount | Linear intuition suggests larger samples take longer | Verify algebraically that \( y_0 \) cancels |
| Confusing continuous rate \( k \) with discrete percentage | Text sometimes quotes “5 % per hour” without stating compounding | Convert discrete rate \( r \) to \( k = \ln(1+r) \) before using exponential formula |
| Applying the model past the point where assumptions break (e.g., limited resources) | Exponential never saturates | Check domain of validity before extrapolating |
| Sign error on \( k \) when writing decay | Growth and decay equations look identical | Write \( k = -\frac{\ln 2}{T_{1/2}} \) explicitly for decay |
| Rounding \( \ln 2 \approx 0.693 \) too early | Accumulated rounding error in multi-step problems | Keep \( \ln 2 \) symbolic until final numerical answer |
| Treating doubling time as additive rather than multiplicative | Misreading “doubles every 3 days” as +3 days per doubling | Count intervals: after \( n \) intervals multiply by \( 2^n \) |

## 7. The textbook-precise statement
Let \( y \) be a differentiable function satisfying the differential equation  
\[ \frac{dy}{dt} = k y, \quad k \in \mathbb{R}. \]  
Then there exists a constant \( y_0 > 0 \) such that  
\[ y(t) = y_0 e^{kt} \quad \text{for all } t \in \mathbb{R}. \]  
If \( k < 0 \), the half-life is the unique positive number  
\[ T_{1/2} = \frac{\ln 2}{|k|}. \]  
If \( k > 0 \), the doubling time is  
\[ T_2 = \frac{\ln 2}{k}. \]  
(Stewart, *Calculus*, 9e, §3.4, Theorem 1 and subsequent discussion of half-life.)

## 8. Visual — diagram or schematic

```text
y
^
|          decay curve  y = y0 * e^{-kt}
|        *
|      *   *
|    *       *
|  *           *
|*               *  <-- half at T½
+-------------------------> t
 0   T½   2T½   3T½
Each vertical drop halves the height; horizontal spacing is constant T½.
```

The curve is strictly decreasing, convex, and asymptotic to the t-axis. Mark successive half-life points at equal intervals along the time axis; the y-values form a geometric sequence.

## 9. The memory technique

**The hook**  
Picture a staircase whose every riser is exactly half the height of the previous one; the treads are all the same width \( T_{1/2} \). Walking down the staircase halves the altitude at every fixed step.

**What to overlearn**  
1. \( T_{1/2} = \frac{\ln 2}{|k|} \) and \( T_2 = \frac{\ln 2}{k} \).  
2. \( y(t) = y_0 \cdot 2^{-t/T_{1/2}} \) (decay) or \( y(t) = y_0 \cdot 2^{t/T_2} \) (growth).  
3. \( k \) must carry the correct sign.

**Spaced-repetition schedule**  
Review the three formulas at 1 day, 3 days, 7 days, 16 days, 35 days after first mastery.

**First-principles fallback**  
Start from \( dy/dt = ky \), separate variables, integrate, obtain \( y = y_0 e^{kt} \), then substitute \( y = y_0/2 \) and solve for \( T \).

## 10. What this unlocks
Mastery of half-life and doubling time supplies the language for all subsequent exponential applications and for the qualitative analysis of autonomous differential equations.  

- Compound-interest formulas with continuous compounding  
- Logistic and other limited-growth models that saturate the pure exponential  
- Separation of variables in first-order linear DEs  
- Logarithmic scales on graphs (decibels, pH, Richter)  
- Stability criteria in linear systems of DEs  

## 11. Self-check — five questions, no answers
1. A sample of 50 g decays to 6.25 g in 30 days. What is the half-life?  
2. The continuous growth rate of a colony is \( k = 0.15 \) h\(^{-1}\). How many hours until the population has increased by a factor of 32?  
3. Explain why the half-life formula contains \( \ln 2 \) rather than \( \ln(1/2) \).  
4. A quantity obeys \( y = 200 \cdot 3^{-t/5} \). Is this growth or decay? What is the corresponding half-life or doubling time?  
5. Two isotopes have half-lives 8 h and 12 h. After 24 h, which sample retains the larger fraction of its original atoms, and by what factor?