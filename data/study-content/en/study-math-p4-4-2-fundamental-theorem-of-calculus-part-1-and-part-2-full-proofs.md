## 1. The one-sentence answer
**The Fundamental Theorem of Calculus states that differentiation and integration are inverse operations, linked by the two parts that turn an accumulation function into its instantaneous rate and convert any antiderivative into a definite integral.**

The theorem splits into two complementary statements. Part 1 shows that if you build a function by integrating a continuous integrand from a fixed lower limit up to a variable upper limit, the resulting function is differentiable and its derivative recovers the original integrand. Part 2 shows that once you possess any single antiderivative, the definite integral between two limits equals the difference of that antiderivative evaluated at the endpoints.

Taken together, these statements convert the hard problem of computing areas into the easier problem of finding antiderivatives, and they justify why every continuous function possesses an antiderivative even when an elementary formula is unavailable.

> [!NOTE]
> The single deepest insight is that the definite integral from a to x is itself a function of x whose slope at every point equals the height of the original curve; this turns a global geometric quantity into a local analytic one.

## 2. Why this matters — concrete and current
SpaceX uses numerical quadrature of thrust-acceleration profiles during Falcon 9 ascent; the position update is exactly the integral whose derivative is recovered by Part 1, allowing real-time guidance corrections that keep the vehicle inside a 50 m corridor at stage separation.

In semiconductor process simulation, Synopsys TCAD tools solve the heat equation by integrating thermal flux; Part 2 supplies the exact boundary-to-boundary temperature drop once the antiderivative of conductivity is known, cutting simulation time by orders of magnitude compared with finite-difference stepping alone.

Google’s differential-privacy libraries accumulate noise via the Gaussian mechanism; the cumulative distribution function is the integral whose derivative is the density, and Part 1 guarantees that the privacy-loss random variable can be differentiated for tight composition bounds in machine-learning training pipelines.

Radio astronomers at the Event Horizon Telescope reconstruct images by integrating visibility data along baselines; Part 2 converts the measured Fourier components back into sky brightness via the antiderivative evaluated at the maximum baseline length, enabling the first direct image of a black-hole shadow.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Limit definition of derivative | Part 1 proof reduces to showing that a certain difference quotient converges to f(x) |
| Definition of Riemann integral | Both parts rest on the existence of upper and lower sums for continuous functions |
| Mean Value Theorem for derivatives | Used inside the proof of Part 1 to locate an intermediate point where the slope matches the average rate |
| Continuity on a closed interval | Guarantees uniform continuity, which controls the error term when the upper limit moves by h |

## 4. Building the idea — from intuition to formalism

### Step 1 — Accumulation defines a new function
Fix a continuous function f on [a,b]. Define F(x) as the net signed area between a and x. This F is well-defined for every x in [a,b] because continuity guarantees Riemann integrability.

Example: let f(t)=t on [0,1]. Then F(x)=∫_0^x t dt = x²/2 for any x in [0,1].

$$
F(x)=\int_a^x f(t)\,dt
$$

> [!WARNING]
> Treating the upper limit as constant would make F independent of x and destroy the possibility of differentiation.

### Step 2 — Increment of F over a small interval
Consider F(x+h)−F(x) for small h>0. By additivity of the integral this difference equals the integral from x to x+h.

Example: continuing the linear case, F(x+h)−F(x)=(x+h)²/2−x
²/2=xh+h²/2, which is exactly the area of the thin rectangle plus triangle.

$$
F(x+h)-F(x)=\int_x^{x+h}f(t)\,dt
$$

> [!WARNING]
> Forgetting that the integral is signed allows the same algebra to be misapplied when h<0.

### Step 3 — Squeeze the increment by uniform continuity
Because f is continuous on a compact interval it is uniformly continuous, so f(t) lies between m_h and M_h where both bounds approach f(x) as h→0.

Example: for f(t)=t the minimum on [x,x+h] is x and the maximum is x+h, so the integral lies between xh and (x+h)h.

$$
m_h\cdot h\leq F(x+h)-F(x)\leq M_h\cdot h
$$

> [!WARNING]
> Using ordinary continuity instead of uniform continuity fails to give a uniform δ for all x simultaneously.

### Step 4 — Form the difference quotient
Divide the inequality by h>0 and take the limit as h→0. The squeeze theorem forces the quotient to f(x).

Example: x ≤ [F(x+h)−F(x)]/h ≤ x+h, both ends →x.

$$
\lim_{h\to0}\frac{F(x+h)-F(x)}{h}=f(x)
$$

> [!WARNING]
> Neglecting the case h<0 leaves the left-hand derivative unproved.

### Step 5 — Conclusion of Part 1 and transition to Part 2
F is therefore differentiable with F′=f. Any other antiderivative G satisfies G′=f as well, so (G−F)′=0 and G−F is constant.

Example: both x²/2 and x
²/2+7 have derivative x.

$$
\int_a^b f(x)\,dx=G(b)-G(a)
$$

> [!WARNING]
> Assuming every antiderivative is elementary leads to the false belief that Part 2 is useless when no closed form exists.

## 5. Worked examples — every step shown

**Example 1 — Linear integrand**
*Given:* f(x)=3x+1 on [0,2].  
*Find:* F′(x) where F(x)=∫_0^x f(t) dt.  

By definition,  
F(x+h)−F(x)=∫_x^{x+h}(3t+1)dt=[(3/2)t²+t]_x^{x+h}.  
Why: antiderivative of linear is quadratic.  
Difference quotient equals 3x+1 + (3h/2).  
Why: algebra cancels the x terms.  
Limit h→0 yields 3x+1.  
Why: the extra term vanishes.  

**F′(x)=3x+1**

*Reflection:* The explicit antiderivative made verification immediate; the same algebra works without it once uniform continuity is invoked.

**Example 2 — Trigonometric integrand**
*Given:* f(x)=sin x on [0,π/2].  
*Find:* ∫_0^{π/2} sin x dx.  

Let G(x)=−cos x. Then G′=sin x.  
Why: standard derivative.  
By Part 2, integral equals G(π/2)−G(0)=−(0)−(−1)=1.  
Why: endpoints only.  

**1**

*Reflection:* No Riemann sums needed once an antiderivative is recognized.

**Example 3 — Absolute-value integrand**
*Given:* f(x)=|x| on [−1,2].  
*Find:* F(1) where F(x)=∫_{−1}^x |t| dt.  

Split at 0: F(1)=∫_{−1}^0 (−t)dt + ∫_0^1 t dt.  
Why: definition of absolute value.  
Each piece integrates to 1/2, total 1.  
Why: elementary antiderivatives.  

**F(1)=1**

*Reflection:* Discontinuity of f′ at 0 does not affect Part 1 because f itself remains continuous.

**Example 4 — Non-elementary antiderivative**
*Given:* f(x)=e^{−x²} on [0,1].  
*Find:* numerical value of ∫_0^1 f via Part 2.  

No elementary antiderivative exists.  
Define F(x)=∫_0^x e^{−t
²}dt.  
Why: Part 1 guarantees F′=f.  
Evaluate F(1) by series or quadrature to 0.746824….  
Why: Part 2 still holds formally.  

**≈0.746824**

*Reflection:* The theorem separates existence from computability.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Treating variable upper limit as constant | Notation ∫f(x)dx looks the same            | Always write ∫_a^x f(t)dt when defining F            |
| Forgetting left derivative        | h>0 is easier to visualize                  | Explicitly repeat argument with −h                   |
| Applying Part 2 to discontinuous f | Antiderivative may fail to exist            | Verify continuity of f first                         |
| Confusing F(b)−F(a) with area when F is decreasing | Sign is lost                                | Keep the order F(upper)−F(lower) literally           |
| Assuming every antiderivative is C¹ | Part 1 only needs continuity of f           | Remember F′=f implies F is C¹ only if f is C⁰        |
| Interchanging limit and integral without justification | Dominated convergence not yet available     | Use uniform continuity on compact interval           |
| Evaluating definite integral at variable endpoint | Notation abuse                              | Distinguish dummy variable from limit variable       |

## 7. The textbook-precise statement
Let f be continuous on the closed interval [a,b]. Define  
$$
F(x)=\int_a^x f(t)\,dt,\qquad x\in[a,b].
$$  
Then F is differentiable on (a,b) and F′(x)=f(x). Moreover, if G is any antiderivative of f on [a,b], then  
$$
\int_a^b f(x)\,dx=G(b)-G(a).
$$  
(Stewart, *Calculus*, 9e, §5.3, Theorem 3 and Theorem 4.)

## 8. Visual — diagram or schematic
```text
y
│          f(x)
│         ╱
│        ╱
│   F(x)→●─────────────
│      ╱   ↑
│     ╱    h
│    ╱
a────●────────────────────── x
     x          x+h
```
Horizontal axis labelled with fixed a, variable x and x+h. Vertical segment at x shows height f(x). Shaded region between x and x+h represents the increment F(x+h)−F(x). Slope of secant on F equals average height of f over that interval; limit recovers instantaneous height f(x).

## 9. The memory technique
1. **The hook** — Picture a growing stack of paper whose height at any moment equals the width of the newest sheet; the rate at which the stack grows is exactly the width of the sheet being added (Part 1), and the final height is the difference of two readings on a ruler (Part 2).  
2. **What to overlearn** — F(x)=∫_a^x f, F′=f; ∫_a^b f=G(b)−G(a) for any G′=f.  
3. **Spaced-repetition schedule** — Review proofs at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive the difference quotient, apply uniform continuity, then invoke the constant-difference argument for Part 2.

## 10. What this unlocks
The theorem supplies the rigorous justification for every subsequent integration technique and for the entire theory of differential equations.  
- Substitution and integration by parts become change-of-variable formulas inside the integral sign.  
- Improper integrals are obtained by taking limits of the Part-2 expression.  
- The calculus of variations and optimal-control theory rest on the same accumulation-function derivative.  
- Lebesgue integration extends the same statements once continuity is relaxed to measurability.

## 11. Self-check — five questions, no answers
1. Let f(x)=|x| on [−2,3]. Compute F′(1) where F(x)=∫_{−2}^x f(t)dt and verify it equals f(1).  
2. Suppose G′(x)=x sin x and G(0)=0. Evaluate ∫_0^π/2 x sin x dx without performing integration by parts.  
3. A function f is continuous on [0,1] but not differentiable at 1/2. Does Part 1 still guarantee that F(x)=∫_0^x f is differentiable at every point of (0,1)?  
4. Identify the hidden assumption that would make the following argument false: “F(x)=∫_0^x 1/√t dt has F′(x)=1/√x everywhere on (0,1).”  
5. Construct a concrete continuous function f on [0,1] whose antiderivative F cannot be expressed in elementary functions yet still satisfies F′=f; state the numerical value of F(1) to three decimals using any valid method.