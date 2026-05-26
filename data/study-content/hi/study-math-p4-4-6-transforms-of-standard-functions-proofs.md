## 1. The one-sentence answer
**Transforms of standard functions — proofs** ka matlab hai Laplace transform ke definition se directly derive karna ki common functions (constant, \(t^n\), \(e^{at}\), \(\sin(at)\), \(\cos(at)\)) ke transforms kya hote hain.

Yeh proofs aapko rote memorization se bachate hain. Jab aap definition \(\mathcal{L}\{f(t)\} = \int_0^\infty e^{-st}f(t)\,dt\) ko har function par apply karte ho, to limit evaluation aur integration by parts ke through exact closed-form expressions milte hain jo ODE solving mein bar-bar kaam aate hain.

In proofs mein convergence conditions (jaise \(s > a\)) bhi clearly dikhte hain, jo practical problems mein transform ko valid banate hain.

> [!NOTE]
> Sabse badi “aha” yeh hai ki ek hi integral definition se saare standard transforms nikal aate hain — koi alag-alag formulas yaad karne ki zarurat nahi padti.

## 2. Why this matters — concrete and current
SpaceX ke Falcon 9 booster landing guidance mein real-time Laplace-domain transfer functions use hote hain; unke engineers standard exponential aur ramp inputs ke transforms prove karke closed-loop poles calculate karte hain.

Texas Instruments ke power-electronics team switched-mode power supply controllers design karte waqt \(\mathcal{L}\{\sin(\omega t)\}\) aur \(\mathcal{L}\{t\}\) ke proofs se ripple current equations derive karte hain jo datasheet equations ban jaate hain.

MIT’s 6.003 Signals and Systems course (jo ab online public hai) mein har semester students in proofs ko use karke RC circuit differential equations ko algebraic equations mein badalte hain, phir inverse transform karke time-domain response nikaalte hain.

Semiconductor foundries mein process-control ODEs (temperature, pressure) ko Laplace domain mein solve karne ke liye \(e^{-at}\) aur polynomial inputs ke transforms ki proofs daily reference documents mein cite kiye jaate hain.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Improper integral    | Laplace transform khud ek improper integral hai           |
| Integration by parts | Higher powers aur exponential functions ke liye zaruri    |
| Limit evaluation at infinity | Convergence region (s > a) prove karne ke liye         |
| Trigonometric identities | Sine aur cosine transforms ke liye                        |

Agar aap inme se kisi ek ko comfortably nahi kar pa rahe, to pehle us concept ko revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Definition as the single source of truth
Laplace transform ka definition hi sab kuch hai: \(\mathcal{L}\{f(t)\}=\int_0^\infty e^{-st}f(t)\,dt\). Iska matlab yeh hai ki har standard function ke liye sirf yeh integral evaluate karna hai.

Example: \(f(t)=1\) (constant function).  
Formal statement:  
\[
\mathcal{L}\{1\}=\int_0^\infty e^{-st}\,dt=\lim_{b\to\infty}\left[-\frac{e^{-st}}{s}\right]_0^b=\frac{1}{s},\quad s>0.
\]

> [!WARNING]
> Agar aap limit evaluate karna bhool jaayein to convergence condition (s > 0) gayab ho jaayegi aur result galat domain mein use ho sakta hai.

### Step 2 — Integration by parts for polynomial growth
Jab \(f(t)=t\), to direct integration mushkil hai; integration by parts lagate hain with \(u=t\), \(dv=e^{-st}dt\).

Example:  
\[
\mathcal{L}\{t\}=\int_0^\infty t e^{-st}\,dt=\frac{1}{s^2},\quad s>0.
\]

> [!WARNING]
> Boundary term at infinity galat evaluate karne se (especially s ≤ 0) answer zero ya infinity aa jaata hai.

### Step 3 — Shifting theorem for exponentials
\(f(t)=e^{at}\) daalne par \(e^{-st}e^{at}=e^{-(s-a)t}\) ban jaata hai, jo Step 1 jaisa hi integral hai lekin s replaced by (s−a).

Formal result:  
\[
\mathcal{L}\{e^{at}\}=\frac{1}{s-a},\quad s>a.
\]

### Step 4 — Complex exponentials for sine and cosine
\(\sin(at)=\frac{e^{iat}-e^{-iat}}{2i}\) use karke linearity apply karte hain.

Result:  
\[
\mathcal{L}\{\sin(at)\}=\frac{a}{s^2+a^2},\quad s>0.
\]

### Step 5 — Linearity and final general statement
Saare proofs linearity property \(\mathcal{L}\{af+bg\}=a\mathcal{L}\{f\}+b\mathcal{L}\{g\}\) par khatam hote hain, jo ek textbook-grade theorem ban jaata hai.

## 5. Worked examples — har step show karo

**Example 1 — Constant function**  
*Given:* \(f(t)=1\)  
*Find:* \(\mathcal{L}\{1\}\)  
Step 1: Definition likho \(\int_0^\infty e^{-st}\cdot1\,dt\).  
Step 2: Antiderivative \(-\frac{1}{s}e^{-st}\).  
Step 3: Limits [0,b] laga ke b→∞ karo → 1/s.  
*Why:* Har step definition se direct aata hai.  
**Final answer**  
\[\frac{1}{s}\ (s>0)\]

*Reflection:* Yeh sabse simple case hai; convergence clearly dikhta hai.

**Example 2 — Linear function**  
*Given:* \(f(t)=t\)  
*Find:* \(\mathcal{L}\{t\}\)  
Integration by parts: u=t, dv=e^{-st}dt → du=dt, v=-e^{-st}/s.  
Boundary term at ∞ vanishes for s>0.  
Remaining integral gives 1/s².  
**Final answer**  
\[\frac{1}{s^2}\ (s>0)\]

*Reflection:* Integration by parts ka pattern yahin se shuru hota hai jo higher powers ke liye generalize hoga.

**Example 3 — Exponential**  
*Given:* \(f(t)=e^{2t}\)  
*Find:* \(\mathcal{L}\{e^{2t}\}\)  
Direct substitution yields integral of e^{-(s-2)t}.  
**Final answer**  
\[\frac{1}{s-2}\ (s>2)\]

*Reflection:* Shifting theorem ka pehla practical demonstration.

**Example 4 — Sine function**  
*Given:* \(f(t)=\sin(3t)\)  
*Find:* \(\mathcal{L}\{\sin(3t)\}\)  
Use Euler form, linearity, aur Step 3.  
**Final answer**  
\[\frac{3}{s^2+9}\ (s>0)\]

*Reflection:* Trigonometric cases complex numbers ke through sabse clean solve hote hain.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| Forgetting s > a condition  | Limit evaluation skip kar dete hain     | Har proof ke end mein explicitly likho       |
| Sign error in integration by parts | u aur dv galat choose karte hain     | Table bana ke u, dv, du, v likho pehle       |
| Applying result for s ≤ 0   | Domain check nahi karte                 | Transform use karne se pehle s range verify karo |
| Missing linearity step      | Multiple terms ko alag-alag treat karte hain | Pehle linearity theorem yaad kar lo         |
| Confusing L{sin} aur L{cos} | Formulas mix ho jaate hain              | Derivation se yaad rakho, rote mat karo      |

## 7. The textbook-precise statement
Let f be continuous on [0,∞) and of exponential order. Then the Laplace transform of the constant function 1, the monomial t^n (n positive integer), the exponential e^{at}, and the sinusoids sin(at), cos(at) are given by the following expressions, each valid in the indicated half-plane (Boyce & DiPrima, *Elementary Differential Equations*, 11e, §6.1, Theorem 1 and subsequent derivations):

\[
\mathcal{L}\{1\}=\frac{1}{s},\quad\operatorname{Re}(s)>0;
\]
\[
\mathcal{L}\{t^n\}=\frac{n!}{s^{n+1}},\quad\operatorname{Re}(s)>0;
\]
\[
\mathcal{L}\{e^{at}\}=\frac{1}{s-a},\quad\operatorname{Re}(s)>a;
\]
\[
\mathcal{L}\{\sin(at)\}=\frac{a}{s^2+a^2},\quad\operatorname{Re}(s)>0;
\]
\[
\mathcal{L}\{\cos(at)\}=\frac{s}{s^2+a^2},\quad\operatorname{Re}(s)>0.
\]

## 8. Visual — diagram or schematic
```
s-plane (Re axis horizontal)
          |
          |     ROC for e^{at} (Re(s)>a)
   a ---->|-------------------
          |   right half-plane
          |
   0 ---->|------------------- Re(s)
          |
```
Vertical line Re(s)=a right side wala region valid hota hai.

## 9. The memory technique

1. **The hook** — Socho ek rocket jo s naam ke “gravity field” mein ja raha hai; e^{-st} us rocket ko zero ki taraf khinchta hai, aur integral us “total pull” ko measure karta hai.
2. **What to overlearn** — \(\mathcal{L}\{1\}=1/s\), \(\mathcal{L}\{t^n\}=n!/s^{n+1}\), aur convergence condition s>a.
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Definition likho, integration by parts lagao, infinity limit lo.

## 10. What this unlocks
Yeh proofs aapko Laplace transform method se ODEs solve karne, transfer functions banane, aur control-theory stability check karne ke liye taiyar karte hain.

- Next: Convolution theorem
- Inverse Laplace via partial fractions
- Laplace of derivatives (L{y'}, L{y''})
- Transfer-function algebra in feedback systems

## 11. Self-check — five questions, no answers
1. Prove \(\mathcal{L}\{t^2\}\) from definition using integration by parts twice.
2. For which values of s does \(\mathcal{L}\{e^{3t}\}\) converge?
3. Derive \(\mathcal{L}\{\cos(at)}\) using Euler’s formula.
4. Ek student ne \(\mathcal{L}\{e^{-2t}\}=1/(s+2)\) likha lekin s>−2 ki jagah s>2 likh diya. Kya galti hai?
5. Linearity ka use karke \(\mathcal{L}\{3-5\sin(2t)\}\) nikaalo.