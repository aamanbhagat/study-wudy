## 1. The one-sentence answer
**Functions ke alag-alag types unke algebraic structure aur graph ke shape se define hote hain.**

Constant function ek fixed value deta hai har input ke liye. Linear function straight line banata hai jisme slope constant rehta hai. Quadratic aur higher polynomial functions curves banate hain jinke degree se unka behaviour decide hota hai. Rational functions fractions mein polynomials hote hain aur vertical/horizontal asymptotes dikha sakte hain. Radical functions root ke andar expressions rakhte hain, jisse domain restrict hoti hai. Piecewise functions alag-alag intervals par alag rules follow karte hain. Yeh classification aapko bataati hai ki function ka graph kaise dikhega aur uske domain-range kya honge.

Yeh types ek dusre se build hote hain: constant linear ka special case hai, quadratic polynomial ka degree-2 case hai, aur baaki types in basic forms ko combine karke banate hain. Aap jab inhe pehchaante hain to function ke long-term behaviour (jaise infinity par kya hota hai) ko jaldi predict kar sakte hain.

> [!NOTE]
> Sabse badi aha yeh hai ki har type ka equation directly uske graph ke key features (slope, vertex, asymptote, discontinuity) ko control karta hai — equation dekh kar graph mentally sketch karna possible ho jaata hai.

## 2. Why this matters — concrete and current
Linear aur quadratic functions spacecraft trajectory planning mein use hote hain, jaise SpaceX Falcon 9 ke ascent phase mein drag aur thrust modelling ke liye low-order polynomials fit kiye jaate hain. Polynomial aur rational functions semiconductor device physics mein current-voltage curves ko model karte hain, jaise TSMC ke transistor models mein. Radical functions signal processing mein square-root compression algorithms mein aate hain jo audio hardware (jaise Sony Walkman DSP chips) mein noise floor handle karte hain. Piecewise functions machine learning mein ReLU activation ke roop mein dikhte hain, jo Google TensorFlow library ke core neural network layers mein implement hote hain. Constant functions fundamental physics constants (jaise Planck's constant) ko represent karte hain jab system steady-state mein hota hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Domain and range     | Har type ka domain alag tarah restrict hota hai           |
| Evaluating expressions | Function ko plug-in karke value nikaalna zaroori hai      |
| Basic graphing       | Linear aur quadratic ke graphs mentally visualize karne ke liye |

Agar domain-range ya expression evaluation weak hai to pehle wahi revise karo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Constant functions as the simplest case
Constant function ka matlab hai output hamesha ek hi number rehta hai, chahe input kuch bhi ho. Iska graph ek horizontal line hota hai.  
Example: \(f(x) = 5\) har x ke liye 5 deta hai.  
Formal statement:  
$$f(x) = c \quad \text{where } c \in \mathbb{R}$$  
> [!WARNING]
> Agar aap isko variable maanke slope nikaalne ki koshish karoge to pura structure toot jaayega kyunki slope zero hai.

### Step 2 — Linear functions introduce constant rate of change
Linear function mein har unit change in x ke saath y mein fixed change hota hai. Iska graph straight line hota hai.  
Example: \(f(x) = 2x + 3\).  
Formal statement:  
$$f(x) = mx + b \quad (m \neq 0)$$  
> [!WARNING]
> Slope m ko zero mat lena warna yeh constant ban jaayega aur aap linear behaviour miss kar doge.

### Step 3 — Quadratic functions add curvature
Quadratic mein ek squared term aata hai jo parabola banata hai. Vertex aur axis of symmetry appear karte hain.  
Example: \(f(x) = x^2 - 4x + 3\).  
Formal statement:  
$$f(x) = ax^2 + bx + c \quad (a \neq 0)$$  
> [!WARNING]
> Agar aap leading coefficient ko ignore karoge to opening direction (up ya down) galat predict hoga.

### Step 4 — Polynomial functions generalise degree
Polynomial ek ya zyada terms ke powers ka sum hota hai. Degree highest power se decide hoti hai.  
Formal statement:  
$$f(x) = a_n x^n + a_{n-1} x^{n-1} + \dots + a_0 \quad (a_n \neq 0)$$  
> [!WARNING]
> Degree galat count karne se end behaviour (infinity par) samajh mein nahi aayega.

### Step 5 — Rational functions introduce division
Rational function do polynomials ka ratio hota hai. Vertical asymptotes aur holes ban sakte hain.  
Formal statement:  
$$f(x) = \frac{p(x)}{q(x)} \quad (q(x) \neq 0)$$  
> [!WARNING]
> Denominator zero hone par function undefined ho jaata hai — domain check karna bhoolna common galti hai.

### Step 6 — Radical functions restrict domain via roots
Radical function mein root ke andar expression hota hai. Domain non-negative values tak limited hoti hai.  
Example: \(f(x) = \sqrt{x-2}\).  
Formal statement:  
$$f(x) = \sqrt[n]{g(x)} \quad (g(x) \geq 0 \text{ for even } n)$$  
> [!WARNING]
> Even root ke liye negative input daalne se real numbers mein function exist nahi karta.

### Step 7 — Piecewise functions combine rules across intervals
Piecewise function alag-alag parts mein alag expressions use karta hai.  
Formal statement:  
$$f(x) = \begin{cases} 
expression_1 & x \in I_1 \\
expression_2 & x \in I_2 
\end{cases}$$  
> [!WARNING]
> Interval boundaries par continuity check karna bhoolna graph mein jumps create kar deta hai.

### Step 8 — Textbook-grade classification
Upar ke steps ko combine karke koi bhi function in categories mein daal sakte hain by inspecting its algebraic form.

## 5. Worked examples — har step show karo

**Example 1 — Identify constant vs linear**  
*Given:* \(f(x) = 7\)  
*Find:* Type and graph feature  
Step 1: Output fixed dekha → constant.  
Step 2: No x term → slope zero.  
**Constant function**  
*Reflection:* Yeh example isliye simple thi kyunki koi variable nahi tha; general rule: agar sirf number dikhe to constant.

**Example 2 — Quadratic identification**  
*Given:* \(f(x) = -2x^2 + 5x\)  
*Find:* Type aur leading term  
Step 1: Highest power 2 dekha.  
Step 2: Coefficient -2 ≠ 0.  
**Quadratic function**  
*Reflection:* Negative leading coefficient se graph downward khulta hai — yeh generalise hota hai saare quadratics par.

**Example 3 — Rational with domain**  
*Given:* \(f(x) = \frac{x+1}{x-3}\)  
*Find:* Type aur restricted points  
Step 1: Division dekha → rational.  
Step 2: Denominator zero at x=3.  
**Rational function, domain all reals except 3**  
*Reflection:* Har rational mein denominator zero wale points exclude karna padta hai.

**Example 4 — Piecewise evaluation**  
*Given:*  
$$f(x) = \begin{cases} x^2 & x < 1 \\ 2x+1 & x \geq 1 \end{cases}$$  
*Find:* f(0) and f(2)  
Step 1: 0 < 1 → first piece use kiya → 0.  
Step 2: 2 ≥ 1 → second piece use kiya → 5.  
**f(0) = 0, f(2) = 5**  
*Reflection:* Boundary par rule change hota hai isliye interval check zaroori hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                     | How to avoid it                          |
|-----------------------------|------------------------------------|------------------------------------------|
| Degree galat count karna    | Lower terms ko highest maanna      | Sirf highest power wale term ko dekho    |
| Rational mein zero ignore   | Denominator zero bhool jaana       | Hamesha q(x)=0 solve karke domain likho  |
| Piecewise boundary galti    | Interval sign galat padhna         | Boundary points alag se test karo        |
| Radical negative input      | Even root negative allow karna     | Domain condition pehle check karo        |
| Linear ko constant bolna    | Slope zero wala case miss karna    | m=0 check karo pehle                     |
| Polynomial end behaviour    | Degree aur leading sign bhoolna    | Degree aur sign of a_n yaad rakho        |

## 7. The textbook-precise statement
A function f is classified according to the form of its defining expression: constant if f(x)=c for some real c; linear if f(x)=mx+b with m≠0; quadratic if f(x)=ax²+bx+c with a≠0; polynomial of degree n if f(x)=aₙxⁿ+⋯+a₀ with aₙ≠0; rational if f(x)=p(x)/q(x) where p and q are polynomials, q≠0; radical if f involves an nth root of a polynomial expression; piecewise if the rule changes across different intervals of the domain. (Sullivan, *Precalculus*, 11e, §2.3–2.6)

## 8. Visual — diagram or schematic
```text
y
↑
|          / rational (asymptote)
|   quad /  
|     /   \
| lin/     \   piecewise jump
|   /       \
|  /  const __|________
| /_______________→ x
 radical (starts at 2)
```
Horizontal line = constant; straight rising line = linear; parabola = quadratic; curve with vertical asymptote = rational; curve starting at x=2 = radical; broken line with jump = piecewise.

## 9. The memory technique
1. **The hook** — Imagine a staircase: bottom step constant (flat), next linear (straight ramp), then quadratic (curved slide), higher steps polynomials, a broken bridge for rational/radical, and finally a road that splits for piecewise.
2. **What to overlearn** — Degree = highest power; rational = fraction of polynomials; even root domain ≥0.
3. **Spaced-repetition schedule** — Review 1 day later, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Equation dekho, highest power aur operators count karo, domain check karo.

## 10. What this unlocks
Yeh classification aapko limits, continuity, aur derivatives ke liye taiyaar karti hai.  
- Next: Function transformations (shifts, stretches)  
- Next: Inverse functions  
- Next: Exponential aur logarithmic functions  
- Next: Trigonometric functions  

## 11. Self-check — five questions, no answers
1. \(f(x)=4-3x\) kis type ka function hai?  
2. \(f(x)=\frac{2}{x^2-1}\) ka domain kya hai?  
3. Piecewise function mein x=0 par value nikaalne ke liye kaunsa piece use karoge agar rules x<0 aur x≥0 par defined hain?  
4. Quadratic \(f(x)=-x^2+6x\) ka vertex kis direction mein khulta hai?  
5. Radical \(f(x)=\sqrt[3]{x+5}\) ka domain kya hai aur isme even-root restriction kyun nahi hai?