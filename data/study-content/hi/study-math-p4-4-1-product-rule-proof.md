## 1. The one-sentence answer
**The product rule states that the derivative of the product of two differentiable functions equals the first function times the derivative of the second plus the second function times the derivative of the first.**

Yeh rule tab kaam aata hai jab aapko ek function jo do alag functions ka multiplication hai uska derivative nikaalna ho bina usse pehle expand kiye. Limit definition se shuru karke aap dikhate ho ki extra cross terms limit mein zero ho jaate hain kyunki dono functions differentiable hain aur isliye continuous bhi.

Aap is proof ko ek baar samajh lein toh aage ke rules jaise quotient rule aur chain rule ke derivations mein yahi technique repeat hoti hai. Proof sirf algebraic manipulation nahi hai balki yeh dikhata hai ki differentiability ka matlab kya hota hai jab functions combine hote hain.

> [!NOTE]
> Sabse badi aha yeh hai ki product rule limit ke andar ek chhota sa addition-subtraction trick se nikalti hai jo dono functions ki derivatives ko alag-alag nikaal deti hai bina unke beech interference ke.

## 2. Why this matters — concrete and current
In aerospace trajectory optimisation SpaceX ke Falcon 9 guidance algorithms product rule ka use karte hain jab thrust aur mass dono time ke saath change ho rahe hote hain taaki acceleration derivative sahi mile.

Semiconductor device modelling mein TSMC ke transistor current equations mein mobility aur carrier density ka product appear karta hai aur uska derivative bias points calculate karne ke liye zaroori hota hai.

Machine learning optimisers jaise Adam mein gradient updates ke liye second-moment estimates product of gradients aur previous moments par depend karte hain aur inka derivative back-propagation mein lagta hai.

In fundamental physics LHC experiments ke cross-section calculations mein parton distribution functions ka product liya jaata hai aur unka momentum derivative parton evolution equations mein use hota hai.

Natural phenomena mein planetary climate models temperature aur albedo ka product use karte hain aur uska time derivative feedback loops predict karta hai.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Limit definition of derivative | Product rule proof directly starts from this definition   |
| Limit laws (sum, product, constant multiple) | Needed to split and simplify the difference quotient     |
| Continuity from differentiability | Used to show that f(x+h) approaches f(x) as h approaches 0 |
| Algebraic manipulation of expressions | Core technique to rearrange terms inside the limit       |

Agar inme se koi bhi weak hai toh pehle Limits section revise karo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the definition
Aap derivative ko limit ke through define karte ho. Product function ke liye difference quotient likho aur dekho ki direct simplification mushkil hai.

Concrete example: lein f(x)=x aur g(x)=x, toh product x² hai aur aap jaante ho uska derivative 2x hai lekin abhi proof ke liye sirf definition use karo.

Formal statement:
$$
(fg)'(x)=\lim_{h\to0}\frac{f(x+h)g(x+h)-f(x)g(x)}{h}
$$

> [!WARNING]
> Agar aap yahan limit ko bina manipulate kiye chhod dete ho toh aap kabhi bhi alag-alag derivatives nahi nikaal paoge.

### Step 2 — Add and subtract a strategic term
Limit ke andar f(x+h)g(x) add aur subtract karo taaki dono functions ke differences alag ho jaayein.

Example: x aur x wale case mein yeh term x(x+h) ban jaata hai.

Formal step:
$$
\frac{f(x+h)g(x+h)-f(x)g(x)}{h}=\frac{f(x+h)g(x+h)-f(x+h)g(x)+f(x+h)g(x)-f(x)g(x)}{h}
$$

> [!WARNING]
> Galat term add karne se expression aur complicated ho jaati hai aur limits nahi nikalte.

### Step 3 — Split into two separate limits
Ab fraction ko do parts mein baanto.

Formal:
$$
f(x+h)\frac{g(x+h)-g(x)}{h}+g(x)\frac{f(x+h)-f(x)}{h}
$$

> [!WARNING]
> Agar aap yahan g(x) ki jagah g(x+h) rakh dete ho toh limit galat ho jaayega.

### Step 4 — Take limit of each part separately
Pehle part mein f(x+h) limit andar le aao kyunki woh continuous hai, doosre part mein g(x) already constant hai.

Formal:
$$
\lim_{h\to0}f(x+h)\cdot\lim_{h\to0}\frac{g(x+h)-g(x)}{h}+\lim_{h\to0}g(x)\cdot\lim_{h\to0}\frac{f(x+h)-f(x)}{h}
$$

### Step 5 — Replace limits with derivatives and continuity
Limits ko f'(x), g'(x) aur f(x) se replace karo.

Final formal result:
$$
(fg)'(x)=f(x)g'(x)+g(x)f'(x)
$$

> [!WARNING]
> Agar differentiability nahi hoti toh yeh replacement valid nahi hoti.

## 5. Worked examples — har step show karo

**Example 1 — Simple linear product**
*Given:* f(x)=x, g(x)=x
*Find:* derivative of fg using definition only
Step 1: write difference quotient → ( (x+h)(x+h) - x·x ) / h  
*Why:* direct definition apply kar rahe hain.  
Step 2: expand aur subtract-add term daalo → x·(h/h) + h·(h/h)  
*Why:* split karne ke liye.  
Step 3: limit lo → x + 0 = x  
**Final answer**  
**2x**  
*Reflection:* Yeh example sabse simple hai lekin proof ke har step ko clearly dikhata hai; general case mein bhi yahi steps repeat hote hain.

**Example 2 — Quadratic times constant**
*Given:* f(x)=x², g(x)=3
*Find:* (fg)'
Difference quotient mein g constant hone se second term zero ho jaata hai aur limit f'(x)·3 deta hai.  
**Final answer**  
**6x**  
*Reflection:* Constant factor bahar nikal aata hai jo product rule ka special case hai.

**Example 3 — Trigonometric product**
*Given:* f(x)=sin x, g(x)=cos x
*Find:* derivative of sin x cos x
Limit manipulation ke baad f'g + fg' = cos²x - sin²x milta hai.  
**Final answer**  
**cos(2x)**  
*Reflection:* Trigonometric identities final form mein madad karti hain lekin proof khud definition-based rehta hai.

**Example 4 — Exponential times polynomial**
*Given:* f(x)=e^x, g(x)=x³
*Find:* derivative using product rule after proving
Step-by-step limit split karke e^x·3x² + x³·e^x milta hai.  
**Final answer**  
**e^x(3x²+x³)**  
*Reflection:* Exponential apni derivative khud hai isliye expression clean rehta hai aur higher powers ke liye pattern dikhta hai.

## 6. Common traps and how to avoid them

| Trap | Why it happens | How to avoid it |
|------|----------------|-----------------|
| Forgetting to add-subtract the bridging term | Student directly limit lene ki koshish karta hai | Hamesha pehle f(x+h)g(x) term daalna yaad rakho |
| Replacing f(x+h) by f(x) too early | Continuity ko bhool jaana | Limit lene se pehle sirf limits ke andar hi replace karo |
| Writing g'(x) in place of g(x) in second term | Notation confusion | Har step pe function aur uski derivative alag likho |
| Assuming both functions differentiable without checking | Overconfidence | Proof se pehle dono functions differentiable hain confirm karo |
| Missing the continuity step for f(x+h) | Limit laws incomplete padhe | Continuity theorem ko proof mein explicitly likho |
| Sign error while splitting fractions | Algebraic slip | Har line ke baad expression ko dobara check karo |

## 7. The textbook-precise statement
Let f and g be functions that are differentiable at a point x. Then the product fg is differentiable at x and
$$
(fg)'(x)=f(x)g'(x)+g(x)f'(x).
$$
This is Theorem 3 in Stewart, *Calculus*, 9e, §3.4. The hypotheses require only that f and g are differentiable at the single point x; no further global assumptions are needed.

## 8. Visual — diagram or schematic
```
h→0
f(x+h) ───────┐
              │ multiply
g(x+h) ───────┤──────▶ [f(x+h)g(x+h) - f(x)g(x)] / h
              │
f(x)   ───────┘
              add-subtract f(x+h)g(x)
              split into two quotients
              take limits separately
              result: f g' + g f'
```

## 9. The memory technique
**The hook**  
Imagine two trains f and g multiplying their speeds; the total rate of change of distance product is each train’s speed times the other’s acceleration plus cross term.

**What to overlearn**  
Formula (fg)' = f g' + g f'  
Proof always begins with definition and one add-subtract step.

**Spaced-repetition schedule**  
Review proof structure after 1 day, 3 days, 7 days, 16 days, 35 days.

**First-principles fallback**  
Bhool jaayein toh wapas jaakar definition likho, f(x+h)g(x) add-subtract karo, split karo aur limits lo.

## 10. What this unlocks
Product rule proof technique aapko baaki differentiation rules samajhne ka framework deti hai.

- Quotient rule ka proof isi add-subtract method ka variation hai
- Leibniz rule for higher derivatives directly ispar build hota hai
- Partial derivatives in multivariable calculus mein product rule ka generalisation lagta hai
- Automatic differentiation libraries jaise PyTorch is rule ko computational graph mein embed karte hain

## 11. Self-check — five questions, no answers
1. Product rule ka proof definition se shuru karke teen lines mein likho.
2. Agar g(x) constant ho toh product rule kis rule mein reduce ho jaata hai?
3. Ek aisa example do jahaan dono functions differentiable hon lekin unka product ka limit step galat ho agar continuity na use ki jaaye.
4. Product rule apply karke (x²e^x)' nikaalo aur phir definition se verify karo.
5. Proof mein kaunsa step fail ho jaayega agar sirf ek function differentiable ho aur doosra sirf continuous ho?