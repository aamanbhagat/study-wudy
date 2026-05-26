## 1. The one-sentence answer
**Half-angle formulas express sine, cosine and tangent of \(\theta/2\) directly in terms of functions of \(\theta\), and they are obtained by algebraic rearrangement of the double-angle identities.**

Aap already double-angle formulas jaante honge: \(\cos\theta = 2\cos^2(\theta/2)-1\) aur \(\cos\theta = 1-2\sin^2(\theta/2)\). In equations ko \(\theta/2\) ke liye solve karne se hi half-angle expressions ban jaate hain. Yeh derivation koi naya axiom nahi hai; yeh sirf existing identities ka careful algebraic manipulation hai.

Iska matlab yeh hai ki ek hi double-angle relation se teen alag half-angle formulas nikalte hain, aur har formula mein sign \(\pm\) angle ke quadrant par depend karta hai. Jab aap in formulas ko derive karte ho, to aap actually dekh rahe hote ho ki trigonometric identities ek interconnected family hain.

> [!NOTE]
> Sabse badi aha yeh hai ki double-angle formula ko “reverse” karne se half-angle mil jaata hai; koi alag se memorise karne wali cheez nahi hai.

## 2. Why this matters — concrete and current
In orbital mechanics, NASA’s SPICE toolkit half-angle formulas use karta hai jab spacecraft ke attitude quaternions se Euler angles nikaalte hain; yeh step rotation matrices ke beech conversion mein numerical stability deta hai.

Semiconductor lithography machines (ASML ke EUV steppers) mein wavefront aberrations ko model karne ke liye Zernike polynomials ke coefficients calculate karte waqt half-angle identities lagti hain, kyunki phase errors ko half-aperture angles mein express karna padta hai.

In rigid-body dynamics simulation software (MuJoCo, used by DeepMind aur Boston Dynamics), joint angles ke sine-cosine values ko double-angle se half-angle mein convert karke torque calculations ko faster aur stable banaya jaata hai.

Radio-astronomy arrays (Square Kilometre Array project) baseline correlations mein geometric delay ko phase angle ke half mein represent karte hain; isse visibility function ka computation direct half-angle expressions se hota hai.

## 3. Mental prerequisites

| Concept                    | Why you need it here                                      |
|----------------------------|-----------------------------------------------------------|
| Double-angle cosine identities | Direct starting point for all three half-angle derivations |
| Pythagorean identity \(\sin^2\phi+\cos^2\phi=1\) | Used to obtain the square-root forms and sign choices     |
| Concept of reference angle and quadrant signs | Determines whether \(\pm\) is taken in each half-angle formula |

Agar upar ke teenon mein se koi bhi weak hai to pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start from the double-angle cosine identity
Double-angle formula \(\cos\theta=2\cos^2(\theta/2)-1\) already \(\theta\) aur \(\theta/2\) ko relate karta hai. Iska seedha matlab yeh hai ki agar aap \(\theta\) jaante ho to \(\cos(\theta/2)\) nikaal sakte ho.

Example: let \(\theta=60^\circ\), to \(\cos60^\circ=1/2\). Equation ban jaati hai \(1/2=2\cos^230^\circ-1\).

Formal statement:
\[
\cos\theta=2\cos^2(\theta/2)-1
\]

> [!WARNING]
> Agar aap yahan sign galat laga dete ho (jaise negative root le lete ho jab angle acute ho) to baaki saare numerical answers flip ho jaate hain.

### Step 2 — Isolate the squared term
Pichhle equation ko rearrange karo:
\[
2\cos^2(\theta/2)=1+\cos\theta \implies \cos^2(\theta/2)=\frac{1+\cos\theta}{2}.
\]

### Step 3 — Take square root with sign
Ab square root lo:
\[
\cos(\theta/2)=\pm\sqrt{\frac{1+\cos\theta}{2}}.
\]
Sign decide karne ke liye \(\theta/2\) ka quadrant dekho.

### Step 4 — Repeat for sine using the complementary double-angle form
Ab \(\cos\theta=1-2\sin^2(\theta/2)\) se start karo aur exactly same steps follow karo.

### Step 5 — Derive tangent half-angle (two common forms)
Divide the sine and cosine half-angle expressions:
\[
\tan(\theta/2)=\frac{\sin(\theta/2)}{\cos(\theta/2)}=\frac{1-\cos\theta}{\sin\theta}=\frac{\sin\theta}{1+\cos\theta}.
\]

### Step 6 — Textbook-grade statement
Jab aap upar ke saare steps ek saath likhte ho to aapko three standard half-angle formulas milte hain jo har advanced trigonometry text mein appear karte hain.

## 5. Worked examples — har step show karo

**Example 1 — Basic cosine half-angle**
*Given:* \(\cos\theta=3/5\), \(\theta\) acute.  
*Find:* \(\cos(\theta/2)\).  
Step 1: Double-angle se \(\cos\theta=2\cos^2(\theta/2)-1\) likho.  
Step 2: \(3/5+1=8/5=2\cos^2(\theta/2)\).  
Step 3: \(\cos^2(\theta/2)=4/5\).  
Step 4: \(\cos(\theta/2)=\sqrt{4/5}=2/\sqrt{5}\) (positive kyunki \(\theta/2\) bhi acute).  
**\(2/\sqrt{5}\)**

*Reflection:* Yeh example sirf positive root ki practice karata hai.

**Example 2 — Sine half-angle with sign choice**
*Given:* \(\cos\theta=-5/13\), \(\theta\) in quadrant II.  
*Find:* \(\sin(\theta/2)\).  
Step 1: \(1-(-5/13)=18/13=2\sin^2(\theta/2)\).  
Step 2: \(\sin^2(\theta/2)=9/13\).  
Step 3: \(\sin(\theta/2)=\pm3/\sqrt{13}\). \(\theta/2\) quadrant I mein hai, isliye positive.  
**\(3/\sqrt{13}\)**

*Reflection:* Sign galti yahin hoti hai jab quadrant ignore kar diya jaaye.

**Example 3 — Tangent half-angle (first form)**
*Given:* \(\sin\theta=8/17\), \(\cos\theta=15/17\).  
*Find:* \(\tan(\theta/2)\).  
Use \(\tan(\theta/2)=(1-\cos\theta)/\sin\theta\):  
\((1-15/17)/(8/17)= (2/17)/(8/17)=1/4\).  
**\(1/4\)**

*Reflection:* Dono forms se same answer aana chahiye; cross-check karo.

**Example 4 — Nested half-angle**
*Given:* \(\cos\theta=0.6\). Find exact value of \(\cos(\theta/4)\).  
Pehle \(\cos(\theta/2)=\sqrt{(1+0.6)/2}=\sqrt{0.8}\).  
Phir usi formula ko \(\theta/2\) par apply karo: \(\cos(\theta/4)=\sqrt{(1+\sqrt{0.8})/2}\).  
**\(\sqrt{(1+\sqrt{0.8})/2}\)**

*Reflection:* Yeh dikhata hai ki formulas recursively apply ho sakte hain.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Forgetting the \(\pm\) sign       | Students treat square root as always positive | Har baar quadrant table check karo           |
| Using wrong double-angle starting form | Confusion between \(2\cos^2-1\) aur \(1-2\sin^2\) | Explicitly likho kaunsa form use kar rahe ho |
| Algebraic slip in numerator       | 1 + cos ko 1 − cos kar dete hain            | Formula ko pehle se yaad rakh lo             |
| Applying formula when \(\cos\theta=-1\) | Denominator zero ho jaata hai               | Domain check karo pehle                        |
| Mixing degree-radian mode         | Calculator answer galat aata hai            | Hamesha mode note kar lo                       |
| Overwriting original angle        | \(\theta\) aur \(\theta/2\) ko interchange kar dete hain | Variables ko clearly rename karo             |

## 7. The textbook-precise statement
Let \(\theta\) be any real number. Then
\[
\sin\frac\theta2=\pm\sqrt{\frac{1-\cos\theta}2},\qquad
\cos\frac\theta2=\pm\sqrt{\frac{1+\cos\theta}2},\qquad
\tan\frac\theta2=\frac{1-\cos\theta}{\sin\theta}=\frac{\sin\theta}{1+\cos\theta},
\]
where the sign in each square-root expression is chosen according to the quadrant containing \(\theta/2\). (Stewart, *Calculus*, 9e, §7.2, identities 7a–7c.)

## 8. Visual — diagram or schematic
```
          θ
     +---------+
    /           \
   /      θ/2    \
  sinθ           cosθ
   \             /
    \           /
     +---------+
```
Horizontal line \(\theta\) ko represent karti hai; uske aadhe angle \(\theta/2\) ke liye sine aur cosine values upar aur neeche half-angle formulas se nikalti hain.

## 9. The memory technique

1. **The hook**  
   Socho double-angle ek “mirror” hai; half-angle mirror ke peeche jaane wala step hai.

2. **What to overlearn**  
   - \(\cos\theta=2\cos^2(\theta/2)-1\)  
   - \(\cos\theta=1-2\sin^2(\theta/2)\)  
   - Sign choice rule by quadrant

3. **Spaced-repetition schedule**  
   1 din, 3 din, 7 din, 16 din, 35 din.

4. **First-principles fallback**  
   Agar formula bhool jaaye to double-angle cosine identity likho aur usko \(\theta/2\) ke liye solve karo.

## 10. What this unlocks
Yeh formulas aapko multiple-angle aur power-reduction identities tak le jaate hain jo integration aur Fourier series mein kaam aate hain.

- Power-reduction formulas for \(\sin^n\theta\)
- Weierstrass substitutions in calculus
- Exact value tables for 15°, 22.5°, 75° angles
- Recursive algorithms in computer graphics rotation matrices

## 11. Self-check — five questions, no answers
1. \(\cos\theta=-0.8\) ho to \(\sin(\theta/2)\) ka exact value kya hoga (quadrant I)?

2. Prove karo ki \(\tan(\theta/2)=\frac{\sin\theta}{1+\cos\theta}\) aur \(\frac{1-\cos\theta}{\sin\theta}\) dono equal hain.

3. \(\theta=120^\circ\) ke liye \(\cos(\theta/4)\) calculate karo aur quadrant check karo.

4. Agar aap \(\cos(\theta/2)\) nikaalte waqt negative sign le lete ho jab \(\theta/2\) acute hai, to final numerical answer mein kya galti aayegi?

5. Derive the half-angle formula for tangent starting only from the sine and cosine double-angle identities without memorising the tangent form.