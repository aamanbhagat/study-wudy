## What it is
Fatigue is the progressive and localized structural damage that occurs when a material is subjected to cyclic loading, often causing failure at stress levels well below the material's ultimate or yield strength. An S-N curve maps the magnitude of cyclic stress (S) against the number of cycles to failure (N) on a logarithmic scale. Miner's rule is a linear mathematical model used to estimate the cumulative damage of fatigue when a part is subjected to varying levels of stress over its lifetime.

## Why it matters
In aerospace, structures rarely fail because a single static load exceeded the yield strength; they fail because they are shaken apart. Launch vehicles endure extreme acoustic vibrations during ascent, and satellites experience thousands of thermal expansion/contraction cycles in orbit. If you cannot predict fatigue life using S-N curves and Miner's rule, your spacecraft will suffer catastrophic structural failure mid-mission, turning a billion-dollar asset into orbital debris.

## When to study it
You must already possess a rock-solid understanding of Mechanics of Materials. Specifically, you need to know:
1. Stress and strain tensors.
2. Yield strength ($\sigma_y$) and ultimate tensile strength ($\sigma_{uts}$).
3. Stress concentrations (stress raisers like holes or fillets).
If you do not know the difference between yield and ultimate strength, stop reading this and review basic material mechanics. Fatigue builds directly on these concepts.

## How to study it (step by step)
1. **Define the cyclic parameters:** Write down the definitions and formulas for maximum stress ($\sigma_{max}$), minimum stress ($\sigma_{min}$), stress amplitude ($\sigma_a$), mean stress ($\sigma_m$), and the stress ratio ($R$). 
2. **Read an S-N curve:** Look up an S-N curve for Aluminum 7075-T6. Note that the x-axis (Cycles, $N$) is logarithmic. Observe how the curve slopes downward. 
3. **Contrast material behaviors:** Compare the S-N curve of a steel alloy to an aluminum alloy. Identify the "endurance limit" (the horizontal asymptote) in steel, and note its absence in aluminum.
4. **Formulate damage:** Define fatigue damage as a fraction: $D = n / N$, where $n$ is applied cycles and $N$ is cycles to failure at that stress. 
5. **Derive Miner's Rule:** Extend the damage fraction to multiple stress levels. Sum the fractions. Set the failure threshold to $D = 1$.
6. **Calculate a load spectrum:** Solve a problem where a component is subjected to 3 different vibration regimes (e.g., liftoff, Max-Q, stage separation) and calculate the total accumulated damage.

## Key ideas, with intuition

**1. Cyclic Stress Parameters**
Fatigue is driven by the fluctuation of stress. We characterize a cyclic load by its amplitude and its mean.
*   Stress Amplitude: $$ \sigma_a = \frac{\sigma_{max} - \sigma_{min}}{2} $$
*   Mean Stress: $$ \sigma_m = \frac{\sigma_{max} + \sigma_{min}}{2} $$
*   Stress Ratio: $$ R = \frac{\sigma_{min}}{\sigma_{max}} $$
*Intuition:* A fully reversed load (like bending a paperclip back and forth) has $R = -1$ and $\sigma_m = 0$. A load that pulses but never goes into compression (like a pressurized tank) has $R > 0$.

**2. The S-N Curve (Wöhler Curve)**
The S-N curve plots stress amplitude $\sigma_a$ against the number of cycles to failure $N_f$. 
*   **Low Cycle Fatigue ($N < 10^4$):** High stress, macroscopic plastic deformation.
*   **High Cycle Fatigue ($N > 10^4$):** Lower stress, elastic deformation globally but microscopic plasticity at defects.
*   **Endurance Limit:** Ferrous metals (steel, titanium) exhibit a stress level below which they will *never* fail, no matter how many cycles are applied. Aluminum (used heavily in aerospace) does *not* have an endurance limit; it will always eventually fail. We usually define its "fatigue strength" arbitrarily at $10^7$ cycles.

**3. Miner's Rule (Linear Damage Accumulation)**
If a material can survive $100,000$ cycles at 200 MPa, then $1,000$ cycles at 200 MPa consumes exactly $1\%$ of its life. Damage $D$ is linear and additive.
$$ D = \sum_{i=1}^{k} \frac{n_i}{N_i} $$
Where $n_i$ is the number of cycles applied at stress level $i$, and $N_i$ is the fatigue life at stress level $i$ (read from the S-N curve). Failure occurs when $D \ge 1$.

## Worked example
**Problem:** An aluminum satellite bracket is subjected to two vibration environments during launch. 
Regime 1 (Liftoff): Stress amplitude is 250 MPa. The S-N curve states failure at this stress is $N_1 = 10^4$ cycles. The bracket experiences $n_1 = 3,000$ cycles.
Regime 2 (Max-Q): Stress amplitude is 150 MPa. The S-N curve states failure is $N_2 = 10^5$ cycles. 
How many cycles ($n_2$) can the bracket endure in Regime 2 before failing?

**Step 1: Calculate damage from Regime 1.**
$$ D_1 = \frac{n_1}{N_1} = \frac{3000}{10000} = 0.3 $$
*Reflection:* Liftoff consumed 30% of the bracket's total fatigue life.

**Step 2: Set up Miner's Rule for total failure.**
$$ D_{total} = D_1 + D_2 = 1 $$
$$ 0.3 + \frac{n_2}{N_2} = 1 $$

**Step 3: Solve for $n_2$.**
$$ \frac{n_2}{10^5} = 0.7 \implies n_2 = 70,000 \text{ cycles} $$
*Reflection:* Because 30% of the life was consumed in Regime 1, only 70% of the life remains for Regime 2. Therefore, it can survive 70,000 cycles at the lower stress instead of the full 100,000.

## Diagrams

```text
      Stress Amplitude (S)
      ^
      |
      | \
      |  \   <-- Low Cycle Fatigue (Plasticity)
      |   \
      |    \
      |     \      Aluminum (No endurance limit, keeps dropping)
      |      \ . . . . . . . . . . . . . . . . . . . . . . . 
      |       \-------______________________________________ Steel (Endurance Limit)
      |        \       ^ High Cycle Fatigue
      |         \
      |          \
      +--------------------------------------------------------> Cycles to Failure (N)
      10^0       10^3                 10^6                 10^9   (Log Scale)
```

## Memory technique — remember this forever
1. **The Hook:** Think of Miner's rule as a video game "Health Bar." Your structure starts with 100 HP ($D=0$). Every cycle is a tiny damage tick. High stress = big hits. Low stress = small hits. When HP hits 0 ($D=1$), the structure breaks.
2. **Formulas to overlearn:**
   *   Stress Amplitude: $\sigma_a = \frac{\sigma_{max} - \sigma_{min}}{2}$
   *   Miner's Rule: $\sum \frac{n_i}{N_i} = 1$
3. **Spaced-repetition schedule:** Review these concepts at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First principles pathway:** If you forget Miner's rule, ask yourself: "If I have 100 total apples, and I eat 5, what fraction is gone?" ($5/100$). Now replace apples with cycles. Total damage is just the sum of the fractions.

## Common mistakes
1. **Assuming Aluminum has an endurance limit.** Aerospace students often design aluminum parts assuming that if stress is low enough, it will last forever. It won't. Aluminum always accumulates fatigue damage.
2. **Ignoring load sequence.** Miner's rule assumes damage is independent of the *order* of loads. In reality, a massive overload early in life can create residual compressive stresses that actually *increase* fatigue life, or it can initiate a crack that drastically *decreases* life. Miner's rule is a first-order approximation.
3. **Confusing Mean Stress and Amplitude.** Using $\sigma_{max}$ instead of $\sigma_a$ when reading an S-N curve. S-N curves are plotted for $\sigma_a$ at a specific mean stress (usually $\sigma_m = 0$).

## Self-check
1. A strut undergoes cyclic loading from $-50$ MPa to $+150$ MPa. Calculate the stress amplitude ($\sigma_a$), mean stress ($\sigma_m$), and stress ratio ($R$).
2. A component has a fatigue life of $5 \times 10^4$ cycles at Stress A, and $2 \times 10^5$ cycles at Stress B. If it is subjected to $2 \times 10^4$ cycles of Stress A, what percentage of its life remains for Stress B?
3. Why might Miner's rule overestimate the life of a component if it experiences a few cycles of extreme stress (above yield) right before a long period of low-amplitude high-cycle fatigue?