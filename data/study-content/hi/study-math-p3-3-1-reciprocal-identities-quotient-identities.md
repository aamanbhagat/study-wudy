## 1. The one-sentence answer
**Reciprocal identities aur quotient identities trigonometric functions ke beech fundamental relationships hain jo har function ko uske inverse ya ratio ke through express karte hain.**

Iska matlab yeh hai ki sine, cosine, aur tangent jaise functions ko aap unke reciprocals (cosecant, secant, cotangent) ya unke ratios se link kar sakte ho bina kisi extra information ke. Yeh identities basic definitions se directly nikalti hain aur aapko expressions ko simplify karne, equations solve karne, aur complex trigonometric problems ko break down karne mein madad karti hain. Ek baar yeh clear ho jaaye toh aap har trigonometric expression ko uske core ratios mein tod sakte ho.

> [!NOTE]
> Sabse bada "aha" yeh hai ki yeh identities koi naye rules nahi hain — yeh sirf definition of sine, cosine, aur tangent ko alag-alag tarike se likhne ka tareeka hain, isliye yeh hamesha true rehte hain.

## 2. Why this matters — concrete and current
In orbital mechanics, NASA ke trajectory calculations mein engineers reciprocal identities ka use karke sine aur cosine ke reciprocals ko handle karte hain jab velocity vectors ko angular components mein convert karte hain, jaise Kepler’s laws ke numerical solvers mein.

Machine learning models jo signal processing par based hain, jaise Google ke audio classification networks, quotient identities se trigonometric ratios ko normalize karte hain taaki phase information loss na ho.

Semiconductor design mein, EDA tools jaise Synopsys ke simulators quotient identities apply karte hain jab electromagnetic wave equations ko discretize karte hain, kyunki yeh tan aur cot ke ratios ko efficient computational paths mein badalte hain.

Fundamental physics experiments, jaise LIGO ke gravitational wave detection mein, reciprocal identities help karte hain jab detector angles ko time-series data se map karte hain bina floating-point overflow ke.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Definition of sin, cos, tan | Yeh identities directly inhi definitions se derive hoti hain |
| Unit circle            | Ratios aur reciprocals ko geometrically visualise karne ke liye |
| Domain restrictions    | Zero division aur undefined values ko identify karne ke liye |

Agar upar wale concepts clear nahi hain toh pehle basic right-triangle trigonometry revise karo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Start with the three primary ratios
Sine, cosine, aur tangent ko right triangle ya unit circle se define karte hain. In ratios ko aap alag-alag names de sakte ho.  
Example: 30° ke liye sin 30° = 1/2, cos 30° = √3/2, tan 30° = 1/√3.  
Formal statement:  
$$ \sin\theta = \frac{\text{opposite}}{\text{hypotenuse}}, \quad \cos\theta = \frac{\text{adjacent}}{\text{hypotenuse}}, \quad \tan\theta = \frac{\text{opposite}}{\text{adjacent}} $$  
> [!WARNING]
> Agar aap yeh ratios galat define karoge toh baaki saari identities collapse ho jaayengi.

### Step 2 — Introduce the three reciprocal functions
Har primary function ka reciprocal naya function ban jaata hai.  
Example: sin 30° = 1/2 toh uska reciprocal 2 hai, jise cosec 30° kehte hain.  
Formal statement:  
$$ \csc\theta = \frac{1}{\sin\theta}, \quad \sec\theta = \frac{1}{\cos\theta}, \quad \cot\theta = \frac{1}{\tan\theta} $$

### Step 3 — Write the reciprocal identities explicitly
Ab upar wale ko identity form mein likho.  
Example: sin θ · csc θ = 1 har θ ke liye jahaan sin θ ≠ 0.  
Formal statement:  
$$ \sin\theta \cdot \csc\theta = 1, \quad \cos\theta \cdot \sec\theta = 1, \quad \tan\theta \cdot \cot\theta = 1 $$

### Step 4 — Move to quotient relationships
Tan aur cot ko primary functions ke ratios se likho.  
Example: tan 45° = 1, jo sin 45° / cos 45° = (√2/2) / (√2/2) = 1 se match karta hai.  
Formal statement:  
$$ \tan\theta = \frac{\sin\theta}{\cos\theta}, \quad \cot\theta = \frac{\cos\theta}{\sin\theta} $$

### Step 5 — Combine both families into one set
Reciprocal aur quotient identities ko saath mein use karke kisi bhi trig expression ko rewrite karo.  
Formal statement (textbook form):  
$$ \sin\theta = \frac{1}{\csc\theta},\quad \tan\theta = \frac{\sin\theta}{\cos\theta} $$  
(with all six functions defined wherever the denominators are nonzero).

## 5. Worked examples — har step show karo

**Example 1 — Simplify a basic product**  
*Given:* sin θ · csc θ  
*Find:* simplified value  
Step 1: csc θ ko 1/sin θ se replace karo.  
*Why:* reciprocal identity directly apply hoti hai.  
Step 2: sin θ · (1/sin θ) = 1.  
**1**  

*Reflection:* Yeh example isliye simple thi kyunki sirf ek identity lagi; yeh pattern har reciprocal pair mein repeat hota hai.

**Example 2 — Convert tan into sine-cosine**  
*Given:* tan θ + cot θ  
*Find:* expression in sin aur cos  
Step 1: tan θ = sin θ / cos θ likho.  
*Why:* quotient identity.  
Step 2: cot θ = cos θ / sin θ likho.  
*Why:* second quotient identity.  
Step 3: (sin θ / cos θ) + (cos θ / sin θ) = (sin²θ + cos²θ) / (sin θ cos θ).  
** (sin²θ + cos²θ) / (sin θ cos θ) **  

*Reflection:* Quotient identities ne expression ko common denominator tak pahunchaya.

**Example 3 — Handle a zero-denominator case**  
*Given:* Evaluate sec 90°  
*Find:* value ya undefined status  
Step 1: sec θ = 1/cos θ.  
*Why:* reciprocal identity.  
Step 2: cos 90° = 0, isliye 1/0 undefined.  
**undefined**  

*Reflection:* Domain check karna zaroori hai warna calculation galat ho jaati hai.

**Example 4 — Multi-step simplification**  
*Given:* (1 + tan²θ) / sec²θ  
*Find:* simplified form  
Step 1: 1 + tan²θ = sec²θ (Pythagorean, lekin yahan sirf quotient use kar rahe).  
Step 2: tan θ = sin/cos aur sec = 1/cos likho.  
Step 3: (sin²θ/cos²θ + 1) / (1/cos²θ) = sin²θ + cos²θ = 1.  
**1**  

*Reflection:* Quotient identities ne Pythagorean identity ko indirectly trigger kiya.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| Forgetting domain (tan 90°) | Students sirf formula yaad karte hain   | Har step pe denominator zero check karo      |
| Mixing tan aur cot          | Visual similarity                       | Always sin/cos order yaad rakho              |
| Writing csc = sin           | Reciprocal sign bhool jaana             | 1/ likhna pehle yaad karo                    |
| Applying identity outside domain | Over-generalisation                | θ ke liye sin θ ≠ 0 likh ke condition daalo  |
| Cancelling sin/cos blindly  | Assuming nonzero                        | Har cancellation se pehle zero check         |
| Confusing quotient with reciprocal | Both involve ratios               | Reciprocal = 1/function, quotient = ratio    |

## 7. The textbook-precise statement
The six trigonometric functions satisfy the following identities for all θ where both sides are defined:  
sin θ = 1/csc θ, cos θ = 1/sec θ, tan θ = 1/cot θ,  
tan θ = sin θ / cos θ, cot θ = cos θ / sin θ.  
These hold on the common domain where the relevant denominators are nonzero (Stewart, *Calculus*, 9e, §1.3).

## 8. Visual — diagram or schematic
```
Unit circle (radius 1)
          |
      sin |     (x,y)
          |    /
     -----+---/---- cos
          |  /
          |/
```
x = cos θ, y = sin θ; tan θ = y/x, cot θ = x/y, csc θ = 1/y, sec θ = 1/x.

## 9. The memory technique
1. **The hook** — Imagine six friends standing in a circle: three primary aur unke “shadow” reciprocals jo hamesha 1 ka product dete hain.
2. **What to overlearn** — sin·csc=1, cos·sec=1, tan = sin/cos, cot = cos/sin.
3. **Spaced-repetition schedule** — 1 din, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Unit circle se sin = y, cos = x yaad karke 1/y aur y/x likh do.

## 10. What this unlocks
Yeh identities aapko trigonometric equations solve karne, calculus mein derivatives nikaalne, aur Fourier analysis mein series expand karne ke liye ready karti hain.  
- Pythagorean identities ke saath combine karke new proofs  
- Trigonometric substitution in integrals  
- Phase-shift calculations in waves

## 11. Self-check — five questions, no answers
1. sin 30° · csc 30° ki value kya hai?  
2. tan θ ko sirf sin aur cos mein likho.  
3. sec θ undefined kab hota hai?  
4. (sin θ / cos θ) · (cos θ / sin θ) simplify karke dikhao.  
5. Kya cot(0) defined hai? Kyun ya kyun nahi?