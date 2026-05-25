## What it is
Reliability is the probability that a system performs its required function under specified conditions for a stated period of time. The exponential failure model assumes a constant failure rate, meaning the system does not "age" or wear out; failures occur purely randomly. Under this model, Mean Time To Failure (MTTF) is the expected lifespan of a non-repairable system (like a satellite), while Mean Time Between Failures (MTBF) applies to repairable systems (like ground support equipment). 

## Why it matters
In aerospace, you cannot send a mechanic to a satellite in Geostationary Earth Orbit (GEO). Systems engineering requires proving to stakeholders (and insurers) that a multi-million dollar spacecraft will survive its 15-year design life. You will use these concepts to size redundant systems, calculate mission success probabilities, and determine mass/power budgets for backup hardware. In machine learning and physics, this exact mathematical framework governs radioactive decay and Markov chain transition times.

## When to study it
You must already understand:
1. **Basic Probability:** Probability Density Functions (PDFs), Cumulative Distribution Functions (CDFs), and Expected Value.
2. **Calculus:** Integration by parts and improper integrals of exponential functions.
If you do not know how to evaluate $\int_{0}^{\infty} t e^{-\lambda t} dt$, stop and review integral calculus first.

## How to study it (step by step)
1. **Define the Reliability Function:** Understand that reliability $R(t)$ is the complement of the failure CDF: $R(t) = 1 - F(t)$.
2. **Understand the Hazard Rate:** Define the failure rate $\lambda(t)$. Recognize that the exponential model enforces $\lambda(t) = \lambda$ (a constant).
3. **Derive the Reliability Equation:** Solve the differential equation $dR/dt = -\lambda R$ to get $R(t) = e^{-\lambda t}$.
4. **Derive MTTF:** Use the expected value definition $E[T] = \int_0^\infty t f(t) dt$ to prove that MTTF $= 1/\lambda$.
5. **Analyze Redundancy:** Calculate system reliability for components in series (multiply $R_i$) and parallel (multiply failure probabilities $1 - R_i$).

## Key ideas, with intuition
**1. The Bathtub Curve and the Constant Failure Rate**
Component failure rates $\lambda(t)$ typically follow a "bathtub" shape: high at the start (infant mortality/manufacturing defects), flat in the middle (random cosmic ray hits, micrometeoroids), and high at the end (wear-out, propellant depletion). The exponential model *only* applies to the flat bottom of the tub.

**2. The Memoryless Property**
The exponential model $R(t) = e^{-\lambda t}$ is "memoryless". A star tracker that has survived 5 years in orbit has the exact same probability of failing in the next hour as a brand-new star tracker. It does not "age."

**3. The Mathematics of Survival**
Let $f(t)$ be the probability density function of failure time. The probability of failing before time $t$ is the CDF, $F(t) = \int_0^t f(\tau) d\tau$. 
Reliability is the probability of surviving past time $t$:
$$ R(t) = 1 - F(t) = \int_t^\infty f(\tau) d\tau $$
For a constant failure rate $\lambda$, the PDF is $f(t) = \lambda e^{-\lambda t}$. Therefore:
$$ R(t) = \int_t^\infty \lambda e^{-\lambda \tau} d\tau = e^{-\lambda t} $$

**4. MTTF is NOT the Median Life**
MTTF is the expected value of the failure time.
$$ \text{MTTF} = E[T] = \int_0^\infty t f(t) dt = \int_0^\infty t (\lambda e^{-\lambda t}) dt = \frac{1}{\lambda} $$
Crucial intuition: What is the probability a component survives to its MTTF? 
Plug $t = 1/\lambda$ into $R(t)$:
$$ R(\text{MTTF}) = e^{-\lambda (1/\lambda)} = e^{-1} \approx 0.368 $$
A component only has a 36.8% chance of surviving to its MTTF. 

## Worked example
**Problem:** A spacecraft's reaction wheel has a constant failure rate of $\lambda = 2 \times 10^{-5}$ failures per hour. Calculate its MTTF in years. Then, calculate the probability it survives a 3-year mission.

**Step 1: Calculate MTTF.**
$$ \text{MTTF} = \frac{1}{\lambda} = \frac{1}{2 \times 10^{-5} \text{ hr}^{-1}} = 50,000 \text{ hours} $$
Convert to years (assuming 8760 hours/year):
$$ \text{MTTF} = \frac{50,000}{8760} \approx 5.71 \text{ years} $$

**Step 2: Calculate mission time in hours.**
$$ t = 3 \text{ years} \times 8760 \text{ hours/year} = 26,280 \text{ hours} $$

**Step 3: Calculate Reliability $R(t)$.**
$$ R(t) = e^{-\lambda t} = \exp(-(2 \times 10^{-5})(26,280)) $$
$$ R(t) = \exp(-0.5256) \approx 0.591 $$

**Reflection:** The steps worked because we kept our units strictly consistent (hours for both $\lambda$ and $t$). The result makes intuitive sense: the mission time (3 years) is roughly half the MTTF (5.71 years), so the reliability is higher than $1/e$ (36.8%), landing at ~59.1%.

## Diagrams

```text
THE BATHTUB CURVE (Failure rate vs Time)
Failure
Rate 
λ(t) | *                                     *
     |  *                                   *   <-- Wear-out
     |   *                                 *        (End of life)
     |    *                               *
     |     *                             *
     |      *****************************   <-- Exponential Model applies here
     | Infant                           
     | Mortality                        
     +------------------------------------------> Time (t)

EXPONENTIAL RELIABILITY DECAY (R(t) vs Time)
R(t) |
 1.0 |*
     | *
     |  *
     |   *
     |    **
 0.5 |      **
     |        ***
0.368+ - - - - - ****     <-- At t = MTTF, R(t) = 1/e ≈ 36.8%
     |               *****
     |                    ********
     +--------------------|---------------------> Time (t)
                         MTTF
                        (1/λ)
```

## Memory technique — remember this forever
1. **The Hook:** Think of "Radioactive Spacecraft." Spacecraft components die randomly just like radioactive atoms. The half-life equation $N(t) = N_0 e^{-\lambda t}$ is exactly the reliability equation $R(t) = e^{-\lambda t}$.
2. **Must Overlearn:**
   * $R(t) = e^{-\lambda t}$
   * $\text{MTTF} = \frac{1}{\lambda}$
   * $R(\text{MTTF}) = \frac{1}{e} \approx 36.8\%$
3. **Spaced-repetition schedule:** Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First principles pathway:** If you forget $R(t)$, remember that the rate of change of surviving components is proportional to the number of surviving components: $\frac{dR}{dt} = -\lambda R$. Separate variables ($\frac{dR}{R} = -\lambda dt$) and integrate to get $\ln(R) = -\lambda t \implies R = e^{-\lambda t}$.

## Common mistakes
* **Assuming MTTF means a 50% chance of survival.** Students conflate Mean (Expected Value) with Median. As shown above, survival probability at MTTF is ~36.8%. 
* **Unit mismatch.** Mixing $\lambda$ in failures/hour with $t$ in years. The product $\lambda t$ in the exponent must be dimensionless.
* **Adding reliabilities.** If you put two components in series, you do not add their reliabilities; you *multiply* them ($R_{sys} = R_1 \times R_2$). Because $R < 1$, a series system is always *less* reliable than its weakest link.

## Self-check
1. A battery has an MTTF of 100,000 hours. What is its constant failure rate $\lambda$ in failures per hour?
2. A mission requires a subsystem to have a reliability of 0.95 at the end of a 10,000-hour mission. What is the maximum allowable failure rate $\lambda$?
3. Two identical computers operate in parallel (the system succeeds if at least one survives). Each has a failure rate $\lambda$. Derive the system reliability $R_{sys}(t)$ as a function of $\lambda$ and $t$. (Hint: calculate the probability that *both* fail, then subtract from 1).