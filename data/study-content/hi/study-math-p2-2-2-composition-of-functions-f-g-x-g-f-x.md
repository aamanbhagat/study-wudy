## 1. The one-sentence answer
**Function composition combines two functions so the output of one becomes the input of the other, written as \(f(g(x))\) or \(g(f(x))\).**

Iska matlab yeh hai ki aap ek function ke result ko seedha dusre function mein daal dete ho bina beech mein koi extra step liye. Agar \(g(x)\) pehle \(x\) ko process karta hai aur uska output \(f\) ko milta hai, toh final result \(f(g(x))\) ban jaata hai. Yeh sirf ek function ko dusre ke andar nest karne ka tareeka hai, lekin isse naye functions ban jaate hain jo alag-alag behaviour dikha sakte hain.

Aapko yeh samajhna zaroori hai kyunki real problems mein aksar multiple transformations ek saath lagte hain. Composition aapko un transformations ko ek single expression mein likhne deta hai. Order matter karta hai: \(f(g(x))\) aur \(g(f(x))\) generally alag-alag hote hain.

> [!NOTE]
> The key "aha" moment is realising that composition is not multiplication or addition; it is feeding one machine's output directly into another machine's input, and the order of machines changes the final result.

## 2. Why this matters — concrete and current
In aerospace trajectory planning, NASA’s Artemis program uses chained coordinate transformations where one function converts Earth-centred coordinates to Moon-centred coordinates and the next applies orbital mechanics; composing these functions produces the single mapping needed for real-time guidance software.

In machine-learning inference pipelines at companies such as OpenAI, each neural-network layer is a function; the entire forward pass is the composition of dozens of layer functions, so \(f_n(f_{n-1}(\dots f_1(x)\dots))\) is evaluated thousands of times per second on GPUs.

Semiconductor mask design at TSMC relies on successive optical-proximity-correction functions; composing the lithography model with the etch-bias model predicts the final silicon shape before any mask is manufactured, cutting costly trial runs.

In video-game engines such as Unreal Engine 5, skeletal animation applies a chain of bone-transform functions; the final vertex position is obtained by composing the hierarchy of local-to-world transformations each frame.

Physics engines in robotics simulation (MuJoCo library) compose contact-force functions with joint-limit functions to compute the next state of a manipulator arm, enabling stable model-predictive control loops running at 1 kHz.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Domain and range     | You must verify that the output of the inner function lies inside the domain of the outer function. |
| Function notation    | Clear reading of \(f(x)\) and \(g(x)\) lets you substitute correctly. |
| Order of operations  | Composition is sensitive to order, just like arithmetic precedence. |

If any of these feel shaky, pause and review the parent topic “Functions” before continuing.

## 4. Building the idea — from intuition to formalism

### Step 1 — Understand the inner function first
Plain Hinglish claim: Pehle inner function ko evaluate karo, uska number nikaalo, phir us number ko outer function mein daalo.  
Concrete example: Let \(g(x)=x+2\) aur \(f(x)=3x\). Jab \(x=4\) hai, \(g(4)=6\) banta hai; ab \(f(6)=18\) hota hai.  
Formal statement:  
$$(f\circ g)(4)=f(g(4))=f(6)=18.$$  
> [!WARNING] Agar aap inner function ko evaluate karna bhool jaayein aur seedha \(f(4)\) kar dein, toh poora result galat ho jaayega.

### Step 2 — Write the composed expression symbolically
Plain Hinglish claim: \(f(g(x))\) likhne ka matlab hai \(g(x)\) ko \(f\) ke andar substitute karna.  
Concrete example: \(f(g(x))=f(x+2)=3(x+2)=3x+6\).  
Formal statement:  
$$(f\circ g)(x)=f(g(x))=3(x+2).$$  
> [!WARNING] Substitution galat jagah karne se (jaise \(f(x)+2\)) expression ka structure toot jaata hai.

### Step 3 — Check domains explicitly
Plain Hinglish claim: Har composition ke liye domain restrict ho sakta hai.  
Concrete example: \(g(x)=\sqrt{x}\), \(f(x)=1/x\). \(g(x)\) sirf \(x\geq0\) ke liye defined hai aur \(f(g(x))\) ke liye \(g(x)\neq0\) bhi chahiye, isliye final domain \(x>0\).  
Formal statement:  
$$\operatorname{dom}(f\circ g)=\{x\in\operatorname{dom}(g):g(x)\in\operatorname{dom}(f)\}.$$  
> [!WARNING] Domain check skip karne se aap undefined expressions ko evaluate karne ki koshish karte ho.

### Step 4 — Evaluate \(g(f(x))\) and compare
Plain Hinglish claim: Order change karne se result alag ho jaata hai.  
Concrete example: \(g(f(x))=g(3x)=3x+2\), jo \(3x+6\) se alag hai.  
Formal statement:  
$$(g\circ f)(x)=g(f(x))=3x+2\neq(f\circ g)(x).$$  
> [!WARNING] Students aksar assume karte hain composition commutative hai; yeh galti almost har exam mein dikhti hai.

### Step 5 — State the general definition
Plain Hinglish claim: Ab aap dono taraf se formally define kar sakte ho.  
Formal statement:  
Let \(f:A\to B\) and \(g:C\to A\). Then  
$$(f\circ g):C\to B,\qquad(f\circ g)(x)=f(g(x)).$$  
> [!WARNING] Agar domains properly match na karein, composition function hi nahi banta.

## 5. Worked examples — har step show karo

**Example 1 — Linear chain**  
*Given:* \(f(x)=2x-1\), \(g(x)=x+5\).  
*Find:* \((f\circ g)(x)\) and evaluate at \(x=-2\).  
Step 1: Compute \(g(-2)=-2+5=3\). *Why:* inner function first.  
Step 2: \(f(3)=2\cdot3-1=5\). *Why:* output of inner becomes input of outer.  
**5**  
*Reflection:* Simple numbers let you verify each substitution without distraction.

**Example 2 — Quadratic outer**  
*Given:* \(f(x)=x^2+1\), \(g(x)=x-3\).  
*Find:* \((f\circ g)(x)\).  
Step 1: Substitute \(g(x)\) into \(f\): \(f(g(x))=(x-3)^2+1\). *Why:* direct replacement.  
Step 2: Expand: \(x^2-6x+9+1=x^2-6x+10\). *Why:* polynomial arithmetic.  
**\(x^2-6x+10\)**  
*Reflection:* Expansion step is mechanical but must be shown fully.

**Example 3 — Domain restriction**  
*Given:* \(f(x)=\sqrt{x}\), \(g(x)=x^2-4\).  
*Find:* domain of \(f\circ g\).  
Step 1: Require \(g(x)\geq0\) because square-root domain. *Why:* definition of \(\operatorname{dom}(f\circ g)\).  
Step 2: \(x^2-4\geq0\implies x\leq-2\) or \(x\geq2\).  
**Domain: \((-\infty,-2]\cup[2,\infty)\)**  
*Reflection:* Domain problems appear frequently once radicals or denominators are present.

**Example 4 — Mixed order comparison**  
*Given:* same \(f\) and \(g\) as Example 2.  
*Find:* \((g\circ f)(2)\) and show it differs from \((f\circ g)(2)\).  
Step 1: \(f(2)=4+1=5\).  
Step 2: \(g(5)=5-3=2\).  
**2**  
Step 3: Earlier \((f\circ g)(2)=f(-1)=2\). *Why:* order reversal produces different numbers.  
**Different values confirm non-commutativity.**  
*Reflection:* Always compute both orders when the problem does not specify which composition is required.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Treating composition as multiplication | Visual similarity of \(f(g(x))\) and \(fg(x)\) | Write the circle symbol \(\circ\) explicitly each time. |
| Forgetting to restrict domain     | Focusing only on algebraic simplification   | After simplification, always restate the domain. |
| Reversing order without checking  | Habit from commutative operations           | Compute both \(f\circ g\) and \(g\circ f\) side-by-side. |
| Substituting outer variable only  | Misreading notation                         | Replace every occurrence of the outer variable with the entire inner expression. |
| Ignoring undefined points         | Assuming all reals are allowed              | Check where inner output exits outer domain. |
| Writing \(f(g(x))=f(x)g(x)\)      | Confusing juxtaposition with composition    | Never drop the parentheses around the inner function. |

## 7. The textbook-precise statement
Let \(f:A\to B\) and \(g:C\to A\) be functions. The composition of \(f\) and \(g\) is the function  
$$f\circ g:C\to B,\qquad(f\circ g)(x)=f(g(x))\quad\text{for all }x\in C.$$  
The domain of \(f\circ g\) is exactly the set of points in \(C\) whose images under \(g\) lie in \(A\). Composition is associative but not commutative in general. (Sullivan, *Precalculus*, 10e, §3.5.)

## 8. Visual — diagram or schematic
```text
x ----> [ g ] ----> y = g(x) ----> [ f ] ----> z = f(y) = f(g(x))
          ^ inner                ^ outer
```
Label the left arrow “input x”, middle arrow “intermediate value y”, right arrow “final output z”. The box order from left to right shows the evaluation sequence.

## 9. The memory technique
1. **The hook** — Picture two vending machines in a row: first machine (g) accepts coins and drops a snack; second machine (f) accepts that snack and dispenses a toy. The final toy is f(g(coins)).
2. **What to overlearn** — The definition \((f\circ g)(x)=f(g(x))\) and the fact that order matters.
3. **Spaced-repetition schedule** — Review the definition after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If notation slips, return to the two-machine picture and literally substitute the output of the first into the second.

## 10. What this unlocks
Mastering composition lets you treat successive transformations as a single object, which is the foundation for later ideas such as inverse functions, function iteration, and change of variables in integrals.

- Inverse-function search begins by asking whether a composition yields the identity.
- Iteration \(f^n(x)\) is repeated composition of a function with itself.
- Substitution technique in integration is exactly the chain-rule idea expressed via composition.

## 11. Self-check — five questions, no answers
1. If \(f(x)=x^2\) and \(g(x)=x-1\), compute \((f\circ g)(3)\) and \((g\circ f)(3)\).
2. State the domain of \(f\circ g\) when \(f(x)=1/x\) and \(g(x)=\sqrt{x-2}\).
3. True or false: composition is always commutative. Give a counter-example if false.
4. A student writes \(f(g(x))=f(x)+g(x)\). Identify the mistake and correct it.
5. Using the two-machine picture, explain why the domain of \(f\circ g\) may be smaller than the domain of \(g\).