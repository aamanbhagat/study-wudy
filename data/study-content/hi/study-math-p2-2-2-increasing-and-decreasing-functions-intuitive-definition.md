## 1. The one-sentence answer
**A function is called increasing on an interval if larger input values always produce larger or equal output values, and decreasing if larger inputs produce smaller or equal outputs.**

Iska matlab yeh hai ki aap function ke graph ko left se right ki taraf dekhte ho toh woh upar ja raha hai ya neeche aa raha hai. Agar x badhta hai aur f(x) bhi badhta hai (ya kam se kam kam nahi hota), toh function increasing hai. Yeh sirf values compare karke samjha ja sakta hai bina kisi derivative ke.

Aap ek table bana ke check kar sakte ho: do alag x values lo, unke f(x) compare karo. Agar har baar bada x bada f(x) deta hai, pattern clear ho jata hai. Yeh definition interval pe based hoti hai, poore domain pe nahi.

> [!NOTE]
> The core “aha” is that increasing or decreasing is a local behaviour on an interval you choose; the same function can increase on one part and decrease on another without contradiction.

## 2. Why this matters — concrete and current
In aerospace trajectory planning, NASA’s Artemis program uses increasing thrust profiles so that velocity grows monotonically with time, ensuring fuel calculations remain simple and safe.

Semiconductor firms such as TSMC model transistor current-voltage curves; identifying strictly increasing regions lets engineers pick bias points where small voltage changes give predictable current increases, improving amplifier linearity.

In machine-learning training loops at OpenAI, loss curves are monitored for long decreasing stretches; when the curve stops decreasing, training is halted or learning-rate schedules are adjusted.

Ecologists tracking tiger populations in the Sundarbans plot number of individuals against year; an increasing segment signals successful conservation while a decreasing segment triggers intervention protocols.

Fundamental physics experiments at CERN record particle counts versus energy; the increasing part of the spectrum reveals resonance peaks used to confirm new particle discoveries.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Function         | You must know that each x maps to exactly one f(x)        |
| Interval         | Increasing/decreasing is always stated on an interval     |
| Domain           | You need to know which x-values are allowed               |
| Ordered pairs    | Comparing f(a) and f(b) for a < b requires ordered inputs |

If any row is unfamiliar, pause and review that concept first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Compare two points
Pick any two numbers a and b inside your interval with a < b. Compute f(a) and f(b). If f(a) ≤ f(b) for every such pair, the function is increasing on that interval.  
Example: On [0, 3], let f(x) = x. Then 0 < 1 gives f(0) = 0 < 1 = f(1), and 1 < 2 gives 1 < 2. Pattern holds.  
Formal statement: ∀ a, b ∈ I with a < b we have f(a) ≤ f(b).  
> [!WARNING] If you forget “for every pair” and check only one pair, you may wrongly label a function that later dips.

### Step 2 — Allow equality (non-strict case)
The definition above uses ≤, so flat segments are still called increasing (sometimes “non-decreasing”).  
Example: f(x) = 2 on [1, 4] satisfies f(1) = 2 = f(2). It is increasing though never rises.  
Formal: The same ∀ statement with ≤.

### Step 3 — Strict inequality for strictly increasing
Replace ≤ by < to get strictly increasing: f(a) < f(b) whenever a < b.  
Example: f(x) = x³ on [-1, 1] is strictly increasing because cubes preserve order.  
Formal: ∀ a, b ∈ I, a < b ⇒ f(a) < f(b).

### Step 4 — Mirror the idea for decreasing
Swap the inequality direction: f(a) ≥ f(b) (non-strict) or f(a) > f(b) (strict) for a < b.  
Example: f(x) = −x on [0, 5] is strictly decreasing.

### Step 5 — Interval must be connected
The set I must be an interval (no gaps). On disconnected sets the property may hold on each piece separately but is not stated for the whole set.  
Formal: I is an interval contained in the domain of f.

### Step 6 — Textbook-grade statement
A function f is increasing on an interval I if for all a, b ∈ I with a < b we have f(a) ≤ f(b). It is strictly increasing if f(a) < f(b). The decreasing versions reverse the inequalities. This matches the definition in Sullivan, *Precalculus*, 11e, §3.3.

## 5. Worked examples — har step show karo

**Example 1 — Constant function check**  
*Given:* f(x) = 5 on [−2, 7].  
*Find:* Is f increasing, strictly increasing, decreasing, or none?  
Step 1: Choose a = −1, b = 3; a < b. f(−1) = 5, f(3) = 5 ⇒ 5 ≤ 5.  
Step 2: Any other pair yields equality.  
*Why:* Equality satisfies ≤, so non-strict increasing.  
**f is (non-strictly) increasing on [−2, 7].**

*Reflection:* Flat functions teach that “increasing” does not require visible rise; only the inequality direction matters.

**Example 2 — Linear with positive slope**  
*Given:* f(x) = 3x − 1 on [0, 4].  
*Find:* Behaviour.  
Step 1: a = 0, b = 2; f(0) = −1, f(2) = 5; −1 < 5.  
Step 2: a = 1, b = 3; f(1) = 2, f(3) = 8; 2 < 8.  
*Why:* Slope 3 > 0 forces strict growth.  
**f is strictly increasing on [0, 4].**

*Reflection:* Positive slope linear functions are the simplest strictly increasing case; generalises to any positive rate.

**Example 3 — Quadratic opening upwards**  
*Given:* f(x) = x² on [−3, 3].  
*Find:* Where increasing or decreasing.  
Step 1: On [−3, 0], a = −3, b = −1; f(−3) = 9 > 1 = f(−1) ⇒ decreasing.  
Step 2: On [0, 3], a = 0, b = 2; f(0) = 0 < 4 = f(2) ⇒ increasing.  
*Why:* Vertex at x = 0 splits behaviour.  
**f is decreasing on [−3, 0] and increasing on [0, 3].**

*Reflection:* One function can switch behaviour at a turning point; always specify the exact interval.

**Example 4 — Piecewise with jump**  
*Given:* f(x) = x if x < 1, f(x) = x + 2 if x ≥ 1, on [0, 3].  
*Find:* Behaviour.  
Step 1: On [0, 1), a = 0, b = 0.5; 0 < 0.5.  
Step 2: On [1, 3], a = 1, b = 2; 3 < 4.  
Step 3: Across 1, a = 0.9, b = 1.1; f(0.9) = 0.9, f(1.1) = 3.1; 0.9 < 3.1 still holds.  
*Why:* The jump is upward, preserving order.  
**f is strictly increasing on [0, 3].**

*Reflection:* Discontinuities do not automatically destroy monotonicity if the jump respects the inequality.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Checking only one pair            | Laziness or over-generalisation             | Always test at least three distinct pairs    |
| Forgetting interval endpoints     | Interval notation feels abstract            | Write I = [a, b] explicitly before testing   |
| Confusing ≤ with <                | Loose language in daily speech              | State “non-strict” or “strict” every time    |
| Applying to whole domain          | Assuming global behaviour                   | Restrict to one interval at a time           |
| Ignoring undefined points         | Domain gaps overlooked                      | First list domain, then choose I inside it   |
| Mixing x and f(x) when comparing  | Reading graph axes wrong                    | Always compare inputs first, then outputs    |
| Using decreasing for negative slope only | Over-reliance on linear intuition     | Verify with actual values even for curves    |

## 7. The textbook-precise statement
Let I be an interval contained in the domain of a function f : ℝ → ℝ. We say that f is increasing on I if  
f(x₁) ≤ f(x₂) whenever x₁, x₂ ∈ I and x₁ < x₂.  
f is strictly increasing on I if f(x₁) < f(x₂) under the same conditions.  
The function is decreasing on I if f(x₁) ≥ f(x₂) and strictly decreasing if f(x₁) > f(x₂).  
(Sullivan, *Precalculus*, 11e, §3.3)

## 8. Visual — diagram or schematic
```
x-axis: ----(-3)----(-1)----(0)----(1)----(3)---->
f(x)=x² :   9       1       0       1       9
             \       \     /       /       /
              \       \   /       /       /
               decreasing   increasing
```
Labelled points show f(−3) > f(−1) while f(0) < f(1), illustrating the switch at the vertex.

## 9. The memory technique
**The hook** — Picture a mountain climber: when the trail goes “up the mountain” the height function is increasing; when descending it is decreasing. The trail never goes backward in time (x keeps growing).

**What to overlearn** —  
1. a < b ⇒ f(a) ≤ f(b) (increasing)  
2. a < b ⇒ f(a) ≥ f(b) (decreasing)  
3. The interval must be connected.

**Spaced-repetition schedule** — Review the two inequalities after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback** — If you forget the symbol, pick any two concrete numbers a < b inside the interval, compute both outputs, and simply ask “is the second output bigger, smaller, or equal?” The answer tells you the direction.

## 10. What this unlocks
Once you can recognise increasing and decreasing segments you can locate local maxima and minima, sketch graphs without plotting every point, and prepare for the mean-value theorem and derivative tests.

- Locating extrema by testing sign changes of monotonicity  
- Proving inequalities via monotonicity arguments  
- Analysing optimisation problems in pre-calculus and calculus  
- Understanding monotonic sequences before limits

## 11. Self-check — five questions, no answers
1. On [−2, 2], is f(x) = −x³ strictly decreasing? Verify with three pairs.  
2. A function satisfies f(1) = 4, f(2) = 4, f(3) = 5. Can it be strictly increasing on [1, 3]?  
3. Give an interval where f(x) = |x| is increasing and another where it is decreasing.  
4. Why does the constant function 7 count as both non-strictly increasing and non-strictly decreasing on any interval?  
5. Construct a piecewise function that is decreasing on (−∞, 0] and strictly increasing on [0, ∞) yet has a jump discontinuity at x = 0.