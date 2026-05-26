## 1. The one-sentence answer
**Derivatives of sin x and cos x from first principles mean applying the limit definition of the derivative directly to these functions and simplifying with angle-addition formulas plus two standard limits.**

Aap already jaante hain ki derivative ek instantaneous rate of change deta hai. Jab aap sin x ya cos x par yeh limit lagate hain, toh direct calculation mushkil lagti hai kyunki aapke paas koi power rule ya product rule abhi nahi hai. Isliye hum sin(x+h) aur cos(x+h) ko expand karte hain, limit ko do alag parts mein todte hain, aur phir woh do famous limits (lim (sin h)/h = 1 aur lim (1 − cos h)/h = 0) use karte hain jo h→0 par prove kiye ja chuke hote hain.

Yeh approach aapko dikhaata hai ki trigonometric functions ke derivatives actually unke geometric properties se nikalte hain, koi magic nahi hai. Ek baar yeh proofs clear ho jaayein, toh aap baad mein chain rule, product rule wagairah ke saath inhe freely use kar sakte hain.

> [!NOTE]
> Sabse bada “aha” yeh hai ki sin x ka derivative cos x isliye banta hai kyunki small angle h par sin(x+h) − sin x ka dominant term h·cos x hota hai — yeh geometrically unit circle ke tangent vector se directly dikhta hai.

## 2. Why this matters — concrete and current
In orbital mechanics, NASA’s Deep Space Network trajectory software repeatedly differentiates sin and cos of true anomaly to compute instantaneous velocity vectors; any error in the first-principles limit would accumulate into meter-level position drift over interplanetary distances.

In semiconductor lithography, ASML’s EUV scanners model wavefront aberrations with Zernike polynomials whose derivatives involve sin and cos terms; the first-principles proof guarantees that the numerical differentiation step inside the control loop remains consistent with the underlying Maxwell equations at nanometer scales.

Inside modern automatic differentiation libraries such as JAX and PyTorch, the sin and cos primitives are seeded with exactly these limit-derived gradients; every neural-network training run on a transformer therefore inherits the correctness of the h→0 limit argument.

In MEMS gyroscope design at Bosch and STMicroelectronics, the Coriolis force term contains cos(ωt) whose derivative appears in the demodulation circuit equations; proving the derivative from first principles lets engineers bound the phase-error contribution to below 0.01° without relying on black-box calculus tables.

## 3. Mental prerequisites

| Concept                        | Why you need it here                                      |
|--------------------------------|-----------------------------------------------------------|
| Limit definition of derivative | Direct starting point: f'(x) = lim h→0 [f(x+h)−f(x)]/h   |
| Angle-addition formulas        | Only algebraic identity that lets you expand sin(x+h)     |
| Standard limits lim (sin h)/h = 1 and lim (1−cos h)/h = 0 | These two limits are the only non-algebraic ingredients   |
| Continuity of sin and cos      | Guarantees the limit actually exists everywhere           |

Agar upar ki koi bhi cheez abhi weak hai, toh pehle us section ko revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the definition
Derivative ka matlab hai limit of the difference quotient. Aap sirf yeh likh dete hain:
$$f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}.$$
Agar aap yeh line galat padh lein aur limit ko “derivative rule” se replace kar dein, toh pura proof cycle break ho jaata hai.

### Step 2 — Write the difference quotient for sin x
Put f(x)=sin x:
$$\frac{\sin(x+h)-\sin x}{h}.$$
Ab aapko expand karna padega; bina expansion ke limit solve nahi hota.

### Step 3 — Apply the sine addition formula
sin(x+h)=sin x cos h + cos x sin h. Isse difference quotient ban jaata hai
$$\frac{\sin x(\cos h-1)+\cos x\sin h}{h}=\sin x\cdot\frac{\cos h-1}{h}+\cos x\cdot\frac{\sin h}{h}.$$
Yeh step galat karne par aapko do alag limits nahi milenge aur proof atak jaayega.

### Step 4 — Split the limit using linearity
Limit of sum is sum of limits (provided dono exist):
$$\lim_{h\to0}\left(\sin x\cdot\frac{\cos h-1}{h}+\cos x\cdot\frac{\sin h}{h}\right)=\sin x\cdot\lim_{h\to0}\frac{\cos h-1}{h}+\cos x\cdot\lim_{h\to0}\frac{\sin h}{h}.$$

### Step 5 — Insert the two known limits
We already know
$$\lim_{h\to0}\frac{\sin h}{h}=1,\qquad\lim_{h\to0}\frac{1-\cos h}{h}=0$$
(ya equivalently lim (cos h −1)/h =0). In dono ko plug karne par
$$f'(x)=\sin x\cdot0+\cos x\cdot1=\cos x.$$

### Step 6 — Repeat the identical argument for cos x
cos(x+h)=cos x cos h − sin x sin h use karke exactly parallel steps se derivative −sin x milta hai. Last line textbook statement ban jaati hai.

## 5. Worked examples — har step show karo

**Example 1 — Derivative of sin x at x=0**
*Given:* f(x)=sin x, x=0.  
*Find:* f'(0).  
Step 1: difference quotient = (sin h − sin 0)/h = sin h / h.  
Step 2: limit h→0 = 1.  
*Why:* sin 0 =0 aur standard limit seedha lag gaya.  
**Final answer:** 1

*Reflection:* Yeh sabse simple case hai; yahin se aap dekhte hain ki slope at zero exactly 1 hai.

**Example 2 — Derivative of sin x at x=π/2**
*Given:* f(x)=sin x, x=π/2.  
*Find:* f'(π/2).  
(sin(π/2+h)−1)/h = (cos h −1 + sin(π/2)(sin h))/ wait, better: full formula gives cos(π/2)=0.  
**Final answer:** 0

*Reflection:* Maximum point par horizontal tangent ka geometric sense ab limit se confirm hota hai.

**Example 3 — General derivative of sin x**
*Given:* arbitrary x.  
*Find:* d/dx sin x.  
Follow Steps 3–5 above; every term except cos x vanishes.  
**Final answer:** cos x

*Reflection:* Ab aap general x ke liye proof de sakte hain.

**Example 4 — Derivative of cos x at x=π/6**
*Given:* f(x)=cos x.  
*Find:* f'(π/6).  
Using the parallel expansion: limit yields −sin(π/6)=−1/2.  
**Final answer:** −1/2

*Reflection:* Negative sign automatically aata hai; sign error ek common trap hai.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Replacing limit by “known derivative” | Circular reasoning                          | Always write the h→0 limit explicitly               |
| Forgetting to split the limit     | Treating the whole expression as one term   | Use linearity of limit after addition formula        |
| Sign error in cos addition formula| Memorising sin(x+h) but not cos(x+h)        | Write both formulas side-by-side before starting     |
| Using degrees instead of radians  | Calculator mode mismatch                    | All calculus limits assume radians                   |
| Dropping the cos x multiplier     | Thinking “sin h / h →1” is the whole story  | Keep the coefficient in front of every limit         |
| Assuming limit exists without proof | Over-reliance on intuition                  | Cite the two standard limits you already proved      |

## 7. The textbook-precise statement
Let f(x)=sin x. Then f is differentiable on ℝ and f′(x)=cos x. Likewise, if g(x)=cos x then g′(x)=−sin x. (Stewart, *Calculus*, 9e, §3.4, Theorem 3.)

## 8. Visual — diagram or schematic
```
Unit circle, angle x, small h
          (cos(x+h), sin(x+h))
               • 
              /|  
             / |  vertical rise = cos x * h   (approx)
            /  |  
           /   |  
          /    |  
 (cos x, sin x)•---- horizontal = -sin x * h
```
The chord vector divided by h tends to the tangent vector (−sin x, cos x).

## 9. The memory technique
1. **The hook** — Picture a unit circle where the vertical arrow for sin x is “chasing” the horizontal arrow for cos x; their 90-degree rotation gives the derivative sign flip.
2. **What to overlearn** — d(sin x)/dx = cos x and d(cos x)/dx = −sin x, both proven from the limit definition.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Write the difference quotient, insert addition formula, split limit, insert lim sin h/h =1 and lim (cos h−1)/h =0.

## 10. What this unlocks
Aap ab product rule, quotient rule, chain rule ke saath sin/cos derivatives freely combine kar sakte hain. Yeh aage jaakar Taylor series, differential equations (simple harmonic motion), Fourier analysis, aur Laplace transforms ke liye foundation banta hai.

- Derivatives of tan x, sec x, csc x, cot x
- Derivatives of inverse trig functions
- Taylor expansion of sin and cos around any point
- Solving y″ + y =0 with initial conditions

## 11. Self-check — five questions, no answers
1. Using only the limit definition, compute the derivative of sin x at x=π/4 without quoting the final formula.
2. Show that the same two standard limits also give d(cos x)/dx = −sin x at an arbitrary point.
3. Identify the exact algebraic step where the proof would collapse if lim (sin h)/h were not equal to 1.
4. A student writes (sin(x+h)−sin x)/h → cos(x+h) − cos x as h→0. What mistake has occurred?
5. Derive the derivative of sin(3x) from first principles (no chain rule) and verify it matches 3 cos(3x).