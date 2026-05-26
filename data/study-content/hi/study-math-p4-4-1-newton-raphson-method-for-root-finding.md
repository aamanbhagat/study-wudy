## 1. The one-sentence answer
**Newton-Raphson method ek iterative numerical technique hai jo kisi differentiable function ke root ko linearly approximate karke dhundta hai.**

Yeh method basically har step par function ki tangent line draw karta hai aur uske x-intercept ko agla guess maanta hai. Kyunki derivative slope deta hai, ek achhe initial guess se yeh bahut tez converge karta hai. Aapko sirf function aur uska derivative chahiye; baaki process khud hi refine hota rehta hai.

Agar initial guess root ke kafi kareeb hai toh method quadratic convergence dikhata hai, matlab har iteration mein sahi digits ki sankhya lagbhag double ho jaati hai. Lekin yeh guarantee nahi deta ki har baar kaam karega.

> [!NOTE]
> Sabse badi "aha" yeh hai ki ek local linear approximation (tangent) global root-finding problem ko chhote-chhote local steps mein tod deti hai, aur derivative hi us local direction ko batati hai.

## 2. Why this matters — concrete and current
NASA ke trajectory optimisation codes mein Newton-Raphson variants orbital insertion points ke liye non-linear equations solve karte hain, jaise Artemis mission ke translunar injection calculations.

Google ke PageRank ke peeche lage power-method iterations ko accelerate karne ke liye bhi similar Newton-style corrections use hue hain research papers mein (Brin & Page, 1998 ke follow-up numerical work).

Semiconductor device modelling software (Synopsys TCAD) transistor ke voltage-current curves ke operating points dhundne ke liye Newton-Raphson based solvers chalata hai har simulation step par.

Machine-learning optimisers jaise Newton-CG (scipy.optimize) large neural nets ke loss surfaces par second-order steps lene ke liye isi idea ka extension use karte hain.

Climate models mein ice-sheet dynamics ke non-linear equations ko solve karne ke liye NASA GISS ke GCM codes Newton-Raphson style root finders embed karte hain.

## 3. Mental prerequisites

| Concept          | Why you need it here                                      |
|------------------|-----------------------------------------------------------|
| Derivative       | Slope of tangent line deta hai jo next guess banata hai   |
| Limit definition of derivative | Samajhta hai kyun linear approximation kaam karti hai |
| Continuity       | Root ke aas-paas function smooth hona zaroori hai         |
| Basic algebra    | Iteration formula ko rearrange aur simplify karna padta hai |

Agar derivative aur limit abhi weak hain toh pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Root finding as guessing game
Aapko ek function \(f(x)\) diya gaya hai aur aap dhundhna chahte ho \(x\) jahaan \(f(x)=0\). Seedha solve karna mushkil hota hai, isliye hum guessing se shuru karte hain.

Example: \(f(x)=x^2-2\), root \(\sqrt{2}\) ke kareeb guess karo.

Formal statement: Solve \(f(x)=0\) for \(x\in\mathbb{R}\) where \(f\) continuous aur differentiable.

> [!WARNING]
> Agar aap sirf value check karte rahoge bina slope use kiye, toh convergence bahut slow ya kabhi nahi hogi.

### Step 2 — Linear approximation via tangent
Current guess \(x_n\) par function ki value \(f(x_n)\) aur slope \(f'(x_n)\) se tangent line likho.

Tangent equation: \(y-f(x_n)=f'(x_n)(x-x_n)\).

Example: \(x_n=1.5\), \(f(1.5)=0.25\), \(f'(1.5)=3\), line \(y=3(x-1.5)+0.25\).

Formal: Linear approximation \(L(x)=f(x_n)+f'(x_n)(x-x_n)\).

> [!WARNING]
> Agar \(f'(x_n)=0\) toh tangent horizontal ho jaati hai aur intersection nahi milta.

### Step 3 — Setting the approximation to zero
Tangent ko zero karne se agla x-intercept milta hai. \(0=f(x_n)+f'(x_n)(x-x_n)\) solve karo.

Yeh deta hai \(x=x_n-\frac{f(x_n)}{f'(x_n)}\).

Example calculation: \(x=1.5-0.25/3=1.4167\).

Formal iteration: \(x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}\).

### Step 4 — Repeating the process
Naye \(x_{n+1}\) ko naye guess ki tarah use karke repeat karo jab tak \(|f(x)|\) chhota na ho jaaye.

Convergence tab tak chalti rahegi jab tak derivative zero na ho aur guess root ke basin mein rahe.

### Step 5 — Convergence criterion
Jab \(|x_{n+1}-x_n|<\epsilon\) ya \(|f(x_{n+1})|<\epsilon\) ho jaaye tab ruk jao.

Formal: Choose tolerance \(\epsilon>0\) aur iterate until stopping condition met.

### Step 6 — Textbook-grade statement
Agar \(f\) continuously differentiable hai, \(f'(\xi)\neq0\) root \(\xi\) par, aur initial guess sufficiently close hai, toh sequence quadratically converge karti hai \(\xi\) ki taraf.

## 5. Worked examples — har step show karo

**Example 1 — Square-root of 2**
- *Given:* \(f(x)=x^2-2\), \(f'(x)=2x\), start at \(x_0=1.5\), tolerance \(10^{-4}\).
- *Find:* Approximate root.

Step 1: \(x_1=1.5-1.5^2/3=1.4166667\)  
*Why:* Tangent zero kiya.

Step 2: \(x_2=1.4166667-0.006944/2.83333\approx1.4142157\)  
*Why:* Naya guess refine kiya.

Final answer **1.4142**

*Reflection:* Simple quadratic function hone se ek hi step mein 4 sahi digits aa gaye.

**Example 2 — Cubic polynomial**
- *Given:* \(f(x)=x^3-x-1\), \(f'(x)=3x^2-1\), \(x_0=1.2\).
- *Find:* Root near 1.3.

Step 1: \(x_1=1.2-(1.728-1.2-1)/(3*1.44-1)\approx1.32596\)  
*Why:* Cubic term dominate kar raha tha.

Step 2: \(x_2=1.32596-(0.0003)/ (approx 4.25)\approx1.3247\)  
*Why:* Already close.

Final answer **1.3247**

*Reflection:* Derivative zero ke kareeb nahi tha isliye smooth chala.

**Example 3 — Trigonometric**
- *Given:* \(f(x)=\cos x-x\), \(f'(x)=-\sin x-1\), \(x_0=0.7\).
- *Find:* Dottie number.

Iterations yield **0.739085**

*Reflection:* Oscillatory function mein bhi linear approx kaam karta hai jab guess basin mein ho.

**Example 4 — Near critical point**
- *Given:* \(f(x)=x^3-2x+2\), \(f'(x)=3x^2-2\), \(x_0=0.1\).
- *Find:* Behaviour.

Method fails (division near zero) aur diverges.

*Reflection:* Derivative zero hone par algorithm break ho jaata hai; better initial guess chahiye.

## 6. Common traps and how to avoid them

| Trap                    | Why it happens                     | How to avoid it                          |
|-------------------------|------------------------------------|------------------------------------------|
| Division by zero        | \(f'(x_n)=0\) at guess             | Check derivative before update           |
| Bad initial guess       | Root ke basin se bahar             | Plot function ya try multiple starts     |
| Slow convergence        | Multiple roots ya inflection       | Switch to hybrid methods                 |
| Oscillations            | Derivative sign change             | Monitor \(|x_{n+1}-x_n|\) sequence       |
| Floating-point overflow | Large \(f\) values                 | Scale function ya use bounded iterations |
| Premature stopping      | Loose tolerance                    | Use both \(f\) and \(x\) change criteria |

## 7. The textbook-precise statement
Let \(f:\mathbb{R}\to\mathbb{R}\) be continuously differentiable on an open interval containing the root \(\xi\), with \(f(\xi)=0\) and \(f'(\xi)\neq0\). Choose an initial approximation \(x_0\) sufficiently close to \(\xi\). Define the sequence by
\[
x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)},\quad n=0,1,2,\dots
\]
Then there exists a neighbourhood of \(\xi\) such that if \(x_0\) lies in that neighbourhood the sequence converges to \(\xi\) and the convergence is quadratic, i.e.,
\[
\lim_{n\to\infty}\frac{|x_{n+1}-\xi|}{|x_n-\xi|^2}=\frac{|f''(\xi)|}{2|f'(\xi)|}.
\]
(Stewart, *Calculus*, 9e, §4.9, Newton’s Method subsection.)

## 8. Visual — diagram or schematic
```text
y
^
|          /
|         /   tangent
|        /   
|   f(x) /    
|      /      
|     /       
|    /        
|----*---------> x
     x_n   x_{n+1}
```
Tangent at \(x_n\) x-axis ko \(x_{n+1}\) par touch karti hai; vertical distance \(f(x_n)\) aur slope \(f'(x_n)\) se displacement calculate hota hai.

## 9. The memory technique
1. **The hook** — Imagine a skier (Newton) sliding down the tangent slope of a snowy hill (the curve) and stopping exactly where the slope meets flat ground (the root).
2. **What to overlearn** — Formula \(x_{n+1}=x_n-f(x_n)/f'(x_n)\); quadratic convergence rate; check \(f'\neq0\).
3. **Spaced-repetition schedule** — Review formula day 1, 3, 7, 16, 35.
4. **First-principles fallback** — Derivative definition se tangent line likho, zero set karo, algebraically solve for next x.

## 10. What this unlocks
Yeh method aapko non-linear equations ke numerical solution ka pehla practical tool deta hai jo baad mein optimisation, differential equations aur ML training mein kaam aata hai.

- Secant method aur Brent’s method (derivative-free variants)
- Newton’s method in several variables (Jacobian matrix)
- Nonlinear least-squares solvers (Levenberg-Marquardt)
- Automatic differentiation pipelines

## 11. Self-check — five questions, no answers
1. Agar \(f'(x_n)\) zero ke bilkul kareeb ho toh algorithm kya karega?
2. Do iterations manually for \(f(x)=e^x-3\) starting at \(x_0=1\).
3. Quadratic convergence ka matlab numerically kaise verify karoge?
4. Ek aisa function likho jahaan Newton-Raphson fail ho jaaye lekin root exist karta ho.
5. Agar initial guess root se 10 units door ho toh convergence guarantee rehti hai?