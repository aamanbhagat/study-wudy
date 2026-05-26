## 1. The one-sentence answer
**Product-to-sum formulas** convert products of sine and cosine functions into sums or differences of the same functions.

Yeh formulas aapko allow karte hain ki jab aapke paas sin A cos B ya cos A cos B jaisa product aaye, to usko do alag sine ya cosine terms ke sum mein badal sakein. Iska basic idea angle addition formulas se aata hai, lekin yeh reverse direction mein kaam karte hain. Aap inko use karke integrals solve kar sakte ho ya trigonometric equations ko simplify kar sakte ho bina kisi extra identity yaad kiye.

> [!NOTE]
> Sabse badi "aha" yeh hai ki yeh formulas actually addition formulas ko algebraically rearrange karke derive hote hain — koi naya magic nahi, sirf smart manipulation hai.

## 2. Why this matters — concrete and current
In signal processing, companies jaise Texas Instruments aur Analog Devices in formulas ko use karte hain modulation aur demodulation circuits mein, jahaan carrier wave aur message signal ka product sum-of-frequencies mein convert hota hai taaki filtering easy ho.

Fourier analysis mein, jo har modern ML pipeline (jaise audio classification models at Google ya OpenAI) ka backbone hai, product-to-sum identities har frequency component ko alag alag bins mein decompose karne mein madad karte hain.

Acoustics aur noise-cancellation headsets (jaise Bose QC series) mein yeh formulas beat frequencies aur interference patterns ko model karte hain, jisse real-time destructive interference calculate hoti hai.

In quantum mechanics aur NMR spectroscopy (used in pharmaceutical research at companies like Pfizer), spin interaction terms ko product-to-sum form mein laakar expectation values calculate kiye jaate hain.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Angle addition formulas for sine and cosine | Direct source of all product-to-sum identities            |
| Basic algebraic rearrangement | Formulas ko derive aur apply karne ke liye zaroori        |
| Even/odd properties of sine and cosine | Sign changes ko sahi se handle karne ke liye              |

Agar aapko angle addition formulas nahi aate, to pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from addition formulas you already know
Aap jaante ho ki sin(A + B) = sin A cos B + cos A sin B. Agar aap isko rearrange karein aur ek aur similar equation add karein, to product terms alag ho jaate hain. Yeh intuition hai: product ko sum mein todna basically do equations ko add ya subtract karne ka khel hai.

Example: sin(A + B) + sin(A − B) = 2 sin A cos B. Yeh directly dikhaata hai ki sin A cos B ka product kitna banta hai.

Formal statement:
$$
\sin A \cos B = \frac{1}{2} \bigl[ \sin(A+B) + \sin(A-B) \bigr]
$$

> [!WARNING]
> Agar aap sign galat kar dete ho (plus ki jagah minus), to poora expression flip ho jaata hai aur aage ke calculations mein galat answer aata hai.

### Step 2 — Derive the cosine-cosine case
Ab cos(A + B) = cos A cos B − sin A sin B aur cos(A − B) = cos A cos B + sin A sin B ko add karo. Dono sides add karne se sin terms cancel ho jaate hain.

Example: cos 60° cos 30° = ½ [cos 90° + cos 30°] = ½ [0 + √3/2] = √3/4.

Formal statement:
$$
\cos A \cos B = \frac{1}{2} \bigl[ \cos(A+B) + \cos(A-B) \bigr]
$$

> [!WARNING]
> Log sign error karte hain jab dono cosines negative angles ke saath aate hain; hamesha even property yaad rakho.

### Step 3 — Handle the sine-sine product
cos(A − B) − cos(A + B) = 2 sin A sin B. Isse sin A sin B ka formula nikal jaata hai.

Formal statement:
$$
\sin A \sin B = \frac{1}{2} \bigl[ \cos(A-B) - \cos(A+B) \bigr]
$$

### Step 4 — Derive the remaining mixed case
sin(A + B) − sin(A − B) = 2 cos A sin B. Isko rearrange karke cos A sin B ka formula mil jaata hai.

Formal statement:
$$
\cos A \sin B = \frac{1}{2} \bigl[ \sin(A+B) - \sin(A-B) \bigr]
$$

### Step 5 — Write all four formulas together
Ab aapke paas complete set hai. Inko ek table mein yaad rakhna best practice hai.

## 5. Worked examples — har step show karo

**Example 1 — Convert a simple product**
- *Given:* sin 3θ cos θ
- *Find:* sum form
sin 3θ cos θ = ½ [sin(3θ + θ) + sin(3θ − θ)]  
= ½ [sin 4θ + sin 2θ]  
*Why:* Direct use of first formula, no extra manipulation needed.  
**½ [sin 4θ + sin 2θ]**

*Reflection:* Yeh example basic conversion ki practice deti hai; general pattern yahi rahega.

**Example 2 — Evaluate a numerical product**
- *Given:* cos 75° cos 15°
- *Find:* exact value
cos 75° cos 15° = ½ [cos 90° + cos 60°]  
= ½ [0 + ½] = ¼  
*Why:* Angles add aur subtract kiye, phir known values substitute kiye.  
**¼**

*Reflection:* Numerical cases mein zero values helpful hote hain.

**Example 3 — Simplify before integration**
- *Given:* ∫ sin 5x cos 3x dx
- *Find:* integrable form
sin 5x cos 3x = ½ [sin 8x + sin 2x]  
Integral becomes ½ ∫ sin 8x dx + ½ ∫ sin 2x dx  
= −½·(1/8)cos 8x − ½·(1/2)cos 2x + C  
*Why:* Product ko sum mein badal kar standard integrals apply kiye.  
**−(1/16)cos 8x − (1/4)cos 2x + C**

*Reflection:* Integration mein yeh step almost mandatory hai.

**Example 4 — Solve a trigonometric equation**
- *Given:* sin 4x cos 2x = ½
- *Find:* solutions in [0, 2π)
sin 4x cos 2x = ½ [sin 6x + sin 2x] = ½  
sin 6x + sin 2x = 1  
*Why:* Product-to-sum se linear combination bani jo phir solve ki jaa sakti hai.  
**Solutions obtained by solving the sum equation**

*Reflection:* Equation solving mein yeh transformation degree kam karti hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| Wrong sign in sine-sine case| Students mix up plus/minus from addition formulas | Always derive from cos(A−B) − cos(A+B)       |
| Forgetting the ½ factor     | Direct copy-paste from addition formulas | Har baar 2 se divide karna yaad rakho        |
| Angle order reversal        | A−B aur B−A ko alag samajhna            | A−B ko consistent rakhna, order matter nahi karta lekin sign check karo |
| Applying to tan or cot directly | Formulas sirf sin/cos ke liye hain     | Pehle sin/cos mein convert karo              |
| Negative angles mishandling | Even/odd properties bhool jaana         | cos(−θ) = cos θ aur sin(−θ) = −sin θ yaad rakho |

## 7. The textbook-precise statement
The four product-to-sum identities are:

$$
\begin{align*}
\sin A\cos B &= \frac12\bigl[\sin(A+B)+\sin(A-B)\bigr],\\
\cos A\sin B &= \frac12\bigl[\sin(A+B)-\sin(A-B)\bigr],\\
\cos A\cos B &= \frac12\bigl[\cos(A+B)+\cos(A-B)\bigr],\\
\sin A\sin B &= \frac12\bigl[\cos(A-B)-\cos(A+B)\bigr].
\end{align*}
$$

These hold for all real A, B (Stewart, *Calculus*, 9e, §7.2).

## 8. Visual — diagram or schematic
```
          sin A cos B
               |
     +---------------------+
     |                     |
 sin(A+B)             sin(A-B)
   (sum)               (difference)
```
Diagram shows ek product term do sine terms ke sum aur difference mein split hota hai; arrows addition aur subtraction angles ko represent karte hain.

## 9. The memory technique
1. **The hook** — Imagine two waves multiplying; unka product becomes two new waves jo alag-alag speed se jaa rahi hain (sum aur difference frequencies).
2. **What to overlearn** — All four formulas with the ½ factor and exact sign pattern for sine-sine case.
3. **Spaced-repetition schedule** — Review after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Addition formulas se shuru karo, dono equations add/subtract karo, 2 se divide karo.

## 10. What this unlocks
Yeh formulas aapko integration of products, Fourier series coefficients, aur trigonometric equation solving mein direct entry dete hain.

- Next: Sum-to-product formulas
- Next: Integration techniques for trig products
- Next: Harmonic analysis aur frequency decomposition

## 11. Self-check — five questions, no answers
1. Convert cos 40° sin 20° into sum form.
2. Evaluate sin 105° sin 15° exactly.
3. Show that ∫ sin 7x cos 2x dx can be written as two standard integrals.
4. Identify the sign error if someone writes sin A sin B = ½ [cos(A+B) − cos(A−B)].
5. Solve 2 sin 3θ cos θ = sin 4θ for θ in [0, π/2].