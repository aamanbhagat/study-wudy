## 1. The one-sentence answer
**The imaginary unit \(i\) is defined by the rule \(i = \sqrt{-1}\) so that \(i^2 = -1\), and its successive powers cycle every four steps: \(i, -1, -i, 1\).**

Yeh definition real numbers ke system ko extend karti hai taaki negative numbers ke square roots bhi exist kar sakein. Jab aap \(i\) ko multiply karte ho, to sign aur direction dono badalte hain, lekin yeh cycle sirf chaar steps mein repeat hoti hai kyunki \(i^4 = 1\) ho jaata hai. Is cycle ko samajhna zaroori hai kyunki yeh complex numbers ke saare higher operations (addition, multiplication, roots) ko simplify kar deta hai.

> [!NOTE]
> Sabse badi aha yeh hai ki ek naya symbol \(i\) introduce karke aap negative numbers ke square roots ko bhi ek consistent algebra ke andar le aate ho, bina kisi contradiction ke.

## 2. Why this matters — concrete and current
Electrical engineers is cycle ko har roz use karte hain jab AC circuit analysis mein phasors ko rotate karte hain; Texas Instruments ke DSP chips mein yeh rotation fast multiply-add instructions se implement hota hai. Quantum computing companies jaise IBM Quantum aur Google Quantum AI, qubit states ko represent karne ke liye exactly isi \(i^4 = 1\) cycle ka fayda uthate hain taaki gate operations matrix multiplication mein minimal computational cost le. Signal-processing libraries (MATLAB, NumPy) FFT algorithms mein same cycle se twiddle factors generate karte hain, jo har modern smartphone ke baseband processor mein chalta hai. Fundamental physics mein, Schrödinger equation ke time-evolution operator \(e^{-iHt/\hbar}\) mein yeh cycle directly appear karti hai, jisse particle physicists CERN ke LHC data ko interpret karte hain.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| Square root          | \(i\) ko \(\sqrt{-1}\) ke roop mein define karna padta hai |
| Exponent rules       | Powers \(i^n\) ko multiply karke cycle nikaalna padta hai |
| Modulo arithmetic    | Cycle length 4 ko \(n \mod 4\) se link karne ke liye      |

Agar aap exponent rules ya basic negative numbers ke square roots se comfortable nahi ho, to pehle unhe revise kar lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Negative numbers ke square root ki zaroorat
Real numbers mein \(-1\) ka koi square root nahi hota kyunki kisi bhi real \(x\) ke liye \(x^2 \ge 0\). Is limitation ko todne ke liye ek naya symbol introduce karte hain.

Example: solve \(x^2 + 1 = 0\). Real mein koi solution nahi, lekin hum likhte hain \(x = \pm i\).

Formal statement:  
\[ i \triangleq \sqrt{-1} \quad \text{with the defining relation} \quad i^2 = -1. \]

> [!WARNING]
> Agar aap yeh maanne se pehle hi \(i\) ko real number ki tarah treat karne lagen, to baad mein multiplication rules toot jaayenge.

### Step 2 — \(i^2\) se \(i^3\) tak jaana
Ab \(i^2 = -1\) ko multiply karke agla power nikaalte hain.

Example: \(i^3 = i^2 \cdot i = (-1) \cdot i = -i\).

Formal:  
\[ i^3 = -i. \]

> [!WARNING]
> Sign galat lagaane se poori cycle flip ho jaati hai; hamesha pehle \(i^2\) ko \(-1\) replace karo.

### Step 3 — \(i^4\) calculate karna
Agla step cycle ko close karta hai.

Example: \(i^4 = i^3 \cdot i = (-i) \cdot i = -i^2 = -(-1) = 1\).

Formal:  
\[ i^4 = 1. \]

### Step 4 — Cycle ka pattern observe karna
Ab powers repeat karte hain: \(i^5 = i^4 \cdot i = 1 \cdot i = i\), aur yeh 4-step cycle shuru ho jaata hai.

Formal: for any integer \(n \ge 0\),  
\[ i^n = i^{n \mod 4}. \]

### Step 5 — General formula
Cycle table bana ke har remainder ke liye value likh dete hain.

| \(n \mod 4\) | \(i^n\) |
|--------------|---------|
| 0            | \(1\)   |
| 1            | \(i\)   |
| 2            | \(-1\)  |
| 3            | \(-i\)  |

Yeh table textbook-grade statement ban jaata hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple power**
- *Given:* \(i^7\)
- *Find:* value
\(7 \div 4 = 1\) remainder 3, isliye \(i^7 = i^3 = -i\).
*Why:* remainder directly table se value deta hai.
**Final answer:** \(-i\)
*Reflection:* remainder method sabse fast hai jab exponent bada ho.

**Example 2 — Negative exponent**
- *Given:* \(i^{-3}\)
- *Find:* value
Pehle \(i^{-3} = 1 / i^3 = 1 / (-i)\). Multiply numerator-denominator by \(i\):  
\[ \frac{1}{-i} \cdot \frac{i}{i} = \frac{i}{-i^2} = \frac{i}{1} = i. \]
*Why:* \(i^4 = 1\) use karke denominator real bana.
**Final answer:** \(i\)
*Reflection:* negative exponents ko positive mein convert karke cycle apply karo.

**Example 3 — Product of two powers**
- *Given:* \(i^5 \cdot i^{11}\)
- *Find:* simplified form
\(i^5 \cdot i^{11} = i^{16}\). \(16 \mod 4 = 0\), isliye \(i^{16} = 1\).
*Why:* exponents add karne ka rule cycle ke saath compatible hai.
**Final answer:** \(1\)
*Reflection:* multiplication exponents ko jodti hai, phir modulo 4 se reduce.

**Example 4 — Solve equation**
- *Given:* \(x^2 + 4 = 0\)
- *Find:* all solutions in complex numbers
\(x^2 = -4 = 4 \cdot (-1) = 4i^2\), isliye \(x = \pm 2i\).
*Why:* \(i^2 = -1\) ko factor karke roots nikaale.
**Final answer:** \(x = 2i, -2i\)
*Reflection:* har quadratic negative discriminant wala ab complex roots de sakta hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| \(i^2 = 1\) likhna          | Real numbers ki aadat                   | Har baar \(i^2\) ko explicitly \(-1\) replace karo |
| \(i^4 = -1\) samajhna       | Cycle length bhool jaana                | Table ya \(n \mod 4\) method fix kar lo      |
| Negative exponent ko ignore karna | Formula yaad nahi rehta          | \(i^{-k} = (i^4 - k \mod 4)\) use karo       |
| \(i^0 = 0\) likhna          | Zero power rule galat apply karna       | \(i^0 = 1\) yaad rakhna, kyunki any non-zero number^0 = 1 |
| \(i^3 = i\) likhna          | Sirf sign bhool jaana                   | Step-by-step multiply: \(i^2 \cdot i = -i\)  |

## 7. The textbook-precise statement
Let \(i\) be a symbol satisfying \(i^2 = -1\). Then the powers of \(i\) are periodic with period 4:  
\[ i^{k+4} = i^k \cdot i^4 = i^k \cdot 1 = i^k \]  
for every integer \(k \ge 0\). Consequently,  
\[ i^n = \begin{cases} 1 & n \equiv 0 \pmod{4} \\ i & n \equiv 1 \pmod{4} \\ -1 & n \equiv 2 \pmod{4} \\ -i & n \equiv 3 \pmod{4} \end{cases}. \]  
(Axler, *Linear Algebra Done Right*, 3e, §1.B)

## 8. Visual — diagram or schematic
```text
Powers of i cycle (clockwise rotation on complex plane):

      i
      ↑
(-1) ←─── 1
      ↓
     -i
```
Har multiply-by-i 90° anticlockwise rotation hai; chaar steps baad wapas 1 par.

## 9. The memory technique
1. **The hook** — Imagine a clock whose hands move only in 90° jumps: 12 → 3 → 6 → 9 → 12, labelled 1, i, −1, −i.
2. **What to overlearn** — \(i^2 = -1\), \(i^4 = 1\), and \(n \mod 4\) lookup.
3. **Spaced-repetition schedule** — Review on day 1, 3, 7, 16, 35.
4. **First-principles fallback** — Multiply step-by-step from \(i^1\) until you reach the exponent, using only \(i^2 = -1\).

## 10. What this unlocks
Yeh cycle complex multiplication, division, roots aur polar form ke liye foundation ban jaati hai. Aap ab De Moivre’s theorem, complex roots of unity, aur phasor arithmetic padh sakte ho.

- Next: Complex conjugates aur modulus
- Next: Polar representation \(re^{i\theta}\)
- Next: Roots of polynomials with real coefficients

## 11. Self-check — five questions, no answers
1. Compute \(i^{13}\) without calculator.
2. Simplify \((i^2 + i^3)^4\).
3. Solve \(x^2 + 9 = 0\) and verify by substitution.
4. What is \(i^{-5} + i^{-7}\)?
5. Ek student \(i^6 = -i\) likhta hai; uski mistake identify karo.