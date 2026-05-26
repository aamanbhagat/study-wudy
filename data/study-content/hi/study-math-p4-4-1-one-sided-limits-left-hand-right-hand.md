## 1. The one-sentence answer
**One-sided limits capture how a function approaches a value when the input variable is restricted to approach the point from only the left side or only the right side.**

Left-hand limit records the value the function heads toward when x stays strictly less than a and gets arbitrarily close to a. Right-hand limit does the same when x stays strictly greater than a. These two directional statements together decide whether the ordinary two-sided limit exists.

Aap dekh sakte ho ki agar dono taraf se same number aata hai to limit exist karti hai; agar alag-alag numbers aate hain to limit exist nahi karti, chahe function dono sides par alag-alag tarah se behave kare.

> [!NOTE]
> The decisive “aha” moment is this: the two-sided limit is not an independent object; it is simply the common value of the two one-sided limits when they agree. Once you internalise that, every piecewise or absolute-value function becomes easy to analyse.

## 2. Why this matters — concrete and current
In semiconductor process control, engineers at TSMC use one-sided limits to guarantee that gate-oxide thickness never drops below a critical value when the deposition tool drifts from one side of the target setpoint.

NASA’s Perseverance rover descent software checks one-sided velocity limits during the “sky-crane” phase; the left-hand limit on vertical speed ensures touchdown velocity stays below the structural limit even if radar returns arrive late.

In high-frequency trading, Jane Street’s risk engine evaluates one-sided limits on order-book imbalance; the right-hand limit on bid volume prevents the algorithm from assuming liquidity that only exists on the ask side.

Climate models at GFDL impose one-sided limits on temperature gradients near the tropopause; violating the right-hand limit triggers convective-adjustment routines that keep the simulation stable.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Function notation    | To write $f(x)$ and describe its output at each input     |
| Informal limit idea  | To understand what “approaches L” means before formalising direction |
| Interval notation    | To write $(a-\delta,a)$ and $(a,a+\delta)$ cleanly        |

If any row is unfamiliar, pause and review that idea first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Direction as a restriction on the domain
Aap soch sakte ho ki left-hand limit sirf un x values ko allow karti hai jo a ke left side par hain.  
Example: $f(x)=x+1$ jab $x\to 2^-$.  
Formal statement:  
$$
\lim_{x\to a^-}f(x)=L \quad\text{means}\quad \forall\varepsilon>0\ \exists\delta>0\ \text{such that}\ 0<a-x<\delta\implies|f(x)-L|<\varepsilon.
$$
> [!WARNING] Agar aap $\delta$ ko negative hone dete ho to definition collapse ho jaati hai.

### Step 2 — Right-hand restriction mirrors the left
Right-hand limit mein $x$ sirf a ke right side se aata hai, isliye $0<x-a<\delta$ likha jaata hai.  
Example: $f(x)=\sqrt{x-3}$ at $x=3^+$.  
Formal: replace $a-x$ by $x-a$ in the previous quantifiers.

### Step 3 — Two-sided limit as agreement of both sides
Agar dono one-sided limits exist aur equal hain, tabhi  
$$
\lim_{x\to a}f(x)
$$  
likha ja sakta hai. Agar dono alag hain to two-sided limit exist nahi karti.

### Step 4 — Piecewise functions force one-sided thinking
Jab function definition alag-alag intervals par alag hoti hai, ek taraf se limit nikalna aur doosri taraf se compare karna zaroori ho jaata hai.

### Step 5 — Epsilon-delta language without two-sided assumption
Textbook statements now drop the absolute-value $|x-a|<\delta$ aur uski jagah directional inequalities use karte hain; yeh change hi ek-sided limits ko rigorous banata hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple linear piece**  
*Given:* $f(x)=\begin{cases}2x+1&x<1\\3x-1&x\geq1\end{cases}$  
*Find:* $\lim_{x\to1^-}f(x)$  
Step 1: $x<1$ region use karo, isliye $f(x)=2x+1$.  
Step 2: Direct substitution: $2(1)+1=3$.  
*Why* — left-hand definition forces us inside the piece $x<1$.  
**3**

*Reflection:* Linear pieces give instant answers; the real work is choosing the correct piece.

**Example 2 — Jump discontinuity**  
*Given:* $f(x)=\begin{cases}x^2&x<0\\x+1&x\geq0\end{cases}$  
*Find:* left- and right-hand limits at 0.  
Left: $\lim_{x\to0^-}x^2=0$.  
Right: $\lim_{x\to0^+} (x+1)=1$.  
**Left = 0, right = 1**

*Reflection:* Because the two numbers differ, the ordinary limit does not exist.

**Example 3 — Absolute-value kink**  
*Given:* $f(x)=|x-2|$  
*Find:* $\lim_{x\to2^-}f(x)$ and $\lim_{x\to2^+}f(x)$.  
Left: $f(x)=2-x\to0$.  
Right: $f(x)=x-2\to0$.  
**Both sides equal 0**

*Reflection:* Even though the derivative fails, the limit survives because both sides meet.

**Example 4 — Rational function with one-sided asymptote**  
*Given:* $f(x)=\frac{1}{x-3}$  
*Find:* $\lim_{x\to3^-}f(x)$ and $\lim_{x\to3^+}f(x)$.  
Left: as $x$ approaches 3 from below, denominator negative and small, so $f(x)\to-\infty$.  
Right: denominator positive and small, so $f(x)\to+\infty$.  
**Left = $-\infty$, right = $+\infty$**

*Reflection:* Infinity is not a number, yet the one-sided statements still classify the blow-up direction correctly.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Writing $\lim_{x\to a}f(x)$ when only one side matches | Habit of ignoring direction                 | Always compute both one-sided limits first   |
| Using $|x-a|<\delta$ for one-sided claims | Copying two-sided definition                | Replace with $0<a-x<\delta$ or $0<x-a<\delta$ |
| Forgetting that $\infty$ is allowed as a one-sided value | Thinking limits must be real numbers        | State “diverges to $+\infty$” explicitly     |
| Plugging $x=a$ into the wrong piece | Not checking the inequality $x<a$ or $x>a$  | Write the domain restriction before substituting |
| Assuming left and right limits are automatically equal | Visualising only continuous-looking graphs  | Draw a quick sign chart of the pieces        |
| Mixing up $x\to a^-$ with $x\to -a$ | Notation confusion                          | Read the superscript first, then the number  |
| Cancelling factors that are zero on one side only | Algebraic shortcuts without domain check    | Keep the original expression until the limit is taken |

## 7. The textbook-precise statement
Let $f$ be defined on some deleted left neighbourhood of $a$, i.e., on $(a-\delta_0,a)$ for some $\delta_0>0$. We say  
$$
\lim_{x\to a^-}f(x)=L
$$  
if for every $\varepsilon>0$ there exists $\delta>0$ such that  
$$
0<a-x<\delta\implies|f(x)-L|<\varepsilon.
$$  
An analogous statement holds for the right-hand limit with $0<x-a<\delta$. The two-sided limit exists and equals $L$ if and only if both one-sided limits exist and equal $L$ (Stewart, *Calculus*, 9e, §2.2).

## 8. Visual — diagram or schematic
```text
          f(x)
           ^
           |
       3.0 +                 ● right piece
           |                /
       2.0 +               /
           |              /
       1.0 +             /
           |            /
       0.0 +-----------●----------->
           |          a=1     x
Left piece (x<1) approaches 3 from below;
right piece (x>1) starts at 3 and rises.
```
The dot at (1,3) is not part of the left-hand graph; the open circle at (1,3) on the left side emphasises that we never reach x=1 from the left piece.

## 9. The memory technique
1. **The hook** — Picture a one-way street: left-hand limit is traffic coming only from the west, right-hand limit only from the east; the two-sided limit is a green light only when both flows meet at the same speed.  
2. **What to overlearn** — The two epsilon-delta inequalities $0<a-x<\delta$ and $0<x-a<\delta$, plus the sentence “both one-sided limits must exist and be equal.”  
3. **Spaced-repetition schedule** — Review the definition after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — If you forget the symbols, redraw the interval $(a-\delta,a)$ on the number line and write the distance condition in words before translating back to inequalities.

## 10. What this unlocks
One-sided limits are the gateway to continuity on closed intervals, the definition of the derivative from the right or left, and all later work on improper integrals and Laplace transforms.

- Differentiability at endpoints  
- Intermediate-value theorem on half-open intervals  
- Jump conditions in Fourier series  
- Lateral limits in complex analysis (real and imaginary directions)

## 11. Self-check — five questions, no answers
1. Compute both one-sided limits of $f(x)=\frac{|x|}{x}$ at $x=0$.  
2. For which values of $c$ does $\lim_{x\to0^-}(x^2+c)$ equal $\lim_{x\to0^+} (x+c)$?  
3. True or false: if the left-hand limit is $+\infty$ and the right-hand limit is $-\infty$, the two-sided limit exists and equals 0.  
4. Write the epsilon-delta definition for $\lim_{x\to2^+} \sqrt{x-2}=0$ without using absolute value around $x-2$.  
5. A function satisfies $\lim_{x\to a^-}f(x)=3$ and $\lim_{x\to a^+}f(x)=3$. Must $f(a)=3$? Give a counter-example if false.