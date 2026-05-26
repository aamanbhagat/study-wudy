## 1. The one-sentence answer
**Radioactive decay is a random process whose ensemble behaviour produces the exact exponential N = N₀e^(-λt).**

Aap jab ek radioactive nucleus ko dekhte hain, uske decay ka koi fixed time nahi hota; har nucleus ka apna probability hota hai. Lekin jab aap 10²³ nuclei ek saath count karte hain, toh unka collective behaviour ek clean differential equation deta hai: dN/dt = –λN. Iska solution hi N = N₀e^(-λt) hai. Is law se aap turant half-life (T½ = ln2/λ) aur activity (A = λN) nikaal sakte hain.

> [!NOTE]
> Exponential decay ka “aha” moment yeh hai ki decay rate hamesha current N ke proportional rehta hai — jitna kam bachta hai, utna hi kam aage decay hota hai, isliye curve kabhi zero nahi touch karti.

## 2. Why this matters — concrete and current
NASA’s Perseverance rover uses a radioisotope thermoelectric generator whose plutonium-238 fuel follows exactly this law; mission planners calculate remaining power after 10+ years using N = N₀e^(-λt) with λ known to 0.01 %.

In semiconductor fabs, ion-implantation tools monitor phosphorus-32 activity with the same decay law to keep dopant delivery stable; a 1 % error in half-life calculation shifts threshold voltage by 3 mV.

Space radiation shielding design for Artemis missions relies on activity calculations of secondary neutrons produced by cosmic-ray spallation; the exponential attenuation inside regolith is modelled with the identical differential equation.

Carbon-dating laboratories (e.g., Beta Analytic) convert measured ¹⁴C activity back to age via t = (1/λ) ln(N₀/N); the formula is used daily on archaeological samples whose ages range from 300 to 50 000 years.

Medical cyclotron facilities schedule fluorine-18 production runs by solving for the exact irradiation time that maximises activity A = λN just before shipment to PET scanners.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Exponential function | The solution of the decay differential equation is exactly e^(-λt) |
| First-order ODE      | dN/dt = –λN is the simplest linear differential equation  |
| Natural logarithm    | Half-life extraction requires solving ln(N/N₀) = –λt      |
| Statistical ensemble | Decay is probabilistic; law emerges only for large N      |

Agar aap inme se kisi ek ko nahin samajhte, pause karke pehle usko revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Probability of survival
Har nucleus ke paas ek constant probability λ dt hai ki woh dt interval mein decay kar jaaye. Iska matlab survival probability 1–λdt hai.  
Example: agar λ = 0.01 s⁻¹ aur dt = 1 s, toh ek nucleus ke survive karne ki chance 0.99 hai.  
Formal statement: P(survive dt) = 1 – λ dt.  
> [!WARNING] Agar aap λ ko time-dependent maan lete hain, poora differential equation change ho jaata hai aur exponential solution toot jaata hai.

### Step 2 — From single nucleus to ensemble
N nuclei ke liye expected number jo survive karega: N(t+dt) = N(t)(1–λ dt).  
Example: 10 000 nuclei, λ dt = 0.001 → 10 nuclei decay, 9990 bachte hain.  
Formal: N(t+dt) – N(t) = –λ N(t) dt.

### Step 3 — Continuous limit
dt → 0 karne par differential equation milta hai: dN/dt = –λN.  
Example: slope hamesha –λ times current N ke barabar.  
Formal: $$\frac{dN}{dt}=-\lambda N.$$

### Step 4 — Separation of variables
N ko ek taraf, t ko dusri taraf: dN/N = –λ dt.  
Integrate both sides from N₀ to N and 0 to t.  
Formal: $$\int_{N_0}^{N}\frac{dN'}{N'}=-\lambda\int_0^t dt'.$$

### Step 5 — Integration yields the law
ln(N/N₀) = –λt → N = N₀e^(-λt).  
Formal: $$N(t)=N_0e^{-\lambda t}.$$

### Step 6 — Half-life definition
N = N₀/2 daalne par T½ = ln2/λ milta hai.  
Formal: $$T_{1/2}=\frac{\ln2}{\lambda}.$$

### Step 7 — Activity
Decay rate |dN/dt| ko activity A kehte hain: A = λN = λN₀e^(-λt).  
Formal: $$A(t)=\lambda N(t).$$

### Step 8 — Mean lifetime
Average life τ = 1/λ = T½/ln2.  
Formal: $$\tau=\frac{1}{\lambda}.$$

## 5. Worked examples — har step show karo

**Example 1 — Basic half-life calculation**  
*Given:* ¹³¹I, λ = 0.0862 day⁻¹.  
*Find:* T½.  
T½ = ln2 / λ = 0.693147 / 0.0862 ≈ 8.04 days.  
*Why:* Direct substitution of definition.  
**8.04 days**

*Reflection:* Yeh example sirf definition check karti hai; koi integration nahin chahiye.

**Example 2 — Remaining nuclei after time t**  
*Given:* N₀ = 2.4 × 10²⁰ nuclei of ⁶⁰Co, T½ = 5.27 y.  
*Find:* N after 10.54 y.  
λ = ln2 / 5.27 ≈ 0.1315 y⁻¹.  
N = N₀e^(-λt) = 2.4 × 10²⁰ × e^(-0.1315 × 10.54) = 2.4 × 10²⁰ × e^(-1.386) = 2.4 × 10²⁰ × 0.25.  
**6.0 × 10¹⁹ nuclei**

*Reflection:* Two half-lives exactly halve the sample twice; exponential ka power rule yahin dikhta hai.

**Example 3 — Activity from measured count rate**  
*Given:* 1 µg of ²²Na (λ = 3.62 × 10⁻² day⁻¹).  
*Find:* Initial activity in Bq.  
Number of atoms N₀ = (10⁻⁶ / 22) × 6.022 × 10²³ = 2.737 × 10¹⁶.  
A₀ = λN₀ = 3.62 × 10⁻² × 2.737 × 10¹⁶ ≈ 9.91 × 10¹⁴ Bq.  
**9.91 × 10¹⁴ Bq**

*Reflection:* Mass ko atoms mein convert karna zaroori hai; activity directly λN deta hai.

**Example 4 — Time when activity drops to given value**  
*Given:* A₀ = 5 MBq, A = 0.8 MBq, T½ = 2.45 h.  
*Find:* elapsed time t.  
λ = ln2 / 2.45 ≈ 0.2829 h⁻¹.  
t = (1/λ) ln(A₀/A) = (1/0.2829) ln(5/0.8) ≈ 5.82 h.  
**5.82 h**

*Reflection:* Activity ratio directly N ratio ke barabar hoti hai, isliye same formula use hota hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using log₁₀ instead of ln         | Calculator default base mistake             | Always write ln or logₑ explicitly           |
| Forgetting N must be large        | Thinking law works for 5–10 nuclei          | Check N > 10¹⁰ before applying continuous law|
| Confusing T½ with mean life τ     | Both have dimension of time                 | Remember τ = T½ / ln2 ≈ 1.443 T½             |
| Treating λ as variable            | Misreading “rate changes with time”         | λ is constant by definition for given isotope|
| Activity unit mix-up (Ci vs Bq)   | Old literature uses curie                   | Convert 1 Ci = 3.7 × 10¹⁰ Bq once and store  |
| Negative time in ln calculation   | ln(A/A₀) jab A > A₀ daal dete hain          | Always verify A < A₀ before taking ln        |
| Ignoring branching ratio          | Multiple decay modes exist                  | Use partial λᵢ = branching fraction × λtotal |

## 7. The textbook-precise statement
Krane, *Introductory Nuclear Physics*, 2e, §6.2 states: “If the decay constant λ is independent of time and of the past history of the nucleus, the number of radioactive nuclei remaining at time t is N(t) = N₀ exp(–λt), where N₀ is the number present at t = 0. The activity is defined as A(t) ≡ –dN/dt = λN(t). The half-life T½ satisfies T½ = (ln 2)/λ and the mean lifetime τ = 1/λ.”

## 8. Visual — diagram or schematic
```
N
^
|        N0
|       /  \
|      /    \
|     /      \
|    /        \______ N0/2 ........ half-life
|   /                 \
|  /                   \
| /                     \
|/_______________________> t
     T½      2T½
```
Curve starts at N₀, falls steeply at first, then flattens; vertical line at T½ shows exactly half height; asymptote is t-axis.

## 9. The memory technique
1. **The hook** — Imagine a stadium full of popcorn kernels; every second each kernel has a fixed chance to pop. The number still unpopped follows exactly N₀e^(-λt).
2. **What to overlearn** — N = N₀e^(-λt), T½ = ln2/λ, A = λN.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Start from dN/dt = –λN, separate variables, integrate both sides, exponentiate.

## 10. What this unlocks
Aap ab radioactive dating, nuclear reactor fuel burn-up, PET isotope scheduling aur cosmic-ray exposure calculations kar sakte hain.  
- Next: Bateman equations for decay chains  
- Secular equilibrium in parent–daughter systems  
- Neutron activation cross-section calculations  
- Radiation transport Monte-Carlo codes (Geant4, MCNP)

## 11. Self-check — five questions, no answers
1. 10¹² nuclei ka sample 3 half-lives baad kitna bachta hai?  
2. λ = 0.05 h⁻¹ wale isotope ki activity 20 % hone mein kitna time lagega?  
3. Mean life aur half-life mein exact numerical factor kya hai?  
4. Agar λ time ke saath badhe toh N(t) kis form ka hoga?  
5. Ek count-rate meter 1200 cps dikha raha hai; background 200 cps hai. Agar T½ = 15 min, toh 45 min baad kitna count rate expect karoge?