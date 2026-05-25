## What it is
The radioactive decay law is a statistical model describing how the number of unstable atomic nuclei in a sample decreases over time. It states that the rate of decay is directly proportional to the number of nuclei currently present. This leads to an exponential decrease, meaning the same fraction of nuclei decays in any given time interval, regardless of when you start observing.

## Why it matters
This law is fundamental to applications requiring predictable, long-term power sources or clocks. In aerospace, Radioisotope Thermoelectric Generators (RTGs) on deep-space probes like Voyager and Perseverance use the predictable heat from radioactive decay to generate electricity for decades. In fields from geology to archaeology, carbon-14 dating and other radiometric dating methods rely on this law to determine the age of fossils and artifacts.

## When to study it
Before tackling this, you must have a firm grasp of differential calculus, specifically the concepts of derivatives as rates of change and how to solve simple first-order separable differential equations. You should also be fluent with the properties of the natural logarithm and the exponential function, $e^x$. A basic understanding of atomic structure (protons, neutrons, nuclei) is assumed.

## How to study it (step by step)
1.  **Derive the Law from First Principles:** Start with the physical assumption: the number of decays in a short time interval $dt$, which we'll call $dN$, is proportional to the number of nuclei present, $N$, and the length of the interval, $dt$. Write this as $dN \propto -N dt$. The negative sign indicates that $N$ is decreasing.
2.  **Formalize the Differential Equation:** Introduce a constant of proportionality, $\lambda$, called the decay constant. This turns the proportionality into an equation: $dN = -\lambda N dt$. Rearrange this into the standard form of a differential equation: $\frac{dN}{dt} = -\lambda N$.
3.  **Solve the Equation:** Solve this equation using separation of variables. Integrate both sides from the initial condition ($t=0$, $N=N_0$) to a later time ($t$, $N(t)$). This will yield the exponential decay law: $N(t) = N_0 e^{-\lambda t}$.
4.  **Derive Half-Life:** Define the half-life, $T_{1/2}$, as the time it takes for half of the initial nuclei to decay. Set $N(T_{1/2}) = N_0/2$ in the decay law and solve for $T_{1/2}$ in terms of $\lambda$. This will give you the crucial relationship $T_{1/2} = \frac{\ln(2)}{\lambda}$.
5.  **Define and Relate Activity:** Define Activity, $A$, as the rate of decay, $A = |\frac{dN}{dt}|$. Use the differential equation from step 2 to show that $A = \lambda N$. Substitute the expression for $N(t)$ to find how activity changes over time: $A(t) = A_0 e^{-\lambda t}$.
6.  **Work Problems:** Solve problems that involve converting between $T_{1/2}$ and $\lambda$, calculating the remaining quantity of a substance after a given time, and finding the age of a sample given its current activity.

## Key ideas, with intuition
1.  **Decay is a Game of Probability:** Imagine you have a million dice, and every minute you roll all of them. Any die that lands on a '1' is removed. The number you remove each minute is, on average, proportional to the number of dice you still have. Radioactive decay is the same: the decay constant $\lambda$ represents the constant probability that any *single* nucleus will decay in a unit of time. It has units of inverse time (e.g., $s^{-1}$).

2.  **The Exponential Law is Memoryless:** The probability that a given nucleus will decay in the *next* second is completely independent of how long it has already existed. This "memoryless" property is the hallmark of exponential decay. It's why the half-life is a constant: it takes the same amount of time for the sample to go from $N_0$ to $N_0/2$ as it does to go from $N_0/2$ to $N_0/4$.
    $$ N(t) = N_0 e^{-\lambda t} $$

3.  **Half-Life is an Inverse Measure of "Hotness":** The half-life, $T_{1/2}$, is inversely related to the decay constant $\lambda$. A large $\lambda$ means a high probability of decay per unit time, resulting in a short half-life (the substance decays quickly). A small $\lambda$ means a low probability of decay, leading to a long half-life.
    $$ T_{1/2} = \frac{\ln(2)}{\lambda} \approx \frac{0.693}{\lambda} $$

4.  **Activity is Just the Decay Rate:** "Activity" is simply the name we give to the number of decays happening per second. Since the rate of decay ($\frac{dN}{dt}$) is proportional to the number of nuclei ($N$), the activity itself also follows the exact same exponential decay law. A Geiger counter measures activity, not the number of nuclei directly.
    $$ A(t) = \left| \frac{dN}{dt} \right| = \lambda N(t) = \lambda N_0 e^{-\lambda t} = A_0 e^{-\lambda t} $$

## Worked example
**Problem:** The isotope Strontium-90 ($^{90}\text{Sr}$) has a half-life of 28.8 years. If a sample contains 10.0 grams of $^{90}\text{Sr}$ initially, how many grams will remain after 100 years?

**Solution:**

1.  **Identify the Goal:** We need to find the final mass, $m(t)$, given the initial mass $m_0$, the half-life $T_{1/2}$, and the elapsed time $t$. The number of nuclei $N$ is directly proportional to the mass $m$, so we can use the decay law with mass directly: $m(t) = m_0 e^{-\lambda t}$.

2.  **Find the Decay Constant ($\lambda$):** We are given $T_{1/2}$, not $\lambda$. We must first calculate $\lambda$ using the half-life formula.
    $$ T_{1/2} = \frac{\ln(2)}{\lambda} \implies \lambda = \frac{\ln(2)}{T_{1/2}} $$
    $$ \lambda = \frac{\ln(2)}{28.8 \text{ years}} \approx \frac{0.6931}{28.8 \text{ years}} \approx 0.02406 \text{ years}^{-1} $$
    *Reflection: This step converts the intuitive concept of half-life into the mathematically necessary decay constant for the exponential formula. The units must be consistent; since time is in years, $\lambda$ is in years⁻¹.*

3.  **Apply the Decay Law:** Now substitute the known values into the decay equation.
    $$ m(t) = m_0 e^{-\lambda t} $$
    $$ m(100 \text{ years}) = (10.0 \text{ g}) \times e^{-(0.02406 \text{ years}^{-1}) \times (100 \text{ years})} $$
    *Reflection: We are plugging our knowns into the derived model. The units in the exponent (years⁻¹ × years) cancel out, as they must, leaving a dimensionless number.*

4.  **Calculate the Final Result:**
    $$ m(100) = 10.0 \times e^{-2.406} $$
    $$ m(100) \approx 10.0 \times 0.09018 $$
    $$ m(100) \approx 0.902 \text{ g} $$
    *Reflection: The calculation yields the final mass. As a sanity check, 100 years is between 3 and 4 half-lives (3 * 28.8 = 86.4, 4 * 28.8 = 115.2). After 3 half-lives, we expect $10/2^3 = 1.25$g. After 4, we expect $10/2^4 = 0.625$g. Our answer of ~0.9g lies between these values, which makes sense.*

## Diagrams
An ASCII plot of the exponential decay law, showing the number of nuclei $N(t)$ as a function of time $t$.

```text
N(t)
^
|
N₀ +--------------------------------------------------
|  `.
|    `.
|      `.
|        `.
N₀/2 +----|---------`.-------------------------------
|         |           `.
|         |             `.
N₀/4 +----|---|-------------`.-------------------------
|         |   |               `.
|         |   |                 `.
N₀/8 +----|---|---|-----------------`.---------------
|         |   |   |                   `.
+---------|---|---|-------------------|-------------> t
          T½  2T½ 3T½                 4T½
```

## Memory technique — remember this forever
1.  **The Story:** Imagine a nightclub with a very strict bouncer, "Lambda" ($\lambda$). Lambda's rule is that at any moment, the *rate* at which people get kicked out ($\frac{dN}{dt}$) is proportional to the number of people currently inside ($N$). This gives the core idea: $\frac{dN}{dt} = -\lambda N$. The solution to this is the guest list over time: "The Number now ($N$) equals the Number originally ($N_0$) times what's left after 'e'xponentially kicking them out over time ($t$) with bouncer Lambda's strictness." This gives you $N = N_0 e^{-\lambda t}$.

2.  **Must Overlearn:**
    *   The decay law: $$N(t) = N_0 e^{-\lambda t}$$
    *   The half-life relation: $$T_{1/2} = \frac{\ln(2)}{\lambda}$$
    *   The definition of activity: $$A = \lambda N$$

3.  **Spaced Repetition Schedule:** Review these formulas and the "bouncer" story at these intervals from today: 1 day, 3 days, 7 days, 16 days, 35 days. Actively re-derive them from the differential equation on days 7 and 35.

4.  **First Principles Pathway:** If you forget everything, remember the bouncer: **The rate of decay is proportional to the amount present.**
    *   Write it as math: $\frac{dN}{dt} = -\lambda N$.
    *   Separate variables: $\frac{dN}{N} = -\lambda dt$.
    *   Integrate from $(t=0, N=N_0)$ to $(t, N(t))$: $\int_{N_0}^{N(t)} \frac{dN}{N} = \int_0^t -\lambda dt$.
    *   Solve: $\ln(N(t)) - \ln(N_0) = -\lambda t \implies \ln(N(t)/N_0) = -\lambda t \implies N(t) = N_0 e^{-\lambda t}$.
    *   From here, you can re-derive the half-life and activity formulas.

## Common mistakes
1.  **Confusing $\lambda$ and $T_{1/2}$:** Students often forget the $\ln(2)$ factor or invert the relationship. Remember: a *short* half-life means a *large* decay constant (very active decay), and vice-versa. They are inversely related.
2.  **Unit Inconsistency:** Using a decay constant in $s^{-1}$ with a time in years. The exponent $-\lambda t$ must be dimensionless. Always convert your units for $\lambda$ and $t$ to be compatible (e.g., both based on seconds, or both based on years) before plugging them into the formula.
3.  **Linear Thinking about Half-Life:** A common error is to think that if half the sample is gone in one half-life, all of it must be gone in two half-lives. This is incorrect. After two half-lives, half of the remaining half has decayed, leaving one-quarter ($1/2 \times 1/2$) of the original sample.

## Self-check
1.  A radioactive isotope has a half-life of 20 minutes. What fraction of the initial sample remains after one hour?
2.  A sample of ancient wood has a Carbon-14 activity of 0.20 Bq. A modern sample of the same size has an activity of 0.85 Bq. Given that the half-life of Carbon-14 is 5730 years, estimate the age of the ancient sample.
3.  A sample is composed of two independent radioactive isotopes, A and B. Isotope A has a half-life of 1 hour, and isotope B has a half-life of 2 hours. Initially, there are twice as many nuclei of A as there are of B. At what time $t$ will the number of nuclei of A be equal to the number of nuclei of B?