## 1. The one-sentence answer
**Continuity at a point \(c\) means \(\lim_{x \to c} f(x) = f(c)\).**

Iska matlab yeh hai ki function ko aap \(c\) ke paas arbitrarily close jaakar uski value ko exactly \(f(c)\) tak pahuncha sakte ho bina kisi sudden break ke. Agar limit exist nahi karta ya limit aur \(f(c)\) alag hain, toh discontinuity hai. Yeh definition limit ke concept ko directly extend karti hai taaki function ka local behaviour smooth dikhe.

Yeh sirf ek point par nahi, balki interval par bhi define hoti hai jab har point par continuity ho. Agar aap ek function ko graph par plot karo aur pencil uthaaye bina draw kar pao, toh woh continuous hai.

> [!NOTE]
> The single deepest insight is that continuity is a local property decided entirely by the limit: once the limit equals the function value, the function cannot “jump away” from its own value no matter how wild it is elsewhere.

## 2. Why this matters — concrete and current
In aerospace trajectory planning at NASA’s Johnson Space Center, position and velocity functions must be continuous so that thrust commands remain finite; a jump discontinuity would imply an instantaneous infinite acceleration that no physical engine can produce.

In semiconductor process control at TSMC, temperature and deposition-rate functions inside the reactor are required to be continuous; an infinite discontinuity would correspond to a sudden phase change that destroys the wafer.

Inside the loss surfaces of large language models trained at OpenAI, the cross-entropy loss is deliberately constructed to be continuous (and almost everywhere differentiable) so that gradient descent steps remain well-defined; a removable discontinuity would create flat regions that stall optimisers.

In power-grid frequency regulation, the frequency-response function of a synchronous generator must be continuous; a jump discontinuity models a breaker trip and forces protective relays to act within milliseconds.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Limit of a function  | Continuity is defined by comparing the limit to \(f(c)\)  |
| Left- and right-hand limits | Needed to detect jump discontinuities                   |
| Function evaluation  | You must compute \(f(c)\) and compare it with the limit   |
| One-sided continuity | Required when the domain itself has an endpoint           |

If any of these are shaky, pause and review the limit definition first.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with the intuitive picture of “no break”
Aap ek function ko continuous tabhi kehte ho jab aap uske graph ko \(c\) ke through bina pencil uthaye cross kar sako.  
Example: \(f(x)=x^2\) at \(c=3\) — graph ek smooth parabola hai, koi break nahi.  
Formal statement: \(\lim_{x\to 3}x^2=9=f(3)\).  
> [!WARNING] Agar aap sirf graph dekh kar “smooth lag raha hai” bol do aur limit check na karo, toh removable discontinuities chhup jaate hain.

### Step 2 — Write the three-part definition
Limit exist karna chahiye, function value exist karna chahiye, aur dono barabar hone chahiye.  
Example: \(f(x)=\frac{\sin x}{x}\) at \(c=0\) — limit 1 hai lekin \(f(0)\) undefined, isliye discontinuous.  
Formal: \(\lim_{x\to c}f(x)\) exists, \(f(c)\) defined, and equality holds.  
> [!WARNING] Missing any one of the three parts immediately creates a discontinuity; students often forget to check whether \(f(c)\) is even defined.

### Step 3 — Classify removable discontinuity
Limit exist karta hai lekin \(f(c)\) ya toh galat value hai ya undefined.  
Example: \(f(x)=\frac{x^2-1}{x-1}\) at \(x=1\) — limit = 2, lekin \(f(1)\) undefined.  
Formal: \(\lim_{x\to c}f(x)=L\) finite, yet \(f(c)\neq L\) or undefined.  
> [!WARNING] Agar aap isko “function hi nahi hai” bol kar chhod do, toh aap miss kar jaoge ki sirf ek point redefine karne se continuity aa sakti hai.

### Step 4 — Classify jump discontinuity
Left- and right-hand limits exist lekin alag hain.  
Example: step function \(f(x)=\begin{cases}0 & x<0\\1 & x\geq0\end{cases}\) at \(x=0\).  
Formal: \(\lim_{x\to c^-}f(x)\neq\lim_{x\to c^+}f(x)\), both finite.  
> [!WARNING] Agar left aur right limits ko alag-alag na calculate kiya, toh jump ko infinite discontinuity se confuse kar sakte ho.

### Step 5 — Classify infinite discontinuity
Kam se kam ek one-sided limit \(\pm\infty\) hota hai.  
Example: \(f(x)=\frac{1}{x}\) at \(x=0\).  
Formal: \(\lim_{x\to c}f(x)=\pm\infty\).  
> [!WARNING] “Limit exist nahi karta” bolna galat hai; infinity tak jaana ek tarah ka discontinuity hi hai.

### Step 6 — State the global definition on an interval
A function continuous on an interval \(I\) hai jab woh har interior point par continuous ho aur one-sided continuity endpoints par.  
Formal (Stewart, Calculus, 9e, §2.5): \(f\) is continuous on \(I\) if it is continuous at every point of \(I\).

## 5. Worked examples — har step show karo

**Example 1 — Polynomial (continuous everywhere)**  
*Given:* \(f(x)=3x^2-2x+5\), check continuity at \(c=2\).  
*Find:* Is \(f\) continuous at 2?  
Step 1: Compute \(f(2)=3(4)-4+5=13\). *Why:* Direct substitution.  
Step 2: \(\lim_{x\to2}f(x)=13\) (polynomial limit rule). *Why:* All polynomials are continuous everywhere.  
Step 3: Limit = value, hence continuous.  
**Final answer**  
Continuous at \(x=2\).

*Reflection:* Trivial case teaches that polynomials never produce discontinuities; the same algebra works for any \(c\).

**Example 2 — Removable discontinuity**  
*Given:* \(f(x)=\frac{x^2-4}{x-2}\), \(c=2\).  
*Find:* Type of discontinuity.  
Step 1: \(f(2)\) undefined. *Why:* Denominator zero.  
Step 2: Simplify \(\frac{(x-2)(x+2)}{x-2}=x+2\) for \(x\neq2\). *Why:* Cancel common factor.  
Step 3: \(\lim_{x\to2}(x+2)=4\). *Why:* Now continuous function.  
Step 4: Limit finite but \(f(2)\) undefined → removable.  
**Final answer**  
Removable discontinuity at \(x=2\).

*Reflection:* Redefining \(f(2)=4\) removes the discontinuity; this is the classic “hole” in the graph.

**Example 3 — Jump discontinuity**  
*Given:* \(f(x)=\begin{cases}x+1 & x<1\\3-x & x\geq1\end{cases}\), \(c=1\).  
*Find:* Type.  
Step 1: Left limit \(\lim_{x\to1^-}(x+1)=2\). *Why:* Direct substitution from left.  
Step 2: Right limit \(\lim_{x\to1^+}(3-x)=2\). *Why:* Same value.  
Step 3: \(f(1)=3-1=2\). *Why:* Function defined.  
Step 4: Limits equal value, so actually continuous. (Change right piece to \(4-x\) to create jump.)  
**Final answer**  
Continuous at \(x=1\) (with modified right piece it becomes jump).

*Reflection:* Always compute both one-sided limits; equality decides jump versus removable.

**Example 4 — Infinite discontinuity**  
*Given:* \(f(x)=\frac{1}{x-3}\), \(c=3\).  
*Find:* Type.  
Step 1: As \(x\to3^+\), \(f(x)\to+\infty\). *Why:* Denominator →0+.  
Step 2: As \(x\to3^-\), \(f(x)\to-\infty\). *Why:* Denominator →0-.  
Step 3: No finite limit exists.  
**Final answer**  
Infinite discontinuity at \(x=3\).

*Reflection:* Vertical asymptote is the geometric signature; never say “limit does not exist” without specifying infinity.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting to check if \(f(c)\) defined | Students assume domain is all reals         | Always evaluate \(f(c)\) first               |
| Confusing removable with continuous | After simplifying they forget original point | Keep original function until final comparison |
| Using only two-sided limit for jumps | Habit from earlier limit chapters           | Explicitly compute left and right limits     |
| Calling infinite discontinuity “limit DNE” | Loose language from pre-calculus            | Write \(\lim=\infty\) to be precise          |
| Assuming rational functions always continuous | Cancel common factors mentally              | Factor and check every root of denominator   |
| Mixing continuity on interval with at a point | Vague wording in questions                  | State the exact interval or point asked      |

## 7. The textbook-precise statement
A function \(f\) is continuous at a point \(c\) in its domain if and only if
\[
\lim_{x\to c}f(x)=f(c).
\]
Equivalently, for every \(\varepsilon>0\) there exists \(\delta>0\) such that \(|x-c|<\delta\) implies \(|f(x)-f(c)|<\varepsilon\).  
A function is continuous on an interval \(I\) if it is continuous at every interior point of \(I\) and one-sided continuous at any endpoint that belongs to \(I\).  
(Stewart, *Calculus*, 9e, §2.5, Definition 1 and subsequent discussion.)

## 8. Visual — diagram or schematic
```
y
^
|          ∞
|         /
|        /
|   ----/     (infinite)
|      /
|     /
|    /
|   /
|  /
| /
+---------------→ x
   -2 -1 0 1 2 3
   • removable hole at x=1
   | jump at x=0 (left 0, right 1)
   ∞ vertical asymptote at x=-1
```

## 9. The memory technique
1. **The hook** — Picture a road that suddenly ends in a cliff (infinite), has a broken bridge you can rebuild (removable), or has a sudden step you must climb (jump).  
2. **What to overlearn** — The three-line test: limit exists? \(f(c)\) defined? equal?  
3. **Spaced-repetition schedule** — Review the three-line test after 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from the \(\varepsilon\)-\(\delta\) definition: choose \(\delta\) so that \(|f(x)-f(c)|<\varepsilon\) whenever \(|x-c|<\delta\).

## 10. What this unlocks
Continuity is the gateway to differentiability, the extreme-value theorem, and the fundamental theorem of calculus.

- Differentiability at a point requires continuity first.  
- Intermediate-value theorem holds only for continuous functions.  
- Riemann integrability on a closed interval needs continuity almost everywhere.  
- Uniform continuity on compact sets guarantees preservation of Cauchy sequences.

## 11. Self-check — five questions, no answers
1. Give an example of a function that is continuous at every point except \(x=0\) where it has a removable discontinuity.  
2. Determine the value of \(k\) that makes \(f(x)=\begin{cases}x^2 & x<1\\k & x\geq1\end{cases}\) continuous at \(x=1\).  
3. Classify the discontinuity of \(f(x)=\frac{|x|}{x}\) at \(x=0\).  
4. Prove that if \(f\) and \(g\) are continuous at \(c\), then \(f+g\) is continuous at \(c\).  
5. Construct a function that has both a jump discontinuity and an infinite discontinuity on the same interval.