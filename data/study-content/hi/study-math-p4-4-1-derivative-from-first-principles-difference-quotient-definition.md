## 1. The one-sentence answer
**The derivative from first principles is the limit of the difference quotient that measures the instantaneous rate of change of a function at a point.**

Aap jab kisi function ka slope sirf uske definition se nikaalte ho bina kisi shortcut rule ke, tab aap exactly yeh limit lete ho. Yeh limit batata hai ki function kitni tezi se badal raha hai ek particular point par, aur yeh limit exist kare tabhi derivative exist karti hai. Agar limit nahi milti to function us point par differentiable nahi hoti.

Yeh approach sabse basic hai kyunki yeh sirf limit aur subtraction ka use karti hai. Baad mein power rule ya chain rule aate hain lekin woh sab is definition se prove hote hain. Isliye pehle yeh solid samajhna zaroori hai.

> [!NOTE]
> The single “aha” moment is realising that the derivative is not a formula you memorise but the precise value the difference quotient approaches when the two points on the curve get infinitely close.

## 2. Why this matters — concrete and current
In aerospace trajectory planning at NASA’s Johnson Space Center, the first-principles derivative of the thrust-to-mass ratio is computed at every guidance cycle to obtain instantaneous acceleration before any higher-order integrator is applied.

In semiconductor process control at TSMC, engineers differentiate the etch-rate function with respect to chamber pressure using the difference quotient so that real-time feedback loops remain stable when plasma conditions drift by only a few pascals.

In modern automatic differentiation engines inside PyTorch and JAX, the forward-mode pass still begins with the same limit definition; the library simply evaluates it along a directional seed vector instead of symbolically.

In fundamental physics, the four-velocity in special relativity is obtained by taking the proper-time derivative of the position four-vector exactly via the difference quotient before any metric tensor is introduced.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Limit                | The derivative is literally a limit; without limits the expression is indeterminate. |
| Function notation    | You must read f(x+h) correctly to build the difference quotient. |
| Algebraic simplification | Cancelling the h in numerator and denominator is the only way the limit becomes finite. |

If any of these three are shaky, pause and review limits first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Two points on the curve
Aap ek function ke graph par do points choose karte ho: (x, f(x)) aur (x+h, f(x+h)). In dono points ke beech ka slope average rate of change deta hai.

Example: f(t) = t² at t = 3, h = 0.1 gives points (3,9) and (3.1,9.61). Slope = 6.1.

Formal statement: average slope = \(\frac{f(x+h)-f(x)}{h}\).

> [!WARNING]
> If you treat h as zero too early the denominator vanishes and the expression becomes undefined.

### Step 2 — Shrinking the interval
Ab aap h ko chhota karte jaate ho. Slope ka value badalta hai lekin ek particular number ki taraf badhta dikhta hai.

Example: same f(t)=t², h=0.01 gives slope 6.01; h=0.001 gives 6.001.

Formal: we examine the behaviour of the quotient as h approaches 0.

> [!WARNING]
> Stopping at a “very small” h instead of taking the actual limit leaves a small but systematic error that propagates in later calculations.

### Step 3 — Forming the limit expression
The instantaneous slope is defined as the limit of that quotient.

Formal definition:
\[
f'(x)=\lim_{h\to 0}\frac{f(x+h)-f(x)}{h}
\]

provided the limit exists.

### Step 4 — Evaluating the limit algebraically
Aap numerator ko expand aur simplify karte ho taaki h cancel ho jaaye.

Example: f(x)=x² → \(\frac{(x+h)^2-x^2}{h}=\frac{2xh+h^2}{h}=2x+h\). Limit h→0 gives 2x.

> [!WARNING]
> Forgetting to cancel h before substituting h=0 produces the indeterminate form 0/0.

### Step 5 — The derivative as a new function
After the limit, the result is itself a function of x, not a number. Is function ko derivative kehte hain.

Formal: once evaluated, f'(x) can be used at any point in the domain where the limit existed.

## 5. Worked examples — har step show karo

**Example 1 — Quadratic**
*Given:* \(f(x)=x^2\)
*Find:* \(f'(x)\) from first principles.

Expand: \(\frac{(x+h)^2-x^2}{h}=\frac{2xh+h^2}{h}\).  
Cancel h (valid for h≠0): 2x+h.  
Take limit: \(\lim_{h\to0}(2x+h)=2x\).  
**2x**

*Reflection:* The cancellation works for every polynomial; the pattern foreshadows the power rule.

**Example 2 — Linear**
*Given:* \(f(x)=3x+1\)
*Find:* \(f'(x)\).

Quotient: \(\frac{3(x+h)+1-(3x+1)}{h}=\frac{3h}{h}\).  
After cancellation: 3.  
Limit: 3.  
**3**

*Reflection:* Slope is constant, so derivative is the same constant; the method recovers the obvious answer.

**Example 3 — Square root**
*Given:* \(f(x)=\sqrt{x}\) at x=4
*Find:* f'(4).

Quotient: \(\frac{\sqrt{4+h}-2}{h}\).  
Rationalise: multiply by conjugate → \(\frac{(4+h)-4}{h(\sqrt{4+h}+2)}=\frac{1}{\sqrt{4+h}+2}\).  
Limit h→0: 1/4.  
**1/4**

*Reflection:* Rationalisation is the key algebraic tool when roots appear.

**Example 4 — Absolute value**
*Given:* \(f(x)=|x|\) at x=0
*Find:* whether f'(0) exists.

Right-hand: h>0 → quotient = 1, limit=1.  
Left-hand: h<0 → quotient = −1, limit=−1.  
Limits disagree → derivative does not exist at 0.  
**does not exist**

*Reflection:* First principles immediately reveals non-differentiable corners that shortcuts hide.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Substituting h=0 immediately | Looks like the expression is already simple | Always simplify first, cancel h, then limit  |
| Forgetting one-sided limits | Student assumes limit is two-sided by default | Check left and right behaviour separately when function has kink |
| Treating derivative as slope between two fixed points | Confuses average with instantaneous         | Emphasise that h must approach zero          |
| Writing 0/0 as answer       | Stops before algebraic cancellation         | Keep the h≠0 restriction visible until after cancellation |
| Confusing f'(a) with f'(x)  | Notation mix-up                             | Always write the variable of differentiation clearly |

## 7. The textbook-precise statement
Let f be defined on an open interval containing the point a. The derivative of f at a is
\[
f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}{h}
\]
provided the limit exists. When the limit exists we say f is differentiable at a. (Stewart, *Calculus*, 9e, §3.1)

## 8. Visual — diagram or schematic
```
y
↑
|               • (x+h, f(x+h))
|              /
|             /
|            /   slope = [f(x+h)-f(x)]/h
|           /
|          • (x, f(x))
|         /
+---------+----------------→ x
          a
```
The vertical distance between the two points is f(x+h)−f(x); the horizontal distance is h. As the right-hand point slides left toward (x,f(x)), the secant line approaches the tangent.

## 9. The memory technique
1. **The hook** — Picture two ants on a curve walking toward each other; the slope they measure becomes the tangent the instant they meet.
2. **What to overlearn** — The exact definition \(f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}\) and the fact that h must cancel before the limit.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Expand f(x+h), subtract f(x), divide by h, cancel, then take limit.

## 10. What this unlocks
Once you can compute derivatives from first principles you can prove every later differentiation rule and recognise where those rules fail.

- Chain rule proof via limit composition
- Proof that differentiability implies continuity
- Definition of higher-order derivatives
- Linear approximation and differentials
- Rigorous optimisation conditions (Fermat’s theorem)

## 11. Self-check — five questions, no answers
1. Using only the definition, find the derivative of \(f(x)=x^3\) at a general point x.
2. For which values of a does \(f(x)=|x-a|\) fail to be differentiable?
3. Show that if \(f'(a)\) exists then \(\lim_{x\to a}f(x)=f(a)\).
4. Compute \(\lim_{h\to0}\frac{\sqrt{9+h}-3}{h}\) without using derivative rules.
5. Give an example of a function that is continuous everywhere yet differentiable nowhere; justify using the difference quotient.