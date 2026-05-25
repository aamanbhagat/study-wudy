## What it is
Exponential growth and decay models describe quantities that change at a rate strictly proportional to their current size—the more you have, the faster it grows or shrinks. "Doubling time" is the fixed time interval required for a growing quantity to become twice as large, while "half-life" is the fixed time interval for a decaying quantity to reduce to exactly half its initial amount.

## Why it matters
In physics and aerospace, half-life dictates the radioactive decay of isotopes used in Radioisotope Thermoelectric Generators (RTGs), which provide baseline electrical power for deep-space probes like Voyager and Curiosity. In computer science, exponential growth models the explosion of computational complexity (like brute-forcing cryptography) and data scaling, while decay models the attenuation of signals passing through physical communication channels.

## When to study it
You must be fluent in:
1. The laws of exponents.
2. The fundamental properties of logarithms, specifically the natural logarithm ($\ln$).
3. Basic algebraic manipulation, particularly solving equations where the unknown variable is trapped in an exponent. 

If you cannot instantly solve $e^x = 5$ for $x$, return to the basic properties of logarithms before proceeding.

## How to study it (step by step)
1. Write down the continuous exponential equation $$N(t) = N_0 e^{kt}$$. Identify what each parameter ($N_0$, $k$, $t$) represents physically.
2. Derive the doubling time formula by setting $N(t) = 2N_0$ and solving algebraically for $t$. 
3. Derive the half-life formula by setting $N(t) = \frac{1}{2}N_0$ and solving for $t$. Observe the relationship between the growth/decay constant $k$ and the resulting time.
4. Solve a two-step word problem: First, use a given half-life or doubling time to find the constant $k$. Second, use that $k$ to find the amount remaining at a specific time $t$.
5. Prove that the continuous model $N(t) = N_0 e^{kt}$ is mathematically identical to the discrete multiplier form $N(t) = N_0 (2)^{t/T_d}$, where $T_d$ is the doubling time. 

## Key ideas, with intuition

**The Proportionality Principle**
The core driver of exponential models is that the rate of change is tied to the current amount. A population of 1,000 bacteria adds new members 10 times faster than a population of 100. This creates a snowball effect (growth) or a diminishing curve (decay).

**The Continuous Model**
The standard model is:
$$N(t) = N_0 e^{kt}$$
*   $N(t)$ is the amount at time $t$.
*   $N_0$ is the initial amount (at $t=0$).
*   $k$ is the continuous rate constant. If $k > 0$, it is growth. If $k < 0$, it is decay.
*   $e$ is Euler's number, the natural base for continuous processes.

**Time-Independence of Doubling/Halving**
It takes the exact same amount of time to go from 100 kg of a radioactive substance to 50 kg as it takes to go from 2 kg to 1 kg. The half-life (or doubling time) depends *only* on the rate constant $k$, not on the starting amount $N_0$. 

**The Base-Conversion Trick**
You can rewrite the continuous model into a discrete "step" model. If $T_h$ is the half-life, the model can be written as:
$$N(t) = N_0 \left(\frac{1}{2}\right)^{\frac{t}{T_h}}$$
This makes mental math trivial. If $t$ equals exactly 3 half-lives ($t = 3 T_h$), the exponent becomes 3, and the remaining amount is $N_0(1/2)^3 = N_0/8$.

## Worked example
**Problem:** Carbon-14 has a half-life of 5,730 years. An ancient bone fragment contains 15% of its original C-14. How old is the bone?

**Step 1: Find the decay constant, $k$.**
We know that at $t = 5730$, the amount is $0.5 N_0$.
$$0.5 N_0 = N_0 e^{k(5730)}$$
Divide by $N_0$:
$$0.5 = e^{5730k}$$
Take the natural logarithm of both sides:
$$\ln(0.5) = 5730k$$
$$k = \frac{\ln(0.5)}{5730} \approx -0.00012097$$

**Step 2: Use $k$ to find the specific time $t$.**
We want to find $t$ when $N(t) = 0.15 N_0$.
$$0.15 N_0 = N_0 e^{-0.00012097t}$$
$$0.15 = e^{-0.00012097t}$$
$$\ln(0.15) = -0.00012097t$$
$$t = \frac{\ln(0.15)}{-0.00012097} \approx \frac{-1.8971}{-0.00012097} \approx 15,682 \text{ years}$$

*Reflection:* This two-step process is universal. The half-life is a physical property used strictly to calibrate the model (finding $k$). Once the model is calibrated, you can query it for any arbitrary time or percentage.

## Diagrams

```text
EXPONENTIAL GROWTH (Doubling Time = T)       EXPONENTIAL DECAY (Half-Life = T)

  N(t)                                         N(t)
   ^                                            ^
 8 |               *                          1 | *
   |                                            |   
   |                                            |     
 4 |           *                              ½ |   *
   |                                            |       
   |                                            |         
 2 |       *                                  ¼ |       *
   |                                            |             
 1 |   *                                      ⅛ |           *
 --+---+---+---+---+--> t                       +---+---+---+---+--> t
   0   T  2T  3T                                0   T  2T  3T
```

## Memory technique — remember this forever
1. **The Hook:** Think of $\ln(2) \approx 0.693$ as the "Magic Constant of Halving and Doubling." In finance, this is simplified to the "Rule of 72" to estimate compound interest, but in rigorous math, $\ln(2)$ is the exact bridge between base-$e$ and base-$2$.
2. **The Formulas to Overlearn:**
   Doubling time ($T_d$): $$T_d = \frac{\ln 2}{k}$$
   Half-life ($T_h$): $$T_h = \frac{\ln 2}{|k|}$$ (or $\frac{-\ln 2}{k}$ since $k$ is negative for decay).
3. **Spaced-Repetition Schedule:** Review these derivations at 1 day, 3 days, 7 days, 16 days, and 35 days.
4. **First Principles Pathway:** If you forget the formula, *never guess*. Rebuild it. Write $2N_0 = N_0 e^{kt}$. Cancel $N_0$ to get $2 = e^{kt}$. Take the natural log of both sides: $\ln(2) = kt$. Divide by $k$. You now have the formula.

## Common mistakes
* **Forgetting the negative sign on $k$ for decay models.** If your substance is decaying, $k$ must be negative. If you calculate a positive time for a decay process but get a negative time, you dropped a minus sign.
* **Confusing the continuous rate $k$ with an annual percentage rate.** A 5% annual growth rate implies a multiplier of $1.05$ per year, which is $N(t) = N_0(1.05)^t$. This is *not* the same as $N_0 e^{0.05t}$, though they are very close for small rates. To find the true continuous $k$ for a 5% discrete rate, you must solve $e^k = 1.05$.
* **Plugging the half-life directly into $t$.** Students often read "half-life is 10 days" and write $N(t) = N_0 e^{k(10)}$ when trying to solve for an amount at day 20. The 10 days is *only* used to find $k$. 

## Self-check
1. A bacteria colony doubles in size every 4 hours. What is its continuous growth rate constant $k$?
2. A radioactive isotope decays to $\frac{1}{16}$ of its original amount in exactly 20 days. What is its half-life in days?
3. Prove algebraically that the time it takes for a growing exponential quantity to triple ($T_t$) is related to its doubling time ($T_d$) by the exact ratio: $$\frac{T_t}{T_d} = \frac{\ln 3}{\ln 2}$$