## 1. The one-sentence answer
**Solving exponential equations using logarithms means taking the logarithm of both sides of an equation of the form \(a^x = b\) (with \(a > 0\), \(a \neq 1\)) so that the exponent becomes a multiplicative factor that can be isolated algebraically.**

An exponential equation hides the unknown in the exponent. Direct algebraic rearrangement fails because addition and multiplication do not undo exponentiation. The logarithm is defined as the inverse operation: if \(y = \log_a b\), then \(a^y = b\). Applying this inverse to both sides of the original equation therefore moves the unknown out of the exponent and into a position where ordinary algebra finishes the solution.

The same principle extends immediately to equations whose exponents are linear expressions in the unknown, such as \(a^{cx+d} = b\). After the logarithm converts the power into a product, the remaining steps are identical to solving any linear equation.

> [!NOTE]
> The single decisive move is that \(\log_a(a^x) = x\) for any admissible \(x\); everything else is bookkeeping.

## 2. Why this matters — concrete and current
Semiconductor engineers at TSMC and Intel use the Arrhenius equation \(k = A e^{-E_a/RT}\) to predict transistor failure rates under accelerated stress testing; taking the natural logarithm converts the exponential into a straight line whose slope yields the activation energy \(E_a\) directly from measured data.

NASA’s Jet Propulsion Laboratory models the exponential decay of radioisotope thermoelectric generators on the Perseverance rover with \(P(t) = P_0 e^{-\lambda t}\). Solving for mission lifetime requires isolating \(t\) via logarithms to guarantee power margins years after launch.

Quantitative finance desks at Jane Street and Citadel solve the Black–Scholes PDE by reducing it to an exponential equation in the forward price; the closed-form solution for implied volatility is obtained only after taking logarithms of the observed option price.

In machine-learning training loops at OpenAI and Google DeepMind, learning-rate schedules of the form \(\eta_t = \eta_0 \cdot \gamma^t\) are tuned by setting a target loss and solving the resulting exponential equation for the decay factor \(\gamma\) that meets a prescribed convergence time.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Definition of \(a^x\)    | Guarantees the exponential is defined and one-to-one      |
| Definition of \(\log_a x\)| Supplies the inverse that extracts the exponent           |
| Logarithm power rule     | Converts \(\log(a^{f(x)})\) into \(f(x) \cdot \log a\)    |
| Domain restrictions      | Prevents taking logs of non-positive numbers or base 1    |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the unknown in the exponent
An equation is exponential precisely when the unknown appears only inside an exponent.  
Example: \(5^x = 125\).  
Formal statement: the equation is of the form \(a^{f(x)} = b\) where \(f(x)\) is linear.  
> [!WARNING] Treating \(5^x = 125\) as an ordinary polynomial equation leads to nonsense such as \(x = 125/5\).

### Step 2 — Apply the logarithm to both sides
Because the logarithm is defined on positive reals and is one-to-one, the equality is preserved.  
Example: \(\log_5(5^x) = \log_5 125\).  
Formal statement: if \(a^u = a^v\) and \(a > 0\), \(a \neq 1\), then \(u = v\).  
> [!WARNING] Applying the logarithm only to one side destroys equality.

### Step 3 — Invoke the inverse relationship
The composition \(\log_a(a^y)\) collapses to \(y\).  
Example: \(x = \log_5 125\).  
Formal statement: \(\log_a(a^y) = y\) for all real \(y\).  
> [!WARNING] Confusing the base of the logarithm with the base of the exponential produces an incorrect numerical value.

### Step 4 — Simplify the right-hand side
Evaluate or rewrite the constant logarithm when possible.  
Example: \(x = 3\) because \(5^3 = 125\).  
Formal statement: \(\log_a(a^k) = k\) when \(k\) is an integer power.  
> [!WARNING] Leaving the answer as \(\log_5 125\) when it simplifies hides the exact solution.

### Step 5 — Extend to linear exponents
Replace \(x\) by \(cx + d\) and solve the resulting linear equation.  
Example: \(3^{2x+1} = 81\) becomes \(2x+1 = 4\).  
Formal statement: \(\log_a(a^{cx+d}) = cx + d\).  
> [!WARNING] Forgetting to distribute the logarithm over the linear expression produces an off-by-constant error.

### Step 6 — State the general solution method
Any exponential equation \(a^{f(x)} = b\) (with \(a > 0\), \(a \neq 1\), \(b > 0\)) is solved by  
\[
f(x) = \log_a b.
\]

## 5. Worked examples — every step shown

**Example 1 — Integer power**  
*Given:* \(2^x = 32\)  
*Find:* \(x\)  
Step 1: \(\log_2(2^x) = \log_2 32\)  
*Why:* Logarithm is one-to-one, equality preserved.  
Step 2: \(x = \log_2 32\)  
*Why:* Inverse property \(\log_2(2^x) = x\).  
Step 3: \(x = 5\)  
*Why:* \(2^5 = 32\).  
**5**  

*Reflection:* The base matched the exponential base, so simplification was immediate; this pattern generalises to any perfect-power case.

**Example 2 — Natural base, irrational answer**  
*Given:* \(e^x = 7\)  
*Find:* \(x\)  
Step 1: \(\ln(e^x) = \ln 7\)  
*Why:* Natural log is the inverse of the exponential with base \(e\).  
Step 2: \(x = \ln 7\)  
*Why:* \(\ln(e^x) = x\).  
**\(\ln 7\)**  

*Reflection:* When the base is \(e\), the natural logarithm is the cleanest notation; numerical approximation is unnecessary unless a decimal is explicitly required.

**Example 3 — Linear exponent**  
*Given:* \(4^{3x-2} = 64\)  
*Find:* \(x\)  
Step 1: \(\log_4(4^{3x-2}) = \log_4 64\)  
*Why:* Logarithm applied to both sides.  
Step 2: \(3x-2 = \log_4 64\)  
*Why:* Inverse property.  
Step 3: \(3x-2 = 3\)  
*Why:* \(4^3 = 64\).  
Step 4: \(3x = 5\), so \(x = 5/3\)  
*Why:* Standard linear isolation.  
**\(\dfrac{5}{3}\)**  

*Reflection:* The coefficient of \(x\) survives multiplication by the logarithm; always distribute before collecting terms.

**Example 4 — Different bases**  
*Given:* \(5^x = 3^{x+2}\)  
*Find:* \(x\)  
Step 1: \(\ln(5^x) = \ln(3^{x+2})\)  
*Why:* Any common base works; natural log chosen for convenience.  
Step 2: \(x \ln 5 = (x+2)\ln 3\)  
*Why:* Power rule.  
Step 3: \(x \ln 5 - x \ln 3 = 2 \ln 3\)  
*Why:* Collect like terms.  
Step 4: \(x(\ln 5 - \ln 3) = 2 \ln 3\)  
*Why:* Factor.  
Step 5: \(x = \dfrac{2 \ln 3}{\ln 5 - \ln 3}\)  
*Why:* Divide.  
**\(\dfrac{2 \ln 3}{\ln 5 - \ln 3}\)** (equivalently \(\dfrac{2 \ln 3}{\ln(5/3)}\))  

*Reflection:* When bases differ, logarithms of both bases appear; simplification via the quotient rule is optional but often neater.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Applying log to only one side     | Forgetting equality must be preserved       | Write “log both sides” as an explicit first step     |
| Using wrong base                  | Mixing the exponential base with the log base | Always choose the log whose base matches the exponential when possible |
| Ignoring domain                   | Logarithms undefined for non-positive arguments | Verify \(b > 0\) before taking logs                  |
| Losing the coefficient of \(x\)   | Treating \(cx+d\) as a single exponent      | Distribute the log immediately after the inverse step |
| Treating \(\log a + \log b = \log(ab)\) as addition of exponents | Confusing product rule with exponent addition | Keep the power rule \(\log(a^y) = y\log a\) separate |
| Expecting an integer answer       | Most exponential equations yield irrationals | Accept logarithmic or decimal forms as exact         |
| Forgetting to check extraneous solutions | Log is one-to-one, yet domain slips occur | Substitute final answer back into original equation  |

## 7. The textbook-precise statement
Let \(a > 0\), \(a \neq 1\), and let \(b > 0\). If \(f(x)\) is a real-valued function, the equation \(a^{f(x)} = b\) has the unique solution  
\[
f(x) = \log_a b,
\]  
provided the expression lies in the domain of \(f\). When \(f(x) = cx + d\) with \(c \neq 0\), the solution is  
\[
x = \frac{\log_a b - d}{c}.
\]  
(Stewart, *Calculus*, 9e, §3.4, Theorem 5 and subsequent examples.)

## 8. Visual — diagram or schematic
```text
Exponential equation: a^{cx+d} = b
          │
          ▼  (Step 2)
Apply log_a to both sides
          │
          ▼  (Step 3)
cx + d = log_a b          (inverse property)
          │
          ▼  (Step 5)
     x = (log_a b − d)/c
```

## 9. The memory technique
1. **The hook** — Picture the exponent as a bird trapped inside a cage of base \(a\); the logarithm is the key that opens the cage and lets the bird (the exponent) fly out multiplied by \(\log a\).
2. **What to overlearn** — \(\log_a(a^y) = y\) and the power rule \(\log(a^y) = y\log a\); also the domain conditions \(a > 0\), \(a \neq 1\), argument \(> 0\).
3. **Spaced-repetition schedule** — Review the inverse property at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive by writing \(y = a^x\), taking \(\log_a\) of both sides, and applying the definition of logarithm.

## 10. What this unlocks
Mastery of this technique supplies the algebraic engine for all subsequent work with exponential and logarithmic functions, including differentiation, integration, and series expansions.  
- Derivatives of \(a^x\) and \(\ln x\)  
- Continuous compounding and effective rates  
- Solving logarithmic equations by exponentiation (the dual skill)  
- Linearising exponential data for regression  
- Half-life and doubling-time calculations in differential equations  

## 11. Self-check — five questions, no answers
1. Solve \(7^x = 49\) exactly.  
2. Solve \(e^{2x-1} = 5\) and approximate to three decimal places.  
3. Solve \(2^{x} \cdot 3^{x} = 36\) without first combining bases.  
4. Explain why the equation \( (-2)^x = 8 \) cannot be solved by taking logarithms.  
5. Given \(a^{kx} = b\) with \(a,b,k > 0\) and \(k \neq 0\), derive the explicit formula for \(x\) and state the single condition under which no real solution exists.