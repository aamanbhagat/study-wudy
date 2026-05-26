## 1. The one-sentence answer
**The Net Change Theorem says that \(\int_a^b F'(x)\,dx = F(b)-F(a)\), so the definite integral of a derivative recovers the net change in the original function.**

Aap sochiye koi quantity jaise position, temperature ya charge time ke saath badal rahi hai. Uska instantaneous rate of change ek derivative function deta hai. Jab aap us rate ko ek interval par integrate karte hain, toh aapko sirf final minus initial value milti hai — beech ke saare up-down cancel ho jaate hain. Iska matlab yeh hai ki antiderivative lene ki zaroorat nahi padti agar aapko sirf net difference chahiye.

Yeh theorem basically Fundamental Theorem of Calculus ka direct application hai rates aur quantities ke beech. Agar aap velocity integrate karte hain toh displacement milta hai, agar aap power integrate karte hain toh energy change milta hai. Kabhi-kabhi students sochte hain ki yeh sirf ek aur formula hai, lekin asal mein yeh batata hai ki derivative aur integral ek dusre ke inverse hain jab net change ki baat aati hai.

> [!NOTE]
> The single “aha” moment is this: integration does not give total distance travelled or total variation; it automatically subtracts the backward parts and returns only the signed net change.

## 2. Why this matters — concrete and current
In orbital mechanics, SpaceX uses the net change theorem on thrust curves to compute exact \(\Delta v\) between two burn times without integrating the full trajectory at every simulation step.  

Semiconductor fabs apply it to temperature ramp rates inside rapid thermal processors; the integral of \(dT/dt\) directly yields the net temperature change that decides dopant activation profiles.  

In reinforcement learning, policy-gradient methods accumulate the integral of advantage functions over a trajectory; the net change in expected return is exactly what the theorem isolates, allowing credit assignment without storing every intermediate state value.  

High-energy physics experiments at CERN integrate instantaneous luminosity over a fill; the net integrated luminosity (inverse femtobarns) tells them how many collisions occurred, again using only the endpoints of the luminosity function.  

Battery-management systems in electric vehicles integrate current (rate of charge) over time; the net change in state-of-charge is obtained in real time without solving the full electrochemical PDE at every millisecond.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Derivative           | Supplies the rate function whose integral yields net change |
| Definite integral    | Encodes accumulation; its value equals the net change     |
| Antiderivative       | Exists by the theorem; its evaluation at endpoints gives the answer |
| Continuity on closed interval | Guarantees the integral exists and FTC applies         |

Agar aapko derivative ya definite integral ki definition clear nahi hai, toh pehle woh padh lijiye.

## 4. Building the idea — from intuition to formalism

### Step 1 — From total change to net change
Aap dekhiye ki kisi function \(F\) ka total variation interval mein upar-neeche ho sakta hai, lekin hum sirf \(F(b)-F(a)\) chahte hain.  
Example: position \(F(t)=t^2\) par \(t=0\) se \(t=2\) tak net change \(4-0=4\) hai, chahe velocity negative ho.  
Formal statement: net change = \(F(b)-F(a)\).  
> [!WARNING] Agar aap total distance (absolute) maang rahe hain toh yeh galat result dega; sign information khatam ho jaati hai.

### Step 2 — Rate function as derivative
Jab rate \(r(t)=F'(t)\) diya ho, toh net change ko directly \(r(t)\) se nikaalna hai.  
Example: velocity \(v(t)=2t\), net displacement \(\int_0^2 2t\,dt\).  
Formal: \(r(t)=F'(t)\).  
> [!WARNING] Agar \(F\) differentiable nahi hai toh rate function exist hi nahi karti.

### Step 3 — Accumulation via definite integral
Definite integral \(\int_a^b r(t)\,dt\) poore interval mein rate ko jodta hai.  
Example: \(\int_0^2 2t\,dt = [t^2]_0^2 = 4\).  
Formal: accumulation operator = \(\int_a^b\).  
> [!WARNING] Limits galat lagaane se sign flip ho jaata hai.

### Step 4 — Fundamental Theorem links both
Agar \(F'=r\) continuous hai, toh \(\int_a^b r(t)\,dt = F(b)-F(a)\).  
Example: same velocity case yields 4, matching direct subtraction.  
Formal: \(\int_a^b F'(x)\,dx = F(b)-F(a)\).  
> [!WARNING] Discontinuities par theorem apply nahi hota; improper integrals alag se check karna padta hai.

### Step 5 — Textbook-grade statement
Net Change Theorem: Let \(F\) be differentiable on \([a,b]\) with continuous derivative. Then \(\int_a^b F'(x)\,dx = F(b)-F(a)\).

## 5. Worked examples — har step show karo

**Example 1 — Constant rate**  
*Given:* Water flows into a tank at constant rate \(r(t)=3\) L/min from \(t=0\) to \(t=5\).  
*Find:* Net volume change.  
Step 1: Identify \(F'(t)=3\).  
Step 2: \(\int_0^5 3\,dt = [3t]_0^5=15\).  
*Why*: Direct antiderivative evaluation.  
**15 L**  
*Reflection*: Constant rate makes the integral trivial; shows net change equals rate times time.

**Example 2 — Linear rate**  
*Given:* Velocity \(v(t)=4t-2\) m/s, \(t=1\) to \(t=3\).  
*Find:* Net displacement.  
Step 1: \(F'(t)=4t-2\).  
Step 2: \(\int_1^3(4t-2)\,dt=[2t^2-2t]_1^3= (18-6)-(2-2)=12\).  
*Why*: Power rule applied term-wise.  
**12 m**  
*Reflection*: Negative velocity interval automatically subtracts, giving true net value.

**Example 3 — Trigonometric rate**  
*Given:* \(\frac{dQ}{dt}=\sin t\), charge from \(0\) to \(\pi\).  
*Find:* Net charge change.  
Step 1: \(F'(t)=\sin t\).  
Step 2: \(\int_0^\pi\sin t\,dt=[-\cos t]_0^\pi=(-(-1))-(-1)=2\).  
*Why*: Standard integral of sine.  
**2 C**  
*Reflection*: Full positive and negative lobes cancel partially; net is 2.

**Example 4 — Piecewise rate**  
*Given:* \(r(t)=t\) for \(0\le t\le 2\), \(r(t)=4-t\) for \(2<t\le 4\).  
*Find:* Net change.  
Step 1: Split integral at 2.  
Step 2: \(\int_0^2 t\,dt + \int_2^4(4-t)\,dt=[t^2/2]_0^2 + [4t-t^2/2]_2^4=2+(16-8)-(8-2)=2+8-6=4\).  
*Why*: Each piece uses its own antiderivative.  
**4 units**  
*Reflection*: Continuity at breakpoint guarantees theorem still applies.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using absolute value inside integral | Confusing total distance with net change   | Check whether problem asks for signed change |
| Forgetting to change limits when substituting | Substitution performed mechanically        | Always rewrite limits in new variable        |
| Applying theorem to discontinuous rate | Assuming every rate is continuous          | Verify continuity on closed interval first   |
| Evaluating only one endpoint      | Thinking integral equals antiderivative alone | Always subtract lower from upper limit       |
| Mixing units without conversion   | Rate and time units mismatch               | Carry units through every step               |
| Reversing limits without sign flip| Forgetting \(\int_a^b=-\int_b^a\)          | Swap and add minus sign explicitly           |
| Treating net change as total accumulation | Ignoring cancellation of positive/negative parts | Draw sign chart of rate function first     |

## 7. The textbook-precise statement
Let \(F\) be continuous on \([a,b]\) and differentiable on \((a,b)\) with \(F'\) continuous on \([a,b]\). Then
\[
\int_a^b F'(x)\,dx=F(b)-F(a).
\]
This is precisely the first part of the Fundamental Theorem of Calculus specialised to net change (Stewart, *Calculus*, 9e, §5.3, Theorem 2).

## 8. Visual — diagram or schematic
```
t-axis:  a ------------------ b
F(a) o                  o F(b)
       \               /
        \             /
         \           /   net change = F(b)-F(a)
          \         /
rate F' > 0 here     F' < 0 here
```
Horizontal axis labelled with \(a\) and \(b\); vertical distance between the two dots is exactly the value of the definite integral of \(F'\).

## 9. The memory technique
1. **The hook** — Picture a hiker walking forward then backward on a straight trail; the integral tells only how far the tent has moved from start, not total kilometres walked.  
2. **What to overlearn** — \(\int_a^b F'(x)\,dx=F(b)-F(a)\) and the continuity hypothesis.  
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Start from definition of derivative, form Riemann sum of \(\Delta F\), take limit; telescoping sum yields \(F(b)-F(a)\).

## 10. What this unlocks
Once you master the net change theorem you can move directly to substitution in definite integrals, integration by parts with variable limits, and applications such as work, centre of mass, and accumulated change in physics and economics.

- Displacement from velocity  
- Charge from current  
- Work from variable force  
- Accumulated growth from rate functions in differential equations  

## 11. Self-check — five questions, no answers
1. If \(F'(x)=x^2-1\) on \([0,2]\), compute the net change in \(F\).  
2. A velocity function changes sign inside the interval; does the net displacement equal total distance? Explain.  
3. Why must \(F'\) be continuous on the closed interval for the theorem to apply?  
4. Evaluate \(\int_1^2\frac{1}{x}\,dx\) using the net change theorem after finding an antiderivative.  
5. A piecewise rate has a jump discontinuity at an interior point; can you still use the theorem directly?