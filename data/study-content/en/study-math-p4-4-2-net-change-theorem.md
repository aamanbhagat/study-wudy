## 1. The one-sentence answer
**The Net Change Theorem states that the definite integral of a rate function recovers exactly the net change in the underlying quantity.**

Consider a quantity whose instantaneous rate of change is known at every moment. Adding those rates over an interval cannot be done by simple addition because the rate itself varies continuously. The definite integral performs precisely this continuous summation, and the result equals the difference between the quantity’s final and initial values. This holds whether the rate is positive or negative; negative contributions subtract automatically.

The theorem therefore converts a local description (a derivative) into a global accounting statement (how much the quantity actually moved). It applies to any differentiable function on a closed interval, turning differentiation and integration into inverse operations in a concrete, measurable way.

> [!NOTE]
> The integral does not count total variation; it counts signed net displacement. Regions above and below the axis cancel, which is why the theorem yields net change rather than accumulated absolute change.

## 2. Why this matters — concrete and current
SpaceX uses the theorem to compute the exact change in propellant mass remaining after a variable-thrust ascent profile; the integral of the measured mass-flow rate over the burn interval equals the difference between tank mass at ignition and at engine cutoff.

In semiconductor process control, Applied Materials integrates etch-rate data collected by in-situ sensors to determine the precise depth removed from a wafer layer; the net thickness change dictates whether the wafer meets the 3 nm specification.

Epidemiological models at the CDC integrate time-varying transmission rates obtained from wastewater sampling to obtain the net change in the effective reproduction number over a reporting window, directly informing whether an outbreak is expanding or contracting.

Battery-management systems in Tesla vehicles integrate instantaneous current (the rate of charge change) to compute the net change in state-of-charge; this value is compared against coulomb-counting drift to trigger recalibration of the remaining-range estimate.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| Derivative as rate       | Supplies the integrand; without it the integral has no meaning as net change |
| Definite integral        | Encodes continuous accumulation; the theorem equates this accumulation to F(b) − F(a) |
| Antiderivative           | Provides the explicit function whose values are subtracted at the endpoints |
| Continuity on [a,b]      | Guarantees the integral exists and the Fundamental Theorem applies without additional hypotheses |

## 4. Building the idea — from intuition to formalism

### Step 1 — Rate of change is a local description
A differentiable function F tells you, at each instant t, how fast F is changing. This information is strictly local.

Example: If F(t) is the position of a particle, F'(t) = 3 m/s at t = 2 s tells you the velocity exactly at that instant, nothing more.

Formally, the derivative is
$$
F'(t) = \lim_{h \to 0} \frac{F(t+h) - F(t)}{h}.
$$

> [!WARNING]
> Treating the derivative value itself as a total distance leads to immediate error; a constant 3 m/s does not imply 3 m travelled unless the time interval is 1 s.

### Step 2 — Net change over a finite interval
To obtain the actual change F(b) − F(a), the local rates must be combined across every instant between a and b.

Example: Suppose velocity is 3 m/s for the first second and 5 m/s for the next; the net displacement is not 3 + 5 but must account for the durations.

Formally we seek an expression for F(b) − F(a) in terms of F'.

### Step 3 — Partition the interval
Divide [a,b] into n subintervals of width Δt. On each subinterval the rate is approximately constant, so the change contributed by that piece is F'(t_i*) Δt.

Example: With two equal intervals the total change approximates F'(t_1*)Δt + F'(t_2*)Δt.

Formally the Riemann sum appears:
$$
\sum_{i=1}^n F'(t_i^*) \Delta t.
$$

> [!WARNING]
> Using left or right endpoints indiscriminately when the rate is rapidly changing produces an incorrect net value; the limit must be taken.

### Step 4 — Pass to the integral
As the partition norm approaches zero, the Riemann sum converges to the definite integral of the rate function.

Formally,
$$
\lim_{\|P\| \to 0} \sum F'(t_i^*) \Delta t = \int_a^b F'(t) \, dt.
$$

### Step 5 — Recover the endpoint difference
The integral of the derivative equals the telescoping difference of the original function.

Formally,
$$
\int_a^b F'(t) \, dt = F(b) - F(a).
$$

### Step 6 — State the theorem
The preceding limit argument is precisely the content of the Net Change Theorem, a direct consequence of the Fundamental Theorem of Calculus.

## 5. Worked examples — every step shown

**Example 1 — Constant velocity**  
*Given:* Velocity v(t) = 4 m/s on [0,3] s.  
*Find:* Net displacement.  

The rate function is already given.  
Apply the theorem directly:  
$$
\int_0^3 4 \, dt = 4t \Big|_0^3 = 12 - 0 = 12.
$$  
*Why:* The antiderivative of a constant is linear; evaluation subtracts the initial value.  

**Final answer**  
**12 m**

*Reflection:* The example is trivial yet shows that the integral simply multiplies rate by time when the rate never changes sign or magnitude.

**Example 2 — Linearly increasing rate**  
*Given:* Marginal cost C'(x) = 2x + 3 dollars per unit, x from 0 to 5.  
*Find:* Net change in total cost.  

Integrate the marginal rate:  
$$
\int_0^5 (2x + 3) \, dx = x^2 + 3x \Big|_0^5 = (25 + 15) - 0 = 40.
$$  
*Why:* Power rule and constant rule applied termwise; the lower limit vanishes.  

**Final answer**  
**$40**

*Reflection:* The quadratic antiderivative encodes the accumulated linear growth; the theorem converts the marginal description into total added cost.

**Example 3 — Sign change present**  
*Given:* Acceleration a(t) = t − 2 on [0,4]. Velocity at t = 0 is 5.  
*Find:* Net change in velocity.  

Integrate acceleration:  
$$
\int_0^4 (t-2) \, dt = \frac12 t^2 - 2t \Big|_0^4 = (8 - 8) - 0 = 0.
$$  
*Why:* The positive and negative areas cancel exactly, correctly reporting zero net velocity change.  

**Final answer**  
**0**

*Reflection:* The zero result is not an error; it demonstrates that the theorem reports net, not gross, change.

**Example 4 — Variable rate from data**  
*Given:* The derivative F'(x) = sin x on [0, π].  
*Find:* Net change F(π) − F(0).  

Direct integration:  
$$
\int_0^\pi \sin x \, dx = -\cos x \Big|_0^\pi = (-(-1)) - (-1) = 1 + 1 = 2.
$$  
*Why:* The cosine antiderivative evaluated at the endpoints yields the exact net accumulation.  

**Final answer**  
**2**

*Reflection:* Trigonometric rates appear in oscillatory systems; the theorem still recovers the net excursion regardless of oscillation.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                                      | How to avoid it                                      |
|-----------------------------------|-----------------------------------------------------|------------------------------------------------------|
| Integrating the quantity instead of its rate | Confusing F with F'                                 | Verify the integrand is explicitly labelled as a derivative or rate |
| Reporting total distance when net change is requested | Ignoring sign changes                               | Sketch the rate graph and count signed area only     |
| Forgetting to subtract the lower limit | Treating the antiderivative as the final answer     | Always write F(b) − F(a) explicitly                  |
| Using an antiderivative that does not match the given rate | Algebraic slip in finding the primitive             | Differentiate the proposed antiderivative as a check |
| Applying the theorem outside an interval where F' exists | Rate function has discontinuities                   | Confirm F is continuously differentiable on [a,b]    |
| Confusing units of the integral   | Rate × time yields quantity, yet students drop units | Track units through every step of the calculation    |
| Assuming the result is independent of path | Forgetting the theorem is strictly one-dimensional  | Restrict attention to functions of a single variable |

## 7. The textbook-precise statement
Let F be continuous on [a,b] and differentiable on (a,b) with F' integrable on [a,b]. Then
$$
\int_a^b F'(x) \, dx = F(b) - F(a).
$$
This is the Net Change Theorem (Stewart, *Calculus*, 9e, §5.4, Theorem 3).

## 8. Visual — diagram or schematic
```text
F'(t)
 ^
 |     positive area
 |    ++++++++
 |   +        +
 |  +          +
 | +            +   negative area
 |+--------------+---------> t
 |               +++++++
 |                    +++
 a                 c    b
```
Labelled axes: horizontal t from a to b, vertical F'(t). Shaded region above axis from a to c contributes positively; shaded region below axis from c to b contributes negatively. Net change equals area above minus area below.

## 9. The memory technique

**The hook**  
Picture a bank account whose balance changes at every instant according to deposits and withdrawals; the integral of the transaction rate over the month equals the single number “ending balance minus starting balance.”

**What to overlearn**  
1. ∫_a^b F'(t) dt = F(b) − F(a)  
2. The integral automatically respects sign; positive and negative rates cancel.  
3. Units: (rate) × (time) = quantity.

**Spaced-repetition schedule**  
Review at 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Re-derive by forming a Riemann sum of F'(t_i*)Δt, recognise the telescoping sum in the limit, and obtain F(b) − F(a).

## 10. What this unlocks
The Net Change Theorem supplies the conceptual bridge to the Fundamental Theorem of Calculus in both directions and to applications that treat any derivative as an integrand.  

- Average value of a function  
- Displacement versus distance travelled  
- Work and energy calculations  
- Future value of continuous income streams  
- Differential equations solved by direct integration  

## 11. Self-check — five questions, no answers
1. A particle moves with velocity v(t) = t^2 − 4t + 3 on [0,5]. Compute the net change in position and decide whether the particle ends to the right or left of its starting point.  
2. The rate of change of a population is P'(t) = 0.2P + 50. If the integral of P' from t = 0 to t = 10 equals 1200, what is the net population change?  
3. Explain why ∫_{-1}^1 |x| dx is not equal to the net change of any antiderivative of |x|.  
4. A marginal-revenue function crosses zero inside the interval of integration. Must the corresponding total-revenue function be lower at the right endpoint than at the left?  
5. Construct a counter-example in which F' exists everywhere yet the Net Change Theorem appears to fail if the continuity hypothesis is dropped; state precisely where the argument breaks.