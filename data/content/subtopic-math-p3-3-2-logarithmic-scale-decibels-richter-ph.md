## What it is
A logarithmic scale maps quantities that span many orders of magnitude onto a linear scale by plotting the logarithm of the ratio of the quantity to a reference value. Instead of moving along the axis by adding fixed amounts, moving a fixed distance on a logarithmic scale corresponds to multiplying the underlying physical quantity by a constant factor.

## Why it matters
In physics, acoustics, and rocket science, dynamic ranges are massive. The acoustic power of a rocket launch compared to a whisper spans over 15 orders of magnitude; plotting this on a linear scale compresses the whisper into microscopic invisibility. Logarithmic scales (decibels, Richter, pH) allow engineers and scientists to analyze the microscopic and the macroscopic simultaneously using manageable numbers like $3$ or $140$, and they turn exponential decay/growth relationships into easily analyzable straight lines.

## When to study it
You must already possess a rock-solid understanding of:
1. Properties of logarithms (product, quotient, and power rules).
2. Base-10 logarithms and scientific notation.
3. Exponential growth and decay.

If you cannot instantly see why $\log_{10}(1000) = 3$ or why $\log_a(x^y) = y\log_a(x)$, stop here and review basic logarithms.

## How to study it (step by step)
1. **Understand the dimensionless ratio.** Recognize that you cannot take the logarithm of a unit (like Watts or Moles). Log scales always divide the quantity $Q$ by a reference quantity $Q_0$ to make it dimensionless: $\log_{10}(Q/Q_0)$.
2. **Master the Decibel (Power).** Define the Bel as $\log_{10}(P/P_0)$. Since a Bel is large, we use decibels (tenths of a Bel): $L_{dB} = 10 \log_{10}(P/P_0)$.
3. **Derive the Decibel (Amplitude/Voltage/Pressure).** Power is proportional to the square of amplitude ($P \propto A^2$). Substitute this into the power formula and use the log power rule to bring the $2$ down, yielding $L_{dB} = 20 \log_{10}(A/A_0)$.
4. **Master pH.** Define pH as the negative base-10 logarithm of hydrogen ion concentration: $\text{pH} = -\log_{10}([H^+])$. Practice converting both ways.
5. **Master Earthquake Magnitude.** Understand that a $+1$ increase in earthquake magnitude (Richter/Moment) corresponds to $10^{1.5} \approx 31.6$ times more energy release.

## Key ideas, with intuition

**Addition becomes multiplication**
On a linear scale, moving $+1$ unit means adding $1$. On a base-10 logarithmic scale, moving $+1$ unit means *multiplying* the underlying quantity by $10$. Moving $+3$ units means multiplying by $10^3 = 1000$. 

**The Reference Value ($Q_0$)**
The zero-point of a logarithmic scale is not "nothingness." It is the reference value. 
If $Q = Q_0$, then $Q/Q_0 = 1$. 
Since $\log_{10}(1) = 0$, a value of $0$ on the log scale simply means "equal to the reference." For example, $0 \text{ dB}$ does not mean zero sound; it means the sound power equals the reference power (usually $10^{-12} \text{ W/m}^2$, the threshold of human hearing).

**The Negative Log (pH)**
Because hydrogen ion concentrations in chemistry are tiny (e.g., $10^{-7} \text{ mol/L}$), taking a standard log would yield annoying negative numbers ($-7$). We define $\text{pH}$ with a negative sign to force the scale to be positive:
$$ \text{pH} = -\log_{10}([H^+]) $$
Intuition: The *higher* the pH, the *lower* the concentration of $H^+$.

## Worked example
**Problem:** A single rocket engine produces an acoustic intensity of $140 \text{ dB}$. If you strap two identical engines together, what is the new acoustic intensity in decibels?

**Step 1: Write the definition of decibels for power/intensity.**
$$ L_1 = 10 \log_{10}\left(\frac{I_1}{I_0}\right) = 140 $$

**Step 2: Define the new intensity.**
Two identical engines double the physical intensity.
$$ I_2 = 2 I_1 $$

**Step 3: Calculate the new decibel level.**
$$ L_2 = 10 \log_{10}\left(\frac{2 I_1}{I_0}\right) $$

**Step 4: Use logarithm rules to separate the terms.**
$$ L_2 = 10 \left[ \log_{10}(2) + \log_{10}\left(\frac{I_1}{I_0}\right) \right] $$
$$ L_2 = 10 \log_{10}(2) + 10 \log_{10}\left(\frac{I_1}{I_0}\right) $$

**Step 5: Substitute known values.**
We know $10 \log_{10}(I_1/I_0) = 140$. We also know $\log_{10}(2) \approx 0.301$.
$$ L_2 \approx 10(0.301) + 140 $$
$$ L_2 \approx 3.01 + 140 = 143.01 \text{ dB} $$

*Reflection:* Doubling the physical power *always* adds exactly $10 \log_{10}(2) \approx 3 \text{ dB}$ to the logarithmic scale, regardless of the starting value. You cannot just add $140 + 140 = 280 \text{ dB}$.

## Diagrams

```text
Logarithmic Mapping: Base 10

Linear Scale (e.g., pH, Richter, Bels)
  0         1         2         3         4
  |---------|---------|---------|---------|
  v         v         v         v         v
  |---------|---------|---------|---------|
 10^0      10^1      10^2      10^3      10^4
  1        10        100       1000      10000
Underlying Physical Quantity (Ratio Q/Q_0)

Notice: Equal spatial steps on the top axis (+1) correspond 
to equal multiplicative steps on the bottom axis (*10).
```

## Memory technique — remember this forever
1. **The Hook:** "The Rule of 3 and 10 for Decibels." 
   $+3 \text{ dB}$ = Double the power ($\times 2$).
   $+10 \text{ dB}$ = Ten times the power ($\times 10$).
2. **Must Overlearn:**
   * Power dB: $L = 10 \log_{10}(P/P_0)$
   * Amplitude dB: $L = 20 \log_{10}(A/A_0)$
   * pH: $\text{pH} = -\log_{10}([H^+])$
3. **Spaced-Repetition:** Review these formulas and the worked example at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget whether amplitude is $10\log$ or $20\log$, remember that Power is Amplitude squared ($P \propto A^2$). 
   $$ 10 \log_{10}\left(\frac{A^2}{A_0^2}\right) = 10 \log_{10}\left[\left(\frac{A}{A_0}\right)^2\right] = 20 \log_{10}\left(\frac{A}{A_0}\right) $$

## Common mistakes
* **Adding logarithms instead of multiplying underlying values:** Thinking two $100 \text{ dB}$ sound sources create $200 \text{ dB}$. They create $103 \text{ dB}$. 
* **Using the wrong multiplier for dB:** Using $10 \log_{10}$ for voltage or pressure. Voltage and pressure are amplitudes, so you must use $20 \log_{10}$.
* **Misinterpreting pH direction:** Thinking a pH of $3$ is less acidic than a pH of $5$. Because of the negative sign, lower pH means *higher* concentration of $H^+$ (more acidic). A pH of $3$ is $100$ times more acidic than a pH of $5$.

## Self-check
1. A solution has a hydrogen ion concentration of $10^{-4.5} \text{ mol/L}$. What is its pH?
2. An earthquake of magnitude 7.0 releases $E_7$ energy. An earthquake of magnitude 5.0 releases $E_5$ energy. Given the energy scales as $E \propto 10^{1.5M}$, what is the exact ratio $E_7 / E_5$?
3. An amplifier increases a signal's voltage by a factor of $100$. What is the voltage gain in decibels?